export {}

/**
 * enhance-fm-22-gen.ts — visual-upgrade run (job 507527): recompute-BEFORE-write
 * for lesson fm-subtraction-borrowing (FM 2.2, "Subtraction and Borrowing").
 *
 * Owner rule: every geometric value in a figure must be computed, never eyeballed.
 * This script:
 *   1. verifies the lesson's arithmetic independently (7-3 vs 3-7; the 4,589-2,764
 *      column walk with its single borrow at the hundreds seat; the 1,000-1
 *      dissolve with its lend chain; the shopkeeper's climb 2,764 -> 4,589 and
 *      its hand-over total; the inverse checks),
 *   2. derives the polished figure-1 geometry (hop arcs anchored exactly on the
 *      start/landing dot columns so each arc's chord EQUALS its hop: 210px =
 *      3 units on the 70px rail; 350px = 7 units on the 50px rail; arrowheads;
 *      rails with symmetric 10px overhangs; the bottom rail's dashed stretch
 *      spanning the whole negative territory -4..0 including its edge margin),
 *   3. derives the polished figure-2 geometry (the borrow arrow re-anchored
 *      exactly onto the lender and receiver column centres; the exchange-rate
 *      pill restyled to the run-4 carry-cell row metrics; symmetric sum-line
 *      overhangs; corrections at centre+33),
 *   4. derives the NEW figure-3 geometry (the 1,000-1 dissolve: three chained
 *      lend arrows travelling lender->receiver exactly between column centres,
 *      struck digits with small corrections 1->0, 0->9, 0->9, 0->10, the dashed
 *      dissolved-seat zone over the answer row's empty thousands slot),
 *   5. derives the NEW figure-4 geometry (the counting-up journey bar 2,764 ->
 *      4,589 drawn to TRUE scale: segment widths exactly proportional to the
 *      hand-overs 36/200/1,500/89, boundaries at the milestones, staggered
 *      milestone labels with binding ticks that provably cross nothing),
 *   6. runs width/collision checks on every text, and prints the exact SVGs to
 *      paste into ch-02.ts.
 */

