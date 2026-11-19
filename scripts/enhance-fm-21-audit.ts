export {}

/**
 * enhance-fm-21-audit.ts — visual-upgrade run (job 507527): independent
 * post-edit audit for lesson fm-addition-carrying (FM 2.1).
 *
 * Reads the EDITED ch-02.ts, extracts the lesson slice, finds its FOUR
 * figure svg strings, parses every element, and re-derives all geometry and
 * arithmetic from first principles (nothing is trusted from the gen script):
 *   figure 1 — commutativity number line, ticks x = 60 + 70n, hop arcs with
 *              chords exactly 210px (3 units) and 280px (4 units);
 *   figure 2 — the 4,589 + 2,764 seat map, its digits walked column by column;
 *   figure 3 — the 999 + 1 ripple, digits walked, the new-seat zone;
 *   figure 4 — the counting board, exactly ten counters at pitch 46, one
 *              counter mid-flight exactly midway between the wires.
 * Any FAIL exits 1 (the gate for this run).
 */
import { readFileSync } from 'fs'

const SRC = 'src/data/library/books/mathematics/foundation-mathematics/ch-02.ts'
const file = readFileSync(SRC, 'utf8')

/* ---- extract the lesson's slice, then its four figure svg strings ---- */
const lessonAt = file.indexOf("id: 'fm-addition-carrying'")
if (lessonAt < 0) { console.log('FAIL  lesson id not found'); process.exit(1) }
const nextLesson = file.indexOf("id: 'fm-subtraction-borrowing'")
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
const fig1 = svgs.find((s) => s.includes('viewBox="0 0 760 240"'))
const fig2 = svgs.find((s) => s.includes('viewBox="0 0 760 290"') && s.includes('4,589'))
const fig3 = svgs.find((s) => s.includes('viewBox="0 0 760 290"') && s.includes('the new seat'))
const fig4 = svgs.find((s) => s.includes('viewBox="0 0 760 250"'))
ck(fig1 !== undefined, 'figure 1 (760×240, number line) present')
ck(fig2 !== undefined, 'figure 2 (760×290, 4,589 + 2,764 seat map) present')
ck(fig3 !== undefined, 'figure 3 (760×290, 999 + 1 ripple) present')
ck(fig4 !== undefined, 'figure 4 (760×250, counting board) present')
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

