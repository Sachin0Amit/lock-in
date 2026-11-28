import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf61.ts — CS RUN 11 seat cf61 (the LIBRARY lesson).
 *
 * Lesson 6.1 'The Network Idea' of Computer Fundamentals chapter 6
 * 'Connecting Computers'. The chapter opens with the honest anatomy of
 * every conversation between machines: the five components of data
 * communication (sender, receiver, medium, message, protocol), the
 * distance census (PAN about 10 m, LAN up to 1 km, MAN 30-40 km, WAN
 * countries and continents, the Internet the largest WAN), the media
 * census (twisted-pair, coaxial, optical fibre against Wi-Fi, Bluetooth,
 * microwave), the topology arithmetic (star n-1, bus 1, ring n, mesh
 * n(n-1)/2: n=6 -> 5/1/6/15, and the MDN case n=10 -> 45 direct cables
 * vs 10 through a switch), bandwidth and latency named honestly (the
 * 2^10/2^20/2^30/2^40 ladder, 1 MBps = 8 Mbps, 4 hops x 25 ms = 100 ms
 * one-way and 200 ms round-trip), packets (the pinned 750-byte message
 * in 250-byte payloads with 20-byte headers = 3 packets, 810 bytes on
 * the wire, overhead 7.41%), the 6,400 bps transfer-rate genre (10
 * pages x 1,600 characters x 8 bits in 20 s) and the six-member device
 * census (NIC, repeater, hub, switch, router, modem). The deep theory
 * rides the 'Computer Networks' book; the bus-level view inside the box
 * rides 'Computer Organization and Architecture'.
 *
 * Every number printed here is pinned green by v-cf61.ts (76 engine
 * checks ran GREEN before this prose was written; the pin block closes
 * the ring). All figures are self-contained computed SVGs in the house
 * palette; every geometry constant is derived, never eyeballed.
 * Study-never-reproduce: every roster, witness, figure, Illustration,
 * quiz item and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const c61 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f61 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order (x, y, weight, size,
   fill, anchor) so the engine's clip audit can parse every label */
function cf61T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* small numbered badge — the census counter used on every figure */
const cf61Badge = (bx: number, by: number, n: number): string =>
  `<circle cx="${bx}" cy="${by}" r="11" fill="${c61.teal}" stroke="${c61.tealInk}" stroke-width="1.5"/>` +
  cf61T(bx, by + 3.5, 10, c61.white, 'middle', String(n), true)