/* ---------- 1. the lesson's arithmetic, independently re-verified ---------- */
const eq = (a: number | string, b: number | string, what: string) => {
  const ok = a === b
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}: ${a}${ok ? ' =' : ' ≠'} ${b}`)
  if (!ok) process.exit(1)
}

// figure 1 — the two number-line faces
eq(7 - 3, 4, '7 - 3 = 4 (stays on the whole-number line)')
eq(3 - 7 < 0 ? 'off' : 'on', 'off', '3 - 7 is not a whole number (3 < 7)')
eq(3 - 7, -4, 'the would-be landing point of 3 - 7 is -4')

// figure 2 — the 4,589 - 2,764 column walk
const walk = (a: number, b: number) => {
  const ad = String(a).split('').map(Number)
  const bd = String(b).padStart(ad.length, '0').split('').map(Number)
  const per: { top: number; bot: number; borrowed: number; written: number }[] = []
  let incoming = 0 // whether the column to the RIGHT borrowed from this column (this seat is a lender → its top digit drops by 1)
  const results: number[] = []
  const borrows: number[] = []
  for (let i = ad.length - 1; i >= 0; i--) {
    let top = ad[i] - incoming // the lender drops when it lent (can reach −1: a zero seat that lent)
    const bot = bd[i]
    const borrowed = top < bot ? 1 : 0
    if (borrowed === 1) top += 10
    const written = top - bot
    if (written < 0 || written > 9) throw new Error('impossible column')
    per.push({ top, bot, borrowed, written })
    results.push(written)
    borrows.push(borrowed)
    incoming = borrowed
  }
  const diff = Number(results.reverse().join(''))
  return { per, results, borrows, diff }
}
const w1 = walk(4589, 2764)
eq(w1.diff, 1825, '4,589 - 2,764 = 1,825')
eq(w1.per.map((c) => c.written).reverse().join(','), '1,8,2,5', 'written digits left→right: 1,8,2,5')
eq(w1.borrows.reverse().join(','), '0,1,0,0', 'borrow out of thousands/hundreds/tens/ones: 0,1,0,0 — ONE borrow, at the hundreds seat')
eq(5 < 7 ? 1 : 0, 1, 'hundreds: 5 < 7 — the seat cannot pay')
eq(15 - 7, 8, 'hundreds after the borrow: 15 - 7 = 8')
eq(4 - 1 - 2, 1, 'thousands: the lender reduced 4 → 3, pays 3 - 2 = 1')
eq(9 - 4, 5, 'ones: 9 - 4 = 5, paid outright')
eq(8 - 6, 2, 'tens: 8 - 6 = 2, paid outright')
eq(1825 + 2764, 4589, 'inverse check: 1,825 + 2,764 = 4,589 — certified')
eq(4589 - 1825, 2764, 'the inverse check read the other way')

// figure 3 — the 1,000 - 1 dissolve
const w2 = walk(1000, 1)
eq(w2.diff, 999, '1,000 - 1 = 999')
eq(w2.borrows.reverse().join(','), '0,1,1,1', 'borrow out of thousands/hundreds/tens/ones: 0,1,1,1 — the chain ripples through two zeros')
eq(0 < 1 ? 1 : 0, 1, 'ones: 0 < 1 — cannot pay')
eq(10 - 1, 9, 'ones after receiving 10: 10 - 1 = 9')
eq(10 - 1 - 0, 9, 'tens after receiving 10 and lending 1: 9 - 0 = 9')
eq(999 + 1, 1000, 'the mirror: 999 + 1 = 1,000 (Lesson 2.1 ripple)')
eq(String(1000).length - String(999).length, 1, 'the answer loses a digit seat — subtraction never grows the digit count')

// figure 4 — the shopkeeper's climb 2,764 → 4,589
const MILE = [2764 + 36, 2764 + 36 + 200, 2764 + 36 + 200 + 1500, 4589]
eq(MILE.join(','), '2800,3000,4500,4589', 'milestones: 2,800 · 3,000 · 4,500 · 4,589')
eq(36 + 200 + 1500 + 89, 1825, 'hand-overs: 36 + 200 + 1,500 + 89 = 1,825')
eq(2764 + 1825, 4589, 'the climb spans exactly the gap: 2,764 + 1,825 = 4,589')
eq(4589 - 2764, 1825, 'the gap is the difference itself')

/* ---------- shared text-width machinery (run-3 estimator, run-4 exact) ---------- */
const VB_W = 760
const W = (s: string, fs: number) => {
  let w = 0
  for (const ch of s) {
    if (/[A-Z]/.test(ch)) w += 0.66
    else if (/[a-z0-9.,()=]/.test(ch)) w += 0.55
    else if (ch === ' ') w += 0.28
    else if (/[−+×→·<>]/.test(ch)) w += 0.85
    else w += 0.6
  }
  return w * fs
}
const span = (s: string, fs: number, x: number, anchor: 'start' | 'middle' | 'end') => {
  const w = W(s, fs)
  return anchor === 'start' ? [x, x + w] : anchor === 'end' ? [x - w, x] : [x - w / 2, x + w / 2]
}
const inBounds = (s: string, fs: number, x: number, anchor: string, what: string) => {
  const [l, r] = span(s, fs, x, anchor as any)
  const ok = l >= 0 && r <= VB_W
  console.log(`${ok ? 'PASS' : 'FAIL'}  text in viewBox: ${what} [${l.toFixed(1)}..${r.toFixed(1)}] «${s}»`)
  if (!ok) process.exit(1)
  return [l, r] as const
}
const disjoint = (a: readonly number[], b: readonly number[], what: string) => {
  const ok = a[1] + 2 <= b[0] || b[1] + 2 <= a[0]
  console.log(`${ok ? 'PASS' : 'FAIL'}  no collision: ${what} [${a[0].toFixed(0)}..${a[1].toFixed(0)}] vs [${b[0].toFixed(0)}..${b[1].toFixed(0)}]`)
  if (!ok) process.exit(1)
}
// vertically staggered text rows: bands ≈ baseline−11 .. baseline+3 (13–15px digits, no descenders)
const vGap = (b1: number, b2: number, what: string) => {
  const band1 = [b1 - 11, b1 + 3]
  const band2 = [b2 - 11, b2 + 3]
  const ok = band1[1] + 2 <= band2[0] || band2[1] + 2 <= band1[0]
  console.log(`${ok ? 'PASS' : 'FAIL'}  no vertical collision: ${what} [${band1[0]}..${band1[1]}] vs [${band2[0]}..${band2[1]}]`)
  if (!ok) process.exit(1)
}

/* ---------- 2. figure 1 (number line, 760×258) ---------- */
console.log('\nfigure 1 — subtraction number line (two faces, one edge):')
const X0 = 60 // x of 0 on the TOP rail (70px pitch)
const P1 = 70
const xT = (n: number) => X0 + n * P1
eq(xT(4), 340, 'top x(4) = 340 (the landing dot of 7 - 3)')
eq(xT(7), 550, 'top x(7) = 550 (the start dot of 7 - 3)')
eq(xT(9), 690, 'top rightmost tick = 690')
eq(50, xT(0) - 10, 'top rail left edge = 10px past the 0 tick')
eq(700, xT(9) + 10, 'top rail right edge = 10px past the 9 tick')
const X0B = 60 // x of -4 on the BOTTOM rail (50px pitch)
const P2 = 50
const xB = (n: number) => X0B + (n + 4) * P2
eq(xB(-4), 60, 'bottom x(-4) = 60 (the dashed ghost landing of 3 - 7)')
eq(xB(0), 260, 'bottom x(0) = 260 (where the whole numbers end — the solid rail starts)')
eq(xB(3), 410, 'bottom x(3) = 410 (the start dot of 3 - 7)')
eq(xB(9), 710, 'bottom rightmost tick = 710')
eq(50, xB(-4) - 10, 'bottom rail left edge = 10px past the -4 tick (the dashed stretch covers the whole negative territory)')
eq(260, xB(0), 'the dashed stretch ends exactly at the 0 tick')
eq(720, xB(9) + 10, 'bottom solid rail right edge = 10px past the 9 tick')
// hop arcs: chords exactly equal to the hops they represent
const HOP_A = { start: [550, 82], ctrl: [445, 10], end: [340, 80] } as const
const HOP_B = { start: [410, 194], ctrl: [235, 122], end: [60, 192] } as const
eq(HOP_A.start[0] - HOP_A.end[0], 3 * P1, 'top arc chord = 3 units exactly (210px) on the 70px rail')
eq(HOP_B.start[0] - HOP_B.end[0], 7 * P2, 'bottom arc chord = 7 units exactly (350px) on the 50px rail')
// arcs anchored on their dots: starts at the start-dot column, ends at the landing column
eq(HOP_A.start[0], xT(7), 'top arc starts on the 7 column (start dot centre)')
eq(HOP_A.end[0], xT(4), 'top arc lands on the 4 column (landing dot centre)')
eq(HOP_B.start[0], xB(3), 'bottom arc starts on the 3 column')
eq(HOP_B.end[0], xB(-4), 'bottom arc lands on the -4 column (the dashed ghost)')
// vertical anchoring: 1px above dot tops (start r=5 → top 83; landing r=7 → top 81)
eq(HOP_A.start[1], 88 - 5 - 1, 'top arc starts 1px above the start-dot top (83)')
eq(HOP_A.end[1], 88 - 7 - 1, 'top arc ends 1px above the landing-dot top (81)')
eq(HOP_B.start[1], 200 - 5 - 1, 'bottom arc starts 1px above the start-dot top (195)')
eq(HOP_B.end[1], 200 - 7 - 1, 'bottom arc ends 1px above the ghost-circle top (193)')
// arc apexes (quadratic at t=1/2) and label clearance
type Curve = { readonly start: readonly number[]; readonly ctrl: readonly number[]; readonly end: readonly number[] }
const apex = (p: Curve) => [0.25 * p.start[0] + 0.5 * p.ctrl[0] + 0.25 * p.end[0], 0.25 * p.start[1] + 0.5 * p.ctrl[1] + 0.25 * p.end[1]]
const apA = apex(HOP_A)
const apB = apex(HOP_B)
eq(apA[0], 445, 'top apex x = 445 (label seat)')
eq(apB[0], 235, 'bottom apex x = 235 (label seat)')
console.log(`PASS  top apex y = ${apA[1]} — label «-3» (baseline 34) clears by ${(apA[1] - 34).toFixed(1)}px`)
console.log(`PASS  bottom apex y = ${apB[1]} — label «-7» (baseline 146) clears by ${(apB[1] - 146).toFixed(1)}px`)
eq(apA[1] - 34 > 5 && apB[1] - 146 > 5 ? 1 : 0, 1, 'both hop labels clear their apexes by >5px')
// titles clear the arcs horizontally
inBounds('7 - 3: start at 7, hop 3 left', 14, 30, 'start', 'top title')
inBounds('3 - 7: start at 3, hop 7 left', 14, 730, 'end', 'bottom title')
disjoint(span('7 - 3: start at 7, hop 3 left', 14, 30, 'start'), [HOP_A.end[0] - 2, 700], 'top title vs top arc zone')
disjoint(span('3 - 7: start at 3, hop 7 left', 14, 730, 'end'), [50, HOP_B.start[0] + 2], 'bottom title vs bottom arc zone')
inBounds('-3', 14, 445, 'middle', 'top hop label')
inBounds('-7', 14, 235, 'middle', 'bottom hop label')
// tick labels: single digits (bottom rail carries the minus sign)
const tw = W('0', 14)
console.log(`PASS  tick label width ≈${tw.toFixed(1)}px at ${P1}px / ${P2}px pitch`)
eq(P2 - tw > 20 ? 1 : 0, 1, 'bottom tick labels have >20px clear at the 50px pitch')
// the edge note
const NOTE1 = 'whole numbers end at 0 — the landing point -4 lies beyond the edge (Chapter 7: Integers)'
inBounds(NOTE1, 13, 380, 'middle', 'edge note')
eq(250 + 4 < 258 ? 1 : 0, 1, 'edge note (baseline 250) fits in viewBox height 258')
eq(226 + 4 < 258 ? 1 : 0, 1, 'bottom tick labels (baseline 226) fit in viewBox height 258')

/* ---------- 3. figure 2 (column subtraction, 760×290) ---------- */
console.log('\nfigure 2 — 4,589 - 2,764 seat map (the single borrow):')
const COLS = [215, 355, 495, 635] // thousands, hundreds, tens, ones centres
const CELL_X = [150, 290, 430, 570] // cell left edges (130 wide)
const ROW_Y = [94, 156] // digit row tops (46 tall)
eq(COLS[1] - COLS[0], 140, 'column centres 140px apart')
eq(CELL_X[0], COLS[0] - 65, 'cell left edges = centre − 65 (130-wide cells centred)')
eq(ROW_Y[1] - (ROW_Y[0] + 46), 16, 'row gap = 16px')
// the exchange-rate pill: run-4 carry-cell row metrics (y 24..58, rx 17)
const PILL = { x: 185, y: 24, w: 210, h: 34, rx: 17 } as const
eq(PILL.x + PILL.w / 2, 290, 'pill centred on x=290 (the lender→receiver midpoint band)')
const PILL_TXT = '1 thousand = 10 hundreds'
const pt = span(PILL_TXT, 14, 290, 'middle')
disjoint(pt, [PILL.x, PILL.x + 4], 'pill text inside the pill (left padding)')
disjoint([PILL.x + PILL.w - 4, PILL.x + PILL.w], pt, 'pill text inside the pill (right padding)')
// the borrow arrow: starts exactly at the LENDER column centre top, ends exactly
// at the RECEIVER column centre top, control at the chord midpoint
const BORROW = { start: [COLS[0], ROW_Y[0]], ctrl: [(COLS[0] + COLS[1]) / 2, 66], end: [COLS[1], ROW_Y[0]] }
eq(BORROW.start[0], 215, 'borrow arrow starts exactly at the thousands (lender) column centre')
eq(BORROW.end[0], 355, 'borrow arrow lands exactly at the hundreds (receiver) column centre')
eq(BORROW.ctrl[0], (215 + 355) / 2, 'control at the chord midpoint x (285)')
const apB2 = apex(BORROW as unknown as Curve)
console.log(`PASS  borrow arrow apex y = ${apB2[1].toFixed(1)} — pill bottom at 58 clears by ${(apB2[1] - 58).toFixed(1)}px`)
eq(apB2[1] - 58 > 10 ? 1 : 0, 1, 'the borrow arrow clears the pill bottom by >10px')
// the struck digits and their corrections (pencil bookkeeping)
const strike = (cx: number) => ({ x1: cx - 12, y1: 121, x2: cx + 12, y2: 107 })
const st1 = strike(COLS[0])
const st2 = strike(COLS[1])
eq(st1.x1, 203, 'strike over the 4: (203,121) → (227,107), crossing the digit centre')
eq(st2.x1, 343, 'strike over the 5: (343,121) → (367,107)')
const corr = (cx: number, txt: string) => ({ x: cx + 33, y: 112, txt })
const c1 = corr(COLS[0], '3')
const c2 = corr(COLS[1], '15')
eq(c1.x, 248, 'correction «3» at centre+33 = 248 (above-right of the struck 4)')
eq(c2.x, 388, 'correction «15» at centre+33 = 388 (above-right of the struck 5)')
disjoint(span('3', 14, c1.x, 'middle'), [COLS[0] + 10, COLS[0] + 22], '«3» clear of the struck 4 glyph')
disjoint(span('15', 14, c2.x, 'middle'), [COLS[1] + 10, COLS[1] + 22], '«15» clear of the struck 5 glyph')
disjoint(span('15', 14, c2.x, 'middle'), [CELL_X[1] + 126, 760], '«15» inside the hundreds cell')
// sum line: symmetric overhangs around the cell block (150..700)
eq(140, CELL_X[0] - 10, 'sum line starts 10px left of the cell block')
eq(710, 700 + 10, 'sum line ends 10px right of the cell block')
// row labels and the note
inBounds('4,589', 14, 80, 'start', 'row-1 label')
inBounds('2,764', 14, 80, 'start', 'row-2 label')
disjoint(span('4,589', 14, 80, 'start'), [CELL_X[0], 700], 'row-1 label vs cells')
inBounds('the borrow', 14, 30, 'start', 'the-borrow label')
disjoint(span('the borrow', 14, 30, 'start'), [PILL.x, 760], 'the-borrow label vs the pill (rect starts at 185)')
const NOTE2 = 'hundreds: 5 < 7 → borrow → 15 - 7 = 8 · lender 4 → 3, pays 3 - 2 · ones and tens pay outright: 9 - 4, 8 - 6'
const n2 = inBounds(NOTE2, 12, 80, 'start', 'figure-2 note')
eq(n2[1] < 760 ? 1 : 0, 1, 'figure-2 note stays inside the viewBox (kept at 12px — 13 would overflow; run-3 precedent)')
eq(282 + 4 < 290 ? 1 : 0, 1, 'figure-2 note (baseline 282) fits in viewBox height 290')
// the note's arithmetic matches the walk, read right→left as the columns are walked
eq(9 - 4, 5, 'note: ones 9 - 4 (paid outright)')
eq(8 - 6, 2, 'note: tens 8 - 6 (paid outright)')

/* ---------- 4. figure 3 (NEW: the 1,000 − 1 dissolve, 760×290) ---------- */
console.log('\nfigure 3 — 1,000 − 1, the dissolve and the burnt seat:')
// same column grammar as figure 2
eq(COLS[0], 215, 'dissolved-seat column centre = 215 (thousands seat)')
eq(COLS[3], 635, 'ones column centre = 635')
// three chained lend arrows: each starts exactly at a lender column centre top
// and lands exactly at the next-right receiver column centre top — the chain
// travels rightward, the exact mirror of the ripple's leftward carries
const lend = (from: number, to: number) => ({ start: [from, ROW_Y[0]], ctrl: [(from + to) / 2, 66], end: [to, ROW_Y[0]] })
const L1 = lend(COLS[0], COLS[1])
const L2 = lend(COLS[1], COLS[2])
const L3 = lend(COLS[2], COLS[3])
eq(L1.start[0], 215, 'lend 1: thousands → hundreds (the seat with the only counter)')
eq(L1.end[0], 355, 'lend 1 lands exactly on the hundreds centre')
eq(L2.start[0], 355, 'lend 2: hundreds → tens (it received 10, lends 1, keeps 9)')
eq(L2.end[0], 495, 'lend 2 lands exactly on the tens centre')
eq(L3.start[0], 495, 'lend 3: tens → ones')
eq(L3.end[0], 635, 'lend 3 lands exactly on the ones centre')
eq(L2.start[0] === L1.end[0] && L3.start[0] === L2.end[0] ? 1 : 0, 1, 'the three arrows CHAIN head-to-tail — cash flows back down the chain')
eq(L1.end[0] - L1.start[0], 140, 'each lend arrow spans exactly one seat (140px, centre to centre)')
eq(L3.end[0] - L3.start[0], 140, 'the last lend arrow spans exactly one seat too — equal spans, a uniform chain')
// the dissolve label row
inBounds('lends →', 14, 30, 'start', 'lends label')
disjoint(span('lends →', 14, 30, 'start'), [L1.start[0] - 30, 760], 'lends label vs the leftmost arrow zone')
// struck digits + corrections: 1→0, 0→9, 0→9, 0→10
const D3 = [
  { cx: COLS[0], digit: '1', corr: '0' },
  { cx: COLS[1], digit: '0', corr: '9' },
  { cx: COLS[2], digit: '0', corr: '9' },
  { cx: COLS[3], digit: '0', corr: '10' },
]
eq(D3.map((d) => d.corr).join(','), '0,9,9,10', 'corrections: 1→0 (lends everything), 0→9, 0→9, 0→10 (receives the full ten)')
eq(D3[1].corr, '9', 'each middle seat ends as 9 — received 10, lent 1, kept 9 (the lesson\'s own sentence)')
for (const d of D3) {
  disjoint(span(d.corr, 14, d.cx + 33, 'middle'), [d.cx + 10, d.cx + 22], `«${d.corr}» clear of the struck ${d.digit}`)
}
disjoint(span('10', 14, COLS[3] + 33, 'middle'), [CELL_X[3] + 126, 760], '«10» inside the ones cell')
// the bottom row: the subtrahend 1 padded into its seats (faint zeros)
eq([0, 0, 0, 1].join(','), '0,0,0,1', 'bottom row digits: the subtrahend padded to 0,0,0,1 — THREE faint zeros + the 1')
// the answer row: no thousands digit (leading zero drops), three nines
eq([undefined, 9, 9, 9].filter((x) => x !== undefined).join(','), '9,9,9', 'answer digits: 9,9,9 — the three nines manufactured by the chain')
// the dissolved-seat zone over the ANSWER row's thousands slot
const ZONE = { x: 150, y: 218, w: 130, h: 40 } as const
eq(ZONE.x, CELL_X[0], 'zone left edge = thousands column cell edge')
eq(ZONE.w, 130, 'zone width = one column')
eq(ZONE.y, 214 + 4, 'zone top = 4px below the sum line (214)')
eq(ZONE.y + ZONE.h, 258, 'zone bottom = 258 (answer-row band)')
const ZTAG = 'the dissolved seat'
const zt = inBounds(ZTAG, 13, 215, 'middle', 'the-dissolved-seat tag')
disjoint(zt, [ZONE.x - 4, ZONE.x], 'dissolved-seat tag inside its zone (left margin)')
disjoint([ZONE.x + ZONE.w, ZONE.x + ZONE.w + 4], zt, 'dissolved-seat tag inside its zone (right margin)')
// row labels
inBounds('1,000', 14, 80, 'start', 'row-1 label 1,000')
inBounds('1', 14, 80, 'start', 'row-2 label 1')
disjoint(span('1,000', 14, 80, 'start'), [CELL_X[0], 700], 'label 1,000 vs cells')
// the note
const NOTE3 = 'zeros: receive 10, lend 1, keep 9 · ones: 10 - 1 = 9 · the seat dissolves · 999'
inBounds(NOTE3, 13, 150, 'start', 'figure-3 note')
eq(282 + 4 < 290 ? 1 : 0, 1, 'figure-3 note (baseline 282) fits in viewBox height 290')

/* ---------- 5. figure 4 (NEW: the counting-up journey bar, 760×250) ---------- */
console.log('\nfigure 4 — the shopkeeper\'s climb 2,764 → 4,589 (true scale):')
const BAR = { x0: 60, x1: 720, y: 96, h: 40 } as const
const SPAN_UNITS = 4589 - 2764
eq(SPAN_UNITS, 1825, 'the bar spans exactly the difference: 1,825 units')
const S = (BAR.x1 - BAR.x0) / SPAN_UNITS // px per unit
const cum = (v: number) => BAR.x0 + (v - 2764) * S
const b0 = cum(2764)
const b1 = cum(2800)
const b2 = cum(3000)
const b3 = cum(4500)
const b4 = cum(4589)
eq(b0, 60, 'boundary 2,764 at x=60')
eq(Math.abs(b1 - 73.02) < 0.01 ? 1 : 0, 1, `boundary 2,800 at x=${b1.toFixed(2)} (36 units → 13.02px)`)
eq(Math.abs(b2 - 145.35) < 0.01 ? 1 : 0, 1, `boundary 3,000 at x=${b2.toFixed(2)} (236 units → 85.35px)`)
eq(Math.abs(b3 - 687.81) < 0.01 ? 1 : 0, 1, `boundary 4,500 at x=${b3.toFixed(2)} (1,736 units → 627.81px)`)
eq(b4, 720, 'boundary 4,589 at x=720')
const seg = [b1 - b0, b2 - b1, b3 - b2, b4 - b3]
eq(Math.abs(seg[0] / seg[2] - 36 / 1500) < 1e-9 ? 1 : 0, 1, 'segment widths exactly proportional: +36 / +1,500 = 36/1,500')
eq(Math.abs(seg[1] / seg[2] - 200 / 1500) < 1e-9 ? 1 : 0, 1, '+200 / +1,500 = 200/1,500')
eq(Math.abs(seg[3] / seg[2] - 89 / 1500) < 1e-9 ? 1 : 0, 1, '+89 / +1,500 = 89/1,500')
eq(Math.abs(seg[0] + seg[1] + seg[2] + seg[3] - (720 - 60)) < 1e-9 ? 1 : 0, 1, 'the four segments partition the bar exactly (sum = 660px)')
console.log(`PASS  segment widths: +36 → ${seg[0].toFixed(2)}px · +200 → ${seg[1].toFixed(2)}px · +1,500 → ${seg[2].toFixed(2)}px · +89 → ${seg[3].toFixed(2)}px`)
eq(seg[0] > 8 ? 1 : 0, 1, 'the smallest segment (+36) is still drawn wide enough to see (13.02px ≥ 8px)')
// the labels, staggered so nothing collides on the true scale
const R1 = 56 // bold end row (2,764 / 4,589)
const R2 = 78 // milestone row (2,800 / 3,000 / 4,500)
const e0 = span('2,764', 15, 60, 'middle')
const e4 = span('4,589', 15, 720, 'middle')
const m1 = span('2,800', 13, b1, 'start') // start-anchored: its tick sits at its left edge
const m2 = span('3,000', 13, b2, 'middle')
const m3 = span('4,500', 13, b3, 'middle')
inBounds('2,764', 15, 60, 'middle', 'end label 2,764')
inBounds('4,589', 15, 720, 'middle', 'end label 4,589')
inBounds('2,800', 13, b1, 'start', 'milestone 2,800')
inBounds('3,000', 13, b2, 'middle', 'milestone 3,000')
inBounds('4,500', 13, b3, 'middle', 'milestone 4,500')
vGap(R1, R2, 'end 2,764 (row y=56) vs milestone 2,800 (row y=78) — 22px stagger, ~8px clear band')
vGap(R1, R2, 'end 4,589 (row y=56) vs milestone 4,500 (row y=78) — 22px stagger, ~8px clear band')
disjoint(m2, m3, 'milestones 3,000 vs 4,500')
disjoint(m1, m2, 'milestones 2,800 vs 3,000 (13px apart on the true scale)')
// the binding ticks cross nothing: 2,764's tick at x=60 passes the milestone row band
// only where no milestone text sits (2,800 starts at x=73.02); same on the right
// (4,589's tick at x=720 vs 4,500 ending at x≈706)
eq(m1[0] >= b1 - 1 ? 1 : 0, 1, '2,800 label sits exactly at its tick (start-anchored at the boundary)')
disjoint([59, 61], m1, "2,764's binding tick (x=60) crosses nothing in the milestone row")
disjoint([719, 721], m3, "4,589's binding tick (x=720) crosses nothing in the milestone row")
// hop labels below the bar, centred under their segments
const HOPS = ['+36', '+200', '+1,500', '+89']
const hopCx = [(b0 + b1) / 2, (b1 + b2) / 2, (b2 + b3) / 2, (b3 + b4) / 2]
for (let i = 0; i < 4; i++) inBounds(HOPS[i], 14, hopCx[i], 'middle', `hop label ${HOPS[i]}`)
disjoint(span('+36', 14, hopCx[0], 'middle'), span('+200', 14, hopCx[1], 'middle'), 'hop labels +36 vs +200')
disjoint(span('+1,500', 14, hopCx[2], 'middle'), span('+89', 14, hopCx[3], 'middle'), 'hop labels +1,500 vs +89')
// hop connector ticks stop 4px above the label band (overlap-audit catch: y2=158 ran into the label top ≈154)
eq(150 + 4 <= 166 - 11 ? 1 : 0, 1, 'hop ticks end (150) clear of the hop-label band top (155) by 5px')
// left label and the arrival arrowhead
inBounds('the shopkeeper\'s climb:', 14, 30, 'start', 'left label')
vGap(34, 56, 'left label (row y=34) vs the 2,764 end label (row y=56) — staggered rows, ~8px clear band')
const ARROW = { x: 722, y: 108, tip: 736, mid: 116, y2: 124 } as const
eq(ARROW.tip, 736, 'arrival arrowhead tip at x=736 (past the bar end, inside the viewBox)')
eq(ARROW.y, BAR.y + 12, 'arrowhead vertically centred on the bar (96 + 20 → mid 116, drawn 108..124)')
// the note
const NOTE4 = '36 + 200 + 1,500 + 89 = 1,825 — the same difference, found with no borrow'
inBounds(NOTE4, 13, 150, 'start', 'figure-4 note')
eq(226 + 4 < 250 ? 1 : 0, 1, 'figure-4 note (baseline 226) fits in viewBox height 250')
eq(166 + 4 < 250 ? 1 : 0, 1, 'hop labels (baseline 166) fit in viewBox height 250')

/* ---------- 6. print the final SVGs ---------- */
const f2 = (n: number) => (Number.isInteger(n) ? n.toFixed(0) : n.toFixed(2))
const arrowMarker = (id: string, fill: string) =>
  `<defs><marker id="${id}" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="${fill}"/></marker></defs>`

/* figure 1 — the number line: 7-3 lands, 3-7 falls off the edge */
const ticksTop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  .map((n) => `      <line x1="${xT(n)}" y1="82" x2="${xT(n)}" y2="94" stroke="currentColor" stroke-width="1.5" opacity="0.55"/><text x="${xT(n)}" y="114" text-anchor="middle" opacity="0.85">${n}</text>`)
  .join('\n')
const ticksBot = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  .map((n) => `      <line x1="${xB(n)}" y1="194" x2="${xB(n)}" y2="206" stroke="currentColor" stroke-width="1.5" opacity="${n < 0 ? 0.4 : 0.55}"/><text x="${xB(n)}" y="226" text-anchor="middle" opacity="${n < 0 ? 0.55 : 0.85}">${n}</text>`)
  .join('\n')
const svg1 = `<svg viewBox="0 0 760 258" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line showing 7 minus 3 landing on 4, and 3 minus 7 falling off the left edge of the whole numbers">
  ${arrowMarker('nl-hop', '#ea580c')}
  <g font-size="14" fill="currentColor">
    <text x="30" y="52" opacity="0.75" text-anchor="start">7 - 3: start at 7, hop 3 left</text>
    <line x1="50" y1="88" x2="700" y2="88" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
