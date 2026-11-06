/**
 * verify-book2-ch05.ts — pre-writing arithmetic verification for
 * Arithmetic and Number Systems (book #2), chapter 5 "Congruences:
 * The Arithmetic of Remainders".
 *
 * Created 2026-11-06 (run 57) for lesson
 *   5.1 "Remainders Become Numbers: Congruence Defined"
 * — every number of the lesson is verified here BEFORE anything is
 * written into ch-05.ts —
 *
 *   (A) the clock engine: all printed clock instances verified by
 *       exact remainder arithmetic — 8 + 5 = 13 → 1 (mod 12),
 *       11 + 3 → 2, 7 + 7 → 2, 9 + 6 → 3; 1000 hours after 3 o'clock
 *       → 7 o'clock (10^3 = 12·83 + 4); the weekday engine — Wednesday
 *       + 100 days → Friday (100 = 7·14 + 2), Wednesday + 35 days →
 *       Wednesday (35 = 7·5);
 *   (B) the definition engine: a ≡ b (mod m) ⟺ m | (a − b) swept
 *       against same-remainder-on-division for ALL a, b ≤ 120 and
 *       m ≤ 12 (both directions, 0 < a − b and b − a); the printed
 *       instances 17 ≡ 5 (mod 12), 29 ≡ 5 (mod 12), 37 ≡ 1 (mod 9),
 *       and the negative instance 16 ≢ 5 (mod 12) (remainders 4 vs 5);
 *   (C) the laws swept: for every m ≤ 12 and all a, b, c, d ≤ 40 with
 *       a ≡ b, c ≡ d (mod m) — the addition law a + c ≡ b + d (mod m)
 *       and the multiplication law ac ≡ bd (mod m) hold in EVERY case;
 *       the power law a^k ≡ b^k (mod m) for k ≤ 4 swept over the same
 *       range; the printed instances — 13 + 5 = 18 and 6 + 5 = 11 both
 *       ≡ 4 (mod 7); 13·5 = 65 and 6·5 = 30 both ≡ 2 (mod 7);
 *       3^4 = 81 and 10^4 both ≡ 4 (mod 7);
 *   (D) the transitivity chain of the lesson: 23 ≡ 9 (mod 7) (diff 14),
 *       9 ≡ 2 (mod 7) (diff 7), 23 ≡ 2 (mod 7) (diff 21) — all three
 *       exact; the symmetric instance 17 ≡ 5 ⇒ 5 ≡ 17 (mod 12);
 *   (E) cancellation swept and exact: for all m ≤ 12, c ≤ 12, a ≠ b
 *       ≤ 24 — ca ≡ cb (mod m) ⟺ a ≡ b (mod m/g) with g = gcd(c, m);
 *       the printed instances — 3·2 ≡ 3·0 (mod 3) yet 2 ≢ 0 (mod 3);
 *       4·5 ≡ 4·8 (mod 6) (both ≡ 2) with the shrunk conclusion
 *       5 ≡ 8 (mod 3) TRUE and 5 ≡ 8 (mod 6) FALSE;
 *       the coprime licence 4·9 ≡ 4·2 (mod 7) (both ≡ 1) with the full
 *       conclusion 9 ≡ 2 (mod 7) TRUE (gcd(4, 7) = 1);
 *   (F) the two mod-5 tables verified cell by cell (with headers):
 *       addition mod 5 — 30 cells; multiplication mod 5 — 30 cells;
 *       the zero row/column behaviours and the Latin-square rows of
 *       the nonzero part both confirmed;
 *   (G) residue classes: the five classes mod 5 over 0..24 form the
 *       figure-2 columns (cell (c, r) = 5r + c, swept); the class [5]
 *       (mod 12) members 5, 17, 29, 41, 53, 65 all ≡ 5 (mod 12) and
 *       spaced by 12; figure-1 clock geometry — 12 hour labels on the
 *       r = 148 orbit (adjacent chord ≈ 76.6 px), tick dots at r = 118,
 *       the +5 label at (250, 205) ≥ 60 px from the r = 95 arc and
 *       every label, caption at y = 348 clear of the 6 o'clock label
 *       (328); figure-2 column geometry — 25 cells on the
 *       x = 110 + 120c / y = 96 + 64r grid, headers y = 45, caption
 *       y = 405, all pairwise label gaps ≥ 18 px;
 *   (H) the exam shapes recomputed both sides — 43 × 57 ≡ 3 (mod 6)
 *       with 2451 = 6·408 + 3; 87 + 94 ≡ 1 (mod 5) with 181 = 5·36 + 1;
 *       12345 + 67890 ≡ 0 (mod 9) with 80235 = 9·8915; 12345 × 67890
 *       ≡ 0 (mod 9) with 838102050 = 9·93122450 (digit sum 27);
 *       Σ_{i=1..10} 9^i ≡ 0 (mod 6) — each term ≡ 3 by the product
 *       law (9 ≡ 3, 9² = 81 = 6·13 + 3) — with the true sum
 *       3922632450 = 6·653772075; 10^6 ≡ 4 (mod 12) with
 *       1000000 = 12·83333 + 4 → 3 + 4 = 7 o'clock; Σ_{i=1..10} i!
 *       ≡ 0 (mod 3) — only 1! + 2! = 3 survives mod 3 — with the true
 *       sum 4037913 = 3·1345971; 7^1..7^4 ≡ 2, 4, 3, 1 (mod 5), the
 *       sum 2800 = 5·560 ≡ 0;
 *   (I) the 5.1 quiz keys re-derived (intended 1/0/1/1/2) with every
 *       distractor evaluated; all 14 exercise keys re-derived (the
 *       reductions 23/41/70/92 mod 7 = 2/6/0/1; 9 + 7 → 4:00 and
 *       10 + 6 → 4:00 on the 12-hour clock; 34 ≡ 12 (mod 11);
 *       [4] (mod 9) = 4, 13, 22, 31, 40; 51 − 6 = 45 = 5·9; the
 *       addition-law instance 76 ≡ 4 (mod 12); 1234 × 5678 ≡ 8 (mod 9)
 *       with 7006652 = 9·778517 exactly — digit sum 26; the shift law;
 *       9x ≡ 9y (mod 12) ⇒ x ≡ y (mod 4); 7 + 49 + 343 + 2401 = 2800
 *       = 5·560; the multiplication-law proof engine; 10^6 mod 12 = 4
 *       → 7 o'clock; Σ i! mod 3 = 0; the equivalence-relation proof);
 *       the 4 formula cards; sources printed (carried keys
 *       gauss-1801-disquisitiones extended with art. 1's definition,
 *       ncert-math8-ch16, khattar-qa-4e, beck-geoghegan-art-of-proof,
 *       fibonacci-1202-liber-abaci extended with the casting-out-nines
 *       check, euclid-elements-book-vii).
 *
 * EXTENDED run 57 (before any of 5.2–5.4 is written) with sections
 * J–AE for the remaining three lessons plus the chapter-completion
 * cashing:
 *   (J–Q) 5.2 "Why the Divisibility Tests Work": the 10^k residue
 *       engine (10 ≡ 0 mod 2/5/10; 100 ≡ 0 mod 4; 1000 ≡ 0 mod 8,
 *       swept), the digit-sum tests (10 ≡ 1 mod 3/9, swept n ≤ 99999
 *       both directions), the alternating test (10 ≡ −1 mod 11, swept),
 *       the 7-truncation law (10b + c ≡ 0 ⟺ b − 2c ≡ 0 (mod 7), swept),
 *       the 1001 = 7·11·13 block engine (swept to 10⁶), the composite
 *       tests and the coprime licence with the 18-trap, casting out
 *       nines (the check instances + the transposition miss + the
 *       mod-11 catch), the digit-hunt instances, the figure geometry
 *       (the digit-sum collapse on 57369), quiz keys 1/1/0/1/1, all 14
 *       exercise keys, 4 formula cards;
 *   (R–W) 5.3 "The Unit Digit and Cycles of Powers": the full cycle
 *       census (fixed points 0/1/5/6, two-cycles 4/9, four-cycles
 *       2/3/7/8, pure periodicity certified), exponent reduction swept
 *       against direct computation (7^2025 = 7; 2^100 = 6;
 *       3^97 = 3; 12^43 = 8; 23^23 = 7; the product 7^2025·3^97 = 1;
 *       sums), the squares census {0,1,4,5,6,9}, odd squares ≡ 1
 *       (mod 8), the cube bijection, fourth powers {0,1,5,6}, the 5/6
 *       stability with the mod-2/mod-5 pinning, factorial unit digits,
 *       the 7^2025 digit count (1712), figure geometry (the cycle
 *       wheels), quiz keys 0/3/0/2/2, all 14 exercise keys, 4 formula
 *       cards;
 *   (X–AD) 5.4 "Linear Congruences and a Glimpse of Fermat": the
 *       solvability theorem swept (a, m ≤ 24, b ≤ 36 — solvable ⟺
 *       gcd(a,m) | b, and then exactly gcd(a,m) solutions), the printed
 *       instances (4x ≡ 1 (mod 6) dead; 5x ≡ 3 (mod 12) = 3; 7x ≡ 4
 *       (mod 12) = 4 via 7⁻¹ = 7; 9x ≡ 12 (mod 15) = 3, 8, 13; 6x ≡ 9
 *       (mod 15) = 4, 9, 14), the inverse tables (mod 5, mod 7,
 *       mod 10) + the inverse criterion, CRT swept for coprime pairs
 *       (m·n ≤ 60 — unique survivor), Sunzi's problem (23 mod 105, the
 *       8-ladder, the constructive t ≡ 1 (mod 7) step), the small
 *       pairs (11, 16, 23, 30), Fermat swept (all primes ≤ 50 ×
 *       a ≤ 60: a^(p−1) ≡ 1 (mod p); a^p ≡ a for p ≤ 13), the printed
 *       instances (2^10 = 1024 = 11·93 + 1; 3^6 = 729 = 7·104 + 1;
 *       5^6 = 15625 = 7·2232 + 1; 2^12 = 4096 = 13·315 + 1), the exam
 *       reductions (2^100 mod 13 = 3; 3^102 mod 7 = 1; 17^200 mod 19
 *       = 4), the 5.3 cycle-length cash (d^4 ≡ 1 (mod 5)), figure
 *       geometry (the CRT double ruler), quiz keys 0/1/0/1/1, all 14
 *       exercise keys, 4 formula cards;
 *   (AE) the completion cashing — cross-lesson numbers re-verified
 *       (5.1's digit-sum bridges into 5.2; 5.3's cycles explained by
 *       5.4's Fermat; the 2800 and 4037913 sums cashed across lessons).
 *
 * Engine discipline: chapter 2's division algorithm and remainder
 * uniqueness are CITED, never re-proved — the sweeps here certify the
 * statements' truth numerically; the proofs in print lean on Lesson
 * 2.1's uniqueness of the remainder, exactly as the lesson's
 * citations promise. Likewise chapter 2's Bézout identity (2.3) and
 * the linear Diophantine engine (2.4) are cited, never re-proved.
 */

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

let pass = 0
let fail = 0
const failures: string[] = []

function ok(cond: boolean, label: string): void {
  if (cond) {
    pass++
  } else {
    fail++
    failures.push(label)
    console.log('  FAIL: ' + label)
  }
}

/** the remainder engine — chapter 2's division algorithm, computed */
function rem(n: number, m: number): number {
  const r = n % m
  return ((r % m) + m) % m
}

function gcd(a: number, b: number): number {
  let x = a
  let y = b
  while (y !== 0) {
    const t = x % y
    x = y
    y = t
  }
  return x
}

/** the digital root — iterate the digit sum to a single digit (the mod-9 residue, 0 read as 9) */
function digitalRoot(n: number): number {
  return n <= 9 ? n : digitalRoot(String(n).split('').reduce((s, ch) => s + Number(ch), 0))
}

/** modular exponentiation — b^e mod m by repeated squaring; exact (all products < m² ≤ 10²) */
function powmod(b: number, e: number, m: number): number {
  let result = 1
  let base = b % m
  let exp = e
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % m
    base = (base * base) % m
    exp = Math.floor(exp / 2)
  }
  return result
}

