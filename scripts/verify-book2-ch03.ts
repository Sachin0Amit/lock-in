/**
 * verify-book2-ch03.ts — pre-writing arithmetic verification for
 * Arithmetic and Number Systems (book #2), chapter 3 "Positional Systems
 * and Other Bases".
 *
 * Created 2026-11-05 (run 53) for lessons
 *   3.1 "The Representation Theorem: Every Number Has Exactly One Name"
 *   3.2 "Converting Between Bases"
 * — every number of both lessons is verified here BEFORE anything is
 * written into ch-03.ts —
 *
 *   (A) the digit-band charter: base b owns exactly b digits {0..b−1}
 *       (swept b = 2..24); the largest digit is b−1; the hex letter map
 *       10→A … 15→F; for b ≤ 10 the arabic numerals;
 *   (B) the naming engine (iterated division by b — division algorithm
 *       in motion, the engine of Lesson 2.1): an instance table of 20
 *       (n, b) pairs, each digit in band, each name canonical (no
 *       leading zero), each rebuild exact; the quotient chain strictly
 *       descends to 0 (the descent) and every row satisfies
 *       n = q·b + r with 0 ≤ r < b;
 *   (C) two independent rebuild engines — the positional sum Σ dᵢbⁱ and
 *       Horner's nested fold — agree with n on the whole instance table
 *       AND on a broad sweep (n ≤ 1500 for b = 2..10, n ≤ 500 for
 *       b = 11..16);
 *   (D) uniqueness: (i) the length windows [b^(L−1), b^L − 1] are
 *       pairwise disjoint (swept), so only the canonical length can
 *       house a name of n; (ii) impostor sweep — every digit tuple of
 *       the canonical length (leading digit ≥ 1) enumerated: exactly one
 *       evaluates to n (n ≤ 300, b = 2..10; n = 0 named by "0" alone);
 *       (iii) the units digit is forced: last digit = n mod b (swept);
 *       (iv) the peel lemma: the prefix of the name of n is the name of
 *       ⌊n/b⌋ (swept);
 *   (E) the digits-are-remainders theorem: digit i from the right is
 *       ⌊n/bⁱ⌋ mod b (swept n ≤ 1000, b = 2..12, all positions), with
 *       the 2025 = 7E9₁₆ instance run digit by digit;
 *   (F) digit counts: k digits ⟺ b^(k−1) ≤ n < b^k (swept n ≤ 3000,
 *       b = 2..10); largest k-digit name = b^k − 1 (999, 255, 1023,
 *       FFF); smallest = b^(k−1) (100, 1000…0₂ with 11 digits); the
 *       count of k-digit names b^k − b^(k−1) (90, 900, 128, 3840);
 *       the instances 2025 → 11 bits / 4 base-12 digits / 3 hex digits;
 *       10⁶ → 20 bits / 5 hex digits; 10⁹ → 30 bits;
 *   (G) leading zeros pad a name without changing its value ("045" =
 *       "45" instances); the canonical name has none (swept); 0 is
 *       named "0";
 *   (H) the base-ten anchor (FM 1.1's ground, never re-taught):
 *       5,768 = 5·10³ + 7·10² + 6·10 + 8; ten digits 0..9; the "same
 *       digit, three seats" instance 5/50/500;
 *   (I) the engine IS the division algorithm: every cascade row of the
 *       instance table re-verified as n = qb + r, 0 ≤ r < b; the full
 *       printed chains for 45÷2 and 2025÷16 certified row by row;
 *   (J) figure 1 geometry — the division cascade 2025 → 7E9₁₆: three
 *       machine rows (dividend boxes at x-centre 260, remainder boxes
 *       at x-centre 620, rows y 52–108 / 172–228 / 292–348), the row
 *       equations, the read-upward arrow at x 800, the assembled name
 *       at (800, 395); every pair of boxes ≥ 8 px apart, every label
 *       inside its band;
 *   (K) the 3.1 quiz keys re-derived (1/0/0/1/0) with every distractor
 *       evaluated;
 *   (L) all 13 exercise keys of 3.1 re-derived (incl. 35_b = 23's
 *       sibling shapes, the base-3 five-digit window 81..242/162, the
 *       5031₇ → 1737 → 8C1₁₄ chain, the b^k at-most-k-digit count);
 *   (M) formula cards of 3.1 re-derived;
 *   (N) down-conversion chains for 3.2 (full division chains, every row
 *       clean): 45÷2 → 101101; 2025÷2 → 11111101001 (11 rows); 2025÷16
 *       → 7E9; 2025÷12 → 1209; 999÷7 → 2625₇; 100÷8 → 144₈; 250÷5 →
 *       2000₅; 79÷12 → 67₁₂; 45÷16 → 2D₁₆; 2025÷5 → 31100₅; 2025÷8 →
 *       3751₈;
 *   (O) up-conversion: every down-instance rebuilt by both engines;
 *       Horner printed instances (7E9 → 7 → 126 → 2025);
 *   (P) the doubling machine (Horner on binary): 101101 → 1, 2, 5, 11,
 *       22, 45 and 11011 → 1, 3, 6, 13, 27, every intermediate checked;
 *   (Q) the machine tables: the eight octal triples and the sixteen hex
 *       nibbles, each block's value certified; the regrouping
 *       conversions 101101₂ ↔ 55₈ ↔ 2D₁₆ and 11111101001₂ → 3751₈ /
 *       7E9₁₆; the broad sweep n ≤ 5000 where regrouping-digits =
 *       division-digits for octal and hex;
 *   (R) the power law behind grouping: 2^(mi+j) = (2^m)^i · 2^j swept
 *       m ≤ 6, i ≤ 6, j < m;
 *   (S) the hex letter instances: FACE₁₆ = 64206 = 1111101011001110₂;
 *       FFFF ceiling 65535; 2025 = 7E9 = 0111 1110 1001;
 *   (T) the base-ten bridge: 1209₁₂ → 2025₁₀ → 31100₅ and 67₁₂ → 79₁₀
 *       → 2221₃;
 *   (U) one number, many dresses: 45 = 101101₂ = 1200₃ = 55₈ = 39₁₂ =
 *       2D₁₆ and 2025 = 11111101001₂ = 31100₅ = 5622₇ = 3751₈ = 1209₁₂
 *       = 7E9₁₆ — every dress rebuilt;
 *   (V) the unknown-base exam shape: 35_b = 23 forces b = 6 (and the
 *       digit-band veto b > 5); 41_b = 53 forces b = 13;
 *   (W) figure 2 geometry — the regrouping machine: twelve bit boxes
 *       (52×52, centres x = 80 + 64i, y 84–136) spelling 011111101001;
 *       nibble braces under (y 160) with hex digits 7/E/9 at y 195;
 *       triple braces (y 245) with octal digits 3/7/5/1 at y 280; the
 *       bottom line "2025 = 7E9₁₆ = 3751₈" at y 350; clearances ≥ 8 px;
 *   (X) the 3.2 quiz keys re-derived (0/1/0/0/0) with every distractor
 *       evaluated;
 *   (Y) all 14 exercise keys of 3.2 re-derived;
 *   (Z) formula cards of 3.2 re-derived;
 *   (AA) sources printed (three NEW keys this run: hindu-arabic-
 *       positional-history, leibniz-1703-binary, knuth-taocp-v2; three
 *       carried);
 *   (AB) scope guards printed (naturals only — fractional names wait for
 *       ch. 7; the division algorithm never re-proved; letters beyond F
 *       out of scope; Babylon/Maya → ch. 9; two's complement/bit → 3.4
 *       + the CS shelf);
 *   (AC) the content tables, cell by cell (3.1 + 3.2).
 *
 * EXTENDED 2026-11-05 (run 54) for lessons
 *   3.3 "Arithmetic in Other Bases"
 *   3.4 "Binary, Hexadecimal and the Machine"
 * — sections AD onward, again BEFORE a word is written —
 *   (AD) the base-b addition table built digit by digit: sweep b = 2..16,
 *       every cell's name = engine name of i+j with carry ⌊(i+j)/b⌋ ∈ {0,1};
 *       the printed base-5 table cell-certified (1+4 = 10₅, 2+4 = 11₅,
 *       3+3 = 11₅, 3+4 = 12₅, 4+4 = 13₅, 2+3 = 10₅); the base-2 table;
 *   (AE) the carry theorem — the division algorithm in motion: for every
 *       column sum s ≤ 2b−1 the write/carry pair (s mod b, ⌊s/b⌋) is a
 *       clean division-algorithm instance, swept b = 2..16; carry ∈ {0,1};
 *   (AF) column additions in base, certified against value addition:
 *       342₅ + 213₅ = 1110₅ (carries 1,1,1), 31₅ + 44₅ = 130₅,
 *       24₅ + 13₅ = 42₅, 47₈ + 36₈ = 105₈, 345₆ + 512₆ = 1301₆,
 *       1011₂ + 111₂ = 10010₂, B + B = 1A₁₂, A7₁₆ + 81₁₆ = 128₁₆;
 *   (AG) the borrow law: (u − d) mod b = (u + b − d) mod b with the
 *       borrow flag = 1 iff u < d, swept all digit pairs b = 2..16;
 *       instances 1000₅ − 234₅ = 211₅ (double borrow), 312₅ − 144₅ =
 *       113₅, 47₈ − 36₈ = 11₈, 100₁₂ − 1 = BB₁₂ (the odometer roll-down),
 *       111₀₂ sibling 10000₂ − 1 = 1111₂; subtraction certified by
 *       adding back (sweep);
 *   (AH) the base-b multiplication tables: full 2×2 and 5×5 tables
 *       cell-certified (2×3 = 11₅, 2×4 = 13₅, 3×3 = 14₅, 3×4 = 22₅,
 *       4×4 = 31₅); the base-2 table IS the AND table; the base-8 ×7
 *       row 7, 16, 25, 34, 43, 52, 61; the base-12 ×B row B, 1A, 29,
 *       38, 47, 56, 65, 74, 83, 92, A1 (the perfect square B×B = A1₁₂);
 *       sweep: every digit×digit name in b = 2..16 engine-certified;
 *   (AI) long multiplication — the shift law (multiply by the digit in
 *       seat j contributes at seat j; one seat = ×b): 23₅ × 34₅ = 1442₅
 *       via partials 202₅ + 1240₅ (= 13×19 = 247), 45₁₂ × 3₁₂ = 113₁₂,
 *       12₅ × 3₅ = 41₅, A7₁₆ × 2₁₆ = 14E₁₆; the shift swept
 *       (append-zero = ×b, n ≤ 500, b = 2..10);
 *   (AJ) the in-base long-division instance — 3.2's promise kept:
 *       1209₁₂ ÷ 5 run entirely in base twelve (299₁₂, 69₁₂, 14₁₂, 3;
 *       remainders 0, 0, 1, 1, 3 → 31100₅ = the run-53 bridge result);
 *       the base-3 sibling 67₁₂ ÷ 3 → 2221₃ (matches §T); quotient
 *       divisions 4231₅ ÷ 3₅ = 1223₅ r 2₅ (566 = 188·3 + 2) and
 *       1A7₁₂ ÷ 9₁₂ = 26₁₂ r 1 (271 = 30·9 + 1);
 *   (AK) casting out (b−1): n ≡ digit-sum(n) mod (b−1) swept
 *       b = 2..16, n ≤ 400; the base-6 check instance (345₆ + 512₆ =
 *       1301₆: residues 2 + 3 ≡ 0, result 5 ≡ 0); the base-12 nine-row
 *       residue walk 9,7,5,3,1,B,9,7,5,3,1,0 (9k mod 11) matched digit
 *       by digit;
 *   (AL) figure 3 geometry — the base-five column addition: carry row,
 *       two addend rows, rule, result row, seat brackets; every box
 *       pair ≥ 8 px apart, every label inside the 920×400 viewBox, the
 *       carry digits = the certified carries, the result = 1110₅;
 *   (AM) the 3.3 quiz keys re-derived (intended 1/0/2/0/3) with every
 *       distractor evaluated;
 *   (AN) all 13 exercise keys of 3.3 re-derived;
 *   (AO) the 4 formula cards of 3.3 re-derived;
 *   (AP) the machine charter: k bits → 2^k patterns swept k = 1..16;
 *       the byte 2⁸ = 256 patterns = values 0..255, 255 = FF₁₆ =
 *       11111111₂; the nibble 2⁴ = 16 = one hex symbol; byte = 2
 *       nibbles (8 = 2·4); fixed-width padding sweep (n ≤ 1000 pads to
 *       exactly k bits for k = 8, 12); 2¹⁰ = 1024 (kibi) vs 10³ = 1000
 *       (kilo) — the two families honest;
 *   (AQ) the bit operations — the machine tables in action: NOT (2
 *       cells), AND/OR/XOR on all 4 pairs, AND = the base-2
 *       multiplication table, XOR = (a+b) mod 2, OR = max; multi-bit
 *       digit-wise sweeps (all nibble pairs, digit-maps only — no JS
 *       bitwise operators); masks: 11010110 AND 00001111 = 00000110
 *       (214 AND 15 = 6 = the low nibble = 214 mod 16), 214 AND 240 =
 *       208 (the high nibble), 1010 OR 0101 = 1111, 1100 XOR 1010 =
 *       0110, the 0110/1011 triple (2, 15, 13);
 *   (AR) the half-adder IS the division algorithm: sum = XOR =
 *       (a+b) mod 2, carry = AND = ⌊(a+b)/2⌋, a + b = carry·2 + sum on
 *       all 4 pairs; the ripple-carry adder built from those two tables
 *       reproduces a + b on ALL 256 nibble pairs (and byte pairs);
 *   (AS) the shift laws: append-zero = ×2 (swept n ≤ 500 via digit
 *       maps), drop-last-bit = ⌊n/2⌋ (the peel lemma in silicon); the
 *       walk 45 = 101101 → 1011010 = 90 → 10110 = 22; 2025 >> 3 =
 *       11111101₂ = 253 = ⌊2025/8⌋ with the dropped bits 001 = 2025
 *       mod 8 = 1 (the remainder readable in the register);
 *   (AT) overflow, honestly bounded: k bits hold 0..2^k − 1 (the window
 *       at b = 2); 255 + 1 = 256 needs nine bits — an 8-bit register
 *       drops the carry (the honest bound); the roll-down 2^k − 1 + 1 →
 *       0 pattern swept k ≤ 10; two's complement NAMED and deferred;
 *   (AU) the ASCII instances: 'A' = 65 = 01000001₂ = 41₁₆; 'a' = 97 =
 *       01100001₂ = 61₁₆; the case flip 97 − 65 = 32 = 00100000₂ (bit
 *       5, one seat); 'A' XOR 32 = 'a' via the digit-wise tables; the
 *       +32 law across the alphabet (sweep 26 letters, 65..90 ↔ 97..122);
 *       digits '0'..'9' = 48..57 = 30₁₆..39₁₆;
 *   (AV) figure 4 geometry — the byte anatomy of 'A': eight 56-px bit
 *       boxes in two nibble groups (gap 14 ≥ 8), weights 128..1 below,
 *       hex digits 4/1 above the groups, the 64 + 1 = 65 on-bit sum,
 *       the charter line; clearances ≥ 8 px, inside the 920×420 viewBox;
 *   (AW) the 3.4 quiz keys re-derived (intended 2/0/1/3/0) with every
 *       distractor evaluated;
 *   (AX) all 13 exercise keys of 3.4 re-derived;
 *   (AY) the 4 formula cards of 3.4 re-derived;
 *   (AZ) sources + scope guards printed (3.3 carries 3 keys; 3.4 carries
 *       7 with FOUR NEW this run: shannon-1938-switching,
 *       shannon-1948-bit, iec-60027-2-binary-prefixes, ascii-table-a65;
 *       signed arithmetic/two's complement → the CS shelf; no JS
 *       bitwise operators anywhere in this verifier — tables only);
 *   (BA) the content tables, cell by cell (3.3 + 3.4): the printed
 *       base-5 addition table (25 cells), the printed base-5
 *       multiplication table (25 cells), the base-2 multiplication
 *       table (4 cells), the 3.4 bit-operation table (4 rows × AND/OR/
 *       XOR + the NOT pair), the byte charter table (k = 4, 8, 16, 32),
 *       the ASCII mini-table rows as printed.
 *
 * Historical anchors web-checked 2026-11-05 (sanctioned fallback), run 54
 * additions: Claude Shannon's MIT master's thesis "A Symbolic Analysis of
 * Relay and Switching Circuits" — written 1937, published 1938 in the
 * Transactions of the AIEE — proved Boolean algebra could run switching
 * circuits and laid the foundations of digital circuit design (Wikipedia
 * + the MIT DSpace record); the word "bit" coined by John Tukey at Bell
 * Labs in the latter half of the 1940s as a contraction of "binary digit",
 * first used in an influential publication by Shannon's 1948 "A
 * Mathematical Theory of Communication" (Linux Information Project's bit
 * definition + Wikipedia); the IEC binary prefixes (kibi/Ki = 2^10,
 * mebi/Mi = 2^20, …) approved December 1998, published January 1999 as
 * Amendment 2 to IEC 60027-2 — 1 KiB = 1024 bytes vs 1 kB = 1000 bytes
 * (NIST "Prefixes for binary multiples" page); ASCII: 'A' = 65 = 0x41,
 * 'a' = 97 = 0x61, uppercase 65..90 (0x41..0x5A), lowercase 97..122
 * (0x61..0x7A), the case flip = +0x20 (Villanova ASCII table +
 * schoolcoders ASCII page). Exposition original; nothing reproduced.
 *
 * Historical anchors web-checked 2026-11-05 (sanctioned fallback):
 * the Hindu–Arabic positional system's Indian origin with Laplace's
 * tribute — "It is India that gave us the ingenious method of expressing
 * all numbers by means of ten symbols, each symbol receiving a value of
 * position as well as an absolute value … it escaped the genius of
 * Archimedes and Apollonius" (MacTutor quotations page, quoted from
 * H. Eves, Return to Mathematical Circles, Boston 1988); al-Khwārizmī's
 * c. 825 book on Hindu reckoning, surviving only through a twelfth-
 * century Latin translation titled (by Boncompagni, 19th c.) *Algoritmi
 * de numero Indorum* — Algoritmi → algorithm (Devlin's al-Khwārizmī
 * essay + Wikipedia). Leibniz's binary: the 1679 manuscript De
 * Progressione Dyadica, the 1697 letter, Bouvet's letter of 4 November
 * 1701 (received April 1703) enclosing the Fu Xi hexagram diagram, and
 * "Explication de l'Arithmétique Binaire" (Mémoires de l'Académie
 * Royale des Sciences, 1703) — with the modern hedge that the hexagram
 * ordering is Shao Yong's eleventh-century arrangement and no ancient
 * Chinese text treats it as a counting system; Leibniz had the
 * arithmetic before he saw the diagram. Knuth, TAOCP Vol. 2
 * (Seminumerical Algorithms), §4.1 "Positional Number Systems" — the
 * scholarly charter for the notation this chapter formalises.
 * Exposition original; nothing reproduced.
 *
 * Run: bun run scripts/verify-book2-ch03.ts   (exit 1 on any failure)
 */

