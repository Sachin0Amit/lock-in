/* part-cf42 — lesson 4.2 'The Processor Named Honestly'
   Computer Fundamentals, chapter 4 'Inside the Box'. Seat tag 42. */
import type { Lesson } from '../../../src/data/library/types'

/* palette (vivid set; never blue/indigo) */
const c42 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f42 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order so audits can parse labels */
function cf42T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* round helper for computed trig geometry */
function cf42R(n: number): number {
  return Math.round(n * 10) / 10
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the cycle wheel: fetch, decode, execute, write     */
/* back on a computed circle, ringed by the beating clock ring         */
/* ------------------------------------------------------------------ */
function cf42CycleWheelSvg(): string {
  const W = 720
  const H = 576
  const cx = 360
  const cy = 310
  const R = 130
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f42}" role="img" aria-label="The cycle wheel. Four stage boxes stand on a circle in clockwise order: fetch at the top, decode at the right, execute at the bottom, write back at the left, joined by curved arrows. A dashed clock ring circles them, ticked like a metronome and captioned one beat equals 0.2 ns at 5 GHz. The centre reads: the honest loop, repeated billions of times a second.">`)
  s.push(cf42T(cx, 30, 12, c42.teal, 'middle', 'THE CYCLE WHEEL - FETCH, DECODE, EXECUTE, WRITE BACK', true))
  /* the clock ring: dashed circle plus tick marks every 30 degrees */
  s.push(`<circle cx="${cx}" cy="${cy}" r="206" fill="none" stroke="${c42.conn}" stroke-width="2" stroke-dasharray="6 6"/>`)
  for (let a = 0; a < 360; a += 30) {
    const rad = (a * Math.PI) / 180
    s.push(`<line x1="${cf42R(cx + 198 * Math.cos(rad))}" y1="${cf42R(cy + 198 * Math.sin(rad))}" x2="${cf42R(cx + 206 * Math.cos(rad))}" y2="${cf42R(cy + 206 * Math.sin(rad))}" stroke="${c42.conn}" stroke-width="2"/>`)
  }
  s.push(cf42T(cx, 86, 10, c42.conn, 'middle', 'THE CLOCK RING - one beat = 0.2 ns at 5 GHz', true))
  /* the four stages on the circle */
  const stages = [
    { a: -90, name: 'FETCH', sub: 'the next instruction', col: c42.teal },
    { a: 0, name: 'DECODE', sub: 'what it asks', col: c42.conn },
    { a: 90, name: 'EXECUTE', sub: 'do the work', col: c42.accent },
    { a: 180, name: 'WRITE BACK', sub: 'store the result', col: c42.struct },
  ]
  for (const st of stages) {
    const rad = (st.a * Math.PI) / 180
    const px = cx + R * Math.cos(rad)
    const py = cy + R * Math.sin(rad)
    s.push(`<rect x="${cf42R(px - 65)}" y="${cf42R(py - 23)}" width="130" height="46" rx="8" fill="${c42.white}" stroke="${st.col}" stroke-width="2.5"/>`)
    s.push(cf42T(px, py - 2, 10.5, c42.ink, 'middle', st.name, true))
    s.push(cf42T(px, py + 15, 9, c42.tealInk, 'middle', st.sub))
  }
  /* curved arrows between consecutive stages, clockwise, on a clear radius */
  const RA = 175
  for (const st of stages) {
    const a1 = ((st.a + 35) * Math.PI) / 180
    const a2 = ((st.a + 55) * Math.PI) / 180
    const x1 = cx + RA * Math.cos(a1)
    const y1 = cy + RA * Math.sin(a1)
    const x2 = cx + RA * Math.cos(a2)
    const y2 = cy + RA * Math.sin(a2)
    s.push(`<path d="M ${cf42R(x1)} ${cf42R(y1)} A ${RA} ${RA} 0 0 1 ${cf42R(x2)} ${cf42R(y2)}" fill="none" stroke="${c42.ink}" stroke-width="2.5"/>`)
    /* arrowhead along the clockwise tangent at a2 */
    const tx = Math.cos(a2 + Math.PI / 2)
    const ty = Math.sin(a2 + Math.PI / 2)
    const nx = Math.cos(a2)
    const ny = Math.sin(a2)
    s.push(`<polygon points="${cf42R(x2 + 9 * tx)},${cf42R(y2 + 9 * ty)} ${cf42R(x2 - 7 * tx + 4 * nx)},${cf42R(y2 - 7 * ty + 4 * ny)} ${cf42R(x2 - 7 * tx - 4 * nx)},${cf42R(y2 - 7 * ty - 4 * ny)}" fill="${c42.ink}"/>`)
  }
  /* the centre */
  s.push(cf42T(cx, cy - 6, 11, c42.tealInk, 'middle', 'THE HONEST LOOP', true))
  s.push(cf42T(cx, cy + 14, 9.5, c42.ink, 'middle', 'one instruction at a time,'))
  s.push(cf42T(cx, cy + 30, 9.5, c42.ink, 'middle', 'repeated billions of times a second'))
  /* bottom strip */
  s.push(`<rect x="40" y="524" width="640" height="46" rx="8" fill="${c42.panelB}" stroke="${c42.conn}" stroke-width="2"/>`)
  s.push(cf42T(cx, 545, 10.5, c42.ink, 'middle', '0.2 ns per beat at 5 GHz: five billion beats every second, and the loop turns on each one', true))
  s.push(cf42T(cx, 562, 9, c42.tealInk, 'middle', 'the cycle is the processor\'s whole job description - everything else in this lesson serves it'))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the clock history: a log-scale line from the 4004's */
/* 740 kHz through 1 GHz (March 2000) to the 5 GHz plateau             */
/* ------------------------------------------------------------------ */
function cf42ClockHistorySvg(): string {
  const W = 720
  const H = 470
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f42}" role="img" aria-label="The clock history line. On a log scale of cycles per second, the line rises from the 4004 at 740 kHz in 1971, climbs five decades to 1 gigahertz on 6 March 2000 when AMD arrived first and Intel followed two days later, then bends near 2005 onto a flat plateau near 5 gigahertz that runs to today. A strip names the heat wall: power ended the race, and cores multiplied instead.">`)
  s.push(cf42T(W / 2, 26, 12, c42.teal, 'middle', 'THE CLOCK HISTORY - RISE, KNEE, PLATEAU', true))
  s.push(cf42T(W / 2, 44, 9, c42.tealInk, 'middle', 'cycles per second on a log scale - each gridline is ten times the one below it'))
  /* scales, computed from constants */
  const xOf = (year: number) => 80 + (year - 1971) * (580 / 53)
  const yOf = (hz: number) => 390 - (Math.log10(hz) - 5) * 60
  /* horizontal gridlines with decade labels */
  const gridLabels = ['100 kHz', '1 MHz', '10 MHz', '100 MHz', '1 GHz', '10 GHz']
  for (let d = 0; d <= 5; d++) {
    const y = 390 - d * 60
    s.push(`<line x1="80" y1="${y}" x2="660" y2="${y}" stroke="${c42.faint}" stroke-width="1.5"/>`)
    s.push(cf42T(72, y + 3, 9, c42.tealInk, 'end', gridLabels[d]))
  }
  /* x-axis and year ticks */
  s.push(`<line x1="80" y1="390" x2="660" y2="390" stroke="${c42.ink}" stroke-width="2"/>`)
  const years = [1971, 1980, 1990, 2000, 2010, 2024]
  for (const yr of years) {
    const x = xOf(yr)
    s.push(`<line x1="${cf42R(x)}" y1="390" x2="${cf42R(x)}" y2="396" stroke="${c42.ink}" stroke-width="2"/>`)
    s.push(cf42T(x, 410, 9.5, c42.ink, 'middle', String(yr), true))
  }
  /* the story line: 1971 (740 kHz) -> 6 March 2000 (1 GHz) -> about 2005 (5 GHz) -> flat */
  const x71 = xOf(1971)
  const y71 = yOf(740000)
  const x00 = xOf(2000.18)
  const y00 = yOf(1e9)
  const x05 = xOf(2005)
  const y05 = yOf(5e9)
  const x24 = xOf(2024)
  s.push(`<polyline points="${cf42R(x71)},${cf42R(y71)} ${cf42R(x00)},${cf42R(y00)} ${cf42R(x05)},${cf42R(y05)} ${cf42R(x24)},${cf42R(y05)}" fill="none" stroke="${c42.accent}" stroke-width="3"/>`)
  /* markers */
  const marks = [
    { x: x71, y: y71, col: c42.struct },
    { x: x00, y: y00, col: c42.conn },
    { x: x05, y: y05, col: c42.accent },
    { x: x24, y: y05, col: c42.accent },
  ]
  for (const m of marks) s.push(`<circle cx="${cf42R(m.x)}" cy="${cf42R(m.y)}" r="5" fill="${m.col}"/>`)
  /* annotations, placed clear of the line */
  s.push(cf42T(94, 356, 9.5, c42.ink, 'start', '1971: the 4004 - 740 kHz', true))
  s.push(cf42T(x00, 126, 9.5, c42.ink, 'middle', '1 GHz - 6 March 2000', true))
  s.push(cf42T(x00, 141, 9, c42.tealInk, 'middle', 'AMD first; Intel two days later'))
  s.push(cf42T(565, 84, 9.5, c42.ink, 'middle', 'about 2005: the heat wall -', true))
  s.push(cf42T(565, 97, 9, c42.tealInk, 'middle', 'clocks flatten, cores multiply'))
  s.push(cf42T(640, yOf(5e9) + 20, 9, c42.accent, 'end', 'the plateau near 5 GHz'))
  /* bottom strip: the honest flattening */
  s.push(`<rect x="40" y="422" width="640" height="40" rx="8" fill="${c42.panelB}" stroke="${c42.conn}" stroke-width="2"/>`)
  s.push(cf42T(W / 2, 438, 9.5, c42.ink, 'middle', 'the honest flattening: after the race, the beat could not shrink without burning the hand', true))
  s.push(cf42T(W / 2, 454, 9, c42.tealInk, 'middle', 'power and heat ended the gigahertz race - the fix was more workers, not a faster metronome'))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — the core/team map: one worker versus a team of     */
/* four, with the summed 12 GHz and its honest catch                   */
/* ------------------------------------------------------------------ */
function cf42CoreTeamSvg(): string {
  const W = 720
  const H = 440
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f42}" role="img" aria-label="The core-team map. Left panel: one core, a single worker box that fetches, decodes and executes on its own at 3 GHz, giving 1 times 3 equals 3 GHz of summed beat-time. Right panel: four cores, four worker boxes each complete at 3 GHz, giving 4 times 3 equals 12 GHz of summed beat-time. A banner gives the honest catch: the 12 GHz is only available to work that divides, and it is not one 12 GHz core.">`)
  s.push(cf42T(W / 2, 28, 12, c42.teal, 'middle', 'THE CORE-TEAM MAP - FROM ONE WORKER TO FOUR', true))
  /* left panel: one core */
  s.push(`<rect x="40" y="60" width="300" height="250" rx="10" fill="${c42.paper}" stroke="${c42.struct}" stroke-width="2"/>`)
  s.push(cf42T(190, 86, 11, c42.ink, 'middle', 'ONE CORE - ONE WORKER', true))
  s.push(`<rect x="100" y="110" width="180" height="70" rx="8" fill="${c42.white}" stroke="${c42.teal}" stroke-width="2.5"/>`)
  s.push(cf42T(190, 136, 10.5, c42.ink, 'middle', 'ONE CORE', true))
  s.push(cf42T(190, 154, 9, c42.tealInk, 'middle', 'fetch, decode, execute - all its own'))
  s.push(cf42T(190, 171, 9.5, c42.accent, 'middle', '3 GHz', true))
  s.push(cf42T(190, 212, 10.5, c42.ink, 'middle', 'summed beat-time: 1 x 3 = 3 GHz', true))
  s.push(cf42T(190, 232, 9, c42.tealInk, 'middle', 'one worker, one metronome'))
  s.push(cf42T(190, 252, 9, c42.tealInk, 'middle', 'one stream of work at a time'))
  /* right panel: four cores */
  s.push(`<rect x="380" y="60" width="300" height="250" rx="10" fill="${c42.paper}" stroke="${c42.struct}" stroke-width="2"/>`)
  s.push(cf42T(530, 86, 11, c42.ink, 'middle', 'FOUR CORES - A TEAM', true))
  const quad = [
    { x: 396, y: 104, n: 'core 1' },
    { x: 546, y: 104, n: 'core 2' },
    { x: 396, y: 180, n: 'core 3' },
    { x: 546, y: 180, n: 'core 4' },
  ]
  for (const q of quad) {
    s.push(`<rect x="${q.x}" y="${q.y}" width="128" height="64" rx="8" fill="${c42.white}" stroke="${c42.teal}" stroke-width="2"/>`)
    s.push(cf42T(q.x + 64, q.y + 18, 9.5, c42.ink, 'middle', q.n, true))
    s.push(cf42T(q.x + 64, q.y + 33, 9, c42.tealInk, 'middle', 'its own fetch,'))
    s.push(cf42T(q.x + 64, q.y + 46, 9, c42.tealInk, 'middle', 'decode, execute'))
    s.push(cf42T(q.x + 64, q.y + 59, 9.5, c42.accent, 'middle', '3 GHz', true))
  }
  s.push(cf42T(530, 272, 10.5, c42.ink, 'middle', 'summed beat-time: 4 x 3 = 12 GHz', true))
  s.push(cf42T(530, 291, 9, c42.tealInk, 'middle', 'four workers, four metronomes - Moore made the team affordable'))
  /* the honest-catch banner */
  s.push(`<rect x="40" y="336" width="640" height="84" rx="10" fill="${c42.panelA}" stroke="${c42.warn}" stroke-width="2"/>`)
  s.push(cf42T(W / 2, 362, 10.5, c42.warn, 'middle', 'THE HONEST CATCH - ONLY FOR WORK THAT DIVIDES', true))
  s.push(cf42T(W / 2, 384, 9.5, c42.ink, 'middle', 'four cooks halve a soup, not a wedding cake: division of work has overhead, and not every recipe divides'))
  s.push(cf42T(W / 2, 404, 9.5, c42.ink, 'middle', 'the 12 GHz is summed beat-time, not one 12 GHz core - no single stream runs any faster'))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the Moore ladder: 2,300 doubling every two years   */
/* to the 154,350,387,200 prediction against the 134 billion actual    */
/* ------------------------------------------------------------------ */
function cf42MooreLadderSvg(): string {
  const W = 720
  const H = 600
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f42}" role="img" aria-label="The Moore ladder. Seven log-scale bars: 2,300 transistors in 1971, then 73,600 in 1981, 2,355,200 in 1991, 75,366,400 in 2001, 2,411,724,800 in 2011, the highlighted 154,350,387,200 prediction for 2023, and 134 billion actual for Apple's M2 Ultra of 2023. A verdict strip computes prediction divided by actual equals 1.151869, within 15.186856 percent after 52 years.">`)
  s.push(cf42T(W / 2, 28, 12, c42.teal, 'middle', 'THE MOORE LADDER - 2,300 DOUBLING EVERY TWO YEARS', true))
  s.push(cf42T(W / 2, 48, 9, c42.tealInk, 'middle', 'transistor counts on a log scale - each equal step of height is ten times the count'))
  const base = 500
  const unit = 44
  const x0 = 70
  const stride = 88
  const barW = 66
  const bars = [
    { yr: '1971', val: 2300, lab: '2,300', tag: 'the 4004', star: false },
    { yr: '1981', val: 73600, lab: '73,600', tag: 'x 2^5', star: false },
    { yr: '1991', val: 2355200, lab: '2,355,200', tag: 'x 2^10', star: false },
    { yr: '2001', val: 75366400, lab: '75,366,400', tag: 'x 2^15', star: false },
    { yr: '2011', val: 2411724800, lab: '2,411,724,800', tag: 'x 2^20', star: false },
    { yr: '2023', val: 154350387200, lab: '154,350,387,200', tag: '2^26 predicted', star: true },
    { yr: '2023', val: 134000000000, lab: '134,000,000,000', tag: 'M2 Ultra actual', star: false },
  ]
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i]
    const h = (Math.log10(b.val) - 3) * unit
    const top = base - h
    const x = x0 + i * stride
    s.push(`<rect x="${x}" y="${cf42R(top)}" width="${barW}" height="${cf42R(h)}" rx="4" fill="${b.star ? c42.panelA : c42.white}" stroke="${b.star ? c42.accent : (i === 6 ? c42.teal : c42.struct)}" stroke-width="${b.star ? 3 : 2}"/>`)
    s.push(cf42T(x + barW / 2, cf42R(top - 20), 9.5, b.star ? c42.accent : c42.ink, 'middle', b.lab, true))
    s.push(cf42T(x + barW / 2, cf42R(top - 7), 9, c42.tealInk, 'middle', b.tag))
    s.push(cf42T(x + barW / 2, base + 18, 10, i >= 5 ? c42.accent : c42.ink, 'middle', b.yr, true))
  }
  s.push(`<line x1="50" y1="${base}" x2="680" y2="${base}" stroke="${c42.ink}" stroke-width="2"/>`)
  s.push(cf42T(W / 2, 534, 9, c42.tealInk, 'middle', 'the two 2023 bars stand side by side: the prediction of the law against the chip that shipped'))
  /* the verdict strip */
  s.push(`<rect x="40" y="546" width="640" height="46" rx="8" fill="${c42.panelB}" stroke="${c42.conn}" stroke-width="2"/>`)
  s.push(cf42T(W / 2, 568, 10.5, c42.ink, 'middle', 'THE VERDICT: 154,350,387,200 predicted for 2023 against 134 billion actual', true))
  s.push(cf42T(W / 2, 585, 9.5, c42.tealInk, 'middle', 'prediction / actual = 1.151869 - within 15.186856 percent after 52 years of doubling'))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURES                                                    */
