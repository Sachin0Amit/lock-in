import type { Chapter, Lesson } from '../../../types'

/**
 * Computer Fundamentals — chapter 2 "Interacting with Your Computer"
 * (opened by the CS RUN 3 SWARM, 2026-11-23 — the cs cron job's third
 * honored fire): two parallel authoring agents, one lesson each —
 * 2.1 'Input Devices: the Human Handshake' (the cf21 agent) and
 * 2.2 'Output Devices: Screens, Printers and Sound' (the cf22 agent) —
 * each with its verify-first engine section grown green BEFORE its prose
 * (the v-cf21/v-cf22 part verifiers, 52 + 58 checks); the orchestrator
 * assembled, gated and shipped this file. Lesson 2.3 + the 2.R review
 * ride the next fires.
 *
 * PROVENANCE: the Drive holds NO Computer Fundamentals source (the honest
 * note in docs/research/CS_TOC_SURVEY.md) — ground = the sanctioned
 * internet fallback: the web-checked canonical arcs banked at planning
 * (citation key `cs-cf-web-ground`, docs/project/SOURCE_LOG.md: the
 * Norton 'Introduction to Computers' ch.2 arc + this run's 2026-11-23
 * web verification of every pinned date/number) + the book's research
 * comment. STUDY-NEVER-REPRODUCE absolute: every roster, family, figure,
 * Illustration, quiz item and exercise is OUR OWN, engine-pinned in
 * scripts/verify-cs-book2-ch02.ts.
 */

// ------------------------------------------------------------------
// lesson 2.1 — authored by the CS RUN 3 swarm (the cf21 agent), integrated verbatim
// ------------------------------------------------------------------
// Input Devices: the Human Handshake — the INPUT half of the human-machine
// handshake: how a press, a flick, a photon and a pressure wave become
// numbers a machine can chew. All pinned numbers are verified green by
// temporary-references/v-cf21.ts (52/52) before this prose was written.

// ------------------------------------------------------------------
// BODY FIGURE 1 — the handshake map (human acts -> input unit -> numbers)
// ------------------------------------------------------------------
function in21HandshakeSvg(): string {
  // Six human acts on the left; the input-unit rail across the middle;
  // one machine box on the right listing the six number streams.
  const W = 720
  const M = 16
  const acts: { act: string; num: string }[] = [
    { act: 'a press', num: 'scan code' },
    { act: 'a move', num: 'counts' },
    { act: 'a flick', num: 'coordinate' },
    { act: 'a scanned page', num: 'pixel grid' },
    { act: 'a photon', num: 'pixel values' },
    { act: 'a pressure wave', num: 'samples' },
  ]
  const boxH = 46
  const gap = 26
  const headY = 44
  const topY = headY + 28
  const span = acts.length * boxH + (acts.length - 1) * gap
  const H = topY + span + M + 8
  const leftW = 170
  const leftX = M
  const railX = 252
  const railW = 46
  const rightX = 462
  const rightW = W - M - rightX
  const arrowX1 = leftX + leftW + 6
  const labelX = railX + railW + (rightX - railX - railW) / 2
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The human handshake map of input devices. On the left, six labelled boxes for human acts: a press, a move, a flick, a scanned page, a photon, a pressure wave. A vertical rail in the middle is labelled the input unit, the cycle’s first beat. Six orange arrows cross the rail into one large green box on the right labelled numbers the machine can chew; the arrows are labelled scan code, counts, coordinate, pixel grid, pixel values and samples, and the right box lists the same six number streams. Every physical act becomes a number stream at the boundary.">`)
  s.push(`<text x="${leftX + leftW / 2}" y="${headY}" text-anchor="middle" font-size="11" letter-spacing="2" font-weight="bold" fill="#0d9488">HUMAN ACTS</text>`)
  s.push(`<text x="${rightX + rightW / 2}" y="${headY}" text-anchor="middle" font-size="11" letter-spacing="2" font-weight="bold" fill="#0d9488">MACHINE NUMBERS</text>`)
  // the machine box (drawn first — the arrows land on its left border)
  s.push(`<rect x="${rightX}" y="${topY - 14}" width="${rightW}" height="${span + 28}" rx="14" fill="#ffffff" stroke="#16a34a" stroke-width="2.5"/>`)
  s.push(`<text x="${rightX + rightW / 2}" y="${topY + 6}" text-anchor="middle" font-size="15" font-weight="bold" fill="#166534">numbers the machine</text>`)
  s.push(`<text x="${rightX + rightW / 2}" y="${topY + 26}" text-anchor="middle" font-size="15" font-weight="bold" fill="#166534">can chew</text>`)
  s.push(`<text x="${rightX + rightW / 2}" y="${topY + 44}" text-anchor="middle" font-size="9.5" fill="#0d9488">one number stream per act</text>`)
  const listTop = topY + 62
  const listStep = (span - 66) / acts.length
  acts.forEach((a, k) => {
    const ry = listTop + k * listStep
    s.push(`<rect x="${rightX + 26}" y="${ry - 8}" width="9" height="9" fill="#16a34a"/>`)
    s.push(`<text x="${rightX + 44}" y="${ry}" font-size="10.5" fill="#0f766e">${a.num}</text>`)
  })
  // the six act boxes + crossing arrows (each arrowhead tip lands ON the machine box border)
  acts.forEach((a, k) => {
    const by = topY + k * (boxH + gap)
    const y = by + boxH / 2
    s.push(`<line x1="${arrowX1}" y1="${y}" x2="${rightX - 12}" y2="${y}" stroke="#d97706" stroke-width="2"/>`)
    s.push(`<polygon points="${rightX},${y} ${rightX - 12},${y - 5.5} ${rightX - 12},${y + 5.5}" fill="#d97706"/>`)
    s.push(`<text x="${labelX}" y="${y - 7}" text-anchor="middle" font-size="10.5" fill="#0f766e">${a.num}</text>`)
    s.push(`<rect x="${leftX}" y="${by}" width="${leftW}" height="${boxH}" rx="10" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>`)
    s.push(`<text x="${leftX + leftW / 2}" y="${by + boxH / 2 + 4.5}" text-anchor="middle" font-size="13" fill="#166534">${a.act}</text>`)
  })
  // the boundary rail, drawn LAST so its opaque band rides OVER the arrows (they pass behind the
  // rail, emerging on both sides) and the rotated label keeps clear air (the VLM-audit fix: the
  // label used to sit in the arrows' path — four arrow lines crossed the glyphs)
  s.push(`<rect x="${railX}" y="${topY - 14}" width="${railW}" height="${span + 28}" rx="12" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>`)
  const railMidY = topY - 14 + (span + 28) / 2
  s.push(`<text x="${railX + railW / 2}" y="${railMidY}" transform="rotate(-90 ${railX + railW / 2} ${railMidY})" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">the input unit — the cycle’s first beat</text>`)
  s.push('</svg>')
  return s.join('')
}

// ------------------------------------------------------------------
// BODY FIGURE 2 — the QWERTY map (3 letter rows, home keys highlighted)
// ------------------------------------------------------------------
function in21KeyboardMapSvg(): string {
  // All geometry derives from the key size, the row letters and the canvas.
  const W = 720
  const M = 16
  const kw = 50
  const kh = 46
  const kgap = 7
  const rows = [
    { keys: 'QWERTYUIOP', stagger: 0, home: [] as number[] },
    { keys: 'ASDFGHJKL;', stagger: 34, home: [0, 1, 2, 3, 6, 7, 8, 9] },
    { keys: 'ZXCVBNM', stagger: 96, home: [] as number[] },
  ]
  const row1W = rows[0].keys.length * kw + (rows[0].keys.length - 1) * kgap
  const baseX = Math.round((W - row1W) / 2)
  const rowY0 = 64
  const rowStep = kh + 16
  const stripX = 160
  const stripW = 400
  const stripY = rowY0 + 3 * rowStep + 4
  const H = 360
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The QWERTY keyboard map. Three rows of key rectangles: the top row has ten letters Q W E R T Y U I O P; the middle row has nine letters A S D F G H J K L plus the semicolon key; the bottom row has seven letters Z X C V B N M. The eight home keys A S D F J K L and semicolon are highlighted in orange; G and H between them are not. A caption strip reads: row one ten, row two nine plus the semicolon key, row three seven, totalling ten plus nine plus seven equals twenty-six letters; the home row holds eight home keys. Two arrows from below show where the left hand and the right hand rest.">`)
  s.push(`<text x="${W / 2}" y="38" text-anchor="middle" font-size="12" font-weight="bold" fill="#0d9488">the QWERTY map — three letter rows, one home row</text>`)
  rows.forEach((r, ri) => {
    const rowX = baseX + r.stagger
    const rowY = rowY0 + ri * rowStep
    for (let k = 0; k < r.keys.length; k++) {
      const kx = rowX + k * (kw + kgap)
      const isHome = r.home.includes(k)
      s.push(`<rect x="${kx}" y="${rowY}" width="${kw}" height="${kh}" rx="7" fill="${isHome ? '#ffedd5' : '#ffffff'}" stroke="${isHome ? '#ea580c' : '#16a34a'}" stroke-width="${isHome ? 2.5 : 2}"/>`)
      s.push(`<text x="${kx + kw / 2}" y="${rowY + kh / 2 + 5.5}" text-anchor="middle" font-size="16" font-weight="${isHome ? 'bold' : 'normal'}" fill="#166534">${r.keys[k]}</text>`)
    }
  })
  // the census caption strip
  s.push(`<rect x="${stripX}" y="${stripY}" width="${stripW}" height="54" rx="8" fill="#fef3c7" stroke="#fcd34d" stroke-width="2"/>`)
  s.push(`<text x="${stripX + stripW / 2}" y="${stripY + 22}" text-anchor="middle" font-size="9.5" fill="#166534">row 1: 10 letters · row 2: 9 · row 3: 7 — 10 + 9 + 7 = 26</text>`)
  s.push(`<text x="${stripX + stripW / 2}" y="${stripY + 42}" text-anchor="middle" font-size="9.5" fill="#0f766e">the home row: A S D F … J K L ; — 8 home keys (G, H between)</text>`)
  // the resting-hand arrows (computed from the home keys of the middle row)
  const midRowX = baseX + rows[1].stagger
  const midRowY = rowY0 + rowStep
  const keyAX = midRowX + kw / 2
  const keySemiX = midRowX + 9 * (kw + kgap) + kw / 2
  const arrowTop = midRowY + kh + 4
  const arrowBot = stripY + 70
  s.push(`<line x1="${keyAX}" y1="${arrowBot}" x2="${keyAX}" y2="${arrowTop + 12}" stroke="#d97706" stroke-width="2"/>`)
  s.push(`<polygon points="${keyAX},${arrowTop} ${keyAX - 5.5},${arrowTop + 12} ${keyAX + 5.5},${arrowTop + 12}" fill="#d97706"/>`)
  s.push(`<line x1="${keySemiX}" y1="${arrowBot}" x2="${keySemiX}" y2="${arrowTop + 12}" stroke="#d97706" stroke-width="2"/>`)
  s.push(`<polygon points="${keySemiX},${arrowTop} ${keySemiX - 5.5},${arrowTop + 12} ${keySemiX + 5.5},${arrowTop + 12}" fill="#d97706"/>`)
  s.push(`<text x="${keyAX}" y="${arrowBot + 18}" text-anchor="middle" font-size="10" fill="#0f766e">the left hand rests on A S D F</text>`)
  s.push(`<text x="${W - M}" y="${arrowBot + 18}" text-anchor="end" font-size="10" fill="#0f766e">the right hand rests on J K L ;</text>`)
  s.push('</svg>')
  return s.join('')
}

// ------------------------------------------------------------------
// BODY FIGURE 3 — the flatbed raster (scan head mid-sweep + optics)
// ------------------------------------------------------------------
function in21ScannerRasterSvg(): string {
  const W = 720
  const M = 16
  const pageW = 186
  const pageH = Math.round((pageW * 11) / 8.5)
  const pageX = M + 6
  const pageY = 92
  const sweepY = pageY + Math.round(pageH * 0.42)
  const cell = 10
  const gridX = pageX + 3
  const gridY = pageY + 3
  const gridRows = Math.floor((sweepY - pageY - 4) / cell)
  const gridCols = Math.floor((pageW - 6) / cell)
  const zoomCell = 16
  const zoomCols = 8
  const zoomRows = 6
  const zoomX = 300
  const zoomY = 176
  const boxW = 80
  const boxH = 46
  const chainY = 64
  const chainLabels = ['lamp', 'mirror', 'lens', 'CCD line sensor']
  const chainXs = [300, 403, 506, 609]
  const H = 352
  const fills = ['#ffffff', '#fef3c7', '#ffedd5', '#fef3c7']
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The flatbed scanner raster. A page lies on the glass in letter proportion; a scanning head, the lamp plus CCD line sensor, sits mid-page mid-sweep; the strip above it has already filled with a pixel grid of small measured squares while the area below is still to be measured. A dashed orange arrow shows the head travelling top to bottom, one sweep line per pass. On the right, the optical path drawn as four connected boxes: lamp, mirror, lens, CCD line sensor. A zoom inset shows eight by six measured squares, each square one measured number, one pixel.">`)
  s.push(`<text x="${M}" y="40" font-size="12" font-weight="bold" fill="#0d9488">a flatbed scanner reads the page one line at a time</text>`)
  s.push(`<text x="${pageX}" y="84" font-size="10" fill="#0d9488">the page on the glass</text>`)
  // the page
  s.push(`<rect x="${pageX}" y="${pageY}" width="${pageW}" height="${pageH}" fill="#ffffff" stroke="#16a34a" stroke-width="2.5"/>`)
  // the measured strip above the head: a filling pixel grid
  for (let r = 0; r < gridRows; r++) {
    for (let col = 0; col < gridCols; col++) {
      const b = (r * 3 + col * 5) % 4
      s.push(`<rect x="${gridX + col * cell}" y="${gridY + r * cell}" width="${cell}" height="${cell}" fill="${fills[b]}" stroke="#5eead4" stroke-width="1.2"/>`)
    }
  }
  s.push(`<text x="${pageX + 6}" y="${pageY + pageH - 10}" font-size="9.5" fill="#0f766e">still to be measured</text>`)
  // the sweeping head (lamp + CCD line sensor)
  s.push(`<rect x="${pageX - 6}" y="${sweepY}" width="${pageW + 12}" height="12" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>`)
  s.push(`<text x="${pageX + 6}" y="${sweepY + 26}" font-size="9.5" fill="#0f766e">lamp + CCD line sensor — the sweeping head</text>`)
  // the dashed travel path, top to bottom
  const travelX = pageX + pageW + 14
  s.push(`<line x1="${travelX}" y1="${pageY}" x2="${travelX}" y2="${pageY + pageH - 10}" stroke="#d97706" stroke-width="1.8" stroke-dasharray="7 6"/>`)
  s.push(`<polygon points="${travelX},${pageY + pageH + 5} ${travelX - 5},${pageY + pageH - 6} ${travelX + 5},${pageY + pageH - 6}" fill="#d97706"/>`)
  const travelMid = pageY + pageH / 2
  s.push(`<text x="${travelX + 16}" y="${travelMid}" transform="rotate(-90 ${travelX + 16} ${travelMid})" text-anchor="middle" font-size="10" fill="#0f766e">one sweep line per pass</text>`)
  // the optical path chain
  s.push(`<text x="${chainXs[0]}" y="52" font-size="10.5" font-weight="bold" fill="#0d9488">the optical head, box by box</text>`)
  chainXs.forEach((cx, i) => {
    s.push(`<rect x="${cx}" y="${chainY}" width="${boxW}" height="${boxH}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>`)
    if (i < 3) {
      s.push(`<text x="${cx + boxW / 2}" y="${chainY + boxH / 2 + 4}" text-anchor="middle" font-size="11" fill="#166534">${chainLabels[i]}</text>`)
    } else {
      s.push(`<text x="${cx + boxW / 2}" y="${chainY + 19}" text-anchor="middle" font-size="10" fill="#166534">CCD line</text>`)
      s.push(`<text x="${cx + boxW / 2}" y="${chainY + 34}" text-anchor="middle" font-size="10" fill="#166534">sensor</text>`)
    }
    if (i < chainXs.length - 1) {
      const ax1 = cx + boxW + 4
      const ax2 = chainXs[i + 1] - 5
      const ay = chainY + boxH / 2
      s.push(`<line x1="${ax1}" y1="${ay}" x2="${ax2 - 8}" y2="${ay}" stroke="#d97706" stroke-width="2"/>`)
      s.push(`<polygon points="${ax2},${ay} ${ax2 - 8},${ay - 4.5} ${ax2 - 8},${ay + 4.5}" fill="#d97706"/>`)
    }
  })
  // the zoom inset: 8 x 6 measured squares
  s.push(`<text x="${zoomX}" y="168" font-size="10.5" font-weight="bold" fill="#0d9488">zoom — 8 x 6 measured squares from the strip</text>`)
  for (let r = 0; r < zoomRows; r++) {
    for (let col = 0; col < zoomCols; col++) {
      const b = (r * 3 + col * 5) % 4
      s.push(`<rect x="${zoomX + col * zoomCell}" y="${zoomY + r * zoomCell}" width="${zoomCell}" height="${zoomCell}" fill="${fills[b]}" stroke="#5eead4" stroke-width="1.2"/>`)
    }
  }
  s.push(`<rect x="${zoomX}" y="${zoomY}" width="${zoomCols * zoomCell}" height="${zoomRows * zoomCell}" fill="none" stroke="#16a34a" stroke-width="2"/>`)
  s.push(`<text x="${zoomX}" y="${zoomY + zoomRows * zoomCell + 16}" font-size="9.5" fill="#0f766e">each square is one measured number — one pixel</text>`)
  s.push(`<text x="${zoomX}" y="${zoomY + zoomRows * zoomCell + 34}" font-size="9.5" fill="#0f766e">the rows stack, line on line, into the full page grid</text>`)
  // the leader from the page’s measured strip to the zoom
  s.push(`<line x1="${gridX + 4 * cell}" y1="${gridY + 15}" x2="${zoomX - 8}" y2="${zoomY + 8}" stroke="#0d9488" stroke-width="1.4" stroke-dasharray="4 4"/>`)
  s.push('</svg>')
  return s.join('')
}

// ------------------------------------------------------------------
// SOLUTION FIGURE — the DPI x4 ladder (150 / 300 / 600 dpi rungs)
// ------------------------------------------------------------------
function in21DpiLadderSvg(): string {
  const W = 760
  const M = 40
  const steps = [
    { dpi: '150 dpi', cell: 12, note: ['a quarter of the 300-dpi', 'census (by the x4 law)'] },
    { dpi: '300 dpi', cell: 8, note: ['US Letter: 2550 x 3300', '= 8,415,000 px'] },
    { dpi: '600 dpi', cell: 6, note: ['5100 x 6600 = 33,660,000', '= 4 x the 300-dpi rung'] },
  ]
  const pw = 96
  const ph = Math.round((pw * 11) / 8.5)
  const gap = (W - 2 * M - 3 * pw) / 2
  const pageY = 52
  const H = 246
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The DPI x4 ladder for one US Letter page. Three page icons at increasing pixel density: 150 dpi, drawn sparsest, noted as holding a quarter of the 300-dpi census by the x4 law; 300 dpi, with 2550 x 3300 equal to 8,415,000 pixels; 600 dpi, with 5100 x 6600 equal to 33,660,000 pixels, four times the 300-dpi rung. The arrows between rungs are labelled linear times two and pixels times four.">`)
  s.push(`<text x="${M}" y="34" font-size="11.5" font-weight="bold" fill="#0d9488">the DPI x4 ladder — one US Letter page, three settings</text>`)
  steps.forEach((st, k) => {
    const px = M + k * (pw + gap)
    s.push(`<rect x="${px}" y="${pageY}" width="${pw}" height="${ph}" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>`)
    const vLines = Math.floor(pw / st.cell)
    const hLines = Math.floor(ph / st.cell)
    for (let i = 1; i < vLines; i++) {
      s.push(`<line x1="${px + i * st.cell}" y1="${pageY}" x2="${px + i * st.cell}" y2="${pageY + ph}" stroke="#5eead4" stroke-width="1.2"/>`)
    }
    for (let j = 1; j < hLines; j++) {
      s.push(`<line x1="${px}" y1="${pageY + j * st.cell}" x2="${px + pw}" y2="${pageY + j * st.cell}" stroke="#5eead4" stroke-width="1.2"/>`)
    }
    s.push(`<text x="${px + pw / 2}" y="${pageY + ph + 20}" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">${st.dpi}</text>`)
    s.push(`<text x="${px + pw / 2}" y="${pageY + ph + 36}" text-anchor="middle" font-size="9.5" fill="#0f766e">${st.note[0]}</text>`)
    s.push(`<text x="${px + pw / 2}" y="${pageY + ph + 49}" text-anchor="middle" font-size="9.5" fill="#0f766e">${st.note[1]}</text>`)
    if (k < steps.length - 1) {
      const ax1 = px + pw + 8
      const ax2 = px + pw + gap - 8
      const ay = pageY + ph / 2
      s.push(`<line x1="${ax1}" y1="${ay}" x2="${ax2 - 10}" y2="${ay}" stroke="#d97706" stroke-width="2"/>`)
      s.push(`<polygon points="${ax2},${ay} ${ax2 - 10},${ay - 5} ${ax2 - 10},${ay + 5}" fill="#d97706"/>`)
      s.push(`<text x="${(ax1 + ax2) / 2}" y="${ay - 8}" text-anchor="middle" font-size="9.5" fill="#d97706">linear x2 · pixels x4</text>`)
    }
  })
  s.push('</svg>')
  return s.join('')
}

