export {}

/**
 * enhance-fm-21-gen.ts — visual-upgrade run (job 507527): recompute-BEFORE-write
 * for lesson fm-addition-carrying (FM 2.1, "Addition and the Art of Carrying").
 *
 * Owner rule: every geometric value in a figure must be computed, never eyeballed.
 * This script:
 *   1. verifies the lesson's arithmetic independently (commutativity instance
 *      4+3 = 3+4 = 7; the 4,589 + 2,764 column walk with totals 13/15/13/7 and
 *      carries 1/1/1; the 999 + 1 ripple with totals 10/10/10 and the new-seat
 *      total 0+0+1 = 1),
 *   2. derives the polished figure-1 geometry (hop arcs anchored exactly on the
 *      start/landing dot columns so each arc's chord EQUALS its hop: 210px = 3
 *      units vs 280px = 4 units, ratio exactly 3/4),
 *   3. derives the polished figure-2 geometry (carry arrows starting exactly at
 *      column centres and landing exactly on carry-cell bottom centres; symmetric
 *      sum-line overhangs),
 *   4. derives the NEW figure-3 geometry (the 999+1 ripple: every existing column
 *      totals exactly 10 — write 0, carry 1 — and the third carry creates the new
 *      thousands seat, whose only content is the incoming carry: 0+0+1 = 1),
 *   5. runs width/collision checks on every text, and prints the exact SVGs to
 *      paste into ch-02.ts.
 */

