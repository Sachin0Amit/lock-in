import type { Lesson } from '../../../src/data/library/types'

/**
 * PART-CF36 — lesson 3.6 'Decimal to Binary Conversion' (the cf36 seat,
 * CS RUN 5, 2026-11-25). The CRAFT lesson of chapter 3's conversion pair:
 * direction ONE — decimal IN, binary / octal / hexadecimal OUT. Lesson
 * 3.7 owns the reverse direction; 3.8 owns the synthesis. Every number
 * printed here is brute-forced green by v-cf36.ts (96 arithmetic checks
 * + the final re-read block) BEFORE this prose was written.
 *
 * PROVENANCE: ground = the sanctioned web-verified arcs banked at
 * planning (citation key `cs-cf-web-ground`, docs/project/SOURCE_LOG.md).
 * STUDY-NEVER-REPRODUCE absolute: every ladder, figure, Illustration,
 * quiz item and exercise is OUR OWN. Historical notes are our own honest
 * retelling of documented events.
 */

/* palette (vivid set; never blue/indigo) */
const C = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const FONT = 'ui-sans-serif, system-ui, sans-serif'

/* ------------------------------------------------------------------ */
/* shared small helpers                                                */
/* ------------------------------------------------------------------ */

/** remainder -> single digit of the target base (base 16 letters A..F) */
function cf36Digit(r: number): string {
  return r < 10 ? String(r) : 'ABCDEF'[r - 10]
}

/** one centred SVG text line */
function cf36Txt(x: number, y: number, size: number, fill: string, text: string, weight = 'normal', anchor = 'middle'): string {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}">${text}</text>`
}

/* ------------------------------------------------------------------ */
/* GENERIC BUILDER 1 — the division-ladder machine (base 2)            */
/* used by body figure F1 (45) and the solution figures for 23 and 200 */
/* ------------------------------------------------------------------ */

interface Cf36LadderCfg {
  title: string
  subtitle: string
  rows: { n: number; q: number; r: number }[]
  base: number
  answer: string
  answerLabel: string
  check: string
  note: string
  aria: string
}

