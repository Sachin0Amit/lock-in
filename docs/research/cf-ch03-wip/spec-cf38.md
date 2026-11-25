# SEAT SPEC — cf38 (lesson 3.8 'Decimal and Binary Number System')

Read `docs/research/cf-ch03-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf38.ts` + `v-cf38.ts` (tag `38`; helpers `cf38…`;
  export `export const lesson38`).
- id: `cf-decimal-and-binary-number-system`; number `'3.8'`; title
  `'Decimal and Binary Number System'` (verbatim — the school-syllabus
  title; honour it as the SYNTHESIS seat, not a repeat).
- prerequisites: `['cf-decimal-to-binary-conversion',
  'cf-binary-to-decimal-conversion']` (both crafts in hand; this lesson
  sets the two SYSTEMS side by side and does arithmetic).
- sources: `['cs-cf-web-ground']`; quiz key `[0, 2, 1, 3, 0]`.

## The arc (the SYNTHESIS seat — the two systems as ONE idea; NOT a re-teach of 3.2/3.6/3.7 — every conversion fact is CITED forward, not redrilled)
1. **The family portrait**: decimal and binary are the SAME machine —
   positional notation — wearing different alphabets (10 digits on
   ten fingers, a historical note on why humans settled decimal; 2
   states on the physics of a switch). The side-by-side counting
   strip 0–10: 0,1,10,11,100,101,110,111,1000,1001,1010 — with the
   odometer principle: when a column fills, it rolls. The four-dress
   witness one last time: 45 = 101101₂ = 55₈ = 2D₁₆ (cite 3.2).
2. **The anatomy comparison** (table): base, digits, place values
   (10³, 10², 10, 1 vs 2³, 2², 2, 1), largest 3-digit value (999 vs
   111₂ = 7), digits needed for a million (7 decimal vs 20 binary) —
   the TRADE: binary needs ~3.32× more digits (log2 10 — state as
   'about three and a third digits per decimal digit', engine value
   3.3219280948873623, one honest line, no proof) but each digit is
   trivially cheap to build.
3. **Binary arithmetic — the first meeting** (the new ground of this
   seat; everything computed and shown as addition tables):
   - **Addition** with the carry rule 1+1 = 10: 1011 + 110 = 10001
     (11 + 6 = 17) worked digit by digit; the carry cascade 111 + 1 =
     1000 (7 + 1 = 8 — three carries!); 101 + 101 = 1010 (5 + 5).
     The half-adder truth idea in ONE sentence (sum and carry), then
     the doorstep: circuits ride 'Digital Logic Design'.
   - **Subtraction** with borrows: 1010 − 110 = 100 (10 − 6 = 4);
     1100 − 111 = 101 (12 − 7 = 5, the borrow chain shown).
   - **Multiplication as shifts and adds** (the beautiful one):
     101 × 11 = 1111 (5 × 3 = 15) = 101·1 + 101·10 = 101 + 1010 —
     shifting left APPENDS a 0 and doubles: 1101₂ = 13 → 11010₂ = 26.
     `derivation`: multiplication by 2^k = k left shifts — why binary
     makes a computer's multiplier a shifter-adder.
   - **The two's-complement idea in one honest paragraph** (negative
     numbers exist as fixed-width patterns; the theory rides Digital
     Logic Design) — no drills, just the door.
4. **Why the machine keeps binary** (the payoff paragraph): the
   Boole 1854 → Shannon 1937 line (cite 3.1's heritage): two-valued
   logic + two-state switches = arithmetic from switches. The one-
   hand finger counter (5 bits = 32 states) as the reader's own
   binary machine — an Illustration.
5. **Doorsteps** (the chapter close before the review): 'Arithmetic
   and Number Systems' owns bases and divisibility; 'Digital Logic
   Design' owns adders and complement arithmetic; 3.R gathers the
   chapter.
6. Exam corner: side-by-side counting, digit-count comparison, small
   binary additions/subtractions, the shift-double property.

## Figures (≥3 body + ≥4 solution)
- F1 the family portrait: two numeral columns (same number 45) with
  matched place-value scaffolds — 4,728-style anatomy in both bases.
- F2 the counting strip 0–10 side by side with roll-over moments
  marked (computed alignment).
- F3 the carry cascade: 111 + 1 = 1000 with the three carries as
  travelling arrows, column by column.
- F4 (optional) the shift-double ladder: 1101 → 11010 → 110100
  (13 → 26 → 52).
- Solution figures: addition grids per exercise; borrow chains;
  shift-and-add decompositions; finger-count state diagrams.

## The pinned numbers (engine-verify each — complete list)
4,728 = 4·1000 + 7·100 + 2·10 + 8; 101101 = 1·32 + 0·16 + 1·8 + 1·4 +
0·2 + 1. Counting 0–10: 0,1,10,11,100,101,110,111,1000,1001,1010.
Largest 3-digit: 999 vs 7; a million: 7 decimal digits vs 20 bits;
log2 10 = 3.3219280948873623. Addition: 1011 + 110 = 10001 (17);
111 + 1 = 1000 (8); 101 + 101 = 1010 (10). Subtraction: 1010 − 110 =
100 (4); 1100 − 111 = 101 (5). Multiplication: 101 × 11 = 1111 (15) =
101 + 1010; shifts: 13 → 26 → 52 (1101 → 11010 → 110100). One hand =
32 states; two hands = 1,024. 45 = 101101₂ = 55₈ = 2D₁₆. Dates: Boole
1854; Shannon 1937 thesis. Quiz key [0,2,1,3,0].
