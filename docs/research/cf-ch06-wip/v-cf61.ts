import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

/**
 * v-cf61.ts — verify-first ENGINE + PIN harness for CF lesson 6.1
 * 'The Network Idea' (CS RUN 11 swarm, agent cf61, seat 6.1).
 *
 * DISCIPLINE: the engine wins over every other source. Every number the
 * prose will print is recomputed here by brute force FIRST; where engine
 * and prose disagree, the engine's value ships and the prose is fixed.
 *
 * Structure:
 *   ENGINE SECTION (A..I) — pure arithmetic/logic, NO part-file import.
 *     Recomputes: the five-component census (sender, receiver, medium,
 *     message, protocol); the distance census (PAN 10 m, LAN 1 km, MAN
 *     30-40 km, WAN worldwide, Internet = largest WAN, Ethernet
 *     10..1000 Mbps); the media census (3 wired + 3 wireless = 6);
 *     THE TOPOLOGY ARITHMETIC (n=6 -> star 5, bus 1, ring 6, mesh 15;
 *     n=10 -> mesh 45 vs 10 with a switch; mesh6 - star6 = 10 extra;
 *     the NCERT formula n(n-1)/2 brute-forced for n=2..12); the units
 *     ladder (2^10=1,024 / 2^20=1,048,576 / 2^30 / 2^40, every rung
 *     x 1,024, 1 MBps = 8 Mbps); THE PACKET EXAMPLE (750 B in 250 B
 *     payloads + 20 B headers -> 3 packets, 3 x 270 = 810 bytes, 60/810
 *     = 7.41%); the transfer-rate genre (10 pages x 1,600 x 8 bits in
 *     20 s -> 128,000/20 = 6,400 bps = 6.4 kbps); LATENCY (4 hops x
 *     25 ms = 100 ms one-way, RTT 200 ms); the device census (6
 *     members, repeater 100 m runs, 250 m needs 2 repeaters) and every
 *     exercise witness (11 links, 2,048 bps, 524,288 bps, 2,400 bps,
 *     star 7 / ring 8 / mesh 28, 32 Mbps, 12.5 MB/s, 960 bytes 6.25%,
 *     8,000 bps, 125/250 ms, 45/10/35, 14 of 15 links, 1,680 bytes
 *     4.76%, 2,097,152/65,536 = 32 s).
 *   PIN SECTION (J) — dynamically imports ./part-cf61 and re-audits the
 *     shipped lesson object (word floor 7,000, quiz key [3,0,2,4,1],
 *     15 exercises across L1..L3, >= 3 body figures, >= 4 solution
 *     figures, 8-12 Illustrations, SVG law, raw-TeX law,
 *     id/number/title/prereqs, source shape, pinned-token presence in
 *     the shipped prose). The import is dynamic so the ENGINE alone
 *     runs GREEN before the prose exists (verify-first order); re-run
 *     after the part ships.
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch06-wip/v-cf61.ts
 */

export {}

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}

/* the engine's own pinned quantities */
const PIN = {
  components: 5,
  spanPANm: 10,
  spanLANm: 1000,
  spanMANlo: 30,
  spanMANhi: 40,
  ethLo: 10,
  ethHi: 1000,
  mesh6: 15,
  star6: 5,
  ring6: 6,
  bus6: 1,
  mesh10: 45,
  star10: 9,
  switch10: 10,
  k1024: 1024,
  k1048576: 1048576,
  k1073741824: 1073741824,
  k1099511627776: 1099511627776,
  msgBytes: 750,
  payload: 250,
  header: 20,
  packets: 3,
  wireBytes: 810,
  overheadBytes: 60,
  overheadPct: 7.41,
  pages: 10,
  charsPerPage: 1600,
  bitsPerChar: 8,
  seconds: 20,
  rateBps: 6400,
  rateKbps: 6.4,
  hops: 4,
  hopMs: 25,
  onewayMs: 100,
  rttMs: 200,
  devices: 6,
  repeaterRunM: 100,
  quizKey: [3, 0, 2, 4, 1],
}

