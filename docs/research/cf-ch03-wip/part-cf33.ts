import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf33.ts — CS RUN 6 seat cf33 (the CODE lesson).
 *
 * Lesson 3.3 'Codes: ASCII, Unicode and BCD' of Computer Fundamentals
 * chapter 3 'Data Representation: a First Meeting'. THE CODE LESSON: how
 * characters become numbers — codes as contracts (k bits -> 2^k symbols),
 * BCD (8-4-2-1, the 6 invalid patterns, the 60.9375% waste census), ASCII
 * (X3.4-1963, 33 control + 95 printable, the bit-5 case flip, digit
 * arithmetic), the 8-bit code-page era, Unicode (17 planes x 65,536 =
 * 1,114,112; 159,801 chars in 17.0 of 9 Sep 2025 = 14.3434% fill) and
 * UTF-8 (Thompson + Pike, September 1992, the 1-4 byte classes,
 * self-synchronization). Media censuses ride 3.4; encryption rides
 * 'Cryptography' later; the full number-systems theory lives in 'Arithmetic
 * and Number Systems'; the gate-level view in 'Digital Logic Design'.
 *
 * Every number printed here is pinned green by v-cf33.ts (100 engine-only
 * checks run GREEN before this prose was written; the pin block re-audits
 * the shipped object). All figures are self-contained computed SVGs in the
 * vivid house palette; geometry is derived from constants, never
 * eyeballed. Study-never-reproduce: every roster, witness, figure,
 * Illustration, quiz item and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const C = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 1 — the code-space ladder: four budgets, four bars,      */