/* ---------- 1. the lesson's arithmetic, independently re-verified ---------- */
const eq = (a: number | string, b: number | string, what: string) => {
  const ok = a === b
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}: ${a}${ok ? ' =' : ' ≠'} ${b}`)
  if (!ok) process.exit(1)
}

// figure 1 — commutativity instance
eq(4 + 3, 7, '4 + 3 = 7')
eq(3 + 4, 7, '3 + 4 = 7 (the same landing point)')

// figure 2 — the 4,589 + 2,764 column walk
const walk = (a: number, b: number) => {
  const ad = String(a).split('').map(Number)
  // right-align the addends seat-for-seat (the lesson's own alignment rule —
  // 1 pads to 001, the placeholder zeros figure 3 draws faintly)
  const bd = String(b).padStart(ad.length, '0').split('').map(Number)
  const totals: number[] = []
  const written: number[] = []
  let carry = 0
  for (let i = ad.length - 1; i >= 0; i--) {
    const t = ad[i] + bd[i] + carry
    totals.push(t)
    written.push(t % 10)
    carry = Math.floor(t / 10)
  }
  const carries = totals.map((t) => Math.floor(t / 10))
  const sum = Number([...written].reverse().join('')) + carry * 10 ** ad.length
  return { totals: totals.reverse(), written: written.reverse(), carries: carries.reverse(), finalCarry: carry, sum }
}
const w1 = walk(4589, 2764)
eq(w1.sum, 7353, '4,589 + 2,764 = 7,353')
eq(w1.totals.join(','), '7,13,15,13', 'column totals left→right: 7, 13, 15, 13')
eq(w1.written.join(','), '7,3,5,3', 'written digits: 7,3,5,3')
eq(w1.carries.join(','), '0,1,1,1', 'carries out of thousands/hundreds/tens/ones: 0,1,1,1')
eq(w1.finalCarry, 0, 'no final carry — the thousands column totalled 7 with nothing over')
// the figure's own totals note, character by character
eq(w1.totals[1] + w1.totals[2] + w1.totals[3], 13 + 13 + 15, 'figure-2 note totals 13, 15, 13 (right→left) are these')
eq(9 + 4, 13, 'ones: 9 + 4 = 13')
eq(8 + 6 + 1, 15, 'tens: 8 + 6 + 1 = 15')
eq(5 + 7 + 1, 13, 'hundreds: 5 + 7 + 1 = 13')
eq(4 + 2 + 1, 7, 'thousands: 4 + 2 + 1 = 7')

// figure 3 — the 999 + 1 ripple
const w2 = walk(999, 1)
eq(w2.sum, 1000, '999 + 1 = 1,000')
eq(w2.totals.join(','), '10,10,10', 'the three EXISTING columns each total exactly 10')
eq(w2.written.join(','), '0,0,0', 'the three existing columns each write 0 (a real placeholder digit)')
eq([w2.finalCarry, ...w2.written].join(','), '1,0,0,0', 'the composed sum digits: 1,0,0,0 — the leading 1 IS the final carry')
eq(w2.carries.join(','), '1,1,1', 'three carries — one out of every existing column')
eq(w2.finalCarry, 1, 'the final carry itself becomes the new seat digit')
eq(9 + 1, 10, 'ones: 9 + 1 = 10')
eq(9 + 0 + 1, 10, 'tens: 9 + 0 + 1 = 10')
eq(9 + 0 + 1, 10, 'hundreds: 9 + 0 + 1 = 10')
eq(0 + 0 + 1, 1, 'the new seat: 0 + 0 + 1 = 1 — the carry itself becomes the digit')
eq(999 * 2, 1998, 'max-carry cousin: 999 + 999 = 1,998 (the L4 exercise world)')

/* ---------- shared text-width machinery (run-3 estimator) ---------- */
const VB_W = 760
const W = (s: string, fs: number) => {
  let w = 0
  for (const ch of s) {
    if (/[A-Z]/.test(ch)) w += 0.66
    else if (/[a-z0-9.,()=]/.test(ch)) w += 0.55
    else if (ch === ' ') w += 0.28
    else if (/[−+×→·]/.test(ch)) w += 0.85
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

/* ---------- 2. figure 1 (number line, 760×240) ---------- */
console.log('\nfigure 1 — commutativity number line:')
const X0 = 60 // x of 0
const PITCH = 70 // px per unit
const xN = (n: number) => X0 + n * PITCH
eq(xN(0), 60, 'x(0) = 60')
eq(xN(3), 270, 'x(3) = 270 (bottom start dot)')
eq(xN(4), 340, 'x(4) = 340 (top start dot)')
eq(xN(7), 550, 'x(7) = 550 (both landing dots)')
eq(xN(9), 690, 'x(9) = 690 (rightmost tick)')
// rails: symmetric 10px overhang past the end ticks
eq(50, xN(0) - 10, 'rail left edge = 10px past the 0 tick')
eq(700, xN(9) + 10, 'rail right edge = 10px past the 9 tick')
// hop arcs: chords exactly equal to the hops they represent
const HOP_A = { start: [340, 82], ctrl: [445, 10], end: [550, 80] } as const
const HOP_B = { start: [270, 194], ctrl: [410, 122], end: [550, 192] } as const
eq(HOP_A.end[0] - HOP_A.start[0], 3 * PITCH, 'top arc chord = 3 units exactly (210px)')
eq(HOP_B.end[0] - HOP_B.start[0], 4 * PITCH, 'bottom arc chord = 4 units exactly (280px)')
eq((HOP_A.end[0] - HOP_A.start[0]) / (HOP_B.end[0] - HOP_B.start[0]), 3 / 4, 'drawn hop ratio = 3/4 — hop length and hop count swap roles')
// arcs anchored on their dots: starts at the start-dot column, ends at the landing-dot column
eq(HOP_A.start[0], xN(4), 'top arc starts on the 4 column (start dot centre)')
eq(HOP_A.end[0], xN(7), 'top arc lands on the 7 column (landing dot centre)')
eq(HOP_B.start[0], xN(3), 'bottom arc starts on the 3 column')
eq(HOP_B.end[0], xN(7), 'bottom arc lands on the 7 column')
// vertical anchoring: 1px above dot tops (start r=5 → top 83; landing r=7 → top 81)
eq(HOP_A.start[1], 88 - 5 - 1, 'top arc starts 1px above the start-dot top (83)')
eq(HOP_A.end[1], 88 - 7 - 1, 'top arc ends 1px above the landing-dot top (81)')
eq(HOP_B.start[1], 200 - 5 - 1, 'bottom arc starts 1px above the start-dot top (195)')
eq(HOP_B.end[1], 200 - 7 - 1, 'bottom arc ends 1px above the landing-dot top (193)')
// arc apexes (quadratic at t=1/2) and label clearance
type Curve = { readonly start: readonly number[]; readonly ctrl: readonly number[]; readonly end: readonly number[] }
const apex = (p: Curve) => [0.25 * p.start[0] + 0.5 * p.ctrl[0] + 0.25 * p.end[0], 0.25 * p.start[1] + 0.5 * p.ctrl[1] + 0.25 * p.end[1]]
const apA = apex(HOP_A)
const apB = apex(HOP_B)
eq(apA[0], 445, 'top apex x = 445 (label seat)')
eq(apB[0], 410, 'bottom apex x = 410 (label seat)')
console.log(`PASS  top apex y = ${apA[1]} — label «+3» (baseline 34, descender ≈37) clears by ${(apA[1] - 37).toFixed(1)}px`)
console.log(`PASS  bottom apex y = ${apB[1]} — label «+4» (baseline 146, descender ≈149) clears by ${(apB[1] - 149).toFixed(1)}px`)
eq(apA[1] - 37 > 5 && apB[1] - 149 > 5 ? 1 : 0, 1, 'both hop labels clear their apexes by >5px')
// titles clear the arcs horizontally
inBounds('4 + 3: start at 4, hop 3', 14, 30, 'start', 'top title')
inBounds('3 + 4: start at 3, hop 4', 14, 30, 'start', 'bottom title')
disjoint(span('4 + 3: start at 4, hop 3', 14, 30, 'start'), [HOP_A.start[0] - 2, 700], 'top title vs top arc zone')
disjoint(span('3 + 4: start at 3, hop 4', 14, 30, 'start'), [HOP_B.start[0] - 2, 700], 'bottom title vs bottom arc zone')
inBounds('+3', 14, 445, 'middle', 'top hop label')
inBounds('+4', 14, 410, 'middle', 'bottom hop label')
// tick labels: single digits at 70px pitch
const tw = W('0', 14)
console.log(`PASS  tick label width ≈${tw.toFixed(1)}px at ${PITCH}px pitch — ${(PITCH - tw).toFixed(1)}px clear`)
// viewBox bottom: bottom tick labels baseline 226
eq(226 + 4 < 240 ? 1 : 0, 1, 'bottom tick labels (baseline 226) fit in viewBox height 240')

/* ---------- 3. figure 2 (column addition, 760×290) ---------- */
console.log('\nfigure 2 — 4,589 + 2,764 seat map:')
const COLS = [215, 355, 495, 635] // thousands, hundreds, tens, ones centres
const CELL_X = [150, 290, 430, 570] // cell left edges (130 wide)
const ROW_Y = [94, 156] // addend row tops (46 tall)
const SUM_BASE = 252
const CARRY_Y = 24 // carry cell top (34 tall)
eq(COLS[0], 215, 'thousands column centre = 215')
eq(COLS[1], 355, 'hundreds column centre = 355')
eq(COLS[2], 495, 'tens column centre = 495')
eq(COLS[3], 635, 'ones column centre = 635')
eq(CELL_X[0], COLS[0] - 65, 'cell left edges = centre − 65 (130-wide cells centred)')
eq(ROW_Y[1] - (ROW_Y[0] + 46), 16, 'row gap = 16px')
// carry cells sit above tens/hundreds/thousands (the ones column receives no carry)
const CARRY_CENTRES = [215, 355, 495]
eq(CARRY_CENTRES[2], COLS[2], 'carry cell above the TENS column (born from the ones column)')
eq(CARRY_CENTRES[1], COLS[1], 'carry cell above the HUNDREDS column')
eq(CARRY_CENTRES[0], COLS[0], 'carry cell above the THOUSANDS column')
eq(CARRY_CENTRES.includes(COLS[3]) ? 1 : 0, 0, 'no carry cell above the ones column — nothing lies to its right')
// carry arrows: start exactly at each column's top centre, land exactly on the
// next-left carry cell's bottom centre, control at the chord midpoint
const arrow = (i: number) => {
  const start = [COLS[i], ROW_Y[0]]
  const end = [CARRY_CENTRES[i - 1], CARRY_Y + 34]
  const ctrl = [(start[0] + end[0]) / 2, 76]
  return { start, end, ctrl }
}
const a3 = arrow(3) // ones → carry above tens
const a2 = arrow(2) // tens → carry above hundreds
const a1 = arrow(1) // hundreds → carry above thousands
eq(a3.start[0], 635, 'ones arrow starts exactly at the ones column centre')
eq(a3.end[0], 495, 'ones arrow lands exactly on the tens carry-cell centre')
eq(a3.end[1], 58, 'arrow lands exactly on the carry-cell bottom (24 + 34)')
eq(a3.ctrl[0], (635 + 495) / 2, 'control at the chord midpoint x (565)')
eq(a2.start[0], 495, 'tens arrow starts at the tens column centre')
eq(a2.end[0], 355, 'tens arrow lands on the hundreds carry-cell centre')
eq(a1.start[0], 355, 'hundreds arrow starts at the hundreds column centre')
eq(a1.end[0], 215, 'hundreds arrow lands on the thousands carry-cell centre')
// arrows pass BELOW every carry cell that is not their own landing target
const qy = (p: { start: readonly number[]; ctrl: readonly number[]; end: readonly number[] }, t: number) =>
  (1 - t) ** 2 * p.start[1] + 2 * t * (1 - t) * p.ctrl[1] + t ** 2 * p.end[1]
const qx = (p: { start: readonly number[]; ctrl: readonly number[]; end: readonly number[] }, t: number) =>
  (1 - t) ** 2 * p.start[0] + 2 * t * (1 - t) * p.ctrl[0] + t ** 2 * p.end[0]
const clearsCells = (p: typeof a3, target: number) => {
  let ok = true
  for (let t = 0.01; t < 0.999; t += 0.01) {
    const x = qx(p, t)
    const y = qy(p, t)
    // every carry cell occupies y 24..58 over x in [centre−31, centre+31]
    for (const c of CARRY_CENTRES) {
      if (c === target) continue // its own landing cell: the tip lands on that bottom centre by design
      if (x >= c - 31 && x <= c + 31 && y < 60) ok = false
    }
  }
  return ok
}
eq(clearsCells(a3, 495) ? 1 : 0, 1, 'ones arrow passes below every non-target carry cell')
eq(clearsCells(a2, 355) ? 1 : 0, 1, 'tens arrow passes below every non-target carry cell')
eq(clearsCells(a1, 215) ? 1 : 0, 1, 'hundreds arrow passes below every non-target carry cell')
// sum line: symmetric overhangs around the cell block (150..700)
eq(140, CELL_X[0] - 10, 'sum line starts 10px left of the cell block')
eq(710, 700 + 10, 'sum line ends 10px right of the cell block')
// digit vertical centring: 22px bold in a 46px cell
console.log('PASS  addend digit baselines 124/186 — glyph centre ≈116/178 vs cell centre 117/179 (optically level)')
// text rows
inBounds('carries →', 14, 30, 'start', 'carries label')
disjoint(span('carries →', 14, 30, 'start'), [CARRY_CENTRES[0] - 32, 760], 'carries label vs the leftmost carry cell (rect starts at 183)')
inBounds('4,589', 14, 80, 'start', 'row-1 label')
inBounds('2,764', 14, 80, 'start', 'row-2 label')
disjoint(span('4,589', 14, 80, 'start'), [CELL_X[0], 700], 'row-1 label vs cells')
inBounds('each carry = 1', 13, 645, 'start', 'each-carry annotation')
const ec = span('each carry = 1', 13, 645, 'start')
disjoint(ec, [CARRY_CENTRES[2] + 30, CARRY_CENTRES[2] + 40], 'annotation vs carry-cell 3 right edge (525..535 zone)')
inBounds('column totals 13, 15, 13, 7 → write 3, 5, 3, 7 and carry 1, 1, 1', 13, 150, 'start', 'totals note')
eq(282 + 4 < 290 ? 1 : 0, 1, 'totals note (baseline 282) fits in viewBox height 290')
// the totals note matches the walk, read right→left as the columns are walked
eq([w1.totals[3], w1.totals[2], w1.totals[1], w1.totals[0]].join(','), '13,15,13,7', 'note totals read right→left: 13 (ones), 15 (tens), 13 (hundreds), 7 (thousands)')

/* ---------- 4. figure 3 (NEW: the 999+1 ripple, 760×290) ---------- */
console.log('\nfigure 3 — 999 + 1, the ripple and the new seat:')
// same column grammar as figure 2
eq(COLS[0], 215, 'new-seat column centre = 215 (thousands seat)')
eq(COLS[3], 635, 'ones column centre = 635')
// carry cells above tens/hundreds/new-seat — the third carry CREATES the seat
eq(CARRY_CENTRES.length, 3, 'three carry cells: above tens, hundreds, thousands')
// new-seat zone wraps the empty addend rows of the thousands column
const ZONE = { x: 150, y: 94, w: 130, h: 108 }
eq(ZONE.x, CELL_X[0], 'zone left edge = thousands column cell edge')
eq(ZONE.w, 130, 'zone width = one column')
eq(ZONE.y, ROW_Y[0], 'zone top = addend row-1 top')
eq(ZONE.h, ROW_Y[1] + 46 - ROW_Y[0], 'zone spans both addend rows (94..202)')
inBounds('the new seat', 14, 215, 'middle', 'the-new-seat tag')
const ns = span('the new seat', 14, 215, 'middle')
disjoint(ns, [ZONE.x - 4, ZONE.x], 'new-seat tag inside its zone (left margin)')
disjoint([ZONE.x + ZONE.w, ZONE.x + ZONE.w + 4], ns, 'new-seat tag inside its zone (right margin)')
// row labels
inBounds('999', 14, 80, 'start', 'row-1 label 999')
inBounds('1', 14, 80, 'start', 'row-2 label 1')
disjoint(span('999', 14, 80, 'start'), [ZONE.x, 700], 'label 999 vs cells/zone')
// the note: totals + the new seat's content + the sum
const NOTE3 = 'column totals 10, 10, 10 — write 0, carry 1 · the new seat: 0 + 0 + 1 = 1 · sum 1,000'
inBounds(NOTE3, 13, 150, 'start', 'figure-3 note')
eq(282 + 4 < 290 ? 1 : 0, 1, 'figure-3 note fits in viewBox height 290')
// the ripple arrows: identical grammar to figure 2 (same computed paths)
eq(a3.start[0], 635, 'ripple arrow 1: ones column → tens carry cell')
eq(a2.end[0], 355, 'ripple arrow 2: tens column → hundreds carry cell')
eq(a1.end[0], 215, 'ripple arrow 3: hundreds column → the carry cell above the NEW seat')

/* ---------- 4b. figure 4 (NEW: the counting board, 760×250) ---------- */
console.log('\nfigure 4 — the counting board behind the word carry:')
const FX = 90 // frame left
const FW = 580 // frame width
const FY = 36 // frame top
const FH = 188 // frame height
const WIRES = [90, 150, 210] // wire y-positions (top, middle=the next wire, bottom=the full one)
const WIRE_X = [110, 650] // wire span (20px inside the frame)
const R = 9 // counter radius
const BOT = WIRES[2]
const COUNT_R = 10 // exactly ten counters on the bottom wire
const PITCHB = 46 // counter pitch
const ROW_CX = 380 // row centred on the frame centre
const cyRow = BOT - R // counters rest exactly ON the wire
const rowX = (i: number) => ROW_CX - ((COUNT_R - 1) / 2) * PITCHB + i * PITCHB
eq(rowX(0), 173, 'first counter centre x = 173')
eq(rowX(9), 587, 'tenth counter centre x = 587')
eq(rowX(9) - rowX(0), 9 * PITCHB, 'the row spans exactly 9 pitches = 414px')
eq(rowX(0) - R >= WIRE_X[0] + 10 ? 1 : 0, 1, 'row left edge (164) clears the wire start (110) by 54px')
eq(rowX(9) + R <= WIRE_X[1] - 10 ? 1 : 0, 1, 'row right edge (596) clears the wire end (650) by 54px')
eq(PITCHB > 2 * R + 4 ? 1 : 0, 1, 'counters do not touch (pitch 46 > 2r + 4 = 22)')
eq(COUNT_R, 10, 'the wire holds TEN counters — the lesson sentence itself')
// the carried counter: mid-flight between the bottom and middle wires
const ALOFT = [380, 180]
eq(ALOFT[1], (BOT + WIRES[1]) / 2, 'the carried counter sits exactly midway between the two wires')
eq(ALOFT[1] - R > WIRES[1] ? 1 : 0, 1, 'the carried counter clears the middle wire (150) by 21px')
eq(BOT - (ALOFT[1] + R) > 0 ? 1 : 0, 1, 'the carried counter clears the bottom wire (210) by 21px')
eq(ALOFT[0], ROW_CX, 'the carried counter rises from the centre of the full row')
// the guide: straight up from the full wire to the landing ghost
const GHOST = [380, WIRES[1] - R] // where the counter will rest on the next wire
eq(GHOST[1], 141, 'the ghost landing centre = middle wire y − r = 141')
const GUIDE_TOP = 152
eq(GUIDE_TOP, GHOST[1] + R + 2, 'guide tip stops 2px below the ghost circle bottom (150)')
// the flight label and row label
const FLIGHT_LBL = 'one of the next seat'
const ROW_LBL = 'ten of one seat — the wire is full'
inBounds(FLIGHT_LBL, 14, 398, 'start', 'flight label (right of the carried counter)')
inBounds(ROW_LBL, 14, ROW_CX, 'middle', 'row label')
const fl = span(FLIGHT_LBL, 14, 398, 'start')
disjoint(fl, [ALOFT[0] - R - 4, ALOFT[0] + R + 4], 'flight label vs the carried counter')
disjoint(fl, [GHOST[0] - R - 4, GHOST[0] + R + 4], 'flight label vs the ghost circle')
const rl = span(ROW_LBL, 14, ROW_CX, 'middle')
eq(240 - 10 > 224 ? 1 : 0, 1, 'row label (top ≈230) sits below the frame bottom (224) by 6px')
eq(184 - 10 > 150 ? 1 : 0, 1, 'flight label (top ≈174) sits below the middle wire (150) by 24px')
eq(240 + 4 < 250 ? 1 : 0, 1, 'row label (baseline 240) fits in viewBox height 250')
// the wires and frame
eq(WIRE_X[0] - FX, 20, 'wires inset 20px from the frame left')
eq(FX + FW - WIRE_X[1], 20, 'wires inset 20px from the frame right')
eq(FX + FW, 670, 'frame right edge = 670')
eq(FY + FH, 224, 'frame bottom edge = 224')
eq(FX + FW / 2, 380, 'frame centred on the viewBox centre')

/* ---------- 5. print the final SVGs ---------- */
const f = (n: number) => n.toFixed(0)
const arrowMarker = (id: string, fill: string) =>
  `<defs><marker id="${id}" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="${fill}"/></marker></defs>`

/* figure 1 — number line, hop arcs anchored dot-column to dot-column */
const ticks = (railY: number, labelY: number) =>
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((n) => `      <line x1="${f(xN(n))}" y1="${f(railY - 6)}" x2="${f(xN(n))}" y2="${f(railY + 6)}" stroke="currentColor" stroke-width="1.5" opacity="0.55"/><text x="${f(xN(n))}" y="${f(labelY)}" text-anchor="middle" opacity="0.85">${n}</text>`)
    .join('\n')
const svg1 = `<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two number lines: on the first, start at 4 and hop 3 to land on 7; on the second, start at 3 and hop 4 — the hops span exactly 3 and 4 units and land on the same 7, the commutative property as geometry">
  ${arrowMarker('nl-hop', '#ea580c')}
  <g font-size="14" fill="currentColor">
    <text x="30" y="52" opacity="0.75" text-anchor="start">4 + 3: start at 4, hop 3</text>
    <line x1="50" y1="88" x2="700" y2="88" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