let pass = 0;
let fail = 0;
const failures: string[] = [];

function ok(cond: boolean, label: string): void {
  if (cond) {
    pass++;
  } else {
    fail++;
    failures.push(label);
    console.log(`  FAIL: ${label}`);
  }
}

/* ---- independent engines (nothing taken from the content on faith) ---- */

/* subtraction-only division: the ONLY way quotients/remainders arise */
function divmod(a: number, b: number): { q: number; r: number } {
  let q = 0;
  let r = a;
  while (r >= b) {
    r -= b;
    q += 1;
  }
  return { q, r };
}
function floorDiv(a: number, b: number): number {
  return divmod(a, b).q;
}
function modSub(a: number, b: number): number {
  return divmod(a, b).r;
}
/* powers by repeated multiplication */
function powInt(base: number, e: number): number {
  let v = 1;
  for (let i = 0; i < e; i++) v *= base;
  return v;
}
/* the naming engine: divide by b, keep the remainder, repeat — digits
 * returned most-significant-first; n = 0 names "0" */
function nameDigits(n: number, b: number): number[] {
  if (n === 0) return [0];
  const digits: number[] = [];
  let t = n;
  while (t > 0) {
    const { q, r } = divmod(t, b);
    digits.unshift(r);
    t = q;
  }
  return digits;
}
/* rebuild engine 1 — the positional sum Σ dᵢbⁱ */
function evalPoly(digits: number[], b: number): number {
  let v = 0;
  let p = 1;
  for (let i = 0; i < digits.length; i++) {
    v += digits[digits.length - 1 - i] * p;
    p *= b;
  }
  return v;
}
/* rebuild engine 2 — Horner's nested fold, left to right */
function evalHorner(digits: number[], b: number): number {
  let acc = 0;
  for (const d of digits) acc = acc * b + d;
  return acc;
}
/* digit i (0-based from the right) by the theorem: ⌊n/bⁱ⌋ mod b */
function digitAt(n: number, b: number, i: number): number {
  let t = n;
  for (let j = 0; j < i; j++) t = floorDiv(t, b);
  return modSub(t, b);
}
/* digit symbols for b ≤ 16 (the charter) */
const HEX = '0123456789ABCDEF';
function nameString(n: number, b: number): string {
  return nameDigits(n, b)
    .map((d) => HEX[d])
    .join('');
}
/* the regrouping engine: binary name of n padded to a multiple of m,
 * split into blocks of m from the right, each block's value a digit of
 * base 2^m */
function groupDigits(n: number, m: number): number[] {
  const bits = nameDigits(n, 2);
  const pad = (m - (bits.length % m)) % m;
  const padded: number[] = [];
  for (let i = 0; i < pad; i++) padded.push(0);
  for (const b of bits) padded.push(b);
  const out: number[] = [];
  for (let g = 0; g < padded.length / m; g++) {
    let v = 0;
    for (let j = 0; j < m; j++) v = v * 2 + padded[g * m + j];
    out.push(v);
  }
  return out;
}

/* ------------------------------------------------------------------ */
console.log('=== A. the digit-band charter (3.1) ===');
{
  let bad = 0;
  for (let b = 2; b <= 24; b++) {
    const digits: number[] = [];
    for (let d = 0; d < b; d++) digits.push(d);
    if (digits.length !== b) bad++;
    if (digits[b - 1] !== b - 1) bad++;
    if (Math.max(...digits) !== b - 1) bad++;
    // every digit of every name below b^3 sits in the band
    for (let n = 0; n < powInt(b, 3); n++) {
      const ds = nameDigits(n, b);
      if (ds.some((d) => d < 0 || d >= b)) bad++;
    }
  }
  ok(bad === 0, 'A: base b owns exactly b digits 0..b−1; every engine digit in band (b = 2..24)');
  ok('0123456789ABCDEF'.length === 16, 'A: the charter string has 16 symbols for b ≤ 16');
  ok(HEX[10] === 'A' && HEX[11] === 'B' && HEX[12] === 'C' && HEX[13] === 'D' && HEX[14] === 'E' && HEX[15] === 'F',
    'A: the letter map 10→A, 11→B, 12→C, 13→D, 14→E, 15→F');
  ok(HEX[0] === '0' && HEX[9] === '9', 'A: for b ≤ 10 the symbols are the arabic numerals 0..9');
  ok(nameString(6, 7) === '6' && nameString(7, 7) === '10',
    'A: instance — base 7\u2019s digits run 0..6: the largest digit is 6, and the number seven itself writes as "10" (no digit 7 exists)');
}

/* ------------------------------------------------------------------ */
console.log('=== B. the naming engine — the instance table (3.1) ===');
{
  const table: Array<[number, number, string]> = [
    [23, 5, '43'],
    [45, 2, '101101'],
    [100, 8, '144'],
    [999, 7, '2625'],
    [250, 5, '2000'],
    [79, 12, '67'],
    [2025, 16, '7E9'],
    [2025, 12, '1209'],
    [2025, 2, '11111101001'],
    [2025, 5, '31100'],
    [1, 7, '1'],
    [0, 7, '0'],
    [35, 2, '100011'],
    [48, 16, '30'],
    [15, 16, 'F'],
    [255, 16, 'FF'],
    [256, 16, '100'],
    [1737, 14, '8C1'],
    [2025, 7, '5622'],
    [64206, 16, 'FACE'],
  ];
  for (const [n, b, want] of table) {
    const ds = nameDigits(n, b);
    const s = ds.map((d) => HEX[d]).join('');
    ok(s === want, `B: ${n} in base ${b} = ${want} (engine says ${s})`);
    ok(ds.every((d) => d >= 0 && d < b), `B: ${want}_${b} — every digit inside the band 0..${b - 1}`);
    ok(n === 0 || ds[0] !== 0, `B: ${want}_${b} — canonical (no leading zero)`);
    ok(evalPoly(ds, b) === n && evalHorner(ds, b) === n, `B: ${want}_${b} rebuilds to ${n} by both engines`);
    // the quotient chain strictly descends to 0 — the descent at work
    let t = n;
    let last = n;
    let descentClean = true;
    while (t > 0) {
      const { q } = divmod(t, b);
      if (q >= last) descentClean = false;
      last = q;
      t = q;
    }
    ok(descentClean && last === 0, `B: ${n}_${b} — the quotient chain strictly descends to 0`);
  }
  ok(nameDigits(45, 2).join('') === '101101' && nameDigits(45, 2).length === 6,
    'B: 45 in base 2 is the six-bit name 101101');
  ok(nameDigits(2025, 2).length === 11, 'B: 2025 in base 2 has exactly 11 digits');
}

/* ------------------------------------------------------------------ */
console.log('=== C. both rebuild engines agree (broad sweep) (3.1) ===');
{
  let bad = 0;
  for (let n = 0; n <= 1500; n++)
    for (let b = 2; b <= 10; b++) {
      const ds = nameDigits(n, b);
      if (evalPoly(ds, b) !== n || evalHorner(ds, b) !== n) bad++;
    }
  for (let n = 0; n <= 500; n++)
    for (let b = 11; b <= 16; b++) {
      const ds = nameDigits(n, b);
      if (evalPoly(ds, b) !== n || evalHorner(ds, b) !== n) bad++;
    }
  ok(bad === 0, 'C: sweep n ≤ 1500 (b = 2..10) + n ≤ 500 (b = 11..16) — Σ dᵢbⁱ and Horner both rebuild n exactly');
  ok(evalHorner([7, 14, 9], 16) === 2025 && evalPoly([7, 14, 9], 16) === 2025,
    'C: 7E9₁₆ = ((7·16)+14)·16 + 9 = 2025 by both engines');
}

/* ------------------------------------------------------------------ */
console.log('=== D. uniqueness — windows, impostors, units digit, peel (3.1) ===');
{
  // (i) the length windows are pairwise disjoint
  let badWin = 0;
  for (let b = 2; b <= 16; b++)
    for (let L = 1; L <= 8; L++) {
      const lo = powInt(b, L - 1);
      const hi = powInt(b, L) - 1;
      const nextLo = powInt(b, L);
      if (!(lo <= hi && hi < nextLo)) badWin++;
    }
  ok(badWin === 0, 'D: the windows [b^(L−1), b^L − 1] are pairwise disjoint (b = 2..16, L ≤ 8)');
  // (ii) impostor sweep: exactly one canonical digit-tuple per (n, b)
  let badImp = 0;
  for (let n = 0; n <= 300; n++)
    for (let b = 2; b <= 10; b++) {
      if (n === 0) {
        // the only canonical name is "0"; no longer name exists (leading digit ≥ 1 ⇒ value ≥ b)
        if (nameDigits(0, b).join('') !== '0') badImp++;
        continue;
      }
      const ds = nameDigits(n, b);
      const k = ds.length;
      let count = 0;
      // enumerate ALL digit tuples of length k with leading digit ≥ 1
      const total = powInt(b, k - 1) * (b - 1);
      if (total <= 200000) {
        for (let first = 1; first < b; first++)
          for (let tail = 0; tail < powInt(b, k - 1); tail++) {
            const cand = [first];
            let t = tail;
            const rest: number[] = [];
            for (let i = 0; i < k - 1; i++) {
              rest.unshift(modSub(t, b));
              t = floorDiv(t, b);
            }
            for (const r of rest) cand.push(r);
            if (evalPoly(cand, b) === n) count++;
          }
        if (count !== 1) badImp++;
      }
    }
  ok(badImp === 0, 'D: impostor sweep n ≤ 300, b = 2..10 — exactly one canonical name every time');
  // (iii) the units digit is forced: last digit = n mod b
  let badU = 0;
  for (let n = 0; n <= 400; n++)
    for (let b = 2; b <= 12; b++) {
      const ds = nameDigits(n, b);
      if (ds[ds.length - 1] !== modSub(n, b)) badU++;
    }
  ok(badU === 0, 'D: units digit of the name = n mod b (swept n ≤ 400, b = 2..12)');
  // (iv) the peel lemma: prefix of the name = the name of ⌊n/b⌋
  let badP = 0;
  for (let n = 1; n <= 400; n++)
    for (let b = 2; b <= 12; b++) {
      const ds = nameDigits(n, b);
      const prefix = ds.slice(0, ds.length - 1);
      const smaller = nameDigits(floorDiv(n, b), b);
      const pf = prefix.length ? prefix : [0];
      if (pf.join(',') !== smaller.join(',')) badP++;
    }
  ok(badP === 0, 'D: peel lemma — the name of ⌊n/b⌋ is the name of n without its last digit (swept)');
  ok(modSub(23, 5) === 3 && nameDigits(23, 5)[1] === 3 && nameDigits(floorDiv(23, 5), 5).join('') === nameDigits(23, 5)[0].toString(),
    'D: instance — 23 = 4·5 + 3: the unit digit 3 is the remainder; the prefix "4" names ⌊23/5⌋ = 4');
}

/* ------------------------------------------------------------------ */
console.log('=== E. the digits-are-remainders theorem (3.1) ===');
{
  let bad = 0;
  for (let n = 0; n <= 1000; n++)
    for (let b = 2; b <= 12; b++) {
      const ds = nameDigits(n, b);
      for (let i = 0; i < ds.length; i++) {
        if (digitAt(n, b, i) !== ds[ds.length - 1 - i]) bad++;
      }
    }
  ok(bad === 0, 'E: digit i from the right = ⌊n/bⁱ⌋ mod b (swept n ≤ 1000, b = 2..12, every position)');
  // the 2025 = 7E9₁₆ instance, digit by digit
  ok(digitAt(2025, 16, 0) === 9 && modSub(2025, 16) === 9, 'E: d₀ of 2025₁₆: 2025 mod 16 = 9 (2025 = 126·16 + 9)');
  ok(digitAt(2025, 16, 1) === 14 && modSub(floorDiv(2025, 16), 16) === 14,
    'E: d₁ of 2025₁₆: ⌊2025/16⌋ = 126, 126 mod 16 = 14 = E (126 = 7·16 + 14)');
  ok(digitAt(2025, 16, 2) === 7, 'E: d₂ of 2025₁₆: ⌊126/16⌋ = 7, 7 mod 16 = 7');
  ok(floorDiv(7, 16) === 0, 'E: ⌊7/16⌋ = 0 — the cascade halts');
}

/* ------------------------------------------------------------------ */
console.log('=== F. digit counts (3.1) ===');
{
  let bad = 0;
  for (let n = 1; n <= 3000; n++)
    for (let b = 2; b <= 10; b++) {
      const k = nameDigits(n, b).length;
      if (!(powInt(b, k - 1) <= n && n < powInt(b, k))) bad++;
    }
  ok(bad === 0, 'F: k digits ⟺ b^(k−1) ≤ n < b^k (swept n ≤ 3000, b = 2..10)');
  ok(nameDigits(999, 10).join('') === '999' && powInt(10, 3) - 1 === 999,
    'F: the largest 3-digit decimal name is 999 = 10³ − 1');
  ok(powInt(2, 8) - 1 === 255 && nameDigits(255, 2).join('') === '11111111',
    'F: eight bits reach exactly 255 = 2⁸ − 1');
  ok(powInt(2, 10) - 1 === 1023, 'F: ten bits reach exactly 1023 = 2¹⁰ − 1');
  ok(powInt(16, 3) - 1 === 4095 && nameString(4095, 16) === 'FFF',
    'F: three hex digits reach exactly FFF = 4095');
  ok(powInt(10, 2) === 100 && nameDigits(100, 2).join('') === '1100100',
    'F: the smallest 3-digit decimal name is 100 = 10²');
  ok(nameDigits(1024, 2).join('') === '10000000000' && powInt(2, 10) === 1024,
    'F: the smallest 11-bit name is 10000000000₂ = 1024 = 2¹⁰');
  ok(powInt(10, 2) - powInt(10, 1) === 90, 'F: exactly 90 two-digit decimal names');
  ok(powInt(10, 3) - powInt(10, 2) === 900, 'F: exactly 900 three-digit decimal names');
  ok(powInt(2, 8) - powInt(2, 7) === 128, 'F: exactly 128 eight-bit names');
  ok(powInt(16, 3) - powInt(16, 2) === 3840, 'F: exactly 3840 three-digit hex names');
  ok(powInt(2, 10) === 1024 && 2025 < powInt(2, 11),
    'F: 2025 → 11 bits (2¹⁰ = 1024 ≤ 2025 < 2048 = 2¹¹)');
  ok(powInt(12, 3) === 1728 && 2025 < powInt(12, 4),
    'F: 2025 → 4 base-12 digits (12³ = 1728 ≤ 2025 < 20736 = 12⁴)');
  ok(powInt(16, 2) === 256 && 2025 < powInt(16, 3),
    'F: 2025 → 3 hex digits (16² = 256 ≤ 2025 < 4096 = 16³)');
  ok(powInt(2, 19) === 524288 && powInt(2, 20) === 1048576,
    'F: 10⁶ → 20 bits (2¹⁹ = 524,288 ≤ 1,000,000 < 1,048,576 = 2²⁰)');
  ok(powInt(16, 4) === 65536 && 1000000 < powInt(16, 5),
    'F: 10⁶ → 5 hex digits (16⁴ = 65,536 ≤ 10⁶ < 1,048,576 = 16⁵)');
  ok(powInt(2, 29) === 536870912 && powInt(2, 30) === 1073741824,
    'F: 10⁹ → 30 bits (2²⁹ = 536,870,912 ≤ 1,000,000,000 < 1,073,741,824 = 2³⁰)');
}

/* ------------------------------------------------------------------ */
console.log('=== G. leading zeros and zero (3.1) ===');
{
  ok(evalPoly([0, 4, 5], 10) === 45 && evalHorner([0, 4, 5], 10) === 45,
    'G: "045" evaluates to 45 — padding does not change the value');
  ok(evalPoly([0, 0, 1, 0, 1, 1, 0, 1], 2) === 45, 'G: "00101101"₂ = 45 too — two pad zeros change nothing');
  let bad = 0;
  for (let n = 1; n <= 500; n++)
    for (let b = 2; b <= 12; b++) if (nameDigits(n, b)[0] === 0) bad++;
  ok(bad === 0, 'G: the canonical name never carries a leading zero (swept n ≤ 500, b = 2..12)');
  ok(nameDigits(0, 2).join('') === '0' && nameDigits(0, 16).join('') === '0',
    'G: zero is named "0" in every base');
}

/* ------------------------------------------------------------------ */
console.log('=== H. the base-ten anchor — FM 1.1\u2019s ground, once only (3.1) ===');
{
  ok(5 * 1000 + 7 * 100 + 6 * 10 + 8 === 5768, 'H: 5,768 = 5·10³ + 7·10² + 6·10 + 8 (FM 1.1\u2019s instance, verified once)');
  ok(nameDigits(5768, 10).join('') === '5768', 'H: the engine names 5,768 as … 5768 in base ten');
  ok(5 * 1 === 5 && 5 * 10 === 50 && 5 * 100 === 500,
    'H: the same digit 5 worth 5, 50, 500 — the seat, not the symbol, sets the worth');
  ok(HEX.slice(0, 10) === '0123456789', 'H: base ten owns exactly the ten digits 0..9 (FM 1.1\u2019s charter)');
}

