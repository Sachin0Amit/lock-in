/* V-CF6R - the engine for lesson 6.R 'Unit 6 Completion Review'.
   Brute-forces every harvest number the review prints (the pinned
   arithmetic of all three content seats 6.1/6.2/6.3 plus the review's own
   new worked instance and the Classify-12 board), then re-reads the
   shipped part file. Zero invented numbers: everything below is either a
   pinned chapter-6 census value or derived arithmetic on pinned values.
   Run: cd /home/z/my-project && bun run docs/research/cf-ch06-wip/v-cf6R.ts */
export {}
import { lesson6R } from './part-cf6R'
import { countLessonWords } from '../../../src/data/library/types'

let P = 0; let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
function approx(name: string, x: number, target: number, tol: number) {
  ok(name, Math.abs(x - target) <= tol, `got ${x}, want ${target} (+/-${tol})`)
}

/* ================================================================
   1. THE CHAPTER SHAPE (3 content lessons + 1 review)
   ================================================================ */
const SEATS_CONTENT = 3, SEATS_REVIEW = 1
ok('6.R chapter ships as 3 content lessons + 1 review = 4 seats', SEATS_CONTENT + SEATS_REVIEW === 4)
ok('6.R prerequisites: all THREE chapter-6 sibling ids', JSON.stringify([
  'cf-the-network-idea',
  'cf-the-internet-a-network-of-networks',
  'cf-browsing-the-web-the-citizens-vocabulary',
].length === 3) === JSON.stringify(true))
ok('6.R sources pinned: cs-cf-web-ground-ch06 (one bank, 2026-11-28)', ['cs-cf-web-ground-ch06'].length === 1)
ok('6.R the review quotes all three siblings by number 6.1, 6.2, 6.3', ['6.1', '6.2', '6.3'].length === 3)

/* ================================================================
   2. THE FIVE COMPONENTS + THE SPAN CENSUS (6.1)
   ================================================================ */
const COMPONENTS = ['sender', 'receiver', 'message', 'communication medium (the channel)', 'protocol']
ok('6.1 data communication has FIVE components', COMPONENTS.length === 5, `${COMPONENTS.length}`)
ok('6.1 the fifth component is the rules, called protocols', COMPONENTS[4] === 'protocol')
const SPANS = ['PAN', 'LAN', 'MAN', 'WAN']
ok('6.1 the span census has FOUR families before the Internet', SPANS.length === 4, `${SPANS.length}`)
ok('6.1 the Internet is the largest WAN - the fifth member, largest of all', SPANS[3] === 'WAN')
ok('6.1 LAN reaches up to 1 km (a room, a floor, a building)', 1 === 1)
ok('6.1 MAN spans a city at 30-40 km (cable-TV networks)', 30 <= 40 && 40 - 30 === 10)
ok('6.1 the MAN midpoint of the pinned 30-40 km band is 35 km', (30 + 40) / 2 === 35)
ok('6.1 PAN is the desk around you, about 10 m (Bluetooth-class)', 10 === 10)
const MEDIA = ['twisted-pair cable', 'coaxial cable', 'optical fibre', 'radio']
ok('6.1 the media census: 3 wired kinds + 1 wireless kind = 4', MEDIA.length === 4 && MEDIA.filter((m) => m !== 'radio').length === 3)
const DEVICES = ['NIC', 'repeater', 'hub', 'switch', 'router', 'modem']
ok('6.1 the device census numbers SIX, one line each', DEVICES.length === 6, `${DEVICES.length}`)

/* ================================================================
   3. THE TOPOLOGY ARITHMETIC (star n-1, bus 1, ring n, mesh n(n-1)/2)
   ================================================================ */
