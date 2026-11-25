import type { Lesson } from '../../src/data/library/types'

/**
 * PART-CF38 — lesson 3.8 'Decimal and Binary Number System' (the cf38 seat,
 * CS RUN 6). The SYNTHESIS seat of chapter 3: the two systems set side by
 * side as ONE idea (positional notation wearing different alphabets), plus
 * the chapter's first meeting with binary ARITHMETIC — addition with
 * carries, subtraction with borrows, multiplication as shifts and adds.
 * Every conversion fact is CITED forward (3.1 / 3.2 / 3.6 / 3.7), never
 * re-drilled. All numbers printed are brute-forced green by v-cf38.ts.
 *
 * PROVENANCE: ground = the sanctioned web-verified arcs banked at planning
 * (citation key `cs-cf-web-ground`, docs/project/SOURCE_LOG.md).
 * STUDY-NEVER-REPRODUCE absolute: every figure, Illustration, quiz item and
 * exercise is OUR OWN. Historical notes are our own honest retelling of
 * documented events (Boole 1854; Shannon 1937 thesis).
 */

/* palette (vivid set; never blue/indigo) */
const C = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const FONT = 'ui-sans-serif, system-ui, sans-serif'

/* ------------------------------------------------------------------ */
/* helper: one centred (or anchored) SVG text node                     */
/* ------------------------------------------------------------------ */
function cf38Txt(x: number, y: number, size: number, fill: string, text: string, weight = 'normal', anchor = 'middle'): string {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}">${text}</text>`
}

/* ------------------------------------------------------------------ */
/* GENERIC BUILDER 1 — the side-by-side counting strip                 */
/* body figure F2 (0-10) and the 0-8 solution figure                   */
/* ------------------------------------------------------------------ */
interface Cf38StripCfg {
  W: number
  title: string
  subtitle: string
  to: number
  marks: number[]
  decMark: number | null
  note1: string
  note2: string
  aria: string
}

function cf38StripSvg(cfg: Cf38StripCfg): string {
  const W = cfg.W
  const M = 20
  const x0 = 122
  const n = cfg.to + 1
  const colW = Math.min(58, (W - M - x0) / n)
  const gridW = n * colW
  const gx = x0 + (W - M - x0 - gridW) / 2
  const headY = 82
  const decTop = 96
  const cellH = 42
  const binTop = decTop + cellH + 14
  const markY = binTop + cellH + 8
  const stripY = markY + 28
  const stripH = 62
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${cfg.aria}">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf38Txt(W / 2, 32, 13, C.teal, cfg.title, 'bold'))
  s.push(cf38Txt(W / 2, 52, 10, C.tealInk, cfg.subtitle))
  s.push(cf38Txt(M, headY, 10, C.tealInk, 'count', 'bold', 'start'))
  for (let k = 0; k < n; k++) {
    const cx = gx + k * colW + colW / 2
    s.push(cf38Txt(cx, headY, 9.5, C.tealInk, String(k)))
  }
  /* the decimal row */
  s.push(cf38Txt(M, decTop + cellH / 2 + 5, 10, C.tealInk, 'base 10', 'bold', 'start'))
  for (let k = 0; k < n; k++) {
    const bx = gx + k * colW
    const marked = cfg.decMark === k
    s.push(`<rect x="${bx + 2}" y="${decTop}" width="${colW - 4}" height="${cellH}" rx="8" fill="${marked ? C.panelA : C.white}" stroke="${marked ? C.accent : C.struct}" stroke-width="2"/>`)
    s.push(cf38Txt(bx + colW / 2, decTop + cellH / 2 + 6, 15, C.ink, String(k), 'bold'))
  }
  /* the binary row */
  s.push(cf38Txt(M, binTop + cellH / 2 + 5, 10, C.tealInk, 'base 2', 'bold', 'start'))
  for (let k = 0; k < n; k++) {
    const bx = gx + k * colW
    const marked = cfg.marks.includes(k)
    s.push(`<rect x="${bx + 2}" y="${binTop}" width="${colW - 4}" height="${cellH}" rx="8" fill="${marked ? C.panelA : C.white}" stroke="${marked ? C.accent : C.struct}" stroke-width="2"/>`)
    s.push(cf38Txt(bx + colW / 2, binTop + cellH / 2 + 5.5, 13, C.ink, k.toString(2), 'bold'))
  }
  /* the new-column markers under the binary row */
  for (const k of cfg.marks) {
    if (k > cfg.to) continue
    const cx = gx + k * colW + colW / 2
    s.push(`<polygon points="${cx},${markY} ${cx - 4.5},${markY + 7} ${cx + 4.5},${markY + 7}" fill="${C.accent}"/>`)
    s.push(cf38Txt(cx, markY + 18, 9, C.accent, 'new column'))
  }
  /* the footer strip */
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.paper}" stroke="${C.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 25, 11.5, C.ink, cfg.note1, 'bold'))
  s.push(cf38Txt(W / 2, stripY + 45, 9.5, C.tealInk, cfg.note2))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F1 — the family portrait (both anatomies + 4 dresses)   */