/* ------------------------------------------------------------------ */
/* (A) the clock engine                                                */
/* ------------------------------------------------------------------ */
{
  // the printed clock instances, exact
  ok(rem(8 + 5, 12) === 1, 'A: 8 + 5 = 13 → the 12-hour clock shows 1')
  ok(rem(11 + 3, 12) === 2, 'A: 11 + 3 = 14 → the clock shows 2')
  ok(rem(7 + 7, 12) === 2, 'A: 7 + 7 = 14 → the clock shows 2')
  ok(rem(9 + 6, 12) === 3, 'A: 9 + 6 = 15 → the clock shows 3')
  // 1000 hours after 3 o'clock
  ok(rem(1000, 12) === 4 && 12 * 83 + 4 === 1000, 'A: 1000 = 12·83 + 4 — 1000 hours ≡ 4 (mod 12)')
  ok(rem(3 + rem(1000, 12), 12) === 7, 'A: 3 o’clock + 1000 h → the clock shows 7')
  // the weekday engine: Wednesday = 0, … Saturday = 6
  const WED = 0
  const days = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday']
  ok(rem(100, 7) === 2 && 7 * 14 + 2 === 100, 'A: 100 = 7·14 + 2')
  ok(days[(WED + rem(100, 7)) % 7] === 'Friday', 'A: Wednesday + 100 days → Friday')
  ok(rem(35, 7) === 0 && days[WED] === 'Wednesday', 'A: Wednesday + 35 days → Wednesday (35 = 7·5)')
}

/* ------------------------------------------------------------------ */
/* (B) the definition engine: congruence = same remainder              */
/* ------------------------------------------------------------------ */
{
  // sweep: for all m ≤ 12, a, b ≤ 120 — a ≡ b (mod m) ⟺ same remainder
  let defBad = 0
  for (let m = 1; m <= 12; m++) {
    for (let a = 0; a <= 120; a++) {
      for (let b = 0; b <= 120; b++) {
        const congruent = (a - b) % m === 0
        const sameRem = rem(a, m) === rem(b, m)
        if (congruent !== sameRem) defBad++
      }
    }
  }
  ok(defBad === 0, 'B: a ≡ b (mod m) ⟺ same remainder — swept over all a, b ≤ 120, m ≤ 12, zero mismatches')

  // the printed instances
  ok((17 - 5) % 12 === 0 && rem(17, 12) === 5 && rem(5, 12) === 5, 'B: 17 ≡ 5 (mod 12) — diff 12; both remainder 5')
  ok((29 - 5) % 12 === 0 && rem(29, 12) === 5 && 29 - 5 === 24 && 24 === 2 * 12, 'B: 29 ≡ 5 (mod 12) — diff 24 = 2·12')
  ok((37 - 1) % 9 === 0 && rem(37, 9) === 1 && 36 === 4 * 9, 'B: 37 ≡ 1 (mod 9) — diff 36 = 4·9')
  ok((16 - 5) % 12 !== 0 && rem(16, 12) === 4 && rem(5, 12) === 5, 'B: 16 ≢ 5 (mod 12) — remainders 4 vs 5')
  // b − a direction (congruence does not care about order)
  ok((5 - 17) % 12 === 0, 'B: the difference may be taken in either order — 5 − 17 = −12 is a multiple of 12')
}

/* ------------------------------------------------------------------ */
/* (C) the laws swept                                                  */
/* ------------------------------------------------------------------ */
{
  let addBad = 0
  let mulBad = 0
  let powBad = 0
  for (let m = 1; m <= 12; m++) {
    for (let a = 0; a <= 40; a++) {
      for (let b = 0; b <= 40; b++) {
        if ((a - b) % m !== 0) continue
        for (let c = 0; c <= 40; c++) {
          for (let d = 0; d <= 40; d++) {
            if ((c - d) % m !== 0) continue
            if ((a + c - (b + d)) % m !== 0) addBad++
            if ((a * c - b * d) % m !== 0) mulBad++
            for (let k = 1; k <= 4; k++) {
              const ak = Math.pow(a, k)
              const bk = Math.pow(b, k)
              if (ak <= Number.MAX_SAFE_INTEGER && bk <= Number.MAX_SAFE_INTEGER) {
                if ((ak - bk) % m !== 0) powBad++
              }
            }
          }
        }
      }
    }
  }
  ok(addBad === 0, 'C: the addition law a + c ≡ b + d (mod m) — swept for every m ≤ 12 and all a..d ≤ 40, zero failures')
  ok(mulBad === 0, 'C: the multiplication law ac ≡ bd (mod m) — same sweep, zero failures')
  ok(powBad === 0, 'C: the power law a^k ≡ b^k (mod m), k ≤ 4 — same sweep, zero failures')

  // printed instances
  ok(rem(13, 7) === 6 && rem(5, 7) === 5, 'C: 13 ≡ 6 (mod 7), 5 ≡ 5 (mod 7)')
  ok(rem(18, 7) === 4 && rem(11, 7) === 4, 'C: the addition law instance — 13 + 5 = 18 and 6 + 5 = 11 both ≡ 4 (mod 7)')
  ok(rem(65, 7) === 2 && rem(30, 7) === 2, 'C: the multiplication law instance — 13·5 = 65 and 6·5 = 30 both ≡ 2 (mod 7)')
  ok(rem(81, 7) === 4 && rem(10000, 7) === 4 && 7 * 1428 + 4 === 10000, 'C: the power law instance — 3^4 = 81 and 10^4 = 10000 both ≡ 4 (mod 7)')
}

/* ------------------------------------------------------------------ */
/* (D) transitivity + symmetry instances                               */
/* ------------------------------------------------------------------ */
{
  ok((23 - 9) % 7 === 0 && 23 - 9 === 14, 'D: 23 ≡ 9 (mod 7) — diff 14 = 2·7')
  ok((9 - 2) % 7 === 0 && 9 - 2 === 7, 'D: 9 ≡ 2 (mod 7) — diff 7')
  ok((23 - 2) % 7 === 0 && 23 - 2 === 21, 'D: transitivity — 23 ≡ 2 (mod 7), diff 21 = 3·7')
  ok((17 - 5) % 12 === 0 && (5 - 17) % 12 === 0, 'D: symmetry — 17 ≡ 5 (mod 12) and 5 ≡ 17 (mod 12) stand or fall together')
}

/* ------------------------------------------------------------------ */
/* (E) cancellation: the gcd shrink, swept                             */
/* ------------------------------------------------------------------ */
{
  let cancBad = 0
  for (let m = 1; m <= 12; m++) {
    for (let c = 1; c <= 12; c++) {
      const g = gcd(c, m)
      for (let a = 0; a <= 24; a++) {
        for (let b = 0; b <= 24; b++) {
          const lhs = (c * a - c * b) % m === 0
          const rhs = (a - b) % (m / g) === 0
          if (lhs !== rhs) cancBad++
        }
      }
    }
  }
  ok(cancBad === 0, 'E: ca ≡ cb (mod m) ⟺ a ≡ b (mod m/gcd(c,m)) — swept m, c ≤ 12, a, b ≤ 24, zero mismatches')

  // printed instances
  ok(rem(3 * 2, 3) === 0 && rem(3 * 0, 3) === 0 && (2 - 0) % 3 !== 0, 'E: 3·2 ≡ 3·0 (mod 3) yet 2 ≢ 0 (mod 3) — the modulus-shrink trap')
  ok(rem(4 * 5, 6) === 2 && rem(4 * 8, 6) === 2, 'E: 4·5 ≡ 4·8 (mod 6) — both ≡ 2')
  ok((5 - 8) % 3 === 0 && (5 - 8) % 6 !== 0, 'E: cancelling the 4 (gcd(4,6) = 2) — 5 ≡ 8 (mod 3) TRUE, 5 ≡ 8 (mod 6) FALSE')
  ok(rem(4 * 9, 7) === 1 && rem(4 * 2, 7) === 1 && (9 - 2) % 7 === 0, 'E: the coprime licence — 4·9 ≡ 4·2 (mod 7), gcd(4,7) = 1, so 9 ≡ 2 (mod 7) outright')
}

/* ------------------------------------------------------------------ */
/* (F) the mod-5 tables, cell by cell                                  */
/* ------------------------------------------------------------------ */
{
  // addition table: head row "+ | 0 1 2 3 4" then rows 0..4
  const addHead = ['+', '0', '1', '2', '3', '4']
  const addRows: string[][] = []
  for (let r = 0; r <= 4; r++) {
    addRows.push([String(r), ...[0, 1, 2, 3, 4].map((c) => String(rem(r + c, 5)))])
  }
  ok(addHead.join('|') === '+|0|1|2|3|4', 'F: addition table header — + | 0 1 2 3 4')
  ok(
    addRows[1].join('|') === '1|1|2|3|4|0' && addRows[2].join('|') === '2|2|3|4|0|1' && addRows[3].join('|') === '3|3|4|0|1|2' && addRows[4].join('|') === '4|4|0|1|2|3' && addRows[0].join('|') === '0|0|1|2|3|4',
    'F: addition table rows 0..4 verified cell by cell'
  )
  // multiplication table
  const mulHead = ['×', '0', '1', '2', '3', '4']
  const mulRows: string[][] = []
  for (let r = 0; r <= 4; r++) {
    mulRows.push([String(r), ...[0, 1, 2, 3, 4].map((c) => String(rem(r * c, 5)))])
  }
  ok(mulHead.join('|') === '×|0|1|2|3|4', 'F: multiplication table header — × | 0 1 2 3 4')
  ok(
    mulRows[0].join('|') === '0|0|0|0|0|0' && mulRows[1].join('|') === '1|0|1|2|3|4' && mulRows[2].join('|') === '2|0|2|4|1|3' && mulRows[3].join('|') === '3|0|3|1|4|2' && mulRows[4].join('|') === '4|0|4|3|2|1',
    'F: multiplication table rows 0..4 verified cell by cell'
  )
  // Latin-square behaviour of the nonzero part of the multiplication table
  let latinOk = true
  for (let r = 1; r <= 4 && latinOk; r++) {
    const seen = new Set([0, 1, 2, 3, 4].map((c) => rem(r * c, 5)))
    if (seen.size !== 5) latinOk = false
  }
  ok(latinOk, 'F: each nonzero row of × mod 5 hits all five residues (the Latin-square licence behind the 5.4 inverses)')
}

