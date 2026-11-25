/* part-cf44 — lesson 4.4 'Buses and Ports: How the Pieces Talk'
   Computer Fundamentals, chapter 4 'Inside the Box'. Seat tag 44. */
import type { Lesson } from '../../../src/data/library/types'

/* palette (vivid set; never blue/indigo) */
const c44 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f44 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order so audits can parse labels */
function cf44T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the three-bus strip: address/data/control as three */
/* labelled roads, with the one-transaction-at-a-time queue drawn on    */
/* the shared segment                                                  */
/* ------------------------------------------------------------------ */
function cf44BusStripSvg(): string {
  const W = 720
  const H = 344
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f44}" role="img" aria-label="The three-bus strip. Three boxes - CPU, chipset, RAM and ports - stand on one row, joined by three parallel roads: the address bus asking where, the data bus carrying what, and the control bus timing when and how. Below, a queue panel shows three transactions waiting for the shared data road: T1 owns it now while T2 and T3 wait, one transaction at a time.">`)
  s.push(cf44T(W / 2, 32, 12, c44.teal, 'middle', 'THE THREE-BUS STRIP - ONE PURPOSE PER ROAD', true))
  /* the three component boxes */
  const boxY = 70, boxH = 80
  const boxes = [
    { x: 40, w: 110, a: 'CPU', b: 'asks and computes' },
    { x: 305, w: 110, a: 'Chipset', b: 'the traffic office' },
    { x: 570, w: 110, a: 'RAM + ports', b: 'store and speak out' },
  ]
  for (const bx of boxes) {
    s.push(`<rect x="${bx.x}" y="${boxY}" width="${bx.w}" height="${boxH}" rx="8" fill="${c44.white}" stroke="${c44.struct}" stroke-width="2"/>`)
    s.push(cf44T(bx.x + bx.w / 2, boxY + 34, 11, c44.ink, 'middle', bx.a, true))
    s.push(cf44T(bx.x + bx.w / 2, boxY + 54, 9, c44.tealInk, 'middle', bx.b))
  }
  /* three bus lines in two segments */
  const segs = [
    { x0: 150, x1: 305, lx: 227 },
    { x0: 415, x1: 570, lx: 492 },
  ]
  const lines = [
    { y: 88, col: c44.accent, name: 'ADDRESS bus - where' },
    { y: 110, col: c44.struct, name: 'DATA bus - what' },
    { y: 132, col: c44.conn, name: 'CONTROL bus - when and how' },
  ]
  for (const g of segs) {
    for (const L of lines) {
      s.push(`<line x1="${g.x0}" y1="${L.y}" x2="${g.x1}" y2="${L.y}" stroke="${L.col}" stroke-width="3"/>`)
      s.push(`<circle cx="${g.x0}" cy="${L.y}" r="3" fill="${L.col}"/>`)
      s.push(`<circle cx="${g.x1}" cy="${L.y}" r="3" fill="${L.col}"/>`)
    }
    s.push(cf44T(g.lx, 80, 9, c44.accent, 'middle', lines[0].name))
    s.push(cf44T(g.lx, 104, 9, c44.ink, 'middle', lines[1].name))
    s.push(cf44T(g.lx, 126, 9, c44.conn, 'middle', lines[2].name))
  }
  /* the queue on the shared segment */
  s.push(`<rect x="40" y="196" width="640" height="132" rx="8" fill="${c44.panelB}" stroke="${c44.conn}" stroke-width="2"/>`)
  s.push(cf44T(W / 2, 220, 11, c44.ink, 'middle', 'THE SHARED SEGMENT - ONE TRANSACTION AT A TIME', true))
  const chips = [
    { x: 60, a: 'T1: CPU reads RAM', b: 'owns the road NOW' },
    { x: 240, a: 'T2: disk writes', b: 'waits in the queue' },
    { x: 420, a: 'T3: packet out', b: 'waits behind T2' },
  ]
  for (let i = 0; i < chips.length; i++) {
    const ch = chips[i]
    s.push(`<rect x="${ch.x}" y="238" width="160" height="46" rx="6" fill="${i === 0 ? c44.panelA : c44.white}" stroke="${i === 0 ? c44.accent : c44.struct}" stroke-width="2"/>`)
    s.push(cf44T(ch.x + 80, 257, 9.5, c44.ink, 'middle', ch.a, true))
    s.push(cf44T(ch.x + 80, 273, 9, i === 0 ? c44.accent : c44.tealInk, 'middle', ch.b))
  }
  s.push(cf44T(W / 2, 308, 10, c44.ink, 'middle', 'while T1 owns the data road, T2 and T3 wait - the jam is honest rush hour'))
  s.push(cf44T(W / 2, 322, 9, c44.tealInk, 'middle', 'sharing one road is cheap and universal; the queue is the price'))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F2 — the width arithmetic bar: 8/16/32/64 address lines  */
/* against the memory they name; log bars, 4 GiB witness highlighted    */
/* ------------------------------------------------------------------ */
function cf44WidthBarsSvg(): string {
  const W = 720
  const unit = 5.5
  const base = 480
  const H = 560
  const x0 = 100
  const stride = 150
  const barW = 88
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f44}" role="img" aria-label="The width arithmetic bar. Four bars for 8, 16, 32 and 64 address lines, with heights growing one doubling per step because each added line doubles the reach. Eight lines name 256 bytes, sixteen name 64 KiB, thirty-two name exactly 4 GiB - highlighted as the witness - and sixty-four name 16 EiB. A witness strip notes that 4,294,967,296 bytes divided by 2 to the 30 is exactly 4.">`)
  s.push(cf44T(W / 2, 30, 12, c44.teal, 'middle', 'THE WIDTH ARITHMETIC BAR - n LINES NAME 2^n ADDRESSES', true))
  const bars = [
    { n: 8, exp: '2^8', val: '256 B', fill: c44.white, stroke: c44.struct },
    { n: 16, exp: '2^16', val: '65,536 B = 64 KiB', fill: c44.white, stroke: c44.struct },
    { n: 32, exp: '2^32', val: '4,294,967,296 B', fill: c44.panelA, stroke: c44.accent },
    { n: 64, exp: '2^64', val: '18,446,744,073,709,551,616 B', fill: c44.white, stroke: c44.struct },
  ]
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i]
    const h = b.n * unit
    const top = base - h
    const x = x0 + i * stride
    s.push(`<rect x="${x}" y="${top}" width="${barW}" height="${h}" rx="4" fill="${b.fill}" stroke="${b.stroke}" stroke-width="${b.n === 32 ? 2.5 : 2}"/>`)
    s.push(cf44T(x + barW / 2, top - 22, 10.5, c44.ink, 'middle', b.exp, true))
    s.push(cf44T(x + barW / 2, top - 8, 9, c44.tealInk, 'middle', b.val))
    s.push(cf44T(x + barW / 2, base - 6, 10, i === 2 ? c44.accent : c44.ink, 'middle', `${b.n} lines`, true))
  }
  s.push(`<line x1="60" y1="${base}" x2="660" y2="${base}" stroke="${c44.ink}" stroke-width="2"/>`)
  s.push(cf44T(W / 2, base + 20, 9.5, c44.tealInk, 'middle', 'bar heights step one doubling per rung - each added line doubles the memory named'))
  /* the witness strip */
  s.push(`<rect x="40" y="496" width="640" height="48" rx="8" fill="${c44.panelB}" stroke="${c44.conn}" stroke-width="2"/>`)
  s.push(cf44T(W / 2, 514, 10.5, c44.ink, 'middle', 'THE WITNESS: 32 lines name exactly 4,294,967,296 bytes = 4 GiB', true))
  s.push(cf44T(W / 2, 532, 9.5, c44.tealInk, 'middle', 'the honest ladder closes the loop: 4,294,967,296 / 2^30 = 4'))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — the PCIe generation ladder: per-lane bars plus the  */
/* x16 bundle rows, with the encoding toll drawn as the honest gate     */
/* ------------------------------------------------------------------ */
function cf44PcieLadderSvg(): string {
  const W = 720
  const H = 640
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f44}" role="img" aria-label="The PCIe generation ladder. Top panel: per-lane payload bars for generation 1 at 250 MB/s, generation 3 at 984.6154 MB/s, generation 4 at 1969.2308 MB/s and generation 5 at 3938.4615 MB/s - each generation doubles the last. Bottom panel: the x16 bundles as horizontal bars, 4 GB/s, 15.7538 GB/s, 31.5077 GB/s and 63.0154 GB/s. A toll gate strip explains that GT/s counts transfers, not bytes, and names the two encoding tolls.">`)
  s.push(cf44T(W / 2, 28, 12, c44.teal, 'middle', 'THE PCIE GENERATION LADDER - PER LANE, THEN THE x16 BUNDLE', true))
  /* panel A: per-lane bars */
  const base = 240
  const scale = 0.045
  const x0 = 110
  const stride = 140
  const barW = 84
  const gens = [
    { name: 'gen 1.0', meta: '2.5 GT/s, 8b/10b toll', mb: 250, label: '250' },
    { name: 'gen 3.0 (2010)', meta: '8 GT/s, 128b/130b toll', mb: 984.6154, label: '984.6154' },
    { name: 'gen 4.0 (2017)', meta: '16 GT/s, 128b/130b toll', mb: 1969.2308, label: '1969.2308' },
    { name: 'gen 5.0 (2019)', meta: '32 GT/s, 128b/130b toll', mb: 3938.4615, label: '3938.4615' },
  ]
  for (let i = 0; i < gens.length; i++) {
    const g = gens[i]
    const h = g.mb * scale
    const top = base - h
    const x = x0 + i * stride
    s.push(`<rect x="${x}" y="${top}" width="${barW}" height="${h}" rx="4" fill="${i === 0 ? c44.white : c44.panelA}" stroke="${i === 0 ? c44.struct : c44.accent}" stroke-width="2"/>`)
    s.push(cf44T(x + barW / 2, top - 20, 10.5, c44.ink, 'middle', g.label, true))
    s.push(cf44T(x + barW / 2, top - 7, 9, c44.tealInk, 'middle', 'MB/s per lane'))
    s.push(cf44T(x + barW / 2, base + 18, 9.5, c44.ink, 'middle', g.name, true))
    s.push(cf44T(x + barW / 2, base + 33, 9, c44.tealInk, 'middle', g.meta))
  }
  s.push(`<line x1="80" y1="${base}" x2="660" y2="${base}" stroke="${c44.ink}" stroke-width="2"/>`)
  /* panel B: x16 bundles */
  s.push(cf44T(W / 2, 316, 11, c44.ink, 'middle', 'THE x16 BUNDLE - SIXTEEN LANES TOGETHER', true))
  const bx = 210
  const bscale = 6
  const rows = [
    { name: 'x16 gen1', gb: 4, label: '4 GB/s' },
    { name: 'x16 gen3 (2010)', gb: 15.7538, label: '15.7538 GB/s' },
    { name: 'x16 gen4 (2017)', gb: 31.5077, label: '31.5077 GB/s' },
    { name: 'x16 gen5 (2019)', gb: 63.0154, label: '63.0154 GB/s' },
  ]
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    const y = 336 + i * 36
    s.push(`<rect x="${bx}" y="${y}" width="${r.gb * bscale}" height="22" rx="4" fill="${i >= 2 ? c44.panelA : c44.white}" stroke="${i >= 2 ? c44.accent : c44.struct}" stroke-width="2"/>`)
    s.push(cf44T(bx - 8, y + 15, 9.5, c44.ink, 'end', r.name, true))
    s.push(cf44T(bx + r.gb * bscale + 6, y + 15, 9.5, c44.tealInk, 'start', r.label))
  }
  /* the toll gate strip */
  s.push(`<rect x="40" y="496" width="640" height="110" rx="8" fill="${c44.panelB}" stroke="${c44.conn}" stroke-width="2"/>`)
  s.push(cf44T(W / 2, 520, 10.5, c44.ink, 'middle', 'THE TOLL GATE - GT/s COUNTS TRANSFERS, NOT BYTES', true))
  s.push(cf44T(W / 2, 542, 9.5, c44.tealInk, 'middle', 'gen 1.0 pays the 8b/10b toll: 10 wire bits carry 8 payload bits - 20 percent wasted'))
  s.push(cf44T(W / 2, 560, 9.5, c44.tealInk, 'middle', 'gen 3.0 and beyond pay the 128b/130b toll: 130 wire bits carry 128 - about 1.6 percent wasted'))
  s.push(cf44T(W / 2, 582, 9.5, c44.accent, 'middle', 'one gen 3.0 lane: 8 x 128/130 / 8 = 984.615385 MB/s - the derivation this lesson walks', true))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the port wall: the I/O panel drawn with plugs,      */
