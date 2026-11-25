import type { Lesson } from '../../../src/data/library/types'

/**
 * PART-CF3R — lesson 3.R 'Unit 3 Completion Review' (the cf3R seat, CS
 * RUN 6, tag R3, 2026-11-25). The REVIEW seat of chapter 3 'Data
 * Representation: a First Meeting': one map, eight per-lesson recaps
 * grounded in the siblings' engine-pinned harvest numbers (carried
 * VERBATIM — the review invents no numbers), the synthesis
 * (representation is a choice with a price), the formula + vocabulary
 * harvest, a fifteen-question mixed bench spanning all eight lessons,
 * the forward door to chapter 4 'Inside the Box', and the exam corner.
 * Every number printed here is brute-forced green by v-cf3R.ts (the
 * chapter census + the bench answers + the final re-read block) BEFORE
 * this prose was written; where a draft disagreed, the engine's value
 * shipped.
 *
 * PROVENANCE: ground = the sanctioned web-verified arcs banked at
 * planning (citation key `cs-cf-web-ground`, docs/project/SOURCE_LOG.md).
 * STUDY-NEVER-REPRODUCE absolute: every figure, recap Illustration,
 * quiz item and exercise is OUR OWN. Historical notes are our own
 * honest retelling of documented events.
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
/* shared small helpers (tag R3 — every helper prefixed cf3R)           */
/* ------------------------------------------------------------------ */

/** one centred SVG text line */
function cf3RTxt(x: number, y: number, size: number, fill: string, text: string, weight = 'normal', anchor = 'middle'): string {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}">${text}</text>`
}

/** a rounded box */
function cf3RBox(x: number, y: number, w: number, h: number, fill: string, stroke: string, rx = 10): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
}

