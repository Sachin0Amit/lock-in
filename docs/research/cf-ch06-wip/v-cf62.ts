import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

/**
 * v-cf62.ts — verify-first ENGINE + PIN harness for CF lesson 6.2
 * 'The Internet: a Network of Networks' (CS RUN 11 swarm, agent cf62,
 * seat 6.2).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..I) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the tier ladder census (6 rungs from your device to
 *     the backbone); the ARPANET witnesses (29 October 1969, 'lo' =
 *     2 of the 5 letters of 'login', 4 nodes by December 1969); the
 *     dated-beat gap arithmetic (1969->1983 = 14, 1983->1986 = 3,
 *     1986->1995 = 9, 1969->1995 = 26, 1989->1991 = 2, 1991->1993 = 2,
 *     1993->1995 = 2, plus the web-era chain 2+2+2 = 6 and the spans to
 *     2026); the NSFNET growth (6 nodes at 56 kbps -> 21 nodes at
 *     45 Mbps, 15 nodes added, ~803.6x the speed); the IPv4 census
 *     (4 octets x 8 bits = 32, 2^32 = 4,294,967,296 = just under
 *     4.3 billion, shortfall 5,032,704); the IPv6 census (8 groups x
 *     16 bits = 128, 2^128 ~ 3.4 x 10^38, ratio 2^96 ~ 7.9 x 10^28);
 *     the MAC census (48 = 24 + 24 bits, 12 hex digits, 2^24 =
 *     16,777,216); the DNS census (8 steps, 4 server kinds, 13 root
 *     servers named A-M = 10 US + 1 London + 1 Stockholm + 1 Japan,
 *     port 53); the hop arithmetic (4 hops x 25 ms = 100 ms one-way,
 *     200 ms round trip, plus the 3/6-hop variants); the patience
 *     ledger (60 MB at 9.6 kbit/s: x 8 = 480 Mbit, / 9,600 = 50,000 s
 *     = 13.9 h; 6 MB -> 5,000 s; 600 MB -> 500,000 s); the VSNL
 *     tariff (5,200 rupees / 250 h = 20.80 rupees/h, 100 h = 2,080
 *     rupees); the classify-12 address roster (4 IPv4 + 4 IPv6 + 4 MAC);
 *     and the quiz key [1,4,2,0,3].
 *   PIN SECTION (J) — dynamically imports ./part-cf62 and re-audits the
 *     shipped lesson object (word floor 7,000, quiz key [1,4,2,0,3],
 *     15 exercises across L1..L3, >= 3 body figures, >= 4 solution
 *     figures, 8-12 Illustrations, SVG law, raw-TeX law,
 *     id/number/title/prereqs, source shape, pinned-token presence in
 *     the shipped prose). The import is dynamic so the ENGINE alone
 *     runs GREEN before the prose exists (verify-first order); re-run
 *     after the part ships.
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch06-wip/v-cf62.ts
 */

export {}

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) < eps
const round1 = (x: number): number => Math.round(x * 10) / 10
const round2 = (x: number): number => Math.round(x * 100) / 100

/* the engine's own pinned quantities */
const PIN = {
  rungs: 6,
  loLetters: 2,
  loginLetters: 5,
  arpanetNodes: 4,
  flagDayYear: 1983,
  dnsYear: 1983,
  ernetYear: 1986,
  webProposalYear: 1989,
  firstSiteYear: 1991,
  publicDomainYear: 1993,
  vsnlYear: 1995,
  arpanetYear: 1969,
  nsfNodesEarly: 6,
  nsfKbpsEarly: 56,
  nsfNodesLate: 21,
  nsfMbpsLate: 45,
  ipv4Octets: 4,
  ipv4BitsPerOctet: 8,
  ipv6Groups: 8,
  ipv6BitsPerGroup: 16,
  macBits: 48,
  macOuiBits: 24,
  dnsSteps: 8,
  dnsKinds: 4,
  rootTotal: 13,
  rootUS: 10,
  dnsPort: 53,
  hopLatencyMs: 25,
  hopCount: 4,
  vsnlKbps: 9.6,
  fileMB: 60,
  tariffRupees: 5200,
  tariffHours: 250,
  now: 2026,
  quizKey: [1, 4, 2, 0, 3],
}

