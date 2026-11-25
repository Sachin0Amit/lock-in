import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf43.ts — CS RUN 7 seat cf43 (the LIBRARY lesson).
 *
 * Lesson 4.3 'The First Memory Hierarchy' of Computer Fundamentals
 * chapter 4 'Inside the Box'. The speed/cost/size trade told with one
 * honest ladder: the impossible wish (FAST, BIG, CHEAP - pick two), RAM
 * and ROM named honestly (uniform-time promise, volatility,
 * read-mostly firmware), DRAM's 1T1C cell against SRAM's 6T and the
 * JEDEC 64 ms refresh window, the latency census (0.5 ns / 7 ns /
 * 100 ns / 150 μs / 10 ms / 150 ms) with every ratio engine-pinned
 * (14, 14.2857, 200, 1,500, 66.6667, 15), the human ladder at the
 * one-second baseline (14 s, 200 s, 3.472222 days, 7.605141 months,
 * 9.5064263 years), the storage shelf's own history (RAMAC, 14
 * September 1956, 5,000,000 x 6/8 = 3,750,000 bytes), temporal and
 * spatial locality, and virtual memory named and LEFT CLOSED. The
 * hierarchy theory (miss rates, policies) rides 'Computer Organization
 * and Architecture'; virtual memory rides 'Operating Systems'; the
 * gate-level view rides 'Digital Logic Design'.
 *
 * Every number printed here is pinned green by v-cf43.ts (72 engine
 * checks ran GREEN before this prose was written; the pin block closes
 * the ring). All figures are self-contained computed SVGs in the house
 * palette; every geometry constant is derived, never eyeballed.
 * Study-never-reproduce: every roster, witness, figure, Illustration,
 * quiz item and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const c43 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f43 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order (x, y, weight, size,
   fill, anchor) so the engine's clip audit can parse every label */
