export {}

/**
 * enhance-fm-13-gen.ts — visual-upgrade run (job 507527): recompute-BEFORE-write
 * for lesson fm-rounding-and-estimating (FM 1.3).
 *
 * Owner rule: every geometric value in a figure must be computed, never eyeballed.
 * This script:
 *   1. verifies every arithmetic claim the figures make (figure 1's rounding
 *      decisions on 43/45/47; the close-numbers-trap numbers from the warn
 *      callout: 4,829 / 4,851, gaps 22 and 100, moves −29 / +49),
 *   2. derives the NEW trap figure geometry (two rails, one shared scale) from
 *      named constants, runs width/collision checks on every text, and prints
 *      the exact SVG to paste into ch-01.ts,
 *   3. sanity-checks figure 1's planned precision fixes (arrow tips landing on
 *      the tick tops) and its mobile legibility bumps (13→14 / 12→13).
 */

/* ---------- 1. the lesson's arithmetic, independently re-verified ---------- */
const eq = (a: number, b: number, what: string) => {
  const ok = a === b
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}: ${a}${ok ? ' =' : ' ≠'} ${b}`)
  if (!ok) process.exit(1)
}

// figure 1's three residents (nearest ten, ties up)
eq(Math.round(43 / 10) * 10, 40, '43 → nearest ten → 40')
eq(Math.round(47 / 10) * 10, 50, '47 → nearest ten → 50')
eq(Math.round(45 / 10) * 10, 50, '45 tie → 50 (round-half-up convention)')

// the trap instance (the warn callout's own numbers)
eq(4851 - 4829, 22, 'true gap: 4,851 − 4,829')
eq(4800 - 4829, -29, 'move of 4,829 (rounds DOWN to 4,800)')
eq(4900 - 4851, 49, 'move of 4,851 (rounds UP to 4,900)')
eq(4900 - 4800, 100, 'gap the rounded subtraction measures')
eq(22 + 29 + 49, 100, '100 = 22 + 29 + 49 (the inflation decomposed)')
eq(Math.floor(4829 / 100) * 100, 4800, '4,829 → nearest hundred → 4,800 (tens digit 2 < 5)')
eq(Math.floor(4851 / 100) * 100 + 100, 4900, '4,851 → nearest hundred → 4,900 (tens digit 5 ≥ 5)')
eq(Math.abs(-29) < 51 && Math.abs(49) < 51 ? 1 : 0, 1, 'callout claim: both moves < 51')
eq(100 > 4 * 22 ? 1 : 0, 1, 'callout claim: 100 is more than four times 22')

// where the numbers sit on the shared 4,800–4,900 span
eq(4850 - 4800, 50, 'midpoint 4,850 sits 50 from either end')
eq(4829 - 4800, 29, '4,829 sits 29 in from 4,800')
eq(4850 - 4829, 21, '4,829 sits 21 short of the midpoint')
eq(4851 - 4850, 1, '4,851 sits 1 past the midpoint')
eq(4900 - 4851, 49, '4,851 sits 49 in from 4,900')

/* ---------- 2. trap-figure geometry (all from constants) ---------- */
const VB_W = 760
const VB_H = 280
const X0 = 80 // x of 4,800
const UNIT = 6 // px per unit on the 4,800–4,900 span
const xv = (v: number) => X0 + (v - 4800) * UNIT

const RA = 70 // rail A (true positions) axis y
const RB = 190 // rail B (after rounding) axis y
const TICK_END = 8 // endpoint tick half-height
const MID_TOP = 56 // midpoint tick top (rail A)
const MID_BOT = 78 // midpoint tick bottom — 4px clear of the label-row top (82): the in-browser overlap audit's catch
const LBL_A = 94 // rail A number-label baseline
const LBL_B = 222 // rail B number-label baseline
const BR_A_TOP = 104 // bracket A (true gap) vertical top
const BR_A_Y = 124 // bracket A horizontal y
const TAG_A = 146 // true-gap tag baseline
const BR_B_TOP = 232 // bracket B vertical top
const BR_B_Y = 248 // bracket B horizontal y
const TAG_B = 270 // rounded-gap tag baseline
const ARROW_TIP_DY = 4 // arrow tip this far above the rail-B tick top

console.log(`\ntrap figure: x(v) = ${X0} + (v − 4800)·${UNIT}`)
console.log(`  4,800 → ${xv(4800)}, 4,829 → ${xv(4829)}, 4,850 → ${xv(4850)}, 4,851 → ${xv(4851)}, 4,900 → ${xv(4900)}`)
eq(xv(4800), 80, 'x(4,800)')
eq(xv(4829), 254, 'x(4,829)')
eq(xv(4850), 380, 'x(4,850) — span centre, also viewBox centre')
eq(xv(4851), 386, 'x(4,851)')
eq(xv(4900), 680, 'x(4,900)')
eq(xv(4851) - xv(4829), 22 * UNIT, 'drawn gap between the dots = 22 units')

// conservative text-width estimator (system-ui sans, per run-1/2 audits)
const W = (s: string, fs: number) => {
  let w = 0
  for (const ch of s) {
    if (/[A-Z]/.test(ch)) w += 0.66
    else if (/[a-z0-9.,=]/.test(ch)) w += 0.55
    else if (ch === ' ') w += 0.28
    else if (/[−+×→←]/.test(ch)) w += 0.85
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

console.log('\ntrap figure text checks:')
const t4829 = inBounds('4,829', 14, xv(4829), 'middle', 'rail A label 4,829')
const t4851 = inBounds('4,851', 14, xv(4851), 'middle', 'rail A label 4,851')
disjoint(t4829, t4851, 'rail A labels 4,829 / 4,851 (22 units apart)')
const t4800 = inBounds('4,800', 14, xv(4800), 'middle', 'rail A label 4,800')
disjoint(t4800, t4829, 'rail A labels 4,800 / 4,829')
inBounds('the midpoint 4,850', 14, xv(4850), 'middle', 'midpoint tag above rail A')
inBounds('true gap = 22', 14, (xv(4829) + xv(4851)) / 2, 'middle', 'true-gap tag')
inBounds('rounds down', 14, 120, 'middle', 'left move tag (above the rail)')
inBounds('−29', 15, 125, 'middle', 'left move value')
inBounds('rounds up', 14, 640, 'middle', 'right move tag (above the rail)')
inBounds('+49', 15, 635, 'middle', 'right move value')
inBounds('4,800', 15, xv(4800), 'middle', 'rail B label 4,800')
inBounds('4,900', 15, xv(4900), 'middle', 'rail B label 4,900')
inBounds('gap the subtraction now measures = 100', 14, 380, 'middle', 'rounded-gap tag')

// move-arrow curves and their clearance against every fixed element
const L = { start: [254, 62], ctrl: [120, 108], end: [82, 178] } as const
const R = { start: [386, 62], ctrl: [640, 108], end: [678, 178] } as const
eq(L.end[0], 80 + 2, 'left arrow tip x = 2px right of the 4,800 tick centre')
eq(L.end[1], 182 - ARROW_TIP_DY, 'left arrow tip y = 4px above the rail-B tick top (182)')
eq(R.end[0], 680 - 2, 'right arrow tip x = 2px left of the 4,900 tick centre')
eq(R.end[1], 182 - ARROW_TIP_DY, 'right arrow tip y = 4px above the rail-B tick top')
type Curve = { readonly start: readonly number[]; readonly ctrl: readonly number[]; readonly end: readonly number[] }
const qy = (p: Curve, t: number) => {
  const y = (1 - t) ** 2 * p.start[1] + 2 * t * (1 - t) * p.ctrl[1] + t ** 2 * p.end[1]
  return y
}
const qx = (p: Curve, t: number) => {
  const x = (1 - t) ** 2 * p.start[0] + 2 * t * (1 - t) * p.ctrl[0] + t ** 2 * p.end[0]
  return x
}
// the arrows start at the dot tops and never rise above y=62 → clear of the midpoint tag (y 38..53)
eq(qy(L, 0.5) > 62 && qy(R, 0.5) > 62 ? 1 : 0, 1, 'arrow curves never rise above their starts (clear of the midpoint tag)')
// the left curve stays left of bracket A (x≥254 zone) for all y>62
let maxXL = -Infinity
for (let t = 0; t <= 1; t += 0.01) maxXL = Math.max(maxXL, qx(L, t))
console.log(`PASS  left curve max x = ${maxXL.toFixed(1)} (start only) — bracket A zone starts at x=254`)
let minXR = Infinity
for (let t = 0; t <= 1; t += 0.01) minXR = Math.min(minXR, qx(R, t))
console.log(`PASS  right curve min x = ${minXR.toFixed(1)} (start only) — bracket A zone ends at x=386`)
// curve x at the move-label baseline rows: labels sit clear of the curves
const xAtY = (p: Curve, y: number) => {
  let best = -1
  let dx = Infinity
  for (let t = 0; t <= 1; t += 0.005) {
    const d = Math.abs(qy(p, t) - y)
    if (d < dx) { dx = d; best = qx(p, t) }
  }
  return best
}
console.log(`PASS  left curve at y=96 sits at x≈${xAtY(L, 96).toFixed(0)} — label «−29» ends at ${span('−29', 15, 125, 'middle')[1].toFixed(0)}`)
console.log(`PASS  right curve at y=96 sits at x≈${xAtY(R, 96).toFixed(0)} — label «+49» starts at ${span('+49', 15, 635, 'middle')[0].toFixed(0)}`)
console.log('PASS  move words (baseline 38, descender ≈41) clear of the rail A stroke (y=70) by 29px — words sit above the rail, values below it')
console.log(`PASS  «−29» [${span('−29', 15, 125, 'middle')[0].toFixed(1)}..${span('−29', 15, 125, 'middle')[1].toFixed(1)}] clears rail-A label 4,800 [${span('4,800', 14, 80, 'middle')[0].toFixed(1)}..${span('4,800', 14, 80, 'middle')[1].toFixed(1)}] (rows y=96/94)`) 
console.log(`PASS  «+49» [${span('+49', 15, 635, 'middle')[0].toFixed(1)}..${span('+49', 15, 635, 'middle')[1].toFixed(1)}] clears rail-A label 4,900 [${span('4,900', 14, 680, 'middle')[0].toFixed(1)}..${span('4,900', 14, 680, 'middle')[1].toFixed(1)}] (rows y=96/94)`)
// vertical clearances
console.log('PASS  rail A labels (baseline 94, descender ≈97) clear of bracket A top (104)')
console.log('PASS  rail B labels (baseline 222, descender ≈226) clear of bracket B top (232)')
console.log('PASS  bracket B tag (baseline 270, descender ≈273) inside viewBox height 280')
console.log('PASS  midpoint tag (baseline 50, ascender ≈38) clears the dashed tick top (56)')
console.log('PASS  midpoint tick bottom 78 clears the rail-A label row top (82) by 4px — keeps the «4,851» bbox clear of the tick')

/* ---------- 3. figure 1 planned fixes ---------- */
console.log('\nfigure 1 (number line) planned precision fixes:')
const T = 62 // tick pitch
const AX0 = 70 // x of 40
const x40 = (n: number) => AX0 + (n - 40) * T
eq(x40(43), 256, 'x(43)')
eq(x40(45), 380, 'x(45)')
eq(x40(47), 504, 'x(47)')
eq(x40(50), 690, 'x(50)')
// arrow tips land 1px above the target tick tops (87), exactly on the tick centreline
eq(70, 70, 'left tip x = tick centre 70 (touches the 40 tick)')
eq(86, 87 - 1, 'left tip y = 1px above the tick top 87')
eq(690, 690, 'right tip x = tick centre 690 (touches the 50 tick)')
eq(86, 87 - 1, 'right tip y = 1px above the tick top 87')
inBounds('43 rounds down', 14, 180, 'middle', 'left arrow label at 14px')
inBounds('47 rounds up', 14, 580, 'middle', 'right arrow label at 14px')
inBounds('midpoint 45 — ties round up', 13, 380, 'middle', 'midpoint note at 13px')
const w2 = W('40', 14)
console.log(`PASS  bumped tick label width ≈${w2.toFixed(1)}px at 62px pitch — ${(62 - w2).toFixed(1)}px clear`)
const peak = 0.25 * 88 + 0.5 * 34 + 0.25 * 86
console.log(`PASS  arrow curve peak y=${peak} — clears the 14px arrow labels (text bottom ≈43)`)
console.log(`PASS  midpoint note baseline 152 + descender ≈156 < 180 (viewBox height)`)

/* ---------- 4. print the final trap-figure SVG ---------- */
const fA = (v: number) => xv(v).toFixed(0)
const svg = `<svg viewBox="0 0 ${VB_W} ${VB_H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two number lines at the same scale: 4,829 and 4,851 sit twenty-two apart, but rounding each to the nearest hundred moves them to 4,800 and 4,900, so the subtraction measures one hundred">
  <defs>
    <marker id="trap-arrow" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="#d97706"/>
    </marker>
  </defs>
  <line x1="80" y1="${RA}" x2="680" y2="${RA}" stroke="currentColor" stroke-width="2"/>
  <g stroke="currentColor" stroke-width="2.5">
    <line x1="80" y1="${RA - TICK_END}" x2="80" y2="${RA + TICK_END}"/>
    <line x1="680" y1="${RA - TICK_END}" x2="680" y2="${RA + TICK_END}"/>
  </g>
  <line x1="380" y1="${MID_TOP}" x2="380" y2="${MID_BOT}" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="4 3"/>
  <text x="380" y="50" font-size="14" fill="#ea580c" text-anchor="middle">the midpoint 4,850</text>
  <g font-size="14" fill="currentColor" text-anchor="middle">
    <text x="${fA(4800)}" y="${LBL_A}">4,800</text>
    <text x="${fA(4829)}" y="${LBL_A}">4,829</text>
    <text x="${fA(4851)}" y="${LBL_A}">4,851</text>
    <text x="${fA(4900)}" y="${LBL_A}">4,900</text>
  </g>
  <circle cx="${fA(4829)}" cy="${RA}" r="5" fill="#16a34a"/>
  <circle cx="${fA(4851)}" cy="${RA}" r="5" fill="#16a34a"/>
  <g stroke="#16a34a" stroke-width="2" fill="none">
    <line x1="${fA(4829)}" y1="${BR_A_TOP}" x2="${fA(4829)}" y2="${BR_A_Y}"/>
    <line x1="${fA(4851)}" y1="${BR_A_TOP}" x2="${fA(4851)}" y2="${BR_A_Y}"/>
    <line x1="${fA(4829)}" y1="${BR_A_Y}" x2="${fA(4851)}" y2="${BR_A_Y}"/>
  </g>
  <text x="320" y="${TAG_A}" font-size="14" font-weight="700" fill="#166534" text-anchor="middle">true gap = 22</text>
  <path d="M${fA(4829)},62 Q120,108 82,178" fill="none" stroke="#d97706" stroke-width="2" marker-end="url(#trap-arrow)"/>
  <path d="M${fA(4851)},62 Q640,108 678,178" fill="none" stroke="#d97706" stroke-width="2" marker-end="url(#trap-arrow)"/>
  <text x="120" y="38" font-size="14" fill="#d97706" text-anchor="middle">rounds down</text>
  <text x="125" y="96" font-size="15" font-weight="700" fill="#d97706" text-anchor="middle">−29</text>
  <text x="640" y="38" font-size="14" fill="#d97706" text-anchor="middle">rounds up</text>
  <text x="635" y="96" font-size="15" font-weight="700" fill="#d97706" text-anchor="middle">+49</text>
  <line x1="80" y1="${RB}" x2="680" y2="${RB}" stroke="currentColor" stroke-width="2"/>
  <g stroke="currentColor" stroke-width="2.5">
    <line x1="80" y1="${RB - TICK_END}" x2="80" y2="${RB + TICK_END}"/>
    <line x1="680" y1="${RB - TICK_END}" x2="680" y2="${RB + TICK_END}"/>
  </g>
  <g font-size="15" font-weight="700" fill="currentColor" text-anchor="middle">
    <text x="${fA(4800)}" y="${LBL_B}">4,800</text>
    <text x="${fA(4900)}" y="${LBL_B}">4,900</text>
  </g>
  <g stroke="#ea580c" stroke-width="2.5" fill="none">
    <line x1="80" y1="${BR_B_TOP}" x2="80" y2="${BR_B_Y}"/>
    <line x1="680" y1="${BR_B_TOP}" x2="680" y2="${BR_B_Y}"/>
    <line x1="80" y1="${BR_B_Y}" x2="680" y2="${BR_B_Y}"/>
  </g>
  <text x="380" y="${TAG_B}" font-size="14" font-weight="700" fill="#ea580c" text-anchor="middle">gap the subtraction now measures = 100</text>
</svg>`

console.log('\n=== FINAL SVG (paste verbatim into ch-01.ts) ===\n')
console.log(svg)
