import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf31.ts — CS RUN 6 seat cf31 (the WHY lesson).
 *
 * Lesson 3.1 'Bits: Why Two Symbols Carry Everything' of Computer
 * Fundamentals chapter 3 'Data Representation: a First Meeting'. The
 * physical + information ground of the two-symbol alphabet: the
 * two-zone wire and reliability, the bit defined (Shannon 1948 BSTJ,
 * Tukey credited), the powers census 2^0..2^20, counting in two symbols
 * (a first taste only — 3.2/3.6 own the craft), the SI-vs-IEC honest
 * ladder, and the heritage line from Pingala to Shannon. The full
 * number-systems theory rides 'Arithmetic and Number Systems'; the
 * gate-level circuit view rides 'Digital Logic Design'.
 *
 * Every number printed here is pinned green by v-cf31.ts (64 engine
 * checks ran GREEN before this prose was written; the pin block closes
 * the ring). All figures are self-contained computed SVGs in the house
 * palette; every geometry constant is derived, never eyeballed.
 * Study-never-reproduce: every roster, witness, figure, Illustration,
 * quiz item and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const C = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const FONT = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order (x, y, weight, size,
   fill, anchor) so the engine's clip audit can parse every label */
function cf31T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 1 — the two-zone wire vs the ten-zone wire (computed     */
/* zone geometry, one wide moat vs nine narrow ones)                    */
/* ------------------------------------------------------------------ */
function cf31WireSvg(): string {
  const W = 720
  const M = 16
  const ax0 = 60
  const ax1 = 660
  const axW = ax1 - ax0
  const zoneH = 60
  const p1Top = 80
  const mid = (ax0 + ax1) / 2
  const fuzzW = 60
  const z0x = ax0
  const z0w = mid - fuzzW / 2 - ax0
  const z1x = mid + fuzzW / 2
  const z1w = ax1 - z1x
  const p2Top = 250
  const zones = 10
  const zw = axW / zones
  const stripY = 356
  const stripH = 56
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="The two-zone wire versus the ten-zone wire. Top panel: a voltage axis from 0 to 5 volts split into a wide zone labelled means 0, low voltage, and a wide zone labelled means 1, high voltage, with a fuzzy noise band between them and one red decision boundary in the middle. Bottom panel: the same axis split into ten narrow zones, digits 0 through 9, with nine red decision boundaries. A caption strip notes that two zones leave one wide moat that noise must cross half the range to mistake, while ten zones leave nine narrow moats where a tenth of the range suffices.">`)
  s.push(cf31T(mid, 40, 12, C.teal, 'middle', 'THE TWO-ZONE WIRE - ARMOURED', true))
  s.push(cf31T(mid, 74, 9.5, C.tealInk, 'middle', 'noise blurs the middle'))
  s.push(`<rect x="${z0x}" y="${p1Top}" width="${z0w}" height="${zoneH}" rx="8" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
  s.push(cf31T(z0x + z0w / 2, p1Top + 24, 11, C.ink, 'middle', 'means 0', true))
  s.push(cf31T(z0x + z0w / 2, p1Top + 42, 9.5, C.tealInk, 'middle', 'low voltage'))
  s.push(`<rect x="${mid - fuzzW / 2}" y="${p1Top}" width="${fuzzW}" height="${zoneH}" fill="${C.faint}" stroke="${C.teal}" stroke-width="2" stroke-dasharray="4 3"/>`)
  s.push(`<rect x="${z1x}" y="${p1Top}" width="${z1w}" height="${zoneH}" rx="8" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2"/>`)
  s.push(cf31T(z1x + z1w / 2, p1Top + 24, 11, C.ink, 'middle', 'means 1', true))
  s.push(cf31T(z1x + z1w / 2, p1Top + 42, 9.5, C.tealInk, 'middle', 'high voltage'))
  s.push(`<line x1="${mid}" y1="70" x2="${mid}" y2="${p1Top + zoneH + 10}" stroke="${C.warn}" stroke-width="2.5"/>`)
  s.push(`<line x1="${ax0}" y1="${p1Top + zoneH + 10}" x2="${ax1}" y2="${p1Top + zoneH + 10}" stroke="${C.ink}" stroke-width="2"/>`)
  s.push(cf31T(ax0, p1Top + zoneH + 26, 9, C.tealInk, 'start', '0 V'))
  s.push(cf31T(ax1, p1Top + zoneH + 26, 9, C.tealInk, 'end', '5 V'))
  s.push(cf31T(mid, p1Top + zoneH + 46, 10, C.warn, 'middle', 'the ONE decision boundary', true))
  s.push(cf31T(mid, 212, 12, C.teal, 'middle', 'THE TEN-ZONE WIRE - FRAGILE', true))
  for (let k = 0; k < zones; k++) {
    const zx = ax0 + k * zw
    s.push(`<rect x="${zx}" y="${p2Top}" width="${zw}" height="${zoneH}" fill="${k % 2 === 0 ? C.white : C.paper}" stroke="${C.struct}" stroke-width="1.5"/>`)
    s.push(cf31T(zx + zw / 2, p2Top + zoneH / 2 + 4, 12, C.ink, 'middle', String(k)))
  }
  for (let k = 1; k < zones; k++) {
    const bx = ax0 + k * zw
    s.push(`<line x1="${bx}" y1="${p2Top - 10}" x2="${bx}" y2="${p2Top + zoneH + 10}" stroke="${C.warn}" stroke-width="1.5"/>`)
  }
  s.push(cf31T(mid, p2Top + zoneH + 28, 10, C.warn, 'middle', 'nine narrow boundaries - nine chances for noise'))
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelB}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(cf31T(mid, stripY + 22, 10, C.ink, 'middle', 'two zones: ONE wide moat - noise must cross half the range to cause a mistake'))
  s.push(cf31T(mid, stripY + 42, 10, C.tealInk, 'middle', 'ten zones: nine narrow moats - a tenth of the range is already enough'))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 2 — the powers ladder 2^0..2^20 (an even staircase IS    */
/* the exponential; twenty-questions annotation at the top rung)        */
/* ------------------------------------------------------------------ */
function cf31PowersSvg(): string {
  const W = 720
  const M = 16
  const x0 = 34
  const stride = 30
  const barW = 21
  const base = 400
  const unit = 16
  const milestones = [0, 4, 8, 12, 16, 20]
  const values = ['2^0=1', '2^4=16', '2^8=256', '2^12=4,096', '2^16=65,536', '2^20=1,048,576']
  const H = base + 98
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="The powers ladder: twenty-one bars, one for each power of two from 2 to the 0 through 2 to the 20. The bar heights step up evenly, one unit per rung, because each rung is exactly double the one below - an even staircase is the signature of the exponential. Milestone rungs are highlighted: 2 to the 0 is 1, 2 to the 4 is 16, 2 to the 8 is 256, 2 to the 12 is 4,096, 2 to the 16 is 65,536, and 2 to the 20 is 1,048,576. An annotation at the top rung notes that twenty bits name 1,048,576 patterns, just over a million, which is why twenty yes-or-no questions sort a million possibilities.">`)
  s.push(cf31T(W / 2, 30, 12, C.teal, 'middle', 'THE POWERS LADDER - TWENTY-ONE RUNGS, EACH DOUBLE THE LAST', true))
  for (let n = 0; n <= 20; n++) {
    const bx = x0 + n * stride
    const h = (n + 1) * unit
    const isMile = milestones.includes(n)
    s.push(`<rect x="${bx}" y="${base - h}" width="${barW}" height="${h}" rx="3" fill="${isMile ? C.panelA : C.white}" stroke="${isMile ? C.accent : C.struct}" stroke-width="${isMile ? 2.5 : 2}"/>`)
    s.push(cf31T(bx + barW / 2, base - h - 6, 9.5, C.tealInk, 'middle', `2^${n}`))
  }
  s.push(`<line x1="${x0}" y1="${base}" x2="${x0 + 20 * stride + barW}" y2="${base}" stroke="${C.ink}" stroke-width="2"/>`)
  milestones.forEach((n, i) => {
    const cx = x0 + n * stride + barW / 2
    s.push(cf31T(cx, base + 18, 10, C.ink, 'middle', values[i], true))
  })
  s.push(cf31T(W / 2, base + 44, 10.5, C.ink, 'middle', 'the top rung: 20 bits name 1,048,576 patterns - just over a million'))
  s.push(cf31T(W / 2, base + 62, 10, C.tealInk, 'middle', 'twenty yes/no questions sort a million possibilities - the parlor trick IS the power of two'))
  s.push(cf31T(W / 2, base + 82, 9.5, C.tealInk, 'middle', 'bar heights step evenly because each rung doubles - an even staircase is the exponential at work'))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 3 — the SI-vs-IEC ladder: paired bars with the widening  */
/* gap (IEC bar lengths computed from the gap ratios)                   */
/* ------------------------------------------------------------------ */
function cf31LadderSvg(): string {
  const W = 720
  const M = 16
  const rungs = [
    { name: 'the kilo rung', pair: 'kB vs KiB', si: 'SI: 1,000', iec: 'IEC: 1,024', gap: '+2.4%' },
    { name: 'the mega rung', pair: 'MB vs MiB', si: 'SI: 1,000,000', iec: 'IEC: 1,048,576', gap: '+4.8576%' },
    { name: 'the giga rung', pair: 'GB vs GiB', si: 'SI: 1,000,000,000', iec: 'IEC: 1,073,741,824', gap: '+7.3741824%' },
    { name: 'the tera rung', pair: 'TB vs TiB', si: 'SI: 1,000,000,000,000', iec: 'IEC: 1,099,511,627,776', gap: '+9.9511627776%' },
  ]
  const siLen = 380
  const barH = 24
  const barX = 140
  const stride = 92
  const top0 = 64
  const stripY = top0 + rungs.length * stride + 6
  const stripH = 56
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="The honest ladder: SI decimal bars versus IEC binary bars at four rungs. At the kilo rung, 1 kB is 1,000 bytes while 1 KiB is 1,024 bytes, a gap of 2.4 percent. At the mega rung, 1 MB is 1,000,000 while 1 MiB is 1,048,576, a gap of 4.8576 percent. At the giga rung, 1 GB is 1,000,000,000 while 1 GiB is 1,073,741,824, a gap of 7.3741824 percent. At the tera rung, 1 TB is 1,000,000,000,000 while 1 TiB is 1,099,511,627,776, a gap of 9.9511627776 percent. The paired bars look almost alike, and a caption notes that this near-twin look is exactly the trap: the gap widens at every rung.">`)
  s.push(cf31T(W / 2, 34, 12, C.teal, 'middle', 'THE HONEST LADDER - SI BARS VS IEC BARS', true))
  rungs.forEach((r, i) => {
    const top = top0 + i * stride
    const iecLen = siLen * (1 + Math.pow(1.024, i + 1) - 1)
    s.push(cf31T(M + 8, top + 16, 10.5, C.ink, 'start', r.name, true))
    s.push(cf31T(M + 8, top + 32, 9.5, C.tealInk, 'start', r.pair))
    s.push(`<rect x="${barX}" y="${top}" width="${siLen}" height="${barH}" rx="4" fill="${C.white}" stroke="${C.teal}" stroke-width="2"/>`)
    s.push(cf31T(barX + 8, top + 16, 10, C.tealInk, 'start', r.si))
    s.push(`<rect x="${barX}" y="${top + 28}" width="${iecLen.toFixed(2)}" height="${barH}" rx="4" fill="${C.panelA}" stroke="${C.struct}" stroke-width="2"/>`)
    s.push(cf31T(barX + 8, top + 44, 10, C.ink, 'start', r.iec))
    s.push(cf31T(barX + iecLen + 8, top + 44, 10, C.warn, 'start', r.gap, true))
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelB}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(cf31T(W / 2, stripY + 22, 10, C.ink, 'middle', 'the bars look almost alike - that near-twin look is exactly the trap'))
  s.push(cf31T(W / 2, stripY + 42, 10, C.tealInk, 'middle', 'the gap widens every rung: x1.024, then x1.024 again, and again - it compounds'))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 4 — the heritage line: Pingala ~200 BCE -> Leibniz 1703  */
/* -> Boole 1854 -> Shannon 1937/1948 (+ the modern run in the strip)  */
/* ------------------------------------------------------------------ */
function cf31TimelineSvg(): string {
  const W = 720
  const M = 16
  const lineY = 130
  const lx0 = 60
  const lx1 = 660
  const marks = [
    { x: 90, date: '~200 BCE', name: 'Pingala', l1: 'poetry meters', l2: 'as binary rows' },
    { x: 222, date: '1703', name: 'Leibniz', l1: 'binary arithmetic', l2: 'Memoires pp. 85-89' },
    { x: 354, date: '1854', name: 'Boole', l1: 'the algebra of', l2: 'true and false' },
    { x: 486, date: '1937', name: 'Shannon', l1: 'Boolean algebra', l2: 'as circuits' },
    { x: 618, date: '1948', name: 'Shannon + Tukey', l1: 'the bit is born', l2: '(Tukey credited)' },
  ]
  const stripY = 234
  const stripH = 44
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="The heritage line from poetry meters to every chip, as five markers on a line that is not to scale. Pingala, around 200 BCE, listed verse-meter patterns as binary rows. Leibniz, 1703, published binary arithmetic in the Memoires of the Royal Academy of Sciences, pages 85 to 89. Boole, 1854, gave the algebra of true and false. Shannon, 1937, married Boole's algebra to switching circuits in his MIT master's thesis, and in 1948 his Bell System Technical Journal paper built the mathematics of information and printed the word bit, crediting John Tukey. A strip notes the modern run: June 1956 byte on IBM's Stretch, 1964 System/360, December 1998 IEC prefixes.">`)
  s.push(cf31T(W / 2, 34, 12, C.teal, 'middle', 'THE HERITAGE LINE - POETRY METERS TO EVERY CHIP', true))
  s.push(`<line x1="${lx0}" y1="${lineY}" x2="${lx1}" y2="${lineY}" stroke="${C.ink}" stroke-width="2.5"/>`)
  marks.forEach((mk) => {
    s.push(`<circle cx="${mk.x}" cy="${lineY}" r="7" fill="${C.struct}" stroke="${C.ink}" stroke-width="2"/>`)
    s.push(cf31T(mk.x, 106, 11, C.ink, 'middle', mk.date, true))
    s.push(cf31T(mk.x, 156, 10.5, C.ink, 'middle', mk.name, true))
    s.push(cf31T(mk.x, 172, 9.5, C.tealInk, 'middle', mk.l1))
    s.push(cf31T(mk.x, 186, 9.5, C.tealInk, 'middle', mk.l2))
  })
  s.push(cf31T(W / 2, 214, 10, C.tealInk, 'middle', 'not to scale: about nineteen centuries pass between the first two markers'))
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.panelB}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(cf31T(W / 2, stripY + 19, 10, C.ink, 'middle', 'the modern run: June 1956 byte (Stretch) - 1964 System/360 - December 1998 IEC prefixes'))
  s.push(cf31T(W / 2, stripY + 36, 9.5, C.tealInk, 'middle', '1937 + 1948: Shannon marries logic to circuits, then measures information - the bit gets its mathematics'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURES — compact computed SVGs that aid THAT exercise    */
/* solution (0-2 per question, per the v9.0 directive)                */
/* ================================================================== */

/* S1 — the finger register: 6 = 00110 and 9 = 01001 on weighted fingers */
function cf31SolFingersSvg(): string {
  const W = 720
  const weights = [16, 8, 4, 2, 1]
  const shows = [6, 9]
  const fw = 36
  const gap = 14
  const span = 5 * fw + 4 * gap
  const baseY = 160
  const raisedH = 72
  const downH = 36
  const H = 212
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="The finger register with weights sixteen, eight, four, two and one from little finger to thumb. Left panel: the number six raises the four-finger and the two-finger, the pattern zero zero one one zero. Right panel: the number nine raises the eight-finger and the thumb, the pattern zero one zero zero one. Up means one, down means zero, and the raised weights sum to the number shown.">`)
  s.push(cf31T(W / 2, 26, 11, C.teal, 'middle', 'FINGER BITS - WEIGHTS 16, 8, 4, 2, 1, LITTLE FINGER TO THUMB', true))
  s.push(cf31T(W / 2, 44, 9.5, C.tealInk, 'middle', 'up means 1 - down means 0'))
  shows.forEach((n, p) => {
    const cx = p === 0 ? 186 : 534
    const x0 = cx - span / 2
    s.push(cf31T(cx, 64, 10.5, C.ink, 'middle', `the number ${n}: ${n === 6 ? '4 + 2' : '8 + 1'}`, true))
    const pat = weights.map((w) => (n & w ? '1' : '0')).join('')
    s.push(cf31T(cx, 78, 9.5, C.tealInk, 'middle', `pattern ${pat}`))
    weights.forEach((w, i) => {
      const fx = x0 + i * (fw + gap)
      const up = (n & w) !== 0
      const fh = up ? raisedH : downH
      const fy = baseY - fh
      s.push(`<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="7" fill="${up ? C.panelA : C.white}" stroke="${up ? C.accent : C.struct}" stroke-width="2"/>`)
      s.push(cf31T(fx + fw / 2, fy + 16, 12, C.ink, 'middle', up ? '1' : '0', true))
      s.push(cf31T(fx + fw / 2, baseY + 20, 9.5, C.tealInk, 'middle', String(w)))
    })
    s.push(`<line x1="${x0 - 6}" y1="${baseY + 2}" x2="${x0 + span + 6}" y2="${baseY + 2}" stroke="${C.ink}" stroke-width="2"/>`)
    s.push(cf31T(cx, 200, 10, C.ink, 'middle', `raised: ${n === 6 ? '4 + 2 = 6' : '8 + 1 = 9'}`, true))
  })
  s.push('</svg>')
  return s.join('')
}

/* S2 — the information bars: coin 1, die 2.585, card 5.700 on one scale */
function cf31SolEntropySvg(): string {
  const W = 720
  const x0 = 150
  const perBit = 70
  const rows = [
    { label: 'coin (N=2)', bits: 1, val: '1.000 bit', fill: C.white, stroke: C.teal },
    { label: 'die (N=6)', bits: Math.log2(6), val: '2.585 bits', fill: C.panelB, stroke: C.conn },
    { label: 'card (N=52)', bits: Math.log2(52), val: '5.700 bits', fill: C.panelA, stroke: C.accent },
  ]
  const H = 230
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="Information compared on one scale: the coin at one bit, the die at 2.585 bits and the card from a fifty-two card deck at 5.700 bits. Each bar length is log base two of the outcome count, times seventy pixels per bit. The card beats the die by 3.1154772 bits.">`)
  s.push(cf31T(W / 2, 26, 11, C.teal, 'middle', 'INFORMATION BARS - THE COIN, THE DIE AND THE CARD', true))
  s.push(cf31T(W / 2, 44, 9.5, C.tealInk, 'middle', 'one equally likely choice among N outcomes carries log2 N bits'))
  for (let k = 0; k <= 6; k++) {
    const tx = x0 + k * perBit
    s.push(`<line x1="${tx}" y1="58" x2="${tx}" y2="182" stroke="${C.faint}" stroke-width="1.5"/>`)
    s.push(cf31T(tx, 198, 9, C.tealInk, 'middle', String(k)))
  }
  rows.forEach((r, i) => {
    const by = 72 + i * 40
    const len = r.bits * perBit
    s.push(`<rect x="${x0}" y="${by}" width="${len.toFixed(2)}" height="22" rx="4" fill="${r.fill}" stroke="${r.stroke}" stroke-width="2"/>`)
    s.push(cf31T(x0 - 12, by + 16, 10, C.ink, 'end', r.label))
    s.push(cf31T(x0 + len + 8, by + 16, 10, C.ink, 'start', r.val))
  })
  s.push(cf31T(W / 2, 222, 9.5, C.ink, 'middle', 'the card beats the die by 5.7004397 - 2.5849625 = 3.1154772 bits'))
  s.push('</svg>')
  return s.join('')
}

/* S3 — one byte as eight weighted cells; all-ones sums to 255 */
function cf31SolByteSvg(): string {
  const W = 720
  const cw = 56
  const gap = 6
  const span = 8 * cw + 7 * gap
  const x0 = (W - span) / 2
  const cy = 56
  const ch = 56
  const weights = [128, 64, 32, 16, 8, 4, 2, 1]
  const H = 194
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="One byte drawn as eight cells with weights 128, 64, 32, 16, 8, 4, 2 and 1 from left to right, every cell set to 1. The bracket below shows the sum 128 plus 64 plus 32 plus 16 plus 8 plus 4 plus 2 plus 1 equals 255, the largest value a byte can wear, out of the 256 patterns the census grants.">`)
  s.push(cf31T(W / 2, 26, 11, C.teal, 'middle', 'ONE BYTE - EIGHT CELLS, WEIGHTS 128 DOWN TO 1', true))
  weights.forEach((w, i) => {
    const cx = x0 + i * (cw + gap)
    s.push(`<rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="6" fill="${i % 2 === 0 ? C.white : C.paper}" stroke="${C.struct}" stroke-width="2"/>`)
    s.push(cf31T(cx + cw / 2, cy + 32, 13, C.ink, 'middle', '1', true))
    s.push(cf31T(cx + cw / 2, 132, 9.5, C.tealInk, 'middle', String(w)))
  })
  s.push(`<line x1="${x0}" y1="146" x2="${x0 + span}" y2="146" stroke="${C.ink}" stroke-width="1.5"/>`)
  s.push(`<line x1="${x0}" y1="146" x2="${x0}" y2="139" stroke="${C.ink}" stroke-width="1.5"/>`)
  s.push(`<line x1="${x0 + span}" y1="146" x2="${x0 + span}" y2="139" stroke="${C.ink}" stroke-width="1.5"/>`)
  s.push(cf31T(W / 2, 166, 10, C.ink, 'middle', 'all eight cells set: 128+64+32+16+8+4+2+1 = 255, the largest byte', true))
  s.push(cf31T(W / 2, 186, 9.5, C.tealInk, 'middle', 'the census: 2^8 = 256 patterns, naming 0 through 255'))
  s.push('</svg>')
  return s.join('')
}

/* S4 — one KiB vs one kB bars, with the 24-byte tail highlighted */
function cf31SolKiBSvg(): string {
  const W = 720
  const barX = 140
  const unitPx = 0.46
  const kB = 1000 * unitPx
  const KiB = 1024 * unitPx
  const H = 200
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="One kibibyte drawn against one kilobyte. The kilobyte bar runs to 1,000 bytes; the kibibyte bar runs to 1,024 bytes, and the extra 24 bytes appear as a red tail on the end - a gap of plus 2.4 percent at the kilo rung of the honest ladder.">`)
  s.push(cf31T(W / 2, 26, 11, C.teal, 'middle', 'ONE KiB vs ONE kB - THE 24-BYTE TAIL', true))
  s.push(cf31T(600, 46, 9.5, C.tealInk, 'middle', 'the kB bar ends here'))
  s.push(`<line x1="600" y1="52" x2="600" y2="152" stroke="${C.warn}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
  s.push(cf31T(128, 82, 10.5, C.ink, 'end', '1 kB', true))
  s.push(`<rect x="${barX}" y="68" width="${kB.toFixed(2)}" height="22" rx="4" fill="${C.white}" stroke="${C.teal}" stroke-width="2"/>`)
  s.push(cf31T(608, 82, 10, C.tealInk, 'start', '1,000 bytes'))
  s.push(cf31T(128, 134, 10.5, C.ink, 'end', '1 KiB', true))
  s.push(`<rect x="${barX}" y="120" width="${(KiB - kB).toFixed(2)}" height="22" fill="${C.warn}"/>`)
  s.push(`<rect x="${barX}" y="120" width="${KiB.toFixed(2)}" height="22" rx="4" fill="none" stroke="${C.struct}" stroke-width="2"/>`)
  s.push(cf31T(619.04, 134, 10, C.ink, 'start', '1,024 bytes'))
  s.push(`<line x1="605" y1="146" x2="428" y2="152" stroke="${C.warn}" stroke-width="1.5"/>`)
  s.push(cf31T(140, 158, 9.5, C.warn, 'start', 'the red tail: the extra 24 bytes, a gap of +2.4%'))
  s.push(cf31T(W / 2, 176, 9.5, C.tealInk, 'middle', 'both ladders climb from the byte: the decimal one takes 1,000 steps per rung'))
  s.push(cf31T(W / 2, 192, 9.5, C.tealInk, 'middle', 'the binary one takes 1,024 - and the gap compounds at every rung'))
  s.push('</svg>')
  return s.join('')
}

/* S5 — margin comparison: two zones vs sixteen zones on a 0-5 V wire */
function cf31SolMarginSvg(): string {
  const W = 720
  const v0 = 80
  const v1 = 640
  const perV = (v1 - v0) / 5
  const zones = 16
  const zw = (v1 - v0) / zones
  const H = 324
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="Margin comparison on a zero to five volt wire. Top: the two-zone design has one boundary at two and a half volts and a noise margin of 1.25 volts from a zone centre. Bottom: the sixteen-zone design has fifteen boundaries, zones only 0.3125 volts wide, and a centre margin of just 0.15625 volts - one-eighth of the armoured margin. The bottom strip draws both margins to scale.">`)
  s.push(cf31T(W / 2, 26, 11, C.teal, 'middle', 'MARGIN COMPARISON - TWO ZONES vs SIXTEEN ZONES', true))
  s.push(cf31T(v0, 52, 10.5, C.ink, 'start', 'THE TWO-ZONE WIRE', true))
  s.push(`<rect x="${v0}" y="62" width="${(2.5 * perV).toFixed(2)}" height="32" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
  s.push(`<rect x="${v0 + 2.5 * perV}" y="62" width="${(2.5 * perV).toFixed(2)}" height="32" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2"/>`)
  s.push(cf31T(v0 + 1.25 * perV, 84, 10, C.ink, 'middle', 'means 0'))
  s.push(cf31T(v0 + 3.75 * perV, 84, 10, C.ink, 'middle', 'means 1'))
  s.push(`<line x1="${v0 + 2.5 * perV}" y1="54" x2="${v0 + 2.5 * perV}" y2="102" stroke="${C.warn}" stroke-width="2.5"/>`)
  s.push(`<line x1="${v0 + 2.5 * perV}" y1="116" x2="${v0 + 3.75 * perV}" y2="116" stroke="${C.ink}" stroke-width="1.5"/>`)
  s.push(`<polygon points="${v0 + 2.5 * perV},112 ${v0 + 2.5 * perV + 6},116 ${v0 + 2.5 * perV},120" fill="${C.ink}"/>`)
  s.push(`<polygon points="${v0 + 3.75 * perV},112 ${v0 + 3.75 * perV - 6},116 ${v0 + 3.75 * perV},120" fill="${C.ink}"/>`)
  s.push(cf31T(v0 + 3.125 * perV, 134, 9.5, C.ink, 'middle', 'margin 1.25 V'))
  s.push(cf31T(v0, 158, 10.5, C.ink, 'start', 'THE SIXTEEN-ZONE WIRE', true))
  s.push(cf31T(v1, 158, 9.5, C.tealInk, 'end', 'zones 0.3125 V wide'))
  for (let k = 0; k < zones; k++) {
    s.push(`<rect x="${v0 + k * zw}" y="168" width="${zw}" height="32" fill="${k % 2 === 0 ? C.white : C.paper}" stroke="${C.struct}" stroke-width="1.5"/>`)
  }
  for (let k = 1; k < zones; k++) {
    s.push(`<line x1="${v0 + k * zw}" y1="160" x2="${v0 + k * zw}" y2="214" stroke="${C.warn}" stroke-width="1.5"/>`)
  }
  s.push(cf31T(v0, 236, 10, C.ink, 'start', 'THE MARGINS, TO SCALE', true))
  s.push(cf31T(80, 264, 9.5, C.tealInk, 'start', 'two-zone margin'))
  s.push(`<rect x="290" y="252" width="${(1.25 * 200).toFixed(2)}" height="14" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2"/>`)
  s.push(cf31T(548, 264, 9.5, C.ink, 'start', '1.25 V'))
  s.push(cf31T(80, 294, 9.5, C.tealInk, 'start', 'sixteen-zone margin'))
  s.push(`<rect x="290" y="282" width="${(0.15625 * 200).toFixed(2)}" height="14" fill="${C.white}" stroke="${C.warn}" stroke-width="2"/>`)
  s.push(cf31T(329, 294, 9.5, C.ink, 'start', '0.15625 V'))
  s.push(cf31T(W / 2, 316, 9.5, C.ink, 'middle', 'the armoured margin is eight times wider: 1.25 / 0.15625 = 8'))
  s.push('</svg>')
  return s.join('')
}

/* S6 — the twenty-questions bracket on a line */
function cf31SolBracketSvg(): string {
  const W = 720
  const ax0 = 80
  const ax1 = 640
  const ay = 110
  const marks = [
    { x: 200, name: '2^19', val: '524,288', hot: false },
    { x: 380, name: 'a million', val: '1,000,000', hot: true },
    { x: 560, name: '2^20', val: '1,048,576', hot: false },
  ]
  const H = 196
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="The twenty-questions bracket on a line: a million sits beyond two to the nineteenth, which is 524,288, and under two to the twentieth, which is 1,048,576. Nineteen questions cannot cover a million; twenty always suffice, because twenty answers carry twenty bits.">`)
  s.push(cf31T(W / 2, 26, 11, C.teal, 'middle', 'THE TWENTY-QUESTIONS BRACKET', true))
  s.push(cf31T(W / 2, 44, 9.5, C.tealInk, 'middle', 'a million sits between the nineteenth and twentieth powers of two'))
  s.push(`<rect x="200" y="96" width="360" height="28" fill="${C.faint}"/>`)
  s.push(`<line x1="${ax0}" y1="${ay}" x2="${ax1}" y2="${ay}" stroke="${C.ink}" stroke-width="2.5"/>`)
  marks.forEach((m) => {
    s.push(`<circle cx="${m.x}" cy="${ay}" r="${m.hot ? 7 : 6}" fill="${m.hot ? C.accent : C.struct}" stroke="${m.hot ? C.warn : C.ink}" stroke-width="2"/>`)
    s.push(cf31T(m.x, 94, 10, C.ink, 'middle', m.name, true))
    s.push(cf31T(m.x, 136, 9.5, C.tealInk, 'middle', m.val))
  })
  s.push(cf31T(W / 2, 166, 10, C.ink, 'middle', '2^19 = 524,288 < 1,000,000 <= 2^20 = 1,048,576', true))
  s.push(cf31T(W / 2, 186, 9.5, C.tealInk, 'middle', 'twenty answers carry 20 bits, and 20 bits name exactly 2^20 patterns'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* the lesson                                                          */
/* ================================================================== */
export const lesson31: Lesson = {
  id: 'cf-bits-why-two-symbols-carry-everything',
  number: '3.1',
  title: 'Bits: Why Two Symbols Carry Everything',
  concepts: [
    'the two-symbol alphabet and the noise margin',
    'the bit as the unit of information',
    'the powers-of-two census 2^0 to 2^20',
    'the byte: eight bits, 256 patterns',
    'counting in binary - a first taste',
    'SI decimal versus IEC binary prefixes',
    'the heritage line from Pingala to Shannon',
  ],
  objectives: [
    'By the end of this lesson you can explain why two symbols, not ten, survive on a noisy wire — the noise-margin argument told in plain words, with the arithmetic of wide moats and narrow ones.',
    'By the end of this lesson you can define the bit as the information in one choice between two equally likely outcomes, and compute the information of a coin flip, a die roll and a drawn card with the logarithm rule.',
    'By the end of this lesson you can recite the powers-of-two census from $2^0$ to $2^{20}$ and state how many patterns $n$ bits name.',
    'By the end of this lesson you can state the byte relation — one byte is eight bits is 256 patterns — and tell its history from Buchholz\u2019s 1956 coinage to System/360.',
    'By the end of this lesson you can count far enough in binary to see the odometer rule at work, and read finger patterns as bits: 32 states on one hand, 1,024 on two.',
    'By the end of this lesson you can distinguish kB from KiB all the way to TB from TiB, computing the widening gaps, and place the bit\u2019s heritage from Pingala to Shannon on a dated line.',
  ],
  prerequisites: ['cf-the-basic-structure-and-operation-of-the-computer', 'cf-input-devices-the-human-handshake'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ================================================================
    // 1. THE QUESTION
    // ================================================================
    { kind: 'heading', text: 'The Question: the Smallest Possible Alphabet' },
    { kind: 'para', text: 'Chapter 1 gave you the machine as a map: processor, memory, input and output, all joined by buses. Chapter 2 stood at the boundary and took a census of the handshakes — and every single act, from a keystroke to a photograph to a song, crossed IN as numbers. The keyboard sent codes; the mouse sent counts; the scanner sent grids of measured light; the microphone sent streams of measured pressure. The census closed on a quiet, enormous promise: whatever a computer does, it does to numbers. This chapter opens the parcel and asks the question that must come first: what are those numbers MADE of?' },
    { kind: 'para', text: 'Ask it concretely. A machine needs an alphabet — some set of marks it can hold, move and tell apart, out of which every number (and, as later lessons show, every letter, colour and sound) is built. How small can that alphabet be? A child, proud of counting on ten fingers, might guess ten marks. An engineer with a meter in hand gives a starker answer: two. Not because two is clever, and certainly not because two is rich — two is the POOREST alphabet imaginable — but because two is what a physical device can tell apart with total reliability, and reliability is the one thing a machine cannot buy back later.' },
    { kind: 'para', text: 'This lesson is the WHY lesson. It walks, in order: the two-zone wire, which shows why two symbols win the reliability argument; the bit, defined properly as a quantity of information; the powers-of-two census from $2^0$ to $2^{20}$, the multiplication table of the machine; the byte, the working bundle of eight; a first taste of counting in two symbols, enough to see the odometer rule; the honest measurement ladder from bits to terabytes, where SI and IEC prefixes part ways; and the heritage line, from Sanskrit poetry meters to the paper that named the bit. Along the way it keeps two promises at the door: the full theory of number systems is taught in the mathematics book \u2018Arithmetic and Number Systems\u2019, and the gate-level circuit view in \u2018Digital Logic Design\u2019. This chapter keeps only the first meeting.' },
    { kind: 'callout', tone: 'insight', title: 'Note — a meeting, not a drill', text: 'This lesson answers WHY two symbols, and it builds your number sense for powers of two. The CRAFT is deliberately deferred: lesson 3.2 meets the four numbering systems; lesson 3.6 owns the dividing-by-two conversion craft; lesson 3.7 owns the reading craft; lesson 3.8 gathers the map. Meet the idea here; drill the craft there.' },

    // ================================================================
    // 2. THE TWO-ZONE WIRE
    // ================================================================
    { kind: 'heading', text: 'The Two-Zone Wire: Why Two Symbols Win' },
    { kind: 'para', text: 'Begin with the most ordinary object in computing: a wire. It carries a voltage — an electrical pressure, which you may picture as a water level in a pipe. The receiver at the far end must decide what the sender meant. The naive plan is seductive: let the voltage SPELL the digits. Divide the range into ten zones and let each zone name one digit, so a single wire carries a whole decimal digit at once. On paper this is elegant. In metal it is fragile, and the reason is noise.' },
    { kind: 'para', text: 'Noise is the permanent weather of the electrical world: heat jiggles the electrons, neighbouring wires induce stray currents, connectors corrode, distance itself smears the signal. The voltage that arrives is never exactly the voltage that was sent. Now count the places where a mistake can live. Every boundary between two zones is a cliff: a signal meant for one zone that wobbles across the boundary is read as the OTHER zone, and the error is silent — the receiver has no way to know. A ten-zone wire has nine such cliffs. A two-zone wire has exactly one. Fewer cliffs, fewer mistakes: this is the whole argument, and everything else in the lesson stands on it.' },
    { kind: 'figure', caption: 'The two-zone wire versus the ten-zone wire. Two zones leave ONE wide moat: noise must drag the voltage across half the entire range to turn a 0 into a 1. Ten zones leave nine narrow moats, where a tenth of the range already suffices — which is why the ten-zone plan, though it carries more per symbol, lost.', svg: cf31WireSvg() },
    { kind: 'para', text: 'Put numbers on the moats, because the argument deserves arithmetic, not adjectives. Suppose the wire\u2019s range runs from $0$ to $5$ volts. Split into two equal zones and each zone is $5/2 = 2.5$ volts wide; split into ten and each is $5/10 = 0.5$ volts wide — five times narrower. A sender resting in the MIDDLE of its zone enjoys a noise margin of half the zone width: $1.25$ volts of safety on the two-zone wire, but only $0.25$ volts on the ten-zone wire. The two-zone margin is five times the ten-zone margin. Or chase the temptation to its end: sixteen zones would buy four bits per symbol (you will soon compute why), but each zone shrinks to $5/16 = 0.3125$ volts and fifteen cliffs need guarding. Every extra zone buys bits with margin — and margin is the coin noise spends to eat your data.' },
    { kind: 'para', text: 'So the machine\u2019s alphabet is the poorest one: TWO marks. Call them what the wire calls them — low and high. Call them what the magnet calls them — north and south. Call them what a punched card calls them — hole and no hole. Every carrier computing has ever used, from relay contacts to flash memory cells, offers this same sturdy fork, and each use of it carries one binary choice. The names differ; the count is always two.' },
    { kind: 'terms', items: [
      { term: 'noise margin', def: 'the width of quiet water between a signal\u2019s resting value and the nearest decision boundary; the bigger the margin, the more noise a link forgives.' },
      { term: 'decision boundary', def: 'the threshold value at which a receiver changes its verdict about what was sent; every boundary between zones is one place a mistake can silently live.' },
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note — the circuit view has its own book', text: 'This lesson argues with moats and margins, deliberately without circuit theory: no transistors, no thresholds in volts beyond our two examples. HOW engineers build receivers that slice a wire into zones — the amplifier, the comparator, the logic family — is the province of \u2018Digital Logic Design\u2019 on the engineering shelf. Here we only need the conclusion those circuits deliver: two zones, one cliff, wide moats.' },

    // ================================================================
    // 3. THE BIT, DEFINED
    // ================================================================
    { kind: 'heading', text: 'The Bit, Defined' },
    { kind: 'para', text: 'One two-way choice deserves its own unit of measure, the way heat has the calorie and length the metre. The unit is astonishingly young for something so fundamental — it was printed for the first time in 1948 — and it is astonishingly small: it is the amount of information in ONE choice between TWO equally likely outcomes.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — bit', text: 'A **bit** is said to be the amount of information carried by one choice between two equally likely outcomes. Symbolically, a choice among $N$ equally likely outcomes carries $I = \\log_2 N$ bits, so the two-outcome choice carries $\\log_2 2 = 1$ bit — the unit is its own first example.' },
    { kind: 'para', text: 'Read the formula calmly, for it is friendlier than it looks. If an event has $N$ equally likely outcomes, then learning WHICH one happened removes uncertainty, and the measure of that removal is $\\log_2 N$ bits. The logarithm is exactly the dial this job needs: it counts how many times you must DOUBLE to reach $N$ — that is, how many two-way choices, taken one after another, sort $N$ possibilities down to one.' },
    { kind: 'equation', latex: 'I = \\log_2 N \\quad \\text{bits} \\tag{1}', note: 'The information in one equally likely choice among N outcomes. The unit is chosen so that the two-outcome choice measures exactly 1.' },
    { kind: 'example', title: 'Illustration 1. A signalling engineer can squeeze sixteen voltage zones onto a wire. How many bits does one sixteen-zone symbol carry, and what does the honest two-zone design trade away?', steps: [
      'Take the zone count as the outcome count: one symbol chooses among $N = 16$ zones, so $I = \\log_2 16$.',
      'Ask how many doublings reach 16: $2 \\to 4 \\to 8 \\to 16$, which is four, so $\\log_2 16 = 4$ — one rich symbol carries 4 bits.',
      'Compare with the two-zone wire: $\\log_2 2 = 1$, so each of ITS symbols carries just 1 bit.',
      'So, the trade is $4 - 1 = 3$ bits per symbol surrendered — the price of wide moats and a single cliff.',
      'Hence sixteen zones would buy 4 bits per symbol; the armoured two-zone design carries 1 and spends the difference on reliability.',
    ] },
    { kind: 'para', text: 'Now weigh the classic random events on this scale. Each is one question with equally likely answers, so each is a direct reading of the formula:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) a fair coin: two equally likely faces, so one flip is exactly one binary choice — 1 bit, no more, no less;',
      '(ii) one fair die: six equally likely faces, so one throw carries log2 6 = 2.5849625 bits — about 2.585, between two and three flips;',
      '(iii) one card drawn from a well-shuffled 52-card deck: log2 52 = 5.7004397 bits — about 5.700, a little more than five flips;',
      '(iv) two dice thrown together: 36 equally likely pairs, and log2 36 = 5.1699250 — exactly double the single die, because information from independent events ADDS.',
    ] },
    { kind: 'example', title: 'Illustration 2. A fair coin is flipped once and the outcome is announced. How much information does the announcement carry?', steps: [
      'Take the event: two equally likely outcomes, heads or tails, so $N = 2$.',
      'Apply the rule: $I = \\log_2 2 = 1$.',
      'Check the unit\u2019s meaning: one binary question — "is it heads?" — settles the matter completely, whatever the answer.',
      'Hence the announcement carries exactly 1 bit: the unit is its own first example.',
    ] },
    { kind: 'example', title: 'Illustration 3. One fair die is thrown. How much information lands on the table? Give the value to three decimal places.', steps: [
      'Take the event: six equally likely faces, so $N = 6$.',
      'Bracket it first: $2^2 = 4 < 6 < 8 = 2^3$, so the answer must lie between 2 and 3 bits.',
      'Compute: $I = \\log_2 6 = 2.584962500721156 \\ldots$',
      'Round as asked: $2.585$ bits — one die throw is worth about two and a half coin flips.',
      'Hence the throw carries $\\log_2 6 \\approx 2.585$ bits, bracketed neatly between two and three.',
    ] },
    { kind: 'example', title: 'Illustration 4. One card is drawn from a well-shuffled 52-card deck. (a) How much information does the draw carry? (b) How many yes/no questions are needed to name the card? (c) Why do the two answers differ?', steps: [
      'Take part (a): fifty-two equally likely cards, so $I = \\log_2 52 = 5.700439718141092 \\ldots$',
      'Round: about $5.700$ bits — the honest, fractional information content.',
      'Take part (b): whole questions are whole chunks, so ask for the smallest $n$ with $2^n \\ge 52$: $2^5 = 32 < 52 \\le 64 = 2^6$, so $n = 6$ questions.',
      'Take part (c): five questions sort only 32 possibilities — not enough; the sixth question is asked of a batch of at most 64, so part of its power is wasted.',
      'Hence the draw carries about $5.700$ bits, yet naming the card needs $6$ whole questions — information is exact, questions come in chunks.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — 1948, the year the bit was printed', text: 'The mathematics of information was built by Claude Shannon of Bell Laboratories in \u2018A Mathematical Theory of Communication\u2019, published in the Bell System Technical Journal in two parts, July and October 1948. That paper formally introduced the word **bit** for the unit — and, honest to its bones, it credited the suggestion of the name to the mathematician John W. Tukey. The word is a shortening of **binary digit**, and it arrived with its meaning already fixed by the formula you just used.' },
    { kind: 'para', text: 'Here is the parlor trick that makes the definition feel like magic, and it IS the power of two wearing a coat. You think of anything at all — one person in a city, one word in a book. A friend asks questions answerable only YES or NO. Each answer is one bit, so $n$ answers deliver $n$ bits, and $n$ bits sort among $2^n$ possibilities. Twenty questions therefore sort among $2^{20} = 1{,}048{,}576$ possibilities — OVER a million, with twenty syllables of effort. The trick is not clever questioning; it is arithmetic.' },
    { kind: 'derivation', title: 'The twenty-questions bound', statement: 'Show that $n$ yes/no questions can single out one item from at most $2^n$ possibilities, and find the least number of questions needed for a million.', steps: [
      { label: 'One question halves the field', formula: 'N \\to N/2', explanation: 'a yes/no answer splits any list into the items it confirms and the items it denies; a skilled questioner halves the count with every answer.' },
      { label: 'Stack the halvings', formula: 'N \\to N/2 \\to N/4 \\to \\cdots \\to N/2^n', explanation: 'after n answers the survivors number N divided by 2 to the n, so a single survivor needs the field to be at most 2 to the n.' },
      { label: 'State the bound', formula: '2^{n-1} < M \\le 2^{n}', explanation: 'to single out one of M items, take the smallest n for which 2 to the n reaches M.' },
      { label: 'Apply it to a million', formula: '2^{19} = 524{,}288 < 1{,}000{,}000 \\le 1{,}048{,}576 = 2^{20}', explanation: 'nineteen questions sort only 524,288 possibilities — not enough; twenty reach past a million.' },
    ], result: 'So twenty yes/no questions sort $2^{20} = 1{,}048{,}576$ possibilities, and twenty is the least number that covers a million — the parlor trick is the census of the powers of two.' },
    { kind: 'example', title: 'Illustration 5. A magician offers to identify any one person in a city of a million, asking only yes/no questions. How many questions are enough, and why not fewer?', steps: [
      'Take the field: $M = 1{,}000{,}000$ possibilities.',
      'Bracket with the powers: $2^{19} = 524{,}288$, too small; $2^{20} = 1{,}048{,}576$, comfortably larger than a million.',
      'So, twenty questions suffice — each answer keeps one of two halves, and twenty halvings cut a million down past one.',
      'Check why not fewer: nineteen answers distinguish at most $524{,}288$ possibilities, leaving pairs of citizens the magician cannot tell apart.',
      'Hence 20 questions — because $2^{19} < 10^6 \\le 2^{20}$.',
    ] },
    { kind: 'formula', name: 'The question bound', latex: '2^{n-1} < M \\le 2^{n}', note: 'The least number of yes/no questions that singles out one of M items: climb the census until two to the n covers M. A million needs 20 questions, a billion 30, a trillion 40.' },
    { kind: 'terms', items: [
      { term: 'bit', def: 'the unit of information: the amount carried by one choice between two equally likely outcomes; short for binary digit, the name printed by Shannon\u2019s 1948 paper on Tukey\u2019s suggestion.' },
      { term: 'information content', def: 'of an event with N equally likely outcomes, the value log2 N in bits; independent events contribute amounts that add.' },
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — a bit is a quantity, not a thing', text: 'The bit is a MEASURE, like the litre or the gram. You cannot hold a bit, only a carrier of one: a voltage on a wire, a magnetic direction, a charge in a cell, a hole in a card. Saying "store a bit" is like saying "pour a litre" — the words name an amount, and some physical thing must do the holding. Keep measure and carrier apart and half the confusions of this subject never begin.' },

    { kind: 'formula', name: 'The information rule', latex: 'I = \\log_2 N\\ \\text{bits}', note: 'One equally likely choice among N outcomes carries log base two of N bits: the coin 1, the die 2.5849625, the card 5.7004397 — and independent choices add.' },

    // ================================================================
    // 4. THE POWERS CENSUS
    // ================================================================
    { kind: 'heading', text: 'The Powers Census: Two to the Zero Through Two to the Twenty' },
    { kind: 'para', text: 'One bit names two things: the pattern $0$ and the pattern $1$. Two bits name four: $00$, $01$, $10$, $11$. Nobody has to decree this — it is forced, and the forcing is worth watching once, closely, because it is the multiplication table of the entire machine world.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the doubling law', text: 'If $n$ bits name $P(n)$ patterns, and each bit is free to be $0$ or $1$ independently, then $P(n) = 2^n$: every added bit doubles the census, and the largest value a pattern can name is $2^n - 1$.' },
    { kind: 'derivation', title: 'Why n bits name two-to-the-n patterns', statement: 'Prove the doubling law from the definition of a bit pattern.', steps: [
      { label: 'Open with one bit', formula: 'P(1) = 2', explanation: 'a single bit shows 0 or 1 — two patterns, counted directly.' },
      { label: 'Add one bit to a finished pattern bank', formula: 'P(n+1) = 2 \\times P(n)', explanation: 'take every existing pattern and pair it with the new bit in each of its two states; each old pattern begets two new ones, and nothing is missed or doubled.' },
      { label: 'Climb the ladder', formula: 'P(n) = 2 \\times 2 \\times \\cdots \\times 2 = 2^n', explanation: 'starting from 2 and doubling n minus 1 times leaves a product of n twos.' },
      { label: 'Read off the largest wearer', formula: '2^n - 1', explanation: 'patterns name the whole numbers from 0, so the largest value is one short of the census — the all-ones pattern.' },
    ], result: 'So $n$ bits name exactly $2^n$ patterns, largest wearer $2^n - 1$ — a law with no exceptions, from one bit to a memory chip.' },
    { kind: 'equation', latex: 'N = 2^n \\tag{2}', note: 'The census law: n independent two-way cells name two-to-the-n patterns. Read it aloud whenever you meet a bit width — the width tells you the census without further work.' },
    { kind: 'para', text: 'Here is the census itself, every rung from $2^0$ to $2^{20}$, with the landmarks this course will keep meeting. Do not memorise it as a list; read it as a staircase where every step doubles, and let your eye learn the SHAPES — the round thousands at the powers of ten never quite coincide with the powers of two, which is the seed of the honest ladder late in this lesson.' },
    { kind: 'table', caption: 'The powers census from 2^0 to 2^20 — the multiplication table of the machine.', head: ['n', '2 to the n', 'value', 'landmark'], rows: [
      ['0', '$2^{0}$', '1', 'the empty purse - every wheel shows 0'],
      ['1', '$2^{1}$', '2', 'one bit: the readings 0 and 1'],
      ['2', '$2^{2}$', '4', 'two flips name four outcomes'],
      ['3', '$2^{3}$', '8', 'three flips; a pattern of three'],
      ['4', '$2^{4}$', '16', 'a nibble-worth of patterns'],
      ['5', '$2^{5}$', '32', 'one hand of five finger-bits'],
      ['6', '$2^{6}$', '64', 'six flips'],
      ['7', '$2^{7}$', '128', 'seven flips; a census 3.3 will meet as ASCII'],
      ['8', '$2^{8}$', '256', 'one byte'],
      ['9', '$2^{9}$', '512', 'nine flips'],
      ['10', '$2^{10}$', '1,024', 'one KiB; two hands; ten flips'],
      ['11', '$2^{11}$', '2,048', 'two KiB'],
      ['12', '$2^{12}$', '4,096', 'twelve flips'],
      ['13', '$2^{13}$', '8,192', 'one KiB measured in bits'],
      ['14', '$2^{14}$', '16,384', 'two KiB measured in bits'],
      ['15', '$2^{15}$', '32,768', 'fifteen flips'],
      ['16', '$2^{16}$', '65,536', 'two bytes; the classic 64 K'],
      ['17', '$2^{17}$', '131,072', 'seventeen flips'],
      ['18', '$2^{18}$', '262,144', 'eighteen flips'],
      ['19', '$2^{19}$', '524,288', 'just under a million'],
      ['20', '$2^{20}$', '1,048,576', 'one MiB; twenty questions'],
    ] },
    { kind: 'figure', caption: 'The powers ladder. Bar heights step up EVENLY — one unit per rung — because each rung is exactly double the one below: an even staircase is the signature of an exponential. The top rung carries the twenty-questions annotation: 2^20 = 1,048,576, just over a million.', svg: cf31PowersSvg() },
    { kind: 'example', title: 'Illustration 6. Read three entries off the census and say what they buy: eight bits, sixteen bits, twenty bits. Then explain why twenty is the magic number for the parlor trick.', steps: [
      'Take the widths to the census: eight bits name $2^8 = 256$ patterns — one byte\u2019s worth.',
      'Sixteen bits name $2^{16} = 65{,}536$ — two bytes, the classic 64 K.',
      'Twenty bits name $2^{20} = 1{,}048{,}576$ — just over a million, which is why twenty yes/no questions sort a city of a million.',
      'Check the magic: $2^{19} = 524{,}288$ falls short of a million, so nineteen answers would leave citizens indistinguishable.',
      'Hence 256, 65,536 and 1,048,576 — and twenty questions because a million sits between $2^{19}$ and $2^{20}$.',
    ] },
    { kind: 'para', text: 'One rung deserves a special bow because you will meet it at every turn in later chapters: thirty-two bits. The census says $2^{32} = 4{,}294{,}967{,}296$ patterns — over four billion. Vendors say "four giga" and the phrase is honest shorthand, but notice the arithmetic quietly hiding in it: the SI giga is exactly $10^9 = 4{,}000{,}000{,}000$-worth of a four-prefix count, and the 32-bit census exceeds four SI giga by $294{,}967{,}296$ — almost three hundred million patterns of headroom. When a machine is described as "32-bit", this is the census being named: the width of its natural pattern, and hence the size of its address book.' },
    { kind: 'terms', items: [
      { term: 'power of two', def: 'a number of the form 2 to the n: 1, 2, 4, 8, 16 and so on; the census of what n bits can name, doubling at every rung.' },
      { term: 'bit pattern', def: 'a fixed row of bits, read as one symbol; n bits give 2 to the n distinct patterns, naming 0 through 2 to the n minus 1.' },
    ] },

    // ================================================================
    // 5. THE BYTE
    // ================================================================
    { kind: 'heading', text: 'The Byte: Eight Bits Become the Working Unit' },
    { kind: 'para', text: 'A single bit is a fine unit and a clumsy tool: one yes/no answer will not spell a letter, a digit, or anything a human wants to read. Machines therefore bundle bits into a standard parcel — not because mathematics demands a parcel, but because engineering wants ONE size of drawer, one width of pathway, one unit of memory priced and sold.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — byte', text: 'A **byte** is said to be a group of eight bits, treated as one working unit. Symbolically, $1$ byte $= 8$ bits, so one byte names $2^8 = 256$ patterns, the largest being $11111111_2 = 255$.' },
    { kind: 'equation', latex: '1\\ \\text{byte} = 8\\ \\text{bits} = 2^8 = 256\\ \\text{patterns} \\tag{3}', note: 'The byte relation — the single most quoted line of computer awareness. 256 is also a perfect square, 16 squared, which is why one byte wears exactly two hexadecimal digits: a bridge lesson 3.2 crosses.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — June 1956, a word is coined', text: 'The word **byte** was coined by Werner Buchholz in June 1956 on IBM\u2019s Stretch project, when a name was needed for the smallest addressable parcel of the machine. The size was not settled on the day of the coinage — machines of that era experimented with different widths — but the 8-bit byte won decisively with IBM\u2019s System/360 in 1964, eight years later, and the whole industry inherited the drawer as we know it.' },
    { kind: 'para', text: 'Why eight, of all widths? Partly accident of history, partly quiet arithmetic. Eight bits give 256 patterns — room for the alphabet in upper and lower case, the digits, punctuation and the accents of many languages, which is exactly the census lesson 3.3 will meet as the ASCII era; and 8 is a power of two, so a byte splits neatly into two four-bit nibbles and wears exactly two hexadecimal digits. The half-byte even earned its own cozy name:' },
    { kind: 'terms', items: [
      { term: 'byte', def: 'a group of eight bits treated as one working unit; 256 patterns, largest 255; coined by Werner Buchholz in June 1956 on IBM\u2019s Stretch project and standardised by System/360 (1964).' },
      { term: 'nibble', def: 'half a byte: four bits, naming 16 patterns — one hexadecimal digit\u2019s worth, as lesson 3.2 will show.' },
      { term: 'word', def: 'the machine\u2019s natural wider bundle of bytes — 32-bit and 64-bit words are common today; unlike the byte, the word\u2019s width varies by design and is NOT a fixed number.' },
    ] },
    { kind: 'example', title: 'Illustration 7. A small controller has eight input wires, each carrying one bit. How many distinct patterns can the bank of wires show, and what is the largest count it can spell?', steps: [
      'Take the census law: eight independent two-way wires name $2^8$ patterns.',
      'Compute: $2^8 = 256$ distinct patterns.',
      'Find the largest wearer: patterns name 0 upwards, so the top is $2^8 - 1 = 255$, worn by $11111111_2$.',
      'Check the weights: $128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255$ — the all-ones byte.',
      'Hence 256 patterns, largest count 255: one byte\u2019s census, worn by a bank of eight wires.',
    ] },
    { kind: 'formula', name: 'One byte', latex: '1\\ \\text{byte} = 8\\ \\text{bits}', note: 'The working bundle of the machine: 256 patterns to a byte, largest 255 — the relation every examination loves to ask.' },
    { kind: 'formula', name: 'The naming power of n bits', latex: '2^{n}\\ \\text{patterns}', note: 'Every added bit doubles the census; the largest wearer is one short of it, 2 to the n minus 1.' },

    // ================================================================
    // 6. COUNTING IN TWO SYMBOLS
    // ================================================================
    { kind: 'heading', text: 'Counting in Two Symbols: the Odometer With Two Marks' },
    { kind: 'terms', items: [
      { term: 'binary', def: 'the two-symbol way of writing numbers, using only the digits 0 and 1; the machine\u2019s native dress for every value it holds.' },
      { term: 'odometer rule', def: 'the counting law of every positional system: advance the units wheel; when it cannot move further, snap it to 0 and carry one step to the next wheel left.' },
    ] },
    { kind: 'para', text: 'You have counted in ten marks all your life, so smoothly that the machinery is invisible. Make it visible by shrinking the alphabet. Picture a car\u2019s odometer — a row of wheels, each showing one digit, the rightmost spinning fastest. Now build the same machine with wheels that carry only TWO marks, 0 and 1. Counting runs exactly as it always has: advance the rightmost wheel; when a wheel cannot advance, it snaps to 0 and passes a carry to its left neighbour. Only the alphabet changed — and the count now walks $0, 1, 10, 11, 100, 101, 110, 111, 1000 \\ldots$' },
    { kind: 'algorithm', title: 'The two-mark odometer — advancing one step', lines: [
      { code: 'carry <- 1', note: 'to advance the count, try to add one at the units wheel' },
      { code: 'i <- 0', note: 'i names the wheel being visited, starting at the units end' },
      { code: 'while carry = 1 and i < w:', note: 'the ripple runs only while a wheel rolls over' },
      { code: '    if wheel[i] = 0:', note: 'a wheel showing 0 can absorb the incoming carry' },
      { code: '        wheel[i] <- 1', note: 'the 0 flips to 1' },
      { code: '        carry <- 0', note: 'and the ripple stops right here' },
      { code: '    else:', note: 'a wheel already showing 1 cannot absorb anything' },
      { code: '        wheel[i] <- 0', note: 'the 1 rolls over to 0' },
      { code: '        i <- i + 1', note: 'and the carry passes to the next wheel on the left' },
    ], note: 'Terminates: every wheel flip either stops the carry or moves it one wheel left, so after at most w wheels it falls off the end — which is exactly 111...1 rolling over to 1000...0.' },
    { kind: 'para', text: 'Run the machine by hand for the first eleven counts and SAY the story of each reading — the flips, the rolls, the carries. Notice especially what happens at 7 and at 8:' },
    { kind: 'table', caption: 'Counting zero to ten on the two-mark odometer.', head: ['count', 'two-mark dress', 'the odometer\u2019s story'], rows: [
      ['0', '0', 'every wheel rests'],
      ['1', '1', 'the units wheel flips up'],
      ['2', '10', 'units rolls over; the twos wheel flips up'],
      ['3', '11', 'units flips up again'],
      ['4', '100', 'units and twos both roll; the fours wheel appears'],
      ['5', '101', 'units flips up'],
      ['6', '110', 'units rolls; the twos wheel flips'],
      ['7', '111', 'all three wheels show 1 — the fullest three-wheel state'],
      ['8', '1000', 'the great triple roll; the eights wheel appears'],
      ['9', '1001', 'units flips up'],
      ['10', '1010', 'units rolls; the twos wheel flips'],
    ] },
    { kind: 'example', title: 'Illustration 8. Run the two-mark odometer forward: what reading follows 111, and what follows 101? Explain the rule both times.', steps: [
      'Take $111$: every wheel shows its top mark, so no wheel can absorb the carry.',
      'Hence all three wheels roll to 0 and the carry falls off the end, growing the reading: the next count is $1000$.',
      'Now, take $101$: the units wheel shows 1 and cannot advance, but the twos wheel shows 0 and can.',
      'So, units rolls to 0, the carry lands on the twos wheel, which flips to 1: the next count is $110$.',
      'Hence after $111$ comes $1000$ (the great roll) and after $101$ comes $110$ (an ordinary carry) — one rule, two moods.',
    ] },
    { kind: 'para', text: 'One beautiful identity falls out of the odometer, and it explains WHY every all-ones reading is one short of a power of two. The largest $n$-wheel reading is $111 \\ldots 1$ ($n$ ones), and its value is $2^{n-1} + 2^{n-2} + \\cdots + 2 + 1$ — every power up to the top, once each. Add one more and the cascade rolls the whole row over to $1$ followed by $n$ zeros, which is $2^n$. So the sum of all the powers below $2^n$ is exactly $2^n - 1$: for twenty wheels, $2^0 + 2^1 + \\cdots + 2^{19} = 2^{20} - 1 = 1{,}048{,}575$. The odometer does not merely display numbers; it displays the census.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the craft lives in later lessons', text: 'This section is a first taste, watched deliberately from the odometer\u2019s seat. The systematic craft of reading and writing binary numerals — place value, the four-base family, conversion by division — is owned by lessons 3.2, 3.6 and 3.7, and the full theory of number systems belongs to \u2018Arithmetic and Number Systems\u2019 on the mathematics shelf. From here on, this lesson only needs you to COUNT.' },

    // ================================================================
    // 7. FINGER COUNTING
    // ================================================================
    { kind: 'heading', text: 'Finger Counting: Five Bits on One Hand' },
    { kind: 'para', text: 'The oldest binary machine is attached to your wrist. Let each finger be a bit — up means 1, down means 0 — and give the fingers weights from thumb outward, or the reverse; the convention is yours, the arithmetic is not. One hand is five bits, so the census law hands you $2^5 = 32$ states: with five fingers you can count from 0 to 31, a trick shepherds of old lands used to count flocks to dusk and back. Two hands are ten bits: $2^{10} = 1{,}024$ states, enough to count every seat in a small cinema on your knuckles.' },
    { kind: 'example', title: 'Illustration 9. Using finger-bits weighted 16, 8, 4, 2, 1 from little finger to thumb, show how to raise the number 6, the number 9, and the largest one-hand number. How many states does the full two-hand register hold?', steps: [
      'Take the weights in order: little finger 16, ring 8, middle 4, index 2, thumb 1.',
      'Build 6 as the sum of available weights: $6 = 4 + 2$, so the middle and index fingers rise and the rest stay down — the pattern 00110.',
      'Build 9 the same way: $9 = 8 + 1$, ring finger and thumb — the pattern 01001.',
      'Now, the largest: every finger up gives $16 + 8 + 4 + 2 + 1 = 31$, the pattern 11111 — one short of $2^5 = 32$, exactly as the census promises.',
      'Hence 6 is 00110, 9 is 01001, the largest is 31; and two hands, ten bits, hold $2^{10} = 1{,}024$ states.',
    ] },
    { kind: 'para', text: 'Notice what your fingers just did, without naming it: a pattern of ONES AND ZEROS stood for a number, each position carrying its own weight, the value being the SUM of the weights over the raised fingers. That is positional notation in miniature — the entire idea of lesson 3.2 — seen here from the cheap seats. When 3.2 unfolds the full place-value anatomy, you will recognise every limb of it.' },

    // ================================================================
    // 8. THE HONEST LADDER (SI vs IEC)
    // ================================================================
    { kind: 'heading', text: 'The Honest Ladder: from Bits to Terabytes' },
    { kind: 'para', text: 'You now own three instruments: the pattern (a row of bits), the byte (eight of them, 256 patterns), and the census law that converts widths into counts. But real artefacts are measured in bigger parcels — a photograph is a few million bytes, a film runs to billions, a data centre holds trillions — and humanity owns TWO ladders for naming those parcels. They differ by a whisker at the bottom and by nearly ten percent at the top, and the entire difference flows from one awkward fact: ten is not a power of two. This section teaches both ladders honestly, because a computer-awareness examination will ask you to tell them apart, and because a shopper who cannot tell them apart cannot even read a hard-drive box.' },
    { kind: 'para', text: 'The first ladder is SI — the Système International, the metre-and-kilogram people. Its prefixes step by thousands: one kilobyte (kB) is 1,000 bytes; one megabyte (MB) is 1,000,000; one gigabyte (GB) is 1,000,000,000; one terabyte (TB) is 1,000,000,000,000 — each rung a clean three more zeros, the way kilometres step from metres. The second ladder is binary and was born of engineering habit: memory chips are woven in powers of two, so the natural “kilo” for a memory engineer was the nearest power of two, $2^{10} = 1{,}024$. From that habit came the unofficial readings “1 KB = 1,024 bytes”, “1 MB = 1,048,576”, and so on — readings so convenient that daily speech still uses them, and so AMBIGUOUS that a standards body eventually had to act.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the IEC binary prefixes', text: 'A **binary prefix** is said to be a multiplier of the form $2^{10k}$, named kibi (Ki), mebi (Mi), gibi (Gi) and tebi (Ti) for $k = 1, 2, 3, 4$. The standard IEC 60027-2 approved them in December 1998 to end the ambiguity: $1$ KiB $= 2^{10} = 1{,}024$ bytes, $1$ MiB $= 2^{20} = 1{,}048{,}576$, $1$ GiB $= 2^{30} = 1{,}073{,}741{,}824$, $1$ TiB $= 2^{40} = 1{,}099{,}511{,}627{,}776$ — the tell-tale “-bi-” in each name marking the binary branch of the ladder.' },
    { kind: 'para', text: 'Set the two ladders side by side and MEASURE the disagreement — never wave hands at it. At the kilo rung the binary reading exceeds the decimal by $1{,}024 - 1{,}000 = 24$ bytes, which is $+2.4\\%$. At the mega rung: $1{,}048{,}576 - 1{,}000{,}000 = 48{,}576$ bytes, or $+4.8576\\%$. At the giga rung: $73{,}741{,}824$ bytes, or $+7.3741824\\%$. At the tera rung: $99{,}511{,}627{,}776$ bytes, or $+9.9511627776\\%$ — the binary reading is very nearly TEN PERCENT larger. The table and the figure below carry the four rungs; both are computed, and both should be read as one law wearing four dresses, not as four facts to memorise.' },
    { kind: 'table', caption: 'The honest ladder — SI decimal against IEC binary, with the widening gap.', head: ['rung', 'SI (decimal)', 'IEC (binary)', 'difference', 'gap'], rows: [
      ['kilo', '1 kB = 1,000 B', '1 KiB = 1,024 B', '24 B', '+2.4%'],
      ['mega', '1 MB = 1,000,000 B', '1 MiB = 1,048,576 B', '48,576 B', '+4.8576%'],
      ['giga', '1 GB = 1,000,000,000 B', '1 GiB = 1,073,741,824 B', '73,741,824 B', '+7.3741824%'],
      ['tera', '1 TB = 1,000,000,000,000 B', '1 TiB = 1,099,511,627,776 B', '99,511,627,776 B', '+9.9511627776%'],
    ] },
    { kind: 'figure', caption: 'The honest ladder drawn to scale: at each rung the IEC bar is longer than the SI bar by another factor of 1.024. The near-twin look is exactly the trap — the gap compounds from 2.4% at the kilo rung to nearly ten percent at the tera rung.', svg: cf31LadderSvg() },
    { kind: 'para', text: 'Why does the gap WIDEN as you climb? Because each rung multiplies the disagreement by another 1.024. The kilo rung is off by the factor $1{,}024/1{,}000 = 1.024$; the mega rung squares that factor; the giga rung cubes it; the tera rung takes it to the fourth power. This is compounding — the same arithmetic that turns a small interest rate into a large one over long terms — and it deserves a derivation, because examinations ask for the gaps as numbers and you should be able to regenerate every one of them from a single ratio.' },
    { kind: 'derivation', title: 'Why the gap compounds', statement: 'Show that the gap between the IEC and SI readings at the k-th rung of the ladder is exactly $(1.024^{k} - 1) \\times 100\\%$, and read off the four pinned rungs.', steps: [
      { label: 'Write both rungs as powers', formula: '\\text{IEC}_k = 2^{10k}, \\quad \\text{SI}_k = 10^{3k}', explanation: 'the k-th binary rung is two to the ten-k, and the k-th decimal rung is ten to the three-k — each ladder climbs by its own step, k times over.' },
      { label: 'Divide the readings', formula: '\\frac{\\text{IEC}_k}{\\text{SI}_k} = \\left( \\frac{1024}{1000} \\right)^{\\!k} = 1.024^{k}', explanation: 'the ratio of powers is the power of the ratio: $2^{10k} / 10^{3k} = (2^{10} / 10^{3})^{k} = 1.024^{k}$.' },
      { label: 'Subtract the unit', formula: '\\text{gap}_k = (1.024^{k} - 1) \\times 100\\%', explanation: 'the gap is the excess of the binary reading over the SI reading, expressed as a percentage of the SI reading.' },
      { label: 'Read the four rungs', formula: '2.4,\\ 4.8576,\\ 7.3741824,\\ 9.9511627776', explanation: 'raising 1.024 to the powers one through four gives the four pinned gaps — the tera rung sits a whisker under ten percent.' },
    ], result: 'So the gap at rung $k$ is $(1.024^{k} - 1) \\times 100\\%$: $+2.4\\%$, $+4.8576\\%$, $+7.3741824\\%$, $+9.9511627776\\%$ — compounding, not coincidence.' },
    { kind: 'equation', latex: 'g_k = \\left( \\frac{2^{10k}}{10^{3k}} - 1 \\right) \\times 100\\% = (1.024^{k} - 1) \\times 100\\% \\tag{4}', note: 'The gap law of the honest ladder: rung k multiplies the disagreement by another 1.024. Substitute k = 1, 2, 3, 4 and the four pinned gaps fall out in one line.' },
    { kind: 'example', title: 'Illustration 10. A file is advertised as exactly 1 MB, meaning the SI megabyte. How many kibibytes does it occupy, and is the answer a whole number?', steps: [
      'Take the SI reading: 1 MB means $1{,}000{,}000$ bytes — the decimal ladder, not the binary one.',
      'Convert to KiB: divide by $1{,}024$, since one kibibyte is exactly $1{,}024$ bytes.',
      'Compute: $1{,}000{,}000 / 1{,}024 = 976.5625$ exactly — the division terminates because $10^{6} = 2^{6} \\times 5^{6}$ supplies only six twos, and the four missing twos leave a sixteenth in the denominator.',
      'So, the file occupies $976.5625$ KiB — NOT a whole number, which is the everyday signature of the ladder mismatch.',
      'Hence 976.5625 KiB: a round SI million is a fraction on the binary ladder.',
    ] },
    { kind: 'para', text: 'The most famous casualty of the two ladders is the hard-drive box. A manufacturer selling “1 TB” is speaking pure SI — $10^{12}$ bytes, honestly counted — but the operating system, raised on the binary habit, divides that by $2^{30}$ to label the drive in gibibytes. The arithmetic: $10^{12} / 2^{30} = 931.32$ GiB to two decimals. The buyer who expected “a thousand” sees roughly 931 and feels robbed of 68.68 GiB. Nobody stole anything: the two numbers are the SAME bytes in two dress sizes. Modern systems increasingly print the honest GiB label beside the count, which is precisely what the December 1998 standard hoped for.' },
    { kind: 'example', title: 'Illustration 11. An honest 1 TB drive (exactly 10 to the 12 bytes) is labelled by a binary-thinking system. What size does the system report, and how far is that below a round thousand?', steps: [
      'Take the drive size in bytes: $10^{12}$ — the SI tera, as printed on the box.',
      'Convert to GiB: divide by $2^{30} = 1{,}073{,}741{,}824$ bytes per gibibyte.',
      'Compute: $10^{12} / 2^{30} = 931.3225746 \\ldots$, which prints as $931.32$ GiB to two decimals.',
      'Take the shortfall from the round thousand: $1{,}000 - 931.32 = 68.68$ GiB.',
      'Hence the system reports about 931.32 GiB — 68.68 GiB below the round thousand, all of it a units dispute, none of it missing.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — read the unit before you multiply', text: 'Examination papers and shop shelves both trade on the ambiguity. When a question writes “1 KB”, ask which ladder is meant: the SI reading is 1,000 bytes; the binary reading — properly written KiB since December 1998 — is 1,024. When YOU answer, do the same service for the reader: write kB for the decimal rung, KiB for the binary one, and never let a bare “K” do double duty. The double-letter endings are your friend: kibi, mebi, gibi, tebi — binary, unambiguous, standard.' },
    { kind: 'terms', items: [
      { term: 'SI prefix', def: 'a decimal multiplier from the International System of Units: kilo 10 to the 3, mega 10 to the 6, giga 10 to the 9, tera 10 to the 12 — steps of a thousand.' },
      { term: 'IEC binary prefix', def: 'a multiplier of two to the 10k approved by IEC 60027-2 in December 1998: kibi (Ki) 1,024; mebi (Mi) 1,048,576; gibi (Gi) 1,073,741,824; tebi (Ti) 1,099,511,627,776.' },
    ] },

    // ================================================================
    // 9. THE HERITAGE LINE
    // ================================================================
    { kind: 'heading', text: 'The Heritage Line: from Poetry Meters to Every Chip' },
    { kind: 'para', text: 'The two-symbol alphabet feels like a mid-twentieth-century invention, because the WORD for its unit is one — “bit”, 1948 — but the underlying idea is old enough to have been written in Sanskrit. This section places the lesson on a dated line, told honestly: some dates on that line are firm, one is debated, and the retelling here is our own.' },
    { kind: 'para', text: 'The earliest known systematic listing of binary patterns belongs to Sanskrit prosody — the study of verse meter. The Chandaḥśāstra of Pingala, dated by scholars to around 200 BCE (the dates are debated, and we say so plainly), enumerates the patterns of short and long syllables in a verse meter: each syllable is one of TWO marks, and a meter of $n$ syllables runs through the same census $2^{n}$ you met earlier in this lesson. Pingala counted the patterns LEFT TO RIGHT, and the tradition around this work carries an early use of the word śūnya — the void, zero — as a placeholder. Poetry wanted the census roughly nineteen centuries before engineering needed it.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — circa 200 BCE, poetry arrives first', text: 'Pingala’s Chandaḥśāstra (Sanskrit prosody; the usual scholarly date is circa 200 BCE, though the dating is debated) lists verse-meter patterns as combinations of two marks — short and long syllables — effectively enumerating binary rows, counted left to right, with an early use of śūnya for zero in the surrounding tradition. We retell this as mathematics history, not as a claim that Pingala built a computer: the census was wanted for poetry first, and the machinery had to wait for the twentieth century.' },
    { kind: 'para', text: 'The modern line opens with Gottfried Wilhelm Leibniz, who published his binary arithmetic in 1703 as ‘Explication de l’arithmétique binaire’ in the Mémoires de l’Académie Royale des Sciences (pp. 85–89) — one hundred fifty-one years before the next landmark. In 1854 George Boole published ‘An Investigation of the Laws of Thought’, giving two-valued logic — true and false — the dignity of algebra. In 1937 Claude Shannon, then a master’s student at MIT, married the two traditions: his thesis showed that Boole’s algebra describes switching circuits, so logic could be BUILT in metal. Eleven years later, in 1948, the same Shannon published the mathematical theory of information in the Bell System Technical Journal — and that paper printed the word bit, crediting Tukey. The distance from poetry meters to the name of the unit is roughly nineteen centuries; the distance from Boole to the bit is ninety-four years. That is the shape of this history: an old idea, young machinery.' },
    { kind: 'figure', caption: 'The heritage line, not to scale: about nineteen centuries separate Pingala from Leibniz, then the pace quickens — 1703, 1854, 1937, 1948 — with the modern run (June 1956 byte on Stretch, 1964 System/360, December 1998 IEC prefixes) gathered in the strip.', svg: cf31TimelineSvg() },
    { kind: 'para', text: 'Read the line as a lesson about ideas, each step answering a different question with the same two marks: the CENSUS of two-symbol patterns (Pingala), the ARITHMETIC of two symbols (Leibniz, 1703), the LOGIC of two values (Boole, 1854), the CIRCUIT that realises the logic (Shannon, 1937), and the MEASURE of information (Shannon, 1948). Five steps, twenty-one centuries, one alphabet. When lesson 3.3 meets character codes and later lessons meet sound and storage, you are walking the last few inches of this line.' },

    // ================================================================
    // 10. THE DOORSTEP
    // ================================================================
    { kind: 'heading', text: 'The Doorstep: Where the Full Theory Lives' },
    { kind: 'para', text: 'Two books stand at the door of this chapter, and this lesson keeps its promises to both. The full theory of number systems — bases, place value, the arithmetic of reading and writing numerals in any base, the conversion crafts — is owned by ‘Arithmetic and Number Systems’ on the mathematics shelf; this chapter meets the idea and defers the drill. The gate-level view — how transistors slice a wire into zones, how logic families earn their noise margins — is owned by ‘Digital Logic Design’ on the engineering shelf; this lesson argued with moats and boundaries and stopped at the metal. Everything chapter 3 does next — characters, images, sound, storage — assumes only what this lesson built: two symbols, the census, the byte.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the doorstep test', text: 'Before moving on, you should be able to pass this doorstep test without notes: say WHY two symbols win on a noisy wire; compute the information of a coin, a die and a card; recite the census to two to the twentieth; state the byte relation with its history; count to ten on the two-mark odometer; and convert a drive-box tera into gibibytes. If any line of that list feels shaky, the section above it is short — that is the design.' },

    // ================================================================
    // 11. EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Exam Corner: What Examinations Ask of This Lesson' },
    { kind: 'callout', tone: 'exam', title: 'Exam note — where this lesson is examined', text: 'The five facts of this lesson are staples of banking and SSC computer-awareness papers, of school-board introductions to data representation, and of Cambridge 9618-style foundations. The asks below are OUR OWN exam-style wording, honestly labelled — none is quoted from a real paper. Expect: (i) the bit–byte relation — 8 bits, 256 patterns; (ii) the kB/KiB distinction with the IEC names and the December 1998 standard; (iii) the powers-of-two census, asked as “how many distinct values can n bits represent”; (iv) the Shannon 1948 BSTJ paper with the Tukey credit; (v) the Buchholz June 1956 coinage of byte on Stretch, settled by System/360 in 1964. Ladder arithmetic — converting MB to KiB, or TB to GiB — appears as short numericals; the heritage line appears as one-mark matches.' },
    { kind: 'para', text: 'Answer these asks the way this lesson taught them: with the census law, not with memorised tables. “How many distinct values can a 16-bit register hold?” is $2^{16} = 65{,}536$ — the width is the exponent, and the census law does the rest. “Will a 2 GB file fit on a drive sold as 2,000,000,000 bytes?” is a ladder question wearing a story: state the ladder, state the unit, then divide. And if a banking-style paper writes a bare “KB”, the expected reading is usually the binary 1,024 — while a Cambridge-style paper expects you to know BOTH readings and to say which one you used. The safe habit everywhere is the same: name the unit, name the ladder, then compute.' },
    { kind: 'para', text: 'This lesson set out to answer one question — what are the numbers of chapter 2 made of? — and the answer arrived in two parts. Physically, they are made of two symbols, because two symbols are what a noisy wire can tell apart forever: one wide moat instead of nine narrow ones. Informationally, they are made of BITS, the unit that counts choices, doubling the census at every added position. The next lesson picks up the odometer and teaches the craft properly: the four numbering systems of the machine world, and the passages between them.' },

    /* CF31-TAIL-2: quiz + exercises appended below */

    // ================================================================
    // 12. THE QUIZ (five items, key [1, 2, 0, 3, 1])
    // ================================================================
    { kind: 'quiz', title: 'Check yourself — five questions, one correct option each', items: [
      { q: 'The word “bit” was formally introduced in Claude Shannon’s 1948 paper in the Bell System Technical Journal. To whom does that paper credit the SUGGESTION of the name?',
        options: [
          'Claude Shannon himself, in a footnote of the July part',
          'John W. Tukey, the mathematician credited by name in the paper',
          'Werner Buchholz, the coiner of the word “byte” in 1956',
          'George Boole, whose 1854 algebra named the two values',
        ],
        answer: 1,
        explain: 'Option A fails because the paper does not keep the credit for its own author: it names another person as the source of the word. Option B is correct — the 1948 paper formally introduced the word bit and credited the suggestion of the name to the mathematician John W. Tukey. Option C fails twice over: Buchholz coined BYTE, not bit, and he did so in June 1956 on IBM’s Stretch project, eight years AFTER the 1948 paper appeared. Option D fails because Boole died in 1864; his 1854 Laws of Thought named the two truth values of logic, not the unit of information, which had to wait for the 1948 mathematics of communication.' },
      { q: 'You use one hand as a binary counter: each of the five fingers is a bit, up meaning 1 and down meaning 0. How many states does the full hand span?',
        options: [
          '16 states — four bits are all a hand can carry',
          '25 states, since five fingers give five squared combinations',
          '32 states, from 0 to 31, because five bits name 2 to the 5 = 32 patterns',
          '64 states, from 0 to 63, doubling the one-hand census',
        ],
        answer: 2,
        explain: 'Option A fails because sixteen is the census of FOUR bits, and a five-fingered hand carries five two-way cells. Option B fails because the count is not five squared: independent two-way cells multiply as powers of two, so five fingers give five factors of two, not a square of five. Option C is correct — five bits name 2 to the 5 = 32 patterns, so the hand spans exactly 32 states, counting 0 through 31, with all five fingers raised showing 31. Option D fails because 64 is the SIX-bit census; the register that grows beyond one hand is the two-hand register, and ten bits give 1,024 states, not 64.' },
      { q: 'Which ONE of these statements about the measurement ladder is true?',
        options: [
          '1 GiB exceeds 1 GB, because 2 to the 30 = 1,073,741,824 is larger than 10 to the 9',
          '1 GiB is simply the older spelling of 1 GB, and the two are equal',
          '1 GiB is smaller than 1 GB, which is why drive labels shrink',
          '1 GiB equals 2 to the 20 bytes, one mebibyte’s worth',
        ],
        answer: 0,
        explain: 'Option A is correct: the gibibyte is the binary rung, 1,073,741,824 bytes, which beats the decimal gigabyte’s 1,000,000,000 by exactly 73,741,824 bytes, a gap of +7.3741824%. Option B fails because the IEC names were approved in December 1998 precisely BECAUSE the two readings differ; kibi, mebi, gibi and tebi are not spellings of one value but a separate, binary ladder. Option C fails because it inverts the arithmetic: the binary rung is the LARGER one at every rung — drive labels shrink only because the same bytes are being divided by a bigger unit. Option D fails because 2 to the 20 bytes is one MEBIbyte (1,048,576 bytes); the gibi rung is 2 to the 30.' },
      { q: 'A quizmaster may ask questions answerable only YES or NO. What is the LARGEST number of possibilities that twenty such questions can always sort down to a single item?',
        options: [
          '524,288 — nineteen answers’ worth of halvings',
          'Exactly 1,000,000, the size of the classic parlor trick’s field',
          '20 factorial, since the questions can be ordered in that many ways',
          '1,048,576, since twenty answers carry 2 to the 20 patterns',
        ],
        answer: 3,
        explain: 'Option A fails because 524,288 is 2 to the 19 — the reach of NINETEEN questions; the twentieth doubling is exactly what carries the count past a million. Option B fails because a million sits between two powers of two: 2 to the 19 is 524,288, too small, while 2 to the 20 is 1,048,576, so twenty questions do more than sort a million — they reach past it. Option C fails because the order of asking is irrelevant to the count; the information lives in the ANSWERS, each one bit, not in permutations of the questions. Option D is correct: twenty answers carry twenty bits, and twenty bits name 2 to the 20 = 1,048,576 patterns — that is the bound the census law fixes.' },
      { q: 'The word “byte” was coined in June 1956 by Werner Buchholz. On which project was he working at the time?',
        options: [
          'IBM System/360, the machine that standardised the 8-bit byte',
          'IBM’s Stretch project, where a name was needed for the smallest addressable parcel',
          'The ENIAC project at the University of Pennsylvania',
          'Bell Laboratories’ switching-circuit research programme',
        ],
        answer: 1,
        explain: 'Option A fails on the dates: System/360 belongs to 1964, eight years after the coinage — that machine SETTLED the eight-bit byte but did not name it. Option B is correct: Buchholz coined byte in June 1956 on IBM’s Stretch project, needing a word for the smallest group of bits the machine could address as one parcel. Option C fails because the ENIAC era of the mid-1940s predates the coinage by about a decade, and that machine worked in decimal, not in bytes. Option D fails because Bell Laboratories’ contribution to this story is Shannon’s 1948 information theory in the Bell System Technical Journal; the byte was born at IBM, on Stretch.' },
    ] },

    // ================================================================
    // 13. THE GRADED EXERCISES (15 questions across L1..L3)
    // ================================================================
    { kind: 'para', text: 'The graded sets below drill every witness of this lesson. L1 checks the definitions cold; L2 works them fluently; L3 is the stretch tier, and its two questions marked (Exam-style) are OUR OWN compositions in the register of banking/SSC computer-awareness and Cambridge-style foundations — honestly labelled, never quoted from any real paper. Work each solution line by line; the diagrams sit inside the questions they serve.' },
    { kind: 'exercises', title: 'Graded practice — three levels, fifteen questions', sets: [
      { level: 'L1', questions: [
        { q: 'A fair coin is tossed three times and the sequence of heads and tails is written down in order. How many distinct sequences are possible, and how much information does the full sequence carry?',
          solution: [
            'Take the tosses as independent two-way choices: each one contributes exactly one bit.',
            'So, three tosses give $3 \\times 1 = 3$ bits of information in total.',
            'Apply the census law: $3$ bits name $2^{3} = 8$ distinct patterns.',
            'Hence 8 distinct sequences are possible, carrying 3 bits — one per toss.',
          ],
          answer: '8 sequences, carrying 3 bits' },
        { q: 'A small building has 12 floors, and a controller must give every floor its own bit pattern. What is the least number of bits that suffices, and how many patterns are then spare?',
          solution: [
            'Take the requirement: the pattern bank must hold at least 12 distinct patterns.',
            'So, find the least $n$ with $2^{n} \\ge 12$.',
            'Check the rungs: $2^{3} = 8$ falls short; $2^{4} = 16$ reaches past 12.',
            'Hence 4 bits suffice, and $16 - 12 = 4$ patterns sit spare.',
          ],
          answer: '4 bits, with 4 spare patterns' },
        { q: 'A text file is exactly 2,048 bytes long. How many bits does it contain?',
          solution: [
            'Take the byte relation: one byte is exactly 8 bits.',
            'So, multiply the byte count by eight: $2{,}048 \\times 8$.',
            'Compute: $2{,}048 \\times 8 = 16{,}384$ — a clean power of two, since $2^{11} \\times 2^{3} = 2^{13}$.',
            'Hence the file contains 16,384 bits.',
          ],
          answer: '16,384 bits' },
        { q: 'Run the two-mark odometer forward: write the binary readings for the counts 5 through 9, and say which count produces the “great roll” into a fourth wheel.',
          solution: [
            'Take the counting strip and read it off the wheels: 5 is 101, 6 is 110, and 7 is 111 — the fullest three-wheel state.',
            'Continue to 8: all three wheels roll over at once — the great roll — and the reading grows to 1000.',
            'Then 9 flips the units wheel back up: 1001.',
            'Hence 101, 110, 111, 1000, 1001 — and the great roll belongs to the count 8.',
          ],
          answer: '101, 110, 111, 1000, 1001; the great roll is 8' },
        { q: 'Using finger-bits weighted 16, 8, 4, 2, 1 from little finger to thumb, show which fingers rise for the numbers 6 and 9, and give each as a five-bit row.',
          solution: [
            'Take the weights in finger order: 16, 8, 4, 2, 1 — one weight per finger.',
            'Build 6 as a sum of distinct weights: $6 = 4 + 2$, so the middle and index fingers rise — the row 00110.',
            'Build 9 the same way: $9 = 8 + 1$, so the ring finger and the thumb rise — the row 01001.',
            'Hence 6 wears the pattern 00110 and 9 wears 01001.',
          ],
          answer: '6 = 00110 and 9 = 01001',
          figures: [
            { caption: 'Finger-bits with weights 16, 8, 4, 2, 1: the number 6 raises the 4- and 2-fingers (00110); the number 9 raises the 8-finger and the thumb (01001).', svg: cf31SolFingersSvg() },
          ] },
      ] },
      { level: 'L2', questions: [
        { q: 'A fair die is thrown and, quite separately, one card is drawn from a well-shuffled 52-card deck. Which event carries more information, and by exactly how much? Give both values to seven decimal places.',
          solution: [
            'Take the die: six equally likely faces, so $I = \\log_2 6 = 2.5849625$ to seven decimals.',
            'Take the card: fifty-two equally likely outcomes, so $I = \\log_2 52 = 5.7004397$.',
            'Subtract: $5.7004397 - 2.5849625 = 3.1154772$ bits.',
            'Hence the card carries more, by 3.1154772 bits (5.7004397 against 2.5849625).',
          ],
          answer: 'the card, by 3.1154772 bits (5.7004397 vs 2.5849625)',
          figures: [
            { caption: 'Information on one scale: the coin at 1.000 bit, the die at 2.585 bits, the card at 5.700 bits — the card wins by 3.1154772 bits.', svg: cf31SolEntropySvg() },
          ] },
        { q: 'State how many distinct patterns one byte spans, give the largest value a byte can wear, and verify that largest value by summing the bit weights.',
          solution: [
            'Take the census law: eight independent two-way cells name $2^{8}$ patterns.',
            'Compute: $2^{8} = 256$ patterns, spanning the values 0 through 255.',
            'Verify the top: the largest wearer is the all-ones row, and $128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255$.',
            'Hence 256 patterns, largest value 255 — confirmed by the weight sum.',
          ],
          answer: '256 patterns; the largest value is 255',
          figures: [
            { caption: 'One byte as eight weighted cells: setting every cell to 1 sums the weights to 255, the largest value, out of the 256-pattern census.', svg: cf31SolByteSvg() },
          ] },
        { q: 'One memory chip holds exactly 1 KiB; another holds exactly 1 kB. How many bytes does the first chip hold beyond the second, and what is that as a percentage?',
          solution: [
            'Take the two rungs of the ladder: 1 KiB is $1{,}024$ bytes; 1 kB is $1{,}000$ bytes.',
            'Subtract: $1{,}024 - 1{,}000 = 24$ bytes.',
            'Take the percentage: $24 / 1{,}000 = 0.024 = 2.4\\%$.',
            'Hence the KiB chip holds 24 bytes more — a gap of +2.4%.',
          ],
          answer: '24 bytes more, a gap of +2.4%',
          figures: [
            { caption: 'One KiB against one kB: the bars differ by the red tail of 24 bytes — the +2.4% gap of the kilo rung.', svg: cf31SolKiBSvg() },
          ] },
        { q: 'A colleague says a 32-bit machine can address “about four billion” locations. Make the claim exact: how many patterns does a 32-bit address span, and by how much does that exceed four SI billions?',
          solution: [
            'Take the census: 32 bits name $2^{32}$ patterns.',
            'Compute: $2^{32} = 4{,}294{,}967{,}296$ — over four billion, so “about” is fair but loose.',
            'Take the SI reference: four SI billions is $4 \\times 10^{9} = 4{,}000{,}000{,}000$.',
            'Subtract: $4{,}294{,}967{,}296 - 4{,}000{,}000{,}000 = 294{,}967{,}296$.',
            'Hence the exact census is 4,294,967,296 patterns — 294,967,296 beyond four SI billions.',
          ],
          answer: '4,294,967,296 patterns; 294,967,296 beyond four SI billions' },
        { q: 'Ten yes/no questions are asked of a mystery object. How many possibilities can the answers always sort between? And if twenty questions are allowed instead?',
          solution: [
            'Take the census law: $n$ answers carry $n$ bits and sort among $2^{n}$ possibilities.',
            'So, ten answers sort among $2^{10} = 1{,}024$ possibilities.',
            'Now, twenty answers sort among $2^{20} = 1{,}048{,}576$ — just over a million.',
            'Hence ten questions sort 1,024 possibilities and twenty sort 1,048,576.',
          ],
          answer: '1,024 possibilities; twenty questions sort 1,048,576' },
      ] },
      { level: 'L3', questions: [
        { q: 'A signalling engineer divides a 0 to 5 V wire into sixteen equal zones instead of the armoured two. Compute the width of each zone, the number of decision boundaries, and the noise margin from a zone centre to the nearest boundary; compare that margin with the two-zone design’s 1.25 V.',
          solution: [
            'Take the zone width: $5 / 16 = 0.3125$ V per zone.',
            'Count the cliffs: sixteen zones meet at $16 - 1 = 15$ boundaries, and every boundary is a place noise can strike.',
            'Take the margin: a zone centre sits half a zone from the nearest boundary, $0.3125 / 2 = 0.15625$ V.',
            'Compare: $1.25 / 0.15625 = 8$, so the armoured margin is eight times wider.',
            'Hence each zone is 0.3125 V wide, the boundaries number 15, and the centre margin is 0.15625 V — one-eighth of the two-zone 1.25 V.',
          ],
          answer: '0.3125 V zones, 15 boundaries, 0.15625 V margin vs 1.25 V',
          figures: [
            { caption: 'Margins to scale: the two-zone wire guards 1.25 V per side; the sixteen-zone design guards only 0.15625 V — one-eighth the armour, with fifteen cliffs to watch.', svg: cf31SolMarginSvg() },
          ] },
        { q: 'A census must be able to single out any one citizen of a country of exactly one billion using yes/no questions. What is the least number of questions that always suffices? And for a population of one trillion?',
          solution: [
            'Take the bound: the least $n$ with $2^{n} \\ge 10^{9}$.',
            'Check the rungs: $2^{29} = 536{,}870{,}912$ falls short of a billion; $2^{30} = 1{,}073{,}741{,}824$ covers it.',
            'So, a billion needs 30 questions.',
            'Now, a trillion: $2^{39}$ is too small, while $2^{40} = 1{,}099{,}511{,}627{,}776$ covers it, so 40 questions.',
            'Hence 30 questions for a billion, and 40 for a trillion.',
          ],
          answer: '30 questions for a billion; 40 for a trillion' },
        { q: '(Exam-style, five parts.) State the exact number of bytes in 1 KiB, 1 MiB, 1 GiB and 1 TiB, and by how many bytes 1 GiB exceeds 1 GB.',
          solution: [
            'Take the binary ladder rung by rung: KiB is $2^{10}$, MiB is $2^{20}$, GiB is $2^{30}$ and TiB is $2^{40}$ bytes.',
            'Compute: $2^{10} = 1{,}024$; $2^{20} = 1{,}048{,}576$; $2^{30} = 1{,}073{,}741{,}824$; $2^{40} = 1{,}099{,}511{,}627{,}776$.',
            'Take the excess: $1{,}073{,}741{,}824 - 1{,}000{,}000{,}000 = 73{,}741{,}824$ bytes.',
            'Hence 1 KiB = 1,024 B; 1 MiB = 1,048,576 B; 1 GiB = 1,073,741,824 B; 1 TiB = 1,099,511,627,776 B; and 1 GiB - 1 GB = 73,741,824 B.',
          ],
          answer: '1 KiB = 1,024 B; 1 MiB = 1,048,576 B; 1 GiB = 1,073,741,824 B; 1 TiB = 1,099,511,627,776 B; 1 GiB exceeds 1 GB by 73,741,824 B' },
        { q: 'A drive is sold as “1 TB”, and the manufacturer honestly means 10 to the 12 bytes. The operating system labels drives in GiB. What size does the system report, to two decimals, and how far is that below a round thousand GiB?',
          solution: [
            'Take the drive size: $10^{12}$ bytes — the SI tera, as printed on the box.',
            'Convert: divide by $2^{30} = 1{,}073{,}741{,}824$ bytes per gibibyte.',
            'Compute: $10^{12} / 2^{30} = 931.3225746 \\ldots$, which prints as 931.32 GiB to two decimals.',
            'Take the shortfall: $1{,}000 - 931.32 = 68.68$ GiB.',
            'Hence the system reports about 931.32 GiB, some 68.68 GiB below the round thousand.',
          ],
          answer: 'about 931.32 GiB, short by 68.68 GiB' },
        { q: '(Exam-style.) A quizmaster must identify one chosen item from a field of exactly 1,000,000 using only yes/no questions. Find the least number of questions that always suffices, and justify it with a bracket between powers of two.',
          solution: [
            'Take the law: $n$ answers carry $n$ bits and sort among $2^{n}$ possibilities.',
            'Bracket the field: $2^{19} = 524{,}288 < 1{,}000{,}000$, so nineteen questions cannot cover a million.',
            'Check the next rung: $1{,}000{,}000 \\le 2^{20} = 1{,}048{,}576$, so twenty questions always suffice.',
            'Hence 20 questions, because 2^19 = 524,288 < 1,000,000 <= 2^20 = 1,048,576.',
          ],
          answer: '20 questions, because 2^19 = 524,288 < 1,000,000 <= 2^20 = 1,048,576',
          figures: [
            { caption: 'The bracket on a line: a million sits beyond 2^19 = 524,288 and under 2^20 = 1,048,576 — so twenty questions are the least that always suffice.', svg: cf31SolBracketSvg() },
          ] },
      ] },
    ] },
  ],
}