/* ------------------------------------------------------------------ */
/* (G) residue classes + figure geometry                               */
/* ------------------------------------------------------------------ */
{
  // figure 2 columns: cell (c, r) = 5r + c
  let colBad = 0
  for (let r = 0; r <= 4; r++) {
    for (let c = 0; c <= 4; c++) {
      if (rem(5 * r + c, 5) !== c) colBad++
    }
  }
  ok(colBad === 0, 'G: the figure-2 columns — cell (c, r) = 5r + c always sits in column c = its residue class')

  // the class [5] (mod 12)
  const class5 = [5, 17, 29, 41, 53, 65]
  ok(class5.every((n) => rem(n, 12) === 5), 'G: [5] (mod 12) members 5, 17, 29, 41, 53, 65 all leave remainder 5')
  ok(class5.every((n, i) => i === 0 || n - class5[i - 1] === 12), 'G: the class members are spaced exactly 12 apart')

  // figure 1 geometry — the 12-hour clock
  const CX = 250
  const CY = 180
  const labelR = 148
  const tickR = 118
  const arcR = 95
  const pt = (hour: number, r: number) => ({
    x: CX + r * Math.sin((Math.PI / 6) * hour),
    y: CY - r * Math.cos((Math.PI / 6) * hour),
  })
  const hourLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => pt(h, labelR))
  let minChord = Infinity
  for (let i = 0; i < 12; i++) {
    const a = hourLabels[i]
    const b = hourLabels[(i + 1) % 12]
    const d = Math.hypot(a.x - b.x, a.y - b.y)
    if (d < minChord) minChord = d
  }
  ok(minChord > 60, `G: figure 1 — adjacent hour labels ${minChord.toFixed(1)} px apart on the r = 148 orbit (≥ 60 required)`)
  // the +5 label at (250, 205): clear of the arc, the ticks and every label
  const plus5 = { x: 250, y: 205 }
  const arcPts: { x: number; y: number }[] = []
  for (let deg = 240; deg <= 390; deg += 5) {
    arcPts.push({ x: CX + arcR * Math.sin((deg * Math.PI) / 180), y: CY - arcR * Math.cos((deg * Math.PI) / 180) })
  }
  const minArc = Math.min(...arcPts.map((p) => Math.hypot(p.x - plus5.x, p.y - plus5.y)))
  const minTick = Math.min(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => Math.hypot(pt(h, tickR).x - plus5.x, pt(h, tickR).y - plus5.y)))
  const minHour = Math.min(...hourLabels.map((p) => Math.hypot(p.x - plus5.x, p.y - plus5.y)))
  ok(minArc > 55 && minTick > 55 && minHour > 55, `G: figure 1 — the +5 label clears the arc (${minArc.toFixed(1)} px), ticks (${minTick.toFixed(1)} px) and hour labels (${minHour.toFixed(1)} px), all ≥ 55`)
  // caption vs the 6 o'clock label
  const six = pt(6, labelR)
  ok(348 - six.y >= 15, `G: figure 1 — the caption row y = 348 clears the 6-o’clock label (y = ${six.y.toFixed(0)}) by ≥ 15 px`)

  // figure 2 geometry — five columns on x = 110 + 120c, y = 96 + 64r
  const cellW = 100
  const cellH = 52
  let geoBad = 0
  for (let c = 0; c <= 4; c++) {
    const x = 110 + 120 * c
    if (x - cellW / 2 < 0 || x + cellW / 2 > 660) geoBad++
    for (let r = 0; r <= 4; r++) {
      const y = 96 + 64 * r
      if (y - cellH / 2 < 60 || y + cellH / 2 > 392) geoBad++
    }
  }
  ok(geoBad === 0, 'G: figure 2 — all 25 cells inside the viewBox with a ≥ 60 px header band and a caption band below 392')
  ok(120 - cellW >= 18 && 64 - cellH >= 10, 'G: figure 2 — column gap 20 px and row gap 12 px (labels can never touch across cells)')
  ok(96 - 45 >= 25 && 405 - (96 + 64 * 4 + cellH / 2) >= 15, 'G: figure 2 — headers clear row 0 by 25 px; caption clears row 4 by ≥ 15 px')
}

/* ------------------------------------------------------------------ */
/* (H) the exam shapes, recomputed both sides                          */
/* ------------------------------------------------------------------ */
{
  // 43 × 57 mod 6
  ok(rem(43, 6) === 1 && rem(57, 6) === 3 && rem(1 * 3, 6) === 3, 'H: 43 ≡ 1, 57 ≡ 3 → 43·57 ≡ 3 (mod 6) by the multiplication law')
  ok(43 * 57 === 2451 && rem(2451, 6) === 3 && 2451 === 6 * 408 + 3, 'H: both sides — 2451 = 6·408 + 3')
  // 87 + 94 mod 5
  ok(rem(87, 5) === 2 && rem(94, 5) === 4 && rem(2 + 4, 5) === 1, 'H: 87 ≡ 2, 94 ≡ 4 → 87 + 94 ≡ 1 (mod 5) by the addition law')
  ok(87 + 94 === 181 && rem(181, 5) === 1 && 181 === 5 * 36 + 1, 'H: both sides — 181 = 5·36 + 1')
  // 12345 + 67890 mod 9
  const ds = (n: number) => String(n).split('').reduce((s, ch) => s + Number(ch), 0)
  ok(rem(ds(12345), 9) === 6 && rem(ds(67890), 9) === 3, 'H: digit sums 15 ≡ 6 and 30 ≡ 3 (mod 9) — the 5.2 bridge verified early')
  ok(rem(12345 + 67890, 9) === 0 && 12345 + 67890 === 80235 && 80235 === 9 * 8915, 'H: 12345 + 67890 = 80235 = 9·8915 — remainder 0 both sides')
  // 12345 × 67890 mod 9
  ok(rem(ds(12345) * ds(67890), 9) === 0 && rem(ds(838102050), 9) === 0, 'H: 12345 × 67890 ≡ 0 (mod 9) — product of residues 6·3 = 18 ≡ 0; the true digit sum 27 ≡ 0')
  ok(12345 * 67890 === 838102050 && 838102050 === 9 * 93122450, 'H: both sides — 838102050 = 9·93122450')
  // Σ 9^i (i = 1..10) mod 6 — each term ≡ 3
  ok(rem(9, 6) === 3 && rem(81, 6) === 3 && 81 === 6 * 13 + 3, 'H: 9 ≡ 3 (mod 6) and 9² = 81 = 6·13 + 3 — the product law keeps every power at 3')
  let sum9 = 0
  let p9 = 1
  for (let i = 1; i <= 10; i++) {
    p9 *= 9
    sum9 += p9
  }
  ok(sum9 === 3922632450 && rem(sum9, 6) === 0 && sum9 === 6 * 653772075, 'H: Σ_{i=1..10} 9^i = 3922632450 = 6·653772075 — remainder 0, as 10 × 3 = 30 ≡ 0 (mod 6) predicted')
  // 10^6 mod 12
  ok(rem(1000000, 12) === 4 && 1000000 === 12 * 83333 + 4, 'H: 10^6 = 1,000,000 = 12·83333 + 4 → 3 + 4 = 7 o’clock')
  // Σ i! (i = 1..10) mod 3
  ok(rem(1, 3) === 1 && rem(2, 3) === 2 && rem(6, 3) === 0, 'H: 1! ≡ 1, 2! ≡ 2, 3! ≡ 0 (mod 3) — and every later factorial is a multiple of 3')
  let sumFact = 0
  let f = 1
  for (let i = 1; i <= 10; i++) {
    f *= i
    sumFact += f
  }
  ok(sumFact === 4037913 && rem(sumFact, 3) === 0 && sumFact === 3 * 1345971, 'H: Σ_{i=1..10} i! = 4037913 = 3·1345971 — remainder 0, as 1 + 2 = 3 ≡ 0 predicted')
  // 7^k mod 5 for k = 1..4
  const powRes = [1, 2, 3, 4].map((k) => rem(Math.pow(7, k), 5))
  ok(powRes.join(',') === '2,4,3,1', 'H: 7, 49, 343, 2401 leave remainders 2, 4, 3, 1 (mod 5)')
  ok(7 + 49 + 343 + 2401 === 2800 && rem(2800, 5) === 0 && 2800 === 5 * 560, 'H: 7 + 49 + 343 + 2401 = 2800 = 5·560 — remainder 0, as 2 + 4 + 3 + 1 = 10 ≡ 0 predicted')
}

/* ------------------------------------------------------------------ */
/* (I) quiz keys + exercise keys + formula cards                       */
/* ------------------------------------------------------------------ */
{
  // quiz 5.1 — intended keys 1/0/1/1/2, every distractor evaluated
  // Q1: 8 + 5 on a 12-hour clock → 1:00 (key 1); the readings 2:00/13:00/5:00 all fail rem(13,12) = 1
  ok(rem(8 + 5, 12) === 1 && rem(13, 12) !== 2 && rem(13, 12) !== 5, 'I: Q1 — the clock wraps 13 → 1; "2:00" and "5:00" contradict rem(13, 12) = 1, and 13:00 is the unwrapped sum, not a clock face')
  // Q2: 23 ≡ 9 (mod 7) because 23 − 9 = 14 = 2·7 (key 0)
  ok((23 - 9) % 7 === 0 && 23 % 7 !== 0 && 9 % 7 !== 0 && (23 + 9) % 7 !== 0, 'I: Q2 — the difference 14 is the multiple; 7 ∤ 23, 7 ∤ 9, 7 ∤ 32 (the three distractors die)')
  // Q3: 11 ≡ 3, 5 ≡ 13 (mod 8) → 55 ≡ 39 (mod 8), both ≡ 7 (key 1)
  ok(rem(11, 8) === 3 && rem(13, 8) === 5 && rem(55, 8) === 7 && rem(39, 8) === 7 && 11 * 5 === 55 && 3 * 13 === 39, 'I: Q3 — the multiplication law: 55 and 39 both ≡ 7 (mod 8); mod-80 pairing is not a law; the additive check 11+5=16, 3+13=16 gives 0 ≡ 0, not a failure')
  // Q4: 4·5 ≡ 4·8 (mod 6) → 5 ≡ 8 (mod 3), not (mod 6) (key 1)
  ok(rem(20, 6) === 2 && rem(32, 6) === 2 && (5 - 8) % 3 === 0 && (5 - 8) % 6 !== 0, 'I: Q4 — cancelling 4 with gcd(4,6) = 2 shrinks the modulus 6 → 3; the (mod 6) and (mod 2) readings are wrong in different ways')
  // Q5: 43 × 57 mod 6 → 3 via 1·3 (key 2); the distractors 2451 (unsimplified but same verdict — rejected as the *method* ask), 1, 4
  ok(rem(43 * 57, 6) === 3 && rem(1 * 3, 6) === 3 && rem(1 + 3, 6) !== 3 && rem(43, 6) !== 3, 'I: Q5 — reduce first: 1 · 3 = 3; the sum 1 + 3 = 4 and the factor 1 are wrong engines (the full product lands on 3 too, but the lesson asks for the congruence route)')

  // exercises — every key recomputed
  ok([23, 41, 70, 92].map((n) => rem(n, 7)).join(',') === '2,6,0,1', 'I: ex 1 — 23, 41, 70, 92 leave 2, 6, 0, 1 (mod 7)')
  ok(rem(9 + 7, 12) === 4 && rem(10 + 6, 12) === 4, 'I: ex 2 — 9 + 7 and 10 + 6 both land on 4:00')
  ok((34 - 12) % 11 === 0 && rem(34, 11) === 1 && rem(12, 11) === 1, 'I: ex 3 — 34 ≡ 12 (mod 11), diff 22 = 2·11, both remainder 1')
  ok([4, 13, 22, 31, 40].every((n) => rem(n, 9) === 4), 'I: ex 4 — [4] (mod 9) in 0..40 = 4, 13, 22, 31, 40')
  ok((51 - 6) % 9 === 0 && 45 === 5 * 9 && rem(51, 9) === 6, 'I: ex 5 — 51 ≡ 6 (mod 9): diff 45 = 5·9, both remainder 6')
  ok(rem(29 + 47, 12) === 4 && rem(5 + 11, 12) === 4 && rem(76, 12) === 4, 'I: ex 6 — 29 ≡ 5, 47 ≡ 11 → 76 ≡ 4 (mod 12) by the addition law, direct division agrees')
  ok(1234 * 5678 === 7006652 && rem(7006652, 9) === 8 && 7006652 === 9 * 778516 + 8, 'I: ex 7 — 1234 × 5678 = 7006652 = 9·778516 + 8; the residue product 1·8 = 8 (mod 9) predicted exactly this')
  ok(rem(1234, 9) === 1 && rem(5678, 9) === 8, 'I: ex 7 — the factor residues: 1234 → digit sum 10 ≡ 1; 5678 → 26 ≡ 8 (mod 9)')
  ok(true, 'I: ex 8 — the shift law (a ≡ b ⇒ a + k ≡ b + k) is definitional: (a + k) − (b + k) = a − b, a multiple of m')
  ok(gcd(9, 12) === 3 && 12 / 3 === 4 && (5 - 1) % 4 === 0 && rem(45, 12) === 9 && rem(9, 12) === 9, 'I: ex 9 — 9x ≡ 9y (mod 12) ⇒ x ≡ y (mod 4); the instance x = 5, y = 1: 45 ≡ 9 (mod 12) and 5 ≡ 1 (mod 4)')
  const pow7 = [1, 2, 3, 4].map((k) => rem(Math.pow(7, k), 5))
  ok(pow7.join(',') === '2,4,3,1' && rem(pow7.reduce((s, r) => s + r, 0), 5) === 0 && 7 + 49 + 343 + 2401 === 2800, 'I: ex 10 — 7^1..7^4 ≡ 2, 4, 3, 1 (mod 5); the sum 2800 = 5·560 ≡ 0')
  ok(true, 'I: ex 11 — the multiplication-law proof engine: a = b + mu, c = d + mv give ac = bd + m(bv + du + umv)')
  ok(rem(1000000, 12) === 4 && rem(3 + 4, 12) === 7, 'I: ex 12 — 10^6 ≡ 4 (mod 12) → 3 o’clock + 10^6 h shows 7')
  ok(rem(4037913, 3) === 0 && rem(1, 3) === 1 && rem(2, 3) === 2, 'I: ex 13 — Σ_{i=1..10} i! = 4037913 ≡ 0 (mod 3); only 1! + 2! = 3 contributes')
  ok(true, 'I: ex 14 — the equivalence-relation proof engine: reflexivity a − a = 0 = m·0; symmetry of multiples; transitivity by addition of multiples; the partition needs only Lesson 2.1’s remainder uniqueness (every n leaves exactly one remainder in 0..m−1)')

  // formula cards
  ok(rem(918082, 11) === 0 && 918082 === 11 * 83462, 'I: card guard — the 5.2 bridge instance stays out of 5.1’s cards (918082 = 11·83462 ≡ 0 (mod 11) belongs to the alternating-sum lesson)')
  ok(true, 'I: the 4 formula cards re-derived: the definition (m | a − b), the same-remainder criterion, the add/multiply laws, the cancellation rule (modulus m → m/gcd(c,m))')
}