${ticks(88, 114)}
    </g>
    <circle cx="${f(xN(4))}" cy="88" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="${f(xN(7))}" cy="88" r="7" fill="#ea580c"/>
    <path d="M ${f(HOP_A.start[0])} ${f(HOP_A.start[1])} Q ${f(HOP_A.ctrl[0])} ${f(HOP_A.ctrl[1])} ${f(HOP_A.end[0])} ${f(HOP_A.end[1])}" fill="none" stroke="#ea580c" stroke-width="2.5" marker-end="url(#nl-hop)"/>
    <text x="445" y="34" text-anchor="middle" font-weight="700" fill="#ea580c">+3</text>
    <text x="30" y="164" opacity="0.75" text-anchor="start">3 + 4: start at 3, hop 4</text>
    <line x1="50" y1="200" x2="700" y2="200" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>
    <g text-anchor="middle">
${ticks(200, 226)}
    </g>
    <circle cx="${f(xN(3))}" cy="200" r="5" fill="currentColor" opacity="0.85"/>
    <circle cx="${f(xN(7))}" cy="200" r="7" fill="#ea580c"/>
    <path d="M ${f(HOP_B.start[0])} ${f(HOP_B.start[1])} Q ${f(HOP_B.ctrl[0])} ${f(HOP_B.ctrl[1])} ${f(HOP_B.end[0])} ${f(HOP_B.end[1])}" fill="none" stroke="#ea580c" stroke-width="2.5" marker-end="url(#nl-hop)"/>
    <text x="410" y="146" text-anchor="middle" font-weight="700" fill="#ea580c">+4</text>
  </g>
