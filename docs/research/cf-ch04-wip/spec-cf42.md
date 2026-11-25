# SEAT SPEC — cf42 (lesson 4.2 'The Processor Named Honestly')

Read `docs/research/cf-ch04-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf42.ts` + `v-cf42.ts` (tag `42`; helpers `cf42…`;
  export `export const lesson42`).
- id: `cf-the-processor-named-honestly`; number `'4.2'`; title
  `'The Processor Named Honestly'` (verbatim).
- prerequisites: `['cf-the-motherboard-the-city-plan']` (4.1 put the
  socket on the map; this lesson names what sits in it).
- sources: `['cs-cf-web-ground-ch04']`; quiz key `[3, 0, 1, 2, 1]`.

## The arc (the HONEST-NAMING lesson — cores, clock, cache, the cycle: no architecture theory, no gate circuits)
1. **The honest contract** (the question): 'the brain of the computer'
   is a lie of convenience — the processor is a DEDICATED ARITHMETIC
   AND CONTROL STATION. Definition: *a processor (CPU) is said to be
   the component that fetches instructions from memory, decodes them,
   executes them, and writes back the results, repeating billions of
   times a second.* The cycle named: fetch → decode → execute →
   write back — ONE honest loop, told in prose + a figure; the
   von Neumann bottleneck NAMED honestly (the road between processor
   and memory is the machine's narrow street — one line; the term is
   John Backus's 1977 Turing lecture), and the fix-ideas (cache,
   locality) deferred to 4.3.
2. **The clock** (the metronome priced): a clock rate in hertz counts
   CYCLES per second — the metronome beat, not the amount of work
   (the honest warning: GHz compares beats, not brains). THE
   ARITHMETIC: 1 GHz = $10^9$ cycles/s; one 5 GHz cycle = $1/5
   \times 10^9$ s = 0.2 ns; the 4004's 740 kHz versus a 5 GHz core =
   5,000,000,000/740,000 = 6,756.756756...× (pin 6756.7568). THE
   STORY (honest, dated): AMD's Athlon first reached 1 GHz on
   6 March 2000; Intel's 1 GHz Pentium III followed two days later —
   the race the press called the gigahertz race; and the race ended
   because power (heat) took over — the honest reason clocks
   flattened and cores multiplied.
3. **The cores** (from one worker to a team): a core is a complete
   worker station — fetch, decode, execute all its own. The dated
   beat: May 2005, the dual-core month — Intel's Pentium D (its
   first consumer dual-core) and AMD's Athlon 64 X2 shipped in the
   same month; Moore's law made the team affordable (below). THE
   ARITHMETIC: a 4-core 3 GHz machine offers at most 12 GHz of
   summed beat-time ONLY for parallelisable work ($4 \times 3 = 12$)
   — the honest catch, told with the four-cooks-kitchen picture:
   division of work has overhead; not every recipe divides.
4. **Moore's law** (the engine under the story): Gordon Moore,
   'Cramming more components onto integrated circuits', Electronics,
   19 April 1965 — doubling every year; revised in 1975 to every two
   years. THE ARITHMETIC (a derivation + Illustration): from the
   4004's 2,300 transistors (15 November 1971, the first commercial
   single-chip microprocessor), doubling every two years gives
   $2,300 \times 2^{(2023-1971)/2} = 2,300 \times 2^{26} = 154{,}350{,}387{,}200$
   ≈ 154 billion predicted for 2023 — against Apple's M2 Ultra's
   134 billion actual (2023): the prediction within 15% after half
   a century is the honest way to show the law's grip. Note the
   honest caveat in prose: Moore's law is a historical ENGINEERING
   TREND, not a physical law, and its pace has visibly slowed.
5. **The cache** (the pocket): a cache is a small, fast memory INSIDE
   the processor holding copies of recently used data — the pocket
   versus the warehouse (RAM). L1/L2/L3 named with honest typical
   sizes (L1 tens of KB per core; L2 hundreds of KB to a few MB per
   core; L3 tens of MB shared); SRAM built from six transistors per
   bit versus DRAM's one — WHY the pocket is small (the pocket's
   cloth is expensive). The hierarchy ladder itself is 4.3's ground —
   here only the pocket exists.
6. **Threads** (the honest one-section treatment): a thread is a
   stream of work; SMT/hyperthreading lets one core keep two streams
   moving so idle beat-time gets used — the honest hedge that it is
   NOT a second core.
7. **Doorsteps**: 'Computer Organization and Architecture' owns the
   pipeline, hazards, ISA and microarchitecture theory door — named
   and closed. The memory system the processor reaches into is 4.3.
8. Exam corner: 'what does the clock rate measure', 'fetch-decode-
   execute', 'what is a core', 'Moore's law statement and date',
   'why cache is small and fast', '4004 census'.

## Figures (≥3 body + ≥4 solution)
- F1 the cycle wheel: fetch → decode → execute → write back drawn as
  a computed circular diagram with a beating clock ring (0.2 ns per
  beat at 5 GHz captioned).
- F2 the clock history: 740 kHz (1971) → 1 GHz (6 March 2000, AMD
  first, Intel two days later) → 5 GHz flat (heat wall) — a
  log-scale rising line with the flattening told honestly.
- F3 the core/team map: one core (one worker) versus four cores
  (four workers, $4 \times 3 = 12$ GHz summed — with the 'only if
  the work divides' banner).
- F4 the Moore ladder: 2,300 (1971) doubling to the 154 billion
  2023 prediction versus the 134 billion actual — bars to one
  computed scale.
- Solution figures: cycle-position strips (which stage is which),
  clock-ratio bar strips (4004 vs 5 GHz), core-count versus summed
  GHz tables-as-bars, Moore doubling staircases for exercises.

## The pinned numbers (engine-verify each — complete list)
1 GHz = 10^9 cycles/s; one 5 GHz cycle = 0.2 ns; 740 kHz (4004,
740,000 cycles/s); 5 GHz/740 kHz = 6756.756756... (pin 6756.7568);
1 GHz/740 kHz = 1351.351351... (pin 1351.3514); Moore 19 April 1965
Electronics, revised 1975 to every two years; 4004 = 2,300
transistors, announced 15 November 1971, first commercial single-chip
microprocessor; $2,300 \times 2^{26} = 154{,}350{,}387{,}200$ (the
2023 Moore prediction); Apple M2 Ultra = 134 billion transistors
(2023); prediction/actual = 154,350,387,200/134,000,000,000 =
1.151868561 (pin 1.151869, the prediction 15.186856% above actual);
May 2005 dual-core month (Pentium D + Athlon 64 X2); 6 March 2000
AMD 1 GHz first, Intel two days later; 4 cores × 3 GHz = 12 GHz
summed; SRAM 6 transistors/bit, DRAM 1 transistor + 1 capacitor;
L1/L2/L3 typical size bands (prose-hedged, not exact pins). Quiz key
[3,0,1,2,1].
