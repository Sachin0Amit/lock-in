import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf32.ts — CS RUN 5 seat cf32 (the census lesson).
 *
 * Lesson 3.2 'The Numbering Systems: Binary, Octal, Hexadecimal' of
 * Computer Fundamentals chapter 3 'Data Representation: a First
 * Meeting'. THE CENSUS LESSON: meeting the four systems as one family
 * (positional notation, the census table, the witness 45, the hex
 * alphabet, the grouping laws, the range law, the counting strip) —
 * conversion CRAFT is deliberately deferred to 3.6/3.7, synthesis to
 * 3.8, the full number-systems theory to 'Arithmetic and Number
 * Systems' and the gate-level view to 'Digital Logic Design'.
 *
 * Every number printed here is pinned green by v-cf32.ts (75 number
 * checks run GREEN before this prose was written; the re-read block
 * closes the ring). All figures are self-contained computed SVGs in
 * the house palette; every geometry constant is derived, never
 * eyeballed. Study-never-reproduce: every roster, witness, figure,
 * Illustration, quiz item and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const C32 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 1 — the digit alphabets ladder (four rungs, hex A-F     */
/* highlighted)                                                        */
/* ------------------------------------------------------------------ */
function cf32AlphabetsLadderSvg(): string {
  const W = 720
  const M = 16
  const rows = [
    { label: 'base 2', sub: 'binary - 2 symbols', digits: '01' },
    { label: 'base 8', sub: 'octal - 8 symbols', digits: '01234567' },
    { label: 'base 10', sub: 'decimal - 10 symbols', digits: '0123456789' },
    { label: 'base 16', sub: 'hexadecimal - 16 symbols', digits: '0123456789ABCDEF' },
  ]
  const cellW = 33
  const cellH = 30
  const gap = 3
  const cellsX0 = 120
  const rowStep = 52
  const headY = 44
  const topY = 70
  const stripY = topY + rows.length * rowStep + 8
  const stripH = 46
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The digit alphabet ladder: four rungs, one per base. Base 2, binary, shows two digit cells, 0 and 1. Base 8, octal, shows eight cells, 0 through 7. Base 10, decimal, shows ten cells, 0 through 9. Base 16, hexadecimal, shows sixteen cells, 0 through 9 and then the letters A B C D E F highlighted in orange, because the letters name the values 10 through 15. A caption strip reads: base b uses exactly b symbols, 0 through b minus 1; hexadecimal borrows six letters for 10 through 15.">`)
  s.push(`<text x="${W / 2}" y="${headY}" text-anchor="middle" font-size="12" letter-spacing="2" font-weight="bold" fill="#0d9488">THE DIGIT ALPHABETS - ONE LADDER, FOUR RUNGS</text>`)
  rows.forEach((r, ri) => {
    const rowTop = topY + ri * rowStep
    s.push(`<text x="${M}" y="${rowTop + 14}" font-size="12" font-weight="bold" fill="#166534">${r.label}</text>`)
    s.push(`<text x="${M}" y="${rowTop + 28}" font-size="9.5" fill="#0f766e">${r.sub}</text>`)
    r.digits.split('').forEach((d, k) => {
      const cx = cellsX0 + k * (cellW + gap)
      const isLetter = d >= 'A'
      s.push(`<rect x="${cx}" y="${rowTop}" width="${cellW}" height="${cellH}" rx="6" fill="${isLetter ? '#ffedd5' : '#ffffff'}" stroke="${isLetter ? '#ea580c' : '#16a34a'}" stroke-width="${isLetter ? 2.5 : 2}"/>`)
      s.push(`<text x="${cx + cellW / 2}" y="${rowTop + cellH / 2 + 5}" text-anchor="middle" font-size="14" font-weight="${isLetter ? 'bold' : 'normal'}" fill="#166534">${d}</text>`)
    })
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="#fef3c7" stroke="#fcd34d" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 19}" text-anchor="middle" font-size="10" fill="#166534">base b uses exactly b symbols, 0 through b-1 - so the largest digit is always b-1</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 36}" text-anchor="middle" font-size="10" fill="#0f766e">hexadecimal borrows six letters, A through F, to name 10 through 15</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 2 — the witness: 45 in four dresses, digit-weight        */
/* scaffolding under each row                                          */
/* ------------------------------------------------------------------ */
function cf32WitnessSvg(): string {
  const W = 720
  const M = 16
  const cellW = 34
  const cellH = 34
  const gap = 5
  const cellsX0 = 150
  const expX = 424
  const headY = 44
  const rowStep = 78
  const rows = [
    {
      numeral: '101101', sub: 'binary - base 2', digits: ['1', '0', '1', '1', '0', '1'],
      weights: [32, 16, 8, 4, 2, 1],
      l1: '1x32 + 0x16 + 1x8 + 1x4 + 0x2 + 1x1', l2: '= 32 + 8 + 4 + 1 = 45', note: '',
    },
    {
      numeral: '55', sub: 'octal - base 8', digits: ['5', '5'],
      weights: [8, 1],
      l1: '5 x 8 + 5 x 1', l2: '= 40 + 5 = 45', note: '',
    },
    {
      numeral: '45', sub: 'decimal - base 10', digits: ['4', '5'],
      weights: [10, 1],
      l1: '4 x 10 + 5 x 1', l2: '= 40 + 5 = 45', note: '',
    },
    {
      numeral: '2D', sub: 'hexadecimal - base 16', digits: ['2', 'D'],
      weights: [16, 1],
      l1: '2 x 16 + D x 1 = 2 x 16 + 13', l2: '= 32 + 13 = 45', note: 'the letter D names 13',
    },
  ]
  const top0 = 74
  const footerY = top0 + rows.length * rowStep - 4
  const footerH = 44
  const H = footerY + footerH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The witness 45 in four dresses. Four aligned rows. Binary row: the digits 1 0 1 1 0 1 in cells, with the weights 32 16 8 4 2 1 under them, expanding to 1x32 + 0x16 + 1x8 + 1x4 + 0x2 + 1x1 = 32 + 8 + 4 + 1 = 45. Octal row: digits 5 5 with weights 8 and 1, expanding to 5 x 8 + 5 x 1 = 40 + 5 = 45. Decimal row: digits 4 5 with weights 10 and 1, expanding to 4 x 10 + 5 x 1 = 40 + 5 = 45. Hexadecimal row: digits 2 and D with weights 16 and 1, the D highlighted, expanding to 2 x 16 + 13 = 32 + 13 = 45. A caption strip reads: one value, four dresses - 101101 in base 2, 55 in base 8, 45 in base 10 and 2D in base 16 all name 45.">`)
  s.push(`<text x="${W / 2}" y="${headY}" text-anchor="middle" font-size="12" letter-spacing="2" font-weight="bold" fill="#0d9488">THE WITNESS - ONE NUMBER, FOUR DRESSES: 45</text>`)
  rows.forEach((r, ri) => {
    const rowTop = top0 + ri * rowStep
    s.push(`<text x="${M}" y="${rowTop + 23}" font-size="17" font-weight="bold" fill="#166534">${r.numeral}</text>`)
    s.push(`<text x="${M}" y="${rowTop + 39}" font-size="9.5" fill="#0f766e">${r.sub}</text>`)
    r.digits.forEach((d, k) => {
      const cx = cellsX0 + k * (cellW + gap)
      const isLetter = d >= 'A'
      s.push(`<rect x="${cx}" y="${rowTop}" width="${cellW}" height="${cellH}" rx="7" fill="${isLetter ? '#ffedd5' : '#ffffff'}" stroke="${isLetter ? '#ea580c' : '#16a34a'}" stroke-width="${isLetter ? 2.5 : 2}"/>`)
      s.push(`<text x="${cx + cellW / 2}" y="${rowTop + cellH / 2 + 5.5}" text-anchor="middle" font-size="16" font-weight="${isLetter ? 'bold' : 'normal'}" fill="#166534">${d}</text>`)
      s.push(`<text x="${cx + cellW / 2}" y="${rowTop + cellH + 14}" text-anchor="middle" font-size="10.5" fill="#0f766e">${r.weights[k]}</text>`)
    })
    if (r.note) {
      s.push(`<text x="${cellsX0}" y="${rowTop + cellH + 30}" font-size="9.5" font-weight="bold" fill="#ea580c">${r.note}</text>`)
    }
    s.push(`<text x="${expX}" y="${rowTop + 15}" font-size="11" fill="#166534">${r.l1}</text>`)
    s.push(`<text x="${expX}" y="${rowTop + 33}" font-size="11" font-weight="bold" fill="#166534">${r.l2}</text>`)
  })
  s.push(`<rect x="${M}" y="${footerY}" width="${W - 2 * M}" height="${footerH}" rx="8" fill="#fef3c7" stroke="#fcd34d" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="${footerY + 19}" text-anchor="middle" font-size="10" fill="#166534">one value, four dresses: 101101 (base 2) = 55 (base 8) = 45 (base 10) = 2D (base 16)</text>`)
  s.push(`<text x="${W / 2}" y="${footerY + 36}" text-anchor="middle" font-size="10" fill="#0f766e">each row is the same sum - digit times weight, added up - only the weights change</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 3 — the grouping bridge: 101101 <-> 101 101 <-> 55 and   */
/* <-> 0010 1101 <-> 2D (coloured braces)                              */
/* ------------------------------------------------------------------ */
function cf32GroupingBridgeSvg(): string {
  const W = 720
  const M = 16
  const headY = 42
  const bit = 40
  const stride = 45
  const x0 = 150
  const s: string[] = []
  const bitsA = '101101'
  const bitsB = '00101101'
  const laneAY = 68
  const laneBY = 196
  const stripY = 326
  const stripH = 46
  const H = stripY + stripH + M
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The grouping bridge. Top lane: the six bits 1 0 1 1 0 1 in cells, bracketed from the right in two groups of three, 101 and 101, each group translating to the octal digit 5, giving 55 in base 8, which equals 45 in decimal. Bottom lane: the same value as the 8-bit pattern 0 0 1 0 1 1 0 1, padded with two leading zeros, bracketed in two groups of four, 0010 and 1101, translating to the hex digits 2 and D, giving 2D in base 16, which equals 45 in decimal. A caption strip reads: one number, three dresses - 101101 base 2, 55 base 8 and 2D base 16; the bridge runs both ways and costs no arithmetic.">`)
  s.push(`<text x="${W / 2}" y="${headY}" text-anchor="middle" font-size="12" letter-spacing="2" font-weight="bold" fill="#0d9488">THE GROUPING BRIDGE - REGROUPING IS FREE</text>`)
  // lane A: binary -> octal (groups of three, orange braces)
  s.push(`<text x="${x0}" y="${laneAY - 8}" font-size="9.5" fill="#0f766e">the binary dress of 45</text>`)
  bitsA.split('').forEach((b, k) => {
    const cx = x0 + k * stride
    s.push(`<rect x="${cx}" y="${laneAY}" width="${bit}" height="${bit}" rx="7" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>`)
    s.push(`<text x="${cx + bit / 2}" y="${laneAY + bit / 2 + 6}" text-anchor="middle" font-size="17" fill="#166534">${b}</text>`)
  })
  const braceAY = laneAY + bit + 9
  const aG1x1 = x0
  const aG1x2 = x0 + 2 * stride + bit
  const aG2x1 = aG1x2 + 5
  const aG2x2 = x0 + 5 * stride + bit
  s.push(`<path d="M ${aG1x1} ${braceAY} v 7 H ${aG1x2} v -7" fill="none" stroke="#ea580c" stroke-width="2.5"/>`)
  s.push(`<path d="M ${aG2x1} ${braceAY} v 7 H ${aG2x2} v -7" fill="none" stroke="#ea580c" stroke-width="2.5"/>`)
  const chipAY = braceAY + 21
  const aC1 = (aG1x1 + aG1x2) / 2
  const aC2 = (aG2x1 + aG2x2) / 2
  ;[aC1, aC2].forEach((c) => {
    s.push(`<rect x="${c - 15}" y="${chipAY}" width="30" height="30" rx="7" fill="#ffedd5" stroke="#ea580c" stroke-width="2.5"/>`)
    s.push(`<text x="${c}" y="${chipAY + 20}" text-anchor="middle" font-size="16" font-weight="bold" fill="#166534">5</text>`)
  })
  s.push(`<text x="${M}" y="${laneAY + 26}" font-size="10.5" font-weight="bold" fill="#0f766e">group by THREES</text>`)
  s.push(`<text x="${M}" y="${laneAY + 40}" font-size="9.5" fill="#0f766e">gives the octal dress</text>`)
  s.push(`<line x1="${aC2 + 20}" y1="${chipAY + 15}" x2="462" y2="${chipAY + 15}" stroke="#d97706" stroke-width="2"/>`)
  s.push(`<polygon points="470,${chipAY + 15} 460,${chipAY + 10} 460,${chipAY + 20}" fill="#d97706"/>`)
  s.push(`<rect x="470" y="${chipAY - 17}" width="180" height="64" rx="10" fill="#ffffff" stroke="#16a34a" stroke-width="2.5"/>`)
  s.push(`<text x="560" y="${chipAY + 5}" text-anchor="middle" font-size="22" font-weight="bold" fill="#166534">55</text>`)
  s.push(`<text x="560" y="${chipAY + 23}" text-anchor="middle" font-size="10" fill="#0f766e">in base 8 - octal</text>`)
  s.push(`<text x="560" y="${chipAY + 39}" text-anchor="middle" font-size="9.5" fill="#0f766e">= 45 in decimal</text>`)
  // lane B: binary -> hex (groups of four, teal braces)
  s.push(`<text x="${x0}" y="${laneBY - 8}" font-size="9.5" fill="#0f766e">the same value as an 8-bit pattern, padded</text>`)
  bitsB.split('').forEach((b, k) => {
    const cx = x0 + k * stride
    s.push(`<rect x="${cx}" y="${laneBY}" width="${bit}" height="${bit}" rx="7" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>`)
    s.push(`<text x="${cx + bit / 2}" y="${laneBY + bit / 2 + 6}" text-anchor="middle" font-size="17" fill="#166534">${b}</text>`)
  })
  const braceBY = laneBY + bit + 9
  const bG1x1 = x0
  const bG1x2 = x0 + 3 * stride + bit
  const bG2x1 = bG1x2 + 5
  const bG2x2 = x0 + 7 * stride + bit
  s.push(`<path d="M ${bG1x1} ${braceBY} v 7 H ${bG1x2} v -7" fill="none" stroke="#0d9488" stroke-width="2.5"/>`)
  s.push(`<path d="M ${bG2x1} ${braceBY} v 7 H ${bG2x2} v -7" fill="none" stroke="#0d9488" stroke-width="2.5"/>`)
  const chipBY = braceBY + 21
  const bC1 = (bG1x1 + bG1x2) / 2
  const bC2 = (bG2x1 + bG2x2) / 2
  const bVals = ['2', 'D']
  ;[bC1, bC2].forEach((c, i) => {
    s.push(`<rect x="${c - 15}" y="${chipBY}" width="30" height="30" rx="7" fill="${i === 1 ? '#ffedd5' : '#ffffff'}" stroke="${i === 1 ? '#ea580c' : '#0d9488'}" stroke-width="2.5"/>`)
    s.push(`<text x="${c}" y="${chipBY + 20}" text-anchor="middle" font-size="16" font-weight="${i === 1 ? 'bold' : 'normal'}" fill="#166534">${bVals[i]}</text>`)
  })
  s.push(`<text x="${M}" y="${laneBY + 26}" font-size="10.5" font-weight="bold" fill="#0f766e">group by FOURS</text>`)
  s.push(`<text x="${M}" y="${laneBY + 40}" font-size="9.5" fill="#0f766e">gives the hex dress</text>`)
  s.push(`<line x1="${bC2 + 20}" y1="${chipBY + 15}" x2="532" y2="${chipBY + 15}" stroke="#d97706" stroke-width="2"/>`)
  s.push(`<polygon points="540,${chipBY + 15} 530,${chipBY + 10} 530,${chipBY + 20}" fill="#d97706"/>`)
  s.push(`<rect x="540" y="${chipBY - 17}" width="160" height="64" rx="10" fill="#ffffff" stroke="#16a34a" stroke-width="2.5"/>`)
  s.push(`<text x="620" y="${chipBY + 5}" text-anchor="middle" font-size="22" font-weight="bold" fill="#166534">2D</text>`)
  s.push(`<text x="620" y="${chipBY + 23}" text-anchor="middle" font-size="10" fill="#0f766e">in base 16 - hex</text>`)
  s.push(`<text x="620" y="${chipBY + 39}" text-anchor="middle" font-size="9.5" fill="#0f766e">= 45 in decimal</text>`)
  // witness strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="#fef3c7" stroke="#fcd34d" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 19}" text-anchor="middle" font-size="10" fill="#166534">one number, three dresses: 101101 (base 2) = 55 (base 8) = 2D (base 16)</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 36}" text-anchor="middle" font-size="10" fill="#0f766e">the bridge runs both ways - regrouping costs no arithmetic at all</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 4 — the counting strip 0-16 in all four bases (two       */
/* bands of aligned cells, every cell computed)                        */
/* ------------------------------------------------------------------ */
function cf32CountingStripSvg(): string {
  const W = 720
  const M = 16
  const labelX = M + 2
  const colX0 = 100
  const colW = 66
  const cellW = 62
  const cellH = 22
  const rowStride = 26
  const bands = [
    { head: 'counting 0 to 8', from: 0, to: 8, headY: 66, topY: 74 },
    { head: 'counting 9 to 16', from: 9, to: 16, headY: 210, topY: 218 },
  ]
  const rowNames = ['dec', 'bin', 'oct', 'hex']
  const milestones = [8, 10, 15, 16]
  const stripY = 330
  const stripH = 58
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The counting strip from 0 to 16 in all four bases, in two bands. Band one, counting 0 to 8: four aligned rows labelled dec, bin, oct, hex, one column per value; the binary row climbs 0, 1, 10, 11, 100, 101, 110, 111, 1000; the octal row climbs 0, 1, 2, 3, 4, 5, 6, 7, 10; the hex row climbs 0 through 8. Band two, counting 9 to 16: the binary row climbs 1001, 1010, 1011, 1100, 1101, 1110, 1111, 10000; the octal row 11, 12, 13, 14, 15, 16, 17, 20; the hex row 9, A, B, C, D, E, F, 10, with the letters A through F highlighted. Milestone columns 8, 10, 15 and 16 are marked in the decimal row. A legend notes the milestones: 8 is 1000, the first 4-bit binary and first 2-digit octal; 10 is A, the first hex letter; 15 is F, the largest hex digit; 16 is 10000 in binary and 10 in hex.">`)
  s.push(`<text x="${W / 2}" y="42" text-anchor="middle" font-size="12" letter-spacing="2" font-weight="bold" fill="#0d9488">THE COUNTING STRIP - 0 TO 16 IN FOUR BASES</text>`)
  bands.forEach((band) => {
    s.push(`<text x="${colX0}" y="${band.headY}" font-size="11" font-weight="bold" fill="#0f766e">${band.head}</text>`)
    for (let v = band.from; v <= band.to; v++) {
      const c = v - band.from
      const cx = colX0 + c * colW
      const dresses = [String(v), v.toString(2), v.toString(8), v.toString(16).toUpperCase()]
      const isMilestone = milestones.includes(v)
      rowNames.forEach((rn, ri) => {
        const ry = band.topY + ri * rowStride
        s.push(`<text x="${labelX}" y="${ry + 15}" font-size="10" fill="#0f766e">${rn}</text>`)
        let fill = '#ffffff'
        let stroke = '#16a34a'
        let color = '#166534'
        let bold = false
        if (ri === 2) {
          fill = '#fffdf5'
          stroke = '#0d9488'
          color = '#0f766e'
        }
        if (ri === 3 && v >= 10 && v <= 15) {
          fill = '#ffedd5'
          stroke = '#ea580c'
          bold = true
        }
        if (ri === 0 && isMilestone) {
          fill = '#fef3c7'
          stroke = '#d97706'
          bold = true
        }
        if (ri === 0) bold = true
        s.push(`<rect x="${cx}" y="${ry}" width="${cellW}" height="${cellH}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>`)
        s.push(`<text x="${cx + cellW / 2}" y="${ry + 15.5}" text-anchor="middle" font-size="11.5" font-weight="${bold ? 'bold' : 'normal'}" fill="${color}">${dresses[ri]}</text>`)
      })
    }
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="#fef3c7" stroke="#fcd34d" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 19}" text-anchor="middle" font-size="10" fill="#166534">milestones: 8 = 1000 (first 4-bit binary, first 2-digit octal) and 10 = A (first hex letter)</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 36}" text-anchor="middle" font-size="10" fill="#166534">15 = F (largest hex digit) and 16 = 10000 in binary, which is 10 in hex - 0x10 = 16</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 51}" text-anchor="middle" font-size="9.5" fill="#0f766e">every cell computed - one game of carrying, played at three speeds</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - Q1: the witness regrouping strip                  */
/* ------------------------------------------------------------------ */
function cf32WitnessRegroupSvg(): string {
  const W = 560
  const M = 16
  const bit = 34
  const stride = 38
  const x0 = 88
  const y0 = 54
  const bits = '101101'
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} 206" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Regrouping the witness by threes. The six bits 1 0 1 1 0 1 in cells, bracketed from the right into two groups of three, 101 and 101; each group translates to the octal digit 5, giving 55 in base 8, which is 45 in decimal. Each block of three bits reads 5, with no multiplication anywhere.">`)
  s.push(`<text x="${M}" y="34" font-size="11" font-weight="bold" fill="#0d9488">regroup 101101 by threes - the octal dress appears</text>`)
  bits.split('').forEach((b, k) => {
    const cx = x0 + k * stride
    s.push(`<rect x="${cx}" y="${y0}" width="${bit}" height="${bit}" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>`)
    s.push(`<text x="${cx + bit / 2}" y="${y0 + bit / 2 + 5.5}" text-anchor="middle" font-size="15" fill="#166534">${b}</text>`)
  })
  const braceY = y0 + bit + 9
  const g1x1 = x0
  const g1x2 = x0 + 2 * stride + bit
  const g2x1 = g1x2 + 4
  const g2x2 = x0 + 5 * stride + bit
  s.push(`<path d="M ${g1x1} ${braceY} v 7 H ${g1x2} v -7" fill="none" stroke="#ea580c" stroke-width="2.5"/>`)
  s.push(`<path d="M ${g2x1} ${braceY} v 7 H ${g2x2} v -7" fill="none" stroke="#ea580c" stroke-width="2.5"/>`)
  const chipY = braceY + 19
  ;[(g1x1 + g1x2) / 2, (g2x1 + g2x2) / 2].forEach((c) => {
    s.push(`<rect x="${c - 14}" y="${chipY}" width="28" height="28" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="2.5"/>`)
    s.push(`<text x="${c}" y="${chipY + 19}" text-anchor="middle" font-size="15" font-weight="bold" fill="#166534">5</text>`)
  })
  s.push(`<text x="352" y="134" font-size="20" font-weight="bold" fill="#166534">55</text>`)
  s.push(`<text x="352" y="152" font-size="10" fill="#0f766e">in base 8 (octal)</text>`)
  s.push(`<text x="352" y="168" font-size="9.5" fill="#0f766e">= 45 in decimal</text>`)
  s.push(`<text x="${M}" y="192" font-size="9.5" fill="#0f766e">each block of three bits reads 5 - no multiplication anywhere</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - Q4: regrouping 11010110 by 3s and by 4s           */
/* ------------------------------------------------------------------ */
function cf32RegroupByteSvg(): string {
  const W = 560
  const M = 16
  const bit = 30
  const stride = 33
  const x0 = 60
  const s: string[] = []
  const lane1Bits = '011010110'
  const lane1Y = 54
  const lane2Bits = '11010110'
  const lane2Y = 180
  s.push(`<svg viewBox="0 0 ${W} 304" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Regrouping the byte 11010110 two ways. Top lane: the nine bits 0 1 1 0 1 0 1 1 0, padded with one leading zero, bracketed in three groups of three - 011, 010 and 110 - translating to the octal digits 3, 2 and 6, giving 326 in base 8. Bottom lane: the same value as the eight bits 1 1 0 1 0 1 1 0, bracketed in two groups of four - 1101 and 0110 - translating to the hex digits D and 6, giving D6 in base 16. Both dresses name the same value, 214.">`)
  s.push(`<text x="${M}" y="42" font-size="10" font-weight="bold" fill="#0f766e">group by THREES - pad one leading zero first (8 is not a multiple of 3)</text>`)
  lane1Bits.split('').forEach((b, k) => {
    const cx = x0 + k * stride
    s.push(`<rect x="${cx}" y="${lane1Y}" width="${bit}" height="${bit}" rx="5" fill="#ffffff" stroke="#16a34a" stroke-width="1.8"/>`)
    s.push(`<text x="${cx + bit / 2}" y="${lane1Y + bit / 2 + 5}" text-anchor="middle" font-size="13" fill="#166534">${b}</text>`)
  })
  const brace1Y = lane1Y + bit + 8
  const groups1 = [0, 3, 6].map((g) => ({ x1: x0 + g * stride, x2: x0 + (g + 2) * stride + bit }))
  const vals1 = ['3', '2', '6']
  groups1.forEach((g) => s.push(`<path d="M ${g.x1} ${brace1Y} v 6 H ${g.x2} v -6" fill="none" stroke="#ea580c" stroke-width="2.2"/>`))
  const chip1Y = brace1Y + 16
  groups1.forEach((g, i) => {
    const c = (g.x1 + g.x2) / 2
    s.push(`<rect x="${c - 12}" y="${chip1Y}" width="24" height="24" rx="5" fill="#ffedd5" stroke="#ea580c" stroke-width="2.2"/>`)
    s.push(`<text x="${c}" y="${chip1Y + 16.5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#166534">${vals1[i]}</text>`)
  })
  s.push(`<text x="400" y="${chip1Y + 12}" font-size="18" font-weight="bold" fill="#166534">326</text>`)
  s.push(`<text x="400" y="${chip1Y + 30}" font-size="10" fill="#0f766e">in base 8 (octal)</text>`)
  s.push(`<text x="${M}" y="168" font-size="10" font-weight="bold" fill="#0f766e">group by FOURS - no padding needed (8 = 2 x 4)</text>`)
  lane2Bits.split('').forEach((b, k) => {
    const cx = x0 + k * stride
    s.push(`<rect x="${cx}" y="${lane2Y}" width="${bit}" height="${bit}" rx="5" fill="#ffffff" stroke="#16a34a" stroke-width="1.8"/>`)
    s.push(`<text x="${cx + bit / 2}" y="${lane2Y + bit / 2 + 5}" text-anchor="middle" font-size="13" fill="#166534">${b}</text>`)
  })
  const brace2Y = lane2Y + bit + 8
  const groups2 = [0, 4].map((g) => ({ x1: x0 + g * stride, x2: x0 + (g + 3) * stride + bit }))
  const vals2 = ['D', '6']
  groups2.forEach((g) => s.push(`<path d="M ${g.x1} ${brace2Y} v 6 H ${g.x2} v -6" fill="none" stroke="#0d9488" stroke-width="2.2"/>`))
  const chip2Y = brace2Y + 16
  groups2.forEach((g, i) => {
    const c = (g.x1 + g.x2) / 2
    s.push(`<rect x="${c - 12}" y="${chip2Y}" width="24" height="24" rx="5" fill="${i === 0 ? '#ffedd5' : '#ffffff'}" stroke="${i === 0 ? '#ea580c' : '#0d9488'}" stroke-width="2.2"/>`)
    s.push(`<text x="${c}" y="${chip2Y + 16.5}" text-anchor="middle" font-size="13" font-weight="${i === 0 ? 'bold' : 'normal'}" fill="#166534">${vals2[i]}</text>`)
  })
  s.push(`<text x="400" y="${chip2Y + 12}" font-size="18" font-weight="bold" fill="#166534">D6</text>`)
  s.push(`<text x="400" y="${chip2Y + 30}" font-size="10" fill="#0f766e">in base 16 (hex)</text>`)
  s.push(`<text x="${M}" y="292" font-size="9.5" fill="#0f766e">both dresses name the same value: 214 - regrouping is free</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - Q6: the byte <-> two-hex-digit mapping strip       */
/* ------------------------------------------------------------------ */
function cf32ByteHexStripSvg(): string {
  const W = 560
  const M = 16
  const bit = 36
  const stride = 40
  const x0 = 70
  const y0 = 54
  const bits = '00101101'
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} 288" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The byte to hex mapping strip. The eight bits 0 0 1 0 1 1 0 1 in cells, under a wide bracket labelled one byte equals 8 bits; below, two teal brackets split the bits into 0010 and 1101, which translate to the hex digits 2 and D, giving 2D in base 16. A reverse note reads: and back again, 2 expands to 0010 and D expands to 1101. A footer strip computes 16 x 16 = 256 values, the whole byte, from 00 to FF.">`)
  s.push(`<text x="${M}" y="34" font-size="11" font-weight="bold" fill="#0d9488">one byte, two hex digits - the mapping strip</text>`)
  bits.split('').forEach((b, k) => {
    const cx = x0 + k * stride
    s.push(`<rect x="${cx}" y="${y0}" width="${bit}" height="${bit}" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>`)
    s.push(`<text x="${cx + bit / 2}" y="${y0 + bit / 2 + 6}" text-anchor="middle" font-size="16" fill="#166534">${b}</text>`)
  })
  const xEnd = x0 + 7 * stride + bit
  s.push(`<path d="M ${x0} ${y0 + bit + 6} v 7 H ${xEnd} v -7" fill="none" stroke="#166534" stroke-width="2.5"/>`)
  s.push(`<text x="${(x0 + xEnd) / 2}" y="${y0 + bit + 26}" text-anchor="middle" font-size="10" font-weight="bold" fill="#166534">one byte = 8 bits</text>`)
  const braceY = y0 + bit + 38
  const g1x1 = x0
  const g1x2 = x0 + 3 * stride + bit
  const g2x1 = g1x2 + 4
  const g2x2 = xEnd
  s.push(`<path d="M ${g1x1} ${braceY} v 7 H ${g1x2} v -7" fill="none" stroke="#0d9488" stroke-width="2.5"/>`)
  s.push(`<path d="M ${g2x1} ${braceY} v 7 H ${g2x2} v -7" fill="none" stroke="#0d9488" stroke-width="2.5"/>`)
  const chipY = braceY + 18
  const c1 = (g1x1 + g1x2) / 2
  const c2 = (g2x1 + g2x2) / 2
  s.push(`<rect x="${c1 - 15}" y="${chipY}" width="30" height="30" rx="6" fill="#ffffff" stroke="#0d9488" stroke-width="2.5"/>`)
  s.push(`<text x="${c1}" y="${chipY + 20}" text-anchor="middle" font-size="16" fill="#166534">2</text>`)
  s.push(`<rect x="${c2 - 15}" y="${chipY}" width="30" height="30" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="2.5"/>`)
  s.push(`<text x="${c2}" y="${chipY + 20}" text-anchor="middle" font-size="16" font-weight="bold" fill="#166534">D</text>`)
  s.push(`<line x1="${c2 + 22}" y1="${chipY + 15}" x2="422" y2="${chipY + 15}" stroke="#d97706" stroke-width="2"/>`)
  s.push(`<polygon points="430,${chipY + 15} 420,${chipY + 10} 420,${chipY + 20}" fill="#d97706"/>`)
  s.push(`<rect x="430" y="${chipY - 15}" width="112" height="60" rx="9" fill="#ffffff" stroke="#16a34a" stroke-width="2.5"/>`)
  s.push(`<text x="486" y="${chipY + 10}" text-anchor="middle" font-size="20" font-weight="bold" fill="#166534">2D</text>`)
  s.push(`<text x="486" y="${chipY + 30}" text-anchor="middle" font-size="10" fill="#0f766e">in base 16 (hex)</text>`)
  s.push(`<text x="${M}" y="${chipY + 62}" font-size="9.5" fill="#0f766e">and back again: 2 expands to 0010 and D expands to 1101</text>`)
  s.push(`<rect x="${M}" y="${chipY + 74}" width="${W - 2 * M}" height="40" rx="8" fill="#fef3c7" stroke="#fcd34d" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="${chipY + 99}" text-anchor="middle" font-size="10" fill="#166534">16 x 16 = 256 values - the whole byte, from 00 to FF</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - Q7: range bars 2^n - 1 (length = bit count)        */
/* ------------------------------------------------------------------ */
function cf32RangeBarsSvg(): string {
  const W = 680
  const M = 16
  const ns = [4, 8, 12, 16]
  const labels = ['4 bits', '8 bits', '12 bits', '16 bits']
  const insides = ['1111 = 15', '11111111 = 255', '111111111111 = 4,095', '1111111111111111 = 65,535']
  const scale = 32
  const barX0 = 100
  const barH = 26
  const stride = 46
  const y0 = 54
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} 284" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The range ladder of largest n-bit numbers. Four horizontal bars whose lengths show the bit counts: 4 bits, with all-ones numeral 1111 equal to 15; 8 bits, 11111111 equal to 255; 12 bits, all ones equal to 4,095; 16 bits, all ones equal to 65,535. Each added bit doubles the range. A note says bar length shows the bit count, not the value, because the values grow far too fast to draw to scale.">`)
  s.push(`<text x="${M}" y="34" font-size="11" font-weight="bold" fill="#0d9488">the range ladder - largest n-bit numbers are all ones</text>`)
  ns.forEach((n, i) => {
    const by = y0 + i * stride
    s.push(`<text x="92" y="${by + 17}" text-anchor="end" font-size="10.5" font-weight="bold" fill="#166534">${labels[i]}</text>`)
    s.push(`<rect x="${barX0}" y="${by}" width="${n * scale}" height="${barH}" rx="5" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>`)
    s.push(`<text x="${barX0 + 10}" y="${by + 17}" font-size="10" fill="#166534">${insides[i]}</text>`)
  })
  s.push(`<text x="${M}" y="252" font-size="10" fill="#166534">each added bit doubles the range: 15, then 255, then 4,095, then 65,535</text>`)
  s.push(`<text x="${M}" y="270" font-size="9.5" fill="#0f766e">bar length shows the bit count, not the value - the values grow far too fast to draw to scale</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - Q8: the hex digit-count census bars               */
/* ------------------------------------------------------------------ */
function cf32HexCountLadderSvg(): string {
  const W = 680
  const M = 16
  const pairs = [2, 4, 6]
  const labels = ['2 hex digits', '4 hex digits', '6 hex digits']
  const insides = ['16 x 16 = 256 values - one byte', '16^4 = 65,536 values - sixteen bits', '16^6 = 16,777,216 values - the 24-bit colour census']
  const pxPerDigit = 90
  const barX0 = 110
  const barH = 28
  const stride = 50
  const y0 = 54
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The hex census ladder of naming power. Three horizontal bars whose lengths show the hex-digit counts: 2 hex digits name 16 x 16 = 256 values, one byte; 4 hex digits name 16^4 = 65,536 values, sixteen bits; 6 hex digits name 16^6 = 16,777,216 values, the 24-bit colour census. A note says every pair of hex digits is exactly one byte, and bar length shows the digit count, not the value.">`)
  s.push(`<text x="${M}" y="34" font-size="11" font-weight="bold" fill="#0d9488">the hex census ladder - naming power in digit pairs</text>`)
  pairs.forEach((p, i) => {
    const by = y0 + i * stride
    s.push(`<text x="102" y="${by + 18}" text-anchor="end" font-size="10.5" font-weight="bold" fill="#166534">${labels[i]}</text>`)
    s.push(`<rect x="${barX0}" y="${by}" width="${p * pxPerDigit}" height="${barH}" rx="5" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>`)
    s.push(`<text x="${barX0 + 10}" y="${by + 18}" font-size="10" fill="#166534">${insides[i]}</text>`)
  })
  s.push(`<text x="${M}" y="218" font-size="10" fill="#166534">every pair of hex digits is exactly one byte - 16^2 = 2^8 = 256</text>`)
  s.push(`<text x="${M}" y="236" font-size="9.5" fill="#0f766e">bar length shows the digit count, not the value</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE - Q13: the byte-law proof strip                     */
/* ------------------------------------------------------------------ */
function cf32ByteProofStripSvg(): string {
  const W = 560
  const M = 16
  const boxW = 112
  const boxH = 58
  const gap = 24
  const xs = [16, 152, 288, 424]
  const y = 58
  const chips = [
    { l1: '16 = 2^4', l2: 'one hex digit', l3: '= 4 bits' },
    { l1: 'two hex digits', l2: '4 + 4 = 8 bits', l3: '= one byte' },
    { l1: '16^2 = (2^4)^2', l2: '= 2^8', l3: '= 256' },
    { l1: 'the byte census', l2: '256 values', l3: '0 through 255' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} 172" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The byte-law proof strip, as four connected chips. Chip one: 16 equals 2 to the fourth, so one hex digit is 4 bits. Chip two: two hex digits are 4 plus 4 equals 8 bits, one byte. Chip three: 16 squared equals 2 to the eighth, which is 256. Chip four: the byte census is 256 values, 0 through 255. A footer notes that octal fits bytes poorly, because 8 is a multiple of 4 but not of 3, so an 8-bit pattern regrouped in threes must borrow a leading zero.">`)
  s.push(`<text x="${M}" y="34" font-size="11" font-weight="bold" fill="#0d9488">why one byte is exactly two hex digits</text>`)
  chips.forEach((c, i) => {
    s.push(`<rect x="${xs[i]}" y="${y}" width="${boxW}" height="${boxH}" rx="9" fill="${i === 3 ? '#fef3c7' : '#ffffff'}" stroke="#16a34a" stroke-width="2.2"/>`)
    s.push(`<text x="${xs[i] + boxW / 2}" y="${y + 18}" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">${c.l1}</text>`)
    s.push(`<text x="${xs[i] + boxW / 2}" y="${y + 34}" text-anchor="middle" font-size="10" fill="#166534">${c.l2}</text>`)
    s.push(`<text x="${xs[i] + boxW / 2}" y="${y + 48}" text-anchor="middle" font-size="10" fill="#0f766e">${c.l3}</text>`)
  })
  for (let i = 0; i < 3; i++) {
    const ax = xs[i] + boxW
    const midY = y + boxH / 2
    s.push(`<line x1="${ax + 4}" y1="${midY}" x2="${ax + 12}" y2="${midY}" stroke="#d97706" stroke-width="2"/>`)
    s.push(`<polygon points="${ax + 20},${midY} ${ax + 10},${midY - 5} ${ax + 10},${midY + 5}" fill="#d97706"/>`)
  }
  s.push(`<text x="${M}" y="140" font-size="9.5" fill="#0f766e">octal fits bytes poorly: 8 is a multiple of 4 (hex) but not of 3 (octal)</text>`)
  s.push(`<text x="${M}" y="156" font-size="9.5" fill="#0f766e">an 8-bit pattern regrouped in threes must borrow a leading zero</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* the lesson                                                          */
/* ================================================================== */
export const lesson32: Lesson = {
  id: 'cf-the-numbering-systems-binary-octal-hexadecimal',
  number: '3.2',
  title: 'The Numbering Systems: Binary, Octal, Hexadecimal',
  concepts: [
    'positional notation and place value',
    'base (radix) and digit alphabets',
    'the binary, octal and hexadecimal systems',
    'hexadecimal letters A to F',
    'the grouping laws: 3 bits per octal digit, 4 per hex digit',
    'the range law and the byte census',
    'counting 0 to 16 in four bases',
  ],
  objectives: [
    'By the end of this lesson you can unfold any numeral into its place-value anatomy — digit times weight, summed — and evaluate it in any base.',
    'By the end of this lesson you can recite the digit alphabet of base 2, base 8, base 10 and base 16, and translate the hex letters A to F into their values 10 to 15.',
    'By the end of this lesson you can regroup a binary numeral into octal (blocks of three) and hexadecimal (blocks of four) and back, with no arithmetic at all.',
    'By the end of this lesson you can state the range law — n digits in base b name b to the n values, the largest being b to the n minus one — and apply it to the byte, the 16-bit word and 24-bit colour.',
    'By the end of this lesson you can count from 0 to 16 in all four bases and read the milestones: 8, 10, 15 and 16 in every dress.',
    'By the end of this lesson you can say why programmers love hexadecimal: one byte is exactly two hex digits, because 16 squared equals 2 to the eighth equals 256.',
  ],
  prerequisites: ['cf-bits-why-two-symbols-carry-everything'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ================================================================
    // 1. ONE FORMULA, MANY ALPHABETS
    // ================================================================
    { kind: 'heading', text: 'One Formula, Many Alphabets' },
    { kind: 'para', text: 'Lesson 3.1 settled the machine\u2019s secret: two symbols are enough, because a switch is either open or closed, a voltage is either low or high, a magnetic spot points one way or the other. Bits carry everything, and the lesson told you why. This lesson changes the question. How do numbers actually get WRITTEN for machines \u2014 and in how many dresses does one number appear along the way? You already own one numbering system so deeply that it feels like the only possible way to write a number. It is not. There are three more in daily service in computing, and this lesson\u2019s pleasant surprise is that all four are the same game wearing different alphabets.' },
    { kind: 'para', text: 'The census we shall walk, in order: positional notation, the single idea underneath every system; the four systems themselves \u2014 binary, octal, decimal, hexadecimal \u2014 filed into one census table; a witness number, 45, followed through all four of its dresses; the hexadecimal alphabet with its six borrowed letters; the grouping laws, which make translation between binary, octal and hexadecimal free of arithmetic; the range law, which says exactly how much n digits can name; and a counting strip that runs from 0 to 16 in all four bases at once. By the end you will not merely have MET the four systems \u2014 you will read any of them at sight, and convert between three of them without doing a single multiplication.' },
    { kind: 'callout', tone: 'insight', title: 'Note \u2014 a meeting, not a conversion drill', text: 'This lesson introduces the systems and their one free bridge, regrouping. The systematic CRAFT of conversion is deliberately deferred: lesson 3.6, \u2018Decimal to Binary Conversion\u2019, owns the dividing-by-two craft; lesson 3.7, \u2018Binary to Decimal Conversion\u2019, owns the reading craft done systematically; lesson 3.8, \u2018Decimal and Binary Number System\u2019, then gathers the whole story into one map. Meet the family here; drill the craft there.' },

    // ================================================================
    // 2. POSITIONAL NOTATION: THE SINGLE IDEA
    // ================================================================
    { kind: 'heading', text: 'Positional Notation: the Single Idea' },
    { kind: 'para', text: 'Begin with a numeral you have read all your life: $4{,}728$. Ask it the rude question \u2014 what does this string of symbols actually SAY? Strip away habit and the answer is a sum. Each digit contributes a product: itself times a weight. The weights are not decoration; they are the powers of ten, growing right to left \u2014 units, tens, hundreds, thousands. The numeral is nothing but a compressed bill of sale for one sum. And that compression trick, digit-times-weight, is the whole of every numbering system you will ever meet.' },
    { kind: 'callout', tone: 'definition', title: 'Definition \u2014 positional numeral system', text: 'A `positional numeral system` is said to be a way of writing numbers in which a numeral\u2019s value is the sum of its digits\u2019 products with fixed weights, the weights being the powers of a fixed whole number $b \\ge 2$ called the base (or radix) \u2014 each digit $d_i$ sitting at the weight $b^i$, counting from $i = 0$ at the right-hand end. Symbolically, $V = \\sum_i d_i\\, b^i$: one formula, every base.' },
    { kind: 'para', text: 'For example, the same law reads four different numerals:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) in base 10, the numeral $4{,}728$ says $4 \\times 10^3 + 7 \\times 10^2 + 2 \\times 10 + 8$;',
      '(ii) in base 2, the numeral $101101_2$ says $1 \\times 32 + 0 \\times 16 + 1 \\times 8 + 1 \\times 4 + 0 \\times 2 + 1$;',
      '(iii) in base 8, the numeral $55_8$ says $5 \\times 8 + 5$;',
      '(iv) in base 16, the numeral $2D_{16}$ says $2 \\times 16 + 13$ \u2014 the letter $D$ naming thirteen.',
    ] },
    { kind: 'derivation', title: 'The anatomy of 4,728', statement: 'Unfold the decimal numeral $4{,}728$ into its place-value anatomy and check that the positional formula reproduces it exactly.', steps: [
      { label: 'List the digits with their positions', formula: 'd_3 = 4,\\quad d_2 = 7,\\quad d_1 = 2,\\quad d_0 = 8', explanation: 'count positions from zero at the right-hand end: the 8 sits at position 0, the 2 at position 1, the 7 at position 2, the 4 at position 3.' },
      { label: 'Attach the base-ten weights', formula: '10^3 = 1000,\\quad 10^2 = 100,\\quad 10^1 = 10,\\quad 10^0 = 1', explanation: 'each position i carries the weight ten-to-the-i; notice that the rightmost weight is always 1, in every base, because $b^0 = 1$.' },
      { label: 'Multiply each digit by its weight', formula: '4 \\times 1000 \\;+\\; 7 \\times 100 \\;+\\; 2 \\times 10 \\;+\\; 8 \\times 1', explanation: 'this is the entire content of the numeral \u2014 nothing more is hidden inside it.' },
      { label: 'Sum the products', formula: '4000 + 700 + 20 + 8 = 4728', explanation: 'the sum closes on the very number the numeral names, as it must.' },
    ], result: 'So $4{,}728 = 4 \\times 10^3 + 7 \\times 10^2 + 2 \\times 10 + 8$ \u2014 four digits, four products, one sum: $V = \\sum_i d_i\\, b^i$ with $b = 10$.' },
    { kind: 'equation', latex: 'V \\;=\\; \\sum_{i=0}^{n-1} d_i\\, b^i \\;=\\; d_{n-1} b^{n-1} + \\cdots + d_1 b + d_0 \\tag{1}', note: 'The positional value law: digit times weight, weight times base-power. One formula for every base \u2014 change the alphabet and the weights, keep the sum.' },
    { kind: 'example', title: 'Illustration 1. Take the decimal numeral 4,728 apart by place value.', steps: [
      'Take the numeral $4{,}728$ and label its digits from the right: $d_0 = 8$, $d_1 = 2$, $d_2 = 7$, $d_3 = 4$.',
      'Attach the base-ten weights: $10^0 = 1$, $10^1 = 10$, $10^2 = 100$, $10^3 = 1000$.',
      'Multiply: $4 \\times 1000 = 4000$, $7 \\times 100 = 700$, $2 \\times 10 = 20$ and $8 \\times 1 = 8$.',
      'Sum: $4000 + 700 + 20 + 8 = 4{,}728$ \u2014 the numeral closes on its own value.',
      'Hence $4{,}728 = 4 \\times 10^3 + 7 \\times 10^2 + 2 \\times 10 + 8$: four digit-times-weight products and nothing else.',
    ] },
    { kind: 'para', text: 'Why must every digit be SMALLER than its base? Because a position that ever held a digit as large as the base could be traded in: the excess would carry into the next position, exactly as nine units and one more roll over to one ten in decimal. In base ten there is no single digit for ten \u2014 the numeral rolls over to $10$. So each base $b$ needs exactly $b$ symbols, naming $0$ through $b - 1$, and the largest digit of every base is $b - 1$: nine in decimal, seven in octal, one in binary, and in hexadecimal the letter $F$, which names fifteen. Figure 1 lays the four alphabets side by side.' },
    { kind: 'para', text: 'One more piece of hygiene, and it matters for everything that follows. A NUMERAL is not a NUMBER. The number is the value \u2014 the quantity itself. The numeral is a dress the value wears: a string of symbols from some alphabet, read by some base\u2019s weights. The same value owns a wardrobe of dresses, and different dresses can even share the same symbols. Watch what happens when the very string $101101$ is read twice.' },
    { kind: 'example', title: 'Illustration 2. Read the digit string 101101 twice: once as a decimal numeral, once as a binary numeral.', steps: [
      'Take the bare digit string $101101$ \u2014 six symbols, no base announced.',
      'Read it in base 10, the everyday dress: $1 \\times 100000 + 0 \\times 10000 + 1 \\times 1000 + 1 \\times 100 + 0 \\times 10 + 1 = 101{,}101$.',
      'Now, read the SAME string in base 2: $1 \\times 32 + 0 \\times 16 + 1 \\times 8 + 1 \\times 4 + 0 \\times 2 + 1 = 45$.',
      'Compare the two readings: the symbols never changed \u2014 only the weights did, powers of ten becoming powers of two.',
      'Hence a numeral is a number in a dress: $101101$ is one hundred one thousand one hundred one in base 10, and forty-five in base 2. The base is the tailoring rule.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note \u2014 one formula, many alphabets', text: 'The positional law (1) is indifferent to the base. Feed it the digits of $101101$ with powers of two and it returns 45; with powers of ten it returns 101,101. Nothing about the FORMULA changed \u2014 only the alphabet and the weights. This is why meeting three new numbering systems costs you almost nothing: you already own the only idea they all share.' },
    { kind: 'terms', items: [
      { term: 'Positional numeral system', def: 'a way of writing numbers where each digit contributes digit-times-weight, the weights being the powers of a fixed base \u2014 $V = \\sum_i d_i b^i$.' },
      { term: 'Base (radix)', def: 'the fixed whole number $b \\ge 2$ whose powers serve as a system\u2019s weights; the base also fixes the alphabet size \u2014 exactly $b$ symbols, $0$ through $b-1$.' },
      { term: 'Digit', def: 'one symbol of a base\u2019s alphabet; in every base each digit is smaller than the base, and the largest digit is $b - 1$.' },
      { term: 'Place value', def: 'the weight a position carries \u2014 $b^i$ for the position counted from zero at the right; the rightmost place is always worth 1.' },
      { term: 'Numeral versus number', def: 'the number is the value itself; the numeral is its dress \u2014 a digit string read by a base\u2019s weights. One number, many numerals.' },
    ] },

    // ================================================================
    // 3. THE CENSUS: FOUR SYSTEMS AT ONE GLANCE
    // ================================================================
    { kind: 'heading', text: 'The Census: Four Systems at One Glance' },
    { kind: 'para', text: 'Now meet the family properly. Computing regularly uses four positional systems, and the whole family fits in one table \u2014 this census table is the spine of the lesson, and the exam corner at the end will tell you that most examination questions about numbering systems are simply lookups in it. Read it row by row: each system is named by its base, wears exactly as many symbols as its base, and climbs its weights in powers of that base.' },
    { kind: 'table', caption: 'Table 1. The census table \u2014 the four systems of computing, side by side.', head: ['System', 'Base', 'Digit alphabet', 'Largest digit', 'Place weights, right to left'], rows: [
      ['Binary', '$2$', '$0, 1$', '$1$', '$1, 2, 4, 8, 16, 32, \\ldots$'],
      ['Octal', '$8$', '$0$ through $7$', '$7$', '$1, 8, 64, 512, \\ldots$'],
      ['Decimal', '$10$', '$0$ through $9$', '$9$', '$1, 10, 100, 1000, \\ldots$'],
      ['Hexadecimal', '$16$', '$0$ through $9$, then $A$ through $F$', '$F$ (= 15)', '$1, 16, 256, 4096, \\ldots$'],
    ] },
    { kind: 'figure', caption: 'Figure 1. The digit alphabets as one ladder: base 2 uses two symbols, base 8 eight, base 10 ten, base 16 sixteen \u2014 and hexadecimal borrows the six letters A through F, highlighted, to name the values 10 through 15 that the digits cannot.', svg: cf32AlphabetsLadderSvg() },
    { kind: 'para', text: 'Walk the ladder slowly, for it settles half the examination questions before they are asked. Binary, base 2: two symbols, $0$ and $1$, largest digit $1$ \u2014 the machine\u2019s own alphabet, forced by the two-state hardware of lesson 3.1. Octal, base 8: the digits $0$ through $7$, largest digit $7$. Decimal, base 10: the ten digits you have used since childhood \u2014 conventionally credited to our ten fingers, an honest account rather than a documented history. Hexadecimal, base 16: all ten digits PLUS the six letters $A$ through $F$, because ten symbols simply run out at nine and base 16 needs sixteen.' },
    { kind: 'callout', tone: 'definition', title: 'Definition \u2014 binary system', text: 'The `binary system` is said to be the positional numeral system with base 2, using exactly the two digits $0$ and $1$. Symbolically, a binary numeral $d_{n-1} \\ldots d_1 d_0$ names $V = \\sum_i d_i\\, 2^i$ with every $d_i$ equal to 0 or 1 \u2014 one digit per bit.' },
    { kind: 'callout', tone: 'definition', title: 'Definition \u2014 octal system', text: 'The `octal system` is said to be the positional numeral system with base 8, using exactly the digits $0$ through $7$. Symbolically, $V = \\sum_i d_i\\, 8^i$ with every $d_i \\le 7$.' },
    { kind: 'callout', tone: 'definition', title: 'Definition \u2014 hexadecimal system', text: 'The `hexadecimal system` is said to be the positional numeral system with base 16, using exactly the sixteen symbols $0$ through $9$ and $A$ through $F$. Symbolically, $V = \\sum_i d_i\\, 16^i$, where $A$ names 10, $B$ names 11, $C$ names 12, $D$ names 13, $E$ names 14 and $F$ names 15.' },
    { kind: 'para', text: 'A note on wearing the dresses legibly. When the base is not obvious from context we write it as a small subscript: $101101_2$, $55_8$, $45_{10}$, $2D_{16}$. Programmers more often meet the prefix convention instead \u2014 $\\text{0x}2D$ in C-family languages, where 0x announces hexadecimal \u2014 and assembly-era code sometimes wore a trailing H. The subscript and the prefix say the same thing: which tailoring rule to read the string by.' },
    { kind: 'callout', tone: 'warn', title: 'Caution \u2014 the base is not written inside the numeral', text: 'A bare $101101$ in prose is a DECIMAL numeral \u2014 one hundred one thousand one hundred one \u2014 unless a subscript, a prefix or the surrounding discussion says otherwise. And $\\text{0x}10$ is not \u2018ten with decoration\u2019: it is one sixteen and zero ones, which is sixteen. When you meet a numeral, settle its base FIRST; every reading mistake downstream begins here.' },
    { kind: 'terms', items: [
      { term: 'Binary system', def: 'base 2; digits 0 and 1; the machine\u2019s alphabet \u2014 one digit per bit.' },
      { term: 'Octal system', def: 'base 8; digits 0 through 7; the historical middle child, three bits per digit.' },
      { term: 'Hexadecimal system', def: 'base 16; symbols 0 through 9 and A through F; four bits per digit \u2014 the programmer\u2019s dress for bytes.' },
    ] },
    // ================================================================
    // 4. THE WITNESS: 45 IN FOUR DRESSES
    // ================================================================
    { kind: 'heading', text: 'The Witness: 45 in Four Dresses' },
    { kind: 'para', text: 'A census needs a witness \u2014 one number followed personally through every dress in the wardrobe. Ours is 45. It is big enough to need several digits in every base, small enough to hold in your head, and its binary dress $101101_2$ splits evenly into threes, which will make the grouping laws shine later. Figure 2 is the portrait to keep beside you for the rest of the chapter: the same value, four dresses, and under each dress the digit-weight scaffolding that proves the reading.' },
    { kind: 'figure', caption: 'Figure 2. The witness 45 in four dresses: $101101_2 = 32 + 8 + 4 + 1$, $55_8 = 5 \\times 8 + 5$, $45_{10} = 4 \\times 10 + 5$ and $2D_{16} = 2 \\times 16 + 13$ \u2014 the same digit-times-weight sum in every row, with only the weights changing.', svg: cf32WitnessSvg() },
    { kind: 'para', text: 'Read the portrait row by row and notice how little changes. The binary row stacks six cells with weights $32, 16, 8, 4, 2, 1$ under them; the set bits contribute $32 + 8 + 4 + 1 = 45$. The octal row needs only two cells, weights $8$ and $1$, each holding a five. The decimal row is the reading you have performed since childhood, weights $10$ and $1$. And the hexadecimal row holds a $2$ and a $D$ \u2014 the letter, remember, naming thirteen. Illustrations 3 and 4 do the octal and hex readings slowly; the binary reading was Illustration 2\u2019s second half.' },
    { kind: 'example', title: 'Illustration 3. Read the octal dress $55_8$ by place value.', steps: [
      'Take the octal numeral $55$ and its two positions: $d_1 = 5$ and $d_0 = 5$.',
      'Attach the base-eight weights: $8^1 = 8$ and $8^0 = 1$.',
      'Multiply: $5 \\times 8 = 40$ and $5 \\times 1 = 5$.',
      'Sum: $40 + 5 = 45$ \u2014 the octal dress closes on the witness.',
      'Hence $55_8 = 45$: two octal digits, two products, one sum.',
    ] },
    { kind: 'example', title: 'Illustration 4. Read the hexadecimal dress $2D_{16}$ by place value.', steps: [
      'Take the hex numeral $2D$: $d_1 = 2$ and $d_0 = D$, with the letter $D$ naming 13.',
      'Attach the base-sixteen weights: $16^1 = 16$ and $16^0 = 1$.',
      'Multiply: $2 \\times 16 = 32$ and $13 \\times 1 = 13$.',
      'Sum: $32 + 13 = 45$ \u2014 the letter did the work of the digit 13.',
      'Hence $2D_{16} = 45$, read exactly like any other positional numeral.',
    ] },
    { kind: 'table', caption: 'Table 2. The four dresses of the witness \u2014 one value, four verified readings.', head: ['Base', 'Dress', 'Expansion', 'Value'], rows: [
      ['$2$ (binary)', '$101101_2$', '$32 + 8 + 4 + 1$', '$45$'],
      ['$8$ (octal)', '$55_8$', '$5 \\times 8 + 5$', '$45$'],
      ['$10$ (decimal)', '$45_{10}$', '$4 \\times 10 + 5$', '$45$'],
      ['$16$ (hexadecimal)', '$2D_{16}$', '$2 \\times 16 + 13$', '$45$'],
    ] },
    { kind: 'para', text: 'The witness will walk with us for the rest of the lesson: the grouping section will slide its bits into threes and fours, the range discussion will ask how large a dress it could have worn, and the unit review at the chapter\u2019s end will ask for all four dresses again. When you meet $2D_{16}$ in a colour code or a memory dump, you are meeting the witness\u2019s family \u2014 values wearing base-sixteen because bytes pair off so neatly in it.' },
    { kind: 'callout', tone: 'insight', title: 'Note \u2014 the number is the value; the numeral is the dress', text: 'Keep the distinction sharp and the whole subject becomes calm. The NUMBER 45 is the quantity \u2014 the count, the amount, the value. The NUMERALS $101101_2$, $55_8$, $45_{10}$ and $2D_{16}$ are four strings of symbols that all name it, read by four different weight systems. Nothing about 45 changed when we changed its dress; only the notation did. Confusing the two is like confusing a person with the clothes they happen to be wearing today.' },
    { kind: 'terms', items: [
      { term: 'Numeral', def: 'a string of symbols from some base\u2019s alphabet, read by that base\u2019s weights \u2014 a dress a value wears.' },
      { term: 'Witness (this lesson\u2019s thread)', def: 'the value 45, followed through all four dresses \u2014 $101101_2 = 55_8 = 45_{10} = 2D_{16}$ \u2014 and revisited by the unit review.' },
    ] },

    // ================================================================
    // 5. HEXADECIMAL: THE ALPHABET OF SIXTEEN
    // ================================================================
    { kind: 'heading', text: 'Hexadecimal: the Alphabet of Sixteen' },
    { kind: 'para', text: 'Three of the four systems wear ordinary digits and ask nothing new of your eye. Hexadecimal is the newcomer that must invent six new symbols, and it deserves the longest look \u2014 both because examinations love it and because working programmers use it every single day. The problem is arithmetic, not fashion: base 16 needs sixteen symbols, the digits supply only ten, and six positions short we fall off the end. The fix the computing world settled on: continue the alphabet with the letters $A$ through $F$.' },
    { kind: 'table', caption: 'Table 3. The six borrowed letters of hexadecimal \u2014 the values the digits cannot name.', head: ['Letter', 'Names the value', 'Letter', 'Names the value'], rows: [
      ['$A$', '$10$', '$D$', '$13$'],
      ['$B$', '$11$', '$E$', '$14$'],
      ['$C$', '$12$', '$F$', '$15$'],
    ] },
    { kind: 'para', text: 'Memorise this little table cold \u2014 it is the only new vocabulary in the entire lesson. $A$ is ten, $F$ is fifteen, and the others fall in order between. With it, every hex numeral becomes readable at sight, and the first landmark worth touring is the roll-over at sixteen, where the letters hand over to the two-digit numerals.' },
    { kind: 'example', title: 'Illustration 5. Count through the hexadecimal roll-over: 0x10 = 16.', steps: [
      'Take the hex count past nine: after $9$ comes $A$, then $B$, $C$, $D$, $E$, $F$ \u2014 the letters naming $10$ through $15$.',
      'Now, add one to $F$: the units place rolls over, exactly as $9$ rolls to $10$ in decimal.',
      'So the next hex numeral is $10$ \u2014 one sixteen and zero ones.',
      'Evaluate it: $1 \\times 16 + 0 \\times 1 = 16$.',
      'Hence $\\text{0x}10 = 16$: the first two-digit hex landmark, and the hex dress of sixteen.',
    ] },
    { kind: 'example', title: 'Illustration 6. Verify the pinned landmark: 1,000 in hex is 3E8.', steps: [
      'Take the claim: the hex dress of one thousand is $3E8_{16}$.',
      'Unfold the places: $d_2 = 3$, $d_1 = E$, $d_0 = 8$, with weights $16^2 = 256$, $16^1 = 16$, $16^0 = 1$.',
      'Translate the letter: $E$ names 14.',
      'Multiply: $3 \\times 256 = 768$, $14 \\times 16 = 224$ and $8 \\times 1 = 8$.',
      'Sum: $768 + 224 + 8 = 1{,}000$ \u2014 the landmark closes.',
      'Hence $1{,}000 = 3E8_{16}$, verified digit by digit with nothing but the positional law.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'The alphabet war of the sixties', text: 'The letters A through F were not inevitable \u2014 they are an IBM standardisation of 1963. Before that settled, the Bendix G-15 (1956), a machine of the pre-standard era, had written its base-sixteen digits as 0 through 9 followed by U through Z. Language purists also grumbled that \u2018hexadecimal\u2019 welds the Greek hexa- to the Latin decimal: the Latin-correct rival \u2018sexadecimal\u2019 was seriously proposed for the base. IBM\u2019s macaronic word won the field, the U\u2013Z alphabet did not, and every hex digit you will ever write descends from that 1963 decision. (Binary itself is far older \u2014 Leibniz published his memoir in 1703 \u2014 but lesson 3.1 owns that heritage.)' },
    { kind: 'para', text: 'Why does hexadecimal earn its keep at all? The preview, before the grouping section proves it: bytes are eight bits wide, and eight bits is EXACTLY two hexadecimal digits \u2014 no padding, no remainder, a perfect fit. Memory addresses, machine codes, colour codes and network numbers are all strings of bytes, so programmers write them in the dress that packs one byte into two symbols. When a web colour says $\\text{0x}FF5733$, it is saying three bytes \u2014 $FF$, $57$ and $33$ \u2014 in six symbols; when chapter 2 told you that 24-bit colour offers $16{,}777{,}216$ values, it was telling you that six hex digits name $16^6$ values. The next section shows why the fit is exact.' },
    { kind: 'terms', items: [
      { term: 'Hex digit', def: 'one of the sixteen symbols 0\u20139 and A\u2013F; the letters A\u2013F name 10\u201315 \u2014 the vocabulary to memorise cold.' },
      { term: '0x prefix', def: 'the programmer\u2019s hex announcement \u2014 0x2D means \u2018read 2D in base 16\u2019; the same job a subscript does in prose.' },
    ] },

    // ================================================================
    // 6. THE GROUPING LAWS: THE FREE BRIDGE
    // ================================================================
    { kind: 'heading', text: 'The Grouping Laws: the Free Bridge' },
    { kind: 'para', text: 'Here is the secret that makes hexadecimal lovable, and it costs only two tiny facts: $2^3 = 8$ and $2^4 = 16$. Because eight and sixteen are POWERS OF TWO, the place-weight systems of base 8 and base 16 slice cleanly along binary\u2019s grain. One octal digit reaches exactly three bits; one hex digit reaches exactly four. So a binary numeral can be regrouped \u2014 its bits slid into blocks of three or four and each block translated to a single digit \u2014 with the value never changing and no arithmetic ever being performed. The bridge between binary, octal and hexadecimal is free.' },
    { kind: 'derivation', title: 'Why grouping works', statement: 'Show that splitting a binary numeral into blocks of three (or four) digits, counted from the right, and replacing each block by its single octal (or hexadecimal) digit, never changes the value.', steps: [
      { label: 'Write the positional sum', formula: 'V = \\sum_i d_i\\, 2^i', explanation: 'any binary numeral is a sum of digit-times-power-of-two products \u2014 that is all it is.' },
      { label: 'Partition the positions in threes', formula: '2^{3k+2},\\; 2^{3k+1},\\; 2^{3k} \\quad\\text{with}\\quad 2^{3k} = 8^k', explanation: 'three consecutive positions hang together: their weights are $4 \\cdot 8^k$, $2 \\cdot 8^k$ and $1 \\cdot 8^k$ \u2014 a little binary numeral riding the OCTAL weight $8^k$.' },
      { label: 'Factor each block', formula: 'd_2\\, 2^{3k+2} + d_1\\, 2^{3k+1} + d_0\\, 2^{3k} = (4d_2 + 2d_1 + d_0)\\, 8^k', explanation: 'the bracket is a value from 0 to 7 \u2014 exactly the reach of one octal digit \u2014 so each block of three bits IS one octal place.' },
      { label: 'The fours case is the same', formula: '(8d_3 + 4d_2 + 2d_1 + d_0)\\, 16^k', explanation: 'a block of four bits is a value from 0 to 15 \u2014 exactly one hexadecimal digit riding the hex weight $16^k$, because $2^4 = 16$.' },
    ], result: 'So grouping the bits in threes delivers the octal dress and grouping them in fours delivers the hex dress, digit by digit, with NO arithmetic \u2014 the bridge between the bit-level and the readable dresses is free.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem \u2014 the grouping laws', text: 'Because $2^3 = 8$ and $2^4 = 16$: one octal digit expands to exactly three bits, and one hexadecimal digit to exactly four. Conversely, any binary numeral split into blocks of three (or four), counted from the RIGHT, translates digit by digit into octal (or hexadecimal) \u2014 and the translation reverses by expanding each digit back to its block. Hence $2^3 = 8$ and $2^4 = 16$ are the whole toll for the bridge.' },
    { kind: 'figure', caption: 'Figure 3. The grouping bridge: $101101_2$ bracketed in threes gives $101\\;101 \\to 55_8$, and the same value as the 8-bit pattern $0010\\,1101$ bracketed in fours gives $2D_{16}$ \u2014 both bridges landing on 45, with no arithmetic anywhere.', svg: cf32GroupingBridgeSvg() },
    { kind: 'example', title: 'Illustration 7. Regroup $101101_2$ into threes and read off the octal dress.', steps: [
      'Split the six bits from the right into blocks of three: $101\\;101$ \u2014 six is a multiple of three, so no padding is needed.',
      'Read each block as one octal digit: $101_2 = 5$ and $101_2 = 5$.',
      'Write the digits in order: $55_8$.',
      'Check against the place-value reading: $5 \\times 8 + 5 = 45$, and the binary reading gave $32 + 8 + 4 + 1 = 45$.',
      'Hence $101101_2 = 55_8$, regrouped without a single multiplication.',
    ] },
    { kind: 'example', title: 'Illustration 8. Regroup $2D_{16}$ into fours and land back on the bits.', steps: [
      'Take the two hex digits of $2D_{16}$: the $2$ and the $D$.',
      'Expand each to four bits: $2 = 0010_2$, and $D = 13 = 8 + 4 + 1 = 1101_2$.',
      'Concatenate: $0010\\,1101$ \u2014 the 8-bit pattern of the witness, padded to byte width.',
      'Strip the two leading zeros: $101101$ \u2014 the binary dress of 45, as promised.',
      'Hence $2D_{16} = 0010\\,1101_2 = 101101_2$: the bridge runs both ways.',
    ] },
    { kind: 'algorithm', title: 'Binary to hexadecimal by regrouping', lines: [
      { code: 'PAD        the bits with leading zeros to a multiple of four', note: 'the left-hand end may need 1, 2 or 3 spare zeros \u2014 leading zeros never change a value' },
      { code: 'SPLIT      the bits into blocks of four, from the RIGHT', note: 'from the right, always \u2014 the units block must be complete' },
      { code: 'TRANSLATE  each 4-bit block to its hex digit', note: '0000 to 0, ..., 1001 to 9, 1010 to A, ..., 1111 to F \u2014 the letter table read backwards' },
      { code: 'READ       the hex digits left to right', note: 'that is the whole algorithm \u2014 no arithmetic anywhere' },
    ], note: 'The same four moves with blocks of three deliver the octal dress instead \u2014 one constant changes.' },
    { kind: 'callout', tone: 'warn', title: 'Caution \u2014 the two classic slips', text: '(i) Grouping from the LEFT. Blocks are counted from the RIGHT, so the units block is complete; grouping $101101$ from the left as $100\\;110$ would wrongly give $46_8$. (ii) Forgetting the pad. An 8-bit pattern is a multiple of FOUR but not of THREE \u2014 regrouping the witness\u2019s byte $0010\\,1101$ in threes must first borrow one leading zero, giving $000\\;101\\;101 = 055_8$, whose leading zero then vanishes: $55_8$. Eight divides by four; it does not divide by three.' },
    { kind: 'para', text: 'Now the programmer\u2019s arithmetic, in full. A byte is 8 bits; 8 is two blocks of 4; so ONE BYTE IS EXACTLY TWO HEX DIGITS. Count the values either way and the census agrees: $16^2 = 256$ and $2^8 = 256$ \u2014 the equality is $(2^4)^2 = 2^8$, the exponent law in a byte-shaped costume. That single fit is why hex won the programmer\u2019s heart: a 32-bit word is a tidy eight hex digits, a 64-bit address sixteen, and a colour like $\\text{0x}FF5733$ exactly three bytes on one line. Table 4 files the landmarks every programmer carries \u2014 note how each is a power of two wearing its hex dress.' },
    { kind: 'table', caption: 'Table 4. The programmer\u2019s byte landmarks \u2014 powers of two in their hex dresses.', head: ['Hex landmark', 'Expansion', 'Value'], rows: [
      ['$\\text{0x}10$', '$1 \\times 16 + 0$', '$16 = 2^4$'],
      ['$\\text{0x}20$', '$2 \\times 16$', '$32 = 2^5$'],
      ['$\\text{0x}40$', '$4 \\times 16$', '$64 = 2^6$'],
      ['$\\text{0x}80$', '$8 \\times 16$', '$128 = 2^7$'],
      ['$\\text{0x}100$', '$1 \\times 256$', '$256 = 2^8$'],
    ] },
    { kind: 'formula', name: 'The grouping laws', latex: '2^3 = 8 \\qquad 2^4 = 16', note: 'One octal digit is exactly 3 bits; one hex digit is exactly 4 bits \u2014 regrouping between binary, octal and hex is free.' },
    { kind: 'formula', name: 'The byte law', latex: '1\\ \\text{byte} = 8\\ \\text{bits} = 2\\ \\text{hex digits}, \\qquad 16^2 = 2^8 = 256', note: 'The fit that made hexadecimal: two hex digits span exactly the byte \u2014 256 values, 00 to FF.' },
    { kind: 'callout', tone: 'insight', title: 'Note \u2014 octal\u2019s niche, honestly stated', text: 'If hex fits bytes so perfectly, why does octal exist at all? History and one live habit. The machines of the 1960s often had word sizes in multiples of THREE \u2014 12-bit, 36-bit machines on which octal grouped cleanly \u2014 and octal was their house dress. Today octal survives visibly in Unix file permissions: 644 and 755 are octal numerals whose three digits are three bit-flags \u2014 owner, group, world \u2014 each digit carrying read, write and execute. A base lives on where its grouping still slices the hardware.' },
    { kind: 'terms', items: [
      { term: 'Regrouping', def: 'sliding a binary numeral\u2019s bits into blocks of three (octal) or four (hex), from the right, and translating each block to one digit \u2014 the free bridge.' },
      { term: 'Nibble', def: 'a block of four bits \u2014 half a byte, one hex digit; the honest etymology is a small bite of a byte.' },
    ] },

    // ================================================================
    // 7. THE RANGE LAW: THE NAMING POWER OF N DIGITS
    // ================================================================
    { kind: 'heading', text: 'The Range Law: the Naming Power of n Digits' },
    { kind: 'para', text: 'How much can n digits name? The question is a census question, and the census answer is exact: n positions, each offering b independent choices, give $b^n$ numerals in all \u2014 and since the count starts at zero (the all-zero numeral is a legitimate value), those numerals name exactly the values $0$ through $b^n - 1$. Two consequences follow at once, and both are examination favourites: the largest n-digit numeral in base b is $b^n - 1$, and it is worn by the all-maximal numeral, every digit $b - 1$.' },
    { kind: 'derivation', title: 'The largest n-digit numeral', statement: 'Find the largest value that an n-digit numeral in base b can name, and identify the numeral that wears it.', steps: [
      { label: 'Count the numerals', formula: 'n \\text{ positions} \\times b \\text{ choices each} \\;\\Rightarrow\\; b^n \\text{ numerals}', explanation: 'each position holds any of the b symbols independently, so the census of n-digit numerals (leading zeros allowed) is $b^n$.' },
      { label: 'Start the count at zero', formula: '0,\\; 1,\\; \\ldots,\\; b^n - 1', explanation: 'the all-zero numeral names zero and is counted, so the $b^n$ values run from 0 up to one short of $b^n$.' },
      { label: 'Name the largest', formula: '\\text{largest} = b^n - 1', explanation: 'one less than the census \u2014 the off-by-one that examination setters adore.' },
      { label: 'Identify the wearer', formula: '(b-1)(b-1)\\ldots(b-1) = b^n - 1', explanation: 'the all-maximal numeral: adding one to it rolls EVERY position over and grows the length by one, so nothing larger fits in n digits.' },
    ], result: 'So n digits in base b name exactly $b^n$ values, from $0$ to $b^n - 1$, and the largest is worn by the all-$(b-1)$ numeral \u2014 for binary, $n$ ones, of value $2^n - 1$.' },
    { kind: 'example', title: 'Illustration 9. The largest 8-bit number is all ones: $11111111_2 = 255$.', steps: [
      'Take the eight bit positions with their weights: $128, 64, 32, 16, 8, 4, 2, 1$.',
      'Set every bit: $11111111_2$ \u2014 the all-maximal wearer.',
      'Sum the weights: $128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255$.',
      'Check by the range law: $2^8 - 1 = 256 - 1 = 255$.',
      'Hence the largest 8-bit numeral is $11111111_2 = 255$, and its hex dress is $FF_{16}$ \u2014 the largest byte.',
    ] },
    { kind: 'table', caption: 'Table 5. The range census \u2014 how much each digit count can name, with the hex dresses of the maxima.', head: ['Digits', 'Values named', 'Largest value', 'Hex dress of the largest'], rows: [
      ['$8$ bits', '$2^8 = 256$', '$11111111_2 = 255$', '$FF_{16}$'],
      ['$2$ hex digits', '$16^2 = 256$', '$255$ \u2014 one byte', '$FF_{16}$'],
      ['$16$ bits', '$2^{16} = 65{,}536$', '$65{,}535$', '$FFFF_{16}$'],
      ['$4$ hex digits', '$16^4 = 65{,}536$', '$65{,}535$ \u2014 the 16-bit word', '$FFFF_{16}$'],
      ['$6$ hex digits', '$16^6 = 16{,}777{,}216$', '$16{,}777{,}215$ \u2014 24-bit colour', '$FFFFFF_{16}$'],
    ] },
    { kind: 'example', title: 'Illustration 10. Count the naming power of hex digits in pairs.', steps: [
      'Take one pair of hex digits: $16^2 = 256$ values \u2014 exactly the byte, from $00_{16}$ to $FF_{16}$.',
      'Take two pairs: $16^4 = 65{,}536$ values \u2014 the reach of sixteen bits.',
      'Take three pairs: $16^6 = 16{,}777{,}216$ values \u2014 chapter 2\u2019s 24-bit colour census, met there as $2^{24}$.',
      'Check the equality: $16^6 = (2^4)^6 = 2^{24} = 16{,}777{,}216$ \u2014 the same census computed two ways.',
      'Hence every pair of hex digits is one byte: two, four and six hex digits name $256$, $65{,}536$ and $16{,}777{,}216$ values.',
    ] },
    { kind: 'formula', name: 'The range law', latex: 'n \\text{ digits in base } b \\text{ name } b^n \\text{ values}; \\qquad \\text{largest} = b^n - 1', note: 'The census of naming power \u2014 count the values from zero, so the largest is one short of the census: 8 bits give 256 values with largest 255.' },
    { kind: 'callout', tone: 'warn', title: 'Caution \u2014 the off-by-one trap', text: 'Examinations set this trap every year, in every dress. $2^8 = 256$ is the COUNT of values an 8-bit numeral can name (0 through 255); the LARGEST is $255 = 2^8 - 1$. Likewise 16 bits give $65{,}536$ values with largest $65{,}535$, and two hex digits give $256$ values with largest $FF_{16} = 255$. Whenever a question says \u2018largest\u2019 or \u2018maximum\u2019, subtract one from the census before answering.' },
    { kind: 'terms', items: [
      { term: 'Range law', def: 'n digits in base b name $b^n$ values, $0$ through $b^n - 1$; the largest wearer is the all-$(b-1)$ numeral.' },
      { term: 'All-ones numeral', def: 'the binary all-maximal numeral of n bits, value $2^n - 1$ \u2014 11111111 for a byte, worth 255.' },
    ] },

    // ================================================================
    // 8. THE COUNTING STRIP: 0 TO 16 IN FOUR BASES
    // ================================================================
    { kind: 'heading', text: 'The Counting Strip: 0 to 16 in Four Bases' },
    { kind: 'para', text: 'The final census walk is counting itself \u2014 the humble act of adding one, performed in all four dresses at once. Figure 4 lays the strip out in two bands: read it COLUMN by column, not row by row, and watch a single value wear its four dresses side by side as it climbs. Every cell in the figure is computed, and the milestones are marked where the dresses change length.' },
    { kind: 'figure', caption: 'Figure 4. The counting strip 0 to 16 in all four bases: each column is one value in its decimal, binary, octal and hex dresses, with the milestones 8, 10, 15 and 16 marked and the hex letters A\u2013F highlighted.', svg: cf32CountingStripSvg() },
    { kind: 'para', text: 'Tour the milestones, for they are the strip\u2019s teaching moments. At 7 the binary dress says $111$ \u2014 the last three-bit value. At 8 it says $1000$: the first four-bit binary numeral, and \u2014 look along the row \u2014 the first TWO-digit octal numeral, $10_8$, because eight is exactly one eight. At 10 the decimal dress is two digits, the binary says $1010$, the octal $12_8$, and the hex dress produces its FIRST LETTER: $A_{16}$. At 15 the binary is $1111$, the octal $17_8$, and hex reaches its LARGEST DIGIT, $F_{16}$. And at 16 every dress rolls over in its own way: binary $10000$ (first five-bit numeral), octal $20_8$, and hex $10_{16}$ \u2014 the landmark $\\text{0x}10 = 16$ you verified in Illustration 5.' },
    { kind: 'para', text: 'Watch, in particular, the step from 15 to 16 in the hex row: $F$ plus one carries to give $10$, precisely as 9 plus one carries to give 10 in decimal, and as $1111$ plus one carries to give $10000$ in binary. Adding one is the SAME GAME in every base \u2014 raise the units digit; if it was maximal, roll it to zero and carry into the next place; keep carrying while digits stay maximal. The dresses differ only in how OFTEN the rollover arrives: every second step in binary, every tenth in decimal, every sixteenth in hexadecimal.' },
    { kind: 'callout', tone: 'insight', title: 'Note \u2014 one counting game, three speeds', text: 'Binary carries at every other step, decimal once a decade, hexadecimal once per sixteen \u2014 but the carry RULE is identical, and that is why the counting strip\u2019s columns move together. When lesson 3.6 teaches the division-by-two craft of conversion, it is this same odometer running backwards; when a clock, a counter or a colour channel ticks over, it is this odometer in whatever dress the hardware wears.' },
    // ================================================================
    // 9. THE DOORSTEPS: WHERE THE FULL THEORY LIVES
    // ================================================================
    { kind: 'heading', text: 'The Doorsteps: Where the Full Theory Lives' },
    { kind: 'para', text: 'The census is complete. One formula, $V = \\sum_i d_i\\, b^i$, turned out to be the whole engine; four alphabets gave four systems; the witness 45 tried on all four dresses; two tiny power facts, $2^3 = 8$ and $2^4 = 16$, bought a free bridge between three of the systems; the range law priced the naming power of $n$ digits; and the counting strip showed one odometer game running at three speeds. That is a full FIRST MEETING with the number systems of computing \u2014 and an honest lesson says plainly where its own ground ends and the neighbours\u2019 begins.' },
    { kind: 'callout', tone: 'insight', title: 'Note \u2014 the doorsteps of this lesson', text: 'Three doors open off this room, and we have deliberately opened none of them. The full THEORY of number systems \u2014 bases in general, what happens past the decimal point, divisibility tests, how the rational and real numbers themselves are built \u2014 lives on the mathematics shelf, in \u2018Arithmetic and Number Systems\u2019; this lesson is that book\u2019s doorstep, not a rival to it. The gate-level view \u2014 how these very bits sit inside logic gates, registers and buses \u2014 belongs to \u2018Digital Logic Design\u2019 on the engineering shelf. And the conversion CRAFT is next door in this very chapter: lesson 3.6, \u2018Decimal to Binary Conversion\u2019, owns the dividing-by-two routine; lesson 3.7, \u2018Binary to Decimal Conversion\u2019, owns the systematic reading routine; and lesson 3.8, \u2018Decimal and Binary Number System\u2019, gathers the whole story into one map. Meet the family here; master the craft there.' },
    { kind: 'para', text: 'Why defer the craft at all? Because regrouping \u2014 this lesson\u2019s bridge \u2014 already covers every translation AMONG binary, octal and hexadecimal, and it needs no arithmetic. What it cannot do is cross between decimal and the machine bases: for that you need the division and reading routines, which are mechanical enough to deserve their own drill ground. When you reach lesson 3.6 you will find its work surprisingly short, precisely because this lesson drew the map first \u2014 you will know WHAT the dividing is for, and you will check every answer against the regrouping bridge you already own.' },
    { kind: 'para', text: 'The witness, meanwhile, has one more appointment: the unit review at the chapter\u2019s end will ask for all four dresses of 45 again, and by then you will produce them at sight. A number you have met in four dresses is a number you own \u2014 which was the quiet ambition of the whole census.' },

    // ================================================================
    // 10. THE LESSON ON ONE LINE (REVISION CARDS)
    // ================================================================
    { kind: 'heading', text: 'The Lesson on One Line' },
    { kind: 'para', text: 'Before the examination corner and the practice sets, gather the whole census into display form. Equation (2) is the witness equation \u2014 the lesson\u2019s single sentence spoken in four dresses at once. Equation (3) is the byte law \u2014 the grouping laws squeezed into the programmer\u2019s favourite fit. Keep both beside you through the practice sets: every question there resolves into one of them, or into the census table the lesson is built on.' },
    { kind: 'equation', latex: '101101_2 \\;=\\; 55_8 \\;=\\; 45_{10} \\;=\\; 2D_{16} \\tag{2}', note: 'The witness equation: one value, four dresses \u2014 every row of the census table applied to the same number, 45.' },
    { kind: 'equation', latex: '1\\ \\text{byte} \\;=\\; 8\\ \\text{bits} \\;=\\; 2\\ \\text{hex digits}, \\qquad 16^2 = 2^8 = 256 \\tag{3}', note: 'The byte law: the grouping laws ($2^3 = 8$ and $2^4 = 16$) squeezed into the programmer\u2019s favourite fit \u2014 two hex digits span exactly the byte.' },
    { kind: 'para', text: 'The formula cards below are the revision kit \u2014 the lines to recall cold. The grouping laws, the byte law and the range law were pinned where they were derived, in the body of the lesson; the two new cards gather the census and the positional law itself. Recall them in this order and the lesson replays itself from memory.' },
    { kind: 'formula', name: 'The positional value law', latex: 'V = \\sum_{i=0}^{n-1} d_i\\, b^i', note: 'Digit times weight, summed \u2014 the one formula under every base; the rightmost weight is always 1, because $b^0 = 1$.' },
    { kind: 'formula', name: 'The hex alphabet', latex: 'A = 10,\\; B = 11,\\; C = 12,\\; D = 13,\\; E = 14,\\; F = 15', note: 'The only new vocabulary of the lesson \u2014 the six letters hexadecimal borrows past the end of the digits.' },
    { kind: 'para', text: 'And the take-away list, in the house style \u2014 eight lines, one per leg of the walk:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) A numeral is a compressed sum: each digit times its weight, the weights the powers of the base \u2014 $V = \\sum_i d_i\\, b^i$, one formula for every alphabet.',
      '(ii) Base $b$ uses exactly $b$ symbols, $0$ through $b-1$: two for binary, eight for octal, ten for decimal, sixteen for hexadecimal \u2014 the last six borrowed as the letters $A$ through $F$.',
      '(iii) The witness owns four dresses: $101101_2 = 55_8 = 45_{10} = 2D_{16}$ \u2014 the same value, read by the same law, in every wardrobe.',
      '(iv) Because $2^3 = 8$ and $2^4 = 16$, regrouping binary in threes gives the octal dress and in fours the hex dress \u2014 the free bridge, no arithmetic anywhere.',
      '(v) Group from the RIGHT, padding leading zeros when the length does not divide: eight bits group cleanly in fours but need one borrowed zero for threes.',
      '(vi) $n$ digits in base $b$ name $b^n$ values, largest $b^n - 1$: eight bits give 256 values with largest 255 ($FF_{16}$); sixteen give 65,536 with largest 65,535.',
      '(vii) One byte is exactly two hex digits \u2014 $16^2 = 2^8 = 256$ \u2014 which is why memory dumps, machine codes, colour codes and permissions wear hex.',
      '(viii) Counting is one odometer game at three speeds: carry when a digit is maximal; the dresses differ only in how often the rollover arrives \u2014 every second step, every tenth, every sixteenth.',
    ] },

    // ================================================================
    // 11. EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Exam Corner: What the Papers Ask' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner \u2014 the census in examination dress', text: 'Banking and SSC-style computer-awareness papers, school and board examinations, and Cambridge 9618 / A-level-style asks keep a small, stable set of questions on this ground \u2014 all exam-style: original items written in the examination idiom, never quotations from a real paper. (i) Alphabet lookups: WHICH base uses the digits 0 through 7 (octal \u2014 base 8), or which system needs letters at all (hexadecimal, because sixteen exceeds the ten digits). (ii) The hex of a given byte: regroup 0010 1101 in fours from the right and read 2D. (iii) The largest 8-bit number: 255, not 256 \u2014 the off-by-one trap, set every single year. (iv) One hex digit equals how many bits: 4, because $2^4 = 16$. (v) Prefix readings: 0x10 is sixteen, not ten. Master the census table, the grouping laws and the range law, and every one of the five asks collapses into a lookup or a free regrouping.' },
    { kind: 'para', text: 'Notice, too, what the examination families do NOT ask here. They rarely ask you to convert a large decimal number to binary in your head \u2014 that is lesson 3.6\u2019s drill ground, and papers that want it give you room to work. What they test on this ground is exactly the census: alphabets, groupings, ranges, landmarks. That is why the practice sets below drill lookups and regroupings first, and save the multi-part synthesis for the top rung.' },

    // ================================================================
    // 12. CHECK YOUR UNDERSTANDING (QUIZ)
    // ================================================================
    { kind: 'heading', text: 'Check Your Understanding' },
    { kind: 'para', text: 'Five questions, one per family of the census. Choose your answer before you read the explanation: each explanation tells you not only why the keyed option is right but exactly why each of the other three fails \u2014 the wrong options are this lesson\u2019s traps wearing dresses, and naming the trap is the revision.' },
    { kind: 'quiz', items: [
      {
        q: 'Which number system has the digit alphabet 0 through 7?',
        options: ['The binary system', 'The hexadecimal system', 'The octal system', 'The decimal system'],
        answer: 2,
        explain: 'The octal system is base 8, and a base of $b$ always uses exactly $b$ symbols, $0$ through $b-1$ \u2014 so octal uses exactly the eight digits 0 through 7, with largest digit 7. The binary system is base 2 and uses only the two symbols 0 and 1, so the digits 2 through 7 can never appear in it. The hexadecimal system is base 16 and must reach past the ten digits to the letters $A$ through $F$ \u2014 an alphabet far larger than 0 through 7. The decimal system is base 10 and uses 0 through 9, two symbols too many. Hence the alphabet 0 through 7 belongs to the octal system alone.',
      },
      {
        q: 'One hexadecimal digit spans exactly how many bits?',
        options: ['Exactly 4 bits', 'Exactly 3 bits', 'Exactly 8 bits', 'Exactly 2 bits'],
        answer: 0,
        explain: 'One hex digit must distinguish sixteen values, and $2^4 = 16$, so exactly 4 bits \u2014 the grouping law that makes regrouping between binary and hexadecimal free. Exactly 3 bits would span only $2^3 = 8$ values, which is the OCTAL digit\u2019s reach, not the hex digit\u2019s. Exactly 8 bits is a whole byte \u2014 and a byte is TWO hex digits, not one. Exactly 2 bits spans only $2^2 = 4$ values, not even enough to name the digits past three. Hence one hex digit spans exactly 4 bits.',
      },
      {
        q: 'The largest number that fits in 8 bits is —',
        options: ['256', '128', '65,535', '255'],
        answer: 3,
        explain: 'Eight bits name $2^8 = 256$ values, and because the count starts at zero the largest is one less: $2^8 - 1 = 255$, worn by the all-ones numeral $11111111_2$, whose hex dress is $FF_{16}$. The option 256 is the COUNT of values, not the largest \u2014 the classic off-by-one trap that papers set every year. The option 128 is the value of the top bit alone, $10000000_2$ \u2014 only half the weight ladder. The option 65,535 is the largest SIXTEEN-bit number, $2^{16} - 1$, a different rung of the ladder entirely. Hence the largest 8-bit number is 255.',
      },
      {
        q: 'The hexadecimal dress of the byte 0010 1101 is —',
        options: ['2C', '2D', '3D', '35'],
        answer: 1,
        explain: 'Regroup the byte in blocks of four, counted from the right: 0010 and 1101. Now, $0010_2 = 2$, and $1101_2 = 8 + 4 + 1 = 13$, which wears the letter $D$ \u2014 so the dress is 2D, this lesson\u2019s witness byte, of value 45. The option 2C would need the right-hand block to be $1100_2 = 12$ instead \u2014 one bit different. The option 3D would need the left-hand block to be $0011_2 = 3$ \u2014 again one bit different. The option 35 would need the whole byte to be $0011\\,0101_2$ \u2014 wrong in both blocks. Hence the byte\u2019s hex dress is 2D.',
      },
      {
        q: 'The hex numeral 0x10 names which value?',
        options: ['Ten', 'Eight', 'Sixteen', 'One hundred'],
        answer: 2,
        explain: 'The prefix 0x announces base 16, so $\\text{0x}10$ is one sixteen and zero ones: $1 \\times 16 + 0 = 16$ \u2014 the first two-digit hex landmark. The option Ten is what the symbols spell if you ignore the prefix and read them as an everyday decimal numeral \u2014 the very confusion the 0x prefix exists to prevent. The option Eight is $\\text{0x}8$, a one-digit hex numeral. The option One hundred is $\\text{0x}64 = 6 \\times 16 + 4$, a different two-digit hex numeral. Hence 0x10 names sixteen.',
      },
    ] },

    // ================================================================
    // 13. PRACTICE SETS (15 exercises: L1x4, L2x4, L3x4, L4x3)
    // ================================================================
    { kind: 'heading', text: 'Practice Sets' },
    { kind: 'para', text: 'The sets below climb four rungs. L1 begins at the census table itself \u2014 lookups and first regroupings. L2 works the free bridge in both directions. L3 advances to working skills: bytes read three ways, padding judged, dresses found. L4 trains the examination idiom \u2014 and every L4 item is exam-style, an original item in the examination idiom, never a real past-paper question. The witness walks through the sets with you: you will meet 45, its byte and its landmarks again, each time wearing one more of the dresses you now own.' },
    { kind: 'para', text: 'Work each solution chain with a pencil and say the connectives aloud \u2014 Take, Split, Check, Hence: they are the method, not decoration. Where a question carries a figure, the figure is the arithmetic drawn: read it after the chain, and confirm every cell against your own working. The answers stand at the end of each chain as the terminal line.' },
    { kind: 'exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'The witness of this lesson is the number 45. Regroup its binary dress $101101_2$ into blocks of three and read off the octal dress, then confirm the value by place value.',
            solution: [
              'Take the binary dress of the witness: $101101_2$ \u2014 six bits, and six is a multiple of three, so no padding is needed.',
              'Split the bits into blocks of three, counted from the right: $101\\;101$.',
              'Translate each block as one octal digit: $101_2 = 4 + 1 = 5$, and the second block is identical, so both digits are $5$.',
              'Read the digits in order: $55_8$.',
              'Check by place value: $5 \\times 8 + 5 = 40 + 5 = 45$ \u2014 the witness, as promised.',
              'Hence $101101_2 = 55_8 = 45$, regrouped in threes with no multiplication anywhere. (The strip figure shows the two blocks and their digits.)',
            ],
            answer: '101101 base 2 = 55 base 8 = 45, grouped in threes with no arithmetic.',
            figures: [
              { caption: 'Regrouping the witness by threes: the six bits 101 101 each translate to the octal digit 5, giving the dress 55 in base 8, which is 45 in decimal \u2014 no multiplication anywhere.', svg: cf32WitnessRegroupSvg() },
            ],
          },
          {
            q: 'Which base has the digit alphabet $0$ through $7$? State the system\u2019s name, how many symbols it uses, and its largest digit \u2014 an examination favourite worth owning cold.',
            solution: [
              'Take the census table row by row and match the alphabet: base 2 uses $0, 1$; base 8 uses $0$ through $7$; base 10 uses $0$ through $9$; base 16 needs $0$ through $9$ and then $A$ through $F$.',
              'So, the alphabet $0$ through $7$ belongs to base 8 \u2014 the octal system.',
              'Count the symbols: exactly eight, one per unit of the base.',
              'Now, the largest digit of any base $b$ is $b - 1$, so the largest octal digit is $8 - 1 = 7$.',
              'Hence the system is base 8 \u2014 octal \u2014 with exactly eight symbols, $0$ through $7$, and largest digit $7$.',
            ],
            answer: 'Base 8 \u2014 the octal system: eight symbols 0 through 7, largest digit 7.',
          },
          {
            q: 'Read the hexadecimal numeral $3E8_{16}$ by place value and verify that it names $1{,}000$.',
            solution: [
              'Take the numeral $3E8$: three positions, with the letter $E$ naming $14$.',
              'Attach the base-sixteen weights: $16^2 = 256$, $16^1 = 16$, $16^0 = 1$.',
              'Multiply: $3 \\times 256 = 768$, $14 \\times 16 = 224$ and $8 \\times 1 = 8$.',
              'Sum: $768 + 224 + 8 = 1{,}000$.',
              'Hence $3E8_{16} = 768 + 224 + 8 = 1{,}000$ \u2014 the pinned landmark, verified digit by digit with nothing but the positional law.',
            ],
            answer: '3E8 in base 16 = 768 + 224 + 8 = 1,000.',
          },
          {
            q: 'A byte holds the pattern $11010110$. Find its decimal value from the weight ladder, then give BOTH regrouped dresses \u2014 octal and hexadecimal \u2014 and check that all three readings agree.',
            solution: [
              'Take the byte $11010110$ and its weight ladder, right to left: $1, 2, 4, 8, 16, 32, 64, 128$.',
              'Sum the set bits: $128 + 64 + 16 + 4 + 2 = 214$.',
              'Now, group by threes: eight bits is not a multiple of three, so pad ONE leading zero first \u2014 $011\\;010\\;110$.',
              'Translate: $011_2 = 3$, $010_2 = 2$ and $110_2 = 6$, giving $326_8$.',
              'Check the octal dress: $3 \\times 64 + 2 \\times 8 + 6 = 192 + 16 + 6 = 214$.',
              'Now, group by fours: $1101\\;0110$, with $1101_2 = 13 = D$ and $0110_2 = 6$, giving $D6_{16}$; and $13 \\times 16 + 6 = 214$ as well.',
              'Hence $11010110_2 = 326_8 = D6_{16} = 214$ \u2014 three dresses, one value, the bridge free both ways. (The figure draws both regroupings.)',
            ],
            answer: '11010110 = 326 in base 8 = D6 in base 16 = 214 in decimal.',
            figures: [
              { caption: 'Regrouping the byte 11010110 both ways: padded with one leading zero and grouped in threes it reads 326 in base 8; grouped in fours it reads D6 in base 16 \u2014 both dresses name 214.', svg: cf32RegroupByteSvg() },
            ],
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Walk the grouping bridge both ways for the witness: expand $2D_{16}$ back to its bits, strip the padding, and then regroup those bits in fours to return to $2D_{16}$.',
            solution: [
              'Take the hex dress $2D_{16}$: the digits $2$ and $D$, with the letter $D$ naming $13$.',
              'Expand each digit to four bits: $2 = 0010_2$, and $13 = 8 + 4 + 1 = 1101_2$.',
              'Concatenate: $0010\\,1101$ \u2014 the witness\u2019s 8-bit pattern, carrying two leading zeros of padding.',
              'Strip the padding: $101101$ \u2014 the binary dress of $45$, as the lesson promised.',
              'Now, return: regroup $101101$ in fours from the right, padding again to $0010\\,1101$, and read the blocks: $0010_2 = 2$ and $1101_2 = 13 = D$.',
              'Hence $2D_{16} \\to 0010\\,1101 \\to 101101 \\to 2D_{16}$ \u2014 the bridge runs both ways at zero cost.',
            ],
            answer: '2D expands to 0010 1101, which strips to 101101; regrouped in fours it returns to 2D.',
          },
          {
            q: 'Using the witness\u2019s byte $0010\\,1101$, show that one byte is exactly two hexadecimal digits; explain WHY the fit is exact, and count the values the two digits span.',
            solution: [
              'Take the byte $0010\\,1101$ \u2014 eight bits, the witness padded to byte width.',
              'Split it into blocks of four, counted from the right: $0010$ and $1101$ \u2014 two complete blocks, nothing left over.',
              'Translate: $0010_2 = 2$ and $1101_2 = 13 = D$, so the byte\u2019s hex dress is $2D_{16}$ \u2014 exactly two digits.',
              'Now, the reason the fit is exact: one hex digit spans $2^4 = 16$ values, that is, exactly 4 bits, so two digits span $4 + 4 = 8$ bits \u2014 one byte, with no remainder.',
              'Count the values: $16^2 = 256$ on the hex side and $2^8 = 256$ on the bit side \u2014 the same census, because $(2^4)^2 = 2^8$.',
              'Hence one byte is exactly two hex digits \u2014 $2D_{16}$ for this byte \u2014 because $16^2 = 2^8 = 256$. (The strip figure draws the mapping.)',
            ],
            answer: 'One byte = 8 bits = exactly 2 hex digits (here 2D); the two digits span 16 x 16 = 256 = 2^8 values.',
            figures: [
              { caption: 'The byte-to-hex mapping strip: the eight bits 0010 1101 split into two blocks of four that translate to 2 and D \u2014 and 16 x 16 = 256 values span the whole byte, from 00 to FF.', svg: cf32ByteHexStripSvg() },
            ],
          },
          {
            q: 'Write down the largest number that fits in 4 bits, 8 bits, 12 bits and 16 bits, verify each by the range law, and describe the pattern the four wearers share.',
            solution: [
              'Take the range law: $n$ digits in base $b$ name $b^n$ values, so the largest is $b^n - 1$ \u2014 one short of the census, because the count starts at zero.',
              'For 4 bits: $2^4 - 1 = 16 - 1 = 15$, worn by $1111_2$.',
              'For 8 bits: $2^8 - 1 = 256 - 1 = 255$, worn by $11111111_2$ \u2014 the largest byte, hex dress $FF_{16}$.',
              'For 12 bits: $2^{12} - 1 = 4{,}096 - 1 = 4{,}095$, worn by twelve ones.',
              'For 16 bits: $2^{16} - 1 = 65{,}536 - 1 = 65{,}535$, hex dress $FFFF_{16}$.',
              'So, the wearers are all ALL-ONES numerals \u2014 every digit maximal at $b - 1 = 1$ \u2014 because adding one would roll every position over and grow the length.',
              'Hence the maxima are 15 for 4 bits, 255 for 8 bits, $4{,}095$ for 12 bits and $65{,}535$ for 16 bits \u2014 each $2^n - 1$, each worn by all ones. (The ladder figure shows the four rungs.)',
            ],
            answer: 'Largest n-bit numbers: 4 bits = 15, 8 bits = 255, 12 bits = 4,095, 16 bits = 65,535 \u2014 all worn by all-ones numerals.',
            figures: [
              { caption: 'The range ladder: the largest 4-, 8-, 12- and 16-bit numbers are the all-ones numerals 15, 255, 4,095 and 65,535 \u2014 each added bit doubles the range.', svg: cf32RangeBarsSvg() },
            ],
          },
          {
            q: 'Count the naming power of 2, 4 and 6 hexadecimal digits, give the hex dress of each maximum, and connect the six-digit census to chapter 2\u2019s colour count.',
            solution: [
              'Take the range law in hexadecimal: $n$ hex digits name $16^n$ values, from the all-zero numeral up to the all-$F$ wearer.',
              'Two digits: $16^2 = 256$ values \u2014 exactly one byte, maximum $FF_{16} = 255$.',
              'Four digits: $16^4 = 65{,}536$ values \u2014 the reach of sixteen bits, maximum $FFFF_{16} = 65{,}535$.',
              'Six digits: $16^6 = 16{,}777{,}216$ values \u2014 maximum $FFFFFF_{16} = 16{,}777{,}215$.',
              'Check the colour link: $16^6 = (2^4)^6 = 2^{24}$, and chapter 2 met $2^{24} = 16{,}777{,}216$ as the 24-bit colour census \u2014 one number, two dresses.',
              'Hence 2, 4 and 6 hex digits name $256$, $65{,}536$ and $16{,}777{,}216$ values \u2014 the 24-bit colour census at the top, one byte per digit pair. (The census bars draw the ladder.)',
            ],
            answer: '2 hex digits = 256 values (max FF); 4 = 65,536 (max FFFF); 6 = 16,777,216 (max FFFFFF) \u2014 the 24-bit colour census.',
            figures: [
              { caption: 'The hex census ladder: 2 hex digits name 256 values, 4 name 65,536, 6 name 16,777,216 \u2014 every pair of digits exactly one byte.', svg: cf32HexCountLadderSvg() },
            ],
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'By regrouping alone, convert $100110_2$ to octal; then verify the value by reading both dresses in decimal.',
            solution: [
              'Take the bits $100110$ \u2014 six of them, a multiple of three, so no padding is needed.',
              'Split into blocks of three, counted from the right: $100\\;110$.',
              'Translate each block: $100_2 = 4$ and $110_2 = 6$, giving $46_8$.',
              'Check the octal reading: $4 \\times 8 + 6 = 38$.',
              'Now, check the binary reading: $32 + 4 + 2 = 38$.',
              'Hence $100110_2 = 46_8 = 38$ \u2014 one value, agreed by both readings, regrouped without a single multiplication.',
            ],
            answer: '100110 in base 2 = 46 in base 8 = 38 in decimal.',
          },
          {
            q: 'Find the hexadecimal dress of $200$ and verify it by place value; then say how many hex digits the dress needs, and why.',
            solution: [
              'Take the target value $200$ and the hex weights: $16^2 = 256$ is already too big, so the dress needs only two digits \u2014 weights $16$ and $1$.',
              'Ask how many sixteens fit: $12$, since $12 \\times 16 = 192$, leaving $200 - 192 = 8$ for the units.',
              'Translate the twelve: it lies past the digits, so it wears the letter $C$.',
              'Write the dress: $C8_{16}$.',
              'Check by place value: $12 \\times 16 + 8 = 192 + 8 = 200$.',
              'Hence $200 = 12 \\times 16 + 8 = C8_{16}$, a two-digit dress, because $16^2 = 256 > 200 \\ge 16$.',
            ],
            answer: '200 = C8 in base 16 (= 12 x 16 + 8); two hex digits, since 256 exceeds 200.',
          },
          {
            q: 'A byte holds $01001000$. Read its value from the weight ladder, give its hex dress by regrouping, and check that the two readings agree.',
            solution: [
              'Take the byte $01001000$ and its weights, right to left: $1, 2, 4, 8, 16, 32, 64, 128$.',
              'Sum the set bits: $64 + 8 = 72$.',
              'Now, regroup in fours: $0100\\;1000$ \u2014 two complete blocks, no padding needed.',
              'Translate: $0100_2 = 4$ and $1000_2 = 8$, giving $48_{16}$.',
              'Check the hex reading: $4 \\times 16 + 8 = 72$.',
              'Hence $01001000_2 = 72 = 48_{16}$ \u2014 and notice the party trick: the hex dress 48 names the value 72, not forty-eight.',
            ],
            answer: '01001000 = 72 in decimal = 48 in base 16 (4 x 16 + 8).',
          },
          {
            q: 'The witness\u2019s byte $0010\\,1101$ must be shown in OCTAL. Explain exactly what padding is needed and why, then give the octal dress and its value.',
            solution: [
              'Take the byte $0010\\,1101$ \u2014 eight bits, and eight is NOT a multiple of three.',
              'So, pad leading zeros until the length divides by three: one zero gives nine bits, $000\\;101\\;101$.',
              'Translate each block: $000_2 = 0$, $101_2 = 5$ and $101_2 = 5$, giving $055_8$.',
              'Now, the leading zero names nothing and vanishes: the octal dress is $55_8$.',
              'Check: $5 \\times 8 + 5 = 45$ \u2014 the witness, as it must be.',
              'Hence the byte regroups as $000\\;101\\;101 = 055_8 = 55_8 = 45$ \u2014 one borrowed zero, because 8 is a multiple of 4 but not of 3.',
            ],
            answer: 'Pad one leading zero, regroup as 000 101 101, read 055 in base 8, which is 55 = 45.',
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'Exam-style (an original item in the examination idiom, not a real past-paper question). Prove that one byte is exactly two hexadecimal digits, state the number of values the byte spans, and explain why octal does not fit bytes as neatly.',
            solution: [
              'Take the two facts of the lesson: $2^4 = 16$, so one hex digit spans exactly 4 bits; and a byte is 8 bits.',
              'Stack the digits: two hex digits cover $4 + 4 = 8$ bits \u2014 exactly one byte, with no remainder.',
              'Count the values: $16^2 = (2^4)^2 = 2^8 = 256$ \u2014 the byte census, from $00_{16}$ through $FF_{16}$.',
              'Now, octal: one octal digit spans $2^3 = 8$ values, that is, exactly 3 bits, but 8 bits divided by 3 leaves a remainder of 2 \u2014 so an 8-bit pattern regrouped in threes must borrow a leading zero.',
              'Hence one byte is exactly two hex digits spanning $16^2 = 2^8 = 256$ values, while octal fits bytes poorly because 8 is a multiple of 4 but not of 3. (The proof strip draws the chain.)',
            ],
            answer: 'One byte = 8 bits = exactly 2 hex digits; 16^2 = 2^8 = 256 values; octal needs a borrowed zero because 8 is not a multiple of 3.',
            figures: [
              { caption: 'The byte-law proof strip: 16 = 2^4 makes one hex digit 4 bits; two digits make 8 bits, one byte; 16^2 = 2^8 = 256 values, 0 through 255.', svg: cf32ByteProofStripSvg() },
            ],
          },
          {
            q: 'How many values can five hexadecimal digits name? Give the largest, in both decimal and hex, and decide whether every six-digit decimal number fits inside a five-hex-digit dress.',
            solution: [
              'Take five hex digits and the range law: together they name $16^5$ values.',
              'Compute: $16^5 = 2^{20} = 1{,}048{,}576$ values \u2014 twenty bits\u2019 worth of naming power.',
              'Now, the largest: one short of the census, $16^5 - 1 = 1{,}048{,}575$, worn by the all-$F$ numeral $FFFFF_{16}$.',
              'Take the decimal side: six decimal digits reach at most $999{,}999$.',
              'Compare: $999{,}999 \\le 1{,}048{,}575$ \u2014 so yes, every six-digit decimal number fits inside five hex digits, with room to spare.',
              'Hence 5 hex digits name $1{,}048{,}576$ values with largest $FFFFF_{16} = 1{,}048{,}575$, and $999{,}999$ fits inside.',
            ],
            answer: 'Five hex digits name 16^5 = 1,048,576 values; largest FFFFF = 1,048,575; 999,999 fits inside.',
          },
          {
            q: 'Exam-style (an original item in the examination idiom, not a real past-paper question). For each of the values 8, 15 and 16, give the binary, octal and hexadecimal dresses; then name the smallest value whose hex dress is a letter, and give the letter.',
            solution: [
              'Take the counting strip\u2019s milestones and read the columns.',
              'For 8: binary $1000$ (the first four-bit numeral), octal $10_8$ (the first two-digit octal numeral), hex $8$.',
              'For 15: binary $1111$, octal $17_8$, hex $F_{16}$ \u2014 the largest hex digit.',
              'For 16: binary $10000$ (the first five-bit numeral), octal $20_8$, hex $10_{16}$ \u2014 the landmark $\\text{0x}10 = 16$.',
              'Now, the first letter: the hex digits run out at 9, so $10_{10}$ wears the first letter \u2014 $A_{16}$, with binary $1010$ and octal $12_8$.',
              'Hence 8 = $1000_2$ = $10_8$ = $8_{16}$; 15 = $1111_2$ = $17_8$ = $F_{16}$; 16 = $10000_2$ = $20_8$ = $10_{16}$; and the first hex letter is $A_{16}$, naming 10.',
            ],
            answer: '8 = 1000 = 10 octal = 8 hex; 15 = 1111 = 17 octal = F; 16 = 10000 = 20 octal = 10 hex; first letter A at 10.',
          },
        ],
      },
    ] },
  ],
}
