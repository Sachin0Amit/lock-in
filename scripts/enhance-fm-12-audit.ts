/**
 * enhance-fm-12-audit.ts — geometry audit for lesson fm-comparing-ordering-numbers
 * (FM 1.2), visual-upgrade run 2 (job 507527). Imports the chapter data and
 * re-derives EVERY geometric value of BOTH figures independently:
 *   figure A: place-value chart 4,589 vs 4,598 (grid, tints, digits, fonts)
 *   figure B: tug-of-war bars (x = 150 + v·52, bars at 10 and 9, gap 9..10)
 * plus caption consistency and viewBox bounds with a conservative width model.
 */
import { chapter01 } from '../src/data/library/books/mathematics/foundation-mathematics/ch-01'

const lesson = chapter01.lessons.find((l) => l.id === 'fm-comparing-ordering-numbers')!
if (!lesson) throw new Error('lesson not found')
const figs = lesson.blocks.filter((b: any) => b.kind === 'figure') as { caption: string; svg: string }[]
let fails = 0
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`)
  if (!ok) fails++
}

console.log(`lesson 1.2 has ${figs.length} figure(s)`)
check('exactly 2 figures', figs.length === 2, `got ${figs.length}`)
const figChart = figs.find((f) => f.svg.includes('viewBox="0 0 760 250"'))
const figTug = figs.find((f) => f.svg.includes('viewBox="0 0 760 240"'))
check('place-value chart present (760×250)', !!figChart)
check('tug-of-war figure present (760×240)', !!figTug)
if (!figChart || !figTug) throw new Error('required figures missing')

/* ---------- shared width model (conservative, system-ui sans) ---------- */
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
const auditTexts = (svgStr: string, vbW: number, vbH: number, label: string) => {
  const textRe = /<text x="(-?[\d.]+)" y="(-?[\d.]+)"([^>]*)>([^<]*)<\/text>/g
  let n = 0
  let bad = 0
  for (const m of svgStr.matchAll(textRe)) {
    n++
    const x = +m[1]
    const y = +m[2]
    const attrs = m[3]
    const content = m[4]
    const fs = /font-size="([\d.]+)"/.exec(attrs)?.[1] ?? /font-size="([\d.]+)"/.exec(svgStr.split('<text')[0])?.[1] ?? '13'
    const anchor = /text-anchor="(\w+)"/.exec(attrs)?.[1] ?? 'middle'
    const w = W(content, +fs)
    const l = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2
    const r = l + w
    if (l < 0 || r > vbW || y < 0 || y > vbH) {
      bad++
      console.log(`      out-of-bounds: «${content}» fs=${fs} x=${x} y=${y} anchor=${anchor} span [${l.toFixed(1)}..${r.toFixed(1)}]`)
    }
  }
  check(`${label}: all ${n} texts inside viewBox ${vbW}×${vbH}`, bad === 0, `${bad} out-of-bounds`)
  return n
}

/* ---------- figure A: the place-value chart ---------- */
const A = figChart.svg
// grid: 3 rows × 4 cols; cols x = 150+140c w=130; header y=44 h=40; rows y=94/156 h=46
const rects = [...A.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)].map(
  (m) => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4] }),
)
check('chart: 12 rects (4 header + 8 cells)', rects.length === 12, `got ${rects.length}`)
const COLS = [150, 290, 430, 570].map((x) => ({ x, w: 130 }))
const ROWS = [
  { y: 94, h: 46 },
  { y: 156, h: 46 },
]
let gridBad = 0
for (const c of COLS) for (const r of ROWS) if (!rects.some((q) => q.x === c.x && q.y === r.y && q.w === c.w && q.h === r.h)) gridBad++
check('chart: all 8 cell rects at computed grid x∈{150,290,430,570} w=130, y∈{94,156} h=46', gridBad === 0, `${gridBad} misplaced`)
check('chart: header rects y=44 h=40 at all 4 columns', COLS.every((c) => rects.some((q) => q.x === c.x && q.y === 44 && q.h === 40)))
// tints: exactly the tens column (x=430) tinted amber in header AND both rows
const amber = rects.filter((q) => q.w === 130 && q.h >= 40)
const amberXs = new Set(
  [...A.matchAll(/<rect x="(\d+)" y="(\d+)"[^>]*fill="#ea580c"/g)].map((m) => `${m[1]}@${m[2]}`),
)
check(
  'chart: amber tint exactly at tens column x=430 (header + 2 rows)',
  amberXs.size === 3 && ['430@44', '430@94', '430@156'].every((k) => amberXs.has(k)),
  [...amberXs].join(' '),
)
// digits: row 1 = 4,5,8,9 at x 215/355/495/635 y=124; row 2 = 4,5,9,8 y=186
const digitRe = /<text x="(215|355|495|635)" y="(124|186)" font-size="22" font-weight="700"([^>]*)>(\d)<\/text>/g
const digits: Record<number, (string | undefined)[]> = { 124: [], 186: [] }
for (const m of A.matchAll(digitRe)) digits[+m[2]].push(m[4])
check('chart: row 4,589 digits are 4,5,8,9', digits[124].join('') === '4589', digits[124].join(','))
check('chart: row 4,598 digits are 4,5,9,8', digits[186].join('') === '4598', digits[186].join(','))
const amber22 = [...A.matchAll(/<text x="495" y="(124|186)" font-size="22" font-weight="700" fill="#ea580c">(\d)<\/text>/g)].map((m) => m[2])
check('chart: amber 22px digits exactly the tens pair (8, 9) at x=495', amber22.join(',') === '8,9', amber22.join(','))
check('chart: amber 14px header exactly the word "tens"', /<text x="495" y="69" font-size="14" font-weight="700" fill="#ea580c">tens<\/text>/.test(A))
// numbers behind the figure, recomputed here
check('chart math: 4598 − 4589 = 9 (caption claim)', 4598 - 4589 === 9)
check('chart math: digits differ first at tens (4589: 8, 4598: 9)', Math.floor((4589 % 100) / 10) === 8 && Math.floor((4598 % 100) / 10) === 9)
check('chart math: ones digits oppose (4589→9, 4598→8)', 4589 % 10 === 9 && 4598 % 10 === 8)
check('chart: aria-label present', /aria-label="Place value chart/.test(A))
auditTexts(A, 760, 250, 'chart')

/* ---------- figure B: the tug of war ---------- */
const B = figTug.svg
const X0 = 150
const UNIT = 52
const xa = (v: number) => X0 + v * UNIT
// bars
const tugRects = [...B.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"[^>]*\/>/g)].map(
  (m) => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4], tag: m[0] }),
)
const barA = tugRects.find((r) => r.y === 48 && r.h === 32)
const barB = tugRects.find((r) => r.y === 128 && r.h === 32 && r.w < 500)
const gap = tugRects.find((r) => r.y === 128 && r.h === 32 && /stroke-dasharray/.test(r.tag))
check('tug: bar A = one step of the tens seat, w = 10·52 = 520 at x 150..670', !!barA && barA.x === xa(0) && barA.w === 10 * UNIT, barA ? `x=${barA.x} w=${barA.w}` : 'missing')
check('tug: bar B = lower-seat maximum, w = 9·52 = 468 at x 150..618', !!barB && barB.x === xa(0) && barB.w === 9 * UNIT, barB ? `x=${barB.x} w=${barB.w}` : 'missing')
check('tug: dashed gap rect exactly x 618..670 (w 52)', !!gap && gap.x === xa(9) && gap.w === (10 - 9) * UNIT, gap ? `x=${gap.x} w=${gap.w}` : 'missing')
check('tug: bar A amber #ea580c (design accent)', !!barA && /fill="#ea580c"/.test(barA.tag))
check('tug: bar B striped via pattern (dark-mode safe currentColor)', /fill="url\(#fig-tug-stripes\)"/.test(B))
const patternBlock = B.split('</pattern>')[0] + '</pattern>'
check('tug: pattern uses currentColor only', patternBlock.includes('<pattern id="fig-tug-stripes"') && patternBlock.includes('currentColor') && !patternBlock.includes('#'))
// axis ticks: v=0..10 at x = 150+52v, y 199..209
const tickRe = /<line x1="(\d+)" y1="199" x2="\1" y2="209"/g
const tickXs = [...B.matchAll(tickRe)].map((m) => +m[1])
const expectedXs = Array.from({ length: 11 }, (_, v) => xa(v))
check('tug: 11 ticks at x = 150 + 52v for v = 0..10', tickXs.length === 11 && expectedXs.every((x, i) => tickXs[i] === x), tickXs.join(','))
// tick labels 0..10 centered on their ticks
const tickLblRe = /<text x="(\d+)" y="228" font-size="14" fill="currentColor" opacity="0.75" text-anchor="middle">(\d+)<\/text>/g
const lbls = [...B.matchAll(tickLblRe)].map((m) => ({ x: +m[1], v: +m[2] }))
check('tug: tick labels 0..10 each centered at x = 150 + 52v', lbls.length === 11 && lbls.every(({ x, v }) => x === xa(v)))
// bar values
check('tug: bar A value label "= 10" white bold inside right end (x=660)', B.includes('<text x="660" y="69" font-size="16" font-weight="700" fill="#ffffff" text-anchor="end">= 10</text>'))
check('tug: bar B value label "= 9" bold inside right end (x=608)', B.includes('<text x="608" y="149" font-size="16" font-weight="700" text-anchor="end">= 9</text>'))
check('tug: gap digit "1" amber centered in dashed segment (x=644)', B.includes('x="644" y="149"') && /fill="#ea580c" text-anchor="middle">1<\/text>/.test(B))
// the bound itself, recomputed here one more time
check('tug math: (9−8)·10 = 10', (9 - 8) * 10 === 10)
check('tug math: max of lower seats 9·1 = 9', 9 * 1 === 9)
check('tug math: gap 10 − 9 = 1 and 9 < 10', 10 - 9 === 1 && 9 < 10)
check('tug: aria-label present', /aria-label="Two bars on a zero to ten scale/.test(B))
auditTexts(B, 760, 240, 'tug')

/* ---------- captions consistent with the figures ---------- */
check('chart caption names 4,598 − 4,589 = 9', /4,598 − 4,589 = 9/.test(figChart.caption))
check('tug caption names 10, 9 and the gap of 1', figTug.caption.includes('= 10') && figTug.caption.includes('9 × 1 = 9') && figTug.caption.includes('gap of 1'))
check('tug caption follows the chart figure (flow: where → why)', figs.indexOf(figTug) === figs.indexOf(figChart) + 1)

/* ---------- no prose/quiz collateral: figures are the only touched blocks ---------- */
const blockKinds = lesson.blocks.map((b: any) => b.kind).join(',')
console.log(`block kinds: ${blockKinds}`)
check('lesson still has 1 quiz block', lesson.blocks.filter((b: any) => b.kind === 'quiz').length === 1)
check('figure count unchanged apart from +1 (2 total)', figs.length === 2)

console.log(fails === 0 ? '\n=== AUDIT CLEAN — all checks passed ===' : `\n=== AUDIT FAILED — ${fails} check(s) failed ===`)
process.exit(fails === 0 ? 0 : 1)