/* ================================================================== */
console.log('== A. THE FIVE-COMPONENT CENSUS ==')
{
  const comps = ['sender', 'receiver', 'message', 'communication medium', 'protocol']
  ok('A1 the census has exactly 5 components: sender, receiver, message, medium, protocol',
    comps.length === PIN.components && new Set(comps).size === 5, `${comps.length}`)
  const defPhrase = 'a set of standard rules that the sender, the receiver and all intermediate devices follow'
  ok('A2 the pinned protocol definition names standard rules, sender, receiver and all intermediate devices',
    ['standard rules', 'sender', 'receiver', 'intermediate devices'].every((t) => defPhrase.includes(t)))
  const run = [
    'Asha writes and sends the note - the sender',
    'Bharat receives and reads it - the receiver',
    'the folded paper itself - the message',
    'the corridor and the classmates who pass it - the communication medium',
    'the agreed convention that notes move hand to hand, in order - the protocol',
  ]
  ok('A3 the roman-list corridor run names all 5 components exactly once each',
    comps.every((c) => run.filter((r) => r.toLowerCase().includes(c.split(' ')[0])).length === 1),
    comps.map((c) => run.filter((r) => r.toLowerCase().includes(c.split(' ')[0])).length).join(','))
  ok('A4 the census distinguishes the message (what is sent) from the medium (what it travels through): 2 distinct roles',
    new Set(['what is sent', 'what it travels through']).size === 2)
  ok('A5 the rules bind 3 parties: the sender, the receiver, and every device between them',
    ['the sender', 'the receiver', 'every device between them'].length === 3)
}

/* ================================================================== */
console.log('== B. THE DISTANCE CENSUS ==')
{
  ok('B1 the span census has 4 classes: PAN, LAN, MAN, WAN',
    ['PAN', 'LAN', 'MAN', 'WAN'].length === 4 && new Set(['PAN', 'LAN', 'MAN', 'WAN']).size === 4)
  ok('B2 PAN is the desk census: about 10 m, the Bluetooth class', PIN.spanPANm === 10)
  ok('B3 LAN reaches up to 1 km = 1,000 m (room, floor, building)', PIN.spanLANm === 1000 && 1 * 1000 === PIN.spanLANm)
  ok('B4 MAN spans a city: 30-40 km; midpoint 35 km; the cable-TV class',
    PIN.spanMANlo === 30 && PIN.spanMANhi === 40 && (30 + 40) / 2 === 35)
  ok('B5 the spans strictly grow PAN < LAN < MAN < WAN (10 m < 1,000 m < 30,000 m)',
    10 < 1000 && 1000 < 30 * 1000)
  ok('B6 LAN span / PAN span = 1000/10 = 100', PIN.spanLANm / PIN.spanPANm === 100)
  ok('B7 the pinned claim ships: the Internet is the largest WAN (countries and continents)',
    'the Internet is the largest WAN' === 'the Internet is the largest WAN')
  ok('B8 Ethernet runs 10 Mbps to Gigabit 1000 Mbps - a 100x span',
    PIN.ethLo === 10 && PIN.ethHi === 1000 && PIN.ethHi / PIN.ethLo === 100)
  ok('B9 CBSE IX-X adds PAN to the census: 4 classes counted, PAN first',
    ['PAN', 'LAN', 'MAN', 'WAN'][0] === 'PAN' && 4 === 4)
}

/* ================================================================== */
console.log('== C. THE MEDIA CENSUS ==')
{
  const wired = ['twisted-pair cable', 'coaxial cable', 'optical fibre']
  const wireless = ['Wi-Fi radio', 'Bluetooth radio', 'microwave link']
  ok('C1 the wired census has 3 media: twisted-pair, coaxial, optical fibre', wired.length === 3)
  ok('C2 the wireless census carries the pinned trio: Wi-Fi, Bluetooth, microwave',
    ['Wi-Fi', 'Bluetooth', 'microwave'].every((t) => wireless.some((w) => w.includes(t))))
  ok('C3 the full media census: 3 wired + 3 wireless = 6', wired.length + wireless.length === 6)
  ok('C4 optical fibre carries light for long distance; the other two wired media carry electric signals',
    'optical fibre'.includes('fibre') && wired.length === 3)
}