function cf36LadderSvg(cfg: Cf36LadderCfg): string {
  const W = 720
  const M = 24
  const rowH = 46
  const gap = 14
  const topY = 82
  const n = cfg.rows.length
  const span = n * rowH + (n - 1) * gap
  const rowX = M
  const rowW = 316
  const badgeCx = 386
  const badgeR = 19
  const arrowX = 440
  const labelX = 464
  const ansX = 502
  const ansW = W - M - ansX
  const stripY = topY + span + 18
  const stripH = 58
  const H = stripY + stripH + M
  const firstCy = topY + rowH / 2
  const lastCy = topY + span - rowH / 2
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${cfg.aria}">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf36Txt(W / 2, 34, 12.5, C.teal, cfg.title, 'bold'))
  s.push(cf36Txt(W / 2, 54, 10, C.tealInk, cfg.subtitle))
  s.push(cf36Txt(rowX + rowW / 2, 70, 10, C.tealInk, 'divide by ' + cfg.base))
  s.push(cf36Txt(badgeCx, 70, 10, C.tealInk, 'remainders'))
  // the rows: dividend ÷ base = quotient, with the remainder in its own column
  cfg.rows.forEach((rw, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="${rowX}" y="${by}" width="${rowW}" height="${rowH}" rx="10" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
    s.push(cf36Txt(rowX + rowW / 2, cy + 5, 14.5, C.ink, `${rw.n} ÷ ${cfg.base} = ${rw.q}`))
    s.push(`<circle cx="${badgeCx}" cy="${cy}" r="${badgeR}" fill="${rw.r === 0 ? C.white : C.panelA}" stroke="${rw.r === 0 ? C.teal : C.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(badgeCx, cy + 5.5, 15, C.ink, cf36Digit(rw.r), 'bold'))
    if (k < n - 1) {
      // the quotient flows down to become the next dividend
      const ax = rowX + rowW / 2
      const y1 = by + rowH + 1.5
      const y2 = by + rowH + gap - 1.5
      s.push(`<line x1="${ax}" y1="${y1}" x2="${ax}" y2="${y2 - 5}" stroke="${C.mid}" stroke-width="1.8"/>`)
      s.push(`<polygon points="${ax},${y2} ${ax - 4.5},${y2 - 6} ${ax + 4.5},${y2 - 6}" fill="${C.mid}"/>`)
    }
  })
  // the bottom-up read arrow beside the remainder column
  s.push(`<line x1="${arrowX}" y1="${lastCy}" x2="${arrowX}" y2="${firstCy - 12}" stroke="${C.conn}" stroke-width="2.5"/>`)
  s.push(`<polygon points="${arrowX},${firstCy - 22} ${arrowX - 6},${firstCy - 10} ${arrowX + 6},${firstCy - 10}" fill="${C.conn}"/>`)
  const midY = (firstCy + lastCy) / 2
  s.push(`<text x="${labelX}" y="${midY}" transform="rotate(-90 ${labelX} ${midY})" text-anchor="middle" font-size="10" fill="${C.tealInk}">read bottom-up</text>`)
  // the answer box
  s.push(`<rect x="${ansX}" y="${topY}" width="${ansW}" height="60" rx="12" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(ansX + ansW / 2, topY + 22, 10, C.tealInk, cfg.answerLabel))
  s.push(cf36Txt(ansX + ansW / 2, topY + 46, 19, C.ink, cfg.answer, 'bold'))
  // the check strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.paper}" stroke="${C.faint}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 23, 11, C.ink, cfg.check))
  s.push(cf36Txt(W / 2, stripY + 43, 10, C.tealInk, cfg.note))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* GENERIC BUILDER 2 — the fraction ladder (multiply by 2)              */
/* used by body figure F3 (0.375) and the 0.4375 solution figure       */
/* ------------------------------------------------------------------ */

interface Cf36FracCfg {
  title: string
  steps: { before: string; product: string; bit: number }[]
  answerLine: string
  checkLine: string
  aria: string
}

function cf36FracSvg(cfg: Cf36FracCfg): string {
  const W = 720
  const M = 24
  const topY = 58
  const rowH = 52
  const gap = 30
  const n = cfg.steps.length
  const span = n * rowH + (n - 1) * gap
  const fracX = M
  const fracW = 118
  const prodX = 212
  const prodW = 150
  const slotX = 432
  const slotW = 54
  const downX = 506
  const downLabelX = 528
  const stripY = topY + span + 18
  const stripH = 58
  const H = stripY + stripH + M
  const firstCy = topY + rowH / 2
  const lastCy = topY + span - rowH / 2
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${cfg.aria}">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf36Txt(W / 2, 32, 12.5, C.teal, cfg.title, 'bold'))
  cfg.steps.forEach((st, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="${fracX}" y="${by}" width="${fracW}" height="${rowH}" rx="10" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
    s.push(cf36Txt(fracX + fracW / 2, cy + 5, 14, C.ink, st.before, 'bold'))
    s.push(`<line x1="150" y1="${cy}" x2="204" y2="${cy}" stroke="${C.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="210,${cy} 200,${cy - 5} 200,${cy + 5}" fill="${C.conn}"/>`)
    s.push(cf36Txt(177, cy - 9, 11, C.tealInk, 'x 2'))
    s.push(`<rect x="${prodX}" y="${by}" width="${prodW}" height="${rowH}" rx="10" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
    s.push(cf36Txt(prodX + prodW / 2, cy + 5, 14, C.ink, st.product))
    s.push(`<line x1="370" y1="${cy}" x2="424" y2="${cy}" stroke="${C.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="430,${cy} 420,${cy - 5} 420,${cy + 5}" fill="${C.conn}"/>`)
    s.push(cf36Txt(397, cy - 9, 9.5, C.tealInk, 'integer part'))
    s.push(`<rect x="${slotX}" y="${by}" width="${slotW}" height="${rowH}" rx="8" fill="${st.bit === 1 ? C.panelA : C.white}" stroke="${st.bit === 1 ? C.accent : C.teal}" stroke-width="2"/>`)
    s.push(cf36Txt(slotX + slotW / 2, cy + 6.5, 18, C.ink, String(st.bit), 'bold'))
    if (k < n - 1) {
      // the kept fraction part flows down into the next row
      const prodCx = prodX + prodW / 2
      const fracCx = fracX + fracW / 2
      const midY = by + rowH + gap / 2
      s.push(`<polyline points="${prodCx},${by + rowH + 1.5} ${prodCx},${midY} ${fracCx},${midY} ${fracCx},${by + rowH + gap - 6.5}" fill="none" stroke="${C.teal}" stroke-width="1.8" stroke-dasharray="5 4"/>`)
      s.push(`<polygon points="${fracCx},${by + rowH + gap - 1.5} ${fracCx - 4.5},${by + rowH + gap - 8} ${fracCx + 4.5},${by + rowH + gap - 8}" fill="${C.teal}"/>`)
      if (k === 0) s.push(cf36Txt((prodCx + fracCx) / 2, midY - 7, 9.5, C.tealInk, 'keep the fraction part'))
    }
  })
  // the read-down arrow beside the bit slots
  s.push(`<line x1="${downX}" y1="${firstCy}" x2="${downX}" y2="${lastCy + 12}" stroke="${C.conn}" stroke-width="2.5"/>`)
  s.push(`<polygon points="${downX},${lastCy + 22} ${downX - 6},${lastCy + 10} ${downX + 6},${lastCy + 10}" fill="${C.conn}"/>`)
  const midY = (firstCy + lastCy) / 2
  s.push(`<text x="${downLabelX}" y="${midY}" transform="rotate(-90 ${downLabelX} ${midY})" text-anchor="middle" font-size="10" fill="${C.tealInk}">read DOWN</text>`)
  // the answer strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 23, 12, C.ink, cfg.answerLine, 'bold'))
  s.push(cf36Txt(W / 2, stripY + 43, 10, C.tealInk, cfg.checkLine))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* GENERIC BUILDER 3 — the powers check-off grid (positional method)   */
/* used by the 999 solution figure                                     */
/* ------------------------------------------------------------------ */

interface Cf36PowersCfg {
  title: string
  places: number[]
  marks: number[]
  trail: string[]
  answerLine: string
  aria: string
}

function cf36PowersSvg(cfg: Cf36PowersCfg): string {
  const W = 720
  const M = 24
  const cellW = 56
  const cellH = 58
  const cellGap = 8
  const n = cfg.places.length
  const gridW = n * cellW + (n - 1) * cellGap
  const x0 = M + (W - 2 * M - gridW) / 2
  const gridY = 64
  const trailY0 = 168
  const trailStep = 24
  const trailRows = Math.ceil(cfg.trail.length / 2)
  const stripY = trailY0 + trailRows * trailStep + 14
  const stripH = 50
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${cfg.aria}">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf36Txt(W / 2, 34, 12.5, C.teal, cfg.title, 'bold'))
  // the place-value cells, each with its mark
  cfg.places.forEach((p, k) => {
    const cx = x0 + k * (cellW + cellGap)
    const on = cfg.marks[k] === 1
    s.push(`<rect x="${cx}" y="${gridY}" width="${cellW}" height="${cellH}" rx="8" fill="${on ? C.panelA : C.white}" stroke="${on ? C.accent : C.teal}" stroke-width="2"/>`)
    s.push(cf36Txt(cx + cellW / 2, gridY + 22, 12, C.ink, String(p), 'bold'))
    s.push(cf36Txt(cx + cellW / 2, gridY + 45, 15, on ? C.accent : C.tealInk, String(cfg.marks[k]), 'bold'))
  })
  s.push(cf36Txt(W / 2, gridY + cellH + 18, 10, C.tealInk, 'place values on top, the mark each place earns below - a 1 when the power is subtracted, a 0 when it does not fit'))
  // the subtraction trail, two columns
  const colX = [110, 410]
  cfg.trail.forEach((t, k) => {
    const col = Math.floor(k / trailRows)
    const row = k % trailRows
    const isFit = !t.includes('not')
    s.push(`<text x="${colX[col]}" y="${trailY0 + row * trailStep}" font-size="11" fill="${isFit ? C.ink : C.tealInk}">${t}</text>`)
  })
  // the answer strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 30, 12.5, C.ink, cfg.answerLine, 'bold'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the two-methods map: 100 by ladder and by powers   */
/* ------------------------------------------------------------------ */

function cf36TwoMethods100Svg(): string {
  const W = 760
  const M = 20
  const rows = [
    { n: 100, q: 50, r: 0 }, { n: 50, q: 25, r: 0 }, { n: 25, q: 12, r: 1 },
    { n: 12, q: 6, r: 0 }, { n: 6, q: 3, r: 0 }, { n: 3, q: 1, r: 1 }, { n: 1, q: 0, r: 1 },
  ]
  const places = [
    { p: '64', t: '100 - 64 = 36', m: '1' }, { p: '32', t: '36 - 32 = 4', m: '1' },
    { p: '16', t: '4 - 16 does not fit', m: '0' }, { p: '8', t: '4 - 8 does not fit', m: '0' },
    { p: '4', t: '4 - 4 = 0', m: '1' }, { p: '2', t: '0 - 2 does not fit', m: '0' },
    { p: '1', t: '0 - 1 does not fit', m: '0' },
  ]
  const rowH = 34
  const gap = 6
  const topY = 92
  const n = rows.length
  const span = n * rowH + (n - 1) * gap
  const panelY = 52
  const panelH = topY + span - panelY + 42
  const meetY = panelY + panelH + 26
  const meetH = 52
  const H = meetY + meetH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The two-methods map for the decimal number 100. On the left, the division ladder: seven rows reading 100 divided by 2 equals 50, 50 divided by 2 equals 25, 25 divided by 2 equals 12, 12 divided by 2 equals 6, 6 divided by 2 equals 3, 3 divided by 2 equals 1 and 1 divided by 2 equals 0, with remainder badges 0, 0, 1, 0, 0, 1, 1 read bottom-up as 1100100. On the right, the powers table: place 64 subtracts to leave 36 and earns a 1, place 32 leaves 4 and earns a 1, places 16 and 8 do not fit and earn 0s, place 4 leaves 0 and earns a 1, places 2 and 1 do not fit and earn 0s - the marks read left to right as 1100100. Arrows from both panels meet in one box: both roads meet at 100 equals 1100100 in base 2.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf36Txt(W / 2, 30, 13, C.teal, 'one number, two roads: 100 into base 2', 'bold'))
  // LEFT PANEL — the division ladder
  s.push(`<rect x="${M}" y="${panelY}" width="344" height="${panelH}" rx="14" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
  s.push(cf36Txt(M + 172, 76, 11.5, C.teal, 'road 1 - the division ladder', 'bold'))
  rows.forEach((rw, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="36" y="${by}" width="250" height="${rowH}" rx="7" fill="${C.paper}" stroke="${C.faint}" stroke-width="1.5"/>`)
    s.push(cf36Txt(161, cy + 4, 11.5, C.ink, `${rw.n} ÷ 2 = ${rw.q}`))
    s.push(`<circle cx="316" cy="${cy}" r="12" fill="${rw.r === 0 ? C.white : C.panelA}" stroke="${rw.r === 0 ? C.teal : C.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(316, cy + 4, 11, C.ink, String(rw.r), 'bold'))
  })
  const lFirst = topY + rowH / 2
  const lLast = topY + span - rowH / 2
  s.push(`<line x1="344" y1="${lLast}" x2="344" y2="${lFirst - 8}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="344,${lFirst - 15} 340,${lFirst - 6} 348,${lFirst - 6}" fill="${C.conn}"/>`)
  s.push(cf36Txt(M + 172, topY + span + 26, 10, C.tealInk, 'remainders read bottom-up:  1 1 0 0 1 0 0'))
  // RIGHT PANEL — the powers table
  s.push(`<rect x="396" y="${panelY}" width="344" height="${panelH}" rx="14" fill="${C.white}" stroke="${C.teal}" stroke-width="2"/>`)
  s.push(cf36Txt(568, 76, 11.5, C.teal, 'road 2 - the powers table', 'bold'))
  places.forEach((pl, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    const on = pl.m === '1'
    s.push(`<rect x="410" y="${by}" width="64" height="${rowH}" rx="7" fill="${on ? C.panelA : C.white}" stroke="${on ? C.accent : C.teal}" stroke-width="1.8"/>`)
    s.push(cf36Txt(442, cy + 4, 12, C.ink, pl.p, 'bold'))
    s.push(cf36Txt(572, cy + 4, 11, on ? C.ink : C.tealInk, pl.t, 'normal', 'middle'))
    s.push(`<rect x="668" y="${by}" width="44" height="${rowH}" rx="7" fill="${on ? C.panelA : C.white}" stroke="${on ? C.accent : C.teal}" stroke-width="1.8"/>`)
    s.push(cf36Txt(690, cy + 4.5, 13, on ? C.accent : C.tealInk, pl.m, 'bold'))
  })
  s.push(cf36Txt(568, topY + span + 26, 10, C.tealInk, 'marks read left to right:  1 1 0 0 1 0 0'))
  // the meeting arrows + box
  const meetTop = meetY
  s.push(`<line x1="192" y1="${panelY + panelH + 2}" x2="290" y2="${meetTop - 6}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="296,${meetTop - 2} 284,${meetTop - 4} 288,${meetTop - 12}" fill="${C.conn}"/>`)
  s.push(`<line x1="568" y1="${panelY + panelH + 2}" x2="470" y2="${meetTop - 6}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="464,${meetTop - 2} 476,${meetTop - 4} 472,${meetTop - 12}" fill="${C.conn}"/>`)
  s.push(`<rect x="230" y="${meetY}" width="300" height="${meetH}" rx="12" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(380, meetY + 31, 13, C.ink, 'both roads meet: 100 = 1100100', 'bold'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the odometer roll-over: 11111111 + 1               */
/* ------------------------------------------------------------------ */

function cf36OdometerSvg(): string {
  const W = 760
  const M = 20
  const ww = 40
  const wh = 56
  const wgap = 10
  const row1Y = 82
  const row2Y = 176
  const x1 = 60
  const n1 = 8
  const w1 = n1 * ww + (n1 - 1) * wgap
  const x2 = 40
  const n2 = 9
  const w2 = n2 * ww + (n2 - 1) * wgap
  const stripY = 262
  const stripH = 66
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The odometer roll-over. A row of eight wheels all showing 1 represents 11111111, the largest 8-bit value, 255. A dashed arrow above the wheels shows the carry rippling right to left when 1 is added. The result row shows nine wheels: a leading 1 and eight 0s, reading 100000000, which is 256 - the first value too big for eight bits. A note strip states the largest 8-bit value is 255 and 256 needs nine bits, just as 999 plus 1 rolls a three-digit odometer to 1000.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf36Txt(W / 2, 32, 13, C.teal, 'the roll-over: 11111111 + 1 = 100000000', 'bold'))
  s.push(cf36Txt(W / 2, 52, 10.5, C.tealInk, 'eight wheels all at 1 hold 255 - one more click spills into a ninth wheel'))
  // the carry ripple, dashed, right to left, above the wheels
  s.push(cf36Txt(W / 2, 66, 9.5, C.tealInk, 'the carry ripples right to left, turning every 1 into a 0'))
  s.push(`<line x1="${x1 + w1}" y1="74" x2="${x1 + 14}" y2="74" stroke="${C.conn}" stroke-width="2" stroke-dasharray="7 5"/>`)
  s.push(`<polygon points="${x1 + 4},74 ${x1 + 16},69 ${x1 + 16},79" fill="${C.conn}"/>`)
  // row 1: eight wheels of 1
  for (let k = 0; k < n1; k++) {
    const wx = x1 + k * (ww + wgap)
    s.push(`<rect x="${wx}" y="${row1Y}" width="${ww}" height="${wh}" rx="8" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(wx + ww / 2, row1Y + wh / 2 + 6, 18, C.ink, '1', 'bold'))
  }
  // the +1 badge
  s.push(`<circle cx="${x1 + w1 + 36}" cy="${row1Y + wh / 2}" r="20" fill="${C.white}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(cf36Txt(x1 + w1 + 36, row1Y + wh / 2 + 5, 13, C.ink, '+1', 'bold'))
  s.push(cf36Txt(x1 + w1 + 36, row1Y - 8, 9.5, C.tealInk, 'add one'))
  // the equals sign
  s.push(cf36Txt(380, 160, 22, C.ink, '=', 'bold'))
  // row 2: nine wheels, leading 1 then zeros
  for (let k = 0; k < n2; k++) {
    const wx = x2 + k * (ww + wgap)
    const lead = k === 0
    s.push(`<rect x="${wx}" y="${row2Y}" width="${ww}" height="${wh}" rx="8" fill="${lead ? C.panelB : C.white}" stroke="${lead ? C.mid : C.teal}" stroke-width="2"/>`)
    s.push(cf36Txt(wx + ww / 2, row2Y + wh / 2 + 6, 18, C.ink, lead ? '1' : '0', lead ? 'bold' : 'normal'))
  }
  s.push(cf36Txt(x2 + w2 + 30, row2Y + 24, 10.5, C.tealInk, 'the ninth wheel lights up:', 'bold', 'start'))
  s.push(cf36Txt(x2 + w2 + 30, row2Y + 42, 10.5, C.tealInk, '256 - the first 9-bit value,', 'normal', 'start'))
  s.push(cf36Txt(x2 + w2 + 30, row2Y + 60, 10.5, C.tealInk, 'too big for eight wheels', 'normal', 'start'))
  // the summary strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.paper}" stroke="${C.faint}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 27, 12, C.ink, 'largest 8-bit value: 2^8 - 1 = 255 = 11111111'))
  s.push(cf36Txt(W / 2, stripY + 50, 10, C.tealInk, 'and 256 = 2^8 needs NINE bits - the odometer rolls over exactly as 999 + 1 rolls a three-digit odometer to 1000'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F5 — the same machine in bases 8 and 16: 2026           */
/* ------------------------------------------------------------------ */

function cf36BasePair2026Svg(): string {
  const W = 760
  const M = 20
  const panelY = 54
  const panelH = 262
  const rowH = 40
  const gap = 10
  const topY = 92
  const rows8 = [
    { n: 2026, q: 253, r: 2 }, { n: 253, q: 31, r: 5 }, { n: 31, q: 3, r: 7 }, { n: 3, q: 0, r: 3 },
  ]
  const rows16 = [
    { n: 2026, q: 126, r: 10 }, { n: 126, q: 7, r: 14 }, { n: 7, q: 0, r: 7 },
  ]
  const stripY = panelY + panelH + 16
  const stripH = 58
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The same division-ladder machine run in bases 8 and 16 on the number 2026. Left panel, divide by 8: 2026 divided by 8 equals 253 remainder 2; 253 divided by 8 equals 31 remainder 5; 31 divided by 8 equals 3 remainder 7; 3 divided by 8 equals 0 remainder 3 - remainders read bottom-up give 3752 in base 8. Right panel, divide by 16: 2026 divided by 16 equals 126 remainder 10, written A; 126 divided by 16 equals 7 remainder 14, written E; 7 divided by 16 equals 0 remainder 7 - remainders read bottom-up give 7EA in base 16. A check strip verifies 7 times 256 plus 14 times 16 plus 10 equals 2026, and 3 times 512 plus 7 times 64 plus 5 times 8 plus 2 equals 2026.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf36Txt(W / 2, 32, 13, C.teal, 'the same machine, two other dresses: 2026', 'bold'))
  // LEFT PANEL — divide by 8
  s.push(`<rect x="${M}" y="${panelY}" width="352" height="${panelH}" rx="14" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
  s.push(cf36Txt(M + 176, 76, 11.5, C.teal, 'divide by 8 (base 8)', 'bold'))
  rows8.forEach((rw, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="32" y="${by}" width="250" height="${rowH}" rx="7" fill="${C.paper}" stroke="${C.faint}" stroke-width="1.5"/>`)
    s.push(cf36Txt(157, cy + 4.5, 12, C.ink, `${rw.n} ÷ 8 = ${rw.q}`))
    s.push(`<circle cx="312" cy="${cy}" r="14" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(312, cy + 4.5, 12, C.ink, String(rw.r), 'bold'))
  })
  const a8First = topY + rowH / 2
  const a8Last = topY + 4 * rowH + 3 * gap - rowH / 2
  s.push(`<line x1="344" y1="${a8Last}" x2="344" y2="${a8First - 8}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="344,${a8First - 15} 340,${a8First - 6} 348,${a8First - 6}" fill="${C.conn}"/>`)
  s.push(cf36Txt(M + 176, panelY + panelH - 14, 11.5, C.ink, 'read up:  3 7 5 2  →  2026 = 3752 in base 8', 'bold'))
  // RIGHT PANEL — divide by 16
  s.push(`<rect x="388" y="${panelY}" width="352" height="${panelH}" rx="14" fill="${C.white}" stroke="${C.teal}" stroke-width="2"/>`)
  s.push(cf36Txt(564, 76, 11.5, C.teal, 'divide by 16 (base 16)', 'bold'))
  rows16.forEach((rw, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="400" y="${by}" width="250" height="${rowH}" rx="7" fill="${C.paper}" stroke="${C.faint}" stroke-width="1.5"/>`)
    s.push(cf36Txt(525, cy + 4.5, 12, C.ink, `${rw.n} ÷ 16 = ${rw.q}`))
    s.push(`<circle cx="680" cy="${cy}" r="14" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(680, cy + 4.5, 12, C.ink, cf36Digit(rw.r), 'bold'))
  })
  const a16First = topY + rowH / 2
  const a16Last = topY + 3 * rowH + 2 * gap - rowH / 2
  s.push(`<line x1="712" y1="${a16Last}" x2="712" y2="${a16First - 8}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="712,${a16First - 15} 708,${a16First - 6} 716,${a16First - 6}" fill="${C.conn}"/>`)
  s.push(cf36Txt(564, panelY + panelH - 14, 11.5, C.ink, 'read up:  7 E A  →  2026 = 7EA in base 16', 'bold'))
  // the check strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.paper}" stroke="${C.faint}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 24, 11.5, C.ink, 'check 7EA:  7x256 + 14x16 + 10 = 1792 + 224 + 10 = 2026'))
  s.push(cf36Txt(W / 2, stripY + 44, 10.5, C.tealInk, 'check 3752:  3x512 + 7x64 + 5x8 + 2 = 1536 + 448 + 40 + 2 = 2026'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the 0.1 repetition block diagram                  */
/* ------------------------------------------------------------------ */

function cf36Rep01Svg(): string {
  const W = 760
  const M = 20
  const bw = 36
  const bh = 44
  const bgap = 8
  const bits = ['0', '0', '0', '1', '1', '0', '0', '1', '1', '0', '0', '1', '1']
  const n = bits.length
  const bitsW = n * bw + (n - 1) * bgap
  const px = 64
  const bitsY = 66
  const brackY = bitsY + bh + 14
  const loopY = 176
  const boxW = 72
  const boxH = 36
  const boxGap = 36
  const states = ['0.1', '0.2', '0.4', '0.8', '0.6']
  const ns = states.length
  const loopW = ns * boxW + (ns - 1) * boxGap
  const lx0 = M + 24
  const stripY = 262
  const stripH = 58
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The ladder that never ends: 0.1 in base 2. A row of bit boxes after the point reads 0 0 0 1 1 0 0 1 1 0 0 1 1 and then an ellipsis; the first bit 0 stands alone and the block 0011 repeats forever, shown by a bracket over the repeating boxes. Below, the fraction-part trail runs 0.1 to 0.2 to 0.4 to 0.8 to 0.6, each step doubling, and a dashed red arrow returns from 0.6 to 0.2 - the loop closes and the ladder runs forever. A note strip reads: 0.1 equals 0.0001100110011 and so on, the block 0011 repeating; this is why 0.1 plus 0.2 comes out as 0.30000000000000004 in every programming language.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf36Txt(W / 2, 32, 13, C.teal, 'the ladder that never ends: 0.1 in base 2', 'bold'))
  s.push(cf36Txt(34, bitsY + bh / 2 + 6, 16, C.ink, '0.', 'bold'))
  bits.forEach((b, k) => {
    const bx = px + k * (bw + bgap)
    const inBlock = k >= 1
    s.push(`<rect x="${bx}" y="${bitsY}" width="${bw}" height="${bh}" rx="6" fill="${inBlock ? C.panelA : C.white}" stroke="${inBlock ? C.accent : C.teal}" stroke-width="2"/>`)
    s.push(cf36Txt(bx + bw / 2, bitsY + bh / 2 + 6.5, 16, C.ink, b, 'bold'))
  })
  // the ellipsis after the boxes
  const ellX = px + bitsW + 10
  s.push(cf36Txt(ellX + 20, bitsY + bh / 2 + 7, 18, C.tealInk, '. . .', 'bold'))
  // the bracket over the repeating blocks (bits 1..12)
  const bStart = px + bw
  const bEnd = px + bitsW
  s.push(`<line x1="${bStart}" y1="${brackY - 6}" x2="${bEnd}" y2="${brackY - 6}" stroke="${C.accent}" stroke-width="2"/>`)
  s.push(`<line x1="${bStart}" y1="${brackY - 12}" x2="${bStart}" y2="${brackY - 2}" stroke="${C.accent}" stroke-width="2"/>`)
  s.push(`<line x1="${bEnd}" y1="${brackY - 12}" x2="${bEnd}" y2="${brackY - 2}" stroke="${C.accent}" stroke-width="2"/>`)
  s.push(cf36Txt((bStart + bEnd) / 2, brackY + 10, 10.5, C.tealInk, 'the block 0011 repeats forever'))
  s.push(cf36Txt(px + bw / 2, brackY + 10, 9.5, C.tealInk, 'one bit', 'normal'))
  // the state loop: 0.1 -> 0.2 -> 0.4 -> 0.8 -> 0.6 -> back to 0.2
  states.forEach((st, k) => {
    const bx = lx0 + k * (boxW + boxGap)
    const cx = bx + boxW / 2
    s.push(`<rect x="${bx}" y="${loopY}" width="${boxW}" height="${boxH}" rx="9" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
    s.push(cf36Txt(cx, loopY + boxH / 2 + 4.5, 12.5, C.ink, st, 'bold'))
    if (k < ns - 1) {
      const ax1 = bx + boxW + 3
      const ax2 = bx + boxW + boxGap - 3
      const cy = loopY + boxH / 2
      s.push(`<line x1="${ax1}" y1="${cy}" x2="${ax2 - 5}" y2="${cy}" stroke="${C.conn}" stroke-width="2"/>`)
      s.push(`<polygon points="${ax2},${cy} ${ax2 - 6},${cy - 4.5} ${ax2 - 6},${cy + 4.5}" fill="${C.conn}"/>`)
      s.push(cf36Txt((ax1 + ax2) / 2, cy - 8, 9.5, C.tealInk, 'x 2'))
    }
  })
  // the dashed return path from 0.6 back to 0.2
  const fromCx = lx0 + 4 * (boxW + boxGap) + boxW / 2
  const toCx = lx0 + 1 * (boxW + boxGap) + boxW / 2
  const retY = loopY + boxH + 26
  s.push(`<polyline points="${fromCx},${loopY + boxH + 2} ${fromCx},${retY} ${toCx},${retY} ${toCx},${loopY + boxH + 8}" fill="none" stroke="${C.warn}" stroke-width="2" stroke-dasharray="7 5"/>`)
  s.push(`<polygon points="${toCx},${loopY + boxH + 2} ${toCx - 5},${loopY + boxH + 12} ${toCx + 5},${loopY + boxH + 12}" fill="${C.warn}"/>`)
  s.push(cf36Txt((fromCx + toCx) / 2, retY - 8, 10, C.warn, 'the fraction part returns to 0.2 - the loop closes, the ladder runs forever'))
  // the summary strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 24, 11.5, C.ink, '0.1 = 0.0001100110011... - the block 0011 repeats forever; it never terminates'))
  s.push(cf36Txt(W / 2, stripY + 44, 10, C.tealInk, 'this is why 0.1 + 0.2 comes out as 0.30000000000000004 in every programming language'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — 77 and 156 into bases 8 and 16 (four mini runs)   */
/* ------------------------------------------------------------------ */

function cf36Pair77156Svg(): string {
  const W = 760
  const M = 20
  const panelW = 356
  const panelH = 168
  const rowH = 30
  const gap = 6
  const topY = 80
  const panels = [
    { x: M, y: 48, title: '77 into base 8', rows: [{ n: 77, q: 9, r: 5 }, { n: 9, q: 1, r: 1 }, { n: 1, q: 0, r: 1 }], ans: '77 = 115 in base 8' },
    { x: M + panelW + 8, y: 48, title: '156 into base 8', rows: [{ n: 156, q: 19, r: 4 }, { n: 19, q: 2, r: 3 }, { n: 2, q: 0, r: 2 }], ans: '156 = 234 in base 8' },
    { x: M, y: 48 + panelH + 10, title: '77 into base 16', rows: [{ n: 77, q: 4, r: 13 }, { n: 4, q: 0, r: 4 }], ans: '77 = 4D in base 16' },
    { x: M + panelW + 8, y: 48 + panelH + 10, title: '156 into base 16', rows: [{ n: 156, q: 9, r: 12 }, { n: 9, q: 0, r: 9 }], ans: '156 = 9C in base 16' },
  ]
  const baseOf = (t: string) => (t.includes('16') ? 16 : 8)
  const H = 48 + 2 * panelH + 10 + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four mini division ladders converting 77 and 156 into bases 8 and 16. Top left, 77 into base 8: 77 divided by 8 equals 9 remainder 5; 9 divided by 8 equals 1 remainder 1; 1 divided by 8 equals 0 remainder 1; read up gives 115. Top right, 156 into base 8: 156 divided by 8 equals 19 remainder 4; 19 divided by 8 equals 2 remainder 3; 2 divided by 8 equals 0 remainder 2; read up gives 234. Bottom left, 77 into base 16: 77 divided by 16 equals 4 remainder 13, written D; 4 divided by 16 equals 0 remainder 4; read up gives 4D. Bottom right, 156 into base 16: 156 divided by 16 equals 9 remainder 12, written C; 9 divided by 16 equals 0 remainder 9; read up gives 9C.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf36Txt(W / 2, 30, 12.5, C.teal, 'the same machine for bases 8 and 16: 77 and 156', 'bold'))
  panels.forEach((p) => {
    const b = baseOf(p.title)
    s.push(`<rect x="${p.x}" y="${p.y}" width="${panelW}" height="${panelH}" rx="12" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
    s.push(cf36Txt(p.x + panelW / 2, p.y + 20, 11, C.teal, p.title, 'bold'))
    p.rows.forEach((rw, k) => {
      const by = topY + k * (rowH + gap)
      const cy = by + rowH / 2
      s.push(`<rect x="${p.x + 12}" y="${by}" width="240" height="${rowH}" rx="6" fill="${C.paper}" stroke="${C.faint}" stroke-width="1.5"/>`)
      s.push(cf36Txt(p.x + 132, cy + 4, 11, C.ink, `${rw.n} ÷ ${b} = ${rw.q}`))
      s.push(`<circle cx="${p.x + 288}" cy="${cy}" r="11" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2"/>`)
      s.push(cf36Txt(p.x + 288, cy + 4, 11, C.ink, cf36Digit(rw.r), 'bold'))
    })
    const first = topY + rowH / 2
    const last = topY + p.rows.length * rowH + (p.rows.length - 1) * gap - rowH / 2
    const ax = p.x + 322
    s.push(`<line x1="${ax}" y1="${last}" x2="${ax}" y2="${first - 7}" stroke="${C.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="${ax},${first - 13} ${ax - 4},${first - 5} ${ax + 4},${first - 5}" fill="${C.conn}"/>`)
    s.push(cf36Txt(p.x + panelW / 2, p.y + panelH - 12, 11.5, C.ink, p.ans, 'bold'))
  })
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the mixed number 3.625 (whole ladder + fraction)  */
/* ------------------------------------------------------------------ */

function cf36Mixed3625Svg(): string {
  const W = 760
  const M = 20
  const panelY = 56
  const panelH = 182
  const rowH = 34
  const gap = 8
  const stripY = panelY + panelH + 18
  const stripH = 58
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The mixed number 3.625 split into its whole part and its fraction part. Left panel, the whole part 3: 3 divided by 2 equals 1 remainder 1; 1 divided by 2 equals 0 remainder 1; read up gives 11. Right panel, the fraction part 0.625: 0.625 times 2 equals 1.25, integer part 1, keep 0.25; 0.25 times 2 equals 0.5, integer part 0, keep 0.5; 0.5 times 2 equals 1.0, integer part 1, keep 0 - the bits read down as 101. A joining strip reads: join with a point, 3.625 equals 11.101 in base 2; check, 2 plus 1 plus 0.5 plus 0.125 equals 3.625.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf36Txt(W / 2, 32, 13, C.teal, 'a mixed number: split it first - 3.625 = 3 + 0.625', 'bold'))
  // LEFT — whole part ladder for 3
  s.push(`<rect x="${M}" y="${panelY}" width="352" height="${panelH}" rx="14" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
  s.push(cf36Txt(M + 176, 76, 11.5, C.teal, 'the whole part: 3 (divide by 2, read up)', 'bold'))
  const wholeRows = [{ n: 3, q: 1, r: 1 }, { n: 1, q: 0, r: 1 }]
  wholeRows.forEach((rw, k) => {
    const by = 88 + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="34" y="${by}" width="230" height="${rowH}" rx="7" fill="${C.paper}" stroke="${C.faint}" stroke-width="1.5"/>`)
    s.push(cf36Txt(149, cy + 4.5, 12, C.ink, `${rw.n} ÷ 2 = ${rw.q}`))
    s.push(`<circle cx="296" cy="${cy}" r="13" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(296, cy + 4.5, 12, C.ink, String(rw.r), 'bold'))
  })
  s.push(`<line x1="330" y1="152" x2="330" y2="112" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="330,104 326,114 334,114" fill="${C.conn}"/>`)
  s.push(cf36Txt(M + 176, panelY + panelH - 14, 11.5, C.ink, 'read up:  3 = 11 in base 2', 'bold'))
  // RIGHT — fraction ladder for 0.625
  s.push(`<rect x="388" y="${panelY}" width="352" height="${panelH}" rx="14" fill="${C.white}" stroke="${C.teal}" stroke-width="2"/>`)
  s.push(cf36Txt(564, 76, 11.5, C.teal, 'the fraction part: 0.625 (x 2, read down)', 'bold'))
  const fracRows = [
    { t: '0.625 x 2 = 1.25', bit: 1 }, { t: '0.25 x 2 = 0.5', bit: 0 }, { t: '0.5 x 2 = 1.0', bit: 1 },
  ]
  fracRows.forEach((rw, k) => {
    const by = 88 + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="402" y="${by}" width="230" height="${rowH}" rx="7" fill="${C.paper}" stroke="${C.faint}" stroke-width="1.5"/>`)
    s.push(cf36Txt(517, cy + 4.5, 12, C.ink, rw.t))
    s.push(`<rect x="664" y="${by}" width="44" height="${rowH}" rx="7" fill="${rw.bit === 1 ? C.panelA : C.white}" stroke="${rw.bit === 1 ? C.accent : C.teal}" stroke-width="2"/>`)
    s.push(cf36Txt(686, cy + 4.5, 13, C.ink, String(rw.bit), 'bold'))
  })
  s.push(`<line x1="648" y1="98" x2="648" y2="180" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="648,190 642,178 654,178" fill="${C.conn}"/>`)
  s.push(cf36Txt(564, panelY + panelH - 14, 11.5, C.ink, 'read down:  0.625 = 0.101 in base 2', 'bold'))
  // the joining strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 24, 12.5, C.ink, 'join with a point:  3.625 = 11.101 in base 2', 'bold'))
  s.push(cf36Txt(W / 2, stripY + 44, 10, C.tealInk, 'check:  2 + 1 + 0.5 + 0.125 = 3.625'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

export const lesson36: Lesson = {
  id: 'cf-decimal-to-binary-conversion',
  number: '3.6',
  title: 'Decimal to Binary Conversion',
  concepts: [
    'the division ladder (repeated division by 2)',
    'reading the remainders bottom-up',
    'the positional (powers) method',
    'decimal to octal and hexadecimal',
    'bit length and the largest n-bit value',
    'the 255/256 roll-over',
    'the fraction ladder (multiply by 2)',
    'terminating and repeating binary fractions',
  ],
  objectives: [
    'By the end of this lesson you can convert any decimal whole number to binary by the division ladder, showing every rung and reading the remainders bottom-up.',
    'By the end of this lesson you can run the same ladder machine in bases 8 and 16, converting decimal numbers to octal and hexadecimal and checking the answer by place values.',
    'By the end of this lesson you can convert a decimal number by the positional (powers) method, and say which method wins for which size of number.',
    'By the end of this lesson you can state the largest value that fits in $n$ bits for any $n$, explain the 255/256 roll-over, and say how many bits a given number needs.',
    'By the end of this lesson you can convert decimal fractions to binary by the fraction ladder, reading the bits down, and split a mixed number into its whole and fraction parts.',
    'By the end of this lesson you can explain why 0.1 never terminates in binary, and why that makes $0.1 + 0.2 \\neq 0.3$ in every programming language.',
  ],
  prerequisites: ['cf-the-numbering-systems-binary-octal-hexadecimal'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ================================================================
    // 1. THE PROBLEM: TEN FINGERS, TWO SYMBOLS
    // ================================================================
    { kind: 'para', text: 'You write $45$ with two strokes of a pen. A machine must hold that same quantity as a pattern of switch positions — six of them, $101101$, each on or off. Between those two facts stands the whole craft of this lesson. Lesson 3.1 argued that two symbols are enough to carry any number at all; lesson 3.2 took the census of the four dresses a number wears — binary, octal, decimal, hexadecimal — and stated the positional law: each place is worth the base times the place to its right. What remains is the craft itself: the procedures that carry a decimal number into binary, octal or hexadecimal. Not guesswork, not a lookup table memorised by force, but machines — small, repeatable procedures you can run with a pencil, check by arithmetic, and trust.' },
    { kind: 'para', text: 'The direction of travel matters, and we fix it before anything else. This lesson walks ONE way: a decimal number goes in, a binary (or octal, or hexadecimal) pattern comes out. That is the direction a programmer faces when writing a value into a machine, and the direction an examiner loves to drill. The reverse walk — reading a binary pattern back into decimal — belongs to lesson 3.7, and the two systems standing side by side belong to lesson 3.8. Keep the three doors separate in your mind and the chapter will feel like one corridor, not a maze.' },
    { kind: 'callout', tone: 'insight', title: 'One direction at a time', text: 'Conversion is a two-way road, and beginners drown by trying to swim both ways at once. This lesson (3.6) owns the road **decimal in, pattern out**. Lesson 3.7 owns the opposite road, pattern in, decimal out. Lesson 3.8 sets the two systems side by side and does arithmetic in both. If you ever feel confused mid-conversion, first ask: which direction am I walking?' },
    { kind: 'heading', text: 'The Problem: Ten Fingers, Two Symbols' },
    { kind: 'para', text: 'Humans count in tens because hands come in fives, and two hands gave our ancestors a ready-made abacus. So our place values multiply by ten: units, tens, hundreds, thousands. A machine has no hands; it has switches — transistors, memory cells, magnetic dots — and a switch is a stubbornly two-state thing: current or no current, magnetised or not, charged or discharged. Lesson 3.1 drew the conclusion: with two states per place, the natural base is two, and the place values multiply by two instead of ten: units, twos, fours, eights, and so on up the powers of two.' },
    { kind: 'para', text: 'Now the practical gap. You think, type and read in decimal; the machine stores, moves and computes in binary. Whenever a value crosses from your side of the boundary to the machine’s side, somebody — a compiler, a spreadsheet, an electronics engineer, you in an examination hall — must perform the conversion. And the conversion must be exact, because a machine cannot *nearly* hold a number: flip one bit of $101101$ and you no longer have $45$; you have $44$, or $47$, or $13$. A guessed bit string is not a rough answer, it is a wrong number wearing a confident face.' },
    { kind: 'para', text: 'So we demand a procedure with three properties: it works for every whole number without exception; it leaves a written trail that can be checked line by line; and it is mechanical enough that a machine could run it — which is fitting, since the conversion exists for the machine’s sake. Honesty requires one more sentence: this conversion is the examination bench’s favourite drill. Banking and SSC computer-awareness papers, school-board computer science, and Cambridge 9618-style papers all ask, in one dress or another, *convert this decimal number to binary*. The drill is worth learning not because examinations say so, but because the procedure IS the positional system understood from the inside; the examination marks are a bonus.' },
    { kind: 'callout', tone: 'historical', title: 'Leibniz and the two symbols (1703)', text: 'Gottfried Wilhelm Leibniz published his *Explication de l’Arithmétique Binaire* in 1703, presenting the arithmetic of zeros and ones — creation, he wrote, from nothing, with the binary digits standing for that pair. He was delighted when the Jesuit missionary Joachim Bouvet pointed him to the hexagrams of the ancient Yijing, whose broken and solid lines compose the same two-symbol counting; Leibniz saw the echo as a grand confirmation, though the Chinese diagrams were never used as place-value arithmetic. Our own retelling stays honest on one point: Leibniz’s binary was a philosopher’s arithmetic for two and a half centuries before anyone built a machine cheap enough to live inside it. The switches arrived; the arithmetic was already waiting.' },
    { kind: 'para', text: 'One more preparation, and it is the friendliest idea in the lesson: you have already run a conversion ladder without knowing its name. Convert $135$ minutes into hours and minutes. You divide by $60$: $135 \\div 60 = 2$ remainder $15$, and you read the answer as $2$ hours $15$ minutes. Divide again by $60$ and the quotient is $0$, so the ladder stops. That is repeated division by a base — base $60$ — with the remainders read bottom-up. The division ladder for binary is the identical machine with a smaller base. Nothing in this lesson is new machinery; only the base has changed.' },

    // ================================================================
    // 2. METHOD 1 - THE DIVISION LADDER
    // ================================================================
    { kind: 'heading', text: 'Method 1: The Division Ladder' },
    { kind: 'para', text: 'Here is the machine in words. Take the decimal number. Divide it by $2$. Write down the quotient and keep the remainder — the remainder is either $0$ or $1$, and it is a **digit of the answer**. Now divide the quotient by $2$ again, and again keep the remainder. Repeat until the quotient comes out $0$. You are left with a column of remainders; the answer is that column read from the bottom up. That is all. The procedure is six lines long, it never fails, and every rung of it can be checked.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the division ladder', text: 'A decimal whole number $n$ is said to be **converted to base $b$ by the division ladder** if $n$ is divided by $b$ repeatedly — each time recording the remainder and continuing with the quotient — until the quotient reaches $0$, and the base-$b$ form of $n$ is then read as the remainders in reverse order of their production. Symbolically: if $n = 2q_1 + r_1$, then $q_1 = 2q_2 + r_2$, and so on until $q_{k-1} = r_k$ with quotient $0$, the binary form of $n$ is $r_k r_{k-1} \\ldots r_2 r_1$ — the last remainder is the leading digit, the first remainder is the units digit.' },
    { kind: 'para', text: 'For example, take the smallest interesting case, the number $5$:' },
    { kind: 'list', marker: 'roman', items: [
      '$5 \\div 2 = 2$ remainder $1$ — the units bit is $1$;',
      '$2 \\div 2 = 1$ remainder $0$ — the twos bit is $0$;',
      '$1 \\div 2 = 0$ remainder $1$ — the quotient has hit $0$, so the ladder stops here.',
    ] },
    { kind: 'para', text: 'Reading the remainders bottom-up gives $101$, and indeed $101_2 = 4 + 1 = 5$. The whole machine is already on the table; every ladder in this lesson is only this, repeated. The algorithm block states it once formally, and the first figure draws it as the machine it is.' },
    { kind: 'algorithm', title: 'The division ladder (decimal whole number to any base)', lines: [
      { code: 'read in the decimal whole number n and the base b (2, 8 or 16)', note: 'the base is the only thing that changes between binary, octal and hexadecimal runs.' },
      { code: 'if n = 0, the answer is the single digit 0 - stop', note: 'zero converts to zero in every base; the loop below would otherwise never start.' },
      { code: 'while n > 0:', note: 'the ladder climbs as long as any value remains.' },
      { code: '    r  =  n mod b          KEEP THIS REMAINDER', note: 'the remainder is the next digit of the answer, produced least significant first.' },
      { code: '    n  =  n div b          the quotient is the next dividend', note: 'dividing by the base chops one digit off the right, exactly as dividing by 10 chops a decimal digit.' },
      { code: 'write the remainders in REVERSE order (bottom-up)', note: 'the first remainder is the units digit; the last remainder is the leading digit.' },
    ], note: 'Termination: for any base b of at least 2, the quotient strictly shrinks on every rung, so the ladder must reach 0; for base 2 it takes exactly the bit length of n rungs.' },
    { kind: 'figure', caption: 'The division ladder machine, drawn for 45: six rungs of divide-by-2, the quotient of each rung falling to become the next dividend, the remainders collecting in their own column — 1, 0, 1, 1, 0, 1 top to bottom — and the read arrow travelling bottom-up to the answer 101101 in base 2, checked by weights as 32 + 8 + 4 + 1 = 45.', svg: cf36LadderSvg({
      title: 'the division ladder machine: 45 into base 2',
      subtitle: 'divide by 2, keep the remainder, repeat on the quotient until it reaches 0',
      rows: [
        { n: 45, q: 22, r: 1 }, { n: 22, q: 11, r: 0 }, { n: 11, q: 5, r: 1 },
        { n: 5, q: 2, r: 1 }, { n: 2, q: 1, r: 0 }, { n: 1, q: 0, r: 1 },
      ],
      base: 2,
      answer: '101101',
      answerLabel: '45 in base 2',
      check: 'check by weights: 101101 = 32 + 8 + 4 + 1 = 45',
      note: 'a fluke worth noticing: 45 is a binary palindrome - its remainders read the same either way. The 100 ladder below is the honest direction test.',
      aria: 'The division ladder machine converting 45 to binary. Six rungs: 45 divided by 2 equals 22 remainder 1; 22 divided by 2 equals 11 remainder 0; 11 divided by 2 equals 5 remainder 1; 5 divided by 2 equals 2 remainder 1; 2 divided by 2 equals 1 remainder 0; 1 divided by 2 equals 0 remainder 1. The remainders column reads 1, 0, 1, 1, 0, 1 top to bottom; a bottom-up read arrow collects them into the answer 101101 in base 2. A check strip confirms 32 plus 8 plus 4 plus 1 equals 45, and notes that 45 is a binary palindrome.',
    }) },
    { kind: 'example', title: 'Convert 45 to binary by the division ladder, showing every rung.', steps: [
      'Take the dividend $45$ and divide by $2$: $45 \\div 2 = 22$ remainder $1$. Keep the remainder; the quotient $22$ becomes the next dividend.',
      'Now, $22 \\div 2 = 11$ remainder $0$.',
      'So, $11 \\div 2 = 5$ remainder $1$.',
      'Now, $5 \\div 2 = 2$ remainder $1$.',
      'So, $2 \\div 2 = 1$ remainder $0$.',
      'Now, $1 \\div 2 = 0$ remainder $1$ — the quotient has hit $0$, so the ladder stops after six rungs.',
      'Read the remainders bottom-up: $1, 0, 1, 1, 0, 1$.',
      'Hence $45 = 101101_2$.',
      'Check by weights: $32 + 8 + 4 + 1 = 45$ — the ladder closes.',
    ] },
    { kind: 'para', text: 'Pause on one fluke before it misleads you. The remainders of the $45$ ladder came out $1, 0, 1, 1, 0, 1$, which happens to read the same in either direction — $45$ is a **binary palindrome**, one of a sparse family of numbers whose binary form mirrors itself. This is charming and dangerous: a reader who misremembers the reading direction still gets $45$ right, and so the error hides. The discipline of direction must be fixed on a ladder that can testify against you, and the next two Illustrations supply exactly that.' },
    { kind: 'example', title: 'Convert 77 to binary by the division ladder.', steps: [
      'Take $77$: $77 \\div 2 = 38$ remainder $1$.',
      'Now, $38 \\div 2 = 19$ remainder $0$.',
      'So, $19 \\div 2 = 9$ remainder $1$.',
      'Now, $9 \\div 2 = 4$ remainder $1$.',
      'So, $4 \\div 2 = 2$ remainder $0$.',
      'Now, $2 \\div 2 = 1$ remainder $0$.',
      'So, $1 \\div 2 = 0$ remainder $1$ — seven rungs, and the ladder stops.',
      'Read the remainders bottom-up: $1, 0, 0, 1, 1, 0, 1$.',
      'Hence $77 = 1001101_2$.',
      'Check by weights: $64 + 8 + 4 + 1 = 77$ — correct.',
    ] },
    { kind: 'example', title: 'Convert 100 to binary, and prove the reading direction matters.', steps: [
      'Take $100$: $100 \\div 2 = 50$ remainder $0$.',
      'Now, $50 \\div 2 = 25$ remainder $0$.',
      'So, $25 \\div 2 = 12$ remainder $1$.',
      'Now, $12 \\div 2 = 6$ remainder $0$.',
      'So, $6 \\div 2 = 3$ remainder $0$.',
      'Now, $3 \\div 2 = 1$ remainder $1$.',
      'So, $1 \\div 2 = 0$ remainder $1$ — the ladder stops after seven rungs.',
      'The remainders in the order produced are $0, 0, 1, 0, 0, 1, 1$ — and this string is NOT the answer.',
      'Read them bottom-up instead: $1, 1, 0, 0, 1, 0, 0$.',
      'Hence $100 = 1100100_2$.',
      'Check by weights: $64 + 32 + 4 = 100$ — correct.',
      'Beware the trap: read top-down, the remainders give $0010011_2 = 19$, a plausible-looking wrong answer that no weight check can rescue.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The bottom-up trap', text: 'The single most common error in this whole topic is reading the remainder column top-down. The first remainder is the **units** bit — the rightmost digit — because it was peeled off the units end of the number. Fix the habit now: after writing the remainders, put your pencil under the LAST one and read upwards, then immediately check the answer by adding the powers of two under the 1-bits. A ten-second check catches every misread.' },
    { kind: 'example', title: 'Convert 156 to binary by the division ladder.', steps: [
      'Take $156$: $156 \\div 2 = 78$ remainder $0$.',
      'Now, $78 \\div 2 = 39$ remainder $0$.',
      'So, $39 \\div 2 = 19$ remainder $1$.',
      'Now, $19 \\div 2 = 9$ remainder $1$.',
      'So, $9 \\div 2 = 4$ remainder $1$.',
      'Now, $4 \\div 2 = 2$ remainder $0$.',
      'So, $2 \\div 2 = 1$ remainder $0$.',
      'Now, $1 \\div 2 = 0$ remainder $1$ — eight rungs, the ladder stops.',
      'Read the remainders bottom-up: $1, 0, 0, 1, 1, 1, 0, 0$.',
      'Hence $156 = 10011100_2$.',
      'Check by weights: $128 + 16 + 8 + 4 = 156$ — correct.',
    ] },
    { kind: 'derivation', title: 'Why the division ladder works', statement: 'Take any whole number $n$ with binary digits $b_k \\ldots b_1 b_0$. Dividing $n$ by $2$ exposes the last digit $b_0$ as the remainder and shifts every other digit down one place; repeating the division peels the digits off one at a time, right to left.', steps: [
      { label: 'Write the number as its digits', formula: 'n = (b_k \\ldots b_1 b_0)_2 = 2 \\times (b_k \\ldots b_1)_2 + b_0', explanation: 'Positional notation says every place to the left of the units is worth an even number of units, so the whole number splits into an even part — the higher digits, doubled — plus the units digit.' },
      { label: 'Match with division by two', formula: 'n = 2q_1 + r_1, \\quad r_1 \\in \\{0, 1\\}', explanation: 'Division by $2$ splits any whole number the same way: a quotient $q_1$ and a remainder $r_1$ that can only be $0$ or $1$, because two divisions-by-two would have fitted into a larger step.' },
      { label: 'The remainder is the units bit', formula: 'r_1 = b_0, \\quad q_1 = (b_k \\ldots b_1)_2', explanation: 'The even part and the leftover are unique, so the two splittings agree: the first remainder IS the units bit, and the quotient is the original number with its last binary digit chopped off.' },
      { label: 'Each further division shifts up', formula: 'q_1 = 2q_2 + r_2 \\;\\Rightarrow\\; r_2 = b_1', explanation: 'Dividing the quotient again exposes the next bit, just as dividing a decimal number by $10$ chops off one decimal digit: the ladder climbs one place per rung.' },
      { label: 'Termination', formula: 'q_k = 0 \\text{ after exactly the bit length of } n \\text{ rungs}', explanation: 'The quotients strictly shrink, so the ladder cannot run forever; when the quotient reaches $0$, every bit has been peeled, and the last remainder produced is the leading bit of the answer.' },
    ], result: 'Thus each division by $2$ peels off the units bit of whatever remains, and the remainders, read bottom-up, are the bits of $n$ from most significant to least: the ladder is positional notation run backwards, which is why it can never fail.' },
    { kind: 'para', text: 'The derivation also explains the shape of the trail you write: the first remainder answers *is the number odd or even?* — the units bit — and every later remainder answers the same question about half the number, then a quarter of it, and so on. Six rungs converted $45$; eight rungs converted $156$; the number of rungs is exactly the number of bits, a count we will make precise in the section on limits.' },

    { kind: 'example', title: 'Convert 2026 to binary by the division ladder (a full eleven-rung climb).', steps: [
      'Take $2026$: $2026 \\div 2 = 1013$ remainder $0$.',
      'Now, $1013 \\div 2 = 506$ remainder $1$.',
      'So, $506 \\div 2 = 253$ remainder $0$.',
      'Now, $253 \\div 2 = 126$ remainder $1$.',
      'So, $126 \\div 2 = 63$ remainder $0$.',
      'Now, $63 \\div 2 = 31$ remainder $1$.',
      'So, $31 \\div 2 = 15$ remainder $1$.',
      'Now, $15 \\div 2 = 7$ remainder $1$.',
      'So, $7 \\div 2 = 3$ remainder $1$.',
      'Now, $3 \\div 2 = 1$ remainder $1$.',
      'So, $1 \\div 2 = 0$ remainder $1$ — eleven rungs, and the ladder stops.',
      'Read the remainders bottom-up: $1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0$.',
      'Hence $2026 = 11111101010_2$.',
      'Check by weights: $1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 = 2026$ — note that eight of the eleven bits are 1s.',
    ] },
    { kind: 'para', text: 'Now lift the machine to the other bases, because nothing in it was special about two. To convert a decimal number to base $b$, divide repeatedly by $b$ and read the remainders bottom-up — that is the whole generalisation. For base $8$ the remainders run from $0$ to $7$, exactly the octal digits of lesson 3.2. For base $16$ the remainders run from $0$ to $15$, and the values $10$ through $15$ write themselves as the letters $A$ through $F$; when you meet a remainder of $14$, the digit you keep is $E$, worth fourteen. The ladder does not care which dress the answer wears.' },
    { kind: 'example', title: 'Run the ladder in base 8: convert 45, 100 and 2026 to octal.', steps: [
      'Take $45$ first: $45 \\div 8 = 5$ remainder $5$, and then $5 \\div 8 = 0$ remainder $5$.',
      'Read the remainders up: $45 = 55_8$.',
      'Now, $100$: $100 \\div 8 = 12$ remainder $4$; $12 \\div 8 = 1$ remainder $4$; $1 \\div 8 = 0$ remainder $1$.',
      'Read up: $100 = 144_8$.',
      'So, $2026$: $2026 \\div 8 = 253$ remainder $2$; $253 \\div 8 = 31$ remainder $5$; $31 \\div 8 = 3$ remainder $7$; $3 \\div 8 = 0$ remainder $3$.',
      'Read up: $2026 = 3752_8$.',
      'Check the last by place values: $3 \\times 512 + 7 \\times 64 + 5 \\times 8 + 2 = 1536 + 448 + 40 + 2 = 2026$ — the ladder closes in the wider dress too.',
    ] },
    { kind: 'example', title: 'Run the ladder in base 16: convert 45, 100 and 2026 to hexadecimal.', steps: [
      'Take $45$: $45 \\div 16 = 2$ remainder $13$, and a remainder of $13$ is the digit $D$; then $2 \\div 16 = 0$ remainder $2$.',
      'Read up: $45 = 2D_{16}$.',
      'Now, $100$: $100 \\div 16 = 6$ remainder $4$; $6 \\div 16 = 0$ remainder $6$.',
      'Read up: $100 = 64_{16}$.',
      'So, $2026$: $2026 \\div 16 = 126$ remainder $10$, written $A$; $126 \\div 16 = 7$ remainder $14$, written $E$; $7 \\div 16 = 0$ remainder $7$.',
      'Read up: $2026 = 7EA_{16}$.',
      'Check by place values: $7 \\times 256 + 14 \\times 16 + 10 = 1792 + 224 + 10 = 2026$ — remembering that $E$ is worth $14$ and $A$ is worth $10$.',
    ] },
    { kind: 'figure', caption: 'The same machine in two other dresses: 2026 divided repeatedly by 8 gives remainders 2, 5, 7, 3 — read up, 3752 in base 8 — and divided repeatedly by 16 gives remainders 10 (A), 14 (E), 7 — read up, 7EA in base 16. Both answers are checked open by place values, and both close at 2026.', svg: cf36BasePair2026Svg() },
    { kind: 'table', caption: 'The lesson’s witness table: the seven pinned numbers converted into all three machine bases — every cell engine-verified before it was printed.', head: ['Decimal', 'Base 2', 'Base 8', 'Base 16'], rows: [
      ['$45$', '$101101$', '$55$', '$2D$'],
      ['$77$', '$1001101$', '$115$', '$4D$'],
      ['$100$', '$1100100$', '$144$', '$64$'],
      ['$156$', '$10011100$', '$234$', '$9C$'],
      ['$255$', '$11111111$', '$377$', '$FF$'],
      ['$256$', '$100000000$', '$400$', '$100$'],
      ['$2026$', '$11111101010$', '$3752$', '$7EA$'],
    ] },
    { kind: 'para', text: 'Read the witness table slowly, because it is the whole lesson in seven rows. Watch $255$: all ones in binary, $FF$ in hexadecimal — the largest byte wearing its two tightest dresses. Watch $256$ roll over in every base at once: a leading $1$ and then nothing but zeros, whether the dress is binary ($100000000$), octal ($400$) or hexadecimal ($100$). Notice the digit counts: binary uses eleven digits for $2026$, octal uses four, hexadecimal uses three — the wider the base, the shorter the string, which is precisely why programmers write hexadecimal when binary gets long. The regrouping shortcuts that jump between these dresses without passing through decimal belong to lesson 3.8; here we only build the ladder that climbs down from decimal.' },
    { kind: 'para', text: 'One doorstep note before the second method. The full theory of number systems — why bases work, what a radix is, how the four dresses relate — is owned by our elder shelf-mate *Arithmetic and Number Systems*, and we deliberately do not re-teach its ground. This lesson is a craft lesson: it assumes the census of 3.2 and drills the procedures.' },

    // ================================================================
    // 3. METHOD 2 - THE POSITIONAL (POWERS) METHOD
    // ================================================================
    { kind: 'heading', text: 'Method 2: The Positional (Powers) Method' },
    { kind: 'para', text: 'The ladder produces digits by attacking the number from its units end. The second method attacks from the other end: it fills the place values directly. Recall the shelf of powers of two — $1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, \\ldots$ — the place values of the binary system, each double the one before. To convert a decimal number, subtract the largest power of two that fits, mark that place with a $1$, and repeat with what is left; a power that does not fit earns a $0$ in its place. When the remainder reaches zero, the marks, read from the largest place down, are the answer.' },
    { kind: 'para', text: 'The method is the direct mirror of the weight check we have been using all along. The check asks: which powers of two sum to this number? The method asks the same question before knowing the answer — and its bookkeeping is subtraction rather than addition. It is how most people convert small numbers in their heads, usually without naming what they are doing.' },
    { kind: 'example', title: 'Convert 100 to binary by the positional (powers) method.', steps: [
      'List the shelf up to $100$: $1, 2, 4, 8, 16, 32, 64$.',
      'Take the largest power that fits: $64$, since $128$ is too big. Mark the $64$-place with a $1$ and subtract: $100 - 64 = 36$.',
      'Now, $32$ fits into $36$: mark the $32$-place with a $1$ and subtract: $36 - 32 = 4$.',
      'So, test $16$: $4 - 16$ does not fit — mark the $16$-place with a $0$.',
      'Now, test $8$: $4 - 8$ does not fit — mark the $8$-place with a $0$.',
      'So, $4$ fits exactly: mark the $4$-place with a $1$ and subtract: $4 - 4 = 0$.',
      'Now, the remainder is $0$, so the $2$-place and the $1$-place both earn $0$s — nothing is left to claim them.',
      'Read the marks from the $64$-place down: $1, 1, 0, 0, 1, 0, 0$.',
      'Hence $100 = 1100100_2$ — the same answer the ladder gave, reached from the other end.',
    ] },
    { kind: 'figure', caption: 'One number, two roads: on the left, 100 walks the division ladder — divide by 2 seven times, remainders 0, 0, 1, 0, 0, 1, 1 read bottom-up; on the right, 100 walks the powers table — subtract 64, subtract 32, skip 16 and 8, subtract 4, skip 2 and 1, marks read left to right. Both roads deliver the same seven digits, 1100100.', svg: cf36TwoMethods100Svg() },
    { kind: 'para', text: 'The two methods are not rivals; they are the two directions of one positional fact, and each can check the other. The ladder asks, seven times, *what is the remainder on halving?*; the powers table asks, seven times, *does this place get a 1?*. If both agree — as they did for $100$ — you have the strongest check available: two independent procedures landing on the same string. In an examination, run the ladder as your working and the powers sum as your ten-second verification; at a desk, use whichever suits the size of the number.' },
    { kind: 'table', caption: 'When each method wins: the honest comparison.', head: ['Question', 'The division ladder', 'The positional (powers) method'], rows: [
      ['Best for', 'any size of number — the rungs stay small and mechanical, however large the input', 'small and medium numbers, and mental arithmetic'],
      ['Arithmetic involved', 'halving with remainders — easy, uniform steps', 'subtraction from a shelf of powers — needs the powers of two known cold'],
      ['Direction of attack', 'from the units end, peeling digits right to left', 'from the leading end, filling places left to right'],
      ['Main error risk', 'reading the remainders top-down (the classic slip)', 'skipping a place value or mis-marking a 0 between two 1s'],
      ['Digits produced', 'least significant first — must be reversed', 'most significant first — written in final order'],
      ['Examination advice', 'show every rung; examiners award method marks for the trail', 'use it as the check, or as the main method for numbers under a few hundred'],
    ] },
    { kind: 'para', text: 'A hybrid habit serves best. For a number like $45$, the powers method is faster than it is to write down: $45$ is $32$ plus $8$ plus $4$ plus $1$, so $101101$ — done. For a number like $2026$, the ladder wins: eleven mechanical halvings, no need to hold a shelf of powers in your head, and the rungs practically check themselves. The craft is knowing that both roads exist and reach the same town; the taste for which road to walk is yours.' },

    // ================================================================
    // 4. THE LIMITS - THE LARGEST NUMBER IN n BITS
    // ================================================================
    { kind: 'heading', text: 'The Limits: The Largest Number in n Bits' },
    { kind: 'para', text: 'Every ladder in this lesson left behind a count of rungs: six for $45$, seven for $77$ and $100$, eight for $156$, eleven for $2026$. That count is not decoration — it is the number of bits the answer occupies, and it raises the question the examination bench loves in every dress: how much can $n$ bits hold? A register, a byte, a memory cell — each is a row of $n$ wheels, each wheel holding $0$ or $1$. What is the largest value such a row can name?' },
    { kind: 'para', text: 'Reason it out with the odometer in mind. With $n$ wheels you can show $00 \\ldots 0$ and climb one click at a time; the largest reading is the one with every wheel at $1$. One wheel holds $1$; two wheels hold $11 = 3$; three wheels hold $111 = 7$; and in general $n$ wheels hold a string of $n$ ones. Now sum that string by weights: the places are worth $2^{n-1}, 2^{n-2}, \\ldots, 2, 1$, and the sum of all the powers of two from $2^0$ to $2^{n-1}$ falls one short of the next power — add $1$ to $11 \\ldots 1$ and the carry ripples left through every place, turning each $1$ into a $0$, and lands a $1$ in one new place beyond the row: exactly as $999 + 1 = 1000$ rolls a three-digit odometer.' },
    { kind: 'equation', latex: '\\text{largest value in } n \\text{ bits} \\;=\\; 2^n - 1 \\;=\\; \\underbrace{11 \\cdots 1}_{n \\text{ ones}} \\tag{1}', note: 'The all-ones ceiling: eight wheels hold at most $2^8 - 1 = 255$; sixteen hold at most $2^{16} - 1 = 65{,}535$. One more click spills into a new wheel.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the all-ones ceiling', text: 'The largest value that fits in $n$ bits is $2^n - 1$. Hence $n$ bits name exactly $2^n$ values — $0$ through $2^n - 1$ — and the first value that does NOT fit is $2^n$, which needs $n + 1$ bits. So the largest 8-bit value is $255$; the largest 16-bit value is $65{,}535$; and $256 = 2^8$ is the first number that needs nine bits.' },
    { kind: 'figure', caption: 'The roll-over drawn: eight wheels all showing 1 hold 255, the largest 8-bit value; the +1 carry ripples right to left, every 1 collapsing to a 0, and a ninth wheel lights up — 100000000, which is 256, the first value too big for eight bits, exactly as 999 + 1 rolls a three-digit odometer to 1000.', svg: cf36OdometerSvg() },
    { kind: 'para', text: 'Two of these ceilings have names because hardware gave them jobs. Eight bits make a **byte** — the addressable cell of main memory — and its range is $0$ to $255$, which is why colour channels, character codes and small counters visibly top out at 255. Sixteen bits make the classic word of the machines that followed the 8-bit era, with range $0$ to $65{,}535$ — which is why older games and instruments visibly wrapped at $65{,}535$, and why the overflow stories you will meet later in this corridor are this same roll-over wearing bigger wheels. The roll-over is not a fault of binary; it is what every fixed-width place system does at its ceiling, decimal included.' },
    { kind: 'example', title: 'How many bits does each of 999, 1000, 256 and 65,536 need?', steps: [
      'Take $999$ and ask the ceiling question in reverse: which width fits it? The largest 10-bit value is $2^{10} - 1 = 1023$, and $999 \\leq 1023$ — it fits.',
      'Now, check one width smaller: the largest 9-bit value is $2^9 - 1 = 511 < 999$ — it does not fit.',
      'Hence $999$ needs exactly $10$ bits; indeed its binary form $1111100111$ has ten digits.',
      'So, $1000$: still $\\leq 1023$, so $10$ bits as well — one value apart, the same width; the ladder gives $1111101000$.',
      'Now, $256 = 2^8$: one more than the 8-bit ceiling $255$, so it needs $9$ bits — the roll-over witness $100000000$.',
      'So, $65{,}536 = 2^{16}$: one more than the 16-bit ceiling $65{,}535$, so it needs $17$ bits.',
      'Therefore the rule in words: a whole number $n$ needs $\\lfloor \\log_2 n \\rfloor + 1$ bits — the position of its leading bit, counted from zero, plus one.',
    ] },
    { kind: 'table', caption: 'The ceilings: the largest value for each common bit width — read it as an odometer table, each row one wheel wider.', head: ['Bits', 'Largest value', 'In binary'], rows: [
      ['$4$', '$2^4 - 1 = 15$', '$1111$'],
      ['$8$', '$2^8 - 1 = 255$', '$11111111$'],
      ['$12$', '$2^{12} - 1 = 4095$', 'twelve 1s'],
      ['$16$', '$2^{16} - 1 = 65{,}535$', 'sixteen 1s'],
      ['$20$', '$2^{20} - 1 = 1{,}048{,}575$', 'twenty 1s'],
      ['$32$', '$2^{32} - 1 = 4{,}294{,}967{,}295$', 'thirty-two 1s'],
    ] },
    { kind: 'para', text: 'A caution before we cross the point. The ceiling law is about STORAGE, not about the numbers themselves: any whole number has a binary form, and $2026$ needed eleven bits without complaint. The ceiling bites when a machine fixes the width in advance — a byte cannot hold $256$, an unsigned 16-bit counter cannot hold $65{,}536$. When you meet an overflow in practice you are meeting this section; the repair is more bits or a different plan, never a hopeful shrug.' },

    // ================================================================
    // 5. FRACTIONS - THE HONEST FRONTIER
    // ================================================================
    { kind: 'heading', text: 'Fractions: The Honest Frontier' },
    { kind: 'para', text: 'Whole numbers now yield to the ladder without complaint. But you write quantities like $0.375$ and $3.625$ every day, and the machine must hold those too — so the craft needs a second half. The whole part and the fraction part are converted by two DIFFERENT machines, and the discipline is keeping them apart: the whole part is divided down (the ladder you already own), the fraction part is multiplied up (the mirror machine you are about to meet), and the two answers join at the point.' },
    { kind: 'para', text: 'Here is the mirror machine in words. Take the decimal fraction. Multiply it by $2$. The integer part of the product — $0$ or $1$ — is the next bit of the answer, produced most significant first. Keep the fraction part of the product and multiply by $2$ again. Repeat until the fraction part reaches $0$, and read the bits DOWN the page, in the order produced. Notice the beautiful reversal: the whole-number ladder hands you digits from the units end and must be read bottom-up; the fraction ladder hands you digits from the leading end and is read top-down.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the fraction ladder', text: 'A decimal fraction $f$, with $0 \\leq f < 1$, is said to be **converted to binary by the fraction ladder** if $f$ is multiplied repeatedly by $2$ — each time recording the integer part, $0$ or $1$, and continuing with the fraction part — until the fraction part is $0$, the binary form of $f$ being then read as the recorded integer parts in their order of production. Symbolically: if $2f = b_1 + f_1$ with $b_1 \\in \\{0, 1\\}$, then $2f_1 = b_2 + f_2$, and so on; the binary form is $0.b_1 b_2 b_3 \\ldots$' },
    { kind: 'algorithm', title: 'The fraction ladder (decimal fraction to binary)', lines: [
      { code: 'read in the decimal fraction f  (0 <= f < 1)', note: 'split a mixed number first: whole part by the division ladder, fraction part by this one.' },
      { code: 'while f > 0:', note: 'the ladder climbs as long as any fraction remains.' },
      { code: '    p  =  2 x f              the product', note: 'multiplying by 2 shifts a binary fraction one place up, exactly as multiplying by 10 shifts a decimal fraction one place up.' },
      { code: '    b  =  integer part of p   KEEP THIS BIT', note: 'the bit is 1 exactly when the product has outgrown a whole unit.' },
      { code: '    f  =  fraction part of p  the next input', note: 'the leftover fraction carries the ladder onward.' },
      { code: 'write the bits in the order produced (read DOWN)', note: 'no reversal here — the first bit produced is the first bit after the point.' },
    ], note: 'Termination is NOT promised: the loop halts only if some doubling lands exactly on a whole number. Fractions whose denominators are powers of two always halt; the others repeat forever — the honest frontier of the pages below.' },
    { kind: 'example', title: 'Convert 0.375, 0.625 and 0.8125 to binary by the fraction ladder.', steps: [
      'Take $0.375$ and double: $0.375 \\times 2 = 0.75$. The integer part is $0$ — record it — and the fraction part $0.75$ continues.',
      'Now, $0.75 \\times 2 = 1.5$. The integer part is $1$ — record it — and the fraction part $0.5$ continues.',
      'So, $0.5 \\times 2 = 1.0$. The integer part is $1$ — record it — and the fraction part is $0$: the ladder stops after three rungs.',
      'Read the bits down: $0, 1, 1$. Hence $0.375 = 0.011_2$.',
      'Check by weights after the point: $0.011 = \\frac{1}{4} + \\frac{1}{8} = 0.25 + 0.125 = 0.375$ — the ladder closes.',
      'Now, $0.625$: $0.625 \\times 2 = 1.25$ (bit $1$, keep $0.25$); $0.25 \\times 2 = 0.5$ (bit $0$); $0.5 \\times 2 = 1.0$ (bit $1$, stop).',
      'Read down: $0.625 = 0.101_2$; check: $0.5 + 0.125 = 0.625$.',
      'So, $0.8125$: $0.8125 \\times 2 = 1.625$ (bit $1$, keep $0.625$); $0.625 \\times 2 = 1.25$ (bit $1$, keep $0.25$); $0.25 \\times 2 = 0.5$ (bit $0$); $0.5 \\times 2 = 1.0$ (bit $1$, stop).',
      'Read down: $0.8125 = 0.1101_2$; check: $0.5 + 0.25 + 0.0625 = 0.8125$.',
    ] },
    { kind: 'figure', caption: 'The fraction ladder for 0.375: three doublings — 0.375 × 2 = 0.75 peels a 0; 0.75 × 2 = 1.5 peels a 1 and keeps 0.5; 0.5 × 2 = 1.0 peels a 1 and empties the fraction — the bits read DOWN the slot column as 011, and the weight check 0.25 + 0.125 = 0.375 closes the run.', svg: cf36FracSvg({
      title: 'the fraction ladder: 0.375 into base 2',
      steps: [
        { before: '0.375', product: '0.75', bit: 0 },
        { before: '0.75', product: '1.5', bit: 1 },
        { before: '0.5', product: '1.0', bit: 1 },
      ],
      answerLine: '0.375 = 0.011 in base 2 (read the bit column DOWN)',
      checkLine: 'check: 0.011 = 0.25 + 0.125 = 0.375 - three rungs, because 0.375 = 3/8 and 8 = 2 x 2 x 2',
      aria: 'The fraction ladder converting 0.375 to binary. Three doublings: 0.375 times 2 equals 0.75, integer part 0, keep 0.75; 0.75 times 2 equals 1.5, integer part 1, keep 0.5; 0.5 times 2 equals 1.0, integer part 1, nothing left. The bit column reads down as 0, 1, 1, so 0.375 equals 0.011 in base 2, checked as 0.25 plus 0.125 equals 0.375.',
    }) },
    { kind: 'para', text: 'Why does the mirror machine work? For the same reason the division ladder works, stood on its head. The places after the point are worth $\\frac{1}{2}, \\frac{1}{4}, \\frac{1}{8}, \\ldots$, each half of the one before. Multiplying a binary fraction by $2$ slides every place one step left, across the point: whatever lands left of the point is the leading bit, and the rest is the remaining fraction waiting for its next slide. The division ladder divided to push digits out the right-hand end; the fraction ladder multiplies to push digits out the left-hand end. One positional law, two exits.' },
    { kind: 'para', text: 'When does the ladder promise to stop? Watch the denominators. $0.375 = \\frac{3}{8}$, and $8 = 2^3$: three halvings empty it, and the ladder stopped in exactly three rungs. $0.8125 = \\frac{13}{16}$, and $16 = 2^4$: four rungs. $0.625 = \\frac{5}{8}$: three rungs again. The pattern is a theorem.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — which fractions terminate in binary', text: 'A fraction $\\frac{p}{q}$ in lowest terms terminates in base $2$ if and only if $q$ is a power of $2$; the expansion then needs exactly the exponent of that power of bits after the point. If $q$ has any prime factor other than $2$, the fraction ladder repeats forever — a **repeating binary fraction**, written with a bar over the repeating block, exactly as $\\frac{1}{3} = 0.\\overline{3}$ repeats in decimal.' },
    { kind: 'para', text: 'For example, cast the terminating law over the fractions of this lesson:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $\\frac{3}{8} = 0.375$: the denominator is $8 = 2^3$, so the ladder stops after three bits — $0.011$.',
      '(ii) $\\frac{13}{16} = 0.8125$: the denominator is $16 = 2^4$, so four bits — $0.1101$.',
      '(iii) $\\frac{19}{32} = 0.59375$: the denominator is $32 = 2^5$, so five bits — $0.10011$.',
      '(iv) $\\frac{1}{10} = 0.1$: the denominator is $10 = 2 \\times 5$, and that stray factor of five is fatal — the ladder NEVER stops, as the next section shows honestly.',
    ] },
    { kind: 'para', text: 'A mixed number, finally, is no new machine at all — it is a split. Take $3.625$. The whole part $3$ converts by the division ladder: $3 = 11_2$. The fraction part $0.625$ converts by the fraction ladder: $0.101_2$. Join the two at the point: $3.625 = 11.101_2$. Check by weights on both sides of the point: $2 + 1 + 0.5 + 0.125 = 3.625$. The Illustration below draws the split as two panels, and the exercises drill it.' },
    { kind: 'example', title: 'Convert the mixed number 3.625 to binary.', steps: [
      'Split the number at the point: $3.625 = 3 + 0.625$ — whole part $3$, fraction part $0.625$.',
      'Take the whole part down the division ladder: $3 \\div 2 = 1$ remainder $1$; $1 \\div 2 = 0$ remainder $1$ — read up: $3 = 11_2$.',
      'Now, take the fraction part up the fraction ladder: $0.625 \\times 2 = 1.25$ (bit $1$); $0.25 \\times 2 = 0.5$ (bit $0$); $0.5 \\times 2 = 1.0$ (bit $1$, stop) — read down: $0.101_2$.',
      'Join at the point: $3.625 = 11.101_2$.',
      'Check by weights: $2 + 1 + 0.5 + 0.125 = 3.625$ — both halves of the split close.',
    ] },
    { kind: 'heading', text: 'The Honest One: 0.1 Never Terminates' },
    { kind: 'para', text: 'Now the honest paragraph this lesson owes you. Take the friendliest fraction in daily use — one tenth — and run the mirror machine on it. $0.1 \\times 2 = 0.2$: bit $0$. $0.2 \\times 2 = 0.4$: bit $0$. $0.4 \\times 2 = 0.8$: bit $0$. $0.8 \\times 2 = 1.6$: bit $1$, keep $0.6$. $0.6 \\times 2 = 1.2$: bit $1$, keep $0.2$. And $0.2$ has been met before — the ladder has returned to a state it already visited, so it must repeat those same five doublings forever. The bits settle, after one lone leading $0$, into the block $0011$, repeating without end:' },
    { kind: 'equation', latex: '0.1 \\;=\\; 0.0\\overline{0011} \\;=\\; 0.0001100110011\\ldots \\tag{2}', note: 'One lone bit, then the block 0011 forever — because $\\frac{1}{10} = \\frac{1}{2 \\times 5}$, and no power of two can ever clear that factor of five.' },
    { kind: 'example', title: 'Run the fraction ladder on 0.1 and prove it never terminates.', steps: [
      'Take $0.1$ and double: $0.1 \\times 2 = 0.2$ — bit $0$, keep $0.2$.',
      'Now, $0.2 \\times 2 = 0.4$ — bit $0$, keep $0.4$.',
      'So, $0.4 \\times 2 = 0.8$ — bit $0$, keep $0.8$.',
      'Now, $0.8 \\times 2 = 1.6$ — bit $1$, keep $0.6$.',
      'So, $0.6 \\times 2 = 1.2$ — bit $1$, keep $0.2$.',
      'Observe: the fraction part is $0.2$ again — the state of the second rung has returned, so the trail $0.1 \\to 0.2 \\to 0.4 \\to 0.8 \\to 0.6 \\to 0.2$ closes its loop and must run forever.',
      'Hence the bits repeat with period four after one leading bit: $0.1 = 0.0\\overline{0011}$, and the first twelve bits are $000110011001$.',
      'Check the law: $\\frac{1}{10}$ in lowest terms has denominator $10 = 2 \\times 5$ — not a power of two, so termination was never on the table.',
    ] },
    { kind: 'para', text: 'This is not a defect you can repair with better arithmetic; it is a property of the base. Ten has the factor five, two does not, and no finite string of halves, quarters and eighths can sum to exactly one tenth. Binary cannot hold $0.1$ exactly, in the same way that decimal cannot hold $\\frac{1}{3}$ exactly — decimal repeats $0.333\\ldots$, binary repeats $0.000110011\\ldots$. The honest consequence reaches every programming language on earth: a machine stores $0.1$ by cutting the infinite ladder at some fixed width (a double keeps 53 significant bits), so the stored value is a hair off, the stored $0.2$ likewise, and their sum misses $0.3$ by a similar hair — which is why **0.1 + 0.2** prints as **0.30000000000000004** in Python, in JavaScript and in every sibling. The full theory of storing such numbers — floating point, its widths, its rounding rules — belongs to later books in this corridor and to *Digital Logic Design*, which owns the gate-level view; we plant the doorstep here and walk on.' },
    { kind: 'callout', tone: 'insight', title: 'Why 0.1 + 0.2 is not 0.3 — and never was', text: 'When a language adds its stored $0.1$ to its stored $0.2$, it is adding two fractions whose binary ladders were chopped at the 53rd significant bit. Each chop leaves a residue far below one part in a trillion, but the residues do not cancel; the sum misses $0.3$ by a similar hair and the machine honestly prints what it holds: $0.30000000000000004$. The statement $0.1 + 0.2 = 0.3$ is exactly true — in base ten. The error is not in the adding; it happens in the dressing room, at the moment $0.1$ was asked to wear a dress cut only from halves.' },

    // ================================================================
    // 6. DOORSTEPS, TERMS, FORMULA CARDS, THE EXAMINATION BENCH
    // ================================================================
    { kind: 'heading', text: 'The Doorsteps' },
    { kind: 'para', text: 'This lesson built one road: decimal in, pattern out — by the division ladder, the powers table and the fraction ladder. The next lesson, 3.7, walks the road home: pattern in, decimal out. You already hold the key, because the weight check that closed every ladder in these pages IS the reverse conversion — lesson 3.7 simply promotes it from verifier to main method. Lesson 3.8 then sets the two systems side by side and does arithmetic in both, including the regrouping shortcuts that jump between binary, octal and hexadecimal without ever passing through decimal. The full theory of number systems — radix, the four dresses, the proofs beneath these machines — lives in our elder shelf-mate *Arithmetic and Number Systems*; the gate-level view of the circuits that shift and add these patterns is owned by *Digital Logic Design*; and the storage of the fractions that refuse to terminate belongs to the floating-point chapters later in this corridor. This seat drilled the craft; those books explain the city it serves.' },
    { kind: 'terms', items: [
      { term: 'division ladder', def: 'The repeated-division procedure for converting a decimal whole number to another base: divide by the base, keep the remainder, continue with the quotient until it reaches 0; the remainders read bottom-up are the answer.' },
      { term: 'positional (powers) method', def: 'Conversion by filling place values: subtract the largest power of two that fits, mark that place with a 1, and repeat with the remainder; places that do not fit earn a 0. The marks read from the largest place down.' },
      { term: 'bit length', def: 'The number of bits a whole number occupies in binary — the count of ladder rungs, or one more than the exponent of the leading power of two.' },
      { term: 'byte', def: 'A group of 8 bits; the addressable unit of main memory. Its range is 0 to 255, and 256 is the first value that spills out.' },
      { term: 'all-ones ceiling', def: 'The largest value that fits in n bits, namely 2^n - 1 — the reading with every wheel at 1, one click short of the roll-over into a new place.' },
      { term: 'fraction ladder', def: 'The repeated-doubling procedure for converting a decimal fraction to binary: multiply by 2, record the integer part, continue with the fraction part; the bits read down, in their order of production.' },
      { term: 'terminating binary fraction', def: 'A fraction whose binary expansion ends — exactly those fractions whose lowest-terms denominator is a power of 2.' },
      { term: 'repeating binary fraction', def: 'A fraction whose fraction ladder never empties: the bits settle into a block that repeats forever, written with an overbar, as 0.1 = 0.0001100110011… with the block 0011 repeating.' },
    ] },
    { kind: 'formula', name: 'The largest n-bit value', latex: '\\text{largest in } n \\text{ bits} \\;=\\; 2^n - 1', note: 'Eight bits top out at 255; sixteen at 65,535. The first value that does not fit is 2^n, which needs one more bit.' },
    { kind: 'formula', name: 'Bits a whole number needs', latex: '\\text{bits}(n) \\;=\\; \\lfloor \\log_2 n \\rfloor + 1', note: '45 needs 6, 100 needs 7, 256 needs 9, 2026 needs 11 — the count of ladder rungs.' },
    { kind: 'formula', name: 'The division-ladder split', latex: 'n = 2q + r, \\qquad r \\in \\{0, 1\\}', note: 'Every rung of the whole-number ladder: the remainder r is the next bit, least significant first; the quotient q is the next dividend.' },
    { kind: 'formula', name: 'The fraction-ladder split', latex: '2f = b + f^{\\prime}, \\qquad b \\in \\{0, 1\\}', note: 'Every rung of the fraction ladder: the integer part b is the next bit after the point, most significant first; the leftover fraction is the next input.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — what the bench drills', text: 'This conversion is the examination bench’s favourite drill, and the asks are stable across banking and SSC computer-awareness papers, school and board examinations, and Cambridge 9618-style papers (all exam-style descriptions in our own wording — never a claim to quote a real paper): (i) convert-this-number drills — a decimal whole number into binary, octal or hexadecimal, exactly the six pinned ladders of this lesson plus fresh values in the exercises; (ii) the bottom-up reading trap — a multiple-choice option that is the remainder column read top-down, worth nothing; (iii) the fraction ladder — a small terminating fraction such as 0.375 or 0.625, or a one-mark statement about 0.1 never terminating; (iv) the 255/256 roll-over — the largest 8-bit value, or how many bits a given number needs. Method marks live in the trail: show every rung, and close with the weight check. The practice sets below are built in that idiom, graded from first rungs to full examination questions.' },

    // ================================================================
    // 7. CHECK YOURSELF - THE QUIZ (5 items)
    // ================================================================
    { kind: 'heading', text: 'Check Yourself' },
    { kind: 'para', text: 'Five questions, one from each ridge of the lesson: the reading direction, the pinned ladder, the ceiling, the fraction ladder and the honest frontier. Choose before you read on — each explanation says not only why the keyed answer is right but why every other option fails.' },
    { kind: 'quiz', items: [
      { q: 'In the division ladder for converting a decimal whole number to binary, the FIRST remainder you write down is —', options: [
        'the leading (leftmost) bit of the answer',
        'the units (rightmost) bit of the answer',
        'the number of bits in the answer',
        'always the digit 1',
      ], answer: 1, explain: 'The first remainder is the units bit: dividing by 2 peels off the number’s last binary digit, exactly as dividing by 10 peels off the last decimal digit, so the very first rung hands you the rightmost bit. Option (a) fails because the leading bit is produced by the LAST rung, not the first. Option (c) fails because the number of bits equals the number of RUNGS, not any remainder. Option (d) fails because the first remainder is 0 for every even number — the 100 ladder opens with remainder 0.' },
      { q: 'Convert the decimal number 45 to binary.', options: [
        '101101',
        '101011',
        '110101',
        '011011',
      ], answer: 0, explain: 'The ladder gives remainders bottom-up as 1, 0, 1, 1, 0, 1, so $45 = 101101_2$, and the weight check closes it: $32 + 8 + 4 + 1 = 45$. Option (b), 101011, is 43 — the final two bits have been swapped, the reading-direction slip in miniature. Option (c), 110101, is 53 — the bits gathered in the wrong order, as though the column were read up from the wrong end. Option (d), 011011, is 27 — the leading bit dropped and a middle place mis-marked. A ten-second weights check exposes all three.' },
      { q: 'What is the largest value that can be stored in 8 bits?', options: [
        '128',
        '256',
        '64',
        '255',
      ], answer: 3, explain: 'Eight wheels all at 1 hold $2^8 - 1 = 255 = 11111111_2$ — the all-ones ceiling. Option (a), 128, is $2^7$: the VALUE of the eighth place, not the largest total the eight places can name. Option (b), 256, is the seductive one — it is the FIRST value that does not fit, the roll-over needing a ninth bit, so it is exactly wrong by being one click too far. Option (c), 64, is $2^6$: not even the largest value in 7 bits, which is 127.' },
      { q: 'Convert the decimal fraction 0.375 to binary.', options: [
        '0.111',
        '0.101',
        '0.011',
        '0.110',
      ], answer: 2, explain: 'The fraction ladder doubles and peels: $0.375 \\times 2 = 0.75$ (bit 0); $0.75 \\times 2 = 1.5$ (bit 1, keep 0.5); $0.5 \\times 2 = 1.0$ (bit 1, stop). The bits read DOWN: $0.375 = 0.011_2$, and $0.25 + 0.125 = 0.375$. Option (a), 0.111, is 0.875 — the bits read in reverse, the direction trap wearing fraction dress. Option (b), 0.101, is 0.625 — a different (and correct) conversion from this lesson, offered as a decoy. Option (d), 0.110, is 0.75 — the first bit promoted to a 1, as though the first doubling had already outgrown a unit.' },
      { q: 'Which statement about the decimal fraction 0.1, written in binary, is true?', options: [
        'It terminates after four bits: 0.1 = 0.0001 in base 2',
        'It terminates after ten bits',
        'It never terminates — after one leading bit, the block 0011 repeats forever',
        'It cannot be written in base 2 at all, even approximately',
      ], answer: 2, explain: 'One tenth is $\\frac{1}{10} = \\frac{1}{2 \\times 5}$, and since the lowest-terms denominator is not a power of two, the fraction ladder never empties: the trail $0.1 \\to 0.2 \\to 0.4 \\to 0.8 \\to 0.6$ returns to 0.2 and cycles, so $0.1 = 0.0001100110011\\ldots$ with the block 0011 repeating forever. Option (a) fails on arithmetic: 0.0001 in base 2 is one sixteenth, 0.0625, not one tenth. Option (b) fails by the same theorem — no width, ten bits or ten thousand, ever terminates it. Option (d) overstates the trouble: every fraction can be APPROXIMATED in binary to any accuracy you are willing to pay bits for (a double keeps 53 significant bits); what fails is exactness, not existence.' },
    ] },

    // ================================================================
    // 8. PRACTICE SETS (15 exercises: L1x4, L2x5, L3x4, L4x2)
    // ================================================================
    { kind: 'heading', text: 'Practice Sets' },
    { kind: 'para', text: 'The sets below climb four rungs: L1 begins — single ladders with every rung asked for; L2 consolidates — both methods, the wider bases and bigger climbs; L3 advances — fractions, mixed numbers and the honest frontier; L4 trains the examination idiom, and every L4 item is exam-style — an original item in the examination idiom, never a claim to quote a real paper. Work every solution chain with a pencil; the connectives are the method, and the figures inside the solutions are the arithmetic drawn.' },
    { kind: 'exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Convert $23$ to binary by the division ladder, showing every rung, and close with the weight check.', solution: [
          'Take $23$: $23 \\div 2 = 11$ remainder $1$.',
          'Now, $11 \\div 2 = 5$ remainder $1$.',
          'So, $5 \\div 2 = 2$ remainder $1$.',
          'Now, $2 \\div 2 = 1$ remainder $0$.',
          'So, $1 \\div 2 = 0$ remainder $1$ — five rungs, and the ladder stops.',
          'Read the remainders bottom-up: $1, 0, 1, 1, 1$.',
          'Check by weights: $16 + 4 + 2 + 1 = 23$ — the ladder closes.',
        ], answer: '$23 = 10111_2$', figures: [{ caption: 'The 23 ladder as a machine: five rungs of divide-by-2 with each quotient falling to the next dividend, the remainders 1, 1, 1, 0, 1 read bottom-up into 10111, checked as 16 + 4 + 2 + 1 = 23.', svg: cf36LadderSvg({
          title: 'the 23 ladder: five rungs to 10111',
          subtitle: 'divide by 2, keep the remainder, repeat on the quotient until it reaches 0',
          rows: [
            { n: 23, q: 11, r: 1 }, { n: 11, q: 5, r: 1 }, { n: 5, q: 2, r: 1 },
            { n: 2, q: 1, r: 0 }, { n: 1, q: 0, r: 1 },
          ],
          base: 2,
          answer: '10111',
          answerLabel: '23 in base 2',
          check: 'check by weights: 10111 = 16 + 4 + 2 + 1 = 23',
          note: 'five rungs for five bits - the row count is the bit length',
          aria: 'The division ladder converting 23 to binary. Five rungs: 23 divided by 2 equals 11 remainder 1; 11 divided by 2 equals 5 remainder 1; 5 divided by 2 equals 2 remainder 1; 2 divided by 2 equals 1 remainder 0; 1 divided by 2 equals 0 remainder 1. The remainders read bottom-up give 10111 in base 2; a check strip confirms 16 plus 4 plus 2 plus 1 equals 23.',
        }) }] },
        { q: 'Convert $14$ to binary by the division ladder, and say how many rungs the ladder needed.', solution: [
          'Take $14$: $14 \\div 2 = 7$ remainder $0$.',
          'Now, $7 \\div 2 = 3$ remainder $1$.',
          'So, $3 \\div 2 = 1$ remainder $1$.',
          'Now, $1 \\div 2 = 0$ remainder $1$ — four rungs, and the ladder stops.',
          'Read the remainders bottom-up: $1, 1, 1, 0$.',
          'Check by weights: $8 + 4 + 2 = 14$ — correct, and the four rungs announce a four-bit answer.',
        ], answer: '$14 = 1110_2$ (four rungs)' },
        { q: 'Convert $39$ to binary by whichever method you choose, and verify the answer with the other method.', solution: [
          'Take the ladder: $39 \\div 2 = 19$ remainder $1$.',
          'Now, $19 \\div 2 = 9$ remainder $1$.',
          'So, $9 \\div 2 = 4$ remainder $1$.',
          'Now, $4 \\div 2 = 2$ remainder $0$.',
          'So, $2 \\div 2 = 1$ remainder $0$.',
          'Now, $1 \\div 2 = 0$ remainder $1$ — six rungs; read up: $1, 0, 0, 1, 1, 1$.',
          'Hence, by the ladder, $39 = 100111_2$.',
          'Verify by the powers method: $39 - 32 = 7$; $7 - 4 = 3$; $3 - 2 = 1$; $1 - 1 = 0$ — marks at the $32$, $4$, $2$ and $1$ places.',
          'So the marks read $100111$ — both roads meet, and the weights close it: $32 + 4 + 2 + 1 = 39$.',
        ], answer: '$39 = 100111_2$' },
        { q: 'Convert $72$ to binary, and state its bit length.', solution: [
          'Take $72$: $72 \\div 2 = 36$ remainder $0$.',
          'Now, $36 \\div 2 = 18$ remainder $0$.',
          'So, $18 \\div 2 = 9$ remainder $0$.',
          'Now, $9 \\div 2 = 4$ remainder $1$.',
          'So, $4 \\div 2 = 2$ remainder $0$.',
          'Now, $2 \\div 2 = 1$ remainder $0$.',
          'So, $1 \\div 2 = 0$ remainder $1$ — seven rungs; read up: $1, 0, 0, 1, 0, 0, 0$.',
          'Check by weights: $64 + 8 = 72$ — correct.',
          'Hence $72 = 1001000_2$, a seven-bit answer.',
        ], answer: '$72 = 1001000_2$ (seven bits)' },
      ] },
      { level: 'L2', questions: [
        { q: 'Convert $200$ to binary by the division ladder, showing every rung.', solution: [
          'Take $200$: $200 \\div 2 = 100$ remainder $0$.',
          'Now, $100 \\div 2 = 50$ remainder $0$.',
          'So, $50 \\div 2 = 25$ remainder $0$.',
          'Now, $25 \\div 2 = 12$ remainder $1$.',
          'So, $12 \\div 2 = 6$ remainder $0$.',
          'Now, $6 \\div 2 = 3$ remainder $0$.',
          'So, $3 \\div 2 = 1$ remainder $1$.',
          'Now, $1 \\div 2 = 0$ remainder $1$ — eight rungs, and the ladder stops.',
          'Read the remainders bottom-up: $1, 1, 0, 0, 1, 0, 0, 0$.',
          'Check by weights: $128 + 64 + 8 = 200$ — the ladder closes.',
        ], answer: '$200 = 11001000_2$', figures: [{ caption: 'The 200 ladder: eight rungs of divide-by-2, remainders 0, 0, 0, 1, 0, 0, 1, 1 read bottom-up as 11001000, checked by weights as 128 + 64 + 8 = 200.', svg: cf36LadderSvg({
          title: 'the 200 ladder: eight rungs to 11001000',
          subtitle: 'divide by 2, keep the remainder, repeat on the quotient until it reaches 0',
          rows: [
            { n: 200, q: 100, r: 0 }, { n: 100, q: 50, r: 0 }, { n: 50, q: 25, r: 0 },
            { n: 25, q: 12, r: 1 }, { n: 12, q: 6, r: 0 }, { n: 6, q: 3, r: 0 },
            { n: 3, q: 1, r: 1 }, { n: 1, q: 0, r: 1 },
          ],
          base: 2,
          answer: '11001000',
          answerLabel: '200 in base 2',
          check: 'check by weights: 11001000 = 128 + 64 + 8 = 200',
          note: 'the FIRST remainder (0) is the units bit - read the column bottom-up, never top-down',
          aria: 'The division ladder converting 200 to binary. Eight rungs: 200 divided by 2 equals 100 remainder 0; 100 divided by 2 equals 50 remainder 0; 50 divided by 2 equals 25 remainder 0; 25 divided by 2 equals 12 remainder 1; 12 divided by 2 equals 6 remainder 0; 6 divided by 2 equals 3 remainder 0; 3 divided by 2 equals 1 remainder 1; 1 divided by 2 equals 0 remainder 1. The remainders read bottom-up give 11001000 in base 2; a check strip confirms 128 plus 64 plus 8 equals 200.',
        }) }] },
        { q: 'Convert $999$ to binary by BOTH methods — the division ladder and the powers table — and confirm that the two roads meet.', solution: [
          'Take the ladder: $999 \\div 2 = 499$ remainder $1$.',
          'Now, $499 \\div 2 = 249$ remainder $1$.',
          'So, $249 \\div 2 = 124$ remainder $1$.',
          'Now, $124 \\div 2 = 62$ remainder $0$.',
          'So, $62 \\div 2 = 31$ remainder $0$.',
          'Now, $31 \\div 2 = 15$ remainder $1$.',
          'So, $15 \\div 2 = 7$ remainder $1$.',
          'Now, $7 \\div 2 = 3$ remainder $1$.',
          'So, $3 \\div 2 = 1$ remainder $1$.',
          'Now, $1 \\div 2 = 0$ remainder $1$ — ten rungs; read up: $1111100111$.',
          'So run the powers table: $999 - 512 = 487$; $487 - 256 = 231$; $231 - 128 = 103$; $103 - 64 = 39$; $39 - 32 = 7$; then $16$ and $8$ do not fit; $7 - 4 = 3$; $3 - 2 = 1$; $1 - 1 = 0$.',
          'Hence the marks read $1111100111$ — the two roads meet, and the weights close both: $512 + 256 + 128 + 64 + 32 + 4 + 2 + 1 = 999$.',
        ], answer: '$999 = 1111100111_2$ by both roads', figures: [{ caption: 'The powers check-off grid for 999: ten place cells from 512 down to 1 — the places 512, 256, 128, 64, 32, 4, 2, 1 earn 1s, the places 16 and 8 earn 0s, and the subtraction trail empties the number to zero with the marks reading 1111100111.', svg: cf36PowersSvg({
          title: 'the powers grid for 999: ten places, eight 1s',
          places: [512, 256, 128, 64, 32, 16, 8, 4, 2, 1],
          marks: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
          trail: [
            '999 - 512 = 487', '487 - 256 = 231', '231 - 128 = 103', '103 - 64 = 39',
            '39 - 32 = 7', '7 - 16 does not fit', '7 - 8 does not fit', '7 - 4 = 3',
            '3 - 2 = 1', '1 - 1 = 0',
          ],
          answerLine: 'marks left to right: 1111100111 - so 999 = 1111100111 in base 2',
          aria: 'The powers check-off grid for 999. Ten place-value cells from 512 down to 1: the places 512, 256, 128, 64 and 32 earn a 1; the places 16 and 8 earn a 0 because the remainder 7 does not reach them; the places 4, 2 and 1 earn a 1. The subtraction trail runs 999 minus 512 leaves 487; 487 minus 256 leaves 231; 231 minus 128 leaves 103; 103 minus 64 leaves 39; 39 minus 32 leaves 7; 16 and 8 do not fit; 7 minus 4 leaves 3; 3 minus 2 leaves 1; 1 minus 1 leaves 0. The marks read left to right as 1111100111.',
        }) }] },
        { q: 'Convert $180$ and $513$ to binary, and comment on the shape of each answer.', solution: [
          'Take $180$: $180 \\div 2 = 90$ remainder $0$; $90 \\div 2 = 45$ remainder $0$; $45 \\div 2 = 22$ remainder $1$; $22 \\div 2 = 11$ remainder $0$; $11 \\div 2 = 5$ remainder $1$; $5 \\div 2 = 2$ remainder $1$; $2 \\div 2 = 1$ remainder $0$; $1 \\div 2 = 0$ remainder $1$.',
          'Read up: $180 = 10110100_2$, and check: $128 + 32 + 16 + 4 = 180$.',
          'Now, $513$: $513 \\div 2 = 256$ remainder $1$; $256 \\div 2 = 128$ remainder $0$; $128 \\div 2 = 64$ remainder $0$; $64 \\div 2 = 32$ remainder $0$; $32 \\div 2 = 16$ remainder $0$; $16 \\div 2 = 8$ remainder $0$; $8 \\div 2 = 4$ remainder $0$; $4 \\div 2 = 2$ remainder $0$; $2 \\div 2 = 1$ remainder $0$; $1 \\div 2 = 0$ remainder $1$.',
          'Read up: $513 = 1000000001_2$, and check: $512 + 1 = 513$.',
          'Observe the shapes: $180$ alternates in a broken rhythm, while $513$ is a $1$, then eight $0$s, then a $1$ — the signature of $512 + 1$, one bit above the roll-over value $512$.',
        ], answer: '$180 = 10110100_2$; $513 = 1000000001_2$' },
        { q: 'Run the ladder machine in the wider bases: convert $77$ and $156$ to BOTH octal and hexadecimal.', solution: [
          'Take $77$ into base 8: $77 \\div 8 = 9$ remainder $5$; $9 \\div 8 = 1$ remainder $1$; $1 \\div 8 = 0$ remainder $1$.',
          'Read up: $77 = 115_8$; check: $64 + 8 + 5 = 77$.',
          'So, $77$ into base 16: $77 \\div 16 = 4$ remainder $13$, and a remainder of $13$ is the digit $D$; $4 \\div 16 = 0$ remainder $4$.',
          'Read up: $77 = 4D_{16}$; check: $4 \\times 16 + 13 = 64 + 13 = 77$.',
          'Now, $156$ into base 8: $156 \\div 8 = 19$ remainder $4$; $19 \\div 8 = 2$ remainder $3$; $2 \\div 8 = 0$ remainder $2$.',
          'Read up: $156 = 234_8$; check: $2 \\times 64 + 3 \\times 8 + 4 = 128 + 24 + 4 = 156$.',
          'So, $156$ into base 16: $156 \\div 16 = 9$ remainder $12$, written $C$; $9 \\div 16 = 0$ remainder $9$.',
          'Read up: $156 = 9C_{16}$; check: $9 \\times 16 + 12 = 144 + 12 = 156$ — the same machine, four dresses.',
        ], answer: '$77 = 115_8 = 4D_{16}$; $156 = 234_8 = 9C_{16}$', figures: [{ caption: 'The same machine in the wider bases: 77 into base 8 (read up 115), 156 into base 8 (read up 234), 77 into base 16 with remainder 13 written D (read up 4D), and 156 into base 16 with remainder 12 written C (read up 9C).', svg: cf36Pair77156Svg() }] },
        { q: 'Convert $1000$ to binary (an exam-style drill), and say how many bits it occupies.', solution: [
          'Take $1000$: $1000 \\div 2 = 500$ remainder $0$.',
          'Now, $500 \\div 2 = 250$ remainder $0$.',
          'So, $250 \\div 2 = 125$ remainder $0$.',
          'Now, $125 \\div 2 = 62$ remainder $1$.',
          'So, $62 \\div 2 = 31$ remainder $0$.',
          'Now, $31 \\div 2 = 15$ remainder $1$.',
          'So, $15 \\div 2 = 7$ remainder $1$.',
          'Now, $7 \\div 2 = 3$ remainder $1$.',
          'So, $3 \\div 2 = 1$ remainder $1$.',
          'Now, $1 \\div 2 = 0$ remainder $1$ — ten rungs; read up: $1, 1, 1, 1, 1, 0, 1, 0, 0, 0$.',
          'Hence $1000 = 1111101000_2$; check by weights: $512 + 256 + 128 + 64 + 32 + 8 = 1000$.',
          'So the answer occupies ten bits — fitting, since $999$ and $1000$ share the ceiling $2^{10} - 1 = 1023$.',
        ], answer: '$1000 = 1111101000_2$ (ten bits)' },
      ] },
      { level: 'L3', questions: [
        { q: 'Convert $0.4375$ to binary by the fraction ladder, reading the bits down.', solution: [
          'Take $0.4375$ and double: $0.4375 \\times 2 = 0.875$ — bit $0$, keep $0.875$.',
          'Now, $0.875 \\times 2 = 1.75$ — bit $1$, keep $0.75$.',
          'So, $0.75 \\times 2 = 1.5$ — bit $1$, keep $0.5$.',
          'Now, $0.5 \\times 2 = 1.0$ — bit $1$, and the fraction part is $0$: the ladder stops after four rungs.',
          'Read the bits down: $0, 1, 1, 1$.',
          'Check by weights: $0.25 + 0.125 + 0.0625 = 0.4375$ — the ladder closes.',
          'Hence, by the terminating law, four bits were promised all along: $0.4375 = \\frac{7}{16}$ and $16 = 2^4$.',
        ], answer: '$0.4375 = 0.0111_2$', figures: [{ caption: 'The 0.4375 fraction ladder: four doublings — 0.875 peels a 0, 1.75 peels a 1 and keeps 0.75, 1.5 peels a 1 and keeps 0.5, 1.0 peels a 1 and empties the fraction — the bits read down as 0111, checked by 0.25 + 0.125 + 0.0625 = 0.4375.', svg: cf36FracSvg({
          title: 'the fraction ladder: 0.4375 into base 2',
          steps: [
            { before: '0.4375', product: '0.875', bit: 0 },
            { before: '0.875', product: '1.75', bit: 1 },
            { before: '0.75', product: '1.5', bit: 1 },
            { before: '0.5', product: '1.0', bit: 1 },
          ],
          answerLine: '0.4375 = 0.0111 in base 2 (read the bit column DOWN)',
          checkLine: 'check: 0.0111 = 0.25 + 0.125 + 0.0625 = 0.4375 - four rungs, because 0.4375 = 7/16 and 16 = 2 x 2 x 2 x 2',
          aria: 'The fraction ladder converting 0.4375 to binary. Four doublings: 0.4375 times 2 equals 0.875, integer part 0, keep 0.875; 0.875 times 2 equals 1.75, integer part 1, keep 0.75; 0.75 times 2 equals 1.5, integer part 1, keep 0.5; 0.5 times 2 equals 1.0, integer part 1, nothing left. The bit column reads down as 0, 1, 1, 1, so 0.4375 equals 0.0111 in base 2, checked as 0.25 plus 0.125 plus 0.0625 equals 0.4375.',
        }) }] },
        { q: 'Convert $0.59375$ and $0.6875$ to binary by the fraction ladder.', solution: [
          'Take $0.59375$ and double: $0.59375 \\times 2 = 1.1875$ — bit $1$, keep $0.1875$.',
          'Now, $0.1875 \\times 2 = 0.375$ — bit $0$.',
          'So, $0.375 \\times 2 = 0.75$ — bit $0$.',
          'Now, $0.75 \\times 2 = 1.5$ — bit $1$, keep $0.5$.',
          'So, $0.5 \\times 2 = 1.0$ — bit $1$, stop: read down, $0.59375 = 0.10011_2$.',
          'Check: $0.5 + 0.0625 + 0.03125 = 0.59375$ — correct, and five bits were promised since $0.59375 = \\frac{19}{32}$.',
          'Now, $0.6875$: $0.6875 \\times 2 = 1.375$ (bit $1$, keep $0.375$); $0.375 \\times 2 = 0.75$ (bit $0$); $0.75 \\times 2 = 1.5$ (bit $1$, keep $0.5$); $0.5 \\times 2 = 1.0$ (bit $1$, stop).',
          'Read down: $0.6875 = 0.1011_2$; check: $0.5 + 0.125 + 0.0625 = 0.6875$.',
        ], answer: '$0.59375 = 0.10011_2$; $0.6875 = 0.1011_2$' },
        { q: 'Convert the mixed number $3.625$ to binary by splitting it into its whole and fraction parts.', solution: [
          'Split at the point: $3.625 = 3 + 0.625$.',
          'Take the whole part down the division ladder: $3 \\div 2 = 1$ remainder $1$; $1 \\div 2 = 0$ remainder $1$ — read up: $3 = 11_2$.',
          'Now, take the fraction part up the fraction ladder: $0.625 \\times 2 = 1.25$ (bit $1$); $0.25 \\times 2 = 0.5$ (bit $0$); $0.5 \\times 2 = 1.0$ (bit $1$, stop) — read down: $0.101_2$.',
          'Join the two halves at the point: $3.625 = 11.101_2$.',
          'Check by weights on both sides: $2 + 1 + 0.5 + 0.125 = 3.625$ — the split closes.',
        ], answer: '$3.625 = 11.101_2$', figures: [{ caption: 'The 3.625 split: on the left the whole part 3 walks the division ladder (read up: 11); on the right the fraction part 0.625 walks the fraction ladder (read down: 101); the joining strip mates them at the point as 11.101, checked by 2 + 1 + 0.5 + 0.125 = 3.625.', svg: cf36Mixed3625Svg() }] },
        { q: 'The honest investigation: run the fraction ladder on $0.1$ until you can prove it never terminates. State the repeating block, write the first twelve bits, and refute a friend’s claim that $0.1 = 0.0001_2$.', solution: [
          'Take $0.1$ and double: $0.1 \\times 2 = 0.2$ — bit $0$, keep $0.2$.',
          'Now, $0.2 \\times 2 = 0.4$ — bit $0$; $0.4 \\times 2 = 0.8$ — bit $0$.',
          'So, $0.8 \\times 2 = 1.6$ — bit $1$, keep $0.6$; $0.6 \\times 2 = 1.2$ — bit $1$, keep $0.2$.',
          'Observe: the fraction part is $0.2$ again — a state already visited, so the trail $0.1 \\to 0.2 \\to 0.4 \\to 0.8 \\to 0.6 \\to 0.2$ cycles forever.',
          'Hence $0.1 = 0.0\\overline{0011} = 0.0001100110011\\ldots$ — after one leading bit, the block $0011$ repeats forever; the first twelve bits are $000110011001$.',
          'Check the law: $\\frac{1}{10}$ in lowest terms has denominator $10 = 2 \\times 5$, not a power of two, so termination was impossible from the first rung.',
          'Now, the friend’s claim: $0.0001_2 = \\frac{1}{16} = 0.0625$, not $0.1$ — a weight check of four bits refutes it in one line.',
        ], answer: '$0.1 = 0.0\\overline{0011}_2 = 0.0001100110011\\ldots$, never terminating', figures: [{ caption: 'The ladder that never ends: the bits of 0.1 run 0001100110011 and onward with the block 0011 bracketed as repeating forever, while below, the fraction trail 0.1 to 0.2 to 0.4 to 0.8 to 0.6 closes its red dashed loop back to 0.2 — the proof, drawn.', svg: cf36Rep01Svg() }] },
      ] },
      { level: 'L4', questions: [
        { q: 'The ceilings (exam-style): state the largest value that fits in $8$, $12$ and $16$ bits, and the number of bits needed by $256$, $4096$ and $65{,}536$.', solution: [
          'Take the all-ones ceiling $2^n - 1$ and evaluate: 8 bits top out at $2^8 - 1 = 255$.',
          'So, 12 bits top out at $2^{12} - 1 = 4095$, and 16 bits at $2^{16} - 1 = 65{,}535$.',
          'Now, the bit counts, by the roll-over: $256 = 2^8$ is one past the 8-bit ceiling, so it needs $9$ bits.',
          'So, $4096 = 2^{12}$ needs $13$ bits, and $65{,}536 = 2^{16}$ needs $17$ bits.',
          'Hence the pattern: $2^k$ is always the first value that needs $k + 1$ bits — the roll-over witness in every width.',
        ], answer: '255, 4095 and 65,535; and 9, 13 and 17 bits respectively' },
        { q: 'Convert $255$ and $256$ to binary, and explain — in odometer language — exactly why the second answer is one digit longer.', solution: [
          'Take $255$: $255 \\div 2 = 127$ remainder $1$; $127 \\div 2 = 63$ remainder $1$; $63 \\div 2 = 31$ remainder $1$; $31 \\div 2 = 15$ remainder $1$; $15 \\div 2 = 7$ remainder $1$; $7 \\div 2 = 3$ remainder $1$; $3 \\div 2 = 1$ remainder $1$; $1 \\div 2 = 0$ remainder $1$.',
          'Read up: $255 = 11111111_2$ — eight rungs, every remainder $1$: the all-ones reading.',
          'Now, $256$: $256 \\div 2 = 128$ remainder $0$; the quotients $128, 64, 32, 16, 8, 4, 2, 1$ all divide evenly until $1 \\div 2 = 0$ remainder $1$.',
          'Read up: $256 = 100000000_2$ — nine digits: a leading $1$ and eight $0$s.',
          'Explain by the odometer: $255$ is the reading with every wheel at $1$ — the ceiling of eight wheels. Add $1$ and the carry ripples right to left, turning each $1$ into a $0$, and a ninth wheel lights up to catch the overflow — exactly as $999 + 1 = 1000$ rolls a three-digit odometer.',
          'Check by weights: $128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255$, and $256 = 2^8$ — the first value past the 8-bit ceiling.',
        ], answer: '$255 = 11111111_2$; $256 = 100000000_2$ — the roll-over' },
      ] },
    ] },

    /* __CF36_BLOCKS__ */
  ],
}

/* __CF36_TAIL__ */
