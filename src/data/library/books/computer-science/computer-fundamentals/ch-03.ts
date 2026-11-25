import type { Chapter, Lesson } from '../../../types'

/**
 * Computer Fundamentals — chapter 3 "Data Representation: a First
 * Meeting" (OPENED by the CS RUN 5 whole-chapter swarm, 2026-11-25:
 * lessons 3.2, 3.6 and 3.7 delivered whole by the authoring agents —
 * engines 134/134, 121/121 and 131/131 green, 9,389 / 9,502 / 9,777
 * words; the ~2-hour run cap arrived with seats 3.1, 3.3, 3.4, 3.5,
 * 3.8 and the 3.R review unauthored after two agent rounds against
 * the platform's subagent-deadline wall, so per the protocol's
 * time-budget law the completed lessons SHIP and the remainder RIDES
 * CS RUN 6 — never thinned, never half-gated. The nine specs, the
 * orchestrator's 112/112 pre-flight pin checker and the five landed
 * green engines for the deferred seats are preserved TRACKED in
 * docs/research/cf-ch03-wip/ — five of the six deferred seats are
 * prose-only resumptions.)
 *
 * PROVENANCE: ground = the sanctioned internet fallback (the Drive
 * holds no Computer Fundamentals source — the standing honest note in
 * docs/research/CS_TOC_SURVEY.md): the web-verified canonical arcs
 * banked at planning and this run's 2026-11-25 verification of every
 * pinned date/number (citation key `cs-cf-web-ground`,
 * docs/project/SOURCE_LOG.md). STUDY-NEVER-REPRODUCE absolute: every
 * roster, witness, figure, Illustration, quiz item and exercise below
 * is OUR OWN, engine-pinned in scripts/verify-cs-book2-ch03.ts (which
 * re-runs the three verify-first harnesses against THIS file and
 * closes with the in-progress chapter census).
 */
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
const c36 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f36 = 'ui-sans-serif, system-ui, sans-serif'

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
  s.push(`<g font-family="${f36}">`)
  s.push(cf36Txt(W / 2, 34, 12.5, c36.teal, cfg.title, 'bold'))
  s.push(cf36Txt(W / 2, 54, 10, c36.tealInk, cfg.subtitle))
  s.push(cf36Txt(rowX + rowW / 2, 70, 10, c36.tealInk, 'divide by ' + cfg.base))
  s.push(cf36Txt(badgeCx, 70, 10, c36.tealInk, 'remainders'))
  // the rows: dividend ÷ base = quotient, with the remainder in its own column
  cfg.rows.forEach((rw, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="${rowX}" y="${by}" width="${rowW}" height="${rowH}" rx="10" fill="${c36.white}" stroke="${c36.struct}" stroke-width="2"/>`)
    s.push(cf36Txt(rowX + rowW / 2, cy + 5, 14.5, c36.ink, `${rw.n} ÷ ${cfg.base} = ${rw.q}`))
    s.push(`<circle cx="${badgeCx}" cy="${cy}" r="${badgeR}" fill="${rw.r === 0 ? c36.white : c36.panelA}" stroke="${rw.r === 0 ? c36.teal : c36.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(badgeCx, cy + 5.5, 15, c36.ink, cf36Digit(rw.r), 'bold'))
    if (k < n - 1) {
      // the quotient flows down to become the next dividend
      const ax = rowX + rowW / 2
      const y1 = by + rowH + 1.5
      const y2 = by + rowH + gap - 1.5
      s.push(`<line x1="${ax}" y1="${y1}" x2="${ax}" y2="${y2 - 5}" stroke="${c36.mid}" stroke-width="1.8"/>`)
      s.push(`<polygon points="${ax},${y2} ${ax - 4.5},${y2 - 6} ${ax + 4.5},${y2 - 6}" fill="${c36.mid}"/>`)
    }
  })
  // the bottom-up read arrow beside the remainder column
  s.push(`<line x1="${arrowX}" y1="${lastCy}" x2="${arrowX}" y2="${firstCy - 12}" stroke="${c36.conn}" stroke-width="2.5"/>`)
  s.push(`<polygon points="${arrowX},${firstCy - 22} ${arrowX - 6},${firstCy - 10} ${arrowX + 6},${firstCy - 10}" fill="${c36.conn}"/>`)
  const midY = (firstCy + lastCy) / 2
  s.push(`<text x="${labelX}" y="${midY}" transform="rotate(-90 ${labelX} ${midY})" text-anchor="middle" font-size="10" fill="${c36.tealInk}">read bottom-up</text>`)
  // the answer box
  s.push(`<rect x="${ansX}" y="${topY}" width="${ansW}" height="60" rx="12" fill="${c36.panelB}" stroke="${c36.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(ansX + ansW / 2, topY + 22, 10, c36.tealInk, cfg.answerLabel))
  s.push(cf36Txt(ansX + ansW / 2, topY + 46, 19, c36.ink, cfg.answer, 'bold'))
  // the check strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c36.paper}" stroke="${c36.faint}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 23, 11, c36.ink, cfg.check))
  s.push(cf36Txt(W / 2, stripY + 43, 10, c36.tealInk, cfg.note))
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
  s.push(`<g font-family="${f36}">`)
  s.push(cf36Txt(W / 2, 32, 12.5, c36.teal, cfg.title, 'bold'))
  cfg.steps.forEach((st, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="${fracX}" y="${by}" width="${fracW}" height="${rowH}" rx="10" fill="${c36.white}" stroke="${c36.struct}" stroke-width="2"/>`)
    s.push(cf36Txt(fracX + fracW / 2, cy + 5, 14, c36.ink, st.before, 'bold'))
    s.push(`<line x1="150" y1="${cy}" x2="204" y2="${cy}" stroke="${c36.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="210,${cy} 200,${cy - 5} 200,${cy + 5}" fill="${c36.conn}"/>`)
    s.push(cf36Txt(177, cy - 9, 11, c36.tealInk, 'x 2'))
    s.push(`<rect x="${prodX}" y="${by}" width="${prodW}" height="${rowH}" rx="10" fill="${c36.white}" stroke="${c36.struct}" stroke-width="2"/>`)
    s.push(cf36Txt(prodX + prodW / 2, cy + 5, 14, c36.ink, st.product))
    s.push(`<line x1="370" y1="${cy}" x2="424" y2="${cy}" stroke="${c36.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="430,${cy} 420,${cy - 5} 420,${cy + 5}" fill="${c36.conn}"/>`)
    s.push(cf36Txt(397, cy - 9, 9.5, c36.tealInk, 'integer part'))
    s.push(`<rect x="${slotX}" y="${by}" width="${slotW}" height="${rowH}" rx="8" fill="${st.bit === 1 ? c36.panelA : c36.white}" stroke="${st.bit === 1 ? c36.accent : c36.teal}" stroke-width="2"/>`)
    s.push(cf36Txt(slotX + slotW / 2, cy + 6.5, 18, c36.ink, String(st.bit), 'bold'))
    if (k < n - 1) {
      // the kept fraction part flows down into the next row
      const prodCx = prodX + prodW / 2
      const fracCx = fracX + fracW / 2
      const midY = by + rowH + gap / 2
      s.push(`<polyline points="${prodCx},${by + rowH + 1.5} ${prodCx},${midY} ${fracCx},${midY} ${fracCx},${by + rowH + gap - 6.5}" fill="none" stroke="${c36.teal}" stroke-width="1.8" stroke-dasharray="5 4"/>`)
      s.push(`<polygon points="${fracCx},${by + rowH + gap - 1.5} ${fracCx - 4.5},${by + rowH + gap - 8} ${fracCx + 4.5},${by + rowH + gap - 8}" fill="${c36.teal}"/>`)
      if (k === 0) s.push(cf36Txt((prodCx + fracCx) / 2, midY - 7, 9.5, c36.tealInk, 'keep the fraction part'))
    }
  })
  // the read-down arrow beside the bit slots
  s.push(`<line x1="${downX}" y1="${firstCy}" x2="${downX}" y2="${lastCy + 12}" stroke="${c36.conn}" stroke-width="2.5"/>`)
  s.push(`<polygon points="${downX},${lastCy + 22} ${downX - 6},${lastCy + 10} ${downX + 6},${lastCy + 10}" fill="${c36.conn}"/>`)
  const midY = (firstCy + lastCy) / 2
  s.push(`<text x="${downLabelX}" y="${midY}" transform="rotate(-90 ${downLabelX} ${midY})" text-anchor="middle" font-size="10" fill="${c36.tealInk}">read DOWN</text>`)
  // the answer strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c36.panelB}" stroke="${c36.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 23, 12, c36.ink, cfg.answerLine, 'bold'))
  s.push(cf36Txt(W / 2, stripY + 43, 10, c36.tealInk, cfg.checkLine))
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
  s.push(`<g font-family="${f36}">`)
  s.push(cf36Txt(W / 2, 34, 12.5, c36.teal, cfg.title, 'bold'))
  // the place-value cells, each with its mark
  cfg.places.forEach((p, k) => {
    const cx = x0 + k * (cellW + cellGap)
    const on = cfg.marks[k] === 1
    s.push(`<rect x="${cx}" y="${gridY}" width="${cellW}" height="${cellH}" rx="8" fill="${on ? c36.panelA : c36.white}" stroke="${on ? c36.accent : c36.teal}" stroke-width="2"/>`)
    s.push(cf36Txt(cx + cellW / 2, gridY + 22, 12, c36.ink, String(p), 'bold'))
    s.push(cf36Txt(cx + cellW / 2, gridY + 45, 15, on ? c36.accent : c36.tealInk, String(cfg.marks[k]), 'bold'))
  })
  s.push(cf36Txt(W / 2, gridY + cellH + 18, 10, c36.tealInk, 'place values on top, the mark each place earns below - a 1 when the power is subtracted, a 0 when it does not fit'))
  // the subtraction trail, two columns
  const colX = [110, 410]
  cfg.trail.forEach((t, k) => {
    const col = Math.floor(k / trailRows)
    const row = k % trailRows
    const isFit = !t.includes('not')
    s.push(`<text x="${colX[col]}" y="${trailY0 + row * trailStep}" font-size="11" fill="${isFit ? c36.ink : c36.tealInk}">${t}</text>`)
  })
  // the answer strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c36.panelB}" stroke="${c36.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 30, 12.5, c36.ink, cfg.answerLine, 'bold'))
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
  s.push(`<g font-family="${f36}">`)
  s.push(cf36Txt(W / 2, 30, 13, c36.teal, 'one number, two roads: 100 into base 2', 'bold'))
  // LEFT PANEL — the division ladder
  s.push(`<rect x="${M}" y="${panelY}" width="344" height="${panelH}" rx="14" fill="${c36.white}" stroke="${c36.struct}" stroke-width="2"/>`)
  s.push(cf36Txt(M + 172, 76, 11.5, c36.teal, 'road 1 - the division ladder', 'bold'))
  rows.forEach((rw, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="36" y="${by}" width="250" height="${rowH}" rx="7" fill="${c36.paper}" stroke="${c36.faint}" stroke-width="1.5"/>`)
    s.push(cf36Txt(161, cy + 4, 11.5, c36.ink, `${rw.n} ÷ 2 = ${rw.q}`))
    s.push(`<circle cx="316" cy="${cy}" r="12" fill="${rw.r === 0 ? c36.white : c36.panelA}" stroke="${rw.r === 0 ? c36.teal : c36.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(316, cy + 4, 11, c36.ink, String(rw.r), 'bold'))
  })
  const lFirst = topY + rowH / 2
  const lLast = topY + span - rowH / 2
  s.push(`<line x1="344" y1="${lLast}" x2="344" y2="${lFirst - 8}" stroke="${c36.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="344,${lFirst - 15} 340,${lFirst - 6} 348,${lFirst - 6}" fill="${c36.conn}"/>`)
  s.push(cf36Txt(M + 172, topY + span + 26, 10, c36.tealInk, 'remainders read bottom-up:  1 1 0 0 1 0 0'))
  // RIGHT PANEL — the powers table
  s.push(`<rect x="396" y="${panelY}" width="344" height="${panelH}" rx="14" fill="${c36.white}" stroke="${c36.teal}" stroke-width="2"/>`)
  s.push(cf36Txt(568, 76, 11.5, c36.teal, 'road 2 - the powers table', 'bold'))
  places.forEach((pl, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    const on = pl.m === '1'
    s.push(`<rect x="410" y="${by}" width="64" height="${rowH}" rx="7" fill="${on ? c36.panelA : c36.white}" stroke="${on ? c36.accent : c36.teal}" stroke-width="1.8"/>`)
    s.push(cf36Txt(442, cy + 4, 12, c36.ink, pl.p, 'bold'))
    s.push(cf36Txt(572, cy + 4, 11, on ? c36.ink : c36.tealInk, pl.t, 'normal', 'middle'))
    s.push(`<rect x="668" y="${by}" width="44" height="${rowH}" rx="7" fill="${on ? c36.panelA : c36.white}" stroke="${on ? c36.accent : c36.teal}" stroke-width="1.8"/>`)
    s.push(cf36Txt(690, cy + 4.5, 13, on ? c36.accent : c36.tealInk, pl.m, 'bold'))
  })
  s.push(cf36Txt(568, topY + span + 26, 10, c36.tealInk, 'marks read left to right:  1 1 0 0 1 0 0'))
  // the meeting arrows + box
  const meetTop = meetY
  s.push(`<line x1="192" y1="${panelY + panelH + 2}" x2="290" y2="${meetTop - 6}" stroke="${c36.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="296,${meetTop - 2} 284,${meetTop - 4} 288,${meetTop - 12}" fill="${c36.conn}"/>`)
  s.push(`<line x1="568" y1="${panelY + panelH + 2}" x2="470" y2="${meetTop - 6}" stroke="${c36.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="464,${meetTop - 2} 476,${meetTop - 4} 472,${meetTop - 12}" fill="${c36.conn}"/>`)
  s.push(`<rect x="230" y="${meetY}" width="300" height="${meetH}" rx="12" fill="${c36.panelB}" stroke="${c36.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(380, meetY + 31, 13, c36.ink, 'both roads meet: 100 = 1100100', 'bold'))
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
  s.push(`<g font-family="${f36}">`)
  s.push(cf36Txt(W / 2, 32, 13, c36.teal, 'the roll-over: 11111111 + 1 = 100000000', 'bold'))
  s.push(cf36Txt(W / 2, 52, 10.5, c36.tealInk, 'eight wheels all at 1 hold 255 - one more click spills into a ninth wheel'))
  // the carry ripple, dashed, right to left, above the wheels
  s.push(cf36Txt(W / 2, 66, 9.5, c36.tealInk, 'the carry ripples right to left, turning every 1 into a 0'))
  s.push(`<line x1="${x1 + w1}" y1="74" x2="${x1 + 14}" y2="74" stroke="${c36.conn}" stroke-width="2" stroke-dasharray="7 5"/>`)
  s.push(`<polygon points="${x1 + 4},74 ${x1 + 16},69 ${x1 + 16},79" fill="${c36.conn}"/>`)
  // row 1: eight wheels of 1
  for (let k = 0; k < n1; k++) {
    const wx = x1 + k * (ww + wgap)
    s.push(`<rect x="${wx}" y="${row1Y}" width="${ww}" height="${wh}" rx="8" fill="${c36.panelA}" stroke="${c36.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(wx + ww / 2, row1Y + wh / 2 + 6, 18, c36.ink, '1', 'bold'))
  }
  // the +1 badge
  s.push(`<circle cx="${x1 + w1 + 36}" cy="${row1Y + wh / 2}" r="20" fill="${c36.white}" stroke="${c36.conn}" stroke-width="2"/>`)
  s.push(cf36Txt(x1 + w1 + 36, row1Y + wh / 2 + 5, 13, c36.ink, '+1', 'bold'))
  s.push(cf36Txt(x1 + w1 + 36, row1Y - 8, 9.5, c36.tealInk, 'add one'))
  // the equals sign
  s.push(cf36Txt(380, 160, 22, c36.ink, '=', 'bold'))
  // row 2: nine wheels, leading 1 then zeros
  for (let k = 0; k < n2; k++) {
    const wx = x2 + k * (ww + wgap)
    const lead = k === 0
    s.push(`<rect x="${wx}" y="${row2Y}" width="${ww}" height="${wh}" rx="8" fill="${lead ? c36.panelB : c36.white}" stroke="${lead ? c36.mid : c36.teal}" stroke-width="2"/>`)
    s.push(cf36Txt(wx + ww / 2, row2Y + wh / 2 + 6, 18, c36.ink, lead ? '1' : '0', lead ? 'bold' : 'normal'))
  }
  s.push(cf36Txt(x2 + w2 + 30, row2Y + 24, 10.5, c36.tealInk, 'the ninth wheel lights up:', 'bold', 'start'))
  s.push(cf36Txt(x2 + w2 + 30, row2Y + 42, 10.5, c36.tealInk, '256 - the first 9-bit value,', 'normal', 'start'))
  s.push(cf36Txt(x2 + w2 + 30, row2Y + 60, 10.5, c36.tealInk, 'too big for eight wheels', 'normal', 'start'))
  // the summary strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c36.paper}" stroke="${c36.faint}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 27, 12, c36.ink, 'largest 8-bit value: 2^8 - 1 = 255 = 11111111'))
  s.push(cf36Txt(W / 2, stripY + 50, 10, c36.tealInk, 'and 256 = 2^8 needs NINE bits - the odometer rolls over exactly as 999 + 1 rolls a three-digit odometer to 1000'))
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
  s.push(`<g font-family="${f36}">`)
  s.push(cf36Txt(W / 2, 32, 13, c36.teal, 'the same machine, two other dresses: 2026', 'bold'))
  // LEFT PANEL — divide by 8
  s.push(`<rect x="${M}" y="${panelY}" width="352" height="${panelH}" rx="14" fill="${c36.white}" stroke="${c36.struct}" stroke-width="2"/>`)
  s.push(cf36Txt(M + 176, 76, 11.5, c36.teal, 'divide by 8 (base 8)', 'bold'))
  rows8.forEach((rw, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="32" y="${by}" width="250" height="${rowH}" rx="7" fill="${c36.paper}" stroke="${c36.faint}" stroke-width="1.5"/>`)
    s.push(cf36Txt(157, cy + 4.5, 12, c36.ink, `${rw.n} ÷ 8 = ${rw.q}`))
    s.push(`<circle cx="312" cy="${cy}" r="14" fill="${c36.panelA}" stroke="${c36.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(312, cy + 4.5, 12, c36.ink, String(rw.r), 'bold'))
  })
  const a8First = topY + rowH / 2
  const a8Last = topY + 4 * rowH + 3 * gap - rowH / 2
  s.push(`<line x1="344" y1="${a8Last}" x2="344" y2="${a8First - 8}" stroke="${c36.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="344,${a8First - 15} 340,${a8First - 6} 348,${a8First - 6}" fill="${c36.conn}"/>`)
  s.push(cf36Txt(M + 176, panelY + panelH - 14, 11.5, c36.ink, 'read up:  3 7 5 2  →  2026 = 3752 in base 8', 'bold'))
  // RIGHT PANEL — divide by 16
  s.push(`<rect x="388" y="${panelY}" width="352" height="${panelH}" rx="14" fill="${c36.white}" stroke="${c36.teal}" stroke-width="2"/>`)
  s.push(cf36Txt(564, 76, 11.5, c36.teal, 'divide by 16 (base 16)', 'bold'))
  rows16.forEach((rw, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="400" y="${by}" width="250" height="${rowH}" rx="7" fill="${c36.paper}" stroke="${c36.faint}" stroke-width="1.5"/>`)
    s.push(cf36Txt(525, cy + 4.5, 12, c36.ink, `${rw.n} ÷ 16 = ${rw.q}`))
    s.push(`<circle cx="680" cy="${cy}" r="14" fill="${c36.panelA}" stroke="${c36.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(680, cy + 4.5, 12, c36.ink, cf36Digit(rw.r), 'bold'))
  })
  const a16First = topY + rowH / 2
  const a16Last = topY + 3 * rowH + 2 * gap - rowH / 2
  s.push(`<line x1="712" y1="${a16Last}" x2="712" y2="${a16First - 8}" stroke="${c36.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="712,${a16First - 15} 708,${a16First - 6} 716,${a16First - 6}" fill="${c36.conn}"/>`)
  s.push(cf36Txt(564, panelY + panelH - 14, 11.5, c36.ink, 'read up:  7 E A  →  2026 = 7EA in base 16', 'bold'))
  // the check strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c36.paper}" stroke="${c36.faint}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 24, 11.5, c36.ink, 'check 7EA:  7x256 + 14x16 + 10 = 1792 + 224 + 10 = 2026'))
  s.push(cf36Txt(W / 2, stripY + 44, 10.5, c36.tealInk, 'check 3752:  3x512 + 7x64 + 5x8 + 2 = 1536 + 448 + 40 + 2 = 2026'))
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
  s.push(`<g font-family="${f36}">`)
  s.push(cf36Txt(W / 2, 32, 13, c36.teal, 'the ladder that never ends: 0.1 in base 2', 'bold'))
  s.push(cf36Txt(34, bitsY + bh / 2 + 6, 16, c36.ink, '0.', 'bold'))
  bits.forEach((b, k) => {
    const bx = px + k * (bw + bgap)
    const inBlock = k >= 1
    s.push(`<rect x="${bx}" y="${bitsY}" width="${bw}" height="${bh}" rx="6" fill="${inBlock ? c36.panelA : c36.white}" stroke="${inBlock ? c36.accent : c36.teal}" stroke-width="2"/>`)
    s.push(cf36Txt(bx + bw / 2, bitsY + bh / 2 + 6.5, 16, c36.ink, b, 'bold'))
  })
  // the ellipsis after the boxes
  const ellX = px + bitsW + 10
  s.push(cf36Txt(ellX + 20, bitsY + bh / 2 + 7, 18, c36.tealInk, '. . .', 'bold'))
  // the bracket over the repeating blocks (bits 1..12)
  const bStart = px + bw
  const bEnd = px + bitsW
  s.push(`<line x1="${bStart}" y1="${brackY - 6}" x2="${bEnd}" y2="${brackY - 6}" stroke="${c36.accent}" stroke-width="2"/>`)
  s.push(`<line x1="${bStart}" y1="${brackY - 12}" x2="${bStart}" y2="${brackY - 2}" stroke="${c36.accent}" stroke-width="2"/>`)
  s.push(`<line x1="${bEnd}" y1="${brackY - 12}" x2="${bEnd}" y2="${brackY - 2}" stroke="${c36.accent}" stroke-width="2"/>`)
  s.push(cf36Txt((bStart + bEnd) / 2, brackY + 10, 10.5, c36.tealInk, 'the block 0011 repeats forever'))
  s.push(cf36Txt(px + bw / 2, brackY + 10, 9.5, c36.tealInk, 'one bit', 'normal'))
  // the state loop: 0.1 -> 0.2 -> 0.4 -> 0.8 -> 0.6 -> back to 0.2
  states.forEach((st, k) => {
    const bx = lx0 + k * (boxW + boxGap)
    const cx = bx + boxW / 2
    s.push(`<rect x="${bx}" y="${loopY}" width="${boxW}" height="${boxH}" rx="9" fill="${c36.white}" stroke="${c36.struct}" stroke-width="2"/>`)
    s.push(cf36Txt(cx, loopY + boxH / 2 + 4.5, 12.5, c36.ink, st, 'bold'))
    if (k < ns - 1) {
      const ax1 = bx + boxW + 3
      const ax2 = bx + boxW + boxGap - 3
      const cy = loopY + boxH / 2
      s.push(`<line x1="${ax1}" y1="${cy}" x2="${ax2 - 5}" y2="${cy}" stroke="${c36.conn}" stroke-width="2"/>`)
      s.push(`<polygon points="${ax2},${cy} ${ax2 - 6},${cy - 4.5} ${ax2 - 6},${cy + 4.5}" fill="${c36.conn}"/>`)
      s.push(cf36Txt((ax1 + ax2) / 2, cy - 8, 9.5, c36.tealInk, 'x 2'))
    }
  })
  // the dashed return path from 0.6 back to 0.2
  const fromCx = lx0 + 4 * (boxW + boxGap) + boxW / 2
  const toCx = lx0 + 1 * (boxW + boxGap) + boxW / 2
  const retY = loopY + boxH + 26
  s.push(`<polyline points="${fromCx},${loopY + boxH + 2} ${fromCx},${retY} ${toCx},${retY} ${toCx},${loopY + boxH + 8}" fill="none" stroke="${c36.warn}" stroke-width="2" stroke-dasharray="7 5"/>`)
  s.push(`<polygon points="${toCx},${loopY + boxH + 2} ${toCx - 5},${loopY + boxH + 12} ${toCx + 5},${loopY + boxH + 12}" fill="${c36.warn}"/>`)
  s.push(cf36Txt((fromCx + toCx) / 2, retY - 8, 10, c36.warn, 'the fraction part returns to 0.2 - the loop closes, the ladder runs forever'))
  // the summary strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c36.panelB}" stroke="${c36.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 24, 11.5, c36.ink, '0.1 = 0.0001100110011... - the block 0011 repeats forever; it never terminates'))
  s.push(cf36Txt(W / 2, stripY + 44, 10, c36.tealInk, 'this is why 0.1 + 0.2 comes out as 0.30000000000000004 in every programming language'))
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
  s.push(`<g font-family="${f36}">`)
  s.push(cf36Txt(W / 2, 30, 12.5, c36.teal, 'the same machine for bases 8 and 16: 77 and 156', 'bold'))
  panels.forEach((p) => {
    const b = baseOf(p.title)
    s.push(`<rect x="${p.x}" y="${p.y}" width="${panelW}" height="${panelH}" rx="12" fill="${c36.white}" stroke="${c36.struct}" stroke-width="2"/>`)
    s.push(cf36Txt(p.x + panelW / 2, p.y + 20, 11, c36.teal, p.title, 'bold'))
    p.rows.forEach((rw, k) => {
      const by = topY + k * (rowH + gap)
      const cy = by + rowH / 2
      s.push(`<rect x="${p.x + 12}" y="${by}" width="240" height="${rowH}" rx="6" fill="${c36.paper}" stroke="${c36.faint}" stroke-width="1.5"/>`)
      s.push(cf36Txt(p.x + 132, cy + 4, 11, c36.ink, `${rw.n} ÷ ${b} = ${rw.q}`))
      s.push(`<circle cx="${p.x + 288}" cy="${cy}" r="11" fill="${c36.panelA}" stroke="${c36.accent}" stroke-width="2"/>`)
      s.push(cf36Txt(p.x + 288, cy + 4, 11, c36.ink, cf36Digit(rw.r), 'bold'))
    })
    const first = topY + rowH / 2
    const last = topY + p.rows.length * rowH + (p.rows.length - 1) * gap - rowH / 2
    const ax = p.x + 322
    s.push(`<line x1="${ax}" y1="${last}" x2="${ax}" y2="${first - 7}" stroke="${c36.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="${ax},${first - 13} ${ax - 4},${first - 5} ${ax + 4},${first - 5}" fill="${c36.conn}"/>`)
    s.push(cf36Txt(p.x + panelW / 2, p.y + panelH - 12, 11.5, c36.ink, p.ans, 'bold'))
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
  s.push(`<g font-family="${f36}">`)
  s.push(cf36Txt(W / 2, 32, 13, c36.teal, 'a mixed number: split it first - 3.625 = 3 + 0.625', 'bold'))
  // LEFT — whole part ladder for 3
  s.push(`<rect x="${M}" y="${panelY}" width="352" height="${panelH}" rx="14" fill="${c36.white}" stroke="${c36.struct}" stroke-width="2"/>`)
  s.push(cf36Txt(M + 176, 76, 11.5, c36.teal, 'the whole part: 3 (divide by 2, read up)', 'bold'))
  const wholeRows = [{ n: 3, q: 1, r: 1 }, { n: 1, q: 0, r: 1 }]
  wholeRows.forEach((rw, k) => {
    const by = 88 + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="34" y="${by}" width="230" height="${rowH}" rx="7" fill="${c36.paper}" stroke="${c36.faint}" stroke-width="1.5"/>`)
    s.push(cf36Txt(149, cy + 4.5, 12, c36.ink, `${rw.n} ÷ 2 = ${rw.q}`))
    s.push(`<circle cx="296" cy="${cy}" r="13" fill="${c36.panelA}" stroke="${c36.accent}" stroke-width="2"/>`)
    s.push(cf36Txt(296, cy + 4.5, 12, c36.ink, String(rw.r), 'bold'))
  })
  s.push(`<line x1="330" y1="152" x2="330" y2="112" stroke="${c36.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="330,104 326,114 334,114" fill="${c36.conn}"/>`)
  s.push(cf36Txt(M + 176, panelY + panelH - 14, 11.5, c36.ink, 'read up:  3 = 11 in base 2', 'bold'))
  // RIGHT — fraction ladder for 0.625
  s.push(`<rect x="388" y="${panelY}" width="352" height="${panelH}" rx="14" fill="${c36.white}" stroke="${c36.teal}" stroke-width="2"/>`)
  s.push(cf36Txt(564, 76, 11.5, c36.teal, 'the fraction part: 0.625 (x 2, read down)', 'bold'))
  const fracRows = [
    { t: '0.625 x 2 = 1.25', bit: 1 }, { t: '0.25 x 2 = 0.5', bit: 0 }, { t: '0.5 x 2 = 1.0', bit: 1 },
  ]
  fracRows.forEach((rw, k) => {
    const by = 88 + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(`<rect x="402" y="${by}" width="230" height="${rowH}" rx="7" fill="${c36.paper}" stroke="${c36.faint}" stroke-width="1.5"/>`)
    s.push(cf36Txt(517, cy + 4.5, 12, c36.ink, rw.t))
    s.push(`<rect x="664" y="${by}" width="44" height="${rowH}" rx="7" fill="${rw.bit === 1 ? c36.panelA : c36.white}" stroke="${rw.bit === 1 ? c36.accent : c36.teal}" stroke-width="2"/>`)
    s.push(cf36Txt(686, cy + 4.5, 13, c36.ink, String(rw.bit), 'bold'))
  })
  s.push(`<line x1="648" y1="98" x2="648" y2="180" stroke="${c36.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="648,190 642,178 654,178" fill="${c36.conn}"/>`)
  s.push(cf36Txt(564, panelY + panelH - 14, 11.5, c36.ink, 'read down:  0.625 = 0.101 in base 2', 'bold'))
  // the joining strip
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c36.panelB}" stroke="${c36.mid}" stroke-width="2"/>`)
  s.push(cf36Txt(W / 2, stripY + 24, 12.5, c36.ink, 'join with a point:  3.625 = 11.101 in base 2', 'bold'))
  s.push(cf36Txt(W / 2, stripY + 44, 10, c36.tealInk, 'check:  2 + 1 + 0.5 + 0.125 = 3.625'))
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

/**
 * Computer Fundamentals — chapter 3, lesson 3.7
 * 'Binary to Decimal Conversion' (the cf37 seat of the CS RUN 5 swarm,
 * 2026-11-25). Direction TWO of the conversion craft: the machine hands
 * you a pattern — binary, octal, hex — and this lesson teaches the three
 * roads back to the decimal number a human needs: the weight sum, the
 * doubling (Horner) ladder and the grouped read, then the fraction
 * mirror and the popcount census instinct.
 *
 * PROVENANCE: ground = the sanctioned internet fallback (citation key
 * `cs-cf-web-ground`, docs/project/SOURCE_LOG.md); every roster, figure,
 * Illustration, quiz item and exercise below is OUR OWN
 * (study-never-reproduce). All pinned numbers are engine-verified green
 * by docs/research/cf-ch03-wip/v-cf37.ts before this prose shipped.
 */

/* palette (vivid set; never blue/indigo) — prefixed 37 for the swarm concat */
const C37 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const FONT37 = 'ui-sans-serif, system-ui, sans-serif'

/* ------------------------------------------------------------------ */
/* SVG fragment helpers (all geometry computed, never eyeballed)        */
/* ------------------------------------------------------------------ */
function cf37Open(w: number, h: number, label: string): string[] {
  return [
    `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" font-family="${FONT37}">`,
  ]
}
function cf37ArrowTo(x1: number, y1: number, x2: number, y2: number): string {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  const bx = x2 - ux * 10
  const by = y2 - uy * 10
  const px = -uy
  const py = ux
  const r = (n: number) => Math.round(n * 10) / 10
  return (
    `<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(bx)}" y2="${r(by)}" stroke="${C37.conn}" stroke-width="2"/>` +
    `<polygon points="${r(x2)},${r(y2)} ${r(bx + px * 5)},${r(by + py * 5)} ${r(bx - px * 5)},${r(by - py * 5)}" fill="${C37.conn}"/>`
  )
}
function cf37Brace(x1: number, x2: number, y: number): string {
  const w = x2 - x1
  const inset = Math.min(14, w / 3)
  return (
    `<path d="M ${x1} ${y} C ${x1} ${y + 9} ${x1 + 3} ${y + 12} ${x1 + inset} ${y + 12} ` +
    `L ${x2 - inset} ${y + 12} C ${x2 - 3} ${y + 12} ${x2} ${y + 9} ${x2} ${y}" ` +
    `fill="none" stroke="${C37.conn}" stroke-width="2"/>`
  )
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 1 — the weight-sum grid for the 2026 witness            */
/* ------------------------------------------------------------------ */
function cf37F1WeightGridSvg(): string {
  const bits = '11111101010'
  const n = bits.length
  const cw = 56
  const gap = 8
  const total = n * cw + (n - 1) * gap
  const W = 760
  const x0 = Math.round((W - total) / 2)
  const weightY = 58
  const cellY = 70
  const ch = 54
  const contribY = cellY + ch + 22
  const stripY = contribY + 20
  const stripH = 52
  const noteY = stripY + stripH + 20
  const H = 252
  const s = cf37Open(
    W,
    H,
    'The weight-sum grid for the binary numeral 11111101010. Eleven columns carry the place values 1024 down to 1 above the digits. The eight cells whose digits are 1 are highlighted in orange, and the contributions 1024, 512, 256, 128, 64, 32, 8 and 2 are written beneath them. A strip sums the chosen powers to 2026. The three cells whose digits are 0 stay plain and add nothing. A note records eleven bits with eight ones, a popcount of 8.',
  )
  s.push(`<text x="${W / 2}" y="30" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${C37.teal}">the weight-sum grid — the 2026 witness</text>`)
  const live: number[] = []
  for (let i = 0; i < n; i++) {
    const x = x0 + i * (cw + gap)
    const w = 1 << (n - 1 - i)
    const isLive = bits[i] === '1'
    if (isLive) live.push(w)
    s.push(`<text x="${x + cw / 2}" y="${weightY}" text-anchor="middle" font-size="10.5" fill="${C37.tealInk}">${w}</text>`)
    s.push(`<rect x="${x}" y="${cellY}" width="${cw}" height="${ch}" rx="8" fill="${isLive ? C37.panelA : C37.white}" stroke="${isLive ? C37.accent : C37.struct}" stroke-width="${isLive ? 2.5 : 2}"/>`)
    s.push(`<text x="${x + cw / 2}" y="${cellY + ch / 2 + 7}" text-anchor="middle" font-size="20" font-weight="${isLive ? 'bold' : 'normal'}" fill="${C37.ink}">${bits[i]}</text>`)
  }
  for (let i = 0; i < n; i++) {
    if (bits[i] !== '1') continue
    const x = x0 + i * (cw + gap)
    s.push(`<text x="${x + cw / 2}" y="${contribY}" text-anchor="middle" font-size="10" font-weight="bold" fill="${C37.accent}">+${1 << (n - 1 - i)}</text>`)
  }
  s.push(`<rect x="70" y="${stripY}" width="620" height="${stripH}" rx="10" fill="${C37.panelB}" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 21}" text-anchor="middle" font-size="11.5" fill="${C37.ink}">the 1-bits choose ${live.join(' + ')}</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 42}" text-anchor="middle" font-size="13.5" font-weight="bold" fill="${C37.ink}">their sum is 2026 — the decimal value of the witness</text>`)
  s.push(`<text x="${W / 2}" y="${noteY}" text-anchor="middle" font-size="10" fill="${C37.tealInk}">eleven bits, eight of them 1 — popcount 8; the three 0-bits add nothing</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 2 — the doubling ladder for 110110                      */
/* ------------------------------------------------------------------ */
function cf37F2DoublingSvg(): string {
  const bits = '110110'
  const n = bits.length
  const trace: number[] = []
  let v = 0
  for (const c of bits) {
    v = 2 * v + (c === '1' ? 1 : 0)
    trace.push(v)
  }
  const W = 760
  const boxW = 80
  const boxH = 46
  const arrowSpan = 48
  const pitch = boxW + arrowSpan
  const x0 = 20
  const boxY = 82
  const H = 212
  const s = cf37Open(
    W,
    H,
    'The doubling ladder for the binary numeral 110110, swept left to right. Above six value boxes, the bits 1, 1, 0, 1, 1 and 0 are shown in reading order. The boxes hold the running values 1, 3, 6, 13, 27 and 54, joined by orange arrows labelled x2 +1, x2 +1, x2 +0, x2 +1 and x2 +0. A strip below states that the ladder ends at 54, the decimal value of 110110.',
  )
  s.push(`<text x="${W / 2}" y="30" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${C37.teal}">the doubling ladder — 110110 swept left to right</text>`)
  s.push(`<text x="${W / 2}" y="52" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">the numeral 110110, one bit at a time</text>`)
  for (let i = 0; i < n; i++) {
    const bx = x0 + i * pitch
    s.push(`<text x="${bx + boxW / 2}" y="70" text-anchor="middle" font-size="15" font-weight="bold" fill="${C37.ink}">${bits[i]}</text>`)
    s.push(`<rect x="${bx}" y="${boxY}" width="${boxW}" height="${boxH}" rx="9" fill="${C37.panelA}" stroke="${C37.accent}" stroke-width="2.5"/>`)
    s.push(`<text x="${bx + boxW / 2}" y="${boxY + boxH / 2 + 6}" text-anchor="middle" font-size="17" font-weight="bold" fill="${C37.ink}">${trace[i]}</text>`)
    s.push(`<text x="${bx + boxW / 2}" y="144" text-anchor="middle" font-size="9" fill="${C37.tealInk}">after bit ${i + 1}</text>`)
    if (i < n - 1) {
      const ax1 = bx + boxW + 4
      const ax2 = bx + pitch - 2
      const ay = boxY + boxH / 2
      s.push(`<line x1="${ax1}" y1="${ay}" x2="${ax2 - 9}" y2="${ay}" stroke="${C37.conn}" stroke-width="2"/>`)
      s.push(`<polygon points="${ax2},${ay} ${ax2 - 9},${ay - 4.5} ${ax2 - 9},${ay + 4.5}" fill="${C37.conn}"/>`)
      s.push(`<text x="${(ax1 + ax2) / 2}" y="${ay - 9}" text-anchor="middle" font-size="9.5" fill="${C37.conn}">x2 +${bits[i + 1]}</text>`)
    }
  }
  s.push(`<rect x="170" y="160" width="420" height="40" rx="10" fill="${C37.panelB}" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="185" text-anchor="middle" font-size="11.5" fill="${C37.ink}">the ladder ends at <tspan font-weight="bold">54</tspan> — so 110110 (base 2) = 54</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 3 — the grouped read: twelve bits to F52                */
/* ------------------------------------------------------------------ */
function cf37F3GroupedSvg(): string {
  const groups = [
    { bits: '1111', hex: 'F', dec: 15 },
    { bits: '0101', hex: '5', dec: 5 },
    { bits: '0010', hex: '2', dec: 2 },
  ]
  const cw = 36
  const groupGap = 22
  const groupW = 4 * cw
  const total = 3 * groupW + 2 * groupGap
  const W = 760
  const x0 = Math.round((W - total) / 2)
  const bitY = 62
  const bh = 36
  const boxY = 126
  const boxH = 40
  const boxW = 110
  const H = 272
  const s = cf37Open(
    W,
    H,
    'The grouped read of the twelve-bit string 111101010010. The bits are drawn as twelve cells blocked into groups of four from the right: 1111, 0101 and 0010. An underbrace beneath each group carries a box naming its hexadecimal digit: F equals 15, then 5, then 2. A line reads the boxes as one numeral, F52 in base 16, and a panel evaluates it: 15 x 256 + 5 x 16 + 2, which is 3840 + 80 + 2 = 3922.',
  )
  s.push(`<text x="${W / 2}" y="32" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${C37.teal}">the grouped read — twelve bits through hexadecimal</text>`)
  s.push(`<text x="${W / 2}" y="50" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">twelve bits, blocked by four from the right</text>`)
  groups.forEach((g, gi) => {
    const gx = x0 + gi * (groupW + groupGap)
    for (let k = 0; k < 4; k++) {
      const x = gx + k * cw
      s.push(`<rect x="${x}" y="${bitY}" width="${cw}" height="${bh}" rx="6" fill="${C37.white}" stroke="${C37.struct}" stroke-width="2"/>`)
      s.push(`<text x="${x + cw / 2}" y="${bitY + bh / 2 + 5}" text-anchor="middle" font-size="15" fill="${C37.ink}">${g.bits[k]}</text>`)
    }
    s.push(cf37Brace(gx, gx + groupW, bitY + bh + 2))
    const cx = gx + groupW / 2
    s.push(`<rect x="${cx - boxW / 2}" y="${boxY}" width="${boxW}" height="${boxH}" rx="9" fill="${C37.panelA}" stroke="${C37.accent}" stroke-width="2.5"/>`)
    s.push(`<text x="${cx}" y="${boxY + 17}" text-anchor="middle" font-size="15" font-weight="bold" fill="${C37.ink}">${g.hex}</text>`)
    s.push(`<text x="${cx}" y="${boxY + 33}" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">= ${g.dec}</text>`)
  })
  s.push(`<text x="${W / 2}" y="190" text-anchor="middle" font-size="11" fill="${C37.ink}">read the boxes as one numeral: <tspan font-weight="bold">F52 (base 16)</tspan></text>`)
  s.push(`<rect x="105" y="204" width="550" height="56" rx="10" fill="${C37.panelB}" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="225" text-anchor="middle" font-size="11.5" fill="${C37.ink}">15 x 256 + 5 x 16 + 2</text>`)
  s.push(`<text x="${W / 2}" y="246" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${C37.ink}">3840 + 80 + 2 = 3922</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 4 — the mirror: 3.6 divides down, 3.7 sums up, both 45  */
/* ------------------------------------------------------------------ */
function cf37F4MirrorSvg(): string {
  const W = 760
  const H = 394
  const divisions = [
    { n: 45, q: 22, r: 1 },
    { n: 22, q: 11, r: 0 },
    { n: 11, q: 5, r: 1 },
    { n: 5, q: 2, r: 1 },
    { n: 2, q: 1, r: 0 },
    { n: 1, q: 0, r: 1 },
  ]
  const rightBits = [
    { bit: '1', keep: true, w: 32 },
    { bit: '0', keep: false, w: 16 },
    { bit: '1', keep: true, w: 8 },
    { bit: '1', keep: true, w: 4 },
    { bit: '0', keep: false, w: 2 },
    { bit: '1', keep: true, w: 1 },
  ]
  const s = cf37Open(
    W,
    H,
    'The mirror diagram. A central circle holds the number 45, where both roads meet. On the left, lesson 3.6, the division ladder: six rows divide 45 by 2, then 22, 11, 5, 2 and 1 by 2, each with a small chip recording the remainder 1, 0, 1, 1, 0, 1; an arrow points downward and a note says the chips collected bottom to top spell 101101. On the right, lesson 3.7, the weight sum: six rows read the bits 1, 0, 1, 1, 0, 1, keeping the weights 32, 8, 4 and 1 in chips; an arrow points upward to the strip 32 + 8 + 4 + 1, which meets the same 45. A closing line states one theorem, two directions.',
  )
  s.push(`<circle cx="380" cy="90" r="34" fill="${C37.paper}" stroke="${C37.struct}" stroke-width="3"/>`)
  s.push(`<text x="380" y="98" text-anchor="middle" font-size="24" font-weight="bold" fill="${C37.ink}">45</text>`)
  s.push(`<text x="380" y="142" text-anchor="middle" font-size="9" fill="${C37.teal}">both roads meet at the same number</text>`)
  s.push(`<text x="190" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="${C37.teal}">lesson 3.6 — the division ladder</text>`)
  s.push(`<text x="190" y="56" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">divide 45 down, collect the remainders</text>`)
  s.push(`<text x="570" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="${C37.teal}">lesson 3.7 — the weight sum</text>`)
  s.push(`<text x="570" y="56" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">sum the chosen weights back up to 45</text>`)
  s.push(cf37ArrowTo(352, 118, 298, 132))
  s.push(cf37ArrowTo(500, 132, 418, 114))
  divisions.forEach((d, i) => {
    const y = 140 + i * 32
    s.push(`<text x="36" y="${y + 4}" font-size="11.5" fill="${C37.ink}">${d.n} ÷ 2 = ${d.q}</text>`)
    s.push(`<rect x="278" y="${y - 8}" width="40" height="22" rx="6" fill="${C37.panelA}" stroke="${C37.accent}" stroke-width="2"/>`)
    s.push(`<text x="298" y="${y + 7}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${C37.accent}">r ${d.r}</text>`)
  })
  s.push(`<line x1="344" y1="150" x2="344" y2="296" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="344,306 339,296 349,296" fill="${C37.conn}"/>`)
  s.push(`<text x="331" y="225" transform="rotate(-90 331 225)" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">divide downward</text>`)
  s.push(`<text x="190" y="332" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">chips collected bottom to top: 101101</text>`)
  s.push(`<text x="478" y="140" font-size="12" font-weight="bold" fill="${C37.ink}">the kept weights: 32 + 8 + 4 + 1</text>`)
  rightBits.forEach((rb, i) => {
    const y = 172 + i * 32
    s.push(`<text x="478" y="${y + 4}" font-size="11" fill="${rb.keep ? C37.ink : C37.mid}">bit ${rb.bit} — ${rb.keep ? 'keep' : 'skip'}</text>`)
    if (rb.keep) {
      s.push(`<rect x="668" y="${y - 8}" width="52" height="22" rx="6" fill="${C37.panelA}" stroke="${C37.accent}" stroke-width="2"/>`)
      s.push(`<text x="694" y="${y + 7}" text-anchor="middle" font-size="11" font-weight="bold" fill="${C37.accent}">${rb.w}</text>`)
    }
  })
  s.push(`<line x1="448" y1="330" x2="448" y2="184" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="448,174 443,184 453,184" fill="${C37.conn}"/>`)
  s.push(`<text x="436" y="255" transform="rotate(-90 436 255)" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">sum upward</text>`)
  s.push(`<text x="570" y="360" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">the bits, read top to bottom: 101101</text>`)
  s.push(`<text x="${W / 2}" y="382" text-anchor="middle" font-size="10.5" fill="${C37.teal}">one theorem, two directions — 3.6 divides down from 45, 3.7 sums up to 45</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 5 — the binary point splits the powers (101.11)         */
/* ------------------------------------------------------------------ */
function cf37F5PointSplitSvg(): string {
  const W = 760
  const H = 276
  const x0 = 193
  const cw = 64
  const gap = 6
  const pitch = cw + gap
  const pointGap = 30
  const cellY = 86
  const ch = 62
  const intDigits = ['1', '0', '1']
  const intWeights = [4, 2, 1]
  const fracDigits = ['1', '1']
  const fracWeights = ['0.5', '0.25']
  const intX = (i: number) => x0 + i * pitch
  const fracX = (j: number) => x0 + 3 * pitch + pointGap + j * pitch
  const pointX = x0 + 3 * pitch + pointGap / 2 - 3
  const s = cf37Open(
    W,
    H,
    'The binary point splits the powers, shown for 101.11 in base 2. Five cells carry the digits 1, 0, 1 to the left of the point and 1, 1 to the right, with weights 4, 2, 1 above the left cells and 0.5, 0.25 above the right cells. The two fraction cells are tinted orange. A dashed vertical line marks the binary point. Contributions 4 and 1 are kept on the left and 0.5 and 0.25 on the right; labels state 4 + 1 = 5 on the left of the point and 0.5 + 0.25 = 0.75 on the right, and a strip concludes 5 + 0.75 = 5.75.',
  )
  s.push(`<text x="${W / 2}" y="30" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${C37.teal}">the binary point splits the powers</text>`)
  s.push(`<text x="${W / 2}" y="48" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">101.11 (base 2): positive powers left, negative powers right</text>`)
  s.push(`<line x1="${pointX}" y1="60" x2="${pointX}" y2="156" stroke="${C37.faint}" stroke-width="1.5" stroke-dasharray="4 4"/>`)
  intDigits.forEach((d, i) => {
    const x = intX(i)
    s.push(`<text x="${x + cw / 2}" y="74" text-anchor="middle" font-size="11" fill="${C37.tealInk}">${intWeights[i]}</text>`)
    s.push(`<rect x="${x}" y="${cellY}" width="${cw}" height="${ch}" rx="8" fill="${C37.white}" stroke="${C37.struct}" stroke-width="2"/>`)
    s.push(`<text x="${x + cw / 2}" y="${cellY + ch / 2 + 8}" text-anchor="middle" font-size="22" font-weight="bold" fill="${C37.ink}">${d}</text>`)
  })
  fracDigits.forEach((d, j) => {
    const x = fracX(j)
    s.push(`<text x="${x + cw / 2}" y="74" text-anchor="middle" font-size="11" fill="${C37.tealInk}">${fracWeights[j]}</text>`)
    s.push(`<rect x="${x}" y="${cellY}" width="${cw}" height="${ch}" rx="8" fill="${C37.panelA}" stroke="${C37.accent}" stroke-width="2.5"/>`)
    s.push(`<text x="${x + cw / 2}" y="${cellY + ch / 2 + 8}" text-anchor="middle" font-size="22" font-weight="bold" fill="${C37.ink}">${d}</text>`)
  })
  s.push(`<circle cx="${pointX}" cy="117" r="5" fill="${C37.ink}"/>`)
  const contribs: [number, string, boolean][] = [
    [intX(0) + cw / 2, '4', true],
    [intX(1) + cw / 2, '-', false],
    [intX(2) + cw / 2, '1', true],
    [fracX(0) + cw / 2, '0.5', true],
    [fracX(1) + cw / 2, '0.25', true],
  ]
  contribs.forEach(([cx, t, live]) => {
    s.push(`<text x="${cx}" y="172" text-anchor="middle" font-size="10.5" font-weight="${live ? 'bold' : 'normal'}" fill="${live ? C37.accent : C37.mid}">${t}</text>`)
  })
  s.push(`<text x="${intX(0) + 3 * pitch / 2}" y="196" text-anchor="middle" font-size="10.5" fill="${C37.ink}">left of the point: 4 + 1 = 5</text>`)
  s.push(`<text x="${fracX(0) + (cw + pitch) / 2 - 3}" y="196" text-anchor="middle" font-size="10.5" fill="${C37.ink}">right of the point: 0.5 + 0.25 = 0.75</text>`)
  s.push(`<rect x="90" y="214" width="580" height="46" rx="10" fill="${C37.panelB}" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="243" text-anchor="middle" font-size="12" font-weight="bold" fill="${C37.ink}">5 + 0.75 = 5.75 — the point marks where the exponents turn negative</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the weight grid for 01010101 (exercise)           */
/* ------------------------------------------------------------------ */
function cf37SFWeightGrid85Svg(): string {
  const bits = '01010101'
  const n = bits.length
  const cw = 52
  const gap = 6
  const total = n * cw + (n - 1) * gap
  const W = 680
  const x0 = Math.round((W - total) / 2)
  const cellY = 58
  const ch = 44
  const H = 190
  const s = cf37Open(
    W,
    H,
    'The weight grid for the byte 01010101. Eight cells carry the digits 0, 1, 0, 1, 0, 1, 0, 1 under the weights 128, 64, 32, 16, 8, 4, 2 and 1. The four cells with 1-bits are highlighted, their contributions 64, 16, 4 and 1 are listed beneath, and a strip sums them: 64 + 16 + 4 + 1 = 85.',
  )
  s.push(`<text x="${W / 2}" y="26" text-anchor="middle" font-size="11" font-weight="bold" fill="${C37.teal}">the weight grid for 01010101 (base 2)</text>`)
  const live: number[] = []
  for (let i = 0; i < n; i++) {
    const x = x0 + i * (cw + gap)
    const w = 1 << (n - 1 - i)
    const isLive = bits[i] === '1'
    if (isLive) live.push(w)
    s.push(`<text x="${x + cw / 2}" y="48" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">${w}</text>`)
    s.push(`<rect x="${x}" y="${cellY}" width="${cw}" height="${ch}" rx="7" fill="${isLive ? C37.panelA : C37.white}" stroke="${isLive ? C37.accent : C37.struct}" stroke-width="${isLive ? 2.5 : 2}"/>`)
    s.push(`<text x="${x + cw / 2}" y="${cellY + ch / 2 + 6}" text-anchor="middle" font-size="16" font-weight="${isLive ? 'bold' : 'normal'}" fill="${C37.ink}">${bits[i]}</text>`)
    if (isLive) s.push(`<text x="${x + cw / 2}" y="122" text-anchor="middle" font-size="9.5" font-weight="bold" fill="${C37.accent}">+${w}</text>`)
  }
  s.push(`<rect x="140" y="138" width="400" height="40" rx="10" fill="${C37.panelB}" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="163" text-anchor="middle" font-size="11.5" fill="${C37.ink}">${live.join(' + ')} = <tspan font-weight="bold">85</tspan></text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the doubling trace for 110110 (exercise)          */
/* ------------------------------------------------------------------ */
function cf37SFDoubling54Svg(): string {
  const bits = '110110'
  const n = bits.length
  const trace: number[] = []
  let v = 0
  for (const c of bits) {
    v = 2 * v + (c === '1' ? 1 : 0)
    trace.push(v)
  }
  const W = 680
  const boxW = 76
  const boxH = 40
  const arrowSpan = 40
  const pitch = boxW + arrowSpan
  const x0 = 12
  const boxY = 54
  const H = 160
  const s = cf37Open(
    W,
    H,
    'The doubling trace for 110110. Six boxes hold the running values 1, 3, 6, 13, 27 and 54, with the bits 1, 1, 0, 1, 1 and 0 shown above them in reading order. Orange arrows between the boxes are labelled x2 +1, x2 +1, x2 +0, x2 +1 and x2 +0. A strip states that the ladder ends at 54.',
  )
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${C37.teal}">the doubling trace for 110110 (base 2)</text>`)
  for (let i = 0; i < n; i++) {
    const bx = x0 + i * pitch
    s.push(`<text x="${bx + boxW / 2}" y="44" text-anchor="middle" font-size="13" font-weight="bold" fill="${C37.ink}">${bits[i]}</text>`)
    s.push(`<rect x="${bx}" y="${boxY}" width="${boxW}" height="${boxH}" rx="8" fill="${C37.panelA}" stroke="${C37.accent}" stroke-width="2.5"/>`)
    s.push(`<text x="${bx + boxW / 2}" y="${boxY + boxH / 2 + 5}" text-anchor="middle" font-size="15" font-weight="bold" fill="${C37.ink}">${trace[i]}</text>`)
    if (i < n - 1) {
      const ax1 = bx + boxW + 3
      const ax2 = bx + pitch - 2
      const ay = boxY + boxH / 2
      s.push(`<line x1="${ax1}" y1="${ay}" x2="${ax2 - 8}" y2="${ay}" stroke="${C37.conn}" stroke-width="2"/>`)
      s.push(`<polygon points="${ax2},${ay} ${ax2 - 8},${ay - 4} ${ax2 - 8},${ay + 4}" fill="${C37.conn}"/>`)
      s.push(`<text x="${(ax1 + ax2) / 2}" y="${ay - 8}" text-anchor="middle" font-size="9" fill="${C37.conn}">x2 +${bits[i + 1]}</text>`)
    }
  }
  s.push(`<rect x="170" y="112" width="340" height="36" rx="10" fill="${C37.panelB}" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="135" text-anchor="middle" font-size="11" fill="${C37.ink}">the ladder ends at <tspan font-weight="bold">54</tspan></text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — appending a 0 doubles (13 -> 26 -> 52)            */
/* ------------------------------------------------------------------ */
function cf37SFAppendZeroSvg(): string {
  const W = 680
  const H = 160
  const panels = [
    { num: '1101', val: '= 13', cap: '4 bits' },
    { num: '11010', val: '= 26', cap: '5 bits' },
    { num: '110100', val: '= 52', cap: '6 bits' },
  ]
  const pw = 180
  const ph = 64
  const gap = 46
  const x0 = 24
  const y0 = 48
  const s = cf37Open(
    W,
    H,
    'Appending a 0 bit doubles the value. Three panels show the numerals 1101, 11010 and 110100 with their values 13, 26 and 52. Orange arrows between the panels are labelled x 2, and captions count 4 bits, 5 bits and 6 bits. A note adds that appending a 1 instead would give 2 x 13 + 1 = 27.',
  )
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${C37.teal}">appending a 0 bit doubles the value</text>`)
  panels.forEach((p, k) => {
    const px = x0 + k * (pw + gap)
    s.push(`<rect x="${px}" y="${y0}" width="${pw}" height="${ph}" rx="10" fill="${C37.white}" stroke="${C37.struct}" stroke-width="2.5"/>`)
    s.push(`<text x="${px + pw / 2}" y="${y0 + 28}" text-anchor="middle" font-size="16" font-weight="bold" fill="${C37.ink}">${p.num}</text>`)
    s.push(`<text x="${px + pw / 2}" y="${y0 + 51}" text-anchor="middle" font-size="12" fill="${C37.tealInk}">${p.val}</text>`)
    s.push(`<text x="${px + pw / 2}" y="${y0 + ph + 15}" text-anchor="middle" font-size="9" fill="${C37.tealInk}">${p.cap}</text>`)
    if (k < panels.length - 1) {
      const ax1 = px + pw + 4
      const ax2 = px + pw + gap - 4
      const ay = y0 + ph / 2
      s.push(`<line x1="${ax1}" y1="${ay}" x2="${ax2 - 8}" y2="${ay}" stroke="${C37.conn}" stroke-width="2"/>`)
      s.push(`<polygon points="${ax2},${ay} ${ax2 - 8},${ay - 4} ${ax2 - 8},${ay + 4}" fill="${C37.conn}"/>`)
      s.push(`<text x="${(ax1 + ax2) / 2}" y="${ay + 18}" text-anchor="middle" font-size="9.5" fill="${C37.conn}">x 2</text>`)
    }
  })
  s.push(`<text x="${W / 2}" y="146" text-anchor="middle" font-size="10" fill="${C37.tealInk}">appending a 0 doubles; appending a 1 instead would give 2 x 13 + 1 = 27</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — regroup braces for 11011010 -> DA (exercise)      */
/* ------------------------------------------------------------------ */
function cf37SFRegroupDaSvg(): string {
  const groups = [
    { bits: '1101', hex: 'D = 13' },
    { bits: '1010', hex: 'A = 10' },
  ]
  const cw = 34
  const groupGap = 20
  const groupW = 4 * cw
  const total = 2 * groupW + groupGap
  const W = 680
  const x0 = Math.round((W - total) / 2)
  const bitY = 44
  const bh = 32
  const boxY = 102
  const boxH = 36
  const boxW = 120
  const H = 208
  const s = cf37Open(
    W,
    H,
    'The regrouping of 11011010 by four. Eight bit cells are blocked into two groups, 1101 and 1010, each with an underbrace and a box naming its hexadecimal digit: D equals 13 and A equals 10. A strip evaluates the hex numeral: 13 x 16 + 10 = 218.',
  )
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${C37.teal}">11011010 (base 2), blocked by four</text>`)
  groups.forEach((g, gi) => {
    const gx = x0 + gi * (groupW + groupGap)
    for (let k = 0; k < 4; k++) {
      const x = gx + k * cw
      s.push(`<rect x="${x}" y="${bitY}" width="${cw}" height="${bh}" rx="6" fill="${C37.white}" stroke="${C37.struct}" stroke-width="2"/>`)
      s.push(`<text x="${x + cw / 2}" y="${bitY + bh / 2 + 5}" text-anchor="middle" font-size="14" fill="${C37.ink}">${g.bits[k]}</text>`)
    }
    s.push(cf37Brace(gx, gx + groupW, bitY + bh + 2))
    const cx = gx + groupW / 2
    s.push(`<rect x="${cx - boxW / 2}" y="${boxY}" width="${boxW}" height="${boxH}" rx="9" fill="${C37.panelA}" stroke="${C37.accent}" stroke-width="2.5"/>`)
    s.push(`<text x="${cx}" y="${boxY + boxH / 2 + 4.5}" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${C37.ink}">${g.hex}</text>`)
  })
  s.push(`<rect x="190" y="152" width="300" height="40" rx="10" fill="${C37.panelB}" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="177" text-anchor="middle" font-size="11.5" fill="${C37.ink}">13 x 16 + 10 = <tspan font-weight="bold">218</tspan></text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the point split for 0.101 (exercise)              */
/* ------------------------------------------------------------------ */
function cf37SFPoint01Svg(): string {
  const W = 680
  const H = 210
  const x0 = 208
  const cw = 56
  const pitch = 62
  const pointX = x0 + 70
  const cellY = 58
  const ch = 44
  const s = cf37Open(
    W,
    H,
    'The point split for 0.101 in base 2. A leading 0 cell sits left of a dashed vertical point marker; to its right, three cells carry the digits 1, 0 and 1 under the weights 0.5, 0.25 and 0.125. The live cells hold contributions 0.5 and 0.125, a strip sums 0.5 + 0.125 = 0.625, and a note records that the leading 0 before the point contributes nothing.',
  )
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${C37.teal}">the point split for 0.101 (base 2)</text>`)
  s.push(`<line x1="${pointX}" y1="52" x2="${pointX}" y2="110" stroke="${C37.faint}" stroke-width="1.5" stroke-dasharray="4 4"/>`)
  s.push(`<text x="${x0 + cw / 2}" y="48" text-anchor="middle" font-size="10" fill="${C37.tealInk}">1</text>`)
  s.push(`<rect x="${x0}" y="${cellY}" width="${cw}" height="${ch}" rx="8" fill="${C37.white}" stroke="${C37.faint}" stroke-width="2"/>`)
  s.push(`<text x="${x0 + cw / 2}" y="${cellY + ch / 2 + 7}" text-anchor="middle" font-size="18" fill="${C37.ink}">0</text>`)
  s.push(`<text x="${x0 + cw / 2}" y="122" text-anchor="middle" font-size="10" fill="${C37.mid}">-</text>`)
  const fracs = [
    { d: '1', w: '0.5', live: true },
    { d: '0', w: '0.25', live: false },
    { d: '1', w: '0.125', live: true },
  ]
  fracs.forEach((f, j) => {
    const x = x0 + 84 + j * pitch
    s.push(`<text x="${x + cw / 2}" y="48" text-anchor="middle" font-size="10" fill="${C37.tealInk}">${f.w}</text>`)
    s.push(`<rect x="${x}" y="${cellY}" width="${cw}" height="${ch}" rx="8" fill="${f.live ? C37.panelA : C37.white}" stroke="${f.live ? C37.accent : C37.struct}" stroke-width="${f.live ? 2.5 : 2}"/>`)
    s.push(`<text x="${x + cw / 2}" y="${cellY + ch / 2 + 7}" text-anchor="middle" font-size="18" font-weight="${f.live ? 'bold' : 'normal'}" fill="${C37.ink}">${f.d}</text>`)
    s.push(`<text x="${x + cw / 2}" y="122" text-anchor="middle" font-size="10" font-weight="${f.live ? 'bold' : 'normal'}" fill="${f.live ? C37.accent : C37.mid}">${f.live ? f.w : '-'}</text>`)
  })
  s.push(`<circle cx="${pointX}" cy="80" r="4.5" fill="${C37.ink}"/>`)
  s.push(`<rect x="190" y="138" width="300" height="40" rx="10" fill="${C37.panelB}" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="163" text-anchor="middle" font-size="11.5" fill="${C37.ink}">0.5 + 0.125 = <tspan font-weight="bold">0.625</tspan></text>`)
  s.push(`<text x="${W / 2}" y="196" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">the leading 0 before the point contributes nothing</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the 2026 witness doubled bit by bit (exercise)    */
/* ------------------------------------------------------------------ */
function cf37SF2026TraceSvg(): string {
  const bits = '11111101010'
  const n = bits.length
  const trace: number[] = []
  let v = 0
  for (const c of bits) {
    v = 2 * v + (c === '1' ? 1 : 0)
    trace.push(v)
  }
  const W = 560
  const rowY = (i: number) => 52 + i * 25
  const H = 366
  const s = cf37Open(
    W,
    H,
    'The 2026 witness doubled bit by bit. Eleven rows each show a bit chip, the running value in a highlighted box, and the move that produced it: start v = 1, then 2 x 1 + 1 = 3, 2 x 3 + 1 = 7, 2 x 7 + 1 = 15, 2 x 15 + 1 = 31, 2 x 31 + 1 = 63, 2 x 63 + 0 = 126, 2 x 126 + 1 = 253, 2 x 253 + 0 = 506, 2 x 506 + 1 = 1013 and 2 x 1013 + 0 = 2026. A strip states that after the eleventh bit the ladder reads 2026.',
  )
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${C37.teal}">the 2026 witness, doubled bit by bit</text>`)
  for (let i = 0; i < n; i++) {
    const y = rowY(i)
    s.push(`<rect x="50" y="${y - 13}" width="24" height="20" rx="5" fill="${C37.white}" stroke="${C37.struct}" stroke-width="2"/>`)
    s.push(`<text x="62" y="${y + 2}" text-anchor="middle" font-size="11" fill="${C37.ink}">${bits[i]}</text>`)
    s.push(`<rect x="92" y="${y - 13}" width="76" height="22" rx="6" fill="${C37.panelA}" stroke="${C37.accent}" stroke-width="2"/>`)
    s.push(`<text x="130" y="${y + 3}" text-anchor="middle" font-size="12" font-weight="bold" fill="${C37.accent}">${trace[i]}</text>`)
    const move = i === 0 ? 'start: v = 1' : `2 x ${trace[i - 1]} + ${Number(bits[i])} = ${trace[i]}`
    s.push(`<text x="190" y="${y + 2}" font-size="10" fill="${C37.tealInk}">${move}</text>`)
  }
  s.push(`<rect x="60" y="318" width="440" height="38" rx="10" fill="${C37.panelB}" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="342" text-anchor="middle" font-size="11" fill="${C37.ink}">after the eleventh bit the ladder reads <tspan font-weight="bold">2026</tspan></text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the colour code 2D unfolded (exercise)             */
/* ------------------------------------------------------------------ */
function cf37SFColour2DSvg(): string {
  const groups = [
    { bits: '0010', hex: '2' },
    { bits: '1101', hex: 'D = 13' },
  ]
  const cw = 34
  const groupGap = 20
  const groupW = 4 * cw
  const total = 2 * groupW + groupGap
  const W = 680
  const x0 = Math.round((W - total) / 2)
  const bitY = 44
  const bh = 32
  const boxY = 102
  const boxH = 36
  const boxW = 120
  const H = 216
  const s = cf37Open(
    W,
    H,
    'The colour code 2D unfolded. Eight bit cells carry 0010 1101, blocked by four with underbraces; boxes name the hex digits 2 and D equals 13. A strip evaluates 2 x 16 + 13 = 45, and a note adds that 45 is 101101 in base 2, the opening witness again.',
  )
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${C37.teal}">the colour code #2D unfolded: 0010 1101</text>`)
  groups.forEach((g, gi) => {
    const gx = x0 + gi * (groupW + groupGap)
    for (let k = 0; k < 4; k++) {
      const x = gx + k * cw
      s.push(`<rect x="${x}" y="${bitY}" width="${cw}" height="${bh}" rx="6" fill="${C37.white}" stroke="${C37.struct}" stroke-width="2"/>`)
      s.push(`<text x="${x + cw / 2}" y="${bitY + bh / 2 + 5}" text-anchor="middle" font-size="14" fill="${C37.ink}">${g.bits[k]}</text>`)
    }
    s.push(cf37Brace(gx, gx + groupW, bitY + bh + 2))
    const cx = gx + groupW / 2
    s.push(`<rect x="${cx - boxW / 2}" y="${boxY}" width="${boxW}" height="${boxH}" rx="9" fill="${C37.panelA}" stroke="${C37.accent}" stroke-width="2.5"/>`)
    s.push(`<text x="${cx}" y="${boxY + boxH / 2 + 4.5}" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${C37.ink}">${g.hex}</text>`)
  })
  s.push(`<rect x="190" y="152" width="300" height="40" rx="10" fill="${C37.panelB}" stroke="${C37.conn}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="177" text-anchor="middle" font-size="11.5" fill="${C37.ink}">2 x 16 + 13 = <tspan font-weight="bold">45</tspan></text>`)
  s.push(`<text x="${W / 2}" y="200" text-anchor="middle" font-size="9.5" fill="${C37.tealInk}">and 45 is 101101 (base 2) — the lesson's opening witness again</text>`)
  s.push('</svg>')
  return s.join('')
}

export const lesson37: Lesson = {
  id: 'cf-binary-to-decimal-conversion',
  number: '3.7',
  title: 'Binary to Decimal Conversion',
  concepts: [
    'the weight (positional) sum',
    'the doubling (Horner) ladder',
    'the grouped read through octal and hexadecimal',
    'the binary point and negative powers',
    'population count (popcount)',
    'most and least significant bits',
    'appending a zero doubles the value',
  ],
  objectives: [
    'By the end of this lesson you can unfold any binary numeral as a sum of powers of two and add the live weights to reach its decimal value.',
    'By the end of this lesson you can sweep a binary numeral left to right with the doubling rule and arrive at the same value without a powers-of-two table.',
    'By the end of this lesson you can regroup binary strings by four (hexadecimal) or three (octal) and finish the conversion with one short arithmetic.',
    'By the end of this lesson you can read binary fractions across the binary point, converting patterns such as 0.011 or 101.11 exactly.',
    'By the end of this lesson you can use the population count and the append-a-zero doubling shortcut as sanity checks on magnitude.',
    "By the end of this lesson you can choose the right method for a numeral's shape — short pattern, long sparse numeral, or pre-blocked string — and say why.",
  ],
  prerequisites: ['cf-the-numbering-systems-binary-octal-hexadecimal'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ================================================================
    // 1. THE MACHINE HANDS YOU A PATTERN
    // ================================================================
    { kind: 'heading', text: 'The Machine Hands You a Pattern' },
    { kind: 'para', text: 'Lesson 3.6 taught you the descent: the human owns a number — forty-five, say — and wants the machine’s pattern for it, so you divided by two again and again, collected the remainders, and read them upward into $101101_2$. This lesson stands on the other side of that street, and the traffic runs the other way. The machine hands you a pattern — a file size in bytes, a memory address, a colour code like $101101$ or 0x2D — and the human question is the mirror image: **which number does this pattern name?** A debugger shows you a hexadecimal address; a stylesheet shows you a channel code; a protocol dump shows you a row of bits; and in every case the decimal number underneath is exactly one conversion away. Reading is the skill, and this lesson teaches it three ways.' },
    { kind: 'para', text: 'The two conversion lessons are siblings, not parent and child: both hang directly from lesson 3.2, ‘The Numbering Systems: Binary, Octal, Hexadecimal’, which owns the positional census itself. If you have already met lesson 3.6, ‘Decimal to Binary Conversion’, everything here will feel familiar the way a reflection feels familiar — this lesson is the mirror of the ladder you may already have met, climbed in the opposite direction. And if you have not, no harm is done: nothing below depends on division, and the one paragraph of place-value refresh in the next section is the entire entry fee.' },
    { kind: 'para', text: 'Three roads lead from a pattern back to its number, and a craftsman eventually knows all three. **The weight sum** writes the place values over the digits and adds the ones under the 1-bits — the positional method, direct and unhurried. **The doubling ladder** sweeps the numeral left to right, doubling and adding each bit as it arrives — a fast, table-free sweep that fits in the head. **The grouped read** blocks the bits by four (or three), translates each block into a single hexadecimal (or octal) digit, and finishes with one small arithmetic — the programmer’s shortcut when the string is long or arrives already blocked. Fractions cross a binary point and mirror the whole story; and the census instinct — counting the 1-bits — sanity-checks every answer before you trust it.' },
    { kind: 'callout', tone: 'insight', title: 'Note — reading is un-division', text: 'Lesson 3.6 divided: every division by two peeled one bit off the number. Reading runs the film backwards: each bit you meet is one of those peeled remainders, and adding back its weight un-divides the step. Nothing new is being computed — the same place-value theorem is simply being read from the other end. Keep this mirror in view and neither lesson needs memorising: they are one idea wearing two coats.' },
    { kind: 'para', text: 'The walk is ordered and friendly. First a one-paragraph refresh of what a positional numeral is, since 3.2 owns the theory and this lesson only borrows the result. Then Method 1 in full, with the 2026 witness $11111101010_2$ as the grand worked example and a derivation proving that the weight sum is exactly 3.6’s ladder read backwards. Then the doubling ladder, traced move by move, with its quiet identity as polynomial evaluation. Then the grouped read through hexadecimal and octal, with colour codes as witnesses and one paragraph tying back to lesson 3.4’s RGB census. Fractions follow, then the popcount census, then a short guide to choosing the method that fits a numeral’s shape. Every number printed along the way is engine-verified before it ships; check any of them by hand and you will find them exact.' },

    // ================================================================
    // 2. READING A POSITIONAL NUMERAL
    // ================================================================
    { kind: 'heading', text: 'Reading a Positional Numeral: the Places Return' },
    { kind: 'para', text: 'Every numeral you have ever read has been positional: the value of a digit depends on the chair it occupies. In decimal, the $4$ of $45$ means four tens because it sits second from the right; the $5$ means five units. Binary plays the identical game with a smaller cast. Each chair is worth a power of two, doubling as you step left, and the digit — always $0$ or $1$ — says only whether that chair’s worth is switched on. That is the whole inheritance this lesson takes from 3.2, and it is enough to convert anything the machine will ever show you.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — positional notation and weight', text: 'A numeral is said to be *positional* if the number it names is the sum of each digit multiplied by the *weight* of the place it occupies. In base two the weights are the powers of two: the rightmost place weighs $2^0 = 1$, the next $2^1 = 2$, then $4$, $8$, $16$, doubling leftward without end. A binary numeral’s value is therefore the sum of the weights sitting under its $1$-bits — and the $0$-bits contribute nothing at all.' },
    { kind: 'para', text: 'The law is one law across every base; three dresses show it at a glance.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $45 = 4 \\times 10 + 5 \\times 1$ — decimal, the same law with tens.',
      '(ii) $101101_2 = 1 \\times 32 + 0 \\times 16 + 1 \\times 8 + 1 \\times 4 + 0 \\times 2 + 1 \\times 1 = 45$ — the binary dress this lesson reads again and again.',
      '(iii) $\\mathrm{F52}_{16} = 15 \\times 256 + 5 \\times 16 + 2 \\times 1 = 3{,}922$ — hexadecimal, the law once more, met properly in Method 3.',
    ] },
    { kind: 'para', text: 'Two chair-names must be learned now because the whole trade uses them daily. The **most significant bit** — the MSB — is the leftmost bit, sitting on the numeral’s largest weight; flip it and the value swings hardest. The **least significant bit** — the LSB — is the rightmost, sitting on the $1$-weight; flip it and the value changes by exactly one. In $101101_2$ the MSB is the leading $1$ over the $32$-chair and the LSB is the final $1$ over the units. Table 1 unfolds a full byte this way, place by place, and its last row quietly does the whole work of Method 1 in miniature.' },
    { kind: 'table', caption: 'Table 1. The byte 11001011 unfolded place by place — five live places, three silent, and the total 203.', head: ['Place (from the right)', 'Weight', 'Bit of 11001011', 'Contribution'], rows: [
      ['0', '1', '1', '1'],
      ['1', '2', '1', '2'],
      ['2', '4', '0', '0'],
      ['3', '8', '1', '8'],
      ['4', '16', '0', '0'],
      ['5', '32', '0', '0'],
      ['6', '64', '1', '64'],
      ['7', '128', '1', '128'],
      ['all eight live would give', '255', 'five live here', '203'],
    ] },
    { kind: 'para', text: 'One harmless habit must be named before it surprises you: **leading zeros change nothing**. The numeral $101101_2$ and the byte-sized $00101101_2$ name the same number, $45$, because the padded zeros sit on weights that are never collected — a $0$-bit never pays. Padding on the left is how short values fill wide containers, and Method 3 will use it deliberately to complete blocks. Padding on the *right* is a different act entirely: each zero appended there doubles the value, as Section 7 proves — so the direction of padding is never a free choice.' },
    { kind: 'terms', items: [
      { term: 'Weight', def: 'the power of two attached to a place — $2^i$ for the place $i$ steps from the right, counting the rightmost place as step $0$.' },
      { term: 'Expanded form', def: 'a numeral written out as the sum of its live digit-times-weight terms; thus $101101_2 = 32 + 8 + 4 + 1$.' },
      { term: 'Most significant bit (MSB)', def: 'the leftmost bit, on the largest weight; flipping it moves the value most.' },
      { term: 'Least significant bit (LSB)', def: 'the rightmost bit, on the $1$-weight; it alone decides whether the value is odd or even.' },
    ] },

    // ================================================================
    // 3. METHOD ONE — THE WEIGHT SUM
    // ================================================================
    { kind: 'heading', text: 'Method One: the Weight Sum' },
    { kind: 'para', text: 'Method 1 is the definition with its sleeves rolled up. Write the numeral. Above each digit write that digit’s weight, counting from the right: $1$, $2$, $4$, $8$, $16$, $32$, $64$, $128$, doubling leftward as far as the numeral reaches. Then add the weights that sit under $1$-bits, and stop — the total is the decimal value. There is no carrying and no borrowing, because a sum of *distinct* powers of two can never collide: each weight is larger than all the smaller ones put together, so every partial total is just another bit pattern wearing decimal clothes. That observation is worth its own box later; first, the method at work.' },
    { kind: 'algorithm', title: 'The weight-sum method, line by line', lines: [
      { code: 'write the numeral; number the places from the RIGHT, starting at 0', note: 'the rightmost bit is place 0 — its weight is 2^0 = 1' },
      { code: 'above each bit write its weight 2^place', note: 'doubling right to left: 1, 2, 4, 8, 16, 32, ...' },
      { code: 'keep the weights under 1-bits; drop the rest', note: 'a 0-bit contributes nothing and is simply not added' },
      { code: 'add the kept weights', note: 'the total is the decimal value of the numeral' },
    ], note: 'Cost: you need the powers of two up to the numeral’s length — a table you can always rebuild by doubling, and which Table 2 will pin down for good.' },
    { kind: 'example', title: 'Illustration 1. Read 101101 (base 2) as a decimal number by the weight sum.', steps: [
      'Write the six bits and, counting from the right, place the weights above them: $32$, $16$, $8$, $4$, $2$, $1$.',
      'Read off the live weights — those sitting under a $1$: $32$, $8$, $4$ and $1$.',
      'So, the $0$-bits over $16$ and $2$ contribute nothing and are dropped.',
      'Add the live weights: $32 + 8 + 4 + 1 = 45$.',
      'Hence $101101_2 = 45$ — the same forty-five you met in every dress in lesson 3.2.',
    ] },
    { kind: 'para', text: 'Now the witness this lesson keeps returning to. The number $2026$ — the year this book is being written — happens to wear a nicely crowded binary dress: $11111101010_2$, eleven bits, six of them a leading run of ones. It is long enough to make a method sweat a little and short enough to check by hand, which is exactly what a witness should be. Figure 1 lays it out as the full weight-sum grid: the eleven weights along the top, the digit under each, the live cells highlighted, and the chosen powers summed at the foot.' },
    { kind: 'figure', caption: 'Figure 1. The weight-sum grid for the 2026 witness 11111101010: the eleven place values 1024 down to 1 stand over the digits, the eight 1-bit cells are highlighted with their contributions beneath, and the chosen powers sum to 2026 while the three 0-bits add nothing.', svg: cf37F1WeightGridSvg() },
    { kind: 'para', text: 'Read the grid from the right, the way the method anchors itself. The final $0$ sits on the units and pays nothing; the $1$ before it collects a $2$; then a $0$ skips the $4$; then a $1$ collects $8$; and the leading run of six ones sweeps up $32$, $64$, $128$, $256$, $512$ and $1024$ between them. Illustration 2 does the same reading as a chain of short moves — the form your own written working should take.' },
    { kind: 'example', title: 'Illustration 2. Read the 2026 witness 11111101010 (base 2) by the weight sum.', steps: [
      'Count the bits: eleven, so the leading weight is $2^{10} = 1024$.',
      'Write the weights right to left: $1024$, $512$, $256$, $128$, $64$, $32$, $16$, $8$, $4$, $2$, $1$.',
      'Keep the weights under the $1$-bits: $1024$, $512$, $256$, $128$, $64$, $32$, $8$, $2$.',
      'Add them: $1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 = 2026$.',
      'Hence $11111101010_2 = 2026$ — this year’s witness, read straight off the grid.',
    ] },
    { kind: 'para', text: 'The same grid reads a single byte without ceremony. Take $11001011_2$ — the byte whose places Table 1 unfolded. Five of its eight places are live, and Illustration 3 collects them. Note, before it runs, how the census instinct already whispers: five live weights out of eight, with the two heaviest alive, so the answer must land in the upper half of the byte’s range $0$ to $255$ — and it does.' },
    { kind: 'example', title: 'Illustration 3. Read the byte 11001011 (base 2).', steps: [
      'Lay the eight weights over the byte: $128$, $64$, $32$, $16$, $8$, $4$, $2$, $1$.',
      'Mark the live places: the bits $1$, $1$, $0$, $0$, $1$, $0$, $1$, $1$ keep $128$, $64$, $8$, $2$ and $1$.',
      'Add: $128 + 64 + 8 + 2 + 1 = 203$.',
      'Check the size: five live weights out of eight, and the total $203$ sits below the byte ceiling $255$.',
      'Hence $11001011_2 = 203$.',
    ] },
    { kind: 'equation', latex: 'N = \\sum_{i=0}^{n-1} b_i\\,2^i = b_{n-1}2^{n-1} + b_{n-2}2^{n-2} + \\cdots + b_1 2 + b_0 \\tag{1}', note: 'The weight sum in symbols: the bits $b_i$ are the digits, the places count from the right, and only the $1$-bits survive the sum.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the reversal trap', text: 'The classic slip writes the weights in the wrong order — $1$, $2$, $4$ starting at the LEFT — so that $10011$ collects $1 + 8 + 16 = 25$ instead of $19$, confidently wrong. Anchor the row at its right end: the units weight $1$ always sits under the LAST digit, and the powers grow leftward. If a conversion fails its census check (Section 7), suspect the reversal trap first; it is the commonest misreading in the whole trade.' },
    { kind: 'callout', tone: 'theorem', title: 'The place-value theorem — reading is unique', text: 'Strip a numeral of its leading zeros and it names exactly one whole number, and no other stripped numeral names it. Reading is therefore not a matter of opinion or of method: the weight sum, the doubling ladder and the grouped read must all land on the same value. The engine that checked every number in this lesson verified that agreement across all $2^{11} = 2048$ eleven-bit patterns before a paragraph shipped; when two of your methods disagree, one has been misapplied — the number itself never wobbles.' },
    { kind: 'derivation', title: 'Why the weight sum is the division ladder read backwards', statement: 'Lesson 3.6 turned a decimal number into a bit pattern by dividing repeatedly by two. We show that the weight sum of this lesson recovers exactly that number, so the two procedures are one theorem walked in opposite directions.', steps: [
      { label: 'Start from the place-value form', formula: 'N = b_{n-1}2^{n-1} + b_{n-2}2^{n-2} + \\cdots + b_1 2 + b_0', explanation: 'This is the weight sum itself: each bit multiplies its power of two. Call the total N; we shall chase N down the division ladder and watch the bits fall out one by one.' },
      { label: 'Divide by two', formula: '\\frac{N}{2} = b_{n-1}2^{n-2} + \\cdots + b_2 2 + b_1 + \\frac{b_0}{2}', explanation: 'Every power of two drops one step. If $b_0 = 0$ the division is exact; if $b_0 = 1$ the half left over is exactly one — the remainder lesson 3.6 collected. So the first remainder is the last bit.' },
      { label: 'Repeat on the quotient', formula: 'r_k = b_k \\quad (k = 0, 1, \\ldots, n-1)', explanation: 'Each further division peels the next bit from the right: the second remainder is $b_1$, the third is $b_2$, and so on until the quotient dies at zero. The ladder reads the bits from the right.' },
      { label: 'Turn the ladder around', formula: 'b_k = r_k \\;\\Longrightarrow\\; N = \\sum_{k=0}^{n-1} b_k\\,2^k', explanation: 'Now read the same equations backwards: knowing the bits, multiply each by its power and add, and N is rebuilt term by term. Descending collected the bits; ascending reassembles the number.' },
    ], result: 'Thus $45$ divided down in lesson 3.6 gave the pattern $101101_2$; and $101101_2 = 32 + 8 + 4 + 1$ climbs straight back to $45$. One theorem, two directions — the mirror of lesson 3.6’s ladder, walked the other way.' },
    { kind: 'callout', tone: 'historical', title: 'Leibniz was reading patterns in 1703', text: 'Binary arithmetic entered the printed record with Leibniz’s ‘Explication de l’arithmétique binaire’, published in the Mémoires de l’Académie Royale des Sciences in 1703, pp. 85–89 — a paper whose whole business is the two-symbol column, including the very additions that are this lesson’s weight sum read sideways. The fuller story — the paper’s setting, and the older Sanskrit thread in Pingala’s prosody — is lesson 3.2’s ground; this note claims only that un-dividing a pattern into its number is as old as the notation itself.' },
    { kind: 'formula', name: 'The weight sum', latex: '(b_{n-1}\\,\\ldots\\,b_1 b_0)_2 = \\sum_{i=0}^{n-1} b_i\\,2^i', note: 'Write the powers over the digits; add only the weights under 1-bits — 101101 = 32 + 8 + 4 + 1 = 45.' },
    // ================================================================
    // 4. METHOD TWO — THE DOUBLING (HORNER) LADDER
    // ================================================================
    { kind: 'heading', text: 'Method Two: the Doubling (Horner) Ladder' },
    { kind: 'para', text: 'Method 1 spends one resource freely: the powers of two. Up to eight bits the table lives in any student’s head; beyond it you are rebuilding the powers by doubling on paper anyway — and that observation suggests the economy. If the doubling must happen regardless, make the doubling itself the method. So here is the second road, and it reads the numeral from the LEFT this time. Hold a running value $v$, starting at the first bit. For every bit after it, double $v$ and add the bit — $0$ or $1$, whatever it is. When the last bit has been swallowed, $v$ is the decimal value. No table, no weights written above the digits, nothing but one rule applied $n - 1$ times to a numeral of $n$ bits.' },
    { kind: 'table', caption: 'Table 2. The powers of two, pinned for good: each place counts from the right, each value doubles leftward, and the one-bit numeral column shows each power as a lone 1 walked one step left per squaring of place — all eleven places live give the ceiling 2047.', head: ['Place (from the right)', 'Power', 'Value', 'One-bit numeral'], rows: [
      ['0', '$2^0$', '1', '1'],
      ['1', '$2^1$', '2', '10'],
      ['2', '$2^2$', '4', '100'],
      ['3', '$2^3$', '8', '1000'],
      ['4', '$2^4$', '16', '10000'],
      ['5', '$2^5$', '32', '100000'],
      ['6', '$2^6$', '64', '1000000'],
      ['7', '$2^7$', '128', '10000000'],
      ['8', '$2^8$', '256', '100000000'],
      ['9', '$2^9$', '512', '1000000000'],
      ['10', '$2^{10}$', '1024', '10000000000'],
      ['all eleven live', '$2^{11} - 1$', '2047', '11111111111'],
    ] },
    { kind: 'para', text: 'Read the last column downward and the table becomes a sentence: a power of two is a lone $1$ walked into position, one step left per power, and $2047$ — every place switched on — is the ceiling an eleven-bit numeral can reach, which is exactly why the 2026 witness of Figure 1 needed eleven columns and no more. The weight sum consults this table constantly; the ladder below never opens it. That is the entire difference between the two methods, and it is enough to decide which one you reach for.' },
    { kind: 'algorithm', title: 'The doubling ladder, line by line', lines: [
      { code: 'set v = the FIRST bit (a stripped numeral opens with 1, so v starts at 1)', note: 'leading zeros are never written, so the first bit is always a 1' },
      { code: 'for each remaining bit, left to right: v = 2 x v + bit', note: 'double what you hold, then add the bit just met — 0 or 1' },
      { code: 'after the last bit, stop', note: 'v is the decimal value — no table, no weights above the digits' },
    ], note: 'Cost: nothing but the numeral itself — which is why long, sparse numerals belong to this road.' },
    { kind: 'para', text: 'Watch it run on the numeral this lesson keeps standing beside the weight sum: $110110_2$, six bits. The ladder climbs $1$, $3$, $6$, $13$, $27$, $54$ — one rung per bit, every rung a single doubling and a single possible add — and Figure 2 draws the climb with the rule written on each arrow.' },
    { kind: 'example', title: 'Illustration 4. Read 110110 (base 2) by the doubling ladder, showing every rung.', steps: [
      'Start at the first bit: $v = 1$.',
      'Now, double and add the second bit: $2 \\times 1 + 1 = 3$.',
      'So, the third bit gives $2 \\times 3 + 0 = 6$ — a zero bit only doubles.',
      'Take the fourth: $2 \\times 6 + 1 = 13$; the fifth: $2 \\times 13 + 1 = 27$.',
      'The sixth bit is $0$: $2 \\times 27 + 0 = 54$.',
      'Hence $110110_2 = 54$, and the weight sum agrees: $32 + 16 + 4 + 2 = 54$.',
    ] },
    { kind: 'figure', caption: 'Figure 2. The doubling ladder for 110110 swept left to right: the bits stand above their value boxes, every orange arrow carries the rule x2 + bit, the rungs read 1, 3, 6, 13, 27, 54, and the sixth box ends the climb at 54 — the same value the weight sum reaches.', svg: cf37F2DoublingSvg() },
    { kind: 'para', text: 'Where the ladder wins is exactly where the weight sum tires. A twelve-bit numeral with three ones sends the weight sum hunting for a twelve-column table; the ladder asks for eleven doublings, most of them trivial. Mental arithmetic favours it for the same reason: a running value is one number to carry in the head, while a grid of weights is a page. And the ladder has a quiet structural property worth naming out loud, because it is the source of its speed: after $k$ bits, the running value is exactly the value of the $k$-bit prefix read as a numeral of its own. Stop anywhere and the ladder has still been telling the truth the whole way down.' },
    { kind: 'example', title: 'Illustration 5. Read 101101 (base 2) by the doubling ladder, and check it against the weight sum.', steps: [
      'Start: $v = 1$; then $2 \\times 1 + 0 = 2$, and $2 \\times 2 + 1 = 5$.',
      'Now, the middle bits: $2 \\times 5 + 1 = 11$, then $2 \\times 11 + 0 = 22$.',
      'Take the last bit: $2 \\times 22 + 1 = 45$.',
      'Check against Method 1: the live weights were $32$, $8$, $4$, $1$, and $32 + 8 + 4 + 1 = 45$.',
      'Hence both roads read $101101_2 = 45$ — the place-value theorem keeping its word.',
    ] },
    { kind: 'para', text: 'One honest line, because it is true and because it names the ladder properly: this is the same scheme that evaluates polynomials. Strip the base away and $b_{n-1}2^{n-1} + b_{n-2}2^{n-2} + \\cdots + b_1 2 + b_0$ is a polynomial in the variable $2$ whose coefficients are the bits — and the doubling sweep is exactly how such a polynomial is evaluated at a point: hold the leading coefficient, then repeatedly multiply by the variable and add the next coefficient down. The scheme’s printed name is Horner’s method, and it is not a coincidence that it fits: the base-$b$ value of a numeral simply IS a polynomial in $b$ evaluated at the digits.' },
    { kind: 'equation', latex: 'N = (\\ldots((b_{n-1} \\cdot 2 + b_{n-2}) \\cdot 2 + b_{n-3}) \\cdot \\, \\cdots \\, \\cdot 2 + b_1) \\cdot 2 + b_0 \\tag{2}', note: 'The ladder in symbols: fold the bits left to right, one doubling per fold — the same total as the weight sum of equation (1), merely re-bracketed.' },
    { kind: 'callout', tone: 'insight', title: 'Note — one rule, three names', text: 'Hold, double, add. Programmers call the sweep the Horner ladder; mathematicians meet it as polynomial evaluation; a beginner may simply call it the running total. Whatever the name, the invariant never changes: after $k$ bits, $v$ equals the value of the prefix those $k$ bits spell. That is why the ladder can pause mid-numeral and still report a true number — $1101$ of $110110$ already reads $13$ — and why every rung doubles as a checkpoint.' },
    { kind: 'example', title: 'Illustration 6. Read the byte 10011001 (base 2) by the doubling ladder.', steps: [
      'Start: $v = 1$; the two zeros glide through: $2 \\times 1 + 0 = 2$, then $2 \\times 2 + 0 = 4$.',
      'Now, the middle ones land: $2 \\times 4 + 1 = 9$, then $2 \\times 9 + 1 = 19$.',
      'So, two more zeros: $2 \\times 19 = 38$, then $2 \\times 38 = 76$ — doubling past a zero never adds.',
      'Take the final bit: $2 \\times 76 + 1 = 153$.',
      'Hence $10011001_2 = 153$, and the weight sum agrees: $128 + 16 + 8 + 1 = 153$.',
    ] },
    { kind: 'formula', name: 'The doubling (Horner) ladder', latex: 'v_0 = b_{n-1}, \\quad v_k = 2\\,v_{k-1} + b_{n-1-k}, \\quad v_{n-1} = N', note: 'Sweep left to right: hold the first bit, double-and-add each later bit — 110110 climbs 1, 3, 6, 13, 27, 54.' },
    { kind: 'terms', items: [
      { term: 'Doubling (Horner) ladder', def: 'the left-to-right sweep that reads a binary numeral by holding a running value $v$ and updating it as $v \\leftarrow 2v + b$ for each bit $b$ met.' },
      { term: 'Prefix value', def: 'the number named by the first $k$ bits alone; after $k$ steps of the ladder, the running value equals exactly this.' },
    ] },

    // ================================================================
    // 5. METHOD THREE — THE GROUPED READ
    // ================================================================
    { kind: 'heading', text: 'Method Three: the Grouped Read' },
    { kind: 'para', text: 'The third road begins with an observation about luggage: bits travel in blocks. Hexadecimal was engineered as a compression dress for binary — a file dump prints bytes as hex pairs, a stylesheet prints colour codes as hex, an address register prints hex — because four binary digits collapse into one hexadecimal digit and three into one octal digit, and the mapping is a lookup so small it fits behind the eye. So the programmer’s shortcut runs: block the bits by four from the RIGHT, translate each block into a single hexadecimal digit, and finish with one small base-16 arithmetic. Three moves, and a thirty-six-bit address becomes nine symbols.' },
    { kind: 'para', text: 'Blocking by four is legitimate, not lucky, and the reason should be said once in full. Sixteen is exactly $2^4$, so a block of four places names a value from $0$ to $15$ that depends only on the block’s own bits — never on its neighbours — and the block’s position in the string fixes its weight: the rightmost block sits on the units, the next on the sixteens, the next on the $256$s, stepping by sixteen per block exactly as single places step by two. The whole dictionary is sixteen rows, and Table 3 pins it.' },
    { kind: 'table', caption: 'Table 3. The whole dictionary of the grouped read: each four-bit block names one hexadecimal digit and each hexadecimal digit names one four-bit block — sixteen rows, no more, ever.', head: ['4-bit block', 'Hex digit', 'Decimal value'], rows: [
      ['0000', '0', '0'],
      ['0001', '1', '1'],
      ['0010', '2', '2'],
      ['0011', '3', '3'],
      ['0100', '4', '4'],
      ['0101', '5', '5'],
      ['0110', '6', '6'],
      ['0111', '7', '7'],
      ['1000', '8', '8'],
      ['1001', '9', '9'],
      ['1010', 'A', '10'],
      ['1011', 'B', '11'],
      ['1100', 'C', '12'],
      ['1101', 'D', '13'],
      ['1110', 'E', '14'],
      ['1111', 'F', '15'],
    ] },
    { kind: 'para', text: 'Now the method’s grand witness, the one this lesson pins. Take the twelve-bit string $1111\\,0101\\,0010$ — already blocked, the way a dump would hand it to you. Three moves take it to a decimal number, and Illustration 7 walks them.' },
    { kind: 'example', title: 'Illustration 7. Read the twelve-bit string 1111 0101 0010 (base 2) by the grouped read.', steps: [
      'Take the blocks as given, four bits each: $1111$, $0101$, $0010$.',
      'Translate each through Table 3: $1111 = \\mathrm{F}$, $0101 = 5$, $0010 = 2$.',
      'So, the string reads as one hexadecimal numeral: $\\mathrm{F52}_{16}$.',
      'Now, evaluate it place by place: $15 \\times 256 + 5 \\times 16 + 2 = 3840 + 80 + 2 = 3{,}922$.',
      'Hence $1111\\,0101\\,0010_2 = 3{,}922$, and Figure 3 draws the blocking, the digits and the sum.',
    ] },
    { kind: 'figure', caption: 'Figure 3. The grouped read of the twelve-bit string 111101010010: underbraces block it by four into 1111, 0101 and 0010, the boxes name the hexadecimal digits F, 5 and 2 with their values, and the hex positional sum 15 x 256 + 5 x 16 + 2 = 3840 + 80 + 2 closes at 3,922.', svg: cf37F3GroupedSvg() },
    { kind: 'para', text: 'Blocked by three instead of four, the same trick reads octal — eight being $2^3$, a block of three places names a value from $0$ to $7$, which is an octal digit entire. And sometimes the machine hands you the octal directly, as the older permission codes and minicomputer listings still do, in which case only the final arithmetic is left to do. Illustration 8 runs both halves of that trade.' },
    { kind: 'example', title: 'Illustration 8. Read 10011101 (base 2) through octal; then read the octal pattern 305 (base 8) directly.', steps: [
      'Block by three from the right, padding the left with a zero: $010\\,011\\,101$.',
      'Take each block as an octal digit: $010 = 2$, $011 = 3$, $101 = 5$, so the numeral is $235_8$.',
      'Now, evaluate the octal: $2 \\times 64 + 3 \\times 8 + 5 = 128 + 24 + 5 = 157$.',
      'So, $10011101_2 = 157$, and the weight sum agrees: $128 + 16 + 8 + 4 + 1 = 157$.',
      'For the direct read, take $305_8$: $3 \\times 64 + 0 \\times 8 + 5 = 192 + 0 + 5 = 197$.',
      'Hence one dictionary serves the whole corridor: binary in, octal or hexadecimal through, decimal out.',
    ] },
    { kind: 'para', text: 'Colour codes are where the grouped read meets daily work, and they deserve their own paragraph because they tie this lesson back to chapter 3’s earlier ground. A stylesheet channel is one byte written as two hex digits: #FF is $\\mathrm{FF}_{16}$, which is $1111\\,1111$ with every place live — $255$, the largest value an eight-bit channel can hold, the very ceiling Table 1 printed in its last row. Half-scale is #80: $1000\\,0000 = 128$. Lesson 3.4, ‘Text, Images and Sound as Bits’, took the census of whole frames built from such channels; this lesson supplies the reading of the channel itself, and now the two halves of that story have met.' },
    { kind: 'example', title: 'Illustration 9. Read the channel code #FF, and say why it is the largest an eight-bit channel can hold.', steps: [
      'Expand the code: $\\mathrm{FF}_{16}$ is two hex digits with $\\mathrm{F} = 15$ each.',
      'Take the positional sum: $15 \\times 16 + 15 = 240 + 15 = 255$.',
      'Now, in binary: $\\mathrm{F} = 1111$, so $\\mathrm{FF} = 1111\\,1111$ — all eight places live.',
      'So, the value is $128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255 = 2^8 - 1$, the byte ceiling.',
      'Hence #FF names the full channel: every place switched on, nothing left to add.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — block from the right, pad on the left', text: 'Blocks are built from the RIGHT end, because the rightmost block sits on the units; a string whose length is not a multiple of four is padded on the LEFT with zeros, which Section 2 proved harmless — leading zeros never change a value. The error to avoid is blocking from the left and leaving the short block dangling at the right: the five-bit string 10110 pads to 0001 0110 and honestly reads $16_{16} = 22$, but blocked carelessly from the left it would split 1011 and 0 into blocks that mean nothing. Direction is not a style choice; it is where the units live.' },
    { kind: 'algorithm', title: 'The grouped read, line by line', lines: [
      { code: 'block the bits by FOUR from the RIGHT (pad the left with zeros to finish)', note: 'the rightmost block sits on the units — blocking from the right is not optional' },
      { code: 'translate each block through the sixteen-row dictionary (Table 3)', note: '0000 through 1111 map to 0 through F — the only lookup the method needs' },
      { code: 'read the translated digits as ONE hexadecimal numeral', note: 'blocked by three instead of four, the same two lines deliver an octal numeral' },
      { code: 'evaluate it — each hex place is worth 16 times its right-hand neighbour', note: 'one short arithmetic closes the conversion' },
    ], note: 'When it wins: long strings, strings that arrive already blocked (dumps, colour codes, addresses), and any setting where hexadecimal is the house dress.' },
    { kind: 'formula', name: 'The grouped read', latex: '(\\,\\underbrace{b_{4k+3} b_{4k+2} b_{4k+1} b_{4k}}_{h_k} \\;\\cdots\\; \\underbrace{b_3 b_2 b_1 b_0}_{h_0}\\,)_2 = (h_k \\cdots h_1 h_0)_{16}', note: 'Block by four from the right, translate, evaluate: 1111 0101 0010 = F52 = 15 x 256 + 5 x 16 + 2 = 3,922.' },
    { kind: 'terms', items: [
      { term: 'Grouped read', def: 'the shortcut that blocks a binary string by four (hexadecimal) or three (octal), translates each block into a single digit, and evaluates the resulting short numeral.' },
      { term: 'Blocking', def: 'cutting a bit string into equal blocks from the right, padding the left with zeros when the length does not divide evenly.' },
    ] },
    // ================================================================
    // 6. FRACTIONS MIRRORED ACROSS THE BINARY POINT
    // ================================================================
    { kind: 'heading', text: 'Fractions Mirrored Across the Binary Point' },
    { kind: 'para', text: 'Everything so far has read whole numbers, but patterns grow points: a fixed-point field, a scaled measurement, the fractional part of a computed average. The rule extends by exactly one sentence. Places RIGHT of the point count negative powers: the first place past the point weighs $2^{-1} = 0.5$, the next $2^{-2} = 0.25$, the next $2^{-3} = 0.125$, halving rightward without end — a mirror image of the doubling you have been reading all lesson, folded at the point itself. Nothing else changes: a $1$-bit still switches its weight on, a $0$-bit still contributes nothing, and the value is still the sum of the live weights, wherever they sit.' },
    { kind: 'para', text: 'Notice the symmetry before you compute anything, because it is the memory aid: left of the point the weights double as you step left; right of the point they halve as you step right; and the point itself is the frontier where the exponents turn from positive to negative. A fraction with a leading zero before the point — $0.011$, say — is simply an integer half that happens to be empty: the $0$ before the point contributes nothing, exactly as leading zeros never did.' },
    { kind: 'example', title: 'Illustration 10. Read the fraction 0.011 (base 2) as a decimal.', steps: [
      'Take the places right of the point: they weigh $0.5$, $0.25$, $0.125$, halving rightward.',
      'Keep the live weights: the digits are $0$, $1$, $1$, so $0.25$ and $0.125$ are live.',
      'So, the silent weight is $0.5$ — the leading $0$ sits on it — and the $0$ before the point adds nothing either.',
      'Add the live weights: $0.25 + 0.125 = 0.375$.',
      'Hence $0.011_2 = 0.375$, which is exactly three-eighths.',
    ] },
    { kind: 'figure', caption: 'Figure 4. The binary point splits the powers, drawn for 101.11: the integer cells carry the weights 4, 2 and 1, the orange fraction cells carry 0.5 and 0.25, the halves evaluate separately to 5 and to 0.75, and the strip joins them across the point at 5.75.', svg: cf37F5PointSplitSvg() },
    { kind: 'example', title: 'Illustration 11. Read 101.11 (base 2) as a decimal.', steps: [
      'Split at the point: the integer half is $101_2$ and the fraction half is $0.11_2$.',
      'Take the integer half by the weight sum: $101_2 = 4 + 1 = 5$.',
      'Now, the fraction half: $0.11_2 = 0.5 + 0.25 = 0.75$.',
      'So, join them across the point: $5 + 0.75 = 5.75$.',
      'Hence $101.11_2 = 5.75$, the point marking exactly where the exponents turn negative.',
    ] },
    { kind: 'para', text: 'How far can the mirror go? Any finite string of bits right of the point names a sum of distinct negative powers of two, and such a sum is always a fraction whose denominator is a power of two — halves, quarters, eighths, sixteenths. The converse fails, and the failure is famous: one-tenth, one-fifth, any decimal fraction whose denominator hides a factor of five, has no finite binary dress at all, because halving can never manufacture a fifth. That story — the repeating binary point, and what floating-point hardware does about it — belongs to lesson 3.8 and to the chapters beyond it; this lesson only warns you that the mirror has one cracked corner, so that fractions which look short in decimal may run forever in binary.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the dress is not the number', text: 'The numeral $0.11$ in decimal is eleven-hundredths; in binary it is three-quarters. Same dress, different number — the base is part of the meaning, and no pattern is readable until its dress is named. When a question hands you a numeral, first ask which base it wears; the convention in examinations and in this book is that an unmarked numeral is decimal, so a binary or hexadecimal pattern is always flagged with its base, a subscript, or the 0x and # prefixes. The quiz and every exercise below name the base every time; examinations do the same, and when they do not, the complaint belongs to the invigilator.' },
    { kind: 'formula', name: 'The fraction weights', latex: '(\\,0.b_1 b_2 b_3 \\ldots\\,)_2 = b_1\\,2^{-1} + b_2\\,2^{-2} + b_3\\,2^{-3} + \\cdots', note: 'Right of the point the weights halve — 0.5, 0.25, 0.125 — so 0.011 = 0.25 + 0.125 = 0.375 and 101.11 = 5 + 0.75 = 5.75.' },
    { kind: 'terms', items: [
      { term: 'Binary point', def: 'the radix point of a base-two numeral; places to its left carry non-negative powers of two, places to its right carry negative powers.' },
      { term: 'Negative power (fraction weight)', def: 'a weight $2^{-k}$ sitting right of the point: $0.5$, $0.25$, $0.125$, halving rightward without end.' },
    ] },

    // ================================================================
    // 7. THE CENSUS INSTINCT — COUNT THE ONES
    // ================================================================
    { kind: 'heading', text: 'The Census Instinct: Count the Ones' },
    { kind: 'para', text: 'Before you trust any conversion, count. The number of $1$-bits in a pattern — its population count, or popcount — takes one second, needs no arithmetic, and bounds the answer from below so tightly that a misread has nowhere to hide. The instinct belongs at the start of every read and again at the end, and it is worth boxing formally because the bound it gives is a theorem, not a habit.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — population count (popcount)', text: 'The *population count* of a bit string is said to be the number of its $1$-bits. A numeral carrying $k$ ones among $n$ places names a value of at least $2^k - 1$ — the ones hold $k$ distinct weights wherever they sit, and the cheapest $k$ distinct weights are the $k$ smallest — and never more than the $n$-bit ceiling $2^n - 1$. A conversion that lands outside these census walls is wrong before it is checked any further, and a conversion that lands inside them has passed its cheapest test.' },
    { kind: 'example', title: 'Illustration 12. Use the popcount census to bound each witness before converting: 1111, then the 2026 pattern 11111101010.', steps: [
      'Take $1111_2$ first: four ones, so the value is at least $2^4 - 1 = 15$.',
      'So, being all ones, it equals its own floor: $1111_2 = 15$ exactly — nothing more to convert.',
      'Now, the 2026 witness $11111101010_2$: count the ones — six in the leading run, one over the $8$-weight, one over the $2$-weight — eight in all.',
      'Take the walls: the value is at least $2^8 - 1 = 255$ and at most the eleven-bit ceiling $2^{11} - 1 = 2047$.',
      'So, convert and compare: $2026$ sits inside the walls, as every honest answer must.',
      'Hence the census never converts a numeral, but it always testifies for or against the conversion.',
    ] },
    { kind: 'para', text: 'The census has a companion shortcut that doubles as a check on magnitude, and it explains a fact you have already used without proof: APPENDING a bit to the right end of a numeral shifts every existing place up one, so an appended $0$ doubles the value, and an appended $1$ gives twice the value plus one. The reason is nothing more than the weight column sliding: after the append, every old weight is worth the next power up. For example, run the recipe on the four-bit numeral $1101_2 = 13$:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $1101_2 = 13$, and appending a $0$ gives $11010_2 = 26$ — one doubling, one bit of ink.',
      '(ii) $1011_2 = 11$, and appending a $0$ gives $10110_2 = 22$ — the same move on a different pattern.',
      '(iii) $11011_2 = 27 = 2 \\times 13 + 1$ — append a $1$ instead and the recipe reads double-and-add-one.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note — shifting is multiplying', text: 'The append-a-zero rule is the binary dress of a law you have used since you first wrote numbers: appending a 0 to a DECIMAL numeral multiplies it by ten — 7 becomes 70 — because every digit climbs into a place worth ten times more. In base two the same append multiplies by two, and programmers call the move a left shift. It is one of the few arithmetic acts a processor performs with wires alone, no calculation at all — a fact whose circuit-level story belongs to Digital Logic Design, and whose number-level story is now yours.' },
    { kind: 'terms', items: [
      { term: 'Population count (popcount)', def: 'the number of $1$-bits in a bit string; a one-second census bounding a numeral’s value below by $2^k - 1$ when $k$ ones are present.' },
      { term: 'Left shift (doubling shortcut)', def: 'appending a $0$ to the right end of a binary numeral, doubling its value; appending a $1$ instead gives twice the value plus one.' },
    ] },

    // ================================================================
    // 8. CHOOSING THE METHOD — SHAPE DICTATES THE ROAD
    // ================================================================
    { kind: 'heading', text: 'Choosing the Method: Shape Dictates the Road' },
    { kind: 'para', text: 'Three roads, one destination, and a craftsman who knows all three still has to choose. The shape of the numeral decides, and the choice is worth making consciously because examinations ask it directly — not ‘convert this’ but ‘which method suits this, and why’. The timetable below is the honest answer in five rows, and every row’s reason is one clause long.' },
    { kind: 'table', caption: 'Table 4. Which road for which shape — the craftsman’s timetable, each reason stated in one line, with the census as the standing guard over all four roads.', head: ['Numeral shape', 'Apt road', 'Why it wins'], rows: [
      ['Short pattern, up to about eight bits', 'the weight sum', 'the powers are already in the head; the whole grid is visible at a glance'],
      ['Long numeral, sparse ones, no table to hand', 'the doubling ladder', 'one rule, no lookup; most rungs are trivial doublings'],
      ['Long string, or already blocked (dumps, codes, addresses)', 'the grouped read', 'four bits collapse into one hex digit; one short arithmetic closes'],
      ['A point inside the pattern', 'split at the point, weight sum each half', 'integer and fraction weights evaluate separately and meet at the point'],
      ['Any answer, before trusting it', 'the popcount census', 'count the ones and check the value against the census walls'],
    ] },
    { kind: 'para', text: 'The timetable is economy, not law: any road reaches any number, as the place-value theorem guarantees and as this lesson’s engine verified across every eleven-bit pattern before a paragraph of it shipped. But economy is exactly what a working programmer feels: hexadecimal carries the bulk of the long patterns, the doubling sweep handles the stray numerals, and decimal appears at the edges where humans read. When two of your roads disagree, do not average them and do not panic — the number itself never wobbles, so one of the two runs was misapplied; re-run the cheaper road and find the slip. The census, run once before and once after, catches nearly everything.' },
    // ================================================================
    // 9. DOORSTEPS — WHERE THIS LESSON SITS
    // ================================================================
    { kind: 'heading', text: 'Doorsteps: Where This Lesson Sits' },
    { kind: 'para', text: 'This lesson owns one direction of one street: pattern in, number out. Across the street stands lesson 3.6, ‘Decimal to Binary Conversion’, which owns the other direction; both hang directly from lesson 3.2, ‘The Numbering Systems: Binary, Octal, Hexadecimal’, and neither is a prerequisite of the other — climb whichever side your course meets first. Next door stands lesson 3.8, ‘Decimal and Binary Number System’, the synthesis: it sets the two systems side by side and does arithmetic in both, taking both conversion crafts as read. On the wider shelf, two doorstep books wait. ‘Arithmetic and Number Systems’ owns the full number-systems theory — bases in general, positional notation proved rather than assumed, fractions in any base — so this lesson has deliberately borrowed results and left their proofs there. And when bit patterns stop being numbers and become signals, ‘Digital Logic Design’ owns the gate-level view: the circuits that shift, add and count these very patterns, including the wire-only left shift you met a page ago.' },
    { kind: 'para', text: 'One picture closes the lesson, because it is the hinge of the whole conversion craft. Figure 5 sets lesson 3.6’s division ladder and lesson 3.7’s weight sum side by side about the number $45$: on the left the divisions descend — $45$, $22$, $11$, $5$, $2$, $1$ — each leaving a remainder chip, and the chips read bottom-to-top spell $101101$; on the right the same six bits keep their weights — $32$, $8$, $4$, $1$ — and the kept weights climb back to $45$. Two arrows, two directions, one number. This is also the honest answer to a fair question — *why learn both directions?* — because a craftsman who can only descend can still be handed a pattern and left standing.' },
    { kind: 'figure', caption: 'Figure 5. The mirror: lesson 3.6’s division ladder descends from 45 collecting remainder chips that spell 101101 bottom-to-top, while lesson 3.7’s weight sum keeps the weights 32, 8, 4 and 1 and climbs back to the same 45 — one theorem, two directions.', svg: cf37F4MirrorSvg() },

    // ================================================================
    // 10. THE EXAMINATION CORNER
    // ================================================================
    { kind: 'heading', text: 'The Examination Corner' },
    { kind: 'para', text: 'Reading a pattern is examination bench material of the first rank, and it arrives in three dresses. The straight read: a numeral is offered with four decimal options, and the marks go to the sum of live weights. The judgement: which method suits which shape, and why — the ask that Table 4 answers in five rows. The corridor: a hexadecimal or octal pattern stands between you and the decimal, and the grouped read walks you through it. Every one of the three is drilled below, on the pinned witnesses first and on exercise-fresh values after.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — how this lesson is examined', text: 'Banking and SSC computer-awareness papers drill the straight read: a numeral such as 101101 or 110110 appears with four decimal options, and the reversal trap — weights written left-to-right — is their favourite distractor, which is why the Caution in Section 3 is worth a second reading. School boards prefer the byte: eight bits, all live weights named, sometimes with the MSB and LSB identified into the bargain. Cambridge 9618-style and A-level-style papers dress the same craft more widely — a memory dump to interpret, a colour code to unfold, a running trace to complete — but the arithmetic underneath is exactly this lesson’s. Every drill in the practice sets below is OUR OWN, written in the examination idiom and labelled exam-style where it applies; none quotes a real past paper.' },
    { kind: 'para', text: 'How to train for a hall: first make the pinned witnesses reflexes — $101101_2 = 45$ by weights, $110110_2 = 54$ by ladder, $1111\\,0101\\,0010 = 3{,}922$ by blocking, $0.011_2 = 0.375$ across the point, the 2026 witness by either long road. Then drill the fresh values in the practice sets, where no answer is a number you have already met in the prose. And in the hall itself, spend the one second before writing: count the ones, set the census walls, and only then commit the answer to paper — the habit converts a rushed misread into a caught one, and caught misreads are what marks are made of.' },

    // ================================================================
    // 11. CHECK YOUR UNDERSTANDING (quiz)
    // ================================================================
    { kind: 'heading', text: 'Check Your Understanding' },
    { kind: 'para', text: 'Five questions, one from each shoulder of the lesson. Answer before reading the explanations; every wrong option below is a real misreading that some candidate has genuinely made, and each explanation names the trap before it names the cure.' },
    { kind: 'quiz', items: [
      {
        q: 'The pattern 101101 (base 2) names which decimal number?',
        options: ['43', '44', '46', '45'],
        answer: 3,
        explain: 'Keep the weights under the 1-bits: 32 + 8 + 4 + 1 = 45. The option 43 swaps the 4-weight for the 2-weight (32 + 8 + 2 + 1), misreading the fourth bit; 44 stops at 32 + 8 + 4 and forgets the units bit entirely; 46 adds the 2-weight as well (32 + 8 + 4 + 2), the classic reversal-trap read of the final bit. Hence only 45 is the honest sum of the live weights.',
      },
      {
        q: 'In the doubling sweep on 110110 (base 2), what is the running value after four bits?',
        options: ['12', '6', '13', '27'],
        answer: 2,
        explain: 'The ladder runs 1, 3, 6, 13 across the first four bits — double and add each bit as it arrives. The option 12 doubles the 6 but forgets to add the fourth bit’s 1; 6 is the value after only three bits, a stop one rung early; 27 is the value after five bits, one rung too far. Hence the fourth rung reads 13, which is also the value of the prefix 1101.',
      },
      {
        q: 'The twelve-bit string 1111 0101 0010, blocked by four, reads as which hexadecimal numeral?',
        options: ['F42', 'F52', 'E52', '1F5'],
        answer: 1,
        explain: 'Block by four from the right and use the dictionary: 1111 is F, 0101 is 5, 0010 is 2 — so the string spells F52, which evaluates to 3922. The option F42 misreads the middle block 0101 as 4; E52 misreads the leading 1111 as E, which is the block 1110; 1F5 re-blocks the string with wrong boundaries — it would spell 0001 1111 0101, a different string altogether. Hence the blocks spell F52.',
      },
      {
        q: 'What decimal number does the fraction 0.011 (base 2) name?',
        options: ['0.375', '0.11', '0.3', '0.625'],
        answer: 0,
        explain: 'Right of the point the weights halve — 0.5, 0.25, 0.125 — and the live bits keep 0.25 and 0.125, summing to 0.375, exactly three-eighths. The option 0.11 reads the digits as if the dress were decimal; 0.3 is a rounding guess, and no finite binary fraction names 0.3 exactly; 0.625 belongs to the different pattern 0.101, whose live bits are 0.5 and 0.125. Hence 0.011 in base 2 is exactly 0.375.',
      },
      {
        q: 'How many 1-bits does the witness 11111101010 (base 2) carry?',
        options: ['7', '9', '6', '8'],
        answer: 3,
        explain: 'Count the ones: six in the leading run, then the 1 sitting on the 8-weight, then the 1 sitting on the 2-weight — eight in all. The option 7 drops one of the sparse ones; 9 counts a 0-bit as live, adding one that is not there; 6 counts only the leading run and ignores the two stragglers. Hence the popcount is 8, which is also why the value must be at least 2^8 - 1 = 255 — and 2026 clears that wall.',
      },
    ] },

    // ================================================================
    // 12. PRACTICE SETS (15 exercises: L1 x3, L2 x4, L3 x6, L4 x2)
    // ================================================================
    { kind: 'heading', text: 'Practice Sets' },
    { kind: 'para', text: 'Fifteen questions on four rungs. L1 begins: short patterns by the weight sum. L2 consolidates: the doubling ladder and its shift shortcut. L3 advances: the grouped read through hexadecimal and octal, and the fractions across the point. L4 trains the examination idiom — every L4 item is exam-style, an original item written in that idiom, never a quotation from a real paper. Work each solution chain with a pencil, one move per line, and read the figures as the arithmetic drawn; the census belongs at the start and the end of every read.' },
    { kind: 'exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'Read the pattern $1011$ (base 2) as a decimal number by the weight sum, and name the silent weight.',
            solution: [
              'Take the four bits and lay the weights from the right: $8$, $4$, $2$, $1$.',
              'Keep the live weights: the bits are $1$, $0$, $1$, $1$, so $8$, $2$ and $1$ are live.',
              'So, the silent weight is $4$ — the single $0$-bit sits on it and contributes nothing.',
              'Add the live weights: $8 + 2 + 1 = 11$.',
              'Hence $1011_2 = 11$, with only the $4$-weight silent.',
            ],
            answer: '1011 (base 2) = 11 = 8 + 2 + 1; the silent weight is 4.',
          },
          {
            q: 'Read the byte $01010101$ (base 2) by the weight sum.',
            solution: [
              'Lay the eight weights over the byte: $128$, $64$, $32$, $16$, $8$, $4$, $2$, $1$.',
              'Keep the weights under the $1$-bits — the pattern alternates, so the live weights are $64$, $16$, $4$ and $1$.',
              'Drop the silent half: the $0$-bits over $128$, $32$, $8$ and $2$ contribute nothing, and the leading $0$ is harmless padding.',
              'Add: $64 + 16 + 4 + 1 = 85$.',
              'Hence $01010101_2 = 85$.',
            ],
            answer: '01010101 (base 2) = 85 = 64 + 16 + 4 + 1.',
            figures: [
              { caption: 'The weight grid for the byte 01010101: the weights 128 down to 1 stand over the digits, the four 1-bit cells are highlighted with contributions 64, 16, 4 and 1 beneath, and the strip sums them to 85.', svg: cf37SFWeightGrid85Svg() },
            ],
          },
          {
            q: 'A student reads $10011$ (base 2) as $25$. Find the error, give the correct value, and name the check that catches it.',
            solution: [
              'Take the numeral: five bits, so the weights from the right are $16$, $8$, $4$, $2$, $1$.',
              'Spot the error: the student wrote the weights left-to-right — $1$, $2$, $4$, $8$, $16$ — so the ones collected $1 + 8 + 16 = 25$: the reversal trap.',
              'Read honestly: the live weights are those under the $1$-bits, which are $16$, $2$ and $1$.',
              'Add: $16 + 2 + 1 = 19$.',
              'Check the catch: anchor the row at its right end — the units weight $1$ always sits under the LAST digit — and count from the right, always.',
              'Hence $10011_2 = 19$, and the anchor check exposes the $25$ as a reversed read.',
            ],
            answer: '10011 (base 2) = 19 = 16 + 2 + 1; the student reversed the weights (1 + 8 + 16 = 25).',
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Read $110110$ (base 2) by the doubling ladder, showing every rung.',
            solution: [
              'Start at the first bit: $v = 1$.',
              'Now, sweep: $2 \\times 1 + 1 = 3$, then $2 \\times 3 + 0 = 6$ — a zero bit only doubles.',
              'So, the fourth bit lands: $2 \\times 6 + 1 = 13$.',
              'Take the last two rungs: $2 \\times 13 + 1 = 27$, then $2 \\times 27 + 0 = 54$.',
              'Hence $110110_2 = 54$, and the weight sum agrees: $32 + 16 + 4 + 2 = 54$.',
            ],
            answer: '110110 (base 2) = 54; the ladder runs 1, 3, 6, 13, 27, 54.',
            figures: [
              { caption: 'The doubling trace for 110110: six boxes hold the running values 1, 3, 6, 13, 27 and 54 under their bits, each orange arrow carries the rule x2 + bit, and the strip closes at 54.', svg: cf37SFDoubling54Svg() },
            ],
          },
          {
            q: 'Read $101101$ (base 2) twice — once by the weight sum, once by the doubling ladder — and check that the two roads agree.',
            solution: [
              'Take the weight sum first: the live weights are $32$, $8$, $4$, $1$, so $32 + 8 + 4 + 1 = 45$.',
              'Now, the ladder: start $v = 1$, then $2 \\times 1 + 0 = 2$ and $2 \\times 2 + 1 = 5$.',
              'So, continue: $2 \\times 5 + 1 = 11$, then $2 \\times 11 + 0 = 22$, then $2 \\times 22 + 1 = 45$.',
              'Check the census: four ones, so the value is at least $2^4 - 1 = 15$ — and $45$ sits comfortably inside the six-bit ceiling $63$.',
              'Hence both roads read $101101_2 = 45$, the place-value theorem keeping its word.',
            ],
            answer: '101101 (base 2) = 45 by both roads (weights 32 + 8 + 4 + 1; ladder 1, 2, 5, 11, 22, 45).',
          },
          {
            q: 'Read the byte $10011001$ (base 2) by the doubling ladder.',
            solution: [
              'Start: $v = 1$; the two zeros glide through: $2 \\times 1 + 0 = 2$, then $2 \\times 2 + 0 = 4$.',
              'Now, the middle ones land: $2 \\times 4 + 1 = 9$, then $2 \\times 9 + 1 = 19$.',
              'So, two more zeros: $2 \\times 19 = 38$, then $2 \\times 38 = 76$ — doubling past a zero never adds.',
              'Take the final bit: $2 \\times 76 + 1 = 153$.',
              'Hence $10011001_2 = 153$, and the weight sum agrees: $128 + 16 + 8 + 1 = 153$.',
            ],
            answer: '10011001 (base 2) = 153; the ladder runs 1, 2, 4, 9, 19, 38, 76, 153.',
          },
          {
            q: 'The numeral $1101$ (base 2) is read, then a $0$ is appended to its right end, then a second $0$. Give the three values, and say what one append of a $1$ instead would have given.',
            solution: [
              'Take the base: $1101_2 = 8 + 4 + 1 = 13$.',
              'Append a $0$: every existing place shifts up one, so the value doubles — $11010_2 = 26$.',
              'Now, append a second $0$: double again — $110100_2 = 52$.',
              'So, had the first appended bit been a $1$, the recipe reads double-and-add-one: $2 \\times 13 + 1 = 27$.',
              'Check the census along the way: three ones throughout, so every value here is at least $2^3 - 1 = 7$ — and all three clear it.',
              'Hence the three values are $13$, $26$, $52$, and the single appended $1$ would have given $27$.',
            ],
            answer: '13, then 26, then 52; appending a 1 first would have given 27 = 2 x 13 + 1.',
            figures: [
              { caption: 'Appending a 0 bit doubles the value: the panels 1101 = 13, 11010 = 26 and 110100 = 52 stand in a row, each joined by an x 2 arrow, with the appended-1 alternative 27 noted beneath.', svg: cf37SFAppendZeroSvg() },
            ],
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'Read $11011010$ (base 2) by the grouped read, giving the hexadecimal intermediate.',
            solution: [
              'Block by four from the right: $1101\\,1010$.',
              'Take each block through the dictionary: $1101 = \\mathrm{D} = 13$ and $1010 = \\mathrm{A} = 10$.',
              'So, the byte reads as one hexadecimal numeral: $\\mathrm{DA}_{16}$.',
              'Now, evaluate: $13 \\times 16 + 10 = 208 + 10 = 218$.',
              'Hence $11011010_2 = 218$, and the weight sum agrees: $128 + 64 + 16 + 8 + 2 = 218$.',
            ],
            answer: '11011010 (base 2) = DA in hex = 218.',
            figures: [
              { caption: 'The regrouping of 11011010 by four: underbraces block it into 1101 and 1010, the boxes name the hex digits D = 13 and A = 10, and the strip evaluates 13 x 16 + 10 = 218.', svg: cf37SFRegroupDaSvg() },
            ],
          },
          {
            q: 'Read the twelve-bit string $1111\\,0101\\,0010$ (base 2) by the grouped read, and give the decimal value.',
            solution: [
              'Take the blocks as given, four bits each: $1111$, $0101$, $0010$.',
              'Translate through the dictionary: $1111 = \\mathrm{F} = 15$, $0101 = 5$, $0010 = 2$.',
              'So, the string reads as the hexadecimal numeral $\\mathrm{F52}_{16}$.',
              'Now, evaluate: $15 \\times 256 + 5 \\times 16 + 2 = 3840 + 80 + 2 = 3{,}922$.',
              'Check the census: eight ones, so at least $2^8 - 1 = 255$ — and $3{,}922$ clears the wall easily.',
              'Hence $1111\\,0101\\,0010_2 = 3{,}922$.',
            ],
            answer: '1111 0101 0010 (base 2) = F52 in hex = 3,922.',
          },
          {
            q: 'Read $10011101$ (base 2) through OCTAL, showing the blocks, the octal numeral and its evaluation.',
            solution: [
              'Block by three from the right, padding the left with a zero: $010\\,011\\,101$.',
              'Take each block as an octal digit: $010 = 2$, $011 = 3$, $101 = 5$, so the numeral is $235_8$.',
              'Now, evaluate: $2 \\times 64 + 3 \\times 8 + 5 = 128 + 24 + 5 = 157$.',
              'So, the weight sum agrees: $128 + 16 + 8 + 4 + 1 = 157$.',
              'Hence $10011101_2 = 235_8 = 157$.',
            ],
            answer: '10011101 (base 2) = 235 in octal = 157.',
          },
          {
            q: 'Read the fraction $0.101$ (base 2) as a decimal, and say what the leading $0$ before the point contributes.',
            solution: [
              'Take the places right of the point: the weights halve — $0.5$, $0.25$, $0.125$.',
              'Keep the live ones: the digits are $1$, $0$, $1$, so $0.5$ and $0.125$ are live.',
              'So, the silent weight is $0.25$, sitting under the middle $0$.',
              'Add: $0.5 + 0.125 = 0.625$.',
              'Hence $0.101_2 = 0.625$ — five-eighths — and the leading $0$ before the point contributes nothing at all.',
            ],
            answer: '0.101 (base 2) = 0.625 = 0.5 + 0.125; the leading 0 contributes nothing.',
            figures: [
              { caption: 'The point split for 0.101: the weights 0.5, 0.25 and 0.125 stand over the fraction cells, the live contributions 0.5 and 0.125 are highlighted, and the strip sums them to 0.625 while the leading 0 stays silent.', svg: cf37SFPoint01Svg() },
            ],
          },
          {
            q: 'Read $11.101$ (base 2) as a decimal by splitting at the point.',
            solution: [
              'Split at the point: the integer half is $11_2$ and the fraction half is $0.101_2$.',
              'Take the integer half by the weight sum: $11_2 = 2 + 1 = 3$.',
              'Now, the fraction half: $0.101_2 = 0.5 + 0.125 = 0.625$.',
              'So, join the halves across the point: $3 + 0.625 = 3.625$.',
              'Hence $11.101_2 = 3.625$ — twenty-nine eighths, if you prefer the single fraction.',
            ],
            answer: '11.101 (base 2) = 3.625 (= 3 + 0.5 + 0.125).',
          },
          {
            q: 'A stylesheet sets a colour channel to the code #2D. Unfold the code into bits, read it through the dictionary, and give the decimal channel value.',
            solution: [
              'Take the code: two hexadecimal digits, $\\#2\\mathrm{D}$.',
              'Unfold through the dictionary: $2 = 0010$ and $\\mathrm{D} = 1101$, so the byte is $0010\\,1101$.',
              'Now, evaluate the hex: $2 \\times 16 + 13 = 32 + 13 = 45$.',
              'Check in binary: the live weights of $00101101$ are $32$, $8$, $4$, $1$, and $32 + 8 + 4 + 1 = 45$.',
              'Hence #2D names the channel value $45$ — the lesson’s opening witness in hexadecimal dress.',
            ],
            answer: '#2D = 0010 1101 in binary = 45.',
            figures: [
              { caption: 'The colour code 2D unfolded: the byte 0010 1101 blocks by four into the hex digits 2 and D = 13, the strip evaluates 2 x 16 + 13 = 45, and the note recalls 45 as 101101 — the opening witness again.', svg: cf37SFColour2DSvg() },
            ],
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: '(Exam-style.) A memory dump shows the eleven-bit field $11111101010$. Convert it to decimal by the doubling ladder, showing every rung, and bound it with the popcount census before you commit.',
            solution: [
              'Take the census first: eight ones among eleven places, so the value is at least $2^8 - 1 = 255$ and at most the ceiling $2^{11} - 1 = 2047$.',
              'Start the ladder: $v = 1$; the leading run of ones climbs $3$, $7$, $15$, $31$, $63$.',
              'Now, the seventh bit is $0$: $2 \\times 63 = 126$.',
              'So, the eighth lands: $2 \\times 126 + 1 = 253$; the ninth is $0$: $2 \\times 253 = 506$.',
              'Take the tenth: $2 \\times 506 + 1 = 1013$; the eleventh is $0$: $2 \\times 1013 = 2026$.',
              'Check the walls: $2026$ sits inside $255$ to $2047$, and the weight sum agrees — $1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 = 2026$.',
              'Hence the field reads $2026$.',
            ],
            answer: '11111101010 (base 2) = 2026; the ladder runs 1, 3, 7, 15, 31, 63, 126, 253, 506, 1013, 2026.',
            figures: [
              { caption: 'The 2026 witness doubled bit by bit: eleven rows pair each bit chip with its running value and the move that produced it, from the start v = 1 through 2 x 1013 + 0 = 2026, closing at 2026.', svg: cf37SF2026TraceSvg() },
            ],
          },
          {
            q: '(Exam-style.) A listing shows three patterns: (a) $101101$; (b) $11111101010$; (c) $1101\\,1001$, already blocked. For each, name the apt method, convert it, and justify the choice in one line.',
            solution: [
              'Take (a): six bits, short — the weight sum. The live weights are $32$, $8$, $4$, $1$, so $101101_2 = 45$.',
              'Now, (b): eleven bits with a long leading run — the doubling ladder, no table needed.',
              'So, (b) climbs $1$, $3$, $7$, $15$, $31$, $63$, $126$, $253$, $506$, $1013$, $2026$ — the value is $2026$.',
              'Take (c): pre-blocked by four — the grouped read. $1101 = \\mathrm{D} = 13$ and $1001 = 9$, so the field is $\\mathrm{D}9_{16}$.',
              'Now, evaluate (c): $13 \\times 16 + 9 = 208 + 9 = 217$.',
              'Hence the three patterns read $45$, $2026$ and $217$ — each by the road its shape asked for, and each inside its census walls.',
            ],
            answer: '(a) 45 by the weight sum; (b) 2026 by the doubling ladder; (c) D9 in hex = 217 by the grouped read.',
          },
        ],
      },
    ] },

    // ================================================================
    // 13. THE TAKE-AWAY
    // ================================================================
    { kind: 'heading', text: 'The Take-Away' },
    { kind: 'para', text: 'Close the book and keep this much:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) A binary numeral is a sum of powers of two — read it by adding the weights under the 1-bits: $101101_2 = 32 + 8 + 4 + 1 = 45$.',
      '(ii) The doubling ladder needs no table: hold the first bit, then double-and-add each bit — $110110_2$ climbs $1$, $3$, $6$, $13$, $27$, $54$.',
      '(iii) Block by four (or three) and read through hexadecimal (or octal): $1111\\,0101\\,0010 = \\mathrm{F52}_{16} = 3{,}922$.',
      '(iv) The binary point splits positive from negative powers: $101.11_2 = 5 + 0.75 = 5.75$, and $0.011_2 = 0.375$.',
      '(v) Count the ones before you trust anything: the 2026 witness carries eight, so its value was never below $255$.',
      '(vi) Appending a $0$ doubles, appending a $1$ gives $2v + 1$: $1101_2 = 13$ becomes $11010_2 = 26$.',
    ] },
    // __CF37_BLOCKS__
  ],
}


export const chapter3: Chapter = {
  number: 3,
  slug: 'data-representation-first-meeting',
  title: 'Data Representation: a First Meeting',
  summary:
    'Bits, the binary language, and why two symbols carry everything: the numbering systems census (binary, octal and hexadecimal with the conversion craft), codes (ASCII and its characters, BCD), measuring information (bit, byte, KB to the honest SI ladder), text, images and sound as bits (the multimedia ground), and compression as the packing question (lossless versus lossy — what images and audio actually give up). The full theory hands off to Arithmetic and Number Systems and Digital Logic Design.',
  status: 'in-progress',
  lessons: [lesson32, lesson36, lesson37],
  plannedLessons: [
    'Bits: Why Two Symbols Carry Everything',
    'Codes: ASCII, Unicode and BCD',
    'Text, Images and Sound as Bits',
    'Compression: Lossless and Lossy',
    'Decimal and Binary Number System',
  ],
}