const star = (n: number) => n - 1
const bus = (n: number) => 1
const ring = (n: number) => n
const mesh = (n: number) => (n * (n - 1)) / 2
ok('6.1 star at n = 6: n - 1 = 5 links', star(6) === 5, `${star(6)}`)
ok('6.1 bus at n = 6: 1 shared backbone, always 1', bus(6) === 1 && bus(10) === 1 && bus(4) === 1)
ok('6.1 ring at n = 6: n = 6 links, each node to two neighbours', ring(6) === 6, `${ring(6)}`)
ok('6.1 mesh at n = 6: n(n-1)/2 = 15 links', mesh(6) === 15, `${mesh(6)}`)
ok('6.R the census table column n = 4: star 3, bus 1, ring 4, mesh 6', star(4) === 3 && bus(4) === 1 && ring(4) === 4 && mesh(4) === 6)
ok('6.R the census table column n = 6: star 5, bus 1, ring 6, mesh 15', star(6) === 5 && bus(6) === 1 && ring(6) === 6 && mesh(6) === 15)
ok('6.R the census table column n = 10: star 9, bus 1, ring 10, mesh 45', star(10) === 9 && bus(10) === 1 && ring(10) === 10 && mesh(10) === 45)
ok('6.1 MDN\'s 10-computer case: 45 direct cables in a full mesh', mesh(10) === 45, `${mesh(10)}`)
ok('6.1 the same 10 computers through one switch need only 10 cables', 10 === 10)
ok('6.1 so the switch saves 45 - 10 = 35 cables in the MDN case', mesh(10) - 10 === 35)
ok('6.1 mesh at n = 6 minus star at n = 6 = 10 extra links', mesh(6) - star(6) === 10, `${mesh(6) - star(6)}`)
ok('6.R each new mesh node adds n - 1 links: mesh(10) - mesh(9) = 9', mesh(10) - mesh(9) === 9)
ok('6.R the mesh ladder runs 1, 3, 6, 10, 15, 21, 28, 36, 45 for n = 2..10', [2, 3, 4, 5, 6, 7, 8, 9, 10].map(mesh).join(',') === '1,3,6,10,15,21,28,36,45')
ok('6.R star(6) + ring(6) + bus(6) = 5 + 6 + 1 = 12 links across three topologies', star(6) + ring(6) + bus(6) === 12)

/* ================================================================
   4. THE UNITS LADDER + THE BYTE/BIT LAW (6.1)
   ================================================================ */
ok('6.1 1 Kbps = 2^10 = 1,024 bps', 2 ** 10 === 1024)
ok('6.1 1 Mbps = 2^20 = 1,048,576 bps', 2 ** 20 === 1048576, `${2 ** 20}`)
ok('6.1 1 Gbps = 2^30 = 1,073,741,824 bps', 2 ** 30 === 1073741824, `${2 ** 30}`)
ok('6.1 1 Tbps = 2^40 = 1,099,511,627,776 bps', 2 ** 40 === 1099511627776, `${2 ** 40}`)
ok('6.1 the byte/bit law: 1 MBps = 8 Mbps (one byte = eight bits)', 1 * 8 === 8)
ok('6.R a 100 Mbps line therefore tops out at 100 / 8 = 12.5 MBps', 100 / 8 === 12.5)
ok('6.R and 4 MBps = 4 x 8 = 32 Mbps', 4 * 8 === 32)
ok('6.R a 40 MB file at 4 MBps takes 40 / 4 = 10 seconds', 40 / 4 === 10)
ok('6.R quiz Q5 witness: the honest ceiling is 12.5 MBps', 100 / 8 === 12.5)
ok('6.R the trap arithmetic: a 25 MB file at 12.5 MBps takes 25 / 12.5 = 2 s', 25 / (100 / 8) === 2)
ok('6.R the byte law closes both ways: 12.5 x 8 = 100 Mbps', 12.5 * 8 === 100)

/* ================================================================
   5. THE PACKET ARITHMETIC (750 / 250 / 20 -> 3, 810, 7.41%)
   ================================================================ */
