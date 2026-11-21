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


export const chapter01: Chapter = {
  number: 1,
  slug: 'the-computing-machine',
  title: 'The Computing Machine',
  summary:
    'The human side of the machine: input devices (keyboards, pointing devices, scanners, cameras, microphones) and output devices (monitors and their panels, printers, speakers) with how each actually works, plus the first usability instincts — the chapter hands off to Human-Computer Interaction later on the shelf.',
  status: 'in-progress',
  lessons: [lesson11, lesson12],
  plannedLessons: ['Software: the Invisible Half of the Machine'],
}
