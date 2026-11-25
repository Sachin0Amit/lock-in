# SEAT SPEC — cf43 (lesson 4.3 'The First Memory Hierarchy')

Read `docs/research/cf-ch04-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf43.ts` + `v-cf43.ts` (tag `43`; helpers `cf43…`;
  export `export const lesson43`).
- id: `cf-the-first-memory-hierarchy`; number `'4.3'`; title
  `'The First Memory Hierarchy'` (verbatim).
- prerequisites: `['cf-the-processor-named-honestly']` (4.2 named the
  pocket; this lesson builds the whole library around it).
- sources: `['cs-cf-web-ground-ch04']`; quiz key `[1, 3, 0, 2, 2]`.

## The arc (the LIBRARY lesson — the speed/cost/size trade told with one honest ladder; NOT OS paging theory, NOT cell physics)
1. **The impossible wish** (the question): the processor (4.2) wants
   a warehouse that answers in one beat — no technology gives it.
   The wish has three clauses and the machine can only afford two:
   FAST, BIG, CHEAP — pick any two. The hierarchy is the honest
   answer: MANY memories, each buying back what the previous one
   cannot afford. Definition: *a memory hierarchy is said to be an
   arrangement of memories from the fastest and smallest to the
   slowest and largest, each level holding the data its level above
   uses most.*
2. **RAM and ROM** (the two named honestly): RAM — *random access*
   means any address answers in the same time, not that memory
   remembers; RAM is VOLATILE (power off → gone). DRAM: one
   transistor + one capacitor per bit; the capacitor LEAKS — refresh
   — a dated beat: Robert Dennard at IBM, invented 1966, US patent
   3,387,286 issued 4 June 1968; DDR rows refreshed within the
   standard 64 ms window (JEDEC). SRAM: six transistors per bit, no
   refresh, expensive — why it lives in cache (4.2's pocket).
   ROM — read-mostly, NON-volatile; the firmware chip on 4.1's board
   (BIOS/UEFI) is its modern home (flash); the honest note that
   'ROM' today means written-rarely, not never-writable.
3. **The ladder** (the census + the big figure): registers (inside
   the core, 4.2's ground) → L1/L2/L3 cache (SRAM pockets) → RAM
   (DRAM) → SSD (flash) → HDD (spinning platters) → the cloud/network.
   THE LADDER'S LATENCY CENSUS (Jeff Dean's 'Latency Numbers Every
   Programmer Should Know' shape — every ratio engine-pinned):
   L1 ≈ 0.5 ns; L2 ≈ 7 ns (14 × L1: 7/0.5 = 14); RAM ≈ 100 ns
   (14.285714...× L2: 100/7; ≈ 200 × L1); SSD random read ≈ 150 μs
   (1,500 × RAM: 150,000/100 = 1,500); HDD seek ≈ 10 ms (66.6667 ×
   SSD: 10,000,000/150,000); cross-ocean packet RTT ≈ 150 ms (15 ×
   HDD). THE HUMAN LADDER (the one metaphor the chapter keeps):
   scale each latency up so one L1 hit takes one SECOND — then L2
   takes 14 s, RAM takes 200 s (3 minutes 20 seconds), SSD takes
   300,000 s = 3.472222 days, HDD takes 10 ms / 0.5 ns =
   20,000,000 s = 231.481481 days = 7.605141 months (prose 'about
   7.6 months'), a cross-ocean fetch takes 150 ms / 0.5 ns =
   300,000,000 s = 9.5064263 years (365.25 days/year, prose 'about
   9.5 years'). THE ENGINE MUST COMPUTE
   EVERY ONE OF THESE.
4. **The storage shelf's own history** (two dated beats, honestly):
   the first HDD — IBM announced the 305 RAMAC on 14 September 1956;
   its IBM 350 disk stored 5 million 6-bit characters (≈ 3.75 MB in
   8-bit bytes) on 50 platters, weighed about a ton; flash storage
   (SSD) — no moving parts, random reads at DRAM's 1/1500th the
   price in patience. One honest line on capacities today (hedge in
   prose: consumer SSDs and HDDs reach terabytes).
5. **Locality** (why the trick works): temporal locality (used once
   → used again soon) and spatial locality (used once → its
   neighbours are wanted) — the two reasons a small pocket (cache)
   catches most requests. ONE Illustration: a book-reading pattern
   that is all locality (the cache wins) versus a leafing pattern
   that is none (the ladder punishes) — arithmetic honest and small.
6. **Virtual memory named and LEFT CLOSED**: the OS borrows the
   storage shelf to make RAM look bigger — one paragraph, the
   doorstep named ('Operating Systems' owns the theory door; the
   shelf has that book planned). The file system's shelf is
   chapter 7's ground — named, not opened.
7. **Doorsteps**: 'Computer Organization and Architecture' owns the
   hierarchy theory (miss rates, policies); 'Operating Systems' owns
   virtual memory; this lesson keeps the census and the instinct.
8. Exam corner: 'RAM versus ROM', 'volatile/non-volatile', 'why is
   cache small', 'order the ladder', 'the two localities', 'DRAM
   refresh', 'RAMAC census'.

## Figures (≥3 body + ≥4 solution)
- F1 the ladder pyramid: registers/L1/L2/L3/RAM/SSD/HDD/cloud drawn
  as a computed to-scale pyramid with the latency census printed on
  each shelf and the FAST/BIG/CHEAP triangle beside it.
- F2 the human ladder: the one-second baseline strip — each rung's
  wait drawn to one log scale (1 s, 14 s, 200 s, 1.5 days, 7.6
  months, 9.5 years) with the honest conversions printed.
- F3 the DRAM cell + refresh: 1T1C cell drawn with its leak and the
  64 ms refresh timer; SRAM's 6-transistor cell beside it (schematic,
  honest, no physics).
- F4 the locality pair: two request-sequence timelines (all-locality
  versus no-locality) with cache-hit fractions computed.
- Solution figures: pyramid crops for ordering exercises; ratio bar
  strips for the latency census; the 1T1C cell for the refresh
  exercise; RAMAC size-vs-weight honest strips.

## The pinned numbers (engine-verify each — complete list)
L1 0.5 ns; L2 7 ns = 14 × L1; RAM 100 ns = 14.285714...× L2 (pin
14.2857) = 200 × L1; SSD 150 μs = 1,500 × RAM; HDD 10 ms = 66.6667 ×
SSD (pin 66.6667); ocean RTT 150 ms = 15 × HDD. Human ladder (L1 =
1 s): L2 = 14 s; RAM = 200 s = 3 min 20 s; SSD = 300,000 s = 3.4722
days (300,000/86,400 = 3.472222...); HDD = 20,000,000 s = 231.481481
days = 7.605141 months (231.481481/30.4375 = 7.605141); ocean =
300,000,000 s = 9.5064263 years (365.25 days/year). Dennard 1966
invention, patent
3,387,286 on 4 June 1968; DDR refresh window 64 ms; SRAM 6
transistors/bit; RAMAC announced 14 September 1956, IBM 350: 50
platters, 5 million 6-bit chars ≈ 3.75 MB (5,000,000 × 6/8 =
3,750,000 bytes). Quiz key [1,3,0,2,2].