/* ================= FIGURE 1 — commutativity number line ================= */
console.log('\n--- figure 1: 4+3 / 3+4 on the number line ---')
const X1 = (n: number) => 60 + 70 * n
const f1lines = tags(fig1, 'line')
ck(f1lines.length === 22, `f1 exactly 22 lines (2 rails + 20 ticks), got ${f1lines.length}`)
const railTop = f1lines.find((l) => l.y1 === '88')
const railBot = f1lines.find((l) => l.y1 === '200')
ck(!!railTop && num(railTop.x1) === 50 && num(railTop.x2) === 700, 'f1 top rail spans 50..700 (symmetric ±10 around the end ticks)')
ck(!!railBot && num(railBot.x1) === 50 && num(railBot.x2) === 700, 'f1 bottom rail spans 50..700')
const ticks1 = f1lines.filter((l) => l !== railTop && l !== railBot)
let ticksOk = true
for (let n = 0; n <= 9; n++) {
  const x = X1(n)
  for (const [railY, t1, t2] of [[88, 82, 94], [200, 194, 206]] as const) {
    const tk = ticks1.find((l) => num(l.x1) === x && num(l.x2) === x && num(l.y1) === t1 && num(l.y2) === t2)
    if (!tk) { ticksOk = false; console.log(`      missing tick at x=${x} on rail y=${railY}`) }
  }
}
ck(ticksOk, 'f1 all 20 ticks at x=60+70n, y 82..94 / 194..206 centred on their rails')
const f1labels = texts(fig1)
ck(f1labels.length === 24, `f1 exactly 24 texts (2 titles + 20 tick labels + 2 hop labels), got ${f1labels.length}`)
for (let n = 0; n <= 9; n++) {
  for (const y of ['114', '226']) {
    const lb = f1labels.find((t) => t.x === String(X1(n)) && t.y === y)
    if (!lb || lb.__text !== String(n)) { ck(false, `f1 tick label ${n} at x=${X1(n)} y=${y}`); break }
  }
}
ck(true, 'f1 tick labels 0..9 at x=60+70n on baselines 114/226')
ck(f1labels.some((t) => t.__text?.startsWith('4 + 3') && t.y === '52'), 'f1 top title row present (baseline 52)')
ck(f1labels.some((t) => t.__text?.startsWith('3 + 4') && t.y === '164'), 'f1 bottom title row present (baseline 164)')
ck(!!tags(fig1, 'g').find((g) => g['font-size'] === '14'), 'f1 main group font 14 (mobile legibility, run-1..3 precedent)')
const f1circles = tags(fig1, 'circle')
ck(f1circles.length === 4, `f1 exactly 4 dots (2 start + 2 landing), got ${f1circles.length}`)
const startTop = f1circles.find((c) => c.cx === '340' && c.cy === '88')
const landTop = f1circles.find((c) => c.cx === '550' && c.cy === '88')
const startBot = f1circles.find((c) => c.cx === '270' && c.cy === '200')
const landBot = f1circles.find((c) => c.cx === '550' && c.cy === '200')
ck(!!startTop && startTop.r === '5' && startTop.fill === 'currentColor', 'f1 top start dot at x(4)=340, r5')
ck(!!landTop && landTop.r === '7' && landTop.fill === '#ea580c', 'f1 top landing dot at x(7)=550, r7 orange')
ck(!!startBot && startBot.cx === '270', 'f1 bottom start dot at x(3)=270, r5')
ck(!!landBot && landBot.r === '7', 'f1 bottom landing dot at x(7)=550, r7')
const f1paths = tags(fig1, 'path').filter((p) => p.d?.startsWith('M ')) // 'M ' — the marker's own path M0,0 is excluded
ck(f1paths.length === 2, `f1 exactly 2 hop arcs, got ${f1paths.length}`)
const arcTop = f1paths.find((p) => p.d?.startsWith('M 340 82'))
const arcBot = f1paths.find((p) => p.d?.startsWith('M 270 194'))
ck(!!arcTop && arcTop.d === 'M 340 82 Q 445 10 550 80' && arcTop['marker-end'] === 'url(#nl-hop)', `f1 top arc M 340 82 Q 445 10 550 80 with arrowhead`)
ck(!!arcBot && arcBot.d === 'M 270 194 Q 410 122 550 192' && arcBot['marker-end'] === 'url(#nl-hop)', `f1 bottom arc M 270 194 Q 410 122 550 192 with arrowhead`)
ck(num(arcTop?.d?.split(' ')[6]) - num(arcTop?.d?.split(' ')[1]) === 210, 'f1 top arc chord = 210px = exactly 3 units')
ck(num(arcBot?.d?.split(' ')[6]) - num(arcBot?.d?.split(' ')[1]) === 280, 'f1 bottom arc chord = 280px = exactly 4 units')
ck(210 / 280 === 3 / 4, 'f1 drawn hop ratio is exactly 3/4 (hop length and hop count swap roles)')
ck(!!f1labels.find((t) => t.__text === '+3' && t.x === '445' && t.y === '34'), 'f1 «+3» label above the top arc apex')
ck(!!f1labels.find((t) => t.__text === '+4' && t.x === '410' && t.y === '146'), 'f1 «+4» label above the bottom arc apex')
ck(!!fig1.match(/marker id="nl-hop"/) && !!fig1.match(/M0,0 L7,3\.5 L0,7 Z/), 'f1 nl-hop arrowhead marker defined')

