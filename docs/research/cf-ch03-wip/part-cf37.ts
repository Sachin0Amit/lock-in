import type { Lesson } from '../../../src/data/library/types'

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