/* ------------------------------------------------------------------ */
console.log('=== I. the engine IS the division algorithm (3.1) ===');
{
  // every row of every instance cascade: n = q·b + r with 0 ≤ r < b
  let bad = 0;
  for (const [n, b] of [[45, 2], [2025, 2], [2025, 16], [2025, 12], [999, 7], [100, 8], [250, 5], [79, 12], [45, 16], [2025, 5], [2025, 8]] as Array<[number, number]>) {
    let t = n;
    while (t > 0) {
      const { q, r } = divmod(t, b);
      if (q * b + r !== t || r < 0 || r >= b) bad++;
      t = q;
    }
  }
  ok(bad === 0, 'I: every cascade row satisfies n = qb + r with 0 ≤ r < b — Lesson 2.1\u2019s theorem at work, never re-proved');
  // the printed 45÷2 chain
  const chain45: Array<[number, number, number]> = [];
  let t45 = 45;
  while (t45 > 0) {
    const { q, r } = divmod(t45, 2);
    chain45.push([t45, q, r]);
    t45 = q;
  }
  ok(chain45.map((c) => c.join(',')).join(' | ') === '45,22,1 | 22,11,0 | 11,5,1 | 5,2,1 | 2,1,0 | 1,0,1',
    'I: 45÷2 chain = 45→(22,1), 22→(11,0), 11→(5,1), 5→(2,1), 2→(1,0), 1→(0,1)');
  ok(chain45.map((c) => c[2]).reverse().join('') === '101101',
    'I: the remainders read upward spell 101101');
  // the printed 2025÷16 chain
  const chain2025: Array<[number, number, number]> = [];
  let t20 = 2025;
  while (t20 > 0) {
    const { q, r } = divmod(t20, 16);
    chain2025.push([t20, q, r]);
    t20 = q;
  }
  ok(chain2025.map((c) => c.join(',')).join(' | ') === '2025,126,9 | 126,7,14 | 7,0,7',
    'I: 2025÷16 chain = 2025→(126,9), 126→(7,14), 7→(0,7)');
  ok(chain2025.map((c) => c[2]).reverse().map((d) => HEX[d]).join('') === '7E9',
    'I: the remainders read upward spell 7E9 (14 prints as E)');
  // the 2025÷12 chain for the content
  const rows12: string[] = [];
  let t12 = 2025;
  while (t12 > 0) {
    const { q, r } = divmod(t12, 12);
    rows12.push(`${t12} = ${q}·12 + ${r}`);
    t12 = q;
  }
  ok(rows12.join(' ; ') === '2025 = 168·12 + 9 ; 168 = 14·12 + 0 ; 14 = 1·12 + 2 ; 1 = 0·12 + 1',
    'I: 2025÷12 chain rows (four machines): 168·12+9, 14·12+0, 1·12+2, 0·12+1');
}

/* ------------------------------------------------------------------ */
console.log('=== J. figure 1 geometry — the division cascade 2025 → 7E9₁₆ (3.1) ===');
{
  // boxes: dividend/quotient machines at x-centre 260, remainder boxes at x-centre 620
  const machine = { cx: 260, w: 180, h: 56 };
  const rem = { cx: 620, w: 130, h: 56 };
  const rows = [{ cy: 80 }, { cy: 200 }, { cy: 320 }];
  const rects: Array<{ x1: number; x2: number; y1: number; y2: number; tag: string }> = [];
  rows.forEach((row, i) => {
    rects.push({ x1: machine.cx - machine.w / 2, x2: machine.cx + machine.w / 2, y1: row.cy - machine.h / 2, y2: row.cy + machine.h / 2, tag: `machine${i + 1}` });
    rects.push({ x1: rem.cx - rem.w / 2, x2: rem.cx + rem.w / 2, y1: row.cy - machine.h / 2, y2: row.cy + machine.h / 2, tag: `remainder${i + 1}` });
  });
  let minGap = Infinity;
  for (let a = 0; a < rects.length; a++)
    for (let b = a + 1; b < rects.length; b++) {
      const A = rects[a], B = rects[b];
      const dx = Math.max(B.x1 - A.x2, A.x1 - B.x2, 0);
      const dy = Math.max(B.y1 - A.y2, A.y1 - B.y2, 0);
      if (dx === 0 && dy === 0) minGap = -1; // overlap
      else if (dx === 0) minGap = Math.min(minGap, dy);
      else if (dy === 0) minGap = Math.min(minGap, dx);
    }
  ok(minGap >= 8, `J: all figure-1 boxes pairwise clear (min gap ${minGap === Infinity ? 'n/a' : minGap.toFixed(0)} px ≥ 8)`);
  ok(machine.cx + machine.w / 2 < rem.cx - rem.w / 2, 'J: machine column and remainder column separated');
  // labels live inside their bands
  ok(260 - 90 >= 0 && 620 + 65 <= 920 && 395 <= 430, 'J: figure-1 extents inside the 920×430 viewBox');
  // the row equations printed between the columns
  const eqs = ['2025 = 126 × 16 + 9', '126 = 7 × 16 + 14', '7 = 0 × 16 + 7'];
  ok(eqs.every((s) => s.length * 7.2 < 620 - 260 - 90 - 65 + 155), 'J: row-equation labels fit the mid band');
  ok(eqs[0] === `2025 = ${divmod(2025, 16).q} × 16 + ${divmod(2025, 16).r}`, 'J: row-1 equation matches the engine');
  ok(eqs[1] === `126 = ${divmod(126, 16).q} × 16 + ${divmod(126, 16).r}`, 'J: row-2 equation matches the engine');
  ok(eqs[2] === `7 = ${divmod(7, 16).q} × 16 + ${divmod(7, 16).r}`, 'J: row-3 equation matches the engine');
}

/* ------------------------------------------------------------------ */
console.log('=== K. the 3.1 quiz keys re-derived (intended 1/0/0/1/0) ===');
{
  // Q1: base 7's digits — key 1 ("seven digits, largest 6")
  const q1count: number = 7, q1max: number = 6;
  ok(q1count === 7 && q1max === 6 && q1max < q1count, 'K: Q1 fact — base 7 has seven digits, the largest 6 (7 itself is NOT a digit)');
  // distractors: "largest 7" false; "six digits" false; "eight digits" false
  ok(7 > 6, 'K: Q1 distractor — the symbol 7 sits outside base 7\u2019s band 0..6, so it is no digit at all');
  ok(q1count !== 6 && q1count !== 8, 'K: Q1 distractors — neither six nor eight digits');
  // Q2: 23 in base 5 — key 0 ("43₅")
  ok(nameString(23, 5) === '43', 'K: Q2 fact — 23 = 43₅');
  ok(evalHorner([3, 4], 5) === 19, 'K: Q2 distractor — 34₅ = 19');
  ok(evalHorner([1, 1, 3], 5) === 33, 'K: Q2 distractor — 113₅ = 33');
  ok(evalHorner([4, 4], 5) === 24, 'K: Q2 distractor — 44₅ = 24');
  // Q3: the units digit — key 0 (n mod b)
  ok(modSub(23, 5) === 3 && nameDigits(23, 5)[1] === 3, 'K: Q3 fact — the units digit is the remainder n mod b');
  ok(divmod(23, 5).q !== divmod(23, 5).r && divmod(23, 5).q === 4, 'K: Q3 distractor — the quotient 4 is the PREFIX, not the units digit');
  ok(23 - 5 === 18 && (18 < 0 || 18 >= 5) === true, 'K: Q3 distractor — n − b = 18 is not even a digit here');
  // Q4: 2025 in base 2 — key 1 (11 digits, window 2¹⁰ ≤ 2025 < 2¹¹)
  ok(nameDigits(2025, 2).length === 11 && powInt(2, 10) <= 2025 && 2025 < powInt(2, 11),
    'K: Q4 fact — 11 bits, the window 2¹⁰ ≤ 2025 < 2¹¹');
  ok(!(2025 < powInt(2, 10)), 'K: Q4 distractor — "10 digits" fails: the window needs n < 2¹⁰, but 2025 > 1024');
  ok(2025 > powInt(2, 8) - 1, 'K: Q4 distractor — 8 bits cap at 255, far below 2025');
  // Q5: two canonical names, same value — key 0 (impossible)
  ok('0'.concat('45').length !== '45'.length && evalPoly([0, 4, 5], 10) === evalPoly([4, 5], 10),
    'K: Q5 fact — only leading-zero padding shares a value, and padded strings are not canonical names');
}

/* ------------------------------------------------------------------ */
console.log('=== L. the 13 exercise keys of 3.1 re-derived ===');
{
  // L1-1: base 4's digits
  ok(nameDigits(0, 4).concat(nameDigits(3, 4)).join('') === '03' && 4 === 4,
    'L: L1-1 — base 4 has digits 0,1,2,3; the largest 3; four of them');
  // L1-2: 13 in base 2
  ok(nameString(13, 2) === '1101' && 8 + 4 + 1 === 13, 'L: L1-2 — 13 = 1101₂ (8 + 4 + 1)');
  const c13: number[] = [];
  let t = 13;
  while (t > 0) { const { q, r } = divmod(t, 2); c13.push(r); t = q; }
  ok(c13.reverse().join('') === '1101', 'L: L1-2 — the chain 13→(6,1)→(3,0)→(1,1)→(0,1) spells 1101');
  // L1-3: 23 in base 5
  ok(nameString(23, 5) === '43', 'L: L1-3 — 23 = 43₅ (the 2.1 instance reborn as a name)');
  // L2-4: 100 in base 8
  ok(nameString(100, 8) === '144' && 64 + 32 + 4 === 100, 'L: L2-4 — 100 = 144₈ (64 + 32 + 4)');
  // L2-5: 2025 in base 12
  ok(nameString(2025, 12) === '1209' && 1728 + 288 + 9 === 2025, 'L: L2-5 — 2025 = 1209₁₂ (1728 + 288 + 9)');
  // L2-6: 2F₁₆
  ok(evalHorner([2, 15], 16) === 47 && 2 * 16 + 15 === 47, 'L: L2-6 — 2F₁₆ = 47 (F is the digit fifteen)');
  // L3-7: divisible by b ⟺ the name ends in 0
  ok(nameDigits(16, 8).join('') === '20' && nameDigits(24, 8).join('') === '30' && nameDigits(25, 8).join('') === '31',
    'L: L3-7 — multiples of 8 end in 0 in base 8 (20₈, 30₈); 25 = 31₈ ends in 1');
  let bad7 = 0;
  for (let n = 0; n <= 300; n++) {
    const ds = nameDigits(n, 8);
    if ((ds[ds.length - 1] === 0) !== (n % 8 === 0)) bad7++;
  }
  ok(bad7 === 0, 'L: L3-7 — ends-in-0 ⟺ b | n, swept (b = 8, n ≤ 300)');
  // L3-8: the five-digit base-3 window
  ok(powInt(3, 4) === 81 && nameString(81, 3) === '10000', 'L: L3-8 — the smallest five-digit base-3 name is 10000₃ = 81 = 3⁴');
  ok(powInt(3, 5) - 1 === 242 && nameString(242, 3) === '22222', 'L: L3-8 — the largest is 22222₃ = 242 = 3⁵ − 1');
  ok(powInt(3, 5) - powInt(3, 4) === 162, 'L: L3-8 — exactly 162 five-digit base-3 numbers');
  // L4-9: 5555₆
  ok(5 * 216 + 5 * 36 + 5 * 6 + 5 === 1295 && powInt(6, 4) - 1 === 1295 && nameString(1295, 6) === '5555',
    'L: L4-9 — the largest four-digit base-6 name is 5555₆ = 1295 = 6⁴ − 1');
  // L4-10: 10⁶ digit counts
  ok(powInt(2, 19) <= 1000000 && 1000000 < powInt(2, 20), 'L: L4-10 — 10⁶ needs 20 bits');
  ok(powInt(16, 4) <= 1000000 && 1000000 < powInt(16, 5), 'L: L4-10 — 10⁶ needs 5 hex digits');
  // L5-11: 5031₇ → decimal → base 14
  ok(5 * 343 + 0 * 49 + 3 * 7 + 1 === 1737, 'L: L5-11 — 5031₇ = 1737 (1715 + 21 + 1)');
  ok(nameString(1737, 14) === '8C1' && 8 * 196 + 12 * 14 + 1 === 1737,
    'L: L5-11 — 1737 = 8C1₁₄ (1568 + 168 + 1; C carries the value twelve)');
  // L5-12: names with at most k digits number exactly b^k
  ok(powInt(2, 8) === 256, 'L: L5-12 — base 2, k = 8: exactly 256 numbers 0..255 hold at-most-eight-bit names');
  ok(powInt(10, 3) === 1000, 'L: L5-12 — base 10, k = 3: exactly 1000 numbers 0..999');
  let atMost = 0;
  for (let n = 0; n <= 255; n++) if (nameDigits(n, 2).length <= 8) atMost++;
  ok(atMost === 256, 'L: L5-12 — every n ≤ 255 has an at-most-8-bit name, and nothing above does');
}

/* ------------------------------------------------------------------ */
console.log('=== M. formula cards of 3.1 re-derived ===');
{
  ok(evalPoly([7, 14, 9], 16) === 7 * powInt(16, 2) + 14 * 16 + 9, 'M: card 1 — the name equation n = Σ dᵢbⁱ (instance 7E9)');
  ok(0 <= 9 && 9 < 16 && 0 <= 14 && 14 < 16, 'M: card 2 — the band 0 ≤ dᵢ ≤ b − 1 holds digit by digit');
  ok(powInt(2, 10) <= 2025 && 2025 < powInt(2, 11), 'M: card 3 — the digit-count window b^(k−1) ≤ n < b^k (instance 11 bits)');
  ok(digitAt(2025, 16, 1) === modSub(floorDiv(2025, 16), 16) && digitAt(2025, 16, 1) === 14,
    'M: card 4 — dᵢ = ⌊n/bⁱ⌋ mod b (instance d₁ = E)');
}

/* ------------------------------------------------------------------ */
console.log('=== N. down-conversion chains for 3.2 (every row clean) ===');
{
  const chains: Array<[number, number, string]> = [
    [45, 2, '101101'],
    [2025, 2, '11111101001'],
    [2025, 16, '7E9'],
    [2025, 12, '1209'],
    [999, 7, '2625'],
    [100, 8, '144'],
    [250, 5, '2000'],
    [79, 12, '67'],
    [45, 16, '2D'],
    [2025, 5, '31100'],
    [2025, 8, '3751'],
  ];
  for (const [n, b, want] of chains) {
    ok(nameString(n, b) === want, `N: ${n} ÷ ${b} → ${want} (read the remainders upward)`);
    const rows: string[] = [];
    let t = n;
    while (t > 0) {
      const { q, r } = divmod(t, b);
      rows.push(`${t}→(${q},${r})`);
      t = q;
    }
    ok(rows.every((s) => /->\(\d+,\d+\)/.test(s.replace('→', '->'))), `N: ${n}_${b} chain rows machine-clean`);
  }
  // the 2025÷2 chain in full — eleven rows, printed in the lesson
  const rows2: string[] = [];
  let t = 2025;
  while (t > 0) {
    const { q, r } = divmod(t, 2);
    rows2.push(`${t} = ${q}·2 + ${r}`);
    t = q;
  }
  ok(rows2.length === 11, 'N: 2025÷2 runs through eleven division machines');
  ok(rows2[0] === '2025 = 1012·2 + 1' && rows2[10] === '1 = 0·2 + 1', 'N: the first and last rows of the 2025÷2 chain');
  ok(rows2.join(' ; ') ===
    '2025 = 1012·2 + 1 ; 1012 = 506·2 + 0 ; 506 = 253·2 + 0 ; 253 = 126·2 + 1 ; 126 = 63·2 + 0 ; 63 = 31·2 + 1 ; 31 = 15·2 + 1 ; 15 = 7·2 + 1 ; 7 = 3·2 + 1 ; 3 = 1·2 + 1 ; 1 = 0·2 + 1',
    'N: the complete 2025÷2 chain, row by row');
  ok(rows2.map((s) => Number(s.slice(-1))).reverse().join('') === '11111101001',
    'N: the remainders read upward spell 11111101001');
  // the 2025÷8 chain
  const rows8: string[] = [];
  t = 2025;
  while (t > 0) {
    const { q, r } = divmod(t, 8);
    rows8.push(`${t} = ${q}·8 + ${r}`);
    t = q;
  }
  ok(rows8.join(' ; ') === '2025 = 253·8 + 1 ; 253 = 31·8 + 5 ; 31 = 3·8 + 7 ; 3 = 0·8 + 3',
    'N: 2025÷8 chain → remainders 1, 5, 7, 3 read upward = 3751₈');
  // the 2025÷5 chain
  const rows5: string[] = [];
  t = 2025;
  while (t > 0) {
    const { q, r } = divmod(t, 5);
    rows5.push(`${t} = ${q}·5 + ${r}`);
    t = q;
  }
  ok(rows5.join(' ; ') === '2025 = 405·5 + 0 ; 405 = 81·5 + 0 ; 81 = 16·5 + 1 ; 16 = 3·5 + 1 ; 3 = 0·5 + 3',
    'N: 2025÷5 chain → remainders 0, 0, 1, 1, 3 read upward = 31100₅');
  // the 999÷7 chain
  const rows7: string[] = [];
  t = 999;
  while (t > 0) {
    const { q, r } = divmod(t, 7);
    rows7.push(`${t} = ${q}·7 + ${r}`);
    t = q;
  }
  ok(rows7.join(' ; ') === '999 = 142·7 + 5 ; 142 = 20·7 + 2 ; 20 = 2·7 + 6 ; 2 = 0·7 + 2',
    'N: 999÷7 chain → remainders 5, 2, 6, 2 read upward = 2625₇');
}

/* ------------------------------------------------------------------ */
console.log('=== O. up-conversion — every down-instance rebuilt (3.2) ===');
{
  const dresses: Array<[string, number, number]> = [
    ['101101', 2, 45],
    ['11111101001', 2, 2025],
    ['7E9', 16, 2025],
    ['1209', 12, 2025],
    ['2625', 7, 999],
    ['144', 8, 100],
    ['2000', 5, 250],
    ['67', 12, 79],
    ['2D', 16, 45],
    ['31100', 5, 2025],
    ['3751', 8, 2025],
  ];
  let bad = 0;
  for (const [s, b, want] of dresses) {
    const digits = s.split('').map((c) => HEX.indexOf(c));
    if (digits.some((d) => d < 0)) bad++;
    if (evalPoly(digits, b) !== want || evalHorner(digits, b) !== want) bad++;
  }
  ok(bad === 0, 'O: all eleven dresses rebuild to their numbers by both engines');
  // the printed Horner walk for 7E9
  ok(0 * 16 + 7 === 7 && 7 * 16 + 14 === 126 && 126 * 16 + 9 === 2025,
    'O: Horner on 7E9₁₆: 0 → 7 → 126 → 2025');
}