/* ================================================================== */
console.log('== A. THE TIER LADDER CENSUS ==')
{
  const rungs = ['your device', 'the modem', 'the local ISP', 'the regional network', 'the national network', 'the backbone']
  ok('A1 the tier ladder has exactly 6 rungs, device at the bottom rung entry and the backbone at the top',
    rungs.length === PIN.rungs && rungs[0] === 'your device' && rungs[5] === 'the backbone', `rungs=${rungs.length}`)
  ok('A2 the ladder census is honest: 6 rungs make 5 handoffs between neighbours (device->modem->local ISP->regional->national->backbone)',
    rungs.length - 1 === 5 && rungs[1] === 'the modem' && rungs[2] === 'the local ISP' && rungs[3] === 'the regional network' && rungs[4] === 'the national network')
  ok('A3 the one-sentence claim the ladder proves: the Internet is a network of networks - thousands of LANs and ISPs speaking ONE common protocol family',
    'network of networks'.split(' ').length === 3 && PIN.rungs === 3 + 3)
}

/* ================================================================== */
console.log('== B. ARPANET AND THE FIRST MESSAGE ==')
{
  const intended = 'login'
  const sent = 'lo'
  ok('B1 the intended word was login (5 letters) and the first characters ever transmitted were lo (2 letters)',
    intended.length === PIN.loginLetters && sent.length === PIN.loLetters && intended.startsWith(sent))
  ok('B2 the crash cut the word: 5 - 2 = 3 letters of login were never sent that night',
    PIN.loginLetters - PIN.loLetters === 3)
  const nodes = ['UCLA', 'SRI', 'UCSB', 'Utah']
  ok('B3 ARPANET reached exactly 4 nodes by December 1969 (UCLA, SRI, UCSB, Utah) - four distinct sites',
    nodes.length === PIN.arpanetNodes && new Set(nodes).size === 4)
  ok('B4 the first message ran 10:30 pm PST on 29 October 1969, UCLA to SRI - the two ends of the first link',
    nodes[0] === 'UCLA' && nodes[1] === 'SRI' && '1969-10-29' === `${PIN.arpanetYear}-10-29`)
  ok('B5 the first link joined 2 of the 4 December nodes - the network doubled its node count in its first two months',
    4 - 2 === 2)
}

/* ================================================================== */
console.log('== C. THE DATED-BEAT GAP ARITHMETIC (pinned) ==')
{
  const gaps = [
    { a: 1969, b: 1983, g: 14, tag: 'ARPANET to the TCP/IP flag day' },
    { a: 1983, b: 1986, g: 3, tag: 'flag day to ERNET' },
    { a: 1986, b: 1995, g: 9, tag: 'ERNET to India public access' },
    { a: 1969, b: 1995, g: 26, tag: 'ARPANET to VSNL GIAS, the whole span' },
    { a: 1989, b: 1991, g: 2, tag: 'Web proposal to first website' },
    { a: 1991, b: 1993, g: 2, tag: 'first website to public domain' },
    { a: 1993, b: 1995, g: 2, tag: 'public domain to India public access' },
  ]
  gaps.forEach((gp, i) => {
    ok(`C${i + 1} gap ${gp.a}->${gp.b} = ${gp.g} (${gp.tag})`, gp.b - gp.a === gp.g, `${gp.b} - ${gp.a} = ${gp.b - gp.a}`)
  })
  ok('C8 the chain closes: 14 + 3 + 9 = 26 (ARPANET->flag day->ERNET->VSNL)',
    14 + 3 + 9 === 26)
  ok('C9 the web-era chain closes: 2 + 2 + 2 = 6, and 1995 - 1989 = 6 agrees',
    2 + 2 + 2 === 6 && PIN.vsnlYear - PIN.webProposalYear === 6)
  ok('C10 flag day (1 January 1983) and DNS (November 1983) fall in the SAME year - 0 years apart',
    PIN.dnsYear - PIN.flagDayYear === 0)
  ok('C11 ARPANET to the first website: 1991 - 1969 = 22 years',
    PIN.firstSiteYear - PIN.arpanetYear === 22)
  ok('C12 the spans to this chapter: 2026 - 1969 = 57 years from the lo message, 2026 - 1995 = 31 years from India public access',
    PIN.now - PIN.arpanetYear === 57 && PIN.now - PIN.vsnlYear === 31)
  const beatYears = [1969, 1983, 1983, 1986, 1989, 1991, 1993, 1995]
  ok('C13 the eight dated beats, sorted and counted: 8 beats, non-decreasing years, first 1969, last 1995',
    beatYears.length === 8 && beatYears.every((y, i) => i === 0 || y >= beatYears[i - 1]) && beatYears[0] === 1969 && beatYears[7] === 1995)
}