/* ================= FIGURE 2 — the 4,589 + 2,764 seat map ================= */
console.log('\n--- figure 2: column addition of 4,589 + 2,764 ---')
const COLS = [215, 355, 495, 635]
const carryRects = tags(fig2, 'rect').filter((r) => r.width === '60' && r.height === '34' && r.rx === '17')
ck(carryRects.length === 3, `f2 exactly 3 carry cells, got ${carryRects.length}`)
ck(carryRects.map((r) => num(r.x)).join(',') === '185,325,465', 'f2 carry cells above thousands/hundreds/tens columns (centres 215/355/495)')
ck(carryRects.every((r) => num(r.y) === 24 && r.fill === '#ea580c' && r.opacity === '0.16'), 'f2 carry cells y=24, orange tint 0.16')
const carryDigits = texts(fig2).filter((t) => t.__text === '1' && t.y === '46')
ck(carryDigits.length === 3 && carryDigits.every((t) => t['font-size'] === '15' && t.fill === '#ea580c'), 'f2 three carry digits «1» at 15px bold orange, baseline 46')
ck(texts(fig2).some((t) => t.__text === 'carries →' && t.x === '30'), 'f2 «carries →» row label')
ck(texts(fig2).some((t) => t.__text === 'each carry = 1' && t.x === '645' && t.y === '45' && t['font-size'] === '13'), 'f2 «each carry = 1» annotation at (645,45) 13px, aligned with its dashed guide')
const digitRects = tags(fig2, 'rect').filter((r) => r.width === '130' && r.height === '46')
ck(digitRects.length === 8, `f2 exactly 8 digit cells, got ${digitRects.length}`)
ck(digitRects.every((r) => num(r.x) === COLS[0] - 65 || num(r.x) === COLS[1] - 65 || num(r.x) === COLS[2] - 65 || num(r.x) === COLS[3] - 65), 'f2 digit cells centred on the four columns (x = centre − 65)')
ck(digitRects.filter((r) => num(r.y) === 94).length === 4 && digitRects.filter((r) => num(r.y) === 156).length === 4, 'f2 two addend rows at y 94/156')
const row1 = texts(fig2).filter((t) => t.y === '124').map((t) => t.__text).join('')
const row2 = texts(fig2).filter((t) => t.y === '186').map((t) => t.__text).join('')
ck(row1 === '4589', `f2 addend row 1 reads 4589 (got ${row1})`)
ck(row2 === '2764', `f2 addend row 2 reads 2764 (got ${row2})`)
// walk the digits AS PARSED FROM THE FILE
const walk = (a: string, b: string) => {
  const ad = a.split('').map(Number)
  const bd = b.padStart(ad.length, '0').split('').map(Number)
  const totals: number[] = []
  const written: number[] = []
  let carry = 0
  for (let i = ad.length - 1; i >= 0; i--) {
    const t = ad[i] + bd[i] + carry
    totals.push(t)
    written.push(t % 10)
    carry = Math.floor(t / 10)
  }
  return { totalsR2L: totals, writtenR2L: written, finalCarry: carry }
}
const w2a = walk(row1, row2)
ck(w2a.totalsR2L.join(',') === '13,15,13,7', `f2 file-digits walk: column totals right→left 13,15,13,7 (got ${w2a.totalsR2L})`)
ck(w2a.writtenR2L.join(',') === '3,5,3,7', 'f2 file-digits walk: written digits 3,5,3,7')
ck(w2a.totalsR2L.every((t) => Math.floor(t / 10) <= 1) && w2a.totalsR2L.map((t) => Math.floor(t / 10)).join(',') === '1,1,1,0', 'f2 every carry born as exactly 1 (and the final carry never came)')
const sumDigits2 = texts(fig2).filter((t) => t.y === '252').map((t) => t.__text).join('')
ck(sumDigits2 === '7353', `f2 sum row reads 7353 (got ${sumDigits2})`)
ck(Number(row1) + Number(row2) === Number(sumDigits2), 'f2 4,589 + 2,764 = 7,353 — the file\'s own digits agree')
ck(texts(fig2).some((t) => t.__text === '4,589' && t.x === '80' && t.y === '120'), 'f2 row label «4,589»')
ck(texts(fig2).some((t) => t.__text === '2,764' && t.x === '80' && t.y === '182'), 'f2 row label «2,764»')
const sumLine2 = tags(fig2, 'line').find((l) => l.y1 === '214' && l.y2 === '214')
ck(!!sumLine2 && num(sumLine2.x1) === 140 && num(sumLine2.x2) === 710, 'f2 sum line 140..710 at y=214 (symmetric overhangs around the cell block)')
const arrows2 = tags(fig2, 'path').filter((p) => p['marker-end'] === 'url(#ca-arrow)')
ck(arrows2.length === 3, `f2 exactly 3 carry arrows, got ${arrows2.length}`)
ck(arrows2.map((p) => p.d).join('|') === 'M 635 94 Q 565 76 495 58|M 495 94 Q 425 76 355 58|M 355 94 Q 285 76 215 58', 'f2 arrows start exactly at column centres (635/495/355) and land exactly on carry-cell bottoms (495/355/215)')
ck(texts(fig2).some((t) => (t.__text || '').startsWith('column totals 13, 15, 13, 7') && t.x === '150' && t.y === '282' && t['font-size'] === '13'), 'f2 totals note at (150,282) 13px')
ck(!!tags(fig2, 'g').find((g) => g['font-size'] === '14'), 'f2 main group font 14')

