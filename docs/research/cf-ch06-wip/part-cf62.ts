import type { Lesson } from '../../../src/data/library/types'

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