/* each captioned with its generation and rate from the census          */
/* ------------------------------------------------------------------ */
function cf44PortWallSvg(): string {
  const W = 720
  const H = 400
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f44}" role="img" aria-label="The port wall. The rear I/O panel of a computer drawn with six doorways: two USB-A plugs captioned USB 2.0 at 480 Mbps from 2000 and USB 3.0 at 5 Gbps from 2008, a USB-C plug captioned USB4 at 40 Gbps from 2019 with the connector specified in August 2014, an HDMI plug captioned 2.1 at 48 Gbps from 2017, an Ethernet jack at 1 Gbit/s, and audio jacks. A caption strip stresses that the plug is not the speed - the roads behind it are.">`)
  s.push(cf44T(W / 2, 30, 12, c44.teal, 'middle', 'THE PORT WALL - THE BOX\'S DOORWAYS TO THE WORLD', true))
  s.push(`<rect x="40" y="52" width="640" height="252" rx="10" fill="${c44.paper}" stroke="${c44.ink}" stroke-width="2"/>`)
  const cols = [90, 196, 302, 408, 514, 620]
  /* row: plugs */
  s.push(`<rect x="${cols[0] - 27}" y="104" width="54" height="26" fill="${c44.white}" stroke="${c44.struct}" stroke-width="2"/>`)
  s.push(cf44T(cols[0], 121, 9.5, c44.ink, 'middle', 'USB-A', true))
  s.push(`<rect x="${cols[1] - 27}" y="104" width="54" height="26" fill="${c44.white}" stroke="${c44.struct}" stroke-width="2"/>`)
  s.push(cf44T(cols[1], 121, 9.5, c44.ink, 'middle', 'USB-A', true))
  s.push(`<rect x="${cols[2] - 32}" y="107" width="64" height="20" rx="10" fill="${c44.white}" stroke="${c44.accent}" stroke-width="2"/>`)
  s.push(cf44T(cols[2], 121, 9.5, c44.ink, 'middle', 'USB-C', true))
  s.push(`<polygon points="${cols[3] - 32},104 ${cols[3] + 32},104 ${cols[3] + 27},130 ${cols[3] - 27},130" fill="${c44.white}" stroke="${c44.conn}" stroke-width="2"/>`)
  s.push(cf44T(cols[3], 121, 9.5, c44.ink, 'middle', 'HDMI', true))
  s.push(`<rect x="${cols[4] - 28}" y="100" width="56" height="34" fill="${c44.white}" stroke="${c44.teal}" stroke-width="2"/>`)
  s.push(cf44T(cols[4], 121, 9.5, c44.ink, 'middle', 'ETH', true))
  for (const dx of [-20, 0, 20]) {
    s.push(`<circle cx="${cols[5] + dx}" cy="117" r="9" fill="${c44.faint}" stroke="${c44.tealInk}" stroke-width="2"/>`)
  }
  /* row: captions (three lines each) */
  const caps = [
    ['USB 2.0', '2000', '480 Mbps'],
    ['USB 3.0', '2008', '5 Gbps'],
    ['USB4 (2019)', '40 Gbps', 'USB-C: Aug 2014'],
    ['HDMI 2.1', '2017', '48 Gbps'],
    ['Ethernet', 'common', '1 Gbit/s'],
    ['audio jacks', 'analogue', 'not a data road'],
  ]
  for (let i = 0; i < cols.length; i++) {
    s.push(cf44T(cols[i], 158, 9.5, c44.ink, 'middle', caps[i][0], true))
    s.push(cf44T(cols[i], 174, 9, c44.tealInk, 'middle', caps[i][1]))
    s.push(cf44T(cols[i], 190, 9, c44.tealInk, 'middle', caps[i][2]))
    s.push(`<line x1="${cols[i] - 40}" y1="200" x2="${cols[i] + 40}" y2="200" stroke="${c44.faint}" stroke-width="1.5"/>`)
  }
  /* second caption row: the honest divide begins here */
  const caps2 = [
    ['line rate 60 MB/s', 'usable near 40'],
    ['line rate 625 MB/s', 'before tolls'],
    ['shape, not speed', 'one plug, many roads'],
    ['1080p60 needed 4.95', 'Gbps in 2002'],
    ['the WAN door', 'see the shelf'],
    ['speaks to ears', 'not to buses'],
  ]
  for (let i = 0; i < cols.length; i++) {
    s.push(cf44T(cols[i], 226, 9, c44.tealInk, 'middle', caps2[i][0]))
    s.push(cf44T(cols[i], 242, 9, c44.tealInk, 'middle', caps2[i][1]))
  }
  s.push(cf44T(W / 2, 288, 10, c44.conn, 'middle', 'every caption prices the road BEHIND the doorway - from the census this lesson pins', true))
  /* bottom strip */
  s.push(`<rect x="40" y="318" width="640" height="64" rx="8" fill="${c44.panelB}" stroke="${c44.conn}" stroke-width="2"/>`)
  s.push(cf44T(W / 2, 340, 10.5, c44.ink, 'middle', 'THE PLUG IS NOT THE SPEED - THE ROADS BEHIND IT ARE', true))
  s.push(cf44T(W / 2, 360, 9.5, c44.tealInk, 'middle', 'USB-C (specified August 2014) is a SHAPE: the same plug carries USB 2.0 or USB4'))
  s.push(cf44T(W / 2, 375, 9.5, c44.tealInk, 'middle', 'read generations and rates, never the connector alone'))
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURES                                                     */
/* ------------------------------------------------------------------ */
function cf44SolThreeBusSvg(): string {
  const W = 460
  const H = 216
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f44}" role="img" aria-label="Mini three-bus map. A CPU box and a RAM box joined by three labelled lines: the address line asking where, the data line carrying what, and the control line timing when and how. Below, three small chips show T1 owning the data road while T2 and T3 wait, one transaction at a time.">`)
  s.push(`<rect x="30" y="40" width="80" height="70" rx="8" fill="${c44.white}" stroke="${c44.struct}" stroke-width="2"/>`)
  s.push(cf44T(70, 80, 10.5, c44.ink, 'middle', 'CPU', true))
  s.push(`<rect x="350" y="40" width="80" height="70" rx="8" fill="${c44.white}" stroke="${c44.struct}" stroke-width="2"/>`)
  s.push(cf44T(390, 80, 10.5, c44.ink, 'middle', 'RAM', true))
  const rows = [
    { y: 58, col: c44.accent, name: 'ADDRESS - where' },
    { y: 75, col: c44.struct, name: 'DATA - what' },
    { y: 92, col: c44.conn, name: 'CONTROL - when and how' },
  ]
  for (const r of rows) {
    s.push(`<line x1="110" y1="${r.y}" x2="350" y2="${r.y}" stroke="${r.col}" stroke-width="3"/>`)
    s.push(cf44T(230, r.y - 5, 9, r.col, 'middle', r.name, true))
  }
  const chips = [
    { x: 60, a: 'T1 owns it' },
    { x: 180, a: 'T2 waits' },
    { x: 300, a: 'T3 waits' },
  ]
  for (let i = 0; i < chips.length; i++) {
    s.push(`<rect x="${chips[i].x}" y="130" width="100" height="30" rx="6" fill="${i === 0 ? c44.panelA : c44.white}" stroke="${i === 0 ? c44.accent : c44.struct}" stroke-width="2"/>`)
    s.push(cf44T(chips[i].x + 50, 149, 9.5, c44.ink, 'middle', chips[i].a, true))
  }
  s.push(cf44T(W / 2, 186, 9.5, c44.ink, 'middle', 'one shared data road - one transaction at a time'))
  s.push(cf44T(W / 2, 202, 9, c44.tealInk, 'middle', 'three roads, three questions: where, what, when'))
  s.push('</svg>')
  return s.join('')
}

function cf44SolWidth30Svg(): string {
  const W = 520
  const H = 260
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f44}" role="img" aria-label="Sizing a 1 GiB memory. Two check boxes: 29 lines name 536,870,912 bytes, which is 512 MiB and falls short; 30 lines name 1,073,741,824 bytes, which is exactly 1 GiB and fits. A closing strip names 30 lines as the least width that suffices.">`)
  s.push(cf44T(W / 2, 34, 11, c44.teal, 'middle', 'SIZING A 1 GiB MEMORY - FIND THE LEAST n WITH 2^n >= 1 GiB', true))
  s.push(`<rect x="40" y="56" width="440" height="52" rx="8" fill="${c44.white}" stroke="${c44.warn}" stroke-width="2"/>`)
  s.push(cf44T(W / 2, 78, 10, c44.ink, 'middle', '29 lines name 2^29 = 536,870,912 B = 512 MiB', true))
  s.push(cf44T(W / 2, 96, 9.5, c44.warn, 'middle', 'falls short - half of what is asked'))
  s.push(`<rect x="40" y="136" width="440" height="52" rx="8" fill="${c44.panelA}" stroke="${c44.accent}" stroke-width="2.5"/>`)
  s.push(cf44T(W / 2, 158, 10, c44.ink, 'middle', '30 lines name 2^30 = 1,073,741,824 B = 1 GiB', true))
  s.push(cf44T(W / 2, 176, 9.5, c44.struct, 'middle', 'reaches exactly - the least width that suffices'))
  s.push(`<rect x="40" y="208" width="440" height="36" rx="8" fill="${c44.panelB}" stroke="${c44.conn}" stroke-width="2"/>`)
  s.push(cf44T(W / 2, 231, 10, c44.ink, 'middle', 'answer: 30 address lines, with nothing to spare', true))
  s.push('</svg>')
  return s.join('')
}

