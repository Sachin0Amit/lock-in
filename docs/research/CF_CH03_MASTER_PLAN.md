# CF CH03 MASTER PLAN — Computer Fundamentals, chapter 3 open (CS RUN 5)

**The run:** CS RUN 5 (the cs job's fifth honored fire, 2026-11-25) OPENS
and CLOSES chapter 3 'Data Representation: a First Meeting' COMPLETE under
the whole-chapter cadence (owner directive 2026-11-24): the eight planned
seats + the 3.R review — NINE agents, one per seat — then assembled,
gated and shipped by the orchestrator.

## State at open
- Shipped: chapters 1 (4 lessons) + 2 (4 lessons) COMPLETE — CS RUN 1–4.
  computer-fundamentals carries 8 written lessons; the CS shelf total is
  8 (this book is the only written one).
- plannedLessons of ch.3 (binding titles, verbatim): 'Bits: Why Two
  Symbols Carry Everything' / 'The Numbering Systems: Binary, Octal,
  Hexadecimal' / 'Codes: ASCII, Unicode and BCD' / 'Text, Images and
  Sound as Bits' / 'Compression: Lossless and Lossy' / 'Decimal to
  Binary Conversion' / 'Binary to Decimal Conversion' / 'Decimal and
  Binary Number System' — plus the 3.R 'Unit 3 Completion Review' (the
  +1 review beyond the planned census, the 1.R/2.R pattern).
- Hosted folds: ZERO (TOC_FOLD_LEDGER has no computer-fundamentals
  bindings for any ch.3 title — re-checked this run).
- Ground: the sanctioned internet fallback (the Drive holds no CF
  source — CS_TOC_SURVEY.md's honest note). Citation key
  `cs-cf-web-ground` (SOURCE_LOG.md), extended this run with the ch.3
  pins below. STUDY-NEVER-REPRODUCE absolute.
- The sibling maths lane (:50 IST job) may fire mid-run — never touch
  its in-flight files; shared ledgers are appended, never forked;
  FIRST-SHIPPED-STANDS on any collision.

## The web-verified pin bank (researched this fire, arithmetic in pin_check_cs5.py 112/112 GREEN)
- Shannon, 'A Mathematical Theory of Communication', Bell System
  Technical Journal, 1948 (July + October parts); the paper formally
  introduced the word 'bit', crediting the suggestion to John W. Tukey.
- Buchholz coined 'byte' June 1956 (IBM 7030 Stretch); the 8-bit byte
  settled with IBM System/360 (1964).
- IEC approved the binary prefixes (kibi/mebi/gibi/tebi) December 1998,
  IEC 60027-2 amendment (published 1999); SI kilo = 10^3 stays the honest
  decimal meaning of kB.
- Leibniz, 'Explication de l'arithmétique binaire', Mémoires de
  l'Académie Royale des Sciences, 1703, pp. 85–89.
- Pingala's Chandaḥśāstra (Sanskrit prosody, circa 200 BCE — dates
  debated): binary patterns for verse meters, counted left to right;
  also an early explicit use of śūnya (zero).
- Hexadecimal: IBM standardized 0–9 + A–F in 1963; the Bendix G-15
  (1956) had used 0–9 + U–Z; the Latin-correct 'sexadecimal' lost.
- ASCII: ASA X3.4-1963 approved 17 June 1963; 7-bit, 128 codes
  (33 control + 95 printable); major revision 1967 (ISO 646 line).
- BCD: the 8-4-2-1 four-bit code, 6 of 16 patterns invalid; IBM's 6-bit
  BCDIC heritage.
- Unicode: 1.0.0 October 1991; 17.0 released 9 September 2025 with
  159,801 characters; code space 17 planes × 65,536 = 1,114,112 code
  points (U+0000..U+10FFFF); surrogates U+D800..U+DFFF (2,048 values).
- UTF-8: designed by Ken Thompson with Rob Pike, September 1992, on a
  placemat in a New Jersey diner; the FSS-UTF proposal mailed within
  days; 1–4 bytes per code point.
- CD audio: Red Book (Sony + Philips) 1980; 44,100 Hz inherited from
  PCM adaptors (Sony PCM-1600, 1979) recording on U-matic video tape —
  294 × 50 × 3 = 44,100 (PAL active lines × fields × samples per line);
  16-bit stereo (Sony's 16 won over Philips' 14); first player Sony
  CDP-101, 1 October 1982, with Billy Joel's '52nd Street' the first
  album released on CD.
- Huffman: 'A Method for the Construction of Minimum-Redundancy Codes',
  Proc. IRE 40, pp. 1098–1101, 1952 (MIT Sc.D. student).
- Lempel–Ziv: LZ77 1977 / LZ78 1978; Welch's LZW in Computer 17(6),
  June 1984, pp. 8–19.
- GIF: CompuServe (Bob Berry), 1987, LZW-compressed; PNG: W3C
  Recommendation 1 October 1996, the patent-free lossless replacement
  (DEFLATE = LZ77 + Huffman).
- JPEG: created 1992 (ISO/IEC 10918-1 / ITU T.81), DCT-based; the
  discrete cosine transform entered the mainstream with Ahmed,
  Natarajan and Rao's 1974 paper.
