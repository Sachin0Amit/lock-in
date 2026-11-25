# SEAT SPEC — cf34 (lesson 3.4 'Text, Images and Sound as Bits')

Read `docs/research/cf-ch03-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf34.ts` + `v-cf34.ts` (tag `34`; helpers `cf34…`;
  export `export const lesson34`).
- id: `cf-text-images-and-sound-as-bits`; number `'3.4'`; title
  `'Text, Images and Sound as Bits'` (verbatim).
- prerequisites: `['cf-codes-ascii-unicode-and-bcd',
  'cf-output-devices-screens-printers-and-sound']` (codes from 3.3; the
  screen/printer/speaker boundary from 2.2 — this lesson walks the SAME
  media from the representation side).
- sources: `['cs-cf-web-ground']`; quiz key `[3, 1, 2, 0, 1]`.

## The arc (the MEDIA CENSUS lesson — one rate arithmetic for three media; NOT codes (3.3), NOT compression (3.5))
1. **The census question**: every medium arrives at the machine as a
   NUMBER STREAM (2.1's map); now ask the two honest questions — how
   MANY numbers, and how FAST? One formula for everything:
   rate = (measurements per second) × (bytes per measurement)
   × (channels).
2. **Text** (the light one): a 5,000-character English essay ≈ 5,000
   bytes in UTF-8 (ASCII letters) but 10,000 in UTF-16; a Devanagari
   character ('क' U+0915) rides 3 UTF-8 bytes — the same essay in
   Hindi costs more per character. The `algorithm` block: size a text
   file (count characters × class width).
3. **Images** (the pixel grid): resolution × bit depth. 8-bit gray =
   256 levels; 24-bit RGB = 16,777,216 colours (2²⁴); 1080p =
   1920×1080 = 2,073,600 px; one RGB frame = ×3 = 6,220,800 B =
   5.9326171875 MiB; at 30 fps = 186,624,000 B/s ≈ 1.49 Gbit/s (the
   honest shock number — uncompressed video is a firehose); a 12 MP
   photo (4000×3000) = 36,000,000 B = 34.332275390625 MiB; 720p =
   921,600 px = exactly 2.25× fewer than 1080p (a 4×75% note: halving
   each side quarters the census — the ×4 law met in 2.1 returns).
4. **Sound** (the sampling meter): sampling = measuring the wave at
   regular intervals; Nyquist's demand (state it plainly, no proofs):
   to carry 20 Hz–20 kHz hearing you must sample ABOVE twice the top —
   > 40 kHz. CD audio: 44,100 samples/s × 2 bytes × 2 channels =
   176,400 B/s = 10,584,000 B/min; 74 minutes = 783,216,000 B =
   746.9330 MiB. The 44,100 story (historical, honest): inherited from
   PCM adaptors (Sony PCM-1600, 1979) recording on U-matic VIDEO tape —
   294 × 50 × 3 = 44,100 (PAL active lines × fields × samples per
   line), with a 2,050 Hz guard band above 20 kHz; Red Book standard
   1980 (Sony + Philips); Sony's 16-bit (65,536 loudness levels) won
   over Philips' 14-bit (16,384). First player: Sony CDP-101,
   1 October 1982; Billy Joel's '52nd Street' the first album
   released on CD.
5. **The unified table** (the spine): medium | measurements/s | bytes
   each | channels | B/s — text ~typing rates, images per-frame,
   sound 176,400, video the product — ONE multiplication for all.
6. **The doorstep** (insight): these firehose numbers are WHY 3.5
   exists — compression is not a luxury; name it forward. The signal-
   processing theory rides later shelf books.
7. Exam corner: CD rate arithmetic, MiB vs MB censuses, RGB colour
   count, the 2.25× 720p/1080p area ratio, the 44,100 triple product.

## Figures (≥3 body + ≥4 solution)
- F1 the three-media rate ladder: text (bytes/s of typing), sound
  (176,400), image stream (186,624,000) on one log-scaled bar chart
  (compute the bar heights from the values).
- F2 the sampling meter: a smooth wave with sample dots at computed
  intervals, the 44,100 arithmetic annotated (294 × 50 × 3).
- F3 the pixel grid zoom: a small image cell grid blowing up to one
  cell with its 3 byte-cells (R, G, B) and the 16,777,216 bracket.
- F4 (optional) the CD timeline: 1979 PCM adaptor → 1980 Red Book →
  1 Oct 1982 CDP-101 + 52nd Street.
- Solution figures: per-exercise censuses (a frame at other
  resolutions, other bit depths, other durations); a Nyquist guard-
  band strip; a UTF-8 costing strip for mixed text.

## The pinned numbers (engine-verify each — complete list)
Text: 5,000 B UTF-8 vs 10,000 B UTF-16; 'क' = 3 bytes. Images: 256
levels (8-bit); 16,777,216 (24-bit); 1920×1080 = 2,073,600; ×3 =
6,220,800 B = 5.9326171875 MiB; ×30 fps = 186,624,000 B/s ×8 =
1.492992 Gbit/s; 4000×3000×3 = 36,000,000 B = 34.332275390625 MiB;
1280×720 = 921,600; ratio 2.25. Sound: 44,100×2×2 = 176,400 B/s;
×60 = 10,584,000 B/min; 74 min = 4,440 s = 783,216,000 B =
746.9329833984375 MiB; 294×50×3 = 44,100; guard band 2,050 Hz;
65,536 vs 16,384; CD bit rate 1,411,200 bit/s. Dates: 1979 PCM-1600;
1980 Red Book; 1 October 1982 CDP-101 + '52nd Street'. Quiz key
[3,1,2,0,1].
