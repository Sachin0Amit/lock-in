import type { Chapter, Lesson } from '../../../types'

/**
 * Computer Fundamentals — chapter 4 "Inside the Box" (CLOSED COMPLETE
 * by the CS RUN 8 swarm, 2026-11-26, under the whole-chapter cadence).
 * The honest shape across the two fires: RUN 7 shipped 4.3 'The First
 * Memory Hierarchy' (128/128), 4.4 'Buses and Ports: How the Pieces
 * Talk' (83/83) and the 4.R 'Unit 4 Completion Review' (84/84) whole
 * under the time-budget law; RUN 8 shipped the two deferred seats —
 * 4.1 'The Motherboard: the City Plan' (117/117) and 4.2 'The
 * Processor Named Honestly' (83/83) — and closed the census: five
 * lessons, plannedLessons empty, chapter COMPLETE.
 *
 * PROVENANCE: ground = the sanctioned internet fallback (the Drive
 * holds no Computer Fundamentals source — the standing honest note in
 * docs/research/CS_TOC_SURVEY.md): the 2026-11-25 web-verified pins
 * (ATX 1995; Mini-ITX VIA 2001; the 0.800000 microATX ratio; Nehalem
 * 2008; Dennard 1966/patent 3,387,286 1968; RAMAC 14 September 1956;
 * 4004 15 November 1971; Moore 19 April 1965; the May 2005 dual-core
 * month; USB/HDMI/SATA/PCIe censuses; the Dean latency ladder) banked
 * under citation key `cs-cf-web-ground-ch04`,
 * docs/project/SOURCE_LOG.md. STUDY-NEVER-REPRODUCE absolute: every
 * roster, witness, figure, Illustration, quiz item and exercise below
 * is OUR OWN, engine-pinned in scripts/verify-cs-book2-ch04.ts (which
 * re-runs the five verify-first harnesses against THIS file and closes
 * with the closed-chapter census).
 */
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
    { kind: 'image', src: '/figures/computer-fundamentals/cf-4-1-motherboard.webp', alt: 'Top-down view of a motherboard with processor socket, memory slots and capacitors.', caption: 'The ground the map is drawn on: a slab of fibreglass carrying the socket, the memory slots, the expansion slots and the chipset — the city plan read off the board itself.' },
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

/* part-cf42 — lesson 4.2 'The Processor Named Honestly'
   Computer Fundamentals, chapter 4 'Inside the Box'. Seat tag 42. */

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
    { kind: 'image', src: '/figures/computer-fundamentals/cf-4-2-processor.webp', alt: 'A single processor chip standing on a dark reflective surface.', caption: 'The component this lesson names honestly: a square of silicon and metal that neither thinks nor wills — it fetches, decodes, executes and writes back, billions of times each second, for as long as it has power.' },
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
    { kind: 'image', src: '/figures/computer-fundamentals/cf-4-3-hierarchy.webp', alt: 'A RAM module, a solid-state drive and a hard disk drive lying side by side.', caption: 'The wish paid in bundles: a fast pocket, a bigger shelf, a vast warehouse. No single technology is simultaneously fast, big and cheap — the ladder this lesson prices buys all three clauses at once.' },
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

/* part-cf44 — lesson 4.4 'Buses and Ports: How the Pieces Talk'
   Computer Fundamentals, chapter 4 'Inside the Box'. Seat tag 44. */

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
    { kind: 'image', src: '/figures/computer-fundamentals/cf-4-4-ports.webp', alt: 'Close-up of computer ports: USB sockets and a network jack.', caption: 'The port quarter on the edge of the city: sockets that promise the world outside the box a contract. Width, beats and tolls — the traffic law this lesson prices — begin at these openings.' },
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
      'So, the shared bus serves them strictly one at a time: A, then B, then c44.',
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

/* part-cf4R - lesson 4.R 'Unit 4 Completion Review' (the chapter-closing review).
   Harvest numbers carried VERBATIM from the four content seats (4.1-4.4);
   the review invents no numbers, it restates the chapter at bench speed.
   Helpers prefixed cf4R so the five chapter parts never collide. */

/* palette (vivid set; never blue/indigo) */
const c4R = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f4R = 'ui-sans-serif, system-ui, sans-serif'

function cf4RT(x: number, y: number, s: string, size = 11, fill = c4R.ink, anchor = 'middle', weight = 'normal'): string {
  return `<text x="${x}" y="${y}" font-family="${f4R}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
}
function cf4RBox(x: number, y: number, w: number, h: number, fill: string, stroke: string, rx = 7): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`
}
function cf4RArrowH(x1: number, x2: number, y: number, color: string): string {
  const d = x2 > x1 ? 1 : -1
  return `<line x1="${x1}" y1="${y}" x2="${x2 - 7 * d}" y2="${y}" stroke="${color}" stroke-width="2"/><polygon points="${x2},${y} ${x2 - 8 * d},${y - 4.5} ${x2 - 8 * d},${y + 4.5}" fill="${color}"/>`
}
function cf4RArrowV(x: number, y1: number, y2: number, color: string): string {
  const d = y2 > y1 ? 1 : -1
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2 - 7 * d}" stroke="${color}" stroke-width="2"/><polygon points="${x},${y2} ${x - 4.5},${y2 - 8 * d} ${x + 4.5},${y2 - 8 * d}" fill="${color}"/>`
}

