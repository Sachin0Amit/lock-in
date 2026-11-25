# SEAT SPEC — cf36 (lesson 3.6 'Decimal to Binary Conversion')

Read `docs/research/cf-ch03-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf36.ts` + `v-cf36.ts` (tag `36`; helpers `cf36…`;
  export `export const lesson36`).
- id: `cf-decimal-to-binary-conversion`; number `'3.6'`; title
  `'Decimal to Binary Conversion'` (verbatim).
- prerequisites: `['cf-the-numbering-systems-binary-octal-hexadecimal']`
  (the positional census of 3.2 grounds the craft).
- sources: `['cs-cf-web-ground']`; quiz key `[1, 0, 3, 2, 2]`.

## The arc (the CRAFT lesson, direction ONE: decimal IN, binary/octal/hex OUT; 3.7 owns the reverse; 3.8 owns the synthesis)
1. **The problem**: humans hold decimal; machines hold patterns. The
   bridge must be a PROCEDURE, not guesswork. (State honestly: this is
   the exam bench's favourite drill.)
2. **Method 1 — the division ladder** (the spine; `algorithm` block +
   figure): divide by 2, KEEP THE REMAINDER, repeat on the quotient
   until zero; read the remainders BOTTOM-UP. Full worked ladders
   (Illustrations with every row shown):
   - 45: 45/2 = 22 r1; 22/2 = 11 r0; 11/2 = 5 r1; 5/2 = 2 r1; 2/2 =
     1 r0; 1/2 = 0 r1 → remainders bottom-up 1,0,1,1,0,1 → 101101₂.
   - 77 → 1001101₂; 100 → 1100100₂ (remainders bottom-up 1,1,0,0,1,0,0);
     156 → 10011100₂; 255 → 11111111₂; 256 → 100000000₂ (the roll-over
     witness); 2026 → 11111101010₂.
   - WHY it works (derivation): the remainder on division by 2 IS the
     units bit (mod exposes the last digit); dividing by 2 shifts the
     ladder one place up. Generalize: base 8 / base 16 ladders use the
     same machine — 45 → 55₈; 100 → 144₈; 2026 → 3752₈; 45 → 2D₁₆;
     100 → 64₁₆; 2026 → 7EA₁₆ (7·256 + 14·16 + 10).
3. **Method 2 — the positional (powers) method**: subtract the largest
   fitting power of 2, mark the place, repeat: 100 − 64 = 36; 36 − 32
   = 4; 4 − 4 = 0 → places 64 + 32 + 4 → 1100100₂. When each method
   wins (a `comparison` table: ladder for any size; powers for mental
   math on small numbers).
4. **The limits — largest n-bit values**: 8 bits top out at 2⁸ − 1 =
   255 (so 256 needs 9 bits); 16 bits at 65,535. An Illustration on
   WHY the roll-over happens (the odometer at all-ones).
5. **Fractions** (the honest frontier): multiply by 2, keep the integer
   part, repeat on the fraction: 0.375 → 0.011₂ (0.375×2 = 0.75 r0;
   0.75×2 = 1.5 r1; 0.5×2 = 1.0 r1 — read down); 0.625 → 0.101₂;
   0.8125 → 0.1101₂. THE HONEST ONE: 0.1 NEVER terminates —
   0.0001100110011… with the 0011 block repeating forever (the
   floating-point doorstep; note it as the reason 0.1 + 0.2 ≠ 0.3 in
   every programming language — one honest paragraph, the theory rides
   'Digital Logic Design' and later books).
6. **Doorsteps**: 3.7 (next) walks the reverse direction; 3.8 sets the
   two systems side by side; the full number-systems theory rides
   'Arithmetic and Number Systems'.
7. Exam corner: convert-given-number drills (the six pinned ladders +
   new values the exercises generate), the bottom-up reading trap, the
   fraction ladder, the 255/256 roll-over.

## Figures (≥3 body + ≥4 solution)
- F1 the division ladder machine: the 45 ladder as a vertical stack —
  quotient column, remainder column, the bottom-up read arrow.
- F2 the two-methods map: the same 100 walked by the ladder (left) and
  the powers table (right), meeting at 1100100.
- F3 the fraction ladder: 0.375's three ×2 steps with the integer
  parts peeling off into 0.011.
- F4 (optional) the odometer roll-over: 11111111 + 1 = 100000000.
- Solution figures: per-exercise ladder diagrams; powers-table
  check-off grids for the positional method; fraction-ladder strips;
  the 0.1 repetition block diagram.

## The pinned numbers (engine-verify each — complete list)
Ladders: 45 → 101101 (remainders bottom-up 1,0,1,1,0,1); 77 → 1001101;
100 → 1100100 (bottom-up 1,1,0,0,1,0,0); 156 → 10011100; 255 →
11111111; 256 → 100000000; 2026 → 11111101010 (= 1024+512+256+128+64+
32+8+2). Base 8: 45 → 55; 100 → 144; 2026 → 3752. Base 16: 45 → 2D;
100 → 64; 2026 → 7EA (= 7·256 + 14·16 + 10). Powers method: 100 = 64 +
32 + 4. Limits: 2⁸ − 1 = 255; 2¹⁶ − 1 = 65,535; 256 needs 9 bits.
Fractions: 0.375 → 0.011 (0.25 + 0.125); 0.625 → 0.101; 0.8125 →
0.1101; 0.1 = 0.0001100110011… (period 0011; first 12 fractional bits
000110011001). Quiz key [1,0,3,2,2].