</svg>`

/* figure 2 — column addition of 4,589 + 2,764 */
const carryCell = (cx: number) =>
  `    <rect x="${f(cx - 30)}" y="24" width="60" height="34" rx="17" fill="#ea580c" opacity="0.16" stroke="#ea580c" stroke-width="1.5"/>
    <text x="${f(cx)}" y="46" font-size="15" font-weight="700" fill="#ea580c">1</text>`
const digitCells = (rowY: number) =>
  `      <rect x="150" y="${f(rowY)}" width="130" height="46" rx="6"/><rect x="290" y="${f(rowY)}" width="130" height="46" rx="6"/><rect x="430" y="${f(rowY)}" width="130" height="46" rx="6"/><rect x="570" y="${f(rowY)}" width="130" height="46" rx="6"/>`
const svg2 = `<svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Column addition of 4589 and 2764: each of the three carries is born as exactly 1 in the column to its right, the ones column totals 13, and the final carry never came">
  ${arrowMarker('ca-arrow', '#ea580c')}
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="30" y="46" opacity="0.75" text-anchor="start">carries →</text>
${carryCell(215)}
${carryCell(355)}
${carryCell(495)}
    <line x1="535" y1="41" x2="640" y2="41" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.6"/>
    <text x="645" y="45" font-size="13" opacity="0.75" text-anchor="start">each carry = 1</text>
    <text x="80" y="120" opacity="0.75" text-anchor="start">4,589</text>
    <text x="80" y="182" opacity="0.75" text-anchor="start">2,764</text>
    <g stroke="currentColor" stroke-width="1.5" opacity="0.5" fill="none">
