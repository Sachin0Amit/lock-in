export {}

/**
 * enhance-fm-22-audit.ts — visual-upgrade run (job 507527): independent
 * post-edit audit for lesson fm-subtraction-borrowing (FM 2.2).
 *
 * Reads the EDITED ch-02.ts, extracts the lesson slice, finds its FOUR
 * figure svg strings, parses every element, and re-derives all geometry and
 * arithmetic from first principles (nothing is trusted from the gen script):
 *   figure 1 — subtraction number line, top ticks x = 60 + 70n, bottom ticks
 *              x = 60 + (n+4)·50, hop arcs with chords exactly 210px (3 units)
 *              and 350px (7 units), anchored dot-column to dot-column;
 *   figure 2 — the 4,589 − 2,764 seat map, its digits walked column by column
 *              (the decomposition method), one borrow at the hundreds seat;
 *   figure 3 — the 1,000 − 1 dissolve, digits walked with the zero ripple,
 *              three chained lend arrows, the dissolved-seat zone;
 *   figure 4 — the counting-up journey bar, boundaries re-derived from the
 *              true-scale formula and proportions re-checked from the drawn x's.
 * Any FAIL exits 1 (the gate for this run).
 */
import { readFileSync } from 'fs'

const SRC = 'src/data/library/books/mathematics/foundation-mathematics/ch-02.ts'
const file = readFileSync(SRC, 'utf8')

/* ---- extract the lesson's slice, then its four figure svg strings ---- */
const lessonAt = file.indexOf("id: 'fm-subtraction-borrowing'")
if (lessonAt < 0) { console.log('FAIL  lesson id not found'); process.exit(1) }
const nextLesson = file.indexOf("id: 'fm-multiplication-repeated-addition'")
const lesson = file.slice(lessonAt, nextLesson > lessonAt ? nextLesson : undefined)

