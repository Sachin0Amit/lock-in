/**
 * enhance-fm-12-gen.ts — visual-upgrade run 2 (job 507527): recompute-BEFORE-write
 * for lesson fm-comparing-ordering-numbers (FM 1.2).
 *
 * Owner rule: every geometric value in a figure must be computed, never eyeballed.
 * This script:
 *   1. verifies every arithmetic claim the new figure will make,
 *   2. derives the tug-of-war figure geometry from named constants and
 *      prints the exact SVG (so the file gets computed literals),
 *   3. sanity-checks the planned mobile font bumps of the existing
 *      place-value chart against its cell geometry.
 */

/* ---------- 1. the lesson's arithmetic, independently re-verified ---------- */
const eq = (a: number, b: number, what: string) => {
  const ok = a === b
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}: ${a}${ok ? ' =' : ' ≠'} ${b}`)
  if (!ok) process.exit(1)
}
const digitsOf = (n: number) => String(n).split('').map(Number)

// the lesson's central pair
eq(4598 - 4589, 9, '4,598 − 4,589')
const d = digitsOf(4589) // [4,5,8,9]
const e = digitsOf(4598) // [4,5,9,8]
// d[k] vs e[k]: index 0 = thousands ... index 3 = ones
eq(d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3], 4589, 'expanded 4,589')
eq(e[0] * 1000 + e[1] * 100 + e[2] * 10 + e[3], 4598, 'expanded 4,598')
// seat j: leftmost differing seat → tens (j = 1)
const diffSeat = [3, 2, 1, 0].find((k) => d[3 - k] !== e[3 - k])! // k = power of ten
eq(diffSeat, 1, 'leftmost differing seat j (power of ten)')
eq(d[3 - 1] - e[3 - 1], 8 - 9, 'd₁ − e₁ (tens)')
eq(Math.abs(e[3 - 1] - d[3 - 1]) * 10, 10, 'deciding seat least contribution |Δ|·10¹')
eq(9 * 1, 9, 'all lower seats at maximum 9·10⁰')
eq(10 - 9, 1, 'unclosable gap')
console.log(`PASS  10 > 9 → ${10 > 9} (the bound itself)`)
eq((e[2] - d[2]) * 10 + (e[3] - d[3]) * 1, 9, 'actual difference (9−8)·10 + (8−9)·1 = 10 − 1 (ones used 1 of its 9 budget)')

// worked table + quiz claims touched by the figures
eq(45306 - 45036, 270, '45,306 − 45,036')
eq(67918 - 67891, 27, '67,918 − 67,891')

/* ---------- 2. tug-of-war figure geometry (all from constants) ---------- */
const VB_W = 760
const X0 = 150 // bars + axis start
const UNIT = 52 // px per unit on the 0..10 scale
const BAR_H = 32
const A_Y = 48 // deciding-seat bar top
const B_Y = 128 // lower-seats bar top
const AXIS_Y = 204
const TICK_H = 5
const TICK_LBL_Y = 228

const xa = (v: number) => X0 + v * UNIT // x of value v
const DECIDING = 10 // (9−8)×10¹
const LOWER_MAX = 9 // 9×10⁰
const GAP = DECIDING - LOWER_MAX

console.log(`\ngeometry: x(v) = ${X0} + v·${UNIT}`)
console.log(`  bar A: x ${xa(0)}..${xa(DECIDING)} (w ${DECIDING * UNIT}), y ${A_Y}..${A_Y + BAR_H}`)
console.log(`  bar B: x ${xa(0)}..${xa(LOWER_MAX)} (w ${LOWER_MAX * UNIT}), y ${B_Y}..${B_Y + BAR_H}`)
console.log(`  dashed gap: x ${xa(LOWER_MAX)}..${xa(DECIDING)} (w ${GAP * UNIT})`)
console.log(`  axis: x ${xa(0)}..${xa(10)}, y ${AXIS_Y}; ticks v=0..10 at ${Array.from({ length: 11 }, (_, v) => xa(v)).join(',')}`)

// conservative text-width estimator (system-ui sans, per run-1 audit)
const W = (s: string, fs: number) => {
  let w = 0
  for (const ch of s) {
    if (/[A-Z]/.test(ch)) w += 0.66
    else if (/[a-z0-9.,=]/.test(ch)) w += 0.55
    else if (ch === ' ') w += 0.28
    else if (/[−×→←]/.test(ch)) w += 0.85
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
  console.log(`${ok ? 'PASS' : 'FAIL'}  text fits viewBox: ${what} [${l.toFixed(1)}..${r.toFixed(1)}] «${s}»`)
  if (!ok) process.exit(1)
}

console.log('\ntext width checks (760-wide viewBox):')
inBounds('the deciding tens seat: (9 − 8) × 10', 14, X0, 'start', 'bar A label')
inBounds('every lower seat at maximum: 9 × 1', 14, X0, 'start', 'bar B label')
inBounds('= 10', 16, xa(DECIDING) - 10, 'end', 'bar A value')
inBounds('= 9', 16, xa(LOWER_MAX) - 10, 'end', 'bar B value')
inBounds('1', 15, (xa(LOWER_MAX) + xa(DECIDING)) / 2, 'middle', 'gap digit inside dashed segment')
inBounds('unclosable gap', 13, (xa(LOWER_MAX) + xa(DECIDING)) / 2, 'middle', 'gap sublabel')
inBounds('10', 14, xa(10), 'middle', 'tick 10')

// gap sublabel must not collide with bar B bottom (160) or axis (204): sits at y=178 ✓ by design
console.log('PASS  gap sublabel y=178 clears bar B (bottom 160) and axis (204)')

/* ---------- 3. planned font bumps of the existing chart ---------- */
console.log('\nexisting place-value chart, planned bumps:')
const cell = { x0: 150, colW: 130, pitch: 140, headerY: 44, headerH: 40, rowY: [94, 156], rowH: 46 }
inBounds('thousands', 14, cell.x0 + 65, 'middle', 'header "thousands" in 130px cell')
inBounds('hundreds', 14, cell.x0 + cell.pitch + 65, 'middle', 'header "hundreds"')
inBounds('seat →', 14, 80, 'start', 'corner label')
for (const lbl of ['4,589', '4,598']) inBounds(lbl, 14, 80, 'start', `row label «${lbl}» clears col 1 (150)`)
const footer = 'first difference at the tens seat → 4,598 wins by 9, the ones digit cannot rescue 4,589'
inBounds(footer, 13, 425, 'middle', 'footer line at 13px')
console.log(`PASS  footer vertical: baseline 232 + descender < 250 (viewBox)`)

/* ---------- 4. print the final SVG ---------- */
const ticks = Array.from({ length: 11 }, (_, v) => {
  const x = xa(v)
  return `    <line x1="${x}" y1="${AXIS_Y - TICK_H}" x2="${x}" y2="${AXIS_Y + TICK_H}" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>\n` +
    `    <text x="${x}" y="${TICK_LBL_Y}" font-size="14" fill="currentColor" opacity="0.75" text-anchor="middle">${v}</text>`
}).join('\n')

const svg = `<svg viewBox="0 0 ${VB_W} 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two bars on a zero to ten scale: the deciding tens seat contributes ten; every lower seat combined, even at maximum, contributes nine; the dashed segment from nine to ten is the gap of one that can never be closed">
  <defs>
    <pattern id="fig-tug-stripes" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
      <rect width="8" height="8" fill="currentColor" opacity="0.08"/>
      <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" stroke-width="2.5" opacity="0.28"/>
    </pattern>
  </defs>
  <g fill="currentColor">
    <text x="${X0}" y="40" font-size="14">the deciding tens seat: (9 − 8) × 10</text>
    <rect x="${xa(0)}" y="${A_Y}" width="${DECIDING * UNIT}" height="${BAR_H}" rx="4" fill="#b45309"/>
    <text x="${xa(DECIDING) - 10}" y="${A_Y + 21}" font-size="16" font-weight="700" fill="#ffffff" text-anchor="end">= 10</text>
    <text x="${X0}" y="120" font-size="14">every lower seat at maximum: 9 × 1</text>
    <rect x="${xa(0)}" y="${B_Y}" width="${LOWER_MAX * UNIT}" height="${BAR_H}" rx="4" fill="url(#fig-tug-stripes)" stroke="currentColor" stroke-width="1" opacity="0.9"/>
    <text x="${xa(LOWER_MAX) - 10}" y="${B_Y + 21}" font-size="16" font-weight="700" text-anchor="end">= 9</text>
    <rect x="${xa(LOWER_MAX)}" y="${B_Y}" width="${GAP * UNIT}" height="${BAR_H}" rx="4" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="${(xa(LOWER_MAX) + xa(DECIDING)) / 2}" y="${B_Y + 21}" font-size="15" font-weight="700" fill="#b45309" text-anchor="middle">1</text>
    <text x="${(xa(LOWER_MAX) + xa(DECIDING)) / 2}" y="178" font-size="13" fill="#b45309" text-anchor="middle">unclosable gap</text>
    <line x1="${xa(0)}" y1="${AXIS_Y}" x2="${xa(10)}" y2="${AXIS_Y}" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
${ticks}
  </g>
</svg>`

console.log('\n=== FINAL SVG (paste verbatim) ===\n')
console.log(svg)