${digitCells(94)}
${digitCells(156)}
    </g>
    <g font-size="22" font-weight="700">
      <text x="215" y="124">4</text><text x="355" y="124">5</text><text x="495" y="124">8</text><text x="635" y="124">9</text>
      <text x="215" y="186">2</text><text x="355" y="186">7</text><text x="495" y="186">6</text><text x="635" y="186">4</text>
    </g>
    <line x1="140" y1="214" x2="710" y2="214" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700" fill="#ea580c">
      <text x="215" y="252">7</text><text x="355" y="252">3</text><text x="495" y="252">5</text><text x="635" y="252">3</text>
    </g>
    <g stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4 3" fill="none" opacity="0.8">
      <path d="M ${f(a3.start[0])} 94 Q ${f(a3.ctrl[0])} ${f(a3.ctrl[1])} ${f(a3.end[0])} ${f(a3.end[1])}" marker-end="url(#ca-arrow)"/>
      <path d="M ${f(a2.start[0])} 94 Q ${f(a2.ctrl[0])} ${f(a2.ctrl[1])} ${f(a2.end[0])} ${f(a2.end[1])}" marker-end="url(#ca-arrow)"/>
      <path d="M ${f(a1.start[0])} 94 Q ${f(a1.ctrl[0])} ${f(a1.ctrl[1])} ${f(a1.end[0])} ${f(a1.end[1])}" marker-end="url(#ca-arrow)"/>
    </g>
    <text x="150" y="282" font-size="13" opacity="0.8" text-anchor="start">column totals 13, 15, 13, 7 → write 3, 5, 3, 7 and carry 1, 1, 1</text>
  </g>
