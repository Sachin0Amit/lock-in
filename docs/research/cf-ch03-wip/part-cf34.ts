import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf34.ts — CS RUN 5 seat cf34 (the MEDIA CENSUS lesson).
 *
 * Lesson 3.4 'Text, Images and Sound as Bits' of Computer Fundamentals
 * chapter 3 'Data Representation: a First Meeting'. ONE rate arithmetic
 * for three media: rate = (measurements per second) x (bytes per
 * measurement) x (channels). Text censuses (UTF-8 vs UTF-16, the class
 * law), image censuses (resolution x bit depth, the firehose), sound
 * censuses (Nyquist, the CD arithmetic, the 44,100 story). NOT codes
 * (3.3's ground), NOT compression (3.5's — named forward as the WHY).
 *
 * Every number printed here is pinned green by v-cf34.ts (the engine
 * ran GREEN on all 87 number checks before this prose was written; the
 * re-read block closes the ring). All figures are self-contained
 * computed SVGs in the house palette; every geometry constant is
 * derived, never eyeballed. Study-never-reproduce: every roster,
 * witness, figure, Illustration, quiz item and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const C = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const FONT = 'ui-sans-serif, system-ui, sans-serif'

/* __CF34_HELPERS__ */

/* ------------------------------------------------------------------ */
/* BODY FIGURE - the three-media rate ladder: log-scaled bars for the   */
/* typing trickle (5 B/s), the CD stream (176,400 B/s) and the raw      */
/* 1080p30 firehose (186,624,000 B/s); bar lengths computed from log10. */
/* ------------------------------------------------------------------ */
function cf34RateLadderSvg(): string {
  const W = 720
  const M = 16
  const rows = [
    { name: 'Text typing', sub: '5 chars/s x 1 B x 1 channel', rate: 5, rateTxt: '5 B/s', note: 'the trickle', fill: C.teal },
    { name: 'CD stereo sound', sub: '44,100/s x 2 B x 2 channels', rate: 176400, rateTxt: '176,400 B/s', note: 'x 35,280 over typing', fill: C.conn },
    { name: 'Raw 1080p30 video', sub: '62,208,000/s x 1 B x 3 channels', rate: 186624000, rateTxt: '186,624,000 B/s', note: 'x about 1,058 over sound', fill: C.accent },
  ]
  const headY = 30
  const topY = 62
  const rowStep = 66
  const barX0 = 196
  const maxBarW = 330
  const barH = 30
  const valX = 544
  const maxLog = Math.log10(186624000)
  const len = (v: number): number => Math.max(24, (Math.log10(v) / maxLog) * maxBarW)
  const stripY = topY + rows.length * rowStep + 4
  const stripH = 60
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The three-media rate ladder on a logarithmic scale. Text typing bills 5 bytes per second. CD stereo sound bills 176,400 bytes per second, which is 35,280 times typing. Raw 1080p30 video bills 186,624,000 bytes per second, about 1,058 times sound and 37,324,800 times typing. Bar lengths are log-scaled, so each equal step of length is a tenfold step of rate.">`)
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${C.teal}">THE RATE LADDER - ONE MULTIPLICATION, THREE UNIFORMS</text>`)
  rows.forEach((r, ri) => {
    const y = topY + ri * rowStep
    const w = len(r.rate)
    s.push(`<text x="${M}" y="${y + 12}" font-size="11" text-anchor="start" font-weight="bold" fill="${C.ink}">${r.name}</text>`)
    s.push(`<text x="${M}" y="${y + 26}" font-size="9.5" text-anchor="start" fill="${C.tealInk}">${r.sub}</text>`)
    s.push(`<rect x="${barX0}" y="${y}" width="${maxBarW}" height="${barH}" rx="5" fill="${C.white}" stroke="${C.mid}" stroke-width="1" stroke-dasharray="3 3"/>`)
    s.push(`<rect x="${barX0}" y="${y}" width="${w.toFixed(1)}" height="${barH}" rx="5" fill="${r.fill}" stroke="${C.ink}" stroke-width="1.4"/>`)
    s.push(`<text x="${valX}" y="${y + 13}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${C.ink}">${r.rateTxt}</text>`)
    s.push(`<text x="${valX}" y="${y + 27}" font-size="9.5" text-anchor="start" fill="${C.tealInk}">${r.note}</text>`)
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelB}" stroke="${C.conn}" stroke-width="1.6"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 24}" font-size="10" text-anchor="middle" fill="${C.ink}">the rungs of the ladder: sound is 35,280 x typing; video is 37,324,800 x typing and about 1,058 x sound</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 44}" font-size="10" text-anchor="middle" fill="${C.tealInk}">bar lengths are log-scaled - each equal step of length is a tenfold step of rate</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE - the sampling meter: a smooth 3-cycle wave with 24      */
/* computed sample dots and stems; the 294 x 50 x 3 strip below.        */
/* ------------------------------------------------------------------ */
function cf34SamplingMeterSvg(): string {
  const W = 720
  const M = 16
  const x0 = 46
  const x1 = 674
  const midY = 132
  const A = 52
  const cycles = 3
  const N = 24
  const span = x1 - x0
  const waveY = (x: number): number => midY - A * Math.sin((2 * Math.PI * cycles * (x - x0)) / span)
  const headY = 30
  const subY = 48
  const stripY = 218
  const stripH = 72
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The sampling meter: a smooth wave of three cycles carrying 24 sample dots at equal intervals of time, with vertical stems from the midline to each dot. The dot heights are all the machine keeps. The strip below carries the CD census: 294 PAL active lines x 50 fields per second x 3 samples per line equals 44,100 samples per second, each riding 2 bytes on each of 2 channels, so 44,100 x 2 x 2 = 176,400 bytes per second.">`)
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${C.teal}">THE SAMPLING METER - THE WAVE BECOMES A LIST OF NUMBERS</text>`)
  s.push(`<text x="${W / 2}" y="${subY}" font-size="10" text-anchor="middle" fill="${C.tealInk}">three cycles, 24 sample dots - eight dots per cycle - at equal intervals of time</text>`)
  s.push(`<line x1="${x0 - 10}" y1="${midY}" x2="${x1 + 10}" y2="${midY}" stroke="${C.mid}" stroke-width="1.2" stroke-dasharray="4 3"/>`)
  let d = ''
  for (let x = x0; x <= x1; x += 3) d += (d === '' ? 'M' : ' L') + `${x.toFixed(1)} ${waveY(x).toFixed(1)}`
  s.push(`<path d="${d}" fill="none" stroke="${C.teal}" stroke-width="2.4"/>`)
  for (let i = 0; i < N; i++) {
    const x = x0 + (span * i) / N
    const y = waveY(x)
    s.push(`<line x1="${x.toFixed(1)}" y1="${midY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${C.conn}" stroke-width="1.1"/>`)
    s.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${C.accent}" stroke="${C.ink}" stroke-width="1"/>`)
  }
  s.push(`<text x="${(x0 + x1) / 2}" y="${midY + A + 22}" font-size="10" text-anchor="middle" fill="${C.ink}">the machine keeps only the dot heights - one number per dot</text>`)
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelA}" stroke="${C.accent}" stroke-width="1.6"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 24}" font-size="10.5" text-anchor="middle" font-weight="bold" fill="${C.ink}">the CD census: 294 PAL active lines x 50 fields x 3 samples per line = 44,100 samples/s</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 44}" font-size="10" text-anchor="middle" fill="${C.ink}">each sample rides 2 bytes on each of 2 channels: 44,100 x 2 x 2 = 176,400 B/s</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 62}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">samples sit about 22.7 microseconds apart; 2.205 dots land on each 20,000 Hz cycle</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE - the pixel grid zoom: an 8 x 5 cell grid, one cell      */
/* highlighted, blown up to its three byte-cells R, G, B.               */
/* ------------------------------------------------------------------ */
function cf34PixelZoomSvg(): string {
  const W = 720
  const M = 16
  const headY = 30
  const subY = 48
  const COLS = 8
  const ROWS = 5
  const cell = 24
  const gx = 44
  const gy = 78
  const hlCol = 3
  const hlRow = 2
  const bx = 336
  const by = 74
  const bw = 352
  const bh = 108
  const pad = 10
  const inner = 8
  const bwb = (bw - 2 * pad - 2 * inner) / 3
  const stripY = 246
  const stripH = 62
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The pixel grid zoomed. On the left a small image grid of 8 columns by 5 rows of cells; one cell in the middle is highlighted. On the right that single cell is blown up and split into three byte-cells labelled R, G and B, each 8 bits - one byte each, three bytes per pixel. Under the big cell a bracket reads one pixel = 3 bytes = 24 bits. The strip below: each byte-cell names 256 levels, so 256 x 256 x 256 = 2 to the 24 = 16,777,216 colours from one cell; a gray cell needs only one byte and names 256 levels.">`)
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${C.teal}">THE PIXEL GRID, ZOOMED: ONE CELL AND ITS THREE BYTES</text>`)
  s.push(`<text x="${W / 2}" y="${subY}" font-size="10" text-anchor="middle" fill="${C.tealInk}">a 1920 x 1080 grid is this picture with 2,073,600 cells - here only 8 x 5 are drawn</text>`)
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const isHl = r === hlRow && c === hlCol
      s.push(`<rect x="${gx + c * cell}" y="${gy + r * cell}" width="${cell}" height="${cell}" fill="${isHl ? C.accent : C.panelA}" stroke="${C.ink}" stroke-width="${isHl ? 2 : 0.8}"/>`)
    }
  }
  const hx = gx + hlCol * cell
  const hy = gy + hlRow * cell
  s.push(`<line x1="${hx + cell}" y1="${hy}" x2="${bx}" y2="${by}" stroke="${C.accent}" stroke-width="1.4" stroke-dasharray="4 3"/>`)
  s.push(`<line x1="${hx + cell}" y1="${hy + cell}" x2="${bx}" y2="${by + bh}" stroke="${C.accent}" stroke-width="1.4" stroke-dasharray="4 3"/>`)
  s.push(`<text x="${gx}" y="${gy + ROWS * cell + 18}" font-size="9.5" text-anchor="start" fill="${C.tealInk}">the image grid: 8 x 5 cells</text>`)
  s.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="8" fill="${C.white}" stroke="${C.ink}" stroke-width="1.6"/>`)
  const letters = ['R', 'G', 'B']
  const fills = [C.accent, C.struct, C.teal]
  for (let i = 0; i < 3; i++) {
    const x = bx + pad + i * (bwb + inner)
    const y = by + 26
    const h = bh - 26 - pad
    s.push(`<rect x="${x.toFixed(1)}" y="${y}" width="${bwb.toFixed(1)}" height="${h}" rx="6" fill="${fills[i]}" stroke="${C.ink}" stroke-width="1.2"/>`)
    s.push(`<text x="${(x + bwb / 2).toFixed(1)}" y="${y + h / 2 - 4}" font-size="13" text-anchor="middle" font-weight="bold" fill="${C.white}">${letters[i]}</text>`)
    s.push(`<text x="${(x + bwb / 2).toFixed(1)}" y="${y + h / 2 + 16}" font-size="10" text-anchor="middle" fill="${C.white}">8 bits</text>`)
  }
  s.push(`<text x="${bx + bw / 2}" y="${by + 18}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">one pixel, opened up</text>`)
  s.push(`<text x="${bx + bw / 2}" y="${by + bh + 20}" font-size="10.5" text-anchor="middle" font-weight="bold" fill="${C.ink}">one pixel = 3 bytes = 24 bits</text>`)
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelB}" stroke="${C.conn}" stroke-width="1.6"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 24}" font-size="10" text-anchor="middle" fill="${C.ink}">each byte-cell names 256 levels: 256 x 256 x 256 = 2 to the 24 = 16,777,216 colours from one cell</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 44}" font-size="10" text-anchor="middle" fill="${C.tealInk}">a gray cell needs only one byte - 256 levels; RGB needs three - 16,777,216</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE - the CD timeline: 1979 PCM adaptor, 1980 Red Book,      */
/* 1 October 1982 CDP-101 + 52nd Street, on a computed year axis.       */
/* ------------------------------------------------------------------ */
function cf34CdTimelineSvg(): string {
  const W = 720
  const M = 16
  const x0 = 56
  const x1 = 664
  const lineY = 158
  const T0 = 1978.4
  const T1 = 1983.2
  const tx = (t: number): number => x0 + ((t - T0) / (T1 - T0)) * (x1 - x0)
  const marks = [
    { t: 1979.0, above: false, head: '1979', lines: ['Sony PCM-1600', 'PCM adaptor, digital', 'sound onto U-matic', 'VIDEO tape'] },
    { t: 1980.0, above: true, head: '1980', lines: ['Red Book standard', 'Sony + Philips agree', '16-bit (65,536 levels)', 'beats 14-bit (16,384)'] },
    { t: 1982.75, above: false, head: '1 October 1982', lines: ['Sony CDP-101 ships', '- the first CD player', 'Billy Joel, 52nd Street:', 'first album on CD'] },
  ]
  const headY = 28
  const subY = 46
  const stripY = 244
  const stripH = 64
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The CD timeline. In 1979 the Sony PCM-1600 PCM adaptor recorded digital sound onto U-matic video tape, which is where the 44,100 rate was inherited from. In 1980 the Red Book standard was agreed by Sony and Philips, and Sony's 16-bit depth of 65,536 loudness levels won over Philips' 14-bit depth of 16,384. On 1 October 1982 the Sony CDP-101 shipped as the first CD player, and Billy Joel's 52nd Street was the first album released on CD. The strip below: the 74-minute disc census, 4,440 seconds at 176,400 bytes per second equals 783,216,000 bytes.">`)
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${C.teal}">THE CD TIMELINE - FROM VIDEO TAPE TO THE SHOP SHELF</text>`)
  s.push(`<text x="${W / 2}" y="${subY}" font-size="10" text-anchor="middle" fill="${C.tealInk}">three years from adaptor to player; two from Red Book to shop</text>`)
  s.push(`<line x1="${x0}" y1="${lineY}" x2="${x1 + 6}" y2="${lineY}" stroke="${C.ink}" stroke-width="2"/>`)
  s.push(`<line x1="${x1 + 6}" y1="${lineY}" x2="${x1 - 4}" y2="${lineY - 6}" stroke="${C.ink}" stroke-width="2"/>`)
  s.push(`<line x1="${x1 + 6}" y1="${lineY}" x2="${x1 - 4}" y2="${lineY + 6}" stroke="${C.ink}" stroke-width="2"/>`)
  marks.forEach((mk) => {
    const x = tx(mk.t)
    s.push(`<line x1="${x.toFixed(1)}" y1="${lineY - 8}" x2="${x.toFixed(1)}" y2="${lineY + 8}" stroke="${C.ink}" stroke-width="2"/>`)
    s.push(`<circle cx="${x.toFixed(1)}" cy="${lineY}" r="5" fill="${C.accent}" stroke="${C.ink}" stroke-width="1.2"/>`)
    if (mk.above) {
      s.push(`<text x="${x.toFixed(1)}" y="${lineY - 66}" font-size="11" text-anchor="middle" font-weight="bold" fill="${C.accent}">${mk.head}</text>`)
      mk.lines.forEach((ln, i) => s.push(`<text x="${x.toFixed(1)}" y="${lineY - 50 + i * 14}" font-size="9.5" text-anchor="middle" fill="${C.ink}">${ln}</text>`))
    } else {
      s.push(`<text x="${x.toFixed(1)}" y="${lineY + 26}" font-size="11" text-anchor="middle" font-weight="bold" fill="${C.accent}">${mk.head}</text>`)
      mk.lines.forEach((ln, i) => s.push(`<text x="${x.toFixed(1)}" y="${lineY + 42 + i * 14}" font-size="9.5" text-anchor="middle" fill="${C.ink}">${ln}</text>`))
    }
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelA}" stroke="${C.accent}" stroke-width="1.6"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 26}" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.ink}">why 44,100? PAL video ran 294 active lines x 50 fields x 3 samples per line</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 46}" font-size="10" text-anchor="middle" fill="${C.ink}">the 74-minute disc: 4,440 s x 176,400 B/s = 783,216,000 B of sound</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - the gray-frame census strip (640 x 480, 1 byte).   */
/* ------------------------------------------------------------------ */
function cf34GrayStripSvg(): string {
  const W = 720
  const H = 150
  const M = 16
  const boxes = [
    { t1: '640 x 480 grid', t2: '307,200 cells' },
    { t1: 'x 1 byte each', t2: 'gray: 256 levels' },
    { t1: '307,200 B', t2: '= 300 KiB' },
    { t1: '0.29296875 MiB', t2: 'the binary dress' },
  ]
  const bw = 152
  const gap = (W - 2 * M - 4 * bw) / 3
  const by = 56
  const bh = 56
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The gray-frame census in four boxes joined by arrows. A 640 by 480 grid holds 307,200 cells. At one byte each - 256 gray levels - the bill is 307,200 bytes, which is exactly 300 KiB and 0.29296875 MiB. No channels to multiply for gray.">`)
  s.push(`<text x="${W / 2}" y="30" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${C.teal}">THE GRAY-FRAME CENSUS: 640 x 480, EIGHT BITS DEEP</text>`)
  boxes.forEach((b, i) => {
    const x = M + i * (bw + gap)
    s.push(`<rect x="${x.toFixed(1)}" y="${by}" width="${bw}" height="${bh}" rx="8" fill="${i === 3 ? C.panelB : C.white}" stroke="${i === 3 ? C.conn : C.ink}" stroke-width="1.5"/>`)
    s.push(`<text x="${(x + bw / 2).toFixed(1)}" y="${by + 23}" font-size="11" text-anchor="middle" font-weight="bold" fill="${C.ink}">${b.t1}</text>`)
    s.push(`<text x="${(x + bw / 2).toFixed(1)}" y="${by + 42}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">${b.t2}</text>`)
    if (i < 3) s.push(`<text x="${(x + bw + gap / 2).toFixed(1)}" y="${by + 34}" font-size="12" text-anchor="middle" font-weight="bold" fill="${C.accent}">></text>`)
  })
  s.push(`<text x="${W / 2}" y="${H - 14}" font-size="10" text-anchor="middle" fill="${C.tealInk}">one byte per cell, no channels to multiply - 307,200 B = 300 KiB = 0.29296875 MiB exactly</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - the 1024 x 768 RGB frame as 2.25 MiB blocks: two   */
/* full MiB squares and one quarter-square (by area).                   */
/* ------------------------------------------------------------------ */
function cf34FrameMiBSvg(): string {
  const W = 720
  const H = 176
  const sq = 84
  const y0 = 48
  const x0 = 150
  const gap = 18
  const qs = sq / 2
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The 1024 by 768 RGB frame census drawn as area blocks: two full 1 MiB squares and one quarter-square of half the side, showing 2.25 MiB exactly. The notes read: 786,432 cells times 3 bytes equals 2,359,296 bytes; divided by 1,048,576 gives 2.25 MiB with no rounding.">`)
  s.push(`<text x="${W / 2}" y="26" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${C.teal}">1024 x 768 x 3 = 2,359,296 B = 2.25 MiB - EXACTLY</text>`)
  s.push(`<rect x="${x0}" y="${y0}" width="${sq}" height="${sq}" fill="${C.struct}" stroke="${C.ink}" stroke-width="1.4"/>`)
  s.push(`<rect x="${x0 + sq + gap}" y="${y0}" width="${sq}" height="${sq}" fill="${C.teal}" stroke="${C.ink}" stroke-width="1.4"/>`)
  s.push(`<rect x="${x0 + 2 * (sq + gap)}" y="${y0}" width="${qs}" height="${qs}" fill="${C.conn}" stroke="${C.ink}" stroke-width="1.4"/>`)
  s.push(`<text x="${x0 + sq / 2}" y="${y0 + sq + 20}" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.ink}">1 MiB</text>`)
  s.push(`<text x="${x0 + sq + gap + sq / 2}" y="${y0 + sq + 20}" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.ink}">1 MiB</text>`)
  s.push(`<text x="${x0 + 2 * (sq + gap) + qs / 2}" y="${y0 + sq + 20}" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.ink}">quarter MiB</text>`)
  s.push(`<text x="470" y="${y0 + 18}" font-size="10.5" text-anchor="start" fill="${C.ink}">786,432 cells x 3 bytes</text>`)
  s.push(`<text x="470" y="${y0 + 40}" font-size="10.5" text-anchor="start" fill="${C.ink}">= 2,359,296 B</text>`)
  s.push(`<text x="470" y="${y0 + 62}" font-size="10.5" text-anchor="start" fill="${C.ink}">/ 1,048,576</text>`)
  s.push(`<text x="470" y="${y0 + 84}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${C.ink}">= 2.25 MiB, no rounding</text>`)
  s.push(`<text x="${W / 2}" y="${H - 12}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">the quarter block is half a side each way - a quarter of the area, 262,144 B</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - the UTF-8/UTF-16 costing strip for "ka = ka":      */
/* byte cells drawn to width (1 byte = 34 px).                          */
/* ------------------------------------------------------------------ */
function cf34Utf8CostStripSvg(): string {
  const W = 720
  const H = 216
  const unit = 34
  const cells = [
    { ch: 'k', b: 1 }, { ch: 'a', b: 1 }, { ch: 'sp', b: 1 }, { ch: '=', b: 1 }, { ch: 'sp', b: 1 }, { ch: 'ka', b: 3 },
  ]
  const u8total = cells.reduce((t, c) => t + c.b, 0) * unit
  const u8x0 = (W - u8total) / 2
  const u16w = 2 * unit
  const u16total = cells.length * u16w
  const u16x0 = (W - u16total) / 2
  const y8 = 72
  const h = 38
  const y16 = 148
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The costing strip for the six-character line k a space equals space ka, where ka stands for the Devanagari letter. The UTF-8 row has five one-byte cells and one three-byte cell, total 9 bytes. The UTF-16 row has six two-byte cells, total 12 bytes. Every code point of the line sits on the Basic Multilingual Plane, so UTF-16 charges 2 bytes each.">`)
  s.push(`<text x="${W / 2}" y="28" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${C.teal}">ONE LINE, TWO BILLS: k a sp = sp ka (ka = the Devanagari letter)</text>`)
  let cx = u8x0
  cells.forEach((c) => {
    const w = c.b * unit
    s.push(`<text x="${(cx + w / 2).toFixed(1)}" y="${y8 - 8}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">${c.ch}</text>`)
    s.push(`<rect x="${cx.toFixed(1)}" y="${y8}" width="${w}" height="${h}" rx="4" fill="${c.b === 3 ? C.accent : C.struct}" stroke="${C.ink}" stroke-width="1.2"/>`)
    s.push(`<text x="${(cx + w / 2).toFixed(1)}" y="${y8 + 24}" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.white}">${c.b} B</text>`)
    cx += w
  })
  s.push(`<text x="40" y="${y8 + 24}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${C.ink}">UTF-8</text>`)
  s.push(`<text x="${W - 40}" y="${y8 + 24}" font-size="10.5" text-anchor="end" font-weight="bold" fill="${C.ink}">9 bytes</text>`)
  cx = u16x0
  cells.forEach((c) => {
    s.push(`<text x="${(cx + u16w / 2).toFixed(1)}" y="${y16 - 8}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">${c.ch}</text>`)
    s.push(`<rect x="${cx.toFixed(1)}" y="${y16}" width="${u16w}" height="${h}" rx="4" fill="${C.teal}" stroke="${C.ink}" stroke-width="1.2"/>`)
    s.push(`<text x="${(cx + u16w / 2).toFixed(1)}" y="${y16 + 24}" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.white}">2 B</text>`)
    cx += u16w
  })
  s.push(`<text x="40" y="${y16 + 24}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${C.ink}">UTF-16</text>`)
  s.push(`<text x="${W - 40}" y="${y16 + 24}" font-size="10.5" text-anchor="end" font-weight="bold" fill="${C.ink}">12 bytes</text>`)
  s.push(`<text x="${W / 2}" y="${H - 12}" font-size="10" text-anchor="middle" fill="${C.tealInk}">the Devanagari cell rides the 3-byte class in UTF-8, but only 2 bytes in UTF-16</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - the Nyquist guard-band strip with the alias fold.  */
/* ------------------------------------------------------------------ */
function cf34GuardBandSvg(): string {
  const W = 720
  const H = 190
  const M = 16
  const ax0 = 56
  const ax1 = 664
  const F0 = 0
  const F1 = 24000
  const fx = (f: number): number => ax0 + ((f - F0) / (F1 - F0)) * (ax1 - ax0)
  const stripY = 84
  const stripH = 40
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Nyquist guard-band strip on a frequency axis from 0 to 24,000 hertz. Hearing spans 0 to 20,000 hertz. The CD sampling rate of 44,100 has Nyquist limit 22,050, so the band from 20,000 to 22,050 is a guard band of 2,050 hertz. A 23,000 hertz tone sampled at 44,100 folds back to 44,100 minus 23,000, which is 21,100 hertz - inside hearing, inside the guard band.">`)
  s.push(`<text x="${W / 2}" y="30" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${C.teal}">THE GUARD BAND: 22,050 - 20,000 = 2,050 Hz OF SAFETY</text>`)
  s.push(`<rect x="${fx(0).toFixed(1)}" y="${stripY}" width="${(fx(20000) - fx(0)).toFixed(1)}" height="${stripH}" fill="${C.panelB}" stroke="${C.ink}" stroke-width="1"/>`)
  s.push(`<rect x="${fx(20000).toFixed(1)}" y="${stripY}" width="${(fx(22050) - fx(20000)).toFixed(1)}" height="${stripH}" fill="${C.faint}" stroke="${C.ink}" stroke-width="1"/>`)
  s.push(`<rect x="${fx(22050).toFixed(1)}" y="${stripY}" width="${(fx(24000) - fx(22050)).toFixed(1)}" height="${stripH}" fill="${C.white}" stroke="${C.ink}" stroke-width="1"/>`)
  s.push(`<text x="${(fx(10000)).toFixed(1)}" y="${stripY + 24}" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.ink}">hearing: 20 Hz to 20,000 Hz</text>`)
  s.push(`<text x="${((fx(20000) + fx(22050)) / 2).toFixed(1)}" y="${stripY - 8}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">guard band 2,050 Hz</text>`)
  s.push(`<text x="${((fx(22050) + fx(24000)) / 2).toFixed(1)}" y="${stripY + 24}" font-size="9.5" text-anchor="middle" fill="${C.warn}">beyond</text>`)
  s.push(`<line x1="${fx(20000).toFixed(1)}" y1="${stripY + stripH}" x2="${fx(20000).toFixed(1)}" y2="${stripY + stripH + 10}" stroke="${C.ink}" stroke-width="1.4"/>`)
  s.push(`<line x1="${fx(22050).toFixed(1)}" y1="${stripY + stripH}" x2="${fx(22050).toFixed(1)}" y2="${stripY + stripH + 10}" stroke="${C.ink}" stroke-width="1.4"/>`)
  s.push(`<text x="${fx(0).toFixed(1)}" y="${stripY + stripH + 26}" font-size="9.5" text-anchor="middle" fill="${C.ink}">0</text>`)
  s.push(`<text x="${fx(20000).toFixed(1)}" y="${stripY + stripH + 26}" font-size="9.5" text-anchor="middle" fill="${C.ink}">20,000</text>`)
  s.push(`<text x="${fx(24000).toFixed(1)}" y="${stripY + stripH + 26}" font-size="9.5" text-anchor="middle" fill="${C.ink}">24,000 Hz</text>`)
  s.push(`<text x="${fx(22050).toFixed(1)}" y="${stripY + stripH + 44}" font-size="9.5" text-anchor="middle" fill="${C.accent}">22,050 - the Nyquist limit</text>`)
  const xa = fx(23000)
  const xb = fx(21100)
  s.push(`<circle cx="${xa.toFixed(1)}" cy="52" r="4" fill="${C.warn}" stroke="${C.ink}" stroke-width="1"/>`)
  s.push(`<circle cx="${xb.toFixed(1)}" cy="52" r="4" fill="${C.accent}" stroke="${C.ink}" stroke-width="1"/>`)
  s.push(`<path d="M ${xa.toFixed(1)} 52 Q ${((xa + xb) / 2).toFixed(1)} 68 ${xb.toFixed(1)} 52" fill="none" stroke="${C.warn}" stroke-width="1.6"/>`)
  s.push(`<text x="${((xa + xb) / 2 + 6).toFixed(1)}" y="46" font-size="9.5" text-anchor="middle" fill="${C.warn}">a 23,000 Hz tone folds to 21,100 Hz</text>`)
  s.push(`<text x="${W / 2}" y="${H - 10}" font-size="10" text-anchor="middle" fill="${C.tealInk}">44,100 - 23,000 = 21,100 Hz: the alias lands inside hearing - the guard band is the moat</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - the 2 GiB card fill: 59 photos of 36,000,000 B.    */
/* ------------------------------------------------------------------ */
function cf34CardFillSvg(): string {
  const W = 720
  const H = 162
  const M = 16
  const CAP = 2147483648
  const PHOTO = 36000000
  const n = 59
  const used = n * PHOTO
  const barX = 56
  const barW = 608
  const barY = 64
  const barH = 34
  const fillW = (used / CAP) * barW
  const tickStep = (10 * PHOTO / CAP) * barW
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The 2 GiB card as a fill bar of capacity 2,147,483,648 bytes. Fifty-nine photos of 36,000,000 bytes fill 2,124,000,000 bytes - 98.9 per cent of the bar - leaving a sliver of 23,483,648 bytes. Tick marks every ten photos. The sixtieth photo cannot fit.">`)
  s.push(`<text x="${W / 2}" y="30" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${C.teal}">HOW MANY 12 MP PHOTOS FIT ON A 2 GiB CARD?</text>`)
  s.push(`<text x="${barX}" y="${barY - 10}" font-size="10" text-anchor="start" fill="${C.tealInk}">2 GiB = 2,147,483,648 B</text>`)
  s.push(`<rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" rx="6" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`)
  s.push(`<rect x="${barX}" y="${barY}" width="${fillW.toFixed(1)}" height="${barH}" rx="6" fill="${C.struct}" stroke="${C.ink}" stroke-width="1.5"/>`)
  for (let k = 1; k <= 5; k++) {
    const x = barX + k * tickStep
    s.push(`<line x1="${x.toFixed(1)}" y1="${barY + barH}" x2="${x.toFixed(1)}" y2="${barY + barH + 7}" stroke="${C.ink}" stroke-width="1.2"/>`)
    s.push(`<text x="${x.toFixed(1)}" y="${barY + barH + 20}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">${k * 10}</text>`)
  }
  s.push(`<text x="${(barX + fillW / 2).toFixed(1)}" y="${barY + 22}" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.white}">59 photos x 36,000,000 B = 2,124,000,000 B</text>`)
  s.push(`<text x="${W - M}" y="${barY + barH + 20}" font-size="9.5" text-anchor="end" fill="${C.warn}">left over: 23,483,648 B</text>`)
  s.push(`<text x="${W / 2}" y="${H - 10}" font-size="10" text-anchor="middle" fill="${C.ink}">the 60th photo needs 36,000,000 B but only 23,483,648 remain - so 59 fit, with 98.9 per cent of the card used</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - the download bars: one minute of raw 1080p30 vs    */
/* the 14.93 minutes a 100 Mbit/s link needs to fetch it.               */
/* ------------------------------------------------------------------ */
function cf34DownloadBarsSvg(): string {
  const W = 720
  const H = 190
  const scale = 34
  const rows = [
    { y: 56, name: 'the video itself', mins: 1, txt: '1 minute', fill: C.teal },
    { y: 112, name: 'the download', mins: 14.92992, txt: '895.7952 s - about 14.93 minutes', fill: C.accent },
  ]
  const barX = 170
  const barH = 30
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two time bars. The video itself is one minute of raw 1080p30. The download of that minute over a 100 megabit per second link takes 895.7952 seconds, about 14.93 minutes, because the stream bills 1.492992 gigabits per second - 14.92992 lanes of the link. The download bar is about fifteen times longer than the video bar.">`)
  s.push(`<text x="${W / 2}" y="30" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${C.teal}">ONE MINUTE OF RAW 1080p30 ON A 100 Mbit/s LINK</text>`)
  rows.forEach((r) => {
    const w = r.mins * scale
    s.push(`<text x="16" y="${r.y + 20}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${C.ink}">${r.name}</text>`)
    s.push(`<rect x="${barX}" y="${r.y}" width="${w.toFixed(1)}" height="${barH}" rx="5" fill="${r.fill}" stroke="${C.ink}" stroke-width="1.4"/>`)
    if (r.mins === 1) {
      s.push(`<text x="${(barX + w + 10).toFixed(1)}" y="${r.y + 20}" font-size="10" text-anchor="start" font-weight="bold" fill="${C.ink}">${r.txt}</text>`)
    } else {
      s.push(`<text x="${(barX + w / 2).toFixed(1)}" y="${r.y + 20}" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.white}">${r.txt}</text>`)
    }
  })
  s.push(`<text x="${W / 2}" y="${H - 12}" font-size="10" text-anchor="middle" fill="${C.tealInk}">the stream bills 1.492992 Gbit/s - 14.92992 lanes of a 100 Mbit/s link, all day, every frame</text>`)
  s.push('</svg>')
  return s.join('')
}

