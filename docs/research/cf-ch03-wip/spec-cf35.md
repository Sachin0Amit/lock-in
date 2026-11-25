# SEAT SPEC — cf35 (lesson 3.5 'Compression: Lossless and Lossy')

Read `docs/research/cf-ch03-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf35.ts` + `v-cf35.ts` (tag `35`; helpers `cf35…`;
  export `export const lesson35`).
- id: `cf-compression-lossless-and-lossy`; number `'3.5'`; title
  `'Compression: Lossless and Lossy'` (verbatim).
- prerequisites: `['cf-text-images-and-sound-as-bits']` (3.4's firehose
  numbers are the WHY of this lesson).
- sources: `['cs-cf-web-ground']`; quiz key `[2, 3, 0, 1, 0]`.

## The arc (the PACKING lesson)
1. **The question 3.4 left**: a 1080p firehose and a 747 MiB album
   cannot ship. The packing question: which bytes can go, and can they
   come BACK? The two honest answers define the chapter's sharpest
   line: LOSSLESS (every bit returns) vs LOSSY (some are gone forever,
   chosen to be the ones you miss least).
2. **Redundancy** (the intuition before any algorithm): regularity =
   compressibility — runs, repeats, skews. A compression ratio is
   defined: original ÷ compressed.
3. **Lossless craft** (each as Illustration + figure):
   - **Run-length**: our own witness AABBCCCCCD (10 chars) → 2A2B5C1D
     (8 chars); the honesty caution — short runs GROW ('AB' → '1A1B'
     doubles 2→4; 'AAAAAAAAAA' → '10A' shrinks 10→3).
   - **Huffman** (1952, 'A Method for the Construction of
     Minimum-Redundancy Codes', Proc. IRE 40, pp. 1098–1101; the MIT
     Sc.D. student story — invented for a course assignment, beating
     his professor's best — one honest line): frequent symbols get
     SHORT codewords. Our witness alphabet {A:5, B:2, C:1, D:1}: tree
     depths A=1, B=2, C=3, D=3; fixed 2-bit code = 18 bits vs Huffman
     15 bits (5·1+2·2+1·3+1·3) — saves 3 bits = 16.67%; the prefix
     property (no codeword starts another: 0 / 10 / 110 / 111); the
     entropy floor H = 1.6577427 bits/symbol, Huffman mean 15/9 =
     1.667 sits a hair above it.
   - **Dictionary methods**: Lempel–Ziv (LZ77 1977 / LZ78 1978);
     Welch's LZW (Computer, June 1984, pp. 8–19): the dictionary GROWS
     as it reads; trace our own LZW run on ABABABAB (5 output codes
     for 8 characters, the dictionary growing A, B, AB, BA, ABA…).
   - **Format census** (table): ZIP (DEFLATE = LZ77 + Huffman), GIF
     (CompuServe, Bob Berry, 1987 — LZW, 256 colours), PNG (W3C
     Recommendation 1 October 1996 — the patent-free lossless
     replacement, DEFLATE).
4. **Lossy craft** (the perceptual bet): throw away what the eye/ear
   tolerates. JPEG (created 1992, ISO/IEC 10918-1 / ITU T.81;
   DCT-based — the transform entered the mainstream with Ahmed,
   Natarajan and Rao's 1974 paper): an 8×8 block census — a 1080p luma
   plane is 240 × 135 = 32,400 blocks of 64 samples (which multiply
   back to exactly 2,073,600); 4:2:0 chroma subsampling halves the
   colour census (12 → 6 samples per 2×2 macroblock); the quality
   dial. MP3 (MPEG-1 Audio Layer III, published ISO/IEC
   11172-3:1993, developed largely by the Fraunhofer Society; the
   .mp3 name 1995; Suzanne Vega's a cappella 'Tom's Diner' was the
   development test track — the human voice as the hardest witness):
   CD 1,411,200 bit/s ÷ 128 kbit/s = 11.025×; a 210-second song:
   CD 37,044,000 B = 35.3279 MiB vs MP3 3,360,000 B = 3.2043 MiB; at
   320 kbit/s the ratio is 4.41.
5. **The verdict table** (the spine): text/code/files → lossless
   ALWAYS (a ZIP that drops letters is corrupt); photos/music → lossy
   by choice; the honest 'lossless of an already-lossy file is
   pointless' caution.
6. **Doorsteps**: entropy's proof and arithmetic coding ride later CS
   books (Information Theory's home); this is the first meeting.
7. Exam corner: classify-the-format questions, the Huffman small
   trace, the ratio arithmetic, the 'which media tolerate lossy' ask.

## Figures (≥3 body + ≥4 solution)
- F1 the two doors diagram: one file entering two doors — lossless
  (identical copy out, e.g. 18→15 bits) vs lossy (perceptually close,
  some bits gone) — computed layout.
- F2 the Huffman tree of {A:5,B:2,C:1,D:1}: nodes at computed
  positions, depths labelled, the 15-bit encoding shown.
- F3 the JPEG block grid: an 8×8 lattice tiling a 16:9 rectangle with
  the 240 × 135 = 32,400 census annotated.
- F4 (optional) the ratio ladder: CD vs 320k vs 128k bars for the
  210-second song (heights from the true byte counts).
- Solution figures: RLE before/after strips; small Huffman trees for
  exercise alphabets; LZW dictionary growth tables; ratio bars per
  exercise.

## The pinned numbers (engine-verify each — complete list)
AABBCCCCCD → 2A2B5C1D (10→8); 'AB'→'1A1B' (2→4); 'AAAAAAAAAA'→'10A'
(10→3). Huffman {A:5,B:2,C:1,D:1}: depths 1/2/3/3; 18 vs 15 bits;
16.6667% saved; H = 1.6577427265048887; 15/9 ≥ H; prefix codes 0/10/
110/111. JPEG: 240×135 = 32,400 blocks; ×64 = 2,073,600; 4:2:0: 12→6.
MP3: 1,411,200/128,000 = 11.025; 210 s: 37,044,000 B = 35.327911376953125
MiB vs 3,360,000 B = 3.204345703125 MiB; 320 k: 8,400,000 B; 4.41×.
Dates: Huffman 1952 (Proc. IRE 40, 1098–1101); LZ77 1977 / LZ78 1978;
Welch June 1984 (Computer 17(6), 8–19); GIF 1987 (CompuServe, Berry);
PNG 1 October 1996 (W3C Rec); JPEG 1992 (ISO/IEC 10918-1); DCT 1974
(Ahmed–Natarajan–Rao); MP3 ISO/IEC 11172-3:1993; .mp3 1995; 'Tom's
Diner' test track. Quiz key [2,3,0,1,0].