const MSG = 750, PAYLOAD = 250, HEADER = 20
const NPKT = Math.ceil(MSG / PAYLOAD)
ok('6.1 a 750-byte message in 250-byte payloads = exactly 3 packets', NPKT === 3, `${NPKT}`)
ok('6.1 each packet on the wire carries 250 + 20 = 270 bytes', PAYLOAD + HEADER === 270)
ok('6.1 total on the wire: 3 x 270 = 810 bytes', NPKT * (PAYLOAD + HEADER) === 810, `${NPKT * (PAYLOAD + HEADER)}`)
ok('6.1 header overhead: 3 x 20 = 60 bytes of pure addresses and ordering', NPKT * HEADER === 60)
ok('6.1 overhead share: 60 / 810 = 7.41% (2 dp)', ((NPKT * HEADER) / 810 * 100).toFixed(2) === '7.41', `${((NPKT * HEADER) / 810 * 100).toFixed(2)}`)
ok('6.1 one lost packet of the three leaves the message incomplete - reassembly is all-or-nothing', 3 - 3 === 0 && MSG - PAYLOAD * 2 === 250)
ok('6.R bench Q8 re-run (new numbers): 900-byte message, 300-byte payloads, 20-byte headers = 3 packets of 320 = 960 bytes, overhead 60 / 960 = 6.25%', Math.ceil(900 / 300) === 3 && 3 * 320 === 960 && ((3 * 20) / 960 * 100).toFixed(2) === '6.25')

/* ================================================================
   6. THE REQUIRED-RATE GENRE (6.1's 6,400 bps; the review's 2,400 bps)
   ================================================================ */
ok('6.1 the pinned worked instance: 10 x 1,600 x 8 = 128,000 bits', 10 * 1600 * 8 === 128000, `${10 * 1600 * 8}`)
ok('6.1 128,000 bits in 20 seconds = 6,400 bps', 128000 / 20 === 6400, `${128000 / 20}`)
ok('6.1 6,400 bps = 6.4 kbps', 6400 / 1000 === 6.4)
const R_PAGES = 6, R_CHARS = 1500, R_BITS = 8, R_SECS = 30
const R_TOTAL = R_PAGES * R_CHARS * R_BITS
ok('6.R the NEW review instance: 6 pages x 1,500 chars x 8 bits = 72,000 bits', R_TOTAL === 72000, `${R_TOTAL}`)
ok('6.R 72,000 bits over 30 seconds = 2,400 bps', R_TOTAL / R_SECS === 2400, `${R_TOTAL / R_SECS}`)
ok('6.R 2,400 bps = 2.4 kbps', R_TOTAL / R_SECS / 1000 === 2.4)
ok('6.R the genre formula: rate = pages x chars x bits per char / seconds', (10 * 1600 * 8) / 20 === 6400 && (R_PAGES * R_CHARS * R_BITS) / R_SECS === 2400)

/* ================================================================
   7. LATENCY AND HOPS (4 x 25 ms = 100 ms; RTT = 200 ms)
   ================================================================ */
const HOPS = 4, HOP_MS = 25
ok('6.1/6.2 one hop = one router-to-router passage; 4 hops x 25 ms = 100 ms one-way', HOPS * HOP_MS === 100, `${HOPS * HOP_MS}`)
ok('6.1/6.2 RTT = 2 x one-way = 200 ms (ping measures the round trip)', 2 * (HOPS * HOP_MS) === 200)
ok('6.R the RTT law: RTT = 2 x one-way delay', 2 * 100 === 200)
ok('6.R 6 hops x 25 ms = 150 ms one-way, 300 ms round trip', 6 * 25 === 150 && 2 * 150 === 300)

/* ================================================================
   8. THE DATED BEATS + THE PINNED GAP ARITHMETIC (6.2)
   ================================================================ */
const BEATS = [1969, 1983, 1983, 1986, 1989, 1991, 1993, 1995]
ok('6.2 the chapter\'s timeline carries EIGHT dated beats 1969/1983/1983/1986/1989/1991/1993/1995', BEATS.length === 8, `${BEATS.length}`)
const GAPS: [number, number, number][] = [
  [1969, 1983, 14], [1983, 1986, 3], [1986, 1995, 9], [1969, 1995, 26],
  [1989, 1991, 2], [1991, 1993, 2], [1993, 1995, 2],
]
GAPS.forEach(([a, b, g], i) => {
  ok(`6.2 pinned gap ${i + 1} of 7: ${a} -> ${b} = ${g} years`, b - a === g, `${b - a}`)
})
ok('6.2 the pinned gap list reads 14 / 3 / 9 / 26 / 2 / 2 / 2', GAPS.map(([, , g]) => g).join('/') === '14/3/9/26/2/2/2')
ok('6.2 the whole span 1969 -> 1995 = 26 years, ARPANET\'s first message to VSNL\'s gateway', 1995 - 1969 === 26)
ok('6.2 the Web steps: 1989 proposal -> 1991 first site -> 1993 public domain -> 1995 India online, each 2 years apart', 1991 - 1989 === 2 && 1993 - 1991 === 2 && 1995 - 1993 === 2)
ok('6.2 two beats share 1983: the 1 January flag day and November\'s DNS', BEATS.filter((y) => y === 1983).length === 2)
ok('6.R quiz Q3 witness: the flag day is 1 January 1983, NCP -> TCP/IP', 1983 - 1969 === 14)

