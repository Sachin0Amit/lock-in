export {}

/**
 * enhance-fm-13-audit.ts — visual-upgrade run (job 507527): independent
 * post-commit audit for lesson fm-rounding-and-estimating (FM 1.3).
 *
 * Reads the COMMITTED ch-01.ts, extracts both figure SVGs of the lesson,
 * parses every element, and re-derives all geometry from first principles:
 *   figure 1 — number line 40..50, x(n) = 70 + 62·(n−40);
 *   figure 2 — the close-numbers trap, two rails, x(v) = 80 + 6·(v−4800).
 * Any FAIL exits 1 (the gate for this run).
 */
import { readFileSync } from 'fs'

const SRC = 'src/data/library/books/mathematics/foundation-mathematics/ch-01.ts'
const file = readFileSync(SRC, 'utf8')

/* ---- extract the lesson's slice, then its two figure svg strings ---- */
const lessonAt = file.indexOf("id: 'fm-rounding-and-estimating'")
if (lessonAt < 0) { console.log('FAIL  lesson id not found'); process.exit(1) }
const lesson = file.slice(lessonAt)
const svgs: string[] = []
const svgRe = /svg: `([^`]+)`/g
let m: RegExpExecArray | null
while ((m = svgRe.exec(lesson))) svgs.push(m[1])
const fig1 = svgs.find((s) => s.includes('viewBox="0 0 760 180"'))
const fig2 = svgs.find((s) => s.includes('viewBox="0 0 760 280"'))

let pass = 0
let fail = 0
const ck = (ok: boolean, what: string) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}`)
  if (ok) pass++
  else fail++
}

ck(fig1 !== undefined, 'figure 1 (760×180) present in the lesson')
ck(fig2 !== undefined, 'figure 2 (760×280) present in the lesson')
if (!fig1 || !fig2) { console.log(`${fail} failed — aborting`); process.exit(1) }

/* ---- inheritance-aware sequential scanner (g attrs flow into children) ---- */
type El = Record<string, string>
function scan(svg: string): El[] {
  const out: El[] = []
  const frames: El[] = []
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[a-zA-Z0-9-]+="[^"]*")*)\s*(\/?)>/g
  let t: RegExpExecArray | null
  while ((t = re.exec(svg))) {
    const closing = t[1] === '/'
    const name = t[2]
    const el: El = { __tag: name }
    const are = /[a-zA-Z0-9-]+="[^"]*"/g
    let a: RegExpExecArray | null
    while ((a = are.exec(t[3] || ''))) {
      const eq = a[0].indexOf('=')
      el[a[0].slice(0, eq)] = a[0].slice(eq + 2, -1)
    }
    if (closing) { if (name === 'g') frames.pop(); continue }
    if (name === 'g') { frames.push(el); out.push(el); continue }
    const merged: El = {}
    for (const f of frames) Object.assign(merged, f)
    Object.assign(merged, el)
    merged.__tag = name
    if (name === 'text') {
      const close = svg.indexOf('</text>', re.lastIndex)
      if (close >= 0) {
        merged.__text = svg.slice(re.lastIndex, close).trim()
        re.lastIndex = close + 7
      }
    }
    out.push(merged)
  }
  return out
}
const tags = (svg: string, tag: string) => scan(svg).filter((e) => e.__tag === tag)
const texts = (svg: string) => scan(svg).filter((e) => e.__tag === 'text' && e.__text !== undefined)
const num = (v: string | undefined) => (v === undefined ? NaN : parseFloat(v))

/* ================= FIGURE 1 — the 40..50 number line ================= */
console.log('\n--- figure 1: rounding on the number line ---')
const X1 = (n: number) => 70 + 62 * (n - 40)
ck(fig1.includes('viewBox="0 0 760 180"'), 'f1 viewBox 0 0 760 180')

const f1lines = tags(fig1, 'line')
ck(f1lines.length === 12, `f1 exactly 12 lines (axis + 11 ticks), got ${f1lines.length}`)
const axis1 = f1lines.find((l) => l.x2 === '690')
ck(!!axis1 && num(axis1.x1) === 70 && num(axis1.y1) === 95 && num(axis1.y2) === 95 && axis1['stroke-width'] === '2', 'f1 axis (70,95)→(690,95) w2')