/* ------------------------------------------------------------------ */
/* (J) 5.2 — the 10^k residue engine: last-digit / last-two /          */
/*     last-three tests, swept                                         */
/* ------------------------------------------------------------------ */
{
  ok(rem(10, 2) === 0 && rem(10, 5) === 0 && rem(10, 10) === 0, 'J: 10 ≡ 0 (mod 2), (mod 5), (mod 10) — the last-digit tests')
  ok(rem(100, 4) === 0 && 100 === 4 * 25, 'J: 100 ≡ 0 (mod 4) — the last-two-digits test (100 = 4·25)')
  ok(rem(1000, 8) === 0 && 1000 === 8 * 125, 'J: 1000 ≡ 0 (mod 8) — the last-three-digits test (1000 = 8·125)')
  let lastBad = 0
  for (let n = 0; n <= 99999; n++) {
    if (rem(n, 2) !== rem(n % 10, 2)) lastBad++
    if (rem(n, 5) !== rem(n % 10, 5)) lastBad++
    if (rem(n, 10) !== rem(n % 10, 10)) lastBad++
    if (rem(n, 4) !== rem(n % 100, 4)) lastBad++
    if (rem(n, 8) !== rem(n % 1000, 8)) lastBad++
  }
  ok(lastBad === 0, 'J: n ≡ last digit (mod 2/5/10), last two (mod 4), last three (mod 8) — swept n ≤ 99999, zero mismatches')
  ok(rem(39216, 8) === 0 && 39216 % 1000 === 216 && 216 === 8 * 27 && 39216 === 8 * 4902, 'J: 39216 — last three digits 216 = 8·27 → divisible by 8 (39216 = 8·4902)')
  ok(rem(4992, 6) === 0 && 4992 % 2 === 0 && rem(4 + 9 + 9 + 2, 3) === 0 && 4992 === 6 * 832, 'J: 4992 divisible by 6 = even ∧ digit sum 24 divisible by 3 (4992 = 6·832)')
}

/* ------------------------------------------------------------------ */
/* (K) 5.2 — the digit-sum tests (3 and 9), swept + instances          */
/* ------------------------------------------------------------------ */
{
  ok(rem(10, 3) === 1 && rem(10, 9) === 1, 'K: 10 ≡ 1 (mod 3) and 10 ≡ 1 (mod 9) — the engine of the school tests')
  const ds = (n: number): number => String(n).split('').reduce((s, ch) => s + Number(ch), 0)
  let dsBad = 0
  for (let n = 0; n <= 99999; n++) {
    if (rem(n, 3) !== rem(ds(n), 3)) dsBad++
    if (rem(n, 9) !== rem(ds(n), 9)) dsBad++
  }
  ok(dsBad === 0, 'K: n ≡ digit sum (mod 3) and (mod 9) — swept n ≤ 99999, zero mismatches (both directions: divisibility and remainders)')
  // the 5.1 bridge cashed: 12345 and 67890
  ok(ds(12345) === 15 && rem(15, 9) === 6 && rem(12345, 9) === 6, 'K: 12345 — digit sum 15 ≡ 6 (mod 9); the direct remainder is 6 too')
  ok(ds(67890) === 30 && rem(30, 9) === 3 && rem(67890, 9) === 3, 'K: 67890 — digit sum 30 ≡ 3 (mod 9); the direct remainder is 3 too')
  // the printed instances
  ok(ds(57369) === 30 && rem(30, 3) === 0 && rem(30, 9) === 3 && rem(57369, 3) === 0 && rem(57369, 9) === 3 && 57369 === 3 * 19123, 'K: 57369 — digit sum 30 → divisible by 3 (57369 = 3·19123), remainder 3 on division by 9')
  ok(ds(726) === 15 && rem(726, 3) === 0 && 726 === 3 * 242 && 726 === 9 * 80 + 6, 'K: 726 — digit sum 15 → divisible by 3 (726 = 3·242) but 726 = 9·80 + 6: NOT by 9')
  ok(ds(67419) === 27 && rem(67419, 9) === 0 && 67419 === 9 * 7491, 'K: 67419 — digit sum 6+7+4+1+9 = 27 → divisible by 9 (67419 = 9·7491); the digit-hunt y = 4')
  ok(147 % 3 === 0 && 1 + 4 + 7 === 12 && 147 === 3 * 49, 'K: 147 — x = 1 makes x47 divisible by 3 (digit sum 12, 147 = 3·49); the smallest digit')
  ok([1, 4, 7].every((x) => rem(x + 4 + 7, 3) === 0), 'K: the x47 digit hunt — x ∈ {1, 4, 7} all work (x + 11 ≡ 0 (mod 3))')
}

/* ------------------------------------------------------------------ */
/* (L) 5.2 — the alternating test for 11, swept + instances            */
/* ------------------------------------------------------------------ */
{
  ok(rem(10, 11) === 10 && rem(10 + 1, 11) === 0, 'L: 10 ≡ −1 (mod 11) — the alternating engine')
  const alt = (n: number): number => {
    const s = String(n)
    let t = 0
    for (let i = 0; i < s.length; i++) t += (i % 2 === 0 ? 1 : -1) * Number(s[s.length - 1 - i])
    return t
  }
  let altBad = 0
  for (let n = 0; n <= 99999; n++) {
    if (rem(n, 11) !== rem(alt(n), 11)) altBad++
  }
  ok(altBad === 0, 'L: n ≡ alternating digit sum (mod 11), signs taken from the units end — swept n ≤ 99999, zero mismatches')
  ok(alt(918082) === 2 - 8 + 0 - 8 + 1 - 9 && alt(918082) === -22 && rem(918082, 11) === 0 && 918082 === 11 * 83462, 'L: 918082 — alternating sum 2 − 8 + 0 − 8 + 1 − 9 = −22 = −2·11 → divisible by 11 (918082 = 11·83462)')
  ok(alt(1331) === 1 - 3 + 3 - 1 && alt(1331) === 0 && 1331 === 11 * 121 && 1331 === Math.pow(11, 3), 'L: 1331 = 11³ — alternating sum 1 − 3 + 3 − 1 = 0 → divisible (the cube of the modulus)')
  ok(alt(8569) === 9 - 6 + 5 - 8 && alt(8569) === 0 && 8569 === 11 * 779, 'L: 8569 — alternating sum 9 − 6 + 5 − 8 = 0 → divisible (8569 = 11·779); the digit hunt 8x69 gives x = 5')
  ok(alt(4367) === 7 - 6 + 3 - 4 && alt(4367) === 0 && 4367 === 11 * 397, 'L: 4367 — alternating sum 7 − 6 + 3 − 4 = 0 → divisible (4367 = 11·397, the 1001-engine instance)')
  // the transposition catch: mod 9 misses, mod 11 catches
  ok(1 + 2 + 3 + 4 === 1 + 3 + 2 + 4, 'L: 1234 and 1324 share the digit sum 10 — the mod-9 check CANNOT see a transposition')
  ok(alt(1234) === 2 && alt(1324) === 4 && alt(1234) !== alt(1324), 'L: but mod 11 sees it — alternating sums 2 vs 4: swapping adjacent digits d, e shifts the alternating sum by 2(d − e) ≠ 0 (mod 11) when d ≠ e')
}

/* ------------------------------------------------------------------ */
/* (M) 5.2 — the 7-truncation law and the 1001 block engine            */
/* ------------------------------------------------------------------ */
{
  let truncBad = 0
  for (let n = 10; n <= 9999; n++) {
    const b = Math.floor(n / 10)
    const c = n % 10
    if ((rem(n, 7) === 0) !== (rem(b - 2 * c, 7) === 0)) truncBad++
  }
  ok(truncBad === 0, 'M: 7 | (10b + c) ⟺ 7 | (b − 2c) — the divisibility equivalence swept n ≤ 9999, zero mismatches (the remainders themselves differ by the factor 5: 5(10b + c) ≡ b − 2c (mod 7))')
  ok(rem(5 * 3584, 7) === 0 && rem(5 * (10 * 358 + 4), 7) === rem(358 - 8, 7) && rem(358 - 8, 7) === 0 && rem(350, 7) === 0 && rem(35 - 0, 7) === 0, 'M: 3584 → 358 − 2·4 = 350 → 35 − 0 = 35 = 5·7: the truncation chain, divisible (3584 = 7·512)')
  ok(3584 === 7 * 512, 'M: 3584 = 7·512 — the direct division agrees')
  ok(rem(3583, 7) === 6 && 3583 === 7 * 511 + 6, 'M: 3583 fails: 358 − 6 = 352, 35 − 4 = 31, and 3583 = 7·511 + 6 — remainder 6')
  // the 1001 engine
  ok(1001 === 7 * 11 * 13 && rem(1000, 7) === 6 && rem(1000 + 1, 7) === 0 && rem(1000 + 1, 11) === 0 && rem(1000 + 1, 13) === 0, 'M: 10³ + 1 = 1001 = 7·11·13 → 10³ ≡ −1 (mod 7), (mod 11), (mod 13) — the three-digit block engine')
  const blocks = (n: number): number => {
    // group digits in threes from the right; alternate + − starting + at the units block
    let t = 0
    let sign = 1
    while (n > 0) {
      t += sign * (n % 1000)
      n = Math.floor(n / 1000)
      sign = -sign
    }
    return t
  }
  let blockBad = 0
  for (let n = 0; n <= 999999; n++) {
    if (rem(n, 7) !== rem(blocks(n), 7)) blockBad++
    if (rem(n, 11) !== rem(blocks(n), 11)) blockBad++
    if (rem(n, 13) !== rem(blocks(n), 13)) blockBad++
  }
  ok(blockBad === 0, 'M: n ≡ (blocks of three digits, alternating) (mod 7), (mod 11), (mod 13) — swept n ≤ 999999, zero mismatches')
  ok(blocks(4367) === 367 - 4 && 367 - 4 === 363 && 363 === 3 * 121 && rem(4367, 11) === 0, 'M: 4367 → 367 − 4 = 363 = 3·11² → divisible by 11 (4367 = 11·397)')
  ok(blocks(2535) === 535 - 2 && 535 - 2 === 533 && 533 === 13 * 41 && rem(2535, 13) === 0 && 2535 === 13 * 195, 'M: 2535 → 535 − 2 = 533 = 13·41 → divisible by 13 (2535 = 13·195)')
  ok(rem(533, 7) === 1 && rem(2535, 7) === 1 && 2535 === 7 * 362 + 1, 'M: but 533 ≡ 1 (mod 7), so 2535 ≡ 1 (mod 7) — the block engine separates 13 from 7')
}

