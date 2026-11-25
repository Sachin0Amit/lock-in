import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf41.ts — CS RUN 8 seat cf41 (the CITY-PLAN lesson).
 *
 * Lesson 4.1 'The Motherboard: the City Plan' of Computer Fundamentals
 * chapter 4 'Inside the Box'. The board as the addressable ground the
 * chapter's map is drawn on: the definition (main PCB carrying the
 * processor, memory, chipset and expansion slots, interconnected by
 * printed copper traces), the city-plan metaphor priced row by row
 * (roads = traces and buses, plots = sockets and slots, utilities =
 * power and the CR2032 coin, districts = form factors), the PCB itself
 * (multi-layer copper, vias, solder mask, the IBM PC's August 1981
 * planar board), the form-factor contracts with their exact arithmetic
 * (ATX 1995 Intel 305 x 244 = 74,420 mm2; microATX 1996 244 square =
 * 59,536 mm2 = EXACTLY 0.800000 of ATX; Mini-ITX 2001 VIA 170 square =
 * 28,900 mm2 = 0.388336 of ATX = 0.485421 of microATX), the plot census
 * (ZIF socket, 288-pin DIMMs, PCIe, the chipset with the Nehalem 2008
 * line, firmware, CMOS, VRM), and the power-and-pulse pair (24-pin main
 * + 8-pin CPU; one clock, priced in 4.2).
 *
 * Every number printed here is pinned green by v-cf41.ts (60 engine
 * checks ran GREEN before this prose was written; the pin block closes
 * the ring). All figures are self-contained computed SVGs in the house
 * palette; every geometry constant is derived, never eyeballed.
 * Study-never-reproduce: every roster, figure, Illustration, quiz item
 * and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const c41 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f41 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order (x, y, weight, size,
   fill, anchor) so the engine's clip audit can parse every label */
function cf41T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* right-pointing arrow: a line plus a small solid head */
function cf41ArrowR(x1: number, y: number, x2: number, color: string): string {
  return `<line x1="${x1}" y1="${y}" x2="${x2 - 7}" y2="${y}" stroke="${color}" stroke-width="2"/>`
    + `<polygon points="${x2},${y} ${x2 - 9},${y - 4.5} ${x2 - 9},${y + 4.5}" fill="${color}"/>`
}