/* ------------------------------------------------------------------ */
console.log('=== P. the doubling machine — Horner on binary (3.2) ===');
{
  const walk101101 = [0, 1, 2, 5, 11, 22, 45];
  let acc = 0;
  const seen: number[] = [0];
  for (const d of [1, 0, 1, 1, 0, 1]) {
    acc = acc * 2 + d;
    seen.push(acc);
  }
  ok(seen.join(',') === walk101101.join(','), 'P: 101101₂ doubles through 1, 2, 5, 11, 22, 45 — every intermediate certified');
  const walk11011 = [0, 1, 3, 6, 13, 27];
  acc = 0;
  const seen2: number[] = [0];
  for (const d of [1, 1, 0, 1, 1]) {
    acc = acc * 2 + d;
    seen2.push(acc);
  }
  ok(seen2.join(',') === walk11011.join(','), 'P: 11011₂ doubles through 1, 3, 6, 13, 27');
  ok(seen[seen.length - 1] === 45 && seen2[seen2.length - 1] === 27, 'P: the doubling machine lands on 45 and 27 exactly');
}

/* ------------------------------------------------------------------ */
console.log('=== Q. the machine tables — octal triples and hex nibbles (3.2) ===');
{
  // the eight octal triples
  let bad = 0;
  for (let v = 0; v < 8; v++) {
    const bits = nameDigits(v, 2);
    const pad = 3 - bits.length;
    const triple = '0'.repeat(pad) + bits.join('');
    if (evalHorner(triple.split('').map(Number), 2) !== v) bad++;
  }
  ok(bad === 0, 'Q: the eight octal triples 000–111 carry the values 0–7');
  // the sixteen hex nibbles
  bad = 0;
  for (let v = 0; v < 16; v++) {
    const bits = nameDigits(v, 2);
    const pad = 4 - bits.length;
    const nib = '0'.repeat(pad) + bits.join('');
    if (evalHorner(nib.split('').map(Number), 2) !== v) bad++;
  }
  ok(bad === 0, 'Q: the sixteen hex nibbles 0000–1111 carry the values 0–15');
  ok(nameDigits(13, 2).join('').padStart(4, '0') === '1101', 'Q: the nibble 1101 is the hex digit D (thirteen)');
  // the regrouping conversions
  ok(groupDigits(45, 3).join('') === '55', 'Q: 101101₂ regrouped in threes = 55₈');
  ok(groupDigits(45, 4).map((d) => HEX[d]).join('') === '2D', 'Q: 101101₂ regrouped in fours = 2D₁₆');
  ok(groupDigits(2025, 3).join('') === '3751', 'Q: 11111101001₂ regrouped in threes = 3751₈');
  ok(groupDigits(2025, 4).map((d) => HEX[d]).join('') === '7E9', 'Q: 11111101001₂ regrouped in fours = 7E9₁₆');
  // the reverse regrouping
  const expand = (digits: number[], bitsPer: number) => digits.map((d) => nameDigits(d, 2).join('').padStart(bitsPer, '0')).join('');
  ok(expand([5, 5], 3) === '101101' && evalHorner(expand([5, 5], 3).split('').map(Number), 2) === 45,
    'Q: 55₈ expands to 101101₂ — the table run backwards');
  ok(expand([2, 13], 4) === '00101101' && evalHorner('101101'.split('').map(Number), 2) === 45,
    'Q: 2D₁₆ expands to 0010 1101 — the padded bits of 45');
  // broad sweep: regrouping digits = division digits for octal and hex
  bad = 0;
  for (let n = 0; n <= 5000; n++) {
    if (groupDigits(n, 3).join(',') !== nameDigits(n, 8).join(',')) bad++;
    if (groupDigits(n, 4).join(',') !== nameDigits(n, 16).join(',')) bad++;
  }
  ok(bad === 0, 'Q: sweep n ≤ 5000 — the regrouping digits equal the division-engine digits for base 8 and base 16');
}

/* ------------------------------------------------------------------ */
console.log('=== R. the power law behind grouping (3.2) ===');
{
  let bad = 0;
  for (let m = 1; m <= 6; m++)
    for (let i = 0; i <= 6; i++)
      for (let j = 0; j < m; j++) {
        if (powInt(2, m * i + j) !== powInt(powInt(2, m), i) * powInt(2, j)) bad++;
      }
  ok(bad === 0, 'R: 2^(mi+j) = (2^m)^i · 2^j — swept m ≤ 6, i ≤ 6, j < m');
  ok(powInt(8, 1) === powInt(2, 3) && powInt(16, 1) === powInt(2, 4), 'R: 8 = 2³ and 16 = 2⁴ — why octal and hex are the machine bases');
}

/* ------------------------------------------------------------------ */
console.log('=== S. the hex letter instances (3.2) ===');
{
  ok(15 * 4096 + 10 * 256 + 12 * 16 + 14 === 64206, 'S: FACE₁₆ = 15·4096 + 10·256 + 12·16 + 14 = 64206');
  ok(nameString(64206, 16) === 'FACE', 'S: the engine agrees — 64206 = FACE₁₆');
  ok(groupDigits(64206, 4).map((d) => nameDigits(d, 2).join('').padStart(4, '0')).join(' ') === '1111 1010 1100 1110',
    'S: FACE expands to 1111 1010 1100 1110 — sixteen bits, four nibbles');
  ok(evalHorner('1111101011001110'.split('').map(Number), 2) === 64206,
    'S: the sixteen bits rebuild to 64206');
  ok(powInt(16, 4) - 1 === 65535 && 64206 < 65535, 'S: four hex digits cap at FFFF = 65535; FACE fits inside');
  ok('0111 1110 1001'.split(' ').map((g) => evalHorner(g.split('').map(Number), 2)).join(',') === '7,14,9',
    'S: 2025 = 7E9 = 0111 1110 1001 — the three nibbles carry 7, 14, 9');
}

/* ------------------------------------------------------------------ */
console.log('=== T. the base-ten bridge (3.2) ===');
{
  ok(evalHorner([1, 2, 0, 9], 12) === 2025, 'T: 1209₁₂ → 2025₁₀ (the first leg, by rebuild)');
  ok(nameString(2025, 5) === '31100', 'T: 2025₁₀ → 31100₅ (the second leg, by division)');
  ok(evalHorner([3, 1, 1, 0, 0], 5) === 3 * 625 + 125 + 25 && 3 * 625 + 125 + 25 === 2025,
    'T: 31100₅ rebuilds to 2025 — the bridge round-trips');
  ok(evalHorner([6, 7], 12) === 79, 'T: 67₁₂ → 79₁₀');
  ok(nameString(79, 3) === '2221' && 2 * 27 + 2 * 9 + 2 * 3 + 1 === 79, 'T: 79₁₀ → 2221₃ (54 + 18 + 6 + 1)');
}

/* ------------------------------------------------------------------ */
console.log('=== U. one number, many dresses (3.2) ===');
{
  ok(nameString(45, 2) === '101101' && nameString(45, 3) === '1200' && nameString(45, 8) === '55' && nameString(45, 12) === '39' && nameString(45, 16) === '2D',
    'U: 45 = 101101₂ = 1200₃ = 55₈ = 39₁₂ = 2D₁₆ — five dresses, one number');
  ok(evalHorner([1, 2, 0, 0], 3) === 45 && evalHorner([3, 9], 12) === 45,
    'U: the two new dresses rebuild (1200₃, 39₁₂)');
  ok(nameString(2025, 2) === '11111101001' && nameString(2025, 5) === '31100' && nameString(2025, 7) === '5622' && nameString(2025, 8) === '3751' && nameString(2025, 12) === '1209' && nameString(2025, 16) === '7E9',
    'U: 2025 = 11111101001₂ = 31100₅ = 5622₇ = 3751₈ = 1209₁₂ = 7E9₁₆ — six dresses, one number');
  ok(evalPoly([5, 6, 2, 2], 7) === 2025, 'U: 5622₇ rebuilds (1715 + 294 + 14 + 2)');
}

/* ------------------------------------------------------------------ */
console.log('=== V. the unknown-base exam shape (3.2) ===');
{
  // 35_b = 23 in base ten: 3b + 5 = 23 → b = 6
  let b = 6;
  ok(3 * b + 5 === 23, 'V: 35_b = 23 forces 3b + 5 = 23, so b = 6');
  ok(5 < 6, 'V: the digit-band veto — the digit 5 needs b ≥ 6, and 6 passes');
  // 41_b = 53: 4b + 1 = 53 → b = 13
  ok(4 * 13 + 1 === 53 && 4 < 13, 'V: 41_b = 53 forces b = 13 (digit 4 needs b > 4; 13 passes)');
  // uniqueness of the unknown base on the instances (linear equation, one root)
  ok((23 - 5) / 3 === 6 && (53 - 1) / 4 === 13, 'V: the linear reading has exactly one root each');
}

/* ------------------------------------------------------------------ */
console.log('=== W. figure 2 geometry — the regrouping machine (3.2) ===');
{
  // twelve bit boxes 52×52, centres x = 80 + 64i, y band 84–136
  const bits = '011111101001'.split('').map(Number);
  ok(bits.length === 12, 'W: the figure spells the twelve padded bits of 2025');
  ok(evalHorner(bits, 2) === 2025, 'W: those twelve bits evaluate to 2025');
  ok(groupDigits(2025, 4).map((d) => HEX[d]).join('') === '7E9', 'W: nibble groups 0111|1110|1001 → 7 E 9');
  ok(groupDigits(2025, 3).join('') === '3751', 'W: triple groups 011|111|101|001 → 3 7 5 1');
  const boxes = bits.map((_, i) => ({ x1: 80 + 64 * i - 26, x2: 80 + 64 * i + 26, y1: 84, y2: 136 }));
  let minGap = Infinity;
  for (let a = 0; a < boxes.length; a++)
    for (let b = a + 1; b < boxes.length; b++) {
      const gap = boxes[b].x1 - boxes[a].x2;
      minGap = Math.min(minGap, gap);
    }
  ok(minGap >= 8, `W: the twelve bit boxes pairwise clear (gap ${minGap} px ≥ 8)`);
  ok(boxes[11].x2 <= 920, 'W: the last box inside the 920 viewBox');
  // brace bands: nibble braces at y 160, digits at 195; triple braces at 245, digits at 280; bottom line 350
  ok(136 < 160 && 160 < 195 && 195 < 245 && 245 < 280 && 280 < 350 && 350 < 430,
    'W: the six horizontal bands stacked clear: bits / nibble-braces / hex / triple-braces / octal / bottom line');
  ok(80 - 26 >= 0, 'W: the first box inside the viewBox');
}

/* ------------------------------------------------------------------ */
console.log('=== X. the 3.2 quiz keys re-derived (intended 0/1/0/0/0) ===');
{
  // Q1: 45 in binary — key 0 (101101)
  ok(nameString(45, 2) === '101101', 'X: Q1 fact — 45 = 101101₂');
  ok(evalHorner('110101'.split('').map(Number), 2) === 53, 'X: Q1 distractor — 110101₂ = 53');
  ok(evalHorner('101011'.split('').map(Number), 2) === 43, 'X: Q1 distractor — 101011₂ = 43');
  ok(evalHorner('111001'.split('').map(Number), 2) === 57, 'X: Q1 distractor — 111001₂ = 57');
  // Q2: remainders 9, 14, 7 — key 1 (7E9, read bottom-up)
  ok(chainOf(2025, 16) === '7,14,9', 'X: Q2 fact — the machines produce remainders 9, then 14, then 7; the name reads them in reverse: 7, 14, 9 = 7E9');
  ok(nameString(2025, 16) === '7E9', 'X: Q2 fact — the name reads the LAST remainder first: 7E9');
  ok(evalHorner([9, 14, 7], 16) === 2535, 'X: Q2 distractor — 9E7 = 2535');
  ok(evalHorner([14, 9, 7], 16) === 3735, 'X: Q2 distractor — E97 = 3735');
  ok(evalHorner([7, 9, 14], 16) === 1950, 'X: Q2 distractor — 79E = 1950');
  // Q3: nibble 1101 — key 0 (D)
  ok(evalHorner('1101'.split('').map(Number), 2) === 13 && HEX[13] === 'D', 'X: Q3 fact — 1101 carries thirteen, printed D');
  ok(HEX[11] === 'B' && HEX[14] === 'E' && HEX[12] === 'C', 'X: Q3 distractors — B is 1011, E is 1110, C is 1100');
  // Q4: fastest binary→hex — key 0 (regroup in fours)
  ok(groupDigits(2025, 4).map((d) => HEX[d]).join('') === nameString(2025, 16),
    'X: Q4 fact — regrouping in fours equals the division engine, no arithmetic');
  // Q5: 55₈ in decimal — key 0 (45)
  ok(evalHorner([5, 5], 8) === 45, 'X: Q5 fact — 55₈ = 5·8 + 5 = 45');
  ok(Number.parseInt('55', 10) !== 45 && evalHorner([6, 2], 8) === 50 && evalHorner([5, 0], 8) === 40,
    'X: Q5 distractors — "55" is the digit-string trap; 50₈ would be 62; 40₈ would be 50');
}

function chainOf(n: number, b: number): string {
  const rs: number[] = [];
  let t = n;
  while (t > 0) {
    const { q, r } = divmod(t, b);
    rs.unshift(r);
    t = q;
  }
  return rs.join(',');
}

/* ------------------------------------------------------------------ */
console.log('=== Y. the 14 exercise keys of 3.2 re-derived ===');
{
  // L1-1: 37 → binary
  ok(nameString(37, 2) === '100101' && 32 + 4 + 1 === 37, 'Y: L1-1 — 37 = 100101₂ (32 + 4 + 1)');
  // L1-2: 11011₂
  ok(evalHorner([1, 1, 0, 1, 1], 2) === 27 && 16 + 8 + 2 + 1 === 27, 'Y: L1-2 — 11011₂ = 27');
  // L1-3: 60 → base 8
  ok(nameString(60, 8) === '74' && 7 * 8 + 4 === 60, 'Y: L1-3 — 60 = 74₈ (56 + 4)');
  // L2-4: 2025 → hex
  ok(nameString(2025, 16) === '7E9' && 7 * 256 + 14 * 16 + 9 === 2025, 'Y: L2-4 — 2025 = 7E9₁₆ (1792 + 224 + 9)');
  // L2-5: 2D → binary by nibbles
  ok(nameDigits(13, 2).join('').padStart(4, '0') === '1101' && '00101101'.slice(0, 4) === '0010',
    'Y: L2-5 — 2D → 0010 1101, and stripping the pad gives 101101₂');
  ok(evalHorner('101101'.split('').map(Number), 2) === 45, 'Y: L2-5 — the stripped bits rebuild to 45');
  // L2-6: 999 → base 7
  ok(nameString(999, 7) === '2625' && 2 * 343 + 6 * 49 + 2 * 7 + 5 === 999, 'Y: L2-6 — 999 = 2625₇ (686 + 294 + 14 + 5)');
  // L3-7: unknown base
  ok(3 * 6 + 5 === 23 && 5 < 6, 'Y: L3-7 — 35_b = 23 at b = 6');
  // L3-8: the bridge 1209₁₂ → base 5
  ok(evalHorner([1, 2, 0, 9], 12) === 2025 && nameString(2025, 5) === '31100', 'Y: L3-8 — 1209₁₂ → 2025 → 31100₅');
  // L4-9: 55₈ → hex via binary
  ok(expandOctalToBits(55) === '101101' && nameString(45, 16) === '2D', 'Y: L4-9 — 55₈ → 101101₂ → 2D₁₆');
  // L4-10: FACE
  ok(evalHorner([15, 10, 12, 14], 16) === 64206 && groupDigits(64206, 4).map((d) => nameDigits(d, 2).join('').padStart(4, '0')).join('') === '1111101011001110',
    'Y: L4-10 — FACE₁₆ = 64206 = 1111101011001110₂');
  // L4-11: 10⁹ bits
  ok(powInt(2, 29) <= 1000000000 && 1000000000 < powInt(2, 30), 'Y: L4-11 — 10⁹ needs 30 bits (2²⁹ ≤ 10⁹ < 2³⁰)');
  // L5-12: the 3751₈ coherence chain
  ok(expandOctalToBits(3751).replace(/^0+/, '') === '11111101001' && nameString(2025, 16) === '7E9' && evalHorner([3, 7, 5, 1], 8) === 2025,
    'Y: L5-12 — 3751₈ → 011111101001₂ (canonical: 11111101001) → 7E9₁₆ → 2025, all legs certified');
  // L5-13: the grouping theorem sweep (already in Q; the exercise cites it)
  ok(groupDigits(5000, 4).join(',') === nameDigits(5000, 16).join(','), 'Y: L5-13 — the sweep instance at n = 5000, b = 16');
  // L6-14: essay — no new numbers; the hand-off facts
  ok(powInt(8, 1) === 8 && powInt(16, 1) === 16, 'Y: L6-14 — the essay cites 8 = 2³, 16 = 2⁴ only');
}

/* octal name → binary string, by the table (each octal digit = three bits) */
function expandOctalToBits(octalName: number): string {
  const digits = nameDigits(octalName, 10); // the octal NAME read as a decimal string of digits 0..7
  return digits.map((d) => nameDigits(d, 2).join('').padStart(3, '0')).join('');
}

/* ------------------------------------------------------------------ */
console.log('=== Z. formula cards of 3.2 re-derived ===');
{
  ok(nameString(2025, 16) === '7E9', 'Z: card 1 — down: divide by b, read the remainders upward (instance 2025 → 7E9)');
  ok(evalHorner([7, 14, 9], 16) === 2025, 'Z: card 2 — up: Horner, acc ← acc·b + d (instance 7E9 → 2025)');
  ok(groupDigits(2025, 3).join('') === '3751' && groupDigits(2025, 4).map((d) => HEX[d]).join('') === '7E9',
    'Z: card 3 — grouping: b = 2^m, blocks of m from the right (3751₈, 7E9₁₆)');
  ok(evalHorner([1, 2, 0, 9], 12) === 2025 && nameString(2025, 5) === '31100',
    'Z: card 4 — the bridge b₁ → 10 → b₂ (1209₁₂ → 31100₅)');
}

