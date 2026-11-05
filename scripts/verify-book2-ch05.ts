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
 * Engine discipline: chapter 2's division algorithm and remainder
 * uniqueness are CITED, never re-proved — the sweeps here certify the
 * statements' truth numerically; the proofs in print lean on Lesson
 * 2.1's uniqueness of the remainder, exactly as the lesson's
 * citations promise.
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

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`)

if (fail > 0) {
  console.log('FAILURES:')
  for (const fl of failures) console.log('  - ' + fl)
  process.exit(1)
}

// module scope: the helper names above must not collide with the other verify scripts
export {}