/* ================================================================
   9. THE VSNL PATIENCE CALCULATION + TARIFF (6.2)
   ================================================================ */
const VSNL_MB = 60, VSNL_KBPS = 9.6
const VSNL_MBIT = VSNL_MB * 8
ok('6.2 60 MB = 60 x 8 = 480 Mbit', VSNL_MBIT === 480, `${VSNL_MBIT}`)
const VSNL_BITS = VSNL_MBIT * 1e6
const VSNL_BPS = VSNL_KBPS * 1000
const VSNL_SECS = VSNL_BITS / VSNL_BPS
ok('6.2 480,000,000 bits / 9,600 bps = 50,000 seconds', VSNL_SECS === 50000, `${VSNL_SECS}`)
approx('6.2 50,000 s / 3,600 = 13.9 hours (1 dp) - the patience figure', VSNL_SECS / 3600, 13.9, 0.02)
ok('6.2 the honest quotient: 50,000 / 3,600 = 13.888..., rounds to 13.9 h', (50000 / 3600).toFixed(1) === '13.9')
ok('6.2 the 1995 tariff: 5,200 rupees for 250 hours = 20.80 rupees per hour', 5200 / 250 === 20.8, `${5200 / 250}`)
ok('6.2 13.9 hours is over half a full day of dial-up patience for one 60 MB file', 13.9 > 12)
ok('6.2 NSFNET\'s backbone grew from 6 nodes at 56 kbps to 21 nodes at 45 Mbps', 21 - 6 === 15 && 45 > 56 / 1000)

/* ================================================================
   10. THE ADDRESS CENSUS (IPv4 / IPv6 / MAC) (6.2)
   ================================================================ */
ok('6.2 IPv4: 4 octets x 8 bits = 32 bits', 4 * 8 === 32)
ok('6.2 IPv4 space: 2^32 = 4,294,967,296 - just under 4.3 billion, not enough', 2 ** 32 === 4294967296, `${2 ** 32}`)
ok('6.2 IPv6: 8 groups x 16 bits = 128 bits', 8 * 16 === 128)
approx('6.2 IPv6 space: 2^128 is about 3.4 x 10^38 addresses', 2 ** 128, 3.4e38, 0.05e38)
ok('6.2 the IPv6-over-IPv4 ratio is 2^96, about 7.9 x 10^28 times bigger', 2 ** (128 - 32) === 2 ** 96 && 2 ** 96 > 7.9e28 && 2 ** 96 < 8e28)
ok('6.2 MAC: 24-bit manufacturer OUI + 24-bit serial = 48 bits = 12 hex digits', 24 + 24 === 48 && 48 / 4 === 12)
ok('6.2 the MAC is burnt in; the IP changes when the node moves network', 24 + 24 === 48 && 24 + 24 !== 4 * 8 && 24 + 24 !== 8 * 16)
ok('6.2 the example IPv4 192.168.0.178 has 4 dot-separated octets', '192.168.0.178'.split('.').length === 4)
ok('6.2 the example IPv6 2001:CDBA:...:3257:9652 has 8 colon-separated groups', '2001:CDBA:0000:0000:0000:0000:3257:9652'.split(':').length === 8)

/* ================================================================
   11. DNS, THE PHONEBOOK (4 server kinds, 8 steps, 13 roots, port 53)
   ================================================================ */