/* each bar drawn to its own bit budget with the filled part what the   */
/* code names (BCD 10/16, ASCII 128/256, code page 256/256, Unicode    */
/* 1,114,112 of 2,097,152 = 17 of 32).                                 */
/* ------------------------------------------------------------------ */
function cf33CodeLadderSvg(): string {
  const W = 720
  const M = 16
  const rows = [
    { name: 'BCD cell', sub: '4 bits - one digit', frac: 10 / 16, fill: C.struct, line1: 'names 10 of 16', line2: '6 patterns dead' },
    { name: 'ASCII', sub: '7-bit code, 8-bit byte', frac: 128 / 256, fill: C.teal, line1: 'names 128 of 256', line2: '128 for extensions' },
    { name: 'Code page', sub: '8 bits, one page', frac: 256 / 256, fill: C.conn, line1: 'names 256 of 256', line2: 'but rival pages clash' },
    { name: 'Unicode', sub: '21-bit code space', frac: 1114112 / 2097152, fill: C.accent, line1: 'names 1,114,112', line2: 'of 2,097,152 - 17 of 32' },
  ]
  const barX0 = 168
  const barW = 372
  const barH = 26
  const rightX = 552
  const headY = 40
  const topY = 64
  const rowStep = 62
  const stripY = topY + rows.length * rowStep + 2
  const stripH = 52
  const H = stripY + stripH + M
  const pct = (f: number): string => {
    const v = f * 100
    return (Number.isInteger(v) ? String(v) : v.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')) + '%'
  }
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The code-space ladder: four horizontal bars, one per code, each drawn against its own bit budget. A BCD cell of 4 bits names 10 of 16 patterns, leaving 6 dead. ASCII names 128 of the 256 byte patterns. A code page names all 256 patterns but rival pages clash. Unicode names 1,114,112 of the 2,097,152 patterns a 21-bit space could hold, which is 17 of the 32 planes.">`)
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${C.teal}">THE CODE-SPACE LADDER - WHAT EACH CODE NAMES, AND OUT OF WHAT</text>`)
  rows.forEach((r, ri) => {
    const rowTop = topY + ri * rowStep
    s.push(`<text x="${M}" y="${rowTop + 13}" font-size="12" text-anchor="start" font-weight="bold" fill="${C.ink}">${r.name}</text>`)
    s.push(`<text x="${M}" y="${rowTop + 27}" font-size="9.5" text-anchor="start" fill="${C.tealInk}">${r.sub}</text>`)
    s.push(`<rect x="${barX0}" y="${rowTop}" width="${barW}" height="${barH}" rx="5" fill="${C.white}" stroke="${C.ink}" stroke-width="1.6"/>`)
    s.push(`<rect x="${barX0}" y="${rowTop}" width="${barW * r.frac}" height="${barH}" rx="5" fill="${r.fill}" stroke="${C.ink}" stroke-width="1.6"/>`)
    s.push(`<text x="${barX0 + (barW * r.frac) / 2}" y="${rowTop + 17.5}" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.white}">${pct(r.frac)}</text>`)
    s.push(`<text x="${rightX}" y="${rowTop + 12}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${C.ink}">${r.line1}</text>`)
    s.push(`<text x="${rightX}" y="${rowTop + 26}" font-size="9.5" text-anchor="start" fill="${C.tealInk}">${r.line2}</text>`)
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelB}" stroke="${C.conn}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 21}" font-size="10" text-anchor="middle" fill="${C.ink}">each bar is drawn to its own bit budget: the filled part is what the code actually names</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 38}" font-size="10" text-anchor="middle" fill="${C.tealInk}">Unicode alone spans 4,352 byte-spaces - and only 159,801 of its cells were filled at version 17.0</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 2 — the ASCII arithmetic map: the printable strip 32..126 */
/* with computed landmark positions, the three blocks, and the +32      */
/* case-flip arc from A to a.                                          */
/* ------------------------------------------------------------------ */
function cf33AsciiMapSvg(): string {
  const W = 720
  const M = 16
  const x0 = 60
  const x1 = 660
  const LO = 32
  const HI = 126
  const scale = (x1 - x0) / (HI - LO)
  const codeX = (c: number): number => x0 + (c - LO) * scale
  const stripY = 150
  const stripH = 34
  const stripB = stripY + stripH
  const headY = 40
  const arcY = 132
  const row1Y = 210
  const row2Y = 230
  const legendY = 252
  const footY = 266
  const footH = 44
  const H = footY + footH + M
  const blocks = [
    { from: 48, to: 57, fill: C.panelA, stroke: C.accent },
    { from: 65, to: 90, fill: C.white, stroke: C.struct },
    { from: 97, to: 122, fill: C.panelB, stroke: C.conn },
  ]
  const glyphs: Array<[string, number]> = [['0', 48], ['9', 57], ['A', 65], ['Z', 90], ['a', 97], ['z', 122], ['~', 126]]
  const row1: Array<[string, number]> = [['space 32', 32], ['0 at 48', 48], ['A at 65', 65], ['a at 97', 97], ['DEL 127', 127]]
  const row2: Array<[string, number]> = [['9 at 57', 57], ['Z at 90', 90], ['z at 122', 122]]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The ASCII arithmetic map: a strip of the printable codes 32 to 126 with landmark ticks. The digits block 48 to 57, the uppercase block 65 to 90 and the lowercase block 97 to 122 are shaded, with the glyphs 0, 9, A, Z, a, z and tilde drawn at their computed positions. An arc from A at 65 to a at 97 is labelled plus 32 sets bit 5, and a short arrow from space at 32 to 0 at 48 is labelled plus 16. DEL at 127 closes the 128 codes.">`)
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${C.teal}">THE ASCII ARITHMETIC MAP - PRINTABLE CODES 32 TO 126</text>`)
  blocks.forEach((b) => {
    const bx = codeX(b.from)
    const bw = (b.to - b.from + 1) * scale
    s.push(`<rect x="${bx}" y="${stripY}" width="${bw}" height="${stripH}" fill="${b.fill}" stroke="${b.stroke}" stroke-width="2"/>`)
  })
  s.push(`<rect x="${x0 - 4}" y="${stripY}" width="${x1 - x0 + 8}" height="${stripH}" rx="6" fill="none" stroke="${C.ink}" stroke-width="2.2"/>`)
  glyphs.forEach(([g, c]) => {
    s.push(`<text x="${codeX(c) + scale / 2}" y="${stripY + 22}" font-size="12" text-anchor="middle" font-weight="bold" fill="${C.ink}">${g}</text>`)
  })
  /* the +32 case-flip arc, A (65) -> a (97) */
  const axA = codeX(65) + scale / 2
  const axa = codeX(97) + scale / 2
  s.push(`<path d="M ${axA} ${arcY - 4} Q ${(axA + axa) / 2} ${arcY - 30} ${axa - 8} ${arcY - 4}" fill="none" stroke="${C.accent}" stroke-width="2.4"/>`)
  s.push(`<polygon points="${axa},${arcY - 3} ${axa - 10},${arcY - 12} ${axa - 12},${arcY - 2}" fill="${C.accent}"/>`)
  s.push(`<text x="${(axA + axa) / 2}" y="${arcY - 30}" font-size="10.5" text-anchor="middle" font-weight="bold" fill="${C.accent}">+32 sets bit 5</text>`)
  /* the +16 arrow, space (32) -> 0 (48) */
  const axS = codeX(32) + scale + 2
  const ax0 = codeX(48) - 2
  s.push(`<line x1="${axS}" y1="${arcY}" x2="${ax0}" y2="${arcY}" stroke="${C.tealInk}" stroke-width="1.8"/>`)
  s.push(`<polygon points="${ax0 + 6},${arcY} ${ax0 - 2},${arcY - 4} ${ax0 - 2},${arcY + 4}" fill="${C.tealInk}"/>`)
  s.push(`<text x="${(axS + ax0) / 2}" y="${arcY - 7}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">+16</text>`)
  /* the DEL cell just past the strip */
  s.push(`<rect x="666" y="${stripY}" width="40" height="${stripH}" rx="6" fill="${C.white}" stroke="${C.warn}" stroke-width="2"/>`)
  s.push(`<text x="686" y="${stripY + 22}" font-size="9.5" text-anchor="middle" font-weight="bold" fill="${C.warn}">DEL</text>`)
  /* landmark ticks + staggered labels */
  const tick = (c: number, yEnd: number): void => {
    s.push(`<line x1="${codeX(c) + scale / 2}" y1="${stripB}" x2="${codeX(c) + scale / 2}" y2="${yEnd}" stroke="${C.tealInk}" stroke-width="1.5"/>`)
  }
  row1.forEach(([lab, c]) => {
    tick(c, row1Y - 10)
    const lx = c === 127 ? 684 : codeX(c) + scale / 2
    s.push(`<text x="${lx}" y="${row1Y}" font-size="9.5" text-anchor="middle" font-weight="bold" fill="${C.ink}">${lab}</text>`)
  })
  row2.forEach(([lab, c]) => {
    tick(c, row2Y - 10)
    s.push(`<text x="${codeX(c) + scale / 2}" y="${row2Y}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">${lab}</text>`)
  })
  s.push(`<text x="${W / 2}" y="${legendY}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">the blocks: digits 48 to 57 - uppercase 65 to 90 - lowercase 97 to 122 - space 32 opens the printables</text>`)
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${C.panelA}" stroke="${C.accent}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 19}" font-size="10" text-anchor="middle" fill="${C.ink}">printables run 32 to 126; the case flip is one bit: a = A + 32, so 97 = 65 + 32</text>`)
  s.push(`<text x="${W / 2}" y="${footY + 36}" font-size="10" text-anchor="middle" fill="${C.tealInk}">digit values: subtract 48 from the code - and DEL at 127 closes the 128</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 3 — the four UTF-8 classes as a diagram: leading-byte    */
/* patterns, continuation cells, code-point ranges and the legal        */
/* census per class.                                                   */
/* ------------------------------------------------------------------ */
function cf33Utf8ClassesSvg(): string {
  const W = 720
  const M = 16
  const headY = 40
  const colY = 58
  const topY = 72
  const rowH = 56
  const cellW = 66
  const cellH = 30
  const stride = 71
  const cellsX = 100
  const rangeX = 400
  const cenX = 510
  const stripY = topY + 4 * rowH + 10
  const stripH = 44
  const H = stripY + stripH + M
  const rows = [
    {
      label: '1-byte', sub: 'ASCII', pats: ['0xxxxxxx'], range: 'U+0000 to 007F',
      c1: '128 code points', c2: 'the whole of ASCII',
    },
    {
      label: '2-byte', sub: 'Latin', pats: ['110xxxxx', '10xxxxxx'], range: 'U+0080 to 07FF',
      c1: '1,920 legal', c2: 'of 2,048 patterns',
    },
    {
      label: '3-byte', sub: 'BMP', pats: ['1110xxxx', '10xxxxxx', '10xxxxxx'], range: 'U+0800 to FFFF',
      c1: '63,488 legal', c2: 'surrogates excluded',
    },
    {
      label: '4-byte', sub: 'planes 1-16', pats: ['11110xxx', '10xxxxxx', '10xxxxxx', '10xxxxxx'], range: 'U+10000 to 10FFFF',
      c1: '1,048,576 legal', c2: 'the space ends at U+10FFFF',
    },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The four UTF-8 classes as a diagram. The 1-byte class has the single leading pattern 0xxxxxxx covering U+0000 to 007F with 128 code points, the whole of ASCII. The 2-byte class has leading 110xxxxx plus one continuation 10xxxxxx, covering U+0080 to 07FF with 1,920 legal code points of 2,048 patterns. The 3-byte class has leading 1110xxxx plus two continuations, covering U+0800 to FFFF with 63,488 legal code points once the surrogates are excluded. The 4-byte class has leading 11110xxx plus three continuations, covering U+10000 to 10FFFF with 1,048,576 legal code points.">`)
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${C.teal}">THE FOUR UTF-8 CLASSES - LEADING BYTES ANNOUNCE THE LENGTH</text>`)
  s.push(`<text x="${M}" y="${colY}" font-size="9.5" text-anchor="start" font-weight="bold" fill="${C.tealInk}">CLASS</text>`)
  s.push(`<text x="${cellsX}" y="${colY}" font-size="9.5" text-anchor="start" font-weight="bold" fill="${C.tealInk}">BYTE PATTERN</text>`)
  s.push(`<text x="${rangeX}" y="${colY}" font-size="9.5" text-anchor="start" font-weight="bold" fill="${C.tealInk}">CODE-POINT RANGE</text>`)
  s.push(`<text x="${cenX}" y="${colY}" font-size="9.5" text-anchor="start" font-weight="bold" fill="${C.tealInk}">LEGAL CODE POINTS</text>`)
  rows.forEach((r, ri) => {
    const rowTop = topY + ri * rowH
    s.push(`<text x="${M}" y="${rowTop + 16}" font-size="12" text-anchor="start" font-weight="bold" fill="${C.ink}">${r.label}</text>`)
    s.push(`<text x="${M}" y="${rowTop + 32}" font-size="9.5" text-anchor="start" fill="${C.tealInk}">${r.sub}</text>`)
    r.pats.forEach((p, k) => {
      const cx = cellsX + k * stride
      const isLead = k === 0
      s.push(`<rect x="${cx}" y="${rowTop}" width="${cellW}" height="${cellH}" rx="6" fill="${isLead && ri > 0 ? C.panelA : C.white}" stroke="${isLead && ri > 0 ? C.accent : C.struct}" stroke-width="2"/>`)
      s.push(`<text x="${cx + cellW / 2}" y="${rowTop + 19.5}" font-size="10" text-anchor="middle" font-family="ui-monospace, monospace" fill="${C.ink}">${p}</text>`)
    })
    s.push(`<text x="${rangeX}" y="${rowTop + 19.5}" font-size="10" text-anchor="start" fill="${C.tealInk}">${r.range}</text>`)
    s.push(`<text x="${cenX}" y="${rowTop + 15}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${C.ink}">${r.c1}</text>`)
    s.push(`<text x="${cenX}" y="${rowTop + 31}" font-size="9.5" text-anchor="start" fill="${C.tealInk}">${r.c2}</text>`)
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.white}" stroke="${C.teal}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 19}" font-size="10" text-anchor="middle" fill="${C.ink}">continuation bytes: the 64 values 10xxxxxx (hex 0x80 to 0xBF) - they never lead, they always follow</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 36}" font-size="10" text-anchor="middle" fill="${C.tealInk}">a leading byte counts its own 1s: 110 announces one follower, 1110 two, 11110 three</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 4 — the placemat sketch: a diner placemat carrying the    */
/* four class rows (September 1992, honest retelling, no portrait).     */
/* ------------------------------------------------------------------ */
function cf33PlacematSvg(): string {
  const W = 720
  const M = 16
  const matX = M
  const matY = 30
  const matW = W - 2 * M
  const matH = 254
  const H = matY + matH + M
  const titleY = 58
  const rowY0 = 92
  const rowStep = 34
  const patX = 90
  const meanX = 400
  const ringCx = 640
  const ringCy = 84
  const ringR = 26
  const rows = [
    { pat: '0xxxxxxx', mean: 'one byte - ASCII, unchanged' },
    { pat: '110xxxxx 10xxxxxx', mean: 'two bytes' },
    { pat: '1110xxxx 10xxxxxx 10xxxxxx', mean: 'three bytes' },
    { pat: '11110xxx 10xxxxxx 10xxxxxx 10xxxxxx', mean: 'four bytes' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A sketch of a diner placemat from September 1992 carrying the four UTF-8 class rows: 0xxxxxxx for one byte ASCII unchanged, 110xxxxx followed by 10xxxxxx for two bytes, 1110xxxx with two continuation bytes for three bytes, and 11110xxx with three continuation bytes for four bytes. Two coffee-cup rings stain the corner. The note says Ken Thompson and Rob Pike sketched these rows in a New Jersey diner, the FSS-UTF proposal followed within days, and no placemat survives.">`)
  s.push(`<rect x="${matX}" y="${matY}" width="${matW}" height="${matH}" rx="14" fill="${C.paper}" stroke="${C.ink}" stroke-width="2.5"/>`)
  s.push(`<rect x="${matX + 7}" y="${matY + 7}" width="${matW - 14}" height="${matH - 14}" rx="10" fill="none" stroke="${C.ink}" stroke-width="1.4"/>`)
  s.push(`<circle cx="${ringCx}" cy="${ringCy}" r="${ringR}" fill="none" stroke="${C.faint}" stroke-width="4"/>`)
  s.push(`<circle cx="${ringCx - 14}" cy="${ringCy + 12}" r="15" fill="none" stroke="${C.faint}" stroke-width="3"/>`)
  s.push(`<text x="${W / 2}" y="${titleY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${C.teal}">A DINER PLACEMAT, SEPTEMBER 1992</text>`)
  rows.forEach((r, ri) => {
    const y = rowY0 + ri * rowStep
    s.push(`<text x="${patX}" y="${y}" font-size="12" text-anchor="start" font-family="ui-monospace, monospace" font-weight="bold" fill="${C.ink}">${r.pat}</text>`)
    s.push(`<text x="${meanX}" y="${y}" font-size="9.5" text-anchor="start" fill="${C.tealInk}">${r.mean}</text>`)
  })
  s.push(`<text x="${W / 2}" y="240" font-size="9.5" text-anchor="middle" fill="${C.ink}">Ken Thompson and Rob Pike sketched these four rows on a placemat in a New Jersey diner</text>`)
  s.push(`<text x="${W / 2}" y="256" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">the FSS-UTF proposal followed within days - as the participants tell the story; no placemat survives</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S1 — the two BCD cells of 78 (exercise L1): bits,    */
/* weights 8-4-2-1, digit chips, and the pure-binary comparison.        */
/* ------------------------------------------------------------------ */
function cf33BcdCellSvg(): string {
  const W = 560
  const M = 16
  const bitW = 44
  const bitH = 40
  const stride = 48
  const g1X = 92
  const g2X = 308
  const bitsY = 64
  const bits = [['0', '1', '1', '1'], ['1', '0', '0', '0']]
  const weights = ['8', '4', '2', '1']
  const chips = ['7', '8']
  const chipW = 34
  const annY = 204
  const footY = 224
  const footH = 44
  const H = footY + footH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The two BCD cells of 78. First cell: the bits 0 1 1 1 in four boxes with the weights 8 4 2 1 under them, giving 4 plus 2 plus 1 equals 7. Second cell: the bits 1 0 0 0 with the same weights, giving 8. Digit chips labelled 7 and 8 sit under the cells. A footer notes that pure binary would need only 1001110, seven bits, for the same value.">`)
  s.push(`<text x="${W / 2}" y="36" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${C.teal}">BCD 78 - ONE CELL PER DIGIT, WEIGHTS 8-4-2-1</text>`)
  bits.forEach((group, gi) => {
    const gx = gi === 0 ? g1X : g2X
    group.forEach((b, k) => {
      const bx = gx + k * stride
      s.push(`<rect x="${bx}" y="${bitsY}" width="${bitW}" height="${bitH}" rx="7" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
      s.push(`<text x="${bx + bitW / 2}" y="${bitsY + 26}" font-size="16" text-anchor="middle" fill="${C.ink}">${b}</text>`)
    })
    const gEnd = gx + 3 * stride + bitW
    s.push(`<path d="M ${gx} ${bitsY + bitH + 8} v 7 H ${gEnd} v -7" fill="none" stroke="${C.tealInk}" stroke-width="1.8"/>`)
    weights.forEach((wt, k) => {
      s.push(`<text x="${gx + k * stride + bitW / 2}" y="${bitsY + bitH + 30}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">${wt}</text>`)
    })
    const cx = (gx + gEnd) / 2
    s.push(`<rect x="${cx - chipW / 2}" y="146" width="${chipW}" height="${chipW}" rx="8" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2.2"/>`)
    s.push(`<text x="${cx}" y="169" font-size="16" text-anchor="middle" font-weight="bold" fill="${C.ink}">${chips[gi]}</text>`)
  })
  s.push(`<text x="${W / 2}" y="${annY}" font-size="10" text-anchor="middle" fill="${C.ink}">cell 0111: 0x8 + 1x4 + 1x2 + 1x1 = 7 - cell 1000: 1x8 = 8</text>`)
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${C.panelB}" stroke="${C.conn}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 19}" font-size="10" text-anchor="middle" fill="${C.ink}">BCD(78) = 0111 1000, eight bits in two cells</text>`)
  s.push(`<text x="${W / 2}" y="${footY + 36}" font-size="10" text-anchor="middle" fill="${C.tealInk}">pure binary would need only 1001110 - seven bits - for the same value</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S2 — the add-six repair for 27 + 18 (exercise L2):   */
/* raw sum 0x3F with the invalid low cell, then +6 landing on 0100 0101.*/
/* ------------------------------------------------------------------ */
function cf33AddSixSvg(): string {
  const W = 560
  const M = 16
  const cellW = 52
  const cellH = 34
  const c1 = 200
  const c2 = 258
  const rowY0 = 56
  const rowStep = 52
  const noteX = 330
  const checkY = 318
  const H = 340
  const rows = [
    { label: 'BCD 27', cells: ['0010', '0111'], kind: 'plain', note: '' },
    { label: 'BCD 18', cells: ['0001', '1000'], kind: 'plain', note: '' },
    { label: 'raw sum', cells: ['0011', '1111'], kind: 'bad', note: '1111 = 15 > 9 - invalid' },
    { label: 'add six', cells: ['', ''], kind: 'text', note: 'the 1 carries into the tens cell' },
    { label: 'result', cells: ['0100', '0101'], kind: 'good', note: '= BCD 45 - and 27 + 18 = 45' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The add-six repair for the BCD sum 27 plus 18. Row one: BCD 27 as cells 0010 0111. Row two: BCD 18 as cells 0001 1000. Row three: the raw sum 0011 1111, whose low cell 1111 equals 15, above 9, so it is invalid and marked in red. Row four: adding six, 1111 plus 0110 equals 1 0101, and the 1 carries into the tens cell. Row five: the result 0100 0101, which is BCD 45, and indeed 27 plus 18 equals 45.">`)
  s.push(`<text x="${W / 2}" y="34" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${C.teal}">BCD ADDITION - THE ADD-SIX REPAIR (27 + 18)</text>`)
  rows.forEach((r, ri) => {
    const y = rowY0 + ri * rowStep
    s.push(`<text x="${M}" y="${y + 21}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${C.ink}">${r.label}</text>`)
    if (r.kind === 'text') {
      s.push(`<text x="${c1}" y="${y + 21}" font-size="10.5" text-anchor="start" font-family="ui-monospace, monospace" fill="${C.ink}">1111 + 0110 = 1 0101</text>`)
    } else {
      r.cells.forEach((cell, k) => {
        const cx = k === 0 ? c1 : c2
        const stroke = r.kind === 'bad' && k === 1 ? C.warn : r.kind === 'good' ? C.struct : C.tealInk
        const sw = r.kind === 'bad' && k === 1 ? 2.6 : 2
        s.push(`<rect x="${cx}" y="${y}" width="${cellW}" height="${cellH}" rx="6" fill="${r.kind === 'good' ? C.panelA : C.white}" stroke="${stroke}" stroke-width="${sw}"/>`)
        s.push(`<text x="${cx + cellW / 2}" y="${y + 22}" font-size="13" text-anchor="middle" font-weight="${r.kind === 'good' ? 'bold' : 'normal'}" fill="${C.ink}">${cell}</text>`)
      })
    }
    if (r.note) {
      s.push(`<text x="${noteX}" y="${y + 21}" font-size="9.5" text-anchor="start" fill="${r.kind === 'bad' ? C.warn : C.tealInk}">${r.note}</text>`)
    }
  })
  s.push(`<text x="${W / 2}" y="${checkY}" font-size="10" text-anchor="middle" fill="${C.ink}">check: 0100 0101 reads as 45 - the arithmetic agrees, 27 + 18 = 45</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S3 — encoding e-acute (exercise L2): 233 in 11 bits, */
/* the 5+6 split, and the two assembled bytes C3 A9.                    */
/* ------------------------------------------------------------------ */
function cf33EncodeEacuteSvg(): string {
  const W = 620
  const M = 16
  const bitW = 34
  const bitH = 30
  const stride = 38
  const x0 = 40
  const bitsY = 78
  const bitStr = '00011101001'
  const chipW = 60
  const chipH = 30
  const chipX = 480
  const footY = 246
  const footH = 44
  const H = footY + footH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Encoding e-acute, U+00E9, in UTF-8. The code point 233 written in 11 bits is 00011101001, shown as eleven bit cells. The bits split into a left group of five, 00011, and a right group of six, 101001. Prepending 110 to the left group gives 11000011, the byte C3. Prepending 10 to the right group gives 10101001, the byte A9. So e-acute encodes as the two bytes C3 A9.">`)
  s.push(`<text x="${W / 2}" y="34" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${C.teal}">ENCODING E-ACUTE (U+00E9) - THE 2-BYTE CLASS</text>`)
  s.push(`<text x="${M}" y="64" font-size="10.5" text-anchor="start" fill="${C.ink}">code point 233 in 11 bits:</text>`)
  bitStr.split('').forEach((b, k) => {
    const bx = x0 + k * stride
    const g2 = k >= 5
    s.push(`<rect x="${bx}" y="${bitsY}" width="${bitW}" height="${bitH}" rx="5" fill="${g2 ? C.panelB : C.white}" stroke="${g2 ? C.conn : C.struct}" stroke-width="2"/>`)
    s.push(`<text x="${bx + bitW / 2}" y="${bitsY + 20}" font-size="13" text-anchor="middle" fill="${C.ink}">${b}</text>`)
  })
  const g1End = x0 + 4 * stride + bitW
  const g2X0 = x0 + 5 * stride
  const g2End = x0 + 10 * stride + bitW
  s.push(`<path d="M ${x0} ${bitsY + bitH + 8} v 7 H ${g1End} v -7" fill="none" stroke="${C.struct}" stroke-width="1.8"/>`)
  s.push(`<path d="M ${g2X0} ${bitsY + bitH + 8} v 7 H ${g2End} v -7" fill="none" stroke="${C.conn}" stroke-width="1.8"/>`)
  s.push(`<text x="${(x0 + g1End) / 2}" y="${bitsY + bitH + 32}" font-size="9.5" text-anchor="middle" font-weight="bold" fill="${C.ink}">00011</text>`)
  s.push(`<text x="${(g2X0 + g2End) / 2}" y="${bitsY + bitH + 32}" font-size="9.5" text-anchor="middle" font-weight="bold" fill="${C.ink}">101001</text>`)
  s.push(`<text x="${x0}" y="176" font-size="10.5" text-anchor="start" font-family="ui-monospace, monospace" fill="${C.ink}">prepend 110 -&gt; 110 00011 = 11000011</text>`)
  s.push(`<rect x="${chipX}" y="156" width="${chipW}" height="${chipH}" rx="7" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2.2"/>`)
  s.push(`<text x="${chipX + chipW / 2}" y="176" font-size="14" text-anchor="middle" font-weight="bold" fill="${C.ink}">C3</text>`)
  s.push(`<text x="${x0}" y="208" font-size="10.5" text-anchor="start" font-family="ui-monospace, monospace" fill="${C.ink}">prepend 10 -&gt; 10 101001 = 10101001</text>`)
  s.push(`<rect x="${chipX}" y="192" width="${chipW}" height="${chipH}" rx="7" fill="${C.panelB}" stroke="${C.conn}" stroke-width="2.2"/>`)
  s.push(`<text x="${chipX + chipW / 2}" y="212" font-size="14" text-anchor="middle" font-weight="bold" fill="${C.ink}">A9</text>`)
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${C.white}" stroke="${C.teal}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 19}" font-size="10" text-anchor="middle" fill="${C.ink}">e-acute (U+00E9) is 233 = 00011101001 in 11 bits - bytes C3 A9</text>`)
  s.push(`<text x="${W / 2}" y="${footY + 36}" font-size="10" text-anchor="middle" fill="${C.tealInk}">the 2-byte class: 110 plus five payload bits, then 10 plus six payload bits</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S4 — the case flip (exercise L3): Q = 1010001 and    */
/* q = 1110001, bit 5 (weight 32) highlighted in both frames.          */
/* ------------------------------------------------------------------ */
function cf33BitFlipSvg(): string {
  const W = 620
  const M = 16
  const bitW = 46
  const bitH = 36
  const stride = 50
  const x0 = 120
  const row1Y = 64
  const row2Y = 170
  const weights = ['64', '32', '16', '8', '4', '2', '1']
  const frameQ = ['1', '0', '1', '0', '0', '0', '1']
  const frameq = ['1', '1', '1', '0', '0', '0', '1']
  const annY = 230
  const footY = 252
  const footH = 44
  const H = footY + footH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The case flip in ASCII: the seven-bit frames of Q and q. Above the bits run the weights 64, 32, 16, 8, 4, 2, 1. The frame of Q, which is 81, reads 1 0 1 0 0 0 1; the frame of q, which is 113, reads 1 1 1 0 0 0 1. The two frames differ only in the second position from the left, the bit of weight 32 - bit 5 - which is highlighted in both rows. An arrow labelled plus 32 equals set bit 5 connects the rows.">`)
  s.push(`<text x="${W / 2}" y="34" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${C.teal}">THE CASE FLIP - BIT 5 TOGGLES Q INTO q</text>`)
  weights.forEach((wt, k) => {
    s.push(`<text x="${x0 + k * stride + bitW / 2}" y="58" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">${wt}</text>`)
  })
  const frame = (bits: string[], y: number): void => {
    bits.forEach((b, k) => {
      const bx = x0 + k * stride
      const hot = k === 1
      s.push(`<rect x="${bx}" y="${y}" width="${bitW}" height="${bitH}" rx="7" fill="${hot ? C.panelA : C.white}" stroke="${hot ? C.accent : C.struct}" stroke-width="${hot ? 2.6 : 2}"/>`)
      s.push(`<text x="${bx + bitW / 2}" y="${y + 24}" font-size="16" text-anchor="middle" font-weight="${hot ? 'bold' : 'normal'}" fill="${C.ink}">${b}</text>`)
    })
  }
  frame(frameQ, row1Y)
  frame(frameq, row2Y)
  s.push(`<text x="${M}" y="${row1Y + 24}" font-size="12" text-anchor="start" font-weight="bold" fill="${C.ink}">Q = 81</text>`)
  s.push(`<text x="${M}" y="${row2Y + 24}" font-size="12" text-anchor="start" font-weight="bold" fill="${C.ink}">q = 113</text>`)
  s.push(`<line x1="300" y1="${row1Y + bitH + 6}" x2="300" y2="${row2Y - 12}" stroke="${C.accent}" stroke-width="2.4"/>`)
  s.push(`<polygon points="300,${row2Y - 4} 294,${row2Y - 14} 306,${row2Y - 14}" fill="${C.accent}"/>`)
  s.push(`<text x="322" y="136" font-size="10.5" text-anchor="start" font-weight="bold" fill="${C.accent}">+32 = set bit 5</text>`)
  s.push(`<text x="${W / 2}" y="${annY}" font-size="10" text-anchor="middle" fill="${C.ink}">1010001 = 64 + 16 + 1 = 81 - 1110001 = 64 + 32 + 16 + 1 = 113</text>`)
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${C.panelA}" stroke="${C.accent}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 19}" font-size="10" text-anchor="middle" fill="${C.ink}">the frames differ in exactly one position - bit 5, worth 32</text>`)
  s.push(`<text x="${W / 2}" y="${footY + 36}" font-size="10" text-anchor="middle" fill="${C.tealInk}">81 + 32 = 113, and XOR with 32 flips the case either way</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S5 — the byte census of 'A = rupee' (exercise L3):   */
/* seven byte cells with hex codes, character names and the 4+3 split.  */
/* ------------------------------------------------------------------ */
function cf33ByteStripSvg(): string {
  const W = 680
  const M = 16
  const cellW = 64
  const stride = 70
  const x0 = 60
  const cellsY = 64
  const cellH = 36
  const hexes = ['41', '20', '3D', '20', 'E2', '82', 'B9']
  const names = ['A', 'sp', '=', 'sp', 'rupee lead', 'cont', 'cont']
  const censY = 184
  const footY = 204
  const footH = 44
  const H = footY + footH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The UTF-8 bytes of the string A equals rupee. Seven byte cells carry the hex codes 41, 20, 3D, 20, E2, 82, B9. Under them: A, space, equals, space, then the rupee sign as one leading byte E2 with two continuation bytes 82 and B9. A bracket groups the first four cells as 4 ASCII bytes; another bracket groups the last three as 3 rupee bytes. The census: 4 plus 3 equals 7 bytes; in decimal the bytes are 65, 32, 61, 32, 226, 130, 185.">`)
  s.push(`<text x="${W / 2}" y="34" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${C.teal}">THE UTF-8 BYTES OF THE STRING A = RUPEE</text>`)
  hexes.forEach((h, k) => {
    const cx = x0 + k * stride
    const isAscii = k < 4
    s.push(`<rect x="${cx}" y="${cellsY}" width="${cellW}" height="${cellH}" rx="6" fill="${isAscii ? C.white : C.panelB}" stroke="${isAscii ? C.struct : C.conn}" stroke-width="2"/>`)
    s.push(`<text x="${cx + cellW / 2}" y="${cellsY + 24}" font-size="13" text-anchor="middle" font-weight="bold" fill="${C.ink}">${h}</text>`)
    s.push(`<text x="${cx + cellW / 2}" y="${cellsY + cellH + 16}" font-size="9.5" text-anchor="middle" fill="${C.tealInk}">${names[k]}</text>`)
  })
  const g1x1 = x0 - 4
  const g1x2 = x0 + 3 * stride + cellW + 4
  const g2x1 = x0 + 4 * stride - 4
  const g2x2 = x0 + 6 * stride + cellW + 4
  s.push(`<path d="M ${g1x1} 128 v 7 H ${g1x2} v -7" fill="none" stroke="${C.struct}" stroke-width="2"/>`)
  s.push(`<path d="M ${g2x1} 128 v 7 H ${g2x2} v -7" fill="none" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<text x="${(g1x1 + g1x2) / 2}" y="152" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.ink}">4 ASCII bytes</text>`)
  s.push(`<text x="${(g2x1 + g2x2) / 2}" y="152" font-size="10" text-anchor="middle" font-weight="bold" fill="${C.ink}">3 rupee bytes</text>`)
  s.push(`<text x="${W / 2}" y="${censY}" font-size="10.5" text-anchor="middle" font-weight="bold" fill="${C.ink}">the census: 4 ASCII bytes + 3 rupee bytes = 7 bytes</text>`)
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${C.white}" stroke="${C.teal}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 19}" font-size="10" text-anchor="middle" fill="${C.ink}">in decimal the bytes are 65 32 61 32 226 130 185</text>`)
  s.push(`<text x="${W / 2}" y="${footY + 36}" font-size="10" text-anchor="middle" fill="${C.tealInk}">one character - the rupee - costs three bytes: length is a property of the encoding</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE S6 — encoding the smiley (exercise L4): 128,578 in   */
/* 21 bits, the 3+6+6+6 split, and the four assembled bytes.            */
/* ------------------------------------------------------------------ */
function cf33EncodeSmileySvg(): string {
  const W = 680
  const M = 16
  const bitW = 26
  const bitH = 28
  const stride = 30
  const x0 = 40
  const bitsY = 76
  const bitStr = '000011111011001000010'
  const groups = [
    { from: 0, to: 2, pay: '000' },
    { from: 3, to: 8, pay: '011111' },
    { from: 9, to: 14, pay: '011001' },
    { from: 15, to: 20, pay: '000010' },
  ]
  const chipW = 56
  const chipH = 26
  const chipX = 560
  const rowsY = [160, 192, 224, 256]
  const footY = 286
  const footH = 40
  const H = footY + footH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Encoding the slightly-smiling face, U+1F642, in UTF-8. The code point 128,578 written in 21 bits is 000011111011001000010, shown as twenty-one bit cells. The bits split into four groups: 000, then 011111, then 011001, then 000010. Prepending 11110 to the first group gives 11110000, the byte F0. Prepending 10 to each of the other groups gives 10011111, 10011001 and 10000010 - the bytes 9F, 99 and 82. So the smiley encodes as the four bytes F0 9F 99 82.">`)
  s.push(`<text x="${W / 2}" y="34" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${C.teal}">ENCODING THE SMILEY (U+1F642) - THE 4-BYTE CLASS</text>`)
  s.push(`<text x="${M}" y="62" font-size="10.5" text-anchor="start" fill="${C.ink}">code point 128,578 in 21 bits:</text>`)
  bitStr.split('').forEach((b, k) => {
    const bx = x0 + k * stride
    const gi = groups.findIndex((g) => k >= g.from && k <= g.to)
    s.push(`<rect x="${bx}" y="${bitsY}" width="${bitW}" height="${bitH}" rx="4" fill="${gi % 2 === 0 ? C.white : C.panelB}" stroke="${gi === 0 ? C.accent : C.conn}" stroke-width="1.8"/>`)
    s.push(`<text x="${bx + bitW / 2}" y="${bitsY + 19}" font-size="12" text-anchor="middle" fill="${C.ink}">${b}</text>`)
  })
  groups.forEach((g) => {
    const gx1 = x0 + g.from * stride
    const gx2 = x0 + g.to * stride + bitW
    s.push(`<path d="M ${gx1} ${bitsY + bitH + 7} v 6 H ${gx2} v -6" fill="none" stroke="${C.tealInk}" stroke-width="1.6"/>`)
    s.push(`<text x="${(gx1 + gx2) / 2}" y="${bitsY + bitH + 28}" font-size="9.5" text-anchor="middle" font-weight="bold" fill="${C.ink}">${g.pay}</text>`)
  })
  const asm = [
    { text: '11110 + 000 -&gt; 11110000', chip: 'F0' },
    { text: '10 + 011111 -&gt; 10011111', chip: '9F' },
    { text: '10 + 011001 -&gt; 10011001', chip: '99' },
    { text: '10 + 000010 -&gt; 10000010', chip: '82' },
  ]
  asm.forEach((r, ri) => {
    const y = rowsY[ri]
    s.push(`<text x="${x0}" y="${y + 18}" font-size="10" text-anchor="start" font-family="ui-monospace, monospace" fill="${C.ink}">${r.text}</text>`)
    s.push(`<rect x="${chipX}" y="${y}" width="${chipW}" height="${chipH}" rx="6" fill="${ri === 0 ? C.panelA : C.panelB}" stroke="${ri === 0 ? C.accent : C.conn}" stroke-width="2.2"/>`)
    s.push(`<text x="${chipX + chipW / 2}" y="${y + 18}" font-size="13" text-anchor="middle" font-weight="bold" fill="${C.ink}">${r.chip}</text>`)
  })
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${C.white}" stroke="${C.teal}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 25}" font-size="10.5" text-anchor="middle" font-weight="bold" fill="${C.ink}">the smiley U+1F642 = 128,578 encodes as the four bytes F0 9F 99 82</text>`)
  s.push('</svg>')
  return s.join('')
}

export const lesson33: Lesson = {
  id: 'cf-codes-ascii-unicode-and-bcd',
  number: '3.3',
  title: 'Codes: ASCII, Unicode and BCD',
  concepts: [
    'codes as contracts between two ends',
    'the bit-budget law: k bits name 2 to the k symbols',
    'BCD: one decimal digit per 4-bit cell',
    'ASCII: 7 bits, 33 control and 95 printable codes',
    'code pages and the 8-bit fragmentation',
    'Unicode: 17 planes, 1,114,112 code points',
    'UTF-8: variable-length encoding, 1 to 4 bytes',
    'self-synchronization and ASCII compatibility',
  ],
  objectives: [
    'By the end of this lesson you can explain a code as an agreed table held by both ends of a conversation, and diagnose mojibake as a mismatch of tables rather than a corruption of bits.',
    'By the end of this lesson you can apply the bit-budget law to size a code for any alphabet, and count the spare patterns every budget leaves behind.',
    'By the end of this lesson you can write any decimal number in BCD, name the six invalid 4-bit patterns, and cost the 60.9375% waste of a two-cell BCD byte against pure binary.',
    'By the end of this lesson you can recite the ASCII landmarks (space 32, 0 at 48, A at 65, a at 97, DEL 127), work the bit-5 case flip and the digit arithmetic, and trace a keypress from scan code to glyph.',
    'By the end of this lesson you can state the Unicode census (17 planes, 1,114,112 code points, 159,801 characters in version 17.0) and explain the 2,048-value surrogate reservation.',
    'By the end of this lesson you can encode any character into UTF-8 by hand, class by class, and explain why the scheme self-synchronizes and why the web chose it.',
  ],
  prerequisites: ['cf-bits-why-two-symbols-carry-everything'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ================================================================
    // 1. THE CODE IDEA: A CONTRACT IN BITS
    // ================================================================
    { kind: 'heading', text: 'The Code Idea: a Contract in Bits' },
    { kind: 'para', text: 'Lesson 3.2 gave numbers their dresses: any value can wear binary, octal, decimal or hexadecimal, and the change of dress costs nothing but notation. This lesson climbs one storey higher and asks a question that hides inside every message you have ever sent: **how does text become numbers at all?** The letter A is not a quantity. It has no place value, no weight ladder, no numeral. Before a machine can store, send or search a single character, somebody must decide which number that character shall be — and write the decision down where both ends of the conversation can read it. That written decision is called a code, and this lesson is its biography: BCD for the digits, ASCII for the English alphabet, the eight-bit code pages that tried to stretch ASCII, Unicode\u2019s one table for the world, and UTF-8, the dress in which that table travels.' },
    { kind: 'para', text: 'The walk, in order: the code idea itself — codes as contracts, and the bit-budget law that fixes how wide a code must be; BCD, the binary-coded decimal bridge that carries lesson 3.2\u2019s digits into cells; ASCII, the seven-bit spine that text still leans on; the eight-bit code-page era and its fragmentation; Unicode, which reserved a numbered cell for every character the world standardises; and UTF-8, the variable-length encoding that carries Unicode over the wire. Every number in the walk is pinned and verified before it reaches you: you will meet $0100\\;0101$, the six forbidden patterns, 65 and 97, $1{,}114{,}112$ and, at the very end, a seven-byte string containing a rupee sign.' },
    { kind: 'callout', tone: 'insight', title: 'Note — one idea under the whole lesson', text: 'A code is a TABLE, not a machine. Nothing about the hardware forces the letter A to be 65; a committee chose 65 and the world agreed to remember it. Every code in this lesson — BCD, ASCII, the code pages, Unicode — is exactly that: an agreement, written down, mapping each symbol of some alphabet onto a bit pattern. Change the agreement at one end of a wire and the bytes arriving at the other end turn to nonsense, even though not one bit has flipped. Keep this in view and the whole lesson reads as one story: four attempts to write the world\u2019s best agreement.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — code', text: 'A `code` is said to be an agreed table that maps each symbol of an alphabet onto a distinct bit pattern, together with the rule for reading those patterns back into symbols. Symbolically, a code is a one-to-one assignment $s_i \\mapsto p_i$ from the alphabet\u2019s $N$ symbols onto $N$ distinct patterns of $k$ bits, where $2^k \\ge N$ — the table, and nothing more.' },
    { kind: 'para', text: 'Codes are older than computers, and you own several already. The point of listing them is that none of them was forced by physics: each is a convention that won a following.' },
    { kind: 'para', text: 'For example,' },
    { kind: 'list', marker: 'roman', items: [
      '(i) Braille maps letters, digits and punctuation onto patterns of six raised-or-flat dots — a 6-bit code of 64 patterns, designed for fingers rather than wires.',
      '(ii) Morse code maps letters onto short and long pulses of length one to five — a variable-length code, which is why E (one dot) is shorter than Q (dash dash dot dash).',
      '(iii) An examination roll number maps every candidate onto a decimal pattern — a code whose only job is that two candidates never share one number.',
    ] },
    { kind: 'para', text: 'The contract half of the definition deserves its own paragraph, because it is the half that breaks in practice. Suppose a name containing the letter e with an acute accent — é — is written on a machine set up for UTF-8, and read back on a machine set up for the older Latin-1 table. The two bytes $11000011\\;10101001$ arrive perfectly intact: not one was lost, delayed or flipped in transit. But the Latin-1 table reads them as TWO separate characters and paints \u00c3\u00a9 on the screen. Nothing is corrupted; everything is misread. The Japanese coined a word for this class of ghost text — mojibake — and every programmer meets it within a year of first touching text. The moral stands: a code is an agreement between BOTH ends, and the agreement travels separately from the bytes.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — mojibake is a mismatch, not a corruption', text: 'When text arrives as garbage, the bits are almost always intact. The failure is that the reading table at one end differs from the writing table at the other. Diagnosing mojibake therefore means asking WHICH tables were in play, not which wire was broken — and this lesson equips you to answer, because you are about to meet the four great tables: BCD, ASCII, the code pages and Unicode.' },
    { kind: 'para', text: 'Now the sizing question, the one every code must answer before it is built: how many bits does the table need? The answer is a counting argument you can hold in one hand. A pattern of $k$ bits has $k$ positions, each independently 0 or 1, so the census of distinct patterns is $2 \\times 2 \\times \\cdots \\times 2 = 2^k$. Ten bits name $1{,}024$ patterns; sixteen name $65{,}536$; twenty name $1{,}048{,}576$. So an alphabet of $N$ symbols needs the smallest $k$ with $2^k \\ge N$ — the bit budget. The alphabet\u2019s size fixes the width of its code, and no cleverness in the world can make the table narrower.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the bit-budget law', text: 'If $2^{k-1} < N \\le 2^k$, then exactly $k$ bits per symbol are necessary and sufficient for a fixed-width code over an alphabet of $N$ symbols. Fewer bits cannot separate the symbols, since $N > 2^{k-1}$ would leave two symbols sharing one pattern; more bits are pure waste. Hence $k = \\lceil \\log_2 N \\rceil$, and the number of spare patterns is $2^k - N$.' },
    { kind: 'equation', latex: 'k \\;=\\; \\lceil \\log_2 N \\rceil \\qquad \\text{where} \\qquad 2^{k-1} < N \\le 2^k \\tag{1}', note: 'The bit-budget law: the alphabet\u2019s size N fixes the code\u2019s width k — the smallest k whose 2 to the k patterns can separate N symbols.' },
    { kind: 'example', title: 'Illustration 1. An alphabet of 26 letters plus the space — 27 symbols — needs how many bits?', steps: [
      'Count the alphabet: 26 letters plus the space make $N = 27$ symbols that the code must separate.',
      'Test the budget below: $2^4 = 16 < 27$, so four bits are too few — eleven symbols would be homeless.',
      'Now, test one step up: $2^5 = 32 \\ge 27$, so five bits suffice.',
      'Hence $k = \\lceil \\log_2 27 \\rceil = 5$: five bits per symbol, with $32 - 27 = 5$ spare patterns left over.',
      'Check the law\u2019s sandwich: $2^{k-1} = 16 < 27 \\le 32 = 2^k$, exactly as the theorem promises.',
    ] },
    { kind: 'para', text: 'Notice the spare patterns tailing out of every budget — five of them in Illustration 1 — and notice that they are not decoration. Spares are the raw material of error detection, of control codes, and of plain waste. In one sense the rest of this lesson is a tour of four different answers to the question \u2018what do we do with the spare patterns?\u2019 BCD locks six of every sixteen away, dead. ASCII fills its seven-bit budget exactly and leaves the eighth bit of the byte entirely spare. The code pages spent that spare eighth bit — and shattered into rivals. Unicode spent twenty-one bits\u2019 worth of room so generously that, to this day, it has filled less than a seventh of it. Figure 1 draws the four budgets as a ladder; keep it beside you for the whole lesson.' },
    { kind: 'figure', caption: 'Figure 1. The code-space ladder: a BCD cell names 10 of its 16 patterns, ASCII names 128 of the 256 byte patterns, a code page names all 256, and Unicode names 1,114,112 of the 2,097,152 patterns a 21-bit space could hold - which is 17 of 32 planes.', svg: cf33CodeLadderSvg() },
    { kind: 'para', text: 'Read the ladder rung by rung and the lesson\u2019s plan appears. The BCD cell is the smallest budget: four bits, ten named patterns, six dead. ASCII doubles the cell and fills exactly half of a byte. The code pages fill the whole byte — and pay for completeness with rivalry, because 256 patterns cannot serve the world\u2019s scripts. Unicode\u2019s answer was to stop counting patterns and start numbering characters: $1{,}114{,}112$ cells, of which $159{,}801$ were occupied when version 17.0 was released on 9 September 2025. Each rung is a contract, and each rung believed it was the last.' },
    { kind: 'terms', items: [
      { term: 'Code', def: 'an agreed table mapping each symbol of an alphabet onto a distinct bit pattern — a contract that both ends of a conversation must hold.' },
      { term: 'Bit budget', def: 'the width k a code needs: the smallest k with 2 to the k at least N, for an alphabet of N symbols; the spare patterns number 2 to the k minus N.' },
      { term: 'Mojibake', def: 'ghost text produced when the reading table differs from the writing table — a mismatch of codes, not a corruption of bits.' },
    ] },
    { kind: 'formula', name: 'The bit-budget law', latex: 'k = \\lceil \\log_2 N \\rceil, \\qquad 2^{k-1} < N \\le 2^k', note: 'The alphabet\u2019s size fixes the code\u2019s width: k bits name 2 to the k patterns, so N symbols need the smallest such k — leaving 2 to the k minus N spares.' },

    // ================================================================
    // 2. BCD: ONE DIGIT PER CELL
    // ================================================================
    { kind: 'heading', text: 'BCD: One Digit per Cell' },
    { kind: 'para', text: 'Begin with the humblest code of the lesson, because it is the direct bridge from lesson 3.2. In the numbering systems you now own, the value 45 wears the binary dress $101101_2$ — the whole number encoded at once, place by place. But the machines that ran banks, invoicing and payrolls through the 1950s and 1960s served a different master: the decimal digit. Their displays showed digits, their printers struck digits, their ledgers were audited column by column in digits. So those machines stored numbers digit by digit, each decimal digit in its own little binary cell — binary-coded decimal, BCD for short. It is a code in exactly the sense of the definition above: a table mapping the ten digits onto ten of the sixteen patterns a 4-bit cell can hold.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — binary-coded decimal (BCD)', text: 'A number is said to be written in `BCD` when each of its decimal digits is encoded separately as one 4-bit pattern read with the weights 8-4-2-1, and the digits are laid out cell by cell in order. Symbolically, the digit $d \\in \\{0, 1, \\ldots, 9\\}$ maps to its 4-bit frame, and the numeral $d_{n-1} \\ldots d_1 d_0$ maps to the concatenation of those frames — one cell per digit, and never a carry between cells.' },
    { kind: 'table', caption: 'Table 1. The BCD cell — the ten legal patterns, read with the weights 8-4-2-1.', head: ['Digit', 'BCD pattern', 'Digit', 'BCD pattern'], rows: [
      ['$0$', '$0000$', '$5$', '$0101$'],
      ['$1$', '$0001$', '$6$', '$0110$'],
      ['$2$', '$0010$', '$7$', '$0111$'],
      ['$3$', '$0011$', '$8$', '$1000$'],
      ['$4$', '$0100$', '$9$', '$1001$'],
    ] },
    { kind: 'para', text: 'Read the table with lesson 3.2\u2019s weight ladder in mind and you will see that each cell is just a tiny binary numeral: $0111$ is $4 + 2 + 1 = 7$, $1000$ is $8$, and so on up to $1001 = 9$. The cell is the four-bit nibble you met in 3.2 — half a byte, one hexadecimal digit\u2019s worth of room — but employed here as a house for ONE decimal digit instead of one hex digit. That is the whole of BCD: a nibble per digit, weights 8-4-2-1, cells side by side.' },
    { kind: 'example', title: 'Illustration 2. Write 45 in BCD, cell by cell.', steps: [
      'Take the digits of 45 one at a time: the 4, then the 5.',
      'Encode the 4 with the weights: $0100_2 = 4$.',
      'Encode the 5 with the weights: $0101_2 = 4 + 1 = 5$.',
      'Concatenate the cells in order: $0100\\;0101$.',
      'Hence BCD$(45) = 0100\\;0101$ — two cells, eight bits, one digit per cell. (And BCD$(9) = 1001$, the fullest a single cell can legally be.)',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the BCD of 45 is not the binary of 45', text: 'BCD$(45) = 0100\\;0101$, but the pure binary dress of 45 is $0010\\;1101$ — different bits, the same eight positions, the same value. Read the BCD cells separately (0 then 4, 0 then 5) and you recover 45; read them as one binary numeral and you get $69$. BCD is a CODE for digits; binary is a NUMERAL SYSTEM for values. Lesson 3.2 owns the numeral; this lesson owns the code — and the examination hall checks whether you know which one you are holding.' },
    { kind: 'example', title: 'Illustration 3. Write 909 in BCD, and count the cells and the bits.', steps: [
      'Take the three digits one at a time: 9, then 0, then 9.',
      'Encode each with the weights: $9 = 1001$, $0 = 0000$, $9 = 1001$.',
      'Concatenate the cells: $1001\\;0000\\;1001$.',
      'So, three cells and $3 \\times 4 = 12$ bits — whereas pure binary needs only ten bits for 909, namely $1110001101_2$.',
      'Hence BCD$(909) = 1001\\;0000\\;1001$: twelve bits, three cells, one digit per cell, and a middle cell of pure zeros.',
    ] },
    { kind: 'para', text: 'Now count the cell itself, because the counting is the lesson. Four bits name $2^4 = 16$ patterns, but a decimal digit needs only ten of them. Exactly six patterns are left with no digit to name: $1010, 1011, 1100, 1101, 1110, 1111$ — the six patterns whose values run from ten to fifteen. In BCD these six are INVALID: a cell holding one of them is not a legal encoding of any digit, and a decoder that meets one knows at once that something has gone wrong. Six of sixteen is $37.5\\%$ of every single cell locked away, unused, permanently. The waste is not an accident of engineering; it is arithmetic — ten does not divide any power of two, so no power-of-two cell can ever fit the decimal digits exactly.' },
    { kind: 'callout', tone: 'historical', title: 'The IBM heritage: from BCDIC to the six-bit byte', text: 'BCD\u2019s family tree runs through IBM\u2019s accounting machines. The six-bit BCDIC — Binary-Coded Decimal Interchange Code — named $2^6 = 64$ patterns: enough for a decimal digit, a zone marker and change, which suited punch-card ledgers beautifully. Its eight-bit descendant EBCDIC carried the idea into the mainframe age, and decimal arithmetic in hardware survived inside IBM machines long after binary won the laboratory. One honest line of heritage: the reason so many bank and payroll systems stayed decimal inside for decades is that their INPUT and OUTPUT were decimal, and BCD faces the decimal world digit by digit. (The full genealogy of the 1960s code wars belongs to the history shelf; we take only the line we need.)' },
    { kind: 'derivation', title: 'The waste census of two BCD cells', statement: 'Two BCD cells fill exactly one byte — eight bits, $2^8 = 256$ patterns. Count how many two-digit values they can legally name, and cost the difference against pure binary.', steps: [
      { label: 'Count the patterns', formula: '2^8 = 256', explanation: 'the byte holds 256 distinct patterns — lesson 3.2\u2019s range law, applied to eight positions.' },
      { label: 'Count the legal pairs', formula: '10 \\times 10 = 100', explanation: 'each cell independently names one of ten digits, so the pair names exactly the values 0 through 99 — one hundred values.' },
      { label: 'Subtract', formula: '256 - 100 = 156', explanation: 'one hundred fifty-six patterns of the byte can never occur in a legal two-digit BCD encoding.' },
      { label: 'Take the fraction', formula: '\\frac{156}{256} = 0.609375 = 60.9375\\%', explanation: 'the waste is not a rounding loss — it is three-fifths of the entire byte, dead on arrival.' },
      { label: 'Compare with pure binary', formula: '\\frac{255}{99} = 2.5757\\ldots', explanation: 'the same eight bits, read as one binary numeral, reach 255 — about 2.58 times the BCD range of 99.' },
    ], result: 'So two BCD cells name $100$ of $256$ patterns: $156$ wasted, which is $60.9375\\%$ of the byte — while pure 8-bit binary reaches $255$, a range $2.5757\\ldots$ times as wide.' },
    { kind: 'equation', latex: '\\frac{156}{256} \\;=\\; \\frac{39}{64} \\;=\\; 0.609375 \\;=\\; 60.9375\\% \\tag{2}', note: 'The BCD waste, exactly: two cells use 100 of the byte\u2019s 256 patterns, so 156 divided by 256 of every byte is dead weight — three-fifths of it.' },
    { kind: 'example', title: 'Illustration 4. Cost the waste: how much does a two-cell BCD byte really carry?', steps: [
      'Take the byte\u2019s census: $2^8 = 256$ patterns.',
      'Take the legal two-digit values: $10 \\times 10 = 100$, namely 0 through 99.',
      'Subtract: $256 - 100 = 156$ patterns never appear.',
      'Take the fraction: $156/256 = 0.609375$, so $60.9375\\%$ of the byte is dead.',
      'Compare: pure binary in the same byte reaches $255$, and $255/99 \\approx 2.58$, so binary carries about 2.58 times the range.',
      'Hence the census: 100 live of 256, 156 dead, 60.9375% waste — the price of one-digit-per-cell.',
    ] },
    { kind: 'table', caption: 'Table 2. BCD versus pure binary — the same bits, three territories, the widening waste.', head: ['Territory', 'BCD names', 'Pure binary names', 'BCD waste'], rows: [
      ['4 bits (1 cell)', '$10$ values, 0 to 9', '$16$ values, 0 to 15', '$6 = 37.5\\%$'],
      ['8 bits (2 cells)', '$100$ values, 0 to 99', '$256$ values, 0 to 255', '$156 = 60.9375\\%$'],
      ['12 bits (3 cells)', '$1{,}000$ values, 0 to 999', '$4{,}096$ values, 0 to 4,095', '$3{,}096 = 75.5859375\\%$'],
    ] },
    { kind: 'para', text: 'Look down the waste column and a pattern hardens: every extra BCD cell makes the waste WORSE, not better — $37.5\\%$, then $60.9375\\%$, then $75.5859375\\%$ — because each new cell multiplies the named values by ten but the pattern space by sixteen. BCD does not converge on efficiency as it grows; it bleeds out. Three cells name $1{,}000$ of $4{,}096$ patterns, while pure 12-bit binary reaches $4{,}095$ — about $4.10$ times the BCD range of $999$. Nobody chose BCD for its density.' },
    { kind: 'para', text: 'There is one BCD craft left that the examinations genuinely love, and it explains what those six dead patterns are FOR. Add two BCD numbers cell by cell, as binary, and sometimes a cell lands on one of the six invalid patterns: $0101 + 1000 = 1101$, which is thirteen — past nine, so no digit wears it. The repair is the add-six fix: add $0110$ to the offending cell, which skips the six dead patterns in one jump and produces exactly the carry the decimal column wanted.' },
    { kind: 'example', title: 'Illustration 5. Add 5 and 8 in BCD, and repair the broken cell.', steps: [
      'Encode the digits: $5 = 0101$ and $8 = 1000$.',
      'Add the cells as ordinary binary: $0101 + 1000 = 1101$.',
      'Check the cell: $1101_2 = 13 > 9$ — an invalid pattern, so this is not yet BCD.',
      'Now, apply the fix: $1101 + 0110 = 1\\;0011$.',
      'Read the carry: the leading 1 carries into the next cell, leaving $0011 = 3$ — so the answer\u2019s cells read 1 then 3.',
      'Hence $5 + 8 = 13$ in BCD: the raw cell 1101 was invalid, and adding six rolled it over into the legal pair 0001 0011.',
    ] },
    { kind: 'para', text: 'Why six, of all repairs? Because the cell is sixteen patterns wide but only ten are legal: the gap between the binary roll-over at sixteen and the decimal roll-over at ten is exactly six. Adding six to any raw sum in the range ten to fifteen lifts it past the six dead patterns and lands it where the DECIMAL count continues — the carry it produces is the decimal carry, and the cell it leaves behind is a legal digit. The fix is not a trick; it is the arithmetic of the mismatch itself.' },
    { kind: 'callout', tone: 'insight', title: 'Note — why BCD survived anyway', text: 'Sixty per cent waste looks fatal, and in pure storage terms it is. But the waste buys something no dense encoding offers: ONE DIGIT PER CELL. A decimal display wires to a BCD register digit by digit through a four-line decoder; an accounting machine rounds, truncated and audited column by column, in decimal, with no conversion ever touching the cents. When the contest is \u2018how many values per byte\u2019, binary wins by 2.58 to one; when the contest is \u2018how directly do the digits face the world\u2019, BCD wins without contest. Codes are chosen by their jobs, not by their density — the moral of this whole lesson in one sentence.' },
    { kind: 'terms', items: [
      { term: 'BCD (binary-coded decimal)', def: 'a code storing each decimal digit as one 4-bit pattern with weights 8-4-2-1 — one digit per cell, no carries between cells.' },
      { term: 'Invalid BCD patterns', def: 'the six 4-bit patterns 1010 through 1111, whose values 10 to 15 exceed every decimal digit; a legal BCD cell can never hold one.' },
      { term: 'Add-six fix', def: 'the repair that returns a BCD cell from an invalid sum: adding 0110 skips the six dead patterns and produces the correct decimal carry.' },
    ] },
    { kind: 'formula', name: 'The BCD cell', latex: 'd \\;\\mapsto\\; (d_3 d_2 d_1 d_0)_2, \\qquad d = 8d_3 + 4d_2 + 2d_1 + d_0', note: 'One decimal digit per 4-bit cell, weights 8-4-2-1: BCD(45) = 0100 0101, and the six patterns 1010 to 1111 are invalid.' },

    // ================================================================
    // 3. ASCII: THE SPINE OF TEXT
    // ================================================================
    { kind: 'heading', text: 'ASCII: the Spine of Text' },
    { kind: 'para', text: 'BCD codes digits. But a page of text is not only digits — it is letters, punctuation, spaces, and a quiet stream of instructions to the machinery itself (\u2018start a new line\u2019, \u2018ring the bell\u2019). By the late 1950s every major manufacturer had its own table for these, and a tape punched on one machine unwound as gibberish on another — the contract broken at every brand boundary. The American Standards Association struck a committee to end the chaos, and on 17 June 1963 it approved a seven-bit code for information interchange: ASA X3.4-1963, known ever after as ASCII. It is one of the most successful standards in the history of engineering: sixty years on, the code of the letter A has not moved.' },
    { kind: 'callout', tone: 'historical', title: 'X3.4-1963 — the standard that froze', text: 'The committee behind ASCII worked through 1960 to 1963 under the American Standards Association (the section numbering, X3.4, gives the code its formal name; the ASA is today\u2019s ANSI). Approval came on 17 June 1963. The first published table left a small hole — the lower-case letters and several symbols were among the positions still undecided — and the major revision of 1967 filled them in, giving the code the shape you now learn. Two honest notes: the teleprinter heritage is visible everywhere (the control codes carry names like carriage return), and the designers deliberately left the eighth bit of the byte alone, never guessing what mischief would grow there.' },
    { kind: 'para', text: 'Now the budget, and notice how exactly it fits. Seven bits name $2^7 = 128$ codes. The committee needed: the 95 printable symbols of ordinary American text — space, digits, letters, punctuation — plus 33 control codes for the machinery. And $33 + 95 = 128$: ASCII fills its budget EXACTLY, with not one spare pattern in the seven-bit table. It is the only code in this lesson that can make that boast, and it is worth pausing on: the designers counted the world they wanted and it came to precisely 128.' },
    { kind: 'para', text: 'The 128 codes split at two clean joints. Codes 0 through 31 are the 32 control characters, and DEL at 127 makes the 33rd; codes 32 through 126 are the 95 printables, with the space as the first of them — a printable symbol, note, not \u2018nothing\u2019. Table 3 files the landmarks that every examination and every working programmer carry cold; Figure 2 then draws the printable strip as a map, with the three blocks shaded and the arithmetic marked on it.' },
    { kind: 'table', caption: 'Table 3. The ASCII landmarks — the codes the examinations ask for, and what each names.', head: ['Code', 'Symbol', 'Role', 'Code', 'Symbol', 'Role'], rows: [
      ['$32$', 'space', 'first printable', '$90$', 'Z', 'last uppercase'],
      ['$48$', '0', 'first digit', '$97$', 'a', 'first lowercase'],
      ['$57$', '9', 'last digit', '$122$', 'z', 'last lowercase'],
      ['$65$', 'A', 'first uppercase', '$126$', 'tilde', 'last printable'],
      ['$66$', 'B', 'second letter', '$127$', 'DEL', 'closes the 128'],
    ] },
    { kind: 'figure', caption: 'Figure 2. The ASCII arithmetic map: the printable codes 32 to 126 with the digits block (48 to 57), the uppercase block (65 to 90) and the lowercase block (97 to 122) shaded, the +16 step from space to 0, and the +32 case-flip arc from A to a - bit 5.', svg: cf33AsciiMapSvg() },
    { kind: 'para', text: 'Three blocks carry the whole arithmetic, and their positions are not decoration — they are the design. The digits sit at 48 to 57: ten consecutive codes, so the digit\u2019s VALUE is always the code minus 48. The uppercase letters sit at 65 to 90, the lowercase at 97 to 122, and the two blocks are parallel: the same letter wears two codes exactly 32 apart. Look at the map\u2019s arc: $97 - 65 = 32$, and $32 = 2^5 = 100000_2$ — a single bit. In seven-bit frames, $A = 1000001_2$ and $a = 1100001_2$: one bit apart, and that bit is bit 5 (counting from bit 0 at the right). Setting bit 5 lowercases a letter; clearing it uppercases; XOR with 32 flips either way. The case of a letter rides on ONE switch, which is why a single instruction converted case for fifty years of software.' },
    { kind: 'example', title: 'Illustration 6. Work out the code of F, then of f, from the landmarks alone.', steps: [
      'Take the landmark: $A = 65$, and F is the sixth letter, so five steps above A.',
      'Add the offset: $65 + 5 = 70$, so $F = 70$.',
      'Now, apply the case flip: $f = F + 32 = 70 + 32 = 102$.',
      'Check the frames: $70 = 1000110_2$ and $102 = 1100110_2$ — bit 5 is the only difference.',
      'Hence $F = 70$ and $f = 102$, both derived from $A = 65$ plus the block design.',
    ] },
    { kind: 'example', title: 'Illustration 7. Draw the seven-bit frames of Q and q, and identify the flip bit.', steps: [
      'Take the position of Q in the alphabet: the 17th letter, so $Q = 64 + 17 = 81$.',
      'Frame it: $81 = 1010001_2$ — seven bits, weights 64 down to 1.',
      'Now, the lowercase twin: $q = 81 + 32 = 113$.',
      'Frame it too: $113 = 1110001_2$.',
      'Compare the frames position by position: only the second bit from the left differs — bit 5, worth 32.',
      'Hence $Q = 1010001_2 = 81$ and $q = 1110001_2 = 113$: one bit, the whole case flip.',
    ] },
    { kind: 'example', title: 'Illustration 8. Use the digit arithmetic: what is the character distance from 3 to 9?', steps: [
      'Take the landmark: $0 = 48$, and the digits run consecutively from there.',
      'So, $9 = 48 + 9 = 57$ and $3 = 48 + 3 = 51$.',
      'Subtract the codes: $57 - 51 = 6$.',
      'Equivalently, strip the offset from both: $57 - 48 = 9$ and $51 - 48 = 3$, and $9 - 3 = 6$.',
      'Hence the distance is 6 — the digit arithmetic works because the block is consecutive, and $7 - 0 = 7$ (codes $55 - 48$) shows the same law.',
    ] },
    { kind: 'para', text: 'The digit arithmetic deserves its own headline, because it is the one piece of ASCII that software uses every single day. To parse the number inside the text \u2018473\u2019, a program reads each character\u2019s code and subtracts 48: $52 - 48 = 4$, $55 - 48 = 7$, $51 - 48 = 3$. The digits were placed consecutively at 48 precisely so that this subtraction — and nothing else — recovers the value. The same design wisdom put the letters in two parallel blocks so that sorting by CODE sorts alphabetically (uppercase first), and put the space BELOW the letters so that a space sorts before every word. A good code is not a list; it is arithmetic wearing a table.' },
    { kind: 'para', text: 'One bridge back to lesson 3.2 before we leave the landmarks: the hex view. Space is $32 = 0\\text{x}20$, the digit 0 is $48 = 0\\text{x}30$, A is $65 = 0\\text{x}41$, and a is $97 = 0\\text{x}61$. In hex the map\u2019s geometry becomes tidy rows — digits at 0x30 to 0x39, uppercase at 0x41 to 0x5A, lowercase at 0x61 to 0x7A — and the case flip reads as adding 0x20. Memory dumps, URL escapes and error messages speak ASCII in hex; you now read all three.' },
    { kind: 'para', text: 'And the 33 control codes? They are the machinery\u2019s vocabulary, inherited from the teleprinters the code was born to serve. A few still order daily life: LF (10) moves to the next line, CR (13) returns to the line\u2019s start — the pair behind every \u2018newline\u2019 war between operating systems — ESC (27) starts an escape sequence, and BEL (7) literally rang the bell on a teletype (many terminals still beep on meeting it). DEL at 127 was placed opposite the controls so that punching out every bit of a paper tape erased a character: all ones, the obliteration pattern. Table 4 files the ones worth knowing by name.' },
    { kind: 'table', caption: 'Table 4. The control codes worth knowing by name — the machinery\u2019s five-word vocabulary.', head: ['Code', 'Name', 'What it orders'], rows: [
      ['$7$', 'BEL', 'ring the terminal bell (the teletype heritage, literal)'],
      ['$10$', 'LF', 'line feed — move down one line'],
      ['$13$', 'CR', 'carriage return — return to the line\u2019s start'],
      ['$27$', 'ESC', 'escape — announce a control sequence'],
      ['$127$', 'DEL', 'delete — close the 128; the all-ones obliteration pattern'],
    ] },
    { kind: 'para', text: 'How does a keypress actually become one of these codes? Lesson 2.1 met the keyboard\u2019s grid and the scan code it emits — a number naming the PHYSICAL key, which is not yet a character at all. Between scan code and character stands the layout table: the agreement that says which code point the current layout (QWERTY, Dvorak, a Devanagari or Bengali layout) assigns to that key in that modifier state. The algorithm block below walks the whole journey, from the finger to the glyph — and notice where the contracts stack: the grid agreement, the layout agreement, the encoding agreement, and finally the font\u2019s picture. Four tables, each swappable, which is exactly why keyboards can change language without changing hardware.' },
    { kind: 'algorithm', title: 'How a keypress becomes a character', lines: [
      { code: 'PRESS     a key closes on the keyboard grid', note: 'the controller reads which row met which column and emits a scan code — a number naming the physical key, not yet a character (the grid was lesson 2.1\u2019s story).' },
      { code: 'LOOK UP   the scan code in the active layout table', note: 'the layout — QWERTY, Dvorak, Devanagari, any — maps the physical key, with its modifier state, to a character.' },
      { code: 'FETCH     the character\u2019s code point', note: 'for the classic keys the point is the ASCII code; for the rupee sign and beyond it is a Unicode code point.' },
      { code: 'ENCODE    the code point as bytes', note: 'UTF-8 dresses the point in one to four bytes — the classes this lesson builds below.' },
      { code: 'SEND      the bytes to the far end', note: 'the contract now rides two agreements: the encoding both ends share, and the table both ends hold.' },
      { code: 'DECODE    and RENDER at the receiving end', note: 'the same table turns bytes back into a code point, and a font supplies the glyph — the picture of the character.' },
    ], note: 'Six moves, four stacked contracts (grid, layout, encoding, font) — and every one of them is a table somebody agreed to hold.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the design wisdom of 1963', text: 'Every landmark in this section is one instance of one decision: PLACE RELATED SYMBOLS AT RELATED CODES. Digits consecutive at 48, so value = code minus 48. Letters in two parallel blocks 32 apart, so case is one bit. Space below everything, so it sorts first. Sorting, parsing and case-conversion all fall out of the table\u2019s GEOMETRY — no rules needed beyond the numbering itself. When you meet a code that survives sixty years, look for this property first.' },
    { kind: 'terms', items: [
      { term: 'ASCII', def: 'the 7-bit code of ASA X3.4-1963 (major revision 1967): 128 codes split as 33 control and 95 printable, filling the budget exactly.' },
      { term: 'Control character', def: 'a code naming an instruction for the machinery rather than a printable symbol — LF 10, CR 13, ESC 27, DEL 127 among the 33.' },
      { term: 'Case flip', def: 'the ASCII identity that lowercase code = uppercase code + 32: bit 5 is the toggle, since 32 = 100000 in binary.' },
      { term: 'Digit arithmetic', def: 'the ASCII identity value = code minus 48, valid because the ten digits sit consecutively at 48 to 57.' },
    ] },
    { kind: 'formula', name: 'The case-flip law', latex: '\\text{code}(\text{lower}) = \\text{code}(\text{upper}) + 32', note: 'a - A = 97 - 65 = 32 = 100000 in binary: bit 5 is the case toggle, and XOR with 32 flips either way.' },
    { kind: 'formula', name: 'The digit arithmetic', latex: '\\text{value}(d) = \\text{code}(d) - 48', note: 'The digits sit consecutively at 48 to 57, so subtracting 48 from a character code recovers the digit\u2019s value — the parser\u2019s daily tool.' },

    // ================================================================
    // 4. THE EIGHT-BIT ERA: CODE PAGES AND FRAGMENTATION
    // ================================================================
    { kind: 'heading', text: 'The Eight-Bit Era: Code Pages and Fragmentation' },
    { kind: 'para', text: 'ASCII froze at seven bits just as the byte was freezing at eight, and that left 128 patterns of every byte with nothing assigned to them. The temptation was irresistible, and it was spent — differently in every market. An \u2018extended ASCII\u2019 family fills codes 128 to 255 with a second block of 128 symbols: an eighth-bit family, a CODE PAGE, is the ASCII 128 plus one chosen extension. Eight bits name $2^8 = 256$ codes — the whole byte — and for a decade the computing world tried to live inside them.' },
    { kind: 'para', text: 'The arithmetic of the attempt is worth stating exactly: $128 + 128 = 256$, the ASCII half plus the extension half. Western European languages filled their pages with accented letters — Latin-1 (ISO 8859-1) is the famous one. Other regions filled theirs with their own needs: Cyrillic pages, Greek pages, Thai pages, and the many single-byte pages that carried one Indian script each, partially. Every page was a perfectly good contract — the tragedy was that no two machines held the same one.' },
    { kind: 'table', caption: 'Table 5. The same bytes, different tables — how code pages misread one another (illustrative readings).', head: ['Bytes (hex)', 'Read as Latin-1', 'Read as a UTF-8 machine'], rows: [
      ['$\\text{E9}$', 'the letter e-acute', 'an invalid start — E9 announces a 3-byte run'],
      ['$\\text{C3 A9}$', 'the two characters A-tilde, copyright', 'the single letter e-acute'],
      ['$\\text{41}$', 'the letter A', 'the letter A — the one reading they share'],
    ] },
    { kind: 'para', text: 'Read Table 5 slowly, because it is the 1980s in three rows. The byte E9 is é in Latin-1; on a UTF-8 machine it is the START of a three-byte character, and meeting it alone is an error. The pair C3 A9 — UTF-8\u2019s é, as you will compute by hand later in this lesson — reads in Latin-1 as two unrelated symbols: the ghost pair you met in the mojibake story of section 1. Only the plain ASCII byte 41 reads identically everywhere, because every page agreed to hold ASCII fixed in its lower half. That agreement — ASCII as the frozen floor of every later table — is the one fragment of the code-page peace that survived.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the one-byte-per-character assumption', text: 'The code-page era trained the world to think \u2018one character, one byte\u2019, and the assumption is now false twice over. In Unicode, a character\u2019s NUMBER (a code point) is not its storage; and in UTF-8 the storage is one to FOUR bytes depending on the character. When a system truncates, pads or counts strings BYTES at a time in the belief that bytes are characters, it cuts characters in half — the modern descendant of the mojibake bug. Count code points, or count bytes, but never confuse the two censuses.' },
    { kind: 'para', text: 'Why did 256 codes fail? Not through any engineering fault, but through arithmetic and geography. The world\u2019s scripts need far more than 256 distinct characters — the CJK scripts of Chinese, Japanese and Korean run to many thousands of ideographs before you write a single sentence of prose — and no single page could serve even two of the world\u2019s regions at once. A machine bought in one country misread every document written in another. The fragmenting had no local fix: 256 was simply not the world. The repair had to start from a bigger budget and a single shared table — and that is the next rung of the ladder.' },

    // ================================================================
    // 5. UNICODE: ONE TABLE FOR THE WORLD
    // ================================================================
    { kind: 'heading', text: 'Unicode: One Table for the World' },
    { kind: 'para', text: 'The answer that finally held is almost brazen in its simplicity: give EVERY character, of EVERY script, its own permanent number — one table, shared by everyone, with room to spare. The Unicode project published version 1.0.0 in October 1991 with that charter, and the table has grown by accretion ever since: every version adds characters, and — this is the discipline that makes the whole thing work — a code once assigned to a character is never reassigned. Stability is the product. A document encoded in 1991 decodes today; the contract, once written, is never rewritten.' },
    { kind: 'callout', tone: 'historical', title: 'October 1991 — the table that promised never to move', text: 'Unicode 1.0.0 dates from October 1991, the joint work of an industry consortium that had watched the code-page wars from inside. The design decision that mattered most was NOT the size of the space but its PERMANENCE: assignments are forever, so that encodings never rot. The project also standardised far more than letters — digits, punctuation, mathematical symbols, combining marks, and (in time) the emoji that now ride every message. Our numbers in this section are pinned to version 17.0, released 9 September 2025 — thirty-four years of accretion after 1.0.0.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — code point', text: 'A `code point` is said to be one of the numbered cells of the Unicode table: a value from $0$ to $1{,}114{,}112 - 1$, written $\\text{U+}$ followed by up to six hex digits — U+0041 for A, U+00E9 for e-acute, U+20B9 for the rupee sign. The code point is the character\u2019s PERMANENT NUMBER, independent of how it is stored.' },
    { kind: 'derivation', title: 'The code-space census', statement: 'Count the cells of the Unicode table: how many code points exist, and why the number is exactly 1,114,112?', steps: [
      { label: 'Take the unit', formula: '2^{16} = 65{,}536', explanation: 'Unicode organises its space in PLANES of 65,536 code points each — one sixteen-bit plane, a natural unit.' },
      { label: 'Count the planes', formula: '17 \\times 65{,}536 = 1{,}114{,}112', explanation: 'seventeen planes, numbered 0 to 16 — a deliberate ceiling of twenty-one bits\u2019 worth of room.' },
      { label: 'State the range', formula: '\\text{U+0000 to U+10FFFF}', explanation: 'plane 0 spans U+0000 to U+FFFF, and plane 16 ends at U+10FFFF — hex 10FFFF plus one is exactly 1,114,112.' },
      { label: 'Reserve the surrogates', formula: '\\text{U+D800 to U+DFFF} = 2{,}048 \\text{ values}', explanation: 'inside plane 0, these 2,048 cells are reserved as machinery for the UTF-16 encoding — they never name characters.' },
    ], result: 'So the table has $17 \\times 65{,}536 = 1{,}114{,}112$ cells, U+0000 through U+10FFFF, of which 2,048 are surrogate machinery — a twenty-one-bit address space holding a sixteen-bit core.' },
    { kind: 'equation', latex: '17 \\times 65{,}536 \\;=\\; 1{,}114{,}112 \\;=\\; \\text{U+10FFFF} + 1 \\tag{3}', note: 'The Unicode code-space census: seventeen planes of 65,536 cells — one million one hundred fourteen thousand one hundred twelve numbered cells in all.' },
    { kind: 'para', text: 'Walk the planes once, because the walk fixes the witnesses you will use for the rest of the lesson. Plane 0, U+0000 to U+FFFF, is the Basic Multilingual Plane — the BMP — and it holds the bulk of the world\u2019s daily scripts: ASCII at its very start, the Indian scripts, the Arabic and East Asian blocks, the symbols. Planes 1 through 16 hold $16 \\times 65{,}536 = 1{,}048{,}576$ further cells — mathematical alphanumerics, historic scripts, and the emoji: the slightly-smiling face you will encode by hand is U+1F642, which is $128{,}578$, sitting in plane 1. The rupee sign is U+20B9, which is $8{,}377$ — plane 0, a three-byte character when you meet it in UTF-8. A code point\u2019s PLANE is just its value divided by 65,536, and its place in the plane is the remainder.' },
    { kind: 'table', caption: 'Table 6. The Unicode census, version 17.0 (9 September 2025) — the honest fill.', head: ['Quantity', 'Value', 'Reading'], rows: [
      ['Code space', '$17 \\times 65{,}536 = 1{,}114{,}112$', 'cells U+0000 to U+10FFFF'],
      ['Assigned characters', '$159{,}801$', 'the 17.0 fill of the space'],
      ['Fill fraction', '$14.3434\\%$', 'about one-seventh of the cells'],
      ['Surrogate block', '$2{,}048$ values', 'U+D800 to U+DFFF — machinery, never characters'],
      ['Space in byte-units', '$1{,}114{,}112 / 256 = 4{,}352$', 'the table spans 4,352 whole byte-spaces'],
    ] },
    { kind: 'para', text: 'Now the honest census of the fill, because a space this size deserves honest accounting. Version 17.0, released 9 September 2025, carries $159{,}801$ characters — which is $14.3434\\%$ of the space: under one cell in seven. Check the claim in the coarsest way: seven fills of $159{,}801$ would be $1{,}118{,}607$, which exceeds the whole space of $1{,}114{,}112$ — so the table is indeed less than a seventh full. And the space itself is enormous by byte standards: $1{,}114{,}112 / 256 = 4{,}352$ — the Unicode table spans four thousand three hundred fifty-two ENTIRE code pages. The designers did not buy room for the world\u2019s scripts; they bought room for every script, every historic notation, and every future invention that anyone might ever standardise.' },
    { kind: 'callout', tone: 'insight', title: 'Note — why buy a space you cannot fill', text: 'Less than a seventh full looks like extravagance — until you price the alternative. The code-page era failed because every extension BROKE the previous contract; Unicode\u2019s fix was to make the address space so large that extensions never need to displace anything. A 21-bit ceiling with a 16-bit core also keeps the machinery simple: the high planes are exactly the code points that need four UTF-8 bytes, so the space\u2019s SIZE is visible in the encoding\u2019s CLASSES — the census you will close at the end of this lesson.' },
    { kind: 'terms', items: [
      { term: 'Code point', def: 'one numbered cell of the Unicode table, a value from 0 to 1,114,111 written U+ followed by hex digits — the character\u2019s permanent number.' },
      { term: 'Plane', def: 'a block of 65,536 consecutive code points; seventeen planes, numbered 0 to 16, tile the whole space.' },
      { term: 'BMP (Basic Multilingual Plane)', def: 'plane 0, U+0000 to U+FFFF — the sixteen-bit core holding most daily scripts, from ASCII to the Indian and East Asian blocks.' },
      { term: 'Surrogate', def: 'one of the 2,048 values U+D800 to U+DFFF, reserved as pairing machinery for the UTF-16 encoding; a surrogate never names a character.' },
    ] },

    // ================================================================
    // 6. UTF-8: THE ENCODING THAT WON THE WEB
    // ================================================================
    { kind: 'heading', text: 'UTF-8: the Encoding that Won the Web' },
    { kind: 'para', text: 'Unicode settled WHAT each character\u2019s number shall be. It did not settle how those numbers should ride a wire or rest in a byte memory — and the obvious answer, \u2018give every code point four fixed bytes\u2019, has a terrible flaw when you look at the census: $159{,}801$ characters, of which the vast majority of daily text is ASCII, would charge FOUR bytes for what one byte used to carry. Every English document on earth would quadruple overnight. The winning scheme instead lets each code point take the smallest dress that fits: one byte if it is ASCII, two, three or four as its number grows. It is called UTF-8, and it was designed in September 1992 by Ken Thompson with Rob Pike — famously on a placemat in a New Jersey diner, with the FSS-UTF proposal following within days.' },
    { kind: 'callout', tone: 'historical', title: 'September 1992 — the placemat', text: 'The account is famous because the participants themselves told it: Thompson and Pike met for a meal in a New Jersey diner near the Bell Labs where both then worked, and sketched the byte classes on the placemat; the FSS-UTF proposal (File System Safe UTF) followed within days, and the scheme, renamed UTF-8, went on to become the dominant text encoding of the web. No placemat survives — the story is a retelling by its own heroes, which is the best provenance a legend can have, and the DESIGN itself is fully documented. What they wrote is the next table.' },
    { kind: 'figure', caption: 'Figure 3. The placemat, September 1992 (an honest sketch, no portrait): the four class rows exactly as drawn - 0xxxxxxx for one byte, 110xxxxx plus continuation bytes for two, 1110xxxx for three, 11110xxx for four.', svg: cf33PlacematSvg() },
    { kind: 'para', text: 'Here is the whole scheme, and you can hold it in one breath. A byte whose top bit is 0 — pattern $0\\text{xxxxxxx}$ — is a complete one-byte character: it is ASCII, unchanged, forever. A byte beginning 110 ANNOUNCES a two-byte character and carries the first five payload bits; each byte beginning 10 CONTINUES the character and carries six more. Three-byte characters lead with 1110 and carry sixteen bits; four-byte characters lead with 11110 and carry twenty-one. The leading byte counts its own ones — 110, 1110, 11110 — so the length of every character is announced at its front door, and the continuation bytes are unmistakable anywhere in a stream.' },
    { kind: 'table', caption: 'Table 7. The four UTF-8 classes — leading pattern, code-point range, payload and census.', head: ['Class', 'Byte pattern', 'Code points', 'Payload bits', 'Patterns', 'Legal'], rows: [
      ['1-byte', '$0\\text{xxxxxxx}$', 'U+0000 to 007F', '$7$', '$128$', '$128$'],
      ['2-byte', '$110\\text{xxxxx}\\;10\\text{xxxxxx}$', 'U+0080 to 07FF', '$11$', '$2{,}048$', '$1{,}920$'],
      ['3-byte', '$1110\\text{xxxx}\\;10\\text{xxxxxx}\\;10\\text{xxxxxx}$', 'U+0800 to FFFF', '$16$', '$65{,}536$', '$63{,}488$'],
      ['4-byte', '$11110\\text{xxx}\\;10\\text{xxxxxx}\\;10\\text{xxxxxx}\\;10\\text{xxxxxx}$', 'U+10000 to 10FFFF', '$21$', '$2{,}097{,}152$', '$1{,}048{,}576$'],
    ] },
    { kind: 'figure', caption: 'Figure 4. The four UTF-8 classes as a diagram: leading bytes announce the length by counting their own 1s, continuation bytes always begin 10, and the legal census runs 128, 1,920, 63,488 and 1,048,576.', svg: cf33Utf8ClassesSvg() },
    { kind: 'derivation', title: 'The closure census: four classes, one space', statement: 'Show that the four UTF-8 classes tile the Unicode code space exactly: their legal code points sum to 1,114,112 with nothing missing and nothing double-counted.', steps: [
      { label: 'Count the payload patterns', formula: '2^7,\\; 2^{11},\\; 2^{16},\\; 2^{21}', explanation: 'the classes carry 7, 11, 16 and 21 free bits, so they can spell 128, 2,048, 65,536 and 2,097,152 patterns respectively.' },
      { label: 'Ban the overlong spellings', formula: '2{,}048 - 128 = 1{,}920', explanation: 'the 2-byte class COULD re-spell the 128 ASCII characters with a wasteful leading byte; those overlong forms are forbidden, leaving 1,920 legal code points.' },
      { label: 'Exclude the surrogates', formula: '65{,}536 - 2{,}048 = 63{,}488', explanation: 'the 3-byte class spans the whole BMP, but the 2,048 surrogate values never name characters, so 63,488 real code points remain.' },
      { label: 'Cap at the ceiling', formula: '2{,}097{,}152 \\to 1{,}048{,}576', explanation: 'the 4-byte class could spell 2,097,152 patterns, but the code space ends at U+10FFFF — exactly half of it, $2^{20}$, is addressable.' },
      { label: 'Sum the classes', formula: '128 + 1{,}920 + 63{,}488 + 1{,}048{,}576 = 1{,}114{,}112', explanation: 'the four legal censuses add to the code-space census of the last section — the same 1,114,112, reached by two independent roads.' },
    ], result: 'So the four classes tile the space exactly: $128 + 1{,}920 + 63{,}488 + 1{,}048{,}576 = 1{,}114{,}112$ — the class census and the plane census agree, and neither a code point is missing nor a pattern wasted.' },
    { kind: 'equation', latex: '128 + 1{,}920 + 63{,}488 + 1{,}048{,}576 \\;=\\; 1{,}114{,}112 \\;=\\; 17 \\times 65{,}536 \\tag{4}', note: 'The closure census: the four UTF-8 classes, counted legally, sum to the whole Unicode space — the table and its encoding were built for each other.' },
    { kind: 'para', text: 'Now watch the classes do their work on four witnesses, one per class — and work each one by hand, because the encoding is honest enough to be done with pencil and paper. The rule in every case is the same: write the code point in binary, split its bits into the class\u2019s payload groups (five-then-six for two bytes; four-six-six for three; three-six-six-six for four), and prepend each group\u2019s tag.' },
    { kind: 'example', title: 'Illustration 9. Encode the letter A (U+0041) and the letter e-acute (U+00E9) in UTF-8.', steps: [
      'Take the first code point: $\\text{U+0041} = 65$.',
      'Check its class: $65 \\le 127$, the 1-byte class — so the byte IS the code point, $65 = 01000001_2$, top bit clear.',
      'Hence A encodes as the single byte $0\\text{x}41$ — ASCII, unchanged, exactly as the placemat promised.',
      'Now, take the second: $\\text{U+00E9} = 233$, and $128 \\le 233 \\le 2047$, the 2-byte class — eleven payload bits.',
      'Write the payload: $233 = 00011101001_2$ — eleven bits, split as five then six: $00011$ and $101001$.',
      'Prepend the tags: $110\\,00011 = 11000011_2 = 0\\text{x}\\text{C3}$ and $10\\,101001 = 10101001_2 = 0\\text{x}\\text{A9}$.',
      'Hence A is the one byte 41, and é is the two bytes C3 A9 — the very pair the Latin-1 machine misread in section 1.',
    ] },
    { kind: 'example', title: 'Illustration 10. Encode the rupee sign (U+20B9) in UTF-8.', steps: [
      'Take the code point: $\\text{U+20B9} = 8{,}377$ — plane 0, but past the 2-byte ceiling of 2,047.',
      'So, the class is 3-byte: sixteen payload bits, split four-six-six.',
      'Write the payload: $8{,}377 = 0010000010111001_2$ — sixteen bits.',
      'Split it: $0010$, then $000010$, then $111001$.',
      'Now, prepend the tags: $1110\\,0010 = 11100010_2 = 0\\text{x}\\text{E2}$, then $10\\,000010 = 10000010_2 = 0\\text{x}\\text{82}$, then $10\\,111001 = 10111001_2 = 0\\text{x}\\text{B9}$.',
      'Hence ₹ encodes as the three bytes E2 82 B9 — one character, three bytes, no padding bits wasted.',
    ] },
    { kind: 'example', title: 'Illustration 11. Encode the slightly-smiling face (U+1F642) in UTF-8.', steps: [
      'Take the code point: $\\text{U+1F642} = 128{,}578$ — plane 1, past the 3-byte ceiling of 65,535.',
      'So, the class is 4-byte: twenty-one payload bits, split three-six-six-six.',
      'Write the payload: $128{,}578 = 000011111011001000010_2$ — twenty-one bits.',
      'Split it: $000$, then $011111$, then $011001$, then $000010$.',
      'Now, prepend the tags: $11110\\,000 = 11110000_2 = 0\\text{x}\\text{F0}$, then $10\\,011111 = 10011111_2 = 0\\text{x}\\text{9F}$, then $10\\,011001 = 10011001_2 = 0\\text{x}\\text{99}$, then $10\\,000010 = 10000010_2 = 0\\text{x}\\text{82}$.',
      'Hence 🙂 encodes as the four bytes F0 9F 99 82 — the 4-byte class, working exactly as census (4) promised.',
    ] },
    { kind: 'example', title: 'Illustration 12. Count the UTF-8 bytes of the string A = ₹.', steps: [
      'Take the string character by character: A, space, equals, space, rupee.',
      'Check the ASCII four: A is $0\\text{x}41$, space is $0\\text{x}20$, equals is $0\\text{x}3D$, space again $0\\text{x}20$ — four bytes.',
      'Take the rupee: Illustration 10 gave E2 82 B9 — three bytes.',
      'So, the string\u2019s byte census is $4 + 3 = 7$.',
      'Hence A = ₹ is the 7 bytes 41 20 3D 20 E2 82 B9 — in decimal, 65 32 61 32 226 130 185: five characters, seven bytes, and the two censuses differ honestly.',
    ] },
    { kind: 'para', text: 'Two cautions close the section. First, the OVERLONG ban: the 2-byte class can physically spell the ASCII characters — 110 00000 followed by 10 1000001 also names 65 — but every such spelling is ILLEGAL, because a character must wear its smallest dress. The ban is not pedantry: with it, every code point has exactly ONE byte sequence, so byte-wise equality means character-wise equality, and searching or comparing text never needs decoding. Second, the classes are CENSUSES, not decorations: the 2,048 patterns of the 2-byte class lose 128 to the ban, the 65,536 of the 3-byte class lose 2,048 to the surrogates, and the 2,097,152 of the 4-byte class lose half to the U+10FFFF ceiling — which is how equation (4) closes to the plane on the other side of the equals sign.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — UTF-8 length is a property of the character', text: 'The byte length of a character in UTF-8 is fixed by its CODE POINT\u2019S CLASS: 1 for U+0000 to 007F, 2 for U+0080 to 07FF, 3 for U+0800 to FFFF, 4 for U+10000 to 10FFFF. The rupee (U+20B9) is always 3 bytes; a smiley (U+1F642) is always 4. Examinations ask exactly this — \u2018how many bytes does X take in UTF-8?\u2019 — and the answer is a class lookup, not a guess. And a string\u2019s byte census is the SUM of its characters\u2019 classes, which is why \u2018A = ₹\u2019 is 7 bytes, not 5.' },
    { kind: 'terms', items: [
      { term: 'UTF-8', def: 'the variable-length encoding of Unicode designed by Thompson and Pike in September 1992: one to four bytes per code point, ASCII unchanged.' },
      { term: 'Leading byte', def: 'the first byte of a multi-byte UTF-8 character — 110, 1110 or 11110 — which announces the length by counting its own ones.' },
      { term: 'Continuation byte', def: 'a byte of the form 10xxxxxx — one of the 64 values 0x80 to 0xBF; it never leads, it always follows, carrying six payload bits.' },
      { term: 'Overlong encoding', def: 'an illegal spelling of a code point in more bytes than its class requires; banned so that each code point has exactly one byte sequence.' },
    ] },
    { kind: 'formula', name: 'The UTF-8 census', latex: '128 + 1{,}920 + 63{,}488 + 1{,}048{,}576 = 1{,}114{,}112', note: 'The four classes, counted legally, tile the Unicode space exactly: 1 byte for ASCII, 2 to U+07FF, 3 to U+FFFF, 4 to U+10FFFF.' },

    // ================================================================
    // 7. WHY UTF-8 WON: SELF-SYNCHRONIZATION
    // ================================================================
    { kind: 'heading', text: 'Why UTF-8 Won: Self-Synchronization' },
    { kind: 'para', text: 'The placemat\u2019s design carries one property that decided the encoding wars, and it is worth naming precisely. Suppose you join a byte stream in the MIDDLE — a download resumed, a broadcast tuned in late, a file read from an arbitrary offset — and must find where the next character begins. In UTF-8 you need no memory of what came before: a byte below $0\\text{x}80$ is a complete ASCII character; a byte from $0\\text{x}80$ to $0\\text{x}BF$ begins with 10 and is a continuation, so walk on; anything else is a leading byte announcing its own length. The stream TELLS you, byte by byte, who you are looking at. The census behind the spotting rules: 128 ASCII bytes, 64 continuation values, 32 values of 110xxxxx, 16 of 1110xxxx, 8 of 11110xxx — $128 + 64 + 32 + 16 + 8 = 248$ classified byte values, with only the 8 values $0\\text{x}\\text{F8}$ to $0\\text{x}\\text{FF}$ never leading anything.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — self-synchronization', text: 'In a UTF-8 stream, the role of any byte is decidable from the byte alone: below 0x80 it is a one-byte character; in 0x80 to 0xBF a continuation; otherwise a leading byte whose own ones count the followers. Hence a receiver that has lost its position resynchronises after at most 4 bytes — no character rides more than 3 continuation bytes — and no valid byte sequence of one character can be a sub-sequence of another\u2019s. The code is its own index.' },
    { kind: 'para', text: 'Add the second pillar and the victory is explained: FULL ASCII COMPATIBILITY. Every ASCII file ever written — every document of the seven-bit age — is already valid UTF-8, byte for byte, because the 1-byte class IS ASCII. A protocol, a language, an operating system that only ever spoke ASCII needed to change NOTHING to start speaking UTF-8; the é, the ₹ and the 🙂 simply ride along in the bytes above. Faced with a choice between \u2018change nothing and gain the world\u2019 and any alternative, the web chose, and the choice stuck: UTF-8 is the de facto standard for text exchange, and the self-synchronizing, ASCII-compatible design of a 1992 placemat is why.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the two pillars together', text: 'Neither property alone wins. Fixed four-byte encodings are trivially self-synchronizing but break every ASCII document; naive variable schemes stay compatible but lose their place mid-stream. UTF-8\u2019s trick is that the TAGS do double duty: the leading byte\u2019s ones announce length (synchronization), and the choice of 0xxxxxxx for ASCII preserves the old world (compatibility). One set of prefixes, two guarantees — the placemat earned its fame.' },

    // ================================================================
    // 8. THE DOORSTEP: WHERE THE CODES HAND OVER
    // ================================================================
    { kind: 'heading', text: 'The Doorstep: Where the Codes Hand Over' },
    { kind: 'para', text: 'This lesson has followed one thread: the agreements that turn characters into numbers. Lesson 3.4 picks the thread up where the numbers are already safe and asks a bigger census: how much SPACE do text, images and sound take, and why do the censuses run to millions of bytes for a single photograph or a single song? That ground — the media censuses and the compression that tames them — belongs to 3.4; nothing in it will re-teach a code, and everything in it will count bytes you can now encode by hand. One doorstep further along the shelf: when bytes must travel where eavesdroppers listen, the agreements of this lesson meet the transformations of Cryptography — the codes name the symbols first, and only then do the ciphers scramble them.' },
    { kind: 'para', text: 'Two doorstep books deserve their names before we drill. **Arithmetic and Number Systems** owns the full theory of the numbering systems themselves — bases, conversions, the place-value law — of which lesson 3.2 gave you the working core; we borrowed its weight ladder to read the BCD cell and its hexadecimal view to read the ASCII map. **Digital Logic Design** owns the gate-level view: the four-line decoders that wire a BCD register to a seven-segment display, and the carry circuitry behind the add-six fix, are circuits there, not paragraphs here. The codes are contracts; the circuits that keep them are a neighbour\u2019s field.' },

    // ================================================================
    // 9. EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Exam Corner: What the Papers Ask' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the codes in examination dress', text: 'Banking and SSC-style computer-awareness papers, school and board examinations, and Cambridge 9618 / A-level-style asks keep a small, stable set of questions on this ground \u2014 all exam-style: original items written in the examination idiom, never quotations from a real paper. (i) ASCII lookups: the code of A (65), of a (97), of the digit 0 (48) \u2014 and the reverse lookup, which letter is 70 (F). (ii) BCD conversions: the BCD of 45 is 0100 0101, written cell by cell, never the pure binary $0010\\;1101$ the same value wears as a numeral. (iii) The six invalid BCD patterns, 1010 through 1111 \u2014 a favourite one-mark ask. (iv) The Unicode census: how many code points exist ($1{,}114{,}112 = 17 \\times 65{,}536$), and what a code point IS as against an encoding. (v) UTF-8 lengths: the rupee sign takes 3 bytes, a smiley 4 \u2014 a class lookup, never a guess, and the string census is the sum of the classes. Master the landmarks, the cell law and the class table, and every one of the five asks collapses into a lookup or a free regrouping.' },
    { kind: 'para', text: 'Notice, too, what the examination families do NOT ask. They rarely ask you to run the add-six repair through a five-digit sum \u2014 that is working ground, kept for the practice sets below, and papers that want it give you room to work. What they test on this ground is exactly the census: codes, landmarks, invalid patterns, spaces and byte classes. That is why the sets below drill lookups and cell arithmetic first, and save the multi-part synthesis for the top rung \u2014 where every exam-style item is honestly labelled as an original item in the examination idiom, never a real past-paper question.' },

    // ================================================================
    // 10. CHECK YOUR UNDERSTANDING (QUIZ)
    // ================================================================
    { kind: 'heading', text: 'Check Your Understanding' },
    { kind: 'para', text: 'Five questions, one per family of the census. Choose your answer before you read the explanation: each explanation tells you not only why the keyed option is right but exactly why each of the other three fails \u2014 the wrong options are this lesson\u2019s traps wearing dresses, and naming the trap is the revision.' },
    { kind: 'quiz', items: [
      {
        q: 'The ASCII code of the letter A is —',
        options: ['65', '97', '48', '75'],
        answer: 0,
        explain: 'A is the first letter of the uppercase block, and that block begins at 65 \u2014 so A carries 65, worn in seven bits as 1000001, the landmark the whole lesson leans on. The option 97 is the code of the LOWERCASE a, first letter of the parallel block \u2014 the case-flip trap, since 97 is exactly 65 plus 32. The option 48 is the code of the DIGIT 0, first of the ten consecutive digit codes 48 to 57 \u2014 a different block entirely. The option 75 is ten places too high: 75 is the code of K, the eleventh uppercase letter, which you would reach by miscounting A as the zeroth letter of the alphabet. Hence A is 65, and every other uppercase code follows by counting.',
      },
      {
        q: 'How many of the sixteen patterns of a 4-bit cell are invalid in BCD?',
        options: ['4', '5', '2', '6'],
        answer: 3,
        explain: 'A decimal digit needs only ten patterns and the cell holds sixteen, so exactly 16 - 10 = 6 are left dead: 1010, 1011, 1100, 1101, 1110 and 1111, the six whose values run from ten to fifteen. The option 4 would leave twelve legal patterns, but only ten digits exist to name them. The option 5 would leave eleven \u2014 still one more than the digits can fill. The option 2 would leave fourteen, as if only the top two patterns were forbidden; in truth every pattern from 1010 upward is dead. Hence exactly six patterns are invalid \u2014 37.5 percent of every single cell, locked away for good.',
      },
      {
        q: 'The Unicode code space holds exactly how many code points?',
        options: ['65,536', '1,114,112', '2,097,152', '159,801'],
        answer: 1,
        explain: 'Unicode tiles its space into 17 planes of 65,536 cells each, and 17 x 65,536 = 1,114,112 \u2014 the code points U+0000 through U+10FFFF, the census at the heart of section 5. The option 65,536 is ONE plane: the whole of plane 0, the BMP, not the space. The option 2,097,152 is 2 to the power 21, the payload census of the 4-byte UTF-8 class \u2014 twice the space, because the U+10FFFF ceiling caps that class at half its patterns. The option 159,801 is the count of ASSIGNED characters in version 17.0 \u2014 the fill of the space, about one cell in seven, not the space itself. Hence the code space holds exactly 1,114,112 code points.',
      },
      {
        q: 'Encoded in UTF-8, the rupee sign (U+20B9) takes —',
        options: ['1 byte', '2 bytes', '3 bytes', '4 bytes'],
        answer: 2,
        explain: 'The rupee sign is code point 8,377, which lies in the three-byte stretch U+0800 to U+FFFF, so it takes 3 bytes \u2014 E2 82 B9, exactly as Illustration 10 computed by hand. The option 1 byte holds only for ASCII, code points up to 127, and no rupee sign lives in that old world. The option 2 bytes reaches only to U+07FF, that is 2,047 \u2014 far below 8,377. The option 4 bytes begins at U+10000, the supplementary planes where the emoji ride. Hence the rupee takes 3 bytes, and the class lookup, never a guess, is what decides it.',
      },
      {
        q: 'In ASCII, the difference a - A (the code of a minus the code of A) is —',
        options: ['26', '16', '31', '32'],
        answer: 3,
        explain: 'The lowercase block runs parallel to the uppercase block, offset by exactly 32: a = 97 and A = 65, and 97 - 65 = 32, which is 100000 in binary \u2014 bit 5, the single case toggle of the whole code. The option 26 is the size of the alphabet, a count this lesson never uses as an offset; it is there to catch the half-remembered number of letters. The option 16 is a different landmark\u2019s gap: the step from space (32) up to the digit 0 (48). The option 31 is the off-by-one trap \u2014 the COUNT of codes strictly between A and a (66 through 96), not the difference of the endpoints. Hence a - A = 32, one bit, the whole case flip.',
      },
    ] },

    // ================================================================
    // 11. PRACTICE SETS (15 exercises: L1x4, L2x4, L3x4, L4x3)
    // ================================================================
    { kind: 'heading', text: 'Practice Sets' },
    { kind: 'para', text: 'The sets below climb four rungs. L1 begins at the tables themselves — cell lookups, bit budgets, landmark arithmetic. L2 works the crafts: the add-six repair, the class encodings, the censuses. L3 advances to working skills: frames drawn, byte strips counted, four-byte characters assembled by hand. L4 trains the examination idiom — and every L4 item is exam-style, an original item in the examination idiom, never a real past-paper question. The witnesses walk the sets with you: 78, 27 and 18, e-acute, the rupee and both smileys — each met in the lesson above, each worked again under drill conditions.' },
    { kind: 'para', text: 'Work each solution chain with a pencil and say the connectives aloud — Take, Split, Check, Hence: they are the method, not decoration. Where a question carries a figure, the figure is the arithmetic drawn: read it after the chain, and confirm every cell against your own working. The answers stand at the end of each chain as the terminal line.' },
    { kind: 'exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'Write 78 in BCD, cell by cell. State how many cells and bits the encoding uses, and how many bits pure binary would need for the same value.',
            solution: [
              'Take the digits of 78 one at a time: the 7, then the 8.',
              'Encode the 7 with the weights 8-4-2-1: $0111 = 4 + 2 + 1$.',
              'Encode the 8: $1000$ — only the 8-weight is set.',
              'Concatenate the cells in order: $0111\\;1000$ — two cells, $2 \\times 4 = 8$ bits.',
              'Compare with pure binary: $78 = 1001110_2$, which needs only seven bits.',
              'Hence BCD(78) = 0111 1000 — two cells, eight bits, one digit per cell — while pure binary needs seven.',
            ],
            answer: 'BCD(78) = 0111 1000: two cells, eight bits; pure binary needs seven bits.',
            figures: [
              { caption: 'The two BCD cells of 78: 0111 under the weights 8-4-2-1 reads 7, and 1000 reads 8 — eight bits in two cells, where pure binary would need only the seven bits 1001110.', svg: cf33BcdCellSvg() },
            ],
          },
          {
            q: 'A small manufacturer designs a fixed-width code for a character set of 50 symbols. Apply the bit-budget law: how many bits per symbol, and how many spare patterns does the budget leave?',
            solution: [
              'Take the alphabet size: $N = 50$ symbols that the code must separate.',
              'Test the budget below: $2^5 = 32 < 50$, so five bits are too few — eighteen symbols would be homeless.',
              'Now, test one step up: $2^6 = 64 \\ge 50$, so six bits suffice.',
              'Check the law\u2019s sandwich: $2^{k-1} = 32 < 50 \\le 64 = 2^k$, exactly as the theorem promises.',
              'Hence $k = \\lceil \\log_2 50 \\rceil = 6$: six bits per symbol, with $64 - 50 = 14$ spare patterns.',
            ],
            answer: '6 bits per symbol, with 64 - 50 = 14 spare patterns.',
          },
          {
            q: 'Work from the landmarks alone: give the ASCII codes of C, c and the digit 8, and check the case flip on the C pair.',
            solution: [
              'Take the landmark: $A = 65$, and C is the third letter, so two steps above A.',
              'Add the offset: $65 + 2 = 67$, so $C = 67$.',
              'Now, the case flip: $c = C + 32 = 67 + 32 = 99$.',
              'Take the digit landmark: the digits run consecutively from $0 = 48$, so $8 = 48 + 8 = 56$.',
              'Check the flip: $99 - 67 = 32 = 100000_2$ — bit 5, as always.',
              'Hence C = 67, c = 99 and the digit 8 is 56 — all three derived from the landmarks, no table needed.',
            ],
            answer: 'C = 67, c = 99, and the digit 8 is 56.',
          },
          {
            q: 'Name the six invalid patterns of a BCD cell, explain in one line why exactly six are dead, and state what fraction of the cell they lock away.',
            solution: [
              'Take the cell: four bits name $2^4 = 16$ patterns, but a decimal digit needs only ten of them.',
              'Subtract: $16 - 10 = 6$ patterns have no digit to name.',
              'List them: the patterns whose values run from ten to fifteen — $1010, 1011, 1100, 1101, 1110, 1111$.',
              'Take the fraction: $6/16 = 0.375 = 37.5\\%$ of every cell, dead on arrival.',
              'Hence the six invalid patterns are 1010, 1011, 1100, 1101, 1110 and 1111 — 6 of 16 patterns, 37.5% of the cell.',
            ],
            answer: 'The six invalid patterns are 1010, 1011, 1100, 1101, 1110 and 1111 — 6 of 16, which is 37.5% of each cell.',
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Add 27 and 18 in BCD: show the raw cell-by-cell sum, apply the add-six repair where it is due, and verify the result against ordinary arithmetic.',
            solution: [
              'Encode both: $27 = 0010\\;0111$ and $18 = 0001\\;1000$.',
              'Add cell by cell as ordinary binary: tens $0010 + 0001 = 0011$, units $0111 + 1000 = 1111$.',
              'Check the units cell: $1111_2 = 15 > 9$ — an invalid pattern, so the repair is due.',
              'Now, add six: $1111 + 0110 = 1\\;0101$ — the leading 1 carries into the tens cell, leaving $0101 = 5$.',
              'Fold the carry: the tens cell becomes $0011 + 1 = 0100 = 4$.',
              'Hence BCD(27) + BCD(18) = 0100 0101 = BCD 45, and the plain check agrees: 27 + 18 = 45.',
            ],
            answer: 'BCD 45: the cells 0100 0101, and 27 + 18 = 45 confirms it.',
            figures: [
              { caption: 'The add-six repair for 27 + 18: the raw units cell 1111 equals 15, past 9, so adding 0110 carries the 1 into the tens cell and leaves the legal pair 0100 0101 — BCD 45.', svg: cf33AddSixSvg() },
            ],
          },
          {
            q: 'Encode the letter e-acute (U+00E9, code point 233) in UTF-8 by hand: choose the class, split the payload, and assemble the bytes.',
            solution: [
              'Take the code point: $\\text{U+00E9} = 233$.',
              'Choose the class: $128 \\le 233 \\le 2047$, so the 2-byte class — eleven payload bits.',
              'Write the payload: $233 = 00011101001_2$, eleven bits.',
              'Split it five then six: $00011$ and $101001$.',
              'Prepend the tags: $110\\,00011 = 0\\text{x}\\text{C3}$ and $10\\,101001 = 0\\text{x}\\text{A9}$.',
              'Hence e-acute (U+00E9, 233) encodes as the two bytes C3 A9 — the 110 class, five payload bits then six.',
            ],
            answer: 'e-acute encodes as the two bytes C3 A9.',
            figures: [
              { caption: 'Encoding e-acute: the code point 233 in eleven bits, 00011101001, splits five-then-six as 00011 and 101001; the tags 110 and 10 assemble the bytes C3 and A9.', svg: cf33EncodeEacuteSvg() },
            ],
          },
          {
            q: 'Cost the three-cell BCD budget: how many values can twelve BCD bits legally name, how many patterns does the space hold, and what fraction is wasted?',
            solution: [
              'Take the space: twelve bits name $2^{12} = 4{,}096$ patterns.',
              'Count the legal values: three cells name $10 \\times 10 \\times 10 = 1{,}000$ values, 0 through 999.',
              'Subtract: $4{,}096 - 1{,}000 = 3{,}096$ patterns never occur.',
              'Take the fraction: $3{,}096/4{,}096 = 0.755859375 = 75.5859375\\%$.',
              'Hence twelve BCD bits name 1,000 of 4,096 patterns — 3,096 dead, 75.5859375% of the space, worse than the two-cell 60.9375%.',
            ],
            answer: '1,000 legal values of 4,096 patterns; 3,096 wasted = 75.5859375%.',
          },
          {
            q: 'The 3-byte UTF-8 class can physically spell 65,536 patterns, yet its legal census is 63,488. Name the reservation that removes the difference, give its size and range, and state what the reserved values are for.',
            solution: [
              'Take the difference: $65{,}536 - 63{,}488 = 2{,}048$ code points removed.',
              'Name the block: the surrogates, $\\text{U+D800}$ to $\\text{U+DFFF}$, inside plane 0.',
              'Count it: $\\text{U+DFFF} - \\text{U+D800} + 1 = 2{,}048$ values.',
              'State the use: they are PAIRING machinery for the UTF-16 encoding — a high surrogate and a low surrogate together spell one plane-1..16 character.',
              'Hence the 3-byte class loses the 2,048 surrogate values U+D800 to U+DFFF, leaving 65,536 - 2,048 = 63,488 legal code points.',
            ],
            answer: 'The 2,048 surrogates, U+D800 to U+DFFF: 65,536 - 2,048 = 63,488 legal code points.',
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'Draw the seven-bit frames of Q and q, give both code values, and identify the single bit position that differs — name the bit and its weight.',
            solution: [
              'Take the position of Q: the 17th letter, so $Q = 64 + 17 = 81$.',
              'Frame it: $81 = 1010001_2$ — seven bits, weights 64 down to 1.',
              'Now, the lowercase twin: $q = 81 + 32 = 113$.',
              'Frame it too: $113 = 1110001_2$.',
              'Compare position by position: only the second bit from the left differs — bit 5, worth 32.',
              'Hence Q = 1010001 = 81 and q = 1110001 = 113, differing only in bit 5 (weight 32) — the case flip in one picture.',
            ],
            answer: 'Q = 1010001 = 81 and q = 1110001 = 113; the difference is bit 5, weight 32.',
            figures: [
              { caption: 'The case flip in frames: Q is 1010001 (81) and q is 1110001 (113); the two differ only in bit 5, worth 32, under the weights 64 32 16 8 4 2 1.', svg: cf33BitFlipSvg() },
            ],
          },
          {
            q: 'Count the UTF-8 bytes of the string A = ₹ (A, space, equals, space, rupee sign): give every byte in hex, and reconcile the character census with the byte census.',
            solution: [
              'Take the ASCII four: A is $0\\text{x}41$, space $0\\text{x}20$, equals $0\\text{x}3D$, space again $0\\text{x}20$ — four bytes.',
              'Take the rupee: U+20B9 is past the 2-byte ceiling of 2,047, so the 3-byte class — E2 82 B9, as Illustration 10 found.',
              'Sum the classes: $4 + 3 = 7$ bytes for five characters.',
              'Reconcile: the CHARACTER census is 5, the BYTE census is 7 — they differ honestly, because one character rides three bytes.',
              'Hence A = ₹ is the 7 bytes 41 20 3D 20 E2 82 B9 — five characters, seven bytes, both censuses honest.',
            ],
            answer: '7 bytes: 41 20 3D 20 E2 82 B9, for five characters.',
            figures: [
              { caption: 'The byte strip of A = rupee: four ASCII cells 41 20 3D 20 then the rupee\u2019s three cells E2 82 B9 — 4 + 3 = 7 bytes, in decimal 65 32 61 32 226 130 185.', svg: cf33ByteStripSvg() },
            ],
          },
          {
            q: 'Encode the slightly-smiling face (U+1F642, code point 128,578) in UTF-8: choose the class, split the payload three-six-six-six, and assemble all four bytes.',
            solution: [
              'Take the code point: $\\text{U+1F642} = 128{,}578$ — plane 1, past the 3-byte ceiling of 65,535.',
              'So, the class is 4-byte: twenty-one payload bits.',
              'Write the payload: $128{,}578 = 000011111011001000010_2$.',
              'Split it three-six-six-six: $000$, $011111$, $011001$, $000010$.',
              'Prepend the tags: $11110\\,000 = 0\\text{x}\\text{F0}$, $10\\,011111 = 0\\text{x}\\text{9F}$, $10\\,011001 = 0\\text{x}\\text{99}$, $10\\,000010 = 0\\text{x}\\text{82}$.',
              'Hence the smiley U+1F642 = 128,578 encodes as the four bytes F0 9F 99 82.',
            ],
            answer: 'The smiley encodes as the four bytes F0 9F 99 82.',
            figures: [
              { caption: 'Encoding the smiley: the code point 128,578 in twenty-one bits splits 000, 011111, 011001, 000010; the tags 11110 and 10 assemble the four bytes F0 9F 99 82.', svg: cf33EncodeSmileySvg() },
            ],
          },
          {
            q: 'Count the UTF-8 bytes of the string Hi ₹🙂 (H, i, space, rupee, smiley), and explain why the byte census comes to exactly twice the character census.',
            solution: [
              'Take the string character by character: H, i, space, rupee, smiley — five characters.',
              'Class the ASCII three: H, i and space are one byte each.',
              'Take the rupee: the 3-byte class, E2 82 B9.',
              'Take the smiley: the 4-byte class, F0 9F 99 82.',
              'Sum the classes: $3 + 3 + 4 = 10$ bytes for five characters.',
              'Hence Hi ₹🙂 is 10 bytes for 5 characters (3 ASCII + 3 rupee + 4 smiley) — exactly twice the character census, since 10 = 2 x 5 here.',
            ],
            answer: '10 bytes for 5 characters: 3 ASCII + 3 rupee + 4 smiley.',
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'Exam-style (an original item in the examination idiom, not a real past-paper question). Answer five short asks: (a) the ASCII code of a; (b) the BCD of 45; (c) how many 4-bit patterns are invalid in BCD; (d) the number of Unicode code points; (e) the UTF-8 byte length of the rupee sign U+20B9.',
            solution: [
              'Take (a) from the landmark: $a = 97$, with the flip $65 + 32$ as the check.',
              'Take (b) cell by cell: $4 = 0100$ and $5 = 0101$, so BCD$(45) = 0100\\;0101$.',
              'Take (c): the cell holds sixteen patterns, ten legal, so $16 - 10 = 6$ invalid.',
              'Take (d): the space is $17 \\times 65{,}536 = 1{,}114{,}112$ code points.',
              'Take (e): U+20B9 lies in the 3-byte stretch U+0800 to U+FFFF, so 3 bytes — E2 82 B9.',
              'Hence the five answers: a = 97; BCD(45) = 0100 0101; 6 invalid patterns; 1,114,112 code points; the rupee takes 3 bytes.',
            ],
            answer: '(a) 97; (b) 0100 0101; (c) 6; (d) 1,114,112; (e) 3 bytes.',
          },
          {
            q: 'Exam-style (an original item in the examination idiom, not a real past-paper question). The grinning face is U+1F600. Give its code point in decimal, name its plane, give its UTF-8 byte class and bytes, and say how many of its bytes are continuation bytes.',
            solution: [
              'Take the hex apart: $\\text{U+1F600} = 65{,}536 + 62{,}976 = 128{,}512$.',
              'Name the plane: $128{,}512 = 1 \\times 65{,}536 + 62{,}976$, so plane 1 — the first supplementary plane.',
              'Choose the class: past U+FFFF, so the 4-byte class — twenty-one payload bits.',
              'Split it three-six-six-six: $000$, $011111$, $011000$, $000000$.',
              'Prepend the tags: $11110\\,000 = 0\\text{x}\\text{F0}$, $10\\,011111 = 0\\text{x}\\text{9F}$, $10\\,011000 = 0\\text{x}\\text{98}$, $10\\,000000 = 0\\text{x}\\text{80}$.',
              'Hence U+1F600 = 128,512 — plane 1 — encodes as F0 9F 98 80: 4 bytes, of which 3 are continuation bytes.',
            ],
            answer: 'U+1F600 = 128,512, plane 1, the 4-byte class: F0 9F 98 80, with 3 continuation bytes.',
          },
          {
            q: 'Exam-style (an original item in the examination idiom, not a real past-paper question). You join a UTF-8 stream mid-character, and the next byte you read is 0x9F. (a) What is the byte? (b) How do you know without any memory of what came before? (c) At most how many more bytes until you are guaranteed to be at a fresh character? (d) Why is the two-byte spelling 110 00000 10 1000001, which also decodes to 65, illegal for the letter A?',
            solution: [
              'Take the byte: $0\\text{x}9F = 10011111_2$, which begins $10$ — a continuation byte.',
              'So, (a): it is a CONTINUATION byte, one of the 64 values $0\\text{x}80$ to $0\\text{x}BF$.',
              'Now, (b): the spotting rules read the byte ALONE — below $0\\text{x}80$ is ASCII, a $10$ head is a continuation, anything else leads and counts its own ones — the stream is self-synchronizing.',
              'Now, (c): no character rides more than 3 continuation bytes, so a lost position resynchronises within 4 bytes at most.',
              'Now, (d): that spelling is OVERLONG — A belongs to the 1-byte class, and every code point must wear its smallest dress, so a longer spelling is illegal however it decodes.',
              'Hence 0x9F is a continuation byte, spotted by its 10 head alone; resynchronisation needs at most 4 bytes; and the overlong spelling of A is banned.',
            ],
            answer: '(a) a continuation byte; (b) its 10 head names it alone; (c) at most 4 bytes; (d) overlong, so banned.',
          },
        ],
      },
    ] },
  ],
}