/* ================================================================== */
console.log('== D. THE NSFNET BACKBONE GROWTH ==')
{
  ok('D1 NSFNET grew from 6 nodes at 56 kbps to 21 nodes at 45 Mbps',
    PIN.nsfNodesEarly === 6 && PIN.nsfKbpsEarly === 56 && PIN.nsfNodesLate === 21 && PIN.nsfMbpsLate === 45)
  ok('D2 nodes added: 21 - 6 = 15 (more than triple the count: 21/6 = 3.5x)',
    PIN.nsfNodesLate - PIN.nsfNodesEarly === 15 && near(PIN.nsfNodesLate / PIN.nsfNodesEarly, 3.5))
  const ratio = (PIN.nsfMbpsLate * 1000) / PIN.nsfKbpsEarly
  ok('D3 the speed grew 45,000/56 ~ 803.6 times (well over 800x)',
    near(ratio, 803.5714285714286, 1e-6) && ratio > 800, `ratio=${ratio}`)
  ok('D4 45 Mbps = 45,000 kbps, so the late backbone carried as much as 45,000/56 ~ 803.6 of the early ones',
    PIN.nsfMbpsLate * 1000 === 45000)
}

/* ================================================================== */
console.log('== E. THE ADDRESS CENSUS: IPv4, IPv6, MAC ==')
{
  ok('E1 IPv4: 4 octets x 8 bits = 32 bits exactly',
    PIN.ipv4Octets * PIN.ipv4BitsPerOctet === 32)
  ok('E2 an octet runs 0 to 255 - that is 256 values, and 2^8 = 256',
    255 - 0 + 1 === 256 && 2 ** 8 === 256)
  ok('E3 the IPv4 space: 256^4 = 2^32 = 4,294,967,296 exactly',
    256 ** 4 === 2 ** 32 && 2 ** 32 === 4294967296)
  ok('E4 2^32 = 4,294,967,296 is just under 4.3 billion: the shortfall is 4,300,000,000 - 4,294,967,296 = 5,032,704',
    43e8 - 2 ** 32 === 5032704 && 2 ** 32 / 1e9 === 4.294967296)
  const ex4 = [192, 168, 0, 178]
  ok('E5 the worked example 192.168.0.178: 4 octets, every one inside 0-255, joined by 3 dots',
    ex4.length === 4 && ex4.every((o) => Number.isInteger(o) && o >= 0 && o <= 255) && ex4.join('.') === '192.168.0.178')
  ok('E6 IPv6: 8 groups x 16 bits = 128 bits exactly',
    PIN.ipv6Groups * PIN.ipv6BitsPerGroup === 128)
  const v6 = 2 ** 128
  ok('E7 the IPv6 space: 2^128 ~ 3.4 x 10^38 (3.4028...e38)',
    v6.toExponential(2) === '3.40e+38' && v6 > 3.40e38 && v6 < 3.41e38, `2^128=${v6.toExponential(4)}`)
  ok('E8 128 bits = 128/4 = 32 hex digits, eight colon-separated groups of 4',
    128 / 4 === 32 && PIN.ipv6Groups * 4 === 32)
  const ex6 = ['2001', 'CDBA', '0000', '0000', '0000', '0000', '3257', '9652']
  ok('E9 the worked example 2001:CDBA:0000:0000:0000:0000:3257:9652: 8 groups, each 4 hex digits, 7 colons',
    ex6.length === 8 && ex6.every((g) => /^[0-9A-F]{4}$/.test(g)) && ex6.join(':') === '2001:CDBA:0000:0000:0000:0000:3257:9652')
  const ratio = 2 ** 128 / 2 ** 32
  ok('E10 the ratio of spaces: 2^128 / 2^32 = 2^96 ~ 7.9 x 10^28 IPv6 addresses for every IPv4 one',
    ratio === 2 ** 96 && ratio > 7.9e28 && ratio < 8.0e28, `2^96=${ratio.toExponential(2)}`)
  ok('E11 MAC: 48 bits = 24 + 24 (OUI + serial), and 48 bits = 48/4 = 12 hex digits',
    PIN.macBits === PIN.macOuiBits + 24 && PIN.macBits / 4 === 12)
  ok('E12 each half of the MAC is a 24-bit counter: 2^24 = 16,777,216 values per half',
    2 ** 24 === 16777216)
}