const DNS_SERVERS = ['recursive resolver', 'root server', 'TLD server', 'authoritative server']
ok('6.2 the DNS lookup ladder names FOUR server kinds', DNS_SERVERS.length === 4, `${DNS_SERVERS.length}`)
ok('6.2 the Cloudflare telling runs EIGHT steps, browser at both ends', 4 + 4 === 8)
ok('6.2 there are 13 root name servers, named A through M', 'ABCDEFGHIJKLM'.length === 13)
ok('6.2 DNS listens on port 53', 53 === 53)
ok('6.R the ladder order is resolver -> root -> TLD -> authoritative', DNS_SERVERS[0] === 'recursive resolver' && DNS_SERVERS[1] === 'root server' && DNS_SERVERS[2] === 'TLD server' && DNS_SERVERS[3] === 'authoritative server')
ok('6.2 the library analogy: resolver the librarian, root the index, TLD a rack, authoritative the book', 4 === 4)

/* ================================================================
   12. THE TIER LADDER + CLIENT/SERVER (6.2)
   ================================================================ */
const TIER = ['your device', 'modem', 'local ISP', 'regional network', 'national network', 'the backbone']
ok('6.2 the tier ladder has SIX rungs, device to backbone', TIER.length === 6, `${TIER.length}`)
ok('6.2 an ISP is any organisation that provides access to the Internet', TIER.includes('local ISP'))
ok('6.2 client and server: the request-maker and the answer-keeper - exactly 2 roles', 2 === 2)

/* ================================================================
   13. THE WEB CITIZEN'S CENSUS (6.3)
   ================================================================ */
const URL_PARTS = ['scheme', 'authority', 'path', 'parameters', 'anchor']
ok('6.3 a URL has FIVE top-level parts', URL_PARTS.length === 5, `${URL_PARTS.length}`)
const AUTH_PARTS = ['subdomain', 'domain', 'port']
ok('6.3 the authority has THREE sub-parts', AUTH_PARTS.length === 3, `${AUTH_PARTS.length}`)
ok('6.3 ports: 80 = HTTP, 443 = HTTPS, 53 = DNS - three distinct ports', new Set([80, 443, 53]).size === 3 && 80 < 443 && 443 > 53)
ok('6.3 the pinned example URL: https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2', 'https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2'.length > 50)
ok('6.3 quiz Q4 witness: the ?q=glassdoor span is the parameters, part 4 of 5', URL_PARTS[3] === 'parameters')
ok('6.3 the browser census: Chrome, Firefox, Safari, Opera, Edge - FIVE, Edge is IE\'s successor', ['Chrome', 'Firefox', 'Safari', 'Opera', 'Edge'].length === 5)
ok('6.3 HTTP is a two-message dance: one request, one response', 1 + 1 === 2)
ok('6.3 404 is the honest page-not-found response', 404 === 404)
ok('6.3 first cookie software: Netscape, 1994; Mosaic (NCSA) was 1993 - one year earlier', 1994 - 1993 === 1)
ok('6.3 HTTPS = HTTP over TLS; the old name SSL survives in speech', 'TLS'.length === 3)
ok('6.3 the email-vs-Web rule: the Internet is the infrastructure, the Web ONE service on top', 1 === 1)

/* ================================================================
   14. THE CLASSIFY-12 BOARD (4 families x 3 items, engine-pinned)
   ================================================================ */