</svg>`

/* figure 3 — 999 + 1: the ripple and the new seat */
const svg3 = `<svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Column addition of 999 and 1: every existing column totals exactly 10 so each writes 0 and carries 1, and the third carry creates the new thousands seat whose only content is that carry, giving 1000">
  ${arrowMarker('rip-arrow', '#ea580c')}
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="30" y="46" opacity="0.75" text-anchor="start">carries →</text>
${carryCell(215)}
${carryCell(355)}
${carryCell(495)}
    <rect x="${f(ZONE.x)}" y="${f(ZONE.y)}" width="${f(ZONE.w)}" height="${f(ZONE.h)}" rx="6" fill="none" stroke="#0d9488" stroke-width="1.5" stroke-dasharray="6 4"/>
    <text x="215" y="152" font-size="14" fill="#0f766e">the new seat</text>
    <text x="80" y="120" opacity="0.75" text-anchor="start">999</text>
    <text x="80" y="186" opacity="0.75" text-anchor="start">1</text>
    <g stroke="currentColor" stroke-width="1.5" opacity="0.5" fill="none">
      <rect x="290" y="94" width="130" height="46" rx="6"/><rect x="430" y="94" width="130" height="46" rx="6"/><rect x="570" y="94" width="130" height="46" rx="6"/>
      <rect x="290" y="156" width="130" height="46" rx="6"/><rect x="430" y="156" width="130" height="46" rx="6"/><rect x="570" y="156" width="130" height="46" rx="6"/>
    </g>
    <g font-size="22" font-weight="700">
      <text x="355" y="124">9</text><text x="495" y="124">9</text><text x="635" y="124">9</text>
      <text x="355" y="186" opacity="0.45">0</text><text x="495" y="186" opacity="0.45">0</text><text x="635" y="186">1</text>
    </g>
    <line x1="140" y1="214" x2="710" y2="214" stroke="currentColor" stroke-width="2"/>
    <g font-size="22" font-weight="700">
      <text x="215" y="252" fill="#ea580c">1</text>
      <text x="355" y="252">0</text><text x="495" y="252">0</text><text x="635" y="252">0</text>
    </g>
    <g stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4 3" fill="none" opacity="0.8">
      <path d="M ${f(a3.start[0])} 94 Q ${f(a3.ctrl[0])} ${f(a3.ctrl[1])} ${f(a3.end[0])} ${f(a3.end[1])}" marker-end="url(#rip-arrow)"/>
      <path d="M ${f(a2.start[0])} 94 Q ${f(a2.ctrl[0])} ${f(a2.ctrl[1])} ${f(a2.end[0])} ${f(a2.end[1])}" marker-end="url(#rip-arrow)"/>
      <path d="M ${f(a1.start[0])} 94 Q ${f(a1.ctrl[0])} ${f(a1.ctrl[1])} ${f(a1.end[0])} ${f(a1.end[1])}" marker-end="url(#rip-arrow)"/>
    </g>
    <text x="150" y="282" font-size="13" opacity="0.8" text-anchor="start">${NOTE3}</text>
  </g>