${ticksTop}
    </g>
    <circle cx="${xT(7)}" cy="88" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="${xT(4)}" cy="88" r="7" fill="#ea580c"/>
    <path d="M ${HOP_A.start[0]} ${HOP_A.start[1]} Q ${HOP_A.ctrl[0]} ${HOP_A.ctrl[1]} ${HOP_A.end[0]} ${HOP_A.end[1]}" fill="none" stroke="#ea580c" stroke-width="2.5" marker-end="url(#nl-hop)"/>
    <text x="445" y="34" text-anchor="middle" font-weight="700" fill="#ea580c">-3</text>
    <text x="730" y="164" opacity="0.75" text-anchor="end">3 - 7: start at 3, hop 7 left</text>
    <line x1="260" y1="200" x2="720" y2="200" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <line x1="50" y1="200" x2="260" y2="200" stroke="currentColor" stroke-width="1.5" opacity="0.45" stroke-dasharray="4 4"/>
    <g text-anchor="middle">
${ticksBot}
    </g>
    <circle cx="${xB(3)}" cy="200" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="${xB(-4)}" cy="200" r="7" fill="none" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="4 3"/>
    <path d="M ${HOP_B.start[0]} ${HOP_B.start[1]} Q ${HOP_B.ctrl[0]} ${HOP_B.ctrl[1]} ${HOP_B.end[0]} ${HOP_B.end[1]}" fill="none" stroke="#ea580c" stroke-width="2.5" marker-end="url(#nl-hop)"/>
    <text x="235" y="146" text-anchor="middle" font-weight="700" fill="#ea580c">-7</text>
    <text x="380" y="250" text-anchor="middle" font-size="13" opacity="0.7">${NOTE1}</text>
  </g>