function cf44SolTollSvg(): string {
  const W = 610
  const H = 224
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f44}" role="img" aria-label="Pricing one PCIe 3.0 lane through the toll gate. A four-box pipeline: 8 GT/s of transfers, times 128 over 130 gives 7.876923 Gbit/s of payload, divided by 8 gives 0.984615 GB/s, times 1000 gives 984.6154 MB/s per lane. A strip names the toll: 130 wire bits carry 128 payload bits.">`)
  s.push(cf44T(W / 2, 32, 11, c44.teal, 'middle', 'PRICING ONE PCIE 3.0 LANE - THROUGH THE TOLL GATE', true))
  const boxes = [
    { x: 20, a: '8 GT/s', b: 'transfers' },
    { x: 170, a: '7.876923', b: 'Gbit/s payload' },
    { x: 320, a: '0.984615', b: 'GB/s' },
    { x: 470, a: '984.6154', b: 'MB/s per lane' },
  ]
  for (let i = 0; i < boxes.length; i++) {
    const b = boxes[i]
    s.push(`<rect x="${b.x}" y="60" width="120" height="52" rx="8" fill="${i === 3 ? c44.panelA : c44.white}" stroke="${i === 3 ? c44.accent : c44.struct}" stroke-width="2"/>`)
    s.push(cf44T(b.x + 60, 82, 10.5, c44.ink, 'middle', b.a, true))
    s.push(cf44T(b.x + 60, 100, 9, c44.tealInk, 'middle', b.b))
  }
  const arrows = [
    { x: 155, t: 'x 128/130' },
    { x: 305, t: 'divide by 8' },
    { x: 455, t: 'x 1000' },
  ]
  for (const a of arrows) {
    s.push(`<line x1="${a.x - 12}" y1="86" x2="${a.x + 12}" y2="86" stroke="${c44.ink}" stroke-width="2"/>`)
    s.push(`<polygon points="${a.x + 12},82 ${a.x + 12},90 ${a.x + 18},86" fill="${c44.ink}"/>`)
    s.push(cf44T(a.x, 132, 9, c44.conn, 'middle', a.t, true))
  }
  s.push(`<rect x="20" y="160" width="570" height="44" rx="8" fill="${c44.panelB}" stroke="${c44.conn}" stroke-width="2"/>`)
  s.push(cf44T(W / 2, 178, 10, c44.ink, 'middle', 'THE TOLL: 130 wire bits carry 128 payload bits - GT/s is NOT the byte rate', true))
  s.push(cf44T(W / 2, 195, 9.5, c44.tealInk, 'middle', 'every x16 bundle is 16 of these lanes multiplied together'))
  s.push('</svg>')
  return s.join('')
}

function cf44SolUsbStairsSvg(): string {
  const W = 560
  const H = 300
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f44}" role="img" aria-label="The USB generation staircase. Four steps rise from USB 1.0 in 1996 at 12 Mbps, to USB 2.0 in 2000 at 480 Mbps, to USB 3.0 in 2008 at 5 Gbps, to USB4 in 2019 at 40 Gbps. Ratio labels between the steps read 40 times, 10.416667 times and 8 times.">`)
  s.push(cf44T(W / 2, 26, 11, c44.teal, 'middle', 'THE USB GENERATION STAIRCASE - LOG HEIGHTS', true))
  const unit = 11
  const base = 230
  const x0 = 50
  const stride = 120
  const barW = 80
  const steps = [
    { a: '1996', b: '12 Mbps', rate: 12, name: 'USB 1.0' },
    { a: '2000', b: '480 Mbps', rate: 480, name: 'USB 2.0' },
    { a: '2008', b: '5 Gbps', rate: 5000, name: 'USB 3.0' },
    { a: '2019', b: '40 Gbps', rate: 40000, name: 'USB4' },
  ]
  for (let i = 0; i < steps.length; i++) {
    const st = steps[i]
    const h = Math.log2(st.rate) * unit
    const top = base - h
    const x = x0 + i * stride
    s.push(`<rect x="${x}" y="${top}" width="${barW}" height="${h}" rx="4" fill="${i === 3 ? c44.panelA : c44.white}" stroke="${i === 3 ? c44.accent : c44.struct}" stroke-width="2"/>`)
    s.push(cf44T(x + barW / 2, top - 18, 10, c44.ink, 'middle', st.a, true))
    s.push(cf44T(x + barW / 2, top - 6, 9.5, c44.tealInk, 'middle', st.b))
    s.push(cf44T(x + barW / 2, base + 20, 9.5, c44.ink, 'middle', st.name, true))
  }
  s.push(`<line x1="40" y1="${base}" x2="510" y2="${base}" stroke="${c44.ink}" stroke-width="2"/>`)
  const ratios = [
    { x: 150, t: 'x40 (480/12)' },
    { x: 270, t: 'x10.416667 (5000/480)' },
    { x: 390, t: 'x8 (40/5)' },
  ]
  for (const r of ratios) {
    s.push(`<line x1="${r.x - 18}" y1="252" x2="${r.x + 18}" y2="252" stroke="${c44.conn}" stroke-width="2"/>`)
    s.push(cf44T(r.x, 274, 9, c44.conn, 'middle', r.t, true))
  }
  s.push(cf44T(W / 2, 292, 9, c44.tealInk, 'middle', 'each step bought less ratio than the last - yet each still doubled daily usability'))
  s.push('</svg>')
  return s.join('')
}

function cf44SolRaceSvg(): string {
  const W = 560
  const H = 256
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f44}" role="img" aria-label="The bandwidth competition. Two horizontal bars for the same second: the x16 gen4 graphics road at 31,507.6923 MB/s and the USB 2.0 stick road at 60 MB/s line rate, drawn to the same scale so the stick bar is a sliver. A strip computes 31,507.6923 divided by 60 equals 525.1282 times.">`)
  s.push(cf44T(W / 2, 34, 11, c44.teal, 'middle', 'THE COMPETITION - ONE SECOND, TWO ROADS, ONE SCALE', true))
  s.push(cf44T(W / 2, 52, 9, c44.tealInk, 'middle', 'megabytes per second, same scale on both bars'))
  const bx = 90
  const scale = 0.014
  s.push(`<rect x="${bx}" y="84" width="${31507.6923 * scale}" height="36" rx="4" fill="${c44.panelA}" stroke="${c44.accent}" stroke-width="2"/>`)
  s.push(cf44T(bx - 8, 106, 9.5, c44.ink, 'end', 'x16 gen4', true))
  s.push(cf44T(bx + 31507.6923 * scale - 8, 106, 9.5, c44.ink, 'end', '31,507.6923 MB/s', true))
  s.push(`<rect x="${bx}" y="144" width="2" height="36" fill="${c44.white}" stroke="${c44.struct}" stroke-width="1.5"/>`)
  s.push(cf44T(bx - 8, 166, 9.5, c44.ink, 'end', 'USB 2.0 line', true))
  s.push(cf44T(bx + 12, 166, 9.5, c44.struct, 'start', '60 MB/s'))
  s.push(`<rect x="40" y="196" width="480" height="44" rx="8" fill="${c44.panelB}" stroke="${c44.conn}" stroke-width="2"/>`)
  s.push(cf44T(W / 2 - 10, 214, 10.5, c44.warn, 'middle', '31,507.6923 / 60 = 525.1282x', true))
  s.push(cf44T(W / 2 - 10, 231, 9.5, c44.tealInk, 'middle', 'the internal road outruns the stick road by 525.1282 times'))
  s.push('</svg>')
  return s.join('')
}

