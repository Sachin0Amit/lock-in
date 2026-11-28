import type { Chapter, Lesson } from '../../../types'

/**
 * Computer Fundamentals — chapter 6 "Connecting Computers" (CLOSED COMPLETE
 * by the CS RUN 11 swarm, 2026-11-28, under the whole-chapter cadence: all
 * four seats shipped whole in one first-wave launch — 6.1 'The Network
 * Idea' (V-CF61 132/132, 10,918 words), 6.2 'The Internet: a Network of
 * Networks' (V-CF62 122/122, 11,513 words), 6.3 'Browsing the Web: the
 * Citizen's Vocabulary' (V-CF63 98/98, 13,307 words), 6.R 'Unit 6
 * Completion Review' (V-CF6R 155/155, 10,154 words). 45,892 chapter words;
 * 15 body + 21 solution figures; quiz keys [3,0,2,4,1] / [1,4,2,0,3] /
 * [2,1,4,3,0] / [0,3,1,4,2] pairwise distinct.
 *
 * PROVENANCE: ground = the RUN 11 reference-scan-first harvest banked under
 * citation key `cs-cf-web-ground-ch06`, docs/project/SOURCE_LOG.md — NCERT
 * XII CS ch 10-12 + XII IP ch 5 (real books, ncert.nic.in), Kurose & Ross
 * 8e + Tanenbaum 5e arcs (the Drive's university poles), MDN, Cloudflare
 * Learning, Internet Society, Wikipedia (ARPANET/DNS/WWW/Internet-in-India),
 * CBSE IX-X Computer Applications 165. STUDY-NEVER-REPRODUCE absolute:
 * every roster, figure, Illustration, quiz item and exercise below is OUR
 * OWN, engine-pinned in the four seat harnesses (docs/research/cf-ch06-wip/
 * v-cf6*.ts) and closed by the Z census (scripts/verify-cs-book2-ch06.ts).
 */

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


/**
 * part-cf62.ts — CS RUN 11 seat cf62 (the INTERNET lesson).
 *
 * Lesson 6.2 'The Internet: a Network of Networks' of Computer
 * Fundamentals chapter 6 'Connecting Computers'. The Internet named as
 * an agreement rather than a machine: the six-rung tier ladder (device,
 * modem, local ISP, regional network, national network, backbone),
 * TCP/IP as the treaty every member signs, the dated beats told
 * honestly (ARPANET's 'lo' at 10:30 pm PST on 29 October 1969 and four
 * nodes by December; the NCP-to-TCP/IP flag day of 1 January 1983; DNS
 * in November 1983 replacing the single HOSTS.TXT; ERNET 1986;
 * Berners-Lee's Web proposal in March 1989; the first site on 6 August
 * 1991 at info.cern.ch; the Web to the public domain in April 1993;
 * VSNL's GIAS opening India's public Internet on 15 August 1995 at
 * 9.6 kbit/s under a 5,200-rupee, 250-hour tariff - 20.80 rupees an
 * hour), the address census (IPv4: 4 octets x 8 bits = 32 bits,
 * 2^32 = 4,294,967,296, just under 4.3 billion and not enough; IPv6:
 * 8 groups x 16 bits = 128 bits, 2^128 ~ 3.4 x 10^38, a ratio of
 * 2^96 ~ 7.9 x 10^28; MAC: 48 bits = 24 + 24, twelve hex digits), the
 * DNS ladder (8 steps, 4 server kinds, 13 root name servers A-M =
 * 10 US + 1 London + 1 Stockholm + 1 Japan, port 53), routers and hops
 * (4 hops x 25 ms = 100 ms one-way), client and server, and the
 * patience ledger of the 9.6 kbit/s era (60 MB = 480 Mbit at
 * 9,600 bps = 50,000 s = 13.9 hours). NSFNET grew from 6 nodes at
 * 56 kbps to 21 nodes at 45 Mbps.
 *
 * Every number printed here is pinned green by v-cf62.ts (66 engine
 * checks ran GREEN before this prose was written; the pin block closes
 * the ring). All figures are self-contained computed SVGs in the house
 * palette; every geometry constant is derived, never eyeballed.
 * Study-never-reproduce: every roster, witness, figure, Illustration,
 * quiz item and exercise is OUR OWN. The switching-theory door rides
 * the 'Computer Networks' book; the attack-surface door rides
 * 'Cybersecurity'; lesson 6.1 'The Network Idea' owns packets and
 * bandwidth.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const c62 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f62 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order (x, y, weight, size,
   fill, anchor) so the engine's clip audit can parse every label */