/* F1 - the chapter in one map: the city-and-its-life pipeline */
function cf4RMapSvg(): string {
  const W = 760, H = 300
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The chapter in one map: the city and its life. Three boxes on a top rail - the board from 4.1 with its socket, slots, chipset and power; the processor from 4.2 with its cycle, clock, cores and cache pocket; the memory ladder from 4.3 running from registers down to the cloud under the FAST, BIG, CHEAP trade - while the roads of 4.4, the address, data and control buses with the PCIe lanes and the port wall, run as one strip beneath and feed all three by arrows.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(380, 24, 'THE CITY AND ITS LIFE - ONE PIPELINE, FOUR LESSONS', 13, c4R.ink, 'middle', 'bold'))
  s.push(cf4RBox(20, 44, 220, 88, c4R.panelA, c4R.struct))
  s.push(cf4RT(130, 66, 'THE BOARD - 4.1', 12.5, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(130, 84, 'the city plan', 10.5, c4R.tealInk))
  s.push(cf4RT(130, 100, 'socket, slots, chipset,', 10, c4R.ink))
  s.push(cf4RT(130, 114, 'power, the CR2032 heart', 10, c4R.ink))
  s.push(cf4RBox(270, 44, 220, 88, c4R.panelB, c4R.teal))
  s.push(cf4RT(380, 66, 'THE PROCESSOR - 4.2', 12.5, c4R.tealInk, 'middle', 'bold'))
  s.push(cf4RT(380, 84, 'the worker station', 10.5, c4R.tealInk))
  s.push(cf4RT(380, 100, 'cycle, clock, cores,', 10, c4R.ink))
  s.push(cf4RT(380, 114, 'the cache pocket', 10, c4R.ink))
  s.push(cf4RBox(520, 44, 220, 88, c4R.panelA, c4R.conn))
  s.push(cf4RT(630, 66, 'MEMORY LADDER - 4.3', 12.5, c4R.conn, 'middle', 'bold'))
  s.push(cf4RT(630, 84, 'the library system', 10.5, c4R.conn))
  s.push(cf4RT(630, 100, 'registers down to cloud,', 10, c4R.ink))
  s.push(cf4RT(630, 114, 'FAST-BIG-CHEAP', 10, c4R.ink))
  s.push(cf4RArrowH(242, 268, 88, c4R.mid))
  s.push(cf4RArrowH(492, 518, 88, c4R.mid))
  s.push(cf4RT(255, 78, 'hosts', 9.5, c4R.mid, 'middle'))
  s.push(cf4RT(505, 78, 'served by', 9.5, c4R.mid, 'middle'))
  s.push(cf4RBox(20, 200, 720, 66, c4R.white, c4R.accent))
  s.push(cf4RT(380, 226, 'THE ROADS - 4.4: BUSES AND PORTS', 12.5, c4R.accent, 'middle', 'bold'))
  s.push(cf4RT(380, 244, 'address bus asks WHERE - data bus carries WHAT - control bus times WHEN', 10, c4R.ink))
  s.push(cf4RT(380, 258, 'PCIe lanes to the graphics card - the port wall: USB, HDMI, SATA', 10, c4R.ink))
  s.push(cf4RArrowV(130, 196, 132, c4R.accent))
  s.push(cf4RArrowV(380, 196, 132, c4R.accent))
  s.push(cf4RArrowV(630, 196, 132, c4R.accent))
  s.push(cf4RT(380, 286, 'every component a CHOICE with a PRICE - the chapter\'s method throughout', 10, c4R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* F2 - the harvest banner strip: the four seats' headline numbers */
function cf4RBannerSvg(): string {
  const W = 760, H = 132
  const s: string[] = []
  const PW = 178, GAP = 8, X0 = 12, Y0 = 40, PH = 68
  const panels: [string, string, string][] = [
    ['THE BOARD - 4.1', '74,420 mm2', 'ATX footprint (305 x 244)'],
    ['THE CLOCK - 4.2', '6756.7568x', '5 GHz over the 4004'],
    ['THE LADDER - 4.3', '1,500x', 'RAM below L2'],
    ['THE ROAD - 4.4', '31.5077 GB/s', 'x16 lanes at gen4'],
  ]
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The harvest banner strip: the chapter's four headline numbers in four panels. The board panel carries 74,420 square millimetres, the ATX footprint. The clock panel carries 6756.7568 times, how much faster a 5 gigahertz clock beats than the 4004's 740 kilohertz. The ladder panel carries 1,500 times, how far RAM sits below L2. The road panel carries 31.5077 gigabytes per second, what sixteen PCIe lanes move at generation 4.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(380, 24, 'THE CHAPTER\'S FOUR HEADLINE NUMBERS', 12.5, c4R.ink, 'middle', 'bold'))
  panels.forEach((p, i) => {
    const x = X0 + i * (PW + GAP)
    const cols = [c4R.struct, c4R.teal, c4R.conn, c4R.accent]
    s.push(cf4RBox(x, Y0, PW, PH, i % 2 === 0 ? c4R.panelA : c4R.panelB, cols[i]))
    s.push(cf4RT(x + PW / 2, Y0 + 18, p[0], 10, cols[i], 'middle', 'bold'))
    s.push(cf4RT(x + PW / 2, Y0 + 40, p[1], 15, c4R.ink, 'middle', 'bold'))
    s.push(cf4RT(x + PW / 2, Y0 + 57, p[2], 9.5, c4R.tealInk))
  })
  s.push('</svg>')
  return s.join('')
}

/* 4.1 recap figure - the form-factor harvest as area bars */
function cf4RFormFactorSvg(): string {
  const W = 760, H = 208
  const s: string[] = []
  const X0 = 250, W_MAX = 460
  const wM = 0.8 * W_MAX
  const wI = (28900 / 74420) * W_MAX
  const bars: [string, number, string, string][] = [
    ['ATX (1995)', W_MAX, '74,420 mm2 - the full city', c4R.struct],
    ['microATX', wM, '59,536 mm2 = 0.800000 of ATX', c4R.teal],
    ['Mini-ITX (VIA, 2001)', wI, '28,900 mm2 = 0.388336 of ATX', c4R.conn],
  ]
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The form-factor harvest as three area bars drawn to one scale. ATX spans 74,420 square millimetres. microATX spans 59,536 square millimetres, exactly 0.800000 of ATX. Mini-ITX spans 28,900 square millimetres, 0.388336 of ATX and 0.485421 of microATX. The bars shrink left to right because each smaller board trades room for the right size.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(380, 22, 'THREE FOOTPRINTS, ONE SCALE (bar width is the area)', 12, c4R.ink, 'middle', 'bold'))
  bars.forEach((b, i) => {
    const y = 44 + i * 52
    s.push(cf4RT(X0 - 12, y + 20, b[0], 11, c4R.ink, 'end'))
    s.push(`<rect x="${X0}" y="${y}" width="${b[1]}" height="30" rx="4" fill="${b[3]}"/>`)
    s.push(cf4RT(X0 + b[1] + 8, y + 19, b[2], 10.5, c4R.tealInk, 'start'))
  })
  s.push(cf4RT(380, 196, 'one Mini-ITX is 0.485421 of a microATX - two ITX boards nearly tile one ATX', 10, c4R.warn))
  s.push('</svg>')
  return s.join('')
}

export const lesson4R: Lesson = {
  id: 'cf-unit-4-completion-review',
  number: '4.R',
  title: 'Unit 4 Completion Review',
  concepts: [
    'the chapter in one map: the city-and-its-life pipeline from board to processor to memory ladder, joined by the roads',
    'the four lesson recaps, grounded in the engine-pinned harvest numbers',
    'inside the box as a choice with a price: footprint, clock, latency rung, lane width',
    'the four headline witnesses: 74,420 mm2, 6756.7568x, 1,500x, 31.5077 GB/s',
    'the formula and vocabulary harvest of the chapter',
    'the mixed bench: fifteen exam-style questions across all four lessons',
    'the forward door: Software Families - the manager layer and the Operating System\'s doorstep',
  ],
  objectives: [
    'By the end of this lesson you can redraw the chapter\'s one map - the board hosting the worker station served by the memory ladder, all talking along the roads - from memory.',
    'By the end of this lesson you can restate the chapter\'s engine-pinned censuses cold: the form-factor harvest, the clock and Moore census, the latency ladder, and the port census.',
    'By the end of this lesson you can chain two lessons in one move - a form-factor area to a ladder rung to a lane budget - without putting the pencil down.',
    'By the end of this lesson you can price any inside-the-box choice with arithmetic: square millimetres, nanoseconds per beat, times-slower factors, bytes per second.',
    'By the end of this lesson you can walk through the forward door: name what chapter 5 asks of the machine you now know, and say what this chapter handed it.',
  ],
  prerequisites: [
    'cf-the-motherboard-the-city-plan',
    'cf-the-processor-named-honestly',
    'cf-the-first-memory-hierarchy',
    'cf-buses-and-ports-how-the-pieces-talk',
  ],
  sources: ['cs-cf-web-ground-ch04'],
  blocks: [
    // ---------- the opening ----------
    { kind: 'para', text: 'Four lessons ago this chapter owned nothing but a sealed case: what is actually INSIDE the box, and what does each piece cost? Lesson 4.1, \'The Motherboard: The City Plan\', unsealed it - the printed board as a city plan, with the form factors priced in square millimetres and the power story pinned to the 24-pin and 8-pin feeds and the 3 V CR2032 heart. Lesson 4.2, \'The Processor, Named Honestly\', put the workforce on the map - the four-stage cycle, the clock that beats time for everything, and Moore\'s long road from 2,300 transistors to today\'s billions. Lesson 4.3, \'The First Memory Hierarchy\', built the library system the worker reaches for - the latency ladder from the registers down to the cloud, every rung a trade among FAST, BIG and CHEAP. Lesson 4.4, \'Buses and Ports: How the Pieces Talk\', paved the roads - the three buses asking where, carrying what, timing when, and the port wall where the box meets the world. Four lessons plus this review: the chapter ships as $4 + 1 = 5$ seats. This review\'s job is twofold, exactly as the unit reviews of chapters 1 to 3 were twofold: first put the whole chapter back together in ONE map you can redraw from memory, and then make you USE it on a mixed bench - because a chapter that cannot be used was never learned. Every number below was engine-pinned before this prose was written; the review invents nothing, it restates the chapter at bench speed.' },

    // ---------- the one map ----------
    { kind: 'para', text: 'A review, the earlier unit reviews taught, is not a summary but a REHEARSAL: the map first, then the bench, then the door. This chapter opened with a sealed case and closes with a working city; what follows walks it four times - once per lesson - with every number the seats pinned, and then hands you fifteen questions that make the city answer for itself.' },

    { kind: 'heading', text: 'The Chapter in One Map' },
    { kind: 'para', text: 'Read the map the way it is drawn. A city plan (**the board**, 4.1) hosts a **worker station** (the processor, 4.2), whose every move is timed by a clock and served by a **library system** (the memory ladder, 4.3) - registers at the worker\'s own pocket, then cache, RAM, SSD, HDD, the cloud. Beneath all three run the **roads** (4.4): the address bus asking where, the data bus carrying what, the control bus timing when, the PCIe lanes hauling the heavy freight, and the port wall where USB, HDMI and SATA meet the world. The chapter\'s one method sits under the whole drawing: every component is a **choice with a price** - a footprint priced in square millimetres, a clock priced in nanoseconds per beat, a rung priced in times-slower factors, a road priced in bytes per second.' },
    { kind: 'figure', caption: 'The chapter in one map: the city-and-its-life pipeline. The board (4.1) hosts the worker station (4.2), which is served by the memory ladder (4.3) reaching from the registers down to the cloud under the FAST-BIG-CHEAP trade - while the roads of 4.4 (buses, lanes, ports) run beneath and connect all three. If you can redraw this from memory, you hold the chapter.', svg: cf4RMapSvg() },
    { kind: 'callout', tone: 'definition', title: 'The inside-the-box pipeline, defined once', text: 'The inside-the-box pipeline is said to be the chapter\'s own thread: a **city** (the board - 4.1\'s form factor, socket, chipset and power) **hosts a workforce** (the processor - 4.2\'s cycle and clock), the workforce is **served by a library system** (the memory hierarchy - 4.3\'s ladder of latency), and all three **talk along roads** (4.4\'s buses, lanes and ports). Symbolically: the board supplies the seats, the clock supplies the tempo, the ladder supplies the books, the buses supply the couriers - and each seat, tempo, book and courier was priced, never admired.' },
    { kind: 'para', text: 'The map earns its keep by CHAINING: any two lessons compose into one move. The board\'s footprint prices the ladder\'s seats; the ladder\'s rungs price the roads\' freight; the roads\' bandwidth prices the worker\'s appetite. Hold the three boxes and the one strip beneath, and every isolated fact in the recaps below snaps back onto its home rail.' },
    { kind: 'para', text: 'Four numbers carry the whole chapter on one strip - the four witnesses the recaps below will keep quoting. The board\'s headline is the ATX footprint, $305 \\times 244 = 74{,}420$ mm². The clock\'s headline is the speed-up, $5\\text{ GHz} \\div 740\\text{ kHz} = 6756.7568\\times$ over the first processor. The ladder\'s headline is the RAM rung\'s fall, $1{,}500\\times$ below L2. The road\'s headline is the freight lane, $31.5077$ GB/s on sixteen PCIe lanes at generation 4. Meet them once here; the bench will expect them on demand.' },
    { kind: 'figure', caption: 'The harvest banner (F2): the four seats\' headline numbers as one computed strip - 74,420 mm2 of board, 6756.7568x of clock, 1,500x of ladder, 31.5077 GB/s of road. Four lessons, four numbers, one chapter.', svg: cf4RBannerSvg() },
    { kind: 'para', text: 'Use the banner as the chapter\'s index card. Each panel is one lesson\'s whole harvest compressed to a number you can check by hand: the area multiplies from its edges, the clock ratio divides the two frequencies, the ladder factor divides the two latencies, the road bundle multiplies lane by count. Four panels, four one-line derivations - rebuild each number and you own the chapter.' },

    // ================================================================
    // 2. THE FOUR PER-LESSON RECAPS (the siblings' pinned numbers,
    //    carried verbatim - the review invents no numbers)
    // ================================================================
    { kind: 'heading', text: 'Lesson 4.1 Recap: The Motherboard - The City Plan' },
    { kind: 'para', text: 'Lesson 4.1 drew the city plan: the motherboard as the printed board on which every other lesson\'s actors find their seats. The harvest is a census of footprints and fittings. **ATX** arrived in 1995 at $305 \\times 244$ mm, an area of $74{,}420$ mm². **microATX** trimmed the same plan to $59{,}536$ mm² - exactly $0.800000$ of ATX, a twentieth saved and four-fifths kept, the cleanest fraction in the census. **Mini-ITX**, which VIA shipped in 2001, took $170 \\times 170$ mm $= 28{,}900$ mm²: $0.388336$ of ATX and $0.485421$ of microATX - two ITX boards nearly, but never quite, tile one ATX. The fittings carry their own pinned numbers: a DIMM seats on **288 pins**; the CMOS clock lives on a **CR2032** coin cell at **3 V**; the board feeds on a **24-pin** main connector plus an **8-pin** CPU feed. The plan\'s history is pinned too - the **IBM PC** of August 1981 set the planar-board habit the industry still follows, and Intel\'s **Nehalem** of 2008 folded the memory controller INTO the processor, redrawing which seats the board itself still owns.' },
    { kind: 'para', text: 'Read the fittings as one system rather than a list. The power feeds arrive first (24-pin for the board, 8-pin for the processor), the CR2032 keeps the timekeeper alive when they do not, and the 288-pin DIMMs are the seats where 4.3\'s RAM rung physically lands. The census\'s habit throughout: quote the unit with the number - square millimetres, volts, pins - because an unlabelled number prices nothing.' },
    { kind: 'figure', caption: 'The form-factor harvest, drawn to one scale: ATX at 74,420 mm2 (1995), microATX at 59,536 mm2 = 0.800000 of ATX, Mini-ITX at 28,900 mm2 = 0.388336 of ATX (VIA, 2001). The bars shrink because each smaller footprint trades build room for a smaller box - the chapter\'s choice-with-a-price method in three rectangles.', svg: cf4RFormFactorSvg() },
    { kind: 'table', caption: 'The form-factor census of lesson 4.1, with the fittings and the history the recap carries: every row a pinned value the bench may ask for cold.', head: ['The row', 'The pinned value', 'What it prices'], rows: [
      ['ATX (1995)', '305 x 244 mm = 74,420 mm2', 'the full city plan'],
      ['microATX', '59,536 mm2 = 0.800000 of ATX', 'four-fifths kept, a fifth given up'],
      ['Mini-ITX (VIA 2001)', '170 x 170 mm = 28,900 mm2', '0.388336 of ATX, 0.485421 of microATX'],
      ['Memory seat', 'DIMM, 288 pins', 'one byte at a time? no - 64 data lines wide'],
      ['Timekeeper', 'CR2032, 3 V', 'the CMOS clock that never sleeps'],
      ['Power feeds', '24-pin + 8-pin', 'the mains roads onto the city'],
      ['History', 'IBM PC August 1981; Nehalem 2008', 'the planar habit; the memory controller moves INTO the CPU'],
    ] },
    { kind: 'example', title: 'Recap Illustration: the 80.0% arithmetic - what microATX keeps and what it gives up.', steps: [
      'Take the two areas as pinned: ATX $74{,}420$ mm² and microATX $59{,}536$ mm².',
      'So the keeping fraction is $59{,}536 \\div 74{,}420 = 0.800000$ exactly - four significant zeros, the census\'s cleanest number.',
      'Now, price the giving-up side: $74{,}420 - 59{,}536 = 14{,}884$ mm² handed back.',
      'Check the two roads agree: $14{,}884 \\div 74{,}420 = 0.200000$, and $0.800000 + 0.200000 = 1$ - a footprint is conserved.',
      'Hence the builder\'s trade in one line: lose $14{,}884$ mm² (two DIMM seats and spare lanes, typically), gain a box a fifth smaller.',
      'Thus the 80.0% is not trivia but the price tag itself - the same trade Mini-ITX doubles down on at $0.388336$ of ATX.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Two dates that redrew the plan', text: 'August 1981: the IBM PC ships with a single **planar board** - everything important soldered to one plane - and the industry inherits a layout habit it has never really dropped. 2008: Intel\'s **Nehalem** folds the memory controller into the processor itself, so the "memory highway" that once belonged to the chipset now leaves the CPU package directly. The lesson\'s honest retelling: the city plan is not eternal - it is renegotiated every time a component outgrows its seat, and each renegotiation left a pinned date the census still quotes.' },

    { kind: 'heading', text: 'Lesson 4.2 Recap: The Processor, Named Honestly' },
    { kind: 'para', text: 'Lesson 4.2 named the worker honestly: a processor is a **cycle** machine - fetch, decode, execute, write back, four stages turning forever - timed by a **clock** whose beat prices every move. The pinned laws: $1\\text{ GHz} = 10^9$ cycles per second, so a $5\\text{ GHz}$ clock beats once every $0.2\\text{ ns}$. The history the seat pinned: the Intel **4004** shipped on **15 November 1971** with **2,300** transistors beating at **740 kHz** - so a 5 GHz clock out-beats the first processor $5{,}000{,}000{,}000 \\div 740{,}000 = 6756.7568\\times$. The **1 GHz** race was won by **AMD on 6 March 2000**, Intel crossing two days later; **May 2005** was the dual-core month, when the industry stopped racing one clock and started counting workers. **Moore\'s law** - stated **19 April 1965**, revised in **1975** to a doubling every two years - predicts $2{,}300 \\times 2^{26} = 154{,}350{,}387{,}200$ transistors for 2023\'s flagship; the M2 Ultra actually shipped $134$ billion, so the prediction sits $1.151869\\times$ high - **15.1869%** above the truth after fifty-two years. And the honest footnote: cache is SRAM, priced at **6 transistors per bit** - speed bought in silicon real estate.' },
    { kind: 'para', text: 'The recap\'s honest lesson is HOW the numbers were graded, not only what they are. The clock ratio divides modern cycles by 1971\'s cycles; the Moore prediction compounds the 1971 census forward at the revised pace and then stands IN COURT against a real chip - and the verdict, 15.1869% high, is recorded rather than excused. Grade your laws the same way: derive, compare, report the miss.' },
    { kind: 'figure', caption: 'The Moore census as one computed pair of bars: the revised two-year pace predicts 2,300 x 2^26 = 154,350,387,200 transistors for the 2023 flagship; the M2 Ultra actually carried 134,000,000,000. The prediction stands 1.151869x high - 15.1869% above the actual after 26 doublings - which is the honest way to grade a law: close, not exact.', svg: cf4RMooreSvg() },
    { kind: 'example', title: 'Recap Illustration: 6756.7568x - the first processor against the modern clock, in three moves.', steps: [
      'Take the two clocks as pinned: the 4004 beat at $740\\text{ kHz} = 7.4 \\times 10^5$ cycles/s; the modern part beats at $5\\text{ GHz} = 5 \\times 10^9$ cycles/s.',
      'So the ratio is $5 \\times 10^9 \\div 7.4 \\times 10^5 = 6756.7568$ (4 dp) - the modern clock beats 6756.7568 times for every one 4004 beat.',
      'Check it through the beat: the 4004 needed $1 \\div 7.4 \\times 10^5 \\approx 1.35$ us a beat; the 5 GHz part needs $0.2\\text{ ns}$ - and $1.35\\text{ us} \\div 0.2\\text{ ns} \\approx 6750$, the same order, both roads agreeing.',
      'Hence one modern SECOND of beats would have taken the 4004 roughly 6756.7568 seconds - about 1 hour 52 minutes - to tick through.',
      'Thus "6756.7568x" is not a boast but a price: fifty-three years of engineering, bought at the clock.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The summed-GHz trap, one last time', text: 'Four cores at $3\\text{ GHz}$ each sum to $4 \\times 3 = 12\\text{ GHz}$ on paper - and the paper is lying. The clock is the TEMPO each worker keeps; cores are the COUNT of workers. Four workers at three billion beats a second each divide the work; they do not merge into one worker beating twelve billion times a second. Any advert that adds clock speeds across cores has confused the workforce with the tempo - the examination\'s favourite trap, and the chapter\'s most-marked warning.' },

    { kind: 'heading', text: 'Lesson 4.3 Recap: The First Memory Hierarchy' },
    { kind: 'para', text: 'Lesson 4.3 built the library system: the **ladder** from the registers through L1/L2/L3 cache, RAM, SSD, HDD and out to the cloud, every rung a trade among **FAST, BIG and CHEAP**. The census, pinned in nanoseconds: registers $0.5\\text{ ns}$; L1 $7\\text{ ns}$ - $14\\times$ the registers; L2 $100\\text{ ns}$ - $14.2857\\times$ L1 and $200\\times$ the registers; RAM $150\\ \\mu\\text{s}$ - $1{,}500\\times$ below L2; SSD $10\\text{ ms}$ - $66.6667\\times$ below RAM; HDD $150\\text{ ms}$ - the ocean voyage, $15\\times$ below the SSD. Registers to HDD is one $300{,}000{,}000\\times$ span. The physics and history beneath: **Dennard** described the one-transistor-one-capacitor DRAM cell in 1966 and pinned it in **patent 3,387,286 on 4 June 1968** - a cell that leaks, hence the **64 ms** refresh drumbeat; SRAM holds its bit in **6 transistors**, no leaking, no refreshing, all price. The disk\'s birthday: **RAMAC on 14 September 1956**, fifty platters carrying about **3.75 MB**. And the ladder\'s secret engine is **the two localities** - you reuse what you recently used (temporal) and what sits near it (spatial) - which is why a small fast rung can serve a big slow one at all.' },
    { kind: 'para', text: 'Work the census, do not just admire it. A miss is priced by the rung you fall TO: miss L1 to L2 and you pay 14.2857 L1 visits; miss the caches to RAM and you pay 1,500 times. The table\'s human column is the ritual that makes the span unforgettable - translate every latency before you judge it, and the ladder stops being a diagram and becomes a conscience.' },
    { kind: 'table', caption: 'The latency census of lesson 4.3, with each rung\'s times-slower factor and its human-ladder translation (every machine nanosecond becomes two human seconds). Quote these cold; the bench will.', head: ['The rung', 'Latency', 'Times-slower witness', 'Human scale'], rows: [
      ['Registers', '0.5 ns', 'the worker\'s own pocket', '1 s'],
      ['L1 cache', '7 ns', '14x the registers', '14 s'],
      ['L2 cache', '100 ns', '14.2857x L1; 200x the registers', '200 s'],
      ['RAM', '150 us', '1,500x below L2', '3.472222 days'],
      ['SSD', '10 ms', '66.6667x below RAM', '231.481481 days = 7.6 months'],
      ['HDD', '150 ms', '15x below SSD - the ocean voyage', '9.5064263 years - call it 9.5'],
    ] },
    { kind: 'figure', caption: 'The FAST-BIG-CHEAP triangle (F3), with the census rungs placed. The apex holds the SRAM corner - registers and cache, fast and cheap per byte but small, at 6 transistors a bit. The floor holds the SSD, HDD and cloud - big and cheap but slow, out to the 150 ms ocean. RAM sits at the balance point, 1,500x below L2 and 66.6667x above the SSD. Pick any two; the third is the price.', svg: cf4RTriangleSvg() },
    { kind: 'example', title: 'Recap Illustration: the human ladder - machine latencies translated into a life you can feel.', steps: [
      'Take the translation rule: one machine nanosecond becomes two human seconds - a scale that makes the registers\' $0.5\\text{ ns}$ exactly $1\\text{ s}$.',
      'So one register fetch costs a heartbeat: 1 s.',
      'Now, L1\'s $7\\text{ ns}$ becomes $14\\text{ s}$, and L2\'s $100\\text{ ns}$ becomes $200\\text{ s}$ - three minutes twenty for one L2 visit.',
      'So RAM\'s $150\\ \\mu\\text{s}$ becomes $300{,}000\\text{ s} = 3.472222$ days - you post a request to the librarian and wait half a week.',
      'Thus SSD\'s $10\\text{ ms}$ becomes $231.481481$ days $= 7.6$ months, and HDD\'s $150\\text{ ms}$ becomes $9.5064263$ years - call it $9.5$ years for one mechanical read.',
      'Check the span: $150\\text{ ms} \\div 0.5\\text{ ns} = 300{,}000{,}000$ - one heartbeat against 9.5 years. Hence the ladder is not a diagram; it is a moral about patience.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Dennard\'s cell and RAMAC\'s platters', text: 'Two pinned birthdays hold the ladder\'s ends. At the fast end: Robert Dennard described the one-transistor, one-capacitor DRAM cell in 1966 and secured it as **patent 3,387,286 on 4 June 1968** - a brilliant, leaking bargain that still demands its **64 ms** refresh drumbeat. At the slow end: **RAMAC** shipped on **14 September 1956** - fifty platters, about **3.75 MB**, the first ocean-going mechanical memory. Our own retelling: every rung between them is a treaty between Dennard\'s speed and RAMAC\'s room, renegotiated each decade.' },
    { kind: 'callout', tone: 'theorem', title: 'The FAST-BIG-CHEAP verdict', text: 'For the ladder\'s rungs the chapter\'s law reads: a memory level may be FAST and BIG, or FAST and CHEAP, or BIG and CHEAP - never all three at once. SRAM (6 transistors a bit) buys FAST and CHEAP-per-access but is never BIG; the HDD ocean is BIG and CHEAP but is never FAST ($150\\text{ ms}$); RAM sits at the balance point, $1{,}500\\times$ below L2 and $66.6667\\times$ above the SSD, pricing the compromise honestly. Every machine you will ever buy is one walk around this triangle.' },
    { kind: 'example', title: 'Recap Illustration: the two localities in one evening of reading.', steps: [
      'Take a reader who opens this page at some late hour - the program fetching one line of text.',
      'So temporal locality: the reader re-reads the SAME line twice before moving on - recently used data is used again, which is why L1\'s $7\\text{ ns}$ keeps paying.',
      'Now, spatial locality: the next line read sits BESIDE the last in memory - so the ladder fetches the neighbourhood, not the orphan.',
      'Check the payoff: a loop that hits L1 nine visits in ten and L2 once averages $0.9 \\times 7 + 0.1 \\times 100 = 16.3\\text{ ns}$ - far nearer the fast rung than the $100\\text{ ns}$ label alone suggests.',
      'Hence the two localities are the ladder\'s engine: caches work because YOU work in patterns, and the $1{,}500\\times$ RAM wall is crossed rarely enough to forgive.',
    ] },

    { kind: 'heading', text: 'Lesson 4.4 Recap: Buses and Ports - How the Pieces Talk' },
    { kind: 'para', text: 'Lesson 4.4 paved the roads and counted the gates. The **three buses** inside: the **address bus** asks WHERE - 32 lines name $2^{32} = 4{,}294{,}967{,}296$ bytes, exactly $4$ GiB of reach; the **data bus** carries WHAT; the **control bus** times WHEN. Then the expandable lanes: **PCIe** generation 1 moves $250\\text{ MB/s}$ per lane, generation 3 $984.6154\\text{ MB/s}$, generation 4 $1969.2308\\text{ MB/s}$, generation 5 $3938.4615\\text{ MB/s}$ - every doubling generation doubles the lane - so the **x16** bundle at gen4 moves $31.5077\\text{ GB/s}$, the graphics freight road. The **port wall** where the box meets the world: **USB** (1996) opened at $12\\text{ Mbit/s}$; **USB 2.0** on **27 April 2000** carried $480\\text{ Mbit/s}$, $40\\times$ the original; **USB 3.0** (2008) reached $5\\text{ Gbit/s}$, $10.4167\\times$ on; **USB4** (2019) runs $40\\text{ Gbit/s}$, another $8\\times$ - with the **USB-C** plug arriving in **August 2014** to carry them all. The **screen road**: **HDMI 1.0** on **9 December 2002** moved $4.95\\text{ Gbit/s}$; **HDMI 2.1** (2017) moves $48\\text{ Gbit/s}$, $9.69697\\times$. And the **disk road**: **SATA 3.0** signals at $6\\text{ Gbit/s}$, paying its 8b/10b toll to deliver $600\\text{ MB/s}$ raw.' },
    { kind: 'para', text: 'The roads recap carries one habit above all: CONVERT before comparing. Ports speak Mbit/s, lanes speak MB/s or GB/s, SATA quotes signalling bits before its encoding toll; the strip\'s families only compose when their units agree. Once converted, the whole wall lines up on one ruler - and every doubling, gate and toll becomes a one-line division.' },
    { kind: 'figure', caption: 'The port census as one timeline strip, drawn on an even grid (the true ratios are printed, not scaled): PCIe lanes doubling 250 to 3938.4615 MB/s per lane from gen1 to gen5; USB climbing 12 Mbit/s to 40 Gbit/s through the 40x, 10.4167x and 8x gates; HDMI leaping 9.69697x from 4.95 to 48 Gbit/s; SATA tolling down to 600 MB/s. The roads of the city, priced per second.', svg: cf4RPortsSvg() },
    { kind: 'table', caption: 'The port census of lesson 4.4: every road, its pinned rates, and the honest unit habit each row teaches.', head: ['The road', 'The pinned rates', 'What it prices'], rows: [
      ['Address bus (32 lines)', '2^32 = 4,294,967,296 bytes', 'exactly 4 GiB of reach'],
      ['PCIe per lane, gen1 to gen5', '250 to 984.6154 to 1969.2308 to 3938.4615 MB/s', 'each doubling generation doubles the lane'],
      ['PCIe x16 at gen4', '16 x 1969.2308 MB/s', '31.5077 GB/s - the graphics freight road'],
      ['USB 1996 to USB4 2019', '12 Mbit/s; 27 April 2000: 480 (40x); 2008: 5 Gbit/s (10.4167x); 2019: 40 Gbit/s (8x)', '3333.3333x across the family'],
      ['USB-C plug', 'August 2014', 'one reversible plug for all the speeds'],
      ['HDMI 1.0 to 2.1', '9 December 2002: 4.95 Gbit/s; 2017: 48 Gbit/s', '9.69697x - the screen road'],
      ['SATA 3.0', '6 Gbit/s signalling, 8b/10b', '600 MB/s raw - the disk road'],
    ] },
    { kind: 'example', title: 'Recap Illustration: the divide - the graphics road against the old USB wall.', steps: [
      'Take the two roads as pinned: the graphics lane bundle moves $31.5077\\text{ GB/s}$; the old USB 2.0 wall moves $480\\text{ Mbit/s} = 60\\text{ MB/s}$.',
      'So put them in one unit: $31.5077\\text{ GB/s} = 31{,}507.7\\text{ MB/s}$.',
      'Now, divide: $31{,}507.7 \\div 60 = 525.1282$.',
      'Thus the graphics road carries $525.1282$ USB-2.0-worth of freight every single second - the divide the port wall lives on.',
      'Check it from the pins: $16 \\times 1969.2308 = 31{,}507.7\\text{ MB/s}$, and $480 \\div 8 = 60\\text{ MB/s}$ - both roads close.',
      'Hence the census\'s last honest habit: a port quotes Mbit/s, a lane quotes GB/s - convert before you compare.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why the lanes, not just the wall', text: 'The port wall sells plugs; the lanes sell bandwidth. One PCIe lane at gen4 moves $1969.2308\\text{ MB/s}$ - more than three USB 3.0 ports together - and sixteen of them bundle to $31.5077\\text{ GB/s}$ because lane bandwidth ADDS. That is why the graphics card takes lanes, the SSD takes four, and the keyboard takes one USB wall: the chapter\'s method again - match the road\'s width to the freight\'s weight, and pay only for the width you need.' },

    // ================================================================
    // 3. THE SYNTHESIS
    // ================================================================
    { kind: 'heading', text: 'The Synthesis: A Choice with a Price, Paid Four Ways' },
    { kind: 'para', text: 'Strip the four lessons to one sentence and it reads: **inside the box, every component is a choice, and every choice has a price the chapter has now paid.** The board is a choice - $74{,}420\\text{ mm}^2$ of ATX, or $0.800000$ of it, or $0.388336$ of it, each fraction trading build room against box size. The clock is a choice - $0.2\\text{ ns}$ a beat at 5 GHz, priced against heat and against the $6756.7568\\times$ road the 4004 already walked. The ladder is a choice - $1{,}500\\times$ between L2 and RAM, FAST-BIG-CHEAP picking two. The roads are a choice - $31.5077\\text{ GB/s}$ of lane bundle, or a $60\\text{ MB/s}$ wall, priced per second. Four seats, one method: name the choice, count the price.' },
    { kind: 'para', text: 'Keep two souvenirs and you keep the chapter. The **one map** - a city (board) hosting a workforce (processor) served by a library system (memory ladder) and connected by roads (buses and ports) - redraws on a napkin and recalls all four vocabularies at once. The **four witnesses** - $74{,}420\\text{ mm}^2$, $6756.7568\\times$, $1{,}500\\times$, $31.5077\\text{ GB/s}$ - quote the whole chapter in four numbers, and the bench below will ask for each of them cold.' },

    // ================================================================
    // 4. THE MIXED BENCH (15 exam-style questions, L1-L4)
    // ================================================================
    { kind: 'para', text: 'The bench is the method under examination conditions: each question is one of the four prices, or two of them chained. Answer with the same ritual the recaps used - name the pinned values, derive, check by a second road, then state the price in its honest unit. The four witnesses on the banner are fair game in every seat; quote them cold.' },

    { kind: 'heading', text: 'The Mixed Bench: Fifteen Questions Across the Chapter' },
    { kind: 'para', text: 'The bench spans all four lessons and climbs four rungs: L1 begins - single labellings and single reads; L2 consolidates - full areas, full ratios, full censuses; L3 advances - two-road verifications and the Moore verdict; L4 charges - the divide, the whole-chapter build, and one honest two-part exam piece. At least four solutions carry their own diagrams. Choose your own level, but attempt every seat: the chapter is now yours to USE.' },
    { kind: 'para', text: 'Score yourself honestly: an answer with the right method and a slipped digit is half marks; a remembered number with no derivation is none - the chapter priced choices, and the bench prices derivations. The diagrams in five of the solutions are part of the method: redraw them from memory after marking, and the redraw is the revision.' },
    { kind: 'exercises', title: 'Exercises 4.R - the mixed bench across the chapter', sets: [
      { level: 'L1', questions: [
        { q: 'A motherboard photo is labelled with four regions: the CPU socket, the DIMM slots, the chipset and the power connectors. For each region say in one line what it hosts or feeds, and attach the pinned fitting that goes with it (288-pin DIMMs, CR2032 at 3 V, 24-pin + 8-pin feeds).', solution: [
          'Take the socket: it seats the processor - 4.2\'s worker station - and since Nehalem (2008) the memory controller rides inside that package.',
          'So the DIMM slots seat memory: each DIMM lands on 288 pins, and the slots are the ladder\'s doorway to the RAM rung.',
          'Now, the chipset: the board\'s town hall - it stitches the slower districts (ports, storage, legacy) to the processor\'s roads.',
          'Thus the 24-pin main connector feeds the whole board, with the 8-pin feed reserved for the processor\'s own appetite.',
          'Check the small fitting: the CR2032 coin at 3 V keeps the CMOS timekeeper ticking while the mains is off - the city never fully sleeps.',
        ], answer: 'socket = the processor; DIMM slots = RAM on 288 pins; chipset = the town hall; 24-pin + 8-pin = the power feeds; CR2032 at 3 V = the always-on timekeeper', figures: [{ caption: 'The mini city plan: the socket seating the worker, two 288-pin DIMM slots, the chipset town hall, the 24-pin and 8-pin power feeds and the CR2032 coin cell - 4.1\'s board with its pinned fittings in place.', svg: cf4RSolCitySvg() }] },
        { q: 'A processor runs at 4 GHz. (i) How long is one beat of its clock, in nanoseconds? (ii) Name the four stages of the cycle in order.', solution: [
          'Take the pinned law: $1\\text{ GHz} = 10^9$ cycles per second.',
          'So 4 GHz beats $4 \\times 10^9$ times a second, and one beat lasts $1 \\div (4 \\times 10^9)\\text{ s} = 0.25\\text{ ns}$.',
          'Check against the pinned witness: 5 GHz gives $0.2\\text{ ns}$, and 4 GHz beats slower, so $0.25\\text{ ns} > 0.2\\text{ ns}$ - the order is right.',
          'Thus (ii) the cycle runs fetch, then decode, then execute, then write back - four stages, every instruction, forever.',
        ], answer: 'one beat = 0.25 ns; the cycle is fetch -> decode -> execute -> write back' },
        { q: 'Put the six census rungs in speed order, fastest first: RAM, registers, SSD, L2, HDD, L1 - and beside each write its pinned latency and the trade it makes on the FAST-BIG-CHEAP triangle.', solution: [
          'Take the census and sort by latency, smallest first: registers $0.5\\text{ ns}$; L1 $7\\text{ ns}$; L2 $100\\text{ ns}$; RAM $150\\ \\mu\\text{s}$; SSD $10\\text{ ms}$; HDD $150\\text{ ms}$.',
          'So the order is: registers, L1, L2, RAM, SSD, HDD - exactly the ladder\'s own drawing order.',
          'Now, attach the trades: registers and cache are FAST (but small - SRAM at 6 transistors a bit); RAM is the balance point; SSD, HDD and the cloud are BIG and CHEAP (but slow).',
          'Check the witnesses: L1 is $14\\times$ the registers; RAM is $1{,}500\\times$ below L2; the HDD ocean is $15\\times$ below the SSD - each step down buys room and cheapness at a times-slower price.',
          'Hence the verdict: no rung escapes the triangle - pick two of FAST, BIG, CHEAP, and pay the third.',
        ], answer: 'registers 0.5 ns, L1 7 ns, L2 100 ns, RAM 150 us, SSD 10 ms, HDD 150 ms - FAST at the top, BIG-CHEAP at the floor, RAM the balance' },
      ] },
      { level: 'L2', questions: [
        { q: 'Compute the ATX and Mini-ITX areas from their edge lengths; state the ITX fraction of ATX to six decimal places; and say how many COMPLETE Mini-ITX footprints tile one ATX board.', solution: [
          'Take the edges as pinned: ATX is $305 \\times 244\\text{ mm}$, Mini-ITX is $170 \\times 170\\text{ mm}$.',
          'So ATX is $305 \\times 244 = 74{,}420\\text{ mm}^2$ and Mini-ITX is $170 \\times 170 = 28{,}900\\text{ mm}^2$.',
          'Now, the fraction: $28{,}900 \\div 74{,}420 = 0.388336$ (6 dp).',
          'Thus the tiling: $74{,}420 \\div 28{,}900 = 2.5751$ - two complete ITX boards, with $57.44\\%$ of a third left over.',
          'Hence the 2001 trade in one line: a third of the city for a box that fits in the palm.',
        ], answer: 'ATX = 74,420 mm2; Mini-ITX = 28,900 mm2 = 0.388336 of ATX; two complete ITX footprints tile one ATX (2.5751 with the fraction)' },
        { q: 'The 4004 beat at 740 kHz on 15 November 1971 with 2,300 transistors. By what factor (4 dp) does a 5 GHz clock out-beat it, and how many two-year doublings separate 1971 from 2023?', solution: [
          'Take the clocks as pinned: $740\\text{ kHz} = 7.4 \\times 10^5$ cycles/s against $5 \\times 10^9$ cycles/s.',
          'So the factor is $5 \\times 10^9 \\div 7.4 \\times 10^5 = 6756.7568$ (4 dp).',
          'Now, the doublings: $(2023 - 1971) \\div 2 = 26$ - Moore\'s revised two-year pace, 26 doublings in 52 years.',
          'Check the width of the gap: 26 doublings is a factor $2^{26} = 67{,}108{,}864$ in transistor budget - the clock factor and the transistor factor are different censuses of the same half-century.',
          'Hence one modern second of beats would have taken the 4004 about 6756.7568 seconds to tick through.',
        ], answer: '6756.7568x the clock; 26 doublings (2^26 = 67,108,864) from 1971 to 2023' },
        { q: 'A machine\'s address bus is 32 lines wide. How many distinct addresses does it name, how many bytes does that reach, and what honest GiB figure is that?', solution: [
          'Take the census law: $n$ lines name $2^n$ addresses - 32 lines name $2^{32}$.',
          'So the bus names $2^{32} = 4{,}294{,}967{,}296$ addresses, one byte each at its smallest grain.',
          'Now, the honest unit: $4{,}294{,}967{,}296 \\div 2^{30} = 4$ exactly - exactly 4 GiB, not 4 decimal GB.',
          'Check the honest gap: $4{,}294{,}967{,}296 \\div 4{,}000{,}000{,}000 = 1.073741824$, so the decimal reading sells the reach 7.37% short.',
          'Hence the habit: quote the GiB - the binary prefix is the honest one.',
        ], answer: '2^32 = 4,294,967,296 bytes = exactly 4 GiB (the decimal 4 GB undersells it by 7.37%)' },
        { q: 'One L2 visit costs 100 ns, one L1 hit costs 7 ns, one RAM visit costs 150 us. How many L1 hits fit inside one L2 miss (4 dp), how many L2 misses fit inside one RAM visit, and which working habit keeps a program on the cheap rungs?', solution: [
          'Take the ratios: $100 \\div 7 = 14.2857$ (4 dp) L1 hits fit inside one L2 miss.',
          'So one RAM visit costs $150{,}000 \\div 100 = 1{,}500$ L2 misses - the pinned RAM factor itself.',
          'Now, the habit: the two LOCALITIES - temporal (reuse what you just used) and spatial (fetch the neighbourhood, not the orphan).',
          'Thus a loop with the right localities lives on L1 and L2, crossing the $1{,}500\\times$ RAM wall rarely enough to forgive.',
          'Hence the ladder serves the disciplined program and taxes the scattered one - the census\'s moral, priced in nanoseconds.',
        ], answer: '14.2857 L1 hits per L2 miss; 1,500 L2 misses per RAM visit; temporal and spatial locality keep you cheap', figures: [{ caption: 'The latency ladder, priced: registers 0.5 ns, L1 7 ns, L2 100 ns, RAM 150 us, with the bracket witnesses 14x, 14.2857x and 1,500x between the rungs - the arithmetic of question 7 drawn as one strip.', svg: cf4RSolLadderSvg() }] },
      ] },
      { level: 'L3', questions: [
        { q: 'Verify by TWO roads that microATX is exactly 0.800000 of ATX; compute the area handed back in mm2; and state Mini-ITX\'s fraction of microATX to six decimal places.', solution: [
          'Take road one: $59{,}536 \\div 74{,}420 = 0.800000$ - the fraction directly.',
          'Now, road two: $0.8 \\times 74{,}420 = 59{,}536$ - the fraction walks home to the pinned area, so the census closes both ways.',
          'Thus the area handed back: $74{,}420 - 59{,}536 = 14{,}884\\text{ mm}^2$, which is $14{,}884 \\div 74{,}420 = 0.200000$ of ATX.',
          'So Mini-ITX against the smaller rival: $28{,}900 \\div 59{,}536 = 0.485421$ (6 dp) - an ITX board is nearly half a microATX city.',
          'Hence three fractions, one census: $0.800000$ kept, $0.200000$ given, $0.485421$ inherited.',
        ], answer: 'microATX = 0.800000 of ATX both roads; 14,884 mm2 handed back (20.0%); Mini-ITX = 0.485421 of microATX', figures: [{ caption: 'The two-footprint check drawn to one scale: ATX at 74,420 mm2 full width, Mini-ITX at 28,900 mm2 = 0.388336 of the width - the ratio of question 8 as two bars.', svg: cf4RSolAreaSvg() }] },
        { q: 'Moore\'s revised two-year pace predicts $2{,}300 \\times 2^{26}$ transistors for the 2023 flagship. Compute the prediction EXACTLY, compare it with the M2 Ultra\'s 134 billion, and state the ratio (6 dp) and the percentage overshoot (4 dp). Then grade the law in one honest sentence.', solution: [
          'Take the doublings: 52 years at the two-year pace give $(2023 - 1971) \\div 2 = 26$ doublings, and $2^{26} = 67{,}108{,}864$.',
          'So the prediction is $2{,}300 \\times 67{,}108{,}864 = 154{,}350{,}387{,}200$ transistors - exact, no rounding.',
          'Now, the comparison: $154{,}350{,}387{,}200 \\div 134{,}000{,}000{,}000 = 1.151869$ (6 dp).',
          'Thus the overshoot: $(1.151869 - 1) \\times 100 = 15.1869\\%$ (4 dp) above what actually shipped.',
          'Hence the grade: fifty-two years of a two-year doubling law landed 15.1869% high - remarkably close, honest about being a law of thumb, not of nature.',
        ], answer: 'prediction 154,350,387,200; ratio 1.151869; overshoot 15.1869% - the law graded close, not exact' },
        { q: 'A PCIe gen4 lane moves 1,969.2308 MB/s of payload. (i) What does the x16 bundle move, in GB/s to 4 dp? (ii) How long does one 4 GiB load take to cross it (4 dp of a second)?', solution: [
          'Take the lane budget law: bundle = lanes x per-lane rate.',
          'So the bundle is $16 \\times 1969.2308 = 31{,}507.7\\text{ MB/s} = 31.5077\\text{ GB/s}$ (4 dp).',
          'Now, the freight: 4 GiB is the address bus\'s own reach, $2^{32} = 4{,}294{,}967{,}296\\text{ B}$.',
          'Thus the crossing: $4{,}294{,}967{,}296 \\div 31{,}507{,}692{,}307.7 = 0.1363\\text{ s}$ (4 dp) - about a seventh of a second.',
          'Check the units: bytes divided by bytes-per-second gives seconds - and the GiB matched the byte census before the divide.',
          'Hence one road witness serves two questions: the bundle\'s price and the freight\'s time.',
        ], answer: '16 x 1969.2308 MB/s = 31.5077 GB/s; 4 GiB crosses in 0.1363 s' },
        { q: 'A loop spends 90% of its memory visits hitting L1 (7 ns) and 10% reaching L2 (100 ns). Compute the average visit (1 dp), and name the two localities that make such friendly mixes the norm.', solution: [
          'Take the mix: nine visits in ten at $7\\text{ ns}$, one in ten at $100\\text{ ns}$.',
          'So the average is $0.9 \\times 7 + 0.1 \\times 100 = 6.3 + 10 = 16.3\\text{ ns}$ (1 dp).',
          'Check the sense: $16.3\\text{ ns}$ sits far nearer L1\'s $7\\text{ ns}$ than L2\'s $100\\text{ ns}$ - the mix is dominated by the fast rung.',
          'Now, the two localities that build such mixes: TEMPORAL - recently used data is used again; SPATIAL - data near what you just used is used next.',
          'Hence caches earn their silicon because programs repeat themselves in time and cluster in space - the ladder\'s secret engine, priced at $16.3\\text{ ns}$.',
        ], answer: '0.9 x 7 + 0.1 x 100 = 16.3 ns average; temporal and spatial locality make the mix friendly' },
      ] },
      { level: 'L4', questions: [
        { q: 'Price three roads in MB/s: USB 2.0\'s 480 Mbit/s, SATA 3.0\'s 6 Gbit/s with its 8b/10b toll, and the PCIe gen4 x16 bundle (per lane 1,969.2308 MB/s). Order them, and state how many times each slower road fits into the next.', solution: [
          'Take USB 2.0 first: $480\\text{ Mbit/s} \\div 8 = 60\\text{ MB/s}$ - the old wall in bytes.',
          'Now, SATA 3.0: $6\\text{ Gbit/s}$ signalling pays the 8b/10b toll, so $6{,}000 \\times 8/10 \\div 8 = 600\\text{ MB/s}$ raw.',
          'So the graphics bundle: $16 \\times 1969.2308 = 31{,}507.7\\text{ MB/s}$ - the road witness, already in GB/s as $31.5077$.',
          'Thus the order: $60 < 600 < 31{,}507.7\\text{ MB/s}$, and the fits are $600 \\div 60 = 10$, then $31{,}507.7 \\div 600 = 52.5128$.',
          'Check the shapes: SATA\'s toll is an encoding tax (8 of every 10 bits survive); USB\'s and PCIe\'s numbers here are already payload.',
          'Hence the wall, the disk road and the freight lane sit a factor ten and a factor 52.5128 apart - three roads, three prices.',
        ], answer: '60 MB/s, 600 MB/s, 31,507.7 MB/s; SATA fits 10x over USB 2.0 and the bundle 52.5128x over SATA', figures: [{ caption: 'The three roads on one log-scale strip: USB 2.0 at 60 MB/s, SATA 3.0 at 600 MB/s (10x), the PCIe gen4 x16 bundle at 31,507.7 MB/s (52.5128x more) - the ordering of question 12, each bar a factor-of-ten step.', svg: cf4RSolBarsSvg() }] },
        { q: 'Reconstruct the USB timeline with dates and ratios from 1996 to USB4, place the USB-C plug\'s month, and do the same for HDMI 1.0 to 2.1. Finish by stating how many times USB4 outruns the 1996 original (4 dp).', solution: [
          'Take the USB census: 1996 opens at $12\\text{ Mbit/s}$; USB 2.0 arrives 27 April 2000 at $480\\text{ Mbit/s}$ - $40\\times$; USB 3.0 (2008) reaches $5\\text{ Gbit/s}$ - $10.4167\\times$ on; USB4 (2019) runs $40\\text{ Gbit/s}$ - another $8\\times$.',
          'So the plug\'s own date: USB-C arrives August 2014 - a connector change, not a speed step, riding between 3.0 and USB4.',
          'Now, the screen road: HDMI 1.0 ships 9 December 2002 at $4.95\\text{ Gbit/s}$; HDMI 2.1 (2017) moves $48\\text{ Gbit/s}$ - $9.69697\\times$.',
          'Thus the family span: $40{,}000\\text{ Mbit/s} \\div 12\\text{ Mbit/s} = 3333.3333$ (4 dp) - USB4 outruns the 1996 original three-thousand-fold.',
          'Check each ratio closes: $480/12 = 40$; $5000/480 = 10.4167$; $40{,}000/5{,}000 = 8$; $48/4.95 = 9.69697$ - every gate honest.',
          'Hence two timelines, one habit: quote the date WITH the ratio, or the census is just speeds loose in the dark.',
        ], answer: '1996: 12 -> 2000 (27 April): 480 (40x) -> 2008: 5 Gbit/s (10.4167x) -> 2019: 40 Gbit/s (8x); USB-C August 2014; HDMI 2002: 4.95 -> 2017: 48 (9.69697x); USB4 = 3333.3333x the original' },
        { q: '(The whole chapter in one machine.) Price this build end to end with pinned numbers: a microATX board (area and fraction of ATX), a 4-core processor at 3 GHz each (the summed headline, the honest warning, and one beat to 4 dp of a ns), RAM one rung below L2 by the census (the rung and its factor), and a graphics road of sixteen PCIe gen4 lanes (GB/s to 4 dp). Finish with the FAST-BIG-CHEAP verdict the build embodies.', solution: [
          'Take the board: microATX is $59{,}536\\text{ mm}^2$, exactly $0.800000$ of ATX\'s $74{,}420\\text{ mm}^2$.',
          'So the workforce: four cores at $3\\text{ GHz}$ each sum to $4 \\times 3 = 12\\text{ GHz}$ ON PAPER - and the paper lies: cores are a count of workers, not a faster tempo.',
          'Now, the honest beat: one core beats at $1 \\div 3\\text{ GHz} = 0.3333\\text{ ns}$ (4 dp) - the tempo each of the four workers actually keeps.',
          'Thus the ladder: RAM sits at $150\\text{ }\\mu\\text{s}$, $1{,}500\\times$ below L2\'s $100\\text{ ns}$ - the census\'s balance rung.',
          'And the road: $16 \\times 1969.2308\\text{ MB/s} = 31.5077\\text{ GB/s}$ of gen4 freight lane.',
          'Hence the verdict: the build buys FAST (clock, cache, lanes) and BIG (four workers, 80% of a full city) - and CHEAP is the price it pays; the triangle never yields all three.',
        ], answer: '59,536 mm2 = 0.800000 of ATX; 4 x 3 GHz sums to 12 GHz only on paper, the true beat 0.3333 ns; RAM 150 us = 1,500x below L2; road 31.5077 GB/s; FAST + BIG bought, CHEAP paid', figures: [{ caption: 'One build, four prices: the microATX board at 0.800000 of ATX, the four-core workforce at an honest 0.3333 ns beat, RAM one 1,500x rung below L2, and the 31.5077 GB/s gen4 road - question 14\'s machine as one pipeline strip.', svg: cf4RSolPipeSvg() }] },
        { q: '(Exam-style, two parts.) (i) A box advertises "4 GB of memory" on a machine whose 32-bit address bus reaches its census maximum. State the exact byte census, the honest GiB figure, and the percentage by which the honest figure exceeds the decimal 4 GB (2 dp). (ii) The same box quotes the graphics road as "32 GB/s". Reconstruct the honest figure from the gen4 per-lane rate and say what the advert rounded.', solution: [
          'Take the census law: 32 address lines reach $2^{32} = 4{,}294{,}967{,}296$ bytes.',
          'So the honest figure is $4{,}294{,}967{,}296 \\div 2^{30} = 4$ exactly - exactly 4 GiB, the binary prefix.',
          'Now, price the advert\'s decimal reading: $4{,}294{,}967{,}296 \\div 4{,}000{,}000{,}000 = 1.073741824$, so the honest reach exceeds decimal 4 GB by $7.37\\%$ (2 dp).',
          'Thus for (ii): the honest road is $16 \\times 1969.2308\\text{ MB/s} = 31{,}507.7\\text{ MB/s} = 31.5077\\text{ GB/s}$ (4 dp).',
          'So the advert rounded $31.5077$ up to $32$ - a 1.6% boast, dressed as a round number.',
          'Hence the examination habit: quote the binary prefix and the per-lane reconstruction, and the round number loses its disguise.',
        ], answer: '(i) 2^32 = 4,294,967,296 B = exactly 4 GiB, +7.37% over decimal 4 GB; (ii) 16 x 1969.2308 MB/s = 31.5077 GB/s - the advert rounded 31.5077 to 32' },
      ] },
    ] },

    // ================================================================
    // 5. THE FORWARD DOOR (chapter 5 'Software Families')
    // ================================================================
    { kind: 'para', text: 'Before the door, the tally. Fifteen questions across four lessons, five solution diagrams, every harvest number quoted at least twice - once in its recap, once under examination conditions. If the bench went well, the city below is yours; if a question fought back, its recap above is the repair bench - go back one section, not back one chapter.' },

    { kind: 'heading', text: 'The Forward Door: Software Families' },
    { kind: 'para', text: 'Close the chapter by opening the next door. For four lessons you have lived INSIDE the box: you know the city plan and its 74,420 mm², the worker\'s 0.2 ns beat, the ladder\'s 1,500x RAM rung, the roads\' 31.5077 GB/s - a machine that now visibly WORKS. But no city runs itself, and chapter 5, \'Software Families\', names WHO MANAGES IT. The census to come: **system software** against **application software**, priced on your own machine; the **manager layer** - the Operating System\'s doorstep, where programs stop being your guesses and start being scheduled, stored, and kept honest; the **utilities**, the manager\'s small tools; and the craft of **installing and licensing honestly**, because software is bought as well as built. (When you want the deeper floors beneath this chapter\'s hardware ground, \'Computer Organization and Architecture\' owns the full theory door; \'Operating Systems\' owns the manager\'s own house.)' },
    { kind: 'para', text: 'Chapter 5\'s syllabus, in one breath: what system software is and how it differs from the applications it manages; what the Operating System visibly DOES on your own machine - schedules the workers, keeps the library honest, arbitrates the roads; what utilities are for; and how software is installed, updated and licensed without self-deceit. The hardware city is built; the management hire is next.' },
    { kind: 'callout', tone: 'insight', title: 'What to carry through the door', text: 'Carry the method, not the menagerie: name the choice, count the price. When chapter 5 shows you two programs claiming the same memory, you will already ask which rung each lives on and who arbitrates the $1{,}500\\times$ gap. When it quotes a disk in GB, you will ask which giga - the $7.37\\%$ habit walks with you. The city of chapter 4 supplies the seats, the tempo, the library and the roads; the manager of chapter 5 decides who sits, when, and for how long. You now know the city well enough to hire its manager.' },
    { kind: 'figure', caption: 'The forward-door sketch (F4): the city\'s hiring notice, pinned honest - no clip-art faces, just the door chapter 5 opens: the manager layer, the Operating System\'s doorstep, the utilities, and the craft of installing and licensing honestly.', svg: cf4RDoorSvg() },

    // ================================================================
    // 6. EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Exam Corner: the Chapter as a Checklist' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner - what this chapter answers, honestly labelled', text: 'Banking and SSC computer-awareness papers, school and board computer-science examinations, and Cambridge 9618-style papers all draw on inside-the-box fundamentals - form factors, clock arithmetic, the memory hierarchy, buses and ports. The asks below are the stable ones, phrased in OUR OWN words in the style such papers use; nothing here claims to quote a real paper. Each row carries the engine-pinned witness to quote in the margin - the fastest honest marks in the hall.' },
    { kind: 'para', text: 'The table below is the revision sheet the chapter has been building towards: seven stable asks, the lesson that answers each, and the witness that earns the mark. Revise by covering the right column and reproducing it from the ask alone - the examination\'s habit is to name the ask and wait to see whether you carry the number.' },
    { kind: 'table', caption: 'The chapter\'s examination checklist: every stable ask, the lesson that answers it, and the pinned witness to quote.', head: ['The examination ask', 'The lesson', 'The witness to quote'], rows: [
      ['State form-factor areas and fractions', '4.1', '74,420 mm2; 0.800000; 0.388336; 0.485421'],
      ['Price one clock beat; order the cycle stages', '4.2', '0.2 ns at 5 GHz; fetch, decode, execute, write back'],
      ['Grade Moore\'s law against a real flagship', '4.2', '2,300 x 2^26 = 154,350,387,200 vs 134 billion = 1.151869x'],
      ['Order the latency rungs; state the factors', '4.3', '14x, 14.2857x, 200x, 1,500x, 66.6667x, 15x'],
      ['Translate the census to the human ladder', '4.3', '3.472222 days; 231.481481 days; 9.5064263 years'],
      ['State address-bus reach; bundle lane bandwidth', '4.4', '4,294,967,296 bytes = 4 GiB; 31.5077 GB/s'],
      ['Reconstruct the port timelines with ratios', '4.4', '40x (27 April 2000); 10.4167x (2008); 8x (2019); 9.69697x (HDMI)'],
    ] },

    // ================================================================
    // 7. THE FORMULA + VOCABULARY HARVEST
    // ================================================================
    { kind: 'heading', text: 'The Formula Harvest' },
    { kind: 'para', text: 'Six cards carry the chapter\'s arithmetic. Each latex line is the engine of one recap; each note quotes the pinned witnesses you have already derived twice. Learn them as MOVES - divide the areas, divide the latencies, multiply the lanes - not as strings; the moves survive any fresh number the examination invents.' },
    { kind: 'formula', name: 'The footprint fraction', latex: '\\text{fraction} = \\text{smaller area} \\div \\text{larger area}', note: 'microATX over ATX = 0.800000; Mini-ITX over ATX = 0.388336; Mini-ITX over microATX = 0.485421. ATX itself: 305 x 244 = 74,420 mm2.' },
    { kind: 'formula', name: 'One clock beat', latex: '\\text{beat (s)} = 1 \\div \\text{frequency (Hz)}', note: '5 GHz gives 0.2 ns; 3 GHz gives 0.3333 ns; the 4004\'s 740 kHz gave about 1.35 us. Never add beats across cores.' },
    { kind: 'formula', name: 'The Moore census', latex: '\\text{transistors}(Y) = \\text{transistors}(Y_0) \\times 2^{(Y - Y_0)/2}', note: '2,300 x 2^26 = 154,350,387,200 predicted for 2023; the M2 Ultra shipped 134 billion; the prediction stands 1.151869x (15.1869%) high.' },
    { kind: 'formula', name: 'The times-slower factor', latex: '\\text{factor} = \\text{slower latency} \\div \\text{faster latency}', note: 'L1 over the registers = 14; L2 over L1 = 14.2857 (200x over the registers); RAM over L2 = 1,500; SSD over RAM = 66.6667; HDD over SSD = 15.' },
    { kind: 'formula', name: 'The human ladder', latex: '\\text{human time} = \\text{machine latency} \\times 2 \\times 10^9', note: 'One machine nanosecond becomes two human seconds: RAM 150 us = 3.472222 days; SSD 10 ms = 231.481481 days (7.6 months); HDD 150 ms = 9.5064263 years.' },
    { kind: 'formula', name: 'The lane budget', latex: '\\text{bundle (B/s)} = \\text{lanes} \\times \\text{per-lane rate (B/s)}', note: '16 x 1969.2308 MB/s = 31.5077 GB/s at gen4; at gen5, 16 x 3938.4615 = 63.0154 GB/s. SATA\'s toll: 6 Gbit/s x 8/10 = 600 MB/s.' },
    { kind: 'heading', text: 'The Vocabulary Harvest' },
    { kind: 'para', text: 'Twelve terms, one per column of the one map - the four seats, the workforce\'s two instruments, the ladder\'s three ideas, and the roads\' three jobs. The glossary takes these whole; the bench takes them as shorthand. If any definition still needs its recap to make sense, that recap is your next five minutes.' },
    { kind: 'terms', items: [
      { term: 'Motherboard', def: 'The printed board that hosts every other component - the city plan of 4.1, from the IBM PC\'s August 1981 planar habit to Nehalem\'s 2008 folding of the memory controller into the processor.' },
      { term: 'Form factor', def: 'The named footprint a board agrees to: ATX at 305 x 244 mm = 74,420 mm2 (1995), microATX at 59,536 mm2 = 0.800000 of ATX, Mini-ITX at 170 x 170 mm = 28,900 mm2 (VIA, 2001).' },
      { term: 'Chipset', def: 'The board\'s town hall - the silicon that stitches the slower districts (ports, storage, legacy) to the processor\'s roads, and the seat where the 24-pin and 8-pin power feeds arrive.' },
      { term: 'The cycle', def: 'The processor\'s four-stage day - fetch, decode, execute, write back - turning once per instruction, forever, at the tempo the clock sets.' },
      { term: 'Clock', def: 'The machine\'s metronome: 1 GHz = 10^9 cycles/s, so a 5 GHz clock beats every 0.2 ns. Cores multiply the workforce, never the tempo - the summed-GHz trap.' },
      { term: 'Moore\'s law', def: 'The 1965 observation (revised 1975) that transistor counts double every two years: 2,300 in 1971 predicts 2,300 x 2^26 = 154,350,387,200 for 2023 - graded honest at 1.151869x high.' },
      { term: 'Memory hierarchy', def: 'The ladder of rungs - registers, L1/L2/L3, RAM, SSD, HDD, cloud - each rung bigger and cheaper but slower than the one above; FAST-BIG-CHEAP, pick two.' },
      { term: 'Latency', def: 'The time one visit costs: the census pins 0.5 ns / 7 ns / 100 ns / 150 us / 10 ms / 150 ms - a 300,000,000x span from the registers to the HDD ocean.' },
      { term: 'Locality', def: 'The two habits that make caches work: temporal (reuse what you just used) and spatial (use what sits beside it). The ladder\'s secret engine.' },
      { term: 'Bus', def: 'One of the three roads inside the box: the address bus asks WHERE (32 lines reach 2^32 = 4,294,967,296 bytes = 4 GiB), the data bus carries WHAT, the control bus times WHEN.' },
      { term: 'Lane (PCIe)', def: 'One expandable freight road: 250 MB/s at gen1, 984.6154 at gen3, 1969.2308 at gen4, 3938.4615 at gen5 - and lane bandwidth adds, so x16 at gen4 bundles 31.5077 GB/s.' },
      { term: 'Port wall', def: 'Where the box meets the world: USB (1996, 12 Mbit/s) through USB4 (2019, 40 Gbit/s) with USB-C from August 2014; HDMI 4.95 to 48 Gbit/s (9.69697x); SATA 3.0 tolling to 600 MB/s.' },
    ] },

    // ================================================================
    // 8. CHECK YOURSELF (the quiz, key pinned [3, 1, 0, 1, 2])
    // ================================================================
    { kind: 'heading', text: 'Check Yourself' },
    { kind: 'para', text: 'Five questions, one from each ridge of the review: the cycle, the clock, the ladder, the road bundle and the port wall. Choose before you read on - each explanation says not only why the keyed answer is right but why every other option fails.' },
    { kind: 'quiz', items: [
      { q: 'The four stages of the processor cycle run, in order -', options: [
        'decode -> fetch -> execute -> write back',
        'fetch -> execute -> decode -> write back',
        'fetch -> decode -> write back -> execute',
        'fetch -> decode -> execute -> write back',
      ], answer: 3, explain: 'The cycle fetches the instruction, decodes what it means, executes it, and writes the result back - 4.2\'s pinned four-stage day, re-quoted in this review\'s one map. Option (a) decodes before anything is fetched: the worker reads a memo that has not arrived. Option (b) executes before decoding, acting on an order not yet read - swinging before the instruction lands. Option (c) writes back before executing, filing a result that does not yet exist - the ledger filled before the work. Only (d) keeps the station\'s four beats in their honest order, which is why every recap of this chapter quotes it in exactly that sequence.' },
      { q: 'One beat of a 5 GHz clock lasts -', options: [
        '2 ns',
        '0.2 ns',
        '5 ns',
        '0.5 ns',
      ], answer: 1, explain: 'The pinned law: $1\\text{ GHz} = 10^9$ cycles per second, so 5 GHz beats five billion times a second and one beat lasts $1 \\div (5 \\times 10^9)\\text{ s} = 0.2\\text{ ns}$ - the review\'s clock witness and the check mark of bench question 2. Option (a), 2 ns, is the beat of a 0.5 GHz clock - the decimal inverted and the point lost. Option (c), 5 ns, reads the frequency\'s own number as a time: a gigahertz is not a nanosecond. Option (d), 0.5 ns, is the beat of 2 GHz - the reciprocal taken of the wrong quantity. Only (b) divides one second by five billion beats, exactly as the law commands.' },
      { q: 'The RAM rung of the latency census is -', options: [
        '150 us, sitting 1,500x below L2',
        '150 ns, sitting 1,500x below L2',
        '15 ms, sitting 66.6667x below L2',
        '100 ns, sitting 200x below L1',
      ], answer: 0, explain: 'The census pins RAM at $150\\text{ }\\mu\\text{s}$ - a microsecond being a thousand nanoseconds - which sits $1{,}500\\times$ below L2\'s 100 ns: option (a), value and factor both honest. Option (b), 150 ns, misplaces the micro prefix: RAM only $1.5\\times$ slower than L2 would collapse the ladder the whole chapter leans on. Option (c), 15 ms, inflates the SSD\'s neighbourhood (10 ms) by a rung and borrows the SSD-over-RAM factor against the wrong baseline. Option (d), 100 ns with a 200x figure, is L2 itself wearing RAM\'s name - the L2-vs-registers ratio smuggled one row down. Only (a) keeps both numbers pinned where the census keeps them.' },
      { q: 'Sixteen PCIe lanes at generation 4 move, in total -', options: [
        '1,969.2308 MB/s',
        '31.5077 GB/s',
        '3,938.4615 MB/s',
        '250 MB/s',
      ], answer: 1, explain: 'One gen4 lane moves $1969.2308\\text{ MB/s}$ of payload, and lane bandwidth ADDS: $16 \\times 1969.2308 = 31{,}507.7\\text{ MB/s} = 31.5077\\text{ GB/s}$ - the review\'s road witness, reconstructed twice (recap illustration and bench question 10). Option (a) is ONE lane at gen4 - the bundle forgotten entirely. Option (c), 3,938.4615 MB/s, is one lane at gen5 - the wrong generation\'s doubling. Option (d), 250 MB/s, is one lane at gen1 - 1996\'s road priced for 2020s freight. Only (b) multiplies the per-lane rate by the lane count, which is what "x16" means.' },
      { q: 'USB 2.0 arrived on 27 April 2000 carrying 480 Mbit/s. How many times the 1996 original\'s 12 Mbit/s is that?', options: [
        '10.4167x',
        '8x',
        '40x',
        '9.69697x',
      ], answer: 2, explain: 'The census divides: $480 \\div 12 = 40$ - option (c), the first gate of the USB timeline. Option (a), 10.4167x, is USB 3.0\'s gate ($5{,}000 \\div 480$) - the next generation\'s ratio worn a generation early. Option (b), 8x, is USB4\'s gate over USB 3.0 ($40{,}000 \\div 5{,}000$) - the last step mistaken for the first. Option (d), 9.69697x, is HDMI\'s leap ($48 \\div 4.95$) - the screen road\'s ratio smuggled onto the port wall. Only (c) divides the 2000 rate by the 1996 rate, which is what "how many times the original" asks.' },
    ] },
    { kind: 'para', text: 'The chapter closes as it opened: a case, now open; a city, now working; a workforce, now timed; a library, now laddered; roads, now priced. Next door, a manager. Walk through holding the map.' },
  ],
}

/* F-fig helpers appended per batch (function declarations hoist) */
function cf4RMooreSvg(): string {
  const W = 760, H = 236
  const s: string[] = []
  const X0 = 300, W_BAR = 320
  const wA = (134e9 / 154350387200) * W_BAR
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The Moore census. A chain on the left: the 4004 of 15 November 1971 with 2,300 transistors, then an arrow labelled 26 doublings at the revised two-year pace. On the right, two bars to one scale: the prediction 2,300 times 2 to the 26 is 154,350,387,200 transistors, the full width; the M2 Ultra actually shipped 134,000,000,000, about four-fifths of the bar. The prediction stands 1.151869 times high, 15.1869 percent above the actual.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(380, 22, 'THE MOORE CENSUS - 26 DOUBLINGS, GRADED HONESTLY', 12, c4R.ink, 'middle', 'bold'))
  s.push(cf4RBox(24, 44, 236, 62, c4R.panelB, c4R.teal))
  s.push(cf4RT(142, 66, '1971: the Intel 4004', 11, c4R.tealInk, 'middle', 'bold'))
  s.push(cf4RT(142, 84, '2,300 transistors, 740 kHz', 10, c4R.ink))
  s.push(cf4RT(142, 98, '15 November 1971', 10, c4R.ink))
  s.push(cf4RArrowH(262, 296, 75, c4R.mid))
  s.push(cf4RT(279, 62, '26', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(279, 94, 'doublings', 9, c4R.warn, 'middle'))
  s.push(`<rect x="${X0}" y="52" width="${W_BAR}" height="26" rx="4" fill="${c4R.conn}"/>`)
  s.push(cf4RT(X0 + W_BAR + 10, 70, '2,300 x 2^26 = 154,350,387,200', 10.5, c4R.conn, 'start'))
  s.push(`<rect x="${X0}" y="104" width="${wA}" height="26" rx="4" fill="${c4R.teal}"/>`)
  s.push(cf4RT(X0 + W_BAR + 10, 122, 'M2 Ultra = 134,000,000,000', 10.5, c4R.tealInk, 'start'))
  s.push(cf4RArrowV(X0 + 60, 150, 80, c4R.accent))
  s.push(cf4RT(X0 + 72, 158, 'the prediction is 1.151869x the actual - 15.1869% above', 10.5, c4R.accent, 'start'))
  s.push(cf4RT(380, 196, 'Moore: 19 April 1965, revised 1975 to every two years - 52 years give 26 doublings', 10, c4R.ink))
  s.push(cf4RT(380, 216, 'a law graded close, not exact - and the grading is the lesson', 10, c4R.warn))
  s.push('</svg>')
  return s.join('')
}

function cf4RTriangleSvg(): string {
  const W = 560, H = 316
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The FAST, BIG, CHEAP triangle with the ladder rungs placed. The apex is the SRAM corner: registers at 0.5 nanoseconds, L1 at 7, L2 at 100 - fast and cheap per access but small, at 6 transistors a bit. The centre holds RAM at 150 microseconds, the balance point, 1,500 times below L2 and 66.6667 times above the SSD. The floor holds SSD at 10 milliseconds, HDD at 150 milliseconds and the cloud - big and cheap but slow. The verdict: pick two, pay the third.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(`<polygon points="280,44 70,258 490,258" fill="${c4R.panelA}" stroke="${c4R.conn}" stroke-width="2"/>`)
  s.push(cf4RT(280, 30, 'FAST', 13, c4R.conn, 'middle', 'bold'))
  s.push(cf4RT(52, 274, 'BIG', 13, c4R.teal, 'middle', 'bold'))
  s.push(cf4RT(508, 274, 'CHEAP', 13, c4R.struct, 'middle', 'bold'))
  s.push(cf4RT(280, 66, 'registers 0.5 ns - L1 7 ns - L2 100 ns', 10, c4R.conn, 'middle', 'bold'))
  s.push(cf4RT(280, 82, 'the SRAM corner: 6 transistors a bit', 9.5, c4R.tealInk, 'middle'))
  s.push(cf4RBox(168, 128, 224, 52, c4R.panelB, c4R.accent))
  s.push(cf4RT(280, 148, 'RAM - the balance point', 11, c4R.accent, 'middle', 'bold'))
  s.push(cf4RT(280, 166, '150 us: 1,500x below L2, 66.6667x above SSD', 9.5, c4R.ink, 'middle'))
  s.push(cf4RT(280, 196, 'L3 sits between L2 and RAM - one more treaty rung', 9.5, c4R.tealInk, 'middle'))
  s.push(cf4RT(280, 226, 'SSD 10 ms - HDD 150 ms - the cloud beyond', 10, c4R.teal, 'middle', 'bold'))
  s.push(cf4RT(280, 244, 'BIG and CHEAP, but 66.6667x and 15x slower', 9.5, c4R.tealInk, 'middle'))
  s.push(cf4RT(280, 292, 'PICK TWO - THE THIRD IS THE PRICE', 11.5, c4R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* 4.4 recap figure - the port census as one timeline strip */
function cf4RPortsSvg(): string {
  const W = 760, H = 258
  const s: string[] = []
  const xs = [96, 270, 444, 618], NW = 136
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The port census as one timeline strip on an even grid. Row one, PCIe per lane: gen1 at 250 MB/s, gen3 at 984.6154, gen4 at 1969.2308, gen5 at 3938.4615 - each generation doubles the lane, and sixteen lanes at gen4 bundle 31.5077 GB/s. Row two, the USB ports: 1996 at 12 Mbit/s, 2000 at 480 (40 times), 2008 at 5 Gbit/s (10.4167 times), 2019 at 40 Gbit/s (8 times), with the USB-C plug arriving August 2014. Row three, HDMI leaping 9.69697 times from 4.95 to 48 Gbit/s, and SATA 3.0 tolling 6 Gbit/s down to 600 MB/s raw. Beneath, the address bus reaches 4,294,967,296 bytes, exactly 4 GiB.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(380, 22, 'THE PORT CENSUS - THREE FAMILIES, ONE WALL', 12, c4R.ink, 'middle', 'bold'))
  const rows: [string, number, string[], string][] = [
    ['PCIe per lane', 44, ['gen1: 250 MB/s', 'gen3: 984.6154', 'gen4: 1969.2308', 'gen5: 3938.4615'], c4R.accent],
    ['USB ports', 120, ['1996: 12 Mbit/s', '2000: 480 Mbit/s', '2008: 5 Gbit/s', '2019: 40 Gbit/s'], c4R.teal],
  ]
  rows.forEach((r) => {
    s.push(cf4RT(16, r[1] + 19, r[0], 9.5, c4R.tealInk, 'start', 'bold'))
    r[2].forEach((t, i) => {
      s.push(cf4RBox(xs[i], r[1], NW, 30, i % 2 === 0 ? c4R.panelA : c4R.panelB, r[3]))
      s.push(cf4RT(xs[i] + NW / 2, r[1] + 19, t, 9.5, c4R.ink))
      if (i < 3) s.push(cf4RArrowH(xs[i] + NW, xs[i] + NW + 34, r[1] + 15, r[3]))
    })
  })
  s.push(cf4RT(380, 90, 'each generation doubles the lane - x16 at gen4 = 31.5077 GB/s', 10, c4R.accent, 'middle', 'bold'))
  s.push(cf4RT(xs[0] + NW + 17, 163, '40x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(xs[1] + NW + 17, 163, '10.4167x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(xs[2] + NW + 17, 163, '8x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(380, 180, 'the USB-C plug arrives August 2014 - one reversible plug for every speed', 10, c4R.ink))
  s.push(cf4RT(16, 219, 'HDMI + SATA', 9.5, c4R.tealInk, 'start', 'bold'))
  s.push(cf4RBox(96, 200, 178, 32, c4R.panelA, c4R.conn))
  s.push(cf4RT(185, 221, 'HDMI 1.0 (2002): 4.95 Gbit/s', 9.5, c4R.ink))
  s.push(cf4RArrowH(274, 322, 216, c4R.conn))
  s.push(cf4RT(298, 210, '9.69697x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RBox(322, 200, 170, 32, c4R.panelB, c4R.conn))
  s.push(cf4RT(407, 215, 'HDMI 2.1 (2017): 48 Gbit/s', 9.5, c4R.ink))
  s.push(cf4RBox(540, 200, 210, 32, c4R.panelA, c4R.struct))
  s.push(cf4RT(645, 214, 'SATA 3.0: 6 Gbit/s, 8b/10b', 9.5, c4R.ink))
  s.push(cf4RT(645, 228, '= 600 MB/s raw', 9.5, c4R.ink))
  s.push(cf4RT(380, 252, 'the three buses ask WHERE, carry WHAT, time WHEN - 2^32 = 4,294,967,296 bytes = 4 GiB of reach', 10, c4R.tealInk, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* F4 - the forward-door hiring notice */
function cf4RDoorSvg(): string {
  const W = 760, H = 216
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The forward-door sketch: a hiring notice pinned to the city of chapter 4. It reads: MANAGER WANTED - THE CITY OF CHAPTER 4 HIRES. Chapter 5 opens: Software Families. System software versus application software, priced on your own machine. The manager layer: the Operating System's doorstep. Utilities - installing and licensing, honestly. A small doorway stands open beneath the lines.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RBox(120, 24, 520, 168, c4R.panelB, c4R.conn, 8))
  s.push(cf4RT(380, 54, 'MANAGER WANTED - THE CITY OF CHAPTER 4 HIRES', 12.5, c4R.conn, 'middle', 'bold'))
  s.push(cf4RT(380, 82, 'Chapter 5 opens: Software Families', 10.5, c4R.ink))
  s.push(cf4RT(380, 102, 'system software vs application software, priced on your own machine', 10.5, c4R.ink))
  s.push(cf4RT(380, 122, 'the manager layer: the Operating System\'s doorstep', 10.5, c4R.ink))
  s.push(cf4RT(380, 142, 'utilities - installing and licensing, honestly', 10.5, c4R.ink))
  s.push(`<rect x="368" y="154" width="24" height="30" fill="${c4R.white}" stroke="${c4R.struct}" stroke-width="2"/>`)
  s.push(`<circle cx="387" cy="170" r="1.6" fill="${c4R.struct}"/>`)
  s.push(cf4RT(380, 204, 'the next door, drawn honest - no clip-art faces, just the role', 10, c4R.tealInk))
  s.push('</svg>')
  return s.join('')
}

/* solution figures for the bench */
function cf4RSolCitySvg(): string {
  const W = 360, H = 232
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The mini city plan: one board rectangle holding the CPU socket at its centre, two 288-pin DIMM slots at the left, the chipset town hall at the lower right, the 24-pin and 8-pin power feeds along the top edge, and the CR2032 coin cell at 3 V near the upper right corner - question 1's board with its pinned fittings in place.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(180, 18, "THE MINI CITY PLAN - 4.1'S BOARD", 11, c4R.ink, 'middle', 'bold'))
  s.push(`<rect x="16" y="30" width="328" height="178" rx="6" fill="${c4R.white}" stroke="${c4R.struct}" stroke-width="2"/>`)
  s.push(`<rect x="150" y="40" width="56" height="16" rx="3" fill="${c4R.accent}"/>`)
  s.push(cf4RT(178, 52, '24-pin', 9, c4R.white, 'middle'))
  s.push(`<rect x="212" y="40" width="30" height="16" rx="3" fill="${c4R.accent}"/>`)
  s.push(cf4RT(227, 52, '8-pin', 9, c4R.white, 'middle'))
  s.push(`<circle cx="310" cy="68" r="13" fill="${c4R.panelB}" stroke="${c4R.accent}" stroke-width="1.5"/>`)
  s.push(cf4RT(310, 90, 'CR2032', 9, c4R.ink))
  s.push(cf4RT(310, 101, '3 V', 9, c4R.ink))
  s.push(`<rect x="44" y="62" width="10" height="120" rx="2" fill="${c4R.struct}"/>`)
  s.push(`<rect x="60" y="62" width="10" height="120" rx="2" fill="${c4R.struct}"/>`)
  s.push(cf4RT(84, 70, 'DIMM slots', 9.5, c4R.ink, 'start'))
  s.push(cf4RT(84, 83, '288 pins', 9, c4R.tealInk, 'start'))
  s.push(`<rect x="150" y="84" width="80" height="52" rx="4" fill="${c4R.teal}"/>`)
  s.push(cf4RT(190, 112, 'CPU socket', 9.5, c4R.white, 'middle', 'bold'))
  s.push(cf4RT(190, 126, 'the worker', 9, c4R.white, 'middle'))
  s.push(`<rect x="250" y="146" width="84" height="44" rx="4" fill="${c4R.panelB}" stroke="${c4R.conn}" stroke-width="1.5"/>`)
  s.push(cf4RT(292, 166, 'chipset', 9.5, c4R.conn, 'middle', 'bold'))
  s.push(cf4RT(292, 180, 'town hall', 9, c4R.tealInk, 'middle'))
  s.push(cf4RT(180, 224, 'the city plan hosts 4.2\'s worker', 9.5, c4R.tealInk))
  s.push('</svg>')
  return s.join('')
}

function cf4RSolLadderSvg(): string {
  const W = 380, H = 190
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The latency ladder, priced: four rung boxes reading registers 0.5 ns, L1 7 ns, L2 100 ns, RAM 150 us, with the factor witnesses 14x, 14.2857x and 1,500x between the rungs, and two notes beneath - one L2 miss equals 14.2857 L1 hits, one RAM visit equals 1,500 L2 misses. Locality keeps the program on the left rungs.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(190, 20, 'THE LATENCY LADDER, PRICED', 11, c4R.ink, 'middle', 'bold'))
  const rungs: [string, string, number][] = [
    ['registers', '0.5 ns', 16], ['L1', '7 ns', 106], ['L2', '100 ns', 196], ['RAM', '150 us', 286],
  ]
  rungs.forEach((r, i) => {
    s.push(cf4RBox(r[2], 44, 76, 44, i < 2 ? c4R.panelA : c4R.panelB, i < 2 ? c4R.conn : c4R.teal))
    s.push(cf4RT(r[2] + 38, 62, r[0], 10, c4R.ink, 'middle', 'bold'))
    s.push(cf4RT(r[2] + 38, 78, r[1], 10, c4R.tealInk, 'middle'))
  })
  s.push(cf4RT(99, 106, '14x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(189, 106, '14.2857x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(279, 106, '1,500x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(16, 134, 'one L2 miss = 14.2857 L1 hits', 10, c4R.ink, 'start'))
  s.push(cf4RT(16, 152, 'one RAM visit = 1,500 L2 misses', 10, c4R.ink, 'start'))
  s.push(cf4RT(16, 176, 'locality keeps the program on the left rungs', 9.5, c4R.tealInk, 'start'))
  s.push('</svg>')
  return s.join('')
}

function cf4RSolAreaSvg(): string {
  const W = 380, H = 170
  const s: string[] = []
  const wI = (28900 / 74420) * 300
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="Two footprints on one scale: the ATX bar at full width naming 74,420 square millimetres, and the Mini-ITX bar at 0.388336 of that width naming 28,900 square millimetres. Beneath, the two closes: 28,900 over 74,420 equals 0.388336, and 74,420 over 28,900 equals 2.5751 - two ITX boards tile one ATX, nearly.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(190, 18, 'TWO FOOTPRINTS, ONE SCALE', 11, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(20, 36, 'ATX: 74,420 mm2', 10, c4R.ink, 'start'))
  s.push(`<rect x="20" y="42" width="300" height="28" rx="4" fill="${c4R.struct}"/>`)
  s.push(cf4RT(20, 86, 'Mini-ITX: 28,900 mm2', 10, c4R.ink, 'start'))
  s.push(`<rect x="20" y="92" width="${wI}" height="28" rx="4" fill="${c4R.conn}"/>`)
  s.push(cf4RT(20, 138, '28,900 / 74,420 = 0.388336 of ATX', 10, c4R.ink, 'start'))
  s.push(cf4RT(20, 158, '74,420 / 28,900 = 2.5751 - two ITX tile one ATX, nearly', 10, c4R.ink, 'start'))
  s.push('</svg>')
  return s.join('')
}

function cf4RSolBarsSvg(): string {
  const W = 380, H = 200
  const s: string[] = []
  const wOf = (mbps: number) => 30 + (Math.log10(mbps) - 1) * 70
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="Three roads in one unit on a log scale: USB 2.0 at 60 MB/s, SATA 3.0 at 600 MB/s, and the PCIe gen4 x16 bundle at 31,507.7 MB/s - each bar one factor-of-ten step longer than the last. The notes close the ratios: 600 is 10 times 60, and 31,507.7 is 52.5128 times 600.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(190, 18, 'THREE ROADS IN ONE UNIT (LOG SCALE)', 11, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(20, 38, 'USB 2.0: 60 MB/s', 10, c4R.ink, 'start'))
  s.push(`<rect x="20" y="44" width="${wOf(60)}" height="22" rx="4" fill="${c4R.teal}"/>`)
  s.push(cf4RT(20, 82, 'SATA 3.0: 600 MB/s', 10, c4R.ink, 'start'))
  s.push(`<rect x="20" y="88" width="${wOf(600)}" height="22" rx="4" fill="${c4R.conn}"/>`)
  s.push(cf4RT(20, 126, 'PCIe x16 gen4: 31,507.7 MB/s', 10, c4R.ink, 'start'))
  s.push(`<rect x="20" y="132" width="${wOf(31507.7)}" height="22" rx="4" fill="${c4R.accent}"/>`)
  s.push(cf4RT(20, 170, 'each bar is a factor-of-ten step on a log scale', 9.5, c4R.tealInk, 'start'))
  s.push(cf4RT(20, 188, '600 = 10 x 60;  31,507.7 = 52.5128 x 600', 10, c4R.ink, 'start'))
  s.push('</svg>')
  return s.join('')
}

function cf4RSolPipeSvg(): string {
  const W = 380, H = 252
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="One build, four prices: four stacked boxes reading THE BOARD, microATX 59,536 square millimetres, 0.800000 of ATX; THE WORKFORCE, four cores at 3 GHz, beat 0.3333 ns, never say 12 GHz; THE LADDER, RAM 150 us, 1,500 times below L2; THE ROAD, x16 at gen4, 31.5077 GB/s. The verdict line beneath: FAST and BIG bought, CHEAP is the price.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(190, 18, 'ONE BUILD, FOUR PRICES', 11, c4R.ink, 'middle', 'bold'))
  s.push(cf4RBox(30, 28, 320, 38, c4R.panelA, c4R.struct))
  s.push(cf4RT(190, 44, 'THE BOARD: microATX = 59,536 mm2', 9.5, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(190, 58, '= 0.800000 of ATX', 9.5, c4R.tealInk, 'middle'))
  s.push(cf4RArrowV(190, 66, 80, c4R.mid))
  s.push(cf4RBox(30, 80, 320, 44, c4R.panelB, c4R.teal))
  s.push(cf4RT(190, 96, 'THE WORKFORCE: 4 cores x 3 GHz', 9.5, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(190, 112, 'beat 0.3333 ns - never say 12 GHz', 9.5, c4R.warn, 'middle'))
  s.push(cf4RArrowV(190, 124, 138, c4R.mid))
  s.push(cf4RBox(30, 138, 320, 38, c4R.panelA, c4R.conn))
  s.push(cf4RT(190, 154, 'THE LADDER: RAM 150 us = 1,500x below L2', 9.5, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(190, 168, 'the census balance rung', 9, c4R.tealInk, 'middle'))
  s.push(cf4RArrowV(190, 176, 190, c4R.mid))
  s.push(cf4RBox(30, 190, 320, 38, c4R.panelB, c4R.accent))
  s.push(cf4RT(190, 206, 'THE ROAD: x16 at gen4 = 31.5077 GB/s', 9.5, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(190, 220, 'the freight lane priced per second', 9, c4R.tealInk, 'middle'))
  s.push(cf4RT(190, 246, 'FAST and BIG bought; CHEAP is the price', 10, c4R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}


export const chapter4: Chapter = {
  number: 4,
  slug: 'inside-the-box',
  title: 'Inside the Box',
  summary:
    'The motherboard as a city plan, the processor named honestly (cores, clock, cache — the vocabulary without the architecture theory), the first memory hierarchy (RAM, ROM, the storage ladder from registers to the cloud), and how the pieces talk: buses and ports at the first-meeting level; Computer Organization and Architecture takes the theory door.',
  status: 'complete',
  lessons: [
    lesson41, lesson42, lesson43, lesson44, lesson4R,
  ],
  plannedLessons: [],
}