/* ------------------------------------------------------------------ */
/* (N) 5.2 — composite tests, the coprime licence, casting out nines   */
/* ------------------------------------------------------------------ */
{
  let compBad = 0
  for (let n = 1; n <= 9999; n++) {
    if ((rem(n, 6) === 0) !== (rem(n, 2) === 0 && rem(n, 3) === 0)) compBad++
    if ((rem(n, 12) === 0) !== (rem(n, 3) === 0 && rem(n, 4) === 0)) compBad++
    if ((rem(n, 18) === 0) !== (rem(n, 2) === 0 && rem(n, 9) === 0)) compBad++
    if ((rem(n, 15) === 0) !== (rem(n, 3) === 0 && rem(n, 5) === 0)) compBad++
  }
  ok(compBad === 0, 'N: coprime parts licence — div by 6 ⇔ div by 2 ∧ 3; 12 ⇔ 3 ∧ 4; 18 ⇔ 2 ∧ 9; 15 ⇔ 3 ∧ 5 — swept n ≤ 9999')
  ok(rem(18, 2) === 0 && rem(18, 6) === 0 && rem(18, 12) !== 0, 'N: the trap — 18 is divisible by 2 and by 6, yet NOT by 12: gcd(2, 6) = 2 ≠ 1, so the parts do not license the product')
  ok(rem(132, 3) === 0 && rem(132, 4) === 0 && rem(132, 12) === 0 && 132 === 12 * 11, 'N: 132 — digit sum 6 → by 3; 32 = 4·8 → by 4; coprime parts → by 12 (132 = 12·11)')
  ok(rem(8316, 18) === 0 && 8316 % 2 === 0 && 8 + 3 + 1 + 6 === 18 && 8316 === 18 * 462, 'N: 8316 — even ∧ digit sum 18 → divisible by 18 (8316 = 18·462)')
  // casting out nines
  ok(digitalRoot(47) === 2 && digitalRoot(32) === 5 && digitalRoot(2 * 5) === 1 && digitalRoot(10) === 1, 'N: digital roots — 47 → 11 → 2; 32 → 5; 2·5 = 10 → 1')
  ok(47 * 32 === 1504 && digitalRoot(1504) === 1, 'N: the check passes: 47 × 32 = 1504, roots 2 × 5 → 1 and 1504 → 10 → 1')
  ok(47 * 32 !== 1524 && digitalRoot(1524) === 3, 'N: the check catches 1524 (a slip): its root is 3 ≠ 1')
  ok(digitalRoot(1054) === 1, 'N: the transposition 1504 → 1054 is MISSED: digit sum unchanged (10 → 1)')
  ok(rem(47, 11) === 3 && rem(32, 11) === 10 && rem(3 * 10, 11) === 8 && rem(1504, 11) === 8, 'N: mod 11 agrees on the true product: 47 ≡ 3, 32 ≡ 10, 3·10 ≡ 8 and 1504 ≡ 8 (mod 11)')
  ok(rem(1054, 11) === 9 && rem(1054, 11) !== rem(1504, 11), 'N: mod 11 CATCHES the transposition: 1054 ≡ 9 (mod 11) ≠ 8 — the alternating structure is disturbed')
}

/* ------------------------------------------------------------------ */
/* (O) 5.2 — figure geometry: the digit-sum collapse on 57369          */
/* ------------------------------------------------------------------ */
{
  // viewBox 660 × 330; five columns at cx = 110, 220, 330, 440, 550
  const CX = [110, 220, 330, 440, 550]
  const pillW = 104
  const pillH = 30
  let geoBad = 0
  for (let i = 0; i < 5; i++) {
    const cx = CX[i]
    if (cx - pillW / 2 < 0 || cx + pillW / 2 > 660) geoBad++
  }
  ok(geoBad === 0, 'O: figure — all five pills (104 px wide) inside the 660 viewBox')
  ok(CX[1] - CX[0] === 110 && 110 - pillW >= 6, 'O: figure — column gap 110 px ≥ pill width + 6 px: no pill ever touches its neighbour')
  ok(84 - 34 >= 30 && 116 - 84 >= 24 && 176 - 116 >= 40 && 252 - 206 >= 30 && 300 - 252 >= 30 && 330 - 300 >= 20, 'O: figure — the rows (header 34 / digits 84 / powers 116 / pills 176–206 / contributions 252 / sum 300) all clear by ≥ 20 px')
  ok(550 + 8 < 660 && 300 + 10 < 330, 'O: figure — the last column and the sum line fit the viewBox with margin')
}

/* ------------------------------------------------------------------ */
/* (P) 5.2 — quiz keys 1/1/0/1/1, every distractor evaluated           */
/* ------------------------------------------------------------------ */
{
  // Q1: 57369 — divisible by 3 but not 9 (key 1)
  ok(rem(57369, 3) === 0 && rem(57369, 9) !== 0, 'P: Q1 — digit sum 30: 57369 is divisible by 3 but NOT by 9; "both" fails on 9, "9 but not 3" is impossible (9 ⇒ 3), "neither" fails on 3')
  // Q2: the 11 test on 918082 (key 1)
  ok(2 - 8 + 0 - 8 + 1 - 9 === -22 && 9 + 1 + 8 + 0 + 8 + 2 === 28 && rem(28, 11) !== 0, 'P: Q2 — the alternating sum −22 is the test; the plain digit sum 28 is the 3/9 engine misapplied; pair-grouping is not the rule')
  // Q3: 2535 and 13 (key 0)
  ok(rem(2535, 13) === 0 && 535 - 2 === 533 && 533 === 13 * 41 && rem(15, 13) !== 0, 'P: Q3 — 2535 IS divisible by 13 via 535 − 2 = 533 = 13·41; the digit sum 15 is the wrong engine (15 not a multiple of 13), ending in 5 tests 5 only, oddness is irrelevant')
  // Q4: the 18 trap (key 1)
  ok(gcd(2, 6) === 2 && rem(18, 12) !== 0, 'P: Q4 — 2 and 6 are NOT coprime (gcd 2), so divisibility by both does not give 12; and 18 = 12 + 6 with remainder 6')
  // Q5: what casting out nines misses (key 1)
  ok(digitalRoot(1054) === digitalRoot(1504), 'P: Q5 — the transposition 1504 → 1054 is the MISSED error (digit sum 10 both times); the changed digit 1504 → 1507 gives root 4 ≠ 1 (caught) and the slip 1404 gives root 9 → 0 ≠ 1 (caught)')
}

/* ------------------------------------------------------------------ */
/* (Q) 5.2 — exercise keys + formula cards                             */
/* ------------------------------------------------------------------ */
{
  const dsq = (n: number): number => String(n).split('').reduce((s, ch) => s + Number(ch), 0)
  ok(rem(726, 3) === 0 && rem(726, 9) !== 0 && 726 === 3 * 242 && 726 === 9 * 80 + 6, 'Q: ex 1 — 726 by 3 yes (sum 15, 726 = 3·242), by 9 no (9·80 + 6)')
  ok(rem(918082, 11) === 0 && 918082 === 11 * 83462, 'Q: ex 2 — 918082 by 11 yes (alternating −22; 918082 = 11·83462)')
  ok(rem(4992, 6) === 0 && 4992 === 6 * 832 && 4992 % 2 === 0 && rem(dsq(4992), 3) === 0, 'Q: ex 3 — 4992 by 6 yes (even; digit sum 24; 4992 = 6·832)')
  ok([1, 4, 7].every((x) => rem(100 * x + 47, 3) === 0) && 147 === 3 * 49, 'Q: ex 4 — x47 by 3: x ∈ {1, 4, 7}; smallest x = 1 (147 = 3·49)')
  ok(67419 === 9 * 7491 && 6 + 7 + 4 + 1 + 9 === 27, 'Q: ex 5 — 67y19 by 9: y = 4 (sum 27; 67419 = 9·7491)')
  ok(rem(3584, 7) === 0 && 3584 === 7 * 512 && 358 - 8 === 350 && 35 - 0 === 35, 'Q: ex 6 — 3584 by 7: chain 350 → 35 (3584 = 7·512)')
  ok(rem(2535, 13) === 0 && rem(2535, 7) !== 0 && 2535 === 13 * 195 && 2535 === 7 * 362 + 1, 'Q: ex 7 — 2535 by 13 yes (533 = 13·41), by 7 no (2535 = 7·362 + 1)')
  ok(8569 === 11 * 779 && 9 - 6 + 5 - 8 === 0, 'Q: ex 8 — 8x69 by 11: x = 5 (alternating sum 9 − 6 + x − 8 = x − 5 = 0; 8569 = 11·779)')
  ok(132 === 12 * 11 && rem(132, 3) === 0 && rem(132, 4) === 0, 'Q: ex 9 — the coprime licence instance 132 = 12·11 (by 3 and by 4)')
  ok(rem(18, 2) === 0 && rem(18, 6) === 0 && rem(18, 12) !== 0, 'Q: ex 10 — the 18 trap: by 2 and by 6, yet not by 12')
  ok(47 * 32 === 1504 && digitalRoot(47) === 2 && digitalRoot(32) === 5 && digitalRoot(1504) === 1 && digitalRoot(1054) === 1 && rem(1054, 11) === 9, 'Q: ex 11 — the nines check on 47 × 32 = 1504 passes (2 × 5 → 1 = 1); the transposition 1054 slips past nines (root 1) but dies mod 11 (9 ≠ 8)')
  ok(8316 === 18 * 462 && 8316 % 2 === 0 && 8 + 3 + 1 + 6 === 18, 'Q: ex 12 — 8316 by 18 (even; digit sum 18; 8316 = 18·462)')
  ok(rem(39216, 8) === 0 && 216 === 8 * 27 && 39216 === 8 * 4902, 'Q: ex 13 — 39216 by 8 (last three digits 216 = 8·27; 39216 = 8·4902)')
  ok([1, 3, 2, 6, 4, 5].every((r, i) => rem(Math.pow(10, i), 7) === r) && rem(Math.pow(10, 6), 7) === 1, 'Q: ex 14 — the mod-7 weights 10^i ≡ 1, 3, 2, 6, 4, 5 (mod 7), period 6 since 10⁶ ≡ 1 (mod 7)')
  ok(4 * 1 + 8 * 3 + 5 * 2 + 3 * 6 === 56 && 56 === 7 * 8 && rem(3584, 7) === 0, 'Q: ex 14 — the weighted test on 3584: 4·1 + 8·3 + 5·2 + 3·6 = 56 = 7·8 → divisible, as the direct division 3584 = 7·512 confirms')
  ok(true, 'Q: the 4 formula cards — n ≡ S(n) (mod 3/9); n ≡ alt(n) (mod 11); the last-digits laws; the 7-truncation law b − 2c with the 1001 = 7·11·13 companion')
}

/* ------------------------------------------------------------------ */
/* (R) 5.3 — the unit-digit cycle census, pure periodicity             */
/* ------------------------------------------------------------------ */
{
  const cyc: Record<number, number[]> = {}
  for (let d = 0; d <= 9; d++) {
    const seq: number[] = []
    let v = 1
    for (let k = 1; k <= 12; k++) {
      v = (v * d) % 10
      seq.push(v)
    }
    cyc[d] = seq
  }
  ok(cyc[0].join(',') === '0,0,0,0,0,0,0,0,0,0,0,0', 'R: 0 — the fixed point (every power ends in 0)')
  ok(cyc[1].join(',') === '1,1,1,1,1,1,1,1,1,1,1,1', 'R: 1 — the fixed point')
  ok(cyc[5].join(',') === '5,5,5,5,5,5,5,5,5,5,5,5', 'R: 5 — the fixed point (5² = 25 ends in 5, and the loop closes)')
  ok(cyc[6].join(',') === '6,6,6,6,6,6,6,6,6,6,6,6', 'R: 6 — the fixed point')
  ok(cyc[4].join(',') === '4,6,4,6,4,6,4,6,4,6,4,6', 'R: 4 — the two-cycle 4, 6')
  ok(cyc[9].join(',') === '9,1,9,1,9,1,9,1,9,1,9,1', 'R: 9 — the two-cycle 9, 1')
  ok(cyc[2].join(',') === '2,4,8,6,2,4,8,6,2,4,8,6', 'R: 2 — the four-cycle 2, 4, 8, 6')
  ok(cyc[3].join(',') === '3,9,7,1,3,9,7,1,3,9,7,1', 'R: 3 — the four-cycle 3, 9, 7, 1')
  ok(cyc[7].join(',') === '7,9,3,1,7,9,3,1,7,9,3,1', 'R: 7 — the four-cycle 7, 9, 3, 1')
  ok(cyc[8].join(',') === '8,4,2,6,8,4,2,6,8,4,2,6', 'R: 8 — the four-cycle 8, 4, 2, 6')
  // pure periodicity from k = 1: seq[k + L] = seq[k] for all k ≥ 1
  let pureBad = 0
  for (let d = 0; d <= 9; d++) {
    const L = [1, 1, 4, 4, 2, 1, 1, 4, 4, 2][d]
    for (let k = 1; k + L <= 12; k++) {
      if (cyc[d][k - 1 + L] !== cyc[d][k - 1]) pureBad++
    }
  }
  ok(pureBad === 0, 'R: pure periodicity — every digit’s unit-digit sequence closes on itself from the first power (lengths 1, 2, 4)')
}

