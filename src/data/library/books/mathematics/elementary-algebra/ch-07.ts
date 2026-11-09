import type { Chapter } from '../../../types'

/**
 * Elementary Algebra — Chapter 7: Inequalities
 *
 * LESSONS WRITTEN: 7.1 Order and the Solution Set (run 79 — quiz keys
 *                  0/1/0/2/1, 14 exercises, two figures, verify-book3-
 *                  ch07.ts sections A–F green) 7.2 Solving Linear
 *                  Inequalities (run 79 — quiz keys 0/1/1/2/2, 14
 *                  exercises, two figures, the flip-theorem derivation,
 *                  the pipeline algorithm, sections D–G green) 7.3
 *                  Compound Inequalities and Applications (run 80 — quiz
 *                  keys 1/2/0/1/1, 14 exercises, two figures, the two-
 *                  boundary-pipeline derivation, sections H–K green).
 *                  The unit-7 completion review PASSED at run 80 (7/7
 *                  checklist, exam corners 3/3, book snapshot recomputed):
 *                  chapter 7 COMPLETE 3/3.
 *
 * References for this unit: the banked keys carry the run (zero downloads,
 * web-check only per the runs-71–78 pattern) — `hall-knight-elementary-
 * algebra` (the classical text's inequalities chapter: the order symbols,
 * the fundamental laws, and the "solve like an equation but mind the
 * reversal" tradition this lesson grounds lawfully), `ncert-math11-ch5`
 * (NCERT class-11 "Linear Inequalities" — the school canon for algebraic
 * solutions of linear inequalities in one variable and their
 * representation on the number line; chapter 6 in the pre-2023 edition,
 * renumbered 5 in the rationalized one), `khattar-qa-4e` (the exam corner:
 * whole-number-habitat questions, budget/speed margins, largest- and
 * smallest-integer hunts), `cengage-jee-style` (the presentation contract).
 *
 * VERIFY-FIRST (2026-11-09, run 79): every number in 7.1 and 7.2 was
 * recomputed by scripts/verify-book3-ch07.ts BEFORE any prose existed —
 * 30,309 exact checks across sections A–E (the trichotomy census 169
 * pairs split 78/13/78; the addition and subtraction laws 4,394 exact
 * equivalences with zero flips; positive scaling 2,028; THE FLIP 2,028
 * exact reversals over k ∈ [−6..−1] with the double-flip 1,521 systems;
 * the add-negative trap 1,014 checks — adding never flips; the boundary
 * censuses 16/17/8/9/1 with each closed ray exceeding its open ray by
 * exactly the boundary point; the full solution-shape grid 8,112 linear
 * inequalities with the shape census matching the direct census
 * everywhere and the boundary belonging to slack shapes 1,672 times and
 * strict shapes 0; the move-licence engine 300 assertions with the
 * wrong-move (flip omitted) mismatching 1,112 of 1,200 times; the
 * whole-number habitats budget/lift/notebook {0..4}/{0..7}/{0..7}).
 * Pre-writing catches: the A-i trichotomy assertion written as pairwise
 * distinctness (impossible for booleans — two falses are equal), the
 * whole-solution engine comparing 12n against 50/12 instead of 50, two
 * distractor pricings invisible on integer windows (k = 9 and k = 11
 * moved the boundary off-lattice; k = 8 shows the move), the division-
 * flip direction written backwards in one distractor check, and the
 * marks exhibit first drafted as m ≥ 52 — the ledger says 160 − 111 =
 * 49.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (7.1): the trichotomy doors — three panels, one law.       */
/* Header (30,18,660,44); panels (30,84,208,180), (256,84,208,180),    */
/* (482,84,208,180); chips (30,276,208,26), (256,276,208,26),          */
/* (482,276,208,26); caption band (30,314,660,24). Geometry pinned in  */
/* verify-book3-ch07.ts plan71Fig1, audited in F.                      */
/* ------------------------------------------------------------------ */

function trichotomyDoorsSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two numbers on the line open exactly one of three doors: a is left of b, equal to b, or right of b">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">two numbers, three doors — exactly one opens, every time</text>')
  // ---- panel 1: a < b (2 left of 5) ----
  parts.push('<rect x="30" y="84" width="208" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="134" y="106" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">DOOR 1 · a &lt; b</text>')
  // the line and the two points
  parts.push('<line x1="50" y1="190" x2="218" y2="190" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<circle cx="92" cy="190" r="5" fill="#16a34a"/>')
  parts.push('<circle cx="176" cy="190" r="5" fill="#ea580c"/>')
  parts.push('<text x="92" y="212" font-size="11" fill="#166534" text-anchor="middle">2</text>')
  parts.push('<text x="176" y="212" font-size="11" fill="#166534" text-anchor="middle">5</text>')
  parts.push('<text x="134" y="146" font-size="10.5" fill="#65a30d" text-anchor="middle">2 sits LEFT of 5</text>')
  parts.push('<text x="134" y="164" font-size="10.5" fill="#65a30d" text-anchor="middle">b − a = 3 &gt; 0</text>')
  // arrow from a to b
  parts.push('<line x1="99" y1="190" x2="169" y2="190" stroke="#ea580c" stroke-width="1.2" stroke-dasharray="4 3"/>')
  parts.push('<path d="M 166 186 L 175 190 L 166 194" fill="none" stroke="#ea580c" stroke-width="1.2"/>')
  // ---- panel 2: a = b (3 = 3) ----
  parts.push('<rect x="256" y="84" width="208" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="360" y="106" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">DOOR 2 · a = b</text>')
  parts.push('<line x1="276" y1="190" x2="444" y2="190" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<circle cx="360" cy="190" r="5" fill="#16a34a"/>')
  parts.push('<text x="360" y="212" font-size="11" fill="#166534" text-anchor="middle">3</text>')
  parts.push('<text x="360" y="146" font-size="10.5" fill="#65a30d" text-anchor="middle">the same slot</text>')
  parts.push('<text x="360" y="164" font-size="10.5" fill="#65a30d" text-anchor="middle">b − a = 0</text>')
  // ---- panel 3: a > b (5 right of 2) ----
  parts.push('<rect x="482" y="84" width="208" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="586" y="106" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">DOOR 3 · a &gt; b</text>')
  parts.push('<line x1="502" y1="190" x2="670" y2="190" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<circle cx="544" cy="190" r="5" fill="#ea580c"/>')
  parts.push('<circle cx="628" cy="190" r="5" fill="#16a34a"/>')
  parts.push('<text x="544" y="212" font-size="11" fill="#166534" text-anchor="middle">5</text>')
  parts.push('<text x="628" y="212" font-size="11" fill="#166534" text-anchor="middle">2</text>')
  parts.push('<text x="586" y="146" font-size="10.5" fill="#65a30d" text-anchor="middle">5 sits RIGHT of 2</text>')
  parts.push('<text x="586" y="164" font-size="10.5" fill="#65a30d" text-anchor="middle">b − a = −3 &lt; 0</text>')
  // arrow from a to b (right to left now)
  parts.push('<line x1="621" y1="190" x2="551" y2="190" stroke="#ea580c" stroke-width="1.2" stroke-dasharray="4 3"/>')
  parts.push('<path d="M 554 186 L 545 190 L 554 194" fill="none" stroke="#ea580c" stroke-width="1.2"/>')
  // ---- verdict chips ----
  parts.push('<rect x="30" y="276" width="208" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="134" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">78 of every 169 pairs land here</text>')
  parts.push('<rect x="256" y="276" width="208" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="360" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">13 of every 169 pairs land here</text>')
  parts.push('<rect x="482" y="276" width="208" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="586" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">78 of every 169 pairs land here</text>')
  // caption band
  parts.push('<rect x="30" y="314" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="330" font-size="11" fill="#166534" text-anchor="middle">the verifier swept every pair on [−6, 6]: 78 + 13 + 78 = 169 — the doors exhaust the line and never overlap</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (7.1): the solution-set shapes strip — the equation keeps  */
/* a point, the inequalities keep rays. Header (30,18,660,44); label   */
/* boxes (30,84,110,40), (30,138,110,40), (30,192,110,40),             */
/* (30,246,110,40), (30,300,110,40); caption band (30,348,660,24).     */
/* Geometry pinned in verify-book3-ch07.ts plan71Fig2, audited in F.   */
/* ------------------------------------------------------------------ */

function solutionShapesSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five solution sets on five copies of the line: the equation keeps one point, the strict inequalities keep open rays, the slack inequalities keep closed rays">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the census grows up — from one point to whole rays of the line</text>')
  const rows: [string, string][] = [
    ['x = 4', 'the equation: a single point'],
    ['x < 4', 'open ray left — hollow boundary'],
    ['x ≤ 4', 'closed ray left — filled boundary'],
    ['x > 4', 'open ray right — hollow boundary'],
    ['x ≥ 4', 'closed ray right — filled boundary'],
  ]
  rows.forEach(([label, sub], i) => {
    const y = 84 + i * 54
    parts.push(`<rect x="30" y="${y}" width="130" height="40" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>`)
    parts.push(`<text x="95" y="${y + 18}" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">${label}</text>`)
    parts.push(`<text x="95" y="${y + 33}" font-size="8.5" fill="#0f766e" text-anchor="middle">${sub}</text>`)
    // the line for this row
    const ly = y + 20
    parts.push(`<line x1="170" y1="${ly}" x2="670" y2="${ly}" stroke="#d97706" stroke-width="1.3"/>`)
    // tick marks at 0 and 4 (4 sits at x = 510 on a 170..670 map of −9..9)
    parts.push(`<line x1="420" y1="${ly - 4}" x2="420" y2="${ly + 4}" stroke="#d97706" stroke-width="1.2"/>`)
    parts.push(`<text x="420" y="${ly + 16}" font-size="8.5" fill="#65a30d" text-anchor="middle">0</text>`)
  })
  // row 1: the point 4 (filled dot only)
  parts.push('<circle cx="510" cy="104" r="5.5" fill="#ea580c"/>')
  parts.push('<text x="530" y="94" font-size="9.5" fill="#ea580c" text-anchor="middle">only 4 itself</text>')
  // row 2: x < 4 — open dot at 510, ray left
  parts.push('<line x1="180" y1="158" x2="504" y2="158" stroke="#16a34a" stroke-width="4"/>')
  parts.push('<circle cx="510" cy="158" r="5" fill="#fffdf5" stroke="#ea580c" stroke-width="2"/>')
  // row 3: x ≤ 4 — filled dot at 510, ray left
  parts.push('<line x1="180" y1="212" x2="506" y2="212" stroke="#16a34a" stroke-width="4"/>')
  parts.push('<circle cx="510" cy="212" r="5.5" fill="#ea580c"/>')
  // row 4: x > 4 — open dot at 510, ray right
  parts.push('<line x1="516" y1="266" x2="662" y2="266" stroke="#16a34a" stroke-width="4"/>')
  parts.push('<circle cx="510" cy="266" r="5" fill="#fffdf5" stroke="#ea580c" stroke-width="2"/>')
  // row 5: x ≥ 4 — filled dot at 510, ray right
  parts.push('<line x1="514" y1="320" x2="662" y2="320" stroke="#16a34a" stroke-width="4"/>')
  parts.push('<circle cx="510" cy="320" r="5.5" fill="#ea580c"/>')
  // caption band
  parts.push('<rect x="30" y="348" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="364" font-size="11" fill="#166534" text-anchor="middle">on the census window [−12, 12] the five keep 1 · 16 · 17 · 8 · 9 integers — each closed ray beats its open ray by exactly the boundary</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 1 (7.2): the flip mirror — the line reflected about zero.    */
/* Header (30,18,660,44); top panel (30,84,660,84); mirror ribbon      */
/* (30,180,660,36); bottom panel (30,228,660,84); caption band         */
/* (30,324,660,24). Geometry pinned in verify-book3-ch07.ts            */
/* plan72Fig1, audited in G.                                           */
/* ------------------------------------------------------------------ */

function flipMirrorSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Multiplying by −1 reflects the number line about zero: 2 left of 5 becomes −2 right of −5">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the flip, seen — ×(−1) reflects the line about zero</text>')
  // top panel: 2 < 5
  parts.push('<rect x="30" y="84" width="660" height="84" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="360" y="104" font-size="11" fill="#0f766e" text-anchor="middle" font-weight="700">BEFORE · 2 &lt; 5 — two sits LEFT of five, gap 5 − 2 = 3</text>')
  parts.push('<line x1="60" y1="148" x2="660" y2="148" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<circle cx="400" cy="148" r="5.5" fill="#16a34a"/>')
  parts.push('<circle cx="544" cy="148" r="5.5" fill="#ea580c"/>')
  parts.push('<text x="400" y="166" font-size="11" fill="#166534" text-anchor="middle">2</text>')
  parts.push('<text x="544" y="166" font-size="11" fill="#166534" text-anchor="middle">5</text>')
  parts.push('<line x1="304" y1="140" x2="304" y2="156" stroke="#65a30d" stroke-width="1.2"/>')
  parts.push('<text x="304" y="130" font-size="9" fill="#65a30d" text-anchor="middle">0</text>')
  // mirror ribbon
  parts.push('<rect x="30" y="180" width="660" height="36" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="360" y="203" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">multiply every number by −1 — the mirror in the origin</text>')
  // bottom panel: −2 > −5
  parts.push('<rect x="30" y="228" width="660" height="84" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="360" y="248" font-size="11" fill="#0f766e" text-anchor="middle" font-weight="700">AFTER · −2 &gt; −5 — now −2 sits RIGHT of −5, same gap 3</text>')
  parts.push('<line x1="60" y1="292" x2="660" y2="292" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<circle cx="64" cy="292" r="5.5" fill="#ea580c"/>')
  parts.push('<circle cx="208" cy="292" r="5.5" fill="#16a34a"/>')
  parts.push('<text x="64" y="310" font-size="11" fill="#166534" text-anchor="middle">−5</text>')
  parts.push('<text x="208" y="310" font-size="11" fill="#166534" text-anchor="middle">−2</text>')
  parts.push('<line x1="304" y1="284" x2="304" y2="300" stroke="#65a30d" stroke-width="1.2"/>')
  parts.push('<text x="304" y="274" font-size="9" fill="#65a30d" text-anchor="middle">0</text>')
  // caption band
  parts.push('<rect x="30" y="324" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="340" font-size="11" fill="#166534" text-anchor="middle">the gap survives: (−2) − (−5) = 3 — same distance, reversed direction · the verifier priced 2,028 exact reversals</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (7.2): the solving pipeline — five stations with the flip  */
/* inside ISOLATE. Header (30,18,660,44); stations (40/170/300/430/    */
/* 560, 110, 122, 70); running band (30,220,660,44) with subs          */
/* (45,227,200,30), (255,227,195,30), (460,227,215,30); check band     */
/* (30,284,660,40) with sub (170,291,380,26). Geometry pinned in       */
/* verify-book3-ch07.ts plan72Fig2, audited in G.                      */
/* ------------------------------------------------------------------ */

function pipelineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The solving pipeline: five stations, with the flip hiding inside the isolate station">'
  )
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the 5.2 pipeline, re-run with a compass — one station hides a trap</text>')
  const stations: [string, string][] = [
    ['1 CLEAR', 'strike fractions/decimals'],
    ['2 EXPAND', 'multiply out brackets'],
    ['3 GATHER', 'all x-terms to one side'],
    ['4 ISOLATE', 'divide by x-coefficient'],
    ['5 CHECK', 'boundary + inside + out'],
  ]
  stations.forEach(([title, sub], i) => {
    const x = 40 + i * 130
    const isIsolate = i === 3
    parts.push(`<rect x="${x}" y="110" width="122" height="70" rx="8" fill="${isIsolate ? '#ffedd5' : 'none'}" stroke="${isIsolate ? '#ea580c' : '#16a34a'}" stroke-width="${isIsolate ? 1.8 : 1.5}"/>`)
    parts.push(`<text x="${x + 61}" y="138" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${x + 61}" y="156" font-size="9.5" fill="#0d9488" text-anchor="middle">${sub}</text>`)
    if (isIsolate) parts.push(`<text x="${x + 61}" y="172" font-size="9.5" fill="#ea580c" text-anchor="middle" font-weight="700">÷ negative → FLIP</text>`)
  })
  for (let i = 0; i < 4; i++) {
    const x1 = 40 + i * 130 + 122
    parts.push(`<path d="M ${x1 + 2} 145 L ${x1 + 6} 145" stroke="#65a30d" stroke-width="1.5"/>`)
  }
  // the running example band
  parts.push('<rect x="30" y="220" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="45" y="227" width="200" height="30" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="145" y="246" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">7 − 3x ≥ −2</text>')
  parts.push('<rect x="255" y="227" width="195" height="30" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="352" y="246" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">−3x ≥ −9 → FLIP</text>')
  parts.push('<rect x="460" y="227" width="215" height="30" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="567" y="246" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">x ≤ 3 · check 3 / 0 / 4</text>')
  // the check band
  parts.push('<rect x="30" y="284" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="140" y="291" width="440" height="26" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="360" y="308" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">habit — three-point check: boundary −2 ≥ −2 ✓ · inside 7 ≥ −2 ✓ · outside −5 ≥ −2 ✗</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 3 (7.3): the four interval shapes — one pair of boundaries,  */
/* four bands. Header (30,18,660,44); label rows (30,84,150,40),       */
/* (30,138,150,40), (30,192,150,40), (30,246,150,40); census chips     */
/* (560,84,130,40), (560,138,130,40), (560,192,130,40),                */
/* (560,246,130,40); caption band (30,348,660,24). Geometry pinned in  */
/* verify-book3-ch07.ts plan73Fig1, audited in J.                      */
/* ------------------------------------------------------------------ */

function intervalShapesSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four interval shapes between the boundaries −3 and 5, with their window censuses 9, 8, 8 and 7">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="40" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">one pair of boundaries (−3 and 5), four interval shapes</text>')
  parts.push('<text x="360" y="56" font-size="11" fill="#65a30d" text-anchor="middle">a closed end keeps its boundary point — an open end refuses it</text>')
  const rows = [
    { y: 84, label: '−3 ≤ x ≤ 5', ends: 'CLOSED · CLOSED', left: true, right: true, census: '9 window integers' },
    { y: 138, label: '−3 ≤ x &lt; 5', ends: 'CLOSED · HOLLOW', left: true, right: false, census: '8 window integers' },
    { y: 192, label: '−3 &lt; x ≤ 5', ends: 'HOLLOW · CLOSED', left: false, right: true, census: '8 window integers' },
    { y: 246, label: '−3 &lt; x &lt; 5', ends: 'HOLLOW · HOLLOW', left: false, right: false, census: '7 window integers' },
  ]
  for (const r of rows) {
    const cy = r.y + 20
    parts.push(`<rect x="30" y="${r.y}" width="150" height="40" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>`)
    parts.push(`<text x="105" y="${r.y + 17}" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">${r.label}</text>`)
    parts.push(`<text x="105" y="${r.y + 32}" font-size="9" fill="#0f766e" text-anchor="middle">${r.ends}</text>`)
    parts.push(`<line x1="205" y1="${cy}" x2="545" y2="${cy}" stroke="#d97706" stroke-width="1.4"/>`)
    for (const tx of [205, 232.5, 315, 342.5, 370, 397.5, 425, 452.5, 507.5, 535]) {
      parts.push(`<line x1="${tx}" y1="${cy - 3}" x2="${tx}" y2="${cy + 3}" stroke="#5eead4" stroke-width="1"/>`)
    }
    parts.push(`<rect x="260" y="${cy - 9}" width="220" height="18" rx="4" fill="#ffedd5" stroke="#ea580c" stroke-width="1.4"/>`)
    parts.push(
      r.left
        ? `<circle cx="260" cy="${cy}" r="5.5" fill="#16a34a" stroke="#166534" stroke-width="1.2"/>`
        : `<circle cx="260" cy="${cy}" r="5.5" fill="#fffdf5" stroke="#16a34a" stroke-width="1.6"/>`
    )
    parts.push(
      r.right
        ? `<circle cx="480" cy="${cy}" r="5.5" fill="#16a34a" stroke="#166534" stroke-width="1.2"/>`
        : `<circle cx="480" cy="${cy}" r="5.5" fill="#fffdf5" stroke="#16a34a" stroke-width="1.6"/>`
    )
    parts.push(`<text x="260" y="${cy - 15}" font-size="10" fill="#166534" text-anchor="middle">−3</text>`)
    parts.push(`<text x="480" y="${cy - 15}" font-size="10" fill="#166534" text-anchor="middle">5</text>`)
    parts.push(`<rect x="560" y="${r.y}" width="130" height="40" rx="8" fill="none" stroke="#0d9488" stroke-width="1.2"/>`)
    parts.push(`<text x="625" y="${r.y + 24}" font-size="11.5" fill="#0f766e" text-anchor="middle" font-weight="700">${r.census}</text>`)
  }
  // caption band
  parts.push('<rect x="30" y="348" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="364" font-size="11" fill="#166534" text-anchor="middle">the census law: each closed end adds exactly its boundary point — 7 → 8 → 8 → 9 on [−12, 12]</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 4 (7.3): the two joiners — AND closes a band, OR keeps the   */
/* wings; the De Morgan split 9 + 16 = 25. Header (30,18,660,44); AND  */
/* panel (30,84,320,180); OR panel (370,84,320,180); chips             */
/* (30,276,320,26), (370,276,320,26); caption band (30,314,660,24).    */
/* Geometry pinned in verify-book3-ch07.ts plan73Fig2, audited in J.   */
/* ------------------------------------------------------------------ */

function andOrPanelsSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The AND of two rays closes the band −3 ≤ x ≤ 5 keeping 9 window integers; the OR of the negated rays keeps the 16 outside — 9 + 16 = 25">'
  )
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="40" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">two ways to join two rays — AND closes a band, OR keeps the wings</text>')
  parts.push('<text x="360" y="56" font-size="11" fill="#65a30d" text-anchor="middle">the same two boundaries −3 and 5, joined twice — the two answers split the window exactly</text>')
  // ---- AND panel ----
  parts.push('<rect x="30" y="84" width="320" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="190" y="106" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">AND — both gates must open</text>')
  parts.push('<line x1="55" y1="200" x2="325" y2="200" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<rect x="110" y="191" width="152" height="18" rx="4" fill="#ffedd5" stroke="#ea580c" stroke-width="1.4"/>')
  parts.push('<circle cx="110" cy="200" r="5.5" fill="#16a34a" stroke="#166534" stroke-width="1.2"/>')
  parts.push('<circle cx="262" cy="200" r="5.5" fill="#16a34a" stroke="#166534" stroke-width="1.2"/>')
  parts.push('<text x="110" y="181" font-size="10" fill="#166534" text-anchor="middle">−3</text>')
  parts.push('<text x="262" y="181" font-size="10" fill="#166534" text-anchor="middle">5</text>')
  parts.push('<text x="190" y="148" font-size="11" fill="#65a30d" text-anchor="middle">x ≥ −3 AND x ≤ 5</text>')
  parts.push('<text x="190" y="232" font-size="11" fill="#0f766e" text-anchor="middle">the band −3 ≤ x ≤ 5</text>')
  parts.push('<text x="190" y="250" font-size="11" fill="#0f766e" text-anchor="middle">keeps 9 of the 25 window integers</text>')
  parts.push('<rect x="30" y="276" width="320" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="190" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">AND is stingy: the band, the point, or nothing</text>')
  // ---- OR panel ----
  parts.push('<rect x="370" y="84" width="320" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="530" y="106" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">OR — either gate opens</text>')
  parts.push('<line x1="395" y1="200" x2="665" y2="200" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="395" y1="200" x2="443" y2="200" stroke="#ea580c" stroke-width="3.2"/>')
  parts.push('<circle cx="450" cy="200" r="5.5" fill="#fffdf5" stroke="#ea580c" stroke-width="1.6"/>')
  parts.push('<line x1="609" y1="200" x2="665" y2="200" stroke="#ea580c" stroke-width="3.2"/>')
  parts.push('<circle cx="602" cy="200" r="5.5" fill="#fffdf5" stroke="#ea580c" stroke-width="1.6"/>')
  parts.push('<text x="450" y="181" font-size="10" fill="#166534" text-anchor="middle">−3</text>')
  parts.push('<text x="602" y="181" font-size="10" fill="#166534" text-anchor="middle">5</text>')
  parts.push('<text x="530" y="148" font-size="11" fill="#65a30d" text-anchor="middle">x &lt; −3 OR x &gt; 5</text>')
  parts.push('<text x="530" y="232" font-size="11" fill="#0f766e" text-anchor="middle">the wings hold 16 integers; the gap −3..5</text>')
  parts.push('<text x="530" y="250" font-size="11" fill="#0f766e" text-anchor="middle">holds 9 — the band&#8217;s complement</text>')
  parts.push('<rect x="370" y="276" width="320" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="530" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">OR is generous: 9 + 16 = 25 — nothing counted twice</text>')
  // caption band
  parts.push('<rect x="30" y="314" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="330" font-size="11" fill="#166534" text-anchor="middle">De Morgan in censuses: NOT the band IS the wings — the verifier priced the 9 + 16 split pointwise over the window</text>')
  parts.push('</svg>')
  return parts.join('')
}

export const chapter07: Chapter = {
  number: 7,
  slug: 'inequalities',
  title: 'Inequalities',
  summary:
    'Order joins algebra: the real line of ANS ch. 8 as the habitat, linear inequalities solved with every move checked against the order laws — including the multiplication-by-negative flip, proved rather than warned about — and compound inequalities (and/or) handled as intersections and unions of solution sets, cashed in boundary word problems.',
  status: 'complete',
  lessons: [
    {
      id: 'al-order-and-the-solution-set',
      number: '7.1',
      title: 'Order and the Solution Set',
      concepts: [
        'inequality symbols and their reading',
        'strict and slack inequalities',
        'the real line as the habitat of order',
        'the trichotomy law',
        'the order laws: add, scale, flip',
        'boundary point and open/closed rays',
        'solution set of an inequality',
        'whole-number habitats',
      ],
      objectives: [
        'read the four inequality symbols and translate sentences like "at least" and "no more than" into them',
        'state the trichotomy law and use the sign reading a < b ⟺ b − a > 0',
        'apply the order laws — addition, subtraction, positive scaling — with verified instances',
        'test whether a number belongs to the solution set of an inequality by substitution',
        'describe solution sets as open or closed rays and count them on a census window',
        'prune a real-line solution set to a whole-number habitat and answer budget questions',
      ],
      prerequisites: ['al-the-three-verdicts-one-none-infinitely-many', 'al-what-an-equation-is-the-balance-principle'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math11-ch5', 'khattar-qa-4e', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Chapters 5 and 6 taught the grammar of BALANCE. Every assertion there claimed that two expressions weigh exactly the same — $x + 3 = 7$, $x + y = 10$ — and the lawful moves of the balance settled each claim: gather, read the verdict, produce the number or the pair. But much of mathematics, and nearly all of practical life, does not balance. A budget must not overflow. A lift must not exceed its rating. A student needs AT LEAST forty marks. These are claims of ORDER — claims that one quantity sits below, above, or no further than another — and the balance principle, which only ever says "equal", cannot voice them. Algebra needs a second grammar: the grammar of order.' },
        { kind: 'para', text: 'This chapter builds that grammar on the number line. This lesson lays the foundation: what the inequality symbols mean, the law that governs them (trichotomy — exactly one of three doors opens for any two numbers), the order laws that license our moves, and the new shape a solution can take. Lesson 7.2 turns the laws into a solving craft, with the one move that makes inequalities genuinely different from equations — multiplying by a negative, which REVERSES the order — proved rather than warned about. Lesson 7.3 handles compound claims and cashes the whole chapter in word problems. The payoff is wide: every optimization, every margin, every "at least" question of the rest of mathematics speaks this language.' },
        { kind: 'heading', text: 'From Balance to Bias' },
        { kind: 'equation', latex: 'x + 3 = 7 \\qquad \\text{versus} \\qquad x + 3 < 7', note: 'the equation demands THE number that balances; the inequality admits every number that stays under' },
        { kind: 'para', text: 'Read the new signs aloud, because their names are precise. The assertion $x + 3 < 7$ says: $x + 3$ is LESS THAN 7 — strictly below, with no room for equality. Its partner $x + 3 > 7$ says GREATER THAN. Then come the slack signs, each a compound: $x + 3 \\leq 7$ means "$x + 3$ is less than 7 OR equal to 7" — at most 7; $x + 3 \\geq 7$ means "greater or equal" — at least 7. The strict signs admit no equality; the slack signs allow the boundary. This tiny distinction — whether the number on the boundary itself belongs — will decide exam answers and engineering margins alike, and we will price it exactly.' },
        { kind: 'terms', items: [
          { term: 'inequality', def: 'an assertion that one quantity is ordered relative to another — written with $<$, $>$, $\\leq$ or $\\geq$ — rather than equal to it' },
          { term: 'strict inequality', def: 'an inequality using $<$ or $>$: equality is forbidden, so the boundary number is excluded' },
          { term: 'slack inequality', def: 'an inequality using $\\leq$ or $\\geq$: equality is allowed ("or equal to"), so the boundary number is included' },
          { term: 'boundary point', def: 'the number $t$ in a solved ray like $x < t$: the solution set lies entirely on one side of $t$, and whether $t$ itself belongs is exactly the strict-versus-slack question' },
          { term: 'solution set', def: 'the set of ALL values that make an assertion true — for a linear inequality in one variable, a ray (or the whole line, or nothing)' },
          { term: 'the real line', def: 'the number line itself: every real number a slot, order as left-right position — built in ANS chapter 8 and the habitat of this whole chapter' },
          { term: 'open ray / closed ray', def: 'a solution ray whose boundary is excluded (drawn hollow) or included (drawn filled)' },
          { term: 'habitat', def: 'the set of values a problem actually allows — reals, integers, whole numbers: the same assertion prunes to different answers on different habitats' },
        ] },
        { kind: 'para', text: 'Where does order LIVE? On the line. ANS chapter 8 built the real line — the line without holes, every real number given a slot, rationals and irrationals sharing it densely. On that line, "$a < b$" is not an abstract relation but a position claim: $a$ sits to the LEFT of $b$. Left is less; right is greater; the line is the map. This is why the number line will be the faithful picture of every solution set in this chapter — the solution of an inequality is not a number but a stretch of the line, and we will draw every one of them.' },
        { kind: 'heading', text: 'The Real Line: the Habitat of Order' },
        { kind: 'para', text: 'Position gives a exact arithmetic test for order, and it is the one instrument this chapter runs on: subtract. To decide whether $a < b$, form $b - a$ and read its sign. If $b - a$ is positive, then $b$ outweighs $a$, so $a$ sits left — the claim $a < b$ is true. If $b - a$ is negative, $a$ sits right and $a > b$. If $b - a$ is zero, the two share one slot: $a = b$. This is the sign reading of order, and it converts every order question into a sign question — the kind of question the field laws of ANS 7.2 already answer.' },
        { kind: 'equation', latex: 'a < b \\;\\iff\\; b - a > 0', note: 'the sign reading — order decided by the sign of the difference; equally a > b ⟺ a − b > 0 and a = b ⟺ b − a = 0' },
        { kind: 'para', text: 'The sign reading immediately sharpens the trichotomy: for any two real numbers $a$ and $b$, EXACTLY ONE of the three claims $a < b$, $a = b$, $a > b$ holds — because the difference $b - a$ has exactly one sign. The three doors of 5.3 (one, none, infinitely many) have an ancestor here: every pair of numbers passes through exactly one of three doors, and no pair passes through two. The verifier swept the whole grid of pairs on $[-6, 6]$: of the $13 \\times 13 = 169$ pairs, $78$ landed in $a < b$, $13$ in $a = b$, and $78$ in $a > b$ — $78 + 13 + 78 = 169$, exhaustive and exclusive, as the law demands.' },
        { kind: 'figure', caption: 'The trichotomy: any two numbers open exactly one of three doors. The verifier swept all 169 pairs on [−6, 6] — 78 left, 13 equal, 78 right — the doors exhaust the line and never overlap.', svg: trichotomyDoorsSvg() },
        { kind: 'callout', tone: 'definition', title: 'Definition — the trichotomy law', text: 'For any two real numbers $a$ and $b$, exactly one of the following holds: $a < b$, or $a = b$, or $a > b$. Thus, $a < b \\Leftrightarrow b - a > 0$, \\; $a = b \\Leftrightarrow b - a = 0$, \\; $a > b \\Leftrightarrow a - b > 0$. Trichotomy is what makes "compare two numbers" always a well-posed question — there is never a fourth answer, and never two answers at once.' },
        { kind: 'para', text: 'Strict versus slack now gets its exact face. Take the boundary $4$. The assertion $x < 4$ holds for every number left of $4$ but not for $4$ itself; on the verifier window $[-12, 12]$ it keeps $16$ integers ($-12$ through $3$). The assertion $x \\leq 4$ keeps the same ray PLUS the boundary: $17$ integers. The whole difference between the strict and the slack claim is the single boundary point — one number, one examination mark, one kilogram over the limit. For example:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) $x < 4$ holds for $3.999$ and for $-100$, but not for $4$ — the door slams at the boundary;',
          '(ii) $x \\leq 4$ holds for all of those AND for $4$ itself — the boundary is invited;',
          '(iii) on the census window the counts are $16$ against $17$: the slack sign wins by exactly one number, always the boundary.',
        ] },
        { kind: 'heading', text: 'The Order Laws' },
        { kind: 'para', text: 'Chapter 5 needed one licence for its moves — the balance: do the same thing to both members and the solution set never notices. Order needs laws with MORE structure, because order has a direction the balance lacks. Four laws license every move we will ever make, and each is an assertion we can — and did — check exhaustively. State them once, with a verified instance apiece, and let the rest of the chapter ride on them.' },
        { kind: 'list', items: [
          '**Transitivity.** If $a < b$ and $b < c$, then $a < c$. Instance: $2 < 5$ and $5 < 9$, so $2 < 9$ — the line cannot zigzag; left of left is left. The verifier confirmed all $84$ ordered chains on $[-4, 4]$.',
          '**The addition law.** If $a < b$, then $a + c < b + c$ for EVERY real $c$ — and likewise $a - c < b - c$. Instance: from $2 < 5$, adding $-4$: $-2 < 1$. Adding never disturbs order, whatever the sign of the addend — $4{,}394$ exact checks on the grid, zero violations.',
          '**The positive-scaling law.** If $a < b$ and $c > 0$, then $c \\cdot a < c \\cdot b$ — and dividing by $c > 0$ behaves identically. Instance: from $2 < 5$, multiplying by $3$: $6 < 15$. Positive scaling preserves order — $2{,}028$ exact checks.',
          '**The flip.** If $a < b$ and $c < 0$, then $c \\cdot a > c \\cdot b$ — the sign REVERSES. Instance: from $2 < 5$, multiplying by $-1$: $-2 > -5$. This is the law that makes inequalities inequalities, it is the core of 7.2, and it will be PROVED there — with $2{,}028$ exact reversals already priced on the grid.',
        ] },
        { kind: 'derivation', title: 'Theorem — the addition law and transitivity, from the sign reading', statement: 'For all real numbers: (1) if $a < b$ then $a + c < b + c$ for every $c$; (2) if $a < b$ and $b < c$ then $a < c$. Both follow from the sign reading and the field laws alone.', steps: [
          { label: 'Turn order into a sign', formula: 'a < b \\;\\Longrightarrow\\; b - a > 0', explanation: 'The sign reading converts the hypothesis into a positive number: the gap $b - a$. Everything that follows manipulates this gap.' },
          { label: 'Shift both members', formula: '(b + c) - (a + c) = b + c - a - c = b - a', explanation: 'Form the gap of the SHIFTED pair: the $c$ cancels exactly, leaving the original gap untouched. Shifting two numbers by the same amount cannot change how far apart they are.' },
          { label: 'Read the sign back', formula: '(b + c) - (a + c) = b - a > 0 \\;\\Longrightarrow\\; a + c < b + c', explanation: 'The shifted gap is still positive, so the sign reading returns the shifted order. The same computation with $c - a$ in place of $c + a$ handles subtraction; the verifier priced the law on 4,394 grid equivalences with zero failures.' },
          { label: 'Compose two orderings', formula: 'b - a > 0, \\; c - b > 0 \\;\\Longrightarrow\\; (b - a) + (c - b) = c - a > 0', explanation: 'For transitivity, both hypotheses hand over positive gaps; the sign law of ANS 7.2 says the sum of two positives is positive. The middle number $b$ telescopes away exactly: the composite gap is $c - a$.' },
          { label: 'Conclude', formula: 'c - a > 0 \\;\\Longrightarrow\\; a < c', explanation: 'Left of left is left. The verifier walked all 84 ordered chains on $[-4, 4]$ and the telescoping identity held in each. For $\\geq$ the identical proof runs with every strict sign slackened: nonnegative plus nonnegative is nonnegative.' },
        ], result: 'Addition (and subtraction) preserve order universally; transitivity composes two orderings into a third — both are the field laws speaking through the sign reading.' },
        { kind: 'para', text: 'The flip deserves its own paragraph NOW, because a habit formed here prevents a semester of errors. Multiplying by a negative number does not merely change sizes — it REVERSES direction: $2 < 5$ becomes $-2 > -5$. Notice what did NOT flip: adding $-4$ to $2 < 5$ gave $-2 < 1$, still in order ($1{,}014$ trap checks, zero flips). The reversal belongs to MULTIPLICATION by negatives alone, and the reason is visible on the line: multiplying by $-1$ reflects the line about $0$, exchanging left and right. Every negative multiplier reflects first, then scales. Lesson 7.2 proves this properly from the sign laws and builds the solving craft on it; for now, carry the law and its boundary case — multiplying by $0$ collapses everything to $0 = 0$, destroying the claim entirely, just as 5.1 warned for equations.' },
        { kind: 'callout', tone: 'insight', title: 'Insight — the balance grows a direction', text: 'Set the order laws beside the balance principle of 5.1 and the family resemblance is exact. The addition law IS the balance move (add the same thing to both members), still lawful. The positive-scaling law is the old "multiply both members by $k \\neq 0$", restricted to $k > 0$. The only genuinely new licence is the flip — and it is precisely the old move PLUS a direction change. Equality is one door of the trichotomy; the order laws are the balance laws re-run with a compass. When 7.2 solves inequalities with the 5.2 pipeline, nothing new will be invented — only the flip station added.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — order is a direction, not a size habit', text: 'Two reflexes from positive-number arithmetic turn false on the full line. (1) "Further right means bigger": on the negatives, $-100 < -1$ — the bigger-magnitude debt is the SMALLER number. (2) "Bigger denominator means bigger fraction": $\\frac{1}{2} > \\frac{1}{3}$ — sharing among fewer people leaves more each. Both errors vanish under the sign reading: $-1 - (-100) = 99 > 0$ so $-1$ is greater; $\\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6} > 0$ so one-half wins. When instincts disagree with the line, trust the subtraction.' },
        { kind: 'heading', text: 'Solution Sets: the Census Grows Up' },
        { kind: 'para', text: 'Chapter 5 defined the solution set of an equation and found it painfully small: one number, or none, or (for identities) everything — 5.3 priced all three verdicts. Inequalities open the census wide. The solution set of $x + 3 < 7$ is not a number but a REGION: every real number less than $4$, without end in the leftward direction. Solving an inequality means describing that region exactly — its direction, its boundary, and whether the boundary belongs. The census grows from counting points to naming stretches of the line.' },
        { kind: 'example', title: 'Is −2 a solution of x + 5 < 4? Is 0?', steps: [
          'Take $x = -2$ into the assertion: $-2 + 5 = 3$, and $3 < 4$ is TRUE — so $-2$ belongs to the solution set.',
          'Take $x = 0$: $0 + 5 = 5$, and $5 < 4$ is FALSE — so $0$ is excluded.',
          'Hence the census test is unchanged from 5.1 — substitute and read the truth value — and the verdicts: −2 belongs, 0 does not.',
        ], },
        { kind: 'example', title: 'Solve x + 3 < 7, then verify with three test points', steps: [
          'Subtract $3$ from both members (the addition law with $c = -3$ — subtraction is its twin): $x < 7 - 3$, that is $x < 4$.',
          'The solution set is the open ray left of $4$: every real below $4$, boundary excluded.',
          'Check inside: $x = 3$ gives $6 < 7$ — true, as promised.',
          'Check the boundary: $x = 4$ gives $7 < 7$ — false; the boundary is correctly OUT.',
          'Check outside: $x = 5$ gives $8 < 7$ — false; beyond the boundary nothing belongs. The verifier ran the equivalence pointwise over the whole census window: $(x + 3 < 7) \\Leftrightarrow (x < 4)$ at all $25$ integers, $16$ of which satisfy the ray.',
          'Hence the solution set is the open ray $x < 4$ — every real below $4$, boundary excluded.',
        ], },
        { kind: 'para', text: 'The picture language deserves its own convention, because every examination in the country draws these pictures. A solution ray is drawn on the number line as a thick stretch; its boundary is drawn HOLLOW (an empty circle) when the boundary is excluded — strict signs — and FILLED when included — slack signs. The five shapes that matter at a boundary $t = 4$ are five rows of one figure: the equation keeps a single point; the strict inequalities keep open rays; the slack inequalities keep closed rays. Direction says less-or-greater; fill says the boundary. Two symbols of ink, one honest picture.' },
        { kind: 'figure', caption: 'The five solution-set shapes at the boundary 4: the equation keeps one point; x < 4 and x > 4 keep open rays (hollow boundary); x ≤ 4 and x ≥ 4 keep closed rays (filled). On [−12, 12] the census counts run 1 · 16 · 17 · 8 · 9.', svg: solutionShapesSvg() },
        { kind: 'table', caption: 'The five shapes at the boundary 4, with their census counts on the window [−12, 12]', head: ['assertion', 'reads as', 'boundary 4 is…', 'census on [−12, 12]'], rows: [
          ['$x < 4$', 'strictly below 4', 'excluded (hollow)', '16 integers (−12 … 3)'],
          ['$x \\leq 4$', 'at most 4', 'included (filled)', '17 integers (−12 … 4)'],
          ['$x > 4$', 'strictly above 4', 'excluded (hollow)', '8 integers (5 … 12)'],
          ['$x \\geq 4$', 'at least 4', 'included (filled)', '9 integers (4 … 12)'],
          ['$x = 4$', 'exactly 4', 'the whole set', '1 integer (4 itself)'],
        ] },
        { kind: 'example', title: 'Strict versus slack: describe {x : x ≥ −1} and {x : x > −1} on the window [−12, 12]', steps: [
          'Both assertions own the same closed ray direction: every number right of $-1$, boundary at $-1$.',
          'For $x \\geq -1$: the boundary belongs — the window integers $-1, 0, 1, \\ldots, 12$, which number $14$.',
          'For $x > -1$: the boundary is refused — $0, 1, \\ldots, 12$, which number $13$.',
          'Hence the two solution sets differ by EXACTLY one number, $-1$ itself — the whole content of the extra bar under the sign: 14 window integers against 13.',
        ], },
        { kind: 'para', text: 'The degenerate censuses close the analogy with 5.3. The assertion $x < x$ holds for NO number — a number cannot sit left of itself — so its solution set is empty, the none-verdict reborn as a region of size zero. The assertion $x \\leq x$ holds for EVERY number — everything equals-or-follows itself — the all-verdict, the universal set. So the three verdicts of equations survive inside inequalities: typically a ray, but possibly nothing ($x < x$) or everything ($x \\leq x$). The census has grown, not broken.' },
        { kind: 'para', text: 'One more habitat lesson before the craft. The ray $x < 4$ lives on the REAL line — infinitely many solutions. But word problems usually live on the WHOLE numbers, and there the same ray prunes to a finite list: the whole numbers below $4$ are $0, 1, 2, 3$. Nothing was rounded and no rule was applied — the habitat itself did the pruning. This is why budget and capacity questions in the exam corner ask for "the greatest number of…" and expect an integer: solve on the real line first, then let the habitat keep what it keeps.' },
        { kind: 'example', title: 'You have ₹50 and pens cost ₹12 each. How many can you buy?', steps: [
          'Let $n$ be the number of pens — a whole number by habitat. The budget reads $12n \\leq 50$.',
          'Divide both members by $12 > 0$ (the positive-scaling law): $n \\leq \\frac{50}{12} = \\frac{25}{6}$.',
          'On the real line the solution is the ray $n \\leq \\frac{25}{6}$; on the whole-number habitat it prunes to $\\{0, 1, 2, 3, 4\\}$ — five of them, largest $4$.',
          'Check the cut from both sides: $12 \\times 4 = 48 \\leq 50$ fits; $12 \\times 5 = 60 > 50$ overflows.',
          'Hence four pens — the habitat keeps $\\{0, 1, 2, 3, 4\\}$ from the ray $n \\leq \\frac{25}{6}$.',
        ], },
        { kind: 'example', title: 'A lift is rated for at most 620 kg. Each crate weighs 85 kg, and 7 crates are loaded. Is the lift legal — and what is the most it can carry?', steps: [
          'The rating reads $85n \\leq 620$ for the number of crates $n$.',
          'Divide by $85 > 0$: $n \\leq \\frac{620}{85} = \\frac{124}{17}$ — the ray on the real line.',
          'The whole-number habitat keeps $\\{0, 1, \\ldots, 7\\}$: seven crates weigh $85 \\times 7 = 595 \\leq 620$ — legal; eight would weigh $680 > 620$ — over.',
          'Hence the loaded lift (7 crates) is within its rating, with $25$ kg of margin, and the rating tops out at $7$ crates — the ray $n \\leq \\frac{124}{17}$ pruned by the habitat.',
        ], },
        { kind: 'callout', tone: 'definition', title: 'Definition — boundary, formally', text: 'For a linear inequality solved to the shape $x < t$, $x \\leq t$, $x > t$ or $x \\geq t$, the number $t$ is called the boundary point of the solution set: the set lies entirely on one side of $t$, and $t$ itself belongs exactly when the sign is slack. Thus, $x \\leq t$ keeps $t$, \\; $x < t$ refuses $t$ — one number of difference, priced on the census window as 17 against 16 and 9 against 8.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — two strokes enter mathematics', text: 'The pointed inequality signs $<$ and $>$ entered print posthumously in 1631, in Artis Analyticae Praxis, the algebra of the English mathematician Thomas Harriot (c. 1560–1621), assembled from his manuscripts by his executors. The story told in older books — that the signs mimic the smaller and larger ends of the two strokes — is later folklore, but the symbols spread because they do what good notation always does: they turn a sentence of words ("a is less than b") into a mark the eye can check at a glance. The slack companions $\\leq$ and $\\geq$, doubling the bar to invite equality, are usually credited to the French hydrographer Pierre Bouguer in 1734 — a century of patience for the boundary to get its own ink.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — what the examinations ask of this lesson', text: 'Five shapes recur. (1) Sentence translation: "at least" → $\\geq$, "at most / no more than" → $\\leq$, "above / more than" → $>$, "below / fewer than" → $<$, "not less than" → $\\geq$ — the words decide the boundary. (2) Picture matching: given the ray, pick the assertion — the hollow/filled distinction is the trap. (3) Whole-number habitat: "the greatest whole number $n$ with $12n \\leq 50$" — solve to $n \\leq 25/6$, then prune to $4$ (the ray is not the answer; the habitat keeps it). (4) Law identification: which move preserves and which reverses — adding never reverses, multiplying by a negative always does. (5) Boundary membership: "is $-1$ a solution of $x > -1$?" — no; of $x \\geq -1$? — yes. Every shape is settled by the sign reading plus the habitat.' },
        { kind: 'heading', text: 'Order, Collected' },
        { kind: 'para', text: 'From the above discussion, the collected instrument set of this lesson stands as follows — the whole grammar of order in one list:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) The trichotomy: for any reals $a, b$ exactly one of $a < b$, $a = b$, $a > b$ holds — 78/13/78 over the 169-pair grid, exhaustive and exclusive.',
          '(ii) The sign reading: $a < b \\Leftrightarrow b - a > 0$ — every order question reduces to the sign of a difference.',
          '(iii) The addition and subtraction laws preserve order for every addend, positive or negative (4,394 grid checks, zero flips) — and transitivity composes chains ($84$ on $[-4, 4]$).',
          '(iv) Positive scaling preserves order; multiplication or division by a NEGATIVE reverses it — the flip, the one new licence, proved and worked in 7.2.',
          '(v) Solution sets of linear inequalities are rays: direction from the sign after solving, boundary from the sign before it — hollow for strict, filled for slack; degenerate rays shrink to nothing ($x < x$) or everything ($x \\leq x$).',
          '(vi) Word problems run on habitats: solve on the real line, then let the habitat (whole numbers, integers) keep what it keeps — the budget that reads $n \\leq 25/6$ buys four pens.',
        ] },
        { kind: 'para', text: 'The laws are the licence; the next lesson is the craft. With the balance of chapter 5, every move was direction-free — do the same to both members and stop. With order, every move must be checked against the compass: does this one preserve, or does it turn the line around? Lesson 7.2 builds the full solving pipeline — clear, expand, gather, isolate — with the flip station at its heart, proved from the sign laws over a designed grid, and exercised until reversing becomes as automatic as balancing. The pipeline of 5.2 is about to learn to face both directions.' },
        { kind: 'formula', name: 'The sign reading', latex: 'a < b \\;\\iff\\; b - a > 0, \\qquad a > b \\;\\iff\\; a - b > 0', note: 'order decided by the sign of the difference — the one instrument behind every check of this chapter' },
        { kind: 'formula', name: 'The order laws', latex: 'a < b \\implies a \\pm c < b \\pm c; \\quad a < b,\\ c > 0 \\implies ca < cb; \\quad a < b,\\ c < 0 \\implies ca > cb', note: 'add/subtract: always preserve · scale by positive: preserve · scale by negative: REVERSE (the flip)' },
        { kind: 'formula', name: 'The ray shapes', latex: 'x < t \\text{ open left}, \\; x \\leq t \\text{ closed left}, \\; x > t \\text{ open right}, \\; x \\geq t \\text{ closed right}', note: 'direction says the side; fill says the boundary — slack keeps t, strict refuses it' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'The solution set of $x + 3 < 7$ is —',
            options: ['$\\{x : x < 4\\}$', '$\\{x : x < 10\\}$', '$\\{x : x > 4\\}$', '$\\{x : x = 4\\}$'],
            answer: 0,
            explain: 'Subtract $3$ from both members (lawful, no flip): $x < 4$. Option 2 forgot that the $3$ rides on the $x$-side and read $x < 7 + 3$; option 3 points the ray the wrong way — subtraction preserves direction, it does not reverse it; option 4 solves the EQUATION $x + 3 = 7$ instead, keeping only the boundary point that the strict inequality refuses (7 < 7 is false).',
          },
          {
            q: 'On the number line, the solution set of $x \\leq -1$ is drawn as —',
            options: ['a hollow dot at −1 with the ray going left', 'a filled dot at −1 with the ray going left', 'a hollow dot at −1 with the ray going right', 'a filled dot at −1 with the ray going right'],
            answer: 1,
            explain: 'The ray $x \\leq -1$ holds the numbers at and left of $-1$ (12 window integers), so the ray runs LEFT; the slack sign includes the boundary, so the dot is FILLED. Option 1 draws the strict sign $x < -1$ (hollow); options 3 and 4 point right — that is the territory of $x \\geq -1$ and $x > -1$.',
          },
          {
            q: 'For real numbers $a, b, c$: which claim is ALWAYS true?',
            options: ['if $a < b$ then $a + c < b + c$', 'if $a < b$ then $a \\cdot c < b \\cdot c$', 'if $a < b$ then $a - c > b - c$', 'if $a < b$ then $\\frac{a}{c} < \\frac{b}{c}$ for every nonzero c'],
            answer: 0,
            explain: 'The addition law holds for EVERY addend — the verifier priced it on 4,394 grid equivalences with zero failures. Option 2 dies at any negative $c$ (the flip: $2 < 5$ but $-6 > -15$); option 3 reverses without cause — subtraction preserves, so $a - c < b - c$; option 4 is the positive-scaling law overstated: it fails for negative $c$ exactly as option 2 does.',
          },
          {
            q: 'How many WHOLE numbers $n$ satisfy $12n \\leq 50$?',
            options: ['3', '4', '5', 'infinitely many'],
            answer: 2,
            explain: 'Solve on the real line: $n \\leq \\frac{50}{12} = \\frac{25}{6}$; the whole-number habitat keeps $\\{0, 1, 2, 3, 4\\}$ — five values, $12 \\times 4 = 48 \\leq 50$ but $60 > 50$. Option 2 (four) drops $n = 0$ — zero pens is a legal purchase; option 1 has no reading; option 4 forgets the habitat: on the reals the ray is infinite, but pens are bought in whole numbers.',
          },
          {
            q: 'Given $2 < 5$, multiplying both members by $-3$ gives —',
            options: ['$-6 < -15$', '$-6 > -15$', '$6 > 15$', '$-6 = -15$'],
            answer: 1,
            explain: 'A negative multiplier REVERSES the sign: $-3 \\times 2 = -6$ and $-3 \\times 5 = -15$, and on the line $-6$ sits RIGHT of $-15$ — so $-6 > -15$. Option 1 keeps the old direction — the classic flip error; option 3 multiplied by $+3$ and then reversed without cause ($6 < 15$ is the truth there); option 4 claims an equality that only multiplying by $0$ produces.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 7.1', sets: [
          { level: 'L1', questions: [
            {
              q: 'Is $-2$ a solution of $x + 5 < 4$? Is $0$?',
              solution: [
                'Take $x = -2$: $-2 + 5 = 3$, and $3 < 4$ — true, so $-2$ belongs to the solution set.',
                'Take $x = 0$: $0 + 5 = 5$, and $5 < 4$ — false, so $0$ is excluded.',
                'Hence the census test (substitute, read the truth) settles both, exactly as in 5.1.',
              ],
              answer: '$-2$ yes; $0$ no.',
            },
            {
              q: 'Solve $x - 4 \\leq 2$ and count its integer solutions on $[-10, 10]$.',
              solution: [
                'Add $4$ to both members (the addition law): $x \\leq 6$ — the closed ray left of $6$.',
                'On $[-10, 10]$ the integers are $-10, -9, \\ldots, 6$ — seventeen of them.',
                'The boundary $6$ is included ($6 - 4 = 2 \\leq 2$ — true), filling the dot.',
              ],
              answer: '$x \\leq 6$ — 17 integers on $[-10, 10]$.',
            },
            {
              q: 'Is $-1$ in the solution set of $x > -1$? Of $x \\geq -1$?',
              solution: [
                'Test the strict claim: $-1 > -1$ is FALSE — a number cannot sit strictly right of itself.',
                'Test the slack claim: $-1 \\geq -1$ is TRUE — equality is allowed.',
                'Hence the boundary belongs to the slack set and refuses the strict one — one number of difference.',
              ],
              answer: 'No for $x > -1$; yes for $x \\geq -1$.',
            },
          ] },
          { level: 'L2', questions: [
            {
              q: 'Solve $x + 3 < 7$ and verify with three test points.',
              solution: [
                'Subtract $3$ from both members: $x < 4$ — the open ray left of $4$.',
                'Inside: $x = 3$ gives $6 < 7$ — true.',
                'Boundary: $x = 4$ gives $7 < 7$ — false, correctly excluded; outside: $x = 5$ gives $8 < 7$ — false.',
              ],
              answer: '$x < 4$, verified at $3$, $4$ and $5$.',
            },
            {
              q: 'Solve $5x \\leq 45$ and check the boundary from both sides.',
              solution: [
                'Divide both members by $5 > 0$ (positive scaling — no flip): $x \\leq 9$.',
                'Boundary in: $5 \\times 9 = 45 \\leq 45$ — true, so $9$ belongs.',
                'Just out: $x = 9.2$ gives $46 > 45$ — false. The closed ray is honest at its edge.',
              ],
              answer: '$x \\leq 9$, boundary included.',
            },
            {
              q: '"The temperature stays above −4 degrees." Write the assertion, and say whether −4 itself is allowed.',
              solution: [
                '"Above $-4$" is strict: $t > -4$ for the temperature $t$.',
                'Test the boundary: $-4 > -4$ is false — the freezing-line value is NOT allowed.',
                'Hence the open ray: $-3.9$ qualifies, $-4$ does not — the words "above" refuse the boundary.',
              ],
              answer: '$t > -4$; $-4$ itself is excluded.',
            },
          ] },
          { level: 'L3', questions: [
            {
              q: 'From $2 < 5$, deduce $2 + 7 < 5 + 7$ and $2 - 7 < 5 - 7$, citing the law used at each step.',
              solution: [
                'Add $7$ to both members (the addition law, $c = 7$): $9 < 12$ — still ordered.',
                'Subtract $7$ from both members (the same law with $c = -7$): $-5 < -2$ — still ordered, now on the negative side.',
                'Hence both descendants of $2 < 5$ are true — shifting never disturbs the direction, whatever the sign of the shift.',
              ],
              answer: '$9 < 12$ and $-5 < -2$ — addition and subtraction preserve order.',
            },
            {
              q: 'If $x \\geq 3$, what can be said about $2x + 1$? Verify at $x = 3$ and $x = 4$.',
              solution: [
                'Multiply both members by $2 > 0$ (positive scaling): $2x \\geq 6$.',
                'Add $1$ (the addition law): $2x + 1 \\geq 7$ — the whole chain of lawful moves.',
                'Check: at $x = 3$, $2x + 1 = 7$ — the boundary case, included; at $x = 4$, $2x + 1 = 9 \\geq 7$ — comfortably true.',
              ],
              answer: '$2x + 1 \\geq 7$ — order survives scaling and shifting.',
            },
            {
              q: 'Count the integers in $\\{x : -3 \\leq x < 5\\}$. Why is this set neither open nor closed as a whole?',
              solution: [
                'The integers from $-3$ up to but not including $5$: $-3, -2, -1, 0, 1, 2, 3, 4$ — eight of them.',
                'The left end is CLOSED ($-3$ belongs: $-3 \\leq -3$); the right end is OPEN ($5$ is refused: $5 < 5$ is false).',
                'Hence the mixed set carries one filled and one hollow end — a foretaste of the compound sets of 7.3.',
              ],
              answer: 'Eight integers (−3 … 4); closed at −3, open at 5.',
            },
          ] },
          { level: 'L4', questions: [
            {
              q: 'The solution set of $x + k < 2$ is $x < -1$. Find $k$.',
              solution: [
                'Solve with $k$ still aboard: $x < 2 - k$ (subtract $k$ — lawful for any sign).',
                'The given ray is $x < -1$, so the boundaries must agree: $2 - k = -1$.',
                'Hence $k = 3$. Verify pointwise: $x + 3 < 2$ versus $x < -1$ agree at every integer of the census window — the verifier swept all $25$.',
              ],
              answer: '$k = 3$.',
            },
            {
              q: 'Solve $3x + 2 \\leq 11$ and count its whole-number solutions in $[0, 20]$.',
              solution: [
                'Subtract $2$: $3x \\leq 9$; divide by $3 > 0$: $x \\leq 3$ — the closed ray.',
                'The whole-number habitat in $[0, 20]$ keeps $\\{0, 1, 2, 3\\}$ — four values.',
                'Check the cut: $3 \\times 3 + 2 = 11 \\leq 11$ in; $3 \\times 4 + 2 = 14 > 11$ out.',
              ],
              answer: '$x \\leq 3$ — four whole solutions (0, 1, 2, 3).',
            },
          ] },
          { level: 'L5', questions: [
            {
              q: 'Pens cost ₹18 each and you hold ₹120. Find the most pens you can buy.',
              solution: [
                'The budget reads $18n \\leq 120$ for the whole number of pens $n$.',
                'Divide by $18 > 0$: $n \\leq \\frac{120}{18} = \\frac{20}{3}$ — the ray on the real line.',
                'The habitat prunes to $\\{0, 1, \\ldots, 6\\}$: six pens cost $108 \\leq 120$ — fits; seven cost $126 > 120$ — over.',
              ],
              answer: 'Six pens (n ≤ 20/3 pruned by the whole-number habitat).',
            },
            {
              q: 'A lift is rated for at most 620 kg; each crate weighs 85 kg. State the inequality, solve it, and find the greatest number of crates the lift may carry.',
              solution: [
                'The rating reads $85n \\leq 620$.',
                'Divide by $85 > 0$: $n \\leq \\frac{620}{85} = \\frac{124}{17}$ — about $7.29$ on the real line.',
                'The whole-number habitat keeps $\\{0, 1, \\ldots, 7\\}$: seven crates weigh $595 \\leq 620$ (legal, $25$ kg margin); eight weigh $680 > 620$ (over).',
                'Hence the greatest legal load is seven crates — the ray answered, the habitat decided.',
              ],
              answer: '7 crates — the habitat’s cut of the ray $n \\leq 124/17$.',
            },
          ] },
          { level: 'L6', questions: [
            {
              q: 'Prove transitivity — if $a < b$ and $b < c$ then $a < c$ — from the sign reading, and explain why the same proof works for $\\geq$ with all arrows turned.',
              solution: [
                'Assume $a < b$ and $b < c$. By the sign reading: $b - a > 0$ and $c - b > 0$ — two positive differences.',
                'The sum of two positives is positive (the sign law of ANS 7.2): $(b - a) + (c - b) = c - a > 0$ — the middle number telescopes away exactly.',
                'The sign reading converts back: $c - a > 0$ means $a < c$. Done — no picture, only signs.',
                'For $\\geq$: the hypotheses become $b - a \\geq 0$ and $c - b \\geq 0$; the sum $c - a \\geq 0$ (nonnegative plus nonnegative), which reads $a \\geq c$. The proof is identical with every strict sign slackened — positivity weakens to nonnegativity and survives the addition.',
              ],
              answer: 'Transitivity is the sign law on the telescoping sum (b − a) + (c − b) = c − a; the ≥ version turns every > into ≥ and survives.',
            },
          ] },
        ] },
      ],
    },
    {
      id: 'al-solving-linear-inequalities',
      number: '7.2',
      title: 'Solving Linear Inequalities',
      concepts: [
        'the 5.2 pipeline re-run with a compass',
        'the LCD strike for fractional inequalities',
        'the flip: multiplying or dividing by a negative',
        'the flip theorem, proved from the sign laws',
        'the three-point check: boundary, inside, outside',
        'parameter families and moving boundaries',
        'largest and smallest integer questions',
        'equivalent inequalities',
      ],
      objectives: [
        'solve any linear inequality in one variable by the five-station pipeline',
        'state and prove the flip theorem from the sign reading and the sign laws',
        'apply the flip when multiplying or dividing by a negative — and only then',
        'clear fractional and decimal dresses with positive LCD strikes',
        'run the three-point check: boundary, inside, outside',
        'answer parameter, largest-integer and whole-number-habitat questions',
      ],
      prerequisites: ['al-order-and-the-solution-set', 'al-solving-linear-equations'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math11-ch5', 'khattar-qa-4e', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Lesson 7.1 handed over the licence: the addition law, the positive-scaling law, and the flip — stated, with grid evidence behind each. This lesson turns licence into craft. The claim to settle now looks like $3x - 5 < 16$ or $\\frac{2x-1}{3} < \\frac{x+4}{2}$: a LINEAR INEQUALITY in one unknown, and the job is to describe its whole solution set as a ray. The machinery is exactly the solving pipeline of 5.2 — clear, expand, gather, isolate, check — run with one new discipline: every move must be checked against the compass of 7.1, because one family of moves turns the line around.' },
        { kind: 'para', text: 'The plan of the lesson: first map the pipeline station by station and see which moves preserve and which reverse; then PROVE the flip from the sign laws — the theorem 7.1 promised — and watch it on the mirror of the line; then run the pipeline across ten exhibits, from the one-station trivial to the fractional dress; and finally build the habits that examinations price — the three-point check, the parameter family, and the largest-integer hunt. By the end, solving an inequality should feel exactly like solving an equation, plus one deep breath at the isolate station.' },
        { kind: 'heading', text: 'The Pipeline, with a Compass' },
        { kind: 'para', text: 'A linear inequality in one variable is any assertion that can be dressed into the form $a x + b \\circ c$, where $\\circ$ is one of $<, \\leq, >, \\geq$ and $a \\neq 0$. The form is the 5.2 standard form with the equals sign replaced by an order sign — and the solving strategy is the 5.2 strategy, station by station, with the order laws of 7.1 as the licence for each move:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) CLEAR — strike fractions and decimals by multiplying both members by a positive LCD: lawful, no flip (positive scaling).',
          '(ii) EXPAND — multiply out brackets: each product is a scaling of a true claim, lawful when the factor is positive; a negative BRACKET FACTOR must be watched — it is the flip in disguise.',
          '(iii) GATHER — move all $x$-terms to one side by adding or subtracting: lawful, never flips (the addition law, whatever the sign of the addend).',
          '(iv) ISOLATE — divide by the $x$-coefficient: lawful and direction-keeping when the coefficient is positive; when it is NEGATIVE, the flip fires and the sign must reverse.',
          '(v) CHECK — substitute the boundary and one point on each side: the three-point check catches every flip error at its source.',
        ] },
        { kind: 'terms', items: [
          { term: 'linear inequality in one variable', def: 'an assertion dressable as $a x + b \\circ c$ with $\\circ \\in \\{<, \\leq, >, \\geq\\}$ and $a \\neq 0$ — the 5.2 standard form with the equals sign replaced by an order sign' },
          { term: 'equivalent inequalities', def: 'two inequalities with exactly the same solution set; every lawful pipeline move (add/subtract anything, scale by a positive, scale by a negative WITH the flip) produces an equivalent one' },
          { term: 'the flip', def: 'the reversal of order under multiplication or division by a NEGATIVE number — $a < b \\iff ka > kb$ for $k < 0$ — proved in this lesson from the sign laws' },
          { term: 'the LCD strike', def: 'clearing fractions or decimals by multiplying both members by a positive common denominator — positive scaling, so never a flip' },
          { term: 'the three-point check', def: 'substituting the boundary, one inside point and one outside point after solving: the boundary must belong exactly for slack signs, inside must hold, outside must fail' },
          { term: 'parameter family', def: 'a family of inequalities indexed by a constant $k$ whose solution rays slide with it — $4x - k < 0$ solves to $x < k/4$, the boundary riding on $k$' },
          { term: 'integer habitat', def: 'the restriction of a solution ray to whole numbers or integers — the ray $x > 4$ keeps no smallest real but keeps the smallest integer $5$' },
          { term: 'the calm case', def: 'solving with a positive $x$-coefficient: the ray leaves the pipeline pointing the same way the sign entered — every station preserves' },
        ] },
        { kind: 'equation', latex: 'a x + b \\circ c \\;\\longrightarrow\\; a x \\circ (c - b) \\;\\longrightarrow\\; x \\circ \\frac{c - b}{a} \\quad (a > 0)', note: 'the calm case: coefficient positive, the ray points the same way as the original sign — every station preserves' },
        { kind: 'para', text: 'The calm case is genuinely calm: with $a > 0$, the ray that comes out points the same way as the sign that went in. Solve $2x < 14$: divide by $2$, keep the sign, $x < 7$ — and the verifier confirms the two assertions agree at every integer of the census window (nineteen of them). Solve $x - 5 \\geq -2$: add $5$, $x \\geq 3$ — still calm (ten window integers). Everything interesting in this lesson lives at station (iv) with a negative coefficient, and that is where we go next — to prove, not just to obey.' },
        { kind: 'heading', text: 'The Flip, Proved' },
        { kind: 'derivation', title: 'Theorem — the flip: multiplying by a negative reverses order', statement: 'For real numbers $a, b$ and $k < 0$: \\; $a < b \\iff k a > k b$. In particular $a < b \\iff -a > -b$, and dividing by $k < 0$ reverses order too. Two reversals compose back to the original: if $k_1 k_2 > 0$ then $a < b \\iff k_1 k_2 a < k_1 k_2 b$.', steps: [
          { label: 'Turn order into a sign', formula: 'a < b \\;\\Longrightarrow\\; b - a > 0', explanation: 'The sign reading: the gap is positive. The whole proof is one bookkeeping of this gap through the multiplication.' },
          { label: 'Push the gap through k', formula: 'k < 0, \\; b - a > 0 \\;\\Longrightarrow\\; k\\,(b - a) < 0', explanation: 'The sign law of ANS 7.2: negative times positive is negative. This is the ENTIRE mystery of the flip — the multiplication drags the positive gap across zero.' },
          { label: 'Expand the bookkeeping', formula: 'k\\,(b - a) = k b - k a < 0 \\;\\Longrightarrow\\; k a - k b > 0', explanation: 'Distribute, then negate both sides (lawful: negating is multiplying by −1, which reverses once). The gap of the MULTIPLIED pair, $ka - kb$, is positive.' },
          { label: 'Read the order back', formula: 'k a - k b > 0 \\;\\Longrightarrow\\; k a > k b', explanation: 'The sign reading, run backwards. Hence $a < b$ FORCES $ka > kb$ — the reverse arrow of the equivalence is done; the forward arrow is the same computation read up, or the double-flip below.' },
          { label: 'Division is multiplication', formula: '\\frac{a}{k} > \\frac{b}{k} \\;\\; (k < 0)', explanation: 'Dividing by $k$ IS multiplying by $\\frac{1}{k}$, and the reciprocal of a negative is negative — so the division form carries the same reversal. The verifier priced the division form exactly: 2,028 reversals over $k \\in [-6, -1]$.' },
          { label: 'Two flips cancel', formula: 'k_1 < 0, \\; k_2 < 0 \\;\\Longrightarrow\\; k_1 k_2 > 0 \\;\\Longrightarrow\\; a < b \\iff k_1 k_2 a < k_1 k_2 b', explanation: 'The product of two negatives is positive, and positive scaling preserves — so a double reflection returns the original order, the mirror image of the mirror image. Priced on 1,521 systems.' },
        ], result: 'For k < 0: a < b ⟺ ka > kb — multiplying or dividing by a negative reverses the sign, exactly; two reversals return the original order. The verifier priced 2,028 exact reversals, 1,521 double-flip systems, and the wrong-move (flip omitted) mismatched the truth in 1,112 of 1,200 windowed censuses.' },
        { kind: 'para', text: 'The proof earns its picture. Multiplying by $-1$ REFLECTS the number line about zero: every point swaps to its opposite, left becomes right, and the two points $2$ and $5$ land on $-2$ and $-5$ — still three units apart, but now the smaller-magnitude one sits on the right. Any negative multiplier $k$ is a reflection (the $|-1|$ part) followed by a positive scaling (the $|k|$ part): reflect first, stretch second. The gap survives every step; only its SIGN turns. That is why the flip is unavoidable, not a convention — it is the geometry of the mirror.' },
        { kind: 'figure', caption: 'The flip mirror: multiplying by −1 reflects the line about zero. The pair 2 < 5 (two left of five, gap 3) becomes −2 > −5 (−2 right of −5, same gap 3) — direction reversed, distance intact.', svg: flipMirrorSvg() },
        { kind: 'para', text: 'The proof also announces what does NOT flip. Adding a negative number is not a multiplication — the addition law carried the addend through unchanged, and the verifier priced the trap directly: over all $1{,}014$ grid pairs with addend in $[-6, -1]$, adding never reversed. Multiplying by $0$ is no move at all: it collapses every claim to $0 \\circ 0$, destroying the information (the 5.1 warning, unchanged). The flip belongs to multiplication and division by NEGATIVES — and to nothing else. Students who "flip at every negative sighting" are over-correcting; students who never flip are under-reading; the pipeline asks for exactly one discipline: check the SIGN of the multiplier at station (iv).' },
        { kind: 'callout', tone: 'warn', title: 'Caution — omitting the flip is not a small error', text: 'Take $-4x > 12$. Dividing by $-4$ WITH the flip gives $x < -3$ — the truth. Omitting the flip gives $x > -3$ — the OPPOSITE ray: on the census window it keeps $15$ integers where the truth keeps $9$, and the two sets share NOTHING. The wrong answer is not slightly wrong; it is precisely backwards. The three-point check kills it in one line: $x = 0$ satisfies $-4(0) > 12$? No — so $0$ cannot belong, yet $x > -3$ admits it.' },
        { kind: 'callout', tone: 'insight', title: 'Insight — why 5.2 never needed this', text: 'The equation pipeline of 5.2 ran on the balance, and the balance has no direction: "equal" is the same claim forwards and backwards, so multiplying by $-1$ changed nothing ($2 = 5$ is false, but so is $-2 = -5$ — the truth value survives any lawful move). Order has a direction, so a reflection CHANGES the claim: $2 < 5$ is true and $-2 < -5$ is false. The flip is the price of upgrading from equality to order — the one deep breath the new grammar demands. Equivalently: the move-licence engine of this chapter’s verifier censused 300 assertions through every lawful move and the solutions never moved; omit the flip and the census moved 1,112 times out of 1,200.' },
        { kind: 'heading', text: 'The Pipeline at Work' },
        { kind: 'example', title: 'Solve 2x < 14', steps: [
          'The coefficient is already alone at station (iv): divide both members by $2 > 0$ — positive scaling, no flip.',
          'Read: $x < 7$ — the open ray left of $7$.',
          'Check the boundary: $2 \\times 7 = 14$, and $14 < 14$ is false — the boundary is correctly out.',
          'Hence $x < 7$; the verifier counts $19$ window integers ($-12$ through $6$) in the ray.',
        ] },
        { kind: 'example', title: 'Solve x − 5 ≥ −2', steps: [
          'Station (iii) only: add $5$ to both members (the addition law, $c = 5$ — never flips).',
          'Read: $x \\geq 3$ — the closed ray right of $3$.',
          'Check the boundary: $3 - 5 = -2 \\geq -2$ — true, included as the slack sign promised.',
          'Hence $x \\geq 3$; ten window integers ($3$ through $12$) ride the ray.',
        ] },
        { kind: 'example', title: 'Solve −4x > 12 — the flip in action', steps: [
          'Divide both members by $-4$: NEGATIVE coefficient — the flip fires.',
          'Divide and reverse: $x < \\frac{12}{-4}$, that is $x < -3$ — the open ray LEFT of $-3$.',
          'Check inside: $x = -4$ gives $16 > 12$ — true. Check the boundary: $-4 \\times (-3) = 12$, and $12 > 12$ is false — out, as the strict sign demands.',
          'Hence $x < -3$ — and the omitted flip would have written $x > -3$, the opposite ray, sharing no window integer with the truth.',
        ] },
        { kind: 'example', title: 'Solve 3x − 5 < 16 with the three-point check', steps: [
          'Gather: add $5$ to both members — $3x < 21$.',
          'Isolate: divide by $3 > 0$, no flip — $x < 7$.',
          'Three-point check: boundary $x = 7$ gives $16 < 16$ — false, correctly excluded; inside $x = 6$ gives $13 < 16$ — true; outside $x = 8$ gives $19 < 16$ — false.',
          'Hence $x < 7$, confirmed at all three stations — the ray of 19 window integers.',
        ] },
        { kind: 'example', title: 'Solve 7 − 3x ≥ −2 — the flip, mid-pipeline', steps: [
          'Gather: subtract $7$ from both members — $-3x \\geq -9$.',
          'Isolate: divide by $-3$, NEGATIVE — flip the sign: $x \\leq 3$.',
          'Three-point check: boundary $x = 3$ gives $7 - 9 = -2 \\geq -2$ — true, included; inside $x = 0$ gives $7 \\geq -2$ — true; outside $x = 4$ gives $-5 \\geq -2$ — false.',
          'Hence $x \\leq 3$ — the closed ray of 16 window integers, the flip honored and verified.',
        ] },
        { kind: 'example', title: 'Solve 5 − 2x ≥ 11', steps: [
          'Gather: subtract $5$ — $-2x \\geq 6$.',
          'Isolate: divide by $-2$, NEGATIVE — flip: $x \\leq -3$.',
          'Three-point check: boundary $x = -3$ gives $5 + 6 = 11 \\geq 11$ — true, included; inside $x = -5$ gives $15 \\geq 11$ — true; outside $x = -1$ gives $7 \\geq 11$ — false.',
          'Hence $x \\leq -3$ — ten window integers, the boundary on board.',
        ] },
        { kind: 'para', text: 'Fractions and decimals dress the assertion before the pipeline runs — exactly as in 6.2 for systems. The strike multiplies both members by a positive LCD: lawful, no flip, because the strike is positive scaling. Only AFTER the strike can a negative coefficient surface, and then the flip applies where it stands. Two exhibits — one fractional, one decimal — and one expansion exhibit with a bracket:' },
        { kind: 'example', title: 'Solve (2x − 1)/3 < (x + 4)/2 — the fraction dress', steps: [
          'Strike by the LCD $6 = 3 \\times 2$ (positive — no flip): $2(2x - 1) < 3(x + 4)$.',
          'Expand: $4x - 2 < 3x + 12$.',
          'Gather: subtract $3x$ and add $2$ — $x < 14$.',
          'Check the boundary exactly: at $x = 14$ both sides equal $9$, and $9 < 9$ is false — out. At $x = 13$: $\\frac{25}{3} < \\frac{17}{2}$, exact because $50 < 51$.',
          'Hence $x < 14$ — the strike and the flip discipline both survived the dress.',
        ] },
        { kind: 'example', title: 'Solve 2(x + 3) > 4x − 8 — the expansion exhibit', steps: [
          'Expand the bracket: $2x + 6 > 4x - 8$.',
          'Gather: subtract $2x$ and add $8$ — $14 > 2x$.',
          'Read with care — the $x$ sits on the RIGHT: divide by $2 > 0$ (no flip) to get $7 > x$, which is $x < 7$ read left-to-right.',
          'Three-point check: boundary $x = 7$ gives $20 > 20$ — false, out; inside $x = 6$ gives $18 > 16$ — true.',
          'Hence $x < 7$ — the reversed reading is the one trap expansions add.',
        ] },
        { kind: 'example', title: 'Solve 0.5x + 1.5 ≤ 4 — the decimal dress', steps: [
          'Strike by $\\times 2$ (dyadic, exact — no rounding invented, no flip): $x + 3 \\leq 8$.',
          'Gather: subtract $3$ — $x \\leq 5$.',
          'Check the boundary: $0.5 \\times 5 + 1.5 = 4 \\leq 4$ — true, included.',
          'Hence $x \\leq 5$ — the decimal dress cost nothing because $2$ is a positive strike.',
        ] },
        { kind: 'example', title: 'For which k does 4x − k < 0 have the solution set x < 3?', steps: [
          'Solve with $k$ aboard: $4x < k$, so $x < \\frac{k}{4}$ — the boundary rides on $k$.',
          'Demand the boundary be $3$: $\\frac{k}{4} = 3$, so $k = 12$.',
          'Verify: $4x - 12 < 0$ versus $x < 3$ agree at every window integer; for $k = 8$ the ray becomes $x < 2$ — the boundary moved, as it must.',
          'Hence $k = 12$ and no other value — a parameter family is a slide rule of boundaries.',
        ] },
        { kind: 'figure', caption: 'The pipeline with the running example 7 − 3x ≥ −2 flowing through: clear, expand, gather, isolate (where the flip hides), and the three-point check that catches every flip error.', svg: pipelineSvg() },
        { kind: 'algorithm', title: 'The solving pipeline for a linear inequality in one variable', lines: [
          { code: 'CLEAR — multiply both members by a POSITIVE LCD to strike fractions/decimals', note: 'positive strike: lawful, no flip; a negative strike would flip' },
          { code: 'EXPAND — multiply out brackets; watch any negative bracket factor', note: 'a negative factor is the flip in disguise' },
          { code: 'GATHER — add/subtract to collect x-terms on one side, numbers on the other', note: 'the addition law never flips, whatever the sign' },
          { code: 'ISOLATE — divide by the x-coefficient a; if a < 0, REVERSE the sign', note: 'the flip theorem: a < b ⟺ ka > kb for k < 0' },
          { code: 'CHECK — substitute the boundary, one point inside, one point outside', note: 'boundary membership must match slack/strict; inside true; outside false' },
          { code: 'HABITAT — if the problem asks for whole numbers/integers, prune the ray', note: 'the habitat keeps what it keeps; then name largest/smallest if asked' },
        ], note: 'stations (i)–(iii) and (v)–(vi) are the 5.2 pipeline verbatim; station (iv) is the only place order can turn — one deep breath there.' },
        { kind: 'heading', text: 'Boundaries, Habitats and the Check Habit' },
        { kind: 'para', text: 'The three-point check deserves its name spelled out. After solving to a ray, substitute: (1) the BOUNDARY — it must satisfy the original exactly when the surviving sign is slack, and fail when strict; (2) one point clearly INSIDE the ray — the original must hold; (3) one point clearly OUTSIDE — the original must fail. Three substitutions, one verdict. The boundary is the load-bearing point: a flip error moves the ray to the opposite side, and the boundary test fails immediately — $-4x > 12$ solved as $x > -3$ puts the boundary $-3$ in a set where it does not belong ($-4 \\times (-3) = 12$ fails $12 > 12$). Flip errors cannot survive a boundary check; unchecked answers can.' },
        { kind: 'para', text: 'The integer hunts are the habitat of 7.1 cashed at speed. "Find the smallest integer satisfying $11 - 2x < 3$": gather $-2x < -8$, flip on dividing by $-2$, $x > 4$ — the open ray right of $4$, so the smallest INTEGER is $5$ ($11 - 10 = 1 < 3$, while $x = 4$ gives $3 < 3$, false). "Find the largest integer satisfying $7 - 2x > 1$": $-2x > -6$, flip, $x < 3$ — largest integer $2$. The pattern: solve to the ray, then let the habitat pick the end of the list; the boundary itself decides which side of it the integer sits on.' },
        { kind: 'example', title: 'You hold ₹500; notebooks cost ₹65 each; you must keep at least ₹40. How many can you buy?', steps: [
          'Model: $65n + 40 \\leq 500$ — the spend plus the reserve must stay under the purse.',
          'Gather: $65n \\leq 460$; isolate (÷ $65 > 0$, no flip): $n \\leq \\frac{460}{65} = \\frac{92}{13}$.',
          'The whole-number habitat keeps $\\{0, 1, \\ldots, 7\\}$: seven notebooks cost $455$, leaving $45 \\geq 40$ — the reserve survives; eight cost $520$, impossible.',
          'Hence seven notebooks — the ray answered, the habitat decided, the reserve honored.',
        ] },
        { kind: 'example', title: 'The average of four tests must be at least 40. The first three marks are 36, 44 and 31. What must the fourth mark m be?', steps: [
          'Model: $\\frac{36 + 44 + 31 + m}{4} \\geq 40$ — the average claim of the syllabus.',
          'Strike by $\\times 4$ (positive): $111 + m \\geq 160$.',
          'Gather: $m \\geq 49$ — the closed ray right of $49$.',
          'Check the boundary: $\\frac{111 + 49}{4} = \\frac{160}{4} = 40$ — exactly the pass line, included as $\\geq$ promised; $m = 48$ scores $39.75$ — out.',
          'Hence $m \\geq 49$: the fourth mark must be at least $49$.',
        ] },
        { kind: 'callout', tone: 'definition', title: 'Definition — equivalent inequalities', text: 'Two inequalities in the same unknown are said to be equivalent if they have exactly the same solution set. Every lawful pipeline move produces an equivalent inequality: adding or subtracting any number (the addition law), multiplying or dividing by any POSITIVE number (the positive-scaling law), and multiplying or dividing by a negative number TOGETHER WITH reversing the sign (the flip theorem). Thus, $-4x > 12 \\\\iff x < -3$ — equivalence, not equality of appearances. Moves outside this list (multiplying by $0$, squaring both members, omitting a needed flip) break equivalence and are not solving.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — the reversal enters the classroom', text: 'The reversal rule is as old as the systematic study of inequalities. The classical British algebra texts — Hall and Knight’s Elementary Algebra for Schools among them — state the fundamental properties of inequalities exactly in the shape of 7.1’s list: adding the same quantity preserves, multiplying by a positive preserves, multiplying by a negative REVERSES. The school tradition then standardized the caution as a headline: "reverse the inequality when multiplying or dividing by a negative" — the one-line summary of the theorem this lesson proved from the sign laws. What the classical books state as a rule to remember, the modern classroom can show as a mirror: reflect the line about zero and watch left become right.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — the craft at examination speed', text: 'Six shapes recur. (1) Straight solving — run the pipeline; the answer is a ray, and the boundary number must be exact (keep $\\frac{92}{13}$ until the habitat prunes). (2) The flip distractor: options that differ ONLY by the direction of the ray — the sign of the coefficient decides; check the boundary. (3) Largest/smallest integer: solve, then let the habitat pick — "$x > 4$" has smallest integer $5$, "$x \\leq -3$" has largest $-3$. (4) The parameter: given the solution set, read the boundary off — $4x - k < 0$ solving to $x < 3$ forces $k = 12$. (5) Word problems with a reserve or a margin — model first (spend + reserve ≤ purse), then solve, then prune to the habitat. (6) Fraction/decimal dresses: strike by a positive LCD first; the flip, if it comes, comes at station (iv) only. Speed habit: check the boundary FIRST — it is one substitution and it kills every direction error.' },
        { kind: 'heading', text: 'The Craft, Collected' },
        { kind: 'para', text: 'From the above discussion, the solving craft stands as follows — the whole pipeline in one instrument list:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) Every linear inequality dresses to $a x + b \\circ c$ with $a \\neq 0$; the pipeline of 5.2 solves it, with the order laws as the licence at each station.',
          '(ii) Adding or subtracting anything, and multiplying or dividing by a positive, are direction-safe — $4{,}394 + 2{,}028$ grid checks, zero reversals.',
          '(iii) Multiplying or dividing by a NEGATIVE reverses the sign — the flip theorem, proved from the sign laws (the gap dragged through $k < 0$), priced on $2{,}028$ exact reversals; two flips cancel ($1{,}521$ systems).',
          '(iv) The flip is multiplication’s alone: adding a negative never flips ($1{,}014$ trap checks), and multiplying by $0$ destroys the claim.',
          '(v) The three-point check — boundary, inside, outside — catches every direction error at the boundary; the omitted flip mismatched the truth in $1{,}112$ of $1{,}200$ windowed censuses.',
          '(vi) Parameters slide the boundary ($x < k/4$), habitats prune rays to lists, and the largest/smallest integer questions are habitat questions — solve, prune, read the end.',
        ] },
        { kind: 'para', text: 'One bridge closes the lesson — and aims at the next. Every inequality solved here kept a single boundary: one point cutting the line into the ray that belongs and the ray that does not. The chapter’s last lesson puts boundaries together: "between" claims like $-3 \\leq x < 5$ hold TWO boundaries at once, and joined claims — AND and OR — teach the two ways solution sets combine, intersection and union. The single ray of this lesson is about to grow into the intervals and regions where the rest of mathematics lives: the line of 6.3 cut the PLANE in two, and the balance of chapter 5, having learned to rule regions, now learns to rule them two boundaries at a time.' },
        { kind: 'formula', name: 'The flip theorem', latex: 'k < 0: \\quad a < b \\iff k a > k b, \\qquad a < b \\iff \\frac{a}{k} > \\frac{b}{k}', note: 'proved from the sign laws: the positive gap dragged through a negative k turns negative — reflect, then scale' },
        { kind: 'formula', name: 'The pipeline with its one branch', latex: 'a x + b \\circ c \\implies x \\circ \\frac{c - b}{a} \\;\\; (a > 0), \\qquad x \\;\\text{flip} \\;\\; \\frac{c - b}{a} \\;\\; (a < 0)', note: 'clear → expand → gather → isolate (flip iff a < 0) → check → habitat' },
        { kind: 'formula', name: 'The three-point check', latex: '\\text{boundary } t: \\text{in iff slack}; \\quad \\text{inside: true}; \\quad \\text{outside: false}', note: 'three substitutions, one verdict — the boundary kills every direction error' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'The first move for $\\frac{2x-1}{3} < \\frac{x+4}{2}$ should be —',
            options: ['multiply both members by 6 — no flip needed', 'multiply both members by 6 and flip the sign', 'subtract 2 from both members', 'divide both members by 6'],
            answer: 0,
            explain: 'The LCD of 3 and 2 is 6, a POSITIVE number, and positive scaling preserves direction: $6 \\times$ both members gives $2(2x-1) < 3(x+4)$, no flip. Option 2 flips without cause — flips answer only to negative multipliers; option 3 subtracts the wrong constant (the $2$ is a numerator, not a member); option 4 divides when the dress needs clearing — the fractions remain.',
          },
          {
            q: 'The solution of $5 - 2x \\geq 11$ is —',
            options: ['$x \\geq -3$', '$x \\leq -3$', '$x \\geq 3$', '$x \\leq 3$'],
            answer: 1,
            explain: 'Gather: $-2x \\geq 6$; divide by $-2$ — NEGATIVE, so the flip fires: $x \\leq -3$. The boundary confirms: $x = -3$ gives $5 + 6 = 11 \\geq 11$, true. Option 1 forgot the flip; option 3 flipped AND lost the sign of the boundary; option 4 flipped the direction but moved the boundary to $+3$ — two errors at once.',
          },
          {
            q: 'The largest integer satisfying $7 - 2x > 1$ is —',
            options: ['3', '2', '1', 'no largest integer exists'],
            answer: 1,
            explain: 'Gather: $-2x > -6$; divide by $-2$ with the flip: $x < 3$ — the open ray, so the integers run up to $2$: $7 - 2(2) = 3 > 1$, true, while $x = 3$ gives $1 > 1$, false. Option 1 ignores that the boundary itself is excluded (strict); option 3 stops one short; option 4 would be right for $x < 3$ on the REAL line, but the question asks for integers — the habitat ends the list.',
          },
          {
            q: 'The inequality $4x - k < 0$ has the solution set $x < 3$ exactly when —',
            options: ['$k = 3$', '$k = 7$', '$k = 12$', '$k = \\frac{1}{3}$'],
            answer: 2,
            explain: 'Solve with $k$ aboard: $x < \\frac{k}{4}$; demanding the boundary be $3$ forces $\\frac{k}{4} = 3$, that is $k = 12$. At $k = 3$ the ray is $x < \\frac{3}{4}$; at $k = 7$ it is $x < \\frac{7}{4}$ — both boundaries off target; at $k = \\frac{1}{3}$ the boundary is $\\frac{1}{12}$. The boundary moves with $k$ — one division, verified pointwise for $k = 12$.',
          },
          {
            q: 'Which of these moves NEVER reverses an inequality?',
            options: ['multiplying both members by −1', 'dividing both members by −2', 'adding −4 to both members', 'multiplying both members by −1 twice'],
            answer: 2,
            explain: 'Adding ANY number — positive or negative — preserves direction (the addition law; the verifier priced $1{,}014$ add-negative checks, zero reversals). Options 1 and 2 are negative multiplications in disguise: both flip exactly once. Option 4 flips TWICE — and two reversals compose back to the original order, so it also never lands reversed… but it is two flips, not a flip-free move: the addition law is the only move on the list that never reverses at any stage.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 7.2', sets: [
          { level: 'L1', questions: [
            {
              q: 'Solve $2x < 14$.',
              solution: [
                'Divide both members by $2 > 0$ — positive scaling, no flip: $x < 7$.',
                'Check the boundary: $2 \\times 7 = 14$, and $14 < 14$ is false — correctly out.',
                'Hence the open ray left of $7$.',
              ],
              answer: '$x < 7$.',
            },
            {
              q: 'Solve $x - 5 \\geq -2$.',
              solution: [
                'Add $5$ to both members (the addition law): $x \\geq 3$.',
                'Check the boundary: $3 - 5 = -2 \\geq -2$ — true, included.',
                'Hence the closed ray right of $3$.',
              ],
              answer: '$x \\geq 3$.',
            },
            {
              q: 'Solve $-4x > 12$.',
              solution: [
                'Divide both members by $-4$ — NEGATIVE, so the flip fires: $x < -3$.',
                'Check inside: $x = -4$ gives $16 > 12$ — true; boundary: $-4 \\times (-3) = 12$, and $12 > 12$ is false — out.',
                'Hence the open ray left of $-3$ — the flip honored.',
              ],
              answer: '$x < -3$ (the flip reversed the sign).',
            },
          ] },
          { level: 'L2', questions: [
            {
              q: 'Solve $3x - 5 < 16$ and run the three-point check.',
              solution: [
                'Gather: add $5$ — $3x < 21$; isolate: divide by $3 > 0$, no flip — $x < 7$.',
                'Boundary: $x = 7$ gives $16 < 16$ — false, out (strict).',
                'Inside $x = 6$: $13 < 16$ — true. Outside $x = 8$: $19 < 16$ — false.',
                'Hence $x < 7$, confirmed at all three points.',
              ],
              answer: '$x < 7$ — boundary out, inside true, outside false.',
            },
            {
              q: 'Solve $7 - 3x \\geq -2$.',
              solution: [
                'Gather: subtract $7$ — $-3x \\geq -9$.',
                'Isolate: divide by $-3$, NEGATIVE — flip: $x \\leq 3$.',
                'Three-point: boundary $x = 3$ gives $-2 \\geq -2$ — true, in; inside $x = 0$ gives $7 \\geq -2$ — true; outside $x = 4$ gives $-5 \\geq -2$ — false.',
              ],
              answer: '$x \\leq 3$ (flip on dividing by −3).',
            },
            {
              q: 'Solve $5 - 2x \\geq 11$.',
              solution: [
                'Gather: subtract $5$ — $-2x \\geq 6$.',
                'Isolate: divide by $-2$ — flip: $x \\leq -3$.',
                'Three-point: boundary $x = -3$ gives $11 \\geq 11$ — true, in; inside $x = -5$ gives $15 \\geq 11$ — true; outside $x = -1$ gives $7 \\geq 11$ — false.',
              ],
              answer: '$x \\leq -3$ (flip on dividing by −2).',
            },
          ] },
          { level: 'L3', questions: [
            {
              q: 'Solve $\\frac{2x - 1}{3} < \\frac{x + 4}{2}$.',
              solution: [
                'Strike by the LCD $6 > 0$ (no flip): $2(2x - 1) < 3(x + 4)$.',
                'Expand: $4x - 2 < 3x + 12$; gather: $x < 14$.',
                'Boundary, exact: at $x = 14$ both sides equal $9$, and $9 < 9$ is false — out; at $x = 13$, $\\frac{25}{3} < \\frac{17}{2}$ since $50 < 51$.',
              ],
              answer: '$x < 14$.',
            },
            {
              q: 'Solve $2(x + 3) > 4x - 8$.',
              solution: [
                'Expand: $2x + 6 > 4x - 8$.',
                'Gather: $14 > 2x$ — the unknown on the right.',
                'Divide by $2 > 0$ (no flip): $7 > x$, read as $x < 7$.',
                'Check: $x = 7$ gives $20 > 20$ — false, out; $x = 6$ gives $18 > 16$ — true.',
              ],
              answer: '$x < 7$ — mind the reversed reading $7 > x$.',
            },
            {
              q: 'Solve $0.5x + 1.5 \\leq 4$.',
              solution: [
                'Strike by $\\times 2$ (dyadic, exact, positive): $x + 3 \\leq 8$.',
                'Gather: subtract $3$ — $x \\leq 5$.',
                'Boundary: $0.5 \\times 5 + 1.5 = 4 \\leq 4$ — true, included.',
              ],
              answer: '$x \\leq 5$.',
            },
          ] },
          { level: 'L4', questions: [
            {
              q: 'For which $k$ does $4x - k < 0$ have the solution set $x < 3$? What ray does $k = 8$ give?',
              solution: [
                'Solve with $k$ aboard: $x < \\frac{k}{4}$ — the boundary rides on $k$.',
                'Demand $\\frac{k}{4} = 3$: hence $k = 12$ (verified pointwise over the window).',
                'At $k = 8$ the ray is $x < 2$ — the boundary slid two units left; at $k = 3$ it would be $x < \\frac{3}{4}$.',
              ],
              answer: '$k = 12$; $k = 8$ gives $x < 2$.',
            },
            {
              q: 'Find the smallest integer satisfying $11 - 2x < 3$.',
              solution: [
                'Gather: $-2x < -8$; isolate with the flip (÷ $-2$): $x > 4$ — the open ray right of $4$.',
                'The smallest INTEGER strictly above $4$ is $5$: check $11 - 10 = 1 < 3$ — true.',
                'Confirm the boundary refuses: $x = 4$ gives $3 < 3$ — false.',
              ],
              answer: '5.',
            },
          ] },
          { level: 'L5', questions: [
            {
              q: 'You hold ₹500; notebooks cost ₹65 each; you must keep at least ₹40 afterwards. How many notebooks can you buy?',
              solution: [
                'Model: $65n + 40 \\leq 500$ — spend plus reserve within the purse.',
                'Gather: $65n \\leq 460$; isolate (÷ $65 > 0$): $n \\leq \\frac{460}{65} = \\frac{92}{13}$.',
                'The habitat keeps $\\{0, \\ldots, 7\\}$: seven cost $455$, leaving $45 \\geq 40$ — reserve survives; eight cost $520$ — impossible.',
                'Hence seven notebooks, with ₹45 to spare.',
              ],
              answer: '7 notebooks ($n \\leq 92/13$ pruned by the habitat).',
            },
            {
              q: 'To pass, the average of four tests must be at least 40. The first three marks are 36, 44 and 31. What must the fourth mark $m$ be?',
              solution: [
                'Model: $\\frac{36 + 44 + 31 + m}{4} \\geq 40$.',
                'Strike by $\\times 4$: $111 + m \\geq 160$; gather: $m \\geq 49$.',
                'Boundary: $\\frac{111 + 49}{4} = 40$ — exactly the pass line, included; $m = 48$ gives $39.75$ — out.',
                'Hence the fourth mark must be at least $49$.',
              ],
              answer: '$m \\geq 49$.',
            },
          ] },
          { level: 'L6', questions: [
            {
              q: 'Prove the flip theorem — for $k < 0$, $a < b \\iff ka > kb$ — from the sign reading and the sign laws; deduce the division form; and explain why two flips cancel.',
              solution: [
                'Assume $a < b$: the sign reading gives $b - a > 0$.',
                'Push the gap through $k < 0$ (the sign law: negative × positive = negative): $k(b - a) < 0$.',
                'Expand the bookkeeping: $kb - ka < 0$, hence $ka - kb > 0$, and the sign reading returns $ka > kb$ — the reversal, forced.',
                'Conversely, if $ka > kb$ with $k < 0$, divide by $k$ (division by a negative is multiplication by the negative reciprocal $\\frac{1}{k} < 0$) and the flip returns $a < b$ — the equivalence closes both ways, and the division form $a < b \\iff \\frac{a}{k} > \\frac{b}{k}$ is the same theorem.',
                'Two flips cancel: for $k_1, k_2 < 0$ the product $k_1 k_2 > 0$, and positive scaling preserves order — so $a < b \\iff k_1 k_2 a < k_1 k_2 b$. Two reflections of the line return every point to its original side.',
              ],
              answer: 'The gap b − a > 0 dragged through k < 0 turns negative: ka > kb — with the division form and the two-flip cancellation read off the same bookkeeping.',
            },
          ] },
        ] },
      ],
    },
    {
      id: 'al-compound-inequalities-and-applications',
      number: '7.3',
      title: 'Compound Inequalities and Applications',
      concepts: [
        'compound inequality',
        'AND = intersection',
        'OR = union',
        'the between-form (interval)',
        'open and closed ends',
        'the two-boundary pipeline',
        'the empty AND',
        "De Morgan's reading",
      ],
      objectives: [
        'join two assertions about one unknown with AND or OR and say exactly which points each joiner keeps',
        'read and write between-forms, deciding boundary membership from the open/closed ends',
        'solve any compound of the shape a ≤ px + q ≤ b with the two-boundary pipeline — flip and end-swap included',
        'solve OR-sentences ray by ray and count the gap honestly',
        'recognize the empty AND and answer it without inventing a ray',
        'apply bands and unions to budgets, speed margins and gate problems, pruning to the habitat',
      ],
      prerequisites: ['al-order-and-the-solution-set', 'al-solving-linear-inequalities'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math11-ch5', 'khattar-qa-4e', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Chapter 7 so far has taught single sentences: one inequality, one boundary, one ray. But life rarely issues one constraint at a time. A race official sets a minimum speed for fear of straggling and a maximum for fear of the wall; a budget says how much you may spend, and a reserve says how much you must keep; an admission gate admits the very young and — quite separately — the very old. Each story is TWO or more inequalities about the same unknown, and the answer is whatever honours them together. Such a sentence is called a compound inequality, and this closing lesson makes the idea exact: the two lawful ways to join assertions (AND and OR), the shorthand the world uses for the commonest compound, the pipeline that solves the two-boundary dress, and the traps — above all the possibility that a compound has NO solution at all.' },
        { kind: 'para', text: 'The plan is the chapter’s plan, run once more at double width. First the joiners themselves, defined formally and priced on the census window: an AND keeps the points both members admit (the intersection), an OR keeps every point either member admits (the union). Then the between-form — $a < x < b$ and its slack variants — the compact dress for the AND of two opposite rays, with its four shapes and its open and closed ends. Then the two-boundary pipeline: the 7.2 pipeline applied to both gates of a band at once, with the flip examined carefully, because on a band it does not reverse a ray — it SWAPS the ends. Finally the applications, where bands and unions do the work examinations ask of them.' },
        { kind: 'heading', text: 'Two Claims at Once: AND and OR' },
        { kind: 'para', text: 'Two assertions about the same unknown can be joined in exactly two ways worth a name. The conjunction — spoken AND, written $\\wedge$ — demands BOTH: a number solves "$P$ and $Q$" only if it solves $P$ and solves $Q$. The disjunction — spoken OR, written $\\vee$ — demands AT LEAST ONE: a number solves "$P$ or $Q$" if it solves $P$, or solves $Q$, or — the case beginners forget — solves both. Neither joiner creates new mathematics: each is a lawful way of combining solution sets that 7.1 and 7.2 already know how to find. The set-language dress states both laws at once:' },
        { kind: 'terms', items: [
          { term: 'compound inequality', def: 'two or more inequalities about the same unknown, joined by AND or OR and judged as one sentence — its solution set is built from the members’ solution sets by intersection (AND) or union (OR)' },
          { term: 'intersection (AND)', def: 'the set of points satisfying BOTH members at once, written $A \\cap B$; on the line, two opposite rays meeting in a band — or in a point, or in nothing' },
          { term: 'union (OR)', def: 'the set of points satisfying AT LEAST ONE member, written $A \\cup B$; on the line, two rays, possibly with an honest gap between' },
          { term: 'between-form', def: 'the compound shorthand $a < x < b$ and its slack variants — one sentence carrying both gates; also called an interval' },
          { term: 'open end', def: 'an end written with a strict sign, whose boundary point is refused — drawn hollow on the line' },
          { term: 'closed end', def: 'an end written with a slack sign, whose boundary point is kept — drawn filled on the line' },
          { term: 'empty solution set', def: 'an AND whose rays never meet — $\\{x : x > 2 \\text{ and } x < -1\\} = \\varnothing$; a legitimate verdict, not a mistake' },
          { term: "De Morgan's reading", def: 'negating a compound swaps the joiner and negates each gate: not ($P$ and $Q$) = (not $P$) or (not $Q$); not ($P$ or $Q$) = (not $P$) and (not $Q$)' },
        ] },
        { kind: 'callout', tone: 'definition', title: 'Definition — compound assertions, formally', text: 'A compound inequality is said to be a conjunction (an AND) if its solution set is the intersection of its members’ solution sets: $x$ satisfies $P$ AND $Q$ exactly when $x$ satisfies $P$ and $x$ satisfies $Q$. It is said to be a disjunction (an OR) if its solution set is the union: $x$ satisfies $P$ OR $Q$ exactly when $x$ satisfies at least one of them. The word both carries the AND; the phrase at least one carries the OR — and "at least one" includes "both", the reading beginners most often drop.' },
        { kind: 'equation', latex: 'x \\in A \\cap B \\;\\Longleftrightarrow\\; x \\in A \\;\\wedge\\; x \\in B, \\qquad x \\in A \\cup B \\;\\Longleftrightarrow\\; x \\in A \\;\\vee\\; x \\in B', note: 'AND = intersection, OR = union — the two lawful joiners of assertions about one unknown' },
        { kind: 'list', marker: 'roman', items: [
          '$x \\geq -3$ and $x \\leq 5$ — an AND; the solution is the band of points where both gates stand open.',
          '$x < -1$ or $x > 3$ — an OR; the solution is two rays, with the stretch from $-1$ to $3$ belonging to neither.',
          '$2 \\leq 3x - 1 < 8$ — a between-form, the compact AND-dress that names both gates in one breath.',
        ] },
        { kind: 'para', text: 'On the census window the joiners become countable. The AND of $x \\geq -3$ (16 window integers) with $x \\leq 5$ (18) keeps the common points: the nine integers from $-3$ through $5$. Behind every such count stands the trading law $|A \\cap B| + |A \\cup B| = |A| + |B|$ — intersections and unions exchange material exactly, nothing created or destroyed — and the verifier priced it over one hundred designed ray-pairs with every combination of open and closed ends: zero failures. Two extreme cases anchor the scale. When two rays touch at one point — $x \\geq 3$ AND $x \\leq 3$ — the AND keeps exactly $\\{3\\}$: a legitimate one-point solution set. When they never meet, the AND keeps nothing at all; that verdict gets its own section below, because it is where the traps live.' },
        { kind: 'example', title: 'Describe the solution of x ≥ −3 AND x ≤ 5 — and count it on the window [−12, 12]', steps: [
          'Split: two gates — the right-ray $x \\geq -3$ and the left-ray $x \\leq 5$.',
          'Join: an AND keeps the common points — every $x$ with $-3 \\leq x \\leq 5$: the band, both ends closed.',
          'Census: $-3, -2, \\ldots, 4, 5$ — nine window integers; the verifier counted 9.',
          'Hence the closed band $-3 \\leq x \\leq 5$, nine of the twenty-five window integers.',
        ] },
        { kind: 'para', text: 'The OR is the generous joiner: it keeps everything either ray keeps. Two same-side rays collapse into one — "$x \\geq 2$ or $x \\geq 5$" is just the wider ray $x \\geq 2$, since whatever satisfies the stricter satisfies the looser; the verifier checked fifteen such absorption pairs pointwise. Two opposite rays are the interesting case: they can leave a GAP. "$x \\leq -2$ or $x > 3$" keeps eleven integers on the left and nine on the right and nothing between: twenty of the twenty-five window integers, with $-1, 0, 1, 2, 3$ out. Note what the OR did not do: it did not fill the gap. "Or" offers a choice of gates, and the five integers in the gap chose neither.' },
        { kind: 'list', items: [
          'AND is stingy: the compound’s census never exceeds either member’s — $-3 \\leq x < 5$ keeps 8 where the ray $x \\geq -3$ alone keeps 16 on the window.',
          'OR is generous: the compound’s census is at least each member’s — $x \\leq -2$ or $x > 3$ keeps 20, against 11 and 9 for the rays alone.',
          'The counting law: $|A \\cap B| + |A \\cup B| = |A| + |B|$ exactly — priced over 100 designed ray-pairs, open and closed ends alike.',
          'Absorption: same-side rays collapse to the wider ray under OR (and to the narrower under AND) — $x \\geq 2$ or $x \\geq 5$ is $x \\geq 2$, pointwise.',
        ] },
        { kind: 'example', title: 'Solve 2x − 1 > 5 OR 3x + 4 ≤ −2', steps: [
          'An OR solves each sentence separately — no coordination needed.',
          'Left: $2x > 6$, so $x > 3$ (divide by $2 > 0$ — no flip).',
          'Right: $3x \\leq -6$, so $x \\leq -2$ (divide by $3 > 0$ — no flip).',
          'Union: $4$ through $12$ (9 integers) plus $-12$ through $-2$ (11) — 20 window integers; the gap $-1$ through $3$ (five) stays out.',
          'Hence $x \\leq -2$ or $x > 3$ — two rays holding 20 of the 25 window integers.',
        ] },
        { kind: 'figure', caption: 'The two joiners at work on the same pair of boundaries −3 and 5: the AND closes the band −3 ≤ x ≤ 5 (9 window integers), while the OR of the negated rays keeps the 16 outside — 9 + 16 = 25, the De Morgan split, priced pointwise by the verifier.', svg: andOrPanelsSvg() },
        { kind: 'heading', text: 'Between-Forms: the Shorthand of the Band' },
        { kind: 'para', text: 'The commonest compound in mathematics is the AND of two opposite rays: a lower bound and an upper bound on the same unknown. Writing "$x \\geq -3$ and $x \\leq 5$" every time would be exhausting, so mathematics writes it in one breath — the between-form $-3 \\leq x \\leq 5$, read "x is between −3 and 5, ends included". The dress has exactly four shapes, one for each choice of open or closed ends, and the shapes differ by exactly the boundary points:' },
        { kind: 'figure', caption: 'The four interval shapes between the boundaries −3 and 5, with their censuses on [−12, 12]: closed both ends 9, one closed end 8, open both ends 7. Each closed end adds exactly its boundary point — the filled dot is that one number of difference.', svg: intervalShapesSvg() },
        { kind: 'table', caption: 'The four shapes, their ends, and the boundary rule', head: ['the shape', 'left end −3', 'right end 5', 'census on [−12, 12]'], rows: [
          ['$-3 \\leq x \\leq 5$', 'kept (closed)', 'kept (closed)', '9'],
          ['$-3 \\leq x < 5$', 'kept (closed)', 'refused (open)', '8'],
          ['$-3 < x \\leq 5$', 'refused (open)', 'kept (closed)', '8'],
          ['$-3 < x < 5$', 'refused (open)', 'refused (open)', '7'],
        ] },
        { kind: 'para', text: 'The table is the whole law of the band, and it compresses into one sentence: an end is closed exactly when its boundary belongs. The censuses make the law visible — 9, 8, 8, 7, each closed end worth exactly its one point. Membership is a two-sided question, and examinations price both sides: the largest integer in $-3 < x \\leq 5$ is 5, because the closed right end keeps its boundary; slack that one end and the largest drops to 4. The left end, meanwhile, decides the SMALLEST member, not the largest — in both shapes shown the strict left end refuses $-3$, so $-2$ is the smallest integer inside. One sign of difference, one whole answer of difference: the ends are where the marks live.' },
        { kind: 'example', title: 'Find the largest integer solving −3 < x ≤ 5 — and the largest under the strict right end −3 < x < 5', steps: [
          'The right end is closed: 5 itself belongs, since $5 \\leq 5$ and $5 > -3$ — the largest integer is 5.',
          'Slack the right end: $-3 < x < 5$ refuses 5 ($5 < 5$ is false) — the largest drops to 4.',
          'The left end governs the other tail: both shapes refuse $-3$, so the smallest integer inside is $-2$ in each.',
          'Hence largest 5 with the closed end; 4 under the strict end — one sign, one answer.',
        ] },
        { kind: 'heading', text: 'Solving Compounds: the Two-Boundary Pipeline' },
        { kind: 'para', text: 'Now the craft question: a compound arrives dressed as $1 \\leq 2x + 1 < 9$ — how does it come solved? The sentence is two inequalities sharing a middle member, and the answer is the 7.2 pipeline applied to BOTH gates at once: whatever lawful move is made on the middle member is made on BOTH outer members too, so the gates stay gates and the conjunction stays a conjunction. For a positive coefficient the two gates solve in the same direction and the band re-forms around them:' },
        { kind: 'equation', latex: 'a \\;\\leq\\; p\\,x + q \\;\\leq\\; b \\quad\\Longleftrightarrow\\quad \\frac{a - q}{p} \\;\\leq\\; x \\;\\leq\\; \\frac{b - q}{p} \\qquad (p > 0)', note: 'the two-boundary pipeline for a positive coefficient — one shift, one scale, both ends tracked' },
        { kind: 'derivation', title: 'Theorem — the two-boundary pipeline, and what the flip does to a band', statement: 'For real numbers $a \\leq b$ and $p \\neq 0$: the compound assertion $a \\leq p x + q \\leq b$ is equivalent to the solved band $\\frac{a-q}{p} \\leq x \\leq \\frac{b-q}{p}$ when $p > 0$, and to $\\frac{b-q}{p} \\leq x \\leq \\frac{a-q}{p}$ when $p < 0$ — the ends SWAP. Both gates obey the one-variable laws of 7.1–7.2, applied to the same middle member.', steps: [
          { label: 'Split the sentence', formula: 'a \\leq p x + q \\quad \\text{and} \\quad p x + q \\leq b', explanation: 'The compound assertion is two ordinary inequalities sharing the middle member. Solve both, keep the conjunction — an AND of two gates.' },
          { label: 'Shift all three members', formula: 'a - q \\leq p x \\leq b - q', explanation: 'Subtract $q$ from the middle member and from BOTH outer members — the addition law of 7.1, applied twice; adding never flips, whatever the sign of $q$.' },
          { label: 'Scale, p > 0', formula: '\\frac{a-q}{p} \\leq x \\leq \\frac{b-q}{p}', explanation: 'Divide all three members by $p > 0$ — positive scaling preserves both gates. The band re-forms with the SAME open or closed ends at $\\frac{a-q}{p}$ and $\\frac{b-q}{p}$.' },
          { label: 'Scale, p < 0', formula: '\\frac{a-q}{p} \\geq x \\quad \\text{and} \\quad x \\geq \\frac{b-q}{p}', explanation: 'Divide by $p < 0$ — THE FLIP strikes BOTH gates. Each gate reverses; reading the band in the ordinary left-to-right order now starts at $\\frac{b-q}{p}$.' },
          { label: 'Read the solved band', formula: 'p < 0: \\quad \\frac{b-q}{p} \\leq x \\leq \\frac{a-q}{p}', explanation: 'Two reversed gates compose to an exchange of ends — the band still holds exactly the points that satisfy both original gates, only written with its ends swapped. $\\frac{a-q}{p} \\leq \\frac{b-q}{p}$ survives throughout, since dividing the true claim $a \\leq b$ by $p < 0$ flips it to $\\frac{a-q}{p} \\geq \\frac{b-q}{p}$.' },
          { label: 'Check at a solved boundary', formula: 'p \\cdot \\frac{a-q}{p} + q = a', explanation: 'At the solved boundary the middle member lands EXACTLY on its end: the closed end keeps it ($a \\leq a$ holds), the strict end refuses it ($a < a$ fails). The verifier priced the identity exactly — 280 pipeline forms, every boundary.' },
        ], result: 'The two-boundary pipeline is the 7.2 pipeline run on both gates at once: shift by $-q$, scale by $1/p$ — preserving for $p > 0$, and for $p < 0$ flipping BOTH gates, which swaps the ENDS of the band rather than reversing a single ray. The verifier priced the theorem exactly: 280 pipeline forms swept pointwise over the window — 14,000 gate equivalences with 280 boundary identities, zero failures.' },
        { kind: 'para', text: 'The flip deserves its own paragraph, because it changes character on a band. On a single ray, dividing by a negative reverses the ray’s direction. On a band, BOTH gates reverse — and two reversals, read left-to-right, amount to an EXCHANGE of the two ends. The exhibit: $-3 \\leq -2x + 1 \\leq 5$. Shift by $-1$: $-4 \\leq -2x \\leq 4$. Divide by $-2$ — the flip strikes both gates: $2 \\geq x \\geq -2$, read in the ordinary order as $-2 \\leq x \\leq 2$. The ends swapped places, exactly as the solved form predicts: $\\frac{5-1}{-2} = -2$ now stands on the left and $\\frac{-3-1}{-2} = 2$ on the right. The verifier priced this band pointwise — the two sentences agree at every one of the 25 window integers, and the flipped band keeps 5 of them.' },
        { kind: 'example', title: 'Solve 1 ≤ 2x + 1 < 9 by the two-boundary pipeline', steps: [
          'Shift: subtract 1 from all three members — $0 \\leq 2x < 8$ (the addition law, no flip).',
          'Scale: divide by $2 > 0$ — no flip: $0 \\leq x < 4$.',
          'Check the ends: at $x = 0$ the middle member reads exactly 1 (kept by the closed end); at $x = 4$ it reads 9, refused by the strict end ($9 < 9$ fails).',
          'Hence $0 \\leq x < 4$ — four window integers, $0$ through $3$.',
        ] },
        { kind: 'example', title: 'Solve −3 ≤ −2x + 1 ≤ 5 — the flip at work on a band', steps: [
          'Shift: subtract 1 from all three members — $-4 \\leq -2x \\leq 4$.',
          'Scale: divide by $-2 < 0$ — THE FLIP strikes both gates: $2 \\geq x \\geq -2$.',
          'Read in the ordinary order: $-2 \\leq x \\leq 2$ — the ends swapped, as the theorem says.',
          'Check: at $x = 2$ the middle member reads $-3$, and the original left gate holds ($-3 \\leq -3$); at $x = -2$ it reads 5, and the right gate holds ($5 \\leq 5$).',
          'Hence $-2 \\leq x \\leq 2$ — five window integers, $-2$ through $2$.',
        ] },
        { kind: 'example', title: 'Solve 1 < (5 − 2x)/3 ≤ 4 — a fraction dress with the end-swap', steps: [
          'Dress: multiply all three members by $3 > 0$ — no flip: $3 < 5 - 2x \\leq 12$.',
          'Shift: subtract 5 — $-2 < -2x \\leq 7$.',
          'Scale: divide by $-2 < 0$ — the flip, both gates: $1 > x \\geq -\\frac{7}{2}$; read in the ordinary order: $-\\frac{7}{2} \\leq x < 1$.',
          'Check the exact ends: at $x = -\\frac{7}{2}$ the middle member is $\\frac{5+7}{3} = 4$ — kept by the closed end; at $x = 1$ it is $\\frac{3}{3} = 1$, and $1 < 1$ fails — refused.',
          'Hence $-\\frac{7}{2} \\leq x < 1$ — window integers $-3, -2, -1, 0$.',
        ] },
        { kind: 'callout', tone: 'insight', title: 'Insight — one line, cut twice', text: 'Set this lesson beside 5.3 and 6.3 and the arc of the algebra course closes. Chapter 5 taught the three verdicts for one assertion; 6.3 taught that a line cuts the plane in two, and two lines rule regions together. This lesson is the one-dimensional echo: one boundary cuts the line in two (a ray — 7.1), and TWO boundaries cut it in three pieces — two wings and a band. The AND chooses the band, or its single point, or nothing; the OR chooses the wings. The balance of chapter 5 now rules regions two boundaries at a time: the two-boundary pipeline is the 5.2 pipeline run on both gates at once, and the three verdicts of 5.3 return as the shapes a band can take — a proper stretch, a single point ($x \\geq 3$ AND $x \\leq 3$), or the empty set (rays that never meet).' },
        { kind: 'heading', text: 'OR, Traps and the Empty Band' },
        { kind: 'para', text: 'An OR-sentence asks less of its solutions, and it is solved by solving each member SEPARATELY — no coordination is needed, since the union does the joining. The pipeline runs twice, once per ray; the answer is whatever the two rays cover, with the gap reported as honest territory rather than smoothed over:' },
        { kind: 'example', title: 'Solve x − 3 > 2 OR x + 1 < −1', steps: [
          'Left: $x > 5$ (shift by 3 — no flip). Right: $x < -2$ (shift by $-1$ — adding never flips).',
          'Union: $6$ through $12$ (7 integers) plus $-12$ through $-3$ (10) — 17 window integers.',
          'The gap $-2$ through $5$ (eight integers) satisfies NEITHER gate — it belongs to the answer as an honest no.',
          'Hence $x < -2$ or $x > 5$ — two disconnected rays holding 17 of the 25 window integers.',
        ] },
        { kind: 'callout', tone: 'warn', title: 'Caution — the empty AND is a verdict, not a failure', text: 'The most-missed exercise of this lesson: solve $x > 2$ AND $x < -1$. The two rays keep 10 and 11 window integers respectively and share NOTHING — the honest answer is "no solution". The classic wrong answers: reporting one ray alone (that solves half the sentence), averaging the boundaries into $x = 0.5$ (nothing in the problem licenses averaging), or quietly solving the OR instead (20 integers — a different sentence). Contrast the touching pair $x \\geq 3$ AND $x \\leq 3$, which keeps exactly $\\{3\\}$: between never meeting and touching lies the whole difference between the empty set and a point. When an AND comes out empty, say so — the empty set is a full member of the verdict family.' },
        { kind: 'example', title: 'Does x > 2 AND x < −1 have any solution at all? Compare x ≥ 3 AND x ≤ 3', steps: [
          'The ray $x > 2$ keeps $3$ through $12$ (10 window integers); the ray $x < -1$ keeps $-12$ through $-2$ (11).',
          'The sets share nothing — one sits entirely right of 2, the other entirely left of −1: the AND keeps nothing.',
          'The touching pair: $x = 3$ passes both gates ($3 \\geq 3$ and $3 \\leq 3$) — the AND is exactly $\\{3\\}$; 2 and 4 each fail one gate.',
          'Hence the first verdict is the empty set — no solution, honestly — while the second is the one-point set $\\{3\\}$.',
        ] },
        { kind: 'para', text: 'Negating a compound has its own grammar, and it is the bridge back to single sentences. To fail an AND it suffices to fail one gate — so "not ($P$ and $Q$)" is "(not $P$) or (not $Q$)". To fail an OR, both gates must fail — so "not ($P$ or $Q$)" is "(not $P$) and (not $Q$)". The swap of joiners under negation is De Morgan’s law, and the two-panels figure above priced it in censuses: the band $-3 \\leq x \\leq 5$ keeps 9 window integers, its negation keeps the other 16, and "the other 16" is exactly the OR of the two negated rays $x < -3$ or $x > 5$. Nine plus sixteen is twenty-five — nothing counted twice, nothing left out.' },
        { kind: 'heading', text: 'Applications: Bands, Budgets and Gates' },
        { kind: 'para', text: 'Applications write compounds for a living: every margin is a ray, and every real machine lives where several margins agree. The discipline is always the same three steps — model each constraint as its own inequality, solve each (or solve the band directly when the constraints share a middle member), then let the AND or OR assemble the answer and let the habitat prune it to whole numbers:' },
        { kind: 'example', title: 'A delivery drone must fly between 3 m and 12 m above the ground, and its battery rules add the cap 2h ≤ 15 on its whole-metre altitude h. Which altitudes are legal?', steps: [
          'Model: the band $3 \\leq h \\leq 12$ and the battery ray $2h \\leq 15$, with $h$ a whole number.',
          'Solve the battery ray: $h \\leq \\frac{15}{2} = 7.5$ (divide by $2 > 0$ — no flip).',
          'Join: $3 \\leq h \\leq 7.5$ — the habitat keeps $\\{3, 4, 5, 6, 7\\}$; 7 flies on $14 \\leq 15$, 8 does not ($16 > 15$).',
          'Hence five legal altitudes, 3 through 7 metres — the ray clipped the band.',
        ] },
        { kind: 'example', title: 'A courier’s schedule imposes two margins: the time margin 2v + 30 ≤ 150 and the arrival margin 5v ≥ 50. Which integer speeds v serve both?', steps: [
          'Model: two rays about one speed — an AND is coming.',
          'Time margin: $2v \\leq 120$, so $v \\leq 60$ (divide by $2 > 0$).',
          'Arrival margin: $v \\geq 10$ (divide by $5 > 0$).',
          'Join: $10 \\leq v \\leq 60$ — the band holds 51 integer speeds on the roster $0$ to $100$; the boundaries land exactly ($2(60) + 30 = 150$, $5(10) = 50$), both kept.',
          'Hence every whole speed from 10 to 60 — 51 speeds — serves both margins.',
        ] },
        { kind: 'example', title: 'You hold ₹500; notebooks cost ₹65 each; you must keep ₹40 for the trip home. How many can you buy? (The 7.2 exhibit, re-read as a compound.)', steps: [
          'Model as TWO gates: $n \\geq 0$ (a purchase count cannot be negative) and $65n + 40 \\leq 500$ (spend plus reserve within the purse).',
          'Solve the purse gate: $65n \\leq 460$, so $n \\leq \\frac{460}{65} = \\frac{92}{13}$ (divide by $65 > 0$ — no flip).',
          'Join: $0 \\leq n \\leq \\frac{92}{13}$ — the habitat keeps $\\{0, 1, \\ldots, 7\\}$: seven notebooks cost $455$, leaving $45 \\geq 40$; eight cost $520 > 500$.',
          'Hence seven notebooks — the AND of the two gates, pruned by the habitat, with the reserve intact.',
        ] },
        { kind: 'example', title: 'A park is free for visitors aged 12 or under, and for visitors aged 65 or over. Of the whole-number ages 0 through 100, how many ages enter free — and which ages are the first refused?', steps: [
          'Model: an OR of two closed rays — age $\\leq 12$ or age $\\geq 65$.',
          'Left ray: ages $0$ through $12$ — 13 ages; right ray: ages $65$ through $100$ — 36 ages.',
          'Union: $13 + 36 = 49$ of the 101 ages — no overlap, nothing to subtract.',
          'Boundaries: the ends are closed, so 12 enters free and 13 is the first payer; 65 enters free and 64 is the last payer.',
          'Hence 49 ages enter free; the refused middle 13 through 64 — 52 ages — pay.',
        ] },
        { kind: 'para', text: 'From the above discussion, it follows that the chapter’s whole apparatus now serves sentences of any width. One inequality gives a ray (7.1); the pipeline solves it lawfully, flip included (7.2); and compounds — bands with their open and closed ends, unions with their gaps, the honest empty set — assemble many rays into one answer (this lesson). The three verdicts of 5.3 return one last time as the shapes a band can take: a proper stretch, a single point, or nothing at all. The examinations ask for exactly this stack, and the next chapter will put fractions under the same pipeline.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — the brackets of the band', text: 'The bracket notation $[a, b]$ for the closed band and $(a, b)$ for the open one has no single inventor on record: notation historians find it settling into early-20th-century analysis textbooks without a documented christening, and some European traditions still print the open band with reversed brackets, $]a, b[$. The WORDS, though, have a birthday. "Open" and "closed" were fixed in the first decades of topology — Fréchet’s 1906 thesis already treated the closed interval as the model setting for the new theorems about limits — and the school habit of writing a band as one sentence, $a < x < b$, is older than either: the classical algebra texts were steering students between two boundaries in one breath long before anyone needed a name for the object between.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — what the examinations ask of this lesson', text: 'Six shapes recur. (1) Read the band: how many integers lie in $a \\leq x < b$ — count the kept end, refuse the strict one ($-3 \\leq x < 5$ keeps 8 on the window). (2) The two-boundary pipeline: $1 \\leq 2x + 1 < 9$ — one shift, one scale, ends checked; a negative coefficient SWAPS the ends ($-3 \\leq -2x + 1 \\leq 5$ gives $-2 \\leq x \\leq 2$). (3) Largest or smallest integer in a band — the closed end keeps its boundary ($-3 < x \\leq 5$: largest 5), the strict end drops it (largest 4). (4) The empty AND distractor: options offering a ray for $x > 2$ AND $x < -1$ — the honest verdict is no solution. (5) OR word problems: free-entry age bands, two-ray unions — boundary membership decides (13 pays, 12 does not; 65 enters, 64 does not). (6) The parameter: $2 \\leq x < k$ keeping exactly three integers forces $k = 5$. Speed habit: solve the gates first, then let the AND or OR do the geometry — never average boundaries.' },
        { kind: 'formula', name: 'AND = intersection', latex: 'x \\text{ solves } P \\text{ and } Q \\;\\iff\\; x \\in \\{x : P\\} \\cap \\{x : Q\\}', note: 'both gates must open — the census keeps only the common points (the band, the point, or nothing)' },
        { kind: 'formula', name: 'OR = union', latex: 'x \\text{ solves } P \\text{ or } Q \\;\\iff\\; x \\in \\{x : P\\} \\cup \\{x : Q\\}', note: 'at least one gate — censuses add, minus the overlap; two opposite rays leave an honest gap' },
        { kind: 'formula', name: 'The two-boundary pipeline', latex: 'a \\leq p x + q \\leq b \\;\\xrightarrow{\\;p > 0\\;}\\; \\tfrac{a-q}{p} \\leq x \\leq \\tfrac{b-q}{p}, \\qquad p < 0: \\text{ the ends swap}', note: 'the 7.2 pipeline run on both gates at once — one shift, one scale, and the flip (if it comes) exchanges the two ends' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'On the window $[-12, 12]$, how many integers solve $-3 \\leq x < 5$?',
            options: ['7', '8', '9', '25 — every window integer'],
            answer: 1,
            explain: 'The compound keeps $-3$ through $4$: eight integers. Seven forgets the closed left end ($-3$ is in, since $\\leq$ keeps it); nine adds the refused right end ($5$ is out, since $<$ refuses it); twenty-five is the whole window — a compound is a band, not everything.',
          },
          {
            q: 'The assertion "$x > 2$ AND $x < -1$" is solved by…',
            options: ['every $x > 2$', 'every $x < -1$', 'no number at all — the rays never meet', 'exactly $x = 2$'],
            answer: 2,
            explain: 'An AND keeps only the common points of its rays: $x > 2$ keeps 10 window integers right of 2, $x < -1$ keeps 11 left of $-1$, and the two sets share nothing — the intersection is empty. Choosing one ray alone solves half the sentence; $x = 2$ fails the strict first gate ($2 > 2$ is false).',
          },
          {
            q: 'Solve $1 \\leq 2x + 1 < 9$.',
            options: ['$0 \\leq x < 4$', '$1 \\leq x < 5$', '$0 \\leq x \\leq 4$', '$0 < x < 4$'],
            answer: 0,
            explain: 'Subtract 1 from all three members ($0 \\leq 2x < 8$), then divide by $2 > 0$ — no flip: $0 \\leq x < 4$. The first distractor never subtracted the 1; the second keeps the right boundary $x = 4$, where $2(4) + 1 = 9$ fails $9 < 9$; the third drops both boundaries — $x = 0$ belongs, since $1 \\leq 1$.',
          },
          {
            q: 'The largest integer solving $-3 < x \\leq 5$ is…',
            options: ['4', '5', '6', '3'],
            answer: 1,
            explain: 'The right end is closed, so 5 stays: $5 \\leq 5$ holds and $5 > -3$ holds. Six fails the closed end ($6 \\leq 5$ is false); four would be the largest only under the STRICT right end $-3 < x < 5$; three is inside the band but not the largest.',
          },
          {
            q: 'On the window $[-12, 12]$, how many integers solve "$x \\leq -2$ OR $x > 3$"?',
            options: ['18', '20', '22', '25 — every window integer'],
            answer: 1,
            explain: 'The left ray keeps $-12$ through $-2$ (11 integers), the right keeps $4$ through $12$ (9), no overlap: 20. Eighteen is the census of the flipped pair $x < -3$ or $x \\geq 4$; twenty-two would need a three-point gap; twenty-five is the OR-means-everything trap — the five integers $-1$ through $3$ satisfy neither gate and stay out.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 7.3', sets: [
          { level: 'L1', questions: [
            {
              q: 'Solve $x \\geq -2$ AND $x < 4$; write the answer as a between-form and count the window integers it keeps.',
              solution: [
                'Split: the AND keeps the points both rays admit — $x \\geq -2$ and $x < 4$.',
                'Join: the left ray starts at $-2$ (kept), the right refuses 4 — the between-form $-2 \\leq x < 4$.',
                'Census: $-2, -1, 0, 1, 2, 3$ — six integers on $[-12, 12]$.',
                'Hence the mixed band $-2 \\leq x < 4$, six window integers.',
              ],
              answer: '$-2 \\leq x < 4$ — six window integers.',
            },
            {
              q: 'Solve $x + 1 > 4$ AND $x \\leq 8$.',
              solution: [
                'Solve the left gate: $x > 3$ (subtract 1 — no flip).',
                'Solve the right gate: $x \\leq 8$ — already in solved dress.',
                'Join: $3 < x \\leq 8$ — the window integers $4, 5, 6, 7, 8$: five.',
                'Hence the band with the left end open, the right closed.',
              ],
              answer: '$3 < x \\leq 8$ — five window integers.',
            },
            {
              q: 'Describe the solution of $x \\leq -2$ OR $x \\geq 5$, and count it on the window $[-12, 12]$.',
              solution: [
                'An OR keeps the union: both rays, overlap subtracted once — here there is none.',
                'Left: $-12$ through $-2$ — 11 integers; right: $5$ through $12$ — 8 integers.',
                'Union: $11 + 8 = 19$; the gap $-1$ through $4$ (six integers) stays out.',
                'Hence two disconnected rays holding 19 of the 25 window integers.',
              ],
              answer: '$x \\leq -2$ or $x \\geq 5$ — 19 window integers in two rays.',
            },
          ] },
          { level: 'L2', questions: [
            {
              q: 'Solve $2 \\leq x + 3 \\leq 7$.',
              solution: [
                'Shift: subtract 3 from all three members — $-1 \\leq x \\leq 4$ (the addition law, no flip).',
                'Boundaries: at $x = -1$ the middle reads exactly 2 (kept); at $x = 4$ it reads exactly 7 (kept).',
                'Census: $-1, 0, 1, 2, 3, 4$ — six window integers.',
                'Hence the closed band $-1 \\leq x \\leq 4$.',
              ],
              answer: '$-1 \\leq x \\leq 4$ — six window integers.',
            },
            {
              q: 'Solve $-3 < 2x + 1 \\leq 5$.',
              solution: [
                'Shift: subtract 1 from all three members — $-4 < 2x \\leq 4$.',
                'Scale: divide by $2 > 0$ — no flip: $-2 < x \\leq 2$.',
                'Check: at $x = 2$ the middle reads exactly 5 (kept); at $x = -2$ it reads $-3$, and $-3 < -3$ fails (refused).',
                'Hence the mixed band $-2 < x \\leq 2$ — window integers $-1, 0, 1, 2$.',
              ],
              answer: '$-2 < x \\leq 2$ — four window integers.',
            },
            {
              q: 'Solve $x - 3 > 2$ OR $x + 1 < -1$.',
              solution: [
                'An OR solves each ray independently — no joining unless both hold.',
                'Left: $x > 5$ (shift by 3); right: $x < -2$ (shift by $-1$, no flip).',
                'Union: $6$ through $12$ (7 integers) plus $-12$ through $-3$ (10) — 17; the gap $-2$ through $5$ (eight) stays out.',
                'Hence $x < -2$ or $x > 5$, holding 17 of the 25 window integers.',
              ],
              answer: '$x < -2$ or $x > 5$ — 17 window integers.',
            },
          ] },
          { level: 'L3', questions: [
            {
              q: 'Solve $0 \\leq 3x - 6 < 9$.',
              solution: [
                'Shift: add 6 to all three members — $6 \\leq 3x < 15$.',
                'Scale: divide by $3 > 0$ — no flip: $2 \\leq x < 5$.',
                'Check: at $x = 2$ the middle reads exactly 0 (kept); at $x = 5$ it reads 9, refused by the strict end.',
                'Hence the band $2 \\leq x < 5$ — window integers $2, 3, 4$.',
              ],
              answer: '$2 \\leq x < 5$ — three window integers.',
            },
            {
              q: 'Solve $1 < \\frac{5 - 2x}{3} \\leq 4$ — watch which end moves.',
              solution: [
                'Dress: multiply all three members by $3 > 0$ — no flip: $3 < 5 - 2x \\leq 12$.',
                'Shift: subtract 5 — $-2 < -2x \\leq 7$.',
                'Scale: divide by $-2 < 0$ — THE FLIP, both gates: $1 > x \\geq -\\frac{7}{2}$; read in order: $-\\frac{7}{2} \\leq x < 1$ — the ends swapped.',
                'Check exactly: at $x = -\\frac{7}{2}$ the middle member is $\\frac{5+7}{3} = 4$ (kept); at $x = 1$ it is $1$, and $1 < 1$ fails (refused).',
                'Hence $-\\frac{7}{2} \\leq x < 1$ — window integers $-3, -2, -1, 0$.',
              ],
              answer: '$-\\frac{7}{2} \\leq x < 1$ — four window integers.',
            },
            {
              q: 'Solve $1 \\leq x \\leq 6$ AND $x \\geq 4$.',
              solution: [
                'Three gates now: the band $1 \\leq x \\leq 6$ and the ray $x \\geq 4$.',
                'The AND keeps common points: $4 \\leq x \\leq 6$ — the ray clipped the band.',
                'Census: $4, 5, 6$; at $x = 3$ the third gate fails ($3 \\geq 4$ is false).',
                'Hence the shrunken band $4 \\leq x \\leq 6$.',
              ],
              answer: '$4 \\leq x \\leq 6$ — three window integers.',
            },
          ] },
          { level: 'L4', questions: [
            {
              q: 'For which whole number $k$ does $2 \\leq x < k$ keep exactly three integers?',
              solution: [
                'Try the neighbourhood: $k = 4$ keeps $\\{2, 3\\}$ — two; $k = 6$ keeps $\\{2, 3, 4, 5\\}$ — four.',
                '$k = 5$ keeps $\\{2, 3, 4\\}$ — exactly three, with 4 admitted ($4 < 5$) and 5 refused.',
                'The open right end must sit just above the last kept integer.',
                'Hence $k = 5$.',
              ],
              answer: '$k = 5$.',
            },
            {
              q: 'A race rule requires $12 \\leq s \\leq 18$ (km/h); the fuel plan caps $s \\leq 16$. Which integer speeds are legal?',
              solution: [
                'Two ANDed gates: the band $12 \\leq s \\leq 18$ and the ray $s \\leq 16$.',
                'Common points: $12 \\leq s \\leq 16$ — the ray clipped the band at 16.',
                'Census: $12, 13, 14, 15, 16$ — five speeds; 17 fails the fuel gate, 11 fails the race gate.',
                'Hence five legal speeds, 12 through 16.',
              ],
              answer: '$12 \\leq s \\leq 16$ — five integer speeds.',
            },
          ] },
          { level: 'L5', questions: [
            {
              q: 'You hold ₹50; pens cost ₹12 each; you must keep ₹10 for the bus. How many pens can you buy?',
              solution: [
                'Model: two gates — $n \\geq 0$ (a count cannot be negative) and $12n + 10 \\leq 50$ (spend plus reserve within the purse).',
                'Solve the purse gate: $12n \\leq 40$, so $n \\leq \\frac{40}{12} = \\frac{10}{3}$ (divide by $12 > 0$ — no flip).',
                'Join: $0 \\leq n \\leq \\frac{10}{3}$ — the habitat keeps $\\{0, 1, 2, 3\\}$.',
                'Boundary: three pens cost 36, leaving $14 \\geq 10$ — the reserve survives; four cost 58 — impossible.',
                'Hence three pens, ₹14 to spare.',
              ],
              answer: '3 pens ($0 \\leq n \\leq 10/3$ pruned by the habitat).',
            },
            {
              q: 'A park gate is free for age $\\leq 12$ OR age $\\geq 65$. Who enters free from $\\{10, 13, 64, 65, 70\\}$ — and why is 13 out while 12 would be in?',
              solution: [
                'An OR admits anyone either ray keeps: age $\\leq 12$ or age $\\geq 65$.',
                'Read the five ages: $10 \\leq 12$ — in; 13 fails both ($13 > 12$, $13 < 65$); 64 fails both; $65 \\geq 65$ — in; $70 \\geq 65$ — in.',
                'Boundary: the first end is closed — 12 would be in ($12 \\leq 12$) and 13 is the first payer; the second end is closed too — 65 enters, 64 pays.',
                'Hence three of the five enter free: ages 10, 65 and 70.',
              ],
              answer: 'Ages 10, 65 and 70 — the closed ends keep 12 and 65; 13 and 64 pay.',
            },
          ] },
          { level: 'L6', questions: [
            {
              q: 'State and prove the two-boundary theorem: for $p \\neq 0$, $a \\leq p x + q \\leq b$ is equivalent to $\\frac{a-q}{p} \\leq x \\leq \\frac{b-q}{p}$ when $p > 0$, with the ends SWAPPED when $p < 0$ — and explain why the flip here swaps ends rather than reversing a single ray.',
              solution: [
                'Split: the compound assertion is two inequalities sharing the middle member — solve each gate by the 7.2 pipeline.',
                'Shift: subtract $q$ from all three members (the addition law — adding never flips): $a - q \\leq p x \\leq b - q$.',
                'Scale, $p > 0$: divide all three members by $p$ — positive scaling preserves both gates: $\\frac{a-q}{p} \\leq x \\leq \\frac{b-q}{p}$ — the band re-forms with the same ends.',
                'Scale, $p < 0$: the flip strikes BOTH gates — $\\frac{a-q}{p} \\geq x$ and $x \\geq \\frac{b-q}{p}$ — and reading the band left-to-right swaps the ends: $\\frac{b-q}{p} \\leq x \\leq \\frac{a-q}{p}$.',
                'Why ends, not direction: a single ray has one boundary and one direction, so its flip turns the ray around; a band has two boundaries and BOTH gates reverse — two reversals of the conjunction amount to an exchange of the two ends, and the band still holds exactly the same points.',
                'Verification: the verifier priced the theorem exactly — 280 pipeline forms (8 signs of $p$, 7 shifts, 5 bands) swept over 25 window points each: 14,000 gate equivalences with 280 boundary identities, zero failures; at the solved left boundary the middle member lands exactly on its (possibly swapped) end.',
              ],
              answer: 'The two-boundary pipeline: shift by −q, divide by p — preserving for p > 0; for p < 0 the flip reverses BOTH gates, which swaps the ends of the band rather than reversing one ray.',
            },
          ] },
        ] },
      ],
    },
  ],
  plannedLessons: [],
}
