import type { Chapter, Lesson } from '../../../types'

/**
 * Computer Fundamentals — chapter 3 "Data Representation: a First
 * Meeting" (CLOSED COMPLETE by the CS RUN 6 whole-chapter swarm,
 * 2026-11-25). The two-fire story, honestly: CS RUN 5 opened the
 * chapter (3.2 'The Numbering Systems: Binary, Octal, Hexadecimal',
 * 3.6 'Decimal to Binary Conversion' and 3.7 'Binary to Decimal
 * Conversion' shipped whole at 134/121/131 engine green) and, hitting
 * the run cap against the platform's subagent-deadline wall, preserved
 * the six remaining seats TRACKED in docs/research/cf-ch03-wip/ per
 * the time-budget law. CS RUN 6 resumed from that kit: one authoring
 * agent per remaining seat — 3.1 'Bits: Why Two Symbols Carry
 * Everything' (116/116), 3.3 'Codes: ASCII, Unicode and BCD'
 * (149/149), 3.4 'Text, Images and Sound as Bits' (112/112), 3.5
 * 'Compression: Lossless and Lossy' (105/105), 3.8 'Decimal and
 * Binary Number System' (107/107) and the 3.R 'Unit 3 Completion
 * Review' (88/88) — every engine GREEN before its prose was declared
 * done, the chapter closed COMPLETE in the single run per the owner's
 * whole-chapter directive (2026-11-24).
 *
 * PROVENANCE: ground = the sanctioned internet fallback (the Drive
 * holds no Computer Fundamentals source — the standing honest note in
 * docs/research/CS_TOC_SURVEY.md): the web-verified canonical arcs
 * banked at planning and the 2026-11-25 verification of every pinned
 * date/number (citation key `cs-cf-web-ground`,
 * docs/project/SOURCE_LOG.md). STUDY-NEVER-REPRODUCE absolute: every
 * roster, witness, figure, Illustration, quiz item and exercise below
 * is OUR OWN, engine-pinned in scripts/verify-cs-book2-ch03.ts (which
 * re-runs the nine verify-first harnesses against THIS file and
 * closes with the closed-chapter census).
 */
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
const c31 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f31 = 'ui-sans-serif, system-ui, sans-serif'

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
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f31}" role="img" aria-label="The two-zone wire versus the ten-zone wire. Top panel: a voltage axis from 0 to 5 volts split into a wide zone labelled means 0, low voltage, and a wide zone labelled means 1, high voltage, with a fuzzy noise band between them and one red decision boundary in the middle. Bottom panel: the same axis split into ten narrow zones, digits 0 through 9, with nine red decision boundaries. A caption strip notes that two zones leave one wide moat that noise must cross half the range to mistake, while ten zones leave nine narrow moats where a tenth of the range suffices.">`)
  s.push(cf31T(mid, 40, 12, c31.teal, 'middle', 'THE TWO-ZONE WIRE - ARMOURED', true))
  s.push(cf31T(mid, 74, 9.5, c31.tealInk, 'middle', 'noise blurs the middle'))
  s.push(`<rect x="${z0x}" y="${p1Top}" width="${z0w}" height="${zoneH}" rx="8" fill="${c31.white}" stroke="${c31.struct}" stroke-width="2"/>`)
  s.push(cf31T(z0x + z0w / 2, p1Top + 24, 11, c31.ink, 'middle', 'means 0', true))
  s.push(cf31T(z0x + z0w / 2, p1Top + 42, 9.5, c31.tealInk, 'middle', 'low voltage'))
  s.push(`<rect x="${mid - fuzzW / 2}" y="${p1Top}" width="${fuzzW}" height="${zoneH}" fill="${c31.faint}" stroke="${c31.teal}" stroke-width="2" stroke-dasharray="4 3"/>`)
  s.push(`<rect x="${z1x}" y="${p1Top}" width="${z1w}" height="${zoneH}" rx="8" fill="${c31.panelA}" stroke="${c31.accent}" stroke-width="2"/>`)
  s.push(cf31T(z1x + z1w / 2, p1Top + 24, 11, c31.ink, 'middle', 'means 1', true))
  s.push(cf31T(z1x + z1w / 2, p1Top + 42, 9.5, c31.tealInk, 'middle', 'high voltage'))
  s.push(`<line x1="${mid}" y1="70" x2="${mid}" y2="${p1Top + zoneH + 10}" stroke="${c31.warn}" stroke-width="2.5"/>`)
  s.push(`<line x1="${ax0}" y1="${p1Top + zoneH + 10}" x2="${ax1}" y2="${p1Top + zoneH + 10}" stroke="${c31.ink}" stroke-width="2"/>`)
  s.push(cf31T(ax0, p1Top + zoneH + 26, 9, c31.tealInk, 'start', '0 V'))
  s.push(cf31T(ax1, p1Top + zoneH + 26, 9, c31.tealInk, 'end', '5 V'))
  s.push(cf31T(mid, p1Top + zoneH + 46, 10, c31.warn, 'middle', 'the ONE decision boundary', true))
  s.push(cf31T(mid, 212, 12, c31.teal, 'middle', 'THE TEN-ZONE WIRE - FRAGILE', true))
  for (let k = 0; k < zones; k++) {
    const zx = ax0 + k * zw
    s.push(`<rect x="${zx}" y="${p2Top}" width="${zw}" height="${zoneH}" fill="${k % 2 === 0 ? c31.white : c31.paper}" stroke="${c31.struct}" stroke-width="1.5"/>`)
    s.push(cf31T(zx + zw / 2, p2Top + zoneH / 2 + 4, 12, c31.ink, 'middle', String(k)))
  }
  for (let k = 1; k < zones; k++) {
    const bx = ax0 + k * zw
    s.push(`<line x1="${bx}" y1="${p2Top - 10}" x2="${bx}" y2="${p2Top + zoneH + 10}" stroke="${c31.warn}" stroke-width="1.5"/>`)
  }
  s.push(cf31T(mid, p2Top + zoneH + 28, 10, c31.warn, 'middle', 'nine narrow boundaries - nine chances for noise'))
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c31.panelB}" stroke="${c31.conn}" stroke-width="2"/>`)
  s.push(cf31T(mid, stripY + 22, 10, c31.ink, 'middle', 'two zones: ONE wide moat - noise must cross half the range to cause a mistake'))
  s.push(cf31T(mid, stripY + 42, 10, c31.tealInk, 'middle', 'ten zones: nine narrow moats - a tenth of the range is already enough'))
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
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f31}" role="img" aria-label="The powers ladder: twenty-one bars, one for each power of two from 2 to the 0 through 2 to the 20. The bar heights step up evenly, one unit per rung, because each rung is exactly double the one below - an even staircase is the signature of the exponential. Milestone rungs are highlighted: 2 to the 0 is 1, 2 to the 4 is 16, 2 to the 8 is 256, 2 to the 12 is 4,096, 2 to the 16 is 65,536, and 2 to the 20 is 1,048,576. An annotation at the top rung notes that twenty bits name 1,048,576 patterns, just over a million, which is why twenty yes-or-no questions sort a million possibilities.">`)
  s.push(cf31T(W / 2, 30, 12, c31.teal, 'middle', 'THE POWERS LADDER - TWENTY-ONE RUNGS, EACH DOUBLE THE LAST', true))
  for (let n = 0; n <= 20; n++) {
    const bx = x0 + n * stride
    const h = (n + 1) * unit
    const isMile = milestones.includes(n)
    s.push(`<rect x="${bx}" y="${base - h}" width="${barW}" height="${h}" rx="3" fill="${isMile ? c31.panelA : c31.white}" stroke="${isMile ? c31.accent : c31.struct}" stroke-width="${isMile ? 2.5 : 2}"/>`)
    s.push(cf31T(bx + barW / 2, base - h - 6, 9.5, c31.tealInk, 'middle', `2^${n}`))
  }
  s.push(`<line x1="${x0}" y1="${base}" x2="${x0 + 20 * stride + barW}" y2="${base}" stroke="${c31.ink}" stroke-width="2"/>`)
  milestones.forEach((n, i) => {
    const cx = x0 + n * stride + barW / 2
    s.push(cf31T(cx, base + 18, 10, c31.ink, 'middle', values[i], true))
  })
  s.push(cf31T(W / 2, base + 44, 10.5, c31.ink, 'middle', 'the top rung: 20 bits name 1,048,576 patterns - just over a million'))
  s.push(cf31T(W / 2, base + 62, 10, c31.tealInk, 'middle', 'twenty yes/no questions sort a million possibilities - the parlor trick IS the power of two'))
  s.push(cf31T(W / 2, base + 82, 9.5, c31.tealInk, 'middle', 'bar heights step evenly because each rung doubles - an even staircase is the exponential at work'))
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
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f31}" role="img" aria-label="The honest ladder: SI decimal bars versus IEC binary bars at four rungs. At the kilo rung, 1 kB is 1,000 bytes while 1 KiB is 1,024 bytes, a gap of 2.4 percent. At the mega rung, 1 MB is 1,000,000 while 1 MiB is 1,048,576, a gap of 4.8576 percent. At the giga rung, 1 GB is 1,000,000,000 while 1 GiB is 1,073,741,824, a gap of 7.3741824 percent. At the tera rung, 1 TB is 1,000,000,000,000 while 1 TiB is 1,099,511,627,776, a gap of 9.9511627776 percent. The paired bars look almost alike, and a caption notes that this near-twin look is exactly the trap: the gap widens at every rung.">`)
  s.push(cf31T(W / 2, 34, 12, c31.teal, 'middle', 'THE HONEST LADDER - SI BARS VS IEC BARS', true))
  rungs.forEach((r, i) => {
    const top = top0 + i * stride
    const iecLen = siLen * (1 + Math.pow(1.024, i + 1) - 1)
    s.push(cf31T(M + 8, top + 16, 10.5, c31.ink, 'start', r.name, true))
    s.push(cf31T(M + 8, top + 32, 9.5, c31.tealInk, 'start', r.pair))
    s.push(`<rect x="${barX}" y="${top}" width="${siLen}" height="${barH}" rx="4" fill="${c31.white}" stroke="${c31.teal}" stroke-width="2"/>`)
    s.push(cf31T(barX + 8, top + 16, 10, c31.tealInk, 'start', r.si))
    s.push(`<rect x="${barX}" y="${top + 28}" width="${iecLen.toFixed(2)}" height="${barH}" rx="4" fill="${c31.panelA}" stroke="${c31.struct}" stroke-width="2"/>`)
    s.push(cf31T(barX + 8, top + 44, 10, c31.ink, 'start', r.iec))
    s.push(cf31T(barX + iecLen + 8, top + 44, 10, c31.warn, 'start', r.gap, true))
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c31.panelB}" stroke="${c31.conn}" stroke-width="2"/>`)
  s.push(cf31T(W / 2, stripY + 22, 10, c31.ink, 'middle', 'the bars look almost alike - that near-twin look is exactly the trap'))
  s.push(cf31T(W / 2, stripY + 42, 10, c31.tealInk, 'middle', 'the gap widens every rung: x1.024, then x1.024 again, and again - it compounds'))
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
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f31}" role="img" aria-label="The heritage line from poetry meters to every chip, as five markers on a line that is not to scale. Pingala, around 200 BCE, listed verse-meter patterns as binary rows. Leibniz, 1703, published binary arithmetic in the Memoires of the Royal Academy of Sciences, pages 85 to 89. Boole, 1854, gave the algebra of true and false. Shannon, 1937, married Boole's algebra to switching circuits in his MIT master's thesis, and in 1948 his Bell System Technical Journal paper built the mathematics of information and printed the word bit, crediting John Tukey. A strip notes the modern run: June 1956 byte on IBM's Stretch, 1964 System/360, December 1998 IEC prefixes.">`)
  s.push(cf31T(W / 2, 34, 12, c31.teal, 'middle', 'THE HERITAGE LINE - POETRY METERS TO EVERY CHIP', true))
  s.push(`<line x1="${lx0}" y1="${lineY}" x2="${lx1}" y2="${lineY}" stroke="${c31.ink}" stroke-width="2.5"/>`)
  marks.forEach((mk) => {
    s.push(`<circle cx="${mk.x}" cy="${lineY}" r="7" fill="${c31.struct}" stroke="${c31.ink}" stroke-width="2"/>`)
    s.push(cf31T(mk.x, 106, 11, c31.ink, 'middle', mk.date, true))
    s.push(cf31T(mk.x, 156, 10.5, c31.ink, 'middle', mk.name, true))
    s.push(cf31T(mk.x, 172, 9.5, c31.tealInk, 'middle', mk.l1))
    s.push(cf31T(mk.x, 186, 9.5, c31.tealInk, 'middle', mk.l2))
  })
  s.push(cf31T(W / 2, 214, 10, c31.tealInk, 'middle', 'not to scale: about nineteen centuries pass between the first two markers'))
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c31.panelB}" stroke="${c31.conn}" stroke-width="2"/>`)
  s.push(cf31T(W / 2, stripY + 19, 10, c31.ink, 'middle', 'the modern run: June 1956 byte (Stretch) - 1964 System/360 - December 1998 IEC prefixes'))
  s.push(cf31T(W / 2, stripY + 36, 9.5, c31.tealInk, 'middle', '1937 + 1948: Shannon marries logic to circuits, then measures information - the bit gets its mathematics'))
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
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f31}" role="img" aria-label="The finger register with weights sixteen, eight, four, two and one from little finger to thumb. Left panel: the number six raises the four-finger and the two-finger, the pattern zero zero one one zero. Right panel: the number nine raises the eight-finger and the thumb, the pattern zero one zero zero one. Up means one, down means zero, and the raised weights sum to the number shown.">`)
  s.push(cf31T(W / 2, 26, 11, c31.teal, 'middle', 'FINGER BITS - WEIGHTS 16, 8, 4, 2, 1, LITTLE FINGER TO THUMB', true))
  s.push(cf31T(W / 2, 44, 9.5, c31.tealInk, 'middle', 'up means 1 - down means 0'))
  shows.forEach((n, p) => {
    const cx = p === 0 ? 186 : 534
    const x0 = cx - span / 2
    s.push(cf31T(cx, 64, 10.5, c31.ink, 'middle', `the number ${n}: ${n === 6 ? '4 + 2' : '8 + 1'}`, true))
    const pat = weights.map((w) => (n & w ? '1' : '0')).join('')
    s.push(cf31T(cx, 78, 9.5, c31.tealInk, 'middle', `pattern ${pat}`))
    weights.forEach((w, i) => {
      const fx = x0 + i * (fw + gap)
      const up = (n & w) !== 0
      const fh = up ? raisedH : downH
      const fy = baseY - fh
      s.push(`<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="7" fill="${up ? c31.panelA : c31.white}" stroke="${up ? c31.accent : c31.struct}" stroke-width="2"/>`)
      s.push(cf31T(fx + fw / 2, fy + 16, 12, c31.ink, 'middle', up ? '1' : '0', true))
      s.push(cf31T(fx + fw / 2, baseY + 20, 9.5, c31.tealInk, 'middle', String(w)))
    })
    s.push(`<line x1="${x0 - 6}" y1="${baseY + 2}" x2="${x0 + span + 6}" y2="${baseY + 2}" stroke="${c31.ink}" stroke-width="2"/>`)
    s.push(cf31T(cx, 200, 10, c31.ink, 'middle', `raised: ${n === 6 ? '4 + 2 = 6' : '8 + 1 = 9'}`, true))
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
    { label: 'coin (N=2)', bits: 1, val: '1.000 bit', fill: c31.white, stroke: c31.teal },
    { label: 'die (N=6)', bits: Math.log2(6), val: '2.585 bits', fill: c31.panelB, stroke: c31.conn },
    { label: 'card (N=52)', bits: Math.log2(52), val: '5.700 bits', fill: c31.panelA, stroke: c31.accent },
  ]
  const H = 230
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f31}" role="img" aria-label="Information compared on one scale: the coin at one bit, the die at 2.585 bits and the card from a fifty-two card deck at 5.700 bits. Each bar length is log base two of the outcome count, times seventy pixels per bit. The card beats the die by 3.1154772 bits.">`)
  s.push(cf31T(W / 2, 26, 11, c31.teal, 'middle', 'INFORMATION BARS - THE COIN, THE DIE AND THE CARD', true))
  s.push(cf31T(W / 2, 44, 9.5, c31.tealInk, 'middle', 'one equally likely choice among N outcomes carries log2 N bits'))
  for (let k = 0; k <= 6; k++) {
    const tx = x0 + k * perBit
    s.push(`<line x1="${tx}" y1="58" x2="${tx}" y2="182" stroke="${c31.faint}" stroke-width="1.5"/>`)
    s.push(cf31T(tx, 198, 9, c31.tealInk, 'middle', String(k)))
  }
  rows.forEach((r, i) => {
    const by = 72 + i * 40
    const len = r.bits * perBit
    s.push(`<rect x="${x0}" y="${by}" width="${len.toFixed(2)}" height="22" rx="4" fill="${r.fill}" stroke="${r.stroke}" stroke-width="2"/>`)
    s.push(cf31T(x0 - 12, by + 16, 10, c31.ink, 'end', r.label))
    s.push(cf31T(x0 + len + 8, by + 16, 10, c31.ink, 'start', r.val))
  })
  s.push(cf31T(W / 2, 222, 9.5, c31.ink, 'middle', 'the card beats the die by 5.7004397 - 2.5849625 = 3.1154772 bits'))
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
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f31}" role="img" aria-label="One byte drawn as eight cells with weights 128, 64, 32, 16, 8, 4, 2 and 1 from left to right, every cell set to 1. The bracket below shows the sum 128 plus 64 plus 32 plus 16 plus 8 plus 4 plus 2 plus 1 equals 255, the largest value a byte can wear, out of the 256 patterns the census grants.">`)
  s.push(cf31T(W / 2, 26, 11, c31.teal, 'middle', 'ONE BYTE - EIGHT CELLS, WEIGHTS 128 DOWN TO 1', true))
  weights.forEach((w, i) => {
    const cx = x0 + i * (cw + gap)
    s.push(`<rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="6" fill="${i % 2 === 0 ? c31.white : c31.paper}" stroke="${c31.struct}" stroke-width="2"/>`)
    s.push(cf31T(cx + cw / 2, cy + 32, 13, c31.ink, 'middle', '1', true))
    s.push(cf31T(cx + cw / 2, 132, 9.5, c31.tealInk, 'middle', String(w)))
  })
  s.push(`<line x1="${x0}" y1="146" x2="${x0 + span}" y2="146" stroke="${c31.ink}" stroke-width="1.5"/>`)
  s.push(`<line x1="${x0}" y1="146" x2="${x0}" y2="139" stroke="${c31.ink}" stroke-width="1.5"/>`)
  s.push(`<line x1="${x0 + span}" y1="146" x2="${x0 + span}" y2="139" stroke="${c31.ink}" stroke-width="1.5"/>`)
  s.push(cf31T(W / 2, 166, 10, c31.ink, 'middle', 'all eight cells set: 128+64+32+16+8+4+2+1 = 255, the largest byte', true))
  s.push(cf31T(W / 2, 186, 9.5, c31.tealInk, 'middle', 'the census: 2^8 = 256 patterns, naming 0 through 255'))
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
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f31}" role="img" aria-label="One kibibyte drawn against one kilobyte. The kilobyte bar runs to 1,000 bytes; the kibibyte bar runs to 1,024 bytes, and the extra 24 bytes appear as a red tail on the end - a gap of plus 2.4 percent at the kilo rung of the honest ladder.">`)
  s.push(cf31T(W / 2, 26, 11, c31.teal, 'middle', 'ONE KiB vs ONE kB - THE 24-BYTE TAIL', true))
  s.push(cf31T(600, 46, 9.5, c31.tealInk, 'middle', 'the kB bar ends here'))
  s.push(`<line x1="600" y1="52" x2="600" y2="152" stroke="${c31.warn}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
  s.push(cf31T(128, 82, 10.5, c31.ink, 'end', '1 kB', true))
  s.push(`<rect x="${barX}" y="68" width="${kB.toFixed(2)}" height="22" rx="4" fill="${c31.white}" stroke="${c31.teal}" stroke-width="2"/>`)
  s.push(cf31T(608, 82, 10, c31.tealInk, 'start', '1,000 bytes'))
  s.push(cf31T(128, 134, 10.5, c31.ink, 'end', '1 KiB', true))
  s.push(`<rect x="${barX}" y="120" width="${(KiB - kB).toFixed(2)}" height="22" fill="${c31.warn}"/>`)
  s.push(`<rect x="${barX}" y="120" width="${KiB.toFixed(2)}" height="22" rx="4" fill="none" stroke="${c31.struct}" stroke-width="2"/>`)
  s.push(cf31T(619.04, 134, 10, c31.ink, 'start', '1,024 bytes'))
  s.push(`<line x1="605" y1="146" x2="428" y2="152" stroke="${c31.warn}" stroke-width="1.5"/>`)
  s.push(cf31T(140, 158, 9.5, c31.warn, 'start', 'the red tail: the extra 24 bytes, a gap of +2.4%'))
  s.push(cf31T(W / 2, 176, 9.5, c31.tealInk, 'middle', 'both ladders climb from the byte: the decimal one takes 1,000 steps per rung'))
  s.push(cf31T(W / 2, 192, 9.5, c31.tealInk, 'middle', 'the binary one takes 1,024 - and the gap compounds at every rung'))
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
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f31}" role="img" aria-label="Margin comparison on a zero to five volt wire. Top: the two-zone design has one boundary at two and a half volts and a noise margin of 1.25 volts from a zone centre. Bottom: the sixteen-zone design has fifteen boundaries, zones only 0.3125 volts wide, and a centre margin of just 0.15625 volts - one-eighth of the armoured margin. The bottom strip draws both margins to scale.">`)
  s.push(cf31T(W / 2, 26, 11, c31.teal, 'middle', 'MARGIN COMPARISON - TWO ZONES vs SIXTEEN ZONES', true))
  s.push(cf31T(v0, 52, 10.5, c31.ink, 'start', 'THE TWO-ZONE WIRE', true))
  s.push(`<rect x="${v0}" y="62" width="${(2.5 * perV).toFixed(2)}" height="32" fill="${c31.white}" stroke="${c31.struct}" stroke-width="2"/>`)
  s.push(`<rect x="${v0 + 2.5 * perV}" y="62" width="${(2.5 * perV).toFixed(2)}" height="32" fill="${c31.panelA}" stroke="${c31.accent}" stroke-width="2"/>`)
  s.push(cf31T(v0 + 1.25 * perV, 84, 10, c31.ink, 'middle', 'means 0'))
  s.push(cf31T(v0 + 3.75 * perV, 84, 10, c31.ink, 'middle', 'means 1'))
  s.push(`<line x1="${v0 + 2.5 * perV}" y1="54" x2="${v0 + 2.5 * perV}" y2="102" stroke="${c31.warn}" stroke-width="2.5"/>`)
  s.push(`<line x1="${v0 + 2.5 * perV}" y1="116" x2="${v0 + 3.75 * perV}" y2="116" stroke="${c31.ink}" stroke-width="1.5"/>`)
  s.push(`<polygon points="${v0 + 2.5 * perV},112 ${v0 + 2.5 * perV + 6},116 ${v0 + 2.5 * perV},120" fill="${c31.ink}"/>`)
  s.push(`<polygon points="${v0 + 3.75 * perV},112 ${v0 + 3.75 * perV - 6},116 ${v0 + 3.75 * perV},120" fill="${c31.ink}"/>`)
  s.push(cf31T(v0 + 3.125 * perV, 134, 9.5, c31.ink, 'middle', 'margin 1.25 V'))
  s.push(cf31T(v0, 158, 10.5, c31.ink, 'start', 'THE SIXTEEN-ZONE WIRE', true))
  s.push(cf31T(v1, 158, 9.5, c31.tealInk, 'end', 'zones 0.3125 V wide'))
  for (let k = 0; k < zones; k++) {
    s.push(`<rect x="${v0 + k * zw}" y="168" width="${zw}" height="32" fill="${k % 2 === 0 ? c31.white : c31.paper}" stroke="${c31.struct}" stroke-width="1.5"/>`)
  }
  for (let k = 1; k < zones; k++) {
    s.push(`<line x1="${v0 + k * zw}" y1="160" x2="${v0 + k * zw}" y2="214" stroke="${c31.warn}" stroke-width="1.5"/>`)
  }
  s.push(cf31T(v0, 236, 10, c31.ink, 'start', 'THE MARGINS, TO SCALE', true))
  s.push(cf31T(80, 264, 9.5, c31.tealInk, 'start', 'two-zone margin'))
  s.push(`<rect x="290" y="252" width="${(1.25 * 200).toFixed(2)}" height="14" fill="${c31.panelA}" stroke="${c31.accent}" stroke-width="2"/>`)
  s.push(cf31T(548, 264, 9.5, c31.ink, 'start', '1.25 V'))
  s.push(cf31T(80, 294, 9.5, c31.tealInk, 'start', 'sixteen-zone margin'))
  s.push(`<rect x="290" y="282" width="${(0.15625 * 200).toFixed(2)}" height="14" fill="${c31.white}" stroke="${c31.warn}" stroke-width="2"/>`)
  s.push(cf31T(329, 294, 9.5, c31.ink, 'start', '0.15625 V'))
  s.push(cf31T(W / 2, 316, 9.5, c31.ink, 'middle', 'the armoured margin is eight times wider: 1.25 / 0.15625 = 8'))
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
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f31}" role="img" aria-label="The twenty-questions bracket on a line: a million sits beyond two to the nineteenth, which is 524,288, and under two to the twentieth, which is 1,048,576. Nineteen questions cannot cover a million; twenty always suffice, because twenty answers carry twenty bits.">`)
  s.push(cf31T(W / 2, 26, 11, c31.teal, 'middle', 'THE TWENTY-QUESTIONS BRACKET', true))
  s.push(cf31T(W / 2, 44, 9.5, c31.tealInk, 'middle', 'a million sits between the nineteenth and twentieth powers of two'))
  s.push(`<rect x="200" y="96" width="360" height="28" fill="${c31.faint}"/>`)
  s.push(`<line x1="${ax0}" y1="${ay}" x2="${ax1}" y2="${ay}" stroke="${c31.ink}" stroke-width="2.5"/>`)
  marks.forEach((m) => {
    s.push(`<circle cx="${m.x}" cy="${ay}" r="${m.hot ? 7 : 6}" fill="${m.hot ? c31.accent : c31.struct}" stroke="${m.hot ? c31.warn : c31.ink}" stroke-width="2"/>`)
    s.push(cf31T(m.x, 94, 10, c31.ink, 'middle', m.name, true))
    s.push(cf31T(m.x, 136, 9.5, c31.tealInk, 'middle', m.val))
  })
  s.push(cf31T(W / 2, 166, 10, c31.ink, 'middle', '2^19 = 524,288 < 1,000,000 <= 2^20 = 1,048,576', true))
  s.push(cf31T(W / 2, 186, 9.5, c31.tealInk, 'middle', 'twenty answers carry 20 bits, and 20 bits name exactly 2^20 patterns'))
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
const c33 = {
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
    { name: 'BCD cell', sub: '4 bits - one digit', frac: 10 / 16, fill: c33.struct, line1: 'names 10 of 16', line2: '6 patterns dead' },
    { name: 'ASCII', sub: '7-bit code, 8-bit byte', frac: 128 / 256, fill: c33.teal, line1: 'names 128 of 256', line2: '128 for extensions' },
    { name: 'Code page', sub: '8 bits, one page', frac: 256 / 256, fill: c33.conn, line1: 'names 256 of 256', line2: 'but rival pages clash' },
    { name: 'Unicode', sub: '21-bit code space', frac: 1114112 / 2097152, fill: c33.accent, line1: 'names 1,114,112', line2: 'of 2,097,152 - 17 of 32' },
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
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${c33.teal}">THE CODE-SPACE LADDER - WHAT EACH CODE NAMES, AND OUT OF WHAT</text>`)
  rows.forEach((r, ri) => {
    const rowTop = topY + ri * rowStep
    s.push(`<text x="${M}" y="${rowTop + 13}" font-size="12" text-anchor="start" font-weight="bold" fill="${c33.ink}">${r.name}</text>`)
    s.push(`<text x="${M}" y="${rowTop + 27}" font-size="9.5" text-anchor="start" fill="${c33.tealInk}">${r.sub}</text>`)
    s.push(`<rect x="${barX0}" y="${rowTop}" width="${barW}" height="${barH}" rx="5" fill="${c33.white}" stroke="${c33.ink}" stroke-width="1.6"/>`)
    s.push(`<rect x="${barX0}" y="${rowTop}" width="${barW * r.frac}" height="${barH}" rx="5" fill="${r.fill}" stroke="${c33.ink}" stroke-width="1.6"/>`)
    s.push(`<text x="${barX0 + (barW * r.frac) / 2}" y="${rowTop + 17.5}" font-size="10" text-anchor="middle" font-weight="bold" fill="${c33.white}">${pct(r.frac)}</text>`)
    s.push(`<text x="${rightX}" y="${rowTop + 12}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${c33.ink}">${r.line1}</text>`)
    s.push(`<text x="${rightX}" y="${rowTop + 26}" font-size="9.5" text-anchor="start" fill="${c33.tealInk}">${r.line2}</text>`)
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c33.panelB}" stroke="${c33.conn}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 21}" font-size="10" text-anchor="middle" fill="${c33.ink}">each bar is drawn to its own bit budget: the filled part is what the code actually names</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 38}" font-size="10" text-anchor="middle" fill="${c33.tealInk}">Unicode alone spans 4,352 byte-spaces - and only 159,801 of its cells were filled at version 17.0</text>`)
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
    { from: 48, to: 57, fill: c33.panelA, stroke: c33.accent },
    { from: 65, to: 90, fill: c33.white, stroke: c33.struct },
    { from: 97, to: 122, fill: c33.panelB, stroke: c33.conn },
  ]
  const glyphs: Array<[string, number]> = [['0', 48], ['9', 57], ['A', 65], ['Z', 90], ['a', 97], ['z', 122], ['~', 126]]
  const row1: Array<[string, number]> = [['space 32', 32], ['0 at 48', 48], ['A at 65', 65], ['a at 97', 97], ['DEL 127', 127]]
  const row2: Array<[string, number]> = [['9 at 57', 57], ['Z at 90', 90], ['z at 122', 122]]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The ASCII arithmetic map: a strip of the printable codes 32 to 126 with landmark ticks. The digits block 48 to 57, the uppercase block 65 to 90 and the lowercase block 97 to 122 are shaded, with the glyphs 0, 9, A, Z, a, z and tilde drawn at their computed positions. An arc from A at 65 to a at 97 is labelled plus 32 sets bit 5, and a short arrow from space at 32 to 0 at 48 is labelled plus 16. DEL at 127 closes the 128 codes.">`)
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${c33.teal}">THE ASCII ARITHMETIC MAP - PRINTABLE CODES 32 TO 126</text>`)
  blocks.forEach((b) => {
    const bx = codeX(b.from)
    const bw = (b.to - b.from + 1) * scale
    s.push(`<rect x="${bx}" y="${stripY}" width="${bw}" height="${stripH}" fill="${b.fill}" stroke="${b.stroke}" stroke-width="2"/>`)
  })
  s.push(`<rect x="${x0 - 4}" y="${stripY}" width="${x1 - x0 + 8}" height="${stripH}" rx="6" fill="none" stroke="${c33.ink}" stroke-width="2.2"/>`)
  glyphs.forEach(([g, c]) => {
    s.push(`<text x="${codeX(c) + scale / 2}" y="${stripY + 22}" font-size="12" text-anchor="middle" font-weight="bold" fill="${c33.ink}">${g}</text>`)
  })
  /* the +32 case-flip arc, A (65) -> a (97) */
  const axA = codeX(65) + scale / 2
  const axa = codeX(97) + scale / 2
  s.push(`<path d="M ${axA} ${arcY - 4} Q ${(axA + axa) / 2} ${arcY - 30} ${axa - 8} ${arcY - 4}" fill="none" stroke="${c33.accent}" stroke-width="2.4"/>`)
  s.push(`<polygon points="${axa},${arcY - 3} ${axa - 10},${arcY - 12} ${axa - 12},${arcY - 2}" fill="${c33.accent}"/>`)
  s.push(`<text x="${(axA + axa) / 2}" y="${arcY - 30}" font-size="10.5" text-anchor="middle" font-weight="bold" fill="${c33.accent}">+32 sets bit 5</text>`)
  /* the +16 arrow, space (32) -> 0 (48) */
  const axS = codeX(32) + scale + 2
  const ax0 = codeX(48) - 2
  s.push(`<line x1="${axS}" y1="${arcY}" x2="${ax0}" y2="${arcY}" stroke="${c33.tealInk}" stroke-width="1.8"/>`)
  s.push(`<polygon points="${ax0 + 6},${arcY} ${ax0 - 2},${arcY - 4} ${ax0 - 2},${arcY + 4}" fill="${c33.tealInk}"/>`)
  s.push(`<text x="${(axS + ax0) / 2}" y="${arcY - 7}" font-size="9.5" text-anchor="middle" fill="${c33.tealInk}">+16</text>`)
  /* the DEL cell just past the strip */
  s.push(`<rect x="666" y="${stripY}" width="40" height="${stripH}" rx="6" fill="${c33.white}" stroke="${c33.warn}" stroke-width="2"/>`)
  s.push(`<text x="686" y="${stripY + 22}" font-size="9.5" text-anchor="middle" font-weight="bold" fill="${c33.warn}">DEL</text>`)
  /* landmark ticks + staggered labels */
  const tick = (c: number, yEnd: number): void => {
    s.push(`<line x1="${codeX(c) + scale / 2}" y1="${stripB}" x2="${codeX(c) + scale / 2}" y2="${yEnd}" stroke="${c33.tealInk}" stroke-width="1.5"/>`)
  }
  row1.forEach(([lab, c]) => {
    tick(c, row1Y - 10)
    const lx = c === 127 ? 684 : codeX(c) + scale / 2
    s.push(`<text x="${lx}" y="${row1Y}" font-size="9.5" text-anchor="middle" font-weight="bold" fill="${c33.ink}">${lab}</text>`)
  })
  row2.forEach(([lab, c]) => {
    tick(c, row2Y - 10)
    s.push(`<text x="${codeX(c) + scale / 2}" y="${row2Y}" font-size="9.5" text-anchor="middle" fill="${c33.tealInk}">${lab}</text>`)
  })
  s.push(`<text x="${W / 2}" y="${legendY}" font-size="9.5" text-anchor="middle" fill="${c33.tealInk}">the blocks: digits 48 to 57 - uppercase 65 to 90 - lowercase 97 to 122 - space 32 opens the printables</text>`)
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${c33.panelA}" stroke="${c33.accent}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 19}" font-size="10" text-anchor="middle" fill="${c33.ink}">printables run 32 to 126; the case flip is one bit: a = A + 32, so 97 = 65 + 32</text>`)
  s.push(`<text x="${W / 2}" y="${footY + 36}" font-size="10" text-anchor="middle" fill="${c33.tealInk}">digit values: subtract 48 from the code - and DEL at 127 closes the 128</text>`)
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
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${c33.teal}">THE FOUR UTF-8 CLASSES - LEADING BYTES ANNOUNCE THE LENGTH</text>`)
  s.push(`<text x="${M}" y="${colY}" font-size="9.5" text-anchor="start" font-weight="bold" fill="${c33.tealInk}">CLASS</text>`)
  s.push(`<text x="${cellsX}" y="${colY}" font-size="9.5" text-anchor="start" font-weight="bold" fill="${c33.tealInk}">BYTE PATTERN</text>`)
  s.push(`<text x="${rangeX}" y="${colY}" font-size="9.5" text-anchor="start" font-weight="bold" fill="${c33.tealInk}">CODE-POINT RANGE</text>`)
  s.push(`<text x="${cenX}" y="${colY}" font-size="9.5" text-anchor="start" font-weight="bold" fill="${c33.tealInk}">LEGAL CODE POINTS</text>`)
  rows.forEach((r, ri) => {
    const rowTop = topY + ri * rowH
    s.push(`<text x="${M}" y="${rowTop + 16}" font-size="12" text-anchor="start" font-weight="bold" fill="${c33.ink}">${r.label}</text>`)
    s.push(`<text x="${M}" y="${rowTop + 32}" font-size="9.5" text-anchor="start" fill="${c33.tealInk}">${r.sub}</text>`)
    r.pats.forEach((p, k) => {
      const cx = cellsX + k * stride
      const isLead = k === 0
      s.push(`<rect x="${cx}" y="${rowTop}" width="${cellW}" height="${cellH}" rx="6" fill="${isLead && ri > 0 ? c33.panelA : c33.white}" stroke="${isLead && ri > 0 ? c33.accent : c33.struct}" stroke-width="2"/>`)
      s.push(`<text x="${cx + cellW / 2}" y="${rowTop + 19.5}" font-size="10" text-anchor="middle" font-family="ui-monospace, monospace" fill="${c33.ink}">${p}</text>`)
    })
    s.push(`<text x="${rangeX}" y="${rowTop + 19.5}" font-size="10" text-anchor="start" fill="${c33.tealInk}">${r.range}</text>`)
    s.push(`<text x="${cenX}" y="${rowTop + 15}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${c33.ink}">${r.c1}</text>`)
    s.push(`<text x="${cenX}" y="${rowTop + 31}" font-size="9.5" text-anchor="start" fill="${c33.tealInk}">${r.c2}</text>`)
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c33.white}" stroke="${c33.teal}" stroke-width="2"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 19}" font-size="10" text-anchor="middle" fill="${c33.ink}">continuation bytes: the 64 values 10xxxxxx (hex 0x80 to 0xBF) - they never lead, they always follow</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 36}" font-size="10" text-anchor="middle" fill="${c33.tealInk}">a leading byte counts its own 1s: 110 announces one follower, 1110 two, 11110 three</text>`)
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
  s.push(`<rect x="${matX}" y="${matY}" width="${matW}" height="${matH}" rx="14" fill="${c33.paper}" stroke="${c33.ink}" stroke-width="2.5"/>`)
  s.push(`<rect x="${matX + 7}" y="${matY + 7}" width="${matW - 14}" height="${matH - 14}" rx="10" fill="none" stroke="${c33.ink}" stroke-width="1.4"/>`)
  s.push(`<circle cx="${ringCx}" cy="${ringCy}" r="${ringR}" fill="none" stroke="${c33.faint}" stroke-width="4"/>`)
  s.push(`<circle cx="${ringCx - 14}" cy="${ringCy + 12}" r="15" fill="none" stroke="${c33.faint}" stroke-width="3"/>`)
  s.push(`<text x="${W / 2}" y="${titleY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${c33.teal}">A DINER PLACEMAT, SEPTEMBER 1992</text>`)
  rows.forEach((r, ri) => {
    const y = rowY0 + ri * rowStep
    s.push(`<text x="${patX}" y="${y}" font-size="12" text-anchor="start" font-family="ui-monospace, monospace" font-weight="bold" fill="${c33.ink}">${r.pat}</text>`)
    s.push(`<text x="${meanX}" y="${y}" font-size="9.5" text-anchor="start" fill="${c33.tealInk}">${r.mean}</text>`)
  })
  s.push(`<text x="${W / 2}" y="240" font-size="9.5" text-anchor="middle" fill="${c33.ink}">Ken Thompson and Rob Pike sketched these four rows on a placemat in a New Jersey diner</text>`)
  s.push(`<text x="${W / 2}" y="256" font-size="9.5" text-anchor="middle" fill="${c33.tealInk}">the FSS-UTF proposal followed within days - as the participants tell the story; no placemat survives</text>`)
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
  s.push(`<text x="${W / 2}" y="36" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${c33.teal}">BCD 78 - ONE CELL PER DIGIT, WEIGHTS 8-4-2-1</text>`)
  bits.forEach((group, gi) => {
    const gx = gi === 0 ? g1X : g2X
    group.forEach((b, k) => {
      const bx = gx + k * stride
      s.push(`<rect x="${bx}" y="${bitsY}" width="${bitW}" height="${bitH}" rx="7" fill="${c33.white}" stroke="${c33.struct}" stroke-width="2"/>`)
      s.push(`<text x="${bx + bitW / 2}" y="${bitsY + 26}" font-size="16" text-anchor="middle" fill="${c33.ink}">${b}</text>`)
    })
    const gEnd = gx + 3 * stride + bitW
    s.push(`<path d="M ${gx} ${bitsY + bitH + 8} v 7 H ${gEnd} v -7" fill="none" stroke="${c33.tealInk}" stroke-width="1.8"/>`)
    weights.forEach((wt, k) => {
      s.push(`<text x="${gx + k * stride + bitW / 2}" y="${bitsY + bitH + 30}" font-size="9.5" text-anchor="middle" fill="${c33.tealInk}">${wt}</text>`)
    })
    const cx = (gx + gEnd) / 2
    s.push(`<rect x="${cx - chipW / 2}" y="146" width="${chipW}" height="${chipW}" rx="8" fill="${c33.panelA}" stroke="${c33.accent}" stroke-width="2.2"/>`)
    s.push(`<text x="${cx}" y="169" font-size="16" text-anchor="middle" font-weight="bold" fill="${c33.ink}">${chips[gi]}</text>`)
  })
  s.push(`<text x="${W / 2}" y="${annY}" font-size="10" text-anchor="middle" fill="${c33.ink}">cell 0111: 0x8 + 1x4 + 1x2 + 1x1 = 7 - cell 1000: 1x8 = 8</text>`)
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${c33.panelB}" stroke="${c33.conn}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 19}" font-size="10" text-anchor="middle" fill="${c33.ink}">BCD(78) = 0111 1000, eight bits in two cells</text>`)
  s.push(`<text x="${W / 2}" y="${footY + 36}" font-size="10" text-anchor="middle" fill="${c33.tealInk}">pure binary would need only 1001110 - seven bits - for the same value</text>`)
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
  s.push(`<text x="${W / 2}" y="34" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${c33.teal}">BCD ADDITION - THE ADD-SIX REPAIR (27 + 18)</text>`)
  rows.forEach((r, ri) => {
    const y = rowY0 + ri * rowStep
    s.push(`<text x="${M}" y="${y + 21}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${c33.ink}">${r.label}</text>`)
    if (r.kind === 'text') {
      s.push(`<text x="${c1}" y="${y + 21}" font-size="10.5" text-anchor="start" font-family="ui-monospace, monospace" fill="${c33.ink}">1111 + 0110 = 1 0101</text>`)
    } else {
      r.cells.forEach((cell, k) => {
        const cx = k === 0 ? c1 : c2
        const stroke = r.kind === 'bad' && k === 1 ? c33.warn : r.kind === 'good' ? c33.struct : c33.tealInk
        const sw = r.kind === 'bad' && k === 1 ? 2.6 : 2
        s.push(`<rect x="${cx}" y="${y}" width="${cellW}" height="${cellH}" rx="6" fill="${r.kind === 'good' ? c33.panelA : c33.white}" stroke="${stroke}" stroke-width="${sw}"/>`)
        s.push(`<text x="${cx + cellW / 2}" y="${y + 22}" font-size="13" text-anchor="middle" font-weight="${r.kind === 'good' ? 'bold' : 'normal'}" fill="${c33.ink}">${cell}</text>`)
      })
    }
    if (r.note) {
      s.push(`<text x="${noteX}" y="${y + 21}" font-size="9.5" text-anchor="start" fill="${r.kind === 'bad' ? c33.warn : c33.tealInk}">${r.note}</text>`)
    }
  })
  s.push(`<text x="${W / 2}" y="${checkY}" font-size="10" text-anchor="middle" fill="${c33.ink}">check: 0100 0101 reads as 45 - the arithmetic agrees, 27 + 18 = 45</text>`)
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
  s.push(`<text x="${W / 2}" y="34" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${c33.teal}">ENCODING E-ACUTE (U+00E9) - THE 2-BYTE CLASS</text>`)
  s.push(`<text x="${M}" y="64" font-size="10.5" text-anchor="start" fill="${c33.ink}">code point 233 in 11 bits:</text>`)
  bitStr.split('').forEach((b, k) => {
    const bx = x0 + k * stride
    const g2 = k >= 5
    s.push(`<rect x="${bx}" y="${bitsY}" width="${bitW}" height="${bitH}" rx="5" fill="${g2 ? c33.panelB : c33.white}" stroke="${g2 ? c33.conn : c33.struct}" stroke-width="2"/>`)
    s.push(`<text x="${bx + bitW / 2}" y="${bitsY + 20}" font-size="13" text-anchor="middle" fill="${c33.ink}">${b}</text>`)
  })
  const g1End = x0 + 4 * stride + bitW
  const g2X0 = x0 + 5 * stride
  const g2End = x0 + 10 * stride + bitW
  s.push(`<path d="M ${x0} ${bitsY + bitH + 8} v 7 H ${g1End} v -7" fill="none" stroke="${c33.struct}" stroke-width="1.8"/>`)
  s.push(`<path d="M ${g2X0} ${bitsY + bitH + 8} v 7 H ${g2End} v -7" fill="none" stroke="${c33.conn}" stroke-width="1.8"/>`)
  s.push(`<text x="${(x0 + g1End) / 2}" y="${bitsY + bitH + 32}" font-size="9.5" text-anchor="middle" font-weight="bold" fill="${c33.ink}">00011</text>`)
  s.push(`<text x="${(g2X0 + g2End) / 2}" y="${bitsY + bitH + 32}" font-size="9.5" text-anchor="middle" font-weight="bold" fill="${c33.ink}">101001</text>`)
  s.push(`<text x="${x0}" y="176" font-size="10.5" text-anchor="start" font-family="ui-monospace, monospace" fill="${c33.ink}">prepend 110 -&gt; 110 00011 = 11000011</text>`)
  s.push(`<rect x="${chipX}" y="156" width="${chipW}" height="${chipH}" rx="7" fill="${c33.panelA}" stroke="${c33.accent}" stroke-width="2.2"/>`)
  s.push(`<text x="${chipX + chipW / 2}" y="176" font-size="14" text-anchor="middle" font-weight="bold" fill="${c33.ink}">C3</text>`)
  s.push(`<text x="${x0}" y="208" font-size="10.5" text-anchor="start" font-family="ui-monospace, monospace" fill="${c33.ink}">prepend 10 -&gt; 10 101001 = 10101001</text>`)
  s.push(`<rect x="${chipX}" y="192" width="${chipW}" height="${chipH}" rx="7" fill="${c33.panelB}" stroke="${c33.conn}" stroke-width="2.2"/>`)
  s.push(`<text x="${chipX + chipW / 2}" y="212" font-size="14" text-anchor="middle" font-weight="bold" fill="${c33.ink}">A9</text>`)
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${c33.white}" stroke="${c33.teal}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 19}" font-size="10" text-anchor="middle" fill="${c33.ink}">e-acute (U+00E9) is 233 = 00011101001 in 11 bits - bytes C3 A9</text>`)
  s.push(`<text x="${W / 2}" y="${footY + 36}" font-size="10" text-anchor="middle" fill="${c33.tealInk}">the 2-byte class: 110 plus five payload bits, then 10 plus six payload bits</text>`)
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
  s.push(`<text x="${W / 2}" y="34" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${c33.teal}">THE CASE FLIP - BIT 5 TOGGLES Q INTO q</text>`)
  weights.forEach((wt, k) => {
    s.push(`<text x="${x0 + k * stride + bitW / 2}" y="58" font-size="9.5" text-anchor="middle" fill="${c33.tealInk}">${wt}</text>`)
  })
  const frame = (bits: string[], y: number): void => {
    bits.forEach((b, k) => {
      const bx = x0 + k * stride
      const hot = k === 1
      s.push(`<rect x="${bx}" y="${y}" width="${bitW}" height="${bitH}" rx="7" fill="${hot ? c33.panelA : c33.white}" stroke="${hot ? c33.accent : c33.struct}" stroke-width="${hot ? 2.6 : 2}"/>`)
      s.push(`<text x="${bx + bitW / 2}" y="${y + 24}" font-size="16" text-anchor="middle" font-weight="${hot ? 'bold' : 'normal'}" fill="${c33.ink}">${b}</text>`)
    })
  }
  frame(frameQ, row1Y)
  frame(frameq, row2Y)
  s.push(`<text x="${M}" y="${row1Y + 24}" font-size="12" text-anchor="start" font-weight="bold" fill="${c33.ink}">Q = 81</text>`)
  s.push(`<text x="${M}" y="${row2Y + 24}" font-size="12" text-anchor="start" font-weight="bold" fill="${c33.ink}">q = 113</text>`)
  s.push(`<line x1="300" y1="${row1Y + bitH + 6}" x2="300" y2="${row2Y - 12}" stroke="${c33.accent}" stroke-width="2.4"/>`)
  s.push(`<polygon points="300,${row2Y - 4} 294,${row2Y - 14} 306,${row2Y - 14}" fill="${c33.accent}"/>`)
  s.push(`<text x="322" y="136" font-size="10.5" text-anchor="start" font-weight="bold" fill="${c33.accent}">+32 = set bit 5</text>`)
  s.push(`<text x="${W / 2}" y="${annY}" font-size="10" text-anchor="middle" fill="${c33.ink}">1010001 = 64 + 16 + 1 = 81 - 1110001 = 64 + 32 + 16 + 1 = 113</text>`)
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${c33.panelA}" stroke="${c33.accent}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 19}" font-size="10" text-anchor="middle" fill="${c33.ink}">the frames differ in exactly one position - bit 5, worth 32</text>`)
  s.push(`<text x="${W / 2}" y="${footY + 36}" font-size="10" text-anchor="middle" fill="${c33.tealInk}">81 + 32 = 113, and XOR with 32 flips the case either way</text>`)
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
  s.push(`<text x="${W / 2}" y="34" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${c33.teal}">THE UTF-8 BYTES OF THE STRING A = RUPEE</text>`)
  hexes.forEach((h, k) => {
    const cx = x0 + k * stride
    const isAscii = k < 4
    s.push(`<rect x="${cx}" y="${cellsY}" width="${cellW}" height="${cellH}" rx="6" fill="${isAscii ? c33.white : c33.panelB}" stroke="${isAscii ? c33.struct : c33.conn}" stroke-width="2"/>`)
    s.push(`<text x="${cx + cellW / 2}" y="${cellsY + 24}" font-size="13" text-anchor="middle" font-weight="bold" fill="${c33.ink}">${h}</text>`)
    s.push(`<text x="${cx + cellW / 2}" y="${cellsY + cellH + 16}" font-size="9.5" text-anchor="middle" fill="${c33.tealInk}">${names[k]}</text>`)
  })
  const g1x1 = x0 - 4
  const g1x2 = x0 + 3 * stride + cellW + 4
  const g2x1 = x0 + 4 * stride - 4
  const g2x2 = x0 + 6 * stride + cellW + 4
  s.push(`<path d="M ${g1x1} 128 v 7 H ${g1x2} v -7" fill="none" stroke="${c33.struct}" stroke-width="2"/>`)
  s.push(`<path d="M ${g2x1} 128 v 7 H ${g2x2} v -7" fill="none" stroke="${c33.conn}" stroke-width="2"/>`)
  s.push(`<text x="${(g1x1 + g1x2) / 2}" y="152" font-size="10" text-anchor="middle" font-weight="bold" fill="${c33.ink}">4 ASCII bytes</text>`)
  s.push(`<text x="${(g2x1 + g2x2) / 2}" y="152" font-size="10" text-anchor="middle" font-weight="bold" fill="${c33.ink}">3 rupee bytes</text>`)
  s.push(`<text x="${W / 2}" y="${censY}" font-size="10.5" text-anchor="middle" font-weight="bold" fill="${c33.ink}">the census: 4 ASCII bytes + 3 rupee bytes = 7 bytes</text>`)
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${c33.white}" stroke="${c33.teal}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 19}" font-size="10" text-anchor="middle" fill="${c33.ink}">in decimal the bytes are 65 32 61 32 226 130 185</text>`)
  s.push(`<text x="${W / 2}" y="${footY + 36}" font-size="10" text-anchor="middle" fill="${c33.tealInk}">one character - the rupee - costs three bytes: length is a property of the encoding</text>`)
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
  s.push(`<text x="${W / 2}" y="34" font-size="11.5" text-anchor="middle" letter-spacing="1.5" font-weight="bold" fill="${c33.teal}">ENCODING THE SMILEY (U+1F642) - THE 4-BYTE CLASS</text>`)
  s.push(`<text x="${M}" y="62" font-size="10.5" text-anchor="start" fill="${c33.ink}">code point 128,578 in 21 bits:</text>`)
  bitStr.split('').forEach((b, k) => {
    const bx = x0 + k * stride
    const gi = groups.findIndex((g) => k >= g.from && k <= g.to)
    s.push(`<rect x="${bx}" y="${bitsY}" width="${bitW}" height="${bitH}" rx="4" fill="${gi % 2 === 0 ? c33.white : c33.panelB}" stroke="${gi === 0 ? c33.accent : c33.conn}" stroke-width="1.8"/>`)
    s.push(`<text x="${bx + bitW / 2}" y="${bitsY + 19}" font-size="12" text-anchor="middle" fill="${c33.ink}">${b}</text>`)
  })
  groups.forEach((g) => {
    const gx1 = x0 + g.from * stride
    const gx2 = x0 + g.to * stride + bitW
    s.push(`<path d="M ${gx1} ${bitsY + bitH + 7} v 6 H ${gx2} v -6" fill="none" stroke="${c33.tealInk}" stroke-width="1.6"/>`)
    s.push(`<text x="${(gx1 + gx2) / 2}" y="${bitsY + bitH + 28}" font-size="9.5" text-anchor="middle" font-weight="bold" fill="${c33.ink}">${g.pay}</text>`)
  })
  const asm = [
    { text: '11110 + 000 -&gt; 11110000', chip: 'F0' },
    { text: '10 + 011111 -&gt; 10011111', chip: '9F' },
    { text: '10 + 011001 -&gt; 10011001', chip: '99' },
    { text: '10 + 000010 -&gt; 10000010', chip: '82' },
  ]
  asm.forEach((r, ri) => {
    const y = rowsY[ri]
    s.push(`<text x="${x0}" y="${y + 18}" font-size="10" text-anchor="start" font-family="ui-monospace, monospace" fill="${c33.ink}">${r.text}</text>`)
    s.push(`<rect x="${chipX}" y="${y}" width="${chipW}" height="${chipH}" rx="6" fill="${ri === 0 ? c33.panelA : c33.panelB}" stroke="${ri === 0 ? c33.accent : c33.conn}" stroke-width="2.2"/>`)
    s.push(`<text x="${chipX + chipW / 2}" y="${y + 18}" font-size="13" text-anchor="middle" font-weight="bold" fill="${c33.ink}">${r.chip}</text>`)
  })
  s.push(`<rect x="${M}" y="${footY}" width="${W - 2 * M}" height="${footH}" rx="8" fill="${c33.white}" stroke="${c33.teal}" stroke-width="1.8"/>`)
  s.push(`<text x="${W / 2}" y="${footY + 25}" font-size="10.5" text-anchor="middle" font-weight="bold" fill="${c33.ink}">the smiley U+1F642 = 128,578 encodes as the four bytes F0 9F 99 82</text>`)
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
const c34 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f34 = 'ui-sans-serif, system-ui, sans-serif'

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
    { name: 'Text typing', sub: '5 chars/s x 1 B x 1 channel', rate: 5, rateTxt: '5 B/s', note: 'the trickle', fill: c34.teal },
    { name: 'CD stereo sound', sub: '44,100/s x 2 B x 2 channels', rate: 176400, rateTxt: '176,400 B/s', note: 'x 35,280 over typing', fill: c34.conn },
    { name: 'Raw 1080p30 video', sub: '62,208,000/s x 1 B x 3 channels', rate: 186624000, rateTxt: '186,624,000 B/s', note: 'x about 1,058 over sound', fill: c34.accent },
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
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${c34.teal}">THE RATE LADDER - ONE MULTIPLICATION, THREE UNIFORMS</text>`)
  rows.forEach((r, ri) => {
    const y = topY + ri * rowStep
    const w = len(r.rate)
    s.push(`<text x="${M}" y="${y + 12}" font-size="11" text-anchor="start" font-weight="bold" fill="${c34.ink}">${r.name}</text>`)
    s.push(`<text x="${M}" y="${y + 26}" font-size="9.5" text-anchor="start" fill="${c34.tealInk}">${r.sub}</text>`)
    s.push(`<rect x="${barX0}" y="${y}" width="${maxBarW}" height="${barH}" rx="5" fill="${c34.white}" stroke="${c34.mid}" stroke-width="1" stroke-dasharray="3 3"/>`)
    s.push(`<rect x="${barX0}" y="${y}" width="${w.toFixed(1)}" height="${barH}" rx="5" fill="${r.fill}" stroke="${c34.ink}" stroke-width="1.4"/>`)
    s.push(`<text x="${valX}" y="${y + 13}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${c34.ink}">${r.rateTxt}</text>`)
    s.push(`<text x="${valX}" y="${y + 27}" font-size="9.5" text-anchor="start" fill="${c34.tealInk}">${r.note}</text>`)
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c34.panelB}" stroke="${c34.conn}" stroke-width="1.6"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 24}" font-size="10" text-anchor="middle" fill="${c34.ink}">the rungs of the ladder: sound is 35,280 x typing; video is 37,324,800 x typing and about 1,058 x sound</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 44}" font-size="10" text-anchor="middle" fill="${c34.tealInk}">bar lengths are log-scaled - each equal step of length is a tenfold step of rate</text>`)
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
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${c34.teal}">THE SAMPLING METER - THE WAVE BECOMES A LIST OF NUMBERS</text>`)
  s.push(`<text x="${W / 2}" y="${subY}" font-size="10" text-anchor="middle" fill="${c34.tealInk}">three cycles, 24 sample dots - eight dots per cycle - at equal intervals of time</text>`)
  s.push(`<line x1="${x0 - 10}" y1="${midY}" x2="${x1 + 10}" y2="${midY}" stroke="${c34.mid}" stroke-width="1.2" stroke-dasharray="4 3"/>`)
  let d = ''
  for (let x = x0; x <= x1; x += 3) d += (d === '' ? 'M' : ' L') + `${x.toFixed(1)} ${waveY(x).toFixed(1)}`
  s.push(`<path d="${d}" fill="none" stroke="${c34.teal}" stroke-width="2.4"/>`)
  for (let i = 0; i < N; i++) {
    const x = x0 + (span * i) / N
    const y = waveY(x)
    s.push(`<line x1="${x.toFixed(1)}" y1="${midY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${c34.conn}" stroke-width="1.1"/>`)
    s.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${c34.accent}" stroke="${c34.ink}" stroke-width="1"/>`)
  }
  s.push(`<text x="${(x0 + x1) / 2}" y="${midY + A + 22}" font-size="10" text-anchor="middle" fill="${c34.ink}">the machine keeps only the dot heights - one number per dot</text>`)
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c34.panelA}" stroke="${c34.accent}" stroke-width="1.6"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 24}" font-size="10.5" text-anchor="middle" font-weight="bold" fill="${c34.ink}">the CD census: 294 PAL active lines x 50 fields x 3 samples per line = 44,100 samples/s</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 44}" font-size="10" text-anchor="middle" fill="${c34.ink}">each sample rides 2 bytes on each of 2 channels: 44,100 x 2 x 2 = 176,400 B/s</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 62}" font-size="9.5" text-anchor="middle" fill="${c34.tealInk}">samples sit about 22.7 microseconds apart; 2.205 dots land on each 20,000 Hz cycle</text>`)
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
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${c34.teal}">THE PIXEL GRID, ZOOMED: ONE CELL AND ITS THREE BYTES</text>`)
  s.push(`<text x="${W / 2}" y="${subY}" font-size="10" text-anchor="middle" fill="${c34.tealInk}">a 1920 x 1080 grid is this picture with 2,073,600 cells - here only 8 x 5 are drawn</text>`)
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const isHl = r === hlRow && c === hlCol
      s.push(`<rect x="${gx + c * cell}" y="${gy + r * cell}" width="${cell}" height="${cell}" fill="${isHl ? c34.accent : c34.panelA}" stroke="${c34.ink}" stroke-width="${isHl ? 2 : 0.8}"/>`)
    }
  }
  const hx = gx + hlCol * cell
  const hy = gy + hlRow * cell
  s.push(`<line x1="${hx + cell}" y1="${hy}" x2="${bx}" y2="${by}" stroke="${c34.accent}" stroke-width="1.4" stroke-dasharray="4 3"/>`)
  s.push(`<line x1="${hx + cell}" y1="${hy + cell}" x2="${bx}" y2="${by + bh}" stroke="${c34.accent}" stroke-width="1.4" stroke-dasharray="4 3"/>`)
  s.push(`<text x="${gx}" y="${gy + ROWS * cell + 18}" font-size="9.5" text-anchor="start" fill="${c34.tealInk}">the image grid: 8 x 5 cells</text>`)
  s.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="8" fill="${c34.white}" stroke="${c34.ink}" stroke-width="1.6"/>`)
  const letters = ['R', 'G', 'B']
  const fills = [c34.accent, c34.struct, c34.teal]
  for (let i = 0; i < 3; i++) {
    const x = bx + pad + i * (bwb + inner)
    const y = by + 26
    const h = bh - 26 - pad
    s.push(`<rect x="${x.toFixed(1)}" y="${y}" width="${bwb.toFixed(1)}" height="${h}" rx="6" fill="${fills[i]}" stroke="${c34.ink}" stroke-width="1.2"/>`)
    s.push(`<text x="${(x + bwb / 2).toFixed(1)}" y="${y + h / 2 - 4}" font-size="13" text-anchor="middle" font-weight="bold" fill="${c34.white}">${letters[i]}</text>`)
    s.push(`<text x="${(x + bwb / 2).toFixed(1)}" y="${y + h / 2 + 16}" font-size="10" text-anchor="middle" fill="${c34.white}">8 bits</text>`)
  }
  s.push(`<text x="${bx + bw / 2}" y="${by + 18}" font-size="9.5" text-anchor="middle" fill="${c34.tealInk}">one pixel, opened up</text>`)
  s.push(`<text x="${bx + bw / 2}" y="${by + bh + 20}" font-size="10.5" text-anchor="middle" font-weight="bold" fill="${c34.ink}">one pixel = 3 bytes = 24 bits</text>`)
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c34.panelB}" stroke="${c34.conn}" stroke-width="1.6"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 24}" font-size="10" text-anchor="middle" fill="${c34.ink}">each byte-cell names 256 levels: 256 x 256 x 256 = 2 to the 24 = 16,777,216 colours from one cell</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 44}" font-size="10" text-anchor="middle" fill="${c34.tealInk}">a gray cell needs only one byte - 256 levels; RGB needs three - 16,777,216</text>`)
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
  s.push(`<text x="${W / 2}" y="${headY}" font-size="12" text-anchor="middle" letter-spacing="2" font-weight="bold" fill="${c34.teal}">THE CD TIMELINE - FROM VIDEO TAPE TO THE SHOP SHELF</text>`)
  s.push(`<text x="${W / 2}" y="${subY}" font-size="10" text-anchor="middle" fill="${c34.tealInk}">three years from adaptor to player; two from Red Book to shop</text>`)
  s.push(`<line x1="${x0}" y1="${lineY}" x2="${x1 + 6}" y2="${lineY}" stroke="${c34.ink}" stroke-width="2"/>`)
  s.push(`<line x1="${x1 + 6}" y1="${lineY}" x2="${x1 - 4}" y2="${lineY - 6}" stroke="${c34.ink}" stroke-width="2"/>`)
  s.push(`<line x1="${x1 + 6}" y1="${lineY}" x2="${x1 - 4}" y2="${lineY + 6}" stroke="${c34.ink}" stroke-width="2"/>`)
  marks.forEach((mk) => {
    const x = tx(mk.t)
    s.push(`<line x1="${x.toFixed(1)}" y1="${lineY - 8}" x2="${x.toFixed(1)}" y2="${lineY + 8}" stroke="${c34.ink}" stroke-width="2"/>`)
    s.push(`<circle cx="${x.toFixed(1)}" cy="${lineY}" r="5" fill="${c34.accent}" stroke="${c34.ink}" stroke-width="1.2"/>`)
    if (mk.above) {
      s.push(`<text x="${x.toFixed(1)}" y="${lineY - 66}" font-size="11" text-anchor="middle" font-weight="bold" fill="${c34.accent}">${mk.head}</text>`)
      mk.lines.forEach((ln, i) => s.push(`<text x="${x.toFixed(1)}" y="${lineY - 50 + i * 14}" font-size="9.5" text-anchor="middle" fill="${c34.ink}">${ln}</text>`))
    } else {
      s.push(`<text x="${x.toFixed(1)}" y="${lineY + 26}" font-size="11" text-anchor="middle" font-weight="bold" fill="${c34.accent}">${mk.head}</text>`)
      mk.lines.forEach((ln, i) => s.push(`<text x="${x.toFixed(1)}" y="${lineY + 42 + i * 14}" font-size="9.5" text-anchor="middle" fill="${c34.ink}">${ln}</text>`))
    }
  })
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c34.panelA}" stroke="${c34.accent}" stroke-width="1.6"/>`)
  s.push(`<text x="${W / 2}" y="${stripY + 26}" font-size="10" text-anchor="middle" font-weight="bold" fill="${c34.ink}">why 44,100? PAL video ran 294 active lines x 50 fields x 3 samples per line</text>`)
  s.push(`<text x="${W / 2}" y="${stripY + 46}" font-size="10" text-anchor="middle" fill="${c34.ink}">the 74-minute disc: 4,440 s x 176,400 B/s = 783,216,000 B of sound</text>`)
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
  s.push(`<text x="${W / 2}" y="30" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${c34.teal}">THE GRAY-FRAME CENSUS: 640 x 480, EIGHT BITS DEEP</text>`)
  boxes.forEach((b, i) => {
    const x = M + i * (bw + gap)
    s.push(`<rect x="${x.toFixed(1)}" y="${by}" width="${bw}" height="${bh}" rx="8" fill="${i === 3 ? c34.panelB : c34.white}" stroke="${i === 3 ? c34.conn : c34.ink}" stroke-width="1.5"/>`)
    s.push(`<text x="${(x + bw / 2).toFixed(1)}" y="${by + 23}" font-size="11" text-anchor="middle" font-weight="bold" fill="${c34.ink}">${b.t1}</text>`)
    s.push(`<text x="${(x + bw / 2).toFixed(1)}" y="${by + 42}" font-size="9.5" text-anchor="middle" fill="${c34.tealInk}">${b.t2}</text>`)
    if (i < 3) s.push(`<text x="${(x + bw + gap / 2).toFixed(1)}" y="${by + 34}" font-size="12" text-anchor="middle" font-weight="bold" fill="${c34.accent}">></text>`)
  })
  s.push(`<text x="${W / 2}" y="${H - 14}" font-size="10" text-anchor="middle" fill="${c34.tealInk}">one byte per cell, no channels to multiply - 307,200 B = 300 KiB = 0.29296875 MiB exactly</text>`)
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
  s.push(`<text x="${W / 2}" y="26" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${c34.teal}">1024 x 768 x 3 = 2,359,296 B = 2.25 MiB - EXACTLY</text>`)
  s.push(`<rect x="${x0}" y="${y0}" width="${sq}" height="${sq}" fill="${c34.struct}" stroke="${c34.ink}" stroke-width="1.4"/>`)
  s.push(`<rect x="${x0 + sq + gap}" y="${y0}" width="${sq}" height="${sq}" fill="${c34.teal}" stroke="${c34.ink}" stroke-width="1.4"/>`)
  s.push(`<rect x="${x0 + 2 * (sq + gap)}" y="${y0}" width="${qs}" height="${qs}" fill="${c34.conn}" stroke="${c34.ink}" stroke-width="1.4"/>`)
  s.push(`<text x="${x0 + sq / 2}" y="${y0 + sq + 20}" font-size="10" text-anchor="middle" font-weight="bold" fill="${c34.ink}">1 MiB</text>`)
  s.push(`<text x="${x0 + sq + gap + sq / 2}" y="${y0 + sq + 20}" font-size="10" text-anchor="middle" font-weight="bold" fill="${c34.ink}">1 MiB</text>`)
  s.push(`<text x="${x0 + 2 * (sq + gap) + qs / 2}" y="${y0 + sq + 20}" font-size="10" text-anchor="middle" font-weight="bold" fill="${c34.ink}">quarter MiB</text>`)
  s.push(`<text x="470" y="${y0 + 18}" font-size="10.5" text-anchor="start" fill="${c34.ink}">786,432 cells x 3 bytes</text>`)
  s.push(`<text x="470" y="${y0 + 40}" font-size="10.5" text-anchor="start" fill="${c34.ink}">= 2,359,296 B</text>`)
  s.push(`<text x="470" y="${y0 + 62}" font-size="10.5" text-anchor="start" fill="${c34.ink}">/ 1,048,576</text>`)
  s.push(`<text x="470" y="${y0 + 84}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${c34.ink}">= 2.25 MiB, no rounding</text>`)
  s.push(`<text x="${W / 2}" y="${H - 12}" font-size="9.5" text-anchor="middle" fill="${c34.tealInk}">the quarter block is half a side each way - a quarter of the area, 262,144 B</text>`)
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
  s.push(`<text x="${W / 2}" y="28" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${c34.teal}">ONE LINE, TWO BILLS: k a sp = sp ka (ka = the Devanagari letter)</text>`)
  let cx = u8x0
  cells.forEach((c) => {
    const w = c.b * unit
    s.push(`<text x="${(cx + w / 2).toFixed(1)}" y="${y8 - 8}" font-size="9.5" text-anchor="middle" fill="${c34.tealInk}">${c.ch}</text>`)
    s.push(`<rect x="${cx.toFixed(1)}" y="${y8}" width="${w}" height="${h}" rx="4" fill="${c.b === 3 ? c34.accent : c34.struct}" stroke="${c34.ink}" stroke-width="1.2"/>`)
    s.push(`<text x="${(cx + w / 2).toFixed(1)}" y="${y8 + 24}" font-size="10" text-anchor="middle" font-weight="bold" fill="${c34.white}">${c.b} B</text>`)
    cx += w
  })
  s.push(`<text x="40" y="${y8 + 24}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${c34.ink}">UTF-8</text>`)
  s.push(`<text x="${W - 40}" y="${y8 + 24}" font-size="10.5" text-anchor="end" font-weight="bold" fill="${c34.ink}">9 bytes</text>`)
  cx = u16x0
  cells.forEach((c) => {
    s.push(`<text x="${(cx + u16w / 2).toFixed(1)}" y="${y16 - 8}" font-size="9.5" text-anchor="middle" fill="${c34.tealInk}">${c.ch}</text>`)
    s.push(`<rect x="${cx.toFixed(1)}" y="${y16}" width="${u16w}" height="${h}" rx="4" fill="${c34.teal}" stroke="${c34.ink}" stroke-width="1.2"/>`)
    s.push(`<text x="${(cx + u16w / 2).toFixed(1)}" y="${y16 + 24}" font-size="10" text-anchor="middle" font-weight="bold" fill="${c34.white}">2 B</text>`)
    cx += u16w
  })
  s.push(`<text x="40" y="${y16 + 24}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${c34.ink}">UTF-16</text>`)
  s.push(`<text x="${W - 40}" y="${y16 + 24}" font-size="10.5" text-anchor="end" font-weight="bold" fill="${c34.ink}">12 bytes</text>`)
  s.push(`<text x="${W / 2}" y="${H - 12}" font-size="10" text-anchor="middle" fill="${c34.tealInk}">the Devanagari cell rides the 3-byte class in UTF-8, but only 2 bytes in UTF-16</text>`)
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
  s.push(`<text x="${W / 2}" y="30" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${c34.teal}">THE GUARD BAND: 22,050 - 20,000 = 2,050 Hz OF SAFETY</text>`)
  s.push(`<rect x="${fx(0).toFixed(1)}" y="${stripY}" width="${(fx(20000) - fx(0)).toFixed(1)}" height="${stripH}" fill="${c34.panelB}" stroke="${c34.ink}" stroke-width="1"/>`)
  s.push(`<rect x="${fx(20000).toFixed(1)}" y="${stripY}" width="${(fx(22050) - fx(20000)).toFixed(1)}" height="${stripH}" fill="${c34.faint}" stroke="${c34.ink}" stroke-width="1"/>`)
  s.push(`<rect x="${fx(22050).toFixed(1)}" y="${stripY}" width="${(fx(24000) - fx(22050)).toFixed(1)}" height="${stripH}" fill="${c34.white}" stroke="${c34.ink}" stroke-width="1"/>`)
  s.push(`<text x="${(fx(10000)).toFixed(1)}" y="${stripY + 24}" font-size="10" text-anchor="middle" font-weight="bold" fill="${c34.ink}">hearing: 20 Hz to 20,000 Hz</text>`)
  s.push(`<text x="${((fx(20000) + fx(22050)) / 2).toFixed(1)}" y="${stripY - 8}" font-size="9.5" text-anchor="middle" fill="${c34.tealInk}">guard band 2,050 Hz</text>`)
  s.push(`<text x="${((fx(22050) + fx(24000)) / 2).toFixed(1)}" y="${stripY + 24}" font-size="9.5" text-anchor="middle" fill="${c34.warn}">beyond</text>`)
  s.push(`<line x1="${fx(20000).toFixed(1)}" y1="${stripY + stripH}" x2="${fx(20000).toFixed(1)}" y2="${stripY + stripH + 10}" stroke="${c34.ink}" stroke-width="1.4"/>`)
  s.push(`<line x1="${fx(22050).toFixed(1)}" y1="${stripY + stripH}" x2="${fx(22050).toFixed(1)}" y2="${stripY + stripH + 10}" stroke="${c34.ink}" stroke-width="1.4"/>`)
  s.push(`<text x="${fx(0).toFixed(1)}" y="${stripY + stripH + 26}" font-size="9.5" text-anchor="middle" fill="${c34.ink}">0</text>`)
  s.push(`<text x="${fx(20000).toFixed(1)}" y="${stripY + stripH + 26}" font-size="9.5" text-anchor="middle" fill="${c34.ink}">20,000</text>`)
  s.push(`<text x="${fx(24000).toFixed(1)}" y="${stripY + stripH + 26}" font-size="9.5" text-anchor="middle" fill="${c34.ink}">24,000 Hz</text>`)
  s.push(`<text x="${fx(22050).toFixed(1)}" y="${stripY + stripH + 44}" font-size="9.5" text-anchor="middle" fill="${c34.accent}">22,050 - the Nyquist limit</text>`)
  const xa = fx(23000)
  const xb = fx(21100)
  s.push(`<circle cx="${xa.toFixed(1)}" cy="52" r="4" fill="${c34.warn}" stroke="${c34.ink}" stroke-width="1"/>`)
  s.push(`<circle cx="${xb.toFixed(1)}" cy="52" r="4" fill="${c34.accent}" stroke="${c34.ink}" stroke-width="1"/>`)
  s.push(`<path d="M ${xa.toFixed(1)} 52 Q ${((xa + xb) / 2).toFixed(1)} 68 ${xb.toFixed(1)} 52" fill="none" stroke="${c34.warn}" stroke-width="1.6"/>`)
  s.push(`<text x="${((xa + xb) / 2 + 6).toFixed(1)}" y="46" font-size="9.5" text-anchor="middle" fill="${c34.warn}">a 23,000 Hz tone folds to 21,100 Hz</text>`)
  s.push(`<text x="${W / 2}" y="${H - 10}" font-size="10" text-anchor="middle" fill="${c34.tealInk}">44,100 - 23,000 = 21,100 Hz: the alias lands inside hearing - the guard band is the moat</text>`)
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
  s.push(`<text x="${W / 2}" y="30" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${c34.teal}">HOW MANY 12 MP PHOTOS FIT ON A 2 GiB CARD?</text>`)
  s.push(`<text x="${barX}" y="${barY - 10}" font-size="10" text-anchor="start" fill="${c34.tealInk}">2 GiB = 2,147,483,648 B</text>`)
  s.push(`<rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" rx="6" fill="${c34.white}" stroke="${c34.ink}" stroke-width="1.5"/>`)
  s.push(`<rect x="${barX}" y="${barY}" width="${fillW.toFixed(1)}" height="${barH}" rx="6" fill="${c34.struct}" stroke="${c34.ink}" stroke-width="1.5"/>`)
  for (let k = 1; k <= 5; k++) {
    const x = barX + k * tickStep
    s.push(`<line x1="${x.toFixed(1)}" y1="${barY + barH}" x2="${x.toFixed(1)}" y2="${barY + barH + 7}" stroke="${c34.ink}" stroke-width="1.2"/>`)
    s.push(`<text x="${x.toFixed(1)}" y="${barY + barH + 20}" font-size="9.5" text-anchor="middle" fill="${c34.tealInk}">${k * 10}</text>`)
  }
  s.push(`<text x="${(barX + fillW / 2).toFixed(1)}" y="${barY + 22}" font-size="10" text-anchor="middle" font-weight="bold" fill="${c34.white}">59 photos x 36,000,000 B = 2,124,000,000 B</text>`)
  s.push(`<text x="${W - M}" y="${barY + barH + 20}" font-size="9.5" text-anchor="end" fill="${c34.warn}">left over: 23,483,648 B</text>`)
  s.push(`<text x="${W / 2}" y="${H - 10}" font-size="10" text-anchor="middle" fill="${c34.ink}">the 60th photo needs 36,000,000 B but only 23,483,648 remain - so 59 fit, with 98.9 per cent of the card used</text>`)
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
    { y: 56, name: 'the video itself', mins: 1, txt: '1 minute', fill: c34.teal },
    { y: 112, name: 'the download', mins: 14.92992, txt: '895.7952 s - about 14.93 minutes', fill: c34.accent },
  ]
  const barX = 170
  const barH = 30
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two time bars. The video itself is one minute of raw 1080p30. The download of that minute over a 100 megabit per second link takes 895.7952 seconds, about 14.93 minutes, because the stream bills 1.492992 gigabits per second - 14.92992 lanes of the link. The download bar is about fifteen times longer than the video bar.">`)
  s.push(`<text x="${W / 2}" y="30" font-size="11" text-anchor="middle" letter-spacing="1" font-weight="bold" fill="${c34.teal}">ONE MINUTE OF RAW 1080p30 ON A 100 Mbit/s LINK</text>`)
  rows.forEach((r) => {
    const w = r.mins * scale
    s.push(`<text x="16" y="${r.y + 20}" font-size="10.5" text-anchor="start" font-weight="bold" fill="${c34.ink}">${r.name}</text>`)
    s.push(`<rect x="${barX}" y="${r.y}" width="${w.toFixed(1)}" height="${barH}" rx="5" fill="${r.fill}" stroke="${c34.ink}" stroke-width="1.4"/>`)
    if (r.mins === 1) {
      s.push(`<text x="${(barX + w + 10).toFixed(1)}" y="${r.y + 20}" font-size="10" text-anchor="start" font-weight="bold" fill="${c34.ink}">${r.txt}</text>`)
    } else {
      s.push(`<text x="${(barX + w / 2).toFixed(1)}" y="${r.y + 20}" font-size="10" text-anchor="middle" font-weight="bold" fill="${c34.white}">${r.txt}</text>`)
    }
  })
  s.push(`<text x="${W / 2}" y="${H - 12}" font-size="10" text-anchor="middle" fill="${c34.tealInk}">the stream bills 1.492992 Gbit/s - 14.92992 lanes of a 100 Mbit/s link, all day, every frame</text>`)
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