/* ================================================================== */
/* BODY FIGURE 1 — the city plan: an ATX-style board drawn to scale    */
/* (305 x 244 mm at 2.1 px/mm) with every plot labelled and the       */
/* Mini-ITX 170 x 170 ghost box overlaid at the same scale             */
/* ================================================================== */
function cf41CitySvg(): string {
  const W = 760
  const H = 648
  const k = 2.1                     /* px per mm — the engine pins this scale */
  const bw = 305 * k                /* 640.5 */
  const bh = 244 * k                /* 512.4 */
  const bx = 70
  const by = 64
  const gw = 170 * k                /* 357 — the ghost box */
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f41}" role="img" aria-label="The city plan: an ATX-style motherboard drawn to scale as a 305 by 244 millimetre rectangle, with every plot labelled. Centre-top sits the CPU socket as a zero-insertion-force grid; left of it the VRM bank of chokes with the 8-pin CPU feed above; right of the socket stand four DIMM slots of 288 pins each; along the bottom run three PCIe expansion slots; between them sit the chipset square, the firmware chip, the CR2032 3-volt coin cell and the 24-pin ATX main connector on the right edge; the I/O panel hugs the left edge. A dashed ghost box of 170 by 170 millimetres — a whole Mini-ITX district — is overlaid at the same scale to show how much land the small board saves, and a strip beneath prints the three form-factor areas: 74,420, 59,536 and 28,900 square millimetres.">`)
  s.push(cf41T(W / 2, 30, 12, c41.teal, 'middle', 'THE CITY PLAN - ONE BOARD, EVERY DISTRICT LABELLED', true))
  s.push(cf41T(W / 2, 48, 9.5, c41.tealInk, 'middle', 'an ATX-style board to scale: 2.1 px per mm - the Mini-ITX ghost shows the small district on the same land'))
  /* the board outline, mm-true */
  s.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="8" fill="${c41.paper}" stroke="${c41.ink}" stroke-width="2.5"/>`)
  s.push(`<line x1="${bx}" y1="60" x2="${bx + bw}" y2="60" stroke="${c41.ink}" stroke-width="1.5"/>`)
  s.push(`<line x1="${bx}" y1="55" x2="${bx}" y2="65" stroke="${c41.ink}" stroke-width="1.5"/>`)
  s.push(`<line x1="${bx + bw}" y1="55" x2="${bx + bw}" y2="65" stroke="${c41.ink}" stroke-width="1.5"/>`)
  s.push(cf41T(716, 63, 9, c41.tealInk, 'start', '305 mm'))
  s.push(`<line x1="66" y1="${by}" x2="66" y2="${by + bh}" stroke="${c41.ink}" stroke-width="1.5"/>`)
  s.push(cf41T(60, 320, 9, c41.tealInk, 'end', '244 mm'))
  /* I/O panel along the rear edge */
  s.push(`<rect x="${bx + 8}" y="100" width="20" height="250" rx="3" fill="${c41.panelA}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(104, 228, 9, c41.tealInk, 'start', 'I/O'))
  s.push(cf41T(104, 240, 9, c41.tealInk, 'start', 'PANEL'))
  /* 8-pin CPU feed, top-left */
  s.push(`<rect x="150" y="70" width="80" height="20" rx="3" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(190, 84, 9, c41.ink, 'middle', '8-PIN CPU', true))
  /* VRM bank: six chokes in two rows */
  for (const cy of [100, 132]) for (const cx of [170, 204, 238]) {
    s.push(`<rect x="${cx}" y="${cy}" width="24" height="24" rx="4" fill="${c41.white}" stroke="${c41.struct}" stroke-width="2"/>`)
  }
  s.push(cf41T(221, 178, 9.5, c41.ink, 'middle', 'VRM BANK', true))
  s.push(cf41T(221, 190, 9, c41.tealInk, 'middle', 'the power plant'))
  /* CPU socket, centre-top */
  s.push(`<rect x="300" y="96" width="126" height="126" rx="6" fill="${c41.white}" stroke="${c41.struct}" stroke-width="2.5"/>`)
  for (let gx = 312; gx <= 414; gx += 14) s.push(`<line x1="${gx}" y1="104" x2="${gx}" y2="214" stroke="${c41.faint}" stroke-width="1.5"/>`)
  for (let gy = 108; gy <= 210; gy += 14) s.push(`<line x1="306" y1="${gy}" x2="420" y2="${gy}" stroke="${c41.faint}" stroke-width="1.5"/>`)
  s.push(cf41T(363, 150, 9.5, c41.ink, 'middle', 'CPU SOCKET', true))
  s.push(cf41T(363, 164, 9, c41.tealInk, 'middle', '(ZIF grid)'))
  /* four DIMM slots, right of the socket */
  for (const dx of [480, 520, 560, 600]) {
    s.push(`<rect x="${dx}" y="80" width="22" height="210" rx="3" fill="${c41.panelA}" stroke="${c41.accent}" stroke-width="2"/>`)
    s.push(`<line x1="${dx + 11}" y1="86" x2="${dx + 11}" y2="284" stroke="${c41.warn}" stroke-width="1.5" stroke-dasharray="4 5"/>`)
  }
  s.push(cf41T(551, 306, 9.5, c41.ink, 'middle', '4 x DIMM', true))
  s.push(cf41T(551, 318, 9, c41.tealInk, 'middle', '288 pins each'))
  /* 24-pin ATX main connector, right edge */
  s.push(`<rect x="684" y="96" width="20" height="210" rx="3" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(678, 210, 9.5, c41.ink, 'end', '24-PIN', true))
  s.push(cf41T(678, 222, 9.5, c41.tealInk, 'end', 'ATX MAIN'))
  /* three PCIe slots along the bottom */
  s.push(`<rect x="100" y="420" width="330" height="16" rx="3" fill="${c41.white}" stroke="${c41.teal}" stroke-width="2"/>`)
  s.push(`<rect x="100" y="462" width="250" height="16" rx="3" fill="${c41.white}" stroke="${c41.teal}" stroke-width="2"/>`)
  s.push(`<rect x="100" y="504" width="250" height="16" rx="3" fill="${c41.white}" stroke="${c41.teal}" stroke-width="2"/>`)
  s.push(cf41T(265, 412, 9.5, c41.ink, 'middle', 'PCIe SLOTS', true))
  s.push(cf41T(225, 548, 9, c41.tealInk, 'middle', 'expansion districts ride in here'))
  /* chipset, between the slot rows */
  s.push(`<rect x="470" y="430" width="92" height="92" rx="6" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(516, 470, 9.5, c41.ink, 'middle', 'CHIPSET', true))
  s.push(cf41T(516, 484, 9, c41.tealInk, 'middle', 'town hall'))
  /* firmware chip */
  s.push(`<rect x="610" y="470" width="60" height="34" rx="4" fill="${c41.white}" stroke="${c41.ink}" stroke-width="2"/>`)
  s.push(cf41T(640, 484, 9, c41.ink, 'middle', 'FIRMWARE', true))
  s.push(cf41T(640, 496, 9, c41.tealInk, 'middle', 'BIOS/UEFI'))
  /* CR2032 coin cell */
  s.push(cf41T(390, 462, 9, c41.ink, 'middle', 'CMOS CELL', true))
  s.push(`<circle cx="390" cy="498" r="27" fill="${c41.white}" stroke="${c41.teal}" stroke-width="2.5"/>`)
  s.push(`<circle cx="390" cy="498" r="18" fill="${c41.panelA}" stroke="${c41.teal}" stroke-width="1.5"/>`)
  s.push(cf41T(390, 495, 9, c41.ink, 'middle', 'CR2032'))
  s.push(cf41T(390, 507, 9, c41.tealInk, 'middle', '3 V'))
  /* the Mini-ITX ghost box, same scale */
  s.push(`<rect x="${bx + 0.5}" y="${by + 0.5}" width="${gw}" height="${gw}" rx="6" fill="none" stroke="${c41.teal}" stroke-width="2" stroke-dasharray="9 6"/>`)
  s.push(cf41T(240, 260, 9.5, c41.tealInk, 'middle', 'MINI-ITX GHOST', true))
  s.push(cf41T(240, 272, 9, c41.tealInk, 'middle', '170 x 170 mm'))
  /* the strip beneath */
  s.push(`<rect x="16" y="596" width="${W - 32}" height="44" rx="8" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(W / 2, 614, 10, c41.ink, 'middle', 'ATX 305 x 244 mm = 74,420 mm2 - microATX 59,536 mm2 = 80.0% of ATX'))
  s.push(cf41T(W / 2, 632, 9.5, c41.tealInk, 'middle', 'Mini-ITX 28,900 mm2 = 38.8336% of ATX = 48.5421% of microATX - the ghost box is the small district on ATX land'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 2 — the form-factor ladder: three boards at ONE scale   */
/* (1.15 px/mm), so the rectangles are true to area, with the         */
/* percentage captions computed                                        */
/* ================================================================== */
function cf41LadderSvg(): string {
  const W = 760
  const H = 1000
  const k = 1.15                    /* px per mm — one scale for all three */
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f41}" role="img" aria-label="The form-factor ladder: three boards drawn at one scale of 1.15 pixels per millimetre, so the rectangles are true to area. Top, the ATX board of 1995 from Intel at 305 by 244 millimetres, 74,420 square millimetres, the full district. Middle, the microATX board of 1996 at 244 by 244 millimetres, 59,536 square millimetres, exactly 80.0 percent of ATX. Bottom, the Mini-ITX board of 2001 from VIA Technologies at 170 by 170 millimetres, 28,900 square millimetres, 38.8336 percent of ATX and 48.5421 percent of microATX. A strip beneath carries the law: the land falls, but the contract is the shape, not the capability.">`)
  s.push(cf41T(W / 2, 30, 12, c41.teal, 'middle', 'THE FORM-FACTOR LADDER - TRUE TO AREA', true))
  s.push(cf41T(W / 2, 48, 9.5, c41.tealInk, 'middle', 'all three boards at one scale: 1.15 px per mm - so the rectangles carry the true 74,420 : 59,536 : 28,900 area ladder'))
  /* ATX row */
  const aw = 305 * k
  const ah = 244 * k
  s.push(`<rect x="60" y="80" width="${aw}" height="${ah}" rx="6" fill="${c41.paper}" stroke="${c41.ink}" stroke-width="2.5"/>`)
  s.push(cf41T(60 + aw / 2, 220, 14, c41.ink, 'middle', 'ATX', true))
  s.push(cf41T(60 + aw / 2, 240, 9.5, c41.tealInk, 'middle', '1995 - Intel'))
  s.push(cf41T(440, 180, 9.5, c41.ink, 'start', '305 x 244 mm'))
  s.push(cf41T(440, 196, 9.5, c41.ink, 'start', '74,420 mm2'))
  s.push(cf41T(440, 212, 9.5, c41.tealInk, 'start', '100.0% - the full district'))
  s.push(cf41T(440, 228, 9.5, c41.tealInk, 'start', '1,098 mm of edge'))
  /* microATX row */
  const mw = 244 * k
  s.push(`<rect x="60" y="400" width="${mw}" height="${mw}" rx="6" fill="${c41.paper}" stroke="${c41.ink}" stroke-width="2.5"/>`)
  s.push(cf41T(60 + mw / 2, 528, 13, c41.ink, 'middle', 'microATX', true))
  s.push(cf41T(60 + mw / 2, 548, 9.5, c41.tealInk, 'middle', '1996'))
  s.push(cf41T(360, 500, 9.5, c41.ink, 'start', '244 x 244 mm at most'))
  s.push(cf41T(360, 516, 9.5, c41.ink, 'start', '59,536 mm2'))
  s.push(cf41T(360, 532, 9.5, c41.tealInk, 'start', '80.0% of ATX - exact'))
  s.push(cf41T(360, 548, 9.5, c41.tealInk, 'start', '0.800000 on the nose'))
  s.push(cf41T(360, 564, 9.5, c41.tealInk, 'start', '976 mm of edge'))
  /* Mini-ITX row */
  const iw = 170 * k
  s.push(`<rect x="60" y="720" width="${iw}" height="${iw}" rx="6" fill="${c41.paper}" stroke="${c41.ink}" stroke-width="2.5"/>`)
  s.push(cf41T(60 + iw / 2, 806, 12, c41.ink, 'middle', 'Mini-ITX', true))
  s.push(cf41T(60 + iw / 2, 826, 9.5, c41.tealInk, 'middle', '2001 - VIA'))
  s.push(cf41T(278, 780, 9.5, c41.ink, 'start', '170 x 170 mm'))
  s.push(cf41T(278, 796, 9.5, c41.ink, 'start', '28,900 mm2'))
  s.push(cf41T(278, 812, 9.5, c41.tealInk, 'start', '38.8336% of ATX'))
  s.push(cf41T(278, 828, 9.5, c41.tealInk, 'start', '48.5421% of microATX'))
  s.push(cf41T(278, 844, 9.5, c41.tealInk, 'start', '680 mm of edge'))
  /* the strip beneath */
  s.push(`<rect x="16" y="950" width="${W - 32}" height="40" rx="8" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(W / 2, 968, 10, c41.ink, 'middle', 'the land falls 74,420 to 59,536 to 28,900 mm2 - but the contract is the shape, not the capability'))
  s.push(cf41T(W / 2, 984, 9.5, c41.tealInk, 'middle', 'a Mini-ITX board and an ATX board carry the same city on different land'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 3 — the power-and-pulse strip: PSU -> 24-pin + 8-pin   */
/* -> VRM bank -> socket, and the one clock fanning out                */
/* ================================================================== */
function cf41PowerSvg(): string {
  const W = 760
  const H = 400
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f41}" role="img" aria-label="The power-and-pulse strip. Top: the power supply unit feeds the board through two leads - the 24-pin ATX main connector and the 8-pin CPU feed, 32 pins between them - and both land at the VRM bank, the power plant that steps the supply down to the low volts the processor eats before it reaches the CPU socket. Bottom: the system clock drawn as a circle with tick marks, one metronome whose dashed beat lines fan out to the socket, the DIMM slots, the PCIe slots and the chipset - the whole city steps to one beat. A strip beneath hands the clock's pricing to lesson 4.2.">`)
  s.push(cf41T(W / 2, 28, 12, c41.teal, 'middle', 'POWER AND PULSE - TWO FEEDS AND ONE METRONOME', true))
  s.push(cf41T(W / 2, 46, 9.5, c41.tealInk, 'middle', 'the 24-pin main and the 8-pin CPU feed the power plant - the clock beats once and the whole city moves'))
  /* the supply */
  s.push(`<rect x="30" y="80" width="110" height="90" rx="8" fill="${c41.panelA}" stroke="${c41.accent}" stroke-width="2"/>`)
  s.push(cf41T(85, 118, 12, c41.ink, 'middle', 'PSU', true))
  s.push(cf41T(85, 134, 9, c41.tealInk, 'middle', 'the supply'))
  /* the two leads */
  s.push(`<rect x="190" y="76" width="130" height="40" rx="6" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(255, 100, 9.5, c41.ink, 'middle', '24-PIN ATX MAIN', true))
  s.push(`<rect x="190" y="132" width="130" height="40" rx="6" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(255, 156, 9.5, c41.ink, 'middle', '8-PIN CPU FEED', true))
  s.push(cf41ArrowR(140, 96, 186, c41.accent))
  s.push(cf41ArrowR(140, 152, 186, c41.accent))
  /* the board strip with VRM and socket */
  s.push(`<rect x="360" y="70" width="370" height="140" rx="8" fill="${c41.paper}" stroke="${c41.ink}" stroke-width="2.5"/>`)
  for (const cx of [390, 420, 450]) s.push(`<rect x="${cx}" y="100" width="24" height="24" rx="4" fill="${c41.white}" stroke="${c41.struct}" stroke-width="2"/>`)
  s.push(cf41T(432, 148, 9.5, c41.ink, 'middle', 'VRM BANK', true))
  s.push(cf41ArrowR(476, 124, 534, c41.conn))
  s.push(`<rect x="540" y="96" width="120" height="70" rx="6" fill="${c41.white}" stroke="${c41.struct}" stroke-width="2.5"/>`)
  s.push(cf41T(600, 128, 9.5, c41.ink, 'middle', 'CPU SOCKET', true))
  s.push(cf41T(600, 142, 9, c41.tealInk, 'middle', '(stepped down)'))
  s.push(`<line x1="322" y1="96" x2="386" y2="110" stroke="${c41.accent}" stroke-width="2"/>`)
  s.push(`<line x1="322" y1="152" x2="386" y2="136" stroke="${c41.accent}" stroke-width="2"/>`)
  /* the metronome */
  s.push(`<circle cx="140" cy="265" r="40" fill="${c41.white}" stroke="${c41.teal}" stroke-width="2.5"/>`)
  for (let t = 0; t < 12; t++) {
    const a = (t * Math.PI) / 6
    s.push(`<line x1="${(140 + 33 * Math.cos(a)).toFixed(2)}" y1="${(265 + 33 * Math.sin(a)).toFixed(2)}" x2="${(140 + 39 * Math.cos(a)).toFixed(2)}" y2="${(265 + 39 * Math.sin(a)).toFixed(2)}" stroke="${c41.teal}" stroke-width="1.5"/>`)
  }
  s.push(cf41T(140, 261, 10, c41.ink, 'middle', 'CLOCK', true))
  s.push(cf41T(140, 275, 9, c41.tealInk, 'middle', 'the pulse'))
  s.push(cf41T(140, 330, 9.5, c41.tealInk, 'middle', 'one beat - one city', true))
  const beat: [string, number][] = [['SOCKET', 206], ['DIMM', 240], ['PCIe', 274], ['CHIPSET', 308]]
  for (const [nm, by] of beat) {
    s.push(`<line x1="182" y1="265" x2="556" y2="${by + 13}" stroke="${c41.teal}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
    s.push(`<rect x="560" y="${by}" width="90" height="26" rx="5" fill="${c41.panelA}" stroke="${c41.conn}" stroke-width="1.8"/>`)
    s.push(cf41T(605, by + 17, 9, c41.ink, 'middle', nm, true))
  }
  /* the strip beneath */
  s.push(`<rect x="16" y="350" width="${W - 32}" height="40" rx="8" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(W / 2, 368, 10, c41.ink, 'middle', 'the two feeds: 24 + 8 = 32 pins - the VRM steps the supply down to what the processor eats'))
  s.push(cf41T(W / 2, 386, 9.5, c41.tealInk, 'middle', 'the pulse: one clock distributes one heartbeat across every district - its price is lesson 4.2\'s ground'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 4 — the board edge-on: six copper layers, one via,     */
/* a trace changing layers                                             */
/* ================================================================== */
function cf41LayersSvg(): string {
  const W = 760
  const H = 360
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f41}" role="img" aria-label="The board seen edge-on: a substrate slab carrying six copper layers as horizontal bands, labelled L1 at the top through L6 at the bottom, with the solder mask strip above L1 giving the board its colour. A vertical plated tube - the via - drills through the slab at centre, and a trace drawn in teal runs along layer 1 from the left, dives down the via, and continues along layer 4 to the right: a road using a flyover to change levels. A note says a modern board commonly carries 6 to 10 layers, some buried inside the slab.">`)
  s.push(cf41T(W / 2, 28, 12, c41.teal, 'middle', 'THE BOARD EDGE-ON - SIX COPPER LAYERS AND ONE VIA', true))
  s.push(cf41T(W / 2, 46, 9.5, c41.tealInk, 'middle', 'a modern board commonly carries 6 to 10 copper layers - six are drawn here, with one trace changing levels'))
  /* the slab */
  s.push(`<rect x="90" y="74" width="470" height="190" rx="6" fill="${c41.paper}" stroke="${c41.ink}" stroke-width="2.5"/>`)
  s.push(`<rect x="90" y="66" width="470" height="6" fill="${c41.teal}"/>`)
  s.push(cf41T(570, 70, 9, c41.tealInk, 'start', 'solder mask: the colour'))
  const ys = [84, 118, 152, 186, 220, 254]
  const names = ['L1 top', 'L2', 'L3', 'L4', 'L5', 'L6 bottom']
  ys.forEach((y, i) => {
    s.push(`<rect x="90" y="${y - 2}" width="470" height="4" fill="${i === 0 || i === 5 ? c41.struct : c41.mid}"/>`)
    s.push(cf41T(84, y + 3, 9, c41.tealInk, 'end', names[i], i === 0 || i === 5))
  })
  s.push(cf41T(570, 120, 9, c41.tealInk, 'start', 'planes inside: power,'))
  s.push(cf41T(570, 134, 9, c41.tealInk, 'start', 'ground - buried roads'))
  /* the via */
  s.push(`<rect x="300" y="78" width="12" height="192" rx="4" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(306, 276, 9.5, c41.ink, 'middle', 'THE VIA', true))
  s.push(cf41T(306, 290, 9, c41.tealInk, 'middle', 'a drilled, plated flyover between layers'))
  /* the trace: along L1, down the via, along L4 */
  s.push(`<polyline points="100,84 268,84 306,186 330,186 545,186" fill="none" stroke="${c41.teal}" stroke-width="2.5"/>`)
  s.push(cf41T(450, 172, 9, c41.tealInk, 'middle', 'a trace changing layers'))
  /* the strip beneath */
  s.push(`<rect x="16" y="316" width="${W - 32}" height="38" rx="8" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(W / 2, 334, 10, c41.ink, 'middle', 'vias are the flyovers between layers - traces are roads measured in tenths of a millimetre'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURES — compact computed SVGs that aid THAT exercise    */
/* (0-2 per question, per the v9.0 directive)                          */
/* ================================================================== */

/* S1 — the mini city plan: the plots labelled on a small board */
function cf41SolCropSvg(): string {
  const W = 680
  const H = 310
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f41}" role="img" aria-label="A mini city plan for the labelling drill: a small board rectangle carrying the CPU socket as a square top-centre, two DIMM slots to its right, two PCIe slots along the bottom, the chipset square beside them, the CR2032 coin cell as a small circle bottom-left, and the 24-pin connector on the right edge. Each plot is named by a label to the right of the board: the socket is the processor's plot, the DIMM slots carry memory at 288 pins each, the PCIe slots are where expansion districts ride in, the chipset is the town hall, the CR2032 is the 3-volt coin, and the 24-pin is the main power lead.">`)
  s.push(cf41T(W / 2, 30, 11, c41.teal, 'middle', 'THE PLOTS, LABELLED - A MINI CITY PLAN', true))
  s.push(`<rect x="50" y="60" width="330" height="210" rx="6" fill="${c41.paper}" stroke="${c41.ink}" stroke-width="2.5"/>`)
  s.push(`<rect x="150" y="84" width="70" height="70" rx="4" fill="${c41.white}" stroke="${c41.struct}" stroke-width="2"/>`)
  s.push(cf41T(185, 122, 9, c41.ink, 'middle', 'SOCKET', true))
  s.push(`<rect x="270" y="76" width="14" height="120" rx="2" fill="${c41.panelA}" stroke="${c41.accent}" stroke-width="1.8"/>`)
  s.push(`<rect x="296" y="76" width="14" height="120" rx="2" fill="${c41.panelA}" stroke="${c41.accent}" stroke-width="1.8"/>`)
  s.push(`<rect x="70" y="224" width="200" height="12" rx="2" fill="${c41.white}" stroke="${c41.teal}" stroke-width="1.8"/>`)
  s.push(`<rect x="70" y="246" width="140" height="12" rx="2" fill="${c41.white}" stroke="${c41.teal}" stroke-width="1.8"/>`)
  s.push(`<rect x="230" y="200" width="56" height="48" rx="4" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="1.8"/>`)
  s.push(cf41T(258, 226, 9, c41.ink, 'middle', 'CHIPSET', true))
  s.push(`<circle cx="120" cy="190" r="16" fill="${c41.white}" stroke="${c41.teal}" stroke-width="2"/>`)
  s.push(cf41T(120, 193, 9, c41.ink, 'middle', '3 V'))
  s.push(`<rect x="366" y="90" width="14" height="110" rx="2" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="1.8"/>`)
  const labels: [string, number][] = [
    ['SOCKET: the processor rides here', 100],
    ['DIMM SLOTS: memory, 288 pins each', 130],
    ['PCIe SLOTS: districts ride in', 160],
    ['CHIPSET: the town hall', 190],
    ['CR2032: the 3 V coin', 220],
    ['24-PIN: the main power lead', 250],
  ]
  for (const [txt, ly] of labels) s.push(cf41T(430, ly, 9, c41.ink, 'start', txt))
  s.push(`<line x1="224" y1="119" x2="424" y2="100" stroke="${c41.faint}" stroke-width="1.5"/>`)
  s.push(`<line x1="312" y1="136" x2="424" y2="130" stroke="${c41.faint}" stroke-width="1.5"/>`)
  s.push(`<line x1="272" y1="230" x2="424" y2="160" stroke="${c41.faint}" stroke-width="1.5"/>`)
  s.push(`<line x1="288" y1="224" x2="424" y2="190" stroke="${c41.faint}" stroke-width="1.5"/>`)
  s.push(`<line x1="136" y1="190" x2="424" y2="220" stroke="${c41.faint}" stroke-width="1.5"/>`)
  s.push(`<line x1="380" y1="145" x2="424" y2="250" stroke="${c41.faint}" stroke-width="1.5"/>`)
  s.push(`<rect x="16" y="276" width="${W - 32}" height="26" rx="6" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="1.8"/>`)
  s.push(cf41T(W / 2, 293, 9.5, c41.ink, 'middle', 'twelve plots on the full board: socket, 4 DIMM, 3 PCIe, chipset, firmware, coin, VRM bank'))
  s.push('</svg>')
  return s.join('')
}

/* S2 — the area ladder as bars: widths true to area */
function cf41SolBarsSvg(): string {
  const W = 680
  const H = 340
  const x0 = 110
  const full = 380
  const rows = [
    { name: 'ATX', w: full, area: '74,420 mm2 - 100%', side: '305 x 244 mm', fill: c41.paper, stroke: c41.ink },
    { name: 'microATX', w: full * 0.8, area: '59,536 mm2 - 80.0% of ATX', side: '244 x 244 mm', fill: c41.panelA, stroke: c41.accent },
    { name: 'Mini-ITX', w: full * (28900 / 74420), area: '28,900 mm2 - 38.8336% of ATX', side: '170 x 170 mm', fill: c41.panelB, stroke: c41.conn },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f41}" role="img" aria-label="The area ladder as three bars whose widths are true to area: ATX at full width for 74,420 square millimetres, microATX at exactly 80.0 percent of that width for 59,536 square millimetres, and Mini-ITX at 38.8336 percent of it for 28,900 square millimetres. Each bar carries its side lengths inside - 305 by 244, 244 by 244, 170 by 170 millimetres - and its area and share beside it. A strip beneath prints the chain: microATX is 0.800000 of ATX exactly, and the two Mini-ITX ratios compose through it, since 0.485421 times 0.800000 is 0.388336.">`)
  s.push(cf41T(W / 2, 30, 11, c41.teal, 'middle', 'THE AREA LADDER AS BARS - WIDTHS TRUE TO AREA', true))
  rows.forEach((r, i) => {
    const by = 80 + i * 70
    s.push(`<rect x="${x0}" y="${by}" width="${r.w.toFixed(2)}" height="34" rx="5" fill="${r.fill}" stroke="${r.stroke}" stroke-width="2"/>`)
    s.push(cf41T(x0 + r.w / 2, by + 21, 9, c41.ink, 'middle', r.side))
    s.push(cf41T(x0 - 8, by + 21, 9.5, c41.ink, 'end', r.name, true))
    s.push(cf41T(x0 + r.w + 10, by + 21, 9.5, c41.tealInk, 'start', r.area))
  })
  s.push(`<rect x="16" y="286" width="${W - 32}" height="44" rx="8" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(W / 2, 304, 10, c41.ink, 'middle', 'microATX = 0.800000 of ATX exactly - Mini-ITX = 0.388336 of ATX = 0.485421 of microATX'))
  s.push(cf41T(W / 2, 322, 9.5, c41.tealInk, 'middle', 'the chain composes: 0.485421 x 0.800000 = 0.388336'))
  s.push('</svg>')
  return s.join('')
}

/* S3 — the power path for the VRM drill */
function cf41SolPowerSvg(): string {
  const W = 680
  const H = 300
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f41}" role="img" aria-label="The power path for the VRM drill: the power supply on the left feeds two leads - the 24-pin ATX main connector and the 8-pin CPU feed, 32 pins between them - and both arrows land at the VRM bank drawn as three chokes, which then feeds the CPU socket with an arrow labelled stepped down. A caption reads: both leads meet the VRM, the power plant that steps the supply down; a strip beneath prints the census 24 plus 8 equals 32 pins.">`)
  s.push(cf41T(W / 2, 28, 11, c41.teal, 'middle', 'THE POWER PATH - TWO LEADS, ONE POWER PLANT', true))
  s.push(`<rect x="30" y="70" width="100" height="90" rx="8" fill="${c41.panelA}" stroke="${c41.accent}" stroke-width="2"/>`)
  s.push(cf41T(80, 110, 12, c41.ink, 'middle', 'PSU', true))
  s.push(cf41T(80, 126, 9, c41.tealInk, 'middle', 'the wall'))
  s.push(`<rect x="170" y="66" width="120" height="38" rx="6" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(230, 88, 9.5, c41.ink, 'middle', '24-PIN MAIN', true))
  s.push(`<rect x="170" y="120" width="120" height="38" rx="6" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(230, 142, 9.5, c41.ink, 'middle', '8-PIN CPU', true))
  s.push(cf41ArrowR(130, 85, 166, c41.accent))
  s.push(cf41ArrowR(130, 139, 166, c41.accent))
  s.push(`<rect x="330" y="66" width="130" height="92" rx="8" fill="${c41.paper}" stroke="${c41.ink}" stroke-width="2"/>`)
  for (const cx of [350, 376, 402]) s.push(`<rect x="${cx}" y="78" width="20" height="20" rx="4" fill="${c41.white}" stroke="${c41.struct}" stroke-width="1.8"/>`)
  s.push(cf41T(395, 132, 9.5, c41.ink, 'middle', 'VRM BANK', true))
  s.push(cf41ArrowR(290, 85, 326, c41.accent))
  s.push(cf41ArrowR(290, 139, 326, c41.accent))
  s.push(`<rect x="510" y="84" width="130" height="60" rx="6" fill="${c41.white}" stroke="${c41.struct}" stroke-width="2"/>`)
  s.push(cf41T(575, 110, 9.5, c41.ink, 'middle', 'CPU SOCKET', true))
  s.push(cf41T(575, 124, 9, c41.tealInk, 'middle', '(stepped down)'))
  s.push(cf41ArrowR(460, 112, 506, c41.conn))
  s.push(cf41T(340, 190, 9.5, c41.tealInk, 'middle', 'both leads meet the VRM - the power plant that steps the supply down'))
  s.push(`<rect x="16" y="214" width="${W - 32}" height="60" rx="8" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(W / 2, 236, 10, c41.ink, 'middle', 'the census: 24 + 8 = 32 pins in the two leads'))
  s.push(cf41T(W / 2, 256, 9.5, c41.tealInk, 'middle', 'the VRM converts the supply to the low volts the processor eats'))
  s.push('</svg>')
  return s.join('')
}

/* S4 — the layer stack for the trace drill */
function cf41SolStackSvg(): string {
  const W = 680
  const H = 300
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f41}" role="img" aria-label="The trace route for the layer drill: a substrate slab carrying six copper layers labelled L1 through L6, with a vertical plated via drilling through the slab at centre. A teal trace runs along layer 1 from the left, dives down the via, and continues along layer 4 to the right - the label reads, the trace hops from L1 to L4. A note beside the slab says six copper layers, commonly 6 to 10 on a modern board, and the strip beneath calls the via a drilled, plated tube, the flyover between copper layers.">`)
  s.push(cf41T(W / 2, 28, 11, c41.teal, 'middle', 'THE TRACE\'S ROUTE - DOWN THE VIA, ALONG LAYER 4', true))
  s.push(`<rect x="60" y="70" width="420" height="170" rx="6" fill="${c41.paper}" stroke="${c41.ink}" stroke-width="2.5"/>`)
  const ys = [84, 114, 144, 174, 204, 234]
  ys.forEach((y, i) => {
    s.push(`<rect x="60" y="${y - 2}" width="420" height="4" fill="${i === 0 || i === 5 ? c41.struct : c41.mid}"/>`)
    s.push(cf41T(54, y + 3, 9, c41.tealInk, 'end', `L${i + 1}`))
  })
  s.push(`<rect x="240" y="78" width="12" height="162" rx="4" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(`<polyline points="80,84 234,84 246,174 470,174" fill="none" stroke="${c41.teal}" stroke-width="2.5"/>`)
  s.push(cf41T(350, 160, 9, c41.tealInk, 'middle', 'the trace hops from L1 to L4'))
  s.push(cf41T(492, 100, 9, c41.tealInk, 'start', 'six copper layers,'))
  s.push(cf41T(492, 114, 9, c41.tealInk, 'start', 'commonly 6 to 10'))
  s.push(cf41T(492, 128, 9, c41.tealInk, 'start', 'on a modern board'))
  s.push(`<rect x="16" y="254" width="${W - 32}" height="40" rx="8" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(W / 2, 272, 10, c41.ink, 'middle', 'the via is a drilled, plated tube - the flyover between copper layers'))
  s.push(cf41T(W / 2, 288, 9.5, c41.tealInk, 'middle', 'a trace may run on one layer, hop a via, and finish on another'))
  s.push('</svg>')
  return s.join('')
}

/* S5 — the ghost box: Mini-ITX land inside the ATX outline */
function cf41SolGhostSvg(): string {
  const W = 680
  const H = 500
  const k = 1.6
  const bw = 305 * k
  const bh = 244 * k
  const gw = 170 * k
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f41}" role="img" aria-label="The ghost box: the ATX outline of 305 by 244 millimetres drawn as a large rectangle at 1.6 pixels per millimetre, with a dashed Mini-ITX square of 170 by 170 millimetres overlaid at the top-left corner. Dashed divider lines mark the spare land: 135 millimetres of length and 74 millimetres of depth stay free beyond the ghost, and the free region is labelled 45,520 square millimetres. Labels print both areas - the ghost covers 0.388336 of the ATX face - and a strip beneath states that 45,520 of 74,420 square millimetres stays free.">`)
  s.push(cf41T(W / 2, 30, 11, c41.teal, 'middle', 'THE GHOST BOX - MINI-ITX LAND INSIDE THE ATX OUTLINE', true))
  s.push(cf41T(W / 2, 48, 9.5, c41.tealInk, 'middle', 'one scale for both outlines: 1.6 px per mm'))
  s.push(`<rect x="96" y="70" width="${bw}" height="${bh}" rx="6" fill="${c41.paper}" stroke="${c41.ink}" stroke-width="2.5"/>`)
  s.push(`<rect x="96" y="70" width="${gw}" height="${gw}" rx="4" fill="${c41.panelA}" stroke="${c41.teal}" stroke-width="2" stroke-dasharray="9 6"/>`)
  s.push(cf41T(232, 200, 12, c41.tealInk, 'middle', 'MINI-ITX', true))
  s.push(cf41T(232, 218, 9.5, c41.ink, 'middle', '170 x 170 mm'))
  s.push(cf41T(232, 234, 9.5, c41.ink, 'middle', '28,900 mm2'))
  s.push(`<line x1="${96 + gw}" y1="70" x2="${96 + gw}" y2="${70 + bh}" stroke="${c41.faint}" stroke-width="1.5" stroke-dasharray="5 5"/>`)
  s.push(`<line x1="96" y1="${70 + gw}" x2="${96 + bw}" y2="${70 + gw}" stroke="${c41.faint}" stroke-width="1.5" stroke-dasharray="5 5"/>`)
  s.push(cf41T(476, 210, 9.5, c41.ink, 'middle', '135 mm spare', true))
  s.push(cf41T(476, 300, 9, c41.tealInk, 'middle', '45,520 mm2 stays free'))
  s.push(cf41T(476, 400, 9.5, c41.ink, 'middle', '74 mm spare', true))
  s.push(cf41T(340, 448, 9.5, c41.tealInk, 'middle', 'ATX - 305 x 244 mm - 74,420 mm2'))
  s.push(`<rect x="16" y="468" width="${W - 32}" height="28" rx="8" fill="${c41.panelB}" stroke="${c41.conn}" stroke-width="2"/>`)
  s.push(cf41T(W / 2, 486, 9.5, c41.ink, 'middle', 'the ghost covers 0.388336 of the ATX face - 45,520 of 74,420 mm2 stays free'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* the lesson                                                          */
/* ================================================================== */
export const lesson41: Lesson = {
  id: 'cf-the-motherboard-the-city-plan',
  number: '4.1',
  title: 'The Motherboard: the City Plan',
  concepts: [
    'the motherboard as the main printed circuit board',
    'the city-plan metaphor: roads, plots, utilities, districts',
    'form factors as contracts: ATX, microATX, Mini-ITX',
    'the exact area arithmetic: 0.800000 and its chain',
    'the plots: socket, DIMM slots, PCIe slots, chipset',
    'firmware, the CMOS coin cell and the VRM',
    'the 24-pin and 8-pin feeds; one clock for the city',
  ],
  objectives: [
    'By the end of this lesson you can define the motherboard formally - the main printed circuit board, carrying the processor, memory, chipset and expansion slots, and interconnecting them with printed copper traces - and read any board in any machine as a city plan: roads, plots, utilities and districts.',
    'By the end of this lesson you can explain what a printed circuit board is: copper traces printed as roads in tenths of a millimetre, layers commonly 6 to 10 deep, vias as the flyovers between them, and the solder mask as the colour you actually see.',
    'By the end of this lesson you can state what a form factor is - the contract fixing a board\u2019s size, mounting holes and I/O layout - and recite the three named here with their dates and keepers: ATX (Intel, 1995, 305 x 244 mm), microATX (1996, at most 244 mm square) and Mini-ITX (VIA Technologies, 2001, 170 x 170 mm).',
    'By the end of this lesson you can compute the form-factor arithmetic cold: 74,420, 59,536 and 28,900 mm2; microATX as exactly 0.800000 of ATX; Mini-ITX as 0.388336 of ATX and 0.485421 of microATX; and you can say why the contract fixes the shape, not the capability.',
    'By the end of this lesson you can take a census of the board\u2019s plots - the zero-insertion-force socket (LGA lands on the board, PGA pins on the chip), the 288-pin DIMM slots, the PCIe expansion slots, the chipset as town hall, the firmware chip, the CR2032 3 V coin cell and the VRM - and give each one its honest one-line job.',
    'By the end of this lesson you can trace the power-and-pulse pair: the 24-pin ATX main connector and the 8-pin CPU feed meeting at the VRM, and the one system clock whose heartbeat every district steps to - handing the clock\u2019s price to lesson 4.2.',
  ],
  prerequisites: ['cf-the-basic-structure-and-operation-of-the-computer'],
  sources: ['cs-cf-web-ground-ch04'],
  blocks: [
    // ================================================================
    // 1. OPENING THE BOX
    // ================================================================
    { kind: 'heading', text: 'Opening the Box: the Ground the Map Is Drawn On' },
    { kind: 'para', text: 'Chapters 1 to 3 kept the box closed, and that was honest discipline: chapter 1 drew the machine as a map - processor here, memory there, input and output at the edges - and chapters 2 and 3 priced the map\u2019s traffic without ever asking what the map was drawn ON. This chapter opens the box, and the first thing inside it is not a component at all. It is a slab of green (or black, or red) fibreglass the size of a place mat, and every component you have ever named in an exam is soldered to it. The slab is the motherboard, and the whole of this lesson is one reading exercise: open the case, look down at the board, and read the city plan off the ground itself.' },
    { kind: 'para', text: 'Why a city plan? Because a motherboard behaves exactly like a planned city, and the metaphor survives being priced. A city has roads along which everything travels; the board has copper traces and the buses they form. A city has plots - surveyed rectangles reserved for specific buildings; the board has sockets and slots, each a patch of land reserved for one kind of citizen. A city has utilities - water, power, gas arriving by a fixed network; the board has the power leads, the CMOS coin cell and the firmware chip. And a city has districts zoned by regulation - residential, industrial, compact or sprawling; the board has form factors, the contracts that fix how much land a district may occupy. Every row of that table is priced later in this lesson, number by number.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — motherboard', text: 'A **motherboard** is said to be the main printed circuit board of a computer, carrying the processor, memory, chipset and expansion slots, and interconnecting them with printed copper traces. Symbolically: the board is the set of plots $P$ (sockets and slots) together with the set of roads $R$ (traces and buses) such that every component of the machine either sits on a plot or connects to the city through one - nothing in the box floats free, and nothing on the board is unreachable.' },
    { kind: 'para', text: 'Read the definition twice and notice what it does and does not claim. It does claim the board is the MAIN board: a PC may carry other small boards - a graphics card is one, riding in an expansion slot - but they are guests, not ground. It does claim the board CARRIES the four great families: processor, memory, chipset, expansion. And it does not claim the board THINKS. The board is not the machine\u2019s brain; it is the machine\u2019s real estate and road network - the addressable ground on which the thinking parts stand and across which they speak. When an exam asks \u201cwhat does the motherboard do?\u201d, the honest short answer is exactly this: it carries the components and interconnects them.' },
    { kind: 'para', text: 'For example, price the metaphor against the board you would actually find under a laptop\u2019s keyboard or behind a desktop\u2019s side panel, row by row:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) roads = the copper traces, printed as fixed routes, and the buses they bundle into - widths measured in tenths of a millimetre, laid out once at manufacture and never re-routed;',
      '(ii) plots = the socket for the processor, the DIMM slots for memory, the PCIe slots for expansion cards - surveyed patches with a fixed pin count each;',
      '(iii) utilities = the power network (the 24-pin ATX main lead and the 8-pin CPU feed), the CR2032 coin cell that keeps the clock alive, and the firmware chip that speaks the machine\u2019s first waking words;',
      '(iv) districts = the form factors - ATX, microATX, Mini-ITX - the contracts that zone the board\u2019s land before a single road is printed.',
    ] },
    { kind: 'para', text: 'The four rows are worth one more reading before they are priced, because they explain why the metaphor is not decoration. Chapter 1\u2019s map needed a GROUND to be drawn on: an address only means something if there is a place it points to, and a bus only means something if there are wires it can travel down. The motherboard is that ground made physical - the map\u2019s paper, if you like - and every later chapter of this book quietly depends on it. When 4.4 prices a bus in bytes per second, the bytes will travel on traces printed here; when 4.3 counts memory in gigabytes, the gigabytes will ride in modules standing in plots surveyed here. Even the operating system\u2019s view of the machine - interrupts, ports, memory maps - is a view of arrangements the board fixes.' },
    { kind: 'table', caption: 'The city-plan dictionary: the metaphor\u2019s four rows against the board\u2019s physical reality, each with the witness this lesson prices.', head: ['The city-plan row', 'On the board', 'The witness this lesson prices'], rows: [
      ['roads', 'copper traces, bundled into buses', 'widths in tenths of a millimetre; layers commonly 6 to 10'],
      ['plots', 'the socket, the DIMM slots, the PCIe slots', '288 pins per desktop DIMM; twelve plots on the drawn board'],
      ['utilities', 'power leads, the CMOS coin, the firmware chip', '24-pin main + 8-pin CPU; CR2032 at 3 V'],
      ['districts', 'the form factors', '74,420 : 59,536 : 28,900 mm2 of land'],
    ] },
    { kind: 'para', text: 'One more piece of discipline before the tour begins. This lesson names components and reads the plan; it does not open them. The processor\u2019s insides are the next lesson (4.2), memory\u2019s cloths and the storage ladder are 4.3, and the roads themselves - buses and ports, priced in bytes per second - are 4.4. The doorstep books stand behind those doors: \u201cComputer Organization and Architecture\u201d owns the full theory of interconnection, and this chapter only names its cast. Keep the reading honest: today you are a surveyor, not an architect.' },
    { kind: 'callout', tone: 'insight', title: 'Note — why the surveyor\u2019s view comes first', text: 'Every later lesson of this chapter stands on this one. You cannot price a bus (4.4) without knowing where the roads are printed, you cannot explain why memory sits in slots beside the processor (4.3) without seeing the plots, and you cannot say why the machine wakes at all without the firmware chip and its coin cell. The city plan is the chapter\u2019s foundation: learn to read the board, and every component lesson that follows has somewhere to live.' },

    // ================================================================
    // 2. THE PRINTED CIRCUIT BOARD ITSELF
    // ================================================================
    { kind: 'heading', text: 'The Printed Circuit Board: a City That Arrives Printed' },
    { kind: 'para', text: 'Begin with the word PRINTED, because it is the most astonishing part of the whole arrangement. Before printed boards, electronics was wired: a technician took a circuit diagram, cut wires to length, and soldered every connection by hand - a city built by laying each road individually, one soldered joint at a time. The printed circuit board replaces all of that with a manufacturing trick: the wiring is etched into sheets of copper bonded to the board, so the whole road network ARRIVES with the ground. You do not build the roads on the land; the land comes with the roads already printed on it, and the components are then soldered straight onto their plots.' },
    { kind: 'para', text: 'Look closely at any board and the roads are visible as thin copper lines running between components - covered, usually, by a coloured lacquer, but there under the paint. A trace\u2019s width is a design decision, and the numbers are smaller than intuition expects: widths are measured in TENTHS of a millimetre, so a typical trace is a fraction of a millimetre wide - about 0.1 mm on the fine signal layers, with wider roads reserved for the power lanes that carry heavy current. The comparison this chapter keeps is the human hair: at roughly 0.05 to 0.1 mm across, a signal trace is of the same order as the hair on your head. A road network finer than hair, printed by the million, on every board on Earth.' },
    { kind: 'para', text: 'One layer of roads, however, is not enough - and this is the first place the city metaphor earns its keep with a vertical dimension. A modern board commonly carries 6 to 10 copper LAYERS, laminated inside the fibreglass like the floors of a multi-storey city: the outer two carry the component plots, and the inner ones - hidden, buried, never seen - carry more roads plus the great solid sheets called POWER and GROUND planes that feed every district at once. The honest hedge belongs in prose and stays there: the count VARIES by board class, and this chapter says \u201ccommonly 6 to 10\u201d rather than pretending a law. What is a law: a trace that needs to change levels uses a VIA - a tiny drilled tube, plated with copper, that carries the road down through the stack like a flyover ramp between floors. The board you will draw from now on is three-dimensional, even though you only ever see its roof.' },
    { kind: 'para', text: 'How does a road network arrive printed? In outline, honestly and without the chemistry: the maker starts from copper-clad laminate, coats it with a light-sensitive film, exposes that film through a mask that carries the circuit\u2019s photograph, and washes away the parts that will become roads; then an etch removes the exposed copper everywhere else, and what remains is the wiring. Plating thickens the surviving roads, the layers are laminated into the stack, the vias are drilled and plated to become flyovers, and the solder mask goes over the top. Every one of those steps is a photograph-and-chemistry operation applied to the WHOLE board at once - which is the quiet economic miracle: the millionth road costs the board maker no more than the first, and a board with ten thousand roads prints as cheaply, near enough, as a board with ten.' },
    { kind: 'figure', caption: 'The board seen edge-on: six copper layers as horizontal bands (a modern board commonly carries 6 to 10), the solder mask above giving the board its colour, one via drilling through the stack as a plated flyover, and a single teal trace running along layer 1, diving down the via, and finishing along layer 4 - a road changing levels because the surface lanes were full.', svg: cf41LayersSvg() },
    { kind: 'para', text: 'The colour you actually see is not the copper and not the fibreglass. It is the SOLDER MASK - the thin lacquer poured over the outer layers so that molten solder, during assembly, wets only the exposed pads and nowhere else. Green is the tradition; black, red, blue and white boards exist. The mask is why the board\u2019s roads look like painted lines rather than bare metal, and its name explains its job: it masks the solder. Beneath it, the copper; beneath the copper, the layers; inside the layers, the vias; and over everything, the components standing on their plots.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the board is not one flat sheet of copper', text: 'Two errors exam papers catch every year. First, treating the board as a single copper layer: the traces you can see are only the outermost two of a stack commonly 6 to 10 layers deep, and most of the city\u2019s roads are buried where you will never see them. Second, treating vias as components: a via is a STRUCTURE of the board - a drilled, plated hole - not a part that was ever bought and plugged in. If a question asks what carries a signal from an outer layer to an inner one, the answer is the via, and it is part of the ground itself.' },
    { kind: 'para', text: 'And the historical beat, dated honestly. The machine that fixed this shape of personal computer - one main board carrying the processor, the memory and the expansion slots, all printed - shipped in August 1981: the IBM PC, whose single large board IBM called its PLANAR board. Open that machine and you found the whole city on one slab: the processor, the memory, the firmware, the ports, and a row of expansion slots that made the machine expandable and therefore survivable. Forty-five years later - 2026 against 1981 - the board on your desk is the same idea executed at a density the 1981 engineers could not have printed: layers in double digits where that board had few, traces in tenths of millimetres, and the same planar discipline.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the planar board, August 1981', text: 'The IBM personal computer shipped in August 1981, and its main board - IBM\u2019s own name for it was the planar board - carried the processor, the memory, the firmware and the expansion slots of the whole machine on one printed circuit board. Our retelling is our own; the date and the planar name are the standard record. What the 1981 board began is the arrangement this lesson reads: a single slab of ground on which the whole city stands, expandable by plugging new districts into reserved slots. The expansion slots, not the processor, are what made that machine a platform - and the platform, not any one component, is what the world bought.' },
    { kind: 'terms', items: [
      { term: 'motherboard', def: 'the main printed circuit board of a computer, carrying the processor, memory, chipset and expansion slots, and interconnecting them with printed copper traces.' },
      { term: 'printed circuit board', def: 'a board of insulating material carrying etched copper wiring - the ground that arrives with the roads already printed on it.' },
      { term: 'trace', def: 'a printed copper road on a board, its width measured in tenths of a millimetre on the fine signal layers.' },
      { term: 'via', def: 'a drilled, copper-plated tube connecting one layer of a board to another - the flyover between floors of the stack.' },
      { term: 'solder mask', def: 'the lacquer over a board\u2019s outer copper that keeps solder to the pads and gives the board its colour.' },
      { term: 'planar board', def: 'IBM\u2019s name for the single main board of the August 1981 IBM PC - the ancestor of every motherboard in this chapter.' },
    ] },

    // ================================================================
    // 3. FORM FACTORS — THE DISTRICTS
    // ================================================================
    { kind: 'heading', text: 'Form Factors: the Districts' },
    { kind: 'para', text: 'Every city in this metaphor is zoned before it is built, and the zoning contract has a name: the form factor. A form factor is not a size alone, and it is certainly not a speed. It is a published CONTRACT that fixes three things at once - the board\u2019s physical size, the position of its mounting holes, and the layout of its input-output panel - so that a case manufacturer, a power-supply maker and a board designer who have never met can build parts that fit. Buy any ATX case, drop in any ATX board, and the screws land in the holes and the connectors peer through the rear window: that is the contract working, and it is why the personal-computer industry became an industry of interchangeable parts rather than bespoke cabinets.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — form factor', text: 'A **form factor** is said to be a published standard fixing a motherboard\u2019s physical dimensions, its mounting-hole positions and its input-output panel layout, so that boards, cases and power supplies built to the same contract interoperate. Symbolically, a form factor $F$ is the triple $F = (S, M, I)$ - a size $S$, a mounting map $M$ and an I/O layout $I$ - and two parts marked with the same $F$ fit without negotiation.' },
    { kind: 'para', text: 'Three districts matter for this course, and each arrives with a date, a keeper and a size you can defend in an exam. ATX: published by Intel in 1995, the full district, 305 x 244 mm - about the size of an A4 sheet of paper, which is a fair thing to visualise. microATX: the compact district, published in 1996 (one year after ATX), fixing the board at AT MOST 244 mm square - the contract says \u201cat most\u201d, and the honest reading is that a microATX board may be smaller, but never bigger. Mini-ITX: the small district, published by VIA Technologies in 2001 (five years after microATX, six after ATX), a square 170 x 170 mm - smaller than this book\u2019s page, small enough to hide behind a monitor.' },
    { kind: 'table', caption: 'The three form-factor contracts this chapter carries. Sizes are the published maxima; the areas are computed from them, and the shares are the lesson\u2019s own honest arithmetic.', head: ['The district', 'The year and keeper', 'The size', 'The area', 'The share'], rows: [
      ['ATX', '1995, Intel', '305 x 244 mm', '74,420 mm2', '100% - the full district'],
      ['microATX', '1996', 'at most 244 x 244 mm', '59,536 mm2', 'exactly 80.0% of ATX'],
      ['Mini-ITX', '2001, VIA Technologies', '170 x 170 mm', '28,900 mm2', '38.8336% of ATX; 48.5421% of microATX'],
    ] },
    { kind: 'para', text: 'Now the arithmetic, done once, properly - because these three rectangles hide one exact ratio and two honest decimal ones, and the engine behind this lesson pins every digit. The areas: ATX is $305 \\times 244 = 74{,}420$ mm2 - 744.2 cm2 of land. microATX at its maximum is $244 \\times 244 = 59{,}536$ mm2. Mini-ITX is $170 \\times 170 = 28{,}900$ mm2. And then the comparison that examination writers love: divide microATX by ATX and the answer is $59{,}536 / 74{,}420 = 0.800000$ - EXACTLY eighty percent, on the nose, no rounding at all. Divide the other way and ATX is $74{,}420 / 59{,}536 = 1.25$ of microATX, also exact. The two big districts stand in a clean 5:4 area ratio, and that is not an accident of these numbers: ATX\u2019s own sides stand in that ratio, since $305 / 244 = 1.25$.' },
    { kind: 'equation', latex: 'A_{\\text{ATX}} = 305 \\times 244 = 74{,}420\\ \\text{mm}^2; \\quad A_{\\mu\\text{ATX}} = 244^2 = 59{,}536\\ \\text{mm}^2 \\tag{1}', note: 'The two big districts\u2019 areas. In the same units: 744.2 cm2 and 595.36 cm2. Perimeters across the ladder: 1,098 mm for ATX, 976 mm for microATX, 680 mm for Mini-ITX.' },
    { kind: 'equation', latex: '\\frac{A_{\\mu\\text{ATX}}}{A_{\\text{ATX}}} = \\frac{59{,}536}{74{,}420} = 0.800000 \\ \\text{exactly}; \\quad \\frac{A_{\\text{ATX}}}{A_{\\mu\\text{ATX}}} = 1.25 \\tag{2}', note: 'The exact pair: microATX is 80.0 percent of ATX, ATX is 1.25 times microATX - a clean 5:4 ratio in land.' },
    { kind: 'example', title: 'Illustration 1. The ATX district, surveyed: area, perimeter and the paper comparison.', steps: [
      'Take the contract\u2019s numbers: 305 mm of length, 244 mm of depth.',
      'So the area is $305 \\times 244 = 74{,}420$ mm2, which is $74{,}420 / 100 = 744.2$ cm2.',
      'Now the boundary: $2 \\times (305 + 244) = 2 \\times 549 = 1{,}098$ mm of board edge.',
      'Check the shape: $305 / 244 = 1.25$, so the district is exactly 5:4 in side ratio - longer than deep by a quarter.',
      'Hence ATX is a 74,420 mm2 district with 1,098 mm of edge - an A4 sheet\u2019s worth of land, five parts long to four parts deep.',
    ] },
    { kind: 'example', title: 'Illustration 2. The exact eighty: why microATX is precisely 0.800000 of ATX.', steps: [
      'Take both areas from the contracts: $59{,}536$ mm2 against $74{,}420$ mm2.',
      'Divide: $59{,}536 / 74{,}420 = 0.8$, and the division terminates - 0.800000 to six places, with nothing hidden in the later digits.',
      'Check it the other way: $74{,}420 \\times 0.8 = 59{,}536$ exactly, so the relation is an identity, not a rounding.',
      'So the compact district gives up $74{,}420 - 59{,}536 = 14{,}884$ mm2 of land - one fifth of the full district, no more, no less.',
      'Hence microATX = 0.800000 of ATX exactly: 80.0 percent of the land, 14,884 mm2 surrendered.',
    ] },
    { kind: 'figure', caption: 'The form-factor ladder drawn true to area: all three boards at one scale (1.15 px per mm), so the rectangles carry the honest 74,420 : 59,536 : 28,900 mm2 ladder. ATX (Intel, 1995) at 305 x 244 mm; microATX (1996) at 244 mm square, exactly 80.0% of ATX; Mini-ITX (VIA Technologies, 2001) at 170 mm square, 38.8336% of ATX and 48.5421% of microATX. The land falls - the contract is the shape, not the capability.', svg: cf41LadderSvg() },
    { kind: 'para', text: 'The smallest district\u2019s ratios are not exact, and this lesson will not pretend otherwise - it prints them to six places and lets the engine hold the ninth. Mini-ITX against ATX: $28{,}900 / 74{,}420 = 0.388336$ (the full engine value is 0.388336469), which is 38.8336 percent of the full district\u2019s land. Mini-ITX against microATX: $28{,}900 / 59{,}536 = 0.485421$ (engine: 0.485420586), which is 48.5421 percent of the compact district. And the two ratios are not strangers: they compose through the exact eighty, since $0.485421 \\times 0.800000 = 0.388336$ - the chain from microATX down to Mini-ITX, followed by the chain from microATX up to ATX, must land you at Mini-ITX against ATX, and it does.' },
    { kind: 'equation', latex: '\\frac{28{,}900}{74{,}420} = 0.388336; \\quad \\frac{28{,}900}{59{,}536} = 0.485421; \\quad 0.485421 \\times 0.800000 = 0.388336 \\tag{3}', note: 'The small district\u2019s shares, with the chain check: share of microATX times the exact eighty lands on the share of ATX.' },
    { kind: 'derivation', title: 'The small district priced against both neighbours', statement: 'Compute Mini-ITX\u2019s land share against ATX and against microATX, prove the two shares compose through the exact eighty, and state the land each hop surrenders.', steps: [
      { label: 'Write the three areas', formula: 'A_{\\text{ATX}} = 74{,}420; \\quad A_{\\mu\\text{ATX}} = 59{,}536; \\quad A_{\\text{ITX}} = 28{,}900\\ \\text{mm}^2', explanation: 'Each area comes from its contract\u2019s sides: 305 x 244, 244 x 244 and 170 x 170 millimetres.' },
      { label: 'Divide by the full district', formula: '\\frac{28{,}900}{74{,}420} = 0.388336469', explanation: 'The prose carries 0.388336 - 38.8336 percent of ATX\u2019s land - and the engine pins the ninth place.' },
      { label: 'Divide by the compact district', formula: '\\frac{28{,}900}{59{,}536} = 0.485420586', explanation: 'The prose carries 0.485421 - 48.5421 percent of microATX\u2019s land.' },
      { label: 'Compose through the exact eighty', formula: '0.485420586 \\times 0.800000 = 0.388336469', explanation: 'Share of microATX times microATX\u2019s share of ATX must equal the share of ATX - the chain closes, because ratios along one ladder multiply.' },
      { label: 'Price the surrendered land', formula: '74{,}420 - 59{,}536 = 14{,}884; \\quad 59{,}536 - 28{,}900 = 30{,}636; \\quad 74{,}420 - 28{,}900 = 45{,}520', explanation: 'The compact hop gives up 14,884 mm2, the small hop a further 30,636 mm2, and the two compose to the full 45,520 mm2 - exactly what the smallest district saves on full-district land.' },
    ], result: 'Mini-ITX is $0.388336$ of ATX and $0.485421$ of microATX; the chain composes through the exact $0.800000$; and the land surrendered is $14{,}884$, then $30{,}636$, then $45{,}520$ mm2 in total.' },
    { kind: 'example', title: 'Illustration 3. How many small districts fit on the big land: the stacking count.', steps: [
      'Take the two areas: ATX\u2019s $74{,}420$ mm2 against Mini-ITX\u2019s $28{,}900$ mm2.',
      'Divide: $74{,}420 / 28{,}900 = 2.575087$ - two whole Mini-ITX boards and 0.575087 of a third.',
      'Check the remainder in land: $74{,}420 - 2 \\times 28{,}900 = 16{,}620$ mm2, and $16{,}620 / 28{,}900 = 0.575087$ - the two routes agree.',
      'So the same arithmetic against the compact district: $59{,}536 / 28{,}900 = 2.060069$ - just over two small boards on microATX land.',
      'Hence ATX land holds 2.575087 Mini-ITX districts and microATX land holds 2.060069 of them - the stacking counts, honestly not whole.',
    ] },
    { kind: 'derivation', title: 'The stacking count and its remainder', statement: 'On land of area $L$, how many complete districts of area $S$ fit, and how much land is left over? Run the division and check it two ways.', steps: [
      { label: 'Write the division', formula: 'n = \\frac{L}{S}', explanation: 'The count of small districts the big land holds is the land ratio - whole districts are its integer part.' },
      { label: 'Run it on ATX land', formula: '\\frac{74{,}420}{28{,}900} = 2.575087', explanation: 'Two complete Mini-ITX districts fit, and 0.575087 of a third would follow.' },
      { label: 'Price the remainder in land', formula: '74{,}420 - 2 \\times 28{,}900 = 16{,}620\\ \\text{mm}^2', explanation: 'After placing the two whole districts, 16,620 mm2 remains - and dividing back, 16,620/28,900 = 0.575087 of another district.' },
      { label: 'Check on the compact land', formula: '\\frac{59{,}536}{28{,}900} = 2.060069', explanation: 'microATX land holds two whole small districts with 30,636 mm2 left over - barely room for the second, none for a third.' },
    ], result: 'ATX land holds $2$ whole Mini-ITX districts plus $0.575087$ of a third ($16{,}620$ mm2 left); microATX land holds $2$ with $30{,}636$ mm2 left.' },
    { kind: 'para', text: 'Notice, reading the ladder figure, what the one scale buys: because every rectangle is drawn at the same pixels-per-millimetre, the AREAS on the page are the areas in fact, and the eye can do the ratios before the arithmetic does. The microATX square visibly carves four fifths out of the ATX rectangle\u2019s face; the Mini-ITX square sits inside even the microATX one with room to spare. This is the figure to redraw from memory in an examination corridor: three rectangles, one scale, the dates on the left and the shares on the right - 74,420, 59,536, 28,900 mm2, and the exact eighty between the top two.' },
    { kind: 'example', title: 'Illustration 4. The ghost-box fit: a whole Mini-ITX inside the ATX outline.', steps: [
      'Place the Mini-ITX square in the corner of the ATX outline, as the city-plan figure draws it.',
      'So the spare length is $305 - 170 = 135$ mm, and the spare depth is $244 - 170 = 74$ mm.',
      'Check the land left over: $74{,}420 - 28{,}900 = 45{,}520$ mm2, which is $1 - 0.388336469 = 0.611663531$ of the ATX face - about 61.17 percent still free.',
      'Now read the picture\u2019s lesson: the ghost box\u2019s 357 x 357 px outline (at the figure\u2019s 2.1 px per mm) is a WHOLE working district, and it does not even fill half the land.',
      'Hence a Mini-ITX city rides on ATX land leaving 45,520 mm2 - 135 mm by 74 mm of breathing room around a complete computer.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the stacking law for districts', text: 'If a small district of area $S$ is laid on large-district land of area $L$, the number of complete small districts the land holds is $\\lfloor L/S \\rfloor$ with a remainder of $(L - \\lfloor L/S \\rfloor \\cdot S)/S$ of another. On this chapter\u2019s numbers: ATX land holds $\\lfloor 74{,}420 / 28{,}900 \\rfloor = 2$ whole Mini-ITX districts with $16{,}620 / 28{,}900 = 0.575087$ of a third; microATX land holds $2$ with $30{,}636 / 28{,}900 = 1.060069$ of a third, i.e. barely room for the second. The law is pure arithmetic - areas divide - but it is the arithmetic that answers the shop-floor question \u201chow many small boards is this big board worth?\u201d.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the contract is the shape, not the capability', text: 'The seductive error is reading the area ladder as a power ladder: small board, small computer. False. A Mini-ITX board and an ATX board CARRY the same city - processor, memory, storage, network - on different amounts of land. The form factor fixes the outline, the mounting holes and the I/O layout; it fixes nothing about what may be built inside the outline. The honest trade is EXPANDABILITY and cooling room against desk space: the ATX district has more plots (more expansion slots, roomier power delivery); the Mini-ITX district spends its 45,520 mm2 savings on smallness itself. When an exam asks what a form factor determines, answer size and mounting and I/O layout - never speed.' },
    { kind: 'callout', tone: 'insight', title: 'Note — why the exact eighty earns a six-place print', text: 'Most engineering ratios come out ugly, and this chapter prints them honestly to six places. That microATX lands on 0.800000 EXACTLY is a gift of the numbers, and gifts get exploited: it means the ATX and microATX contracts are in a clean 5:4 land ratio, that the reciprocal 1.25 is exact, and that every Mini-ITX ratio can be cross-checked through the chain $0.485421 \\times 0.800000 = 0.388336$. In an examination, \u201cexactly 80%\u201d is a phrase you may defend to the last digit - this lesson\u2019s engine does.' },
    { kind: 'terms', items: [
      { term: 'form factor', def: 'the published contract fixing a board\u2019s size, mounting holes and I/O layout so boards, cases and supplies interoperate.' },
      { term: 'ATX', def: 'the full district: Intel, 1995, 305 x 244 mm = 74,420 mm2 of land.' },
      { term: 'microATX', def: 'the compact district: 1996, at most 244 mm square = 59,536 mm2 - exactly 0.800000 of ATX.' },
      { term: 'Mini-ITX', def: 'the small district: VIA Technologies, 2001, 170 x 170 mm = 28,900 mm2 - 0.388336 of ATX.' },
      { term: 'mounting holes', def: 'the surveyed screw positions a form factor fixes, so any matching case receives the board.' },
      { term: 'I/O panel layout', def: 'the rear window\u2019s arrangement of connectors - the third clause of the form-factor contract.' },
    ] },

    // ================================================================
    // 4. THE PLOTS — THE COMPONENT CENSUS
    // ================================================================
    { kind: 'heading', text: 'The Plots: a Census of the Board\u2019s Landmarks' },
    { kind: 'para', text: 'The districts are zoned; now walk the streets. Every board, whatever its form factor, reserves the same kinds of plots, and the city-plan figure below labels them all on one ATX-style board drawn to scale. Count them the way a surveyor would, plot by plot: one socket for the processor, four slots for memory, three slots for expansion, one chipset, one firmware chip, one coin cell and one VRM bank - twelve plots in the drawing, each with a fixed job. The census is worth taking once in prose and once in a table, because \u201cwhat does the motherboard carry?\u201d is the most-asked question in the whole of computer awareness, and the honest answer is a LIST, not a sentence.' },
    { kind: 'figure', caption: 'The city plan: an ATX-style board drawn to scale at 2.1 px per mm, every plot labelled. Centre-top the CPU socket (a zero-insertion-force grid); left of it the VRM bank with the 8-pin CPU feed above; right of it four DIMM slots of 288 pins each; along the bottom three PCIe expansion slots; between them the chipset, the firmware chip, the CR2032 3 V coin cell and the 24-pin ATX main connector; the I/O panel hugs the rear edge. The dashed ghost box is a whole 170 x 170 mm Mini-ITX district overlaid at the same scale - the small board\u2019s entire city fits in the ATX board\u2019s top-left corner, leaving 45,520 mm2 of its land untouched.', svg: cf41CitySvg() },
    { kind: 'para', text: 'First plot: the CPU SOCKET, the surveyed square at the city\u2019s centre where the processor stands. It is a ZERO-INSERTION-FORCE grid - ZIF in every catalogue - meaning the chip drops in with no pressure at all and a small lever or latch locks it down afterwards; the force that would otherwise be needed to push hundreds of contacts together would bend the board. The socket families get one honest line each: LGA (land grid array) puts the contact LANDS on the board and flat pads on the chip\u2019s underside; PGA (pin grid array) puts the PINS on the chip and holes in the socket. The exam-safe sentence: LGA lands on the board, PGA pins on the chip. What the socket does NOT do is think - the part that thinks is the next lesson\u2019s whole subject (4.2), and this lesson only surveys its plot.' },
    { kind: 'para', text: 'Second plot family: the DIMM SLOTS, the long thin plots beside the socket where memory plugs in. DIMM stands for dual in-line memory module, and the module is a small board of its own carrying the memory chips - a guest district that rides in a reserved plot. The number to defend: a desktop DIMM today carries 288 PINS - 144 contacts per face, two faces, $2 \\times 144 = 288$. The pins are the module\u2019s road connections: every one of them is a lane the board must wire to the memory controller. The counting exercise is worth one Illustration below (four slots at 288 pins each), and the deep story - what the memory chips ARE, how they are made, why they answer in nanoseconds - is lesson 4.3\u2019s ground, not this one\u2019s.' },
    { kind: 'para', text: 'Third plot family: the PCIe EXPANSION SLOTS, the removable-district rule of the whole city plan. PCIe (peripheral component interconnect express) slots are the long plots along the board\u2019s bottom edge where complete districts ride in as guests: a graphics card, a storage add-in card, a network card - each a finished circuit board that plugs in and becomes part of the machine. This is the August 1981 board\u2019s inheritance working as designed: reserved plots, published contract, interchangeable parts. The slot\u2019s own arithmetic - lanes, gigatransfers, bytes per second - is lesson 4.4\u2019s subject, and this lesson deliberately prices none of it; the plots are surveyed here, the roads are priced later.' },
    { kind: 'para', text: 'Fourth plot: the CHIPSET, the board\u2019s town hall. One or two chips that manage the interconnect: traffic between the processor and everything that is not memory-fast flows through them. The honest dated line the modern course must carry: boards were long organised as a PAIR - the northbridge, handling the fast traffic beside the processor, and the southbridge, handling the slower ports and peripherals - and that pair has largely dissolved, because Intel folded the memory controller into the processor itself with the Nehalem architecture in 2008. The consequence is visible on any modern board: the plots for memory now wire (via the socket) straight into the processor\u2019s own silicon, and what remains of the town hall is the interconnect management for the slower districts. The theory of interconnect - queues, arbitration, protocols - belongs to \u201cComputer Organization and Architecture\u201d; the name and the job belong here.' },
    { kind: 'para', text: 'Fifth plot: the FIRMWARE CHIP, the small square that holds the machine\u2019s first waking speech. Press the power button and the processor knows nothing - no operating system, no programs, not even where to find them - so its first instructions are read from this chip: the BIOS or UEFI, the code that wakes the city, counts its plots, finds the boot device and hands the machine over. The chip is ROM\u2019s modern home (flash - written rarely, read every waking, kept without power), and its full story is told later on the shelf; here it is a plot with a one-line job: the machine\u2019s first speech lives on the board.' },
    { kind: 'para', text: 'Sixth plot, and the one every teardown photograph circulates: the CMOS CELL - a CR2032 lithium coin cell, 3 V, about 20 mm across and 3.2 mm thick (the name itself is a size code: 20 mm diameter, 3.2 mm thickness, the 32 meaning 32 tenths of a millimetre). Its job: keep the real-time clock ticking and the settings alive while the machine sleeps or is unplugged. The coin\u2019s face is about $\\pi \\times 10^2 \\approx 314$ mm2 - roughly one percent of even a Mini-ITX district\u2019s land - and it holds that thin pulse of power for years. When a desktop forgets the date every time it is unplugged, the honest first suspicion is this coin: the cheapest part on the board doing one of the few jobs that must never stop.' },
    { kind: 'para', text: 'Seventh plot: the VRM - the voltage regulator module, the board\u2019s power plant. The supply arrives at the board\u2019s edge as the 24-pin ATX main connector\u2019s several voltages, but the processor eats a far lower, precisely held voltage, and the VRM bank - those rows of small chokes and MOSFETs packed beside the socket - steps the supply DOWN to what the processor eats, holding it steady as the load swings billions of times a second. That is the whole of this lesson\u2019s claim on it: the VRM is the power plant, surveyed as a plot. Its electrical engineering - buck converters, duty cycles, transient response - is another shelf\u2019s subject; the name and the job are this lesson\u2019s to carry.' },
    { kind: 'table', caption: 'The plot census: seven plot families, each with its one honest line and its witness number. The full drawing counts twelve plots (four DIMM slots and three PCIe slots make up the difference).', head: ['The plot', 'The job in one line', 'The witness number'], rows: [
      ['CPU socket', 'the surveyed grid where the processor stands - zero insertion force', 'LGA: lands on the board; PGA: pins on the chip'],
      ['DIMM slots', 'the plots where memory modules ride in', '288 pins per desktop DIMM (2 x 144)'],
      ['PCIe slots', 'the removable-district rule - expansion cards ride in', 'graphics, storage, network cards'],
      ['Chipset', 'the town hall: interconnect manager for the slower districts', 'northbridge/southbridge gave way from Nehalem, 2008'],
      ['Firmware chip', 'the machine\u2019s first waking speech (BIOS/UEFI)', 'ROM\u2019s modern home: flash, kept without power'],
      ['CMOS cell', 'keeps the clock and settings alive while the machine sleeps', 'CR2032, 3 V, 20 mm across, 3.2 mm thick'],
      ['VRM bank', 'the power plant stepping the supply down for the processor', 'fed by the 24-pin main + 8-pin CPU leads'],
    ] },
    { kind: 'para', text: 'One habit of reading is worth forming here, because two of the plot families break the pattern of components SOLDERED to the board: the DIMM slots and the PCIe slots are plots for GUESTS - complete circuit boards of their own that ride in and out. A memory module is a small printed board carrying memory chips; a graphics card is a large printed board carrying a processor of its own, memory of its own and a cooling system besides. The city plan treats them exactly as a city treats a tenant: the plot is permanent and its contract is published, the tenant is replaceable and may be upgraded without re-surveying a single road. That is the whole expandability story of the personal computer in one sentence - plots outlive tenants.' },
    { kind: 'example', title: 'Illustration 5. The plot census, counted on the drawn board.', steps: [
      'Take the city-plan figure\u2019s plots one family at a time: 1 socket, 4 DIMM slots, 3 PCIe slots, 1 chipset, 1 firmware chip, 1 coin cell, 1 VRM bank.',
      'So the census is $1 + 4 + 3 + 1 + 1 + 1 + 1 = 12$ plots on the drawn ATX-style board.',
      'Check the arithmetic against the figure: the four DIMM rectangles and three PCIe rectangles account for the difference between 7 families and 12 plots.',
      'Hence the board carries twelve surveyed plots in seven families - and every one of them is named in the table above.',
    ] },
    { kind: 'example', title: 'Illustration 6. The memory plots, wired: how many pins four DIMM slots commit the board to.', steps: [
      'Take the DIMM census: 288 pins per module, 144 contacts on each of two faces.',
      'So one slot wires 288 pins; two slots wire $2 \\times 288 = 576$.',
      'Now the full bank on the drawn board: $4 \\times 288 = 1{,}152$ pins for memory alone.',
      'Check the scale of the commitment: 1,152 pins is more than the two power leads and every other connector on the board combined - memory is the city\u2019s widest front door.',
      'Hence four DIMM slots commit the board to 1,152 memory pins - the plot census priced in copper.',
    ] },
    { kind: 'algorithm', title: 'Reading any board like a surveyor', lines: [
      { code: 'ground the box: power off, unplugged, case open', note: 'the city is best read with the power plant cold' },
      { code: 'find the rear I/O panel edge', note: 'the connector window orients the whole plan - everything else is read from it' },
      { code: 'locate the CPU socket (centre, biggest single plot)', note: 'the ZIF grid with its lever; the city\u2019s centre of gravity' },
      { code: 'count the DIMM slots beside it', note: 'four on the drawn board; each is a 288-pin plot for memory' },
      { code: 'follow the 24-pin edge connector', note: 'the main power lead\u2019s landing - then find the VRM bank beside the socket' },
      { code: 'find the coin cell', note: 'the CR2032 3 V lithium coin, about 20 mm across - the clock\u2019s own heartbeat' },
      { code: 'name the chipset', note: 'the town-hall chip(s) between the plots - interconnect manager for the slower districts' },
      { code: 'read the PCIe slots along the bottom', note: 'the removable districts: graphics, storage, network ride in here' },
    ], note: 'The walk takes a minute and names every plot family on almost any board in the field - desktop, or the compact districts with fewer plots each.' },
    { kind: 'terms', items: [
      { term: 'CPU socket', def: 'the zero-insertion-force grid where the processor stands; LGA puts lands on the board, PGA puts pins on the chip.' },
      { term: 'DIMM slot', def: 'the plot where a dual in-line memory module rides in - 288 pins on a desktop DIMM today.' },
      { term: 'PCIe slot', def: 'the expansion plot where complete districts (graphics, storage, network cards) plug in and become part of the machine.' },
      { term: 'chipset', def: 'the board\u2019s town hall - the interconnect manager for traffic between the processor and the slower districts.' },
      { term: 'northbridge and southbridge', def: 'the old two-chip town hall - fast traffic and slow traffic - largely dissolved since the memory controller moved into the processor (Nehalem, 2008).' },
      { term: 'firmware chip', def: 'the flash chip holding BIOS or UEFI - the machine\u2019s first waking speech, kept without power.' },
      { term: 'CMOS cell', def: 'the CR2032 3 V lithium coin keeping the real-time clock and settings alive while the machine sleeps.' },
      { term: 'VRM', def: 'the voltage regulator module - the board\u2019s power plant, stepping the supply down to what the processor eats.' },
    ] },

    // ================================================================
    // 5. POWER AND THE PULSE
    // ================================================================
    { kind: 'heading', text: 'Power and the Pulse' },
    { kind: 'para', text: 'The utilities row of the metaphor has two entries, and both are one-line honest claims in this lesson. POWER first: the board is fed by exactly the two leads the figure draws. The 24-PIN ATX MAIN connector is the wide edge connector that feeds the city at large - every district except the processor\u2019s own table. The 8-PIN CPU FEED is the second, narrower lead that lands by the socket and exists because the processor is the city\u2019s hungriest single citizen and gets its own power lane. Count the pins and the census closes: $24 + 8 = 32$ pins in the two leads, a 3:1 split by count. Both leads land at the VRM bank\u2019s doorstep, and the power plant serves from there.' },
    { kind: 'para', text: 'The PULSE second: the SYSTEM CLOCK, the board\u2019s metronome. Somewhere on the board a crystal vibrates at a fixed frequency, and that beat is divided and distributed until every district of the city steps to the same rhythm - this is the deepest sense in which the board is one city and not a bag of parts: one heartbeat, fanned out along dedicated clock traces to every plot that synchronises. A whole city running on ONE metronome. And here this lesson stops, honestly: the price of a beat - what a hertz is, what gigahertz mean, why 4.2 measures the metronome before it measures anything else - is the very opening of lesson 4.2, and this lesson will not pre-empt its neighbour\u2019s ground.' },
    { kind: 'figure', caption: 'The power-and-pulse strip. Top: the supply feeds the board through two leads - the 24-pin ATX main connector and the 8-pin CPU feed, 32 pins between them - and both land at the VRM bank, which steps the supply down before the socket sees it. Bottom: the system clock as one metronome whose dashed beat lines fan out to the socket, the DIMM slots, the PCIe slots and the chipset - the whole city steps to one beat, priced in lesson 4.2.', svg: cf41PowerSvg() },
    { kind: 'example', title: 'Illustration 7. The utilities census: the coin, the leads and their pins, priced together.', steps: [
      'Take the power pair: the 24-pin main lead and the 8-pin CPU feed.',
      'So the pin census is $24 + 8 = 32$ pins, and the split is $24 = 3 \\times 8$ - three pins of city power for every one of processor power.',
      'Now the coin: a CR2032 at 3 V, 20 mm across and 3.2 mm thick - the name is its own size code.',
      'Check the coin\u2019s face: $\\pi \\times 10^2 = 314.159 \\ldots \\approx 314$ mm2 - about 1.09 percent of even a Mini-ITX district\u2019s 28,900 mm2 face.',
      'Hence the utilities census: 32 pins of incoming power, one 3 V coin about 314 mm2 across, and one metronome - the whole utility row of the city plan.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note — one board, one beat', text: 'The clock is the quiet argument for the whole lesson. Components that share no synchronisation are a bag of parts; components stepped by one distributed heartbeat are a machine. When lesson 4.2 prices the beat in hertz and lesson 4.4 prices the roads in bytes per second, both will be pricing consequences of the arrangement you surveyed here: plots placed by a contract, roads printed in the ground, and one pulse delivered to every door. The motherboard is not the most glamorous component in the box - it is the reason the box is ONE computer rather than several.' },

    // ================================================================
    // 6. DOORSTEPS AND THE EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'The Doorsteps: Where This Lesson Hands Over' },
    { kind: 'para', text: 'The survey is complete - ground, roads, plots, utilities, districts - and every door out of it has been named as it passed. The processor\u2019s own insides are lesson 4.2, which opens by pricing the metronome this lesson refused to price. The memory cloths and the storage ladder are lesson 4.3, which explains what rides in the 288-pin DIMM plots and what waits below them. The roads themselves - buses and ports, their widths in lanes and their speeds in bytes per second - are lesson 4.4, which turns the traces this lesson surveyed into arithmetic. And behind the whole chapter stand the doorstep books: \u201cComputer Organization and Architecture\u201d owns the full theory of interconnection and the formal model of the machine; \u201cOperating Systems\u201d owns what happens to the city after the firmware hands it over; and \u201cDigital Logic Design\u201d owns the gate-level view from which the traces\u2019 signals are actually built. This chapter names components; it does not theorise them.' },
    { kind: 'example', title: 'Illustration 8. The district calendar, checked: the years behind the contracts.', steps: [
      'Take the three contract years in order: ATX 1995, microATX 1996, Mini-ITX 2001.',
      'So the gaps are $1996 - 1995 = 1$ year (the compact district followed at once) and $2001 - 1996 = 5$ years (the small district waited longer) - and $1 + 5 = 6$ years from ATX to Mini-ITX, as $2001 - 1995$ confirms.',
      'Now the two historical anchors: the planar board shipped August 1981, and Nehalem folded the memory controller into the processor in 2008 - $2008 - 1981 = 27$ years apart.',
      'Check the chapter\u2019s own vantage: $2026 - 1981 = 45$ years from the planar board to this lesson, $2026 - 1995 = 31$ from ATX, $2026 - 2001 = 25$ from Mini-ITX.',
      'Hence the calendar reads: 1981 the planar board, 1995 ATX, 1996 microATX, 2001 Mini-ITX, 2008 Nehalem - five dates that turn the board\u2019s story into a timeline you can defend.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — how this lesson is actually asked', text: 'Banking and SSC computer-awareness papers ask this lesson\u2019s ground as straight recall: \u201cWhat does the motherboard carry?\u201d (processor, memory, chipset, expansion slots, interconnected by printed copper traces - answer as a list); \u201cATX was published by whom, in which year, at what size?\u201d (Intel, 1995, 305 x 244 mm); \u201cMini-ITX: origin and size?\u201d (VIA Technologies, 2001, 170 x 170 mm); \u201cWhat is a form factor?\u201d (the standard fixing size, mounting holes and I/O layout - shape, not speed); \u201cThe purpose of the CMOS cell?\u201d (the CR2032 3 V lithium coin keeps the clock and settings alive while power is off); \u201cThe chipset\u2019s role?\u201d (the interconnect manager - town hall). School boards add diagram labelling: match socket, DIMM slots, PCIe slots, chipset and coin cell to a board drawing. Cambridge 9618-style papers go one step further in honest exam-style wording: \u201cExplain why a form factor is described as a contract\u201d, or \u201cA microATX board is said to be 80% of the area of an ATX board - verify this claim\u201d (which is this lesson\u2019s $59{,}536 / 74{,}420 = 0.800000$). None of these asks anything this lesson has not priced; the one discipline worth keeping is the hedge - the layer count \u201ccommonly 6 to 10\u201d is prose honesty, not a pinned constant.' },
    { kind: 'para', text: 'Close the box again and take stock of what changed. The motherboard was a green slab; it is now a surveyed city: districts zoned by three named contracts (74,420, 59,536 and 28,900 mm2 of land, in the exact 0.800000 and honest 0.388336 / 0.485421 ratios), plots reserved for seven families of citizens (the ZIF socket, the 288-pin DIMM slots, the PCIe removable districts, the chipset town hall, the firmware\u2019s first speech, the CR2032\u2019s unbroken pulse, the VRM\u2019s power plant), roads printed in tenths of a millimetre through stacks commonly 6 to 10 layers deep with vias as flyovers, and utilities arriving as 32 pins across two leads. Nothing in that list thinks. Everything in that list is why the thinkers can work. The next lesson opens the machine\u2019s single most celebrated plot - the socket\u2019s resident - and prices its beat.' },

    // ================================================================
    // 7. REVISION CARDS
    // ================================================================
    { kind: 'formula', name: 'District area', latex: 'A = l \\times w', note: 'the surveyor\u2019s first tool: ATX 305 x 244 = 74,420 mm2.' },
    { kind: 'formula', name: 'Land share', latex: 'r = \\frac{A_{\\text{small}}}{A_{\\text{large}}}', note: 'the honest ratio between districts - never a claim about speed.' },
    { kind: 'formula', name: 'The exact eighty', latex: '\\frac{59{,}536}{74{,}420} = 0.800000', note: 'microATX is exactly 80.0% of ATX; the reciprocal 74,420/59,536 = 1.25 is exact too.' },
    { kind: 'formula', name: 'The small district\u2019s shares', latex: '\\frac{28{,}900}{74{,}420} = 0.388336; \\quad \\frac{28{,}900}{59{,}536} = 0.485421', note: 'Mini-ITX against ATX and against microATX - and 0.485421 x 0.800000 = 0.388336.' },
    { kind: 'formula', name: 'The stacking count', latex: 'n = \\frac{A_{\\text{large}}}{A_{\\text{small}}}', note: 'ATX land holds 74,420/28,900 = 2.575087 Mini-ITX districts.' },
    { kind: 'formula', name: 'The power census', latex: '24 + 8 = 32', note: 'the 24-pin ATX main lead plus the 8-pin CPU feed: 32 pins across two leads.' },
    { kind: 'formula', name: 'The DIMM census', latex: '4 \\times 288 = 1{,}152', note: 'four slots at 288 pins (2 x 144 per face) - the widest front door on the board.' },

    // ================================================================
    // 8. CHECKPOINT QUIZ
    // ================================================================
    { kind: 'quiz', title: 'Checkpoint quiz', items: [
      {
        q: 'Which sentence best defines the motherboard?',
        options: [
          'the chip that carries out the machine\u2019s arithmetic and control',
          'the case that holds the drives and the power supply',
          'the main printed circuit board, carrying the processor, memory, chipset and expansion slots, and interconnecting them with printed copper traces',
          'the wires that carry power from the wall to the machine',
        ],
        answer: 2,
        explain: 'Option C is the definition this lesson boxed: the motherboard is the main PCB, and its two verbs are CARRIES (the four great families) and INTERCONNECTS (by printed copper traces). Option A fails because it describes the processor, which is one citizen riding on a plot, not the ground. Option B fails because it describes the case - the box this chapter opened to find the board inside it. Option D fails because it describes the power leads, which are utilities arriving at the board, not the board itself.',
      },
      {
        q: 'A microATX board (at its maximum size) is what share of a full ATX board\u2019s area?',
        options: [
          'exactly 80.0 percent - 59,536 / 74,420 = 0.800000 on the nose',
          'about 38.8336 percent - the Mini-ITX share of ATX',
          'about 48.5421 percent - the Mini-ITX share of microATX',
          'exactly 125 percent - the ATX share of microATX',
        ],
        answer: 0,
        explain: 'Option A is the exact eighty: 244 x 244 = 59,536 mm2 against 305 x 244 = 74,420 mm2, and the division terminates at 0.800000. Option B fails because 38.8336 percent is Mini-ITX\u2019s share of ATX (28,900/74,420 = 0.388336), one district further down the ladder. Option C fails because 48.5421 percent is Mini-ITX\u2019s share of microATX (28,900/59,536 = 0.485421) - the wrong pair of districts. Option D fails because 125 percent is the ratio the other way round - ATX is 1.25 times microATX, so microATX cannot be 125 percent of ATX.',
      },
      {
        q: 'Where did the Mini-ITX form factor come from, and at what size?',
        options: [
          'Intel published it in 1995 alongside ATX itself',
          'Intel published it in 1996, one year after ATX',
          'IBM shipped it in August 1981 as the planar board',
          'VIA Technologies published it in 2001, as a 170 x 170 mm district',
        ],
        answer: 3,
        explain: 'Option D is the record: VIA Technologies, 2001, a square 170 x 170 mm - 28,900 mm2 of land. Option A fails because 1995 is ATX\u2019s year and Intel\u2019s name, the full 305 x 244 mm district. Option B fails because 1996 is microATX\u2019s year - the compact district, at most 244 mm square. Option C fails because August 1981 is the IBM PC\u2019s planar board, the ancestor of the whole arrangement, not a small modern district.',
      },
      {
        q: 'What is the job of the CR2032 cell on the board?',
        options: [
          'it runs the processor when the wall power fails',
          'a CR2032 3 V lithium coin cell, it keeps the real-time clock and the settings alive while the machine sleeps or is unplugged',
          'it stores the operating system permanently',
          'it steps the supply\u2019s voltage down to what the processor eats',
        ],
        answer: 1,
        explain: 'Option B is the coin\u2019s one job: 3 volts, held for years, keeping the clock ticking and the settings alive through power-off. Option A fails because the coin cannot run the processor - its pulse is a trickle, not a meal, and it dies in moments under any real load. Option C fails because the operating system lives on the storage shelf (lesson 4.3\u2019s ground); permanent storage is not a coin\u2019s job. Option D fails because stepping the supply down is the VRM bank\u2019s job - the power plant, not the coin.',
      },
      {
        q: 'What is the chipset\u2019s role on the board?',
        options: [
          'it performs the arithmetic of running programs',
          'it holds the machine\u2019s working memory',
          'it speaks the machine\u2019s first waking words at power-on',
          'the chipset - the board\u2019s town hall - manages the interconnect, routing traffic between the processor and the slower districts',
        ],
        answer: 3,
        explain: 'Option D is the town hall\u2019s job: interconnect management, with the old northbridge/southbridge pair largely dissolved since the memory controller moved into the processor (Nehalem, 2008). Option A fails because arithmetic is the processor\u2019s work - the chipset routes traffic, it does not compute answers. Option B fails because working memory lives in the DIMM plots - 288-pin modules that wire to the memory controller, not to the chipset\u2019s storage. Option C fails because the first waking speech is the firmware chip\u2019s (BIOS/UEFI) - the town hall manages roads, it does not wake the city.',
      },
    ] },

    // ================================================================
    // 9. GRADED EXERCISES
    // ================================================================
    { kind: 'exercises', title: 'Graded exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'Define the motherboard formally, and list the four great families it carries.',
            answer: 'Hence the motherboard is the main printed circuit board, carrying the processor, memory, chipset and expansion slots, and interconnecting them with printed copper traces',
            solution: [
              'Split the question: it asks for the definition first, then the census.',
              'The definition: the motherboard is the main printed circuit board of a computer, carrying its components and interconnecting them with printed copper traces.',
              'The census, family by family: the processor, the memory, the chipset, the expansion slots.',
              'Hence the motherboard is the main printed circuit board, carrying the processor, memory, chipset and expansion slots, and interconnecting them with printed copper traces.',
            ]
          },
          {
            q: 'What is a form factor? Name the three this lesson carries, each with its year, its keeper and its size.',
            answer: 'Hence a form factor is the contract fixing size, mounting holes and I/O layout - ATX (Intel, 1995, 305 x 244 mm), microATX (1996, at most 244 mm square), Mini-ITX (VIA Technologies, 2001, 170 x 170 mm)',
            solution: [
              'Take the definition: a form factor is a published standard fixing a board\u2019s size, its mounting-hole positions and its I/O panel layout, so parts built to the same contract fit.',
              'The full district: ATX, published by Intel in 1995, at 305 x 244 mm.',
              'The compact district: microATX, 1996, at most 244 mm square.',
              'The small district: Mini-ITX, VIA Technologies, 2001, at 170 x 170 mm.',
              'Hence a form factor is the contract fixing size, mounting holes and I/O layout - ATX (Intel, 1995, 305 x 244 mm), microATX (1996, at most 244 mm square), Mini-ITX (VIA Technologies, 2001, 170 x 170 mm).',
            ]
          },
          {
            q: 'Study the mini city plan and name each labelled plot with its one-line job.',
            answer: 'Hence the six plots are the socket, the DIMM slots (288 pins each), the PCIe slots, the chipset, the CR2032 coin and the 24-pin main lead',
            solution: [
              'Read the picture left to right: the square top-centre is the CPU socket - the zero-insertion-force grid where the processor stands.',
              'The thin vertical rectangles beside it are the DIMM slots - memory rides in, 288 pins per desktop module.',
              'The long thin rectangles along the bottom are the PCIe slots - expansion districts (graphics, storage, network) plug in.',
              'The square beside them is the chipset - the town hall managing the interconnect for the slower districts.',
              'The small circle is the CR2032 - the 3 V coin keeping the clock and settings alive; the edge block is the 24-pin ATX main power lead.',
              'Hence the six plots are the socket, the DIMM slots (288 pins each), the PCIe slots, the chipset, the CR2032 coin and the 24-pin main lead.',
            ],
            figures: [{ caption: 'The mini city plan with the six plot families labelled, drawn for this drill.', svg: cf41SolCropSvg() }],
          },
          {
            q: 'The CMOS cell: what is it physically, at what voltage does it sit, and what is its one job?',
            answer: 'Hence the CMOS cell is a CR2032 3 V lithium coin cell keeping the real-time clock and the settings alive while the machine sleeps',
            solution: [
              'Take the part: a CR2032 lithium coin cell - 20 mm across and 3.2 mm thick, the name being its own size code.',
              'The voltage: 3 V, held for years on one coin.',
              'The one job: keep the real-time clock ticking and the settings alive while the machine is off or unplugged.',
              'Hence the CMOS cell is a CR2032 3 V lithium coin cell keeping the real-time clock and the settings alive while the machine sleeps.',
            ]
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Compute all three district areas from their contract sides, and convert each to square centimetres.',
            answer: 'Hence the areas are 74,420, 59,536 and 28,900 mm2 - 744.2, 595.36 and 289 cm2',
            solution: [
              'Take the sides from the contracts: 305 x 244 mm, 244 x 244 mm, 170 x 170 mm.',
              'ATX: $305 \\times 244 = 74{,}420$ mm2, which is 744.2 cm2.',
              'microATX at its maximum: $244 \\times 244 = 59{,}536$ mm2, which is 595.36 cm2.',
              'Mini-ITX: $170 \\times 170 = 28{,}900$ mm2, which is 289 cm2.',
              'Hence the areas are 74,420, 59,536 and 28,900 mm2 - 744.2, 595.36 and 289 cm2.',
            ]
          },
          {
            q: 'Show that microATX is exactly 80.0 percent of ATX in land, state the reciprocal, and price the land the compact district surrenders.',
            answer: 'Hence microATX = 0.800000 of ATX exactly, ATX = 1.25 x microATX, and the compact hop surrenders 14,884 mm2',
            solution: [
              'Take the two areas: 59,536 mm2 against 74,420 mm2.',
              'Divide: $59{,}536 / 74{,}420 = 0.8$ exactly - 0.800000 to six places, 80.0 percent on the nose.',
              'The reciprocal: $74{,}420 / 59{,}536 = 1.25$ - the full district is 1.25 times the compact one, a clean 5:4 ratio.',
              'Price the surrender: $74{,}420 - 59{,}536 = 14{,}884$ mm2 of land given up.',
              'Hence microATX = 0.800000 of ATX exactly, ATX = 1.25 x microATX, and the compact hop surrenders 14,884 mm2.',
            ],
            figures: [{ caption: 'The area ladder as bars with widths true to area: full, exactly 0.800000 of full, and 0.388336 of full.', svg: cf41SolBarsSvg() }],
          },
          {
            q: 'Compute Mini-ITX\u2019s land share against ATX and against microATX (six places), and check that the two shares compose through the exact eighty.',
            answer: 'Hence the shares are 0.388336 of ATX and 0.485421 of microATX, and 0.485421 x 0.800000 = 0.388336',
            solution: [
              'Take the three areas: 28,900 against 74,420 and against 59,536 mm2.',
              'Against ATX: $28{,}900 / 74{,}420 = 0.388336$ (the engine holds 0.388336469) - 38.8336 percent of the full district.',
              'Against microATX: $28{,}900 / 59{,}536 = 0.485421$ (engine: 0.485420586) - 48.5421 percent of the compact district.',
              'Check the chain: $0.485421 \\times 0.800000 = 0.388336$ - share of microATX times microATX\u2019s share of ATX lands on the share of ATX.',
              'Hence the shares are 0.388336 of ATX and 0.485421 of microATX, and 0.485421 x 0.800000 = 0.388336.',
            ]
          },
          {
            q: 'A Mini-ITX district sits in the corner of the ATX outline. How much length and depth stay spare, how much land stays free, and what share of the ATX face is that?',
            answer: 'Hence 135 mm of length and 74 mm of depth stay spare, 45,520 mm2 stays free - 0.611663531 of the ATX face',
            solution: [
              'Take the sides: the ATX outline is 305 x 244 mm; the ghost is 170 x 170 mm.',
              'Spare length: $305 - 170 = 135$ mm. Spare depth: $244 - 170 = 74$ mm.',
              'Free land: $74{,}420 - 28{,}900 = 45{,}520$ mm2.',
              'As a share: $1 - 0.388336469 = 0.611663531$ of the ATX face - about 61.17 percent still free.',
              'Hence 135 mm of length and 74 mm of depth stay spare, 45,520 mm2 stays free - 0.611663531 of the ATX face.',
            ],
            figures: [{ caption: 'The ghost box: the 170 x 170 mm Mini-ITX district inside the 305 x 244 mm ATX outline, with the spare land marked.', svg: cf41SolGhostSvg() }],
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'How many whole Mini-ITX districts fit on ATX land, and on microATX land? Give both stacking counts to six places and the leftover land in each case.',
            answer: 'Hence ATX land holds 2.575087 small districts (16,620 mm2 left) and microATX land holds 2.060069 (30,636 mm2 left)',
            solution: [
              'Take the areas: 74,420 and 59,536 mm2 of land against 28,900 mm2 per small district.',
              'On ATX land: $74{,}420 / 28{,}900 = 2.575087$ - two whole districts and 0.575087 of a third.',
              'The leftover: $74{,}420 - 2 \\times 28{,}900 = 16{,}620$ mm2, and $16{,}620 / 28{,}900 = 0.575087$ - the two routes agree.',
              'On microATX land: $59{,}536 / 28{,}900 = 2.060069$, with leftover $59{,}536 - 28{,}900 = 30{,}636$ mm2 once the second district is placed.',
              'Hence ATX land holds 2.575087 small districts (16,620 mm2 left) and microATX land holds 2.060069 (30,636 mm2 left).',
            ]
          },
          {
            q: 'A board carries four DIMM slots at 288 pins per module. Compute the memory pin census, split a DIMM\u2019s pins across its two faces, and set the census against the 32 power pins of the two leads.',
            answer: 'Hence four slots wire 1,152 memory pins - 144 per face per module - against the 32 power pins: a 36-times-wider front door',
            solution: [
              'Take the module census: 288 pins on a desktop DIMM, which is $2 \\times 144$ - 144 contacts on each of two faces.',
              'One slot wires 288 pins; two slots wire $2 \\times 288 = 576$.',
              'The full bank: $4 \\times 288 = 1{,}152$ pins for memory alone.',
              'Set it against power: the two leads carry $24 + 8 = 32$ pins, so the memory front door is $1{,}152 / 32 = 36$ times wider.',
              'Hence four slots wire 1,152 memory pins - 144 per face per module - against the 32 power pins: a 36-times-wider front door.',
            ]
          },
          {
            q: 'Trace the power path from the wall to the processor: name the two leads, count their pins, and state where both land before the socket sees anything.',
            answer: 'Hence the 24-pin main and the 8-pin CPU feed (32 pins together) both land at the VRM bank, which steps the supply down before the socket',
            solution: [
              'Take the two leads: the 24-pin ATX main connector feeding the city at large, and the 8-pin CPU feed landing by the socket.',
              'Count: $24 + 8 = 32$ pins, a 3:1 split by count ($24 = 3 \\times 8$).',
              'Follow the path: both leads land at the VRM bank - the rows of chokes and MOSFETs beside the socket.',
              'The VRM\u2019s job: step the supply DOWN to the low, precisely held voltage the processor eats, holding it steady as the load swings.',
              'Hence the 24-pin main and the 8-pin CPU feed (32 pins together) both land at the VRM bank, which steps the supply down before the socket.',
            ],
            figures: [{ caption: 'The power path drawn for this drill: supply, the two leads, the VRM bank, the socket.', svg: cf41SolPowerSvg() }],
          },
          {
            q: 'A signal must cross from an outer copper layer to an inner one. Explain what it travels through, how many layers a modern board commonly carries, and what gives the board its visible colour.',
            answer: 'Hence the signal travels through a via - a drilled, plated tube - across a stack commonly 6 to 10 layers, under a solder mask that gives the board its colour',
            solution: [
              'Take the structure: the board is a stack of copper layers inside fibreglass, commonly 6 to 10 of them, with the outer two carrying the component plots.',
              'The crossing: a VIA - a tiny drilled tube plated with copper - carries the road down through the stack like a flyover ramp between floors.',
              'The trace\u2019s route: run along one layer, dive down the via, finish on another - the picture\u2019s teal road does exactly this.',
              'The colour: the SOLDER MASK, the lacquer over the outer copper that keeps solder to the pads - green by tradition, but any colour by choice.',
              'Hence the signal travels through a via - a drilled, plated tube - across a stack commonly 6 to 10 layers, under a solder mask that gives the board its colour.',
            ],
            figures: [{ caption: 'The trace\u2019s route for this drill: along layer 1, down the via, along layer 4.', svg: cf41SolStackSvg() }],
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'Full survey, one sitting: from the contracts ATX 305 x 244 mm and Mini-ITX 170 x 170 mm, compute both areas, both shares (six places), the land the small district saves, and the stacking count on ATX land.',
            answer: 'Hence 74,420 and 28,900 mm2; shares 0.388336 and 0.485421; land saved 45,520 mm2; stacking count 2.575087',
            solution: [
              'Take the sides: 305 x 244 mm and 170 x 170 mm.',
              'The areas: $305 \\times 244 = 74{,}420$ mm2 and $170 \\times 170 = 28{,}900$ mm2.',
              'The shares: $28{,}900 / 74{,}420 = 0.388336$ of ATX, and against the compact district $28{,}900 / 59{,}536 = 0.485421$ of microATX.',
              'The saving: $74{,}420 - 28{,}900 = 45{,}520$ mm2 of land.',
              'The stacking count: $74{,}420 / 28{,}900 = 2.575087$ - two whole small districts and 0.575087 of a third.',
              'Hence 74,420 and 28,900 mm2; shares 0.388336 and 0.485421; land saved 45,520 mm2; stacking count 2.575087.',
            ]
          },
          {
            q: 'The district calendar, verified: show that the contract gaps are 1 year (ATX to microATX) and 5 years (microATX to Mini-ITX), that Nehalem (2008) lands 27 years after the planar board (August 1981), and give the chapter\u2019s vantage from each of the three anchors.',
            answer: 'Hence the gaps are 1 and 5 years, Nehalem lands 27 years after the planar board, and the vantages are 45, 31 and 25 years',
            solution: [
              'Take the contract years in order: 1995, 1996, 2001.',
              'The gaps: $1996 - 1995 = 1$ and $2001 - 1996 = 5$ - and they compose, since $1995 + 1 + 5 = 2001$.',
              'The historical pair: the planar board shipped August 1981 and Nehalem folded the memory controller inward in 2008, so $2008 - 1981 = 27$ years apart.',
              'The vantages from 2026: $2026 - 1981 = 45$ years from the planar board, $2026 - 1995 = 31$ from ATX, $2026 - 2001 = 25$ from Mini-ITX.',
              'Hence the gaps are 1 and 5 years, Nehalem lands 27 years after the planar board, and the vantages are 45, 31 and 25 years.',
            ]
          },
          {
            q: 'A vendor\u2019s listing says a microATX board is \u201cabout three-quarters the size of an ATX board\u201d. Verify or correct the claim with the exact arithmetic, and say what the honest listing should print.',
            answer: 'Hence the claim is corrected to exactly 0.800000 - 80.0 percent of ATX land, not about three-quarters',
            solution: [
              'Take the claim to the arithmetic: microATX at its maximum is $244 \\times 244 = 59{,}536$ mm2; ATX is $305 \\times 244 = 74{,}420$ mm2.',
              'Divide: $59{,}536 / 74{,}420 = 0.800000$ exactly - the division terminates; there is no \u201cabout\u201d in it at all.',
              'So the claim undersells the compact district: 80.0 percent of the land is more than three-quarters, and the honest number is exact.',
              'The honest listing: \u201cexactly 80.0% of ATX\u201d - and it may add the reciprocal, that ATX is 1.25 times microATX in land.',
              'Hence the claim is corrected to exactly 0.800000 - 80.0 percent of ATX land, not about three-quarters.',
            ]
          },
        ],
      },
    ] },
  ],
}