function cf43T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* ================================================================== */
/* BODY FIGURE 1 — the ladder pyramid (8 shelves, log-spaced widths)  */
/* with the FAST/BIG/CHEAP triangle beside it                          */
/* ================================================================== */
function cf43PyramidSvg(): string {
  const W = 760
  const H = 420
  const shelves = [
    { name: 'registers', lat: 'one beat', fill: c43.white, stroke: c43.struct },
    { name: 'L1', lat: '0.5 ns', fill: c43.white, stroke: c43.teal },
    { name: 'L2', lat: '7 ns', fill: c43.paper, stroke: c43.teal },
    { name: 'L3', lat: 'tens of ns', fill: c43.white, stroke: c43.teal },
    { name: 'RAM', lat: '100 ns', fill: c43.panelA, stroke: c43.accent },
    { name: 'SSD', lat: '150 μs', fill: c43.panelB, stroke: c43.conn },
    { name: 'HDD', lat: '10 ms', fill: c43.panelA, stroke: c43.warn },
    { name: 'cloud', lat: '150 ms', fill: c43.white, stroke: c43.ink },
  ]
  const cx = 230
  const top0 = 84
  const stride = 34
  const shelfH = 30
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f43}" role="img" aria-label="The memory hierarchy drawn as a ladder of eight shelves: registers, L1, L2, L3, RAM, SSD, HDD and cloud, each shelf wider than the one above, with the latency census printed beside each shelf: one beat, 0.5 ns, 7 ns, tens of ns, 100 ns, 150 μs, 10 ms and 150 ms. Beside the ladder stands the wish as a triangle: fast, big, cheap - pick any two - with each pair and the clause it forfeits listed inside. A strip beneath carries the full census line.">`)
  s.push(cf43T(W / 2, 30, 12, c43.teal, 'middle', 'THE MEMORY HIERARCHY - THE LADDER AND THE WISH', true))
  s.push(cf43T(W / 2, 48, 9.5, c43.tealInk, 'middle', 'each rung answers slower and holds more - the wish: fast, big, cheap, pick any two'))
  shelves.forEach((sh, k) => {
    const w = 56 + 30 * k
    const top = top0 + k * stride
    const midY = top + 20
    s.push(`<rect x="${cx - w / 2}" y="${top}" width="${w}" height="${shelfH}" rx="5" fill="${sh.fill}" stroke="${sh.stroke}" stroke-width="2"/>`)
    s.push(cf43T(cx, midY, 9.5, c43.ink, 'middle', sh.name, true))
    s.push(cf43T(84, midY, 9.5, c43.tealInk, 'end', sh.lat))
  })
  // the wish triangle beside the ladder
  const ax = 560
  s.push(`<polygon points="${ax},96 420,340 700,340" fill="${c43.panelB}" stroke="${c43.conn}" stroke-width="2"/>`)
  s.push(cf43T(ax, 74, 11, c43.conn, 'middle', 'pick any two', true))
  s.push(cf43T(ax, 92, 10, c43.conn, 'middle', 'FAST'))
  s.push(cf43T(ax, 180, 9.5, c43.ink, 'middle', 'FAST + BIG'))
  s.push(cf43T(ax, 198, 9.5, c43.ink, 'middle', 'forfeits CHEAP'))
  s.push(cf43T(ax, 226, 9.5, c43.ink, 'middle', 'FAST + CHEAP'))
  s.push(cf43T(ax, 244, 9.5, c43.ink, 'middle', 'forfeits BIG'))
  s.push(cf43T(ax, 272, 9.5, c43.ink, 'middle', 'BIG + CHEAP'))
  s.push(cf43T(ax, 290, 9.5, c43.ink, 'middle', 'forfeits FAST'))
  s.push(cf43T(ax, 358, 9.5, c43.tealInk, 'middle', 'BIG and CHEAP are the bottom corners'))
  s.push(cf43T(560 - 130, 128, 10, c43.conn, 'middle', 'BIG', true))
  s.push(cf43T(560 + 130, 128, 10, c43.conn, 'middle', 'CHEAP', true))
  s.push(`<rect x="16" y="370" width="${W - 32}" height="44" rx="8" fill="${c43.panelB}" stroke="${c43.conn}" stroke-width="2"/>`)
  s.push(cf43T(W / 2, 388, 10, c43.ink, 'middle', 'the census: one beat - 0.5 ns - 7 ns - 100 ns - 150 μs - 10 ms - 150 ms'))
  s.push(cf43T(W / 2, 406, 9.5, c43.tealInk, 'middle', 'each level holds what the level above uses most - fast and dear at the top, slow and cheap at the bottom'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 2 — the human ladder: each wait rescaled so L1 = 1 s,  */
/* drawn on an honest log scale (one decade per 34 px)                 */
/* ================================================================== */
function cf43HumanSvg(): string {
  const W = 760
  const H = 430
  const baseY = 330
  const perDecade = 32
  const rungs = [
    { name: 'L1 hit', sec: 1, label: '1 s', fill: c43.white, stroke: c43.struct },
    { name: 'L2', sec: 14, label: '14 s', fill: c43.white, stroke: c43.teal },
    { name: 'RAM', sec: 200, label: '200 s', fill: c43.panelA, stroke: c43.accent },
    { name: 'SSD', sec: 300000, label: '3.47 days', fill: c43.panelB, stroke: c43.conn },
    { name: 'HDD', sec: 20000000, label: '7.6 months', fill: c43.panelA, stroke: c43.warn },
    { name: 'ocean RTT', sec: 300000000, label: '9.5 years', fill: c43.white, stroke: c43.ink },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f43}" role="img" aria-label="The human ladder: six bars on a logarithmic scale, each wait rescaled by a factor of two billion so that one L1 hit takes one second. The bars rise from the baseline at 1 s through 14 s for L2, 200 s for RAM, 3.47 days for the SSD, 7.6 months for the HDD seek and 9.5 years for one ocean round trip. Gridlines mark the powers of ten from one second to one hundred million seconds, so every equal step multiplies the wait by ten.">`)
  s.push(cf43T(W / 2, 28, 12, c43.teal, 'middle', 'THE HUMAN LADDER - ONE SECOND AT THE TOP', true))
  s.push(cf43T(W / 2, 46, 9.5, c43.tealInk, 'middle', 'each wait rescaled so one L1 hit takes one second - the scale is x 2,000,000,000'))
  for (let k = 0; k <= 8; k++) {
    const gy = baseY - k * perDecade
    s.push(`<line x1="98" y1="${gy}" x2="744" y2="${gy}" stroke="${c43.faint}" stroke-width="1.5"/>`)
    s.push(cf43T(92, gy + 3, 9, c43.tealInk, 'end', ['1 s', '10 s', '100 s', '1,000 s', '10,000 s', '100,000 s', '1,000,000 s', '10,000,000 s', '100,000,000 s'][k]))
  }
  rungs.forEach((r, k) => {
    const bx = 110 + k * 108
    const h = Math.max(4, Math.log10(r.sec) * perDecade)
    const top = baseY - h
    s.push(`<rect x="${bx}" y="${top.toFixed(2)}" width="56" height="${h.toFixed(2)}" rx="4" fill="${r.fill}" stroke="${r.stroke}" stroke-width="2"/>`)
    s.push(cf43T(bx + 28, top - 8, 10, c43.ink, 'middle', r.label, true))
    s.push(cf43T(bx + 28, 348, 9.5, c43.tealInk, 'middle', r.name))
  })
  s.push(`<line x1="98" y1="${baseY}" x2="744" y2="${baseY}" stroke="${c43.ink}" stroke-width="2"/>`)
  s.push(`<rect x="16" y="370" width="${W - 32}" height="44" rx="8" fill="${c43.panelB}" stroke="${c43.conn}" stroke-width="2"/>`)
  s.push(cf43T(W / 2, 388, 10, c43.ink, 'middle', 'a logarithmic scale: every gridline step multiplies the wait by ten'))
  s.push(cf43T(W / 2, 406, 9.5, c43.tealInk, 'middle', 'L1 1 s - L2 14 s - RAM 200 s (3 min 20 s) - SSD 3.47 days - HDD 7.6 months - ocean 9.5 years'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 3 — DRAM's 1T1C cell (leak + 64 ms refresh) beside     */
/* SRAM's 6T cell                                                      */
/* ================================================================== */
function cf43CellsSvg(): string {
  const W = 760
  const H = 360
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f43}" role="img" aria-label="The two cloths a bit can wear. Left: the DRAM cell, one transistor plus one capacitor, with the word line selecting the row, the bit line carrying the value, the capacitor drawn as two plates holding the charge, a red arrow marking the leak, and a dashed refresh loop labelled every row re-topped within 64 ms. Right: the SRAM cell, six transistor boxes labelled T in two rows of three, which hold the bit with no capacitor, no leak and no refresh. A strip beneath says the pocket wears SRAM and the warehouse wears DRAM.">`)
  s.push(cf43T(W / 2, 28, 12, c43.teal, 'middle', 'TWO CLOTHS FOR A BIT - DRAM 1T1C AND SRAM 6T', true))
  // DRAM panel
  s.push(cf43T(190, 56, 11, c43.ink, 'middle', 'DRAM - THE 1T1C CELL', true))
  s.push(`<line x1="70" y1="100" x2="310" y2="100" stroke="${c43.ink}" stroke-width="2"/>`)
  s.push(cf43T(74, 92, 9.5, c43.tealInk, 'start', 'word line'))
  s.push(`<line x1="110" y1="80" x2="110" y2="280" stroke="${c43.ink}" stroke-width="2"/>`)
  s.push(cf43T(66, 160, 9.5, c43.tealInk, 'end', 'bit line'))
  s.push(`<rect x="95" y="112" width="30" height="28" rx="4" fill="${c43.white}" stroke="${c43.struct}" stroke-width="2"/>`)
  s.push(cf43T(110, 131, 11, c43.ink, 'middle', 'T', true))
  s.push(`<line x1="110" y1="140" x2="110" y2="170" stroke="${c43.ink}" stroke-width="2"/>`)
  s.push(`<line x1="85" y1="170" x2="135" y2="170" stroke="${c43.ink}" stroke-width="2.5"/>`)
  s.push(`<line x1="85" y1="190" x2="135" y2="190" stroke="${c43.ink}" stroke-width="2.5"/>`)
  s.push(cf43T(170, 182, 9.5, c43.tealInk, 'start', 'capacitor'))
  s.push(`<line x1="150" y1="132" x2="150" y2="214" stroke="${c43.warn}" stroke-width="2" stroke-dasharray="5 4"/>`)
  s.push(`<polygon points="146,214 154,214 150,222" fill="${c43.warn}"/>`)
  s.push(cf43T(160, 210, 9.5, c43.warn, 'start', 'the leak'))
  s.push(`<polyline points="230,225 230,245 265,245 265,228" fill="none" stroke="${c43.teal}" stroke-width="2" stroke-dasharray="5 4"/>`)
  s.push(`<polygon points="261,228 269,228 265,220" fill="${c43.teal}"/>`)
  s.push(cf43T(228, 262, 9.5, c43.ink, 'middle', 'refresh: every row re-topped within 64 ms'))
  s.push(cf43T(190, 290, 9.5, c43.tealInk, 'middle', 'one transistor + one capacitor per bit'))
  s.push(`<line x1="360" y1="60" x2="360" y2="290" stroke="${c43.faint}" stroke-width="1.5"/>`)
  // SRAM panel
  s.push(cf43T(550, 56, 11, c43.ink, 'middle', 'SRAM - THE 6T CELL', true))
  const tx = [430, 474, 518]
  const ty = [110, 160]
  ty.forEach((yy) => tx.forEach((xx) => {
    s.push(`<rect x="${xx}" y="${yy}" width="34" height="34" rx="5" fill="${c43.white}" stroke="${c43.struct}" stroke-width="2"/>`)
    s.push(cf43T(xx + 17, yy + 22, 11, c43.ink, 'middle', 'T', true))
  }))
  s.push(cf43T(550, 220, 10, c43.ink, 'middle', 'six transistors per bit', true))
  s.push(cf43T(550, 240, 9.5, c43.tealInk, 'middle', 'no capacitor - no leak - no refresh'))
  s.push(cf43T(550, 258, 9.5, c43.tealInk, 'middle', 'holds its bit while power stays on'))
  s.push(`<rect x="16" y="300" width="${W - 32}" height="44" rx="8" fill="${c43.panelB}" stroke="${c43.conn}" stroke-width="2"/>`)
  s.push(cf43T(W / 2, 318, 10, c43.ink, 'middle', 'why the pocket is small: the 6T cloth costs six times the 1T1C cloth for every bit'))
  s.push(cf43T(W / 2, 336, 9.5, c43.tealInk, 'middle', 'DRAM re-tops every row within the JEDEC 64 ms window; SRAM never needs to'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 4 — the locality pair: two request timelines with      */
/* computed hit fractions (9 of 10 = 90% vs 0 of 10 = 0%)              */
/* ================================================================== */
function cf43LocalitySvg(): string {
  const W = 760
  const H = 310
  const pagesA = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  const pagesB = [5, 23, 7, 41, 2, 19, 33, 8, 27, 14]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f43}" role="img" aria-label="The locality pair: two readers, ten page requests each, with a pocket that opens a line of five neighbouring pages at every fetch. Pattern A, a chapter read top to bottom, asks for pages 5 through 14 in order: the first fetch misses and the other nine all hit, a hit fraction of 90 percent. Pattern B, a reader leafing for an answer, asks for pages 5, 23, 7, 41, 2, 19, 33, 8, 27 and 14: every ask lands outside the line the last fetch opened, a hit fraction of 0 percent.">`)
  s.push(cf43T(W / 2, 28, 12, c43.teal, 'middle', 'THE LOCALITY PAIR - TEN ASKS, ONE POCKET', true))
  s.push(cf43T(W / 2, 44, 10.5, c43.ink, 'start', 'PATTERN A - ONE CHAPTER READ TOP TO BOTTOM (ALL LOCALITY)', true))
  pagesA.forEach((p, k) => {
    const x = 110 + k * 56
    const hit = k > 0
    s.push(`<rect x="${x}" y="52" width="44" height="44" rx="6" fill="${hit ? c43.white : c43.panelA}" stroke="${hit ? c43.struct : c43.warn}" stroke-width="2"/>`)
    s.push(cf43T(x + 22, 80, 11, c43.ink, 'middle', String(p)))
    s.push(cf43T(x + 22, 110, 9.5, hit ? c43.tealInk : c43.warn, 'middle', hit ? 'H' : 'M', true))
  })
  s.push(cf43T(W / 2, 132, 10, c43.ink, 'middle', 'hits: 9 of 10 = 90% - every ask lands inside the line the last fetch opened'))
  s.push(cf43T(W / 2, 158, 10.5, c43.ink, 'start', 'PATTERN B - LEAFING FOR AN ANSWER (NO LOCALITY)', true))
  pagesB.forEach((p, k) => {
    const x = 110 + k * 56
    s.push(`<rect x="${x}" y="170" width="44" height="44" rx="6" fill="${c43.panelA}" stroke="${c43.warn}" stroke-width="2"/>`)
    s.push(cf43T(x + 22, 198, 11, c43.ink, 'middle', String(p)))
    s.push(cf43T(x + 22, 228, 9.5, c43.warn, 'middle', 'M', true))
  })
  s.push(cf43T(W / 2, 250, 10, c43.warn, 'middle', 'hits: 0 of 10 = 0% - scattered asks, and the ladder taxes every one'))
  s.push(`<rect x="16" y="262" width="${W - 32}" height="40" rx="8" fill="${c43.panelB}" stroke="${c43.conn}" stroke-width="2"/>`)
  s.push(cf43T(W / 2, 278, 9.5, c43.ink, 'middle', 'the pocket: one fetch opens a line of five neighbouring pages (p-2 to p+2)'))
  s.push(cf43T(W / 2, 294, 9.5, c43.tealInk, 'middle', 'temporal locality: used once, used again soon - spatial locality: used once, neighbours wanted'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURES — compact computed SVGs that aid THAT exercise    */
/* (0-2 per question, per the v9.0 directive)                          */
/* ================================================================== */

/* S1 — the ordering crop: six shelves with the census on each */
function cf43SolOrderSvg(): string {
  const W = 680
  const H = 360
  const shelves = [
    { name: 'registers', lat: 'one beat', note: 'the core (4.2)', fill: c43.white, stroke: c43.struct },
    { name: 'L1', lat: '0.5 ns', note: 'the pocket (4.2)', fill: c43.white, stroke: c43.teal },
    { name: 'RAM', lat: '100 ns', note: 'the warehouse', fill: c43.panelA, stroke: c43.accent },
    { name: 'SSD', lat: '150 μs', note: 'flash, no moving parts', fill: c43.panelB, stroke: c43.conn },
    { name: 'HDD', lat: '10 ms', note: 'spinning platters', fill: c43.panelA, stroke: c43.warn },
    { name: 'cloud', lat: '150 ms', note: 'the network', fill: c43.white, stroke: c43.ink },
  ]
  const cx = 220
  const top0 = 70
  const stride = 38
  const shelfH = 32
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f43}" role="img" aria-label="The ordering the census gives, as six shelves drawn fastest at the top: registers on one beat inside the core, L1 at 0.5 ns in the pocket, RAM at 100 ns in the warehouse, SSD at 150 μs in flash with no moving parts, HDD at 10 ms on spinning platters, and the cloud at 150 ms across the network. Each shelf is wider than the one above, and the caption restates the rule: slower, bigger, cheaper going down.">`)
  s.push(cf43T(W / 2, 34, 11, c43.teal, 'middle', 'THE ORDERING THE CENSUS GIVES - FASTEST AT THE TOP', true))
  shelves.forEach((sh, k) => {
    const w = 60 + 36 * k
    const top = top0 + k * stride
    const midY = top + 21
    s.push(`<rect x="${cx - w / 2}" y="${top}" width="${w}" height="${shelfH}" rx="5" fill="${sh.fill}" stroke="${sh.stroke}" stroke-width="2"/>`)
    s.push(cf43T(cx, midY, 9.5, c43.ink, 'middle', sh.name, true))
    s.push(cf43T(92, midY, 9.5, c43.tealInk, 'end', sh.lat))
    s.push(cf43T(352, midY, 9.5, c43.tealInk, 'start', sh.note))
  })
  s.push(`<rect x="16" y="310" width="${W - 32}" height="40" rx="8" fill="${c43.panelB}" stroke="${c43.conn}" stroke-width="2"/>`)
  s.push(cf43T(W / 2, 328, 10, c43.ink, 'middle', 'down the ladder: slower, bigger, cheaper per byte'))
  s.push(cf43T(W / 2, 344, 9.5, c43.tealInk, 'middle', 'up the ladder: faster, smaller, dearer per byte'))
  s.push('</svg>')
  return s.join('')
}

/* S2 — the census as log bars, each rung ratioed to the one above */
function cf43SolRatioSvg(): string {
  const W = 680
  const H = 330
  const x0 = 150
  const per = 58
  const rows = [
    { name: 'L1 hit', ns: 0.5, out: true, label: '0.5 ns', fill: c43.white, stroke: c43.struct },
    { name: 'L2', ns: 7, out: true, label: '7 ns - 14 x L1', fill: c43.white, stroke: c43.teal },
    { name: 'RAM', ns: 100, out: true, label: '100 ns - 14.29 x L2', fill: c43.panelA, stroke: c43.accent },
    { name: 'SSD read', ns: 150000, out: false, label: '150 μs - 1,500 x RAM', fill: c43.panelB, stroke: c43.conn },
    { name: 'HDD seek', ns: 10000000, out: false, label: '10 ms - 66.67 x SSD', fill: c43.panelA, stroke: c43.warn },
    { name: 'ocean RTT', ns: 150000000, out: false, label: '150 ms - 15 x HDD', fill: c43.white, stroke: c43.ink },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f43}" role="img" aria-label="The latency census drawn as six bars on a logarithmic scale of nanoseconds: L1 at 0.5 ns, L2 at 7 ns or 14 times L1, RAM at 100 ns or 14.29 times L2, an SSD read at 150 μs or 1,500 times RAM, an HDD seek at 10 ms or 66.67 times the SSD, and an ocean round trip at 150 ms or 15 times the HDD. Bar length is log base ten of the latency, shifted so L1 starts at zero, and gridlines mark the powers of ten from one nanosecond to one hundred million nanoseconds.">`)
  s.push(cf43T(W / 2, 34, 11, c43.teal, 'middle', 'THE CENSUS AS BARS - EACH RUNG AGAINST THE ONE ABOVE', true))
  for (let k = 0; k <= 8; k++) {
    const gx = x0 + k * per
    s.push(`<line x1="${gx}" y1="60" x2="${gx}" y2="270" stroke="${c43.faint}" stroke-width="1.5"/>`)
    s.push(cf43T(gx, 288, 9, c43.tealInk, 'middle', ['1', '10', '100', '1,000', '10,000', '100,000', '1,000,000', '10,000,000', '100,000,000'][k]))
  }
  rows.forEach((r, i) => {
    const by = 70 + i * 34
    const len = r.ns === 0.5 ? 4 : (Math.log10(r.ns) + 0.301) * per
    s.push(`<rect x="${x0}" y="${by}" width="${len.toFixed(2)}" height="20" rx="4" fill="${r.fill}" stroke="${r.stroke}" stroke-width="2"/>`)
    s.push(cf43T(142, by + 15, 9.5, c43.ink, 'end', r.name))
    if (r.out) s.push(cf43T(x0 + len + 8, by + 15, 9.5, c43.ink, 'start', r.label))
    else s.push(cf43T(x0 + 8, by + 15, 9.5, c43.ink, 'start', r.label))
  })
  s.push(cf43T(W / 2, 316, 9.5, c43.tealInk, 'middle', 'log scale: bar length is log10 of the latency in ns, shifted so L1 starts at zero'))
  s.push('</svg>')
  return s.join('')
}

/* S3 — the 1T1C cell and its refresh timer (for the refresh drill) */
function cf43SolCellSvg(): string {
  const W = 680
  const H = 340
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f43}" role="img" aria-label="The one-transistor one-capacitor DRAM cell with its refresh timer. The word line selects the row, the bit line carries the value, the transistor T connects them, and the capacitor drawn as two plates holds the bit as charge. A dashed red arrow marks the leak through the guard transistor. A dashed teal refresh loop is labelled every row re-topped within 64 ms, and the census note reads: visits per row per second equals 1000 divided by 64, which is 15.625.">`)
  s.push(cf43T(W / 2, 34, 11, c43.teal, 'middle', 'THE 1T1C CELL AND ITS 64 ms REFRESH', true))
  s.push(`<line x1="90" y1="90" x2="380" y2="90" stroke="${c43.ink}" stroke-width="2"/>`)
  s.push(cf43T(94, 82, 9.5, c43.tealInk, 'start', 'word line (row select)'))
  s.push(`<line x1="130" y1="70" x2="130" y2="270" stroke="${c43.ink}" stroke-width="2"/>`)
  s.push(cf43T(60, 264, 9.5, c43.tealInk, 'start', 'bit line'))
  s.push(`<rect x="115" y="100" width="30" height="28" rx="4" fill="${c43.white}" stroke="${c43.struct}" stroke-width="2"/>`)
  s.push(cf43T(130, 119, 11, c43.ink, 'middle', 'T', true))
  s.push(`<line x1="130" y1="128" x2="130" y2="150" stroke="${c43.ink}" stroke-width="2"/>`)
  s.push(`<line x1="105" y1="150" x2="155" y2="150" stroke="${c43.ink}" stroke-width="2.5"/>`)
  s.push(`<line x1="105" y1="170" x2="155" y2="170" stroke="${c43.ink}" stroke-width="2.5"/>`)
  s.push(cf43T(250, 162, 9.5, c43.tealInk, 'start', 'capacitor - the leaky bucket'))
  s.push(`<line x1="185" y1="132" x2="185" y2="186" stroke="${c43.warn}" stroke-width="2" stroke-dasharray="5 4"/>`)
  s.push(`<polygon points="181,186 189,186 185,194" fill="${c43.warn}"/>`)
  s.push(cf43T(195, 172, 9.5, c43.warn, 'start', 'the leak'))
  s.push(`<polyline points="230,205 230,235 340,235 340,213" fill="none" stroke="${c43.teal}" stroke-width="2" stroke-dasharray="5 4"/>`)
  s.push(`<polygon points="336,213 344,213 340,205" fill="${c43.teal}"/>`)
  s.push(cf43T(285, 258, 10, c43.ink, 'middle', 'refresh: every row re-topped within 64 ms'))
  s.push(cf43T(W / 2, 296, 10, c43.ink, 'middle', 'JEDEC window: 64 ms - visits per row per second: 1000/64 = 15.625'))
  s.push(cf43T(W / 2, 320, 9.5, c43.tealInk, 'middle', 'the bit lives as charge on a capacitor; charge leaks, so the machine re-tops it'))
  s.push('</svg>')
  return s.join('')
}

/* S4 — the RAMAC arithmetic strip: 5,000,000 x 6/8 = 3,750,000 B */
function cf43SolRamacSvg(): string {
  const W = 680
  const H = 330
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f43}" role="img" aria-label="The RAMAC arithmetic as chips in a chain: five million characters times six bits each gives thirty million bits; dividing by eight bits per byte gives three million seven hundred and fifty thousand bytes, about 3.75 MB. Beneath, a strip of fifty small platters carries the cargo at seventy-five thousand bytes per platter, and the footnote dates the machine: announced 14 September 1956, about a ton, seventy years before this chapter.">`)
  s.push(cf43T(W / 2, 34, 11, c43.teal, 'middle', 'THE IBM 350 DISK - ANNOUNCED 14 SEPTEMBER 1956', true))
  const chip = (x: number, y: number, w: number, l1: string, l2: string, hot = false) => {
    s.push(`<rect x="${x}" y="${y}" width="${w}" height="44" rx="7" fill="${hot ? c43.panelA : c43.white}" stroke="${hot ? c43.accent : c43.struct}" stroke-width="2"/>`)
    s.push(cf43T(x + w / 2, y + 19, 11, c43.ink, 'middle', l1, true))
    s.push(cf43T(x + w / 2, y + 35, 9.5, c43.tealInk, 'middle', l2))
  }
  chip(50, 60, 170, '5,000,000', 'characters')
  s.push(cf43T(233, 87, 12, c43.ink, 'middle', 'x', true))
  chip(246, 60, 110, '6 bits', 'each')
  s.push(cf43T(370, 87, 12, c43.ink, 'middle', '=', true))
  chip(384, 60, 170, '30,000,000', 'bits')
  chip(50, 130, 140, '8 bits', 'per byte')
  s.push(cf43T(204, 157, 12, c43.ink, 'middle', '=', true))
  chip(218, 130, 200, '3,750,000 bytes', '= 3.75 MB (about)', true)
  chip(448, 130, 190, '50 platters', 'about a ton')
  for (let i = 0; i < 50; i++) {
    s.push(`<rect x="${50 + i * 10}" y="200" width="8" height="26" rx="2" fill="${i % 2 === 0 ? c43.white : c43.paper}" stroke="${c43.struct}" stroke-width="1.5"/>`)
  }
  s.push(cf43T(W / 2, 252, 10, c43.ink, 'middle', 'the 50-platter stack - 3,750,000 / 50 = 75,000 bytes per platter'))
  s.push(`<rect x="16" y="272" width="${W - 32}" height="40" rx="8" fill="${c43.panelB}" stroke="${c43.conn}" stroke-width="2"/>`)
  s.push(cf43T(W / 2, 290, 10, c43.ink, 'middle', '5,000,000 x 6/8 = 3,750,000 bytes - the first disk store, 70 years before this chapter'))
  s.push(cf43T(W / 2, 304, 9.5, c43.tealInk, 'middle', '5 million 6-bit characters on 50 spinning platters, in a cabinet of about a ton'))
  s.push('</svg>')
  return s.join('')
}

/* S5 — the hit fractions of the two readers, on one percent axis */
function cf43SolHitsSvg(): string {
  const W = 680
  const H = 280
  const x0 = 150
  const pct = 4.8
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f43}" role="img" aria-label="The hit fractions of the two readers on one percent axis from 0 to 100. Reader A, the chapter read top to bottom, scores 9 hits in 10 asks, a bar reaching 90 percent. Reader B, the leafing reader, scores 0 hits in 10 asks, a bar that never leaves the baseline. Beneath, the law: the hit fraction h equals hits divided by requests, and the pocket pays only when the asks repeat or neighbour.">`)
  s.push(cf43T(W / 2, 34, 11, c43.teal, 'middle', 'HIT FRACTIONS - THE TWO READERS', true))
  for (let k = 0; k <= 10; k++) {
    const gx = x0 + k * 48
    s.push(`<line x1="${gx}" y1="70" x2="${gx}" y2="180" stroke="${c43.faint}" stroke-width="1.5"/>`)
    s.push(cf43T(gx, 204, 9, c43.tealInk, 'middle', `${k * 10}%`))
  }
  s.push(`<rect x="${x0}" y="80" width="${(0.9 * 10 * pct).toFixed(2)}" height="30" rx="4" fill="${c43.panelA}" stroke="${c43.accent}" stroke-width="2"/>`)
  s.push(cf43T(142, 100, 9.5, c43.ink, 'end', 'A: the chapter read'))
  s.push(cf43T(x0 + 10, 100, 10.5, c43.ink, 'start', 'reader A: 9 of 10 = 90%'))
  s.push(`<rect x="${x0}" y="140" width="4" height="30" rx="2" fill="${c43.warn}"/>`)
  s.push(cf43T(142, 160, 9.5, c43.ink, 'end', 'B: the leafing reader'))
  s.push(cf43T(x0 + 12, 160, 10.5, c43.warn, 'start', 'reader B: 0 of 10 = 0%'))
  s.push(`<line x1="${x0}" y1="180" x2="${x0 + 480}" y2="180" stroke="${c43.ink}" stroke-width="2"/>`)
  s.push(cf43T(W / 2, 236, 9.5, c43.ink, 'middle', 'h = hits / requests - the pocket pays only when the asks repeat or neighbour'))
  s.push(cf43T(W / 2, 254, 9.5, c43.tealInk, 'middle', 'the ladder serves the reader who reads on; it taxes the reader who leafs'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* the lesson                                                          */
/* ================================================================== */
export const lesson43: Lesson = {
  id: 'cf-the-first-memory-hierarchy',
  number: '4.3',
  title: 'The First Memory Hierarchy',
  concepts: [
    'the impossible wish: fast, big, cheap - pick two',
    'RAM and ROM named honestly',
    'DRAM 1T1C, SRAM 6T and the 64 ms refresh',
    'the latency census 0.5 ns to 150 ms',
    'the human ladder at the one-second baseline',
    'RAMAC 1956 and the storage shelf\u2019s history',
    'temporal and spatial locality',
  ],
  objectives: [
    'By the end of this lesson you can state the impossible wish - FAST, BIG, CHEAP, pick any two - and define the memory hierarchy as the honest arrangement of memories that buys back, level by level, what the previous level cannot afford.',
    'By the end of this lesson you can name RAM and ROM honestly: the uniform-time promise of random access, volatility as the real dividing line, and the firmware flash chip as ROM\u2019s modern home.',
    'By the end of this lesson you can draw DRAM\u2019s 1T1C cell against SRAM\u2019s six-transistor cell, explain the leak, and compute the refresh cadence - every row re-topped within the 64 ms window, 15.625 visits per row per second.',
    'By the end of this lesson you can recite the latency census (0.5 ns, 7 ns, 100 ns, 150 μs, 10 ms, 150 ms) with every ratio (14, 14.2857, 200, 1,500, 66.6667, 15) and compute the whole-ladder stretch of 300,000,000.',
    'By the end of this lesson you can walk the human ladder at the one-second baseline: L2 at 14 s, RAM at 200 s, SSD at 3.472222 days, HDD at 7.605141 months, an ocean round trip at 9.5064263 years.',
    'By the end of this lesson you can use temporal and spatial locality to explain why a small pocket serves a big warehouse, and carry the shelf\u2019s history: Dennard 1966, patent 3,387,286 on 4 June 1968, and RAMAC on 14 September 1956.',
  ],
  prerequisites: ['cf-the-processor-named-honestly'],
  sources: ['cs-cf-web-ground-ch04'],
  blocks: [
    // ================================================================
    // 1. THE IMPOSSIBLE WISH
    // ================================================================
    { kind: 'heading', text: 'The Impossible Wish: Fast, Big, Cheap - Pick Two' },
    { kind: 'para', text: 'Lesson 4.1 opened the box and read the city plan; lesson 4.2 named the worker at its centre — a dedicated arithmetic and control station that fetches, decodes, executes and writes back, billions of beats a second — and found the pocket beside the warehouse. Every one of those beats begins the same way: the processor asks memory for the next instruction, asks again for the data the instruction names, asks again for the next. The processor is, among its other honest jobs, the most impatient customer imaginable. It wants its warehouse — everything its programs might touch — to answer in ONE beat: 0.2 ns at a 5 GHz clock, the beat lesson 4.2 priced. And here this lesson\u2019s honest answer begins: no single technology on the shelf gives it that.' },
    { kind: 'para', text: 'Ask the wish properly and it comes in three clauses. FAST: answer in about a nanosecond, so the core never stalls. BIG: hold everything — gigabytes at least, the whole working set of every program at once. CHEAP: cost little enough per byte that a school, a shop or a student can own it. Physics sells any two of the clauses and refuses the third, and it refuses for a reason you can touch: the fast cloths are made of the most circuitry per bit, so they are dear; the cheap cloths are made of the slowest mechanisms — spinning platters, trickling charge, wires across an ocean — so they are patient. That is the whole trade in one sentence: speed, size and price per byte are paid for with one another, and no cloth has yet escaped the exchange.' },
    { kind: 'para', text: 'So the wish splits into three bundles, and each bundle forfeits one clause. FAST and BIG: a vast memory made of the fastest cloth — possible in principle, ruinous in price. FAST and CHEAP: a fast memory at a sane price — possible, but it comes out small; it is a pocket, not a warehouse. BIG and CHEAP: warehouses of gigabytes — easy to buy, but they answer in hundreds of nanoseconds to tens of milliseconds. The machine\u2019s answer is not to find a magic cloth. Its answer is to buy ALL THREE BUNDLES AT ONCE — many memories, arranged in a ladder, each level buying back what the level above cannot afford.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — memory hierarchy', text: 'A **memory hierarchy** is said to be an arrangement of memories from the fastest and smallest to the slowest and largest, each level holding the data its level above uses most. Symbolically, for any two levels with level $i$ above level $j$: the latency of $i$ is less than the latency of $j$, the size of $i$ is less than the size of $j$, and the cost per byte of $i$ is greater than the cost per byte of $j$ — and the arrangement works only because the pattern of requests (locality, later in this lesson) sends most of the traffic to the top.' },
    { kind: 'para', text: 'Read the definition twice and notice what it does NOT say. It does not say the levels share one technology — they deliberately do not. It does not say the levels are equal in importance — the top answers nearly everything; the bottom merely holds nearly everything. And it does not promise the impossible wish granted: the ladder is the honest way to keep the wish\u2019s AVERAGE — most asks answered fast — while every clause is kept by a different shelf.' },
    { kind: 'equation', latex: 't_{\\text{L1}} < t_{\\text{L2}} < t_{\\text{RAM}} < t_{\\text{SSD}} < t_{\\text{HDD}} < t_{\\text{cloud}} \\tag{1}', note: 'The hierarchy\u2019s ordering law worn by this chapter\u2019s own census: each rung answers slower than the one above, holds more, and costs less per byte. The instants: 0.5 ns, 7 ns, 100 ns, 150 μs, 10 ms, 150 ms.' },
    { kind: 'example', title: 'Illustration 1. The silicon price of FAST + BIG: why an 8 GiB pocket built of the fastest cloth would be ruinous.', steps: [
      'Take the two cloths this chapter has met: SRAM\u2019s cell is six transistors per bit; DRAM\u2019s cell is one transistor plus one capacitor.',
      'So, an 8 GiB warehouse is $2^{33}$ bytes = 8,589,934,592 bits, each needing its own cell.',
      'Build it of SRAM and the transistor census is $6 \\times 2^{33} = 51{,}539{,}607{,}552$; build it of DRAM and it is $2^{33} = 8{,}589{,}934{,}592$.',
      'Check the ratio: $51{,}539{,}607{,}552 / 8{,}589{,}934{,}592 = 6$ — the FAST cloth asks six times the silicon of the patient cloth for the same bits.',
      'Hence the FAST+BIG bundle forfeits CHEAP by a factor of six in cloth alone — the wish\u2019s first bundle is priced, and it is why the pocket of lesson 4.2 stays small.',
    ] },
    { kind: 'para', text: 'For example, walk the three bundles the way an engineer would price them, one clause forfeited per bundle:', },
    { kind: 'list', marker: 'roman', items: [
      '(i) FAST and BIG — a huge memory of the fastest cloth: six times the silicon per bit (Illustration 1), so CHEAP is the forfeit.',
      '(ii) FAST and CHEAP — a pocket of the fast cloth at a price you can pay: MiB against GiB, a size gap of 512 times at least, so BIG is the forfeit.',
      '(iii) BIG and CHEAP — gigabytes of DRAM, flash and platters at friendly prices: they answer in 100 ns to 10 ms and worse, so FAST is the forfeit.',
    ] },
    { kind: 'para', text: 'The ladder, then, is not a concession; it is the design. Before we can climb it, two names must be taken honestly, because every exam paper and every shop label wears them: RAM and ROM.' },

    // ================================================================
    // 2. RAM AND ROM, NAMED HONESTLY
    // ================================================================
    { kind: 'heading', text: 'RAM and ROM: the Two Names, Honestly Taken' },
    { kind: 'para', text: 'RAM first. \u201cRandom access\u201d is not a claim about what the memory remembers, and it is not a claim that the contents are random. It is a claim about TIME: any address — the first or the millionth, the hottest or the one not touched since Tuesday — answers in the same time. A tape is the opposite of this: to reach record 1,000 you wind past 999, so the wait depends on where you were. The uniform answer is what makes an address bus worth having at all: the machine can name any location and expect the same patience, which is why programs can be written as if every byte were equally near.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — RAM', text: 'RAM (**random-access memory**) is said to be memory whose locations answer in the same time regardless of address, and from which the machine both reads and writes during normal work. Symbolically, $t(a) = t_{0}$ for every address $a$ — the uniform-time promise — and the definition says nothing at all about what happens when the power goes.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — \u201crandom access\u201d is about time, not about remembering', text: 'RAM is volatile: power off, the charge drains, the contents are gone. The name lures people into reading \u201crandom access memory\u201d as \u201cmemory that keeps things at random\u201d or \u201cmemory that remembers\u201d — both readings are wrong. A drive that keeps files without power is NOT RAM; it is the storage shelf below (SSD, HDD), non-volatile by design. When an exam asks \u201cwhat happens to RAM at power-off?\u201d, the expected answer is one word: lost.' },
    { kind: 'para', text: 'ROM next — read-only memory in the classic telling. Its honest job is the opposite trade from RAM\u2019s: it gives up easy writing and keeps its contents without power. The firmware chip you met on 4.1\u2019s board — the chip that speaks the machine\u2019s first waking words, BIOS or UEFI — is ROM\u2019s modern home. And here is the honest note the exam boards now expect: today\u2019s \u201cROM\u201d is flash, and flash CAN be rewritten — the firmware update you may have run on a phone or a laptop rewrote exactly that chip. \u201cROM\u201d today means WRITTEN-RARELY, not never-writable; the factory or a careful update writes it once in a great while, and the machine reads it every waking.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — ROM', text: 'ROM (**read-only memory**) is said to be non-volatile memory whose normal working life is spent being read; it is written rarely — at manufacture or by a deliberate update — and never in the ordinary course of running programs. Symbolically, the write happens on a timescale of months or years, the read on a timescale of nanoseconds to microseconds, and the contents survive power-off: non-volatile.' },
    { kind: 'table', caption: 'RAM against ROM: the honest division is volatility (does it survive power-off?), not writability — today\u2019s ROM is flash and can be rewritten.', head: ['The question', 'RAM', 'ROM (today: firmware flash)'], rows: [
      ['Does it survive power-off?', 'no — volatile; contents lost', 'yes — non-volatile; contents kept'],
      ['How is it used?', 'read AND written constantly, any address', 'read constantly; written rarely (factory or update)'],
      ['The cloth in this chapter', 'DRAM — one transistor + one capacitor, refreshed', 'flash — no refresh, rewritten in blocks'],
      ['The job in the box', 'the working warehouse', 'the first waking speech (BIOS/UEFI, 4.1\u2019s chip)'],
      ['A fair census for one machine', '8 GiB class = $2^{33}$ bytes', '16 MiB class = $2^{24}$ bytes'],
    ] },
    { kind: 'example', title: 'Illustration 2. The two names in one machine, counted: the working warehouse against the first-waking chip.', steps: [
      'Take one honest laptop\u2019s pair: 8 GiB of RAM and a 16 MiB firmware chip on the board (4.1\u2019s city plan).',
      'So, the RAM census is $8 \\times 2^{30} = 8{,}589{,}934{,}592$ bytes = $2^{33}$.',
      'Take the firmware census: $16 \\times 2^{20} = 16{,}777{,}216$ bytes = $2^{24}$.',
      'Now, divide: $2^{33} / 2^{24} = 2^{9} = 512$.',
      'Hence the ratio is $2^{33}/2^{24} = 512$ — 8 GiB against 16 MiB: a vast forgetful warehouse serving beside a small faithful one, and only the warehouse forgets at power-off.',
    ] },
    { kind: 'para', text: 'Both names, taken honestly, point at families rather than single things. \u201cRAM\u201d names a promise (uniform time, read and write) that two very different cloths keep in two very different ways — SRAM and DRAM. \u201cROM\u201d names a role (kept without power, read mostly) that flash now fills. The next section opens the two RAM cloths, because the difference between them — six transistors against one — is the difference that builds the ladder\u2019s top half.' },
    { kind: 'terms', items: [
      { term: 'random access', def: 'the promise that any address answers in the same time as any other - a promise about TIMING, not about remembering.' },
      { term: 'volatile memory', def: 'memory whose contents vanish when power is removed; DRAM is the standard example.' },
      { term: 'non-volatile memory', def: 'memory that keeps its contents without power; flash and the old ROM family.' },
      { term: 'RAM', def: 'random-access memory - the machine\u2019s read-and-write working memory; today mostly DRAM.' },
      { term: 'ROM', def: 'read-only memory in the classic sense, read-mostly in practice - today the firmware flash chip.' },
      { term: 'firmware', def: 'the code the machine runs at first waking (BIOS/UEFI), stored on the flash chip of 4.1\u2019s board.' },
    ] },

    // ================================================================
    // 3. DRAM, SRAM AND THE REFRESH BEAT
    // ================================================================
    { kind: 'heading', text: 'DRAM, SRAM and the Refresh Beat' },
    { kind: 'para', text: 'DRAM — dynamic random-access memory — is the warehouse\u2019s cloth, and its whole character is visible in one cell. A DRAM bit is ONE transistor (the tap) and ONE capacitor (the bucket): the \u201c1T1C\u201d cell. To write a bit, the machine opens the tap and fills or empties the bucket — charges it or drains it. To read, the tap opens and the machine asks how much charge came out. The scheme is brilliantly cheap, and it has one permanent flaw: the bucket leaks. The charge trickles away through the very transistor that guards it, so no bit can be left alone for long. Every row of the warehouse must be re-topped — read and written back — before its charge fades below reading.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — Dennard\u2019s leaky bucket, 1966', text: 'The one-transistor DRAM cell was invented by Robert Dennard at IBM in 1966; the idea was patented as US patent 3,387,286, issued on 4 June 1968. Our retelling, honestly ours: one tap, one leaky bucket, and a schedule of visits — the cheapest workable bit the industry has ever had, and the reason gigabytes became ordinary. The two-year walk from invention (1966) to issued patent (1968) is itself a small census of how fast the idea was understood to matter.' },
    { kind: 'para', text: 'The schedule is standardised. The DDR standards (JEDEC, the industry\u2019s rules body) require every row of a DRAM chip to be re-topped within a 64 ms window. The chip spends part of every waking moment on this housekeeping — opening each row, amplifying its charge, writing it back — while the processor politely waits or works around it. Machine the numbers and the housekeeping has a cadence: each row is visited at least once per window, so a row receives 1,000/64 = 15.625 visits per second, every second the machine is awake.' },
    { kind: 'equation', latex: '\\text{visits per row per second} = \\frac{1000\\,\\text{ms}}{64\\,\\text{ms}} = 15.625 \\tag{4}', note: 'The refresh cadence: within each 64 ms JEDEC window every row is visited at least once, so each row is re-topped 15.625 times a second.' },
    { kind: 'example', title: 'Illustration 3. The refresh budget: what the leak costs a busy machine.', steps: [
      'Take the standard window: one row must be re-topped within 64 ms.',
      'So, per second, each row\u2019s windows number $1000 / 64 = 15.625$ — that many visits to every row, every second.',
      'Check the price against the clock: in one 64 ms window, a 5 GHz core could have beaten $64\\,\\text{ms} / 0.2\\,\\text{ns} = 320{,}000{,}000$ times.',
      'Hence every row is re-topped 15.625 times a second while the core runs 320,000,000 beats per window — the warehouse stays honest only by paying that tax continuously.',
    ] },
    { kind: 'para', text: 'SRAM — static random-access memory — refuses the bucket entirely. Its cell is SIX transistors wired into a little latch that holds its state while power stays on: no capacitor, no leak, no refresh, no housekeeping. The cloth is what the pocket wants. The price is what the pocket pays: six transistors per bit against DRAM\u2019s two devices, which is why 4.2\u2019s pocket is measured in tens of KiB to a few MiB while the warehouse is measured in GiB — the fast cloth is bought in small rooms.' },
    { kind: 'figure', caption: 'The two RAM cloths: left, the DRAM cell — one transistor and one leaky capacitor per bit, re-topped within the JEDEC 64 ms window; right, the SRAM cell — six transistors per bit, no refresh, which is why it is dear and why 4.2\u2019s pocket stays small.', svg: cf43CellsSvg() },
    { kind: 'table', caption: 'SRAM against DRAM: the cell census fixes the speed slot, the price and the home of each cloth.', head: ['The property', 'SRAM (the pocket\u2019s cloth)', 'DRAM (the warehouse\u2019s cloth)'], rows: [
      ['The cell census', 'six transistors per bit', 'one transistor + one capacitor'],
      ['Refresh', 'none — holds while powered', 'every row within the 64 ms window'],
      ['The speed slot it wears', 'L1 at 0.5 ns (the census\u2019s top)', 'RAM at 100 ns — 200 × slower than L1'],
      ['The price per bit', 'about six times the silicon', 'the cheap workable bit'],
      ['The home in the box', 'cache — 4.2\u2019s pocket, small by choice', 'the working warehouse, big because cheap'],
    ] },
    { kind: 'para', text: 'Notice the division of labour the cell census forces. The pocket must be fast and is allowed to be small and dear: SRAM. The warehouse must be big and cheap and is allowed to be slow: DRAM, with its 15.625 visits per row per second. The ladder\u2019s top half is built; its bottom half needs slower, cheaper mechanisms still — and for those the machine leaves the chip entirely: flash for the SSD, spinning platters for the HDD.' },

    // ================================================================
    // 4. THE LADDER: A CENSUS OF PATIENCE
    // ================================================================
    { kind: 'heading', text: 'The Ladder: a Census of Patience' },
    { kind: 'para', text: 'Assemble the whole ladder now, from the core outward. The registers sit INSIDE the core — 4.2\u2019s ground, not even a chip of their own, answering within one beat. Above nothing, beside everything: the L1 pocket of SRAM, then L2, then L3 — three pockets, each bigger and slower than the last. Then RAM, the DRAM warehouse the whole machine shares. Then the storage shelf: the SSD (flash, no moving parts) and the HDD (spinning platters with a travelling head). And beyond the box, across wires and oceans, the cloud. Six shelves, one census.' },
    { kind: 'figure', caption: 'The memory hierarchy drawn as a ladder: registers, L1, L2, L3, RAM, SSD, HDD, cloud — the census printed on each shelf (one beat, 0.5 ns, 7 ns, 100 ns, 150 μs, 10 ms, 150 ms) — with the wish beside it: FAST, BIG, CHEAP, pick any two. Widths grow by a fixed step per rung (a log-spaced picture, honestly not to scale); what IS to scale is the ordering.', svg: cf43PyramidSvg() },
    { kind: 'para', text: 'The census below is printed in the shape of the one Jeff Dean made famous for programmers — \u201clatency numbers every programmer should know\u201d. The values are typical orders for current hardware and hedge honestly with each generation; what does NOT hedge is the shape: every rung answers somewhere between ten and a couple of thousand times slower than the rung above, all the way down. Each ratio is computed in this lesson\u2019s engine and carried exactly.' },
    { kind: 'table', caption: 'The latency census of the ladder — the one table of this lesson worth carrying cold. The ratio column is engine-pinned: 14, 14.2857, 200, 1,500, 66.6667, 15.', head: ['The rung', 'The cloth', 'The census answer', 'Ratio to the rung above', 'On the human ladder (next section)'], rows: [
      ['registers', 'inside the core (4.2)', 'one beat (0.2 ns)', 'the baseline', 'one second'],
      ['L1 cache', 'SRAM, 6T', '0.5 ns', 'the ladder\u2019s unit', '1 s'],
      ['L2 cache', 'SRAM, 6T', '7 ns', '14 × L1', '14 s'],
      ['L3 cache', 'SRAM, 6T', 'tens of ns (hedged)', 'between L2 and RAM', 'between 14 s and 200 s'],
      ['RAM', 'DRAM, 1T1C + 64 ms refresh', '100 ns', '14.2857 × L2; 200 × L1', '200 s = 3 min 20 s'],
      ['SSD', 'flash, no moving parts', '150 μs (random read)', '1,500 × RAM', '3.472222 days'],
      ['HDD', 'spinning platters + head', '10 ms (seek)', '66.6667 × SSD', '231.481481 days = 7.605141 months'],
      ['cloud', 'wires across an ocean', '150 ms (round trip)', '15 × HDD', '9.5064263 years'],
    ] },
    { kind: 'para', text: 'Two readings of the census are worth fixing before the human ladder. First, the whole-ladder stretch: from the fastest rung to the ocean round trip is $150{,}000{,}000 / 0.5 = 300{,}000{,}000$ — three hundred million L1 answers could fit inside one ocean wait. Second, the metronome reading: price every rung in the 0.2 ns beats of 4.2\u2019s 5 GHz clock, and the census becomes the core\u2019s stall bill.' },
    { kind: 'example', title: 'Illustration 4. The processor\u2019s own bill: each shelf\u2019s wait priced in beats of the 0.2 ns metronome.', steps: [
      'Take the beat: $0.2\\,\\text{ns}$ per cycle at a 5 GHz clock (4.2\u2019s pinned beat).',
      'So, an L1 hit costs $0.5 / 0.2 = 2.5$ beats; a RAM fetch costs $100 / 0.2 = 500$ beats.',
      'Now, the storage shelf: one SSD random read costs $150{,}000 / 0.2 = 750{,}000$ beats; one HDD seek costs $10{,}000{,}000 / 0.2 = 50{,}000{,}000$ beats.',
      'And the far edge: one ocean round trip costs $150{,}000{,}000 / 0.2 = 750{,}000{,}000$ beats.',
      'Hence the core waits out 2.5 beats for the pocket, 500 for the warehouse, 750,000 for flash, 50,000,000 for a seek, and 750,000,000 for the far side of an ocean — the census IS the stall bill.',
    ] },
    { kind: 'para', text: 'Below RAM the shelf changes character: it stops being circuitry and starts being mechanism. The SSD is flash — the same non-volatile cloth as the firmware chip, arranged in big blocks, with NO moving parts; its random read of about 150 μs is 1,500 × the RAM wait, and yet it is the KIND one: the HDD\u2019s 10 ms seek is 66.6667 × the SSD\u2019s read, because a platter must physically spin and a head must physically travel before the first bit moves. Run the two shelves through one honest workload and the gap stops being abstract.' },
    { kind: 'example', title: 'Illustration 5. The 1,000-address race: the same scattered 1,000 reads on both shelves.', steps: [
      'Take the workload: 1,000 random reads — scattered, no locality, the worst case.',
      'So, the SSD pays $1{,}000 \\times 150\\,\\mu\\text{s} = 150{,}000\\,\\mu\\text{s} = 150\\,\\text{ms}$.',
      'The HDD pays $1{,}000 \\times 10\\,\\text{ms} = 10{,}000\\,\\text{ms} = 10$ s.',
      'Check the ratio: $10 / 0.15 = 66.6667$ — the same race, sixty-six times longer on platters.',
      'Hence 1,000 random reads cost 150 ms on the flash shelf and 10 s on the platter shelf — 66.6667 × is the price of moving parts.',
    ] },
    { kind: 'example', title: 'Illustration 6. The warehouse against the world: pricing one packet to another continent.', steps: [
      'Take RAM\u2019s answer time: 100 ns.',
      'Take the ocean round trip: 150 ms = 150,000,000 ns.',
      'Divide: $150{,}000{,}000 / 100 = 1{,}500{,}000$.',
      'Hence one packet\u2019s round trip to another continent buys time for 1,500,000 RAM fetches — the cloud is not a shelf; it is a different continent of patience.',
    ] },
    { kind: 'algorithm', title: 'How a fetch walks the ladder', lines: [
      { code: 'the core needs a value it does not hold', note: 'registers are 4.2\u2019s ground; anything else lives somewhere down the ladder' },
      { code: 'ask L1', note: 'a hit ends the walk in about 0.5 ns - two and a half beats of the metronome' },
      { code: 'miss: ask L2', note: '7 ns - 14 x the L1 wait; the pocket\u2019s second shelf' },
      { code: 'miss: ask L3', note: 'tens of ns, hedged - the shared shelf between the pockets and the warehouse' },
      { code: 'miss: ask RAM', note: '100 ns - 500 beats; the DRAM warehouse, refresh tax included' },
      { code: 'miss: ask SSD', note: '150 μs random read - 750,000 beats; flash, no moving parts' },
      { code: 'miss: ask HDD', note: '10 ms seek - 50,000,000 beats; the platters must spin and the head must travel' },
      { code: 'miss: ask across the network', note: '150 ms round trip - 750,000,000 beats; the widest shelf and the slowest' },
      { code: 'return the answer, and leave copies in the pockets above', note: 'the copies are the trick - locality (below) decides whether they earn their keep' },
    ], note: 'Each miss pays the next rung\u2019s census price, and the walk repeats billions of times a second; the whole design question of the memory system is how rarely the walk gets below L1.' },

    // ================================================================
    // 5. THE HUMAN LADDER
    // ================================================================
    { kind: 'heading', text: 'The Human Ladder: One Second at the Top' },
    { kind: 'para', text: 'Nanoseconds do not frighten anybody, which is precisely the problem: a number like 10 ms looks small next to a number like 100 ns, and the eye cannot feel that one is 66.6667 times the other. The fix this chapter keeps is ONE metaphor, used honestly: rescale the whole census so that the fastest rung — one L1 hit — takes ONE SECOND of human time. The scale factor falls out of the arithmetic: $1\\,\\text{s} / 0.5\\,\\text{ns} = 2 \\times 10^{9}$, a multiplication by two billion. Every wait grows by the same factor, so every ratio survives untouched; only the units become human.' },
    { kind: 'derivation', title: 'The human ladder\u2019s scale and its six waits', statement: 'Rescale the census so that one L1 hit (0.5 ns) takes one human second; every other wait grows by the same factor of two billion and becomes a wait you can actually feel.', steps: [
      { label: 'Write the baseline in seconds', formula: '0.5\\,\\text{ns} = 0.5 \\times 10^{-9}\\,\\text{s}', explanation: 'The L1 answer is half a nanosecond — five tenths of a billionth of a second.' },
      { label: 'Divide the wish by the baseline', formula: '\\text{scale} = \\frac{1\\,\\text{s}}{0.5 \\times 10^{-9}\\,\\text{s}} = 2 \\times 10^{9}', explanation: 'To make 0.5 ns take 1 s, multiply every wait by two billion; the ratios are untouched, only the units change.' },
      { label: 'Multiply the pocket and warehouse rungs', formula: '7\\,\\text{ns} \\times 2 \\times 10^{9} = 14\\,\\text{s}; \\quad 100\\,\\text{ns} \\times 2 \\times 10^{9} = 200\\,\\text{s}', explanation: 'The pocket\u2019s second shelf then takes 14 human seconds; the warehouse takes 200 — three minutes twenty seconds.' },
      { label: 'Convert the storage shelf', formula: '150{,}000\\,\\text{ns} \\times 2 \\times 10^{9} = 300{,}000\\,\\text{s}', explanation: 'The SSD read becomes 300,000 seconds; divide by the 86,400-second day to get 3.472222 days.' },
      { label: 'Convert the platter and the ocean', formula: '10{,}000{,}000\\,\\text{ns} \\times 2 \\times 10^{9} = 20{,}000{,}000\\,\\text{s}; \\quad 150{,}000{,}000\\,\\text{ns} \\times 2 \\times 10^{9} = 300{,}000{,}000\\,\\text{s}', explanation: 'The seek becomes twenty million seconds and the ocean round trip three hundred million — converted in the next derivation into months and years.' },
    ], result: 'L2: $14\\,\\text{s}$. RAM: $200\\,\\text{s}$ - 3 min 20 s. SSD: $300{,}000\\,\\text{s}$ - 3.472222 days. HDD: $20{,}000{,}000\\,\\text{s}$ - 231.481481 days - 7.605141 months (about 7.6 months). Ocean RTT: $300{,}000{,}000\\,\\text{s}$ - 9.5064263 years (about 9.5 years).' },
    { kind: 'equation', latex: 'T_{\\text{human}} = T_{\\text{machine}} \\times 2 \\times 10^{9} \\tag{2}', note: 'The human-ladder conversion: multiply every census wait by two billion so one L1 hit takes one second. The ratios (14, 14.2857, 200, 1,500, 66.6667, 15) survive exactly.' },
    { kind: 'figure', caption: 'The human ladder: each wait rescaled by 2,000,000,000 so the L1 hit takes one second — L2 14 s, RAM 200 s (3 min 20 s), SSD 3.472222 days, HDD 7.605141 months (about 7.6 months), an ocean round trip 9.5064263 years (about 9.5 years). Bar heights are logarithmic — every gridline step multiplies the wait by ten.', svg: cf43HumanSvg() },
    { kind: 'derivation', title: 'From seconds to months and years', statement: 'The two deepest human-ladder waits arrive as seconds no human feels; convert them with the calendar\u2019s honest averages — a day of 86,400 seconds, an average month of 30.4375 days (365.25/12), a year of 365.25 days.', steps: [
      { label: 'HDD: seconds to days', formula: '\\frac{20{,}000{,}000}{86{,}400} = 231.481481\\,\\text{days}', explanation: 'One seek, rescaled, is 231.481481 days — the head takes most of a year to reach one track, by the human clock.' },
      { label: 'Days to average months', formula: '\\frac{231.481481}{30.4375} = 7.605141\\,\\text{months}', explanation: 'The average month is 365.25/12 = 30.4375 days, so the seek lasts 7.605141 months — about 7.6 months in prose.' },
      { label: 'Ocean: seconds to years', formula: '\\frac{300{,}000{,}000}{86{,}400 \\times 365.25} = 9.5064263\\,\\text{years}', explanation: 'The packet\u2019s round trip becomes 3,472.2222 days; divided by the 365.25-day year it is 9.5064263 years — about 9.5 years for ONE ask.' },
    ], result: 'One HDD seek lasts $7.605141$ months; one ocean round trip lasts $9.5064263$ years — the bottom of the ladder is where patience goes to die.' },
    { kind: 'para', text: 'Walk the ladder once at human speed and the pockets earn their name. Ask the pocket (L1): answered in a heartbeat — one second, our baseline. Ask its big sibling (L2): fourteen seconds, a long coffee sip. Ask the warehouse (RAM): three minutes twenty seconds — you notice the wait. Ask the flash shelf (SSD): three and a half days, a long weekend away. Ask the platter (HDD): about 7.6 months — a season passes before the answer lands. Ask across the ocean: about 9.5 years — a whole school career for one number. No engineer would tolerate these waits, and yet the machine pays the bottom of this ladder every day; the difference is that with locality (next section) it almost never HAS to.' },
    { kind: 'callout', tone: 'insight', title: 'Note — what the human ladder is really for', text: 'The conversion is not decoration; it is the fastest honesty test in computer fundamentals. Any design claim — \u201cthe cache makes it fast\u201d, \u201cthe SSD feels instant\u201d, \u201cthe cloud is just another disk\u201d — can be priced on the ladder in seconds. \u201cThe cache makes it fast\u201d becomes: the pocket answers in one second where the warehouse takes three minutes twenty. \u201cThe cloud is just another disk\u201d becomes: one is a season, the other a school career. If a claim survives the human ladder, it is a real claim.' },

    // ================================================================
    // 6. LOCALITY: WHY THE TRICK WORKS
    // ================================================================
    { kind: 'heading', text: 'Locality: Why the Trick Works' },
    { kind: 'para', text: 'Everything so far has been price. The ladder is built, the census is carried, and the human ladder has made the waits feelable — but one question still decides whether the whole design is genius or folly: why does the machine not pay the census on EVERY ask? The pocket answers in 0.5 ns, the warehouse in 100 ns — 200 × longer — and everything below the warehouse is worse still. If every ask fell through to RAM, the ladder would be a liability, not a design. The answer is not a property of any memory; it is a property of the workloads programs actually run, and it has two names.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the two localities', text: '**Temporal locality** is said to hold when an item of data, once used, is likely to be used again soon: the first use is a prediction of the next. **Spatial locality** is said to hold when an item of data, once used, is likely to be followed by requests for its neighbours: the address used predicts the addresses beside it. Symbolically: if address $a$ is referenced at time $t$, then $a$ itself is likely to be referenced again shortly after $t$ (temporal), and the neighbouring addresses $a + 1, a + 2, \\ldots$ are likely to be referenced shortly after $t$ (spatial).' },
    { kind: 'para', text: 'Neither locality is an aspiration; both are descriptions of how programs actually behave. A loop is temporal locality incarnate: its counter, its accumulator and its hot lines of code are used again within microseconds, thousands of times. Sequential work — reading an array, walking a string, fetching the very next instruction — is spatial locality incarnate: after address $a$ the machine usually wants $a$’s neighbours, because the next instruction sits beside the last one and the next element of an array beside the last element. The hardware banks on this honestly: one fetch does not buy one byte but a LINE — say 64 bytes, sixteen 4-byte words — so each ask purchases fifteen neighbours’bus rides along with the byte it wanted. Even this chapter’s own metaphor obeys the law: a reader working through a book page by page is all locality; a reader leafing for one answer has none.' },
    { kind: 'figure', caption: 'The locality pair: two readers, ten page requests each, and a pocket that opens a line of five neighbouring pages at every fetch. Reader A reads pages 5 to 14 in order - the first ask misses, the other nine all hit: 9 of 10 = 90%. Reader B leafs - 5, 23, 7, 41, 2, 19, 33, 8, 27, 14 - and no ask lands inside the line the last fetch opened: 0 of 10 = 0%. Same pocket, same census; only the reading pattern differs.', svg: cf43LocalitySvg() },
    { kind: 'para', text: 'Read the picture twice, because it is the ladder’s whole defence. The pocket is IDENTICAL in both rows — same five-page line, same census prices. The reader differs. Reader A’s asks repeat and neighbour, so the line opened by one fetch serves the next nine; reader B’s asks scatter, so every fetch pays the ladder alone. The pocket does not make a machine fast; a well-matched WORKLOAD makes the pocket useful — and the census prices the difference: nine answers at pocket speed against ten at warehouse speed and below.' },
    { kind: 'example', title: 'Illustration 7. Two readers and one pocket: the locality pair priced, with the average wait computed.', steps: [
      'Take the pocket’s habit: one fetch opens a line of five neighbouring pages (p-2 to p+2), exactly as the picture above shows.',
      'So, reader A, reading pages 5 to 14 in order: the first ask misses and opens the line; the other nine asks land inside it - 9 hits in 10 asks.',
      'Check the fraction: 9/10 = 90% (a mixed six-of-ten run would price 0.6).',
      'Now, price the average wait, with pocket answers at 0.5 ns and warehouse answers at 100 ns: 0.9 x 0.5 + 0.1 x 100 = 0.45 + 10 = 10.45 ns.',
      'Reader B leafs: no ask lands inside the last line, so 0 hits in 10 - the average wait is the warehouse’s full 100 ns on every ask.',
      'Hence 9 of 10 asks (90%) land in the pocket for reader A, pricing the average at 10.45 ns against reader B’s 0 of 10 at the full 100 ns.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the pocket’s leverage (average memory access time)', text: 'If a memory level answering in $t_{\\text{fast}}$ serves a fraction $h$ of all asks (the **hit fraction**) and passes the remaining fraction $1 - h$ to a slower level answering in $t_{\\text{slow}}$, then the average answer time obeys $\\text{AMAT} = h \\cdot t_{\\text{fast}} + (1 - h) \\cdot t_{\\text{slow}}$, which collapses toward $t_{\\text{fast}}$ as $h$ approaches 1 and toward $t_{\\text{slow}}$ as $h$ approaches 0. The theorem is the ladder’s contract: the warehouse tax is paid in full only when locality fails; at the locality pair’s $h = 0.9$ it is paid on one ask in ten.' },
    { kind: 'equation', latex: '\\text{AMAT} = h \\cdot t_{\\text{fast}} + (1 - h) \\cdot t_{\\text{slow}} \\tag{3}', note: 'The pocket’s leverage: at the locality pair’s h = 0.9, AMAT = 0.9 x 0.5 + 0.1 x 100 = 10.45 ns - the ladder’s tax paid on one ask in ten.' },
    { kind: 'para', text: 'Run the law on the pair and the leverage lands as a number you can defend. At $h = 0.9$: AMAT = $0.9 \\times 0.5 + 0.1 \\times 100 = 10.45$ ns — the warehouse tax on one ask in ten, and a twenty-fold improvement on waiting for the warehouse every time. At $h = 0$: the pocket is dead weight and every ask pays 100 ns. The law also explains the ladder’s shape ABOVE the warehouse: L2 exists because L1’s line is small, L3 because L2’s is, and each pocket prices its own AMAT with the same one-line law — a chain of bets on the same two localities.' },
    { kind: 'para', text: 'And now the warning that keeps this section honest: locality is a property of the WORKLOAD, not of the machine, and the ladder punishes its absence without mercy. The metronome bill of Illustration 4 — 750,000 beats for one flash read, 50,000,000 for one seek — is what a leafing workload pays on EVERY ask, and the whole-ladder stretch, 150,000,000 ns / 0.5 ns = 300,000,000 pocket answers inside one ocean round trip, is the price of the worst possible ask. Everything the machine does to keep $h$ high — pockets below pockets, lines opened in neighbours, predictions of the next ask — is the ladder defending itself against the reader who leafs.' },
    { kind: 'terms', items: [
      { term: 'cache hit', def: 'an ask answered by the pocket it was aimed at - the 0.5 ns answer of the census’s top rung.' },
      { term: 'cache miss', def: 'an ask the pocket cannot answer, passed down the ladder to pay the next rung’s census price.' },
      { term: 'temporal locality', def: 'used once, used again soon - the loop’s guarantee and the pocket’s first income.' },
      { term: 'spatial locality', def: 'used once, its neighbours wanted - the array’s and the instruction stream’s guarantee.' },
      { term: 'hit fraction', def: 'hits divided by requests - the h of the AMAT law; the locality pair scored 90% against 0%.' },
      { term: 'cache line', def: 'the block a pocket fetches at once - 64 bytes in the common census, sixteen 4-byte words, fifteen of them neighbours.' },
    ] },

    // ================================================================
    // 7. THE STORAGE SHELF’S OWN HISTORY
    // ================================================================
    { kind: 'heading', text: 'The Storage Shelf’s Own History: RAMAC, 1956' },
    { kind: 'para', text: 'The ladder’s bottom half deserves its own history, because the storage shelf — unlike the pockets — began as a machine of its own, sold by the cabinet. The first disk store was announced by IBM on 14 September 1956 as part of the 305 RAMAC system, where RAMAC stood for Random Access Method of Accounting and Control. Read the acronym twice: RANDOM ACCESS — the shelf’s founding promise is the same uniform-time promise section 2 took honestly for RAM, sold as a slogan before this lesson’s census could price it. The IBM 350 disk unit stored 5,000,000 characters, each 6 bits wide, on 50 platters, and the cabinet weighed about a ton.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the first disk store, 14 September 1956', text: 'The IBM 305 RAMAC system was announced on 14 September 1956; its IBM 350 disk stored 5,000,000 characters of 6 bits each on 50 platters — 3,750,000 bytes in today’s 8-bit counting — in a unit of about a ton. Our retelling is our own; the census is the standard one, and its two hedges are honest ones: the ton is the recalled approximate weight of the cabinet class, and the byte conversion is OURS — the machine counted 6-bit characters, not bytes. What is not hedged is the direction of travel: from about a ton per 3.75 MB to terabytes per pocket, with the ladder’s shape unchanged.' },
    { kind: 'para', text: 'The arithmetic is worth walking once, plainly, because it is the byte’s first entrance in this chapter’s history. Five million characters, six bits each, make 30,000,000 bits; divided by eight bits to the byte, that is 3,750,000 bytes — about 3.75 MB. Spread over the 50 platters, the cargo is 75,000 bytes per platter — about twenty-five pages of plain text riding on each one. And the whole cabinet, platters and heads and motor and all, weighed about a ton: the storage shelf began as furniture. RAMAC to this chapter is seventy years — 2026 minus 1956 — and in those seventy years the per-byte price fell by more orders of magnitude than this lesson’s whole census spans.' },
    { kind: 'table', caption: 'The storage shelf, then and now: the 1956 census against today’s hedged sizes, with the waits from this lesson’s census. Sizes today are hedged honestly — consumer SSDs and HDDs reach terabytes; the ratios, not the absolutes, are what the chapter carries.', head: ['The shelf', 'The year', 'The cloth', 'The capacity census', 'The wait (this lesson’s census)'], rows: [
      ['IBM 350 disk (in the 305 RAMAC)', '1956', '50 spinning platters, about a ton', '3,750,000 bytes (5,000,000 x 6-bit characters)', 'slower than today’s platters - and the ton was part of the price'],
      ['Consumer HDD', 'today', 'spinning platters + travelling head', 'terabytes (hedged)', '10 ms seek'],
      ['Consumer SSD', 'today', 'flash, no moving parts', 'terabytes (hedged)', '150 μs random read'],
      ['The DRAM warehouse', 'today', '1T1C cells, 64 ms refresh', '8 GiB class = 2^33 bytes', '100 ns'],
    ] },
    { kind: 'para', text: 'Flash storage — the SSD, the shelf’s newest cloth — closes the history with the honest direction of travel. It has NO moving parts: nothing spins, nothing travels, and its random read of 150 μs is 1,500 × the RAM wait but only 1/66.6667 of the platter’s seek. On the human ladder, flash moved one shelf of patience — from about 7.6 months to about three and a half days for one ask. One honest line on today’s sizes, hedged the way 3.1 taught: a terabyte is $10^{12}$ bytes in SI counting, and $1\\,\\text{TiB} = 2^{40} = 1{,}099{,}511{,}627{,}776$ bytes in binary counting — consumer SSDs and HDDs reach terabytes, RAM reaches tens of GiB, and the RATIOS of the census, not the absolute sizes, are what this chapter carries.' },
    { kind: 'example', title: 'Illustration 8. The first disk store, counted: the IBM 350’s cargo and its platter arithmetic.', steps: [
      'Take the census: 5,000,000 characters, each 6 bits wide, on 50 platters.',
      'So, the bit cargo is 5,000,000 x 6 = 30,000,000 bits.',
      'Convert with our own 8-bit byte: 30,000,000 / 8 = 3,750,000 bytes - about 3.75 MB in SI counting.',
      'Check the binary face of the same cargo, as 3.1 taught: 3,750,000 / 1,048,576 = 3.5762787 MiB - the SI and binary counts disagree, and both are honest.',
      'Now, per platter: 5,000,000 / 50 = 100,000 characters, and 100,000 x 6 bits / 8 = 75,000 bytes - the two routes agree.',
      'Check the patience honestly: today’s platter answers a seek in 10 ms; the 1956 mechanism was slower still, and the cabinet weighed about a ton.',
      'Hence the first disk store carried 3,750,000 bytes - about 3.75 MB - at 75,000 bytes per platter, on 50 platters in a ton of furniture.',
    ] },

    // ================================================================
    // 8. VIRTUAL MEMORY, NAMED AND LEFT CLOSED
    // ================================================================
    { kind: 'heading', text: 'Virtual Memory, Named and Left Closed' },
    { kind: 'para', text: 'One honest name remains, and this lesson gives it a paragraph and closes the door. Virtual memory is the operating system’s borrowing scheme: programs are given addresses of their own, as if RAM were far bigger than the chips wired in, and the OS — with the processor’s help — keeps the busy pages in the warehouse and lets the rest rest on the storage shelf, moving pages up when asked and writing the changed ones down when space runs short. The census prices the scheme’s danger exactly: a page kept in RAM answers in 100 ns; a page that falls to flash waits 1,500 × longer; a page pushed all the way down to the platter waits, on the human ladder, 20,000,000 s — 231.481481 days, about 7.6 months. Borrowing works only while the working set — the pages actually in play — obeys locality and stays near the top of the ladder; the AMAT law of section 6 is the scheme’s report card.' },
    { kind: 'para', text: 'And now we leave it closed — named, priced, and handed over. The theory door for virtual memory is Operating Systems, a book planned for this library’s own shelf: it owns paging, replacement policies and the working-set model, and it will re-teach none of this lesson’s census. The file system — how the shelf itself is organised into files and folders — is chapter 7’s ground: named here so the map is honest, opened there and not before. What THIS lesson keeps is what neither door carries: the census, the human ladder, and the price of every borrowed page.' },
    { kind: 'para', text: 'The same honesty settles this lesson’s debts to its neighbours. Lesson 4.2 — shelved in this library as cf the processor named honestly — built the pocket and priced the 0.2 ns beat; this lesson built the ladder around the pocket and priced every rung. Lesson 4.1 opened the box, and the firmware chip it met is the ROM cloth of section 2. The ladder now runs complete, from the registers to the ocean; what remains is the doorsteps, the exam corner, the formula sheet and the drill.' },

    // ================================================================
    // 9. THE DOORSTEPS AND THE EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'The Doorsteps, the Exam Corner and the Formula Sheet' },
    { kind: 'para', text: 'Three doorstep books stand around this lesson, and honesty means naming them instead of re-teaching their ground. Computer Organization and Architecture owns the hierarchy’s full theory door: miss rates, replacement policies and the multi-level designs that turn this census into working machines — go there for the architecture depth behind the pockets. Operating Systems owns virtual memory, named and left closed in the previous section. Digital Logic Design owns the gate-level view of the cells themselves — SRAM’s six transistors and DRAM’s transistor-plus-capacitor drawn as circuits, not as cloths. This lesson keeps what none of the three carries: the census, the human ladder, and the instinct for which memory pays which price.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — how this lesson is asked', text: 'The census and the names of this lesson are examination staples, asked here in our own exam-style wording — never quoted from a real paper. Banking and SSC computer-awareness papers ask the short truths: RAM against ROM, volatile against non-volatile, what happens to RAM at power-off (the expected one-word answer: lost), and what random access promises (the same time for every address). School boards ask for the ladder in order with one census value per rung, the two localities named and distinguished, and why cache is kept small (the six-transistor cloth is dear). Cambridge 9618 and A-level-style papers ask for mechanism and arithmetic together: how the leak forces DRAM’s 64 ms refresh cadence (15.625 visits per row per second), the human-ladder conversions, and the RAMAC census as a data question — 5,000,000 six-bit characters into 3,750,000 bytes. Drill the census cold; every long question is a short one wearing a coat.' },
    { kind: 'formula', name: 'Hit fraction', latex: 'h = \\frac{\\text{hits}}{\\text{requests}}', note: 'the share of asks the pocket answers; the locality pair scored 0.9 against 0.' },
    { kind: 'formula', name: 'Average memory access time (AMAT)', latex: '\\text{AMAT} = h \\cdot t_{\\text{fast}} + (1 - h) \\cdot t_{\\text{slow}}', note: 'the pocket’s leverage: at h = 0.9 with 0.5 ns and 100 ns, AMAT = 10.45 ns.' },
    { kind: 'formula', name: 'The human-ladder conversion', latex: 'T_{\\text{human}} = T_{\\text{machine}} \\times 2 \\times 10^{9}', note: 'one L1 hit becomes one second; every census ratio survives untouched.' },
    { kind: 'formula', name: 'The DRAM refresh cadence', latex: '\\text{visits per row per second} = \\frac{1000\\,\\text{ms}}{64\\,\\text{ms}} = 15.625', note: 'every row re-topped within the JEDEC 64 ms window.' },
    { kind: 'formula', name: 'The whole-ladder stretch', latex: '\\frac{t_{\\text{ocean}}}{t_{\\text{L1}}} = \\frac{150{,}000{,}000\\,\\text{ns}}{0.5\\,\\text{ns}} = 300{,}000{,}000', note: 'from the pocket to the ocean: eight orders of magnitude in one census.' },
    { kind: 'para', text: 'The chapter’s rung is now done, and it is worth seeing whole: the wish priced (fast, big, cheap — pick two), the two names taken honestly (RAM forgets at power-off, ROM keeps), the cells opened (1T1C against 6T, the 64 ms window), the census carried (0.5 ns to 150 ms, every ratio pinned), the human ladder walked (one second to about 9.5 years), the shelf’s history told (Dennard in 1966, RAMAC on 14 September 1956), the localities named (temporal and spatial), and virtual memory named and left closed. The checkpoint quiz and the graded drill are yours; the engine that pins every number above stands behind them.' },

    { kind: 'quiz', title: 'Checkpoint quiz', items: [
      {
        q: 'What does "random access" actually promise?',
        options: [
          'that the contents are shuffled at random for security',
          'that any address answers in the same time as any other',
          'that the memory keeps its contents when the power fails',
          'that the memory can be read but never written',
        ],
        answer: 1,
        explain: 'Option B is the promise: the uniform-time claim - the first and the millionth address answer alike, which is what makes programs writable as if every byte were equally near. Option A fails because "random" names no shuffling; the word describes the access pattern the memory tolerates, not its contents. Option C fails because surviving power-off is the volatility question, not the random-access one - RAM is in fact volatile and forgets. Option D fails because RAM is read AND written constantly during normal work; read-only is the ROM family, not RAM.',
      },
      {
        q: 'Why must DRAM be refreshed?',
        options: [
          'because its transistors wear out and must be replaced yearly',
          'because a security rule requires the memory to be wiped each second',
          'to raise its speed above SRAM during heavy loads',
          'because its capacitor leaks, so every row is re-topped within the JEDEC 64 ms window',
        ],
        answer: 3,
        explain: 'Option D is the mechanism: the 1T1C cell stores each bit as charge on a capacitor, the charge leaks through the guarding transistor, and the JEDEC standard gives every row a 64 ms window inside which it must be re-topped - 15.625 visits per row per second. Option A fails because the leak is charge physics, not wear; no transistor is replaced yearly. Option B fails because refresh RESTORES the stored values rather than erasing them - it is housekeeping, not security. Option C fails because refresh spends time and never lifts DRAM above SRAM; SRAM keeps its bit in six transistors with no refresh at all and stays the faster cloth.',
      },
      {
        q: 'How many L1 answers fit inside one RAM wait?',
        options: [
          '200 - the RAM wait of 100 ns is 200 times the L1 wait of 0.5 ns',
          '14 - the ratio of L2 to L1',
          '1,500 - the ratio of the SSD read to RAM',
          '66.6667 - the ratio of the HDD seek to the SSD read',
        ],
        answer: 0,
        explain: 'Option A is the census arithmetic: 100 ns / 0.5 ns = 200, so two hundred pocket answers fit inside one warehouse wait. Option B fails because 14 is the L2-to-L1 ratio (7 ns / 0.5 ns) - the pocket’s second shelf, not the warehouse stretch. Option C fails because 1,500 is the SSD’s ratio against RAM (150,000 ns / 100 ns), a rung far below the warehouse. Option D fails because 66.6667 compares the platter’s seek with the SSD’s read - the storage shelf’s own gap, not the pocket-to-warehouse one.',
      },
      {
        q: 'On the human ladder, how long is one HDD seek?',
        options: [
          'about 3.472222 days - the SSD read, not the seek',
          'about 9.5 years - the ocean round trip, not the seek',
          'about 7.6 months - 20,000,000 s rescaled, or 231.481481 days',
          'about 3 minutes 20 seconds - the RAM wait, not the seek',
        ],
        answer: 2,
        explain: 'Option C is the conversion: the 10 ms seek rescaled by two billion becomes 20,000,000 s, which is 231.481481 days, which is 7.605141 months - about 7.6 months of human patience for ONE ask. Option A fails because 3.472222 days prices the SSD’s random read (300,000 s), one rung above the platter. Option B fails because 9.5 years prices the ocean round trip (300,000,000 s), the ladder’s very bottom. Option D fails because 3 minutes 20 seconds prices the RAM wait (200 s) - the warehouse, not the shelf.',
      },
      {
        q: 'What did the IBM 350 disk - the drive inside the 305 RAMAC - store?',
        options: [
          '8,589,934,592 bytes on a single platter',
          '16,777,216 bytes of firmware code',
          '5,000,000 six-bit characters - about 3,750,000 bytes on 50 platters',
          '150,000,000 bytes streamed across an ocean cable',
        ],
        answer: 2,
        explain: 'Option C is the 1956 census: 5,000,000 characters at 6 bits each make 30,000,000 bits, which is 3,750,000 bytes in 8-bit counting, carried on 50 platters in a unit of about a ton. Option A fails because 8,589,934,592 bytes is this lesson’s 8 GiB DRAM census - a modern warehouse, not a 1956 disk, and no single platter held it. Option B fails because 16,777,216 bytes is the 16 MiB firmware-flash census of Illustration 2, a different shelf entirely. Option D fails because 150,000,000 is the ocean round trip’s latency in nanoseconds - a wait, not a storage size.',
      },
    ] },

    { kind: 'exercises', title: 'Graded exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'State the uniform-time promise, and say what RAM loses when the power goes off.',
            answer: 'Hence the two lines to carry: same time for every address; contents lost at power-off',
            solution: [
              'Split the question: it asks for the promise first, then the power-off behaviour.',
              'The promise: random access means any address answers in the same time as any other - a claim about timing, not about remembering.',
              'The power-off: RAM is volatile, so the contents are lost - one word, lost, is the expected answer.',
              'Hence the two lines to carry: same time for every address; contents lost at power-off.',
            ]
          },
          {
            q: 'RAM against ROM: which one survives power-off, and which cloth fills ROM’s job on today’s boards?',
            answer: 'Hence ROM survives power-off, and the cloth that fills its job today is flash',
            solution: [
              'Split the pair by the honest dividing line: volatility, not writability.',
              'ROM survives power-off - it is non-volatile, written rarely (factory or update) and read constantly.',
              'RAM forgets at power-off; that is the real division between the two names.',
              'Today’s ROM is flash: the firmware chip (BIOS/UEFI) of 4.1’s board, rewritten by updates, read every waking.',
              'Hence ROM survives power-off, and the cloth that fills its job today is flash.',
            ]
          },
          {
            q: 'Write the ladder’s six rungs in order from fastest to slowest, and put this lesson’s census value beside each.',
            answer: 'Hence the order stands: registers, L1, RAM, SSD, HDD, cloud - fastest at the top, as the diagram shows',
            solution: [
              'Take the rungs from the census: registers, L1, RAM, SSD, HDD, cloud.',
              'The census values: registers answer in one beat; L1 in 0.5 ns; RAM in 100 ns; the SSD read in 150 μs; the HDD seek in 10 ms; the ocean round trip in 150 ms.',
              'Check the order against the ratios: each rung is many times slower than the one above - 14, then 14.2857, then 1,500, then 66.6667, then 15.',
              'Hence the order stands: registers, L1, RAM, SSD, HDD, cloud - fastest at the top, as the diagram shows.',
            ],
            figures: [{ caption: 'The ordering the census gives, drawn fastest at the top with each rung’s census value and role beside it.', svg: cf43SolOrderSvg() }],
          },
          {
            q: 'Name the two localities and give one honest example of each from ordinary programming.',
            answer: 'Hence the pair to carry: temporal locality - used once, used again soon; spatial locality - used once, its neighbours are wanted',
            solution: [
              'The two names: temporal locality and spatial locality.',
              'Temporal: used once, used again soon - a loop’s counter and accumulator are touched thousands of times in microseconds.',
              'Spatial: used once, its neighbours are wanted - after reading one element of an array the program wants the next, and after one instruction the very next instruction beside it.',
              'Hence the pair to carry: temporal locality - used once, used again soon; spatial locality - used once, its neighbours are wanted.',
            ]
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Compute the ratio of the L2 wait to the L1 wait from the census, and say what it becomes on the human ladder.',
            answer: 'Hence the ratio is 14, and it survives the rescaling untouched: L2 costs 14 s',
            solution: [
              'Take the census: L1 answers in 0.5 ns; L2 in 7 ns.',
              'Divide: 7 / 0.5 = 14.',
              'On the human ladder (one L1 hit = 1 s): the L2 wait is 14 of those seconds - a long coffee sip.',
              'Hence the ratio is 14, and it survives the rescaling untouched: L2 costs 14 s.',
            ]
          },
          {
            q: 'From the census, compute RAM’s ratio against L1 and against L2, and check the two against each other.',
            answer: 'Hence the pair is 200 x L1 and 14.2857 x L2, and they compose to the same rung',
            solution: [
              'Against L1: 100 / 0.5 = 200 - two hundred pocket answers inside one warehouse wait.',
              'Against L2: 100 / 7 = 14.2857 (the engine pins 14.2857; the exact value is 100/7).',
              'Check against each other: 14 x 14.2857 = 200 to the pin’s precision - the two ratios must compose, because the ladder is a chain.',
              'Hence the pair is 200 x L1 and 14.2857 x L2, and they compose to the same rung.',
            ]
          },
          {
            q: 'Verify from the census that one SSD random read costs 1,500 RAM waits.',
            answer: 'Hence 1,500 RAM waits fit inside one SSD random read - the first rung of the shelf below the warehouse',
            solution: [
              'Take the pair: the SSD random read is 150 μs = 150,000 ns; the RAM wait is 100 ns.',
              'Divide: 150,000 / 100 = 1,500.',
              'Check the units: both waits are in nanoseconds, so the ratio is bare.',
              'Hence 1,500 RAM waits fit inside one SSD random read - the first rung of the shelf below the warehouse.',
            ]
          },
          {
            q: 'Compute how many HDD seeks fit inside one ocean round trip, and how many L1 answers fit inside the same trip.',
            answer: 'Hence 15 seeks and 300,000,000 L1 answers fit inside one ocean round trip',
            solution: [
              'Seeks inside the trip: 150 ms / 10 ms = 15.',
              'L1 answers inside the trip: 150,000,000 ns / 0.5 ns = 300,000,000.',
              'Check by composition: the whole ratio chain must multiply out to the whole-ladder stretch, and it does when the ratios are kept exact (the pinned 66.6667 is the rounded face of 10,000,000/150,000).',
              'Hence 15 seeks and 300,000,000 L1 answers fit inside one ocean round trip.',
            ]
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'Put the SSD’s random read on the human ladder: rescale it so one L1 hit takes one second, and give the wait in seconds and in days.',
            answer: 'Hence the human wait is 300,000 s = 3.472222 days - a long weekend for one flash read',
            solution: [
              'The scale: one L1 hit (0.5 ns) is made to take 1 s, so every wait grows by 2,000,000,000.',
              'Route the ratios: the SSD read is 1,500 x the RAM wait, and RAM is 200 x L1 - so the read is 1,500 x 200 = 300,000 pocket seconds.',
              'So the human wait is 300,000 s.',
              'Convert the seconds: 300,000 / 86,400 = 3.472222 days.',
              'Hence the human wait is 300,000 s = 3.472222 days - a long weekend for one flash read.',
            ]
          },
          {
            q: 'Convert the HDD seek’s human-ladder wait into days and months, and state it as the prose does.',
            answer: 'Hence one seek costs 231.481481 days = 7.605141 months - about 7.6 months in prose',
            solution: [
              'Take the rescaled seek: the 10 ms wait grows by 2,000,000,000 into 20,000,000 s.',
              'Days: 20,000,000 / 86,400 = 231.481481 days.',
              'Months, on the honest average month of 30.4375 days (365.25/12): 231.481481 / 30.4375 = 7.605141 months.',
              'Hence one seek costs 231.481481 days = 7.605141 months - about 7.6 months in prose.',
            ]
          },
          {
            q: 'From the JEDEC window, compute how many times each DRAM row is re-topped per second, and point to where the leak sits in the 1T1C cell.',
            answer: 'Hence 15.625 refresh visits per row per second, inside each 64 ms window',
            solution: [
              'The window: every row must be re-topped within 64 ms.',
              'Windows per second: 1,000 ms / 64 ms = 15.625.',
              'So each row receives 15.625 visits every second the machine is awake.',
              'The leak sits at the capacitor: the charge trickles through the very transistor that guards it - the diagram marks it.',
              'Hence 15.625 refresh visits per row per second, inside each 64 ms window.',
            ],
            figures: [{ caption: 'The 1T1C cell with its leak and its 64 ms refresh loop, drawn for this drill.', svg: cf43SolCellSvg() }],
          },
          {
            q: 'Recite the census as a ratio chain: each rung against the one above it, all six rungs.',
            answer: 'Hence the chain reads 14, then 14.2857 (or 200 x L1), then 1,500, then 66.6667, then 15 x HDD - the diagram draws each rung against the one above',
            solution: [
              'The chain, rung by rung: L2 is 14 x L1 (7 / 0.5).',
              'RAM is 14.2857 x L2 (100 / 7), which is the same 200 x L1.',
              'The SSD read is 1,500 x RAM (150,000 / 100); the HDD seek is 66.6667 x the SSD read (10,000,000 / 150,000).',
              'The ocean round trip is 15 x the HDD seek (150,000,000 / 10,000,000).',
              'Hence the chain reads 14, then 14.2857 (or 200 x L1), then 1,500, then 66.6667, then 15 x HDD - the diagram draws each rung against the one above.',
            ],
            figures: [{ caption: 'The census as log bars: each rung’s wait against the rung above, with the ratio printed on the bar.', svg: cf43SolRatioSvg() }],
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'The 305 RAMAC’s IBM 350 disk stored 5,000,000 characters of 6 bits each on 50 platters. Convert the cargo to 8-bit bytes, compute the bytes per platter, and compare the cargo with today’s 8 GiB warehouse census.',
            answer: 'Hence 5,000,000 x 6/8 = 3,750,000 bytes, and 3,750,000 / 50 = 75,000 bytes per platter - the diagram lays the chain out chip by chip',
            solution: [
              'The bit cargo: 5,000,000 x 6 = 30,000,000 bits.',
              'Convert to 8-bit bytes: 30,000,000 / 8 = 3,750,000 bytes - about 3.75 MB in SI counting (3.5762787 MiB in binary).',
              'Per platter: 3,750,000 / 50 = 75,000 bytes.',
              'Compare with today: 8 GiB = 8,589,934,592 bytes, so the 1956 cargo is about 1/2,290 of one modern warehouse - seven orders of magnitude in seventy years.',
              'Hence 5,000,000 x 6/8 = 3,750,000 bytes, and 3,750,000 / 50 = 75,000 bytes per platter - the diagram lays the chain out chip by chip.',
            ],
            figures: [{ caption: 'The RAMAC arithmetic as a chip chain - characters to bits to bytes - with the 50-platter strip beneath.', svg: cf43SolRamacSvg() }],
          },
          {
            q: 'One workload fires 1,000 scattered reads with no locality. Price the run on the SSD shelf and on the HDD shelf, and say how many RAM fetches fit inside one ocean round trip.',
            answer: 'Hence the bills are 150 ms and 10 s, and one ocean round trip buys time for 1,500,000 RAM fetches',
            solution: [
              'The SSD bill: 1,000 x 150 μs = 150,000 μs = 150 ms.',
              'The HDD bill: 1,000 x 10 ms = 10,000 ms = 10 s.',
              'Check the gap: 10 s / 0.15 s = 66.6667 - the same race, sixty-six times longer on platters.',
              'The ocean: 150,000,000 ns / 100 ns = 1,500,000 RAM fetches per round trip.',
              'Hence the bills are 150 ms and 10 s, and one ocean round trip buys time for 1,500,000 RAM fetches.',
            ]
          },
          {
            q: 'Two readers make ten page requests each through a pocket that opens a five-page line per fetch. Reader A reads pages 5 to 14 in order; reader B asks 5, 23, 7, 41, 2, 19, 33, 8, 27, 14. Compute both hit fractions and both average waits (pocket 0.5 ns, warehouse 100 ns).',
            answer: 'Hence reader A’s hit fraction is 90% (10.45 ns) and reader B’s is 0% (100 ns) - the diagram plots both on one axis',
            solution: [
              'Reader A: the first ask misses and opens the line; the other nine land inside it - 9 hits in 10.',
              'Reader A’s fraction: 9/10 = 90%; the average wait: 0.9 x 0.5 + 0.1 x 100 = 10.45 ns.',
              'Reader B: no ask lands inside the line the last fetch opened - 0 hits in 10, a fraction of 0%.',
              'Reader B’s wait: the warehouse’s full 100 ns on every ask - the pocket earns nothing.',
              'Hence reader A’s hit fraction is 90% (10.45 ns) and reader B’s is 0% (100 ns) - the diagram plots both on one axis.',
            ],
            figures: [{ caption: 'The two hit fractions on one percent axis: 90% against 0%, the locality pair priced.', svg: cf43SolHitsSvg() }],
          },
        ],
      },
    ] },
  ],
}