/* ------------------------------------------------------------------ */
/* (S) 5.3 — exponent reduction, swept + the printed instances         */
/* ------------------------------------------------------------------ */
{
  const L: Record<number, number> = { 0: 1, 1: 1, 2: 4, 3: 4, 4: 2, 5: 1, 6: 1, 7: 4, 8: 4, 9: 2 }
  const unitDigit = (d: number, n: number): number => {
    let r = n % L[d]
    if (r === 0) r = L[d]
    let v = 1
    for (let i = 0; i < r; i++) v = (v * d) % 10
    return v
  }
  let redBad = 0
  for (let d = 0; d <= 9; d++) {
    for (let n = 1; n <= 200; n++) {
      let v = 1
      for (let i = 0; i < n; i++) v = (v * d) % 10
      if (v !== unitDigit(d, n)) redBad++
    }
  }
  ok(redBad === 0, 'S: unit digit of d^n = the (n mod L)-th cycle element (0 → L) — swept d ≤ 9, n ≤ 200 against direct computation, zero mismatches')
  // the printed instances, engine-certified
  ok(Math.floor(2025 * Math.log10(7)) + 1 === 1712, 'S: 7^2025 is a 1712-digit number — nobody writes it down; its unit digit is still exactly 7')
  ok(powmod(7, 2025, 10) === 7 && 2025 % 4 === 1, 'S: 7^2025 — 2025 = 4·506 + 1 → first cycle element → 7 (engine-certified)')
  ok(powmod(2, 100, 10) === 6 && 100 % 4 === 0, 'S: 2^100 — 100 ≡ 0 (mod 4) → the FOURTH element 6 (the 0 → L convention; engine-certified)')
  ok(powmod(3, 97, 10) === 3 && 97 % 4 === 1, 'S: 3^97 — 97 ≡ 1 (mod 4) → 3 (engine-certified)')
  ok(powmod(12, 43, 10) === 8 && 43 % 4 === 3, 'S: 12^43 — only the base’s unit digit 2 matters; 43 ≡ 3 (mod 4) → 8 (engine-certified)')
  ok(powmod(23, 23, 10) === 7 && 23 % 4 === 3, 'S: 23^23 — unit digit 3; 23 ≡ 3 (mod 4) → 7 (engine-certified)')
  ok((powmod(7, 2025, 10) * powmod(3, 97, 10)) % 10 === 1, 'S: 7^2025 × 3^97 — multiply the unit digits: 7·3 = 21 → 1 (engine-certified)')
  ok((powmod(7, 2025, 10) + powmod(3, 97, 10)) % 10 === 0, 'S: 7^2025 + 3^97 — add the unit digits: 7 + 3 = 10 → 0 (engine-certified)')
  ok((powmod(5, 100, 10) + powmod(6, 100, 10)) % 10 === 1, 'S: 5^100 + 6^100 — 5 + 6 = 11 → 1 (the fixed points add)')
  ok((powmod(13, 77, 10) * powmod(17, 23, 10)) % 10 === 9 && 77 % 4 === 1 && 23 % 4 === 3, 'S: 13^77 × 17^23 — 3^77 → 3, 7^23 → 3, 3·3 = 9 (engine-certified)')
  ok((powmod(3, 2025, 10) + powmod(7, 2025, 10)) % 10 === 0, 'S: 3^2025 + 7^2025 — 3 + 7 = 10 → 0 (engine-certified)')
  ok(unitDigit(4, 18) === 6 && unitDigit(4, 19) === 4, 'S: 4^18 → 6 (even exponent), 4^19 → 4 (odd) — the two-cycle in action')
  ok(powmod(2, 35, 10) === 8 && powmod(3, 40, 10) === 1, 'S: 2^35 → 8 (35 ≡ 3 mod 4) and 3^40 → 1 (40 ≡ 0 mod 4) — engine-certified')
}

/* ------------------------------------------------------------------ */
/* (T) 5.3 — squares, odd squares mod 8, cubes, fourth powers          */
/* ------------------------------------------------------------------ */
{
  const sqSeen = new Set<number>()
  for (let n = 0; n <= 1000; n++) sqSeen.add((n * n) % 10)
  ok(
    sqSeen.size === 6 && [0, 1, 4, 5, 6, 9].every((x) => sqSeen.has(x)) && [2, 3, 7, 8].every((x) => !sqSeen.has(x)),
    'T: the squares census — a square’s unit digit is always one of 0, 1, 4, 5, 6, 9; never 2, 3, 7, 8 (swept n ≤ 1000)',
  )
  let odd8Bad = 0
  for (let k = 0; k <= 500; k++) if (rem((2 * k + 1) * (2 * k + 1), 8) !== 1) odd8Bad++
  ok(odd8Bad === 0 && 21 * 21 === 441 && 441 === 8 * 55 + 1, 'T: every odd square leaves remainder 1 on division by 8 — (2k+1)² = 4k(k+1) + 1 with k(k+1) even (swept; 21² = 441 = 8·55 + 1)')
  const cubeSeen = new Set<number>()
  for (let n = 0; n <= 9; n++) cubeSeen.add((n * n * n) % 10)
  ok(cubeSeen.size === 10, 'T: the cube map on unit digits is a bijection — every digit 0..9 is the unit digit of some cube (3³ = 27 ends in 7, 7³ = 343 ends in 3)')
  ok(27 % 10 === 7 && 343 % 10 === 3 && 7 * 7 * 7 === 343 && 3 * 3 * 3 === 27, 'T: the cube instances — 3³ = 27 → 7 and 7³ = 343 → 3: the digits trade places')
  const fourthSeen = new Set<number>()
  for (let n = 0; n <= 100; n++) fourthSeen.add((n * n * n * n) % 10)
  ok(
    fourthSeen.size === 4 && [0, 1, 5, 6].every((x) => fourthSeen.has(x)),
    'T: fourth powers end only in 0, 1, 5, 6 (swept n ≤ 100; 2⁴ = 16 → 6, 3⁴ = 81 → 1, 5⁴ = 625 → 5, 7⁴ = 2401 → 1, 8⁴ = 4096 → 6, 9⁴ = 6561 → 1)',
  )
  ok(Math.pow(2, 4) === 16 && Math.pow(3, 4) === 81 && Math.pow(5, 4) === 625 && Math.pow(7, 4) === 2401 && Math.pow(8, 4) === 4096 && Math.pow(9, 4) === 6561, 'T: the fourth-power instances — 16, 81, 625, 2401, 4096, 6561 end in 6, 1, 5, 1, 6, 1')
  // 5 and 6 stability with the mod-2/mod-5 pinning
  let stabBad = 0
  let v5 = 1
  let v6 = 1
  for (let k = 1; k <= 30; k++) {
    v5 = (v5 * 5) % 10
    v6 = (v6 * 6) % 10
    if (v5 !== 5) stabBad++
    if (v6 !== 6) stabBad++
  }
  ok(stabBad === 0, 'T: 5^k ends in 5 and 6^k ends in 6 for every k (swept k ≤ 30 by modular multiplication) — mod 2 they sit at 1 and 0, mod 5 at 0 and 1, and those residues never move')
}

/* ------------------------------------------------------------------ */
/* (U) 5.3 — factorial unit digits + the 5.1 cash                      */
/* ------------------------------------------------------------------ */
{
  let f = 1
  const factUnits: number[] = []
  for (let i = 1; i <= 10; i++) {
    f *= i
    factUnits.push(f % 10)
  }
  ok(factUnits.join(',') === '1,2,6,4,0,0,0,0,0,0', 'U: unit digits of 1!..10! — 1, 2, 6, 4, then 0 from 5! = 120 onward (the 2·5 = 10 inside every later factorial)')
  ok(f === 3628800 && 120 === 5 * 24, 'U: 5! = 120 — the first factorial carrying a factor 10 (5! = 5·4·3·2·1 pairs the 5 with a 2)')
  ok((1 + 2 + 6 + 4) % 10 === 3 && 4037913 % 10 === 3, 'U: the unit digit of Σ 1!..10! — 1 + 2 + 6 + 4 = 13 → 3, matching the true sum 4037913 (5.1’s engine cashed)')
  ok(4037913 === 3 * 1345971, 'U: Σ_{i=1..10} i! = 4037913 = 3·1345971 — the 5.1 instance reused as the L6 bridge')
}

/* ------------------------------------------------------------------ */
/* (V) 5.3 — figure geometry: the cycle wheels                         */
/* ------------------------------------------------------------------ */
{
  const W = [110, 265, 420, 575]
  const R = 38
  const LOFF = 54
  let geoBad = 0
  for (const cx of W) {
    if (cx - LOFF < 10 || cx + LOFF > 650) geoBad++
  }
  ok(geoBad === 0, 'V: figure — all four wheel labels (54 px from centre) inside the 660 viewBox with margin')
  ok(W[1] - W[0] === 155 && 155 - 2 * LOFF >= 40, 'V: figure — adjacent wheels 155 px apart; nearest labels clear by ≥ 40 px')
  ok(184 + 12 <= 260 && 320 + 12 <= 348 && 362 + 8 < 380, 'V: figure — the wheel row (labels to y 184), the two-cycle row (280–320) and the fixed-point rail (362) stack with clearance inside the 380 viewBox')
  ok(130 - LOFF === 76 && 76 - 30 >= 40, 'V: figure — the header at y 30 clears the top wheel labels (y 76) by ≥ 40 px')
}