// ------------------------------------------------------------------
// SOLUTION FIGURE — the typing-rate strip (60 WPM -> 300/min -> 5/s)
// ------------------------------------------------------------------
function in21TypingRateSvg(): string {
  const W = 760
  const boxW = 170
  const boxH = 64
  const gap = 109
  const x0 = 16
  const y0 = 72
  const boxes = [
    { big: '60', small: 'words per minute' },
    { big: '300', small: 'characters per minute' },
    { big: '5', small: 'characters per second' },
  ]
  const arrowLabels = ['x 5 characters per word', '÷ 60 seconds in a minute']
  const H = 184
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The typing-rate strip. Three green boxes in a chain: 60 words per minute; multiply by 5 characters per word to get 300 characters per minute; divide by the 60 seconds in a minute to get 5 characters per second. A note reads: one word equals 5 characters, the typing-test convention, a ballpark rather than a law.">`)
  s.push(`<text x="${x0}" y="40" font-size="11.5" font-weight="bold" fill="#0d9488">the typing-rate strip: 60 WPM becomes 5 characters each second</text>`)
  boxes.forEach((b, k) => {
    const bx = x0 + k * (boxW + gap)
    s.push(`<rect x="${bx}" y="${y0}" width="${boxW}" height="${boxH}" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="2.5"/>`)
    s.push(`<text x="${bx + boxW / 2}" y="${y0 + 30}" text-anchor="middle" font-size="20" font-weight="bold" fill="#166534">${b.big}</text>`)
    s.push(`<text x="${bx + boxW / 2}" y="${y0 + 50}" text-anchor="middle" font-size="10.5" fill="#0f766e">${b.small}</text>`)
    if (k < boxes.length - 1) {
      const ax1 = bx + boxW + 6
      const ax2 = bx + boxW + gap - 12
      const ay = y0 + boxH / 2
      s.push(`<line x1="${ax1}" y1="${ay}" x2="${ax2 - 10}" y2="${ay}" stroke="#d97706" stroke-width="2"/>`)
      s.push(`<polygon points="${ax2},${ay} ${ax2 - 10},${ay - 5} ${ax2 - 10},${ay + 5}" fill="#d97706"/>`)
      const lx = ax1 + (ax2 - ax1) / 2 + 8
      s.push(`<text x="${lx}" y="${ay - 9}" text-anchor="middle" font-size="9.5" fill="#d97706">${arrowLabels[k]}</text>`)
    }
  })
  s.push(`<text x="${x0}" y="170" font-size="9.5" fill="#0f766e">one word = 5 characters — the typing-test convention (a ballpark, not a law)</text>`)
  s.push('</svg>')
  return s.join('')
}

// ------------------------------------------------------------------
// SOLUTION FIGURE — the home-row strip (8 highlighted home keys)
// ------------------------------------------------------------------
function in21HomeRowSvg(): string {
  const W = 680
  const keys = 'ASDFGHJKL;'
  const home = [0, 1, 2, 3, 6, 7, 8, 9]
  const kw = 56
  const kh = 44
  const kgap = 8
  const total = keys.length * kw + (keys.length - 1) * kgap
  const x0 = (W - total) / 2
  const y0 = 44
  const H = 132
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The home row strip: ten key rectangles in one row, A S D F G H J K L and the semicolon. The eight home keys A S D F J K L and semicolon are highlighted in orange; G and H between them are plain. The caption reads: the home row, eight home keys, with G and H waiting between them.">`)
  s.push(`<text x="${x0}" y="26" font-size="11" font-weight="bold" fill="#0d9488">where the hands rest — the home row</text>`)
  for (let k = 0; k < keys.length; k++) {
    const kx = x0 + k * (kw + kgap)
    const isHome = home.includes(k)
    s.push(`<rect x="${kx}" y="${y0}" width="${kw}" height="${kh}" rx="8" fill="${isHome ? '#ffedd5' : '#ffffff'}" stroke="${isHome ? '#ea580c' : '#16a34a'}" stroke-width="${isHome ? 2.5 : 2}"/>`)
    s.push(`<text x="${kx + kw / 2}" y="${y0 + kh / 2 + 5.5}" text-anchor="middle" font-size="17" font-weight="${isHome ? 'bold' : 'normal'}" fill="#166534">${keys[k]}</text>`)
  }
  s.push(`<text x="${x0}" y="116" font-size="10" fill="#0f766e">the home row: A S D F … J K L ; — 8 home keys, G and H waiting between them</text>`)
  s.push('</svg>')
  return s.join('')
}

// ------------------------------------------------------------------
// SOLUTION FIGURE — the counting mouse (800 CPI x 2 inches ruler)
// ------------------------------------------------------------------
function in21MouseCountsSvg(): string {
  const W = 680
  const M = 40
  const pxPerInch = 280
  const inches = 2
  const rulerY = 84
  const x0 = M
  const x1 = x0 + inches * pxPerInch
  const H = 168
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The counting mouse. A ruler of two inches: an 800 counts-per-inch sensor reports 800 counts over each inch, so the two-inch slide reports 800 times 2 equals 1600 counts in all. The mouse never reports inches — only counts.">`)
  s.push(`<text x="${M}" y="34" font-size="11" font-weight="bold" fill="#0d9488">the counting mouse: an 800-CPI sensor reports counts, not inches</text>`)
  s.push(`<line x1="${x0}" y1="${rulerY}" x2="${x1}" y2="${rulerY}" stroke="#166534" stroke-width="2"/>`)
  for (let i = 0; i <= inches; i++) {
    const tx = x0 + i * pxPerInch
    s.push(`<line x1="${tx}" y1="${rulerY - 7}" x2="${tx}" y2="${rulerY + 7}" stroke="#166534" stroke-width="2"/>`)
    s.push(`<text x="${tx}" y="${rulerY + 22}" text-anchor="middle" font-size="10" fill="#166534">${i} in</text>`)
    if (i < inches) {
      s.push(`<text x="${tx + pxPerInch / 2}" y="${rulerY - 18}" text-anchor="middle" font-size="11" font-weight="bold" fill="#d97706">800 counts</text>`)
    }
  }
  s.push(`<path d="M ${x0} ${rulerY + 40} v 6 H ${x1} v -6" fill="none" stroke="#ea580c" stroke-width="2"/>`)
  s.push(`<text x="${(x0 + x1) / 2}" y="${rulerY + 64}" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">2 inches of slide = 800 x 2 = 1600 counts in all</text>`)
  s.push('</svg>')
  return s.join('')
}

// ------------------------------------------------------------------
// SOLUTION FIGURE — the resolution ladder (VGA in 720p in 1080p)
// ------------------------------------------------------------------
function in21ResolutionLadderSvg(): string {
  const W = 680
  const x0 = 40
  const y0 = 56
  const outerW = 560
  const outerH = Math.round((outerW * 9) / 16)
  const midW = Math.round((outerW * 2) / 3)
  const midH = Math.round((outerH * 2) / 3)
  const vgaScale = Math.sqrt(307200 / 2073600)
  const vgaW = Math.round(outerW * vgaScale)
  const vgaH = Math.round((vgaW * 3) / 4)
  const H = 412
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The pixel-census ladder drawn to scale: nested rectangles anchored at one corner. 1080p, at 1920 x 1080 equals 2,073,600 pixels, contains 720p at 1280 x 720 equals 921,600 pixels, which contains VGA at 640 x 480 equals 307,200 pixels. Each rectangle is drawn to its true pixel-census proportion.">`)
  s.push(`<text x="${x0}" y="36" font-size="11.5" font-weight="bold" fill="#0d9488">the pixel-census ladder, drawn to scale</text>`)
  s.push(`<rect x="${x0}" y="${y0}" width="${outerW}" height="${outerH}" fill="none" stroke="#16a34a" stroke-width="2.5"/>`)
  s.push(`<rect x="${x0}" y="${y0}" width="${midW}" height="${midH}" fill="none" stroke="#0d9488" stroke-width="2"/>`)
  s.push(`<rect x="${x0}" y="${y0}" width="${vgaW}" height="${vgaH}" fill="none" stroke="#ea580c" stroke-width="2"/>`)
  s.push(`<text x="${x0 + 8}" y="${y0 + vgaH - 10}" font-size="9.5" font-weight="bold" fill="#ea580c">VGA — 640 x 480 = 307,200 px</text>`)
  s.push(`<text x="${x0 + 8}" y="${y0 + midH - 12}" font-size="10.5" fill="#0f766e">720p — 1280 x 720 = 921,600 px</text>`)
  s.push(`<text x="${x0 + 8}" y="${y0 + outerH - 12}" font-size="10.5" font-weight="bold" fill="#166534">1080p — 1920 x 1080 = 2,073,600 px</text>`)
  s.push(`<text x="${x0}" y="${y0 + outerH + 24}" font-size="9.5" fill="#0f766e">VGA nests inside 720p nests inside 1080p — 307,200 within 921,600 within 2,073,600 pixels</text>`)
  s.push('</svg>')
  return s.join('')
}

// ------------------------------------------------------------------
// SOLUTION FIGURE — the sampling ruler (1 second of CD-quality stereo)
// ------------------------------------------------------------------
function in21SamplingRulerSvg(): string {
  const W = 680
  const M = 60
  const x1 = 620
  const lanes = [
    { label: 'left channel — 44,100 ticks per second', tickY: 70 },
    { label: 'right channel — 44,100 ticks per second', tickY: 112 },
  ]
  const ticksPerLane = 14
  const spacing = (x1 - M) / (ticksPerLane - 1)
  const H = 200
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One second of CD-quality stereo audio, drawn schematically. Two lanes of tick marks, left channel and right channel, each standing for 44,100 ticks per second; a bracket across the whole second reads two times 44,100 equals 88,200 samples in all. A red note says: not to scale — each lane truly holds 44,100 ticks every second.">`)
  s.push(`<text x="${M}" y="30" font-size="11.5" font-weight="bold" fill="#0d9488">one second of CD-quality stereo — schematically</text>`)
  lanes.forEach((lane) => {
    s.push(`<text x="${M}" y="${lane.tickY - 12}" font-size="10" fill="#166534">${lane.label}</text>`)
    s.push(`<line x1="${M}" y1="${lane.tickY}" x2="${x1}" y2="${lane.tickY}" stroke="#0f766e" stroke-width="1.6"/>`)
    for (let i = 0; i < ticksPerLane; i++) {
      const tx = M + i * spacing
      s.push(`<line x1="${tx}" y1="${lane.tickY - 6}" x2="${tx}" y2="${lane.tickY + 6}" stroke="#0d9488" stroke-width="1.8"/>`)
    }
  })
  s.push(`<path d="M ${M} 136 v 6 H ${x1} v -6" fill="none" stroke="#ea580c" stroke-width="2"/>`)
  s.push(`<text x="${(M + x1) / 2}" y="166" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#166534">one second — 2 x 44,100 = 88,200 samples in all</text>`)
  s.push(`<text x="${(M + x1) / 2}" y="188" text-anchor="middle" font-size="10" fill="#dc2626">not to scale — each lane truly holds 44,100 ticks every second</text>`)
  s.push('</svg>')
  return s.join('')
}