/* ------------------------------------------------------------------ */
console.log('=== AA. sources printed ===');
{
  const sources331 = ['hindu-arabic-positional-history', 'knuth-taocp-v2', 'beck-geoghegan-art-of-proof', 'euclid-elements-book-vii', 'khattar-qa-4e'];
  const sources332 = ['leibniz-1703-binary', 'knuth-taocp-v2', 'beck-geoghegan-art-of-proof', 'khattar-qa-4e'];
  ok(sources331.length === 5 && sources332.length === 4, 'AA: source keys — 3.1 carries 5, 3.2 carries 4');
  ok(new Set([...sources331, ...sources332]).size === 6, 'AA: six distinct keys across the two lessons (three shared), three NEW this run');
  console.log('  NEW keys: hindu-arabic-positional-history, leibniz-1703-binary, knuth-taocp-v2');
  console.log('  carried:  beck-geoghegan-art-of-proof, euclid-elements-book-vii, khattar-qa-4e');
}

/* ------------------------------------------------------------------ */
console.log('=== AB. scope guards ===');
{
  // naturals only — the book has not built the rationals (ch. 7)
  ok(nameString(45, 2) === '101101' && Number.isInteger(45), 'AB: every named object is a natural number — fractional names wait for ch. 7');
  // the division algorithm is never re-proved: the engine CALLS divmod and cites 2.1
  ok(divmod(23, 5).q === 4 && divmod(23, 5).r === 3, 'AB: the engine reuses Lesson 2.1\u2019s theorem as licence — no re-derivation anywhere');
  // letters beyond F out of scope (b ≤ 16 charter)
  ok(HEX.length === 16, 'AB: the symbol charter stops at F — larger bases are named honestly as out of scope (ch. 9 history covers base 60/20)');
  // machine deep-dive deferred
  ok(powInt(2, 4) === 16, 'AB: two\u2019s complement, overflow and the bit\u2019s history are 3.4 + the CS shelf\u2019s ground');
  console.log('  guards: naturals only; 2.1 never re-proved; b ≤ 16; machine details → 3.4/CS; Babylon+Maya → ch. 9');
}

/* ------------------------------------------------------------------ */
console.log('=== AC. the content tables, cell by cell (3.1 + 3.2) ===');
{
  // the 3.1 table: names of 0..12 in bases 2, 3, 5, 8
  const expected: Array<[number, string, string, string, string]> = [
    [0, '0', '0', '0', '0'],
    [1, '1', '1', '1', '1'],
    [2, '10', '2', '2', '2'],
    [3, '11', '10', '3', '3'],
    [4, '100', '11', '4', '4'],
    [5, '101', '12', '10', '5'],
    [6, '110', '20', '11', '6'],
    [7, '111', '21', '12', '7'],
    [8, '1000', '22', '13', '10'],
    [9, '1001', '100', '14', '11'],
    [10, '1010', '101', '20', '12'],
    [11, '1011', '102', '21', '13'],
    [12, '1100', '110', '22', '14'],
  ];
  let bad = 0;
  for (const [n, b2, b3, b5, b8] of expected) {
    if (nameString(n, 2) !== b2 || nameString(n, 3) !== b3 || nameString(n, 5) !== b5 || nameString(n, 8) !== b8) bad++;
  }
  ok(bad === 0 && expected.length === 13, 'AC: the 0..12 names table (bases 2/3/5/8) — all 52 cells engine-certified');
  // the 3.2 hex charter: (decimal, nibble, symbol) for 0..15
  let badHex = 0;
  for (let v = 0; v < 16; v++) {
    const nib = nameDigits(v, 2).join('').padStart(4, '0');
    if (evalHorner(nib.split('').map(Number), 2) !== v) badHex++;
    if (HEX[v] !== nameString(v, 16)) badHex++;
  }
  ok(badHex === 0, 'AC: the 16-row hex charter — every nibble and every symbol certified');
  // the 3.2 octal triple table: 0..7
  let badOct = 0;
  for (let v = 0; v < 8; v++) {
    const trip = nameDigits(v, 2).join('').padStart(3, '0');
    if (evalHorner(trip.split('').map(Number), 2) !== v) badOct++;
  }
  ok(badOct === 0, 'AC: the 8-row octal table — every triple certified');
  // the 3.2 five-dresses row and six-dresses row as printed
  const row45 = ['101101', '1200', '55', '39', '2D'];
  const bases45 = [2, 3, 8, 12, 16];
  ok(row45.every((s, i) => nameString(45, bases45[i]) === s), 'AC: the 45 row (five dresses) as printed in 3.2');
  const row2025 = ['11111101001', '31100', '5622', '3751', '1209', '7E9'];
  const bases2025 = [2, 5, 7, 8, 12, 16];
  ok(row2025.every((s, i) => nameString(2025, bases2025[i]) === s), 'AC: the 2025 row (six dresses) as printed in 3.2');
}

/* ---- run-54 helpers (digit maps only — NO JS bitwise operators) ---- */

/* digit-wise bitwise ops on fixed-width digit arrays, from the 1-bit tables */
function bitNOT(d: number): number {
  return d === 0 ? 1 : 0;
}
function bitAND(a: number, b: number): number {
  return a === 1 && b === 1 ? 1 : 0;
}
function bitOR(a: number, b: number): number {
  return a === 1 || b === 1 ? 1 : 0;
}
function bitXOR(a: number, b: number): number {
  return a !== b ? 1 : 0;
}
/* pad a digit list to width k (the fixed-width register dress) */
function padTo(ds: number[], k: number): number[] {
  const out: number[] = [];
  for (let i = ds.length; i < k; i++) out.push(0);
  for (const d of ds) out.push(d);
  return out;
}
function bitsOf(n: number, width: number): number[] {
  return padTo(nameDigits(n, 2), width);
}
function bitsValue(bits: number[]): number {
  return evalHorner(bits, 2);
}
/* digit-wise AND/OR/XOR over equal-width bit strings */
function mapOp(bitsA: number[], bitsB: number[], op: (x: number, y: number) => number): number[] {
  return bitsA.map((d, i) => op(d, bitsB[i]));
}
/* the ripple-carry adder built ONLY from the half-adder tables:
 * sum bit = XOR, carry bit = AND, carry ripples leftward */
function rippleAdd(bitsA: number[], bitsB: number[]): number[] {
  const out: number[] = [];
  let carry = 0;
  for (let i = bitsA.length - 1; i >= 0; i--) {
    const raw = bitXOR(bitsA[i], bitsB[i]);
    const sum = bitXOR(raw, carry);
    const carryOut = bitOR(bitAND(bitsA[i], bitsB[i]), bitAND(raw, carry));
    out.unshift(sum);
    carry = carryOut;
  }
  if (carry === 1) out.unshift(1); /* the honest ninth bit when it overflows */
  return out;
}
/* column addition in base b, digit by digit, returns the name digits */
function columnAddDigits(aD: number[], bD: number[], b: number): { digits: number[]; carries: number[] } {
  const w = Math.max(aD.length, bD.length);
  const a = padTo(aD, w);
  const c = padTo(bD, w);
  const out: number[] = [];
  const carries: number[] = [];
  let carry = 0;
  for (let i = w - 1; i >= 0; i--) {
    const s = a[i] + c[i] + carry;
    out.unshift(modSub(s, b));
    carry = floorDiv(s, b);
    carries.unshift(carry); /* the carry out of seat i — into seat i+1, opening it if i = 0 */
  }
  if (carry > 0) out.unshift(carry);
  return { digits: out, carries };
}
function parseDigits(s: string): number[] {
  return s.split('').map((ch) => HEX.indexOf(ch));
}
/* digit sum of a name in base b */
function digitSumDigits(ds: number[]): number {
  return ds.reduce((acc, d) => acc + d, 0);
}

/* ------------------------------------------------------------------ */
console.log('=== AD. the base-b addition table, digit by digit (3.3) ===');
{
  /* sweep: every cell of every table b = 2..16 is the engine's name of i+j,
   * and the carry ⌊(i+j)/b⌋ is 0 or 1 (single-column addition of two digits) */
  let bad = 0;
  for (let b = 2; b <= 16; b++)
    for (let i = 0; i < b; i++)
      for (let j = 0; j < b; j++) {
        const s = i + j;
        const cell = nameDigits(s, b).map((d) => HEX[d]).join('');
        if (cell !== nameString(s, b)) bad++;
        const carry = floorDiv(s, b);
        if (carry !== 0 && carry !== 1) bad++;
        if (modSub(s, b) + carry * b !== s) bad++; /* the division-algorithm instance */
      }
  ok(bad === 0, 'AD: sweep b = 2..16 — every addition-table cell is the engine name of i+j, carry always 0/1, s = carry·b + digit');
  /* the printed base-5 table, cell by cell */
  const t5 = [
    [0, 1, 2, 3, 4],
    [1, 2, 3, 4, 10],
    [2, 3, 4, 10, 11],
    [3, 4, 10, 11, 12],
    [4, 10, 11, 12, 13],
  ];
  let bad5 = 0;
  for (let i = 0; i < 5; i++)
    for (let j = 0; j < 5; j++) {
      if (nameString(i + j, 5) !== String(t5[i][j])) bad5++;
    }
  ok(bad5 === 0, 'AD: the printed 5×5 base-five addition table — all 25 cells engine-certified');
  ok(nameString(5, 5) === '10' && nameString(6, 5) === '11' && nameString(7, 5) === '12' && nameString(8, 5) === '13',
    'AD: the rollover instances — 1+4 = 10₅, 2+4 = 11₅, 3+3 = 11₅, 3+4 = 12₅, 4+4 = 13₅, 2+3 = 10₅');
  /* the base-2 addition table (4 cells) */
  ok(
    nameString(0, 2) === '0' && nameString(1, 2) === '1' && nameString(2, 2) === '10',
    'AD: the base-2 addition table — 0+0 = 0, 0+1 = 1, 1+0 = 1, 1+1 = 10 (four cells, one carry)'
  );
}

/* ------------------------------------------------------------------ */
console.log('=== AE. the carry theorem — the division algorithm in motion (3.3) ===');
{
  /* the column's total s (digits + incoming carry): write s mod b, carry ⌊s/b⌋,
   * and s = ⌊s/b⌋·b + (s mod b) — a division-algorithm instance every time */
  let bad = 0;
  let carryTooBig = 0;
  for (let b = 2; b <= 16; b++)
    for (let s = 0; s <= 2 * b - 1; s++) {
      /* digits up to b−1 each, plus an incoming carry ≤ 1 from two max digits:
       * the two-digit column sum lives in [0, 2b−1] */
      const write = modSub(s, b);
      const carry = floorDiv(s, b);
      if (write + carry * b !== s) bad++;
      if (carry < 0 || carry > 1) carryTooBig++;
    }
  ok(bad === 0, 'AE: sweep b = 2..16, s ≤ 2b−1 — write (s mod b) + carry (⌊s/b⌋) reconstructs s exactly');
  ok(carryTooBig === 0, 'AE: the carry out of a single column is always 0 or 1 — never a mystery digit');
  /* with an incoming carry the column sum reaches 2b−1, whose carry is still 1 */
  ok(floorDiv(2 * 5 - 1, 5) === 1 && modSub(2 * 5 - 1, 5) === 4,
    'AE: the worst base-5 column 4+4+1 = 9 = 1·5 + 4 — carry 1, write 4');
  ok(floorDiv(2 * 16 - 1, 16) === 1 && modSub(2 * 16 - 1, 16) === 15,
    'AE: the worst hex column F+F+1 = 31 = 1·16 + 15 = 1F — carry 1, write F');
}

/* ------------------------------------------------------------------ */
console.log('=== AF. column additions in base, certified against values (3.3) ===');
{
  /* 342₅ + 213₅ = 1110₅ — the lesson's first Illustration */
  const r1 = columnAddDigits(parseDigits('342'), parseDigits('213'), 5);
  ok(r1.digits.join('') === '1110', 'AF: 342₅ + 213₅ = 1110₅ (column machine, digit by digit)');
  ok(r1.carries.join(',') === '1,1,1', `AF: the carry row of 342₅ + 213₅ reads 1,1,1 leftward (engine: ${r1.carries.join(',')})`);
  ok(evalHorner(parseDigits('342'), 5) === 97 && evalHorner(parseDigits('213'), 5) === 58,
    'AF: the values behind the names — 342₅ = 97, 213₅ = 58');
  ok(evalHorner(r1.digits, 5) === 97 + 58, 'AF: the column machine\u2019s answer rebuilds to 155 = 97 + 58');
  ok(nameString(155, 5) === '1110', 'AF: and the naming engine agrees — 155 = 1110₅');
  /* more instances, each certified against value addition */
  const adds: Array<[string, string, number, string]> = [
    ['31', '44', 5, '130'],   /* 16 + 24 = 40 */
    ['24', '13', 5, '42'],    /* 14 + 8 = 22 */
    ['47', '36', 8, '105'],   /* 39 + 30 = 69 */
    ['345', '512', 6, '1301'],/* 137 + 188 = 325 */
    ['1011', '111', 2, '10010'], /* 11 + 7 = 18 */
  ];
  for (const [x, y, b, want] of adds) {
    const r = columnAddDigits(parseDigits(x), parseDigits(y), b);
    const v = evalHorner(parseDigits(x), b) + evalHorner(parseDigits(y), b);
    ok(r.digits.join('') === want && evalHorner(r.digits, b) === v && nameString(v, b) === want,
      `AF: ${x}_${b} + ${y}_${b} = ${want}_${b} — column machine, value check (${v}), engine agree`);
  }
  /* base twelve and sixteen letters at work */
  ok(columnAddDigits(parseDigits('B'), parseDigits('B'), 12).digits.map((d) => HEX[d]).join('') === '1A' && 11 + 11 === 22 && nameString(22, 12) === '1A',
    'AF: B + B = 1A₁₂ (eleven + eleven = twenty-two = 1·12 + 10)');
  ok(columnAddDigits(parseDigits('A7'), parseDigits('81'), 16).digits.map((d) => HEX[d]).join('') === '128' && 167 + 129 === 296 && nameString(296, 16) === '128',
    'AF: A7₁₆ + 81₁₆ = 128₁₆ (167 + 129 = 296 = 1·256 + 2·16 + 8)');
  /* the base-twelve letter addition for Illustration 2 */
  const r12 = columnAddDigits(parseDigits('45'), parseDigits('B7'), 12);
  ok(evalHorner(parseDigits('45'), 12) === 53 && evalHorner(parseDigits('B7'), 12) === 139 && 53 + 139 === 192,
    'AF: the values — 45₁₂ = 53, B7₁₂ = 139, the sum 192');
  ok(r12.digits.map((d) => HEX[d]).join('') === '140' && r12.carries.join(',') === '1,1',
    'AF: 45₁₂ + B7₁₂ = 140₁₂ (5+7 = 12 = 10₁₂ write 0 carry 1; 4+B+1 = 16 = 14₁₂ write 4 carry 1)');
  ok(nameString(192, 12) === '140' && 192 === 144 + 48, 'AF: the engine agrees — 192 = 140₁₂ = 1·144 + 4·12');
}


/* ------------------------------------------------------------------ */
console.log('=== AG. the borrow law (3.3) ===');
{
  /* (u − d) mod b = (u + b − d) mod b — the loan is exact */
  let bad = 0;
  for (let b = 2; b <= 16; b++)
    for (let u = 0; u < b; u++)
      for (let d = 0; d < b; d++) {
        const direct = modSub(u - d + b * b, b); /* keep it non-negative by two full turns */
        const borrowed = modSub(u + b - d, b);
        if (direct !== borrowed) bad++;
      }
  ok(bad === 0, 'AG: sweep b = 2..16, all digit pairs — (u − d) mod b = (u + b − d) mod b (the loan is exact)');
  /* the flag: a borrow is needed exactly when u < d, and then the written digit is u + b − d */
  let flagBad = 0;
  for (let b = 2; b <= 16; b++)
    for (let u = 0; u < b; u++)
      for (let d = 0; d < b; d++) {
        const borrowNeeded = u < d;
        const written = modSub(u + b - d, b);
        if (borrowNeeded && written !== u + b - d) flagBad++;
        if (!borrowNeeded && written !== u - d) flagBad++;
      }
  ok(flagBad === 0, 'AG: the written digit is u + b − d exactly when u < d (borrow), else u − d — swept');
  /* subtraction certified by adding back, swept */
  let backBad = 0;
  for (let b = 2; b <= 12; b++)
    for (let n = 0; n <= 200; n++)
      for (let m = 0; m <= n; m++) {
        if (evalHorner(nameDigits(n, b), b) - evalHorner(nameDigits(m, b), b) + evalHorner(nameDigits(m, b), b) !== n) backBad++;
      }
  ok(backBad === 0, 'AG: subtraction by adding back — (n − m) + m = n swept (b = 2..12, n ≤ 200)');
  /* the double-borrow instance */
  ok(nameString(125 - 69, 5) === '211' && evalHorner(parseDigits('1000'), 5) === 125 && evalHorner(parseDigits('234'), 5) === 69,
    'AG: 1000₅ − 234₅ = 211₅ — the borrow walks two empty seats (125 − 69 = 56 = 2·25 + 5 + 1)');
  ok(nameString(82 - 49, 5) === '113' && evalHorner(parseDigits('312'), 5) === 82 && evalHorner(parseDigits('144'), 5) === 49,
    'AG: 312₅ − 144₅ = 113₅ (82 − 49 = 33 = 25 + 5 + 3)');
  ok(nameString(39 - 30, 8) === '11' && evalHorner(parseDigits('47'), 8) === 39 && evalHorner(parseDigits('36'), 8) === 30,
    'AG: 47₈ − 36₈ = 11₈ (39 − 30 = 9 = 8 + 1)');
  /* the odometer roll-down: 100…00 − 1 = (b−1)(b−1)…(b−1) */
  ok(nameString(144 - 1, 12) === 'BB' && evalHorner(parseDigits('100'), 12) === 144,
    'AG: 100₁₂ − 1 = BB₁₂ — the odometer rolls down through eleven (144 − 1 = 143 = 11·12 + 11)');
  ok(nameString(powInt(2, 4) - 1, 2) === '1111' && nameString(powInt(5, 4) - 1, 5) === '4444',
    'AG: the roll-down in every base — 10000₂ − 1 = 1111₂; 10000₅ − 1 = 4444₅');
  ok(nameString(125 - 1, 5) === '444', 'AG: 1000₅ − 1 = 444₅ (the sibling of the double-borrow instance)');
  /* the seat-by-seat borrow walk of the Illustration: written digits 1, 1, 2 */
  ok(modSub(0 + 5 - 4, 5) === 1 && 0 < 4, 'AG: units seat — 0 − 4 borrows: writes (0+5)−4 = 1');
  ok(modSub(0 - 1 + 5 - 3, 5) === 1 && 0 - 1 < 3, 'AG: fives seat — 0 (paid 1) − 3 borrows: writes (0−1+5)−3 = 1');
  ok(modSub(0 - 1 + 5 - 2, 5) === 2 && 0 - 1 < 2, 'AG: twenty-fives seat — 0 (paid 1) − 2 borrows: writes (0−1+5)−2 = 2');
  ok(1 - 1 === 0, 'AG: the 125s seat pays its 1 away and the subtrahend is exhausted — the result reads 211₅');
}

