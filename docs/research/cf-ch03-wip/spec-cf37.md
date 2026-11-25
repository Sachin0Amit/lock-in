# SEAT SPEC — cf37 (lesson 3.7 'Binary to Decimal Conversion')

Read `docs/research/cf-ch03-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf37.ts` + `v-cf37.ts` (tag `37`; helpers `cf37…`;
  export `export const lesson37`).
- id: `cf-binary-to-decimal-conversion`; number `'3.7'`; title
  `'Binary to Decimal Conversion'` (verbatim).
- prerequisites: `['cf-the-numbering-systems-binary-octal-hexadecimal']`
  (3.6 is its sibling but NOT a prerequisite — both hang off 3.2; say
  so in prose: 'the mirror of the ladder you may already have met').
- sources: `['cs-cf-web-ground']`; quiz key `[3, 2, 1, 0, 3]`.

## The arc (the CRAFT lesson, direction TWO: binary/octal/hex IN, decimal OUT)
1. **The problem mirrored**: the machine hands you a pattern — a file
   size, an address, a colour code like 101101 or 0x2D — and the
   human needs the number it names.
2. **Method 1 — the weight (positional) sum** (the spine): write the
   place values over the digits and add the ones under the 1-bits.
   Full worked Illustrations: 101101₂ → 32 + 8 + 4 + 1 = 45; the
   2026 witness 11111101010₂ → 1024 + 512 + 256 + 128 + 64 + 32 + 8
   + 2 = 2026; the byte 11001011₂ = 203. `derivation`: why the sum
   is exactly the reverse of 3.6's ladder (the same place-value
   theorem read backwards).
3. **Method 2 — the doubling (Horner) ladder**: sweep left to right,
   double and add each bit. Traces shown move by move: 110110 → 1 → 3
   → 6 → 13 → 27 → 54; 101101 → 1 → 2 → 5 → 11 → 22 → 45. When it
   wins: long numerals with sparse tables, mental math, and (one
   honest line) it is the same Horner scheme that evaluates
   polynomials — the base-b value IS a polynomial in b evaluated at
   the digits.
4. **Method 3 — the grouped read** (the programmer's shortcut):
   regroup binary by 4 → read hex; by 3 → read octal; then one hex
   arithmetic: 1111 0101 0010 = F52₁₆ = 15·256 + 5·16 + 2 = 3,922;
   305₈ = 3·64 + 5 = 197. Colour-code witnesses (#FF = 255, the
   max channel) — one paragraph tying to 3.4's RGB census.
5. **Fractions mirrored**: 0.011₂ = 0.25 + 0.125 = 0.375; 101.11₂ =
   5.75 (the point splits positive and negative powers).
6. **The census instinct — popcount**: count the 1-bits to sanity-
   check magnitude; 1111₂ carries 4 ones; 2026 (11111101010₂)
   carries 8. The doubling shortcut: appending a 0 bit doubles the
   value (1101₂ = 13 → 11010₂ = 26).
7. **Doorsteps**: 3.6 the mirror; 3.8 the synthesis; full theory in
   'Arithmetic and Number Systems'.
8. Exam corner: read-the-pattern drills on the pinned witnesses +
   exercise-fresh values; the 'which method for which shape' ask; the
   grouped-read shortcut.

## Figures (≥3 body + ≥4 solution)
- F1 the weight-sum table: 11111101010 with its place values (1024
  down to 1) as an aligned grid, the 1-bit cells highlighted, the
  chosen powers summed to 2026.
- F2 the doubling ladder: 110110 swept left-to-right with the running
   values 1, 3, 6, 13, 27, 54 in boxes.
- F3 the grouped read: one long binary string regrouped by 4 with
   braces into hex digits, then the hex positional sum.
- F4 (optional) the mirror diagram: 3.6's ladder pointing down beside
   3.7's sum pointing up, meeting at the same 45.
- Solution figures: per-exercise weight grids; doubling traces;
   regrouping braces; fraction point-splits.

## The pinned numbers (engine-verify each — complete list)
Weight sums: 101101 = 45 (32+8+4+1); 11111101010 = 2026 (1024+512+256+
128+64+32+8+2); 11001011 = 203. Doubling: 110110 → 1,3,6,13,27,54 =
54; 101101 → 1,2,5,11,22,45 = 45. Grouped: 1111 0101 0010 = F52 =
3,922 (15·256 + 5·16 + 2); 305₈ = 197 (3·64 + 5); #FF = 255.
Fractions: 0.011 = 0.375; 101.11 = 5.75. Census: popcount(1111) = 4;
popcount(11111101010) = 8; 1101 = 13 → 11010 = 26 (double).
Quiz key [3,2,1,0,3].