</svg>`

/* figure 2 — column subtraction of 4,589 − 2,764 (the single borrow) */
const svg2 = `<svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Column subtraction of 4589 minus 2764 with one borrow: the thousands seat lends one to the hundreds seat">
  ${arrowMarker('bo-arrow', '#ea580c')}
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="30" y="46" opacity="0.75" text-anchor="start">the borrow</text>
    <rect x="${PILL.x}" y="${PILL.y}" width="${PILL.w}" height="${PILL.h}" rx="${PILL.rx}" fill="#ea580c" opacity="0.16" stroke="#ea580c" stroke-width="1.5"/>
    <text x="290" y="46" font-weight="700" fill="#ea580c">${PILL_TXT}</text>
    <text x="80" y="120" opacity="0.75" text-anchor="start">4,589</text>
    <text x="80" y="182" opacity="0.75" text-anchor="start">2,764</text>
    <g stroke="currentColor" stroke-width="1.5" opacity="0.5" fill="none">
      <rect x="150" y="94" width="130" height="46" rx="6"/><rect x="290" y="94" width="130" height="46" rx="6"/><rect x="430" y="94" width="130" height="46" rx="6"/><rect x="570" y="94" width="130" height="46" rx="6"/>
      <rect x="150" y="156" width="130" height="46" rx="6"/><rect x="290" y="156" width="130" height="46" rx="6"/><rect x="430" y="156" width="130" height="46" rx="6"/><rect x="570" y="156" width="130" height="46" rx="6"/>
    </g>
    <g font-size="22" font-weight="700">
      <text x="215" y="124">4</text><text x="355" y="124">5</text><text x="495" y="124">8</text><text x="635" y="124">9</text>
      <text x="215" y="186">2</text><text x="355" y="186">7</text><text x="495" y="186">6</text><text x="635" y="186">4</text>
    </g>
    <g stroke="currentColor" stroke-width="1.5" opacity="0.8">
      <line x1="${st1.x1}" y1="${st1.y1}" x2="${st1.x2}" y2="${st1.y2}"/>
      <line x1="${st2.x1}" y1="${st2.y1}" x2="${st2.x2}" y2="${st2.y2}"/>
    </g>
    <g font-size="14" font-weight="700" fill="#ea580c">
      <text x="${c1.x}" y="112">3</text>
      <text x="${c2.x}" y="112">15</text>
    </g>
    <g stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4 3" fill="none" opacity="0.8">
      <path d="M ${BORROW.start[0]} ${BORROW.start[1]} Q ${BORROW.ctrl[0]} ${BORROW.ctrl[1]} ${BORROW.end[0]} ${BORROW.end[1]}" marker-end="url(#bo-arrow)"/>
    </g>
    <line x1="140" y1="214" x2="710" y2="214" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700" fill="#ea580c">
      <text x="215" y="252">1</text><text x="355" y="252">8</text><text x="495" y="252">2</text><text x="635" y="252">5</text>
    </g>
    <text x="80" y="282" font-size="12" opacity="0.8" text-anchor="start">${NOTE2}</text>
  </g>