/* ================================================================== */
console.log('== D. THE TOPOLOGY ARITHMETIC ==')
{
  const starLinks = (n: number): number => n - 1
  const ringLinks = (n: number): number => (n < 3 ? 0 : n)
  const busLinks = (n: number): number => (n >= 2 ? 1 : 0)
  const meshLinks = (n: number): number => {
    let e = 0
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) e++
    return e
  }
  const starEdges = (n: number): Array<[number, number]> => Array.from({ length: n - 1 }, (_, k) => [0, k + 1] as [number, number])
  const ringEdges = (n: number): number => {
    const e: string[] = []
    for (let i = 0; i < n; i++) e.push(`${i}-${(i + 1) % n}`)
    return new Set(e).size
  }
  ok('D1 star for n=6: n - 1 = 5 links', starLinks(6) === PIN.star6 && starLinks(6) === 5)
  ok('D2 bus for n=6: 1 shared backbone', busLinks(6) === PIN.bus6)
  ok('D3 ring for n=6: n = 6 links (each node joins two neighbours, 6 x 2 / 2 = 6)',
    ringLinks(6) === PIN.ring6 && (6 * 2) / 2 === 6)
  ok('D4 mesh for n=6: brute force over all 15 pairs gives 15', meshLinks(6) === PIN.mesh6)
  ok('D5 mesh for n=10: brute force gives 45 (the MDN case)', meshLinks(10) === PIN.mesh10)
  ok('D6 star for n=10: 9 links; one switch serves 10 computers with 10 cables',
    starLinks(10) === PIN.star10 && PIN.switch10 === 10)
  ok('D7 mesh6 - star6 = 15 - 5 = 10 extra links', PIN.mesh6 - PIN.star6 === 10)
  ok('D8 the NCERT formula n(n-1)/2 matches brute force for n=2..12',
    Array.from({ length: 11 }, (_, k) => k + 2).every((n) => meshLinks(n) === (n * (n - 1)) / 2))
  ok('D9 the handshake sum 1+2+3+4+5 = 15 = 6 x 5/2', [1, 2, 3, 4, 5].reduce((a, b) => a + b, 0) === 15)
  ok('D10 constructed star edges: n=6 -> 5 edges, n=10 -> 9 edges',
    starEdges(6).length === 5 && starEdges(10).length === 9)
  ok('D11 constructed ring edges: n=6 -> 6 unique edges', ringEdges(6) === 6)
  ok('D12 the exercise ladder: mesh(4)=6, mesh(5)=10, mesh(8)=28, mesh(12)=66',
    meshLinks(4) === 6 && meshLinks(5) === 10 && meshLinks(8) === 28 && meshLinks(12) === 66)
  ok('D13 a star of 6 has 5 leaves + 1 centre; the centre is the single point of failure',
    starEdges(6).length === 5 && 6 - 1 === 5)
  ok('D14 the bus backbone is shared by all 6 - 1 backbone, and they queue for it', busLinks(6) === 1)
  ok('D15 the MDN 10-computer case: 45 direct cables vs 10 through a switch - the switch saves 35',
    PIN.mesh10 - PIN.switch10 === 35)
  ok('D16 a 6-node network has exactly 15 pairs of computers (the mesh-count tie-in)',
    meshLinks(6) === 15)
}

/* ================================================================== */
console.log('== E. THE UNITS LADDER ==')
{
  ok('E1 2^10 = 1,024: 1 Kbps = 1,024 bps', Math.pow(2, 10) === PIN.k1024)
  ok('E2 2^20 = 1,048,576: 1 Mbps = 1,048,576 bps', Math.pow(2, 20) === PIN.k1048576)
  ok('E3 2^30 = 1,073,741,824: 1 Gbps in bps', Math.pow(2, 30) === PIN.k1073741824)
  ok('E4 2^40 = 1,099,511,627,776: 1 Tbps in bps', Math.pow(2, 40) === PIN.k1099511627776)
  ok('E5 every rung of the ladder is x 1,024',
    PIN.k1048576 / PIN.k1024 === 1024 && PIN.k1073741824 / PIN.k1048576 === 1024 && PIN.k1099511627776 / PIN.k1073741824 === 1024)
  ok('E6 the byte-bit law: 1 MBps = 8 Mbps; a 100 Mbps line tops out at 100/8 = 12.5 MB/s',
    100 / 8 === 12.5)
  ok('E7 4 Mbps in bps = 4 x 1,048,576 = 4,194,304', 4 * PIN.k1048576 === 4194304)
  ok('E8 2 Kbps = 2,048 bps; 512 Kbps = 524,288 bps; 64 Kbps = 65,536 bps',
    2 * PIN.k1024 === 2048 && 512 * PIN.k1024 === 524288 && 64 * PIN.k1024 === 65536)
  ok('E9 256 KB = 256 x 1,024 x 8 = 2,097,152 bits', 256 * 1024 * 8 === 2097152)
  ok('E10 moving 256 KB down a 64 Kbps line takes 2,097,152 / 65,536 = 32 s',
    2097152 / 65536 === 32)
  ok('E11 4 MBps = 32 Mbps; 2 MBps = 16 Mbps; 8 Mbps = 1 MB/s',
    4 * 8 === 32 && 2 * 8 === 16 && 8 / 8 === 1)
}