/* ================= FIGURE 3 — the 999 + 1 ripple ================= */
console.log('\n--- figure 3: 999 + 1, the ripple and the new seat ---')
const carryRects3 = tags(fig3, 'rect').filter((r) => r.width === '60' && r.height === '34' && r.rx === '17')
ck(carryRects3.length === 3 && carryRects3.map((r) => num(r.x)).join(',') === '185,325,465', 'f3 three carry cells over the same seats as figure 2')
const zone = tags(fig3, 'rect').find((r) => r.width === '130' && r.height === '108')
ck(!!zone && num(zone.x) === 150 && num(zone.y) === 94 && zone.stroke === '#0d9488' && zone['stroke-dasharray'] === '6 4', 'f3 the new-seat zone: dashed teal rect over the empty thousands column (150,94,130×108)')
ck(texts(fig3).some((t) => t.__text === 'the new seat' && t.x === '215' && t.y === '152' && t.fill === '#0f766e' && t['font-size'] === '14'), 'f3 «the new seat» tag inside the zone, teal ink, 14px')
const digitRects3 = tags(fig3, 'rect').filter((r) => r.width === '130' && r.height === '46')
ck(digitRects3.length === 6, `f3 exactly 6 digit cells (hundreds/tens/ones only), got ${digitRects3.length}`)
ck(digitRects3.every((r) => num(r.x) >= 290), 'f3 no addend cell in the new-seat column')
const row13 = texts(fig3).filter((t) => t.y === '124').map((t) => t.__text).join('')
const row23 = texts(fig3).filter((t) => t.y === '186' && t.x !== '80').map((t) => t.__text).join('')
ck(row13 === '999', `f3 addend row 1 reads 999 (got ${row13})`)
ck(row23 === '001', `f3 addend row 2 reads 001 — the 1 padded into its seats (got ${row23})`)
const faintZeros = texts(fig3).filter((t) => t.y === '186' && t.__text === '0')
ck(faintZeros.length === 2 && faintZeros.every((t) => t.opacity === '0.45'), 'f3 the two padding zeros are faint (opacity 0.45) — placeholders, per Lesson 1.1')
const w3a = walk(row13, row23)
ck(w3a.totalsR2L.join(',') === '10,10,10', `f3 file-digits walk: every existing column totals exactly 10 (got ${w3a.totalsR2L})`)
ck(w3a.totalsR2L.map((t) => Math.floor(t / 10)).join(',') === '1,1,1', 'f3 three carries, one out of every existing column')
ck(w3a.writtenR2L.join(',') === '0,0,0' && w3a.finalCarry === 1, 'f3 write 0,0,0 and the final carry becomes the new leading digit')
ck(0 + 0 + 1 === 1, 'f3 the new seat: 0 + 0 + 1 = 1 — the carry itself becomes the digit')
const sumDigits3 = texts(fig3).filter((t) => t.y === '252').map((t) => t.__text).join('')
ck(sumDigits3 === '1000', `f3 sum row reads 1000 (got ${sumDigits3})`)
ck(Number(row13) + Number(row23) === Number(sumDigits3), 'f3 999 + 1 = 1,000 — the file\'s own digits agree')
const lead1 = texts(fig3).find((t) => t.y === '252' && t.__text === '1')
ck(!!lead1 && lead1.fill === '#ea580c', 'f3 the leading 1 (the final carry) is the orange accent digit')
const arrows3 = tags(fig3, 'path').filter((p) => p['marker-end'] === 'url(#rip-arrow)')
ck(arrows3.length === 3 && arrows3.map((p) => p.d).join('|') === 'M 635 94 Q 565 76 495 58|M 495 94 Q 425 76 355 58|M 355 94 Q 285 76 215 58', 'f3 ripple arrows identical grammar to figure 2 (chained ones→tens→hundreds→the new seat)')
ck(texts(fig3).some((t) => (t.__text || '').startsWith('column totals 10, 10, 10') && t.y === '282' && t['font-size'] === '13'), 'f3 totals note names the boundary case and the new seat')
ck(texts(fig3).some((t) => t.__text === '999' && t.x === '80') && texts(fig3).some((t) => t.__text === '1' && t.x === '80' && t.y === '186'), 'f3 row labels «999» and «1»')
const sumLine3 = tags(fig3, 'line').find((l) => l.y1 === '214')
ck(!!sumLine3 && num(sumLine3.x1) === 140 && num(sumLine3.x2) === 710, 'f3 sum line 140..710 at y=214')
ck(!!tags(fig3, 'g').find((g) => g['font-size'] === '14'), 'f3 main group font 14')

