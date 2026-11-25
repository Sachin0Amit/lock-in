# SEAT SPEC — cf4R (lesson 4.R 'Unit 4 Completion Review')

Read `docs/research/cf-ch04-wip/SPEC_CORE.md` FIRST — it is part of
this spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf4R.ts` + `v-cf4R.ts` (tag `4R`; helpers `cf4R…`;
  export `export const lesson4R`).
- id: `cf-unit-4-completion-review`; number `'4.R'`; title
  `'Unit 4 Completion Review'` (verbatim).
- prerequisites: ALL FOUR ch.4 ids, pinned order:
  `['cf-the-motherboard-the-city-plan', 'cf-the-processor-named-honestly',
  'cf-the-first-memory-hierarchy', 'cf-buses-and-ports-how-the-pieces-talk']`.
- sources: `['cs-cf-web-ground-ch04']`; quiz key `[3, 1, 0, 1, 2]`.
- Word floor: ≥ 6,500 (review seat).

## The arc (the REVIEW — the chapter in one map, four lesson recaps carrying the siblings' pinned harvest numbers VERBATIM, a mixed bench of 15 exam-style questions across all four lessons, the forward door)

The unit reviews of chapters 1–3 (see the 3.R shipped shape in
ch-03.ts) are the pattern: (1) the opening paragraph that names every
sibling lesson by number and title; (2) 'The Chapter in One Map' — a
figure + the one definition callout of the chapter's own thread;
(3) ONE recap section per lesson, each with its harvest figure or
table and one Recap Illustration; (4) the mixed bench: 15 exercises
spanning all four lessons, levels L1–L4; (5) the forward door:
chapter 5 'Software Families' — the manager layer, what the OS
visibly does.

### The one map (your pipeline figure)
The city-and-its-life map: the BOARD (4.1's city plan — socket,
slots, chipset, power) hosts the PROCESSOR (4.2's worker station —
cycle, clock, cores, cache pocket), which reaches down the MEMORY
LADDER (4.3 — registers → cache → RAM → SSD → HDD → cloud, the
FAST/BIG/CHEAP trade), while all three talk along the ROADS (4.4 —
address/data/control buses, PCIe lanes, the port wall). The
definition callout: 'the inside-the-box pipeline, defined once' —
a city (board) that hosts a workforce (processor) served by a
library system (memory hierarchy) and connected by roads (buses and
ports); every component a CHOICE with a PRICE, the chapter's method
throughout.

### The four recaps and their harvest numbers (carry VERBATIM — the review invents NO new numbers)
- 4.1 recap: ATX 1995, 305 × 244 mm = 74,420 mm²; microATX 59,536
  mm² (80.0%); Mini-ITX VIA 2001, 170 × 170 mm = 28,900 mm² (38.8%
  of ATX); DIMM 288 pins; CR2032 3 V; 24-pin + 8-pin power; Nehalem
  2008 folded the memory controller into the CPU; IBM PC August 1981
  planar board.
- 4.2 recap: the cycle fetch → decode → execute → write back; 1 GHz =
  10^9 cycles/s; 5 GHz beat = 0.2 ns; 4004: 15 November 1971, 2,300
  transistors, 740 kHz; 5 GHz/740 kHz = 6756.7568×; 6 March 2000 AMD
  1 GHz first (Intel two days later); May 2005 the dual-core month;
  Moore 19 April 1965 (revised 1975 to two years); 2,300 × 2^26 =
  154,350,387,200 predicted for 2023 vs M2 Ultra 134 billion actual
  (1.151869×, 15.1869% above); 4 × 3 GHz = 12 GHz summed; SRAM 6
  transistors/bit.
- 4.3 recap: the ladder registers→L1/L2/L3→RAM→SSD→HDD→cloud; the
  census 0.5 ns / 7 ns (14×) / 100 ns (14.2857× L2, 200× L1) / 150 μs
  (1,500× RAM) / 10 ms (66.6667× SSD) / 150 ms ocean (15× HDD); the
  human ladder (L1 = 1 s): 14 s, 200 s, 3.4722 days, 231.481481 days
  (7.6 months), 9.5064263 years; DRAM Dennard 1966, patent 3,387,286
  4 June 1968, one transistor + one capacitor, 64 ms refresh; SRAM
  six transistors; RAMAC 14 September 1956, 50 platters, ≈ 3.75 MB;
  the two localities; FAST/BIG/CHEAP pick two.
- 4.4 recap: the three buses (address/data/control); $2^{32}$ =
  4,294,967,296 bytes = 4 GiB; PCIe gen1 250 MB/s per lane, gen3 8
  GT/s → 984.6154 MB/s per lane, gen4 1969.2308 MB/s, gen5 3938.4615
  MB/s; x16 gen4 = 31.5077 GB/s; USB 1996 (12 Mbps) → 2.0 27 April
  2000 (480 Mbps, 40×) → 3.0 2008 (5 Gbps, 10.4167×) → USB4 2019 (40
  Gbps); USB-C August 2014; HDMI 1.0 9 December 2002 (4.95 Gbps) →
  2.1 2017 (48 Gbps, 9.69697×); SATA 3.0 6 Gbit/s → 600 MB/s raw.

### The bench (15 exercises, L1–L4, spanning all four lessons)
Mix: one city-plan labelling exercise (4.1), two form-factor
arithmetic ones (4.1), one cycle/clock one (4.2), two Moore/census
ones (4.2), two ladder-ordering/latency ones (4.3), one locality one
(4.3), one bus-width one (4.4), two bandwidth ones (4.4), one
USB/HDMI census one (4.4), one whole-chapter synthesis (price a
representation-free machine choice end to end), one honest
exam-style piece. At least 4 solution figures across the set.

### The forward door
Chapter 5 'Software Families' — the machine is now a city that
works; the next chapter names WHO MANAGES IT: system software versus
application software priced on the reader's own machine, the
manager layer (Operating Systems' doorstep), utilities, the craft of
installing and licensing honestly.

## Figures (≥3 body + ≥4 solution)
- F1 the chapter-in-one-map pipeline (the city-and-its-life figure).
- F2 the harvest strip: the four seats' headline numbers as one
  computed banner (74,420 mm² / 6756.7568× / 1,500× RAM ladder /
  31.5077 GB/s).
- F3 the FAST/BIG/CHEAP triangle with the ladder rungs placed.
- F4 (optional) the forward-door sketch: the city's manager hiring
  notice (honest, no clip-art faces).
- Solution figures: mini city plans, ladder strips, bandwidth bars
  for the bench answers.

## The pinned numbers
ALL numbers above, verbatim from the four content seats — your engine
re-asserts every one (it may recompute each; zero invented numbers).
Quiz key [3,1,0,1,2].
