/* part-cf6R - lesson 6.R 'Unit 6 Completion Review' (the chapter-closing review).
   Harvest numbers carried VERBATIM from the three content seats (6.1-6.3);
   the review invents no numbers, it restates the chapter at bench speed.
   Helpers prefixed cf6R so the four chapter parts never collide. */
import type { Lesson } from '../../../src/data/library/types'

/* palette (vivid set; never blue/indigo) */
const cf6RC = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const cf6RF = 'ui-sans-serif, system-ui, sans-serif'

/* ---------- SVG fragment helpers (all geometry computed) ---------- */
function cf6REsc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function cf6RT(x: number, y: number, s: string, size: number, fill: string, anchor: string, weight = '400'): string {
  return `<text x="${x}" y="${y}" font-family="${cf6RF}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${cf6REsc(s)}</text>`
}
function cf6RBox(x: number, y: number, w: number, h: number, fill: string, stroke: string, rx = 8): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`
}
function cf6RArrow(x1: number, y1: number, x2: number, y2: number, stroke: string, label?: string): string {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const h = 7
  const p1x = x2 - h * Math.cos(a - 0.45), p1y = y2 - h * Math.sin(a - 0.45)
  const p2x = x2 - h * Math.cos(a + 0.45), p2y = y2 - h * Math.sin(a + 0.45)
  let out = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="2"/>` +
    `<polygon points="${x2},${y2} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" fill="${stroke}"/>`
  if (label) out += cf6RT((x1 + x2) / 2, (y1 + y2) / 2 - 6, label, 10, stroke, 'middle', '600')
  return out
}
function cf6RLine(x1: number, y1: number, x2: number, y2: number, stroke: string, sw = 1.5): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"/>`
}

