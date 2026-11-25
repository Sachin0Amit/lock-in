# SEAT SPEC — cf41 (lesson 4.1 'The Motherboard: the City Plan')

Read `docs/research/cf-ch04-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf41.ts` + `v-cf41.ts` (tag `41`; helpers `cf41…`;
  export `export const lesson41`).
- id: `cf-the-motherboard-the-city-plan`; number `'4.1'`; title
  `'The Motherboard: the City Plan'` (verbatim).
- prerequisites: `['cf-the-basic-structure-and-operation-of-the-computer']`
  (chapter 1 gave the machine as a map; this lesson opens the box and
  reads the map off the physical board).
- sources: `['cs-cf-web-ground-ch04']`; quiz key `[2, 0, 3, 1, 3]`.

## The arc (the CITY-PLAN lesson — the board as the addressable ground; NOT the processor's insides, NOT the memory chips' insides)
1. **Opening the box** (the question): chapters 1–3 kept the box closed
   — the map said 'processor here, memory there'. The motherboard is
   the GROUND the map is drawn on: definition — *the motherboard is the
   main printed circuit board of a computer, carrying the processor,
   memory, chipset and expansion slots, and interconnecting them with
   printed copper traces.* The city-plan metaphor, priced precisely:
   roads = traces and buses; plots = sockets and slots; utilities =
   power (24-pin ATX main + 8-pin CPU), the CMOS cell, the firmware
   chip; districts = the form factors.
2. **The printed circuit board itself**: copper traces as printed
   roads (widths measured in tenths of a millimetre), multiple copper
   LAYERS (a modern board commonly carries 6–10 layers, some buried;
   the honest hedge 'commonly'), vias as the flyovers between layers,
   solder mask giving boards their colour. The city that arrives
   PRINTED, not wired by hand: one honest historical beat — the IBM
   PC (August 1981) and its single planar board set the shape of the
   personal computer.
3. **Form factors — the districts** (table + figure + Illustration):
   a form factor is the CONTRACT fixing a board's size, mounting holes
   and I/O layout. ATX: Intel 1995, 305 × 244 mm; microATX: ≤ 244 mm
   square (1996); Mini-ITX: VIA Technologies 2001, 170 × 170 mm.
   THE ARITHMETIC: areas 305 × 244 = 74,420 mm²; 244² = 59,536 mm²
   (microATX is EXACTLY 80.0% of ATX: 59,536/74,420 = 0.800000
   precisely); 170² = 28,900 mm² (Mini-ITX ≈ 38.8336% of ATX:
   28,900/74,420 = 0.388336469, ≈ 48.5421% of microATX:
   28,900/59,536 = 0.485420586). A Mini-ITX and
   an ATX board CARRY the same city on different land — the contract
   is the shape, not the capability.
4. **The plots** (the component census + the labelled city-plan
   figure): the CPU SOCKET (a zero-insertion-force grid; LGA puts
   lands on the board, PGA puts pins on the chip — one honest line);
   the DIMM SLOTS for memory (a desktop DIMM today: 288 pins); the
   PCIe EXPANSION SLOTS (the removable-district rule — graphics,
   storage, network cards ride in as complete districts; the bus
   arithmetic itself belongs to 4.4); the CHIPSET — the board's town
   hall, the interconnect manager; one dated honest line: the
   northbridge/southbridge pair gave way as Intel folded the memory
   controller into the processor (Nehalem, 2008); the FIRMWARE CHIP
   (BIOS/UEFI — the machine's first waking speech; the deep story is
   later on the shelf); the CMOS cell (a CR2032 3 V lithium coin cell
   keeping the clock alive while the machine sleeps); the VRM — the
   power plant stepping the supply down to what the processor eats.
5. **Power and the pulse**: the 24-pin ATX main connector + the 8-pin
   CPU feed (one line each); the system clock's heartbeat distributed
   across the city — a whole city running on ONE metronome, the
   honest hand-off to 4.2 where the clock is priced.
6. **Doorsteps**: the processor's own insides are 4.2 (next); memory
   and the storage ladder are 4.3; the roads (buses, ports) are 4.4;
   'Computer Organization and Architecture' owns the theory door —
   this chapter names components, it does not theorise them.
7. Exam corner: 'what does the motherboard carry', 'ATX year and
   size', 'Mini-ITX origin and size', 'what is a form factor', 'CMOS
   cell purpose', 'chipset role'.

## Figures (≥3 body + ≥4 solution)
- F1 the city plan: a labelled ATX-style board drawing computed to
  scale — socket centre-top, four DIMM slots right of it, PCIe slots
  along the bottom, chipset between, VRM bank left of the socket,
  CR2032 coin cell, 24-pin edge connector, I/O panel edge — with a
  mm-true outline (305 × 244 box) and a Mini-ITX 170 × 170 ghost box
  overlaid to scale showing how much land the small district saves.
- F2 the form-factor ladder: three true-to-area rectangles (74,420 /
  59,536 / 28,900 mm²) with the percentage captions computed.
- F3 the power-and-pulse strip: PSU → 24-pin → VRM bank → socket, and
  the clock metronome fanning out to every district.
- F4 (optional) the via/layers stack: 6 copper layers seen edge-on
  with one via drilling through, a trace changing layers.
- Solution figures: mini city-plan crops for exercise answers (label
  the socket/slots/chipset on a small board); area-ratio bar strips
  for the form-factor arithmetic; the power-path strip for the VRM
  exercise; the layer stack for the trace exercise.

## The pinned numbers (engine-verify each — complete list)
ATX 1995, 305 × 244 mm = 74,420 mm²; microATX ≤ 244 mm square =
59,536 mm² = EXACTLY 0.800000 of ATX (80.0% on the nose);
Mini-ITX VIA 2001, 170 × 170 mm = 28,900 mm² = 0.388336469 of ATX
(pin 0.388336) = 0.485420586 of microATX (pin 0.485421); IBM PC
August 1981 planar
board; DIMM 288 pins; CR2032 = 3 V lithium coin cell; 24-pin main +
8-pin CPU connectors; northbridge/southbridge → Nehalem 2008 folded
the memory controller into the CPU; board layers 'commonly 6–10'
(hedge honestly in prose, do not pin as exact). Quiz key [2,0,3,1,3].