/**
 * part-cf35.ts — CS RUN 6 seat cf35 (round 2), the PACKING lesson.
 *
 * Lesson 3.5 'Compression: Lossless and Lossy' of Computer Fundamentals
 * chapter 3 'Data Representation: a First Meeting'. Lesson 3.4 counted the
 * firehose; this lesson answers the packing question it left open: which
 * bytes can go, and can they come BACK? The two honest answers — lossless
 * (every bit returns) and lossy (some are gone forever, chosen to be the
 * ones you miss least) — with RLE, Huffman, LZW, JPEG and MP3 as the
 * witnesses, every number pinned green by v-cf35.ts (105 checks).
 *
 * Study-never-reproduce: every roster, witness, figure, Illustration, quiz
 * item and exercise is OUR OWN. All figures are self-contained computed
 * SVGs in the house palette; geometry is derived, never eyeballed.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const c35 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f35 = 'ui-sans-serif, system-ui, sans-serif'

/* ------------------------------------------------------------------ */
/* BODY FIGURE 1 — one file, two doors (the chapter's sharpest line)   */
/* ------------------------------------------------------------------ */
function cf35TwoDoorsSvg(): string {
  const W = 720
  const H = 320
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f35}" role="img" aria-label="One file enters two doors. The lossless door, in green, promises that every bit returns and the decoded copy is identical, the home of text, code, ZIP, PNG, GIF, run-length encoding and Huffman. The lossy door, in orange, warns that some bits never return and the decode is only a close copy, the home of photos and music: JPEG, MP3 and most video. The input file shown is the ten-character witness AABBCCCCCD.">`)
  s.push(`<text x="${W / 2}" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="${c35.tealInk}">ONE FILE, TWO DOORS - THE SHARPEST LINE IN THE CHAPTER</text>`)
  /* the file, left */
  s.push(`<rect x="24" y="126" width="150" height="68" rx="6" fill="${c35.panelA}" stroke="${c35.conn}" stroke-width="2"/>`)
  s.push(`<text x="99" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.ink}">THE FILE</text>`)
  s.push(`<text x="99" y="166" text-anchor="middle" font-size="11" fill="${c35.tealInk}">AABBCCCCCD</text>`)
  s.push(`<text x="99" y="182" text-anchor="middle" font-size="9.5" fill="${c35.ink}">10 characters</text>`)
  /* arrows */
  s.push(`<line x1="178" y1="150" x2="242" y2="94" stroke="${c35.mid}" stroke-width="2"/>`)
  s.push(`<polygon points="250,88 236,96 244,102" fill="${c35.mid}"/>`)
  s.push(`<line x1="178" y1="170" x2="242" y2="226" stroke="${c35.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="250,232 236,224 244,218" fill="${c35.conn}"/>`)
  /* door 1: lossless */
  s.push(`<rect x="250" y="44" width="180" height="84" rx="6" fill="${c35.white}" stroke="${c35.struct}" stroke-width="2.5"/>`)
  s.push(`<text x="340" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="${c35.ink}">LOSSLESS</text>`)
  s.push(`<text x="340" y="92" text-anchor="middle" font-size="10.5" fill="${c35.ink}">every bit returns</text>`)
  s.push(`<text x="340" y="108" text-anchor="middle" font-size="9.5" fill="${c35.tealInk}">decode: identical</text>`)
  s.push(`<text x="446" y="78" text-anchor="start" font-size="10" fill="${c35.tealInk}">the home of text and code:</text>`)
  s.push(`<text x="446" y="96" text-anchor="start" font-size="10" fill="${c35.ink}">ZIP, PNG, GIF, RLE, Huffman</text>`)
  s.push(`<text x="340" y="148" text-anchor="middle" font-size="9.5" fill="${c35.ink}">out: the original, bit for bit</text>`)
  /* door 2: lossy */
  s.push(`<rect x="250" y="188" width="180" height="84" rx="6" fill="${c35.white}" stroke="${c35.accent}" stroke-width="2.5"/>`)
  s.push(`<text x="340" y="216" text-anchor="middle" font-size="13" font-weight="bold" fill="${c35.accent}">LOSSY</text>`)
  s.push(`<text x="340" y="236" text-anchor="middle" font-size="10.5" fill="${c35.ink}">some bits never return</text>`)
  s.push(`<text x="340" y="252" text-anchor="middle" font-size="9.5" fill="${c35.tealInk}">decode: a close copy</text>`)
  s.push(`<text x="446" y="222" text-anchor="start" font-size="10" fill="${c35.tealInk}">the home of photos and music:</text>`)
  s.push(`<text x="446" y="240" text-anchor="start" font-size="10" fill="${c35.ink}">JPEG, MP3, most video</text>`)
  s.push(`<text x="340" y="292" text-anchor="middle" font-size="9.5" fill="${c35.ink}">out: a close copy, some bits gone</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 2 — the Huffman tree of {A:5, B:2, C:1, D:1}            */
/* ------------------------------------------------------------------ */
function cf35HuffmanTreeSvg(): string {
  const W = 720
  const H = 400
  const R = 17
  /* node positions computed from the merge ladder 1+1->2, 2+2->4, 4+5->9 */
  const root = { x: 360, y: 72, w: '9' }
  const a = { x: 150, y: 168, w: '5' }
  const n4 = { x: 540, y: 168, w: '4' }
  const b = { x: 420, y: 252, w: '2' }
  const n2 = { x: 640, y: 252, w: '2' }
  const c = { x: 575, y: 338, w: '1' }
  const d = { x: 685, y: 338, w: '1' }
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f35}" role="img" aria-label="The Huffman tree for the alphabet A with weight 5, B with weight 2, C with weight 1 and D with weight 1. The root carries weight 9. Its 0 edge leads straight to A at depth 1; its 1 edge leads to a weight-4 node, whose 0 edge leads to B at depth 2 and whose 1 edge leads to a weight-2 node, whose 0 edge leads to C at depth 3 and whose 1 edge leads to D at depth 3. So the codewords are A equals 0, B equals 10, C equals 110, D equals 111, and the total cost is 5 times 1 plus 2 times 2 plus 1 times 3 plus 1 times 3 equals 15 bits, against 18 for a fixed 2-bit code.">`)
  s.push(`<text x="${W / 2}" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${c35.tealInk}">THE HUFFMAN TREE FOR A:5, B:2, C:1, D:1</text>`)
  const edge = (p: { x: number; y: number }, q: { x: number; y: number }) =>
    s.push(`<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" stroke="${c35.mid}" stroke-width="2"/>`)
  edge(root, a); edge(root, n4); edge(n4, b); edge(n4, n2); edge(n2, c); edge(n2, d)
  const bit = (x: number, y: number, t: string) =>
    s.push(`<text x="${x}" y="${y}" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.conn}" stroke="${c35.paper}" stroke-width="3" paint-order="stroke">${t}</text>`)
  bit(243, 116, '0'); bit(462, 116, '1'); bit(468, 206, '0'); bit(602, 206, '1'); bit(596, 291, '0'); bit(674, 291, '1')
  const node = (n: { x: number; y: number; w: string }, leaf: boolean) => {
    s.push(`<circle cx="${n.x}" cy="${n.y}" r="${R}" fill="${leaf ? c35.panelB : c35.white}" stroke="${leaf ? c35.conn : c35.teal}" stroke-width="2"/>`)
    s.push(`<text x="${n.x}" y="${n.y + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.ink}">${n.w}</text>`)
  }
  node(root, false); node(a, true); node(n4, false); node(b, true); node(n2, false); node(c, true); node(d, true)
  s.push(`<text x="36" y="172" text-anchor="start" font-size="9.5" fill="${c35.tealInk}">depth 1</text>`)
  s.push(`<text x="36" y="256" text-anchor="start" font-size="9.5" fill="${c35.tealInk}">depth 2</text>`)
  s.push(`<text x="36" y="342" text-anchor="start" font-size="9.5" fill="${c35.tealInk}">depth 3</text>`)
  s.push(`<text x="150" y="200" text-anchor="middle" font-size="10" fill="${c35.ink}">A wears 0 - depth 1</text>`)
  s.push(`<text x="420" y="284" text-anchor="middle" font-size="10" fill="${c35.ink}">B wears 10 - depth 2</text>`)
  s.push(`<text x="575" y="370" text-anchor="middle" font-size="10" fill="${c35.ink}">C wears 110</text>`)
  s.push(`<text x="680" y="370" text-anchor="middle" font-size="10" fill="${c35.ink}">D wears 111</text>`)
  s.push(`<text x="${W / 2}" y="394" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.tealInk}">5x1 + 2x2 + 1x3 + 1x3 = 15 bits - a fixed 2-bit code would cost 18</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 3 — the JPEG block grid over the 1080p luma plane       */
/* ------------------------------------------------------------------ */
function cf35JpegGridSvg(): string {
  const W = 720
  const H = 372
  const RX = 40
  const RY = 56
  const RW = 384 /* 8 columns of 48 */
  const RH = 216 /* 9 rows of 24 - a true 16:9 */
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f35}" role="img" aria-label="The 1920 by 1080 luma plane tiled by 8 by 8 blocks. The grid rectangle is drawn 16 to 9, with faint lattice lines suggesting the tiling. Annotations: 240 block columns, because 1920 divided by 8 is 240; 135 block rows, because 1080 divided by 8 is 135; 240 times 135 equals 32,400 blocks, each holding 8 by 8 equals 64 samples, multiplying back to exactly 2,073,600 samples. 4:2:0 chroma subsampling halves the colour bill from 12 samples to 6 per 2 by 2 area, so the frame totals 3,110,400 samples of the RGB 6,220,800. One 8 by 8 block is magnified at the right.">`)
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${c35.tealInk}">THE 1080p LUMA PLANE AS 8 x 8 BLOCKS</text>`)
  s.push(`<text x="232" y="48" text-anchor="middle" font-size="10" fill="${c35.ink}">the 1920 x 1080 luma plane</text>`)
  s.push(`<rect x="${RX}" y="${RY}" width="${RW}" height="${RH}" fill="${c35.white}" stroke="${c35.ink}" stroke-width="2"/>`)
  for (let k = 1; k <= 7; k++) s.push(`<line x1="${RX + 48 * k}" y1="${RY}" x2="${RX + 48 * k}" y2="${RY + RH}" stroke="${c35.faint}" stroke-width="1"/>`)
  for (let k = 1; k <= 8; k++) s.push(`<line x1="${RX}" y1="${RY + 24 * k}" x2="${RX + RW}" y2="${RY + 24 * k}" stroke="${c35.faint}" stroke-width="1"/>`)
  s.push(`<rect x="232" y="128" width="48" height="24" fill="none" stroke="${c35.accent}" stroke-width="2"/>`)
  s.push(`<text x="232" y="290" text-anchor="middle" font-size="10.5" fill="${c35.ink}">240 block columns = 1920 / 8</text>`)
  s.push(`<text x="232" y="310" text-anchor="middle" font-size="10.5" fill="${c35.ink}">135 block rows = 1080 / 8</text>`)
  s.push(`<text x="232" y="330" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${c35.tealInk}">240 x 135 = 32,400 blocks, each 8 x 8 = 64 samples</text>`)
  s.push(`<text x="452" y="80" text-anchor="start" font-size="11" font-weight="bold" fill="${c35.ink}">THE CENSUS</text>`)
  s.push(`<text x="452" y="106" text-anchor="start" font-size="11" fill="${c35.ink}">240 x 135 = 32,400 blocks</text>`)
  s.push(`<text x="452" y="132" text-anchor="start" font-size="11" fill="${c35.ink}">each block is 8 x 8 = 64 samples</text>`)
  s.push(`<text x="452" y="158" text-anchor="start" font-size="11" fill="${c35.ink}">32,400 x 64 = 2,073,600 samples</text>`)
  s.push(`<text x="452" y="184" text-anchor="start" font-size="11" fill="${c35.conn}">4:2:0 halves the colour bill:</text>`)
  s.push(`<text x="452" y="210" text-anchor="start" font-size="11" fill="${c35.conn}">12 samples become 6 per 2 x 2 area</text>`)
  s.push(`<text x="452" y="236" text-anchor="start" font-size="11" fill="${c35.ink}">frame: 3,110,400 of 6,220,800</text>`)
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
    const fill = i === 0 && j === 0 ? c35.panelA : c35.white
    s.push(`<rect x="${470 + 11 * i}" y="${262 + 11 * j}" width="11" height="11" fill="${fill}" stroke="${c35.tealInk}" stroke-width="0.5"/>`)
  }
  s.push(`<text x="514" y="364" text-anchor="middle" font-size="10" fill="${c35.ink}">one block magnified: 64 samples</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 4 — the ratio ladder for the 210-second song            */
/* ------------------------------------------------------------------ */
function cf35RatioLadderSvg(): string {
  const W = 720
  const H = 240
  const cd = 37044000
  const k320 = 8400000
  const k128 = 3360000
  const X0 = 140
  const FULL = 480
  const bars = [
    { label: 'CD audio', bytes: cd, value: '37,044,000 B = 35.3279 MiB', fill: c35.teal, inside: true },
    { label: 'MP3 320 kbit/s', bytes: k320, value: '8,400,000 B - 4.41x smaller', fill: c35.conn, inside: false },
    { label: 'MP3 128 kbit/s', bytes: k128, value: '3,360,000 B - 11.025x smaller', fill: c35.accent, inside: false },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f35}" role="img" aria-label="Bar chart of one 210-second song stored three ways. CD audio: 37,044,000 bytes, which is 35.3279 MiB. MP3 at 320 kbit/s: 8,400,000 bytes, which is 4.41 times smaller. MP3 at 128 kbit/s: 3,360,000 bytes, which is 11.025 times smaller. Bar lengths are drawn from the true byte counts.">`)
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${c35.tealInk}">ONE 210-SECOND SONG, THREE FILES</text>`)
  bars.forEach((b, i) => {
    const y = 56 + i * 54
    const w = FULL * (b.bytes / cd)
    s.push(`<rect x="${X0}" y="${y}" width="${w.toFixed(1)}" height="34" fill="${b.fill}" rx="3"/>`)
    s.push(`<text x="18" y="${y + 22}" text-anchor="start" font-size="11" fill="${c35.ink}">${b.label}</text>`)
    if (b.inside) {
      s.push(`<text x="${X0 + w - 8}" y="${y + 22}" text-anchor="end" font-size="10.5" fill="${c35.white}">${b.value}</text>`)
    } else {
      s.push(`<text x="${X0 + w + 10}" y="${y + 22}" text-anchor="start" font-size="10.5" fill="${c35.ink}">${b.value}</text>`)
    }
  })
  s.push(`<text x="${W / 2}" y="226" text-anchor="middle" font-size="10" fill="${c35.tealInk}">bar lengths from the true byte counts</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE helpers (embedded in exercise solutions)            */
/* ------------------------------------------------------------------ */
function cf35RleStripSvg(): string {
  const W = 720
  const H = 180
  const top = 'MMMOOOOOOT'
  const bot = ['3M', '6O', '1T']
  const cell = 40
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f35}" role="img" aria-label="Run-length encoding of MMMOOOOOOT. The before row shows ten cells: three M, six O, one T. The after row shows six cells: the pairs 3M, 6O, 1T. Ten characters become six, a ratio of 1.67.">`)
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.tealInk}">RLE ON THE WITNESS MMMOOOOOOT</text>`)
  for (let i = 0; i < top.length; i++) {
    const fill = top[i] === 'M' ? c35.panelB : top[i] === 'O' ? c35.panelA : c35.white
    s.push(`<rect x="${40 + cell * i}" y="48" width="${cell}" height="40" fill="${fill}" stroke="${c35.tealInk}" stroke-width="1"/>`)
    s.push(`<text x="${40 + cell * i + cell / 2}" y="74" text-anchor="middle" font-size="13" font-weight="bold" fill="${c35.ink}">${top[i]}</text>`)
  }
  s.push(`<text x="452" y="72" text-anchor="start" font-size="10.5" fill="${c35.ink}">before: 10 characters</text>`)
  for (let i = 0; i < bot.length; i++) {
    s.push(`<rect x="${40 + cell * i}" y="104" width="${cell}" height="40" fill="${c35.white}" stroke="${c35.conn}" stroke-width="1.5"/>`)
    s.push(`<text x="${40 + cell * i + cell / 2}" y="130" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.ink}">${bot[i]}</text>`)
  }
  s.push(`<text x="292" y="128" text-anchor="start" font-size="10.5" fill="${c35.ink}">after: 6 characters - ratio 1.67</text>`)
  s.push('</svg>')
  return s.join('')
}