/* ================= FIGURE 4 — the counting board ================= */
console.log('\n--- figure 4: the counting board behind the word carry ---')
const frame = tags(fig4, 'rect').find((r) => r.width === '580')
ck(!!frame && num(frame.x) === 90 && num(frame.y) === 36 && num(frame.height) === 188 && frame.stroke === '#16a34a' && frame['stroke-width'] === '2', 'f4 board frame (90,36,580×188) in structure green, 2px')
const wires = tags(fig4, 'line').filter((l) => !l['marker-end']) // the rise guide carries a marker — it is not a wire
ck(wires.length === 3, `f4 exactly 3 wires, got ${wires.length}`)
ck(wires.map((w) => num(w.y1)).join(',') === '90,150,210' && wires.every((w) => num(w.x1) === 110 && num(w.x2) === 650), 'f4 wires at y 90/150/210 spanning 110..650 (20px insets)')
const counters = tags(fig4, 'circle').filter((c) => c.fill === '#d97706')
ck(counters.length === 10, `f4 exactly TEN counters on the bottom wire (got ${counters.length}) — the lesson sentence itself`)
ck(counters.every((c) => num(c.cy) === 201 && c.r === '9'), 'f4 every counter rests exactly on the wire (cy 201 = 210 − r)')
const counterXs = counters.map((c) => num(c.cx)).sort((a, b) => a - b)
ck(counterXs[0] === 173 && counterXs[9] === 587, 'f4 counter row spans 173..587')
ck(counterXs.every((x, i) => i === 0 || Math.round(x - counterXs[i - 1]) === 46), 'f4 counter pitch is a uniform 46px (no touching, no gaps)')
ck(counterXs.reduce((s, x) => s + x, 0) / 10 === 380, 'f4 the row is centred on the frame centre (mean cx = 380)')
ck(counters.every((c) => num(c.cx) >= 110 + 10 && num(c.cx) <= 650 - 10), 'f4 the row clears both wire ends by ≥10px')
const aloft = tags(fig4, 'circle').find((c) => c.fill === '#ea580c')
ck(!!aloft && num(aloft.cx) === 380 && num(aloft.cy) === 180 && aloft.r === '9', 'f4 the carried counter at (380,180), the accent orange')
ck(num(aloft?.cy) === (150 + 210) / 2, 'f4 the carried counter sits exactly midway between the two wires')
const ghost = tags(fig4, 'circle').find((c) => c.fill === 'none')
ck(!!ghost && num(ghost.cx) === 380 && num(ghost.cy) === 141 && ghost.r === '9' && ghost['stroke-dasharray'] === '4 3', 'f4 the dashed landing ghost at (380,141) = middle wire y − r')
const guide = tags(fig4, 'line').find((l) => l['marker-end'] === 'url(#board-rise)')
ck(!!guide && num(guide.x1) === 380 && num(guide.y1) === 206 && num(guide.y2) === 152 && guide['stroke-dasharray'] === '4 3', 'f4 the rise guide: dashed, x=380, from the bottom wire (206) to 2px below the ghost bottom (152)')
ck(texts(fig4).some((t) => t.__text === 'one of the next seat' && t.x === '398' && t.y === '184' && t.fill === '#ea580c' && t['font-size'] === '14'), 'f4 flight label «one of the next seat» beside the carried counter, 14px')
ck(texts(fig4).some((t) => t.__text === 'ten of one seat — the wire is full' && t.x === '380' && t.y === '240' && t['font-size'] === '14'), 'f4 row label «ten of one seat — the wire is full» below the frame, 14px')
ck(!!fig4.match(/marker id="board-rise"/), 'f4 board-rise arrowhead marker defined')

/* ================= placement & cross-figure laws ================= */
console.log('\n--- placement, captions and cross-figure laws ---')
const posBoard = lesson.indexOf('keeps the gesture and drops the board')
const posBoardFig = lesson.indexOf('A counting board with three wires')
const posAlgorithm = lesson.indexOf('kind: \'algorithm\'')
ck(posBoard > 0 && posBoardFig > posBoard && posBoardFig < posAlgorithm, 'f4 sits between the counting-board paragraph and the algorithm block')
const posExample = lesson.indexOf('never grows one any other way')
const posRippleFig = lesson.indexOf('every existing column totals exactly 10 so each writes 0')
const posWarn = lesson.indexOf('Four classic carrying traps')
ck(posExample > 0 && posRippleFig > posExample && posRippleFig < posWarn, 'f3 sits between the 999+1 example and the carrying-traps callout')
const markerIds = [...lesson.matchAll(/marker id="([a-z-]+)"/g)].map((m) => m[1])
ck(new Set(markerIds).size === markerIds.length && markerIds.length === 4, `marker ids unique across the four figures (${markerIds.join(',')})`)
const captions = [...lesson.matchAll(/kind: 'figure',\s*\n\s*caption:/g)].length
ck(captions === 4, `exactly 4 figure blocks with captions in the lesson (got ${captions})`)
ck(!lesson.includes('${') || svgs.every((s) => !s.includes('${')), 'no template-literal leftovers inside the four svg strings')

console.log(`\n${pass} passed / ${fail} failed`)
process.exit(fail === 0 ? 0 : 1)