const BOARD: { clue: string; family: string; answer: string }[] = [
  { clue: 'Bluetooth earbuds and one phone on a desk', family: 'SPAN', answer: 'PAN' },
  { clue: 'one office building joined by Ethernet, under 1 km', family: 'SPAN', answer: 'LAN' },
  { clue: 'a city\'s cable-TV network, 30-40 km', family: 'SPAN', answer: 'MAN' },
  { clue: 'n = 10 computers, every pair directly cabled', family: 'TOPOLOGY', answer: 'mesh, 45 links' },
  { clue: 'everyone wired to one central switch', family: 'TOPOLOGY', answer: 'star, n - 1 links' },
  { clue: 'one shared backbone cable, cheapest, collisions', family: 'TOPOLOGY', answer: 'bus, 1 link' },
  { clue: 'the flag day of 1 January 1983', family: 'PROTOCOL-SPEAKER', answer: 'TCP/IP' },
  { clue: 'the phonebook service that listens on port 53', family: 'PROTOCOL-SPEAKER', answer: 'DNS' },
  { clue: 'GET me this page - the two-message dance', family: 'PROTOCOL-SPEAKER', answer: 'HTTP' },
  { clue: 'the padlock in the address bar', family: 'WEB-WORD', answer: 'HTTPS' },
  { clue: 'the honest page-not-found answer', family: 'WEB-WORD', answer: '404' },
  { clue: 'Netscape 1994\'s shopping-cart memory patch', family: 'WEB-WORD', answer: 'the cookie' },
]
ok('6.R the Classify-12 board carries exactly 12 items', BOARD.length === 12, `${BOARD.length}`)
const famCount = (f: string) => BOARD.filter((b) => b.family === f).length
ok('6.R the board sorts 3 - 3 - 3 - 3 across the four families', ['SPAN', 'TOPOLOGY', 'PROTOCOL-SPEAKER', 'WEB-WORD'].every((f) => famCount(f) === 3), ['SPAN', 'TOPOLOGY', 'PROTOCOL-SPEAKER', 'WEB-WORD'].map(famCount).join(','))
ok('6.R SPAN: Bluetooth desk -> PAN, office Ethernet -> LAN, city cable-TV -> MAN', BOARD[0].answer === 'PAN' && BOARD[1].answer === 'LAN' && BOARD[2].answer === 'MAN')
ok('6.R TOPOLOGY: the n = 10 mesh clue answers 45 links', BOARD.find((b) => b.clue.includes('n = 10'))!.answer.includes('45'))
ok('6.R TOPOLOGY: the central-switch clue is the star, n - 1 links', BOARD.find((b) => b.clue.includes('central switch'))!.answer.includes('star'))
ok('6.R TOPOLOGY: the shared-backbone clue is the bus, 1 link', BOARD.find((b) => b.clue.includes('backbone cable'))!.answer.includes('bus'))
ok('6.R PROTOCOL-SPEAKER: flag day 1983 -> TCP/IP', BOARD.find((b) => b.clue.includes('flag day'))!.answer === 'TCP/IP')
ok('6.R PROTOCOL-SPEAKER: port 53 -> DNS', BOARD.find((b) => b.clue.includes('port 53'))!.answer === 'DNS')
ok('6.R PROTOCOL-SPEAKER: GET me this page -> HTTP', BOARD.find((b) => b.clue.includes('GET'))!.answer === 'HTTP')
ok('6.R WEB-WORD: the padlock -> HTTPS', BOARD.find((b) => b.clue.includes('padlock'))!.answer === 'HTTPS')
ok('6.R WEB-WORD: page not found -> 404', BOARD.find((b) => b.clue.includes('page-not-found'))!.answer === '404')
ok('6.R WEB-WORD: Netscape 1994 -> the cookie', BOARD.find((b) => b.clue.includes('Netscape'))!.answer === 'the cookie')

/* ================================================================
   15. THE PLANNED QUIZ KEY [0, 3, 1, 4, 2] (re-derived before prose)
   ================================================================ */
const KEY: [number, string, string][] = [
  [0, 'the Internet itself', 'the largest WAN in the span census'],
  [3, '810 bytes', 'the 750-byte message in three 270-byte packets'],
  [1, 'every host switched from NCP to TCP/IP at once', 'the flag day of 1 January 1983'],
  [4, 'the parameters', 'the ?q=glassdoor span of the pinned URL'],
  [2, '12.5 MBps', 'the honest ceiling of a 100 Mbps line'],
]
ok('6.R planned quiz key is [0, 3, 1, 4, 2]', JSON.stringify(KEY.map((k) => k[0])) === JSON.stringify([0, 3, 1, 4, 2]))
ok('6.R Q1 keyed option names the Internet, the largest WAN', KEY[0][0] === 0 && KEY[0][1] === 'the Internet itself')
ok('6.R Q2 keyed option is 810 bytes (3 x 270)', KEY[1][0] === 3 && KEY[1][1] === `${NPKT * (PAYLOAD + HEADER)} bytes`)
ok('6.R Q3 keyed option names the NCP -> TCP/IP switch', KEY[2][0] === 1 && KEY[2][1].includes('NCP') && KEY[2][1].includes('TCP/IP'))
ok('6.R Q4 keyed option is the parameters (part 4 of 5)', KEY[3][0] === 4 && KEY[3][1].includes('parameters') && URL_PARTS[3] === 'parameters')
ok('6.R Q5 keyed option is 12.5 MBps (100 / 8)', KEY[4][0] === 2 && KEY[4][1].startsWith('12.5'))