// ------------------------------------------------------------------
// the lesson itself
// ------------------------------------------------------------------
const lesson21: Lesson = {
  id: 'cf-input-devices-the-human-handshake',
  number: '2.1',
  title: 'Input Devices: the Human Handshake',
  concepts: [
    'input devices and the input unit',
    'scan code and the keypress chain',
    'QWERTY and the home row',
    'counts per inch (CPI)',
    'resistive and capacitive touchscreens',
    'scanner resolution, DPI and the ×4 law',
    'cameras, microphones and sampling',
    'the transducer view of input',
  ],
  objectives: [
    'By the end of this lesson you can classify any device as an input device or an output device, and name the physical act it converts.',
    'By the end of this lesson you can trace a keypress from switch to scan code to character, and explain why the keyboard sends positions rather than letters.',
    'By the end of this lesson you can compute pixel censuses — a scanned page at 300 or 600 DPI, a 720p or 1080p frame — and prove the ×4 law for doubled DPI.',
    'By the end of this lesson you can explain resistive and capacitive touchscreens in one sentence each, and say which physical act each one answers.',
    'By the end of this lesson you can compute input data rates: typing speed in characters per second, mouse counts from CPI, and CD-quality stereo samples per second.',
    'By the end of this lesson you can state the transducer view of input: every input device turns a physical act into numbers the machine can chew.',
  ],
  prerequisites: ['cf-the-basic-structure-and-operation-of-the-computer', 'cf-a-census-of-hardware-desktops-to-embedded-chips'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ================================================================
    // 1. THE HANDSHAKE AT THE BOUNDARY
    // ================================================================
    { kind: 'heading', text: 'The Handshake at the Boundary' },
    { kind: 'para', text: 'Chapter 1 drew the machine’s map — the five units, the stored program, the census of hardware from desktop cabinets down to chips inside a kettle. This chapter walks you up to the machine’s front door and asks you to stand exactly where the human meets the machine: the boundary. Every useful thing a computer ever does begins with an act of yours — a press, a slide, a tap, a page laid on glass, a photon arriving at a lens, a sound wave pressing on a diaphragm. Input is the first beat of the cycle you met in chapter 1 — I, then P, then O, then S — and this lesson is its census.' },
    { kind: 'para', text: 'The census we shall walk, in order: keyboards and their kin; pointing devices; touchscreens; scanners; cameras and webcams; microphones; and the sensors hiding inside embedded chips. Each section asks the same three questions. What physical act does the device accept? What numbers does the machine receive in return? And what arithmetic connects the two? By the end, one honest question will have been answered in full: how does a press, a flick, a photon or a pressure wave become numbers a machine can chew?' },
    { kind: 'callout', tone: 'definition', title: 'Definition — input device', text: 'An `input device` is said to be any unit that carries data from the world outside the machine across the boundary and into the machine’s own electrical domain, where the processor can chew it. Thus a keyboard, a mouse, a touchscreen, a scanner, a camera and a microphone are all input devices: each accepts a physical act on one side of the boundary and delivers numbers on the other.' },
    { kind: 'figure', caption: 'Figure 1. The human handshake: six physical acts cross the input-unit rail and arrive as numbers the machine can chew — a press becomes a scan code, a move becomes counts, a flick becomes a coordinate, a page becomes a pixel grid, a photon becomes pixel values, and a pressure wave becomes samples.', svg: in21HandshakeSvg() },
    { kind: 'para', text: 'Figure 1 is the map of everything this lesson does, and it is worth a slow look before any device gets its own section. On the left stand the human acts — a press, a move, a flick, a scanned page, a photon, a pressure wave. The vertical rail is the input unit, the cycle’s first beat, standing exactly where chapter 1 placed it in the machine’s five-unit structure. Six arrows cross the rail, and every arrow carries the same cargo: numbers. Keep this map in view throughout the lesson; each section below is one arrow walked slowly.' },
    { kind: 'terms', items: [
      { term: 'Input device', def: 'any unit that carries data from outside the machine across the boundary into the machine’s electrical domain — a physical act in, numbers out.' },
      { term: 'Input unit', def: 'the unit of the machine that owns the boundary and first receives the numbers — the I of the I→P→O→S cycle, the cycle’s first beat.' },
    ] },

    // ================================================================
    // 2. THE KEYBOARD
    // ================================================================
    { kind: 'heading', text: 'The Keyboard: the Dominant Input Device' },
    { kind: 'para', text: 'Begin with the device under your fingers right now. The keyboard is, by any honest census, the dominant input device of the desktop era: most of the world’s text still enters machines through keyswitches, and even the newest tablet offers an on-screen imitation of the same layout. Yet the mechanism is almost embarrassingly simple. Under each key sits a switch — a small mechanical or membrane contact. Press the key and the switch closes; release it and the switch opens. That closing is a purely physical event; nothing numerical has happened yet, anywhere in the machine.' },
    { kind: 'para', text: 'The numbers arrive one beat later, and that beat deserves a name. When a switch closes, the keyboard’s own small controller reports not a letter but a scan code — a number that names this key, at this position, on this keyboard. The scan code travels down the cable to the keyboard driver, the piece of software that owns the translation; the driver consults the layout in force (QWERTY, Dvorak or any other) and hands a character to the operating system; the operating system delivers it to the window in focus; and the window’s output side — the screen — shows it back to you. The character you see is the last link of a chain that began as a mechanical contact. The algorithm block below walks the whole chain in five lines.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — scan code', text: 'A `scan code` is said to be the number a keyboard’s controller issues when a key is pressed or released — a code that names the key’s position, not the letter printed on it. Thus the same physical press yields the same scan code whatever layout the software later applies; turning the code into a character is software’s business, never the switch’s.' },
    { kind: 'algorithm', title: 'How a keypress becomes a character', lines: [
      { code: 'PRESS    the finger closes the switch under the key', note: 'a mechanical contact — still no numbers anywhere' },
      { code: 'CODE     the keyboard controller issues a scan code', note: 'a number naming THIS key at THIS position — not a letter' },
      { code: 'DRIVER   the keyboard driver looks the code up in the layout', note: 'QWERTY, Dvorak or any other layout is applied here, in software' },
      { code: 'OS       the character is posted to the window in focus', note: 'now it is data the machine can chew' },
      { code: 'ECHO     the screen shows the character back to you', note: 'the output side answers — the handshake closes' },
    ], note: 'The keyboard is a position sensor; the character is software’s verdict on the position.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the keyboard is a position sensor', text: 'The keyboard has no idea what language you are typing. It reports scan codes — positions — and lets software decide what each position means: QWERTY today, Dvorak tomorrow, another layout the day after. Dumb sensor, clever software: that division of labour recurs across the whole input census, and it is worth meeting here first.' },
    { kind: 'callout', tone: 'historical', title: 'QWERTY’s paper trail', text: 'The QWERTY layout was devised in the early 1870s by Christopher Latham Sholes; the patent application was filed in October 1867. The layout won the market with the Remington No. 2 of 1878 — the first typewriter to carry a Shift key, and with it upper and lower case on one set of keys. Every keyboard you have touched since inherits that 1878 arrangement, including the on-screen glass you tap now.' },
    { kind: 'para', text: 'Lay the QWERTY letter rows out on the table and count them — the census is small enough to hold in your head. The top row carries ten letters, Q W E R T Y U I O P; the middle row carries nine, A S D F G H J K L; the bottom row carries seven, Z X C V B N M. Add them: $10 + 9 + 7 = 26$ — the whole English alphabet, once each. Illustration 1 does the counting honestly, and Table 1 files it.' },
    { kind: 'example', title: 'Illustration 1. Count the QWERTY census: three rows, twenty-six letters.', steps: [
      'Take the three letter rows of a QWERTY keyboard as printed: QWERTYUIOP, ASDFGHJKL and ZXCVBNM.',
      'Count each row: the top row carries $10$ letters, the middle row $9$, and the bottom row $7$.',
      'Add them: $10 + 9 + 7 = 26$ letters.',
      'Check: the English alphabet has exactly $26$ letters, and no letter appears twice across the three rows — the census closes.',
      'Hence a full QWERTY letter census is $10 + 9 + 7 = 26$ letters, with the middle row holding the home keys.',
    ] },
    { kind: 'table', caption: 'Table 1. The QWERTY letter census — three rows, twenty-six letters, once each.', head: ['Row', 'Letters as printed', 'Census'], rows: [
      ['Top', 'Q W E R T Y U I O P', '10 letters'],
      ['Middle (the home row)', 'A S D F G H J K L', '9 letters (the ; key sits at the row’s end)'],
      ['Bottom', 'Z X C V B N M', '7 letters'],
      ['All three rows', '10 + 9 + 7', '26 letters — the alphabet, once each'],
    ] },
    { kind: 'para', text: 'Now the row that matters to your hands. The middle row is the home row, and eight of its keys — A S D F for the left hand and J K L ; for the right, with G and H sitting between them, unhomed — are the resting position of trained fingers. Eight home keys: the touch-typist returns to them the way a pianist returns to middle C, and every other key on the board is a reach from one of them. Figure 2 draws the full map with the home keys highlighted and the resting arrows of both hands shown.' },
    { kind: 'figure', caption: 'Figure 2. The QWERTY map: ten, nine and seven letters in the three rows — 26 in all — with the eight home keys A S D F … J K L ; highlighted, and the hands’ resting arrows shown.', svg: in21KeyboardMapSvg() },
    { kind: 'para', text: 'A keyboard is also a data rate, and this is where input becomes arithmetic. Typing speed is quoted in words per minute (WPM), and the convention rounds one word to five characters — a convention of typing tests, honest as a ballpark rather than a law. Take a steady typist at $60$ WPM. Sixty words at five characters each is $60 \\times 5 = 300$ characters per minute; divide by the sixty seconds in a minute and the rate is $300 \\div 60 = 5$ characters per second. Five characters every second is the honest size of a typing data rate — slow, by the machine’s standards, but continuous and entirely yours. Illustration 2 works it as a chain, and equation (1) files the law.' },
    { kind: 'example', title: 'Illustration 2. A typing rate becomes a data rate.', steps: [
      'Take a steady typist at $60$ words per minute, with the standard convention of $5$ characters per word.',
      'Multiply first: $60 \\times 5 = 300$ characters per minute.',
      'Now, divide by the $60$ seconds in a minute: $300 \\div 60 = 5$ characters per second.',
      'Check the scale: one character arrives roughly every time you blink slowly — a human pace, not a machine one.',
      'Hence $60$ WPM $= 300$ characters per minute $= 5$ characters per second.',
    ] },
    { kind: 'equation', latex: 'R = \\frac{\\mathrm{WPM} \\times 5}{60} \\; \\text{characters per second} \\tag{1}', note: 'The typing-rate law: words per minute at the 5-character convention give characters per second — 60 WPM gives 300 per minute and 5 per second.' },
    { kind: 'formula', name: 'The typing-rate law', latex: 'R = \\dfrac{\\mathrm{WPM} \\times 5}{60}', note: 'Characters per second from words per minute: 60 WPM is 300 characters per minute and 5 per second.' },
    { kind: 'para', text: 'Two keyboards deserve a closing word. First, the physical keyswitch keyboard and the on-screen keyboard — the touchscreen imitation drawn in software — are the same device in two bodies: both send scan codes to the same driver, and both are laid out by the same software. Second, QWERTY is not the only layout: Dvorak and other alternative layouts have existed since the 1930s, rearranging the same 26 letters around different home rows. The machine never notices the change — as the algorithm above showed, layout is software’s business, and the scan code stays loyal to position alone.' },
    { kind: 'terms', items: [
      { term: 'Scan code', def: 'the number a keyboard’s controller issues for a key press — it names the key’s position; the letter is decided later, in software.' },
      { term: 'QWERTY', def: 'the dominant Latin-key layout, devised by Christopher Latham Sholes in the early 1870s; its three letter rows carry 10, 9 and 7 letters — 26 in all.' },
      { term: 'Home row', def: 'the middle keyboard row where trained fingers rest: A S D F … J K L ; — eight home keys, with G and H sitting between them.' },
      { term: 'Words per minute (WPM)', def: 'the standard quotation of typing speed; at the 5-characters-per-word convention, 60 WPM is 300 characters per minute — 5 per second.' },
    ] },

    // ================================================================
    // 3. POINTING DEVICES
    // ================================================================
    { kind: 'heading', text: 'Pointing Devices: the Mouse and Its Kin' },
    { kind: 'para', text: 'The mouse has the best origin story in computing, and every date in it is pinned to real paper. The device was born at SRI — the Stanford Research Institute — inside Douglas Engelbart’s team, whose whole programme was augmenting the human intellect with machines. Bill English built the first prototype from Engelbart’s sketches. The patent, US 3,541,541, was applied for in 1967 and received in 1970. And the world met the mouse in public on 9 December 1968, at the ACM/IEEE Fall Joint Computer Conference in San Francisco — the session now remembered as the ‘Mother of All Demos’, where a seated audience watched a hand-sized device steer a cursor across a projected screen for the first time.' },
    { kind: 'callout', tone: 'historical', title: 'The mouse’s paper trail', text: 'The mouse was invented at SRI (the Stanford Research Institute) in Douglas Engelbart’s team; Bill English built the first prototype from Engelbart’s sketches. The patent, US 3,541,541, was applied for in 1967 and received in 1970. The first public demonstration came on 9 December 1968, at the ACM/IEEE Fall Joint Computer Conference in San Francisco — the ‘Mother of All Demos’.' },
    { kind: 'para', text: 'The mouse’s body has evolved through three honest stages, and the evolution is entirely about how motion becomes numbers. The mechanical mouse rolled a ball against two small internal wheels; count each wheel’s turns and you have motion in two directions. The optical mouse threw away the ball and read the desk’s surface with light — a tiny camera watching texture slide by. The laser mouse refined the light source for finer surfaces. The stages are qualitative, not a strict timeline: each replaces a mechanical counting trick with a cleaner optical one, but every stage still ends in the same cargo — counts.' },
    { kind: 'para', text: 'That word counts deserves its formal moment, because it is the whole secret of the device. A modern mouse is a counting device: its resolution is quoted in CPI — counts per inch — the number of distinct motion reports it can issue per inch of travel. Take a typical optical mouse rated at $800$ CPI and slide it two inches to the right. The machine receives not ‘two inches’ but $800 \\times 2 = 1600$ counts — pure numbers, added into the pointer’s position by software. The inch is a human idea; the count is the machine’s. Illustration 3 does the arithmetic.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — counts per inch (CPI)', text: '`Counts per inch` (CPI) is said to be the number of distinct motion reports a pointing device issues for each inch of travel across a surface. Thus an 800-CPI mouse slid through 2 inches reports $800 \\times 2 = 1600$ counts: the machine receives counts to add, never inches to measure.' },
    { kind: 'example', title: 'Illustration 3. The mouse counts its way across the desk.', steps: [
      'Take an $800$-CPI mouse: its sensor reports $800$ counts for every inch of travel.',
      'Move it $2$ inches to the right: the count delivered is $800 \\times 2 = 1600$ counts.',
      'Check the units: counts per inch times inches leaves plain counts — a pure number the machine can add to its pointer position.',
      'So, a $2$-inch slide delivers $1600$ counts, and the machine never sees inches at all — only the count.',
      'Hence motion has become arithmetic: $800 \\text{ CPI} \\times 2 \\text{ inches} = 1600$ counts.',
    ] },
    { kind: 'formula', name: 'The CPI counting law', latex: 'C = \\mathrm{CPI} \\times \\text{inches}', note: 'The mouse reports counts, not motion: an 800-CPI mouse slid 2 inches delivers 1600 counts.' },
    { kind: 'para', text: 'The mouse’s cousins share the one idea, and the census is worth walking. The touchpad — the flat rectangle under your thumbs on a laptop — is a sensing grid whose readings change as the finger slides; the change is counted into motion. The trackball is a mouse turned upside down: the hand rolls the ball and the device counts the roll. The stylus and pen input report a position — and typically pressure too — to a digitizer grid under the glass. Every one of them translates motion into numbers; the census differs only in what the hand moves.' },
    { kind: 'callout', tone: 'insight', title: 'Note — a quiet distinction: relative and absolute', text: 'The mouse and the trackball are relative devices: their counts tell the machine how far you moved, not where you are — lift the mouse and the pointer stays. The touchscreen and the stylus grid are absolute: they name a position on the grid itself. Watch for the change in the next section: a touch is a coordinate, not a count.' },
    { kind: 'terms', items: [
      { term: 'Counts per inch (CPI)', def: 'the number of motion reports a pointing device issues per inch of travel; counts per inch times inches gives counts.' },
      { term: 'Touchpad', def: 'a flat sensing rectangle, typical of laptops, whose grid readings are counted into pointer motion — the mouse’s idea without the mouse.' },
      { term: 'Trackball', def: 'a mouse turned upside down: the hand rolls the ball and the device counts the roll.' },
      { term: 'Stylus', def: 'a pen-shaped pointer that reports position — and typically pressure — to a digitizer grid under the glass.' },
    ] },

    // ================================================================
    // 4. TOUCHSCREENS
    // ================================================================
    { kind: 'heading', text: 'Touchscreens: the Screen Joins the Input Side' },
    { kind: 'para', text: 'The touchscreen collapses the boundary into the glass itself: the same surface is both an input device and an output device, which is why it deserves a slow walk. Two physics families rule the market, and they differ exactly in what physical act they accept. A resistive screen is a sandwich — two thin flexible layers separated by a tiny gap; press, and the layers touch, closing a circuit at that spot. The screen reads pressure, and pressure can come from a fingertip, a stylus, a gloved hand or a fingernail. A capacitive screen carries a transparent field of electrical charge across its face; a bare fingertip — conductive, as you are — disturbs the field, and the glass reads the disturbance. Pressure versus field: that is the whole physics, at concept level.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — capacitive touchscreen', text: 'A `capacitive touchscreen` is said to be a screen whose face carries a transparent electrical field and reports the position where a conductive object — typically a bare fingertip — disturbs it. Thus it answers to the finger’s electrical field rather than to pressure; a gloved hand typically goes unnoticed, while a resistive screen, which closes two layers under pressure, typically answers the glove.' },
    { kind: 'para', text: 'History, pinned. The IBM Simon was released on August 16, 1994, carrying a 4.5-inch resistive touchscreen, and is widely considered the first touchscreen phone — a one-finger, stylus-and-fingertip machine, resistive by the physics above. The modern era belongs to capacitive multi-touch: the capacitive multi-touch era opened in 2007, when a phone you could touch with several fingers at once changed what a phone was. The dates are the witness; the physics is the lesson, and Illustration 4 tests the physics against a single gloved hand.' },
    { kind: 'callout', tone: 'historical', title: 'The Simon: first of its kind', text: 'The IBM Simon was released on August 16, 1994, with a 4.5-inch resistive touchscreen, and is widely considered the first touchscreen phone. The capacitive multi-touch era opened in 2007 — and the touchscreen has been the pocket’s primary input device since.' },
    { kind: 'example', title: 'Illustration 4. Two screens, two physics, one gloved hand.', steps: [
      'Take a resistive screen: it closes when two flexible layers are pressed together, so a gloved fingertip — any firm pressure — works.',
      'Take a capacitive screen next: it reads the fingertip’s electrical field, and an ordinary glove typically blocks that field.',
      'So, the same glove succeeds on one screen and typically fails on the other — pressure versus field, not old versus new.',
      'Hence the two touchscreen families are distinguished by the physical act they convert, and the honest test is a glove.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — do not grade screens by era', text: 'It is tempting to grade resistive as ‘old’ and capacitive as ‘new’, as though quality were a timeline. The honest test is physical: resistive reads pressure, capacitive reads the fingertip’s field. A gloved hand typically works on the first and typically fails on the second — a conversion choice, not a merit badge.' },
    { kind: 'para', text: 'The grid idea is the touchscreen’s arithmetic. Whatever the physics, the report is the same: a coordinate — a pair of numbers naming a position on the screen’s grid. The screen is itself a grid of picture elements (you will meet the pixel formally in the scanner section below, and the whole grid from the output side in lesson 2.2, ‘Output Devices: Screens, Printers and Sound’), and a touch is located as a position on that grid. The boundary moment deserves its own sentence: the same glass is an output device when it shows and an input device when it is touched — one surface, two directions, the handshake folded flat.' },
    { kind: 'terms', items: [
      { term: 'Resistive touchscreen', def: 'a screen of two flexible layers separated by a gap; pressure closes them and the touch position is read from the contact.' },
      { term: 'Capacitive touchscreen', def: 'a screen whose face carries an electrical field; a bare fingertip disturbs the field and the disturbance is located.' },
      { term: 'Multi-touch', def: 'a touchscreen’s ability to report several simultaneous touches — the capacitive era’s signature, opened in 2007.' },
    ] },

    // ================================================================
    // 5. SCANNERS
    // ================================================================
    { kind: 'heading', text: 'Scanners: Reading a Page Line by Line' },
    { kind: 'para', text: 'A scanner is the machine reading a page the way your eye does: light in, numbers out. Take the flatbed apart at concept level and it has four working parts. A lamp — a bright, usually cold, light strip — illuminates one line of the page. A mirror bounces the reflected light. A lens focuses it. And a CCD line sensor — a slim strip of light-sensitive cells — measures the brightness of that one line, cell by cell. The CCD is the heart of the device: the charge-coupled device was invented in 1969 at Bell Labs by Willard Boyle and George E. Smith, and the two shared the 2009 Nobel Prize in Physics for it — a machine part with a Nobel on its shelf.' },
    { kind: 'callout', tone: 'historical', title: 'The CCD and its Nobel', text: 'The charge-coupled device — the CCD — was invented in 1969 at Bell Labs by Willard Boyle and George E. Smith. The two shared the 2009 Nobel Prize in Physics for the invention. Every scanner line-sensor and camera chip in this lesson stands on that one 1969 strip of silicon.' },
    { kind: 'para', text: 'The sweep is the geometry. The whole optical head — lamp, mirror, lens, CCD strip — slides down the page, top to bottom, one line at a time: a raster sweep, the same line-by-line idea you will meet again from the output side in lesson 2.2, ‘Output Devices: Screens, Printers and Sound’. Figure 3 draws it: the head mid-sweep, the strip it has already passed filled with a measured pixel grid, the strip below still waiting, and the dashed arrow showing the direction of travel. Each pass across the page yields one row of measurements; the rows stack into the full grid. Scanning is not one photograph — it is many one-line measurements, stacked.' },
    { kind: 'figure', caption: 'Figure 3. The flatbed raster: the lamp–mirror–lens–CCD head sweeps the page top to bottom, one line per pass; the strip already measured fills with a pixel grid, zoomed at right to eight-by-six measured squares.', svg: in21ScannerRasterSvg() },
    { kind: 'para', text: 'Resolution is where the arithmetic lives, quoted in DPI — dots per inch, the ‘dot’ on a scanner being one measured sample (you will meet it everywhere below as the pixel). Take a US Letter page, $8.5$ inches by $11$ inches, scanned at $300$ DPI — an ordinary setting. The width becomes $8.5 \\times 300 = 2550$ measured columns; the height becomes $11 \\times 300 = 3300$ measured rows; the census is $2550 \\times 3300 = 8{,}415{,}000$ pixels. One page, one ordinary setting: more than eight million measured squares. Now rescan the same page at $600$ DPI: $8.5 \\times 600 = 5100$ and $11 \\times 600 = 6600$, so the census is $5100 \\times 6600 = 33{,}660{,}000$ pixels — four times as many, exactly. Hold that ‘exactly’: it is this section’s law, and the derivation proves it.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — resolution (DPI)', text: '`Resolution`, quoted as `DPI` (dots per inch), is said to be the number of separate samples a scanner measures along each inch of the page. Thus a 300-DPI scan of an $8.5$-inch-by-$11$-inch page measures $8.5 \\times 300 = 2550$ columns and $11 \\times 300 = 3300$ rows, and the census of measured squares follows by multiplication.' },
    { kind: 'example', title: 'Illustration 5. The pixel census of a scanned page.', steps: [
      'Take a US Letter page, $8.5$ inches wide and $11$ inches tall, scanned at $300$ DPI.',
      'Multiply the width by the DPI: $8.5 \\times 300 = 2550$ pixels across.',
      'Multiply the height by the DPI: $11 \\times 300 = 3300$ pixels down.',
      'Now, take the area: $2550 \\times 3300 = 8{,}415{,}000$ pixels.',
      'Hence one ordinary page at one ordinary setting carries $8{,}415{,}000$ measured squares — and the same page at $600$ DPI carries $5100 \\times 6600 = 33{,}660{,}000$.',
    ] },
    { kind: 'derivation', title: 'The DPI ×4 law: why doubling resolution quadruples the census', statement: 'When a page of any size is scanned at $D$ DPI and again at $2D$ DPI, the second scan holds exactly four times as many pixels as the first — whatever the page’s dimensions.', steps: [
      { label: 'Set up the census at D', formula: 'N(D) = (W \\cdot D)\\,(H \\cdot D)', explanation: 'A page $W$ inches wide and $H$ inches tall becomes $W \\cdot D$ measured columns and $H \\cdot D$ measured rows; the census is columns times rows.' },
      { label: 'Double the resolution', formula: 'N(2D) = (W \\cdot 2D)\\,(H \\cdot 2D)', explanation: 'The same page at double the DPI: every linear count — width and height alike — is measured twice as finely.' },
      { label: 'Regroup the factors', formula: 'N(2D) = (2 \\cdot WD)\\,(2 \\cdot HD) = 4\\,(WD)(HD)', explanation: 'Pull the twos out front: one factor of two from the width, one from the height, and $2 \\times 2 = 4$.' },
      { label: 'Read the geometry', formula: 'N(2D) = 4\\,N(D)', explanation: 'The pixel census is an area, and an area scales with the square of its linear scale — tiles on a floor learn the same law when the tiles shrink.' },
    ], result: 'N(2D) = 4\\,N(D): doubling the DPI exactly quadruples the pixel count, for every page size — the ×4 law.' },
    { kind: 'example', title: 'Illustration 6. Double the DPI, quadruple the census.', steps: [
      'Take a $1$-inch square scanned at $300$ DPI: it holds $300 \\times 300 = 90{,}000$ pixels.',
      'Now, rescan the same square at $600$ DPI: $600 \\times 600 = 360{,}000$ pixels.',
      'Compare: $360{,}000 \\div 90{,}000 = 4$ — exactly four times.',
      'Check the sides: the width in pixels doubled ($300 \\to 600$), the height doubled too, and $2 \\times 2 = 4$.',
      'Hence doubling DPI doubles each linear count and quadruples the pixel census — the ×4 law at work on the smallest page there is.',
    ] },
    { kind: 'equation', latex: 'N(2D) = 4\\,N(D) \\tag{2}', note: 'The ×4 law: doubling the DPI of any scan exactly quadruples its pixel census — area scales with the square of the linear scale.' },
    { kind: 'formula', name: 'The pixel census law', latex: 'N = W \\times H', note: 'Pixels in a scan or frame: width times height, each already multiplied by the DPI when scanning — 2550 x 3300 gives 8,415,000.' },
    { kind: 'formula', name: 'The DPI ×4 law', latex: 'N(2D) = 4\\,N(D)', note: 'Doubling the DPI doubles each linear count and quadruples the pixel census — 8,415,000 at 300 DPI becomes 33,660,000 at 600 DPI.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — pixels are not detail', text: 'The ×4 law is honest arithmetic about sampling, not a promise about information. Double the DPI and you quadruple the pixels — of the page as it is, fuzz and all. A blurry original rescanned at 600 DPI holds four times the pixels of blur. Pixels measure the sampling; the page supplies the detail. (The same caution returns in lesson 2.2 from the screen’s side of the boundary.)' },
    { kind: 'para', text: 'Colour deserves its own small census. A scanner measures brightness; to see colour it typically splits the light into three filtered passes — or uses a tri-linear sensor, three CCD strips side by side, one pass and three measurements. Either way, each pixel ends up with three numbers, typically eight bits each: $2^8 = 256$ levels per channel, and three channels give $256 \\times 256 \\times 256 = 2^{24} = 16{,}777{,}216$ distinguishable values per pixel. If chapter 1 taught you the powers of two, this is where they return to work: the machine’s census of colour is a powers-of-two census. Illustration 7 climbs it.' },
    { kind: 'example', title: 'Illustration 7. Three channels, twenty-four bits, one census.', steps: [
      'Take a scanner that stores colour at $24$ bits per pixel — typically $8$ bits for each of three colour channels.',
      'One $8$-bit channel distinguishes $2^8 = 256$ levels.',
      'Combine three channels: $256 \\times 256 \\times 256 = 2^{24} = 16{,}777{,}216$ distinguishable values.',
      'So, every pixel names one value out of $16{,}777{,}216$ — chapter 1’s powers-of-two census returning at the boundary.',
      'Hence $24$-bit colour means $16{,}777{,}216$ values per pixel, $256$ levels per channel.',
    ] },
    { kind: 'formula', name: 'The colour depth law', latex: 'C = 2^{24} = 16{,}777{,}216', note: '24-bit colour: 256 levels per channel across three channels — the powers-of-two census of colour.' },
    { kind: 'para', text: 'Two honest names before we leave the glass. First, resolution is not the same as detail — the caution above holds that line. Second, OCR — optical character recognition — is software, not a device: it turns pictures of characters into characters themselves, and it is the doorstep of chapter 3’s codes, where a ‘character’ becomes a number by agreement. The scanner’s business ends at faithful numbers; interpretation is downstream software’s business, and the next section’s camera shares exactly that division of labour.' },
    { kind: 'terms', items: [
      { term: 'CCD (charge-coupled device)', def: 'the light-measuring strip invented at Bell Labs in 1969 by Willard Boyle and George E. Smith; its inventors shared the 2009 Nobel Prize in Physics.' },
      { term: 'Raster sweep', def: 'the line-by-line reading of a page — one measured line per pass, the rows stacking into the full grid.' },
      { term: 'DPI (dots per inch)', def: 'the resolution of a scan — samples measured along each inch; 300 DPI on US Letter gives 2550 x 3300 = 8,415,000 pixels.' },
      { term: 'OCR (optical character recognition)', def: 'software that turns pictures of characters into characters — the doorstep of chapter 3’s codes.' },
      { term: 'Tri-linear sensor', def: 'three CCD strips side by side, measuring three colour channels in one pass instead of three filtered passes.' },
    ] },

    // ================================================================
    // 6. CAMERAS AND WEBCAMS
    // ================================================================
    { kind: 'heading', text: 'Cameras and Webcams: a Grid of Light Measurements' },
    { kind: 'para', text: 'A camera is an input device — the sentence surprises nobody until you test it against the definition above: light arrives from the world, and numbers cross the boundary into the machine. The anatomy is one line of optics and one grid. A lens focuses the scene onto a sensor grid, and each cell of that grid — whether the CCD you just met or its cousin CMOS — measures the light landing on it. One cell, one number; a whole grid of cells, a whole grid of numbers. A digital photograph is exactly that — a grid of measured values — and it is the doorstep on which chapter 3’s representation of images will stand.' },
    { kind: 'para', text: 'The census runs in pixels, and three rungs cover the honest ladder. A VGA frame — the old webcam standard — is $640 \\times 480 = 307{,}200$ pixels. A 720p frame is $1280 \\times 720 = 921{,}600$ pixels. A 1080p frame is $1920 \\times 1080 = 2{,}073{,}600$ pixels — the same census that lesson 2.2, ‘Output Devices: Screens, Printers and Sound’, will meet from the screen’s side of the boundary. Table 2 lays the ladder out; every rung is the same width-times-height law you used on the scanner, which is why the camera inherits the scanner’s arithmetic wholesale.' },
    { kind: 'table', caption: 'Table 2. The resolution ladder — the pixel census a webcam meets, and lesson 2.2 meets again from the screen’s side.', head: ['Frame', 'Grid (width x height)', 'Pixel census'], rows: [
      ['VGA', '640 x 480', '307,200 pixels'],
      ['720p', '1280 x 720', '921,600 pixels'],
      ['1080p', '1920 x 1080', '2,073,600 pixels'],
    ] },
    { kind: 'example', title: 'Illustration 8. The census of a high-definition frame.', steps: [
      'Take a 1080p frame: $1920$ pixels wide and $1080$ pixels tall.',
      'Multiply: $1920 \\times 1080 = 2{,}073{,}600$ pixels.',
      'Compare with 720p: $1280 \\times 720 = 921{,}600$ pixels.',
      'So, moving up from 720p to 1080p more than doubles the census — $2{,}073{,}600$ against $921{,}600$.',
      'Hence one 1080p frame carries $2{,}073{,}600$ pixel values — the same census lesson 2.2 meets from the screen’s side.',
    ] },
    { kind: 'para', text: 'And the webcam’s first witness is a delight, pinned and true: the world’s first webcam watched a coffee pot. The Trojan Room coffee pot, at the University of Cambridge, was watched from 1991 so that colleagues elsewhere in the building could see whether the pot was full before walking to it; the camera was switched off on 22 August 2001. The lesson inside the anecdote is the lesson of the whole section: a camera is a sensor pointed at the world, and even the world’s most trivial light — a half-empty pot — arrives as numbers.' },
    { kind: 'callout', tone: 'historical', title: 'The first webcam watched a coffee pot', text: 'The world’s first webcam was pointed at the Trojan Room coffee pot at the University of Cambridge, online from 1991, so that colleagues could see whether the pot was worth the walk. The camera was switched off on 22 August 2001. Input devices begin in practicality, not grandeur: the genre’s founding witness is a half-empty pot.' },
    { kind: 'callout', tone: 'insight', title: 'Note — a scanner is a slow camera', text: 'A scanner is a camera that measures one line at a time; a camera is a scanner that grabs the whole grid at once. Both end in exactly the same cargo — a grid of measured values, one number per cell. Only the sweep differs.' },

    // ================================================================
    // 7. MICROPHONES
    // ================================================================
    { kind: 'heading', text: 'Microphones: Pressure Becomes Numbers' },
    { kind: 'para', text: 'Sound is the last physical act on our map, and it is a wave: air pressure rising and falling, thousands of times each second, wherever there is something to hear. The microphone’s job is to turn that pressure into numbers, and two families of mechanism do it. The dynamic microphone is coil-and-magnet: the wave pushes a diaphragm, the diaphragm drags a coil through a magnet’s field, and the moving coil induces a voltage — pressure becomes an electrical signal. The condenser microphone is a charged plate: the wave pushes one plate of a charged capacitor, the capacitance changes, and the change is read as a voltage. Coil-and-magnet versus charged plate — both end in a voltage that mirrors the pressure.' },
    { kind: 'para', text: 'Then comes sampling, the digitizing beat. The machine cannot chew a smooth wave; it measures it — thousands of times each second — and keeps each measurement as a number. The CD-quality standard runs at $44{,}100$ measurements per second per channel, and stereo runs two channels, so a CD-quality stereo stream feeds the machine $44{,}100 \\times 2 = 88{,}200$ samples every second. Say the number slowly: eighty-eight thousand two hundred samples, per second, from two channels of one room. The full theory of sampling — why $44{,}100$, and what a sample can faithfully carry — belongs to lesson 2.2’s output side, where sound returns through speakers; this section needs only the conversion.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — sampling', text: '`Sampling` is said to be the act of measuring a continuous wave at regular, tiny intervals and keeping each measurement as a number. Thus a microphone plus sampling turns a pressure wave into a stream of numbers — $44{,}100$ per second per channel at CD quality, $88{,}200$ for the two channels of stereo.' },
    { kind: 'example', title: 'Illustration 9. Pressure becomes a stereo census.', steps: [
      'Take CD-quality stereo: $44{,}100$ samples per second for each channel.',
      'Count the channels: stereo means two — a left channel and a right channel.',
      'Multiply: $44{,}100 \\times 2 = 88{,}200$ samples per second in total.',
      'So, the microphone’s pressure wave has become a stream of numbers — $88{,}200$ of them every second.',
      'Hence CD-quality stereo feeds the machine $88{,}200$ samples each second.',
    ] },
    { kind: 'formula', name: 'The stereo samples law', latex: 'S = 2 \\times 44{,}100 = 88{,}200', note: 'CD-quality stereo: 44,100 samples per second per channel, two channels — 88,200 samples every second.' },
    { kind: 'para', text: 'Depth is the census’s second half. Each sample is stored in a fixed number of bits, and the depth sets how finely the loudness can be named. An $8$-bit sample distinguishes $2^8 = 256$ levels; a $16$-bit sample distinguishes $2^{16} = 65{,}536$ — two hundred fifty-six times as many. The powers-of-two census from chapter 1 returns here too: audio depth is the same ladder as scanner colour depth, climbed in a different unit. Illustration 10 climbs it once, slowly.' },
    { kind: 'example', title: 'Illustration 10. How many loudnesses can a number name?', steps: [
      'Take a $16$-bit audio sample: each measurement is stored in $16$ bits.',
      'Count the levels: $2^{16} = 65{,}536$ distinguishable values.',
      'Compare with $8$ bits: $2^8 = 256$ levels.',
      'Divide: $65{,}536 \\div 256 = 256$ — a $16$-bit sample distinguishes $256$ times as many levels as an $8$-bit one.',
      'Hence $16$-bit audio names each loudness out of $65{,}536$ possible values — $256$ times the $256$ of $8$-bit.',
    ] },
    { kind: 'para', text: 'One honest naming closes the section. Speech recognition is software, not a microphone: the microphone’s business ends at samples, and the software that turns those numbers back into words is another discipline’s door. The usability questions around speaking to machines belong to lesson 2.3, ‘Interacting Well: the First Usability Instincts’, and beyond it to the shelf’s book ‘Human-Computer Interaction’ — both of which pick up exactly where this census stops.' },
    { kind: 'terms', items: [
      { term: 'Dynamic microphone', def: 'coil-and-magnet: the wave pushes a diaphragm, the moving coil induces a voltage — pressure becomes signal.' },
      { term: 'Condenser microphone', def: 'charged plate: the wave changes the capacitance of a charged plate pair, read as a voltage.' },
      { term: 'Sampling', def: 'measuring a continuous wave at regular, tiny intervals, keeping each measurement as a number.' },
      { term: 'Speech recognition', def: 'software that turns a microphone’s samples back into words — named here, taught elsewhere.' },
    ] },

    // ================================================================
    // 8. SENSORS AND THE WIDER CENSUS
    // ================================================================
    { kind: 'heading', text: 'Sensors and the Wider Census' },
    { kind: 'para', text: 'Step off the desk and the census widens, but the boundary does not change. The barcode reader is a laser sweep over stripes: dark stripes absorb the light, light stripes reflect it, and the pattern of dark and light is read as a code — a number naming a product. The biometric reader is the same idea pointed at you: a fingerprint reader images the ridge pattern of a fingertip and turns it into a template of numbers. And inside the embedded chips that chapter 1’s census met — the ones inside kettles, cars and watches — sit sensors: temperature sensors, motion sensors, accelerometers, each a whole input unit scaled down to a chip’s size. A sensor is an input device the way a keyswitch is one: physical act in, number out.' },
    { kind: 'callout', tone: 'insight', title: 'Note — scale is the only difference', text: 'Chapter 1’s census met embedded chips — whole computers the size of a coin. A temperature sensor beside such a chip is the same unit as the keyboard on your desk, differing only in scale: one physical act in, one number out. The census table’s three columns — device, physical act, numbers — never change width.' },
    { kind: 'para', text: 'The census is honest about its own edges. We have walked keyboards, pointing devices, touchscreens, scanners, cameras, microphones, barcode readers, biometric readers and chip-scale sensors — the working census of the desktop-and-device world, deliberately a first meeting. Deeper doors — digitizer tablets, game controllers, VR gloves, instrument sensors — open elsewhere on the shelf, and each opens onto the same boundary. What never changes, door to door, is the conversion itself: every device on the list accepts a physical act and delivers numbers.' },

    // ================================================================
    // 9. THE INPUT CENSUS (SYNTHESIS)
    // ================================================================
    { kind: 'heading', text: 'The Input Census: Every Device Is a Transducer' },
    { kind: 'para', text: 'From the above discussion, it follows that every input device is at root one machine: a transducer stood at the boundary, converting a physical act — a press, a slide, a touch, a sweep, a photon, a pressure — into numbers the machine can chew. The device’s name tells you the physical act; the number stream’s name — scan code, count, coordinate, pixel, sample, reading — tells you the machine’s side of the handshake. Table 3 files the whole lesson in ten rows, and the roman list beneath it is the take-away list to carry forward.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — transducer', text: 'A `transducer` is said to be any device that converts a physical quantity into another form — in this lesson’s census, into numbers a machine can chew. Thus every input device is a transducer stood at the boundary: the keyboard transduces a press into a scan code, the mouse a slide into counts, the scanner a page into a pixel grid, the microphone a pressure wave into samples.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) Input is the cycle’s first beat: every input device carries a physical act across the boundary as numbers — the I of I→P→O→S.',
      '(ii) The keyboard reports scan codes — positions — and software, never the switch, decides the letter.',
      '(iii) Pointing devices are counters: counts per inch times inches gives counts — $800 \\times 2 = 1600$.',
      '(iv) A touch is a coordinate on a grid; on a touchscreen the same glass serves both directions of the handshake.',
      '(v) A scanner measures a page line by line; the census is width times height at the DPI — $8{,}415{,}000$ pixels at 300 DPI, $33{,}660{,}000$ at 600 DPI, exactly four times.',
      '(vi) A camera is a grid of light measurements — $921{,}600$ pixels at 720p, $2{,}073{,}600$ at 1080p — and a microphone turns pressure into samples, $88{,}200$ per second in CD-quality stereo.',
      '(vii) Every input device is a transducer: physical act in, numbers out — the whole lesson in one line.',
      '(viii) The output half of the handshake — screens, printers, sound — is lesson 2.2’s walk, begun from the other side of the same boundary.',
    ] },
    { kind: 'table', caption: 'Table 3. The input census — every device converts a physical act into numbers the machine can chew.', head: ['Device', 'Physical act it converts', 'Numbers the machine receives'], rows: [
      ['Keyboard', 'a press on a key', 'a scan code, then a character'],
      ['Mouse or touchpad', 'a slide across a surface', 'counts of motion'],
      ['Trackball', 'a roll of the ball', 'counts of motion'],
      ['Touchscreen', 'a touch, a flick', 'a coordinate pair on the grid'],
      ['Scanner', 'light reflecting off a page', 'a grid of pixel values'],
      ['Camera or webcam', 'light arriving through a lens', 'a grid of pixel values'],
      ['Microphone', 'a pressure wave in air', 'a stream of samples'],
      ['Barcode reader', 'a laser sweep over stripes', 'a code read from dark and light'],
      ['Biometric reader', 'a fingertip’s ridge pattern', 'a numeric template'],
      ['Embedded sensor', 'temperature, motion, acceleration', 'a reading — a number'],
    ] },
    { kind: 'para', text: 'The handshake now stands half-complete: you know how the human’s acts become the machine’s numbers. The other half — how the machine’s numbers become human experience again, through screens, printers and speakers — is the very next lesson, 2.2, ‘Output Devices: Screens, Printers and Sound’, which meets the same censuses (pixels, samples) from the other side. Between the two halves sits a question neither can answer alone: how should the handshake be designed so that humans stay comfortable? That is lesson 2.3, ‘Interacting Well: the First Usability Instincts’, and beyond it the shelf’s book ‘Human-Computer Interaction’. For now, one sentence carries the whole lesson: input is a conversion — physical act in, numbers out — performed by a transducer at the boundary, one press, one count, one coordinate, one pixel, one sample at a time.' },

    // ================================================================
    // 10. EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Exam Corner: What the Papers Ask' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — what the papers ask', text: 'Banking and SSC-style computer-awareness papers, and school and board examinations, keep a small and stable set of asks here (all exam-style — original items in the examination idiom, not real past-paper questions): (i) classify-the-device questions — ‘which of the following is an input device?’; (ii) the QWERTY history chain — devised by Sholes in the early 1870s, patent application October 1867, Remington No. 2 of 1878; (iii) the mouse’s inventor-history chain — Engelbart’s team at SRI, patent applied 1967 and received 1970, first public demo 9 December 1968; (iv) resistive versus capacitive — pressure versus field; (v) scanner DPI arithmetic — the ×4 census. Master the input census table above and each of the five asks reduces to a lookup.' },

    // ================================================================
    // 11. CHECK YOUR UNDERSTANDING (QUIZ)
    // ================================================================
    { kind: 'heading', text: 'Check Your Understanding' },
    { kind: 'quiz', items: [
      {
        q: 'Which one of the following is an input device?',
        options: ['A monitor', 'A speaker', 'A keyboard', 'A laser printer'],
        answer: 2,
        explain: 'A keyboard carries data INTO the machine: each press sends a scan code across the boundary, which is the definition of an input device. A monitor and a laser printer only display or print results coming out of the machine, and a speaker turns numbers into sound going out — all three are output devices, the subject of lesson 2.2. Hence only the keyboard qualifies.',
      },
      {
        q: 'You press the A key. What crosses from the keyboard into the operating system first?',
        options: ['A scan code naming the key', 'A pixel of the letter A', 'An audio sample', 'A print job'],
        answer: 0,
        explain: 'The keyboard’s controller issues a scan code — a number naming the key’s position — and the driver translates it into a character afterwards. A pixel is a picture element on the output side, not something a keyboard sends. An audio sample belongs to a microphone’s stream, and a print job belongs to printers. Hence the first crossing is the scan code.',
      },
      {
        q: 'A page is scanned at 300 DPI and rescanned at 600 DPI. The pixel census becomes —',
        options: ['exactly 2 times larger', 'exactly 4 times larger', 'exactly 8 times larger', 'unchanged'],
        answer: 1,
        explain: 'Doubling the DPI doubles the linear count in both directions — width and height — and 2 × 2 = 4, the ×4 law derived in this lesson ($8{,}415{,}000$ pixels become $33{,}660{,}000$). Two times would ignore the second dimension; eight or sixteen times has no source in the geometry; and ‘unchanged’ contradicts the arithmetic outright. Hence the census is exactly four times larger.',
      },
      {
        q: 'The IBM Simon, released on August 16, 1994, carried which kind of touchscreen?',
        options: ['A capacitive multi-touch screen', 'A resistive touchscreen', 'A laser-projected keyboard', 'A CCD line sensor'],
        answer: 1,
        explain: 'The Simon carried a 4.5-inch resistive touchscreen — the pressure-reading sandwich — and is widely considered the first touchscreen phone. The capacitive multi-touch era opened later, in 2007, so option (a) names the wrong era. A laser-projected keyboard is an input gadget rather than a screen technology, and a CCD line sensor is a scanner’s measuring strip, not a touchscreen. Hence the Simon was resistive.',
      },
      {
        q: 'How many pixels does one 1920 × 1080 frame carry?',
        options: ['307,200', '921,600', '16,777,216', '2,073,600'],
        answer: 3,
        explain: 'The census is width times height: $1920 \\times 1080 = 2{,}073{,}600$ pixels. The distractors are censuses borrowed from elsewhere in the lesson: $307{,}200$ is a VGA frame ($640 \\times 480$), $921{,}600$ is 720p ($1280 \\times 720$), and $16{,}777{,}216$ is the 24-bit colour count, not a pixel census. Hence one 1080p frame carries $2{,}073{,}600$ pixels.',
      },
    ] },

    // ================================================================
    // 12. PRACTICE SETS (15 exercises: L1x2, L2x2, L3x3, L4x3, L5x3, L6x2)
    // ================================================================
    { kind: 'heading', text: 'Practice Sets' },
    { kind: 'para', text: 'The sets below climb the shelf’s six rungs, L1 to L6: L1 begins, L2 consolidates, L3 advances, L4 trains the examination idiom (every L4 item is exam-style — an original item in the examination idiom, not a real past-paper question), L5 works at professional depth, and L6 argues and proves. Work every solution chain with a pencil; the connectives are the method, and the figures inside the solutions are the arithmetic drawn.' },
    { kind: 'exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'A US Letter page measures $8.5$ inches by $11$ inches. It is scanned once at $300$ DPI and once at $600$ DPI. Find the pixel census of each scan, and state how the two censuses compare.',
            solution: [
              'Take the page: $8.5$ inches wide, $11$ inches tall, scanned first at $300$ DPI.',
              'Multiply the width: $8.5 \\times 300 = 2550$ pixels across.',
              'Multiply the height: $11 \\times 300 = 3300$ pixels down.',
              'Now, take the area: $2550 \\times 3300 = 8{,}415{,}000$ pixels — the 300-DPI census.',
              'Repeat at $600$ DPI: $8.5 \\times 600 = 5100$ and $11 \\times 600 = 6600$, so the census is $5100 \\times 6600 = 33{,}660{,}000$ pixels.',
              'Compare: $33{,}660{,}000 \\div 8{,}415{,}000 = 4$ — exactly four times, the ×4 law.',
              'Hence the page holds $8{,}415{,}000$ pixels at $300$ DPI and $33{,}660{,}000$ at $600$ DPI. (The ladder figure shows the two pinned rungs side by side.)',
            ],
            answer: '300 DPI: 2550 × 3300 = 8,415,000 px; 600 DPI: 5100 × 6600 = 33,660,000 px — exactly 4×.',
            figures: [
              { caption: 'The ×4 ladder for one US Letter page: each doubling of DPI doubles the linear counts and quadruples the census — 8,415,000 at the 300-DPI rung, 33,660,000 at the 600-DPI rung.', svg: in21DpiLadderSvg() },
            ],
          },
          {
            q: 'A typist sustains $60$ words per minute at the standard $5$ characters per word. Express this as a character rate per minute and per second.',
            solution: [
              'Take the given rate: $60$ words per minute, at the convention of $5$ characters per word.',
              'Multiply: $60 \\times 5 = 300$ characters per minute.',
              'Now, divide by the $60$ seconds in a minute: $300 \\div 60 = 5$ characters per second.',
              'Check the scale: one character every fifth of a second — a human pace, continuous and unhurried.',
              'Hence $60$ WPM is $300$ characters per minute, or $5$ characters per second. (The strip figure shows the two conversions end to end.)',
            ],
            answer: '60 WPM × 5 = 300 characters per minute = 5 characters per second.',
            figures: [
              { caption: 'The typing-rate strip: 60 words per minute, times 5 characters per word, gives 300 characters per minute — and 5 every second.', svg: in21TypingRateSvg() },
            ],
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'An $800$-CPI mouse is slid $2$ inches to the right. How many counts does it report? If the same mouse were slid twice as far, what would happen to the count?',
            solution: [
              'Take the mouse: its sensor reports $800$ counts for every inch of travel.',
              'Multiply by the distance: $800 \\times 2 = 1600$ counts for the $2$-inch slide.',
              'Now, consider twice the distance: twice the inches at the same CPI gives twice the counts — the count tracks the distance.',
              'Check the units: counts per inch times inches leaves plain counts, a pure number the machine adds to the pointer position.',
              'Hence the $2$-inch slide reports $1600$ counts, and a slide twice as far would report twice as many. (The ruler figure shows the two inches as two 800-count segments.)',
            ],
            answer: '800 CPI × 2 inches = 1600 counts; twice the distance would give twice the counts.',
            figures: [
              { caption: 'The counting mouse: an 800-CPI sensor reports 800 counts per inch, so the 2-inch slide reports 1600 counts in all.', svg: in21MouseCountsSvg() },
            ],
          },
          {
            q: 'Count the letters on the three QWERTY letter rows, verify the total, and name the eight home keys.',
            solution: [
              'Take the three rows as printed: QWERTYUIOP, ASDFGHJKL, ZXCVBNM.',
              'Count each row: $10$, $9$ and $7$ letters.',
              'Add them: $10 + 9 + 7 = 26$ letters.',
              'Check: the English alphabet has exactly $26$ letters and none repeats across the rows, so the census closes at $26$.',
              'Hence the rows carry $26$ letters, and the home keys are A S D F … J K L ; — eight of them, with G and H between. (The strip figure shows the eight highlighted.)',
            ],
            answer: '10 + 9 + 7 = 26 letters; home keys: A S D F … J K L ; (8 keys).',
            figures: [
              { caption: 'The home row at a glance: eight highlighted home keys — A S D F … J K L ; — with G and H unhighlighted between them.', svg: in21HomeRowSvg() },
            ],
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'Compute the pixel census of a 1080p frame ($1920 \\times 1080$) and of a 720p frame ($1280 \\times 720$), and compare them.',
            solution: [
              'Take 1080p first: $1920$ pixels wide and $1080$ pixels tall.',
              'Multiply: $1920 \\times 1080 = 2{,}073{,}600$ pixels.',
              'Now, take 720p: $1280 \\times 720 = 921{,}600$ pixels.',
              'Compare: $2{,}073{,}600$ against $921{,}600$ — the 1080p census is a little over twice the 720p census.',
              'Hence a 1080p frame carries $2{,}073{,}600$ pixels against 720p’s $921{,}600$. (The ladder figure draws all three rungs to scale.)',
            ],
            answer: '1080p: 2,073,600 px; 720p: 921,600 px — 1080p carries a little over twice as many.',
            figures: [
              { caption: 'The pixel-census ladder drawn to scale: VGA (307,200 pixels) inside 720p (921,600) inside 1080p (2,073,600).', svg: in21ResolutionLadderSvg() },
            ],
          },
          {
            q: 'Classify each of the following as an input device or an output device: (i) a keyboard, (ii) a monitor, (iii) a barcode reader, (iv) a speaker.',
            solution: [
              'Take each device in turn and ask only one question: does data cross INTO the machine, or OUT of it?',
              '(i) A keyboard: each press sends a scan code in — an input device.',
              '(ii) A monitor: it shows results coming out — an output device (lesson 2.2’s territory).',
              '(iii) A barcode reader: it sweeps stripes and sends a code in — an input device.',
              '(iv) A speaker: it turns numbers into sound going out — an output device.',
              'Hence (i) and (iii) are input devices; (ii) and (iv) are output devices.',
            ],
            answer: 'Input devices: the keyboard and the barcode reader; output devices: the monitor and the speaker.',
          },
          {
            q: 'A scanner stores each pixel’s colour in $24$ bits. How many distinguishable colour values can one pixel take, and how many levels does each colour channel carry?',
            solution: [
              'Take the $24$ bits as three $8$-bit colour channels.',
              'One channel: $2^8 = 256$ levels.',
              'Combine the three: $256 \\times 256 \\times 256 = 2^{24} = 16{,}777{,}216$ values.',
              'So, each pixel names one value out of $16{,}777{,}216$ — chapter 1’s powers-of-two census returning at the boundary.',
              'Hence $24$-bit colour gives $16{,}777{,}216$ distinguishable values per pixel, at $256$ levels per channel.',
            ],
            answer: '16,777,216 distinguishable values per pixel; 256 levels per channel.',
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'Exam-style (an original item in the examination idiom, not a real past-paper question): Which of the following is an input device? (a) a plotter (b) a trackball (c) a line printer (d) a visual display unit.',
            solution: [
              'Test each option against the one question that matters: does it carry data into the machine?',
              '(a) A plotter draws on paper — output. So, (a) fails.',
              '(b) A trackball is a mouse turned upside down: rolling the ball sends counts in — input. So, (b) passes.',
              '(c) A line printer prints lines of output. So, (c) fails.',
              '(d) A visual display unit shows output. So, (d) fails.',
              'Hence (b) the trackball is the input device.',
            ],
            answer: '(b) the trackball.',
          },
          {
            q: 'Exam-style (an original item in the examination idiom, not a real past-paper question): The first public demonstration of the computer mouse took place — (a) at SRI in 1970, when the patent was granted (b) on 9 December 1968, at the ACM/IEEE Fall Joint Computer Conference in San Francisco (c) in October 1867, with the QWERTY patent application (d) in 1878, with the Remington No. 2.',
            solution: [
              'Recall the mouse’s paper trail: Engelbart’s team at SRI applied for the patent in 1967 and received it in 1970 — so (a) confuses the grant with the demo.',
              'The demonstration itself: 9 December 1968, at the ACM/IEEE Fall Joint Computer Conference in San Francisco — the ‘Mother of All Demos’. So, (b) matches.',
              'October 1867 belongs to Sholes’s QWERTY patent application, decades before the electronic mouse. So, (c) fails.',
              '1878 belongs to the Remington No. 2 typewriter. So, (d) fails.',
              'Hence (b) is correct.',
            ],
            answer: '(b) 9 December 1968, at the ACM/IEEE Fall Joint Computer Conference in San Francisco.',
          },
          {
            q: 'Exam-style (an original item in the examination idiom, not a real past-paper question): A US Letter page ($8.5$ in $\\times$ $11$ in) is scanned at $300$ DPI. The pixel census is — (a) $8{,}415{,}000$ (b) $921{,}600$ (c) $33{,}660{,}000$ (d) $307{,}200$.',
            solution: [
              'Set up the census: $8.5 \\times 300 = 2550$ across, and $11 \\times 300 = 3300$ down.',
              'Multiply: $2550 \\times 3300 = 8{,}415{,}000$. So, (a) matches.',
              '(b) $921{,}600$ is the 720p frame census — a different device entirely. So, (b) fails.',
              '(c) $33{,}660{,}000$ is the same page at $600$ DPI — right page, wrong setting. So, (c) fails.',
              '(d) $307{,}200$ is a VGA frame. So, (d) fails.',
              'Hence (a) $8{,}415{,}000$ pixels.',
            ],
            answer: '(a) 8,415,000 pixels.',
          },
        ],
      },
      {
        level: 'L5',
        questions: [
          {
            q: 'CD-quality stereo audio is sampled at $44{,}100$ samples per second per channel. Find the total number of samples the machine receives each second, and explain why the count doubles.',
            solution: [
              'Take the per-channel rate: $44{,}100$ samples every second, for one channel.',
              'Count the channels: stereo means two — a left channel and a right channel.',
              'Multiply: $44{,}100 \\times 2 = 88{,}200$ samples per second.',
              'Check the doubling: two channels each feeding $44{,}100$ per second — so the total is twice the single-channel census.',
              'Hence the machine chews $88{,}200$ samples every second of stereo audio. (The ruler figure lays the second out schematically, both lanes drawn.)',
            ],
            answer: '44,100 × 2 = 88,200 samples per second.',
            figures: [
              { caption: 'One second of CD-quality stereo, schematically: two channels of 44,100 ticks each — 88,200 samples in all (not to scale).', svg: in21SamplingRulerSvg() },
            ],
          },
          {
            q: 'An audio sample stored in $16$ bits can distinguish how many loudness levels? How many times more than an $8$-bit sample?',
            solution: [
              'Take the sample depth: $16$ bits per measurement.',
              'Count the levels: $2^{16} = 65{,}536$.',
              'Compare with $8$ bits: $2^8 = 256$ levels.',
              'Divide: $65{,}536 \\div 256 = 256$ — two hundred fifty-six times as many.',
              'Hence a $16$-bit sample distinguishes $65{,}536$ levels — $256$ times the $256$ of an $8$-bit sample.',
            ],
            answer: '65,536 levels; 256 times the 256 levels of 8-bit.',
          },
          {
            q: 'A VGA webcam frame is $640 \\times 480$ pixels. Find its pixel census, and determine how many VGA censuses make up one 720p frame’s census.',
            solution: [
              'Take the VGA frame: $640$ wide and $480$ tall.',
              'Multiply: $640 \\times 480 = 307{,}200$ pixels.',
              'Now, take 720p: $1280 \\times 720 = 921{,}600$ pixels.',
              'Divide: $921{,}600 \\div 307{,}200 = 3$ — exactly three VGA censuses.',
              'Hence a VGA frame carries $307{,}200$ pixels, and exactly three of those censuses fit inside one 720p frame.',
            ],
            answer: 'VGA: 307,200 pixels; 921,600 ÷ 307,200 = 3 — three VGA censuses per 720p frame.',
          },
        ],
      },
      {
        level: 'L6',
        questions: [
          {
            q: 'Prove, from the geometry of area alone, that doubling the DPI of any scan multiplies the pixel count by exactly $4$ — whatever the page’s size.',
            solution: [
              'Take any page $W$ inches by $H$ inches, scanned at $D$ DPI.',
              'Its census is $N(D) = (W \\cdot D)(H \\cdot D)$ — width-pixels times height-pixels.',
              'Now, double the DPI: $N(2D) = (W \\cdot 2D)(H \\cdot 2D)$.',
              'Regroup: $N(2D) = (2 \\cdot WD)(2 \\cdot HD) = 4\\,(WD)(HD) = 4\\,N(D)$.',
              'Check the essence: each linear factor doubles, and $2 \\times 2 = 4$ — the census is an area, and area scales with the square of the linear scale.',
              'Hence $N(2D) = 4\\,N(D)$ for every page size — the ×4 law, proved from area alone.',
            ],
            answer: 'N(2D) = 4 N(D): doubling the DPI exactly quadruples the pixel count, for any page.',
          },
          {
            q: 'Argue that every input device met in this lesson — keyboard, mouse, touchscreen, scanner, camera, microphone, sensor — is at heart a transducer: a physical act become numbers. Support the claim with the census.',
            solution: [
              'Take the definition: a transducer converts a physical quantity into another form — here, into numbers a machine can chew.',
              'The keyboard converts a press into a scan code — a number naming a key.',
              'The mouse converts a slide into counts; the touchscreen converts a touch into a coordinate pair on a grid.',
              'The scanner converts reflected light into a pixel grid; the camera converts arriving light into pixel values.',
              'The microphone converts a pressure wave into samples; the sensor converts temperature or motion into a reading.',
              'So, in every case a physical act on one side of the boundary becomes a number stream on the other — the input census table is the same three columns ten times over.',
              'Hence the whole lesson is one idea: every input device is a transducer, and the handshake is a conversion.',
            ],
            answer: 'Every input device converts a physical act into numbers — the definition of a transducer; the census table confirms it row by row.',
          },
        ],
      },
    ] },
  ],
}