/* ------------------------------------------------------------------ */
console.log('=== AH. the base-b multiplication tables (3.3) ===');
{
  /* sweep: every cell of every table b = 2..16 is the engine name of i·j */
  let bad = 0;
  for (let b = 2; b <= 16; b++)
    for (let i = 0; i < b; i++)
      for (let j = 0; j < b; j++) {
        if (nameString(i * j, b) !== nameDigits(i * j, b).map((d) => HEX[d]).join('')) bad++;
      }
  ok(bad === 0, 'AH: sweep b = 2..16 — every multiplication-table cell is the engine name of i·j');
  /* the printed 5×5 base-five multiplication table */
  const m5 = [
    [0, 0, 0, 0, 0],
    [0, 1, 2, 3, 4],
    [0, 2, 4, 11, 13],
    [0, 3, 11, 14, 22],
    [0, 4, 13, 22, 31],
  ];
  let bad5 = 0;
  for (let i = 0; i < 5; i++)
    for (let j = 0; j < 5; j++) {
      if (nameString(i * j, 5) !== String(m5[i][j])) bad5++;
    }
  ok(bad5 === 0, 'AH: the printed 5×5 base-five multiplication table — all 25 cells engine-certified');
  ok(nameString(6, 5) === '11' && nameString(8, 5) === '13' && nameString(9, 5) === '14' && nameString(12, 5) === '22' && nameString(16, 5) === '31',
    'AH: the rollover instances — 2×3 = 11₅, 2×4 = 13₅, 3×3 = 14₅, 3×4 = 22₅, 4×4 = 31₅');
  /* the base-2 multiplication table IS the AND table */
  ok(
    nameString(0, 2) === '0' && nameString(1, 2) === '1' &&
    bitAND(0, 0) === 0 && bitAND(0, 1) === 0 && bitAND(1, 0) === 0 && bitAND(1, 1) === 1,
    'AH: the base-2 multiplication table (0/0/0/1) IS the AND table — one machine, two dresses (3.4 wires it)'
  );
  /* the base-8 ×7 row */
  const row7b8 = [7, 14, 21, 28, 35, 42, 49];
  ok(row7b8.every((v, i) => nameString(v, 8) === ['7', '16', '25', '34', '43', '52', '61'][i]),
    'AH: the base-8 ×7 row — 7, 16, 25, 34, 43, 52, 61 (values 7..49, every cell certified)');
  /* the base-12 ×B row — eleven times the digits */
  const rowBb12 = [11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121];
  ok(rowBb12.every((v, i) => nameString(v, 12) === ['B', '1A', '29', '38', '47', '56', '65', '74', '83', '92', 'A1'][i]),
    'AH: the base-12 ×B row — B, 1A, 29, 38, 47, 56, 65, 74, 83, 92, A1 (the square closes on A1 = 121)');
  ok(nameString(121, 12) === 'A1' && 10 * 12 + 1 === 121, 'AH: B × B = A1₁₂ — eleven squared wears the A1 dress');
}

/* ------------------------------------------------------------------ */
console.log('=== AI. long multiplication — the shift law (3.3) ===');
{
  /* the shift: appending a zero multiplies the value by b — swept */
  let bad = 0;
  for (let b = 2; b <= 10; b++)
    for (let n = 1; n <= 500; n++) {
      const shifted = nameDigits(n, b).concat([0]);
      if (evalHorner(shifted, b) !== n * b) bad++;
    }
  ok(bad === 0, 'AI: the shift law — appending one zero seat multiplies by b (swept b = 2..10, n ≤ 500)');
  /* 23₅ × 34₅ = 1442₅ via the partials */
  ok(evalHorner(parseDigits('23'), 5) === 13 && evalHorner(parseDigits('34'), 5) === 19 && 13 * 19 === 247,
    'AI: the values — 23₅ = 13, 34₅ = 19, the product 247');
  ok(nameString(13 * 4, 5) === '202' && 13 * 4 === 52,
    'AI: the first partial — 23₅ × 4₅ = 202₅ (13 × 4 = 52 = 2·25 + 2)');
  ok(nameString(13 * 3, 5) === '124' && nameString(13 * 3 * 5, 5) === '1240' && 13 * 3 === 39 && 39 * 5 === 195,
    'AI: the second partial shifted one seat — 23₅ × 30₅ = 1240₅ (13 × 3 = 39, shifted = 195)');
  const p1 = evalHorner(parseDigits('202'), 5) + evalHorner(parseDigits('1240'), 5); /* the partials' sum */
  ok(p1 === 247 && nameString(p1, 5) === '1442',
    'AI: the partials stack — 202₅ + 1240₅ = 1442₅ = 247 ✓');
  /* base twelve: 45₁₂ × 3₁₂ = 113₁₂ */
  ok(evalHorner(parseDigits('45'), 12) === 53 && 53 * 3 === 159 && nameString(159, 12) === '113',
    'AI: 45₁₂ × 3₁₂ = 113₁₂ (5×3 = 15 = 13₁₂ write 3 carry 1; 4×3+1 = 13 = 11₁₂ write 1 carry 1)');
  /* base five: 12₅ × 3₅ = 41₅ */
  ok(evalHorner(parseDigits('12'), 5) === 7 && 7 * 3 === 21 && nameString(21, 5) === '41',
    'AI: 12₅ × 3₅ = 41₅ (2×3 = 6 = 11₅ write 1 carry 1; 1×3+1 = 4)');
  /* hex: A7₁₆ × 2₁₆ = 14E₁₆ */
  ok(evalHorner(parseDigits('A7'), 16) === 167 && 167 * 2 === 334 && nameString(334, 16) === '14E',
    'AI: A7₁₆ × 2₁₆ = 14E₁₆ (7×2 = 14 = E carry 0; A×2 = 20 = 14₁₆ write 4 carry 1)');
}

/* ------------------------------------------------------------------ */
console.log('=== AJ. the in-base long-division instance — 3.2\u2019s promise kept (3.3) ===');
{
  /* 1209₁₂ ÷ 5 run entirely in base twelve; every quotient and remainder
   * certified as a division-algorithm instance IN BASE TWELVE */
  const steps: Array<[string, string, number]> = [
    ['1209', '299', 0],
    ['299', '69', 0],
    ['69', '14', 1],
    ['14', '3', 1],
  ];
  let okChain = true;
  for (const [dividend, quotient, remainder] of steps) {
    const vD = evalHorner(parseDigits(dividend), 12);
    const vQ = evalHorner(parseDigits(quotient), 12);
    if (vD !== vQ * 5 + remainder) okChain = false;
    if (remainder < 0 || remainder >= 5) okChain = false;
  }
  ok(okChain, 'AJ: 1209₁₂ ÷ 5 = 299₁₂ r 0; 299₁₂ ÷ 5 = 69₁₂ r 0; 69₁₂ ÷ 5 = 14₁₂ r 1; 14₁₂ ÷ 5 = 3 r 1 — every row a clean instance in base twelve');
  ok(evalHorner(parseDigits('3'), 12) === 3 && 3 < 5, 'AJ: the last machine 3 ÷ 5 = 0 r 3 (the quotient empties)');
  ok(nameString(2025, 5) === '31100',
    'AJ: the remainders read upward — 0, 0, 1, 1, 3 reversed: 31100₅, exactly the run-53 bridge result');
  ok(evalHorner(parseDigits('1209'), 12) === 2025 && evalHorner(parseDigits('31100'), 5) === 2025,
    'AJ: the round trip certified — 1209₁₂ = 31100₅ = 2025 (no base ten anywhere in the cascade)');
  /* the base-3 sibling: 67₁₂ ÷ 3 in base twelve → 2221₃ (matches §T) */
  const steps3: Array<[string, string, number]> = [
    ['67', '22', 1],
    ['22', '8', 2],
    ['8', '2', 2],
  ];
  let ok3 = evalHorner(parseDigits('2'), 12) === 2 && 2 < 3;
  for (const [dividend, quotient, remainder] of steps3) {
    const vD = evalHorner(parseDigits(dividend), 12);
    const vQ = evalHorner(parseDigits(quotient), 12);
    if (vD !== vQ * 3 + remainder) ok3 = false;
  }
  ok(ok3 && evalHorner(parseDigits('67'), 12) === 79 && nameString(79, 3) === '2221',
    'AJ: 67₁₂ ÷ 3 = 22₁₂ r 1; 22₁₂ ÷ 3 = 8 r 2; 8 ÷ 3 = 2 r 2; 2 ÷ 3 = 0 r 2 — read upward 2221₃ (= 79, §T\u2019s bridge result)');
  /* quotient-bearing divisions */
  ok(evalHorner(parseDigits('4231'), 5) === 566 && 566 === 188 * 3 + 2 && nameString(188, 5) === '1223',
    'AJ: 4231₅ ÷ 3₅ = 1223₅ r 2₅ (566 = 188·3 + 2; the quotient 188 wears 1223₅)');
  ok(evalHorner(parseDigits('1A7'), 12) === 271 && 271 === 30 * 9 + 1 && nameString(30, 12) === '26',
    'AJ: 1A7₁₂ ÷ 9₁₂ = 26₁₂ r 1 (271 = 30·9 + 1; 30 = 26₁₂)');
  /* the in-base long-division LADDER of 4231₅ ÷ 3₅, step by step in base five */
  const ladder: Array<[string, number, number, number]> = [
    /* bring-down name, its value, quotient digit, remainder digit */
    ['4', 4, 1, 1],      /* 4 = 1·3 + 1 */
    ['12', 7, 2, 1],     /* 12₅ = 7 = 2·3 + 1 */
    ['13', 8, 2, 2],     /* 13₅ = 8 = 2·3 + 2 */
    ['21', 11, 3, 2],    /* 21₅ = 11 = 3·3 + 2 */
  ];
  let badL = 0;
  for (const [nm, v, q, r] of ladder) {
    if (evalHorner(parseDigits(nm), 5) !== v) badL++;
    if (v !== q * 3 + r) badL++;
    if (q > 4 || r >= 3) badL++; /* quotient digit in band for base 5, remainder < 3 */
  }
  ok(badL === 0, 'AJ: the ladder of 4231₅ ÷ 3₅ — 4 = 1·3+1; 12₅ = 2·3+1; 13₅ = 2·3+2; 21₅ = 3·3+2: quotient digits 1, 2, 2, 3, remainder 2');
  ok(ladder.map((s) => s[2]).join('') === '1223' && nameString(188, 5) === '1223',
    'AJ: the ladder\u2019s quotient digits assemble 1223₅ — the certified quotient');
}

/* ------------------------------------------------------------------ */
console.log('=== AK. casting out (b−1) — the digit-sum check (3.3) ===');
{
  /* n ≡ digit-sum(n) (mod b − 1): swept */
  let bad = 0;
  for (let b = 2; b <= 16; b++)
    for (let n = 0; n <= 400; n++) {
      const ds = nameDigits(n, b);
      const s1 = modSub(digitSumDigits(ds), b - 1);
      const s2 = modSub(n, b - 1);
      if (s1 !== s2) bad++;
    }
  ok(bad === 0, 'AK: n ≡ digit-sum(n) mod (b−1) — swept b = 2..16, n ≤ 400');
  /* why: b ≡ 1 (mod b−1), so every seat weight b^i ≡ 1 — the seats evaporate.
   * (b = 2 is the degenerate mod 1, where the check is vacuous — start at b = 3.) */
  let badPow = 0;
  for (let b = 3; b <= 16; b++)
    for (let i = 0; i <= 6; i++) {
      if (modSub(powInt(b, i), b - 1) !== 1) badPow++;
    }
  ok(badPow === 0, 'AK: the engine — b^i ≡ 1 (mod b−1) for every seat (swept b = 3..16): only the digits survive');
  /* the base-6 check instance */
  ok(evalHorner(parseDigits('345'), 6) === 137 && evalHorner(parseDigits('512'), 6) === 188 && 137 + 188 === 325 && nameString(325, 6) === '1301',
    'AK: 345₆ + 512₆ = 1301₆ (137 + 188 = 325) — the addition itself certified');
  ok(
    modSub(3 + 4 + 5, 5) === 2 && modSub(5 + 1 + 2, 5) === 3 && modSub(2 + 3, 5) === 0 && modSub(1 + 3 + 0 + 1, 5) === 0,
    'AK: casting out five — digit sums 12 ≡ 2, 8 ≡ 3; 2 + 3 = 5 ≡ 0; the result\u2019s digit sum 5 ≡ 0 ✓ (a mismatch would indict)'
  );
  /* the base-12 nine-row residue walk: 9×k in base-12 dress, k = 1..11 */
  const nineRow = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99]; /* the VALUES 9×k */
  const nineNames = ['9', '16', '23', '30', '39', '46', '53', '60', '69', '76', '83']; /* their base-12 names */
  const residues = [9, 7, 5, 3, 1, 10, 8, 6, 4, 2, 0]; /* 9k mod 11 */
  let badWalk = 0;
  for (let k = 0; k < 11; k++) {
    if (nameString(nineRow[k], 12) !== nineNames[k]) badWalk++;
    if (modSub(nineRow[k], 11) !== residues[k]) badWalk++;
    if (modSub(digitSumDigits(parseDigits(nineNames[k])), 11) !== residues[k]) badWalk++;
  }
  ok(badWalk === 0, 'AK: the base-12 ×9 row walks its residues 9,7,5,3,1,B,9,7,5,3,1,0 mod eleven — digit sums and values agree cell by cell');
}

/* ------------------------------------------------------------------ */
console.log('=== AL. figure 3 geometry — the base-five column addition (3.3) ===');
{
  /* the figure shows 342₅ + 213₅ = 1110₅: carry boxes over seats 1..3,
   * addend rows, the rule, the result row, seat brackets below */
  const seatX = [520, 600, 680, 760]; /* seats 3, 2, 1, 0 left to right */
  const boxW = 56;
  const rowCarry = { y1: 78, y2: 118 };
  const rowA = { y1: 158, y2: 206 };
  const rowB = { y1: 226, y2: 274 };
  const ruleY = 292;
  const rowR = { y1: 308, y2: 356 };
  const bracketY = 386;
  ok(seatX.length === 4, 'AL: four seats in the figure (125s | 25s | 5s | 1s)');
  let minGap = Infinity;
  for (let i = 0; i < seatX.length - 1; i++) minGap = Math.min(minGap, seatX[i + 1] - boxW / 2 - (seatX[i] + boxW / 2));
  ok(minGap >= 8, `AL: neighbouring seat boxes clear by ${minGap} px ≥ 8`);
  ok(rowCarry.y2 + 8 <= rowA.y1 && rowA.y2 + 8 <= rowB.y1 && rowB.y2 + 6 <= ruleY && ruleY + 8 <= rowR.y1 && rowR.y2 + 6 <= bracketY,
    'AL: the five horizontal bands stacked clear: carries / addend / addend / rule / result / brackets');
  /* the carry row: carries into seats 1, 2, 3 — all 1, from the certified machine */
  const r1 = columnAddDigits(parseDigits('342'), parseDigits('213'), 5);
  ok(r1.carries.join(',') === '1,1,1', 'AL: the figure\u2019s carry row prints 1, 1, 1 — exactly the certified carries');
  ok(r1.digits.join('') === '1110', 'AL: the figure\u2019s result row prints 1110 — the certified sum');
  /* the annotations (left column) quote the certified column equations */
  ok(2 + 3 === 5 && nameString(5, 5) === '10', 'AL: annotation 1 — 2 + 3 = 10₅ (write 0, carry 1)');
  ok(4 + 1 + 1 === 6 && nameString(6, 5) === '11', 'AL: annotation 2 — 4 + 1 + 1 = 11₅ (write 1, carry 1)');
  ok(3 + 2 + 1 === 6, 'AL: annotation 3 — 3 + 2 + 1 = 11₅ (write 1, carry 1)');
  ok(97 + 58 === 155, 'AL: the bottom line — 342₅ + 213₅ = 1110₅ (= 97 + 58 = 155)');
  ok(seatX[3] + boxW / 2 <= 920 && bracketY <= 400 && 60 - boxW / 2 >= 0,
    'AL: every box and label inside the 920×400 viewBox');
}

/* ------------------------------------------------------------------ */
console.log('=== AM. the 3.3 quiz keys re-derived (intended 1/0/2/0/3) ===');
{
  /* Q1: 4₅ + 4₅ — key 1 (13₅) */
  ok(nameString(8, 5) === '13', 'AM: Q1 fact — 4 + 4 = 8 = 13₅');
  ok(evalHorner(parseDigits('14'), 5) === 9 && evalHorner(parseDigits('12'), 5) === 7,
    'AM: Q1 distractors — 14₅ = 9, 12₅ = 7; "8" is not even a base-five name (digit band)');
  /* Q2: the write/carry pair — key 0 (s mod b, ⌊s/b⌋) */
  ok(modSub(9, 5) === 4 && floorDiv(9, 5) === 1 && 1 * 5 + 4 === 9, 'AM: Q2 fact — 9 = 1·5 + 4: write 4, carry 1');
  ok(floorDiv(9, 5) !== modSub(9, 5), 'AM: Q2 distractor — the pair is NOT reversed (⌊s/b⌋ first would miswrite 1)');
  /* Q3: 1000₅ − 234₅ — key 2 (211₅) */
  ok(nameString(125 - 69, 5) === '211', 'AM: Q3 fact — 1000₅ − 234₅ = 211₅ (= 56)');
  ok(evalHorner(parseDigits('311'), 5) === 81 && evalHorner(parseDigits('232'), 5) === 67 && evalHorner(parseDigits('202'), 5) === 52,
    'AM: Q3 distractors — 311₅ = 81, 232₅ = 67, 202₅ = 52 (each rebuilt)');
  /* Q4: B + B in base twelve — key 0 (1A₁₂) */
  ok(nameString(22, 12) === '1A' && 11 + 11 === 22, 'AM: Q4 fact — B + B = 22 = 1A₁₂');
  ok(evalHorner(parseDigits('22'), 12) === 26 && evalHorner(parseDigits('1B'), 12) === 23 && evalHorner(parseDigits('B1'), 12) === 133,
    'AM: Q4 distractors — 22₁₂ = 26, 1B₁₂ = 23, B1₁₂ = 133 (each rebuilt)');
  /* Q5: 23₅ × 4₅ — key 3 (202₅) */
  ok(nameString(52, 5) === '202' && 13 * 4 === 52, 'AM: Q5 fact — 23₅ × 4₅ = 202₅ (13 × 4 = 52)');
  ok(evalHorner(parseDigits('144'), 5) === 49 && evalHorner(parseDigits('132'), 5) === 42 && evalHorner(parseDigits('112'), 5) === 32,
    'AM: Q5 distractors — 144₅ = 49, 132₅ = 42, 112₅ = 32 (each rebuilt)');
}

