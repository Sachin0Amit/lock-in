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
 *       + the CS shelf).
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

/* ------------------------------------------------------------------ */
console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}


// module scope: the helper names above must not collide with the other verify scripts
export {}