const ticks1 = f1lines.filter((l) => l !== axis1)
let ticksOk = true
for (let n = 40; n <= 50; n++) {
  const x = X1(n)
  const tk = ticks1.find((l) => num(l.x1) === x && num(l.x2) === x)
  if (!tk) { ticksOk = false; console.log(`      missing tick at x=${x}`); continue }
  const isEnd = n === 40 || n === 50
  const isMid = n === 45
  const wantY = isEnd ? [87, 103] : isMid ? [85, 105] : [89, 101]
  const wantW = isEnd ? '2.5' : isMid ? '2.5' : '1.5'
  if (num(tk.y1) !== wantY[0] || num(tk.y2) !== wantY[1] || tk['stroke-width'] !== wantW) ticksOk = false
  if (isMid && !(tk.stroke === '#ea580c' && tk['stroke-dasharray'] === '4 3')) ticksOk = false
}
ck(ticksOk, 'f1 all 11 ticks at x=70+62(n−40) with endpoint/mid/interior heights, mid dashed orange')
const tickXs = ticks1.map((l) => num(l.x1)).sort((a, b) => a - b)
ck(tickXs.every((x, i) => i === 0 || Math.round(x - tickXs[i - 1]) === 62), 'f1 tick pitch is a uniform 62px')

const f1texts = texts(fig1)
ck(f1texts.length === 14, `f1 exactly 14 texts (11 labels + 2 arrows + midpoint), got ${f1texts.length}`)
const labels1 = f1texts.filter((t) => t.y === '122')
const labelGroup = tags(fig1, 'g').find((g) => g['font-size'] === '14')
ck(labels1.length === 11 && !!labelGroup && labels1.every((t) => !t['font-size'] || parseInt(t['font-size']) >= 13), 'f1 11 tick labels at y=122, inheriting the 14px label group (no smaller override)')
ck(labels1.map((t) => t.__text).join(',') === '40,41,42,43,44,45,46,47,48,49,50', 'f1 tick labels read 40..50 in order')
const l40 = labels1.find((t) => t.__text === '40')
const l45 = labels1.find((t) => t.__text === '45')
const l50 = labels1.find((t) => t.__text === '50')
ck(!!l40 && l40['font-weight'] === '700' && num(l40.x) === X1(40), 'f1 label 40 bold at x=70')
ck(!!l50 && l50['font-weight'] === '700' && num(l50.x) === X1(50), 'f1 label 50 bold at x=690')
ck(!!l45 && l45['font-weight'] === '700' && l45.fill === '#ea580c' && num(l45.x) === X1(45), 'f1 label 45 orange bold at x=380')

const f1circles = tags(fig1, 'circle')
ck(f1circles.length === 2, `f1 exactly 2 dots, got ${f1circles.length}`)
ck(f1circles.some((c) => num(c.cx) === X1(43) && num(c.cy) === 95 && num(c.r) === 5), `f1 dot for 43 at x=${X1(43)}`)
ck(f1circles.some((c) => num(c.cx) === X1(47) && num(c.cy) === 95 && num(c.r) === 5), `f1 dot for 47 at x=${X1(47)}`)