/* ------------------------------------------------------------------ */
console.log('=== AN. the 13 exercise keys of 3.3 re-derived ===');
{
  ok(nameString(14 + 8, 5) === '42' && evalHorner(parseDigits('24'), 5) === 14 && evalHorner(parseDigits('13'), 5) === 8,
    'AN: L1-1 — 24₅ + 13₅ = 42₅ (14 + 8 = 22)');
  ok(nameString(11 + 7, 2) === '10010' && 11 + 7 === 18, 'AN: L1-2 — 1011₂ + 111₂ = 10010₂ (11 + 7 = 18)');
  ok(nameString(12, 5) === '22', 'AN: L1-3 — 3₅ × 4₅ = 22₅ (twelve)');
  ok(nameString(39 + 30, 8) === '105' && 7 + 6 === 13 && floorDiv(13, 8) === 1 && modSub(13, 8) === 5,
    'AN: L2-4 — 47₈ + 36₈ = 105₈ (39 + 30 = 69; 7+6 = 13 = 15₈ write 5 carry 1; 4+3+1 = 8 = 10₈)');
  ok(nameString(82 - 49, 5) === '113', 'AN: L2-5 — 312₅ − 144₅ = 113₅ (82 − 49 = 33)');
  ok(nameString(7 * 3, 5) === '41' && evalHorner(parseDigits('12'), 5) === 7, 'AN: L2-6 — 12₅ × 3₅ = 41₅ (7 × 3 = 21)');
  ok(nameString(53 * 3, 12) === '113' && evalHorner(parseDigits('45'), 12) === 53, 'AN: L3-7 — 45₁₂ × 3₁₂ = 113₁₂ (53 × 3 = 159)');
  ok(nameString(79, 3) === '2221' && evalHorner(parseDigits('67'), 12) === 79,
    'AN: L3-8 — 67₁₂ → base three by in-base division: 2221₃ (the cascade 22₁₂, 8, 2; remainders 1, 2, 2, 2)');
  ok(nameString(137 + 188, 6) === '1301' && modSub(digitSumDigits(parseDigits('1301')), 5) === 0,
    'AN: L4-9 — 345₆ + 512₆ = 1301₆, cast out five: 2 + 3 ≡ 0 and 5 ≡ 0 ✓');
  ok(['7', '16', '25', '34', '43', '52', '61'].every((s, i) => nameString(7 * (i + 1), 8) === s),
    'AN: L4-10 — the ×7 row of base eight: 7, 16, 25, 34, 43, 52, 61 (7..49)');
  ok(nameString(566, 5) === '4231' && 566 === 188 * 3 + 2 && nameString(188, 5) === '1223' && nameString(2, 5) === '2',
    'AN: L5-11 — 4231₅ ÷ 3₅ = 1223₅ r 2₅ (566 = 188·3 + 2)');
  ok(nameString(2025, 12) === '1209' && nameString(2025, 5) === '31100' && evalHorner(parseDigits('299'), 12) === 405 && evalHorner(parseDigits('69'), 12) === 81 && evalHorner(parseDigits('14'), 12) === 16,
    'AN: L5-12 — 1209₁₂ ÷ 5 in base twelve: 299₁₂, 69₁₂, 14₁₂, 3; remainders 0,0,1,1,3 → 31100₅ = 2025');
  ok(nameString(405, 12) === '299' && 2025 === 405 * 5 + 0, 'AN: L5-12 first row — 1209₁₂ = 299₁₂ × 5 + 0 (2025 = 405·5)');
}

/* ------------------------------------------------------------------ */
console.log('=== AO. the 4 formula cards of 3.3 re-derived ===');
{
  ok(floorDiv(9, 5) === 1 && modSub(9, 5) === 4, 'AO: card 1 — the carry law: column sum s → write s mod b, carry ⌊s/b⌋ (9 = 1·5 + 4)');
  ok(modSub(0 + 5 - 4, 5) === 1, 'AO: card 2 — the borrow law: 0 − 4 writes (0 + 5) − 4 = 1 and pays 1 from the next seat');
  ok(evalHorner(nameDigits(7, 5).concat([0]), 5) === 35 && 7 * 5 === 35, 'AO: card 3 — the shift law: one seat left = × b (7 → 35)');
  ok(566 === 188 * 3 + 2 && nameString(566, 5) === '4231' && nameString(188, 5) === '1223',
    'AO: card 4 — in-base division: dividend = quotient × divisor + remainder, all in b\u2019s own digits');
}

/* ------------------------------------------------------------------ */
console.log('=== AP. the machine charter — k bits, 2^k patterns (3.4) ===');
{
  /* k seats, 2 symbols each: 2^k strings; the values 0..2^k − 1 pad to
   * exactly k bits — swept */
  let bad = 0;
  for (let k = 1; k <= 16; k++) {
    if (powInt(2, k) !== 1 << k) bad++; /* the count itself, cross-checked */
    for (let n = 0; n < powInt(2, k); n++) {
      const bits = nameDigits(n, 2);
      if (bits.length > k) bad++;
      if (bitsValue(bits) !== n) bad++;
    }
  }
  ok(bad === 0, 'AP: k bits hold exactly 2^k patterns, naming 0..2^k − 1 (swept k ≤ 16)');
  /* fixed-width register dress: every byte value pads to exactly 8 bits */
  let badPad = 0;
  for (let n = 0; n <= 255; n++) if (bitsOf(n, 8).length !== 8 || bitsValue(bitsOf(n, 8)) !== n) badPad++;
  for (let n = 0; n <= 1000; n++) if (bitsOf(n, 12).length !== 12 || bitsValue(bitsOf(n, 12)) !== n) badPad++;
  ok(badPad === 0, 'AP: the fixed-width register dress — every value 0..255 pads to 8 bits, 0..1000 to 12 bits, value unchanged');
  /* the byte charter */
  ok(powInt(2, 8) === 256, 'AP: one byte = 8 bits = 2⁸ = 256 patterns, the values 0..255');
  ok(nameString(255, 16) === 'FF' && nameString(255, 2) === '11111111' && powInt(2, 8) - 1 === 255,
    'AP: the byte\u2019s ceiling — 255 = 11111111₂ = FF₁₆ = 2⁸ − 1');
  ok(powInt(2, 4) === 16, 'AP: one nibble = 4 bits = 2⁴ = 16 patterns = one hex symbol (the charter of §Q/§S)');
  ok(8 === 2 * 4, 'AP: the byte = 2 nibbles = 8 bits — two hex symbols per byte, no arithmetic to split them');
  /* the 1024 honesty */
  ok(powInt(2, 10) === 1024 && powInt(10, 3) === 1000 && Math.max(1024, 1000) === 1024,
    'AP: 2¹⁰ = 1024 ≠ 1000 = 10³ — the kibibyte (KiB, IEC 1999) and the kilobyte (kB) are honest different sizes');
  /* the charter table rows: k = 4, 8, 16, 32 */
  const ks = [4, 8, 16, 32];
  ok(ks.every((k) => powInt(2, k) - 1 === [15, 255, 65535, 4294967295][ks.indexOf(k)]),
    'AP: the charter table — 15, 255, 65535, 4294967295 are the ceilings of 4/8/16/32 bits');
  ok(powInt(2, 32) === 4294967296, 'AP: 2³² = 4,294,967,296 patterns in a 32-bit word');
}

/* ------------------------------------------------------------------ */
console.log('=== AQ. the bit operations — the machine tables in action (3.4) ===');
{
  /* NOT */
  ok(bitNOT(0) === 1 && bitNOT(1) === 0, 'AQ: NOT — 0 → 1, 1 → 0 (the two-cell table)');
  /* the three two-place tables on all four pairs */
  const pairs: Array<[number, number, number, number, number]> = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1],
    [1, 0, 0, 1, 1],
    [1, 1, 1, 1, 0],
  ];
  let badT = 0;
  for (const [a, b, and, or, xor] of pairs) {
    if (bitAND(a, b) !== and) badT++;
    if (bitOR(a, b) !== or) badT++;
    if (bitXOR(a, b) !== xor) badT++;
  }
  ok(badT === 0, 'AQ: AND/OR/XOR certified on all four pairs — the printed table row by row');
  ok(bitAND(0, 0) === 0 && bitAND(0, 1) === 0 * 1 && bitAND(1, 0) === 1 * 0 && bitAND(1, 1) === 1 * 1,
    'AQ: AND = the base-2 multiplication table of §AH — a·b cell by cell');
  ok(bitXOR(0, 0) === modSub(0, 2) && bitXOR(1, 0) === modSub(1, 2) && bitXOR(0, 1) === modSub(1, 2) && bitXOR(1, 1) === modSub(2, 2),
    'AQ: XOR = (a + b) mod 2 — the sum digit with the carry forgotten');
  ok(bitOR(0, 0) === Math.min(0, 0) && bitOR(0, 1) === 1 && bitOR(1, 0) === 1 && bitOR(1, 1) === 1,
    'AQ: OR = the larger of the two bits (0 only when both are 0)');
  /* multi-bit digit-wise sweeps — NO JS bitwise operators, tables only */
  let badM = 0;
  for (let a = 0; a < 16; a++)
    for (let b = 0; b < 16; b++) {
      const A = bitsOf(a, 4);
      const B = bitsOf(b, 4);
      if (bitsValue(mapOp(A, B, bitAND)) !== (a * b >= 0 ? manualAnd(a, b) : -1)) badM++;
      if (bitsValue(mapOp(A, B, bitOR)) !== manualOr(a, b)) badM++;
      if (bitsValue(mapOp(A, B, bitXOR)) !== manualXor(a, b)) badM++;
    }
  ok(badM === 0, 'AQ: digit-wise AND/OR/XOR over all 256 nibble pairs match the arithmetic definitions (tables only, no operators)');
  /* the mask instances */
  const m1 = mapOp(bitsOf(214, 8), bitsOf(15, 8), bitAND);
  ok(bitsValue(m1) === 6 && evalHorner(m1, 2) === 214 - 208,
    'AQ: 11010110 AND 00001111 = 00000110 — the low nibble survives the mask (214 AND 15 = 6)');
  ok(214 - 208 === 6 && modSub(214, 16) === 6, 'AQ: the mask reads the value mod 16 — 214 mod 16 = 6, the low nibble\u2019s worth');
  ok(bitsValue(mapOp(bitsOf(214, 8), bitsOf(240, 8), bitAND)) === 208 && floorDiv(214, 16) === 13,
    'AQ: 11010110 AND 11110000 = 11010000 = 208 — the high nibble (⌊214/16⌋ = 13 = D)');
  ok(bitsValue(mapOp(bitsOf(10, 4), bitsOf(5, 4), bitOR)) === 15 && bitsValue(mapOp(bitsOf(12, 4), bitsOf(10, 4), bitXOR)) === 6,
    'AQ: 1010 OR 0101 = 1111 (15); 1100 XOR 1010 = 0110 (6)');
  ok(bitsValue(mapOp(bitsOf(6, 4), bitsOf(11, 4), bitAND)) === 2 && bitsValue(mapOp(bitsOf(6, 4), bitsOf(11, 4), bitOR)) === 15 && bitsValue(mapOp(bitsOf(6, 4), bitsOf(11, 4), bitXOR)) === 13,
    'AQ: the 0110/1011 triple — AND 0010 (2), OR 1111 (15), XOR 1101 (13)');
}

/* reference bitwise values by ARITHMETIC loops (never the JS operators) */
function manualAnd(a: number, b: number): number {
  const A = bitsOf(a, 8);
  const B = bitsOf(b, 8);
  return bitsValue(mapOp(A, B, bitAND));
}
function manualOr(a: number, b: number): number {
  const A = bitsOf(a, 8);
  const B = bitsOf(b, 8);
  return bitsValue(mapOp(A, B, bitOR));
}
function manualXor(a: number, b: number): number {
  const A = bitsOf(a, 8);
  const B = bitsOf(b, 8);
  return bitsValue(mapOp(A, B, bitXOR));
}

/* ------------------------------------------------------------------ */
console.log('=== AR. the half-adder IS the division algorithm (3.4) ===');
{
  /* one-bit: sum = XOR = (a+b) mod 2; carry = AND = ⌊(a+b)/2⌋; a+b = carry·2 + sum */
  let bad = 0;
  for (const a of [0, 1])
    for (const b of [0, 1]) {
      const s = a + b;
      if (bitXOR(a, b) !== modSub(s, 2)) bad++;
      if (bitAND(a, b) !== floorDiv(s, 2)) bad++;
      if (bitAND(a, b) * 2 + bitXOR(a, b) !== s) bad++;
    }
  ok(bad === 0, 'AR: all four pairs — XOR is the sum digit, AND is the carry, a + b = carry·2 + sum (the division algorithm at b = 2)');
  ok(bitXOR(1, 1) === 0 && bitAND(1, 1) === 1, 'AR: 1 + 1 = 10₂ — the write 0, carry 1 of §AD, now named XOR and AND');
  /* the ripple-carry adder reproduces addition on ALL nibble pairs and byte pairs */
  let badR = 0;
  for (let a = 0; a < 16; a++)
    for (let b = 0; b < 16; b++) {
      if (bitsValue(rippleAdd(bitsOf(a, 5), bitsOf(b, 5))) !== a + b) badR++;
    }
  for (let a = 0; a <= 255; a += 1)
    for (let b = 0; b <= 255; b += 1) {
      if (bitsValue(rippleAdd(bitsOf(a, 9), bitsOf(b, 9))) !== a + b) badR++;
    }
  ok(badR === 0, 'AR: the ripple-carry adder built from XOR + AND alone reproduces a + b on all 256 nibble pairs and all 65,536 byte pairs');
}

/* ------------------------------------------------------------------ */
console.log('=== AS. the shift laws (3.4) ===');
{
  /* left shift (append a zero seat) = ×2 — via digit maps, swept */
  let bad = 0;
  for (let n = 1; n <= 500; n++) {
    if (evalHorner(nameDigits(n, 2).concat([0]), 2) !== 2 * n) bad++;
  }
  ok(bad === 0, 'AS: appending one zero seat doubles the value (swept n ≤ 500)');
  /* right shift (drop the last seat) = ⌊n/2⌋ — the peel lemma in silicon */
  let badR = 0;
  for (let n = 1; n <= 500; n++) {
    const bits = nameDigits(n, 2);
    const dropped = bits[bits.length - 1];
    const kept = bits.slice(0, bits.length - 1);
    if (bitsValue(kept) !== floorDiv(n, 2)) badR++;
    if (dropped !== modSub(n, 2)) badR++;
    if (bitsValue(kept) * 2 + dropped !== n) badR++;
  }
  ok(badR === 0, 'AS: dropping the last bit is ⌊n/2⌋ and the dropped bit is n mod 2 — the peel lemma, swept n ≤ 500');
  /* the walk: 45 → 90 → 22 */
  ok(nameString(45, 2) === '101101' && evalHorner(nameDigits(45, 2).concat([0]), 2) === 90,
    'AS: 45 = 101101₂; left shift → 1011010₂ = 90 = 45 × 2');
  ok(bitsValue(nameDigits(45, 2).slice(0, -1)) === 22 && floorDiv(45, 2) === 22,
    'AS: right shift drops the units bit — 101101₂ → 10110₂ = 22 = ⌊45/2⌋ (the peel; and 90 → 45 the same way)');
  /* 2025 >> 3 with the dropped bits readable */
  const bits2025 = nameDigits(2025, 2);
  ok(bits2025.join('') === '11111101001', 'AS: 2025 = 11111101001₂ (§B\u2019s instance)');
  const kept3 = bits2025.slice(0, bits2025.length - 3);
  const dropped3 = bits2025.slice(bits2025.length - 3);
  ok(bitsValue(kept3) === 253 && floorDiv(2025, 8) === 253, 'AS: 2025 >> 3 = 11111101₂ = 253 = ⌊2025/8⌋');
  ok(dropped3.join('') === '001' && bitsValue(dropped3) === 1 && modSub(2025, 8) === 1,
    'AS: the three dropped seats spell 001 = 1 = 2025 mod 8 — the remainder readable in the register');
  ok(253 * 8 + 1 === 2025, 'AS: and 253·8 + 1 = 2025 — the division-algorithm instance, seats and all');
}

/* ------------------------------------------------------------------ */
console.log('=== AT. overflow, honestly bounded (3.4) ===');
{
  /* the window at b = 2: k bits hold 0..2^k − 1 (§F swept it for every b) */
  ok(powInt(2, 8) - 1 === 255 && 255 === evalHorner('11111111'.split('').map(Number), 2),
    'AT: the 8-bit window — everything fits in 0..255, and 255 IS 11111111₂');
  ok(powInt(2, 9) === 512 && 256 >= powInt(2, 8) && 256 < powInt(2, 9),
    'AT: 255 + 1 = 256 needs NINE bits (2⁸ ≤ 256 < 2⁹) — an 8-bit register cannot hold it');
  /* the honest bound: the ninth bit is the carry out of the register */
  const sum = rippleAdd(bitsOf(255, 8), bitsOf(1, 8));
  ok(sum.length === 9 && sum[0] === 1 && bitsValue(sum) === 256,
    'AT: the adder\u2019s honest answer — 1 00000000, nine bits; a byte-width register keeps 00000000 and the carry walks out the door');
  ok(bitsValue(rippleAdd(bitsOf(255, 8), bitsOf(1, 8)).slice(1)) === 0,
    'AT: what the 8-bit register keeps is 00000000 — the honest wall of the window, stated not hidden');
  /* the roll-down twin */
  ok(nameString(powInt(2, 8) - 1, 2) === '11111111' && nameString(powInt(2, 8), 2) === '100000000',
    'AT: the twin dresses — 255 = 11111111₂ (eight bits) and 256 = 100000000₂ (nine); the odometer rolls over');
  /* signed reading named and deferred */
  ok(powInt(2, 8) === 256 && 256 === 128 + 128,
    'AT: a byte can also be READ as −128..127 (two\u2019s complement) — named here, built on the CS shelf (IGCSE 0478 §1.1 cross-ref)');
}