/* ------------------------------------------------------------------ */

/* S1 — the cycle-position strip: which stage is which */
function cf42SolCycleStripSvg(): string {
  const W = 560
  const H = 212
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f42}" role="img" aria-label="The cycle strip. Four chips in a row: fetch, meaning the next instruction; decode, meaning what it asks; execute, meaning do the work; write back, meaning store the result. An arrow runs from the last chip back to the first, showing the loop restarting billions of times a second.">`)
  s.push(cf42T(W / 2, 26, 10.5, c42.teal, 'middle', 'THE CYCLE STRIP - WHICH STAGE IS WHICH', true))
  const chips = [
    { x: 40, name: 'FETCH', sub: 'the next instruction', col: c42.teal },
    { x: 165, name: 'DECODE', sub: 'what it asks', col: c42.conn },
    { x: 290, name: 'EXECUTE', sub: 'do the work', col: c42.accent },
    { x: 415, name: 'WRITE BACK', sub: 'store the result', col: c42.struct },
  ]
  for (const ch of chips) {
    s.push(`<rect x="${ch.x}" y="56" width="105" height="56" rx="8" fill="${c42.white}" stroke="${ch.col}" stroke-width="2.5"/>`)
    s.push(cf42T(ch.x + 52, 78, 9.5, c42.ink, 'middle', ch.name, true))
    s.push(cf42T(ch.x + 52, 96, 9, c42.tealInk, 'middle', ch.sub))
  }
  for (const gx of [155, 280, 405]) {
    s.push(`<line x1="${gx - 6}" y1="84" x2="${gx + 3}" y2="84" stroke="${c42.ink}" stroke-width="2"/>`)
    s.push(`<polygon points="${gx + 3},80 ${gx + 3},88 ${gx + 9},84" fill="${c42.ink}"/>`)
  }
  /* the loop-back arrow */
  s.push(`<path d="M 467 118 L 467 150 L 93 150 L 93 124" fill="none" stroke="${c42.ink}" stroke-width="2"/>`)
  s.push(`<polygon points="89,126 97,126 93,114" fill="${c42.ink}"/>`)
  s.push(cf42T(W / 2, 170, 9, c42.tealInk, 'middle', 'the loop restarts - billions of times a second'))
  s.push(`<rect x="40" y="182" width="480" height="22" rx="6" fill="${c42.panelB}" stroke="${c42.conn}" stroke-width="1.5"/>`)
  s.push(cf42T(W / 2, 197, 9, c42.ink, 'middle', 'fetch takes, decode reads, execute does, write back keeps', true))
  s.push('</svg>')
  return s.join('')
}

/* S2 — the clock-ratio bar strip: 4004 vs 1 GHz vs 5 GHz, log widths */
function cf42SolClockRatioSvg(): string {
  const W = 560
  const H = 252
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f42}" role="img" aria-label="The clock-ratio strip. Three horizontal bars with log widths: the 4004 at 740 kHz, 1 gigahertz of 2000, and a 5 GHz core. The bars are drawn so each equal step of width is ten times the cycles. A strip computes 5 GHz divided by 740 kHz equals 6756.7568, and 1 GHz divided by 740 kHz equals 1351.3514.">`)
  s.push(cf42T(W / 2, 26, 10.5, c42.teal, 'middle', 'THE CLOCK-RATIO STRIP - LOG WIDTHS, TEN TIMES A STEP', true))
  const rows = [
    { name: 'the 4004 (1971)', hz: 740000, val: '740 kHz = 740,000 cycles/s' },
    { name: '1 GHz (2000)', hz: 1e9, val: '1,000,000,000 cycles/s' },
    { name: '5 GHz core', hz: 5e9, val: '5,000,000,000 cycles/s' },
  ]
  const bx = 150
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    const y = 60 + i * 44
    const w = (Math.log10(r.hz) - 5.5) * 70
    s.push(`<rect x="${bx}" y="${y}" width="${cf42R(w)}" height="26" rx="4" fill="${i === 2 ? c42.panelA : c42.white}" stroke="${i === 2 ? c42.accent : c42.struct}" stroke-width="2"/>`)
    s.push(cf42T(bx - 8, y + 17, 9.5, c42.ink, 'end', r.name, true))
    s.push(cf42T(bx + cf42R(w) + 8, y + 17, 9.5, c42.tealInk, 'start', r.val))
  }
  s.push(`<rect x="40" y="198" width="480" height="44" rx="8" fill="${c42.panelB}" stroke="${c42.conn}" stroke-width="2"/>`)
  s.push(cf42T(W / 2, 216, 10, c42.ink, 'middle', '5 GHz / 740 kHz = 6756.7568 - and 1 GHz / 740 kHz = 1351.3514', true))
  s.push(cf42T(W / 2, 233, 9, c42.tealInk, 'middle', 'a 5 GHz core makes 6756.7568 beats inside one single beat of the 4004'))
  s.push('</svg>')
  return s.join('')
}

