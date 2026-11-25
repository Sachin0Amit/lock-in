# SEAT SPEC — cf31 (lesson 3.1 'Bits: Why Two Symbols Carry Everything')

Read `docs/research/cf-ch03-wip/SPEC_CORE.md` FIRST — it is part of this
spec (the anatomy bar, the engine contract, the palette, the raw-TeX
law, the voice). This file pins YOUR seat only.

## Your lesson (the pinned identity)
- File: `docs/research/cf-ch03-wip/part-cf31.ts`; engine
  `docs/research/cf-ch03-wip/v-cf31.ts` (tag `31` — prefix every helper
  `cf31…`, export `export const lesson31`).
- id: `cf-bits-why-two-symbols-carry-everything`; number `'3.1'`;
  title `'Bits: Why Two Symbols Carry Everything'` (verbatim).
- prerequisites: `['cf-the-basic-structure-and-operation-of-the-computer',
  'cf-input-devices-the-human-handshake']` (the machine map of ch.1 +
  the boundary census of 2.1: every act crossed IN as numbers — this
  lesson asks what those numbers are made of).
- sources: `['cs-cf-web-ground']`; quiz key (answers, in order):
  `[1, 2, 0, 3, 1]`.

## The arc (the WHY lesson — the physical + information ground of two symbols)
1. **The question**: ch.2's census ended with numbers crossing the
   boundary. What is the smallest possible alphabet a machine can use?
   The answer — two symbols — is not poverty; it is the price of
   reliability. Open with the honest engineering scene: a wire carries a
   voltage; noise blurs it; the FARTHER apart 'means 0' and 'means 1'
   sit, the harder noise mistakes one for the other. Ten distinguishable
   zones on one wire is fragile; two zones is armoured. (Qualitative —
   no circuit theory; the gate-level view belongs to Digital Logic
   Design, named as a doorstep.)
2. **The bit defined** (definition callout + terms): a bit is the
   amount of information in one choice between two equally likely
   outcomes. Shannon 1948 (Bell System Technical Journal, July +
   October parts) built the mathematics; the PAPER formally introduced
   the word 'bit', crediting the suggestion to John W. Tukey. A fair
   coin carries exactly 1 bit; a die roll log2 6 = 2.5849625 bits; one
   card from a 52-card deck log2 52 = 5.7004397 bits (engine values).
   Twenty yes/no questions sort 2^20 = 1,048,576 > a million
   possibilities — the parlor trick that IS the power of two.
3. **The powers census** (table + figure): 2^0..2^20 (1, 2, 4, …,
   1,048,576); n bits name 2^n patterns; 8 bits = 256 patterns = one
   byte. Buchholz coined 'byte' in June 1956 on IBM's Stretch project;
   the 8-bit byte settled with System/360 (1964).
4. **Counting in two symbols** (first taste — 3.2/3.6 own the full
   craft): 0, 1, 10, 11, 100… as 'the odometer with two marks'; a
   `terms` entry for binary; the one-hand finger counter: 5 fingers =
   5 bits = 32 states (a figure of two hands showing a number like
   4 + 2 = 0110).
5. **Measuring information honestly — the ladder** (the SI honesty):
   bit → byte (×8) → kB (SI, 10^3) vs KiB (2^10 = 1,024, the IEC
   binary prefixes approved December 1998, IEC 60027-2); the widening
   gap: kB 2.4%, MB 4.8576%, GB 7.3741824%, TB 9.9511627776% — a
   `table` of SI vs IEC values with the gap column; the honest note
   that 'KB' in daily speech means 1,024 while SI says 1,000, and the
   IEC names (kibi/mebi/gibi/tebi) exist to end the ambiguity.
   `formula` cards: 1 byte = 8 bits; n bits → 2^n patterns.
6. **The heritage** (historical callouts): Pingala's Chandaḥśāstra
   (Sanskrit prosody, circa 200 BCE, dates debated) listed verse-meter
   patterns as binary combinations, counted left to right, with an
   early use of śūnya for zero; Leibniz published binary arithmetic in
   1703 ('Explication de l'arithmétique binaire', Mémoires de
   l'Académie Royale des Sciences, pp. 85–89); Boole's 1854 'Laws of
   Thought' gave two-valued logic; Shannon's 1937 MIT master's thesis
   married Boole's algebra to switching circuits — the four-step line
   from poetry meters to every chip. (A timeline figure.)
7. **The doorstep** (insight): the full theory of number systems rides
   'Arithmetic and Number Systems' (mathematics shelf); the gate-level
   circuit view rides 'Digital Logic Design'. This chapter keeps the
   first meeting.
8. Exam corner (banking/SSC computer-awareness asks: the bit/byte
   relation, the KiB/MB distinction, the 2^n census, Shannon/Tukey).

## Figures (≥3 body + ≥4 solution)
- F1 the two-zone wire: one voltage axis with a wide '0' zone and a
  wide '1' zone and noise fuzz between (computed positions).
- F2 the powers ladder: 2^0..2^20 as a rising bar chart with the
  'twenty questions' annotation at 2^20.
- F3 the SI-vs-IEC ladder: paired bars kB/KiB … TB/TiB with the gap
  percentages (computed).
- F4 (optional) the timeline: Pingala ~200 BCE → Leibniz 1703 → Boole
  1854 → Shannon 1937/1948.
- Solution figures: e.g. a die/card entropy comparison sketch; a
  byte's 8 cells with 2^8 = 256 bracket; a KiB block vs kB block
  size comparison; the finger-count states. Only where they aid the
  solution.

## The pinned numbers (engine-verify each — this list is complete)
2^0..2^20 (…, 2^7=128, 2^8=256, 2^10=1024, 2^16=65536,
2^20=1048576); 2^32 = 4,294,967,296; log2(2)=1; log2(6)=2.584962500721156;
log2(52)=5.700439718141092; 1 byte = 8 bits = 256 patterns = 16^2;
KiB=1024 (gap 2.4%), MiB=1,048,576 (gap 4.8576%),
GiB=1,073,741,824 (gap 7.3741824%), TiB=1,099,511,627,776 (gap
9.9511627776%); one hand = 32 states; two hands = 1,024. Dates: 1948
(BSTJ, July + October), Tukey credited; June 1956 Buchholz/Stretch;
1964 System/360; December 1998 IEC; circa 200 BCE Pingala (dates
debated); 1703 Leibniz (pp. 85–89); 1854 Boole; 1937 Shannon thesis.
Quiz key [1,2,0,3,1].