// ------------------------------------------------------------------
// lesson 2.2 — authored by the CS RUN 3 swarm (the cf22 agent), integrated verbatim
// ------------------------------------------------------------------

// ==================================================================
// BODY FIGURE 1 — the output half of the human handshake (mirror of 2.1)
// ==================================================================
function out22HandshakeSvg(): string {
  // computed geometry: left box (machine side) | boundary rail | three crossing lanes
  const VW = 720
  const VH = 330
  const M = 16
  const railX = 208
  const railTop = 42
  const railBottom = VH - 14
  const lane0 = 78
  const laneGap = 96
  const boxW = 158
  const boxH = 84
  const boxX = M
  const boxY = (VH - boxH) / 2
  const chipW = 168
  const chipH = 52
  const chipX = railX + 60
  const senseX = 540
  const senseW = 164
  const senseH = 52
  const FS_HEAD = 14
  const FS_T = 12
  const FS_S = 11
  const FS_C = 10
  const SW_BOX = 2.4
  const SW_ARROW = 2.4
  const arrowLen = 9
  const lanes = [0, 1, 2].map((i) => lane0 + i * laneGap)
  const med = [
    { head: 'light', sub: 'the pixel grid', sense: ['the eye'] },
    { head: 'ink', sub: 'the printed page', sense: ['the paper', 'in your hand'] },
    { head: 'pressure', sub: 'the sound wave', sense: ['the ear'] }
  ]
  const p: string[] = []
  p.push(`<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The output side of the human handshake: a box of numbers the machine finished with sits on the left; the boundary rail of the output unit, the cycle’s third beat, stands in the middle; three arrows cross it to the right — light from the pixel grid landing on the eye, ink from the printed page landing on the paper in your hand, and pressure from the sound wave landing on the ear.">`)
  // machine-side box
  p.push(`<rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="${SW_BOX}"/>`)
  p.push(`<text x="${boxX + boxW / 2}" y="${boxY - 12}" text-anchor="middle" font-size="${FS_C}" fill="#0f766e">the machine’s side</text>`)
  const boxLines = ['numbers the', 'machine finished', 'with']
  boxLines.forEach((t, i) => {
    p.push(`<text x="${boxX + boxW / 2}" y="${boxY + 34 + i * 18}" text-anchor="middle" font-size="${FS_T}" font-weight="600" fill="#166534">${t}</text>`)
  })
  // boundary rail
  p.push(`<rect x="${railX - 5}" y="${railTop}" width="10" height="${railBottom - railTop}" rx="5" fill="#fcd34d" stroke="#d97706" stroke-width="${SW_BOX}"/>`)
  p.push(`<text x="${railX}" y="20" text-anchor="middle" font-size="${FS_T}" font-weight="600" fill="#0f766e">the output unit</text>`)
  p.push(`<text x="${railX}" y="34" text-anchor="middle" font-size="${FS_C}" fill="#0f766e">the cycle’s third beat</text>`)
  // three crossing lanes
  med.forEach((m, i) => {
    const y = lanes[i]
    // arrow 1: rail → chip
    const a1x1 = railX + 12
    const a1x2 = chipX - 6
    p.push(`<line x1="${a1x1}" y1="${y}" x2="${a1x2 - arrowLen}" y2="${y}" stroke="#d97706" stroke-width="${SW_ARROW}"/>`)
    p.push(`<polygon points="${a1x2},${y} ${a1x2 - arrowLen},${y - 5} ${a1x2 - arrowLen},${y + 5}" fill="#d97706"/>`)
    // the medium chip (light / ink / pressure)
    p.push(`<rect x="${chipX}" y="${y - chipH / 2}" width="${chipW}" height="${chipH}" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>`)
    p.push(`<text x="${chipX + chipW / 2}" y="${y - 2}" text-anchor="middle" font-size="${FS_HEAD}" font-weight="700" fill="#166534">${m.head}</text>`)
    p.push(`<text x="${chipX + chipW / 2}" y="${y + 16}" text-anchor="middle" font-size="${FS_S}" fill="#65a30d">${m.sub}</text>`)
    // arrow 2: chip → human sense box
    const a2x1 = chipX + chipW + 8
    const a2x2 = senseX - 8
    p.push(`<line x1="${a2x1}" y1="${y}" x2="${a2x2 - arrowLen}" y2="${y}" stroke="#d97706" stroke-width="${SW_ARROW}"/>`)
    p.push(`<polygon points="${a2x2},${y} ${a2x2 - arrowLen},${y - 5} ${a2x2 - arrowLen},${y + 5}" fill="#d97706"/>`)
    // the human sense box
    p.push(`<rect x="${senseX}" y="${y - senseH / 2}" width="${senseW}" height="${senseH}" rx="10" fill="#ffffff" stroke="#0d9488" stroke-width="2.4"/>`)
    if (m.sense.length === 1) {
      p.push(`<text x="${senseX + senseW / 2}" y="${y + 4}" text-anchor="middle" font-size="${FS_T}" font-weight="600" fill="#166534">${m.sense[0]}</text>`)
    } else {
      p.push(`<text x="${senseX + senseW / 2}" y="${y - 2}" text-anchor="middle" font-size="${FS_T}" font-weight="600" fill="#166534">${m.sense[0]}</text>`)
      p.push(`<text x="${senseX + senseW / 2}" y="${y + 14}" text-anchor="middle" font-size="${FS_T}" font-weight="600" fill="#166534">${m.sense[1]}</text>`)
    }
  })
  p.push(`</svg>`)
  return p.join('')
}