- MP3: MPEG-1 Audio Layer III, published as ISO/IEC 11172-3:1993,
  developed largely by the Fraunhofer Society; the .mp3 name 1995;
  Suzanne Vega's a cappella 'Tom's Diner' was the development test
  track (Brandenburg).
- Boole, 'An Investigation of the Laws of Thought', 1854; Shannon's
  1937 MIT master's thesis 'A Symbolic Analysis of Relay and Switching
  Circuits' married Boole's algebra to switching circuits.

## The nine seats (ids are pinned, stable forever)
| # | number | id | seat | quiz key |
|---|--------|----|------|----------|
| 1 | 3.1 | cf-bits-why-two-symbols-carry-everything | the two-symbol ground, the bit/byte/SI-vs-binary ladder | [1,2,0,3,1] |
| 2 | 3.2 | cf-the-numbering-systems-binary-octal-hexadecimal | the positional census of bases 2/8/16, the 45-in-four-dresses thread | [2,0,3,1,2] |
| 3 | 3.3 | cf-codes-ascii-unicode-and-bcd | character codes: BCD 8-4-2-1, ASCII arithmetic, Unicode + UTF-8 | [0,3,1,2,3] |
| 4 | 3.4 | cf-text-images-and-sound-as-bits | the multimedia census: text bytes, pixel grids, sampling rates | [3,1,2,0,1] |
| 5 | 3.5 | cf-compression-lossless-and-lossy | the packing question: RLE, Huffman, LZW vs JPEG, MP3 | [2,3,0,1,0] |
| 6 | 3.6 | cf-decimal-to-binary-conversion | the division ladder + positional method + fractions | [1,0,3,2,2] |
| 7 | 3.7 | cf-binary-to-decimal-conversion | the weight sum, the doubling method, grouped reads | [3,2,1,0,3] |
| 8 | 3.8 | cf-decimal-and-binary-number-system | the synthesis: both systems side by side + binary arithmetic | [0,2,1,3,0] |
| 9 | 3.R | cf-unit-3-completion-review | the chapter map, harvest tables, mixed bench, the ch.4 door | [2,1,0,3,1] |

Prerequisite chains (pinned): 3.1 ← [1.1, 2.1]; 3.2 ← [3.1];
3.3 ← [3.1]; 3.4 ← [3.3, 2.2]; 3.5 ← [3.4]; 3.6 ← [3.2];
3.7 ← [3.2]; 3.8 ← [3.6, 3.7]; 3.R ← all eight in order.

## The no-duplication contract (named doorsteps in the prose)
- Full number-systems THEORY (bases in general, divisibility, the real
  number field) → 'Arithmetic and Number Systems' (mathematics shelf).
- Gate-level view (binary adders, K-maps, floating point) → 'Digital
  Logic Design'.
- Algorithmic depth of compression (entropy proofs, arithmetic coding)
  → later CS books; this chapter keeps the first meeting.

## Verify-first
- Orchestrator: docs/research/cf-ch03-wip/pin_check_cs5.py — 112/112
  GREEN before the specs were finalized (six wrong draft values caught
  and resolved in favour of the engine: the Unicode fill 14.3434%, the
  'A = ₹' census 7 bytes, 74-min CD 746.9330 MiB, the Huffman-entropy
  1.6577427 bits/symbol, the song census 35.3279 MiB, the 2026
  popcount 8).
- Agents: one engine per seat, docs/research/cf-ch03-wip/v-cfXX.ts,
  ≥45 checks, green BEFORE the part prose is declared done.
- Post-assembly: scripts/verify-cs-book2-ch03.ts — the nine engines
  wrapped as sections A..S + the Z closed-chapter census (9 lessons,
  status 'complete', plannedLessons [], ids + numbers pinned, floors
  content ≥6,000 / review ≥5,200 / chapter ≥53,200, figures + solution
  figures + sources + prereq chains).

## Ship plan
Assemble (scripts/assemble_cs5.py: nine parts → ch-03.ts; palette C/FONT
renamed per tag; book.ts chapter3 swap planned → written, status
'in-progress' → 'complete') → gates (verifier, tsc, lint, lib:pack +
lib:check with csWritten 8→17, standing gates incl. cs-shelf-planning
totPl 1224→1225 + csWritten pin growth, E2E per shipped lesson ×3
viewports on generated .sh/.page.js pairs with calibrated pins, VLM
light+dark crop audit of the highest-risk figures) → ledgers (WORKLOG,
PROGRESS, CS_AUTHORING_POINTER → next fire opens ch.4 'Inside the Box',
SOURCE_LOG extension, DETAILED_LOG, WORK_INVENTORY) → explicit git add
→ commit → run-end PAT push (fetch-first if the maths lane pushed
mid-run: FIRST-SHIPPED-STANDS, re-derive the ledger appends on the
fetched state) → ls-remote verify → WORKLOG push record.

If the time budget or the platform's subagent-deadline wall bites: ship
the completed lessons, keep everything landed in the TRACKED
docs/research/cf-ch03-wip/ (already the working dir — recycle-proof),
note the deferral in WORKLOG and end clean. Never thin, never half-gate.