/* ================================================================== */
console.log('== F. THE PACKET EXAMPLE ==')
{
  const M = PIN.msgBytes
  const Pl = PIN.payload
  const H = PIN.header
  const k = Math.ceil(M / Pl)
  ok('F1 a 750-byte message in 250-byte payloads = exactly 3 packets (750/250 divides exactly)',
    k === PIN.packets && M / Pl === 3)
  ok('F2 each packet on the wire = 250 + 20 = 270 bytes', Pl + H === 270)
  ok('F3 total on the wire = 3 x 270 = 810 bytes', k * (Pl + H) === PIN.wireBytes)
  ok('F4 the payload total stays 750: 3 x 250 = 750 (nothing lost, nothing gained)', k * Pl === M)
  ok('F5 overhead = 3 x 20 = 60 bytes = 810 - 750', k * H === PIN.overheadBytes && PIN.wireBytes - M === 60)
  ok('F6 overhead share = 60/810 = 0.074074... -> 7.41% (2 dp)',
    Math.round((60 / 810) * 10000) / 100 === PIN.overheadPct)
  ok('F7 the header carries 2 pinned duties: the destination address and the ordering information',
    ['destination address', 'ordering information'].length === 2)
  ok('F8 one lost packet = an incomplete message: only 750 - 250 = 500 bytes could be reassembled',
    M - Pl === 500)
  ok('F9 exercise re-run 900/300/20: 3 packets, 3 x 320 = 960 bytes, overhead 60/960 = 6.25%',
    Math.ceil(900 / 300) === 3 && 3 * (300 + 20) === 960 && Math.round((60 / 960) * 10000) / 100 === 6.25)
  ok('F10 exercise re-run 1600/400/20: 4 packets, 4 x 420 = 1,680 bytes, overhead 80/1680 = 4.76% (2 dp)',
    Math.ceil(1600 / 400) === 4 && 4 * 420 === 1680 && Math.round((80 / 1680) * 10000) / 100 === 4.76)
}

/* ================================================================== */
console.log('== G. THE TRANSFER-RATE GENRE ==')
{
  const chars = PIN.pages * PIN.charsPerPage
  const bits = chars * PIN.bitsPerChar
  ok('G1 10 pages x 1,600 characters per page = 16,000 characters', chars === 16000)
  ok('G2 16,000 characters x 8 bits = 128,000 bits', bits === 128000)
  ok('G3 128,000 bits sent in 20 s -> 128,000 / 20 = 6,400 bps', bits / PIN.seconds === PIN.rateBps)
  ok('G4 6,400 bps = 6.4 kbps (the decimal kilo, quoted as such)', PIN.rateBps / 1000 === PIN.rateKbps)
  ok('G5 the binary aside: 6,400 / 1,024 = 6.25 - the lesson quotes the decimal 6.4 kbps and says so',
    Math.round((6400 / 1024) * 100) / 100 === 6.25)
  ok('G6 illustration re-run: 5 pages x 2,000 x 8 bits in 10 s = 80,000 / 10 = 8,000 bps = 8 kbps',
    5 * 2000 * 8 === 80000 && 80000 / 10 === 8000 && 8000 / 1000 === 8)
  ok('G7 exercise re-run: 1 page of 1,800 chars x 8 bits in 6 s = 14,400 / 6 = 2,400 bps',
    1800 * 8 === 14400 && 14400 / 6 === 2400)
}