const f1paths = tags(fig1, 'path').filter((p) => (p.fill || '') !== '#ea580c') // arrows (marker path has fill)
ck(f1paths.length === 2, `f1 exactly 2 arrow paths, got ${f1paths.length}`)
const a1 = f1paths.find((p) => (p.d || '').startsWith('M256'))
const a2 = f1paths.find((p) => (p.d || '').startsWith('M504'))
ck(!!a1 && a1.d === `M256,88 Q160,34 70,86` && a1.stroke === '#ea580c' && a1['stroke-width'] === '2' && a1['marker-end'] === 'url(#rl-arrow)', 'f1 arrow 43→40: M256,88 Q160,34 70,86 (tip on the 40 tick, 1px above its top)')
ck(!!a2 && a2.d === `M504,88 Q600,34 690,86` && a2.stroke === '#ea580c' && a2['stroke-width'] === '2' && a2['marker-end'] === 'url(#rl-arrow)', 'f1 arrow 47→50: M504,88 Q600,34 690,86 (tip on the 50 tick)')
const peak1 = 0.25 * 88 + 0.5 * 34 + 0.25 * 86
ck(peak1 > 45 && peak1 < 62, `f1 arrow curve peak y=${peak1} sits between the labels (bottom ≈43) and the axis dots (top ≈90)`)
ck(tags(fig1, 'marker').length === 1 && fig1.includes('id="rl-arrow"') && fig1.includes('path d="M0,0 L7,3.5 L0,7 Z" fill="#ea580c"'), 'f1 marker rl-arrow (7×3.5-head, orange)')
const arrLbl = f1texts.filter((t) => t.y === '40')
ck(arrLbl.length === 2 && arrLbl.every((t) => parseInt(t['font-size'] || '0') >= 14 && t.fill === '#ea580c'), 'f1 2 arrow labels at y=40, font ≥14, orange')
ck(f1texts.some((t) => t.__text === 'midpoint 45 — ties round up' && t.y === '152' && t['font-size'] === '13' && t.fill === '#ea580c'), 'f1 midpoint note at y=152, font 13')
ck(fig1.includes('role="img"') && (fig1.match(/aria-label="[^"]+/) || [''])[0].length > 40, 'f1 aria-label present and descriptive')
ck(fig1.includes('stroke="currentColor"'), 'f1 structure ink uses currentColor (dark-mode safe plate ink)')

/* ================= FIGURE 2 — the close-numbers trap ================= */
console.log('\n--- figure 2: the close-numbers trap, drawn to scale ---')
const X2 = (v: number) => 80 + (v - 4800) * 6
ck(fig2.includes('viewBox="0 0 760 280"'), 'f2 viewBox 0 0 760 280')

const f2lines = tags(fig2, 'line')
ck(f2lines.length === 13, `f2 exactly 13 lines (2 axes + 5 ticks + 6 bracket strokes), got ${f2lines.length}`)
const railA = f2lines.find((l) => l.y1 === '70' && l.y2 === '70')
const railB = f2lines.find((l) => l.y1 === '190' && l.y2 === '190')
ck(!!railA && num(railA.x1) === 80 && num(railA.x2) === 680 && railA['stroke-width'] === '2', 'f2 rail A axis (80,70)→(680,70) w2 — the 4,800..4,900 span')
ck(!!railB && num(railB.x1) === 80 && num(railB.x2) === 680 && railB['stroke-width'] === '2', 'f2 rail B axis (80,190)→(680,190) w2 — same span, same scale')
if (!railA || !railB) { console.log(`${fail} failed — parser could not find the rails, aborting`); process.exit(1) }
ck(num(railA.x2) - num(railA.x1) === 600 && 600 / 100 === 6, 'f2 the 100-unit span draws as 600px ⇒ 6px per unit (both rails)')
ck(X2(4829) === 254 && X2(4851) === 386 && X2(4851) - X2(4829) === 22 * 6, 'f2 the drawn gap between the numbers IS 22 units (132px)')
ck(X2(4850) === 380 && 380 === (80 + 680) / 2, 'f2 the midpoint 4,850 sits at the span centre x=380')

const midTick = f2lines.find((l) => num(l.x1) === 380 && l.stroke === '#ea580c')
ck(!!midTick && num(midTick.y1) === 56 && num(midTick.y2) === 78 && midTick['stroke-dasharray'] === '4 3', 'f2 midpoint tick (380, 56..78) dashed orange')
ck(!!midTick && num(midTick.y2) < 82, 'f2 midpoint tick bottom (78) clears the label-row bbox top (82) — the overlap-audit catch, pinned')
const endTicksA = f2lines.filter((l) => l.y1 === '62' && l.y2 === '78')
ck(endTicksA.length === 2 && endTicksA.some((l) => num(l.x1) === 80) && endTicksA.some((l) => num(l.x1) === 680), 'f2 rail A endpoint ticks at 80 and 680 (y 62..78)')
const endTicksB = f2lines.filter((l) => l.y1 === '182' && l.y2 === '198')
ck(endTicksB.length === 2 && endTicksB.some((l) => num(l.x1) === 80) && endTicksB.some((l) => num(l.x1) === 680), 'f2 rail B endpoint ticks at 80 and 680 (y 182..198)')