/* S3 — core-count versus summed GHz, as bars */
function cf42SolCoreSumSvg(): string {
  const W = 560
  const H = 252
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f42}" role="img" aria-label="The summed beat-time bars. Four rows: one core at 3 GHz giving 3 GHz; two cores at 3 GHz giving 6 GHz; four cores at 3 GHz giving 12 GHz, highlighted; and eight cores at 2.4 GHz giving 19.2 GHz. A strip warns that summed beat-time equals cores times clock and is only available to work that divides - a 4-core 3 GHz machine is not one 12 GHz core.">`)
  s.push(cf42T(W / 2, 26, 10.5, c42.teal, 'middle', 'CORES x CLOCK - THE SUMMED BEAT-TIME', true))
  const rows = [
    { name: '1 x 3 GHz', ghz: 3, val: '3 GHz' },
    { name: '2 x 3 GHz', ghz: 6, val: '6 GHz' },
    { name: '4 x 3 GHz', ghz: 12, val: '12 GHz' },
    { name: '8 x 2.4 GHz', ghz: 19.2, val: '19.2 GHz' },
  ]
  const bx = 130
  const scale = 19
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    const y = 56 + i * 36
    const w = r.ghz * scale
    s.push(`<rect x="${bx}" y="${y}" width="${w}" height="24" rx="4" fill="${i === 2 ? c42.panelA : c42.white}" stroke="${i === 2 ? c42.accent : c42.struct}" stroke-width="2"/>`)
    s.push(cf42T(bx - 8, y + 16, 9.5, c42.ink, 'end', r.name, true))
    s.push(cf42T(bx + w + 8, y + 16, 9.5, i === 2 ? c42.accent : c42.tealInk, 'start', r.val, i === 2))
  }
  s.push(`<rect x="40" y="200" width="480" height="42" rx="8" fill="${c42.panelB}" stroke="${c42.conn}" stroke-width="2"/>`)
  s.push(cf42T(W / 2, 217, 10, c42.ink, 'middle', 'summed beat-time = cores x clock - only for work that divides', true))
  s.push(cf42T(W / 2, 234, 9, c42.tealInk, 'middle', 'a 4-core 3 GHz machine is NOT one 12 GHz core: no single stream runs faster'))
  s.push('</svg>')
  return s.join('')
}

/* S4 — the Moore doubling staircase for the 2021 rung */
function cf42SolMooreStairsSvg(): string {
  const W = 560
  const H = 420
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f42}" role="img" aria-label="The Moore staircase. Six log-scale steps at ten-year intervals from 1971: 2,300 transistors, then 73,600, then 2,355,200, then 75,366,400, then 2,411,724,800, then 77,175,193,600 in 2021 - each ten-year step being five doublings at two years a doubling. A strip names the 2021 rung as 2,300 times 2 to the 25, one rung below the 2023 pin.">`)
  s.push(cf42T(W / 2, 26, 10.5, c42.teal, 'middle', 'THE MOORE STAIRCASE - 2,300 DOUBLING EVERY TWO YEARS', true))
  const base = 340
  const unit = 36
  const x0 = 50
  const stride = 85
  const barW = 64
  const steps = [
    { yr: '1971', val: 2300, lab: '2,300', tag: 'start' },
    { yr: '1981', val: 73600, lab: '73,600', tag: 'x 2^5' },
    { yr: '1991', val: 2355200, lab: '2,355,200', tag: 'x 2^10' },
    { yr: '2001', val: 75366400, lab: '75,366,400', tag: 'x 2^15' },
    { yr: '2011', val: 2411724800, lab: '2.41 billion', tag: 'x 2^20' },
    { yr: '2021', val: 77175193600, lab: '77.18 billion', tag: 'x 2^25' },
  ]
  for (let i = 0; i < steps.length; i++) {
    const st = steps[i]
    const h = (Math.log10(st.val) - Math.log10(2300)) * unit + 6
    const top = base - h
    const x = x0 + i * stride
    s.push(`<rect x="${x}" y="${cf42R(top)}" width="${barW}" height="${cf42R(h)}" rx="4" fill="${i === 5 ? c42.panelA : c42.white}" stroke="${i === 5 ? c42.accent : c42.struct}" stroke-width="${i === 5 ? 3 : 2}"/>`)
    s.push(cf42T(x + barW / 2, cf42R(top - 18), 9.5, i === 5 ? c42.accent : c42.ink, 'middle', st.lab, true))
    s.push(cf42T(x + barW / 2, cf42R(top - 6), 9, c42.tealInk, 'middle', st.tag))
    s.push(cf42T(x + barW / 2, base + 18, 10, c42.ink, 'middle', st.yr, true))
  }
  s.push(`<line x1="40" y1="${base}" x2="520" y2="${base}" stroke="${c42.ink}" stroke-width="2"/>`)
  s.push(cf42T(W / 2, 372, 9, c42.tealInk, 'middle', 'each ten-year step is five doublings - two years a doubling, as revised in 1975'))
  s.push(`<rect x="40" y="380" width="480" height="32" rx="8" fill="${c42.panelB}" stroke="${c42.conn}" stroke-width="2"/>`)
  s.push(cf42T(W / 2, 400, 9.5, c42.ink, 'middle', 'the 2021 rung: 2,300 x 2^25 = 77,175,193,600 - one rung below the 2023 pin', true))
  s.push('</svg>')
  return s.join('')
}

/* S5 — the pocket's cloth: six transistors versus one plus one */
function cf42SolPocketSvg(): string {
  const W = 560
  const H = 262
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f42}" role="img" aria-label="The pocket's cloth. Left panel: one SRAM bit drawn as six transistor circles labelled T1 to T6 in a three-by-two grid. Right panel: one DRAM bit drawn as a single transistor circle plus a capacitor symbol of two parallel plates. A strip prices one byte: 6 times 8 equals 48 transistors for SRAM against 8 plus 8 equals 16 parts for DRAM, a sixfold cost per bit.">`)
  s.push(cf42T(W / 2, 26, 10.5, c42.teal, 'middle', 'THE POCKET\'S CLOTH - SIX VERSUS ONE-PLUS-ONE', true))
  /* SRAM panel */
  s.push(`<rect x="40" y="52" width="235" height="150" rx="10" fill="${c42.paper}" stroke="${c42.teal}" stroke-width="2"/>`)
  s.push(cf42T(157, 74, 10.5, c42.ink, 'middle', 'SRAM - one bit', true))
  const tPos = [
    { x: 95, y: 108, n: 'T1' }, { x: 157, y: 108, n: 'T2' }, { x: 219, y: 108, n: 'T3' },
    { x: 95, y: 150, n: 'T4' }, { x: 157, y: 150, n: 'T5' }, { x: 219, y: 150, n: 'T6' },
  ]
  for (const t of tPos) {
    s.push(`<circle cx="${t.x}" cy="${t.y}" r="11" fill="${c42.white}" stroke="${c42.teal}" stroke-width="2"/>`)
    s.push(cf42T(t.x, t.y + 3, 9, c42.tealInk, 'middle', t.n, true))
  }
  s.push(cf42T(157, 188, 9.5, c42.ink, 'middle', 'six transistors per bit', true))
  /* DRAM panel */
  s.push(`<rect x="285" y="52" width="235" height="150" rx="10" fill="${c42.paper}" stroke="${c42.conn}" stroke-width="2"/>`)
  s.push(cf42T(402, 74, 10.5, c42.ink, 'middle', 'DRAM - one bit', true))
  s.push(`<circle cx="345" cy="118" r="11" fill="${c42.white}" stroke="${c42.conn}" stroke-width="2"/>`)
  s.push(cf42T(345, 121, 9, c42.tealInk, 'middle', 'T', true))
  s.push(`<line x1="356" y1="118" x2="392" y2="118" stroke="${c42.ink}" stroke-width="2"/>`)
  s.push(`<line x1="392" y1="106" x2="392" y2="130" stroke="${c42.ink}" stroke-width="3"/>`)
  s.push(`<line x1="402" y1="106" x2="402" y2="130" stroke="${c42.ink}" stroke-width="3"/>`)
  s.push(`<line x1="402" y1="118" x2="425" y2="118" stroke="${c42.ink}" stroke-width="2"/>`)
  s.push(cf42T(402, 152, 9, c42.tealInk, 'middle', 'the capacitor holds the bit as charge'))
  s.push(cf42T(402, 170, 9, c42.tealInk, 'middle', 'charge leaks - it must be refreshed'))
  s.push(cf42T(402, 188, 9.5, c42.ink, 'middle', 'one transistor + one capacitor per bit', true))
  /* verdict strip */
  s.push(`<rect x="40" y="218" width="480" height="34" rx="8" fill="${c42.panelB}" stroke="${c42.conn}" stroke-width="2"/>`)
  s.push(cf42T(W / 2, 239, 9.5, c42.ink, 'middle', 'per byte: 6 x 8 = 48 transistors vs 1 x 8 + 1 x 8 = 16 parts - the cloth costs 6x per bit', true))
  s.push('</svg>')
  return s.join('')
}