// ==================================================================
// BODY FIGURE 2 — the pixel census (macro-grid + census strip + zoom)
// ==================================================================
function out22PixelGridSvg(): string {
  // computed geometry: 16×9 schematic lattice, census strip, one zoomed pixel
  const VW = 720
  const VH = 400
  const COLS = 16
  const ROWS = 9
  const CELL = 16
  const GX = 40
  const GY = 92
  const GW = COLS * CELL
  const GH = ROWS * CELL
  const censusX = GX + GW + 40
  const bigS = 84
  const bigX = 336
  const bigY = 268
  const sub = bigS / 3
  const hiCol = 12
  const hiRow = 4
  const hiX = GX + hiCol * CELL
  const hiY = GY + hiRow * CELL
  const subFills = ['#dc2626', '#65a30d', '#0d9488']
  const subNames = ['R', 'G', 'B']
  const p: string[] = []
  p.push(`<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The pixel census: a schematic 16-by-9 macro-grid of small squares stands for the real screen lattice of 1920 by 1080 pixels; a side strip computes the census, 1920 times 1080 equals 2,073,600 pixels, and checks 1920 times 9 equals 1080 times 16 equals 17,280 — exactly 16 to 9; one lattice cell is magnified to show a pixel made of three sub-lamps R, G and B, each showing one colour at a time.">`)
  // the macro-grid
  p.push(`<text x="${GX}" y="${GY - 16}" font-size="11" fill="#0d9488">a 16 × 9 macro-grid — schematic, not the real scale</text>`)
  p.push(`<rect x="${GX}" y="${GY}" width="${GW}" height="${GH}" fill="#ffffff" stroke="#16a34a" stroke-width="2.2"/>`)
  for (let i = 1; i < COLS; i++) {
    p.push(`<line x1="${GX + i * CELL}" y1="${GY}" x2="${GX + i * CELL}" y2="${GY + GH}" stroke="#5eead4" stroke-width="1.2"/>`)
  }
  for (let j = 1; j < ROWS; j++) {
    p.push(`<line x1="${GX}" y1="${GY + j * CELL}" x2="${GX + GW}" y2="${GY + j * CELL}" stroke="#5eead4" stroke-width="1.2"/>`)
  }
  p.push(`<text x="${GX + GW / 2}" y="${GY + GH + 20}" text-anchor="middle" font-size="11" fill="#0d9488">16 columns across × 9 rows down</text>`)
  p.push(`<text x="${GX + GW / 2}" y="${GY + GH + 38}" text-anchor="middle" font-size="11" fill="#65a30d">the real grid: 1920 across × 1080 down — 2,073,600 lamps</text>`)
  // the census strip
  p.push(`<text x="${censusX}" y="100" font-size="11" fill="#0d9488">the pixel census</text>`)
  p.push(`<text x="${censusX}" y="126" font-size="15" font-weight="700" fill="#166534">1920 × 1080</text>`)
  p.push(`<text x="${censusX}" y="150" font-size="15" font-weight="700" fill="#166534">= 2,073,600 pixels</text>`)
  p.push(`<text x="${censusX}" y="180" font-size="11" fill="#0d9488">the exact 16:9 check</text>`)
  p.push(`<text x="${censusX}" y="204" font-size="13" fill="#166534">1920 × 9 = 1080 × 16</text>`)
  p.push(`<text x="${censusX}" y="228" font-size="13" fill="#65a30d">= 17,280 — exactly 16:9</text>`)
  // the highlighted cell and its connector
  p.push(`<rect x="${hiX}" y="${hiY}" width="${CELL}" height="${CELL}" fill="none" stroke="#ea580c" stroke-width="2.4"/>`)
  const hx = hiX + CELL / 2
  const hy = hiY + CELL / 2
  const tx = bigX + bigS / 2
  const ty = bigY - 4
  p.push(`<line x1="${hx}" y1="${hy}" x2="${tx}" y2="${ty}" stroke="#d97706" stroke-width="1.6" stroke-dasharray="5,4"/>`)
  // the zoomed pixel with three sub-lamps
  p.push(`<rect x="${bigX}" y="${bigY}" width="${bigS}" height="${bigS}" fill="#ffffff" stroke="#16a34a" stroke-width="2.4"/>`)
  for (let k = 0; k < 3; k++) {
    p.push(`<rect x="${bigX + k * sub}" y="${bigY}" width="${sub}" height="${bigS}" fill="${subFills[k]}"/>`)
    p.push(`<text x="${bigX + k * sub + sub / 2}" y="${bigY + bigS / 2 + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#ffffff">${subNames[k]}</text>`)
  }
  p.push(`<text x="${bigX + bigS + 16}" y="${bigY + 22}" font-size="12" font-weight="600" fill="#166534">one pixel, zoomed</text>`)
  p.push(`<text x="${bigX + bigS + 16}" y="${bigY + 40}" font-size="11" fill="#65a30d">three sub-lamps — R, G, B</text>`)
  p.push(`<text x="${bigX + bigS + 16}" y="${bigY + 56}" font-size="10" fill="#65a30d">each shows one colour at a time</text>`)
  p.push(`</svg>`)
  return p.join('')
}

// ==================================================================
// BODY FIGURE 3 — the laser printer’s six-beat ring
// ==================================================================
function out22PrinterLaserSvg(): string {
  // computed geometry: six nodes on a circle, clockwise arcs, central drum, paper path
  const VW = 720
  const VH = 460
  const CX = 360
  const CY = 240
  const R = 132
  const NR = 36
  const GAP = 0.31 // radians of clearance either side of each node
  const beats = ['charge', 'write', 'develop', 'transfer', 'fuse', 'clean']
  const ang = beats.map((_, k) => ((-90 + k * 60) * Math.PI) / 180)
  const nx = ang.map((a) => CX + R * Math.cos(a))
  const ny = ang.map((a) => CY + R * Math.sin(a))
  const p: string[] = []
  p.push(`<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The laser printer’s six-beat print cycle drawn as a clockwise ring of six nodes: charge the drum, write with the laser, develop with toner, transfer to paper, fuse with heat, clean the drum; the drum cylinder sits at the centre; the paper path enters at the transfer beat and the warm page exits at the fuse beat — pages come out warm.">`)
  p.push(`<text x="${CX}" y="24" text-anchor="middle" font-size="11" fill="#0d9488">the six-beat print cycle — clockwise</text>`)
  // clockwise arcs between consecutive beats (arrowheads point along the travel)
  for (let k = 0; k < beats.length; k++) {
    const a1 = ang[k] + GAP
    const a2 = ang[(k + 1) % beats.length] - GAP
    const sx = CX + R * Math.cos(a1)
    const sy = CY + R * Math.sin(a1)
    const ex = CX + R * Math.cos(a2)
    const ey = CY + R * Math.sin(a2)
    p.push(`<path d="M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="#d97706" stroke-width="2.2"/>`)
    const tX = -Math.sin(a2)
    const tY = Math.cos(a2)
    const nX = Math.cos(a2)
    const nY = Math.sin(a2)
    const tipX = ex + tX * 2
    const tipY = ey + tY * 2
    const b1X = tipX - tX * 10 + nX * 4.5
    const b1Y = tipY - tY * 10 + nY * 4.5
    const b2X = tipX - tX * 10 - nX * 4.5
    const b2Y = tipY - tY * 10 - nY * 4.5
    p.push(`<polygon points="${tipX.toFixed(1)},${tipY.toFixed(1)} ${b1X.toFixed(1)},${b1Y.toFixed(1)} ${b2X.toFixed(1)},${b2Y.toFixed(1)}" fill="#d97706"/>`)
  }
  // the six beat nodes
  beats.forEach((b, k) => {
    p.push(`<circle cx="${nx[k].toFixed(1)}" cy="${ny[k].toFixed(1)}" r="${NR}" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/>`)
    p.push(`<text x="${nx[k].toFixed(1)}" y="${(ny[k] - 8).toFixed(1)}" text-anchor="middle" font-size="10" fill="#65a30d">${k + 1}</text>`)
    p.push(`<text x="${nx[k].toFixed(1)}" y="${(ny[k] + 12).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#166534">${b}</text>`)
  })
  // the drum cylinder at the centre
  p.push(`<rect x="${CX - 24}" y="${CY - 6}" width="48" height="44" fill="#ffffff" stroke="#0d9488" stroke-width="2.2"/>`)
  p.push(`<ellipse cx="${CX}" cy="${CY + 38}" rx="24" ry="10" fill="#ffffff" stroke="#0d9488" stroke-width="2.2"/>`)
  p.push(`<ellipse cx="${CX}" cy="${CY - 6}" rx="24" ry="10" fill="#ffffff" stroke="#0d9488" stroke-width="2.2"/>`)
  p.push(`<text x="${CX}" y="${CY + 66}" text-anchor="middle" font-size="12" font-weight="600" fill="#0f766e">the drum</text>`)
  p.push(`<text x="${CX}" y="${CY + 82}" text-anchor="middle" font-size="10" fill="#0f766e">turns through the six beats</text>`)
  // the paper path: enters at transfer (bottom node), exits warm at fuse (lower-left node)
  const transferIdx = 3
  const fuseIdx = 4
  const entryTop = ny[transferIdx] + NR + 2
  p.push(`<rect x="${CX - 24}" y="${entryTop.toFixed(1)}" width="48" height="${(VH - 8 - entryTop).toFixed(1)}" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>`)
  p.push(`<text x="${CX + 58}" y="${(entryTop + 24).toFixed(1)}" font-size="10" fill="#65a30d">paper enters at transfer</text>`)
  const fuseLX = nx[fuseIdx] - NR - 14 // 14px of clear air between the exit strip and the fuse node's stroke (the VLM-audit fix: 2px abutted)
  const exitY = ny[fuseIdx] - 10
  p.push(`<rect x="16" y="${exitY.toFixed(1)}" width="${(fuseLX - 16).toFixed(1)}" height="22" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>`)
  p.push(`<text x="16" y="${(exitY - 8).toFixed(1)}" font-size="10" fill="#ea580c">pages come out warm</text>`)
  p.push(`<text x="${(16 + (fuseLX - 16) / 2).toFixed(1)}" y="${(exitY + 14).toFixed(1)}" text-anchor="middle" font-size="10" fill="#d97706">the warm page exits at fuse</text>`)
  p.push(`</svg>`)
  return p.join('')
}

// ==================================================================
// SOLUTION FIGURE A — the census strip (1366 × 768)
// ==================================================================
function out22CensusStripSvg(): string {
  // computed left-to-right cursor layout: 1366 | × | 768 | = | 1,049,088
  const VW = 660
  const VH = 132
  const y0 = 66
  const chipH = 46
  const x1 = 28
  const w1 = 96
  const x2 = x1 + w1 + 34
  const x3 = x2 + 34
  const w3 = 84
  const x4 = x3 + w3 + 34
  const x5 = x4 + 40
  const w5 = 168
  const p: string[] = []
  p.push(`<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The census strip for the honest 16:9 cousin: 1366 times 768 equals 1,049,088 pixels, drawn as a multiplication strip of two chips, a times sign, an equals sign, and the result chip.">`)
  p.push(`<text x="${x1}" y="26" font-size="10" fill="#0d9488">the census strip: the honest 16:9 cousin</text>`)
  p.push(`<rect x="${x1}" y="${y0 - chipH / 2}" width="${w1}" height="${chipH}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>`)
  p.push(`<text x="${x1 + w1 / 2}" y="${y0 + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">1366</text>`)
  p.push(`<text x="${x2}" y="${y0 + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="#65a30d">×</text>`)
  p.push(`<rect x="${x3}" y="${y0 - chipH / 2}" width="${w3}" height="${chipH}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>`)
  p.push(`<text x="${x3 + w3 / 2}" y="${y0 + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">768</text>`)
  p.push(`<text x="${x4}" y="${y0 + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="#65a30d">=</text>`)
  p.push(`<rect x="${x5}" y="${y0 - chipH / 2}" width="${w5}" height="${chipH}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/>`)
  p.push(`<text x="${x5 + w5 / 2}" y="${y0 + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">1,049,088</text>`)
  p.push(`<text x="${x1}" y="${VH - 18}" font-size="10" fill="#65a30d">roughly half the 1080p census — the label “16:9” holds only after rounding up</text>`)
  p.push(`</svg>`)
  return p.join('')
}

// ==================================================================
// SOLUTION FIGURE B — the frame-budget ladder (30 / 60 / 144 Hz)
// ==================================================================
function out22FrameLadderSvg(): string {
  // computed geometry: bar length proportional to the frame budget in ms
  const VW = 720
  const VH = 230
  const x0 = 96
  const y0 = 46
  const rowH = 52
  const barH = 26
  const scale = 11 // pixels per millisecond
  const rows = [30, 60, 144]
  const p: string[] = []
  p.push(`<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The frame-budget ladder: three horizontal bars whose lengths are the frame budgets in milliseconds — 33.3 milliseconds at 30 hertz, 16.7 milliseconds at 60 hertz, and 6.9 milliseconds at 144 hertz; the faster the refresh rate, the shorter the bar.">`)
  p.push(`<text x="16" y="24" font-size="10" fill="#0d9488">the frame-budget ladder — bar length is the frame budget in milliseconds</text>`)
  rows.forEach((f, i) => {
    const y = y0 + i * rowH
    const ms = 1000 / f
    const w = Math.round(ms * scale)
    p.push(`<text x="${x0 - 14}" y="${y + 18}" text-anchor="end" font-size="13" font-weight="700" fill="#166534">${f} Hz</text>`)
    p.push(`<rect x="${x0}" y="${y}" width="${w}" height="${barH}" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>`)
    p.push(`<text x="${x0 + w + 14}" y="${y + 18}" font-size="11" fill="#0f766e">${ms.toFixed(1)} ms per frame</text>`)
  })
  p.push(`<text x="16" y="${VH - 22}" font-size="10" fill="#65a30d">the faster the refresh rate, the shorter the budget per frame</text>`)
  p.push(`</svg>`)
  return p.join('')
}