function cf35HuffSmallSvg(): string {
  const W = 560
  const H = 250
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f35}" role="img" aria-label="Huffman tree for A weight 5, B weight 3, C weight 1. The root carries 9. Its 0 edge leads to A at depth 1; its 1 edge leads to a weight-4 node, whose 0 edge leads to B at depth 2 and whose 1 edge leads to C at depth 2. Codewords: A is 0, B is 10, C is 11.">`)
  s.push(`<text x="${W / 2}" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.tealInk}">HUFFMAN TREE FOR A:5, B:3, C:1</text>`)
  s.push(`<line x1="280" y1="58" x2="100" y2="138" stroke="${c35.mid}" stroke-width="2"/>`)
  s.push(`<line x1="280" y1="58" x2="430" y2="138" stroke="${c35.mid}" stroke-width="2"/>`)
  s.push(`<line x1="430" y1="138" x2="350" y2="212" stroke="${c35.mid}" stroke-width="2"/>`)
  s.push(`<line x1="430" y1="138" x2="500" y2="212" stroke="${c35.mid}" stroke-width="2"/>`)
  s.push(`<text x="178" y="94" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.conn}" stroke="${c35.paper}" stroke-width="3" paint-order="stroke">0</text>`)
  s.push(`<text x="367" y="94" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.conn}" stroke="${c35.paper}" stroke-width="3" paint-order="stroke">1</text>`)
  s.push(`<text x="378" y="171" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.conn}" stroke="${c35.paper}" stroke-width="3" paint-order="stroke">0</text>`)
  s.push(`<text x="477" y="171" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.conn}" stroke="${c35.paper}" stroke-width="3" paint-order="stroke">1</text>`)
  s.push(`<circle cx="280" cy="58" r="18" fill="${c35.white}" stroke="${c35.teal}" stroke-width="2"/>`)
  s.push(`<text x="280" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.ink}">9</text>`)
  s.push(`<circle cx="100" cy="138" r="17" fill="${c35.panelB}" stroke="${c35.conn}" stroke-width="2"/>`)
  s.push(`<text x="100" y="142" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.ink}">5</text>`)
  s.push(`<circle cx="430" cy="138" r="17" fill="${c35.white}" stroke="${c35.teal}" stroke-width="2"/>`)
  s.push(`<text x="430" y="142" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.ink}">4</text>`)
  s.push(`<circle cx="350" cy="212" r="16" fill="${c35.panelB}" stroke="${c35.conn}" stroke-width="2"/>`)
  s.push(`<text x="350" y="216" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.ink}">3</text>`)
  s.push(`<circle cx="500" cy="212" r="16" fill="${c35.panelB}" stroke="${c35.conn}" stroke-width="2"/>`)
  s.push(`<text x="500" y="216" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.ink}">1</text>`)
  s.push(`<text x="100" y="166" text-anchor="middle" font-size="10" fill="${c35.ink}">A: code 0, depth 1</text>`)
  s.push(`<text x="350" y="240" text-anchor="middle" font-size="10" fill="${c35.ink}">B: code 10, depth 2</text>`)
  s.push(`<text x="498" y="240" text-anchor="middle" font-size="10" fill="${c35.ink}">C: code 11, depth 2</text>`)
  s.push('</svg>')
  return s.join('')
}

function cf35LzwDictSvg(): string {
  const W = 560
  const H = 230
  const rows = [
    ['1', 'X', 'adds XY'],
    ['2', 'Y', 'adds YZ'],
    ['3', 'Z', 'adds ZX'],
    ['4', 'XY', 'adds XYZ'],
    ['5', 'ZX', 'adds ZXY'],
    ['6', 'YZ', 'nothing - input ends'],
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f35}" role="img" aria-label="LZW trace on XYZXYZXYZ. Six codes are emitted: X, Y, Z, XY, ZX, YZ. The dictionary gains five entries in order: XY, YZ, ZX, XYZ, ZXY. Nine characters ride out as six codes.">`)
  s.push(`<text x="${W / 2}" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.tealInk}">LZW ON XYZXYZXYZ - THE DICTIONARY GROWS</text>`)
  s.push(`<text x="70" y="46" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.ink}">Step</text>`)
  s.push(`<text x="190" y="46" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.ink}">Code out</text>`)
  s.push(`<text x="400" y="46" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.ink}">Dictionary gains</text>`)
  rows.forEach((r, i) => {
    const y = 58 + i * 26
    s.push(`<rect x="40" y="${y}" width="480" height="24" fill="${i % 2 === 0 ? c35.white : c35.panelB}"/>`)
    s.push(`<text x="70" y="${y + 16.5}" text-anchor="middle" font-size="10.5" fill="${c35.tealInk}">${r[0]}</text>`)
    s.push(`<text x="190" y="${y + 16.5}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${c35.ink}">${r[1]}</text>`)
    s.push(`<text x="400" y="${y + 16.5}" text-anchor="middle" font-size="10.5" fill="${c35.ink}">${r[2]}</text>`)
  })
  s.push(`<text x="${W / 2}" y="224" text-anchor="middle" font-size="10" fill="${c35.tealInk}">9 characters in, 6 codes out</text>`)
  s.push('</svg>')
  return s.join('')
}

function cf35Ratio192Svg(): string {
  const W = 720
  const H = 170
  const cd = 31752000
  const mp3 = 4320000
  const X0 = 150
  const FULL = 470
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f35}" role="img" aria-label="A 180-second song at CD rate bills 31,752,000 bytes; the same song as a 192 kbit/s MP3 bills 4,320,000 bytes. The ratio is 7.35. Both bars are the same 180 seconds of music.">`)
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.tealInk}">A 180-SECOND SONG AT 192 KBIT/S</text>`)
  s.push(`<rect x="${X0}" y="54" width="${FULL}" height="34" rx="3" fill="${c35.teal}"/>`)
  s.push(`<text x="18" y="75" text-anchor="start" font-size="11" fill="${c35.ink}">CD audio</text>`)
  s.push(`<text x="${X0 + FULL - 8}" y="75" text-anchor="end" font-size="10.5" fill="${c35.white}">31,752,000 B</text>`)
  const w2 = FULL * (mp3 / cd)
  s.push(`<rect x="${X0}" y="108" width="${w2.toFixed(1)}" height="34" rx="3" fill="${c35.conn}"/>`)
  s.push(`<text x="18" y="129" text-anchor="start" font-size="11" fill="${c35.ink}">MP3 192 kbit/s</text>`)
  s.push(`<text x="${X0 + w2 + 10}" y="129" text-anchor="start" font-size="10.5" fill="${c35.ink}">4,320,000 B - the ratio is 7.35</text>`)
  s.push(`<text x="${W / 2}" y="160" text-anchor="middle" font-size="9.5" fill="${c35.tealInk}">both bars are the same 180 seconds of music</text>`)
  s.push('</svg>')
  return s.join('')
}

function cf35AmbiguitySvg(): string {
  const W = 560
  const H = 200
  const bits = ['0', '0', '1']
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f35}" role="img" aria-label="The bit string 001 read two ways under the non-prefix code A equals 0, B equals 01, C equals 1. Reading one: A, A, c35. Reading two: A, B. One string, two files - the ambiguity that the prefix property forbids.">`)
  s.push(`<text x="${W / 2}" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="${c35.tealInk}">THE STRING 001, READ TWO WAYS</text>`)
  s.push(`<text x="${W / 2}" y="40" text-anchor="middle" font-size="10" fill="${c35.tealInk}">under the code A = 0, B = 01, C = 1</text>`)
  s.push(`<text x="20" y="66" text-anchor="start" font-size="10.5" fill="${c35.ink}">reading 1:</text>`)
  bits.forEach((b, i) => {
    s.push(`<rect x="${190 + 44 * i}" y="44" width="44" height="40" fill="${c35.white}" stroke="${c35.tealInk}" stroke-width="1"/>`)
    s.push(`<text x="${212 + 44 * i}" y="70" text-anchor="middle" font-size="13" font-weight="bold" fill="${c35.ink}">${b}</text>`)
  })
  s.push(`<text x="212" y="102" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.struct}">A</text>`)
  s.push(`<text x="256" y="102" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.struct}">A</text>`)
  s.push(`<text x="300" y="102" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.struct}">C</text>`)
  s.push(`<text x="20" y="140" text-anchor="start" font-size="10.5" fill="${c35.ink}">reading 2:</text>`)
  bits.forEach((b, i) => {
    s.push(`<rect x="${190 + 44 * i}" y="118" width="44" height="40" fill="${c35.white}" stroke="${c35.tealInk}" stroke-width="1"/>`)
    s.push(`<text x="${212 + 44 * i}" y="144" text-anchor="middle" font-size="13" font-weight="bold" fill="${c35.ink}">${b}</text>`)
  })
  s.push(`<path d="M 190 164 L 190 170 L 234 170 L 234 176" fill="none" stroke="${c35.accent}" stroke-width="1.5"/>`)
  s.push(`<path d="M 278 170 L 322 170 L 322 176" fill="none" stroke="${c35.accent}" stroke-width="1.5"/>`)
  s.push(`<text x="212" y="186" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.accent}">A</text>`)
  s.push(`<text x="300" y="186" text-anchor="middle" font-size="11" font-weight="bold" fill="${c35.accent}">B</text>`)
  s.push('</svg>')
  return s.join('')
}