/* ---------- FIG A: the unit map (three lesson columns -> the review bar) ---------- */
function cf6RMapSvg(): string {
  const W = 960, H = 650
  const cols: { x: number; head: string; hf: string; hs: string; hi: string; ns: string; nodes: string[][] }[] = [
    {
      x: 40, head: '6.1  The Network Idea', hf: cf6RC.panelA, hs: cf6RC.conn, hi: cf6RC.accent, ns: cf6RC.conn,
      nodes: [
        ['5 components: sender,', 'receiver, message, medium,', 'protocol (the rules)'],
        ['Span census: PAN, LAN,', 'MAN, WAN - and the Internet', 'is the largest WAN'],
        ['Topologies: star n - 1,', 'bus 1, ring n,', 'mesh n(n-1)/2 links'],
        ['Units ladder: 2^10 to', '2^40 bps; 1 MBps = 8 Mbps;', 'bandwidth vs latency'],
        ['Packets: header over', 'payload; 750 B -> 3 x 270', '= 810 B, 7.41% overhead'],
      ],
    },
    {
      x: 350, head: '6.2  The Internet', hf: cf6RC.faint, hs: cf6RC.teal, hi: cf6RC.tealInk, ns: cf6RC.teal,
      nodes: [
        ['Tier ladder: 6 rungs,', 'device -> modem -> ISPs', '-> the backbone'],
        ['TCP/IP, the treaty;', 'flag day 1 January 1983,', 'NCP out at one stroke'],
        ['Beats 1969 - 1995 with', 'gaps 14 / 3 / 9 / 26 and', 'the 2-2-2 Web run'],
        ['IPv4 32-bit; IPv6', '128-bit; MAC 48-bit,', 'burnt in: OUI + serial'],
        ['DNS: resolver -> root ->', 'TLD -> authoritative;', '13 roots A-M, port 53'],
      ],
    },
    {
      x: 660, head: '6.3  Browsing the Web', hf: cf6RC.panelB, hs: cf6RC.struct, hi: cf6RC.ink, ns: cf6RC.struct,
      nodes: [
        ['The Web = ONE service', 'riding the Internet;', 'email rides alongside'],
        ['URL: scheme, authority,', 'path, parameters, anchor;', 'ports 80 and 443'],
        ['HTTP: request then', 'response, stateless,', '404 = page not found'],
        ['HTTPS = HTTP over TLS;', 'the padlock; plain HTTP', 'is sniffable on Wi-Fi'],
        ['Cookies remember the', 'visit; phishing fakes the', 'site; read the domain'],
      ],
    },
  ]
  const HEAD_Y = 60, HEAD_H = 44, NODE_Y0 = 130, NODE_H = 62, NODE_GAP = 12
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Unit map of chapter 6: three lesson columns - The Network Idea, The Internet, Browsing the Web - each with five census nodes, chained by arrows, all feeding the completion review bar at the bottom.">`
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="${cf6RC.paper}"/>`
  s += cf6RT(W / 2, 32, 'THE UNIT MAP: CONNECTING COMPUTERS', 17, cf6RC.ink, 'middle', '700')
  s += cf6RT(W / 2, 54, 'the teaching chain: the conversation (6.1) -> the joined networks (6.2) -> the citizen Web (6.3) -> the review (6.R)', 11.5, cf6RC.tealInk, 'middle')
  cols.forEach((col) => {
    s += cf6RBox(col.x, HEAD_Y, 260, HEAD_H, col.hf, col.hs)
    s += cf6RT(col.x + 130, HEAD_Y + 28, col.head, 14.5, col.hi, 'middle', '700')
    col.nodes.forEach((lines, i) => {
      const ny = NODE_Y0 + i * (NODE_H + NODE_GAP)
      s += cf6RBox(col.x + 6, ny, 248, NODE_H, cf6RC.white, col.ns, 6)
      lines.forEach((ln, j) => { s += cf6RT(col.x + 130, ny + 22 + j * 15, ln, 11.5, cf6RC.ink, 'middle') })
    })
  })
  s += cf6RArrow(304, 300, 346, 300, cf6RC.conn)
  s += cf6RArrow(614, 300, 656, 300, cf6RC.conn)
  const nodeBot = NODE_Y0 + 4 * (NODE_H + NODE_GAP) + NODE_H
  cols.forEach((col) => { s += cf6RArrow(col.x + 130, nodeBot + 4, col.x + 130, 556, cf6RC.teal) })
  s += cf6RBox(40, 560, 880, 64, cf6RC.panelB, cf6RC.ink)
  s += cf6RT(480, 586, '6.R  UNIT 6 COMPLETION REVIEW', 14.5, cf6RC.ink, 'middle', '700')
  s += cf6RT(480, 608, 'the census re-run -> the Classify-12 board -> the gap arithmetic, re-drilled -> the bench of fifteen', 12, cf6RC.tealInk, 'middle')
  s += '</svg>'
  return s
}

/* ---------- FIG B: the Classify-12 board (4 families x 3 items) ---------- */
function cf6RClassifySvg(): string {
  const W = 960, H = 620
  const fams = [
    {
      name: 'SPAN', x: 20,
      clues: [['Bluetooth earbuds and', 'one phone on a desk'], ['one office building on', 'Ethernet, under 1 km'], ['a city\'s cable-TV', 'network, 30-40 km']],
      answers: ['PAN', 'LAN', 'MAN'],
      reasons: ['reach: about 10 m', 'reach: up to 1 km', 'reach: 30-40 km'],
    },
    {
      name: 'TOPOLOGY', x: 255,
      clues: [['n = 10 computers, every', 'pair directly cabled'], ['everyone wired to one', 'central switch'], ['one shared backbone', 'cable, cheap, collisions']],
      answers: ['MESH: 45 links', 'STAR: n - 1 links', 'BUS: 1 link'],
      reasons: ['n(n-1)/2 = 45', 'n - 1 = 9 at n = 10', 'one backbone, always'],
    },
    {
      name: 'PROTOCOL-SPEAKER', x: 490,
      clues: [['the flag day of', '1 January 1983'], ['the phonebook that', 'listens on port 53'], ['GET me this page -', 'the two-message dance']],
      answers: ['TCP/IP', 'DNS', 'HTTP'],
      reasons: ['the treaty family', '4 servers, port 53', 'request + response'],
    },
    {
      name: 'WEB-WORD', x: 725,
      clues: [['the padlock in the', 'address bar'], ['the honest page-not-', 'found answer'], ['Netscape 1994\'s', 'shopping-cart memory']],
      answers: ['HTTPS', '404', 'THE COOKIE'],
      reasons: ['HTTP over TLS', 'a response code', 'server sets, browser returns'],
    },
  ]
  const CARD_H = 150, CARD_GAP = 12, CARD_Y0 = 108, CW = 215
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The Classify-12 board: twelve short clues placed into four family columns - span, topology, protocol-speaker and web-word - three items in each column, with the answer and a one-line reason on every card.">`
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="${cf6RC.paper}"/>`
  s += cf6RT(W / 2, 30, 'THE CLASSIFY-12 BOARD: TWELVE ITEMS, FOUR FAMILIES, 3-3-3-3', 16, cf6RC.ink, 'middle', '700')
  fams.forEach((f, fi) => {
    const stroke = [cf6RC.conn, cf6RC.teal, cf6RC.accent, cf6RC.struct][fi]
    s += cf6RBox(f.x, 52, CW, 40, fi === 1 ? cf6RC.faint : cf6RC.panelA, stroke)
    s += cf6RT(f.x + CW / 2, 78, f.name, 13, fi === 1 ? cf6RC.tealInk : cf6RC.accent, 'middle', '700')
    f.clues.forEach((clue, i) => {
      const cy = CARD_Y0 + i * (CARD_H + CARD_GAP)
      s += cf6RBox(f.x, cy, CW, CARD_H, cf6RC.white, stroke, 6)
      s += cf6RT(f.x + CW / 2, cy + 26, clue[0], 11, cf6RC.ink, 'middle')
      s += cf6RT(f.x + CW / 2, cy + 42, clue[1], 11, cf6RC.ink, 'middle')
      s += cf6RLine(f.x + 14, cy + 58, f.x + CW - 14, cy + 58, stroke, 1)
      s += cf6RT(f.x + CW / 2, cy + 92, f.answers[i], 14.5, fi === 1 ? cf6RC.tealInk : cf6RC.accent, 'middle', '700')
      s += cf6RT(f.x + CW / 2, cy + 118, f.reasons[i], 10.5, cf6RC.ink, 'middle')
    })
  })
  s += cf6RT(W / 2, 610, 'counts: SPAN 3 + TOPOLOGY 3 + PROTOCOL-SPEAKER 3 + WEB-WORD 3 = 12 items sorted', 11.5, cf6RC.tealInk, 'middle')
  s += '</svg>'
  return s
}

/* ---------- FIG C: the timeline, re-priced (1969-1995, gaps on the arrows) ---------- */
function cf6RTimelineSvg(): string {
  const W = 960, H = 500, Y = 280
  const x = (t: number) => 70 + ((t - 1969) / 27) * 830
  const beats = [
    { t: 1969.8, row: 'above', l1: '1969 ARPANET', l2: 'first message: lo' },
    { t: 1983.0, row: 'near', l1: 'Jan 1983 flag day', l2: 'NCP -> TCP/IP' },
    { t: 1983.88, row: 'above', l1: 'Nov 1983 DNS', l2: 'names for numbers' },
    { t: 1986.0, row: 'deep', l1: '1986 ERNET', l2: 'research network' },
    { t: 1989.2, row: 'above', l1: 'Mar 1989 proposal', l2: 'Berners-Lee at CERN' },
    { t: 1991.6, row: 'near', l1: 'Aug 1991 first site', l2: 'info.cern.ch' },
    { t: 1993.25, row: 'above', l1: 'Apr 1993 CERN', l2: 'Web to public domain' },
    { t: 1995.6, row: 'deep', l1: 'Aug 1995 VSNL', l2: 'India online, 9.6 kbit/s', end: true },
  ]
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The chapter timeline re-priced: eight dated beats from ARPANET 1969 to VSNL 1995 on one axis, with the gaps 14, 3 and 2-2-2 printed on the arrows, the 9-year ERNET-to-VSNL bracket below, and the whole-span bracket 26 years above.">`
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="${cf6RC.paper}"/>`
  s += cf6RT(W / 2, 30, 'THE TIMELINE, RE-PRICED: GAPS ON THE ARROWS', 16, cf6RC.ink, 'middle', '700')
  s += cf6RT(W / 2, 52, 'eight beats, seven pinned gaps: 14 / 3 / 9 / 26 / 2 / 2 / 2', 12, cf6RC.tealInk, 'middle')
  /* the whole-span bracket: 26 years */
  const xA = x(1969.8), xB = x(1995.6)
  s += cf6RLine(xA, 100, xB, 100, cf6RC.ink, 2)
  s += cf6RLine(xA, 100, xA, 112, cf6RC.ink, 2)
  s += cf6RLine(xB, 100, xB, 112, cf6RC.ink, 2)
  s += cf6RT((xA + xB) / 2, 90, 'THE WHOLE SPAN: 1969 -> 1995 = 26 YEARS', 13, cf6RC.ink, 'middle', '700')
  /* the axis */
  s += cf6RLine(70, Y, 900, Y, cf6RC.ink, 2.5)
  /* gap labels on the arrows (adjacent beats) */
  const gapLabels: [number, number, string][] = [
    [x(1969.8), x(1983.0), '14 yrs'],
    [x(1983.88), x(1986.0), '3 yrs'],
    [x(1989.2), x(1991.6), '2 yrs'],
    [x(1991.6), x(1993.25), '2 yrs'],
    [x(1993.25), x(1995.6), '2 yrs'],
  ]
  gapLabels.forEach(([a, b, t]) => { s += cf6RT((a + b) / 2, 266, t, 11.5, cf6RC.accent, 'middle', '700') })
  /* the 9-year bracket below: ERNET -> VSNL */
  const xE = x(1986.0), xV = x(1995.6)
  s += cf6RLine(xE, 430, xV, 430, cf6RC.accent, 2)
  s += cf6RLine(xE, 430, xE, 418, cf6RC.accent, 2)
  s += cf6RLine(xV, 430, xV, 418, cf6RC.accent, 2)
  s += cf6RT((xE + xV) / 2, 452, '9 yrs: ERNET 1986 -> VSNL 1995 - India\'s wait', 12, cf6RC.accent, 'middle', '700')
  /* the beats: labels staggered above / near-below / deep-below */
  beats.forEach((b, i) => {
    const bx = x(b.t)
    s += `<circle cx="${bx.toFixed(1)}" cy="${Y}" r="5.5" fill="${i === 0 || i === 7 ? cf6RC.accent : cf6RC.white}" stroke="${cf6RC.teal}" stroke-width="2.5"/>`
    if (b.row === 'above') {
      s += cf6RLine(bx, Y - 8, bx, 240, cf6RC.teal, 1.2)
      s += cf6RT(bx, 222, b.l1, 12, cf6RC.ink, 'middle', '700')
      s += cf6RT(bx, 238, b.l2, 11, cf6RC.tealInk, 'middle')
    } else if (b.row === 'near') {
      s += cf6RLine(bx, Y + 8, bx, 320, cf6RC.teal, 1.2)
      s += cf6RT(bx, 338, b.l1, 12, cf6RC.ink, 'middle', '700')
      s += cf6RT(bx, 354, b.l2, 11, cf6RC.tealInk, 'middle')
    } else {
      s += cf6RLine(bx, Y + 8, bx, 350, cf6RC.teal, 1.2)
      const lx = (b as { end?: boolean }).end ? 940 : bx
      const anchor = (b as { end?: boolean }).end ? 'end' : 'middle'
      s += cf6RT(lx, 372, b.l1, 12, cf6RC.ink, anchor, '700')
      s += cf6RT(lx, 388, b.l2, 11, cf6RC.tealInk, anchor)
    }
  })
  s += '</svg>'
  return s
}

/* ---------- solution figure S1: the span census strip ---------- */
function cf6RSpanStripSvg(): string {
  const W = 760, H = 230
  const boxes = [
    { name: 'PAN', span: 'about 10 m', ex: 'your own desk' },
    { name: 'LAN', span: 'up to 1 km', ex: 'a building\'s Ethernet' },
    { name: 'MAN', span: '30 - 40 km', ex: 'a city, cable TV' },
    { name: 'WAN', span: 'countries', ex: 'continents joined' },
  ]
  const BW = 168, GAP = 16, X0 = 20, Y = 60, BH = 95
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Span census strip: PAN about 10 metres, LAN up to 1 kilometre, MAN 30 to 40 kilometres, WAN countries and continents, with the Internet named as the largest WAN.">`
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="${cf6RC.paper}"/>`
  s += cf6RT(W / 2, 28, 'THE SPAN CENSUS, ONE STRIP', 14.5, cf6RC.ink, 'middle', '700')
  boxes.forEach((b, i) => {
    const bx = X0 + i * (BW + GAP)
    s += cf6RBox(bx, Y, BW, BH, i === 3 ? cf6RC.faint : cf6RC.white, i === 3 ? cf6RC.teal : cf6RC.conn, 6)
    s += cf6RT(bx + BW / 2, Y + 32, b.name, 16, i === 3 ? cf6RC.tealInk : cf6RC.accent, 'middle', '700')
    s += cf6RT(bx + BW / 2, Y + 56, b.span, 11.5, cf6RC.ink, 'middle')
    s += cf6RT(bx + BW / 2, Y + 76, b.ex, 10.5, cf6RC.tealInk, 'middle')
    if (i < 3) s += cf6RArrow(bx + BW + 2, Y + BH / 2, bx + BW + GAP - 2, Y + BH / 2, cf6RC.accent)
  })
  s += cf6RT(W / 2, 195, 'and the Internet is the largest WAN of all - the network of networks', 12, cf6RC.ink, 'middle', '600')
  s += '</svg>'
  return s
}

/* ---------- solution figure S2: the units ladder ---------- */
function cf6RUnitsSvg(): string {
  const W = 760, H = 310
  const rungs = [
    { sym: '1 Kbps = 2^10 bps', val: '1,024 bps' },
    { sym: '1 Mbps = 2^20 bps', val: '1,048,576 bps' },
    { sym: '1 Gbps = 2^30 bps', val: '1,073,741,824 bps' },
    { sym: '1 Tbps = 2^40 bps', val: '1,099,511,627,776 bps' },
  ]
  const BW = 178, X0 = 16, BH = 48
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Units ladder: 1 Kbps is 2 to the 10, 1,024 bps; 1 Mbps is 2 to the 20, 1,048,576 bps; 1 Gbps is 2 to the 30; 1 Tbps is 2 to the 40; with the byte law 1 MBps = 8 Mbps in a bar below.">`
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="${cf6RC.paper}"/>`
  s += cf6RT(W / 2, 26, 'THE UNITS LADDER, CLIMBED', 14.5, cf6RC.ink, 'middle', '700')
  rungs.forEach((r, i) => {
    const rx = X0 + i * (BW + 6), ry = 215 - i * 45
    s += cf6RBox(rx, ry, BW, BH, cf6RC.white, cf6RC.teal, 6)
    s += cf6RT(rx + BW / 2, ry + 20, r.sym, 11.5, cf6RC.tealInk, 'middle', '600')
    s += cf6RT(rx + BW / 2, ry + 37, r.val, 10, cf6RC.ink, 'middle')
  })
  s += cf6RBox(X0, 262, W - 2 * X0, 34, cf6RC.panelB, cf6RC.conn)
  s += cf6RT(W / 2, 284, 'THE BYTE LAW: 1 MBps = 8 Mbps - so a 100 Mbps line tops out at 12.5 MBps', 12, cf6RC.ink, 'middle', '600')
  s += '</svg>'
  return s
}

/* ---------- solution figure S3: the DNS resolution order ---------- */
function cf6RResolveSvg(): string {
  const W = 760, H = 270
  const chips = [
    { name: 'browser', sub: 'types the name' },
    { name: 'recursive resolver', sub: 'the librarian' },
    { name: 'root server', sub: 'the index: .' },
    { name: 'TLD server', sub: 'the rack: .in' },
    { name: 'authoritative server', sub: 'the book' },
  ]
  const CW = 136, GAP = 14, X0 = 12, Y = 70, CH = 64
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="DNS lookup order: browser asks the recursive resolver, which asks a root server, then the TLD server, then the authoritative server; the answer returns and the browser sends HTTP to the IP. Port 53 and thirteen root servers noted.">`
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="${cf6RC.paper}"/>`
  s += cf6RT(W / 2, 26, 'THE DNS LOOKUP, IN ORDER', 14.5, cf6RC.ink, 'middle', '700')
  chips.forEach((c, i) => {
    const cx = X0 + i * (CW + GAP)
    s += cf6RBox(cx, Y, CW, CH, cf6RC.white, i === 0 ? cf6RC.conn : cf6RC.teal, 6)
    s += cf6RT(cx + CW / 2, Y + 27, c.name, 11.5, i === 0 ? cf6RC.accent : cf6RC.tealInk, 'middle', '700')
    s += cf6RT(cx + CW / 2, Y + 47, c.sub, 10, cf6RC.ink, 'middle')
    if (i < 4) {
      const ax = cx + CW
      s += cf6RArrow(ax + 1, Y + CH / 2, ax + GAP - 1, Y + CH / 2, cf6RC.accent)
      s += cf6RT(ax + GAP / 2, Y - 8, `${i + 1}`, 10.5, cf6RC.accent, 'middle', '700')
    }
  })
  const xLast = X0 + 4 * (CW + GAP) + CW / 2, xFirst = X0 + CW / 2
  s += `<path d="M ${xLast} ${Y + CH} L ${xLast} 185 L ${xFirst} 185 L ${xFirst} ${Y + CH + 6}" fill="none" stroke="${cf6RC.teal}" stroke-width="2"/>`
  s += `<polygon points="${xFirst},${Y + CH + 1} ${xFirst - 5},${Y + CH + 11} ${xFirst + 5},${Y + CH + 11}" fill="${cf6RC.teal}"/>`
  s += cf6RT(W / 2, 208, 'steps 5-8: the answer returns, and the browser sends HTTP to the IP', 11.5, cf6RC.tealInk, 'middle', '600')
  s += cf6RT(W / 2, 240, 'DNS listens on port 53; there are 13 root name servers, named A to M', 11, cf6RC.ink, 'middle')
  s += '</svg>'
  return s
}

/* ---------- solution figure S4: the topology count drill board ---------- */
function cf6RTopoDrillSvg(): string {
  const W = 760, H = 360
  const panels = [
    {
      name: 'STAR', formula: 'star: n - 1 links', count: 'at n = 10: 9 links', note1: 'centre is a single', note2: 'point of failure',
      draw: (cx: number, cy: number): string => {
        let out = ''
        const R = 34
        for (let i = 0; i < 5; i++) {
          const a = (-90 + i * 72) * Math.PI / 180
          const px = cx + R * Math.cos(a), py = cy + R * Math.sin(a)
          out += cf6RLine(cx, cy, px, py, cf6RC.conn, 1.5)
        }
        for (let i = 0; i < 5; i++) {
          const a = (-90 + i * 72) * Math.PI / 180
          out += `<circle cx="${(cx + R * Math.cos(a)).toFixed(1)}" cy="${(cy + R * Math.sin(a)).toFixed(1)}" r="5" fill="${cf6RC.white}" stroke="${cf6RC.conn}" stroke-width="2"/>`
        }
        out += `<circle cx="${cx}" cy="${cy}" r="6.5" fill="${cf6RC.accent}" stroke="${cf6RC.conn}" stroke-width="2"/>`
        return out
      },
    },
    {
      name: 'BUS', formula: 'bus: 1 backbone', count: 'at n = 10: 1 link', note1: 'cheap, but the', note2: 'collisions are shared',
      draw: (cx: number, cy: number): string => {
        let out = cf6RLine(cx - 46, cy, cx + 46, cy, cf6RC.teal, 3)
        for (let i = 0; i < 6; i++) {
          const px = cx - 37 + i * 14.8
          const py = i % 2 === 0 ? cy - 22 : cy + 22
          out += cf6RLine(px, cy, px, py, cf6RC.teal, 1.5)
          out += `<circle cx="${px.toFixed(1)}" cy="${py}" r="5" fill="${cf6RC.white}" stroke="${cf6RC.teal}" stroke-width="2"/>`
        }
        return out
      },
    },
    {
      name: 'RING', formula: 'ring: n links', count: 'at n = 10: 10 links', note1: 'each node joins two', note2: 'neighbours, one way',
      draw: (cx: number, cy: number): string => {
        let out = ''
        const R = 36, pts: [number, number][] = []
        for (let i = 0; i < 6; i++) {
          const a = (-90 + i * 60) * Math.PI / 180
          pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)])
        }
        pts.forEach((p, i) => { const q = pts[(i + 1) % 6]; out += cf6RLine(p[0], p[1], q[0], q[1], cf6RC.accent, 1.5) })
        pts.forEach((p) => { out += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" fill="${cf6RC.white}" stroke="${cf6RC.accent}" stroke-width="2"/>` })
        return out
      },
    },
    {
      name: 'MESH', formula: 'mesh: n(n-1)/2 links', count: 'at n = 10: 45 links', note1: '45 cables, or 10', note2: 'through one switch',
      draw: (cx: number, cy: number): string => {
        let out = ''
        const R = 34, pts: [number, number][] = []
        for (let i = 0; i < 6; i++) {
          const a = (-90 + i * 60) * Math.PI / 180
          pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)])
        }
        for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
          out += cf6RLine(pts[i][0], pts[i][1], pts[j][0], pts[j][1], cf6RC.struct, 1.2)
        }
        pts.forEach((p) => { out += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" fill="${cf6RC.white}" stroke="${cf6RC.struct}" stroke-width="2"/>` })
        return out
      },
    },
  ]
  const PW = 178, GAP = 10, X0 = 9, PY = 54, PH = 285
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Topology drill board: star, bus, ring and mesh panels drawn at six nodes each, with formulas and the counts at n = 10 - 9, 1, 10 and 45 links.">`
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="${cf6RC.paper}"/>`
  s += cf6RT(W / 2, 26, 'THE TOPOLOGY COUNTS, PICTURED AT n = 6, PRICED AT n = 10', 13.5, cf6RC.ink, 'middle', '700')
  panels.forEach((p, i) => {
    const px = X0 + i * (PW + GAP)
    s += cf6RBox(px, PY, PW, PH, cf6RC.white, [cf6RC.conn, cf6RC.teal, cf6RC.accent, cf6RC.struct][i], 6)
    s += cf6RT(px + PW / 2, PY + 24, p.name, 13, cf6RC.ink, 'middle', '700')
    s += p.draw(px + PW / 2, PY + 85)
    s += cf6RT(px + PW / 2, PY + 172, p.formula, 11.5, cf6RC.tealInk, 'middle', '600')
    s += cf6RT(px + PW / 2, PY + 200, p.count, 13, cf6RC.accent, 'middle', '700')
    s += cf6RT(px + PW / 2, PY + 228, p.note1, 10, cf6RC.ink, 'middle')
    s += cf6RT(px + PW / 2, PY + 243, p.note2, 10, cf6RC.ink, 'middle')
  })
  s += '</svg>'
  return s
}

/* ---------- solution figure S5: the 1995 patience board ---------- */
function cf6RPatienceSvg(): string {
  const W = 760, H = 240
  const chips = [
    { v: '60 MB', n: 'one file, 1995' },
    { v: 'x 8', n: 'bits per byte' },
    { v: '480 Mbit', n: 'the bit bill' },
    { v: '9,600 bps', n: 'the VSNL line' },
    { v: '50,000 s', n: 'the division' },
    { v: '13.9 h', n: '13 hrs 53 min' },
  ]
  const CW = 104, GAP = 12, X0 = 38, Y = 70, CH = 62
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The 1995 patience calculation as a chain: 60 MB times 8 is 480 Mbit; divided by the 9,600 bps line this is 50,000 seconds, which is 13.9 hours.">`
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="${cf6RC.paper}"/>`
  s += cf6RT(W / 2, 26, 'THE 1995 PATIENCE CALCULATION', 14.5, cf6RC.ink, 'middle', '700')
  chips.forEach((c, i) => {
    const cx = X0 + i * (CW + GAP)
    s += cf6RBox(cx, Y, CW, CH, i === 5 ? cf6RC.panelA : cf6RC.white, cf6RC.accent, 6)
    s += cf6RT(cx + CW / 2, Y + 26, c.v, 13.5, cf6RC.accent, 'middle', '700')
    s += cf6RT(cx + CW / 2, Y + 46, c.n, 9.5, cf6RC.ink, 'middle')
    if (i < 5) s += cf6RArrow(cx + CW + 1, Y + CH / 2, cx + CW + GAP - 1, Y + CH / 2, cf6RC.teal)
  })
  s += cf6RT(W / 2, 190, 'at the 1995 tariff: 5,200 rupees for 250 hours = 20.80 rupees per hour', 11.5, cf6RC.tealInk, 'middle')
  s += '</svg>'
  return s
}

export const lesson6R: Lesson = {
  id: 'cf-unit-6-completion-review',
  number: '6.R',
  title: 'Unit 6 Completion Review',
  concepts: [
    'the chapter in one map: the network idea, the Internet, the Web - three lessons, one teaching chain',
    'the census re-run: five components, four spans, four topologies, the units ladder, the address census, the URL five',
    'the Classify-12 board: twelve items sorted 3-3-3-3 across span, topology, protocol-speaker and web-word',
    'the honest re-checks: 15 links at n = 6, 810 bytes and 7.41%, the gap arithmetic 14/3/9/26/2/2/2, 13.9 hours of 1995 patience',
    'the formula and vocabulary harvest of the chapter',
    'the mixed bench: fifteen exam-style questions across all three lessons',
    'the doorsteps recap: what chapter 6 deliberately left closed',
  ],
  objectives: [
    'By the end of this lesson you can redraw the chapter\'s one map - 6.1\'s five-component path and topology census, 6.2\'s tier ladder, DNS and dated beats, 6.3\'s Web stack, URL anatomy and two-message dance - from memory.',
    'By the end of this lesson you can restate the chapter\'s engine-pinned censuses cold: the span census, the topology arithmetic at n = 4, 6 and 10, the units ladder, the address census, the URL five and the ports 80/443/53.',
    'By the end of this lesson you can sort the Classify-12 board without hesitating - twelve items, four families, 3-3-3-3 - and say the reason for every placement.',
    'By the end of this lesson you can re-derive the chapter\'s arithmetic witnesses: mesh 15 at n = 6 and 45 at n = 10, 810 bytes at 7.41% overhead, the gaps 14/3/9/26/2/2/2, 13.9 hours at 9.6 kbit/s, and the new 2,400 bps instance.',
    'By the end of this lesson you can sit the mixed bench: fifteen questions across all three lessons, at least three of them honest exam-style asks.',
  ],
  prerequisites: [
    'cf-the-network-idea',
    'cf-the-internet-a-network-of-networks',
    'cf-browsing-the-web-the-citizens-vocabulary',
  ],
  sources: ['cs-cf-web-ground-ch06'],
  blocks: [
    // ---------- the opening ----------
    { kind: 'para', text: 'Three lessons ago this chapter owned nothing but a working, staffed machine - chapter 5\'s box, hired, licensed and kept honest - and one question waiting on the bench: how do computers TALK to each other, and what world do they make when they do? Lesson 6.1, \'The Network Idea\', answered from the bench side: the five components of every data conversation, the span census from PAN to WAN, four topologies counted link by link, bandwidth and latency named honestly, and the packet - the envelope that makes a long message survivable. Lesson 6.2, \'The Internet: a Network of Networks\', answered from the joining side: the tier ladder from your device up to the backbone, the TCP/IP treaty, the dated beats from ARPANET\'s two-letter \'lo\' of 1969 to VSNL\'s gateway of 1995, the address census of IPv4, IPv6 and MAC, and DNS, the phonebook that turns names into numbers. Lesson 6.3, \'Browsing the Web: the Citizen\'s Vocabulary\', answered from the citizen side: the Web as ONE service riding the Internet, the URL\'s five parts, HTTP\'s two-message dance, HTTPS and its padlock, cookies that remember and phishing that fakes. Three lessons plus this review: the chapter ships as $3 + 1 = 4$ seats. This review\'s job is the unit\'s oldest ritual: put the whole chapter back together in ONE map you can redraw from memory, and then make you USE it on a mixed bench of fifteen questions - because a chapter that cannot be used was never learned. Every number below was engine-pinned before this prose was written; the review invents nothing, it restates the chapter at bench speed.' },
    { kind: 'para', text: 'A review, the earlier unit reviews taught you, is not a summary but a REHEARSAL: the map first, then the census, then the recaps lesson by lesson, then the sorting drill, then the arithmetic re-drilled, then the bench. This chapter opened with machines that could not reach one another and closes with you, a citizen of a connected world, reading an address bar with a professional eye. What follows walks the chapter three times - once per lesson - with every number the seats pinned; then it sorts the Classify-12 board, re-prices the timeline, lists the honest mistakes examinations love, sets out the formula revision cards, and hands you the bench that makes the chapter answer for itself.' },

    // ================================================================
    // 1. THE CHAPTER IN ONE MAP
    // ================================================================
    { kind: 'heading', text: 'The Chapter in One Map' },
    { kind: 'figure', caption: 'The chapter in one map (F1): three lesson columns and the review bar. 6.1 \'The Network Idea\' owns the conversation - five components, the span census PAN to WAN, four topologies with the mesh formula n(n-1)/2, the units ladder, packets. 6.2 \'The Internet\' owns the joining - six tier rungs, the TCP/IP treaty with its flag day, the dated beats 1969 to 1995, the address census, DNS with its four servers and thirteen roots. 6.3 \'Browsing the Web\' owns the citizen - the Web as one service, the URL five, the two-message dance, HTTPS, cookies, phishing. The review bar collects all three. If you can redraw this from memory, you hold the chapter.', svg: cf6RMapSvg() },
    { kind: 'callout', tone: 'definition', title: 'The chapter\'s ground, defined once', text: 'The chapter\'s ground is said to be this: a **network** is two or more machines joined so that they can share - files, a printer, one Internet connection - and every such conversation has exactly **five components**: sender, receiver, message, communication medium (the channel) and protocol, the set of standard rules all parties follow. Scale those joins by span and you get **PAN, LAN, MAN and WAN**, with the **Internet** as the largest WAN of all: a network of networks whose members all speak the one **TCP/IP** family. On that infrastructure rides the **World Wide Web**, one service among several: a world of pages written in HTML, found by URLs, moved by HTTP. Symbolically: the chapter catalogues $4$ span families, $4$ topologies, $3$ address kinds, $5$ URL parts and $2$ HTTP messages - and every connected thing you will ever meet sits somewhere on that map.' },
    { kind: 'para', text: 'Notice what the map\'s arrows are saying, because the order is the pedagogy. 6.1 must come first: until you can say what ONE conversation needs - a sender, a receiver, a message, a medium and rules - the word \'Internet\' is only a noise. 6.2 joins those conversations into the network of networks and gives it a history with dates you can price. 6.3 then hands the joined world to the citizen: the Web, the URL, the browser, the padlock. And 6.R - this seat - is where the whole chain is re-walked at bench speed. Read the map top to bottom, then close your eyes and redraw it; the census re-run of the next section hangs every number off these three columns.' },
    { kind: 'example', title: 'Recap Illustration: the census recall run - the chapter\'s counts, cold.', steps: [
      'Split the chapter into its three seats: 6.1 the conversation, 6.2 the joined networks, 6.3 the citizen\'s Web.',
      'Count 6.1: five components, four span families, four topologies, the units ladder from $2^{10}$ to $2^{40}$, the device census of six, and the packet envelope.',
      'Count 6.2: six tier rungs, eight dated beats, three address kinds (IPv4, IPv6, MAC), four DNS server kinds, and thirteen root servers named A to M.',
      'Count 6.3: five URL parts, two HTTP messages, three ports worth quoting (80, 443, 53), and the citizen\'s two cautions - cookies track, phishing fakes.',
      'Hence the review\'s own drill board: twelve items across four families, three each - the Classify-12 you will meet in section 5.',
    ], answer: 'three seats, fifteen catalogued censuses - redraw the map and the counts hang from it.' },

    // ================================================================
    // 2. THE CENSUS RE-RUN, LESSON BY LESSON
    // ================================================================
    { kind: 'heading', text: 'The Census Re-Run, Lesson by Lesson' },
    { kind: 'para', text: 'The census re-run is the review\'s spine. One table per lesson, every entry engine-pinned by the seat that owns it; when you can fill each table from memory the chapter is yours, and when you cannot, the table\'s left column tells you which lesson to reopen. Read them as a rehearsal, not a reference: cover the right-hand columns with your palm and ask the left-hand column aloud.' },
    { kind: 'table', caption: 'The chapter census table: each seat\'s ground, its catalogued entries, and the witnesses its recap keeps quoting. Counts read from this review\'s own engine; the orchestrator re-checks the assembled chapter.', head: ['The seat', 'What it owns', 'Catalogued entries', 'The witnesses to quote'], rows: [
      ['6.1 The Network Idea', 'the anatomy of one conversation', '5 components, 4 spans, 4 topologies, 6 devices', 'mesh 15 at n = 6, 45 at n = 10; 810 bytes at 7.41%'],
      ['6.2 The Internet', 'the joining of networks', '6 tier rungs, 8 dated beats, 3 address kinds, 4 DNS servers', '2^32 = 4,294,967,296; 13.9 hours at 9.6 kbit/s'],
      ['6.3 Browsing the Web', 'the citizen\'s vocabulary', '5 URL parts, 2 HTTP messages, 3 ports, 2 cautions', 'ports 80/443/53; the padlock; the examp1e trick'],
      ['6.R this review', 'the synthesis and the bench', '1 map, 4 classify families, 7 gaps, 15 questions', 'Classify-12 at 3-3-3-3; gaps 14/3/9/26/2/2/2'],
    ] },

    // ---------------- 6.1 recap ----------------
    { kind: 'heading', text: 'Lesson 6.1 Recap: The Network Idea' },
    { kind: 'para', text: 'Why do two machines want to talk at all? Because sharing is cheaper than duplicating: one printer serves a floor, one Internet connection serves a household, one file server serves a company. And the anatomy of every such conversation is pinned at five components, no more and no fewer. Walk the note-passing run once more: two friends in a corridor, one writing, one reading, a folded sheet travelling between them - each component named in its place.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the friend who writes the note - the **sender**;',
      '(ii) the friend who reads it - the **receiver**;',
      '(iii) the words on the paper - the **message**, the information being delivered;',
      '(iv) the corridor and the hand that carries it - the **communication medium**, the channel;',
      '(v) the agreement that notes are folded, addressed and passed right-handed - the **protocol**, the set of standard rules that sender, receiver and every intermediate device follow.',
    ] },
    { kind: 'para', text: 'The dividing question of the span census is distance, and its families are pinned by reach. The **PAN** is your own desk, about 10 metres, the Bluetooth class. The **LAN** is a room, a floor, a building - up to 1 kilometre of Ethernet, from 10 Mbps classical to Gigabit Ethernet\'s 1000 Mbps. The **MAN** is a city, 30-40 kilometres, the cable-TV networks being the standard example. The **WAN** crosses countries and continents - and the Internet is the largest WAN of them all, which is the census\'s one superlative and a beloved examination line. Wired media carry these conversations over twisted-pair cable, coaxial cable and optical fibre (light for long distance); radio carries them without wires at all - Wi-Fi, Bluetooth, microwave links.' },
    { kind: 'table', caption: 'The span census, re-run: four families sorted by reach, with the standard example each seat pinned. The Internet is not a fifth family - it is the largest member of the fourth.', head: ['The family', 'The reach', 'The standard example'], rows: [
      ['PAN (personal area network)', 'about 10 m, your own desk', 'Bluetooth earbuds and a phone'],
      ['LAN (local area network)', 'a room, a floor, a building - up to 1 km', 'an office Ethernet'],
      ['MAN (metropolitan area network)', 'a city, 30-40 km', 'a cable-TV network'],
      ['WAN (wide area network)', 'countries and continents', 'the Internet - the largest WAN'],
    ] },
    { kind: 'para', text: 'The arrangement question is topology, and the chapter counted it rather than described it. A **star** wires everyone to one central switch: $n - 1$ links, and the centre\'s death kills all. A **bus** lays one shared backbone: exactly 1 link however large the office, cheap, and prone to collisions. A **ring** joins each node to exactly two neighbours: $n$ links, traffic flowing one way. A **mesh** cables every pair to every pair: $n(n-1)/2$ links - the fully connected case NCERT\'s own formula prices. The review\'s census table computes all four at $n = 4$, $6$ and $10$; check one cell against the formula before trusting the rest.' },
    { kind: 'table', caption: 'The topology arithmetic table: link counts computed from the four formulas at n = 4, 6 and 10. The 10-column\'s mesh entry is MDN\'s famous case - 45 direct cables, or 10 through one switch.', head: ['The topology', 'The formula', 'n = 4', 'n = 6', 'n = 10'], rows: [
      ['star (all to one switch)', '$n - 1$', '3', '5', '9'],
      ['bus (one backbone)', '1', '1', '1', '1'],
      ['ring (each to two neighbours)', '$n$', '4', '6', '10'],
      ['mesh (every pair cabled)', '$n(n-1)/2$', '6', '15', '45'],
    ] },
    { kind: 'example', title: 'Recap Illustration: the topology arithmetic run - one lab, three budgets.', steps: [
      'Take a six-computer laboratory and price each topology with the formulas: star $6 - 1 = 5$ links, bus $1$ backbone, ring $6$ links, mesh $6 \\times 5 / 2 = 15$ links.',
      'Check the mesh against the sum view: $5 + 4 + 3 + 2 + 1 = 15$ - the handshake count agrees with the formula.',
      'Now, the mesh is dearer than the star by $15 - 5 = 10$ extra links - that is the price of surviving the switch\'s death.',
      'Scale to MDN\'s ten-computer case: mesh $10 \\times 9 / 2 = 45$ direct cables, against only $10$ cables if all ten meet at one switch - a saving of $35$ cables.',
      'Hence the chapter\'s punchline: the star trades a single point of failure for a 35-cable saving, and that trade is why offices are stars, not meshes.',
    ], answer: 'n = 6: star 5, bus 1, ring 6, mesh 15; n = 10: 9, 1, 10, 45 - and 45 versus 10 through a switch.' },
    { kind: 'callout', tone: 'insight', title: 'Why the mesh is priced, not just named', text: 'The mesh is the reliability champion - no single cable\'s death isolates anyone - but the census table shows its price growing as the SQUARE of the office: 6 links at $n = 4$, 15 at $n = 6$, 45 at $n = 10$. Each new mesh member must be cabled to every existing member, so the tenth computer adds 9 links, the twentieth would add 19. Counting before buying is the whole discipline: topology is an arithmetic decision before it is a drawing.' },
    { kind: 'para', text: 'Bandwidth and latency finished 6.1\'s measurements, and the units ladder is worth re-climbing slowly. **Bandwidth** is the MAXIMUM rate of data transfer across a path, in bits per second; **latency** is the time delay between cause and effect, one-way or round-trip - ping measures the round trip. The ladder\'s rungs are binary: $1$ Kbps $= 2^{10} = 1{,}024$ bps; $1$ Mbps $= 2^{20} = 1{,}048{,}576$ bps; $1$ Gbps $= 2^{30} = 1{,}073{,}741{,}824$ bps; $1$ Tbps $= 2^{40} = 1{,}099{,}511{,}627{,}776$ bps. And the byte-bit law sits over the whole ladder as the examination\'s favourite trap, so it gets its own caution box below.' },
    { kind: 'table', caption: 'The units ladder, re-climbed: each rung is a power of two, and the byte law rides on top. Read the third column as the honest expansion of the symbol in the first.', head: ['The unit', 'The power', 'The honest expansion'], rows: [
      ['1 Kbps', '$2^{10}$ bps', '1,024 bps'],
      ['1 Mbps', '$2^{20}$ bps', '1,048,576 bps'],
      ['1 Gbps', '$2^{30}$ bps', '1,073,741,824 bps'],
      ['1 Tbps', '$2^{40}$ bps', '1,099,511,627,776 bps'],
      ['1 MBps', '$8$ Mbps', 'one byte per second = eight bits per second'],
    ] },
    { kind: 'callout', tone: 'warn', title: 'Mbps is not MBps - the ISP-bill trap', text: 'A lowercase **b** means bits; an uppercase **B** means bytes; one byte is eight bits. So $1$ MBps $= 8$ Mbps, and a line sold as \'100 Mbps\' moves at most $100/8 = 12.5$ MBps of actual download. Confusing the two misprices your connection by a factor of eight in one direction or the other, and the trap appears in banking, SSC and school examinations in exactly this costume: a speed in Mbps, a file in MB, a question about the time. Convert FIRST, then divide.' },
    { kind: 'para', text: 'The packet is 6.1\'s envelope, and its pinned arithmetic deserves one more slow pass. A message is divided into smaller chunks called packets; each carries a header - destination address plus ordering information - over a payload; the packets may travel different routes and are reassembled at the destination. The pinned run: a $750$-byte message over $250$-byte payloads with $20$-byte headers makes exactly $3$ packets; each packet is $250 + 20 = 270$ bytes on the wire; the whole message therefore costs $3 \\times 270 = 810$ bytes, of which $3 \\times 20 = 60$ bytes are pure header - an overhead of $60/810 = 7.41\\%$ to two decimal places. And the reassembly rule is all-or-nothing: lose any one of the three and the message is incomplete, which is why the protocol\'s ordering information exists at all.' },
    { kind: 'example', title: 'Recap Illustration: the packet slice, re-wrapped - 750 bytes into three envelopes.', steps: [
      'Split the message: $750$ bytes of payload at $250$ bytes per packet needs $750/250 = 3$ packets exactly.',
      'Wrap each: payload $250$ + header $20$ = $270$ bytes per envelope on the wire.',
      'Total the wire: $3 \\times 270 = 810$ bytes - the 60 bytes over the 750 are addresses and ordering.',
      'Price the overhead: $60/810 = 0.0740...$, that is $7.41\\%$ of the wire is header (2 dp).',
      'Check the failure clause: if packet 2 of 3 is lost, the receiver holds packets 1 and 3 and CANNOT reassemble - one lost packet means an incomplete message.',
    ], answer: '3 packets, 810 bytes on the wire, 7.41% overhead - and reassembly is all-or-nothing.' },
    { kind: 'para', text: 'Latency accumulates hop by hop, and a hop is one router-to-router passage. The pinned run: $4$ hops at $25$ ms each cost $4 \\times 25 = 100$ ms one way, and the round-trip time - what ping reports - is twice that, $200$ ms. The device census closes the lesson at six, one line each: the NIC (the Ethernet card, 10 Mbps to 1 Gbps), the repeater (regenerates weak signals, about 100 m cable runs), the hub (shouts to ALL), the switch (whispers to the chosen port), the router (connects NETWORKS and chooses the path) and the modem (MOdulator-DEModulator, the phone-line translator). The deep theory of these boxes stays behind its doorstep - named in section 7 - but their one-line duties are chapter property and examinable now.' },
    { kind: 'table', caption: 'Latency accumulation, re-run: the hop table behind the RTT law. One hop is one router-to-router passage; ping measures the round trip, so it pays every hop twice.', head: ['The journey', 'The hops', 'One-way delay', 'Round trip (RTT)'], rows: [
      ['across town', '2 x 25 ms', '50 ms', '100 ms'],
      ['the pinned run', '4 x 25 ms', '100 ms', '200 ms'],
      ['a continent', '6 x 25 ms', '150 ms', '300 ms'],
    ] },
    // ---------------- 6.2 recap ----------------
    { kind: 'heading', text: 'Lesson 6.2 Recap: The Internet - a Network of Networks' },
    { kind: 'para', text: 'Join the conversations of 6.1 and the arrangement that emerges is a ladder, and the ladder\'s rungs are pinned: your device, the modem, the local ISP, the regional network, the national network, and at the top the backbone - six rungs, country-scale at the summit. An **ISP** is any organisation that provides access to the Internet, and the chapter\'s definition of the Internet itself is the one worth quoting cold: a **network of networks** - thousands of LANs and ISPs that agreed to speak ONE common protocol family. The agreement is the whole story. Nobody owns the ladder; everybody speaks the treaty; that is why a network built by strangers carries your packets without asking who you are.' },
    { kind: 'para', text: 'The treaty is **TCP/IP**, and its history is the chapter\'s dated spine, told honestly in our own words. **ARPANET, 1969**: the first message left UCLA for SRI at 10:30 pm PST on 29 October - the intended word \'login\' crashed the system after two letters, so the first characters ever transmitted on the network that became the Internet were **\'lo\'**; four nodes stood by December (UCLA, SRI, UCSB, Utah). **Flag day, 1 January 1983**: every host switched from the older NCP to TCP/IP at once - a change of constitution with the network still standing. **November 1983**: Mockapetris\'s DNS (RFC 882/883) replaced the single HOSTS.TXT table everyone had been copying by hand. **1986**: ERNET brought the education and research network to India. **March 1989**: Berners-Lee proposed the Web at CERN. **6 August 1991**: the first website went public at info.cern.ch. **April 1993**: CERN released the Web to the public domain. **15 August 1995**: VSNL\'s Gateway Internet Access Service opened the public Internet in India at 9.6 kbit/s - the tariff was 5,200 rupees for 250 hours, that is 20.80 rupees per hour. Alongside, NSFNET\'s backbone grew from 6 nodes at 56 kbps to 21 nodes at 45 Mbps - the ladder\'s upper rungs thickening as the climbers multiplied.' },
    { kind: 'table', caption: 'The dated beats, re-run in order: eight pinned events from ARPANET\'s first message to India\'s public gateway. The gap column is computed in section 6 - the review re-prices the whole line there.', head: ['The year', 'The beat', 'What it bought'], rows: [
      ['1969', 'ARPANET\'s first message: \'lo\'', 'the packet-switched ancestor, 4 nodes by December'],
      ['1 Jan 1983', 'the flag day', 'every host NCP -> TCP/IP at one stroke'],
      ['Nov 1983', 'DNS (Mockapetris, RFC 882/883)', 'names for numbers; HOSTS.TXT retired'],
      ['1986', 'ERNET', 'India\'s education and research network'],
      ['Mar 1989', 'Berners-Lee\'s Web proposal at CERN', 'the idea of linked pages over the Internet'],
      ['Aug 1991', 'first public website: info.cern.ch', 'the Web becomes reachable'],
      ['Apr 1993', 'CERN releases the Web to the public domain', 'anyone may build a browser or a server'],
      ['15 Aug 1995', 'VSNL\'s gateway opens, 9.6 kbit/s', 'India\'s public Internet, 20.80 rupees per hour'],
    ] },
    { kind: 'example', title: 'Recap Illustration: the dated beats, quoted cold - eight events and their order.', steps: [
      'Anchor the two ends first: 1969 ARPANET transmits \'lo\'; 1995 VSNL opens India\'s public gateway.',
      'Place the 1983 pair: the flag day (1 January, NCP -> TCP/IP) comes before DNS (November, names for numbers) - constitution first, phonebook second.',
      'Thread the middle: ERNET 1986, then the Web run - proposal 1989, first site 1991, public domain 1993, India online 1995.',
      'Check the rhythm with the gaps: $14$ years to the flag day, $3$ to ERNET, $9$ from ERNET to VSNL, and the Web steps $2$ and $2$ and $2$ - the whole span $26$ years.',
      'Hence the memory hook: \'lo\' in \'69, the treaty in \'83, the phonebook the same year, India\'s research net in \'86, and a four-beat Web finish every two years from \'89 to \'95.',
    ], answer: '1969, 1983, 1983, 1986, 1989, 1991, 1993, 1995 - eight beats, gaps 14/3/9 with the 2-2-2 finish.' },
    { kind: 'para', text: 'The gap arithmetic gets its own re-drill in section 6; here the census table simply records the seven pinned gaps so the re-run is complete. Read them as the price of history: fourteen years from the first \'lo\' to the treaty, three more to India\'s research network, nine more of waiting before a student in Delhi could dial the public Internet - and then the Web, arriving on a metronome.' },
    { kind: 'table', caption: 'The seven pinned gaps of the chapter\'s timeline, computed. The fourth row is the whole span; the last three are the Web\'s 2-2-2 run.', head: ['The pair', 'The gap'], rows: [
      ['1969 -> 1983 (first message -> flag day)', '14 years'],
      ['1983 -> 1986 (flag day -> ERNET)', '3 years'],
      ['1986 -> 1995 (ERNET -> VSNL gateway)', '9 years'],
      ['1969 -> 1995 (the whole span)', '26 years'],
      ['1989 -> 1991 (proposal -> first site)', '2 years'],
      ['1991 -> 1993 (first site -> public domain)', '2 years'],
      ['1993 -> 1995 (public domain -> India online)', '2 years'],
    ] },
    { kind: 'para', text: 'The address census gives every machine on the ladder a name. **IPv4** is a 32-bit address written as four dot-separated octets, each $0$ to $255$ - the pinned example $192.168.0.178$ shows the shape, and $4 \\times 8 = 32$ bits - giving $2^{32} = 4{,}294{,}967{,}296$ addresses, just under 4.3 billion, which proved NOT enough for the world that joined. **IPv6** answers with 128 bits in eight colon-separated hex groups (the pinned example runs 2001:CDBA:...:3257:9652) - a space of $2^{128}$, about $3.4 \\times 10^{38}$, which no census of devices will exhaust. And the **MAC address** is the third kind, different in nature: a 48-bit hardware address in 12 hex digits, a 24-bit manufacturer OUI plus a 24-bit serial, burnt into the NIC at birth. The IP changes when the node moves network; the MAC does not care where you carry it - that distinction is one of section 7\'s honest mistakes.' },
    { kind: 'table', caption: 'The address census, re-run: three kinds of name, three different owners. IPv4 and IPv6 are network addresses; the MAC is the hardware\'s own serial plate.', head: ['The kind', 'The size', 'The shape', 'The space'], rows: [
      ['IPv4', '32 bits', '4 octets, 0-255 each (192.168.0.178)', '$2^{32} = 4,294,967,296$'],
      ['IPv6', '128 bits', '8 hex groups (2001:CDBA:...:3257:9652)', 'about $3.4 \\times 10^{38}$'],
      ['MAC', '48 bits', '12 hex digits: 24-bit OUI + 24-bit serial', 'burnt in, one plate per NIC'],
    ] },
    { kind: 'example', title: 'Recap Illustration: the address census run - three names, one machine.', steps: [
      'Take one laptop on three networks: home Wi-Fi, the college LAN, a hotspot - the MAC stays the same 48-bit plate in all three, because it was burnt into the NIC.',
      'Now the IPv4: at home it might be 192.168.0.178, at college the network hands it a different 32-bit address - the IP changes when the node moves network.',
      'Count the old space: $2^{32} = 4,294,967,296$ - under 4.3 billion addresses for a planet that joined by the billions, hence \'not enough\'.',
      'Count the new: $2^{128}$ is about $3.4 \\times 10^{38}$ - the ratio to IPv4 is $2^{96}$, so the new space is not a little larger, it is astronomically larger.',
      'Hence the honest one-liner: the MAC names the hardware, the IP names the place, and IPv6 makes the number of places effectively uncountable.',
    ], answer: 'MAC 48-bit burnt in; IPv4 32-bit (4,294,967,296); IPv6 128-bit - place names that move, plates that do not.' },
    { kind: 'para', text: 'DNS closed the lesson, and its ladder is worth re-walking because the first step of every fetch you make IS this ladder. Humans type names; machines route numbers; the conversion is **domain name resolution** by the DNS server. The lookup runs eight steps through four server kinds: the browser asks the **recursive resolver**; the resolver asks a **root server** (the dot at the top); the root points to the **TLD server** for the ending (.com, .in); the TLD points to the **authoritative server** that actually holds the record; the answer travels back; the browser sends its HTTP request to the IP. There are 13 root name servers, named A through M, and DNS listens on port 53 - a number you now own alongside 80 and 443.' },
    { kind: 'callout', tone: 'insight', title: 'The library analogy, re-shelved', text: 'Keep the chapter\'s analogy and the ladder never needs re-memorising. The **recursive resolver** is the librarian: you ask once and walk away; it does all the running. The **root server** is the library\'s index: it does not know the book, it knows which RACK to point at. The **TLD server** is the rack: it knows the subject area, and points at the shelf. The **authoritative server** is the book itself: the only party that holds the final answer. Four kinds, one question, and the citizen never sees the running.' },
    { kind: 'para', text: 'The router\'s duty closes the recap: it receives, analyses, transmits - choosing the next network packet by packet - and every router-to-router passage is a hop whose delay accumulates ($4 \\times 25 = 100$ ms one-way, the table above). Client and server name the two roles at the ends: your browser is a client, the site\'s machine is a server - the request-maker and the answer-keeper. One honest paragraph is all this seat needs; the deep model door stays with \'Computer Networks\', named in section 7.' },

    // ---------------- 6.3 recap ----------------
    { kind: 'heading', text: 'Lesson 6.3 Recap: Browsing the Web - the Citizen\'s Vocabulary' },
    { kind: 'para', text: 'The citizen\'s first distinction is the one examinations adore: the **Internet is the infrastructure** - the wires, routers and protocols of 6.2 - and the **Web is ONE service built on top**: a world of pages written in HTML, found by URLs, moved by HTTP. Email is a DIFFERENT service riding the same infrastructure, and MDN\'s line is the quotable form: the Internet is the backbone of the Web. Say it the honest way and the confusion dies: the Web needs the Internet; the Internet does not need the Web; and neither of them is \'the cloud\' or \'the browser\'.' },
    { kind: 'para', text: 'The **browser** is a software application that fetches, renders and displays pages - text, images, audio, video, hyperlinks - and the census stands at five: Chrome, Firefox, Safari, Opera, Edge, with the honest note that Edge is Internet Explorer\'s successor of the 1995 browser-war generation. The first POPULAR graphical browser was Mosaic, from NCSA, 1993 - the program that made the Web look like pages instead of paperwork. Around the page sits the chrome of the application itself: the address bar, the back button, the tabs, the bookmarks. And a **search engine** is not a browser, a warn callout section 7 returns to: it is a service that has already crawled and indexed the Web and answers from its index - google.co.in, bing.com, duckduckgo.com - while the browser is the box you view everything in.' },
    { kind: 'para', text: 'The URL is the address of a unique resource, and the pinned example dissects into five top-level parts. Take it slowly once more, because every part is a different question: https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2 The **scheme** (https) says HOW to talk. The **authority** (www.example.co.in:443) says WHO to talk to - and it has three sub-parts: subdomain (www), domain (example.co.in) and port (443, usually hidden). The **path** (textbook/ch6.htm) says WHICH resource. The **parameters** (?q=glassdoor) carry extra input to the page. The **anchor** (#sec2) picks the spot within it. Five parts, three sub-parts in the second, and the port census rides along: 80 for HTTP, 443 for HTTPS - the scheme and the port must agree, which is why https arrives on 443.' },
    { kind: 'table', caption: 'The URL five, re-dissected on the pinned example. NCERT\'s labels for the same anatomy: http is the protocol, www the subdomain, ncert.nic.in the domain.', head: ['The part', 'In the pinned example', 'The question it answers'], rows: [
      ['scheme', 'https', 'how do we talk? (HTTP over TLS)'],
      ['authority', 'www.example.co.in:443', 'who do we talk to? (subdomain + domain + port)'],
      ['path', 'textbook/ch6.htm', 'which resource on that machine?'],
      ['parameters', '?q=glassdoor', 'what extra input does the page receive?'],
      ['anchor', '#sec2', 'which spot within the page?'],
    ] },
    { kind: 'example', title: 'Recap Illustration: the URL dissection run - one address, five questions.', steps: [
      'Read left to right and stop at the first colon: \'https\' is the scheme - the how.',
      'Between \'://\' and the next slash sits the authority: www.example.co.in:443 - subdomain www, domain example.co.in, port 443.',
      'Up to the question mark, the path: textbook/ch6.htm - the which.',
      'From \'?\' to \'#\', the parameters: q=glassdoor - the extra input.',
      'After \'#\', the anchor: sec2 - the spot within the page. Hence five parts, three sub-parts, and the port agrees with the scheme: 443 for https.',
    ], answer: 'scheme, authority (subdomain + domain + port), path, parameters, anchor - the five-part census.' },
    { kind: 'para', text: 'HTTP is a client-server protocol of exactly two messages: the browser sends a **request** (\'GET me this page\'), and the server returns a **response** - the page, or an error. HTTP is **stateless**: each request stands alone, remembering nothing of the one before, which is why cookies had to be invented. **404** is the honest \'page not found\' answer, and the protocol was designed in the early 1990s to move linked documents - a modest brief that grew a civilisation. **HTTPS** is the same two-message dance with the conversation wrapped in TLS - Transport Layer Security, the old name SSL surviving in speech - and its signature is the padlock in the address bar.' },
    { kind: 'callout', tone: 'warn', title: 'Plain HTTP on public Wi-Fi is a postcard, not a letter', text: 'Without TLS, the request and the response travel in the clear, and any device on the same public network can read them as they pass - usernames, messages, the page itself. The padlock means the conversation is encrypted in transit, not that the SITE is honest: a phishing page can wear HTTPS too. The chapter\'s rule is two-part: insist on https for anything you would not shout across a café, and never let the padlock alone vouch for the domain - read the domain itself.' },
    { kind: 'para', text: 'Because HTTP is stateless, servers needed a memory patch: the **cookie**, a small piece of data the server sends to your browser, which stores it and sends it back with later requests - the shopping-cart memory. The first cookie software shipped with Netscape in 1994, to tell first-time from returning visitors. Cookies cannot read your hard disk and cannot carry viruses - but they DO track, which is why clearing them exists. And **phishing** is the citizen\'s enemy: a social-engineering attack that tricks you into believing you are on your real bank\'s site when you are on the attacker\'s copy, so you type your credentials into the fake. The lookalike-domain trick is pinned: my-bank.example.com is a subdomain of example.com, and my-bank.examp1e.com swaps the digit 1 for the letter l - read the domain from the RIGHT, look for the padlock, and never click through fear.' },
    { kind: 'callout', tone: 'historical', title: 'Two citizen dates, honestly told', text: 'Our own retelling, dates pinned. **Mosaic, 1993**, from NCSA, was the first popular graphical browser - before it, the Web was text for the patient; after it, pages looked like pages, and the browser race began. **Netscape followed in 1994** and gave the world the cookie in the same year - a memory patch for a stateless protocol, invented so a shopping site could tell a first-time visitor from a returning one. One year apart, one pair of ideas: show the Web to everyone, then remember who came back.' },
    // ================================================================
    // 3. THE CLASSIFY-12 RE-RUN
    // ================================================================
    { kind: 'heading', text: 'The Classify-12 Re-Run' },
    { kind: 'para', text: 'The unit reviews of this book end with a sorting drill, because classification is the cheapest test of whether a chapter\'s walls actually stand. Chapter 6\'s drill board carries twelve short items and four families: **SPAN** (which reach does it have?), **TOPOLOGY** (which arrangement, at what link count?), **PROTOCOL-SPEAKER** (which protocol speaks here?) and **WEB-WORD** (which citizen\'s word is being used?). The board is engine-pinned at 3-3-3-3 - three items per family, twelve in all - and every placement is checkable against a census you have already re-run. Read a clue, name the family, say the answer aloud, and only then look at the card below it.' },
    { kind: 'figure', caption: 'The Classify-12 board (F2): twelve clues sorted into four family columns - SPAN, TOPOLOGY, PROTOCOL-SPEAKER, WEB-WORD - three cards each, with the answer and a one-line reason on every card. The counts are pinned: $3 + 3 + 3 + 3 = 12$. Cover the answers with your palm and re-sort the board cold; any card that hesitates you names the census to reopen.', svg: cf6RClassifySvg() },
    { kind: 'example', title: 'Recap Illustration: the classify-12 run - twelve items sorted with reasons.', steps: [
      'SPAN, item 1: Bluetooth earbuds and one phone on a desk - reach about 10 m, so a PAN.',
      'SPAN, item 2: one office building on Ethernet, under 1 km - a LAN.',
      'SPAN, item 3: a city\'s cable-TV network at 30-40 km - a MAN (the WAN family holds countries; the Internet is its largest member).',
      'TOPOLOGY, item 1: n = 10 with every pair directly cabled - the mesh, $n(n-1)/2 = 45$ links.',
      'TOPOLOGY, item 2: everyone wired to one central switch - the star, $n - 1$ links, 9 at $n = 10$.',
      'TOPOLOGY, item 3: one shared backbone cable, cheap, collisions - the bus, exactly 1 link.',
      'PROTOCOL-SPEAKER, item 1: the flag day of 1 January 1983 - TCP/IP, the treaty every member speaks.',
      'PROTOCOL-SPEAKER, item 2: the phonebook that listens on port 53 - DNS, four server kinds, thirteen roots A to M.',
      'PROTOCOL-SPEAKER, item 3: GET me this page, the two-message dance - HTTP, stateless by design.',
      'WEB-WORD, item 1: the padlock in the address bar - HTTPS, the same dance wrapped in TLS.',
      'WEB-WORD, item 2: the honest page-not-found answer - 404, a response code, not an error of your machine.',
      'WEB-WORD, item 3: Netscape 1994\'s shopping-cart memory - the cookie, set by the server, returned by the browser.',
    ], answer: 'twelve items, four families, 3-3-3-3 - every placement checkable against a re-run census.' },
    { kind: 'callout', tone: 'theorem', title: 'The four sorting questions', text: 'Every item above fell to one of four questions, and the four questions never overlap. (1) HOW FAR does it reach? - the span census answers: PAN about 10 m, LAN up to 1 km, MAN 30-40 km, WAN countries and continents. (2) HOW ARE THE LINKS ARRANGED? - the topology census answers with a formula: star $n-1$, bus $1$, ring $n$, mesh $n(n-1)/2$. (3) WHO SPEAKS HERE? - the protocol census answers: TCP/IP the treaty, DNS the phonebook, HTTP the dance. (4) WHICH CITIZEN\'S WORD IS IT? - the Web census answers: HTTPS the padlock, 404 the not-found, the cookie the memory. Ask the right question first and no roster can confuse you - which is exactly why examinations set classifications.' },

    // ================================================================
    // 4. THE GAP ARITHMETIC, RE-DRILLED
    // ================================================================
    { kind: 'heading', text: 'The Gap Arithmetic, Re-Drilled' },
    { kind: 'para', text: 'The chapter\'s history is not a list to memorise but a line to price: eight beats, seven gaps, every gap a subtraction you can do in your head while the invigilator walks past. The re-priced timeline below prints them all: the fourteen-year climb from ARPANET\'s \'lo\' to the TCP/IP flag day; the three years from flag day to ERNET; the nine-year wait from ERNET to VSNL\'s public gateway; the whole twenty-six-year span; and the Web\'s metronome - proposal to first site to public domain to India online, two years at every step. Date arithmetic of this kind is the most bankable marks in the examination hall, because the examiner can only subtract.' },
    { kind: 'figure', caption: 'The timeline, re-priced (F3): the eight dated beats of 6.2 on one axis, 1969 to 1995. The gap arithmetic rides on the arrows - 14 years from the first message to the flag day, 3 from flag day to ERNET, the 2-2-2 run of the Web steps - with the 9-year ERNET-to-VSNL bracket below and the whole-span bracket above: 26 years. Two beats share 1983: the January flag day and November\'s DNS.', svg: cf6RTimelineSvg() },
    { kind: 'derivation', title: 'The 1995 patience calculation, re-derived', statement: 'The chapter pinned the patience of India\'s first public connection: a 60 MB file over VSNL\'s 9.6 kbit/s line takes 50,000 seconds, that is 13.9 hours. The derivation rebuilds the figure from the two pinned inputs: the size of the file and the rate of the line.', steps: [
      { label: 'Convert the file to bits', formula: '60\\,\\text{MB} \\times 8 = 480\\,\\text{Mbit}', explanation: 'One byte is eight bits, so sixty megabytes become four hundred and eighty megabits - the line is sold in bits, so the file must be priced in bits before any division.' },
      { label: 'Expand to plain bits', formula: '480\\,\\text{Mbit} = 480{,}000{,}000\\,\\text{bits}', explanation: 'The telecom mega is the decimal million - the line\'s own convention - not the binary 1,048,576 of the storage ladder; use the honest convention of the thing you are dividing by.' },
      { label: 'Divide by the rate', formula: '\\frac{480{,}000{,}000}{9{,}600} = 50{,}000\\,\\text{s}', explanation: 'The 1995 line moved 9,600 bits each second, so the seconds needed are the total bits divided by the bits per second.' },
      { label: 'Convert to hours', formula: '\\frac{50{,}000}{3{,}600} = 13.9\\,\\text{h}', explanation: 'An hour holds 3,600 seconds, and 50,000 of them is 13.888... hours, which rounds to 13.9 - over half a waking day for one file.' },
    ], result: 'A 60 MB file at 9.6 kbit/s costs $480{,}000{,}000 / 9{,}600 = 50{,}000$ seconds $= 13.9$ hours - and the 1995 tariff priced the waiting at 20.80 rupees per hour.' },
    { kind: 'equation', latex: '\\text{required rate} = \\frac{\\text{pages} \\times \\text{characters per page} \\times \\text{bits per character}}{\\text{seconds available}} \\tag{1}', note: 'The genre every data-communication examination loves. 6.1\'s pinned run: $10 \\times 1{,}600 \\times 8 = 128{,}000$ bits over 20 s = 6,400 bps. The review\'s new instance is worked below.' },
    { kind: 'example', title: 'Recap Illustration: the required-rate genre, a new instance - six pages in half a minute.', steps: [
      'Take the new instance\'s counts: $6$ pages, each $1{,}500$ characters, each character $8$ bits, all of it to arrive within $30$ seconds.',
      'Count the characters: $6 \\times 1{,}500 = 9{,}000$ characters in the document.',
      'Convert to bits: $9{,}000 \\times 8 = 72{,}000$ bits to be carried.',
      'Now, divide by the time: $72{,}000 / 30 = 2{,}400$ bps - the minimum honest rate for the send.',
      'Check the genre against 6.1\'s pinned run: $10 \\times 1{,}600 \\times 8 = 128{,}000$ bits over $20$ s gave $6{,}400$ bps - same formula, new numbers, and both answers land in bits per second.',
    ], answer: '2,400 bps (that is, 2.4 kbps) - any slower and the pages arrive late.' },

    // ================================================================
    // 5. THE HONEST MISTAKES
    // ================================================================
    { kind: 'heading', text: 'The Honest Mistakes' },
    { kind: 'para', text: 'Every chapter of this book ends its review with the traps it mined, because the traps are where the marks leak. Chapter 6\'s five are below; each is stated as the exam hall states it, and each carries its one-line repair. Read them as a self-test: if any repair surprises you, the section that owns it is named in the trap itself.' },
    { kind: 'callout', tone: 'warn', title: 'Trap 1 - Mbps is not MBps (the time-sum version)', text: 'When the question asks for TIME, the trap bites twice as hard: a 25 MB file on a \'100 Mbps\' line does not take $25/100$ of a second. Convert first - $100$ Mbps $= 100/8 = 12.5$ MBps - and then divide: $25/12.5 = 2$ seconds. Repair: lowercase b is bits, uppercase B is bytes, and nothing divides until the units agree.' },
    { kind: 'callout', tone: 'warn', title: 'Trap 2 - the Internet is not the Web', text: 'The Internet is the infrastructure - the wires, routers and protocols of 6.2; the Web is ONE service riding it, and email is another. \'The Internet is the backbone of the Web\' is the quotable repair, and the ask appears in CUET-style papers as a straight one-mark distinction. Say it the honest way: the Web needs the Internet; the Internet does not need the Web.' },
    { kind: 'callout', tone: 'warn', title: 'Trap 3 - the MAC is not the IP', text: 'The MAC address is a 48-bit hardware plate - a 24-bit manufacturer OUI plus a 24-bit serial - burnt into the NIC; the IP address is a 32-bit (or 128-bit) NETWORK address that changes when the node moves. Repair: the MAC names the hardware, the IP names the place. A laptop keeps one MAC across three networks and collects three IPs.' },
    { kind: 'callout', tone: 'warn', title: 'Trap 4 - a search engine is not a browser', text: 'The browser is the application that fetches, renders and displays pages; a search engine is a service that has already crawled and indexed the Web and answers from its index. Typing a question into the address bar hides a search inside a browse - two different fetches, honestly told in 6.3. Repair: the browser is the box; the engine is one of the things you visit with it.' },
    { kind: 'callout', tone: 'warn', title: 'Trap 5 - https:// is not the domain\'s name', text: 'The scheme says HOW to talk, never WHO you are talking to - and a phishing page can wear a padlock and a perfectly valid certificate for its own lookalike domain. my-bank.examp1e.com swaps the digit 1 for the letter l; the https in front of it changes nothing about who owns it. Repair: read the domain from the RIGHT - the registrable name sits just before the first single slash-facing dot, and the padlock vouches only for the encryption.' },

    // ================================================================
    // 6. THE DOORSTEPS AND THE FORMULA SHEET
    // ================================================================
    { kind: 'heading', text: 'The Doorsteps and the Formula Sheet' },
    { kind: 'callout', tone: 'insight', title: 'What to carry through the doors', text: 'Chapter 6 opened doors on purpose and left them ajar. **\'Computer Networks\'** owns the deep theory this chapter only waved at: switching, routing algorithms, congestion, the full protocol stack - your link-count arithmetic is the entry ticket. **\'Cybersecurity\'** owns the threat model: phishing got its citizen\'s checklist here, but the full treatment of attacks and defences lives there. **\'Full-Stack Web Development\'** owns page-building: you met the URL, HTTP and cookies as a USER; building the pages, forms and sessions comes later on that shelf. Carry the census, the arithmetic and the honest distinctions through whichever door you take - they are prerequisites, not souvenirs.' },
    { kind: 'para', text: 'The formula harvest follows: eight revision cards, each one a number-generator the bench below will draw from. If a card\'s note quotes a figure you cannot re-derive, the section that owns it is a page away; the cards are meant for the night before the examination, not the first reading.' },
    { kind: 'formula', name: 'Mesh links', latex: 'L_{\\text{mesh}} = \\frac{n(n-1)}{2}', note: 'The fully connected case: 6 nodes need 15 links, 10 need 45 - NCERT\'s own formula, and MDN\'s 45-versus-10 switch case.' },
    { kind: 'formula', name: 'Star links', latex: 'L_{\\text{star}} = n - 1', note: 'Everyone to one central switch; count the centre as a node. 10 computers through one switch need 10 cables - one per computer.' },
    { kind: 'formula', name: 'Required rate', latex: '\\text{rate} = \\frac{\\text{pages} \\times \\text{chars per page} \\times \\text{bits per char}}{\\text{seconds}}', note: '6 x 1,500 x 8 / 30 = 2,400 bps; the pinned 6.1 run: 128,000 / 20 = 6,400 bps.' },
    { kind: 'formula', name: 'The byte law', latex: '1\\,\\text{MBps} = 8\\,\\text{Mbps}', note: 'A 100 Mbps line tops out at 12.5 MBps; a 25 MB file therefore needs at least 2 seconds on it.' },
    { kind: 'formula', name: 'Round-trip time', latex: '\\text{RTT} = 2 \\times \\text{one-way delay}', note: '4 hops x 25 ms = 100 ms one-way, 200 ms round trip; ping pays every hop twice.' },
    { kind: 'formula', name: 'Packet overhead', latex: '\\text{overhead} = \\frac{\\text{header bytes}}{\\text{total bytes on the wire}}', note: '750 B in three 270-byte packets: 60 / 810 = 7.41% of the wire is addresses and ordering.' },
    { kind: 'formula', name: 'The span strip', latex: '\\text{PAN} \\to \\text{LAN} \\to \\text{MAN} \\to \\text{WAN}', note: 'About 10 m, up to 1 km, 30-40 km, countries and continents - and the Internet is the largest WAN of all.' },
    { kind: 'formula', name: 'The URL census', latex: '(\\text{scheme},\\ \\text{authority},\\ \\text{path},\\ \\text{parameters},\\ \\text{anchor})', note: 'Authority = subdomain + domain + port; ports: 80 = HTTP, 443 = HTTPS, 53 = DNS.' },
    // ================================================================
    // 7. EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Exam Corner: the Chapter as a Checklist' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner - what this chapter answers, honestly labelled', text: 'Banking and SSC computer-awareness papers, school boards and CUET-style papers, UGC NET U9 (whose syllabus names the World Wide Web, the URL and the domain name service) and Cambridge 9618-style papers all draw on this chapter\'s ground: network topologies, LAN/MAN/WAN, protocols and ports, URLs, HTTP versus HTTPS, cookies and phishing. The asks below are the stable ones, phrased in OUR OWN words in the style such papers use; nothing here claims to quote a real paper. Each row carries the one-line solution an examiner can mark at a glance - the fastest honest marks in the hall, because every number in them was engine-pinned before this prose was written.' },
    { kind: 'table', caption: 'The chapter\'s examination checklist: eight stable asks, the seat that answers each, and the one-line solution to write. The mixed bench that follows drills them at full length.', head: ['The examination ask (our own wording)', 'The seat', 'The one-line solution'], rows: [
      ['Name the components of data communication.', '6.1', 'five: sender, receiver, message, medium, protocol'],
      ['A 10-computer office: cables for a full mesh, and through one switch?', '6.1', 'n(n-1)/2 = 45; 10 cables - the switch saves 35'],
      ['Which is larger, and by what factor: 1 MBps or 1 Mbps?', '6.1', '1 MBps = 8 Mbps - bytes against bits'],
      ['Arrange by span: PAN, WAN, LAN, MAN; name the largest WAN.', '6.1', 'PAN, LAN, MAN, WAN - the Internet is the largest WAN'],
      ['What happened on 1 January 1983, and on which port does DNS listen?', '6.2', 'every host NCP -> TCP/IP; port 53 (13 roots, A-M)'],
      ['Distinguish the Internet from the World Wide Web.', '6.2, 6.3', 'infrastructure vs one service riding it; email rides too'],
      ['Label the parts of a URL and match ports 80 and 443.', '6.3', 'scheme, authority, path, parameters, anchor; 80 = HTTP, 443 = HTTPS'],
      ['Why is plain HTTP unsafe on public Wi-Fi, and what does the padlock prove?', '6.3', 'the exchange is readable in transit; the padlock proves TLS encryption only'],
    ] },

    // ================================================================
    // 8. THE MIXED BENCH: FIFTEEN QUESTIONS
    // ================================================================
    { kind: 'heading', text: 'The Mixed Bench: Fifteen Questions Across the Chapter' },
    { kind: 'para', text: 'The bench is the review\'s proof of work: fifteen questions spanning all three lessons - spans, topologies, units, packets, dates, DNS order, URL parts, HTTP/HTTPS, cookies and phishing - graded in three sets. Work them with a pencil; every solution is written the way the examination hall wants it, one move per line, and the numbers were pinned before the questions were phrased.' },
    { kind: 'exercises', title: 'Exercises 6.R - the mixed bench across the chapter', sets: [
      { level: 'L1', questions: [
        { q: 'Name the five components of data communication, placing each in 6.1\'s picture of two friends passing notes through a corridor.', solution: [
          'Recall the census first: every data conversation needs a sender, a receiver, a message, a medium and a protocol - five, no more.',
          'Now, place them: the friend who writes the note is the sender; the friend who reads it is the receiver.',
          'The words on the folded sheet are the message; the corridor that carries it is the communication medium, the channel.',
          'Hence the agreement that notes are folded, addressed and passed a certain way is the protocol - the standard rules that sender, receiver and every intermediate device follow.',
        ], answer: 'sender, receiver, message, communication medium, protocol - five components, no more and no fewer.' },
        { q: 'Sort each reach into its span family: (a) Bluetooth earbuds and a phone on one desk; (b) one school building\'s Ethernet; (c) a city\'s cable-TV network; (d) the Internet.', solution: [
          'Ask how far, family by family: (a) is about 10 m - the desk itself - so a PAN, the Bluetooth class.',
          'So, (b) is one building, under 1 km of Ethernet - a LAN.',
          'Then (c) spans a city at 30-40 km - a MAN, and the cable-TV case is the standard example.',
          'Hence (d) crosses countries and continents, and is the largest member of its family: the Internet is the largest WAN.',
        ], answer: 'PAN, LAN, MAN, WAN - and the Internet is the largest WAN of all.', figures: [
          { caption: 'The span census as one strip for this sort: the four families left to right with their pinned reaches, the Internet flagged as the largest WAN.', svg: cf6RSpanStripSvg() },
        ] },
        { q: 'Match the ports 80, 443 and 53 to their services, and say which part of the URL usually hides the port.', solution: [
          'Take them in census order: 80 is HTTP\'s port - the plain two-message dance of the Web.',
          'So, 443 is HTTPS - the same dance wrapped in TLS, which is why an https URL may show :443.',
          'Then 53 is DNS - the phonebook service\'s listening port.',
          'Hence the port lives inside the authority, as the third of its three sub-parts (subdomain, domain, port), and it hides because it agrees with the scheme.',
        ], answer: '80 = HTTP, 443 = HTTPS, 53 = DNS; the port hides inside the authority.' },
        { q: 'Dissect the URL https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2 into its five top-level parts, and name the authority\'s three sub-parts.', solution: [
          'Read left to right: up to the first colon and the slashes, https - the scheme, the how.',
          'Now, to the next slash: www.example.co.in:443 - the authority, the who.',
          'Split the authority: subdomain www, domain example.co.in, port 443 - three sub-parts.',
          'So, from the slash to the question mark: textbook/ch6.htm - the path; from ? to #: q=glassdoor - the parameters; after #: sec2 - the anchor.',
        ], answer: 'scheme, authority (subdomain + domain + port), path, parameters, anchor - five parts.' },
        { q: 'Put the chapter\'s eight dated beats in order, each with its event: 1986, 1969, 1995, 1989, 1991, 1983 (twice), 1993.', solution: [
          'Start at 1969: ARPANET\'s first message, the two letters \'lo\', UCLA to SRI.',
          'Then the 1983 pair, in order: 1 January, the flag day - every host NCP -> TCP/IP; November, DNS replaces HOSTS.TXT.',
          'So, 1986: ERNET, India\'s education and research network.',
          'Then the Web run: March 1989 Berners-Lee\'s proposal at CERN; 6 August 1991 the first site at info.cern.ch; April 1993 CERN\'s public-domain release.',
          'Hence the end: 15 August 1995, VSNL opens India\'s public gateway at 9.6 kbit/s.',
        ], answer: '1969 lo; Jan 1983 flag day; Nov 1983 DNS; 1986 ERNET; 1989 proposal; 1991 first site; 1993 public domain; 1995 VSNL.' },
      ] },
      { level: 'L2', questions: [
        { q: 'An office of 10 computers is to be wired (a) as a full mesh, (b) through one central switch. Count the cables in each case and the saving, and name the price of the saving.', solution: [
          'Take (a) first: a full mesh cables every pair, so $n(n-1)/2 = 10 \\times 9 / 2 = 45$ cables.',
          'Now, (b): through one switch each computer needs a single cable to the centre, so 10 cables - one per computer.',
          'So, the saving is $45 - 10 = 35$ cables - MDN\'s famous case for the star economy.',
          'Hence the price: the switch is now a single point of failure - the star trades 35 cables for one central risk.',
        ], answer: '45 direct cables against 10 through the switch: a saving of 35, at the cost of one central point of failure.', figures: [
          { caption: 'The topology drill board for this count: star, bus, ring and mesh drawn at six nodes each, with the formulas and the n = 10 counts - 9, 1, 10 and 45.', svg: cf6RTopoDrillSvg() },
        ] },
        { q: '(a) Convert 4 MBps to Mbps. (b) How long does a 40 MB file take on a 4 MBps line? (c) An ISP sells \'100 Mbps\' - what is the honest ceiling in MBps?', solution: [
          'Split the unit from the number: one byte is eight bits, so (a) $4 \\times 8 = 32$ Mbps.',
          'Now, (b): the file and the rate already agree in bytes, so $40 / 4 = 10$ seconds.',
          'Then (c): convert before dividing - $100 / 8 = 12.5$ MBps, and no download window will ever show you more.',
          'Check the law both ways: $12.5 \\times 8 = 100$ Mbps, so the conversion closes.',
        ], answer: '32 Mbps; 10 seconds; 12.5 MBps.', figures: [
          { caption: 'The units ladder for this conversion: the four binary rungs climbed, with the byte law bar - 1 MBps = 8 Mbps - setting the 12.5 MBps ceiling.', svg: cf6RUnitsSvg() },
        ] },
        { q: 'A 900-byte message is sent as packets of 300-byte payloads, each with a 20-byte header. How many packets, how many bytes on the wire, and what is the overhead share?', solution: [
          'Count the packets: $900 / 300 = 3$, exactly - no remainder.',
          'So, each packet on the wire carries $300 + 20 = 320$ bytes.',
          'Now, total the wire: $3 \\times 320 = 960$ bytes.',
          'Hence the overhead: $3 \\times 20 = 60$ header bytes, and $60 / 960 = 6.25\\%$ of the wire is addresses and ordering.',
        ], answer: '3 packets, 960 bytes on the wire, 6.25% overhead.' },
        { q: 'A browser fetches www.example.co.in. Name, in order, the four DNS server kinds the lookup visits; state the port DNS listens on and the number of root name servers.', solution: [
          'Take the first step of every fetch: the browser hands the name to the recursive resolver - the librarian who does the running.',
          'So, the resolver asks a root server - the index - which points it to the TLD server for the .in ending.',
          'Then the TLD server - the rack - points to the authoritative server - the book - that actually holds the record.',
          'Hence the answer travels back and the browser sends its HTTP request to the IP: eight steps, four server kinds.',
          'Check the constants: DNS listens on port 53, and there are 13 root name servers, named A to M.',
        ], answer: 'recursive resolver -> root server -> TLD server -> authoritative server; port 53; 13 roots, A to M.', figures: [
          { caption: 'The DNS lookup in order for this question: the five chips of the ladder with steps 1-4 out and 5-8 back, port 53 and the thirteen roots noted.', svg: cf6RResolveSvg() },
        ] },
        { q: 'You receive an urgent mail: \'Verify your account at https://my-bank.examp1e.security-check.com now.\' Name the trick, and give the citizen\'s three-part checklist.', solution: [
          'Read the domain from the right: the registrable name here is security-check.com - the attacker\'s site, and the real answer to \'who am I talking to?\'.',
          'So, everything to its left is costume: my-bank.examp1e is a chain of subdomains, and the digit 1 standing in for the letter l is the lookalike trick.',
          'Now, the https scheme and any padlock only certify the encryption of the connection - they say nothing about who runs the site, so Trap 5 is in play.',
          'Hence the checklist: read the domain from the right; look for the padlock but never trust it alone; and never click through fear.',
        ], answer: 'a phishing lookalike riding subdomains of the attacker\'s domain - read the domain from the right, check the padlock, refuse the fear.' },
      ] },
      { level: 'L3', questions: [
        { q: '(Exam-style) A document of 6 pages, each 1,500 characters, each character coded in 8 bits, must arrive within 30 seconds. Compute the minimum required rate in bps, and state it in kbps.', solution: [
          'Count the characters first: $6 \\times 1{,}500 = 9{,}000$ characters in the document.',
          'Now, convert to bits: $9{,}000 \\times 8 = 72{,}000$ bits to be carried.',
          'So, divide by the time: $72{,}000 / 30 = 2{,}400$ bps - the minimum honest rate.',
          'Hence in kbps: $2{,}400 / 1{,}000 = 2.4$ kbps, and any slower line delivers the pages late.',
        ], answer: '2,400 bps, that is 2.4 kbps.' },
        { q: '(Exam-style) VSNL\'s 1995 public line ran at 9.6 kbit/s. (a) How long did a 60 MB file take - in seconds and in hours? (b) How many years after ERNET (1986) did the public gateway (1995) open, and how many years after ARPANET\'s first message (1969)?', solution: [
          'Split (a) into its three moves: convert the file - $60\\ \\text{MB} \\times 8 = 480$ Mbit, that is $480{,}000{,}000$ bits.',
          'So, divide by the rate: $480{,}000{,}000 / 9{,}600 = 50{,}000$ seconds.',
          'Then convert to hours: $50{,}000 / 3{,}600 = 13.9$ hours (13 hrs 53 min) - the patience our connection era demanded.',
          'Now, (b) is subtraction: $1995 - 1986 = 9$ years after ERNET, and $1995 - 1969 = 26$ years after the first message.',
        ], answer: '50,000 s = 13.9 hours; 9 years after ERNET; 26 years after ARPANET.', figures: [
          { caption: 'The patience calculation as a chain for this question: 60 MB x 8 = 480 Mbit; / 9,600 bps = 50,000 s; / 3,600 = 13.9 h, with the 1995 tariff noted.', svg: cf6RPatienceSvg() },
        ] },
        { q: '(Exam-style) State the address census: the bit-lengths of IPv4, IPv6 and MAC addresses, the value of $2^{32}$, and what the MAC\'s 48 bits contain.', solution: [
          'Take the census in order: IPv4 is 32 bits - four octets of 8, as in 192.168.0.178.',
          'So, IPv6 is 128 bits - eight groups of 16, a space of $2^{128}$, about $3.4 \\times 10^{38}$.',
          'Then the MAC is 48 bits - a 24-bit manufacturer OUI plus a 24-bit serial, written as 12 hex digits and burnt into the NIC.',
          'Hence the IPv4 space: $2^{32} = 4{,}294{,}967{,}296$ - just under 4.3 billion, and not enough for the world that joined.',
        ], answer: 'IPv4 32 bits, IPv6 128 bits, MAC 48 bits; 2^32 = 4,294,967,296; MAC = OUI (24 bits) + serial (24 bits).' },
        { q: '(Exam-style) Describe HTTP\'s two-message dance; state what stateless means, what 404 reports, and what HTTPS adds.', solution: [
          'Take the dance first: the browser - the client - sends a request (\'GET me this page\'), and the server returns a response: the page, or an error.',
          'So, stateless means each request stands alone: the protocol remembers nothing between requests, which is why cookies had to be invented.',
          'Then 404 is the honest page-not-found response - the server heard you, and it does not have that path.',
          'Hence HTTPS adds TLS: the same two messages with the conversation encrypted in transit - the padlock in the address bar.',
        ], answer: 'request then response; no memory between requests; 404 = page not found; HTTPS = HTTP over TLS.' },
        { q: '(Exam-style, mixed) A route crosses 4 hops at 25 ms each. (a) The one-way delay? (b) The round-trip time? (c) If one of the three packets carrying a message that totals 810 bytes on the wire is lost, what does the receiver hold - and why is that not the message?', solution: [
          'Take (a): $4 \\times 25 = 100$ ms one-way - the hops accumulate.',
          'So, (b): the round trip pays every hop twice, $2 \\times 100 = 200$ ms - and that is what ping reports.',
          'Now, (c): the 810 bytes were three packets of 270 (250-byte payloads, 20-byte headers); the receiver holds two of the three.',
          'Hence the reassembly rule: without the missing packet the ordering cannot complete - two packets of three is an incomplete message, not a shorter one.',
        ], answer: '100 ms one-way, 200 ms RTT; two packets of three - an incomplete message, by the all-or-nothing reassembly rule.' },
      ] },
    ] },

    // ================================================================
    // 9. THE VOCABULARY HARVEST
    // ================================================================
    { kind: 'heading', text: 'The Vocabulary Harvest' },
    { kind: 'para', text: 'The chapter\'s terms, one line each - the glossary the three lessons built and this review re-shelved. Cover the right column and read the left as a roll call; any silence names the lesson to reopen.' },
    { kind: 'terms', items: [
      { term: 'network', def: 'two or more machines joined so that they can share - files, a printer, one Internet connection.' },
      { term: 'protocol', def: 'the set of standard rules that the sender, the receiver and all intermediate devices follow.' },
      { term: 'PAN', def: 'the personal area network: your own desk, about 10 m, the Bluetooth class.' },
      { term: 'LAN', def: 'the local area network: a room, a floor, a building - up to 1 km of Ethernet.' },
      { term: 'MAN', def: 'the metropolitan area network: a city, 30-40 km, the cable-TV case.' },
      { term: 'WAN', def: 'the wide area network: countries and continents - and the Internet is the largest of all.' },
      { term: 'topology', def: 'the arrangement question: star ($n-1$ links), bus (1), ring ($n$), mesh ($n(n-1)/2$).' },
      { term: 'bandwidth', def: 'the maximum rate of data transfer across a path, in bits per second.' },
      { term: 'latency', def: 'the time delay between cause and effect; the round trip is twice the one-way.' },
      { term: 'packet', def: 'a chunk of a message: a header (destination and ordering) over a payload, reassembled at the destination.' },
      { term: 'router', def: 'the device that connects networks and chooses the path, packet by packet.' },
      { term: 'ISP', def: 'any organisation that provides access to the Internet.' },
      { term: 'IP address', def: 'the network\'s name for a machine\'s place: 32 bits in IPv4, 128 in IPv6; it changes when the node moves.' },
      { term: 'MAC address', def: 'the 48-bit hardware plate burnt into the NIC: a 24-bit OUI plus a 24-bit serial.' },
      { term: 'DNS', def: 'the phonebook: domain name resolution by the DNS server, port 53, four server kinds, 13 roots A-M.' },
      { term: 'World Wide Web', def: 'one service riding the Internet: pages in HTML, found by URLs, moved by HTTP.' },
      { term: 'URL', def: 'the address of a unique resource: scheme, authority, path, parameters, anchor.' },
      { term: 'HTTP', def: 'the two-message dance of the Web - request, response - stateless by design; 404 is page not found.' },
      { term: 'HTTPS', def: 'HTTP over TLS: the same dance encrypted in transit, shown as the padlock.' },
      { term: 'cookie', def: 'a small piece of data the server sends, the browser stores, and later requests return - the shopping-cart memory.' },
      { term: 'phishing', def: 'the social-engineering attack that fakes a trusted site so you type your credentials into the copy.' },
    ] },

    // ================================================================
    // 10. CHECK YOURSELF
    // ================================================================
    { kind: 'heading', text: 'Check Yourself' },
    { kind: 'quiz', items: [
      { q: 'Which of the following is the largest WAN in the chapter\'s span census?', options: ['the Internet itself', 'a city\'s cable-TV network', 'one office building\'s Ethernet', 'a Bluetooth pair on one desk'], answer: 0, explain: 'The span census runs PAN (about 10 m - the Bluetooth desk, option 3), LAN (up to 1 km - the building Ethernet, option 2), MAN (30-40 km - the city cable-TV network, option 1) and WAN (countries and continents) - and the chapter\'s pinned line is that the Internet is the LARGEST WAN of all, the network of networks. Each wrong option is a real member of the census; the superlative belongs to the Internet alone, and that one word - largest - is what the question tests.' },
      { q: 'A 750-byte message travels as packets of 250-byte payloads, each with a 20-byte header. How many bytes are on the wire in total?', options: ['750 bytes', '770 bytes', '800 bytes', '810 bytes'], answer: 3, explain: 'The message needs $750/250 = 3$ packets; each carries its 250-byte payload plus a 20-byte header, so each is 270 bytes on the wire, and $3 \\times 270 = 810$. Option 0 counts the bare message and forgets the headers entirely; option 1 imagines one 20-byte header for the whole message; option 2 miscounts the header bill as 50 bytes. The honest overhead is 60 header bytes - $60/810 = 7.41\\%$ of the wire - and one lost packet of the three leaves the message incomplete.' },
      { q: 'What happened on the flag day of 1 January 1983?', options: ['ARPANET carried its first message, the two-letter \'lo\'', 'every ARPANET host switched from NCP to TCP/IP at one stroke', 'DNS replaced the single HOSTS.TXT table', 'CERN released the Web to the public domain'], answer: 1, explain: 'The flag day is the treaty\'s enforcement date: every host moved from the older NCP protocol to TCP/IP at once, which is why the Internet\'s membership can be said to speak one protocol family. Option 0 belongs to October 1969 (UCLA to SRI, the crash after \'lo\'); option 2 to November 1983 (Mockapetris\'s DNS); option 3 to April 1993. Four dates, four different events - the chapter\'s timeline keeps them apart, and so should you.' },
      { q: 'In the URL https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2, the span ?q=glassdoor is the URL\'s ...', options: ['scheme', 'authority', 'path', 'anchor', 'parameters'], answer: 4, explain: 'The five-part census runs scheme (https - option 0, before the colon), authority (www.example.co.in:443 - option 1, the who), path (textbook/ch6.htm - option 2, up to the question mark), parameters (?q=glassdoor - the asked span) and anchor (#sec2 - option 3, after the hash). The question mark introduces the parameters, the extra input a page receives; the hash introduces the anchor. Learn the census and no URL, however long, can confuse you.' },
      { q: 'An ISP sells you a \'100 Mbps\' line. At the very best, roughly how fast are your downloads?', options: ['800 MBps', '100 MBps', '12.5 MBps', '8 MBps'], answer: 2, explain: 'The line is sold in megabits; the download window reports megabytes; one byte is eight bits - so $100/8 = 12.5$ MBps, the honest ceiling. Option 1 forgets the bit-to-byte gap entirely; option 0 multiplies where it should divide; option 4 quotes the conversion factor itself as if it were a speed. This is the ISP-bill trap the chapter pinned, and every examination style this book serves has asked it in some costume - convert first, then divide.' },
    ] },
    { kind: 'para', text: 'The chapter closes here. Three lessons ago you owned a machine that could not reach another one; now you own the whole chain - the five-component conversation, the counted topologies, the tiered and dated network of networks, and the citizen\'s Web read with a professional eye. Take the census, the arithmetic and the honest distinctions through whichever door opens next: \'Computer Networks\' for the deep theory, \'Cybersecurity\' for the threat model, \'Full-Stack Web Development\' for the building of the pages themselves. The review\'s last word is the chapter\'s first principle: a connection is a conversation under rules - and now you can price the rules, name the speakers, and read the address bar like a native.' },
  ],
}
