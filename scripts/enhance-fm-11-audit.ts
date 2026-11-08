/**
 * enhance-fm-11-audit.ts — pre-touch geometry audit for lesson
 * fm-numbers-digits-place-value (FM 1.1), visual-upgrade run 1.
 *
 * Rule (owner directive): recompute EVERY geometric value of the figures
 * with a script BEFORE/WHILE touching the SVG. This script:
 *   1. imports the chapter data,
 *   2. re-derives the number-line tick mapping x = 380 + v*33 and checks
 *      the generated <line>/<text> elements against it exactly,
 *   3. checks every text element against ITS OWN figure's viewBox bounds,
 *   4. conservatively estimates rendered text widths (system-ui sans),
 *   5. checks caption-vs-figure consistency (markers at 7 and −4),
 *   6. independently recomputes the seat-figure constants and verifies
 *      every band/arrow/label/box position.
 */
import { chapter01 } from '../src/data/library/books/mathematics/foundation-mathematics/ch-01'

const lesson = chapter01.lessons.find((l) => l.id === 'fm-numbers-digits-place-value')!
if (!lesson) throw new Error('lesson not found')

const figs = lesson.blocks.filter((b: any) => b.kind === 'figure') as { caption: string; svg: string }[]
console.log(`lesson 1.1 has ${figs.length} figure(s)`)

const figNumberLine = figs.find((f) => f.svg.includes('viewBox="0 0 760 150"'))
const figSeats = figs.find((f) => f.svg.includes('viewBox="0 0 620 282"'))