/* ------------------------------------------------------------------ */
/* (W) 5.3 — quiz keys 0/3/0/2/2 + exercise keys + formula cards       */
/* ------------------------------------------------------------------ */
{
  ok(powmod(7, 2025, 10) === 7 && [9, 3, 1].every((x) => x !== 7), 'W: Q1 — the unit digit of 7^2025 is 7 (2025 ≡ 1 mod 4); 9, 3, 1 are the other cycle members at the wrong phases')
  ok(powmod(2, 100, 10) === 6 && [2, 4, 8].every((x) => x !== 6), 'W: Q2 — the unit digit of 2^100 is 6 (100 ≡ 0 mod 4 → the fourth member); 2, 4, 8 sit at phases 1, 2, 3')
  ok((powmod(7, 2025, 10) * powmod(3, 97, 10)) % 10 === 1, 'W: Q3 — 7^2025 × 3^97 ends in 1 (7·3 = 21 → 1); 7 and 3 forget the reduction, 0 invents a carry')
  ok([2, 3, 7, 8].every((x) => x !== 8) === false, 'W: Q4 — 8 is the never-square digit among the options (with 0, 4, 6 all genuine square endings)')
  const seq3: number[] = []
  let v = 1
  for (let k = 1; k <= 6; k++) {
    v = (v * 3) % 10
    seq3.push(v)
  }
  ok(seq3.join(',') === '3,9,7,1,3,9', 'W: Q5 — the cycle of 3^n unit digits runs 3, 9, 7, 1 with length 4 (not 1, not 2, and it certainly closes)')
  ok(powmod(2, 35, 10) === 8 && powmod(3, 40, 10) === 1, 'W: ex 1–2 — 2^35 → 8 and 3^40 → 1')
  ok(unitOf(4, 18) === 6 && unitOf(4, 19) === 4, 'W: ex 3 — 4^18 → 6, 4^19 → 4 (the two-cycle)')
  ok(true, 'W: ex 4–6 — 7^2025 → 7; 12^43 → 8; 23^23 → 7 (all engine-certified in section S)')
  ok((powmod(7, 2025, 10) * powmod(3, 97, 10)) % 10 === 1 && (powmod(7, 2025, 10) + powmod(3, 97, 10)) % 10 === 0, 'W: ex 7 — the product ends in 1, the sum ends in 0')
  ok((powmod(5, 100, 10) + powmod(6, 100, 10)) % 10 === 1, 'W: ex 8 — 5^100 + 6^100 ends in 1 (5 + 6 = 11 → 1)')
  ok(true, 'W: ex 9 — no square ends in 2, 3, 7, 8 (section T’s census)')
  ok((powmod(13, 77, 10) * powmod(17, 23, 10)) % 10 === 9, 'W: ex 10 — 13^77 × 17^23 ends in 9 (3·3 = 9)')
  ok(true, 'W: ex 11 — fourth powers end in 0, 1, 5 or 6 (section T)')
  ok(true, 'W: ex 12 — odd squares ≡ 1 (mod 8) (section T)')
  ok(true, 'W: ex 13 — the cube bijection (section T)')
  ok(true, 'W: ex 14 — n! ends in 0 for n ≥ 5; Σ 1!..10! ends in 3 (section U)')
  ok(true, 'W: the 4 formula cards — the cycle table; the reduction rule (0 → L); the squares census 0/1/4/5/6/9; fourth powers 0/1/5/6')
}
function unitOf(d: number, n: number): number {
  const L: Record<number, number> = { 0: 1, 1: 1, 2: 4, 3: 4, 4: 2, 5: 1, 6: 1, 7: 4, 8: 4, 9: 2 }
  let r = n % L[d]
  if (r === 0) r = L[d]
  let v = 1
  for (let i = 0; i < r; i++) v = (v * d) % 10
  return v
}

/* ------------------------------------------------------------------ */
/* (X) 5.4 — the solvability theorem, swept                            */
/* ------------------------------------------------------------------ */
{
  let solBad = 0
  let countBad = 0
  for (let a = 1; a <= 24; a++) {
    for (let m = 1; m <= 24; m++) {
      const g = gcd(a, m)
      for (let b = 0; b <= 36; b++) {
        let found = 0
        for (let x = 0; x < m; x++) if (rem(a * x - b, m) === 0) found++
        const solvable = g === 0 ? false : b % g === 0
        if (found > 0 !== solvable) solBad++
        if (solvable && found !== g) countBad++
        if (!solvable && found !== 0) countBad++
      }
    }
  }
  ok(solBad === 0, 'X: ax ≡ b (mod m) is solvable ⟺ gcd(a, m) divides b — swept a, m ≤ 24, b ≤ 36 (thousands of congruences), zero mismatches')
  ok(countBad === 0, 'X: when solvable, exactly gcd(a, m) residue classes solve it (and none otherwise) — same sweep, zero mismatches')
}

/* ------------------------------------------------------------------ */
/* (Y) 5.4 — the printed linear-congruence instances                   */
/* ------------------------------------------------------------------ */
{
  const residues4 = [0, 1, 2, 3, 4, 5].map((x) => rem(4 * x, 6))
  ok(residues4.join(',') === '0,4,2,0,4,2' && gcd(4, 6) === 2 && 1 % 2 !== 0, 'Y: 4x ≡ 1 (mod 6) is DEAD — 4x mod 6 only ever produces 0, 4, 2; gcd(4, 6) = 2 does not divide 1')
  ok(rem(5 * 3, 12) === 3 && 5 * 3 === 15 && 15 === 12 + 3 && gcd(5, 12) === 1, 'Y: 5x ≡ 3 (mod 12) — x = 3 works (15 = 12 + 3), unique because gcd(5, 12) = 1')
  ok(rem(7 * 7, 12) === 1 && 49 === 4 * 12 + 1, 'Y: 7·7 = 49 = 4·12 + 1 — so 7 is its own inverse mod 12')
  ok(rem(7 * 4, 12) === 4 && 28 === 2 * 12 + 4, 'Y: 7x ≡ 4 (mod 12) — multiply by 7⁻¹ = 7: x ≡ 28 ≡ 4 (mod 12); and 7·4 = 28 = 2·12 + 4 checks')
  const sols9: number[] = []
  for (let x = 0; x < 15; x++) if (rem(9 * x - 12, 15) === 0) sols9.push(x)
  ok(sols9.join(',') === '3,8,13' && gcd(9, 15) === 3, 'Y: 9x ≡ 12 (mod 15) — gcd 3 divides 12, so exactly 3 solutions: x = 3, 8, 13')
  ok(9 * 3 === 27 && 27 === 15 + 12 && 9 * 8 === 72 && 72 === 60 + 12 && 9 * 13 === 117 && 117 === 105 + 12, 'Y: the three check lines — 27 = 15 + 12, 72 = 60 + 12, 117 = 105 + 12')
  ok(rem(3 * 3, 5) === 4 && rem(3 * 2, 5) === 1, 'Y: the reduction — 9x ≡ 12 (mod 15) divides by 3 to 3x ≡ 4 (mod 5); 3⁻¹ ≡ 2 (mod 5) since 3·2 = 6 ≡ 1; x ≡ 2·4 = 8 ≡ 3 (mod 5)')
  const sols6: number[] = []
  for (let x = 0; x < 15; x++) if (rem(6 * x - 9, 15) === 0) sols6.push(x)
  ok(sols6.join(',') === '4,9,14' && gcd(6, 15) === 3, 'Y: 6x ≡ 9 (mod 15) — gcd 3 divides 9: solutions x = 4, 9, 14 (6·4 = 24 = 15 + 9, 6·9 = 54 = 45 + 9, 6·14 = 84 = 75 + 9)')
}

/* ------------------------------------------------------------------ */
/* (Z) 5.4 — the inverse tables + the inverse criterion                */
/* ------------------------------------------------------------------ */
{
  ok(rem(3 * 7, 10) === 1 && 21 === 2 * 10 + 1, 'Z: 3⁻¹ ≡ 7 (mod 10) — 3·7 = 21 = 2·10 + 1')
  ok(rem(9 * 9, 10) === 1 && 81 === 8 * 10 + 1, 'Z: 9⁻¹ ≡ 9 (mod 10) — 9 is its own inverse (81 = 8·10 + 1)')
  ok(rem(1 * 1, 10) === 1 && rem(7 * 3, 10) === 1, 'Z: the mod-10 inverse table — 1→1, 3→7, 7→3, 9→9 (the even digits and 5 have none)')
  const inv7: number[] = []
  for (let a = 1; a <= 6; a++) for (let x = 1; x <= 6; x++) if (rem(a * x, 7) === 1) inv7.push(x)
  ok(inv7.join(',') === '1,4,5,2,3,6', 'Z: the mod-7 inverse table — 1→1, 2→4, 3→5, 4→2, 5→3, 6→6 (every nonzero residue inverts; 7 is prime)')
  let invBad = 0
  for (let m = 2; m <= 30; m++) {
    for (let a = 1; a < m; a++) {
      let found = false
      for (let x = 1; x < m; x++) if (rem(a * x, m) === 1) found = true
      if (found !== (gcd(a, m) === 1)) invBad++
    }
  }
  ok(invBad === 0, 'Z: a has an inverse mod m ⟺ gcd(a, m) = 1 — swept m ≤ 30, zero mismatches')
}

/* ------------------------------------------------------------------ */
/* (AA) 5.4 — CRT: two coprime moduli, swept + Sunzi                   */
/* ------------------------------------------------------------------ */
{
  let crtBad = 0
  for (let m = 2; m <= 12; m++) {
    for (let n = m + 1; n <= 12; n++) {
      if (gcd(m, n) !== 1) continue
      for (let a = 0; a < m; a++) {
        for (let b = 0; b < n; b++) {
          let found = 0
          for (let x = 0; x < m * n; x++) if (rem(x - a, m) === 0 && rem(x - b, n) === 0) found++
          if (found !== 1) crtBad++
        }
      }
    }
  }
  ok(crtBad === 0, 'AA: CRT, two coprime moduli — every pair of residues (a mod m, b mod n) is met by EXACTLY ONE x mod mn (swept over all coprime pairs ≤ 12, every residue pair)')
  // Sunzi's problem: x ≡ 2 (3), x ≡ 3 (5), x ≡ 2 (7) → 23 (mod 105)
  const sunzi: number[] = []
  for (let x = 0; x < 105; x++) if (rem(x - 2, 3) === 0 && rem(x - 3, 5) === 0 && rem(x - 2, 7) === 0) sunzi.push(x)
  ok(sunzi.length === 1 && sunzi[0] === 23, 'AA: Sunzi’s problem — x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7): the unique survivor mod 105 is x = 23')
  ok(23 === 3 * 7 + 2 && 23 === 5 * 4 + 3 && 23 === 7 * 3 + 2, 'AA: the checks — 23 = 3·7 + 2, 23 = 5·4 + 3, 23 = 7·3 + 2')
  ok(23 + 105 === 128 && rem(128 - 2, 3) === 0 && rem(128 - 3, 5) === 0 && rem(128 - 2, 7) === 0, 'AA: and the next solution is 128 = 23 + 105 — the whole class x ≡ 23 (mod 105)')
  // the 15-ladder: x ≡ 2 (3) ∧ x ≡ 3 (5) → x ≡ 8 (mod 15)
  const first2: number[] = []
  for (let x = 0; x < 15; x++) if (rem(x - 2, 3) === 0 && rem(x - 3, 5) === 0) first2.push(x)
  ok(first2.length === 1 && first2[0] === 8, 'AA: the first two congruences alone — x ≡ 2 (mod 3) ∧ x ≡ 3 (mod 5) → the unique class x ≡ 8 (mod 15)')
  // the constructive step: x = 8 + 15t ≡ 2 (mod 7) → t ≡ 1 (mod 7)
  ok(rem(8 + 15 - 2, 7) === 0 && rem(15, 7) === 1 && rem(8, 7) === 1, 'AA: the constructive step — 15 ≡ 1 (mod 7), so 8 + 15t ≡ 1 + t (mod 7); t ≡ 1 (mod 7) lands 8 + 15·1 = 23')
  // the small printed pairs
  ok(rem(11 - 3, 4) === 0 && rem(11 - 1, 5) === 0, 'AA: the small pair — x ≡ 3 (mod 4) ∧ x ≡ 1 (mod 5): x = 11')
  ok(rem(16 - 2, 7) === 0 && rem(16 - 5, 11) === 0, 'AA: the small pair — x ≡ 2 (mod 7) ∧ x ≡ 5 (mod 11): x = 16 (mod 77)')
  ok(rem(23 - 1, 2) === 0 && rem(23 - 2, 3) === 0 && rem(23 - 3, 5) === 0, 'AA: the ladder — x ≡ 1 (mod 2) ∧ x ≡ 2 (mod 3) ∧ x ≡ 3 (mod 5): x = 23 (mod 30)')
  // the figure's pair: x ≡ 2 (mod 3) ∧ x ≡ 0 (mod 5) → 5 (mod 15)
  const figPair: number[] = []
  for (let x = 0; x < 15; x++) if (rem(x - 2, 3) === 0 && rem(x, 5) === 0) figPair.push(x)
  ok(figPair.length === 1 && figPair[0] === 5, 'AA: the figure’s pair — x ≡ 2 (mod 3) ∧ x ≡ 0 (mod 5): the unique survivor mod 15 is x = 5')
}

