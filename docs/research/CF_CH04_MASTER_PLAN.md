# CF_CH04_MASTER_PLAN — Computer Fundamentals, chapter 4 'Inside the Box' (CS RUN 7, whole-chapter)

Owner: the cs lane (:20 IST job). Cadence: ONE COMPLETE chapter per fire
(owner directive 2026-11-24) — all four planned lessons + the 4.R review,
one authoring agent per seat, chapter closed COMPLETE in the single run.

## The chapter's question

Chapters 1–3 gave the machine as a map (1), took a census of the
human handshake at its edges (2), and opened what those edges carry
— bits, and everything built on bits (3). Chapter 4 finally OPENS
THE BOX: the motherboard as a city plan (4.1), the processor named
honestly — cores, clock, cache, without the architecture theory
(4.2), the first memory hierarchy (4.3), and the roads: buses and
ports (4.4). The theory door is named and left closed: Computer
Organization and Architecture owns the deep story; Operating Systems
owns virtual memory; Digital Logic Design owns the gate-level view.

## Seats

| # | number | title (verbatim) | id | export |
|---|--------|------------------|----|--------|
| 1 | 4.1 | The Motherboard: the City Plan | cf-the-motherboard-the-city-plan | lesson41 |
| 2 | 4.2 | The Processor Named Honestly | cf-the-processor-named-honestly | lesson42 |
| 3 | 4.3 | The First Memory Hierarchy | cf-the-first-memory-hierarchy | lesson43 |
| 4 | 4.4 | Buses and Ports: How the Pieces Talk | cf-buses-and-ports-how-the-pieces-talk | lesson44 |
| 5 | 4.R | Unit 4 Completion Review | cf-unit-4-completion-review | lesson4R |

Quiz keys (engine-pinned; e2e replays them live):
4.1 [2,0,3,1,3] · 4.2 [3,0,1,2,1] · 4.3 [1,3,0,2,2] · 4.4 [2,1,3,0,0] · 4.R [3,1,0,1,2]

Prereq chain (Z-census pin):
- 4.1 ← ['cf-the-basic-structure-and-operation-of-the-computer'] (ch.1's map)
- 4.2 ← ['cf-the-motherboard-the-city-plan']
- 4.3 ← ['cf-the-processor-named-honestly']
- 4.4 ← ['cf-the-motherboard-the-city-plan', 'cf-the-first-memory-hierarchy']
- 4.R ← all four ch.4 ids

sources: ['cs-cf-web-ground-ch04'] on every lesson.

## The web-verified ground (banked 2026-11-25, SOURCE_LOG key cs-cf-web-ground-ch04)

- ATX: Intel, 1995 (Advanced Technology eXtended), 305 × 244 mm; microATX ≤ 244 mm square; Mini-ITX: VIA Technologies 2001, 170 × 170 mm (Wikipedia ATX / Mini-ITX; things-embedded, DFI blog).
- IBM 305 RAMAC: publicly announced 14 September 1956; IBM 350 disk = 50 platters, 5 million 6-bit characters ≈ 3.75 MB; first commercial computer with a moving-head HDD (Wikipedia; computerhistory.org).
- DRAM: Robert Dennard at IBM, invented 1966; one transistor + one capacitor; US patent 3,387,286 issued 4 June 1968 (IBM Research blog; Invent.org; Micron).
- SRAM cell: six transistors per bit (canonical).
- Intel 4004: announced 15 November 1971, 2,300 transistors, ~740 kHz; first commercially available single-chip microprocessor (Intel history; Wikipedia).
- Moore's law: Gordon Moore, 'Cramming more components onto integrated circuits', Electronics, 19 April 1965 (doubling every year); revised 1975 to every two years; the largest chips now reach ~134 billion transistors (Apple M2 Ultra, 2023).
- Dual-core month: May 2005 — Intel Pentium D (its first consumer dual-core) and AMD Athlon 64 X2 released in the same month (Wikipedia Athlon 64 X2).
- The 1 GHz race: AMD Athlon first to 1 GHz on 6 March 2000; Intel's 1 GHz Pentium III followed two days later (Wikipedia Athlon; contemporaneous press).
- Latency ladder (Jeff Dean's 'Latency Numbers Every Programmer Should Know' shape, ratios the lesson pins): L1 ≈ 0.5 ns; L2 ≈ 7 ns; main memory ≈ 100 ns; SSD random read (4 KB) ≈ 150 μs; HDD seek ≈ 10 ms; cross-ocean packet RTT ≈ 150 ms.
- USB: 1.0 introduced 1996 (12 Mbps full speed); 2.0 spec released 27 April 2000 (480 Mbps); 3.0 in 2008 (5 Gbps); USB Type-C connector spec August 2014; USB4 (2019) 40 Gbps (Wikipedia USB; usb.org document library).
- HDMI: 1.0 released 9 December 2002, 4.95 Gbps (1080p60); 2.1 (2017) 48 Gbps (Wikipedia HDMI; hdmi.org).
- SATA: 1.0 (2003) 1.5 Gbit/s; 3.0 (2009) 6 Gbit/s — with 8b/10b, 600 MB/s raw (Wikipedia SATA).
- PCIe: 1.0 2.5 GT/s (8b/10b → 250 MB/s per lane); 3.0 (2010) 8 GT/s, 128b/130b → 985 MB/s per lane; 4.0 (2017) 16 GT/s; 5.0 (2019) 32 GT/s (~3.94 GB/s per lane); x16 gen4 ≈ 31.5 GB/s (Wikipedia PCI Express; pcisig.com).
- 32-bit address bus names 2^32 = 4,294,967,296 bytes = exactly 4 GiB (engine arithmetic).
- DDR DRAM standard refresh interval: 64 ms (JEDEC; every row refreshed within 64 ms).
- Northbridge/southbridge chipset era; Intel moved the memory controller INTO the CPU with Nehalem (2008) — the honest one-line history (Wikipedia).

STUDY-NEVER-REPRODUCE absolute: every roster, figure, Illustration, quiz
item and exercise is OUR OWN, engine-pinned in scripts/verify-cs-book2-ch04.ts.