/* ------------------------------------------------------------------ */
function cf38PortraitSvg(): string {
  const W = 760
  const M = 20
  const decDigits = ['4', '7', '2', '8']
  const decPlaces = ['1000', '100', '10', '1']
  const binDigits = ['1', '0', '1', '1', '0', '1']
  const binPlaces = ['32', '16', '8', '4', '2', '1']
  const decCellW = 68
  const binCellW = 58
  const cellGap = 10
  const decGridW = 4 * decCellW + 3 * cellGap
  const binGridW = 6 * binCellW + 5 * cellGap
  const decX = (W - decGridW) / 2
  const binX = (W - binGridW) / 2
  const decLabelY = 78
  const decTop = 90
  const digitH = 44
  const decPlaceTop = decTop + digitH + 6
  const placeH = 34
  const decExpY = decPlaceTop + placeH + 22
  const midY = decExpY + 22
  const binLabelY = midY + 26
  const binTop = binLabelY + 14
  const binPlaceTop = binTop + digitH + 6
  const binExpY = binPlaceTop + placeH + 22
  const stripY = binExpY + 20
  const stripH = 62
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The family portrait. Top panel, decimal, base 10: the numeral 4,728 as four digit cells 4, 7, 2, 8 over place values 1000, 100, 10 and 1, expanding to 4 times 1000 plus 7 times 100 plus 2 times 10 plus 8 times 1 equals 4,728. Bottom panel, binary, base 2: the numeral 101101 as six digit cells 1, 0, 1, 1, 0, 1 over place values 32, 16, 8, 4, 2 and 1, expanding to 1 times 32 plus 0 times 16 plus 1 times 8 plus 1 times 4 plus 0 times 2 plus 1 times 1 equals 45. A footer strip shows one number in four dresses: 45 equals 101101 in base 2, 55 in base 8 and 2D in base 16.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf38Txt(W / 2, 30, 13, C.teal, 'the family portrait: one machine, two alphabets', 'bold'))
  s.push(cf38Txt(W / 2, 50, 10, C.tealInk, 'value = each digit x its place, summed - the machinery never changes, only the alphabet'))
  /* decimal panel */
  s.push(cf38Txt(W / 2, decLabelY, 11, C.ink, 'DECIMAL - base 10: ten digits, 0 through 9', 'bold'))
  decDigits.forEach((d, k) => {
    const x = decX + k * (decCellW + cellGap)
    s.push(`<rect x="${x}" y="${decTop}" width="${decCellW}" height="${digitH}" rx="8" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
    s.push(cf38Txt(x + decCellW / 2, decTop + 30, 20, C.ink, d, 'bold'))
    s.push(`<rect x="${x}" y="${decPlaceTop}" width="${decCellW}" height="${placeH}" rx="8" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
    s.push(cf38Txt(x + decCellW / 2, decPlaceTop + 22, 12.5, C.tealInk, decPlaces[k], 'bold'))
  })
  s.push(cf38Txt(W / 2, decExpY, 11, C.ink, '4 x 1000 + 7 x 100 + 2 x 10 + 8 x 1 = 4,728'))
  /* the connector */
  s.push(cf38Txt(W / 2, midY, 10, C.teal, 'the same formula - swap the alphabet and the ladder, and it evaluates either panel'))
  /* binary panel */
  s.push(cf38Txt(W / 2, binLabelY, 11, C.ink, 'BINARY - base 2: two digits, 0 and 1', 'bold'))
  binDigits.forEach((d, k) => {
    const x = binX + k * (binCellW + cellGap)
    s.push(`<rect x="${x}" y="${binTop}" width="${binCellW}" height="${digitH}" rx="8" fill="${d === '1' ? C.panelA : C.white}" stroke="${d === '1' ? C.accent : C.struct}" stroke-width="2"/>`)
    s.push(cf38Txt(x + binCellW / 2, binTop + 30, 20, C.ink, d, 'bold'))
    s.push(`<rect x="${x}" y="${binPlaceTop}" width="${binCellW}" height="${placeH}" rx="8" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
    s.push(cf38Txt(x + binCellW / 2, binPlaceTop + 22, 12.5, C.tealInk, binPlaces[k], 'bold'))
  })
  s.push(cf38Txt(W / 2, binExpY, 11, C.ink, '1 x 32 + 0 x 16 + 1 x 8 + 1 x 4 + 0 x 2 + 1 x 1 = 45'))
  /* the four-dress footer */
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.paper}" stroke="${C.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 25, 12, C.ink, 'one number, four dresses: 45 = 101101 in base 2 = 55 in base 8 = 2D in base 16', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 45, 9.5, C.tealInk, 'the witness of lesson 3.2, cited one last time - translation, not arithmetic'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F3 — the carry cascade 111 + 1 = 1000                   */
/* ------------------------------------------------------------------ */
function cf38CascadeSvg(): string {
  const W = 760
  const M = 20
  const colW = 56
  const gridW = 4 * colW
  const gx = 64
  const places = ['8', '4', '2', '1']
  const placeY = 82
  const carryCy = 110
  const carryR = 10
  const rowATop = 150
  const rowH = 44
  const rowBTop = rowATop + rowH + 8
  const ruleY = rowBTop + rowH + 12
  const sumTop = ruleY + 10
  const sumH = 46
  const noteX = 340
  const noteYs = [150, 182, 214, 246]
  const stripY = sumTop + sumH + 20
  const stripH = 58
  const H = stripY + stripH + M
  const colCx = (i: number) => gx + i * colW + colW / 2
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The carry cascade for 111 plus 1 in binary, equal to 1000. Four columns for place values 8, 4, 2 and 1. The addends 111 and 1 sit in two rows above a rule, the sum 1000 below it. Three carry marks sit above the fours, twos and eights columns, joined by arrows travelling up and left from the units, twos and fours columns. Side notes read: units 1 plus 1 equals 10, write 0 carry 1; twos 1 plus 0 plus 1 equals 10, write 0 carry 1; fours 1 plus 0 plus 1 equals 10, write 0 carry 1; eights, the last carry lands, write 1. A footer strip notes three carries for one click: 7 plus 1 equals 8 equals 1000 in base 2.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf38Txt(W / 2, 30, 13, C.teal, 'the carry cascade: 111 + 1 = 1000', 'bold'))
  s.push(cf38Txt(W / 2, 50, 10, C.tealInk, '7 + 1 = 8 - one click of the units wheel ripples three columns left'))
  for (let i = 0; i < 4; i++) s.push(cf38Txt(colCx(i), placeY, 11, C.tealInk, places[i], 'bold'))
  /* the three travelling carries: arrows from column i up-left to column i-1 */
  for (let i = 3; i >= 1; i--) {
    const x1 = colCx(i)
    const y1 = rowATop - 3
    const x2 = colCx(i - 1)
    const y2 = carryCy + carryR + 4
    s.push(`<path d="M ${x1} ${y1} Q ${(x1 + x2) / 2} ${carryCy - 20} ${x2} ${y2}" fill="none" stroke="${C.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="${x2},${y2} ${x2 - 4.5},${y2 - 7} ${x2 + 4.5},${y2 - 7}" fill="${C.conn}"/>`)
  }
  for (let i = 0; i < 3; i++) {
    s.push(`<circle cx="${colCx(i)}" cy="${carryCy}" r="${carryR}" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2"/>`)
    s.push(cf38Txt(colCx(i), carryCy + 4, 11, C.accent, '1', 'bold'))
  }
  /* the addend rows */
  const rowAdigits = ['', '1', '1', '1']
  const rowBdigits = ['', '', '', '1']
  for (let i = 0; i < 4; i++) {
    const bx = gx + i * colW
    s.push(`<rect x="${bx + 2}" y="${rowATop}" width="${colW - 4}" height="${rowH}" rx="8" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
    if (rowAdigits[i]) s.push(cf38Txt(colCx(i), rowATop + rowH / 2 + 7, 18, C.ink, rowAdigits[i], 'bold'))
    s.push(`<rect x="${bx + 2}" y="${rowBTop}" width="${colW - 4}" height="${rowH}" rx="8" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
    if (rowBdigits[i]) s.push(cf38Txt(colCx(i), rowBTop + rowH / 2 + 7, 18, C.ink, rowBdigits[i], 'bold'))
  }
  s.push(cf38Txt(gx - 18, rowBTop + rowH / 2 + 7, 16, C.ink, '+', 'bold'))
  s.push(`<line x1="${gx - 10}" y1="${ruleY}" x2="${gx + gridW + 10}" y2="${ruleY}" stroke="${C.ink}" stroke-width="2"/>`)
  const sumDigits = ['1', '0', '0', '0']
  for (let i = 0; i < 4; i++) {
    const bx = gx + i * colW
    s.push(`<rect x="${bx + 2}" y="${sumTop}" width="${colW - 4}" height="${sumH}" rx="8" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
    s.push(cf38Txt(colCx(i), sumTop + sumH / 2 + 7, 18, C.ink, sumDigits[i], 'bold'))
  }
  /* the side notes */
  const notes = [
    'units: 1 + 1 = 10 - write 0, carry 1',
    'twos: 1 + 0 + 1 = 10 - write 0, carry 1',
    'fours: 1 + 0 + 1 = 10 - write 0, carry 1',
    'eights: the last carry lands - write 1',
  ]
  notes.forEach((t, k) => {
    s.push(`<circle cx="${noteX}" cy="${noteYs[k] - 4}" r="3" fill="${C.accent}"/>`)
    s.push(cf38Txt(noteX + 12, noteYs[k], 10.5, C.ink, t, 'normal', 'start'))
  })
  /* the footer strip */
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.paper}" stroke="${C.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 24, 11.5, C.ink, 'three carries for one click: 7 + 1 = 8 = 1000 in base 2', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 44, 9.5, C.tealInk, 'the all-ones numeral sits one short of a roll - the 255 witness of lesson 3.6 in miniature'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE F4 — the shift-double ladder 13 -> 26 -> 52             */
/* ------------------------------------------------------------------ */
function cf38LadderSvg(): string {
  const W = 760
  const M = 20
  const bitW = 44
  const bitH = 50
  const rungs = [
    { bits: ['1', '1', '0', '1'], value: '= 13', exp: '13 = 8 + 4 + 1' },
    { bits: ['1', '1', '0', '1', '0'], value: '= 26', exp: '26 = 16 + 8 + 2' },
    { bits: ['1', '1', '0', '1', '0', '0'], value: '= 52', exp: '52 = 32 + 16 + 4' },
  ]
  const bitX0 = 176
  const rungTops = [88, 210, 332]
  const arrowX = 320
  const stripY = 414
  const stripH = 58
  const H = stripY + stripH + M
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The shift-double ladder. Rung one: the bits 1 1 0 1, worth 13, expanding to 8 plus 4 plus 1. Rung two: the same bits with one appended zero, 1 1 0 1 0, worth 26, expanding to 16 plus 8 plus 2. Rung three: two appended zeros, 1 1 0 1 0 0, worth 52, expanding to 32 plus 16 plus 4. Arrows between rungs labelled times 2, append a 0. A footer strip notes two doublings equal two left shifts: 13 times 2 is 26, 26 times 2 is 52.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf38Txt(W / 2, 30, 13, C.teal, 'the shift-double ladder: 13 to 26 to 52', 'bold'))
  s.push(cf38Txt(W / 2, 50, 10, C.tealInk, 'appending a 0 doubles - multiplication by 2 is a left shift'))
  rungs.forEach((rg, k) => {
    rg.bits.forEach((b, j) => {
      const x = bitX0 + j * bitW
      const appended = j >= 4
      s.push(`<rect x="${x + 2}" y="${rungTops[k]}" width="${bitW - 4}" height="${bitH}" rx="8" fill="${appended ? C.panelA : C.white}" stroke="${appended ? C.accent : C.struct}" stroke-width="2"/>`)
      s.push(cf38Txt(x + bitW / 2, rungTops[k] + 33, 20, C.ink, b, 'bold'))
    })
    s.push(cf38Txt(bitX0 + rg.bits.length * bitW + 24, rungTops[k] + 33, 20, C.ink, rg.value, 'bold', 'start'))
    s.push(cf38Txt(bitX0, rungTops[k] + bitH + 20, 10, C.tealInk, rg.exp, 'normal', 'start'))
  })
  for (let k = 0; k < 2; k++) {
    const y1 = rungTops[k] + bitH + 30
    const y2 = rungTops[k + 1] - 10
    s.push(`<line x1="${arrowX}" y1="${y1}" x2="${arrowX}" y2="${y2 - 7}" stroke="${C.conn}" stroke-width="2.2"/>`)
    s.push(`<polygon points="${arrowX},${y2} ${arrowX - 5.5},${y2 - 9} ${arrowX + 5.5},${y2 - 9}" fill="${C.conn}"/>`)
    s.push(cf38Txt(arrowX + 14, (y1 + y2) / 2 + 4, 10, C.conn, 'x 2 - append a 0', 'bold', 'start'))
  }
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.paper}" stroke="${C.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 24, 11.5, C.ink, 'two doublings = two left shifts: 13 x 2 = 26, then 26 x 2 = 52', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 44, 9.5, C.tealInk, 'the bits never change - only trailing zeros grow, one per doubling'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the addition grid 1101 + 1011 = 11000             */
/* ------------------------------------------------------------------ */
function cf38AddGridSvg(): string {
  const W = 540
  const M = 20
  const colW = 56
  const gridW = 5 * colW
  const gx = (W - gridW) / 2
  const places = ['16', '8', '4', '2', '1']
  const placeY = 76
  const carryCy = 102
  const carryR = 9
  const rowATop = 134
  const rowH = 40
  const rowBTop = rowATop + rowH + 8
  const ruleY = rowBTop + rowH + 10
  const sumTop = ruleY + 10
  const sumH = 44
  const noteY = sumTop + sumH + 26
  const H = noteY + 14
  const colCx = (i: number) => gx + i * colW + colW / 2
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The addition grid for 1101 plus 1011 in binary, equal to 11000. Five columns for place values 16, 8, 4, 2 and 1. Addend rows 1101 and 1011 sit above a rule, the sum 11000 below. Four carry marks sit above the sixteens, eights, fours and twos columns. A note reads: 13 plus 11 equals 24 equals 16 plus 8 - each carry feeds the next column.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf38Txt(W / 2, 30, 12.5, C.teal, 'the addition grid: 1101 + 1011 = 11000', 'bold'))
  s.push(cf38Txt(W / 2, 48, 10, C.tealInk, 'every column rolls - four carries'))
  for (let i = 0; i < 5; i++) s.push(cf38Txt(colCx(i), placeY, 11, C.tealInk, places[i], 'bold'))
  for (let i = 0; i < 4; i++) {
    s.push(`<circle cx="${colCx(i)}" cy="${carryCy}" r="${carryR}" fill="${C.panelA}" stroke="${C.accent}" stroke-width="2"/>`)
    s.push(cf38Txt(colCx(i), carryCy + 3.5, 10, C.accent, '1', 'bold'))
  }
  const rowA: string[] = ['', '1', '1', '0', '1']
  const rowB: string[] = ['', '1', '0', '1', '1']
  for (let i = 0; i < 5; i++) {
    const bx = gx + i * colW
    s.push(`<rect x="${bx + 2}" y="${rowATop}" width="${colW - 4}" height="${rowH}" rx="8" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
    if (rowA[i]) s.push(cf38Txt(colCx(i), rowATop + rowH / 2 + 6, 16, C.ink, rowA[i], 'bold'))
    s.push(`<rect x="${bx + 2}" y="${rowBTop}" width="${colW - 4}" height="${rowH}" rx="8" fill="${C.white}" stroke="${C.struct}" stroke-width="2"/>`)
    if (rowB[i]) s.push(cf38Txt(colCx(i), rowBTop + rowH / 2 + 6, 16, C.ink, rowB[i], 'bold'))
  }
  s.push(cf38Txt(gx - 16, rowBTop + rowH / 2 + 6, 15, C.ink, '+', 'bold'))
  s.push(`<line x1="${gx - 10}" y1="${ruleY}" x2="${gx + gridW + 10}" y2="${ruleY}" stroke="${C.ink}" stroke-width="2"/>`)
  const sum = ['1', '1', '0', '0', '0']
  for (let i = 0; i < 5; i++) {
    const bx = gx + i * colW
    s.push(`<rect x="${bx + 2}" y="${sumTop}" width="${colW - 4}" height="${sumH}" rx="8" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
    s.push(cf38Txt(colCx(i), sumTop + sumH / 2 + 6, 16, C.ink, sum[i], 'bold'))
  }
  s.push(cf38Txt(W / 2, noteY, 10, C.tealInk, '13 + 11 = 24 = 16 + 8 - each carry feeds the next column'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the borrow chain 100000 - 1 = 11111               */
/* ------------------------------------------------------------------ */
function cf38BorrowSvg(): string {
  const W = 760
  const M = 20
  const boxW = 72
  const boxH = 52
  const boxGap = 16
  const chainW = 6 * boxW + 5 * boxGap
  const gx = (W - chainW) / 2
  const titleY = 28
  const subY = 46
  const arcLabelY = 68
  const boxTop = 102
  const placeY = boxTop + boxH + 22
  const afterTop = placeY + 12
  const afterH = 40
  const stripY = afterTop + afterH + 18
  const stripH = 58
  const H = stripY + stripH + M
  const bx = (i: number) => gx + i * (boxW + boxGap)
  const bcx = (i: number) => bx(i) + boxW / 2
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The borrow chain for 100000 minus 1 in binary, equal to 11111. Six boxes hold the digits 1 0 0 0 0 0 over place values 32, 16, 8, 4, 2 and 1. A long arrow arcs over the boxes from the units box to the thirty-twos box, labelled the borrow travels left until it finds a 1 to take, with small left-pointing chevrons in every gap. Below, an after row shows the digits 0 1 1 1 1 1. A footer strip reads: 100000 minus 1 equals 11111, that is 32 minus 1 equals 31 equals 16 plus 8 plus 4 plus 2 plus 1; each passed-through column gains 2 and gives 1 away.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf38Txt(W / 2, titleY, 13, C.teal, 'the borrow chain: 100000 - 1 = 11111', 'bold'))
  s.push(cf38Txt(W / 2, subY, 10, C.tealInk, '32 - 1 = 31 - the units borrows across four empty columns'))
  /* the long travelling-borrow arc */
  s.push(`<path d="M ${bcx(5)} ${boxTop - 3} Q ${W / 2} ${arcLabelY - 16} ${bcx(0) + 6} ${boxTop - 3}" fill="none" stroke="${C.conn}" stroke-width="2.2"/>`)
  s.push(`<polygon points="${bcx(0) - 3},${boxTop - 2} ${bcx(0) + 9},${boxTop - 10} ${bcx(0) + 9},${boxTop + 5}" fill="${C.conn}"/>`)
  s.push(cf38Txt(W / 2, arcLabelY, 10, C.conn, 'the borrow travels left until it finds a 1 to take'))
  /* the minuend boxes */
  const digits = ['1', '0', '0', '0', '0', '0']
  const places = ['32', '16', '8', '4', '2', '1']
  for (let i = 0; i < 6; i++) {
    s.push(`<rect x="${bx(i)}" y="${boxTop}" width="${boxW}" height="${boxH}" rx="8" fill="${i === 0 ? C.panelA : C.white}" stroke="${i === 0 ? C.accent : C.struct}" stroke-width="2"/>`)
    s.push(cf38Txt(bcx(i), boxTop + 34, 20, C.ink, digits[i], 'bold'))
    s.push(cf38Txt(bcx(i), placeY, 11, C.tealInk, places[i], 'bold'))
  }
  s.push(cf38Txt(bx(5) + boxW + 14, boxTop + boxH / 2 + 6, 16, C.warn, '- 1', 'bold', 'start'))
  /* the gap chevrons, pointing left */
  const midY = boxTop + boxH / 2
  for (let i = 0; i < 5; i++) {
    const gxx = bx(i) + boxW + boxGap / 2
    s.push(`<polyline points="${gxx + 5},${midY - 6} ${gxx - 1},${midY} ${gxx + 5},${midY + 6}" fill="none" stroke="${C.accent}" stroke-width="2"/>`)
  }
  /* the after row */
  const after = ['0', '1', '1', '1', '1', '1']
  s.push(cf38Txt(gx - 14, afterTop + afterH / 2 + 4, 10, C.tealInk, 'after:', 'bold', 'end'))
  for (let i = 0; i < 6; i++) {
    const live = after[i] === '1'
    s.push(`<rect x="${bx(i)}" y="${afterTop}" width="${boxW}" height="${afterH}" rx="8" fill="${live ? C.panelA : C.white}" stroke="${live ? C.accent : C.teal}" stroke-width="2"/>`)
    s.push(cf38Txt(bcx(i), afterTop + 27, 16, live ? C.accent : C.tealInk, after[i], 'bold'))
  }
  /* the footer strip */
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.paper}" stroke="${C.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 24, 11.5, C.ink, '100000 - 1 = 11111, i.e. 32 - 1 = 31 = 16 + 8 + 4 + 2 + 1', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 44, 9.5, C.tealInk, 'each passed-through column gains 2 and gives 1 away, ending as 1; the units ends as 2, and 2 - 1 = 1'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — shift-and-add partials 110 x 101 = 11110          */
/* ------------------------------------------------------------------ */
function cf38ShiftAddSvg(): string {
  const W = 700
  const M = 20
  const colW = 52
  const gridW = 5 * colW
  const gx = 96
  const places = ['16', '8', '4', '2', '1']
  const placeY = 66
  const rowATop = 78
  const rowH = 38
  const rowBTop = rowATop + rowH + 6
  const rule1Y = rowBTop + rowH + 8
  const p0Top = rule1Y + 8
  const p1Top = p0Top + rowH + 6
  const p2Top = p1Top + rowH + 6
  const rule2Y = p2Top + rowH + 8
  const sumTop = rule2Y + 8
  const sumH = 44
  const stripY = sumTop + sumH + 18
  const stripH = 58
  const H = stripY + stripH + M
  const colCx = (i: number) => gx + i * colW + colW / 2
  const labX = gx + gridW + 20
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Long multiplication by shifts and adds: 110 times 101 equals 11110. Five columns for place values 16, 8, 4, 2 and 1. Row 110 labelled 6, times row 101 labelled x 5, then three partial rows: 110 worth 6, a dim row 0000 worth 0, and 11000 worth 24, then the sum 11110 worth 30. A footer strip reads: partials 6 plus 0 plus 24 equals 30, and a 1-bit copies the numeral shifted while a 0-bit skips a row.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf38Txt(W / 2, 28, 12.5, C.teal, 'shifts and adds: 110 x 101 = 11110', 'bold'))
  s.push(cf38Txt(W / 2, 46, 10, C.tealInk, '6 x 5 = 30 - one partial per 1-bit; the 0-bit row costs nothing'))
  for (let i = 0; i < 5; i++) s.push(cf38Txt(colCx(i), placeY, 10.5, C.tealInk, places[i], 'bold'))
  /* helper to draw one digit row: entries keyed by column index */
  const row = (top: number, entries: Record<number, string>, dim: boolean, labels: string[]) => {
    for (let i = 0; i < 5; i++) {
      const bx = gx + i * colW
      const has = entries[i] !== undefined
      s.push(`<rect x="${bx + 2}" y="${top}" width="${colW - 4}" height="${rowH}" rx="7" fill="${dim ? C.white : C.white}" stroke="${dim ? C.faint : C.struct}" stroke-width="2"/>`)
      if (has) s.push(cf38Txt(colCx(i), top + rowH / 2 + 6, 15, dim ? C.tealInk : C.ink, entries[i] as string, 'bold'))
    }
    s.push(cf38Txt(labX, top + rowH / 2 + 4, 11, C.tealInk, labels[0], 'normal', 'start'))
    if (labels[1]) s.push(cf38Txt(labX, top + rowH / 2 + 18, 9.5, C.tealInk, labels[1], 'normal', 'start'))
  }
  row(rowATop, { 2: '1', 3: '1', 4: '0' }, false, ['6'])
  row(rowBTop, { 2: '1', 3: '0', 4: '1' }, false, ['x 5'])
  s.push(`<line x1="${gx - 10}" y1="${rule1Y}" x2="${gx + gridW + 10}" y2="${rule1Y}" stroke="${C.ink}" stroke-width="2"/>`)
  row(p0Top, { 2: '1', 3: '1', 4: '0' }, false, ['= 6', '110 x 1'])
  row(p1Top, { 1: '0', 2: '0', 3: '0', 4: '0' }, true, ['= 0', '110 x 0, shifted'])
  row(p2Top, { 0: '1', 1: '1', 2: '0', 3: '0', 4: '0' }, false, ['= 24', '110 x 100'])
  s.push(`<line x1="${gx - 10}" y1="${rule2Y}" x2="${gx + gridW + 10}" y2="${rule2Y}" stroke="${C.ink}" stroke-width="2"/>`)
  for (let i = 0; i < 5; i++) {
    const bx = gx + i * colW
    s.push(`<rect x="${bx + 2}" y="${sumTop}" width="${colW - 4}" height="${sumH}" rx="7" fill="${C.panelB}" stroke="${C.mid}" stroke-width="2"/>`)
    s.push(cf38Txt(colCx(i), sumTop + sumH / 2 + 6, 16, C.ink, ['1', '1', '1', '1', '0'][i], 'bold'))
  }
  s.push(cf38Txt(labX, sumTop + sumH / 2 + 6, 12, C.ink, '= 30', 'bold', 'start'))
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.paper}" stroke="${C.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 24, 11.5, C.ink, 'partials: 6 + 0 + 24 = 30 = 16 + 8 + 4 + 2, and 110 + 11000 = 11110', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 44, 9.5, C.tealInk, 'a 1-bit copies the numeral shifted; a 0-bit skips a row - the multiplier is a shifter-adder'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE — the one-hand register showing 19 = 10011          */
/* ------------------------------------------------------------------ */
function cf38HandSvg(): string {
  const W = 620
  const M = 20
  const barW = 56
  const barGap = 30
  const barsW = 5 * barW + 4 * barGap
  const gx = (W - barsW) / 2
  const placeY = 96
  const baseY = 250
  const upH = 124
  const downH = 44
  const bitY = baseY + 30
  const stripY = bitY + 18
  const stripH = 58
  const H = stripY + stripH + M
  const places = ['16', '8', '4', '2', '1']
  const bits = ['1', '0', '0', '1', '1']
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nineteen on one hand, the binary pattern 10011. Five vertical finger bars over place values 16, 8, 4, 2 and 1. The 16, 2 and 1 bars stand tall and are labelled up; the 8 and 4 bars are short and labelled down. The bit row below reads 1 0 0 1 1. A footer strip reads: 10011 equals 16 plus 2 plus 1 equals 19; five bits name 32 states, zero to 31; two hands name 1,024 states, reaching 1,023.">`)
  s.push(`<g font-family="${FONT}">`)
  s.push(cf38Txt(W / 2, 30, 13, C.teal, 'nineteen on one hand: 10011', 'bold'))
  s.push(cf38Txt(W / 2, 50, 10, C.tealInk, 'five fingers, five bits - call the thumb the units and work left'))
  for (let i = 0; i < 5; i++) {
    const x = gx + i * (barW + barGap)
    const cx = x + barW / 2
    const up = bits[i] === '1'
    const top = up ? baseY - upH : baseY - downH
    s.push(`<rect x="${x}" y="${top}" width="${barW}" height="${up ? upH : downH}" rx="14" fill="${up ? C.panelA : C.white}" stroke="${up ? C.accent : C.teal}" stroke-width="2"/>`)
    s.push(cf38Txt(cx, top + 20, 10, up ? C.accent : C.tealInk, up ? 'up' : 'down', 'bold'))
    s.push(cf38Txt(cx, placeY, 12, C.tealInk, places[i], 'bold'))
    s.push(cf38Txt(cx, bitY, 14, C.ink, bits[i], 'bold'))
  }
  s.push(`<rect x="${M}" y="${stripY}" width="${W - 2 * M}" height="${stripH}" rx="8" fill="${C.paper}" stroke="${C.faint}" stroke-width="2"/>`)
  s.push(cf38Txt(W / 2, stripY + 24, 11.5, C.ink, '10011 = 16 + 2 + 1 = 19 - the 16, 2 and 1 fingers stand up', 'bold'))
  s.push(cf38Txt(W / 2, stripY + 44, 9.5, C.tealInk, 'five bits name 32 states (0 to 31); two hands name 1,024 states, reaching 1,023'))
  s.push('</g>')
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
export const lesson38: Lesson = {
  id: 'cf-decimal-and-binary-number-system',
  number: '3.8',
  title: 'Decimal and Binary Number System',
  concepts: [
    'positional notation as one machine, many alphabets',
    'the side-by-side counting strip and the odometer principle',
    'the anatomy trade: digit count against digit cost',
    'binary addition and the carry rule 1 + 1 = 10',
    'binary subtraction and the borrow chain',
    'multiplication as shifts and adds',
    'the shift-double law: x 2^k appends k zeros',
    'two-valued logic on two-state switches (Boole to Shannon)',
  ],
  objectives: [
    'By the end of this lesson you can read decimal and binary as one positional machine wearing two alphabets, citing the four-dress witness of lesson 3.2 rather than re-deriving it.',
    'By the end of this lesson you can count in binary side by side with decimal, and say exactly when and why each system opens a new column.',
    'By the end of this lesson you can compare the two systems anatomically - alphabet, place values, largest n-digit value, digits needed for a number - and state the honest three-and-a-third digit trade.',
    'By the end of this lesson you can add, subtract and multiply small binary numerals digit by digit, marking every carry and every borrow, and check each result by re-adding or by weights.',
    'By the end of this lesson you can use the shift-double law - appending a zero multiplies by two - to double, halve and scale by powers of two without a times table.',
    'By the end of this lesson you can explain why the machine keeps binary, from Boole in 1854 to Shannon in 1937, and demonstrate a five-bit binary register on one hand.',
  ],
  prerequisites: ['cf-decimal-to-binary-conversion', 'cf-binary-to-decimal-conversion'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    // ================================================================
    // 0. THE POSITION OF THIS LESSON (the synthesis seat)
    // ================================================================
    { kind: 'para', text: 'You now hold both crafts. Lesson 3.6 taught you to walk a decimal number down the division ladder and read its binary dress off the remainders; lesson 3.7 taught you to walk the other way, sweeping a binary numeral left to right and doubling, or summing the weights under its 1-bits. Between them you have converted more numbers than any examination bench will ever ask of you. This lesson — the school syllabus calls it Decimal and Binary Number System, and we honour that title — does what neither craft did: it sets the two systems side by side and studies them as ONE idea, and then it teaches the ground no conversion lesson could reach, how to DO arithmetic inside the binary alphabet.' },
    { kind: 'para', text: 'A word about method before we begin. This is the synthesis seat of the chapter, which means every conversion fact you meet below is CITED, not re-derived. When we write $45 = 101101_2 = 55_8 = 2D_{16}$ — the four-dress witness of lesson 3.2 — we are quoting a result you have already verified twice, once by the ladder of 3.6 and once by the weights of 3.7, and to re-drill it here would waste your time. What is new is the ground between the conversions: what counting looks like when the wheels have only two positions, what addition and subtraction and multiplication become when the alphabet shrinks to two symbols, and why the machine that runs your code prefers this shrunken alphabet to your own ten.' },
    { kind: 'para', text: 'The promise, in three lines. First, you will see that decimal and binary are not two systems but one system wearing two alphabets — the family portrait of the next section. Second, you will meet binary arithmetic properly: addition with carries, subtraction with borrows, multiplication as shifts and adds, each worked digit by digit and checked in decimal. Third, you will collect the honest engineering answer to the question every beginner asks — why only two symbols? — an answer that runs from Boole in 1854 to Shannon in 1937 and ends with a binary machine you carry on the end of your arm.' },

    // ================================================================
    // 1. THE FAMILY PORTRAIT
    // ================================================================
    { kind: 'heading', text: 'The Family Portrait' },
    { kind: 'para', text: 'Begin with the machine itself. A positional numeral system — the invention behind every number you have ever written — stores a value by PLACE and DIGIT together: each column of the numeral is worth a fixed power of a base, and the digit sitting in that column says how many of that power to count. Lesson 3.2 derived the formula that runs this machine, and it is short enough to hold in one line:' },
    { kind: 'equation', latex: 'V = (d_m \\,\\ldots\\, d_1 d_0)_b = \\sum_{i=0}^{m} d_i\\, b^i, \\qquad 0 \\le d_i \\le b-1', note: 'one formula, many alphabets: the base b chooses the alphabet and the place values; the machinery never changes' },
    { kind: 'callout', tone: 'definition', title: 'Positional notation, formally', text: 'A numeral system is said to be positional if the value contributed by any digit is the product of that digit with a fixed power of a base, the power being fixed by the place the digit occupies alone — so that the value of the whole numeral is the sum of these contributions. The base $b$ is the count of symbols in the alphabet, and the digits run from $0$ up to $b - 1$. In symbols, $V = \\sum_i d_i\\, b^i$: read each digit, multiply by its place, add.' },
    { kind: 'para', text: 'For example, the same machine dressed three ways:' },
    { kind: 'list', marker: 'roman', items: [
      'In base 10, alphabet $0$ through $9$: the numeral $4{,}728$ says $4 \\times 1000 + 7 \\times 100 + 2 \\times 10 + 8 \\times 1 = 4{,}728$ — four thousands, seven hundreds, two tens, eight units.',
      'In base 2, alphabet $0$ and $1$: the numeral $101101$ says $1 \\times 32 + 0 \\times 16 + 1 \\times 8 + 1 \\times 4 + 0 \\times 2 + 1 \\times 1 = 45$ — one thirty-two, no sixteens, one eight, one four, no twos, one unit.',
      'In base 16, alphabet $0$ through $9$ and $A$ through $F$: the numeral $2D$ says $2 \\times 16 + 13 = 45$ — the same forty-five in its shortest dress.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Why ten? — the honest record', text: 'Humans almost everywhere settled on ten symbols, and the ordinary explanation is the one you are wearing: ten fingers. The historical record supports the inference but supplies no receipt — no surviving document records the moment of the choice, and we say so plainly. The exceptions make the story honest: Babylonian scribes computed in base 60, a base so rich in factors that sixty minutes in an hour is its living fossil, and the Maya counted in twenties, fingers and toes together. Decimal won the world not by mathematical superiority but by the accident of anatomy meeting commerce. The moral for this chapter: the base is a CHOICE, and a choice can be revisited when the hardware changes. Our sibling book Arithmetic and Number Systems owns the full history; lesson 3.2 told the census side.' },
    { kind: 'para', text: 'And the hardware did change. A human hand offers ten more-or-less distinguishable positions; a wire offers voltage, and lesson 3.1 spent its whole length on why a machine built from wires, switches and noise prefers two states to ten. The argument, cited forward rather than re-argued: every physical signal blurs, and the farther apart the "means 0" zone and the "means 1" zone sit, the harder it is for noise to mistake one for the other. Ten distinguishable zones on one wire is a fragile ask; two zones is armoured. The machine did not choose binary because two symbols are elegant. It chose binary because two states are RELIABLE.' },
    { kind: 'figure', caption: 'The family portrait: the decimal anatomy of 4,728 (four digit cells over the place values 1000, 100, 10 and 1, expanding to 4 x 1000 + 7 x 100 + 2 x 10 + 8 x 1 = 4,728) hung above the binary anatomy of 101101 (six digit cells over the place values 32, 16, 8, 4, 2 and 1, expanding to 1 x 32 + 0 x 16 + 1 x 8 + 1 x 4 + 0 x 2 + 1 x 1 = 45) — the same machine in two alphabets, with the four-dress witness 45 = 101101 in base 2 = 55 in base 8 = 2D in base 16 in the footer.', svg: cf38PortraitSvg() },
    { kind: 'para', text: 'Read the figure the way a mechanic reads an engine bay. The two panels wear different alphabets — ten digits against two — and carry different place-value ladders — thousands, hundreds, tens, units against thirty-twos, sixteens, eights, fours, twos, units — but the machinery is identical: a digit sits in a cell, the cell is worth a power of the base, the value is the sum of digit-times-cell over all columns. Swap the alphabet and the ladder, and the SAME formula evaluates either panel. This is why conversion was never arithmetic but translation: the ladder of lesson 3.6 and the weights of lesson 3.7 never compute anything new; they re-dress a value you already owned.' },
    { kind: 'callout', tone: 'insight', title: 'One machine, many alphabets', text: 'Base 10, base 2, base 8, base 16 — these are not four number systems. They are four DRESSES on one system: positional notation, the single invention $V = \\sum d_i b^i$. When a syllabus says "the decimal and binary number system", read it as "the positional number system, seen in its two working dresses" — decimal because you were born with ten fingers, binary because your machine was born with two states. Everything else in this chapter is consequence.' },

    // ================================================================
    // 2. COUNTING SIDE BY SIDE
    // ================================================================
    { kind: 'heading', text: 'Counting Side by Side' },
    { kind: 'para', text: 'Now watch the one machine run. Count from zero to ten in both alphabets at once — the figure below — and keep your eye on the wheels. A positional numeral is an odometer: each column is a wheel, each wheel has as many positions as the base has digits, and when a wheel fills it rolls back to $0$ and pushes one carry leftward. That is the whole of counting, in any base whatsoever.' },
    { kind: 'figure', caption: 'The counting strip 0 to 10, side by side: the decimal row opens its second column only at ten (marked), while the binary row opens new columns at two, four and eight (each marked with a roll arrow) — the odometer principle running in two alphabets, one click at a time, the same answers in both rows.', svg: cf38StripSvg({
      W: 780,
      title: 'the counting strip: 0 to 10, side by side',
      subtitle: 'decimal on top, binary below - watch the wheels roll',
      to: 10,
      marks: [2, 4, 8],
      decMark: 10,
      note1: 'the odometer principle: when a column fills, it rolls to 0 and pushes 1 left',
      note2: 'binary opens new columns at 2, 4 and 8; decimal opens its second column only at 10 - the same event on different clocks',
      aria: 'The counting strip from zero to ten in decimal and binary, side by side. A count row numbered 0 through 10; a base 10 row reading 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 with the 10 cell marked; a base 2 row reading 0, 1, 10, 11, 100, 101, 110, 111, 1000, 1001, 1010 with new-column marks at 2, 4 and 8. A footer strip states the odometer principle: when a column fills, it rolls to 0 and pushes 1 left.',
    }) },
    { kind: 'para', text: 'Three things in that strip deserve your eyes. First, the binary row opens a new column at 2, at 4 and at 8 — three new columns before decimal has opened its first, which waits for 10. A two-position wheel simply fills faster: every second click rolls it. Second, the rolls are the SAME EVENT. Watch count 1 give way to 2 in binary — the wheel $1$ fills and rolls to $10$ — and then watch count 9 give way to 10 in decimal — the wheel $9$ fills and rolls to $10$. A full wheel empties and pushes one left; the base decides only how full "full" means. Third, the binary strip is not a table to memorise but a machine to run: given $101$ and asked for the next numeral, you do not recall anything — you click the units wheel, roll what fills, carry what rolls, and out comes $110$.' },
    { kind: 'callout', tone: 'insight', title: 'The odometer principle', text: 'When a column fills, it rolls: the digit returns to $0$ and one is carried into the next column left. In base 10 this happens at $9 \\to 10$; in base 2 it happens at $1 \\to 10$. The principle is base-blind — only the wheel size changes. Every roll-over you have met in this chapter, from the $255 \\to 256$ witness of lesson 3.6 to the strip above, is this one sentence happening somewhere.' },
    { kind: 'example', title: 'Count past ten: write the binary numerals for eleven, twelve and thirteen, showing each click.', steps: [
      'Take eleven: the strip of the figure ends at $1010$ (ten); one click of the units wheel gives $1011$ — no roll anywhere.',
      'So, twelve: $1011 + 1$ — the units rolls to 0 and carries, the twos rolls to 0 and carries, and the fours column lights up for the first time past ten: $1100$.',
      'Now, thirteen: $1100 + 1 = 1101$ — a single click, no carry at all.',
      'Check in decimal: $11, 12, 13$ against $1011, 1100, 1101$ — the strip marches on, one click at a time.',
      'Hence counting in binary is counting in decimal wearing another alphabet — the odometer, not the digits, does the work.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The dress slip', text: 'The numeral 10 is not "ten". In decimal dress it names ten; in binary dress it names two; in base 8 it names eight. Reading a binary numeral as though it were decimal is the beginner’s signature error — $100$ is four, not one hundred; $1000$ is eight, not one thousand. The digits are borrowed, the VALUES are not. Say the place values under the digits, every time, until the habit is automatic: one-zero in base two is "one two and no units", which is two.' },
    { kind: 'para', text: 'One more read of the strip, because it quietly contains the whole chapter. Every binary numeral in the figure is an answer to "how many" — the same answers the decimal row gives, in the same order, with no disagreement and no lag. The two rows are the same counting wearing different clothes. When lesson 3.4 turned pictures into bit patterns and lesson 3.5 squeezed those patterns smaller, the numbers crossing that boundary lived in the binary row’s alphabet, and the machine never once needed to translate them into yours. Translation, as 3.6 and 3.7 proved, is a procedure for YOUR convenience — the machine counts, stores and computes in its own dress from the first bit to the last.' },
    // ================================================================
    // 3. THE ANATOMY COMPARISON (the trade)
    // ================================================================
    { kind: 'heading', text: 'The Anatomy Comparison' },
    { kind: 'para', text: 'Set the two dresses side by side on the bench and compare them the way an anatomist compares two skeletons: line by line, asking where they agree and where they part. Four lines settle everything worth knowing, and the table below is the whole comparison. Read it slowly — every line is either a census you have already taken in lessons 3.2 and 3.6 or an immediate consequence of the one formula of the family portrait, and the single line where the systems genuinely diverge is the fourth.' },
    { kind: 'table', caption: 'The anatomy of the two working dresses, line by line', head: ['Anatomy line', 'Decimal, base 10', 'Binary, base 2'], rows: [
      ['Alphabet', 'ten digits: $0$ through $9$', 'two digits: $0$ and $1$'],
      ['Place ladder, four columns', '$10^3, 10^2, 10, 1$ — thousands, hundreds, tens, units', '$2^3, 2^2, 2, 1$ — eights, fours, twos, units'],
      ['Largest 3-digit numeral', '$999 = 10^3 - 1$', '$111_2 = 7 = 2^3 - 1$'],
      ['Dress size for one million', '7 digits ($999{,}999$ rolls to $1{,}000{,}000$)', '20 bits ($2^{19} < 10^6 \\le 2^{20}$)'],
      ['Cost of one digit', 'ten cleanly separated states — a fragile ask for a wire', 'two states — armoured against noise'],
    ] },
    { kind: 'para', text: 'The first three lines are pure agreement, and the third deserves a second look. The largest three-digit numeral of a base is the maximal digit in every column — $999$ in decimal, $111$ in binary — and its value is always the base cubed minus one: $10^3 - 1 = 999$ against $2^3 - 1 = 7$. Lesson 3.6 met this law at eight columns, where $11111111_2 = 255 = 2^8 - 1$ rolled to $256 = 2^8$; the three-column row of the table is the same event in miniature. There is one largest-numeral law, not two. The all-nines pattern and the all-ones pattern are the SAME pattern, because both say "every column as full as its alphabet allows".' },
    { kind: 'para', text: 'The fourth line is the honest divergence. Take a census of a million. On the decimal side the answer is instant: $999{,}999$ is the largest value six digits can name, so a million — the first value that does not fit — wears 7 digits. On the binary side you must find the powers of two that straddle a million, and that census is worth taking once with your own pen.' },
    { kind: 'example', title: 'A census: how many bits does a million need?', steps: [
      'Take the target: one million, that is $10^6$.',
      'Find the straddling powers: $2^{19} = 524{,}288$ falls short, and $2^{20} = 1{,}048{,}576$ is the first power of two that reaches a million.',
      'So, every value from $524{,}288$ up to $1{,}048{,}576$ fits inside twenty columns, and a million sits squarely in that window.',
      'Check the decimal side: $999{,}999$ is the largest six-digit value, so a million needs 7 decimal digits.',
      'Hence 7 digits against 20 bits — one value, two dresses, and the binary dress is not quite three times longer.',
    ] },
    { kind: 'para', text: 'Why not quite three times, exactly? Because the exchange rate between the alphabets is fixed. Each decimal digit carries one decade of information — a choice among ten — and each bit carries one binary choice — a choice among two. To ask how many binary choices buy one decimal choice is to ask: two raised to WHAT power is ten? The answer is a logarithm, and we state it honestly rather than derive it, because the logarithm is a doorstep tool this chapter borrows but does not own: $\\log_2 10 = 3.3219280948873623$ — about three and a third bits per decimal digit. Carry the rounded value in your head, and know that the engine has verified the long one to the last digit.' },
    { kind: 'para', text: 'Now the census closes itself. A million is six decades tall, and six decades at three and a third bits per decade is $6 \\times 3.3219 = 19.9$ bits, which rounds UP to the 20 the census found — you cannot buy nine-tenths of a column. Run the same check at a billion: ten decimal digits on the one side; on the other, $2^{29} = 536{,}870{,}912$ falls short while $2^{30} = 1{,}073{,}741{,}824$ reaches, so 30 bits; and nine decades at the exchange rate is $9 \\times 3.3219 = 29.9$, rounding up to 30 again. The trade is not an accident of the million. It is the exchange rate working at every magnitude you will ever write.' },
    { kind: 'callout', tone: 'insight', title: 'The trade, stated once', text: 'Binary pays about $3.32$ digits for every decimal digit — the value $\\log_2 10$ — but each of its digits costs TWO states instead of ten. A twenty-digit binary register is twenty two-state switches: cheap, and armoured against noise. A seven-digit decimal register is seven ten-state devices: expensive, and fragile. The machine always chooses the long cheap numeral over the short expensive one, and after this lesson you can say WHY at an interview bench in one sentence: a digit that costs two states cannot be misread.' },

    // ================================================================
    // 4. BINARY ADDITION — THE FIRST MEETING
    // ================================================================
    { kind: 'heading', text: 'Binary Addition — the First Meeting' },
    { kind: 'para', text: 'Now the new ground of this seat. Conversion — lessons 3.6 and 3.7 — never computed anything; it translated. Arithmetic computes, and binary arithmetic is your first meeting with the machine calculating in its own dress. The meeting is gentle, because the addition table you must carry is half the size of the decimal one, and its only surprise is a line you have already met as the odometer.' },
    { kind: 'table', caption: 'The whole of column addition in base 2', head: ['Column sum', 'Write', 'Carry left', 'Decimal reading'], rows: [
      ['$0 + 0$', '$0$', 'nothing', 'zero'],
      ['$0 + 1$ or $1 + 0$', '$1$', 'nothing', 'one'],
      ['$1 + 1$', '$0$', '1', 'two, written $10_2$ — the roll'],
      ['$1 + 1 + 1$', '$1$', '1', 'three, written $11_2$ — carry plus one'],
    ] },
    { kind: 'para', text: 'Stare at the third line, because it is the entire difficulty of binary addition. $1 + 1 = 10$: two is the first value the two-symbol alphabet cannot write in one column, so the column fills, writes 0 and pushes 1 leftward — the odometer principle again, now inside a sum. The fourth line is the same line with a carry arriving: three is writable as 11, so write 1 and push 1 leftward. Every other line is trivial. Binary addition is decimal addition with a smaller table and a busier carry — the wheels are smaller, so they roll more often.' },
    { kind: 'example', title: 'Work it: 1011 + 110, column by column', steps: [
      'Set the sum out in columns, units rightmost: $1011$ above $110$.',
      'Units: $1 + 0 = 1$ — write 1, carry nothing.',
      'Twos: $1 + 1 = 10$ — write 0, carry 1.',
      'Fours: $0 + 1 + 1 = 10$ — write 0, carry 1.',
      'Eights: $1 + 0 + 1 = 10$ — write 0, carry 1.',
      'Sixteens: the last carry lands — write 1.',
      'So, $1011 + 110 = 10001$.',
      'Check in decimal: $11 + 6 = 17$, and $10001 = 16 + 1 = 17$ — both dresses agree.',
    ] },
    { kind: 'para', text: 'Notice what made that sum long: three carries in four working columns, each one the little roll $1 + 1 = 10$. In decimal, carries are rare guests — most columns raise none. In binary, carries are the house rhythm, because the wheels hold only two positions and fill every second click. The extreme case is the cascade, where EVERY column rolls at once, and it deserves its own figure.' },
    { kind: 'figure', caption: 'The carry cascade: 111 + 1 = 1000, with the three carries drawn as travelling arrows — the units rolls and pushes 1 into the twos, the twos rolls and pushes 1 into the fours, the fours rolls and pushes 1 into the eights, where the last carry finally lands. One click of the wheel, three travelling carries, one new column: 7 + 1 = 8 = 1000 in base 2, the decimal mirror being 999 + 1 = 1000.', svg: cf38CascadeSvg() },
    { kind: 'example', title: 'Run the cascade yourself: 111 + 1', steps: [
      'Units: $1 + 1 = 10$ — write 0, carry 1.',
      'Twos: $1 + 0 + 1 = 10$ — write 0, carry 1.',
      'Fours: $1 + 0 + 1 = 10$ — write 0, carry 1.',
      'Eights: the carry lands — write 1.',
      'So, $111 + 1 = 1000$: three carries for one click.',
      'Check: $7 + 1 = 8 = 2^3$, and $1000_2 = 8$ — the roll the counting strip staged at count 8.',
    ] },
    { kind: 'para', text: 'The cascade is not a curiosity; it is the shape of every roll-over. The all-ones numeral $111$ sits exactly one short of a full house — add 1 and every wheel empties at once, pushing a single 1 into the first new column. The decimal world stages the same drama at $999 + 1 = 1000$ on every showroom odometer. When a later chapter speaks of a register rolling over, this figure is the event it names.' },
    { kind: 'example', title: 'The self-sum: 101 + 101', steps: [
      'Units: $1 + 1 = 10$ — write 0, carry 1.',
      'Twos: $0 + 0 + 1 = 1$ — write 1, carry nothing.',
      'Fours: $1 + 1 = 10$ — write 0, carry 1.',
      'Eights: the carry lands — write 1.',
      'So, $101 + 101 = 1010$ — the original numeral with a 0 appended.',
      'Check: $5 + 5 = 10$, and $1010_2 = 8 + 2 = 10$.',
      'Hence a numeral plus itself is the numeral shifted left one place — file this away; the multiplication section makes it a law.',
    ] },
    { kind: 'para', text: 'One sentence on the machine’s view, and then a doorstep. Look back at the addition table: the digit you write is 1 exactly when the column holds an odd number of ones, and the carry is 1 exactly when the column holds two or more. Written as logic, the sum bit is XOR and the carry bit is AND — two logic operations on two-valued signals ARE the addition table. Wired together they form a half-adder, the seed of every adder circuit ever built. We name the door and walk on: our sibling book Digital Logic Design builds adders from gates, and complement arithmetic with them.' },
    { kind: 'algorithm', title: 'Ripple-carry addition in base 2', lines: [
      { code: 'carry = 0', note: 'begin with empty hands' },
      { code: 'walk the columns from units leftward:', note: 'rightmost column first, exactly as in the worked runs' },
      { code: '  t = a[i] + b[i] + carry', note: 't is 0, 1, 2 or 3 — the whole column, carry included' },
      { code: '  write t mod 2', note: 'odd counts write 1, even counts write 0' },
      { code: '  carry = t div 2', note: 'what travels left: 1 when t reaches 2, else 0' },
      { code: 'at the end, write the last carry if it is 1', note: 'a final 0 carries nothing and is dropped' },
    ], note: 'This loop is the addition table written as a procedure; the machine version is the adder circuit, which Digital Logic Design builds from gates.' },

    // ================================================================
    // 5. BINARY SUBTRACTION — THE BORROW
    // ================================================================
    { kind: 'heading', text: 'Binary Subtraction — the Borrow' },
    { kind: 'para', text: 'Subtraction is addition filmed backwards, and the borrow is the carry run in reverse. Recall the decimal instinct first, because you have owned it since childhood: to take 9 from 21 the units column cannot pay, so you borrow one from the tens column — and that borrowed 1 arrives worth TEN, because it came from the tens place. The binary rule is the same sentence with one word changed: a borrowed 1 arrives worth TWO, because it came from the twos place. That is the entire rule. Everything else is bookkeeping.' },
    { kind: 'example', title: 'Work it: 1010 - 110', steps: [
      'Set the columns: $1010$ above $110$, units rightmost.',
      'Units: $0 - 0 = 0$ — write 0.',
      'Twos: $1 - 1 = 0$ — write 0.',
      'Fours: $0 - 1$ cannot pay — borrow from the eights: the eights 1 becomes 0, and the fours column now holds $10_2$, that is 2.',
      'Now, $2 - 1 = 1$ — write 1.',
      'So, $1010 - 110 = 100$.',
      'Check by re-adding: $100 + 110 = 1010$, and in decimal $4 + 6 = 10$ — the borrow balanced.',
    ] },
    { kind: 'para', text: 'The check by re-adding is not decoration; it is the discipline of this whole seat. Every subtraction you ever run, in any base whatsoever, can be audited by adding the difference back and demanding the minuend. The machine does exactly this in its complement arithmetic — subtraction re-expressed as addition — and you will meet that door at the end of this section.' },
    { kind: 'example', title: 'The borrow chain: 1100 - 111', steps: [
      'Units: $0 - 1$ cannot pay, and the twos column holds 0 — it has nothing to lend.',
      'So, the borrow travels left to the fours, which holds 1: the fours becomes 0, and the twos receives $10_2$, worth 2.',
      'The twos lends one to the units: the units now holds 2, and the twos keeps 1.',
      'Units: $2 - 1 = 1$ — write 1.',
      'Twos: $1 - 1 = 0$ — write 0.',
      'Fours: $0 - 1$ cannot pay again — borrow from the eights: the fours holds 2, the eights becomes 0.',
      'Fours: $2 - 1 = 1$ — write 1; eights: $0 - 0 = 0$.',
      'So, $1100 - 111 = 101$.',
      'Check: $12 - 7 = 5 = 4 + 1$, and $101_2 = 5$ — two borrows, one travelling chain.',
    ] },
    { kind: 'para', text: 'Read the chain as a rule about travellers. A borrow may cross several columns before it finds a 1 to take, and every column it PASSES THROUGH gains 2, gives 1 away and keeps 1; the column that finally pays gives up its whole 1 and becomes 0; the column that started the trouble receives 2 and settles its debt from that. The exercises stage the longest small chain there is: $100000 - 1$, where the borrow crosses four empty columns before the thirty-twos pays up, and the answer comes out $11111$ — five ones, because every passed-through column kept exactly one.' },
    { kind: 'callout', tone: 'warn', title: 'The borrow that never finds a 1', text: 'If a borrow travels off the left end of the numeral without meeting a 1, the subtraction was impossible: the subtrahend is the larger value and the true answer is negative. In school arithmetic that is an error to report. In a machine register of fixed width it is not an error at all but a SIGNAL — the hardware keeps a dedicated flag for exactly this event, and the negative answers it announces live in the complement dress of the paragraph below. Name the event; the theory belongs to Digital Logic Design.' },

    // ================================================================
    // 6. BINARY MULTIPLICATION — SHIFTS AND ADDS
    // ================================================================
    { kind: 'heading', text: 'Binary Multiplication — Shifts and Adds' },
    { kind: 'para', text: 'Now the beautiful one. Your decimal childhood paid for a hundred products — ten digits against ten digits, $10 \\times 10 = 100$ entries in the times table — and most of them never stuck. The binary times table is one line long:' },
    { kind: 'list', marker: 'roman', items: [
      '$0 \\times 0 = 0$ — nothing times nothing',
      '$0 \\times 1 = 1 \\times 0 = 0$ — anything times nothing',
      '$1 \\times 1 = 1$ — the only product that survives',
    ] },
    { kind: 'para', text: 'A multiplication that can never produce anything but a copy or a blank is not really a multiplication at all. To multiply in binary you never multiply — you COPY the multiplicand once for every 1-bit of the multiplier, SHIFT each copy left by the position of that bit, and ADD the survivors. The operation degenerates into shifting and adding, and that degeneration is the single most consequential fact in this chapter for the machine.' },
    { kind: 'example', title: 'Work it: 101 x 11', steps: [
      'Split the multiplier by its bits: $11_2 = 10 + 1$, so $101 \\times 11 = 101 \\times 10 + 101 \\times 1$.',
      'Take the units bit, a 1: copy $101$ unshifted — worth 5.',
      'Now, the twos bit, also a 1: copy $101$ shifted one place left — $1010$, worth 10.',
      'Add the partials: $101 + 1010 = 1111$.',
      'So, $101 \\times 11 = 1111$.',
      'Check: $5 \\times 3 = 15$, and $1111 = 8 + 4 + 2 + 1 = 15$.',
      'Hence a three-by-two product cost one copy, one shift and one add — the times table was never opened.',
    ] },
    { kind: 'para', text: 'Pause on the shift, because it is doing the only real work. Appending a 0 on the right of a numeral moves every digit one column left: the units digit now sits in the twos column, the twos digit in the fours column, and so on — every contribution to the value doubles, so the whole value doubles. $1101_2 = 13$ becomes $11010_2 = 26$; nothing about the digits changed, only their addresses. The ladder below runs the law twice more, and the derivation after it says why the law holds for any number of appended zeros.' },
    { kind: 'figure', caption: 'The shift-double ladder: 1101 = 13 grows to 11010 = 26 and then to 110100 = 52, one appended zero per rung. The bits never change — only trailing zeros grow, one per doubling — and each rung confirms its value by expansion: 13 = 8 + 4 + 1, 26 = 16 + 8 + 2, 52 = 32 + 16 + 4.', svg: cf38LadderSvg() },
    { kind: 'callout', tone: 'theorem', title: 'The shift-double law', text: 'Appending one zero to a binary numeral doubles its value. Appending $k$ zeros multiplies its value by $2^k$. Conversely, removing a trailing zero halves the value — when there is a trailing zero to remove. This is the whole of multiplication by powers of two in the machine: no times table, only pen-strokes at the right-hand end.' },
    { kind: 'derivation', title: 'Multiplication by a power of two is a left shift', statement: 'If the digits of a binary numeral $N$ are shifted $k$ places left — which is the same as appending $k$ zeros on its right — the new numeral names $2^k \\times N$.', steps: [
      { label: 'Write N by places', formula: 'N = \\sum_{i=0}^{m} d_i\\, 2^i', explanation: 'the family-portrait formula in base 2: each digit times its place value, summed.' },
      { label: 'Shift every digit left by k', formula: "N' = \\sum_{i=0}^{m} d_i\\, 2^{i+k}", explanation: 'appending k zeros moves each digit from the column worth 2 to the power i into the column worth 2 to the power i plus k; the digits themselves are untouched.' },
      { label: 'Factor out the shift', formula: "N' = 2^k \\sum_{i=0}^{m} d_i\\, 2^i", explanation: 'every term now carries one extra factor of 2 for each of the k shifts, and that common factor can be pulled outside the sum.' },
      { label: 'Recognise the original', formula: "N' = 2^k \\, N", explanation: 'the sum that remains is N itself, so the shifted numeral names exactly 2 to the k times the value.' },
    ], result: 'Hence $1101_2 = 13$, and $11010_2 = 26 = 2 \\times 13$, and $110100_2 = 52 = 4 \\times 13$ — the ladder of the figure, one appended zero per doubling, and no arithmetic ever performed.' },
    { kind: 'example', title: 'Double it twice: 1011', steps: [
      'Take $1011_2 = 11$.',
      'One doubling: append a zero — $10110_2 = 22$.',
      'A second doubling: append another — $101100_2 = 44$.',
      'Check by weights: $10110 = 16 + 4 + 2 = 22$; $101100 = 32 + 8 + 4 = 44$.',
      'So, scaling 11 by 4 cost two pen-strokes and zero times-table entries.',
    ] },
    { kind: 'para', text: 'Now assemble the full machine. To multiply by any binary numeral, walk the multiplier bit by bit from the units rightward: a 1-bit says "add a copy of the multiplicand, shifted to line up with this bit", and a 0-bit says "add nothing — skip the row". Sum the surviving rows and the product falls out. A decimal multiplier needs the hundred-entry table and a column of carries; a binary multiplier needs a copier, a shifter and an adder — three dull parts, no table at all. The 3.32-digit tax you met in the anatomy buys this: longer numerals, but a multiplier built from parts that cannot misremember a product, because there is nothing to remember.' },
    { kind: 'callout', tone: 'insight', title: 'Why engineers call this beautiful', text: 'Multiplication — the operation that cost you a hundred products as a child — reduces, in base 2, to SHIFT and ADD: two operations a machine performs with wires. The multiplier circuit is literally a shifter-adder. When a later course tells you a processor multiplies in a handful of clock cycles, this section is the reason it can.' },
    { kind: 'para', text: 'And the honest paragraph on negative numbers, as promised. What does the machine do with a subtraction that cannot pay — with $3 - 5$, say? It does not report an error; it changes the dress. Fix a width, say eight columns, and the $256$ patterns of that width are reassigned by one convention — two’s complement — so that they name $-128$ through $+127$: every pattern still names exactly one value, the adder still works bit for bit exactly as this lesson built it, and the negative values are simply the patterns whose leading bit is 1. It is a relabelling, not a new machine. We name the door and do not open it: the full theory of complement arithmetic — how the relabelling turns subtraction into addition — belongs to Digital Logic Design, and this paragraph is only the signpost.' },

    // ================================================================
    // 7. WHY THE MACHINE KEEPS BINARY
    // ================================================================
    { kind: 'heading', text: 'Why the Machine Keeps Binary' },
    { kind: 'para', text: 'Collect the chapter’s answer to the question every beginner asks on day one: why only two symbols? Three strands braid together. The physics strand you own from lesson 3.1: a wire carrying a signal blurs, and two well-separated states are armoured against noise while ten crowded ones are fragile. The economics strand you met in the anatomy: a binary digit costs two states, and the 3.32 tax on length is cheap against the tenfold cost per digit. The third strand is the deepest, and it is logic.' },
    { kind: 'callout', tone: 'historical', title: 'Boole 1854, Shannon 1937 — eighty-three years apart', text: 'In 1854 George Boole published An Investigation of the Laws of Thought, an algebra whose variables take only the values 0 and 1 — the algebra now called Boolean logic, whose AND, OR and NOT are shuffles of those two values. For eighty years it sat in philosophy’s tidy corner: admired, and thought pointless. In 1937 Claude Shannon, in his master’s thesis at MIT, showed that a network of two-state switches obeys exactly this algebra — that you could design switching circuits by writing Boolean expressions, and read Boolean expressions off circuits. Two-valued logic met two-state hardware, and arithmetic grew out of the marriage: the addition table of this lesson IS a pair of logic operations, sum bit XOR and carry bit AND. Our retelling is honest about the dates and claims nothing beyond them: the route from Boole’s pages to Shannon’s relays runs straight through lesson 3.1’s argument about noise, and the machines that marriage produced are the ones running the words you now read.' },
    { kind: 'para', text: 'Say the payoff in one line, because it is the thesis of the whole chapter: two-valued logic plus two-state switches equals arithmetic from switches. The addition table you worked by hand in this lesson is, unchanged, the specification of a circuit; when you carried the 1 across three columns in the cascade, you were executing — slowly, in your head — the exact ripple a bank of half-adders performs in a fraction of a nanosecond. Nothing was translated into decimal on the way. The machine adds in its own dress because its logic and its switches speak that dress natively.' },
    { kind: 'para', text: 'And you own a binary machine of your own — two of them, at the ends of your arms. Call the thumb the units finger and work leftward: five fingers, five bits, place values 16, 8, 4, 2, 1. A raised finger is a 1, a folded finger a 0, and one hand is a five-bit register naming $32$ states — every value from 0 (all folded) to 31 (all raised, $11111$). Two hands name $1{,}024$ states, reaching 1,023. The count that outran the decimal finger-counter — anything past ten — sits comfortably inside a single hand, and the exercise set asks you to wear the number 19 there.' },
    { kind: 'example', title: 'Thirteen on one hand', steps: [
      'Call the thumb the units and work left: the five places are worth 16, 8, 4, 2, 1.',
      'Split 13 by places: $13 = 8 + 4 + 1$, so the bits are 0, 1, 1, 0, 1.',
      'So, stand up the 8, 4 and 1 fingers; fold the 16 and 2 fingers.',
      'Check: the raised pattern reads $01101_2 = 8 + 4 + 1 = 13$.',
      'Hence one hand is a five-bit register — thirty-two states without a single wire.',
    ] },

    // ================================================================
    // 8. DOORSTEPS — THE CHAPTER CLOSES
    // ================================================================
    { kind: 'heading', text: 'Doorsteps: Where This Ground Is Owned' },
    { kind: 'para', text: 'This seat was the synthesis, and synthesis knows its borders. Three doorsteps stand at the end of it. The book Arithmetic and Number Systems owns the full theory of positional systems — bases and their arithmetic, divisibility, the measurement of numbers — everything this chapter borrowed as a working tool. The book Digital Logic Design owns the gate-level ground we have named and never entered: adders built from gates, the half-adder and its extensions, complement arithmetic, the flags a register raises. And within this chapter, the review lesson 3.R gathers every seat — the dresses of 3.2, the pictures of 3.4 and 3.5, the crafts of 3.6 and 3.7, and this synthesis — into one revisable whole. If you leave lesson 3.8 with the two systems feeling like one machine and binary arithmetic feeling like ordinary arithmetic on busier wheels, you leave holding everything this seat was built to give.' },
    { kind: 'callout', tone: 'exam', title: 'The examination corner — exam-style asks, honestly labelled', text: 'We describe the SHAPE of the questions this lesson trains you for; we do not quote real papers. Banking and SSC computer-awareness benches ask the direct census questions: how many bits a given decimal value needs (a million: 20), which numeral follows 1011 (1100), what 10001 names in decimal (17), and the range of an n-bit register (five bits: 0 through 31). School boards ask the small computations: add two four-bit numerals with every carry shown, subtract with the borrow marked, double a numeral by appending a zero and state the new value. Cambridge 9618-style asks attach the reason to the fact: why binary suits hardware (two states, noise), why the digit counts differ (about 3.32 bits per decimal digit), and why multiplication reduces to shifts and adds. In every case the marks live in the working — show the carries, show the borrow, and check in decimal before you write the final line.' },
    { kind: 'terms', items: [
      { term: 'positional notation', def: 'the scheme in which each digit of a numeral contributes its value times a fixed power of a base, the power fixed by the digit’s place alone; the value of the numeral is the sum of these contributions.' },
      { term: 'base (radix)', def: 'the count of symbols in a numeral system’s alphabet; also the number whose powers form the place ladder. Base 10 uses ten digits, base 2 uses two.' },
      { term: 'odometer principle', def: 'when a column fills, it rolls: the digit returns to 0 and one is carried into the next column left. The principle is base-blind — only the wheel size changes with the base.' },
      { term: 'carry', def: 'the 1 pushed leftward when a column’s sum reaches or passes the base; in binary addition it is generated by the line 1 + 1 = 10 and its three-input form 1 + 1 + 1 = 11.' },
      { term: 'borrow', def: 'the 1 taken from the next column left when a subtraction cannot pay; it arrives worth the base — worth 2 in binary — because it comes from the next place up.' },
      { term: 'ripple-carry addition', def: 'column-by-column addition in which each carry travels left immediately and may trigger further carries; the cascade 111 + 1 = 1000 ripples three columns from a single click.' },
      { term: 'left shift', def: 'appending zeros on the right of a binary numeral, moving every digit into the next place up; one zero doubles the value, and k zeros multiply it by 2 to the k.' },
      { term: 'half-adder', def: 'the logic pairing that adds two bits: the sum bit is XOR, the carry bit is AND. Two-valued logic doing arithmetic; the seed of all adder circuits.' },
      { term: 'two’s complement', def: 'the fixed-width convention that reassigns the patterns of a register so that some name negative values — eight columns name -128 through +127 — letting one adder serve both addition and subtraction; the theory belongs to Digital Logic Design.' },
    ] },
    { kind: 'formula', name: 'Positional value', latex: 'V = \\sum_{i=0}^{m} d_i\\, b^i', note: 'one machine, many alphabets: read each digit, multiply by its place, add.' },
    { kind: 'formula', name: 'Largest n-digit numeral in base b', latex: 'b^n - 1', note: 'all-nines in decimal, all-ones in binary: 999 = 10^3 - 1, and 111 in base 2 = 2^3 - 1 = 7.' },
    { kind: 'formula', name: 'The shift-double law', latex: '(N \\text{ shifted left by } k) = N \\cdot 2^k', note: 'appending k zeros multiplies by 2 to the k: 1101 is 13, so 11010 is 26 and 110100 is 52.' },
    { kind: 'formula', name: 'The digit trade', latex: '\\text{bits per decimal digit} = \\log_2 10 \\approx 3.32', note: 'about three and a third: a million wears 7 digits or 20 bits; a billion wears 10 or 30.' },

    // ================================================================
    // 9. CHECK YOURSELF (quiz) + THE EXERCISE FLOOR
    // ================================================================
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'In binary, what is 1011 + 110?', options: ['10001', '10010', '1111', '10101'], answer: 0, explain: 'Work from the units: 1 + 0 = 1; then 1 + 1 = 10, write 0 and carry 1; then 0 + 1 + 1 = 10, write 0 and carry 1; then 1 + 1 = 10 again, write 0 and carry 1; the last carry lands in the sixteens column. So the sum is 10001. Check in decimal: 11 + 6 = 17, and 10001 = 16 + 1 = 17. The distractor 10010 is 18, which would be 11 + 7; 1111 is only 15, the sum you get by forgetting every carry; 10101 is 21, which is 11 + 10 — a misread of the second numeral as 1010.' },
      { q: 'The numeral 1000 in binary dress names which value?', options: ['one thousand', 'sixteen', 'eight', 'two'], answer: 2, explain: 'Say the places, not the digits: 1000 in base 2 has a 1 in the eights column and zeros elsewhere, so it names eight — the value the counting strip reaches just after 111, the all-ones roll. Reading it as one thousand is the dress slip this lesson warned about: treating a binary numeral as though it were decimal. Sixteen would be 10000, one column further left, the value the strip reaches at count 16. Two is 10 in binary — the first roll of all.' },
      { q: 'What is 1010 - 110 in binary?', options: ['110', '100', '11', '1000'], answer: 1, explain: 'Line up the columns: units 0 - 0 = 0; twos 1 - 1 = 0; fours 0 - 1 cannot pay, so borrow from the eights — the fours column now holds two, and 2 - 1 = 1. The difference is 100. Check by re-adding: 100 + 110 = 1010, and in decimal 4 + 6 = 10. The distractor 110 is six, the result of forgetting the borrow entirely; 11 is three, what column-by-column subtraction without any borrowing gives; 1000 is eight, which is larger than the minuend itself and cannot be a difference of these two.' },
      { q: 'Appending one zero to the right of the numeral 1101 does what?', options: ['halves the value', 'adds one to the value', 'leaves the value unchanged', 'doubles the value: 11010, which is 26'], answer: 3, explain: 'The shift-double law: appending a zero moves every digit one place left, from a column worth 2 to the power i into the column worth 2 to the power i plus 1, so every contribution doubles and the total doubles — 1101 is 13 and 11010 is 26. Halving is what REMOVING a trailing zero does, giving 110 = 6. Adding one would give 1110 = 14, a different operation altogether. And the value certainly does not stand still: 13 cannot survive a shift untouched, because place is half of the meaning of a digit.' },
      { q: 'Used as a five-bit register, one hand can name how many states?', options: ['32 states, from 0 through 31', '25 states', '10 states', '31 states'], answer: 0, explain: 'Five fingers, five bits: 2 to the 5 is 32 patterns, naming every value from 0 (all fingers folded) to 31 (all fingers raised, the pattern 11111). The census counts PATTERNS, not the largest value — 31 is the top of the range, but the count of states is 32, the classic off-by-one that the all-ones roll explains: 11111 plus 1 opens a whole new column. The answer 25 would be five fingers each worth five — a base-5 misreading. The answer 10 counts the fingers themselves, not the patterns they can hold.' },
    ] },

    { kind: 'exercises', title: 'The exercise floor', sets: [
      { level: 'L1', questions: [
        { q: 'Count from zero to eight in binary, writing every numeral, and say at which counts the binary row opens a new column.', solution: [
          'Run the odometer from 0: the units wheel alternates 0, 1 and rolls every second click.',
          'So, the numerals are 0, 1, 10, 11, 100, 101, 110, 111, 1000.',
          'New columns open when every existing wheel reads 1 and one more click arrives: at 2, at 4 and at 8.',
          'Check the last: count 7 is 111, all wheels full; one click rolls all three and opens the fourth — 1000.',
        ], answer: '0, 1, 10, 11, 100, 101, 110, 111, 1000; new columns open at 2, 4 and 8.', figures: [
          { caption: 'The exercise strip 0 to 8: decimal on top, binary below, with the three roll moments marked — the same odometer the lesson ran to ten, stopping one count short.', svg: cf38StripSvg({
            W: 560,
            title: 'the exercise strip: 0 to 8, side by side',
            subtitle: 'decimal on top, binary below - mark the rolls',
            to: 8,
            marks: [2, 4, 8],
            decMark: null,
            note1: 'new columns open at 2, 4 and 8 - the wheels fill and roll',
            note2: 'count 7 is 111, all wheels full; one click rolls all three and opens 1000',
            aria: 'The exercise strip from zero to eight in decimal and binary, side by side. A count row numbered 0 through 8; a base 10 row reading 0, 1, 2, 3, 4, 5, 6, 7, 8; a base 2 row reading 0, 1, 10, 11, 100, 101, 110, 111, 1000 with new-column marks at 2, 4 and 8. A footer strip states the odometer principle: new columns open at 2, 4 and 8.',
          }) },
        ] },
        { q: 'Starting from thirteen (1101), write the binary numerals for fourteen, fifteen and sixteen, showing each click.', solution: [
          'Take thirteen: $1101$.',
          'One click: $1101 + 1 = 1110$ (fourteen) — the units fills and rolls one column.',
          'Next click: $1110 + 1 = 1111$ (fifteen) — a single click, no carry at all.',
          'One more: $1111 + 1 = 10000$ (sixteen) — all four wheels roll at once, four carries, a new column opens.',
          'Check: $14 = 8 + 4 + 2$, $15 = 8 + 4 + 2 + 1$, $16 = 2^4$.',
        ], answer: '1110, 1111, then the all-ones roll to 10000.' },
        { q: 'What value does the binary numeral 10101 name? Show the weights.', solution: [
          'Read the places under the 1-bits: sixteen, four, one.',
          'So, $10101_2 = 16 + 4 + 1 = 21$.',
          'Check the 0-bits too: no eights and no twos — nothing to add.',
        ], answer: '21.' },
        { q: 'Use the self-sum shortcut to find 110 + 110, then check by weights.', solution: [
          'A numeral plus itself doubles: append a 0.',
          'So, $110 + 110 = 1100$.',
          'Check by weights: $1100 = 8 + 4 = 12$, and $6 + 6 = 12$.',
        ], answer: '1100 (= 12).' },
        { q: 'Work 1111 + 1 in columns, counting the carries.', solution: [
          'Units: $1 + 1 = 10$ — write 0, carry 1.',
          'Twos: $1 + 1 = 10$ — write 0, carry 1.',
          'Fours: $1 + 1 = 10$ — write 0, carry 1.',
          'Eights: $1 + 1 = 10$ — write 0, carry 1.',
          'Sixteens: the last carry lands — write 1.',
          'So, $1111 + 1 = 10000$: four carries, one new column.',
          'Check: $15 + 1 = 16 = 2^4$.',
        ], answer: '10000 — the all-ones roll, four carries.' },
        { q: 'Write the largest four-column numeral of each base and give its value: decimal and binary.', solution: [
          'The largest numeral fills every column with its top digit: 9999 in decimal, 1111 in binary.',
          'So, each is "all the nines" — the base minus 1 in every column.',
          'Values: 9999 is ten thousand minus one; $1111_2 = 8 + 4 + 2 + 1 = 15 = 2^4 - 1$.',
          'Hence the shared law: the largest n-digit numeral of a base is the base to the n, minus 1.',
        ], answer: '9999 (worth 9,999) and 1111 in base 2 (worth 15); both are b to the fourth minus 1.' },
      ] },
      { level: 'L2', questions: [
        { q: 'Work 1011 + 111 in columns and check in decimal.', solution: [
          'Units: $1 + 1 = 10$ — write 0, carry 1.',
          'Twos: $1 + 1 + 1 = 11$ — write 1, carry 1.',
          'Fours: $0 + 1 + 1 = 10$ — write 0, carry 1.',
          'Eights: $1 + 1 + 1 = 11$ — write 1, carry 1.',
          'Sixteens: the carry lands — write 1.',
          'So, $1011 + 111 = 10010$.',
          'Check: $11 + 7 = 18 = 16 + 2$, and $10010_2 = 18$.',
        ], answer: '10010 (= 18).' },
        { q: 'Work 1101 + 1011 in columns, counting the carries, and check in decimal.', solution: [
          'Units: $1 + 1 = 10$ — write 0, carry 1.',
          'Twos: $0 + 1 + 1 = 10$ — write 0, carry 1.',
          'Fours: $1 + 0 + 1 = 10$ — write 0, carry 1.',
          'Eights: $1 + 1 + 1 = 11$ — write 1, carry 1.',
          'Sixteens: the carry lands — write 1.',
          'So, $1101 + 1011 = 11000$ — every column rolled.',
          'Check: $13 + 11 = 24 = 16 + 8$, and $11000_2 = 24$.',
        ], answer: '11000 (= 24), four carries.', figures: [
          { caption: 'The addition grid for this solution: 1101 above 1011 over places 16, 8, 4, 2, 1, carry marks on four columns, and the sum 11000 below the rule — each carry feeding the next column.', svg: cf38AddGridSvg() },
        ] },
        { q: 'Work 1001 - 110 in columns, marking the borrows, and audit by re-adding.', solution: [
          'Units: $1 - 0 = 1$ — write 1.',
          'Twos: $0 - 1$ cannot pay — borrow from the fours: the twos holds 2, the fours becomes 0.',
          'Now, $2 - 1 = 1$ — write 1.',
          'Fours: $0 - 1$ cannot pay — borrow from the eights: the fours holds 2, the eights becomes 0.',
          'Now, $2 - 1 = 1$ — write 1; eights: $0 - 0 = 0$.',
          'So, $1001 - 110 = 11$.',
          'Check by re-adding: $11 + 110 = 1001$, and $3 + 6 = 9$.',
        ], answer: '11 (= 3), two borrows.' },
        { q: 'Work 100000 - 1, narrating the borrow chain column by column, and check in decimal.', solution: [
          'Units: $0 - 1$ cannot pay — and the twos, fours, eights and sixteens columns all hold 0 and cannot lend.',
          'So, the borrow travels left five columns to the thirty-twos, which holds 1 and pays.',
          'Every passed-through column gains 2, gives 1 away and keeps 1; the units receives 2 and pays its debt: $2 - 1 = 1$.',
          'So, $100000 - 1 = 11111$ — five ones, one per column the chain touched.',
          'Check: $32 - 1 = 31 = 16 + 8 + 4 + 2 + 1$, and $11111_2 = 31$.',
        ], answer: '11111 (= 31), one five-column borrow chain.', figures: [
          { caption: 'The borrow chain for this solution: the numeral 100000 over places 32 down to 1, the travelling borrow arcing from the units to the thirty-twos, chevrons in every gap, and the after-row 011111 — each passed-through column ending as 1.', svg: cf38BorrowSvg() },
        ] },
        { q: 'Wear the register: show nineteen on one hand (thumb = units), and state the full range of one hand and of two.', solution: [
          'Call the thumb the units: the five places are worth 16, 8, 4, 2, 1.',
          'Split 19 by places: $19 = 16 + 2 + 1$, so the bits are 1, 0, 0, 1, 1.',
          'So, stand up the 16, 2 and 1 fingers; fold the 8 and 4 fingers — the pattern 10011.',
          'Range: five bits name 32 states, zero through 31; two hands name $1{,}024$ states, reaching 1,023.',
        ], answer: '10011; one hand spans 0 to 31, two hands span 0 to 1,023.', figures: [
          { caption: 'Nineteen on one hand for this solution: five finger-bars over places 16, 8, 4, 2, 1 with the 16, 2 and 1 bars up and the 8 and 4 bars down, bit row 10011 beneath.', svg: cf38HandSvg() },
        ] },
      ] },
      { level: 'L3', questions: [
        { q: 'Multiply 110 x 101 by shifts and adds, showing every partial row, and check in decimal.', solution: [
          'Split the multiplier by bits: $101 = 100 + 1$.',
          'Units bit (a 1): copy $110$ unshifted — worth 6.',
          'Twos bit (a 0): skip the row — a 0-bit contributes nothing.',
          'Fours bit (a 1): copy $110$ shifted two places — $11000$, worth 24.',
          'Add the partials: $110 + 11000 = 11110$.',
          'Check: $6 + 24 = 30 = 16 + 8 + 4 + 2$, and $6 \\times 5 = 30$.',
        ], answer: '11110 (= 30).', figures: [
          { caption: 'The shift-and-add grid for this solution: 110 times 101 over places 16 down to 1, partial rows 110 (worth 6), a dim skipped row of zeros, and 11000 (worth 24), summing to 11110 (worth 30).', svg: cf38ShiftAddSvg() },
        ] },
        { q: 'Multiply 1011 x 101 by shifts and adds and check by weights.', solution: [
          'Split the multiplier: $101 = 100 + 1$.',
          'Units bit: copy $1011$ unshifted — worth 11.',
          'Twos bit: a 0 — no row.',
          'Fours bit: copy $1011$ shifted two places — $101100$, worth 44.',
          'Add the partials: $1011 + 101100 = 110111$.',
          'Check: $11 + 44 = 55$, and $110111 = 32 + 16 + 4 + 2 + 1 = 55$.',
        ], answer: '110111 (= 55).' },
        { q: 'Scale 1011 by 8 using shifts only, giving each intermediate value, and check the last by weights.', solution: [
          'Scaling by 8 is scaling by $2^3$ — three doublings.',
          'So, append three zeros one at a time: $1011 \\to 10110 \\to 101100 \\to 1011000$.',
          'Values along the ladder: $22$, then $44$, then $88$ — each rung doubles.',
          'Check the last by weights: $1011000 = 64 + 16 + 8 = 88$, and $11 \\times 8 = 88$.',
        ], answer: '1011000 (= 88).' },
        { q: 'Exam-style census: state the decimal digit count and the bit count for one million and for one billion, and quote the exchange rate that connects them.', solution: [
          'A million: 7 decimal digits, since $999{,}999$ is the largest six-digit value.',
          'On the binary side, $2^{19} = 524{,}288$ falls short and $2^{20} = 1{,}048{,}576$ reaches, so 20 bits.',
          'A billion: 10 decimal digits; and $2^{29} = 536{,}870{,}912$ falls short while $2^{30} = 1{,}073{,}741{,}824$ reaches, so 30 bits.',
          'So, the exchange rate: $\\log_2 10 \\approx 3.32$ bits per decimal digit — about three and a third.',
          'Check: six decades at the rate give $19.9$, rounding up to the 20 found; nine decades give $29.9$, rounding up to 30.',
        ], answer: 'million: 7 digits vs 20 bits; billion: 10 digits vs 30 bits; the trade is log2 10, about 3.32 bits per decimal digit.' },
      ] },
    ] },
  ],
}