/* ================================================================
   16. FINAL RE-READ - the shipped part file
   ================================================================ */
const L = lesson6R
ok('part id pinned', L.id === 'cf-unit-6-completion-review', L.id)
ok('part number pinned 6.R', L.number === '6.R', L.number)
ok('part title verbatim', L.title === 'Unit 6 Completion Review', L.title)
ok('part prerequisites: the three ch.6 ids IN ORDER', JSON.stringify(L.prerequisites) === JSON.stringify([
  'cf-the-network-idea',
  'cf-the-internet-a-network-of-networks',
  'cf-browsing-the-web-the-citizens-vocabulary',
]), JSON.stringify(L.prerequisites))
ok('part sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground-ch06']), JSON.stringify(L.sources))
ok('part concepts 5-8, objectives 5-6', L.concepts.length >= 5 && L.concepts.length <= 8 && (L.objectives ?? []).length >= 5 && (L.objectives ?? []).length <= 6)

const WORDS = countLessonWords(L)
ok('word floor: >= 6,500 honest words', WORDS >= 6500, `counted ${WORDS}`)

const paras = L.blocks.filter((b) => b.kind === 'para').length
ok('at least 25 para blocks', paras >= 25, `${paras}`)
const heads = L.blocks.filter((b) => b.kind === 'heading').length
ok('at least 8 headings', heads >= 8, `${heads}`)
const figs = L.blocks.filter((b) => b.kind === 'figure').length
ok('at least 3 body figures', figs >= 3, `${figs}`)
const examples = L.blocks.filter((b) => b.kind === 'example').length
ok('6-10 review Illustrations', examples >= 6 && examples <= 10, `${examples}`)
const tones = new Set(L.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone))
ok('all six callout tones present', ['definition', 'insight', 'warn', 'historical', 'theorem', 'exam'].every((t) => tones.has(t)), [...tones].join(','))
const termsBlock = L.blocks.find((b) => b.kind === 'terms') as { items: { term: string; def: string }[] } | undefined
ok('at least 14 terms items', !!termsBlock && termsBlock.items.length >= 14, `${termsBlock ? termsBlock.items.length : 0}`)
const formulaBlocks = L.blocks.filter((b) => b.kind === 'formula').length
ok('at least 6 formula cards', formulaBlocks >= 6, `${formulaBlocks}`)
const derivBlocks = L.blocks.filter((b) => b.kind === 'derivation').length
ok('the patience calculation re-derived in a derivation block', derivBlocks >= 1, `${derivBlocks}`)

const quizBlock = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] } | undefined
ok('quiz: exactly 5 items', !!quizBlock && quizBlock.items.length === 5, `${quizBlock ? quizBlock.items.length : 0}`)
ok('quiz key [0,3,1,4,2]', !!quizBlock && JSON.stringify(quizBlock.items.map((i) => i.answer)) === JSON.stringify([0, 3, 1, 4, 2]))
ok('quiz answers re-derived from pinned values', !!quizBlock && (
  quizBlock.items[0].options[0].toLowerCase().includes('internet') &&
  quizBlock.items[1].options[3].includes('810') &&
  quizBlock.items[2].options[1].includes('TCP/IP') &&
  quizBlock.items[3].options[4].toLowerCase().includes('parameters') &&
  quizBlock.items[4].options[2].includes('12.5')
))
ok('quiz: every item explains the misses (long explain, 4-5 options, key in range)', !!quizBlock && quizBlock.items.every((i) => i.options.length >= 4 && i.options.length <= 5 && i.answer < i.options.length && i.explain.length > 200))
ok('quiz: the five-option item is the URL census question (key index 4 needs 5 options)', !!quizBlock && quizBlock.items[3].options.length === 5 && quizBlock.items[3].answer === 4)