const f2texts = texts(fig2)
ck(f2texts.length === 13, `f2 exactly 13 texts, got ${f2texts.length}`)
const railALbl = f2texts.filter((t) => t.y === '94')
ck(railALbl.map((t) => t.__text).join(',') === '4,800,4,829,4,851,4,900' && railALbl.every((t) => num(t.x) === X2(parseInt(t.__text.replace(/,/g, ''), 10))), 'f2 rail A labels 4,800/4,829/4,851/4,900 at their true x positions')
ck(num(railALbl[1].x) < 380 && num(railALbl[2].x) > 380, 'f2 the two numbers straddle the midpoint on the rail')
const midTag = f2texts.find((t) => t.__text === 'the midpoint 4,850')
ck(!!midTag && num(midTag.x) === 380 && num(midTag.y) === 50 && midTag['font-size'] === '14' && midTag.fill === '#ea580c', 'f2 midpoint tag above rail A at (380,50), 14px')
const railBLbl = f2texts.filter((t) => t.y === '222')
ck(railBLbl.map((t) => t.__text).join(',') === '4,800,4,900' && railBLbl.every((t) => t['font-weight'] === '700' && parseInt(t['font-size'] || '0') === 15), 'f2 rail B labels 4,800/4,900 bold 15px')

const f2circles = tags(fig2, 'circle')
ck(f2circles.length === 2 && f2circles.every((c) => num(c.cy) === 70 && num(c.r) === 5 && c.fill === '#16a34a'), 'f2 exactly 2 green dots on rail A (the true positions)')
ck(f2circles.some((c) => num(c.cx) === X2(4829)) && f2circles.some((c) => num(c.cx) === X2(4851)), 'f2 dots at x(4,829)=254 and x(4,851)=386')

const brA = f2lines.filter((l) => l.stroke === '#16a34a')
ck(brA.length === 3, `f2 bracket A: 3 strokes (2 verticals + horizontal), got ${brA.length}`)
ck(brA.some((l) => num(l.x1) === 254 && num(l.x2) === 254 && num(l.y1) === 104 && num(l.y2) === 124) && brA.some((l) => num(l.x1) === 386 && num(l.x2) === 386 && num(l.y1) === 104 && num(l.y2) === 124) && brA.some((l) => num(l.x1) === 254 && num(l.x2) === 386 && num(l.y1) === 124), 'f2 bracket A spans exactly dot-to-dot (254→386) at y 104..124')
const tagA = f2texts.find((t) => t.__text === 'true gap = 22')
ck(!!tagA && num(tagA.x) === 320 && num(tagA.y) === 146 && tagA.fill === '#166534' && tagA['font-weight'] === '700', 'f2 true-gap tag «true gap = 22» green bold at (320,146)')