/** a straight arrow (line + head) */
function cf3RArrow(x1: number, y1: number, x2: number, y2: number, stroke: string, wd = 2): string {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  const hx = x2 - 7 * Math.cos(ang)
  const hy = y2 - 7 * Math.sin(ang)
  const p1x = x2 - 11 * Math.cos(ang) + 5 * Math.sin(ang)
  const p1y = y2 - 11 * Math.sin(ang) - 5 * Math.cos(ang)
  const p2x = x2 - 11 * Math.cos(ang) - 5 * Math.sin(ang)
  const p2y = y2 - 11 * Math.sin(ang) + 5 * Math.cos(ang)
  return `<line x1="${x1}" y1="${y1}" x2="${hx}" y2="${hy}" stroke="${stroke}" stroke-width="${wd}"/>` +
    `<polygon points="${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}" fill="${stroke}"/>`
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the chapter pipeline map                            */
/* the eight lessons as one flow: keystroke -> scan code -> code point  */
/* -> byte stream -> compressed file, plus the two conversion roads     */
/* ------------------------------------------------------------------ */

function cf3RPipelineSvg(): string {
  const W = 760
  const M = 16
  const nodeW = 128
  const railY = 58
  const nodeH = 46
  const gap = (W - 2 * M - 5 * nodeW) / 4
  const railMid = railY + nodeH / 2
  const chipY = railY + nodeH + 14
  const chipH = 34
  const leftW = 170
  const craftY = 186
  const craftH = 54
  const stripY = 290
  const stripH = 48
  const H = stripY + stripH + M

  const nodes = [
    { top: 'keystroke', sub: 'a finger falls' },
    { top: 'scan code', sub: 'a number arrives' },
    { top: 'code point', sub: 'a meaning agreed' },
    { top: 'byte stream', sub: '176,400 B/s' },
    { top: 'compressed file', sub: '11.025x smaller' },
  ]
  const chips = [
    { n: '3.1 the medium', t: 'two symbols carry all' },
    { n: '3.2 the dresses', t: 'binary - octal - hex' },
    { n: '3.3 the codes', t: 'ASCII - Unicode - BCD' },
    { n: '3.4 the media', t: 'the rate firehose' },
    { n: '3.5 the packing', t: 'lossless vs lossy' },
  ]

  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chapter 3 in one map: a pipeline of five artifact nodes running left to right (keystroke, scan code, code point, byte stream, compressed file), each carrying the lesson badge beneath it (3.1 the medium, 3.2 the dresses, 3.3 the codes, 3.4 the media, 3.5 the packing), and below them a craft panel with a decimal box on the left and a binary box on the right joined by two arcs: 3.6 the division ladder going down from decimal to binary, 3.7 the weight sum going up from binary to decimal, and a centre chip 3.8 the synthesis.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf3RTxt(W / 2, 26, 13, C.teal, 'chapter 3 in one map - a keystroke becomes a compressed file', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 10, C.tealInk, 'the artifact changes hands at every arrow; the eight lessons own the changes'))

  nodes.forEach((nd, i) => {
    const x = M + i * (nodeW + gap)
    const cx = x + nodeW / 2
    s.push(cf3RBox(x, railY, nodeW, nodeH, i % 2 === 0 ? C.white : C.paper, C.struct))
    s.push(cf3RTxt(cx, railY + 20, 12.5, C.ink, nd.top, 'bold'))
    s.push(cf3RTxt(cx, railY + 36, 9.5, C.tealInk, nd.sub))
    if (i < 4) s.push(cf3RArrow(x + nodeW + 2, railMid, x + nodeW + gap - 2, railMid, C.mid, 2.2))
    // the lesson chip directly beneath its artifact
    s.push(cf3RBox(x, chipY, nodeW, chipH, C.panelA, C.accent, 8))
    s.push(cf3RTxt(cx, chipY + 14, 9.5, C.ink, chips[i].n, 'bold'))
    s.push(cf3RTxt(cx, chipY + 27, 9, C.tealInk, chips[i].t))
    // drop a small tie from node to chip
    s.push(`<line x1="${cx}" y1="${railY + nodeH}" x2="${cx}" y2="${chipY}" stroke="${C.accent}" stroke-width="1.6"/>`)
  })

  // the divider
  s.push(`<line x1="${M}" y1="${chipY + chipH + 14}" x2="${W - M}" y2="${chipY + chipH + 14}" stroke="${C.faint}" stroke-width="2" stroke-dasharray="7 5"/>`)

  // the craft panel: decimal and binary, joined both ways, 3.8 between
  const lx = M
  const rx = W - M - leftW
  s.push(cf3RBox(lx, craftY, leftW, craftH, C.white, C.teal))
  s.push(cf3RTxt(lx + leftW / 2, craftY + 22, 13, C.ink, 'decimal', 'bold'))
  s.push(cf3RTxt(lx + leftW / 2, craftY + 41, 9.5, C.tealInk, 'the human\u2019s ten symbols'))
  s.push(cf3RBox(rx, craftY, leftW, craftH, C.white, C.teal))
  s.push(cf3RTxt(rx + leftW / 2, craftY + 22, 13, C.ink, 'binary', 'bold'))
  s.push(cf3RTxt(rx + leftW / 2, craftY + 41, 9.5, C.tealInk, 'the machine\u2019s two symbols'))

  const ax1 = lx + leftW + 6
  const ax2 = rx - 6
  const arcTop = `M ${ax1} ${craftY + 8} Q ${(ax1 + ax2) / 2} ${craftY - 34} ${ax2} ${craftY + 8}`
  s.push(`<path d="${arcTop}" fill="none" stroke="${C.conn}" stroke-width="2.4"/>`)
  s.push(`<polygon points="${ax2 + 2},${craftY + 8} ${ax2 - 8},${craftY + 3} ${ax2 - 6},${craftY + 13}" fill="${C.conn}"/>`)
  s.push(cf3RTxt((ax1 + ax2) / 2, craftY - 22, 10, C.conn, '3.6 the road down: the division ladder', 'bold'))
  const arcBot = `M ${ax2} ${craftY + craftH - 8} Q ${(ax1 + ax2) / 2} ${craftY + craftH + 34} ${ax1} ${craftY + craftH - 8}`
  s.push(`<path d="${arcBot}" fill="none" stroke="${C.teal}" stroke-width="2.4"/>`)
  s.push(`<polygon points="${ax1 - 2},${craftY + craftH - 8} ${ax1 + 8},${craftY + craftH - 3} ${ax1 + 6},${craftY + craftH - 13}" fill="${C.teal}"/>`)
  s.push(cf3RTxt((ax1 + ax2) / 2, craftY + craftH + 26, 10, C.tealInk, '3.7 the road up: the weight sum and the doubling ladder', 'bold'))

  const chip8W = 150
  const chip8X = W / 2 - chip8W / 2
  const chip8Y = craftY + 18
  s.push(cf3RBox(chip8X, chip8Y, chip8W, 30, C.panelB, C.mid, 8))
  s.push(cf3RTxt(W / 2, chip8Y + 13, 9.5, C.ink, '3.8 the synthesis', 'bold'))
  s.push(cf3RTxt(W / 2, chip8Y + 25, 9, C.tealInk, 'one idea, two alphabets'))

  // the closing strip
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, C.paper, C.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 20, 10.5, C.ink, 'this chapter gave the machine its LANGUAGE - chapter 4 asks how the box SPEAKS it', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 38, 9.5, C.tealInk, 'bits to dresses to meanings to rates to packing - with two roads between the human and the machine'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the harvest ladder (the powers thread)              */
/* ------------------------------------------------------------------ */

function cf3RPowersSvg(): string {
  const W = 760
  const M = 24
  const baseY = 250
  const colW = 160
  const gap = 24
  const x0 = (W - (4 * colW + 3 * gap)) / 2
  const stripY = baseY + 56
  const stripH = 56
  const H = stripY + stripH + M
  const bars = [
    { ex: '2^7', val: '128', w1: 'ASCII', w2: '33 + 95 codes', h: 60 },
    { ex: '2^8', val: '256', w1: 'the byte', w2: 'two hex digits fill it', h: 100 },
    { ex: '2^16', val: '65,536', w1: 'a Unicode plane', w2: 'one of seventeen', h: 140 },
    { ex: '2^20', val: '1,048,576', w1: 'one MiB', w2: 'sorts a million', h: 180 },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The harvest ladder: four rising bars for the powers of two the chapter leans on - 2 to the 7 equals 128 labelled ASCII with 33 plus 95 codes, 2 to the 8 equals 256 labelled the byte, 2 to the 16 equals 65,536 labelled a Unicode plane, 2 to the 20 equals 1,048,576 labelled one MiB that sorts a million. A note strip adds the honest ladder: KiB +2.40 percent, MiB +4.86, GiB +7.37, TiB +9.95.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf3RTxt(W / 2, 26, 13, C.teal, 'the harvest ladder - the powers thread the whole chapter leans on', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 10, C.tealInk, 'every rung doubles the census: four pinned powers, four witnesses'))
  // the baseline
  s.push(`<line x1="${M}" y1="${baseY}" x2="${W - M}" y2="${baseY}" stroke="${C.ink}" stroke-width="2"/>`)
  bars.forEach((b, i) => {
    const x = x0 + i * (colW + gap)
    const top = baseY - b.h
    s.push(cf3RBox(x, top, colW, b.h, i % 2 === 0 ? C.panelA : C.panelB, C.struct, 6))
    s.push(cf3RTxt(x + colW / 2, top - 10, 12.5, C.teal, b.ex, 'bold'))
    s.push(cf3RTxt(x + colW / 2, top + b.h / 2 + 7, 19, C.ink, b.val, 'bold'))
    s.push(cf3RTxt(x + colW / 2, baseY + 22, 10, C.ink, b.w1, 'bold'))
    s.push(cf3RTxt(x + colW / 2, baseY + 38, 9.5, C.tealInk, b.w2))
  })
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, C.paper, C.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 22, 10.5, C.ink, 'one MiB = 1,048,576 B > 1,000,000: twenty yes/no questions sort a million-item catalogue', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 42, 9.5, C.tealInk, 'the honest ladder to 2 dp: KiB +2.40%, MiB +4.86%, GiB +7.37%, TiB +9.95% over the decimal rivals'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — the rate thread (CD bytes -> bits -> the MP3 save)  */
/* ------------------------------------------------------------------ */

function cf3RRateSvg(): string {
  const W = 760
  const M = 20
  const boxW = 210
  const boxH = 72
  const boxY = 78
  const gap = (W - 2 * M - 3 * boxW) / 2
  const noteY = boxY + boxH + 22
  const stripY = noteY + 18
  const stripH = 64
  const H = stripY + stripH + M
  const boxes = [
    { l1: 'CD stereo', l2: '44,100 \u00d7 2 B \u00d7 2 ch', l3: '= 176,400 B/s' },
    { l1: 'the bit rate', l2: '176,400 \u00d7 8', l3: '= 1,411,200 bit/s' },
    { l1: 'MP3 at 128 kbit/s', l2: '1,411,200 \u00f7 128,000', l3: '= 11.025x smaller' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The rate thread: three chained boxes - CD stereo at 44,100 samples per second times 2 bytes times 2 channels equals 176,400 bytes per second; times 8 bits per byte gives 1,411,200 bits per second; divided by the MP3 rate of 128,000 gives 11.025 times smaller. Notes add that 44,100 equals 294 times 50 times 3, that dividing by 320,000 gives 4.41 times, and that 74 minutes of CD stereo is 746.9330 MiB.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf3RTxt(W / 2, 26, 13, C.teal, 'the rate thread - from a CD\u2019s byte rate to an MP3\u2019s saving', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 10, C.tealInk, 'one multiplication and two divisions: the whole of lesson 3.4 and lesson 3.5\u2019s headline'))
  boxes.forEach((b, i) => {
    const x = M + i * (boxW + gap)
    s.push(cf3RBox(x, boxY, boxW, boxH, i === 1 ? C.panelB : C.white, C.struct))
    s.push(cf3RTxt(x + boxW / 2, boxY + 18, 11.5, C.ink, b.l1, 'bold'))
    s.push(cf3RTxt(x + boxW / 2, boxY + 38, 10, C.tealInk, b.l2))
    s.push(cf3RTxt(x + boxW / 2, boxY + 58, 11.5, C.accent, b.l3, 'bold'))
    if (i < 2) {
      const midY = boxY + boxH / 2
      s.push(cf3RArrow(x + boxW + 3, midY, x + boxW + gap - 3, midY, C.conn, 2.4))
      s.push(cf3RTxt(x + boxW + gap / 2, midY - 10, 10.5, C.conn, i === 0 ? '\u00d7 8' : '\u00f7 128,000', 'bold'))
      s.push(cf3RTxt(x + boxW + gap / 2, midY + 18, 9, C.tealInk, i === 0 ? 'bits per byte' : 'the MP3 rate'))
    }
  })
  s.push(cf3RTxt(W / 2, noteY, 9.5, C.tealInk, 'the rate\u2019s own story: 44,100 = 294 \u00d7 50 \u00d7 3 (lines per picture \u00d7 pictures per second \u00d7 the three NTSC colour channels) - and \u00f7 320,000 = 4.41x at MP3\u2019s top rate'))
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, C.paper, C.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 24, 10.5, C.ink, '74 minutes of CD stereo = 4,440 s \u00d7 176,400 B/s = 783,216,000 B = 746.9330 MiB', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 46, 9.5, C.tealInk, 'one 1080p RGB frame = 1920 \u00d7 1080 \u00d7 3 B = 6,220,800 B - the firehose that compression answers'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the four-dress 45 finale strip                      */
/* ------------------------------------------------------------------ */

function cf3RFinaleSvg(): string {
  const W = 760
  const M = 24
  const panW = 160
  const panH = 112
  const panY = 58
  const gap = (W - 2 * M - 4 * panW) / 3
  const stripY = panY + panH + 16
  const stripH = 46
  const H = stripY + stripH + M
  const pans = [
    { base: 'base 10', num: '45', w: '4 \u00d7 10 + 5', eq: '= 45' },
    { base: 'base 2', num: '101101', w: '32 + 8 + 4 + 1', eq: '= 45' },
    { base: 'base 8', num: '55', w: '5 \u00d7 8 + 5', eq: '= 45' },
    { base: 'base 16', num: '2D', w: '2 \u00d7 16 + 13', eq: '= 45' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The four-dress 45 finale strip: four panels - 45 in base 10 with weight 4 times 10 plus 5; 101101 in base 2 with weights 32 plus 8 plus 4 plus 1; 55 in base 8 with weights 5 times 8 plus 5; 2D in base 16 with weights 2 times 16 plus 13 - each summing to 45. A note strip states the grouping law: one octal digit is 3 bits, one hex digit is 4 bits, and 2D spreads to 0010 1101.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf3RTxt(W / 2, 26, 13, C.teal, 'the 45 witness - one value, four dresses, the chapter\u2019s souvenir', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 10, C.tealInk, 'every dress re-reads the same positional sum; nothing about the value changes'))
  pans.forEach((p, i) => {
    const x = M + i * (panW + gap)
    s.push(cf3RBox(x, panY, panW, panH, i % 2 === 0 ? C.white : C.paper, C.struct))
    s.push(cf3RTxt(x + panW / 2, panY + 22, 10.5, C.tealInk, p.base, 'bold'))
    s.push(cf3RTxt(x + panW / 2, panY + 56, 24, C.ink, p.num, 'bold'))
    s.push(cf3RTxt(x + panW / 2, panY + 82, 9.5, C.tealInk, p.w))
    s.push(cf3RTxt(x + panW / 2, panY + 100, 10.5, C.accent, p.eq, 'bold'))
  })
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, C.panelA, C.accent, 8))
  s.push(cf3RTxt(W / 2, stripY + 19, 10.5, C.ink, 'the grouping law: one octal digit = 3 bits, one hex digit = 4 bits', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 37, 9.5, C.tealInk, '2D spreads to 0010 1101 - the same six bits, regrouped; 101101 groups in threes to 55'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S1 — the 45 division ladder (bench Q5)              */
/* ------------------------------------------------------------------ */

function cf3RLadderSvg(): string {
  const W = 720
  const M = 24
  const topY = 68
  const rowH = 40
  const gap = 12
  const rows = [
    { n: 45, q: 22, r: 1 }, { n: 22, q: 11, r: 0 }, { n: 11, q: 5, r: 1 },
    { n: 5, q: 2, r: 1 }, { n: 2, q: 1, r: 0 }, { n: 1, q: 0, r: 1 },
  ]
  const n = rows.length
  const span = n * rowH + (n - 1) * gap
  const boxX = M
  const boxW = 290
  const badgeX = 350
  const badgeR = 16
  const readX = 396
  const labelX = 418
  const ansX = 448
  const ansW = W - M - ansX
  const stripY = topY + span + 16
  const stripH = 52
  const H = stripY + stripH + M
  const firstCy = topY + rowH / 2
  const lastCy = topY + span - rowH / 2

  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The division ladder converting 45 to binary. Six rungs: 45 divided by 2 equals 22 remainder 1; 22 divided by 2 equals 11 remainder 0; 11 divided by 2 equals 5 remainder 1; 5 divided by 2 equals 2 remainder 1; 2 divided by 2 equals 1 remainder 0; 1 divided by 2 equals 0 remainder 1. An arrow labelled read bottom-up travels up the remainder column to the answer 101101 in base 2; a check strip confirms 32 plus 8 plus 4 plus 1 equals 45.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf3RTxt(W / 2, 30, 12.5, C.teal, 'the 45 ladder - six rungs, read bottom-up', 'bold'))
  s.push(cf3RTxt(W / 2, 48, 9.5, C.tealInk, 'divide by 2, keep the remainder, repeat on the quotient until it reaches 0'))
  s.push(cf3RTxt(boxX + boxW / 2, 62, 9.5, C.tealInk, 'the rungs'))
  s.push(cf3RTxt(badgeX, 62, 9.5, C.tealInk, 'remainders'))
  rows.forEach((rw, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(cf3RBox(boxX, by, boxW, rowH, C.white, C.struct, 8))
    s.push(cf3RTxt(boxX + boxW / 2, cy + 5, 13.5, C.ink, `${rw.n} \u00f7 2 = ${rw.q}`))
    s.push(`<circle cx="${badgeX}" cy="${cy}" r="${badgeR}" fill="${rw.r === 0 ? C.white : C.panelA}" stroke="${rw.r === 0 ? C.teal : C.accent}" stroke-width="2"/>`)
    s.push(cf3RTxt(badgeX, cy + 5.5, 14, C.ink, String(rw.r), 'bold'))
    if (k < n - 1) {
      const ax = boxX + boxW / 2
      s.push(cf3RArrow(ax, by + rowH + 1, ax, by + rowH + gap - 1, C.mid, 1.8))
    }
  })
  s.push(cf3RArrow(readX, lastCy, readX, firstCy - 6, C.conn, 2.4))
  const midY = (firstCy + lastCy) / 2
  s.push(`<text x="${labelX}" y="${midY}" transform="rotate(-90 ${labelX} ${midY})" text-anchor="middle" font-size="9.5" fill="${C.tealInk}">read bottom-up</text>`)
  s.push(cf3RBox(ansX, topY, ansW, 56, C.panelB, C.mid, 12))
  s.push(cf3RTxt(ansX + ansW / 2, topY + 22, 10, C.tealInk, '45 in base 2'))
  s.push(cf3RTxt(ansX + ansW / 2, topY + 45, 19, C.ink, '101101', 'bold'))
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, C.paper, C.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 21, 11, C.ink, 'check by weights: 101101 = 32 + 8 + 4 + 1 = 45', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 40, 9.5, C.tealInk, 'six rungs = six bits; the first remainder is the units bit, the last is the leading bit'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S2 — the Huffman tree for {A:5, B:2, C:1, D:1}      */
/* ------------------------------------------------------------------ */

function cf3RHuffSvg(): string {
  const W = 760
  const M = 24
  const R = 18
  const nodes = {
    root: { x: 140, y: 78, w: '9' },
    A: { x: 58, y: 168, w: '5' },
    BCD: { x: 250, y: 168, w: '4' },
    B: { x: 185, y: 258, w: '2' },
    CD: { x: 330, y: 258, w: '2' },
    C: { x: 275, y: 348, w: '1' },
    D: { x: 395, y: 348, w: '1' },
  }
  const edges = [
    { a: nodes.root, b: nodes.A, lab: '0' },
    { a: nodes.root, b: nodes.BCD, lab: '1' },
    { a: nodes.BCD, b: nodes.B, lab: '0' },
    { a: nodes.BCD, b: nodes.CD, lab: '1' },
    { a: nodes.CD, b: nodes.C, lab: '0' },
    { a: nodes.CD, b: nodes.D, lab: '1' },
  ]
  const panelX = 452
  const panelW = W - M - panelX
  const panelY = 62
  const panelH = 236
  const stripY = 398
  const stripH = 52
  const H = stripY + stripH + M

  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Huffman tree for frequencies A five, B two, C one, D one. The root of weight 9 splits into leaf A of weight 5 with edge label 0 and an internal node of weight 4 with edge label 1; the 4-node splits into leaf B weight 2 with label 0 and an internal node of weight 2 with label 1; that node splits into leaves C weight 1 and D weight 1 with labels 0 and 1. A side panel lists the codes A equals 0, B equals 10, C equals 110, D equals 111 and the message count 15 bits against 18 fixed, with the entropy floor 1.6577427 bits per symbol.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf3RTxt(W / 2, 28, 12.5, C.teal, 'the Huffman tree for {A:5, B:2, C:1, D:1} - depths 1, 2, 3, 3', 'bold'))
  edges.forEach((e) => {
    s.push(`<line x1="${e.a.x}" y1="${e.a.y}" x2="${e.b.x}" y2="${e.b.y}" stroke="${C.mid}" stroke-width="2"/>`)
    const lx = (e.a.x + e.b.x) / 2 + (e.lab === '0' ? -12 : 12)
    const ly = (e.a.y + e.b.y) / 2 + 4
    s.push(cf3RTxt(lx, ly, 11, C.conn, e.lab, 'bold'))
  })
  const leaf = (nd: { x: number; y: number; w: string }, letter: string) => {
    s.push(`<circle cx="${nd.x}" cy="${nd.y}" r="${R}" fill="${C.white}" stroke="${C.struct}" stroke-width="2.4"/>`)
    s.push(cf3RTxt(nd.x, nd.y + 5, 12.5, C.ink, nd.w, 'bold'))
    s.push(cf3RTxt(nd.x, nd.y + R + 15, 12, C.accent, letter, 'bold'))
  }
  const inner = (nd: { x: number; y: number; w: string }) => {
    s.push(`<circle cx="${nd.x}" cy="${nd.y}" r="${R}" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2.4"/>`)
    s.push(cf3RTxt(nd.x, nd.y + 5, 12.5, C.ink, nd.w, 'bold'))
  }
  inner(nodes.root)
  inner(nodes.BCD)
  inner(nodes.CD)
  leaf(nodes.A, 'A')
  leaf(nodes.B, 'B')
  leaf(nodes.C, 'C')
  leaf(nodes.D, 'D')
  s.push(cf3RTxt(nodes.root.x, nodes.root.y - R - 8, 9.5, C.tealInk, 'the root: weight 9'))

  s.push(cf3RBox(panelX, panelY, panelW, panelH, C.paper, C.faint, 10))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 22, 11, C.ink, 'the code, read off the tree', 'bold'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 46, 11, C.ink, 'A = 0 (1 bit)'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 66, 11, C.ink, 'B = 10 (2 bits)'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 86, 11, C.ink, 'C = 110 (3 bits)'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 106, 11, C.ink, 'D = 111 (3 bits)'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 132, 10, C.tealInk, 'AAAAABBCD = 000001010110111'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 152, 10, C.tealInk, '5\u00d71 + 2\u00d72 + 1\u00d73 + 1\u00d73 = 15 bits'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 172, 10, C.tealInk, 'the fixed 2-bit code: 9 \u00d7 2 = 18 bits'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 192, 10, C.accent, 'the saving: 3 bits = 16.67%', 'bold'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 212, 10, C.accent, 'the ratio: 18/15 = 1.2x', 'bold'))
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, C.panelA, C.accent, 8))
  s.push(cf3RTxt(W / 2, stripY + 21, 11, C.ink, 'the entropy floor: H = 1.6577427 bits/symbol; the code averages 15/9 = 1.6667', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 40, 9.5, C.tealInk, 'no prefix of any code word is another code word - the tree guarantees it, so decoding never hesitates'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S3 — the 90-second census strip (bench Q11)         */
/* ------------------------------------------------------------------ */

function cf3RCensusSvg(): string {
  const W = 760
  const M = 20
  const boxW = 210
  const boxH = 76
  const boxY = 64
  const gap = (W - 2 * M - 3 * boxW) / 2
  const stripY = boxY + boxH + 20
  const stripH = 64
  const H = stripY + stripH + M
  const boxes = [
    { l1: 'the rate', l2: '44,100 \u00d7 2 B \u00d7 2 ch', l3: '= 176,400 B/s' },
    { l1: 'the clip', l2: '176,400 \u00d7 90 s', l3: '= 15,876,000 B' },
    { l1: 'the honest MiB', l2: '15,876,000 \u00f7 1,048,576', l3: '= 15.1405 MiB' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The 90-second census: three chained boxes - the CD rate 44,100 samples per second times 2 bytes times 2 channels equals 176,400 bytes per second; times 90 seconds equals 15,876,000 bytes; divided by one MiB of 1,048,576 bytes equals 15.1405 MiB. A note strip adds the exact value 15.140533447265625 and that one minute would be 10,584,000 bytes.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf3RTxt(W / 2, 26, 12.5, C.teal, 'the 90-second census - a stereo CD clip, priced honestly', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 9.5, C.tealInk, 'the rate law, then the clock, then the honest binary units'))
  boxes.forEach((b, i) => {
    const x = M + i * (boxW + gap)
    s.push(cf3RBox(x, boxY, boxW, boxH, i === 2 ? C.panelB : C.white, C.struct))
    s.push(cf3RTxt(x + boxW / 2, boxY + 19, 11.5, C.ink, b.l1, 'bold'))
    s.push(cf3RTxt(x + boxW / 2, boxY + 40, 10, C.tealInk, b.l2))
    s.push(cf3RTxt(x + boxW / 2, boxY + 61, 11.5, C.accent, b.l3, 'bold'))
    if (i < 2) {
      const midY = boxY + boxH / 2
      s.push(cf3RArrow(x + boxW + 3, midY, x + boxW + gap - 3, midY, C.conn, 2.4))
      s.push(cf3RTxt(x + boxW + gap / 2, midY - 10, 10.5, C.conn, i === 0 ? '\u00d7 90' : '\u00f7 2^20', 'bold'))
      s.push(cf3RTxt(x + boxW + gap / 2, midY + 18, 9, C.tealInk, i === 0 ? 'the clip length' : 'one MiB'))
    }
  })
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, C.paper, C.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 24, 10.5, C.ink, 'exactly 15.140533447265625 MiB, printed to 4 dp as 15.1405 - the decimal mega (10^6 B) is the wrong unit', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 46, 9.5, C.tealInk, 'one minute would be 10,584,000 B; ninety seconds is one-and-a-half of those, and the arithmetic shows it'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S4 — the 2026 grouped read (bench Q12)              */
/* ------------------------------------------------------------------ */

function cf3RGroupSvg(): string {
  const W = 760
  const M = 24
  const cw = 34
  const cgap = 6
  const bits = '11111101010'
  const cellY = 60
  const cellH = 38
  const x0 = M
  const cellX = (i: number) => x0 + i * (cw + cgap)
  const cellsEnd = cellX(bits.length - 1) + cw
  const panelX = cellsEnd + 20
  const panelW = W - M - panelX
  const panelY = 60
  const panelH = 176
  const stripY = 246
  const stripH = 50
  const H = stripY + stripH + M

  const hexGroups = [
    { from: 0, to: 2, lab: '111 = 7' },
    { from: 3, to: 6, lab: '1110 = E (14)' },
    { from: 7, to: 10, lab: '1010 = A (10)' },
  ]
  const octGroups = [
    { from: 0, to: 1, lab: '11 = 3' },
    { from: 2, to: 4, lab: '111 = 7' },
    { from: 5, to: 7, lab: '101 = 5' },
    { from: 8, to: 10, lab: '010 = 2' },
  ]

  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The 2026 witness regrouped two ways. Eleven bit cells read 11111101010. Brackets in fours from the right give groups 111, 1110 and 1010 valued 7, 14 and 10, spelling 7EA in base 16; brackets in threes give groups 11, 111, 101 and 010 valued 3, 7, 5 and 2, spelling 3752 in base 8. A side panel checks the weights 1024 plus 512 plus 256 plus 128 plus 64 plus 32 plus 8 plus 2 equals 2026.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf3RTxt(W / 2, 26, 12.5, C.teal, 'the 2026 witness - eleven bits, regrouped two ways', 'bold'))
  s.push(cf3RTxt(W / 2, 46, 9.5, C.tealInk, 'grouping is re-bracketing: fours for hexadecimal, threes for octal'))
  for (let i = 0; i < bits.length; i++) {
    s.push(cf3RBox(cellX(i), cellY, cw, cellH, C.white, C.struct, 6))
    s.push(cf3RTxt(cellX(i) + cw / 2, cellY + 25, 15, C.ink, bits[i], 'bold'))
  }
  // hex brackets
  hexGroups.forEach((g) => {
    const gx = cellX(g.from)
    const gw = cellX(g.to) + cw - gx
    s.push(`<path d="M ${gx} ${cellY + cellH + 4} v 6 h ${gw} v -6" fill="none" stroke="${C.conn}" stroke-width="2"/>`)
    s.push(cf3RTxt(gx + gw / 2, cellY + cellH + 28, 10, C.conn, g.lab, 'bold'))
  })
  s.push(cf3RTxt(x0 + (cellsEnd - x0) / 2, cellY + cellH + 48, 11, C.ink, 'read left to right: 7 EA \u2192 7EA in base 16', 'bold'))
  // octal brackets
  const octY = cellY + cellH + 66
  octGroups.forEach((g) => {
    const gx = cellX(g.from)
    const gw = cellX(g.to) + cw - gx
    s.push(`<path d="M ${gx} ${octY + 4} v 6 h ${gw} v -6" fill="none" stroke="${C.teal}" stroke-width="2"/>`)
    s.push(cf3RTxt(gx + gw / 2, octY + 28, 10, C.tealInk, g.lab, 'bold'))
  })
  s.push(cf3RTxt(x0 + (cellsEnd - x0) / 2, octY + 48, 11, C.ink, 'read left to right: 3752 in base 8', 'bold'))
  // the weight panel
  s.push(cf3RBox(panelX, panelY, panelW, panelH, C.paper, C.faint, 10))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 24, 11, C.ink, 'the weight check', 'bold'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 48, 10.5, C.tealInk, '1024 + 512 + 256 + 128'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 66, 10.5, C.tealInk, '+ 64 + 32 + 8 + 2 = 2026'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 92, 10.5, C.accent, 'the width: 2^10 \u2264 2026 < 2^11', 'bold'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 114, 10, C.tealInk, 'eleven bits, exactly as the ladder produced'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 136, 10, C.tealInk, 'three dresses, one value - the chapter\u2019s method'))
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, C.panelA, C.accent, 8))
  s.push(cf3RTxt(W / 2, stripY + 20, 11, C.ink, 'one bit string, three dresses: 11111101010 (base 2) = 3752 (base 8) = 7EA (base 16)', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 39, 9.5, C.tealInk, 'the ladder down, the weights up, the groupings across - every road closes at 2026'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S5 — the two-lesson chain strip (bench Q13)         */
/* ------------------------------------------------------------------ */

function cf3RChainSvg(): string {
  const W = 760
  const M = 24
  const topW = 200
  const topX = W / 2 - topW / 2
  const topY = 58
  const topH = 44
  const byteW = 120
  const byteH = 40
  const byteY = 140
  const lx = 170
  const rx = 590
  const decW = 150
  const decY = 208
  const decH = 44
  const meanW = 190
  const meanY = 280
  const meanH = 64
  const stripY = 364
  const stripH = 50
  const H = stripY + stripH + M

  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The two-lesson chain: a 16-bit colour code 4120 in hex at the top splits into two bytes, 41 and 20; each converts to decimal, 4 times 16 plus 1 equals 65 and 2 times 16 plus 0 equals 32; the meanings follow - ASCII 65 is the letter A, and ASCII 32 is the space, which is also the case gap a minus A equals 32, the fifth bit.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf3RTxt(W / 2, 26, 12.5, C.teal, 'the two-lesson chain - a 16-bit colour code, read through two books', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 9.5, C.tealInk, 'hexadecimal in (lesson 3.2), decimal channels, then the ASCII table (lesson 3.3)'))
  s.push(cf3RBox(topX, topY, topW, topH, C.panelB, C.mid, 10))
  s.push(cf3RTxt(W / 2, topY + 18, 10.5, C.tealInk, 'the colour code'))
  s.push(cf3RTxt(W / 2, topY + 36, 13, C.ink, '4120 in hex', 'bold'))
  s.push(cf3RArrow(W / 2 - 50, topY + topH + 2, lx, byteY - 2, C.conn, 2))
  s.push(cf3RArrow(W / 2 + 50, topY + topH + 2, rx, byteY - 2, C.conn, 2))
  s.push(cf3RBox(lx - byteW / 2, byteY, byteW, byteH, C.white, C.struct))
  s.push(cf3RTxt(lx, byteY + 25, 13, C.ink, 'byte 41', 'bold'))
  s.push(cf3RBox(rx - byteW / 2, byteY, byteW, byteH, C.white, C.struct))
  s.push(cf3RTxt(rx, byteY + 25, 13, C.ink, 'byte 20', 'bold'))
  s.push(cf3RArrow(lx, byteY + byteH + 2, lx, decY - 2, C.mid, 2))
  s.push(cf3RArrow(rx, byteY + byteH + 2, rx, decY - 2, C.mid, 2))
  s.push(cf3RBox(lx - decW / 2, decY, decW, decH, C.panelA, C.accent, 10))
  s.push(cf3RTxt(lx, decY + 27, 11.5, C.ink, '4 \u00d7 16 + 1 = 65', 'bold'))
  s.push(cf3RBox(rx - decW / 2, decY, decW, decH, C.panelA, C.accent, 10))
  s.push(cf3RTxt(rx, decY + 27, 11.5, C.ink, '2 \u00d7 16 + 0 = 32', 'bold'))
  s.push(cf3RArrow(lx, decY + decH + 2, lx, meanY - 2, C.teal, 2))
  s.push(cf3RArrow(rx, decY + decH + 2, rx, meanY - 2, C.teal, 2))
  s.push(cf3RBox(lx - meanW / 2, meanY, meanW, meanH, C.white, C.teal, 10))
  s.push(cf3RTxt(lx, meanY + 24, 11.5, C.ink, 'ASCII 65 = A', 'bold'))
  s.push(cf3RTxt(lx, meanY + 45, 9.5, C.tealInk, 'the letter, bit 5 clear'))
  s.push(cf3RBox(rx - meanW / 2, meanY, meanW, meanH, C.white, C.teal, 10))
  s.push(cf3RTxt(rx, meanY + 24, 11.5, C.ink, 'ASCII 32 = space', 'bold'))
  s.push(cf3RTxt(rx, meanY + 45, 9.5, C.tealInk, 'and a - A = 32 = bit 5'))
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, C.paper, C.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 20, 10.5, C.ink, 'one hex read feeds the code table: 65 is A, 32 is space - and the case gap is exactly the fifth bit', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 39, 9.5, C.tealInk, 'two lessons, one uninterrupted chain - the bench asks you to run it without putting the pencil down'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* the lesson                                                           */
/* ------------------------------------------------------------------ */

export const lesson3R: Lesson = {
  id: 'cf-unit-3-completion-review',
  number: '3.R',
  title: 'Unit 3 Completion Review',
  concepts: [
    'the chapter in one map: the representation pipeline from keystroke to compressed file',
    'the eight lesson recaps, grounded in the engine-pinned harvest numbers',
    'representation as a choice with a price: alphabet, code, sampling rate, compression knob',
    'the two souvenirs: the 45 witness and the 2026 witness',
    'the formula and vocabulary harvest of the chapter',
    'the mixed bench: fifteen exam-style questions across all eight lessons',
    'the forward door: Inside the Box - how the machine speaks the language it was given',
  ],
  objectives: [
    'By the end of this lesson you can redraw the chapter\u2019s one map - the pipeline from keystroke to scan code to code point to byte stream to compressed file, with the two conversion roads beneath - from memory.',
    'By the end of this lesson you can restate the chapter\u2019s engine-pinned censuses cold: the powers thread, the 45 and 2026 witnesses, the codes census, the CD rate, and the Huffman saving.',
    'By the end of this lesson you can chain two lessons in one move - a hexadecimal colour code to decimal channel values to ASCII arithmetic - without putting the pencil down.',
    'By the end of this lesson you can price any representation choice with arithmetic: bits needed, bytes per second, mebibytes, compression ratio.',
    'By the end of this lesson you can walk through the forward door: name what chapter 4 asks of the box, and say what this chapter handed it.',
  ],
  prerequisites: [
    'cf-bits-why-two-symbols-carry-everything',
    'cf-the-numbering-systems-binary-octal-hexadecimal',
    'cf-codes-ascii-unicode-and-bcd',
    'cf-text-images-and-sound-as-bits',
    'cf-compression-lossless-and-lossy',
    'cf-decimal-to-binary-conversion',
    'cf-binary-to-decimal-conversion',
    'cf-decimal-and-binary-number-system',
  ],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ---------- the opening ----------
    { kind: 'para', text: 'Eight lessons ago this chapter owned nothing but a question: what does it *mean* that a computer only ever holds two symbols? Lesson 3.1, \u2018Bits: Why Two Symbols Carry Everything\u2019, answered with the census law and the name *bit*. Lesson 3.2, \u2018The Numbering Systems: Binary, Octal, Hexadecimal\u2019, dressed the same values in three machine alphabets. Lesson 3.3, \u2018Codes: ASCII, Unicode and BCD\u2019, made the patterns *mean* things - letters, digits, rupees. Lesson 3.4, \u2018Text, Images and Sound as Bits\u2019, priced the firehose: how many numbers, how fast. Lesson 3.5, \u2018Compression: Lossless and Lossy\u2019, asked which bytes could be packed away and whether they could come back. Lessons 3.6 and 3.7 built the two conversion roads between the human\u2019s ten symbols and the machine\u2019s two, and lesson 3.8, \u2018Decimal and Binary Number System\u2019, set the two systems side by side as one positional idea. Eight lessons plus this review: the chapter ships as $8 + 1 = 9$ seats. This review\u2019s job is twofold, exactly as the unit reviews of chapters 1 and 2 were twofold: first put the whole chapter back together in ONE map you can redraw from memory, and then make you USE it on a mixed bench - because a chapter that cannot be used was never learned. Every number below was engine-pinned before this prose was written; the review invents nothing, it restates the chapter at bench speed.' },

    // ---------- the one map ----------
    { kind: 'heading', text: 'The Chapter in One Map' },
    { kind: 'figure', caption: 'The chapter in one map: the representation pipeline - a keystroke lands as a scan code (3.1\u2019s two symbols), the pattern wears its dresses (3.2: binary, octal, hex), the pattern means a character (3.3\u2019s code tables), the patterns stream as media (3.4: 176,400 B/s), and the stream packs smaller (3.5: 11.025x) - while beneath the rail the two conversion roads of 3.6 and 3.7 run between the decimal world and the binary world, joined at 3.8\u2019s synthesis: one positional idea, two alphabets.', svg: cf3RPipelineSvg() },
    { kind: 'para', text: 'Read the map the way it is drawn, left to right along the top rail. A finger falls on a key: the **keystroke**. The keyboard\u2019s answer is a **scan code** - a number, arriving whole - and that arrival is lesson 3.1\u2019s whole point: two symbols, cleverly arranged, carry everything, because $n$ bits name $2^n$ patterns and the exponents run away fast. The scan code is a bit pattern, and patterns can be *regrouped*: lesson 3.2\u2019s dresses, binary and octal and hexadecimal, are the same value in three notations - the four-dress witness $45 = 101101_2 = 55_8 = 2D_{16}$ lives on that rail. Software then looks the number up in a table and hands you a **code point** - lesson 3.3\u2019s contract, ASCII\u2019s 128 codes, Unicode\u2019s 1,114,112, BCD\u2019s honest waste. Text, images and sound then stream as **byte streams** at rates lesson 3.4 priced with one formula - a CD\u2019s 176,400 B/s, a 1080p frame\u2019s 6,220,800 B. And because the firehose is too fat to ship, lesson 3.5 packs it: the **compressed file**, lossless or lossy, an MP3 at 11.025x smaller than the CD stream. Beneath the rail run the two roads the human walks constantly: 3.6\u2019s division ladder going *down* from decimal to binary, 3.7\u2019s weight sum and doubling ladder coming back *up*, with 3.8 standing between them insisting - correctly - that decimal and binary are one machine wearing different alphabets.' },
    { kind: 'callout', tone: 'definition', title: 'The representation pipeline, defined once', text: 'The representation pipeline is said to be the chapter\u2019s own thread: a physical act becomes a **bit pattern** (3.1), the pattern is **regrouped** for human convenience in bases 8 and 16 (3.2), the pattern is **interpreted** as a character through an agreed table (3.3), the interpreted patterns **stream** as text, image and sound at computable rates (3.4), and the stream is **packed** losslessly or lossily for storage and transmission (3.5) - with the two conversion roads (3.6, 3.7) carrying the human between decimal and binary, and the positional theorem (3.8) underneath all of it. Every stage is a CHOICE with a PRICE, and the chapter\u2019s method has been the same at every stage: name the choice, count the price.' },

    // ================================================================
    // 2. THE EIGHT PER-LESSON RECAPS (the siblings' pinned numbers,
    //    carried verbatim - the review invents no numbers)
    // ================================================================
    { kind: 'heading', text: 'Lesson 3.1 Recap: Why Two Symbols Carry Everything' },
    { kind: 'para', text: 'Lesson 3.1 asked the chapter\u2019s founding question: why does the machine get away with an alphabet of exactly two symbols? The answer was the **census law** - $n$ bits name $2^n$ patterns - watched through the exponents running away from ten fingers. The harvest was threefold. First, the twenty-questions miracle: $2^{20} = 1{,}048{,}576$, which is why twenty honest yes/no questions sort a million-item catalogue - 1,048,576 covers a million with 48,576 spare rooms. Second, the honest ladder: because $2^{10} = 1{,}024$ is not $1{,}000$, every binary prefix sits above its decimal rival, and the gap WIDENS as you climb - KiB +2.40%, MiB +4.86%, GiB +7.37%, TiB +9.95%. Third, the census\u2019s outer wall: the largest value that fits in $n$ bits is $2^n - 1$, so a byte tops out at 255 and the first number that needs a ninth bit is 256 itself. Where the theory truly lives: the full counting theory and the arithmetic of the prefixes belong to our doorstep book *Arithmetic and Number Systems*; this chapter needed only the census law itself.' },
    { kind: 'figure', caption: 'The harvest ladder: the four powers the whole chapter leans on, drawn as one rising staircase - 2^7 = 128 (ASCII\u2019s alphabet), 2^8 = 256 (the byte, two hex digits), 2^16 = 65,536 (one Unicode plane), 2^20 = 1,048,576 (one MiB, the twenty-questions census) - with the honest ladder beneath: the binary prefixes run +2.40%, +4.86%, +7.37%, +9.95% above their decimal rivals, and the gap only grows.', svg: cf3RPowersSvg() },
    { kind: 'table', caption: 'The honest ladder of lesson 3.1: each binary prefix against its decimal rival, the gap widening by design - 1,024 is not 1,000, and no marketing changes the arithmetic.', head: ['Prefix', 'True value', 'Decimal rival', 'The honest gap'], rows: [
      ['1 KiB', '$2^{10} = 1{,}024$ B', '1 kB = $10^3 = 1{,}000$ B', '+2.40%'],
      ['1 MiB', '$2^{20} = 1{,}048{,}576$ B', '1 MB = $10^6 = 1{,}000{,}000$ B', '+4.86%'],
      ['1 GiB', '$2^{30} = 1{,}073{,}741{,}824$ B', '1 GB = $10^9$ B', '+7.37%'],
      ['1 TiB', '$2^{40} = 1{,}099{,}511{,}627{,}776$ B', '1 TB = $10^{12}$ B', '+9.95%'],
    ] },
    { kind: 'example', title: 'Recap Illustration: twenty questions sort a million - the census law on one finger.', steps: [
      'Take a mail-order catalogue with exactly $1{,}000{,}000$ items, and a friend who has silently chosen one.',
      'So each honest yes/no question splits the remaining possibilities into two equal rooms.',
      'Now, twenty questions name $2^{20} = 1{,}048{,}576$ patterns.',
      'Check: $1{,}048{,}576 > 1{,}000{,}000$, with $48{,}576$ patterns to spare.',
      'Hence twenty questions always suffice, with $48{,}576$ patterns to spare - the census\u2019s honest margin over the million.',
      'Thus the machine\u2019s two-symbol alphabet is not a poverty: it is twenty questions deep, which is deeper than any catalogue you own.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Shannon 1948, and the word Tukey gave it', text: 'Claude Shannon published \u2018A Mathematical Theory of Communication\u2019 in 1948 and measured information in binary digits - but he credited the *short name* to John Tukey, who had been calling the binary digit a **bit** around the Bell Laboratories labs. The chapter\u2019s honest retelling: Shannon\u2019s theorem, Tukey\u2019s word. The full theory of the measure - entropy, channels, capacity - is a book of its own; the chapter borrowed exactly one idea, $n \\text{ bits} \\Rightarrow 2^n \\text{ patterns}$, and that one idea carried eight lessons.' },

    { kind: 'heading', text: 'Lesson 3.2 Recap: The Numbering Systems' },
    { kind: 'para', text: 'Lesson 3.2 met the machine\u2019s alphabets: **positional notation**, one formula wearing many alphabets - a numeral in base $b$ names $V = \\sum d_i b^i$, and only the alphabet changes. The harvest was the four-dress witness, pinned verbatim: $45 = 101101_2 = 55_8 = 2D_{16}$, one value in four dresses, each dress re-reading the same positional sum. Then the **grouping law** that makes the dresses exchangeable: one octal digit is exactly 3 bits ($2^3 = 8$), one hex digit exactly 4 bits ($2^4 = 16$) - so regrouping is just re-bracketing the same bit string, $2D$ spreading to $0010\\ 1101$, and $101101$ grouping in threes to $55$. And the law\u2019s most useful consequence: $16^2 = 256 = 2^8$, so **two hex digits are one byte** - which is why every byte-dump, colour code and memory address in the world wears hex. Where the theory truly lives: the complete number-systems theory - bases, congruences, the arithmetic of each alphabet - is *Arithmetic and Number Systems*\u2019 ground; this chapter took the witness and the grouping law.' },
    { kind: 'figure', caption: 'The four-dress 45 finale strip: 45 in base 10, 101101 in base 2, 55 in base 8, 2D in base 16 - each panel carrying its own weight sum (4 \u00d7 10 + 5, 32 + 8 + 4 + 1, 5 \u00d7 8 + 5, 2 \u00d7 16 + 13), every sum closing at 45, with the grouping law beneath: one octal digit is 3 bits, one hex digit is 4 bits, and 2D spreads to 0010 1101 - the same six bits, regrouped.', svg: cf3RFinaleSvg() },
    { kind: 'example', title: 'Recap Illustration: regroup the witness both ways - threes to octal, fours to hex.', steps: [
      'Take the binary dress of the witness: $101101$.',
      'Split in threes from the right: $101\\ 101$.',
      'So each group is an octal digit: $101 = 5$ and $101 = 5$, giving $55_8$.',
      'Now, split the same bits in fours from the right, padding the left: $0010\\ 1101$.',
      'Thus each group is a hex digit: $0010 = 2$ and $1101 = 13 = \\text{D}$, giving $2D_{16}$.',
      'Check both roads home: $5 \\times 8 + 5 = 45$ and $2 \\times 16 + 13 = 45$ - the value never moved.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why hex won the byte', text: 'Hexadecimal is not arbitrary: it is the UNIQUE base that tiles the byte exactly twice. $16^2 = 256 = 2^8$, so one byte is always two hex digits - never more, never fewer - while decimal (no power relationship) and octal ($8$ does not divide $256$ evenly into bytes) both leave ragged edges. When you meet a colour code like 4120 or an address like 7EA in this review, you are watching the grouping law do its quiet work.' },

    { kind: 'heading', text: 'Lesson 3.3 Recap: Codes - ASCII, Unicode and BCD' },
    { kind: 'para', text: 'Lesson 3.3 made patterns *mean* things. A code is a **contract**: both ends must hold the same table, or text arrives as garbage. The harvest census: **ASCII** spends 7 bits, so $2^7 = 128$ codes, split exactly as 33 + 95 - thirty-three control codes and ninety-five printable ones - with the arithmetic gems \u2018A\u2019 = 65, \u2018a\u2019 = 97, and therefore \u2018a\u2019 \u2212 \u2018A\u2019 = 32 = $2^5$: the case flip is a single bit, bit 5, and \u2018A\u2019 = $1000001_2$ versus \u2018a\u2019 = $1100001_2$ shows it naked. **BCD** stores one decimal digit per 4-bit group - $\\text{BCD}(45) = 0100\\ 0101$ - and pays honestly for the convenience: two BCD digits use only 100 of a byte\u2019s 256 patterns, wasting 156, which is 60.9375%. **Unicode** budgets the whole space at 17 planes of 65,536 code points = 1,114,112, of which version 17.0 fills 159,801 characters - 14.3434% of the space. **UTF-8** then makes the space shippable: 1\u20134 bytes per character, ASCII riding 1 byte so the old contract survives inside the new one. Where the theory truly lives: the BCD adder and the correction circuits are *Digital Logic Design*\u2019s ground; the encoding standards\u2019 full tables live in the standards themselves - the lesson kept the census.' },
    { kind: 'table', caption: 'The codes census of lesson 3.3: four codes, their budgets, and the engine-pinned witness each contributes to the chapter.', head: ['The code', 'The budget', 'The census', 'The witness to quote'], rows: [
      ['ASCII (1963)', '7 bits', '$2^7 = 128 = 33 + 95$', '\u2018A\u2019 = 65; \u2018a\u2019 = 97; the case gap 32'],
      ['BCD', '4 bits per decimal digit', '100 of 256 patterns used', 'the waste 156/256 = 60.9375%'],
      ['Unicode', '17 planes \u00d7 65,536', '1,114,112 code points', '159,801 characters = 14.3434% filled'],
      ['UTF-8', '1\u20134 bytes per character', 'A = 1 B; \u00e9 = 2 B; \u20b9 = 3 B; \ud83d\ude42 = 4 B', 'the string A = \u20b9 rides 7 bytes'],
    ] },
    { kind: 'example', title: 'Recap Illustration: the case flip, priced - from A to a to d without a table.', steps: [
      'Take the pinned codes: \u2018A\u2019 = 65 and \u2018a\u2019 = 97.',
      'So the gap is $97 - 65 = 32 = 2^5$, exactly one bit: bit 5.',
      'Check in binary: \u2018A\u2019 = $1000001_2$ and \u2018a\u2019 = $1100001_2$ - the sixth digit from the right flips.',
      'Now, price \u2018D\u2019 and \u2018d\u2019 the same way: \u2018D\u2019 = 68, so \u2018d\u2019 = $68 + 32 = 100$.',
      'Hence upper-to-lower is always \u201cset bit 5\u201d, and lower-to-upper is always \u201cclear it\u201d - one gate, not a lookup.',
      'Thus the digit arithmetic rides free too: \u20187\u2019 \u2212 \u20180\u2019 = 7, because the digits 48\u201357 sit contiguously.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The mojibake caution, once more', text: 'The contract cuts both ways: the same bytes decode differently under different tables. If one end reads UTF-8 and the other assumes a legacy single-byte code, the accented and the rupee-class characters arrive as two or three wrong letters - the garbage the trade calls mojibake. The cure is never cleverness; it is an agreed encoding declared at both ends. The census numbers above are the vocabulary of that agreement.' },

    { kind: 'heading', text: 'Lesson 3.4 Recap: Text, Images and Sound as Bits' },
    { kind: 'para', text: 'Lesson 3.4 priced the firehose with ONE formula: $\\text{rate} = \\text{measurements per second} \\times \\text{bytes per measurement} \\times \\text{channels}$ - one multiplication for text, images and sound alike. The harvest: CD stereo runs $44{,}100 \\times 2 \\times 2 = 176{,}400$ B/s, and the rate\u2019s own story is pinned too - 44,100 = 294 \u00d7 50 \u00d7 3, the lines-per-picture, pictures-per-second and colour-channel counts of the television era the CD inherited. Multiply on and the firehose grows honest: $176{,}400 \\times 8 = 1{,}411{,}200$ bit/s; a full 74-minute disc is $4{,}440 \\times 176{,}400 = 783{,}216{,}000$ B = 746.9330 MiB. Images join the same arithmetic: one 1080p RGB frame is $1920 \\times 1080 = 2{,}073{,}600$ pixels at 3 B each = 6,220,800 B - and at 30 frames per second that is 186,624,000 B/s, which is why lesson 3.5 exists. Text is the light end: a 5,000-character ASCII essay rides about 5,000 B in UTF-8 but 10,000 B in UTF-16. Where the theory truly lives: the sampling theorem\u2019s proof belongs to signals and systems; the lesson kept the rate law and the Nyquist guard band - $44{,}100/2 - 20{,}000 = 2{,}050$ Hz of margin above the ear\u2019s ceiling.' },
    { kind: 'figure', caption: 'The rate thread: the CD\u2019s 176,400 B/s (itself the story 294 \u00d7 50 \u00d7 3 = 44,100, times 2 bytes times 2 channels) times 8 gives the 1,411,200 bit/s bit rate, and dividing by the MP3 rate 128,000 gives the 11.025x saving of lesson 3.5 - with the 74-minute disc at 746.9330 MiB and the 1080p frame at 6,220,800 B drawn beneath as the firehose\u2019s two witnesses.', svg: cf3RRateSvg() },
    { kind: 'example', title: 'Recap Illustration: rebuild the CD rate from its own story, then price a whole disc.', steps: [
      'Take the rate\u2019s factors as pinned: $294 \\times 50 \\times 3$.',
      'So $294 \\times 50 = 14{,}700$, and $14{,}700 \\times 3 = 44{,}100$ samples per second.',
      'Now, apply the rate law: $44{,}100 \\times 2 \\text{ B} \\times 2 \\text{ channels} = 176{,}400$ B/s.',
      'Check the bit rate: $176{,}400 \\times 8 = 1{,}411{,}200$ bit/s.',
      'So a full 74-minute disc holds $74 \\times 60 = 4{,}440$ s, and $4{,}440 \\times 176{,}400 = 783{,}216{,}000$ B.',
      'Hence, in honest binary units: $783{,}216{,}000 \\div 1{,}048{,}576 = 746.9330$ MiB (4 dp) - about 747 MiB, the number the era printed on a disc.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'One formula, three media', text: 'The quiet victory of lesson 3.4 is that text, images and sound surrender to the SAME multiplication - count the measurements, price each, multiply by the channels. A 16-bit census holds 65,536 loudness levels; an 8-bit gray scale holds 256; a 24-bit colour holds $2^{24} = 16{,}777{,}216$. Different senses, one law: rate = measurements \u00d7 bytes \u00d7 channels. Keep the law; the media are examples.' },

    { kind: 'heading', text: 'Lesson 3.5 Recap: Compression - Lossless and Lossy' },
    { kind: 'para', text: 'Lesson 3.5 stood before the firehose and asked the packing question: which bytes can go, and can they come BACK? The two honest answers became the chapter\u2019s sharpest line. The **lossless door** promises every bit returns: run-length encoding packed our own witness AABBCCCCCD (10 characters) into 2A2B5C1D (8), with the honesty that short runs GROW - \u2018AB\u2019 becomes \u20181A1B\u2019, doubling 2 to 4. Huffman\u2019s 1952 craft did better on the pinned frequency table {A: 5, B: 2, C: 1, D: 1}: the depths come out A = 1, B = 2, C = 3, D = 3, so the 9-symbol message AAAAABBCD rides $5 + 4 + 3 + 3 = 15$ bits against the fixed 2-bit code\u2019s $9 \\times 2 = 18$ - a saving of 3 bits (16.67%), a ratio of $18/15 = 1.2\\times$ - and the entropy floor sits at H = 1.6577427 bits per symbol, with the code\u2019s $15/9 = 1.6667$ barely 0.0089 above the law allows. The **lossy door** discards deliberately, aiming at what you miss least: MP3 at 128 kbit/s shrinks the CD stream $1{,}411{,}200/128{,}000 = 11.025\\times$ (and $4.41\\times$ at its top 320 kbit/s rate); JPEG cuts a 1080p frame into $240 \\times 135 = 32{,}400$ eight-by-eight blocks before it dares to discard. Where the theory truly lives: entropy and its proofs are Shannon\u2019s information theory, a whole book ahead; the lesson kept the two doors and their arithmetic.' },
    { kind: 'example', title: 'Recap Illustration: the Huffman census in five lines - depths, bits, floor.', steps: [
      'Take the pinned frequencies: A five times, B twice, C once, D once - nine symbols in all.',
      'So the two lightest leaves merge first, and the merge repeats: the depths land at A = 1, B = 2, C = 3, D = 3.',
      'Hence the canonical code A = 0, B = 10, C = 110, D = 111, prefix-free by construction.',
      'Now, price the message AAAAABBCD: $5 \\times 1 + 2 \\times 2 + 1 \\times 3 + 1 \\times 3 = 15$ bits, against $9 \\times 2 = 18$ fixed.',
      'Check against the law: the entropy floor is 1.6577427 bits/symbol, and $15/9 = 1.6667$ barely clears it - Huffman leaves almost nothing on the table.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The packing verdict', text: 'Lossless compression is bounded below by entropy: no code for the nine-symbol message can average fewer than H = 1.6577427 bits per symbol, and Huffman\u2019s 1.6667 sits within 0.0089 of that wall. Lossy compression has NO such wall - it trades a promise (every bit returns) for a budget (11.025x smaller), and the trade is honest only because it names what it discards. Choose the door before you choose the tool.' },

    { kind: 'heading', text: 'Lesson 3.6 Recap: Decimal to Binary Conversion' },
    { kind: 'para', text: 'Lesson 3.6 built the road DOWN: decimal in, pattern out. The machine is the **division ladder** - divide by 2, keep the remainder, repeat on the quotient until it reaches 0, then read the remainders bottom-up. The 45 witness walked it in six rungs, remainders 1, 0, 1, 1, 0, 1 read bottom-up to $101101_2$. The chapter\u2019s year witness walked it in eleven: 2026 lands as $11111101010_2$, and the same ladder in base 16 gives the dress $7EA_{16}$ - while the grouping road confirms it, $111\\ 1110\\ 1010$ reading straight to 7, 14, 10. The honest frontier closed the lesson: 0.1 NEVER terminates in binary - $0.1 = 0.0001100110011\\ldots$ with the block 0011 repeating forever - because $10 = 2 \\times 5$ is not a power of two, and this single fact is why $0.1 + 0.2 \\neq 0.3$ inside every machine that chops the ladder at fifty-three bits. Where the theory truly lives: the general base-conversion theory is *Arithmetic and Number Systems*\u2019 ground; the lesson kept the ladder, the reading direction and the warning.' },
    { kind: 'example', title: 'Recap Illustration: the year 2026, down the ladder in both bases.', steps: [
      'Take the witness: 2026, and split it by 2 again and again.',
      'So the rungs read: 2026 r 0, 1013 r 1, 506 r 0, 253 r 1, 126 r 0, 63 r 1, 31 r 1, 15 r 1, 7 r 1, 3 r 1, 1 r 1 - eleven rungs, quotients falling until 0.',
      'Read the remainders bottom-up: $11111101010_2$.',
      'Now, run the ladder in base 16: $2026 \\div 16 = 126$ remainder 10; $126 \\div 16 = 7$ remainder 14; $7 \\div 16 = 0$ remainder 7.',
      'Thus read up: $7EA_{16}$ - and the grouping road agrees, $111\\ 1110\\ 1010$ giving 7, 14, 10.',
      'Check the width: $2^{10} = 1{,}024 \\leq 2026 < 2{,}048 = 2^{11}$, so eleven bits, exactly as the ladder produced.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The bottom-up trap, one last time', text: 'The examination\u2019s favourite error is reading the remainder column top-down. The first remainder is the UNITS bit - the rightmost digit - because dividing by 2 peels the units end first. The cure is ritual: pencil under the last remainder, read upwards, then close with the weight check. Six seconds; zero slips.' },

    { kind: 'heading', text: 'Lesson 3.7 Recap: Binary to Decimal Conversion' },
    { kind: 'para', text: 'Lesson 3.7 walked the road UP: pattern in, decimal out. The **weight sum** writes the place values over the digits and adds the ones under the 1-bits - the year witness $11111101010_2$ summed as $1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 = 2026$. The **doubling ladder** (Horner\u2019s method in base 2) sweeps left to right, doubling and adding each bit: on $110110$ the running values run $1 \\to 3 \\to 6 \\to 13 \\to 27 \\to 54$, and on the witness $101101$ they run $1 \\to 2 \\to 5 \\to 11 \\to 22 \\to 45$. The **grouped read** prices hexadecimal without any long division: $F52_{16} = 15 \\times 256 + 5 \\times 16 + 2 = 3{,}922$, and spreading the digits to $1111\\ 0101\\ 0010$ shows the same bits. Where the theory truly lives: the doubling sweep is Horner\u2019s polynomial evaluation, which *Arithmetic and Number Systems* treats in full; the lesson kept the three roads and when each wins - weights for short numerals, doubling for long sparse ones, grouping whenever hex is at hand.' },
    { kind: 'example', title: 'Recap Illustration: the grouped read of F52, checked both ways.', steps: [
      'Take the hex numeral $F52$ and spread each digit to four bits: F = 1111, 5 = 0101, 2 = 0010.',
      'So the bit string is $111101010010_2$ - twelve bits, three hex digits.',
      'Now, read by weights in base 16: 15 \u00d7 256 + 5 \u00d7 16 + 2 = 3,922.',
      'Check by the doubling ladder on $111101010010$: the sweep climbs to $3{,}922$ - both roads close.',
      'Hence three hex digits ARE twelve bits, no more no less - the grouping law priced again.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why two roads beat one', text: 'The weight sum and the doubling ladder are the SAME theorem read in two directions - one visits the 1-bits, the other visits every digit once. Use weights when the numeral is short and dense; use doubling when it is long or when your table of powers has run out. The examination cannot surprise you with a numeral if you own both.' },

    { kind: 'heading', text: 'Lesson 3.8 Recap: Decimal and Binary Number System' },
    { kind: 'para', text: 'Lesson 3.8, the synthesis seat, set the two systems side by side as ONE machine: the counting strip $0, 1, 10, 11, 100, 101, 110, 111, 1000, 1001, 1010$ with the odometer principle - when a column fills, it rolls. The roll-over witness: $111 + 1 = 1000$, the carry cascading right to left exactly as $999 + 1$ rolls a decimal odometer to 1000. The shift-double law: appending a 0 to a binary numeral doubles it - $1101$ is 13, and $11010$ is 26, because every digit moves up one place. And the exchange rate between the alphabets: $\\log_2 10 \\approx 3.32$, so binary wears about three and a third digits for every decimal digit - a million is 7 decimal digits but 20 binary ones. Where the theory truly lives: the adder hardware that performs the carry is *Digital Logic Design*\u2019s ground; the lesson kept the strip, the roll and the rate.' },
    { kind: 'example', title: 'Recap Illustration: the roll-over and the shift-double, in four moves each.', steps: [
      'Take the strip\u2019s climax: $111 + 1$.',
      'So the units column fills: $1 + 1 = 0$ carry 1; the middle column fills the same; the leading column fills the same.',
      'Thus a fourth column lights: $111 + 1 = 1000$, which is $7 + 1 = 8$ - the all-ones ceiling rolling over.',
      'Now, the shift-double: take $1101 = 8 + 4 + 1 = 13$ and append a 0.',
      'Hence $11010 = 16 + 8 + 2 = 26$ - every weight doubled, the value doubled.',
      'Check the exchange rate: $\\log_2 10 \\approx 3.32$, so the two extra bits ($13 \\to 26$) bought exactly one decimal digit\u2019s worth of value.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The strip is the whole synthesis', text: 'Count in binary and you are doing everything at once: positional notation (3.2), the census (3.1), the carry (3.8), the roll-over ceiling (3.6\u2019s $2^n$ wall). If you can write the strip from 0 to 1010 without hesitation, you own the chapter\u2019s core; if you hesitate, the hesitation marks the exact rung to revisit.' },

    // ================================================================
    // 3. THE SYNTHESIS SECTION
    // ================================================================
    { kind: 'heading', text: 'The Synthesis: Representation Is a Choice with a Price' },
    { kind: 'para', text: 'Strip the eight lessons to one sentence and it reads: **representation is a choice, and every choice has a price the chapter has now priced.** The alphabet is a choice - two symbols cost $\\log_2 10 \\approx 3.32$ times more digits per value, and the census law fixes what any width can hold. The code is a choice - ASCII\u2019s 128 codes are cheap but provincial; Unicode\u2019s 1,114,112 code points are universal but need UTF-8\u2019s 1\u20134 byte classes to ship; BCD\u2019s one-digit-per-nibble convenience wastes 60.9375% of every byte. The sampling rate is a choice - 44,100 samples a second buys a 2,050 Hz guard band above the ear, at 176,400 B/s a second of stereo. The compression knob is a choice - the lossless door returns every bit but is walled at entropy (1.6577427 bits per symbol on the pinned table); the lossy door breaks the wall but only by naming what it discards, 11.025x smaller at MP3\u2019s common rate. Four choices, four prices, one method: count before you commit.' },
    { kind: 'para', text: 'Keep two souvenirs and you keep the chapter. The **45 witness** - $45 = 101101_2 = 55_8 = 2D_{16}$ - is the dresses lesson in one line: one value, four alphabets, the positional sum unchanged underneath. The **2026 witness** - $11111101010_2 = 3752_8 = 7EA_{16}$, eleven bits because $2^{10} \\leq 2026 < 2^{11}$ - is the craft in one line: a number big enough to need the ladder, small enough to check by weights, and dressed by grouping alone. Between them they rehearse 3.1\u2019s census, 3.2\u2019s grouping law, both conversion roads of 3.6 and 3.7, and 3.8\u2019s insistence that nothing but the alphabet changed. Pin them to the wall of the next chapter.' },

    // ================================================================
    // 4. THE FORMULA + VOCABULARY HARVEST
    // ================================================================
    { kind: 'heading', text: 'The Formula and Vocabulary Harvest' },
    { kind: 'para', text: 'Five cards and ten words - the chapter\u2019s whole toolkit, ready for the formula sheet and the glossary. Each card names the law and the witness that proves it; each word is the chapter\u2019s own definition, pinned to its engine-verified census. Read them once here, then let the mixed bench below test whether they stuck.' },
    { kind: 'formula', name: 'The positional value formula', latex: 'V = \\sum_{i=0}^{k} d_i \\, b^i', note: 'One formula, every alphabet: 101101 in base 2, 55 in base 8, 2D in base 16 - each digit times its place value, summed. The 45 witness in one line.' },
    { kind: 'formula', name: 'n bits name 2^n patterns', latex: 'n \\text{ bits} \\;\\Rightarrow\\; 2^n \\text{ patterns}', note: 'The census law: twenty questions sort a million because 2^20 = 1,048,576 > 1,000,000. Under every code, every key and every width.' },
    { kind: 'formula', name: 'The media rate law', latex: '\\text{rate} = \\text{measurements/s} \\times \\text{bytes} \\times \\text{channels}', note: 'CD stereo: 44,100 \u00d7 2 \u00d7 2 = 176,400 B/s; one 1080p RGB frame is 1920 \u00d7 1080 \u00d7 3 = 6,220,800 B. One multiplication for text, image and sound.' },
    { kind: 'formula', name: 'The compression ratio', latex: '\\text{ratio} = \\text{original size} \\div \\text{compressed size}', note: 'Huffman\u2019s witness: 18/15 = 1.2x. The CD-to-MP3 door at 128 kbit/s: 1,411,200/128,000 = 11.025x.' },
    { kind: 'formula', name: 'The largest n-bit value', latex: '\\text{largest in } n \\text{ bits} \\;=\\; 2^n - 1', note: 'The all-ones ceiling: 8 bits top out at 255, 16 at 65,535 - and the first value that does not fit is 2^n itself, one bit wider.' },
    { kind: 'terms', items: [
      { term: 'Bit', def: 'A bit is one binary digit, 0 or 1 - the single coin of machine information, named by John Tukey and measured by Claude Shannon\u2019s 1948 theory. The census law fixes its power: $n$ bits name $2^n$ patterns, so twenty bits already sort a million.' },
      { term: 'Byte', def: 'A byte is a group of 8 bits - $2^8 = 256$ patterns, exactly two hexadecimal digits, and the standard cell in which a character, a loudness sample or a colour channel rides.' },
      { term: 'Positional notation', def: 'Positional notation is the naming scheme in which a numeral\u2019s value is $V = \\sum d_i b^i$: each digit is multiplied by the power of the base at its place. Change the alphabet (2, 8, 10, 16) and the dress changes; the value does not - the 45 witness, four dresses, one sum.' },
      { term: 'BCD', def: 'Binary-coded decimal stores one decimal digit per 4-bit group, weights 8-4-2-1. Its price is pinned: two digits use only 100 of a byte\u2019s 256 patterns, wasting 156 patterns = 60.9375% - bought for the sake of decimal displays and accounting machines.' },
      { term: 'ASCII', def: 'The American Standard Code for Information Interchange (1963) is the 7-bit contract: $2^7 = 128$ codes split 33 + 95 into control and printable, with \u2018A\u2019 = 65, \u2018a\u2019 = 97, and the case flip exactly bit 5 (the gap 32).' },
      { term: 'Unicode', def: 'Unicode is the whole-character space: 17 planes of 65,536 code points = 1,114,112 in all, of which version 17.0 fills 159,801 characters - 14.3434% of the space. One number for every character is the ambition; the fill is the honest measure of progress.' },
      { term: 'UTF-8', def: 'UTF-8 is Unicode\u2019s variable-width shipping dress: 1\u20134 bytes per character, with ASCII riding 1 byte (so the old contract survives), \u00e9 riding 2, the rupee 3 and the smiley 4 - the string \u2018A = \u20b9\u2019 rides 7 bytes.' },
      { term: 'Sampling', def: 'Sampling is measuring a continuous wave a fixed number of times per second so it can cross into bits. CD audio samples 44,100 times per second (the rate\u2019s own story: 294 \u00d7 50 \u00d7 3), leaving a 2,050 Hz guard band above the ear\u2019s ceiling.' },
      { term: 'Lossless', def: 'Lossless compression is packing from which every bit returns: run-length encoding (AABBCCCCCD to 2A2B5C1D) and Huffman coding (18 bits to 15 on the pinned table, ratio 1.2x) both keep the promise, and entropy walls the gain.' },
      { term: 'Lossy', def: 'Lossy compression discards deliberately, choosing what you miss least: MP3 at 128 kbit/s is 11.025x smaller than the CD stream; JPEG cuts a 1080p frame into 32,400 eight-by-eight blocks before discarding within them. The bits do not come back - the budget says they need not.' },
    ] },

    // ================================================================
    // 5. EXAM CORNER (the checklist mapped to lessons)
    // ================================================================
    { kind: 'heading', text: 'Exam Corner: the Chapter as a Checklist' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner - what this chapter answers, honestly labelled', text: 'Banking and SSC computer-awareness papers, school and board computer-science examinations, and Cambridge 9618-style papers all draw on data representation with a stable typology (every item below is exam-STYLE - our own original wording in the examination idiom, never a claim to quote a real paper): (i) the census asks - how many values $n$ bits hold, the MiB-versus-MB honesty, the largest $n$-bit value; (ii) the conversion drills - decimal to binary and back, the regroupings to octal and hexadecimal, with the bottom-up reading trap as the favourite distractor; (iii) the codes census - ASCII\u2019s 128, the case-flip arithmetic, BCD\u2019s waste, the Unicode space, UTF-8 byte counting; (iv) the rate arithmetic - size a clip, a frame, a stream; (v) the compression split - lossless versus lossy, a ratio computed, Huffman\u2019s depths and the entropy floor; (vi) the roll-over and the counting strip. The mixed bench below is built in exactly that idiom, graded L1 to L4; work it with a pencil and the checklist above as your mark scheme.' },
    { kind: 'table', caption: 'The chapter\u2019s examination checklist: every stable ask, the lesson that answers it, and the engine-pinned witness to quote in the margin.', head: ['The examination ask', 'The lesson that answers it', 'The witness to quote'], rows: [
      ['How many values can $n$ bits distinguish? The MiB/kB honesty', '3.1', '$2^{20} = 1{,}048{,}576$; the +2.40% to +9.95% ladder'],
      ['Convert between decimal, binary, octal, hexadecimal', '3.2, 3.6, 3.7', '45 = 101101 = 55 = 2D; 2026 = 11111101010 = 7EA'],
      ['ASCII arithmetic; the case flip; count UTF-8 bytes', '3.3', 'a - A = 32 = bit 5; the rupee rides 3 bytes'],
      ['The codes census: ASCII, BCD, Unicode sizes', '3.3', '128 = 33 + 95; 60.9375% waste; 1,114,112 code points'],
      ['Size a sound clip, an image, a video stream', '3.4', '176,400 B/s; 6,220,800 B a frame; 74 min = 746.9330 MiB'],
      ['Classify compression; compute a ratio', '3.5', 'Huffman 18 to 15 bits; MP3 11.025x; JPEG 32,400 blocks'],
      ['The roll-over; the largest $n$-bit value; the counting strip', '3.8', '111 + 1 = 1000; $2^n - 1$; $\\log_2 10 \\approx 3.32$'],
    ] },

    // ================================================================
    // 6. CHECK YOURSELF (the quiz, key pinned [2, 1, 0, 3, 1])
    // ================================================================
    { kind: 'heading', text: 'Check Yourself' },
    { kind: 'para', text: 'Five questions, one from each ridge of the review: the census, the conversion, the ceiling, the rate census and the UTF-8 census. Choose before you read on - each explanation says not only why the keyed answer is right but why every other option fails.' },
    { kind: 'quiz', items: [
      { q: 'One MiB is exactly -', options: [
        '1,000,000 bytes',
        '1,024,000 bytes',
        '1,048,576 bytes',
        '1,024 bytes',
      ], answer: 2, explain: 'One MiB is $2^{20} = 1{,}048{,}576$ bytes - the binary prefix, pinned by the census law and by the honest ladder\u2019s +4.86% gap over the decimal mega. Option (a), 1,000,000, is the DECIMAL mega $10^6$: a real unit, but a different one wearing the same letters - the drive-marketing habit the chapter priced. Option (b), 1,024,000, is the classic hybrid near-miss: one decimal kilo ($1{,}000$) times one binary kibi ($1{,}024$), matching NEITHER system - the single most popular wrong answer on this topic. Option (d), 1,024, is $2^{10}$ - that is one KiB, two rungs short of the MiB.' },
      { q: 'Convert the decimal number 53 to binary.', options: [
        '101011',
        '110101',
        '111001',
        '101101',
      ], answer: 1, explain: 'The ladder halves 53 through 26, 13, 6, 3, 1 to 0, and the remainders read bottom-up give $110101_2$ - checked by weights, $32 + 16 + 4 + 1 = 53$. Option (a), 101011, is 43: the trailing bits transposed, the reading-direction slip in miniature. Option (c), 111001, is 57: two middle bits flipped, as though a rung\u2019s remainder were misrecorded. Option (d), 101101, is 45 - the chapter\u2019s own witness offered as a decoy, correct for 45 and for nothing else. A ten-second weight check exposes all three.' },
      { q: 'The largest value that fits in sixteen bits is -', options: [
        '65,535',
        '65,536',
        '128',
        '1,114,112',
      ], answer: 0, explain: 'Sixteen wheels all at 1 hold $2^{16} - 1 = 65{,}535 = 1111111111111111_2$ - the all-ones ceiling. Option (b), 65,536, is $2^{16}$ itself: the FIRST value that does not fit, the roll-over that lights a seventeenth bit - also the size of one Unicode plane, which is what makes it seductive. Option (c), 128, is $2^7$: the ASCII census, seven rungs short. Option (d), 1,114,112, is the whole Unicode space - seventeen planes of 65,536, a number from a different census entirely.' },
      { q: 'A 90-second stereo clip at CD quality (44,100 samples per second, 16 bits per sample, two channels) occupies -', options: [
        '176,400 bytes',
        '1,411,200 bytes',
        '10,584,000 bytes',
        '15,876,000 bytes',
      ], answer: 3, explain: 'The rate law gives $44{,}100 \\times 2 \\text{ B} \\times 2 = 176{,}400$ B/s, and ninety seconds multiply it to $90 \\times 176{,}400 = 15{,}876{,}000$ B - about 15.1405 MiB in honest binary units. Option (a), 176,400, is ONE second of stereo: the rate, with the clock forgotten. Option (b), 1,411,200, is the BIT rate per second ($176{,}400 \\times 8$) - wrong unit and wrong duration at once. Option (c), 10,584,000, is ONE minute ($60 \\times 176{,}400$): the clerk who read ninety as sixty. Multiply, then check the unit - both habits travel.' },
      { q: 'In UTF-8, the string \u2018A = \u20b9\u2019 (letter A, space, equals, space, rupee sign) occupies -', options: [
        '4 bytes',
        '7 bytes',
        '6 bytes',
        '5 bytes',
      ], answer: 1, explain: 'The four ASCII characters - A, space, equals, space - each ride the 1-byte class, and the rupee sign rides the 3-byte class: $4 \\times 1 + 3 = 7$ bytes. Option (a), 4 bytes, counts only the ASCII one-byters and drops the rupee entirely. Option (c), 6 bytes, prices the rupee at 2 bytes - that is the accented-Latin class (like \u00e9), one class too low for the rupee. Option (d), 5 bytes, counts CHARACTERS, not bytes - the assumption that one character is always one byte, which is exactly the assumption UTF-8 was built to retire.' },
    ] },

    // ================================================================
    // 7. THE MIXED BENCH (15 exam-style questions, L1-L4)
    // ================================================================
    { kind: 'heading', text: 'The Mixed Bench: Fifteen Questions Across the Chapter' },
    { kind: 'para', text: 'The bench spans all eight lessons and climbs four rungs: L1 begins - single censuses and single reads; L2 consolidates - full ladders, byte counting, the rate law; L3 advances - the Huffman trace, the clip census, the year witness both ways, and one TWO-lesson chain run without putting the pencil down; L4 trains the examination idiom, and both of its items are exam-style - original items in the examination idiom, never a claim to quote a real paper. Work every solution chain with a pencil; the connectives are the method, and the figures inside the solutions are the arithmetic drawn.' },
    { kind: 'exercises', title: 'Exercises 3.R - the mixed bench across the chapter', sets: [
      { level: 'L1', questions: [
        { q: 'A digital lock offers 20 wheels, each settable to 0 or 1. How many distinct combinations does it hold, and is that enough to give each of 1,000,000 ticket-holders a unique combination?', solution: [
          'Take the census law: $n$ wheels name $2^n$ combinations.',
          'So the lock holds $2^{20} = 1{,}048{,}576$ combinations.',
          'Check against the crowd: $1{,}048{,}576 > 1{,}000{,}000$.',
          'Hence every ticket-holder gets a unique combination, with $48{,}576$ left over - the census\u2019s honest margin.',
        ], answer: '20 wheels hold 1,048,576 combinations - enough for a million, with 48,576 spare' },
        { q: 'The binary numeral 101101 is written on a whiteboard. Regroup its bits to read the value in octal and in hexadecimal, and verify each dress by its own weight sum.', solution: [
          'Split the bits in threes from the right: $101\\ 101$.',
          'So each three is one octal digit: $101 = 5$ twice, giving $55_8$.',
          'Now, split in fours from the right, padding the left with zeros: $0010\\ 1101$.',
          'Thus each four is one hex digit: $0010 = 2$ and $1101 = 13 = \\text{D}$, giving $2D_{16}$.',
          'Check by weights: $5 \\times 8 + 5 = 45$ and $2 \\times 16 + 13 = 45$ - one value, both dresses close.',
        ], answer: '101101 in base 2 = 55 in base 8 = 2D in base 16 (the 45 witness)' },
        { q: 'ASCII pins the letter A at code 65 and the letter a at code 97. Using only these two facts, find the codes of D and d, and say which single bit changes between the pairs.', solution: [
          'Take the case gap: $97 - 65 = 32 = 2^5$ - exactly the fifth bit.',
          'Now, the capitals sit contiguously from A, so \u2018D\u2019, three places on, is $65 + 3 = 68$.',
          'So \u2018d\u2019 = $68 + 32 = 100$.',
          'Check in binary: \u2018A\u2019 = $1000001_2$ and \u2018a\u2019 = $1100001_2$ - the sixth digit from the right flips.',
          'Hence upper and lower case differ by bit 5 alone: set it for lower, clear it for upper.',
        ], answer: 'D = 68, d = 100; the case flip is bit 5 (the gap 32)' },
        { q: 'Read the binary numeral 110110 in decimal by the doubling ladder, showing every running value.', solution: [
          'Take the leftmost bit: the running value starts at $1$.',
          'So double and add each next bit: $2 \\times 1 + 1 = 3$.',
          'Now, $2 \\times 3 + 0 = 6$; then $2 \\times 6 + 1 = 13$; then $2 \\times 13 + 1 = 27$.',
          'Thus the last step is $2 \\times 27 + 0 = 54$.',
          'Check by weights: $110110 = 32 + 16 + 4 + 2 = 54$ - both roads close.',
        ], answer: '110110 in base 2 = 54 (the ladder runs 1, 3, 6, 13, 27, 54)' },
      ] },
      { level: 'L2', questions: [
        { q: 'Convert 45 to binary by the division ladder, showing every rung, and close with the weight check.', solution: [
          'Take 45: $45 \\div 2 = 22$ remainder $1$.',
          'Now, $22 \\div 2 = 11$ remainder $0$.',
          'So, $11 \\div 2 = 5$ remainder $1$; $5 \\div 2 = 2$ remainder $1$.',
          'Then $2 \\div 2 = 1$ remainder $0$; and $1 \\div 2 = 0$ remainder $1$ - six rungs, and the ladder stops.',
          'Read the remainders bottom-up: $1, 0, 1, 1, 0, 1$.',
          'Check by weights: $32 + 8 + 4 + 1 = 45$ - the ladder closes.',
        ], answer: '45 = 101101 in base 2', figures: [{ caption: 'The 45 ladder as a machine: six rungs of divide-by-2 with each quotient falling to the next dividend, the remainders 1, 0, 1, 1, 0, 1 read bottom-up into 101101, checked by weights as 32 + 8 + 4 + 1 = 45.', svg: cf3RLadderSvg() }] },
        { q: 'A menu card carries the string caf\u00e9 \u20b9250. Count its length in UTF-8 bytes, showing which characters ride which byte class.', solution: [
          'Split the string: c, a, f, \u00e9, space, \u20b9, 2, 5, 0 - nine characters.',
          'So the seven ASCII characters (c, a, f, space, 2, 5, 0) each ride the 1-byte class: 7 bytes so far.',
          'Now, the accented \u00e9 rides the 2-byte class, and the rupee \u20b9 rides the 3-byte class.',
          'Thus the total is $7 + 2 + 3 = 12$ bytes.',
          'Check the census: nine characters, twelve bytes - the three extra bytes are exactly the accent\u2019s one and the rupee\u2019s two.',
        ], answer: 'caf\u00e9 \u20b9250 rides 12 bytes in UTF-8 (7 one-byters + \u00e9 at 2 + \u20b9 at 3)' },
        { q: 'One frame of 1080p video is stored as RGB at 3 bytes per pixel. Compute the frame\u2019s size in bytes, then express it in honest binary units (MiB, 4 dp).', solution: [
          'Take the grid: $1920 \\times 1080 = 2{,}073{,}600$ pixels.',
          'So at 3 B per pixel: $2{,}073{,}600 \\times 3 = 6{,}220{,}800$ B.',
          'Now, one MiB is $2^{20} = 1{,}048{,}576$ B, not $10^6$.',
          'Thus $6{,}220{,}800 \\div 1{,}048{,}576 = 5.9326171875$ MiB.',
          'Hence, to 4 dp: 5.9326 MiB - and at 30 frames a second the stream runs 186,624,000 B/s, which is why the next lesson compresses.',
        ], answer: '6,220,800 B = 5.9326 MiB (exactly 5.9326171875)' },
        { q: 'Count in binary: what does $111 + 1$ equal, and why does the answer grow a column? Relate the event to the decimal odometer.', solution: [
          'Take $111$ and add $1$ at the units end.',
          'So the units column fills: $1 + 1 = 0$, carry $1$.',
          'Now, the carry fills the middle column the same way, and then the leading column: every 1 collapses to 0.',
          'Thus a fourth column lights: $111 + 1 = 1000$, which is $7 + 1 = 8$.',
          'Check the census: $111 = 2^3 - 1$, the largest 3-bit value, so the next value is $2^3 = 8$, one bit wider - exactly as $999 + 1$ rolls a decimal odometer to $1000$.',
        ], answer: '111 + 1 = 1000 - the all-ones ceiling rolls over, one bit wider' },
        { q: 'Encode AABBCCCCCD by run-length encoding and state the census of the saving; then say what RLE does to the string AB, and why.', solution: [
          'Split the string into its runs: AA, BB, CCCCC, D.',
          'So each run becomes a count and its symbol: 2A 2B 5C 1D.',
          'Now, count the census: 10 characters in, 8 characters out - a saving of 2.',
          'Take the rival string AB: its runs are single, so RLE gives 1A 1B.',
          'Thus the output is 4 characters for 2 - the encoding GROWS on short runs, which is why RLE is honest only on long ones.',
        ], answer: 'AABBCCCCCD becomes 2A2B5C1D (10 to 8); AB becomes 1A1B (2 to 4 - it grows)' },
      ] },
      { level: 'L3', questions: [
        { q: 'Build the Huffman code for the frequency table {A: 5, B: 2, C: 1, D: 1}: merge the two lightest symbols repeatedly, give each symbol\u2019s depth, write the canonical code, encode AAAAABBCD, and compare with the fixed 2-bit code and the entropy floor.', solution: [
          'Take the two lightest leaves, C and D (weight 1 each), and merge them: a node of weight 2, both leaves one level deeper.',
          'So the lightest pair is now B (2) and the CD node (2); merge them: weight 4, with B one level deeper and C, D one more.',
          'Now, merge A (5) with that node (4): the root weighs 9, and the depths land at A = 1, B = 2, C = 3, D = 3.',
          'Thus the canonical code, one bit under the commonest symbol: A = 0, B = 10, C = 110, D = 111 - prefix-free by construction.',
          'So AAAAABBCD encodes as $00000\\ 1010\\ 110\\ 111 = 000001010110111$: $5 + 4 + 3 + 3 = 15$ bits.',
          'Check against the fixed 2-bit code: $9 \\times 2 = 18$ bits - Huffman saves 3 bits (16.67%), a ratio of $18/15 = 1.2\\times$.',
          'Hence against the law: the entropy floor is 1.6577427 bits/symbol and the code averages $15/9 = 1.6667$ - barely 0.0089 above the wall.',
        ], answer: 'A = 0, B = 10, C = 110, D = 111; AAAAABBCD = 15 bits against 18 fixed, entropy floor 1.6577427', figures: [{ caption: 'The Huffman tree for {A:5, B:2, C:1, D:1}: the root of weight 9 splits into leaf A (edge 0) and the weight-4 node (edge 1), which splits into leaf B (0) and the weight-2 node (1), which splits into leaves C (0) and D (1) - depths 1, 2, 3, 3, the code panel reading A = 0, B = 10, C = 110, D = 111, the message in 15 bits against 18 fixed, and the entropy floor 1.6577427 bits per symbol.', svg: cf3RHuffSvg() }] },
        { q: 'A 90-second stereo clip is recorded at CD quality (44,100 samples per second, 16 bits per sample, two channels). Compute its exact size in bytes, then in MiB (4 dp).', solution: [
          'Take the rate law: rate = measurements per second \u00d7 bytes per measurement \u00d7 channels.',
          'So the rate is $44{,}100 \\times 2 \\times 2 = 176{,}400$ B/s (16 bits = 2 bytes; two channels).',
          'Now, the clip runs 90 s: $90 \\times 176{,}400 = 15{,}876{,}000$ B.',
          'Thus, in honest binary units: $15{,}876{,}000 \\div 1{,}048{,}576 = 15.140533447265625$ MiB.',
          'Hence, to 4 dp: 15.1405 MiB - and the decimal mega ($10^6$ B) would mislabel it by the whole honest-ladder gap.',
        ], answer: '90 s of CD stereo = 15,876,000 B = 15.1405 MiB (exactly 15.140533447265625)', figures: [{ caption: 'The 90-second census as one chain: the rate 44,100 \u00d7 2 B \u00d7 2 channels = 176,400 B/s, times 90 s = 15,876,000 B, divided by one MiB = 1,048,576 B giving 15.1405 MiB - with the exact value 15.140533447265625 and the one-minute rival 10,584,000 B noted beneath.', svg: cf3RCensusSvg() }] },
        { q: 'Convert the year 2026 to binary by the division ladder; then read the same bits back in decimal by the weight sum, and dress the value in octal and hexadecimal by grouping alone.', solution: [
          'Take the ladder down: 2026 halves through 1013, 506, 253, 126, 63, 31, 15, 7, 3, 1, and reaches 0.',
          'So the remainders, read bottom-up, give $2026 = 11111101010_2$ - eleven bits, exactly as the census promises ($2^{10} \\leq 2026 < 2^{11}$).',
          'Now, read the same bits back up by weights: $1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 = 2026$.',
          'Thus regroup in fours from the right: $111\\ 1110\\ 1010$ values 7, 14, 10, so $2026 = 7EA_{16}$.',
          'And regroup in threes: $11\\ 111\\ 101\\ 010$ values 3, 7, 5, 2, so $2026 = 3752_8$.',
          'Check all four dresses close at 2026: the ladder, the weights and both groupings agree.',
        ], answer: '2026 = 11111101010 in base 2 = 3752 in base 8 = 7EA in base 16', figures: [{ caption: 'The 2026 witness regrouped: eleven bit cells reading 11111101010, bracketed in fours (111, 1110, 1010 valued 7, 14, 10, spelling 7EA in base 16) and in threes (11, 111, 101, 010 valued 3, 7, 5, 2, spelling 3752 in base 8), with the weight check 1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 = 2026 beside them.', svg: cf3RGroupSvg() }] },
        { q: 'A 16-bit colour code reads 4120 in hexadecimal - one byte 41, one byte 20. Convert each byte to decimal, name the ASCII character each codes, and explain what the second value has to do with the case gap.', solution: [
          'Split the code into its bytes: 41 and 20.',
          'So read each in hex: $41_{16} = 4 \\times 16 + 1 = 65$, and $20_{16} = 2 \\times 16 + 0 = 32$.',
          'Now, consult the ASCII table: 65 is the letter A, and 32 is the space - the code\u2019s two bytes spell \u201cA \u201d.',
          'Thus the case gap reappears: \u2018a\u2019 \u2212 \u2018A\u2019 = $97 - 65 = 32 = 2^5$, so the second byte\u2019s value IS the case-flip bit.',
          'Check the grouping law beneath: 41 spreads to $0100\\ 0001$ and 20 to $0010\\ 0000$ - sixteen bits, four hex digits, one colour word.',
        ], answer: '41 = 65 = the letter A; 20 = 32 = the space; and 32 is exactly the case gap (bit 5)', figures: [{ caption: 'The two-lesson chain drawn: the colour code 4120 in hex splits into byte 41 (4 \u00d7 16 + 1 = 65, ASCII 65 = A, bit 5 clear) and byte 20 (2 \u00d7 16 + 0 = 32, ASCII 32 = the space, and a - A = 32 = bit 5) - lesson 3.2\u2019s hex read feeding lesson 3.3\u2019s code table.', svg: cf3RChainSvg() }] },
      ] },
      { level: 'L4', questions: [
        { q: '(A three-lesson chain.) A 210-second song is exported twice: once as raw CD stereo, once as MP3 at 128 kbit/s. (i) Compute both file sizes in bytes. (ii) Express both in MiB (4 dp). (iii) Verify that the ratio of the two sizes is the CD-to-MP3 saving the chapter pinned.', solution: [
          'Take the CD rate from the law: $44{,}100 \\times 2 \\times 2 = 176{,}400$ B/s.',
          'So the raw export holds $210 \\times 176{,}400 = 37{,}044{,}000$ B.',
          'Now, MP3 at 128 kbit/s is $128{,}000$ bit/s $= 16{,}000$ B/s, so the MP3 holds $210 \\times 16{,}000 = 3{,}360{,}000$ B.',
          'Thus in honest binary units: $37{,}044{,}000 \\div 1{,}048{,}576 = 35.3279$ MiB and $3{,}360{,}000 \\div 1{,}048{,}576 = 3.2043$ MiB (both 4 dp).',
          'Check the ratio: $1{,}411{,}200 \\div 128{,}000 = 11.025$ - and byte for byte, $37{,}044{,}000 \\div 3{,}360{,}000 = 11.025$ exactly, the pinned saving.',
          'Hence the lossy door\u2019s price and promise in one file: eleven times smaller, and the discarded detail never returns.',
        ], answer: 'CD 37,044,000 B = 35.3279 MiB; MP3 3,360,000 B = 3.2043 MiB; the ratio is 11.025x' },
        { q: '(Exam-style, two parts.) (i) State the exact number of bytes in one MiB, and price the two classic wrong answers 1,000,000 and 1,024,000. (ii) The KiB sits above the kB by what percentage (2 dp), and why does the gap widen at every rung of the ladder?', solution: [
          'Take the definition: one MiB is $2^{20}$ bytes.',
          'So $2^{20} = 1{,}048{,}576$ B - the exact answer.',
          'Now, price the decoys: $1{,}000{,}000 = 10^6$ is the DECIMAL mega, a different unit in the same letters; and $1{,}024{,}000 = 1000 \\times 1024$ is the hybrid - one decimal kilo times one binary kibi, belonging to neither system.',
          'Thus for (ii): the KiB gap is $(1024 - 1000)/1000 = 2.40\\%$ to 2 dp.',
          'So the gap widens because the binary prefix doubles its distance from the decimal one at each rung: the difference grows with the exponent, giving 4.86% at MiB, 7.37% at GiB, 9.95% at TiB.',
          'Hence the honest habit: name the unit you mean, and convert with $2^{20}$, never with $10^6$.',
        ], answer: '1 MiB = 1,048,576 B; the decoys are 10^6 and 1000 \u00d7 1024; the KiB gap is +2.40%, widening to +9.95% at TiB' },
      ] },
    ] },

    // ================================================================
    // 8. THE FORWARD DOOR (chapter 4 'Inside the Box')
    // ================================================================
    { kind: 'heading', text: 'The Forward Door: Inside the Box' },
    { kind: 'para', text: 'Close the chapter by opening the next door. For eight lessons you have lived INSIDE the machine\u2019s language: you know what a bit counts, how the dresses exchange, what a code promises, what a stream costs, what packing returns. Chapter 4, \u2018Inside the Box\u2019, turns the question around and asks about the box itself: the **motherboard** on which everything meets, the **processor** that chews the patterns you have learned to read, the **memory hierarchy** that holds them at every speed and price you have now learned to question, the **buses** that carry them and the **ports** through which they greet the world. The representation is settled; the anatomy opens. One line carries the whole handover, and it is the same line the map closed on: this chapter gave the machine its LANGUAGE; the next asks how the box SPEAKS it.' },
    { kind: 'callout', tone: 'insight', title: 'What to carry through the door', text: 'Carry the method, not the menagerie: name the choice, count the price. When chapter 4 shows you a memory chip labelled in GiB, you will already know to ask which mega the label means (+7.37% says the honest answer). When it quotes a bus in bytes per second, you will already own the rate law. When it promises a cache speed-up, you will already ask what was measured and what was merely rounded. The language was the hard part; the box is its grammar in metal.' },
  ],
}