export const lesson42: Lesson = {
  id: 'cf-the-processor-named-honestly',
  number: '4.2',
  title: 'The Processor Named Honestly',
  concepts: [
    'the honest contract: fetch, decode, execute, write back',
    'the clock: cycles per second, the metronome priced',
    'the gigahertz race and the heat wall that ended it',
    'cores: from one worker to a team, 4 x 3 = 12 GHz summed',
    "Moore's law: 19 April 1965, revised 1975, doubling every two years",
    'cache: the pocket, SRAM at six transistors a bit',
    'threads and SMT: two streams, not two cores',
  ],
  objectives: [
    "By the end of this lesson you can say precisely what a processor is - the component that fetches instructions from memory, decodes them, executes them and writes back the results, billions of times a second - and refuse the 'brain of the computer' shorthand as a lie of convenience.",
    'By the end of this lesson you can price a clock rate honestly: 1 GHz means $10^9$ cycles per second, one 5 GHz cycle lasts 0.2 ns, and the 4004\'s 740 kHz makes a 5 GHz core 6756.7568 times faster in beats.',
    "By the end of this lesson you can tell the dated story straight: AMD's 1 GHz Athlon of 6 March 2000 with Intel two days later, the heat wall that flattened the race, and the dual-core month of May 2005 that answered it with workers instead of beats.",
    "By the end of this lesson you can compute Moore's-law predictions: 2,300 transistors doubling every two years gives $2,300 \\times 2^{26} = 154{,}350{,}387{,}200$ for 2023, within 15.186856 percent of the M2 Ultra's 134 billion actual.",
    'By the end of this lesson you can explain why a cache is small and fast - SRAM spends six transistors a bit against DRAM\'s one transistor plus one capacitor - and why SMT gives a core two streams of work without making it two cores.',
  ],
  prerequisites: ['cf-the-motherboard-the-city-plan'],
  sources: ['cs-cf-web-ground-ch04'],
  blocks: [
    { kind: 'para', text: 'Lesson 4.1 drew the motherboard as a city plan and left one district unexplored: the socket in the middle, the largest chip on the board, the one every road leads to. Popular writing calls it "the brain of the computer", and that phrase is the single most convenient lie in the whole subject. A brain thinks, imagines, wills and understands; the component in that socket does none of those things. What it does is narrower, older and - once you see it stated cleanly - far more impressive than the metaphor it replaces: it fetches instructions from memory, decodes them, executes them, writes back the results, and then does the whole thing again, several billion times each second, for as long as it has power. This lesson names that component honestly, prices its metronome, counts its workers, dates the law that made it affordable, and opens the pocket it keeps its tools in. Not one line of architecture theory - just the names, the numbers and the dates, each one checked by arithmetic.' },
    { kind: 'para', text: 'Why insist on honest naming? Because every wrong answer in this corner of computer awareness comes from taking the metaphor literally. Students who believe the processor "thinks" expect it to be fast at everything, and are puzzled when adding a second worker does not double the speed of one job. Students who believe gigahertz measures "power" buy the 5 GHz machine and wonder why the 3.8 GHz machine beside it finishes first. The metaphor hides the mechanism, and the mechanism is what examinations actually examine. So we take the dishonest nickname off, read what is written underneath, and pin each reading with a number you can recompute yourself - that is the discipline this whole book follows, and it starts at the socket.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — processor (CPU)', text: 'A **processor** (also called a **CPU**, central processing unit) is said to be the component that fetches instructions from memory, decodes them, executes them, and writes back the results, repeating billions of times a second. Symbolically, the processor runs one honest loop - fetch, decode, execute, write back - and everything it ever accomplishes is that loop, iterated. It is a dedicated arithmetic and control station, not a brain: it neither understands what it does nor chooses to do it.' },
    { kind: 'para', text: 'Read the definition twice and notice what it does NOT claim. It does not say the processor creates instructions - they arrive from memory, written in advance by programmers. It does not say the processor stores your data - that is the memory system, the warehouses of lesson 4.1 and the hierarchy of lesson 4.3. It does not even say the processor works alone - modern ones are teams, as Section 4 of this lesson will show. The definition names a CONTRACT: given a stream of instructions and a stock of data, the processor will keep taking the next instruction, working out what it asks, doing it, and filing the result. Every slogan about "processing power" is a comment on how fast and how many ways that contract is honoured - nothing more, and nothing less.' },
    { kind: 'para', text: 'For example, walk one single instruction through the loop, say an ADD that must total two numbers already sitting in the processor\'s registers:' },
    { kind: 'list', marker: 'roman', items: [
      '**fetch** - the processor asks memory for the next instruction in the stream, the encoded pattern of bits that says ADD these two, and pulls it in;',
      '**decode** - it reads the pattern and works out what is being asked: which operation, which registers hold the operands, where the answer must go;',
      '**execute** - the arithmetic station performs the addition, on values that are already local;',
      '**write back** - the total is stored into the destination register (or, for a load or store, shipped to or from memory), and the loop is ready for the next instruction.',
    ] },
    { kind: 'para', text: 'Four stages, one loop, no mystery. The figure below draws the loop as a wheel, because that is its true shape: a cycle, not a queue. There is no "last instruction" after which the processor rests; while power flows, the wheel turns. Around the wheel we have drawn the clock ring - the metronome whose beat paces every turn - because the loop and the clock are inseparable in everything that follows: the next section prices the beat, and every speed claim you will ever read is a claim about how often this wheel can turn.' },
    { kind: 'figure', caption: 'The cycle wheel: fetch, decode, execute and write back as four stations on one circle, joined by clockwise arrows - the loop has no end station, only a next turn. The dashed ring is the clock, ticking the beat: at 5 GHz one beat lasts 0.2 ns, so the wheel is paced five billion times each second.', svg: cf42CycleWheelSvg() },
    { kind: 'para', text: 'The wheel also settles a vocabulary question that examinations probe relentlessly. "Fetch-decode-execute" is often printed as though it were the whole cycle, and for short questions it is safe to recite it that way - but the fourth stage, write back, is not an optional afterthought. An addition whose result is never filed is work thrown away; a load whose cargo is never delivered has fetched nothing useful. When an examiner asks you to "name the stages of the instruction cycle", the complete and defensible answer is all four: fetch, decode, execute, write back. Say the fourth quietly if you must, but say it.' },
    { kind: 'algorithm', title: 'The honest loop, written as it actually runs', lines: [
      { code: 'while power flows:', note: 'the processor has no stopping point; it is always mid-loop' },
      { code: '  instruction <- memory[PC]', note: 'FETCH: take the next instruction from memory' },
      { code: '  meaning <- decode(instruction)', note: 'DECODE: work out what it asks and where its data sits' },
      { code: '  result <- execute(meaning)', note: 'EXECUTE: the arithmetic or logic station does the work' },
      { code: '  writeback(result)', note: 'WRITE BACK: file the result; then advance to the next' },
    ], note: 'This is the whole contract. Everything else in this lesson - clock, cores, Moore, cache, threads - exists to make some turn of this loop cheaper or to keep the wheel from idling.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the loop is the entire job description', text: 'Strip away every marketing word and the processor is a machine for running that while-loop as fast as physics allows. Speed of looping is what a clock buys; parallel turns of the loop are what cores buy; keeping the loop fed is what cache buys; filling idle turns is what threads buy. Hold this one sentence and every section of the lesson becomes a chapter of the same story instead of five disconnected factoids.' },
    { kind: 'heading', text: 'The Narrow Street: The von Neumann Bottleneck' },
    { kind: 'para', text: 'One honest consequence of the contract deserves its own paragraph, because it names the deepest structural fact of the classic machine. Look again at the wheel: every turn begins with a FETCH, and a fetch must travel to memory and back along the shared roads that lesson 4.1 drew between the processor district and the memory districts. The loop is only as fast as its slowest commute. When one fast worker sits at the end of one narrow street to a large warehouse, the queue at the street end - not the worker\'s hustle - caps the throughput. This observation is called the **von Neumann bottleneck**, and it is not a defect anyone forgot to fix; it is the price of the stored-program design itself, in which instructions and data share one memory and one road, gaining flexibility at the cost of congestion.' },
    { kind: 'para', text: 'The name deserves its history told straight. The stored-program architecture follows the design John von Neumann\'s 1945 report set out, so the shared road bears his name - though the lecture everyone quotes is John Backus\'s: in his 1977 ACM Turing Award lecture Backus called the processor-memory road the von Neumann bottleneck and spent much of the talk grieving that almost all computing effort flows through it, a teaspoon-wide channel between a fast thinker and a vast store. Whether you find the grief justified or overstated, the honest naming matters: a bottleneck is a property of a ROAD, and roads can be widened, queued around, or stocked at the near end. The fix-ideas - caches keeping copies close, and the locality of reference that makes copies useful - are lesson 4.3\'s ground, and this lesson will only point at that door. Here it is enough to have named the street honestly.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the bottleneck is structural, not a broken part', text: 'Do not read "bottleneck" as "a fault the manufacturer should have fixed". The shared street is what makes the stored-program machine PROGRAMMABLE: one memory holds both instructions and data precisely so programs can be loaded, changed and stored like any other data. The tax of that generality is congestion. Examiners reward the student who can say both halves - the flexibility the design buys and the queue it pays - in one sentence each.' },
    { kind: 'heading', text: 'The Clock: The Metronome Priced' },
    { kind: 'para', text: 'Now price the beat. Inside the processor a **clock** ticks - in fact a clock signal, a voltage that flips between high and low billions of times a second - and each tick, each **cycle**, is the smallest unit of time the machine recognises: no step of the honest loop begins between beats. The **clock rate**, measured in hertz (Hz), counts cycles per second. That is the entire definition, and it is where every honest calculation begins: a rate of 5 GHz says the metronome beats five thousand million times each second - and it says nothing else. It does not say five billion instructions completed; it does not say five billion anything accomplished. Only beats.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the cycle-period law', text: 'A clock rate of $f$ cycles per second gives a cycle period of $T = 1/f$ seconds - the length of one beat. Hence 1 GHz means $10^{9}$ cycles/s, so one beat lasts $1/10^{9}\\ \\text{s} = 10^{-9}\\ \\text{s} = 1$ ns; and at 5 GHz one beat lasts $1/5 \\times 10^{9}$ s, which is 0.2 ns. Faster clock, shorter beat - the law is nothing but the arithmetic of reciprocals, pinned by the SI prefixes: kilo $10^{3}$, mega $10^{6}$, giga $10^{9}$.' },
    { kind: 'equation', latex: 'T = \\frac{1}{f}:\\quad \\text{at } f = 5\\ \\text{GHz},\\ T = \\frac{1}{5 \\times 10^{9}}\\ \\text{s} = 0.2\\ \\text{ns}', note: 'the cycle-period law: one 5 GHz beat is 0.2 ns, a fifth of the 1 ns beat at 1 GHz' },
    { kind: 'example', title: 'Illustration 1. Convert clock rates to beat lengths: what does one cycle last at 1 GHz, 2 GHz, 3 GHz, 4 GHz and 5 GHz?', steps: [
      'Take the cycle-period law: one beat lasts $T = 1/f$ seconds.',
      'So, at 1 GHz: $T = 1/10^{9} = 10^{-9}$ s, which is 1 ns - the anchor beat.',
      'Now, at 2 GHz: $T = 1/(2 \\times 10^{9}) = 0.5$ ns; at 4 GHz: $T = 0.25$ ns - halvings of the anchor.',
      'Check the odd one: at 3 GHz, $T = 1/(3 \\times 10^{9})$ s $= 0.3333333$ ns to seven decimals.',
      'Hence the ladder reads 1 ns, 0.5 ns, 0.3333333 ns, 0.25 ns, 0.2 ns - each extra gigahertz buys a smaller and smaller saving, a fact that returns when we price the heat wall.',
    ] },
    { kind: 'para', text: 'Feel the scale of those numbers before going further, because the honesty of this lesson lives in them. One 5 GHz beat lasts 0.2 ns. Light itself - the fastest anything can travel - covers about 6 cm in 0.2 ns: an electrical signal crossing a 15 cm motherboard spends roughly a whole beat each way, and a large chip is several beats wide to its own far corners. In one microsecond the 5 GHz metronome manages 5,000 beats; in one millisecond, 5,000,000. The processor is not clever because it thinks; it is formidable because it repeats a modest act at a rate the human imagination simply does not own. Say "five billion" aloud and remember you cannot count to five billion in a lifetime - that is the tempo of the wheel.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — gigahertz compares beats, not brains', text: 'The classic examination trap, and the classic shop-counter trap too: a 5 GHz processor does NOT do "5 GHz of work", and two processors at the same rate do NOT do the same work per beat. The clock only paces the loop; how much loop advances per beat depends on the design - how wide its data paths are, how it overlaps stages, how often it waits on memory. Comparing clock rates across DIFFERENT designs is comparing metronomes of two pianists and concluding who plays better. Within one family, rates rank honestly; across families, the number is nearly empty. Every examiner who has marked this topic has seen the trap swallowed whole.' },
    { kind: 'para', text: 'To see how far the metronome has come, price it against its own ancestor - the first commercial single-chip microprocessor, the Intel 4004, announced on 15 November 1971. Its clock ran at 740 kHz: 740,000 cycles per second, each beat lasting $1/740{,}000$ s. Work that reciprocal out in full and it is worth pinning to seven decimals: one 4004 beat lasted 1.3513514 microseconds - about one and a third millionths of a second. A modern 5 GHz core beats every 0.2 ns. The comparison between 1971 and now is therefore pure division, and we shall do it honestly in the next illustration - but first register what is being compared: two metronomes, nothing else. Whether the modern machine does 6,756 times the WORK per second is a different question with a design-dependent answer.' },
    { kind: 'example', title: 'Illustration 2. A 5 GHz core versus the 4004\'s 740 kHz: how many modern beats fit inside one beat of the ancestor?', steps: [
      'Take both rates as cycles per second: $5\\ \\text{GHz} = 5{,}000{,}000{,}000$ and $740\\ \\text{kHz} = 740{,}000$.',
      'Divide the rates: $5{,}000{,}000{,}000 \\div 740{,}000 = 6756.756756\\ldots$',
      'Pin the quotient to four decimals: 6756.7568 - the honest ratio of the two metronomes.',
      'Check it the other way: one 4004 beat is 1.3513514 microseconds; in that time the 5 GHz core fits $5 \\times 10^{9} \\times 1.3513514 \\times 10^{-6}$ beats $= 6756.7568$ - the same number, as reciprocals demand.',
      'Hence 6756.7568 modern beats inside every single 4004 beat: fifty-two years bought a metronome nearly seven thousand times faster.',
    ] },
    { kind: 'example', title: 'Illustration 3. And against the 1 GHz milestone machine of March 2000, how does the 4004 compare?', steps: [
      'Take the milestone rate: $1\\ \\text{GHz} = 1{,}000{,}000{,}000$ cycles/s.',
      'Divide by the ancestor: $1{,}000{,}000{,}000 \\div 740{,}000 = 1351.351351\\ldots$',
      'Pin it: 1351.3514 to four decimals - one thousand three hundred fifty-one 1 GHz beats per single 4004 beat.',
      'Notice the structure: $1351.3514 \\times 5 = 6756.7568$, because the 5 GHz ratio is exactly five times the 1 GHz ratio.',
      'Hence the two pinned ratios of this lesson - 1351.3514 and 6756.7568 - are one division seen at two speeds.',
    ] },
    { kind: 'para', text: 'The figure below draws the whole history of the metronome on one log-scale line, because the story is easier to read in a picture than in a list. Notice the SHAPE before the labels: a long climb, a knee, and a plateau. The climb is three decades of engineering bravado; the knee is where physics charged its bill; the plateau is where we live now. The next section tells that story with its dates pinned.' },
    { kind: 'figure', caption: 'The clock history: a log-scale line rising from the 4004\'s 740 kHz in 1971 to 1 GHz on 6 March 2000, bending near 2005 and running flat near 5 GHz since - the heat wall made visible. Each gridline is ten times the last, so the climb from 1971 to 2000 is more than three decades of ten.', svg: cf42ClockHistorySvg() },
    { kind: 'heading', text: 'The Gigahertz Race and the Heat Wall' },
    { kind: 'para', text: 'The turn of the millennium owned a race, and the press named it the gigahertz race. The finish line - one billion cycles per second - was in sight through 1999, and two companies sprinted for it. AMD got there first: on 6 March 2000 its Athlon became the first processor shipped to reach 1 GHz. Intel followed two days later, on 8 March 2000, with its own 1 GHz Pentium III. Two days is the width of the margin - and the honest lesson of that margin is how little it meant: no application changed, no algorithm unlocked; the metronome simply crossed a round number, and the marketing departments treated it as a summit. For the next five years the race continued past the line, chasing 2, 3, then close to 4 GHz, and the numbers on the boxes kept climbing.' },
    { kind: 'callout', tone: 'historical', title: 'History — the gigahertz race, dated honestly', text: 'AMD Athlon, 1 GHz, 6 March 2000 - first to the line. Intel Pentium III, 1 GHz, 8 March 2000 - two days later. The gap that decided a year of headlines: forty-eight hours. Our own retelling, and the honest one: both machines were fine, neither was twice a 500 MHz machine in anything but beats, and the race the press covered so breathlessly ended not in victory but in physics - the heat wall, which the next paragraph prices. When an examiner asks for the date, give 6 March 2000 and the two-day gap; when a colleague repeats the legend that Intel was "beaten to GHz by months", correct it - it was days.' },
    { kind: 'para', text: 'Then the line on the figure goes flat, and the honest reason is not laziness but power. Every beat charges and discharges billions of tiny gates, and the energy a chip burns per second rises with how often it beats: push the clock up and the heat rises with it, past what a metal cap and a fan can carry away, past what the silicon can survive. By the mid-2000s designers could have kept raising numbers only by burning the hand that held the chip - the pursuit ended because the power bill ended it, not because imagination ran out. And so the industry, stuck near the top of the metronome scale, asked the question that reshaped everything after: if one worker cannot beat faster, can we afford two workers? The next section - and one law named after Gordon Moore - answers yes.' },
    { kind: 'para', text: 'Carry the honest shape of this story with you, because it corrects the naive reading of every specification sheet: clock rates STOPPED climbing years ago and have sat on a plateau since - modern headline numbers near 5 GHz are brief turbo bursts on a few cores, not the sustained summit of an endless climb. When a manufacturer quotes a high clock today, ask the two honest questions this lesson has armed you with: is that the sustained rate or a burst, and how many workers beat at it? Metronome questions and headcount questions are different questions - which is exactly why the next section exists.' },
    { kind: 'heading', text: 'The Cores: From One Worker to a Team' },
    { kind: 'callout', tone: 'definition', title: 'Definition — core', text: 'A **core** is said to be a complete worker station on the processor - a unit with its own fetch, its own decode and its own execute, running the honest loop independently of its neighbours. Symbolically, a processor with $k$ cores is $k$ workers sharing one chip, one power budget and one view of memory; each keeps its own copy of the loop going. A dual-core processor has two such stations, a quad-core four.' },
    { kind: 'para', text: 'The definition is deliberately complete: a core is not "half a processor" or "a piece of a processor" - it is a WHOLE processor\'s worth of loop, and what it shares with its neighbours is the packaging, not the work. When you read "8-core processor", read "eight complete workers under one lid". This completeness is what makes the arithmetic of the next paragraph legal, and it is also what distinguishes a core from the cheaper imitation we will meet in the threads section: only a core owns the full loop.' },
    { kind: 'para', text: 'Now the arithmetic, stated honestly before it is admired. A 4-core processor with each core clocked at 3 GHz offers, at most, $4 \\times 3 = 12$ GHz of SUMMED beat-time: twelve billion beats per second in total, spread across four workers who can each spend only three billion. The number 12 GHz is real - it is the honest total of the team\'s beat-time - and it is also the most misread number on any specification sheet, because summed beat-time is available ONLY to work that can be divided across the workers. One single stream of instructions, however long, still runs on one worker at 3 GHz: the other nine billion beats a second are spectators unless some of the work can be moved onto them.' },
    { kind: 'figure', caption: 'The core-team map: one core is one complete worker - fetch, decode, execute all its own - while four cores are four such workers, giving 4 x 3 = 12 GHz of summed beat-time. The banner carries the honest catch: only work that divides can collect the whole 12 GHz, and no single stream ever runs at 12 GHz.', svg: cf42CoreTeamSvg() },
    { kind: 'example', title: 'Illustration 4. A 4-core 3 GHz processor renders four independent video segments, one per core. What is the total beat-time on offer, and what would change for one segment alone?', steps: [
      'Take the headcount and the rate separately: 4 cores, each at 3 GHz.',
      'Multiply for the summed beat-time: $4 \\times 3 = 12$ GHz - twelve billion beats per second across the team.',
      'Check the single-stream case: one segment on one core sees only that core\'s 3 GHz - the other three workers add nothing to IT.',
      'So, four independent segments can collectively use the full 12 GHz; one undivided segment cannot exceed 3 GHz.',
      'Hence 12 GHz summed, honestly conditioned: the team multiplies throughput for divisible work, never the speed of one indivisible job.',
    ] },
    { kind: 'para', text: 'The honest catch deserves a picture every examination room would forgive you for sketching in a margin: the four-cooks kitchen. Four cooks halve the time to make a soup - divide the vegetables, share the stirring, one pot each - and roughly quarter it for four soups. But four cooks cannot bake one wedding cake in a quarter of the time: the layers must rise before they are stacked, the icing must wait for the layers, and the last decoration must wait for the icing. Some recipes divide cleanly (four soups), some divide with overhead (one soup shared, after the arguing about onions), and some barely divide at all (one cake). Programs are recipes: rendering frames divides like soups; summing a long column of numbers divides with overhead; a chain of calculations where each step needs the last answer barely divides at all. The 12 GHz is a kitchen CAPACITY, not a promise that your dish is a soup.' },
    { kind: 'example', title: 'Illustration 5. Four independent jobs, each needing 3 seconds of processor time, must run on a machine that is either one 3 GHz core or four 3 GHz cores. How long until the last job finishes, in each case?', steps: [
      'Take the jobs as truly independent - four soups, not one cake.',
      'On one core they must run in sequence: $4 \\times 3 = 12$ seconds until the last finishes.',
      'Divided four ways, each core takes one job: all four finish together after $12 \\div 4 = 3$ seconds.',
      'Check the honesty: no JOB ran faster than 3 seconds - the work was spread, not quickened.',
      'Hence 12 seconds serial against 3 seconds divided: the team saves wall-clock time by sharing out work, the clean fourfold win that only perfectly divisible work ever sees.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — summed GHz is not a speed', text: 'Never write "a 4-core 3 GHz machine runs at 12 GHz". It does not: no clock in it beats at 12 GHz, and no single program enjoys a 12 GHz metronome. The correct sentence is "it offers at most $4 \\times 3 = 12$ GHz of summed beat-time, and only to parallelisable work". The phrase "at most" is load-bearing too - real division carries overhead, so even divisible work collects somewhat less than the full sum. Marking schemes reserve their harshest cross for the 12 GHz machine that never existed.' },
    { kind: 'para', text: 'Why did teams arrive only in 2005, when the idea of putting two workers on one chip is older than the microprocessor itself? Because workers cost silicon, and silicon - for the whole of this story - was getting cheaper at a pace so steady people called it a law. The dual-core consumer machines of May 2005 were Moore\'s law arriving at a design decision: the transistors that would once have deepened one worker\'s pipeline were spent instead on a second, whole worker, because the first worker had stopped getting faster in any way a user could feel. Two products shipped that month and made it the dual-core month: Intel\'s Pentium D, its first consumer dual-core, and AMD\'s Athlon 64 X2.' },
    { kind: 'callout', tone: 'historical', title: 'History — May 2005, the dual-core month', text: 'May 2005: Intel ships the Pentium D, its first dual-core processor for consumer desktops; the same month, AMD ships the Athlon 64 X2. One month, two companies, the same bet - that the transistors Moore\'s law kept supplying were better spent on a second complete worker than on pushing one worker\'s clock further into the heat wall. Our own retelling: the move looks inevitable in hindsight and looked risky at the time, because it asked programmers - who had been handed faster single workers for twenty years - to start dividing their recipes. Much of the two decades of software engineering since has been the industry learning to cook that way.' },
    { kind: 'heading', text: "Moore's Law: The Engine Under the Story" },
    { kind: 'para', text: 'Every dated beat in this lesson so far - the 4004, the gigahertz race, the dual-core month - rides on one quiet economic fact: for half a century, the number of transistors an engineer could fit on a chip roughly doubled on a steady schedule, so the raw material of workers, caches and roads kept arriving in doubling instalments. The fact is called Moore\'s law, and it deserves to be met as a dated observation, not a slogan. Gordon Moore, co-founder of Intel, set it out in the magazine Electronics on 19 April 1965, in a paper titled "Cramming more components onto integrated circuits": watching the newest chips of his day, he projected that the component count would DOUBLE every year for the next decade. In 1975, ten years on and wiser about the physics, he revised the pace to a doubling about every TWO years - and that revised cadence is the one the industry rode thereafter.' },
    { kind: 'callout', tone: 'definition', title: "Definition — Moore's law (as revised)", text: "**Moore's law** is said to be the observation that the number of transistors on an integrated circuit doubles about every two years, at roughly constant cost per chip. Symbolically, a chip carrying $N$ transistors in year $y$ carries about $N \\times 2^{(y' - y)/2}$ transistors in year $y'$. It is a historical ENGINEERING TREND, not a law of physics - it held because armies of engineers made it hold, and its pace has visibly slowed in recent years." },
    { kind: 'para', text: 'Hold the honest caveat in mind even while we use the law with full ceremony, because examinations and interviews alike probe whether you know what kind of statement it is. Nothing in physics REQUIRES components to double; the doubling was an achievement repeatedly re-earned against harder and harder limits - and the re-earning has slowed, as the law\'s own author expected it eventually would. What follows is therefore not prophecy but bookkeeping: we take the 1975 cadence, apply it to a real census number, and see how close half a century of doubling lands to a chip that actually shipped. The closeness is the point of the exercise, and so is the method - this is the same check-by-arithmetic discipline the whole chapter runs on.' },
    { kind: 'derivation', title: "Predicting 2023 from the 4004 under Moore's law", statement: 'The Intel 4004, announced on 15 November 1971, carried 2,300 transistors - the first commercial single-chip microprocessor. Applying the revised Moore cadence of one doubling every two years, predict the transistor count for the year 2023, then compare it with a chip that actually shipped that year.', steps: [
      { label: 'Count the years', formula: '2023 - 1971 = 52', explanation: 'The prediction spans 2023 minus 1971, which is 52 years of engineering time.' },
      { label: 'Convert years to doublings', formula: '52 \\div 2 = 26', explanation: 'At one doubling every two years - the cadence Moore set in his 1975 revision - 52 years is exactly 26 doublings.' },
      { label: 'Scale the census', formula: '2{,}300 \\times 2^{26}', explanation: 'Each doubling multiplies the count by 2, so 26 doublings multiply the 4004 census by 2 to the 26.' },
      { label: 'Compute the power', formula: '2^{26} = 67{,}108{,}864', explanation: 'Powers of two, the ladder of chapter 3: 2 to the 26 is 67,108,864 - about 67 million.' },
      { label: 'Multiply out', formula: '2{,}300 \\times 67{,}108{,}864 = 154{,}350{,}387{,}200', explanation: 'The 4004 census times the doubling factor: 154,350,387,200 - the prediction for 2023.' },
    ], result: 'Under the revised law, $2{,}300 \\times 2^{26} = 154{,}350{,}387{,}200$ transistors for 2023 - about $154$ billion.' },
    { kind: 'equation', latex: '2{,}300 \\times 2^{26} = 2{,}300 \\times 67{,}108{,}864 = 154{,}350{,}387{,}200', note: "Moore's prediction for 2023, grown from the 4004's 1971 census at one doubling every two years" },
    { kind: 'para', text: 'Now the reckoning. In 2023 Apple\'s M2 Ultra shipped with 134 billion transistors - a real count, a real year, a real machine. The prediction said 154,350,387,200. Divide the honest way: $154{,}350{,}387{,}200 \\div 134{,}000{,}000{,}000 = 1.151869$ to six decimals, so the prediction overshot the actual by 15.186856 percent. Sit with that number for a moment: a straight-line doubling schedule, written down before most of the industry\'s employees were born, lands within fifteen percent of a chip delivered fifty-two years later - not because the future obeyed the past, but because thousands of engineers spent their careers making sure it roughly did. That is the grip of the law, told the only honest way it can be told: with both numbers on the table and the division shown.' },
    { kind: 'example', title: 'Illustration 6. Verify the verdict: how far above the M2 Ultra does the Moore prediction land?', steps: [
      'Take the two counts: prediction $154{,}350{,}387{,}200$, actual $134{,}000{,}000{,}000$.',
      'Divide: $154{,}350{,}387{,}200 \\div 134{,}000{,}000{,}000 = 1.151869$ to six decimals.',
      'Read the ratio: the prediction is 1.151869 times the actual - about fifteen percent above.',
      'Compute the overshoot exactly: $(1.151869 - 1) \\times 100 = 15.186856$ percent; in transistors, $154{,}350{,}387{,}200 - 134{,}000{,}000{,}000 = 20{,}350{,}387{,}200$.',
      'Hence the honest verdict: within 15.186856 percent after 52 years - close enough to astonish, far enough to remind you the law is a trend, not a theorem.',
    ] },
    { kind: 'figure', caption: "The Moore ladder: 2,300 transistors in 1971 doubling every two years - 73,600 by 1981, 2,355,200 by 1991, 75,366,400 by 2001, 2,411,724,800 by 2011 - to the highlighted 154,350,387,200 prediction for 2023, standing beside the 134 billion M2 Ultra that actually shipped. The verdict strip prices the gap: prediction over actual is 1.151869.", svg: cf42MooreLadderSvg() },
    { kind: 'para', text: 'The ladder\'s rungs are worth reading one by one, because each is a decade and each decade is exactly five doublings: $2^{5}$, $2^{10}$, $2^{15}$, $2^{20}$, $2^{26}$. Ten years of two-year doublings; fifty-two years of them for 2023. The same arithmetic rung-by-rung prices any year you are asked about - the exercises will send you up and down this ladder, and the engine checks every rung. And for contrast, run the counterfactual the engine also pins: had Moore never revised, had the 1965 yearly cadence held for the same 52 years, the multiplier would have been $2^{52}$, not $2^{26}$, and the prediction $2{,}300 \\times 2^{52} = 10{,}358{,}279{,}142{,}952{,}140{,}800$ - over ten quintillion transistors, about sixty-seven million times the biennial figure. The 1975 revision was not a footnote; it was the difference between a forecast and a fantasy.' },
    { kind: 'example', title: 'Illustration 7. The counterfactual: what would the 1965 yearly cadence have predicted for 2023, and how does it compare with the revised law?', steps: [
      'Take the unrevised cadence: one doubling every year for 52 years means $2^{52}$.',
      'Compute the power: $2^{52} = 4{,}503{,}599{,}627{,}370{,}496$.',
      'Multiply the census: $2{,}300 \\times 2^{52} = 10{,}358{,}279{,}142{,}952{,}140{,}800$ - ten quintillion, far past any real chip.',
      'Compare the two forecasts: the yearly prediction divided by the biennial one is exactly $2^{26} = 67{,}108{,}864$ - sixty-seven million times too high.',
      'Hence the honest reading of 1975: Moore\'s revision kept the law a description of engineering, and the revision is itself part of the story.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note — the law is the engine under every other number here', text: 'Look back over the lesson with the ladder in hand. The 4004\'s 2,300 transistors are the ground floor. The gigahertz race ran on transistors spent deepening one worker. The May 2005 dual-core month was transistors spent on a second worker. The cache of the next section is transistors spent on a pocket. Every design decision since 1965 has been the same question - what do we do with this year\'s doubling? - asked with different answers. That is why a lesson about naming a processor honestly must date a 1965 magazine paper: the name explains the inventory.' },
    { kind: 'heading', text: 'The Cache: The Pocket' },
    { kind: 'para', text: 'The honest loop, you will recall, begins with a fetch - a trip down the narrow street of the von Neumann bottleneck. We promised to point at the fix without teaching it, and here is the pointer. A **cache** is a small, fast memory INSIDE the processor, holding copies of the recently used instructions and data so that the most common fetches never leave the chip at all. The image to keep is domestic and exact: the cache is the POCKET, main memory (RAM) is the WAREHOUSE. You keep the handful of things you are using this minute in your pocket; the warehouse holds everything, and you go there only when the pocket comes up empty. Nobody carries a warehouse in a pocket, and no pocket holds a warehouse - the two sizes are the design.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — cache', text: 'A **cache** is said to be a small, fast memory inside the processor that holds copies of recently used data and instructions, so that repeated requests are served without a trip to main memory. Symbolically, the processor looks in the cache first; a **hit** is served at pocket speed, a **miss** pays the journey to RAM. Its size is deliberately modest - a fraction of RAM - and the reason is arithmetic, not oversight.' },
    { kind: 'para', text: 'Caches come in named levels, and the levels differ in who owns them and how big they are. Level 1 (L1) is the smallest and fastest, split so that each core keeps its own private pocket: think tens of kilobytes per core - small enough to answer in a couple of beats. Level 2 (L2) is each core\'s larger, slightly slower spare pocket: hundreds of kilobytes to a few megabytes per core in typical machines. Level 3 (L3) is the team\'s shared storeroom: tens of megabytes, common to all the cores, slower again but still far ahead of the street to RAM. Treat those bands as honest typical ranges, not exact pins - they vary by design and generation - but keep their ORDER cold: L1 smallest and fastest, then L2, then L3, each level bigger and slower than the last.' },
    { kind: 'table', caption: 'The cache levels, named with their honest typical size bands (ranges, not pins - designs vary).', head: ['Level', 'Who owns it', 'Typical size band', 'Character'], rows: [
      ['L1', 'each core, private', 'tens of KB per core', 'the pocket: answers in a couple of beats'],
      ['L2', 'each core, private', 'hundreds of KB to a few MB per core', 'the spare pocket: bigger, a little slower'],
      ['L3', 'all cores, shared', 'tens of MB', 'the team storeroom: shared, slower again'],
      ['RAM', 'the whole machine', 'many GB', 'the warehouse: at the end of the street'],
    ] },
    { kind: 'para', text: 'Why is the pocket so small when warehouses are so cheap per byte? Because the pocket is made of different cloth, and the cloth costs six times as much per bit. Cache is built from SRAM - static RAM - whose every stored bit is a little latch of SIX transistors, holding its value steady for as long as power flows, fast and unwasteful of time. Main memory is built from DRAM - dynamic RAM - where each bit is ONE transistor plus ONE capacitor, the transistor letting charge in and out and the capacitor holding it. That is the census to carry: six transistors a bit against one transistor and one capacitor a bit. Per byte, SRAM spends $6 \\times 8 = 48$ transistors where DRAM spends $1 \\times 8 + 1 \\times 8 = 16$ parts - the pocket\'s cloth costs six times the warehouse\'s, per bit, before speed even enters the argument.' },
    { kind: 'para', text: 'The DRAM design buys its cheapness with two habits that keep it out of pockets. First, the capacitor\'s charge leaks away, so every DRAM bit must be READ AND REWRITTEN on a constant refresh schedule just to remember itself - the warehouse employs a night shift whether or not anyone shops. Second, reading a DRAM bit is a slower, more ceremonial affair than reading a latch that answers in a beat. SRAM has neither habit: it holds without refreshing and answers almost as fast as the processor can ask. So the design writes itself - the small, dear, quick cloth goes in the pocket close to the workers; the large, cheap, slower cloth goes in the warehouse at the end of the street - and the full theory of WHY the pocket works so often (the principle called locality of reference) is the ground lesson 4.3 owns, and we happily leave at its door.' },
    { kind: 'example', title: 'Illustration 8. Price the cloth: per byte, how many transistors does SRAM spend, how many parts does DRAM spend, and what is the per-bit ratio?', steps: [
      'Take the census per bit: SRAM = 6 transistors; DRAM = 1 transistor + 1 capacitor.',
      'Scale to a byte: SRAM spends $6 \\times 8 = 48$ transistors per byte.',
      'Scale DRAM the same way: $1 \\times 8 + 1 \\times 8 = 8 + 8 = 16$ parts per byte.',
      'Compare per bit, the honest unit: $6 \\div 1 = 6$, so SRAM costs 6x the transistors of DRAM per bit.',
      'Hence 48 against 16 per byte, 6 against 1 per bit - the pocket\'s cloth is six times the price, which is why the pocket is small.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note — small is the design, not a compromise', text: 'Students ask why manufacturers do not simply fit bigger caches and be done with the bottleneck. The six-transistor answer: every cache megabyte is six times the silicon of a DRAM megabyte, and silicon is the one currency the whole chapter has been spending - on workers, on pockets, on everything. Cache size is a CHOICE about which parts of the Moore instalments to spend where, and the fact that engineers chose pocket-sized says how expensive the cloth is. Small is what the arithmetic wants.' },
    { kind: 'heading', text: 'Threads: One Worker, Two Streams' },
    { kind: 'para', text: 'One more named idea completes the census, and it is the one the market most enjoys blurring. A **thread** is a stream of work - one ordered sequence of instructions, one instance of the honest loop running through a program. Up to now we have said "one core, one stream", but the truth of modern cores is busier: a feature called simultaneous multithreading, SMT (Intel\'s brand name for its version is hyper-threading), lets a SINGLE core keep TWO streams moving at once - two program counters, two sets of bookkeeping, one set of execution stations shared between them.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — thread and SMT', text: 'A **thread** is said to be a single stream of work: one ordered sequence of instructions flowing through the honest loop. **Simultaneous multithreading (SMT)** is the feature that lets one core keep two such streams moving, so that when one stream stalls - waiting on the slow street to memory, most often - the other can use the beat. Symbolically, a 4-core processor with 2 threads per core runs $4 \\times 2 = 8$ streams: eight lines of work, four workers.' },
    { kind: 'para', text: 'Why would a worker ever be idle with work waiting? Because of the bottleneck named earlier: a core that misses its cache must stand at the street corner for hundreds of beats waiting for the warehouse, its execution stations empty. SMT fills exactly those gaps - the second stream slips into the vacated stations, and the beat that would have been wasted does something. Note the honest shape of the gain: it is a SALVAGE operation, converting idle beat-time into useful work, and its size depends entirely on how much idling there was to salvage. Programs that never stall have nothing to gain; heavily stalling ones can gain a great deal.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — a thread is not a core', text: 'The market\'s favourite blur: "8 threads" printed beside "8 cores" and read as the same thing. It is not. Threads share; cores own. An SMT thread borrows the ONE set of execution stations when the other stream stalls, so two threads on one core are not twice the worker - on a good day they are rather more than one worker, and on a day with no stalls they are exactly one worker split in two. $4 \\times 2 = 8$ streams on 4 cores is honest; calling it "an 8-core machine" is not. Examiners have a whole question family planted on this distinction.' },
    { kind: 'example', title: 'Illustration 9. An 8-core processor runs 2 threads per core, each core at 2.4 GHz. How many streams run, and what is the summed beat-time?', steps: [
      'Count the streams: $8$ cores $\\times 2$ threads $= 16$ streams of work - not 16 cores.',
      'Take each core\'s rate: 2.4 GHz per worker, threads or no threads.',
      'Sum the beat-time: $8 \\times 2.4 = 19.2$ GHz across the team.',
      'Check the honest ceiling: the 16 streams SHARE the 19.2 GHz of stations; they do not create 16 cores\' worth of them.',
      'Hence 16 streams on 8 workers, 19.2 GHz summed - headcount and stream-count priced separately, as they must be.',
    ] },
    { kind: 'heading', text: 'The Doorstep Books' },
    { kind: 'para', text: 'This lesson has named the processor, its clock, its cores, its pocket and its streams - deliberately stopping at the edge of theory. The deeper doors have owners on your shelf. \'Computer Organization and Architecture\' owns the full theory of what happens INSIDE the loop: pipelining (overlapping the four stages like a production line), the hazards that pipeline must dodge, instruction set architectures and the whole microarchitecture discipline of turning beats into work - when you meet those, you are across that doorstep, and this lesson\'s honest loop is the doorstep itself. \'Digital Logic Design\' owns the gate-level view beneath our six-transistor pocket: how latches are actually built and why six is the honest count. And the memory system the processor reaches into - the hierarchy, the locality principle, the full pricing of the pocket - is lesson 4.3, one step away in this same chapter. We name the doors and close them; each was opened at the right pace, and none was barged through.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this lesson meets the papers', text: 'Banking and SSC computer-awareness papers ask this lesson cold: what the clock rate measures (cycles per second - never "speed" or "power"); the stages of the fetch-decode-execute cycle in order (add write back for full credit); the definition of a core (a complete independent processing unit); Moore\'s law statement WITH its dates (19 April 1965, Electronics, revised 1975 to a doubling about every two years); why cache is small and fast (SRAM at six transistors a bit against DRAM\'s one transistor plus one capacitor); and the 4004 census (2,300 transistors, 15 November 1971, 740 kHz). School boards add the arithmetic: convert 5 GHz to a 0.2 ns beat, or divide out the 6756.7568 ratio. Cambridge 9618 and A-level-style asks (exam-style wording throughout - no claim to quote any real paper) prefer the reasoning: why gigahertz does not compare across designs, why clocks flattened (power, the heat wall) while cores multiplied, and why summed GHz needs divisible work. Drill the two ratios and the two Moore products until they are reflexes; the derivations, not just the answers, are what the marks reward.' },
    { kind: 'terms', items: [
      { term: 'processor (CPU)', def: 'the component that fetches instructions from memory, decodes them, executes them and writes back the results, repeating billions of times a second - a dedicated arithmetic and control station, not a "brain".' },
      { term: 'instruction cycle (machine cycle)', def: 'the four-stage loop fetch, decode, execute, write back; one complete turn of the wheel per instruction.' },
      { term: 'clock rate', def: 'the number of clock cycles per second, in hertz; 1 GHz = one billion cycles/s. It paces the loop - it does not measure work done.' },
      { term: 'cycle period', def: 'the length of one beat, $T = 1/f$: 1 ns at 1 GHz, 0.2 ns at 5 GHz, 1.3513514 microseconds at the 4004\'s 740 kHz.' },
      { term: 'von Neumann bottleneck', def: 'the shared, one-at-a-time road between processor and memory in the stored-program design; named for the architecture, popularised as a complaint by John Backus\'s 1977 Turing lecture.' },
      { term: 'core', def: 'a complete worker station - its own fetch, decode and execute - running the honest loop independently; 4 cores x 3 GHz = 12 GHz of summed beat-time, only for work that divides.' },
      { term: 'cache', def: 'a small, fast memory inside the processor holding copies of recently used data and instructions; L1 tens of KB per core, L2 hundreds of KB to a few MB, L3 tens of MB shared.' },
      { term: 'SRAM', def: 'static RAM, the cache cloth: six transistors per bit, fast, no refresh - and six times the transistors of DRAM per bit, which is why pockets are small.' },
      { term: 'DRAM', def: 'dynamic RAM, the main-memory cloth: one transistor plus one capacitor per bit; cheap and dense, but charge leaks so it must be refreshed.' },
      { term: 'thread', def: 'a single stream of work; SMT lets one core keep two streams moving so idle beat-time gets used - it is not a second core.' },
      { term: "Moore's law", def: 'Gordon Moore\'s observation, printed 19 April 1965 in Electronics and revised in 1975: transistor counts double about every two years - an engineering trend, not a law of physics.' },
      { term: 'gigahertz race', def: 'the sprint to 1 GHz: AMD Athlon first on 6 March 2000, Intel two days later - ended by the power-and-heat wall, answered in May 2005 by the dual-core month.' },
    ] },
    { kind: 'formula', name: 'Cycle period (the beat)', latex: 'T = \\frac{1}{f}', note: '1 GHz = 10^9 cycles/s gives a 1 ns beat; 5 GHz gives 0.2 ns; the 4004\'s 740 kHz gives 1.3513514 microseconds.' },
    { kind: 'formula', name: 'Clock ratios against the 4004', latex: '\\frac{5 \\times 10^{9}}{740{,}000} = 6756.7568,\\quad \\frac{10^{9}}{740{,}000} = 1351.3514', note: 'a 5 GHz core makes 6756.7568 beats inside one 4004 beat; the 1 GHz milestone machine makes 1351.3514.' },
    { kind: 'formula', name: "Moore's law scaling", latex: 'N(y\') = N(y) \\times 2^{(y\' - y)/2}', note: 'doubling every two years, the 1975 revision: 2,300 in 1971 gives 2,300 x 2^26 = 154,350,387,200 for 2023.' },
    { kind: 'formula', name: 'Summed beat-time', latex: '\\text{summed GHz} = \\text{cores} \\times \\text{clock}', note: '4 x 3 = 12 GHz, 2 x 3 = 6 GHz, 8 x 2.4 = 19.2 GHz - at most, and only for work that divides.' },
    { kind: 'formula', name: 'Prediction against actual', latex: '\\frac{154{,}350{,}387{,}200}{134 \\times 10^{9}} = 1.151869', note: 'the Moore prediction for 2023 over the M2 Ultra actual: 15.186856 percent above after 52 years.' },
    { kind: 'quiz', title: 'Check yourself — five questions, one correct option each', items: [
      { q: 'A processor is advertised at 5 GHz. What does that number actually measure?',
        options: [
          'Five billion instructions completed every second',
          'The electrical power the processor draws at full load',
          'Five times the work rate of a 1 GHz machine on the same program',
          'Five billion clock cycles per second - beats of the metronome, nothing more',
        ],
        answer: 3,
        explain: 'Option A fails because cycles are not instructions: complex instructions can take many beats, and a well-designed core can also finish work faster than one-per-beat - the beat paces the loop, it does not count completions. Option B fails because hertz is a frequency, not a wattage; power is a separate specification, and the heat wall of this lesson is precisely what happens when the two are confused. Option C fails because comparing rates across designs compares metronomes, not musicians - the 1 GHz machine may do more per beat, so "five times the work" is unwarranted even in principle. Option D is correct: 5 GHz means $5 \\times 10^{9}$ cycles each second, one beat every 0.2 ns, and NOTHING else - the honest reading this lesson drilled.' },
      { q: 'How long does one cycle of a 5 GHz processor last?',
        options: [
          '0.2 ns',
          '2 ns',
          '5 ns',
          '0.5 ns',
        ],
        answer: 0,
        explain: 'Option A is correct: $T = 1/f = 1/(5 \\times 10^{9})$ s, which is $0.2 \\times 10^{-9}$ s - a fifth of the 1 ns beat at 1 GHz, pinned throughout this lesson. Option B fails by a factor of ten: 2 ns is the beat at 500 MHz, an old clock, not a 5 GHz one - a slipped decimal, not a slipped memory. Option C fails by reading the rate as the period: 5 GHz is not a 5 ns beat; the reciprocal of five billion per second is a fifth of a nanosecond, a billion times shorter. Option D fails as the beat of a 2 GHz machine - the halving mistake, forgetting that the 2 GHz beat (0.5 ns) halves again to reach 5 GHz speed.' },
      { q: 'The 4004 of 1971 ran at 740 kHz. A modern core runs at 5 GHz. How many modern beats fit inside one beat of the 4004?',
        options: [
          '1351.3514',
          '6756.7568',
          '675.6757',
          '5,000,000',
        ],
        answer: 1,
        explain: 'Option A fails because 1351.3514 is the ratio against the 1 GHz MILESTONE machine of March 2000, not against 5 GHz - it is exactly one-fifth of the answer asked here. Option B is correct: $5{,}000{,}000{,}000 \\div 740{,}000 = 6756.7568$ to four decimals, the pinned ratio of this lesson, checkable either as a division of rates or as $5 \\times 10^{9}$ beats packed into the 4004\'s 1.3513514 microsecond beat. Option C fails by another factor of ten: 675.6757 is what you get from 500 MHz against 740 kHz - the decimal slipped one place. Option D fails as a round-number guess: five million is the ratio of 5 GHz to 1 kHz, a kilohertz clock that never featured in this story at all.' },
      { q: "Moore's law, as printed on 19 April 1965 and revised in 1975, says what?",
        options: [
          'Processor clock rates double every year',
          'Power consumption halves every eighteen months',
          'The number of transistors on an integrated circuit doubles about every two years',
          'Memory capacity doubles every two years, and cache grows to match',
        ],
        answer: 2,
        explain: 'Option A fails on both content and date: Moore\'s paper was about COMPONENT COUNT, not clocks - and clock rates famously flattened at the heat wall, which no doubling law survived. Option B fails because no such power law exists; power per chip ROSE as clocks climbed, which is the entire reason the gigahertz race ended. Option C is correct: Gordon Moore, in Electronics on 19 April 1965, projected component doubling yearly and revised the pace in 1975 to about every two years - the cadence that carried 2,300 transistors of 1971 to a 154,350,387,200 prediction for 2023. Option D fails by swapping the subject: memory and cache ride the same manufacturing trends but the law as stated is about transistors on a chip - DRAM\'s one-transistor-plus-capacitor census is a different paragraph of a different lesson.' },
      { q: 'Why is cache deliberately small while RAM is measured in gigabytes?',
        options: [
          'Because cache sits outside the processor, next to the RAM on the motherboard',
          'Because SRAM spends six transistors per bit against DRAM\'s one transistor plus one capacitor, so the pocket\'s cloth costs six times more per bit',
          'Because cache is built from DRAM cells that must be constantly refreshed',
          'Because larger memories are always faster, so cache trades size for speed',
        ],
        answer: 1,
        explain: 'Option A fails on geography: the cache lives INSIDE the processor - that is the whole point of the pocket - and the motherboard\'s DIMM slots hold the RAM, not the cache. Option B is correct: SRAM\'s six-transistor latch against DRAM\'s one transistor plus one capacitor is a sixfold cost per bit, $48$ transistors per byte against $16$ parts, and six-times cloth does not make warehouse-sized pockets. Option C fails by reversing the materials: it is DRAM that leaks and refreshes; SRAM holds its value steady while power flows, which is exactly why its cell is bigger. Option D fails because the true order is backwards - larger memories are SLOWER, and cache is fast because it is small and near, not because size was traded away for speed as two independent dials.' },
    ] },
    { kind: 'exercises', title: 'Graded practice — four levels, fifteen questions', sets: [
      { level: 'L1', questions: [
        { q: 'Name the four stages of the processor\'s honest loop in order, with one phrase each saying what the stage does.',
          solution: [
            'Take the loop in its fixed order: fetch, decode, execute, write back.',
            'Fetch takes the next instruction from memory, along the shared road.',
            'Decode reads the pattern and works out what is being asked of the station.',
            'Execute performs the arithmetic or logic on the local values.',
            'Write back files the result where it must go, and the loop turns again.',
          ],
          answer: 'fetch, decode, execute, write back - take, read, do, keep',
          figures: [
            { caption: 'The cycle strip for this solution: fetch, decode, execute and write back as four chips with their one-phrase meanings, and the arrow returning from the last to the first - the loop restarting billions of times a second.', svg: cf42SolCycleStripSvg() },
          ] },
        { q: 'A core runs at 3 GHz. How long is one of its cycles, to seven decimals?',
          solution: [
            'Take the cycle-period law: $T = 1/f$ seconds.',
            'Substitute: $T = 1/(3 \\times 10^{9})$ s.',
            'Convert to nanoseconds: $T = 0.3333333$ ns to seven decimals.',
            'Check the neighbourhood: it sits between the 0.5 ns of 2 GHz and the 0.25 ns of 4 GHz, as it must.',
          ],
          answer: 'one 3 GHz cycle lasts 0.3333333 ns' },
        { q: 'State the 4004 census: the announcement date, the transistor count, and the clock rate with its cycles per second.',
          solution: [
            'Take the date first: announced 15 November 1971 - the first commercial single-chip microprocessor.',
            'Take the census: 2,300 transistors on the chip.',
            'Take the clock: 740 kHz, which is 740,000 cycles per second.',
            'So, one 4004 beat lasted $1/740{,}000$ s $= 1.3513514$ microseconds.',
          ],
          answer: '15 November 1971; 2,300 transistors; 740 kHz = 740,000 cycles/s' },
        { q: 'A dual-core processor has each core clocked at 3 GHz. What summed beat-time does it offer, and under what condition can work actually collect it?',
          solution: [
            'Take the headcount and the rate: 2 cores, 3 GHz each.',
            'Multiply: $2 \\times 3 = 6$ GHz of summed beat-time.',
            'Check the condition: the sum is available only to work that divides across the two cores.',
            'So, one single stream still runs at 3 GHz - the second worker is a spectator to it.',
          ],
          answer: '6 GHz summed, only for parallelisable work' },
        { q: 'Price the pocket\'s cloth: how many transistors does one byte of SRAM spend, how many parts does one byte of DRAM spend, and what is the per-bit ratio?',
          solution: [
            'Take the per-bit census: SRAM = 6 transistors; DRAM = 1 transistor + 1 capacitor.',
            'Scale SRAM to a byte: $6 \\times 8 = 48$ transistors.',
            'Scale DRAM to a byte: $1 \\times 8 + 1 \\times 8 = 8 + 8 = 16$ parts.',
            'Compare per bit: $6 \\div 1 = 6$ - six times the transistors.',
          ],
          answer: '48 transistors vs 16 parts per byte; 6x per bit',
          figures: [
            { caption: 'The pocket\'s cloth for this solution: one SRAM bit drawn as six transistor circles against one DRAM bit drawn as a transistor plus a capacitor - the sixfold cost per bit made visible, with the per-byte arithmetic in the strip.', svg: cf42SolPocketSvg() },
          ] },
      ] },
      { level: 'L2', questions: [
        { q: 'Compute the beat lengths at 2 GHz and 4 GHz, and say how many times shorter the 5 GHz beat is than the 1 GHz beat.',
          solution: [
            'Take the law $T = 1/f$ for each rate.',
            'So, at 2 GHz: $T = 1/(2 \\times 10^{9}) = 0.5$ ns.',
            'Now, at 4 GHz: $T = 1/(4 \\times 10^{9}) = 0.25$ ns.',
            'Compare the ends: $1 \\div 0.2 = 5$, so the 0.2 ns beat is one-fifth of the 1 ns beat.',
          ],
          answer: '0.5 ns and 0.25 ns; the 5 GHz beat is 5x shorter than the 1 GHz beat' },
        { q: 'The 1 GHz milestone machine of 6 March 2000 against the 4004\'s 740 kHz: compute the ratio, pinned to four decimals, and check it against the 5 GHz ratio.',
          solution: [
            'Take the rates: $1{,}000{,}000{,}000$ against $740{,}000$ cycles/s.',
            'Divide: $1{,}000{,}000{,}000 \\div 740{,}000 = 1351.351351\\ldots$',
            'Pin it: 1351.3514 to four decimals.',
            'Check against the 5 GHz pin: $1351.3514 \\times 5 = 6756.7568$ - five times, as the rates are five times.',
          ],
          answer: '1351.3514 times; exactly one-fifth of the 6756.7568 pin',
          figures: [
            { caption: 'The clock-ratio strip for this solution: log-width bars for the 4004 at 740 kHz, the 1 GHz machine of 2000 and the 5 GHz core, with both pinned ratios - 6756.7568 and 1351.3514 - computed in the strip.', svg: cf42SolClockRatioSvg() },
          ] },
        { q: 'A processor has 8 cores at 2.4 GHz each and runs 2 threads per core. How many streams of work does it carry, and what is its summed beat-time?',
          solution: [
            'Count the streams: $8 \\times 2 = 16$ streams - and still only 8 cores.',
            'Take each core\'s rate: 2.4 GHz.',
            'Sum the beat-time: $8 \\times 2.4 = 19.2$ GHz.',
            'Check the honesty: the 16 streams share the 8 workers\' stations; no stream is a core.',
          ],
          answer: '16 streams on 8 cores; 19.2 GHz summed',
          figures: [
            { caption: 'The summed beat-time bars for this solution: 1, 2, 4 and 8-core rows with the 8 x 2.4 = 19.2 GHz row on the same scale, and the caution that a 4-core 3 GHz machine is not one 12 GHz core.', svg: cf42SolCoreSumSvg() },
          ] },
        { q: 'Name the three cache levels, say who owns each, and give the honest typical size band for each.',
          solution: [
            'Take L1: each core\'s private pocket, typically tens of KB per core - the smallest and fastest.',
            'Take L2: each core\'s spare pocket, typically hundreds of KB to a few MB per core.',
            'Take L3: the team\'s shared storeroom, typically tens of MB common to all cores.',
            'Check the order: each level is bigger and slower than the one before, with RAM the warehouse at the end of the street.',
          ],
          answer: 'L1 tens of KB private per core; L2 hundreds of KB to a few MB private; L3 tens of MB shared' },
      ] },
      { level: 'L3', questions: [
        { q: "Starting from the 4004's 2,300 transistors in 1971, apply Moore's revised cadence to predict the count for 1991, showing the doubling factor.",
          solution: [
            'Count the years: $1991 - 1971 = 20$ years.',
            'Convert to doublings at two years each: $20 \\div 2 = 10$, so the factor is $2^{10}$.',
            'Compute the power: $2^{10} = 1024$.',
            'Multiply the census: $2{,}300 \\times 1024 = 2{,}355{,}200$.',
          ],
          answer: '2,300 x 2^10 = 2,355,200 transistors for 1991',
          figures: [
            { caption: 'The Moore staircase for this solution: the rungs from 1971 to 2021 at five doublings a decade, with the 1991 rung at 2,355,200 on the climb and the 2021 rung at 77,175,193,600 highlighted.', svg: cf42SolMooreStairsSvg() },
          ] },
        { q: 'Four independent jobs of 3 seconds each run on four 3 GHz cores. Then a fifth independent 3-second job arrives. When does the last job finish, and why does the fifth job not slow the first four?',
          solution: [
            'Take the first four jobs: one per core, so all finish together after $3$ seconds.',
            'Now, the fifth job must wait for a free worker, since 5 jobs share 4 cores.',
            'So, one core runs two jobs in sequence: the fifth finishes at $3 + 3 = 6$ seconds.',
            'Check the others: their cores were never borrowed, so they still finish at 3 seconds.',
            'Hence 6 seconds for the last, with the honest reading: the team divides finite workers, it does not conjure new ones.',
          ],
          answer: 'first four finish at 3 s; the fifth at 6 s - the fifth waits for a free worker' },
        { q: "Predict the 2021 rung of the Moore ladder from the 4004's 2,300 transistors, and verify that one more doubling reaches the 2023 pin.",
          solution: [
            'Count the years to 2021: $2021 - 1971 = 50$ years.',
            'Convert at two years a doubling: $50 \\div 2 = 25$, so the factor is $2^{25} = 33{,}554{,}432$.',
            'Multiply: $2{,}300 \\times 33{,}554{,}432 = 77{,}175{,}193{,}600$ for 2021.',
            'Now, 2023 is one more doubling: $77{,}175{,}193{,}600 \\times 2 = 154{,}350{,}387{,}200$ - the 2023 pin, arrived at from below.',
          ],
          answer: '2,300 x 2^25 = 77,175,193,600 for 2021; doubled, it gives the 154,350,387,200 pin' },
        { q: 'The 2023 prediction is 154,350,387,200 and the M2 Ultra actual is 134 billion. Compute the ratio, the percentage overshoot, and the absolute difference.',
          solution: [
            'Take the ratio: $154{,}350{,}387{,}200 \\div 134{,}000{,}000{,}000 = 1.151869$ to six decimals.',
            'Convert to the overshoot: $(1.151869 - 1) \\times 100 = 15.186856$ percent above the actual.',
            'Take the difference in transistors: $154{,}350{,}387{,}200 - 134{,}000{,}000{,}000 = 20{,}350{,}387{,}200$.',
            'Hence the verdict in three forms: 1.151869 times, 15.186856 percent over, about 20.35 billion transistors wide.',
          ],
          answer: '1.151869; 15.186856 percent; 20,350,387,200 transistors' },
      ] },
      { level: 'L4', questions: [
        { q: "The counterfactual: had Moore never revised, the 1965 yearly cadence would run for the same 52 years. Compute that 2023 prediction, and by what exact factor it exceeds the revised law's prediction.",
          solution: [
            'Take the yearly cadence: 52 doublings, so the factor is $2^{52}$.',
            'Compute the power: $2^{52} = 4{,}503{,}599{,}627{,}370{,}496$.',
            'Multiply the census: $2{,}300 \\times 2^{52} = 10{,}358{,}279{,}142{,}952{,}140{,}800$ - ten quintillion and more.',
            'Divide the two forecasts: $2^{52} \\div 2^{26} = 2^{26} = 67{,}108{,}864$ times the biennial figure.',
            'Hence the 1975 revision was the difference between a forecast and a fantasy: sixty-seven million times, on one decision.',
          ],
          answer: '10,358,279,142,952,140,800 predicted; exactly 2^26 = 67,108,864 times the revised prediction' },
        { q: 'Exam-style synthesis. Tell the dated story of the metronome from 1971 to 2005 with every pinned date and number, explain honestly why clocks flattened while cores multiplied, and close by computing how many 5 GHz beats fit inside one beat of the 4004.',
          solution: [
            'Open with the ancestor: the 4004, announced 15 November 1971, 2,300 transistors, clocked at 740 kHz - 740,000 cycles/s, a 1.3513514 microsecond beat.',
            'Take the race: AMD\'s Athlon reached 1 GHz first on 6 March 2000; Intel followed two days later, on 8 March 2000.',
            'Now, the honest end: power and heat - every beat charges the chip\'s gates, so faster clocks burn past what cooling carries - put a stop to the climb, the heat wall.',
            'So, the answer to the wall: May 2005, the dual-core month - Intel\'s Pentium D and AMD\'s Athlon 64 X2 - spending Moore\'s doubling (2,300 to 154,350,387,200 predicted for 2023) on more workers at steadier clocks, such as 4 x 3 = 12 GHz summed.',
            'Close with the division: $5{,}000{,}000{,}000 \\div 740{,}000 = 6756.7568$ beats of a 5 GHz core inside every single 4004 beat.',
          ],
          answer: '4004 (15 Nov 1971, 740 kHz) - AMD 1 GHz first (6 Mar 2000), Intel two days later - heat wall - May 2005 dual-core month; 6756.7568 beats per 4004 beat' },
      ] },
    ] },
    /* CF42-BLOCKS-TAIL */
  ],
}