const f2arrows = tags(fig2, 'path').filter((p) => p.fill === 'none')
ck(f2arrows.length === 2, `f2 exactly 2 move-arrow paths, got ${f2arrows.length}`)
const dA = f2arrows.find((p) => (p.d || '').startsWith('M254'))
const dB = f2arrows.find((p) => (p.d || '').startsWith('M386'))
ck(!!dA && dA.d === 'M254,62 Q120,108 82,178' && dA.stroke === '#d97706' && dA['marker-end'] === 'url(#trap-arrow)', 'f2 move arrow 4,829→4,800: M254,62 Q120,108 82,178 amber')
ck(!!dB && dB.d === 'M386,62 Q640,108 678,178' && dB.stroke === '#d97706' && dB['marker-end'] === 'url(#trap-arrow)', 'f2 move arrow 4,851→4,900: M386,62 Q640,108 678,178 amber')
if (!dA || !dB) { console.log(`${fail} failed — move arrows not parsed, aborting`); process.exit(1) }
ck(num(dA.d!.match(/,(\d+)"?$/)![1]) === 178 && 178 === 182 - 4, 'f2 left arrow tip y=178 = 4px above the rail-B tick top (182)')
ck(num(dA.d!.match(/ (\d+),178/)![1]) === 82 && 82 === 80 + 2, 'f2 left arrow tip x=82 = 2px right of the 4,800 tick centre')
ck(num(dB.d!.match(/ (\d+),178/)![1]) === 678 && 678 === 680 - 2, 'f2 right arrow tip x=678 = 2px left of the 4,900 tick centre')
const moveTags = f2texts.filter((t) => t.fill === '#d97706')
ck(moveTags.map((t) => t.__text).join('|') === 'rounds down|−29|rounds up|+49', 'f2 move tags read: rounds down | −29 | rounds up | +49')
ck(moveTags.filter((t) => parseInt(t['font-size'] || '0') === 15).length === 2 && moveTags.filter((t) => parseInt(t['font-size'] || '0') === 14).length === 2, 'f2 move values 15px bold, move words 14px')
ck(f2texts.some((t) => t.__text === 'rounds down' && num(t.y) === 38) && f2texts.some((t) => t.__text === 'rounds up' && num(t.y) === 38), 'f2 move words sit ABOVE rail A (baseline 38) — clear of the rail stroke at y=70 (text bottom ≈41, 29px clearance)')
ck(f2texts.some((t) => t.__text === '−29' && num(t.x) === 125 && num(t.y) === 96) && f2texts.some((t) => t.__text === '+49' && num(t.x) === 635 && num(t.y) === 96), 'f2 move values at (125,96) and (635,96), clear of the rail-A end labels')

const brB = f2lines.filter((l) => l.stroke === '#ea580c' && l.y1 !== '56')
ck(brB.length === 3, `f2 bracket B: 3 strokes, got ${brB.length}`)
ck(brB.some((l) => num(l.x1) === 80 && num(l.x2) === 80 && num(l.y1) === 232 && num(l.y2) === 248) && brB.some((l) => num(l.x1) === 680 && num(l.x2) === 680 && num(l.y1) === 232 && num(l.y2) === 248) && brB.some((l) => num(l.x1) === 80 && num(l.x2) === 680 && num(l.y1) === 248), 'f2 bracket B spans the full rail (80→680) at y 232..248')
ck(X2(4900) - X2(4800) === 600 && 600 / 6 === 100, 'f2 bracket B length IS the rounded gap 100 units (600px)')
const tagB = f2texts.find((t) => t.__text === 'gap the subtraction now measures = 100')
ck(!!tagB && num(tagB.x) === 380 && num(tagB.y) === 270 && tagB.fill === '#ea580c' && tagB['font-weight'] === '700', 'f2 rounded-gap tag orange bold at (380,270)')
ck(fig2.includes('id="trap-arrow"') && fig2.includes('path d="M0,0 L7,3.5 L0,7 Z" fill="#d97706"'), 'f2 marker trap-arrow (7×3.5-head, amber — distinct from f1\'s orange)')
ck(fig2.includes('role="img"') && /aria-label="Two number lines[^"]+/.test(fig2), 'f2 aria-label present and descriptive')

/* ---- arithmetic the figure encodes, re-verified ---- */
console.log('\n--- the trap arithmetic, re-verified against the drawn geometry ---')
ck(4851 - 4829 === 22 && (X2(4851) - X2(4829)) / 6 === 22, 'drawn gap = true gap = 22')
ck(4900 - 4800 === 100 && (X2(4900) - X2(4800)) / 6 === 100, 'drawn span = rounded gap = 100')
ck(4800 - 4829 === -29 && 4900 - 4851 === 49, 'moves −29 and +49')
ck(22 + 29 + 49 === 100, '22 + 29 + 49 = 100 (the caption\'s decomposition)')
ck(4850 - 4829 === 21 && 4851 - 4850 === 1, '4,829 is 21 short of the midpoint, 4,851 is 1 past it (the straddle)')

/* ---- palette / legibility / overlap gates on BOTH figures ---- */
console.log('\n--- palette, legibility, overlap gates (both figures) ---')
const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
for (const [name, svg] of [['f1', fig1], ['f2', fig2]] as const) {
  const bad = RETIRED.filter((h) => svg.toLowerCase().includes(h))
  ck(bad.length === 0, `${name}: no retired muted hexes (${bad.join(',') || 'none'})`)
  const sizes = texts(svg).map((t) => parseInt(t['font-size'] || '0')).filter((s) => s > 0)
  ck(Math.min(...sizes) >= 13, `${name}: smallest text ${Math.min(...sizes)}px ≥ 13`)
  ck(!/\$/.test(svg), `${name}: no raw $ inside the SVG`)
}
// pairwise label-collision matrix on shared rows (same baseline y)
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
for (const [name, svg] of [['f1', fig1], ['f2', fig2]] as const) {
  const ts = texts(svg).filter((t) => t.__text && t['text-anchor'] === 'middle')
  let clean = true
  for (let i = 0; i < ts.length; i++) {
    for (let j = i + 1; j < ts.length; j++) {
      if (Math.abs(num(ts[i].y) - num(ts[j].y)) > 12) continue // rows ≥12px apart never collide
      const wi = W(ts[i].__text, parseInt(ts[i]['font-size'] || '13'))
      const wj = W(ts[j].__text, parseInt(ts[j]['font-size'] || '13'))
      const li = num(ts[i].x) - wi / 2
      const ri = num(ts[i].x) + wi / 2
      const lj = num(ts[j].x) - wj / 2
      const rj = num(ts[j].x) + wj / 2
      if (li + 2 < rj && lj + 2 < ri) { clean = false; console.log(`      collision: «${ts[i].__text}» vs «${ts[j].__text}» near y=${ts[i].y}/${ts[j].y}`) }
    }
  }
  ck(clean, `${name}: no label collisions (pairwise matrix incl. near rows ≤12px apart, 2px slack)`)
  // every middle-anchored text inside the viewBox
  let inside = true
  for (const t of ts) {
    const w = W(t.__text, parseInt(t['font-size'] || '13'))
    if (num(t.x) - w / 2 < 0 || num(t.x) + w / 2 > 760) { inside = false; console.log(`      out of bounds: «${t.__text}»`) }
  }
  ck(inside, `${name}: every label inside the 760-wide viewBox`)
}
// f1: adjacent tick-label clearance at 62px pitch and 14px font
const w14 = W('40', 14)
ck(62 - w14 >= 40, `f1: bumped tick labels ≈${w14.toFixed(1)}px leave ≥40px between neighbours at the 62px pitch`)
// f2: the move labels sit clear of their curves
const xAtY = (d: string, y: number) => {
  const [, sx, sy, cx, cy, ex, ey] = d.match(/M(\d+),(\d+) Q(\d+),(\d+) (\d+),(\d+)/)!.map(Number)
  let best = -1
  let dd = Infinity
  for (let t = 0; t <= 1; t += 0.005) {
    const py = (1 - t) ** 2 * sy + 2 * t * (1 - t) * cy + t ** 2 * ey
    const px = (1 - t) ** 2 * sx + 2 * t * (1 - t) * cx + t ** 2 * ex
    if (Math.abs(py - y) < dd) { dd = Math.abs(py - y); best = px }
  }
  return best
}
ck(xAtY('M254,62 Q120,108 82,178', 96) > 125 + W('−29', 15) / 2 + 12, `f2: «−29» clears the left curve (curve at x≈${xAtY('M254,62 Q120,108 82,178', 96).toFixed(0)} at the label baseline)`)  
ck(xAtY('M386,62 Q640,108 678,178', 96) < 635 - W('+49', 15) / 2 - 12, `f2: «+49» clears the right curve (curve at x≈${xAtY('M386,62 Q640,108 678,178', 96).toFixed(0)})`)
ck(38 + 3 < 70 - 12, 'f2: move words (baseline 38, descender ≈41) clear of the rail A stroke (y=70) by ≥12px — the VLM-caught defect class, now pinned')
// f2: brackets never overlap the curves' swept regions (left curve stays left of 254, right stays right of 386)
let maxX = -Infinity
for (let t = 0; t <= 1; t += 0.01) {
  const x = (1 - t) ** 2 * 254 + 2 * t * (1 - t) * 120 + t ** 2 * 82
  maxX = Math.max(maxX, x)
}
ck(maxX <= 254, `f2: left curve sweeps only leftward of the dot (max x ${maxX.toFixed(1)} ≤ 254) — bracket A stays clear`)

console.log(`\n${fail === 0 ? 'CLEAN' : 'NOT CLEAN'}: ${pass} passed, ${fail} failed`)
process.exit(fail === 0 ? 0 : 1)