export const lesson35: Lesson = {
  id: 'cf-compression-lossless-and-lossy',
  number: '3.5',
  title: 'Compression: Lossless and Lossy',
  concepts: [
    'compression ratio',
    'run-length encoding',
    'prefix codes and Huffman coding',
    'dictionary compression and LZW',
    'chroma subsampling',
    'perceptual coding',
    'lossless versus lossy formats',
  ],
  objectives: [
    'By the end of this lesson you can state the packing question lesson 3.4 left open and explain why the two honest answers — lossless and lossy — are the chapter’s sharpest line.',
    'By the end of this lesson you can define the compression ratio and compute one from any pair of file sizes, including the saving as a percentage.',
    'By the end of this lesson you can encode and decode run-length witnesses by hand, and predict honestly when RLE grows a file instead of shrinking it.',
    'By the end of this lesson you can build a small Huffman tree, read off its prefix codewords, cost it against a fixed-length code, and place its mean beside the entropy floor.',
    'By the end of this lesson you can trace an LZW run on a short string and name the algorithm inside ZIP, GIF and PNG with their dates.',
    'By the end of this lesson you can reason about lossy formats — the JPEG block census with 4:2:0 subsampling and the MP3 rate arithmetic — and deliver the verdict table for which media tolerate loss.',
  ],
  prerequisites: ['cf-text-images-and-sound-as-bits'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    /* ================================================================ */
    /* 1. THE QUESTION LESSON 3.4 LEFT OPEN                              */
    /* ================================================================ */
    { kind: 'heading', text: 'The Question Lesson 3.4 Left Open' },
    { kind: 'para', text: 'Lesson 3.4 ended with a set of numbers that should have made you uncomfortable. A single 1080p frame of video is a parade of $2{,}073{,}600$ luma samples, and dressed in full RGB that is $6{,}220{,}800$ bytes for one picture. At a cinema-smooth 30 frames per second the parade becomes a firehose of $186{,}624{,}000$ bytes every second — about $1.49$ gigabits per second — which would fill a compact disc in roughly $4.2$ seconds. A 74-minute stereo album at CD quality is $783{,}216{,}000$ bytes, the $747$ MiB slab you met there. Even a still photograph from a modest 12-megapixel camera is $36{,}000{,}000$ bytes — $34.3323$ MiB — before it has moved anywhere at all.' },
    { kind: 'para', text: 'None of these objects ships in that form. Your phone stores hundreds of such photographs and dozens of such songs; a streaming service pushes that video down a household wire. Something must be removed before any of it travels or rests, and the question is the sharpest one in this chapter: which bytes can go — and can they come BACK? Ask it of any file and you receive one of exactly two honest answers, and the whole discipline of data compression hangs on the difference between them.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — lossless and lossy compression', text: '*Compression* is said to be **lossless** if the decoding step can rebuild the original file exactly, bit for bit, so that no information is lost. It is said to be **lossy** if the decoding step produces only a perceptually close copy: some information is discarded forever, chosen — by the format’s designers — to be information the eye or ear notices least. Symbolically, lossless means $\\mathrm{decode}(\\mathrm{encode}(F)) = F$ for every file $F$, while lossy settles for $\\mathrm{decode}(\\mathrm{encode}(F)) \\approx F$ under a budget.' },
    { kind: 'figure', caption: 'Figure 1. One file, two doors. The lossless door returns the original bit for bit — its trade is text, code, ZIP, PNG, GIF, run-length encoding and Huffman. The lossy door returns only a close copy, spending the difference on purpose — its trade is photos and music: JPEG, MP3, most video. Every format in this lesson lives behind one of these two doors.', svg: cf35TwoDoorsSvg() },
    { kind: 'para', text: 'Hold the two doors apart firmly, because examinations and engineering both test exactly this line. Behind the lossless door live the algorithms of guarantee: whatever leaves, returns. Behind the lossy door lives a bet — a wager that the discarded bits were the ones your senses would never have missed. This lesson walks both corridors in turn. First the food that every compressor eats: redundancy. Then the lossless craft — run-length encoding, Huffman coding, the dictionary methods — each met as a small worked witness you can check with a pencil. Then the lossy craft, where JPEG and MP3 make their perceptual bets with numbers you have already met in lesson 3.4. Finally the verdict table: which media may pass through which door, and the one caution that trips beginners every year.' },

    /* ================================================================ */
    /* 2. REDUNDANCY: WHAT COMPRESSION EATS                              */
    /* ================================================================ */
    { kind: 'heading', text: 'Redundancy: What Compression Eats' },
    { kind: 'para', text: 'No compressor can shrink a file that has nothing spare to give. What is spare? Any regularity a shorter description can exploit. Three kinds carry this lesson. **Runs** — the same symbol repeating: ten A’s in a row carry no more news than the count ten and the letter A. **Repeats** — whole phrases that return: the string ABABABAB says one thing four times. **Skews** — some symbols far more common than others: if A fills half your file, A deserves the cheapest dress you can sew. Runs, repeats and skews are the three shapes of *redundancy*, and redundancy is the only food a compressor eats.' },
    { kind: 'para', text: 'To measure any shrinkage honestly we need one number agreed in advance. The **compression ratio** of a shrink is the original size divided by the compressed size:' },
    { kind: 'equation', latex: '\\text{compression ratio} = \\dfrac{\\text{original size}}{\\text{compressed size}} \\tag{1}', note: 'A ratio above 1 means the file shrank; 2 means it halved. The saving is the removed share of the original, as a percentage.' },
    { kind: 'derivation', title: 'Weighing a shrink on the ratio scale', statement: 'A file of 2,048,000 bytes is compressed to 512,000 bytes. Derive both the compression ratio and the percentage saving from the definition alone.', steps: [
      { label: 'Set the quotient', formula: 'R = \\dfrac{2{,}048{,}000}{512{,}000}', explanation: 'The ratio is original over compressed — divide the two sizes exactly as they stand.' },
      { label: 'Divide', formula: 'R = 4', explanation: 'The compressed file is one quarter of the original, so the ratio is 4: the file quartered.' },
      { label: 'Turn to the saving', formula: '\\dfrac{2{,}048{,}000 - 512{,}000}{2{,}048{,}000} = \\dfrac{3}{4}', explanation: 'The saving is the removed bytes over the ORIGINAL bytes — never over the compressed ones.' },
      { label: 'Read the percentage', formula: '\\text{saving} = 75\\%', explanation: 'Three quarters of the original mass left, and one quarter rode on.' },
    ], result: 'The ratio is $4$ and the saving is $75$ per cent — the same fact worn two ways, and both count from the original size.' },
    { kind: 'example', title: 'Illustration 1. A toy budget, weighed both ways', steps: [
      'Take the file of $2{,}048{,}000$ bytes and its compressed image of $512{,}000$ bytes.',
      'Divide: $2{,}048{,}000 \\div 512{,}000 = 4$, so the compression ratio is 4 — the file quartered.',
      'Now, subtract for the saving: $2{,}048{,}000 - 512{,}000 = 1{,}536{,}000$ bytes removed.',
      'Divide by the original: $1{,}536{,}000 \\div 2{,}048{,}000 = 0.75$, so the saving is 75 per cent.',
      'Hence ratio 4 and saving 75 per cent — one shrink, two honest numbers.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The denominator discipline', text: 'The ratio divides by the compressed size; the saving divides by the original. Mix the denominators and every answer in this chapter turns wrong at once. A ratio of 4 is a saving of 75 per cent, a ratio of 2 is a saving of 50 per cent, and a ratio of 11.025 — which you will meet at the MP3 door — is a saving of about 90.9 per cent. Train the reflex: ratio first, then the saving as its complement.' },
    { kind: 'formula', name: 'The compression ratio', latex: 'R = \\dfrac{\\text{original size}}{\\text{compressed size}}', note: 'Divide by the compressed size; the percentage saving divides the removed bytes by the original instead.' },
    { kind: 'para', text: 'One caution before any algorithm arrives. No law of nature promises a shrink. A file of already-random bytes has no runs, no repeats, no skew — nothing to describe more briefly than itself — and any honest compressor, asked to squeeze it, will at best return it unchanged and at worst return something slightly larger. Keep that caution beside you: the next three sections are not magic but accounting, and accounting only finds what is there.' },

    /* ================================================================ */
    /* 3. LOSSLESS CRAFT                                                 */
    /* ================================================================ */
    { kind: 'heading', text: 'Lossless Craft: Every Bit Returns' },
    { kind: 'para', text: 'The lossless corridor has one unbreakable rule: whatever leaves the file must return, exactly, when the process runs backwards. A ZIP that drops letters is not a weaker ZIP — it is a corrupt file. This rule is why the lossless craft is a search for shorter *descriptions* of the very same information: never less information, only a briefer way of saying it. Three classical crafts own the corridor — run-length encoding, Huffman coding and the dictionary methods — and every modern lossless format, ZIP and PNG included, is a braid of them.' },

    { kind: 'heading', text: 'Run-Length Encoding: Runs Become Pairs' },
    { kind: 'callout', tone: 'definition', title: 'Definition — run-length encoding', text: '*Run-length encoding* (RLE) is said to be the recoding in which each **maximal run** — a stretch of one repeated symbol — is replaced by the pair *count followed by symbol*. The decoder rebuilds each run from its pair, so the round trip is exact whenever every run in the file is recorded.' },
    { kind: 'para', text: 'For example, take this lesson’s first witness through the code:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the witness string $\\text{AABBCCCCCD}$ — ten characters, four runs: AA, BB, CCCCC and D;',
      '(ii) each run becomes a pair: $\\text{AA} \\to 2A$, $\\text{BB} \\to 2B$, $\\text{CCCCC} \\to 5C$, $\\text{D} \\to 1D$;',
      '(iii) the pairs join into $\\text{2A2B5C1D}$ — eight characters, down from ten.',
    ] },
    { kind: 'example', title: 'Illustration 2. The witness AABBCCCCCD under RLE', steps: [
      'Take the witness and split it into maximal runs: AA, BB, CCCCC, D — four runs, never five.',
      'Turn each run into its pair: AA becomes 2A, BB becomes 2B, CCCCC becomes 5C, and the lone D becomes 1D.',
      'Join the pairs: 2A2B5C1D — eight characters where ten stood.',
      'Check the round trip: read 2A as AA, 2B as BB, 5C as CCCCC, 1D as D — the original returns exactly.',
      'So the compression ratio is $10 \\div 8 = 1.25$, a saving of 20 per cent — modest, because the runs were short.',
    ] },
    { kind: 'algorithm', title: 'Run-length encode a string', lines: [
      { code: 'runs = split S into maximal equal-symbol stretches', note: 'Walk left to right; cut a new run whenever the symbol changes.' },
      { code: 'for each run: emit (length of run) then (its symbol)', note: 'Count first, symbol second — the pair the decoder expects.' },
      { code: 'concatenate the pairs to form the encoding', note: 'No separators: the pair structure itself paces the reading.' },
      { code: 'decode by expanding each pair back to its run', note: 'The round trip is exact — this is the lossless guarantee.' },
    ], note: 'Terminates in one pass; the output length is twice the number of runs.' },
    { kind: 'example', title: 'Illustration 3. The honesty ledger: when RLE grows a file', steps: [
      'Take the string AB — two runs of length one each.',
      'Encode each: A becomes 1A and B becomes 1B, so AB becomes 1A1B.',
      'Compare: 2 characters in, 4 characters out — RLE has DOUBLED the file.',
      'Now, take AABBCC: the pairs are 2A, 2B, 2C, joining to 2A2B2C — 6 in, 6 out, ratio exactly 1.',
      'Next, take ABCD: 1A1B1C1D — 4 characters become 8, another doubling.',
      'Finally, take AAAAAAAAAA: ten A’s are one run, encoding to 10A — 10 characters become 3, a ratio of $10 \\div 3 \\approx 3.33$.',
      'Hence the ledger: RLE pays when runs are long, breaks even when runs are all of length two, and grows the file when the text refuses to repeat.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — RLE is a gambler, and the alphabet is its opponent', text: 'Never promise a shrink from RLE without looking at the runs. A string of singletons grows: AB doubles to 1A1B. Worse, a naive count-and-symbol code is ambiguous when the alphabet contains digits: encode the bit string 11110000 and you get 4140 — the decoder reads 41 then hunts for a symbol that never comes, and the round trip is broken. Real systems mend this with fixed-width counts (the exercise set designs one) or by escaping; the naive form is for teaching, and for alphabets that contain no digits.' },
    { kind: 'para', text: 'Where does RLE earn its keep? Wherever runs are born long: fax pages of white with occasional black, simple bitmaps with flat colour fields, the flat stretches of telemetry. It is the oldest and plainest of the crafts — a patent for a telegraph version was filed in the 1880s — and it survives inside modern formats precisely because some corner of every real file refuses to vary. But for text with skew — letters of wildly different frequencies — RLE is helpless, and the next craft takes over.' },
    { kind: 'heading', text: 'Huffman Coding: Frequency Buys Shortness' },
    { kind: 'para', text: 'Turn from runs to skews. In ordinary English, and in most real files, some symbols dominate: the space and the letter e outpace the z and the semicolon by enormous factors. A fixed-length code — the 2-bit code that names each of four symbols in exactly two bits — charges every symbol the same rent. But if one symbol rides in half the file, why should it pay two bits? David Huffman asked exactly this as a graduate student, and the answer he found in 1952 still bears his name.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the 1952 paper and the student who beat the course', text: 'Huffman’s method appeared as ‘A Method for the Construction of Minimum-Redundancy Codes’, Proceedings of the IRE, volume 40, pages 1098–1101, in 1952. The honest legend — and Huffman himself retold it this way — is that he devised it as an MIT Sc.D. student working on a term assignment in Robert Fano’s information-theory course, after the students were told they could skip the final if their code design beat the best then known; Huffman, fearing the exam and scheduling his work at the last minute, found the optimum his professor had not. Whatever the exact shape of the tale, the paper is real, the algorithm is real, and it outranks the exam.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — prefix code', text: 'A binary code is said to be a **prefix code** if no codeword is the beginning of any other codeword. A prefix code can be read from one unbroken bit stream with no separators and no looking ahead, because each codeword announces its own end. Every Huffman code is a prefix code.' },
    { kind: 'para', text: 'The construction is a repeated marriage of the lightest. List the symbols with their frequencies. Take the two lightest, weld them into one combined node carrying the sum of their weights, and set the combination back in the list. Repeat until one node — the root — remains; then read each symbol’s codeword off the path from root to leaf. Watch it run on this lesson’s pinned alphabet: A five times, B twice, C once, D once — nine symbols in all.' },
    { kind: 'example', title: 'Illustration 4. Building the Huffman tree for {A:5, B:2, C:1, D:1}', steps: [
      'Take the weights in a row: 5, 2, 1, 1 — nine symbols in total.',
      'Marry the two lightest: 1 and 1 make a node of weight 2, standing beside the real B of weight 2.',
      'Marry the two lightest again: the new 2 and B’s 2 make a node of weight 4.',
      'Marry once more: 4 and 5 make the root of weight 9 — the ladder reads 1+1 to 2, 2+2 to 4, 4+5 to 9.',
      'Now, label every left-going edge 0 and every right-going edge 1: A, married last, hangs one step from the root and wears the single bit 0.',
      'So B wears 10 at depth 2, while C and D wear 110 and 111 at depth 3 — frequent symbols short, rare symbols long, exactly as promised.',
    ] },
    { kind: 'figure', caption: 'Figure 2. The Huffman tree of the alphabet {A:5, B:2, C:1, D:1}. The two lightest weights marry first (1+1 to 2, then 2+2 to 4, then 4+5 to 9), so A sits one edge from the root wearing 0, B sits at depth 2 wearing 10, and C and D sit at depth 3 wearing 110 and 111. The cost line: $5 \\times 1 + 2 \\times 2 + 1 \\times 3 + 1 \\times 3 = 15$ bits against 18 for the fixed 2-bit code.', svg: cf35HuffmanTreeSvg() },
    { kind: 'example', title: 'Illustration 5. Costing the code: 18 bits against 15', steps: [
      'Take the fixed alternative first: four symbols fit in $\\lceil \\log_2 4 \\rceil = 2$ bits each, so nine symbols cost $9 \\times 2 = 18$ bits.',
      'Now, cost the Huffman code symbol by symbol: $5 \\times 1 + 2 \\times 2 + 1 \\times 3 + 1 \\times 3$.',
      'Multiply: $5 + 4 + 3 + 3 = 15$ bits for the same nine symbols.',
      'Subtract: 3 bits saved, and $3 \\div 18 = 0.1667$ — a saving of 16.67 per cent.',
      'Hence the skew bought its price: the frequent A pays 1 bit instead of 2, and the saving swamps the extra bit now and then charged to the rare C and D.',
    ] },
    { kind: 'para', text: 'Check the prefix property on the codewords $0$, $10$, $110$ and $111$: no codeword begins another — 0 is not the start of 10, 10 is not the start of 110 — so a stream of these codewords parses itself, with no commas. The check has an arithmetic shadow: summing $2^{-1} + 2^{-2} + 2^{-3} + 2^{-3}$ gives exactly 1, the mark of a *complete* code with no wasted codeword lengths. And the property is not decoration, as the exercise set shows with a code that violates it and turns one bit string into two different files.' },
    { kind: 'example', title: 'Illustration 6. Encoding and decoding AAAAABBCD', steps: [
      'Take the message AAAAABBCD — the pinned alphabet in its natural order: five A’s, two B’s, one C, one D.',
      'Encode each letter: A becomes 0, so the run of five becomes 00000; B becomes 10; C becomes 110; D becomes 111.',
      'Join the pieces: 000001010110111 — fifteen bits, matching the cost of Illustration 5 exactly.',
      'Now, decode from the left: the leading 0 must be A (nothing else starts with 0), and the parser walks on.',
      'Trace the whole stream: A, A, A, A, A, B, C, D — the original message returns, and no other reading is possible.',
      'Hence the prefix property is what makes the stream self-pacing: no separators, no ambiguity, no bits wasted on boundaries.',
    ] },
    { kind: 'para', text: 'Fifteen bits for nine symbols is a mean of $15/9 \\approx 1.6667$ bits per symbol. Could a cleverer lossless code have done better — say 1.5? There is a hard floor, and it has a name. The **entropy** of the alphabet, $H$, is the expected surprise per symbol; for the frequencies $5/9$, $2/9$, $1/9$, $1/9$ it comes to $1.6577427$ bits per symbol, and no lossless code for this source can average less. Huffman’s 1.6667 sits a hair — $0.0089$ bits — above the floor. The derivation below weighs the floor for this very alphabet; its proof belongs to information theory, which owns a later book of this library.' },
    { kind: 'equation', latex: 'H = -\\sum_{i} p_i \\log_2 p_i \\tag{2}', note: 'The entropy floor: the mean bits per symbol below which no lossless code for the source can pass.' },
    { kind: 'derivation', title: 'Weighing the entropy floor of the pinned alphabet', statement: 'For the alphabet {A: 5, B: 2, C: 1, D: 1} over nine symbols, compute the entropy H and set it beside the Huffman mean of 15/9 bits per symbol.', steps: [
      { label: 'Set the probabilities', formula: 'p(A) = \\tfrac{5}{9}, \\quad p(B) = \\tfrac{2}{9}, \\quad p(C) = p(D) = \\tfrac{1}{9}', explanation: 'Nine symbols in total; each frequency divided by nine gives that letter’s probability.' },
      { label: 'Unfold the entropy law', formula: 'H = \\tfrac{5}{9}\\log_2\\tfrac{9}{5} + \\tfrac{2}{9}\\log_2\\tfrac{9}{2} + \\tfrac{1}{9}\\log_2 9 + \\tfrac{1}{9}\\log_2 9', explanation: 'Each term is a probability times the log of its own reciprocal — its surprise, in bits.' },
      { label: 'Evaluate the terms', formula: '0.4711 + 0.4822 + 0.3522 + 0.3522', explanation: 'The frequent A contributes little surprise; the rare C and D contribute the most per appearance.' },
      { label: 'Sum to the floor', formula: 'H = 1.6577\\ \\text{bits per symbol}', explanation: 'The four terms add to the pinned value 1.6577427 — the floor for this alphabet.' },
    ], result: 'The floor is $H = 1.6577$ bits per symbol, and the Huffman mean is $15/9 \\approx 1.6667$ — the code sits $0.0089$ bits above the floor, exactly as the theorem permits.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the entropy floor', text: 'For any source, no lossless prefix code can have an expected length below the entropy $H = -\\sum_i p_i \\log_2 p_i$. Huffman’s construction always meets the floor within one bit per symbol, and for this lesson’s alphabet within $0.0089$. The floor is not a challenge to beat — it is a wall; the proof rides the Information Theory doorstep named at the end of this lesson.' },
    { kind: 'para', text: 'One more honest question: is 15 bits really the best a prefix code can do here, or did our marriage order just get lucky? Brute force settles it. A prefix code on four symbols is a full binary tree, and only two shapes of full binary tree with four leaves exist: the comb with depths $1, 2, 3, 3$ and the balanced tree with depths $2, 2, 2, 2$. The balanced shape charges every symbol two bits: $9 \\times 2 = 18$ bits, whatever the weights. The comb assigns its single short slot to one symbol — and the best occupant is plainly the weight-5 A, giving exactly the 15 we found. No permutation of weights does better: 15 is optimal, and Huffman’s marriage-of-the-lightest finds such optima on every alphabet, a fact you may take on trust until the doorstep books prove it.' },
    { kind: 'formula', name: 'The Huffman cost', latex: '\\text{cost} = \\sum_{i} w_i \\times \\text{depth}_i', note: 'Weight times codeword length, summed over the alphabet; the fixed code pays the same flat rate to every symbol.' },

    { kind: 'heading', text: 'Dictionary Methods: The Growing Dictionary' },
    { kind: 'para', text: 'Runs and skews are not the only food. Whole phrases repeat, and a third craft banks them: keep a dictionary of phrases seen so far, and when a phrase recurs, ship its index instead of its letters. The idea was published twice by Abraham Lempel and Jacob Ziv — LZ77 in 1977 and LZ78 in 1978, the two parents of a large family — and it was made practical and famous by Terry Welch’s variant, LZW, which appeared in the journal *Computer* in June 1984 (volume 17, number 6, pages 8–19).' },
    { kind: 'callout', tone: 'definition', title: 'Definition — LZW compression', text: '*LZW compression* is said to be the dictionary method in which the encoder starts with the bare alphabet and, as it reads, always extends the longest dictionary phrase it can; every time extension fails, it emits that longest phrase and adds the *phrase-plus-next-letter* to the dictionary. The dictionary therefore grows as it reads, and — the elegant part — the decoder rebuilds the same dictionary from the output alone, so the dictionary itself never ships.' },
    { kind: 'algorithm', title: 'One step of LZW', lines: [
      { code: 'w = longest dictionary phrase matching here', note: 'Start from one character; extend while the extension is in the dictionary.' },
      { code: 'emit the code for w', note: 'The phrase leaves as a compact index, not as letters.' },
      { code: 'add w + next character to the dictionary', note: 'The failure to extend is the trigger: the new phrase is banked.' },
      { code: 'resume from the next character', note: 'Each pass banks one longer phrase; repetition is progressively captured.' },
    ], note: 'The decoder mirrors this: it rebuilds each added phrase from what it has already decoded.' },
    { kind: 'example', title: 'Illustration 7. An LZW run on ABABABAB', steps: [
      'Take the string ABABABAB — eight characters, and start the dictionary holding just A and B.',
      'Read the first A: AB is not yet in the dictionary, so emit A and bank AB; resume at the B.',
      'Read the B: BA is not in the dictionary, so emit B and bank BA; resume at the third character.',
      'Now, read A again: AB IS in the dictionary now, so extend; ABA is not, so emit AB and bank ABA.',
      'Continue: the next stretch reads BA, extends, fails at ABAB, emits ABA and banks ABAB; the tail emits B.',
      'Count the output: A, B, AB, ABA, B — five codes for eight characters, with the dictionary grown by AB, BA, ABA, ABAB.',
      'Hence the repetition was captured as it formed: the second half of the string rides out as two long phrases, and the decoder rebuilds every one of them without ever being sent the dictionary.',
    ] },
    { kind: 'para', text: 'Notice what the trace taught. The dictionary needed no second pass and no side channel: each new entry is inferable at the decoder the instant the following code arrives, because its first character is exactly the first character of that following code. This is the quiet genius of LZW — the repeats are banked in the very act of being read, and the file ships without its dictionary. On text with heavy phrase repetition the dictionary swells and the ratio climbs; on truly novel strings the method coasts, emitting single characters and banking phrases it will never use again.' },

    { kind: 'heading', text: 'A Census of Lossless Formats' },
    { kind: 'para', text: 'The three crafts rarely work alone; real formats braid them. A census of the three you meet daily:' },
    { kind: 'table', caption: 'Table 1. The lossless format census — what ships inside each name.', head: ['Format', 'Born', 'The craft inside', 'The honest note'], rows: [
      ['ZIP', '1990s (PKWARE)', 'DEFLATE = LZ77-style repeats + Huffman coding of what remains', 'The two crafts braided: the dictionary pass first, then the skew pass'],
      ['GIF', '1987 (CompuServe, Bob Berry)', 'LZW over colour indices', 'Lossless over its 256-colour palette — the palette limit is a choice of dress, not of compression'],
      ['PNG', '1 October 1996 (W3C Recommendation)', 'DEFLATE, filters + LZ77 + Huffman', 'The patent-free lossless replacement for GIF, and the web’s lossless still-image standard'],
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the patent that birthed PNG', text: 'GIF’s LZW sat inside patents licensed by Unisys, and when that fact surfaced in the mid-1990s the web’s GIF habit suddenly looked priced. The answer came from the World Wide Web Consortium: PNG, published as a W3C Recommendation on 1 October 1996, built on DEFLATE — the same LZ77-plus-Huffman braid ZIP uses — and deliberately owed nothing to LZW. PNG won on principle and on craft; GIF survived on animation and habit. The lesson inside the lesson: a compression patent is only ever one licence away from a successor format.' },

    /* ================================================================ */
    /* 4. LOSSY CRAFT                                                    */
    /* ================================================================ */
    { kind: 'heading', text: 'Lossy Craft: The Perceptual Bet' },
    { kind: 'para', text: 'Now walk through the second door, where the rule inverts: some bits are to be gone forever — but gone *on purpose*, chosen as the ones the eye or ear will miss least. Lossy compression is not sloppiness; it is a designed bet against the blind spots of human perception, and its winnings are the orders of magnitude that make streaming and pocket music libraries possible. Two witnesses carry the section: JPEG for the eye, MP3 for the ear.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the one-way door', text: 'What lossy discards does not come back. Re-saving a JPEG as PNG does not restore the discarded detail; it merely dresses the already-damaged copy losslessly. Every re-encode at a lower quality spends more. Keep the original (or a lossless master) and make lossy copies from it — never lossy copies of lossy copies.' },

    { kind: 'heading', text: 'JPEG: Blocks, Frequencies and the Quality Dial' },
    { kind: 'para', text: 'JPEG — created in 1992 and published as ISO/IEC 10918-1, the same text as ITU-T Recommendation T.81 — is the standard still-image format of the lossy door. Its engine is the discrete cosine transform, the DCT, which turned 60 this century’s way: the transform entered the mainstream with Nasir Ahmed, T. Natarajan and K. R. Rao’s 1974 paper, and JPEG’s designers built their standard around it. The DCT redescribes each small patch of the image not as pixel values but as a recipe of spatial frequencies — slow waves across the patch, then faster and faster ripples — and human vision is blunt about the fast ripples.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the 1974 transform that waited for its standard', text: 'Ahmed, Natarajan and Rao published the DCT in 1974, years before any image standard wanted it. JPEG (the name began as the Joint Photographic Experts Group, founded 1986) chose the DCT core and published its first standard part in 1992 as ISO/IEC 10918-1 / ITU-T T.81. The eighteen years between the paper and the standard are a normal interval in computing: mathematics ripens, hardware catches up, and the two meet in a format.' },
    { kind: 'example', title: 'Illustration 8. The 8 × 8 block census of a 1080p luma plane', steps: [
      'Take the 1080p luma plane: $1920 \\times 1080 = 2{,}073{,}600$ samples — the census lesson 3.4 already banked.',
      'Divide each edge by the block size: $1920 \\div 8 = 240$ block columns and $1080 \\div 8 = 135$ block rows.',
      'Multiply: $240 \\times 135 = 32{,}400$ blocks tile the plane exactly, with nothing left over.',
      'Now, census each block: $8 \\times 8 = 64$ samples, so $32{,}400 \\times 64 = 2{,}073{,}600$ — the multiplication returns the original sample count to the digit, as it must.',
      'Hence JPEG’s working unit: not the frame but the little 8 × 8 patch, each transformed, each quantised, each a separate bet on what the eye will miss.',
    ] },
    { kind: 'figure', caption: 'Figure 3. The 1080p luma plane tiled by 8 × 8 blocks: $240 \\times 135 = 32{,}400$ blocks of $64$ samples, multiplying back to exactly $2{,}073{,}600$. The 4:2:0 note: colour, which the eye reads bluntly, is subsampled so that a 2 × 2 area carries 6 samples (4 luma, 1 Cb, 1 Cr) instead of 12 — the colour census halves.', svg: cf35JpegGridSvg() },
    { kind: 'para', text: 'Colour is the first thing JPEG spends. Full RGB bills a 2 × 2 macroblock twelve samples: four pixels times three channels. But the eye’s luma acuity dwarfs its chroma acuity — you read fine print from brightness, not hue — so 4:2:0 chroma subsampling bills each 2 × 2 macroblock only six samples: the four luma values, plus one averaged Cb and one averaged Cr. Twelve becomes 6: the colour census halves, and on the full 1080p frame the three planes bill $2{,}073{,}600 + 2 \\times 518{,}400 = 3{,}110{,}400$ samples — exactly half of full RGB’s $6{,}220{,}800$. A 4K frame takes the same haircut: $480 \\times 270 = 129{,}600$ blocks, and a 4:2:0 total of $12{,}441{,}600$ against full RGB’s $24{,}883{,}200$.' },
    { kind: 'para', text: 'Then the DCT and the quality dial do the real work. Each 8 × 8 block becomes 64 frequency coefficients; the encoder divides each coefficient by a step size taken from a quantisation table, and the fast ripples — which the eye barely registers — are divided so hard that many become zero and vanish. The step sizes are the dial your photo editor labels *quality*: high quality, gentle steps, near-invisible loss; low quality, brutal steps, ringing and blockiness at the block seams. The zeros that remain are then run-length and Huffman coded — the lossless crafts riding inside the lossy format — so JPEG is a braid too: subsample, transform, quantise, then compress what is left losslessly.' },
    { kind: 'callout', tone: 'insight', title: 'Why the blocks are 8 × 8 and not the whole frame', text: 'A transform over the whole frame would spread one pixel’s news across every coefficient; small blocks keep each bet local, keep the arithmetic small enough for 1992 hardware, and confine visible damage to a seam you have to squint to find. The block is a compromise between mathematics and machinery — and the census it creates (32,400 blocks on a 1080p luma plane) is exactly the arithmetic of the exercise set.' },

    { kind: 'heading', text: 'MP3: Shrinking the Stream' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — Fraunhofer, 1993, and the hardest witness', text: 'MP3 is MPEG-1 Audio Layer III, published as ISO/IEC 11172-3 in 1993 and developed largely by the Fraunhofer Society in Germany (with the Dieter Seitzer group at Erlangen–Nuremberg behind much of the academic line). The ‘.mp3’ file name was agreed in 1995. The development team’s test track, by their own telling, was Suzanne Vega’s a cappella ‘Tom’s Diner’ — reportedly chosen because an unaccompanied human voice is the most unforgiving witness a perceptual codec can face: no instruments to hide behind. The anecdote is a legend the participants themselves repeat; the standard, the date and the society are fact.' },
    { kind: 'para', text: 'MP3’s craft is perceptual: it splits the stream into frequency bands and spends bits where the ear is sharp, abandoning bands that a louder neighbour *masks* — the phenomenon by which a shout makes a whisper inaudible. The arithmetic of the bet is lesson 3.4’s own. A CD carries $44{,}100$ samples per second, 16 bits each, on two channels: $44{,}100 \\times 16 \\times 2 = 1{,}411{,}200$ bits per second. A classic MP3 at 128 kbit/s carries $128{,}000$. Divide:' },
    { kind: 'example', title: 'Illustration 9. The rate ratio at 128 kbit/s', steps: [
      'Take the CD rate from lesson 3.4: $44{,}100 \\times 16 \\times 2 = 1{,}411{,}200$ bits per second.',
      'Take the MP3 rate: $128{,}000$ bits per second — the classic transparent-ish setting of the 1990s.',
      'Divide: $1{,}411{,}200 \\div 128{,}000 = 11.025$, exactly — no rounding.',
      'So the MP3 stream is 11.025 times lighter than the CD stream: a saving of about $1 - 1/11.025 \\approx 90.9$ per cent.',
      'Hence eleven CDs of music ride in the space one would fill — the pocket library of the 2000s, bought with masked frequencies.',
    ] },
    { kind: 'example', title: 'Illustration 10. A 210-second song, weighed three ways', steps: [
      'Take a 210-second song — three and a half minutes.',
      'Bill the CD: $1{,}411{,}200 \\text{ bit/s} \\times 210 = 296{,}352{,}000$ bits $= 37{,}044{,}000$ bytes.',
      'Convert: $37{,}044{,}000 \\div 1{,}048{,}576 = 35.3279$ MiB (35.327911376953125 exactly — the division terminates).',
      'Now, bill the 128 kbit/s MP3: $128{,}000 \\times 210 \\div 8 = 3{,}360{,}000$ bytes $= 3.2043$ MiB (3.204345703125 exactly).',
      'Compare: 35.3279 MiB against 3.2043 MiB — the ratio is again exactly 11.025, the same number the per-second division gave.',
      'Then try the premium rate: at 320 kbit/s the file is $320{,}000 \\times 210 \\div 8 = 8{,}400{,}000$ bytes, about 8.0109 MiB, and the ratio is $1{,}411{,}200 \\div 320{,}000 = 4.41$.',
      'Hence the dial: 4.41 times smaller at 320 kbit/s, 11.025 times at 128 — every step down the bitrate spends fidelity the codec hopes you cannot hear.',
    ] },
    { kind: 'figure', caption: 'Figure 4. The ratio ladder for one 210-second song: the CD stream is 37,044,000 B = 35.3279 MiB; the 320 kbit/s MP3 is 8,400,000 B, 4.41× smaller; the 128 kbit/s MP3 is 3,360,000 B = 3.2043 MiB, 11.025× smaller. Bar lengths are drawn from the true byte counts.', svg: cf35RatioLadderSvg() },
    { kind: 'para', text: 'Read the two witnesses together and the lossy philosophy stands clear. JPEG spends what the eye is blunt about: high-frequency ripples, fine colour differences. MP3 spends what the ear is blunt about: masked bands, inaudible phases. Both spend irreversibly, both wrap their spending in a final lossless braid (JPEG’s Huffman pass, MP3’s entropy coding), and both expose a quality dial whose settings are honest arithmetic — the ratios 4.41 and 11.025 are not slogans but divisions you have now performed yourself.' },

    /* ================================================================ */
    /* 5. THE VERDICT TABLE                                              */
    /* ================================================================ */
    { kind: 'heading', text: 'The Verdict Table' },
    { kind: 'para', text: 'Everything in the lesson now folds into one decision procedure. Ask of any file: does its medium tolerate loss? The answer is a property of the *medium and its use*, not of the algorithms — both doors have excellent craftsmen. The verdict:' },
    { kind: 'table', caption: 'Table 2. The verdict — which door for which medium, and why.', head: ['The file', 'The door', 'The reason that decides'], rows: [
      ['Text, source code, spreadsheets, archives', 'Lossless — always', 'A ZIP that drops letters is not a weaker ZIP; it is corrupt. One flipped bit in code is a bug or worse'],
      ['Programs, databases, system images', 'Lossless — always', 'The bits ARE the function; there is nothing the eye would "miss less"'],
      ['Photographs', 'Lossy by choice (JPEG)', 'The eye forgives spent ripples and coarse colour; the savings are orders of magnitude'],
      ['Music and speech', 'Lossy by choice (MP3, AAC…)', 'The ear forgives masked bands; keep a lossless master for re-editing'],
      ['Line art, screenshots, logos', 'Lossless (PNG)', 'Sharp edges and flat colour are exactly what block-based lossy blurs'],
      ['A JPEG renamed or re-saved as PNG', 'Neither — pointless', 'The loss already happened; PNG now stores the damage faithfully at a higher price'],
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the pointless lossless', text: 'Compressing an already-lossy file losslessly is a purchase of nothing. The MP3 inside your ZIP is still an MP3; the JPEG inside your PNG is still a JPEG. Lossless preserves what is there — including what is missing. The only repair is to return to the original master, which is why photographers keep RAW and engineers keep the master takes.' },
    { kind: 'para', text: 'One refinement earns its line. Some media sit on the boundary: medical images and forensic photographs tolerate no loss by policy, so they ride PNG or lossless JPEG variants; masters for editing ride lossless even when the distribution copy will be lossy. The verdict table is a default, and professional practice writes its exceptions in the same ink: what must return, rides lossless.' },

    /* ================================================================ */
    /* 6. DOORSTEPS                                                      */
    /* ================================================================ */
    { kind: 'heading', text: 'Where This Road Leads Next' },
    { kind: 'para', text: 'This lesson is a first meeting, and it has been honest about its edges. The entropy floor was *used* here, not proved: the source-coding theorem, arithmetic coding (which squeezes even the hair between Huffman’s 1.6667 and the floor’s 1.6577), and the full mathematics of information ride the Information Theory volume of this library’s later CS shelf. The number-systems dress that every bit here wears was built in ‘Arithmetic and Number Systems’, which owns the full positional theory; the gate-level machinery that stores and shifts these bits belongs to ‘Digital Logic Design’. This chapter owns only the first meeting: which bytes can go, and whether they come back.' },
    { kind: 'callout', tone: 'insight', title: 'The one sentence to keep', text: 'Compression is accounting, not magic: lossless finds shorter descriptions of the same information, lossy spends information your senses were never spending — and the compression ratio, the entropy floor and the verdict table are the three ledgers on which every file’s journey is written.' },
    { kind: 'callout', tone: 'exam', title: 'Examination corner — how this lesson is asked', text: 'Banking and SSC computer-awareness papers, school-board IT papers and Cambridge 9618-style asks all probe this lesson in four shapes, and all four are trained in the practice sets below (exam-style items in the L4 set are our own originals in the examination idiom, never quotations of a real paper). Shape one: classify the format — which of ZIP, PNG, GIF, JPEG, MP3 are lossless? Shape two: the small Huffman trace — build the tree for a three- or four-symbol alphabet and read off the codewords. Shape three: the ratio arithmetic — CD rate against an MP3 bitrate, or a file against its compressed size, expecting the ratio and sometimes the percentage saving. Shape four: the tolerance ask — which media may be compressed lossily and why text may not. Examiners also love the traps: the GIF patent story, the 4.41 against 11.025 mix-up, and "lossless of a lossy file" as a trick option. Mark the pinned dates — 1952, 1984, 1987, 1992, 1993, 1 October 1996 — they appear as options more often than they have any right to.' },

    { kind: 'heading', text: 'Key Terms' },
    { kind: 'terms', items: [
      { term: 'compression', def: 'Recoding a file to occupy fewer bytes, by describing its redundancy more briefly (lossless) or by discarding information chosen to be missed least (lossy).' },
      { term: 'lossless compression', def: 'Compression whose decode rebuilds the original exactly, bit for bit; the craft of ZIP, PNG, GIF, RLE, Huffman and LZW.' },
      { term: 'lossy compression', def: 'Compression that discards information permanently, betting that the eye or ear will not miss it; the craft of JPEG, MP3 and most video.' },
      { term: 'compression ratio', def: 'Original size divided by compressed size; a ratio of 4 is a saving of 75 per cent of the original.' },
      { term: 'run-length encoding (RLE)', def: 'Recoding each maximal run of one repeated symbol as the pair count-then-symbol; exact when every run is recorded, but grows files of singletons.' },
      { term: 'prefix code', def: 'A code in which no codeword begins another, so a bit stream parses itself with no separators; every Huffman code is one.' },
      { term: 'Huffman coding', def: 'The 1952 method that marries the two lightest nodes repeatedly, giving frequent symbols short codewords; optimal among prefix codes.' },
      { term: 'entropy (H)', def: 'The mean bits per symbol below which no lossless code for a source can pass: $H = -\\sum_i p_i \\log_2 p_i$ bits.' },
      { term: 'dictionary compression', def: 'Banking repeated phrases in a dictionary and shipping indices; the LZ77/LZ78 family, made practical as LZW by Welch in 1984.' },
      { term: 'LZW', def: 'Welch’s 1984 dictionary method whose dictionary grows as it reads and is rebuilt by the decoder, so it never ships.' },
      { term: 'DEFLATE', def: 'The lossless braid inside ZIP and PNG: an LZ77-style repeat pass followed by a Huffman pass.' },
      { term: 'chroma subsampling (4:2:0)', def: 'Spending colour resolution the eye will not miss: a 2 × 2 macroblock stores 4 luma plus 1 Cb and 1 Cr — 6 samples, not 12.' },
      { term: 'perceptual coding', def: 'Lossy coding that abandons what perception masks or blurs — MP3’s masked frequency bands, JPEG’s fast ripples.' },
    ] },

    /* ================================================================ */
    /* 7. QUIZ                                                           */
    /* ================================================================ */
    { kind: 'heading', text: 'Check Your Understanding' },
    { kind: 'quiz', items: [
      {
        q: 'Which of these formats is LOSSY?',
        options: ['PNG', 'ZIP', 'JPEG', 'GIF'],
        answer: 2,
        explain: 'JPEG spends information permanently: its quantisation step zeroes frequency coefficients the eye barely reads, and no decode ever rebuilds them. PNG (W3C Recommendation, 1 October 1996) is lossless — DEFLATE, an LZ77-plus-Huffman braid describing the same pixels more briefly. ZIP is lossless by definition of its purpose: a ZIP that dropped letters would be a corrupt archive, not a compressed one. GIF (CompuServe, 1987) is lossless over its data — LZW over colour indices; its 256-colour palette is a limitation of the dress chosen before compression, not a loss the compressor causes. Hence JPEG alone stands behind the lossy door.',
      },
      {
        q: 'In the Huffman code for the alphabet {A:5, B:2, C:1, D:1}, the most frequent symbol A wears —',
        options: ['110', '10', '111', '0'],
        answer: 3,
        explain: 'Huffman marries the two lightest weights first — 1+1 to 2, then 2+2 to 4, then 4+5 to 9 — so A, carried by the heavy root edge, ends one step from the root and wears the single bit 0. The option 110 is C’s codeword: C, weight 1, marries first and sinks to depth 3. The option 10 is B’s codeword at depth 2. The option 111 is D’s codeword, also depth 3. The whole method is the trade: frequency buys shortness, so the heaviest symbol must wear the shortest dress — 0.',
      },
      {
        q: 'Naive run-length encoding of the string AB produces —',
        options: ['1A1B', '2A1B', 'AB', '1AB'],
        answer: 0,
        explain: 'RLE splits AB into two maximal runs, A and B, each of length one, and each run becomes its pair: 1A and 1B, joining to 1A1B — 2 characters grown to 4, the honesty casualty of the method. The option 2A1B miscounts the first run: there is one A, not two. The option AB is the input unchanged — no encoding happened at all, and the question asks for the RLE form. The option 1AB is malformed: a count must ride before each symbol, and the pair structure 1A-then-B is not a legal RLE reading. Hence 1A1B, the doubling that teaches when NOT to use RLE.',
      },
      {
        q: 'The CD stereo rate of 1,411,200 bit/s divided by a 128 kbit/s MP3 stream gives —',
        options: ['4.41', '11.025', '1.41', '141.12'],
        answer: 1,
        explain: 'Divide the two rates exactly: $1{,}411{,}200 \\div 128{,}000 = 11.025$ — the MP3 stream is 11.025 times lighter, a saving of about 90.9 per cent. The option 4.41 is the ratio at the premium 320 kbit/s setting ($1{,}411{,}200 \\div 320{,}000$), a classic mix-up of dials. The option 1.41 comes from squinting at the digits of 1,411,200 and reading a mantissa as a ratio. The option 141.12 misplaces the decimal by two places, off by a factor of 100. Hence 11.025, exactly — no rounding anywhere.',
      },
      {
        q: 'Under 4:2:0 chroma subsampling, one 2 × 2 macroblock stores —',
        options: ['6 samples', '12 samples', '8 samples', '4 samples'],
        answer: 0,
        explain: 'A 2 × 2 macroblock holds four pixels, and 4:2:0 keeps all four luma (brightness) samples Y but only one averaged Cb and one averaged Cr: $4 + 1 + 1 = 6$ samples. The option 12 is full RGB — four pixels times three channels — the bill BEFORE subsampling, which the ratio halves. The option 8 would be a halving applied to the whole frame rather than to colour alone, misreading the scheme. The option 4 is luma only, as if colour had been discarded outright rather than downsampled. Hence 6: the colour census halves because the eye reads colour bluntly.',
      },
    ] },

    { kind: 'heading', text: 'Practice Sets' },
    { kind: 'para', text: 'The sets climb four rungs. L1 begins at the witnesses themselves — encodings you can check in one line. L2 builds small Huffman trees and walks LZW on fresh strings. L3 trains the skills this lesson is for: costing a code, exposing an ambiguity, weighing a stream. L4 trains the examination idiom — and every L4 item is exam-style, an original item in the examination idiom, never a real past-paper question. Work each chain with a pencil; where a question carries a figure, the figure is the arithmetic drawn.' },
    { kind: 'exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'Encode MMMOOOOOOT by run-length encoding, state the output length, and give the compression ratio to two decimal places.',
            solution: [
              'Split the string into maximal runs: MMM, OOOOOO, T — three runs.',
              'Turn each run into its pair: 3M, 6O, 1T.',
              'Join the pairs: 3M6O1T — six characters where ten stood.',
              'Now, form the ratio: $10 \div 6 = 1.67$ (a saving of 40 per cent of the original).',
              'So MMMOOOOOOT becomes 3M6O1T, shrinking 10 characters to 6. (The figure draws both rows.)',
            ],
            answer: 'MMMOOOOOOT becomes 3M6O1T: 10 characters to 6, ratio 1.67.',
            figures: [
              { caption: 'RLE before and after: the ten cells M M M O O O O O O T collapse into the three pairs 3M, 6O, 1T — six characters for ten, a ratio of 1.67.', svg: cf35RleStripSvg() },
            ],
          },
          {
            q: 'Encode XXYYYZZZZZ by RLE, then encode a run of twelve P’s. Give both output lengths and both ratios.',
            solution: [
              'Split XXYYYZZZZZ into maximal runs: XX, YYY, ZZZZZ.',
              'Turn each run into its pair: 2X, 3Y, 5Z, joining to 2X3Y5Z — six characters for ten, ratio $10 \div 6 \approx 1.67$.',
              'Now, take twelve P’s: one maximal run of length twelve, so the pair is 12P — three characters.',
              'Form the second ratio: $12 \div 3 = 4$ exactly.',
              'Hence 2X3Y5Z (ratio 1.67) and 12P (ratio 4) — the longer the run, the fatter the win.',
            ],
            answer: 'XXYYYZZZZZ becomes 2X3Y5Z (10 to 6); twelve P’s become 12P (12 to 3, ratio 4).',
          },
          {
            q: 'Predict — before encoding — whether RLE shrinks AABBCC and ABCD; then encode both and check your prediction.',
            solution: [
              'Look at the runs first: AABBCC has three runs of length two each; ABCD has four runs of length one each.',
              'Predict: every pair costs two characters, so runs of length two break even and singletons double.',
              'Encode AABBCC: 2A, 2B, 2C join to 2A2B2C — six characters for six, ratio exactly 1.',
              'Encode ABCD: 1A, 1B, 1C, 1D join to 1A1B1C1D — eight characters for four, a doubling.',
              'Hence the prediction holds: AABBCC breaks even and ABCD doubles — RLE without long runs is a losing bet.',
            ],
            answer: 'AABBCC gives 2A2B2C (6 to 6, no gain); ABCD gives 1A1B1C1D (4 to 8, doubled).',
          },
          {
            q: 'The naive count-then-symbol RLE is asked to encode the bit string 11110000. Show what goes wrong on the way back.',
            solution: [
              'Take the string 11110000: two runs, 1111 and 0000.',
              'Encode: 41114040? No — each pair is count then symbol, so 1111 becomes 41 and 0000 becomes 40, joining to 4140.',
              'Now, attempt the decode of 4140: the decoder gathers digits 4, 1, 4, 0 and finds no symbol after any of them.',
              'Check: the decoder wanted a letter after the count, but the alphabet here is digits — counts and symbols share one alphabet, so the reading is ambiguous and the round trip fails.',
              'Hence 11110000 encodes to 4140, which will not decode back: the naive code is only safe over alphabets with no digits.',
            ],
            answer: '11110000 becomes 4140, and the naive decoder cannot rebuild it — digits as symbols break the code.',
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Build the Huffman code for the alphabet {A:5, B:3, C:1}: give the merge ladder, every codeword, the cost, and the saving against the fixed code.',
            solution: [
              'List the weights: 5, 3, 1 — nine symbols in total.',
              'Marry the two lightest: 1 and 3 make a node of weight 4; then 4 and 5 make the root of weight 9 — the ladder reads 1+3 to 4, 4+5 to 9.',
              'Now, read the codewords: A wears 0 at depth 1; B wears 10 and C wears 11, both at depth 2.',
              'Cost the code: $5 \times 1 + 3 \times 2 + 1 \times 2 = 13$ bits, against the fixed $9 \times 2 = 18$ bits.',
              'So the saving is 5 bits: $5 \div 18 \approx 27.78$ per cent.',
              'Hence the code is A = 0, B = 10, C = 11, costing 13 of 18 bits. (The figure draws the tree.)',
            ],
            answer: 'Ladder 1+3 to 4, then 4+5 to 9; A = 0, B = 10, C = 11; cost 13 bits against 18 — 27.78 per cent saved.',
            figures: [
              { caption: 'The Huffman tree for {A:5, B:3, C:1}: A sits at depth 1 wearing 0, while B and C sit at depth 2 wearing 10 and 11 — the cost is 5 + 6 + 2 = 13 bits.', svg: cf35HuffSmallSvg() },
            ],
          },
          {
            q: 'Build the Huffman code for {A:6, B:3, C:2, D:1}: state the ladder, the codewords, the cost, and the saving against the fixed 2-bit code.',
            solution: [
              'List the weights: 6, 3, 2, 1 — twelve symbols in total.',
              'Marry the two lightest: 1 and 2 make 3; then the two 3’s make 6; then 6 and 6 make the root 12 — the ladder reads 1+2 to 3, 3+3 to 6, 6+6 to 12.',
              'Now, read the codewords: A wears 0 at depth 1; B wears 10 at depth 2; C wears 110 and D wears 111 at depth 3.',
              'Cost the code: $6 \times 1 + 3 \times 2 + 2 \times 3 + 1 \times 3 = 21$ bits, against the fixed $12 \times 2 = 24$ bits.',
              'So the saving is 3 bits: $3 \div 24 = 12.5$ per cent.',
              'Hence the code is A = 0, B = 10, C = 110, D = 111, costing 21 of 24 bits.',
            ],
            answer: 'Ladder 1+2 to 3, 3+3 to 6, 6+6 to 12; A = 0, B = 10, C = 110, D = 111; cost 21 bits against 24 — 12.5 per cent saved.',
          },
          {
            q: 'Run LZW on the string AAAAAA, starting from a dictionary holding only A. List the codes emitted and every dictionary entry added.',
            solution: [
              'Take the first A: AA is not in the dictionary, so emit A and bank AA; resume.',
              'Read the next A: AA IS in the dictionary now, so extend; AAA is not, so emit AA and bank AAA.',
              'Read the tail: AAA is in the dictionary, the string ends, so emit AAA.',
              'Count: three codes — A, AA, AAA — for six characters, with the dictionary grown by AA and AAA.',
              'Hence AAAAAA rides out as A, AA, AAA: the run was captured as lengths 1, 2, 3 — exactly the doubling ladder a growing dictionary loves.',
            ],
            answer: 'LZW emits A, AA, AAA (three codes for six characters); the dictionary gains AA and AAA.',
          },
          {
            q: 'For each of ZIP, GIF and PNG, name the compression algorithm inside, the year of birth, and one honest note. (This is the census table, asked cold.)',
            solution: [
              'Take ZIP first: inside is DEFLATE, a braid of an LZ77-style repeat pass and a Huffman pass, from the PKWARE era of the early 1990s.',
              'Take GIF: born 1987 at CompuServe, credited to Bob Berry, using LZW over colour indices — lossless over a 256-colour palette.',
              'Take PNG: a W3C Recommendation of 1 October 1996, using DEFLATE — the patent-free lossless replacement for GIF.',
              'So the honest notes: ZIP braids two crafts; GIF’s palette limit is a dress choice, not compressor loss; PNG exists because LZW carried patent risk.',
              'Hence ZIP = DEFLATE, GIF = LZW (1987, CompuServe, Berry), PNG = DEFLATE (W3C, 1 October 1996).',
            ],
            answer: 'ZIP: DEFLATE (LZ77 + Huffman); GIF: LZW, CompuServe 1987, Bob Berry, 256 colours; PNG: DEFLATE, W3C Recommendation 1 October 1996.',
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'Build the Huffman code for the near-uniform alphabet {A:5, B:5, C:2, D:2}. Then set the cost against the fixed code and explain what the near-tie teaches.',
            solution: [
              'List the weights: 5, 5, 2, 2 — fourteen symbols in total, and notice how flat the row is.',
              'Marry the two lightest: 2 and 2 make 4; then 4 and 5 make 9; then 5 and 9 make the root 14 — the ladder reads 2+2 to 4, 4+5 to 9, 5+9 to 14.',
              'Now, read the codewords: B wears 1 at depth 1; A wears 00, C wears 010 and D wears 011 at depths 2 and 3.',
              'Cost the code: $5 \times 2 + 5 \times 1 + 2 \times 3 + 2 \times 3 = 27$ bits, against the fixed $14 \times 2 = 28$ bits.',
              'Compare with the floor: $H \approx 1.8631$ against a mean of $27 \div 14 \approx 1.9286$ — the code is honest but the meal is thin.',
              'Hence only one bit in twenty-eight was saved ($3.57$ per cent): when frequencies even out, the skew has nothing to sell — the entropy floor itself stands near the fixed cost.',
            ],
            answer: 'B = 1, A = 00, C = 010, D = 011; cost 27 bits against 28 — one bit (3.57 per cent) saved; a near-uniform alphabet starves Huffman.',
          },
          {
            q: 'The code {A: 0, B: 01, C: 1} is proposed for a three-symbol alphabet. Show that the single string 001 decodes two ways, and state the property whose violation caused it.',
            solution: [
              'Take the string 001 and attempt the first reading: 0 is A, the next 0 is A again, and 1 is C — so AAC.',
              'Try the second reading: 0 is A, then 01 is exactly B — so AB.',
              'Check the code table for the cause: A’s codeword 0 is the beginning of B’s codeword 01.',
              'So the code is not prefix-free — one codeword starts another, and the parser cannot know when a codeword has ended.',
              'Hence 001 reads as both AAC and AB, and the violated property is the prefix property: no codeword may begin another. (The figure draws both readings.)',
            ],
            answer: '001 decodes as AAC or as AB, because A = 0 is a prefix of B = 01 — the code is not prefix-free.',
            figures: [
              { caption: 'One bit string, two files: under the non-prefix code A = 0, B = 01, C = 1, the string 001 reads as A A C or as A B — the ambiguity the prefix property exists to forbid.', svg: cf35AmbiguitySvg() },
            ],
          },
          {
            q: 'Run LZW on XYZXYZXYZ starting from a dictionary of X, Y, Z. List the codes emitted in order and the dictionary entries added in order.',
            solution: [
              'Take the first X: XY is new, so emit X and bank XY; the next Y finds YZ new, so emit Y and bank YZ.',
              'Continue with Z: ZX is new, so emit Z and bank ZX.',
              'Now, the second X: XY is in the dictionary, extend to XYZ — new — so emit XY and bank XYZ.',
              'Then the Z: ZX is in the dictionary, extend to ZXY — new — so emit ZX and bank ZXY.',
              'Finish with the tail YZ: already banked, so it emits as one code, YZ, adding nothing.',
              'Hence six codes — X, Y, Z, XY, ZX, YZ — for nine characters, with the dictionary grown by XY, YZ, ZX, XYZ, ZXY in that order. (The figure tabulates the run.)',
            ],
            answer: 'LZW emits X, Y, Z, XY, ZX, YZ (six codes for nine characters); the dictionary gains XY, YZ, ZX, XYZ, ZXY.',
            figures: [
              { caption: 'The LZW trace on XYZXYZXYZ: six codes out (X, Y, Z, XY, ZX, YZ), five dictionary entries banked (XY, YZ, ZX, XYZ, ZXY) — nine characters compressed to six codes.', svg: cf35LzwDictSvg() },
            ],
          },
          {
            q: 'A 180-second song is encoded as an MP3 at 192 kbit/s. Find the MP3 file size in bytes, the CD bill for the same 180 seconds, and the compression ratio.',
            solution: [
              'Take the bitrate: 192,000 bits per second, riding for 180 seconds: $192{,}000 \times 180 = 34{,}560{,}000$ bits.',
              'Convert to bytes: $34{,}560{,}000 \div 8 = 4{,}320{,}000$ bytes.',
              'Now, bill the CD: the rate is $44{,}100 \times 16 \times 2 = 176{,}400$ bytes per second, so $176{,}400 \times 180 = 31{,}752{,}000$ bytes.',
              'Divide for the ratio: $31{,}752{,}000 \div 4{,}320{,}000 = 7.35$ — the same as $1{,}411{,}200 \div 192{,}000$, as it must be.',
              'Hence the MP3 bills 4,320,000 bytes against the CD’s 31,752,000 — 7.35 times smaller. (The figure draws both bars.)',
            ],
            answer: 'The MP3 is 4,320,000 B; the CD bill is 31,752,000 B; the ratio is 7.35.',
            figures: [
              { caption: 'The 180-second song twice: the CD bar bills 31,752,000 bytes, the 192 kbit/s MP3 bar 4,320,000 bytes — a ratio of 7.35, drawn from the true byte counts.', svg: cf35Ratio192Svg() },
            ],
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'Exam-style. Classify each of JPEG, PNG, MP3, ZIP and GIF as lossless or lossy, and state which of them you would never apply to a spreadsheet, with the reason.',
            solution: [
              'Classify the still-image pair first: JPEG is lossy (its quantisation zeroes coefficients forever); PNG is lossless (DEFLATE, a W3C Recommendation of 1 October 1996).',
              'Classify the audio: MP3 is lossy (perceptual coding, MPEG-1 Audio Layer III, ISO/IEC 11172-3:1993).',
              'Classify the archives: ZIP is lossless (DEFLATE again); GIF is lossless over its data (LZW, CompuServe 1987, Bob Berry).',
              'Now, the spreadsheet: it is text-shaped — numbers and formulas — so only lossless may touch it; JPEG and MP3 are the two never to apply.',
              'Hence lossy: JPEG, MP3; lossless: PNG, ZIP, GIF — and a spreadsheet tolerates no loss at all, because one altered digit is a wrong answer, silently.',
            ],
            answer: 'Lossy: JPEG and MP3. Lossless: PNG, ZIP and GIF. Never apply JPEG or MP3 to a spreadsheet — a spreadsheet is data, and data must return bit for bit.',
          },
          {
            q: 'Exam-style. A 3-minute (180-second) stereo track is stored once as an uncompressed CD-rate WAV and once as a 128 kbit/s MP3. Compute both sizes in bytes and the compression ratio.',
            solution: [
              'Take the CD rate: $44{,}100 \times 16 \times 2 = 1{,}411{,}200$ bits per second.',
              'Bill the WAV: $1{,}411{,}200 \times 180 = 254{,}016{,}000$ bits $= 31{,}752{,}000$ bytes.',
              'Now, bill the MP3: $128{,}000 \times 180 = 23{,}040{,}000$ bits $= 2{,}880{,}000$ bytes.',
              'Divide: $31{,}752{,}000 \div 2{,}880{,}000 = 11.025$ — the same ratio the per-second division $1{,}411{,}200 \div 128{,}000$ gives.',
              'Hence 31,752,000 bytes against 2,880,000 bytes, a ratio of exactly 11.025 — about a 90.9 per cent saving.',
            ],
            answer: 'WAV: 31,752,000 B; MP3: 2,880,000 B; the ratio is exactly 11.025 (a saving of about 90.9 per cent).',
          },
          {
            q: 'Design exercise (examination long-form in spirit). A run-length code packs each pair into one byte: 4 bits of count, 4 bits of symbol. (a) What is the longest run one pair can carry? (b) How many bytes do AABBCCCCCD and AAAAAAAAAA cost, against their ASCII bills? (c) How does the encoder handle a run of forty?',
            solution: [
              'Take the count field: 4 bits name $2^4 = 16$ values, and the count starts at 1, so the longest run per pair is 15.',
              'Cost AABBCCCCCD: four runs (AA, BB, CCCCC, D), so four pairs $\times$ 8 bits $= 32$ bits, against $10 \times 8 = 80$ bits of ASCII — a ratio of $80 \div 32 = 2.5$.',
              'Cost AAAAAAAAAA: one run, one pair, 8 bits against 80 — a ratio of 10, the design’s best case.',
              'Now, the run of forty: no pair can carry it, so split it as 15 + 15 + 10 — three pairs, three bytes.',
              'Hence the field caps runs at 15; the witness costs 4 bytes for 10 (ratio 2.5), the ten-A run 1 byte for 10 (ratio 10), and long runs are chopped into 15-sized pieces with a remainder pair.',
            ],
            answer: '(a) 15 per pair; (b) AABBCCCCCD costs 4 bytes against 10 (ratio 2.5), AAAAAAAAAA costs 1 byte against 10 (ratio 10); (c) a run of 40 splits as 15 + 15 + 10, three pairs.',
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

/**
 * PART-CF38 — lesson 3.8 'Decimal and Binary Number System' (the cf38 seat,
 * CS RUN 6). The SYNTHESIS seat of chapter 3: the two systems set side by
 * side as ONE idea (positional notation wearing different alphabets), plus
 * the chapter's first meeting with binary ARITHMETIC — addition with
 * carries, subtraction with borrows, multiplication as shifts and adds.
 * Every conversion fact is CITED forward (3.1 / 3.2 / 3.6 / 3.7), never
 * re-drilled. All numbers printed are brute-forced green by v-cf38.ts.
 *
 * PROVENANCE: ground = the sanctioned web-verified arcs banked at planning
 * (citation key `cs-cf-web-ground`, docs/project/SOURCE_LOG.md).
 * STUDY-NEVER-REPRODUCE absolute: every figure, Illustration, quiz item and
 * exercise is OUR OWN. Historical notes are our own honest retelling of
 * documented events (Boole 1854; Shannon 1937 thesis).
 */

/* palette (vivid set; never blue/indigo) */
const c38 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f38 = 'ui-sans-serif, system-ui, sans-serif'

/* ------------------------------------------------------------------ */
/* helper: one centred (or anchored) SVG text node                     */
/* ------------------------------------------------------------------ */
function cf38Txt(x: number, y: number, size: number, fill: string, text: string, weight = 'normal', anchor = 'middle'): string {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}">${text}</text>`
}

/* ------------------------------------------------------------------ */
/* GENERIC BUILDER 1 — the side-by-side counting strip                 */
/* body figure F2 (0-10) and the 0-8 solution figure                   */
/* ------------------------------------------------------------------ */
interface Cf38StripCfg {
  W: number
  title: string
  subtitle: string
  to: number
  marks: number[]
  decMark: number | null
  note1: string
  note2: string
  aria: string
}

function cf38StripSvg(cfg: Cf38StripCfg): string {
  const W = cfg.W
  const M = 20
  const x0 = 122
  const n = cfg.to + 1
  const colW = Math.min(58, (W - M - x0) / n)
  const gridW = n * colW
  const gx = x0 + (W - M - x0 - gridW) / 2
  const headY = 82
  const decTop = 96
  const cellH = 42
  const binTop = decTop + cellH + 14
  const markY = binTop + cellH + 8
  const stripY = markY + 28
  const stripH = 62
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${cfg.aria}">`)
  s.push(`<g font-family="${f38}">`)
  s.push(cf38Txt(W / 2, 32, 13, c38.teal, cfg.title, 'bold'))
  s.push(cf38Txt(W / 2, 52, 10, c38.tealInk, cfg.subtitle))
  s.push(cf38Txt(M, headY, 10, c38.tealInk, 'count', 'bold', 'start'))
  for (let k = 0; k < n; k++) {
    const cx = gx + k * colW + colW / 2
    s.push(cf38Txt(cx, headY, 9.5, c38.tealInk, String(k)))
  }
  /* the decimal row */
  s.push(cf38Txt(M, decTop + cellH / 2 + 5, 10, c38.tealInk, 'base 10', 'bold', 'start'))
  for (let k = 0; k < n; k++) {
    const bx = gx + k * colW
    const marked = cfg.decMark === k
    s.push(`<rect x="${bx + 2}" y="${decTop}" width="${colW - 4}" height="${cellH}" rx="8" fill="${marked ? c38.panelA : c38.white}" stroke="${marked ? c38.accent : c38.struct}" stroke-width="2"/>`)
    s.push(cf38Txt(bx + colW / 2, decTop + cellH / 2 + 6, 15, c38.ink, String(k), 'bold'))
  }
  /* the binary row */
  s.push(cf38Txt(M, binTop + cellH / 2 + 5, 10, c38.tealInk, 'base 2', 'bold', 'start'))
  for (let k = 0; k < n; k++) {
    const bx = gx + k * colW
    const marked = cfg.marks.includes(k)
    s.push(`<rect x="${bx + 2}" y="${binTop}" width="${colW - 4}" height="${cellH}" rx="8" fill="${marked ? c38.panelA : c38.white}" stroke="${marked ? c38.accent : c38.struct}" stroke-width="2"/>`)
    s.push(cf38Txt(bx + colW / 2, binTop + cellH / 2 + 5.5, 13, c38.ink, k.toString(2), 'bold'))
  }
  /* the new-column markers under the binary row */
  for (const k of cfg.marks) {
    if (k > cfg.to) continue
    const cx = gx + k * colW + colW / 2
    s.push(`<polygon points="${cx},${markY} ${cx - 4.5},${markY + 7} ${cx + 4.5},${markY + 7}" fill="${c38.accent}"/>`)
    s.push(cf38Txt(cx, markY + 18, 9, c38.accent, 'new column'))
  }
  /* the footer strip */
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c38.paper}" stroke="${c38.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 25, 11.5, c38.ink, cfg.note1, 'bold'))
  s.push(cf38Txt(W / 2, stripY + 45, 9.5, c38.tealInk, cfg.note2))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the family portrait (both anatomies + 4 dresses)   */
/* ------------------------------------------------------------------ */
function cf38PortraitSvg(): string {
  const W = 760
  const M = 20
  const decDigits = ['4', '7', '2', '8']
  const decPlaces = ['1000', '100', '10', '1']
  const binDigits = ['1', '0', '1', '1', '0', '1']
  const binPlaces = ['32', '16', '8', '4', '2', '1']
  const decCellW = 68
  const binCellW = 58
  const cellGap = 10
  const decGridW = 4 * decCellW + 3 * cellGap
  const binGridW = 6 * binCellW + 5 * cellGap
  const decX = (W - decGridW) / 2
  const binX = (W - binGridW) / 2
  const decLabelY = 78
  const decTop = 90
  const digitH = 44
  const decPlaceTop = decTop + digitH + 6
  const placeH = 34
  const decExpY = decPlaceTop + placeH + 22
  const midY = decExpY + 22
  const binLabelY = midY + 26
  const binTop = binLabelY + 14
  const binPlaceTop = binTop + digitH + 6
  const binExpY = binPlaceTop + placeH + 22
  const stripY = binExpY + 20
  const stripH = 62
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The family portrait. Top panel, decimal, base 10: the numeral 4,728 as four digit cells 4, 7, 2, 8 over place values 1000, 100, 10 and 1, expanding to 4 times 1000 plus 7 times 100 plus 2 times 10 plus 8 times 1 equals 4,728. Bottom panel, binary, base 2: the numeral 101101 as six digit cells 1, 0, 1, 1, 0, 1 over place values 32, 16, 8, 4, 2 and 1, expanding to 1 times 32 plus 0 times 16 plus 1 times 8 plus 1 times 4 plus 0 times 2 plus 1 times 1 equals 45. A footer strip shows one number in four dresses: 45 equals 101101 in base 2, 55 in base 8 and 2D in base 16.">`)
  s.push(`<g font-family="${f38}">`)
  s.push(cf38Txt(W / 2, 30, 13, c38.teal, 'the family portrait: one machine, two alphabets', 'bold'))
  s.push(cf38Txt(W / 2, 50, 10, c38.tealInk, 'value = each digit x its place, summed - the machinery never changes, only the alphabet'))
  /* decimal panel */
  s.push(cf38Txt(W / 2, decLabelY, 11, c38.ink, 'DECIMAL - base 10: ten digits, 0 through 9', 'bold'))
  decDigits.forEach((d, k) => {
    const x = decX + k * (decCellW + cellGap)
    s.push(`<rect x="${x}" y="${decTop}" width="${decCellW}" height="${digitH}" rx="8" fill="${c38.white}" stroke="${c38.struct}" stroke-width="2"/>`)
    s.push(cf38Txt(x + decCellW / 2, decTop + 30, 20, c38.ink, d, 'bold'))
    s.push(`<rect x="${x}" y="${decPlaceTop}" width="${decCellW}" height="${placeH}" rx="8" fill="${c38.panelB}" stroke="${c38.mid}" stroke-width="2"/>`)
    s.push(cf38Txt(x + decCellW / 2, decPlaceTop + 22, 12.5, c38.tealInk, decPlaces[k], 'bold'))
  })
  s.push(cf38Txt(W / 2, decExpY, 11, c38.ink, '4 x 1000 + 7 x 100 + 2 x 10 + 8 x 1 = 4,728'))
  /* the connector */
  s.push(cf38Txt(W / 2, midY, 10, c38.teal, 'the same formula - swap the alphabet and the ladder, and it evaluates either panel'))
  /* binary panel */
  s.push(cf38Txt(W / 2, binLabelY, 11, c38.ink, 'BINARY - base 2: two digits, 0 and 1', 'bold'))
  binDigits.forEach((d, k) => {
    const x = binX + k * (binCellW + cellGap)
    s.push(`<rect x="${x}" y="${binTop}" width="${binCellW}" height="${digitH}" rx="8" fill="${d === '1' ? c38.panelA : c38.white}" stroke="${d === '1' ? c38.accent : c38.struct}" stroke-width="2"/>`)
    s.push(cf38Txt(x + binCellW / 2, binTop + 30, 20, c38.ink, d, 'bold'))
    s.push(`<rect x="${x}" y="${binPlaceTop}" width="${binCellW}" height="${placeH}" rx="8" fill="${c38.panelB}" stroke="${c38.mid}" stroke-width="2"/>`)
    s.push(cf38Txt(x + binCellW / 2, binPlaceTop + 22, 12.5, c38.tealInk, binPlaces[k], 'bold'))
  })
  s.push(cf38Txt(W / 2, binExpY, 11, c38.ink, '1 x 32 + 0 x 16 + 1 x 8 + 1 x 4 + 0 x 2 + 1 x 1 = 45'))
  /* the four-dress footer */
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c38.paper}" stroke="${c38.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 25, 12, c38.ink, 'one number, four dresses: 45 = 101101 in base 2 = 55 in base 8 = 2D in base 16', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 45, 9.5, c38.tealInk, 'the witness of lesson 3.2, cited one last time - translation, not arithmetic'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — the carry cascade 111 + 1 = 1000                   */
/* ------------------------------------------------------------------ */
function cf38CascadeSvg(): string {
  const W = 760
  const M = 20
  const colW = 56
  const gridW = 4 * colW
  const gx = 64
  const places = ['8', '4', '2', '1']
  const placeY = 82
  const carryCy = 110
  const carryR = 10
  const rowATop = 150
  const rowH = 44
  const rowBTop = rowATop + rowH + 8
  const ruleY = rowBTop + rowH + 12
  const sumTop = ruleY + 10
  const sumH = 46
  const noteX = 340
  const noteYs = [150, 182, 214, 246]
  const stripY = sumTop + sumH + 20
  const stripH = 58
  const H = stripY + stripH + M
  const colCx = (i: number) => gx + i * colW + colW / 2
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The carry cascade for 111 plus 1 in binary, equal to 1000. Four columns for place values 8, 4, 2 and 1. The addends 111 and 1 sit in two rows above a rule, the sum 1000 below it. Three carry marks sit above the fours, twos and eights columns, joined by arrows travelling up and left from the units, twos and fours columns. Side notes read: units 1 plus 1 equals 10, write 0 carry 1; twos 1 plus 0 plus 1 equals 10, write 0 carry 1; fours 1 plus 0 plus 1 equals 10, write 0 carry 1; eights, the last carry lands, write 1. A footer strip notes three carries for one click: 7 plus 1 equals 8 equals 1000 in base 2.">`)
  s.push(`<g font-family="${f38}">`)
  s.push(cf38Txt(W / 2, 30, 13, c38.teal, 'the carry cascade: 111 + 1 = 1000', 'bold'))
  s.push(cf38Txt(W / 2, 50, 10, c38.tealInk, '7 + 1 = 8 - one click of the units wheel ripples three columns left'))
  for (let i = 0; i < 4; i++) s.push(cf38Txt(colCx(i), placeY, 11, c38.tealInk, places[i], 'bold'))
  /* the three travelling carries: arrows from column i up-left to column i-1 */
  for (let i = 3; i >= 1; i--) {
    const x1 = colCx(i)
    const y1 = rowATop - 3
    const x2 = colCx(i - 1)
    const y2 = carryCy + carryR + 4
    s.push(`<path d="M ${x1} ${y1} Q ${(x1 + x2) / 2} ${carryCy - 20} ${x2} ${y2}" fill="none" stroke="${c38.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="${x2},${y2} ${x2 - 4.5},${y2 - 7} ${x2 + 4.5},${y2 - 7}" fill="${c38.conn}"/>`)
  }
  for (let i = 0; i < 3; i++) {
    s.push(`<circle cx="${colCx(i)}" cy="${carryCy}" r="${carryR}" fill="${c38.panelA}" stroke="${c38.accent}" stroke-width="2"/>`)
    s.push(cf38Txt(colCx(i), carryCy + 4, 11, c38.accent, '1', 'bold'))
  }
  /* the addend rows */
  const rowAdigits = ['', '1', '1', '1']
  const rowBdigits = ['', '', '', '1']
  for (let i = 0; i < 4; i++) {
    const bx = gx + i * colW
    s.push(`<rect x="${bx + 2}" y="${rowATop}" width="${colW - 4}" height="${rowH}" rx="8" fill="${c38.white}" stroke="${c38.struct}" stroke-width="2"/>`)
    if (rowAdigits[i]) s.push(cf38Txt(colCx(i), rowATop + rowH / 2 + 7, 18, c38.ink, rowAdigits[i], 'bold'))
    s.push(`<rect x="${bx + 2}" y="${rowBTop}" width="${colW - 4}" height="${rowH}" rx="8" fill="${c38.white}" stroke="${c38.struct}" stroke-width="2"/>`)
    if (rowBdigits[i]) s.push(cf38Txt(colCx(i), rowBTop + rowH / 2 + 7, 18, c38.ink, rowBdigits[i], 'bold'))
  }
  s.push(cf38Txt(gx - 18, rowBTop + rowH / 2 + 7, 16, c38.ink, '+', 'bold'))
  s.push(`<line x1="${gx - 10}" y1="${ruleY}" x2="${gx + gridW + 10}" y2="${ruleY}" stroke="${c38.ink}" stroke-width="2"/>`)
  const sumDigits = ['1', '0', '0', '0']
  for (let i = 0; i < 4; i++) {
    const bx = gx + i * colW
    s.push(`<rect x="${bx + 2}" y="${sumTop}" width="${colW - 4}" height="${sumH}" rx="8" fill="${c38.panelB}" stroke="${c38.mid}" stroke-width="2"/>`)
    s.push(cf38Txt(colCx(i), sumTop + sumH / 2 + 7, 18, c38.ink, sumDigits[i], 'bold'))
  }
  /* the side notes */
  const notes = [
    'units: 1 + 1 = 10 - write 0, carry 1',
    'twos: 1 + 0 + 1 = 10 - write 0, carry 1',
    'fours: 1 + 0 + 1 = 10 - write 0, carry 1',
    'eights: the last carry lands - write 1',
  ]
  notes.forEach((t, k) => {
    s.push(`<circle cx="${noteX}" cy="${noteYs[k] - 4}" r="3" fill="${c38.accent}"/>`)
    s.push(cf38Txt(noteX + 12, noteYs[k], 10.5, c38.ink, t, 'normal', 'start'))
  })
  /* the footer strip */
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c38.paper}" stroke="${c38.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 24, 11.5, c38.ink, 'three carries for one click: 7 + 1 = 8 = 1000 in base 2', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 44, 9.5, c38.tealInk, 'the all-ones numeral sits one short of a roll - the 255 witness of lesson 3.6 in miniature'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the shift-double ladder 13 -> 26 -> 52             */
/* ------------------------------------------------------------------ */
function cf38LadderSvg(): string {
  const W = 760
  const M = 20
  const bitW = 44
  const bitH = 50
  const rungs = [
    { bits: ['1', '1', '0', '1'], value: '= 13', exp: '13 = 8 + 4 + 1' },
    { bits: ['1', '1', '0', '1', '0'], value: '= 26', exp: '26 = 16 + 8 + 2' },
    { bits: ['1', '1', '0', '1', '0', '0'], value: '= 52', exp: '52 = 32 + 16 + 4' },
  ]
  const bitX0 = 176
  const rungTops = [88, 210, 332]
  const arrowX = 320
  const stripY = 414
  const stripH = 58
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The shift-double ladder. Rung one: the bits 1 1 0 1, worth 13, expanding to 8 plus 4 plus 1. Rung two: the same bits with one appended zero, 1 1 0 1 0, worth 26, expanding to 16 plus 8 plus 2. Rung three: two appended zeros, 1 1 0 1 0 0, worth 52, expanding to 32 plus 16 plus 4. Arrows between rungs labelled times 2, append a 0. A footer strip notes two doublings equal two left shifts: 13 times 2 is 26, 26 times 2 is 52.">`)
  s.push(`<g font-family="${f38}">`)
  s.push(cf38Txt(W / 2, 30, 13, c38.teal, 'the shift-double ladder: 13 to 26 to 52', 'bold'))
  s.push(cf38Txt(W / 2, 50, 10, c38.tealInk, 'appending a 0 doubles - multiplication by 2 is a left shift'))
  rungs.forEach((rg, k) => {
    rg.bits.forEach((b, j) => {
      const x = bitX0 + j * bitW
      const appended = j >= 4
      s.push(`<rect x="${x + 2}" y="${rungTops[k]}" width="${bitW - 4}" height="${bitH}" rx="8" fill="${appended ? c38.panelA : c38.white}" stroke="${appended ? c38.accent : c38.struct}" stroke-width="2"/>`)
      s.push(cf38Txt(x + bitW / 2, rungTops[k] + 33, 20, c38.ink, b, 'bold'))
    })
    s.push(cf38Txt(bitX0 + rg.bits.length * bitW + 24, rungTops[k] + 33, 20, c38.ink, rg.value, 'bold', 'start'))
    s.push(cf38Txt(bitX0, rungTops[k] + bitH + 20, 10, c38.tealInk, rg.exp, 'normal', 'start'))
  })
  for (let k = 0; k < 2; k++) {
    const y1 = rungTops[k] + bitH + 30
    const y2 = rungTops[k + 1] - 10
    s.push(`<line x1="${arrowX}" y1="${y1}" x2="${arrowX}" y2="${y2 - 7}" stroke="${c38.conn}" stroke-width="2.2"/>`)
    s.push(`<polygon points="${arrowX},${y2} ${arrowX - 5.5},${y2 - 9} ${arrowX + 5.5},${y2 - 9}" fill="${c38.conn}"/>`)
    s.push(cf38Txt(arrowX + 14, (y1 + y2) / 2 + 4, 10, c38.conn, 'x 2 - append a 0', 'bold', 'start'))
  }
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c38.paper}" stroke="${c38.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 24, 11.5, c38.ink, 'two doublings = two left shifts: 13 x 2 = 26, then 26 x 2 = 52', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 44, 9.5, c38.tealInk, 'the bits never change - only trailing zeros grow, one per doubling'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the addition grid 1101 + 1011 = 11000             */
/* ------------------------------------------------------------------ */
function cf38AddGridSvg(): string {
  const W = 540
  const M = 20
  const colW = 56
  const gridW = 5 * colW
  const gx = (W - gridW) / 2
  const places = ['16', '8', '4', '2', '1']
  const placeY = 76
  const carryCy = 102
  const carryR = 9
  const rowATop = 134
  const rowH = 40
  const rowBTop = rowATop + rowH + 8
  const ruleY = rowBTop + rowH + 10
  const sumTop = ruleY + 10
  const sumH = 44
  const noteY = sumTop + sumH + 26
  const H = noteY + 14
  const colCx = (i: number) => gx + i * colW + colW / 2
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The addition grid for 1101 plus 1011 in binary, equal to 11000. Five columns for place values 16, 8, 4, 2 and 1. Addend rows 1101 and 1011 sit above a rule, the sum 11000 below. Four carry marks sit above the sixteens, eights, fours and twos columns. A note reads: 13 plus 11 equals 24 equals 16 plus 8 - each carry feeds the next column.">`)
  s.push(`<g font-family="${f38}">`)
  s.push(cf38Txt(W / 2, 30, 12.5, c38.teal, 'the addition grid: 1101 + 1011 = 11000', 'bold'))
  s.push(cf38Txt(W / 2, 48, 10, c38.tealInk, 'every column rolls - four carries'))
  for (let i = 0; i < 5; i++) s.push(cf38Txt(colCx(i), placeY, 11, c38.tealInk, places[i], 'bold'))
  for (let i = 0; i < 4; i++) {
    s.push(`<circle cx="${colCx(i)}" cy="${carryCy}" r="${carryR}" fill="${c38.panelA}" stroke="${c38.accent}" stroke-width="2"/>`)
    s.push(cf38Txt(colCx(i), carryCy + 3.5, 10, c38.accent, '1', 'bold'))
  }
  const rowA: string[] = ['', '1', '1', '0', '1']
  const rowB: string[] = ['', '1', '0', '1', '1']
  for (let i = 0; i < 5; i++) {
    const bx = gx + i * colW
    s.push(`<rect x="${bx + 2}" y="${rowATop}" width="${colW - 4}" height="${rowH}" rx="8" fill="${c38.white}" stroke="${c38.struct}" stroke-width="2"/>`)
    if (rowA[i]) s.push(cf38Txt(colCx(i), rowATop + rowH / 2 + 6, 16, c38.ink, rowA[i], 'bold'))
    s.push(`<rect x="${bx + 2}" y="${rowBTop}" width="${colW - 4}" height="${rowH}" rx="8" fill="${c38.white}" stroke="${c38.struct}" stroke-width="2"/>`)
    if (rowB[i]) s.push(cf38Txt(colCx(i), rowBTop + rowH / 2 + 6, 16, c38.ink, rowB[i], 'bold'))
  }
  s.push(cf38Txt(gx - 16, rowBTop + rowH / 2 + 6, 15, c38.ink, '+', 'bold'))
  s.push(`<line x1="${gx - 10}" y1="${ruleY}" x2="${gx + gridW + 10}" y2="${ruleY}" stroke="${c38.ink}" stroke-width="2"/>`)
  const sum = ['1', '1', '0', '0', '0']
  for (let i = 0; i < 5; i++) {
    const bx = gx + i * colW
    s.push(`<rect x="${bx + 2}" y="${sumTop}" width="${colW - 4}" height="${sumH}" rx="8" fill="${c38.panelB}" stroke="${c38.mid}" stroke-width="2"/>`)
    s.push(cf38Txt(colCx(i), sumTop + sumH / 2 + 6, 16, c38.ink, sum[i], 'bold'))
  }
  s.push(cf38Txt(W / 2, noteY, 10, c38.tealInk, '13 + 11 = 24 = 16 + 8 - each carry feeds the next column'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the borrow chain 100000 - 1 = 11111               */
/* ------------------------------------------------------------------ */
function cf38BorrowSvg(): string {
  const W = 760
  const M = 20
  const boxW = 72
  const boxH = 52
  const boxGap = 16
  const chainW = 6 * boxW + 5 * boxGap
  const gx = (W - chainW) / 2
  const titleY = 28
  const subY = 46
  const arcLabelY = 68
  const boxTop = 102
  const placeY = boxTop + boxH + 22
  const afterTop = placeY + 12
  const afterH = 40
  const stripY = afterTop + afterH + 18
  const stripH = 58
  const H = stripY + stripH + M
  const bx = (i: number) => gx + i * (boxW + boxGap)
  const bcx = (i: number) => bx(i) + boxW / 2
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The borrow chain for 100000 minus 1 in binary, equal to 11111. Six boxes hold the digits 1 0 0 0 0 0 over place values 32, 16, 8, 4, 2 and 1. A long arrow arcs over the boxes from the units box to the thirty-twos box, labelled the borrow travels left until it finds a 1 to take, with small left-pointing chevrons in every gap. Below, an after row shows the digits 0 1 1 1 1 1. A footer strip reads: 100000 minus 1 equals 11111, that is 32 minus 1 equals 31 equals 16 plus 8 plus 4 plus 2 plus 1; each passed-through column gains 2 and gives 1 away.">`)
  s.push(`<g font-family="${f38}">`)
  s.push(cf38Txt(W / 2, titleY, 13, c38.teal, 'the borrow chain: 100000 - 1 = 11111', 'bold'))
  s.push(cf38Txt(W / 2, subY, 10, c38.tealInk, '32 - 1 = 31 - the units borrows across four empty columns'))
  /* the long travelling-borrow arc */
  s.push(`<path d="M ${bcx(5)} ${boxTop - 3} Q ${W / 2} ${arcLabelY - 16} ${bcx(0) + 6} ${boxTop - 3}" fill="none" stroke="${c38.conn}" stroke-width="2.2"/>`)
  s.push(`<polygon points="${bcx(0) - 3},${boxTop - 2} ${bcx(0) + 9},${boxTop - 10} ${bcx(0) + 9},${boxTop + 5}" fill="${c38.conn}"/>`)
  s.push(cf38Txt(W / 2, arcLabelY, 10, c38.conn, 'the borrow travels left until it finds a 1 to take'))
  /* the minuend boxes */
  const digits = ['1', '0', '0', '0', '0', '0']
  const places = ['32', '16', '8', '4', '2', '1']
  for (let i = 0; i < 6; i++) {
    s.push(`<rect x="${bx(i)}" y="${boxTop}" width="${boxW}" height="${boxH}" rx="8" fill="${i === 0 ? c38.panelA : c38.white}" stroke="${i === 0 ? c38.accent : c38.struct}" stroke-width="2"/>`)
    s.push(cf38Txt(bcx(i), boxTop + 34, 20, c38.ink, digits[i], 'bold'))
    s.push(cf38Txt(bcx(i), placeY, 11, c38.tealInk, places[i], 'bold'))
  }
  s.push(cf38Txt(bx(5) + boxW + 14, boxTop + boxH / 2 + 6, 16, c38.warn, '- 1', 'bold', 'start'))
  /* the gap chevrons, pointing left */
  const midY = boxTop + boxH / 2
  for (let i = 0; i < 5; i++) {
    const gxx = bx(i) + boxW + boxGap / 2
    s.push(`<polyline points="${gxx + 5},${midY - 6} ${gxx - 1},${midY} ${gxx + 5},${midY + 6}" fill="none" stroke="${c38.accent}" stroke-width="2"/>`)
  }
  /* the after row */
  const after = ['0', '1', '1', '1', '1', '1']
  s.push(cf38Txt(gx - 14, afterTop + afterH / 2 + 4, 10, c38.tealInk, 'after:', 'bold', 'end'))
  for (let i = 0; i < 6; i++) {
    const live = after[i] === '1'
    s.push(`<rect x="${bx(i)}" y="${afterTop}" width="${boxW}" height="${afterH}" rx="8" fill="${live ? c38.panelA : c38.white}" stroke="${live ? c38.accent : c38.teal}" stroke-width="2"/>`)
    s.push(cf38Txt(bcx(i), afterTop + 27, 16, live ? c38.accent : c38.tealInk, after[i], 'bold'))
  }
  /* the footer strip */
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c38.paper}" stroke="${c38.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 24, 11.5, c38.ink, '100000 - 1 = 11111, i.e. 32 - 1 = 31 = 16 + 8 + 4 + 2 + 1', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 44, 9.5, c38.tealInk, 'each passed-through column gains 2 and gives 1 away, ending as 1; the units ends as 2, and 2 - 1 = 1'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — shift-and-add partials 110 x 101 = 11110          */
/* ------------------------------------------------------------------ */
function cf38ShiftAddSvg(): string {
  const W = 700
  const M = 20
  const colW = 52
  const gridW = 5 * colW
  const gx = 96
  const places = ['16', '8', '4', '2', '1']
  const placeY = 66
  const rowATop = 78
  const rowH = 38
  const rowBTop = rowATop + rowH + 6
  const rule1Y = rowBTop + rowH + 8
  const p0Top = rule1Y + 8
  const p1Top = p0Top + rowH + 6
  const p2Top = p1Top + rowH + 6
  const rule2Y = p2Top + rowH + 8
  const sumTop = rule2Y + 8
  const sumH = 44
  const stripY = sumTop + sumH + 18
  const stripH = 58
  const H = stripY + stripH + M
  const colCx = (i: number) => gx + i * colW + colW / 2
  const labX = gx + gridW + 20
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Long multiplication by shifts and adds: 110 times 101 equals 11110. Five columns for place values 16, 8, 4, 2 and 1. Row 110 labelled 6, times row 101 labelled x 5, then three partial rows: 110 worth 6, a dim row 0000 worth 0, and 11000 worth 24, then the sum 11110 worth 30. A footer strip reads: partials 6 plus 0 plus 24 equals 30, and a 1-bit copies the numeral shifted while a 0-bit skips a row.">`)
  s.push(`<g font-family="${f38}">`)
  s.push(cf38Txt(W / 2, 28, 12.5, c38.teal, 'shifts and adds: 110 x 101 = 11110', 'bold'))
  s.push(cf38Txt(W / 2, 46, 10, c38.tealInk, '6 x 5 = 30 - one partial per 1-bit; the 0-bit row costs nothing'))
  for (let i = 0; i < 5; i++) s.push(cf38Txt(colCx(i), placeY, 10.5, c38.tealInk, places[i], 'bold'))
  /* helper to draw one digit row: entries keyed by column index */
  const row = (top: number, entries: Record<number, string>, dim: boolean, labels: string[]) => {
    for (let i = 0; i < 5; i++) {
      const bx = gx + i * colW
      const has = entries[i] !== undefined
      s.push(`<rect x="${bx + 2}" y="${top}" width="${colW - 4}" height="${rowH}" rx="7" fill="${dim ? c38.white : c38.white}" stroke="${dim ? c38.faint : c38.struct}" stroke-width="2"/>`)
      if (has) s.push(cf38Txt(colCx(i), top + rowH / 2 + 6, 15, dim ? c38.tealInk : c38.ink, entries[i] as string, 'bold'))
    }
    s.push(cf38Txt(labX, top + rowH / 2 + 4, 11, c38.tealInk, labels[0], 'normal', 'start'))
    if (labels[1]) s.push(cf38Txt(labX, top + rowH / 2 + 18, 9.5, c38.tealInk, labels[1], 'normal', 'start'))
  }
  row(rowATop, { 2: '1', 3: '1', 4: '0' }, false, ['6'])
  row(rowBTop, { 2: '1', 3: '0', 4: '1' }, false, ['x 5'])
  s.push(`<line x1="${gx - 10}" y1="${rule1Y}" x2="${gx + gridW + 10}" y2="${rule1Y}" stroke="${c38.ink}" stroke-width="2"/>`)
  row(p0Top, { 2: '1', 3: '1', 4: '0' }, false, ['= 6', '110 x 1'])
  row(p1Top, { 1: '0', 2: '0', 3: '0', 4: '0' }, true, ['= 0', '110 x 0, shifted'])
  row(p2Top, { 0: '1', 1: '1', 2: '0', 3: '0', 4: '0' }, false, ['= 24', '110 x 100'])
  s.push(`<line x1="${gx - 10}" y1="${rule2Y}" x2="${gx + gridW + 10}" y2="${rule2Y}" stroke="${c38.ink}" stroke-width="2"/>`)
  for (let i = 0; i < 5; i++) {
    const bx = gx + i * colW
    s.push(`<rect x="${bx + 2}" y="${sumTop}" width="${colW - 4}" height="${sumH}" rx="7" fill="${c38.panelB}" stroke="${c38.mid}" stroke-width="2"/>`)
    s.push(cf38Txt(colCx(i), sumTop + sumH / 2 + 6, 16, c38.ink, ['1', '1', '1', '1', '0'][i], 'bold'))
  }
  s.push(cf38Txt(labX, sumTop + sumH / 2 + 6, 12, c38.ink, '= 30', 'bold', 'start'))
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c38.paper}" stroke="${c38.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 24, 11.5, c38.ink, 'partials: 6 + 0 + 24 = 30 = 16 + 8 + 4 + 2, and 110 + 11000 = 11110', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 44, 9.5, c38.tealInk, 'a 1-bit copies the numeral shifted; a 0-bit skips a row - the multiplier is a shifter-adder'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the one-hand register showing 19 = 10011          */
/* ------------------------------------------------------------------ */
function cf38HandSvg(): string {
  const W = 620
  const M = 20
  const barW = 56
  const barGap = 30
  const barsW = 5 * barW + 4 * barGap
  const gx = (W - barsW) / 2
  const placeY = 96
  const baseY = 250
  const upH = 124
  const downH = 44
  const bitY = baseY + 30
  const stripY = bitY + 18
  const stripH = 58
  const H = stripY + stripH + M
  const places = ['16', '8', '4', '2', '1']
  const bits = ['1', '0', '0', '1', '1']
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nineteen on one hand, the binary pattern 10011. Five vertical finger bars over place values 16, 8, 4, 2 and 1. The 16, 2 and 1 bars stand tall and are labelled up; the 8 and 4 bars are short and labelled down. The bit row below reads 1 0 0 1 1. A footer strip reads: 10011 equals 16 plus 2 plus 1 equals 19; five bits name 32 states, zero to 31; two hands name 1,024 states, reaching 1,023.">`)
  s.push(`<g font-family="${f38}">`)
  s.push(cf38Txt(W / 2, 30, 13, c38.teal, 'nineteen on one hand: 10011', 'bold'))
  s.push(cf38Txt(W / 2, 50, 10, c38.tealInk, 'five fingers, five bits - call the thumb the units and work left'))
  for (let i = 0; i < 5; i++) {
    const x = gx + i * (barW + barGap)
    const cx = x + barW / 2
    const up = bits[i] === '1'
    const top = up ? baseY - upH : baseY - downH
    s.push(`<rect x="${x}" y="${top}" width="${barW}" height="${up ? upH : downH}" rx="14" fill="${up ? c38.panelA : c38.white}" stroke="${up ? c38.accent : c38.teal}" stroke-width="2"/>`)
    s.push(cf38Txt(cx, top + 20, 10, up ? c38.accent : c38.tealInk, up ? 'up' : 'down', 'bold'))
    s.push(cf38Txt(cx, placeY, 12, c38.tealInk, places[i], 'bold'))
    s.push(cf38Txt(cx, bitY, 14, c38.ink, bits[i], 'bold'))
  }
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${c38.paper}" stroke="${c38.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 24, 11.5, c38.ink, '10011 = 16 + 2 + 1 = 19 - the 16, 2 and 1 fingers stand up', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 44, 9.5, c38.tealInk, 'five bits name 32 states (0 to 31); two hands name 1,024 states, reaching 1,023'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
export const lesson38: Lesson = {
  id: 'cf-decimal-and-binary-number-system',
  number: '3.8',
  title: 'Decimal and Binary Number System',
  concepts: [
    'positional notation as one machine, many alphabets',
    'the side-by-side counting strip and the odometer principle',
    'the anatomy trade: digit count against digit cost',
    'binary addition and the carry rule 1 + 1 = 10',
    'binary subtraction and the borrow chain',
    'multiplication as shifts and adds',
    'the shift-double law: x 2^k appends k zeros',
    'two-valued logic on two-state switches (Boole to Shannon)',
  ],
  objectives: [
    'By the end of this lesson you can read decimal and binary as one positional machine wearing two alphabets, citing the four-dress witness of lesson 3.2 rather than re-deriving it.',
    'By the end of this lesson you can count in binary side by side with decimal, and say exactly when and why each system opens a new column.',
    'By the end of this lesson you can compare the two systems anatomically - alphabet, place values, largest n-digit value, digits needed for a number - and state the honest three-and-a-third digit trade.',
    'By the end of this lesson you can add, subtract and multiply small binary numerals digit by digit, marking every carry and every borrow, and check each result by re-adding or by weights.',
    'By the end of this lesson you can use the shift-double law - appending a zero multiplies by two - to double, halve and scale by powers of two without a times table.',
    'By the end of this lesson you can explain why the machine keeps binary, from Boole in 1854 to Shannon in 1937, and demonstrate a five-bit binary register on one hand.',
  ],
  prerequisites: ['cf-decimal-to-binary-conversion', 'cf-binary-to-decimal-conversion'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ================================================================
    // 0. THE POSITION OF THIS LESSON (the synthesis seat)
    // ================================================================
    { kind: 'para', text: 'You now hold both crafts. Lesson 3.6 taught you to walk a decimal number down the division ladder and read its binary dress off the remainders; lesson 3.7 taught you to walk the other way, sweeping a binary numeral left to right and doubling, or summing the weights under its 1-bits. Between them you have converted more numbers than any examination bench will ever ask of you. This lesson — the school syllabus calls it Decimal and Binary Number System, and we honour that title — does what neither craft did: it sets the two systems side by side and studies them as ONE idea, and then it teaches the ground no conversion lesson could reach, how to DO arithmetic inside the binary alphabet.' },
    { kind: 'para', text: 'A word about method before we begin. This is the synthesis seat of the chapter, which means every conversion fact you meet below is CITED, not re-derived. When we write $45 = 101101_2 = 55_8 = 2D_{16}$ — the four-dress witness of lesson 3.2 — we are quoting a result you have already verified twice, once by the ladder of 3.6 and once by the weights of 3.7, and to re-drill it here would waste your time. What is new is the ground between the conversions: what counting looks like when the wheels have only two positions, what addition and subtraction and multiplication become when the alphabet shrinks to two symbols, and why the machine that runs your code prefers this shrunken alphabet to your own ten.' },
    { kind: 'para', text: 'The promise, in three lines. First, you will see that decimal and binary are not two systems but one system wearing two alphabets — the family portrait of the next section. Second, you will meet binary arithmetic properly: addition with carries, subtraction with borrows, multiplication as shifts and adds, each worked digit by digit and checked in decimal. Third, you will collect the honest engineering answer to the question every beginner asks — why only two symbols? — an answer that runs from Boole in 1854 to Shannon in 1937 and ends with a binary machine you carry on the end of your arm.' },

    // ================================================================
    // 1. THE FAMILY PORTRAIT
    // ================================================================
    { kind: 'heading', text: 'The Family Portrait' },
    { kind: 'para', text: 'Begin with the machine itself. A positional numeral system — the invention behind every number you have ever written — stores a value by PLACE and DIGIT together: each column of the numeral is worth a fixed power of a base, and the digit sitting in that column says how many of that power to count. Lesson 3.2 derived the formula that runs this machine, and it is short enough to hold in one line:' },
    { kind: 'equation', latex: 'V = (d_m \\,\\ldots\\, d_1 d_0)_b = \\sum_{i=0}^{m} d_i\\, b^i, \\qquad 0 \\le d_i \\le b-1', note: 'one formula, many alphabets: the base b chooses the alphabet and the place values; the machinery never changes' },
    { kind: 'callout', tone: 'definition', title: 'Positional notation, formally', text: 'A numeral system is said to be positional if the value contributed by any digit is the product of that digit with a fixed power of a base, the power being fixed by the place the digit occupies alone — so that the value of the whole numeral is the sum of these contributions. The base $b$ is the count of symbols in the alphabet, and the digits run from $0$ up to $b - 1$. In symbols, $V = \\sum_i d_i\\, b^i$: read each digit, multiply by its place, add.' },
    { kind: 'para', text: 'For example, the same machine dressed three ways:' },
    { kind: 'list', marker: 'roman', items: [
      'In base 10, alphabet $0$ through $9$: the numeral $4{,}728$ says $4 \\times 1000 + 7 \\times 100 + 2 \\times 10 + 8 \\times 1 = 4{,}728$ — four thousands, seven hundreds, two tens, eight units.',
      'In base 2, alphabet $0$ and $1$: the numeral $101101$ says $1 \\times 32 + 0 \\times 16 + 1 \\times 8 + 1 \\times 4 + 0 \\times 2 + 1 \\times 1 = 45$ — one thirty-two, no sixteens, one eight, one four, no twos, one unit.',
      'In base 16, alphabet $0$ through $9$ and $A$ through $F$: the numeral $2D$ says $2 \\times 16 + 13 = 45$ — the same forty-five in its shortest dress.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Why ten? — the honest record', text: 'Humans almost everywhere settled on ten symbols, and the ordinary explanation is the one you are wearing: ten fingers. The historical record supports the inference but supplies no receipt — no surviving document records the moment of the choice, and we say so plainly. The exceptions make the story honest: Babylonian scribes computed in base 60, a base so rich in factors that sixty minutes in an hour is its living fossil, and the Maya counted in twenties, fingers and toes together. Decimal won the world not by mathematical superiority but by the accident of anatomy meeting commerce. The moral for this chapter: the base is a CHOICE, and a choice can be revisited when the hardware changes. Our sibling book Arithmetic and Number Systems owns the full history; lesson 3.2 told the census side.' },
    { kind: 'para', text: 'And the hardware did change. A human hand offers ten more-or-less distinguishable positions; a wire offers voltage, and lesson 3.1 spent its whole length on why a machine built from wires, switches and noise prefers two states to ten. The argument, cited forward rather than re-argued: every physical signal blurs, and the farther apart the "means 0" zone and the "means 1" zone sit, the harder it is for noise to mistake one for the other. Ten distinguishable zones on one wire is a fragile ask; two zones is armoured. The machine did not choose binary because two symbols are elegant. It chose binary because two states are RELIABLE.' },
    { kind: 'figure', caption: 'The family portrait: the decimal anatomy of 4,728 (four digit cells over the place values 1000, 100, 10 and 1, expanding to 4 x 1000 + 7 x 100 + 2 x 10 + 8 x 1 = 4,728) hung above the binary anatomy of 101101 (six digit cells over the place values 32, 16, 8, 4, 2 and 1, expanding to 1 x 32 + 0 x 16 + 1 x 8 + 1 x 4 + 0 x 2 + 1 x 1 = 45) — the same machine in two alphabets, with the four-dress witness 45 = 101101 in base 2 = 55 in base 8 = 2D in base 16 in the footer.', svg: cf38PortraitSvg() },
    { kind: 'para', text: 'Read the figure the way a mechanic reads an engine bay. The two panels wear different alphabets — ten digits against two — and carry different place-value ladders — thousands, hundreds, tens, units against thirty-twos, sixteens, eights, fours, twos, units — but the machinery is identical: a digit sits in a cell, the cell is worth a power of the base, the value is the sum of digit-times-cell over all columns. Swap the alphabet and the ladder, and the SAME formula evaluates either panel. This is why conversion was never arithmetic but translation: the ladder of lesson 3.6 and the weights of lesson 3.7 never compute anything new; they re-dress a value you already owned.' },
    { kind: 'callout', tone: 'insight', title: 'One machine, many alphabets', text: 'Base 10, base 2, base 8, base 16 — these are not four number systems. They are four DRESSES on one system: positional notation, the single invention $V = \\sum d_i b^i$. When a syllabus says "the decimal and binary number system", read it as "the positional number system, seen in its two working dresses" — decimal because you were born with ten fingers, binary because your machine was born with two states. Everything else in this chapter is consequence.' },

    // ================================================================
    // 2. COUNTING SIDE BY SIDE
    // ================================================================
    { kind: 'heading', text: 'Counting Side by Side' },
    { kind: 'para', text: 'Now watch the one machine run. Count from zero to ten in both alphabets at once — the figure below — and keep your eye on the wheels. A positional numeral is an odometer: each column is a wheel, each wheel has as many positions as the base has digits, and when a wheel fills it rolls back to $0$ and pushes one carry leftward. That is the whole of counting, in any base whatsoever.' },
    { kind: 'figure', caption: 'The counting strip 0 to 10, side by side: the decimal row opens its second column only at ten (marked), while the binary row opens new columns at two, four and eight (each marked with a roll arrow) — the odometer principle running in two alphabets, one click at a time, the same answers in both rows.', svg: cf38StripSvg({
      W: 780,
      title: 'the counting strip: 0 to 10, side by side',
      subtitle: 'decimal on top, binary below - watch the wheels roll',
      to: 10,
      marks: [2, 4, 8],
      decMark: 10,
      note1: 'the odometer principle: when a column fills, it rolls to 0 and pushes 1 left',
      note2: 'binary opens new columns at 2, 4 and 8; decimal opens its second column only at 10 - the same event on different clocks',
      aria: 'The counting strip from zero to ten in decimal and binary, side by side. A count row numbered 0 through 10; a base 10 row reading 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 with the 10 cell marked; a base 2 row reading 0, 1, 10, 11, 100, 101, 110, 111, 1000, 1001, 1010 with new-column marks at 2, 4 and 8. A footer strip states the odometer principle: when a column fills, it rolls to 0 and pushes 1 left.',
    }) },
    { kind: 'para', text: 'Three things in that strip deserve your eyes. First, the binary row opens a new column at 2, at 4 and at 8 — three new columns before decimal has opened its first, which waits for 10. A two-position wheel simply fills faster: every second click rolls it. Second, the rolls are the SAME EVENT. Watch count 1 give way to 2 in binary — the wheel $1$ fills and rolls to $10$ — and then watch count 9 give way to 10 in decimal — the wheel $9$ fills and rolls to $10$. A full wheel empties and pushes one left; the base decides only how full "full" means. Third, the binary strip is not a table to memorise but a machine to run: given $101$ and asked for the next numeral, you do not recall anything — you click the units wheel, roll what fills, carry what rolls, and out comes $110$.' },
    { kind: 'callout', tone: 'insight', title: 'The odometer principle', text: 'When a column fills, it rolls: the digit returns to $0$ and one is carried into the next column left. In base 10 this happens at $9 \\to 10$; in base 2 it happens at $1 \\to 10$. The principle is base-blind — only the wheel size changes. Every roll-over you have met in this chapter, from the $255 \\to 256$ witness of lesson 3.6 to the strip above, is this one sentence happening somewhere.' },
    { kind: 'example', title: 'Count past ten: write the binary numerals for eleven, twelve and thirteen, showing each click.', steps: [
      'Take eleven: the strip of the figure ends at $1010$ (ten); one click of the units wheel gives $1011$ — no roll anywhere.',
      'So, twelve: $1011 + 1$ — the units rolls to 0 and carries, the twos rolls to 0 and carries, and the fours column lights up for the first time past ten: $1100$.',
      'Now, thirteen: $1100 + 1 = 1101$ — a single click, no carry at all.',
      'Check in decimal: $11, 12, 13$ against $1011, 1100, 1101$ — the strip marches on, one click at a time.',
      'Hence counting in binary is counting in decimal wearing another alphabet — the odometer, not the digits, does the work.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The dress slip', text: 'The numeral 10 is not "ten". In decimal dress it names ten; in binary dress it names two; in base 8 it names eight. Reading a binary numeral as though it were decimal is the beginner’s signature error — $100$ is four, not one hundred; $1000$ is eight, not one thousand. The digits are borrowed, the VALUES are not. Say the place values under the digits, every time, until the habit is automatic: one-zero in base two is "one two and no units", which is two.' },
    { kind: 'para', text: 'One more read of the strip, because it quietly contains the whole chapter. Every binary numeral in the figure is an answer to "how many" — the same answers the decimal row gives, in the same order, with no disagreement and no lag. The two rows are the same counting wearing different clothes. When lesson 3.4 turned pictures into bit patterns and lesson 3.5 squeezed those patterns smaller, the numbers crossing that boundary lived in the binary row’s alphabet, and the machine never once needed to translate them into yours. Translation, as 3.6 and 3.7 proved, is a procedure for YOUR convenience — the machine counts, stores and computes in its own dress from the first bit to the last.' },
    // ================================================================
    // 3. THE ANATOMY COMPARISON (the trade)
    // ================================================================
    { kind: 'heading', text: 'The Anatomy Comparison' },
    { kind: 'para', text: 'Set the two dresses side by side on the bench and compare them the way an anatomist compares two skeletons: line by line, asking where they agree and where they part. Four lines settle everything worth knowing, and the table below is the whole comparison. Read it slowly — every line is either a census you have already taken in lessons 3.2 and 3.6 or an immediate consequence of the one formula of the family portrait, and the single line where the systems genuinely diverge is the fourth.' },
    { kind: 'table', caption: 'The anatomy of the two working dresses, line by line', head: ['Anatomy line', 'Decimal, base 10', 'Binary, base 2'], rows: [
      ['Alphabet', 'ten digits: $0$ through $9$', 'two digits: $0$ and $1$'],
      ['Place ladder, four columns', '$10^3, 10^2, 10, 1$ — thousands, hundreds, tens, units', '$2^3, 2^2, 2, 1$ — eights, fours, twos, units'],
      ['Largest 3-digit numeral', '$999 = 10^3 - 1$', '$111_2 = 7 = 2^3 - 1$'],
      ['Dress size for one million', '7 digits ($999{,}999$ rolls to $1{,}000{,}000$)', '20 bits ($2^{19} < 10^6 \\le 2^{20}$)'],
      ['Cost of one digit', 'ten cleanly separated states — a fragile ask for a wire', 'two states — armoured against noise'],
    ] },
    { kind: 'para', text: 'The first three lines are pure agreement, and the third deserves a second look. The largest three-digit numeral of a base is the maximal digit in every column — $999$ in decimal, $111$ in binary — and its value is always the base cubed minus one: $10^3 - 1 = 999$ against $2^3 - 1 = 7$. Lesson 3.6 met this law at eight columns, where $11111111_2 = 255 = 2^8 - 1$ rolled to $256 = 2^8$; the three-column row of the table is the same event in miniature. There is one largest-numeral law, not two. The all-nines pattern and the all-ones pattern are the SAME pattern, because both say "every column as full as its alphabet allows".' },
    { kind: 'para', text: 'The fourth line is the honest divergence. Take a census of a million. On the decimal side the answer is instant: $999{,}999$ is the largest value six digits can name, so a million — the first value that does not fit — wears 7 digits. On the binary side you must find the powers of two that straddle a million, and that census is worth taking once with your own pen.' },
    { kind: 'example', title: 'A census: how many bits does a million need?', steps: [
      'Take the target: one million, that is $10^6$.',
      'Find the straddling powers: $2^{19} = 524{,}288$ falls short, and $2^{20} = 1{,}048{,}576$ is the first power of two that reaches a million.',
      'So, every value from $524{,}288$ up to $1{,}048{,}576$ fits inside twenty columns, and a million sits squarely in that window.',
      'Check the decimal side: $999{,}999$ is the largest six-digit value, so a million needs 7 decimal digits.',
      'Hence 7 digits against 20 bits — one value, two dresses, and the binary dress is not quite three times longer.',
    ] },
    { kind: 'para', text: 'Why not quite three times, exactly? Because the exchange rate between the alphabets is fixed. Each decimal digit carries one decade of information — a choice among ten — and each bit carries one binary choice — a choice among two. To ask how many binary choices buy one decimal choice is to ask: two raised to WHAT power is ten? The answer is a logarithm, and we state it honestly rather than derive it, because the logarithm is a doorstep tool this chapter borrows but does not own: $\\log_2 10 = 3.3219280948873623$ — about three and a third bits per decimal digit. Carry the rounded value in your head, and know that the engine has verified the long one to the last digit.' },
    { kind: 'para', text: 'Now the census closes itself. A million is six decades tall, and six decades at three and a third bits per decade is $6 \\times 3.3219 = 19.9$ bits, which rounds UP to the 20 the census found — you cannot buy nine-tenths of a column. Run the same check at a billion: ten decimal digits on the one side; on the other, $2^{29} = 536{,}870{,}912$ falls short while $2^{30} = 1{,}073{,}741{,}824$ reaches, so 30 bits; and nine decades at the exchange rate is $9 \\times 3.3219 = 29.9$, rounding up to 30 again. The trade is not an accident of the million. It is the exchange rate working at every magnitude you will ever write.' },
    { kind: 'callout', tone: 'insight', title: 'The trade, stated once', text: 'Binary pays about $3.32$ digits for every decimal digit — the value $\\log_2 10$ — but each of its digits costs TWO states instead of ten. A twenty-digit binary register is twenty two-state switches: cheap, and armoured against noise. A seven-digit decimal register is seven ten-state devices: expensive, and fragile. The machine always chooses the long cheap numeral over the short expensive one, and after this lesson you can say WHY at an interview bench in one sentence: a digit that costs two states cannot be misread.' },

    // ================================================================
    // 4. BINARY ADDITION — THE FIRST MEETING
    // ================================================================
    { kind: 'heading', text: 'Binary Addition — the First Meeting' },
    { kind: 'para', text: 'Now the new ground of this seat. Conversion — lessons 3.6 and 3.7 — never computed anything; it translated. Arithmetic computes, and binary arithmetic is your first meeting with the machine calculating in its own dress. The meeting is gentle, because the addition table you must carry is half the size of the decimal one, and its only surprise is a line you have already met as the odometer.' },
    { kind: 'table', caption: 'The whole of column addition in base 2', head: ['Column sum', 'Write', 'Carry left', 'Decimal reading'], rows: [
      ['$0 + 0$', '$0$', 'nothing', 'zero'],
      ['$0 + 1$ or $1 + 0$', '$1$', 'nothing', 'one'],
      ['$1 + 1$', '$0$', '1', 'two, written $10_2$ — the roll'],
      ['$1 + 1 + 1$', '$1$', '1', 'three, written $11_2$ — carry plus one'],
    ] },
    { kind: 'para', text: 'Stare at the third line, because it is the entire difficulty of binary addition. $1 + 1 = 10$: two is the first value the two-symbol alphabet cannot write in one column, so the column fills, writes 0 and pushes 1 leftward — the odometer principle again, now inside a sum. The fourth line is the same line with a carry arriving: three is writable as 11, so write 1 and push 1 leftward. Every other line is trivial. Binary addition is decimal addition with a smaller table and a busier carry — the wheels are smaller, so they roll more often.' },
    { kind: 'example', title: 'Work it: 1011 + 110, column by column', steps: [
      'Set the sum out in columns, units rightmost: $1011$ above $110$.',
      'Units: $1 + 0 = 1$ — write 1, carry nothing.',
      'Twos: $1 + 1 = 10$ — write 0, carry 1.',
      'Fours: $0 + 1 + 1 = 10$ — write 0, carry 1.',
      'Eights: $1 + 0 + 1 = 10$ — write 0, carry 1.',
      'Sixteens: the last carry lands — write 1.',
      'So, $1011 + 110 = 10001$.',
      'Check in decimal: $11 + 6 = 17$, and $10001 = 16 + 1 = 17$ — both dresses agree.',
    ] },
    { kind: 'para', text: 'Notice what made that sum long: three carries in four working columns, each one the little roll $1 + 1 = 10$. In decimal, carries are rare guests — most columns raise none. In binary, carries are the house rhythm, because the wheels hold only two positions and fill every second click. The extreme case is the cascade, where EVERY column rolls at once, and it deserves its own figure.' },
    { kind: 'figure', caption: 'The carry cascade: 111 + 1 = 1000, with the three carries drawn as travelling arrows — the units rolls and pushes 1 into the twos, the twos rolls and pushes 1 into the fours, the fours rolls and pushes 1 into the eights, where the last carry finally lands. One click of the wheel, three travelling carries, one new column: 7 + 1 = 8 = 1000 in base 2, the decimal mirror being 999 + 1 = 1000.', svg: cf38CascadeSvg() },
    { kind: 'example', title: 'Run the cascade yourself: 111 + 1', steps: [
      'Units: $1 + 1 = 10$ — write 0, carry 1.',
      'Twos: $1 + 0 + 1 = 10$ — write 0, carry 1.',
      'Fours: $1 + 0 + 1 = 10$ — write 0, carry 1.',
      'Eights: the carry lands — write 1.',
      'So, $111 + 1 = 1000$: three carries for one click.',
      'Check: $7 + 1 = 8 = 2^3$, and $1000_2 = 8$ — the roll the counting strip staged at count 8.',
    ] },
    { kind: 'para', text: 'The cascade is not a curiosity; it is the shape of every roll-over. The all-ones numeral $111$ sits exactly one short of a full house — add 1 and every wheel empties at once, pushing a single 1 into the first new column. The decimal world stages the same drama at $999 + 1 = 1000$ on every showroom odometer. When a later chapter speaks of a register rolling over, this figure is the event it names.' },
    { kind: 'example', title: 'The self-sum: 101 + 101', steps: [
      'Units: $1 + 1 = 10$ — write 0, carry 1.',
      'Twos: $0 + 0 + 1 = 1$ — write 1, carry nothing.',
      'Fours: $1 + 1 = 10$ — write 0, carry 1.',
      'Eights: the carry lands — write 1.',
      'So, $101 + 101 = 1010$ — the original numeral with a 0 appended.',
      'Check: $5 + 5 = 10$, and $1010_2 = 8 + 2 = 10$.',
      'Hence a numeral plus itself is the numeral shifted left one place — file this away; the multiplication section makes it a law.',
    ] },
    { kind: 'para', text: 'One sentence on the machine’s view, and then a doorstep. Look back at the addition table: the digit you write is 1 exactly when the column holds an odd number of ones, and the carry is 1 exactly when the column holds two or more. Written as logic, the sum bit is XOR and the carry bit is AND — two logic operations on two-valued signals ARE the addition table. Wired together they form a half-adder, the seed of every adder circuit ever built. We name the door and walk on: our sibling book Digital Logic Design builds adders from gates, and complement arithmetic with them.' },
    { kind: 'algorithm', title: 'Ripple-carry addition in base 2', lines: [
      { code: 'carry = 0', note: 'begin with empty hands' },
      { code: 'walk the columns from units leftward:', note: 'rightmost column first, exactly as in the worked runs' },
      { code: '  t = a[i] + b[i] + carry', note: 't is 0, 1, 2 or 3 — the whole column, carry included' },
      { code: '  write t mod 2', note: 'odd counts write 1, even counts write 0' },
      { code: '  carry = t div 2', note: 'what travels left: 1 when t reaches 2, else 0' },
      { code: 'at the end, write the last carry if it is 1', note: 'a final 0 carries nothing and is dropped' },
    ], note: 'This loop is the addition table written as a procedure; the machine version is the adder circuit, which Digital Logic Design builds from gates.' },

    // ================================================================
    // 5. BINARY SUBTRACTION — THE BORROW
    // ================================================================
    { kind: 'heading', text: 'Binary Subtraction — the Borrow' },
    { kind: 'para', text: 'Subtraction is addition filmed backwards, and the borrow is the carry run in reverse. Recall the decimal instinct first, because you have owned it since childhood: to take 9 from 21 the units column cannot pay, so you borrow one from the tens column — and that borrowed 1 arrives worth TEN, because it came from the tens place. The binary rule is the same sentence with one word changed: a borrowed 1 arrives worth TWO, because it came from the twos place. That is the entire rule. Everything else is bookkeeping.' },
    { kind: 'example', title: 'Work it: 1010 - 110', steps: [
      'Set the columns: $1010$ above $110$, units rightmost.',
      'Units: $0 - 0 = 0$ — write 0.',
      'Twos: $1 - 1 = 0$ — write 0.',
      'Fours: $0 - 1$ cannot pay — borrow from the eights: the eights 1 becomes 0, and the fours column now holds $10_2$, that is 2.',
      'Now, $2 - 1 = 1$ — write 1.',
      'So, $1010 - 110 = 100$.',
      'Check by re-adding: $100 + 110 = 1010$, and in decimal $4 + 6 = 10$ — the borrow balanced.',
    ] },
    { kind: 'para', text: 'The check by re-adding is not decoration; it is the discipline of this whole seat. Every subtraction you ever run, in any base whatsoever, can be audited by adding the difference back and demanding the minuend. The machine does exactly this in its complement arithmetic — subtraction re-expressed as addition — and you will meet that door at the end of this section.' },
    { kind: 'example', title: 'The borrow chain: 1100 - 111', steps: [
      'Units: $0 - 1$ cannot pay, and the twos column holds 0 — it has nothing to lend.',
      'So, the borrow travels left to the fours, which holds 1: the fours becomes 0, and the twos receives $10_2$, worth 2.',
      'The twos lends one to the units: the units now holds 2, and the twos keeps 1.',
      'Units: $2 - 1 = 1$ — write 1.',
      'Twos: $1 - 1 = 0$ — write 0.',
      'Fours: $0 - 1$ cannot pay again — borrow from the eights: the fours holds 2, the eights becomes 0.',
      'Fours: $2 - 1 = 1$ — write 1; eights: $0 - 0 = 0$.',
      'So, $1100 - 111 = 101$.',
      'Check: $12 - 7 = 5 = 4 + 1$, and $101_2 = 5$ — two borrows, one travelling chain.',
    ] },
    { kind: 'para', text: 'Read the chain as a rule about travellers. A borrow may cross several columns before it finds a 1 to take, and every column it PASSES THROUGH gains 2, gives 1 away and keeps 1; the column that finally pays gives up its whole 1 and becomes 0; the column that started the trouble receives 2 and settles its debt from that. The exercises stage the longest small chain there is: $100000 - 1$, where the borrow crosses four empty columns before the thirty-twos pays up, and the answer comes out $11111$ — five ones, because every passed-through column kept exactly one.' },
    { kind: 'callout', tone: 'warn', title: 'The borrow that never finds a 1', text: 'If a borrow travels off the left end of the numeral without meeting a 1, the subtraction was impossible: the subtrahend is the larger value and the true answer is negative. In school arithmetic that is an error to report. In a machine register of fixed width it is not an error at all but a SIGNAL — the hardware keeps a dedicated flag for exactly this event, and the negative answers it announces live in the complement dress of the paragraph below. Name the event; the theory belongs to Digital Logic Design.' },

    // ================================================================
    // 6. BINARY MULTIPLICATION — SHIFTS AND ADDS
    // ================================================================
    { kind: 'heading', text: 'Binary Multiplication — Shifts and Adds' },
    { kind: 'para', text: 'Now the beautiful one. Your decimal childhood paid for a hundred products — ten digits against ten digits, $10 \\times 10 = 100$ entries in the times table — and most of them never stuck. The binary times table is one line long:' },
    { kind: 'list', marker: 'roman', items: [
      '$0 \\times 0 = 0$ — nothing times nothing',
      '$0 \\times 1 = 1 \\times 0 = 0$ — anything times nothing',
      '$1 \\times 1 = 1$ — the only product that survives',
    ] },
    { kind: 'para', text: 'A multiplication that can never produce anything but a copy or a blank is not really a multiplication at all. To multiply in binary you never multiply — you COPY the multiplicand once for every 1-bit of the multiplier, SHIFT each copy left by the position of that bit, and ADD the survivors. The operation degenerates into shifting and adding, and that degeneration is the single most consequential fact in this chapter for the machine.' },
    { kind: 'example', title: 'Work it: 101 x 11', steps: [
      'Split the multiplier by its bits: $11_2 = 10 + 1$, so $101 \\times 11 = 101 \\times 10 + 101 \\times 1$.',
      'Take the units bit, a 1: copy $101$ unshifted — worth 5.',
      'Now, the twos bit, also a 1: copy $101$ shifted one place left — $1010$, worth 10.',
      'Add the partials: $101 + 1010 = 1111$.',
      'So, $101 \\times 11 = 1111$.',
      'Check: $5 \\times 3 = 15$, and $1111 = 8 + 4 + 2 + 1 = 15$.',
      'Hence a three-by-two product cost one copy, one shift and one add — the times table was never opened.',
    ] },
    { kind: 'para', text: 'Pause on the shift, because it is doing the only real work. Appending a 0 on the right of a numeral moves every digit one column left: the units digit now sits in the twos column, the twos digit in the fours column, and so on — every contribution to the value doubles, so the whole value doubles. $1101_2 = 13$ becomes $11010_2 = 26$; nothing about the digits changed, only their addresses. The ladder below runs the law twice more, and the derivation after it says why the law holds for any number of appended zeros.' },
    { kind: 'figure', caption: 'The shift-double ladder: 1101 = 13 grows to 11010 = 26 and then to 110100 = 52, one appended zero per rung. The bits never change — only trailing zeros grow, one per doubling — and each rung confirms its value by expansion: 13 = 8 + 4 + 1, 26 = 16 + 8 + 2, 52 = 32 + 16 + 4.', svg: cf38LadderSvg() },
    { kind: 'callout', tone: 'theorem', title: 'The shift-double law', text: 'Appending one zero to a binary numeral doubles its value. Appending $k$ zeros multiplies its value by $2^k$. Conversely, removing a trailing zero halves the value — when there is a trailing zero to remove. This is the whole of multiplication by powers of two in the machine: no times table, only pen-strokes at the right-hand end.' },
    { kind: 'derivation', title: 'Multiplication by a power of two is a left shift', statement: 'If the digits of a binary numeral $N$ are shifted $k$ places left — which is the same as appending $k$ zeros on its right — the new numeral names $2^k \\times N$.', steps: [
      { label: 'Write N by places', formula: 'N = \\sum_{i=0}^{m} d_i\\, 2^i', explanation: 'the family-portrait formula in base 2: each digit times its place value, summed.' },
      { label: 'Shift every digit left by k', formula: "N' = \\sum_{i=0}^{m} d_i\\, 2^{i+k}", explanation: 'appending k zeros moves each digit from the column worth 2 to the power i into the column worth 2 to the power i plus k; the digits themselves are untouched.' },
      { label: 'Factor out the shift', formula: "N' = 2^k \\sum_{i=0}^{m} d_i\\, 2^i", explanation: 'every term now carries one extra factor of 2 for each of the k shifts, and that common factor can be pulled outside the sum.' },
      { label: 'Recognise the original', formula: "N' = 2^k \\, N", explanation: 'the sum that remains is N itself, so the shifted numeral names exactly 2 to the k times the value.' },
    ], result: 'Hence $1101_2 = 13$, and $11010_2 = 26 = 2 \\times 13$, and $110100_2 = 52 = 4 \\times 13$ — the ladder of the figure, one appended zero per doubling, and no arithmetic ever performed.' },
    { kind: 'example', title: 'Double it twice: 1011', steps: [
      'Take $1011_2 = 11$.',
      'One doubling: append a zero — $10110_2 = 22$.',
      'A second doubling: append another — $101100_2 = 44$.',
      'Check by weights: $10110 = 16 + 4 + 2 = 22$; $101100 = 32 + 8 + 4 = 44$.',
      'So, scaling 11 by 4 cost two pen-strokes and zero times-table entries.',
    ] },
    { kind: 'para', text: 'Now assemble the full machine. To multiply by any binary numeral, walk the multiplier bit by bit from the units rightward: a 1-bit says "add a copy of the multiplicand, shifted to line up with this bit", and a 0-bit says "add nothing — skip the row". Sum the surviving rows and the product falls out. A decimal multiplier needs the hundred-entry table and a column of carries; a binary multiplier needs a copier, a shifter and an adder — three dull parts, no table at all. The 3.32-digit tax you met in the anatomy buys this: longer numerals, but a multiplier built from parts that cannot misremember a product, because there is nothing to remember.' },
    { kind: 'callout', tone: 'insight', title: 'Why engineers call this beautiful', text: 'Multiplication — the operation that cost you a hundred products as a child — reduces, in base 2, to SHIFT and ADD: two operations a machine performs with wires. The multiplier circuit is literally a shifter-adder. When a later course tells you a processor multiplies in a handful of clock cycles, this section is the reason it can.' },
    { kind: 'para', text: 'And the honest paragraph on negative numbers, as promised. What does the machine do with a subtraction that cannot pay — with $3 - 5$, say? It does not report an error; it changes the dress. Fix a width, say eight columns, and the $256$ patterns of that width are reassigned by one convention — two’s complement — so that they name $-128$ through $+127$: every pattern still names exactly one value, the adder still works bit for bit exactly as this lesson built it, and the negative values are simply the patterns whose leading bit is 1. It is a relabelling, not a new machine. We name the door and do not open it: the full theory of complement arithmetic — how the relabelling turns subtraction into addition — belongs to Digital Logic Design, and this paragraph is only the signpost.' },

    // ================================================================
    // 7. WHY THE MACHINE KEEPS BINARY
    // ================================================================
    { kind: 'heading', text: 'Why the Machine Keeps Binary' },
    { kind: 'para', text: 'Collect the chapter’s answer to the question every beginner asks on day one: why only two symbols? Three strands braid together. The physics strand you own from lesson 3.1: a wire carrying a signal blurs, and two well-separated states are armoured against noise while ten crowded ones are fragile. The economics strand you met in the anatomy: a binary digit costs two states, and the 3.32 tax on length is cheap against the tenfold cost per digit. The third strand is the deepest, and it is logic.' },
    { kind: 'callout', tone: 'historical', title: 'Boole 1854, Shannon 1937 — eighty-three years apart', text: 'In 1854 George Boole published An Investigation of the Laws of Thought, an algebra whose variables take only the values 0 and 1 — the algebra now called Boolean logic, whose AND, OR and NOT are shuffles of those two values. For eighty years it sat in philosophy’s tidy corner: admired, and thought pointless. In 1937 Claude Shannon, in his master’s thesis at MIT, showed that a network of two-state switches obeys exactly this algebra — that you could design switching circuits by writing Boolean expressions, and read Boolean expressions off circuits. Two-valued logic met two-state hardware, and arithmetic grew out of the marriage: the addition table of this lesson IS a pair of logic operations, sum bit XOR and carry bit AND. Our retelling is honest about the dates and claims nothing beyond them: the route from Boole’s pages to Shannon’s relays runs straight through lesson 3.1’s argument about noise, and the machines that marriage produced are the ones running the words you now read.' },
    { kind: 'para', text: 'Say the payoff in one line, because it is the thesis of the whole chapter: two-valued logic plus two-state switches equals arithmetic from switches. The addition table you worked by hand in this lesson is, unchanged, the specification of a circuit; when you carried the 1 across three columns in the cascade, you were executing — slowly, in your head — the exact ripple a bank of half-adders performs in a fraction of a nanosecond. Nothing was translated into decimal on the way. The machine adds in its own dress because its logic and its switches speak that dress natively.' },
    { kind: 'para', text: 'And you own a binary machine of your own — two of them, at the ends of your arms. Call the thumb the units finger and work leftward: five fingers, five bits, place values 16, 8, 4, 2, 1. A raised finger is a 1, a folded finger a 0, and one hand is a five-bit register naming $32$ states — every value from 0 (all folded) to 31 (all raised, $11111$). Two hands name $1{,}024$ states, reaching 1,023. The count that outran the decimal finger-counter — anything past ten — sits comfortably inside a single hand, and the exercise set asks you to wear the number 19 there.' },
    { kind: 'example', title: 'Thirteen on one hand', steps: [
      'Call the thumb the units and work left: the five places are worth 16, 8, 4, 2, 1.',
      'Split 13 by places: $13 = 8 + 4 + 1$, so the bits are 0, 1, 1, 0, 1.',
      'So, stand up the 8, 4 and 1 fingers; fold the 16 and 2 fingers.',
      'Check: the raised pattern reads $01101_2 = 8 + 4 + 1 = 13$.',
      'Hence one hand is a five-bit register — thirty-two states without a single wire.',
    ] },

    // ================================================================
    // 8. DOORSTEPS — THE CHAPTER CLOSES
    // ================================================================
    { kind: 'heading', text: 'Doorsteps: Where This Ground Is Owned' },
    { kind: 'para', text: 'This seat was the synthesis, and synthesis knows its borders. Three doorsteps stand at the end of it. The book Arithmetic and Number Systems owns the full theory of positional systems — bases and their arithmetic, divisibility, the measurement of numbers — everything this chapter borrowed as a working tool. The book Digital Logic Design owns the gate-level ground we have named and never entered: adders built from gates, the half-adder and its extensions, complement arithmetic, the flags a register raises. And within this chapter, the review lesson 3.R gathers every seat — the dresses of 3.2, the pictures of 3.4 and 3.5, the crafts of 3.6 and 3.7, and this synthesis — into one revisable whole. If you leave lesson 3.8 with the two systems feeling like one machine and binary arithmetic feeling like ordinary arithmetic on busier wheels, you leave holding everything this seat was built to give.' },
    { kind: 'callout', tone: 'exam', title: 'The examination corner — exam-style asks, honestly labelled', text: 'We describe the SHAPE of the questions this lesson trains you for; we do not quote real papers. Banking and SSC computer-awareness benches ask the direct census questions: how many bits a given decimal value needs (a million: 20), which numeral follows 1011 (1100), what 10001 names in decimal (17), and the range of an n-bit register (five bits: 0 through 31). School boards ask the small computations: add two four-bit numerals with every carry shown, subtract with the borrow marked, double a numeral by appending a zero and state the new value. Cambridge 9618-style asks attach the reason to the fact: why binary suits hardware (two states, noise), why the digit counts differ (about 3.32 bits per decimal digit), and why multiplication reduces to shifts and adds. In every case the marks live in the working — show the carries, show the borrow, and check in decimal before you write the final line.' },
    { kind: 'terms', items: [
      { term: 'positional notation', def: 'the scheme in which each digit of a numeral contributes its value times a fixed power of a base, the power fixed by the digit’s place alone; the value of the numeral is the sum of these contributions.' },
      { term: 'base (radix)', def: 'the count of symbols in a numeral system’s alphabet; also the number whose powers form the place ladder. Base 10 uses ten digits, base 2 uses two.' },
      { term: 'odometer principle', def: 'when a column fills, it rolls: the digit returns to 0 and one is carried into the next column left. The principle is base-blind — only the wheel size changes with the base.' },
      { term: 'carry', def: 'the 1 pushed leftward when a column’s sum reaches or passes the base; in binary addition it is generated by the line 1 + 1 = 10 and its three-input form 1 + 1 + 1 = 11.' },
      { term: 'borrow', def: 'the 1 taken from the next column left when a subtraction cannot pay; it arrives worth the base — worth 2 in binary — because it comes from the next place up.' },
      { term: 'ripple-carry addition', def: 'column-by-column addition in which each carry travels left immediately and may trigger further carries; the cascade 111 + 1 = 1000 ripples three columns from a single click.' },
      { term: 'left shift', def: 'appending zeros on the right of a binary numeral, moving every digit into the next place up; one zero doubles the value, and k zeros multiply it by 2 to the k.' },
      { term: 'half-adder', def: 'the logic pairing that adds two bits: the sum bit is XOR, the carry bit is AND. Two-valued logic doing arithmetic; the seed of all adder circuits.' },
      { term: 'two’s complement', def: 'the fixed-width convention that reassigns the patterns of a register so that some name negative values — eight columns name -128 through +127 — letting one adder serve both addition and subtraction; the theory belongs to Digital Logic Design.' },
    ] },
    { kind: 'formula', name: 'Positional value', latex: 'V = \\sum_{i=0}^{m} d_i\\, b^i', note: 'one machine, many alphabets: read each digit, multiply by its place, add.' },
    { kind: 'formula', name: 'Largest n-digit numeral in base b', latex: 'b^n - 1', note: 'all-nines in decimal, all-ones in binary: 999 = 10^3 - 1, and 111 in base 2 = 2^3 - 1 = 7.' },
    { kind: 'formula', name: 'The shift-double law', latex: '(N \\text{ shifted left by } k) = N \\cdot 2^k', note: 'appending k zeros multiplies by 2 to the k: 1101 is 13, so 11010 is 26 and 110100 is 52.' },
    { kind: 'formula', name: 'The digit trade', latex: '\\text{bits per decimal digit} = \\log_2 10 \\approx 3.32', note: 'about three and a third: a million wears 7 digits or 20 bits; a billion wears 10 or 30.' },

    // ================================================================
    // 9. CHECK YOURSELF (quiz) + THE EXERCISE FLOOR
    // ================================================================
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'In binary, what is 1011 + 110?', options: ['10001', '10010', '1111', '10101'], answer: 0, explain: 'Work from the units: 1 + 0 = 1; then 1 + 1 = 10, write 0 and carry 1; then 0 + 1 + 1 = 10, write 0 and carry 1; then 1 + 1 = 10 again, write 0 and carry 1; the last carry lands in the sixteens column. So the sum is 10001. Check in decimal: 11 + 6 = 17, and 10001 = 16 + 1 = 17. The distractor 10010 is 18, which would be 11 + 7; 1111 is only 15, the sum you get by forgetting every carry; 10101 is 21, which is 11 + 10 — a misread of the second numeral as 1010.' },
      { q: 'The numeral 1000 in binary dress names which value?', options: ['one thousand', 'sixteen', 'eight', 'two'], answer: 2, explain: 'Say the places, not the digits: 1000 in base 2 has a 1 in the eights column and zeros elsewhere, so it names eight — the value the counting strip reaches just after 111, the all-ones roll. Reading it as one thousand is the dress slip this lesson warned about: treating a binary numeral as though it were decimal. Sixteen would be 10000, one column further left, the value the strip reaches at count 16. Two is 10 in binary — the first roll of all.' },
      { q: 'What is 1010 - 110 in binary?', options: ['110', '100', '11', '1000'], answer: 1, explain: 'Line up the columns: units 0 - 0 = 0; twos 1 - 1 = 0; fours 0 - 1 cannot pay, so borrow from the eights — the fours column now holds two, and 2 - 1 = 1. The difference is 100. Check by re-adding: 100 + 110 = 1010, and in decimal 4 + 6 = 10. The distractor 110 is six, the result of forgetting the borrow entirely; 11 is three, what column-by-column subtraction without any borrowing gives; 1000 is eight, which is larger than the minuend itself and cannot be a difference of these two.' },
      { q: 'Appending one zero to the right of the numeral 1101 does what?', options: ['halves the value', 'adds one to the value', 'leaves the value unchanged', 'doubles the value: 11010, which is 26'], answer: 3, explain: 'The shift-double law: appending a zero moves every digit one place left, from a column worth 2 to the power i into the column worth 2 to the power i plus 1, so every contribution doubles and the total doubles — 1101 is 13 and 11010 is 26. Halving is what REMOVING a trailing zero does, giving 110 = 6. Adding one would give 1110 = 14, a different operation altogether. And the value certainly does not stand still: 13 cannot survive a shift untouched, because place is half of the meaning of a digit.' },
      { q: 'Used as a five-bit register, one hand can name how many states?', options: ['32 states, from 0 through 31', '25 states', '10 states', '31 states'], answer: 0, explain: 'Five fingers, five bits: 2 to the 5 is 32 patterns, naming every value from 0 (all fingers folded) to 31 (all fingers raised, the pattern 11111). The census counts PATTERNS, not the largest value — 31 is the top of the range, but the count of states is 32, the classic off-by-one that the all-ones roll explains: 11111 plus 1 opens a whole new column. The answer 25 would be five fingers each worth five — a base-5 misreading. The answer 10 counts the fingers themselves, not the patterns they can hold.' },
    ] },

    { kind: 'exercises', title: 'The exercise floor', sets: [
      { level: 'L1', questions: [
        { q: 'Count from zero to eight in binary, writing every numeral, and say at which counts the binary row opens a new column.', solution: [
          'Run the odometer from 0: the units wheel alternates 0, 1 and rolls every second click.',
          'So, the numerals are 0, 1, 10, 11, 100, 101, 110, 111, 1000.',
          'New columns open when every existing wheel reads 1 and one more click arrives: at 2, at 4 and at 8.',
          'Check the last: count 7 is 111, all wheels full; one click rolls all three and opens the fourth — 1000.',
        ], answer: '0, 1, 10, 11, 100, 101, 110, 111, 1000; new columns open at 2, 4 and 8.', figures: [
          { caption: 'The exercise strip 0 to 8: decimal on top, binary below, with the three roll moments marked — the same odometer the lesson ran to ten, stopping one count short.', svg: cf38StripSvg({
            W: 560,
            title: 'the exercise strip: 0 to 8, side by side',
            subtitle: 'decimal on top, binary below - mark the rolls',
            to: 8,
            marks: [2, 4, 8],
            decMark: null,
            note1: 'new columns open at 2, 4 and 8 - the wheels fill and roll',
            note2: 'count 7 is 111, all wheels full; one click rolls all three and opens 1000',
            aria: 'The exercise strip from zero to eight in decimal and binary, side by side. A count row numbered 0 through 8; a base 10 row reading 0, 1, 2, 3, 4, 5, 6, 7, 8; a base 2 row reading 0, 1, 10, 11, 100, 101, 110, 111, 1000 with new-column marks at 2, 4 and 8. A footer strip states the odometer principle: new columns open at 2, 4 and 8.',
          }) },
        ] },
        { q: 'Starting from thirteen (1101), write the binary numerals for fourteen, fifteen and sixteen, showing each click.', solution: [
          'Take thirteen: $1101$.',
          'One click: $1101 + 1 = 1110$ (fourteen) — the units fills and rolls one column.',
          'Next click: $1110 + 1 = 1111$ (fifteen) — a single click, no carry at all.',
          'One more: $1111 + 1 = 10000$ (sixteen) — all four wheels roll at once, four carries, a new column opens.',
          'Check: $14 = 8 + 4 + 2$, $15 = 8 + 4 + 2 + 1$, $16 = 2^4$.',
        ], answer: '1110, 1111, then the all-ones roll to 10000.' },
        { q: 'What value does the binary numeral 10101 name? Show the weights.', solution: [
          'Read the places under the 1-bits: sixteen, four, one.',
          'So, $10101_2 = 16 + 4 + 1 = 21$.',
          'Check the 0-bits too: no eights and no twos — nothing to add.',
        ], answer: '21.' },
        { q: 'Use the self-sum shortcut to find 110 + 110, then check by weights.', solution: [
          'A numeral plus itself doubles: append a 0.',
          'So, $110 + 110 = 1100$.',
          'Check by weights: $1100 = 8 + 4 = 12$, and $6 + 6 = 12$.',
        ], answer: '1100 (= 12).' },
        { q: 'Work 1111 + 1 in columns, counting the carries.', solution: [
          'Units: $1 + 1 = 10$ — write 0, carry 1.',
          'Twos: $1 + 1 = 10$ — write 0, carry 1.',
          'Fours: $1 + 1 = 10$ — write 0, carry 1.',
          'Eights: $1 + 1 = 10$ — write 0, carry 1.',
          'Sixteens: the last carry lands — write 1.',
          'So, $1111 + 1 = 10000$: four carries, one new column.',
          'Check: $15 + 1 = 16 = 2^4$.',
        ], answer: '10000 — the all-ones roll, four carries.' },
        { q: 'Write the largest four-column numeral of each base and give its value: decimal and binary.', solution: [
          'The largest numeral fills every column with its top digit: 9999 in decimal, 1111 in binary.',
          'So, each is "all the nines" — the base minus 1 in every column.',
          'Values: 9999 is ten thousand minus one; $1111_2 = 8 + 4 + 2 + 1 = 15 = 2^4 - 1$.',
          'Hence the shared law: the largest n-digit numeral of a base is the base to the n, minus 1.',
        ], answer: '9999 (worth 9,999) and 1111 in base 2 (worth 15); both are b to the fourth minus 1.' },
      ] },
      { level: 'L2', questions: [
        { q: 'Work 1011 + 111 in columns and check in decimal.', solution: [
          'Units: $1 + 1 = 10$ — write 0, carry 1.',
          'Twos: $1 + 1 + 1 = 11$ — write 1, carry 1.',
          'Fours: $0 + 1 + 1 = 10$ — write 0, carry 1.',
          'Eights: $1 + 1 + 1 = 11$ — write 1, carry 1.',
          'Sixteens: the carry lands — write 1.',
          'So, $1011 + 111 = 10010$.',
          'Check: $11 + 7 = 18 = 16 + 2$, and $10010_2 = 18$.',
        ], answer: '10010 (= 18).' },
        { q: 'Work 1101 + 1011 in columns, counting the carries, and check in decimal.', solution: [
          'Units: $1 + 1 = 10$ — write 0, carry 1.',
          'Twos: $0 + 1 + 1 = 10$ — write 0, carry 1.',
          'Fours: $1 + 0 + 1 = 10$ — write 0, carry 1.',
          'Eights: $1 + 1 + 1 = 11$ — write 1, carry 1.',
          'Sixteens: the carry lands — write 1.',
          'So, $1101 + 1011 = 11000$ — every column rolled.',
          'Check: $13 + 11 = 24 = 16 + 8$, and $11000_2 = 24$.',
        ], answer: '11000 (= 24), four carries.', figures: [
          { caption: 'The addition grid for this solution: 1101 above 1011 over places 16, 8, 4, 2, 1, carry marks on four columns, and the sum 11000 below the rule — each carry feeding the next column.', svg: cf38AddGridSvg() },
        ] },
        { q: 'Work 1001 - 110 in columns, marking the borrows, and audit by re-adding.', solution: [
          'Units: $1 - 0 = 1$ — write 1.',
          'Twos: $0 - 1$ cannot pay — borrow from the fours: the twos holds 2, the fours becomes 0.',
          'Now, $2 - 1 = 1$ — write 1.',
          'Fours: $0 - 1$ cannot pay — borrow from the eights: the fours holds 2, the eights becomes 0.',
          'Now, $2 - 1 = 1$ — write 1; eights: $0 - 0 = 0$.',
          'So, $1001 - 110 = 11$.',
          'Check by re-adding: $11 + 110 = 1001$, and $3 + 6 = 9$.',
        ], answer: '11 (= 3), two borrows.' },
        { q: 'Work 100000 - 1, narrating the borrow chain column by column, and check in decimal.', solution: [
          'Units: $0 - 1$ cannot pay — and the twos, fours, eights and sixteens columns all hold 0 and cannot lend.',
          'So, the borrow travels left five columns to the thirty-twos, which holds 1 and pays.',
          'Every passed-through column gains 2, gives 1 away and keeps 1; the units receives 2 and pays its debt: $2 - 1 = 1$.',
          'So, $100000 - 1 = 11111$ — five ones, one per column the chain touched.',
          'Check: $32 - 1 = 31 = 16 + 8 + 4 + 2 + 1$, and $11111_2 = 31$.',
        ], answer: '11111 (= 31), one five-column borrow chain.', figures: [
          { caption: 'The borrow chain for this solution: the numeral 100000 over places 32 down to 1, the travelling borrow arcing from the units to the thirty-twos, chevrons in every gap, and the after-row 011111 — each passed-through column ending as 1.', svg: cf38BorrowSvg() },
        ] },
        { q: 'Wear the register: show nineteen on one hand (thumb = units), and state the full range of one hand and of two.', solution: [
          'Call the thumb the units: the five places are worth 16, 8, 4, 2, 1.',
          'Split 19 by places: $19 = 16 + 2 + 1$, so the bits are 1, 0, 0, 1, 1.',
          'So, stand up the 16, 2 and 1 fingers; fold the 8 and 4 fingers — the pattern 10011.',
          'Range: five bits name 32 states, zero through 31; two hands name $1{,}024$ states, reaching 1,023.',
        ], answer: '10011; one hand spans 0 to 31, two hands span 0 to 1,023.', figures: [
          { caption: 'Nineteen on one hand for this solution: five finger-bars over places 16, 8, 4, 2, 1 with the 16, 2 and 1 bars up and the 8 and 4 bars down, bit row 10011 beneath.', svg: cf38HandSvg() },
        ] },
      ] },
      { level: 'L3', questions: [
        { q: 'Multiply 110 x 101 by shifts and adds, showing every partial row, and check in decimal.', solution: [
          'Split the multiplier by bits: $101 = 100 + 1$.',
          'Units bit (a 1): copy $110$ unshifted — worth 6.',
          'Twos bit (a 0): skip the row — a 0-bit contributes nothing.',
          'Fours bit (a 1): copy $110$ shifted two places — $11000$, worth 24.',
          'Add the partials: $110 + 11000 = 11110$.',
          'Check: $6 + 24 = 30 = 16 + 8 + 4 + 2$, and $6 \\times 5 = 30$.',
        ], answer: '11110 (= 30).', figures: [
          { caption: 'The shift-and-add grid for this solution: 110 times 101 over places 16 down to 1, partial rows 110 (worth 6), a dim skipped row of zeros, and 11000 (worth 24), summing to 11110 (worth 30).', svg: cf38ShiftAddSvg() },
        ] },
        { q: 'Multiply 1011 x 101 by shifts and adds and check by weights.', solution: [
          'Split the multiplier: $101 = 100 + 1$.',
          'Units bit: copy $1011$ unshifted — worth 11.',
          'Twos bit: a 0 — no row.',
          'Fours bit: copy $1011$ shifted two places — $101100$, worth 44.',
          'Add the partials: $1011 + 101100 = 110111$.',
          'Check: $11 + 44 = 55$, and $110111 = 32 + 16 + 4 + 2 + 1 = 55$.',
        ], answer: '110111 (= 55).' },
        { q: 'Scale 1011 by 8 using shifts only, giving each intermediate value, and check the last by weights.', solution: [
          'Scaling by 8 is scaling by $2^3$ — three doublings.',
          'So, append three zeros one at a time: $1011 \\to 10110 \\to 101100 \\to 1011000$.',
          'Values along the ladder: $22$, then $44$, then $88$ — each rung doubles.',
          'Check the last by weights: $1011000 = 64 + 16 + 8 = 88$, and $11 \\times 8 = 88$.',
        ], answer: '1011000 (= 88).' },
        { q: 'Exam-style census: state the decimal digit count and the bit count for one million and for one billion, and quote the exchange rate that connects them.', solution: [
          'A million: 7 decimal digits, since $999{,}999$ is the largest six-digit value.',
          'On the binary side, $2^{19} = 524{,}288$ falls short and $2^{20} = 1{,}048{,}576$ reaches, so 20 bits.',
          'A billion: 10 decimal digits; and $2^{29} = 536{,}870{,}912$ falls short while $2^{30} = 1{,}073{,}741{,}824$ reaches, so 30 bits.',
          'So, the exchange rate: $\\log_2 10 \\approx 3.32$ bits per decimal digit — about three and a third.',
          'Check: six decades at the rate give $19.9$, rounding up to the 20 found; nine decades give $29.9$, rounding up to 30.',
        ], answer: 'million: 7 digits vs 20 bits; billion: 10 digits vs 30 bits; the trade is log2 10, about 3.32 bits per decimal digit.' },
      ] },
    ] },
  ],
}

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
const c3R = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f3R = 'ui-sans-serif, system-ui, sans-serif'

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
  s.push(`<g font-family="${f3R}">`)
  s.push(cf3RTxt(W / 2, 26, 13, c3R.teal, 'chapter 3 in one map - a keystroke becomes a compressed file', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 10, c3R.tealInk, 'the artifact changes hands at every arrow; the eight lessons own the changes'))

  nodes.forEach((nd, i) => {
    const x = M + i * (nodeW + gap)
    const cx = x + nodeW / 2
    s.push(cf3RBox(x, railY, nodeW, nodeH, i % 2 === 0 ? c3R.white : c3R.paper, c3R.struct))
    s.push(cf3RTxt(cx, railY + 20, 12.5, c3R.ink, nd.top, 'bold'))
    s.push(cf3RTxt(cx, railY + 36, 9.5, c3R.tealInk, nd.sub))
    if (i < 4) s.push(cf3RArrow(x + nodeW + 2, railMid, x + nodeW + gap - 2, railMid, c3R.mid, 2.2))
    // the lesson chip directly beneath its artifact
    s.push(cf3RBox(x, chipY, nodeW, chipH, c3R.panelA, c3R.accent, 8))
    s.push(cf3RTxt(cx, chipY + 14, 9.5, c3R.ink, chips[i].n, 'bold'))
    s.push(cf3RTxt(cx, chipY + 27, 9, c3R.tealInk, chips[i].t))
    // drop a small tie from node to chip
    s.push(`<line x1="${cx}" y1="${railY + nodeH}" x2="${cx}" y2="${chipY}" stroke="${c3R.accent}" stroke-width="1.6"/>`)
  })

  // the divider
  s.push(`<line x1="${M}" y1="${chipY + chipH + 14}" x2="${W - M}" y2="${chipY + chipH + 14}" stroke="${c3R.faint}" stroke-width="2" stroke-dasharray="7 5"/>`)

  // the craft panel: decimal and binary, joined both ways, 3.8 between
  const lx = M
  const rx = W - M - leftW
  s.push(cf3RBox(lx, craftY, leftW, craftH, c3R.white, c3R.teal))
  s.push(cf3RTxt(lx + leftW / 2, craftY + 22, 13, c3R.ink, 'decimal', 'bold'))
  s.push(cf3RTxt(lx + leftW / 2, craftY + 41, 9.5, c3R.tealInk, 'the human\u2019s ten symbols'))
  s.push(cf3RBox(rx, craftY, leftW, craftH, c3R.white, c3R.teal))
  s.push(cf3RTxt(rx + leftW / 2, craftY + 22, 13, c3R.ink, 'binary', 'bold'))
  s.push(cf3RTxt(rx + leftW / 2, craftY + 41, 9.5, c3R.tealInk, 'the machine\u2019s two symbols'))

  const ax1 = lx + leftW + 6
  const ax2 = rx - 6
  const arcTop = `M ${ax1} ${craftY + 8} Q ${(ax1 + ax2) / 2} ${craftY - 34} ${ax2} ${craftY + 8}`
  s.push(`<path d="${arcTop}" fill="none" stroke="${c3R.conn}" stroke-width="2.4"/>`)
  s.push(`<polygon points="${ax2 + 2},${craftY + 8} ${ax2 - 8},${craftY + 3} ${ax2 - 6},${craftY + 13}" fill="${c3R.conn}"/>`)
  s.push(cf3RTxt((ax1 + ax2) / 2, craftY - 22, 10, c3R.conn, '3.6 the road down: the division ladder', 'bold'))
  const arcBot = `M ${ax2} ${craftY + craftH - 8} Q ${(ax1 + ax2) / 2} ${craftY + craftH + 34} ${ax1} ${craftY + craftH - 8}`
  s.push(`<path d="${arcBot}" fill="none" stroke="${c3R.teal}" stroke-width="2.4"/>`)
  s.push(`<polygon points="${ax1 - 2},${craftY + craftH - 8} ${ax1 + 8},${craftY + craftH - 3} ${ax1 + 6},${craftY + craftH - 13}" fill="${c3R.teal}"/>`)
  s.push(cf3RTxt((ax1 + ax2) / 2, craftY + craftH + 26, 10, c3R.tealInk, '3.7 the road up: the weight sum and the doubling ladder', 'bold'))

  const chip8W = 150
  const chip8X = W / 2 - chip8W / 2
  const chip8Y = craftY + 18
  s.push(cf3RBox(chip8X, chip8Y, chip8W, 30, c3R.panelB, c3R.mid, 8))
  s.push(cf3RTxt(W / 2, chip8Y + 13, 9.5, c3R.ink, '3.8 the synthesis', 'bold'))
  s.push(cf3RTxt(W / 2, chip8Y + 25, 9, c3R.tealInk, 'one idea, two alphabets'))

  // the closing strip
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, c3R.paper, c3R.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 20, 10.5, c3R.ink, 'this chapter gave the machine its LANGUAGE - chapter 4 asks how the box SPEAKS it', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 38, 9.5, c3R.tealInk, 'bits to dresses to meanings to rates to packing - with two roads between the human and the machine'))
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
  s.push(`<g font-family="${f3R}">`)
  s.push(cf3RTxt(W / 2, 26, 13, c3R.teal, 'the harvest ladder - the powers thread the whole chapter leans on', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 10, c3R.tealInk, 'every rung doubles the census: four pinned powers, four witnesses'))
  // the baseline
  s.push(`<line x1="${M}" y1="${baseY}" x2="${W - M}" y2="${baseY}" stroke="${c3R.ink}" stroke-width="2"/>`)
  bars.forEach((b, i) => {
    const x = x0 + i * (colW + gap)
    const top = baseY - b.h
    s.push(cf3RBox(x, top, colW, b.h, i % 2 === 0 ? c3R.panelA : c3R.panelB, c3R.struct, 6))
    s.push(cf3RTxt(x + colW / 2, top - 10, 12.5, c3R.teal, b.ex, 'bold'))
    s.push(cf3RTxt(x + colW / 2, top + b.h / 2 + 7, 19, c3R.ink, b.val, 'bold'))
    s.push(cf3RTxt(x + colW / 2, baseY + 22, 10, c3R.ink, b.w1, 'bold'))
    s.push(cf3RTxt(x + colW / 2, baseY + 38, 9.5, c3R.tealInk, b.w2))
  })
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, c3R.paper, c3R.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 22, 10.5, c3R.ink, 'one MiB = 1,048,576 B > 1,000,000: twenty yes/no questions sort a million-item catalogue', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 42, 9.5, c3R.tealInk, 'the honest ladder to 2 dp: KiB +2.40%, MiB +4.86%, GiB +7.37%, TiB +9.95% over the decimal rivals'))
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
  s.push(`<g font-family="${f3R}">`)
  s.push(cf3RTxt(W / 2, 26, 13, c3R.teal, 'the rate thread - from a CD\u2019s byte rate to an MP3\u2019s saving', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 10, c3R.tealInk, 'one multiplication and two divisions: the whole of lesson 3.4 and lesson 3.5\u2019s headline'))
  boxes.forEach((b, i) => {
    const x = M + i * (boxW + gap)
    s.push(cf3RBox(x, boxY, boxW, boxH, i === 1 ? c3R.panelB : c3R.white, c3R.struct))
    s.push(cf3RTxt(x + boxW / 2, boxY + 18, 11.5, c3R.ink, b.l1, 'bold'))
    s.push(cf3RTxt(x + boxW / 2, boxY + 38, 10, c3R.tealInk, b.l2))
    s.push(cf3RTxt(x + boxW / 2, boxY + 58, 11.5, c3R.accent, b.l3, 'bold'))
    if (i < 2) {
      const midY = boxY + boxH / 2
      s.push(cf3RArrow(x + boxW + 3, midY, x + boxW + gap - 3, midY, c3R.conn, 2.4))
      s.push(cf3RTxt(x + boxW + gap / 2, midY - 10, 10.5, c3R.conn, i === 0 ? '\u00d7 8' : '\u00f7 128,000', 'bold'))
      s.push(cf3RTxt(x + boxW + gap / 2, midY + 18, 9, c3R.tealInk, i === 0 ? 'bits per byte' : 'the MP3 rate'))
    }
  })
  s.push(cf3RTxt(W / 2, noteY, 9.5, c3R.tealInk, 'the rate\u2019s own story: 44,100 = 294 \u00d7 50 \u00d7 3 (lines per picture \u00d7 pictures per second \u00d7 the three NTSC colour channels) - and \u00f7 320,000 = 4.41x at MP3\u2019s top rate'))
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, c3R.paper, c3R.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 24, 10.5, c3R.ink, '74 minutes of CD stereo = 4,440 s \u00d7 176,400 B/s = 783,216,000 B = 746.9330 MiB', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 46, 9.5, c3R.tealInk, 'one 1080p RGB frame = 1920 \u00d7 1080 \u00d7 3 B = 6,220,800 B - the firehose that compression answers'))
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
  s.push(`<g font-family="${f3R}">`)
  s.push(cf3RTxt(W / 2, 26, 13, c3R.teal, 'the 45 witness - one value, four dresses, the chapter\u2019s souvenir', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 10, c3R.tealInk, 'every dress re-reads the same positional sum; nothing about the value changes'))
  pans.forEach((p, i) => {
    const x = M + i * (panW + gap)
    s.push(cf3RBox(x, panY, panW, panH, i % 2 === 0 ? c3R.white : c3R.paper, c3R.struct))
    s.push(cf3RTxt(x + panW / 2, panY + 22, 10.5, c3R.tealInk, p.base, 'bold'))
    s.push(cf3RTxt(x + panW / 2, panY + 56, 24, c3R.ink, p.num, 'bold'))
    s.push(cf3RTxt(x + panW / 2, panY + 82, 9.5, c3R.tealInk, p.w))
    s.push(cf3RTxt(x + panW / 2, panY + 100, 10.5, c3R.accent, p.eq, 'bold'))
  })
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, c3R.panelA, c3R.accent, 8))
  s.push(cf3RTxt(W / 2, stripY + 19, 10.5, c3R.ink, 'the grouping law: one octal digit = 3 bits, one hex digit = 4 bits', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 37, 9.5, c3R.tealInk, '2D spreads to 0010 1101 - the same six bits, regrouped; 101101 groups in threes to 55'))
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
  s.push(`<g font-family="${f3R}">`)
  s.push(cf3RTxt(W / 2, 30, 12.5, c3R.teal, 'the 45 ladder - six rungs, read bottom-up', 'bold'))
  s.push(cf3RTxt(W / 2, 48, 9.5, c3R.tealInk, 'divide by 2, keep the remainder, repeat on the quotient until it reaches 0'))
  s.push(cf3RTxt(boxX + boxW / 2, 62, 9.5, c3R.tealInk, 'the rungs'))
  s.push(cf3RTxt(badgeX, 62, 9.5, c3R.tealInk, 'remainders'))
  rows.forEach((rw, k) => {
    const by = topY + k * (rowH + gap)
    const cy = by + rowH / 2
    s.push(cf3RBox(boxX, by, boxW, rowH, c3R.white, c3R.struct, 8))
    s.push(cf3RTxt(boxX + boxW / 2, cy + 5, 13.5, c3R.ink, `${rw.n} \u00f7 2 = ${rw.q}`))
    s.push(`<circle cx="${badgeX}" cy="${cy}" r="${badgeR}" fill="${rw.r === 0 ? c3R.white : c3R.panelA}" stroke="${rw.r === 0 ? c3R.teal : c3R.accent}" stroke-width="2"/>`)
    s.push(cf3RTxt(badgeX, cy + 5.5, 14, c3R.ink, String(rw.r), 'bold'))
    if (k < n - 1) {
      const ax = boxX + boxW / 2
      s.push(cf3RArrow(ax, by + rowH + 1, ax, by + rowH + gap - 1, c3R.mid, 1.8))
    }
  })
  s.push(cf3RArrow(readX, lastCy, readX, firstCy - 6, c3R.conn, 2.4))
  const midY = (firstCy + lastCy) / 2
  s.push(`<text x="${labelX}" y="${midY}" transform="rotate(-90 ${labelX} ${midY})" text-anchor="middle" font-size="9.5" fill="${c3R.tealInk}">read bottom-up</text>`)
  s.push(cf3RBox(ansX, topY, ansW, 56, c3R.panelB, c3R.mid, 12))
  s.push(cf3RTxt(ansX + ansW / 2, topY + 22, 10, c3R.tealInk, '45 in base 2'))
  s.push(cf3RTxt(ansX + ansW / 2, topY + 45, 19, c3R.ink, '101101', 'bold'))
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, c3R.paper, c3R.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 21, 11, c3R.ink, 'check by weights: 101101 = 32 + 8 + 4 + 1 = 45', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 40, 9.5, c3R.tealInk, 'six rungs = six bits; the first remainder is the units bit, the last is the leading bit'))
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
  s.push(`<g font-family="${f3R}">`)
  s.push(cf3RTxt(W / 2, 28, 12.5, c3R.teal, 'the Huffman tree for {A:5, B:2, C:1, D:1} - depths 1, 2, 3, 3', 'bold'))
  edges.forEach((e) => {
    s.push(`<line x1="${e.a.x}" y1="${e.a.y}" x2="${e.b.x}" y2="${e.b.y}" stroke="${c3R.mid}" stroke-width="2"/>`)
    const lx = (e.a.x + e.b.x) / 2 + (e.lab === '0' ? -12 : 12)
    const ly = (e.a.y + e.b.y) / 2 + 4
    s.push(cf3RTxt(lx, ly, 11, c3R.conn, e.lab, 'bold'))
  })
  const leaf = (nd: { x: number; y: number; w: string }, letter: string) => {
    s.push(`<circle cx="${nd.x}" cy="${nd.y}" r="${R}" fill="${c3R.white}" stroke="${c3R.struct}" stroke-width="2.4"/>`)
    s.push(cf3RTxt(nd.x, nd.y + 5, 12.5, c3R.ink, nd.w, 'bold'))
    s.push(cf3RTxt(nd.x, nd.y + R + 15, 12, c3R.accent, letter, 'bold'))
  }
  const inner = (nd: { x: number; y: number; w: string }) => {
    s.push(`<circle cx="${nd.x}" cy="${nd.y}" r="${R}" fill="${c3R.panelB}" stroke="${c3R.mid}" stroke-width="2.4"/>`)
    s.push(cf3RTxt(nd.x, nd.y + 5, 12.5, c3R.ink, nd.w, 'bold'))
  }
  inner(nodes.root)
  inner(nodes.BCD)
  inner(nodes.CD)
  leaf(nodes.A, 'A')
  leaf(nodes.B, 'B')
  leaf(nodes.C, 'C')
  leaf(nodes.D, 'D')
  s.push(cf3RTxt(nodes.root.x, nodes.root.y - R - 8, 9.5, c3R.tealInk, 'the root: weight 9'))

  s.push(cf3RBox(panelX, panelY, panelW, panelH, c3R.paper, c3R.faint, 10))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 22, 11, c3R.ink, 'the code, read off the tree', 'bold'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 46, 11, c3R.ink, 'A = 0 (1 bit)'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 66, 11, c3R.ink, 'B = 10 (2 bits)'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 86, 11, c3R.ink, 'C = 110 (3 bits)'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 106, 11, c3R.ink, 'D = 111 (3 bits)'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 132, 10, c3R.tealInk, 'AAAAABBCD = 000001010110111'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 152, 10, c3R.tealInk, '5\u00d71 + 2\u00d72 + 1\u00d73 + 1\u00d73 = 15 bits'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 172, 10, c3R.tealInk, 'the fixed 2-bit code: 9 \u00d7 2 = 18 bits'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 192, 10, c3R.accent, 'the saving: 3 bits = 16.67%', 'bold'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 212, 10, c3R.accent, 'the ratio: 18/15 = 1.2x', 'bold'))
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, c3R.panelA, c3R.accent, 8))
  s.push(cf3RTxt(W / 2, stripY + 21, 11, c3R.ink, 'the entropy floor: H = 1.6577427 bits/symbol; the code averages 15/9 = 1.6667', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 40, 9.5, c3R.tealInk, 'no prefix of any code word is another code word - the tree guarantees it, so decoding never hesitates'))
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
  s.push(`<g font-family="${f3R}">`)
  s.push(cf3RTxt(W / 2, 26, 12.5, c3R.teal, 'the 90-second census - a stereo CD clip, priced honestly', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 9.5, c3R.tealInk, 'the rate law, then the clock, then the honest binary units'))
  boxes.forEach((b, i) => {
    const x = M + i * (boxW + gap)
    s.push(cf3RBox(x, boxY, boxW, boxH, i === 2 ? c3R.panelB : c3R.white, c3R.struct))
    s.push(cf3RTxt(x + boxW / 2, boxY + 19, 11.5, c3R.ink, b.l1, 'bold'))
    s.push(cf3RTxt(x + boxW / 2, boxY + 40, 10, c3R.tealInk, b.l2))
    s.push(cf3RTxt(x + boxW / 2, boxY + 61, 11.5, c3R.accent, b.l3, 'bold'))
    if (i < 2) {
      const midY = boxY + boxH / 2
      s.push(cf3RArrow(x + boxW + 3, midY, x + boxW + gap - 3, midY, c3R.conn, 2.4))
      s.push(cf3RTxt(x + boxW + gap / 2, midY - 10, 10.5, c3R.conn, i === 0 ? '\u00d7 90' : '\u00f7 2^20', 'bold'))
      s.push(cf3RTxt(x + boxW + gap / 2, midY + 18, 9, c3R.tealInk, i === 0 ? 'the clip length' : 'one MiB'))
    }
  })
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, c3R.paper, c3R.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 24, 10.5, c3R.ink, 'exactly 15.140533447265625 MiB, printed to 4 dp as 15.1405 - the decimal mega (10^6 B) is the wrong unit', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 46, 9.5, c3R.tealInk, 'one minute would be 10,584,000 B; ninety seconds is one-and-a-half of those, and the arithmetic shows it'))
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
  s.push(`<g font-family="${f3R}">`)
  s.push(cf3RTxt(W / 2, 26, 12.5, c3R.teal, 'the 2026 witness - eleven bits, regrouped two ways', 'bold'))
  s.push(cf3RTxt(W / 2, 46, 9.5, c3R.tealInk, 'grouping is re-bracketing: fours for hexadecimal, threes for octal'))
  for (let i = 0; i < bits.length; i++) {
    s.push(cf3RBox(cellX(i), cellY, cw, cellH, c3R.white, c3R.struct, 6))
    s.push(cf3RTxt(cellX(i) + cw / 2, cellY + 25, 15, c3R.ink, bits[i], 'bold'))
  }
  // hex brackets
  hexGroups.forEach((g) => {
    const gx = cellX(g.from)
    const gw = cellX(g.to) + cw - gx
    s.push(`<path d="M ${gx} ${cellY + cellH + 4} v 6 h ${gw} v -6" fill="none" stroke="${c3R.conn}" stroke-width="2"/>`)
    s.push(cf3RTxt(gx + gw / 2, cellY + cellH + 28, 10, c3R.conn, g.lab, 'bold'))
  })
  s.push(cf3RTxt(x0 + (cellsEnd - x0) / 2, cellY + cellH + 48, 11, c3R.ink, 'read left to right: 7 EA \u2192 7EA in base 16', 'bold'))
  // octal brackets
  const octY = cellY + cellH + 66
  octGroups.forEach((g) => {
    const gx = cellX(g.from)
    const gw = cellX(g.to) + cw - gx
    s.push(`<path d="M ${gx} ${octY + 4} v 6 h ${gw} v -6" fill="none" stroke="${c3R.teal}" stroke-width="2"/>`)
    s.push(cf3RTxt(gx + gw / 2, octY + 28, 10, c3R.tealInk, g.lab, 'bold'))
  })
  s.push(cf3RTxt(x0 + (cellsEnd - x0) / 2, octY + 48, 11, c3R.ink, 'read left to right: 3752 in base 8', 'bold'))
  // the weight panel
  s.push(cf3RBox(panelX, panelY, panelW, panelH, c3R.paper, c3R.faint, 10))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 24, 11, c3R.ink, 'the weight check', 'bold'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 48, 10.5, c3R.tealInk, '1024 + 512 + 256 + 128'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 66, 10.5, c3R.tealInk, '+ 64 + 32 + 8 + 2 = 2026'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 92, 10.5, c3R.accent, 'the width: 2^10 \u2264 2026 < 2^11', 'bold'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 114, 10, c3R.tealInk, 'eleven bits, exactly as the ladder produced'))
  s.push(cf3RTxt(panelX + panelW / 2, panelY + 136, 10, c3R.tealInk, 'three dresses, one value - the chapter\u2019s method'))
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, c3R.panelA, c3R.accent, 8))
  s.push(cf3RTxt(W / 2, stripY + 20, 11, c3R.ink, 'one bit string, three dresses: 11111101010 (base 2) = 3752 (base 8) = 7EA (base 16)', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 39, 9.5, c3R.tealInk, 'the ladder down, the weights up, the groupings across - every road closes at 2026'))
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
  s.push(`<g font-family="${f3R}">`)
  s.push(cf3RTxt(W / 2, 26, 12.5, c3R.teal, 'the two-lesson chain - a 16-bit colour code, read through two books', 'bold'))
  s.push(cf3RTxt(W / 2, 44, 9.5, c3R.tealInk, 'hexadecimal in (lesson 3.2), decimal channels, then the ASCII table (lesson 3.3)'))
  s.push(cf3RBox(topX, topY, topW, topH, c3R.panelB, c3R.mid, 10))
  s.push(cf3RTxt(W / 2, topY + 18, 10.5, c3R.tealInk, 'the colour code'))
  s.push(cf3RTxt(W / 2, topY + 36, 13, c3R.ink, '4120 in hex', 'bold'))
  s.push(cf3RArrow(W / 2 - 50, topY + topH + 2, lx, byteY - 2, c3R.conn, 2))
  s.push(cf3RArrow(W / 2 + 50, topY + topH + 2, rx, byteY - 2, c3R.conn, 2))
  s.push(cf3RBox(lx - byteW / 2, byteY, byteW, byteH, c3R.white, c3R.struct))
  s.push(cf3RTxt(lx, byteY + 25, 13, c3R.ink, 'byte 41', 'bold'))
  s.push(cf3RBox(rx - byteW / 2, byteY, byteW, byteH, c3R.white, c3R.struct))
  s.push(cf3RTxt(rx, byteY + 25, 13, c3R.ink, 'byte 20', 'bold'))
  s.push(cf3RArrow(lx, byteY + byteH + 2, lx, decY - 2, c3R.mid, 2))
  s.push(cf3RArrow(rx, byteY + byteH + 2, rx, decY - 2, c3R.mid, 2))
  s.push(cf3RBox(lx - decW / 2, decY, decW, decH, c3R.panelA, c3R.accent, 10))
  s.push(cf3RTxt(lx, decY + 27, 11.5, c3R.ink, '4 \u00d7 16 + 1 = 65', 'bold'))
  s.push(cf3RBox(rx - decW / 2, decY, decW, decH, c3R.panelA, c3R.accent, 10))
  s.push(cf3RTxt(rx, decY + 27, 11.5, c3R.ink, '2 \u00d7 16 + 0 = 32', 'bold'))
  s.push(cf3RArrow(lx, decY + decH + 2, lx, meanY - 2, c3R.teal, 2))
  s.push(cf3RArrow(rx, decY + decH + 2, rx, meanY - 2, c3R.teal, 2))
  s.push(cf3RBox(lx - meanW / 2, meanY, meanW, meanH, c3R.white, c3R.teal, 10))
  s.push(cf3RTxt(lx, meanY + 24, 11.5, c3R.ink, 'ASCII 65 = A', 'bold'))
  s.push(cf3RTxt(lx, meanY + 45, 9.5, c3R.tealInk, 'the letter, bit 5 clear'))
  s.push(cf3RBox(rx - meanW / 2, meanY, meanW, meanH, c3R.white, c3R.teal, 10))
  s.push(cf3RTxt(rx, meanY + 24, 11.5, c3R.ink, 'ASCII 32 = space', 'bold'))
  s.push(cf3RTxt(rx, meanY + 45, 9.5, c3R.tealInk, 'and a - A = 32 = bit 5'))
  s.push(cf3RBox(M, stripY, W - 2 * M, stripH, c3R.paper, c3R.faint, 8))
  s.push(cf3RTxt(W / 2, stripY + 20, 10.5, c3R.ink, 'one hex read feeds the code table: 65 is A, 32 is space - and the case gap is exactly the fifth bit', 'bold'))
  s.push(cf3RTxt(W / 2, stripY + 39, 9.5, c3R.tealInk, 'two lessons, one uninterrupted chain - the bench asks you to run it without putting the pencil down'))
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


export const chapter3: Chapter = {
  number: 3,
  slug: 'data-representation-first-meeting',
  title: 'Data Representation: a First Meeting',
  summary:
    'Bits, the binary language, and why two symbols carry everything: the numbering systems census (binary, octal and hexadecimal with the conversion craft), codes (ASCII and its characters, BCD), measuring information (bit, byte, KB to the honest SI ladder), text, images and sound as bits (the multimedia ground), and compression as the packing question (lossless versus lossy — what images and audio actually give up). The full theory hands off to Arithmetic and Number Systems and Digital Logic Design.',
  status: 'complete',
  lessons: [
    lesson31, lesson32, lesson33, lesson34, lesson35,
    lesson36, lesson37, lesson38, lesson3R,
  ],
  plannedLessons: [],
}