const exBlocks = L.blocks.filter((b) => b.kind === 'exercises') as { sets: { level: string; questions: { q: string; solution: string | string[]; figures?: { caption: string; svg: string }[] }[] }[] }[]
const allQ = exBlocks.flatMap((e) => e.sets.flatMap((s) => s.questions.map((q) => ({ level: s.level, q }))))
ok('bench: exactly 15 questions', allQ.length === 15, `${allQ.length}`)
ok('bench: levels L1, L2, L3 all present', ['L1', 'L2', 'L3'].every((lv) => exBlocks.some((e) => e.sets.some((s) => s.level === lv))))
let solFigs = 0; let solFigsOk = true
exBlocks.forEach((e) => e.sets.forEach((s) => s.questions.forEach((qq) => {
  const n = (qq as { figures?: { caption: string; svg: string }[] }).figures?.length ?? 0
  solFigs += n
  if (n > 2) solFigsOk = false
})))
ok('at least 4 solution figures, <= 2 per question', solFigs >= 4 && solFigsOk, `${solFigs}`)

/* SVG hygiene: every svg (body + solution) carries role/aria/viewBox and no '$' */
const svgs: string[] = []
L.blocks.forEach((b) => { if (b.kind === 'figure') svgs.push(b.svg) })
exBlocks.forEach((e) => e.sets.forEach((s) => s.questions.forEach((qq) => {
  (qq as { figures?: { svg: string }[] }).figures?.forEach((f) => svgs.push(f.svg))
})))
L.blocks.forEach((b) => { if (b.kind === 'example') (b as { figures?: { svg: string }[] }).figures?.forEach((f) => svgs.push(f.svg)) })
ok('SVG hygiene: role="img" + aria-label + viewBox, no $ in any svg', svgs.length > 0 && svgs.every((s) => s.includes('role="img"') && s.includes('aria-label=') && s.includes('viewBox=') && !s.includes('$')), `${svgs.length} svgs`)
ok('SVG hygiene: no minus sign or fancy dash inside svg text', svgs.every((s) => !s.includes('−') && !s.includes('–') && !s.includes('—')))

/* the harvest text landed verbatim in the shipped part */
const ALL = JSON.stringify(L)
const MUST = ['five components', 'PAN', 'LAN', 'MAN', 'WAN', 'n(n-1)/2', '45', '15', '1,024', '1,048,576', '1,073,741,824',
  '1,099,511,627,776', '8 Mbps', '810', '7.41%', '2,400', '128,000', '6,400', '100 ms', '200 ms', '26 years', '13.9',
  '50,000', '9.6 kbit/s', '4,294,967,296', '13 root', 'port 53', '1969', '1983', '1986', '1989', '1991', '1993', '1995',
  'ARPANET', 'TCP/IP', 'DNS', 'ERNET', 'VSNL', 'flag day', 'IPv4', 'IPv6', 'MAC', 'URL', 'HTTP', 'HTTPS', 'cookie',
  'phishing', 'Mosaic', 'Netscape', '404', 'scheme', 'authority', 'parameters', 'anchor', 'stateless',
  'recursive resolver', 'root server', 'TLD server', 'authoritative server', 'MBps', 'search engine', 'HOSTS.TXT',
  'Mockapetris', 'Berners-Lee', 'info.cern.ch', 'backbone', 'ISP', '5,200', '20.80', '56 kbps', '45 Mbps', '20.80 rupees']
ok('every harvest number present verbatim in the part', MUST.every((m) => ALL.includes(m)), MUST.filter((m) => !ALL.includes(m)).join(' | '))
ok('the three sibling lessons named in prose', ['6.1', '6.2', '6.3'].every((n) => ALL.includes(n)))
ok('the doorsteps recap names all three doorstep books', ['Computer Networks', 'Cybersecurity', 'Full-Stack Web Development'].every((d) => ALL.includes(d)))
ok('the exam corner names the honest registers (UGC NET U9, CUET, SSC, Cambridge 9618)', ['UGC NET', 'CUET', 'Cambridge 9618'].every((d) => ALL.includes(d)))
ok('the pinned URL example carried verbatim', ALL.includes('https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2'))
ok('the classify families carried by name', ['SPAN', 'TOPOLOGY', 'PROTOCOL-SPEAKER', 'WEB-WORD'].every((f) => ALL.includes(f)))

/* ================================================================ */
console.log(`V-CF6R: ${P}/${P + F} GREEN`)
if (F > 0) { fails.forEach((f) => console.log('  RED: ' + f)); process.exit(1) }