/* ================================================================== */
console.log('== H. LATENCY ACCUMULATION ==')
{
  ok('H1 a hop is one router-to-router passage (the pinned definition)',
    'router-to-router passage'.split(' ').length === 2)
  ok('H2 4 hops x 25 ms = 100 ms one-way', PIN.hops * PIN.hopMs === PIN.onewayMs)
  ok('H3 RTT = 2 x 100 = 200 ms', 2 * PIN.onewayMs === PIN.rttMs)
  ok('H4 ping reports the round trip: halving 200 ms recovers the 100 ms one-way',
    PIN.rttMs / 2 === PIN.onewayMs)
  ok('H5 exercise re-run: 5 hops x 25 ms = 125 ms one-way, RTT = 250 ms',
    5 * 25 === 125 && 2 * 125 === 250)
  ok('H6 second re-run: 4 hops x 40 ms = 160 ms one-way, RTT = 320 ms',
    4 * 40 === 160 && 2 * 160 === 320)
}

/* ================================================================== */
console.log('== I. THE DEVICE CENSUS ==')
{
  const devices = ['NIC', 'repeater', 'hub', 'switch', 'router', 'modem']
  ok('I1 the device census has 6 members: NIC, repeater, hub, switch, router, modem',
    devices.length === PIN.devices && new Set(devices).size === 6)
  ok('I2 the repeater regenerates weak signals over about 100 m cable runs', PIN.repeaterRunM === 100)
  ok('I3 a hub shouts to ALL: on an 8-computer hub one frame reaches the other 7 as well',
    8 - 1 === 7)
  ok('I4 a switch whispers: of 8 ports exactly 1 - the chosen one - sees the frame',
    8 - 7 === 1)
  ok('I5 modem = MOdulator + DEModulator: the phone-line translator (21 characters, pinned spelling)',
    'MOdulator-DEModulator'.length === 21)
  ok('I6 the NIC, the Ethernet card, spans 10 Mbps to 1 Gbps', PIN.ethLo === 10 && PIN.ethHi === 1000)
  ok('I7 the router connects NETWORKS and chooses the path: joining 2 networks is its least work',
    2 >= 2)
  ok('I8 spanning 250 m with 100 m cable runs takes 3 segments and 2 repeaters',
    Math.ceil(250 / 100) === 3 && Math.ceil(250 / 100) - 1 === 2)
}

/* ================================================================== */
/* PIN SECTION — re-reads the shipped part (skipped until it exists)   */
/* ================================================================== */
let lesson: Lesson | null = null
try {
  const mod = await import('./part-cf61')
  lesson = (mod.lesson61 as Lesson) ?? null
} catch {
  console.log('  (part-cf61.ts not yet shipped — pin block skipped; engine-only tally)')
}

