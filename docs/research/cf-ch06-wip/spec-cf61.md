# SEAT cf61 — CS RUN 11 swarm, chapter 6 'Connecting Computers'
## Lesson 6.1 'The Network Idea'

Read `docs/research/cf-ch06-wip/SPEC_CORE.md` FULLY first — it is the shared
contract (engine-first discipline, part-file shape, block vocabulary, SVG
rules, raw-TeX law, voice). THIS file pins your unique content. You touch
ONLY your two files:
- engine: `docs/research/cf-ch06-wip/v-cf61.ts` (>= 45 checks, ALL GREEN
  before prose; final >= 5 re-read checks import your part)
- part:   `docs/research/cf-ch06-wip/part-cf61.ts`
Unique prefix for EVERY helper/palette/const: `cf61` / `c61` / `f61` (the
assembler concatenates four seats verbatim — collisions are fatal).

## Identity (pinned, stable forever)
- `id: 'cf-the-network-idea'`, `number: '6.1'`,
  `title: 'The Network Idea'` (VERBATIM — never reword)
- `prerequisites: ['cf-unit-5-completion-review']`
- `sources: ['cs-cf-web-ground-ch06']`
- `quiz` key (5 items, 4 options each): `[3, 0, 2, 4, 1]` — the engine pins
  it and the explain lines say why EACH wrong option fails.

## The lesson you are writing (verified fact bank — carry EXACTLY)

Why two machines want to talk at all (sharing files, printers, one Internet
connection); then the honest anatomy of every conversation:

1. **The five components of data communication** (NCERT XII ch 11): sender,
   receiver, communication medium (the channel), the message, and the rules
   called **protocols** — 'a set of standard rules that the sender, the
   receiver and all intermediate devices follow' (MDN agrees). Open with a
   definition callout; follow with a roman-list example run (two friends
   passing notes through a corridor, each component named).
2. **The distance census** (the dividing question is span): **PAN** (your
   own desk, ~10 m, Bluetooth-class), **LAN** (room/floor/building, up to
   1 km; Ethernet 10 Mbps .. Gigabit Ethernet 1000 Mbps), **MAN** (a city,
   30-40 km; cable-TV networks), **WAN** (countries and continents; the
   Internet is the largest WAN). CBSE IX-X adds PAN to the census.
3. **Wired vs wireless media**: twisted-pair cable, coaxial cable, optical
   fibre (light, long distance) vs radio (Wi-Fi, Bluetooth, microwave
   links). One census table, one honest paragraph each.
4. **Topology** (the arrangement question): **star** (everyone to a central
   switch; n-1 links; center dies = all die), **bus** (1 shared backbone;
   cheap, collisions), **ring** (each to two neighbours; n links,
   unidirectional), **mesh** (everyone to everyone; n(n-1)/2 links).
   PINNED ARITHMETIC (engine-checked): n=6 -> star 5, ring 6, mesh 15,
   bus 1; MDN's 10-computer case: 45 direct cables vs 10 with a switch;
   mesh 6 - star 6 = 10 extra links. NCERT's own formula: fully-connected
   mesh of n nodes needs n(n-1)/2 wires.
5. **Bandwidth and latency, named honestly**: bandwidth = the MAXIMUM rate
   of data transfer across a path, in bits per second; latency = the time
   delay between cause and effect (one-way or round-trip; ping measures
   round-trip). The units ladder: 1 Kbps = 2^10 = 1,024 bps; 1 Mbps =
   2^20 = 1,048,576 bps; 1 Gbps = 2^30; 1 Tbps = 2^40. **Mbps (megabit)
   != MBps (megabyte): 1 MBps = 8 Mbps** — a warn callout (the ISP-bill
   confusion is the classic exam trap).
6. **Packets**: a message is divided into smaller chunks called packets,
   each with a header (destination address + ordering info) over a payload;
   they may take different routes and are reassembled at the destination.
   PINNED EXAMPLE (engine-checked): a 750-byte message over 250-byte
   payloads with 20-byte headers = 3 packets, 3 x 270 = 810 bytes total,
   overhead 60/810 = 7.41% (rounded 2 dp); any one lost packet = incomplete
   message.
7. **The device census, one line each** (the full door stays with Computer
   Networks): NIC (the Ethernet card, 10 Mbps-1 Gbps), repeater (regenerates
   weak signals, ~100 m cable runs), hub (shouts to ALL), switch (whispers
   to the chosen port), router (connects NETWORKS, chooses the path),
   modem (MOdulator-DEModulator, the phone-line translator).
8. **Worked micro-calculation (the NCERT Example 11.1 genre, our own
   numbers)**: 10 pages, 1,600 characters per page, 8 bits per character,
   sent in 20 seconds -> 10 x 1600 x 8 = 128,000 bits; 128,000 / 20 =
   6,400 bps = 6.4 kbps required rate. Make it a derivation block.
9. **Latency accumulation**: 4 hops x 25 ms = 100 ms one-way, RTT = 200 ms
   (a hop = one router-to-router passage).

Doorsteps (name in prose, never re-teach): 'Computer Networks' (this shelf)
owns the deep theory — switching, routing algorithms, the full device zoo;
'Computer Organization and Architecture' owns the bus-level view inside the
box (chapter 4 already toured buses and ports).

## Figure plan (body >= 3, computed SVG, SPEC_CORE rules)
- FIG A (body) 'THE FIVE-COMPONENT PATH': two host boxes (SENDER /
  RECEIVER) joined by a channel bar; a labelled message envelope on the
  channel; a small rulebook glyph labelled PROTOCOL pinned between them;
  caption carries the census '5 components'.
- FIG B (body) 'THE TOPOLOGY CENSUS, COUNTED': four mini-panels (star /
  bus / ring / mesh) for n = 6 nodes, edges COMPUTED (5 / 1 / 6 / 15);
  caption pins the formulas and the 45-vs-10 MDN case.
- FIG C (body) 'THE PACKET ENVELOPES': the 750-byte message sliced into 3
  envelopes, each with a header strip (TO / FROM / SEQ 1..3) over a 250 B
  payload strip; caption pins 3 x 270 = 810 and 7.41%.
- FIG D (body) 'THE HOP RIBBON': 4 router hops, each tagged +25 ms,
  one-way total 100 ms, return path 200 ms RTT.
- SOLUTION figures (>= 4 across exercises): a span-census ladder (PAN->
  LAN-> MAN-> WAN with spans), a link-count solve board (mesh n=10 = 45),
  a bandwidth-units ladder, a star-vs-mesh failure difference panel.

## Exercises
15 questions across graded sets (L1..L3+, honest 'exam-style' labels):
counting links, unit conversions (Kbps->bps, MBps->Mbps), component
identification, topology classification, the 6,400 bps genre re-run with
new numbers, latency sums. Include a `terms` bank (network, protocol,
LAN, WAN, topology, bandwidth, latency, packet, hub, switch, router) and
an `exam` callout (SSC/banking computer awareness + CUET 'network
topologies, LAN, MAN, WAN' + Cambridge 9618 'LAN, WAN' asks).