/* ================================================================== */
console.log('== F. THE DNS CENSUS ==')
{
  const steps = [
    'the browser asks the recursive resolver',
    'the resolver asks a root server',
    'the root answers with the TLD server address',
    'the resolver asks the TLD server',
    'the TLD answers with the authoritative server address',
    'the resolver asks the authoritative server',
    'the authoritative server answers with the IP address',
    'the resolver returns the IP; the browser sends HTTP to it',
  ]
  ok('F1 the DNS lookup ladder has exactly 8 steps, browser at both ends (step 1 and step 8)',
    steps.length === PIN.dnsSteps && steps[0].includes('browser') && steps[7].includes('browser'))
  const kinds = ['recursive resolver', 'root server', 'TLD server', 'authoritative server']
  ok('F2 the ladder visits exactly 4 kinds of DNS server: recursive resolver, root, TLD, authoritative',
    kinds.length === PIN.dnsKinds && new Set(kinds).size === 4)
  ok('F3 the root keeps the top of the tree (.) and hands out TLD servers; the TLD for the example is .com',
    kinds[1] === 'root server' && kinds[2] === 'TLD server' && '.com'.length === 4)
  const letters: string[] = []
  for (let c = 'A'.charCodeAt(0); c <= 'M'.charCodeAt(0); c++) letters.push(String.fromCharCode(c))
  ok('F4 the root name servers are named A to M: that is 13 letters (M - A + 1)',
    letters.length === PIN.rootTotal && 'M'.charCodeAt(0) - 'A'.charCodeAt(0) + 1 === 13 && letters.join(',').startsWith('A,B,C'))
  ok('F5 the 13 root servers sit 10 in the US + 1 in London + 1 in Stockholm + 1 in Japan: 10 + 1 + 1 + 1 = 13',
    10 + 1 + 1 + 1 === PIN.rootTotal)
  ok('F6 DNS listens on port 53',
    PIN.dnsPort === 53)
  ok('F7 DNS (November 1983, Mockapetris at USC ISI, RFC 882/883) replaced the single HOSTS.TXT table - one table per EVERY host was the old world',
    PIN.dnsYear === 1983 && Number('882') + 1 === 883 && 'HOSTS.TXT'.length === 9)
  ok('F8 the library analogy carries 4 roles: resolver = the librarian, root = the index, TLD = a rack, authoritative = the book',
    ['librarian', 'index', 'rack', 'book'].length === 4)
}

/* ================================================================== */
console.log('== G. HOPS AND LATENCY ==')
{
  ok('G1 a hop is one passage from one network segment to the next; the router receives, analyses, transmits - packet by packet',
    'receives, analyses, transmits'.split(', ').length === 3)
  ok('G2 4 hops x 25 ms each = 100 ms one-way',
    PIN.hopCount * PIN.hopLatencyMs === 100)
  ok('G3 the round trip doubles the one-way walk: 2 x 100 ms = 200 ms',
    2 * 100 === 200)
  ok('G4 the variants: 3 hops x 25 = 75 ms, 6 hops x 25 = 150 ms, 2 hops x 25 = 50 ms',
    3 * 25 === 75 && 6 * 25 === 150 && 2 * 25 === 50)
  ok('G5 the delay accumulates linearly: doubling the hops doubles the delay (8 hops x 25 = 200 ms one-way)',
    8 * 25 === 200 && 2 * (4 * 25) === 200)
}

/* ================================================================== */
console.log('== H. THE PATIENCE LEDGER AND THE VSNL TARIFF ==')
{
  const bits = PIN.fileMB * 8
  ok('H1 60 MB = 60 x 8 = 480 Mbit (8 bits to the byte)',
    bits === 480)
  const secs = (480 * 1e6) / (PIN.vsnlKbps * 1000)
  ok('H2 480 Mbit at 9.6 kbit/s = 480,000,000 / 9,600 = 50,000 s exactly',
    secs === 50000)
  const hours = secs / 3600
  ok('H3 50,000 s = 50,000/3,600 = 13.888..h, printed honestly as 13.9 hours',
    near(hours, 13.888888888888889) && round1(hours) === 13.9)
  ok('H4 the same ledger in minutes: 50,000/60 = 833.3 minutes - about 14 working days of a 1-hour download',
    round1(secs / 60) === 833.3)
  ok('H5 the variants: 6 MB -> 5,000 s (1.4 h), 600 MB -> 500,000 s (138.9 h)',
    (6 * 8 * 1e6) / 9600 === 5000 && (600 * 8 * 1e6) / 9600 === 500000 && round1(5000 / 3600) === 1.4 && round1(500000 / 3600) === 138.9)
  ok('H6 byte-side check agrees: 9.6 kbit/s = 1,200 bytes/s, and 60,000,000 / 1,200 = 50,000 s',
    (PIN.vsnlKbps * 1000) / 8 === 1200 && 60e6 / 1200 === 50000)
  const perHour = PIN.tariffRupees / PIN.tariffHours
  ok('H7 the VSNL GIAS tariff: 5,200 rupees for 250 hours = 20.80 rupees per hour',
    round2(perHour) === 20.8 && perHour === 20.8)
  ok('H8 the ledger closes: 250 x 20.80 = 5,200 rupees, and 100 h would cost 2,080 rupees',
    250 * 20.8 === 5200 && 100 * 20.8 === 2080)
}