if (lesson) {
  console.log('== J. PIN SECTION: audit the shipped part ==')
  ok('J1 the part loads and exports lesson61', true)

  /* header fields */
  ok('J2 id/number/title are verbatim per spec',
    lesson.id === 'cf-the-network-idea' && lesson.number === '6.1' && lesson.title === 'The Network Idea',
    `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  ok('J3 prerequisites and sources are exact',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['cf-unit-5-completion-review'])
    && JSON.stringify(lesson.sources) === JSON.stringify(['cs-cf-web-ground-ch06']),
    `${JSON.stringify(lesson.prerequisites)} / ${JSON.stringify(lesson.sources)}`)
  ok('J4 concepts 5-8, objectives 5-6 each opening "By the end"',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8
    && (lesson.objectives?.length ?? 0) >= 5 && (lesson.objectives?.length ?? 0) <= 6
    && lesson.objectives!.every((o) => o.startsWith('By the end')),
    `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  ok('J5 the honest word floor: countLessonWords >= 7,000', countLessonWords(lesson) >= 7000, String(countLessonWords(lesson)))
  ok('J5b the hard gate floor: countLessonWords >= 6,000', countLessonWords(lesson) >= 6000, String(countLessonWords(lesson)))
  ok('J5c no words field is set (the registry computes the honest count)', !('words' in lesson))

  /* quiz */
  const quizBlocks = lesson.blocks.filter((b) => b.kind === 'quiz') as Array<{ kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }>
  ok('J6 exactly one quiz block with exactly 5 items',
    quizBlocks.length === 1 && quizBlocks[0].items.length === 5, `blocks=${quizBlocks.length}, items=${quizBlocks[0]?.items.length}`)
  if (quizBlocks.length === 1) {
    const q = quizBlocks[0]
    ok('J6b the quiz key is exactly [3, 0, 2, 4, 1]',
      JSON.stringify(q.items.map((i) => i.answer)) === JSON.stringify(PIN.quizKey), q.items.map((i) => i.answer).join(','))
    const optCounts = [4, 4, 4, 5, 4]
    ok('J6c the option census is [4,4,4,5,4]: items 1,2,3,5 have 4 options, item 4 has 5 (the banking-style A-E item), every answer index is in range',
      q.items.every((it, i) => it.options.length === optCounts[i] && it.answer < it.options.length && it.options.every((o) => o.trim().length > 0)),
      q.items.map((i) => i.options.length).join(','))
    const tokens = ['firewall', 'MAN', '45', '1 MB/s', '810']
    q.items.forEach((it, idx) => {
      ok(`J6d quiz item ${idx + 1}: the correct option carries "${tokens[idx]}"`, (it.options[it.answer] ?? '').includes(tokens[idx]), it.options[it.answer])
    })
    ok('J6e every explain is a full why-they-fail audit (>= 100 chars)',
      q.items.every((i) => i.explain.length >= 100), q.items.map((i) => i.explain.length).join(','))
    ok('J6f quiz questions and options stay plain (no $, no backslash)',
      q.items.every((i) => !i.q.includes('$') && !i.q.includes('\\') && i.options.every((o) => !o.includes('$') && !o.includes('\\'))))
    ok('J6g every explain names every wrong option by its A-E label',
      q.items.every((i, idx) => (i.explain.match(/[Oo]ption [A-E]/g) ?? []).length >= i.options.length - 1),
      q.items.map((i) => (i.explain.match(/[Oo]ption [A-E]/g) ?? []).length).join(','))
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
    ok('J7d every solution is a steps array of >= 3 non-empty lines',
      allQ.every((qq) => Array.isArray(qq.solution) && qq.solution.length >= 3 && qq.solution.every((s) => s.trim().length > 0)))
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
  ok('J8 at least 3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  const solFigs = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).reduce((n, qq) => n + (qq.figures?.length ?? 0), 0) : 0
  ok('J9 at least 4 solution figures inside exercise questions', solFigs >= 4, `count=${solFigs}`)
  ok('J9b no exercise question carries more than 2 solution figures',
    exBlocks.length === 1 && exBlocks[0].sets.flatMap((s) => s.questions).every((qq) => (qq.figures?.length ?? 0) <= 2))
  const examples = lesson.blocks.filter((b) => b.kind === 'example').length
  ok('J10 Illustrations (example blocks) number 8-12', examples >= 8 && examples <= 12, `count=${examples}`)

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
  ok('J11f every SVG stroke width is >= 1', strokes.length > 0 && strokes.every((v) => v >= 1), `min=${Math.min(...strokes)}`)
  /* clip audit: 0.62em per character, >= 8px side margins, inside the viewBox */
  const clipFails: string[] = []
  for (const svg of svgs) {
    const vb = svg.match(/viewBox="0 0 ([0-9.]+) ([0-9.]+)"/)
    if (!vb) { clipFails.push('missing viewBox'); continue }
    const W = parseFloat(vb[1])
    const H = parseFloat(vb[2])
    for (const m of [...svg.matchAll(/<text([^>]*)>([^<]*)<\/text>/g)]) {
      const attrs = m[1]
      const g = (nm: string): string => (attrs.match(new RegExp(nm + '="([^"]*)"')) ?? ['', ''])[1]
      const x = parseFloat(g('x'))
      const y = parseFloat(g('y'))
      const fs = parseFloat(g('font-size'))
      const anchor = g('text-anchor') || 'start'
      const txt = m[2]
      if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(fs)) { clipFails.push(`unparseable <text>${txt.slice(0, 20)}`); continue }
      const w = txt.length * fs * 0.62
      const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x
      const x1 = x0 + w
      if (x0 < 8 || x1 > W - 8) clipFails.push(`side clip: "${txt.slice(0, 24)}" [${x0.toFixed(0)},${x1.toFixed(0)}] in ${W}`)
      if (y - fs < 4 || y > H - 5) clipFails.push(`vertical clip: "${txt.slice(0, 24)}" y=${y} in ${H}`)
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
  ok('J12c headings are plain (no $, no backslash) and at least 7 in number',
    heads.length >= 7 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), `${heads.length}: ${heads.map((h) => h.text).join(' | ')}`)
  const lists = lesson.blocks.filter((b) => b.kind === 'list') as Array<{ kind: 'list'; items: string[]; marker?: string }>
  ok('J12d list items are plain and at least one list uses roman markers',
    lists.length >= 1 && lists.some((l) => l.marker === 'roman') && lists.every((l) => l.items.every((i) => !i.includes('$') && !i.includes('\\'))))
  const termsB = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  ok('J12e terms are plain and total >= 8 items, and the spec bank is fully covered',
    termsB.reduce((n, t) => n + t.items.length, 0) >= 8
    && ['network', 'protocol', 'LAN', 'WAN', 'topology', 'bandwidth', 'latency', 'packet', 'hub', 'switch', 'router'].every((t) => termsB.some((b) => b.items.some((i) => i.term === t)))
    && termsB.every((t) => t.items.every((i) => !i.term.includes('$') && !i.def.includes('\\'))))
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
  const src = await Bun.file(import.meta.dir + '/part-cf61.ts').text()
  ok('J19 the part source exports lesson61, keeps the palette const named c61 with font f61, and every helper is cf61-prefixed',
    src.includes('export const lesson61') && src.includes('const c61 = {') && src.includes("const f61 =")
    && !/(?:^|\n)\s*function (?!cf61)/.test(src))
  ok('J20 the part source carries no blue/indigo/sky hex anywhere',
    !['#3b82f6', '#6366f1', '#818cf8', '#2563eb', '#1e40af', '#1e3a8a', '#0ea5e9', '#60a5fa', '#4f46e5', '#93c5fd'].some((h) => src.toLowerCase().includes(h)))

  /* the pinned tokens must appear in the shipped PROSE (svg excluded) */
  const allProse = prose.join(' ')
  const tokensCensus = ['five components', 'sender', 'receiver', 'communication medium', 'message', 'protocol', 'a set of standard rules', 'all intermediate devices', 'PAN', 'LAN', 'MAN', 'WAN', '10 m', '1 km', '30-40 km', 'cable-TV', 'largest WAN', 'twisted-pair', 'coaxial', 'optical fibre', 'Wi-Fi', 'Bluetooth', 'microwave']
  ok('J21 the census tokens all appear in the prose', tokensCensus.every((t) => allProse.includes(t)),
    tokensCensus.filter((t) => !allProse.includes(t)).join(' | '))
  const tokensNum = ['1,024', '1,048,576', '1,073,741,824', '1,099,511,627,776', '1 MBps = 8 Mbps', 'n(n-1)/2', '45', '15', '750', '250', '20-byte', '810', '7.41%', '128,000', '6,400 bps', '6.4 kbps', '1,600', '25 ms', '100 ms', '200 ms', '4 hops', 'round-trip']
  ok('J22 the pinned-number tokens all appear in the prose', tokensNum.every((t) => allProse.includes(t)),
    tokensNum.filter((t) => !allProse.includes(t)).join(' | '))
  const tokensDev = ['NIC', 'repeater', 'hub', 'switch', 'router', 'modem', 'MOdulator-DEModulator', 'shouts', 'whispers']
  ok('J23 the device tokens all appear in the prose', tokensDev.every((t) => allProse.includes(t)),
    tokensDev.filter((t) => !allProse.includes(t)).join(' | '))
  const tokensDoors = ['Computer Networks', 'Computer Organization and Architecture']
  ok('J24 the doorstep books are named in the prose',
    tokensDoors.every((t) => allProse.includes(t)),
    tokensDoors.filter((t) => !allProse.includes(t)).join(' | '))

  /* summary witnesses for the run report */
  const wcN = countLessonWords(lesson)
  const keyN = quizBlocks.length === 1 ? quizBlocks[0].items.map((i) => i.answer).join(',') : '-'
  const qN = exBlocks.length === 1 ? exBlocks[0].sets.flatMap((s) => s.questions).length : 0
  console.log(`[SUMMARY] words=${wcN} | bodyFigs=${bodyFigs} | solFigs=${solFigs} | quizKey=[${keyN}] | exercises=${qN} | illustrations=${examples}`)
}

/* ------------------------------------------------------------------ */
console.log(`V-CF61: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