// ==================================================================
// SOLUTION FIGURE C — the PPI triangle (portrait phone, Pythagoras)
// ==================================================================
function out22PpiTriangleSvg(): string {
  // computed geometry: legs proportional to 1080 and 1920, hypotenuse the diagonal
  const VW = 720
  const VH = 360
  const k = 240 / 1920 // scale: pixels → drawing units (both legs share it)
  const legW = 1080 * k // the 1080-px width leg
  const legH = 1920 * k // the 1920-px height leg
  const ax = 168
  const ay = 286
  const bx = ax + legW
  const by = ay
  const cx = ax
  const cy = ay - legH
  const midY = (ay + cy) / 2
  const p: string[] = []
  p.push(`<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The PPI triangle for a 5.5-inch phone screen: a right triangle whose legs are the 1080-pixel width and the 1920-pixel height of the portrait grid; the hypotenuse carries about 2,202.9 pixels on the diagonal; dividing 2,202.9 by 5.5 inches gives about 400.5 pixels per inch — about 400 PPI.">`)
  p.push(`<text x="16" y="22" font-size="10" fill="#0d9488">the PPI triangle — a 1080 × 1920 phone screen, 5.5-inch diagonal</text>`)
  p.push(`<polygon points="${ax},${ay} ${bx},${by} ${cx},${cy}" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/>`)
  // the right-angle marker
  const rq = 16
  p.push(`<polyline points="${ax + rq},${ay} ${ax + rq},${ay - rq} ${ax},${ay - rq}" fill="none" stroke="#65a30d" stroke-width="1.4"/>`)
  // leg labels
  p.push(`<text x="${(ax + bx) / 2}" y="${ay + 22}" text-anchor="middle" font-size="11" fill="#0f766e">width — 1080 px</text>`)
  p.push(`<text x="26" y="${midY - 6}" font-size="10" fill="#65a30d">height</text>`)
  p.push(`<text x="26" y="${midY + 12}" font-size="11" fill="#0f766e">1920 px</text>`)
  // hypotenuse labels
  p.push(`<text x="330" y="152" font-size="12" font-weight="700" fill="#166534">2,202.9 px</text>`)
  p.push(`<text x="330" y="168" font-size="10" fill="#65a30d">on the diagonal</text>`)
  // the division strip
  p.push(`<text x="${VW / 2}" y="330" text-anchor="middle" font-size="13" font-weight="700" fill="#166534">2,202.9 px ÷ 5.5 in ≈ 400.5 PPI</text>`)
  p.push(`<text x="${VW / 2}" y="348" text-anchor="middle" font-size="11" fill="#65a30d">about 400 pixels per inch — density is a division</text>`)
  p.push(`</svg>`)
  return p.join('')
}

// ==================================================================
// SOLUTION FIGURE D — one square inch at 300 dpi vs 600 dpi (the ×4 law)
// ==================================================================
function out22DpiGridsSvg(): string {
  // computed geometry: two equal squares, dot counts 6×6 and 12×12 (schematic)
  const VW = 720
  const VH = 270
  const sq = 150
  const xL = 64
  const xR = 310
  const y0 = 54
  const nL = 6 // drawn dots per side at 300 dpi (schematic)
  const nR = 12 // drawn dots per side at 600 dpi (schematic)
  const p: string[] = []
  p.push(`<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The ×4 census: two equal square inches drawn side by side; the first at 300 dpi carries 90,000 dots, the second at 600 dpi carries 360,000 dots — twice the dots per inch gives four times the dots per square inch; the drawn dot grids are schematic, not the real counts.">`)
  p.push(`<text x="16" y="20" font-size="10" fill="#0d9488">the ×4 census — the same square inch, twice the dots per inch</text>`)
  p.push(`<text x="${xL + sq / 2}" y="40" text-anchor="middle" font-size="10" fill="#65a30d">one square inch at 300 dpi</text>`)
  p.push(`<rect x="${xL}" y="${y0}" width="${sq}" height="${sq}" fill="#ffffff" stroke="#16a34a" stroke-width="2.2"/>`)
  for (let i = 0; i < nL; i++) {
    for (let j = 0; j < nL; j++) {
      const dx = xL + ((i + 0.5) * sq) / nL
      const dy = y0 + ((j + 0.5) * sq) / nL
      p.push(`<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="7" fill="#65a30d"/>`)
    }
  }
  p.push(`<text x="${xL + sq / 2}" y="${y0 + sq + 22}" text-anchor="middle" font-size="13" font-weight="700" fill="#166534">90,000 dots</text>`)
  p.push(`<text x="${xR + sq / 2}" y="40" text-anchor="middle" font-size="10" fill="#65a30d">one square inch at 600 dpi</text>`)
  p.push(`<rect x="${xR}" y="${y0}" width="${sq}" height="${sq}" fill="#ffffff" stroke="#16a34a" stroke-width="2.2"/>`)
  for (let i = 0; i < nR; i++) {
    for (let j = 0; j < nR; j++) {
      const dx = xR + ((i + 0.5) * sq) / nR
      const dy = y0 + ((j + 0.5) * sq) / nR
      p.push(`<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="3.4" fill="#ea580c"/>`)
    }
  }
  p.push(`<text x="${xR + sq / 2}" y="${y0 + sq + 22}" text-anchor="middle" font-size="13" font-weight="700" fill="#166534">360,000 dots</text>`)
  p.push(`<text x="${VW / 2}" y="${VH - 18}" text-anchor="middle" font-size="10" fill="#0f766e">twice the dpi gives four times the dots per square inch (dot grids schematic)</text>`)
  p.push(`</svg>`)
  return p.join('')
}

// ==================================================================
// SOLUTION FIGURE E — one second of CD stereo as a labelled ruler
// ==================================================================
function out22CdStripSvg(): string {
  // computed geometry: ruler bar with tick marks, sample lines, total band
  const VW = 720
  const VH = 300
  const barX = 150
  const barW = 530
  const barY = 48
  const barH = 22
  const ticks = 22 // schematic tick marks inside the one-second bar
  const bandY = 186
  const bandH = 48
  const p: string[] = []
  p.push(`<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One second of CD-quality stereo drawn as a labelled ruler, not to scale: the bar is one second and carries 44,100 samples; each sample is 16 bits, giving 65,536 possible levels; there are two stereo channels; the total band reads 44,100 times 16 times 2 equals 1,411,200 bits per second, which is 1411.2 kilobits per second.">`)
  p.push(`<text x="16" y="22" font-size="10" fill="#0d9488">one second of CD-quality stereo, drawn as a labelled ruler — not to scale</text>`)
  p.push(`<text x="${barX - 12}" y="62" text-anchor="end" font-size="12" font-weight="700" fill="#166534">44,100</text>`)
  p.push(`<text x="${barX - 12}" y="76" text-anchor="end" font-size="10" fill="#65a30d">samples</text>`)
  p.push(`<rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>`)
  for (let i = 0; i < ticks; i++) {
    const tx = barX + ((i + 0.5) * barW) / ticks
    p.push(`<line x1="${tx.toFixed(1)}" y1="${barY}" x2="${tx.toFixed(1)}" y2="${barY + barH}" stroke="#65a30d" stroke-width="1.3"/>`)
  }
  p.push(`<text x="${barX}" y="90" font-size="10" fill="#65a30d">tick marks schematic — the bar is one second</text>`)
  p.push(`<text x="${barX}" y="128" font-size="12" fill="#166534">1 sample = 16 bits — 65,536 possible levels</text>`)
  p.push(`<text x="${barX}" y="162" font-size="12" fill="#166534">× 2 channels (stereo)</text>`)
  p.push(`<rect x="${barX}" y="${bandY}" width="${barW}" height="${bandH}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/>`)
  p.push(`<text x="${barX + barW / 2}" y="${bandY + 24}" text-anchor="middle" font-size="14" font-weight="700" fill="#166534">44,100 × 16 × 2 = 1,411,200 bits per second</text>`)
  p.push(`<text x="${barX + barW / 2}" y="${bandY + 42}" text-anchor="middle" font-size="12" fill="#0f766e">= 1411.2 kbps</text>`)
  p.push(`<text x="${barX}" y="264" font-size="10" fill="#65a30d">the output twin of the microphone arithmetic of lesson 2.1</text>`)
  p.push(`</svg>`)
  return p.join('')
}