</svg>`

/* figure 3 — 1,000 − 1: the dissolve and the burnt seat (NEW) */
const svg3 = `<svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Column subtraction of 1000 minus 1: the borrow request travels across the two middle zeros to the thousands seat, the cash flows back as three lends, each middle seat receives 10, lends 1 and keeps 9, the ones pays 10 minus 1 = 9, and the thousands seat empties and its digit drops away, giving 999">
  ${arrowMarker('lend-arrow', '#ea580c')}
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="30" y="46" opacity="0.75" text-anchor="start">lends →</text>
    <text x="80" y="120" opacity="0.75" text-anchor="start">1,000</text>
    <text x="80" y="186" opacity="0.75" text-anchor="start">1</text>
    <g stroke="currentColor" stroke-width="1.5" opacity="0.5" fill="none">
      <rect x="150" y="94" width="130" height="46" rx="6"/><rect x="290" y="94" width="130" height="46" rx="6"/><rect x="430" y="94" width="130" height="46" rx="6"/><rect x="570" y="94" width="130" height="46" rx="6"/>
      <rect x="150" y="156" width="130" height="46" rx="6"/><rect x="290" y="156" width="130" height="46" rx="6"/><rect x="430" y="156" width="130" height="46" rx="6"/><rect x="570" y="156" width="130" height="46" rx="6"/>
    </g>
    <g font-size="22" font-weight="700">
      <text x="215" y="124">1</text><text x="355" y="124">0</text><text x="495" y="124">0</text><text x="635" y="124">0</text>
      <text x="215" y="186" opacity="0.45">0</text><text x="355" y="186" opacity="0.45">0</text><text x="495" y="186" opacity="0.45">0</text><text x="635" y="186">1</text>
    </g>
    <g stroke="currentColor" stroke-width="1.5" opacity="0.8">
      <line x1="${strike(COLS[0]).x1}" y1="121" x2="${strike(COLS[0]).x2}" y2="107"/>
      <line x1="${strike(COLS[1]).x1}" y1="121" x2="${strike(COLS[1]).x2}" y2="107"/>
      <line x1="${strike(COLS[2]).x1}" y1="121" x2="${strike(COLS[2]).x2}" y2="107"/>
      <line x1="${strike(COLS[3]).x1}" y1="121" x2="${strike(COLS[3]).x2}" y2="107"/>
    </g>
    <g font-size="14" font-weight="700" fill="#ea580c">
      <text x="${COLS[0] + 33}" y="112">0</text>
      <text x="${COLS[1] + 33}" y="112">9</text>
      <text x="${COLS[2] + 33}" y="112">9</text>
      <text x="${COLS[3] + 33}" y="112">10</text>
    </g>
    <g stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4 3" fill="none" opacity="0.8">
      <path d="M ${L1.start[0]} ${L1.start[1]} Q ${L1.ctrl[0]} ${L1.ctrl[1]} ${L1.end[0]} ${L1.end[1]}" marker-end="url(#lend-arrow)"/>
      <path d="M ${L2.start[0]} ${L2.start[1]} Q ${L2.ctrl[0]} ${L2.ctrl[1]} ${L2.end[0]} ${L2.end[1]}" marker-end="url(#lend-arrow)"/>
      <path d="M ${L3.start[0]} ${L3.start[1]} Q ${L3.ctrl[0]} ${L3.ctrl[1]} ${L3.end[0]} ${L3.end[1]}" marker-end="url(#lend-arrow)"/>
    </g>
    <line x1="140" y1="214" x2="710" y2="214" stroke="currentColor" stroke-width="2"/>
    <rect x="${ZONE.x}" y="${ZONE.y}" width="${ZONE.w}" height="${ZONE.h}" rx="6" fill="none" stroke="#0d9488" stroke-width="1.5" stroke-dasharray="6 4"/>
    <text x="215" y="243" font-size="13" fill="#0f766e">${ZTAG}</text>
    <g font-size="22" font-weight="700" fill="#ea580c">
      <text x="355" y="252">9</text><text x="495" y="252">9</text><text x="635" y="252">9</text>
    </g>
    <text x="150" y="282" font-size="13" opacity="0.8" text-anchor="start">${NOTE3}</text>
  </g>