/* __CF34_HELPERS__ */

export const lesson34: Lesson = {
  id: 'cf-text-images-and-sound-as-bits',
  number: '3.4',
  title: 'Text, Images and Sound as Bits',
  concepts: [
    'the media census: how many numbers, how fast',
    'the rate law: measurements per second x bytes each x channels',
    'UTF-8 and UTF-16 text bills',
    'resolution and bit depth for images',
    'sampling rate and the Nyquist limit for sound',
    'CD audio arithmetic: 44,100 samples per second',
    'MiB against MB: honest conversions',
  ],
  objectives: [
    'By the end of this lesson you can bill a text file in UTF-8 and UTF-16 from its character census and the class law.',
    'By the end of this lesson you can compute the byte census of any image from its resolution and bit depth, and convert it honestly between MB and MiB.',
    'By the end of this lesson you can compute the rate and size of sampled sound, and state and apply Nyquist\u2019s demand with the guard band.',
    'By the end of this lesson you can assemble the unified rate table and read off the ratios between typing, sound and video.',
    'By the end of this lesson you can explain, with numbers in hand, why compression \u2014 lesson 3.5 \u2014 had to be invented.',
  ],
  prerequisites: ['cf-codes-ascii-unicode-and-bcd', 'cf-output-devices-screens-printers-and-sound'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    /* ================================================================ */
    /* 1. THE CENSUS QUESTION                                            */
    /* ================================================================ */
    { kind: 'heading', text: 'The Census Question: How Many, How Fast' },
    { kind: 'para', text: 'Lesson 3.3 taught you the codes: ASCII names each English letter with a seven-bit number, Unicode numbers every character in the world, and BCD dresses decimal digits in four-bit nibbles. Lesson 2.2 walked the far boundary \u2014 the screen, the printer and the speaker \u2014 where numbers become light, ink and moving air. This lesson stands on the machine\u2019s side of that boundary and asks the two questions a working engineer asks of any medium once it has become numbers: how MANY numbers, and how FAST do they arrive?' },
    { kind: 'para', text: 'We shall call the asking a census. A medium never enters the machine as one number; it enters as a parade \u2014 characters, pixel values, loudness samples \u2014 and every parade has a head-count and a marching speed. The head-count decides whether the file fits the disc; the marching speed decides whether the wire can carry it live. Both answers come from the same three-factor multiplication, and this lesson is a tour of that multiplication wearing three uniforms: text, images and sound.' },
    { kind: 'para', text: 'Be clear about what this lesson is not. It is not about codes: which number names which character was lesson 3.3\u2019s ground, and we take it as read. It is not about compression: the craft of shortening these parades is lesson 3.5\u2019s ground \u2014 but by the end of this lesson you will know exactly why that craft was never a luxury. This lesson counts. Every number it prints is arithmetic you can check with a pencil: multiply the factors, divide by $1{,}024$ or $1{,}048{,}576$ when a binary dress is asked for, and read off the census.' },
    { kind: 'callout', tone: 'definition', title: 'Definition \u2014 the rate of a medium', text: '*The rate* of a medium is said to be the number of bytes per second the machine must swallow to keep up with that medium\u2019s parade of measurements. Symbolically, if $m$ measurements arrive each second, each riding $b$ bytes, on $c$ independent channels, then the rate is $r = m \\times b \\times c$ bytes per second. A *measurement* is one counted unit of the medium: one character, one colour-channel value of one pixel, one loudness sample of one channel.' },
    { kind: 'para', text: 'For example, the law already bills all three uniforms of this lesson:' },
    { kind: 'list', marker: 'roman', items: [
      'English typing at 60 words per minute: $5$ characters per second, each riding $1$ byte in UTF-8, on one channel \u2014 rate $5 \\times 1 \\times 1 = 5$ B/s.',
      'CD stereo audio: $44{,}100$ samples per second, each riding $2$ bytes, on two channels \u2014 rate $44{,}100 \\times 2 \\times 2 = 176{,}400$ B/s.',
      'Uncompressed 1080p30 video: $62{,}208{,}000$ pixel-channel values per second, each riding $1$ byte, on three colour channels \u2014 rate $62{,}208{,}000 \\times 1 \\times 3 = 186{,}624{,}000$ B/s.',
    ] },
    { kind: 'equation', latex: '\\text{rate} = (\\text{measurements per second}) \\times (\\text{bytes per measurement}) \\times \\text{channels} \\tag{1}', note: 'The census law of this lesson. Text, images and sound differ only in what a \u201cmeasurement\u201d is; the billing never changes.' },
    { kind: 'derivation', title: 'Deriving the rate law', statement: 'Every medium that reaches the machine as a number stream is billed per second by the same three-factor product. We derive the law once, in the abstract, so that the three sections that follow only ever rename the factors.', steps: [
      { label: 'Count the measurements', formula: 'm \\;\\text{measurements per second}', explanation: 'One measurement is one counted unit of the medium: a character, a colour-channel value of a pixel, a loudness sample of a channel.' },
      { label: 'Cost each measurement', formula: 'b \\;\\text{bytes per measurement}', explanation: 'The cost is fixed by the encoding or the depth: an ASCII character rides 1 byte, a CD sample rides 2, an 8-bit gray cell rides 1.' },
      { label: 'Count the channels', formula: 'c \\;\\text{independent streams}', explanation: 'Stereo sound carries two channels; an RGB pixel carries three colour channels; plain text carries one.' },
      { label: 'Assemble the product', formula: 'r = m \\times b \\times c', explanation: 'Bytes per second is a count times a cost times a channel count \u2014 a straight product with no hidden terms.' },
    ], result: 'Hence the rate of any medium is $m \\times b \\times c$ bytes per second \u2014 one multiplication for every medium in this lesson, and the whole of the census question.' },
    { kind: 'callout', tone: 'insight', title: 'One multiplication, three uniforms', text: 'Nothing in the law cares what the measurements measure. Characters at five per second, samples at 44,100 per second, pixel-channel values at 62,208,000 per second \u2014 the billing is identical. When an examination asks for the size of a sound file or the rate of a video stream, it is asking for this one product; only the factor names change. Own the law once and you own the whole lesson.' },
    { kind: 'formula', name: 'The rate law (all media)', latex: 'r = m \\times b \\times c', note: 'Measurements per second, bytes each, channels \u2014 the one multiplication behind every census in this lesson.' },

    /* ================================================================ */
    /* 2. TEXT — THE LIGHT ONE                                           */
    /* ================================================================ */
    { kind: 'heading', text: 'Text: the Light One' },
    { kind: 'para', text: 'Start with text, because you already own its codes from lesson 3.3. A text file is a row of code points in an agreed encoding; its census is a head-count times a byte width, and the only new skill is billing honestly \u2014 the same character costs different amounts in different encodings, and the bill IS the file size. Two encodings carry the practical world, and they split the bill differently.' },
    { kind: 'para', text: 'UTF-8 gives every ASCII character exactly 1 byte, so ordinary English rides at one byte per character. UTF-16 gives every character on the Basic Multilingual Plane exactly 2 bytes, whatever script it belongs to. Neither dress is \u201cbetter\u201d. UTF-8 is lean for English and costlier for most other scripts; UTF-16 is even-handed across the plane that carries the world\u2019s living scripts, and charges 4 bytes (a surrogate pair) only for the rare astral characters. The census question \u2014 how many bytes is this essay? \u2014 therefore has two honest answers, and a working engineer always asks \u201cin which dress?\u201d before answering.' },
    { kind: 'example', title: 'Illustration 1. A 5,000-character English essay in both dresses', steps: [
      'Take the essay: 5,000 characters of ordinary English, so every code point sits in the ASCII class \u2014 the 1-byte class of the table below.',
      'Bill UTF-8: one byte per character, so the file is $5{,}000 \\times 1 = 5{,}000$ bytes.',
      'Now, bill UTF-16: every code point of plain English is on the Basic Multilingual Plane, so each rides 2 bytes: $5{,}000 \\times 2 = 10{,}000$ bytes.',
      'So, the dress change doubles the bill: $10{,}000 \\div 5{,}000 = 2$.',
      'Convert to the binary dress: $5{,}000 \\div 1{,}024 = 4.8828125$ KiB and $10{,}000 \\div 1{,}024 = 9.765625$ KiB \u2014 both exact, no rounding.',
      'Hence the essay costs 5,000 B in UTF-8 and 10,000 B in UTF-16 \u2014 both bills inside a 10 KiB envelope. Text is the light one.',
    ] },
    { kind: 'para', text: 'Notice what the Illustration did not need: no new theory, only the rate law with its factors renamed. Notice also the exactness of the binary dress \u2014 4.8828125 and 9.765625 KiB are terminating decimals because 5,000 and 10,000 divide cleanly by the powers of two. When a file size does not land so neatly, the honest answer keeps the fraction rather than rounding it away. Text is so light that both bills fit inside a single 10 KiB envelope; hold that thought, because the next section spends that much on a thumbnail.' },
    { kind: 'para', text: 'English is the cheapest script to dress in UTF-8 because ASCII was handed the whole 1-byte class. Step outside ASCII once and the bill changes. Take the Devanagari letter \u0915 \u2014 the first consonant of the Hindi alphabet, code point U+0915, the number 2,325. Its UTF-8 dress is 3 bytes, and the three bytes on the wire are E0 A4 95: the lead byte E0 announces \u201ca 3-byte character follows\u201d, and the two continuation bytes A4 95 carry the payload. The class law behind this is worth owning cold, and it is a short table.' },
    { kind: 'table', caption: 'Table 1. The UTF-8 class law \u2014 the costing instrument for every text census.', head: ['Class', 'Code points covered', 'Witness from this lesson', 'UTF-8 bytes'], rows: [
      ['1', 'up to $7F$ (127)', 'the letter A, code point 65', '1'],
      ['2', '$80$ to $7FF$ (2,047)', 'the letter \u00e9, code point 233', '2'],
      ['3', '$800$ to $FFFF$ (65,535)', 'the Devanagari letter \u0915, code point 2,325 (U+0915)', '3'],
      ['4', '$10{,}000$ and above', 'the smile, code point 128,512 (U+1F600)', '4'],
    ] },
    { kind: 'para', text: 'Read the table as a costing instrument. Any character\u2019s UTF-8 bill is fixed by which class its code point falls in \u2014 nothing else matters, not the language, not the meaning, not the font. So a file\u2019s census is a class-by-class costing, which is exactly what the algorithm below performs; and a mixed line \u2014 a little English, an accented letter, a Devanagari word, an emoji \u2014 must be billed piece by piece, as the next Illustration shows.' },
    { kind: 'example', title: 'Illustration 2. One mixed line, two bills', steps: [
      'Take the line caf\u00e9 \u0915 \ud83d\ude00 \u2014 that is c, a, f, \u00e9, space, \u0915, space and the smile: eight code points in all.',
      'Sort them into classes: c, a, f and the two spaces are ASCII (1 byte each); \u00e9 rides 2 bytes; \u0915 rides 3; the smile rides 4.',
      'Bill UTF-8: $1 + 1 + 1 + 2 + 1 + 3 + 1 + 4 = 14$ bytes for the eight characters.',
      'Now, bill UTF-16: the seven BMP code points ride 2 bytes each, and the astral smile rides a surrogate pair: $7 \\times 2 + 4 = 18$ bytes.',
      'Check the ratio: $18 \\div 14$ is about 1.29 \u2014 nothing like the 2 of pure English, because the mix sets the ratio.',
      'Hence the same line costs 14 B in UTF-8 and 18 B in UTF-16 \u2014 a class-by-class costing, not a single multiplier.',
    ] },
    { kind: 'para', text: 'The two dresses do not even keep a fixed ratio: 14 against 18 for this line, 5,000 against 10,000 for pure English, 15,000 against 10,000 for pure Devanagari. The mix sets the ratio. That is the honest answer to a question beginners often get wrong \u2014 \u201cis UTF-16 always twice UTF-8?\u201d \u2014 no; it is twice only for pure ASCII text, and for a Hindi passage it is UTF-8 that pays the premium, as the next Illustration bills.' },
    { kind: 'example', title: 'Illustration 3. The same essay in Hindi', steps: [
      'Take a 5,000-character Devanagari passage: every letter a code point in the 3-byte class, like \u0915 at U+0915.',
      'Bill UTF-8: $5{,}000 \\times 3 = 15{,}000$ bytes \u2014 three times the English essay\u2019s UTF-8 bill.',
      'Now, bill UTF-16: Devanagari sits on the Basic Multilingual Plane, so each letter rides 2 bytes: $5{,}000 \\times 2 = 10{,}000$ bytes \u2014 the same as the English essay\u2019s UTF-16 bill.',
      'So, the dresses swap winners: UTF-8 wins for English, 5,000 against 10,000; UTF-16 wins for Hindi, 10,000 against 15,000.',
      'Hence no encoding is globally cheapest \u2014 the census follows the script \u2014 and the world standardised on UTF-8 anyway, because English-dominant traffic is the bulk and ASCII compatibility came free.',
    ] },
    { kind: 'para', text: 'The costing above is mechanical enough to write down as a procedure, and every serious system performs exactly this walk when it reports a file\u2019s size. Here it is as an algorithm; run it by hand on any line and the bill falls out.' },
    { kind: 'algorithm', title: 'Size a text file (the UTF-8 census)', lines: [
      { code: 'count every code point of the text  ->  n', note: 'spaces and punctuation count; an honest census or nothing' },
      { code: 'sort the code points into the four classes', note: 'class 1 up to 7F, class 2 to 7FF, class 3 to FFFF, class 4 above' },
      { code: 'bill each class:  count x width', note: 'widths 1, 2, 3 and 4 bytes in class order' },
      { code: 'total = sum of the class bills', note: 'this is the file size in UTF-8 bytes' },
      { code: 'for UTF-16:  2 x (BMP points) + 4 x (astral points)', note: 'the mixed line of Illustration 2: 7 x 2 + 4 = 18 bytes' },
      { code: 'convert on request:  / 1024 -> KiB,  / 1048576 -> MiB', note: 'say which kilo you mean \u2014 examinations dock marks for the slip' },
    ], note: 'One pass over the text and one multiplication per class: the census terminates after n reads and at most four multiplications.' },
    { kind: 'para', text: 'Now turn the head-count into a marching speed. Text reaches the machine at typing speed when a human writes it and at reading speed when you scroll; the census question \u201chow fast?\u201d has a human-scale answer, and it is worth one worked line before the heavy media arrive.' },
    { kind: 'example', title: 'Illustration 4. A typist\u2019s marching speed', steps: [
      'Take a fair typist: 60 words per minute at the printer\u2019s convention of 5 characters per word.',
      'Convert: $60 \\times 5 = 300$ characters per minute, hence $300 \\div 60 = 5$ characters per second.',
      'Now, apply the rate law in UTF-8: $5$ per second, 1 byte each, one channel \u2014 a rate of 5 B/s.',
      'In UTF-16 the same typist feeds $5 \\times 2 \\times 1 = 10$ B/s; typing Devanagari in UTF-8 feeds $5 \\times 3 \\times 1 = 15$ B/s.',
      'Hence even the heaviest typing trickles at 15 B/s \u2014 and CD sound, at 176,400 B/s, swallows the English stream 35,280 times over. Text is the light one by four orders of magnitude.',
    ] },
    { kind: 'example', title: 'Illustration 5. An SMS-length message', steps: [
      'Take a 250-character message \u2014 the length of a long SMS.',
      'Bill UTF-8 (plain English): $250 \\times 1 = 250$ bytes.',
      'Now, bill UTF-16: $250 \\times 2 = 500$ bytes.',
      'So, even doubled the bill is half a KiB \u2014 $500 \\div 1{,}024$ is about 0.49 KiB.',
      'Hence text is the light one: whole paragraphs cost less than a single row of a 1080p frame, which bills $1{,}920 \\times 3 = 5{,}760$ B.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why text is the medium compression forgot', text: 'A 5,000-character essay costs 5,000 bytes in UTF-8 \u2014 under 5 KiB, a bill so small that no engineer has ever compressed an essay for its own sake. The photograph in the next section costs 36,000,000 bytes: 7,200 essays in one snapshot. Compression was invented for the heavy media; text merely rides along in their algorithms. When lesson 3.5 shows you a 36 MB photo squeezed onto a phone, remember this ratio.' },
    { kind: 'callout', tone: 'warn', title: 'Caution \u2014 count code points, not keystrokes or glyphs', text: 'The text census counts code points. A Hindi syllable that prints as one glyph may ride several code points \u2014 the consonant, its matras, its virama \u2014 and each is billed separately. Conversely a keystroke on your keyboard may expand into a combining sequence. And the one-character-one-byte law died with ASCII: in UTF-8 a character rides 1, 2, 3 or 4 bytes by class, and in UTF-16 an astral character rides 4. State the encoding before you state the size, every time.' },
    { kind: 'para', text: 'Text trickles; pictures pour. The moment the medium becomes spatial \u2014 a grid that must be filled at every cell \u2014 the census explodes from thousands to billions, and the same rate law, unchanged, will measure the explosion. Turn now to the pixel grid.' },
    /* ================================================================ */
    /* 3. IMAGES — THE PIXEL GRID                                         */
    /* ================================================================ */
    { kind: 'heading', text: 'Images: the Pixel Grid' },
    { kind: 'para', text: 'Text was a parade with a head-count you could hold in your head. The moment the medium becomes spatial — a picture, a screen, a photograph — the head-count explodes, because a picture is not one measurement but a GRID of measurements, and the machine must fill every cell of that grid before the eye sees anything at all. Lesson 2.2 showed you the screen from the outside: rows and columns of dots lit by numbers. Now stand inside the file. Two numbers fix an image census completely, and you have met the shape of both already.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — resolution and bit depth', text: '*The resolution* of an image is said to be the census of its cells — the number of pixel columns times the number of pixel rows, written width × height. The *bit depth* is the byte-cost of one channel value of one cell: how many bits the file spends to name the loudness of one colour of one pixel. An 8-bit gray cell spends 8 bits on one loudness; a 24-bit RGB cell spends 8 bits on each of three colours.' },
    { kind: 'para', text: 'Read the two depth families honestly, in powers of two. An 8-bit gray cell names $2^8 = 256$ levels of light — 256 steps from black to white, which the eye reads as smooth. A 24-bit RGB cell names $2^{24} = 16{,}777{,}216$ colours, because each of the three channels independently picks one of its own 256 levels: $256 \\times 256 \\times 256$. Sixteen million colours is far more than the eye can distinguish, which is exactly why 24-bit became the working standard — it is the depth at which a colour ramp stops banding. The census of a stored image is therefore a multiplication you can write in one line, and it is the same rate law with its factors renamed.' },
    { kind: 'equation', latex: '\\text{image bytes} = \\text{width} \\times \\text{height} \\times \\text{channels} \\times \\text{bytes per channel value} \\tag{2}', note: 'The image census. Gray: channels 1, one byte each. RGB: channels 3, one byte each. Nothing else enters the bill.' },
    { kind: 'example', title: 'Illustration 6. One 1080p frame, billed', steps: [
      'Take the census first: a 1080p frame is a grid of $1{,}920 \\times 1{,}080$ cells, so $1{,}920 \\times 1{,}080 = 2{,}073{,}600$ pixels.',
      'Cost each cell: RGB bills three bytes per pixel — one per colour channel — so the frame is $2{,}073{,}600 \\times 3 = 6{,}220{,}800$ bytes.',
      'Convert to the binary dress: $6{,}220{,}800 \\div 1{,}048{,}576 = 5.9326171875$ MiB, exactly, with no rounding.',
      'Now, the decimal dress: $6{,}220{,}800 \\div 1{,}000{,}000 = 6.2208$ MB — a different number for the very same bytes.',
      'Check against the essay envelope: $6{,}220{,}800 \\div 10{,}240 = 607.5$ — one frame outweighs 607 of the 10 KiB envelopes that held the whole 5,000-character essay.',
      'Hence one 1080p frame bills 6,220,800 B — 5.9326171875 MiB, or 6.2208 MB — and text is the light one by three orders of magnitude.',
    ] },
    { kind: 'figure', caption: 'Figure 1. The pixel grid zoomed: an image is a grid of cells, and one RGB cell opens up into three byte-cells — R, G and B, eight bits each. One byte names 256 levels, so the three together name $256 \\times 256 \\times 256 = 2^{24} = 16{,}777{,}216$ colours; a gray cell needs only one byte and names 256.', svg: cf34PixelZoomSvg() },
    { kind: 'para', text: 'Stop on those two dresses for a moment, because examinations dock marks for confusing them, and so do shop floors. One mebibyte is $1{,}048{,}576$ bytes — twenty to the twentieth — while one megabyte is $1{,}000{,}000$. The gap is $48{,}576$ bytes on every megabyte, that is 4.8576 per cent, and it grows with the prefix: a gibibyte overshoots a gigabyte by about 7.4 per cent. The 1080p frame wears 5.9326171875 MiB in the binary dress and 6.2208 MB in the decimal dress, and both answers are correct — the only error is quoting one while meaning the other. Memory chips are sold in binary sizes and discs in decimal ones, which is why a "2 GB" card holds fewer files than the box arithmetic promised your cousin.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — name your mega before you divide', text: 'A size in MB is NOT a size in MiB. Before converting, ask which kilo the question means: divide by $1{,}024$ for KiB, by $1{,}048{,}576$ for MiB, by $1{,}000$ and $1{,}000{,}000$ for the decimal dresses. And when a file size lands on a terminating decimal — 5.9326171875 MiB — keep every digit in the working: the trailing digits are the fingerprint of an exact division by a power of two, and rounding them away hides the exactness the examiner asked you to show.' },
    { kind: 'para', text: 'A frame is a still picture. Video is the same census marched against the clock: thirty grids arrive every second at the 30-frames-per-second standard, so the pixel parade runs at nearly sixty-three million cells per second — and the rate law, unchanged, turns that head-count into the firehose. Derive it once, formally, so the number is yours rather than quoted.' },
    { kind: 'derivation', title: 'Deriving the video firehose from the rate law', statement: 'Uncompressed 1080p30 video is the heaviest stream this lesson meets. We derive its rate from the census law alone, renaming the three factors exactly as the law demands — no new theory, only a grid and a clock.', steps: [
      { label: 'Count the measurements per second', formula: 'm = 1920 \\times 1080 \\times 30 = 62{,}208{,}000', explanation: 'A frame is a grid of cells; thirty grids arrive each second, so the cell parade runs at sixty-two million measurements per second.' },
      { label: 'Cost each measurement', formula: 'b = 1 \\text{ byte}', explanation: 'Each channel value of each cell is one 8-bit byte — 256 levels per channel, the depth fixed in the definition above.' },
      { label: 'Count the channels', formula: 'c = 3', explanation: 'Red, green and blue ride as three independent channel streams — the colour census of Figure 1.' },
      { label: 'Assemble the product', formula: 'r = 62{,}208{,}000 \\times 1 \\times 3 = 186{,}624{,}000 \\;\\text{B/s}', explanation: 'The census law with its factors renamed: one hundred eighty-six million bytes every second, forever.' },
      { label: 'Dress the rate for the wire', formula: '186{,}624{,}000 \\times 8 = 1{,}492{,}992{,}000 \\;\\text{bit/s}', explanation: 'Wires carry bits, not bytes, so multiply by eight: 1.492992 Gbit/s — the firehose number of this lesson.' },
    ], result: 'Hence raw 1080p30 video bills $186{,}624{,}000$ bytes per second — $1.492992$ Gbit/s — from nothing but $m \\times b \\times c$ with the factors renamed.' },
    { kind: 'example', title: 'Illustration 7. The firehose, against a home wire', steps: [
      'Take the rate just derived: $186{,}624{,}000$ B/s of pixels, live.',
      'Convert to bits: $186{,}624{,}000 \\times 8 = 1{,}492{,}992{,}000$ bit/s, that is 1.492992 Gbit/s.',
      'Check against a 100 Mbit/s home link: $1{,}492{,}992{,}000 \\div 100{,}000{,}000 = 14.92992$ — the stream needs almost fifteen such links running at once.',
      'Now, one minute of it: $186{,}624{,}000 \\times 60 = 11{,}197{,}440{,}000$ B, about 10.4 GiB of storage per minute of picture.',
      'So, a two-hour film stored raw would bill over a terabyte — which is why no shop has ever sold a film in this dress.',
      'Hence uncompressed 1080p30 video bills 186,624,000 B/s — the honest shock number that makes compression a necessity rather than a luxury.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why the firehose matters more than the frame', text: 'Any single number in this section can surprise once; the firehose is the one that DECIDES things. It decides that uncompressed video cannot cross a home network live (fifteen links short), that no disc ever shipped a raw film, and that every camera you own quietly compresses before the file touches storage. When lesson 3.5 opens, hold 186,624,000 B/s in one hand and the size of a film file you have actually downloaded in the other: the gap between those two numbers is the entire subject matter of that lesson.' },
    { kind: 'para', text: 'Photographs hold still, so they escape the clock — but the grid itself is big enough. A modern phone camera census runs to twelve megapixels, and the multiplication below is the whole cost of one snapshot. Notice how the work divides: a census (width times height), a depth cost (times three), and a dress conversion. You have done every piece of it already; only the numbers are new.' },
    { kind: 'example', title: 'Illustration 8. A 12-megapixel photograph', steps: [
      'Take the sensor census: 12 megapixels arranged as $4{,}000 \\times 3{,}000 = 12{,}000{,}000$ cells.',
      'Cost each cell at three bytes: $12{,}000{,}000 \\times 3 = 36{,}000{,}000$ B.',
      'Convert: $36{,}000{,}000 \\div 1{,}048{,}576 = 34.332275390625$ MiB exactly; the decimal dress is simply 36 MB.',
      'Check against the essay: $36{,}000{,}000 \\div 5{,}000 = 7{,}200$ — one snapshot outweighs 7,200 of the UTF-8 essays of section 2.',
      'Now, against a 1080p frame: $12{,}000{,}000 \\div 2{,}073{,}600 = 5.787$ frames, to three decimals — the photo is nearly six frames deep.',
      'Hence one photograph bills 36,000,000 B — 34.332275390625 MiB — and a holiday camera roll eats gigabytes in an afternoon without ever moving.',
    ] },
    { kind: 'para', text: 'One more image skill and the section is complete: comparing grids. Screen names are census names — 720p, 1080p, 4K — and the honest comparison is never side-by-side but cell-by-cell, which is to say area against area. The trap is to double one side in your head and conclude the census doubled. It did not. Areas multiply their side ratios, and the small whole numbers that fall out of this are an examination favourite.' },
    { kind: 'example', title: 'Illustration 9. 720p against 1080p: the 2.25 law', steps: [
      'Take the two grids: 720p is $1{,}280 \\times 720 = 921{,}600$ cells; 1080p is $1{,}920 \\times 1{,}080 = 2{,}073{,}600$ cells.',
      'Divide the censuses: $2{,}073{,}600 \\div 921{,}600 = 2.25$ — exactly 2.25, not 2 and not 4.',
      'Now, see where 2.25 comes from: each side grows by $1{,}920 \\div 1{,}280 = 1{,}080 \\div 720 = 1.5$, and $1.5 \\times 1.5 = 2.25$ — the area ratio is the product of the side ratios.',
      'Check the law backwards: halve each side of 1080p and you get $960 \\times 540 = 518{,}400$ cells, one quarter of $2{,}073{,}600$ — the ×4 law first met in lesson 2.1 returns.',
      'Now, the common laptop panel $1{,}366 \\times 768 = 1{,}049{,}088$ cells: 127,488 more than 720p, and a hair over half of 1080p, since half of $2{,}073{,}600$ is $1{,}036{,}800$.',
      'Hence 1080p carries 2.25 times the cells of 720p — sides ×1.5 each way, census ×2.25 — and four whole 800 × 600 frames, $4 \\times 480{,}000 = 1{,}920{,}000$ cells, still fit inside one 1080p frame with 153,600 cells to spare.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The ×4 law (side-halving form)', text: 'If each side of a rectangular grid is divided by $k$, the cell census is divided by $k^2$. Halving both sides quarters the census: $2 \\times 2 = 4$. This is the same law that doubled the essay bill in section 2 and quarters the frame here — one rule, every uniform. It is why shrinking a photo to half size on each side saves 75 per cent of the bytes, and why "just make it smaller" is the oldest compression trick in the world.' },
    { kind: 'formula', name: 'The image census', latex: '\\text{bytes} = W \\times H \\times \\text{channels} \\times b', note: 'Width, height, colour channels, bytes per channel value. Gray is channels 1 at 1 byte; RGB is channels 3 at 1 byte each.' },
    { kind: 'para', text: 'Notice what the whole section never needed: a new law. Resolution renamed the head-count, bit depth renamed the cost, colour channels renamed the channels — and equation (2) is equation (1) wearing a coat. Now the medium loses its grid and gains a clock: sound arrives not as cells but as measurements of a moving wave, taken at a marching pace the engineer chooses. The census law will not even notice the change.' },
    /* ================================================================ */
    /* 4. SOUND — THE SAMPLING METER                                      */
    /* ================================================================ */
    { kind: 'heading', text: 'Sound: the Sampling Meter' },
    { kind: 'para', text: 'Sound refuses both of the crutches the other media lean on. It has no character list to count, because a wave is continuous — every instant of it has a loudness, all the way down between the ticks of any clock. And it has no grid to fill, because it flows rather than spreads. So the machine does the only honest thing available: it MEASURES the wave at regular intervals, keeps the list of measurements, and throws the wave away. That act is sampling, and it is the third and last way a medium becomes numbers.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — sampling and the sampling rate', text: '*Sampling* is said to be the act of measuring a wave\'s loudness at equal intervals of time and keeping only the measured list. The *sampling rate* is the census of that list per second — how many measurements the meter takes each second, written $f_s$ and measured in hertz. Each measurement, or *sample*, rides a fixed byte width fixed by the bit depth, on each channel of the recording.' },
    { kind: 'para', text: 'One demand governs the choice of rate, and it is worth owning cold even though this lesson states it without proof. Sample too slowly and the wave\'s true shape is lost — worse, it is not merely lost but COUNTERFEITED: the samples line up just as happily under a slower wave that was never played, an impostor called an alias. The sampling theorem of Harry Nyquist draws the line: a rate must exceed twice the highest frequency you wish to carry. We state it as a law of the house.' },
    { kind: 'callout', tone: 'theorem', title: 'Nyquist\'s demand', text: 'To carry a wave whose highest frequency is $f$, the sampling rate must be strictly greater than $2f$. Human hearing runs from about 20 Hz to 20,000 Hz, so honest audio must sample at MORE than $2 \\times 20{,}000 = 40{,}000$ measurements per second. Sample at or below the line and frequencies above the limit fold back into the audible range as aliases — new, wrong tones. The proof belongs to the signal-processing shelf; the demand itself is the working rule.' },
    { kind: 'para', text: 'Now the numbers can be honest. CD audio samples at 44,100 per second — above the 40,000 Nyquist demands, with room to spare. That room is the guard band: the sampling limit is $44{,}100 \\div 2 = 22{,}050$ Hz, and hearing tops out at 20,000 Hz, leaving $22{,}050 - 20{,}000 = 2{,}050$ Hz of safety margin. The margin is not decoration. Real recordings pass through equipment that leaks energy above hearing; the guard band is the moat that catches it before it folds back as an audible forgery. And each sample rides 16 bits — 2 bytes — on each of two stereo channels, so the rate law closes with no ceremony at all.' },
    { kind: 'figure', caption: 'Figure 2. The sampling meter: the smooth wave of three cycles, sampled at 24 equal intervals — eight dots per cycle. The machine keeps only the dot heights, one number per dot. Below, the CD census that fills the same meter in real life: 294 PAL active lines × 50 fields × 3 samples per line = 44,100 samples/s, each riding 2 bytes on 2 channels.', svg: cf34SamplingMeterSvg() },
    { kind: 'example', title: 'Illustration 10. One second of CD sound', steps: [
      'Take the CD sampling census: $44{,}100$ samples per second, each riding $2$ bytes of 16-bit depth, on $2$ stereo channels.',
      'Assemble the rate law: $44{,}100 \\times 2 \\times 2 = 176{,}400$ B/s.',
      'Dress the rate for the wire: $176{,}400 \\times 8 = 1{,}411{,}200$ bit/s, that is 1411.2 kbit/s — the figure printed on every CD specification sheet.',
      'Check the spacing: $1{,}000{,}000 \\div 44{,}100 \\approx 22.7$ — samples sit about 22.7 microseconds apart.',
      'Now, the top of hearing: one 20,000 Hz cycle lasts 50 microseconds, and $44{,}100 \\div 20{,}000 = 2.205$ dots land on each such cycle.',
      'Hence one second of CD stereo bills 176,400 B — 1,411,200 bit/s on the wire — measured 44,100 times a second, twice over for the two ears.',
    ] },
    { kind: 'equation', latex: '\\text{sound rate} = f_s \\times b \\times c \\tag{3}', note: 'The sound census. Samples per second, bytes per sample, channels — equation (1) once more, wearing headphones.' },
    { kind: 'para', text: 'A rate becomes a bill the moment you multiply by time, and the CD\'s designers aimed the disc at a whole evening, not a second. The arithmetic stacks in the same order every time: rate, then seconds, then the binary dress. Work it once for the full 74-minute disc — the size the format was literally built to hold — and you have priced an album.' },
    { kind: 'example', title: 'Illustration 11. The full 74-minute disc', steps: [
      'Take the minute first: $176{,}400 \\times 60 = 10{,}584{,}000$ B per minute of stereo sound.',
      'Now, the whole disc: 74 minutes is $74 \\times 60 = 4{,}440$ s of parade.',
      'Multiply: $4{,}440 \\times 176{,}400 = 783{,}216{,}000$ B on one disc.',
      'Convert: $783{,}216{,}000 \\div 1{,}048{,}576 = 746.9329833984375$ MiB exactly; the decimal dress is 783.216 MB.',
      'Check the scale: $783{,}216{,}000 \\div 5{,}000 = 156{,}643.2$ — one disc holds about 156,643 of the 5,000-character essays, a library wing on a platter.',
      'Hence the full 74-minute disc bills 783,216,000 B — 746.9329833984375 MiB — and the rate law has now priced an entire album.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the fold-back is audible, not silent', text: 'Sampling below the line does not blur the sound; it FALSIFIES it. A 23,000 Hz tone — inaudible by itself — sampled at 44,100 folds back to $44{,}100 - 23{,}000 = 21{,}100$ Hz, which sits inside your hearing, inside the guard band, as a phantom whistle. Engineers spend real money on filters precisely to keep out-of-band energy out of the meter. When a question asks WHY the rate must exceed twice the top frequency, "or the sound degrades" is half an answer; the full answer is "or aliases fold back into hearing as new, wrong tones".' },
    { kind: 'callout', tone: 'historical', title: 'Where 44,100 comes from — an honest retelling', text: 'The strangest number in this lesson was inherited from video tape. In 1979 there was no cheap digital audio medium, so studios used Sony\'s PCM-1600 PCM adaptor to write digital sound onto U-matic VIDEO cassette tape — a video recorder doing an audio job. The adaptor could only place samples where the video format had room: on the active picture lines. PAL video carries 294 usable lines per field, 50 fields per second, with 3 samples packed on each line — $294 \\times 50 \\times 3 = 44{,}100$ — and the NTSC world landed on the same figure by its own road, $245 \\times 60 \\times 3$. When Sony and Philips sat down in 1980 to write the Red Book CD standard, that video-tape rate was already the studio norm, so it shipped in the disc. The same standard settled a depth argument: Sony\'s 16-bit depth — $2^{16} = 65{,}536$ loudness levels — won over Philips\' 14-bit, $2^{14} = 16{,}384$ levels, four times coarser. The Sony CDP-101, the first CD player, went on sale on 1 October 1982, and Billy Joel\'s 52nd Street was the first album released on CD. The 74-minute capacity is its own legend — long associated with a performance of Beethoven\'s Ninth that Sony\'s president reportedly wanted to fit whole — though engineers of the period give as much weight to the playing time the disc diameter simply allowed.' },
    { kind: 'figure', caption: 'Figure 3. The CD timeline, computed to the month: 1979, the Sony PCM-1600 adaptor writing digital sound onto U-matic video tape (and fixing 44,100 with it); 1980, the Red Book standard agreed by Sony and Philips, 16-bit depth beating 14-bit; 1 October 1982, the Sony CDP-101 ships and Billy Joel\'s 52nd Street becomes the first album on CD.', svg: cf34CdTimelineSvg() },
    { kind: 'example', title: 'Illustration 12. The triple product, checked cold', steps: [
      'Take the PAL frame budget: 294 active lines per field, 3 samples packed on each line.',
      'Count the lines per second: $294 \\times 50 = 14{,}700$ lines — fifty fields a second, PAL\'s marching pace.',
      'Multiply in the samples: $14{,}700 \\times 3 = 44{,}100$ samples per second — the number the CD inherited from the tape.',
      'Check the NTSC cousin: $245 \\times 60 \\times 3 = 44{,}100$ as well — both video systems landed on the same audio rate, which is why the choice survived the ocean.',
      'Now, the margin: the sampling limit is $44{,}100 \\div 2 = 22{,}050$ Hz, and $22{,}050 - 20{,}000 = 2{,}050$ Hz of guard band above hearing.',
      'Hence 44,100 = 294 × 50 × 3 — an audio rate born from a video tape\'s line budget, wearing a 2,050 Hz safety margin it never removed.',
    ] },
    { kind: 'formula', name: 'The sound census', latex: 'r = f_s \\times b \\times c', note: 'Sampling rate in samples per second, bytes per sample, channels. CD stereo: 44,100 × 2 × 2 = 176,400 B/s.' },
    { kind: 'para', text: 'Three media, one multiplication, and every number in this lesson so far has been a renaming of it. What remains is to see the three uniforms standing in one line — which is also the shape of the examination question, and the honest doorstep to the next lesson. Lay the table.' },
    /* ================================================================ */
    /* 5. THE UNIFIED TABLE — ONE MULTIPLICATION FOR ALL                  */
    /* ================================================================ */
    { kind: 'heading', text: 'The Unified Table: One Multiplication for All' },
    { kind: 'para', text: 'Here is the spine of the lesson, laid flat. Every row is the same product — measurements per second, bytes each, channels — and the only thing that changes down the table is what a "measurement" is. Read each row aloud as a sentence and you will find you have already worked it: the table is a revision sheet, not new ground. Note the two typist rows and the two sound rows — they show how a single factor change (the dress, the channel count) moves the bill while everything else stands still.' },
    { kind: 'table', caption: 'Table 2. The unified rate table — one multiplication for every medium in this lesson.', head: ['Medium', 'Measurements/s', 'Bytes each', 'Channels', 'Rate (B/s)'], rows: [
      ['English typing, UTF-8', '5', '1', '1', '5'],
      ['English typing, UTF-16', '5', '2', '1', '10'],
      ['Hindi typing, UTF-8', '5', '3', '1', '15'],
      ['CD sound, mono', '44,100', '2', '1', '88,200'],
      ['CD sound, stereo', '44,100', '2', '2', '176,400'],
      ['48 kHz studio sound, stereo', '48,000', '2', '2', '192,000'],
      ['Raw 1080p30 video', '62,208,000', '1', '3', '186,624,000'],
    ] },
    { kind: 'para', text: 'Now read the table VERTICALLY, because that is where the lesson\'s one big idea lives. Sound against typing: $176{,}400 \\div 5 = 35{,}280$ — CD audio swallows the typist\'s stream thirty-five thousand times over. Video against typing: $186{,}624{,}000 \\div 5 = 37{,}324{,}800$. Video against sound: $186{,}624{,}000 \\div 176{,}400 \\approx 1{,}058$. These ratios are the rungs of a ladder whose steps are not equal in bytes but equal in MULTIPLICATIONS — each medium is thousands of times heavier than the one above it, and the whole ladder hangs from one product. The 48 kHz studio row is worth a glance too: its rate of 192,000 B/s is 8.8 per cent above the CD\'s, a whole professional format change bought with a 9 per cent census bump.' },
    { kind: 'figure', caption: 'Figure 4. The rate ladder on a log scale: the typing trickle at 5 B/s, the CD stream at 176,400 B/s (35,280 times typing), and the raw 1080p30 firehose at 186,624,000 B/s (about 1,058 times sound, 37,324,800 times typing). Equal steps of bar length are tenfold steps of rate.', svg: cf34RateLadderSvg() },
    { kind: 'callout', tone: 'insight', title: 'One table to revise from', text: 'If you keep one artefact from this lesson, keep Table 2. Every census question you will ever meet — a text file, a photo, a disc, a stream — is one row of it in disguise: identify the measurement, cost it, count the channels, multiply once. The examination variations (mono against stereo, 48 kHz against 44,100, gray against RGB) are all single-cell edits of this table, never new mathematics.' },

    /* ================================================================ */
    /* 6. THE DOORSTEP TO COMPRESSION                                     */
    /* ================================================================ */
    { kind: 'heading', text: 'The Doorstep to Compression' },
    { kind: 'para', text: 'Stand back and look at what the census has told you. A page of typing costs thousands of bytes; a photograph, tens of millions; a minute of raw video, over eleven billion. Yet the files on your phone are nothing like these numbers — a two-hour film in the hand is a few gigabytes, not a terabyte; a photo is 3 MB, not 36 MB. Nothing in this lesson\'s arithmetic is wrong. Something else is true as well: every heavy medium on earth is STORED and MOVED in a shortened dress, and the craft of shortening is the whole subject of lesson 3.5, compression.' },
    { kind: 'para', text: 'This lesson is the doorstep of that next lesson in the strictest sense: compression is not a luxury bolted onto media, it is the only reason the media fit their pipes at all. The firehose needs almost fifteen 100 Mbit/s links; your household owns one. The raw photo is 7,200 essays; your camera roll would fill a laptop in a week. When lesson 3.5 shows you a photograph squeezed tenfold with the eye none the wiser, or a film folded a hundredfold, the honest question to bring to it is the census question: shortened FROM what? You now know the from. The ratios — 7,200 essays per photo, 10.4 GiB per minute — are the raw material every compression algorithm works on.' },
    { kind: 'para', text: 'Be equally clear about what this lesson deliberately did not teach. The place-value arithmetic underneath our conversions — why $1{,}024$ and $1{,}048{,}576$ divide the byte censuses so cleanly — is owned by our shelf companion Arithmetic and Number Systems, which carries the full number-systems theory; consult it if the binary prefixes feel like incantation rather than consequence. The gate-level machinery that turns these number streams back into light and air — the DACs and ADCs at either end of the boundary lesson 2.2 walked — is Digital Logic Design\'s ground. And the deep mathematics of sampling and of redundancy removal belongs to the signal-processing shelf, met later in the library. This lesson\'s single job was the census, and the census is complete.' },

    /* ================================================================ */
    /* 7. EXAM CORNER                                                     */
    /* ================================================================ */
    { kind: 'heading', text: 'Exam Corner' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the census in examination dress', text: 'Banking and SSC-style computer-awareness papers, school and board examinations, and Cambridge 9618 / A-level-style asks keep a small, stable flock of questions on this ground — all exam-style: original items written in the examination idiom, not a real past paper and never a quotation from one. (i) CD rate arithmetic: 44,100 × 2 × 2 = 176,400 B/s, and the bit rate 1,411,200 bit/s — know both cold. (ii) MiB against MB: a 6,220,800 B frame is 5.9326171875 MiB but 6.2208 MB, and the examiner chooses which dress to demand. (iii) Colour census: 24-bit RGB names 16,777,216 colours, not "24 million" and not 256. (iv) The 720p/1080p area ratio: 2.25, because each side grows ×1.5 — a favourite trap set against the answer 2. (v) The 44,100 triple product: 294 × 50 × 3, from the PAL video-tape story. Master Table 2 and the five asks collapse into lookups.' },
    { kind: 'para', text: 'Notice what the examination families do NOT ask here. They do not ask you to derive Nyquist\'s theorem or to compress anything — those are university ground and lesson 3.5\'s ground respectively. They ask for the census: rates, sizes, ratios, and the honest dresses. That is why the practice sets below drill the multiplication first, and why every top-rung item is an exam-style synthesis of the same three factors.' },

    /* ================================================================ */
    /* 8. TERMS TO CARRY                                                  */
    /* ================================================================ */
    { kind: 'heading', text: 'Terms to Carry' },
    { kind: 'terms', items: [
      { term: 'measurement', def: 'one counted unit of a medium as it reaches the machine: a character, a colour-channel value of a pixel, a loudness sample of a channel.' },
      { term: 'rate of a medium', def: 'bytes per second the machine must swallow to keep up: measurements per second × bytes each × channels.' },
      { term: 'census', def: 'the head-count of a medium\'s parade — how many measurements, how fast — before any shortening is applied.' },
      { term: 'resolution', def: 'the cell census of an image: pixel columns × pixel rows, written width × height.' },
      { term: 'bit depth', def: 'the bits spent on one channel value of one cell: 8-bit gray names 256 levels; 24-bit RGB names 16,777,216 colours.' },
      { term: 'sampling', def: 'measuring a wave\'s loudness at equal intervals of time and keeping only the measured list.' },
      { term: 'sampling rate', def: 'how many samples the meter takes each second, in hertz; CD audio runs 44,100.' },
      { term: 'Nyquist limit', def: 'half the sampling rate; frequencies above it cannot be carried and fold back as aliases.' },
      { term: 'guard band', def: 'the safety margin between the top of hearing (20,000 Hz) and the Nyquist limit (22,050 Hz): 2,050 Hz on CD audio.' },
      { term: 'aliasing', def: 'the fold-back of an above-limit frequency into the carried range as a new, wrong tone; the reason the rate must exceed twice the top frequency.' },
    ] },
    /* ================================================================ */
    /* 9. CHECK YOUR UNDERSTANDING (QUIZ)                                 */
    /* ================================================================ */
    { kind: 'heading', text: 'Check Your Understanding' },
    { kind: 'para', text: 'Five questions, one per family of the census. Choose your answer before you read the explanation: each explanation tells you not only why the keyed option is right but exactly why each of the other three fails — the wrong options are this lesson\'s traps wearing dresses, and naming the trap is the revision.' },
    { kind: 'quiz', items: [
      {
        q: 'One second of CD-quality stereo audio (44,100 samples per second, 2 bytes each, 2 channels) bills —',
        options: ['88,200 bytes', '44,100 bytes', '10,584,000 bytes', '176,400 bytes'],
        answer: 3,
        explain: 'Assemble the rate law: $44{,}100 \\times 2 \\times 2 = 176{,}400$ bytes for the second — three factors, one multiplication. The option 88,200 is the MONO second, $44{,}100 \\times 2 \\times 1$: it forgets that stereo doubles the parade. The option 44,100 counts the SAMPLES, not the bytes — it drops both the 2-byte depth and the second channel. The option 10,584,000 is a whole MINUTE ($176{,}400 \\times 60$), not a second — a factor of sixty. Hence one second of CD stereo bills 176,400 bytes.',
      },
      {
        q: 'A 24-bit RGB colour cell can name how many colours?',
        options: ['256', '16,777,216', '24 million', '65,536'],
        answer: 1,
        explain: 'Each of the three channels spends 8 bits and so names $2^8 = 256$ levels; the channels combine independently, giving $256 \\times 256 \\times 256 = 2^{24} = 16{,}777{,}216$ colours. The option 256 is the census of ONE channel — or of an 8-bit gray cell — not of the three together. The option 24 million is the lazy reading of "24-bit" as a count of colours; the exponent is on 2, not on 10. The option 65,536 is $2^{16}$, the 16-bit depth ladder — the count Sony\'s CD loudness levels ride, nothing to do with colour. Hence 24-bit RGB names 16,777,216 colours.',
      },
      {
        q: 'A 1080p frame carries how many times the cells of a 720p frame?',
        options: ['1.5', '2', '2.25', '4'],
        answer: 2,
        explain: 'Divide the censuses: $2{,}073{,}600 \\div 921{,}600 = 2.25$, because each side grows by $1.5$ and the area ratio is $1.5 \\times 1.5 = 2.25$. The option 1.5 is the SIDE ratio ($1{,}920 \\div 1{,}280$) — the trap of comparing one dimension instead of the grid. The option 2 is the guess that "bigger looking means twice" — it forgets the second side\'s contribution. The option 4 is the ×4 law, the ratio you get by HALVING both sides of one grid ($960 \\times 540$ is a quarter of 1080p) — the right law, applied to the wrong pair. Hence 1080p carries 2.25 times the cells of 720p.',
      },
      {
        q: 'A 5,000-character passage of Devanagari text, stored in UTF-8, bills about —',
        options: ['15,000 bytes', '5,000 bytes', '10,000 bytes', '20,000 bytes'],
        answer: 0,
        explain: 'Devanagari code points sit in the 3-byte class of the UTF-8 table (U+0800 to U+FFFF, like \u0915 at U+0915), so the bill is $5{,}000 \\times 3 = 15{,}000$ bytes. The option 5,000 assumes the ASCII class — one byte per character — which pure Hindi never rides. The option 10,000 is the passage\'s UTF-16 bill ($5{,}000 \\times 2$, since Devanagari is on the Basic Multilingual Plane) — the right size, the wrong encoding. The option 20,000 would need a 4-byte class throughout, the astral plane where Hindi does not live. Hence the UTF-8 bill is 15,000 bytes.',
      },
      {
        q: 'To carry every frequency of human hearing (up to 20,000 Hz) honestly, a sampling rate must exceed —',
        options: ['20,000 Hz', '40,000 Hz', '10,000 Hz', '2,050 Hz'],
        answer: 1,
        explain: 'Nyquist\'s demand: sample at strictly more than twice the highest frequency carried, so the floor is $2 \\times 20{,}000 = 40{,}000$ Hz — more than 40,000, never merely at it. The option 20,000 Hz is the top frequency itself; sampling AT the frequency leaves fewer than two dots per cycle and the wave is lost. The option 10,000 Hz is half the top frequency — exactly backwards, the rate that would carry nothing above 5,000 Hz. The option 2,050 Hz is the CD GUARD BAND ($22{,}050 - 20{,}000$), a margin on top of a rate that already clears the bar, not the bar itself. Hence the rate must exceed 40,000 Hz.',
      },
    ] },
    /* ================================================================ */
    /* 10. PRACTICE SETS (15 exercises: L1x4, L2x4, L3x4, L4x3)          */
    /* ================================================================ */
    { kind: 'heading', text: 'Practice Sets' },
    { kind: 'para', text: 'The sets below climb four rungs. L1 begins at the definitions — depth ladders, single-factor censuses. L2 works full images and sounds at standard rates. L3 advances to synthesis: longer durations, wire bills, the fold-back, the side-halving law. L4 trains the examination idiom — and every L4 item is exam-style, an original item in the examination idiom, never a quotation of a real past-paper question. The witnesses of the lesson walk through the sets with you: the essay, the 1080p frame, the CD second, and the photograph all return, each wearing one more of the dresses you now own.' },
    { kind: 'para', text: 'Work each chain with a pencil and say the connectives aloud — Take, Convert, Check, Hence: they are the method, not decoration. Where a question carries a figure, the figure is the arithmetic drawn: read it after the chain and confirm every cell against your own working. The answers stand at the end of each chain as the terminal line.' },
    { kind: 'exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'An 8-bit gray cell names 256 levels. How many levels does a 16-bit depth name, and how many times finer is the ladder? Name the two everyday systems that ride each depth.',
            solution: [
              'Take the depth law: a depth of $d$ bits names $2^d$ levels.',
              'Compute: $2^{16} = 65{,}536$ levels — against the 8-bit cell\'s $256$.',
              'Divide the ladders: $65{,}536 \\div 256 = 256$ — the 16-bit ladder is exactly 256 times finer.',
              'Now, name the riders: 8-bit gray is the working image depth, and 16-bit is the depth Sony\'s CD won with — $65{,}536$ loudness levels against Philips\' 14-bit $16{,}384$.',
              'Hence 16 bits name 65,536 levels, a ladder 256 times finer than 8-bit gray.',
            ],
            answer: '16 bits name 65,536 levels - 256 times the 8-bit ladder of 256.',
          },
          {
            q: 'Bill a $640 \\times 480$ gray image (one byte per cell) in bytes, KiB and MiB, and say why no channel factor enters the product.',
            solution: [
              'Take the census: $640 \\times 480 = 307{,}200$ cells.',
              'Cost each cell at one byte — gray spends its 8 bits on one loudness — so the bill is $307{,}200 \\times 1 = 307{,}200$ B.',
              'Now, the binary dress: $307{,}200 \\div 1{,}024 = 300$ KiB exactly.',
              'Convert once more: $307{,}200 \\div 1{,}048{,}576 = 0.29296875$ MiB, a terminating decimal because 307,200 divides cleanly by the powers of two.',
              'So, no channel factor appears: gray carries ONE channel — the census law runs $c = 1$, and a factor of one is invisible in a product.',
              'Hence the image bills 307,200 B = 300 KiB = 0.29296875 MiB, with no channels to multiply. (The strip figure draws the census.)',
            ],
            answer: '307,200 B = 300 KiB = 0.29296875 MiB; gray rides one channel, so c = 1.',
            figures: [
              { caption: 'The gray-frame census as a four-box strip: 640 x 480 = 307,200 cells, one byte each, 307,200 B = 300 KiB = 0.29296875 MiB exactly — no channel factor anywhere.', svg: cf34GrayStripSvg() },
            ],
          },
          {
            q: 'Compute the rate of MONO CD-quality sound (44,100 samples per second, 2 bytes each, one channel), then bill one full minute of it.',
            solution: [
              'Take the factors: $m = 44{,}100$, $b = 2$, $c = 1$ — the same CD census with the second ear removed.',
              'Assemble: $44{,}100 \\times 2 \\times 1 = 88{,}200$ B/s.',
              'Now, the minute: $88{,}200 \\times 60 = 5{,}292{,}000$ B.',
              'Check against the stereo table row: mono is exactly half of $176{,}400$, as halving a channel count must halve a rate.',
              'Hence mono CD sound runs 88,200 B/s and bills 5,292,000 B per minute.',
            ],
            answer: '88,200 B/s; one minute bills 5,292,000 B.',
          },
          {
            q: 'A telephone system samples at 8,000 Hz. Up to what frequency can it carry sound honestly, and why does speech survive the cut?',
            solution: [
              'Take Nyquist\'s demand: the rate must exceed twice the top frequency, so the carried band tops out at half the rate.',
              'Compute the limit: $8{,}000 \\div 2 = 4{,}000$ Hz.',
              'Now, judge the content: the energy that makes speech INTELLIGIBLE — the formants that shape vowels and the bursts that shape consonants — sits overwhelmingly below 4,000 Hz.',
              'So, the cut keeps the words and drops the sparkle: sibilance and brilliance above 4,000 Hz are lost, which is why "telephone voice" sounds dull but clear.',
              'Hence an 8,000 Hz rate carries up to 4,000 Hz — enough for intelligible speech, not for music.',
            ],
            answer: 'Up to 4,000 Hz - half the sampling rate; speech survives because its intelligible energy sits below the line.',
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Bill one RGB frame of resolution $1024 \\times 768$ in bytes and MiB, and show that the MiB dress lands on an exact small decimal.',
            solution: [
              'Take the census: $1{,}024 \\times 768 = 786{,}432$ cells.',
              'Cost each cell at three channel bytes: $786{,}432 \\times 3 = 2{,}359{,}296$ B.',
              'Convert: $2{,}359{,}296 \\div 1{,}048{,}576 = 2.25$ MiB — exact, no rounding.',
              'Check the exactness: $2{,}359{,}296 = 2 \\times 1{,}048{,}576 + 262{,}144$, and $262{,}144 = 1{,}048{,}576 \\div 4$ — two whole MiB and a quarter.',
              'Hence the frame bills 2,359,296 B = 2.25 MiB exactly. (The block figure draws the two MiB and the quarter.)',
            ],
            answer: '2,359,296 B = 2.25 MiB exactly - two whole MiB and a quarter of one.',
            figures: [
              { caption: 'The 1024 x 768 frame as area blocks: two full 1 MiB squares and one quarter-square (half a side each way), because 2,359,296 = 2 x 1,048,576 + 262,144.', svg: cf34FrameMiBSvg() },
            ],
          },
          {
            q: 'A 4K frame runs $3840 \\times 2160$. Compute its cell census, its RGB byte bill, its MiB dress, and its ratio to a 1080p frame — then explain the ratio in one sentence.',
            solution: [
              'Take the census: $3{,}840 \\times 2{,}160 = 8{,}294{,}400$ cells.',
              'Cost each cell at three bytes: $8{,}294{,}400 \\times 3 = 24{,}883{,}200$ B.',
              'Convert: $24{,}883{,}200 \\div 1{,}048{,}576 = 23.73046875$ MiB exactly.',
              'Now, the ratio: $8{,}294{,}400 \\div 2{,}073{,}600 = 4$ — four 1080p frames in one 4K frame.',
              'So, in one sentence: each side doubled ($1{,}920 \\to 3{,}840$, $1{,}080 \\to 2{,}160$), and the ×4 law of the theorem quarters — here quadruples — the census.',
              'Hence 4K carries 8,294,400 cells billing 24,883,200 B = 23.73046875 MiB, exactly four times a 1080p frame.',
            ],
            answer: '8,294,400 cells; 24,883,200 B = 23.73046875 MiB; exactly 4 x a 1080p frame - both sides doubled.',
          },
          {
            q: 'Studio video often records sound at 48,000 samples per second, 2 bytes, 2 channels. Compute the rate in B/s, the bill for one minute, and the percentage by which it exceeds the CD rate.',
            solution: [
              'Take the factors: $m = 48{,}000$, $b = 2$, $c = 2$.',
              'Assemble: $48{,}000 \\times 2 \\times 2 = 192{,}000$ B/s.',
              'Now, the minute: $192{,}000 \\times 60 = 11{,}520{,}000$ B.',
              'Compare with CD: the difference is $192{,}000 - 176{,}400 = 15{,}600$ B/s, and $15{,}600 \\div 176{,}400 \\approx 0.0884$.',
              'So, the studio rate runs about 8.8 per cent above the CD\'s — a whole professional format change bought with a nine-hundredths census bump.',
              'Hence 48 kHz stereo runs 192,000 B/s, bills 11,520,000 B per minute, and exceeds CD by about 8.8 per cent.',
            ],
            answer: '192,000 B/s; 11,520,000 B per minute; about 8.8 per cent above the CD rate.',
          },
          {
            q: 'Bill the six-character line "ka = \u0915" (k, a, space, equals, space, and the Devanagari letter ka) in BOTH UTF-8 and UTF-16, showing the class of each character.',
            solution: [
              'Take the line apart: k, a, space, =, space are ASCII — the 1-byte class — and \u0915 (U+0915, code point 2,325) rides the 3-byte class.',
              'Bill UTF-8: $5 \\times 1 + 3 = 9$ bytes.',
              'Now, bill UTF-16: all six code points sit on the Basic Multilingual Plane, so each rides 2 bytes: $6 \\times 2 = 12$ bytes.',
              'Check the ratio: $12 \\div 9 \\approx 1.33$ — nothing like the 2 of pure English, because the mix sets the ratio.',
              'Hence the line costs 9 B in UTF-8 and 12 B in UTF-16 — a class-by-class costing. (The strip figure draws both bills.)',
            ],
            answer: 'UTF-8: 9 bytes (five 1-byte cells plus one 3-byte cell); UTF-16: 12 bytes.',
            figures: [
              { caption: 'The line "ka = ka" costed both ways: five one-byte cells and one three-byte cell give 9 UTF-8 bytes; six two-byte cells give 12 UTF-16 bytes.', svg: cf34Utf8CostStripSvg() },
            ],
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'An 80-minute blank could hold 80 minutes of CD stereo. Bill it fully (seconds, bytes, MiB), and find by how many bytes it exceeds the 74-minute disc.',
            solution: [
              'Take the duration: $80 \\times 60 = 4{,}800$ s of parade.',
              'Multiply by the CD rate: $4{,}800 \\times 176{,}400 = 846{,}720{,}000$ B.',
              'Convert: $846{,}720{,}000 \\div 1{,}048{,}576 = 807.4951171875$ MiB exactly.',
              'Now, the excess over the 74-minute disc: $846{,}720{,}000 - 783{,}216{,}000 = 63{,}504{,}000$ B.',
              'Check the excess: $63{,}504{,}000 \\div 176{,}400 = 360$ s — exactly the six extra minutes, as it must be.',
              'Hence the 80-minute disc bills 846,720,000 B = 807.4951171875 MiB, exceeding the 74-minute disc by 63,504,000 B.',
            ],
            answer: '846,720,000 B = 807.4951171875 MiB; excess 63,504,000 B - exactly six minutes of sound.',
          },
          {
            q: 'One minute of raw 1080p30 video must cross a 100 Mbit/s link. Compute the minute\'s byte bill, its GiB dress, and how long the link takes to deliver it.',
            solution: [
              'Take the firehose rate: $186{,}624{,}000$ B/s, from the derivation.',
              'Bill the minute: $186{,}624{,}000 \\times 60 = 11{,}197{,}440{,}000$ B.',
              'Convert: $11{,}197{,}440{,}000 \\div 1{,}073{,}741{,}824 \\approx 10.4$ GiB.',
              'Now, the wire: the link carries $100{,}000{,}000$ bit/s, and the minute holds $11{,}197{,}440{,}000 \\times 8 = 89{,}579{,}520{,}000$ bits.',
              'Divide: $89{,}579{,}520{,}000 \\div 100{,}000{,}000 = 895.7952$ s $\\approx 14.93$ minutes — the same 14.92992 factor as the oversubscription, of course.',
              'Hence one minute of raw 1080p30 is 11,197,440,000 B (about 10.4 GiB) and needs about 14.93 minutes on the link. (The bar figure draws the wait.)',
            ],
            answer: '11,197,440,000 B = about 10.4 GiB; the link needs 895.7952 s - about 14.93 minutes - to deliver it.',
            figures: [
              { caption: 'The download wait drawn to scale: the video itself is one minute; fetching that minute over a 100 Mbit/s link takes about 14.93 minutes, because the stream bills 14.92992 lanes of the link.', svg: cf34DownloadBarsSvg() },
            ],
          },
          {
            q: 'A 23,000 Hz tone is present in a recording sampled at 44,100 Hz. Compute the frequency of the alias the playback will produce, and locate it against hearing and the guard band.',
            solution: [
              'Take the limit: $44{,}100 \\div 2 = 22{,}050$ Hz — everything above this cannot be carried.',
              'Fold the impostor back: $44{,}100 - 23{,}000 = 21{,}100$ Hz.',
              'Locate it: $21{,}100$ is above the 20,000 Hz top of hearing, so the alias is AUDIBLE, and below 22,050 — inside the guard band.',
              'So, the guard band did its job of containment in one sense — the fold stayed below the limit — but the energy still landed inside hearing, which is why the band must be kept EMPTY by filters, not merely watched.',
              'Hence the alias is 21,100 Hz: audible, inside the 2,050 Hz guard band, a phantom the recording never played. (The strip figure draws the fold.)',
            ],
            answer: 'The alias is 21,100 Hz - audible, inside the 20,000 to 22,050 Hz guard band.',
            figures: [
              { caption: 'The fold-back on the frequency strip: hearing to 20,000 Hz, the guard band of 2,050 Hz to the 22,050 Hz Nyquist limit, and the 23,000 Hz tone folding to 21,100 Hz - inside hearing.', svg: cf34GuardBandSvg() },
            ],
          },
          {
            q: 'Halve each side of a 1080p grid, then halve each side again. Compute both cell censuses, both ratios to the original, and check the two halvings against the ×4 law. Then place the laptop panel $1366 \\times 768$ on the same ladder.',
            solution: [
              'Take the original census: $1{,}920 \\times 1{,}080 = 2{,}073{,}600$ cells.',
              'Halve each side once: $960 \\times 540 = 518{,}400$ cells, and $2{,}073{,}600 \\div 518{,}400 = 4$ — the ×4 law.',
              'Halve each side again: $480 \\times 270 = 129{,}600$ cells, and $2{,}073{,}600 \\div 129{,}600 = 16 = 4 \\times 4$ — the law compounds per halving.',
              'Now, the laptop panel: $1{,}366 \\times 768 = 1{,}049{,}088$ cells.',
              'Place it: $1{,}049{,}088 - 921{,}600 = 127{,}488$ cells above 720p, and $1{,}049{,}088 \\div 2{,}073{,}600 \\approx 0.506$ — a hair over half of 1080p.',
              'Hence the two halvings give 518,400 then 129,600 cells (ratios 4 and 16), and the 1366 × 768 panel sits between 720p and 1080p, just over the halfway mark.',
            ],
            answer: 'Halvings: 518,400 cells (1/4) then 129,600 (1/16); 1366 x 768 = 1,049,088 cells - just over half of 1080p.',
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'EXAM-STYLE (original item, not a real past paper). A compact disc holds 74 minutes of stereo audio sampled at 44,100 Hz with 16-bit samples. Calculate (i) the data rate in bytes per second, (ii) the bit rate, (iii) the total capacity in bytes, and (iv) the capacity in MiB, giving the exact value.',
            solution: [
              'Take the factors: $44{,}100$ samples/s, $2$ bytes each (16 bits), $2$ channels.',
              '(i) Rate: $44{,}100 \\times 2 \\times 2 = 176{,}400$ B/s.',
              '(ii) Bit rate: $176{,}400 \\times 8 = 1{,}411{,}200$ bit/s.',
              '(iii) Capacity: $74 \\times 60 = 4{,}440$ s, so $4{,}440 \\times 176{,}400 = 783{,}216{,}000$ B.',
              '(iv) Binary dress: $783{,}216{,}000 \\div 1{,}048{,}576 = 746.9329833984375$ MiB, exact.',
              'Hence 176,400 B/s, 1,411,200 bit/s, 783,216,000 B, and 746.9329833984375 MiB — four answers, one multiplication.',
            ],
            answer: '(i) 176,400 B/s (ii) 1,411,200 bit/s (iii) 783,216,000 B (iv) 746.9329833984375 MiB exactly.',
          },
          {
            q: 'EXAM-STYLE (original item, not a real past paper). A camera records uncompressed 1080p30 RGB video for 10 minutes. Calculate the total bytes recorded, the size in GiB, and the bit rate of the stream in Gbit/s.',
            solution: [
              'Take the per-second census: $1{,}920 \\times 1{,}080 \\times 30 = 62{,}208{,}000$ cell-measurements/s, at one byte on three channels.',
              'Rate: $62{,}208{,}000 \\times 3 = 186{,}624{,}000$ B/s.',
              'Duration: $10 \\times 60 = 600$ s, so the recording is $186{,}624{,}000 \\times 600 = 111{,}974{,}400{,}000$ B.',
              'Binary dress: $111{,}974{,}400{,}000 \\div 1{,}073{,}741{,}824 \\approx 104.3$ GiB.',
              'Bit rate: $186{,}624{,}000 \\times 8 = 1{,}492{,}992{,}000$ bit/s $= 1.492992$ Gbit/s.',
              'Hence ten minutes record 111,974,400,000 B (about 104.3 GiB) at 1.492992 Gbit/s — and the exam favourite is spotting that GiB, not GB, was asked.',
            ],
            answer: '111,974,400,000 B = about 104.3 GiB, at 1.492992 Gbit/s.',
          },
          {
            q: 'A 2 GiB memory card (2,147,483,648 bytes) is filled with uncompressed 12-megapixel RGB photographs (36,000,000 bytes each). How many photos fit, what fraction of the card do they use, and what is left over?',
            solution: [
              'Take the capacity: $2$ GiB $= 2{,}147{,}483{,}648$ B, and the photo bill: $36{,}000{,}000$ B each.',
              'Divide: $2{,}147{,}483{,}648 \\div 36{,}000{,}000 \u2248 59.65$, so at most 59 WHOLE photos.',
              'Bill the 59: $59 \\times 36{,}000{,}000 = 2{,}124{,}000{,}000$ B.',
              'Check the remainder: $2{,}147{,}483{,}648 - 2{,}124{,}000{,}000 = 23{,}483{,}648$ B — under one photo, so the 60th cannot fit.',
              'Now, the fill fraction: $2{,}124{,}000{,}000 \\div 2{,}147{,}483{,}648 \u2248 0.989$ — 98.9 per cent of the card.',
              'Hence 59 photos fit, using 2,124,000,000 B — 98.9 per cent of the card — with 23,483,648 B left over. (The fill figure draws the card.)',
            ],
            answer: '59 photos; 2,124,000,000 B = 98.9 per cent of the card; 23,483,648 B left over.',
            figures: [
              { caption: 'The 2 GiB card as a fill bar: 59 photos of 36,000,000 B fill 2,124,000,000 of the 2,147,483,648 bytes - 98.9 per cent - and the sixtieth photo cannot fit.', svg: cf34CardFillSvg() },
            ],
          },
        ],
      },
    ] },
    // __CF34_GROW__
  ],
}