const lesson22: Lesson = {
  id: 'cf-output-devices-screens-printers-and-sound',
  number: '2.2',
  title: 'Output Devices: Screens, Printers and Sound',
  concepts: [
    'output devices',
    'pixels, resolution and PPI',
    'impact and non-impact printers',
    'the laser printer’s six-beat cycle',
    'dots per inch and the ×4 law',
    'digital sound and the DAC'
  ],
  objectives: [
    'explain how the output unit turns the machine’s finished numbers into light, ink and pressure waves',
    'count the pixels of a screen, and check a “16:9” label with arithmetic',
    'distinguish impact from non-impact printers, and walk the laser printer’s six-beat cycle',
    'compute dots per square inch, pixel density and the frame budget',
    'compute the CD’s bitrate, and argue via Nyquist why 44.1 kHz covers human hearing'
  ],
  prerequisites: ['cf-the-basic-structure-and-operation-of-the-computer', 'cf-input-devices-the-human-handshake'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ---------------- the output half of the handshake ----------------
    {
      kind: 'para',
      text: 'Lesson 2.1 “Input Devices: the Human Handshake” walked the human’s acts across the boundary and into the machine: keypresses, clicks, photographs, spoken words — everything the machine needed to know arrived as numbers. This lesson walks the same boundary in the opposite direction. The machine has finished its processing, and the result — still just numbers — must cross back out and become something a human can perceive. That crossing is the third beat of the cycle you met in chapter 1: Input, Processing, Output, Storage. This lesson is the O of I→P→O→S — the output half of the handshake.'
    },
    {
      kind: 'para',
      text: 'The census of output devices is short enough to carry in your head, because every member serves one of the three human senses that can receive a machine’s result. The screen turns numbers into light for the eye. The printer turns numbers into ink on paper for the hand. The speaker turns numbers into pressure waves in the air for the ear. That is the whole census — and the honest question of this lesson is the mirror of lesson 2.1’s: how do numbers become light, ink and pressure? The figure below shows the crossing, from the machine’s side to the human’s senses.'
    },
    {
      kind: 'figure',
      caption: 'The output half of the handshake: the machine’s finished numbers cross the output unit — the cycle’s third beat — and become light for the eye, ink for the paper in your hand, and pressure for the ear.',
      svg: out22HandshakeSvg()
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — output device',
      text: 'An output device is said to be any unit of the computer that carries the machine’s finished numbers across the output boundary and re-presents them to a human sense. Thus a screen, a printer and a speaker are output devices: each turns numbers into something a human can perceive — light, ink, or pressure waves — and each is a transducer running in reverse, the mirror of lesson 2.1’s input devices.'
    },
    {
      kind: 'para',
      text: 'For example, the census falls into three households, one per receiving sense:'
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'the screen — the machine’s numbers become light on a grid of pixels, and the eye receives them;',
        'the printer — the machine’s numbers become ink or toner on paper, and the hand receives the page;',
        'the speaker — the machine’s numbers become pressure waves in the air, and the ear receives them.'
      ]
    },

    // ---------------- the pixel ----------------
    {
      kind: 'heading',
      text: 'The Pixel: the Atom of Every Screen'
    },
    {
      kind: 'para',
      text: 'Begin with the screen, and begin at the bottom, with the atom of every display: the pixel. A display is a grid of tiny lamps — millions of them — laid out in neat rows and columns, and each lamp is told, many times a second, exactly one colour to show. Whatever appears on your screen this moment — a letter, a face, a graph — is not painted as one smooth picture. It is assembled from these lamps the way a mosaic is assembled from tiles: stand close and you can see the grid; step back and the tiles merge into an image.'
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — pixel',
      text: 'A pixel is said to be the smallest independently controlled patch of light on a display — one cell of the screen’s grid, showing one colour at a time. Thus a 1080p screen is a grid of $2{,}073{,}600$ such patches, each commanded separately, many times a second.'
    },
    {
      kind: 'para',
      text: 'The census of a grid is plain multiplication. A full-HD panel — “1080p” — is a grid 1920 pixels across and 1080 pixels down, so its census is $1920 \\times 1080 = 2{,}073{,}600$ pixels. Pause on that number, because you have met it before: in lesson 2.1, a 1080p camera handed its photographs across the input boundary as a grid of 1920 × 1080 samples — the same census, counted from the far side. One census, both directions of the handshake: what the camera gathered, the screen re-presents. The figure below draws the census, and the equation beneath it states the law once.'
    },
    {
      kind: 'figure',
      caption: 'The pixel census: a schematic 16 × 9 macro-grid stands for the real 1920 × 1080 lattice; one cell is magnified into its three sub-lamps, and the census strip does the arithmetic.',
      svg: out22PixelGridSvg()
    },
    {
      kind: 'equation',
      latex: 'N = W \\times H \\quad\\Longrightarrow\\quad N = 1920 \\times 1080 = 2{,}073{,}600 \\text{ pixels} \\tag{1}',
      note: 'The pixel census law: multiply the grid’s width by its height.'
    },
    {
      kind: 'example',
      title: 'Count the pixels on a 1080p panel.',
      steps: [
        'A full-HD (“1080p”) panel is a grid 1920 pixels across and 1080 pixels down.',
        'Take the census law $N = W \\times H$ and substitute: $N = 1920 \\times 1080$.',
        'Now, multiply: $1920 \\times 1080 = 2{,}073{,}600$.',
        'Hence a 1080p screen lights $2{,}073{,}600$ pixels — the same census a 1080p camera met from the input side in lesson 2.1.'
      ]
    },
    {
      kind: 'formula',
      name: 'Pixel census',
      latex: 'N = W \\times H',
      note: 'the pixel census of any grid: width times height — 1920 × 1080 gives 2,073,600 pixels.'
    },
    {
      kind: 'para',
      text: 'Every grid has a shape as well as a size, and the shape is quoted as an aspect ratio — width to height, written w:h. The 1080p grid is 1920 across and 1080 down, and the shop label says 16:9. Is that exact, or only approximately true? For 1080p it is exact, and you can check it in one line of arithmetic: sixteen times the height must equal nine times the width. The check is worth learning cold, because — as the next paragraph shows — not every “16:9” label survives it.'
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — aspect ratio',
      text: 'The aspect ratio of a screen (or any rectangle) is said to be the ratio of its width to its height, written w:h. Thus a 1080p grid has aspect ratio 16:9, and the check is exact: $16 \\times 1080 = 9 \\times 1920 = 17{,}280$.'
    },
    {
      kind: 'example',
      title: 'Check that 1080p is exactly 16:9.',
      steps: [
        'A grid is exactly 16:9 when sixteen times its height equals nine times its width: $16h = 9w$.',
        'Take the 1080p grid and compute both sides: $16 \\times 1080$ on the left, $9 \\times 1920$ on the right.',
        'Now, multiply each out: $16 \\times 1080 = 17{,}280$ and $9 \\times 1920 = 17{,}280$.',
        'Check: the two products agree, so the proportion is exact, not approximate.',
        'Hence 1080p is exactly 16:9 — $17{,}280$ both ways.'
      ]
    },
    {
      kind: 'formula',
      name: 'Aspect check (16:9)',
      latex: '16h = 9w',
      note: 'a w × h grid is exactly 16:9 when 16h equals 9w — 1080p passes: 17,280 both ways.'
    },
    {
      kind: 'para',
      text: 'Now meet the honest cousin. A widely sold laptop grid is 1366 × 768, and it carries a “16:9” label too. Its census is $1366 \\times 768 = 1{,}049{,}088$ pixels — roughly half the 1080p census. But run the exactness check: for a height of 768, the ideal 16:9 width is $768 \\times 16/9 = 1365\\tfrac{1}{3}$ pixels, and the panel is 1366 wide — one pixel more than the ideal. The label is honest only after rounding up. That single stray pixel is invisible to the eye, but it teaches the lesson this book keeps repeating: check the arithmetic before trusting the label.'
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'A Caution — manufacturers round',
      text: 'The 1366 × 768 panel is “16:9” only after its width is rounded up from the ideal $1365\\tfrac{1}{3}$ pixels. The rounding is harmless to the eye and honest in intent, but “near enough” is not “exact”: before you trust an aspect-ratio label on a specification sheet, run the check $16h = 9w$ yourself. A label that survives the arithmetic deserves your trust; one that does not deserves a rounded quotation mark.'
    },
    {
      kind: 'example',
      title: 'The honest cousin: the census of 1366 × 768.',
      steps: [
        'A common laptop grid is 1366 pixels across and 768 pixels down, labelled “16:9”.',
        'Take the census law: $N = 1366 \\times 768$.',
        'Now, multiply: $1366 \\times 768 = 1{,}049{,}088$ pixels — roughly half the 1080p census.',
        'So, test the label: the ideal width for a height of 768 is $768 \\times 16/9 = 1365\\tfrac{1}{3}$ pixels.',
        'Hence 1366 is the ideal $1365\\tfrac{1}{3}$ rounded up — the grid is nearly, not exactly, 16:9.'
      ]
    },
    {
      kind: 'para',
      text: 'A pixel shows one colour at a time — chosen from a palette whose size is set by so many bits per pixel. Today’s screens typically set aside 24 bits per pixel, and the powers ladder of chapter 1 counts the census: $2^{24} = 16{,}777{,}216$ possible colours per pixel. Why 24 bits give exactly that census is a question of data representation — chapter 3’s doorstep — and we borrow the result here without re-proving it. The census itself is worth one honest visit, because it is the pixel’s own arithmetic, twin to the grid census above it.'
    },
    {
      kind: 'example',
      title: 'The colour census of one pixel.',
      steps: [
        'A pixel shows one colour at a time, chosen from a palette sized in bits per pixel.',
        'Take the typical 24-bit colour pixel of today’s screens: the palette holds $2^{24}$ colours.',
        'Now, climb the powers ladder of chapter 1: $2^{24} = 16{,}777{,}216$ colours.',
        'Hence one 24-bit pixel can show any of $16{,}777{,}216$ colours — and the full 1080p grid holds $2{,}073{,}600$ such pixels, each re-choosing its colour many times a second.'
      ]
    },
    {
      kind: 'terms',
      items: [
        { term: 'pixel', def: 'the smallest independently controlled patch of light on a display; one cell of the screen’s grid, showing one colour at a time.' },
        { term: 'resolution', def: 'the count of pixels along a display’s width and height, quoted as width × height, such as 1920 × 1080.' },
        { term: 'aspect ratio', def: 'the ratio of a rectangle’s width to its height, written w:h; a 1080p grid is exactly 16:9.' },
        { term: 'colour depth', def: 'the bits set aside per pixel for its colour; 24 bits typically give a palette of 16,777,216 colours.' }
      ]
    },

    // ---------------- monitors and their panels ----------------
    {
      kind: 'heading',
      text: 'Monitors and Their Panels'
    },
    {
      kind: 'para',
      text: 'The lamps themselves come in families, and the differences matter at first meeting more than the marketing suggests. An LCD (liquid-crystal display) panel is a sandwich: a uniform backlight behind, and in front of it a liquid-crystal shutter for every pixel — a tiny window that opens, closes, or sits anywhere between, letting more or less of the backlight through. What shops call an “LED monitor” is an LCD whose backlight is made of light-emitting diodes — the label names the lamps behind the shutters, not a different grid. An OLED panel goes further and abolishes the backlight: every pixel is its own lamp, switching fully off for black — typically the crisper, more contrasty family, and the one your phone most likely carries.'
    },
    {
      kind: 'para',
      text: 'The desks of an older generation held a different beast entirely: the CRT (cathode-ray tube), a deep, heavy glass bottle that painted its screen by sweeping a glowing beam across it. CRTs were typically deeper and heavier than the flat panels that replaced them, and they have faded from desks almost everywhere — a shift this book dates only qualitatively, which is the honest level for our needs. The modern touchscreen, meanwhile, closes the loop this chapter opened: the capacitive multi-touch era opened in 2007, and the glass you tap is both halves of the handshake at once — an output grid showing, and an input layer listening. The input side of that glass was lesson 2.1’s story; the output side is this one.'
    },
    {
      kind: 'para',
      text: 'Two numbers describe a panel’s workload: its resolution — the pixel census of its grid — and its refresh rate, the number of complete frames it draws each second. Three grids and three refresh rates cover most of the panels you will meet, and the honest habits are the same for all of them: count the census by multiplication, and check the label by arithmetic. The table below gathers the censuses met so far, plus one more — the same 1080p grid rotated into a phone’s portrait shape, whose census is unchanged by the rotation.'
    },
    {
      kind: 'table',
      caption: 'The screen census: three common grids and their honest labels.',
      head: ['Pixel grid', 'Pixel census', 'Honest note'],
      rows: [
        ['1920 × 1080 (1080p, landscape)', '2,073,600', 'exactly 16:9 — 17,280 both ways'],
        ['1080 × 1920 (the same grid, held portrait)', '2,073,600', 'the same census, rotated'],
        ['1366 × 768 (the honest cousin)', '1,049,088', '“16:9” only after rounding up from 1365⅓']
      ]
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — resolution',
      text: 'The resolution of a display is said to be the count of pixels along its width and height, quoted as width × height. Thus “1920 × 1080”, the 1080p grid, names a panel 1920 pixels across and 1080 down — a census of $2{,}073{,}600$ pixels, exactly 16:9.'
    },
    {
      kind: 'para',
      text: 'The refresh rate sets a deadline, and the deadline is where the arithmetic lives. A 60 Hz panel must finish a complete frame every $1000/60 = 16.7$ milliseconds — that is its frame budget. A 30 Hz panel gets a lazier $33.3$ ms; a fast 144 Hz panel must polish off each frame in just $6.9$ ms. The budget is the millisecond pie sliced by the frame count: divide 1000 by the rate in hertz and you have the budget in milliseconds. Faster panels mean tighter budgets, and a frame that misses its budget shows as a visible stutter — one honest reason the number is quoted at all.'
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — refresh rate',
      text: 'The refresh rate of a display is said to be the number of complete frames it draws each second, measured in hertz (Hz). Thus a 60 Hz panel draws 60 frames per second, and each frame carries a budget of $1000/60 = 16.7$ milliseconds.'
    },
    {
      kind: 'formula',
      name: 'Frame budget',
      latex: 'T = \\frac{1000}{f}\\ \\text{ms}',
      note: 'the time one frame may take at refresh rate f in hertz — 16.7 ms at 60 Hz, 33.3 ms at 30 Hz, 6.9 ms at 144 Hz.'
    },
    {
      kind: 'example',
      title: 'The frame budget at 60 Hz.',
      steps: [
        'The refresh rate counts how many complete frames a panel draws each second; the frame budget is the time one frame may take.',
        'Take a 60 Hz panel: it must draw 60 frames inside 1000 milliseconds.',
        'Now, divide: $1000/60 = 16.7$ ms per frame — the typical desktop budget.',
        'So, compare a 30 Hz panel: $1000/30 = 33.3$ ms — twice the wait per frame.',
        'Hence the frame budget is 16.7 ms at 60 Hz, 33.3 ms at 30 Hz, and 6.9 ms at 144 Hz — the faster the panel, the tighter the budget.'
      ]
    },
    {
      kind: 'table',
      caption: 'The frame-budget census at three common refresh rates.',
      head: ['Refresh rate', 'Frame budget', 'What it means'],
      rows: [
        ['30 Hz', '33.3 ms', 'each frame may take a full thirty-third of a second'],
        ['60 Hz', '16.7 ms', 'the typical desktop budget'],
        ['144 Hz', '6.9 ms', 'the fast-panel budget — several frames fit inside one 30 Hz frame']
      ]
    },
    {
      kind: 'para',
      text: 'One more piece of screen arithmetic, and it is the one buyers actually feel: pixel density. Two screens can carry the same 1080p census and look wildly different — a 24-inch monitor looks coarse, a 5.5-inch phone looks gem-sharp — because the same pixels are spread over different inches. Density is counted in pixels per inch (PPI), and it is a division, not a property of the pixels. The derivation below finds the law once, by Pythagoras, and then slices the same answer across two screen sizes.'
    },
    {
      kind: 'derivation',
      title: 'The PPI law: density is a division',
      statement: 'A 24-inch, 16:9 panel showing a 1920 × 1080 grid: how many pixels per inch sit on its diagonal? And why does the same grid on a 5.5-inch phone reach about 400?',
      steps: [
        {
          label: 'Pythagoras on the grid',
          formula: '\\sqrt{1920^{2} + 1080^{2}}',
          explanation: 'the pixel grid is a right-angled lattice, so its diagonal — counted in pixels — is the hypotenuse of a right triangle with legs 1920 and 1080.'
        },
        {
          label: 'Take the square root',
          formula: '\\sqrt{1920^{2} + 1080^{2}} \\approx 2202.9\\ \\text{pixels}',
          explanation: 'the diagonal carries about $2{,}202.9$ pixels — and this count is the same on every 1080p panel, large or small, because it belongs to the grid, not the cabinet.'
        },
        {
          label: 'Divide by the diagonal inches',
          formula: '\\frac{2202.9}{24} \\approx 91.79\\ \\text{PPI}',
          explanation: 'a 24-inch monitor spreads the diagonal over 24 inches, giving about 92 pixels per inch — “about”, because panel inches are a physical measurement.'
        },
        {
          label: 'Same census, smaller cabinet',
          formula: '\\frac{2202.9}{5.5} \\approx 400.5\\ \\text{PPI}',
          explanation: 'the same $2{,}202.9$-pixel diagonal squeezed onto a 5.5-inch phone screen gives about 400 pixels per inch — density is a division, not a property of the pixels.'
        }
      ],
      result: 'Hence the pixel density of a screen is P = √(W² + H²) / d pixels per inch — about 92 PPI for a 24-inch 1080p monitor, and about 400 PPI for a 5.5-inch phone showing the very same grid.'
    },
    {
      kind: 'formula',
      name: 'Pixel density (PPI)',
      latex: 'P = \\frac{\\sqrt{W^{2} + H^{2}}}{d}',
      note: 'the diagonal pixel count over the diagonal inches — 2,202.9 pixels over 24 inches gives about 92 PPI, over 5.5 inches about 400.'
    },
    {
      kind: 'para',
      text: 'Read the last two steps of the derivation together, because they carry the whole point. The same 2,202.9-pixel diagonal gives about 92 PPI on a 24-inch monitor and about 400 PPI on a 5.5-inch phone — same census, same diagonal count, different inches. The pixels did not shrink; the cabinet did. And where the arithmetic of this section stops, a whole discipline begins: how those pixels are painted — the rendering pipeline of geometry, lighting and motion — is the province of Computer Graphics, another book on this shelf. This lesson hands you the grid and the census, and sends the painting there.'
    },
    {
      kind: 'terms',
      items: [
        { term: 'LCD panel', def: 'a liquid-crystal display: each pixel is a shutter in front of a uniform backlight, opened or closed to pass more or less light.' },
        { term: 'OLED panel', def: 'a display in which every pixel is its own lamp — no backlight — so a black pixel can switch fully off.' },
        { term: 'refresh rate', def: 'the number of complete frames a display draws each second, in hertz (Hz).' },
        { term: 'frame budget', def: 'the time one frame may take: 1000 divided by the refresh rate, in milliseconds.' },
        { term: 'PPI (pixels per inch)', def: 'pixel density: the diagonal pixel count divided by the diagonal inches — a division, not a property of the pixels.' }
      ]
    },

    // ---------------- the printers: a census ----------------
    {
      kind: 'heading',
      text: 'The Printers: a Census'
    },
    {
      kind: 'para',
      text: 'Turn now to paper, and begin — as with screens — with a census. The printer family tree has exactly two great branches, and the split is mechanical, not electronic: how does the machine get its mark onto the page? The impact branch strikes: some part of the printer physically hits an inked ribbon against the paper. The non-impact branch never strikes at all: it flings ink in droplets, or fuses dry powder with heat. Every printer you will ever classify falls into one of these two branches, and examinations love the split precisely because it is this clean.'
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — impact printer',
      text: 'An impact printer is said to be a printer that forms its marks by physical striking — a hammer, pin or wheel pressing ink onto the paper through a ribbon. Thus the dot matrix printer (pins striking) and the daisy wheel printer (a spinning character wheel striking) are impact printers.'
    },
    {
      kind: 'para',
      text: 'For example, the two branches sort the classic members like this:'
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'the impact family: the dot matrix printer, whose pins strike an inked ribbon, and the daisy wheel printer, whose wheel hammers whole characters;',
        'the non-impact family: the inkjet printer, which flings micro-droplets of ink, and the laser printer, which fuses toner with heat.'
      ]
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — non-impact printer',
      text: 'A non-impact printer is said to be a printer that forms its marks without striking anything — ink flung from nozzles, or toner fused by heat. Thus the inkjet printer and the laser printer are the two great non-impact families, and neither one ever touches a ribbon.'
    },
    {
      kind: 'table',
      caption: 'The printer family tree: impact versus non-impact.',
      head: ['Family', 'Marking method', 'Members you will meet'],
      rows: [
        ['Impact', 'physical striking — pins or hammers press ink through a ribbon', 'dot matrix printer, daisy wheel printer'],
        ['Non-impact', 'no striking — ink flung in droplets, or toner fused with heat', 'inkjet printer, laser printer']
      ]
    },
    {
      kind: 'para',
      text: 'The impact branch is the older and the noisier, and it has one working property the quiet branch cannot copy: physical pressure passes through. A dot matrix printer hammers its pins through a ribbon, and the strike carries to the layers beneath — carbon-copy and multi-part forms, the kind typically still found at tills, dispatch counters and warehouses, print legibly on every ply at once. No inkjet or laser can press through a stack of forms. That single property, not nostalgia, is why impact printers survive in those corners of working life, long after the branch lost the desk.'
    },

    // ---------------- inkjet ----------------
    {
      kind: 'heading',
      text: 'The Inkjet Printer: Flinging Micro-Droplets'
    },
    {
      kind: 'para',
      text: 'The inkjet is the non-impact printer of the home desk, and its mechanism is exactly what the name says: a jet of ink. A print head sweeps across the paper carrying a bank of tiny nozzles, and each nozzle flicks out micro-droplets of ink — many of them per page, placed by the machine’s numbers onto the paper’s grid of positions. There is no striking and no pressing: the mark is made by a droplet landing. The mechanism is simple to state and demanding to build, which is why the droplet-flinging head is the heart — and typically the cost — of every home inkjet.'
    },
    {
      kind: 'para',
      text: 'How does a nozzle fling a droplet small enough to be invisible? Two families of answers exist, and both are worth naming at concept level. In a thermal nozzle, a tiny heater boils a micro-bubble of vapour inside the ink chamber, and the expanding bubble kicks the droplet out of the opening — a small steam-powered flick, though the printer still counts as non-impact because nothing strikes the paper. In a piezoelectric nozzle, a small crystal flexes when electrically tickled and physically pushes the droplet out — a crystal muscle doing the kicking. The two families coexist on the market, and both deliver droplets far finer than a hair.'
    },
    {
      kind: 'para',
      text: 'The ink itself comes in two households, dye and pigment. Dye inks dissolve their colour into the liquid and typically give the brighter, smoother page; pigment inks hold tiny solid particles in suspension and typically give the more durable, water-resistant one — the usual choice where a page must survive weather or decades. Both households were rarities until home inkjets arrived in the mid-1980s, and the family has owned the home desk ever since. This book dates that arrival no more precisely than “the mid-1980s”, which is the honest level for our needs — no brand dates belong here.'
    },

    // ---------------- laser ----------------
    {
      kind: 'heading',
      text: 'The Laser Printer: Writing with Light'
    },
    {
      kind: 'para',
      text: 'The laser printer begins with a researcher looking at a photocopier and asking what a beam of light could do to it. In 1969, at Xerox, Gary Starkweather had the idea of using a laser beam to draw onto the copier drum — the same drum a photocopier already used, but written by light instead of by a projected image. The idea became a laboratory machine, EARS, developed at Xerox PARC in 1972; the first commercial implementation was the IBM 3800 in 1976; and the Xerox 9700 brought the family to market in 1977. Those early machines were big, institutional beasts — the mass market had to wait, and the wait ended in the 1980s.'
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'The laser printer’s dated witnesses',
      text: 'The chain, in order: the idea — a laser beam drawing onto the copier drum — at Xerox in 1969, credited to Gary Starkweather; EARS, developed at Xerox PARC in 1972; the first commercial implementation, the IBM 3800, in 1976; the Xerox 9700, brought to market in 1977; the HP LaserJet, released in 1984 — the first laser printer intended for mass-market sales; and the Apple LaserWriter, introduced in 1985, carrying the PostScript page-description language. Dates beyond these the reader does not need, and this book invents none.'
    },
    {
      kind: 'para',
      text: 'Stripped to its mechanism, the laser printer is a drum, a laser, a powder and a hot roller. The drum is a cylinder whose surface can hold an electrostatic charge; the laser writes the page onto that charged surface as a pattern of light; the powder — toner, a dry ink in particle form — clings wherever the light wrote; the paper then carries the powder away, and the hot roller melts it permanently into the fibres. Notice, too, what the laser never does: it never traces letters as strokes, the way a pen would — it writes in dots, and the page it produces is a mosaic, like the screen’s. The whole page walks a six-beat cycle, one beat per transformation, and the machine repeats it for every page it prints. Learn it as the algorithm below — and as the ring drawn beneath it, because the drum returns to beat 1 after every page.'
    },
    {
      kind: 'algorithm',
      title: 'The laser printer’s six-beat print cycle',
      lines: [
        { code: 'CHARGE — give the drum a uniform electrostatic charge', note: 'the drum starts every page blank and evenly charged.' },
        { code: 'WRITE — the laser draws the page on the drum with light', note: 'wherever the beam strikes, the charge is lifted — the image is now an invisible pattern of charge.' },
        { code: 'DEVELOP — toner clings where the laser wrote', note: 'the dry toner powder is attracted only to the written regions.' },
        { code: 'TRANSFER — the toner moves onto the paper', note: 'the paper rolls against the drum and the pattern crosses over.' },
        { code: 'FUSE — heat melts the toner into the page', note: 'a heated roller bonds the powder permanently — this is why laser pages come out warm.' },
        { code: 'CLEAN — clear the drum for the next page', note: 'leftover toner is swept away and the drum returns to beat 1.' }
      ],
      note: 'six beats, one page: the drum cycles once per printed page, and the beat names are the vocabulary examinations ask for.'
    },
    {
      kind: 'figure',
      caption: 'The laser printer’s six beats on a ring: charge, write, develop, transfer, fuse, clean — the drum at the centre, paper entering at transfer and the warm page exiting at fuse.',
      svg: out22PrinterLaserSvg()
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'A Note — why laser pages come out warm',
      text: 'Toner is a dry powder, and powder does not soak into paper — it must be melted on. The fuse beat presses the page through a heated roller, and the toner fuses into the fibres as it cools. The page you lift from the tray has, seconds earlier, been through a hot press; that gentle warmth is the fingerprint of the fuse beat, and an honest way to tell a laser page from an inkjet one by touch alone.'
    },
    {
      kind: 'terms',
      items: [
        { term: 'impact printer', def: 'a printer that marks by physical striking through a ribbon — dot matrix and daisy wheel.' },
        { term: 'non-impact printer', def: 'a printer that marks without striking — inkjet (flung droplets) and laser (fused toner).' },
        { term: 'nozzle (thermal / piezoelectric)', def: 'the inkjet’s droplet-flinger: a vapour bubble kicks the drop out (thermal), or a flexing crystal pushes it out (piezoelectric).' },
        { term: 'toner', def: 'the laser printer’s dry ink: a powder that clings to the written drum and is fused onto the page by heat.' },
        { term: 'DPI (dots per inch)', def: 'the printer’s density habit: dots per linear inch — squared for dots per square inch.' }
      ]
    },

    // ---------------- the printer’s mathematics ----------------
    {
      kind: 'heading',
      text: 'The Printer’s Mathematics'
    },
    {
      kind: 'para',
      text: 'A printer’s quality, like a screen’s, is a census — and the counting unit is the dot. Printer quality is quoted in dots per inch (dpi): a 300 dpi printer lays 300 dots on every linear inch of paper. The linear number is easy; the honest census is the square one, because a square inch of paper carries dots in both directions at once. One square inch at 300 dpi is a lattice 300 dots wide and 300 dots tall — $300^{2} = 90{,}000$ dots. Note the naming habit while you are here: screens say PPI, printers say dpi, and it is the same arithmetic in different work clothes.'
    },
    {
      kind: 'example',
      title: 'One square inch at 300 dpi.',
      steps: [
        'A printer’s dpi counts dots per linear inch; the areal census is a square law.',
        'Take 300 dpi: one linear inch of paper carries 300 dots.',
        'Now, square it for the square inch: $300^{2} = 90{,}000$ dots.',
        'Hence one square inch at 300 dpi carries $90{,}000$ dots — and at 600 dpi it carries $360{,}000$, exactly four times more.'
      ]
    },
    {
      kind: 'formula',
      name: 'Dots per square inch',
      latex: 'D = d^{2}',
      note: 'd dots per linear inch give d² dots per square inch — 300 dpi gives 90,000; 600 dpi gives 360,000.'
    },
    {
      kind: 'para',
      text: 'Now double the quality to 600 dpi, and watch the square law bite: $600^{2} = 360{,}000$ dots per square inch — four times the census, from twice the linear density. You met this exact ×4 law in lesson 2.1, from the scanner’s side of the boundary: doubling the samples per inch quadruples the census per square inch, whichever direction the numbers cross. The law’s derivation belongs to 2.1, and we do not re-prove it here — this lesson uses it, and uses it honestly: twice the dpi is four times the dots, never “twice as many”. That is the kinship of the whole chapter: one arithmetic, both halves of the handshake.'
    },
    {
      kind: 'para',
      text: 'Put the census to work on the most familiar printed object there is: the snapshot photograph. A 4 × 6-inch print at 300 dpi carries $4 \\times 300 = 1200$ dots along its short side and $6 \\times 300 = 1800$ along its long one, for a census of $1200 \\times 1800 = 2{,}160{,}000$ dots — pleasingly close to the 1080p screen census, which is one quiet reason a 300 dpi snapshot feels “screen-sharp” in the hand. The worked illustration below runs the arithmetic; note how the page census and the square-inch census give the same answer by two different routes, a check worth making a habit.'
    },
    {
      kind: 'example',
      title: 'A 4 × 6-inch photo at 300 dpi.',
      steps: [
        'A snapshot print measures 4 inches by 6 inches, printed at 300 dots per inch.',
        'Take each side: $4 \\times 300 = 1200$ dots along the short side, and $6 \\times 300 = 1800$ dots along the long side.',
        'Now, multiply for the census: $1200 \\times 1800 = 2{,}160{,}000$ dots.',
        'Hence the photo carries $2{,}160{,}000$ dots — pleasingly close to the 1080p screen census, on paper.'
      ]
    },
    {
      kind: 'para',
      text: 'Quality has a twin: speed, quoted in pages per minute (ppm). And speed, like pixel density and like the frame budget, is a division. A 20 ppm printer must complete a page every $60/20 = 3$ seconds; a 30 ppm printer every $60/30 = 2$ seconds. The numbers arrive by division, not by stopwatch — you can carry them in your head the way you carry the frame budget, and for the same reason: both are a pie of time sliced by a count per unit time. The worked illustration below does the slicing for both speeds.'
    },
    {
      kind: 'example',
      title: 'The page budget: pages per minute.',
      steps: [
        'A printer’s speed is quoted in pages per minute; the page budget is the time one page may take.',
        'Take a 20 ppm printer: it must finish 20 pages inside 60 seconds.',
        'Now, divide: $60/20 = 3$ seconds per page.',
        'So, a 30 ppm printer: $60/30 = 2$ seconds per page.',
        'Hence the page budget is 3 seconds at 20 ppm and 2 seconds at 30 ppm — speed is a division, just like pixel density.'
      ]
    },

    // ---------------- sound output ----------------
    {
      kind: 'heading',
      text: 'Sound Output: the Pipeline from Numbers to Pressure'
    },
    {
      kind: 'para',
      text: 'The third household turns numbers into sound, and its pipeline is short enough to say in one breath. The machine’s finished numbers — a long stream of samples, each one a number — flow into a digital-to-analogue converter (DAC), which turns each number into a voltage level. The voltage, still far too feeble to move anything, flows into an amplifier, which enlarges it. The enlarged voltage drives a speaker, whose cone pushes the air, and the ear catches the pressure wave. Numbers to voltage to motion to pressure: four steps, one direction, outwards — the pipeline is the input pipeline of lesson 2.1’s microphone, run backwards.'
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — DAC (digital-to-analogue converter)',
      text: 'A digital-to-analogue converter is said to be the unit that converts the machine’s finished numbers into a continuously varying voltage. Thus the DAC is the first beat of the sound pipeline: numbers in, voltage out — and the amplifier and speaker carry the wave the rest of the way to the ear.'
    },
    {
      kind: 'para',
      text: 'The speaker itself, stated at concept level, is a magnet and a coil of wire — the voice coil — attached to a cone. Current through the coil makes it an electromagnet, which pushes towards or pulls away from the permanent magnet; the reversing current of the signal pushes and pulls the coil, and the cone rides with it. The cone’s to-and-fro pushes the air in front of it, and the push travels outward as a pressure wave. That is the whole mechanism at this level — current pushes the coil, the cone pushes the air, and the ear catches the wave. The finer acoustics of cabinets and resonance are a deeper study than this first census needs.'
    },
    {
      kind: 'para',
      text: 'The census of loudspeakers is a census of cabinets, because a speaker is always a box working on the air around it. Full-size loudspeakers are cabinets tuned to their drivers; headphones are the cabinet shrunk to cup your ear; earbuds shrink it again to a seal in the canal; and a phone’s built-in speaker is the whole cabinet collapsed into a slit of the case — a small room, working on a small amount of air. The physics does not change across the census — magnet, coil, cone, air — only the cabinet and the air it can honestly move. Big cabinets move big air; a phone’s slit moves less, and typically thins out at the bass end.'
    },

    // ---------------- the CD’s arithmetic ----------------
    {
      kind: 'heading',
      text: 'The CD’s Sampling Arithmetic'
    },
    {
      kind: 'para',
      text: 'Sound output has one worked arithmetic every computer-literate reader should own, and it is the output twin of the microphone arithmetic from lesson 2.1. CD-quality audio samples the wave 44,100 times per second, keeps 16 bits per sample, and carries two channels for stereo. One second’s cost is the product of the three: $44{,}100 \\times 16 \\times 2 = 1{,}411{,}200$ bits per second, or 1411.2 kbps. The multiplication is stated below as an equation — learn it as a chain of three honest numbers rather than as one big result, and you will be able to rebuild it whenever you need it.'
    },
    {
      kind: 'equation',
      latex: 'B = 44{,}100 \\times 16 \\times 2 = 1{,}411{,}200\\ \\text{bits per second} = 1411.2\\ \\text{kbps} \\tag{2}',
      note: 'The CD bitrate law: samples per second, times bits per sample, times channels.'
    },
    {
      kind: 'formula',
      name: 'CD bitrate',
      latex: 'B = 44{,}100 \\times 16 \\times 2',
      note: '1,411,200 bits per second — 1411.2 kbps of 16-bit, 44.1 kHz stereo audio.'
    },
    {
      kind: 'para',
      text: 'Why 44,100, and not some rounder number? The honest answer is a ceiling named after Nyquist: a sampling rate of $f$ samples per second can only carry tones below $f/2$ hertz — above that ceiling, tones fold down into false lower ones. Halve the CD’s rate and the ceiling is $44{,}100/2 = 22{,}050$ Hz. The human ear, at its young best, tops out at about 20,000 Hz — a ballpark, honestly labelled. So 44,100 was chosen to overtop hearing with room to spare, and the Red Book standard that fixed 44.1 kHz and 16 bits was published in 1980. The margin, not the mystique, is the reason for the number.'
    },
    {
      kind: 'example',
      title: 'The Nyquist ceiling of the CD.',
      steps: [
        'A sampling rate of $f$ samples per second can only carry tones below $f/2$ — the Nyquist ceiling.',
        'Take the CD’s rate: $f = 44{,}100$ samples per second.',
        'Now, halve it: $44{,}100/2 = 22{,}050$ Hz.',
        'So, compare with hearing: the ear’s ceiling is about $20{,}000$ Hz — a ballpark, honestly labelled.',
        'Hence the CD’s Nyquist ceiling of 22,050 Hz sits comfortably above the roughly 20,000 Hz ceiling of human hearing.'
      ]
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'A Note — why 44.1 kHz, and not “40-something”',
      text: 'The Nyquist ceiling halves the sampling rate: 44,100 samples per second carry tones only below 22,050 Hz, which comfortably overtops the roughly 20,000 Hz ceiling of human hearing — the margin is the whole point. The Red Book standard that fixed 44.1 kHz and 16 bits for the compact disc was published in 1980, and every CD arithmetic in this lesson descends from that pair of numbers.'
    },
    {
      kind: 'para',
      text: 'The 16 bits per sample have their own census, and it is chapter 1’s powers ladder again: $2^{16} = 65{,}536$ possible levels per sample. Compare 8-bit audio’s $2^{8} = 256$ levels, and the gap is a factor of exactly 256 — each 16-bit sample distinguishes 256 times more levels than an 8-bit one, which is why 8-bit audio sounds stepped where CD audio sounds smooth. The pixel family keeps the same ladder: a 24-bit colour pixel reaches $2^{24} = 16{,}777{,}216$ colours, as counted earlier. One ladder, pixel and sample alike — bits are bits, whichever side of the output boundary carries them.'
    },
    {
      kind: 'terms',
      items: [
        { term: 'DAC (digital-to-analogue converter)', def: 'the unit that turns each finished number into a voltage level — the first beat of the sound pipeline.' },
        { term: 'amplifier', def: 'the unit that enlarges the DAC’s feeble voltage enough to drive a speaker cone.' },
        { term: 'voice coil', def: 'the coil of wire attached to a speaker’s cone; current in the coil pushes it towards or away from the magnet.' },
        { term: 'sampling rate', def: 'how many samples are taken per second; the CD’s is 44,100, whose Nyquist ceiling is 22,050 Hz.' },
        { term: 'bit depth', def: 'the bits kept per sample; 16 bits give 65,536 possible levels, 256 times the 256 of 8-bit audio.' }
      ]
    },

    // ---------------- the output census: a synthesis ----------------
    {
      kind: 'heading',
      text: 'The Output Census: a Synthesis'
    },
    {
      kind: 'para',
      text: 'From the census of one pixel to the payload of a 74-minute disc, this lesson has done nothing but count — and the counting deserves one honest gathering. Every output device met here is a transducer in reverse, turning the machine’s finished numbers into something a human sense can catch; the microphone, camera and keyboard of lesson 2.1 point in, these point out. The table below is the whole lesson in three rows: what each household turns numbers into, and which sense receives. How well each device serves its human — glare, flicker, unreadable fonts, blasting volume — is a question of usability, and it belongs to lesson 2.3 “Interacting Well: the First Usability Instincts”, and at full depth to the book Human-Computer Interaction; this lesson built the census, and the next lesson asks what the census is for.'
    },
    {
      kind: 'table',
      caption: 'The output census: every output device is a transducer in reverse.',
      head: ['Output device household', 'What the numbers become', 'Which human sense receives'],
      rows: [
        ['the screen', 'light — a grid of pixels', 'the eye'],
        ['the printer', 'ink or toner on paper', 'the hand and the eye'],
        ['the speaker', 'pressure waves in the air', 'the ear']
      ]
    },
    {
      kind: 'para',
      text: 'From the above discussion, it follows that output is the mirror of input: the same boundary, the same censuses, the same arithmetic — crossed in the opposite direction, ending in light, ink and pressure instead of beginning with keystrokes, photographs and sound.'
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'an output device is a transducer in reverse: it turns the machine’s finished numbers into light, ink or pressure waves for a human sense;',
        'the pixel is the atom of every screen, and the 1080p census is $1920 \\times 1080 = 2{,}073{,}600$ pixels — exactly 16:9, since $17{,}280$ comes out both ways;',
        'the honest cousin $1366 \\times 768$ holds $1{,}049{,}088$ pixels and is “16:9” only after rounding up from $1365\\tfrac{1}{3}$ — so check labels with arithmetic;',
        'the frame budget is $1000/f$ milliseconds — 33.3 ms at 30 Hz, 16.7 ms at 60 Hz, 6.9 ms at 144 Hz;',
        'pixel density is a division: the same 2,202.9-pixel diagonal gives about 92 PPI on a 24-inch monitor and about 400 PPI on a 5.5-inch phone;',
        'printers split into impact (dot matrix, daisy wheel) and non-impact (inkjet, laser), and the laser walks six beats — charge, write, develop, transfer, fuse, clean — leaving pages warm;',
        'DPI is a square law: 300 dpi means $90{,}000$ dots per square inch, and doubling to 600 dpi gives exactly four times more — $360{,}000$;',
        'CD-quality sound streams $44{,}100 \\times 16 \\times 2 = 1{,}411{,}200$ bits per second, and its Nyquist ceiling of 22,050 Hz overtops human hearing’s roughly 20,000 Hz.'
      ]
    },

    // ---------------- exam corner ----------------
    {
      kind: 'heading',
      text: 'Exam Corner'
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam Corner — what examinations ask of output devices',
      text: 'Banking, SSC and school/board computer-awareness papers keep five habits around output devices: (i) classify-the-device — which of a listed set is an output device; (ii) the impact-versus-non-impact split — dot matrix and daisy wheel on one side, inkjet and laser on the other; (iii) the laser-printer history chain — 1969 idea, 1972 EARS, 1976 IBM 3800, 1977 Xerox 9700, 1984 HP LaserJet, 1985 Apple LaserWriter; (iv) the panel families — LCD, LED and OLED, and the CRT that faded; (v) DPI arithmetic — dots per square inch and the ×4 law. The exercises below drill all five. These are exam-style — original items written in the examination idiom, not real past-paper questions.'
    },

    // ---------------- quiz ----------------
    {
      kind: 'heading',
      text: 'Check Your Understanding'
    },
    {
      kind: 'quiz',
      items: [
        {
          q: 'Which of the following is an output device?',
          options: ['A trackball', 'A computer monitor', 'A flatbed scanner', 'A webcam'],
          answer: 1,
          explain: 'A monitor turns the machine’s finished numbers into light on a grid of pixels, and the eye receives it — so it is an output device. A trackball, a flatbed scanner and a webcam all hand information across the boundary in the other direction, from the human to the machine — they are input devices, the material of lesson 2.1.'
        },
        {
          q: 'A screen grid of $1920 \\times 1080$ pixels holds how many pixels?',
          options: ['1,049,088', '1,411,200', '2,073,600', '16,777,216'],
          answer: 2,
          explain: 'The census multiplies width by height: 1920 × 1080 = 2,073,600 pixels. 1,049,088 is the census of the honest cousin 1366 × 768; 1,411,200 is the CD’s bitrate in bits per second, a sound quantity, not a screen one; and 16,777,216 is the colour census of a single 24-bit pixel — a different census altogether.'
        },
        {
          q: 'A dot matrix printer belongs to which family?',
          options: [
            'the impact family — its pins strike an inked ribbon',
            'the non-impact family — it flings ink droplets',
            'the non-impact family — it fuses toner with heat',
            'neither family — it is an input device'
          ],
          answer: 0,
          explain: 'A dot matrix printer marks paper physically: pins strike through an inked ribbon, so it is an impact printer — the family that survives where carbon-copy forms matter. Flung droplets describe the inkjet and fused toner the laser, both non-impact; and a printer of any family hands results out of the machine, so “input device” is simply the wrong side of the boundary.'
        },
        {
          q: 'At a refresh rate of $60$ Hz, what is the frame budget?',
          options: ['33.3 ms', '16.7 ms', '6.9 ms', '60 ms'],
          answer: 1,
          explain: 'The budget is 1000/f milliseconds: 1000/60 ≈ 16.7 ms per frame. 33.3 ms belongs to a 30 Hz panel and 6.9 ms to a 144 Hz one; 60 ms confuses the rate in hertz with a duration — hertz counts frames per second, not milliseconds.'
        },
        {
          q: 'Which printer was the first laser printer intended for the mass market?',
          options: [
            'the Xerox 9700, brought to market in 1977',
            'the IBM 3800, the first commercial implementation, 1976',
            'the Apple LaserWriter of 1985, carrying PostScript',
            'the HP LaserJet, released in 1984'
          ],
          answer: 3,
          explain: 'The HP LaserJet, released in 1984, was the first laser printer intended for mass-market sales. The Xerox 9700 of 1977 and the IBM 3800 of 1976 were big commercial machines, not mass-market ones; the Apple LaserWriter followed in 1985 and is remembered for carrying the PostScript page-description language, not for being first to the mass market.'
        }
      ]
    },

    // ---------------- exercises ----------------
    {
      kind: 'heading',
      text: 'Exercises'
    },
    {
      kind: 'exercises',
      title: 'Exercises — fifteen questions in six levels',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'From this list — keyboard, screen, mouse, printer, scanner, speaker — name the output devices, and state what the machine’s finished numbers become in each case.',
              solution: [
                'The lesson’s census names three output households: the screen, the printer and the speaker.',
                'Check each listed device against the boundary: an output device carries the machine’s finished numbers out across the output unit to a human sense.',
                'So, the screen, the printer and the speaker stand on the output side; the keyboard, the mouse and the scanner are input devices, the material of lesson 2.1.',
                'Hence the output devices are the screen (numbers become light for the eye), the printer (numbers become ink on paper for the hand) and the speaker (numbers become pressure waves for the ear).'
              ],
              answer: 'the screen, the printer and the speaker — light, ink and pressure waves; the keyboard, mouse and scanner are input devices'
            },
            {
              q: 'A commonly sold laptop grid is $1366 \\times 768$. Count its pixels.',
              solution: [
                'A pixel census multiplies the grid’s width by its height — the census law of this lesson.',
                'Take the width 1366 and the height 768, and multiply: $1366 \\times 768 = 1{,}049{,}088$.',
                'Check the size of the answer: a million-odd pixels, roughly half the 1080p census of $2{,}073{,}600$.',
                'Hence the $1366 \\times 768$ grid holds $1{,}049{,}088$ pixels — the honest 16:9 cousin counted above, as the census strip below shows.'
              ],
              answer: '1,049,088 pixels',
              figures: [
                {
                  caption: 'The census strip: 1366 across times 768 down equals 1,049,088 pixels.',
                  svg: out22CensusStripSvg()
                }
              ]
            }
          ]
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'A shop labels a $1366 \\times 768$ screen “16:9”. Is the label exact? Check it.',
              solution: [
                'A grid is exactly 16:9 only when sixteen times its height equals nine times its width — the aspect check.',
                'Take the ideal width for a height of 768: $768 \\times 16/9 = 1365\\tfrac{1}{3}$ pixels.',
                'Now, compare: the ideal width is $1365\\tfrac{1}{3}$ pixels, but the panel is 1366 wide — one pixel more than the ideal.',
                'Hence the label is honest only after rounding up: the grid is nearly 16:9, not exactly 16:9 — check a manufacturer’s arithmetic before trusting it.'
              ],
              answer: 'not exact — the ideal width is 1365⅓ pixels, and 1366 rounds it up'
            },
            {
              q: 'Compute the frame budget at 30 Hz, 60 Hz and 144 Hz, and arrange the three budgets in order.',
              solution: [
                'The frame budget is the time one frame may take: $T = 1000/f$ milliseconds for a refresh rate $f$ in hertz.',
                'Take 30 Hz: $1000/30 = 33.3$ ms per frame.',
                'Now, 60 Hz: $1000/60 = 16.7$ ms per frame.',
                'So, 144 Hz: $1000/144 = 6.9$ ms per frame.',
                'Hence the budgets fall in order 33.3 ms, 16.7 ms, 6.9 ms — the faster the refresh, the tighter the budget, as the ladder below shows.'
              ],
              answer: '33.3 ms at 30 Hz; 16.7 ms at 60 Hz; 6.9 ms at 144 Hz — decreasing',
              figures: [
                {
                  caption: 'The frame-budget ladder: bar length is the frame budget in milliseconds.',
                  svg: out22FrameLadderSvg()
                }
              ]
            }
          ]
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'A phone shows the same 1080p grid — held portrait, $1080 \\times 1920$ — on a 5.5-inch diagonal. Compute its pixel density.',
              solution: [
                'The grid is the 1080p census rotated portrait, so the diagonal pixel count is unchanged: about $2202.9$ pixels, the same hypotenuse from the PPI derivation.',
                'Take that diagonal count: $2202.9$ pixels on the diagonal, however the grid is held.',
                'Now, divide by the phone’s diagonal, 5.5 inches: $2202.9/5.5 \\approx 400.5$ PPI.',
                'Check it honestly: $400.5$ is “about 400 PPI” — the same census the 24-inch monitor spreads to about 92 PPI.',
                'Hence the phone’s density is about 400 pixels per inch — density is a division, not a property of the pixels, as the triangle below shows.'
              ],
              answer: 'about 400.5 PPI — “about 400 pixels per inch”',
              figures: [
                {
                  caption: 'The PPI triangle: legs 1080 px and 1920 px, hypotenuse 2,202.9 px, divided by the 5.5-inch diagonal.',
                  svg: out22PpiTriangleSvg()
                }
              ]
            },
            {
              q: 'Compare one square inch printed at 300 dpi and at 600 dpi. By what factor does the dot census grow?',
              solution: [
                'Dots per square inch is a square law: $d$ dots per linear inch give $d^{2}$ dots per square inch.',
                'Take 300 dpi: $300^{2} = 90{,}000$ dots per square inch.',
                'Now, 600 dpi: $600^{2} = 360{,}000$ dots per square inch.',
                'So, divide the two: $360{,}000/90{,}000 = 4$ — exactly four.',
                'Hence doubling the dots per inch multiplies the dots per square inch by exactly 4 — the same ×4 law met from the scanner side in lesson 2.1, drawn in the two square inches below.'
              ],
              answer: 'from 90,000 to 360,000 dots per square inch — a factor of exactly 4',
              figures: [
                {
                  caption: 'One square inch at 300 dpi versus 600 dpi: twice the dpi, four times the dots.',
                  svg: out22DpiGridsSvg()
                }
              ]
            },
            {
              q: 'A 4 × 6-inch photo is printed at 300 dpi. Count its dots two ways, and check that the two routes agree.',
              solution: [
                'The photo is 4 inches by 6 inches, printed at 300 dots per linear inch.',
                'Take each side: $6 \\times 300 = 1800$ dots along the long side, and $4 \\times 300 = 1200$ dots along the short side.',
                'Now, multiply for the census: $1200 \\times 1800 = 2{,}160{,}000$ dots.',
                'Check it the second way: the photo covers $4 \\times 6 = 24$ square inches, and each square inch at 300 dpi carries $90{,}000$ dots, so $24 \\times 90{,}000 = 2{,}160{,}000$ — the same census.',
                'Hence the 4 × 6 photo at 300 dpi carries $2{,}160{,}000$ dots, by either route.'
              ],
              answer: '1200 × 1800 = 2,160,000 dots — confirmed by 24 square inches × 90,000 dots per square inch'
            }
          ]
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Compute the bitrate of one second of CD-quality stereo: 44,100 samples per second, 16 bits per sample, two channels.',
              solution: [
                'The bitrate multiplies the three quantities: samples per second, bits per sample, and channels.',
                'Take the samples: $44{,}100$ every second, each carrying $16$ bits, on $2$ channels.',
                'Now, multiply: $44{,}100 \\times 16 \\times 2 = 1{,}411{,}200$ bits per second.',
                'So, in kilobits: $1{,}411{,}200/1000 = 1411.2$ kbps.',
                'Hence one second of CD-quality stereo costs $1{,}411{,}200$ bits — 1411.2 kbps — the output twin of the microphone arithmetic of lesson 2.1, laid out on the ruler below.'
              ],
              answer: '1,411,200 bits per second = 1411.2 kbps',
              figures: [
                {
                  caption: 'One second of CD stereo as a labelled ruler: 44,100 samples, 16 bits each, two channels — not to scale.',
                  svg: out22CdStripSvg()
                }
              ]
            },
            {
              q: 'Exam-style (an original item in the examination idiom, not a real past-paper question): arrange the laser printer’s witnesses in correct chronological order — (A) the HP LaserJet, released 1984; (B) the laser idea at Xerox, 1969; (C) the IBM 3800, the first commercial implementation, 1976; (D) EARS at Xerox PARC, 1972; (E) the Xerox 9700, brought to market 1977; (F) the Apple LaserWriter, 1985.',
              solution: [
                'The chain runs by year, so check each dated witness in turn.',
                'Take the earliest: the idea itself, at Xerox in 1969 — Gary Starkweather’s laser beam drawing onto the copier drum — so B leads.',
                'Now, order the rest by their pinned years: EARS at Xerox PARC in 1972, the IBM 3800 in 1976, the Xerox 9700 in 1977, the HP LaserJet in 1984, and the Apple LaserWriter in 1985.',
                'Hence the order is B (1969), D (1972), C (1976), E (1977), A (1984), F (1985).'
              ],
              answer: 'B → D → C → E → A → F — 1969, 1972, 1976, 1977, 1984, 1985'
            },
            {
              q: 'Exam-style pair (original items in the examination idiom, not real past-paper questions): (i) which of the following is an output device — a barcode reader, a monitor, a light pen, a microphone? (ii) classify the laser printer and the dot matrix printer as impact or non-impact.',
              solution: [
                'Part (i): check each device against the boundary — which one carries the machine’s finished numbers out to a human sense?',
                'So, the monitor is the output device; a barcode reader, a light pen and a microphone all hand information in — input devices of lesson 2.1.',
                'Part (ii): take the marking method — the laser printer fuses toner with heat and strikes nothing, so it is non-impact; the dot matrix pins strike an inked ribbon, so it is impact.',
                'Hence (i) the monitor; (ii) the laser printer is non-impact, the dot matrix printer is impact.'
              ],
              answer: '(i) the monitor; (ii) laser printer — non-impact; dot matrix printer — impact'
            }
          ]
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'A US Letter page (8.5 inches by 11 inches) is printed at 300 dpi. Count the dots in one colour layer, and state honestly why the full census of a colour page is larger.',
              solution: [
                'The page is 8.5 inches by 11 inches, printed at 300 dots per linear inch.',
                'Take each side: $8.5 \\times 300 = 2550$ dots across, and $11 \\times 300 = 3300$ dots down.',
                'Now, multiply: $2550 \\times 3300 = 8{,}415{,}000$ dots in one colour layer.',
                'So, state it honestly: this is the census of one colour layer — a colour page layers several such censuses, one per ink, exactly as 2.1’s scanner arithmetic counted a layer at a time.',
                'Hence one US Letter layer at 300 dpi carries $8{,}415{,}000$ dots.'
              ],
              answer: '2550 × 3300 = 8,415,000 dots per colour layer'
            },
            {
              q: 'A full CD holds 74 minutes of this stereo stream. How many bytes is that, and roughly how many mebibytes?',
              solution: [
                'The stream runs at $1{,}411{,}200$ bits per second, as computed above.',
                'Take the seconds: 74 minutes is $74 \\times 60 = 4440$ seconds.',
                'Now, gather the whole chain in one line, converting bits to bytes at the end: $44{,}100 \\times 16 \\times 2 \\times 74 \\times 60/8 = 783{,}216{,}000$ bytes.',
                'So, in mebibytes: $783{,}216{,}000/2^{20} \\approx 747$ MiB — a mebibyte being $2^{20}$ bytes.',
                'Hence the disc carries $783{,}216{,}000$ bytes, about 747 MiB — roughly three-quarters of a billion bytes.'
              ],
              answer: '783,216,000 bytes ≈ 747 MiB — roughly three-quarters of a billion bytes'
            },
            {
              q: 'A 16-bit audio sample distinguishes how many possible levels? Compare it with 8-bit audio, and state the factor between them.',
              solution: [
                'A sample of $b$ bits distinguishes $2^{b}$ levels — the powers ladder of chapter 1.',
                'Take 16-bit audio: $2^{16} = 65{,}536$ possible levels per sample.',
                'Now, 8-bit audio: $2^{8} = 256$ levels.',
                'So, the factor: $65{,}536/256 = 256$ — exactly 256 times finer.',
                'Hence 16-bit audio carries 65,536 levels per sample — 256 times the 256 levels of 8-bit audio; the pixel’s 24-bit colour cousin reaches $2^{24} = 16{,}777{,}216$ colours on the same ladder.'
              ],
              answer: '65,536 levels; 256 levels at 8 bits; the factor is exactly 256'
            }
          ]
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Argue, via Nyquist, why a sampling rate of 44,100 per second suffices for music aimed at the human ear.',
              solution: [
                'The claim to argue: 44,100 samples per second is enough to carry any tone the human ear can catch.',
                'Take the Nyquist ceiling: a sampling rate of $f$ samples per second carries only tones below $f/2$ hertz — the ceiling of the rate.',
                'Now, compute the CD’s ceiling: $44{,}100/2 = 22{,}050$ Hz.',
                'So, compare with hearing: the human ear’s ceiling is about $20{,}000$ Hz — a ballpark, honestly labelled.',
                'Check the margin: $22{,}050$ Hz sits comfortably above about $20{,}000$ Hz, leaving headroom before the ceiling bites.',
                'Hence 44.1 kHz suffices: its Nyquist ceiling of 22,050 Hz overtops the roughly 20,000 Hz ceiling of human hearing, so no audible tone escapes the census.'
              ],
              answer: '44,100/2 = 22,050 Hz > about 20,000 Hz — the Nyquist ceiling overtops human hearing'
            },
            {
              q: 'Prove the ×4 law: if a printer’s linear dot density doubles, its dots-per-square-inch census quadruples.',
              solution: [
                'Let the printer lay $d$ dots per linear inch; the claim to prove is that doubling $d$ multiplies the areal census by exactly 4.',
                'Take one square inch: it spans $d$ dot-columns across and $d$ dot-rows down, so its census is $d \\times d = d^{2}$ dots.',
                'Now, double the density to $2d$: the same square inch spans $2d$ columns and $2d$ rows, so its census is $(2d)^{2} = 4d^{2}$.',
                'So, compare: $4d^{2}$ against $d^{2}$ — the ratio is exactly 4, whatever $d$ may be.',
                'Hence doubling the linear density always quadruples the areal census — the ×4 law, proved from area alone.'
              ],
              answer: '(2d)² = 4d² — the areal census grows by exactly 4, whatever d may be'
            }
          ]
        }
      ]
    }
  ]
}


export const chapter02: Chapter = {
  number: 2,
  slug: 'interacting-with-your-computer',
  title: 'Interacting with Your Computer',
  summary:
    'The human side of the machine: input devices (keyboards, pointing devices, scanners, cameras, microphones) and output devices (monitors and their panels, printers, speakers) with how each actually works, plus the first usability instincts — the chapter hands off to Human-Computer Interaction later on the shelf.',
  status: 'in-progress',
  lessons: [lesson21, lesson22],
  plannedLessons: ['Interacting Well: the First Usability Instincts'],
}