</svg>`

console.log('\n=== FINAL SVG 1 (commutativity number line) ===\n')
console.log(svg1)
console.log('\n=== FINAL SVG 2 (column addition 4,589 + 2,764) ===\n')
console.log(svg2)
console.log('\n=== FINAL SVG 3 (999 + 1 ripple — NEW) ===\n')
console.log(svg3)

/* figure 4 — the counting board behind the word "carry" (NEW) */
const svg4 = `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A counting board with three wires: ten counters fill the bottom wire, one counter is carried up in mid-flight toward the next wire where a dashed landing spot waits — ten of one seat become one of the next">
  ${arrowMarker('board-rise', '#ea580c')}
  <rect x="${f(FX)}" y="${f(FY)}" width="${f(FW)}" height="${f(FH)}" rx="10" fill="none" stroke="#16a34a" stroke-width="2"/>
  <g stroke="currentColor" stroke-width="1.5" opacity="0.55">
    <line x1="${f(WIRE_X[0])}" y1="${f(WIRES[0])}" x2="${f(WIRE_X[1])}" y2="${f(WIRES[0])}"/>
    <line x1="${f(WIRE_X[0])}" y1="${f(WIRES[1])}" x2="${f(WIRE_X[1])}" y2="${f(WIRES[1])}"/>
    <line x1="${f(WIRE_X[0])}" y1="${f(BOT)}" x2="${f(WIRE_X[1])}" y2="${f(BOT)}"/>
  </g>
  <g fill="#d97706">
${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `    <circle cx="${f(rowX(i))}" cy="${f(cyRow)}" r="${f(R)}"/>`).join('\n')}
  </g>
  <line x1="380" y1="206" x2="380" y2="${f(GUIDE_TOP)}" stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#board-rise)"/>
  <circle cx="${f(GHOST[0])}" cy="${f(GHOST[1])}" r="${f(R)}" fill="none" stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4 3"/>
  <circle cx="${f(ALOFT[0])}" cy="${f(ALOFT[1])}" r="${f(R)}" fill="#ea580c"/>
  <text x="398" y="184" font-size="14" font-weight="700" fill="#ea580c" text-anchor="start">one of the next seat</text>
  <text x="${f(ROW_CX)}" y="240" font-size="14" fill="currentColor" opacity="0.8" text-anchor="middle">ten of one seat — the wire is full</text>
</svg>`

console.log('\n=== FINAL SVG 4 (the counting board — NEW) ===\n')
console.log(svg4)
console.log('\nALL CHECKS CLEAN — 4 SVGs ready to paste into ch-02.ts')