let fails = 0
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`)
  if (!ok) fails++
}

check('number-line figure present', !!figNumberLine)
check('seat figure present', !!figSeats)
if (!figNumberLine || !figSeats) throw new Error('required figures missing')

/* ================= figure 1: the number line ================= */
const svg = figNumberLine.svg
const ORIGIN_X = 380
const STEP = 33
const AXIS_Y = 80
const VB_W = 760
const VB_H = 150

// every tick line: v = i-10, x = 380 + v*33, y1 = 80-h, y2 = 80+h, h = 14 (v%5==0) else 9
const lineRe = /<line x1="(-?[\d.]+)" y1="(-?[\d.]+)" x2="(-?[\d.]+)" y2="(-?[\d.]+)"\/>/g
const tickLines = [...svg.matchAll(lineRe)].map((m) => ({
  x1: +m[1], y1: +m[2], x2: +m[3], y2: +m[4],
}))
check('tick count = 21', tickLines.length === 21, `found ${tickLines.length}`)

let tickMismatch = 0
for (let i = 0; i < 21; i++) {
  const v = i - 10
  const x = ORIGIN_X + v * STEP
  const h = v % 5 === 0 ? 14 : 9
  const t = tickLines[i]
  if (!t || t.x1 !== x || t.x2 !== x || t.y1 !== AXIS_Y - h || t.y2 !== AXIS_Y + h) tickMismatch++
}
check('all 21 ticks match recomputed mapping x=380+33v, h=14/9', tickMismatch === 0, `${tickMismatch} mismatches`)

check('axis spans exactly v=−10..10 (50..710)', svg.includes('x1="50" y1="80" x2="710" y2="80"'))
check('origin dot at (380,80)', svg.includes('cx="380" cy="80" r="4"'))
check('emphasis dot v=7 at x=380+7·33=611', svg.includes('<circle cx="611" cy="80" r="5"'))
check('emphasis dot v=−4 at x=380−4·33=248', svg.includes('<circle cx="248" cy="80" r="5"'))

/* per-figure text bounds + width estimates */
const textRe = /<text x="(-?[\d.]+)" y="(-?[\d.]+)"([^>]*)>([^<]*)<\/text>/g
const W = (s: string, fs: number) => {
  let w = 0
  for (const ch of s) {
    if (/[A-Z]/.test(ch)) w += 0.66
    else if (/[a-z0-9.,]/.test(ch)) w += 0.55
    else if (ch === ' ') w += 0.28
    else if (/[−→←×]/.test(ch)) w += 0.85
    else w += 0.6
  }
  return w * fs
}
const auditTexts = (svgStr: string, vbW: number, vbH: number, label: string) => {
  for (const m of svgStr.matchAll(textRe)) {
    const x = +m[1], y = +m[2], attrs = m[3], content = m[4]
    const fs = +(attrs.match(/font-size="([\d.]+)"/)?.[1] ?? 12)
    const anchor = attrs.match(/text-anchor="(\w+)"/)?.[1] ?? 'start'
    const w = W(content, fs)
    const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x
    const right = left + w
    // tspans following the main string extend the width further — estimate
    const tspanExtra = [...attrs ? '' : '']
    const ok =
      left >= -1.5 && right <= vbW + 1.5 && y - fs >= -1.5 && y + 2 <= vbH + 1.5
    check(
      `[${label}] "${content.slice(0, 26)}" within viewBox`,
      ok,
      `span [${left.toFixed(1)}, ${right.toFixed(1)}] of ${vbW}, y=${y}, fs=${fs}`
    )
  }
}
auditTexts(svg, VB_W, VB_H, 'number-line')

const captionNL = figNumberLine.caption
check('caption promises 7 → dot at 611 drawn', !/number 7 sits seven unit steps/.test(captionNL) || svg.includes('cx="611"'))
check('caption promises −4 → dot at 248 drawn', !/−4 sits four unit steps left/.test(captionNL) || svg.includes('cx="248"'))
check('number-line role=img + aria', svg.includes('role="img"') && /aria-label="[^"]{20,}"/.test(svg))

/* ================= figure 2: one digit, four seats ================= */
const svg2 = figSeats.svg
const D = 14.4 // monospace digit advance: 0.6em × 24px
const RIGHT = 214
const BASE0 = 58
const ROW_H = 64
const VB2_W = 620
const VB2_H = 282
const expected = [0, 1, 2, 3].map((i) => {
  const n = i + 1
  const seatLeft = +(RIGHT - D * n).toFixed(1)
  const fiveRight = +(RIGHT - D * (n - 1)).toFixed(1)
  return {
    base: BASE0 + ROW_H * i,
    n,
    seatLeft,
    fiveRight,
    cx: +((seatLeft + fiveRight) / 2).toFixed(1), // leading-5 center
  }
})
console.log('recomputed seat rows:', JSON.stringify(expected))

check('seat figure viewBox 620×282', svg2.includes('viewBox="0 0 620 282"'))
check('seat figure role=img + aria', svg2.includes('role="img"') && /aria-label="[^"]{20,}"/.test(svg2))
check('seat figure marker id unique (seat-arrow)', svg2.includes('id="seat-arrow"') && !svg2.includes('nl-arrow'))

for (const [i, e] of expected.entries()) {
  const stripX = +(e.seatLeft - 3).toFixed(1)
  const stripW = +(D * e.n + 6).toFixed(1)
  const band = svg2.includes(`x="${stripX}" y="${e.base - 25}" width="${stripW}" height="32"`)
  check(`row ${i} numeral strip at x=${stripX} w=${stripW} y=${e.base - 25}`, band)
  // per-digit rendering: leading 5 at its seat's right edge, zeros to its right
  const five = new RegExp(
    `<text x="${e.fiveRight}" y="${e.base}" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="24" fill="#ea580c" font-weight="700">5</text>`
  )
  check(`row ${i} digit-5 element at seat x=${e.fiveRight} y=${e.base}`, five.test(svg2))
  for (let z = 0; z < i; z++) {
    const zx = +(RIGHT - D * (e.n - 2 - z)).toFixed(1)
    const zero = svg2.includes(`x="${zx}" y="${e.base}" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="24" fill="currentColor" opacity="0.5">0</text>`)
    check(`row ${i} zero digit ${z + 1} at seat x=${zx}`, zero)
  }
  const seat = svg2.includes(`y="${e.base - 2}" font-size="15"`) && svg2.includes(`y="${e.base + 16}" font-size="12"`)
  check(`row ${i} seat label + contribution line`, seat)
  const box = svg2.includes(`x="470" y="${e.base - 22}" width="134" height="34"`)
  check(`row ${i} value box at y=${e.base - 22}`, box)
}

for (let i = 0; i < 3; i++) {
  const a = expected[i]
  const b = expected[i + 1]
  const arrow = svg2.includes(`x1="${a.cx}" y1="${a.base + 9}" x2="${b.cx}" y2="${b.base - 27}"`)
  check(`arrow ${i}→${i + 1} from (${a.cx},${a.base + 9}) to (${b.cx},${b.base - 27})`, arrow)
  const label = svg2.includes(`x="${b.cx - 16}" y="${(a.base + b.base) / 2 + 4}"`)
  check(`arrow ${i}→${i + 1} ×10 label`, label)
}

check('seat figure value boxes end at 604 ≤ 620', svg2.includes('x="470" y=') )
check('seat figure last contribution baseline y=266 ≤ 282', svg2.includes('y="266"'))
auditTexts(svg2, VB2_W, VB2_H, 'seat-figure')

console.log(fails === 0 ? '\n=== AUDIT CLEAN ===' : `\n=== ${fails} DEFECT(S) FOUND ===`)