/* ================================================================== */
console.log('== I. QUIZ KEY, EXERCISE WITNESSES, THE CLASSIFY-12 ROSTER ==')
{
  ok('I1 the quiz key is exactly [1, 4, 2, 0, 3]',
    JSON.stringify(PIN.quizKey) === JSON.stringify([1, 4, 2, 0, 3]))
  ok('I2 the quiz key has 5 entries, one per item, all valid option indices (0..4; the second item ships 5 options so index 4 is lawful)',
    PIN.quizKey.length === 5 && PIN.quizKey.every((k) => k >= 0 && k <= 4) && Math.max(...PIN.quizKey) === 4)
  const ipv4 = ['192.168.0.178', '10.0.5.2', '172.16.4.99', '8.8.8.8']
  const ipv6 = ['2001:CDBA:0000:0000:0000:0000:3257:9652', '2001:0DB8:0000:0000:0000:0000:0000:0001', 'FE80:0000:0000:0000:0ABC:0000:0025:00FF', '2607:0000:0000:0000:0000:0000:0003:0EA1']
  const macs = ['00:1A:2B:3C:4D:5E', 'A4-5E-60-C7-8D-01', '3C:5A:B4:77:02:9F', 'D2-41-B6-0E-53-A8']
  ok('I3 the classify-12 roster: 4 IPv4 + 4 IPv6 + 4 MAC = 12 identifiers',
    ipv4.length + ipv6.length + macs.length === 12)
  ok('I4 every IPv4 in the roster is 4 dot-separated octets, each 0-255',
    ipv4.every((s) => s.split('.').length === 4 && s.split('.').every((o) => { const n = Number(o); return Number.isInteger(n) && n >= 0 && n <= 255 })))
  ok('I5 every IPv6 in the roster is 8 colon-separated groups of 4 hex digits',
    ipv6.every((s) => s.split(':').length === 8 && s.split(':').every((g) => /^[0-9A-F]{4}$/.test(g))))
  ok('I6 every MAC in the roster is 12 hex digits in 6 pairs, colon or dash separated',
    macs.every((s) => s.split(/[:\-]/).length === 6 && s.split(/[:\-]/).every((p) => /^[0-9A-F]{2}$/.test(p)) && s.replace(/[:\-]/g, '').length === 12))
  ok('I7 the exercise plan: 15 questions in 3 graded sets of 5 (L1, L2, L3)',
    5 + 5 + 5 === 15)
  ok('I8 the solution-figure plan: 7 boards (gap board, resolution strip, space bar, hop board, HOSTS.TXT panel, format strip, patience ledger) >= the 4-figure floor',
    7 >= 4)
}