export const lesson44: Lesson = {
  id: 'cf-buses-and-ports-how-the-pieces-talk',
  number: '4.4',
  title: 'Buses and Ports: How the Pieces Talk',
  concepts: [
    'the three buses: address, data, control',
    'address-width arithmetic: n lines name 2^n addresses',
    'why the shared bus jams: one transaction at a time',
    'parallel versus serial, and the skew that killed width',
    'PCIe lanes and generations priced with the encoding toll',
    'the port census: USB, HDMI, SATA, Ethernet, Bluetooth',
    'NVMe rides the PCIe lanes',
    'the port-versus-internal-road divide',
  ],
  objectives: [
    'By the end of this lesson you can name the three buses of the classic design - address, data and control - and say, in one phrase each, which question each road answers.',
    'By the end of this lesson you can compute the reach of any address bus from its width: n lines name 2^n addresses, so 32 lines name 4,294,967,296 bytes = exactly 4 GiB and 64 lines name 16 EiB.',
    'By the end of this lesson you can explain why a shared bus jams - one transaction at a time - and why parallel gave way to serial once skew punished width at speed.',
    'By the end of this lesson you can price a PCIe lane from its generation: transfers per second through the encoding toll, per lane and per x16 bundle, from 250 MB/s at gen 1.0 to 63.0154 GB/s at x16 gen 5.0.',
    'By the end of this lesson you can recite the port census with dates and rates - USB 1.0 1996 to USB4 2019, HDMI 1.0 of 9 December 2002 to 2.1 of 2017, SATA 1.0 of 2003 to 3.0 of 2009 - and convert line rates to byte rates honestly.',
    'By the end of this lesson you can divide the board into internal buses, external ports and storage roads, place NVMe on the PCIe lanes, and compute the 525.1282x gap between a graphics road and a USB 2.0 stick.',
  ],
  prerequisites: ['cf-the-motherboard-the-city-plan', 'cf-the-first-memory-hierarchy'],
  sources: ['cs-cf-web-ground-ch04'],
  blocks: [
    { kind: 'para', text: 'Every lesson so far has lived inside a single component. Lesson 3.1 built the bit; lesson 4.1 drew the motherboard as a city plan and PROMISED roads between the districts; lesson 4.3 priced the memory hierarchy that fills the warehouses. One promise is still open. The roads themselves - the copper that carries every address, every datum, every timing nudge - have never been named, counted or priced. This lesson pays that debt. It asks three questions and answers each with arithmetic, not protocol theory: what exactly IS a bus, what does WIDTH buy, and what does a PORT promise the world outside the box.' },
    { kind: 'para', text: 'Keep the city plan of lesson 4.1 in your head as the map. A motherboard is a small, rigid city: the CPU district, the RAM districts, the chipset office, the port quarter on the edge. What this lesson adds is the TRAFFIC LAW of that city. Roads have widths measured in wires, not metres; they carry transactions measured in beats, not cars; and they charge tolls measured in encoding overhead, not coins. Every number in this lesson - from 4,294,967,296 bytes down to 60 MB/s on a memory stick - is arithmetic on those three ideas: width, beats and tolls.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — bus', text: 'A **bus** is said to be a shared communication pathway carrying signals between two or more components of a computer - a set of parallel lines with one agreed purpose. Symbolically, a bus of width $n$ lines moves $n$ signals per beat; an address bus of width $n$ names $2^n$ distinct locations, and a data bus of width $w$ lines carries $w/8$ bytes per beat. Sharing is the defining property: one road, many masters, one transaction at a time.' },
    { kind: 'para', text: 'For example, the classic design runs three buses side by side, each with one purpose, like three specialised streets instead of one crowded free-for-all:' },
    { kind: 'list', marker: 'roman', items: [
      'the **address bus** - unidirectional, driven by the requester, answering WHERE: which location is being named this beat;',
      'the **data bus** - bidirectional, answering WHAT: the payload itself, riding in both directions as turns demand;',
      'the **control bus** - the referee\'s wire, answering WHEN and HOW: read or write, who may speak now, when the transfer starts and ends.',
    ] },
    { kind: 'heading', text: 'The Three-Bus Census: Where, What, When' },
    { kind: 'para', text: 'The census matters because each road answers a DIFFERENT question, and the three together make one complete transaction. Suppose the CPU wants the byte stored at location 1,000. The address bus carries the number 1,000 - the where. The control bus raises the read line - the when and how. Only then does the data bus carry the byte back - the what. Remove any one road and the transaction collapses: no where and the data lands at an unknown address; no when and two masters collide on the wires; no what and nothing moves. This division of labour is why examiners love the three-bus census, and why the figure below draws them as three separate roads rather than one thick cable.' },
    { kind: 'table', caption: 'The three-bus census: one purpose per road, one question each.', head: ['Bus', 'Question it answers', 'Typical direction', 'What its width buys'], rows: [
      ['Address bus', 'WHERE - which location', 'one way, to memory', 'n lines name 2^n locations; 32 lines name 4 GiB'],
      ['Data bus', 'WHAT - the payload', 'both ways', 'w lines carry w/8 bytes per beat; 32 lines carry 4 bytes'],
      ['Control bus', 'WHEN and HOW - timing, permission', 'mixed', 'commands: read, write, grant, interrupt - one signal each'],
    ] },
    { kind: 'para', text: 'Read the census against the city plan of lesson 4.1 and the geography clicks: the CPU and the chipset sit at the centres, memory hangs off the memory road, and the port quarter hangs off the I/O road. The figure below is that geography with the traffic law drawn in. Notice the queue at the bottom of the picture - it is the single most honest detail on the page, and the next sections price it.' },
    { kind: 'figure', caption: 'The three-bus strip: address asks where, data carries what, control says when and how. The queue panel is the traffic law - one transaction at a time on the shared segment, which is why T2 and T3 wait while T1 owns the road.', svg: cf44BusStripSvg() },
    { kind: 'para', text: 'One glance at the figure settles a question students often muddle: the three buses are SEPARATE sets of wires, not one cable with three names. The address lines run in one direction - the requester drives them and memory merely listens. The data lines are bidirectional - the same wires carry a write in the morning and a read in the afternoon. The control lines are a mixed bunch, some out, some in, each with a fixed job. When this lesson later says a bus has width 32, it means the road that decides the count - usually address or data - has 32 parallel lines, each one a copper track on the board of lesson 4.1.' },
    { kind: 'heading', text: 'The Arithmetic of Width' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the width law', text: 'An address bus of $n$ lines names exactly $2^n$ distinct locations; a data bus of $w$ lines carries exactly $w/8$ bytes per beat; and DOUBLING either width doubles what one beat achieves. Hence width is the only currency in which buses trade, and every rung of chapter 3\'s powers-of-two ladder is one added line.' },
    { kind: 'para', text: 'The width law is nothing more than counting in binary, but its consequences deserve the full ceremonial walk. Take $n = 8$: eight address lines name $2^8 = 256$ locations - a toy. Take $n = 16$: $2^{16} = 65,536$ locations = 64 KiB - the beloved 64 KiB boundary of the eight-bit era. Take $n = 32$: $2^{32} = 4,294,967,296$ locations. Now attach the honest unit ladder of chapter 3: divide by $2^{30}$ and the answer is exactly 4 - so 32 address lines name 4,294,967,296 bytes, which is EXACTLY 4 GiB. Nothing rounds, nothing approximates: 4,294,967,296 is 4 GiB by construction, and the famous "4 GB limit" of thirty-two-bit machines is this line of arithmetic wearing its street clothes.' },
    { kind: 'equation', latex: '2^{32} = 4{,}294{,}967{,}296 \\text{ bytes} = 4\\ \\text{GiB}', note: 'the width law at n = 32: the address space of every thirty-two-bit machine, exact to the last byte' },
    { kind: 'para', text: 'Push the same law one rung higher and the numbers leave the everyday scale. Sixty-four address lines name $2^{64} = 18,446,744,073,709,551,616$ bytes. Chapter 3\'s ladder prices it: divide by $2^{60}$ - one exbibyte is $2^{60}$ bytes - and the answer is exactly 16, so 64 lines name 16 EiB. To feel the size, compare with lesson 4.3\'s warehouse census: one tebibyte is $2^{40}$ bytes, so 16 EiB is $16 \\times 2^{20}$ tebibytes - over sixteen MILLION tebibytes. No machine today ships a 16 EiB memory; the width is there because the lines are cheap and the future is long, not because anyone has filled it.' },
    { kind: 'equation', latex: '2^{64} = 18{,}446{,}744{,}073{,}709{,}551{,}616 \\text{ bytes} = 16\\ \\text{EiB}', note: 'the width law at n = 64: 18.446744073709552 x 10^18 bytes, priced by the IEC ladder' },
    { kind: 'para', text: 'The data bus obeys the same doubling logic with a different unit. A data bus of $w$ lines moves $w/8$ bytes per beat - 32 lines move 4 bytes, 64 lines move 8. So doubling the data width doubles the payload of every single beat, which is why data-bus width was THE bragging number of every architecture generation: eight-bit machines moved one byte per beat, sixteen-bit machines two, thirty-two-bit machines four, sixty-four-bit machines eight. Width buys throughput one clean doubling at a time, with no clock raised at all - the cheapest speed a designer ever bought.' },
    { kind: 'example', title: 'Illustration 1. A memory board holds 2 GiB of RAM. How many address lines must run to it, at minimum?', steps: [
      'Take the question as a width-law lookup: find the least $n$ with $2^{n} \\ge 2$ GiB.',
      'Convert the target to bytes with the honest ladder: 2 GiB $= 2 \\times 2^{30} = 2^{31} = 2{,}147{,}483{,}648$ bytes.',
      'Check the rung below: $2^{30} = 1{,}073{,}741{,}824$ = 1 GiB - half of what is asked.',
      'Now, $2^{31}$ lands exactly on the target, so no line is wasted and none is missing.',
      'Hence 31 address lines size a 2 GiB memory - and each further line would double the reach again.',
    ] },
    { kind: 'para', text: 'The figure below draws the whole ladder of widths as bars whose heights grow one DOUBLING per rung - which is why the bars step evenly on a log scale, the signature of an exponential that chapter 3 taught you to recognise. The thirty-two-line bar is highlighted as the witness: it is the rung where the arithmetic of this lesson meets the honest unit ladder of chapter 3 and the shelf of lesson 4.3, and all three agree on 4 GiB to the last byte.' },
    { kind: 'figure', caption: 'The width arithmetic bar: 8, 16, 32 and 64 address lines against the memory they name. Heights grow one doubling per rung; the 32-line bar is the witness - 4,294,967,296 bytes = exactly 4 GiB, closing the loop with chapter 3\'s ladder.', svg: cf44WidthBarsSvg() },
    { kind: 'para', text: 'Read the witness strip slowly, because it is the kind of fact examinations dress in different costumes every year. The costume may be a "4 GB memory limit of 32-bit Windows", or "how many address lines for 4 GiB", or "the largest memory a 32-bit address bus can name" - but underneath every costume sits the same one line: $2^{32} = 4,294,967,296 = 4$ GiB. Master the line once and every costume opens.' },
    { kind: 'example', title: 'Illustration 2. One bus beat moves the payload of a data bus. Compare a 32-line data bus with a 64-line one.', steps: [
      'Take the 32-line bus: one beat carries $32/8 = 4$ bytes.',
      'Now widen to 64 lines: one beat carries $64/8 = 8$ bytes.',
      'So, the doubling of width doubled the payload - 4 to 8 bytes per beat, with the clock untouched.',
      'Hence width buys throughput in clean doubling steps: the cheapest speed on the board.',
    ] },
    { kind: 'heading', text: 'The Traffic Jam: Why Sharing Hurts' },
    { kind: 'para', text: 'The definition callout hid a heavy word in plain sight: SHARED. A bus is not a private road; it is one set of wires that many masters - CPU, disk controller, network card, graphics engine - must take turns to use. The turn-taking is not a courtesy, it is physics: two masters driving the same wire at once fight over its voltage, and the fight reads as garbage. So the design admits exactly one transaction on the bus per beat-window, queues everyone else, and appoints a referee - the ARBITER - whose whole job is deciding WHO may drive next. The queue in the three-bus strip figure is that law drawn honestly: T1 owns the road now, T2 and T3 wait.' },
    { kind: 'example', title: 'Illustration 3. Three masters each want one two-beat transaction on a shared bus. How long until the last master finishes, and how long does it wait?', steps: [
      'List the contenders: master A, master B and master C each hold one two-beat transaction.',
      'So, the shared bus serves them strictly one at a time: A, then B, then C.',
      'Take the arithmetic: $3 \\times 2 = 6$ beats until the last transaction completes.',
      'Now count C\'s wait: it starts driving only after 4 beats of someone else\'s traffic.',
      'Hence the job takes 6 beats and the last master waits 4 of them - the jam is the price of sharing.',
    ] },
    { kind: 'para', text: 'Arbitration schemes differ - fixed priority, round-robin, fairness rules of various kinds - and the full theory of who-wins-when belongs to \u2018Computer Organization and Architecture\u2019 on the engineering shelf, which owns the door to this whole territory. What THIS lesson needs is the consequence, and the consequence is independent of the referee\'s personality: a shared bus delivers at most ONE transaction at a time, so as masters multiply, the queue grows, and the bus becomes the bottleneck of the whole city. The traffic jam is not a defect to be patched; it is the price of the sharing that made buses cheap in the first place.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the jam is the design working as drawn', text: 'Students read "one transaction at a time" as a failure. Flip the frame: sharing ONE road is why any component could talk to any other without bespoke wiring between every pair - $n$ components needed $n$ private roads apiece otherwise. The bus traded congestion for universality, and for decades that was the best trade in computing. The rest of this lesson is the story of what happened when it stopped being the best trade.' },
    { kind: 'para', text: 'Two escape routes from the jam suggest themselves, and both were built. Route one: build MORE buses, so masters stop competing - which is why lesson 4.1\'s city plan shows several roads, and why modern chipsets are less one office than a lattice of offices. Route two: make each transaction finish faster, so the queue drains sooner - wider data buses helped, faster clocks helped more. But route two ran into a wall nobody expected, and that wall - skew - is the subject of the next section. The reversal it forced is one of the great plot twists of hardware history: the industry UNWIDED its buses on purpose.' },
    { kind: 'heading', text: 'Parallel Versus Serial: The Honest Reversal' },
    { kind: 'para', text: 'For three decades the width law pointed one way: MORE wires. A PARALLEL link sends $n$ bits at once on $n$ wires, one bit per wire, all in a single beat - the data bus itself is the champion example, 32 wires moving 4 bytes per beat. Parallel had one great virtue, the same virtue as the width law: speed without clock. And it had one great cost: copper, and the wiring complexity of keeping $n$ wires equal. For as long as clocks were slow, the trade was easy - parallel won everything, and whole architectures were judged by the width of their data roads.' },
    { kind: 'para', text: 'Then clocks got fast, and a physical gremlin called SKEW ate the strategy from underneath. The $n$ wires of a parallel link are never perfectly identical: tiny differences in length, in material, in the neighbours\' interference mean the same beat\'s bits arrive at slightly different TIMES. At a leisurely clock the spread is invisible - the receiver samples long after every bit has settled. But as the clock rises, the beat shrinks, and eventually the skew across the wires is comparable to the whole beat: bit 0 of a byte may still be arriving while bit 7 has already gone by, and the receiver samples a mixture of two beats. Width, the great ally, becomes a liability: every added wire adds skew, and skew caps the clock.' },
    { kind: 'para', text: 'Put a honest number on the squeeze. A 3 GHz clock beats every $1/(3 \\times 10^9)$ seconds - about $0.333$ ns per beat. If the eight wires of a parallel link spread their arrivals by even a third of a nanosecond across that beat, the receiver samples chaos. The fix that saved computing was not better wire matching - it was CHANGING THE BET: send bits one after another on FEW wires, and raise the clock enormously instead. Serial went wide in TIME what parallel had gone wide in SPACE. Fewer wires meant less skew to manage; far faster clocks meant the payload per second recovered and then soared past parallel.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — skew is a scale, not a single number', text: 'The $0.333$ ns beat at 3 GHz is an order-of-magnitude witness, not a specification of any real link: real receivers fight skew with delay locking, strobing and training sequences, and their tolerances differ per standard. What transfers honestly from this lesson is the SHAPE of the argument - skew grows with wire count and beats shrink with clock, so parallel width and high speed fight each other - not any particular nanosecond figure.' },
    { kind: 'para', text: 'The modern answer to "how do we serialize without losing the width law" is the lane. A PCIe LANE is a pair of wire pairs: one pair carrying bits out, one pair carrying bits in - a full-duplet of directions, serial within each. The width law then reappears as BUNDLING: a x1 link is one lane, a x4 link is four lanes side by side, a x8 is eight, and the x16 slot that a graphics card loves is sixteen lanes moving in step. The genius is that bundling is optional and modular: a small device rides x1 and pays for one lane; a hungry device rides x16. Parallel\'s width law survived - reborn as lanes per slot rather than bits per beat.' },
    { kind: 'callout', tone: 'insight', title: 'Note — wide in time, narrow in space', text: 'Carry this phrase to any exam question that asks why serial replaced parallel. Parallel went WIDE IN SPACE: many wires, slow clock, skew-capped. Serial went WIDE IN TIME: few wires, fast clock, skew tamed per pair. The total payload per second is the product of width and clock - and once clocks could rise faster than skew could grow, the serial product won. The lanes of PCIe are that product, packaged.' },
    { kind: 'heading', text: 'PCIe Priced: Lanes, Transfers and the Encoding Toll' },
    { kind: 'para', text: 'PCIe - PCI Express, the slot family under every modern graphics card and NVMe drive - is priced in GT/s, giga-TRANSFERS per second, and this is the first honest fork in the arithmetic: a TRANSFER is not a byte. The wire moves bits in lumps dressed for reliability, and the dressing - the ENCODING TOLL - takes a cut before any byte survives. Generation 1.0 ran at 2.5 GT/s with an 8b/10b toll: every 10 wire bits carry 8 payload bits, so 20 percent of the wire is overhead, and $2.5 \\times 8/10 = 2$ Gbit/s of payload survives - $2 \\div 8 = 250$ MB/s per lane. Generation 3.0 (2010) doubled the clock several times over to 8 GT/s and bought a far cheaper toll, 128b/130b: every 130 wire bits carry 128 payload bits, barely 1.6 percent wasted. Generation 4.0 (2017) doubled to 16 GT/s; generation 5.0 (2019) doubled again to 32 GT/s. Each doubling is the width law\'s ghost, rising in time instead of space.' },
    { kind: 'table', caption: 'The PCIe census: generations, transfers, tolls, and the byte rates that survive - per lane and per x16 bundle.', head: ['Generation', 'Transfers per lane', 'Encoding toll', 'Payload per lane', 'x16 bundle'], rows: [
      ['gen 1.0', '2.5 GT/s', '8b/10b (20 percent)', '250 MB/s', '4 GB/s'],
      ['gen 3.0 (2010)', '8 GT/s', '128b/130b (1.6 percent)', '984.6154 MB/s', '15.7538 GB/s'],
      ['gen 4.0 (2017)', '16 GT/s', '128b/130b (1.6 percent)', '1969.2308 MB/s', '31.5077 GB/s'],
      ['gen 5.0 (2019)', '32 GT/s', '128b/130b (1.6 percent)', '3938.4615 MB/s', '63.0154 GB/s'],
    ] },
    { kind: 'derivation', title: 'From transfers to bytes: pricing one PCIe 3.0 lane', statement: 'One PCIe 3.0 lane runs at 8 GT/s through a 128b/130b toll. Derive its payload rate in MB/s - the number every other PCIe figure in this lesson is built from.', steps: [
      { label: 'Name the unit honestly', formula: '8\\ \\text{GT/s} = 8 \\times 10^{9}\\ \\text{transfers per second}', explanation: 'GT/s counts TRANSFERS, not bytes and not bits of payload - the toll has not been paid yet.' },
      { label: 'Pay the encoding toll', formula: '8 \\times \\frac{128}{130} = 7.876923\\ \\text{Gbit/s}', explanation: 'Only 128 of every 130 wire bits are payload, so multiply by 128/130: the lane carries 7.876923 Gbit/s of true data.' },
      { label: 'Convert bits to bytes', formula: '7.876923 \\div 8 = 0.984615385\\ \\text{GB/s}', explanation: 'Eight bits to the byte, the chapter 3 conversion.' },
      { label: 'Read in megabytes', formula: '0.984615385 \\times 1000 = 984.615385\\ \\text{MB/s}', explanation: 'The per-lane payload this lesson pins - recurring 4 and 6 digits all the way down.' },
    ], result: '$984.615385$ MB/s per lane - pinned as $984.6154$; a x16 gen 3.0 bundle multiplies to $15{,}753.846154$ MB/s $= 15.7538$ GB/s, and the same derivation at 16 GT/s gives gen 4\'s $1969.2308$ MB/s per lane.' },
    { kind: 'para', text: 'Walk the derivation once more with the figure below in view, because the toll gate is the whole story. The 8 GT/s figure a shop advertises is the traffic APPROACHING the gate; the 984.6154 MB/s is what emerges through it. Generations 4 and 5 change only the approaching traffic - 16 and 32 GT/s through the SAME 128b/130b gate - which is why their per-lane rates are exactly double and quadruple the gen 3.0 figure: $1969.2308$ and $3938.4615$ MB/s. The ladder is clean doublings on top of one honest division.' },
    { kind: 'figure', caption: 'The PCIe generation ladder: per-lane payload bars for gen 1.0, 3.0, 4.0 and 5.0 - 250, 984.6154, 1969.2308 and 3938.4615 MB/s - above the x16 bundle rows at 4, 15.7538, 31.5077 and 63.0154 GB/s. The toll gate strip names the two encodings: 8b/10b wastes 20 percent; 128b/130b wastes about 1.6 percent.', svg: cf44PcieLadderSvg() },
    { kind: 'example', title: 'Illustration 4. Price one PCIe 3.0 lane from scratch, and check it against the ladder.', steps: [
      'Take the approaching traffic: 8 GT/s of transfers per second.',
      'Pay the toll: $8 \\times (128/130) = 7.876923$ Gbit/s of payload.',
      'Convert: $7.876923 \\div 8 = 0.984615$ GB/s $= 984.615385$ MB/s.',
      'Check against the ladder: the pinned per-lane figure is 984.6154 MB/s - the fourth decimal matches.',
      'Hence one gen 3.0 lane is 984.6154 MB/s, and every bundle is a multiple of this one line.',
    ] },
    { kind: 'example', title: 'Illustration 5. A graphics card sits in a x16 gen 4.0 slot. What payload does the slot carry?', steps: [
      'Take one lane first: 16 GT/s through the same 128b/130b toll.',
      'Price the lane: $16 \\times (128/130) = 15.753846$ Gbit/s $\\div 8 = 1969.230769$ MB/s.',
      'Now bundle: $16 \\times 1969.230769 = 31507.692308$ MB/s.',
      'Convert to the shop window: 31.5077 GB/s per slot.',
      'Hence a x16 gen 4.0 slot is a 31.5077 GB/s road - the fastest general-purpose road on the board.',
    ] },
    { kind: 'para', text: 'Keep the two ends of that Illustration separate in your mind, because examinations attack from both sides. From the lane side: "what does ONE gen 4 lane carry?" - 1969.2308 MB/s, one derivation away. From the slot side: "what does a x16 gen 4 slot carry?" - 31.5077 GB/s, sixteen lanes multiplied. And generation 5.0 doubles the whole picture again: 3938.4615 MB per lane, $63.0154$ GB/s per x16 slot. Three pinned pairs - per lane and per slot, at gen 3, gen 4 and gen 5 - and every one of them falls out of the single toll-gate division you practised above.' },
    { kind: 'heading', text: 'The Ports: The Outside World\'s Plugs' },
    { kind: 'para', text: 'Every road so far ran INSIDE the box, between components that share the motherboard\'s silicon manners. But the city has gates: the sockets on the rear panel where the world plugs in. A PORT is the doorway; the road behind it may be a USB lane, an HDMI pipe, a SATA cable to a drive, an Ethernet socket to the neighbourhood network. Each doorway promises a RATE, and - this is the theme of the whole section - each promise is a line rate, the speed of the wire BEFORE tolls, before protocol overheads, before the honesty of usable throughput. The census below pins the dates and rates; the prose walks the three families that matter most: USB, HDMI and SATA.' },
    { kind: 'table', caption: 'The port census: the plug families with the dates and line rates this lesson pins.', head: ['Road', 'Introduced', 'Line rate'], rows: [
      ['USB 1.0', '1996', '12 Mbps (full speed)'],
      ['USB 2.0', '27 April 2000', '480 Mbps'],
      ['USB 3.0', '2008', '5 Gbps'],
      ['USB4', '2019', '40 Gbps'],
      ['HDMI 1.0', '9 December 2002', '4.95 Gbps (1080p at 60 Hz)'],
      ['HDMI 2.1', '2017', '48 Gbps'],
      ['SATA 1.0', '2003', '1.5 Gbit/s'],
      ['SATA 3.0', '2009', '6 Gbit/s (600 MB/s raw after the 8b/10b toll)'],
      ['Ethernet', 'common today', '1 Gbit/s'],
      ['Bluetooth 1.0', '1999', 'short-range wireless - see the honest hedge below'],
    ] },
    { kind: 'callout', tone: 'historical', title: 'History — the USB ladder, dated honestly', text: 'USB 1.0 was introduced in 1996 at 12 Mbps full speed - enough for keyboards, mice and the printers of the day. USB 2.0, released on 27 April 2000, multiplied the line rate to 480 Mbps: $480/12 = 40$ times, and it became the universal port of a decade. USB 3.0 arrived in 2008 at 5 Gbps - $5000/480 = 10.416667$ times USB 2.0 - and USB4 in 2019 at 40 Gbps, eight times USB 3.0. Meanwhile the CONNECTOR story took its own road: the USB-C plug shape was specified in August 2014, years before USB4 existed - a shape the industry adopted faster than any single speed behind it.' },
    { kind: 'para', text: 'Read the ladder as ratios and a pattern appears: 40 times, then 10.416667 times, then 8 times. Each generation bought a smaller RATIO than the one before - while each still transformed daily practice, because the base kept growing. Forty-fold took USB from "adequate for a mouse" to "the everything port"; tenfold took it from "the everything port" to "drives and displays"; eightfold made one cable carry the whole desk. Ratios of a growing base are the honest way to read every port ladder - and the same pattern meets you again in HDMI below.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the connector is NOT the speed', text: 'The single most expensive reading error in the port market: seeing a USB-C plug and assuming speed. USB-C is a SHAPE, specified in August 2014 - one reversible plug that has carried everything from USB 2.0\'s 480 Mbps to USB4\'s 40 Gbps and beyond. The same plug can sit on a 480 Mbps road or a 40 Gbps road. Read generations and rates from the SPECIFICATIONS, never from the connector\'s silhouette - the plug tells you the doorway\'s shape, not what road runs behind it.' },
    { kind: 'para', text: 'HDMI - the display door - tells the same story on a screen-shaped canvas. HDMI 1.0 was released on 9 December 2002 with 4.95 Gbps, sized exactly for its founding mission: 1080p video at 60 Hz. Fifteen years later, HDMI 2.1 arrived in 2017 at 48 Gbps - $48/4.95 = 9.696970$ times the founding rate, the fifteen-year multiple of the display road. The purpose line matters as much as the rate: HDMI\'s job is to carry video AND audio to a display on one cable, which is why its figures are quoted in raw Gbps - the payload is pixels, not files, and the byte-conversion rituals of storage roads do not apply to it in the same way.' },
    { kind: 'example', title: 'Illustration 6. The display road grew from HDMI 1.0 (2002) to HDMI 2.1 (2017). Compute the multiple.', steps: [
      'Take the founding rate: 4.95 Gbps, released 9 December 2002 for 1080p at 60 Hz.',
      'Take the 2017 rate: 48 Gbps.',
      'Divide: $48/4.95 = 9.696970$ - pinned as 9.69697x.',
      'Note the span: $2017 - 2002 = 15$ years for that tenfold jump.',
      'Hence fifteen years bought the display road 9.69697 times its founding pipe - the same decelerating-ratio pattern as USB.',
    ] },
    { kind: 'para', text: 'SATA - the storage road - is where this lesson\'s toll-gate arithmetic earns its keep a second time, because SATA pays an 8b/10b toll just like PCIe gen 1.0. SATA 1.0 arrived in 2003 at 1.5 Gbit/s; SATA 3.0 arrived in 2009 at 6 Gbit/s. Apply the toll to the big figure: of every 10 wire bits, 8 are payload, so $6 \\times 10^9 \\times 8/10 = 4.8 \\times 10^9$ payload bits per second; divide by 8 and $600,000,000$ bytes per second survive. That is the famous "600 MB/s" a SATA drive quotes - a RAW ceiling, honest only because it admits the toll in its derivation.' },
    { kind: 'example', title: 'Illustration 7. Derive the SATA 3.0 raw rate from its line rate.', steps: [
      'Take the line rate: 6 Gbit/s $= 6 \\times 10^9$ wire bits per second.',
      'Pay the 8b/10b toll: $6 \\times 10^9 \\times 8/10 = 4.8 \\times 10^9$ payload bits per second.',
      'Convert: $4.8 \\times 10^9 \\div 8 = 600{,}000{,}000$ bytes per second.',
      'Hence 600 MB/s raw - the ceiling every SATA 3.0 drive quotes, toll already paid.',
    ] },
    { kind: 'para', text: 'Two more doors complete the wall, hedged honestly. Ethernet - the wired network socket - commonly negotiates 1 Gbit/s in homes and offices today; the THEORY of what networks do with that pipe belongs to \u2018Computer Networks\u2019 on the shelf, which owns that door outright. Wireless deserves one honest line rather than a false number: Wi-Fi rates depend on the standard, the band and the room, so this lesson pins no single figure and sends you to the network book for the census. Bluetooth 1.0 appeared in 1999 as the short-range personal wireless road - its rates are modest by design, because its job is metres, not megabytes.' },
    { kind: 'figure', caption: 'The port wall: the rear I/O panel drawn as six doorways - USB-A at USB 2.0 and 3.0 rates, USB-C carrying USB4, HDMI 2.1, Ethernet at 1 Gbit/s, audio jacks - each captioned with its generation and rate from the census, and a strip nailing the theme: the plug is NOT the speed.', svg: cf44PortWallSvg() },
    { kind: 'heading', text: 'The Port-Versus-Internal-Road Divide' },
    { kind: 'para', text: 'Now stand back from the wall and divide the board\'s roads into three honest classes. First, the INTERNAL BUSES: PCIe above all - the roads between slots, chipset and CPU, where the toll-gate arithmetic runs and rates reach 63.0154 GB/s per x16 slot. Second, the EXTERNAL PORTS: USB, HDMI, Ethernet - the doorways, sized for the cables, connectors and devices of the world outside. Third, the STORAGE ROADS: SATA cables to drives, and - the modern twist - NVMe drives, which ride PCIe lanes directly. The divide matters because each class obeys a different economics: internal roads chase raw rate on short traces; ports chase universality and robustness across long, user-abused cables; storage roads chase latency as much as rate.' },
    { kind: 'para', text: 'The NVMe line deserves its own sentence, because it closes a loop this chapter left open. Lesson 4.3 put solid-state shelves in the warehouse and promised to connect them; here is the connection: an NVMe SSD is a SATA-replacement that speaks the NVMe protocol OVER PCIe LANES - typically four of them, x4. Price that road: $4 \\times 1969.2308 = 7876.9231$ MB/s $= 7.8769$ GB/s on a gen 4.0 x4 link - about 13.128205 times the 600 MB/s SATA ceiling. The shelf got faster not by magic but by changing roads: same flash, better bus.' },
    { kind: 'example', title: 'Illustration 8. An NVMe SSD rides four gen 4.0 PCIe lanes. Compare its road with SATA 3.0\'s 600 MB/s ceiling.', steps: [
      'Take the lane rate: one gen 4.0 lane carries 1969.2308 MB/s.',
      'Bundle the drive\'s road: $4 \\times 1969.2308 = 7876.9231$ MB/s $= 7.8769$ GB/s.',
      'Compare with SATA: $7876.9231 \\div 600 = 13.128205$ times the SATA ceiling.',
      'Hence NVMe rides the PCIe lanes to thirteen times the SATA road - 4.3\'s shelf, on 4.4\'s roads.',
    ] },
    { kind: 'para', text: 'Finally, the competition that gives the divide its sharpest number: the fastest internal road against the humblest port, in the same second. A graphics card on a x16 gen 4.0 slot moves 31.5077 GB/s - 31,507.6923 MB/s. A USB 2.0 memory stick moves a LINE rate of 480 Mbit/s $\\div 8 = 60$ MB/s - and even that flatters it, because 60 MB/s is the wire\'s ceiling while real sticks hover near 40 MB/s usable once protocol overhead takes its share. Divide the roads: $31507.6923 \\div 60 = 525.128205$, pinned as 525.1282 times. Even against the generous 40 MB/s usable figure the ratio stays near 787.6923 - past 750 either way. That single number is the port-versus-internal-road divide made flesh.' },
    { kind: 'example', title: 'Illustration 9. One second of traffic: the graphics road versus the USB 2.0 stick road. Compute the ratio both ways.', steps: [
      'Take the graphics road: a x16 gen 4.0 slot carries 31507.6923 MB/s.',
      'Take the stick road: 480 Mbit/s $\\div 8 = 60$ MB/s line rate - 0.060 GB/s.',
      'Divide in megabytes: $31507.6923 \\div 60 = 525.128205$x - pinned 525.1282.',
      'Divide again in gigabytes: $31.507692 \\div 0.060 = 525.128205$x - the same ratio, as it must be.',
      'Hence the internal road outruns the stick by 525.1282 times - the divide, priced.',
    ] },
    { kind: 'figure', caption: 'The bandwidth competition drawn to one scale: the x16 gen4 road at 31,507.6923 MB/s against the USB 2.0 stick\'s 60 MB/s line rate - the stick bar is a sliver, and the ratio 525.1282x is the divide in one number.', svg: cf44SolRaceSvg() },
    { kind: 'para', text: 'So what is a port, in the end? It is a doorway sized for the world outside the box - chosen for universality, robustness and the shape of the devices that must use it, NOT for maximum rate. And what is an internal bus? It is the highway inside, chosen for raw rate between components that share a power supply and a clock\'s jurisdiction. The 525.1282x gap is not a scandal; it is the two design briefs doing their separate jobs. The scandal would be paying port prices for internal work, or expecting internal rates through a doorway - and examinations love to dress that confusion in plausible clothing.' },
    { kind: 'para', text: 'The map of this lesson is now complete: three buses answering where, what and when; the width law turning lines into addresses and bytes; the jam turning sharing into queues; skew turning parallel into serial; the toll gate turning transfers into bytes; the ports turning rates into promises; and the divide turning all of it into one honest number. What remains is drill - the census, the arithmetic and the judgement, rehearsed until each is a reflex.' },
    { kind: 'para', text: 'Three doors from other shelves keep this lesson honest about its borders. \u2018Computer Organization and Architecture\u2019 owns the full theory door - arbitration schemes, bus protocols and the cycle-by-cycle choreography are ITS ground, and this lesson deliberately priced rather than re-taught it. \u2018Digital Logic Design\u2019 owns the signalling - HOW a wire carries a bit, drivers, receivers and noise margins, the gate-level view beneath every road here. And \u2018Computer Networks\u2019 owns the network-theory door - what Ethernet and Wi-Fi DO with their pipes, which this lesson only priced at the socket. This lesson keeps its own ground: the widths, the prices and the plug census.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this lesson meets the papers', text: 'Banking and SSC computer-awareness papers ask the census cold: name the three buses, match each to its question; place USB generations with dates (1996, 27 April 2000, 2008, 2019); ask what SATA\'s 6 Gbit/s yields (600 MB/s raw) and what HDMI is FOR (video and audio to a display). School boards lean on the width law: "a 32-bit address bus names how many locations?" - 4,294,967,296, exactly 4 GiB. Cambridge 9618 and A-level-style questions (exam-style wording throughout - no claim to quote a real paper) prefer the REASONING: explain why serial links replaced parallel at high speed (skew grows with width and speed); explain what a PCIe lane is and what x16 means; state that NVMe rides PCIe lanes. Drill the pinned numbers until the derivations, not just the results, are reflexes.' },
    { kind: 'terms', items: [
      { term: 'bus', def: 'a shared communication pathway carrying signals between components - a set of parallel lines with one agreed purpose, serving one transaction at a time.' },
      { term: 'address bus', def: 'the unidirectional road answering WHERE: n lines name 2^n locations; 32 lines name 4,294,967,296 bytes = 4 GiB.' },
      { term: 'data bus', def: 'the bidirectional road answering WHAT: w lines carry w/8 bytes per beat - 32 lines carry 4 bytes, 64 carry 8.' },
      { term: 'control bus', def: 'the referee\'s road answering WHEN and HOW: read or write, grants, interrupts, timing - one agreed signal per line.' },
      { term: 'arbitration', def: 'the referee process deciding which master may drive a shared bus next; its queue is why one transaction at a time is the law.' },
      { term: 'skew', def: 'the arrival-time spread among the wires of a parallel link; it grows with width and punishes speed, and it killed wide-and-fast parallel buses.' },
      { term: 'serial link', def: 'a link sending bits one after another on few wires at a much faster clock - wide in time where parallel was wide in space.' },
      { term: 'PCIe lane', def: 'one serial road of two wire pairs, one each direction; slots bundle lanes - x1, x4, x8, x16 - and a x16 gen 4.0 slot carries 31.5077 GB/s.' },
      { term: 'GT/s', def: 'giga-transfers per second - the WIRE rate of PCIe, counting transfers rather than bytes; the encoding toll must be paid before bytes survive.' },
      { term: 'encoding toll (8b/10b, 128b/130b)', def: 'the dressing on wire bits: 8b/10b wastes 20 percent; 128b/130b wastes about 1.6 percent; SATA 3.0 pays 8b/10b to yield 600 MB/s raw.' },
      { term: 'port', def: 'a doorway on the I/O panel - USB, HDMI, Ethernet, audio - promising a line rate for the road behind the plug; the connector is not the speed.' },
      { term: 'line rate', def: 'the raw speed of the wire before tolls and protocol overheads - USB 2.0\'s 480 Mbps = 60 MB/s line, while usable rates run lower.' },
      { term: 'NVMe', def: 'the storage protocol that rides PCIe lanes directly - typically x4, about 7.8769 GB/s on gen 4.0, roughly 13.128205 times the SATA 3.0 ceiling.' },
      { term: 'USB-C', def: 'the reversible connector SHAPE specified in August 2014 - one plug that has carried everything from USB 2.0 to USB4; a shape, never a speed.' },
    ] },
    { kind: 'formula', name: 'Address-bus reach (the width law)', latex: '2^{n} \\text{ addresses from } n \\text{ lines}', note: 'n lines name 2^n locations: 8 lines 256 B, 16 lines 64 KiB, 32 lines 4,294,967,296 B = 4 GiB, 64 lines 16 EiB.' },
    { kind: 'formula', name: 'PCIe lane payload through the toll', latex: '\\text{MB/s} = \\text{GT/s} \\times \\frac{128}{130} \\times \\frac{1000}{8}', note: 'gen 3.0: 8 x 128/130 / 8 = 984.6154 MB/s per lane; gen 4 doubles to 1969.2308; gen 5 doubles again to 3938.4615.' },
    { kind: 'formula', name: 'x16 slot bundle', latex: '\\text{slot GB/s} = 16 \\times \\text{lane GB/s}', note: 'x16 gen 4.0 = 31.5077 GB/s; x16 gen 5.0 = 63.0154 GB/s; x16 gen 1.0 = 16 x 250 MB/s = 4 GB/s.' },
    { kind: 'formula', name: 'Line rate to byte rate', latex: '\\text{MB/s} = \\text{Mbit/s} \\div 8', note: 'USB 2.0: 480 Mbit/s / 8 = 60 MB/s line rate; SATA 3.0 pays the 8b/10b toll first: 6 x 10^9 x 8/10 / 8 = 600 MB/s raw.' },
    { kind: 'formula', name: 'The divide ratio', latex: '\\frac{31507.6923 \\text{ MB/s}}{60 \\text{ MB/s}} = 525.1282', note: 'the x16 gen 4.0 graphics road against the USB 2.0 stick line rate - the port-versus-internal-road divide in one number.' },
    { kind: 'quiz', title: 'Check yourself — five questions, one correct option each', items: [
      { q: 'A machine has a 32-line address bus. How many byte locations can it name, and what is that in the honest unit ladder?',
        options: [
          '65,536 locations - 64 KiB',
          '4,294,967,296 bits - 512 MiB of bits',
          '4,294,967,296 bytes - exactly 4 GiB',
          '18,446,744,073,709,551,616 bytes - 16 EiB',
        ],
        answer: 2,
        explain: 'Option A fails because 65,536 is $2^{16}$ - the reach of SIXTEEN lines, half this bus\'s width squared away; 32 lines reach vastly further. Option B fails on the unit: $2^{32}$ is the right count but it counts LOCATIONS, one byte each, so the answer is bytes - reading it as bits shrinks the memory eightfold to 512 MiB. Option C is correct: $2^{32} = 4,294,967,296$ byte locations, and dividing by $2^{30}$ gives exactly 4, so the space is exactly 4 GiB - the witness pinned in this lesson. Option D fails because $2^{64} = 16$ EiB is the reach of a SIXTY-FOUR-line bus - double the width, squared the universe.' },
      { q: 'A PCIe slot advertises 8 GT/s per lane. What does the unit GT/s actually count?',
        options: [
          'Gigabytes delivered per second to the device',
          'Giga-transfers per second on the wire - bytes survive only after the encoding toll',
          'Gigabits of payload per second, toll already paid',
          'The number of lanes bundled in the slot',
        ],
        answer: 1,
        explain: 'Option A fails because GT/s counts TRANSFERS, not bytes - the derivation of this lesson exists precisely because the two differ. Option B is correct: a transfer is one wire event; at 8 GT/s with the 128b/130b toll, payload is $8 \\times (128/130) \\div 8 = 0.984615$ GB/s - not 8 of anything. Option C fails because payload Gbit/s is what REMAINS after the toll: 7.876923 Gbit/s, a different number from 8. Option D fails because lanes per slot is the x-notation - x1, x4, x16 - a completely separate dial from the per-lane rate.' },
      { q: 'Which option lists the USB ladder in correct chronological order with correct line rates?',
        options: [
          'USB 1.0 (1996, 1.5 Mbps); USB 2.0 (2000, 480 Mbps); USB 3.0 (2008, 5 Gbps); USB4 (2019, 40 Gbps)',
          'USB 2.0 (1996, 480 Mbps); USB 1.0 (2000, 12 Mbps); USB 3.0 (2008, 5 Gbps); USB4 (2019, 40 Gbps)',
          'USB 1.0 (1996, 12 Mbps); USB 2.0 (27 April 2000, 480 Mbps); USB 3.0 (2008, 40 Gbps); USB4 (2019, 5 Gbps)',
          'USB 1.0 (1996, 12 Mbps); USB 2.0 (27 April 2000, 480 Mbps); USB 3.0 (2008, 5 Gbps); USB4 (2019, 40 Gbps)',
        ],
        answer: 3,
        explain: 'Option A fails on the first rate: USB 1.0 ran at 12 Mbps full speed; 1.5 MB/s is a BYTE conversion of that rate, not a bit rate in the census. Option B fails on the order: USB 1.0 (1996) precedes USB 2.0 (27 April 2000), not the reverse. Option C fails on the last two rates: USB 3.0 (2008) ran at 5 Gbps and USB4 (2019) at 40 Gbps - swapping them gives USB4 a slower rate than its own predecessor. Option D is correct: 1996 at 12 Mbps, 27 April 2000 at 480 Mbps, 2008 at 5 Gbps, 2019 at 40 Gbps - the pinned ladder.' },
      { q: 'One PCIe 3.0 lane, after paying its 128b/130b encoding toll, carries what payload rate?',
        options: [
          '984.6154 MB/s',
          '8 GB/s',
          '250 MB/s',
          '48 Gbps',
        ],
        answer: 0,
        explain: 'Option A is correct: $8 \\times (128/130) = 7.876923$ Gbit/s, divided by 8 and read in megabytes, gives 984.615385 MB/s - pinned as 984.6154. Option B fails by reading the raw transfer figure as bytes: 8 GT/s is a transfer rate, and the toll plus the bits-to-bytes division cut it to under 1 GB/s. Option C fails by confusing generations: 250 MB/s is the gen 1.0 per-lane payload (2.5 GT/s through 8b/10b), a quarter of gen 3.0\'s. Option D fails because 48 Gbps is HDMI 2.1\'s 2017 display rate - another road entirely, on another door.' },
      { q: 'An NVMe SSD differs from a SATA SSD chiefly in what road-level respect?',
        options: [
          'It rides PCIe lanes directly - typically x4 - instead of the SATA road',
          'It connects through USB-C ports for higher speed',
          'It stores data in bits while SATA drives store bytes',
          'It removes the encoding toll, so it pays no overhead at all',
        ],
        answer: 0,
        explain: 'Option A is correct: NVMe speaks its protocol over PCIe lanes - typically four, worth $4 \\times 1969.2308 = 7876.9231$ MB/s on gen 4.0, about 13.128205 times the 600 MB/s SATA ceiling. Option B fails because USB-C is an external doorway shape, and NVMe is an internal storage road - the connector-is-not-the-speed caution of this lesson applies with force. Option C fails because both drives store bytes; the difference is the BUS underneath, not the unit of storage. Option D fails because the toll belongs to the wire encoding, not the drive: PCIe lanes still pay their 128b/130b overhead, and NVMe\'s advantage comes from wider, faster roads, not a free ride.' },
    ] },
    { kind: 'exercises', title: 'Graded practice — four levels, fifteen questions', sets: [
      { level: 'L1', questions: [
        { q: 'Name the three buses of the classic design, and give the one question each answers.',
          solution: [
            'Take the census as three roads, three questions.',
            'The address bus answers WHERE: which location is named this beat.',
            'The data bus answers WHAT: the payload, riding both ways as turns demand.',
            'The control bus answers WHEN and HOW: read or write, grants, timing.',
            'Hence where, what, when-and-how - one purpose per road.',
          ],
          answer: 'address = where; data = what; control = when and how',
          figures: [
            { caption: 'The mini three-bus map for this solution: CPU and RAM joined by the three labelled roads, with T1 owning the shared data road while T2 and T3 wait - the three questions and the traffic law in one picture.', svg: cf44SolThreeBusSvg() },
          ] },
        { q: 'A microcontroller has a 16-line address bus. How many locations does it name, and what memory size is that in KiB?',
          solution: [
            'Take the width law: $n$ lines name $2^{n}$ locations.',
            'Compute: $2^{16} = 65{,}536$ locations, one byte each.',
            'Convert with the honest ladder: $65{,}536 \\div 1024 = 64$.',
            'Hence 65,536 byte locations = 64 KiB - the beloved boundary of the eight-bit era.',
          ],
          answer: '65,536 locations = 64 KiB' },
        { q: 'A USB 2.0 port advertises 480 Mbps. Convert that line rate to megabytes per second.',
          solution: [
            'Take the conversion law: eight bits to the byte.',
            'Compute: $480 \\div 8 = 60$.',
            'Hence 60 MB/s - the LINE rate, the wire\'s ceiling before protocol tolls.',
          ],
          answer: '60 MB/s line rate' },
        { q: 'HDMI 1.0 (2002) ran at 4.95 Gbps; HDMI 2.1 (2017) runs at 48 Gbps. Compute the multiple, to five decimal places.',
          solution: [
            'Take the ratio: $48 \\div 4.95$.',
            'Compute: $48/4.95 = 9.69696969 \\ldots$',
            'Round as asked: 9.69697 to five decimals.',
            'Hence fifteen years bought the display road 9.69697 times its founding pipe.',
          ],
          answer: '9.69697x' },
      ] },
      { level: 'L2', questions: [
        { q: 'A memory module holds 1 GiB. What is the least number of address lines that reaches it, and what does one line fewer name?',
          solution: [
            'Take the target in bytes: 1 GiB $= 2^{30} = 1{,}073{,}741{,}824$ bytes.',
            'Check the rung below: $2^{29} = 536{,}870{,}912 = 512$ MiB - falls short.',
            'Check the rung itself: $2^{30}$ lands exactly on the target.',
            'Hence 30 lines are the least that suffice, and 29 lines reach only half - 512 MiB.',
          ],
          answer: '30 lines; 29 lines name 512 MiB, half the target',
          figures: [
            { caption: 'The sizing check for this solution: 29 lines fall short at 512 MiB, 30 lines land exactly on 1 GiB - the least width that suffices, with nothing to spare.', svg: cf44SolWidth30Svg() },
          ] },
        { q: 'Derive the per-lane payload of PCIe generation 1.0 from its 2.5 GT/s line rate and 8b/10b encoding.',
          solution: [
            'Take the wire rate: 2.5 GT/s of transfers.',
            'Pay the toll: $2.5 \\times (8/10) = 2$ Gbit/s of payload.',
            'Convert: $2 \\div 8 = 0.25$ GB/s $= 250$ MB/s.',
            'Hence 250 MB/s per lane - the floor of the PCIe ladder.',
          ],
          answer: '250 MB/s per lane' },
        { q: 'Derive the per-lane payload of PCIe 3.0 from 8 GT/s through the 128b/130b toll, and state the pinned four-decimal figure.',
          solution: [
            'Take the wire rate: 8 GT/s - transfers, not bytes.',
            'Pay the toll: $8 \\times (128/130) = 7.876923$ Gbit/s of payload.',
            'Convert to bytes: $7.876923 \\div 8 = 0.984615385$ GB/s.',
            'Read in megabytes: $0.984615385 \\times 1000 = 984.615385$ MB/s.',
            'Hence 984.6154 MB/s per lane, pinned to four decimals.',
          ],
          answer: '984.6154 MB/s per lane',
          figures: [
            { caption: 'The toll-gate pipeline for this solution: 8 GT/s in, times 128/130, divided by 8, times 1000 - four boxes from transfers to the pinned 984.6154 MB/s.', svg: cf44SolTollSvg() },
          ] },
        { q: 'SATA 3.0 runs at 6 Gbit/s and pays an 8b/10b toll. Derive its raw byte rate.',
          solution: [
            'Take the wire rate: $6 \\times 10^{9}$ bit/s.',
            'Pay the toll: $6 \\times 10^{9} \\times 8/10 = 4.8 \\times 10^{9}$ payload bit/s.',
            'Convert: $4.8 \\times 10^{9} \\div 8 = 600{,}000{,}000$ B/s.',
            'Hence 600 MB/s raw - the honest ceiling a SATA 3.0 drive quotes.',
          ],
          answer: '600 MB/s raw' },
        { q: 'A slot bundles sixteen PCIe 5.0 lanes, each carrying 3938.4615 MB/s. Compute the slot\'s payload in GB/s.',
          solution: [
            'Take the bundle law: slot payload $= 16 \\times$ lane payload.',
            'Compute: $16 \\times 3938.4615 = 63{,}015.3846$ MB/s.',
            'Convert: $63{,}015.3846 \\div 1000 = 63.0153846$ GB/s.',
            'Hence 63.0154 GB/s per x16 gen 5.0 slot - the fastest road in the census.',
          ],
          answer: '63.0154 GB/s' },
      ] },
      { level: 'L3', questions: [
        { q: 'A graphics card rides a x16 gen 4.0 slot (31,507.6923 MB/s); a USB 2.0 stick rides its 60 MB/s line rate. Compute the ratio, and confirm it in GB/s framing.',
          solution: [
            'Take both roads for the same second: 31507.6923 MB/s against 60 MB/s.',
            'Divide in megabytes: $31507.6923 \\div 60 = 525.128205$x.',
            'Now, convert both: 31.507692 GB/s against 0.060 GB/s.',
            'Divide again: $31.507692 \\div 0.060 = 525.128205$x - the same ratio, as units demand.',
            'Hence 525.1282 times - the port-versus-internal-road divide in one number.',
          ],
          answer: '525.1282x, identical in both framings',
          figures: [
            { caption: 'The competition for this solution: both roads drawn to one scale, the graphics bar at 31,507.6923 MB/s and the stick bar a sliver at 60 MB/s - the ratio 525.1282x readable off the picture.', svg: cf44SolRaceSvg() },
          ] },
        { q: 'Compute the three ratios of the USB ladder - 2.0 over 1.0, 3.0 over 2.0, USB4 over 3.0 - and comment on the pattern.',
          solution: [
            'Take the first jump: $480 \\div 12 = 40$x (1996 to 2000).',
            'Take the second: $5000 \\div 480 = 10.416667$x (2000 to 2008).',
            'Take the third: $40 \\div 5 = 8$x (2008 to 2019).',
            'So, the ratios shrink: 40, then 10.416667, then 8 - each generation bought less MULTIPLE than the last.',
            'Yet each still transformed practice, because the base kept growing - ratios of a rising ladder.',
            'Hence the decelerating-ratio pattern, read honestly.',
          ],
          answer: '40x, 10.416667x, 8x - shrinking multiples of a growing base',
          figures: [
            { caption: 'The USB staircase for this solution: four log-height steps from 12 Mbps to 40 Gbps with the three ratio labels between them - the shrinking multiples made visible.', svg: cf44SolUsbStairsSvg() },
          ] },
        { q: 'An architecture text describes a machine with a 48-bit address space. How many bytes does it name, and what is that in TiB?',
          solution: [
            'Take the width law: $2^{48}$ locations, one byte each.',
            'Compute: $2^{48} = 281{,}474{,}976{,}710{,}656$ bytes.',
            'Convert with the ladder: one tebibyte is $2^{40}$ bytes.',
            'So, $281{,}474{,}976{,}710{,}656 \\div 2^{40} = 256$ TiB exactly.',
            'Hence 48 lines name 256 TiB - a rung between the 4 GiB witness and the 16 EiB horizon.',
          ],
          answer: '281,474,976,710,656 bytes = 256 TiB' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style: "Explain why high-speed links abandoned parallel transmission for serial, and state what a PCIe lane is." Write the argument in full.',
          solution: [
            'Take the parallel promise first: $n$ wires, $n$ bits per beat - width buying speed without clock.',
            'Name the gremlin: skew - tiny arrival-time differences among the wires, from length, material and interference.',
            'Now, raise the clock: the beat shrinks (about $0.333$ ns at 3 GHz) until skew spans the whole beat and the receiver samples a mixture of two beats.',
            'So, width turns traitor at speed: every added wire adds skew and caps the clock.',
            'Take the serial counter-bet: few wires, much faster clock - wide in TIME where parallel was wide in SPACE.',
            'Check the product: payload per second is width times clock, and serial\'s clock gain outran parallel\'s width.',
            'Define the lane: a PCIe lane is two wire pairs, one each direction, serial within each - and slots bundle lanes (x1 to x16) to restore width modularly.',
            'Hence the reversal: parallel went wide in space and hit the skew wall; serial went wide in time, and its bundles - lanes - are the width law reborn.',
          ],
          answer: 'skew caps wide-and-fast parallel; serial wins wide-in-time; a PCIe lane is two directional wire pairs, bundled as x1..x16' },
        { q: 'Exam-style: "A shop advertises a USB-C cable as \'40 Gbps because it is USB-C\'. Unpack the two errors, using the dates and rates of the census."',
          solution: [
            'Take the first error: USB-C is a connector SHAPE, specified in August 2014 - not a speed at all.',
            'Check the shape\'s history: the same reversible plug has carried USB 2.0\'s 480 Mbps, USB 3.0\'s 5 Gbps and USB4\'s 40 Gbps.',
            'So, plug shape tells you the doorway, never the road behind it.',
            'Take the second error: even the 40 Gbps figure is a LINE rate for USB4 (2019) - the road, not the cable, decides whether that rate exists.',
            'Hence the honest reading: generations and rates come from the specification sheet - USB-C (August 2014) is a shape; USB4 (2019) is a 40 Gbps road that may or may not sit behind any given C-shaped door.',
          ],
          answer: 'USB-C is a shape (Aug 2014), not a speed; 40 Gbps belongs to USB4 (2019), the road behind the door' },
        { q: 'Exam-style: "Divide a computer\'s roads into internal buses, external ports and storage roads, give one pinned rate for each class, and explain why the 525.1282x gap between classes is not a design flaw."',
          solution: [
            'Take class one, internal buses: PCIe - a x16 gen 4.0 slot carries 31.5077 GB/s.',
            'Take class two, external ports: USB 2.0\'s line rate is 60 MB/s (480 Mbit/s divided by 8), with usable rates near 40 MB/s.',
            'Take class three, storage roads: SATA 3.0 yields 600 MB/s raw, while NVMe rides PCIe lanes - x4 gen 4.0 is 7876.9231 MB/s.',
            'Now, compute the flagship gap: $31507.6923 \\div 60 = 525.128205$x.',
            'Explain the gap: internal roads chase raw rate on short protected traces; ports chase universality and robustness across user-abused cables.',
            'So, the gap is two design briefs doing separate jobs - not a scandal.',
            'The scandal would be expecting port rates from internal work or internal rates through a doorway.',
            'Hence the divide, priced and justified: 525.1282x between briefs, each brief honest in its own lane.',
          ],
          answer: 'internal 31.5077 GB/s (x16 gen4); port 60 MB/s line (USB 2.0); storage 600 MB/s raw SATA or 7.8769 GB/s NVMe x4; the 525.1282x gap is the two briefs, not a flaw' },
      ] },
    ] },
  ],
}
