# SEAT SPEC — cf3R (lesson 3.R 'Unit 3 Completion Review')

Read `docs/research/cf-ch03-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf3R.ts` + `v-cf3R.ts` (tag `R3`; helpers `cf3R…`;
  export `export const lesson3R` — note the capital R in the tag).
- id: `cf-unit-3-completion-review`; number `'3.R'`; title
  `'Unit 3 Completion Review'` (verbatim; mirrors 1.R and 2.R).
- prerequisites (ALL eight, in order — the review sits on everything):
  `['cf-bits-why-two-symbols-carry-everything',
  'cf-the-numbering-systems-binary-octal-hexadecimal',
  'cf-codes-ascii-unicode-and-bcd',
  'cf-text-images-and-sound-as-bits',
  'cf-compression-lossless-and-lossy',
  'cf-decimal-to-binary-conversion',
  'cf-binary-to-decimal-conversion',
  'cf-decimal-and-binary-number-system']`.
- sources: `['cs-cf-web-ground']`; quiz key `[2, 1, 0, 3, 1]`.

## The arc (the REVIEW seat — mirrors the 1.R/2.R shape: one map, per-lesson recaps grounded in the SIBLINGS' pinned numbers, the synthesis, the mixed bench, the forward door)
1. **The chapter in one map** (opening figure + paragraph): the
   chapter's own thread — a keystroke becomes a scan code becomes a
   code point becomes a byte stream becomes a compressed file — drawn
   as one pipeline through the eight lessons (bits → systems → codes
   → media → compression → the two conversion directions → the
   synthesis).
2. **The per-lesson recaps** (eight short sections, each: what the
   lesson asked, its two or three engine-pinned harvest numbers, one
   recap Illustration or table, one line on where its theory truly
   lives). USE THE SIBLINGS' PINNED NUMBERS VERBATIM (they are below);
   do NOT invent new numbers:
   - 3.1 bits: 2^20 = 1,048,576 (twenty questions); the honest ladder
     KiB 2.4% … TiB 9.95%; Shannon 1948 + Tukey.
   - 3.2 systems: the four-dress witness 45 = 101101₂ = 55₈ = 2D₁₆;
     one hex digit = 4 bits; 16² = 256 = the byte.
   - 3.3 codes: ASCII 128 = 33 + 95, 'a' − 'A' = 32 (bit 5); BCD's
     60.9375% waste; Unicode 1,114,112 code points, 159,801
     characters in 17.0 (14.3434% fill); UTF-8's 1–4 byte classes.
   - 3.4 media: one formula — rate = measurements/s × bytes ×
     channels; CD 176,400 B/s (294 × 50 × 3 = 44,100); a 1080p frame
     6,220,800 B; 74 minutes = 746.9330 MiB.
   - 3.5 compression: the two doors; Huffman 18 → 15 bits on {A:5,
     B:2, C:1, D:1} with entropy floor 1.6577 bits/symbol; MP3's
     11.025× at 128 kbit/s; JPEG's 8×8 census 32,400 blocks.
   - 3.6 decimal→binary: the division ladder (45's remainders 1,0,1,1,
     0,1 read bottom-up); 2026 = 11111101010₂ = 7EA₁₆; 0.1's honest
     infinity.
   - 3.7 binary→decimal: the weight sum (11111101010 = 2026), the
     doubling ladder 1→3→6→13→27→54, the grouped read F52 = 3,922.
   - 3.8 the synthesis: the counting strip; 111 + 1 = 1000; the
     shift-double 13 → 26; log2 10 ≈ 3.32 digits per decimal digit.
3. **The synthesis section** ('what the chapter actually taught'):
   representation is a CHOICE with a price — every choice of alphabet,
   code, sampling rate and compression knob is a trade the chapter has
   now priced: the bits census (2^n), the codes contract (both ends
   one table), the media firehose (rate arithmetic), the packing
   verdict (lossless vs lossy). The 45-witness and 2026-witness as the
   chapter's two souvenirs.
4. **The formula + vocabulary harvest**: `formula` cards (the
   positional value formula; n bits → 2^n patterns; rate =
   m/s × bytes × channels; compression ratio = original ÷ compressed;
   the largest n-bit value 2^n − 1) and a `terms` block of the
   chapter's ten core words (bit, byte, positional notation, BCD,
   ASCII, Unicode, UTF-8, sampling, lossless, lossy).
5. **The mixed bench**: 15 exam-style questions spanning all eight
   lessons (levels L1–L4; at least one question requiring a TWO-lesson
   chain, e.g. 'a 16-bit colour code in hex → the decimal channel
   value → the ASCII arithmetic nearby'; at least one census question
   (a 90-second stereo clip at CD quality — engine-check the answer),
   one Huffman trace, one ladder, one UTF-8 length census). Full
   worked solutions in the Cengage chain, ≥4 with solution figures.
6. **The forward door** (closing paragraph + insight): chapter 4
   'Inside the Box' — the representation now settled, the machine's
   own anatomy opens: motherboard, processor, the memory hierarchy,
   buses and ports. One map line: this chapter gave the machine its
   LANGUAGE; the next asks how the box SPEAKS it.
7. Exam corner: the board/banking/9618-style asks this chapter
   answers, as a checklist mapped to lessons.

## Figures (≥3 body + ≥4 solution)
- F1 the chapter pipeline map (the eight seats as one flow).
- F2 the harvest ladder: the powers thread 2^7 = 128 (ASCII), 2^8 =
  256 (the byte), 2^16 = 65,536 (a Unicode plane), 2^20 = 1,048,576.
- F3 the rate thread: 176,400 B/s → 1,411,200 bit/s → ÷128,000 =
  11.025 (CD → MP3), one annotated chain.
- F4 (optional) the four-dress 45 finale strip.
- Solution figures: recap census strips per mixed-bench question (a
  ladder, a Huffman tree, a UTF-8 encoding ladder, a rate table).

## The pinned numbers (engine-verify each — the chapter's census, complete)
The powers thread: 128, 256, 65,536, 1,048,576. 45 = 101101₂ = 55₈ =
2D₁₆. ASCII: 128 = 33 + 95; 97 − 65 = 32. BCD: 156/256 = 60.9375%.
Unicode: 1,114,112; 159,801 = 14.3434% of the space. CD: 176,400 B/s;
1,411,200 bit/s; 74 min = 746.9330 MiB; 294 × 50 × 3 = 44,100. 1080p
frame: 6,220,800 B. Huffman: 18 → 15 bits; H = 1.6577427 bits/symbol.
MP3: 11.025× at 128 kbit/s (4.41× at 320). JPEG: 32,400 blocks. 2026 =
11111101010₂ = 7EA₁₆. Doubling ladder: 1→3→6→13→27→54. F52₁₆ = 3,922.
111 + 1 = 1000. 13 → 26 (the shift-double). log2 10 ≈ 3.32. A
90-second stereo CD clip = 90 × 176,400 = 15,876,000 B = 15.1428…
MiB (compute exactly: 15.142822265625). Chapter ships 8 + 1 = 9
lessons. Quiz key [2,1,0,3,1].