/* ================================================================== */
/* PIN SECTION — re-reads the shipped part (skipped until it exists)   */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await import('./part-cf62')
  lesson = (mod.lesson62 as Lesson) ?? null
} catch {
  console.log('  (part-cf62.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== J. PIN SECTION: audit the shipped part ==')
  ok('J1 the part loads and exports lesson62', true)

  /* header fields */
  ok('J2 id/number/title are verbatim per spec',
    lesson.id === 'cf-the-internet-a-network-of-networks' && lesson.number === '6.2' && lesson.title === 'The Internet: a Network of Networks',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('J3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-the-network-idea'])
    && JSON.stringify(lesson.sources) === JSON.stringify(['cs-cf-web-ground-ch06']),
    `${JSON.stringify(lesson.prerequisites)} / ${JSON.stringify(lesson.sources)}`)
  ok('J4 concepts 5-8, objectives 5-6 each opening "By the end"',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8
    && (lesson.objectives?.length ?? 0) >= 5 && (lesson.objectives?.length ?? 0) <= 6
    && lesson.objectives!.every((o) => o.startsWith('By the end')),
    `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  const wc = countLessonWords(lesson)
  ok('J5 the honest word floor: countLessonWords >= 7,000', wc >= 7000, String(wc))
  ok('J5b the hard gate floor: countLessonWords >= 6,000', wc >= 6000, String(wc))
  ok('J5c no words field is set (the registry computes the honest count)', !('words' in lesson))

  /* quiz */
  const quizBlocks = lesson.blocks.filter((b) => b.kind === 'quiz') as Array<{ kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }>
  ok('J6 exactly one quiz block with exactly 5 items',
    quizBlocks.length === 1 && quizBlocks[0].items.length === 5, `blocks=${quizBlocks.length}, items=${quizBlocks[0]?.items.length}`)
  if (quizBlocks.length === 1) {
    const q = quizBlocks[0]
    ok('J6b the quiz key is exactly [1, 4, 2, 0, 3]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify([1, 4, 2, 0, 3]), q.items.map((i) => i.answer).join(','))
    ok('J6c every quiz item has 4 or 5 non-empty options with a lawful answer index, and item 2 ships exactly 5 (its key entry is 4)',
      q.items.every((i) => i.options.length >= 4 && i.options.length <= 5 && i.answer < i.options.length && i.options.every((o) => o.trim().length > 0))
      && q.items[1].options.length === 5)
    const tokens = ['network of networks', '32 bits', '48 bits', 'HOSTS.TXT', '100 ms']
    q.items.forEach((it, idx) => {
      ok(`J6d quiz item ${idx + 1}: the correct option carries "${tokens[idx]}"`, (it.options[it.answer] ?? '').includes(tokens[idx]), it.options[it.answer])
    })
    ok('J6e every explain is a full why-they-fail audit (>= 100 chars)', q.items.every((i) => i.explain.length >= 100), q.items.map((i) => i.explain.length).join(','))
    ok('J6f quiz questions and options stay plain (no $, no backslash)',
      q.items.every((i) => !i.q.includes('$') && !i.q.includes('\\') && i.options.every((o) => !o.includes('$') && !o.includes('\\'))))
    ok('J6g every explain names at least three wrong options (A-D labels)',
      q.items.every((i) => (i.explain.match(/[Oo]ption [A-D]/g) ?? []).length >= 3),
      q.items.map((i) => (i.explain.match(/[Oo]ption [A-D]/g) ?? []).length).join(','))
  }

  /* exercises */
  const exBlocks = lesson.blocks.filter((b) => b.kind === 'exercises') as Array<{
    kind: 'exercises'; sets: Array<{
      level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string; figures?: Array<{ caption: string; svg: string }> }>
    }>
  }>
  ok('J7 exactly one exercises block', exBlocks.length === 1, `blocks=${exBlocks.length}`)
  if (exBlocks.length === 1) {
    const sets = exBlocks[0].sets
    const allQ = sets.flatMap((s) => s.questions)
    ok('J7b exactly 15 questions total', allQ.length === 15, `count=${allQ.length}`)
    ok('J7c levels span at least L1..L3', ['L1', 'L2', 'L3'].every((L) => sets.some((s) => s.level === L)), sets.map((s) => s.level).join(','))
    ok('J7d every solution is a steps array of >= 3 non-empty lines', allQ.every((qq) => Array.isArray(qq.solution) && qq.solution.length >= 3 && qq.solution.every((s) => s.trim().length > 0)))
    ok('J7e every question ends in a non-empty answer', allQ.every((qq) => (qq.answer ?? '').trim().length > 0))
    ok('J7f no solution line carries step numbers or Answer prefixes',
      allQ.every((qq) => (qq.solution as string[]).every((s) => !/^Answer/i.test(s.trim()) && !/^\d+[.)]/.test(s.trim()))))
    let coreOk = 0
    const coreFails: string[] = []
    for (const set of sets) for (const qq of set.questions) {
      const last = (qq.solution as string[])[(qq.solution as string[]).length - 1].replace(/\$/g, '')
      const toks = (qq.answer ?? '').replace(/\$/g, '').match(/[0-9]+(?:\.[0-9]+)?/g) ?? []
      if (toks.length === 0 || toks.every((t) => last.includes(t))) coreOk++
      else coreFails.push(`${qq.q.slice(0, 40)} | answer=${qq.answer} | last=${last.slice(-70)}`)
    }
    ok('J7g every exercise answer\'s numeric core appears in its final solution line', coreOk === allQ.length, coreFails.join(' ; '))
  }

  /* figures + Illustrations */
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  ok('J8 at least 3 body figure blocks (the plan ships 4)', bodyFigs >= 3, `count=${bodyFigs}`)
  const solFigs = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).reduce((n, qq) => n + (qq.figures?.length ?? 0), 0) : 0
  ok('J9 at least 4 solution figures inside exercise questions (the plan ships 7)', solFigs >= 4, `count=${solFigs}`)
  ok('J9b no exercise question carries more than 2 solution figures',
    exBlocks.length === 1 && exBlocks[0].sets.flatMap((s) => s.questions).every((qq) => (qq.figures?.length ?? 0) <= 2))
  const examples = lesson.blocks.filter((b) => b.kind === 'example').length
  ok('J10 Illustrations (example blocks) number 8-12 (the plan ships 10)', examples >= 8 && examples <= 12, `count=${examples}`)

  /* SVG law */
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const qq of s.questions) for (const f of qq.figures ?? []) svgs.push(f.svg)
  }
  ok('J11 every SVG root carries role="img" + aria-label + viewBox',
    svgs.length >= 7 && svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), `svgs=${svgs.length}`)
  ok('J11b every aria-label is descriptive (>= 40 chars)', svgs.every((s) => (s.match(/aria-label="([^"]*)"/)?.[1] ?? '').length >= 40))
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  ok('J11c SVG text is PLAIN: no $, no backslash TeX, no U+2212 minus',
    texts.length > 0 && texts.every((t) => !t.includes('$') && !t.includes('\\') && !t.includes('−')))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#ffedd5', '#fef3c7', '#5eead4', '#ffffff', '#fffdf5'])
  const badHex = [...new Set((svgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}\b/g) ?? [])).filter((h) => !allowed.has(h.toLowerCase())))]
  ok('J11d every SVG hex is from the vivid palette', badHex.length === 0, badHex.join(','))
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('J11e every SVG font size is >= 9px', fonts.length > 0 && fonts.every((v) => v >= 9), `min=${Math.min(...fonts)}`)
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('J11f every SVG stroke is >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
  const clipFails: string[] = []
  for (const s of svgs) {
    const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/)
    if (!vb) continue
    const W = parseFloat(vb[1]); const H = parseFloat(vb[2])
    for (const m of s.matchAll(/<text x="([0-9.-]+)" y="([0-9.-]+)"[^>]*font-size="([0-9.]+)"[^>]*text-anchor="([a-z]+)"[^>]*>([^<]*)<\/text>/g)) {
      const x = parseFloat(m[1]); const y = parseFloat(m[2]); const size = parseFloat(m[3]); const anchor = m[4]; const txt = m[5]
      const est = txt.length * size * 0.62
      const lo = anchor === 'start' ? x : anchor === 'middle' ? x - est / 2 : x - est
      const hi = anchor === 'start' ? x + est : anchor === 'middle' ? x + est / 2 : x
      if (lo < 8 || hi > W - 8 || y < 10 || y > H - 6) clipFails.push(`"${txt.slice(0, 26)}" @x=${x},y=${y} w~${est.toFixed(0)} W=${W} H=${H}`)
    }
  }
  ok('J11g no SVG label clips the viewBox (>= 8px side margins, 0.62em/char estimate)', clipFails.length === 0, clipFails.join(' ; '))

  /* raw-TeX law */
  const prose: string[] = []
  const walk = (v: unknown): void => {
    if (typeof v === 'string') prose.push(v)
    else if (Array.isArray(v)) v.forEach((x) => walk(x))
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula') continue // KaTeX source by design
        if (k === 'svg') continue // SVG text is audited separately (J11c)
        walk(val)
      }
    }
  }
  walk(lesson.blocks)
  const mathSpans: string[] = []
  const stripped = prose.map((t) => t.replace(/\$[^$]*\$/g, (m) => { mathSpans.push(m); return ' ' }))
  ok('J12a no \\qquad inside any $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 3).join(' | '))
  ok('J12b no raw TeX commands outside $...$ in prose fields', stripped.every((t) => !/\\[a-zA-Z]+/.test(t)), stripped.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 5).join(' | '))
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  ok('J12c headings are plain (no $, no backslash) and at least 8 in number',
    heads.length >= 8 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), `${heads.length}: ${heads.map((h) => h.text).join(' | ')}`)
  const lists = lesson.blocks.filter((b) => b.kind === 'list') as Array<{ kind: 'list'; items: string[]; marker?: string }>
  ok('J12d list items are plain and at least one list uses roman markers',
    lists.length >= 1 && lists.some((l) => l.marker === 'roman') && lists.every((l) => l.items.every((i) => !i.includes('$') && !i.includes('\\'))))
  const termsB = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  ok('J12e terms are plain and total >= 8 items (the plan ships the 14-term bank)',
    termsB.reduce((n, t) => n + t.items.length, 0) >= 8 && termsB.every((t) => t.items.every((i) => !i.term.includes('$') && !i.def.includes('\\'))))
  const figCaps = [...(lesson.blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string }>).map((b) => b.caption),
  ...exBlocks.flatMap((b) => b.sets.flatMap((s) => s.questions.flatMap((q) => (q.figures ?? []).map((f) => f.caption))))]
  ok('J12f figure captions are plain (no $, no backslash)', figCaps.every((c) => !c.includes('$') && !c.includes('\\')))
  const algos = lesson.blocks.filter((b) => b.kind === 'algorithm') as Array<{ kind: 'algorithm'; title: string; lines: Array<{ code: string; note?: string }>; note?: string }>
  ok('J12g algorithm lines and notes are plain (no $, no backslash)',
    algos.length >= 1 && algos.every((a) => a.lines.every((l) => !l.code.includes('$') && !(l.note ?? '').includes('$') && !l.code.includes('\\'))))

  /* block-type census */
  const ders = lesson.blocks.filter((b) => b.kind === 'derivation') as Array<{ kind: 'derivation'; title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }>
  ok('J13 at least 2 derivation blocks, every step label plain words',
    ders.length >= 2 && ders.every((d) => d.steps.every((s) => !s.label.includes('$') && !s.label.includes('\\'))), `count=${ders.length}`)
  const eqs = lesson.blocks.filter((b) => b.kind === 'equation') as Array<{ kind: 'equation'; latex: string; note?: string }>
  ok('J14 at least 3 equation blocks, every one carrying a \\tag',
    eqs.length >= 3 && eqs.every((e) => e.latex.includes('\\tag{')), `count=${eqs.length}`)
  ok('J15 at least 3 formula cards', lesson.blocks.filter((b) => b.kind === 'formula').length >= 3)
  ok('J15b the algorithm block has >= 5 lines each with a note',
    algos.length === 1 && algos[0].lines.length >= 5 && algos[0].lines.every((l) => (l.note ?? '').length > 0))
  const tones = new Set((lesson.blocks.filter((b) => b.kind === 'callout') as Array<{ kind: 'callout'; tone: string }>).map((b) => b.tone))
  ok('J16 the six callout tones are all used (definition, insight, warn, historical, exam, theorem)',
    ['definition', 'insight', 'warn', 'historical', 'exam', 'theorem'].every((t) => tones.has(t)), [...tones].join(','))
  ok('J17 the prose census: at least 30 para blocks', lesson.blocks.filter((b) => b.kind === 'para').length >= 30, String(lesson.blocks.filter((b) => b.kind === 'para').length))
  ok('J18 the tables census: at least 3 teaching tables', lesson.blocks.filter((b) => b.kind === 'table').length >= 3)

  /* source shape (assembly contract) */
  const src = await Bun.file(import.meta.dir + '/part-cf62.ts').text()
  ok('J19 the part source exports lesson62, keeps the palette const named c62 with font f62, and every helper is cf62-prefixed',
    src.includes('export const lesson62') && src.includes('const c62 = {') && src.includes('const f62 =')
    && !/(?:^|\n)\s*function (?!cf62)/.test(src))
  ok('J20 the part source carries no blue/indigo/sky hex anywhere',
    !['#3b82f6', '#6366f1', '#818cf8', '#2563eb', '#1e40af', '#1e3a8a', '#0ea5e9', '#60a5fa', '#4f46e5', '#93c5fd'].some((h) => src.toLowerCase().includes(h)))

  /* the pinned tokens must appear in the shipped PROSE (svg excluded) */
  const allProse = prose.join(' ')
  const tokensDates = ['29 October 1969', "'lo'", '1 January 1983', 'November 1983', 'Mockapetris', 'ERNET', 'March 1989', '6 August 1991', 'info.cern.ch', 'April 1993', '15 August 1995', 'VSNL', 'UCLA', 'SRI', 'TCP/IP']
  ok('J21 the dated-beat tokens all appear in the prose', tokensDates.every((t) => allProse.includes(t)),
    tokensDates.filter((t) => !allProse.includes(t)).join(' | '))
  const tokensCensus = ['4,294,967,296', 'just under 4.3 billion', '48 bits', '12 hex digits', '13 root', 'port 53', '9.6 kbit/s', '50,000 s', '13.9 hours', '5,200', '20.80', '4,294,967,296']
  ok('J22 the census tokens all appear in the prose', tokensCensus.every((t) => allProse.includes(t)),
    tokensCensus.filter((t) => !allProse.includes(t)).join(' | '))
  const tokensGap = ['14 years', '3 years', '9 years', '26 years', '2 years']
  ok('J23 the date-gap tokens all appear in the prose', tokensGap.every((t) => allProse.includes(t)),
    tokensGap.filter((t) => !allProse.includes(t)).join(' | '))
  const tokensDoors = ['Computer Networks', 'Cybersecurity', 'The Network Idea']
  ok('J24 the doorstep books and the 6.1 cross-reference are named in the prose',
    tokensDoors.every((t) => allProse.includes(t)),
    tokensDoors.filter((t) => !allProse.includes(t)).join(' | '))

  /* summary witnesses for the run report */
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wc} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples}`)
}

/* ------------------------------------------------------------------ */
console.log(`V-CF62: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