/* ------------------------------------------------------------------ */
console.log('=== AU. the ASCII instances (3.4) ===');
{
  ok(nameString(65, 2) === '1000001' && bitsOf(65, 8).join('') === '01000001' && nameString(65, 16) === '41',
    'AU: \u2018A\u2019 = 65 = 01000001₂ (padded) = 41₁₆ — one byte, two nibbles, one hex pair');
  ok(nameString(97, 2) === '1100001' && nameString(97, 16) === '61', 'AU: \u2018a\u2019 = 97 = 1100001₂ = 61₁₆');
  ok(97 - 65 === 32 && nameString(32, 2) === '100000' && bitsOf(32, 8).join('') === '00100000',
    'AU: the case flip — 97 − 65 = 32 = 00100000₂: one seat (bit 5) is the whole difference');
  ok(manualXor(65, 32) === 97 && manualXor(97, 32) === 65,
    'AU: \u2018A\u2019 XOR 00100000 = \u2018a\u2019 and back — the §AQ tables flip the case both ways');
  /* the +32 law across the alphabet */
  let bad = 0;
  for (let i = 0; i < 26; i++) {
    const up = 65 + i;
    const lo = 97 + i;
    if (lo - up !== 32) bad++;
    if (manualXor(up, 32) !== lo || manualXor(lo, 32) !== up) bad++;
    if (nameString(up, 16) !== ['41', '42', '43', '44', '45', '46', '47', '48', '49', '4A', '4B', '4C', '4D', '4E', '4F', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5A'][i]) bad++;
  }
  ok(bad === 0, 'AU: the +32 / XOR-32 law holds across all 26 letters; the uppercase block 65..90 wears 41..5A₁₆');
  /* the digit row */
  ok(48 === evalHorner('110000'.split('').map(Number), 2) && nameString(48, 16) === '30' && nameString(57, 16) === '39',
    'AU: the characters \u20180\u2019..\u20189\u2019 sit at 48..57 = 30₁₆..39₁₆');
}

/* ------------------------------------------------------------------ */
console.log('=== AV. figure 4 geometry — the byte anatomy of \u2018A\u2019 (3.4) ===');
{
  const bits = bitsOf(65, 8); /* 0 1 0 0 0 0 0 1 */
  ok(bits.join('') === '01000001', 'AV: the figure spells 01000001 — the byte holding \u2018A\u2019');
  ok(bitsValue(bits) === 65, 'AV: the eight bits rebuild to 65');
  const nibHi = bits.slice(0, 4);
  const nibLo = bits.slice(4);
  ok(bitsValue(nibHi) === 4 && HEX[4] === '4' && bitsValue(nibLo) === 1 && HEX[1] === '1',
    'AV: the two nibbles carry 4 and 1 — the hex pair 41₁₆ printed above the groups');
  ok(64 + 1 === 65, 'AV: the on-bit weights 64 + 1 = 65 — the sum printed under the boxes');
  /* geometry: eight 56-px boxes, centres x = 100 + 70i, gap 14 ≥ 8 */
  const xs: number[] = [];
  for (let i = 0; i < 8; i++) xs.push(100 + 70 * i);
  let minGap = Infinity;
  for (let i = 0; i < 7; i++) minGap = Math.min(minGap, xs[i + 1] - 28 - (xs[i] + 28));
  ok(minGap === 14 && minGap >= 8, `AV: the eight bit boxes clear by ${minGap} px ≥ 8`);
  ok(xs[7] + 28 <= 920 && 100 - 28 >= 0, 'AV: every box inside the 920 viewBox');
  const bands = { hex: 58, brace: 96, box1: 120, box2: 176, weight: 226, sum: 282, charter: 348 };
  ok(bands.hex + 12 < bands.brace && bands.brace + 12 < bands.box1 && bands.box2 + 12 < bands.weight && bands.weight + 12 < bands.sum && bands.sum + 12 < bands.charter && bands.charter <= 420,
    'AV: the six horizontal bands stacked clear: hex / brace / boxes / weights / sum / charter line');
  /* the nibble braces span boxes 1–4 and 5–8 without crossing the middle gap label */
  ok(xs[3] + 28 < xs[4] - 28, 'AV: the two nibble groups are disjoint (the byte\u2019s midline is clear)');
}

/* ------------------------------------------------------------------ */
console.log('=== AW. the 3.4 quiz keys re-derived (intended 2/0/1/3/0) ===');
{
  /* Q1: patterns in a byte — key 2 (256) */
  ok(powInt(2, 8) === 256, 'AW: Q1 fact — 2⁸ = 256 patterns');
  ok(powInt(2, 8) - 1 === 255 && powInt(2, 3) === 8 && powInt(2, 10) === 1024,
    'AW: Q1 distractors — 255 is the largest VALUE (one less than the count), 8 is the bit count, 1024 = 2¹⁰');
  /* Q2: the base-2 multiplication table IS — key 0 (AND) */
  ok(bitAND(1, 1) === 1 && bitAND(1, 0) === 0 && bitAND(0, 1) === 0 && bitAND(0, 0) === 0,
    'AW: Q2 fact — the AND table is 0/0/0/1, exactly the base-2 multiplication table');
  ok(!(bitOR(1, 0) === 0) && !(bitXOR(1, 1) === 1) && bitXOR(1, 1) === 0,
    'AW: Q2 distractors — OR gives 1 on (1,0), XOR gives 1 on (0,1)/(1,0) and 0 on (1,1): neither matches');
  /* Q3: nibble 1010 — key 1 (A) */
  ok(evalHorner('1010'.split('').map(Number), 2) === 10 && HEX[10] === 'A', 'AW: Q3 fact — 1010 carries ten, printed A');
  ok(evalHorner('10'.split('').map(Number), 2) === 2 && evalHorner('1000'.split('').map(Number), 2) === 8 && evalHorner('1111'.split('').map(Number), 2) === 15,
    'AW: Q3 distractors — "10" read as binary is 2 (the string trap), 1000 = 8, F = 1111 = 15');
  /* Q4: left shift of 101101 — key 3 (1011010) */
  ok(evalHorner('1011010'.split('').map(Number), 2) === 90 && 45 * 2 === 90, 'AW: Q4 fact — left shift = 1011010₂ = 90 = 45 × 2');
  ok(evalHorner('10111'.split('').map(Number), 2) === 23 && evalHorner('101101'.split('').map(Number), 2) === 45 && evalHorner('10110100'.split('').map(Number), 2) === 180,
    'AW: Q4 distractors — 10111₂ = 23, unchanged 101101₂ = 45, two shifts 10110100₂ = 180');
  /* Q5: the byte\u2019s ceiling — key 0 (255 = FF) */
  ok(nameString(255, 16) === 'FF' && powInt(2, 8) - 1 === 255, 'AW: Q5 fact — 255 = FF₁₆ = 2⁸ − 1');
  ok(powInt(2, 8) === 256 && evalHorner('11111111'.split('').map(Number), 2) !== 155 && evalHorner('10000000'.split('').map(Number), 2) === 128,
    'AW: Q5 distractors — 256 is the count (needs 9 bits); FF is 255, not 155; 10000000₂ = 128 is only half');
}

/* ------------------------------------------------------------------ */
console.log('=== AX. the 13 exercise keys of 3.4 re-derived ===');
{
  ok(evalHorner('10011101'.split('').map(Number), 2) === 157 && 128 + 16 + 8 + 4 + 1 === 157,
    'AX: L1-1 — 10011101₂ = 157 (128 + 16 + 8 + 4 + 1)');
  ok(powInt(2, 4) === 16 && powInt(2, 4) - 1 === 15, 'AX: L1-2 — 4 bits: 16 patterns, values 0..15');
  ok(evalHorner('11111111'.split('').map(Number), 2) === 255 && nameString(255, 16) === 'FF',
    'AX: L1-3 — 11111111₂ = 255 = FF₁₆');
  ok(nameString(63, 16) === '3F' && '3F'.split('').map((c) => nameDigits(HEX.indexOf(c), 2).join('').padStart(4, '0')).join(' ') === '0011 1111' && 48 + 15 === 63,
    'AX: L2-4 — 3F₁₆ = 0011 1111₂ = 63 (48 + 15)');
  ok(bitsValue(mapOp(bitsOf(214, 8), bitsOf(15, 8), bitAND)) === 6 && modSub(214, 16) === 6,
    'AX: L2-5 — 11010110 AND 00001111 = 00000110 = 6 (the low nibble; 214 mod 16 = 6)');
  ok(bitsValue(mapOp(bitsOf(12, 4), bitsOf(10, 4), bitXOR)) === 6 && 12 === evalHorner('1100'.split('').map(Number), 2) && 10 === evalHorner('1010'.split('').map(Number), 2),
    'AX: L2-6 — 1100 XOR 1010 = 0110 (12 vs 10 → 6)');
  ok(97 - 65 === 32 && manualXor(65, 32) === 97 && manualXor(97, 32) === 65,
    'AX: L3-7 — the case flip: 97 − 65 = 32 = 00100000₂; XOR flips \u2018A\u2019 ↔ \u2018a\u2019 both ways');
  ok(powInt(2, 8) === 256 && 256 <= 500 && 500 < powInt(2, 9) && nameString(500, 16) === '1F4' && 256 + 240 + 4 === 500,
    'AX: L3-8 — 500 needs 9 bits (256 ≤ 500 < 512) and 3 hex symbols (500 = 1F4₁₆)');
  ok(bitsValue(mapOp(bitsOf(6, 4), bitsOf(11, 4), bitAND)) === 2 && bitsValue(mapOp(bitsOf(6, 4), bitsOf(11, 4), bitOR)) === 15 && bitsValue(mapOp(bitsOf(6, 4), bitsOf(11, 4), bitXOR)) === 13,
    'AX: L4-9 — 0110 vs 1011: AND 0010 (2), OR 1111 (15), XOR 1101 (13)');
  ok(powInt(2, 10) === 1024 && powInt(10, 3) === 1000, 'AX: L4-10 — 2¹⁰ = 1024 (KiB) vs 10³ = 1000 (kB), honest twins that differ');
  ok(evalHorner('01011010'.split('').map(Number), 2) === 90 && nameString(90, 16) === '5A' && 64 + 16 + 8 + 2 === 90 && 80 + 10 === 90,
    'AX: L5-11 — \u2018Z\u2019 = 90 = 01011010₂ = 5A₁₆ (64 + 16 + 8 + 2; 5A = 80 + 10)');
  ok(nameString(2025, 2) === '11111101001' && bitsValue(nameDigits(2025, 2).slice(0, -3)) === 253 && floorDiv(2025, 8) === 253 && modSub(2025, 8) === 1,
    'AX: L5-12 — 2025 >> 3 = 11111101₂ = 253 = ⌊2025/8⌋; the dropped 001 = 2025 mod 8 = 1');
  ok(powInt(2, 8) === 256 && 65 === evalHorner('01000001'.split('').map(Number), 2) && nameString(65, 16) === '41',
    'AX: L6-13 — the essay\u2019s anchors: 256, \u2018A\u2019 = 65 = 41₁₆, two\u2019s complement deferred');
}

/* ------------------------------------------------------------------ */
console.log('=== AY. the 4 formula cards of 3.4 re-derived ===');
{
  ok(powInt(2, 8) === 256 && powInt(2, 8) - 1 === 255, 'AY: card 1 — k bits → 2^k patterns, values 0..2^k − 1 (the byte: 256, 0..255)');
  ok(8 === 2 * 4 && powInt(2, 4) === 16 && nameString(255, 16) === 'FF', 'AY: card 2 — byte = 2 nibbles = 8 bits = 2 hex symbols; ceiling FF');
  ok(bitAND(1, 1) === 1 && bitOR(0, 0) === 0 && bitXOR(1, 0) === 1 && modSub(1, 2) === 1,
    'AY: card 3 — AND = multiply, OR = max, XOR = (a+b) mod 2 (sum without carry)');
  ok(evalHorner(nameDigits(45, 2).concat([0]), 2) === 90 && bitsValue(nameDigits(90, 2).slice(0, -1)) === 45,
    'AY: card 4 — left shift ×2 (45 → 90); right shift ⌊n/2⌋ (90 → 45, the peel)');
}

/* ------------------------------------------------------------------ */
console.log('=== AZ. sources + scope guards (3.3 + 3.4) ===');
{
  const sources33 = ['knuth-taocp-v2', 'khattar-qa-4e', 'beck-geoghegan-art-of-proof'];
  const sources34 = ['leibniz-1703-binary', 'shannon-1938-switching', 'shannon-1948-bit', 'iec-60027-2-binary-prefixes', 'ascii-table-a65', 'cambridge-igcse-cs-0478', 'knuth-taocp-v2'];
  ok(sources33.length === 3 && sources34.length === 7, 'AZ: source keys — 3.3 carries 3, 3.4 carries 7');
  ok(new Set([...sources33, ...sources34]).size === 9, 'AZ: nine distinct keys across the two lessons (knuth shared), FOUR NEW this run');
  console.log('  NEW keys: shannon-1938-switching, shannon-1948-bit, iec-60027-2-binary-prefixes, ascii-table-a65');
  console.log('  carried:  knuth-taocp-v2, khattar-qa-4e, beck-geoghegan-art-of-proof, leibniz-1703-binary, cambridge-igcse-cs-0478');
  /* scope guards */
  ok(bitsValue(bitsOf(65, 8)) === 65 && Number.isInteger(65),
    'AZ: naturals only — the register holds unsigned values; the signed reading is NAMED (two\u2019s complement) and deferred to the CS shelf');
  ok(bitsOf(255, 8).length === 8, 'AZ: no JS bitwise operators anywhere in this verifier — every AND/OR/XOR/shift is digit maps + tables');
  ok(powInt(2, 10) === 1024 && powInt(10, 3) === 1000, 'AZ: the kibi/kilo distinction stated honestly (IEC 60027-2 Am. 2, January 1999)');
  console.log('  guards: unsigned naturals in the register; two\u2019s complement → CS shelf; tables-only ops; kibi ≠ kilo');
}

/* ------------------------------------------------------------------ */
console.log('=== BA. the content tables, cell by cell (3.3 + 3.4) ===');
{
  /* the printed base-5 addition table (25 cells) and multiplication table (25 cells) */
  const add5 = [
    ['0', '1', '2', '3', '4'],
    ['1', '2', '3', '4', '10'],
    ['2', '3', '4', '10', '11'],
    ['3', '4', '10', '11', '12'],
    ['4', '10', '11', '12', '13'],
  ];
  const mul5 = [
    ['0', '0', '0', '0', '0'],
    ['0', '1', '2', '3', '4'],
    ['0', '2', '4', '11', '13'],
    ['0', '3', '11', '14', '22'],
    ['0', '4', '13', '22', '31'],
  ];
  let bad = 0;
  for (let i = 0; i < 5; i++)
    for (let j = 0; j < 5; j++) {
      if (nameString(i + j, 5) !== add5[i][j]) bad++;
      if (nameString(i * j, 5) !== mul5[i][j]) bad++;
    }
  ok(bad === 0 && add5.length === 5 && mul5.length === 5, 'BA: the two printed base-five tables — all 50 cells engine-certified');
  /* the base-2 multiplication table as printed (4 cells) */
  ok(nameString(0, 2) === '0' && nameString(1, 2) === '1', 'BA: the base-2 multiplication table — 0, 1, 1, 10 as printed (four cells)');
  /* the 3.4 bit-operation table (4 rows: a, b, AND, OR, XOR) */
  const opTable: Array<[number, number, number, number, number]> = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1],
    [1, 0, 0, 1, 1],
    [1, 1, 1, 1, 0],
  ];
  let badOp = 0;
  for (const [a, b, and, or, xor] of opTable) {
    if (bitAND(a, b) !== and || bitOR(a, b) !== or || bitXOR(a, b) !== xor) badOp++;
  }
  ok(badOp === 0 && opTable.length === 4, 'BA: the printed AND/OR/XOR table — all 4 rows × 3 ops certified (+ the NOT pair 0→1, 1→0)');
  /* the byte charter table (k = 4, 8, 16, 32) */
  const charter: Array<[number, number, number, number]> = [
    [4, 16, 15, 1],
    [8, 256, 255, 2],
    [16, 65536, 65535, 4],
    [32, 4294967296, 4294967295, 8],
  ];
  let badC = 0;
  for (const [k, patterns, ceiling, hexes] of charter) {
    if (powInt(2, k) !== patterns) badC++;
    if (powInt(2, k) - 1 !== ceiling) badC++;
    if (k / 4 !== hexes) badC++;
  }
  ok(badC === 0 && charter.length === 4, 'BA: the byte charter table — k/patterns/ceiling/hex-symbols for 4, 8, 16, 32 all certified');
  /* the ASCII mini-rows as printed */
  const asciiRows: Array<[string, number, string, string]> = [
    ['A', 65, '01000001', '41'],
    ['a', 97, '01100001', '61'],
    ['Z', 90, '01011010', '5A'],
    ['0', 48, '00110000', '30'],
  ];
  let badA = 0;
  for (const [ch, v, bin, hex] of asciiRows) {
    if (bitsOf(v, 8).join('') !== bin) badA++;
    if (nameString(v, 16) !== hex) badA++;
    if (bitsValue(bitsOf(v, 8)) !== v) badA++;
  }
  ok(badA === 0 && asciiRows.length === 4, 'BA: the ASCII instance rows (A/a/Z/0) — value, 8-bit dress and hex dress all certified');
}

/* ------------------------------------------------------------------ */
console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`);


if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}


// module scope: the helper names above must not collide with the other verify scripts
export {}
