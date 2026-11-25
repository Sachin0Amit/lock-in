# SEAT SPEC — cf44 (lesson 4.4 'Buses and Ports: How the Pieces Talk')

Read `docs/research/cf-ch04-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf44.ts` + `v-cf44.ts` (tag `44`; helpers `cf44…`;
  export `export const lesson44`).
- id: `cf-buses-and-ports-how-the-pieces-talk`; number `'4.4'`; title
  `'Buses and Ports: How the Pieces Talk'` (verbatim).
- prerequisites: `['cf-the-motherboard-the-city-plan',
  'cf-the-first-memory-hierarchy']` (4.1 drew the roads; 4.3 priced
  what travels them).
- sources: `['cs-cf-web-ground-ch04']`; quiz key `[2, 1, 3, 0, 0]`.

## The arc (the ROADS lesson — what a bus is, what a lane buys, what a port promises: arithmetic, not protocol theory)
1. **The road idea** (definition): *a bus is said to be a shared
   communication pathway carrying signals between components — a set
   of parallel lines with one purpose.* The three-bus census:
   ADDRESS bus (where), DATA bus (what), CONTROL bus (when/how).
   THE ARITHMETIC of width: n address lines name $2^n$ addresses —
   32 address lines name $2^{32} = 4{,}294{,}967{,}296$ bytes = exactly
   4 GiB (chapter 3's honest ladder closes the loop); doubling width
   doubles what one beat carries. Why the traffic jam: a SHARED bus
   serves one transaction at a time — the queue, the arbitration, the
   honest picture of rush hour.
2. **Parallel versus serial** (the honest reversal): parallel sent n
   bits on n wires per beat; skew — wires of slightly different
   lengths/properties arriving at slightly different times — punished
   width at speed; serial won by going WIDE IN TIME: fewer wires,
   much faster clocks. PCIe's lanes are the modern answer: a lane =
   2 wire pairs, one each direction; a x16 slot is 16 lanes bundled.
3. **PCIe priced** (the census + table + derivation): generation
   1.0 — 2.5 GT/s, 8b/10b encoding → 250 MB/s per lane; generation
   3.0 (2010) — 8 GT/s, 128b/130b → 8 × (128/130) / 8 = 0.9846 GB/s
   ≈ 985 MB/s per lane; generation 4.0 (2017) — 16 GT/s ≈ 1.97 GB/s
   per lane; generation 5.0 (2019) — 32 GT/s ≈ 3.94 GB/s per lane.
   THE DERIVATION (one, engine-pinned): GT/s counts TRANSFERS, bytes
   ride through the encoding overhead — 8 GT/s × 128/130 bits =
   7.876923 Gbit/s ÷ 8 = 984.615385 MB/s per lane (pin 984.6154); a
   x16 gen4 slot ≈ 16 × 1969.230769 MB/s = 31.507692 GB/s (pin
   31.5077).
4. **The ports** (the outside world's plugs, one honest table):
   USB — 1.0 introduced 1996 (12 Mbps full speed); 2.0 released
   27 April 2000 (480 Mbps — 40× USB 1.0: 480/12 = 40); 3.0 (2008,
   5 Gbps — 10.4167× USB 2.0: 5000/480); USB4 (2019, 40 Gbps); the
   USB-C connector spec August 2014 — one plug, the same roads as the
   old one, honest line that the connector is NOT the speed.
   HDMI — 1.0 released 9 December 2002 (4.95 Gbps, 1080p at 60 Hz);
   2.1 (2017, 48 Gbps — 48/4.95 = 9.696970 ×, pin 9.69697). SATA —
   1.0 (2003, 1.5 Gbit/s); 3.0 (2009, 6 Gbit/s → with 8b/10b, 600 MB/s
   raw: 6,000,000,000/10/8 = 600,000,000 B/s). Network — Ethernet
   1 Gbit/s common; Wi-Fi hedged honestly in prose. Bluetooth 1.0
   1999 — one line, the honest short-range hedge.
5. **The port-versus-internal-road divide** (one section): internal
   buses (PCIe) vs external ports (USB/HDMI) vs storage roads (SATA/
   NVMe over PCIe — one honest line that an NVMe SSD rides PCIe
   lanes, connecting to 4.3's shelf). The bandwidth-competition
   Illustration: a graphics card on x16 gen4 moves 31.5 GB/s while
   a USB 2.0 stick moves 0.048 GB/s (480 Mbps = 60 MB/s line rate
   ÷ 8 = 60 MB/s; honest usable ~40 MB/s hedged in prose) — the
   ratio 31,507.6923/60 = 525.13 × (compute both ways, engine-pinned:
   31.5077 GB/s vs 60 MB/s line = 525.128205× — pin 525.1282).
6. **Doorsteps**: 'Computer Networks' owns the network-theory door
   (the shelf has it planned); 'Digital Logic Design' owns the
   signalling; this lesson keeps the widths, the prices and the
   plug census.
7. Exam corner: 'the three buses', 'address width arithmetic',
   'parallel vs serial', 'USB generations', 'HDMI purpose', 'SATA
   rate', 'what PCIe lane means', 'NVMe rides PCIe'.

## Figures (≥3 body + ≥4 solution)
- F1 the three-bus strip: address/data/control as three labelled
  roads between CPU, chipset, RAM and ports, with the 'one
  transaction at a time' queue drawn on the shared segment.
- F2 the width arithmetic bar: 8/16/32/64 address lines against the
  memory they name (256 B/64 KiB/4 GiB/16 EiB computed) — log bars
  with the 4 GiB witness highlighted.
- F3 the PCIe generation ladder: gen1/3/4/5 as per-lane and x16
  bundles, MB/s computed, the encoding overhead (8b/10b vs 128b/130b)
  drawn as the honest toll gate.
- F4 the port wall: the I/O panel drawn with USB-A, USB-C, HDMI,
  Ethernet, audio — each plug captioned with its generation and
  rate from the census.
- Solution figures: three-bus mini maps for bus exercises; width
  bars for the $2^n$ arithmetic; PCIe toll-gate crops for the
  bandwidth derivation; USB-generation staircases.

## The pinned numbers (engine-verify each — complete list)
$2^{32} = 4{,}294{,}967{,}296$ bytes = 4 GiB exactly; 64 address lines
name $2^{64} = 18{,}446{,}744{,}073{,}709{,}551{,}616$ bytes = 16 EiB
(18.446744073709552 × 10^18; pin 16 EiB via $2^{64}/2^{60}$). PCIe:
gen1 2.5 GT/s 8b/10b = 250 MB/s per lane (2.5 × 0.8 = 2 Gbit/s ÷ 8);
gen3 8 GT/s × 128/130 = 7.876923 Gbit/s = 984.615385 MB/s per lane
(pin 984.6154); gen4 16 GT/s = 1.969231 GB/s per lane (pin
1969.2308 MB/s); gen5 32 GT/s = 3.938462 GB/s per lane (pin
3938.4615 MB/s);
x16 gen4 = 31.507692 GB/s (pin 31.5077); x16 gen5 = 63.015385 GB/s
(pin 63.0154). USB: 1.0 1996 12 Mbps; 2.0 27 April 2000 480 Mbps =
40× (480/12); 3.0 2008 5 Gbps = 10.4167× (5000/480, pin 10.416667);
USB4 2019 40 Gbps = 8 × USB 3.0; USB-C spec August 2014. HDMI 1.0
9 December 2002, 4.95 Gbps; 2.1 2017, 48 Gbps = 9.696970 × (pin
9.69697). SATA 1.0 2003 1.5 Gbit/s; 3.0 2009 6 Gbit/s; 8b/10b →
600 MB/s raw (6 × 10^9 × 8/10 ÷ 8). USB 2.0 line rate = 480 Mbit/s ÷ 8
= 60 MB/s; x16 gen4 vs USB 2.0 line: 31,507.6923/60 = 525.128205 (pin
525.1282). Quiz key [2,1,3,0,0].