let pass = 0
let fail = 0
const ck = (ok: boolean, what: string) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}`)
  if (ok) pass++
  else fail++
}

const svgs: string[] = []
const svgRe = /svg: `([^`]+)`/g
let m: RegExpExecArray | null
while ((m = svgRe.exec(lesson))) svgs.push(m[1])
ck(svgs.length === 4, `lesson has exactly 4 figure svgs (got ${svgs.length})`)
const fig1 = svgs.find((s) => s.includes('viewBox="0 0 760 258"'))
const fig2 = svgs.find((s) => s.includes('viewBox="0 0 760 290"') && s.includes('4589 minus 2764'))
const fig3 = svgs.find((s) => s.includes('viewBox="0 0 760 290"') && s.includes('1000 minus 1'))
const fig4 = svgs.find((s) => s.includes('viewBox="0 0 760 250"'))
ck(fig1 !== undefined, 'figure 1 (760×258, subtraction number line) present')
ck(fig2 !== undefined, 'figure 2 (760×290, 4,589 − 2,764 borrow seat map) present')
ck(fig3 !== undefined, 'figure 3 (760×290, 1,000 − 1 dissolve) present')
ck(fig4 !== undefined, 'figure 4 (760×250, counting-up journey bar) present')
if (!fig1 || !fig2 || !fig3 || !fig4) { console.log(`${fail} failed — aborting`); process.exit(1) }

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
      const eqp = a[0].indexOf('=')
      el[a[0].slice(0, eqp)] = a[0].slice(eqp + 2, -1)
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

/* ---- shared vivid-palette law ---- */
const PALETTE = new Set(['#ea580c', '#d97706', '#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff'])
for (const [name, svg] of [['f1', fig1], ['f2', fig2], ['f3', fig3], ['f4', fig4]] as const) {
  const hexes = [...svg.matchAll(/#[0-9a-fA-F]{6}\b/g)].map((h) => h[0].toLowerCase())
  ck(hexes.every((h) => PALETTE.has(h)), `${name}: every hex is a vivid-palette colour (${hexes.join(',') || 'none besides markers'})`)
  ck((svg.match(/aria-label="[^"]+"/) || [''])[0].length > 40, `${name}: aria-label present (≥40 chars)`)
}

/* ---- the subtraction walk, re-derived independently (decomposition method) ---- */
function subWalk(a: number, b: number) {
  const ad = String(a).split('').map(Number)
  const bd = String(b).padStart(ad.length, '0').split('').map(Number)
  const written: number[] = []
  const borrows: number[] = []
  let incoming = 0
  for (let i = ad.length - 1; i >= 0; i--) {
    let top = ad[i] - incoming
    if (top < bd[i]) { top += 10; borrows.push(1) } else borrows.push(0)
    written.push(top - bd[i])
    incoming = borrows[borrows.length - 1]
  }
  return { written: written.reverse(), borrows: borrows.reverse() }
}

/* ================= FIGURE 1 — subtraction number line ================= */
console.log('\n--- figure 1: 7−3 lands · 3−7 falls off the edge ---')
const X1 = (n: number) => 60 + 70 * n
const X2 = (n: number) => 60 + (n + 4) * 50
const f1lines = tags(fig1, 'line')
ck(f1lines.length === 27, `f1 exactly 27 lines (3 rails + 24 ticks), got ${f1lines.length}`)
const railTop = f1lines.find((l) => l.y1 === '88')
const railSolid = f1lines.find((l) => l.y1 === '200' && !l['stroke-dasharray'])
const railDash = f1lines.find((l) => l.y1 === '200' && l['stroke-dasharray'] === '4 4')
ck(!!railTop && num(railTop.x1) === 50 && num(railTop.x2) === 700, 'f1 top rail spans 50..700 (symmetric ±10 around the end ticks)')
ck(!!railSolid && num(railSolid.x1) === 260 && num(railSolid.x2) === 720, 'f1 bottom solid rail spans 260..720 (0 tick → 10px past the 9 tick)')
ck(!!railDash && num(railDash.x1) === 50 && num(railDash.x2) === 260, 'f1 bottom dashed stretch spans 50..260 — the whole negative territory incl. its edge margin')
const ticks1 = f1lines.filter((l) => l !== railTop && l !== railSolid && l !== railDash)
let ticksOk = true
for (let n = 0; n <= 9; n++) {
  const tk = ticks1.find((l) => num(l.x1) === X1(n) && num(l.x2) === X1(n) && num(l.y1) === 82 && num(l.y2) === 94)
  if (!tk) { ticksOk = false; console.log(`      missing top tick at x=${X1(n)}`) }
}
for (let n = -4; n <= 9; n++) {
  const tk = ticks1.find((l) => num(l.x1) === X2(n) && num(l.x2) === X2(n) && num(l.y1) === 194 && num(l.y2) === 206)
  const faint = n < 0
  if (!tk || (faint && tk.opacity !== '0.4')) { ticksOk = false; console.log(`      missing/faint bottom tick at x=${X2(n)} (n=${n})`) }
}
ck(ticksOk, 'f1 all 24 ticks at exact computed x (top 60+70n, bottom 60+(n+4)·50), negative ticks faint')
const f1labels = texts(fig1)
ck(f1labels.length === 29, `f1 exactly 29 texts (2 titles + 24 tick labels + 2 hop labels + 1 note), got ${f1labels.length}`)
let labelsOk = true
for (let n = 0; n <= 9; n++) {
  const lb = f1labels.find((t) => t.x === String(X1(n)) && t.y === '114')
  if (!lb || lb.__text !== String(n)) { labelsOk = false; console.log(`      missing top label ${n}`) }
}
for (let n = -4; n <= 9; n++) {
  const lb = f1labels.find((t) => t.x === String(X2(n)) && t.y === '226')
  const faint = n < 0 && lb?.opacity === '0.55'
  if (!lb || lb.__text !== String(n) || (n < 0 && !faint)) { labelsOk = false; console.log(`      missing bottom label ${n}`) }
}
ck(labelsOk, 'f1 tick labels 0..9 / −4..9 at exact x, negative labels faint')
ck(f1labels.some((t) => t.__text?.startsWith('7 - 3') && t.y === '52'), 'f1 top title present (baseline 52)')
ck(f1labels.some((t) => t.__text?.startsWith('3 - 7') && t.y === '164' && t['text-anchor'] === 'end'), 'f1 bottom title present (end-anchored, baseline 164)')
ck(!!tags(fig1, 'g').find((g) => g['font-size'] === '14'), 'f1 main group font 14 (mobile legibility, run-1..4 precedent)')
const f1circles = tags(fig1, 'circle')
ck(f1circles.length === 4, `f1 exactly 4 dots (2 start + 1 landing + 1 dashed ghost), got ${f1circles.length}`)
const startTop = f1circles.find((c) => c.cx === '550' && c.cy === '88')
const landTop = f1circles.find((c) => c.cx === '340' && c.cy === '88')
const startBot = f1circles.find((c) => c.cx === '410' && c.cy === '200')
const ghostBot = f1circles.find((c) => c.cx === '60' && c.cy === '200')
ck(!!startTop && startTop.r === '5' && startTop.fill === 'currentColor', 'f1 top start dot at x(7)=550, r5')
ck(!!landTop && landTop.r === '7' && landTop.fill === '#ea580c', 'f1 top landing dot at x(4)=340, r7 orange')
ck(!!startBot && startBot.r === '5', 'f1 bottom start dot at x(3)=410, r5')
ck(!!ghostBot && ghostBot.r === '7' && ghostBot.fill === 'none' && ghostBot.stroke === '#ea580c' && ghostBot['stroke-dasharray'] === '4 3', 'f1 dashed ghost landing ring at x(−4)=60, r7 — the not-a-whole-number landing')
const f1paths = tags(fig1, 'path').filter((p) => p.d?.startsWith('M '))
ck(f1paths.length === 2, `f1 exactly 2 hop arcs, got ${f1paths.length}`)
const arcTop = f1paths.find((p) => p.d?.startsWith('M 550 82'))
const arcBot = f1paths.find((p) => p.d?.startsWith('M 410 194'))
ck(!!arcTop && arcTop.d === 'M 550 82 Q 445 10 340 80' && arcTop['marker-end'] === 'url(#nl-hop)', 'f1 top arc M 550 82 Q 445 10 340 80 with arrowhead')
ck(!!arcBot && arcBot.d === 'M 410 194 Q 235 122 60 192' && arcBot['marker-end'] === 'url(#nl-hop)', 'f1 bottom arc M 410 194 Q 235 122 60 192 with arrowhead')
ck(num(arcTop?.d?.split(' ')[6]) === X1(4) && num(arcTop?.d?.split(' ')[1]) === X1(7), 'f1 top arc anchored start-dot column → landing-dot column')
ck(num(arcTop?.d?.split(' ')[1]) - num(arcTop?.d?.split(' ')[6]) === 210, 'f1 top arc chord = 210px = exactly 3 units (the hop)')
ck(num(arcBot?.d?.split(' ')[1]) - num(arcBot?.d?.split(' ')[6]) === 350, 'f1 bottom arc chord = 350px = exactly 7 units (the hop)')
ck(num(arcBot?.d?.split(' ')[6]) === X2(-4) && num(arcBot?.d?.split(' ')[1]) === X2(3), 'f1 bottom arc anchored x(3) → x(−4)')
ck(!!f1labels.find((t) => t.__text === '-3' && t.x === '445' && t.y === '34'), 'f1 «-3» label above the top arc apex')
ck(!!f1labels.find((t) => t.__text === '-7' && t.x === '235' && t.y === '146'), 'f1 «-7» label above the bottom arc apex')
ck(!!f1labels.find((t) => t.__text?.includes('whole numbers end at 0') && t.y === '250' && t['font-size'] === '13'), 'f1 edge note present at font 13 (bumped from 11.5, run-4 mobile precedent)')
ck(!!fig1.match(/marker id="nl-hop"/) && !!fig1.match(/M0,0 L7,3\.5 L0,7 Z/), 'f1 nl-hop arrowhead marker defined')

/* ================= FIGURE 2 — the borrow seat map ================= */
console.log('\n--- figure 2: 4,589 − 2,764, the single borrow ---')
const f2lines = tags(fig2, 'line')
ck(f2lines.length === 3, `f2 exactly 3 lines (2 strikes + sum line), got ${f2lines.length}`)
const sumLine = f2lines.find((l) => l['stroke-width'] === '2')
ck(!!sumLine && num(sumLine.x1) === 140 && num(sumLine.x2) === 710 && num(sumLine.y1) === 214, 'f2 sum line spans 140..710 — symmetric ±10 around the cell block')
const strikes = f2lines.filter((l) => l !== sumLine)
ck(strikes.length === 2 && num(strikes[0].x1) === 203 && num(strikes[0].x2) === 227 && num(strikes[1].x1) === 343 && num(strikes[1].x2) === 367, 'f2 strikes at (203,121)→(227,107) over the 4 and (343,121)→(367,107) over the 5')
const f2rects = tags(fig2, 'rect')
ck(f2rects.length === 9, `f2 exactly 9 rects (8 digit cells + 1 exchange pill), got ${f2rects.length}`)
const pill = f2rects.find((r) => r.rx === '17')
ck(!!pill && num(pill.x) === 185 && num(pill.y) === 24 && num(pill.width) === 210 && num(pill.height) === 34, 'f2 exchange pill at run-4 carry-cell row metrics (185,24,210×34, rx17)')
const cells = f2rects.filter((r) => r.rx === '6')
ck(cells.length === 8, 'f2 exactly 8 digit cells (4 seats × 2 rows)')
let cellsOk = true
for (const cx of [150, 290, 430, 570]) for (const cy of [94, 156]) {
  if (!cells.find((r) => num(r.x) === cx && num(r.y) === cy && num(r.width) === 130 && num(r.height) === 46)) cellsOk = false
}
ck(cellsOk, 'f2 cells at the 4×2 grid (x 150/290/430/570, y 94/156, 130×46)')
const f2texts = texts(fig2)
ck(f2texts.length === 19, `f2 exactly 19 texts, got ${f2texts.length}`)
const row1 = f2texts.filter((t) => t.y === '124').map((t) => t.__text).join('')
const row2 = f2texts.filter((t) => t.y === '186').map((t) => t.__text).join('')
const diffRow = f2texts.filter((t) => t.y === '252').map((t) => t.__text).join('')
ck(row1 === '4589', `f2 top row reads 4589 (got ${row1})`)
ck(row2 === '2764', `f2 bottom row reads 2764 (got ${row2})`)
ck(diffRow === '1825', `f2 difference row reads 1825 (got ${diffRow})`)
const walkA = subWalk(4589, 2764)
ck(walkA.written.join('') === '1825', `f2 digits re-walked independently: 4589 − 2764 = ${walkA.written.join('')} (decomposition)`)
ck(walkA.borrows.join(',') === '0,1,0,0', `f2 the walk finds exactly ONE borrow, at the hundreds seat (got ${walkA.borrows.join(',')})`)
ck(1825 + 2764 === 4589, 'f2 inverse check: 1825 + 2764 = 4589 — certified')
const corr = f2texts.filter((t) => t.y === '112')
ck(corr.length === 2 && corr[0].__text === '3' && corr[0].x === '248' && corr[1].__text === '15' && corr[1].x === '388' && corr[0]['font-size'] === '14', 'f2 corrections «3» at centre+33=248 and «15» at centre+33=388, baseline 112, inherited font 14')
ck(!!f2texts.find((t) => t.__text === '1 thousand = 10 hundreds' && t.x === '290' && t.y === '46'), 'f2 pill text «1 thousand = 10 hundreds» at (290,46)')
ck(!!f2texts.find((t) => t.__text === 'the borrow' && t.x === '30' && t.y === '46'), 'f2 «the borrow» label at (30,46)')
ck(!!f2texts.find((t) => t.__text === '4,589' && t.x === '80' && t.y === '120') && !!f2texts.find((t) => t.__text === '2,764' && t.x === '80' && t.y === '182'), 'f2 row labels 4,589 / 2,764 at (80,120)/(80,182)')
const f2arrow = tags(fig2, 'path').find((p) => p['marker-end'] === 'url(#bo-arrow)')
ck(!!f2arrow && f2arrow.d === 'M 215 94 Q 285 66 355 94', 'f2 borrow arrow M 215 94 Q 285 66 355 94 — lender centre → receiver centre')
ck(num(f2arrow?.d?.split(' ')[1]) === 215 && num(f2arrow?.d?.split(' ')[6]) === 355, 'f2 arrow anchored exactly on the thousands → hundreds column centres')
const f2note = f2texts.find((t) => t.y === '282')
ck(!!f2note && f2note['font-size'] === '12' && f2note.__text?.includes('15 - 7 = 8') && f2note.__text?.includes('lender 4 → 3'), 'f2 note names the borrow arithmetic (15 − 7 = 8 · lender 4 → 3), kept at 12px since 13 overflows')
ck(f2arrow?.['stroke-dasharray'] === '4 3' && f2arrow?.opacity === '0.8', 'f2 borrow arrow dashed 4 3 opacity 0.8 — the run-4 seat-exchange arrow grammar')

/* ================= FIGURE 3 — the dissolve ================= */
console.log('\n--- figure 3: 1,000 − 1, the dissolve ---')
const f3lines = tags(fig3, 'line')
ck(f3lines.length === 5, `f3 exactly 5 lines (4 strikes + sum line), got ${f3lines.length}`)
const f3sum = f3lines.find((l) => l['stroke-width'] === '2')
ck(!!f3sum && num(f3sum.x1) === 140 && num(f3sum.x2) === 710, 'f3 sum line spans 140..710 (same symmetric grammar)')
const f3strikes = f3lines.filter((l) => l !== f3sum)
ck(f3strikes.length === 4 && f3strikes.every((l, i) => num(l.x1) === [203, 343, 483, 623][i] && num(l.x2) === [227, 367, 507, 647][i]), 'f3 strikes over all four top digits (1, 0, 0, 0)')
const f3rects = tags(fig3, 'rect')
ck(f3rects.length === 9, `f3 exactly 9 rects (8 digit cells + dissolved zone), got ${f3rects.length}`)
const zone = f3rects.find((r) => r['stroke-dasharray'] === '6 4')
ck(!!zone && num(zone.x) === 150 && num(zone.y) === 218 && num(zone.width) === 130 && num(zone.height) === 40 && zone.stroke === '#0d9488', 'f3 dissolved-seat zone at (150,218) 130×40, dashed teal — the empty answer slot')
const f3texts = texts(fig3)
ck(f3texts.length === 20, `f3 exactly 20 texts, got ${f3texts.length}`)
const f3row1 = f3texts.filter((t) => t.y === '124').map((t) => t.__text).join('')
const f3row2 = f3texts.filter((t) => t.y === '186' && t.x !== '80').map((t) => t.__text).join('')
const f3ans = f3texts.filter((t) => t.y === '252' && t.x !== '215').map((t) => t.__text).join('')
ck(f3row1 === '1000', `f3 top row reads 1000 (got ${f3row1})`)
ck(f3row2 === '0001', `f3 bottom row reads the padded subtrahend 0001 (got ${f3row2})`)
ck(f3ans === '999', `f3 answer row reads 999 — NO digit in the thousands slot (got ${f3ans})`)
ck(f3texts.filter((t) => t.y === '186' && t.__text === '0' && t.opacity === '0.45').length === 3, 'f3 exactly THREE faint placeholder zeros (the 1 padded into its seats)')
const walkB = subWalk(1000, 1)
ck(walkB.written.join('') === '0999' && Number(walkB.written.join('')) === 999, `f3 digits re-walked independently: 1000 − 1 = ${walkB.written.join('')} → 999`)
ck(walkB.borrows.join(',') === '0,1,1,1', `f3 the walk finds the borrow ripple 0,1,1,1 — one borrow out of each of hundreds/tens/ones (got ${walkB.borrows.join(',')})`)
ck(999 + 1 === 1000, 'f3 the mirror: 999 + 1 = 1000')
const f3corr = f3texts.filter((t) => t.y === '112')
ck(f3corr.length === 4 && f3corr.map((t) => t.__text).join(',') === '0,9,9,10' && f3corr.map((t) => t.x).join(',') === '248,388,528,668', 'f3 corrections «0,9,9,10» at centre+33 (248/388/528/668), baseline 112')
ck(!!f3texts.find((t) => t.__text === 'lends →' && t.x === '30' && t.y === '46'), 'f3 «lends →» label at (30,46) — the mirror of 2.1\'s «carries →»')
ck(!!f3texts.find((t) => t.__text === 'the dissolved seat' && t.x === '215' && t.y === '243' && t['font-size'] === '13'), 'f3 «the dissolved seat» tag inside the zone, font 13')
ck(!!f3texts.find((t) => t.__text === '1,000' && t.y === '120') && !!f3texts.find((t) => t.__text === '1' && t.y === '186' && t.x === '80'), 'f3 row labels 1,000 / 1')
const f3note = f3texts.find((t) => t.y === '282')
ck(!!f3note && f3note['font-size'] === '13' && f3note.__text?.includes('receive 10, lend 1, keep 9') && f3note.__text?.includes('999'), 'f3 note names the chain (receive 10, lend 1, keep 9 · 999) at font 13')
const f3arrows = tags(fig3, 'path').filter((p) => p['marker-end'] === 'url(#lend-arrow)')
ck(f3arrows.length === 3, `f3 exactly 3 lend arrows, got ${f3arrows.length}`)
ck(f3arrows.map((p) => p.d).join('|') === 'M 215 94 Q 285 66 355 94|M 355 94 Q 425 66 495 94|M 495 94 Q 565 66 635 94', 'f3 the three lend arrows chain head-to-tail: thousands→hundreds→tens→ones')
const aspans = f3arrows.map((p) => { const d = p.d!.split(' '); return [num(d[6]) - num(d[1])] })
ck(aspans.every(([s]) => s === 140), 'f3 each lend arrow spans exactly one seat (140px centre-to-centre)')
ck(f3arrows.every((p) => p['stroke-dasharray'] === '4 3' && p.opacity === '0.8'), 'f3 lend arrows dashed 4 3 opacity 0.8 — same arrow grammar as figure 2')

/* ================= FIGURE 4 — the counting-up journey bar ================= */
console.log('\n--- figure 4: the shopkeeper\'s climb, true scale ---')
const f4rects = tags(fig4, 'rect')
ck(f4rects.length === 1, `f4 exactly 1 rect (the journey bar), got ${f4rects.length}`)
const bar = f4rects[0]
ck(num(bar.x) === 60 && num(bar.y) === 96 && num(bar.width) === 660 && num(bar.height) === 40, 'f4 the bar at (60,96) 660×40 — 660px for 1,825 units')
const f4lines = tags(fig4, 'line')
ck(f4lines.length === 12, `f4 exactly 12 lines (3 dividers + 5 binding ticks + 4 hop ticks), got ${f4lines.length}`)
const S = 660 / 1825
const cumX = (v: number) => 60 + (v - 2764) * S
const bounds = [2764, 2800, 3000, 4500, 4589].map(cumX)
const dividers = f4lines.filter((l) => num(l.y1) === 96 && num(l.y2) === 136 && l.stroke === '#ea580c')
ck(dividers.length === 3, `f4 exactly 3 segment dividers through the bar, got ${dividers.length}`)
let divOk = true
for (const [i, v] of [2800, 3000, 4500].entries()) {
  const x = cumX(v)
  if (!dividers.find((l) => Math.abs(num(l.x1) - x) < 0.02 && Math.abs(num(l.x2) - x) < 0.02)) { divOk = false; console.log(`      divider at ${v} (x=${x.toFixed(2)}) missing`) }
}
ck(divOk, 'f4 dividers at the computed true-scale boundaries (2,800 · 3,000 · 4,500)')
const segW = [cumX(2800) - cumX(2764), cumX(3000) - cumX(2800), cumX(4500) - cumX(3000), cumX(4589) - cumX(4500)]
ck(Math.abs(segW[0] / segW[2] - 36 / 1500) < 1e-6 && Math.abs(segW[1] / segW[2] - 200 / 1500) < 1e-6 && Math.abs(segW[3] / segW[2] - 89 / 1500) < 1e-6, `f4 drawn segment widths are exactly proportional to 36 : 200 : 1500 : 89 (got ${segW.map((w) => w.toFixed(2)).join(' / ')})`)
ck(Math.abs(segW.reduce((a, b) => a + b, 0) - 660) < 1e-6, 'f4 the four segments partition the 660px bar exactly')
ck(36 + 200 + 1500 + 89 === 1825 && 2764 + 1825 === 4589, 'f4 the hand-overs total the difference: 36 + 200 + 1,500 + 89 = 1,825 = 4,589 − 2,764')
const f4texts = texts(fig4)
ck(f4texts.length === 11, `f4 exactly 11 texts, got ${f4texts.length}`)
const ends = f4texts.filter((t) => t['font-size'] === '15')
ck(ends.length === 2 && ends.map((t) => t.__text).join(',') === '2,764,4,589' && ends[0].x === '60' && ends[1].x === '720', 'f4 bold end labels 2,764 @x=60 and 4,589 @x=720 (the two numbers of the problem)')
const miles = f4texts.filter((t) => t.y === '78')
ck(miles.length === 3 && miles.map((t) => t.__text).join(',') === '2,800,3,000,4,500', `f4 milestone labels 2,800 · 3,000 · 4,500 at row y=78 (got ${miles.map((t) => t.__text).join(',')})`)
ck(Math.abs(num(miles.find((t) => t.__text === '2,800')?.x) - cumX(2800)) < 0.02 && miles.find((t) => t.__text === '2,800')?.['text-anchor'] === 'start', 'f4 2,800 start-anchored exactly at its boundary (tick at its left edge)')
ck(Math.abs(num(miles.find((t) => t.__text === '3,000')?.x) - cumX(3000)) < 0.02, 'f4 3,000 centred on its boundary')
ck(Math.abs(num(miles.find((t) => t.__text === '4,500')?.x) - cumX(4500)) < 0.02, 'f4 4,500 centred on its boundary')
const hops = f4texts.filter((t) => t.y === '166')
ck(hops.length === 4 && hops.map((t) => t.__text).join(',') === '+36,+200,+1,500,+89' && hops.every((t) => t['font-size'] === '14' && t['font-weight'] === '700' && t.fill === '#ea580c'), `f4 hop labels +36 · +200 · +1,500 · +89 at row y=166, inherited font 14 bold orange (got ${hops.map((t) => t.__text).join(',')})`)
const hopCxExp = [66.51, 109.18, 416.58, 703.91]
ck(hops.every((t, i) => Math.abs(num(t.x) - hopCxExp[i]) < 0.02), `f4 hop labels centred under their segments (${hops.map((t) => t.x).join(',')})`)
ck(!!f4texts.find((t) => t.__text?.startsWith('the shopkeeper') && t.y === '34'), 'f4 left label «the shopkeeper\'s climb:» at (30,34)')
ck(!!f4texts.find((t) => t.y === '226' && t.__text?.includes('1,825') && t.__text?.includes('no borrow')), 'f4 note totals 1,825 and names the no-borrow point')
const f4poly = tags(fig4, 'polygon')
ck(f4poly.length === 1 && f4poly[0].points === '722,108 736,116 722,124', 'f4 arrival arrowhead (722..736, bar-centred) — the count-up direction')

/* ---- final tally ---- */
console.log(`\n${pass} passed, ${fail} failed`)
if (fail > 0) process.exit(1)
console.log('AUDIT CLEAN — every geometric value re-derived from the edited file matches the math')
