# SEAT SPEC — cf33 (lesson 3.3 'Codes: ASCII, Unicode and BCD')

Read `docs/research/cf-ch03-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf33.ts` + `v-cf33.ts` (tag `33`; helpers `cf33…`;
  export `export const lesson33`).
- id: `cf-codes-ascii-unicode-and-bcd`; number `'3.3'`; title
  `'Codes: ASCII, Unicode and BCD'` (verbatim).
- prerequisites: `['cf-bits-why-two-symbols-carry-everything']` (bits
  exist; now the ALPHABETS above bits — codes).
- sources: `['cs-cf-web-ground']`; quiz key `[0, 3, 1, 2, 3]`.

## The arc (the CODE lesson — how characters become numbers; NOT media, NOT compression)
1. **The code idea** (definition): a code is an agreed table mapping
   each symbol of an alphabet onto bit patterns. Codes are CONTRACTS:
   both ends must hold the same table or text becomes garbage
   (mojibake). The length question: k bits name 2^k symbols — the
   alphabet's size fixes the bit budget.
2. **BCD** (the bridge from 3.2): binary-coded decimal stores ONE
   decimal digit per 4-bit group, weights 8-4-2-1: BCD(45) = 0100 0101;
   exactly 6 patterns (1010–1111) are invalid. The waste census
   (Illustration + derivation): two BCD digits (8 bits) reach only
   0–99 (100 values) of 256 patterns — 156 wasted = 60.9375%; pure
   binary 8 bits reaches 255 (2.55× the range). Why keep it? One
   digit per cell is natural for decimal displays and early IBM
   accounting machines (the 6-bit BCDIC heritage — one honest line).
3. **ASCII** (the spine): ASA X3.4-1963, approved 17 June 1963;
   7 bits → 128 codes = 33 control + 95 printable; major revision
   1967. THE ARITHMETIC (Illustrations + figure): '0' = 48, 'A' = 65,
   'a' = 97, space = 32, DEL = 127; case flip is bit 5 ('a' − 'A' = 32
   = 100000₂; 'A' = 1000001₂, 'a' = 1100001₂); digit arithmetic '7' −
   '0' = 7; 'B' = 66; 'z' = 122. The `algorithm` block: how a keypress
   becomes a character (2.1 met scan codes; the layout table maps to
   ASCII/Unicode — one paragraph bridge, no re-teaching).
4. **The 8-bit era** (brief): extended ASCII families, code pages, the
   fragmentation problem — 256 codes were not the world.
5. **Unicode** (the resolution): version 1.0.0 October 1991; the code
   space 17 planes × 65,536 = 1,114,112 code points (U+0000..U+10FFFF);
   plane 0 = the BMP; surrogates U+D800..DFFF (2,048 values, never
   characters); Unicode 17.0 released 9 September 2025 with 159,801
   characters — 14.3434% of the space (the honest fill fraction).
6. **UTF-8** (the encoding — derivation + table + figure): the
   variable-length scheme designed by Ken Thompson with Rob Pike in
   September 1992 on a placemat in a New Jersey diner (the FSS-UTF
   proposal followed within days). Classes: 1-byte 0xxxxxxx (U+0000–
   007F, 128 values); 2-byte 110xxxxx 10xxxxxx (U+0080–07FF, 2,048);
   3-byte 1110xxxx 10xxxxxx 10xxxxxx (U+0800–FFFF, 65,536); 4-byte
   11110xxx … (U+10000–10FFFF, 2^21). Witnesses (engine-pinned):
   'A' → 0x41; 'é' U+00E9 → C3 A9; '₹' U+20B9 → E2 82 B9; '🙂' U+1F642
   → F0 9F 99 82; the string 'A = ₹' = 7 bytes (4 ASCII + 3 for the
   rupee). The self-synchronizing property (a continuation byte can be
   spotted mid-stream) — why the web chose UTF-8.
7. **Doorsteps**: text/image/sound media censuses ride 3.4 (next);
   encryption of codes rides 'Cryptography' later on the shelf.
8. Exam corner: 'ASCII of A/a/0', 'BCD of 45', 'how many Unicode code
   points', 'UTF-8 length of a given character', 'the 6 invalid BCD
   patterns'.

## Figures (≥3 body + ≥4 solution)
- F1 the code-space ladder: BCD 10-of-16, ASCII 128-of-256, extended
  256, Unicode 1,114,112 — as nested/stacked bars with counts.
- F2 the ASCII arithmetic map: the printable block with '0'/'A'/'a'
  landmarks and the +32 case-flip arrow (computed positions).
- F3 the UTF-8 class table as a diagram: leading-byte patterns,
  continuation bytes, code-point ranges, byte census per class.
- F4 (optional) the placemat story sketch (a diner placemat with the
  0/110/1110/11110 rows — honest, no portrait).
- Solution figures: BCD cell diagrams for exercises; UTF-8 encoding
  ladders for specific characters; the bit-5 flip diagram; byte-census
  strips for mixed strings.

## The pinned numbers (engine-verify each — complete list)
k bits → 2^k symbols. BCD: 0100 0101 (45); 1001 (9); invalids 1010,
1011, 1100, 1101, 1110, 1111; 100 of 256 → 156 wasted = 60.9375%;
255 vs 99 (2.5757575757575757×). ASCII: 48/65/97/32/127/66/122; 97−65
= 32 = 100000₂; '7'−'0' = 7; 1000001₂ = 65. Unicode: 17 × 65,536 =
1,114,112; D800–DFFF = 2,048; 159,801 chars (17.0, 9 Sep 2025) =
14.343351476332721% fill; 1.0.0 October 1991. UTF-8: 128/2,048/
65,536/2,097,152; A→41; é→C3 A9; ₹→E2 82 B9; 🙂→F0 9F 99 82;
'A = ₹' → [65,32,61,32,226,130,185] = 7 bytes. Dates: X3.4-1963
approved 17 June 1963; 1967 revision; September 1992 UTF-8 (Thompson +
Pike). Quiz key [0,3,1,2,3].