function cf62T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* ================================================================== */
/* BODY FIGURE 1 — THE TIER LADDER: device -> modem -> local ISP ->    */
/* regional -> national -> backbone; six rungs, rails both ways        */
/* ================================================================== */
function cf62LadderSvg(): string {
  const W = 760
  const H = 476
  const rungs = [
    { name: 'YOUR DEVICE', note: 'laptop or phone - where the trip begins', fill: c62.white, stroke: c62.ink },
    { name: 'THE MODEM', note: 'your home wiring meets the ISP line here', fill: c62.faint, stroke: c62.tealInk },
    { name: 'THE LOCAL ISP', note: 'the access provider you pay', fill: c62.white, stroke: c62.teal },
    { name: 'THE REGIONAL NETWORK', note: "carries a region's ISPs between themselves", fill: c62.panelB, stroke: c62.conn },
    { name: 'THE NATIONAL NETWORK', note: "the country's carriers and exchanges", fill: c62.white, stroke: c62.struct },
    { name: 'THE BACKBONE', note: 'country-scale trunks every network meets', fill: c62.panelA, stroke: c62.accent },
  ]
  const x0 = 180
  const w = 400
  const top0 = 80
  const stride = 60
  const h = 40
  const railL = x0 - 28
  const railR = x0 + w + 28
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="The tier ladder drawn as six stacked shelves: your device at the top, then the modem, the local ISP, the regional network, the national network, and the backbone at the bottom. A left rail carries the request downward from the device to the backbone, and a right rail carries the answer back upward, with small chevrons marking each of the five passages between neighbouring rungs. A caption bar beneath says the Internet is a network of networks - thousands of LANs and ISPs agreeing to speak one common protocol family, TCP/IP.">`)
  s.push(cf62T(W / 2, 26, 12, c62.teal, 'middle', 'THE TIER LADDER - HOW YOUR BITS REACH THE WORLD', true))
  s.push(cf62T(W / 2, 44, 9.5, c62.tealInk, 'middle', 'six rungs from your device to the backbone - and back again, all day long'))
  rungs.forEach((R, k) => {
    const top = top0 + k * stride
    s.push(`<rect x="${x0}" y="${top}" width="${w}" height="${h}" rx="7" fill="${R.fill}" stroke="${R.stroke}" stroke-width="2"/>`)
    s.push(cf62T(x0 + w / 2, top + 17, 11, c62.ink, 'middle', R.name, true))
    s.push(cf62T(x0 + w / 2, top + 32, 9.5, c62.tealInk, 'middle', R.note))
  })
  /* left rail: the request travels down; right rail: the answer climbs back */
  s.push(`<line x1="${railL}" y1="${top0 + h / 2}" x2="${railL}" y2="${top0 + 5 * stride + h / 2}" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="${railL - 5},${top0 + 5 * stride + h / 2 - 8} ${railL + 5},${top0 + 5 * stride + h / 2 - 8} ${railL},${top0 + 5 * stride + h / 2 + 2}" fill="${c62.conn}"/>`)
  s.push(cf62T(railL - 6, 92, 9.5, c62.tealInk, 'end', 'request down'))
  s.push(`<line x1="${railR}" y1="${top0 + h / 2}" x2="${railR}" y2="${top0 + 5 * stride + h / 2}" stroke="${c62.teal}" stroke-width="2"/>`)
  s.push(`<polygon points="${railR - 5},${top0 + h / 2 + 8} ${railR + 5},${top0 + h / 2 + 8} ${railR},${top0 + h / 2 - 2}" fill="${c62.teal}"/>`)
  s.push(cf62T(railR + 6, 92, 9.5, c62.tealInk, 'start', 'answer up'))
  /* chevrons in every gap, computed from the stride */
  for (let k = 0; k < 5; k++) {
    const mid = top0 + k * stride + h + (stride - h) / 2
    s.push(`<polygon points="${railL - 4},${mid - 3} ${railL + 4},${mid - 3} ${railL},${mid + 3}" fill="${c62.conn}"/>`)
    s.push(`<polygon points="${railR - 4},${mid + 3} ${railR + 4},${mid + 3} ${railR},${mid - 3}" fill="${c62.teal}"/>`)
  }
  s.push(`<rect x="16" y="436" width="${W - 32}" height="30" rx="8" fill="${c62.panelB}" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(cf62T(W / 2, 455, 9.5, c62.ink, 'middle', 'a network of networks - thousands of LANs and ISPs agreeing to speak ONE common protocol family: TCP/IP'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 2 — THE DATED BEATS: a 1969-1995 timeline, gaps        */
/* computed and printed (14 / 3 / 9 / 26 / 2 / 2 / 2)                 */
/* ================================================================== */
function cf62TimelineSvg(): string {
  const W = 760
  const H = 372
  const Y0 = 1969
  const Y1 = 1995
  const X = (yr: number): number => 60 + (yr - Y0) * (680 / (Y1 - Y0))
  const axisY = 170
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="A timeline of the Internet story from 1969 to 1995 with eight dated beats and every gap computed from the years. The beats are: ARPANET's lo message in 1969, the TCP/IP flag day in January 1983, DNS in November 1983, ERNET in India in 1986, the Web proposal in March 1989, the first website in August 1991, the Web entering the public domain in April 1993, and VSNL opening India's public Internet in August 1995. Gap brackets above the axis print 14 years, 3 years, 3 years, 2 years, 2 years and 2 years; brackets below print the whole span 1969 to 1995 as 26 years and ERNET to public India as 9 years.">`)
  s.push(cf62T(W / 2, 24, 12, c62.teal, 'middle', 'THE DATED BEATS, TOLD HONESTLY - 1969 TO 1995', true))
  s.push(cf62T(W / 2, 42, 9.5, c62.tealInk, 'middle', 'eight beats on one line - and every gap printed is computed from the years, never guessed'))
  /* gap brackets above the axis, between consecutive beats */
  const segs: Array<[number, number]> = [[1969, 1983], [1983, 1986], [1986, 1989], [1989, 1991], [1991, 1993], [1993, 1995]]
  segs.forEach(([a, b]) => {
    const xa = X(a)
    const xb = X(b)
    const mid = (xa + xb) / 2
    s.push(`<line x1="${xa + 2}" y1="104" x2="${xb - 2}" y2="104" stroke="${c62.struct}" stroke-width="1.6"/>`)
    s.push(`<line x1="${xa + 2}" y1="100" x2="${xa + 2}" y2="104" stroke="${c62.struct}" stroke-width="1.6"/>`)
    s.push(`<line x1="${xb - 2}" y1="100" x2="${xb - 2}" y2="104" stroke="${c62.struct}" stroke-width="1.6"/>`)
    s.push(cf62T(mid, 95, 9.5, c62.ink, 'middle', `${b - a} years`, true))
  })
  /* the axis and the beat ticks */
  s.push(`<line x1="${X(Y0)}" y1="${axisY}" x2="${X(Y1)}" y2="${axisY}" stroke="${c62.ink}" stroke-width="2.5"/>`)
  const beats: Array<{ yr: number, row: 'near' | 'mid' | 'far', year: string, ev: string }> = [
    { yr: 1969, row: 'near', year: '1969', ev: 'ARPANET: lo' },
    { yr: 1983, row: 'mid', year: '1983', ev: 'Jan flag day, Nov DNS' },
    { yr: 1986, row: 'near', year: '1986', ev: 'ERNET, India' },
    { yr: 1989, row: 'mid', year: '1989', ev: 'Web proposal' },
    { yr: 1991, row: 'near', year: '1991', ev: 'first website' },
    { yr: 1993, row: 'mid', year: '1993', ev: 'Web public domain' },
    { yr: 1995, row: 'far', year: '1995', ev: 'VSNL opens India' },
  ]
  beats.forEach((b) => {
    const x = X(b.yr)
    s.push(`<line x1="${x}" y1="${axisY - 8}" x2="${x}" y2="${axisY + 8}" stroke="${c62.ink}" stroke-width="2"/>`)
    if (b.row === 'near') {
      s.push(`<line x1="${x}" y1="${axisY + 10}" x2="${x}" y2="192" stroke="${c62.tealInk}" stroke-width="1.2" stroke-dasharray="3 3"/>`)
      s.push(cf62T(x, 204, 10.5, c62.ink, 'middle', b.year, true))
      s.push(cf62T(x, 218, 9.5, c62.tealInk, 'middle', b.ev))
    } else if (b.row === 'mid') {
      s.push(`<line x1="${x}" y1="${axisY + 10}" x2="${x}" y2="238" stroke="${c62.tealInk}" stroke-width="1.2" stroke-dasharray="3 3"/>`)
      s.push(cf62T(x, 250, 10.5, c62.ink, 'middle', b.year, true))
      s.push(cf62T(x, 264, 9.5, c62.tealInk, 'middle', b.ev))
    } else {
      s.push(`<line x1="${x}" y1="${axisY + 10}" x2="${x}" y2="284" stroke="${c62.tealInk}" stroke-width="1.2" stroke-dasharray="3 3"/>`)
      s.push(cf62T(W - 12, 296, 10.5, c62.ink, 'end', b.year, true))
      s.push(cf62T(W - 12, 310, 9.5, c62.tealInk, 'end', b.ev))
    }
  })
  /* the two long brackets below: the whole span (26) and the India gap (9) */
  s.push(`<line x1="${X(1969)}" y1="330" x2="${X(1995)}" y2="330" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(`<line x1="${X(1969)}" y1="326" x2="${X(1969)}" y2="330" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(`<line x1="${X(1986)}" y1="326" x2="${X(1986)}" y2="330" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(`<line x1="${X(1995)}" y1="326" x2="${X(1995)}" y2="330" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(cf62T((X(1969) + X(1986)) / 2, 344, 9.5, c62.ink, 'middle', 'the whole span, 1969 to 1995: 26 years', true))
  s.push(cf62T((X(1986) + X(1995)) / 2, 344, 9.5, c62.ink, 'middle', 'ERNET 1986 to public India 1995: 9 years', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 3 — THE DNS LADDER: 8 steps, 4 server kinds, the       */
/* browser at both ends, port 53 noted in the subtitle                */
/* ================================================================== */
function cf62DnsSvg(): string {
  const W = 760
  const H = 486
  const x0 = 100
  const w = 560
  const top0 = 92
  const stride = 44
  const h = 34
  const steps = [
    { txt: 'the browser asks its recursive resolver: where does this name live?', color: c62.teal },
    { txt: 'the resolver asks a ROOT server - keeper of the top of the tree', color: c62.teal },
    { txt: 'the root answers: ask the .com TLD server, here is its address', color: c62.conn },
    { txt: 'the resolver asks the TLD server for .com', color: c62.teal },
    { txt: 'the TLD answers: ask the authoritative server, here is its address', color: c62.mid },
    { txt: 'the resolver asks the authoritative server for the name', color: c62.teal },
    { txt: 'the authoritative server answers with the IP address', color: c62.accent },
    { txt: 'the resolver returns the IP; the browser sends HTTP to that address', color: c62.teal },
  ]
  const chips = [
    { label: 'RESOLVER', at: 0, fill: c62.teal },
    { label: 'ROOT', at: 2, fill: c62.conn },
    { label: 'TLD', at: 4, fill: c62.mid },
    { label: 'AUTH', at: 6, fill: c62.accent },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="The DNS lookup ladder drawn as eight numbered steps between two browser chips at the top and bottom. Step one: the browser asks its recursive resolver. Step two: the resolver asks a root server, keeper of the top of the tree. Step three: the root answers with the address of the dot-com TLD server. Step four: the resolver asks the TLD server. Step five: the TLD answers with the authoritative server's address. Step six: the resolver asks the authoritative server. Step seven: the authoritative server answers with the IP address. Step eight: the resolver returns the IP and the browser sends HTTP to that address. Right-side chips label the four server kinds - resolver, root, TLD and authoritative - and the subtitle notes that DNS traffic rides on port 53.">`)
  s.push(cf62T(W / 2, 24, 12, c62.teal, 'middle', 'THE DNS LADDER - EIGHT STEPS, FOUR SERVER KINDS', true))
  s.push(cf62T(W / 2, 42, 9.5, c62.tealInk, 'middle', 'how a name becomes a number - and DNS traffic rides on port 53'))
  s.push(`<rect x="${x0}" y="52" width="${w}" height="28" rx="7" fill="${c62.panelA}" stroke="${c62.accent}" stroke-width="2"/>`)
  s.push(cf62T(x0 + w / 2, 70, 10, c62.ink, 'middle', 'YOUR BROWSER - you type the name; the browser needs the IP address', true))
  steps.forEach((st, k) => {
    const top = top0 + k * stride
    s.push(`<rect x="${x0}" y="${top}" width="${w}" height="${h}" rx="6" fill="${c62.white}" stroke="${c62.ink}" stroke-width="1.6"/>`)
    s.push(`<circle cx="${x0 + 22}" cy="${top + h / 2}" r="11" fill="${st.color}"/>`)
    s.push(cf62T(x0 + 22, top + h / 2 + 3.5, 10.5, c62.white, 'middle', String(k + 1), true))
    s.push(cf62T(x0 + w / 2 + 48, top + h / 2 + 3.5, 9.5, c62.ink, 'middle', st.txt))
  })
  chips.forEach((ch) => {
    const top = top0 + ch.at * stride
    s.push(`<rect x="676" y="${top + 7}" width="68" height="20" rx="6" fill="${ch.fill}"/>`)
    s.push(cf62T(710, top + 21, 9, c62.white, 'middle', ch.label, true))
  })
  /* the left rail with chevrons in every gap between steps */
  s.push(`<line x1="80" y1="${top0 + h / 2}" x2="80" y2="${top0 + 7 * stride + h / 2}" stroke="${c62.conn}" stroke-width="1.6"/>`)
  for (let k = 0; k < 7; k++) {
    const mid = top0 + k * stride + h + (stride - h) / 2
    s.push(`<polygon points="76,${mid - 3} 84,${mid - 3} 80,${mid + 3}" fill="${c62.conn}"/>`)
  }
  s.push(`<rect x="${x0}" y="444" width="${w}" height="28" rx="7" fill="${c62.panelA}" stroke="${c62.accent}" stroke-width="2"/>`)
  s.push(cf62T(x0 + w / 2, 462, 10, c62.ink, 'middle', 'YOUR BROWSER - now it holds the number and sends the request to it', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 4 — IPv4 AGAINST IPv6: the two address anatomies       */
/* side by side; 4 x 8 = 32 bits vs 8 x 16 = 128 bits                 */
/* ================================================================== */
function cf62AnatomySvg(): string {
  const W = 760
  const H = 392
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="The two IP address anatomies drawn side by side. The IPv4 row shows the example 192.168.0.178 as four boxes joined by three dots, each box labelled 8 bits, with a bracket reading 4 octets times 8 bits equals 32 bits and a space line reading 2 to the 32 equals 4,294,967,296 - just under 4.3 billion, and not enough. The IPv6 row shows the example 2001 colon CDBA colon 0000 four times colon 3257 colon 9652 as eight boxes joined by seven colons, each labelled 16 bits, with a bracket reading 8 groups times 16 bits equals 128 bits and a space line reading 2 to the 128, about 3.4 times 10 to the 38. A bottom bar prints the ratio of the two spaces as 2 to the 96, about 7.9 times 10 to the 28.">`)
  s.push(cf62T(W / 2, 24, 12, c62.teal, 'middle', 'THE TWO ADDRESS ANATOMIES - IPv4 AGAINST IPv6', true))
  s.push(cf62T(W / 2, 42, 9.5, c62.tealInk, 'middle', 'the same house-number idea at two census sizes: 4 x 8 = 32 bits, then 8 x 16 = 128 bits'))
  /* IPv4 panel */
  s.push(cf62T(280, 70, 11, c62.ink, 'middle', 'IPv4 - 32 bits in four dot-separated octets', true))
  const v4vals = ['192', '168', '0', '178']
  v4vals.forEach((v, k) => {
    const bx = 90 + k * 100
    s.push(`<rect x="${bx}" y="84" width="80" height="40" rx="6" fill="${c62.white}" stroke="${c62.struct}" stroke-width="2"/>`)
    s.push(cf62T(bx + 40, 109, 12, c62.ink, 'middle', v, true))
    s.push(cf62T(bx + 40, 138, 9, c62.tealInk, 'middle', '8 bits'))
    if (k < 3) s.push(`<circle cx="${bx + 90}" cy="104" r="2.5" fill="${c62.ink}"/>`)
  })
  s.push(cf62T(500, 104, 9.5, c62.tealInk, 'start', 'example: 192.168.0.178', true))
  s.push(cf62T(500, 138, 9, c62.tealInk, 'start', 'each octet runs 0 to 255'))
  s.push(`<line x1="90" y1="150" x2="470" y2="150" stroke="${c62.struct}" stroke-width="1.6"/>`)
  s.push(`<line x1="90" y1="146" x2="90" y2="150" stroke="${c62.struct}" stroke-width="1.6"/>`)
  s.push(`<line x1="470" y1="146" x2="470" y2="150" stroke="${c62.struct}" stroke-width="1.6"/>`)
  s.push(cf62T(280, 166, 10, c62.ink, 'middle', '4 octets x 8 bits = 32 bits', true))
  s.push(cf62T(280, 186, 9.5, c62.tealInk, 'middle', 'space: 2^32 = 4,294,967,296 - just under 4.3 billion, and not enough'))
  /* IPv6 panel */
  s.push(cf62T(380, 216, 11, c62.ink, 'middle', 'IPv6 - 128 bits in eight colon-separated hex groups', true))
  const v6vals = ['2001', 'CDBA', '0000', '0000', '0000', '0000', '3257', '9652']
  v6vals.forEach((v, k) => {
    const bx = 60 + k * 76
    s.push(`<rect x="${bx}" y="230" width="64" height="40" rx="6" fill="${c62.white}" stroke="${c62.teal}" stroke-width="2"/>`)
    s.push(cf62T(bx + 32, 255, 10.5, c62.ink, 'middle', v, true))
    s.push(cf62T(bx + 32, 284, 9, c62.tealInk, 'middle', '16 bits'))
    if (k < 7) s.push(cf62T(bx + 70, 256, 12, c62.ink, 'middle', ':', true))
  })
  s.push(cf62T(676, 256, 9, c62.tealInk, 'start', 'hex, base 16'))
  s.push(cf62T(676, 284, 9, c62.tealInk, 'start', '128/4 = 32'))
  s.push(`<line x1="60" y1="296" x2="656" y2="296" stroke="${c62.teal}" stroke-width="1.6"/>`)
  s.push(`<line x1="60" y1="292" x2="60" y2="296" stroke="${c62.teal}" stroke-width="1.6"/>`)
  s.push(`<line x1="656" y1="292" x2="656" y2="296" stroke="${c62.teal}" stroke-width="1.6"/>`)
  s.push(cf62T(358, 312, 10, c62.ink, 'middle', '8 groups x 16 bits = 128 bits', true))
  s.push(cf62T(358, 332, 9.5, c62.tealInk, 'middle', 'space: 2^128 ~ 3.4 x 10^38 - enough to number every device many times over'))
  s.push(`<rect x="16" y="348" width="${W - 32}" height="34" rx="8" fill="${c62.panelB}" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(cf62T(W / 2, 369, 9.5, c62.ink, 'middle', 'the census grew from 2^32 = 4,294,967,296 to 2^128 ~ 3.4 x 10^38 - a ratio of 2^96 ~ 7.9 x 10^28 to one'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 1 — the gap-arithmetic solve board                 */
/* ================================================================== */
function cf62SolGapSvg(): string {
  const W = 760
  const H = 224
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="The gap solve board: seven subtractions laid out in two columns, each with its meaning. Left column: 1983 minus 1969 equals 14 years from ARPANET to the TCP/IP flag day; 1986 minus 1983 equals 3 years from the flag day to ERNET; 1995 minus 1986 equals 9 years from ERNET to VSNL GIAS; 1995 minus 1969 equals 26 years for the whole span. Right column: 1991 minus 1989 equals 2 years from proposal to first site; 1993 minus 1991 equals 2 years from first site to public domain; 1995 minus 1993 equals 2 years from public domain to India. A check bar confirms 14 plus 3 plus 9 equals 26 and 2 plus 2 plus 2 equals 6.">`)
  s.push(cf62T(W / 2, 22, 11, c62.teal, 'middle', 'THE GAP SOLVE BOARD - SEVEN SUBTRACTIONS, ALL CHECKED', true))
  const left = ['1983 - 1969 = 14   ARPANET -> TCP/IP flag day', '1986 - 1983 = 3    flag day -> ERNET', '1995 - 1986 = 9    ERNET -> VSNL GIAS', '1995 - 1969 = 26   the whole span']
  const right = ['1991 - 1989 = 2    proposal -> first site', '1993 - 1991 = 2    first site -> public domain', '1995 - 1993 = 2    public domain -> India']
  left.forEach((row, k) => s.push(cf62T(70, 62 + k * 32, 10.5, c62.ink, 'start', row, k === 3)))
  right.forEach((row, k) => s.push(cf62T(420, 62 + k * 32, 10.5, c62.ink, 'start', row, false)))
  s.push(`<rect x="16" y="180" width="${W - 32}" height="30" rx="8" fill="${c62.panelB}" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(cf62T(W / 2, 199, 9.5, c62.ink, 'middle', 'checks: 14 + 3 + 9 = 26 (the chain closes) and 2 + 2 + 2 = 6 = 1995 - 1989 (the web era)'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 2 — the resolution-order strip (4 servers)         */
/* ================================================================== */
function cf62SolOrderSvg(): string {
  const W = 760
  const H = 196
  const s: string[] = []
  const boxes = [
    { x: 40, name: '1. RECURSIVE RESOLVER', note: 'the librarian - asked first', fill: c62.teal },
    { x: 220, name: '2. ROOT SERVER', note: 'the index - owns "."', fill: c62.conn },
    { x: 400, name: '3. TLD SERVER', note: 'the rack - owns ".com"', fill: c62.mid },
    { x: 580, name: '4. AUTHORITATIVE', note: 'the book - owns the name', fill: c62.accent },
  ]
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="The resolution order strip: four boxes in the order a DNS lookup visits them. First the recursive resolver, the librarian who is asked first; second the root server, the index that owns the dot; third the TLD server, the rack that owns dot-com; fourth the authoritative server, the book that owns the name itself. Arrows run left to right between the boxes, and a caption bar notes that the resolver asks each server in turn while answers climb back through the same hands on port 53.">`)
  s.push(cf62T(W / 2, 22, 11, c62.teal, 'middle', 'THE RESOLUTION ORDER - FOUR SERVERS, ONE WALK', true))
  boxes.forEach((b) => {
    s.push(`<rect x="${b.x}" y="60" width="150" height="56" rx="7" fill="${c62.white}" stroke="${b.fill}" stroke-width="2"/>`)
    s.push(cf62T(b.x + 75, 82, 10, c62.ink, 'middle', b.name, true))
    s.push(cf62T(b.x + 75, 98, 9, c62.tealInk, 'middle', b.note))
  })
  for (let k = 0; k < 3; k++) {
    const xa = 40 + k * 180 + 152
    const xb = xa + 26
    s.push(`<line x1="${xa}" y1="88" x2="${xb}" y2="88" stroke="${c62.ink}" stroke-width="1.8"/>`)
    s.push(`<polygon points="${xb - 6},84 ${xb - 6},92 ${xb + 1},88" fill="${c62.ink}"/>`)
  }
  s.push(`<rect x="16" y="140" width="${W - 32}" height="34" rx="8" fill="${c62.panelB}" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(cf62T(W / 2, 161, 9.5, c62.ink, 'middle', 'the resolver asks each server in turn; answers climb back through the same hands - DNS rides on port 53'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 3 — the address-space comparison bar               */
/* ================================================================== */
function cf62SolSpaceSvg(): string {
  const W = 760
  const H = 204
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="The address-space comparison, drawn honestly: a short amber bar for IPv4 labelled 2 to the 32 equals 4,294,967,296 addresses, and a full-width teal bar for IPv6 labelled 2 to the 128, about 3.4 times 10 to the 38. A note above the bottom bar admits that to true scale the IPv6 bar would be 2 to the 96, about 7.9 times 10 to the 28, times longer than the IPv4 bar - no page could hold it. The bottom bar prints the ratio again: 2 to the 128 divided by 2 to the 32 equals 2 to the 96.">`)
  s.push(cf62T(W / 2, 22, 11, c62.teal, 'middle', 'THE ADDRESS-SPACE COMPARISON - HONEST SCALE', true))
  s.push(cf62T(60, 66, 10.5, c62.ink, 'start', 'IPv4: 2^32', true))
  s.push(`<rect x="170" y="52" width="80" height="20" rx="3" fill="${c62.conn}"/>`)
  s.push(cf62T(260, 66, 9.5, c62.tealInk, 'start', '4,294,967,296 addresses - just under 4.3 billion'))
  s.push(cf62T(170, 88, 9, c62.tealInk, 'start', '32 bits of census'))
  s.push(cf62T(60, 108, 10.5, c62.ink, 'start', 'IPv6: 2^128', true))
  s.push(`<rect x="170" y="94" width="570" height="20" rx="3" fill="${c62.teal}"/>`)
  s.push(cf62T(455, 108, 9.5, c62.white, 'middle', '2^128 ~ 3.4 x 10^38 addresses', true))
  s.push(cf62T(W / 2, 140, 9.5, c62.tealInk, 'middle', 'to true scale the IPv6 bar would be 2^96 ~ 7.9 x 10^28 times longer than the IPv4 bar - no page could hold it'))
  s.push(`<rect x="16" y="160" width="${W - 32}" height="30" rx="8" fill="${c62.panelB}" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(cf62T(W / 2, 179, 9.5, c62.ink, 'middle', 'the ratio: 2^128 / 2^32 = 2^96 ~ 7.9 x 10^28 IPv6 addresses for every IPv4 address'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 4 — the hop-count latency board                    */
/* ================================================================== */
function cf62SolHopSvg(): string {
  const W = 760
  const H = 240
  const s: string[] = []
  const rows = [
    { hops: 3, txt: '3 hops x 25 ms = 75 ms one-way' },
    { hops: 4, txt: '4 hops x 25 ms = 100 ms one-way (the pinned case)' },
    { hops: 6, txt: '6 hops x 25 ms = 150 ms one-way' },
    { hops: 8, txt: 'round trip: 2 x 100 ms = 200 ms' },
  ]
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="The hop-count latency board at 25 milliseconds per hop. Row one: three hops make 75 milliseconds one-way. Row two: four hops make 100 milliseconds one-way, the pinned case. Row three: six hops make 150 milliseconds one-way. Row four: the round trip doubles the four-hop walk to 200 milliseconds. Each row carries a chain of small router circles joined by lines - one circle per network segment boundary crossed - and a caption bar says more hops, more accumulated delay.">`)
  s.push(cf62T(W / 2, 22, 11, c62.teal, 'middle', 'THE HOP-COUNT LATENCY BOARD - 25 ms A HOP', true))
  rows.forEach((r, k) => {
    const y = 58 + k * 38
    s.push(cf62T(70, y + 4, 10.5, c62.ink, 'start', r.txt, k === 1))
    const n = k === 3 ? 5 : r.hops + 1
    for (let i = 0; i < n; i++) {
      const cx = 460 + i * 36
      if (i > 0) s.push(`<line x1="${cx - 36 + 6}" y1="${y}" x2="${cx - 6}" y2="${y}" stroke="${c62.tealInk}" stroke-width="1.6"/>`)
      s.push(`<circle cx="${cx}" cy="${y}" r="5" fill="${k === 3 ? c62.accent : c62.teal}" stroke="${c62.tealInk}" stroke-width="1.2"/>`)
    }
  })
  s.push(`<rect x="16" y="196" width="${W - 32}" height="30" rx="8" fill="${c62.panelB}" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(cf62T(W / 2, 215, 9.5, c62.ink, 'middle', 'more hops, more accumulated delay - each passage from one network segment to the next costs its share'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 5 — the HOSTS.TXT then/now panel                   */
/* ================================================================== */
function cf62SolHostsSvg(): string {
  const W = 760
  const H = 252
  const s: string[] = []
  const thenLines = ['one text file naming every host', 'fetched from one single place', 'grows with every new host', 'one stale copy, one wrong route', 'the early-1980s bottleneck']
  const nowLines = ['a distributed hierarchy of servers', '13 root letter-groups A to M', 'TLD servers (.com and its kin)', 'authoritative servers own names', 'answers cached on the way back']
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="Before and after November 1983: two panels. The THEN panel shows the single HOSTS.TXT world - one text file naming every host, fetched from one single place, growing with every new host, where one stale copy means one wrong route. The NOW panel shows the DNS tree - a distributed hierarchy, 13 root letter-groups named A to M, TLD servers for dot-com and its kin, authoritative servers that own their names, and answers cached on the way back. A bottom bar dates the change to November 1983, Mockapetris at USC ISI, RFC 882 and 883, port 53.">`)
  s.push(cf62T(W / 2, 22, 11, c62.teal, 'middle', 'BEFORE AND AFTER NOVEMBER 1983 - ONE TABLE AGAINST A TREE', true))
  s.push(`<rect x="20" y="44" width="350" height="150" rx="8" fill="${c62.panelB}" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(cf62T(195, 66, 10.5, c62.ink, 'middle', 'THEN: HOSTS.TXT', true))
  thenLines.forEach((t, k) => s.push(cf62T(195, 90 + k * 20, 9.5, c62.tealInk, 'middle', t)))
  s.push(`<rect x="390" y="44" width="350" height="150" rx="8" fill="${c62.faint}" stroke="${c62.tealInk}" stroke-width="2"/>`)
  s.push(cf62T(565, 66, 10.5, c62.ink, 'middle', 'NOW: THE DNS TREE', true))
  nowLines.forEach((t, k) => s.push(cf62T(565, 90 + k * 20, 9.5, c62.tealInk, 'middle', t)))
  s.push(`<rect x="20" y="210" width="720" height="30" rx="8" fill="${c62.panelA}" stroke="${c62.accent}" stroke-width="2"/>`)
  s.push(cf62T(W / 2, 229, 9.5, c62.ink, 'middle', 'November 1983: Mockapetris at USC ISI (RFC 882/883) - names stay human, numbers stay machine, port 53'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 6 — the three-format strip (classify-12 aid)       */
/* ================================================================== */
function cf62SolFormatSvg(): string {
  const W = 760
  const H = 228
  const s: string[] = []
  const rows = [
    { chip: 'IPv4', fill: c62.teal, pattern: 'four dotted octets, each 0-255', example: '192.168.0.178', bits: '32 bits' },
    { chip: 'IPv6', fill: c62.conn, pattern: 'eight colon-separated hex groups', example: '2001:CDBA:...:9652', bits: '128 bits' },
    { chip: 'MAC', fill: c62.accent, pattern: '12 hex digits in six pairs', example: '00:1A:2B:3C:4D:5E', bits: '48 bits' },
  ]
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="Three address formats at a glance, one row each. IPv4: four dotted octets, each 0 to 255, example 192.168.0.178, 32 bits. IPv6: eight colon-separated hex groups, example 2001 colon CDBA and so on to 9652, 128 bits. MAC: twelve hex digits in six pairs, example 00 colon 1A colon 2B colon 3C colon 4D colon 5E, 48 bits. A bottom bar gives the sort test: count the separators - three dots mean IPv4, seven colons mean IPv6, five colons or dashes between pairs mean MAC.">`)
  s.push(cf62T(W / 2, 22, 11, c62.teal, 'middle', 'THREE FORMATS AT A GLANCE - SORT ANY IDENTIFIER', true))
  rows.forEach((r, k) => {
    const y = 70 + k * 40
    s.push(`<rect x="20" y="${y - 16}" width="90" height="24" rx="6" fill="${r.fill}"/>`)
    s.push(cf62T(65, y, 10.5, c62.white, 'middle', r.chip, true))
    s.push(cf62T(130, y, 9.5, c62.ink, 'start', r.pattern, true))
    s.push(cf62T(430, y, 9.5, c62.tealInk, 'start', r.example))
    s.push(cf62T(680, y, 9, c62.tealInk, 'start', r.bits))
    if (k < 2) s.push(`<line x1="20" y1="${y + 12}" x2="740" y2="${y + 12}" stroke="${c62.faint}" stroke-width="1.2" stroke-dasharray="4 4"/>`)
  })
  s.push(`<rect x="16" y="182" width="${W - 32}" height="34" rx="8" fill="${c62.panelB}" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(cf62T(W / 2, 203, 9.5, c62.ink, 'middle', 'the sort test: count the separators - 3 dots mean IPv4, 7 colons mean IPv6, 5 colons or dashes in pairs mean MAC'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 7 — the patience ledger board                      */
/* ================================================================== */
function cf62SolLedgerSvg(): string {
  const W = 760
  const H = 228
  const s: string[] = []
  const chips = ['60 MB', 'x 8', '480 Mbit', '/ 9,600', '50,000 s', '/ 3,600', '13.9 h']
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f62}" role="img" aria-label="The patience ledger of 1995: a chain of seven chips reading 60 MB, times 8, 480 Mbit, divided by 9,600, 50,000 seconds, divided by 3,600, 13.9 hours. A line beneath reads sixty megabytes at the 1995 gateway speed - fourteen hours short of a full day. The tariff lines read 5,200 rupees over 250 hours equals 20.80 rupees per hour, so 100 hours online cost 2,080 rupees. A bottom bar shows the engine check: 60 times 8 equals 480; 480 million over 9,600 equals 50,000; 50,000 over 3,600 equals 13.9.">`)
  s.push(cf62T(W / 2, 22, 11, c62.teal, 'middle', 'THE PATIENCE LEDGER - 60 MB AT 9.6 kbit/s, 1995', true))
  chips.forEach((c, k) => {
    const x = 24 + k * 104
    s.push(`<rect x="${x}" y="48" width="86" height="30" rx="6" fill="${k === 6 ? c62.panelA : c62.white}" stroke="${k === 6 ? c62.accent : c62.teal}" stroke-width="2"/>`)
    s.push(cf62T(x + 43, 67, 9.5, c62.ink, 'middle', c, true))
    if (k < 6) {
      s.push(`<line x1="${x + 88}" y1="63" x2="${x + 102}" y2="63" stroke="${c62.ink}" stroke-width="1.8"/>`)
      s.push(`<polygon points="${x + 98},59 ${x + 98},67 ${x + 104},63" fill="${c62.ink}"/>`)
    }
  })
  s.push(cf62T(W / 2, 104, 9.5, c62.tealInk, 'middle', 'sixty megabytes at the 1995 gateway speed - fourteen hours short of a full day'))
  s.push(cf62T(W / 2, 140, 10.5, c62.ink, 'middle', 'the tariff ledger: 5,200 rupees / 250 hours = 20.80 rupees per hour', true))
  s.push(cf62T(W / 2, 162, 9.5, c62.tealInk, 'middle', 'so 100 hours online cost 100 x 20.80 = 2,080 rupees - in 1995 money'))
  s.push(`<rect x="16" y="184" width="${W - 32}" height="30" rx="8" fill="${c62.panelB}" stroke="${c62.conn}" stroke-width="2"/>`)
  s.push(cf62T(W / 2, 203, 9.5, c62.ink, 'middle', 'the engine check: 60 x 8 = 480; 480,000,000 / 9,600 = 50,000; 50,000 / 3,600 = 13.9'))
  s.push('</svg>')
  return s.join('')
}

export const lesson62: Lesson = {
  id: 'cf-the-internet-a-network-of-networks',
  number: '6.2',
  title: 'The Internet: a Network of Networks',
  concepts: [
    'the Internet as a network of networks',
    'the six-rung tier ladder from device to backbone',
    'TCP/IP: the one protocol family every member speaks',
    'IPv4, IPv6 and MAC: the three numbering schemes',
    'DNS resolution: 8 steps, 4 server kinds, port 53',
    'routers, hops and accumulated delay',
    'client and server: request-maker and answer-keeper',
    'the dated beats from ARPANET 1969 to VSNL 1995',
  ],
  objectives: [
    'By the end of this lesson you can define the Internet as the worldwide network of networks - millions of independent networks agreeing to exchange traffic by speaking one common protocol family - and walk the six-rung tier ladder from your device through the modem, the local ISP, the regional and national networks to the backbone.',
    'By the end of this lesson you can carry the dated beats honestly and do their gap arithmetic: ARPANET\'s \'lo\' message on 29 October 1969, the TCP/IP flag day on 1 January 1983, DNS in November 1983, ERNET in 1986, the Web proposal in March 1989, the first site on 6 August 1991, the public-domain release in April 1993 and VSNL\'s gateway on 15 August 1995 - with the gaps 14, 3, 9, 26, 2, 2 and 2 years.',
    'By the end of this lesson you can anatomise the three numbering schemes: an IPv4 address as four dot-separated octets of 8 bits (32 bits, $2^{32}$ = 4,294,967,296 addresses, just under 4.3 billion), an IPv6 address as eight colon-separated hex groups of 16 bits (128 bits, $2^{128}$ addresses), and a MAC address as 48 bits in 12 hex digits - a 24-bit maker code plus a 24-bit serial.',
    'By the end of this lesson you can walk the DNS ladder: name the 8 steps of a lookup, the 4 server kinds it visits (recursive resolver, root, TLD, authoritative), the 13 root name servers A to M, and port 53; and you can say why names are for humans while routing is done on numbers.',
    'By the end of this lesson you can compute the price of distance and of patience: 4 hops at 25 ms each make 100 ms one-way (200 ms round trip), and a 60 MB file at 9.6 kbit/s took 50,000 s - 13.9 hours - while an hour online under the 1995 GIAS tariff cost 5,200 rupees over 250 hours = 20.80 rupees.',
    'By the end of this lesson you can distinguish client from server and Internet from Web, and name the doorstep books honestly: \'Computer Networks\' owns switching theory, routing algorithms and the full protocol stack, and \'Cybersecurity\' owns the attack surface.',
  ],
  prerequisites: ['cf-the-network-idea'],
  sources: ['cs-cf-web-ground-ch06'],
  blocks: [
    { kind: 'heading', text: 'From the Network Idea to the Network of Networks' },
    { kind: 'para', text: 'Lesson 6.1, \'The Network Idea\', gave you the two tools every network is built from: the packet, that small labelled envelope of bytes, and bandwidth, the rate at which one link can carry those envelopes. It ended with the local area network - one building, one organisation, cables short enough to shout across. This lesson asks the question that turns a thousand small networks into one global one: what happens when the networks THEMSELVES want to talk?' },
    { kind: 'para', text: 'The answer is the subject of the whole lesson. You do not build one enormous network spanning the planet - nobody could own, cable or repair such a thing. Instead you join existing networks to one another at their edges, and you persuade every one of them to speak the same small family of protocols. The result is not one network at all in the strict sense: it is a network OF networks, and that is precisely its name.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the Internet', text: '**The Internet** is said to be the worldwide network of networks: the millions of independent networks - LANs, ISP access networks, regional and national carriers - that agree to exchange traffic with one another by speaking one common protocol family, TCP/IP. Symbolically: if each member network is a city with its own streets (lesson 6.1\'s ground), the Internet is the treaty between those cities - one shared numbering scheme for addresses, one shared postal custom for packets, and no shared king.' },
    { kind: 'para', text: 'Notice what the definition does NOT say. It does not name a company, because no company owns the Internet. It does not name a place, because no single room, building or country houses it. It does not even name a cable, because every member owns its own cables and merely agrees to carry one another\'s packets across them. The Internet is an agreement first and a collection of machines second - which is why it can grow a little every single day without asking anyone\'s permission, and why it has no front door to close.' },
    { kind: 'callout', tone: 'insight', title: 'Why this matters', text: 'Everything else in this chapter - the addresses, the name system, the routers - exists to serve that one agreement. When you meet each piece, ask it the same question: what does this do to let MY network talk to YOURS? A piece that cannot answer is decoration; every piece in this lesson can.' },
    { kind: 'para', text: 'The lesson runs in one climb, like the ladder it opens with. First the tier ladder: the six rungs between your device and the backbone. Then the treaty itself, TCP/IP, and its honest history from ARPANET\'s two letters in 1969 to India\'s public gateway of 1995. Then the numbering schemes: IP addresses in two sizes, and the MAC address that never changes. Then the phonebook, DNS, whose eight-step ladder you will learn to walk in your sleep. The lesson closes with routers and hops, with client and server, and with the patience ledger of the 9.6 kbit/s era - the arithmetic our connection years demanded.' },
    { kind: 'para', text: 'One more orientation before the climb: keep the treaty and its passengers apart. ON the Internet ride many services - the Web of linked pages, electronic mail, the moving of files, the calling of names to numbers - and every one of them is a passenger, not the road. When this lesson later insists that the Internet is not the Web, that is the distinction being made: the road was laid in 1969 and re-signed in 1983, while the Web, its most famous passenger, only boarded in 1989. Learn the road first; the passengers will introduce themselves in the lessons that follow.' },

    { kind: 'heading', text: 'The Tier Ladder: How Your Bits Reach the World' },
    { kind: 'para', text: 'Begin where every journey begins: your own device. Watch a request climb. The laptop in front of you speaks first to its modem - the box that translates between your home wiring and the line beyond it. That line belongs to your local ISP. The ISP hands your traffic to a regional network, which carries it between the ISPs of a whole region; the regional network passes it to a national network, the country\'s carriers and exchanges; and at the top the traffic rides the backbone - the country-scale trunk lines that every network meets. Six rungs, and the ladder is drawn below.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — ISP', text: '**An ISP** (Internet Service Provider) is said to be any organisation that provides access to the Internet, by linking your device to its own network and, through the agreements above, to every other member. Symbolically: the ISP is the first rung of the ladder that you do not own yourself, and the first party in the story that you pay.' },
    { kind: 'figure', caption: 'The tier ladder: six rungs from your device to the backbone, the request travelling down the left rail and the answer climbing back up the right. Each rung is a network owned by somebody else, joined to its neighbours by agreement - a network of networks, with the backbone at country scale. Six rungs make five passages between neighbours, and every passage is a router somewhere.', svg: cf62LadderSvg() },
    { kind: 'para', text: 'Read the ladder in both directions. The request you send climbs rung by rung toward the backbone; the answer climbs back down the same ladder to your screen. No rung owns the whole trip - each one receives your packets, decides the next rung, and transmits them onward. And the ladder is honest about ownership: five of the six rungs are machines and lines that belong to other people, joined to your traffic by nothing but agreement. That is the entire secret of the thing.' },
    { kind: 'table', caption: 'The six rungs of the tier ladder, each with its owner and the scale it covers. Learn the order cold; examinations ask for it as a list and the rest of the chapter assumes it.', head: ['The rung', 'Who runs it', 'The scale it covers'], rows: [
      ['Your device', 'you', 'one desk or one pocket'],
      ['The modem', 'you, or your building', 'one wall socket'],
      ['The local ISP', 'the company you pay', 'one town or city'],
      ['The regional network', 'a group of ISPs together', 'one state or region'],
      ['The national network', 'national carriers', 'one country'],
      ['The backbone', 'carrier consortia', 'country scale and beyond'],
    ] },
    { kind: 'para', text: '\'A network of networks\' is now a countable claim. Thousands of LANs - the classroom, office and data-centre networks of lesson 6.1 - and thousands of ISP access networks, each internally sovereign, each externally speaking one protocol family. When your packet leaves your home LAN it does not stop being on a network; it simply enters the next one, and the next, each handover marked by a router that has agreed to pass traffic both ways. Your home network rules a handful of devices; the backbone rules none of them and carries all of them.' },
    { kind: 'example', title: 'Illustration 1. The ladder walk: name the six rungs in order, and count the handoffs between neighbours.', steps: [
      'Take the ladder from your own end: the journey begins at your device - the laptop or phone in your hand.',
      'So, the first handoff is to the modem, where your home wiring meets the ISP\'s line.',
      'Now, the local ISP takes over - the access provider you pay.',
      'Then the regional network, carrying a region\'s ISPs between themselves.',
      'And the national network - the country\'s carriers and exchanges.',
      'At last the backbone: the country-scale trunks every network meets.',
      'Count the handoffs: 6 rungs leave 6 - 1 = 5 passages between neighbours.',
      'Hence the rungs are device, modem, local ISP, regional network, national network, backbone - six rungs, five handoffs.',
    ], answer: 'Hence device, modem, local ISP, regional network, national network, backbone - six rungs and five handoffs between neighbours' },
    { kind: 'callout', tone: 'insight', title: 'Nobody owns the ladder', text: 'Your ISP owns one rung; consortia own the backbone; your device and modem are yours. The Internet keeps working precisely because no single party can switch the whole ladder off - the agreement, not any one machine, is the thing that persists. Take away any one rung and traffic reroutes; take away the agreement and there is nothing to reroute.' },
    { kind: 'terms', items: [
      { term: 'Internet', def: 'the worldwide network of networks - millions of independent networks agreeing to exchange traffic by speaking the one common protocol family, TCP/IP.' },
      { term: 'ISP', def: 'Internet Service Provider: any organisation that provides access to the Internet; the first rung of the tier ladder that you do not own.' },
      { term: 'backbone', def: 'the country-scale trunk lines and the consortia that operate them - the top rung of the tier ladder, where the national networks all meet.' },
    ] },

    { kind: 'heading', text: 'TCP/IP: The Treaty Every Member Signs' },
    { kind: 'para', text: 'A ladder of rungs is only hardware until the rungs agree on a language. Lesson 6.1 defined a protocol as the agreed set of rules two parties follow so that a conversation can happen at all; a PROTOCOL FAMILY is that idea scaled up - a small bundle of protocols, each with its own job, that together move a packet from any member to any other. The family the whole Internet agreed on is called TCP/IP, and it deserves to be met as what it is: a treaty.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — TCP/IP', text: '**TCP/IP** is said to be the common protocol family that every member network of the Internet agrees to speak: IP, the Internet Protocol, addressing and carrying each packet toward its destination, and TCP, the Transmission Control Protocol, splitting traffic into numbered packets, checking that each arrives, and reassembling them in order at the far end. Symbolically: IP writes the envelope, TCP numbers the pages and asks for any that go missing - and the treaty is that EVERY member speaks both.' },
    { kind: 'para', text: 'Keep the division of labour straight and you hold the whole treaty in two lines. IP is the pragmatist: give it a destination address and it will carry that packet one network closer, hop by hop, asking nothing about what the packet means. TCP is the perfectionist: it watches the numbered stream, notices a lost page, and asks for it again until the far end holds the whole document in order. Neither could run the Internet alone - an honest postal service needs both the sorting floor and the registered post. How the two cooperate packet by packet, and how the full stack of protocols stacks above and beneath them, is the ground of our doorstep book \'Computer Networks\', which owns switching theory, routing algorithms and congestion control; this lesson needs only the treaty\'s name and its census.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — ARPANET, and the two letters that arrived', text: 'The Internet\'s ancestor was ARPANET, a research network of the American defence agency ARPA. At 10:30 pm PST on 29 October 1969 a student at UCLA tried to send the word \'login\' to the machine at SRI - and the system crashed after two letters. The first characters ever transmitted on that network were therefore \'lo\', as in \'lo and behold\', the survivors liked to say afterwards. Be honest when you retell it: the crash is a story told by the people who were there, and they told it cheerfully; what is beyond dispute is the date, the two sites, and that the network reached four nodes - UCLA, SRI, UCSB and Utah - by December 1969.' },
    { kind: 'para', text: 'For its first years ARPANET spoke an older protocol called NCP. The treaty changed on a single, astonishing day: 1 January 1983, the famous flag day, when every host on the network switched from NCP to TCP/IP at once. There was no gradual rollout and no mercy period - one calendar page turned and the whole network spoke the new family or fell silent. That date, more than 1969, is the birthday of the Internet as we have defined it: the moment the agreement became \'everyone speaks TCP/IP\'. Fourteen years separate the \'lo\' message from the flag day - 1983 minus 1969 is 14 - and by the end of those years the experiment had become infrastructure.' },
    { kind: 'para', text: 'Infrastructure then grew at speed. The American NSFNET backbone - the National Science Foundation network that carried academic traffic through the late 1980s - grew from 6 nodes linked at 56 kbps to 21 nodes linked at 45 Mbps: fifteen nodes added, and a trunk speed multiplied by 45,000/56, roughly 803.6 times. Meanwhile the treaty crossed oceans. India\'s education and research network ERNET began in 1986, three years after the flag day, wiring the universities and laboratories into the world\'s conversation - though not yet the public. Public arrival waited nine years more, and its story is pinned later in this lesson with its own arithmetic.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the Internet is not the Web', text: 'The commonest examination trap in this chapter is using \'the Internet\' and \'the Web\' as synonyms. They are not. The Internet is the network of networks - the treaty, the cables, the routers, born in 1969 and re-founded on TCP/IP in 1983. The Web is ONE service that rides on it - a system of linked pages, proposed in March 1989 and first seen publicly in 1991. The Web lives ON the Internet the way mail lives on the postal system. Every objective test of this lesson probes that distinction.' },
    { kind: 'terms', items: [
      { term: 'TCP/IP', def: 'the common protocol family every Internet member speaks: IP addresses and carries the packets, TCP numbers, checks and reassembles the stream; agreed by all on flag day, 1 January 1983.' },
    ] },

    { kind: 'heading', text: 'The Dated Beats, Told Honestly' },
    { kind: 'para', text: 'Dates in this subject are not decoration; they are the skeleton of the story, and examiners set them deliberately. Carry eight beats, in order, and do their arithmetic yourself once - the numbers below are all subtractions you can check on your fingers. The timeline prints every gap, and the gaps are the point: 14 years from ARPANET to the flag day; 3 more to ERNET; 9 more to India\'s public gateway - which is 26 years from 1969 to 1995 in one chain. Then the web era runs in short steps: 2 years from proposal to first site, 2 more to the public-domain release, and 2 more to India online. Fourteen, three, nine, twenty-six, two, two, two.' },
    { kind: 'figure', caption: 'The dated beats, told honestly: eight beats on one 1969-1995 line, with every gap computed from the years. Above the axis the consecutive gaps print as 14, 3, 3, 2, 2 and 2 years; below it the two long brackets print the whole span 1969 to 1995 as 26 years and the India gap, ERNET 1986 to public access 1995, as 9 years. January\'s flag day and November\'s DNS both fall in 1983 - the busiest year in the story.', svg: cf62TimelineSvg() },
    { kind: 'table', caption: 'The eight dated beats of the Internet story, each with its year and one-line meaning. Learn the table cold; then close it and reconstruct the gaps by subtraction.', head: ['The beat', 'The year', 'The one-line meaning'], rows: [
      ['ARPANET\'s first message', '29 October 1969', "UCLA to SRI; the crash left 'lo' sent of 'login'"],
      ['Four nodes on ARPANET', 'December 1969', 'UCLA, SRI, UCSB and Utah joined'],
      ['The TCP/IP flag day', '1 January 1983', 'every host switched from NCP to TCP/IP at once'],
      ['DNS is born', 'November 1983', 'Mockapetris at USC ISI; RFC 882/883 replace HOSTS.TXT'],
      ['ERNET begins', '1986', "India's education and research network"],
      ['The Web proposed', 'March 1989', "Berners-Lee's proposal at CERN"],
      ['The first website', '6 August 1991', 'info.cern.ch opens to the public'],
      ['The Web set free', 'April 1993', 'CERN releases the Web to the public domain'],
      ['India\'s public gateway', '15 August 1995', "VSNL's GIAS opens at 9.6 kbit/s"],
    ] },
    { kind: 'para', text: 'Read the last three web beats as one arc. Tim Berners-Lee, working at CERN, wrote the Web\'s proposal in March 1989 - three years after ERNET, and twenty years after the \'lo\' message. The first website opened to the public on 6 August 1991 at the address info.cern.ch: 2 years after the proposal. CERN released the whole Web into the public domain in April 1993 - 2 years more - which is the reason the Web could spread without anyone collecting rent on it. And 2 years after THAT, on 15 August 1995, India\'s public Internet began. Six years from proposal to a browser in an Indian home: 2 + 2 + 2, and every step checkable by subtraction.' },
    { kind: 'example', title: 'Illustration 2. The gap arithmetic run: compute the seven pinned gaps of the story, then close both chains.', steps: [
      'Take the four infrastructure years first: 1969, 1983, 1986 and 1995.',
      'So, ARPANET to the flag day: 1983 - 1969 = 14 years.',
      'Now, flag day to ERNET: 1986 - 1983 = 3 years.',
      'Then ERNET to India\'s public gateway: 1995 - 1986 = 9 years.',
      'Check the chain closes: 14 + 3 + 9 = 26, and indeed 1995 - 1969 = 26 years for the whole span.',
      'Take the three web years next: 1989, 1991, 1993, 1995.',
      'So, proposal to first site: 1991 - 1989 = 2 years; first site to public domain: 1993 - 1991 = 2 years; public domain to India online: 1995 - 1993 = 2 years.',
      'Check again: 2 + 2 + 2 = 6, and 1995 - 1989 = 6 years agrees.',
      'Hence the seven gaps are 14, 3, 9, 26, 2, 2 and 2 years - two chains, both closed.',
    ], answer: 'Hence 14, 3, 9, 26, 2, 2 and 2 years - with 14 + 3 + 9 = 26 and 2 + 2 + 2 = 6 closing both chains' },
    { kind: 'list', marker: 'roman', items: [
      '(i) 29 October 1969 - the \'lo\' message, UCLA to SRI, at 10:30 pm PST.',
      '(ii) December 1969 - four nodes: UCLA, SRI, UCSB, Utah.',
      '(iii) 1 January 1983 - the flag day: every host on TCP/IP.',
      '(iv) November 1983 - DNS replaces the single HOSTS.TXT.',
      '(v) 1986 - ERNET brings the treaty to Indian campuses.',
      '(vi) March 1989 - the Web proposed at CERN.',
      '(vii) 6 August 1991 - the first website, info.cern.ch.',
      '(viii) April 1993 - the Web released to the public domain; and 15 August 1995 - VSNL\'s gateway opens India\'s public Internet.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — India\'s two arrivals', text: 'India met the Internet twice, once by the campus gate and once by the public gate. ERNET, the education and research network, began in 1986 and carried universities and laboratories for nearly a decade - 9 years - before the public could follow. On 15 August 1995, VSNL\'s Gateway Internet Access Service (GIAS) opened the public gate at 9.6 kbit/s, under a tariff of 5,200 rupees for 250 hours - 20.80 rupees for every hour online. Independence Day was a deliberate, cheerful choice: the country marked its freedom anniversary by joining the world\'s network.' },
    { kind: 'para', text: 'One more honesty note before the section closes. The \'lo\' story is a legend in the good sense - told by its own participants, charming because true in its essentials, retold here with the crash kept in. The dates themselves are documents, not legends: the flag day was scheduled and enforced; the DNS papers are filed as RFC 882 and 883; the CERN decision of April 1993 is a signed release. When you write these dates in an examination you are quoting paperwork, not folklore - and when you retell the \'lo\' you may say, precisely, that the first two letters of \'login\' are what arrived.' },

    { kind: 'heading', text: 'IP Addresses: The House Numbers of the Internet' },
    { kind: 'para', text: 'A treaty needs addresses. If every member network is a city, the treaty\'s first clause must be a street-numbering scheme that works in all of them at once - because a packet leaving your laptop in one city must carry a destination that a router in another city can read without asking questions. That scheme is the IP address, and the simplest way to hold it is the house-address analogy: the network part of the address is the street, saying WHICH network the destination lives on; the host part is the house number, saying WHICH machine on that street it is. Routers between networks read mostly the street; the final router on the destination street reads the house number.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — IP address', text: '**An IP address** is said to be the number that identifies a network connection on the Internet, written so that part of it names the network and part names the host on that network. Symbolically: address = (network part, host part), and the boundary between the two is what the routers of the world agree it is for that address. Version 4 of the scheme writes 32 bits; version 6 writes 128.' },
    { kind: 'figure', caption: 'The two address anatomies side by side. IPv4: the example 192.168.0.178 as four dot-separated octets, each 8 bits and each running 0 to 255 - a bracket sums them to 4 x 8 = 32 bits, and the space line prints the census 2^32 = 4,294,967,296, just under 4.3 billion and not enough. IPv6: the example 2001:CDBA:0000:0000:0000:0000:3257:9652 as eight colon-separated hex groups of 16 bits - 8 x 16 = 128 bits, with a space of 2^128, about 3.4 x 10^38. The bottom bar prints the ratio of the two spaces: 2^96, about 7.9 x 10^28 to one.', svg: cf62AnatomySvg() },
    { kind: 'para', text: 'Take IPv4 apart slowly, because every examination board in this subject has asked for it. The 32 bits are written as FOUR numbers - octets, from the Latin for eight - separated by dots: 192.168.0.178 is the worked example this lesson carries. Each octet holds 8 of the bits, and 8 bits can make $2^{8} = 256$ different values, so every octet runs from 0 to 255 - never 256, never more. Four octets of eight bits give 4 x 8 = 32 bits in all, and three dots do the separating. That is the whole written form; read it as four small numbers and you can check any IPv4 address for legality in your head.' },
    { kind: 'equation', latex: 'N_{\\text{IPv4}} = 2^{32} = 4{,}294{,}967{,}296 \\approx 4.3 \\times 10^{9} \\tag{1}', note: 'The IPv4 census: a 32-bit address offers two choices per bit, so the count of distinct addresses is $2^{32}$ - four billion, two hundred ninety-four million, nine hundred sixty-seven thousand, two hundred ninety-six: just under 4.3 billion.' },
    { kind: 'example', title: 'Illustration 3. The octet run on the worked example 192.168.0.178: verify the form, the ranges and the bit count.', steps: [
      'Take the address as printed: 192.168.0.178 - four numbers separated by three dots.',
      'So, each number is an octet carrying 8 bits, and the legal range is 0 to 255 because $2^{8} = 256$ values start counting at zero.',
      'Check each octet against the range: 192 is legal, 168 is legal, 0 is legal, 178 is legal - all four sit inside 0 to 255.',
      'Now, count the bits: 4 octets x 8 bits = 32 bits, the IPv4 width.',
      'Hence 192.168.0.178 is a lawful IPv4 address: four octets, three dots, every octet in 0-255, 32 bits in all.',
    ], answer: 'Hence four octets 192, 168, 0 and 178 - all within 0-255 - with 4 x 8 = 32 bits and three dots: a lawful IPv4 address' },
    { kind: 'para', text: 'Now the census, and the disappointment. Thirty-two bits sound generous until you multiply them out: $2^{32} = 4{,}294{,}967{,}296$ - four billion two hundred ninety-four million nine hundred sixty-seven thousand two hundred ninety-six addresses, just under 4.3 billion. When the world\'s population alone is several times that, and each person now owns a phone, a laptop, a television and a watch that all want addresses, the shortage is arithmetic, not opinion: 5,032,704 addresses short of 4.3 billion even before the second device enters any pocket. Add the wasteful way early allocations handed out whole streets to single organisations, and IPv4 ran out of road. The fix was not clever bookkeeping; it was a wider address.' },
    { kind: 'example', title: 'Illustration 4. The census run: compute the IPv4 space and its shortfall against 4.3 billion.', steps: [
      'Take the width: 32 bits, each doubling the count, so the space is $2^{32}$.',
      'So, expand the power: $2^{32} = 4{,}294{,}967{,}296$ addresses - four billion two hundred ninety-four million nine hundred sixty-seven thousand two hundred ninety-six.',
      'Now, set it against the round figure: $4.3 \\times 10^{9} = 4{,}300{,}000{,}000$, and the space falls short by 4,300,000,000 - 4,294,967,296 = 5,032,704.',
      'Hence the IPv4 space is 4,294,967,296 addresses - just under 4.3 billion, and not enough for the world\'s devices.',
    ], answer: 'Hence 2^32 = 4,294,967,296 addresses, just under 4.3 billion - short by 5,032,704, and not enough' },
    { kind: 'para', text: 'IPv6 widens the street. The address grows to 128 bits, written as EIGHT groups of four hexadecimal digits separated by colons; the worked example is 2001:CDBA:0000:0000:0000:0000:3257:9652. Each group carries 16 bits (four hex digits, since one hex digit is exactly 4 bits), so the count is 8 x 16 = 128 bits, and the whole address is 32 hex digits joined by seven colons. Hexadecimal - base 16, digits 0-9 and A-F - is used because it maps cleanly onto bits: every four bits become exactly one digit, never a fraction left over.' },
    { kind: 'equation', latex: 'N_{\\text{IPv6}} = 2^{128} \\approx 3.4 \\times 10^{38} \\tag{2}', note: 'The IPv6 census: 128 bits give $2^{128}$ addresses - about 3.4 times ten to the 38, a number so far beyond need that the familiar shortage problem dissolves.' },
    { kind: 'example', title: 'Illustration 5. The IPv6 anatomy run on 2001:CDBA:0000:0000:0000:0000:3257:9652: verify the groups, the digits and the width.', steps: [
      'Take the address as printed: eight groups - 2001, CDBA, 0000, 0000, 0000, 0000, 3257, 9652 - separated by seven colons.',
      'So, each group is four hexadecimal digits: 0-9 and A-F, and four hex digits carry 4 x 4 = 16 bits.',
      'Now, count the width: 8 groups x 16 bits = 128 bits, and the digit census is 8 x 4 = 32 hex digits.',
      'Check the example group by group: 2001, CDBA, 3257 and 9652 all use legal hex digits, and the four 0000 groups are lawful zeros.',
      'Hence the address is a lawful IPv6 form: eight 16-bit hex groups, seven colons, 128 bits.',
    ], answer: 'Hence eight hex groups x 16 bits = 128 bits, seven colons and 32 hex digits: the lawful IPv6 anatomy' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the address-space law', text: 'If one numbering scheme allots $b_{1}$ bits and another allots $b_{2}$ bits, the ratio of their census sizes is $2^{b_{2} - b_{1}}$ - an exponential, not a multiplication. For IPv4 against IPv6: $2^{128}/2^{32} = 2^{96} \\approx 7.9 \\times 10^{28}$ IPv6 addresses exist for every IPv4 address. Four times the bits do not give four times the space; they give $2^{96}$ times the space.' },
    { kind: 'derivation', title: 'The address-space law applied', statement: 'IPv4 allots 32 bits per address and IPv6 allots 128. Compute both census sizes and the ratio of the second to the first, and say what the ratio means for the shortage problem.', steps: [
      { label: 'Count the IPv4 space', formula: '2^{32} = 4{,}294{,}967{,}296', explanation: 'a 32-bit register takes two states per bit, so the count of distinct addresses is two raised to the thirty-second power - just under 4.3 billion.' },
      { label: 'Count the IPv6 space', formula: '2^{128} \\approx 3.4 \\times 10^{38}', explanation: 'the same doubling done 128 times: about 3.4 times ten to the thirty-eighth, a number with thirty-nine digits.' },
      { label: 'Take the ratio of the spaces', formula: '\\frac{2^{128}}{2^{32}} = 2^{96} \\approx 7.9 \\times 10^{28}', explanation: 'subtract the exponents when dividing powers of the same base: 128 - 32 = 96, so the IPv6 space is two to the ninety-sixth times the IPv4 space.' },
      { label: 'Read the result honestly', explanation: 'the ratio is not merely large; it is beyond any count of devices the planet could hold - which is why IPv6 is designed to be lavish rather than thrifty, and why the shortage that doomed IPv4 cannot recur at this width.' },
    ], result: 'Hence IPv4 offers $2^{32} = 4{,}294{,}967{,}296$ addresses, IPv6 offers $2^{128} \\approx 3.4 \\times 10^{38}$, and the second space is $2^{96} \\approx 7.9 \\times 10^{28}$ times the first.' },
    { kind: 'terms', items: [
      { term: 'IP address', def: 'the number identifying a network connection on the Internet: a network part (the street) and a host part (the house number), written in IPv4 as 32 bits or IPv6 as 128.' },
      { term: 'IPv4', def: 'version 4 of the IP address: 32 bits as four dot-separated octets of 8 bits, each octet 0 to 255 - a census of 2^32 = 4,294,967,296, just under 4.3 billion.' },
      { term: 'IPv6', def: 'version 6 of the IP address: 128 bits as eight colon-separated groups of four hex digits, 16 bits a group - a census of 2^128, about 3.4 x 10^38 addresses.' },
    ] },

    { kind: 'heading', text: 'MAC versus IP: Two Addresses, Two Jobs' },
    { kind: 'para', text: 'Every device you own carries, in fact, TWO addresses, and confusing them is the second classic error of this chapter. The MAC address belongs to the network INTERFACE - the hardware - and is burnt in at manufacture; the IP address belongs to the CONNECTION - the place in today\'s network - and changes whenever the device moves to a different network. Your laptop keeps one MAC address for its life and collects a new IP address at every cafe it visits. Postal metaphor, once more: the MAC is the passport, issued once and identifying the traveller; the IP is the hotel room number, right for tonight and wrong next week.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — MAC address', text: '**A MAC address** (Media Access Control) is said to be the 48-bit hardware address burnt into a network interface at manufacture, written as 12 hex digits in six pairs - its first 24 bits the OUI, the maker\'s code, and its last 24 bits the serial the maker assigns. Symbolically: MAC = 24 bits of WHO MADE IT + 24 bits of WHICH ONE THEY MADE, 48 bits = 12 hex digits in all.' },
    { kind: 'example', title: 'Illustration 6. The MAC anatomy run: split 48 bits into its halves, count the hex digits and size each half.', steps: [
      'Take the width: 48 bits, split by the definition as 24 + 24 - maker code then serial.',
      'So, in hexadecimal each 4 bits make one digit: 48/4 = 12 hex digits, written as six pairs such as 00:1A:2B:3C:4D:5E.',
      'Now, size each half: 24 bits give $2^{24} = 16{,}777{,}216$ possible maker codes, and equally many serials under each maker.',
      'Check the boundary in the example: the first three pairs - 00:1A:2B - are the OUI half; the last three - 3C:4D:5E - are the serial half.',
      'Hence a MAC address is 48 bits = 24 + 24, twelve hex digits in six pairs, with 2^24 = 16,777,216 values available to each half.',
    ], answer: 'Hence 48 bits split 24 + 24 into OUI and serial - 12 hex digits in six pairs, 2^24 = 16,777,216 values per half' },
    { kind: 'table', caption: 'MAC against IP: the two addresses side by side. Learn the last row best - it is the one examinations set as a trap.', head: ['The question', 'The MAC address', 'The IP address'], rows: [
      ['How wide?', '48 bits', '32 bits (IPv4) or 128 (IPv6)'],
      ['How written?', '12 hex digits in six pairs', 'four dotted octets, or eight hex groups'],
      ['Who assigns it?', 'the maker, at manufacture', 'the network you join, per connection'],
      ['Where does it live?', 'burnt into the interface', 'assigned to the connection'],
      ['Does it change?', 'no - it travels with the device', 'yes - it changes when the node moves network'],
    ] },
    { kind: 'para', text: 'Why two addresses at all? Because they answer two different questions for two different audiences. Within one LAN - your home, your office - the hardware MAC is enough: the switches of that network deliver frames by MAC, and no wider knowledge is needed. The moment traffic must LEAVE that LAN, the MAC becomes useless as a global identifier - it names a maker and a serial, never a street - and the routable IP takes over. The router at the boundary is the bilingual officer of the design: it accepts your packet addressed by IP, hands it across, and lets the next network\'s own local addressing carry it onward. Two addresses, two jobs, one handover.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the MAC trap', text: 'A MAC address is NOT \'the device\'s IP address by another name\'. It is 48 bits, not 32 or 128; it is hex pairs, not dotted octets; it is burnt in, not assigned; and it does not change when the network does. If an examination option says a MAC address changes when you move to a new cafe, that option is describing the IP address and is wrong on purpose.' },
    { kind: 'terms', items: [
      { term: 'MAC address', def: 'the 48-bit hardware address burnt into a network interface: 24 bits of maker code (OUI) plus 24 bits of serial, written as 12 hex digits in six pairs; it does not change when the node moves.' },
    ] },

    { kind: 'heading', text: 'DNS: The Phonebook of the Internet' },
    { kind: 'para', text: 'Humans do not type numbers; humans type names. You write a site\'s name into the browser and expect a page back, but every packet on the way is routed by NUMBER - the IP address of the destination. Somewhere between your fingertips and the first router, the name must become a number, and the service that performs the conversion is the Domain Name System. The conversion itself has a name worth defining, because examinations ask for it in exactly these words.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — DNS and domain name resolution', text: '**The DNS** (Domain Name System) is said to be the Internet\'s distributed system for converting domain names into IP addresses, and **domain name resolution** is said to be the act of that conversion: given a typed name, find the IP address the routers need. Symbolically: resolution is a lookup, name in, number out, performed by a ladder of servers that share the work.' },
    { kind: 'figure', caption: 'The DNS ladder: eight numbered steps between two browser chips. The browser asks its recursive resolver (1); the resolver asks a root server, keeper of the top of the tree (2); the root answers with the .com TLD server\'s address (3); the resolver asks the TLD (4); the TLD answers with the authoritative server\'s address (5); the resolver asks the authoritative server (6); it answers with the IP address (7); the resolver returns the IP and the browser sends HTTP to that address (8). Four server kinds do the work, and DNS rides on port 53.', svg: cf62DnsSvg() },
    { kind: 'algorithm', title: 'How a name becomes a number: the eight-step resolution', lines: [
      { code: 'browser types a name -> asks the recursive resolver', note: 'the browser has one trusted librarian and asks that one, not the whole library.' },
      { code: 'resolver -> ROOT server: where does .com live?', note: 'the root keeps the top of the tree, the nameless level written just ".".' },
      { code: 'root -> resolver: ask the .com TLD, here is its address', note: 'the root does not know the answer, only who might - it delegates downward.' },
      { code: 'resolver -> TLD server: where does this name live?', note: 'the TLD server owns one top-level family, .com or its kin.' },
      { code: 'TLD -> resolver: ask the authoritative server, here it is', note: 'again a delegation, one rack closer to the book.' },
      { code: 'resolver -> authoritative server: give me the address', note: 'the authoritative server OWNS the name and keeps its records.' },
      { code: 'authoritative -> resolver: the IP address', note: 'at last the answer itself, not a referral.' },
      { code: 'resolver -> browser: the IP address; HTTP goes out', note: 'the browser now sends the page request to the number it was given.' },
    ], note: 'Eight steps, four server kinds, and DNS traffic rides on port 53 throughout.' },
    { kind: 'para', text: 'Four kinds of server share the ladder, and the library analogy - our retelling of the classic explanation - keeps them apart. The RECURSIVE RESOLVER is the librarian: you ask it once and it does the running about. The ROOT server is the index: it does not hold the book, it tells you which rack to try. The TLD server is the rack: it holds everything under one top-level family such as .com and points within it. The AUTHORITATIVE server is the book: it holds the actual record of the name and gives the final answer. Delegation all the way down, and answers cached on the way back so the next visitor climbs a shorter ladder.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the recursive resolver - the librarian, asked first and doing the legwork;',
      '(ii) the root server - the index, owning the top of the tree, written ".";',
      '(iii) the TLD server - the rack, owning one family such as .com;',
      '(iv) the authoritative server - the book, owning the name and giving the answer.',
    ] },
    { kind: 'para', text: 'How long does all this take? The honest answer is that the full eight-step walk is the WORST case, run the first time anyone near you asks for that name. Every server on the way back - the resolver above all - remembers the answers it fetches, so the second lookup for the same name starts from a memory and skips most of the ladder. That remembering is called caching, and it is why the name system scales: the thirteen roots and the racks beneath them answer mostly FIRST questions, while the repeats are served close to home. The engineering of cache lifetimes is another book\'s ground; the census of the ladder is this one\'s.' },
    { kind: 'para', text: 'How many roots hold up this tree? Thirteen, by name and by letter: the root name servers are named A to M - thirteen letters, from A through M inclusive - and they sit ten in the United States, one in London, one in Stockholm and one in Japan: 10 + 1 + 1 + 1 = 13. And all of DNS\'s conversation rides on a single well-known port: port 53. These two facts, thirteen and fifty-three, are examination favourites, and both are worth carrying cold.' },
    { kind: 'example', title: 'Illustration 7. The root census run: count the root name servers from their letters and their seats.', steps: [
      'Take the letters as named: A, B, C, D, E, F, G, H, I, J, K, L, M - the alphabet\'s first thirteen.',
      'So, count them: M is the 13th letter (M - A + 1 = 13), and thirteen is the census.',
      'Now, place the seats: 10 in the United States, 1 in London, 1 in Stockholm, 1 in Japan.',
      'Check the addition: 10 + 1 + 1 + 1 = 13, which matches the letter count exactly.',
      'Hence the root name servers are 13 in number - named A to M - seated 10 + 1 + 1 + 1 across four countries.',
    ], answer: 'Hence 13 root name servers, A to M: 10 US + 1 London + 1 Stockholm + 1 Japan = 13' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the death of HOSTS.TXT, November 1983', text: 'Before DNS, the whole Internet kept ONE table - a file named HOSTS.TXT - listing every host and its address; every machine fetched the whole file from one single place. It grew with every new host, it went stale with every change, and one wrong copy meant one wrong route: the early-1980s bottleneck. In November 1983 Paul Mockapetris at USC\'s Information Sciences Institute wrote the answer, filed as RFC 882 and 883: a distributed tree in which every operator keeps their own names and the lookup walks down from the root. The tree grew into the DNS of this lesson; the single table is now a museum piece.' },
    { kind: 'callout', tone: 'insight', title: 'Why names for humans, numbers for machines', text: 'Names are memorable and meaningful but long and arbitrary; numbers are compact and routable but impossible to remember. DNS lets each species keep its own currency: you memorise the name, the resolver fetches the number, the routers read only the number. Never say the Internet "understands" names - it does not; it hires a librarian.' },
    { kind: 'terms', items: [
      { term: 'DNS', def: 'the Domain Name System: the Internet\'s distributed phonebook, converting typed names into IP addresses by an eight-step lookup across four server kinds, riding on port 53.' },
      { term: 'root server', def: 'one of the 13 root name servers, A to M - 10 in the US, 1 in London, 1 in Stockholm, 1 in Japan - keeping the top of the DNS tree and delegating downward.' },
    ] },

    { kind: 'heading', text: 'Routers and Hops: The Price of Distance' },
    { kind: 'para', text: 'Between the addresses and the names stands the machine that actually moves the traffic: the router. Its duty list is three verbs - it RECEIVES a packet on one interface, ANALYSES the destination address written on it, and TRANSMITS the packet out through the interface that leads toward that address, choosing the next network segment packet by packet. No single router knows the whole road; each knows only its own map of next steps, and the journey is the sum of their local decisions.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — hop', text: '**A hop** is said to be one passage of a packet from one network segment to the next - one router\'s worth of travel. Symbolically: a journey of $h$ hops crosses $h$ boundaries, and each boundary costs its share of delay, so the delays add.' },
    { kind: 'equation', latex: 'D_{\\text{one-way}} = h \\times d = 4 \\times 25\\ \\text{ms} = 100\\ \\text{ms} \\tag{3}', note: 'The hop law: $h$ hops at $d$ milliseconds each accumulate $h \\times d$ milliseconds one-way. The pinned case - 4 hops at 25 ms - makes 100 ms, and the reply walks back the same way.' },
    { kind: 'example', title: 'Illustration 8. The hop arithmetic run: 4 hops at 25 ms each, one-way and back.', steps: [
      'Take the pinned numbers: 4 hops, 25 ms a hop.',
      'So, the one-way walk: 4 x 25 ms = 100 ms.',
      'Now, the reply must climb back: the round trip is 2 x 100 ms = 200 ms.',
      'Check the variants to feel the linearity: 3 hops would give 3 x 25 = 75 ms, and 6 hops would give 6 x 25 = 150 ms.',
      'Hence 4 hops at 25 ms each cost 100 ms one-way and 200 ms round trip - more hops, more accumulated delay.',
    ], answer: 'Hence 4 x 25 ms = 100 ms one-way, and the round trip doubles it to 200 ms' },
    { kind: 'para', text: 'Now re-read the tier ladder with this law in view. Your request to a neighbour\'s machine on the same LAN crosses no router at all - its hop count is zero. Your request to a server across the city crosses a couple of hops; across the country, a few more; and each rung of the ladder from section 2 is, physically, one or more hops with a router at every boundary. Distance on the Internet is not kilometres but HOPS, and the felt speed of a page is the hop count multiplied out. The full theory of how routers choose paths - the routing algorithms, and what happens when many packets want the same wire at once - belongs to our doorstep book \'Computer Networks\', which owns switching theory and congestion control; this lesson keeps only the counting.' },
    { kind: 'terms', items: [
      { term: 'router', def: 'the device that receives each packet, analyses its destination address and transmits it toward the next network segment - choosing the next network packet by packet.' },
      { term: 'hop', def: 'one passage of a packet from one network segment to the next; hops accumulate delay, so 4 hops at 25 ms make 100 ms one-way.' },
    ] },

    { kind: 'heading', text: 'Client and Server: The Two Roles' },
    { kind: 'para', text: 'One honest paragraph closes the machinery, because the deep model is another book\'s ground. On any given conversation, one machine makes the request and the other keeps the answer: the request-maker is the CLIENT, the answer-keeper is the SERVER. Your browser is a client; the site\'s machine is a server. The roles are roles and not species - the same machine can serve a page to its neighbour and request one from a third - but at any moment, in any one exchange, the pair is fixed: one asks, one answers, over the TCP connection the treaty set up. That is all this course needs; the machinery of server farms, of load and of protocol state, waits in \'Computer Networks\', and the question of who might attack either end waits in \'Cybersecurity\', which owns the attack surface.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — client and server', text: 'A **client** is said to be the program that initiates a request in a network conversation, and a **server** the program that awaits requests and answers them. Symbolically: client asks, server answers; the names describe the exchange, not the hardware.' },
    { kind: 'terms', items: [
      { term: 'client', def: 'the request-maker of a network conversation - your browser when it asks for a page.' },
      { term: 'server', def: 'the answer-keeper of a network conversation - the site\'s machine that holds the page and responds.' },
    ] },

    { kind: 'heading', text: 'The Patience Ledger: What 9.6 kbit/s Meant' },
    { kind: 'para', text: 'Numbers deserve respect when they were once somebody\'s Tuesday. When VSNL\'s GIAS opened on 15 August 1995, the public gateway ran at 9.6 kbit/s - 9,600 bits every second, which is 1,200 bytes, about one page of plain text. Under the tariff, 5,200 rupees bought 250 hours, so every hour online cost 5,200/250 = 20.80 rupees. Run both computations on a real file and the era introduces itself: a 60 MB download was not an inconvenience but an overnight commitment.' },
    { kind: 'derivation', title: 'The patience ledger of the 9.6 kbit/s era', statement: 'At the 1995 GIAS speed of 9.6 kbit/s, compute how long a 60 MB file took to download; then price an hour online under the 5,200-rupee, 250-hour tariff.', steps: [
      { label: 'Convert the file to bits', formula: '60\\,\\text{MB} \\times 8 = 480\\,\\text{Mbit}', explanation: 'there are 8 bits to a byte, so sixty megabytes of file become 480 megabits of traffic.' },
      { label: 'Divide by the rate', formula: 'T = \\frac{480 \\times 10^{6}}{9{,}600} = 50{,}000\\ \\text{s}', explanation: 'at 9,600 bits a second, the transfer time is the traffic divided by the rate - fifty thousand seconds exactly.' },
      { label: 'Convert to hours', formula: '\\frac{50{,}000}{3{,}600} = 13.9\\ \\text{h}', explanation: 'three thousand six hundred seconds make an hour, so the download ran just under fourteen hours - overnight, and then some.' },
      { label: 'Price the tariff', formula: '\\frac{5200}{250} = 20.80', explanation: 'the fee divided by the hours gives the hourly price: 20.80 rupees for every hour of that patience.' },
    ], result: 'Hence the file took $50{,}000$ seconds - $13.9$ hours - and an hour online cost $20.80$ rupees.' },
    { kind: 'equation', latex: 'T = \\frac{S \\times 8}{r} = \\frac{480\\,\\text{Mbit}}{9.6\\,\\text{kbit/s}} = 50{,}000\\ \\text{s} \\tag{4}', note: 'The patience law: a file of $S$ bytes at rate $r$ bits per second takes $8S/r$ seconds. The byte-to-bit conversion is where every careless answer fails - multiply by 8 before dividing.' },
    { kind: 'equation', latex: '\\text{price per hour} = \\frac{5200}{250} = 20.80\\ \\text{rupees} \\tag{5}', note: 'The tariff law: total fee over total hours. The GIAS ledger closes exactly - 250 x 20.80 = 5,200 rupees.' },
    { kind: 'example', title: 'Illustration 9. The 60 MB run at 9.6 kbit/s: hours, minutes and respect.', steps: [
      'Take the file and the rate: 60 MB at 9.6 kbit/s, and 8 bits to the byte.',
      'So, convert: 60 x 8 = 480 Mbit of traffic, that is 480,000,000 bits.',
      'Now, divide: 480,000,000 / 9,600 = 50,000 s exactly - a clean number, which is why this case is pinned.',
      'Convert to hours: 50,000 / 3,600 = 13.9 hours, or 50,000 / 60 = 833.3 minutes.',
      'Hence 60 MB took 50,000 s - 13.9 hours - at the 1995 gateway speed: the patience our connection era demanded.',
    ], answer: 'Hence 60 MB = 480 Mbit at 9,600 bps = 50,000 s = 13.9 hours' },
    { kind: 'example', title: 'Illustration 10. The tariff run: price an hour, then a hundred hours, under the GIAS ledger.', steps: [
      'Take the tariff as pinned: 5,200 rupees for 250 hours.',
      'So, the hourly price: 5,200 / 250 = 20.80 rupees an hour.',
      'Check the ledger closes: 250 x 20.80 = 5,200 rupees, exactly the posted fee.',
      'Now, price a hundred hours: 100 x 20.80 = 2,080 rupees - in 1995 money.',
      'Hence an hour online cost 20.80 rupees, and a hundred hours cost 2,080 rupees under the 5,200-rupee, 250-hour tariff.',
    ], answer: 'Hence 5,200 / 250 = 20.80 rupees an hour, and 100 hours cost 100 x 20.80 = 2,080 rupees' },
    { kind: 'callout', tone: 'insight', title: 'Why this ledger matters', text: 'Not as nostalgia - as calibration. When a modern page loads in half a second, it is riding trunks that grew from NSFNET\'s 56 kbps to 45 Mbps and far beyond, and a last mile unrecognisable beside 9.6 kbit/s. The arithmetic of section 10 is the arithmetic of gratitude: transfer time is size over rate, and every era of the Internet is one division problem.' },

    { kind: 'heading', text: 'The Lesson, Seen Whole' },
    { kind: 'para', text: 'Climb down the ladder once more and take the whole view. The Internet defined as an agreement - a network of networks - and walked as the six-rung tier ladder from your device to the backbone. TCP/IP met as the treaty every member speaks, born honestly: the \'lo\' message of 29 October 1969, the flag day of 1 January 1983, DNS in November 1983, ERNET in 1986, the Web proposed in March 1989, first seen on 6 August 1991 at info.cern.ch, freed in April 1993, and India\'s public gate opened by VSNL on 15 August 1995 - with the gaps 14, 3, 9, 26, 2, 2 and 2 years all closed by addition. The addresses met in three widths - IPv4\'s 32 bits and census of 4,294,967,296, just under 4.3 billion and not enough; IPv6\'s 128 bits and $2^{128}$; the MAC\'s 48 bits split 24 + 24. DNS walked its eight steps among four server kinds, thirteen roots A to M, one port 53. Routers received, analysed and transmitted; four hops at 25 ms cost 100 ms one-way. Client asked, server answered. And the patience ledger closed the lesson: 60 MB at 9.6 kbit/s was 50,000 s - 13.9 hours - at 20.80 rupees the hour.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — how this lesson is asked', text: 'The census of this lesson is examination staple food, asked here in our own exam-style wording - never quoted from any real paper. Banking and SSC computer-awareness papers ask the short truths: what the Internet is (a network of networks); what an ISP is; what TCP/IP stands for; the IPv4 length (32 bits, four octets); the IPv6 length (128 bits); what DNS does and its port (53); what a router does; and the one-date questions - ARPANET 1969, TCP/IP from 1 January 1983, the Web from 1989-91. UGC NET\'s syllabus unit on the world wide web names URL and domain name service directly: expect a DNS resolution walk and a name-versus-number question. CUET-style papers love the classification ask - difference between Internet and Web - which this lesson arms you for in one line: the Web is a service riding on the Internet. Cambridge 9618 and A-level-style asks go further on IP addresses and DNS: compute the address census, explain resolution step by step, and justify why IPv6 was needed - drill Illustrations 4 and 5 until the powers of two fall out by themselves. The gap arithmetic (14, 3, 9, 26, 2, 2, 2) and the patience ledger (50,000 s, 13.9 hours, 20.80 rupees) are our own drill, in the spirit of the numerical asks those boards favour.' },
    { kind: 'formula', name: 'The IPv4 census', latex: '2^{32} = 4{,}294{,}967{,}296', note: 'four octets of 8 bits: just under 4.3 billion addresses - not enough, and short of 4.3 billion by 5,032,704.' },
    { kind: 'formula', name: 'The IPv6 census', latex: '2^{128} \\approx 3.4 \\times 10^{38}', note: 'eight hex groups of 16 bits: 2^96 ~ 7.9 x 10^28 times the IPv4 space.' },
    { kind: 'formula', name: 'One-way hop delay', latex: 'D = h \\times d', note: 'h hops at d ms each: 4 hops x 25 ms = 100 ms one-way, and the round trip is 200 ms.' },
    { kind: 'formula', name: 'Transfer time', latex: 'T = \\frac{8S}{r}', note: 'S bytes at r bits per second: 60 MB at 9,600 bps = 50,000 s = 13.9 hours.' },
    { kind: 'formula', name: 'Price per hour', latex: '\\frac{5200}{250} = 20.80', note: 'the VSNL GIAS tariff of 1995: rupees per hour online; 100 hours cost 2,080 rupees.' },
    { kind: 'para', text: 'The checkpoint quiz and the graded drill are yours. Every number they test was pinned green by the engine before this prose was written - the subtractions, the powers, the divisions and the census - and the doorstep books stand behind the doors this lesson only knocked on: \'Computer Networks\' for the stack, the algorithms and the congestion, \'Cybersecurity\' for the attack surface, and lesson 6.1 \'The Network Idea\' for the packet and the bandwidth that started the climb.' },

    { kind: 'quiz', title: 'Checkpoint quiz', items: [
      {
        q: 'The Internet is best described as…',
        options: [
          'one very large computer that stores every website in the world',
          'a network of networks - thousands of LANs and ISPs agreeing to speak one common protocol family',
          'a single cable that runs around the whole planet',
          'a company that sells access to websites',
        ],
        answer: 1,
        explain: 'Option B is the definition this lesson carries: the Internet is the worldwide network of networks, an agreement among millions of independent networks to exchange traffic by speaking the one common protocol family, TCP/IP. Option A fails because no single computer stores the Web - the Internet is a collection of independent member networks, not one machine; sites live on their owners\' servers. Option C fails because the Internet owns no cable of its own: every member owns its own lines and merely agrees to carry one another\'s packets across them. Option D fails because the Internet is not a company at all - ISPs are companies that SELL access to it, but the thing itself is the agreement, owned by nobody.',
      },
      {
        q: 'How many bits does an IPv4 address carry?',
        options: [
          '8 bits',
          '16 bits',
          '24 bits',
          '48 bits',
          '32 bits',
        ],
        answer: 4,
        explain: 'Option E is the IPv4 width: four dot-separated octets of 8 bits each give 4 x 8 = 32 bits, a census of $2^{32}$ = 4,294,967,296 addresses - just under 4.3 billion. Option A fails because 8 bits is ONE octet, one of the four fields, running 0 to 255 - not the whole address. Option B fails because 16 bits would give only 65,536 addresses, far short of the four-billion-plus IPv4 census. Option C fails because 24 bits is half a MAC address - the maker\'s OUI or the serial - an address from a different scheme entirely. Option D fails because 48 bits is the MAC address width, the burnt-in hardware identifier, not the routable IP address.',
      },
      {
        q: 'A MAC address is how long, and how is it built?',
        options: [
          '32 bits, written as four dotted octets',
          '64 bits, written as eight hex groups',
          '48 bits - a 24-bit maker code plus a 24-bit serial',
          '128 bits, written as colon-separated hex groups',
        ],
        answer: 2,
        explain: 'Option C is the MAC anatomy: 48 bits split as 24 + 24, the OUI (the maker\'s code) followed by the serial, written as 12 hex digits in six pairs and burnt in at manufacture. Option A fails because 32 bits in dotted octets describes IPv4 - the routable address assigned per connection, not the hardware identifier. Option B fails because no standard address of this lesson is 64 bits; the number mixes IPv4\'s octets with IPv6\'s group count. Option D fails because 128 bits in hex groups is IPv6 - the wide successor to IPv4, again a routable address that changes with the network, unlike the MAC that travels with the device.',
      },
      {
        q: 'In November 1983, DNS replaced…',
        options: [
          'the single HOSTS.TXT table that named every host',
          'the TCP/IP protocol family',
          'the root name servers',
          'the modem',
        ],
        answer: 0,
        explain: 'Option A is the history: before DNS, one file - HOSTS.TXT - listed every host and its address, fetched from one single place; it could not scale, and Mockapetris\'s DNS (USC ISI, RFC 882/883) replaced it with a distributed tree. Option B fails because TCP/IP was BORN in that same era - the flag day that imposed it was 1 January 1983, and DNS runs ON TOP of the treaty rather than replacing it. Option C fails because the 13 root name servers A to M are PART of DNS, the top of its tree - they did not exist as a separate system to be replaced. Option D fails because the modem is hardware at the second rung of the tier ladder, translating between your home wiring and the ISP\'s line - no software release retires it.',
      },
      {
        q: 'A request crosses 4 hops at 25 ms per hop. The one-way delay is…',
        options: [
          '25 ms',
          '50 ms',
          '75 ms',
          '100 ms',
        ],
        answer: 3,
        explain: 'Option D is the hop law: delays add, so 4 hops x 25 ms = 100 ms one-way, and the reply walks back for a 200 ms round trip. Option A fails because 25 ms is the cost of ONE hop - a single passage between two network segments - and four of them accumulate. Option B fails because 50 ms would be only 2 hops\' worth (2 x 25), half the journey described. Option C fails because 75 ms is the 3-hop case (3 x 25) - one boundary short of the four the question sets.',
      },
    ] },

    { kind: 'exercises', title: 'Graded exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'Name the six rungs of the tier ladder in order, and state how many handoffs separate your device from the backbone.',
            answer: 'Hence the rungs are device, modem, local ISP, regional network, national network and backbone - with 5 handoffs between neighbours',
            solution: [
              'Take the ladder from your own end, where every journey begins.',
              'So, rung one is your device; rung two the modem, where home wiring meets the ISP line.',
              'Now, rung three the local ISP; rung four the regional network; rung five the national network.',
              'At last rung six: the backbone, the country-scale trunks every network meets.',
              'Count the passages: 6 rungs leave 6 - 1 = 5 handoffs between neighbours.',
              'Hence the rungs are device, modem, local ISP, regional network, national network and backbone - with 5 handoffs between neighbours.',
            ]
          },
          {
            q: 'Define an ISP in one line, and say which rung of the tier ladder it owns.',
            answer: 'Hence an ISP is any organisation that provides access to the Internet - the owner of the third rung, the local access network you pay',
            solution: [
              'Take the definition exactly: an ISP is any organisation that provides access to the Internet.',
              'So, it links your device to its own network and, through the agreements of the treaty, to every other member.',
              'Now, place it on the ladder: the ISP owns the local access rung - the third of six, and the first rung you do not own yourself.',
              'Hence an ISP is any organisation that provides access to the Internet - the owner of the third rung, the local access network you pay.',
            ]
          },
          {
            q: 'The first ARPANET message was meant to be the word login. Say exactly what was sent, how many letters that was, and how many letters were lost to the crash.',
            answer: "Hence 'lo' was sent - 2 letters - and 5 - 2 = 3 letters of 'login' were lost to the crash",
            solution: [
              'Take the pinned story: at 10:30 pm PST on 29 October 1969, UCLA tried to send \'login\' to SRI.',
              'So, the system crashed after two letters, and those two letters - \'lo\' - were the first characters ever transmitted.',
              'Now, do the arithmetic: \'login\' has 5 letters, 2 arrived, so 5 - 2 = 3 letters were lost to the crash.',
              "Hence 'lo' was sent - 2 letters - and 5 - 2 = 3 letters of 'login' were lost to the crash.",
            ]
          },
          {
            q: 'State the three format facts: how many bits in an IPv4 address, how many groups in an IPv6 address, and how many bits in a MAC address.',
            answer: 'Hence IPv4 carries 32 bits in four octets, IPv6 carries 8 groups of 16 bits = 128 bits, and a MAC address carries 48 bits',
            solution: [
              'Take the three widths one at a time, as the definitions fix them.',
              'So, IPv4: four dot-separated octets of 8 bits give 4 x 8 = 32 bits.',
              'Now, IPv6: eight colon-separated hex groups of 16 bits give 8 x 16 = 128 bits.',
              'And the MAC address: 48 bits, written as 12 hex digits in six pairs.',
              'Hence IPv4 carries 32 bits in four octets, IPv6 carries 8 groups of 16 bits = 128 bits, and a MAC address carries 48 bits.',
            ]
          },
          {
            q: 'Put the four DNS server kinds in the order a lookup visits them, and give the library analogy for each.',
            answer: 'Hence the order is recursive resolver (the librarian), root server (the index), TLD server (the rack), authoritative server (the book)',
            solution: [
              'Take the eight-step ladder and keep only the servers the resolver consults.',
              'So, first comes the recursive resolver itself - the librarian, asked once, doing the running about.',
              'Now, the resolver asks the root server - the index, owning the top of the tree, written ".".',
              'Then the TLD server - the rack, owning one family such as .com.',
              'At last the authoritative server - the book, owning the name and giving the final answer.',
              'Hence the order is recursive resolver (the librarian), root server (the index), TLD server (the rack), authoritative server (the book).',
            ],
            figures: [{ caption: 'The resolution order strip: the four DNS server kinds in the order a lookup visits them, each tagged with its library role.', svg: cf62SolOrderSvg() }],
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Compute the seven pinned gaps of the Internet story: 1969 to 1983, 1983 to 1986, 1986 to 1995, 1969 to 1995, 1989 to 1991, 1991 to 1993, and 1993 to 1995 - then close both chains.',
            answer: 'Hence the gaps are 14, 3, 9, 26, 2, 2 and 2 years, with 14 + 3 + 9 = 26 and 2 + 2 + 2 = 6 closing both chains',
            solution: [
              'Take the infrastructure years first: 1969, 1983, 1986, 1995.',
              'So, 1983 - 1969 = 14 years (ARPANET to the flag day); 1986 - 1983 = 3 years (flag day to ERNET); 1995 - 1986 = 9 years (ERNET to India public); 1995 - 1969 = 26 years (the whole span).',
              'Check the first chain: 14 + 3 + 9 = 26, which matches the whole-span subtraction.',
              'Now, the web years: 1989, 1991, 1993, 1995.',
              'So, 1991 - 1989 = 2; 1993 - 1991 = 2; 1995 - 1993 = 2 - and 2 + 2 + 2 = 6 = 1995 - 1989 closes the second chain.',
              'Hence the gaps are 14, 3, 9, 26, 2, 2 and 2 years, with 14 + 3 + 9 = 26 and 2 + 2 + 2 = 6 closing both chains.',
            ],
            figures: [{ caption: 'The gap solve board: all seven subtractions laid out with their meanings, and both chain-checks printed beneath.', svg: cf62SolGapSvg() }],
          },
          {
            q: 'A MAC address is 48 bits split as 24 + 24. Say what each half holds, why the whole is 12 hex digits, and how many values each half can take.',
            answer: 'Hence the first 24 bits are the maker OUI and the last 24 the serial; 48/4 = 12 hex digits; and 2^24 = 16,777,216 values per half',
            solution: [
              'Take the split from the definition: 48 bits = 24 + 24.',
              'So, the first 24 bits are the OUI - the maker\'s code; the last 24 bits are the serial the maker assigns.',
              'Now, the hex count: one hex digit is exactly 4 bits, so 48/4 = 12 hex digits, written as six pairs.',
              'Size each half: 24 bits give 2^24 = 16,777,216 possible values - as many maker codes, and as many serials under each maker.',
              'Hence the first 24 bits are the maker OUI and the last 24 the serial; 48/4 = 12 hex digits; and 2^24 = 16,777,216 values per half.',
            ]
          },
          {
            q: 'The root name servers are named A to M. Compute how many that is, and give the honest census of where the thirteen sit.',
            answer: 'Hence A to M is 13 root name servers: 10 in the US, 1 in London, 1 in Stockholm, 1 in Japan - 10 + 1 + 1 + 1 = 13',
            solution: [
              'Take the letters as given: A, B, C, through M.',
              'So, count them: M is the 13th letter of the alphabet (M - A + 1 = 13), and that is the census.',
              'Now, place the seats: ten in the United States, one in London, one in Stockholm, one in Japan.',
              'Check the addition: 10 + 1 + 1 + 1 = 13, matching the letter count exactly.',
              'Hence A to M is 13 root name servers: 10 in the US, 1 in London, 1 in Stockholm, 1 in Japan - 10 + 1 + 1 + 1 = 13.',
            ]
          },
          {
            q: 'Sort these twelve identifiers into IPv4, IPv6 and MAC addresses, and check the census: 192.168.0.178, 2001:CDBA:0000:0000:0000:0000:3257:9652, 00:1A:2B:3C:4D:5E, 10.0.5.2, FE80:0000:0000:0000:0ABC:0000:0025:00FF, A4-5E-60-C7-8D-01, 172.16.4.99, 2001:0DB8:0000:0000:0000:0000:0000:0001, 3C:5A:B4:77:02:9F, 8.8.8.8, 2607:0000:0000:0000:0000:0000:0003:0EA1, D2-41-B6-0E-53-A8.',
            answer: 'Hence the 4 dotted quads are IPv4, the 4 eight-group hex strings are IPv6 and the 4 paired strings are MAC - 4 + 4 + 4 = 12',
            solution: [
              'Take the sort test: count the separators and check the digits.',
              'So, the dotted quads - 192.168.0.178, 10.0.5.2, 172.16.4.99, 8.8.8.8 - have three dots and four octets each: IPv4.',
              'Now, the eight-group hex strings - 2001:CDBA:...:9652, FE80:...:00FF, 2001:0DB8:...:0001, 2607:...:0EA1 - have seven colons: IPv6.',
              'And the paired hex identifiers - 00:1A:2B:3C:4D:5E, A4-5E-60-C7-8D-01, 3C:5A:B4:77:02:9F, D2-41-B6-0E-53-A8 - are 12 hex digits in six pairs: MAC.',
              'Check the census: 4 + 4 + 4 = 12, as set.',
              'Hence the 4 dotted quads are IPv4, the 4 eight-group hex strings are IPv6 and the 4 paired strings are MAC - 4 + 4 + 4 = 12.',
            ],
            figures: [{ caption: 'Three formats at a glance: the separator test that sorts any identifier into IPv4, IPv6 or MAC.', svg: cf62SolFormatSvg() }],
          },
          {
            q: 'At 25 ms a hop, compute the one-way delay for 3, 4 and 6 hops, and the round-trip time for the 4-hop case.',
            answer: 'Hence 75 ms, 100 ms and 150 ms one-way for 3, 4 and 6 hops, and the 4-hop round trip is 2 x 100 = 200 ms',
            solution: [
              'Take the law: one-way delay = hops x per-hop delay, with 25 ms a hop.',
              'So, 3 hops give 3 x 25 = 75 ms one-way.',
              'Now, the pinned case: 4 hops give 4 x 25 = 100 ms one-way.',
              'And 6 hops give 6 x 25 = 150 ms one-way - the delay accumulates linearly.',
              'Check the round trip for the 4-hop case: the reply walks back too, so 2 x 100 = 200 ms.',
              'Hence 75 ms, 100 ms and 150 ms one-way for 3, 4 and 6 hops, and the 4-hop round trip is 2 x 100 = 200 ms.',
            ],
            figures: [{ caption: 'The hop-count latency board: 3, 4 and 6 hops at 25 ms, and the doubled round trip - with a router chain drawn for each row.', svg: cf62SolHopSvg() }],
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'EXAM-STYLE. Compute the IPv4 address space, the IPv6 address space, and the ratio of the second to the first; state, with the arithmetic, why 4,294,967,296 addresses were not enough.',
            answer: 'Hence 2^32 = 4,294,967,296, just under 4.3 billion; 2^128 ~ 3.4 x 10^38; the ratio is 2^96 ~ 7.9 x 10^28 - and the IPv4 census fell short of the world\'s devices',
            solution: [
              'Take the two widths: 32 bits for IPv4, 128 for IPv6.',
              'So, the IPv4 census: 2^32 = 4,294,967,296 - just under 4.3 billion, short of that round figure by 5,032,704.',
              'Now, the IPv6 census: 2^128, which is about 3.4 x 10^38 - a thirty-nine-digit count.',
              'Take the ratio by subtracting exponents: 2^128 / 2^32 = 2^96, and 2^96 ~ 7.9 x 10^28 IPv6 addresses per IPv4 one.',
              'So, why IPv4 failed: the world\'s people - each now owning several connected devices - outnumber a 4.3-billion census several times over; the shortage was arithmetic, not management.',
              'Hence 2^32 = 4,294,967,296, just under 4.3 billion; 2^128 ~ 3.4 x 10^38; the ratio is 2^96 ~ 7.9 x 10^28 - and the IPv4 census fell short of the world\'s devices.',
            ],
            figures: [{ caption: 'The address-space comparison at honest scale: the IPv4 bar against the IPv6 bar, with the 2^96 ratio spelled out.', svg: cf62SolSpaceSvg() }],
          },
          {
            q: 'EXAM-STYLE. The patience ledger of 1995: at the GIAS speed of 9.6 kbit/s, how long did a 60 MB file take to download? And what did an hour online cost under the 5,200-rupee, 250-hour tariff?',
            answer: 'Hence the file took 480 Mbit / 9,600 bps = 50,000 s = 13.9 hours, and an hour online cost 5,200 / 250 = 20.80 rupees',
            solution: [
              'Take the pinned numbers: 60 MB, 9.6 kbit/s = 9,600 bits a second, 8 bits to the byte.',
              'So, convert the file: 60 x 8 = 480 Mbit, that is 480,000,000 bits of traffic.',
              'Now, divide by the rate: 480,000,000 / 9,600 = 50,000 s exactly.',
              'Convert to hours: 50,000 / 3,600 = 13.9 hours - an overnight commitment.',
              'Price the tariff: 5,200 / 250 = 20.80 rupees an hour, and check it closes - 250 x 20.80 = 5,200.',
              'Hence the file took 480 Mbit / 9,600 bps = 50,000 s = 13.9 hours, and an hour online cost 5,200 / 250 = 20.80 rupees.',
            ],
            figures: [{ caption: 'The patience ledger: the chip chain from 60 MB to 13.9 hours, with the tariff lines and the engine check beneath.', svg: cf62SolLedgerSvg() }],
          },
          {
            q: 'EXAM-STYLE. Why did the single HOSTS.TXT table have to die in November 1983, and what replaced it? Name the replacement\'s four server kinds, the port it rides on, and the census of its root tier.',
            answer: 'Hence HOSTS.TXT - one table for every host, fetched from one place - could not scale; DNS replaced it with a tree of recursive resolvers, 13 root letter-groups A-M, TLD servers and authoritative servers, riding on port 53',
            solution: [
              'Take the old world: ONE text file naming every host, fetched from one single place by every machine.',
              'So, it grew with every new host, went stale with every change, and one wrong copy meant one wrong route - the early-1980s bottleneck.',
              'Now, the replacement: DNS, proposed by Mockapetris at USC ISI in November 1983, filed as RFC 882/883 - a distributed tree instead of a central table.',
              'Name the four server kinds it walks: the recursive resolver, the root server, the TLD server and the authoritative server.',
              'Add the census and the port: 13 root name servers named A to M (10 US + 1 London + 1 Stockholm + 1 Japan), all riding on port 53.',
              'Hence HOSTS.TXT - one table for every host, fetched from one place - could not scale; DNS replaced it with a tree of recursive resolvers, 13 root letter-groups A-M, TLD servers and authoritative servers, riding on port 53.',
            ],
            figures: [{ caption: 'Before and after November 1983: the single HOSTS.TXT world against the DNS tree that replaced it.', svg: cf62SolHostsSvg() }],
          },
          {
            q: 'The NSFNET backbone grew from 6 nodes linked at 56 kbps to 21 nodes linked at 45 Mbps. Compute the nodes added and the speed ratio, and say what the growth bought.',
            answer: 'Hence 21 - 6 = 15 nodes were added, and the trunks sped up by 45,000/56, about 803.6 times - more members, and far more room for their traffic',
            solution: [
              'Take the two censuses: 6 nodes at 56 kbps, then 21 nodes at 45 Mbps.',
              'So, the nodes added: 21 - 6 = 15 - more than triple the count, at 21/6 = 3.5x.',
              'Now, the speed: 45 Mbps = 45,000 kbps, so the ratio is 45,000/56, about 803.6 times the old trunk speed.',
              'Read what it bought: more members could join the backbone, and each member\'s traffic had roughly eight hundred times the room.',
              'Hence 21 - 6 = 15 nodes were added, and the trunks sped up by 45,000/56, about 803.6 times - more members, and far more room for their traffic.',
            ]
          },
          {
            q: 'EXAM-STYLE. Distinguish the Internet from the Web in two lines; then put the eight dated beats in order, and compute the spans from 1969 and from 1995 to this chapter\'s year, 2026.',
            answer: 'Hence the Internet is the network of networks and the Web a service riding on it; the beats run 1969, 1983, 1983, 1986, 1989, 1991, 1993, 1995; and the spans to 2026 are 57 years from 1969 and 31 years from 1995',
            solution: [
              'Take the distinction first: the Internet is the network of networks - the treaty, the cables, the routers; the Web is one service riding on it, a system of linked pages.',
              'So, order the eight beats: 1969 (the \'lo\' message), 1983 (the flag day), 1983 again (DNS in November), 1986 (ERNET), 1989 (the Web proposed), 1991 (the first website), 1993 (the public-domain release), 1995 (India\'s public gateway).',
              'Now, the span from the first beat: 2026 - 1969 = 57 years since the two letters arrived.',
              'And the span from the last: 2026 - 1995 = 31 years since India\'s public gate opened at 9.6 kbit/s.',
              'Hence the Internet is the network of networks and the Web a service riding on it; the beats run 1969, 1983, 1983, 1986, 1989, 1991, 1993, 1995; and the spans to 2026 are 57 years from 1969 and 31 years from 1995.',
            ]
          },
        ],
      },
    ] },
  ],
}


/**
 * part-cf63.ts — CS RUN 11 seat cf63.
 *
 * Lesson 6.3 'Browsing the Web: the Citizen's Vocabulary' of Computer
 * Fundamentals chapter 6 'Connecting Computers'. The citizen's kit for
 * the Web, told honestly: the Internet as infrastructure and the Web as
 * one service riding it (MDN's line: the Internet is the backbone of
 * the Web); the browser census (Chrome, Firefox, Safari, Opera, Edge,
 * with Edge as Internet Explorer's successor of the 1995 browser-war
 * generation) and Mosaic, NCSA, 1993, the first popular graphical
 * browser; the URL dissected to 5 top-level parts with an authority of
 * 3 sub-parts and ports 80 = HTTP, 443 = HTTPS (53 = DNS from lesson
 * 6.2); HTTP as the two-message dance, stateless, with 404 as the
 * honest page-not-found answer, and the 5-beat fetch order DNS ->
 * TCP -> request -> response -> render; HTTPS as HTTP over TLS (the
 * old name SSL survives in speech); search engines against typed URLs;
 * cookies as the memory patches (Netscape, 1994, first-time against
 * returning visitors); and phishing named honestly with the examp1e
 * lookalike-domain trick. 'Full-Stack Web Development' owns building
 * pages; 'Cybersecurity' owns the full threat model.
 *
 * Every number printed here is pinned green by v-cf63.ts (the engine
 * ran GREEN before this prose was written; the pin block closes the
 * ring). All figures are self-contained computed SVGs in the house
 * palette; every geometry constant is derived, never eyeballed.
 * Study-never-reproduce: every roster, witness, figure, Illustration,
 * quiz item and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const c63 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f63 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order (x, y, size, fill,
   anchor) so the engine's clip audit can parse every label */
function cf63T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* vertical double-headed arrow (service <-> internet) */
function cf63DoubleV(x: number, y1: number, y2: number, color: string): string {
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${color}" stroke-width="2"/>`
    + `<polygon points="${x - 5},${y1 + 9} ${x + 5},${y1 + 9} ${x},${y1}" fill="${color}"/>`
    + `<polygon points="${x - 5},${y2 - 9} ${x + 5},${y2 - 9} ${x},${y2}" fill="${color}"/>`
}

/* horizontal one-way arrow */
function cf63ArrowH(x1: number, x2: number, y: number, color: string): string {
  return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="2.4"/>`
    + `<polygon points="${x2 - 8},${y - 5} ${x2 - 8},${y + 5} ${x2},${y}" fill="${color}"/>`
}

/* horizontal double-headed arrow */
function cf63DoubleH(x1: number, x2: number, y: number, color: string): string {
  return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="2.4"/>`
    + `<polygon points="${x1 + 8},${y - 5} ${x1 + 8},${y + 5} ${x1},${y}" fill="${color}"/>`
    + `<polygon points="${x2 - 8},${y - 5} ${x2 - 8},${y + 5} ${x2},${y}" fill="${color}"/>`
}

/* a downward-opening bracket under a span (the dissection brace) */
function cf63Brace(x1: number, x2: number, y: number, color: string): string {
  return `<path d="M ${x1} ${y} L ${x1} ${y + 6} L ${x2} ${y + 6} L ${x2} ${y}" fill="none" stroke="${color}" stroke-width="1.6"/>`
}

/* ================================================================== */
/* BODY FIGURE A - THE STACK, DRAWN HONESTLY: services ride the       */
/* Internet bar, which rides the physical media bar                   */
/* ================================================================== */
function cf63StackSvg(): string {
  const W = 760
  const H = 376
  const svc = [
    { name: 'THE WEB', n1: 'pages written in HTML,', n2: 'found by URLs, moved by HTTP' },
    { name: 'EMAIL', n1: 'a DIFFERENT service', n2: 'riding the same wires' },
    { name: 'OTHER SERVICES', n1: 'file transfer, streaming,', n2: 'voice and video calls' },
  ]
  const bw = 216
  const x0 = 36
  const gap = 236
  const top = 64
  const bh = 58
  const iy = 168
  const ih = 60
  const my = 252
  const mh = 54
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The stack drawn honestly, in three layers. At the top sit three application service boxes side by side: the Web (pages written in HTML, found by URLs, moved by HTTP), email (a different service riding the same wires), and other services (file transfer, streaming, voice and video calls). Each service box connects by a double-headed vertical arrow down to the Internet bar - the infrastructure of wires, routers and TCP/IP protocols from lesson 6.2. The Internet bar connects by two further double-headed arrows down to the physical media bar of fibre, copper and radio. The footer carries MDN's honest line: the Internet is the backbone of the Web, and email is a different service on the same backbone.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE STACK, DRAWN HONESTLY - SERVICES RIDE THE INTERNET', true))
  s.push(cf63T(W / 2, 44, 9.5, c63.tealInk, 'middle', 'the Web is ONE service on the infrastructure - and it is not the only one'))
  svc.forEach((v, k) => {
    const x = x0 + k * gap
    s.push(`<rect x="${x}" y="${top}" width="${bw}" height="${bh}" rx="7" fill="${c63.white}" stroke="${c63.teal}" stroke-width="2"/>`)
    s.push(cf63T(x + bw / 2, top + 20, 11, c63.ink, 'middle', v.name, true))
    s.push(cf63T(x + bw / 2, top + 37, 9.5, c63.tealInk, 'middle', v.n1))
    s.push(cf63T(x + bw / 2, top + 50, 9.5, c63.tealInk, 'middle', v.n2))
  })
  const centers = [0, 1, 2].map((k) => x0 + k * gap + bw / 2)
  centers.forEach((cx) => s.push(cf63DoubleV(cx, top + bh + 2, iy - 2, c63.conn)))
  s.push(cf63T(centers[1] + 14, 140, 9.5, c63.tealInk, 'start', 'requests go down the wire,'))
  s.push(cf63T(centers[1] + 14, 155, 9.5, c63.tealInk, 'start', 'payloads come back up'))
  s.push(`<rect x="${x0}" y="${iy}" width="${W - 2 * x0}" height="${ih}" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2.5"/>`)
  s.push(cf63T(W / 2, iy + 24, 11.5, c63.ink, 'middle', 'THE INTERNET - THE INFRASTRUCTURE', true))
  s.push(cf63T(W / 2, iy + 44, 9.5, c63.tealInk, 'middle', 'the wires, the routers and the TCP/IP protocols of lesson 6.2'))
  s.push(cf63DoubleV(200, iy + ih + 2, my - 2, c63.conn))
  s.push(cf63DoubleV(560, iy + ih + 2, my - 2, c63.conn))
  s.push(`<rect x="${x0}" y="${my}" width="${W - 2 * x0}" height="${mh}" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2.5"/>`)
  s.push(cf63T(W / 2, my + 22, 11.5, c63.ink, 'middle', 'PHYSICAL MEDIA', true))
  s.push(cf63T(W / 2, my + 40, 9.5, c63.tealInk, 'middle', 'fibre, copper and radio - the ground the whole stack stands on'))
  s.push(`<rect x="${x0}" y="318" width="${W - 2 * x0}" height="44" rx="8" fill="${c63.faint}" stroke="${c63.tealInk}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 336, 10.5, c63.tealInk, 'middle', "MDN's honest line: the Internet is the backbone of the Web", true))
  s.push(cf63T(W / 2, 352, 9.5, c63.tealInk, 'middle', 'email is a different service on the same backbone - 3 services drawn, 1 infrastructure'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE B - THE URL, DISSECTED: the pinned example with        */
/* braces for the 5 top-level parts and the authority's 3 sub-parts   */
/* ================================================================== */
function cf63UrlSvg(): string {
  const W = 760
  const H = 254
  const CH = 7.6
  const segs: { t: string; c: string }[] = [
    { t: 'https', c: c63.teal },
    { t: '://', c: c63.ink },
    { t: 'www', c: c63.accent },
    { t: '.', c: c63.ink },
    { t: 'example.co.in', c: c63.conn },
    { t: ':', c: c63.ink },
    { t: '443', c: c63.warn },
    { t: '/', c: c63.ink },
    { t: 'textbook/ch6.htm', c: c63.struct },
    { t: '?', c: c63.ink },
    { t: 'q=glassdoor', c: c63.tealInk },
    { t: '#', c: c63.ink },
    { t: 'sec2', c: c63.mid },
  ]
  const total = segs.reduce((a, g) => a + g.t.length, 0) * CH
  const pos: Record<string, number> = {}
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The pinned example URL dissected with braces. The URL reads https www example.co.in 443 textbook slash ch6.htm question q equals glassdoor hash sec2. Braces under it mark the 5 top-level parts: the scheme https, the authority www.example.co.in colon 443, the path textbook slash ch6.htm, the parameters q equals glassdoor, and the anchor sec2. A second, nested row of braces splits the authority into its 3 sub-parts: the subdomain www, the domain example.co.in, and the port 443. The census panel below counts 5 top-level parts and 3 sub-parts of the authority, notes that an untyped port is assumed (443 for https, 80 for http), and lists the port census 80 for HTTP, 443 for HTTPS and 53 for DNS from lesson 6.2.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE URL, DISSECTED - ONE ADDRESS, FIVE TOP-LEVEL PARTS', true))
  s.push(cf63T(W / 2, 44, 9.5, c63.tealInk, 'middle', 'the pinned example, split by machine, every brace under its own segment'))
  let x = (W - total) / 2
  for (const g of segs) {
    s.push(cf63T(x, 64, 13, g.c, 'start', g.t, true))
    pos[g.t] = x
    x += g.t.length * CH
  }
  /* level 1: the 5 top-level parts */
  const l1: [number, number, string, string][] = [
    [pos['https'], pos['https'] + 5 * CH, c63.teal, 'SCHEME'],
    [pos['www'], pos['443'] + 3 * CH, c63.conn, 'AUTHORITY'],
    [pos['/'], pos['textbook/ch6.htm'] + 16 * CH, c63.struct, 'PATH'],
    [pos['?'], pos['q=glassdoor'] + 11 * CH, c63.tealInk, 'PARAMETERS'],
    [pos['#'], pos['sec2'] + 4 * CH, c63.mid, 'ANCHOR'],
  ]
  for (const [a, b, col, lab] of l1) {
    s.push(cf63Brace(a, b, 74, col))
    s.push(cf63T((a + b) / 2, 94, 9.5, col, 'middle', lab, true))
  }
  /* level 2: the authority's 3 sub-parts */
  const l2: [number, number, string, string][] = [
    [pos['www'], pos['www'] + 3 * CH, c63.accent, 'SUBDOMAIN'],
    [pos['example.co.in'], pos['example.co.in'] + 13 * CH, c63.conn, 'DOMAIN'],
    [pos[':'], pos['443'] + 3 * CH, c63.warn, 'PORT'],
  ]
  for (const [a, b, col, lab] of l2) {
    s.push(cf63Brace(a, b, 104, col))
    s.push(cf63T((a + b) / 2, 124, 9.5, col, 'middle', lab, true))
  }
  s.push(`<rect x="36" y="138" width="${W - 72}" height="58" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 158, 10.5, c63.ink, 'middle', 'THE CENSUS: 5 top-level parts - scheme, authority, path, parameters, anchor', true))
  s.push(cf63T(W / 2, 175, 9.5, c63.tealInk, 'middle', 'the authority hides 3 sub-parts - subdomain, domain, port'))
  s.push(cf63T(W / 2, 190, 9.5, c63.tealInk, 'middle', 'type no port and the browser assumes it: 443 for https, 80 for http'))
  s.push(`<rect x="36" y="204" width="${W - 72}" height="40" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 221, 10, c63.ink, 'middle', 'PORTS: 80 = HTTP - 443 = HTTPS - 53 = DNS (the ladder of lesson 6.2, the first beat of every fetch)', true))
  s.push(cf63T(W / 2, 236, 9.5, c63.tealInk, 'middle', '63 characters, one address: no two working URLs name the same page'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE C - THE TWO-MESSAGE DANCE: request, response, the     */
/* 404 branch, and the same dance wrapped in TLS for HTTPS            */
/* ================================================================== */
function cf63DanceSvg(): string {
  const W = 760
  const H = 396
  const s: string[] = []
  const box = (x: number, y: number, w: number, h: number, l1: string, l2: string) => {
    s.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${c63.white}" stroke="${c63.teal}" stroke-width="2"/>`)
    s.push(cf63T(x + w / 2, y + h / 2 - 4, 10.5, c63.ink, 'middle', l1, true))
    s.push(cf63T(x + w / 2, y + h / 2 + 13, 9.5, c63.tealInk, 'middle', l2))
  }
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The two-message dance of HTTP, drawn twice. Top panel, plain HTTP on port 80: a browser box on the left and a web server box on the right; step 1 is a request arrow from the browser to the server reading GET the path; step 2 is a response arrow back carrying the page itself. A dashed branch drops from the server to a 404 Not Found panel - the honest answer when the path has no page - and a companion panel notes that HTTP is stateless, with no memory between requests. Bottom panel, HTTPS on port 443: the same browser and server boxes, but both arrows now pass through a TLS band that wraps the messages in encryption - ciphertext on the wire - and the padlock in the address bar says the wrap is on.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE TWO-MESSAGE DANCE - HTTP, THEN THE SAME DANCE WRAPPED', true))
  s.push(cf63T(W / 2, 44, 9.5, c63.tealInk, 'middle', 'one request, one response - and the honest 404 branch when the path has no page'))
  /* plain HTTP panel */
  s.push(cf63T(W / 2, 66, 11, c63.teal, 'middle', 'PLAIN HTTP - PORT 80', true))
  box(48, 76, 180, 60, 'YOUR BROWSER', 'the client - it asks')
  box(532, 76, 180, 60, 'THE WEB SERVER', 'the site - it answers')
  s.push(cf63T(380, 90, 9.5, c63.ink, 'middle', 'STEP 1 - THE REQUEST: GET /textbook/ch6.htm', true))
  s.push(cf63ArrowH(236, 524, 100, c63.conn))
  s.push(cf63ArrowH(524, 236, 130, c63.struct))
  s.push(cf63T(380, 150, 9.5, c63.ink, 'middle', 'STEP 2 - THE RESPONSE: the page itself (or an error)', true))
  s.push(`<line x1="622" y1="136" x2="622" y2="164" stroke="${c63.warn}" stroke-width="1.8" stroke-dasharray="5 4"/>`)
  s.push(`<polygon points="617,158 627,158 622,167" fill="${c63.warn}"/>`)
  s.push(`<rect x="444" y="168" width="300" height="56" rx="8" fill="${c63.white}" stroke="${c63.warn}" stroke-width="2"/>`)
  s.push(cf63T(594, 190, 10.5, c63.warn, 'middle', '404 NOT FOUND', true))
  s.push(cf63T(594, 208, 9.5, c63.tealInk, 'middle', 'the honest answer when the path has no page'))
  s.push(`<rect x="48" y="168" width="300" height="56" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(198, 190, 10.5, c63.ink, 'middle', 'STATELESS', true))
  s.push(cf63T(198, 208, 9.5, c63.tealInk, 'middle', 'no memory between requests - each one stands alone'))
  /* HTTPS panel: the whole dance enclosed in the TLS wrap */
  s.push(cf63T(W / 2, 248, 11, c63.teal, 'middle', 'HTTPS - PORT 443 - THE SAME DANCE, WRAPPED IN TLS', true))
  s.push(`<rect x="36" y="262" width="${W - 72}" height="104" rx="10" fill="${c63.faint}" stroke="${c63.tealInk}" stroke-width="2.5"/>`)
  s.push(cf63T(W / 2, 282, 10.5, c63.tealInk, 'middle', 'THE TLS WRAP - encryption; SSL is the old name that survives', true))
  box(64, 296, 170, 56, 'YOUR BROWSER', 'the same ask')
  box(526, 296, 170, 56, 'THE WEB SERVER', 'the same answer')
  s.push(cf63T(380, 322, 9.5, c63.ink, 'middle', 'STEP 1 - the request, wrapped: ciphertext on the wire', true))
  s.push(cf63ArrowH(242, 518, 332, c63.accent))
  s.push(cf63ArrowH(518, 242, 352, c63.accent))
  s.push(cf63T(380, 362, 9.5, c63.ink, 'middle', 'STEP 2 - the response, wrapped: ciphertext back', true))
  s.push(cf63T(W / 2, 386, 10, c63.tealInk, 'middle', 'the padlock in the address bar says this wrap is on - and 443 is its door', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE D - THE COOKIE ROUND-TRIP: three beats on a sequence   */
/* diagram - set, store, ride back                                    */
/* ================================================================== */
function cf63CookieSvg(): string {
  const W = 760
  const H = 390
  const bx = 160
  const sx = 600
  const s: string[] = []
  const beat = (y: number, l1: string, l2: string) => {
    s.push(cf63T(740, y, 10.5, c63.conn, 'end', l1, true))
    s.push(cf63T(740, y + 15, 9, c63.tealInk, 'end', l2))
  }
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The cookie round-trip as a sequence diagram with three beats. Your browser sits on the left lifeline and the web server on the right. Beat 1, the first visit: the browser sends a request with no cookie - a stranger - and the server responds with the page plus a Set-Cookie note. Beat 2, the store: the browser keeps the small piece of data in its cookie store. Beat 3, the next visit: the cookie rides back with the request, and the server remembers - the cart returns. The footer pins Netscape 1994 for the first cookie software, and the honest limits: a cookie cannot read your hard disk or carry viruses, but it does track, which is why clearing them exists.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE COOKIE ROUND-TRIP - THREE BEATS', true))
  s.push(cf63T(W / 2, 44, 9.5, c63.tealInk, 'middle', 'HTTP forgets; the cookie is the memory patch the server pins on your browser'))
  s.push(`<rect x="60" y="56" width="200" height="52" rx="8" fill="${c63.white}" stroke="${c63.teal}" stroke-width="2"/>`)
  s.push(cf63T(bx, 78, 10.5, c63.ink, 'middle', 'YOUR BROWSER', true))
  s.push(cf63T(bx, 96, 9.5, c63.tealInk, 'middle', 'holds the cookie store'))
  s.push(`<rect x="500" y="56" width="200" height="52" rx="8" fill="${c63.white}" stroke="${c63.teal}" stroke-width="2"/>`)
  s.push(cf63T(sx, 78, 10.5, c63.ink, 'middle', 'THE WEB SERVER', true))
  s.push(cf63T(sx, 96, 9.5, c63.tealInk, 'middle', 'wants to remember visitors'))
  s.push(`<line x1="${bx}" y1="108" x2="${bx}" y2="312" stroke="${c63.tealInk}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
  s.push(`<line x1="${sx}" y1="108" x2="${sx}" y2="312" stroke="${c63.tealInk}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
  /* beat 1 */
  s.push(cf63T(380, 132, 9.5, c63.ink, 'middle', 'REQUEST: GET /cart - no cookie yet (a stranger)', true))
  s.push(cf63ArrowH(bx, sx, 142, c63.conn))
  s.push(cf63ArrowH(sx, bx, 176, c63.struct))
  s.push(cf63T(380, 168, 9.5, c63.ink, 'middle', 'RESPONSE: the page + Set-Cookie: visitor=17', true))
  beat(146, 'BEAT 1', 'the first visit')
  /* beat 2 */
  s.push(`<rect x="40" y="198" width="240" height="54" rx="9" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(160, 219, 10.5, c63.ink, 'middle', 'THE COOKIE STORE', true))
  s.push(cf63T(160, 237, 9.5, c63.tealInk, 'middle', 'kept by your browser - a small piece of data'))
  beat(220, 'BEAT 2', 'the store')
  /* beat 3 */
  s.push(cf63T(380, 266, 9.5, c63.ink, 'middle', 'REQUEST: the cookie visitor=17 rides back with it', true))
  s.push(cf63ArrowH(bx, sx, 278, c63.conn))
  s.push(cf63ArrowH(sx, bx, 308, c63.struct))
  s.push(cf63T(380, 300, 9.5, c63.ink, 'middle', 'RESPONSE: the server remembers - your cart returns', true))
  beat(272, 'BEAT 3', 'the next visit')
  s.push(`<rect x="36" y="324" width="${W - 72}" height="52" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 344, 10, c63.ink, 'middle', 'Netscape, 1994 - the first cookie software told first-time from returning visitors', true))
  s.push(cf63T(W / 2, 362, 9.5, c63.tealInk, 'middle', 'a cookie cannot read your hard disk or carry viruses - but it does track, which is why clearing them exists'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 1 - the URL drill board, solved: 5 parts, 3       */
/* sub-parts, on the exercise URL                                     */
/* ================================================================== */
function cf63SolUrlBoardSvg(): string {
  const W = 760
  const H = 234
  const CH = 7.0
  const segs: { t: string; c: string }[] = [
    { t: 'https', c: c63.teal },
    { t: '://', c: c63.ink },
    { t: 'portal', c: c63.accent },
    { t: '.', c: c63.ink },
    { t: 'school.edu.in', c: c63.conn },
    { t: ':', c: c63.ink },
    { t: '443', c: c63.warn },
    { t: '/', c: c63.ink },
    { t: 'homework/task2.htm', c: c63.struct },
    { t: '?', c: c63.ink },
    { t: 'subject=science', c: c63.tealInk },
    { t: '#', c: c63.ink },
    { t: 'q3', c: c63.mid },
  ]
  const total = segs.reduce((a, g) => a + g.t.length, 0) * CH
  const pos: Record<string, number> = {}
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The solved drill board for the exercise URL https portal school.edu.in 443 homework slash task2.htm question subject equals science hash q3. Braces mark the 5 top-level parts - scheme https, authority portal.school.edu.in colon 443, path homework slash task2.htm, parameters subject equals science, anchor q3 - and a second row of braces splits the authority into its 3 sub-parts: subdomain portal, domain school.edu.in, port 443. The census panel counts 5 top-level parts and 3 sub-parts, notes the port 443 says HTTPS, and that an untyped port would still mean 443 while 80 belongs to plain http.">`)
  s.push(cf63T(W / 2, 24, 12, c63.teal, 'middle', 'THE DRILL BOARD, SOLVED - 5 PARTS, 3 SUB-PARTS', true))
  let x = (W - total) / 2
  for (const g of segs) {
    s.push(cf63T(x, 56, 12, g.c, 'start', g.t, true))
    pos[g.t] = x
    x += g.t.length * CH
  }
  const l1: [number, number, string, string][] = [
    [pos['https'], pos['https'] + 5 * CH, c63.teal, 'SCHEME'],
    [pos['portal'], pos['443'] + 3 * CH, c63.conn, 'AUTHORITY'],
    [pos['/'], pos['homework/task2.htm'] + 18 * CH, c63.struct, 'PATH'],
    [pos['?'], pos['subject=science'] + 15 * CH, c63.tealInk, 'PARAMETERS'],
    [pos['#'], pos['q3'] + 2 * CH, c63.mid, 'ANCHOR'],
  ]
  for (const [a, b, col, lab] of l1) {
    s.push(cf63Brace(a, b, 66, col))
    s.push(cf63T((a + b) / 2, 86, 9.5, col, 'middle', lab, true))
  }
  const l2: [number, number, string, string][] = [
    [pos['portal'], pos['portal'] + 6 * CH, c63.accent, 'SUBDOMAIN'],
    [pos['school.edu.in'], pos['school.edu.in'] + 13 * CH, c63.conn, 'DOMAIN'],
    [pos[':'], pos['443'] + 3 * CH, c63.warn, 'PORT'],
  ]
  for (const [a, b, col, lab] of l2) {
    s.push(cf63Brace(a, b, 96, col))
    s.push(cf63T((a + b) / 2, 116, 9.5, col, 'middle', lab, true))
  }
  s.push(`<rect x="36" y="130" width="${W - 72}" height="52" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 150, 10, c63.ink, 'middle', 'THE CENSUS: 5 top-level parts, an authority of 3 - and the port 443 says HTTPS', true))
  s.push(cf63T(W / 2, 168, 9.5, c63.tealInk, 'middle', 'no port typed would still mean 443; door 80 belongs to plain http'))
  s.push(`<rect x="36" y="190" width="${W - 72}" height="32" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 210, 9.5, c63.tealInk, 'middle', 'the handed-on input: subject=science is the page\'s question, and #q3 the spot within the page'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 2 - HTTP against HTTPS: the sorting panel          */
/* ================================================================== */
function cf63SolHttpPanelSvg(): string {
  const W = 760
  const H = 300
  const s: string[] = []
  const col = (x: number, head: string, hc: string, rows: string[]) => {
    s.push(`<rect x="${x}" y="54" width="340" height="190" rx="9" fill="${c63.white}" stroke="${hc}" stroke-width="2.5"/>`)
    s.push(cf63T(x + 170, 78, 12, hc, 'middle', head, true))
    rows.forEach((r, i) => s.push(cf63T(x + 170, 106 + i * 27, 9.5, c63.tealInk, 'middle', r)))
  }
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The HTTP against HTTPS sorting panel. Left column, plain HTTP: port 80, the wire sees plain text, the padlock is absent, on public Wi-Fi the fetch is sniffable, and the dance is two stateless messages. Right column, HTTPS: port 443, the wire sees ciphertext through the TLS wrap, the padlock is shown, public Wi-Fi watchers see ciphertext, and the dance is the same two messages, wrapped. The footer states HTTPS equals HTTP over TLS, and SSL is the old name that survives in speech.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'HTTP AGAINST HTTPS - THE SORTING PANEL', true))
  s.push(cf63T(W / 2, 42, 9.5, c63.tealInk, 'middle', 'the scheme decides everything in this table - one letter, one port, one wrap'))
  col(36, 'PLAIN HTTP', c63.warn, ['port: 80', 'the wire sees: plain text', 'the padlock: absent', 'public Wi-Fi: sniffable - readable', 'the dance: 2 messages, stateless'])
  col(384, 'HTTPS', c63.tealInk, ['port: 443', 'the wire sees: ciphertext (TLS)', 'the padlock: shown', 'public Wi-Fi: wrapped - watchers see noise', 'the dance: the same 2, wrapped'])
  s.push(`<rect x="36" y="256" width="${W - 72}" height="32" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 276, 10, c63.ink, 'middle', 'HTTPS = HTTP over TLS - and SSL is the old name that survives in speech', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 3 - spot the fake: the examp1e lookalike           */
/* ================================================================== */
function cf63SolPhishPanelSvg(): string {
  const W = 760
  const H = 272
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="Spot the fake domain panel. The first row shows my-bank.example.com, the honest pattern, with the letter l in example. The second row shows my-bank.examp1e.com, the fake, with the digit 1 in the letter's place - same length, different machine. The tell panel counts it: example against examp1e differ at exactly one character, the sixth - and nothing else. The checklist strip reads: read the domain, look for the padlock, never click through fear.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'SPOT THE FAKE - THE DOMAIN READ, CHARACTER BY CHARACTER', true))
  s.push(`<rect x="36" y="48" width="${W - 72}" height="52" rx="9" fill="${c63.white}" stroke="${c63.struct}" stroke-width="2.5"/>`)
  s.push(cf63T(W / 2, 70, 13, c63.ink, 'middle', 'my-bank.example.com', true))
  s.push(cf63T(W / 2, 90, 9.5, c63.tealInk, 'middle', 'the honest pattern - the letter l in example, the registrant\'s own name'))
  s.push(`<rect x="36" y="112" width="${W - 72}" height="52" rx="9" fill="${c63.white}" stroke="${c63.warn}" stroke-width="2.5"/>`)
  s.push(cf63T(W / 2, 134, 13, c63.warn, 'middle', 'my-bank.examp1e.com', true))
  s.push(cf63T(W / 2, 154, 9.5, c63.warn, 'middle', 'THE FAKE - the digit 1 in the letter\'s place: same length, a different machine entirely'))
  s.push(`<rect x="36" y="176" width="${W - 72}" height="44" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 196, 10, c63.ink, 'middle', 'the tell: example against examp1e - ONE character, the sixth - and nothing else', true))
  s.push(cf63T(W / 2, 212, 9.5, c63.tealInk, 'middle', 'logos and even a padlock can be copied by the fake; the domain cannot - read it first'))
  s.push(`<rect x="36" y="232" width="${W - 72}" height="32" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 252, 10, c63.ink, 'middle', 'the checklist: read the domain - look for the padlock - never click through fear', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 4 - the fetch-order strip: 5 numbered beats        */
/* ================================================================== */
function cf63SolFetchStripSvg(): string {
  const W = 760
  const H = 204
  const bw = 120
  const gap = 28
  const x0 = 24
  const top = 52
  const bh = 76
  const beats = [
    { n: 'BEAT 1', name: 'DNS LOOKUP', note: 'name to IP - port 53' },
    { n: 'BEAT 2', name: 'TCP CONNECTION', note: 'the pipe - port 80/443' },
    { n: 'BEAT 3', name: 'HTTP REQUEST', note: 'GET the path' },
    { n: 'BEAT 4', name: 'HTTP RESPONSE', note: 'the page, or 404' },
    { n: 'BEAT 5', name: 'RENDER', note: 'draw the page' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The fetch-order strip: five numbered boxes left to right with arrows between. Beat 1, DNS lookup - the name becomes an IP address on port 53. Beat 2, TCP connection - the pipe opens at port 80 for http or 443 for https. Beat 3, HTTP request - GET the path. Beat 4, HTTP response - the page, or the honest 404. Beat 5, render - the browser draws the page. The footer notes that a typo in the domain dies at beat 1 while a typo in the path dies at beat 4 as a 404, and that beat 1 is lesson 6.2's DNS ladder.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE FETCH, FIRST BEAT TO LAST', true))
  beats.forEach((b, k) => {
    const x = x0 + k * (bw + gap)
    s.push(`<rect x="${x}" y="${top}" width="${bw}" height="${bh}" rx="8" fill="${k % 2 === 0 ? c63.white : c63.panelB}" stroke="${c63.teal}" stroke-width="2"/>`)
    s.push(cf63T(x + bw / 2, top + 18, 9, c63.conn, 'middle', b.n, true))
    s.push(cf63T(x + bw / 2, top + 38, 10, c63.ink, 'middle', b.name, true))
    s.push(cf63T(x + bw / 2, top + 58, 8.5, c63.tealInk, 'middle', b.note))
    if (k < 4) s.push(cf63ArrowH(x + bw + 3, x + bw + gap - 3, top + bh / 2, c63.accent))
  })
  s.push(`<rect x="36" y="146" width="${W - 72}" height="44" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 166, 10, c63.ink, 'middle', 'a typo in the DOMAIN dies at beat 1 - the name never resolves; a typo in the PATH dies at beat 4, as the honest 404', true))
  s.push(cf63T(W / 2, 182, 9.5, c63.tealInk, 'middle', 'beat 1 is lesson 6.2\'s DNS ladder on port 53 - no fetch begins without it'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 5 - the two-visit ledger: stateless, then patched   */
/* ================================================================== */
function cf63SolCookieLedgerSvg(): string {
  const W = 760
  const H = 256
  const s: string[] = []
  const panel = (x: number, head: string, hc: string, lines: string[]) => {
    s.push(`<rect x="${x}" y="46" width="340" height="152" rx="9" fill="${c63.white}" stroke="${hc}" stroke-width="2.5"/>`)
    s.push(cf63T(x + 170, 70, 11.5, hc, 'middle', head, true))
    lines.forEach((l, i) => s.push(cf63T(x + 170, 96 + i * 24, 9.5, c63.tealInk, 'middle', l)))
  }
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The two-visit ledger for cookies. Left panel, without a cookie: visit one serves a stranger, and visit two serves a stranger again - the cart from visit one is gone, because stateless HTTP carries nothing across the gap. Right panel, with the cookie of 1994: visit one serves a stranger and the response sets the cookie; the browser stores the small piece of data; visit two carries the cookie back, and the server remembers - the cart returns. The footer notes the memory lives in the browser's store, not the protocol, and clearing cookies empties the store.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE TWO-VISIT LEDGER - STATELESS, THEN PATCHED', true))
  panel(36, 'WITHOUT A COOKIE', c63.warn, ['visit 1: a stranger is served', 'visit 2: a stranger is served again', 'the cart from visit 1 is gone', 'nothing carries across the gap', 'HTTP is stateless - by design'])
  panel(384, 'WITH THE COOKIE (1994)', c63.tealInk, ['visit 1: a stranger, and Set-Cookie goes out', 'the browser stores the small note', 'visit 2: the cookie rides back', 'the server remembers - the cart returns', 'the patch, on at both ends'])
  s.push(`<rect x="36" y="210" width="${W - 72}" height="34" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 231, 9.5, c63.ink, 'middle', 'the memory lives in the browser\'s store, not the protocol - HTTP stays stateless, and clearing cookies empties the store', true))
  s.push('</svg>')
  return s.join('')
}

/* all nine figure builders above: 4 body figures + 5 solution figures,
   every geometry constant derived - never eyeballed */

export const lesson63: Lesson = {
  id: 'cf-browsing-the-web-the-citizens-vocabulary',
  number: '6.3',
  title: 'Browsing the Web: the Citizen\'s Vocabulary',
  concepts: [
    'the Internet as infrastructure, the Web as one service riding it',
    'the browser census and the anatomy walk',
    'the URL: 5 top-level parts, an authority of 3, ports 80 and 443',
    'HTTP: the two-message dance, stateless, 404 honest',
    'HTTPS: the same dance wrapped in TLS',
    'search engines against typed URLs',
    'cookies: the memory patches of a stateless protocol',
    'phishing and the lookalike-domain trick',
  ],
  objectives: [
    'By the end of this lesson you can draw the citizen\'s first distinction: the Internet is the infrastructure - the wires, routers and protocols of lesson 6.2 - and the Web is ONE service built on top, a world of pages written in HTML, found by URLs, moved by HTTP; email is a different service riding the same infrastructure, and MDN\'s honest line says the Internet is the backbone of the Web.',
    'By the end of this lesson you can define the browser as the software application that fetches, renders and displays pages - text, images, audio, video, hyperlinks - and carry the five-browser census (Chrome, Firefox, Safari, Opera, Edge) with the honest note that Edge is Internet Explorer\'s successor of the 1995 browser-war generation, and that Mosaic (NCSA, 1993) was the first popular graphical browser.',
    'By the end of this lesson you can dissect a URL into its 5 top-level parts (scheme, authority, path, parameters, anchor), split the authority into its 3 sub-parts (subdomain, domain, port), and pin the port census: 80 = HTTP, 443 = HTTPS, 53 = DNS.',
    'By the end of this lesson you can walk HTTP\'s two-message dance - the browser\'s request, the server\'s response - state the protocol\'s statelessness (each request stands alone), read 404 as the honest page-not-found answer, and order the 5 beats of every fetch: DNS lookup, TCP connection, HTTP request, HTTP response, render.',
    'By the end of this lesson you can state that HTTPS is HTTP over TLS (the old name SSL survives in speech), read the padlock in the address bar, and explain why plain HTTP on public Wi-Fi is sniffable.',
    'By the end of this lesson you can explain cookies as the memory patches of a stateless protocol (Netscape, 1994, first-time against returning visitors), state their honest limits - they cannot read your hard disk or carry viruses, but they do track - and run the phishing checklist: read the domain, look for the padlock, never click through fear.',
  ],
  prerequisites: ['cf-the-internet-a-network-of-networks'],
  sources: ['cs-cf-web-ground-ch06'],
  blocks: [
    { kind: 'heading', text: 'From the Wires to the Pages' },
    { kind: 'para', text: 'Lesson 6.2 handed you the network of networks: the wires under the sea and over the rooftops, the routers forwarding packets hop by patient hop, the DNS ladder that turns a name into an address. It was a delivery service with nothing yet to deliver - or rather, with everything to deliver and no vocabulary for saying what. This lesson supplies that vocabulary. You already use every word in it a dozen times a day: browser, address bar, web page, cookie, the padlock, the 404. But a citizen who cannot define the words they use daily is at the mercy of everyone who can - the swindler counts on it. So we take the words properly, one by one, the way this book takes every word: from the ground up, with every number pinned to its source and every piece of folklore marked as folklore. The chapter\'s earlier lessons built the machine and the network; this lesson builds you, the citizen, a working command of the Web\'s own names.' },

    // ================================================================
    // 1. ONE INFRASTRUCTURE, MANY SERVICES
    // ================================================================
    { kind: 'heading', text: 'One Infrastructure, Many Services' },
    { kind: 'para', text: 'Ask a room of students to name the great invention of the 1990s and half the hands will say the Internet while the other half say the Web - and both halves will mean the same thing, and both will be speaking loosely. The citizen\'s first distinction untangles them, and it is worth more examination marks than any other single sentence in this chapter, because every later word depends on getting it right. The distinction is about LAYERS: one of the two things is the ground itself, and the other is a building standing on that ground. Confuse the ground with the building and every conversation about the Web afterwards wobbles.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - the Internet (recalled from lesson 6.2)', text: 'The **Internet** is said to be the infrastructure: the physical network of wires, routers and links, together with the protocols (TCP/IP) that move data across it. Symbolically, the Internet is the road system - the tarmac, the signage, the rules of driving - and it carries cargo without ever asking what the cargo is for.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - the World Wide Web', text: 'The **World Wide Web** (the Web, WWW) is said to be one service built on top of the Internet: a world of pages written in HTML, identified by URLs, and moved from servers to browsers by HTTP. Symbolically, the Web is one kind of traffic on the road system - the vast fleet of linked, readable pages - while **email is a different service riding the same infrastructure**, another kind of traffic on the same roads.' },
    { kind: 'para', text: 'Mozilla\'s developer documentation - MDN, the reference the whole industry builds on - compresses the distinction into one honest line that you should carry verbatim: **the Internet is the backbone of the Web**. Read it twice and notice what it does and does not say. It does not say the two are equal partners, and it does not say they are the same thing wearing two names. A backbone is a structure that something else stands on. The Internet is the structure; the Web is one thing standing on it; and the preposition is the entire lesson of this section.' },
    { kind: 'figure', caption: 'The stack, drawn honestly: the Web, email and other services sit as application boxes riding the Internet bar - the wires, routers and TCP/IP protocols of lesson 6.2 - and the Internet bar rides the physical media of fibre, copper and radio. Three layers, arrows pointing both ways, because every service sends requests down the wire and receives payloads back. The MDN line sits in the footer: the Internet is the backbone of the Web, and email is a different service on the same backbone - 3 services drawn, 1 infrastructure.', svg: cf63StackSvg() },
    { kind: 'para', text: 'Read the figure from the bottom up, the way dependence runs. The physical media - fibre, copper, radio - is the ground. On the ground stands the Internet: not a wire but a SYSTEM of wires, routers and the TCP/IP protocols that lesson 6.2 taught you to name. And on the Internet stand the services, drawn here as three boxes because three is the honest census of the picture, not the census of reality: the Web, email, and the others - file transfer, streaming, voice and video calls - all of them riders on the same infrastructure. Your morning mail and your evening browsing leave your machine on the same wires and are sorted by PROTOCOL, not by wire. When your video call stutters and your email still flows, nothing has happened to the Internet; one rider is simply having a hard ride.' },
    { kind: 'callout', tone: 'warn', title: 'Caution - the Web is not the Internet', text: 'In an examination, the option that says the Internet and the World Wide Web are the same thing is the classic trap, and it is wrong every time it appears. The Internet is the infrastructure; the Web is ONE service on it; email is a DIFFERENT service on the same infrastructure. Loose daily speech - \'I browsed my email on the Web\' - is fine over tea and fatal in an answer sheet.' },
    { kind: 'table', caption: 'The citizen\'s first distinction, asked as one dividing question. Hold the question and the two columns never blur.', head: ['The dividing question', 'The Internet', 'The Web'], rows: [
      ['What is it?', 'the infrastructure: wires, routers, TCP/IP', 'a service: pages in HTML, found by URLs, moved by HTTP'],
      ['Which layer?', 'the road system itself', 'one kind of traffic on it'],
      ['Standing on what?', 'the physical media (fibre, copper, radio)', 'the Internet - MDN: the backbone'],
      ['Who else rides?', 'carries every service alike', 'email is NOT the Web - a different service, same wires'],
      ['Whose ground?', 'lesson 6.2, the network of networks', 'this lesson - and the rest of its vocabulary'],
    ] },
    { kind: 'para', text: 'Three smaller words belong to the Web\'s own family, and examiners like to ask them together. A **website** is a collection of related web pages belonging to one person or organisation - a library of pages under one owner. A **webpage** is one single page of that collection, one document that your browser fetches and draws. And a **web server** is the computer that stores pages and hands them out on request - the librarian who never sleeps. The site is the library, the page is one book in it, and the server is the building with the librarian inside. Notice the honest asymmetry: the first two words name content, the third names machinery - a server is a computer, and it is the only one of the three you could kick.' },
    { kind: 'terms', items: [
      { term: 'World Wide Web', def: 'the service built on the Internet: pages written in HTML, identified by URLs, moved by HTTP.' },
      { term: 'website', def: 'a collection of related web pages belonging to one person or organisation.' },
      { term: 'webpage', def: 'one single page of a website - one document the browser fetches and displays.' },
      { term: 'web server', def: 'the computer that stores web pages and hands them out to browsers on request.' },
      { term: 'the Internet (recalled)', def: 'the infrastructure: wires, routers and the TCP/IP protocols - the backbone of the Web.' },
    ] },
    { kind: 'example', title: 'Illustration 1. Sort the roster: infrastructure or service? An optical fibre under the sea; the TCP/IP protocol suite; a webpage about rainbows; an email from your teacher; a router forwarding packets; an HTTP request.', steps: [
      'Take the dividing question from the table: does the thing carry cargo, or is it the cargo?',
      'So, the optical fibre under the sea carries whatever is sent - infrastructure, the physical media layer.',
      'The TCP/IP protocol suite is the rulebook of the carrying - infrastructure, the Internet layer.',
      'The router forwarding packets is a machine of the road system - infrastructure again, and a physical one.',
      'Now, the webpage about rainbows is cargo being carried - service: the Web, one rider on the backbone.',
      'The email from your teacher is cargo of a different kind - service: email, a DIFFERENT rider on the same backbone.',
      'And the HTTP request is the Web\'s own mover speaking - service again: it is the Web\'s protocol, not the road\'s.',
      'Hence the roster splits 3 infrastructure (fibre, TCP/IP, router) against 3 service (webpage, email, HTTP request) - and the two columns answer different questions entirely.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note - why this distinction earns first place', text: 'Every remaining word in this lesson - browser, URL, HTTP, HTTPS, cookie, phishing - is WEB vocabulary, not Internet vocabulary. The wires have their own words, and lesson 6.2 taught them. When you can say which layer a word belongs to, you can also say which lesson examines it - and, later, which book owns its deeper theory.' },

    // ================================================================
    // 2. THE BROWSER, HONESTLY
    // ================================================================
    { kind: 'heading', text: 'The Browser, Honestly' },
    { kind: 'para', text: 'You have used one since before you could define it, which is exactly why the definition must now be exact. A browser is a piece of application software - recall the family census of chapter 5: it does the user\'s own job - and its job is to be your side of the Web\'s conversation. It speaks for you, draws for you, and remembers things for you. Every fetch this lesson walks is performed by it; every figure in the later sections shows it as one of the two boxes.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - web browser', text: 'A **web browser** is said to be the software application that fetches, renders and displays web pages - text, images, audio, video and hyperlinks - turning the HTML a server sends into the page you read. Symbolically: the browser is the citizen\'s window on the Web; it asks DNS on your behalf, speaks HTTP on your behalf, and draws whatever comes back.' },
    { kind: 'para', text: 'The census you must carry has exactly **5 browsers** in it: Chrome, Firefox, Safari, Opera, Edge. Five names, no more needed for any school, banking or board examination - though the shops hold others, and the honest census says so. And the census carries one honest note that examiners enjoy: **Edge is Internet Explorer\'s successor**. Internet Explorer was the browser of the 1995 browser-war generation - the one that shipped bundled with Windows and fought Netscape for the desktop; its line continues today as Edge. So when an older syllabus asks about Internet Explorer, translate honestly rather than dismissively: that line of descent now answers to Edge.' },
    { kind: 'callout', tone: 'historical', title: 'History - Mosaic, 1993', text: 'The first popular graphical browser was **Mosaic**, built at NCSA (the National Center for Supercomputing Applications, Illinois) and released in **1993**. Our own retelling, honestly hedged: the Web already existed - pages, URLs, HTTP, all in place - but before Mosaic it was read mostly by the people who built it, on screens of plain text. Mosaic put the pictures INLINE with the text, and the pictures did what pictures do: people came. Within two years the browser was a household object, and the three consecutive years 1993, 1994, 1995 - Mosaic, Netscape\'s cookies, Internet Explorer - opened the era whose vocabulary this lesson teaches. Anecdotes about exactly who first clicked what are folklore; the year 1993 and the house NCSA are pinned.' },
    { kind: 'para', text: 'Open any of the five and walk its anatomy - the parts around the page are collectively called the browser\'s chrome, and note the honesty: the word chrome for the frame around content long predates the browser named Chrome, which is why the pun works. Four citizens\' tools matter for every examination. The **address bar** is where a URL is typed or pasted - the place this lesson\'s next section is all about. The **back button** is your history\'s rewind: one click, one step back through the pages you have already visited. **Tabs** let many pages live at once in one window - the bank beside the news beside the textbook, each tab an independent page with its own address. And **bookmarks** are saved addresses: the pages you want tomorrow, kept by name so you need not re-find them. Address bar, back button, tabs, bookmarks - four tools, and the whole of the browser\'s face.' },
    { kind: 'table', caption: 'The anatomy walk: four tools of the browser\'s chrome, each met in daily use.', head: ['The part', 'The job it does', 'Where you meet it'], rows: [
      ['the address bar', 'accepts a URL and starts the fetch', 'you type an address and press Enter'],
      ['the back button', 'rewinds one step in your history', 'you want the page you were just on'],
      ['tabs', 'hold many independent pages in one window', 'the bank, the news and the textbook, side by side'],
      ['bookmarks', 'save addresses by name for later', 'the page you found today and want tomorrow'],
    ] },
    { kind: 'example', title: 'Illustration 2. Name the part: you type an address and press Enter; you want the page you were on a moment ago; you keep the bank, the news and the textbook open at once; you want tomorrow the page you found today.', steps: [
      'Take each scenario and ask which of the four tools is doing the work.',
      'So, typing an address and pressing Enter is the **address bar** - the URL\'s doorway, where every fetch begins.',
      'Wanting the page you were on a moment ago is the **back button** - one step back through your own history.',
      'Keeping the bank, the news and the textbook open at once is **tabs** - many independent pages in one window, each with its own address.',
      'Wanting tomorrow the page you found today is **bookmarks** - the address saved by name, so the finding never has to be repeated.',
      'Hence the four answers in order: address bar, back button, tabs, bookmarks - the whole of the browser\'s face in four moves.',
    ] },
    { kind: 'para', text: 'What the browser does between your press of Enter and the page appearing is this lesson\'s backbone: it asks DNS for the server\'s address, opens a connection, sends an HTTP request, receives the response, and renders - draws - the page: the text first, then the images, then whatever the page pulls in after. That five-beat walk owns section 4. But the walk needs somewhere to walk TO, and the somewhere is named by the Web\'s most exact word - the word in the address bar. It deserves its own section.' },
    { kind: 'callout', tone: 'insight', title: 'Note - where this lesson stops', text: 'How a page is BUILT - the HTML itself, the CSS that dresses it, the scripts that make it move - is the ground of our \'Full-Stack Web Development\' volume, which owns the author\'s side of the Web. This lesson owns the citizen\'s side: what the browser does for you and what the words mean. Walk to that doorstep when you want to write pages; stay here until you can read addresses.' },

    { kind: 'terms', items: [
      { term: 'web browser', def: 'the software application that fetches, renders and displays web pages - the citizen\'s window on the Web (Chrome, Firefox, Safari, Opera, Edge).' },
      { term: 'Mosaic', def: 'NCSA\'s 1993 browser - the first popular graphical browser; Edge is Internet Explorer\'s (1995) successor.' },
    ] },

    // ================================================================
    // 3. THE URL: THE ADDRESS OF A UNIQUE RESOURCE
    // ================================================================
    { kind: 'heading', text: 'The URL: the Address of a Unique Resource' },
    { kind: 'para', text: 'Every page on the Web has exactly one address, and the address has a name you must use precisely: the URL. The letters spell out Uniform Resource Locator, and each word is doing honest work - uniform because every URL obeys one grammar, resource because a URL can name a page, an image, a file or a form\'s answer, locator because it says where the thing lives and how to go get it. You have typed thousands of them. Now read one, slowly, the way an examiner reads it: part by part.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - URL', text: 'A **Uniform Resource Locator** (URL) is said to be the address that names one unique resource on the Web. Symbolically, a URL answers five questions in fixed order: by which **scheme** (protocol) to fetch it, from which **authority** (which server, on which port), along which **path** on that server, with which **parameters** (extra input), down to which **anchor** (spot within the page).' },
    { kind: 'figure', caption: 'The URL, dissected: the pinned example https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2 with a brace under each part. Five top-level parts - scheme (https), authority (www.example.co.in:443), path (textbook/ch6.htm), parameters (q=glassdoor), anchor (sec2) - and the authority\'s own three sub-parts nested beneath: subdomain (www), domain (example.co.in), port (443). The census panel: an untyped port is assumed - 443 for https, 80 for http - and the port census runs 80 = HTTP, 443 = HTTPS, 53 = DNS (the ladder of lesson 6.2, the first beat of every fetch). Sixty-three characters, one address, no two working URLs naming the same page.', svg: cf63UrlSvg() },
    { kind: 'para', text: 'Walk the dissection left to right, as five questions and their answers. HOW will this page be fetched? By the scheme **https** - everything before the ://, naming the protocol of the fetch, and here announcing that the two-message dance of section 4 will be wrapped in encryption. FROM WHOM? The **authority** - everything between the :// and the first slash - which is really three answers stacked: the subdomain **www** (a name for the machine, a convention so old it feels like a law), the domain **example.co.in** (the registered name, owned by exactly one registrant - and note the honest tail: co.in is India\'s corner of the name space), and the port **443**, the door on the server that HTTPS listens at. WHERE on that server? The **path** textbook/ch6.htm - a place in the server\'s filing system, this book\'s chapter 6 file. WITH WHAT extra input? The **parameters** q=glassdoor - a question handed to the page, here a search for glassdoor. DOWN TO WHICH spot? The **anchor** sec2 - the section within the page to jump to. Five questions, five parts, one address.' },
    { kind: 'derivation', title: 'The pinned URL, split to its census', statement: 'Dissect the pinned URL https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2 into its 5 top-level parts, then split the authority into its 3 sub-parts.', steps: [
      { label: 'Cut at the scheme separator', formula: '\\text{scheme} = \\text{https}', explanation: 'Everything before the :// names the protocol of the fetch. https, so the fetch will be wrapped in TLS (section 5) and the port, if untyped, will be assumed 443.' },
      { label: 'Cut out the authority', formula: '\\text{authority} = \\text{www.example.co.in:443}', explanation: 'Between the :// and the first slash lives the who-and-where: which server, in which name space, at which door.' },
      { label: 'Split the authority three ways', formula: '\\text{www} \\.\\; \\text{example.co.in} \\,:\\; \\text{443}', explanation: 'The subdomain is www, the domain is example.co.in, and the port is 443 - three sub-parts inside one top-level part, the nesting the figure draws with its second row of braces.' },
      { label: 'Read the path', formula: '\\text{path} = \\text{textbook/ch6.htm}', explanation: 'After the first slash, up to the question mark: the place on the server - here a chapter 6 file in a textbook folder.' },
      { label: 'Read the parameters', formula: '\\text{parameters} = \\text{q=glassdoor}', explanation: 'After the question mark: extra input handed to the page - a name-value pair, q carrying the value glassdoor.' },
      { label: 'Read the anchor', formula: '\\text{anchor} = \\text{sec2}', explanation: 'After the hash: the spot within the page - section 2 of the page the path names. The browser jumps to it after rendering.' },
    ], result: 'Hence the pinned URL splits into $5$ top-level parts (scheme, authority, path, parameters, anchor), the authority into $3$ sub-parts (subdomain, domain, port), and the port $443$ announces HTTPS before the fetch even begins.' },
    { kind: 'equation', latex: '\\text{URL} \\;=\\; \\text{scheme}://\\text{authority}/\\text{path}\\;?\\;\\text{parameters}\\;\\#\\;\\text{anchor} \\tag{1}', note: 'The grammar every URL obeys. Five top-level parts, always in this order; the parameters and anchor are optional in practice but always counted in the census - an examiner who asks how many parts a URL has wants the full five.' },
    { kind: 'equation', latex: '\\text{authority} \\;=\\; \\text{subdomain}\\;.\\;\\text{domain}\\;:\\;\\text{port} \\tag{2}', note: 'The authority, expanded: www is a subdomain, example.co.in is the domain, 443 is the port. The port is usually hidden because the scheme already implies it.' },
    { kind: 'para', text: 'Ports deserve their own minute, because they are the part of the URL you have never typed. A port is a numbered door on a server: the machine has one address, but many services wait behind many doors, and the number says which service you are knocking for. The Web\'s two doors are pinned: **80 is HTTP\'s door and 443 is HTTPS\'s**. Type no port and the browser assumes the scheme\'s default - 443 for https, 80 for http - which is why the pinned example may drop its :443 and mean exactly the same page. And for completeness, the lookup that begins every fetch - DNS, lesson 6.2\'s ladder - rides port **53**: not a door on the web server but the door of the naming system itself. Three numbers, one line each: 80, 443, 53.' },
    { kind: 'callout', tone: 'warn', title: 'Caution - www is NOT the domain', text: 'The classic examination trap hands you www.example.co.in and asks for the domain. The domain is example.co.in; www is the SUBDOMAIN - a machine-name within the registrant\'s name space, and a convention rather than a law: plenty of real sites have no www at all. Hold the nesting: authority = subdomain + domain + port, three sub-parts inside one top-level part.' },
    { kind: 'para', text: 'One honest note on synonyms, because your syllabus uses them. The NCERT line teaches the same anatomy with slightly different labels, and the examination expects you to translate rather than argue: in the address http://www.ncert.nic.in/textbook.php, the syllabus calls http the **protocol** (our scheme), www the **subdomain** (same word), and ncert.nic.in the **domain** (same word). Same dissection, honest synonyms - and note that this URL carries no port at all, so the http scheme\'s default, door 80, is silently assumed. When a question uses protocol for scheme, answer in the question\'s own dialect and move on.' },
    { kind: 'example', title: 'Illustration 3. Count honestly: how many of the 5 top-level parts are visible in https://www.example.co.in/, and what does the missing port mean?', steps: [
      'Take the short URL and run the grammar of equation (1) across it, left to right.',
      'So, the scheme is https - visible, part 1.',
      'The authority is www.example.co.in - visible, part 2, with its subdomain www and domain example.co.in both present.',
      'The path is the bare slash / - the root, the site\'s front door: visible, part 3.',
      'Now, the parameters and the anchor are simply absent - no question mark, no hash: parts 4 and 5 missing.',
      'Check the port: none is typed, so the scheme\'s default is assumed - 443 for https, exactly as the census panel says.',
      'Hence 3 of the 5 top-level parts are visible (scheme, authority, path), 2 are absent (parameters, anchor), and the hidden port is the assumed 443.',
    ] },
    { kind: 'example', title: 'Illustration 4. Translate the syllabus dialect: label http://www.ncert.nic.in/textbook.php exactly as the NCERT line does, and say which door the browser knocks at.', steps: [
      'Take the URL and cut it with the grammar: scheme (http), authority (www.ncert.nic.in), path (textbook.php).',
      'So, in the syllabus\'s own labels: http is the **protocol**, www is the **subdomain**, ncert.nic.in is the **domain** - one-to-one with our scheme, subdomain, domain.',
      'Now, the port: none is typed, and the scheme is plain http, so door 80 is silently assumed - the census of section 3 in action.',
      'Check the parts census: 3 of the 5 top-level parts are visible - scheme, authority, path - with parameters and anchor absent.',
      'Hence the NCERT labels are protocol = http, subdomain = www, domain = ncert.nic.in, and the untyped port means the browser knocks at door 80.',
    ] },
    { kind: 'example', title: 'Illustration 5. Which door? Say the assumed port for each fetch: (i) https://www.example.co.in/; (ii) http://www.ncert.nic.in/textbook.php; (iii) the DNS lookup that begins every fetch.', steps: [
      'Take the census line first: 80 = HTTP, 443 = HTTPS, 53 = DNS.',
      'So, (i) the scheme is https and no port is typed - the browser assumes **443**.',
      'Now, (ii) the scheme is plain http and no port is typed - the browser assumes **80**.',
      'And (iii) the DNS lookup is not a fetch of a page at all: it is the naming system\'s own conversation, and it rides port **53** - lesson 6.2\'s ladder, one beat before any door is knocked.',
      'Hence the doors are 443, 80 and 53 - and only the first two are doors on the web server; 53 belongs to DNS.',
    ] },
    { kind: 'para', text: 'Close the section with a count worth making once. The pinned example runs to 63 characters - count them yourself - and those 63 characters name exactly one page among the billions: the scheme fixes the protocol, the authority fixes the machine and its door, the path fixes the file, the parameters fix the question, the anchor fixes the spot. Change one character and you have a different address - sometimes a dead one (the honest 404 of the next section), sometimes, as the phishing section will show you, someone else\'s page entirely. That last fact is not a curiosity. It is the whole trick of the swindler, and the reason the citizen reads addresses character by character.' },
    { kind: 'terms', items: [
      { term: 'URL', def: 'Uniform Resource Locator - the address naming one unique resource: scheme, authority, path, parameters, anchor (5 top-level parts).' },
      { term: 'scheme', def: 'the part before :// - the protocol of the fetch (https, http).' },
      { term: 'authority', def: 'the part between :// and the first slash: subdomain + domain + port (3 sub-parts).' },
      { term: 'port', def: 'the numbered door on a server: 80 = HTTP, 443 = HTTPS (53 = DNS).' },
    ] },

    // ================================================================
    // 4. HTTP: THE TWO-MESSAGE DANCE
    // ================================================================
    { kind: 'heading', text: 'HTTP: the Two-Message Dance' },
    { kind: 'para', text: 'Fix the pinned URL in your mind and ask the question its scheme answers: by WHICH protocol will this page be fetched? For the pinned example the answer is HTTP\'s secure child; before you can say what the child adds, you must know the parent. HTTP - the HyperText Transfer Protocol - is a client-server protocol, and its entire social life is two messages. Not three, not a crowd: two. The browser, acting for you, sends a REQUEST; the server sends back a RESPONSE. Every page you have ever loaded, every image within every page, every form you have ever submitted - all of it is this one dance, repeated billions of times a second across the planet.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - HTTP', text: 'The **HyperText Transfer Protocol** (HTTP) is said to be the client-server protocol of the Web: the browser (the **client**) sends a **request** naming a resource, and the **server** returns a **response** - the resource itself, or an honest error. Symbolically, the protocol has exactly **2 message kinds** - request, then response - and HTTP is **stateless**: each request stands alone, with no memory of any request before it.' },
    { kind: 'figure', caption: 'The two-message dance. Top panel, plain HTTP on port 80: step 1 carries the browser\'s request (GET the path) to the server; step 2 carries the server\'s response back - the page itself. The dashed branch is the honest 404: when the path names no page, the server says so instead of pretending, while the companion panel holds the protocol\'s other truth - stateless, no memory between requests. Bottom panel, HTTPS on port 443: the same browser, the same server, the same two steps, but the messages now pass through the TLS wrap - ciphertext on the wire in both directions - which is what the padlock in the address bar announces.', svg: cf63DanceSvg() },
    { kind: 'para', text: 'Read the request first, because its plainness surprises people. It is a short, almost rude letter: a method line - GET /textbook/ch6.htm - get me this file - followed by a few headers saying who is asking and what formats it can accept. GET is the method you use for reading; its siblings exist for writing and sending, and their names are the property of the server-side crafts. The response is a letter of two parts as well: a STATUS - a number saying how the transaction went - and a BODY, which is the page itself when all went well. The two letters, one each way, are the whole protocol; everything else this lesson meets - the 404, the padlock, even the cookie - is a footnote to one of those two messages.' },
    { kind: 'table', caption: 'The two message kinds of HTTP - the census an examiner can ask as a one-mark question, and the honest contents of each.', head: ['The message', 'Who sends it', 'What it carries'], rows: [
      ['the request', 'the browser (the client)', 'a method (GET) naming the path, plus headers saying who is asking'],
      ['the response', 'the server', 'a status code (200, 404, ...) and a body - the page, or the error'],
    ] },
    { kind: 'para', text: 'Now the property that shapes everything downstream: HTTP is **stateless**. Each request stands alone. The server that answered your request for page one does not, by the protocol itself, remember you when your request for page two arrives a second later - the two requests are strangers meeting twice. This is not a defect but a design decision, and an old one: HTTP was designed in the early 1990s to move linked documents - plain pages pointing to plain pages - and a protocol that remembers nothing between requests is a protocol that stays simple and scales outrageously. The cost only appears when a shop wants to remember your cart, and the Web\'s answer to that cost - the cookie - is important enough to own its own section later. Hold the causal chain: statelessness is WHY cookies exist at all.' },
    { kind: 'para', text: 'And the status line deserves its most famous number. When the path names a page that is not there - you mistyped it, or the author never wrote it, or it was moved - the server does not pretend, does not guess, does not quietly hand you some other page. It answers **404: page not found**. Read the 404 as the honest answer it is: the network worked, the connection worked, your request was heard and understood - the server looked where you asked, and the page is simply not there. Distinguish it carefully from the machine being unreachable (the browser cannot even connect) and from the server being broken (the 500-family, the server\'s own admission of failure). The citizen who meets a 404 knows exactly what happened: right door, wrong shelf.' },
    { kind: 'algorithm', title: 'The fetch, first beat to last - what the browser does when you press Enter', lines: [
      { code: 'ask DNS for the IP address of the host (the ladder of lesson 6.2, port 53)', note: 'the name becomes a number before anything else can happen - beat 1' },
      { code: 'open a TCP connection to that IP, at the scheme\'s port (80 for http, 443 for https)', note: 'the reliable pipe of lesson 6.2, laid for this conversation - beat 2' },
      { code: 'send the HTTP request: GET the path', note: 'message 1 of 2 - the client asks - beat 3' },
      { code: 'receive the HTTP response: the page, or an honest error like 404', note: 'message 2 of 2 - the server answers - beat 4' },
      { code: 'render: draw the page, then fetch what it pulls in (images, style, scripts)', note: 'the beat the citizen actually sees - beat 5' },
    ], note: 'Five beats, and beat 1 is where this lesson meets 6.2: no fetch begins without the DNS lookup, and no dance happens until the pipe is laid.' },
    { kind: 'para', text: 'Notice where the chapter\'s own machinery enters the story. The first beat of every fetch is the DNS lookup - lesson 6.2\'s ladder, port 53, the recursive walk from resolver to root to the name\'s own servers - and the second beat lays the TCP connection on the answer. This lesson does not re-teach that ground; it only insists on the ORDER, because the order is examinable and because it explains a daily mystery: when the name is wrong, the failure happens before any web server is ever contacted. A typo in the domain dies at beat 1; a typo in the path dies at beat 4, as a 404. Same typo, two very different funerals.' },
    { kind: 'example', title: 'Illustration 6. Order the beats: a friend lists the fetch of https://www.example.co.in/textbook/ch6.htm as render, HTTP request, DNS lookup, HTTP response, TCP connection. Restore the honest order and say where each of the two typos would die.', steps: [
      'Take the five beats and ask what each one needs before it can begin.',
      'So, nothing can start until the name is a number: the DNS lookup is beat 1 (port 53, lesson 6.2\'s ladder).',
      'Now, the request needs a pipe to travel in: the TCP connection to the IP, at door 443 (the scheme is https), is beat 2.',
      'Then the dance itself: the HTTP request is beat 3 - message 1 - and the HTTP response is beat 4 - message 2, the page or the honest error.',
      'And only when the response lands does the browser draw: render is beat 5.',
      'Check the typos against the order: a typo in the DOMAIN dies at beat 1 - the name never resolves - while a typo in the PATH dies at beat 4, as the server\'s honest 404.',
      'Hence the honest order is DNS lookup, TCP connection, HTTP request, HTTP response, render - and the two typos die one at beat 1, the other at beat 4.',
    ] },
    { kind: 'example', title: 'Illustration 7. The 404 branch, read honestly: you request /textbook/ch7.htm a week before the author writes it. What comes back, what does it mean, and what does it NOT mean?', steps: [
      'Take the fetch beat by beat: the name resolves (beat 1), the connection opens at door 443 (beat 2), the request goes out (beat 3).',
      'So, the server receives a well-formed request for a path that names no page - the file is not there yet.',
      'Now, the protocol\'s honest answer: a response whose status is 404, page not found - message 2 of the dance, carrying an error instead of a body.',
      'Check what it does NOT mean: the network is fine, the connection was fine, the server heard you perfectly - it looked, and the shelf is empty.',
      'Hence the answer is 404 Not Found - right door, wrong shelf - and it means the page is absent, not that the server or the network is broken.',
    ] },
    { kind: 'terms', items: [
      { term: 'HTTP', def: 'HyperText Transfer Protocol - the Web\'s client-server protocol: a request from the browser, a response from the server (2 message kinds).' },
      { term: 'stateless', def: 'having no memory between requests - each HTTP request stands alone.' },
      { term: '404', def: 'the honest page-not-found status: the server heard the request, and the path names no page.' },
    ] },

    // ================================================================
    // 5. HTTPS: THE SAME DANCE, WRAPPED
    // ================================================================
    { kind: 'heading', text: 'HTTPS: the Same Dance, Wrapped' },
    { kind: 'para', text: 'Return to the pinned URL and its scheme: https, not http. What does the extra letter buy? Less mystery than the padlock suggests, and more safety. HTTPS is not a new protocol with new dances - it is the SAME two-message dance, wrapped. The request still goes out, the response still comes back, the 404 still means what it means; but before any of that happens, the browser and the server perform a handshake that gives them a shared secret, and from then on every byte of the conversation is encrypted - ciphertext on the wire, readable only by the two ends of the pipe.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - HTTPS', text: '**HTTPS** is said to be HTTP over **TLS** - the same request/response protocol with its messages wrapped in the encryption of Transport Layer Security. Symbolically: HTTPS = HTTP + TLS; the dance keeps its 2 message kinds and its statelessness; only the envelope changes, and the scheme\'s default port moves from 80 to **443**.' },
    { kind: 'para', text: 'Unpack the abbreviation once, because examiners ask it as a two-marker and citizens need it as a fact: TLS spells **Transport Layer Security**. Its old name, **SSL - Secure Sockets Layer - survives in speech**: people say SSL certificates, the industry mostly means TLS underneath, and the honest citizen says TLS and footnotes the synonym. The handshake itself - the certificates, the key exchange, the cipher negotiation - is real mathematics with real depth, and it belongs to our \'Cybersecurity\' volume, which owns the full theory. This lesson owns the citizen\'s half: what the wrap is called, what it changes, and how to see at a glance whether it is on.' },
    { kind: 'para', text: 'That glance is the **padlock**. Every modern browser shows a small closed lock beside the address when the page came by HTTPS, and its absence on a page that asks for a password is a stop sign. The padlock is the browser\'s one-word report of the wrap: this conversation, request and response alike, went out as ciphertext. Keep the honesty in view as you use it: the padlock certifies the PIPE, not the person at the other end - a wrapped conversation with a swindler is still private, which is precisely why the phishing section will tell you to read the DOMAIN first and the padlock second. Encryption is a seal on the envelope, not a character reference for the sender.' },
    { kind: 'callout', tone: 'warn', title: 'Caution - plain HTTP on public Wi-Fi is sniffable', text: 'On a public Wi-Fi network - the cafe, the station, the airport - a plain http fetch travels READABLE. Others on the same network can watch the traffic pass and read what you asked for and what came back, the way a neighbour reads a postcard left open on a shared table. HTTPS wraps the same conversation so the watcher sees only ciphertext. The citizen\'s rule: no passwords, no card numbers, no logins on pages whose address begins with plain http - and on public Wi-Fi, double it.' },
    { kind: 'table', caption: 'HTTP against HTTPS - the sorting table an examination loves and a citizen uses daily. One letter, one port, one wrap.', head: ['The dividing line', 'HTTP', 'HTTPS'], rows: [
      ['the scheme in the URL', 'http', 'https'],
      ['the default port', '80', '443'],
      ['what the wire sees', 'the request and response in plain text', 'ciphertext - the TLS wrap'],
      ['the padlock', 'absent', 'shown in the address bar'],
      ['on public Wi-Fi', 'sniffable - readable by watchers', 'wrapped - watchers see ciphertext'],
      ['the definition', 'the two-message dance', 'the same dance over TLS (old name: SSL)'],
    ] },
    { kind: 'example', title: 'Illustration 8. Sort by scheme, honestly: which of these fetches is readable on the cafe\'s public Wi-Fi, and which is wrapped? (i) http://neighbourhood-cafe.in/menu.htm; (ii) https://www.example.co.in:443/textbook/ch6.htm; (iii) http://www.ncert.nic.in/textbook.php; (iv) https://mail.example.org/inbox.', steps: [
      'Take the dividing line from the table: the SCHEME decides - http travels plain, https travels wrapped.',
      'So, (i) http://neighbourhood-cafe.in/menu.htm is plain HTTP on port 80 - readable on the public network: the menu is not a secret, but the fetch is still sniffable.',
      'Now, (ii) the pinned example is https at door 443 - the TLS wrap is on, and the watcher sees only ciphertext.',
      'And (iii) the NCERT textbook page is plain http, door 80 assumed - readable in transit; reading a syllabus leaks nothing, but know which regime you are in.',
      'Check (iv): https://mail.example.org/inbox is wrapped at 443 - as mail should always be.',
      'Hence (i) and (iii) are the sniffable plain fetches, (ii) and (iv) the wrapped ones - sorted by the scheme alone, before any padlock is consulted.',
    ] },
    { kind: 'terms', items: [
      { term: 'HTTPS', def: 'HTTP over TLS - the same two-message dance wrapped in encryption; default port 443.' },
      { term: 'TLS', def: 'Transport Layer Security - the encryption layer of HTTPS; its old name SSL survives in speech.' },
    ] },

    // ================================================================
    // 6. SEARCH ENGINES AGAINST TYPED URLS
    // ================================================================
    { kind: 'heading', text: 'Search Engines against Typed URLs' },
    { kind: 'para', text: 'There are exactly two honest ways a fetch begins, and the citizen knows which one they are using. When you KNOW the address - the bank, the board results, the textbook - you type the URL itself, and the five beats of section 4 run straight to that server. When you do NOT know the address - you want the answer to a question, or the best cake shop in a town you have never visited - you type words instead, and hand the problem to a search engine. The two doorways have blurred in daily use - type plain words into the address bar and the browser quietly routes them to your default engine - but the underlying distinction is clean, and examinations ask it clean.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - search engine', text: 'A **search engine** is said to be a service on the Web that has already **crawled** the Web - following links from page to page - built an **index** of what it found, and answers your typed query by looking it up in that index. Symbolically: you type words, not an address; the engine answers from its index with a ranked list; and the click that follows is an ordinary typed-URL fetch in disguise, aimed at whichever address the result names.' },
    { kind: 'para', text: 'The census for your syllabus holds three names: **google.co.in, bing.com, duckduckgo.com** - one Indian-flavoured front end and two others, all of them engines, all of them indexes, none of them the Web. That last clause is the honest sentence of this section: a search engine is not the Web; it is a service ON the Web - a very large set of servers holding a very large index - and when you ask it a question you are fetching a page from ITS servers, exactly as you would fetch any other page. What you get back is not the destination; it is a map of destinations, drawn in advance by the crawl.' },
    { kind: 'para', text: 'So the honest account of a search is TWO different fetches. Fetch one goes to the engine: its URL, its server, its index - and its own habits, because an engine remembers queries the way any server remembers what it is asked (an honest topic this lesson only flags). Fetch two begins when you click a result: an ordinary URL fetch, five beats and all, to the page\'s own server - which, note well, may be a stranger to the engine that sent you. The engine found the address; the page answers for itself. Two fetches, two servers, one click between them - and the citizen who can see the join never mistakes the map for the town.' },
    { kind: 'table', caption: 'The two doorways of a fetch, side by side. Same five beats after the doorway; the difference is all in what you type and who answers first.', head: ['The doorway', 'You type', 'Who answers first'], rows: [
      ['the typed URL', 'an address you already know', 'the page\'s own server - one fetch, straight there'],
      ['the search engine', 'words describing what you want', 'the engine\'s index - then a second, ordinary fetch on the click'],
    ] },
    { kind: 'example', title: 'Illustration 9. Which doorway? Say for each errand whether you type a URL or ask a search engine, and why: (i) you want your bank\'s statement page; (ii) you want to know who invented the computer mouse; (iii) you want this year\'s date sheet from the official board site; (iv) you want the citizens\' reviews of a cake shop in a town you are visiting.', steps: [
      'Take the dividing question: do you already hold the ADDRESS, or only the QUESTION?',
      'So, (i) the bank\'s statement page is an address you know (or have bookmarked) - a typed URL, straight to the bank\'s own server.',
      'Now, (ii) who invented the mouse is a question, not an address - ask a search engine, and read its index\'s answers.',
      'And (iii) the board\'s date sheet lives on the official site whose address the board publishes - a typed URL (bookmark it in the exam season), though a search is the honest fallback when the address is forgotten.',
      'Check (iv): reviews of a cake shop in an unfamiliar town are exactly what you cannot know in advance - a search engine\'s errand, then a click to whichever page the results rank.',
      'Hence (i) and (iii) are typed-URL errands, (ii) and (iv) search errands - and every search errand hides a second, ordinary fetch inside it.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note - why the engine feels like the Web', text: 'The engine feels like the whole Web because its index is enormous and its answers arrive in one place. Resist the feeling with the layer census of section 1: the engine is a service on the Web, the Web is a service on the Internet, and the Internet is the infrastructure. When the engine\'s index is stale or its ranking is swayed, the pages themselves are unchanged - the map can err; the town does not.' },
    { kind: 'terms', items: [
      { term: 'search engine', def: 'a service that has crawled and indexed the Web and answers typed queries from its index (google.co.in, bing.com, duckduckgo.com).' },
    ] },

    // ================================================================
    // 7. COOKIES: THE MEMORY PATCHES
    // ================================================================
    { kind: 'heading', text: 'Cookies: the Memory Patches' },
    { kind: 'para', text: 'Recall the property that opened this half of the lesson: HTTP is stateless, and each request stands alone. Live with that property for a moment as a shopkeeper would. A customer walks in, fills a cart, clicks to the next page - and the protocol has already forgotten them; the request for page two is a stranger\'s request, and by the letter of the protocol the cart should evaporate with every click. The Web could not run a shop, a login, or a preferred language on those terms. It needed a memory patch - a small, honest, much-misunderstood one - and in 1994 it got one.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - cookie', text: 'A **cookie** is said to be a small piece of data that a server sends to your browser in a response, which the browser stores and sends back with its later requests to that server. Symbolically: the response carries a note - set this cookie; the browser keeps it in its cookie store; every later request to the same server carries the cookie along - and the stateless protocol acquires a memory, patched on at both ends.' },
    { kind: 'figure', caption: 'The cookie round-trip, in three beats on a sequence diagram. Beat 1, the first visit: the browser\'s request carries no cookie - a stranger\'s - and the server\'s response returns the page with a Set-Cookie note attached. Beat 2, the store: the browser keeps that small piece of data in its cookie store. Beat 3, the next visit: the cookie rides back with the request, and the server remembers - the shopping cart returns. Netscape, 1994, wrote the first cookie software to tell first-time from returning visitors; and the honest limits ride in the footer - a cookie cannot read your hard disk or carry viruses, but it does track, which is why clearing them exists.', svg: cf63CookieSvg() },
    { kind: 'para', text: 'Read the three beats slowly, because every examination question about cookies is one of these three beats wearing a costume. Beat 1: you visit the shop for the first time; your request is anonymous; the server\'s response comes back carrying the page AND a note - set-cookie: visitor=17 - the server\'s way of saying, if you show me this number next time, I will know you. Beat 2: your browser, not you, stores the note - a small piece of data in the cookie store, alongside the notes of every other site you visit, each note bound to the server that wrote it. Beat 3: your next request to that shop carries the note back automatically; the server reads visitor=17, and the stranger has a name again - the cart you filled yesterday is still yours. Set, store, ride back: three beats, one memory.' },
    { kind: 'callout', tone: 'historical', title: 'History - Netscape, 1994', text: 'The first cookie software was written at **Netscape in 1994**, and the problem it solved was exactly the one this section opened with: telling **first-time visitors from returning visitors**. Our own honest retelling: the engineers needed a shop to recognise its customers without making the protocol remember anything, so they pinned the memory on the customer\'s own browser - a note the shop could read on every return. One year after Mosaic put pictures in pages, the pages began to remember who was looking; the two inventions share a birthday decade, and both were Netscape-era work.' },
    { kind: 'para', text: 'Now the honest ledger of what a cookie is NOT, because the folklore outruns the fact. A cookie **cannot read your hard disk**: it is a small piece of DATA, not a program - it cannot run, cannot probe, cannot touch a single file. A cookie **cannot carry viruses**, for the same reason: a virus is instructions, and a cookie carries none. But - and the ledger must balance - a cookie **does track**: the note that remembers your cart also remembers which pages you read, on which days, in which order, and notes written by one site can be read by partners of that site across many pages. This is why every browser offers you the broom: **clearing cookies** empties the store, and every site meets you as a stranger again - the cost being that your logins and carts vanish with the tracking. The citizen holds both truths at once: harmless to the disk, real in the tracking, and yours to clear.' },
    { kind: 'example', title: 'Illustration 10. The two-visit ledger: a shop with no cookie, and the same shop with one. Say exactly what the server knows at each visit in each case.', steps: [
      'Take the no-cookie shop first, and hold the protocol\'s property in view: stateless - each request stands alone.',
      'So, visit 1: the server serves a stranger; visit 2: the server serves a stranger again - the cart from visit 1 is gone, because nothing carried across the gap.',
      'Now, the cookie shop, beat by beat: visit 1 is the stranger\'s visit, and the response carries set-cookie: visitor=17.',
      'So, beat 2 - your browser stores the note in its cookie store, bound to that server.',
      'And visit 2: the request carries visitor=17 back, so the server reads it and remembers - the cart returns, the login holds, the language preference survives.',
      'Check the honesty: the memory lives in the BROWSER\'s store, not in the protocol - HTTP is still stateless; the note is what crosses the gap.',
      'Hence without the cookie the server knows nothing on visit 2 (a stranger, an empty cart), and with it the server knows the visitor by number, the cart, and - the tracking side of the ledger - the pages you read.',
    ] },
    { kind: 'terms', items: [
      { term: 'cookie', def: 'a small piece of data a server sends in a response, the browser stores, and later requests carry back - the memory patch for stateless HTTP (Netscape, 1994).' },
    ] },

    // ================================================================
    // 8. PHISHING: THE LOOKALIKE TRAP
    // ================================================================
    { kind: 'heading', text: 'Phishing: the Lookalike Trap' },
    { kind: 'para', text: 'The last word in the citizen\'s vocabulary is the swindler\'s favourite, and it is named with a straight face: phishing - fishing with a baited hook, spelled with a ph, in the old hacker spelling the era liked. The definition must be precise, because the attack is precise. It is not a break-in; no lock is picked, no firewall is climbed. It is a trick played on the person, not the machine - which is why every technical defence you own sits quietly by while it happens. The fisherman does not attack the river; he waits for the fish to bite.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - phishing', text: '**Phishing** is said to be a social-engineering attack that tricks you into believing you are on your real bank\'s site when you are on the attacker\'s copy - so that you type your credentials into the fake. Symbolically: the attack targets the CITIZEN, not the machine; the fake page is a costume, the urgent email is the hook, and the password you type willingly is the catch.' },
    { kind: 'para', text: 'The costume\'s best stitch is the **lookalike domain**, and you must see it character by character. The real address is my-bank.example.com; the fake is my-bank.examp1e.com. Read them again, slowly, one character at a time: the fake swaps the digit **1 for the letter l** inside the domain - examp1e against example - and nothing else; the two addresses are the same length, look alike at a glance, and name completely different machines. The page behind the fake can be a pixel-perfect copy of the bank\'s own - logos, fonts, that familiar blue - because a page is just HTML, and HTML copies for free. What the swindler cannot copy is the DOMAIN: that belongs to its registrant, and it is the one part of the costume that always fails under a character-by-character read.' },
    { kind: 'callout', tone: 'warn', title: 'Caution - the citizen\'s checklist', text: 'Three moves, in order, every time a page asks for a password. (i) **Read the domain** - character by character, from the last dot backwards, watching for the digit 1 wearing the letter l\'s coat. (ii) **Look for the padlock** - the wrap is necessary, and its absence on a login page is a stop sign. (iii) **Never click through fear** - \'your account will be closed in 24 hours\' is the swindler\'s clock, not your bank\'s; no honest institution conducts its security by countdown.' },
    { kind: 'para', text: 'One more honesty, because a half-true defence is worse than none: the padlock proves the PIPE, not the person. Since the wrap became free and automatic, the swindler\'s copy can wear a padlock too - an encrypted conversation with a criminal is still private, from everyone except you. So the checklist\'s ORDER is the defence: the domain read comes first, because the domain cannot be copied; the padlock comes second, as the necessary wrap; and the refusal to be hurried comes third, because urgency is the tell that survives every costume. This lesson gives you the citizen\'s three moves; the full threat model - the other hooks, the defences, the forensics - belongs to our \'Cybersecurity\' volume, whose doorstep this is.' },
    { kind: 'example', title: 'Illustration 11. Spot the fake: which of these two addresses is the lookalike trap, and by exactly which character? my-bank.example.com and my-bank.examp1e.com. Then run the checklist.', steps: [
      'Take the two addresses and read them character by character, in the checklist\'s first move.',
      'So, the left one spells e-x-a-m-p-l-e - the letter l in the sixth position of the domain\'s first word.',
      'Now, the right one spells e-x-a-m-p-1-e - the DIGIT 1 sitting in the letter\'s place: same length, same look at a glance, a different machine entirely.',
      'Hence my-bank.examp1e.com is the fake - the digit 1 wearing the letter l\'s coat - and my-bank.example.com is the honest pattern.',
      'Check the rest of the costume honestly: the fake page may show the bank\'s logos and even a padlock - a page is HTML and copies for free, and the wrap encrypts any conversation - so neither logo nor padlock settles it.',
      'Therefore the domain read settles it: character by character, the sixth character of example - and never click through the 24-hour fear that arrives with the bait.',
    ] },
    { kind: 'terms', items: [
      { term: 'phishing', def: 'a social-engineering attack that tricks you into typing credentials into a copy of your real site - spotted by the domain, read character by character.' },
    ] },

    // ================================================================
    // 9. THE CITIZEN'S KIT, PACKED
    // ================================================================
    { kind: 'heading', text: 'The Citizen\'s Kit, Packed' },
    { kind: 'para', text: 'Lay the whole lesson on one table and see how few words carry it. The Internet is the infrastructure; the Web is one service on it, and MDN\'s line - the Internet is the backbone of the Web - settles the examination\'s favourite trap. The browser is the window: five in the census, with Edge the honest heir of 1995\'s Internet Explorer, and Mosaic (NCSA, 1993) the first popular graphical one. The URL is the address: 5 top-level parts, an authority of 3 sub-parts, and doors 80, 443 and 53. HTTP is the dance: 2 message kinds, stateless, with 404 as the honest no. HTTPS is the same dance over TLS, and the padlock reports the wrap. The search engine answers from its index when you do not know the address. The cookie patches the statelessness - set, store, ride back - Netscape, 1994. And the phishing costume fails at one character: examp1e. Every number in that paragraph is engine-pinned; every claim is this lesson\'s own.' },
    { kind: 'formula', name: 'The URL grammar', latex: '\\text{URL} = \\text{scheme}://\\text{authority}/\\text{path}?\\text{parameters}\\#\\text{anchor}', note: '5 top-level parts, always in this order - the pinned example: https, www.example.co.in:443, textbook/ch6.htm, q=glassdoor, sec2.' },
    { kind: 'formula', name: 'The authority, expanded', latex: '\\text{authority} = \\text{subdomain}\\;.\\;\\text{domain}\\;:\\;\\text{port}', note: '3 sub-parts inside 1 top-level part: www is the subdomain, example.co.in the domain, 443 the port (untyped ports are assumed).' },
    { kind: 'formula', name: 'The port census', latex: '80 = \\text{HTTP}, \\quad 443 = \\text{HTTPS}, \\quad 53 = \\text{DNS}', note: 'The three doors to carry cold: HTTP\'s 80, HTTPS\'s 443, and DNS\'s 53 - the ladder of lesson 6.2, the first beat of every fetch.' },
    { kind: 'formula', name: 'HTTPS, defined', latex: '\\text{HTTPS} = \\text{HTTP} \\;\\text{over}\\; \\text{TLS}', note: 'The same 2-message dance wrapped in encryption; SSL is the old name that survives in speech; the padlock reports the wrap.' },
    { kind: 'formula', name: 'The cookie round-trip', latex: '\\text{set} \\to \\text{store} \\to \\text{ride back}', note: 'Three beats: the response sets the cookie, the browser stores it, later requests carry it back - the memory patch for stateless HTTP (Netscape, 1994).' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner - how this lesson is asked', text: 'The census of this lesson is examination staple food, asked here in our own exam-style wording - never quoted from any real paper. CUET and the B2 computer-awareness strand ask the distinctions: website against webpage (a collection against one page of it), the web browsers by name (any of the five, with Edge\'s Internet Explorer lineage the honest twist), and what a cookie is (a small piece of data set, stored and returned - data, not a program). Banking and SSC papers ask the short truths: http against https (plain against wrapped, port 80 against 443), and phishing (the social-engineering trick - spot the lookalike domain among four options). Cambridge 9618 and A-level-style asks go one step further and want the anatomy itself: label the parts of a URL (scheme, authority, path, parameters, anchor), name the message kinds of HTTP (request, response), and say what statelessness costs and the cookie repairs. Drill Illustrations 3, 8 and 11 until their answers fall out by themselves.' },

    { kind: 'quiz', title: 'Checkpoint quiz', items: [
      {
        q: 'Which statement draws the citizen\'s first distinction honestly?',
        options: [
          'The Web is the hardware and the Internet is the software that runs it.',
          'The Internet is one service that runs on the World Wide Web.',
          'The Internet is the infrastructure and the Web is one service riding it - MDN\'s line: the Internet is the backbone of the Web.',
          'The Internet and the World Wide Web are two names for the same thing.',
          'The Web is the network of routers and wires, and the Internet is its collection of pages.',
        ],
        answer: 2,
        explain: 'Option C is the distinction this lesson opens with: the Internet is the wires, routers and TCP/IP protocols (lesson 6.2\'s infrastructure), and the Web is one service built on top - pages in HTML, found by URLs, moved by HTTP - with MDN\'s backbone line settling the relation. Option A inverts the halves and mislabels both: neither is the other\'s software. Option B stands the relation on its head - the Web rides the Internet, never the reverse. Option D is the classic examination trap, wrong every time it appears: the two are layers, not synonyms, and email is a different service on the same infrastructure. Option E swaps the definitions wholesale - the routers and wires belong to the Internet, the pages to the Web.',
      },
      {
        q: 'How many top-level parts does a URL have, and what are they?',
        options: [
          '3 - scheme, path and anchor.',
          '5 - scheme, authority, path, parameters and anchor.',
          '4 - scheme, domain, path and anchor.',
          '6 - scheme, subdomain, domain, port, path and anchor.',
          '5 - protocol, subdomain, domain, path and query.',
        ],
        answer: 1,
        explain: 'Option B is the census of equation (1): scheme (https), authority (www.example.co.in:443), path (textbook/ch6.htm), parameters (q=glassdoor), anchor (sec2) - five top-level parts, always in this order. Option A drops the authority and the parameters - the who-and-where and the handed-on input. Option C confuses levels: the domain is one of the authority\'s 3 SUB-parts, not a top-level part, and the parameters are missing. Option D commits the same confusion in the other direction, promoting subdomain, domain and port (the authority\'s 3 sub-parts) to top-level rank alongside their own parent. Option E mixes the syllabus\'s synonyms (protocol for scheme, query for parameters) with sub-domain-level names, producing a list from two different floors of the anatomy.',
      },
      {
        q: 'A page you requested comes back with status 404. What honestly happened?',
        options: [
          'The web server is down and cannot be reached at all.',
          'Your browser does not support the format of the page.',
          'The DNS lookup failed - the name does not exist.',
          'The connection was refused at the server\'s door.',
          'The server heard your request and answered honestly: the path names no page.',
        ],
        answer: 4,
        explain: 'Option E is the honest 404: the fetch reached beat 4, the server received a well-formed request, looked where the path pointed, and the page is simply not there - right door, wrong shelf. Option A describes a machine you cannot even connect to; no response of any kind would come back, let alone one carrying a status. Option B is a rendering matter at beat 5, after a successful response - the server sent something and the browser could not draw it. Option C dies at beat 1, before any server is contacted: a dead name never resolves, so no request is ever sent. Option D would also end the conversation before any HTTP message - a refused connection produces no status line, whereas the 404 IS a response, message 2 of the dance.',
      },
      {
        q: 'HTTPS is best defined as:',
        options: [
          'a replacement protocol that discards HTTP and defines new message kinds.',
          'HTTP with a larger port number and faster transfers.',
          'a cookie-based scheme that remembers users between their requests.',
          'HTTP over TLS - the same request/response dance wrapped in encryption.',
          'a search-engine protocol for crawling and indexing the Web.',
        ],
        answer: 3,
        explain: 'Option D is the definition: HTTPS is HTTP over TLS - Transport Layer Security - the same 2 message kinds and the same statelessness, wrapped so the wire carries ciphertext; the default port moves from 80 to 443 and the padlock reports the wrap. Option A is wrong on the central fact: nothing is discarded and no message kind is added - the dance survives intact inside the envelope. Option B latches onto the port (443, not \"larger\" in any meaningful sense) and invents a speed claim the definition never makes. Option C confuses the memory patch: cookies repair statelessness at the application layer and have nothing to do with the encryption of the pipe. Option E belongs to the search-engine section - crawling and indexing are the engine\'s craft, not a transport protocol.',
      },
      {
        q: 'Which of these addresses is the lookalike trap?',
        options: [
          'my-bank.examp1e.com',
          'www.example.co.in',
          'portal.school.edu.in',
          'www.ncert.nic.in',
          'my-bank.example.com',
        ],
        answer: 0,
        explain: 'Option A is the fake: it swaps the digit 1 for the letter l inside the domain - examp1e against example - the same length, the same look at a glance, and a completely different machine; the page behind it can copy the bank\'s logos and even wear a padlock, but the domain cannot be copied. Option B is the pinned teaching example\'s own domain, an honest registrant\'s name. Option C is the drill URL\'s domain - a school\'s registered name with a portal subdomain, honest at every character. Option D is the syllabus\'s own NCERT domain, honest and port-free. Option E is the real pattern that option A imitates - the letter l in example - which is exactly why the pair must be read character by character, the checklist\'s first move.',
      },
    ] },

    { kind: 'exercises', title: 'Graded exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'State the citizen\'s first distinction in one sentence, quote MDN\'s line on the relation, and say where email belongs.',
            answer: 'Hence the Internet is the infrastructure, the Web is one service riding it, MDN\'s line is the backbone, and email is a different service on the same wires',
            solution: [
              'Take the two definitions and hold the layer question: which one is the ground, which one the building?',
              'So, the Internet is the infrastructure - the wires, routers and TCP/IP protocols of lesson 6.2 - and the Web is one service built on top: pages in HTML, found by URLs, moved by HTTP.',
              'Now, MDN\'s line, verbatim: the Internet is the backbone of the Web - a structure and the thing standing on it, never two names for one thing.',
              'And email belongs with the riders, not the road: a DIFFERENT service on the same infrastructure.',
              'Hence the Internet is the infrastructure, the Web is one service riding it, MDN\'s line is the backbone, and email is a different service on the same wires.',
            ]
          },
          {
            q: 'Write the five-browser census, and add the honest note about Edge\'s lineage.',
            answer: 'Hence the census is Chrome, Firefox, Safari, Opera, Edge - and Edge is Internet Explorer\'s successor, IE being the 1995 browser-war generation',
            solution: [
              'Take the census from the section: exactly 5 names.',
              'So: Chrome, Firefox, Safari, Opera, Edge.',
              'Now, the honest note: Edge is Internet Explorer\'s successor - IE shipped bundled with Windows in the 1995 browser-war generation, and its line continues as Edge.',
              'Check the older syllabus consequence: a question about Internet Explorer is answered honestly by naming the descent, not by dismissing the name.',
              'Hence the census is Chrome, Firefox, Safari, Opera, Edge - and Edge is Internet Explorer\'s successor, IE being the 1995 browser-war generation.',
            ]
          },
          {
            q: 'Dissect https://portal.school.edu.in:443/homework/task2.htm?subject=science#q3 into its 5 top-level parts, split the authority into its 3 sub-parts, and say what the port announces.',
            answer: 'Hence scheme https; authority portal.school.edu.in:443 (subdomain portal, domain school.edu.in, port 443); path homework/task2.htm; parameters subject=science; anchor q3 - and 443 announces HTTPS',
            solution: [
              'Take the drill URL and run equation (1) across it, left to right, cutting at the fixed separators.',
              'So, the scheme is https - everything before the :// - and the authority is portal.school.edu.in:443, everything up to the first slash.',
              'Now, split the authority with equation (2): the subdomain is portal, the domain is school.edu.in, the port is 443.',
              'The path is homework/task2.htm - after the first slash, up to the question mark - and the parameters are subject=science, the anchor q3.',
              'Check the census: 5 top-level parts, 3 sub-parts in the authority, and the port 443 announces HTTPS before the fetch even begins.',
              'Hence scheme https; authority portal.school.edu.in:443 (subdomain portal, domain school.edu.in, port 443); path homework/task2.htm; parameters subject=science; anchor q3 - and 443 announces HTTPS.',
            ],
            figures: [{ caption: 'The solved drill board: the exercise URL with a brace under each of the 5 top-level parts and the authority\'s 3 sub-parts - portal, school.edu.in, 443.', svg: cf63SolUrlBoardSvg() }],
          },
          {
            q: 'State the port census (which door belongs to HTTP, to HTTPS, and to DNS), and say what the browser assumes when no port is typed.',
            answer: 'Hence 80 = HTTP, 443 = HTTPS, 53 = DNS - and an untyped port is assumed from the scheme: 443 for https, 80 for http',
            solution: [
              'Take the three doors from the census line: 80, 443, 53.',
              'So, 80 is HTTP\'s door and 443 is HTTPS\'s - the Web\'s two doors on the server.',
              'Now, 53 is DNS\'s - not a door on the web server but the naming system\'s own, the ladder of lesson 6.2 and the first beat of every fetch.',
              'Check the assumption rule: type no port and the scheme decides - 443 for https, 80 for http - which is why you have never typed one.',
              'Hence 80 = HTTP, 443 = HTTPS, 53 = DNS - and an untyped port is assumed from the scheme: 443 for https, 80 for http.',
            ]
          },
          {
            q: 'Name the four tools of the browser\'s chrome and give the one-line job of each.',
            answer: 'Hence the address bar (accepts a URL, starts the fetch), the back button (one step back through your history), tabs (many independent pages in one window), bookmarks (addresses saved by name for later)',
            solution: [
              'Take the anatomy walk and read the four panels in order.',
              'So, the **address bar** accepts a URL and starts the fetch - the doorway every walk of section 4 begins at.',
              'The **back button** rewinds one step through your own history - the page you were just on.',
              '**Tabs** hold many independent pages at once in one window, each with its own address.',
              'And **bookmarks** save addresses by name, so tomorrow\'s visit needs no re-finding.',
              'Hence the address bar (accepts a URL, starts the fetch), the back button (one step back through your history), tabs (many independent pages in one window), bookmarks (addresses saved by name for later).',
            ]
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Put the five beats of a fetch in their honest order, say which port each beat touches, and state where a typo in the domain dies against a typo in the path.',
            answer: 'Hence DNS lookup (53), TCP connection (80 or 443), HTTP request, HTTP response, render - and the domain typo dies at beat 1, the path typo at beat 4 as the honest 404',
            solution: [
              'Take the five beats and ask what each needs before it can begin.',
              'So, beat 1 is the DNS lookup - the name becomes an IP, riding port 53, lesson 6.2\'s ladder.',
              'Beat 2 is the TCP connection to that IP, at the scheme\'s door - 80 for http, 443 for https.',
              'Now, beats 3 and 4 are the dance itself: the HTTP request (message 1) and the HTTP response (message 2 - the page, or an error).',
              'And beat 5 is the render - the browser draws what came back.',
              'Check the typos against the order: a DOMAIN typo dies at beat 1, the name never resolving; a PATH typo survives to beat 4 and dies as the server\'s honest 404.',
              'Hence DNS lookup (53), TCP connection (80 or 443), HTTP request, HTTP response, render - and the domain typo dies at beat 1, the path typo at beat 4 as the honest 404.',
            ],
            figures: [{ caption: 'The fetch-order strip: five numbered beats with the port each touches - and the two typo funerals marked beneath.', svg: cf63SolFetchStripSvg() }],
          },
          {
            q: 'Sort these four fetches into plain and wrapped, naming the deciding part of each URL: (i) http://cafe.example.in/menu.htm; (ii) https://www.example.co.in:443/textbook/ch6.htm; (iii) http://www.ncert.nic.in/textbook.php; (iv) https://mail.example.org/inbox. Then define HTTPS in one line.',
            answer: 'Hence (i) and (iii) are plain HTTP on door 80, (ii) and (iv) are HTTPS on 443 - sorted by the scheme alone - and HTTPS is HTTP over TLS, the same dance wrapped in encryption',
            solution: [
              'Take the dividing line: the SCHEME decides - http travels plain, https travels wrapped.',
              'So, (i) http://cafe.example.in/menu.htm is plain HTTP, door 80 assumed - readable in transit.',
              '(ii) The pinned example is https, and its typed port 443 agrees with the scheme - the wrap is on.',
              'Now, (iii) the NCERT page is plain http with no port typed, so door 80 is assumed - plain again; and (iv) the mail page is https, wrapped at 443, as mail should always be.',
              'Check the one-line definition: HTTPS is HTTP over TLS - the same request/response dance with the messages wrapped in encryption (SSL is the old name that survives in speech).',
              'Hence (i) and (iii) are plain HTTP on door 80, (ii) and (iv) are HTTPS on 443 - sorted by the scheme alone - and HTTPS is HTTP over TLS, the same dance wrapped in encryption.',
            ],
            figures: [{ caption: 'The sorting panel: plain HTTP against HTTPS, column by column - port, wire, padlock, public Wi-Fi, and the definition.', svg: cf63SolHttpPanelSvg() }],
          },
          {
            q: 'Walk the cookie round-trip in its three beats, say why statelessness forces it, and say what clearing cookies does - and does not do.',
            answer: 'Hence set, store, ride back - forced because HTTP forgets between requests - and clearing empties the store (strangers again), while never touching the hard disk, which cookies cannot read',
            solution: [
              'Take the property first: HTTP is stateless - each request stands alone, so the protocol itself carries no memory across visits.',
              'So, beat 1: the first visit\'s response carries the page AND the Set-Cookie note - the server\'s if-you-show-me-this-number.',
              'Beat 2: the browser, not you, stores the small piece of data in its cookie store, bound to that server.',
              'Now, beat 3: the next request carries the note back automatically, and the server remembers - the cart returns, the login holds.',
              'Check what clearing does: it empties the store, so every site meets you as a stranger again - your logins and carts vanish WITH the tracking.',
              'And what it never needed to protect: cookies are data, not programs - they cannot read the hard disk or carry viruses, so clearing is about tracking, not safety from damage.',
              'Hence set, store, ride back - forced because HTTP forgets between requests - and clearing empties the store (strangers again), while never touching the hard disk, which cookies cannot read.',
            ],
            figures: [{ caption: 'The two-visit ledger: without a cookie every visit is a first visit; with the 1994 patch, the note stores and rides back.', svg: cf63SolCookieLedgerSvg() }],
          },
          {
            q: 'Distinguish the two doorways of a fetch - the typed URL and the search engine - and give the three-name engine census. Why is every search honestly TWO fetches?',
            answer: 'Hence the typed URL goes straight to the page\'s own server, the search goes to the engine\'s index first (google.co.in, bing.com, duckduckgo.com) - and the click that follows is a second, ordinary fetch',
            solution: [
              'Take the dividing question: do you hold the ADDRESS, or only the QUESTION?',
              'So, the typed URL is the address doorway: the five beats run straight to the page\'s own server - one fetch.',
              'The search engine is the question doorway: you type words, and the engine answers from the index its crawl has already built.',
              'Now, the census: google.co.in, bing.com, duckduckgo.com - three names, all engines, none of them the Web itself.',
              'Check the two-fetch honesty: fetch one goes to the ENGINE\'s own servers; the click on a result starts fetch two, an ordinary URL fetch to the page\'s own server.',
              'Hence the typed URL goes straight to the page\'s own server, the search goes to the engine\'s index first (google.co.in, bing.com, duckduckgo.com) - and the click that follows is a second, ordinary fetch.',
            ]
          },
          {
            q: 'A colleague says \"the 404 means the Internet is down\". Correct them precisely: what is a 404, what does it NOT mean, and at which beat of the fetch does it arrive?',
            answer: 'Hence the 404 is the server\'s honest page-not-found answer at beat 4 - it means the path names no page, not that the network, the connection or the server is broken',
            solution: [
              'Take the claim apart: \"the Internet is down\" describes beat 1 or 2 failing - no name, no pipe, no message at all.',
              'So, what a 404 actually is: a RESPONSE - message 2 of the dance - whose status number says the path names no page.',
              'Now, when it arrives: at beat 4, after the DNS lookup (beat 1) and the TCP connection (beat 2) have both succeeded and the request (beat 3) has been heard.',
              'Check what it does NOT mean: the network worked, the connection worked, the server understood you perfectly - it looked where you asked, and the shelf is empty.',
              'Hence the 404 is the server\'s honest page-not-found answer at beat 4 - it means the path names no page, not that the network, the connection or the server is broken.',
            ]
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'EXAM-STYLE. Classify the ten items as infrastructure or service, naming the dividing question you applied: the Web; an email message; a router; an HTTP request; an optical fibre; a webpage; the TCP/IP suite; a video call; a search engine\'s index; the DNS system.',
            answer: 'Hence 4 infrastructure (the router, the optical fibre, the TCP/IP suite, the DNS system) and 6 service (the Web, the email message, the HTTP request, the webpage, the video call, the search engine\'s index), by the one question: does the thing carry cargo, or is it the cargo',
            solution: [
              'Take the dividing question from section 1: does the thing CARRY cargo, or IS it the cargo?',
              'So, the carriers - infrastructure, 4 members: the router (a machine of the road system), the optical fibre (the physical media), the TCP/IP suite (the rulebook of the carrying), and the DNS system (the naming service of the infrastructure itself, lesson 6.2\'s ladder).',
              'Now, the cargo - services riding the backbone, 6 members: the Web (the fleet of linked pages), the email message (email\'s cargo), the HTTP request (the Web\'s own mover speaking), the webpage (one page of the fleet), the video call (another rider), and the search engine\'s index (a service\'s possession, stored on its own servers).',
              'Check the traps: the DNS system is infrastructure even though it is a service in the everyday sense - it serves the network itself, not the citizen\'s errands; the search engine\'s index is service-side even though it feels like a map of everything.',
              'Hence 4 infrastructure (the router, the optical fibre, the TCP/IP suite, the DNS system) and 6 service (the Web, the email message, the HTTP request, the webpage, the video call, the search engine\'s index), by the one question: does the thing carry cargo, or is it the cargo.',
            ]
          },
          {
            q: 'EXAM-STYLE. The phishing pair: given my-bank.example.com and my-bank.examp1e.com, identify the fake, name the exact character that gives it away, and run the citizen\'s checklist - including the honest limit of the padlock.',
            answer: 'Hence my-bank.examp1e.com is the fake - the digit 1 for the letter l, the sixth character - and the checklist reads the domain first, checks the padlock second (it proves the pipe, not the person), and never clicks through fear',
            solution: [
              'Take the checklist\'s first move: read the domain character by character, from the last dot backwards.',
              'So, the honest pattern spells e-x-a-m-p-l-e; the suspect spells e-x-a-m-p-1-e - the digit 1 in the letter\'s place, one character of difference, and a different machine entirely.',
              'Now, the honest limit of the padlock: the wrap proves the PIPE, not the person - the fake can wear one too, since encryption is a seal on the envelope, not a character reference.',
              'Check the third move: never click through fear - the 24-hour countdown is the swindler\'s clock, not the bank\'s.',
              'Hence my-bank.examp1e.com is the fake - the digit 1 for the letter l, the sixth character - and the checklist reads the domain first, checks the padlock second (it proves the pipe, not the person), and never clicks through fear.',
            ],
            figures: [{ caption: 'The spot-the-fake panel: the honest pattern against the lookalike, the one-character tell, and the three-move checklist beneath.', svg: cf63SolPhishPanelSvg() }],
          },
          {
            q: 'EXAM-STYLE. Using the dated beats - Mosaic 1993, Netscape\'s cookies 1994, Internet Explorer 1995 - compute: the two consecutive gaps; the span of the triplet; and the years from each landmark to this chapter\'s year, 2026.',
            answer: 'Hence the gaps are 1 and 1 (three consecutive years), and the spans to 2026 are 33 years from Mosaic, 32 from Netscape\'s cookies, 31 from Internet Explorer',
            solution: [
              'Take the three pinned years in order: 1993, 1994, 1995.',
              'So, the gaps: 1994 - 1993 = 1 (cookies one year after Mosaic) and 1995 - 1994 = 1 (IE one year after cookies).',
              'Now, the span of the triplet: 1995 - 1993 = 2 years covering all three landmarks - three consecutive years, the browser era\'s opening chord.',
              'Check the spans to 2026: 2026 - 1993 = 33 years from Mosaic, 2026 - 1994 = 32 from Netscape\'s cookies, 2026 - 1995 = 31 from Internet Explorer.',
              'Hence the gaps are 1 and 1 (three consecutive years), and the spans to 2026 are 33 years from Mosaic, 32 from Netscape\'s cookies, 31 from Internet Explorer.',
            ]
          },
          {
            q: 'Census arithmetic on the pinned URL https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2: count the top-level parts, the sub-parts of the authority, and the characters; then re-count the visible top-level parts of its short form https://www.example.co.in/ and say what the missing port means.',
            answer: 'Hence 5 top-level parts, 3 sub-parts, 63 characters; and the short form shows 3 of the 5 (scheme, authority, path), with the untyped port meaning the assumed 443',
            solution: [
              'Take the pinned URL and run the two equations: the grammar of (1), then the authority split of (2).',
              'So, the top-level census: scheme, authority, path, parameters, anchor - 5 parts.',
              'The authority census: subdomain, domain, port - 3 sub-parts inside the one authority.',
              'Now, count the characters of the whole string: 63 - one address, no two working URLs naming the same page.',
              'Check the short form https://www.example.co.in/: scheme, authority and the bare-slash path are visible - 3 of the 5 - with parameters and anchor absent, and no port typed.',
              'So, the missing port means the scheme\'s default is assumed: 443 for https (80 would belong to plain http).',
              'Hence 5 top-level parts, 3 sub-parts, 63 characters; and the short form shows 3 of the 5 (scheme, authority, path), with the untyped port meaning the assumed 443.',
            ]
          },
          {
            q: 'EXAM-STYLE. The full walk: you type the fresh URL https://shop.example.co.in/cart into the address bar of a browser you have used before. Order the five beats with their ports, state what the TLS wrap changes, say what the cookie adds on your second visit - and finish with the citizen\'s move if the padlock shows but the domain reads shop.examp1e.co.in.',
            answer: 'Hence DNS (53), TCP at 443, request, response, render; the wrap turns the wire\'s text to ciphertext; the cookie makes visit 2 remembered; and the examp1e domain - digit 1 for letter l - is the fake, whatever the padlock says',
            solution: [
              'Take the five beats with the ports pinned: DNS lookup on 53 (beat 1), TCP connection at 443 - the scheme is https (beat 2), HTTP request (beat 3), HTTP response (beat 4), render (beat 5).',
              'So, the TLS wrap changes one thing: the wire carries ciphertext instead of the request and response in plain text - the dance itself is untouched.',
              'Now, the cookie: visit 1\'s response sets it, the browser stores it, and visit 2\'s request carries it back - the cart survives the statelessness.',
              'Check the ending move: the domain reads shop.examp1e.co.in - the digit 1 wearing the letter l\'s coat inside examp1e.',
              'So the citizen\'s verdict: the page is the FAKE, whatever the padlock says - the wrap proves the pipe, not the person - and the 24-hour fear, if any arrives, is the swindler\'s clock.',
              'Hence DNS (53), TCP at 443, request, response, render; the wrap turns the wire\'s text to ciphertext; the cookie makes visit 2 remembered; and the examp1e domain - digit 1 for letter l - is the fake, whatever the padlock says.',
            ]
          },
        ],
      },
    ] },
  ],
}

/* part-cf6R - lesson 6.R 'Unit 6 Completion Review' (the chapter-closing review).
   Harvest numbers carried VERBATIM from the three content seats (6.1-6.3);
   the review invents no numbers, it restates the chapter at bench speed.
   Helpers prefixed cf6R so the four chapter parts never collide. */

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

export const chapter6: Chapter = {
  number: 6,
  slug: 'connecting-computers',
  title: 'Connecting Computers',
  summary: 'The network idea at first-meeting level: why two machines want to talk, LANs and WANs, the Internet as a network of networks, the Web as one application riding it, and the vocabulary (IP, DNS, browsers) a citizen of the field must own — the theory hands off to Computer Networks.',
  status: 'complete',
  lessons: [
    lesson61, lesson62, lesson63, lesson6R,
  ],
  plannedLessons: [],
}
