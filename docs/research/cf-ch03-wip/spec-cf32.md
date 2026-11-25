# SEAT SPEC — cf32 (lesson 3.2 'The Numbering Systems: Binary, Octal, Hexadecimal')

Read `docs/research/cf-ch03-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf32.ts` + `v-cf32.ts` (tag `32`; helpers `cf32…`;
  export `export const lesson32`).
- id: `cf-the-numbering-systems-binary-octal-hexadecimal`; number
  `'3.2'`; title `'The Numbering Systems: Binary, Octal, Hexadecimal'`
  (verbatim — no 'The' changes, no commas added).
- prerequisites: `['cf-bits-why-two-symbols-carry-everything']`.
- sources: `['cs-cf-web-ground']`; quiz key `[2, 0, 3, 1, 2]`.

## The arc (the CENSUS lesson — meeting the systems; 3.6/3.7 own conversion, 3.8 owns synthesis)
1. **Positional notation as the single idea** (definition + derivation):
   a numeral in base $b$ names $V = \sum d_i b^i$ with digits
   $0 \ldots b-1$. Derive the place-value anatomy of 4,728 =
   4·10³ + 7·10² + 2·10 + 8; then re-read the SAME digits in binary
   (101101 = 1·32 + 0·16 + 1·8 + 1·4 + 0·2 + 1). One formula, many
   alphabets.
2. **The census table** (the lesson's spine — a `table` + figure): the
   four systems side by side — base 2 (digits 0–1), base 8 (0–7),
   base 10 (0–9), base 16 (0–9 A–F). THE WITNESS THREAD: the number
   45 in four dresses — 101101₂ = 55₈ = 45₁₀ = 2D₁₆ (engine-verified;
   use this thread through the whole lesson, it returns in 3.R).
3. **Hexadecimal**: A=10 … F=15; 0x10 = 16; 1,000 = 3E8; why hex won —
   IBM standardized 0–9 + A–F in 1963; the Bendix G-15 (1956) had used
   0–9 + U–Z; the Latin-correct rival 'sexadecimal' lost to IBM's
   macaronic 'hexadecimal' (a historical callout; state the U–Z fact,
   name no living person).
4. **The grouping laws** (the bridge — derivation + figure): one octal
   digit ↔ exactly 3 bits (2³ = 8); one hex digit ↔ exactly 4 bits
   (2⁴ = 16); so binary↔octal↔hex regrouping is FREE:
   101101 → 101 101 → 55₈; 2D = 0010 1101. This is WHY programmers
   love hex: one byte = exactly two hex digits, 16² = 256.
5. **Ranges** (Illustrations + table): n digits in base b name b^n
   values; the largest n-bit binary is 2ⁿ − 1 (8 bits → 255; 16 →
   65,535); 2 hex digits = 256 (the byte), 4 = 65,536, 6 = 16,777,216.
6. **The counting strip 0–16 in all four bases** (a wide figure, two
   rows of aligned cells; engine computes every cell).
7. **Doorsteps** (insight): the full theory of number systems (bases,
   divisibility tests, the real numbers) is 'Arithmetic and Number
   Systems' (mathematics shelf) — this is the first meeting; conversion
   CRAFT comes next lesson (3.6 decimal→binary, 3.7 binary→decimal) —
   name them forward.
8. Exam corner: 'which base has digits 0–7?', 'hex of a given byte',
   'the largest 8-bit number', 'one hex digit = how many bits?'.

## Figures (≥3 body + ≥4 solution)
- F1 the four-dress witness: 45 rendered in four aligned numeral boxes
  with the digit-weight scaffolding under each (computed widths).
- F2 the grouping bridge: 101101 ↔ 101 101 ↔ 55 and ↔ 0010 1101 ↔ 2D
  (bit cells grouped by 3 and by 4, coloured braces).
- F3 the counting strip 0–16 × four bases (aligned grid).
- F4 (optional) the digit alphabets ladder: base 2/8/10/16 digit sets
  as tick rows, hex A–F highlighted.
- Solution figures: regrouping diagrams for specific exercises; a
  byte ↔ two-hex-digit mapping strip; range bars 2ⁿ−1; digit-count
  census bars.

## The pinned numbers (engine-verify each — complete list)
Digits: 2, 8, 10, 16. 45: 101101₂ (32+8+4+1), 55₈ (5·8+5), 2D₁₆
(2·16+13). Grouping: 2³=8, 2⁴=16; 2D = 0010 1101; 101101 → 5 5.
Ranges: 16²=256, 16⁴=65,536, 16⁶=16,777,216; 2⁸−1=255; 2¹⁶−1=65,535.
Counting: 7=111, 8=1000/10/8, 9=1001/11/9, 10=1010/12/A, 15=1111/17/F,
16=10000/20/10. 0x10=16; 1,000=3E8; A..F=10..15.
4,728 = 4·1000+7·100+2·10+8. Dates: 1963 IBM hex; 1956 Bendix G-15
(U–Z digits); Leibniz 1703 (binary heritage — one line, 3.1 owns the
full heritage). Quiz key [2,0,3,1,2].
