import type { Chapter, Lesson } from '../../../types'

/**
 * Computer Fundamentals — chapter 1 "The Computing Machine"
 * (opened by the CS RUN 1 SWARM, 2026-11-21 — the cs cron job's first
 * honored fire, the owner directive 'every thing same but do authoring
 * for computer science book': two parallel authoring agents, one lesson
 * each — 1.1 'The Basic Structure and Operation of the Computer' and
 * 1.2 'A Census of Hardware: Desktops to Embedded Chips' — each with its
 * verify-first engine section grown green BEFORE its prose (the
 * v-cf11/v-cf12 part verifiers); the orchestrator assembled, gated and
 * shipped this file. Lesson 1.3 + the unit review ride the next fires.
 *
 * PROVENANCE: the Drive holds NO Computer Fundamentals source (the honest
 * note in docs/research/CS_TOC_SURVEY.md) — ground = the sanctioned
 * internet fallback: the web-checked canonical arcs banked at planning
 * (citation key `cs-cf-web-ground`, docs/project/SOURCE_LOG.md: the
 * Norton 'Introduction to Computers' ch.1 arc + this run's 2026-11-21
 * web verification of every pinned date/number) + the book's research
 * comment. STUDY-NEVER-REPRODUCE absolute: every roster, family, figure,
 * Illustration, quiz item and exercise is OUR OWN, engine-pinned in
 * scripts/verify-cs-book1-ch01.ts.
 */
// ------------------------------------------------------------------
// lesson 1.1 — authored by the CS RUN 1 swarm (the cf11 agent), integrated verbatim
// ------------------------------------------------------------------

function iposCycleSvg(): string {
  // the I→P→O→S wheel: four stage nodes at 90° spacing on one circle, the
  // connecting arcs trimmed so each arrowhead rides cleanly between nodes,
  // one concrete everyday example (the cooking run) riding each stage.
  const CX = 360, CY = 238, R = 146, NODE_R = 54, H = 470
  const stages = [
    { name: 'INPUT', deg: -90, fill: '#16a34a', ex1: 'reading the', ex2: 'recipe' },
    { name: 'PROCESSING', deg: 0, fill: '#0d9488', ex1: 'cooking the', ex2: 'dish' },
    { name: 'OUTPUT', deg: 90, fill: '#ea580c', ex1: 'plating it', ex2: 'up' },
    { name: 'STORAGE', deg: 180, fill: '#d97706', ex1: 'leftovers in', ex2: 'the fridge' },
  ]
  const pt = (deg: number): [number, number] => {
    const t = (deg * Math.PI) / 180
    return [+(CX + R * Math.cos(t)).toFixed(1), +(CY + R * Math.sin(t)).toFixed(1)]
  }
  const tri = (tip: [number, number], dir: [number, number], fill: string, size = 9): string => {
    const len = Math.hypot(dir[0], dir[1]) || 1
    const ux = dir[0] / len, uy = dir[1] / len
    const px = -uy, py = ux
    const bx = tip[0] - ux * size, by = tip[1] - uy * size
    return `<path d="M ${tip[0]} ${tip[1]} L ${+(bx + px * size * 0.45).toFixed(1)} ${+(by + py * size * 0.45).toFixed(1)} L ${+(bx - px * size * 0.45).toFixed(1)} ${+(by - py * size * 0.45).toFixed(1)} Z" fill="${fill}"/>`
  }
  let arcs = ''
  const TRIM = 24
  stages.forEach((s, i) => {
    const a1 = s.deg + TRIM, a2 = s.deg + 90 - TRIM
    const p1 = pt(a1), p2 = pt(a2)
    const t2 = (a2 * Math.PI) / 180
    arcs += `<path d="M ${p1[0]} ${p1[1]} A ${R} ${R} 0 0 1 ${p2[0]} ${p2[1]}" fill="none" stroke="#ea580c" stroke-width="2.4"/>`
    arcs += tri(p2, [-Math.sin(t2), Math.cos(t2)], '#ea580c')
  })
  let nodes = ''
  stages.forEach((s) => {
    const [nx, ny] = pt(s.deg)
    nodes += `<circle cx="${nx}" cy="${ny}" r="${NODE_R}" fill="${s.fill}" stroke="#166534" stroke-width="1.6"/>`
    nodes += `<text x="${nx}" y="${+(ny - 10).toFixed(1)}" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">${s.name}</text>`
    nodes += `<text x="${nx}" y="${+(ny + 8).toFixed(1)}" font-size="9.5" font-weight="600" fill="#ffffff" text-anchor="middle">${s.ex1}</text>`
    nodes += `<text x="${nx}" y="${+(ny + 21).toFixed(1)}" font-size="9.5" font-weight="600" fill="#ffffff" text-anchor="middle">${s.ex2}</text>`
  })
  return `<svg viewBox="0 0 720 ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The information processing cycle drawn as a wheel with four stage nodes at the top, right, bottom and left, joined clockwise by orange arrows. Each node carries its stage name and one everyday example of a cooking run: INPUT at the top, reading the recipe; PROCESSING at the right, cooking the dish; OUTPUT at the bottom, plating it up; STORAGE at the left, the leftovers in the fridge. The wheel centre reads the information processing cycle, I to P to O to S, the same four beats every run. The footer states that input puts data in, processing makes meaning, output hands it out and storage keeps it for later — and stored results can be input again.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the information processing cycle — one wheel, four beats</text>
  ${arcs}
  ${nodes}
  <text x="${CX}" y="${CY - 16}" font-size="10.5" font-weight="700" text-anchor="middle" fill="currentColor">the information</text>
  <text x="${CX}" y="${CY - 2}" font-size="10.5" font-weight="700" text-anchor="middle" fill="currentColor">processing cycle</text>
  <text x="${CX}" y="${CY + 16}" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">I → P → O → S</text>
  <text x="${CX}" y="${CY + 34}" font-size="9" font-weight="700" text-anchor="middle" fill="#65a30d">the same four beats,</text>
  <text x="${CX}" y="${CY + 46}" font-size="9" font-weight="700" text-anchor="middle" fill="#65a30d">every run</text>
  <line x1="24" y1="446" x2="696" y2="446" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="462" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">input puts data in · processing makes meaning · output hands it out · storage keeps it for later</text>
</svg>`
}

function vonNeumannSvg(): string {
  // the five-unit block diagram: input and output flanking the CPU boundary
  // (control unit above the ALU inside it), primary memory below, the three
  // buses (address/data/control) as computed vertical channels between CPU
  // and memory, arrows for the input/output data flow.
  const CPU_X0 = 252, CPU_X1 = 468, CPU_Y0 = 56, CPU_Y1 = 232
  const CU_X0 = 268, CU_X1 = 452, CU_Y0 = 84, CU_Y1 = 132
  const ALU_X0 = 268, ALU_X1 = 452, ALU_Y0 = 150, ALU_Y1 = 218
  const IN_X0 = 24, IN_X1 = 180, IO_Y0 = 140, IO_Y1 = 204
  const OUT_X0 = 540, OUT_X1 = 696
  const MEM_X0 = 168, MEM_X1 = 552, MEM_Y0 = 312, MEM_Y1 = 384
  const BUS_X = [284, 360, 436], BUS_Y0 = CPU_Y1, BUS_Y1 = MEM_Y0
  const ARROW_Y = 172
  const H = 436
  const tri = (tipX: number, tipY: number, dx: number, dy: number, fill: string, size = 9): string => {
    const len = Math.hypot(dx, dy) || 1
    const ux = dx / len, uy = dy / len
    const px = -uy, py = ux
    const bx = tipX - ux * size, by = tipY - uy * size
    return `<path d="M ${tipX} ${tipY} L ${+(bx + px * size * 0.45).toFixed(1)} ${+(by + py * size * 0.45).toFixed(1)} L ${+(bx - px * size * 0.45).toFixed(1)} ${+(by - py * size * 0.45).toFixed(1)} Z" fill="${fill}"/>`
  }
  const busLine = (x: number, color: string, w: number, downOnly: boolean, label: string, labelColor: string): string => {
    const midY = (BUS_Y0 + BUS_Y1) / 2
    let s = `<line x1="${x}" y1="${BUS_Y0}" x2="${x}" y2="${BUS_Y1}" stroke="${color}" stroke-width="${w}"/>`
    s += tri(x, BUS_Y1 - 2, 0, 1, color, 8)
    if (!downOnly) s += tri(x, BUS_Y0 + 2, 0, -1, color, 8)
    s += `<text x="${x - 10}" y="${midY}" font-size="9.5" font-weight="700" fill="${labelColor}" text-anchor="middle" transform="rotate(-90 ${x - 10} ${midY})">${label}</text>`
    return s
  }
  let buses = ''
  buses += busLine(BUS_X[0], '#16a34a', 2.4, true, 'address bus', '#166534')
  buses += busLine(BUS_X[1], '#ea580c', 2.8, false, 'data bus', '#ea580c')
  buses += busLine(BUS_X[2], '#d97706', 2.2, true, 'control bus', '#d97706')
  return `<svg viewBox="0 0 720 ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The von Neumann machine as a block diagram. A dashed green CPU boundary at the centre holds two boxes: the control unit above and the arithmetic and logic unit below. The input unit box sits on the left with an orange arrow labelled data in pointing into the CPU; the output unit box sits on the right with an orange arrow labelled results out from the CPU. Primary memory sits below, joined to the CPU by three vertical bus channels: the green address bus with a downward arrow, the orange data bus with arrows both ways, and the amber control bus with a downward arrow. The footer quotes von Neumann's First Draft of a Report on the EDVAC of 1945 naming the five parts: central arithmetic, central control, memory, input and output.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the von Neumann machine: five units joined by three buses</text>
  <rect x="${CPU_X0}" y="${CPU_Y0}" width="${CPU_X1 - CPU_X0}" height="${CPU_Y1 - CPU_Y0}" rx="10" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="7 4"/>
  <text x="360" y="74" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">CPU — the central processing unit</text>
  <rect x="${CU_X0}" y="${CU_Y0}" width="${CU_X1 - CU_X0}" height="${CU_Y1 - CU_Y0}" rx="6" fill="#0d9488"/>
  <text x="360" y="106" font-size="11.5" font-weight="700" text-anchor="middle" fill="#ffffff">CONTROL UNIT</text>
  <text x="360" y="122" font-size="9" font-weight="600" text-anchor="middle" fill="#ffffff">fetch · decode · direct</text>
  <rect x="${ALU_X0}" y="${ALU_Y0}" width="${ALU_X1 - ALU_X0}" height="${ALU_Y1 - ALU_Y0}" rx="6" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>
  <text x="360" y="176" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">ALU</text>
  <text x="360" y="196" font-size="9.5" font-weight="700" text-anchor="middle" fill="#65a30d">arithmetic and logic unit</text>
  <rect x="${IN_X0}" y="${IO_Y0}" width="${IN_X1 - IN_X0}" height="${IO_Y1 - IO_Y0}" rx="7" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>
  <text x="102" y="168" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">INPUT UNIT</text>
  <text x="102" y="186" font-size="9" font-weight="600" text-anchor="middle" fill="#65a30d">keyboard · mouse · sensors</text>
  <rect x="${OUT_X0}" y="${IO_Y0}" width="${OUT_X1 - OUT_X0}" height="${IO_Y1 - IO_Y0}" rx="7" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>
  <text x="618" y="168" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">OUTPUT UNIT</text>
  <text x="618" y="186" font-size="9" font-weight="600" text-anchor="middle" fill="#65a30d">screen · printer · speakers</text>
  <line x1="${IN_X1 + 4}" y1="${ARROW_Y}" x2="${CPU_X0 - 8}" y2="${ARROW_Y}" stroke="#ea580c" stroke-width="2.2"/>
  ${tri(CPU_X0 - 2, ARROW_Y, 1, 0, '#ea580c')}
  <text x="${(IN_X1 + CPU_X0) / 2}" y="${ARROW_Y - 12}" font-size="9.5" font-weight="700" text-anchor="middle" fill="#65a30d">data in</text>
  <line x1="${CPU_X1 + 4}" y1="${ARROW_Y}" x2="${OUT_X0 - 8}" y2="${ARROW_Y}" stroke="#ea580c" stroke-width="2.2"/>
  ${tri(OUT_X0 - 2, ARROW_Y, 1, 0, '#ea580c')}
  <text x="${(CPU_X1 + OUT_X0) / 2}" y="${ARROW_Y - 12}" font-size="9.5" font-weight="700" text-anchor="middle" fill="#65a30d">results out</text>
  ${buses}
  <rect x="${MEM_X0}" y="${MEM_Y0}" width="${MEM_X1 - MEM_X0}" height="${MEM_Y1 - MEM_Y0}" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>
  <text x="360" y="340" font-size="12" font-weight="700" text-anchor="middle" fill="#166534">PRIMARY MEMORY</text>
  <text x="360" y="362" font-size="9.5" font-weight="600" text-anchor="middle" fill="#65a30d">the stored program and its data live here</text>
  <line x1="24" y1="400" x2="696" y2="400" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="416" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">von Neumann, ‘First Draft of a Report on the EDVAC’ (1945): five parts</text>
  <text x="360" y="432" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">central arithmetic (the ALU) · central control (the control unit) · memory · input · output</text>
</svg>`
}

function fetchDecodeExecuteSvg(): string {
  // the machine cycle as a clockwise loop of three nodes — FETCH below,
  // DECODE upper-left, EXECUTE upper-right — with the program counter drawn
  // as the moving pointer panel whose address feeds the fetch, and the PC
  // values 100/101/102 of the traced tiny program riding the panel.
  const CX = 232, CY = 204, R = 120, NODE_R = 46, H = 412
  const nodes = [
    { name: 'FETCH', deg: 90, fill: '#16a34a', l1: 'instruction ←', l2: 'memory[PC]' },
    { name: 'DECODE', deg: 210, fill: '#0d9488', l1: 'which', l2: 'operation?' },
    { name: 'EXECUTE', deg: 330, fill: '#ea580c', l1: 'ALU, memory,', l2: 'input–output' },
  ]
  const pt = (deg: number): [number, number] => {
    const t = (deg * Math.PI) / 180
    return [+(CX + R * Math.cos(t)).toFixed(1), +(CY + R * Math.sin(t)).toFixed(1)]
  }
  const tri = (tip: [number, number], dir: [number, number], fill: string, size = 9): string => {
    const len = Math.hypot(dir[0], dir[1]) || 1
    const ux = dir[0] / len, uy = dir[1] / len
    const px = -uy, py = ux
    const bx = tip[0] - ux * size, by = tip[1] - uy * size
    return `<path d="M ${tip[0]} ${tip[1]} L ${+(bx + px * size * 0.45).toFixed(1)} ${+(by + py * size * 0.45).toFixed(1)} L ${+(bx - px * size * 0.45).toFixed(1)} ${+(by - py * size * 0.45).toFixed(1)} Z" fill="${fill}"/>`
  }
  let arcs = ''
  const TRIM = 21
  nodes.forEach((n, i) => {
    const a1 = n.deg + TRIM, a2 = n.deg + 120 - TRIM
    const p1 = pt(a1), p2 = pt(a2)
    const t2 = (a2 * Math.PI) / 180
    arcs += `<path d="M ${p1[0]} ${p1[1]} A ${R} ${R} 0 0 1 ${p2[0]} ${p2[1]}" fill="none" stroke="#ea580c" stroke-width="2.4"/>`
    arcs += tri(p2, [-Math.sin(t2), Math.cos(t2)], '#ea580c')
  })
  let nodeMarks = ''
  nodes.forEach((n) => {
    const [nx, ny] = pt(n.deg)
    nodeMarks += `<circle cx="${nx}" cy="${ny}" r="${NODE_R}" fill="${n.fill}" stroke="#166534" stroke-width="1.6"/>`
    nodeMarks += `<text x="${nx}" y="${+(ny - 8).toFixed(1)}" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">${n.name}</text>`
    nodeMarks += `<text x="${nx}" y="${+(ny + 10).toFixed(1)}" font-size="9.5" font-weight="600" fill="#ffffff" text-anchor="middle">${n.l1}</text>`
    nodeMarks += `<text x="${nx}" y="${+(ny + 23).toFixed(1)}" font-size="9.5" font-weight="600" fill="#ffffff" text-anchor="middle">${n.l2}</text>`
  })
  const pcRows = ['PC = 100 → LOAD', 'PC = 101 → ADD', 'PC = 102 → STORE', 'each lap: PC ← PC + 1', 'lap 3 ends: PC = 103']
  const pcPanelY = 84, pcPanelH = 168
  let pcText = `<text x="580" y="106" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">the program counter — the moving pointer</text>`
  pcRows.forEach((row, i) => {
    pcText += `<text x="580" y="${132 + i * 22}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">${row}</text>`
  })
  const fetchPt = pt(90)
  return `<svg viewBox="0 0 720 ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The fetch–decode–execute cycle as a clockwise loop of three circular nodes. FETCH sits at the bottom, labelled instruction left-arrow memory of PC; DECODE sits upper-left, labelled which operation; EXECUTE sits upper-right, labelled ALU, memory, input–output. Orange arrows join the loop. The centre reads the machine cycle, one lap equals one instruction. A cream panel on the right lists the program counter as the moving pointer: PC = 100 to LOAD, PC = 101 to ADD, PC = 102 to STORE, each lap PC left-arrow PC plus one, lap 3 ends at PC = 103 — with a curved orange arrow from the panel into FETCH saying the PC names the address, FETCH reads it. The footer states that the loop never ends on its own, and a halt instruction ends the program like any other.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the fetch–decode–execute cycle: the machine’s heartbeat</text>
  ${arcs}
  ${nodeMarks}
  <text x="${CX}" y="${CY - 4}" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor">the machine cycle</text>
  <text x="${CX}" y="${CY + 14}" font-size="9.5" font-weight="700" text-anchor="middle" fill="#0f766e">one lap =</text>
  <text x="${CX}" y="${CY + 27}" font-size="9.5" font-weight="700" text-anchor="middle" fill="#0f766e">one instruction</text>
  <rect x="460" y="${pcPanelY}" width="240" height="${pcPanelH}" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
  ${pcText}
  <path d="M 490 252 Q 440 330 ${fetchPt[0] + NODE_R} ${fetchPt[1]}" fill="none" stroke="#ea580c" stroke-width="2.4"/>
  ${tri([fetchPt[0] + NODE_R, fetchPt[1]], [-1, 0], '#ea580c')}
  <text x="402" y="356" font-size="9.5" font-weight="700" text-anchor="middle" fill="#65a30d">the PC names the address; FETCH reads it</text>
  <line x1="24" y1="376" x2="696" y2="376" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="392" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">the loop never ends on its own — nothing inside it says stop</text>
  <text x="360" y="408" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">a HALT instruction ends the program — fetched and executed like any other</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* solution figures (v9.0) — compact diagrams for individual exercises */
/* ------------------------------------------------------------------ */

function addressLadderSvg(): string {
  // the doubling ladder of address space: nine rungs from 8 lines (256
  // locations) to 16 lines (65,536), the 12-line rung highlighted as the
  // 4,096-location = 4 KB exactly rung of the L3 question.
  const X0 = 110, BAR_UNIT = 54, Y0 = 54, STEP = 27, BAR_H = 18, H = 310
  const rows = [
    { n: 8, v: '256' }, { n: 9, v: '512' }, { n: 10, v: '1,024' }, { n: 11, v: '2,048' },
    { n: 12, v: '4,096 — 4 KB exactly ✓', hot: true }, { n: 13, v: '8,192' }, { n: 14, v: '16,384' },
    { n: 15, v: '32,768' }, { n: 16, v: '65,536' },
  ]
  let bars = ''
  rows.forEach((row, k) => {
    const y = Y0 + k * STEP
    const w = (row.n - 7) * BAR_UNIT
    const fill = row.hot ? '#ffedd5' : '#fef3c7'
    const stroke = row.hot ? '#ea580c' : '#16a34a'
    const sw = row.hot ? 2 : 1.4
    const valueColor = row.hot ? '#ea580c' : '#166534'
    const valueWeight = row.hot ? '800' : '700'
    const valueSize = row.hot ? 10.5 : 10
    bars += `<rect x="${X0}" y="${y}" width="${w}" height="${BAR_H}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`
    bars += `<text x="100" y="${y + 14}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">n = ${row.n}</text>`
    bars += `<text x="${X0 + w + 8}" y="${y + 14}" font-size="${valueSize}" font-weight="${valueWeight}" fill="${valueColor}">${row.v}</text>`
  })
  return `<svg viewBox="0 0 720 ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The doubling ladder of address space: nine bars, one per address-line count from eight to sixteen, each bar one step wider than the last because every added address line doubles the reach. The values run 256, 512, 1,024, 2,048, 4,096, 8,192, 16,384, 32,768 and 65,536. The twelve-line rung is highlighted in orange as 4,096 locations — 4 KB exactly, this solution's answer. The footer notes that one more line means twice the space, so climbing from eight to sixteen lines multiplies the reach by 2 to the 8, that is by 256.">
  <text x="360" y="22" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the doubling ladder: every added address line doubles the reach</text>
  ${bars}
  <line x1="24" y1="288" x2="696" y2="288" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="302" font-size="10" font-weight="700" text-anchor="middle" fill="#65a30d">one more line, twice the space: climbing from 8 to 16 lines multiplies the reach by 2⁸ = 256</text>
</svg>`
}

function iposTraceStripSvg(): string {
  // one mark-list run as a four-panel IPOS strip: the marks in, the computed
  // summary (sum 332, average 66.4, highest 91), the summary out, the file
  // saved — orange arrows carrying the run left to right.
  const PW = 150, GAP = 26, X0 = 21, PY0 = 60, HEAD_H = 28, BODY_H = 108, H = 250
  const panels = [
    { name: 'INPUT', fill: '#16a34a', lines: ['the marks typed in:', '62 · 48 · 91 · 77 · 54', '(data, no meaning yet)'] },
    { name: 'PROCESSING', fill: '#0d9488', lines: ['sum 62+48+91+77+54', '= 332; ÷ 5 → 66.4', 'highest 91 · count 5'] },
    { name: 'OUTPUT', fill: '#ea580c', lines: ['the summary shown:', 'average 66.4', 'highest 91 · count 5'] },
    { name: 'STORAGE', fill: '#d97706', lines: ['the class file saved', 'kept as the input', 'of next term’s run'] },
  ]
  let body = ''
  panels.forEach((p, i) => {
    const x = X0 + i * (PW + GAP)
    const midY = PY0 + HEAD_H + BODY_H / 2
    body += `<rect x="${x}" y="${PY0}" width="${PW}" height="${HEAD_H + BODY_H}" rx="8" fill="#fef3c7" stroke="${p.fill}" stroke-width="1.8"/>`
    body += `<rect x="${x}" y="${PY0}" width="${PW}" height="${HEAD_H}" rx="8" fill="${p.fill}"/>`
    body += `<rect x="${x}" y="${PY0 + HEAD_H - 6}" width="${PW}" height="6" fill="${p.fill}"/>`
    body += `<text x="${x + PW / 2}" y="${PY0 + 19}" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">${p.name}</text>`
    p.lines.forEach((ln, j) => {
      body += `<text x="${x + PW / 2}" y="${PY0 + HEAD_H + 26 + j * 18}" font-size="9.5" font-weight="600" fill="#166534" text-anchor="middle">${ln}</text>`
    })
    if (i < panels.length - 1) {
      const ax0 = x + PW + 3, ax1 = x + PW + GAP - 3
      body += `<line x1="${ax0}" y1="${midY}" x2="${ax1 - 7}" y2="${midY}" stroke="#ea580c" stroke-width="2.2"/>`
      body += `<path d="M ${ax1} ${midY} L ${ax1 - 8} ${midY - 5} L ${ax1 - 8} ${midY + 5} Z" fill="#ea580c"/>`
    }
  })
  return `<svg viewBox="0 0 720 ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One mark-list run riding the four stages of the information processing cycle as a left-to-right strip of four panels joined by orange arrows. INPUT: the marks typed in, 62, 48, 91, 77, 54 — data with no meaning yet. PROCESSING: the sum 62 plus 48 plus 91 plus 77 plus 54 equals 332, divided by 5 gives 66.4, with highest 91 and count 5. OUTPUT: the summary shown — average 66.4, highest 91, count 5. STORAGE: the class file saved, kept as the input of next term's run. The footer reads data in, meaning out, kept for later.">
  <text x="360" y="24" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">one mark-list run riding the four stages</text>
  ${body}
  <line x1="24" y1="228" x2="696" y2="228" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="244" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">data in → meaning out → kept for later: the same run of Illustration 1, stage by stage</text>
</svg>`
}

function wordOnBusSvg(): string {
  // one word riding eight byte lanes above; the 1 KB buffer bar below with
  // the first word's slot marked; the 1,024 ÷ 8 = 128 census as the footer.
  const CELL_W = 54, CELL_H = 34, CELLS = 8, X0 = 140, Y0 = 56, H = 240
  const BUF_X0 = 84, BUF_W = 552, BUF_Y0 = 156, BUF_H = 32
  let cells = ''
  for (let i = 0; i < CELLS; i++) {
    const x = X0 + i * CELL_W
    cells += `<rect x="${x}" y="${Y0}" width="${CELL_W}" height="${CELL_H}" fill="${i % 2 === 0 ? '#fef3c7' : '#ffedd5'}" stroke="#16a34a" stroke-width="1.4"/>`
    cells += `<text x="${x + CELL_W / 2}" y="${Y0 + 21}" font-size="9" font-weight="700" fill="#166534" text-anchor="middle">byte ${i}</text>`
  }
  const wordX0 = X0, wordX1 = X0 + CELLS * CELL_W
  const bufMid = BUF_X0 + BUF_W / 2
  return `<svg viewBox="0 0 720 ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The word on the bus: above, one 64-bit word drawn as eight byte cells, byte zero through byte seven, riding the bus together with the bracket label the word — 64 bits moved in one move. Below, a long teal-stroked bar labelled the 1 KB buffer equals 1,024 bytes, with an orange arrow from the word down to the buffer's first slot. The footer computes the census: 1,024 bytes divided by 8 bytes per word equals 128 words — the buffer fills exactly.">
  <text x="360" y="22" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the word on the bus: how many words fill the 1 KB buffer</text>
  <text x="360" y="40" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">one word = 8 bytes = 64 bits riding together</text>
  ${cells}
  <line x1="${wordX0}" y1="${Y0 + CELL_H + 10}" x2="${wordX1}" y2="${Y0 + CELL_H + 10}" stroke="#d97706" stroke-width="1.7"/>
  <line x1="${wordX0}" y1="${Y0 + CELL_H + 10}" x2="${wordX0}" y2="${Y0 + CELL_H + 2}" stroke="#d97706" stroke-width="1.7"/>
  <line x1="${wordX1}" y1="${Y0 + CELL_H + 10}" x2="${wordX1}" y2="${Y0 + CELL_H + 2}" stroke="#d97706" stroke-width="1.7"/>
  <text x="360" y="${Y0 + CELL_H + 26}" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">the word — 64 bits moved in one move</text>
  <line x1="360" y1="${Y0 + CELL_H + 34}" x2="360" y2="${BUF_Y0 - 6}" stroke="#ea580c" stroke-width="2.2"/>
  <path d="M 360 ${BUF_Y0} L 354 ${BUF_Y0 - 9} L 366 ${BUF_Y0 - 9} Z" fill="#ea580c"/>
  <rect x="${BUF_X0}" y="${BUF_Y0}" width="${BUF_W}" height="${BUF_H}" rx="7" fill="#fef3c7" stroke="#0d9488" stroke-width="2.2"/>
  <text x="${bufMid}" y="${BUF_Y0 + 21}" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">the 1 KB buffer = 1,024 bytes — the first of 128 words marked</text>
  <text x="360" y="222" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">1,024 bytes ÷ 8 bytes per word = 128 words — the buffer fills exactly</text>
</svg>`
}

function clockLadderSvg(): string {
  // the cycle-time ladder: four rungs at 4.77 MHz / 1 GHz / 2 GHz / 3 GHz with
  // T = 1/f computed for each (209.6 ns, 1 ns, 0.5 ns, 0.333 ns), bar widths
  // on a square-root scale so the nanosecond rungs stay visible.
  const X0 = 180, SCALE = 28, Y0 = 66, STEP = 44, BAR_H = 14, H = 250
  const rows = [
    { f: 'f = 4.77 MHz', t: 209.6440, v: 'T ≈ 209.6 ns', sub: 'the IBM PC 5150’s 8088, 12 August 1981' },
    { f: 'f = 1 GHz', t: 1, v: 'T = 1 ns' },
    { f: 'f = 2 GHz', t: 0.5, v: 'T = 0.5 ns', hot: true },
    { f: 'f = 3 GHz', t: 0.3333, v: 'T ≈ 0.333 ns' },
  ]
  let bars = ''
  rows.forEach((row, i) => {
    const y = Y0 + i * STEP
    const w = Math.round(SCALE * Math.sqrt(row.t))
    const fill = row.hot ? '#ffedd5' : '#fef3c7'
    const stroke = row.hot ? '#ea580c' : '#16a34a'
    const sw = row.hot ? 2 : 1.4
    const vColor = row.hot ? '#ea580c' : '#166534'
    const vWeight = row.hot ? '800' : '700'
    bars += `<text x="36" y="${y + 12}" font-size="11" font-weight="700" fill="#166534">${row.f}</text>`
    if (row.sub) bars += `<text x="36" y="${y + 26}" font-size="9" font-weight="600" fill="#65a30d">${row.sub}</text>`
    bars += `<rect x="${X0}" y="${y}" width="${w}" height="${BAR_H}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`
    bars += `<text x="${X0 + w + 8}" y="${y + 12}" font-size="10.5" font-weight="${vWeight}" fill="${vColor}">${row.v}</text>`
  })
  return `<svg viewBox="0 0 720 ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The cycle-time ladder: four rungs, one per clock rate, with bar widths on a square-root scale so the nanosecond rungs stay visible. At 4.77 MHz, the IBM PC 5150's 8088 of 12 August 1981, the cycle time is about 209.6 nanoseconds, the longest bar. At 1 GHz, one nanosecond. At 2 GHz, highlighted in orange as this solution's answer, half a nanosecond. At 3 GHz, about 0.333 nanoseconds. The footer states that the law itself is linear — double the clock rate, halve the cycle time.">
  <text x="360" y="24" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the cycle-time ladder: T = 1/f at four clock rates</text>
  ${bars}
  <line x1="24" y1="230" x2="696" y2="230" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="244" font-size="9.5" font-weight="700" text-anchor="middle" fill="#65a30d">bar widths on a square-root scale — otherwise the nanosecond bars would vanish; the law is linear: double f, halve T</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* the lesson                                                          */
/* ------------------------------------------------------------------ */

const lesson11: Lesson = {
  id: 'cf-the-basic-structure-and-operation-of-the-computer',
  number: '1.1',
  title: 'The Basic Structure and Operation of the Computer',
  concepts: [
    'the information processing cycle: input, processing, output, storage',
    'the five functional units of the von Neumann machine',
    'the stored-program concept: instructions are data',
    'the fetch–decode–execute cycle',
    'clock rate and cycle time',
    'word size and the bus',
    'address space: two to the power of the address lines',
  ],
  objectives: [
    'By the end of this lesson you can draw the information processing cycle and name its four stages in order.',
    'By the end of this lesson you can tell data from information, with the mark-list run as your witness.',
    'By the end of this lesson you can name the five functional units of the von Neumann machine and say what each unit does.',
    'By the end of this lesson you can explain the stored-program concept and why it turned the machine general-purpose.',
    'By the end of this lesson you can trace a three-instruction program through the fetch–decode–execute cycle, reading the program counter at every lap.',
    'By the end of this lesson you can convert a clock rate into a cycle time and an address-bus width into an address space.',
  ],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ---------------- opening ----------------
    { kind: 'para', text: 'A pocket calculator and a room-sized machine share one arithmetic trick: both of them add. Press $62 + 48$ on the calculator and $110$ comes back; feed the same numbers to the giant and its circuits return the same $110$. Yet nobody calls the calculator a computer, and everybody called the giant one — ENIAC, properly met below, was announced to the world on 14 February 1946. The difference is not speed and not size; it is structure: five functional units, four stages, and one quiet idea (the stored program) that lets the same box become a different machine overnight. This lesson names the parts, traces one program’s life through them, and measures the machine — clock, word, bus and address space — answering the chapter’s honest question: how does a box of switches come to seem thoughtful?' },

    // ---------------- data and information ----------------
    { kind: 'heading', text: 'Data and Information' },
    { kind: 'para', text: 'Begin with the field’s rawest distinction, for every other one in this book leans on it. The marks a teacher types into a mark list are one kind of thing; the class average printed at term’s end is another. The names the field chose are *data* and *information*.' },
    { kind: 'callout', tone: 'definition', title: 'Data and information', text: 'Data is said to be the raw, unorganised facts and figures a machine is given — numbers, characters, readings — if no interpretation has yet been attached to them. Information is said to be data that has been processed into a form that carries meaning for a reader. Thus, data is what goes in; information is what comes out; the machine’s whole job is the crossing between them.' },
    { kind: 'para', text: 'The crossing deserves a slow look, for the two words are loose in ordinary speech and precise in this field. Five marks in a list — $62$, $48$, $91$, $77$, $54$ — are data: each is a fact about one student, and the list as a whole says nothing. Once the machine reports *average $66.4$, highest $91$*, the same five facts have become information — statements with meaning on which a decision could rest. And notice what the machine did **not** do: it added no meaning by magic — it applied a process, chosen by a person, to data chosen by a person.' },
    { kind: 'example', title: 'Turn the raw mark list $62, 48, 91, 77, 54$ into the class summary — count, sum, average, highest and lowest.', steps: [
      'Take the raw list: $62,\\ 48,\\ 91,\\ 77,\\ 54$ — five marks, no meaning attached yet: this is data.',
      'Check the count: there are $5$ marks.',
      'Now, add them: $62 + 48 + 91 + 77 + 54 = 332$.',
      'So, the average is $332 \\div 5 = 66.4$.',
      'Scan for the extremes: highest $91$, lowest $48$ — and $91 - 66.4 = 24.6$ above the average.',
      'Hence, the summary — count $5$, sum $332$, average $66.4$, highest $91$, lowest $48$ — is information: meaning added by a chosen process.',
    ] },

    // ---------------- the information processing cycle ----------------
    { kind: 'heading', text: 'The Information Processing Cycle' },
    { kind: 'para', text: 'Every computer run, from a mark-list summary to a national weather forecast, follows one four-stage rhythm — old enough to be folklore, exact enough to be a fixed examination favourite.' },
    { kind: 'callout', tone: 'definition', title: 'The information processing cycle', text: 'The information processing cycle is said to be the four-stage rhythm of every computer run — input, then processing, then output, then storage — the stages joined into a loop, since stored results can be taken as input again. Thus, every run can be written $I \\to P \\to O \\to S$: data in, meaning out, kept for later, ready to return.' },
    { kind: 'figure', caption: 'The cycle as a wheel: input reads the recipe at the top, processing cooks at the right, output plates the dish below, storage keeps the leftovers at the left — one everyday example riding every stage, the four beats each run follows.', svg: iposCycleSvg() },
    { kind: 'para', text: 'Read the wheel from the top, as you would read a clock. Input is the machine taking data in — for the cook, reading the recipe and laying out the ingredients; for the computer, the keyboard, mouse, touchscreen and sensors. Processing is the transformation itself — the whisking and heating that turn ingredients into a dish; in the machine, the calculating and comparing that turn data into information. Output hands the finished result out — the plated dish on the table; the summary on the screen. Storage keeps earned results for later — the leftovers in the fridge; in the machine, memory holding data and programs. And the wheel closes: what storage keeps can become what input takes again — tomorrow’s reheated dinner is tonight’s leftovers re-entering the cycle.' },
    { kind: 'table', caption: 'The four stages of the cycle, mapped twice: onto one cooking run, and onto the computer parts carrying each stage.', head: ['Stage', 'In the kitchen', 'In the computer'], rows: [
      ['Input', 'reading the recipe; laying out the ingredients', 'the input unit — keyboard, mouse, sensors'],
      ['Processing', 'whisking, heating, tasting', 'the CPU — control unit + ALU work on the data'],
      ['Output', 'plating and serving the dish', 'the output unit — screen, printer, speakers'],
      ['Storage', 'the leftovers boxed in the fridge', 'primary memory — data and programs held for reuse'],
    ] },
    { kind: 'para', text: 'The table’s two columns are one story at two scales — which is why the cycle is drawn before the machine: the stages are fixed, the parts that carry them are anything at all (a thermostat, a phone and a data-centre rack all run the same four beats). Hence the field’s first definition: a computer is said to be a machine that carries out the information processing cycle on data, under the direction of a stored program.' },
    { kind: 'example', title: 'The same mark list, a different question: which of $62, 48, 91, 77, 54$ reach the pass mark of $60$?', steps: [
      'Take the pass mark: $60$.',
      'Compare each mark against it: $62 \\ge 60$ passes; $48$ falls short; $91$ passes; $77$ passes; $54$ falls short.',
      'So, the pass census: $3$ pass and $2$ fall short — the weakest is $48$, and even $54$ missed by $6$.',
      'Hence, identical data, different processing, different information: the first Illustration returned an average, this run a pass census — the marks never changed, the process did.',
    ] },
    { kind: 'para', text: 'For example, classify these everyday acts onto the stages — the test is always what the act *does*, never where it happens:' },
    { kind: 'list', marker: 'roman', items: [
      'a nurse reading a thermometer and writing the reading on a chart — input: a fact crossing into the record;',
      'the nurse computing the day’s highest and lowest readings from the chart — processing: given facts transformed;',
      'the doctor telling the family the fever has broken — output: a result handed out;',
      'the chart filed in the patient’s folder — storage: an earned result kept for reuse.',
    ] },
    { kind: 'terms', items: [
      { term: 'Data', def: 'Data is said to be the raw, unorganised facts and figures a machine is given — numbers, characters, readings — before any processing has attached meaning to them.' },
      { term: 'Information', def: 'Information is said to be data that has been processed into a form that carries meaning for a reader.' },
      { term: 'Information processing cycle', def: 'The information processing cycle is said to be the four-stage rhythm of every computer run — input, processing, output, storage — with stored results free to become input again.' },
      { term: 'Program', def: 'A program is said to be a list of instructions that tells the machine, step by step, what to do with the data.' },
    ] },

    // ---------------- the five functional units ----------------
    { kind: 'heading', text: 'The Five Functional Units' },
    { kind: 'para', text: 'The cycle names four stages; the machine that runs it has five parts — a census more than seventy years old, with a name attached. In the drawing below, two of the five parts live inside the central processing unit (CPU), where the control unit and the arithmetic and logic unit work as a pair, one directing, one computing; around them sit primary memory, the input unit and the output unit — joined by shared roadways called buses, of which three kinds deserve naming here.' },
    { kind: 'callout', tone: 'historical', title: 'The 1945 report that named the parts', text: 'In 1945 the mathematician John von Neumann wrote ‘First Draft of a Report on the EDVAC’, a report on a machine then being designed at the University of Pennsylvania’s Moore School — and its page of structure has organised machines ever since. The report named five parts: central arithmetic (today’s arithmetic and logic unit, the ALU), central control (today’s control unit), memory, input and output. Five parts, one page, every machine since — the layout is now called the von Neumann architecture.' },
    { kind: 'figure', caption: 'The von Neumann machine: the input and output units flanking the CPU boundary (control unit directing above, the ALU computing below), primary memory underneath — joined by the three buses: the address bus naming where, the data bus carrying what both ways, the control bus commanding when; every arrow is a path along which bits move.', svg: vonNeumannSvg() },
    { kind: 'callout', tone: 'definition', title: 'The arithmetic and logic unit (ALU)', text: 'The arithmetic and logic unit (ALU) is said to be the functional unit whose circuits perform the machine’s arithmetic — adding, subtracting, multiplying, dividing — and its logic, the comparisons. Thus, the ALU is where $62 + 48 + 91 + 77 + 54 = 332$ physically happens.' },
    { kind: 'callout', tone: 'definition', title: 'The control unit', text: 'The control unit is said to be the functional unit that fetches each instruction, decodes it, and directs the other units to carry it out — the manager that never computes. Thus, the control unit is the conductor of the machine’s orchestra: it never plays a note itself.' },
    { kind: 'callout', tone: 'definition', title: 'Primary memory', text: 'Primary memory is said to be the functional unit that holds the running program and its data while the machine works — the one memory the stored-program concept made central. Thus, primary memory is the machine’s working desk.' },
    { kind: 'callout', tone: 'definition', title: 'The input unit', text: 'The input unit is said to be the functional unit that carries data from the outside world into the machine — keyboard, mouse, touchscreen, sensors. Thus, the input unit is the cycle’s first stage made of hardware.' },
    { kind: 'callout', tone: 'definition', title: 'The output unit', text: 'The output unit is said to be the functional unit that carries finished results from the machine out to the human — screen, printer, speakers. Thus, the output unit is the cycle’s third stage made of hardware.' },
    { kind: 'callout', tone: 'definition', title: 'The bus', text: 'A bus is said to be a shared set of lines that carries bits between the functional units — the address bus naming *where*, the data bus carrying *what*, the control bus commanding *when*. Thus, a bus is the machine’s public road: any unit may put bits on it, under the control unit’s direction.' },
    { kind: 'para', text: 'For example, walk the whole mark-list program of Illustration 1 through the five units — one program, five doors, every door used:' },
    { kind: 'list', marker: 'roman', items: [
      'the input unit: the teacher types the five marks $62$, $48$, $91$, $77$, $54$ — data crosses the boundary in;',
      'primary memory: the marks and the averaging program are held there together;',
      'the control unit: it fetches the program’s instructions one at a time and decodes each;',
      'the arithmetic and logic unit: its circuits do the arithmetic — $62 + 48 + 91 + 77 + 54 = 332$, then $332 \\div 5 = 66.4$;',
      'the output unit: it shows the summary — count $5$, average $66.4$, highest $91$ — while storage, riding primary memory, keeps the file.',
    ] },
    { kind: 'example', title: 'One instruction’s trip: walk the instruction *add $62 + 48$* through the five functional units.', steps: [
      'Take the instruction as it sits in memory: add the two held marks $62$ and $48$.',
      'The control unit fetches it, decodes it — an addition — and directs the ALU to perform it.',
      'Now, the ALU computes: $62 + 48 = 110$, on data that primary memory supplied and the input unit once took in.',
      'So, primary memory holds the result $110$ where the next instruction can reach it.',
      'Hence, one instruction has touched four of the five units — no unit does another’s job, and the output unit joins the moment the $110$ is shown or saved.',
    ] },
    { kind: 'terms', items: [
      { term: 'Central processing unit (CPU)', def: 'The central processing unit (CPU) is said to be the functional unit formed by the control unit and the arithmetic and logic unit working as a pair — the box that runs the program.' },
      { term: 'Arithmetic and logic unit (ALU)', def: 'The arithmetic and logic unit (ALU) is said to be the functional unit whose circuits perform the machine’s arithmetic and its comparisons.' },
      { term: 'Control unit', def: 'The control unit is said to be the functional unit that fetches instructions, decodes them and directs every other unit — the manager that never computes.' },
      { term: 'Primary memory', def: 'Primary memory is said to be the functional unit that holds the running program and its data — the one memory the stored-program concept made central.' },
      { term: 'Input unit', def: 'The input unit is said to be the functional unit that carries data from the outside world into the machine.' },
      { term: 'Output unit', def: 'The output unit is said to be the functional unit that carries finished results from the machine out to the human.' },
      { term: 'Bus', def: 'A bus is said to be a shared set of lines that carries bits between the functional units — address, data and control.' },
    ] },

    // ---------------- the stored-program concept ----------------
    { kind: 'heading', text: 'The Stored-Program Concept' },
    { kind: 'callout', tone: 'insight', title: 'The stored-program breakthrough', text: 'ENIAC, announced 14 February 1946, filled a room: 17,468 vacuum tubes, ~30 tons of weight, ~150 kW drawn from the wall — and 5,000 additions per second of honest arithmetic. Yet ‘programming’ ENIAC meant physically setting switches and patching cables: a new problem could cost days of re-wiring while the machine sat idle. UNIVAC I — accepted 31 March 1951 by the US Census Bureau, ~5,000 vacuum tubes, 16,000 pounds, the first commercial computer — arrived carrying the fix: instructions kept in memory, read and changed like any other data. The speed race photographs better; the stored program is what made the computer.' },
    { kind: 'callout', tone: 'definition', title: 'The stored-program concept', text: 'The stored-program concept is said to be the design in which a program’s instructions are held in the machine’s memory exactly as data is, fetched and executed one by one under the control unit’s direction. Thus, a program *is* data; the machine is re-tasked by a change of memory, never by a change of wiring.' },
    { kind: 'derivation', title: 'Why one memory makes re-tasking cheap', statement: 'Two designs are on the table for a machine that must serve many jobs in its life: keep each job’s instructions in separate fixed wiring, or keep every job’s instructions in the one shared memory as data. The claim: the second wins decisively in the cost of changing jobs.', steps: [
      { label: 'Count the jobs', formula: 'J \\text{ jobs over the machine’s life}', explanation: 'Let the machine serve $J$ distinct jobs — payroll this week, mark lists the next — and price each change of job under each design.' },
      { label: 'Price a re-task under separate wiring', formula: '(\\text{re-wiring days}) \\times J', explanation: 'If each job lives in its own wiring, every change of job is a physical re-wiring — panels opened, cables patched — the ENIAC cost, paid $J$ times.' },
      { label: 'Price a re-task under one memory', formula: '(\\text{bit-writing minutes}) \\times J', explanation: 'If every job is a memory image, every change of job is writing bits: minutes of machine work, no panels, no cables — also paid $J$ times.' },
      { label: 'Compare the two bills', formula: '\\text{days} \\;\\gg\\; \\text{minutes}', explanation: 'Multiplied across every job the machine will ever serve, the gap between days and minutes becomes the difference between a specialist instrument and a general-purpose machine.' },
    ], result: 'Thus, one memory turns $J$ re-taskings from $J$ re-wirings into $J$ bit-writings — the machine becomes general-purpose by changing memory, not hardware.' },
    { kind: 'para', text: 'The price must be named honestly: with instructions and data sharing one memory, every instruction fetch walks the same road as every data read — the **von Neumann bottleneck**, which a large share of later engineering exists to relieve. The deeper machinery belongs to chapter 4, ‘Inside the Box’, the full theory to Computer Organization and Architecture. The honest summary: the stored program bought general-purpose machines at the price of one shared doorway.' },
    { kind: 'example', title: 'ENIAC pace: at 5,000 additions per second, how long do 20,000 additions take?', steps: [
      'Take the pinned rate: 5,000 additions per second.',
      'So, the job is 20,000 additions.',
      'Hence, the time is $20{,}000 \\div 5{,}000 = 4$ seconds of arithmetic.',
      'Check the honest side: those 4 seconds are arithmetic only — for ENIAC, the re-wiring between jobs cost days, which is why the stored program, not the speed, is remembered as the breakthrough.',
    ] },
    { kind: 'terms', items: [
      { term: 'Stored-program concept', def: 'The stored-program concept is said to be the design in which instructions are held in the same memory as data, fetched and executed one by one.' },
      { term: 'Instruction', def: 'An instruction is said to be one coded direction — add, load, store — kept in memory exactly like a number and fetched exactly like one.' },
    ] },

    // ---------------- the fetch-decode-execute cycle ----------------
    { kind: 'heading', text: 'The Fetch–Decode–Execute Cycle' },
    { kind: 'para', text: 'Power arrives, the clock starts beating, and the machine begins the only dance it knows. The stored program has put instructions in memory; something must read them, one at a time, and make things happen. That something is the control unit, whose dance has three steps so fixed that all of computer science draws them as one loop: fetch, decode, execute.' },
    { kind: 'algorithm', title: 'The Fetch–Decode–Execute Cycle', lines: [
      { code: 'repeat forever:', note: 'the machine’s heartbeat — one full lap of this loop is a machine cycle' },
      { code: '  instruction ← memory[PC]', note: 'FETCH — the control unit reads the instruction at the address held in the program counter (PC)' },
      { code: '  decode the instruction', note: 'DECODE — the control unit works out which operation this is and what it needs' },
      { code: '  execute it (ALU, memory, or input–output)', note: 'EXECUTE — the named unit performs the operation: the ALU computes, memory loads or stores, input–output moves data' },
      { code: '  PC ← next address', note: 'the program counter moves on — usually PC ← PC + 1 — so the next lap fetches the next instruction' },
    ], note: 'Why the loop never ends on its own: nothing inside it says stop — the machine has no sense of a finished program. Ending is itself programmed: a halt instruction is fetched and decoded like any other, and executing it stops the laps; interrupts can also suspend the loop between instructions, a story belonging to Operating Systems, the manager layer. A machine that merely loops is dumb; the stored program is what makes the looping purposeful.' },
    { kind: 'figure', caption: 'The fetch–decode–execute loop: FETCH reads memory at the address the program counter names, DECODE asks which operation this is, EXECUTE has the named unit perform it — and the program counter walks on, 100 → 101 → 102 across the three laps of the tiny program traced in Illustration 5.', svg: fetchDecodeExecuteSvg() },
    { kind: 'para', text: 'Two small registers ride the loop. The **program counter** (PC) is the control unit’s moving pointer: it holds the address of the next instruction to fetch and advances — usually by one — at every lap’s end. The **instruction register** holds the instruction currently being decoded. And the loop’s arrows say who works: the control unit fetches, decodes, directs; the ALU, memory or input–output execute — the conductor-and-orchestra division, seen in motion.' },
    { kind: 'callout', tone: 'warn', title: 'The machine does not understand', text: 'A caution worth boxing on first meeting: the machine never understands the program — not the marks, not the average, not the meaning. It follows: fetch, decode, execute, repeat, with perfect discipline and zero comprehension. Whatever thoughtfulness you experience at a screen is speed plus the stored program’s reach plus the software riding the machine — which is why the software half (lesson 1.3) deserves its own lesson.' },
    { kind: 'para', text: 'Now trace the loop on a real — if tiny — program: load, add, store, sitting in memory at the addresses $100$, $101$ and $102$, with the program counter starting at $100$. It is the smallest program that uses all three stages of the loop honestly, and every number in the trace below is engine-checked.' },
    { kind: 'example', title: 'Trace the three-instruction program (load, add, store) through the fetch–decode–execute cycle, with the program counter starting at $100$.', steps: [
      'Take the program in memory: address $100$ holds load, $101$ holds add, $102$ holds store — and the program counter (PC) starts at $100$.',
      'Lap 1 (PC = 100): FETCH reads address $100$ — load; DECODE sees a load; EXECUTE moves the operand into the ALU’s reach; then PC ← 101.',
      'Lap 2 (PC = 101): FETCH reads address $101$ — add; DECODE sees an addition; EXECUTE lets the ALU add the second operand; then PC ← 102.',
      'Lap 3 (PC = 102): FETCH reads address $102$ — store; DECODE sees a store; EXECUTE writes the result back to primary memory; then PC ← 103.',
      'Check the walk’s end: PC = 103 is one address past the last instruction — the next fetch must find a halt there, or another program’s beginning; the loop itself would run on regardless.',
      'Hence, three laps of fetch–decode–execute, the program counter walking $100 \\to 101 \\to 102 \\to 103$, one instruction consumed per lap — five units, four stages, three laps: the whole lesson in one run.',
    ] },
    { kind: 'terms', items: [
      { term: 'Fetch–decode–execute cycle', def: 'The fetch–decode–execute cycle is said to be the machine’s repeating heartbeat — fetch an instruction, decode it, execute it, advance the program counter.' },
      { term: 'Program counter', def: 'The program counter is said to be the control unit’s register holding the address of the next instruction to fetch — the loop’s moving pointer.' },
      { term: 'Instruction register', def: 'The instruction register is said to be the control unit’s register holding the instruction currently being decoded.' },
    ] },

    // ---------------- the measurable machine ----------------
    { kind: 'heading', text: 'The Measurable Machine' },
    { kind: 'para', text: 'Structure is half the machine; measurement is the other half, and the first quantitative vocabulary fits in one sitting: the clock, the word, the bus and the address space — one subsection each, one law to use cold, approximations labelled as approximations.' },
    { kind: 'heading', text: 'Clock Rate and Cycle Time' },
    { kind: 'para', text: 'Deep inside the machine a clock pulses — a steady beat setting the tempo of every lap of fetch–decode–execute. The beat’s frequency is the clock rate; the time between two beats is the cycle time. The two are reciprocal, and the law connecting them earns a formal proof below.' },
    { kind: 'callout', tone: 'definition', title: 'Clock rate and cycle time', text: 'The clock rate is said to be the number of pulses the machine’s clock beats per second, measured in hertz — one hertz being one beat per second, so $1$ MHz means $10^{6}$ beats per second and $1$ GHz means $10^{9}$. The cycle time is said to be the time between two consecutive clock pulses, measured in seconds. Thus, clock rate counts beats per second while cycle time measures seconds per beat — reciprocals by definition.' },
    { kind: 'derivation', title: 'Why cycle time is one over the clock rate', statement: 'If a machine’s clock beats at a clock rate $f$ — that is, $f$ beats every second — then the time $T$ between consecutive beats is $1/f$.', steps: [
      { label: 'Count the beats in one second', formula: 'f \\text{ beats in } 1 \\text{ second}', explanation: 'By the definition of clock rate, exactly $f$ pulses arrive in each single second of the machine’s working life.' },
      { label: 'Split the second evenly', formula: 'T \\times f = 1 \\text{ second}', explanation: 'The beats are evenly spaced — that is what a clock *is* — so $f$ equal gaps of length $T$ tile the second exactly.' },
      { label: 'Solve for the gap', formula: 'T = \\frac{1}{f}', explanation: 'Divide both sides by $f$: the length of one gap is the second divided by the number of gaps in it.' },
    ], result: 'Thus, $T = \\frac{1}{f}$ — the cycle time in seconds is the reciprocal of the clock rate in hertz, and every doubling of $f$ halves $T$.' },
    { kind: 'equation', latex: 'T = \\frac{1}{f} \\tag{1}', note: 'the cycle-time law: seconds per beat, given beats per second — a 1 GHz clock beats $10^{9}$ times per second, so each beat lasts $1$ ns.' },
    { kind: 'para', text: 'The law deserves a real witness: the IBM PC 5150, the machine that put the personal computer on desks — debuted 12 August 1981, Intel 8088 clocked at 4.77 MHz, 16 KB of RAM, a starting price of 1,565 US dollars. The 5150 makes the arithmetic vivid because its clock, by today’s lights, was slow.' },
    { kind: 'equation', latex: 'T(4.77\\ \\mathrm{MHz}) = \\frac{1}{4{,}770{,}000}\\ \\mathrm{s} \\approx 209.6\\ \\mathrm{ns}', note: 'the IBM PC 5150’s beat, computed from the pinned rate — every cycle of the 8088 lasted about 209.6 ns.' },
    { kind: 'example', title: 'The IBM PC’s heartbeat: what cycle time does the 8088’s 4.77 MHz give — and how does it compare with modern clocks?', steps: [
      'Take the pinned rate: $f = 4.77$ MHz $= 4{,}770{,}000$ beats per second.',
      'So, by the law (1): $T = 1/f = 1 \\div 4{,}770{,}000$ seconds.',
      'Check the conversion: one second is $10^{9}$ ns, so the beat is roughly 209.6 ns — about a fifth of a microsecond.',
      'Now, compare: $1$ GHz gives $T = 1$ ns; $2$ GHz gives $T = 0.5$ ns; and $3$ GHz gives about 0.333 ns.',
      'Hence, the 8088’s beat was roughly 209.6 ns — about 209.6 laps of a 1 GHz machine’s clock fit inside one beat of the 1981 machine.',
    ] },
    { kind: 'para', text: 'Two honest cautions: clock rate is tempo, not speed — a machine completing more work per beat can beat a faster-clocked machine (the point of the first-approximation note below). And cycle time is the machine’s pulse, not a program’s duration: one instruction may take several cycles, which the Level 4 exercises price exactly.' },
    { kind: 'heading', text: 'Word Size' },
    { kind: 'para', text: 'The second measurement answers a question the drawings have been quietly asking: how much data does the machine move in one move? The answer is the machine’s word — the fixed-width parcel its registers and buses carry as a unit.' },
    { kind: 'callout', tone: 'definition', title: 'The word', text: 'A word is said to be the machine’s unit of data — the fixed number of bits its registers, buses and memory transfers handle in one move. Thus, a 64-bit machine reads, moves and stores in 64-bit words: the word is the parcel, not the cargo.' },
    { kind: 'equation', latex: '\\text{word} = 8\\ \\text{bytes} = 64\\ \\text{bits}', note: 'on a 64-bit machine, one word is eight bytes — and eight bytes is sixty-four bits, because a byte is eight bits.' },
    { kind: 'example', title: 'How many 8-byte words fit in a 1 KB buffer?', steps: [
      'Take the buffer: $1$ KB $= 1{,}024$ bytes — the computing *one K*, met again in the address census below.',
      'So, each word carries $8$ bytes — the 64-bit machine’s parcel.',
      'Hence, $1{,}024 \\div 8 = 128$ words.',
      'Check both ways: $128 \\times 8 = 1{,}024$ — the buffer is spent exactly, no remainder.',
      'Hence, a 1 KB buffer holds 128 words on a 64-bit machine — the clean division that makes word arithmetic a favourite examination exercise.',
    ] },
    { kind: 'para', text: 'Why word size matters is a one-paragraph honest trade: wider words move more bits per move — more of a number, an instruction, an address at once — at the price of more wires and wider registers. Today’s 64-bit machines descend from 8-bit, 16-bit and 32-bit ancestors; two shelf doorsteps exist because this paragraph is a subject’s beginning: Digital Logic Design takes the gate-level view of a register; Computer Organization and Architecture owns the width-trade theory.' },
    { kind: 'heading', text: 'Bus Width and Address Space' },
    { kind: 'para', text: 'The third measurement prices the machine’s reach. Primary memory is a long street of numbered locations; the address bus is the set of lines carrying the number of the location being read or written. The counting question — how many locations can $n$ lines name? — has the cleanest answer in the subject.' },
    { kind: 'callout', tone: 'definition', title: 'The address bus and the address space', text: 'The address bus is said to be the set of lines that carries the address of the memory location being read or written. The address space is said to be the set of locations the address bus can name — $2^{n}$ of them for $n$ address lines. Thus, the address space is the street the machine can post to, and its size doubles with every line added.' },
    { kind: 'derivation', title: 'Why n address lines reach 2^n locations', statement: 'An address bus of $n$ lines — each line held at 0 or 1 — can name exactly $2^{n}$ distinct memory locations.', steps: [
      { label: 'One line, two states', formula: '2^{1} = 2', explanation: 'A single line reads 0 or 1, so a one-line bus names two locations: address 0 and address 1.' },
      { label: 'Each added line doubles', formula: '2,\\ 4,\\ 8,\\ \\ldots,\\ 2^{n}', explanation: 'With a second line, each of the first line’s two patterns rides in two versions — 00, 01, 10, 11 — so the count doubles with every line: lines are binary digits, and binary digits multiply, never add.' },
      { label: 'Count the patterns', formula: '\\underbrace{2 \\times 2 \\times \\cdots \\times 2}_{n \\text{ factors}} = 2^{n}', explanation: 'The $n$ lines form one $n$-digit binary word; the number of distinct words equals the product of the independent choices, one factor of two per line.' },
    ], result: 'Thus, $n$ address lines reach $2^{n}$ locations — the addresses run $0$ through $2^{n} - 1$, and the address space doubles with every line added.' },
    { kind: 'table', caption: 'The address-space census: what each address-bus width reaches, computed line by line (one byte per location).', head: ['Address lines $n$', 'Locations $2^{n}$', 'Bytes, one byte per location'], rows: [
      ['$8$', '$2^{8} = 256$', '256 B'],
      ['$10$', '$2^{10} = 1{,}024$', '1 KB — the computing one K'],
      ['$12$', '$2^{12} = 4{,}096$', '4 KB exactly'],
      ['$16$', '$2^{16} = 65{,}536$', '64 KB — the classic 16-bit reach'],
      ['$20$', '$2^{20} = 1{,}048{,}576$', '1 MB'],
      ['$24$', '$2^{24} = 16{,}777{,}216$', '16 MB'],
      ['$32$', '$2^{32} = 4{,}294{,}967{,}296$', '4 GB'],
      ['$64$', '$2^{64} = 18{,}446{,}744{,}073{,}709{,}551{,}616$', '16 EiB — honestly $\\approx 1.8\\times 10^{19}$'],
    ] },
    { kind: 'equation', latex: '2^{10} = 1{,}024', note: 'the computing one K: ‘kilo’ means 1,000 in ordinary life, but one K in computing means $2^{10} = 1{,}024$ — and the binary-prefix ladder (KiB, MiB, GiB, EiB) exists to keep that honesty exact.' },
    { kind: 'para', text: 'Read the census with two disciplines. First, honest prefixes: because ‘kilo’ properly means 1,000, the exact binary quantities carry their own names — 1,024 bytes is one kibibyte (KiB), the ladder running MiB, GiB up to EiB, with $2^{64}$ bytes being exactly 16 EiB. Second, honest growth: the last row is not a misprint — sixty-four lines reach $2^{64} = 18{,}446{,}744{,}073{,}709{,}551{,}616$ locations, written honestly as $\\approx 1.8\\times 10^{19}$. Around the ladder: twelve lines reach 4,096; twenty reach 1,048,576 — one full MB; twenty-four reach 16,777,216; thirty-two reach 4,294,967,296 — 4 GB. The doubling is relentless — a few lines of cheap copper price a machine’s entire reach.' },
    { kind: 'example', title: 'A 16-line address bus: how many locations can it name, and how large is that street?', steps: [
      'Take the rule: $n$ lines reach $2^{n}$ locations.',
      'So, with $n = 16$: $2^{16} = 65{,}536$ locations.',
      'Check the size in bytes: one byte per location gives $65{,}536$ bytes $= 64 \\times 1{,}024 = 64$ KB — the classic reach of a 16-bit machine.',
      'Hence, the 16-line bus names 65,536 locations, a 64 KB street — and four more lines would multiply the street by sixteen, to $2^{20} = 1{,}048{,}576$: one full MB.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The first approximation, honestly labelled', text: 'Here is the formula newcomers misuse most: performance $\\approx f \\times \\text{IPC}$, where IPC — instructions per cycle — counts how many instructions the machine completes per clock beat on average. It is a first approximation, and saying so is not hedging: $f$ and IPC together do not capture cache misses, memory waits, branch mispredictions or the drag of the von Neumann bottleneck, and two machines with equal $f \\times \\text{IPC}$ can still finish the same job at different times. Treat $f \\times \\text{IPC}$ as a ballpark for reasoning about machines in the large — never as a measurement of any real program’s speed.' },
    { kind: 'equation', latex: '\\text{instructions per second} \\approx f \\times \\text{IPC}', note: 'the first approximation — a ballpark from the two headline numbers only; real program speed also answers to memory waits, cache hits and branch decisions.' },
    { kind: 'terms', items: [
      { term: 'Clock rate', def: 'The clock rate is said to be the number of pulses the machine’s clock beats per second, measured in hertz.' },
      { term: 'Cycle time', def: 'The cycle time is said to be the time between two consecutive clock pulses — the reciprocal of the clock rate.' },
      { term: 'Word', def: 'A word is said to be the machine’s unit of data — the fixed number of bits its registers and buses move in one move.' },
      { term: 'Address bus', def: 'The address bus is said to be the set of lines that carries the address of the memory location being read or written.' },
      { term: 'Address space', def: 'The address space is said to be the set of locations the address bus can name — $2^{n}$ of them for $n$ address lines.' },
    ] },

    // ---------------- hardware and software ----------------
    { kind: 'heading', text: 'Hardware and Software: the Boundary' },
    { kind: 'para', text: 'The lesson has been quietly using two words that now deserve their formal place. Hardware is the physical machine — the five functional units and the three buses. Software is the programs — instructions, held in memory as data by the stored-program concept, directing the hardware. The boundary is the one this lesson has been drawing: hardware is structure, software is behaviour, and the stored program is the bridge that lets one fixed structure carry endless behaviours.' },
    { kind: 'para', text: 'The software half is the next stop but one: lesson 1.3, ‘Software: the Invisible Half of the Machine’. Between here and there, lesson 1.2, ‘A Census of Hardware: Desktops to Embedded Chips’, walks the hardware families you will meet in the wild. Deeper doors open later: chapter 4, ‘Inside the Box’, returns to the processor, memory hierarchy, buses and ports; ‘Digital Logic Design’ descends to the gate level the ALU is built from; ‘Computer Organization and Architecture’ owns the theory of the design; ‘Operating Systems’ takes the manager layer riding the machine’s loop. This lesson deliberately stays at first-meeting depth — every one of those doors keeps its promise from here.' },
    { kind: 'terms', items: [
      { term: 'Hardware', def: 'Hardware is said to be the physical half of the machine — the five functional units and the three buses, everything a screwdriver could in principle touch.' },
      { term: 'Software', def: 'Software is said to be the programs that ride the hardware — instructions, held in memory as data, directing the machine.' },
    ] },

    // ---------------- exam corner ----------------
    { kind: 'heading', text: 'Exam Corner' },
    { kind: 'callout', tone: 'exam', title: 'What examinations ask of this lesson', text: 'Banking and SSC computer-awareness papers, and school and board computer-science papers, draw on this lesson with a stable typology: (i) ordering the information processing cycle — input, processing, output, storage; (ii) unit identification — which unit performs arithmetic (the ALU), which fetches and sequences instructions (the control unit), which holds the running program (primary memory); (iii) the stored-program concept — instructions in the same memory as data; and (iv) the address-space arithmetic — $2^{n}$ locations from $n$ address lines, a favourite being $2^{16} = 65{,}536$. The exercise sets below include items in exactly this style, labelled exam-style — original items in the examination idiom, not real past-paper questions.' },
    { kind: 'para', text: 'From the above discussion, it follows that a computer is a machine that runs the information processing cycle — input, processing, output, storage — on a fixed structure of five functional units (input, output, primary memory, and the CPU’s control unit and ALU) joined by three buses; that its behaviour is not its wiring but the contents of its memory, thanks to the stored-program concept; that its life is the fetch–decode–execute loop, pointed by the program counter; and that its first quantitative vocabulary — clock rate and cycle time ($T = 1/f$), word size, bus width and address space ($2^{n}$ locations) — prices the machine’s tempo, parcel and reach. The box of switches seems thoughtful because it is fast, structured and re-taskable — not because it understands.' },
    { kind: 'list', marker: 'roman', items: [
      'data is the given, information the earned, and the cycle $I \\to P \\to O \\to S$ names the crossing;',
      'the five functional units — input, output, primary memory, control unit and ALU (the last two paired inside the CPU) — divide the labour once and for all;',
      'the stored-program concept made machines general-purpose, at the honest price of the von Neumann bottleneck;',
      'the fetch–decode–execute cycle is the machine’s whole life, pointed by the program counter — halting is an instruction, not an instinct;',
      'cycle time is the reciprocal of clock rate, $T = 1/f$: 4.77 MHz gives roughly 209.6 ns, 1 GHz gives 1 ns, 2 GHz gives 0.5 ns, 3 GHz about 0.333 ns;',
      'word size is the parcel (64 bits = 8 bytes), bus width the road, and $n$ address lines reach $2^{n}$ locations — 16 lines to 65,536, 32 lines to 4,294,967,296;',
      'performance $\\approx f \\times \\text{IPC}$ is a first approximation, honestly labelled — a ballpark, never a measurement.',
    ] },

    // ---------------- quiz ----------------
    { kind: 'quiz', items: [
      { q: 'Which ordering of the information processing cycle is correct?', options: ['Processing → Input → Output → Storage', 'Input → Output → Processing → Storage', 'Input → Processing → Output → Storage', 'Storage → Input → Processing → Output'], answer: 2, explain: 'Option 3 is the cycle’s order: input, processing, output, storage — the rhythm every run follows. Option 1 starts at processing, but nothing can be processed before it is taken in. Option 2 puts output ahead of processing — nothing comes out before the machine works on the input. Option 4 opens with storage, the keep-for-later stage, not the front door.' },
      { q: 'Which unit performs the arithmetic and logic of the machine?', options: ['The arithmetic and logic unit (ALU)', 'The control unit', 'The primary memory', 'The output unit'], answer: 0, explain: 'Option 1 is correct: adding, subtracting and comparing are the arithmetic and logic unit’s job — its circuits computed $62 + 48 + 91 + 77 + 54 = 332$ in this lesson’s run. Option 2 is the conductor: it fetches and sequences instructions but never computes them. Option 3 holds the program and its data — holding is not computing. Option 4 shows finished results and performs no arithmetic at all.' },
      { q: 'What does the stored-program concept mean?', options: ['Programs are wired into the machine and cannot be changed without re-wiring', 'Instructions are held in the same memory as data, so a new program is a new memory image', 'The machine keeps its results only on magnetic tape', 'Only numbers, never instructions, are ever stored in memory'], answer: 1, explain: 'Option 2 states the concept: instructions live in memory exactly as data does, so re-tasking is rewriting memory, not re-wiring hardware. Option 1 describes ENIAC’s switches and patch cables — the very problem the concept fixed. Option 3 confuses a storage medium with the idea itself. Option 4 denies the whole idea — an instruction *is* a stored pattern, fetched exactly like a number.' },
      { q: 'How many memory locations can a 16-line address bus name?', options: ['16', '1,024', '65,536', '16,384'], answer: 3, explain: 'Option 4 is right: sixteen binary lines carry $2^{16} = 65{,}536$ distinct address patterns — the classic 64 KB machine. Option 1 confuses lines with locations: lines are address digits, not addresses. Option 2 is $2^{10} = 1{,}024$, a ten-line bus’s reach. Option 3 is $2^{14} = 16{,}384$, a fourteen-line bus — two lines short of the 64 KB street.' },
      { q: 'What does the control unit do?', options: ['It performs the additions and comparisons themselves', 'It fetches, decodes and sequences instructions, directing the other units', 'It holds the running program and its data', 'It displays finished results to the user'], answer: 1, explain: 'Option 2 is the control unit’s job: it reads each instruction, decodes it, and directs the ALU, memory and input–output — the conductor, never a player. Option 1 is the ALU’s job: the arithmetic happens in its circuits. Option 3 is primary memory’s job — holding, not directing. Option 4 is the output unit’s job: showing results, not managing the machine.' },
    ] },

    // ---------------- formula cards ----------------
    { kind: 'formula', name: 'The address-space law', latex: '2^{n} \\text{ locations from } n \\text{ address lines}', note: 'the doubling law: every added line doubles the reach — 16 lines reach $2^{16} = 65{,}536$ (64 KB); 32 lines reach $2^{32} = 4{,}294{,}967{,}296$ (4 GB).' },
    { kind: 'formula', name: 'The cycle-time law', latex: 'T = \\frac{1}{f}', note: 'seconds per beat from beats per second: 1 GHz gives 1 ns, 2 GHz gives 0.5 ns, 3 GHz gives about 0.333 ns — and 4.77 MHz gives about 209.6 ns.' },
    { kind: 'formula', name: 'The throughput first approximation', latex: '\\text{instructions per second} \\approx f \\times \\text{IPC}', note: 'a first approximation, honestly labelled — a ballpark from the two headline numbers, never a measurement of a real program’s speed.' },
    { kind: 'formula', name: 'The stored-program identity', latex: '\\text{instructions} \\equiv \\text{data in the one memory}', note: 'the machine is re-tasked by a change of memory, not of hardware — the honest price being the von Neumann bottleneck.' },
    { kind: 'formula', name: 'The IPOS recap', latex: '\\text{input} \\to \\text{processing} \\to \\text{output} \\to \\text{storage}', note: 'the four beats of every computer run, closing into a loop: stored results can be input again.' },
    { kind: 'formula', name: 'The word equation', latex: '\\text{word bits} = 8 \\times \\text{word bytes}', note: 'a 64-bit word is 8 bytes, so a 1 KB buffer holds $1{,}024 \\div 8 = 128$ words.' },

    // ---------------- exercises ----------------
    { kind: 'exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Classify each act of this cooking run onto the stages of the information processing cycle: (a) reading the recipe and laying out the ingredients; (b) whisking, heating and tasting; (c) serving the plated dish; (d) boxing the leftovers in the fridge.', solution: [
          'Take the four stages in order: input → processing → output → storage.',
          'Now, reading the recipe and laying out the ingredients brings material in — input; whisking, heating and tasting transform it — processing.',
          'Hence, serving the dish is output, and boxing the leftovers is storage — the cycle in order.',
        ], answer: '(a) input, (b) processing, (c) output, (d) storage — the cycle in order.' },
        { q: 'Classify each act of this photo run onto the stages of the information processing cycle: (a) clicking the shutter; (b) the phone applying the filter and sharpening; (c) the finished picture appearing on the screen; (d) the picture syncing to cloud backup.', solution: [
          'Take the four stages as the checklist: input → processing → output → storage.',
          'Now, the shutter click carries light into the machine — input; the filter and sharpening transform the captured data — processing.',
          'Hence, the picture on the screen is output, and the cloud sync is storage.',
        ], answer: '(a) input, (b) processing, (c) output, (d) storage.' },
      ] },
      { level: 'L2', questions: [
        { q: 'Complete the unit identification: (a) the unit that adds two numbers and compares them; (b) the unit that fetches and sequences instructions; (c) the unit that holds the running program and its data; (d) the shared roadways that carry bits between the units.', solution: [
          'Split the four jobs by kind: computing, directing, holding, carrying.',
          'Now, the computing job is the arithmetic and logic unit (ALU), the directing job the control unit, the holding job primary memory.',
          'Hence, the carrying job is the buses: address, data and control.',
        ], answer: '(a) the ALU, (b) the control unit, (c) primary memory, (d) the three buses.' },
        { q: 'Name the functional unit chiefly at work in each described job: (a) a shop keypad as prices are typed into a billing machine; (b) the circuits that actually compute the bill total; (c) the register that tells the machine where its next instruction lives; (d) the printer producing the printed bill.', solution: [
          'Take each job and ask what it does: takes in, computes, points, gives out.',
          'Now, the keypad is the input unit, and the computing circuits the arithmetic and logic unit (ALU).',
          'Hence, the register pointing to the next instruction is the control unit’s program counter, and the printer the output unit.',
        ], answer: '(a) the input unit, (b) the ALU, (c) the control unit’s program counter, (d) the output unit.' },
      ] },
      { level: 'L3', questions: [
        { q: 'A small embedded controller has a 12-line address bus. How many memory locations can it name, and how many bytes is that if each location holds one byte?', solution: [
          'Take the address-space law: $n$ address lines reach $2^{n}$ locations.',
          'So, with $n = 12$: $2^{12} = 4{,}096$ locations.',
          'Check the byte count: $4{,}096 = 4 \\times 1{,}024$ — so 4 KB exactly.',
          'Hence, the controller names 4,096 locations — the rung marked on the ladder below.',
        ], answer: '4,096 locations — 4 KB exactly.', figures: [
          { caption: 'The doubling ladder to the 4 KB rung: every added line doubles the reach — 12 lines land on 4,096 locations, 4 KB exactly.', svg: addressLadderSvg() },
        ] },
        { q: 'A games console’s address bus carries 24 lines. How many distinct memory locations can it name?', solution: [
          'Take the law again: 24 lines reach $2^{24}$ locations.',
          'So, $2^{24} = 16{,}777{,}216$ — engine-checked against the census table.',
          'Check the byte reading: $16{,}777{,}216$ bytes is 16 MB.',
          'Hence, the console names 16,777,216 distinct locations.',
        ], answer: '16,777,216 locations (16 MB, one byte per location).' },
        { q: 'Trace one run of the mark-list program of Illustration 1 through the four stages of the information processing cycle: the teacher types the five marks 62, 48, 91, 77, 54; the machine computes the summary; the summary appears on screen; the file is saved.', solution: [
          'Take the run as given: the marks 62, 48, 91, 77, 54 arrive by keyboard — input, data crossing in.',
          'So, the CPU processes: $62 + 48 + 91 + 77 + 54 = 332$, and $332 \\div 5 = 66.4$, with the highest mark 91 found by comparison.',
          'Now, the on-screen summary is output, and the saved file storage — the earned result kept as future input.',
          'Hence, one run, four stages — the strip below.',
        ], answer: 'input: the marks; processing: sum 332, average 66.4, highest 91; output: the summary; storage: the saved file.', figures: [
          { caption: 'One mark-list run on the IPOS strip: the marks in; sum 332, average 66.4, highest 91 out; the file saved.', svg: iposTraceStripSvg() },
        ] },
      ] },
      { level: 'L4', questions: [
        { q: 'A modern processor runs at 2 GHz. What is its cycle time?', solution: [
          'Take the cycle-time law (1): $T = 1/f$.',
          'So, $T = 1 \\div 2{,}000{,}000{,}000$ seconds per beat.',
          'Check the conversion: one second is $10^{9}$ ns, so one billionth of a second is 1 ns.',
          'Hence, $T = 0.5$ ns — the rung marked on the ladder below.',
        ], answer: '0.5 ns.', figures: [
          { caption: 'The cycle-time ladder: T = 1/f from 4.77 MHz (about 209.6 ns) to 3 GHz (about 0.333 ns) — the 2 GHz rung is this question’s 0.5 ns answer.', svg: clockLadderSvg() },
        ] },
        { q: 'A short program runs 200 instructions, each needing 2 clock cycles, on that same 2 GHz machine. How long does the program take in total?', solution: [
          'Take the two facts separately: 200 instructions, 2 cycles each.',
          'So, the total work is $200 \\times 2 = 400$ cycles.',
          'Check the cycle time at 2 GHz: $T = 0.5$ ns per cycle.',
          'Hence, the total is $400 \\times 0.5 = 200$ ns — engine-checked as $200 \\times 2 \\times 0.5$.',
        ], answer: '200 ns in total.' },
        { q: 'Exam-style MCQ chain (original items written in the bank/SSC computer-awareness idiom — not a real past paper): (i) Which ordering is the information processing cycle? (ii) Under the stored-program concept, where do instructions live?', solution: [
          'Split the chain into its two questions.',
          '(i) The cycle runs input → processing → output → storage — the IPOS order; distractors beginning at processing break the rhythm at once.',
          '(ii) Under the stored-program concept, instructions live in the same memory as data — wiring and tape are distractors from the pre-1945 world.',
          'Hence, both answers ride the definitions this lesson boxed.',
        ], answer: '(i) input → processing → output → storage; (ii) in the same memory as data.' },
      ] },
      { level: 'L5', questions: [
        { q: 'How many 8-byte words fit in a 1 KB buffer on a 64-bit machine?', solution: [
          'Take the buffer first: $1$ KB $= 1{,}024$ bytes.',
          'So, each word carries $8$ bytes — the 64-bit machine’s parcel.',
          'Hence, $1{,}024 \\div 8 = 128$ words.',
          'Check: $128 \\times 8 = 1{,}024$ — spent exactly, no remainder.',
        ], answer: '128 words — the 1 KB buffer holds exactly 128 8-byte words.', figures: [
          { caption: 'The word on the bus: one 8-byte word rides eight byte lanes — 1,024 bytes ÷ 8 = 128 words fill the 1 KB buffer exactly.', svg: wordOnBusSvg() },
        ] },
        { q: 'A 64-bit machine has a full 64-line address bus. How many locations can it name? Give the exact count and the honest approximate form.', solution: [
          'Take the law at $n = 64$: the reach is $2^{64}$ locations.',
          'So, the exact count: $2^{64} = 18{,}446{,}744{,}073{,}709{,}551{,}616$.',
          'Now, round honestly: $\\approx 1.8 \\times 10^{19}$ — about 1.8 billion billion.',
          'Check the prefixes: $2^{64}$ bytes is 16 EiB, since $2^{64} = 16 \\times 2^{60}$ — the last row of the census table.',
          'Hence, a 64-line bus names about $1.8 \\times 10^{19}$ locations.',
        ], answer: '$2^{64} = 18{,}446{,}744{,}073{,}709{,}551{,}616 \\approx 1.8\\times 10^{19}$ locations — 16 EiB of addressable bytes.' },
        { q: 'An old controller board carries a 20-line address bus, one byte per location. How many locations can it name, and how many bytes is that?', solution: [
          'Take the law at $n = 20$: the reach is $2^{20}$ locations.',
          'So, $2^{20} = 1{,}048{,}576$ locations.',
          'Check the byte reading: $1{,}048{,}576$ bytes is one full MB.',
          'Hence, the board names 1,048,576 locations — one full MB.',
        ], answer: '1,048,576 locations — 1 MB.' },
      ] },
      { level: 'L6', questions: [
        { q: 'Argue in four moves why one memory holding both instructions and data was the deeper revolution than raw speed — and name honestly the price the design paid.', solution: [
          'Take the two prizes: speed (more arithmetic per second) and re-tasking (how fast the machine becomes a different machine).',
          'Now, price a re-task under each design: behaviour in wiring costs days per job; behaviour in memory costs minutes — multiplied over every job the machine will ever serve, that gap is the difference between a specialist instrument and a general-purpose machine.',
          'So, speed widens what one machine can do this hour, while the stored program multiplies what one box can become — which is why the stored program, not the tube count, is what *computer* has meant since 1945.',
          'And the price, named honestly: instructions and data compete for the same one memory — the von Neumann bottleneck, which later engineering works to relieve.',
          'Hence, the deeper revolution changed what a machine could become, not merely how fast it was.',
        ], answer: 'One memory made behaviour a property of memory contents — re-tasking by rewriting bits instead of re-wiring — at the honest price of the von Neumann bottleneck.' },
        { q: 'Prove from binary place values that $n$ address lines reach exactly $2^{n}$ locations.', solution: [
          'Take $n$ lines, each held at 0 or 1: an address is an $n$-digit binary word with place values $2^{0}, 2^{1}, \\ldots, 2^{n-1}$.',
          'So, the smallest address is $00\\ldots0 = 0$, and the largest is $11\\ldots1 = 2^{0} + 2^{1} + \\cdots + 2^{n-1}$.',
          'Now, sum the geometric chain: $2^{0} + 2^{1} + \\cdots + 2^{n-1} = 2^{n} - 1$ — the largest address the bus can name.',
          'Hence, the addresses run 0 to $2^{n} - 1$: exactly $2^{n}$ distinct locations.',
          'Check the small cases: $n = 1$ gives 2 locations, $n = 2$ gives 4, $n = 12$ gives 4,096 — the engine agreeing at every $n$.',
        ], answer: 'the addresses run 0 through $2^{n} - 1$ — exactly $2^{n}$ locations, because $n$ binary place values sum to $2^{n} - 1$.' },
      ] },
    ] },
  ],
}


// ------------------------------------------------------------------
// lesson 1.2 — authored by the CS RUN 1 swarm (the cf12 agent), integrated verbatim
// ------------------------------------------------------------------

function tradeOffTriangleSvg(): string {
  // The trade-off triangle: raw performance (top vertex), untethered
  // portability (lower left), frugal watts (lower right). Twelve families
  // placed at engine-computed barycentric positions (each weight triple sums
  // to 1); label offsets fan left / right / above / below so no two labels
  // collide, and the labels carry a cream halo so they stay readable where
  // they cross the triangle's edges.
  const A = { x: 360, y: 96 }
  const B = { x: 96, y: 400 }
  const C = { x: 624, y: 400 }
  const fam: { name: string; w: number[]; dir: 'l' | 'r' | 'a' | 'b' }[] = [
    { name: 'desktop tower', w: [0.62, 0.08, 0.3], dir: 'r' },
    { name: 'all-in-one', w: [0.5, 0.16, 0.34], dir: 'r' },
    { name: 'laptop', w: [0.42, 0.44, 0.14], dir: 'l' },
    { name: 'tablet', w: [0.24, 0.6, 0.16], dir: 'l' },
    { name: 'smartphone', w: [0.16, 0.68, 0.16], dir: 'l' },
    { name: 'workstation', w: [0.74, 0.06, 0.2], dir: 'r' },
    { name: 'server', w: [0.68, 0.04, 0.28], dir: 'r' },
    { name: 'mainframe', w: [0.8, 0.02, 0.18], dir: 'r' },
    { name: 'supercomputer', w: [0.9, 0.01, 0.09], dir: 'a' },
    { name: 'games console', w: [0.56, 0.18, 0.26], dir: 'l' },
    { name: 'embedded MCU', w: [0.06, 0.16, 0.78], dir: 'a' },
    { name: 'single-board computer', w: [0.1, 0.52, 0.38], dir: 'b' },
  ]
  const pt = (w: number[]) => ({
    x: A.x * w[0] + B.x * w[1] + C.x * w[2],
    y: A.y * w[0] + B.y * w[1] + C.y * w[2],
  })
  let dots = ''
  fam.forEach((f) => {
    const p = pt(f.w)
    dots += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5.5" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>`
    let lx = 0, ly = 0, anchor = 'start', line = ''
    if (f.dir === 'r') {
      lx = p.x + 14; ly = p.y + 5; anchor = 'start'
      line = `<line x1="${(p.x + 6).toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${(p.x + 12).toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="#d97706" stroke-width="1.2"/>`
    } else if (f.dir === 'l') {
      lx = p.x - 14; ly = p.y + 5; anchor = 'end'
      line = `<line x1="${(p.x - 6).toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${(p.x - 12).toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="#d97706" stroke-width="1.2"/>`
    } else if (f.dir === 'a') {
      lx = p.x; ly = p.y - 14; anchor = 'middle'
      line = `<line x1="${p.x.toFixed(1)}" y1="${(p.y - 6).toFixed(1)}" x2="${p.x.toFixed(1)}" y2="${(p.y - 11).toFixed(1)}" stroke="#d97706" stroke-width="1.2"/>`
    } else {
      lx = p.x; ly = p.y + 20; anchor = 'middle'
      line = `<line x1="${p.x.toFixed(1)}" y1="${(p.y + 6).toFixed(1)}" x2="${p.x.toFixed(1)}" y2="${(p.y + 14).toFixed(1)}" stroke="#d97706" stroke-width="1.2"/>`
    }
    dots += line + `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="11" font-weight="700" fill="#166534" stroke="#fffdf5" stroke-width="3" paint-order="stroke" text-anchor="${anchor}">${f.name}</text>`
  })
  const vertex = (p: { x: number; y: number }, label: string, dy: number) =>
    `<circle cx="${p.x}" cy="${p.y}" r="7" fill="#0d9488" stroke="#0f766e" stroke-width="1.6"/><text x="${p.x}" y="${p.y + dy}" font-size="12" font-weight="800" fill="#0f766e" text-anchor="middle">${label}</text>`
  return `<svg viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The trade-off triangle of the hardware census. A large green triangle has three teal vertex markers: raw performance at the top, untethered portability at the lower left, and frugal watts at the lower right. Twelve family dots sit at engine-computed positions inside the triangle. Climbing toward the performance vertex: the supercomputer highest, then mainframe, workstation, server, desktop tower and the all-in-one. Balanced near the middle: the games console between families. Along the left slope toward portability: the laptop, then the tablet, then the smartphone hugging the pocket corner between portability and frugal watts. Near the frugal corner: the embedded microcontroller, the frugalest family. The single-board computer sits between portability and frugality at the bottom. Each dot is joined by a short amber leader line to its label. The footer states that every family is a compromise on this triangle: a machine that maximises one prize gives up the others, and the laptop carries the smallest spread — the most balanced compromise.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the trade-off triangle: every family is a compromise</text>
  <line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#16a34a" stroke-width="2.4"/>
  <line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#16a34a" stroke-width="2.4"/>
  <line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="#16a34a" stroke-width="2.4"/>
  ${vertex(A, 'raw performance', -22)}
  ${vertex(B, 'untethered portability', 24)}
  ${vertex(C, 'frugal watts', 24)}
  <text x="140" y="258" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle">performance vs portability</text>
  <text x="585" y="258" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle">performance vs frugality</text>
  ${dots}
  <text x="360" y="456" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">engine-computed compromise coordinates — a qualitative map: bands, not promises</text>
</svg>`
}

function generationsTimelineSvg(): string {
  // The five-generation ladder as timeline bands with the eleven pinned
  // machines at engine-computed x positions (linear map, 8.4 px per year over
  // 1940–2015). The label rows are assigned greedily so that same-row
  // neighbours keep at least 88 px of horizontal separation; the fifth
  // generation is drawn as a dashed band with deliberately fuzzy edges.
  const X0 = 60, X1 = 690, Y0 = 1940, Y1 = 2015
  const x = (year: number) => X0 + ((year - Y0) / (Y1 - Y0)) * (X1 - X0)
  const machines: { name: string; year: number }[] = [
    { name: 'ENIAC', year: 1946 },
    { name: 'transistor', year: 1947 },
    { name: 'UNIVAC I', year: 1951 },
    { name: 'the IC', year: 1958 },
    { name: 'System/360', year: 1964 },
    { name: 'Intel 4004', year: 1971 },
    { name: 'Altair 8800', year: 1975 },
    { name: 'Apple II', year: 1977 },
    { name: 'IBM PC 5150', year: 1981 },
    { name: 'iPhone', year: 2007 },
    { name: 'Raspberry Pi', year: 2012 },
  ]
  const GAP = 88
  const rows: number[][] = []
  machines.forEach((m, idx) => {
    let placed = false
    for (let r = 0; r < rows.length && !placed; r++) {
      const last = rows[r][rows[r].length - 1]
      if (x(m.year) - x(machines[last].year) >= GAP) { rows[r].push(idx); placed = true }
    }
    if (!placed) rows.push([idx])
  })
  const rowNameY = [48, 74, 100, 126]
  let labels = ''
  rows.forEach((row, r) => {
    row.forEach((idx) => {
      const m = machines[idx]
      const cx = x(m.year)
      labels += `<text x="${cx.toFixed(1)}" y="${rowNameY[r]}" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">${m.name}</text>`
      labels += `<text x="${cx.toFixed(1)}" y="${rowNameY[r] + 12}" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="middle">${m.year}</text>`
      labels += `<line x1="${cx.toFixed(1)}" y1="${rowNameY[r] + 16}" x2="${cx.toFixed(1)}" y2="152" stroke="#d97706" stroke-width="1.2"/>`
    })
  })
  let guides = ''
  machines.forEach((m) => {
    guides += `<line x1="${x(m.year).toFixed(1)}" y1="164" x2="${x(m.year).toFixed(1)}" y2="294" stroke="#5eead4" stroke-width="1" stroke-dasharray="1 4"/>`
  })
  const edges = [1946, 1956, 1964, 1971]
  const bandY = 168, bandH = 32
  let bands = ''
  edges.forEach((e, i) => {
    const bx0 = x(e)
    const bx1 = i === 3 ? 690 : x(edges[i + 1])
    bands += `<rect x="${bx0.toFixed(1)}" y="${bandY}" width="${(bx1 - bx0).toFixed(1)}" height="${bandH}" fill="${i % 2 === 0 ? '#fef3c7' : '#ffedd5'}" stroke="#d97706" stroke-width="1.5"/>`
  })
  const captions: { text: string; cx: number; y: number }[] = [
    { text: '1st · tubes 1946–1956', cx: (x(1946) + x(1956)) / 2, y: 216 },
    { text: '2nd · transistors 1956–1964', cx: (x(1956) + x(1964)) / 2, y: 232 },
    { text: '3rd · ICs 1964–1971', cx: (x(1964) + x(1971)) / 2, y: 216 },
    { text: '4th · microprocessors 1971 →', cx: (x(1971) + 690) / 2, y: 232 },
  ]
  let caps = ''
  captions.forEach((cap) => {
    caps += `<text x="${cap.cx.toFixed(1)}" y="${cap.y}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${cap.text}</text>`
  })
  let ticks = ''
  for (let yr = 1950; yr <= 2010; yr += 10) {
    const tx = x(yr)
    ticks += `<line x1="${tx.toFixed(1)}" y1="295" x2="${tx.toFixed(1)}" y2="305" stroke="#0f766e" stroke-width="1.6"/><text x="${tx.toFixed(1)}" y="322" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${yr}</text>`
  }
  let dots = ''
  machines.forEach((m) => {
    dots += `<circle cx="${x(m.year).toFixed(1)}" cy="158" r="5" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>`
  })
  return `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The five-generation ladder from 1946 to the present, drawn as timeline bands with eleven pinned machines at engine-computed positions. The Intel 4004 was released on 15 November 1971 with 2,300 transistors, 4 bits, priced at $60; the Apple II went on sale on 10 June 1977, its 6502 running at 1.023 MHz with 4 KB of RAM, priced at $1,298; the IBM PC 5150 debuted on 12 August 1981, its Intel 8088 running at 4.77 MHz with 16 KB of RAM, priced at $1,565; the Raspberry Pi Model B launched on 29 February 2012 priced at $35. In the first band, vacuum tubes 1946 to 1956, sit ENIAC of 1946 and UNIVAC I of 1951, with the transistor of December 1947 invented inside that band. The integrated circuit of 12 September 1958 sits inside the second band, transistors 1956 to 1964. IBM System/360, announced 7 April 1964, sits exactly on the third door, integrated circuits 1964 to 1971. The Intel 4004 sits exactly on the fourth door, microprocessors from 1971 onward, where the Altair of the January 1975 Popular Electronics cover, the Apple II, the IBM PC 5150, the iPhone of 2007 and the Raspberry Pi of 2012 all ride. Below, a dashed band with fuzzy edges marks the so-called fifth generation — a label, not a crisp switch. The footer states that the band edges are teaching conventions and the fifth is a label with fuzzy edges.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the five generations: a census of the machine eras, 1946 to the present</text>
  ${guides}
  ${bands}
  ${labels}
  ${dots}
  ${caps}
  <rect x="480" y="248" width="226" height="26" fill="#fef3c7" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="6 4"/>
  <text x="593" y="260" font-size="9.2" font-weight="700" fill="#dc2626" text-anchor="middle">the "fifth generation": AI / ULSI</text>
  <text x="590" y="271" font-size="9.2" font-weight="700" fill="#dc2626" text-anchor="middle">a label with fuzzy edges — not a crisp switch</text>
  <line x1="50" y1="300" x2="705" y2="300" stroke="#0d9488" stroke-width="2.6"/>
  <path d="M 705 300 l -10 -5 v 10 z" fill="#0d9488"/>
  ${ticks}
  <text x="360" y="352" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the ladder is a teaching census: band edges are conventions, and the "fifth" is a label with fuzzy edges</text>
</svg>`
}

function powerPerformanceSvg(): string {
  // The power–performance census on a log-scale watt axis. The four pinned
  // ballpark bands (MCU mW–1 W, phone SoC 3–8 W, laptop 15–45 W, desktop
  // 65–125 W) are placed by the engine from the pinned band edges; server,
  // mainframe and supercomputer are drawn as open-ended dashed bands anchored
  // at the desktop band's floor and pointing upward — no exact figure is
  // claimed for them (estimates vary).
  const YBOT = 390, YTOP = 60, LOGMIN = -3, LOGMAX = 3
  const y = (w: number) => YBOT - ((Math.log10(w) - LOGMIN) / (LOGMAX - LOGMIN)) * (YBOT - YTOP)
  const px = [150, 240, 330, 420, 510, 590, 665]
  const bandW = 56
  const pinned: { name: string; lo: number; hi: number; label: string; x: number }[] = [
    { name: 'microcontroller', lo: 0.001, hi: 1, label: 'mW–1 W', x: px[0] },
    { name: 'smartphone', lo: 3, hi: 8, label: '3–8 W', x: px[1] },
    { name: 'laptop', lo: 15, hi: 45, label: '15–45 W', x: px[2] },
    { name: 'desktop', lo: 65, hi: 125, label: '65–125 W', x: px[3] },
  ]
  let pinnedBands = ''
  pinned.forEach((b, i) => {
    const yHi = y(b.hi), yLo = y(b.lo)
    pinnedBands += `<rect x="${b.x - bandW / 2}" y="${yHi.toFixed(1)}" width="${bandW}" height="${(yLo - yHi).toFixed(1)}" fill="${i % 2 === 0 ? '#fef3c7' : '#ffedd5'}" stroke="#d97706" stroke-width="1.5"/>`
    pinnedBands += `<circle cx="${b.x}" cy="${y(Math.sqrt(b.lo * b.hi)).toFixed(1)}" r="5" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>`
    const labX = i === 0 ? b.x + bandW / 2 + 6 : b.x - bandW / 2 - 6
    pinnedBands += `<text x="${labX}" y="${(y(Math.sqrt(b.lo * b.hi)) + 3.5).toFixed(1)}" font-size="9.5" font-weight="700" fill="#166534" text-anchor="${i === 0 ? 'start' : 'end'}">${b.label}</text>`
  })
  const openTops = [78, 72, 66]
  const openNames = ['server', 'mainframe', 'supercomputer']
  let openBands = ''
  openTops.forEach((top, i) => {
    const cx = px[4 + i]
    const yAnchor = y(65)
    openBands += `<rect x="${cx - bandW / 2}" y="${top}" width="${bandW}" height="${(yAnchor - top).toFixed(1)}" fill="none" stroke="#ea580c" stroke-width="1.6" stroke-dasharray="5 4"/>`
    openBands += `<path d="M ${cx - 8} ${top + 10} L ${cx} ${top - 4} L ${cx + 8} ${top + 10}" fill="none" stroke="#ea580c" stroke-width="1.8"/>`
    openBands += `<circle cx="${cx}" cy="${yAnchor.toFixed(1)}" r="4.5" fill="#ea580c"/>`
  })
  const decades: { w: number; label: string }[] = [
    { w: 0.001, label: '1 mW' }, { w: 0.01, label: '10 mW' }, { w: 0.1, label: '100 mW' },
    { w: 1, label: '1 W' }, { w: 10, label: '10 W' }, { w: 100, label: '100 W' }, { w: 1000, label: '1000 W' },
  ]
  let axis = ''
  decades.forEach((d) => {
    axis += `<line x1="100" y1="${y(d.w).toFixed(1)}" x2="110" y2="${y(d.w).toFixed(1)}" stroke="#0f766e" stroke-width="1.6"/><text x="96" y="${(y(d.w) + 3.5).toFixed(1)}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="end">${d.label}</text>`
  })
  const famLabels = [...pinned.map((b) => b.name), ...openNames]
  let xlabels = ''
  famLabels.forEach((name, i) => {
    xlabels += `<text x="${px[i]}" y="408" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">${name}</text>`
  })
  return `<svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The power and performance census plotted with power on a logarithmic axis from one milliwatt to one thousand watts. Four honest ballpark bands are drawn with their pinned edges: an embedded microcontroller from thousandths of a watt up to about one watt; a smartphone system on a chip from three to eight watts; a laptop from fifteen to forty-five watts; a desktop processor from sixty-five to one hundred twenty-five watts. Each carries a green dot at its log-midpoint. Server, mainframe and supercomputer are drawn as open-ended dashed orange bands anchored at the desktop band's floor of sixty-five watts and pointing upward with arrows, because their installed power varies wildly with configuration and no exact figure is claimed. The horizontal axis is raw performance rising to the right, an ordinal ranking rather than a measurement. The footer states these are honest ballparks, bands and not promises.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the power–performance census: honest ballpark bands on a log scale</text>
  <text x="585" y="42" font-size="9.2" font-weight="700" fill="#ea580c" text-anchor="middle">from the pinned desktop band upward — estimates vary</text>
  <line x1="104" y1="48" x2="104" y2="390" stroke="#0d9488" stroke-width="2.4"/>
  <path d="M 104 48 l -5 10 h 10 z" fill="#0d9488"/>
  <text x="40" y="220" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle" transform="rotate(-90 40 220)">watts drawn (log scale)</text>
  ${axis}
  ${pinnedBands}
  ${openBands}
  <line x1="96" y1="390" x2="706" y2="390" stroke="#0d9488" stroke-width="2.4"/>
  <path d="M 706 390 l -10 -5 v 10 z" fill="#0d9488"/>
  <text x="660" y="378" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">raw performance →</text>
  ${xlabels}
  <text x="360" y="432" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">honest ballparks — bands, not promises; server, mainframe and supercomputer are drawn open-ended (estimates vary)</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* solution figures — compact diagrams for the worked solutions       */
/* ------------------------------------------------------------------ */

function generationsStripSvg(): string {
  // The generations strip for the generation-matching drill: five pinned
  // machines on the four solid generation bands, x positions computed by a
  // linear map (50 + 8.667 px per year over 1940–2015), labels staggered in
  // two rows so no pair collides.
  const sx = (year: number) => 50 + ((year - 1940) / 75) * 650
  const machines: { name: string; year: number; row: number }[] = [
    { name: 'ENIAC', year: 1946, row: 0 },
    { name: 'UNIVAC I', year: 1951, row: 1 },
    { name: 'System/360', year: 1964, row: 0 },
    { name: 'Intel 4004', year: 1971, row: 1 },
    { name: 'Altair 8800', year: 1975, row: 0 },
  ]
  const edges = [1946, 1956, 1964, 1971]
  let bands = ''
  edges.forEach((e, i) => {
    const bx0 = sx(e), bx1 = i === 3 ? 700 : sx(edges[i + 1])
    bands += `<rect x="${bx0.toFixed(1)}" y="64" width="${(bx1 - bx0).toFixed(1)}" height="32" fill="${i % 2 === 0 ? '#fef3c7' : '#ffedd5'}" stroke="#d97706" stroke-width="1.5"/>`
  })
  let dots = ''
  machines.forEach((m) => {
    const cx = sx(m.year)
    dots += `<circle cx="${cx.toFixed(1)}" cy="64" r="5" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>`
  })
  let labels = ''
  machines.forEach((m) => {
    const cx = sx(m.year)
    const ny = m.row === 0 ? 30 : 48
    labels += `<text x="${cx.toFixed(1)}" y="${ny}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">${m.name}</text>`
    labels += `<text x="${cx.toFixed(1)}" y="${ny + 11}" font-size="9" font-weight="700" fill="#65a30d" text-anchor="middle">${m.year}</text>`
    labels += `<line x1="${cx.toFixed(1)}" y1="${ny + 14}" x2="${cx.toFixed(1)}" y2="57" stroke="#d97706" stroke-width="1.2"/>`
  })
  const caps: { text: string; cx: number; y: number }[] = [
    { text: '1st · tubes 1946–56', cx: (sx(1946) + sx(1956)) / 2, y: 112 },
    { text: '2nd · transistors 1956–64', cx: (sx(1956) + sx(1964)) / 2, y: 128 },
    { text: '3rd · ICs 1964–71', cx: (sx(1964) + sx(1971)) / 2, y: 112 },
    { text: '4th · microprocessors 1971 →', cx: (sx(1971) + 700) / 2, y: 128 },
  ]
  let capText = ''
  caps.forEach((cap) => {
    capText += `<text x="${cap.cx.toFixed(1)}" y="${cap.y}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${cap.text}</text>`
  })
  return `<svg viewBox="0 0 720 168" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The five-generation ladder strip for the matching drill: four solid bands — vacuum tubes 1946 to 1956, transistors 1956 to 1964, integrated circuits 1964 to 1971, microprocessors from 1971 onward — with five pinned machines placed at computed positions. ENIAC of 1946 and UNIVAC I of 1951 sit inside the first tube band; IBM System/360 of 1964 sits exactly at the third door; the Intel 4004 of 1971 sits exactly at the fourth door; the Altair 8800 of 1975 rides inside the microprocessor band. A note states that the honest fifth generation is a label with fuzzy edges and no crisp band is drawn for it.">
  <text x="360" y="16" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">the five-generation ladder: where each pinned machine sits</text>
  ${bands}
  ${dots}
  ${labels}
  ${capText}
  <text x="360" y="152" font-size="9.2" font-weight="700" fill="#dc2626" text-anchor="middle">the honest fifth: a label with fuzzy edges — no crisp band drawn for it</text>
</svg>`
}

function mooreStaircaseSvg(): string {
  // The Moore staircase for the growth computation: bars of 2^k at even k,
  // bar height proportional to k (the ladder is drawn on a logarithmic
  // height scale, so the bars step evenly), the k = 20 bar highlighted as
  // the arrival point of the drill.
  const ks = Array.from({ length: 11 }, (_, i) => i * 2)
  const barW = 44, gap = 12, startX = 58, base = 252, unit = 9.5
  let bars = ''
  ks.forEach((k, i) => {
    const bx = startX + i * (barW + gap)
    const h = k * unit
    const isLast = k === 20
    bars += `<rect x="${bx}" y="${(base - Math.max(h, 3)).toFixed(1)}" width="${barW}" height="${Math.max(h, 3).toFixed(1)}" fill="${isLast ? '#ffedd5' : '#fef3c7'}" stroke="${isLast ? '#ea580c' : '#d97706'}" stroke-width="1.4"/>`
    bars += `<text x="${bx + barW / 2}" y="${(base - Math.max(h, 3) - 6).toFixed(1)}" font-size="9.2" font-weight="700" fill="${isLast ? '#ea580c' : '#166534'}" text-anchor="middle">${Math.pow(2, k).toLocaleString('en-US')}</text>`
    bars += `<text x="${bx + barW / 2}" y="268" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="middle">2^${k}</text>`
  })
  return `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Moore staircase: eleven bars, one for each even k from zero to twenty, with bar height proportional to k because the ladder is drawn on a logarithmic height scale. The bar values climb 1, 4, 16, 64, 256, 1,024, 4,096, 16,384, 65,536, 262,144 and 1,048,576, the last bar highlighted in orange as the arrival point. The footer states twenty doublings from 1971 to 2011 multiply the 4004's 2,300 transistors by 1,048,576, landing at 2,411,724,800, about 2.4 billion.">
  <text x="360" y="18" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">the Moore staircase: 2^k for k = 0, 2, 4 … 20 — one bar per doubling step</text>
  ${bars}
  <line x1="50" y1="252" x2="670" y2="252" stroke="#0d9488" stroke-width="2.2"/>
  <text x="360" y="290" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">twenty doublings, 1971 → 2011: 2,300 × 1,048,576 = 2,411,724,800 ≈ 2.4 billion</text>
</svg>`
}

function batteryStripSvg(): string {
  // The battery strip for the power-budget drill: one 40 Wh pack, two draws.
  // The hour axis maps 0–8 h to x = 120–680 (70 px per hour), so the 5 W run
  // spans the full 8 h bar and the 8 W run spans 5 h — drawn, not asserted.
  const hPx = 70, x0 = 120
  const hx = (h: number) => x0 + h * hPx
  let ticks = ''
  for (let h = 0; h <= 8; h++) {
    ticks += `<line x1="${hx(h)}" y1="176" x2="${hx(h)}" y2="182" stroke="#0f766e" stroke-width="1.5"/><text x="${hx(h)}" y="196" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${h}h</text>`
  }
  return `<svg viewBox="0 0 720 236" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The battery strip for a 40 watt-hour pack. A rounded tile at the top states the pack as 5 watts times 8 hours equals 40 watt-hours. Below, two horizontal time bars on an hour axis from zero to eight: the first bar, spanning the full eight hours, is labelled draw 5 watts, the pack runs the full 8 hours; the second bar, spanning only five hours, is labelled draw 8 watts, the same pack empties in 5 hours. The footer states battery life equals capacity divided by draw: 40 watt-hours over 5 watts gives 8 hours, and 40 watt-hours over 8 watts gives 5 hours — a lighter draw buys a longer day.">
  <text x="360" y="18" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">the battery strip: one 40 Wh pack, two draws</text>
  <rect x="170" y="34" width="380" height="28" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="360" y="53" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">the pack: 5 W × 8 h = 40 Wh</text>
  <rect x="${x0}" y="88" width="${hx(8) - x0}" height="28" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>
  <line x1="${hx(8)}" y1="88" x2="${hx(8)}" y2="116" stroke="#16a34a" stroke-width="2.2"/>
  <text x="126" y="107" font-size="10" font-weight="700" fill="#166534" text-anchor="start">draw 5 W → the pack runs the full 8 h</text>
  <rect x="${x0}" y="128" width="${hx(5) - x0}" height="28" fill="#ffedd5" stroke="#d97706" stroke-width="1.8"/>
  <line x1="${hx(5)}" y1="128" x2="${hx(5)}" y2="156" stroke="#ea580c" stroke-width="2.2"/>
  <text x="126" y="147" font-size="10" font-weight="700" fill="#166534" text-anchor="start">draw 8 W → the same pack empties in 5 h</text>
  <line x1="110" y1="176" x2="690" y2="176" stroke="#0d9488" stroke-width="2.4"/>
  <path d="M 690 176 l -10 -5 v 10 z" fill="#0d9488"/>
  ${ticks}
  <text x="360" y="222" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">battery life ≈ capacity ÷ draw: 40 Wh ÷ 5 W = 8 h, and 40 Wh ÷ 8 W = 5 h — a lighter draw buys a longer day</text>
</svg>`
}

const lesson12: Lesson = {
  id: 'cf-a-census-of-hardware-desktops-to-embedded-chips',
  number: '1.2',
  title: 'A Census of Hardware: Desktops to Embedded Chips',
  concepts: [
    'the hardware families census',
    'the four census axes: form factor, performance, power budget, dedication',
    "Moore's law as the growth census",
    'the five generations of computers',
    'the personal-computing arc',
    'the embedded world: microcontroller, SoC and ECU',
    'choosing a family honestly',
  ],
  objectives: [
    'by the end you can classify any computing machine you meet into one of the eleven hardware families, and say WHY axis by axis',
    'by the end you can read the four census axes — form factor, performance, power budget and dedication — as a taxonomist\u2019s checklist',
    'by the end you can compute Moore\u2019s-law growth with $2^k$ and the battery-life arithmetic of a power budget',
    'by the end you can date the five generations and the personal-computing arc from ENIAC to the Raspberry Pi',
    'by the end you can tell an embedded microcontroller from a general-purpose machine, and count the ECUs hiding in a modern car',
  ],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ---------- the opening motivation (cold open, no heading) ----------
    {
      kind: 'para',
      text: 'One word now stretches across an absurd range: the noun that names a warehouse of racks blinking in a machine hall also names a chip hiding inside a washing machine, silently timing a drum. Lesson 1.1, "The Basic Structure and Operation of the Computer", showed that every machine runs the same information processing cycle — input, processing, output, storage — so the word itself cannot tell them apart. A census can: a count of the families and an honest look at what separates them. By the end you will classify any machine you meet into an honest family and state the axis that put it there.',
    },

    // ---------- the census axes ----------
    { kind: 'heading', text: 'The Census Axes' },
    {
      kind: 'para',
      text: 'A taxonomist begins with the measurements, not the animals. Four honest axes separate computing machines, and a classification that cannot cite its axis is an opinion, not a census: **form factor**, **performance**, **power budget**, and the dedication question — general-purpose versus dedicated.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Form factor',
      text: 'The physical shape and size class a machine belongs to is said to be its **form factor** — from a room-sized mainframe through a desk-side tower to a pocket slab.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Performance',
      text: 'The useful work a machine does per second is said to be its **performance** — pinned where figures exist, ballpark where they do not.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Power budget',
      text: 'The watts a machine may draw, and the battery mass those watts imply, are said to be its **power budget**: wall power makes it generous, a battery makes it a constraint.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'General-purpose versus dedicated',
      text: 'A computer is said to be **general-purpose** if it runs whatever programs its owner loads, and **dedicated** if it runs one fixed program for its whole life.',
    },
    {
      kind: 'para',
      text: 'The four axes buy you something a single ranking cannot: a machine can lose on one axis and win on another — which is why several families survive side by side. A phone loses to a desktop on raw performance but wins on the power budget; no family wins everywhere. Every family is a compromise, and Figure 1 draws it as a triangle.',
    },
    {
      kind: 'figure',
      caption:
        'The trade-off triangle. Each corner is one prize — raw performance at the top, untethered portability at the lower left, frugal watts at the lower right — and every family sits at engine-computed compromise coordinates: the dot\u2019s position is the weighted mix of prizes its family buys. The desktop tower, workstation, server, mainframe and supercomputer climb toward performance; the tablet and smartphone hug the pocket corner; the embedded microcontroller camps near the frugal corner; the laptop carries the smallest spread — the most balanced compromise. A qualitative map: bands, not promises.',
      svg: tradeOffTriangleSvg(),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Every family is a compromise on the triangle',
      text: 'Maximise one prize and you give up the others: performance costs watts and portability; portability caps performance under a tight budget; frugality caps both. That is why eleven families coexist — each occupies a different point of the same triangle, and no dot sits on a vertex.',
    },
    {
      kind: 'para',
      text: 'The triangle is qualitative by design — dot positions come from compromise weights, not measurements — but its axes are exactly the ones a buyer or an examiner asks about. The table below fixes each axis with one verified instance.',
    },
    {
      kind: 'table',
      caption: 'The four census axes with one verified instance each — the kind of evidence a census accepts: a pinned figure, an honest ballpark, or a role you can point at.',
      head: ['Census axis', 'The question it asks', 'One verified instance'],
      rows: [
        ['Form factor', 'How big is it, and who carries it?', 'A tower under a desk against a slab in a pocket'],
        ['Performance', 'How much work per second?', 'ENIAC managed 5,000 additions per second (1946); today\u2019s figures stay qualitative'],
        ['Power budget', 'How many watts may it draw?', 'A desktop CPU\u2019s ballpark of 65–125 W against a phone SoC\u2019s 3–8 W'],
        ['General-purpose vs dedicated', 'One fixed program, or any program?', 'A laptop runs anything; a washing machine\u2019s controller runs one program forever'],
      ],
    },
    {
      kind: 'para',
      text: 'Keep the four axes in hand as the census proceeds: for every family, ask — what shape, how fast honestly, how many watts, one job or any job?',
    },

    // ---------- the families census ----------
    { kind: 'heading', text: 'The Families Census' },
    {
      kind: 'para',
      text: 'Now the count itself: eleven families, from the machine you are probably reading this on to chips you will never see. The table is the census in one view; the paragraphs after it walk each family with honest ballparks — bands, not promises, since wattages vary with the exact parts inside the box.',
    },
    {
      kind: 'table',
      caption: 'The families census — eleven families filed by purpose, form factor and typical role. Read a row and ask which axis that family gives up: every row is a compromise on the triangle of Figure 1.',
      head: ['Family', 'What it is for', 'Form factor', 'Typical role'],
      rows: [
        ['Desktop tower', 'General-purpose work at one desk', 'Separate tower and monitor', 'The home and office workhorse'],
        ['All-in-one desktop', 'The same duties, fewer cables', 'Screen and parts in one slab', 'Family and reception machines'],
        ['Laptop', 'General-purpose work anywhere', 'Hinged slab, battery plus wall', 'Student and traveller machine'],
        ['Tablet', 'Reading, browsing, light creation', 'Touch slab, battery', 'Couch and classroom machine'],
        ['Smartphone', 'Communication, camera, pocket apps', 'Pocket slab, battery', 'The machine most people own'],
        ['Workstation', 'One professional\u2019s heavy jobs', 'Desk-side, tower-class', 'Engineering and media desks'],
        ['Server', 'Serving many users at once', 'Rack shelf in a machine room', 'Websites, files, shared work'],
        ['Mainframe', 'Enormous dependable batch volume', 'A room, serviced by engineers', 'Banks and airline systems'],
        ['Supercomputer', 'Peak speed on hard simulation', 'Racks of cabinets in a hall', 'Weather, climate and research'],
        ['Games console', 'Games on the family television', 'Set-top box under the TV', 'The living-room machine'],
        ['Embedded microcontroller', 'One dedicated job inside a product', 'Hidden chip or credit-card board', 'Washers, car doors, robots'],
      ],
    },
    {
      kind: 'para',
      text: 'The **desktop tower** is the classic shape: a box beside a desk, separate monitor, wall power, keyboard and mouse. Never needing a battery, its parts may draw tens of watts — an honest ballpark of 65–125 W for the processor — under fans no pocket forgives; one tower edits video, browses, plays, hosts files. The **all-in-one desktop** folds the tower behind the screen, trading easy upgrades for fewer cables.',
    },
    {
      kind: 'para',
      text: 'The **laptop** makes the first real move on the triangle, trading performance and budget for portability: a hinged slab in a bag with a processor ballpark of 15–45 W — roughly a third of a desktop\u2019s draw. The **tablet** pushes further: touch first, no hinge, a thinner body. The **smartphone** completes the climb: a pocket slab whose whole personality bends around a 3–8 W budget for its system on a chip — every watt spent is a battery hour lost.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Server',
      text: 'A **server** is a computer built to serve many users over a network at once — files, web pages, shared work — typically racked by the hundreds and valued for staying up.',
    },
    {
      kind: 'para',
      text: 'A **server** is the general-purpose machine with the audience changed: thousands arriving over a network instead of one user at a keyboard. Its form factor is a rack shelf; its role is duty — a website, a file share, an app backend — kept running around the clock. A startup\u2019s web application lives on servers; the duty shapes the machine, and that is what earns a family.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Workstation',
      text: 'A **workstation** is a high-performance desktop-class machine built for one professional user\u2019s heavy jobs — design, simulation, media.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Mainframe',
      text: 'A **mainframe** is the room-sized batch and transaction specialist that banks, airline reservation systems and national censuses still run — very much alive — prized for dependable enormous volume rather than peak speed.',
    },
    {
      kind: 'para',
      text: 'The **workstation** and the **mainframe** are both wall-powered and expensive — only the axes separate them. The workstation is a one-user machine at the top of the desktop band: an engineer\u2019s simulation box. The mainframe is a different animal: a room-filling installation whose pride is *throughput with dependability* — millions of records chewed overnight, every night, for years. Banks still run mainframes; airline reservation systems still do. When the brief says "enormous dependable volume", the census answer is mainframe.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Supercomputer',
      text: 'A **supercomputer** is the top of the performance census — bought for peak speed on hard scientific simulations such as weather, climate and cryptographic research, housed in dedicated halls.',
    },
    {
      kind: 'para',
      text: 'The **supercomputer** is the peak-performance corner: racks of cabinets in a hall of their own, bought to simulate weather and climate and crack research problems. Its power draw is another league from anything battery-powered — we claim no figure, because installed power varies wildly with configuration; estimates vary. The examination distinction: a supercomputer maximises peak speed on hard problems; a mainframe maximises dependable volume on transactions — research speed against bank duty.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Embedded system',
      text: 'A system is said to be **embedded** when a small computer hides inside a larger product to run that product, unseen by its user — the washing machine\u2019s cycle brain, the car\u2019s door controller, the microwave\u2019s clock.',
    },
    {
      kind: 'para',
      text: 'The **embedded system** is the quiet majority of the census, and it inverts every desktop assumption: no screen of its own, no keyboard, no owner who even knows it is a computer. It is a chip or small board inside a product, running the one program that product needs, forever, on the frugal corner of Figure 3 — from thousandths of a watt (mW) up to about 1 W. This world gets its own census later.',
    },
    {
      kind: 'figure',
      caption:
        'The power–performance census on a log-scale watt axis. The four honest ballpark bands are pinned: an embedded microcontroller from mW to about 1 W, a smartphone SoC 3–8 W, a laptop 15–45 W, a desktop CPU 65–125 W — bands, not promises. Server, mainframe and supercomputer are drawn open-ended, anchored at the desktop band\u2019s floor and pointing upward, because their installed power varies wildly with configuration (estimates vary) — no exact figure is claimed for them. The x-axis is ordinal: raw performance rising to the right, a ranking, not a measurement.',
      svg: powerPerformanceSvg(),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'A games console sits between families',
      text: 'Run the four axes on a games console and it refuses to file cleanly: set-top form factor, desktop-class performance and power, and half-and-half dedication — sold locked to games and a curated store, yet built from general-purpose parts. The honest verdict is "it depends on the axis", and that is a finding, not a shrug: name the axis, and the console files itself.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Ballparks, not promises',
      text: 'Every wattage here — desktop 65–125 W, laptop 15–45 W, phone SoC 3–8 W, microcontroller mW–1 W — is an honest ballpark band, not a specification; real parts sit above or below their band.',
    },
    {
      kind: 'para',
      text: 'The census earns its keep the moment you run it on a real machine. The three Illustrations below do exactly that — one verdict each, the deciding axis named out loud.',
    },
    {
      kind: 'example',
      title: 'Classify the machine: the school computer-lab tower',
      steps: [
        'Take the four census axes in order: form factor, performance, power budget, dedication.',
        'Check form factor: a separate tower and monitor under a library desk — stationary, wall-powered.',
        'Check performance and power: desktop-class parts free to draw tens of watts all day.',
        'Check dedication: it runs whatever the timetable loads — general-purpose.',
        'Hence the verdict: the desktop tower family, on all four axes agreeing.',
      ],
    },
    {
      kind: 'example',
      title: 'Classify the machine: the bank\u2019s overnight batch engine',
      steps: [
        'Take the axes: the machine fills a room, is serviced by engineers, and runs while the branch sleeps.',
        'Check performance: not peak speed on one problem — enormous dependable volume, millions of records, every night.',
        'Check power and dedication: wall power on a hall scale (kept qualitative; estimates vary), running the bank\u2019s batch workloads.',
        'So the verdict: the mainframe family — still alive in banks and airline reservation systems; the deciding axis is dependable volume.',
      ],
    },
    {
      kind: 'example',
      title: 'Classify the machine: the car\u2019s door controller',
      steps: [
        'Take the axes: the machine is a chip hidden inside a door-latch module.',
        'Check form factor: invisible — no screen, no keyboard, no owner awareness.',
        'Check performance and power: enough to time a latch on thousandths of a watt up to about a watt — the frugal corner.',
        'Check dedication: one fixed program for the car\u2019s whole life.',
        'Hence the verdict: an embedded system around a microcontroller — one of roughly 50–100 hiding in a typical modern car.',
      ],
    },
    {
      kind: 'para',
      text: 'Three machines, three families, one checklist — every verdict named its axis: *stationary generality*, *dependable volume*, *dedication at the frugal corner*. The exercise bench drills the habit until it is automatic.',
    },

    // ---------- Moore's law ----------
    { kind: 'heading', text: "Moore's Law: The Growth Census" },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Gordon Moore counts transistors',
      text: 'In 1965 Gordon Moore observed transistor counts on integrated circuits doubling roughly every year; in 1975 he revised the cadence to doubling about every **two years** — compound growth near 41% per year. Moore\u2019s law is an observation about an industry\u2019s track record, **not a law of nature** — a census of growth, describing what happened, not what must.',
    },
    {
      kind: 'para',
      text: 'Why does a hardware census need a growth observation? Because the families table is a snapshot of a world that changes under you: the machine "desktop" meant in 1981 and the machine it means today differ by a factor in the millions, and Moore\u2019s observation is how that factor is counted. Written as a growth law, the transistor headcount $N$ after $\\Delta t$ years obeys',
    },
    { kind: 'equation', latex: 'N(t) = N_0 \\cdot 2^{\\Delta t / 2} \\tag{1}', note: 'the revised (1975) cadence: $N_0$ is the starting headcount, $\\Delta t$ the years elapsed — one doubling every two years.' },
    { kind: 'equation', latex: '2^{1/2} - 1 \\approx 0.4142 \\approx 41\\% \\text{ per year} \\tag{2}', note: 'the cadence restated as a compound growth rate — what "doubling every two years" means per year.' },
    {
      kind: 'derivation',
      title: 'The doubling arithmetic',
      statement: 'Starting from the Intel 4004\u2019s 2,300 transistors (released 15 November 1971), apply the revised Moore cadence — one doubling every two years — across the forty years to the early 2010s, and see what size the arithmetic forces.',
      steps: [
        {
          label: 'Count the doublings',
          formula: '\\frac{2011 - 1971}{2} = \\frac{40}{2} = 20',
          explanation: 'forty years at one doubling per two years stacks exactly twenty doublings.',
        },
        {
          label: 'Stack the growth factor',
          formula: '2^{20} = 1{,}048{,}576',
          explanation: 'twenty doublings multiply the count by just over a million, since $\\log_{10} 2^{20} \\approx 6.02$.',
        },
        {
          label: 'Apply it to the 4004',
          formula: '2{,}300 \\times 2^{20} = 2{,}411{,}724{,}800',
          explanation: 'the 1971 headcount grows to 2,411,724,800 transistors — an engine-computed product, checked digit by digit before this prose was written.',
        },
        {
          label: 'Round honestly',
          formula: '2{,}411{,}724{,}800 \\approx 2.4 \\times 10^{9}',
          explanation: 'about 2.4 billion transistors — exactly the census finding for early-2010s chips.',
        },
      ],
      result: 'from $2{,}300$ transistors in 1971, forty years of two-year doublings force $2{,}300 \\times 2^{20} = 2{,}411{,}724{,}800 \\approx 2.4 \\times 10^{9}$ — about 2.4 billion transistors, matching the early-2010s chips the census found.',
    },
    {
      kind: 'para',
      text: 'Sit with that arithmetic: twenty doublings is a factor of $1{,}048{,}576$ — a million-fold headcount growth in a working lifetime. The 4004 carried 2,300 transistors, was 4-bit, and sold for 60 US dollars; forty observed years later, chips carried about 2.4 billion. Equation (1) promises none of this forever — it is an observation — but as a census of what happened, it is hardware history\u2019s most useful number.',
    },
    {
      kind: 'figure',
      caption:
        'The five-generation ladder, 1946 to the present. The four solid bands are the census — vacuum tubes, transistors, integrated circuits, microprocessors — and every pinned machine sits at its engine-computed x position: ENIAC and UNIVAC I in the tube band; the transistor (December 1947) invented inside generation 1; the integrated circuit (12 September 1958) inside generation 2; System/360 exactly on the third door; the 4004 (15 November 1971) exactly on the fourth; then the Altair (the January 1975 Popular Electronics cover), Apple II, IBM PC, iPhone and Raspberry Pi riding inside the microprocessor era. The dashed fifth band is drawn with fuzzy edges on purpose — a label, not a switch.',
      svg: generationsTimelineSvg(),
    },
    {
      kind: 'para',
      text: 'Read the timeline as a census with three kinds of entry: the *band edges* are teaching conventions — history does not knock politely; the *machines* are pinned witnesses at computed positions; the *fifth band* is deliberately dashed — the honest label treated below.',
    },

    // ---------- the five generations ----------
    { kind: 'heading', text: 'The Five Generations' },
    {
      kind: 'table',
      caption: 'The five generations of the census. Generations 1–4 are hardware switches — a new switching technology measurably changed the machines; the fifth row is the honest label, drawn with fuzzy edges because no single switching device marks it.',
      head: ['Generation', 'Years', 'Switching technology', 'The pinned witness'],
      rows: [
        ['First', '1946–1956', 'Vacuum tubes', 'ENIAC 1946: 17,468 tubes; UNIVAC I 1951, first commercial'],
        ['Second', 'about 1956–1964', 'Transistors', 'Bell Labs transistor, December 1947; FORTRAN, 1957'],
        ['Third', '1964–1971', 'Integrated circuits', 'Kilby IC demo 1958; System/360, 7 April 1964'],
        ['Fourth', '1971–present', 'Microprocessors', 'Intel 4004, 15 November 1971: 2,300 transistors, 4-bit'],
        ['"Fifth" (the honest label)', 'a label, not a switch', 'AI-era branding, ULSI scale', 'The 1982 FGCS branding; today’s AI era, fuzzy edges'],
      ],
    },
    {
      kind: 'para',
      text: 'The **first generation** (1946–1956) is the vacuum-tube era. ENIAC, announced on 14 February 1946, carried 17,468 vacuum tubes, weighed about 30 tons, drew about 150 kW, and managed 5,000 additions per second. UNIVAC I, accepted by the US Census Bureau on 31 March 1951 with about 5,000 tubes and 16,000 pounds, became the first commercial computer — the census bureau buying the machine that would count censuses. Tubes burned out like light bulbs.',
    },
    {
      kind: 'para',
      text: 'The **second generation** (about 1956–1964) is the transistor era. The transistor was invented at Bell Labs in December 1947 — note honestly that the invention sits inside the *first* band: inventions precede their eras. Transistor machines were smaller, cooler and far more reliable, and the era brought the first high-level languages, FORTRAN arriving in 1957.',
    },
    {
      kind: 'para',
      text: 'The **third generation** (1964–1971) is the integrated-circuit era. Jack Kilby demonstrated the integrated circuit on 12 September 1958 — again inside the *previous* band; the census keeps the honest dates. The era\u2019s monument is IBM System/360, announced on 7 April 1964: one architecture sold as a compatible family — this lesson\u2019s very word "family" descends from that idea.',
    },
    {
      kind: 'para',
      text: 'The **fourth generation** (1971 to the present) is the microprocessor era, and its door is pinned to the day: the Intel 4004, released on 15 November 1971, put a whole CPU on one chip — 2,300 transistors, 4-bit, sold at 60 US dollars. Everything on your desk, in your bag and in your pocket descends from that chip.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The honest fifth generation',
      text: 'Syllabi name a "fifth generation" of AI and ULSI — treat it as a label with fuzzy edges, never a crisp machine switch. The phrase began as the branding of the 1982 Japanese Fifth Generation Computer Systems project — a research programme\u2019s name, not a circuit change — and today\u2019s "AI era" usage inherits exactly that fuzziness: underneath, the machines are still fourth-generation microprocessors. Generations 1–4 are hardware switches; the fifth is a conversation label — an honest census says so.',
    },
    {
      kind: 'para',
      text: 'For an examination the table is a matching drill — a named machine, a named band, one line of why. The Illustration below rehearses that move with four pinned machines, and the exercise bench repeats it.',
    },
    {
      kind: 'example',
      title: 'Place each machine in its generation',
      steps: [
        'Take ENIAC (announced 14 February 1946): 17,468 vacuum tubes — the first generation, the tube era itself.',
        'Take UNIVAC I (accepted 31 March 1951): about 5,000 tubes, the first commercial computer — first generation again.',
        'Take IBM System/360 (announced 7 April 1964): built from integrated circuits — the third generation, sitting exactly on its door.',
        'Take the Intel 4004 (released 15 November 1971): a whole CPU on one chip — the fourth generation, and its door opener.',
        'Hence the drill files: tubes, tubes, ICs, microprocessor — four machines, three bands, two doors.',
      ],
    },

    // ---------- the personal-computing arc ----------
    { kind: 'heading', text: 'The Personal-Computing Arc' },
    {
      kind: 'para',
      text: 'Inside the fourth generation runs the arc that put a computer on your desk and then in your pocket — short enough to memorise, important enough to be examined. Its hinge is the kit: the moment a computer became something a person could *buy and build*, the machine stopped belonging only to institutions.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'The Altair cover',
      text: 'The Altair 8800, introduced in 1974, made the cover of Popular Electronics in January 1975 and became the first commercially successful personal computer — sold as a kit you built yourself. A machine with no screen and no keyboard by default started the industry that now ships a supercomputer-class slab to every pocket.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        '(i) The **Altair 8800** — introduced 1974, the January 1975 Popular Electronics cover, the first commercially successful personal computer, sold as a kit.',
        '(ii) The **Apple II** — on sale 10 June 1977: a 6502 at 1.023 MHz, 4 KB of RAM, priced at 1,298 US dollars; the ready-built family computer.',
        '(iii) The **IBM PC 5150** — debuted 12 August 1981: an Intel 8088 at 4.77 MHz, 16 KB of RAM, priced at 1,565 US dollars; the establishment walking in.',
        '(iv) The **clones and the commodity PC** — the IBM PC\u2019s parts were bought, not secret, so compatible machines flooded the market and prices fell for decades.',
        '(v) **Laptops** — the portability move: the general-purpose machine folding into a bag.',
        '(vi) The **Macintosh** in 1984 — the friendly face: the graphical desktop and the mouse welcoming people who never read a manual.',
        '(vii) The **iPhone** — announced 9 January 2007, on sale June 2007: the pocket pivot, a general-purpose computer that happens to make calls.',
        '(viii) The **pocket-computer era** — the smartphone census: the machine most of humanity meets computing through.',
      ],
    },
    {
      kind: 'para',
      text: 'Read the arc on the census axes and it tightens: Altair to IBM PC is the price-and-assembly question — a kit becomes a ready product, and 1,298 US dollars becomes 1,565 US dollars for four times the RAM ($16\\ \\text{KB}$ against $4\\ \\text{KB}$) and roughly four-and-two-thirds times the clock ($4.77\\ \\text{MHz}$ against $1.023\\ \\text{MHz}$). The Macintosh is the usability axis; the iPhone is the portability-and-frugality corner winning at last, thirty-two years after the kit.',
    },
    {
      kind: 'example',
      title: 'Date-order the pocket arc',
      steps: [
        'Take the five shuffled witnesses: the iPhone (announced 9 January 2007), the Altair 8800 (the January 1975 Popular Electronics cover), the Macintosh (1984), the Apple II (on sale 10 June 1977), the IBM PC 5150 (debuted 12 August 1981).',
        'Check the earliest: the Altair cover, January 1975 — the kit starts the arc.',
        'Now, order the ready-built machines: Apple II (10 June 1977), then IBM PC 5150 (12 August 1981).',
        'Check the friendly face and the pivot: Macintosh (1984), then iPhone (9 January 2007).',
        'Hence the engine-pinned order: Altair 8800, Apple II, IBM PC 5150, Macintosh, iPhone.',
      ],
    },

    // ---------- the embedded census ----------
    { kind: 'heading', text: 'The Embedded Census' },
    {
      kind: 'para',
      text: 'Here is the census\u2019s biggest correction of intuition: the world\u2019s computer majority is not general-purpose at all. Small dedicated computers hiding in products outnumber every desktop and laptop many times over, and that embedded world runs on a census of its own. Three nouns are worth defining with care.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Microprocessor',
      text: 'A **microprocessor** is a CPU on a single chip — the part a general-purpose machine builds the rest of itself around, with separate memory and separate input/output parts.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Microcontroller',
      text: 'A **microcontroller** is a single chip carrying a CPU, its memory and its input/output together — a whole small computer in one package, built to run one dedicated job such as timing a wash cycle or a door latch.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'System on a chip',
      text: 'A **system on a chip** — an SoC — is a single chip integrating a whole computer: processor, memory controllers, graphics, radio. A smartphone\u2019s engine is the textbook case, living on the 3–8 W ballpark band.',
    },
    {
      kind: 'para',
      text: 'The three-part distinction is honest and simple: a *microprocessor* is the engine alone; a *microcontroller* is a whole small computer on one chip — cheap, frugal, married forever to one job, never a general-purpose computer; and a *system on a chip* is a whole *general-purpose* computer integrated on one chip — the phone\u2019s way of packing a big machine into a pocket budget.',
    },
    {
      kind: 'para',
      text: 'Two machines make the embedded world concrete. The **Arduino** — born in 2005 in Ivrea, Italy — is the hobbyist\u2019s microcontroller board: small, rugged, inexpensive. The **Raspberry Pi** — its Model B launched on 29 February 2012 at 35 US dollars — is the opposite noun on purpose: a *single-board computer*, a full SoC running a desktop operating system. One is a microcontroller with one job; the other a general-purpose computer on a credit card.',
    },
    {
      kind: 'para',
      text: 'The embedded census scales up as well as down, and the flagship is the modern car: a typical model carries roughly **50–100 electronic control units** — each a small dedicated computer — and premium vehicles climb to about **150**. The engine has its own computer; so do the brakes, the battery, and each door — the ECU census is the cleanest proof that "computer" stopped being a desk object long ago.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        '(i) The **washing machine** — a microcontroller runs the whole cycle: water level, drum speed, the sequence of stages.',
        '(ii) The **microwave oven** — a dedicated computer keeps the clock, times the cook, and guards the door interlock.',
        '(iii) The **TV remote** — a small controller turns key presses into infrared signals on a battery that lasts years.',
        '(iv) The **keyboard** — its own small computer scans the key grid and reports strokes, an mW-class worker on a frugal budget.',
        '(v) Each is one program, one product, one chip — the household census of embedded systems.',
      ],
    },
    {
      kind: 'para',
      text: 'The doorstep beyond the household is the **Internet of Things** — the billions of small connected devices now being counted. Keep that census qualitative: estimates vary widely between counters, so the honest statement is "billions of connected devices, counting methods differ". The dedicated book on this shelf, *Internet of Things*, takes the full census.',
    },
    {
      kind: 'para',
      text: 'Two cross-references close the section. Chapter 4 of this book, **Inside the Box**, opens the desktop\u2019s chassis and names the parts honestly — motherboard, processor, the first memory hierarchy. When the embedded world\u2019s logic needs the gate level, the shelf\u2019s **Digital Logic Design** is the door: a washing machine\u2019s decisions are, at bottom, the same switches Lesson 1.1 promised to explain.',
    },
    {
      kind: 'example',
      title: 'Choose the board: the drum timer and the hobby weather station',
      steps: [
        'Take the first job: timing a washing machine drum — one fixed program, mW-class patience, married to the appliance forever.',
        'Check the census: a dedicated program on a frugal budget — the microcontroller family; an Arduino-class board is the learner\u2019s stand-in.',
        'Now, take the second job: a hobby weather station graphing a week of readings, running a screen and Python.',
        'Check the census: a general-purpose workload — an operating system, files, a display — which needs a system on a chip.',
        'So the verdict: the drum timer takes a microcontroller; the weather station takes a single-board computer built on an SoC — the Raspberry Pi\u2019s home ground.',
      ],
    },

    // ---------- choosing honestly ----------
    { kind: 'heading', text: 'Choosing Honestly' },
    {
      kind: 'para',
      text: 'The census ends in a craft: choosing a family for a job and saying why. The procedure below is the same four axes in the same order every time — the honest power of a census is that anyone can run it and reach the same verdict. Three briefs follow.',
    },
    {
      kind: 'algorithm',
      title: 'The family-choosing procedure',
      lines: [
        { code: 'read the brief: what must the machine DO all day?', note: 'the job first, the machine second' },
        { code: 'ask form factor: carried, desk-side, racked, or hidden inside a product?', note: 'a pocket slab, a tower, a rack shelf and a hidden chip are four different lives' },
        { code: 'ask performance: how much work per second does the job honestly need?', note: 'door-timing needs mW-class patience; weather research needs the top of the census' },
        { code: 'ask power budget: wall power, or a battery for the stated hours?', note: 'if untethered, compute battery life ≈ capacity ÷ draw first' },
        { code: 'ask dedication: one fixed program forever, or whatever the owner loads?', note: 'this axis alone separates the embedded world from the general-purpose world' },
        { code: 'match the four answers to a family and STATE THE DECIDING AXIS', note: 'an honest verdict names its axis — "server, because many users at once" — never just "server"' },
      ],
      note: 'the procedure terminates in four questions; when two families tie, the honest output is "it depends on the axis" — say exactly that.',
    },
    {
      kind: 'example',
      title: 'Choose the family: the airport check-in kiosk',
      steps: [
        'Read the brief: one fixed program — check in, print a boarding pass — running all day in a public place.',
        'Check form factor and power: a bolted enclosure in a concourse, wall power.',
        'Check dedication: one program, forever — dedicated, though usually built from desktop-class parts.',
        'Hence the verdict: a dedicated kiosk — embedded in dedication, desktop-class in parts; the deciding axis is dedication.',
      ],
    },
    {
      kind: 'example',
      title: 'Choose the family: the weather research centre',
      steps: [
        'Read the brief: simulate a season of atmosphere in days, not months — peak speed on a hard problem.',
        'Check performance: the job needs the very top of the performance census; a smaller machine finishes after the storm has passed.',
        'Check power and dedication: wall power on a hall scale (estimates vary, so no figure), a dedicated research installation.',
        'So the verdict: the supercomputer family — weather and climate simulation is its textbook duty; the deciding axis is performance.',
      ],
    },
    {
      kind: 'example',
      title: 'Choose the family: the startup\u2019s web app',
      steps: [
        'Read the brief: serve thousands of users arriving over the network, around the clock.',
        'Check form factor: nobody carries this machine — it lives on a rack shelf in a machine room.',
        'Check performance: per-request work is modest; the load is *many users at once* — concurrency, not peak speed.',
        'Check dedication: the software changes weekly, so the machine must stay general-purpose underneath.',
        'Hence the verdict: the server family — the deciding axis is the role; a games console would fail the brief because it is not built to be racked and served.',
      ],
    },

    // ---------- exam corner + summary ----------
    { kind: 'heading', text: 'Exam Corner' },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'What the examinations actually ask',
      text: 'Banking and SSC computer-awareness papers, school and board papers ask this material in three shapes: **types of computers** classification (match a described machine to a family), generation matching (name a machine, name its band — tubes, transistors, ICs, microprocessors), and embedded-versus-general-purpose distinctions. Every item in this lesson is exam-*style* practice written fresh — not a reproduced past paper. Answer with the census habit: verdict first, deciding axis second, pinned dates where they apply.',
    },
    {
      kind: 'para',
      text: 'From the above discussion, it follows that a hardware census stands on four honest axes — form factor, performance, power budget, dedication — and that every one of the eleven families is a compromise on the triangle those axes define. The growth census — Moore\u2019s observation, revised in 1975 to a doubling about every two years — explains how the bands moved from ENIAC\u2019s tubes to billion-transistor chips in one working lifetime. And the embedded census shows where the majority of the world\u2019s computers actually live: one program at a time, inside products.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        '(i) Four census axes — form factor, performance, power budget, dedication — file any machine honestly; a verdict without its axis is an opinion.',
        '(ii) Eleven families from desktop tower to embedded microcontroller; each is a compromise, none wins every axis.',
        '(iii) Moore\u2019s law is the growth census: $N(t) = N_0 \\cdot 2^{\\Delta t/2}$ — an observation (not a law of nature), revised in 1975; twenty doublings in forty years is a factor of $1{,}048{,}576$.',
        '(iv) The five generations: tubes, transistors, integrated circuits, microprocessors — and a "fifth generation" that is a label with fuzzy edges, born as 1982 project branding.',
        '(v) The personal-computing arc: Altair 8800, Apple II (10 June 1977), IBM PC 5150 (12 August 1981), Macintosh (1984), iPhone (2007) — kit to commodity to pocket.',
        '(vi) The embedded world is the majority: microcontroller for one job, SoC for a pocket computer, roughly 50–100 ECUs in a typical modern car, up to about 150 in premium vehicles.',
        '(vii) Choosing honestly is a four-question procedure whose honest outputs include "it depends on the axis" — the games console\u2019s permanent address.',
      ],
    },

    // ---------- the glossary ----------
    {
      kind: 'terms',
      items: [
        { term: 'Form factor', def: 'The physical shape and size class a machine belongs to is said to be its form factor — from a room-sized mainframe through a desk-side tower to a pocket slab.' },
        { term: 'Performance', def: 'The useful work a machine does per second is said to be its performance — pinned where figures exist, ballpark where they do not.' },
        { term: 'Power budget', def: 'The watts a machine may draw, and the battery mass those watts imply, are said to be its power budget.' },
        { term: 'General-purpose computer', def: 'A computer is said to be general-purpose if it runs whatever programs its owner loads, rather than one fixed program.' },
        { term: 'Dedicated computer', def: 'A computer is said to be dedicated if it runs one fixed program for its whole working life, as a washing machine\u2019s controller does.' },
        { term: 'Server', def: 'A server is a computer built to serve many users over a network at once — files, web pages, shared work — typically racked in a machine room and valued for staying up.' },
        { term: 'Workstation', def: 'A workstation is a high-performance desktop-class machine built for one professional user\u2019s heavy jobs such as design or simulation.' },
        { term: 'Mainframe', def: 'A mainframe is the room-sized batch and transaction specialist that banks, airline reservation systems and national censuses still run, prized for dependable volume rather than peak speed.' },
        { term: 'Supercomputer', def: 'A supercomputer is the top of the performance census — a machine bought for peak speed on hard scientific simulations such as weather, climate and cryptographic research.' },
        { term: 'Embedded system', def: 'A system is said to be embedded when a small computer hides inside a larger product to run that product, unseen by the product\u2019s user.' },
        { term: 'Microcontroller', def: 'A microcontroller is a single chip carrying a CPU, memory and input/output together, built to run one dedicated job.' },
        { term: 'Microprocessor', def: 'A microprocessor is a CPU on a single chip — the part a general-purpose machine builds the rest of itself around.' },
        { term: 'System on a chip', def: 'A system on a chip, or SoC, is a single chip integrating a whole computer — processor, memory controllers, graphics, radio — as a smartphone\u2019s engine does.' },
        { term: "Moore's law", def: 'Moore\u2019s law is Gordon Moore\u2019s 1965 observation, revised in 1975 to transistor counts doubling roughly every two years — an industry observation, not a law of nature.' },
        { term: 'Electronic control unit', def: 'An electronic control unit, or ECU, is one small dedicated computer inside a car; a typical modern car carries roughly 50–100 of them, up to about 150 in premium vehicles.' },
        { term: 'Single-board computer', def: 'A single-board computer is a complete general-purpose computer — SoC and all — built on one small circuit board, such as the Raspberry Pi.' },
        { term: 'Generation', def: 'A generation of computers is a census band named for its switching technology: vacuum tubes, transistors, integrated circuits, then microprocessors.' },
        { term: 'Internet of Things', def: 'The Internet of Things names the billions of small connected devices now being counted — estimates vary between counters, so the census stays qualitative.' },
      ],
    },

    // ---------- the quiz ----------
    {
      kind: 'quiz',
      title: 'Check yourself: the hardware census',
      items: [
        {
          q: 'A bank needs a machine to chew through millions of transaction records overnight, every night, with total dependability. Which family is the honest specialist?',
          options: ['A supercomputer', 'A mainframe', 'An embedded microcontroller', 'A games console'],
          answer: 1,
          explain: 'Option 1 (a supercomputer) is bought for peak speed on hard simulations such as weather and climate — the wrong axis for dependable overnight volume. Option 2, the mainframe, is exactly the room-sized batch and transaction specialist that banks and airline reservation systems still run — correct. Option 3 (an embedded microcontroller) runs one fixed program inside a product such as a door; it cannot face a bank\u2019s transaction census. Option 4 (a games console) sits between families on purpose and is built for a living room, not a machine hall.',
        },
        {
          q: 'Which machine marks the start of the fourth generation — the microprocessor era?',
          options: ['ENIAC, announced 14 February 1946', 'IBM System/360, announced 7 April 1964', 'the Intel 4004, released 15 November 1971', 'the Apple II, on sale 10 June 1977'],
          answer: 2,
          explain: 'Option 1, ENIAC, opens the first generation — 17,468 vacuum tubes in 1946. Option 2, System/360 (7 April 1964), opens the third, integrated-circuit generation. Option 3, the Intel 4004 — released 15 November 1971 with 2,300 transistors on one 4-bit chip at 60 US dollars — is the microprocessor that opens generation four; correct. Option 4, the Apple II, is a personal computer riding *inside* generation four, not the band\u2019s door.',
        },
        {
          q: 'After Gordon Moore\u2019s 1975 revision, the observation said transistor counts double roughly every:',
          options: ['year', 'six months', 'two years', 'ten years'],
          answer: 2,
          explain: 'Option 1 (year) was the original 1965 wording, which Moore himself revised. Option 2 (six months) matches no Moore text — an invented cadence. Option 3, every two years — compound growth of about 41% per year — is the 1975 revision; correct. Option 4 (ten years) would make growth an order of magnitude slower: forty years would stack only four doublings, not twenty.',
        },
        {
          q: 'On which census axis does a smartphone clearly beat a desktop tower?',
          options: ['power budget — frugal watts', 'raw performance', 'form-factor bulk', 'none — the phone loses on every axis'],
          answer: 0,
          explain: 'Option 1, the power budget, is the phone\u2019s home ground: its SoC lives in the 3–8 W ballpark while a desktop CPU draws 65–125 W — correct. Option 2 (raw performance) belongs to the desktop, which can spend watts and cool big parts. Option 3 (form-factor bulk) — if bulk were the prize the tower would win it; the phone\u2019s prize is portability, the other reading of the same axis. Option 4 is false: every family wins somewhere on the triangle — the entire point of a census.',
        },
        {
          q: 'The ECU census of a modern car reads:',
          options: ['one or two ECUs', 'about ten ECUs', 'about a thousand ECUs', 'roughly 50–100 ECUs in a typical car, up to about 150 in premium vehicles'],
          answer: 3,
          explain: 'Option 1 (one or two) is a 1980s census, not today\u2019s. Option 2 (about ten) is an order of magnitude short of the pinned count. Option 3 (about a thousand) is invention — no honest census says that. Option 4 — roughly 50–100 electronic control units in a typical modern car, rising to about 150 in premium vehicles, with engine, brakes, battery and doors each owning one — is the pinned ballpark; correct.',
        },
      ],
    },

    // ---------- the formula cards ----------
    { kind: 'formula', name: 'The Moore headcount', latex: 'N(t) = N_0 \\cdot 2^{\\Delta t / 2}', note: 'the revised (1975) cadence: one doubling every two years; $N_0$ is the starting count and $\\Delta t$ the years elapsed — forty years stack $2^{20}$.' },
    { kind: 'formula', name: 'Battery life from the power budget', latex: '\\text{life} \\approx \\frac{\\text{capacity (Wh)}}{\\text{draw (W)}}', note: 'read it either way: $5\\ \\text{W} \\times 8\\ \\text{h} = 40\\ \\text{Wh}$ of capacity needed, and $40\\ \\text{Wh} \\div 8\\ \\text{W} = 5\\ \\text{h}$ of life delivered.' },
    { kind: 'formula', name: 'The growth factor after k doublings', latex: '2^{k}, \\quad k = \\frac{\\Delta t}{2}', note: '$2^{10} = 1{,}024$ and $2^{20} = 1{,}048{,}576$ — twenty doublings is just above a million-fold.' },
    { kind: 'formula', name: 'The census axes recap', latex: '\\text{family} = (\\text{form factor},\\ \\text{performance},\\ \\text{power budget},\\ \\text{dedication})', note: 'four honest questions, one verdict: file any machine by all four axes and say WHY on each.' },
    { kind: 'formula', name: 'The doubling cadence as a growth rate', latex: '2^{1/2} - 1 \\approx 0.4142 \\approx 41\\%\\ \\text{per year}', note: 'one doubling every two years is compound growth of about 41% a year — Moore\u2019s observation, not a law of nature.' },

    // ---------- the exercises ----------
    {
      kind: 'exercises',
      title: 'Exercises 1.2',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'A machine lives under a village office reception desk: a separate tower and monitor, wall power, keyboard and mouse; it runs the notices-board software in the morning and a browser all afternoon. Classify it and name the family.',
              solution: [
                'Take the four axes: form factor, performance, power budget, dedication.',
                'Check form factor and power: a separate tower and monitor under a desk — stationary, wall-powered, free to draw tens of watts.',
                'Check dedication: different programs through the day — general-purpose.',
                'Hence the verdict: a desktop tower, all four axes agreeing.',
              ],
              answer: 'the desktop tower family — stationary, wall-powered, general-purpose.',
            },
            {
              q: 'A chip inside a smart television\u2019s remote receiver runs one program its whole life: it decodes infrared pulses and tells the television what you pressed. Classify it and name the family.',
              solution: [
                'Take the axes: a chip hidden inside a product, modest work, tiny power.',
                'Check dedication — the sharpest axis: one fixed program, forever, on thousandths of a watt up to about a watt.',
                'So the verdict: an embedded system built around a microcontroller.',
              ],
              answer: 'an embedded system — a microcontroller running one dedicated program inside the product.',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Exam-style census drill: place each machine on the five-generation ladder and name the band\u2019s technology — ENIAC (announced 14 February 1946), UNIVAC I (accepted 31 March 1951), IBM System/360 (announced 7 April 1964), the Intel 4004 (released 15 November 1971), and the Altair 8800 kit (the January 1975 Popular Electronics cover).',
              solution: [
                'Split the ladder: tubes (1946–1956), transistors (about 1956–1964), integrated circuits (1964–1971), microprocessors (1971 to the present).',
                'Check ENIAC and UNIVAC I: tubes and the first commercial computer — both generation 1.',
                'Check System/360: announced 7 April 1964, built from integrated circuits — generation 3, exactly on its door.',
                'Check the 4004: released 15 November 1971, a whole CPU on one chip — generation 4, the door opener.',
                'Check the Altair: a 1974–1975 kit personal computer — inside generation 4, riding its personal-computing arc.',
              ],
              answer: 'ENIAC and UNIVAC I → 1st (tubes); System/360 → 3rd (ICs, the door); the 4004 → 4th (microprocessors, the door); the Altair → 4th (the personal-computing arc).',
              figures: [
                {
                  caption: 'The five-generation ladder strip for this drill: ENIAC (1946) and UNIVAC I (1951) sit in the vacuum-tube first band, System/360 (1964) sits exactly on the integrated-circuit third door, the 4004 (1971) sits exactly on the microprocessor fourth door, and the Altair (1975) rides inside it — x positions computed linearly from the years.',
                  svg: generationsStripSvg(),
                },
              ],
            },
            {
              q: "Moore\u2019s observation, revised in 1975, says transistor counts double roughly every two years. Count the doublings between the Intel 4004\u2019s release (15 November 1971) and the early-2010s (2011), and give the growth factor.",
              solution: [
                'Take the run length: $2011 - 1971 = 40$ years.',
                'Split by the cadence: $40 \\div 2 = 20$ doublings.',
                'Now, stack the factor: $2^{20}$ — literally 1,048,576, just above a million.',
                'So the growth factor is roughly $10^6$, since $\\log_{10} 2^{20} \\approx 6.02$.',
              ],
              answer: '20 doublings; growth factor $2^{20} = 1{,}048{,}576$ — literally 1,048,576, roughly a factor of $10^6$.',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'A friend claims "a smartphone is just a pocket mainframe." Refute the claim with the four census axes — one honest axis at a time.',
              solution: [
                'Split the claim into the four axes and test each.',
                'Check form factor and performance: a mainframe fills a room and runs enormous transaction volume; a phone is a pocket slab built for one person\u2019s day.',
                'Check power budget: a mainframe draws wall power on a hall scale (estimates vary), while a phone SoC lives on the 3–8 W ballpark band.',
                'Check dedication: the one axis the friend keeps — both are general-purpose.',
                'Hence three of four axes separate them: pocket-frugal-general against room-walled-volume-general.',
              ],
              answer: 'not a pocket mainframe — the two share only the dedication axis; form factor, performance and power budget all differ.',
            },
            {
              q: 'A premium car carries about 120 electronic control units, each drawing roughly 0.5 W. Estimate the power spent on control alone, and set it against the honest ballpark band of a desktop CPU.',
              solution: [
                'Take the census: about 120 ECUs at roughly 0.5 W each — both numbers ballpark inputs.',
                'Multiply: $120 \\times 0.5 = 60$ W on control alone.',
                'Check the scale: 60 W sits just under the desktop CPU band of 65–125 W — the same order of magnitude.',
                'So label the estimate honestly: a ballpark, and the comparison an order-of-magnitude remark, not a race.',
              ],
              answer: 'about 60 W on control alone (ballpark: $120 \\times 0.5$ W) — the same order as a desktop CPU\u2019s 65–125 W band.',
            },
            {
              q: 'A startup proposes running its web application on a rack of games consoles. Using the census axes, give an honest verdict on where a console sits and whether the brief is served.',
              solution: [
                'Take the axes for the console: set-top form factor under a television; desktop-class performance and power.',
                'Check dedication — the interesting axis: sold locked to games and a curated store, yet built from general-purpose parts.',
                'Now, take the brief: many users at once, racking, servicing, around-the-clock duty — the server family\u2019s shape, and consoles are not built for it.',
                'So the honest verdict: hardware-wise a console files near the desktop family, but the job belongs to the server family — it depends on the axis, and the brief is not served.',
              ],
              answer: 'it depends on the axis: hardware-wise a desktop-class machine, but the web-app duty belongs to the server family — consoles would not serve the brief.',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Exam-style: state two census-axis differences between a supercomputer and a mainframe, naming a typical customer of each.',
              solution: [
                'Split the roles: a supercomputer is bought for peak speed on hard simulations (weather, climate); a mainframe for dependable enormous volume (banks, airline reservation systems).',
                'Check performance: the supercomputer tops the performance census on single hard problems; the mainframe trades peak speed for throughput that never stops.',
                'Check duty: a research hall against a machine room with engineers on call — simulation speed against transaction duty.',
              ],
              answer: 'supercomputer = peak performance on research simulations (weather and climate centres); mainframe = dependable high-volume transactions (banks, airline reservation systems).',
            },
            {
              q: 'Exam-style: give three census-axis differences between an embedded microcontroller and a general-purpose desktop.',
              solution: [
                'Check dedication: the microcontroller runs one fixed program its whole life; the desktop runs whatever the owner loads.',
                'Check power budget: the microcontroller lives from thousandths of a watt (mW) up to about 1 W; the desktop CPU\u2019s honest ballpark is 65–125 W.',
                'Check form factor and integration: the microcontroller is a single chip — CPU, memory, input/output together — hidden inside a product; the desktop is a visible tower you set up and open.',
                'Hence the census: dedicated against general, mW-class against tens of watts, hidden against visible.',
              ],
              answer: 'dedication (one fixed program against any program), power budget (mW–1 W against 65–125 W), form factor (a hidden single chip against a visible tower).',
            },
            {
              q: 'Using the revised Moore cadence (one doubling every two years), compute how many transistors a chip carries forty years after the Intel 4004\u2019s 2,300, and check the answer against the early-2010s chips it matches.',
              solution: [
                'Take the run: $1971 \\to 2011$ is 40 years.',
                'Split it: $40 \\div 2 = 20$ doublings.',
                'Stack the factor: $2^{20}$, literally 1,048,576.',
                'Now, apply it: $2{,}300 \\times 1{,}048{,}576$ — the engine-computed product is 2,411,724,800.',
                'Round honestly: 2,411,724,800 ≈ 2.4 billion transistors, and early-2010s chips indeed carried billions — the arithmetic lands on the era it claims.',
              ],
              answer: '$2{,}300 \\times 2^{20} = 2{,}411{,}724{,}800$ — literally 2,411,724,800, about 2.4 billion transistors, matching the early-2010s chips.',
              figures: [
                {
                  caption: 'The Moore staircase for the forty-year run 1971 to 2011: doubling bars of $2^k$ at even $k$, climbing to $2^{20} = 1{,}048{,}576$ — the factor that lifts the 4004\u2019s 2,300 transistors to 2,411,724,800 ≈ 2.4 billion; the bars step evenly because the height scale is logarithmic.',
                  svg: mooreStaircaseSvg(),
                },
              ],
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'A phone draws an average of 5 W and must run for 8 hours. What capacity must its battery carry? Then state how long the same pack lasts if the draw rises to 8 W.',
              solution: [
                'Take the power budget: capacity equals draw times time — $5\\ \\text{W} \\times 8\\ \\text{h} = 40\\ \\text{Wh}$.',
                'Now, run the battery-life formula the other way: life ≈ capacity ÷ draw.',
                'Check the heavier draw: $40\\ \\text{Wh} \\div 8\\ \\text{W} = 5\\ \\text{h}$.',
                'So the same 40 Wh pack buys 8 hours at 5 W but only 5 at 8 W — a lighter draw buys a longer day.',
              ],
              answer: 'the battery must carry 40 Wh; at an 8 W draw the same pack lasts 5 h.',
              figures: [
                {
                  caption: 'The battery strip for the 40 Wh pack: at a 5 W draw the pack runs the full 8 h ($40 = 5 \\times 8$); at an 8 W draw the same pack empties in 5 h — battery life ≈ capacity ÷ draw.',
                  svg: batteryStripSvg(),
                },
              ],
            },
            {
              q: 'An engineering team wants a microcontroller-based sensor node to run a full 8-hour shift on a 40 Wh cell. What average draw does that allow, and how does it compare with the honest microcontroller ballpark?',
              solution: [
                'Take the budget: allowed draw equals capacity over time.',
                'Split it: $40\\ \\text{Wh} \\div 8\\ \\text{h} = 5\\ \\text{W}$.',
                'Check the ballpark: the honest microcontroller band runs from thousandths of a watt (mW) up to about 1 W.',
                'So 5 W sits far above the band — the cell is oversized for a microcontroller node; an MCU drawing inside its ballpark would run vastly longer than the shift (kept qualitative).',
              ],
              answer: '5 W average draw — far above the mW–1 W microcontroller ballpark, so the 40 Wh cell is oversized for the node.',
            },
            {
              q: 'A tablet is designed to draw 8 W and must deliver 5 hours of use. What pack capacity does the design need, and what life would the same pack give at a 5 W draw?',
              solution: [
                'Take the requirement: capacity equals draw times time.',
                'Multiply: $8\\ \\text{W} \\times 5\\ \\text{h} = 40\\ \\text{Wh}$.',
                'Now, re-read the same pack at the gentler draw: life ≈ capacity ÷ draw.',
                'Check: $40\\ \\text{Wh} \\div 5\\ \\text{W} = 8\\ \\text{h}$ — hence the design needs a 40 Wh pack, running 8 h at the gentler draw.',
              ],
              answer: 'a 40 Wh pack; at a 5 W draw the same pack runs 8 h.',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Essay: justify the four census axes as a taxonomy of hardware, and argue where a games console sits among the families. End with an honest "it depends on the axis" verdict.',
              solution: [
                'Split the taxonomy question: what must a census measure so any machine files honestly and reproducibly?',
                'Check form factor: size and carriage decide whether a machine is a pocket slab, a desk tower, a rack shelf or a hidden chip — the axis a hand can verify.',
                'Check performance: work per second separates a door-timer from a weather simulator, and buyers pay per axis point.',
                'Check power budget: watts available decide battery life and battery mass — the axis a whole phone design bends around.',
                'Check dedication: one fixed program against any program — the axis the washing machine and the laptop never cross.',
                'Now, the console: a set-top form factor, desktop-class performance and power, and a half-dedicated soul — sold for games, built from general-purpose parts.',
                'Hence the verdict: on hardware axes the console files near the desktop family; on dedication it sits between; the census files it only with a stated axis — "it depends on the axis" is the taxonomist\u2019s honest answer, not a dodge.',
              ],
              answer: 'the four axes each answer a different verifiable question; a console files as desktop-class hardware with a curated, semi-dedicated role — it depends on the axis.',
            },
            {
              q: 'Essay: argue why "the fifth generation" is a label with fuzzy edges rather than a crisp hardware switch, as the 1946, 1964 and 1971 switches were.',
              solution: [
                'Split the earlier switches: tubes (1946), transistors (about 1956), integrated circuits (1964) and microprocessors (1971) each name a physical switching technology that measurably changed the machines.',
                'Check the label\u2019s birth: the phrase began as the branding of the 1982 Japanese Fifth Generation Computer Systems project — a research programme\u2019s name, not a circuit change.',
                'Check today\u2019s use: syllabi attach "AI era" and ULSI to the fifth slot, but no single new switching device marks it, and the machines of the 1990s and the 2020s are all still microprocessor machines underneath.',
                'So the honest census: generations 1–4 are hardware switches; the fifth is a label with fuzzy edges — useful in conversation, unusable as a machine boundary.',
              ],
              answer: 'generations 1–4 are crisp hardware switches (tubes to transistors to ICs to microprocessors); the "fifth" is a 1982-born label with fuzzy edges, not a machine switch.',
            },
          ],
        },
      ],
    },
  ],
}

// ------------------------------------------------------------------
// lesson 1.3 — authored by the CS RUN 2 swarm (the cf13 agent), integrated verbatim
// ------------------------------------------------------------------

function softwareFamilyTreeSvg(): string {
  // the two great families as one tree: SOFTWARE at the root, system
  // software (operating system, utility programs, device drivers) stacked
  // under the left branch, application software (word processor, browser,
  // game, media editor) under the right — every box on computed centers.
  const W = 720, H = 420
  const ROOT_CX = 360, FAM_L_CX = 200, FAM_R_CX = 520
  const ROOT_Y = 24, ROOT_H = 40
  const FAM_Y = 96, FAM_H = 44
  const LEAF_W = 250, LEAF_H = 40
  const sysLeafYs = [210, 274, 338]
  const appLeafYs = [176, 228, 280, 332]
  const sysLeaves = [
    { name: 'operating system', desc: 'the manager of the whole machine' },
    { name: 'utility programs', desc: 'the maintenance crew' },
    { name: 'device drivers', desc: 'one translator per device family' },
  ]
  const appLeaves = [
    { name: 'word processor', desc: 'writes letters and reports' },
    { name: 'browser', desc: 'reads the web' },
    { name: 'game', desc: 'plays' },
    { name: 'media editor', desc: 'edits photo, audio, video' },
  ]
  const leaf = (cx: number, cy: number, name: string, desc: string, stroke: string, ink: string, mid: string, fill: string) => {
    const x = cx - LEAF_W / 2, y = cy - LEAF_H / 2
    return `<rect x="${x}" y="${y}" width="${LEAF_W}" height="${LEAF_H}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>` +
      `<text x="${cx}" y="${cy - 3}" font-size="11.5" font-weight="700" fill="${ink}" text-anchor="middle">${name}</text>` +
      `<text x="${cx}" y="${cy + 13}" font-size="9.5" font-weight="700" fill="${mid}" text-anchor="middle">${desc}</text>`
  }
  let body = ''
  // the root box + its split connector
  body += `<rect x="${ROOT_CX - 110}" y="${ROOT_Y}" width="220" height="${ROOT_H}" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>`
  body += `<text x="${ROOT_CX}" y="${ROOT_Y + 18}" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">SOFTWARE</text>`
  body += `<text x="${ROOT_CX}" y="${ROOT_Y + 33}" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="middle">the invisible half of the machine</text>`
  body += `<path d="M ${ROOT_CX} ${ROOT_Y + ROOT_H} V 80" fill="none" stroke="#d97706" stroke-width="1.7"/>`
  body += `<path d="M ${FAM_L_CX} 80 H ${FAM_R_CX}" fill="none" stroke="#d97706" stroke-width="1.7"/>`
  for (const fx of [FAM_L_CX, FAM_R_CX]) {
    body += `<path d="M ${fx} 80 V ${FAM_Y - 6}" fill="none" stroke="#d97706" stroke-width="1.7"/>`
    body += `<path d="M ${fx} ${FAM_Y - 6} l -4.5 7 h 9 z" fill="#ea580c"/>`
  }
  // the two family boxes
  const fam = (cx: number, name: string, desc: string, stroke: string, ink: string, mid: string, fill: string) => {
    const x = cx - 130
    return `<rect x="${x}" y="${FAM_Y}" width="260" height="${FAM_H}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="2.2"/>` +
      `<text x="${cx}" y="${FAM_Y + 19}" font-size="12" font-weight="800" fill="${ink}" text-anchor="middle">${name}</text>` +
      `<text x="${cx}" y="${FAM_Y + 35}" font-size="9.5" font-weight="700" fill="${mid}" text-anchor="middle">${desc}</text>`
  }
  body += fam(FAM_L_CX, 'SYSTEM SOFTWARE', 'manages the machine itself', '#16a34a', '#166534', '#65a30d', '#fef3c7')
  body += fam(FAM_R_CX, 'APPLICATION SOFTWARE', 'does the user’s work', '#0d9488', '#0f766e', '#0f766e', '#ffedd5')
  // the left spine + system leaves
  body += `<path d="M ${FAM_L_CX} ${FAM_Y + FAM_H} V ${sysLeafYs[0] - LEAF_H / 2}" fill="none" stroke="#d97706" stroke-width="1.7"/>`
  for (let k = 1; k < sysLeafYs.length; k++) {
    body += `<path d="M ${FAM_L_CX} ${sysLeafYs[k - 1] + LEAF_H / 2} V ${sysLeafYs[k] - LEAF_H / 2}" fill="none" stroke="#d97706" stroke-width="1.7"/>`
  }
  sysLeaves.forEach((l, i) => { body += leaf(FAM_L_CX, sysLeafYs[i], l.name, l.desc, '#16a34a', '#166534', '#65a30d', '#fef3c7') })
  // the right spine + application leaves
  body += `<path d="M ${FAM_R_CX} ${FAM_Y + FAM_H} V ${appLeafYs[0] - LEAF_H / 2}" fill="none" stroke="#d97706" stroke-width="1.7"/>`
  for (let k = 1; k < appLeafYs.length; k++) {
    body += `<path d="M ${FAM_R_CX} ${appLeafYs[k - 1] + LEAF_H / 2} V ${appLeafYs[k] - LEAF_H / 2}" fill="none" stroke="#d97706" stroke-width="1.7"/>`
  }
  appLeaves.forEach((l, i) => { body += leaf(FAM_R_CX, appLeafYs[i], l.name, l.desc, '#0d9488', '#0f766e', '#0f766e', '#ffedd5') })
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The two great families of software drawn as one tree. At the root sits software, the invisible half of the machine. The left branch is system software, which manages the machine itself: the operating system as the manager of the whole machine, utility programs as the maintenance crew, and device drivers as one translator per device family. The right branch is application software, which does the user's work: the word processor for writing, the browser for reading the web, the game for play, and the media editor for photo, audio and video work. A footer states that every program you will ever meet sits somewhere on this tree, and the only question is which half.">
  <text x="${W / 2}" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the two great families: every program sits somewhere on this tree</text>
  ${body}
  <line x1="24" y1="378" x2="696" y2="378" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="${W / 2}" y="398" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">every program you will ever meet sits somewhere on this tree — the only question is which half</text>
</svg>`
}

function osAsManagerSvg(): string {
  // the operating system as manager: four application boxes above (asking
  // downward through the one manager box), five hardware boxes below
  // (commanded only by the manager) — every arrow on computed centers.
  const W = 720, H = 445
  const APP_CXS = [105, 275, 445, 615], OS_CX = 360, HW_CXS = [120, 240, 360, 480, 600]
  const APP_Y = 64, BOX_H = 38
  const OS_Y = 178, OS_W = 560, OS_H = 62
  const HW_Y = 344
  const APP_W = 130, HW_W = 96
  const apps = ['word processor', 'browser', 'game', 'media editor']
  const hws = ['CPU', 'RAM', 'disk', 'screen', 'printer']
  const downArrow = (x: number, y1: number, y2: number, color: string) =>
    `<path d="M ${x} ${y1} V ${y2 - 8}" fill="none" stroke="${color}" stroke-width="1.8"/>` +
    `<path d="M ${x} ${y2} l -4.5 -8 h 9 z" fill="${color}"/>`
  let body = ''
  body += `<text x="${W / 2}" y="52" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the application layer — the user’s work, asking downward</text>`
  apps.forEach((name, i) => {
    const cx = APP_CXS[i]
    body += `<rect x="${cx - APP_W / 2}" y="${APP_Y}" width="${APP_W}" height="${BOX_H}" rx="9" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>`
    body += `<text x="${cx}" y="${APP_Y + 24}" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">${name}</text>`
  })
  // every app asks the manager — never the hardware directly
  for (const cx of APP_CXS) body += downArrow(cx, APP_Y + BOX_H, OS_Y, '#ea580c')
  body += `<rect x="${OS_CX - OS_W / 2}" y="${OS_Y}" width="${OS_W}" height="${OS_H}" rx="12" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/>`
  body += `<text x="${OS_CX}" y="${OS_Y + 24}" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">THE OPERATING SYSTEM</text>`
  body += `<text x="${OS_CX}" y="${OS_Y + 44}" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="middle">processes · memory · files · devices · the interface</text>`
  // the manager alone commands the hardware
  for (const cx of HW_CXS) body += downArrow(cx, OS_Y + OS_H, HW_Y, '#ea580c')
  body += `<text x="${W / 2}" y="400" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the hardware layer — the machine itself, lesson 1.1’s census</text>`
  hws.forEach((name, i) => {
    const cx = HW_CXS[i]
    body += `<rect x="${cx - HW_W / 2}" y="${HW_Y}" width="${HW_W}" height="${BOX_H}" rx="9" fill="#ffedd5" stroke="#0d9488" stroke-width="1.6"/>`
    body += `<text x="${cx}" y="${HW_Y + 24}" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">${name}</text>`
  })
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The operating system as the manager. Above, four application programs — word processor, browser, game and media editor — form the application layer that does the user's work. In the middle, one wide box is the operating system, managing processes, memory, files, devices and the interface. Below, five hardware boxes — CPU, RAM, disk, screen and printer — form the hardware layer. Orange arrows run from every application down into the operating system, and from the operating system down to every hardware box: no program touches the hardware directly; every arrow passes through the one manager.">
  <text x="${W / 2}" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the operating system: one manager between the workers and the machine</text>
  ${body}
  <line x1="24" y1="424" x2="696" y2="424" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="${W / 2}" y="438" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">the manager owns the only honest path to the hardware — every program goes through it</text>
</svg>`
}

function bootSequenceStripSvg(): string {
  // the cold-start ritual as one strip: six stage boxes on computed centers
  // (power on, the firmware's POST, the bootloader, the kernel, drivers +
  // services, the login screen), each with its owner above and a one-line
  // note below — the hops joined by connector arrows.
  const W = 720, H = 290
  const BOOT_CXS = [80, 192, 304, 416, 528, 640]
  const BOX_W = 96, BOX_Y = 96, BOX_H = 56
  const stages = [
    { name: 'power on', sub: 'the machine wakes', owner: 'you', note: 'button pressed' },
    { name: 'POST', sub: 'firmware checks', owner: 'firmware', note: 'RAM + ports checked' },
    { name: 'bootloader', sub: 'found + run', owner: 'firmware', note: 'loader found on disk' },
    { name: 'kernel', sub: 'loaded into RAM', owner: 'the loader', note: 'kernel into RAM' },
    { name: 'drivers + services', sub: 'brought up', owner: 'the kernel', note: 'machine ready' },
    { name: 'login screen', sub: 'you arrive', owner: 'you', note: 'you may log in' },
  ]
  let body = ''
  stages.forEach((s, i) => {
    const cx = BOOT_CXS[i]
    body += `<text x="${cx}" y="56" font-size="9" font-weight="700" fill="#65a30d" text-anchor="middle">owner: ${s.owner}</text>`
    body += `<circle cx="${cx}" cy="78" r="9" fill="#16a34a" stroke="#166534" stroke-width="1.2"/>`
    body += `<text x="${cx}" y="81.5" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">${i + 1}</text>`
    body += `<rect x="${cx - BOX_W / 2}" y="${BOX_Y}" width="${BOX_W}" height="${BOX_H}" rx="9" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>`
    body += `<text x="${cx}" y="${BOX_Y + 24}" font-size="10" font-weight="800" fill="#166534" text-anchor="middle">${s.name}</text>`
    body += `<text x="${cx}" y="${BOX_Y + 40}" font-size="9" font-weight="700" fill="#65a30d" text-anchor="middle">${s.sub}</text>`
    body += `<text x="${cx}" y="${BOX_Y + BOX_H + 22}" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle">${s.note}</text>`
    if (i > 0) {
      const px = BOOT_CXS[i - 1], gap = cx - px
      body += `<path d="M ${px + BOX_W / 2 - 6} 78 H ${cx - BOX_W / 2 + 2}" fill="none" stroke="#d97706" stroke-width="1.7"/>`
      body += `<path d="M ${cx - BOX_W / 2 + 7} 78 l -7 -4.5 v 9 z" fill="#ea580c"/>`
      void gap
    }
  })
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The boot sequence as one strip of six stages. Stage one, power on, owned by you: the machine wakes when the button is pressed. Stage two, POST, owned by the firmware: the motherboard's own program checks RAM and ports before any disk is trusted. Stage three, the bootloader, still owned by the firmware: the loader is found on disk and run — the first disk program. Stage four, the kernel, owned by the loader: the kernel, the operating system's core, is carried into RAM. Stage five, drivers and services, owned by the kernel: the device drivers and background services are brought up and the machine is ready. Stage six, the login screen, owned by you again: the manager is fully up and asks who you are. A footer states that the firmware owns the first hops because it must run before any disk exists, and that each hop hands the machine to the next owner: firmware, then loader, then kernel, then you.">
  <text x="${W / 2}" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the boot sequence: from the button to the login screen, one owner at a time</text>
  ${body}
  <line x1="24" y1="196" x2="696" y2="196" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="${W / 2}" y="222" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the firmware owns the first two hops — it must run before any disk exists, so it lives on the motherboard</text>
  <text x="${W / 2}" y="246" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">each hop hands the machine to the next owner: firmware → loader → kernel → you</text>
  <text x="${W / 2}" y="272" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">the kernel is the operating system’s core — from its hop onwards, the OS manages everything</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* solution figures (v9.0) — compact, computed geometry, one short      */
/* accurate caption about THIS solution                                */
/* ------------------------------------------------------------------ */

function solutionFamilyTreeSvg(): string {
  // the classification answer for the L1 item: two panels, system software
  // (disk cleanup tool, touchpad driver) vs application software (word
  // processor, browser) — the honest test printed in the footer.
  const W = 720, H = 260
  const PANEL_W = 340, PANEL_Y = 56, PANEL_H = 152
  const LX = 16, RX = 364
  const left = ['disk cleanup tool — a utility', 'touchpad driver — a translator']
  const right = ['word processor', 'browser']
  const rows = (x: number, items: string[], ink: string) => {
    let s = ''
    items.forEach((t, i) => {
      const y = PANEL_Y + 44 + i * 26
      s += `<circle cx="${x + 28}" cy="${y - 4}" r="8" fill="#16a34a" stroke="#166534" stroke-width="1.2"/>`
      s += `<path d="M ${x + 24.5} ${y - 4} l 2.5 3 l 5 -6" fill="none" stroke="#ffffff" stroke-width="1.8"/>`
      s += `<text x="${x + 46}" y="${y}" font-size="10.5" font-weight="700" fill="${ink}">${t}</text>`
    })
    return s
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The classification answer drawn as two panels. The left panel is system software and holds the disk cleanup tool, a utility, and the touchpad driver, a translator. The right panel is application software and holds the word processor and the browser, which serve the user's work. The footer states the honest test: does the program serve the user's work, or manage the machine itself?">
  <text x="${W / 2}" y="22" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the two families for this classification: two panels, one honest test</text>
  <rect x="${LX}" y="${PANEL_Y}" width="${PANEL_W}" height="${PANEL_H}" rx="12" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>
  <text x="${LX + PANEL_W / 2}" y="${PANEL_Y + 24}" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">SYSTEM SOFTWARE</text>
  <text x="${LX + PANEL_W / 2}" y="${PANEL_Y + 38}" font-size="9" font-weight="700" fill="#65a30d" text-anchor="middle">manages the machine itself</text>
  ${rows(LX, left, '#166534')}
  <rect x="${RX}" y="${PANEL_Y}" width="${PANEL_W}" height="${PANEL_H}" rx="12" fill="#ffedd5" stroke="#0d9488" stroke-width="2.2"/>
  <text x="${RX + PANEL_W / 2}" y="${PANEL_Y + 24}" font-size="11.5" font-weight="800" fill="#0f766e" text-anchor="middle">APPLICATION SOFTWARE</text>
  <text x="${RX + PANEL_W / 2}" y="${PANEL_Y + 38}" font-size="9" font-weight="700" fill="#0f766e" text-anchor="middle">does the user’s work</text>
  ${rows(RX, right, '#0f766e')}
  <line x1="24" y1="230" x2="696" y2="230" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="${W / 2}" y="248" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">the test: does it serve the user’s work (right panel) or manage the machine itself (left panel)?</text>
</svg>`
}

function solutionBootStripSvg(): string {
  // the honest boot order for the L3 item: four hops on computed centers —
  // firmware POST before any disk is read, the bootloader as the first disk
  // program, the kernel, then the login screen — with the why under each.
  const W = 720, H = 166
  const CXS = [90, 270, 450, 630]
  const BOX_W = 150, BOX_Y = 44, BOX_H = 48
  const stages = [
    { name: 'firmware POST', sub: 'hardware checked', why: 'before any disk is read' },
    { name: 'bootloader', sub: 'the loader runs', why: 'the first disk program' },
    { name: 'kernel', sub: 'the OS core loads', why: 'the manager takes over' },
    { name: 'login screen', sub: 'you arrive', why: 'the user session starts' },
  ]
  let body = ''
  stages.forEach((s, i) => {
    const cx = CXS[i]
    body += `<rect x="${cx - BOX_W / 2}" y="${BOX_Y}" width="${BOX_W}" height="${BOX_H}" rx="9" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
    body += `<text x="${cx}" y="${BOX_Y + 20}" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">${s.name}</text>`
    body += `<text x="${cx}" y="${BOX_Y + 36}" font-size="9" font-weight="700" fill="#65a30d" text-anchor="middle">${s.sub}</text>`
    body += `<text x="${cx}" y="${BOX_Y + BOX_H + 24}" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle">${s.why}</text>`
    if (i > 0) {
      const px = CXS[i - 1]
      body += `<path d="M ${px + BOX_W / 2 - 4} ${BOX_Y + BOX_H / 2} H ${cx - BOX_W / 2 + 2}" fill="none" stroke="#d97706" stroke-width="1.8"/>`
      body += `<path d="M ${cx - BOX_W / 2 + 8} ${BOX_Y + BOX_H / 2} l -8 -4.5 v 9 z" fill="#ea580c"/>`
    }
  })
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The honest boot order as a four-hop strip. Hop one, firmware POST: the hardware is checked before any disk is read. Hop two, the bootloader: the loader runs — the first disk program. Hop three, the kernel: the operating system's core loads and the manager takes over. Hop four, the login screen: you arrive and the user session starts. A footer states that each hop must finish before the next can begin — no kernel without a loader, and no login without a kernel.">
  <text x="${W / 2}" y="20" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the honest boot order: four hops, each the loader of the next</text>
  ${body}
  <line x1="24" y1="132" x2="696" y2="132" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="${W / 2}" y="150" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">each hop must finish before the next can begin — no kernel without a loader, no login without a kernel</text>
</svg>`
}

function driverTranslatorSvg(): string {
  // the translation chain for the printer item: the word processor's general
  // print command passes to the driver box, which renders it into the
  // printer's own dialect — the update repaired the middle box.
  const W = 720, H = 252
  const PROG_X = 40, PROG_Y = 84, PROG_W = 170, PROG_H = 64
  const DRV_X = 300, DRV_W = 150, DRV_H = 56
  const HW_X = 560
  let body = ''
  body += `<rect x="${PROG_X}" y="${PROG_Y}" width="${PROG_W}" height="${PROG_H}" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>`
  body += `<text x="${PROG_X + PROG_W / 2}" y="${PROG_Y + 26}" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">the word processor</text>`
  body += `<text x="${PROG_X + PROG_W / 2}" y="${PROG_Y + 44}" font-size="9" font-weight="700" fill="#65a30d" text-anchor="middle">one set of general print commands</text>`
  body += `<rect x="${DRV_X}" y="56" width="${DRV_W}" height="${DRV_H}" rx="10" fill="#ffedd5" stroke="#0d9488" stroke-width="2"/>`
  body += `<text x="${DRV_X + DRV_W / 2}" y="80" font-size="11" font-weight="800" fill="#0f766e" text-anchor="middle">the printer driver</text>`
  body += `<text x="${DRV_X + DRV_W / 2}" y="96" font-size="9" font-weight="700" fill="#0f766e" text-anchor="middle">translates — updated here</text>`
  body += `<rect x="${HW_X}" y="56" width="${DRV_W}" height="${DRV_H}" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>`
  body += `<text x="${HW_X + DRV_W / 2}" y="80" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">the printer</text>`
  body += `<text x="${HW_X + DRV_W / 2}" y="96" font-size="9" font-weight="700" fill="#65a30d" text-anchor="middle">its own dialect</text>`
  // the elbow from the program to the driver, then the arrow driver → printer
  body += `<path d="M ${PROG_X + PROG_W} 116 H 255 V 84 H ${DRV_X - 8}" fill="none" stroke="#ea580c" stroke-width="1.8"/>`
  body += `<path d="M ${DRV_X} 84 l -8 -4.5 v 9 z" fill="#ea580c"/>`
  body += `<text x="258" y="46" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="middle">general commands, one language</text>`
  body += `<path d="M ${DRV_X + DRV_W} 84 H ${HW_X - 10}" fill="none" stroke="#d97706" stroke-width="1.8"/>`
  body += `<path d="M ${HW_X} 84 l -8 -4.5 v 9 z" fill="#ea580c"/>`
  body += `<text x="${(DRV_X + DRV_W + HW_X) / 2}" y="74" font-size="9.5" font-weight="700" fill="#d97706" text-anchor="middle">translated into the dialect</text>`
  // the failed old path, shown dashed below: the mistranslation before the update
  body += `<path d="M ${DRV_X + DRV_W} 128 H ${HW_X - 10}" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="5 4"/>`
  body += `<path d="M ${HW_X} 128 l -8 -4.5 v 9 z" fill="#dc2626"/>`
  body += `<text x="${(DRV_X + DRV_W + HW_X) / 2}" y="148" font-size="9" font-weight="700" fill="#dc2626" text-anchor="middle">before the update: the wrong dialect — unreadable</text>`
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The driver as translator in the printer story. On the left, the word processor holds one set of general print commands. In the middle, the printer driver translates — and this is the box the update repaired. On the right, the printer speaks its own dialect. A solid arrow carries general commands from the program to the driver, and a second arrow carries the translated commands into the printer's dialect. A dashed red arrow below shows the state before the update: the driver spoke the wrong dialect and the printer could not read the commands.">
  <text x="${W / 2}" y="22" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the driver as translator: the update repaired the middle box</text>
  ${body}
  <line x1="24" y1="228" x2="696" y2="228" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="${W / 2}" y="246" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">the program never changed; the printer never changed — only the translation between them did</text>
</svg>`
}

function libraryWallSvg(): string {
  // the library wall for the L4 item: three blocks on computed centers —
  // 40,000,000 lines ÷ 50 = 800,000 pages ÷ 500 = 1,600 volumes — with the
  // ballpark inputs named as operator chips.
  const W = 720, H = 230
  const ROW_Y = 70, ROW_H = 90
  const B1_X = 30, B1_W = 180, B2_X = 280, B2_W = 150, B3_X = 490, B3_W = 200
  const CH1_X = 218, CH2_X = 442, CH_W = 40, CH_H = 32
  const block = (x: number, w: number, big: string, small: string, stroke: string, fill: string, ink: string, mid: string) => {
    const cx = x + w / 2
    return `<rect x="${x}" y="${ROW_Y}" width="${w}" height="${ROW_H}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="2.2"/>` +
      `<text x="${cx}" y="${ROW_Y + 36}" font-size="15" font-weight="800" fill="${ink}" text-anchor="middle">${big}</text>` +
      `<text x="${cx}" y="${ROW_Y + 58}" font-size="9.5" font-weight="700" fill="${mid}" text-anchor="middle">${small}</text>`
  }
  const chip = (x: number, label: string) => {
    const cx = x + CH_W / 2
    return `<rect x="${x}" y="${ROW_Y + 29}" width="${CH_W}" height="${CH_H}" rx="8" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>` +
      `<text x="${cx}" y="${ROW_Y + 50}" font-size="12" font-weight="800" fill="#d97706" text-anchor="middle">${label}</text>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The library-wall estimate as three blocks joined by two operator chips. The first block reads 40,000,000 lines of kernel code. A divide-by-50 chip converts it to the second block: 800,000 printed pages at fifty lines per page. A divide-by-500 chip converts that to the third block: 1,600 shelf volumes at five hundred pages per volume. A footer states the arithmetic exactly — forty million divided by fifty equals eight hundred thousand pages; eight hundred thousand divided by five hundred equals one thousand six hundred volumes — and labels it an honest estimate of scale, a wall of shelf volumes, never a claim about quality.">
  <text x="${W / 2}" y="24" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the library wall: 40,000,000 lines priced as printed books</text>
  ${block(B1_X, B1_W, '40,000,000', 'lines of kernel code', '#16a34a', '#fef3c7', '#166534', '#65a30d')}
  ${chip(CH1_X, '÷ 50')}
  ${block(B2_X, B2_W, '800,000', 'printed pages at 50 lines each', '#0d9488', '#ffedd5', '#0f766e', '#0f766e')}
  ${chip(CH2_X, '÷ 500')}
  ${block(B3_X, B3_W, '1,600', 'shelf volumes at 500 pages each', '#16a34a', '#fef3c7', '#166534', '#65a30d')}
  <line x1="24" y1="182" x2="696" y2="182" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="${W / 2}" y="202" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">40,000,000 ÷ 50 = 800,000 pages; 800,000 ÷ 500 = 1,600 volumes — the inputs are the ballpark, the division is exact</text>
  <text x="${W / 2}" y="222" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">an honest estimate of scale — a wall of shelf volumes, never a claim about quality</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* the lesson                                                          */
/* ------------------------------------------------------------------ */

const lesson13: Lesson = {
  id: 'cf-software-the-invisible-half-of-the-machine',
  number: '1.3',
  title: 'Software: the Invisible Half of the Machine',
  concepts: [
    'software: the instructions, their data and their documentation',
    'system software versus application software',
    'the operating system as the machine’s manager',
    'utilities and device drivers',
    'the platform question: binaries and the API',
    'software scale: the library-wall estimate',
    'the licensing families: proprietary to public domain',
  ],
  objectives: [
    'By the end of this lesson you can define software and say why the stored-program concept of lesson 1.1 makes it loadable at all.',
    'By the end of this lesson you can classify any program you meet as system software or application software, with a reason.',
    'By the end of this lesson you can name the operating system’s five visible duties and say what the user sees of each.',
    'By the end of this lesson you can walk the boot sequence from power on to login screen and justify each hop in order.',
    'By the end of this lesson you can explain why a program compiled for one operating system does not run on another, and what an API is in that story.',
    'By the end of this lesson you can state the honest scale of the Linux kernel and read a software license by family.',
  ],
  prerequisites: ['cf-the-basic-structure-and-operation-of-the-computer', 'cf-a-census-of-hardware-desktops-to-embedded-chips'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ---------------- opening ----------------
    { kind: 'para', text: 'The machine census of lesson 1.2 named every family on the hardware side — the desktop on the desk, the laptop beside it, the phone in the pocket, the console under the television, the server rack in the basement, the quiet chip inside the washing machine. Yet every one of them is furniture until the invisible half arrives: a piano no one plays. Recall ENIAC from lesson 1.1: the visible machine was complete — a room of tubes, arithmetic and memory — but the invisible half barely existed, and setting a new problem meant days of physical switch-patching and cable-plugging while the machine sat idle. The stored-program concept fixed that: instructions became data in one memory, and the machine’s personality became something you could load. This lesson meets that personality properly. Software is the half of the machine you cannot touch, and — the honest surprise — it is the half that does nearly everything you actually want done. By the end you can classify any program you meet, say what the operating system actually does all day, walk the boot sequence from the power button to the login screen, read a software license honestly, and state the scale of the largest commonly shared software ever written.' },

    // ---------------- what software is ----------------
    { kind: 'heading', text: 'What Software Is' },
    { kind: 'para', text: 'Begin with the plainest question in the field: what *is* software? The hardware of lessons 1.1 and 1.2 is the half you can kick — metal, silicon, glass, plastic. Software is everything the machine is told to be. The two halves meet at exactly one place, and lesson 1.1 already built it.' },
    { kind: 'callout', tone: 'definition', title: 'Software', text: 'Software is said to be the set of instructions that tells the hardware what to do — together with the data those instructions work on and the documentation that explains them both. Thus, software is programs plus their data plus their documentation: the invisible half of the machine, the half that cannot be touched with a screwdriver.' },
    { kind: 'para', text: 'A program, the instruction-carrying part of software, is an ordered list of instructions that the machine obeys blindly. Lesson 1.1 named the machine’s only dance — fetch, decode, execute — beating lap after lap under the control unit’s direction, with the program counter walking on. Software is what that loop *eats*: every instruction the control unit ever fetches, decodes and executes is a piece of some program, and the program as a whole is what gives the blind dance its purpose. Nothing in the loop understands the purpose — the caution of lesson 1.1 stands — but the purpose arrives anyway, carried as instruction patterns in memory.' },
    { kind: 'callout', tone: 'insight', title: 'The machine’s personality is a file', text: 'Because the stored-program concept keeps instructions in the same memory as data, software is *loadable*: a new program is a new memory image, written in minutes, never a re-wiring. The machine’s personality is a file. The same box of hardware becomes a typewriter, a cinema, a games arcade or a laboratory overnight, with no panel opened — the quiet idea beneath every app, every update and every program download you will ever meet.' },
    { kind: 'example', title: 'Take one familiar act and name its invisible half: a commuter checks the next train on a phone.', steps: [
      'Take the act: a thumb taps a timetable app, and the next departure appears on the screen.',
      'Now, name the visible half: the screen, the touch panel, the processor and memory inside — hardware, the census of lesson 1.2.',
      'So, name the invisible half: the timetable app itself, the timetable data it reads, and the documentation its makers keep for their maintainers.',
      'Check the triad: the app is the instructions, the timetable is the data, the maintainers’ notes are the documentation — software, all three parts.',
      'Hence, one familiar act splits cleanly into a visible half and an invisible half — and the invisible half is the one doing the wanted work.',
    ] },
    { kind: 'para', text: 'The triad deserves one honest pause. Documentation is software too, in the field’s wide sense: the makers’ notes travel with the program, keep it maintainable, and outlive the makers’ memories. And data is neither hardware nor an afterthought — a program without data is a recipe with no ingredients. When this book says *software*, it means the whole triad.' },
    { kind: 'terms', items: [
      { term: 'Software', def: 'Software is said to be the instructions that tell the hardware what to do, together with the data they work on and the documentation that explains them.' },
      { term: 'Program', def: 'A program is said to be an ordered list of instructions that tells the machine, step by step, what to do — the unit of software the machine obeys blindly.' },
    ] },

    // ---------------- the two great families ----------------
    { kind: 'heading', text: 'The Two Great Families' },
    { kind: 'para', text: 'Every program you will ever meet falls into one of two great families — a census far steadier than the hardware census of lesson 1.2, because the boundary is the *job*, not the machine. Ask of any program one honest question: who is served — the machine itself, or the user doing their work? The answer sorts everything.' },
    { kind: 'callout', tone: 'definition', title: 'System software', text: 'System software is said to be the family of programs that manage the machine itself and provide the platform on which other programs run. Thus, system software serves the machine, not the user: the operating system, utility programs and device drivers are its three named kinds.' },
    { kind: 'callout', tone: 'definition', title: 'Application software', text: 'Application software is said to be the family of programs that do the user’s own work — writing, browsing, playing, editing. Thus, application software serves the user directly and rides on the platform the system family builds beneath it.' },
    { kind: 'figure', caption: 'The two great families as one tree: software at the root; system software (the operating system, utility programs, device drivers) managing the machine on the left branch; application software (word processor, browser, game, media editor) doing the user’s work on the right — every program sits somewhere on this tree.', svg: softwareFamilyTreeSvg() },
    { kind: 'table', caption: 'The family census: what each common program is for — the job, not the brand, decides the family.', head: ['Program', 'Family', 'What it is for'], rows: [
      ['operating system', 'system', 'manages the machine itself; the platform'],
      ['utility programs', 'system', 'housekeeping: cleanup, backup, scans'],
      ['device drivers', 'system', 'one translator per device family'],
      ['word processor', 'application', 'the user’s writing work'],
      ['browser', 'application', 'the user’s reading of the web'],
      ['game', 'application', 'the user’s play'],
      ['media editor', 'application', 'the user’s photo, audio, video work'],
    ] },
    { kind: 'para', text: 'Read the census by its boundary, not its members: the left column keeps the machine itself healthy and usable; the right column hands the user finished work. A browser is as large and as clever as many an operating system — size proves nothing here; the *service direction* decides. That single test is the whole apparatus of classification in this field.' },
    { kind: 'para', text: 'For example, classify these everyday programs — the test is always who is served:' },
    { kind: 'list', marker: 'roman', items: [
      'the program that backs up the disk overnight — the machine’s own housekeeping: a utility, system software;',
      'the photo editor the wedding photographer uses all day — the user’s creative work: application software;',
      'the small translator that makes a newly plugged printer usable — a device driver: system software;',
      'the word processor on which this very book is drafted — the user’s writing work: application software;',
      'the program that quietly scans the disk for malware — the machine’s guard duty: a utility, system software;',
      'the racing game the exam-weary student plays at midnight — the user’s play: application software.',
    ] },
    { kind: 'example', title: 'Classify the eight programs of a school’s computer room onto the two great families: a timetable app, the operating system, a backup utility, a browser, the touchpad driver, a media editor, an antivirus program, a report-writing word processor.', steps: [
      'Split the eight by the honest test: who is served — the machine, or the user?',
      'Now, the machine-servers: the operating system (the manager), the backup utility, the touchpad driver and the antivirus program — four, all system software.',
      'So, the user-servers: the timetable app, the browser, the media editor and the word processor — four, all application software.',
      'Check the census: a $4 + 4 = 8$ split, matching the family tree’s two halves exactly.',
      'Hence, the classification rides one question asked eight times — the boundary of the census table, never any knowledge of brands.',
    ] },
    { kind: 'terms', items: [
      { term: 'System software', def: 'System software is said to be the family of programs that manage the machine itself and provide the platform — the operating system, utilities and device drivers.' },
      { term: 'Application software', def: 'Application software is said to be the family of programs that do the user’s own work — writing, browsing, playing, editing — riding on the platform.' },
    ] },

    // ---------------- the operating system ----------------
    { kind: 'heading', text: 'The Operating System: the Manager' },
    { kind: 'para', text: 'The heart of system software, and of this whole lesson, is one program: the operating system. It is the program that is *always* running — from the moment the machine finishes booting until it is switched off — and every other program, however grand, runs as its guest. What follows is the visible half of its invisible work: five duties you can actually watch, if you know where to look.' },
    { kind: 'callout', tone: 'definition', title: 'Operating system', text: 'The operating system (OS) is said to be the system program that manages the machine’s resources — its processes, its memory, its files and its devices — and provides the user interface on which every other program runs. Thus, the operating system is the machine’s manager: the one trusted intermediary every program must pass through.' },
    { kind: 'para', text: 'Watch the manager at work, duty by duty. **Process management** lets many programs share one machine: one processor cannot serve two masters at the same instant, so the manager interleaves them — turns taken so fast that each program behaves as if it owned the whole machine. **Memory management** gives each of those programs its share of RAM and keeps the shares from trampling one another: each program *believes* it owns the memory it uses, and the belief holds precisely because the manager enforces it.' },
    { kind: 'para', text: '**File management** turns storage into names: you open *letters* or *photos*, never a numbered address — the manager keeps the mapping from the names you meet to the places the machine keeps. **Device management** opens one honest channel to every device: the disk, the screen, the printer and the gamepad are all reached through the manager, never grabbed directly. And the **user interface** is the duty you meet most of all — the desktop, the icons, the menus and the touch targets, or the typed command line; whether you meet pictures or typed words is a design choice, not a difference of species.' },
    { kind: 'table', caption: 'What the operating system does, mapped against what the user ever sees of it — the duty invisible, its effects everywhere.', head: ['The OS duty', 'What the user sees'], rows: [
      ['process management', 'many apps open at once; nothing freezes'],
      ['memory management', 'apps run together without trampling'],
      ['file management', 'files with names, kept in folders'],
      ['device management', 'plug in a printer; it simply works'],
      ['the user interface', 'the desktop, icons and menus you touch'],
    ] },
    { kind: 'figure', caption: 'The operating system as manager: four application programs (word processor, browser, game, media editor) ask downward through the one manager box, which alone commands the hardware row below (CPU, RAM, disk, screen, printer) — no program touches the hardware directly; every arrow passes through the manager.', svg: osAsManagerSvg() },
    { kind: 'derivation', title: 'Why n programs need a manager', statement: 'A machine must run $n$ programs on $d$ devices. Two designs are on the table: let every program drive every device itself, or install one trusted manager between them. The claim: the manager is cheaper for everyone.', steps: [
      { label: 'Count the work under no manager', formula: 'n \\times d \\text{ driver codes}', explanation: 'If there is no manager, each of the $n$ programs must itself carry working code for each of the $d$ devices — every device’s handling written $n$ times over, once per program.' },
      { label: 'Count the work under one manager', formula: 'd \\text{ drivers} + 1 \\text{ manager}', explanation: 'If one manager sits between, each device’s handling is written once, inside the manager — $d$ drivers plus the manager itself — and every program simply asks.' },
      { label: 'Let the machine grow', formula: 'n \\to 2n: \\quad 2n \\times d \\text{ versus } d', explanation: 'Add programs and the no-manager bill grows in lock-step — doubling the programs doubles the bill — while the managed bill does not move: the machine grows in programs without growing in device code.' },
      { label: 'Price the trust', formula: '\\text{one honest channel} < n \\text{ rival channels}', explanation: 'One channel is also one honest referee: no program can seize a device out of another’s hands, and the machine can serve many masters precisely because it serves them one at a time, in turns too fast to notice.' },
    ], result: 'Thus, $n$ programs on bare metal need $n \\times d$ driver codes, while the same $n$ programs with one operating system need only $d$ — the manager writes each device once and serves every program with it.' },
    { kind: 'callout', tone: 'insight', title: 'The manager is itself a program', text: 'Note honestly what the manager is made of: the operating system is itself a program, riding the same fetch–decode–execute loop of lesson 1.1 as the humblest calculator toy. Its authority comes from position — everything must pass through it — not from different matter. The deeper machinery, from interrupts to scheduling to protection, belongs to the Operating Systems course; this lesson only opens its door.' },
    { kind: 'example', title: 'Four programs, one machine: name the manager’s duty at work in each part of the scene.', steps: [
      'Take the scene: a word processor holds an open letter, a browser streams a lecture, a backup utility copies the disk, and an antivirus scan runs quietly behind them all.',
      'Now, all four share one processor — turns interleaved so fast that nobody notices: process management.',
      'So, all four sit in RAM without trampling, each believing it owns its share: memory management.',
      'Check the letter and the backup: both are named files in folders — file management — and the disk they use is reached through one channel, not four: device management.',
      'Hence, one ordinary screen of work is the manager performing every duty at once — invisibly, which is the whole point of management.',
    ] },
    { kind: 'para', text: 'One question is left, and it is the oldest one in the field: where does the manager *come from*? Every program must be loaded into memory by something, and the operating system is a program — so who loads the loader? The answer is a fixed ritual every machine performs from cold: the boot sequence.' },
    { kind: 'algorithm', title: 'The Boot Sequence', lines: [
      { code: 'power on:', note: 'you press the button — electricity arrives, and nothing else is true yet' },
      { code: '  firmware checks the hardware (POST)', note: 'the power-on self-test: the motherboard’s own small program tests RAM, ports and display before any disk is trusted' },
      { code: '  firmware finds the bootloader', note: 'the firmware looks on the storage for the small loader program and runs it' },
      { code: '  bootloader loads the kernel', note: 'the loader carries the kernel — the operating system’s core — from disk into memory and hands over the machine' },
      { code: '  kernel starts drivers + services', note: 'the kernel brings up the device drivers and the background services, one translator per device family' },
      { code: 'login screen appears', note: 'the manager is fully up: it asks who you are, and everything you do afterwards passes through it' },
    ], note: 'Why the firmware lives on the motherboard: someone must run before any disk exists — a disk is a device, and reaching a device needs software, which must be loaded by something. The firmware breaks the circle because it is a small permanent program kept on the board itself, always there, needing no loading. "Boot" is the old short word for this cold start — the machine lifting itself by its own bootstraps, one small program loading a larger one, each hop more capable than the last.' },
    { kind: 'figure', caption: 'The boot sequence as one strip: power on, the firmware’s POST, the bootloader hop, the kernel load, drivers and services, the login screen — six stages with their owner printed above each, the hops joined by arrows, each handover loading the program that loads the next.', svg: bootSequenceStripSvg() },
    { kind: 'example', title: 'Walk the boot trace: name who owns the machine at each stage, and why each hop must precede the next.', steps: [
      'Take the six stages in order: power on, POST, bootloader, kernel, drivers + services, login.',
      'Now, the first two belong to the firmware: it must check the hardware before trusting any disk, because it existed before disks could be read at all.',
      'So, the bootloader is the first disk program: the firmware is too small to load a whole kernel, so it loads a loader — which can.',
      'Check the kernel: once loaded, it starts the drivers, for no device works without its translator; services follow, and the machine becomes ready.',
      'Hence, the login screen is last because the manager must be complete before it can ask who you are — each hop loads the program that loads the next.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'The operating system arc', text: 'The manager has a short, loud history. UNIX was born in 1969 at Bell Labs — Ken Thompson and Dennis Ritchie its makers — and was rewritten in C by 1973, a landmark: an operating system written in a portable language rather than one machine’s assembly. On the personal-computer side, Microsoft licensed 86-DOS — nicknamed QDOS, "Quick and Dirty Operating System" — from Seattle Computer Products, purchased full rights in July 1981, and PC DOS 1.0 shipped with the first IBM PC in August 1981. Windows 1.0 arrived in November 1985 — a graphical shell that in later generations grew into an operating system family of its own. The Linux kernel began with Linus Torvalds in August 1991 — a hobby for 386 PCs, released under the GPL — and today it anchors servers, supercomputers and the Android world. The mobile era followed: iPhone OS 1 in 2007, and Android 1.0 — the first commercial version — on 23 September 2008. Every date above is web-verified, and every system named is still somebody’s daily manager.' },
    { kind: 'terms', items: [
      { term: 'Operating system', def: 'The operating system is said to be the system program that manages the machine’s processes, memory, files and devices, and provides the interface every other program runs on.' },
      { term: 'Kernel', def: 'The kernel is said to be the operating system’s core — the first part loaded at boot, the part that starts the drivers and manages everything after.' },
      { term: 'Firmware', def: 'Firmware is said to be the small permanent program kept on the motherboard itself, running the power-on self-test and loading the bootloader before any disk exists.' },
    ] },

    // ---------------- utilities and device drivers ----------------
    { kind: 'heading', text: 'Utilities and Device Drivers' },
    { kind: 'para', text: 'Two kinds of system software sit beside the manager, and both are easy to underrate. The first is the maintenance crew: **utility programs**. They tidy, guard and repair the machine itself — disk cleanup clearing the leftovers of finished work, backup copying earned data to safety, compression packing files into smaller parcels, antivirus scans hunting known malware. These are *families of jobs*, not brands: a fundamentals lesson names the work, and any maker’s tool that does the work is a member of the family.' },
    { kind: 'callout', tone: 'definition', title: 'Utility program', text: 'A utility program is said to be a system program that maintains or guards the machine itself rather than doing the user’s work. Thus, utilities are the maintenance crew: cleanup, backup, compression and antivirus scanning are the classic families.' },
    { kind: 'para', text: 'For example, name the utility families at work in one ordinary week:' },
    { kind: 'list', marker: 'roman', items: [
      'Sunday’s overnight copy of the week’s earned files to a second disk — the backup family;',
      'the mid-week tidy that clears leftover temporary files — the cleanup family;',
      'the archive that packs a term’s work into a smaller parcel for sending — the compression family;',
      'the quiet nightly hunt for known malware — the antivirus family.',
    ] },
    { kind: 'example', title: 'Classify the maintenance jobs: (a) an overnight backup; (b) a defragment-style tidy-up of scattered storage; (c) an antivirus scan.', steps: [
      'Take the honest test: who is served — the user’s own work, or the machine itself?',
      'Now, the overnight backup guards the machine’s earned data — housekeeping: a utility of the backup family.',
      'So, the defragment-style tidy re-arranges the machine’s own storage — housekeeping again: a utility of the cleanup family.',
      'Check the antivirus scan: it hunts malware that would harm the machine — the guard duty of the scanning family: a utility.',
      'Hence, all three are utilities — none does the user’s work; each keeps the machine itself healthy, which is system software throughout.',
    ] },
    { kind: 'para', text: 'The second kind is stranger and more important than it looks: the **device driver**. Every device speaks its own dialect — the printer one language, the gamepad another, each graphics card a third — while the operating system would rather speak one general device language to all of them. A driver is the small program that stands between and translates: one driver per device family, living in the system layer, invisible until it fails or improves. The graphics example is the classic one, and it explains a household phrase: *driver update*.' },
    { kind: 'callout', tone: 'definition', title: 'Device driver', text: 'A device driver is said to be a small system program that translates between one device family and the operating system. Thus, a driver is a translator: the OS speaks general device language, and the driver renders it into the particular dialect one maker’s hardware understands.' },
    { kind: 'example', title: 'The translator at work: why can the same game run on two quite different graphics cards?', steps: [
      'Take the two cards: different makers, different internal dialects — neither understands the other’s commands.',
      'Now, the game is one program: it issues general draw commands in the operating system’s graphics language, not in either card’s dialect.',
      'So, each card ships with its own driver: card A’s driver translates the general commands into A’s dialect, card B’s driver renders the same commands into B’s.',
      'Check the win: the game is written once, and the translating is done twice — by two small system programs, not by the game.',
      'Hence, the same game runs on both cards because the drivers carry the translation — which is exactly why "driver update" is a household phrase.',
    ] },
    { kind: 'terms', items: [
      { term: 'Utility program', def: 'A utility program is said to be a system program that maintains or guards the machine itself — cleanup, backup, compression and antivirus scanning are its families.' },
      { term: 'Device driver', def: 'A device driver is said to be a small system program that translates between one device family and the operating system — one translator per family.' },
    ] },

    // ---------------- application software and the platform ----------------
    { kind: 'heading', text: 'Application Software and the Platform Question' },
    { kind: 'para', text: 'On the application side, the census is a census of *work*. The productivity family carries the user’s writing, counting and presenting — word processors, spreadsheets, slide-makers. The browser family reads the living web. The creative family edits photo, audio and video. The game family plays — and is, incidentally, the most demanding tenant any machine ever hosts, the reason gaming hardware sells at all. Every application, whatever its work, shares one dependence: it cannot reach the machine except by asking the manager.' },
    { kind: 'callout', tone: 'definition', title: 'Application programming interface (API)', text: 'An application programming interface (API) is said to be the published set of calls through which application programs ask the operating system for services — opening files, drawing windows, sending network traffic, reaching devices. Thus, an API is the manager’s service counter: the app asks; the operating system performs.' },
    { kind: 'para', text: 'And now the platform honesty, the part of this lesson that saves the most confusion later. A program, once *compiled*, is machine code bound to two things at once: the instruction dialect of one processor line, and the exact call names of one operating system’s service counter. Take that binary to a machine with a different operating system and two mismatches greet it — the new processor may not speak its dialect at all, and even if it does, the names it calls at the service counter were never taught to the other manager. That is why one title ships as *for Windows*, *for Mac* and *for Linux* editions: not three products, but three platform bindings of one source. The deeper story of instruction dialects belongs to chapter 4, "Inside the Box", of this book.' },
    { kind: 'callout', tone: 'warn', title: 'A program is not a program', text: 'A caution worth boxing: "it is a program, it runs anywhere" is false twice over. Compiled code is dialect-bound to an instruction set and service-counter-bound to one operating system’s API. The honest sentence is "this binary runs on this platform" — and the honest everyday evidence is the editions row on any software download page.' },
    { kind: 'example', title: 'One source, three editions: why does the same application ship separately for Windows, for Mac and for Linux?', steps: [
      'Take the one source: the makers’ code as written by humans — one program in principle.',
      'Now, compiling it for Windows binds it twice: to that machine’s instruction dialect and to that manager’s service counter — its API.',
      'So, the same source compiled for Mac is a different binary — Mac dialect, Mac API — and again for Linux: three editions, one program in source.',
      'Check the user’s evidence: the download page offers the three editions side by side — not three products, but three platform bindings of one.',
      'Hence, the platform question in a sentence: an application rides a platform, and a binary is married to the platform it was compiled for.',
    ] },
    { kind: 'terms', items: [
      { term: 'Platform', def: 'A platform is said to be the combination of hardware and operating system a program is compiled to run on — the ground an application rides.' },
      { term: 'Application programming interface (API)', def: 'An application programming interface (API) is said to be the published set of calls through which applications ask the operating system for its services.' },
    ] },

    // ---------------- how big is software ----------------
    { kind: 'heading', text: 'How Big Is Software' },
    { kind: 'para', text: 'Scale deserves one honest paragraph, because it is the question every beginner eventually asks: how much software is there? The single most striking verified answer concerns the Linux kernel — the same kernel that began as a hobby in August 1991, and the largest commonly shared open codebase in the world. It surpassed forty million lines of code in early 2025 — about $40{,}000{,}000$. What does such a number even mean? A derivation prices it the only way a number that large can be *felt*: as a library.' },
    { kind: 'derivation', title: 'The library wall', statement: 'Price the honest scale of the Linux kernel as printed books, using two labelled ballpark inputs: a printed page carries roughly 50 lines, and a typical shelf volume carries roughly 500 pages. The claim: the kernel prices as a library wall.', steps: [
      { label: 'Take the input', formula: '40{,}000{,}000 \\text{ lines}', explanation: 'Start from the pinned scale: the kernel surpassed 40,000,000 lines of code in early 2025 — the count of lines is exact, and it is the only exact number in this derivation.' },
      { label: 'Convert to pages', formula: '40{,}000{,}000 \\div 50 = 800{,}000 \\text{ pages}', explanation: 'At roughly 50 lines per printed page, the kernel fills $800{,}000$ pages — engine-checked, exact given the assumption.' },
      { label: 'Convert to volumes', formula: '800{,}000 \\div 500 = 1{,}600 \\text{ volumes}', explanation: 'At roughly 500 pages per typical shelf volume, those pages bind into about $1{,}600$ volumes — a wall of shelving.' },
      { label: 'Test the ballpark', formula: '40{,}000{,}000 \\div 40 = 1{,}000{,}000 \\text{ pages}', explanation: 'Vary the soft input to 40 lines per page and the wall becomes $1{,}000{,}000$ pages, or $2{,}000$ volumes — the estimate moves by a factor of only $2{,}000 \\div 1{,}600 = 1.25$, so the order of magnitude stands.' },
    ], result: 'Thus, $40{,}000{,}000 \\div 50 = 800{,}000$ pages, and $800{,}000 \\div 500 = 1{,}600$ volumes — the kernel prices, honestly, as a library wall of about $1{,}600$ volumes.' },
    { kind: 'callout', tone: 'warn', title: 'Quantity is not quality', text: 'A caution the number invites: a 40,000,000-line kernel is not "better" than the ten-thousand-line controller riding a washing machine — both do their jobs, and each would be absurd in the other’s post. Size measures work spent, never worth achieved. Read the library wall as a scale of effort, not a ranking.' },
    { kind: 'example', title: 'Price the kernel on the library wall: 40,000,000 lines at 50 lines per printed page, then 500 pages per shelf volume.', steps: [
      'Take the pinned scale: about $40{,}000{,}000$ lines of code — the kernel’s honest size in early 2025.',
      'Now, the page hop: $40{,}000{,}000 \\div 50 = 800{,}000$ printed pages.',
      'So, the volume hop: $800{,}000 \\div 500 = 1{,}600$ shelf volumes — one library wall.',
      'Check both round trips: $1{,}600 \\times 500 = 800{,}000$ and $800{,}000 \\times 50 = 40{,}000{,}000$ — the arithmetic closes exactly.',
      'Hence, the kernel is honest wall-scale — a wall, note, never a judgement: the estimate prices scale alone.',
    ] },
    { kind: 'para', text: 'Everything in that derivation except the 40,000,000 itself is a labelled ballpark — "roughly", "typical", "about" — and that honesty is the habit this book keeps wherever an estimate stands in for a count: soft inputs, hard division, a clearly labelled answer. An estimate earns its place by naming its assumptions; a number that hides them is not an estimate but a guess dressed as one.' },

    // ---------------- licensing ----------------
    { kind: 'heading', text: 'Licensing: the Honest First Meeting' },
    { kind: 'para', text: 'One last meeting belongs in this first lesson on software, because it is the one you personally transact earliest: when you "buy" a program, you almost never buy the program. You buy *permission*. The legal instrument that states the permission is the software license, and its families are few enough to learn on first meeting.' },
    { kind: 'callout', tone: 'definition', title: 'Software license', text: 'A software license is said to be the legal instrument that states what a user may do with a program — use it, copy it, study it, change it, redistribute it, or some stated subset of these. Thus, buying software usually buys a license: the permission, never the software itself.' },
    { kind: 'table', caption: 'The licensing families at a first meeting — price, source and redistribution rights decide the family.', head: ['Licensing family', 'What you pay', 'Source code + rights'], rows: [
      ['proprietary', 'a price, per copy', 'closed; no right to change or share'],
      ['freeware', 'nothing', 'still closed; free of charge only'],
      ['shareware', 'try free, then pay', 'closed; payment on trust'],
      ['open source', 'varies', 'open; study, change, redistribute'],
      ['public domain', 'nothing', 'no rights reserved at all'],
    ] },
    { kind: 'para', text: 'The families are easiest to believe through one story. Android’s core is open source — built by Google around the Linux kernel, whose GPL lineage this lesson met in the historical arc — and precisely because the license granted study, change and redistribution, hundreds of manufacturers could carry that one core into their own handsets, shaping it to their screens and their markets. A proprietary license would have needed one owner’s permission hundreds of times over; the open license made a fleet possible with one granted freedom. That is the entire practical meaning of the licence families — what the license permits, the world can build on. The practice of choosing, installing and updating under these families belongs to chapter 5 of this book, "Installing, Updating and Licensing Honestly"; this lesson opens the door and hands off.' },
    { kind: 'example', title: 'Read three licenses honestly: (a) free of charge, no source offered, no redistribution permitted; (b) full use granted for a trial period, then payment asked; (c) source code shipped, with study, change and redistribution granted.', steps: [
      'Take each license by its three tells: the price, the source, the redistribution right.',
      'Now, (a) charges nothing but offers no source and grants no sharing: free of charge, still proprietary — freeware, the family most often mistaken for its rival.',
      'So, (b) grants full use for a trial, then asks payment on trust — the try-then-pay family: shareware.',
      'Check (c): the source ships, and study, change and redistribution are granted — open source, the GPL’s family.',
      'Hence, three licenses, three families — and the one honest habit: read what is *granted* before calling anything "free".',
    ] },
    { kind: 'terms', items: [
      { term: 'Software license', def: 'A software license is said to be the legal instrument stating what a user may do with a program — use, copy, study, change, redistribute, or a subset of these.' },
      { term: 'Proprietary software', def: 'Proprietary software is said to be software whose license charges for use and closes the source — permission to use, never the rights to change or share.' },
      { term: 'Freeware', def: 'Freeware is said to be software licensed free of charge but still proprietary — no source offered, no redistribution right granted.' },
      { term: 'Shareware', def: 'Shareware is said to be software licensed for full trial use, with payment asked afterwards on the honour system.' },
      { term: 'Open-source software', def: 'Open-source software is said to be software whose license grants the study, change and redistribution of its source code — the GPL being the classic instrument.' },
      { term: 'Public-domain software', def: 'Public-domain software is said to be software to which no rights are reserved at all — anyone may use, change or sell it without asking.' },
    ] },

    // ---------------- exam corner ----------------
    { kind: 'heading', text: 'Exam Corner' },
    { kind: 'callout', tone: 'exam', title: 'What the awareness papers ask of this lesson', text: 'Banking and SSC computer-awareness papers ask this lesson directly, in three recurring shapes: system-versus-application classification ("which of the following is system software?"), operating-system function identification ("which duty is process management?"), and licensing types ("freeware differs from open-source software because —"). The exercise items below include exam-style items in that idiom — original items written to the pattern, honestly labelled as such, never presented as real past paper questions.' },
    { kind: 'para', text: 'From the above discussion, it follows that the machine of lessons 1.1 and 1.2 was half a machine. The invisible half is software — loadable instructions riding the stored-program concept — and it splits into two great families by a single honest test: system software serves the machine itself (the operating system, the utilities, the drivers); application software serves the user’s work. The operating system is the manager that makes sharing possible — processes, memory, files, devices and the interface — and it arrives by the boot sequence’s six hops, each program loading the next. Applications ride the manager’s API, and a compiled binary stays married to the platform it was compiled for. Scale is honest wall-scale: the kernel’s 40,000,000 lines price, ballpark, as 800,000 pages — about $1{,}600$ volumes. And licensing is permission, in five families from proprietary to public domain.' },
    { kind: 'list', marker: 'roman', items: [
      'software is instructions plus data plus documentation — the invisible half, loadable because instructions are data in one memory;',
      'the two families: system software manages the machine; application software does the user’s work — the test is who is served;',
      'the operating system manages processes, memory, files and devices, and provides the interface — one trusted intermediary for all;',
      'the boot sequence runs power on → POST → bootloader → kernel → drivers + services → login, each hop loading the next;',
      'a compiled binary runs only on its own platform — its instruction dialect plus its manager’s API;',
      'licensing is permission, in five families — and free of charge never means free to modify.',
    ] },

    // ---------------- quiz ----------------
    { kind: 'quiz', items: [
      { q: 'Which of the following is system software?', options: ['A word processor', 'A photo editor', 'An operating system', 'A racing game'], answer: 2, explain: 'Option 3 is correct: the operating system manages the machine itself and provides the platform — the definition of system software. Option 1 is a writing tool that does the user’s work: application software. Option 2 likewise serves the user’s creative work, not the machine. Option 4 is the purest application of all — play, served directly, platform provided by others.' },
      { q: 'What does the operating system’s process management actually do?', options: ['It runs each program to completion before any other may start', 'It shares the one machine among many programs, in turns nobody sees', 'It compresses stored files so that more of them fit', 'It translates print commands into a printer’s own dialect'], answer: 1, explain: 'Option 2 is the duty: many programs share one processor in interleaved turns too fast to notice — the invisible referee. Option 1 describes the one-master-at-a-time machine the manager exists to overcome. Option 3 is a utility’s job — the compression family — not the sharing duty. Option 4 is a device driver’s job, the translator between one device family and the OS.' },
      { q: 'What is a device driver?', options: ['A small system program that translates between one device family and the operating system', 'A backup copy of a program kept off-site for emergencies', 'The name of the chip inside every printer', 'A license that permits hardware to be resold'], answer: 0, explain: 'Option 1 is the definition: the driver translates the operating system’s general device language into one device family’s own dialect. Option 2 confuses the translator with a backup utility’s output — different family, different job. Option 3 mistakes a hardware part for the software that serves it. Option 4 drags licensing vocabulary into hardware — a license governs software use, and no chip is named a driver.' },
      { q: 'When you buy a piece of software, what is it that you usually buy?', options: ['The program’s source code and its trade secrets', 'A share in the company that made it', 'The factory rights to manufacture further copies', 'A license — the permission to use, as the agreement states'], answer: 3, explain: 'Option 4 is the honest rule: you buy a license, the legal instrument stating what you may do — use, on the stated terms. Option 1 describes what proprietary licensing withholds: the source stays closed, trade secrets stay secret. Option 2 confuses a purchase with an investment — buying permission makes you an owner of nothing. Option 3 is exactly backwards: the copying rights stay with the copyright holder, which is why the license exists at all.' },
      { q: 'Which licensing family grants the right to study the source code, change it, and redistribute both the original and the changes?', options: ['Freeware', 'Shareware', 'Open source', 'Public domain'], answer: 2, explain: 'Option 3 is right: open-source licenses grant study, change and redistribution of the source — the GPL being the classic instrument, the Linux and Android lineage its witness. Option 1 is the commonest trap: freeware is free of charge but closed — no source, no rights beyond use. Option 2 is try-then-pay, still closed after payment. Option 4 grants everything with no license asked at all — but it is rarity, not the family the GPL built, and this question asks for the granting family.' },
    ] },

    // ---------------- formula cards ----------------
    { kind: 'formula', name: 'The boot order', latex: '\\text{power on} \\to \\text{POST} \\to \\text{bootloader} \\to \\text{kernel} \\to \\text{login screen}', note: 'the cold-start ritual: each hop loads the program that loads the next — the firmware first, because it must run before any disk exists.' },
    { kind: 'formula', name: 'The two-families census', latex: '\\text{software} = \\text{system software} + \\text{application software}', note: 'the boundary is the job, not the machine: the system family serves the machine itself (OS, utilities, drivers); the application family serves the user’s work.' },
    { kind: 'formula', name: 'The library-wall estimate', latex: '40{,}000{,}000 \\div 50 = 800{,}000 \\text{ pages}; \\quad 800{,}000 \\div 500 = 1{,}600 \\text{ volumes}', note: 'the kernel priced as printed books — soft inputs (roughly 50 lines per page, roughly 500 pages per volume), hard division, an honestly labelled wall.' },
    { kind: 'formula', name: 'The license families', latex: '\\text{proprietary} / \\text{freeware} / \\text{shareware} / \\text{open source} / \\text{public domain}', note: 'five families by price, source and redistribution — buying software buys permission, and free of charge never means free to modify.' },
    { kind: 'formula', name: 'The manager count', latex: 'n \\times d \\text{ bare metal} \\;\\; \\text{vs} \\;\\; d \\text{ with one operating system}', note: 'each device’s driver written once inside the OS serves every program — the arithmetic behind the manager’s existence.' },

    // ---------------- exercises ----------------
    { kind: 'exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Classify each of these programs onto the two great families, with a reason: (a) a disk cleanup tool; (b) a word processor; (c) the touchpad driver; (d) a web browser.', solution: [
          'Take the honest test: who is served — the machine itself, or the user doing their work?',
          'Now, the disk cleanup tool tidies the machine’s own storage — housekeeping: system software, a utility.',
          'So, the word processor serves the user’s writing work — application software.',
          'Check the remaining pair: the touchpad driver translates for one device family — system software; the browser does the user’s reading of the web — application software.',
          'Hence, (a) and (c) ride the system half, (b) and (d) the application half — the split the panels below draw.',
        ], answer: '(a) system software — a utility; (b) application software; (c) system software — a device driver; (d) application software.', figures: [
          { caption: 'The two families for this classification: the cleanup tool and the touchpad driver ride the system panel; the word processor and the browser ride the application panel.', svg: solutionFamilyTreeSvg() },
        ] },
        { q: 'Classify each of these onto the two great families: (a) an antivirus program; (b) a photo editor; (c) the operating system itself; (d) a chess program.', solution: [
          'Take the honest test again: the machine, or the user?',
          'Now, the antivirus program guards the machine itself — system software, a utility.',
          'So, the photo editor does the user’s creative work — application software.',
          'Check the remaining pair: the operating system manages the machine itself — system software, the manager; the chess program serves the user’s play — application software.',
          'Hence, (a) and (c) are system software; (b) and (d) are application software.',
        ], answer: '(a) system software — a utility; (b) application software; (c) system software — the manager; (d) application software.' },
      ] },
      { level: 'L2', questions: [
        { q: 'Two programs run at once on one machine, and neither knows the other exists. Which duty of the operating system is at work, and what is it actually doing?', solution: [
          'Take the scene’s two clues: many programs, one machine, mutual ignorance.',
          'Now, one processor cannot serve two masters at the same instant — so the manager interleaves them, giving each its turns so fast that neither notices the other exists.',
          'So, the duty is process management: sharing the machine between programs that never meet.',
          'Hence, the invisible referee is the OS’s process management — turns, not miracles.',
        ], answer: 'process management — the operating system takes turns between the programs so fast that neither notices.' },
        { q: 'A printer that failed on a new machine works right after its driver is updated. What was the driver doing before and after, and why did the update fix it?', solution: [
          'Take the three parties: the application, the operating system, and the printer speaking its own dialect.',
          'Now, the driver is the translator between the OS’s general print language and this printer’s particular dialect — a small system program, one per device family.',
          'So, the fault was a mistranslation: the old driver could not render the general commands into this printer’s actual dialect — the middle box, not the printer and not the program.',
          'Check the fix: the updated driver translates the same general commands correctly into the printer’s dialect — the OS never changed, the printer never changed.',
          'Hence, the update repaired the translating layer — the one place the two languages meet.',
        ], answer: 'the driver translates OS print commands into the printer’s own dialect; the update fixed the translation — the program and the printer were unchanged.', figures: [
          { caption: 'The translation chain for this printer story: the program’s general commands pass through the driver, which renders them into the printer’s dialect — the update repaired the middle box.', svg: driverTranslatorSvg() },
        ] },
      ] },
      { level: 'L3', questions: [
        { q: 'Put these boot stages in the honest order and justify each hop: the login screen, the firmware’s POST, power on, the kernel load, the bootloader.', solution: [
          'Take the rule: each hop loads the program that loads the next — the machine grows more capable stage by stage.',
          'Now, first comes power on — nothing is true before electricity arrives; then the firmware’s POST checks the hardware before any disk is trusted.',
          'So, the bootloader follows as the first disk program — small enough for the firmware to run — and it loads the kernel, the manager’s core.',
          'Check the last hop: drivers and services start under the kernel, and only then can the login screen ask who you are.',
          'Hence, the order is power on → POST → bootloader → kernel → login screen — each stage the loader of the next.',
        ], answer: 'power on → firmware POST → bootloader → kernel → login screen, each hop loading the next.', figures: [
          { caption: 'The honest boot order for this question: the firmware’s POST before any disk is read, the bootloader as the first disk program, the kernel, then the login screen.', svg: solutionBootStripSvg() },
        ] },
        { q: 'Classify these maintenance jobs and name the utility family each belongs to: (a) an overnight backup of earned files; (b) a defragment-style tidy-up of scattered storage; (c) an antivirus scan.', solution: [
          'Take the test one more time: housekeeping for the machine, or the user’s own work?',
          'Now, the overnight backup guards the machine’s earned data — the backup family: a utility.',
          'So, the defragment-style tidy re-arranges the machine’s own storage — the cleanup family: a utility.',
          'Check the antivirus scan: it hunts malware that would harm the machine — the scanning family: a utility.',
          'Hence, all three are utilities — system software serving the machine itself, never the user’s work.',
        ], answer: 'all three are utilities — the backup, cleanup and antivirus-scanning families, all system software.' },
        { q: 'Name the operating-system duty at work in each moment: (a) three programs sit in memory at once, each behaving as if it owned the RAM; (b) a saved letter opens by its name, not by a memory address; (c) a newly plugged gamepad works at once, with no new application installed.', solution: [
          'Take the three moments one at a time, asking which duty owns each.',
          'Now, (a) is memory management: the manager hands each program its share of RAM and keeps the shares from trampling.',
          'So, (b) is file management: names and folders stand between the user and the numbered storage underneath.',
          'Check (c): the gamepad spoke through its driver to the operating system — device management, the one honest channel.',
          'Hence, (a) memory management, (b) file management, (c) device management — three duties, one manager.',
        ], answer: '(a) memory management; (b) file management; (c) device management.' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style MCQ chain (original items written in the bank/SSC computer-awareness idiom — not a real past paper): (i) Which of the following is system software? (ii) Which duty belongs to the operating system? (iii) Freeware differs from open-source software because —', solution: [
          'Split the chain into its three questions and answer each from the boxed definitions.',
          '(i) The system family serves the machine: among a word processor, a game, an operating system and a browser, only the operating system manages the machine itself — system software.',
          '(ii) The OS’s duties are process, memory, file and device management, and the interface — interleaving programs among the applicants is process management.',
          '(iii) Freeware is free of charge but closed — no source, no redistribution right; open source grants study, change and redistribution of the source: the difference is rights, never price.',
          'Hence, (i) the operating system, (ii) process management, (iii) freeware grants no source-code rights while open source does.',
        ], answer: '(i) the operating system; (ii) process management; (iii) freeware is free of charge but grants no source rights — open source does.' },
        { q: 'The library wall: price 40,000,000 lines of kernel code at 50 lines per printed page, then at 500 pages per shelf volume.', solution: [
          'Take the pinned scale: about $40{,}000{,}000$ lines — the kernel’s honest size in early 2025.',
          'Now, the page hop: $40{,}000{,}000 \\div 50 = 800{,}000$ printed pages.',
          'So, the volume hop: $800{,}000 \\div 500 = 1{,}600$ shelf volumes.',
          'Check both round trips: $1{,}600 \\times 500 = 800{,}000$ and $800{,}000 \\times 50 = 40{,}000{,}000$ — the wall closes exactly.',
          'Hence, the kernel prices as $800{,}000$ pages — about $1{,}600$ volumes, one library wall.',
        ], answer: '800,000 pages, which is 1,600 volumes — one library wall.', figures: [
          { caption: 'The library wall for this question: 40,000,000 lines ÷ 50 = 800,000 pages ÷ 500 = 1,600 volumes — the inputs are the ballpark, the division is exact.', svg: libraryWallSvg() },
        ] },
        { q: 'The honest sensitivity: re-price the same 40,000,000 lines at 40 lines per printed page (still 500 pages per volume). What changes, and what does that say about the estimate?', solution: [
          'Take the new page width: 40 lines per page instead of 50 — the soft input moves.',
          'Now, the page hop: $40{,}000{,}000 \\div 40 = 1{,}000{,}000$ printed pages.',
          'So, the volume hop: $1{,}000{,}000 \\div 500 = 2{,}000$ shelf volumes.',
          'Check the movement: $1{,}600$ volumes grew to $2{,}000$ — a factor of $2{,}000 \\div 1{,}600 = 1.25$, nothing more.',
          'Hence, under any nearby assumption the kernel is wall-scale — the order of magnitude stands, and the words around the number should stay honestly soft.',
        ], answer: '1,000,000 pages — 2,000 volumes; the estimate moves by a factor of 1.25 only, so the wall itself stands.' },
      ] },
      { level: 'L5', questions: [
        { q: 'Explain, in plain words, why a program compiled for Windows does not run on Linux — and say exactly what the API contributes to the story.', solution: [
          'Take the binary as compiled: machine code — the processor’s own dialect, produced for one platform.',
          'Now, the first mismatch is instruction dialect: the binary speaks the instruction set it was compiled to, and a different machine may simply not understand it.',
          'So, the second mismatch is the service counter: even where the dialect happens to match, the binary asks the operating system by one manager’s API call names — and the other manager never learned those names.',
          'Check the API’s role: it is the published set of calls through which applications ask the OS — so a binary is married to the exact counter it was compiled against.',
          'Hence, dialect and service counter bind the binary to one platform — which is why one source ships as for Windows, for Mac and for Linux editions.',
        ], answer: 'two mismatches — the binary’s instruction dialect and its API calls — bind it to the one platform it was compiled for; the API is the OS’s service counter it was compiled against.' },
        { q: 'A colleague says: "That program is free, so we can modify it and give away our modified copies." Distinguish freeware from open-source software, and say exactly what the sentence gets wrong.', solution: [
          'Take the two families as boxed: freeware is free of charge but still proprietary — closed source, no redistribution right; open source grants study, change and redistribution.',
          'Now, the colleague’s "free" is a price statement — and price is the one thing the two families can share.',
          'So, the rights differ: freeware grants use only; the modifying and redistributing in the sentence belong to open-source licenses such as the GPL.',
          'Check the honest sentence: "free of charge" settles what you pay, never what you may do — rights live in the license, not in the price tag.',
          'Hence, the claim holds only for open source; for freeware it fails twice — no source to modify, no right to redistribute.',
        ], answer: 'the sentence confuses price with rights — freeware charges nothing but grants no source and no redistribution; only an open-source license grants the modifying and sharing described.' },
        { q: 'A machine must run 4 programs and owns 5 devices. Count the device-driver code needed on bare metal (no operating system) and with one operating system, and state the saving plainly.', solution: [
          'Take the counts: $n = 4$ programs and $d = 5$ devices.',
          'Now, on bare metal every program must itself drive every device: $4 \\times 5 = 20$ driver codes in all, scattered across the programs.',
          'So, with one operating system each device’s driver is written once, inside the manager: $5$ drivers, serving all four programs through one channel.',
          'Check the saving: $20 - 5 = 15$ driver codes not written — and each of the $5$ serves every program, one driver doing the work of four.',
          'Hence, bare metal needs 20 driver codes, the managed machine 5 — the saving of 15 is the arithmetic behind the manager’s existence.',
        ], answer: 'bare metal: 4 × 5 = 20 driver codes; with one operating system: 5 — a saving of 15 codes.' },
      ] },
      { level: 'L6', questions: [
        { q: 'State the manager theorem in your own words: why do n programs on bare metal need device-driving code against every device, while with one operating system the machine needs it only once per device? Name the shape of the saving plainly — no big-O notation, just the arithmetic of growth.', solution: [
          'Take the bare-metal bill: each of $n$ programs must carry working code for each of $d$ devices — $n \\times d$ pieces of device code in all.',
          'Now, grow the machine: twice the programs, twice the bill ($2n \\times d$), because every newcomer re-writes what every older program already contains — the bill grows with the tenants.',
          'So, take the managed bill: with one OS, the $d$ drivers are written once and live in the manager — every program asks, and the bill stays $d$ however many programs arrive.',
          'Check the gap concretely: $n = 4$ programs on $d = 5$ devices pays $20$ against $5$ — a factor of $4$; and each new program widens it further while the managed bill stands still.',
          'Hence, the saving is not a fixed amount but a growing one — the more tenants the machine hosts, the better the single manager pays — which is why every serious machine keeps one.',
        ], answer: 'bare metal needs $n \\times d$ driver codes while one operating system needs only $d$ — and the gap widens with every added program, so the saving grows with the machine itself.' },
        { q: 'Argue why the stored-program concept of lesson 1.1 is what makes a software industry possible at all — hardware alone cannot be an industry’s product in this sense, but software can.', solution: [
          'Take the concept as lesson 1.1 boxed it: instructions are data in one memory, fetched like numbers — so a program is a pattern of bits, loadable and copyable like any other data.',
          'Now, the first move: because programs are loadable, one machine can host uncountably many products without a panel being opened — the piano can be given any sheet music, overnight.',
          'So, the second move: because a program is bits, a second copy costs next to nothing to make — a maker can deliver the same product many times, which hardware manufacturing never permits.',
          'Check the third: an industry must maintain and improve its products after sale — with instructions in memory, fixing a product is writing new bits, not recalling hardware from customers.',
          'Hence, the stored-program concept is the whole commercial hinge: loadable makes the product deliverable, copyable makes it sellable at scale, and rewritable makes it maintainable — the software industry is the stored program, monetised.',
        ], answer: 'the stored-program concept makes programs loadable, copyable and rewritable — the three properties an industry needs, none of which hardware possesses.' },
      ] },
    ] },
  ],
}


// ------------------------------------------------------------------
// lesson 1.R — authored by the CS RUN 2 swarm (the cf1R agent), integrated verbatim
// ------------------------------------------------------------------

function wholeMachineMapSvg(): string {
  // The WHOLE machine in one map: the IPOS cycle as the spine (accent
  // arrows I, P, O, S), the five von Neumann units around it (the input
  // unit left, the CPU's control unit and ALU centre, the output unit
  // right, primary memory below), the software half layered above (the
  // applications riding the OS as manager), the three buses joining every
  // unit, and the loop closing as stored results return as input.
  const W = 720, H = 470
  // the software half — apps stacked on the OS-as-manager
  const SWX0 = 176, SWX1 = 544, APP_Y0 = 54, APP_Y1 = 98, OS_Y0 = 106, OS_Y1 = 152
  // the five units around the cycle spine
  const IN_X0 = 44, IN_X1 = 172, IN_Y0 = 214, IN_Y1 = 286
  const CP_X0 = 248, CP_X1 = 472, CP_Y0 = 200, CP_Y1 = 342
  const CU_X0 = 260, CU_X1 = 460, CU_Y0 = 218, CU_Y1 = 268
  const AL_X0 = 260, AL_X1 = 460, AL_Y0 = 284, AL_Y1 = 330
  const OU_X0 = 548, OU_X1 = 676, OU_Y0 = 214, OU_Y1 = 286
  const PM_X0 = 248, PM_X1 = 472, PM_Y0 = 384, PM_Y1 = 438
  const BUS_X0 = 56, BUS_X1 = 664, BUS_Y0 = 348, BUS_Y1 = 362
  // the spine chips: I between input and CPU, P on the CPU top, O between
  // CPU and output, S on the right rail down to storage
  const CHIP_R = 10
  const chipI: [number, number] = [210, 218], chipP: [number, number] = [418, 192]
  const chipO: [number, number] = [510, 218], chipS: [number, number] = [696, 316]
  const ARROW = '#ea580c', STRUCT = '#16a34a', INK = '#166534', TEAL = '#0d9488'
  const TEALINK = '#0f766e', MID = '#65a30d', TICK = '#d97706'
  const tri = (tip: [number, number], dir: [number, number], fill: string, size = 9): string => {
    const len = Math.hypot(dir[0], dir[1]) || 1
    const ux = dir[0] / len, uy = dir[1] / len
    const px = -uy, py = ux
    const bx = tip[0] - ux * size, by = tip[1] - uy * size
    return `<path d="M ${tip[0]} ${tip[1]} L ${+(bx + px * size * 0.45).toFixed(1)} ${+(by + py * size * 0.45).toFixed(1)} L ${+(bx - px * size * 0.45).toFixed(1)} ${+(by - py * size * 0.45).toFixed(1)} Z" fill="${fill}"/>`
  }
  const spine = `<line x1="${IN_X1}" y1="236" x2="${CP_X0 - 8}" y2="236" stroke="${ARROW}" stroke-width="2.6"/>` + tri([CP_X0, 236], [1, 0], ARROW)
    + `<line x1="${CP_X1}" y1="236" x2="${OU_X0 - 8}" y2="236" stroke="${ARROW}" stroke-width="2.6"/>` + tri([OU_X0, 236], [1, 0], ARROW)
    + `<path d="M ${OU_X1} ${OU_Y1 - 36} L ${chipS[0]} ${OU_Y1 - 36} L ${chipS[0]} 408 L ${PM_X1 + 8} 408" fill="none" stroke="${ARROW}" stroke-width="2.6"/>` + tri([PM_X1, 408], [-1, 0], ARROW)
    + `<path d="M ${PM_X0} 408 L 24 408 L 24 250 L ${IN_X0 - 8} 250" fill="none" stroke="${ARROW}" stroke-width="2.6"/>` + tri([IN_X0, 250], [1, 0], ARROW)
  const chips = [
    { cx: chipI[0], cy: chipI[1], letter: 'I' },
    { cx: chipP[0], cy: chipP[1], letter: 'P' },
    { cx: chipO[0], cy: chipO[1], letter: 'O' },
    { cx: chipS[0], cy: chipS[1], letter: 'S' },
  ]
  const chipsSvg = chips
    .map((ch) => `<circle cx="${ch.cx}" cy="${ch.cy}" r="${CHIP_R}" fill="${ARROW}" stroke="${INK}" stroke-width="1.4"/><text x="${ch.cx}" y="${ch.cy + 4}" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">${ch.letter}</text>`)
    .join('')
  const busConnectors = `<line x1="108" y1="${IN_Y1}" x2="108" y2="${BUS_Y0}" stroke="${TICK}" stroke-width="1.2"/>`
    + `<line x1="360" y1="${CP_Y1}" x2="360" y2="${BUS_Y0}" stroke="${TICK}" stroke-width="1.2"/>`
    + `<line x1="612" y1="${OU_Y1}" x2="612" y2="${BUS_Y0}" stroke="${TICK}" stroke-width="1.2"/>`
    + `<line x1="360" y1="${BUS_Y1}" x2="360" y2="${PM_Y0}" stroke="${TICK}" stroke-width="1.2"/>`
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The whole machine in one map, the chapter compressed into a single drawing. The information processing cycle is the spine, marked by four accent chips: I for input between the input unit and the CPU, P for processing riding the CPU top, O for output between the CPU and the output unit, S for storage on the right rail, with the loop closing as stored results return as input along the left rail. The five von Neumann units sit around the spine: the input unit at the left (keyboard, mouse, touchscreen, sensors), the CPU at the centre containing the control unit (fetch, decode, execute, directs every other unit) above and the arithmetic and logic unit (where 62 plus 48 happens) below, the output unit at the right (screen, printer, speakers), and primary memory below holding the stored program and its data. The three buses join every unit in one bar: address names where, data carries what, control commands when. The software half is layered above: the applications the user chooses riding on the operating system as manager, whose duties are process, memory, file and device management plus the user interface, with a dashed arrow showing that the OS arbitrates every lap. The census of eleven families and five generations waits outside the map.">
  <text x="360" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the whole machine in one map — the cycle as the spine, five units around it</text>
  <text x="360" y="36" font-size="10" text-anchor="middle" fill="${TEALINK}">the software half above, the von Neumann units at the centre, storage below — the loop closing</text>
  <rect x="${SWX0}" y="${APP_Y0}" width="${SWX1 - SWX0}" height="${APP_Y1 - APP_Y0}" rx="7" fill="#fef3c7" stroke="${TEAL}" stroke-width="1.8"/>
  <text x="360" y="70" font-size="11" font-weight="800" text-anchor="middle" fill="${INK}">APPLICATIONS</text>
  <text x="360" y="84" font-size="9" text-anchor="middle" fill="${TEALINK}">the programs you choose</text>
  <text x="360" y="95" font-size="9" text-anchor="middle" fill="${TEALINK}">browser · editor · game</text>
  <line x1="250" y1="${APP_Y1}" x2="250" y2="${OS_Y0}" stroke="${TEAL}" stroke-width="1.4" stroke-dasharray="3 3"/>
  <line x1="470" y1="${APP_Y1}" x2="470" y2="${OS_Y0}" stroke="${TEAL}" stroke-width="1.4" stroke-dasharray="3 3"/>
  <rect x="${SWX0}" y="${OS_Y0}" width="${SWX1 - SWX0}" height="${OS_Y1 - OS_Y0}" rx="7" fill="#ffedd5" stroke="${TEAL}" stroke-width="2.2"/>
  <text x="360" y="122" font-size="11" font-weight="800" text-anchor="middle" fill="${INK}">the OS as MANAGER</text>
  <text x="360" y="136" font-size="9" text-anchor="middle" fill="${TEALINK}">process · memory · file · device management</text>
  <text x="360" y="148" font-size="9" text-anchor="middle" fill="${TEALINK}">plus the user interface — the UI</text>
  <text x="108" y="76" font-size="9.5" font-weight="700" text-anchor="middle" fill="${TEALINK}">the invisible half</text>
  <text x="108" y="90" font-size="9" text-anchor="middle" fill="${MID}">(software)</text>
  <text x="612" y="76" font-size="9.5" font-weight="700" text-anchor="middle" fill="${TEALINK}">the census</text>
  <text x="612" y="90" font-size="9" text-anchor="middle" fill="${MID}">eleven families</text>
  <line x1="302" y1="${OS_Y1}" x2="302" y2="${CP_Y0 - 4}" stroke="${TEAL}" stroke-width="1.8" stroke-dasharray="5 4"/>` + tri([302, CP_Y0], [0, 1], TEAL) + `
  <text x="312" y="172" font-size="9.5" font-weight="700" fill="${TEALINK}">the OS arbitrates every lap</text>
  <rect x="${IN_X0}" y="${IN_Y0}" width="${IN_X1 - IN_X0}" height="${IN_Y1 - IN_Y0}" rx="8" fill="#fef3c7" stroke="${STRUCT}" stroke-width="2.2"/>
  <text x="108" y="234" font-size="11.5" font-weight="800" text-anchor="middle" fill="${INK}">INPUT UNIT</text>
  <text x="108" y="250" font-size="9" text-anchor="middle" fill="${TEALINK}">keyboard · mouse</text>
  <text x="108" y="262" font-size="9" text-anchor="middle" fill="${TEALINK}">touchscreen · sensors</text>
  <text x="108" y="277" font-size="9" font-weight="700" text-anchor="middle" fill="${INK}">I — data crossing in</text>
  <rect x="${CP_X0}" y="${CP_Y0}" width="${CP_X1 - CP_X0}" height="${CP_Y1 - CP_Y0}" rx="9" fill="#ffedd5" stroke="${STRUCT}" stroke-width="2.4"/>
  <text x="${CP_X0 + 10}" y="213" font-size="10" font-weight="800" fill="${INK}">the CPU</text>
  <rect x="${CU_X0}" y="${CU_Y0}" width="${CU_X1 - CU_X0}" height="${CU_Y1 - CU_Y0}" rx="6" fill="#fef3c7" stroke="${TEAL}" stroke-width="1.8"/>
  <text x="360" y="236" font-size="11" font-weight="800" text-anchor="middle" fill="${INK}">CONTROL UNIT</text>
  <text x="360" y="252" font-size="9" text-anchor="middle" fill="${TEALINK}">fetch · decode · execute</text>
  <text x="360" y="264" font-size="9" text-anchor="middle" fill="${TEALINK}">directs every other unit</text>
  <rect x="${AL_X0}" y="${AL_Y0}" width="${AL_X1 - AL_X0}" height="${AL_Y1 - AL_Y0}" rx="6" fill="#fef3c7" stroke="${TEAL}" stroke-width="1.8"/>
  <text x="360" y="300" font-size="11" font-weight="800" text-anchor="middle" fill="${INK}">the ALU</text>
  <text x="360" y="314" font-size="9" text-anchor="middle" fill="${TEALINK}">arithmetic and logic unit</text>
  <text x="360" y="326" font-size="9" text-anchor="middle" fill="${TEALINK}">where 62 + 48 happens</text>
  <rect x="${OU_X0}" y="${OU_Y0}" width="${OU_X1 - OU_X0}" height="${OU_Y1 - OU_Y0}" rx="8" fill="#fef3c7" stroke="${STRUCT}" stroke-width="2.2"/>
  <text x="612" y="234" font-size="11.5" font-weight="800" text-anchor="middle" fill="${INK}">OUTPUT UNIT</text>
  <text x="612" y="250" font-size="9" text-anchor="middle" fill="${TEALINK}">screen · printer</text>
  <text x="612" y="262" font-size="9" text-anchor="middle" fill="${TEALINK}">speakers</text>
  <text x="612" y="277" font-size="9" font-weight="700" text-anchor="middle" fill="${INK}">O — meaning handed out</text>
  <rect x="${BUS_X0}" y="${BUS_Y0}" width="${BUS_X1 - BUS_X0}" height="${BUS_Y1 - BUS_Y0}" rx="5" fill="#fcd34d" stroke="${TICK}" stroke-width="1.4"/>
  <text x="360" y="358.5" font-size="9" font-weight="700" text-anchor="middle" fill="${INK}">the three buses — address names where · data carries what · control commands when</text>
  ${busConnectors}
  <rect x="${PM_X0}" y="${PM_Y0}" width="${PM_X1 - PM_X0}" height="${PM_Y1 - PM_Y0}" rx="8" fill="#fef3c7" stroke="${STRUCT}" stroke-width="2.2"/>
  <text x="360" y="402" font-size="11" font-weight="800" text-anchor="middle" fill="${INK}">PRIMARY MEMORY</text>
  <text x="360" y="416" font-size="9" text-anchor="middle" fill="${TEALINK}">the stored program and its data live here</text>
  <text x="360" y="429" font-size="9" font-weight="700" text-anchor="middle" fill="${INK}">the S beat of the spine — the working desk</text>
  ${spine}
  ${chipsSvg}
  <text x="30" y="428" font-size="9" font-weight="700" fill="${TEALINK}">the loop closes:</text>
  <text x="30" y="440" font-size="9" font-weight="700" fill="${MID}">stored results return as input</text>
  <text x="360" y="462" font-size="9" text-anchor="middle" fill="${TEALINK}">one map, three lessons — the structure below, the invisible half above, the census outside</text>
</svg>`
}

function chapterTimelineSvg(): string {
  // The chapter's pinned machines on one computed timeline: x positions are
  // a linear map of the years over 1940..2020 (8.4 px per year); labels
  // staggered across five rows with side anchors so no label collides and
  // no stem crosses a lower label (engine-checked in v-cf1R.ts sectionG);
  // the four solid generation bands sit above the axis, the honest fifth
  // drawn dashed with fuzzy edges, and the three lessons' eras bracketed.
  const W = 720, H = 392
  const X0 = 30, X1 = 702, Y0 = 1940, Y1 = 2020
  const x = (year: number) => X0 + ((year - Y0) / (Y1 - Y0)) * (X1 - X0)
  const AX = 224, AXIS_X0 = 36, AXIS_X1 = 708
  const rowY = [48, 74, 100, 126, 152]
  const machines: { name: string; year: number; row: number; anchor: 'middle' | 'end' }[] = [
    { name: 'ENIAC', year: 1946, row: 0, anchor: 'middle' },
    { name: 'UNIVAC I', year: 1951, row: 1, anchor: 'middle' },
    { name: 'Intel 4004', year: 1971, row: 4, anchor: 'end' },
    { name: 'Altair 8800', year: 1975, row: 3, anchor: 'end' },
    { name: 'Apple II', year: 1977, row: 2, anchor: 'middle' },
    { name: 'IBM PC 5150', year: 1981, row: 1, anchor: 'end' },
    { name: 'Macintosh', year: 1984, row: 0, anchor: 'middle' },
    { name: 'Linux kernel', year: 1991, row: 3, anchor: 'middle' },
    { name: 'iPhone', year: 2007, row: 0, anchor: 'end' },
    { name: 'Raspberry Pi', year: 2012, row: 0, anchor: 'middle' },
  ]
  const GAP_ANCHOR = 7
  const INK = '#166534', MID = '#65a30d', TEAL = '#0d9488', TEALINK = '#0f766e', TICK = '#d97706'
  let labels = ''
  let stems = ''
  machines.forEach((m) => {
    const cx = x(m.year)
    const labelX = m.anchor === 'end' ? +(cx - GAP_ANCHOR).toFixed(1) : +cx.toFixed(1)
    labels += `<text x="${labelX}" y="${rowY[m.row]}" font-size="10" font-weight="800" text-anchor="${m.anchor}" fill="${INK}">${m.name}</text>`
    labels += `<text x="${labelX}" y="${rowY[m.row] + 11}" font-size="9.2" font-weight="700" text-anchor="${m.anchor}" fill="${MID}">${m.year}</text>`
    stems += `<line x1="${+cx.toFixed(1)}" y1="${rowY[m.row] + 15}" x2="${+cx.toFixed(1)}" y2="${AX}" stroke="${TICK}" stroke-width="1.2"/>`
  })
  let dots = ''
  machines.forEach((m) => {
    dots += `<circle cx="${+x(m.year).toFixed(1)}" cy="${AX}" r="4.5" fill="#16a34a" stroke="${INK}" stroke-width="1.2"/>`
  })
  let decadeTicks = ''
  for (let yr = 1950; yr <= 2020; yr += 10) {
    const tx = +x(yr).toFixed(1)
    decadeTicks += `<line x1="${tx}" y1="${AX}" x2="${tx}" y2="236" stroke="${TEALINK}" stroke-width="1.4"/><text x="${tx}" y="250" font-size="9" font-weight="700" text-anchor="middle" fill="${MID}">${yr}</text>`
  }
  const edges = [1946, 1956, 1964, 1971]
  const bandY = 258, bandH = 28
  let bands = ''
  edges.forEach((e, i) => {
    const bx0 = x(e)
    const bx1 = i === 3 ? X1 : x(edges[i + 1])
    bands += `<rect x="${+bx0.toFixed(1)}" y="${bandY}" width="${+(bx1 - bx0).toFixed(1)}" height="${bandH}" fill="${i % 2 === 0 ? '#ffedd5' : '#fef3c7'}" stroke="${TICK}" stroke-width="1.5"/>`
  })
  const genLabels = [
    { text: '1st · tubes 1946–1956', cx: +((x(1946) + x(1956)) / 2).toFixed(1), y: 300 },
    { text: '3rd · ICs 1964–1971', cx: +((x(1964) + x(1971)) / 2).toFixed(1), y: 300 },
    { text: '2nd · transistors 1956–1964', cx: +((x(1956) + x(1964)) / 2).toFixed(1), y: 314 },
    { text: '4th · microprocessors 1971 →', cx: +((x(1971) + X1) / 2).toFixed(1), y: 314 },
  ]
  const genText = genLabels.map((g) => `<text x="${g.cx}" y="${g.y}" font-size="9.5" font-weight="700" text-anchor="middle" fill="${TEALINK}">${g.text}</text>`).join('')
  const bracket = (from: number, to: number, y: number): string => {
    const x0 = +x(from).toFixed(1), x1 = +x(to).toFixed(1)
    return `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${TEAL}" stroke-width="1.8"/><line x1="${x0}" y1="${y - 4}" x2="${x0}" y2="${y + 4}" stroke="${TEAL}" stroke-width="1.8"/><line x1="${x1}" y1="${y - 4}" x2="${x1}" y2="${y + 4}" stroke="${TEAL}" stroke-width="1.8"/>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The chapter timeline: ten pinned machines at engine-computed x positions on a linear year map over 1940 to 2020, their labels staggered five rows high with stems down to the axis dots. ENIAC of 14 February 1946 and UNIVAC I of 31 March 1951 ride the vacuum-tube first generation band; the Intel 4004 of 15 November 1971 opens the microprocessor fourth band, where the Altair 8800 of the January 1975 cover, the Apple II of 1977, the IBM PC 5150 of 12 August 1981 at 4.77 MHz with 16 KB, the Macintosh of 1984, the Linux kernel of August 1991, the iPhone announced 9 January 2007 and the Raspberry Pi of 29 February 2012 at 35 dollars all sit. Four solid generation bands sit below the axis: tubes 1946 to 1956, transistors 1956 to 1964, integrated circuits 1964 to 1971, microprocessors 1971 onward; at the right a dashed red box marks the honest fifth generation as a label with fuzzy edges, never a crisp switch. Three brackets under the axis band the three lessons' eras: lesson 1.1 the founding structure 1946 to 1951, lesson 1.2 the census and the personal arc 1971 to 2012, lesson 1.3 the invisible half coming of age from 1991.">
  <text x="360" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the chapter timeline: ten pinned machines, four solid generations, three lesson eras</text>
  <text x="360" y="32" font-size="9.5" text-anchor="middle" fill="${TEALINK}">x positions computed linearly from the years over 1940–2020; labels staggered five rows to avoid collisions</text>
  ${stems}
  ${labels}
  ${dots}
  <line x1="${AXIS_X0}" y1="${AX}" x2="${AXIS_X1}" y2="${AX}" stroke="${TEAL}" stroke-width="2.6"/>
  <path d="M ${AXIS_X1} ${AX} l -10 -5 v 10 z" fill="${TEAL}"/>
  ${decadeTicks}
  ${bands}
  ${genText}
  <rect x="580" y="288" width="120" height="30" fill="none" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="6 4"/>
  <text x="640" y="300" font-size="9" font-weight="800" text-anchor="middle" fill="#dc2626">the honest fifth</text>
  <text x="640" y="312" font-size="9" font-weight="800" text-anchor="middle" fill="#dc2626">a label with fuzzy edges</text>
  ${bracket(1946, 1951, 336)}
  <text x="130" y="340" font-size="9" font-weight="700" fill="${TEALINK}">lesson 1.1 · the founding structure — five units, one stored program (1946–1951)</text>
  ${bracket(1971, 2012, 358)}
  <text x="282" y="362" font-size="9" font-weight="700" text-anchor="end" fill="${TEALINK}">lesson 1.2 · the census and the personal arc (1971–2012)</text>
  ${bracket(1991, 2012, 380)}
  <text x="450" y="384" font-size="9" font-weight="700" text-anchor="end" fill="${TEALINK}">lesson 1.3 · the invisible half comes of age (1991 →)</text>
</svg>`
}

/* ---- solution figures (v9.0) — compact, computed geometry ---- */

function generationMatchStripSvg(): string {
  // The generations strip for the matching drill: five pinned machine boxes
  // on the top row, elbow connectors dropping each to its solid generation
  // band (engine-checked: ENIAC and UNIVAC I -> tubes; System/360 -> ICs;
  // the 4004 and the IBM PC 5150 -> microprocessors).
  const W = 720, H = 150
  const BOX_W = 118, BOX_GAP = 20, BOX_X0 = 25, BOX_Y0 = 26, BOX_H = 40
  const entries = [
    { name: 'ENIAC', year: 1946, target: 100 },
    { name: 'UNIVAC I', year: 1951, target: 180 },
    { name: 'System/360', year: 1964, target: 420 },
    { name: 'Intel 4004', year: 1971, target: 540 },
    { name: 'IBM PC 5150', year: 1981, target: 640 },
  ]
  const BAND_Y0 = 100, BAND_Y1 = 140
  const bands = [
    { x0: 25, x1: 240, fill: '#ffedd5', line1: '1st · vacuum tubes', line2: '1946–1956' },
    { x0: 240, x1: 370, fill: '#fef3c7', line1: '2nd · transistors', line2: '1956–1964' },
    { x0: 370, x1: 485, fill: '#ffedd5', line1: '3rd · ICs', line2: '1964–1971' },
    { x0: 485, x1: 695, fill: '#fef3c7', line1: '4th · microprocessors', line2: '1971 →' },
  ]
  const INK = '#166534', TEALINK = '#0f766e', TICK = '#d97706'
  let boxes = ''
  let elbows = ''
  entries.forEach((e, i) => {
    const bx0 = BOX_X0 + i * (BOX_W + BOX_GAP)
    const cx = bx0 + BOX_W / 2
    boxes += `<rect x="${bx0}" y="${BOX_Y0}" width="${BOX_W}" height="${BOX_H}" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
    boxes += `<text x="${cx}" y="44" font-size="10" font-weight="800" text-anchor="middle" fill="${INK}">${e.name}</text>`
    boxes += `<text x="${cx}" y="58" font-size="9" font-weight="700" text-anchor="middle" fill="${TEALINK}">${e.year}</text>`
    elbows += `<path d="M ${cx} ${BOX_Y0 + BOX_H} L ${cx} 80 L ${e.target} 80 L ${e.target} ${BAND_Y0 - 7}" fill="none" stroke="${TICK}" stroke-width="1.4"/>`
    elbows += `<path d="M ${e.target} ${BAND_Y0} l -3.5 -7 v 14 z" fill="${TICK}" transform="rotate(180 ${e.target} ${BAND_Y0 - 3.5})"/>`
  })
  const bandText = bands.map((b) => {
    const cx = (b.x0 + b.x1) / 2
    return `<text x="${cx}" y="118" font-size="9.5" font-weight="800" text-anchor="middle" fill="${INK}">${b.line1}</text><text x="${cx}" y="132" font-size="9" font-weight="700" text-anchor="middle" fill="${TEALINK}">${b.line2}</text>`
  }).join('')
  const bandRects = bands.map((b) => `<rect x="${b.x0}" y="${BAND_Y0}" width="${b.x1 - b.x0}" height="${BAND_Y1 - BAND_Y0}" fill="${b.fill}" stroke="${TICK}" stroke-width="1.5"/>`).join('')
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The generation-matching strip: five pinned machines dropping by elbow connectors onto the four solid generation bands. ENIAC 1946 and UNIVAC I 1951 land in the vacuum-tube first band, System/360 1964 lands in the integrated-circuit third band, and the Intel 4004 of 1971 together with the IBM PC 5150 of 1981 land in the microprocessor fourth band; the transistor second band carries no pinned machine of this drill.">
  <text x="360" y="14" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">the generation-matching drill: five machines, four solid bands</text>
  ${boxes}
  ${elbows}
  ${bandRects}
  ${bandText}
</svg>`
}

function programLifeStripSvg(): string {
  // One program's life through the whole-machine map as a strip: the OS
  // arbitration band above, the five unit doors in a row — input unit,
  // primary memory (program at 100, 101, 102), the control unit's
  // fetch-decode-execute walk, the ALU's arithmetic (sum 332, average 66.4,
  // highest 91), the output unit — accent arrows carrying the life along.
  const W = 720, H = 170
  const OS_Y0 = 26, OS_Y1 = 54
  const BOX_W = 126, BOX_GAP = 14, BOX_X0 = 17, BOX_Y0 = 78, BOX_H = 62
  const stages: { title: string; lines: string[] }[] = [
    { title: 'the INPUT UNIT', lines: ['the keystrokes of', 'the five marks', 'cross in — I'] },
    { title: 'PRIMARY MEMORY', lines: ['the program sits at', '100, 101, 102', 'with the marks — data'] },
    { title: 'the CONTROL UNIT', lines: ['fetch · decode · execute', 'the PC walks', '100 → 101 → 102'] },
    { title: 'the ALU', lines: ['the arithmetic happens:', 'sum 332, average 66.4', 'highest 91 by compare'] },
    { title: 'the OUTPUT UNIT', lines: ['the summary appears:', 'average 66.4', 'highest 91 — O'] },
  ]
  const INK = '#166534', TEALINK = '#0f766e', TEAL = '#0d9488', ARROW = '#ea580c'
  let boxes = ''
  stages.forEach((s, i) => {
    const bx0 = BOX_X0 + i * (BOX_W + BOX_GAP)
    const cx = bx0 + BOX_W / 2
    boxes += `<rect x="${bx0}" y="${BOX_Y0}" width="${BOX_W}" height="${BOX_H}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
    boxes += `<text x="${cx}" y="96" font-size="9.8" font-weight="800" text-anchor="middle" fill="${INK}">${s.title}</text>`
    s.lines.forEach((line, j) => {
      boxes += `<text x="${cx}" y="${110 + j * 12}" font-size="9" text-anchor="middle" fill="${TEALINK}">${line}</text>`
    })
  })
  let arrows = ''
  for (let i = 0; i < stages.length - 1; i++) {
    const x0 = BOX_X0 + i * (BOX_W + BOX_GAP) + BOX_W
    const x1 = x0 + BOX_GAP
    arrows += `<line x1="${x0 + 1}" y1="109" x2="${x1 - 7}" y2="109" stroke="${ARROW}" stroke-width="2.2"/>`
    arrows += `<path d="M ${x1} 109 l -7 -3.5 v 7 z" fill="${ARROW}" transform="rotate(180 ${x1 - 3.5} 109)"/>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One program's life through the whole-machine map: the OS as manager arbitrates every lap from the dashed band above, and the life walks the five unit doors left to right — the keystrokes of the five marks cross in at the input unit, primary memory holds the program at the addresses 100, 101 and 102 with the marks, the control unit walks fetch, decode and execute with the program counter going 100 to 101 to 102, the ALU computes the sum 332 with the average 66.4 and the highest mark 91, and the summary appears at the output unit.">
  <text x="360" y="14" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">one program’s life through the whole-machine map</text>
  <rect x="30" y="${OS_Y0}" width="660" height="${OS_Y1 - OS_Y0}" rx="7" fill="none" stroke="${TEAL}" stroke-width="1.6" stroke-dasharray="6 4"/>
  <text x="360" y="44" font-size="9.5" font-weight="800" text-anchor="middle" fill="${TEALINK}">the OS as MANAGER arbitrates every lap — process, memory, file, device</text>
  <line x1="220" y1="${OS_Y1}" x2="220" y2="${BOX_Y0}" stroke="${TEAL}" stroke-width="1.4" stroke-dasharray="3 3"/>
  <line x1="500" y1="${OS_Y1}" x2="500" y2="${BOX_Y0}" stroke="${TEAL}" stroke-width="1.4" stroke-dasharray="3 3"/>
  ${boxes}
  ${arrows}
  <text x="360" y="158" font-size="9" font-weight="700" text-anchor="middle" fill="${TEALINK}">the PC walk 100 → 101 → 102 — one lap of fetch–decode–execute per instruction</text>
</svg>`
}

function ladderStripSvg(): string {
  // The doubling ladder for the address drill: three bars whose heights are
  // proportional to the line counts (12, 16, 24), each labelled with its
  // reach — 4,096, 65,536, 16,777,216 — and the honest jump annotations
  // (+4 lines = ×16, +8 lines = ×256).
  const W = 720, H = 140
  const BASE_Y = 112, BAR_W = 150, UNIT_H = 2.2
  const bars = [
    { n: 12, reach: '4,096', cx: 150, fill: '#16a34a', stroke: '#166534', label: '12 address lines' },
    { n: 16, reach: '65,536', cx: 360, fill: '#0d9488', stroke: '#0f766e', label: '16 address lines' },
    { n: 24, reach: '16,777,216', cx: 570, fill: '#ea580c', stroke: '#166534', label: '24 address lines' },
  ]
  const INK = '#166534', TEALINK = '#0f766e'
  let barsSvg = ''
  bars.forEach((b) => {
    const h = b.n * UNIT_H
    const y0 = BASE_Y - h
    barsSvg += `<rect x="${b.cx - BAR_W / 2}" y="${+y0.toFixed(1)}" width="${BAR_W}" height="${+h.toFixed(1)}" rx="4" fill="${b.fill}" stroke="${b.stroke}" stroke-width="1.6"/>`
    barsSvg += `<text x="${b.cx}" y="${+(y0 - 5).toFixed(1)}" font-size="9.5" font-weight="800" text-anchor="middle" fill="${INK}">${b.label}</text>`
    barsSvg += `<text x="${b.cx}" y="104" font-size="10" font-weight="800" text-anchor="middle" fill="#ffffff">${b.reach}</text>`
  })
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The doubling ladder recalled for the address drill: three bars with heights proportional to the line counts. Twelve address lines reach 4,096 locations, four thousand ninety-six; sixteen lines reach 65,536, sixty-five thousand five hundred thirty-six; twenty-four lines reach 16,777,216, sixteen million seven hundred seventy-seven thousand two hundred sixteen. The jump annotations price the honest growth: four more lines multiply the reach by sixteen, eight more by two hundred fifty-six — one byte per location throughout.">
  <text x="360" y="16" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">the doubling ladder: every added line doubles the reach</text>
  ${barsSvg}
  <text x="255" y="92" font-size="9" font-weight="700" text-anchor="middle" fill="${TEALINK}">+4 = ×16</text>
  <text x="465" y="92" font-size="9" font-weight="700" text-anchor="middle" fill="${TEALINK}">+8 = ×256</text>
  <text x="360" y="132" font-size="9" font-weight="700" text-anchor="middle" fill="${TEALINK}">12 lines reach 4,096 · 16 reach 65,536 · 24 reach 16,777,216 — one byte per location</text>
</svg>`
}

const lesson1R: Lesson = {
  id: 'cf-unit-1-completion-review',
  number: '1.R',
  title: 'Unit 1 Completion Review',
  concepts: [
    'the whole-machine map: hardware, census and the invisible half in one view',
    'the information processing cycle and the five von Neumann units, revisited',
    'the stored-program concept as the chapter’s hinge',
    'the hardware census: axes, families, generations and Moore’s law',
    'the software half: the operating system as manager',
    'the chapter’s formula and vocabulary harvest',
  ],
  objectives: [
    'by the end you can redraw the whole-machine map — the IPOS spine, the five von Neumann units, the software half layered above — from memory',
    'by the end you can restate the chapter’s engine-pinned numbers cold: the $2^{n}$ ladder, the cycle-time law, the Moore arithmetic',
    'by the end you can file any machine you meet into one of the eleven families and the five generations, axis by axis',
    'by the end you can name the software families and walk the boot sequence from power to login',
    'by the end you can trace one program’s life across hardware and software in one breath, and argue the chapter’s essay honestly',
  ],
  prerequisites: [
    'cf-the-basic-structure-and-operation-of-the-computer',
    'cf-a-census-of-hardware-desktops-to-embedded-chips',
    'cf-software-the-invisible-half-of-the-machine',
  ],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ---------- the opening ----------
    { kind: 'para', text: 'Three lessons ago, the word *computer* meant, at best, a box — something humming on a desk, doing things you could not see. The chapter has spent its whole length widening that word until it cracked open. Lesson 1.1, ‘The Basic Structure and Operation of the Computer’, went inside the box and found a *structure*: the information processing cycle, five functional units, the stored program, the fetch–decode–execute dance, and the measurable machine — clock, word, bus, address space. Lesson 1.2, ‘A Census of Hardware: Desktops to Embedded Chips’, stepped outside and found a *family tree*: four census axes, eleven families, five generations, Moore’s law — from a room of tubes to chips hiding in car doors. Lesson 1.3, ‘Software: the Invisible Half of the Machine’, found the *invisible half* riding both: the operating system as manager, the utilities and drivers, the boot sequence, the license families. A structure, a census, an invisible half — that is what the word *computer* now means. This review’s job is twofold: to put the whole chapter back together in ONE map you can redraw from memory, and then to make you USE it — because a chapter’s content that cannot be used was never learned. Every number below was engine-pinned before this prose was written; the recap is the chapter, restated at bench speed.' },

    // ---------- the one map ----------
    { kind: 'heading', text: 'The Chapter in One Map' },
    { kind: 'figure', caption: 'The whole machine in one map: the information processing cycle as the spine — input through the input unit (I), processing inside the CPU’s control unit and ALU (P), output through the output unit (O), storage in primary memory (S) — the software half above (the applications riding the operating system, its manager, which arbitrates every lap), the three buses joining every unit, and the loop closing as stored results return as input.', svg: wholeMachineMapSvg() },
    { kind: 'para', text: 'Read the map the way it is drawn, top to bottom. Above the hardware sits the invisible half of lesson 1.3: the *applications* you choose — browser, editor, game — riding on the *operating system*, whose five duties (process management, memory management, file management, device management, plus the user interface) make one machine shareable among many programs; the dashed arrow says it plainly — the OS arbitrates every lap the hardware takes. At the centre sits the von Neumann census of lesson 1.1: the **input unit** at the left (keyboard, mouse, touchscreen, sensors — data crossing in), the **CPU** in the middle with the control unit directing above and the arithmetic and logic unit computing below, the **output unit** at the right (screen, printer, speakers — meaning handed out), and **primary memory** below, holding the running program and its data — the seat the stored-program concept made central. The three **buses** — address naming *where*, data carrying *what*, control commanding *when* — join every unit to every other. And over the whole machine runs the spine: the information processing cycle, $I \\to P \\to O \\to S$ — input through the input unit, processing inside the CPU, output through the output unit, storage in memory — closing into the loop, because stored results can be taken as input again. The census of lesson 1.2 is the world outside the map: the eleven families and five generations this one structure wears at every size, from a warehouse of racks to a chip in a door.' },
    { kind: 'callout', tone: 'definition', title: 'The whole machine, defined once', text: 'A computer is said to be a machine that runs the information processing cycle — input, processing, output, storage — on a structure of five von Neumann units (the input unit, the output unit, primary memory, and the CPU’s control unit and arithmetic and logic unit) joined by buses, under the direction of a stored program, with the software half — the operating system and its applications — riding the hardware. Thus the one map is the chapter in a single drawing: the structure, the invisible half, and the census of families waiting outside.' },

    // ---------- lesson 1.1 recap ----------
    { kind: 'heading', text: 'Lesson 1.1 Recap: the Structure and Operation' },
    { kind: 'para', text: 'The first lesson asked how a box of switches comes to seem thoughtful, and answered it with parts and measures. The *cycle* is the rhythm: every run, whatever the machine, follows $I \\to P \\to O \\to S$ — data in, meaning out, kept for later, ready to return. The *five units* are the census that carries the rhythm: the arithmetic and logic unit (ALU), where $62 + 48$ physically happens; the control unit, which fetches, decodes and directs but never computes; primary memory, the working desk that holds the running program and its data; and the input unit and the output unit, the cycle’s first and third beats made of hardware. The *stored-program concept* is the hinge of the whole chapter: instructions live in memory exactly as data does, so a program *is* data — the machine is re-tasked by a change of memory, never by a change of wiring. ENIAC, announced 14 February 1946, filled a room — 17,468 vacuum tubes, ~30 tons, ~150 kW, 5,000 additions per second — yet was re-wired by hand for every new job; UNIVAC I, accepted 31 March 1951 as the first commercial computer, arrived carrying the fix. The *fetch–decode–execute cycle* is the machine’s only dance: the control unit fetches the instruction the program counter names, decodes it, and has the named unit execute it — the PC walking 100, 101, 102, one lap per instruction. And the *measurable machine* gave the first quantitative vocabulary: the clock, with cycle time $T = 1/f$ (the IBM PC 5150’s 4.77 MHz means each beat lasted about 209.6 ns; 2 GHz gives 0.5 ns); the word, the fixed-width parcel (a 64-bit word is 8 bytes); the three buses; and the address space, where $n$ lines name $2^{n}$ locations.' },
    { kind: 'table', caption: 'The lesson 1.1 harvest, one line each: the concept, its one-line essence, and the engine-pinned witness that proves it.', head: ['Concept', 'One-line essence', 'The engine-pinned witness'], rows: [
      ['Information processing cycle', 'Input, processing, output, storage, looping', 'Every run, $I \\to P \\to O \\to S$'],
      ['Five functional units', 'ALU, control unit, memory, input, output', 'The 1945 EDVAC report’s five parts'],
      ['Stored-program concept', 'Instructions live in memory as data', 'UNIVAC I, 31 March 1951'],
      ['Fetch–decode–execute', 'The machine’s only dance, one lap per instruction', 'The PC walks 100 → 101 → 102'],
      ['Clock and cycle time', '$T = 1/f$, seconds per beat', '4.77 MHz ≈ 209.6 ns; 2 GHz → 0.5 ns'],
      ['Word', 'The fixed-width parcel of one move', 'A 64-bit word is 8 bytes'],
      ['Bus', 'Address names where, data carries what', 'Three buses join all five units'],
      ['Address space', '$n$ lines name $2^{n}$ locations', '16 lines → 65,536'],
    ] },
    { kind: 'para', text: 'Three worked recaps keep the numbers honest — the same mark list, the same ladder and the same PC walk the lesson’s engines pinned before any prose was declared done.' },
    { kind: 'example', title: 'Recap Illustration: run the mark list 62, 48, 91, 77, 54 through the whole cycle once more — count, sum, average, highest.', steps: [
      'Take the list as data: five marks — nothing yet attached to them.',
      'So, the sum: $62 + 48 + 91 + 77 + 54 = 332$, and the count is 5.',
      'Now, the average: $332 \\div 5 = 66.4$, and the highest mark, by comparison, is 91 — the five facts have become information.',
      'Hence the summary goes out at the output stage and the file is kept in storage — the earned result, ready to be input again.',
    ] },
    { kind: 'example', title: 'Recap Illustration: an address bus of 12 lines reaches how many locations — and one of 16?', steps: [
      'Take the address-space law: $n$ lines name $2^{n}$ locations.',
      'So, with 12 lines: $2^{12} = 4{,}096$ locations — 4 KB exactly, one byte per location.',
      'Now, with 16 lines: $2^{16} = 65{,}536$ locations — the 64 KB rung of the ladder.',
      'Hence the jump from 12 to 16 lines is ×16: four more lines, sixteen times the reach — 4,096 to 65,536, engine-checked.',
    ] },
    { kind: 'example', title: 'Recap Illustration: walk the three-instruction program (load, add, store) through fetch–decode–execute, the PC starting at 100.', steps: [
      'Take the program as stored: load at 100, add at 101, store at 102 — instructions in memory as data, the stored program at work.',
      'So, lap one: the control unit fetches memory[100], decodes load, and executes — the PC advances to 101.',
      'Now, lap two: fetch at 101, decode add, and the ALU executes — the PC advances to 102.',
      'Hence lap three: fetch at 102, decode store, and memory keeps the result — the PC walks on past, 100 → 101 → 102, one lap per instruction.',
    ] },
    { kind: 'example', title: 'Recap Illustration: the two clock witnesses — the 8088 at 4.77 MHz and a modern 2 GHz machine.', steps: [
      'Take the cycle-time law: $T = 1/f$.',
      'So, the IBM PC 5150’s 8088 at 4.77 MHz: each beat lasted about 209.6 ns — the witness the chapter pinned.',
      'Now, a 2 GHz machine: $T = 0.5$ ns per beat — the doubling of the rate halves the beat.',
      'Hence the honest comparison: each number is tempo, not speed — the law prices the pulse, never the program.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The two cautions that carry forward', text: 'First, clock rate is tempo, not speed: a machine that completes more work per beat can beat a faster-clocked machine, and the honest first approximation is $\\text{instructions per second} \\approx f \\times \\text{IPC}$ — a ballpark, labelled as one, never a measurement. Second, the machine does not understand: fetch, decode, execute, repeat, with perfect discipline and zero comprehension — whatever thoughtfulness you meet at a screen is speed plus structure plus the stored program’s reach, not insight.' },

    // ---------- lesson 1.2 recap ----------
    { kind: 'heading', text: 'Lesson 1.2 Recap: the Hardware Census' },
    { kind: 'para', text: 'The second lesson stepped outside the box and counted what the word *computer* had become. Four *census axes* do the sorting — **form factor** (the shape and size class), **performance** (the work per second), **power budget** (the watts allowed — wall or battery), and **dedication** (one job forever, or anything asked) — and a classification that cannot cite its axis is an opinion, not a census. The *eleven families* run from the desktop tower to the embedded microcontroller, and every row is a compromise: the laptop trades performance for portability, the smartphone trades raw performance for a 3–8 W battery budget, the server trades the single user for many, the mainframe banks on dependable volume, the supercomputer spends everything for peak speed, and the games console sits honestly between families. *Moore’s law* is the growth census: observed 1965, revised 1975 to a doubling every two years — the arithmetic the recap below prices. The *five generations* are the era census: vacuum tubes 1946–1956, transistors about 1956–1964, integrated circuits 1964–1971, microprocessors 1971 onward — and the honest fifth, a label with fuzzy edges, never a crisp switch. The *personal-computing arc* rides the fourth generation: the Altair 8800 (the January 1975 Popular Electronics cover), the Apple II (1977), the IBM PC 5150 (1981), the Macintosh (1984), the iPhone (announced 9 January 2007), the Raspberry Pi (29 February 2012, at 35 dollars). And the *embedded census* is the quiet majority: a typical modern car carries roughly 50–100 electronic control units, premium vehicles up to about 150 — the engine, the brakes, the battery and each door owning one computer apiece.' },
    { kind: 'table', caption: 'The families census recap — one row per family, the axis it gives up and why. Read a row and ask: which prize did this family buy, and which did it sell?', head: ['Family', 'The axis it sacrifices (and why)'], rows: [
      ['Desktop tower', 'Portability — wall power buys raw performance'],
      ['All-in-one desktop', 'Upgradability — fewer cables, sealed slab'],
      ['Laptop', 'Some performance — the battery caps the watts'],
      ['Tablet', 'Creation heft — reading and browsing first'],
      ['Smartphone', 'Raw performance — a 3–8 W budget rules all'],
      ['Workstation', 'Price — one desk buys the heavy jobs'],
      ['Server', 'The single user — it serves many instead'],
      ['Mainframe', 'Flexibility — it banks on dependable volume'],
      ['Supercomputer', 'Everything but speed — a hall, a crew, a bill'],
      ['Games console', 'Dedication wobbles — locked to games, yet desktop-class'],
      ['Embedded MCU / SBC', 'General-purpose use — one job, hidden forever'],
    ] },
    { kind: 'para', text: 'For example, file these everyday machines by the axis each one sacrifices — the test is always the compromise, never a single ranking:' },
    { kind: 'list', marker: 'roman', items: [
      'the phone in your pocket sells raw performance to its battery — the 3–8 W budget shapes its whole personality;',
      'the rack in the machine room sells the single user — it exists to serve thousands arriving at once;',
      'the room-sized batch machine sells flexibility — dependable volume, serviced by its own engineers;',
      'the set-top box under the television sells full dedication — desktop-class parts locked to games and a curated store;',
      'the chip timing the washing drum sells general-purpose use — one job, hidden forever.',
    ] },
    { kind: 'example', title: 'Recap Illustration: match each machine to its generation — ENIAC, UNIVAC I, System/360, the Intel 4004, the IBM PC 5150.', steps: [
      'Take the generation edges as the ruler: tubes 1946–1956, transistors 1956–1964, integrated circuits 1964–1971, microprocessors 1971 onward.',
      'So, ENIAC (1946) and UNIVAC I (1951) sit in the first generation — the vacuum-tube era.',
      'Now, System/360 (1964) sits in the third — the integrated-circuit era; the Intel 4004 (15 November 1971) opens the fourth.',
      'Hence the IBM PC 5150 (12 August 1981) rides the fourth too — the microprocessor generation that still runs.',
    ] },
    { kind: 'example', title: 'Recap Illustration: Moore arithmetic — from the 4004’s 2,300 transistors (1971), what does the revised cadence force by 2011?', steps: [
      'Take the revised cadence: one doubling every two years (Moore, 1965; revised 1975).',
      'So, the span: $2011 - 1971 = 40$ years — twenty doublings.',
      'Now, the growth factor: $2^{20} = 1{,}048{,}576$.',
      'Hence the count: 2,300 × 1,048,576 = 2,411,724,800 — about 2.4 billion transistors, engine-checked digit by digit.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The one discipline behind the census', text: 'Every family is a compromise: a machine can lose on one axis and win on another — which is why eleven families coexist instead of one winner sweeping the board. When you classify a machine, cite the axis: *a smartphone sacrifices raw performance to a 3–8 W battery budget* is a census; *a smartphone is worse than a desktop* is an opinion wearing a census badge. The same discipline dates the generations: the first four are switches of the switching technology, each with a pinned witness; the fifth is branding plus continued scaling — a label with fuzzy edges, drawn dashed and never banded.' },

    // ---------- lesson 1.3 recap ----------
    { kind: 'heading', text: 'Lesson 1.3 Recap: the Invisible Half' },
    { kind: 'para', text: 'The third lesson crossed the boundary the first two had drawn: hardware is structure, software is behaviour, and the stored program is the bridge that lets one fixed structure carry endless behaviours. The census of the invisible half has two great families: *system software*, which manages the machine itself — the operating system, the utilities, the device drivers — and *application software*, the programs you choose for your work. The *operating system* is the manager, and its five duties are worth reciting cold: **process management** (fair turns at the CPU for every running program), **memory management** (each program’s parcel kept apart), **file management** (named storage, found again), **device management** (every keyboard, disk and screen reached through its drivers) — and the *user interface*, the UI, without which the machine would be unusable. *Utilities* do the housekeeping — cleanup, backup, antivirus; *drivers* are the small programs that teach the manager one device’s language. The *boot sequence* is the waking order, and it is fixed because each stage knows only enough to build the next one’s seat: firmware → bootloader → kernel → login. The *platform question* asks which operating system — and which hardware beneath it — a program depends on. And the *license families* are the honesty census of the software world: proprietary (buy permission, source closed), freeware (free to use, source closed), shareware (free to try, pay to keep), open source (source public, licensed to study, change and share).' },
    { kind: 'table', caption: 'The software families recap — one row per member of the invisible half, its one-line essence.', head: ['Software family', 'One-line essence'], rows: [
      ['System software', 'Manages the machine itself — the OS, utilities, drivers'],
      ['Operating system', 'The manager: process, memory, file, device + the UI'],
      ['Utility', 'Housekeeping — cleanup, backup, antivirus'],
      ['Device driver', 'Teaches the OS one device’s language'],
      ['Application software', 'The programs you choose — browser, editor, game'],
      ['Firmware / bootloader', 'The first code that runs, waking the machine'],
      ['Proprietary license', 'Buy permission, source closed, per-seat fees'],
      ['Freeware', 'Free to use, source closed'],
      ['Shareware', 'Free to try, pay to keep'],
      ['Open source', 'Source public — licensed to study, change, share'],
    ] },
    { kind: 'algorithm', title: 'The Boot Sequence, Recalled', lines: [
      { code: 'power arrives — the firmware wakes first', note: 'the factory-fixed code on the board, too small to see' },
      { code: 'the firmware checks the hardware, then hands control to the bootloader', note: 'the check that everything essential answers' },
      { code: 'the bootloader loads the kernel from storage', note: 'the hand-off from the machine’s fixed code to the chosen system' },
      { code: 'the kernel initialises processes, memory, files and devices', note: 'the manager’s duties coming alive one by one' },
      { code: 'login appears — the UI is ready', note: 'the OS begins arbitrating; your programs may now ask' },
    ], note: 'The order is fixed because each stage knows only enough to hand control to the next — nothing later exists until the earlier stage builds its seat. The fetch–decode–execute loop of lesson 1.1 begins its endless laps only when this staircase ends.' },
    { kind: 'example', title: 'Recap Illustration: a user presses the power button — put the four boot stages in order and state each stage’s one job.', steps: [
      'Take the stages as named: the firmware, the bootloader, the kernel, the login screen.',
      'So, first the firmware — the factory-fixed code wakes and checks the hardware.',
      'Now, the bootloader loads the kernel from storage, and the kernel initialises processes, memory, files and devices.',
      'Hence login appears last — the UI ready, and the OS begins arbitrating every lap from here.',
    ] },
    { kind: 'example', title: 'Recap Illustration: classify each described program — (a) the manager giving every program fair turns; (b) the antivirus; (c) the program teaching the manager a new printer’s language; (d) the word processor.', steps: [
      'Take the family test first: does the program manage the machine, or serve the user?',
      'So, (a) is the operating system — system software’s head — and (b) the antivirus is a utility.',
      'Now, (c) is a device driver, teaching the OS the printer’s language.',
      'Hence (d) the word processor is application software — the visible half the user chooses.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'The invisible half’s witnesses', text: 'Two numbers price the invisible half’s scale. The Linux kernel — begun by Linus Torvalds in August 1991 — has crossed about 40,000,000 lines early in 2025: one program, an encyclopaedia of code, built in public under an open-source license. And Android 1.0, released 23 September 2008, rode that kernel onto billions of pocket machines — the invisible half deciding what a *phone* would mean. The invisible half is invisible the way an iceberg’s mass is invisible: the larger part, below the waterline of the screen.' },

    // ---------- the formula harvest ----------
    { kind: 'heading', text: 'The Formula Harvest' },
    { kind: 'para', text: 'A chapter ends by collecting what must travel forward cold. Six cards from the chapter’s formula sheet, restated once — then one derivation recalled in a chain, because the Moore arithmetic is the chapter’s own engine at work.' },
    { kind: 'formula', name: 'The address-space law', latex: '2^{n} \\text{ locations from } n \\text{ address lines}', note: 'every line added doubles the reach — 12 lines reach 4,096; 16 reach 65,536; 20 reach 1,048,576; 24 reach 16,777,216.' },
    { kind: 'formula', name: 'The cycle-time law', latex: 'T = \\frac{1}{f}', note: 'seconds per beat from beats per second — 2 GHz gives 0.5 ns, and the IBM PC 5150’s 4.77 MHz gave about 209.6 ns.' },
    { kind: 'formula', name: 'The Moore growth law', latex: 'N(t) = N_0 \\cdot 2^{\\Delta t/2}', note: 'the 1965 observation revised in 1975: one doubling every two years — twenty doublings in the forty years from the 4004 to 2011.' },
    { kind: 'formula', name: 'The boot order', latex: '\\text{firmware} \\to \\text{bootloader} \\to \\text{kernel} \\to \\text{login}', note: 'the waking order, fixed because each stage knows only enough to build the next one’s seat.' },
    { kind: 'formula', name: 'The IPOS recap', latex: '\\text{input} \\to \\text{processing} \\to \\text{output} \\to \\text{storage}', note: 'the four beats of every run, closing into a loop — stored results can be input again.' },
    { kind: 'formula', name: 'The stored-program identity', latex: '\\text{instructions} \\equiv \\text{data in the one memory}', note: 'the chapter’s hinge: the machine is re-tasked by a change of memory, never of wiring.' },
    { kind: 'derivation', title: 'The Moore growth, recalled in one chain', statement: 'Starting from the Intel 4004’s 2,300 transistors (released 15 November 1971), the revised Moore cadence — one doubling every two years — forces the transistor count after forty years.', steps: [
      { label: 'Span', formula: '\\Delta t = 2011 - 1971 = 40 \\text{ years}', explanation: 'the honest span, pinned at both ends: the 4004’s release year and the census year of the lesson 1.2 computation.' },
      { label: 'Doublings', formula: '20 = \\frac{40}{2}', explanation: 'the revised 1975 cadence — one doubling every two years — turns forty years into twenty doublings.' },
      { label: 'Growth factor', formula: '2^{20} = 1{,}048{,}576', explanation: 'twenty doublings, engine-built by repeated doubling from one — the same ladder the address bus rides.' },
      { label: 'The count', formula: 'N = 2{,}300 \\times 1{,}048{,}576 = 2{,}411{,}724{,}800', explanation: 'the engine-computed product, checked digit by digit — 2,411,724,800 in plain digits.' },
    ], result: 'forty years of the revised cadence force $2{,}300 \times 2^{20} = 2{,}411{,}724{,}800 \approx 2.4 \times 10^{9}$ — about 2.4 billion transistors.' },
    { kind: 'callout', tone: 'insight', title: 'What to carry to chapter 2', text: 'Chapter 2, ‘Interacting with Your Computer’, takes the human side of the map: the input and output devices that carry the cycle’s first and third beats. What travels: the $I \to P \to O \to S$ spine, because every device chapter 2 meets serves one beat of it; the OS’s device management, because the manager’s fourth duty is exactly what those devices plug into; the census axes, because devices get filed by the same four questions; and the two laws — $2^{n}$ and $1/f$ — which price reach and tempo wherever you meet a bus or a clock.' },

    // ---------- the chapter timeline ----------
    { kind: 'heading', text: 'The Chapter Timeline' },
    { kind: 'figure', caption: 'The chapter timeline: the chapter’s ten pinned machines at x positions computed linearly from their years over 1940–2020 — ENIAC 1946 and UNIVAC I 1951 in the tube era, the Intel 4004 1971 opening the microprocessor band where the Altair 8800 (1975), Apple II (1977), IBM PC 5150 (1981), Macintosh (1984), Linux kernel (1991), iPhone (2007) and Raspberry Pi (2012) ride — the four solid generation bands above the axis, the honest fifth drawn dashed with fuzzy edges, and the three lessons’ eras bracketed below.', svg: chapterTimelineSvg() },
    { kind: 'para', text: 'The timeline puts the chapter’s witnesses on one line, left to right. ENIAC (14 February 1946) and UNIVAC I (31 March 1951) ride the vacuum-tube first generation — the founding structure, lesson 1.1’s witnesses, the era the first bracket names. The Intel 4004 (15 November 1971, 2,300 transistors) opens the microprocessor fourth generation, and the personal-computing arc rides it: the Altair 8800’s January 1975 cover, the Apple II 1977, the IBM PC 5150 (12 August 1981, 4.77 MHz, 16 KB), the Macintosh 1984 — then the invisible half comes of age, as the third bracket says: the Linux kernel (August 1991), the iPhone (announced 9 January 2007), the Raspberry Pi (29 February 2012, at 35 dollars). Above the axis sit the four solid generation bands; at the right, the dashed red box is the honest fifth — a label with fuzzy edges, drawn dashed, never banded; below the axis, the three brackets band the three lessons’ eras. Every date on the line was banked in the lesson that earned it; the review only re-arranges the witnesses.' },
    { kind: 'callout', tone: 'historical', title: 'The arc in one breath', text: 'From a room drawing ~150 kW to a 35-dollar credit-card board, in sixty-six years. Moore’s cadence — observed 1965, revised 1975 to a doubling every two years — is the engine of the sweep: twenty doublings from the 4004’s 2,300 transistors force about 2.4 billion, the arithmetic the harvest above pins. The honest note that keeps the timeline true: it is the chapter’s own witness list, nothing more — and that restraint is exactly what a review is for.' },

    // ---------- the vocabulary harvest ----------
    { kind: 'heading', text: 'The Vocabulary Harvest' },
    { kind: 'para', text: 'The chapter’s vocabulary, harvested once — fifteen terms a computer-literate reader owns after unit 1, each definition one self-contained sentence, as the lessons boxed them.' },
    { kind: 'terms', items: [
      { term: 'Information processing cycle', def: 'The information processing cycle is the four-stage rhythm of every computer run — input, processing, output, storage — joined into a loop because stored results can be taken as input again.' },
      { term: 'Stored-program concept', def: 'The stored-program concept is the design in which a program’s instructions are held in the machine’s memory exactly as data is, fetched and executed one by one under the control unit’s direction.' },
      { term: 'Arithmetic and logic unit', def: 'The arithmetic and logic unit (ALU) is the functional unit whose circuits perform the machine’s arithmetic and its logic, the comparisons.' },
      { term: 'Control unit', def: 'The control unit is the functional unit that fetches each instruction, decodes it, and directs the other units to carry it out — the manager that never computes.' },
      { term: 'Bus', def: 'A bus is a shared set of lines that carries bits between the functional units — the address bus naming where, the data bus carrying what, the control bus commanding when.' },
      { term: 'Address space', def: 'The address space is the set of memory locations the address bus can name — $2^{n}$ of them for $n$ address lines, so every line added doubles the reach.' },
      { term: 'Clock rate', def: 'The clock rate is the number of pulses the machine’s clock beats per second, measured in hertz, with the cycle time $T = 1/f$ as its reciprocal.' },
      { term: 'Word', def: 'A word is the machine’s unit of data — the fixed number of bits its registers, buses and memory transfers handle in one move.' },
      { term: 'Moore’s law', def: 'Moore’s law is the 1965 observation, revised in 1975 to a doubling every two years, that the transistor count on an affordable chip grows exponentially.' },
      { term: 'Embedded system', def: 'An embedded system is a small computer hidden inside a larger product to run that one product, unseen by its user.' },
      { term: 'Electronic control unit', def: 'An electronic control unit (ECU) is one small dedicated computer inside a car, of which a typical modern car carries roughly 50–100, up to about 150 in premium vehicles.' },
      { term: 'System software', def: 'System software is the family that manages the machine itself — the operating system, the utilities, and the device drivers.' },
      { term: 'Operating system', def: 'The operating system is the system software that manages the machine’s processes, memory, files and devices, and gives every program fair turns through its drivers.' },
      { term: 'Device driver', def: 'A device driver is the small system program that teaches the operating system one device’s language, so the manager can arbitrate it.' },
      { term: 'Software license', def: 'A software license is the legal statement of what a user may do with a program — the honest families being proprietary, freeware, shareware and open source.' },
    ] },

    // ---------- mixed synthesis ----------
    { kind: 'heading', text: 'Mixed Synthesis' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the chapter’s typology, honestly labelled', text: 'Banking and SSC computer-awareness papers, and school and board computer-science papers, draw on this chapter with a stable typology across all three lessons: (i) ordering the information processing cycle; (ii) unit identification — which unit computes (the ALU), which directs (the control unit), which holds the running program (primary memory); (iii) the stored-program concept — instructions in the same memory as data; (iv) address arithmetic — $2^{n}$ locations from $n$ lines, with $2^{16} = 65{,}536$ the perennial favourite; (v) generation matching — ENIAC the tube witness, the 4004 the microprocessor door; (vi) census counts — roughly 50–100 ECUs in a typical car, up to about 150 in premium vehicles; (vii) software classification — the OS, a utility, a driver, an application; (viii) the boot order; and (ix) the license families. The exercise sets below include items in exactly this style, labelled exam-style — original items in the examination idiom, not real past-paper questions.' },
    { kind: 'para', text: 'From the above discussion, it follows that the word *computer* now names three things at once. It names a **structure**: the information processing cycle running on five von Neumann units joined by three buses, pointed by the program counter through the fetch–decode–execute loop, measured by clock rate ($T = 1/f$), word, bus width and address space ($2^{n}$ locations). It names a **census**: eleven families sorted by four axes, five generations dated from tubes to microprocessors, Moore’s two-year doubling behind the sweep, embedded machines the quiet majority. And it names an **invisible half**: the operating system managing processes, memory, files and devices through drivers, booted in a fixed order, licensed in four honest families. The chapter’s own essay question — how a box of switches comes to seem thoughtful — has the same answer three ways: it is fast, structured and re-taskable; it is shareable; it is everywhere. Not one word of which is *understands*.' },
    { kind: 'list', marker: 'roman', items: [
      'the machine is the cycle on a structure — $I \to P \to O \to S$ on five units joined by buses;',
      'behaviour lives in memory, not wiring — the stored program is the hinge that re-tasks the box overnight;',
      'the measurable machine is tempo, parcel and reach — $T = 1/f$, the word, $2^{n}$;',
      'the census is compromise — four axes, eleven families, each row citing the axis it sacrifices;',
      'the generations are switches with witnesses — tubes, transistors, ICs, microprocessors; the fifth is a label with fuzzy edges;',
      'the invisible half is the manager — five duties, boot order fixed, drivers teaching devices;',
      'the licenses are honesty families — proprietary, freeware, shareware, open source;',
      'the box seems thoughtful because it is fast, structured, re-taskable, shareable and everywhere — not because it understands.',
    ] },

    // ---------- quiz ----------
    { kind: 'quiz', title: 'Check yourself — the chapter in five questions', items: [
      { q: 'Which sequence is the information processing cycle?', options: ['Processing → input → storage → output', 'Input → processing → output → storage', 'Output → storage → input → processing', 'Storage → processing → output → input'], answer: 1, explain: 'Option 2 is the cycle: data enters (input), is transformed (processing), is handed out as meaning (output), and is kept for later (storage) — $I \\to P \\to O \\to S$, the four beats every run follows, closing into a loop. Option 1 begins at processing — impossible, since no data has yet entered the machine to be processed. Option 3 begins at output — output hands out finished results, so nothing can come out before something went in and was worked on. Option 4 begins at storage — storage keeps earned results, and nothing has been earned in the first beat of a run.' },
      { q: 'A machine’s address bus carries 20 lines. How many distinct memory locations can it name?', options: ['512', '20,000', '2,048', '1,048,576'], answer: 3, explain: 'Option 4 is the address-space law: $n$ lines name $2^{n}$ locations, and $2^{20} = 1{,}048{,}576$ — one full MB at one byte per location, the ladder rung the chapter pinned. Option 1’s 512 is $2^{9}$ — the nine-line rung, miscounted on a bus of twenty. Option 2’s 20,000 multiplies the line count by a round thousand — the ladder doubles with every line, it never multiplies by tens. Option 3’s 2,048 is $2^{11}$, the eleven-line rung — off by nine doublings.' },
      { q: 'Which machine marks the start of the microprocessor (fourth) generation?', options: ['The Intel 4004, released 15 November 1971', 'ENIAC, announced 14 February 1946', 'UNIVAC I, accepted 31 March 1951', 'The IBM System/360, announced 1964'], answer: 0, explain: 'Option 1 opens the fourth generation: the Intel 4004, released 15 November 1971 with 2,300 transistors — the first commercial microprocessor, the door the census dates from. Option 2’s ENIAC is the first generation’s witness — 17,468 vacuum tubes, the room-sized founding machine. Option 3’s UNIVAC I (1951) also rides the tube generation, though it carried the first commercial title. Option 4’s System/360 (1964) is the third generation’s witness — integrated circuits, not microprocessors.' },
      { q: 'What does the operating system’s device management actually do?', options: ['It counts the ECUs hiding in a modern car', 'It stores each program’s files as bytes on disk', 'It hands running programs fair turns at the keyboard, disk and screen through drivers', 'It performs the machine’s arithmetic inside the ALU'], answer: 2, explain: 'Option 3 is the duty: device management is the manager’s traffic control — every program gets fair turns at the keyboard, the disk and the screen, each reached through the device driver that teaches the OS that device’s language. Option 1 counts ECUs — the hardware census of lesson 1.2, a fact about cars, not a duty of any OS. Option 2 describes file management — the named-storage duty — a neighbour duty, not the same one. Option 4 sends arithmetic to the ALU — hardware’s job; the OS never computes, it manages.' },
      { q: 'Which of these is a member of the system software family?', options: ['A photo editor', 'The operating system', 'A web browser', 'A spreadsheet program'], answer: 1, explain: 'Option 2 heads the family: the operating system is system software’s chief — the manager that runs the machine itself, with utilities and drivers its relations. Option 1’s photo editor is application software — a program chosen for a job the user wants done. Option 3’s browser is likewise the most-used application of all, not a manager of machines. Option 4’s spreadsheet is an application too; the family test is one question — does it manage the machine, or serve the user?' },
    ] },

    // ---------- exercises ----------
    { kind: 'exercises', title: 'Exercises 1.R — the mixed bench', sets: [
      { level: 'L1', questions: [
        { q: 'Classify each described machine into the hardware families of the census: (a) a pocket slab whose whole personality bends around a 3–8 W battery budget; (b) a room-sized machine serviced by its own engineers, bought for dependable batch volume; (c) a chip hidden inside a washing machine, timing the drum; (d) a rack shelf in a machine room, serving thousands of arriving users.', solution: [
          'Take the four census axes as the checklist — form factor, performance, power budget, dedication.',
          'Now, the pocket slab ruled by its watts is the smartphone; the room with its own engineers is the mainframe.',
          'So, the hidden chip with one job is the embedded microcontroller, and the rack serving many is the server.',
          'Hence four machines, four families — each verdict citing its axis.',
        ], answer: '(a) smartphone, (b) mainframe, (c) embedded microcontroller, (d) server.' },
        { q: 'Classify each described program into the software families of lesson 1.3: (a) the manager that gives every running program fair turns at the machine’s units; (b) a disk-cleanup and backup tool; (c) the small program that teaches the manager a new printer’s language; (d) the word processor this exercise was drafted in.', solution: [
          'Take the family test: does the program manage the machine, or serve the user?',
          'Now, the fair-turns manager is the operating system — system software’s head.',
          'So, the cleanup tool is a utility, and the printer-teaching program a device driver — both system software.',
          'Hence the word processor is application software — the visible half the user chooses.',
        ], answer: '(a) operating system, (b) utility, (c) device driver, (d) application software.' },
      ] },
      { level: 'L2', questions: [
        { q: 'IPOS stage identification: a studio run is described — (a) the microphone takes in the sung take; (b) the processor corrects the pitch of every note; (c) the corrected track plays from the speakers; (d) the take is saved into the session file. Name the stage each act carries.', solution: [
          'Take the four stages as the checklist: input, processing, output, storage.',
          'Now, the microphone taking in the take is input — data crossing in.',
          'So, the pitch correction is processing, and the speakers are output.',
          'Hence the saved take is storage — the earned result kept as future input.',
        ], answer: '(a) input, (b) processing, (c) output, (d) storage — the cycle in order.' },
        { q: 'Unit identification, one line each: (a) which unit holds the running program and its data; (b) which unit performs the arithmetic and the comparisons; (c) which unit fetches and sequences the instructions; (d) which shared roadways carry the bits between them all.', solution: [
          'Take the five units in census order: memory, the ALU, the control unit, the buses.',
          'Now, the running program’s home is primary memory — the stored program’s seat.',
          'So, the arithmetic and the comparisons belong to the arithmetic and logic unit (ALU).',
          'Hence the fetch-and-sequence duty is the control unit’s, and the roadways are the three buses.',
        ], answer: '(a) primary memory, (b) the arithmetic and logic unit (ALU), (c) the control unit, (d) the three buses — address, data, control.' },
      ] },
      { level: 'L3', questions: [
        { q: 'Address arithmetic drill: a controller board carries a 16-line address bus, and a games console carries 24 lines. How many distinct memory locations can each name?', solution: [
          'Take the address-space law: $n$ lines name $2^{n}$ locations.',
          'So, at $n = 16$: $2^{16} = 65{,}536$ locations.',
          'Now, at $n = 24$: $2^{24} = 16{,}777{,}216$ locations.',
          'Hence the board reaches 65,536 and the console 16,777,216 — the ×256 jump of eight more lines, the strip below.',
        ], answer: '65,536 locations; 16,777,216 locations.', figures: [
          { caption: 'The doubling ladder strip: 12 lines reach 4,096, 16 reach 65,536, 24 reach 16,777,216 — four more lines always ×16.', svg: ladderStripSvg() },
        ] },
        { q: 'Moore arithmetic drill: from the Intel 4004’s 2,300 transistors (15 November 1971), how many doublings does the revised cadence force across the forty years to 2011 — and what growth factor is that?', solution: [
          'Take the revised cadence: one doubling every two years.',
          'So, the span: $2011 - 1971 = 40$ years.',
          'Now, the doublings: $40 \div 2 = 20$ of them.',
          'Hence the growth factor: $2^{20} = 1{,}048{,}576$ — the number the full computation rides.',
        ], answer: '20 doublings; a growth factor of 2^20 = 1,048,576.' },
        { q: 'Clock drill: a modern machine runs at 2 GHz. (i) What is its cycle time? (ii) A short program runs 200 instructions, each needing 2 clock cycles — how long does the program take in total?', solution: [
          'Take the cycle-time law: $T = 1/f$.',
          'So, at $f = 2$ GHz: one beat lasts $T = 0.5$ ns.',
          'Now, the program’s work: $200 \times 2 = 400$ cycles.',
          'Hence the total: $400 \times 0.5 = 200$ ns — engine-checked as $200 \times 2 \times 0.5$.',
        ], answer: '(i) 0.5 ns; (ii) 200 ns in total.' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style MCQ chain (original items in the bank/SSC computer-awareness idiom — not a real past paper): (i) match each machine to its generation and name the switching technology — ENIAC; (ii) UNIVAC I; (iii) the IBM System/360; (iv) the Intel 4004; (v) the IBM PC 5150; (vi) name the OS duty that hands running programs fair turns at the keyboard, the disk and the screen.', solution: [
          'Take the generation edges as the ruler: 1946, 1956, 1964, 1971 — tubes, transistors, integrated circuits, microprocessors.',
          'So, ENIAC (1946) and UNIVAC I (1951) sit in the first generation — vacuum tubes.',
          'Now, System/360 (1964) sits in the third — integrated circuits; the 4004 (15 November 1971) opens the fourth — microprocessors.',
          'So, the IBM PC 5150 (12 August 1981, 4.77 MHz, 16 KB) rides the fourth generation too — the strip below.',
          'And (vi) is device management — the OS duty that reaches every device through its drivers and arbitrates fair turns.',
          'Hence five machine matches plus one duty named: the census and the manager, both in the examination idiom.',
        ], answer: 'ENIAC and UNIVAC I → 1st (tubes); System/360 → 3rd (integrated circuits); the 4004 and the IBM PC 5150 → 4th (microprocessors); (vi) device management.', figures: [
          { caption: 'The generation-matching strip: ENIAC 1946 and UNIVAC I 1951 drop into the vacuum-tube first band, System/360 1964 into the integrated-circuit third, the 4004 1971 and the IBM PC 5150 1981 into the microprocessor fourth.', svg: generationMatchStripSvg() },
        ] },
        { q: 'A described machine, filed honestly: a credit-card-sized board with its ports exposed, sold for 35 dollars for learning — the Raspberry Pi of 29 February 2012. File it by family, by generation, and by the axis it sacrifices.', solution: [
          'Take the four axes one at a time: form factor — a credit-card board with ports exposed; performance — modest, honest learning speed; power budget — a few watts from a small supply; dedication — open to anything.',
          'Now, the family: the census’s eleventh seat — the single-board computer, the embedded family’s teaching door.',
          'So, the generation: born 29 February 2012, deep in the microprocessor (fourth) generation.',
          'Hence the axis sacrificed: raw performance — a 35-dollar board buys a doorway into computing, not a workstation.',
        ], answer: 'family: single-board computer; generation: fourth (microprocessors); axis sacrificed: raw performance.' },
        { q: 'Exam-style boot-order item (original item, labelled honestly — not a real past paper): a user presses the power button. Put the four boot stages in honest order, and state each stage’s one job.', solution: [
          'Take the stages as named: the firmware, the bootloader, the kernel, the login screen.',
          'So, the firmware comes first — the factory-fixed code wakes and checks the hardware.',
          'Now, the bootloader loads the kernel from storage, and the kernel initialises processes, memory, files and devices.',
          'Hence login appears last — the UI ready, and the OS begins arbitrating every lap from here.',
        ], answer: 'firmware → bootloader → kernel → login.' },
      ] },
      { level: 'L5', questions: [
        { q: 'The whole-machine trace: walk ONE program’s life through the map — a teacher’s five-mark summary program (the marks 62, 48, 91, 77, 54; the program’s three instructions stored at the addresses 100, 101 and 102) — naming the unit at work at every stage, with the OS arbitrating.', solution: [
          'Take the program’s life in map order: the keystrokes cross in at the input unit — and the OS arbitrates the turn.',
          'So, primary memory holds the program (at 100, 101, 102) and the marks — the stored program at work.',
          'Now, the control unit walks the fetch–decode–execute lap: PC = 100 (fetch the load), PC = 101 (fetch the add), PC = 102 (fetch the store) — the PC advancing one per lap.',
          'Then the ALU does the arithmetic: $62 + 48 + 91 + 77 + 54 = 332$, and $332 \div 5 = 66.4$, with the highest mark 91 found by comparison.',
          'Hence the summary reaches the screen at the output unit, and the file is kept in storage — one program, five doors, the strip below.',
        ], answer: 'the input unit (marks in) → primary memory (program at 100–102) → fetch–decode–execute (PC 100 → 101 → 102) → the ALU (sum 332, average 66.4, highest 91) → the output unit (the summary) — storage keeps the file, and the OS arbitrates throughout.', figures: [
          { caption: 'One program’s life through the five unit doors: the keystrokes in at the input unit, the program held at 100–102 in memory, the control unit’s PC walk, the ALU’s sum 332 and average 66.4, the summary out — the OS arbitrating from above.', svg: programLifeStripSvg() },
        ] },
        { q: 'Licensing and platform synthesis: three software products are described — (a) a bank buys a teller program, locked to one vendor, paid per seat, source closed; (b) a studio gives away a painting tool, source closed, no charge; (c) a community publishes an operating system’s kernel source under a public licence, free to study, change and share. Name each license family — and say what the platform question asks of the bank’s tellers.', solution: [
          'Take the license families as the checklist: proprietary, freeware, shareware, open source.',
          'So, (a) bought per seat with the source closed is the proprietary family; (b) free of charge but still closed is freeware.',
          'Now, (c) — source public, with the rights to study, change and share guaranteed — is open source, the Linux kernel’s road.',
          'Hence the platform question: the teller program runs only on the operating system it was built for — the software’s answer rides on the platform chosen underneath it, hardware and OS together.',
        ], answer: '(a) proprietary, (b) freeware, (c) open source; the platform question asks which operating system — and which hardware under it — the software depends on.' },
        { q: 'The census applied to two machines: ENIAC (announced 14 February 1946, ~30 tons, ~150 kW, 5,000 additions per second) and a smartphone (a pocket slab on a 3–8 W budget). State what can be compared honestly, and what must stay qualitative.', solution: [
          'Take the census axes as the honest ruler: form factor, performance, power budget, dedication.',
          'So, the honest contrasts: a room-sized, wall-powered machine against a pocket slab on a battery — form factor and power budget, both banked as ballparks.',
          'Now, performance: ENIAC’s 5,000 additions per second is pinned; the chapter pinned no pocket figure, so no invented ratio — that comparison stays qualitative.',
          'Hence dedication flips the story last: both machines are general-purpose — the census says which axes moved, never a single ranking.',
        ], answer: 'honest contrasts: form factor (room vs pocket) and power budget (~150 kW from the wall vs a 3–8 W battery); performance stays qualitative — only ENIAC’s 5,000 additions per second is pinned; both are general-purpose.' },
      ] },
      { level: 'L6', questions: [
        { q: 'THE chapter essay: ‘How does a box of switches come to seem thoughtful?’ — argue it through the three lessons, each carrying one move.', solution: [
          'Take the essay’s three moves in chapter order: the structure, the manager, the census.',
          'First move (lesson 1.1): the stored program — behaviour lives in memory, not wiring, so one fixed box of switches can become a different machine overnight; the fetch–decode–execute loop then runs any program with perfect discipline and zero comprehension.',
          'Now, the second move (lesson 1.3): the manager — the operating system makes one machine shareable, arbitrating fair turns at every unit and hiding the hardware’s rough edges behind a usable interface.',
          'So, the third move (lesson 1.2): the census — the same stored-program design scales from a room of tubes to a chip in a door, so the machine is everywhere a person turns.',
          'Hence the thesis: fast, structured, re-taskable, shareable, everywhere — the thoughtfulness is ours, deposited in the program, never the box’s own.',
        ], answer: 'the box seems thoughtful because the stored program makes it re-taskable, the OS makes it shareable, and the census makes it everywhere — speed plus structure plus reach, never comprehension.' },
        { q: 'The honest-label essay: why is the ‘fifth generation’ a label with fuzzy edges, while the first four are census-grade switches? Argue from the chapter’s own criterion.', solution: [
          'Take the chapter’s criterion first: a generation is a switch of the switching TECHNOLOGY — a measurable change in the physical thing that computes.',
          'So, generations one to four pass the test: tubes, transistors, integrated circuits, microprocessors — each a dated physical switch with a pinned witness (ENIAC 1946, the transistor era, System/360 1964, the 4004 of 15 November 1971).',
          'Now, the ‘fifth’ proposes AI-era branding and ULSI scale — but continued scaling is a trend, and branding names a hope; neither is a crisp physical switch with a dated witness.',
          'Hence the honest verdict: the first four are switches, the fifth is a label with fuzzy edges — drawn dashed, never banded, and the honesty itself is part of what the chapter teaches.',
        ], answer: 'the first four generations are technology switches with pinned witnesses; the ‘fifth’ is a label with fuzzy edges — branding plus continued scaling, not a crisp switch — so the chapter draws it dashed, never banded.' },
      ] },
    ] },

    // ---------- the closing ----------
    { kind: 'para', text: 'Which door opens next. Chapter 2, ‘Interacting with Your Computer’, takes the human side of the map: the input and output devices that carry the cycle’s first and third beats — keyboards and pointing devices, scanners, cameras and microphones; monitors and their panels, printers and speakers — with how each actually works, and the first usability instincts, handing off later to Human-Computer Interaction on the shelf. Two doorsteps keep their promises from here: *Operating Systems* takes the manager’s full story — the five duties met as theory and design; *Computer Organization and Architecture* takes the machine’s — the stored-program structure met as engineering. The map is drawn, the census is counted, the invisible half has a name; the word *computer* has earned its width. Carry it whole into chapter 2.' },
  ],
}

export const chapter01: Chapter = {
  number: 1,
  slug: 'the-computing-machine',
  title: 'The Computing Machine',
  summary:
    'The machine met whole: the information processing cycle priced on the mark-list run; data versus information; the five functional units of the von Neumann machine, the stored-program concept that made machines general-purpose, and the fetch–decode–execute loop that is the machine’s life; the measurable machine — clock rate and cycle time, word size, buses and the address-space law; a census of hardware from desktops to embedded chips across the generations; and the software half — the families, the manager layer and licensing honestly — closed by the unit completion review.',
  status: 'complete',
  lessons: [lesson11, lesson12, lesson13, lesson1R],
  plannedLessons: [],
}