</svg>`

/* figure 4 — the shopkeeper's climb (NEW) */
const hopTicks = HOPS.map((h, i) => `    <line x1="${f2(hopCx[i])}" y1="136" x2="${f2(hopCx[i])}" y2="150" stroke="#ea580c" stroke-width="1.5" opacity="0.7"/>`)
  .join('\n')
const hopLabels = HOPS.map((h, i) => `    <text x="${f2(hopCx[i])}" y="166" font-weight="700" fill="#ea580c">${h}</text>`)
  .join('\n')
const svg4 = `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A journey bar from 2,764 to 4,589 drawn to true scale, partitioned into four hand-overs of widths 36, 200, 1,500 and 89: the counting-up method reaches the difference 1,825 by adding up from the subtrahend to the minuend without a single borrow">
  <g font-size="14" fill="currentColor">
    <text x="30" y="34" opacity="0.75" text-anchor="start">the shopkeeper's climb:</text>
    <line x1="60" y1="60" x2="60" y2="96" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="60" y="56" font-size="15" font-weight="700" text-anchor="middle">2,764</text>
    <line x1="${f2(b1)}" y1="82" x2="${f2(b1)}" y2="96" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="${f2(b1)}" y="78" font-size="13" text-anchor="start">2,800</text>
    <line x1="${f2(b2)}" y1="82" x2="${f2(b2)}" y2="96" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="${f2(b2)}" y="78" font-size="13" text-anchor="middle">3,000</text>
    <line x1="${f2(b3)}" y1="82" x2="${f2(b3)}" y2="96" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="${f2(b3)}" y="78" font-size="13" text-anchor="middle">4,500</text>
    <line x1="720" y1="60" x2="720" y2="96" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="720" y="56" font-size="15" font-weight="700" text-anchor="middle">4,589</text>
    <rect x="60" y="96" width="660" height="40" fill="#ea580c" opacity="0.13" stroke="#ea580c" stroke-width="1.5"/>
    <g stroke="#ea580c" stroke-width="1.5" opacity="0.7">
      <line x1="${f2(b1)}" y1="96" x2="${f2(b1)}" y2="136"/>
      <line x1="${f2(b2)}" y1="96" x2="${f2(b2)}" y2="136"/>
      <line x1="${f2(b3)}" y1="96" x2="${f2(b3)}" y2="136"/>
    </g>
${hopTicks}
${hopLabels}
    <polygon points="722,108 736,116 722,124" fill="#ea580c"/>
    <text x="150" y="226" font-size="13" opacity="0.8" text-anchor="start">${NOTE4}</text>
  </g>
</svg>`

console.log('\n=== FINAL SVG 1 (subtraction number line — upgraded) ===\n')
console.log(svg1)
console.log('\n=== FINAL SVG 2 (column subtraction 4,589 − 2,764 — upgraded) ===\n')
console.log(svg2)
console.log('\n=== FINAL SVG 3 (1,000 − 1 dissolve — NEW) ===\n')
console.log(svg3)
console.log('\n=== FINAL SVG 4 (the shopkeeper climb — NEW) ===\n')
console.log(svg4)
console.log('\nALL CHECKS CLEAN — 4 SVGs ready to paste into ch-02.ts')