/* ================================================================== */
/* BODY FIGURE A — the five-component path: SENDER and RECEIVER boxes  */
/* joined by a channel bar; a message envelope above; a protocol       */
/* rulebook below; five numbered badges                                */
/* ================================================================== */
const cf61PathSvg = (): string => {
  const W = 760
  const H = 318
  const s: string[] = []
  const sx = 48
  const rx = 572
  const by = 126
  const bh = 70
  const chX = 188
  const chW = 384
  const chY = 146
  const chH = 30
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f61}" role="img" aria-label="The five-component path of data communication: a sender box on the left and a receiver box on the right joined by a horizontal channel bar labelled communication medium, with a message envelope riding above the channel and a protocol rulebook pinned below it. Five numbered badges mark the census: one sender, two receiver, three medium, four message, five protocol.">`)
  s.push(cf61T(W / 2, 26, 12, c61.teal, 'middle', 'THE FIVE-COMPONENT PATH - EVERY CONVERSATION, DRAWN ONCE', true))
  s.push(cf61T(W / 2, 44, 9.5, c61.tealInk, 'middle', 'the census NCERT pins: sender, receiver, medium, message, protocol - all five, every time'))
  /* the two hosts */
  s.push(`<rect x="${sx}" y="${by}" width="140" height="${bh}" rx="7" fill="${c61.white}" stroke="${c61.struct}" stroke-width="2"/>`)
  s.push(cf61T(sx + 70, by + 26, 11, c61.ink, 'middle', 'SENDER', true))
  s.push(cf61T(sx + 70, by + 44, 9.5, c61.tealInk, 'middle', 'the machine that'))
  s.push(cf61T(sx + 70, by + 58, 9.5, c61.tealInk, 'middle', 'sends the message'))
  s.push(`<rect x="${rx}" y="${by}" width="140" height="${bh}" rx="7" fill="${c61.white}" stroke="${c61.struct}" stroke-width="2"/>`)
  s.push(cf61T(rx + 70, by + 26, 11, c61.ink, 'middle', 'RECEIVER', true))
  s.push(cf61T(rx + 70, by + 44, 9.5, c61.tealInk, 'middle', 'the machine that'))
  s.push(cf61T(rx + 70, by + 58, 9.5, c61.tealInk, 'middle', 'receives it'))
  /* the channel */
  s.push(`<rect x="${chX}" y="${chY}" width="${chW}" height="${chH}" rx="6" fill="${c61.panelB}" stroke="${c61.conn}" stroke-width="2"/>`)
  s.push(cf61T(chX + chW / 2, chY + 19, 9.5, c61.ink, 'middle', 'COMMUNICATION MEDIUM - THE CHANNEL', true))
  s.push(`<polygon points="${rx - 12},${chY + 8} ${rx - 12},${chY + 22} ${rx + 2},${chY + 15}" fill="${c61.conn}"/>`)
  /* the message envelope riding the channel */
  s.push(`<rect x="316" y="88" width="128" height="44" rx="6" fill="${c61.faint}" stroke="${c61.tealInk}" stroke-width="2"/>`)
  s.push(cf61T(380, 106, 10, c61.tealInk, 'middle', 'MESSAGE', true))
  s.push(cf61T(380, 122, 9.5, c61.tealInk, 'middle', 'the data being sent'))
  s.push(`<line x1="380" y1="132" x2="380" y2="143" stroke="${c61.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="374,141 386,141 380,147" fill="${c61.conn}"/>`)
  /* the protocol rulebook pinned below */
  s.push(`<rect x="310" y="196" width="140" height="52" rx="7" fill="${c61.white}" stroke="${c61.teal}" stroke-width="2"/>`)
  s.push(cf61T(380, 216, 10, c61.ink, 'middle', 'PROTOCOL', true))
  s.push(cf61T(380, 232, 9.5, c61.tealInk, 'middle', 'the shared rules'))
  s.push(`<line x1="312" y1="218" x2="192" y2="196" stroke="${c61.tealInk}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
  s.push(`<line x1="448" y1="218" x2="568" y2="196" stroke="${c61.tealInk}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
  /* the five census badges */
  s.push(cf61Badge(sx + 14, by + 6, 1))
  s.push(cf61Badge(rx + 14, by + 6, 2))
  s.push(cf61Badge(chX + 18, chY + 15, 3))
  s.push(cf61Badge(330, 98, 4))
  s.push(cf61Badge(322, 204, 5))
  /* the caption strip */
  s.push(`<rect x="16" y="258" width="${W - 32}" height="46" rx="8" fill="${c61.panelB}" stroke="${c61.conn}" stroke-width="2"/>`)
  s.push(cf61T(W / 2, 276, 10, c61.ink, 'middle', 'the honest census: 5 components - sender, receiver, communication medium, message, protocol', true))
  s.push(cf61T(W / 2, 294, 9.5, c61.tealInk, 'middle', 'remove any one of the five and the conversation does not happen - each is necessary, none is sufficient'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE B — the topology census for n = 6: four mini-panels     */
/* (star / bus / ring / mesh) with every edge COMPUTED                 */
/* ================================================================== */
const cf61TopoSvg = (): string => {
  const W = 760
  const H = 292
  const s: string[] = []
  const px = [18, 204, 390, 576]
  const pw = 172
  const py = 56
  const ph = 154
  const cy = 140
  const R = 46
  const nodeR = 6
  const titles = ['STAR', 'BUS', 'RING', 'MESH']
  const counts = ['5 links: n - 1 = 6 - 1', '1 shared backbone', '6 links: n = 6', '15 links: n(n-1)/2 = 15']
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f61}" role="img" aria-label="The topology census counted for six nodes: four panels side by side. The star panel shows six computers each wired to one central node, five links. The bus panel shows one shared backbone line with six taps, one backbone. The ring panel shows six computers joined in a single loop, six links. The mesh panel shows six computers with every pair directly wired, fifteen links.">`)
  s.push(cf61T(W / 2, 24, 12, c61.teal, 'middle', 'THE TOPOLOGY CENSUS, COUNTED FOR n = 6 NODES', true))
  s.push(cf61T(W / 2, 42, 9.5, c61.tealInk, 'middle', 'the arrangement question: star, bus, ring, mesh - same six computers, four different wiring bills'))
  for (let k = 0; k < 4; k++) {
    const x0 = px[k]
    const cx = x0 + pw / 2
    s.push(`<rect x="${x0}" y="${py}" width="${pw}" height="${ph}" rx="7" fill="${c61.white}" stroke="${c61.struct}" stroke-width="2"/>`)
    s.push(cf61T(cx, 74, 10.5, c61.ink, 'middle', titles[k], true))
    if (k === 0) {
      /* STAR: centre plus 6 leaves, edges = 5 */
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180
        return [cx + R * Math.cos(a), cy + R * Math.sin(a)] as [number, number]
      })
      pts.forEach((p) => s.push(`<line x1="${cx}" y1="${cy}" x2="${p[0]}" y2="${p[1]}" stroke="${c61.conn}" stroke-width="1.6"/>`))
      pts.forEach((p) => s.push(`<circle cx="${p[0]}" cy="${p[1]}" r="${nodeR}" fill="${c61.white}" stroke="${c61.ink}" stroke-width="1.8"/>`))
      s.push(`<circle cx="${cx}" cy="${cy}" r="7.5" fill="${c61.teal}" stroke="${c61.tealInk}" stroke-width="1.8"/>`)
    } else if (k === 1) {
      /* BUS: one backbone, 6 stubs */
      const bx0 = x0 + 16
      const bx1 = x0 + 156
      const xs = Array.from({ length: 6 }, (_, i) => x0 + 26 + i * 24)
      xs.forEach((x) => s.push(`<line x1="${x}" y1="106" x2="${x}" y2="${cy}" stroke="${c61.ink}" stroke-width="1.6"/>`))
      xs.forEach((x) => s.push(`<rect x="${x - 6}" y="94" width="12" height="12" rx="2" fill="${c61.white}" stroke="${c61.ink}" stroke-width="1.8"/>`))
      s.push(`<line x1="${bx0}" y1="${cy}" x2="${bx1}" y2="${cy}" stroke="${c61.conn}" stroke-width="3"/>`)
      s.push(`<circle cx="${bx0}" cy="${cy}" r="4" fill="${c61.accent}"/>`)
      s.push(`<circle cx="${bx1}" cy="${cy}" r="4" fill="${c61.accent}"/>`)
    } else {
      /* RING and MESH share the six node positions */
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180
        return [cx + R * Math.cos(a), cy + R * Math.sin(a)] as [number, number]
      })
      if (k === 2) {
        for (let i = 0; i < 6; i++) {
          const p = pts[i]
          const q = pts[(i + 1) % 6]
          s.push(`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${c61.conn}" stroke-width="1.6"/>`)
        }
      } else {
        for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
          s.push(`<line x1="${pts[i][0]}" y1="${pts[i][1]}" x2="${pts[j][0]}" y2="${pts[j][1]}" stroke="${c61.conn}" stroke-width="1.1"/>`)
        }
      }
      pts.forEach((p) => s.push(`<circle cx="${p[0]}" cy="${p[1]}" r="${nodeR}" fill="${c61.white}" stroke="${c61.ink}" stroke-width="1.8"/>`))
    }
    s.push(cf61T(cx, 202, 9.5, c61.tealInk, 'middle', counts[k]))
  }
  s.push(`<rect x="16" y="224" width="${W - 32}" height="54" rx="8" fill="${c61.panelB}" stroke="${c61.conn}" stroke-width="2"/>`)
  s.push(cf61T(W / 2, 244, 10, c61.ink, 'middle', 'the wiring bill for n = 6: star 5, bus 1, ring 6, mesh 15 - and mesh beats star by 15 - 5 = 10 extra links', true))
  s.push(cf61T(W / 2, 262, 9.5, c61.tealInk, 'middle', 'the MDN case, n = 10: 45 direct cables for a full mesh vs 10 cables through one switch - the switch saves 35'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE C — the packet envelopes: 750 B sliced into 3 letters,   */
/* each 20 B header over 250 B payload                                 */
/* ================================================================== */
const cf61PacketSvg = (): string => {
  const W = 760
  const H = 330
  const s: string[] = []
  const exs = [40, 275, 510]
  const ew = 210
  const ey = 106
  const eh = 118
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f61}" role="img" aria-label="The packet envelopes: a 750-byte message bar at the top is sliced into three envelopes, each carrying a 20-byte header strip marked to B, from A, with a sequence number, over a 250-byte payload strip. The caption totals three packets of 270 bytes, 810 bytes on the wire, and 7.41 percent overhead.">`)
  s.push(cf61T(W / 2, 24, 12, c61.teal, 'middle', 'THE PACKET ENVELOPES - ONE MESSAGE, THREE LETTERS', true))
  s.push(cf61T(W / 2, 42, 9.5, c61.tealInk, 'middle', 'a 750-byte message sliced into 3 packets: each carries a 20-byte header over a 250-byte payload'))
  s.push(`<rect x="48" y="58" width="664" height="26" rx="6" fill="${c61.panelA}" stroke="${c61.accent}" stroke-width="2"/>`)
  s.push(cf61T(380, 75, 10, c61.ink, 'middle', 'THE MESSAGE - 750 BYTES, CUT INTO THREE 250-BYTE PIECES', true))
  exs.forEach((x0, k) => {
    const cxm = x0 + ew / 2
    s.push(`<line x1="${cxm}" y1="84" x2="${cxm}" y2="101" stroke="${c61.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="${cxm - 5},99 ${cxm + 5},99 ${cxm},105" fill="${c61.conn}"/>`)
    s.push(`<rect x="${x0}" y="${ey}" width="${ew}" height="${eh}" rx="8" fill="${c61.white}" stroke="${c61.teal}" stroke-width="2"/>`)
    s.push(`<rect x="${x0 + 8}" y="${ey + 8}" width="${ew - 16}" height="42" rx="5" fill="${c61.faint}" stroke="${c61.tealInk}" stroke-width="1.5"/>`)
    s.push(cf61T(cxm, ey + 24, 9.5, c61.tealInk, 'middle', 'HEADER - 20 BYTES', true))
    s.push(cf61T(cxm, ey + 40, 9.5, c61.tealInk, 'middle', `TO B | FROM A | SEQ ${k + 1} OF 3`))
    s.push(`<rect x="${x0 + 8}" y="${ey + 56}" width="${ew - 16}" height="54" rx="5" fill="${c61.panelB}" stroke="${c61.conn}" stroke-width="1.5"/>`)
    s.push(cf61T(cxm, ey + 74, 10, c61.ink, 'middle', 'PAYLOAD - 250 BYTES', true))
    s.push(cf61T(cxm, ey + 92, 9.5, c61.tealInk, 'middle', `piece ${k + 1} of the message`))
    s.push(cf61T(cxm, ey + 112, 9.5, c61.teal, 'middle', `PACKET ${k + 1}: 270 bytes on the wire`, true))
  })
  s.push(`<rect x="16" y="240" width="${W - 32}" height="66" rx="8" fill="${c61.panelB}" stroke="${c61.conn}" stroke-width="2"/>`)
  s.push(cf61T(W / 2, 260, 10, c61.ink, 'middle', 'on the wire: 3 packets x (250 + 20) = 3 x 270 = 810 bytes; the payload itself is still 750', true))
  s.push(cf61T(W / 2, 278, 9.5, c61.tealInk, 'middle', 'overhead = 3 x 20 = 60 bytes = 60/810 = 7.41% of everything sent'))
  s.push(cf61T(W / 2, 296, 9.5, c61.tealInk, 'middle', 'packets may take different routes; the receiver reassembles them by SEQ - lose one and the message is incomplete'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE D — the hop ribbon: 4 hops at 25 ms, one-way 100 ms,     */
/* the reply retraces for a 200 ms round trip                          */
/* ================================================================== */
const cf61HopSvg = (): string => {
  const W = 760
  const H = 252
  const s: string[] = []
  const bw = 110
  const bh = 46
  const byy = 88
  const xs = Array.from({ length: 5 }, (_, i) => 37 + i * (bw + 34))
  const names = ['SOURCE', 'ROUTER 1', 'ROUTER 2', 'ROUTER 3', 'DESTINATION']
  const notes = ['your machine', 'a hop boundary', 'a hop boundary', 'a hop boundary', 'the far machine']
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f61}" role="img" aria-label="The hop ribbon: a source box, three router boxes and a destination box in a row, joined by four arrows each tagged plus 25 milliseconds, totalling 100 milliseconds one way. A dashed return path shows the reply retracing the same four hops for another 100 milliseconds, so the round-trip time is 200 milliseconds, which is what ping measures.">`)
  s.push(cf61T(W / 2, 24, 12, c61.teal, 'middle', 'THE HOP RIBBON - WHERE THE MILLISECONDS GO', true))
  s.push(cf61T(W / 2, 42, 9.5, c61.tealInk, 'middle', 'one hop = one router-to-router passage; the pinned path crosses 4 hops at 25 ms each'))
  for (let i = 0; i < 5; i++) {
    const fill = i === 0 || i === 4 ? c61.white : c61.panelB
    const stroke = i === 0 || i === 4 ? c61.struct : c61.conn
    s.push(`<rect x="${xs[i]}" y="${byy}" width="${bw}" height="${bh}" rx="7" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`)
    s.push(cf61T(xs[i] + bw / 2, byy + 20, 9.5, c61.ink, 'middle', names[i], true))
    s.push(cf61T(xs[i] + bw / 2, byy + 36, 9.5, c61.tealInk, 'middle', notes[i]))
  }
  for (let i = 0; i < 4; i++) {
    const a = xs[i] + bw + 3
    const b = xs[i + 1] - 3
    const m = (a + b) / 2
    s.push(`<line x1="${a}" y1="111" x2="${b - 6}" y2="111" stroke="${c61.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="${b - 7},105 ${b - 7},117 ${b + 1},111" fill="${c61.conn}"/>`)
    s.push(cf61T(m, 80, 9.5, c61.accent, 'middle', '+25 ms', true))
  }
  s.push(`<polyline points="${xs[4] + bw / 2},${byy + bh} ${xs[4] + bw / 2},168 ${xs[0] + bw / 2},168 ${xs[0] + bw / 2},${byy + bh + 4}" fill="none" stroke="${c61.tealInk}" stroke-width="1.8" stroke-dasharray="6 4"/>`)
  s.push(`<polygon points="${xs[0] + bw / 2 - 6},${byy + bh + 3} ${xs[0] + bw / 2 + 6},${byy + bh + 3} ${xs[0] + bw / 2},${byy + bh - 4}" fill="${c61.tealInk}"/>`)
  s.push(cf61T(W / 2, 186, 9.5, c61.tealInk, 'middle', 'the reply retraces the same 4 hops: another 4 x 25 = 100 ms'))
  s.push(`<rect x="16" y="198" width="${W - 32}" height="40" rx="8" fill="${c61.panelB}" stroke="${c61.conn}" stroke-width="2"/>`)
  s.push(cf61T(W / 2, 216, 10, c61.ink, 'middle', 'one-way latency = 4 hops x 25 ms = 100 ms; round-trip time RTT = 2 x 100 = 200 ms', true))
  s.push(cf61T(W / 2, 232, 9.5, c61.tealInk, 'middle', 'ping measures the round trip - halve its answer to price one way'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 1 — the span-census ladder (PAN -> LAN -> MAN -> WAN) */
/* ================================================================== */
const cf61SpanSvg = (): string => {
  const W = 760
  const H = 240
  const s: string[] = []
  const rows = [
    { name: 'PAN', w: 70, note: '~10 m', fill: c61.faint, stroke: c61.tealInk },
    { name: 'LAN', w: 150, note: 'up to 1 km', fill: c61.panelB, stroke: c61.conn },
    { name: 'MAN', w: 300, note: '30-40 km', fill: c61.panelA, stroke: c61.accent },
    { name: 'WAN', w: 460, note: 'countries and continents', fill: c61.white, stroke: c61.ink },
  ]
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f61}" role="img" aria-label="The span-census ladder: four horizontal bars of growing width sorting networks by reach. PAN reaches about 10 metres across your own desk, the Bluetooth class. LAN reaches up to 1 kilometre, a room, floor or building. MAN reaches 30 to 40 kilometres, a whole city, the cable-television class. WAN reaches across countries and continents, and the Internet is the largest WAN.">`)
  s.push(cf61T(W / 2, 26, 11, c61.teal, 'middle', 'THE SPAN CENSUS LADDER - SORT BY REACH', true))
  rows.forEach((r, i) => {
    const y = 48 + i * 34
    s.push(cf61T(36, y + 13, 9.5, c61.ink, 'start', r.name, true))
    s.push(`<rect x="90" y="${y}" width="${r.w}" height="18" rx="4" fill="${r.fill}" stroke="${r.stroke}" stroke-width="1.8"/>`)
    s.push(cf61T(90 + r.w + 10, y + 13, 9.5, c61.tealInk, 'start', r.note))
  })
  s.push(`<rect x="16" y="180" width="${W - 32}" height="40" rx="8" fill="${c61.panelB}" stroke="${c61.conn}" stroke-width="2"/>`)
  s.push(cf61T(W / 2, 198, 9.5, c61.ink, 'middle', 'the dividing question is span: about 10 m, then 1 km, then 30-40 km, then the world', true))
  s.push(cf61T(W / 2, 214, 9.5, c61.tealInk, 'middle', 'the Internet is the largest WAN; Ethernet LANs run 10 Mbps to 1000 Mbps'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 2 — the link-count solve board (mesh n=10 = 45)     */
/* ================================================================== */
const cf61BoardSvg = (): string => {
  const W = 760
  const H = 214
  const s: string[] = []
  const boxes = [
    { x: 40, t: 'FULL MESH', f: 'n(n-1)/2 = 10 x 9/2', n: '45', d: 'direct cables' },
    { x: 275, t: 'STAR', f: 'n - 1 = 10 - 1', n: '9', d: 'links to the centre' },
    { x: 510, t: 'ONE SWITCH', f: 'one cable per computer', n: '10', d: 'cables in total' },
  ]
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f61}" role="img" aria-label="The link-count solve board for ten computers: three boxes compare a full mesh needing n times n minus 1 over 2 equals 45 direct cables, a star needing n minus 1 equals 9 links to the centre, and one switch needing exactly 10 cables, one per computer. The bottom line notes the switch saves 35 cables.">`)
  s.push(cf61T(W / 2, 26, 11, c61.teal, 'middle', 'THE LINK-COUNT SOLVE BOARD - n = 10 COMPUTERS', true))
  boxes.forEach((b) => {
    const cx = b.x + 105
    s.push(`<rect x="${b.x}" y="50" width="210" height="104" rx="8" fill="${c61.white}" stroke="${c61.struct}" stroke-width="2"/>`)
    s.push(cf61T(cx, 70, 10, c61.ink, 'middle', b.t, true))
    s.push(cf61T(cx, 88, 9.5, c61.tealInk, 'middle', b.f))
    s.push(cf61T(cx, 122, 22, c61.accent, 'middle', b.n, true))
    s.push(cf61T(cx, 142, 9.5, c61.tealInk, 'middle', b.d))
  })
  s.push(cf61T(W / 2, 190, 10, c61.ink, 'middle', 'the MDN count: 45 direct cables vs 10 through a switch - the switch saves 45 - 10 = 35 cables', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 3 — the bandwidth units ladder (every rung x 1,024) */
/* ================================================================== */
const cf61UnitsSvg = (): string => {
  const W = 760
  const H = 232
  const s: string[] = []
  const rungs = ['1 Kbps = 1,024 bps', '1 Mbps = 1,048,576 bps', '1 Gbps = 1,073,741,824 bps', '1 Tbps = 1,099,511,627,776 bps']
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f61}" role="img" aria-label="The bandwidth units ladder: four stacked bars reading 1 kilobit per second equals 1,024 bits per second, 1 megabit per second equals 1,048,576 bits per second, 1 gigabit per second equals 1,073,741,824 bits per second, and 1 terabit per second equals 1,099,511,627,776 bits per second. Every rung multiplies by 1,024, and a bottom strip adds the byte trap: 1 megabyte per second equals 8 megabits per second.">`)
  s.push(cf61T(W / 2, 26, 11, c61.teal, 'middle', 'THE BANDWIDTH UNITS LADDER - EVERY RUNG x 1,024', true))
  rungs.forEach((r, i) => {
    const y = 48 + i * 36
    s.push(`<rect x="40" y="${y}" width="680" height="28" rx="5" fill="${i % 2 === 0 ? c61.panelB : c61.panelA}" stroke="${c61.conn}" stroke-width="1.8"/>`)
    s.push(cf61T(56, y + 18.5, 10, c61.ink, 'start', r, true))
    if (i > 0) s.push(cf61T(704, y + 18.5, 9.5, c61.tealInk, 'end', 'x 1,024 up'))
  })
  s.push(`<rect x="40" y="196" width="680" height="26" rx="6" fill="${c61.white}" stroke="${c61.warn}" stroke-width="2"/>`)
  s.push(cf61T(380, 213, 9.5, c61.warn, 'middle', 'and the byte trap: 1 MBps = 8 Mbps - a 100 Mbps line tops out at 12.5 MB/s', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 4 — the star-vs-mesh failure difference panel       */
/* ================================================================== */
const cf61FailSvg = (): string => {
  const W = 760
  const H = 240
  const s: string[] = []
  const R = 50
  const ptsAt = (cx: number, cy: number): Array<[number, number]> =>
    Array.from({ length: 6 }, (_, i) => {
      const a = ((-90 + i * 60) * Math.PI) / 180
      return [cx + R * Math.cos(a), cy + R * Math.sin(a)] as [number, number]
    })
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f61}" role="img" aria-label="The failure difference between star and mesh for six computers. In the star panel the central node carries a red cross: when the centre dies all five links go dark and no computer can reach another. In the mesh panel one link is drawn red and dashed: the other fourteen links survive and traffic simply reroutes.">`)
  s.push(cf61T(W / 2, 26, 11, c61.teal, 'middle', 'THE FAILURE DIFFERENCE - STAR VS MESH, n = 6', true))
  /* left: star with dead centre */
  s.push(`<rect x="24" y="48" width="350" height="168" rx="8" fill="${c61.white}" stroke="${c61.struct}" stroke-width="2"/>`)
  s.push(cf61T(199, 66, 10, c61.ink, 'middle', 'STAR: ONE CENTRE, ONE FATE', true))
  const sp = ptsAt(199, 138)
  sp.forEach((p) => s.push(`<line x1="199" y1="138" x2="${p[0]}" y2="${p[1]}" stroke="${c61.conn}" stroke-width="1.4"/>`))
  sp.forEach((p) => s.push(`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${c61.white}" stroke="${c61.ink}" stroke-width="1.8"/>`))
  s.push(`<circle cx="199" cy="138" r="8" fill="${c61.white}" stroke="${c61.ink}" stroke-width="1.8"/>`)
  s.push(`<line x1="192" y1="131" x2="206" y2="145" stroke="${c61.warn}" stroke-width="2.5"/>`)
  s.push(`<line x1="206" y1="131" x2="192" y2="145" stroke="${c61.warn}" stroke-width="2.5"/>`)
  s.push(cf61T(199, 204, 9.5, c61.tealInk, 'middle', 'the centre dies -> all 5 links go dark'))
  /* right: mesh with one dead link */
  s.push(`<rect x="386" y="48" width="350" height="168" rx="8" fill="${c61.white}" stroke="${c61.struct}" stroke-width="2"/>`)
  s.push(cf61T(561, 66, 10, c61.ink, 'middle', 'MESH: MANY ROADS, ONE LOST', true))
  const mp = ptsAt(561, 138)
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
    const dead = i === 0 && j === 1
    s.push(`<line x1="${mp[i][0]}" y1="${mp[i][1]}" x2="${mp[j][0]}" y2="${mp[j][1]}" stroke="${dead ? c61.warn : c61.conn}" stroke-width="${dead ? 2.2 : 1.1}"${dead ? ' stroke-dasharray="5 4"' : ''}/>`)
  }
  mp.forEach((p) => s.push(`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${c61.white}" stroke="${c61.ink}" stroke-width="1.8"/>`))
  s.push(cf61T(561, 204, 9.5, c61.tealInk, 'middle', 'one link dies -> traffic reroutes'))
  s.push(cf61T(W / 2, 232, 9.5, c61.tealInk, 'middle', 'the star is cheap and centralised; the mesh is dear and resilient - 5 links vs 15'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* the lesson                                                          */
/* ================================================================== */
export const lesson61: Lesson = {
  id: 'cf-the-network-idea',
  number: '6.1',
  title: 'The Network Idea',
  concepts: [
    'why machines talk: files, printers, one Internet connection',
    'the five components: sender, receiver, medium, message, protocol',
    'the distance census: PAN, LAN, MAN, WAN',
    'wired and wireless media',
    'topology and the link count: star, bus, ring, mesh',
    'bandwidth and latency, named honestly',
    'packets, headers and overhead',
    'the device census: NIC to modem',
  ],
  objectives: [
    'By the end of this lesson you can state the five components of data communication - sender, receiver, message, communication medium and protocol - and name all five in any conversation you are shown, including one passed by notes through a corridor.',
    'By the end of this lesson you can sort any network into the distance census by asking one dividing question, how far does it reach: a PAN of about 10 m, a LAN of up to 1 km, a MAN of 30-40 km across a city, or a WAN joining countries and continents - and you can say why the Internet is the largest WAN.',
    'By the end of this lesson you can count the wiring bill of each topology: a star of $n$ computers needs $n-1$ links, a bus needs 1 shared backbone, a ring needs $n$, and a full mesh needs $n(n-1)/2$ - so for $n = 6$ you get 5, 1, 6 and 15, and for ten computers 45 direct cables against 10 through a switch.',
    'By the end of this lesson you can convert the bandwidth ladder honestly ($1$ Kbps $= 1{,}024$ bps up to $1$ Tbps $= 2^{40}$ bps), refuse the classic trap ($1$ MBps $= 8$ Mbps), and compute the required rate of a transfer in the 6,400 bps genre: pages x characters x 8 bits divided by seconds.',
    'By the end of this lesson you can slice a message into packets and price the overhead: a 750-byte message in 250-byte payloads with 20-byte headers travels as 3 packets of 270 bytes, 810 bytes on the wire, 60 bytes of pure header - 7.41% overhead - and you can re-run the arithmetic for any message size.',
    'By the end of this lesson you can add latency hop by hop (4 hops x 25 ms = 100 ms one way, 200 ms round trip, which is what ping measures) and name the six-member device census - NIC, repeater, hub, switch, router, modem - one honest line each.',
  ],
  prerequisites: ['cf-unit-5-completion-review'],
  sources: ['cs-cf-web-ground-ch06'],
  blocks: [
    // ================================================================
    // 1. WHY TALK AT ALL
    // ================================================================
    { kind: 'heading', text: 'Why Talk at All' },
    { kind: 'para', text: 'Chapters 1 to 5 gave you one machine, whole and working: the box of chapter 4, the software families of chapter 5, the operating system running the show. It is a complete world - and a lonely one. The moment you want the photograph your friend took, the document your colleague typed, or the page a web server holds on the far side of the planet, one machine alone cannot help you. This chapter is about the fix: connect the machines. Lesson 6.1 takes the idea itself properly - what a network is, what every conversation between machines must contain, how far networks reach, how they are arranged, and how their two honest prices, bandwidth and latency, are measured and computed.' },
    { kind: 'para', text: 'Begin with the ordinary wishes, because the whole subject grows out of them. You want to **share files** - move a document from one machine to another without walking a pen drive across the room. You want to **share printers** - one printer serving a whole floor, because a printer at every desk is dear and daft. And you want to **share one Internet connection** - the whole household or the whole office riding a single wire to an Internet service provider. Files, printers, one connection: three wishes, one answer. Connect the machines, agree on the rules, and each wish is granted.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — network', text: 'A **network** is said to be a collection of two or more computing devices, connected through a communication medium, that can exchange data by agreed rules. Symbolically: a network exists when you can name (i) at least two distinct devices, (ii) the medium that joins them, and (iii) the protocol they both obey - miss any one of the three and you have parts, not a network. A single laptop with its screen is not a network; two laptops over one Wi-Fi channel, speaking the same rules, are.' },
    { kind: 'para', text: 'The definition is deliberately spare, and its three clauses are worth one more look each. At least two devices - the smallest honest network is a pair, one asking and one answering. A medium - something physical must carry the signal, a cable or a radio wave, even when everything else about the network feels weightless. Agreed rules - the quiet clause that does the heavy lifting, because two machines connected by a perfect cable and speaking different languages are two strangers holding a rope. That third clause deserves a definition of its own, and it opens the next section.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the network is an agreement before it is a wire', text: 'Notice what the definition puts first in practice: not the hardware but the agreement. Every network you have ever used quietly rested on rules both ends had agreed in advance - how to start a conversation, how to address the other side, how to know a message ended. Cut the wire and you can splice it; break the agreement and nothing you build on top will talk. Keep this order in mind and the five-component census below will feel inevitable rather than memorised.' },
    { kind: 'para', text: 'One more piece of honesty before the census. This lesson surveys the network idea at the depth a foundations course needs: you will learn the components, the distances, the arrangements, the units and the devices, each named exactly and counted where counting is possible. The deep theory - how switches actually learn addresses, how routers actually choose paths, how the Internet\'s protocols fit together - belongs to later doors, chiefly the **Computer Networks** book on this shelf, which owns switching, routing algorithms and the full device zoo. This lesson opens the door; that book walks through it.' },

    // ================================================================
    // 2. THE FIVE COMPONENTS
    // ================================================================
    { kind: 'heading', text: 'The Five Components of Every Conversation' },
    { kind: 'para', text: 'Strip any network conversation to its bones - an e-mail leaving your laptop, a photograph arriving on a phone, a page requested from a server - and the same skeleton appears every time. The Class XII treatment of data communication pins it as a census of five, and the census is worth carrying cold because every question about networks is secretly a question about one of these five.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the five components of data communication', text: '**Data communication** is said to be the exchange of data between two devices over a transmission medium. Its honest anatomy has exactly **5 components**: the **sender**, the device that sends the data; the **receiver**, the device that receives it; the **communication medium**, the channel - wired or wireless - that carries the signal; the **message**, the data actually being exchanged; and the **protocol**, the set of standard rules that the sender, the receiver and all intermediate devices follow. Symbolically: sender $\\to$ message $\\to$ medium $\\to$ receiver, with protocol wrapped around the whole journey like a grammar.' },
    { kind: 'para', text: 'Four of the five you could guess; the fifth is the one people forget, and it is the one that makes the other four work. The **protocol** is not a device and not a cable - it is an agreement, written down as a set of standard rules that the sender, the receiver and all intermediate devices follow. Without it, a sender may shout when the receiver is listening for a whisper; a message may arrive with no way to say who it is for; a conversation may never agree on when it has ended. MDN, the web\'s own documentation house, gives the same account: protocols are the agreed rules every party in the exchange obeys. The comparison with human language is exact and worth keeping - vocabulary without grammar is noise.' },
    { kind: 'para', text: 'For example, run the census on the least technological network you know: two friends passing a note through a corridor of classmates. Every component appears, honestly named:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) Asha, who writes the note and sends it on its way - the **sender**;',
      '(ii) Bharat, at the far end, who receives it and reads it - the **receiver**;',
      '(iii) the folded paper itself, the words actually travelling - the **message**;',
      '(iv) the corridor and the hands that pass the note along - the **communication medium**, the channel;',
      '(v) the agreed convention - notes move hand to hand, addressed on the outside, read only by the named reader - the **protocol**.',
    ] },
    { kind: 'figure', caption: 'The five-component path: a sender box and a receiver box joined by the channel, with the message riding above and the protocol rulebook pinned below. The census is exactly 5 components - sender, receiver, communication medium, message, protocol - and the badges count them in the order the definition names them. Lose any one - no sender to write, no receiver to read, no channel to carry, no message to send, no rules to agree - and the conversation does not happen.', svg: cf61PathSvg() },
    { kind: 'para', text: 'The figure is worth a slow read because it settles two confusions at once. First, the message is not the medium: the message is the cargo, the data being sent; the medium is the road it travels on. A photograph (message) may travel a Wi-Fi channel or a cable (medium) - swap the road and the cargo is unchanged. Second, the protocol is not optional decoration: in the picture it sits pinned between the two ends, exactly where an agreement belongs - shared, above the hardware, invisible in the photograph of a working network yet present in every successful delivery.' },
    { kind: 'example', title: 'Illustration 1. The corridor run: name the five components when Asha passes a note to Bharat through a row of classmates, then re-run the census for an e-mail.', steps: [
      'Take the corridor first and walk the census in order.',
      'So, the sender is Asha - she writes and sends; the receiver is Bharat - he receives and reads.',
      'Now, the message is the note itself, and the medium is the corridor of passing hands - the channel the note travels through.',
      'And the protocol is the class\'s agreed convention: address the note outside, pass it hand to hand, only the named reader opens it.',
      'Check the count: sender, receiver, message, medium, protocol - all 5 named, none missing.',
      'Hence re-run for the e-mail: sender your laptop, receiver the mail server (then Bharat\'s laptop), message the text you typed, medium the cables and radio of the Internet, protocol the mail rules both ends follow - the same census, only the actors change.',
    ] },
    { kind: 'para', text: 'The census also tells you where the interesting questions live. Ask who talks to whom and you are asking about network **topology** (section 5). Ask what carries the signal and you are asking about the **medium** (section 4). Ask how much can be carried, and how fast, and you are asking about **bandwidth** and **latency** (section 6). The rest of this lesson is the five components, cross-examined.' },
    { kind: 'table', caption: 'The five components, each with its one-line duty and the question it answers. Hold the questions and any conversation can be anatomised on sight.', head: ['Component', 'The one-line duty', 'The question it answers'], rows: [
      ['Sender', 'originates and sends the data', 'who is speaking?'],
      ['Receiver', 'receives and reads the data', 'who is listening?'],
      ['Message', 'the data actually exchanged', 'what is being said?'],
      ['Communication medium', 'the channel carrying the signal', 'what carries it?'],
      ['Protocol', 'the standard rules all parties follow', 'what are the agreed rules?'],
    ] },
    { kind: 'terms', items: [
      { term: 'network', def: 'two or more computing devices joined by a communication medium, exchanging data by agreed rules.' },
      { term: 'data communication', def: 'the exchange of data between two devices over a transmission medium.' },
      { term: 'sender', def: 'the device that sends the data - component one of the five.' },
      { term: 'receiver', def: 'the device that receives the data - component two.' },
      { term: 'message', def: 'the data actually being exchanged - the cargo, not the road.' },
      { term: 'communication medium', def: 'the channel, wired or wireless, that carries the signal between sender and receiver.' },
      { term: 'protocol', def: 'the set of standard rules that the sender, the receiver and all intermediate devices follow.' },
    ] },
    // ================================================================
    // 3. THE DISTANCE CENSUS
    // ================================================================
    { kind: 'heading', text: 'The Distance Census: PAN, LAN, MAN, WAN' },
    { kind: 'para', text: 'Networks come in every size, from two gadgets on one desk to the planet-spanning Internet, and the first honest question you can ask of any network is the dividing one: **how far does it reach?** Reach - the span - is the question because it decides everything downstream: which medium is affordable, who owns the wires, what can go wrong and how fast it can be fixed. The census that answers it has four classes, and every network you will ever meet sits in exactly one of them.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the distance census', text: 'The **distance census** sorts networks by span into exactly **4 classes**. A **PAN** (personal area network) is said to be a network of your own devices within about **10 m** - the Bluetooth class. A **LAN** (local area network) is said to be a network within a room, a floor or a building, up to about **1 km**. A **MAN** (metropolitan area network) is said to be a network spanning a city, about **30-40 km** - the cable-TV class. A **WAN** (wide area network) is said to be a network joining cities, countries and continents - and the **Internet is the largest WAN**. Symbolically: PAN $\\approx 10$ m $<$ LAN $\\le 1$ km $<$ MAN $\\le 40$ km $<$ WAN, with no upper bound on the last.' },
    { kind: 'para', text: 'Walk the ladder from the bottom. The **PAN** is the desk census: your phone, your earphones, your laptop, whispering to each other over Bluetooth or a similar short-range radio across a metre or two - about 10 m at the very outside. The school syllabus for classes IX-X includes the PAN in its census precisely because students meet it first; the Class XII treatment names the same four classes with the PAN as the smallest. Either way the census counts four, and the PAN is where counting begins.' },
    { kind: 'para', text: 'The **LAN** is the building census: one room, one floor, one office or one school building, up to about 1 km of reach. This is the Ethernet heartland. Ethernet LANs have run at 10 Mbps since their early years and now run at 100 Mbps and at Gigabit speeds - 1000 Mbps - a hundred-fold span between the humblest and the commonest. When a syllabus says LAN, this is the picture: one building, one owner, one wiring closet, and speeds from 10 Mbps to 1000 Mbps.' },
    { kind: 'para', text: 'The **MAN** is the city census: about 30-40 km of reach, the size of a large city, and its classic tenant is the cable-TV network - one company\'s cables threading an entire town to every subscribed television. The **WAN** is everything beyond: networks joining cities, countries and continents, built from long leased lines and undersea cables, owned by no single organisation. The Internet is the largest WAN - the honest superlative is safe because every other network you can name is, or sits upon, a part of it.' },
    { kind: 'table', caption: 'The distance census. The dividing question is one - how far does it reach - and every network answers it exactly once.', head: ['Class', 'Span', 'The ground it covers', 'Named example'], rows: [
      ['PAN', 'about 10 m', 'your own desk, your own gadgets', 'a phone talking to Bluetooth earphones'],
      ['LAN', 'up to 1 km', 'a room, a floor, a building', 'a school computer lab on Ethernet'],
      ['MAN', '30-40 km', 'a whole city', 'a cable-TV network'],
      ['WAN', 'countries, continents', 'the world', 'the Internet - the largest WAN'],
    ] },
    { kind: 'para', text: 'Two honest cautions keep the census straight. First, the classes divide by REACH, not by speed: a slow WAN is still a WAN and a fast LAN is still a LAN - a satellite link crawling across a continent is a WAN, and a Gigabit laboratory switch is a LAN. Second, the boundaries are about ownership and wiring as much as raw metres: the 1 km of the LAN is a rule of thumb for one building under one administration, and the 30-40 km of the MAN matches the footprint of one city and one cable operator. Judge reach, then judge again by who owns the wires, and the class names itself.' },
    { kind: 'example', title: 'Illustration 2. Sort four witnesses into the span census: (a) a Bluetooth headset talking to a phone on the same desk; (b) all the computers of one office floor; (c) a cable-TV network serving a whole city; (d) the Internet.', steps: [
      'Take each witness and ask only the dividing question: how far does it reach?',
      'So, (a) reaches across a desk - a metre or two, well inside about 10 m: a PAN, the Bluetooth class.',
      'Now, (b) covers one floor of one building, inside the 1 km class: a LAN.',
      'Next, (c) threads a whole city - tens of kilometres, the 30-40 km class: a MAN, the cable-TV network being its classic tenant.',
      'And (d) joins countries and continents: a WAN - in fact the largest WAN.',
      'Hence the census reads, in order of reach: PAN, LAN, MAN, WAN - the same four every time.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note — one question, four answers, no arguments', text: 'The census earns its keep in examinations because it is unfalsifiable from inside: the span is a measurable fact about the network, not a matter of opinion. When an examiner names a scenario and asks for the class, you are being asked exactly one thing - estimate the reach and read off the band. Nothing about the technology, the speed or the purpose of the network can move it from its band.' },

    // ================================================================
    // 4. THE MEDIA CENSUS
    // ================================================================
    { kind: 'heading', text: 'Wired and Wireless: the Media Census' },
    { kind: 'para', text: 'The third component of the census - the communication medium - comes in exactly two families, and the family names are honest about physics: signals travel either as electricity or light guided along a solid **wired** path, or as radio waves radiated freely through the air. The wired family counts three named members; the wireless family, for this lesson\'s purposes, counts three too; and between them they cover every medium your networks will use.' },
    { kind: 'table', caption: 'The media census: 3 wired + 3 wireless = 6 named media, each honest about what it carries and how far it likes to go.', head: ['Medium', 'Family', 'Carries', 'Honest note'], rows: [
      ['Twisted-pair cable', 'wired', 'electric signals', 'pairs of wires twisted to cancel noise - the LAN workhorse'],
      ['Coaxial cable', 'wired', 'electric signals', 'a shielded core - the cable-TV classic'],
      ['Optical fibre', 'wired', 'light', 'long distance, high bandwidth - the backbone of the Internet'],
      ['Wi-Fi', 'wireless', 'radio waves', 'the wireless LAN of homes and offices'],
      ['Bluetooth', 'wireless', 'radio waves', 'the PAN radio - about 10 m of reach'],
      ['Microwave link', 'wireless', 'radio waves', 'point-to-point radio between towers'],
    ] },
    { kind: 'para', text: 'Take the wired family one honest paragraph each. **Twisted-pair cable** is the one you have touched: pairs of copper wires, twisted together so that each twist cancels the noise the pair picks up - the cable that snakes from your router to your computer and wires the office LAN. **Coaxial cable** puts one conductor inside a braided shield, which keeps its signal clean enough for the long runs of a cable-TV network threading a city - it is the MAN\'s classic medium for exactly that reason. **Optical fibre** changes the game outright: it carries LIGHT, pulses of it, down a glass thread - and because light in glass loses far less of itself than electricity in copper does, fibre is the medium of long distance and of the highest bandwidth, the backbone every WAN and the Internet itself are built on.' },
    { kind: 'para', text: 'The wireless family is really one physics - radio - wearing three coats. **Wi-Fi** is the radio of the wireless LAN, carrying your laptop\'s traffic to the router across a room or a house. **Bluetooth** is the radio of the PAN, deliberately short-ranged and frugal with power - about 10 m, matching the PAN\'s span exactly. **Microwave links** are the point-to-point radios carriers string between towers and rooftops, bridging distances where laying a cable would be dear or impossible. What all three trade away, in exchange for freedom from wires, is the same: a shared, noisy airwave that everyone in reach must take turns on.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the medium is not the network, and wireless is not the Internet', text: 'Two traps claim victims every year. First, medium and network class are different axes: an office may run its LAN over cables or over Wi-Fi - both are LANs, because the reach is the same one building. Second, "wireless" names the LAST hop only: your phone\'s Wi-Fi reaches the router in the same room, and everything beyond that router rides optical fibre and cable - the Internet is not a cloud in the air but a fibre-rich wired WAN with wireless edges.' },

    // ================================================================
    // 5. TOPOLOGY
    // ================================================================
    { kind: 'heading', text: 'Topology: the Arrangement Question' },
    { kind: 'para', text: 'Ask how FAR a network reaches and the distance census answers. Ask how it is ARRANGED - which machine connects to which, and along what pattern - and you are asking about **topology**, the second great sorting question. Two networks of identical size, identical purpose and identical medium can differ utterly in topology, and the difference is never cosmetic: it sets the cable bill, the failure behaviour, and who must be trusted to behave. Four arrangements carry the syllabus, and each earns one honest paragraph and one honest count.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — network topology', text: 'A **network topology** is said to be the arrangement of nodes and links in a network - the pattern of which device connects to which. The census of basic topologies has four members: the **star** (everyone to one central device; $n-1$ links), the **bus** (everyone to one shared backbone; 1 backbone), the **ring** (each node to its two neighbours in a loop; $n$ links), and the **mesh** (everyone to everyone; $\\frac{n(n-1)}{2}$ links). Symbolically: same $n$ nodes, four wiring bills - $n-1$, $1$, $n$, and $\\frac{n(n-1)}{2}$.' },
    { kind: 'para', text: 'The **star** is the arrangement you are sitting in now, almost certainly: every computer runs one cable to one central device - today a switch - and every conversation passes through the centre. For $n$ computers it costs exactly $n - 1$ links, the cheapest of the counted arrangements, and it is beautifully manageable: one wiring closet, one place to watch the traffic. Its price is the mirror of its shape - the centre is a single point of failure. The centre dies and every one of the $n - 1$ links goes dark with it; all conversations die together.' },
    { kind: 'para', text: 'The **bus** is the eldest arrangement: one long shared backbone, every computer tapping it with a short stub, terminators at both ends. It costs 1 backbone however many nodes tap it - the whole wiring bill is one cable - and that thrift made it the early LAN\'s choice. But the backbone is a shared stage: two nodes transmitting at once collide, so the arrangement needs rules for taking turns, and as the room fills the collisions thicken. A break in the backbone, like a dead star centre, silences everyone downstream of it.' },
    { kind: 'para', text: 'The **ring** joins each node to exactly its two neighbours, closing the loop: $n$ nodes, $n$ links, no centre and no shared stage. Its classic discipline is unidirectional traffic - the message circulates one way around the loop, node to node, until it reaches its address - so each node forwards what is not its own. The honest weakness is structural: one broken node or link opens the loop, and a single ring has no second road.' },
    { kind: 'para', text: 'The **mesh** is the maximal arrangement: every node wired directly to every other, sparing nothing. The count deserves its own law, because it is the most examined arithmetic in this chapter: each of the $n$ nodes needs a wire to each of the other $n - 1$, giving $n(n-1)$ wire-ends - and since one wire supplies two ends, the honest cable count is half of that. NCERT states the same formula for the fully-connected case: a mesh of $n$ nodes needs $n(n-1)/2$ wires. For $n = 6$ that is $6 \\times 5 / 2 = 15$ links against the star\'s 5; for $n = 10$ it is $10 \\times 9 / 2 = 45$. What the mesh buys with its extravagance is resilience: with every pair directly joined, any single dead link strands nobody - traffic simply takes another road.' },
    { kind: 'figure', caption: 'The topology census, counted for n = 6 nodes with every edge computed: the star wires 5 links through one centre, the bus taps 1 shared backbone, the ring closes 6 links in a one-way loop, and the mesh joins every pair for 15 links. The wiring bill for n = 6 reads 5 / 1 / 6 / 15, and the mesh outbids the star by 15 - 5 = 10 extra links. In the MDN case of n = 10, the full mesh demands 45 direct cables where one switch would need only 10 - the switch saves 35.', svg: cf61TopoSvg() },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the mesh law', text: 'A fully-connected mesh of $n$ nodes requires exactly $\\frac{n(n-1)}{2}$ links. Proof sketch: each of the $n$ nodes must reach each of the other $n-1$ nodes, so counting from every node\'s side gives $n(n-1)$ wire-ends; but every link has two ends and has therefore been counted twice - once from each side - so the true count is half: $\\frac{n(n-1)}{2}$. Equivalently, the link count is the handshake sum $1 + 2 + \\cdots + (n-1)$. The pinned cases: $\\frac{6 \\times 5}{2} = 15$ and $\\frac{10 \\times 9}{2} = 45$. The same halving argument is why the star, which needs no link between two leaves, costs only $n - 1$.' },
    { kind: 'derivation', title: 'The mesh law, derived honestly', statement: 'Count the links of a fully-connected mesh of n nodes from first principles, then check the count against the pinned cases n = 6 and n = 10.', steps: [
      { label: 'Count each node\'s wires', formula: 'n - 1', explanation: 'In a full mesh every node is wired to every other node, so one node needs a wire to each of the remaining n - 1 nodes.' },
      { label: 'Multiply by the node count', formula: 'n \\times (n - 1)', explanation: 'If every one of the n nodes reports its n - 1 wires, the reports together count n(n-1) wire-ends.' },
      { label: 'Halve the double count', formula: '\\frac{n(n-1)}{2}', explanation: 'Each link has two ends - it is reported once by the node at each end - so every cable has been counted twice. Divide by 2 for the honest cable count.' },
      { label: 'Check the handshake view', formula: '1 + 2 + 3 + 4 + 5 = 15', explanation: 'Add wires node by node, avoiding re-counting: the first node adds 5, the second 4 new ones, and so on down to 1 - the handshake sum for n = 6, which is 15.' },
      { label: 'Check the pinned cases', formula: '\\frac{6 \\times 5}{2} = 15, \\quad \\frac{10 \\times 9}{2} = 45', explanation: 'Six nodes need 15 links; ten need 45 - and against the star\'s n - 1, the mesh pays 15 - 5 = 10 extra links when n = 6.' },
    ], result: 'Hence a full mesh of $n$ nodes needs $\\frac{n(n-1)}{2}$ links - $15$ for $n = 6$, $45$ for $n = 10$ - while the star needs only $n - 1$, so at $n = 6$ the mesh outbids it by $15 - 5 = 10$ extra links.' },
    { kind: 'equation', latex: '\\text{mesh links} = \\frac{n(n-1)}{2} \\tag{1}', note: 'The mesh law: every one of the n nodes wires to the other n - 1, and halving repairs the double count. Pinned cases: n = 6 gives 15 links, n = 10 gives 45.' },
    { kind: 'para', text: 'Now the case that makes the law memorable, the one MDN\'s own networking pages use to sell the idea: connect **ten computers**. Wire them as a full mesh and the bill is $10 \\times 9 / 2 = 45$ direct cables - forty-five cables snaking behind ten machines. Put one **switch** at the centre instead and each computer needs exactly one cable to it: 10 cables in all. The switch saves $45 - 10 = 35$ cables, and more than that, it saves the chaos: with a mesh, adding an eleventh computer means ten new cables; with a switch, one. This is why the star, born of the switch, won the office and the mesh retreated to the places that truly need its resilience - router backbones, where every link is a lifeline.' },
    { kind: 'example', title: 'Illustration 3. Count the wiring bill for n = 6: a star, a bus, a ring and a full mesh.', steps: [
      'Take the four laws in turn and substitute $n = 6$.',
      'So, the star: $n - 1 = 6 - 1 = 5$ links, all through the centre.',
      'Now, the bus: 1 shared backbone, whatever $n$ is - the count does not move.',
      'Next, the ring: $n = 6$ links, each node joining its two neighbours once.',
      'And the mesh: $n(n-1)/2 = 6 \\times 5 / 2 = 15$ links, every pair directly joined.',
      'Hence the wiring bill for six computers reads 5, 1, 6, 15 - and the mesh outbids the star by $15 - 5 = 10$ extra links.',
    ] },
    { kind: 'example', title: 'Illustration 4. The MDN case: ten computers must be interconnected - count the cables for a full mesh, then for one switch, and state the saving.', steps: [
      'Take the mesh law with $n = 10$: $10 \\times 9 / 2 = 45$ direct cables.',
      'So, forty-five cables - and an eleventh computer would demand ten more.',
      'Now, replace the mesh with one switch: each computer needs exactly one cable to the centre.',
      'Then the bill is 10 cables, one per computer.',
      'Check the saving: $45 - 10 = 35$ cables spared.',
      'Hence the MDN count: 45 direct cables against 10 through a switch - the switch saves 35, which is why stars won the office.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — three words with stories', text: 'The vocabulary of this section is older than the machines it now describes, and the borrowings are honest to trace. **Topology** comes from the Greek *topos*, a place, plus *-logy*, the study of - the mathematicians\' word for the study of arrangement and neighbourhood, borrowed whole by networking. **Protocol** comes from diplomacy: the fixed order of ceremonies and precedence among ambassadors, and hence the agreed rules of a formal exchange. And **modem**, met later in this lesson, is a portmanteau of what it does - MOdulator-DEModulator - a word built by jamming the two halves of its job together. None of these etymologies is load-bearing for an examination; all of them make the words easier to hold.' },
    { kind: 'para', text: 'Set the four arrangements side by side and the real trade stands out: topology is a purchase of resilience with cables. The **star** buys economy and manageability at $n - 1$ links and accepts one fatal centre. The **bus** buys maximum thrift - one backbone - and accepts a shared stage with collisions. The **ring** buys order - traffic flowing one way, no contention - and accepts that one break opens the loop. The **mesh** buys certainty - every pair directly joined, any single link expendable - and pays $\\frac{n(n-1)}{2}$ for it. No arrangement wins outright; each is honest about what it purchases.' },
    { kind: 'formula', name: 'Star link count', latex: 'n - 1', note: 'A star of n nodes wires every node to the centre: n - 1 links, and the centre is the single point of failure.' },
    { kind: 'formula', name: 'Mesh link count (the mesh law)', latex: '\\frac{n(n-1)}{2}', note: 'A fully-connected mesh of n nodes: every pair directly joined. n = 6 gives 15 links; n = 10 gives 45.' },
    { kind: 'callout', tone: 'insight', title: 'Note — why the star won and the mesh did not die', text: 'The switch changed the economics of trust. A hub-era star inherited the bus\'s shouting (next section), so the mesh\'s resilience looked worth its cables; once switches whispered to the chosen port, the star delivered most of the peace at a fraction of the wiring. The mesh survives where links, not nodes, are what fail - the wide backbones of the Internet\'s core - which is exactly where you should expect to meet it again in the Computer Networks book.' },
    // ================================================================
    // 6. BANDWIDTH AND LATENCY
    // ================================================================
    { kind: 'heading', text: 'Bandwidth and Latency, Named Honestly' },
    { kind: 'para', text: 'Every network conversation charges two prices, and the honest thing is to name them separately, because they measure different things and are confused constantly. **How much** can the path carry each second? That is bandwidth. **How long** does a single bit take to make the journey? That is latency. A wide road and a fast car: the first is about how many cars fit abreast, the second about how long one car takes to arrive - and no amount of extra width shortens the journey of the car that has already left. Whatever the medium - twisted-pair, coaxial, optical fibre or microwave radio - both prices are always on the bill.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — bandwidth', text: '**Bandwidth** is said to be the MAXIMUM rate of data transfer across a path, measured in bits per second (bps). Symbolically: a path of bandwidth $B$ bps can carry at most $B$ bits in every second - not more, however politely you ask - and the unit ladder climbs in binary thousands: Kbps, Mbps, Gbps, Tbps.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — latency', text: '**Latency** is said to be the time delay between cause and effect on a network - the time a signal takes to travel from sender to receiver. It is quoted one-way (source to destination) or round-trip (there and back), and the round-trip time is what the **ping** tool measures. Symbolically: one-way latency $L$ makes the round trip $2L$ - ping reports $2L$, and halving its answer prices one way.' },
    { kind: 'para', text: 'Take the bandwidth ladder slowly, because its steps are binary and that is the whole point. One kilobit per second is $2^{10} = 1{,}024$ bits per second - not 1,000, because the networking world counts in powers of two. One megabit per second is $2^{20} = 1{,}048{,}576$ bps. One gigabit per second is $2^{30} = 1{,}073{,}741{,}824$ bps. And one terabit per second is $2^{40} = 1{,}099{,}511{,}627{,}776$ bps. Every rung multiplies by 1,024 exactly, so the ladder never wobbles: to climb from Kbps to Mbps you multiply by 1,024, and to descend you divide by it.' },
    { kind: 'table', caption: 'The bandwidth units ladder. Every rung is a binary thousand - x 1,024 - never a decimal one.', head: ['Unit', 'In bits per second', 'Reads as'], rows: [
      ['1 Kbps', '1,024 bps', 'two to the ten'],
      ['1 Mbps', '1,048,576 bps', 'two to the twenty'],
      ['1 Gbps', '1,073,741,824 bps', 'two to the thirty'],
      ['1 Tbps', '1,099,511,627,776 bps', 'two to the forty'],
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the megabit / megabyte trap (the ISP-bill classic)', text: 'The lowercase b counts BITS; the uppercase B counts BYTES; and since one byte is 8 bits, the conversion law is **1 MBps = 8 Mbps**. An ISP selling "100 Mbps" is promising one hundred megabits a second - which is $100/8 = 12.5$ megabytes a second at the theoretical best. Every year candidates multiply where they should divide (reading 100 Mbps as 100 MB/s) or divide where they should multiply; every year the trap claims them. Read the letter\'s case before you touch the number, and write the law - 1 MBps = 8 Mbps - in the margin before converting.' },
    { kind: 'equation', latex: '\\text{rate in MBps} = \\frac{\\text{rate in Mbps}}{8} \\tag{2}', note: 'The byte-bit law: one byte is 8 bits, so megabytes per second and megabits per second differ by a factor of 8. A 100 Mbps line tops out at 12.5 MB/s; an 8 Mbps plan at 1 MB/s.' },
    { kind: 'example', title: 'Illustration 5. Units both ways: (a) express 4 Mbps in bps; (b) express 2 MBps in Mbps; (c) a 100 Mbps line in MB/s.', steps: [
      'Take the ladder for (a): $1$ Mbps $= 2^{20} = 1{,}048{,}576$ bps.',
      'So, $4$ Mbps $= 4 \\times 1{,}048{,}576 = 4{,}194{,}304$ bps.',
      'Now, (b) runs the byte-bit law upwards: $1$ MBps $= 8$ Mbps, so $2$ MBps $= 2 \\times 8 = 16$ Mbps.',
      'And, (c) runs it downwards: $100/8 = 12.5$, so a 100 Mbps line delivers at most 12.5 MB/s.',
      'Hence (a) 4,194,304 bps, (b) 16 Mbps, (c) 12.5 MB/s - and the letter\'s case decided each move.',
    ] },
    { kind: 'para', text: 'Latency, meanwhile, is measured in TIME - milliseconds on the scales you will meet - and it accumulates in a way bandwidth does not: it adds, stop by stop, along the path. A packet does not slide down a smooth chute; it is received, examined and re-transmitted at every router it crosses, and each such passage - a **hop**, one router-to-router passage - costs its own milliseconds. The full accounting belongs to the next sections; the honest naming belongs here: one-way latency is the delay source to destination, the round-trip time (RTT) is there-and-back, and ping measures the round trip. When a gamer curses ping, they are cursing $2L$.' },
    { kind: 'callout', tone: 'insight', title: 'Note — bandwidth is not speed, and latency is not weakness', text: 'The everyday word "speed" blends two different measurements, and unblending them is half the victory. A satellite link may carry an enormous bandwidth yet suffer a long latency - a wide road with a slow first stretch. A short copper run may answer in a blink yet carry little - a fast lane that is one car wide. When a page loads slowly the cause could be either, which is why the honest diagnosis always measures both: how much per second, and how long to first arrival.' },
    { kind: 'formula', name: 'The bandwidth ladder', latex: '1\\ \\text{Kbps} = 2^{10}\\ \\text{bps}, \\quad 1\\ \\text{Mbps} = 2^{20}\\ \\text{bps}, \\quad 1\\ \\text{Gbps} = 2^{30}\\ \\text{bps}, \\quad 1\\ \\text{Tbps} = 2^{40}\\ \\text{bps}', note: 'Every rung is a binary thousand, x 1,024: 1,024 then 1,048,576 then 1,073,741,824 then 1,099,511,627,776 bits per second.' },
    { kind: 'formula', name: 'The byte-bit law', latex: '1\\ \\text{MBps} = 8\\ \\text{Mbps}', note: 'One byte is 8 bits, so megabytes per second is eight times megabits per second. A 100 Mbps line tops out at 12.5 MB/s.' },

    // ================================================================
    // 7. PACKETS
    // ================================================================
    { kind: 'heading', text: 'Packets: the Postal Idea' },
    { kind: 'para', text: 'Here is a question the five-component census leaves open: in what SHAPE does the message travel? The naive picture is one unbroken stream - the whole file poured down the wire like water. The real picture, on essentially every network you will ever use, is the postal one: the message is divided into smaller chunks called **packets**, each chunk is put in its own envelope with an address on the front, and the envelopes travel - possibly by different routes, possibly arriving out of order - to be reassembled into the original message at the destination. The idea is so load-bearing that the Internet\'s own name for its ground rules, IP, expands to Internet Protocol - the protocol whose whole job is carrying packets.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — packet', text: 'A **packet** is said to be a small, independently-travelling unit of a message, consisting of a **header** - carrying, at minimum, the destination address and the ordering information - over a **payload** of actual data. A long message is divided into packets which may take different routes and are reassembled at the destination. Symbolically: message of $M$ bytes, payloads of $P$ bytes, headers of $H$ bytes $\\Rightarrow$ $\\lceil M/P \\rceil$ packets, each carrying $P + H$ bytes on the wire.' },
    { kind: 'figure', caption: 'The packet envelopes: a 750-byte message sliced into 3 packets, each carrying a 20-byte header (TO, FROM, SEQ) over a 250-byte payload. On the wire: 3 x (250 + 20) = 3 x 270 = 810 bytes to deliver 750 - the 60 bytes of header are 60/810 = 7.41% of everything sent. The envelopes may ride different routes; the receiver reassembles by SEQ; and the loss of any single packet leaves the message incomplete.', svg: cf61PacketSvg() },
    { kind: 'para', text: 'Read one envelope honestly. The **header** is the address panel and the postmark together: TO says where the packet is going, FROM says who sent it, and the sequence number (SEQ 1, 2, 3) says which piece of the message this envelope holds - the ordering information that makes reassembly possible even when the envelopes arrive out of order. The **payload** is the letter inside, this message\'s 250 bytes. The header exists to be read by machines along the way and stripped at the far end; the payload is the only part anyone wanted in the first place.' },
    { kind: 'derivation', title: 'The price of the header: the 750-byte message', statement: 'A 750-byte message is sent as packets with 250-byte payloads and 20-byte headers. Count the packets, the bytes on the wire, and the overhead share (2 decimal places).', steps: [
      { label: 'Count the packets', formula: '\\frac{750}{250} = 3', explanation: 'The message divides its 750 bytes across 250-byte payloads exactly, so it fills 3 packets with nothing left over.' },
      { label: 'Price one packet', formula: '250 + 20 = 270', explanation: 'Each packet is its payload plus its header - the envelope over the letter - so 270 bytes travel for every 250 sent.' },
      { label: 'Total on the wire', formula: '3 \\times 270 = 810', explanation: 'Three packets at 270 bytes each: the wire carries 810 bytes to deliver a 750-byte message.' },
      { label: 'Take the overhead', formula: '3 \\times 20 = 60', explanation: 'The pure paperwork is the three headers - 60 bytes - which the receiver strips away before reassembly.' },
      { label: 'Take the share', formula: '\\frac{60}{810} = 0.0741 = 7.41\\%', explanation: 'Sixty of the 810 bytes - 7.41% to two decimal places - bought addressing and ordering, not content.' },
    ], result: 'Hence the pinned example ships as $750/250 = 3$ packets of $250 + 20 = 270$ bytes: $3 \\times 270 = 810$ bytes on the wire, of which $60/810 = 7.41\\%$ is pure header.' },
    { kind: 'algorithm', title: 'Slicing a message into packets (and pricing the overhead)', lines: [
      { code: 'READ message M bytes, payload size P, header size H', note: 'the three inputs: a real protocol fixes P and H; M varies with the message' },
      { code: 'k = CEILING(M / P)', note: 'the message fills k payloads; the last may be partly empty' },
      { code: 'bytes-on-wire = k x (P + H)', note: 'every packet carries its header over its payload' },
      { code: 'overhead = k x H', note: 'the pure paperwork: headers exist to be read and stripped' },
      { code: 'share = overhead / bytes-on-wire', note: 'the honest overhead fraction, printed as a percentage' },
      { code: 'CHECK: M + overhead = bytes-on-wire', note: 'if this fails, the arithmetic - not the network - is broken' },
    ], note: 'Run on the pinned example (M = 750, P = 250, H = 20): k = 3 packets, 810 bytes on the wire, overhead 60 bytes = 7.41%.' },
    { kind: 'example', title: 'Illustration 6. Slice the 750-byte message: 250-byte payloads, 20-byte headers - count the packets, the wire bytes and the overhead, then say what one lost packet costs.', steps: [
      'Take the algorithm\'s first line: $M = 750$, $P = 250$, $H = 20$.',
      'So, the count: $\\lceil 750/250 \\rceil = 3$ packets - and the division is exact, so no payload is partly empty.',
      'Now, the wire: each packet is $250 + 20 = 270$ bytes, so the journey carries $3 \\times 270 = 810$ bytes.',
      'And, the overhead: $3 \\times 20 = 60$ bytes of header, which is $60/810 = 7.41\\%$ of everything sent.',
      'Check the ledger: $750 + 60 = 810$ - payload plus paperwork equals the wire count, as it must.',
      'Hence one lost packet costs the whole message: only $750 - 250 = 500$ bytes could be reassembled, and the receiver must ask again.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note — why the postal idea won', text: 'Slicing buys two things a single stream cannot. First, SHARING: many conversations can interleave their envelopes on one expensive wire, each waiting only for an envelope-sized gap, never for a whole message to finish. Second, RESILIENCE: if one envelope is lost, only its 250 bytes need re-sending, not the whole 750 - and if one road jams, the remaining envelopes can travel another. The price is the header overhead - 7.41% on the pinned example - and that price has looked like a bargain ever since.' },

    // ================================================================
    // 8. THE DEVICE CENSUS
    // ================================================================
    { kind: 'heading', text: 'The Device Census, One Line Each' },
    { kind: 'para', text: 'Between the sender and the receiver stand machines whose whole job is moving other people\'s data, and a foundations course needs to name them honestly - one line each, no more, because the full zoo, with its tables and learning algorithms, belongs to the **Computer Networks** book on this shelf. What follows is the six-member census you must be able to recite and recognise. (The bus-level view INSIDE the box - how the processor\'s own buses and ports work - belongs to **Computer Organization and Architecture**; chapter 4 of this book already toured it, and the two vocabularies only look alike.)' },
    { kind: 'table', caption: 'The device census: six members, one honest line each. Learn the line, and the identification questions answer themselves.', head: ['Device', 'The one-line duty', 'The remembered contrast'], rows: [
      ['NIC', 'the network interface card - the Ethernet card that plugs your machine in, at 10 Mbps to 1 Gbps', 'no NIC, no conversation'],
      ['Repeater', 'regenerates a weakening signal so it can travel on - about 100 m per cable run', 'a fresh shout, not a new message'],
      ['Hub', 'a multi-port fool: repeats EVERY incoming frame to ALL its ports', 'the hub shouts to all'],
      ['Switch', 'reads the destination address and forwards the frame to the chosen port alone', 'the switch whispers to one'],
      ['Router', 'connects NETWORKS to networks and chooses the path between them', 'the internetwork device'],
      ['Modem', 'MOdulator-DEModulator - translates between the phone line\'s sounds and the computer\'s bits', 'the translator at the door'],
    ] },
    { kind: 'para', text: 'Three of those lines deserve a second look, because examinations love them. The **hub-versus-switch** pair is the contrast between shouting and whispering: on an 8-computer hub, a frame for one machine is repeated to the other seven as well - wasted wire, wasted privacy; a switch reads the envelope\'s address and hands it to the chosen port alone. The **repeater** answers a physics complaint: signals fade as they travel, so a cable run of twisted-pair is good for about 100 m before the shout becomes a murmur - spanning 250 m needs 3 cable segments and therefore 2 repeaters to freshen the signal twice. And the **modem** wears its job in its name, MOdulator-DEModulator: at the far end of a phone line it modulated outgoing bits into line-friendly signals and demodulated incoming ones back - the translator that first connected home computers to the network world.' },
    { kind: 'example', title: 'Illustration 7. Name the device: (a) the card that plugs your desktop into the office Ethernet; (b) the box that freshens a signal at the end of a 100 m run; (c) the box that forwards every frame to all ports; (d) the box that forwards each frame to one chosen port; (e) the box joining your LAN to the Internet and choosing the route; (f) the box translating between phone-line signals and bits.', steps: [
      'Take the census line by line and match the duty to the name.',
      'So, (a) is the NIC - the network interface card, the Ethernet card itself.',
      'Now, (b) is the repeater - regenerating the weakened signal so the run can continue.',
      'Next, (c) is the hub - it shouts to ALL ports indiscriminately.',
      'And, (d) is the switch - it whispers to the chosen port alone.',
      'Then, (e) is the router - the network-to-network device that chooses the path, and (f) is the modem - the MOdulator-DEModulator translator at the phone line\'s door.',
      'Hence the six answers in census order: NIC, repeater, hub, switch, router, modem.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — a switch is not a router, and neither is a modem', text: 'The three most-confused devices sort by WHAT THEY READ. The hub reads nothing - it repeats blindly. The switch reads a hardware address and chooses a port WITHIN one network. The router reads a network address and chooses a path BETWEEN networks. The modem translates signals rather than reading addresses at all. Ask what the box is reading, and the census names itself.' },
    // ================================================================
    // 9. TWO WORKED RATES
    // ================================================================
    { kind: 'heading', text: 'Two Worked Rates: the 6,400 bps Genre and Latency Sums' },
    { kind: 'para', text: 'The chapter\'s arithmetic closes with two computations every syllabus asks, both of them one-line laws once the naming is honest. The first is the **transfer-rate genre**: given a document and a deadline, what must the line carry? The second is the **latency sum**: given a path of hops, how long does one bit take, there and back? Work both once, slowly, with the engine-pinned numbers, and every re-run in an examination is the same dance with different digits.' },
    { kind: 'derivation', title: 'The required rate: the 6,400 bps genre', statement: 'A document of 10 pages, 1,600 characters per page, each character stored as 8 bits, is transmitted in 20 seconds. What rate, in bps, must the line carry? (This is the classic NCERT Example 11.1 genre, re-run on our own numbers.)', steps: [
      { label: 'Count the characters', formula: '10 \\times 1{,}600 = 16{,}000', explanation: 'Ten pages at 1,600 characters a page hold 16,000 characters altogether.' },
      { label: 'Turn characters into bits', formula: '16{,}000 \\times 8 = 128{,}000', explanation: 'Each character is stored as 8 bits, so the whole document is 128,000 bits.' },
      { label: 'Divide by the seconds', formula: '\\frac{128{,}000}{20} = 6{,}400', explanation: 'Rate is bits per second: 128,000 bits over 20 seconds asks the line for 6,400 bits in every second.' },
      { label: 'State the unit honestly', formula: '6{,}400\\ \\text{bps} = 6.4\\ \\text{kbps}', explanation: 'In decimal kilobits the requirement is 6.4 kbps; the binary ladder would compute 6,400/1,024 = 6.25, so always say which kilo you mean.' },
    ], result: 'Hence the line must carry $10 \\times 1{,}600 \\times 8 / 20 = 6{,}400$ bits per second - 6.4 kbps - and any line rated below that cannot deliver this document in 20 seconds.' },
    { kind: 'equation', latex: '\\text{required rate} = \\frac{\\text{pages} \\times \\text{chars per page} \\times 8}{\\text{seconds}} = \\frac{10 \\times 1{,}600 \\times 8}{20} = 6{,}400\\ \\text{bps} \\tag{3}', note: 'The transfer-rate genre: multiply pages by characters by bits per character, divide by seconds. The pinned run: 128,000 bits in 20 s needs 6,400 bps, that is 6.4 kbps to the decimal kilo - and the honest aside is 6,400/1,024 = 6.25 by the binary ladder.' },
    { kind: 'para', text: 'Notice how much of the genre is bookkeeping rather than networking: the only network fact is the last division. The rest is unit hygiene - pages to characters (multiply), characters to bits (multiply by 8), bits over seconds (divide). Candidates lose marks here by skipping a step in their heads; the derivation above loses nothing, and its final line - the honest answer is 6,400 bps - is the shape every answer in this genre should take.' },
    { kind: 'example', title: 'Illustration 8. The required rate: 10 pages of 1,600 characters, 8 bits a character, sent in 20 seconds.', steps: [
      'Take the genre\'s three numbers: 10 pages, 1,600 characters a page, 8 bits a character.',
      'So, the document holds $10 \\times 1{,}600 = 16{,}000$ characters.',
      'Now, in bits: $16{,}000 \\times 8 = 128{,}000$ bits.',
      'And, spread over the 20 s: $128{,}000 / 20 = 6{,}400$ bps.',
      'Hence the line must carry 6,400 bps - that is, 6.4 kbps to the decimal kilo - and the binary reading 6,400/1,024 = 6.25 reminds you to name which kilo you used.',
    ] },
    { kind: 'example', title: 'Illustration 9. Re-run the genre with new numbers: 5 pages of 2,000 characters, 8 bits a character, sent in 10 seconds.', steps: [
      'Take the new numbers into the same law: 5 pages, 2,000 characters a page, 8 bits a character.',
      'So, the document holds $5 \\times 2{,}000 = 10{,}000$ characters.',
      'Now, in bits: $10{,}000 \\times 8 = 80{,}000$ bits.',
      'And, over 10 s: $80{,}000 / 10 = 8{,}000$ bps.',
      'Hence the line must carry 8,000 bps, that is 8 kbps - the genre unchanged, only the digits moved.',
    ] },
    { kind: 'para', text: 'The second computation, the **latency sum**, has no division at all - only addition, hop by hop. Recall the honest unit: a **hop** is one router-to-router passage, the crossing of one link between two routers, and each hop adds its own delay to the journey. The pinned path crosses 4 hops at 25 ms each, so the one-way latency is $4 \\times 25 = 100$ ms - and the reply must retrace the same hops, so the round-trip time is $2 \\times 100 = 200$ ms. That round-trip figure, 200 ms, is what the ping tool would print for this path, because ping measures the round trip: it sends a small packet out and times the moment its echo returns.' },
    { kind: 'figure', caption: 'The hop ribbon: a source, three routers and a destination in a line, with four hops each tagged +25 ms - one-way latency 4 x 25 = 100 ms. The dashed return path shows the reply retracing the same 4 hops for another 100 ms, so the round-trip time is 2 x 100 = 200 ms, which is what ping measures. Halve ping\'s answer to price one way.', svg: cf61HopSvg() },
    { kind: 'equation', latex: '\\text{RTT} = 2 \\times \\text{hops} \\times t_{\\text{hop}} = 2 \\times (4 \\times 25\\ \\text{ms}) = 200\\ \\text{ms} \\tag{4}', note: 'Latency accumulation: each hop - one router-to-router passage - adds its delay to the sum. Four hops at 25 ms give 100 ms one way, and the round trip doubles it to 200 ms; ping reports the round trip.' },
    { kind: 'example', title: 'Illustration 10. The latency sum: a path of 4 hops, each adding 25 ms - compute the one-way latency, the round-trip time, and what ping prints; then re-run for 5 hops.', steps: [
      'Take the pinned path: 4 hops, 25 ms a hop.',
      'So, one way: $4 \\times 25 = 100$ ms - the sum of the four router-to-router passages.',
      'Now, the reply retraces the same hops, so the round trip is $2 \\times 100 = 200$ ms.',
      'And, ping measures the round trip: it prints 200 ms; halving its answer recovers the 100 ms one-way figure.',
      'Check the re-run: 5 hops at 25 ms give $5 \\times 25 = 125$ ms one way and $250$ ms round trip.',
      'Hence the law: one-way latency $=$ hops $\\times$ per-hop delay, RTT $=$ twice that - and ping always reports the RTT.',
    ] },
    { kind: 'formula', name: 'The required-rate genre', latex: '\\text{rate} = \\frac{\\text{pages} \\times \\text{chars per page} \\times 8}{\\text{seconds}}', note: 'The NCERT Example 11.1 genre: the pinned run 10 x 1,600 x 8 bits in 20 s asks 6,400 bps - 6.4 kbps.' },
    { kind: 'formula', name: 'The round-trip law', latex: '\\text{RTT} = 2 \\times \\text{one-way latency}', note: 'Latency adds hop by hop (4 hops x 25 ms = 100 ms one way) and the round trip doubles it (200 ms). Ping measures RTT; halve its answer for one way.' },

    // ================================================================
    // 10. CLOSING
    // ================================================================
    { kind: 'heading', text: 'What This Lesson Carries Forward' },
    { kind: 'para', text: 'Take stock of the ground now covered, because the rest of the chapter builds directly on it. You can anatomise any conversation into its 5 components; sort any network into the 4-class distance census; name the 6 media of the two families; count the wiring bill of the 4 topologies (for $n = 6$: 5, 1, 6, 15; for $n = 10$: 45 against a switch\'s 10); climb the bandwidth ladder in binary thousands and refuse the 1 MBps = 8 Mbps trap; slice a 750-byte message into 3 packets of 270 bytes and price its 7.41% overhead; run the 6,400 bps required-rate genre; and add latency hop by hop to 100 ms one way, 200 ms round trip. What this lesson deliberately did NOT do is go through the doors it named: **Computer Networks**, on this shelf, owns switching, routing algorithms, the TCP/IP stack and the full device zoo; **Computer Organization and Architecture** owns the bus-level view inside the box, which chapter 4 of this book already toured. This lesson opened both doors a crack and pinned the vocabulary to them; the rest of the chapter walks forward from here.' },
    { kind: 'callout', tone: 'exam', title: 'Where this lesson is examined', text: 'Banking and SSC computer-awareness sections ask this material as identification and one-line counting: name the five components, expand modem as MOdulator-DEModulator, sort a described network into LAN, MAN or WAN by reach, choose hub versus switch versus router for a described duty, and count mesh links with n(n-1)/2. CUET\'s computer-science domain lists network topologies and the LAN, MAN, WAN classes among its asks - the distance census table and the topology counts are the notes to hold. Cambridge 9618 references expect candidates to distinguish LAN and WAN and to reason about data rates in bits per second - the 6,400 bps genre and the byte-bit law are exactly that reasoning. Every item in this lesson\'s exercise sets marked exam-style is OUR OWN composition in the style of these papers - never a quotation from any real paper.' },
    { kind: 'terms', items: [
      { term: 'PAN', def: 'personal area network - your own devices within about 10 m, the Bluetooth class.' },
      { term: 'LAN', def: 'local area network - a room, floor or building, up to about 1 km; Ethernet runs 10 Mbps to 1000 Mbps.' },
      { term: 'MAN', def: 'metropolitan area network - a whole city, about 30-40 km; the cable-TV class.' },
      { term: 'WAN', def: 'wide area network - countries and continents; the Internet is the largest WAN.' },
      { term: 'topology', def: 'the arrangement of nodes and links - which device connects to which.' },
      { term: 'star', def: 'topology with everyone wired to one central device: n - 1 links, one single point of failure.' },
      { term: 'bus', def: 'topology with one shared backbone: 1 backbone for any n, and collisions when nodes transmit together.' },
      { term: 'ring', def: 'topology with each node joined to its two neighbours in a loop: n links, unidirectional traffic.' },
      { term: 'mesh', def: 'topology with every node directly joined to every other: n(n-1)/2 links, resilient to any single dead link.' },
      { term: 'bandwidth', def: 'the maximum rate of data transfer across a path, in bits per second - Kbps, Mbps, Gbps, Tbps, each rung x 1,024.' },
      { term: 'latency', def: 'the time delay between cause and effect - one-way source to destination, or round-trip; ping measures the round trip.' },
      { term: 'hop', def: 'one router-to-router passage; latency adds hop by hop.' },
      { term: 'packet', def: 'a small independently-travelling unit of a message: a header (destination address and ordering information) over a payload; packets may take different routes and are reassembled at the destination.' },
      { term: 'header', def: 'the packet\'s address panel: destination, source and sequence information, existing to be read and stripped.' },
      { term: 'payload', def: 'the actual data bytes of a packet - the only part the receiver ultimately wanted.' },
      { term: 'hub', def: 'a device that repeats every incoming frame to ALL its ports - it shouts.' },
      { term: 'switch', def: 'a device that reads the destination address and forwards each frame to the chosen port alone - it whispers.' },
      { term: 'router', def: 'the device that connects networks to networks and chooses the path between them.' },
      { term: 'NIC', def: 'network interface card - the Ethernet card that plugs a machine into a LAN, at 10 Mbps to 1 Gbps.' },
      { term: 'repeater', def: 'a device that regenerates a weakening signal so it can travel on - about 100 m per cable run.' },
      { term: 'modem', def: 'MOdulator-DEModulator - the translator between a phone line\'s signals and the computer\'s bits.' },
    ] },

    // ================================================================
    // QUIZ
    // ================================================================
    { kind: 'quiz', title: 'Check yourself before you move on', items: [
      { q: 'Which of the following is NOT one of the five components of data communication?',
        options: ['The sender', 'The receiver', 'The message', 'The firewall'],
        answer: 3,
        explain: 'The five components are the sender, the receiver, the message, the communication medium and the protocol - a firewall is a security device that may sit in the path, not a component of the conversation itself. Option A fails because the sender is component one, the device that sends. Option B fails because the receiver is component two, the device that reads. Option C fails because the message is the data actually exchanged. Option D is the answer: the census counts five, and the firewall is not one of them.' },
      { q: 'A network spans an entire city - about 30-40 km - and its classic example is the cable-TV network. Which class is it?',
        options: ['MAN', 'LAN', 'PAN', 'WAN'],
        answer: 0,
        explain: 'A city-wide reach of 30-40 km is the metropolitan area network - Option A, the MAN, whose classic tenant is the cable-TV network. Option B fails because a LAN stops at a room, floor or building, up to about 1 km. Option C fails because a PAN is your own desk - about 10 m, the Bluetooth class. Option D fails because a WAN joins countries and continents; the Internet is the largest WAN, and one city is far beneath its reach.' },
      { q: 'Ten computers are joined in a fully-connected mesh. How many direct cables are needed?',
        options: ['10', '20', '45', '90'],
        answer: 2,
        explain: 'The mesh law is n(n-1)/2 = 10 x 9/2 = 45 - Option C. Option A fails because 10 is the count with a switch: one cable per computer to the centre. Option B fails because 20 = 2n counts the computers\' plugs, not the cables - each cable has two ends but is one cable. Option D fails because 90 = n(n-1) forgets to halve for the double count: every link was counted from both ends, so the honest count is half the handshake total.' },
      { q: 'Your ISP sells you an 8 Mbps plan. What is the maximum download rate in megabytes per second?',
        options: ['8 MB/s', '4 MB/s', '2 MB/s', '64 MB/s', '1 MB/s'],
        answer: 4,
        explain: 'One byte is 8 bits, so the law is 1 MBps = 8 Mbps, and 8 Mbps = 8/8 = 1 MB/s - Option E. Option A fails because it reads megabits as megabytes - the classic ISP-bill trap. Option B fails because 4 MB/s would require a 32 Mbps plan. Option C fails because 2 MB/s would require 16 Mbps. Option D fails because 64 MB/s multiplies by 8 instead of dividing - the same trap walked backwards.' },
      { q: 'A 750-byte message is sent as packets with 250-byte payloads and 20-byte headers. How many bytes actually travel on the wire?',
        options: ['750', '810', '770', '900'],
        answer: 1,
        explain: 'The message fills 750/250 = 3 packets, each 250 + 20 = 270 bytes, so the wire carries 3 x 270 = 810 bytes - Option B. Option A fails because 750 counts the payload only and forgets the headers entirely. Option C fails because 770 = 750 + 20 adds one header as if the whole message travelled in a single packet. Option D fails because 900 = 3 x 300 prices each packet at 250 + 50, inventing a 50-byte header the protocol never charged.' },
    ] },

    // ================================================================
    // EXERCISES
    // ================================================================
    { kind: 'exercises', title: 'Exercise Set 6.1', sets: [
      {
        level: 'L1',
        questions: [
          { q: 'Sort these four networks into the distance census: (a) your Bluetooth headset talking to your phone across the desk; (b) all the computers on one office floor; (c) a cable-TV network serving a whole city; (d) the Internet.',
            solution: [
              'Take each witness and ask only the dividing question: how far does it reach?',
              'So, (a) reaches across a desk - a metre or two, well inside about 10 m: a PAN, the Bluetooth class.',
              'Now, (b) covers one floor of one building, within the 1 km class: a LAN.',
              'Next, (c) serves a whole city at 30-40 km, the cable-TV class: a MAN.',
              'And, (d) joins countries and continents: a WAN - in fact the largest WAN.',
              'Hence the census, in order of reach: PAN, LAN, MAN, WAN.',
            ],
            answer: '(a) PAN, (b) LAN, (c) MAN, (d) WAN',
            figures: [{ caption: 'The span-census ladder: sort any network by asking only how far it reaches - about 10 m, then 1 km, then 30-40 km, then the world.', svg: cf61SpanSvg() }] },
          { q: 'Name the five components of data communication in the sentence: "Asha e-mails a photograph to Bharat over the office Wi-Fi."',
            solution: [
              'Take the census in order: sender, receiver, message, medium, protocol.',
              'So, the sender is Asha\'s machine - the device that sends.',
              'And, the receiver is Bharat\'s machine - the device that reads.',
              'Now, the message is the photograph itself, the data being exchanged.',
              'The medium is the office Wi-Fi radio channel - the path the signal travels.',
              'Hence the protocol is the agreed rule set - the mail and Wi-Fi rules that the sender, the receiver and every device between them follow.',
            ],
            answer: 'sender Asha\'s machine, receiver Bharat\'s machine, message the photograph, medium the Wi-Fi channel, protocol the mail rules' },
          { q: 'Every computer in a laboratory is wired to one central switch. (a) Name the topology. (b) How many links for 12 computers?',
            solution: [
              'Take the arrangement: everyone to one centre - that is a star.',
              'So, the star law is $n - 1$ links: every computer except the centre contributes exactly one.',
              'Now, substitute $n = 12$: $12 - 1 = 11$.',
              'Hence the laboratory is a star with 11 links - and the switch is its single point of failure.',
            ],
            answer: '(a) star; (b) 11 links' },
          { q: 'Which device (i) connects two different networks and chooses the path between them, and (ii) forwards every incoming frame to ALL of its ports without choosing?',
            solution: [
              'Take the device census one line at a time: NIC, repeater, hub, switch, router, modem.',
              'So, (i) the router is the network-to-network device: it connects networks and chooses the path.',
              'Now, (ii) the hub is the undiscriminating one: it shouts to ALL ports and leaves each machine to judge whether the frame is its own.',
              'Hence (i) the router and (ii) the hub - the whispering contrast belongs to the switch, which forwards to the chosen port alone.',
            ],
            answer: '(i) router; (ii) hub' },
          { q: 'Convert: (a) 2 Kbps into bps; (b) 512 Kbps into bps.',
            solution: [
              'Take the ladder: $1$ Kbps $= 2^{10} = 1{,}024$ bps - a binary, not a decimal, thousand.',
              'So, (a) $2$ Kbps $= 2 \\times 1{,}024 = 2{,}048$ bps.',
              'Now, (b) $512$ Kbps $= 512 \\times 1{,}024 = 524{,}288$ bps.',
              'Hence 2 Kbps is 2,048 bps and 512 Kbps is 524,288 bps.',
            ],
            answer: '2 Kbps = 2,048 bps; 512 Kbps = 524,288 bps' },
          { q: 'One page of plain text holds 1,800 characters, each stored as 8 bits. The page is transmitted in 6 seconds. What rate, in bps, does the line need?',
            solution: [
              'Take the genre: rate = characters $\\times$ bits per character, divided by seconds.',
              'So, the page is $1{,}800 \\times 8 = 14{,}400$ bits.',
              'Now, spread over 6 s: $14{,}400 / 6 = 2{,}400$ bps.',
              'Hence the line must carry 2,400 bps.',
            ],
            answer: '2,400 bps' },
        ],
      },
      {
        level: 'L2',
        questions: [
          { q: 'A network of 8 computers is built (a) as a star, (b) as a ring, (c) as a full mesh. Count the links in each, and state how many extra links the mesh pays over the star.',
            solution: [
              'Take the three laws: star $n - 1$, ring $n$, mesh $n(n-1)/2$.',
              'So, the star: $8 - 1 = 7$ links through the centre.',
              'Now, the ring: each of the 8 nodes joins two neighbours, and $8 \\times 2 / 2 = 8$ links.',
              'And, the mesh: $8 \\times 7 / 2 = 28$ links.',
              'Hence star 7, ring 8, mesh 28 - and the mesh pays $28 - 7 = 21$ extra links for its resilience.',
            ],
            answer: 'star 7 links, ring 8 links, mesh 28 links; the mesh pays 21 extra' },
          { q: 'Convert: (a) 4 MBps into Mbps; (b) a 100 Mbps line into its maximum rate in megabytes per second.',
            solution: [
              'Take the byte-bit law: $1$ MBps $= 8$ Mbps.',
              'So, (a) $4$ MBps $= 4 \\times 8 = 32$ Mbps.',
              'Now, (b) runs the law downwards: $100 / 8 = 12.5$.',
              'Hence 4 MBps is 32 Mbps, and a 100 Mbps line tops out at 12.5 MB/s - the letter\'s case decided each move.',
            ],
            answer: '32 Mbps; 12.5 MB/s',
            figures: [{ caption: 'The bandwidth units ladder: every rung multiplies by 1,024 - and the separate byte-bit law 1 MBps = 8 Mbps converts between the two letter-cases.', svg: cf61UnitsSvg() }] },
          { q: 'A 900-byte message is packetised with 300-byte payloads and 20-byte headers. How many packets, how many bytes on the wire, and what is the overhead percentage (2 decimal places)?',
            solution: [
              'Take the slicing rule: packets = message divided by payload when it divides exactly.',
              'So, $900 / 300 = 3$ packets, each $300 + 20 = 320$ bytes.',
              'Now, the wire carries $3 \\times 320 = 960$ bytes, of which $3 \\times 20 = 60$ are pure header.',
              'And, the overhead share is $60 / 960 = 0.0625 = 6.25\\%$.',
              'Hence 3 packets, 960 bytes on the wire, and 6.25% overhead - the ledger checks: $900 + 60 = 960$.',
            ],
            answer: '3 packets, 960 bytes, 6.25% overhead' },
          { q: 'A document of 5 pages, 2,000 characters to a page and 8 bits to a character, is sent down a line in 10 seconds. What rate is required? Give the answer in bps and in kbps.',
            solution: [
              'Take the genre: bits = pages $\\times$ characters $\\times$ 8.',
              'So, the document is $5 \\times 2{,}000 \\times 8 = 80{,}000$ bits.',
              'Now, over 10 s the rate is $80{,}000 / 10 = 8{,}000$ bps.',
              'And, in kilobits to the decimal kilo: $8{,}000 / 1{,}000 = 8$ kbps.',
              'Hence the line must carry 8,000 bps, that is 8 kbps.',
            ],
            answer: '8,000 bps = 8 kbps' },
          { q: 'A packet\'s path crosses 5 hops, each adding 25 ms. (a) What is the one-way latency? (b) What does ping report for this path?',
            solution: [
              'Take the rule: latency adds hop by hop, and one hop is one router-to-router passage.',
              'So, the one-way delay is $5 \\times 25 = 125$ ms.',
              'Now, ping measures the round trip: RTT $= 2 \\times 125 = 250$ ms.',
              'Hence one way is 125 ms and ping reports 250 ms - halve ping\'s answer to price one way.',
            ],
            answer: 'one-way 125 ms; ping reports 250 ms' },
        ],
      },
      {
        level: 'L3',
        questions: [
          { q: 'Exam-style: Ten computers must be interconnected. (a) How many cables does a fully-connected mesh need? (b) How many if one switch is used instead? (c) State what the mesh buys for its extra cables.',
            solution: [
              'Take the mesh law with $n = 10$: $n(n-1)/2 = 10 \\times 9 / 2$.',
              'So, (a) the mesh needs 45 direct cables.',
              'Now, (b) with a switch each computer needs exactly one cable to the centre: 10 cables.',
              'And, the difference is $45 - 10 = 35$ cables saved by the switch.',
              'Hence (a) 45 cables, (b) 10 cables; the mesh buys resilience - many alternative routes and no single point of failure - while the switch buys economy at the price of one fragile centre.',
            ],
            answer: '(a) 45 cables; (b) 10 cables',
            figures: [{ caption: 'The link-count solve board for n = 10: the mesh law gives 45 direct cables, the star 9 links to the centre, and one switch needs exactly 10 cables - a saving of 35.', svg: cf61BoardSvg() }] },
          { q: 'Exam-style: In a star network of 6 computers the central switch fails. In a full mesh of the same 6 computers one single cable fails. State, with counts, what each network can still do.',
            solution: [
              'Take the star first: all 5 of its links run through the centre.',
              'So, when the centre dies all 5 links go dark - 0 of the 15 possible pairs can converse; the network is dead.',
              'Now, the mesh has 15 links; losing 1 leaves 14 working links.',
              'And, every computer can still reach every other - at worst the one pair whose direct link died routes around through a neighbour.',
              'Hence the star loses everything (0 conversations survive), while the mesh keeps 14 of 15 links and stays fully connected.',
            ],
            answer: 'star: 0 conversations survive; mesh: 14 of 15 links remain and all computers stay connected',
            figures: [{ caption: 'The failure difference for n = 6: in the star the dead centre carries a red cross and all 5 links go dark; in the mesh one dead link leaves 14 working and traffic reroutes.', svg: cf61FailSvg() }] },
          { q: 'A 1,600-byte message is sent with 400-byte payloads and 20-byte headers. Count the packets, the bytes on the wire, and the overhead percentage (2 decimal places).',
            solution: [
              'Take the slicing rule: $1{,}600 / 400 = 4$ packets, exactly.',
              'So, each packet is $400 + 20 = 420$ bytes.',
              'Now, the wire carries $4 \\times 420 = 1{,}680$ bytes, with $4 \\times 20 = 80$ bytes of header.',
              'And, the overhead is $80 / 1{,}680 = 0.047619\\ldots = 4.76\\%$ to 2 dp.',
              'Hence 4 packets, 1,680 bytes on the wire, overhead 4.76% - and the ledger checks: $1{,}600 + 80 = 1{,}680$.',
            ],
            answer: '4 packets, 1,680 bytes, 4.76% overhead' },
          { q: 'Exam-style: A 64 Kbps line must move a 256 KB file. How many seconds does the transfer take, at best?',
            solution: [
              'Take the file in bits: $256$ KB $= 256 \\times 1{,}024 \\times 8 = 2{,}097{,}152$ bits.',
              'So, the line in bps: $64$ Kbps $= 64 \\times 1{,}024 = 65{,}536$ bps.',
              'Now, divide: $2{,}097{,}152 / 65{,}536 = 32$.',
              'Hence the transfer needs 32 seconds at best - and real transfers run slower, for headers and retransmissions add their toll.',
            ],
            answer: '32 seconds' },
        ],
      },
    ] },
  ],
}