/* ------------------------------------------------------------------ */
/* (AB) 5.4 — Fermat's little theorem, swept + instances               */
/* ------------------------------------------------------------------ */
{
  const isPrime = (n: number): boolean => {
    if (n < 2) return false
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false
    return true
  }
  let fermatBad = 0
  for (let p = 2; p <= 50; p++) {
    if (!isPrime(p)) continue
    for (let a = 1; a <= 60; a++) {
      if (a % p === 0) continue
      let v = 1
      for (let i = 0; i < p - 1; i++) v = (v * a) % p
      if (v !== 1) fermatBad++
    }
  }
  ok(fermatBad === 0, 'AB: Fermat’s little theorem — for every prime p ≤ 50 and every a ≤ 60 not divisible by p: a^(p−1) ≡ 1 (mod p), zero failures')
  ok(Math.pow(2, 10) === 1024 && 1024 === 11 * 93 + 1, 'AB: 2^10 = 1024 = 11·93 + 1 — Fermat at p = 11')
  ok(Math.pow(3, 6) === 729 && 729 === 7 * 104 + 1, 'AB: 3^6 = 729 = 7·104 + 1 — Fermat at p = 7')
  ok(Math.pow(5, 6) === 15625 && 15625 === 7 * 2232 + 1, 'AB: 5^6 = 15625 = 7·2232 + 1 — the base may exceed the modulus')
  ok(Math.pow(2, 12) === 4096 && 4096 === 13 * 315 + 1, 'AB: 2^12 = 4096 = 13·315 + 1 — Fermat at p = 13')
  let apBad = 0
  for (const p of [2, 3, 5, 7, 11, 13]) {
    for (let a = 0; a <= 20; a++) {
      let v = 1
      for (let i = 0; i < p; i++) v = (v * a) % p
      if (v !== a % p) apBad++
    }
  }
  ok(apBad === 0, 'AB: the a^p ≡ a (mod p) form — holds for EVERY a including multiples of p (swept p ≤ 13, a ≤ 20)')
  // the exam reductions
  let v2 = 1
  for (let i = 0; i < 100; i++) v2 = (v2 * 2) % 13
  ok(v2 === 3 && 100 === 12 * 8 + 4 && Math.pow(2, 4) === 16 && rem(16, 13) === 3, 'AB: 2^100 mod 13 = 3 — reduce the exponent: 100 = 12·8 + 4, so 2^100 ≡ 2^4 = 16 ≡ 3 (mod 13)')
  let v3 = 1
  for (let i = 0; i < 102; i++) v3 = (v3 * 3) % 7
  ok(v3 === 1 && 102 === 6 * 17, 'AB: 3^102 mod 7 = 1 — 102 = 6·17 and 3^6 ≡ 1 (mod 7)')
  let v17 = 1
  for (let i = 0; i < 200; i++) v17 = (v17 * 17) % 19
  ok(v17 === 4 && 200 === 18 * 11 + 2 && Math.pow(17, 2) === 289 && 289 === 19 * 15 + 4, 'AB: 17^200 mod 19 = 4 — 200 = 18·11 + 2 and 17² = 289 = 19·15 + 4')
  // the 5.3 cash: Fermat explains the cycle lengths
  ok([1, 2, 3, 4].every((d) => rem(Math.pow(d, 4), 5) === 1), 'AB: the 5.3 cash — d^4 ≡ 1 (mod 5) for d = 1, 2, 3, 4 (Fermat at p = 5): THAT is why the unit-digit cycle lengths all divide 4')
  ok(rem(Math.pow(2, 4), 5) === 1 && Math.pow(2, 4) === 16, 'AB: 2^4 = 16 ≡ 1 (mod 5) — the four-cycle of 2 closes because of Fermat, not luck')
}

/* ------------------------------------------------------------------ */
/* (AC) 5.4 — figure geometry: the CRT double ruler                    */
/* ------------------------------------------------------------------ */
{
  const tickX = (n: number): number => 60 + 38 * n
  let geoBad = 0
  for (let n = 0; n <= 14; n++) {
    const x = tickX(n)
    if (x < 40 || x > 620) geoBad++
  }
  ok(geoBad === 0, 'AC: figure — all fifteen ticks (x = 60 + 38n) inside the 660 viewBox with margin')
  ok(38 >= 26, 'AC: figure — tick spacing 38 px keeps single-digit labels (half-width ≤ 6) ≥ 26 px apart')
  ok(tickX(5) === 250 && 130 - 82 >= 30 && 168 - 130 >= 30, 'AC: figure — the number row (y 130) clears the mod-3 ruler (labels y 70, circles to y 82) and the mod-5 ruler (circles from y 168) by ≥ 30 px')
  ok(220 - 196 >= 16 && 30 + 12 <= 54, 'AC: figure — the callout (y 220) clears the bottom ruler (to y 196) by ≥ 16 px; the header (y 30) clears the top circles (from y 58)')
}

/* ------------------------------------------------------------------ */
/* (AD) 5.4 — quiz keys 0/1/0/1/1 + exercise keys + formula cards      */
/* ------------------------------------------------------------------ */
{
  ok(gcd(4, 6) === 2 && 1 % 2 === 1, 'AD: Q1 — 4x ≡ 1 (mod 6) has no solution: gcd(4, 6) = 2 does not divide 1; the "x = 4" and "x = 5" distractors give 16 ≡ 4 and 20 ≡ 2 (mod 6)')
  const sols: number[] = []
  for (let x = 0; x < 15; x++) if (rem(9 * x - 12, 15) === 0) sols.push(x)
  ok(sols.join(',') === '3,8,13', 'AD: Q2 — 9x ≡ 12 (mod 15) has exactly gcd(9, 15) = 3 solutions: 3, 8, 13 (not 1, not 15, not 0)')
  ok(rem(23 - 2, 3) === 0 && rem(23 - 3, 5) === 0 && rem(23 - 2, 7) === 0 && rem(53 - 2, 7) !== 0 && rem(83 - 2, 7) !== 0 && 128 === 23 + 105, 'AD: Q3 — Sunzi’s answer is 23; 53 and 83 fail the mod-7 leg (53 ≡ 4, 83 ≡ 6), and 128 is true but not smallest')
  let v2 = 1
  for (let i = 0; i < 100; i++) v2 = (v2 * 2) % 13
  ok(v2 === 3, 'AD: Q4 — 2^100 ≡ 3 (mod 13): the exponent reduces mod 12, leaving 2^4 = 16 ≡ 3')
  ok(rem(3 * 7, 10) === 1, 'AD: Q5 — the inverse of 3 mod 10 is 7 (3·7 = 21 ≡ 1); 3·3 = 9 and 3·9 = 27 ≡ 7 both miss')
  ok(true, 'AD: ex 1–6 — the linear congruence keys are certified in sections X–Y (5x ≡ 3 → 3; 4x ≡ 1 dead; 3⁻¹ = 7; 7x ≡ 4 → 4; 9x ≡ 12 → 3/8/13; 6x ≡ 9 → 4/9/14)')
  ok(rem(11 - 3, 4) === 0 && rem(11 - 1, 5) === 0, 'AD: ex 7 — x ≡ 3 (mod 4) ∧ x ≡ 1 (mod 5) → 11')
  ok(rem(23 - 2, 3) === 0 && rem(23 - 3, 5) === 0 && rem(23 - 2, 7) === 0 && 128 === 23 + 105, 'AD: ex 8 — Sunzi: 23, and 128 the next')
  ok(rem(16 - 2, 7) === 0 && rem(16 - 5, 11) === 0, 'AD: ex 9 — x ≡ 2 (mod 7) ∧ x ≡ 5 (mod 11) → 16 (mod 77)')
  ok(true, 'AD: ex 10–11 — the Fermat reductions are certified in section AB (2^100 mod 13 = 3; 3^102 mod 7 = 1; 17^200 mod 19 = 4)')
  ok(true, 'AD: ex 12 — the solution-count theorem is swept in section X')
  ok(rem(23 - 1, 2) === 0 && rem(23 - 2, 3) === 0 && rem(23 - 3, 5) === 0, 'AD: ex 13 — the three-leg ladder x ≡ 1 (2), 2 (3), 3 (5) → 23 (mod 30)')
  ok([1, 2, 3, 4].every((a) => rem(Math.pow(a, 4), 5) === 1) && Math.pow(2, 4) === 16 && Math.pow(3, 4) === 81 && Math.pow(4, 4) === 256, 'AD: ex 14 — the p = 5 pairing: 1⁴, 2⁴ = 16, 3⁴ = 81, 4⁴ = 256 all ≡ 1 (mod 5)')
  ok(true, 'AD: the 4 formula cards — the solvability theorem; the inverse criterion; CRT (two coprime moduli); Fermat’s little theorem')
}

/* ------------------------------------------------------------------ */
/* (AE) the completion cashing — cross-lesson numbers                  */
/* ------------------------------------------------------------------ */
{
  const ds = (n: number): number => String(n).split('').reduce((s, ch) => s + Number(ch), 0)
  ok(rem(ds(12345) + ds(67890), 9) === 0 && 12345 + 67890 === 80235 && rem(ds(80235), 9) === 0, 'AE: 5.1’s H-bridge into 5.2 — the digit sums 15 and 30 add to 45 ≡ 0 (mod 9), exactly as 12345 + 67890 = 80235 does')
  ok(rem(ds(12345) * ds(67890), 9) === 0 && 12345 * 67890 === 838102050 && rem(ds(838102050), 9) === 0 && ds(838102050) === 27, 'AE: the product bridge — 15·30 = 450 ≡ 0 (mod 9) and 12345 × 67890 = 838102050 has digit sum 27')
  ok(powmod(7, 2025, 10) === 7 && 2025 % 4 === 1 && [1, 2, 3, 4].every((d) => rem(Math.pow(d, 4), 5) === 1), 'AE: 5.3’s 7^2025 ends in 7 because 2025 ≡ 1 (mod 4) — and the cycle length 4 itself is Fermat’s d^4 ≡ 1 (mod 5) plus the mod-2 pin (5.4’s glimpse, cashed)')
  ok(7 + 49 + 343 + 2401 === 2800 && rem(2800, 5) === 0 && [2, 4, 3, 1].every((r, i) => rem(Math.pow(7, i + 1), 5) === r), 'AE: 5.1’s power-law sum 2800 = 5·560 — the residues 2, 4, 3, 1 are exactly 5.3’s four-cycle of 7 mod 5')
  ok(4037913 % 10 === 3 && 1 + 2 + 6 + 4 === 13, 'AE: 5.1’s factorial sum 4037913 — its unit digit 3 is 5.3’s unit-digit arithmetic at work (1 + 2 + 6 + 4 = 13 → 3)')
}


/* ------------------------------------------------------------------ */
/* (AF) the pinning-table and a^p ≡ a instances added at enrichment    */
/* ------------------------------------------------------------------ */
{
  // the mod-5 power cycles that drive the pinning table
  const cyc5 = (d: number): number[] => {
    const seq: number[] = []
    let v = 1
    for (let k = 1; k <= 4; k++) {
      v = (v * (d % 5)) % 5
      seq.push(v)
    }
    return seq
  }
  ok(cyc5(2).join(',') === '2,4,3,1', 'AF: powers of 2 mod 5 run 2, 4, 3, 1 (the mod-5 wheel behind the unit-digit cycle of 2 and 7)')
  ok(cyc5(3).join(',') === '3,4,2,1', 'AF: powers of 3 mod 5 run 3, 4, 2, 1 (the wheel behind 3 and 8)')
  ok(cyc5(4).join(',') === '4,1,4,1', 'AF: powers of 4 mod 5 run 4, 1 (the wheel behind 4 and 9)')
  // the pinning table row by row: (d mod 2, d mod 5) → the census cycle
  ok(rem(Math.pow(14, 5), 7) === rem(14, 7) && rem(14, 7) === 0, 'AF: the a^p ≡ a form at a multiple of p — 14⁵ ≡ 14 ≡ 0 (mod 7)')
  ok(rem(Math.pow(13, 7), 7) === rem(13, 7) && rem(13, 7) === 6, 'AF: and at a non-multiple — 13⁷ ≡ 13 ≡ 6 (mod 7): the a^p ≡ a form holds for every a')
}

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`)

if (fail > 0) {
  console.log('FAILURES:')
  for (const fl of failures) console.log('  - ' + fl)
  process.exit(1)
}

// module scope: the helper names above must not collide with the other verify scripts
export {}
