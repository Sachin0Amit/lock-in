import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf35.ts — CS RUN 6 seat cf35 (round 2), the PACKING lesson.
 *
 * Lesson 3.5 'Compression: Lossless and Lossy' of Computer Fundamentals
 * chapter 3 'Data Representation: a First Meeting'. Lesson 3.4 counted the
 * firehose; this lesson answers the packing question it left open: which
 * bytes can go, and can they come BACK? The two honest answers — lossless
 * (every bit returns) and lossy (some are gone forever, chosen to be the
 * ones you miss least) — with RLE, Huffman, LZW, JPEG and MP3 as the
 * witnesses, every number pinned green by v-cf35.ts (105 checks).
 *
 * Study-never-reproduce: every roster, witness, figure, Illustration, quiz
 * item and exercise is OUR OWN. All figures are self-contained computed
 * SVGs in the house palette; geometry is derived, never eyeballed.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const C = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const FONT = 'ui-sans-serif, system-ui, sans-serif'

/* ------------------------------------------------------------------ */
/* BODY FIGURE 1 — one file, two doors (the chapter's sharpest line)   */
/* ------------------------------------------------------------------ */
function cf35TwoDoorsSvg(): string {
  const W = 720
  const H = 320
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="One file enters two doors. The lossless door, in green, promises that every bit returns and the decoded copy is identical, the home of text, code, ZIP, PNG, GIF, run-length encoding and Huffman. The lossy door, in orange, warns that some bits never return and the decode is only a close copy, the home of photos and music: JPEG, MP3 and most video. The input file shown is the ten-character witness AABBCCCCCD.">`)
  s.push(`<text x="${W / 2}" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="${C.tealInk}">ONE FILE, TWO DOORS - THE SHARPEST LINE IN THE CHAPTER</text>`)
  /* the file, left */
  s.push(`<rect x="24" y="126" width="150" height="68" rx="6" fill="${C.panelA}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<text x="99" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.ink}">THE FILE</text>`)
  s.push(`<text x="99" y="166" text-anchor="middle" font-size="11" fill="${C.tealInk}">AABBCCCCCD</text>`)
  s.push(`<text x="99" y="182" text-anchor="middle" font-size="9.5" fill="${C.ink}">10 characters</text>`)
  /* arrows */
  s.push(`<line x1="178" y1="150" x2="242" y2="94" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(`<polygon points="250,88 236,96 244,102" fill="${C.mid}"/>`)
  s.push(`<line x1="178" y1="170" x2="242" y2="226" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="250,232 236,224 244,218" fill="${C.conn}"/>`)
  /* door 1: lossless */
  s.push(`<rect x="250" y="44" width="180" height="84" rx="6" fill="${C.white}" stroke="${C.struct}" stroke-width="2.5"/>`)
  s.push(`<text x="340" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="${C.ink}">LOSSLESS</text>`)
  s.push(`<text x="340" y="92" text-anchor="middle" font-size="10.5" fill="${C.ink}">every bit returns</text>`)
  s.push(`<text x="340" y="108" text-anchor="middle" font-size="9.5" fill="${C.tealInk}">decode: identical</text>`)
  s.push(`<text x="446" y="78" text-anchor="start" font-size="10" fill="${C.tealInk}">the home of text and code:</text>`)
  s.push(`<text x="446" y="96" text-anchor="start" font-size="10" fill="${C.ink}">ZIP, PNG, GIF, RLE, Huffman</text>`)
  s.push(`<text x="340" y="148" text-anchor="middle" font-size="9.5" fill="${C.ink}">out: the original, bit for bit</text>`)
  /* door 2: lossy */
  s.push(`<rect x="250" y="188" width="180" height="84" rx="6" fill="${C.white}" stroke="${C.accent}" stroke-width="2.5"/>`)
  s.push(`<text x="340" y="216" text-anchor="middle" font-size="13" font-weight="bold" fill="${C.accent}">LOSSY</text>`)
  s.push(`<text x="340" y="236" text-anchor="middle" font-size="10.5" fill="${C.ink}">some bits never return</text>`)
  s.push(`<text x="340" y="252" text-anchor="middle" font-size="9.5" fill="${C.tealInk}">decode: a close copy</text>`)
  s.push(`<text x="446" y="222" text-anchor="start" font-size="10" fill="${C.tealInk}">the home of photos and music:</text>`)
  s.push(`<text x="446" y="240" text-anchor="start" font-size="10" fill="${C.ink}">JPEG, MP3, most video</text>`)
  s.push(`<text x="340" y="292" text-anchor="middle" font-size="9.5" fill="${C.ink}">out: a close copy, some bits gone</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 2 — the Huffman tree of {A:5, B:2, C:1, D:1}            */
/* ------------------------------------------------------------------ */
function cf35HuffmanTreeSvg(): string {
  const W = 720
  const H = 400
  const R = 17
  /* node positions computed from the merge ladder 1+1->2, 2+2->4, 4+5->9 */
  const root = { x: 360, y: 72, w: '9' }
  const a = { x: 150, y: 168, w: '5' }
  const n4 = { x: 540, y: 168, w: '4' }
  const b = { x: 420, y: 252, w: '2' }
  const n2 = { x: 640, y: 252, w: '2' }
  const c = { x: 575, y: 338, w: '1' }
  const d = { x: 685, y: 338, w: '1' }
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="The Huffman tree for the alphabet A with weight 5, B with weight 2, C with weight 1 and D with weight 1. The root carries weight 9. Its 0 edge leads straight to A at depth 1; its 1 edge leads to a weight-4 node, whose 0 edge leads to B at depth 2 and whose 1 edge leads to a weight-2 node, whose 0 edge leads to C at depth 3 and whose 1 edge leads to D at depth 3. So the codewords are A equals 0, B equals 10, C equals 110, D equals 111, and the total cost is 5 times 1 plus 2 times 2 plus 1 times 3 plus 1 times 3 equals 15 bits, against 18 for a fixed 2-bit code.">`)
  s.push(`<text x="${W / 2}" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${C.tealInk}">THE HUFFMAN TREE FOR A:5, B:2, C:1, D:1</text>`)
  const edge = (p: { x: number; y: number }, q: { x: number; y: number }) =>
    s.push(`<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" stroke="${C.mid}" stroke-width="2"/>`)
  edge(root, a); edge(root, n4); edge(n4, b); edge(n4, n2); edge(n2, c); edge(n2, d)
  const bit = (x: number, y: number, t: string) =>
    s.push(`<text x="${x}" y="${y}" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.conn}" stroke="${C.paper}" stroke-width="3" paint-order="stroke">${t}</text>`)
  bit(243, 116, '0'); bit(462, 116, '1'); bit(468, 206, '0'); bit(602, 206, '1'); bit(596, 291, '0'); bit(674, 291, '1')
  const node = (n: { x: number; y: number; w: string }, leaf: boolean) => {
    s.push(`<circle cx="${n.x}" cy="${n.y}" r="${R}" fill="${leaf ? C.panelB : C.white}" stroke="${leaf ? C.conn : C.teal}" stroke-width="2"/>`)
    s.push(`<text x="${n.x}" y="${n.y + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.ink}">${n.w}</text>`)
  }
  node(root, false); node(a, true); node(n4, false); node(b, true); node(n2, false); node(c, true); node(d, true)
  s.push(`<text x="36" y="172" text-anchor="start" font-size="9.5" fill="${C.tealInk}">depth 1</text>`)
  s.push(`<text x="36" y="256" text-anchor="start" font-size="9.5" fill="${C.tealInk}">depth 2</text>`)
  s.push(`<text x="36" y="342" text-anchor="start" font-size="9.5" fill="${C.tealInk}">depth 3</text>`)
  s.push(`<text x="150" y="200" text-anchor="middle" font-size="10" fill="${C.ink}">A wears 0 - depth 1</text>`)
  s.push(`<text x="420" y="284" text-anchor="middle" font-size="10" fill="${C.ink}">B wears 10 - depth 2</text>`)
  s.push(`<text x="575" y="370" text-anchor="middle" font-size="10" fill="${C.ink}">C wears 110</text>`)
  s.push(`<text x="680" y="370" text-anchor="middle" font-size="10" fill="${C.ink}">D wears 111</text>`)
  s.push(`<text x="${W / 2}" y="394" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.tealInk}">5x1 + 2x2 + 1x3 + 1x3 = 15 bits - a fixed 2-bit code would cost 18</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 3 — the JPEG block grid over the 1080p luma plane       */
/* ------------------------------------------------------------------ */
function cf35JpegGridSvg(): string {
  const W = 720
  const H = 372
  const RX = 40
  const RY = 56
  const RW = 384 /* 8 columns of 48 */
  const RH = 216 /* 9 rows of 24 - a true 16:9 */
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="The 1920 by 1080 luma plane tiled by 8 by 8 blocks. The grid rectangle is drawn 16 to 9, with faint lattice lines suggesting the tiling. Annotations: 240 block columns, because 1920 divided by 8 is 240; 135 block rows, because 1080 divided by 8 is 135; 240 times 135 equals 32,400 blocks, each holding 8 by 8 equals 64 samples, multiplying back to exactly 2,073,600 samples. 4:2:0 chroma subsampling halves the colour bill from 12 samples to 6 per 2 by 2 area, so the frame totals 3,110,400 samples of the RGB 6,220,800. One 8 by 8 block is magnified at the right.">`)
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${C.tealInk}">THE 1080p LUMA PLANE AS 8 x 8 BLOCKS</text>`)
  s.push(`<text x="232" y="48" text-anchor="middle" font-size="10" fill="${C.ink}">the 1920 x 1080 luma plane</text>`)
  s.push(`<rect x="${RX}" y="${RY}" width="${RW}" height="${RH}" fill="${C.white}" stroke="${C.ink}" stroke-width="2"/>`)
  for (let k = 1; k <= 7; k++) s.push(`<line x1="${RX + 48 * k}" y1="${RY}" x2="${RX + 48 * k}" y2="${RY + RH}" stroke="${C.faint}" stroke-width="1"/>`)
  for (let k = 1; k <= 8; k++) s.push(`<line x1="${RX}" y1="${RY + 24 * k}" x2="${RX + RW}" y2="${RY + 24 * k}" stroke="${C.faint}" stroke-width="1"/>`)
  s.push(`<rect x="232" y="128" width="48" height="24" fill="none" stroke="${C.accent}" stroke-width="2"/>`)
  s.push(`<text x="232" y="290" text-anchor="middle" font-size="10.5" fill="${C.ink}">240 block columns = 1920 / 8</text>`)
  s.push(`<text x="232" y="310" text-anchor="middle" font-size="10.5" fill="${C.ink}">135 block rows = 1080 / 8</text>`)
  s.push(`<text x="232" y="330" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${C.tealInk}">240 x 135 = 32,400 blocks, each 8 x 8 = 64 samples</text>`)
  s.push(`<text x="452" y="80" text-anchor="start" font-size="11" font-weight="bold" fill="${C.ink}">THE CENSUS</text>`)
  s.push(`<text x="452" y="106" text-anchor="start" font-size="11" fill="${C.ink}">240 x 135 = 32,400 blocks</text>`)
  s.push(`<text x="452" y="132" text-anchor="start" font-size="11" fill="${C.ink}">each block is 8 x 8 = 64 samples</text>`)
  s.push(`<text x="452" y="158" text-anchor="start" font-size="11" fill="${C.ink}">32,400 x 64 = 2,073,600 samples</text>`)
  s.push(`<text x="452" y="184" text-anchor="start" font-size="11" fill="${C.conn}">4:2:0 halves the colour bill:</text>`)
  s.push(`<text x="452" y="210" text-anchor="start" font-size="11" fill="${C.conn}">12 samples become 6 per 2 x 2 area</text>`)
  s.push(`<text x="452" y="236" text-anchor="start" font-size="11" fill="${C.ink}">frame: 3,110,400 of 6,220,800</text>`)
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
    const fill = i === 0 && j === 0 ? C.panelA : C.white
    s.push(`<rect x="${470 + 11 * i}" y="${262 + 11 * j}" width="11" height="11" fill="${fill}" stroke="${C.tealInk}" stroke-width="0.5"/>`)
  }
  s.push(`<text x="514" y="364" text-anchor="middle" font-size="10" fill="${C.ink}">one block magnified: 64 samples</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* BODY FIGURE 4 — the ratio ladder for the 210-second song            */
/* ------------------------------------------------------------------ */
function cf35RatioLadderSvg(): string {
  const W = 720
  const H = 240
  const cd = 37044000
  const k320 = 8400000
  const k128 = 3360000
  const X0 = 140
  const FULL = 480
  const bars = [
    { label: 'CD audio', bytes: cd, value: '37,044,000 B = 35.3279 MiB', fill: C.teal, inside: true },
    { label: 'MP3 320 kbit/s', bytes: k320, value: '8,400,000 B - 4.41x smaller', fill: C.conn, inside: false },
    { label: 'MP3 128 kbit/s', bytes: k128, value: '3,360,000 B - 11.025x smaller', fill: C.accent, inside: false },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="Bar chart of one 210-second song stored three ways. CD audio: 37,044,000 bytes, which is 35.3279 MiB. MP3 at 320 kbit/s: 8,400,000 bytes, which is 4.41 times smaller. MP3 at 128 kbit/s: 3,360,000 bytes, which is 11.025 times smaller. Bar lengths are drawn from the true byte counts.">`)
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${C.tealInk}">ONE 210-SECOND SONG, THREE FILES</text>`)
  bars.forEach((b, i) => {
    const y = 56 + i * 54
    const w = FULL * (b.bytes / cd)
    s.push(`<rect x="${X0}" y="${y}" width="${w.toFixed(1)}" height="34" fill="${b.fill}" rx="3"/>`)
    s.push(`<text x="18" y="${y + 22}" text-anchor="start" font-size="11" fill="${C.ink}">${b.label}</text>`)
    if (b.inside) {
      s.push(`<text x="${X0 + w - 8}" y="${y + 22}" text-anchor="end" font-size="10.5" fill="${C.white}">${b.value}</text>`)
    } else {
      s.push(`<text x="${X0 + w + 10}" y="${y + 22}" text-anchor="start" font-size="10.5" fill="${C.ink}">${b.value}</text>`)
    }
  })
  s.push(`<text x="${W / 2}" y="226" text-anchor="middle" font-size="10" fill="${C.tealInk}">bar lengths from the true byte counts</text>`)
  s.push('</svg>')
  return s.join('')
}

/* ------------------------------------------------------------------ */
/* SOLUTION FIGURE helpers (embedded in exercise solutions)            */
/* ------------------------------------------------------------------ */
function cf35RleStripSvg(): string {
  const W = 720
  const H = 180
  const top = 'MMMOOOOOOT'
  const bot = ['3M', '6O', '1T']
  const cell = 40
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="Run-length encoding of MMMOOOOOOT. The before row shows ten cells: three M, six O, one T. The after row shows six cells: the pairs 3M, 6O, 1T. Ten characters become six, a ratio of 1.67.">`)
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.tealInk}">RLE ON THE WITNESS MMMOOOOOOT</text>`)
  for (let i = 0; i < top.length; i++) {
    const fill = top[i] === 'M' ? C.panelB : top[i] === 'O' ? C.panelA : C.white
    s.push(`<rect x="${40 + cell * i}" y="48" width="${cell}" height="40" fill="${fill}" stroke="${C.tealInk}" stroke-width="1"/>`)
    s.push(`<text x="${40 + cell * i + cell / 2}" y="74" text-anchor="middle" font-size="13" font-weight="bold" fill="${C.ink}">${top[i]}</text>`)
  }
  s.push(`<text x="452" y="72" text-anchor="start" font-size="10.5" fill="${C.ink}">before: 10 characters</text>`)
  for (let i = 0; i < bot.length; i++) {
    s.push(`<rect x="${40 + cell * i}" y="104" width="${cell}" height="40" fill="${C.white}" stroke="${C.conn}" stroke-width="1.5"/>`)
    s.push(`<text x="${40 + cell * i + cell / 2}" y="130" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.ink}">${bot[i]}</text>`)
  }
  s.push(`<text x="292" y="128" text-anchor="start" font-size="10.5" fill="${C.ink}">after: 6 characters - ratio 1.67</text>`)
  s.push('</svg>')
  return s.join('')
}

function cf35HuffSmallSvg(): string {
  const W = 560
  const H = 250
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="Huffman tree for A weight 5, B weight 3, C weight 1. The root carries 9. Its 0 edge leads to A at depth 1; its 1 edge leads to a weight-4 node, whose 0 edge leads to B at depth 2 and whose 1 edge leads to C at depth 2. Codewords: A is 0, B is 10, C is 11.">`)
  s.push(`<text x="${W / 2}" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.tealInk}">HUFFMAN TREE FOR A:5, B:3, C:1</text>`)
  s.push(`<line x1="280" y1="58" x2="100" y2="138" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(`<line x1="280" y1="58" x2="430" y2="138" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(`<line x1="430" y1="138" x2="350" y2="212" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(`<line x1="430" y1="138" x2="500" y2="212" stroke="${C.mid}" stroke-width="2"/>`)
  s.push(`<text x="178" y="94" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.conn}" stroke="${C.paper}" stroke-width="3" paint-order="stroke">0</text>`)
  s.push(`<text x="367" y="94" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.conn}" stroke="${C.paper}" stroke-width="3" paint-order="stroke">1</text>`)
  s.push(`<text x="378" y="171" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.conn}" stroke="${C.paper}" stroke-width="3" paint-order="stroke">0</text>`)
  s.push(`<text x="477" y="171" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.conn}" stroke="${C.paper}" stroke-width="3" paint-order="stroke">1</text>`)
  s.push(`<circle cx="280" cy="58" r="18" fill="${C.white}" stroke="${C.teal}" stroke-width="2"/>`)
  s.push(`<text x="280" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.ink}">9</text>`)
  s.push(`<circle cx="100" cy="138" r="17" fill="${C.panelB}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<text x="100" y="142" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.ink}">5</text>`)
  s.push(`<circle cx="430" cy="138" r="17" fill="${C.white}" stroke="${C.teal}" stroke-width="2"/>`)
  s.push(`<text x="430" y="142" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.ink}">4</text>`)
  s.push(`<circle cx="350" cy="212" r="16" fill="${C.panelB}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<text x="350" y="216" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.ink}">3</text>`)
  s.push(`<circle cx="500" cy="212" r="16" fill="${C.panelB}" stroke="${C.conn}" stroke-width="2"/>`)
  s.push(`<text x="500" y="216" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.ink}">1</text>`)
  s.push(`<text x="100" y="166" text-anchor="middle" font-size="10" fill="${C.ink}">A: code 0, depth 1</text>`)
  s.push(`<text x="350" y="240" text-anchor="middle" font-size="10" fill="${C.ink}">B: code 10, depth 2</text>`)
  s.push(`<text x="498" y="240" text-anchor="middle" font-size="10" fill="${C.ink}">C: code 11, depth 2</text>`)
  s.push('</svg>')
  return s.join('')
}

function cf35LzwDictSvg(): string {
  const W = 560
  const H = 230
  const rows = [
    ['1', 'X', 'adds XY'],
    ['2', 'Y', 'adds YZ'],
    ['3', 'Z', 'adds ZX'],
    ['4', 'XY', 'adds XYZ'],
    ['5', 'ZX', 'adds ZXY'],
    ['6', 'YZ', 'nothing - input ends'],
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="LZW trace on XYZXYZXYZ. Six codes are emitted: X, Y, Z, XY, ZX, YZ. The dictionary gains five entries in order: XY, YZ, ZX, XYZ, ZXY. Nine characters ride out as six codes.">`)
  s.push(`<text x="${W / 2}" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.tealInk}">LZW ON XYZXYZXYZ - THE DICTIONARY GROWS</text>`)
  s.push(`<text x="70" y="46" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.ink}">Step</text>`)
  s.push(`<text x="190" y="46" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.ink}">Code out</text>`)
  s.push(`<text x="400" y="46" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.ink}">Dictionary gains</text>`)
  rows.forEach((r, i) => {
    const y = 58 + i * 26
    s.push(`<rect x="40" y="${y}" width="480" height="24" fill="${i % 2 === 0 ? C.white : C.panelB}"/>`)
    s.push(`<text x="70" y="${y + 16.5}" text-anchor="middle" font-size="10.5" fill="${C.tealInk}">${r[0]}</text>`)
    s.push(`<text x="190" y="${y + 16.5}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${C.ink}">${r[1]}</text>`)
    s.push(`<text x="400" y="${y + 16.5}" text-anchor="middle" font-size="10.5" fill="${C.ink}">${r[2]}</text>`)
  })
  s.push(`<text x="${W / 2}" y="224" text-anchor="middle" font-size="10" fill="${C.tealInk}">9 characters in, 6 codes out</text>`)
  s.push('</svg>')
  return s.join('')
}

function cf35Ratio192Svg(): string {
  const W = 720
  const H = 170
  const cd = 31752000
  const mp3 = 4320000
  const X0 = 150
  const FULL = 470
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="A 180-second song at CD rate bills 31,752,000 bytes; the same song as a 192 kbit/s MP3 bills 4,320,000 bytes. The ratio is 7.35. Both bars are the same 180 seconds of music.">`)
  s.push(`<text x="${W / 2}" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.tealInk}">A 180-SECOND SONG AT 192 KBIT/S</text>`)
  s.push(`<rect x="${X0}" y="54" width="${FULL}" height="34" rx="3" fill="${C.teal}"/>`)
  s.push(`<text x="18" y="75" text-anchor="start" font-size="11" fill="${C.ink}">CD audio</text>`)
  s.push(`<text x="${X0 + FULL - 8}" y="75" text-anchor="end" font-size="10.5" fill="${C.white}">31,752,000 B</text>`)
  const w2 = FULL * (mp3 / cd)
  s.push(`<rect x="${X0}" y="108" width="${w2.toFixed(1)}" height="34" rx="3" fill="${C.conn}"/>`)
  s.push(`<text x="18" y="129" text-anchor="start" font-size="11" fill="${C.ink}">MP3 192 kbit/s</text>`)
  s.push(`<text x="${X0 + w2 + 10}" y="129" text-anchor="start" font-size="10.5" fill="${C.ink}">4,320,000 B - the ratio is 7.35</text>`)
  s.push(`<text x="${W / 2}" y="160" text-anchor="middle" font-size="9.5" fill="${C.tealInk}">both bars are the same 180 seconds of music</text>`)
  s.push('</svg>')
  return s.join('')
}

function cf35AmbiguitySvg(): string {
  const W = 560
  const H = 200
  const bits = ['0', '0', '1']
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}" role="img" aria-label="The bit string 001 read two ways under the non-prefix code A equals 0, B equals 01, C equals 1. Reading one: A, A, C. Reading two: A, B. One string, two files - the ambiguity that the prefix property forbids.">`)
  s.push(`<text x="${W / 2}" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="${C.tealInk}">THE STRING 001, READ TWO WAYS</text>`)
  s.push(`<text x="${W / 2}" y="40" text-anchor="middle" font-size="10" fill="${C.tealInk}">under the code A = 0, B = 01, C = 1</text>`)
  s.push(`<text x="20" y="66" text-anchor="start" font-size="10.5" fill="${C.ink}">reading 1:</text>`)
  bits.forEach((b, i) => {
    s.push(`<rect x="${190 + 44 * i}" y="44" width="44" height="40" fill="${C.white}" stroke="${C.tealInk}" stroke-width="1"/>`)
    s.push(`<text x="${212 + 44 * i}" y="70" text-anchor="middle" font-size="13" font-weight="bold" fill="${C.ink}">${b}</text>`)
  })
  s.push(`<text x="212" y="102" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.struct}">A</text>`)
  s.push(`<text x="256" y="102" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.struct}">A</text>`)
  s.push(`<text x="300" y="102" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.struct}">C</text>`)
  s.push(`<text x="20" y="140" text-anchor="start" font-size="10.5" fill="${C.ink}">reading 2:</text>`)
  bits.forEach((b, i) => {
    s.push(`<rect x="${190 + 44 * i}" y="118" width="44" height="40" fill="${C.white}" stroke="${C.tealInk}" stroke-width="1"/>`)
    s.push(`<text x="${212 + 44 * i}" y="144" text-anchor="middle" font-size="13" font-weight="bold" fill="${C.ink}">${b}</text>`)
  })
  s.push(`<path d="M 190 164 L 190 170 L 234 170 L 234 176" fill="none" stroke="${C.accent}" stroke-width="1.5"/>`)
  s.push(`<path d="M 278 170 L 322 170 L 322 176" fill="none" stroke="${C.accent}" stroke-width="1.5"/>`)
  s.push(`<text x="212" y="186" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.accent}">A</text>`)
  s.push(`<text x="300" y="186" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.accent}">B</text>`)
  s.push('</svg>')
  return s.join('')
}

export const lesson35: Lesson = {
  id: 'cf-compression-lossless-and-lossy',
  number: '3.5',
  title: 'Compression: Lossless and Lossy',
  concepts: [
    'compression ratio',
    'run-length encoding',
    'prefix codes and Huffman coding',
    'dictionary compression and LZW',
    'chroma subsampling',
    'perceptual coding',
    'lossless versus lossy formats',
  ],
  objectives: [
    'By the end of this lesson you can state the packing question lesson 3.4 left open and explain why the two honest answers — lossless and lossy — are the chapter’s sharpest line.',
    'By the end of this lesson you can define the compression ratio and compute one from any pair of file sizes, including the saving as a percentage.',
    'By the end of this lesson you can encode and decode run-length witnesses by hand, and predict honestly when RLE grows a file instead of shrinking it.',
    'By the end of this lesson you can build a small Huffman tree, read off its prefix codewords, cost it against a fixed-length code, and place its mean beside the entropy floor.',
    'By the end of this lesson you can trace an LZW run on a short string and name the algorithm inside ZIP, GIF and PNG with their dates.',
    'By the end of this lesson you can reason about lossy formats — the JPEG block census with 4:2:0 subsampling and the MP3 rate arithmetic — and deliver the verdict table for which media tolerate loss.',
  ],
  prerequisites: ['cf-text-images-and-sound-as-bits'],
  sources: ['cs-cf-web-ground'],
  blocks: [
    /* ================================================================ */
    /* 1. THE QUESTION LESSON 3.4 LEFT OPEN                              */
    /* ================================================================ */
    { kind: 'heading', text: 'The Question Lesson 3.4 Left Open' },
    { kind: 'para', text: 'Lesson 3.4 ended with a set of numbers that should have made you uncomfortable. A single 1080p frame of video is a parade of $2{,}073{,}600$ luma samples, and dressed in full RGB that is $6{,}220{,}800$ bytes for one picture. At a cinema-smooth 30 frames per second the parade becomes a firehose of $186{,}624{,}000$ bytes every second — about $1.49$ gigabits per second — which would fill a compact disc in roughly $4.2$ seconds. A 74-minute stereo album at CD quality is $783{,}216{,}000$ bytes, the $747$ MiB slab you met there. Even a still photograph from a modest 12-megapixel camera is $36{,}000{,}000$ bytes — $34.3323$ MiB — before it has moved anywhere at all.' },
    { kind: 'para', text: 'None of these objects ships in that form. Your phone stores hundreds of such photographs and dozens of such songs; a streaming service pushes that video down a household wire. Something must be removed before any of it travels or rests, and the question is the sharpest one in this chapter: which bytes can go — and can they come BACK? Ask it of any file and you receive one of exactly two honest answers, and the whole discipline of data compression hangs on the difference between them.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — lossless and lossy compression', text: '*Compression* is said to be **lossless** if the decoding step can rebuild the original file exactly, bit for bit, so that no information is lost. It is said to be **lossy** if the decoding step produces only a perceptually close copy: some information is discarded forever, chosen — by the format’s designers — to be information the eye or ear notices least. Symbolically, lossless means $\\mathrm{decode}(\\mathrm{encode}(F)) = F$ for every file $F$, while lossy settles for $\\mathrm{decode}(\\mathrm{encode}(F)) \\approx F$ under a budget.' },
    { kind: 'figure', caption: 'Figure 1. One file, two doors. The lossless door returns the original bit for bit — its trade is text, code, ZIP, PNG, GIF, run-length encoding and Huffman. The lossy door returns only a close copy, spending the difference on purpose — its trade is photos and music: JPEG, MP3, most video. Every format in this lesson lives behind one of these two doors.', svg: cf35TwoDoorsSvg() },
    { kind: 'para', text: 'Hold the two doors apart firmly, because examinations and engineering both test exactly this line. Behind the lossless door live the algorithms of guarantee: whatever leaves, returns. Behind the lossy door lives a bet — a wager that the discarded bits were the ones your senses would never have missed. This lesson walks both corridors in turn. First the food that every compressor eats: redundancy. Then the lossless craft — run-length encoding, Huffman coding, the dictionary methods — each met as a small worked witness you can check with a pencil. Then the lossy craft, where JPEG and MP3 make their perceptual bets with numbers you have already met in lesson 3.4. Finally the verdict table: which media may pass through which door, and the one caution that trips beginners every year.' },

    /* ================================================================ */
    /* 2. REDUNDANCY: WHAT COMPRESSION EATS                              */
    /* ================================================================ */
    { kind: 'heading', text: 'Redundancy: What Compression Eats' },
    { kind: 'para', text: 'No compressor can shrink a file that has nothing spare to give. What is spare? Any regularity a shorter description can exploit. Three kinds carry this lesson. **Runs** — the same symbol repeating: ten A’s in a row carry no more news than the count ten and the letter A. **Repeats** — whole phrases that return: the string ABABABAB says one thing four times. **Skews** — some symbols far more common than others: if A fills half your file, A deserves the cheapest dress you can sew. Runs, repeats and skews are the three shapes of *redundancy*, and redundancy is the only food a compressor eats.' },
    { kind: 'para', text: 'To measure any shrinkage honestly we need one number agreed in advance. The **compression ratio** of a shrink is the original size divided by the compressed size:' },
    { kind: 'equation', latex: '\\text{compression ratio} = \\dfrac{\\text{original size}}{\\text{compressed size}} \\tag{1}', note: 'A ratio above 1 means the file shrank; 2 means it halved. The saving is the removed share of the original, as a percentage.' },
    { kind: 'derivation', title: 'Weighing a shrink on the ratio scale', statement: 'A file of 2,048,000 bytes is compressed to 512,000 bytes. Derive both the compression ratio and the percentage saving from the definition alone.', steps: [
      { label: 'Set the quotient', formula: 'R = \\dfrac{2{,}048{,}000}{512{,}000}', explanation: 'The ratio is original over compressed — divide the two sizes exactly as they stand.' },
      { label: 'Divide', formula: 'R = 4', explanation: 'The compressed file is one quarter of the original, so the ratio is 4: the file quartered.' },
      { label: 'Turn to the saving', formula: '\\dfrac{2{,}048{,}000 - 512{,}000}{2{,}048{,}000} = \\dfrac{3}{4}', explanation: 'The saving is the removed bytes over the ORIGINAL bytes — never over the compressed ones.' },
      { label: 'Read the percentage', formula: '\\text{saving} = 75\\%', explanation: 'Three quarters of the original mass left, and one quarter rode on.' },
    ], result: 'The ratio is $4$ and the saving is $75$ per cent — the same fact worn two ways, and both count from the original size.' },
    { kind: 'example', title: 'Illustration 1. A toy budget, weighed both ways', steps: [
      'Take the file of $2{,}048{,}000$ bytes and its compressed image of $512{,}000$ bytes.',
      'Divide: $2{,}048{,}000 \\div 512{,}000 = 4$, so the compression ratio is 4 — the file quartered.',
      'Now, subtract for the saving: $2{,}048{,}000 - 512{,}000 = 1{,}536{,}000$ bytes removed.',
      'Divide by the original: $1{,}536{,}000 \\div 2{,}048{,}000 = 0.75$, so the saving is 75 per cent.',
      'Hence ratio 4 and saving 75 per cent — one shrink, two honest numbers.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The denominator discipline', text: 'The ratio divides by the compressed size; the saving divides by the original. Mix the denominators and every answer in this chapter turns wrong at once. A ratio of 4 is a saving of 75 per cent, a ratio of 2 is a saving of 50 per cent, and a ratio of 11.025 — which you will meet at the MP3 door — is a saving of about 90.9 per cent. Train the reflex: ratio first, then the saving as its complement.' },
    { kind: 'formula', name: 'The compression ratio', latex: 'R = \\dfrac{\\text{original size}}{\\text{compressed size}}', note: 'Divide by the compressed size; the percentage saving divides the removed bytes by the original instead.' },
    { kind: 'para', text: 'One caution before any algorithm arrives. No law of nature promises a shrink. A file of already-random bytes has no runs, no repeats, no skew — nothing to describe more briefly than itself — and any honest compressor, asked to squeeze it, will at best return it unchanged and at worst return something slightly larger. Keep that caution beside you: the next three sections are not magic but accounting, and accounting only finds what is there.' },

    /* ================================================================ */
    /* 3. LOSSLESS CRAFT                                                 */
    /* ================================================================ */
    { kind: 'heading', text: 'Lossless Craft: Every Bit Returns' },
    { kind: 'para', text: 'The lossless corridor has one unbreakable rule: whatever leaves the file must return, exactly, when the process runs backwards. A ZIP that drops letters is not a weaker ZIP — it is a corrupt file. This rule is why the lossless craft is a search for shorter *descriptions* of the very same information: never less information, only a briefer way of saying it. Three classical crafts own the corridor — run-length encoding, Huffman coding and the dictionary methods — and every modern lossless format, ZIP and PNG included, is a braid of them.' },

    { kind: 'heading', text: 'Run-Length Encoding: Runs Become Pairs' },
    { kind: 'callout', tone: 'definition', title: 'Definition — run-length encoding', text: '*Run-length encoding* (RLE) is said to be the recoding in which each **maximal run** — a stretch of one repeated symbol — is replaced by the pair *count followed by symbol*. The decoder rebuilds each run from its pair, so the round trip is exact whenever every run in the file is recorded.' },
    { kind: 'para', text: 'For example, take this lesson’s first witness through the code:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the witness string $\\text{AABBCCCCCD}$ — ten characters, four runs: AA, BB, CCCCC and D;',
      '(ii) each run becomes a pair: $\\text{AA} \\to 2A$, $\\text{BB} \\to 2B$, $\\text{CCCCC} \\to 5C$, $\\text{D} \\to 1D$;',
      '(iii) the pairs join into $\\text{2A2B5C1D}$ — eight characters, down from ten.',
    ] },
    { kind: 'example', title: 'Illustration 2. The witness AABBCCCCCD under RLE', steps: [
      'Take the witness and split it into maximal runs: AA, BB, CCCCC, D — four runs, never five.',
      'Turn each run into its pair: AA becomes 2A, BB becomes 2B, CCCCC becomes 5C, and the lone D becomes 1D.',
      'Join the pairs: 2A2B5C1D — eight characters where ten stood.',
      'Check the round trip: read 2A as AA, 2B as BB, 5C as CCCCC, 1D as D — the original returns exactly.',
      'So the compression ratio is $10 \\div 8 = 1.25$, a saving of 20 per cent — modest, because the runs were short.',
    ] },
    { kind: 'algorithm', title: 'Run-length encode a string', lines: [
      { code: 'runs = split S into maximal equal-symbol stretches', note: 'Walk left to right; cut a new run whenever the symbol changes.' },
      { code: 'for each run: emit (length of run) then (its symbol)', note: 'Count first, symbol second — the pair the decoder expects.' },
      { code: 'concatenate the pairs to form the encoding', note: 'No separators: the pair structure itself paces the reading.' },
      { code: 'decode by expanding each pair back to its run', note: 'The round trip is exact — this is the lossless guarantee.' },
    ], note: 'Terminates in one pass; the output length is twice the number of runs.' },
    { kind: 'example', title: 'Illustration 3. The honesty ledger: when RLE grows a file', steps: [
      'Take the string AB — two runs of length one each.',
      'Encode each: A becomes 1A and B becomes 1B, so AB becomes 1A1B.',
      'Compare: 2 characters in, 4 characters out — RLE has DOUBLED the file.',
      'Now, take AABBCC: the pairs are 2A, 2B, 2C, joining to 2A2B2C — 6 in, 6 out, ratio exactly 1.',
      'Next, take ABCD: 1A1B1C1D — 4 characters become 8, another doubling.',
      'Finally, take AAAAAAAAAA: ten A’s are one run, encoding to 10A — 10 characters become 3, a ratio of $10 \\div 3 \\approx 3.33$.',
      'Hence the ledger: RLE pays when runs are long, breaks even when runs are all of length two, and grows the file when the text refuses to repeat.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — RLE is a gambler, and the alphabet is its opponent', text: 'Never promise a shrink from RLE without looking at the runs. A string of singletons grows: AB doubles to 1A1B. Worse, a naive count-and-symbol code is ambiguous when the alphabet contains digits: encode the bit string 11110000 and you get 4140 — the decoder reads 41 then hunts for a symbol that never comes, and the round trip is broken. Real systems mend this with fixed-width counts (the exercise set designs one) or by escaping; the naive form is for teaching, and for alphabets that contain no digits.' },
    { kind: 'para', text: 'Where does RLE earn its keep? Wherever runs are born long: fax pages of white with occasional black, simple bitmaps with flat colour fields, the flat stretches of telemetry. It is the oldest and plainest of the crafts — a patent for a telegraph version was filed in the 1880s — and it survives inside modern formats precisely because some corner of every real file refuses to vary. But for text with skew — letters of wildly different frequencies — RLE is helpless, and the next craft takes over.' },
    { kind: 'heading', text: 'Huffman Coding: Frequency Buys Shortness' },
    { kind: 'para', text: 'Turn from runs to skews. In ordinary English, and in most real files, some symbols dominate: the space and the letter e outpace the z and the semicolon by enormous factors. A fixed-length code — the 2-bit code that names each of four symbols in exactly two bits — charges every symbol the same rent. But if one symbol rides in half the file, why should it pay two bits? David Huffman asked exactly this as a graduate student, and the answer he found in 1952 still bears his name.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the 1952 paper and the student who beat the course', text: 'Huffman’s method appeared as ‘A Method for the Construction of Minimum-Redundancy Codes’, Proceedings of the IRE, volume 40, pages 1098–1101, in 1952. The honest legend — and Huffman himself retold it this way — is that he devised it as an MIT Sc.D. student working on a term assignment in Robert Fano’s information-theory course, after the students were told they could skip the final if their code design beat the best then known; Huffman, fearing the exam and scheduling his work at the last minute, found the optimum his professor had not. Whatever the exact shape of the tale, the paper is real, the algorithm is real, and it outranks the exam.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — prefix code', text: 'A binary code is said to be a **prefix code** if no codeword is the beginning of any other codeword. A prefix code can be read from one unbroken bit stream with no separators and no looking ahead, because each codeword announces its own end. Every Huffman code is a prefix code.' },
    { kind: 'para', text: 'The construction is a repeated marriage of the lightest. List the symbols with their frequencies. Take the two lightest, weld them into one combined node carrying the sum of their weights, and set the combination back in the list. Repeat until one node — the root — remains; then read each symbol’s codeword off the path from root to leaf. Watch it run on this lesson’s pinned alphabet: A five times, B twice, C once, D once — nine symbols in all.' },
    { kind: 'example', title: 'Illustration 4. Building the Huffman tree for {A:5, B:2, C:1, D:1}', steps: [
      'Take the weights in a row: 5, 2, 1, 1 — nine symbols in total.',
      'Marry the two lightest: 1 and 1 make a node of weight 2, standing beside the real B of weight 2.',
      'Marry the two lightest again: the new 2 and B’s 2 make a node of weight 4.',
      'Marry once more: 4 and 5 make the root of weight 9 — the ladder reads 1+1 to 2, 2+2 to 4, 4+5 to 9.',
      'Now, label every left-going edge 0 and every right-going edge 1: A, married last, hangs one step from the root and wears the single bit 0.',
      'So B wears 10 at depth 2, while C and D wear 110 and 111 at depth 3 — frequent symbols short, rare symbols long, exactly as promised.',
    ] },
    { kind: 'figure', caption: 'Figure 2. The Huffman tree of the alphabet {A:5, B:2, C:1, D:1}. The two lightest weights marry first (1+1 to 2, then 2+2 to 4, then 4+5 to 9), so A sits one edge from the root wearing 0, B sits at depth 2 wearing 10, and C and D sit at depth 3 wearing 110 and 111. The cost line: $5 \\times 1 + 2 \\times 2 + 1 \\times 3 + 1 \\times 3 = 15$ bits against 18 for the fixed 2-bit code.', svg: cf35HuffmanTreeSvg() },
    { kind: 'example', title: 'Illustration 5. Costing the code: 18 bits against 15', steps: [
      'Take the fixed alternative first: four symbols fit in $\\lceil \\log_2 4 \\rceil = 2$ bits each, so nine symbols cost $9 \\times 2 = 18$ bits.',
      'Now, cost the Huffman code symbol by symbol: $5 \\times 1 + 2 \\times 2 + 1 \\times 3 + 1 \\times 3$.',
      'Multiply: $5 + 4 + 3 + 3 = 15$ bits for the same nine symbols.',
      'Subtract: 3 bits saved, and $3 \\div 18 = 0.1667$ — a saving of 16.67 per cent.',
      'Hence the skew bought its price: the frequent A pays 1 bit instead of 2, and the saving swamps the extra bit now and then charged to the rare C and D.',
    ] },
    { kind: 'para', text: 'Check the prefix property on the codewords $0$, $10$, $110$ and $111$: no codeword begins another — 0 is not the start of 10, 10 is not the start of 110 — so a stream of these codewords parses itself, with no commas. The check has an arithmetic shadow: summing $2^{-1} + 2^{-2} + 2^{-3} + 2^{-3}$ gives exactly 1, the mark of a *complete* code with no wasted codeword lengths. And the property is not decoration, as the exercise set shows with a code that violates it and turns one bit string into two different files.' },
    { kind: 'example', title: 'Illustration 6. Encoding and decoding AAAAABBCD', steps: [
      'Take the message AAAAABBCD — the pinned alphabet in its natural order: five A’s, two B’s, one C, one D.',
      'Encode each letter: A becomes 0, so the run of five becomes 00000; B becomes 10; C becomes 110; D becomes 111.',
      'Join the pieces: 000001010110111 — fifteen bits, matching the cost of Illustration 5 exactly.',
      'Now, decode from the left: the leading 0 must be A (nothing else starts with 0), and the parser walks on.',
      'Trace the whole stream: A, A, A, A, A, B, C, D — the original message returns, and no other reading is possible.',
      'Hence the prefix property is what makes the stream self-pacing: no separators, no ambiguity, no bits wasted on boundaries.',
    ] },
    { kind: 'para', text: 'Fifteen bits for nine symbols is a mean of $15/9 \\approx 1.6667$ bits per symbol. Could a cleverer lossless code have done better — say 1.5? There is a hard floor, and it has a name. The **entropy** of the alphabet, $H$, is the expected surprise per symbol; for the frequencies $5/9$, $2/9$, $1/9$, $1/9$ it comes to $1.6577427$ bits per symbol, and no lossless code for this source can average less. Huffman’s 1.6667 sits a hair — $0.0089$ bits — above the floor. The derivation below weighs the floor for this very alphabet; its proof belongs to information theory, which owns a later book of this library.' },
    { kind: 'equation', latex: 'H = -\\sum_{i} p_i \\log_2 p_i \\tag{2}', note: 'The entropy floor: the mean bits per symbol below which no lossless code for the source can pass.' },
    { kind: 'derivation', title: 'Weighing the entropy floor of the pinned alphabet', statement: 'For the alphabet {A: 5, B: 2, C: 1, D: 1} over nine symbols, compute the entropy H and set it beside the Huffman mean of 15/9 bits per symbol.', steps: [
      { label: 'Set the probabilities', formula: 'p(A) = \\tfrac{5}{9}, \\quad p(B) = \\tfrac{2}{9}, \\quad p(C) = p(D) = \\tfrac{1}{9}', explanation: 'Nine symbols in total; each frequency divided by nine gives that letter’s probability.' },
      { label: 'Unfold the entropy law', formula: 'H = \\tfrac{5}{9}\\log_2\\tfrac{9}{5} + \\tfrac{2}{9}\\log_2\\tfrac{9}{2} + \\tfrac{1}{9}\\log_2 9 + \\tfrac{1}{9}\\log_2 9', explanation: 'Each term is a probability times the log of its own reciprocal — its surprise, in bits.' },
      { label: 'Evaluate the terms', formula: '0.4711 + 0.4822 + 0.3522 + 0.3522', explanation: 'The frequent A contributes little surprise; the rare C and D contribute the most per appearance.' },
      { label: 'Sum to the floor', formula: 'H = 1.6577\\ \\text{bits per symbol}', explanation: 'The four terms add to the pinned value 1.6577427 — the floor for this alphabet.' },
    ], result: 'The floor is $H = 1.6577$ bits per symbol, and the Huffman mean is $15/9 \\approx 1.6667$ — the code sits $0.0089$ bits above the floor, exactly as the theorem permits.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the entropy floor', text: 'For any source, no lossless prefix code can have an expected length below the entropy $H = -\\sum_i p_i \\log_2 p_i$. Huffman’s construction always meets the floor within one bit per symbol, and for this lesson’s alphabet within $0.0089$. The floor is not a challenge to beat — it is a wall; the proof rides the Information Theory doorstep named at the end of this lesson.' },
    { kind: 'para', text: 'One more honest question: is 15 bits really the best a prefix code can do here, or did our marriage order just get lucky? Brute force settles it. A prefix code on four symbols is a full binary tree, and only two shapes of full binary tree with four leaves exist: the comb with depths $1, 2, 3, 3$ and the balanced tree with depths $2, 2, 2, 2$. The balanced shape charges every symbol two bits: $9 \\times 2 = 18$ bits, whatever the weights. The comb assigns its single short slot to one symbol — and the best occupant is plainly the weight-5 A, giving exactly the 15 we found. No permutation of weights does better: 15 is optimal, and Huffman’s marriage-of-the-lightest finds such optima on every alphabet, a fact you may take on trust until the doorstep books prove it.' },
    { kind: 'formula', name: 'The Huffman cost', latex: '\\text{cost} = \\sum_{i} w_i \\times \\text{depth}_i', note: 'Weight times codeword length, summed over the alphabet; the fixed code pays the same flat rate to every symbol.' },

    { kind: 'heading', text: 'Dictionary Methods: The Growing Dictionary' },
    { kind: 'para', text: 'Runs and skews are not the only food. Whole phrases repeat, and a third craft banks them: keep a dictionary of phrases seen so far, and when a phrase recurs, ship its index instead of its letters. The idea was published twice by Abraham Lempel and Jacob Ziv — LZ77 in 1977 and LZ78 in 1978, the two parents of a large family — and it was made practical and famous by Terry Welch’s variant, LZW, which appeared in the journal *Computer* in June 1984 (volume 17, number 6, pages 8–19).' },
    { kind: 'callout', tone: 'definition', title: 'Definition — LZW compression', text: '*LZW compression* is said to be the dictionary method in which the encoder starts with the bare alphabet and, as it reads, always extends the longest dictionary phrase it can; every time extension fails, it emits that longest phrase and adds the *phrase-plus-next-letter* to the dictionary. The dictionary therefore grows as it reads, and — the elegant part — the decoder rebuilds the same dictionary from the output alone, so the dictionary itself never ships.' },
    { kind: 'algorithm', title: 'One step of LZW', lines: [
      { code: 'w = longest dictionary phrase matching here', note: 'Start from one character; extend while the extension is in the dictionary.' },
      { code: 'emit the code for w', note: 'The phrase leaves as a compact index, not as letters.' },
      { code: 'add w + next character to the dictionary', note: 'The failure to extend is the trigger: the new phrase is banked.' },
      { code: 'resume from the next character', note: 'Each pass banks one longer phrase; repetition is progressively captured.' },
    ], note: 'The decoder mirrors this: it rebuilds each added phrase from what it has already decoded.' },
    { kind: 'example', title: 'Illustration 7. An LZW run on ABABABAB', steps: [
      'Take the string ABABABAB — eight characters, and start the dictionary holding just A and B.',
      'Read the first A: AB is not yet in the dictionary, so emit A and bank AB; resume at the B.',
      'Read the B: BA is not in the dictionary, so emit B and bank BA; resume at the third character.',
      'Now, read A again: AB IS in the dictionary now, so extend; ABA is not, so emit AB and bank ABA.',
      'Continue: the next stretch reads BA, extends, fails at ABAB, emits ABA and banks ABAB; the tail emits B.',
      'Count the output: A, B, AB, ABA, B — five codes for eight characters, with the dictionary grown by AB, BA, ABA, ABAB.',
      'Hence the repetition was captured as it formed: the second half of the string rides out as two long phrases, and the decoder rebuilds every one of them without ever being sent the dictionary.',
    ] },
    { kind: 'para', text: 'Notice what the trace taught. The dictionary needed no second pass and no side channel: each new entry is inferable at the decoder the instant the following code arrives, because its first character is exactly the first character of that following code. This is the quiet genius of LZW — the repeats are banked in the very act of being read, and the file ships without its dictionary. On text with heavy phrase repetition the dictionary swells and the ratio climbs; on truly novel strings the method coasts, emitting single characters and banking phrases it will never use again.' },

    { kind: 'heading', text: 'A Census of Lossless Formats' },
    { kind: 'para', text: 'The three crafts rarely work alone; real formats braid them. A census of the three you meet daily:' },
    { kind: 'table', caption: 'Table 1. The lossless format census — what ships inside each name.', head: ['Format', 'Born', 'The craft inside', 'The honest note'], rows: [
      ['ZIP', '1990s (PKWARE)', 'DEFLATE = LZ77-style repeats + Huffman coding of what remains', 'The two crafts braided: the dictionary pass first, then the skew pass'],
      ['GIF', '1987 (CompuServe, Bob Berry)', 'LZW over colour indices', 'Lossless over its 256-colour palette — the palette limit is a choice of dress, not of compression'],
      ['PNG', '1 October 1996 (W3C Recommendation)', 'DEFLATE, filters + LZ77 + Huffman', 'The patent-free lossless replacement for GIF, and the web’s lossless still-image standard'],
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the patent that birthed PNG', text: 'GIF’s LZW sat inside patents licensed by Unisys, and when that fact surfaced in the mid-1990s the web’s GIF habit suddenly looked priced. The answer came from the World Wide Web Consortium: PNG, published as a W3C Recommendation on 1 October 1996, built on DEFLATE — the same LZ77-plus-Huffman braid ZIP uses — and deliberately owed nothing to LZW. PNG won on principle and on craft; GIF survived on animation and habit. The lesson inside the lesson: a compression patent is only ever one licence away from a successor format.' },

    /* ================================================================ */
    /* 4. LOSSY CRAFT                                                    */
    /* ================================================================ */
    { kind: 'heading', text: 'Lossy Craft: The Perceptual Bet' },
    { kind: 'para', text: 'Now walk through the second door, where the rule inverts: some bits are to be gone forever — but gone *on purpose*, chosen as the ones the eye or ear will miss least. Lossy compression is not sloppiness; it is a designed bet against the blind spots of human perception, and its winnings are the orders of magnitude that make streaming and pocket music libraries possible. Two witnesses carry the section: JPEG for the eye, MP3 for the ear.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the one-way door', text: 'What lossy discards does not come back. Re-saving a JPEG as PNG does not restore the discarded detail; it merely dresses the already-damaged copy losslessly. Every re-encode at a lower quality spends more. Keep the original (or a lossless master) and make lossy copies from it — never lossy copies of lossy copies.' },

    { kind: 'heading', text: 'JPEG: Blocks, Frequencies and the Quality Dial' },
    { kind: 'para', text: 'JPEG — created in 1992 and published as ISO/IEC 10918-1, the same text as ITU-T Recommendation T.81 — is the standard still-image format of the lossy door. Its engine is the discrete cosine transform, the DCT, which turned 60 this century’s way: the transform entered the mainstream with Nasir Ahmed, T. Natarajan and K. R. Rao’s 1974 paper, and JPEG’s designers built their standard around it. The DCT redescribes each small patch of the image not as pixel values but as a recipe of spatial frequencies — slow waves across the patch, then faster and faster ripples — and human vision is blunt about the fast ripples.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the 1974 transform that waited for its standard', text: 'Ahmed, Natarajan and Rao published the DCT in 1974, years before any image standard wanted it. JPEG (the name began as the Joint Photographic Experts Group, founded 1986) chose the DCT core and published its first standard part in 1992 as ISO/IEC 10918-1 / ITU-T T.81. The eighteen years between the paper and the standard are a normal interval in computing: mathematics ripens, hardware catches up, and the two meet in a format.' },
    { kind: 'example', title: 'Illustration 8. The 8 × 8 block census of a 1080p luma plane', steps: [
      'Take the 1080p luma plane: $1920 \\times 1080 = 2{,}073{,}600$ samples — the census lesson 3.4 already banked.',
      'Divide each edge by the block size: $1920 \\div 8 = 240$ block columns and $1080 \\div 8 = 135$ block rows.',
      'Multiply: $240 \\times 135 = 32{,}400$ blocks tile the plane exactly, with nothing left over.',
      'Now, census each block: $8 \\times 8 = 64$ samples, so $32{,}400 \\times 64 = 2{,}073{,}600$ — the multiplication returns the original sample count to the digit, as it must.',
      'Hence JPEG’s working unit: not the frame but the little 8 × 8 patch, each transformed, each quantised, each a separate bet on what the eye will miss.',
    ] },
    { kind: 'figure', caption: 'Figure 3. The 1080p luma plane tiled by 8 × 8 blocks: $240 \\times 135 = 32{,}400$ blocks of $64$ samples, multiplying back to exactly $2{,}073{,}600$. The 4:2:0 note: colour, which the eye reads bluntly, is subsampled so that a 2 × 2 area carries 6 samples (4 luma, 1 Cb, 1 Cr) instead of 12 — the colour census halves.', svg: cf35JpegGridSvg() },
    { kind: 'para', text: 'Colour is the first thing JPEG spends. Full RGB bills a 2 × 2 macroblock twelve samples: four pixels times three channels. But the eye’s luma acuity dwarfs its chroma acuity — you read fine print from brightness, not hue — so 4:2:0 chroma subsampling bills each 2 × 2 macroblock only six samples: the four luma values, plus one averaged Cb and one averaged Cr. Twelve becomes 6: the colour census halves, and on the full 1080p frame the three planes bill $2{,}073{,}600 + 2 \\times 518{,}400 = 3{,}110{,}400$ samples — exactly half of full RGB’s $6{,}220{,}800$. A 4K frame takes the same haircut: $480 \\times 270 = 129{,}600$ blocks, and a 4:2:0 total of $12{,}441{,}600$ against full RGB’s $24{,}883{,}200$.' },
    { kind: 'para', text: 'Then the DCT and the quality dial do the real work. Each 8 × 8 block becomes 64 frequency coefficients; the encoder divides each coefficient by a step size taken from a quantisation table, and the fast ripples — which the eye barely registers — are divided so hard that many become zero and vanish. The step sizes are the dial your photo editor labels *quality*: high quality, gentle steps, near-invisible loss; low quality, brutal steps, ringing and blockiness at the block seams. The zeros that remain are then run-length and Huffman coded — the lossless crafts riding inside the lossy format — so JPEG is a braid too: subsample, transform, quantise, then compress what is left losslessly.' },
    { kind: 'callout', tone: 'insight', title: 'Why the blocks are 8 × 8 and not the whole frame', text: 'A transform over the whole frame would spread one pixel’s news across every coefficient; small blocks keep each bet local, keep the arithmetic small enough for 1992 hardware, and confine visible damage to a seam you have to squint to find. The block is a compromise between mathematics and machinery — and the census it creates (32,400 blocks on a 1080p luma plane) is exactly the arithmetic of the exercise set.' },

    { kind: 'heading', text: 'MP3: Shrinking the Stream' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — Fraunhofer, 1993, and the hardest witness', text: 'MP3 is MPEG-1 Audio Layer III, published as ISO/IEC 11172-3 in 1993 and developed largely by the Fraunhofer Society in Germany (with the Dieter Seitzer group at Erlangen–Nuremberg behind much of the academic line). The ‘.mp3’ file name was agreed in 1995. The development team’s test track, by their own telling, was Suzanne Vega’s a cappella ‘Tom’s Diner’ — reportedly chosen because an unaccompanied human voice is the most unforgiving witness a perceptual codec can face: no instruments to hide behind. The anecdote is a legend the participants themselves repeat; the standard, the date and the society are fact.' },
    { kind: 'para', text: 'MP3’s craft is perceptual: it splits the stream into frequency bands and spends bits where the ear is sharp, abandoning bands that a louder neighbour *masks* — the phenomenon by which a shout makes a whisper inaudible. The arithmetic of the bet is lesson 3.4’s own. A CD carries $44{,}100$ samples per second, 16 bits each, on two channels: $44{,}100 \\times 16 \\times 2 = 1{,}411{,}200$ bits per second. A classic MP3 at 128 kbit/s carries $128{,}000$. Divide:' },
    { kind: 'example', title: 'Illustration 9. The rate ratio at 128 kbit/s', steps: [
      'Take the CD rate from lesson 3.4: $44{,}100 \\times 16 \\times 2 = 1{,}411{,}200$ bits per second.',
      'Take the MP3 rate: $128{,}000$ bits per second — the classic transparent-ish setting of the 1990s.',
      'Divide: $1{,}411{,}200 \\div 128{,}000 = 11.025$, exactly — no rounding.',
      'So the MP3 stream is 11.025 times lighter than the CD stream: a saving of about $1 - 1/11.025 \\approx 90.9$ per cent.',
      'Hence eleven CDs of music ride in the space one would fill — the pocket library of the 2000s, bought with masked frequencies.',
    ] },
    { kind: 'example', title: 'Illustration 10. A 210-second song, weighed three ways', steps: [
      'Take a 210-second song — three and a half minutes.',
      'Bill the CD: $1{,}411{,}200 \\text{ bit/s} \\times 210 = 296{,}352{,}000$ bits $= 37{,}044{,}000$ bytes.',
      'Convert: $37{,}044{,}000 \\div 1{,}048{,}576 = 35.3279$ MiB (35.327911376953125 exactly — the division terminates).',
      'Now, bill the 128 kbit/s MP3: $128{,}000 \\times 210 \\div 8 = 3{,}360{,}000$ bytes $= 3.2043$ MiB (3.204345703125 exactly).',
      'Compare: 35.3279 MiB against 3.2043 MiB — the ratio is again exactly 11.025, the same number the per-second division gave.',
      'Then try the premium rate: at 320 kbit/s the file is $320{,}000 \\times 210 \\div 8 = 8{,}400{,}000$ bytes, about 8.0109 MiB, and the ratio is $1{,}411{,}200 \\div 320{,}000 = 4.41$.',
      'Hence the dial: 4.41 times smaller at 320 kbit/s, 11.025 times at 128 — every step down the bitrate spends fidelity the codec hopes you cannot hear.',
    ] },
    { kind: 'figure', caption: 'Figure 4. The ratio ladder for one 210-second song: the CD stream is 37,044,000 B = 35.3279 MiB; the 320 kbit/s MP3 is 8,400,000 B, 4.41× smaller; the 128 kbit/s MP3 is 3,360,000 B = 3.2043 MiB, 11.025× smaller. Bar lengths are drawn from the true byte counts.', svg: cf35RatioLadderSvg() },
    { kind: 'para', text: 'Read the two witnesses together and the lossy philosophy stands clear. JPEG spends what the eye is blunt about: high-frequency ripples, fine colour differences. MP3 spends what the ear is blunt about: masked bands, inaudible phases. Both spend irreversibly, both wrap their spending in a final lossless braid (JPEG’s Huffman pass, MP3’s entropy coding), and both expose a quality dial whose settings are honest arithmetic — the ratios 4.41 and 11.025 are not slogans but divisions you have now performed yourself.' },

    /* ================================================================ */
    /* 5. THE VERDICT TABLE                                              */
    /* ================================================================ */
    { kind: 'heading', text: 'The Verdict Table' },
    { kind: 'para', text: 'Everything in the lesson now folds into one decision procedure. Ask of any file: does its medium tolerate loss? The answer is a property of the *medium and its use*, not of the algorithms — both doors have excellent craftsmen. The verdict:' },
    { kind: 'table', caption: 'Table 2. The verdict — which door for which medium, and why.', head: ['The file', 'The door', 'The reason that decides'], rows: [
      ['Text, source code, spreadsheets, archives', 'Lossless — always', 'A ZIP that drops letters is not a weaker ZIP; it is corrupt. One flipped bit in code is a bug or worse'],
      ['Programs, databases, system images', 'Lossless — always', 'The bits ARE the function; there is nothing the eye would "miss less"'],
      ['Photographs', 'Lossy by choice (JPEG)', 'The eye forgives spent ripples and coarse colour; the savings are orders of magnitude'],
      ['Music and speech', 'Lossy by choice (MP3, AAC…)', 'The ear forgives masked bands; keep a lossless master for re-editing'],
      ['Line art, screenshots, logos', 'Lossless (PNG)', 'Sharp edges and flat colour are exactly what block-based lossy blurs'],
      ['A JPEG renamed or re-saved as PNG', 'Neither — pointless', 'The loss already happened; PNG now stores the damage faithfully at a higher price'],
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the pointless lossless', text: 'Compressing an already-lossy file losslessly is a purchase of nothing. The MP3 inside your ZIP is still an MP3; the JPEG inside your PNG is still a JPEG. Lossless preserves what is there — including what is missing. The only repair is to return to the original master, which is why photographers keep RAW and engineers keep the master takes.' },
    { kind: 'para', text: 'One refinement earns its line. Some media sit on the boundary: medical images and forensic photographs tolerate no loss by policy, so they ride PNG or lossless JPEG variants; masters for editing ride lossless even when the distribution copy will be lossy. The verdict table is a default, and professional practice writes its exceptions in the same ink: what must return, rides lossless.' },

    /* ================================================================ */
    /* 6. DOORSTEPS                                                      */
    /* ================================================================ */
    { kind: 'heading', text: 'Where This Road Leads Next' },
    { kind: 'para', text: 'This lesson is a first meeting, and it has been honest about its edges. The entropy floor was *used* here, not proved: the source-coding theorem, arithmetic coding (which squeezes even the hair between Huffman’s 1.6667 and the floor’s 1.6577), and the full mathematics of information ride the Information Theory volume of this library’s later CS shelf. The number-systems dress that every bit here wears was built in ‘Arithmetic and Number Systems’, which owns the full positional theory; the gate-level machinery that stores and shifts these bits belongs to ‘Digital Logic Design’. This chapter owns only the first meeting: which bytes can go, and whether they come back.' },
    { kind: 'callout', tone: 'insight', title: 'The one sentence to keep', text: 'Compression is accounting, not magic: lossless finds shorter descriptions of the same information, lossy spends information your senses were never spending — and the compression ratio, the entropy floor and the verdict table are the three ledgers on which every file’s journey is written.' },
    { kind: 'callout', tone: 'exam', title: 'Examination corner — how this lesson is asked', text: 'Banking and SSC computer-awareness papers, school-board IT papers and Cambridge 9618-style asks all probe this lesson in four shapes, and all four are trained in the practice sets below (exam-style items in the L4 set are our own originals in the examination idiom, never quotations of a real paper). Shape one: classify the format — which of ZIP, PNG, GIF, JPEG, MP3 are lossless? Shape two: the small Huffman trace — build the tree for a three- or four-symbol alphabet and read off the codewords. Shape three: the ratio arithmetic — CD rate against an MP3 bitrate, or a file against its compressed size, expecting the ratio and sometimes the percentage saving. Shape four: the tolerance ask — which media may be compressed lossily and why text may not. Examiners also love the traps: the GIF patent story, the 4.41 against 11.025 mix-up, and "lossless of a lossy file" as a trick option. Mark the pinned dates — 1952, 1984, 1987, 1992, 1993, 1 October 1996 — they appear as options more often than they have any right to.' },

    { kind: 'heading', text: 'Key Terms' },
    { kind: 'terms', items: [
      { term: 'compression', def: 'Recoding a file to occupy fewer bytes, by describing its redundancy more briefly (lossless) or by discarding information chosen to be missed least (lossy).' },
      { term: 'lossless compression', def: 'Compression whose decode rebuilds the original exactly, bit for bit; the craft of ZIP, PNG, GIF, RLE, Huffman and LZW.' },
      { term: 'lossy compression', def: 'Compression that discards information permanently, betting that the eye or ear will not miss it; the craft of JPEG, MP3 and most video.' },
      { term: 'compression ratio', def: 'Original size divided by compressed size; a ratio of 4 is a saving of 75 per cent of the original.' },
      { term: 'run-length encoding (RLE)', def: 'Recoding each maximal run of one repeated symbol as the pair count-then-symbol; exact when every run is recorded, but grows files of singletons.' },
      { term: 'prefix code', def: 'A code in which no codeword begins another, so a bit stream parses itself with no separators; every Huffman code is one.' },
      { term: 'Huffman coding', def: 'The 1952 method that marries the two lightest nodes repeatedly, giving frequent symbols short codewords; optimal among prefix codes.' },
      { term: 'entropy (H)', def: 'The mean bits per symbol below which no lossless code for a source can pass: $H = -\\sum_i p_i \\log_2 p_i$ bits.' },
      { term: 'dictionary compression', def: 'Banking repeated phrases in a dictionary and shipping indices; the LZ77/LZ78 family, made practical as LZW by Welch in 1984.' },
      { term: 'LZW', def: 'Welch’s 1984 dictionary method whose dictionary grows as it reads and is rebuilt by the decoder, so it never ships.' },
      { term: 'DEFLATE', def: 'The lossless braid inside ZIP and PNG: an LZ77-style repeat pass followed by a Huffman pass.' },
      { term: 'chroma subsampling (4:2:0)', def: 'Spending colour resolution the eye will not miss: a 2 × 2 macroblock stores 4 luma plus 1 Cb and 1 Cr — 6 samples, not 12.' },
      { term: 'perceptual coding', def: 'Lossy coding that abandons what perception masks or blurs — MP3’s masked frequency bands, JPEG’s fast ripples.' },
    ] },

    /* ================================================================ */
    /* 7. QUIZ                                                           */
    /* ================================================================ */
    { kind: 'heading', text: 'Check Your Understanding' },
    { kind: 'quiz', items: [
      {
        q: 'Which of these formats is LOSSY?',
        options: ['PNG', 'ZIP', 'JPEG', 'GIF'],
        answer: 2,
        explain: 'JPEG spends information permanently: its quantisation step zeroes frequency coefficients the eye barely reads, and no decode ever rebuilds them. PNG (W3C Recommendation, 1 October 1996) is lossless — DEFLATE, an LZ77-plus-Huffman braid describing the same pixels more briefly. ZIP is lossless by definition of its purpose: a ZIP that dropped letters would be a corrupt archive, not a compressed one. GIF (CompuServe, 1987) is lossless over its data — LZW over colour indices; its 256-colour palette is a limitation of the dress chosen before compression, not a loss the compressor causes. Hence JPEG alone stands behind the lossy door.',
      },
      {
        q: 'In the Huffman code for the alphabet {A:5, B:2, C:1, D:1}, the most frequent symbol A wears —',
        options: ['110', '10', '111', '0'],
        answer: 3,
        explain: 'Huffman marries the two lightest weights first — 1+1 to 2, then 2+2 to 4, then 4+5 to 9 — so A, carried by the heavy root edge, ends one step from the root and wears the single bit 0. The option 110 is C’s codeword: C, weight 1, marries first and sinks to depth 3. The option 10 is B’s codeword at depth 2. The option 111 is D’s codeword, also depth 3. The whole method is the trade: frequency buys shortness, so the heaviest symbol must wear the shortest dress — 0.',
      },
      {
        q: 'Naive run-length encoding of the string AB produces —',
        options: ['1A1B', '2A1B', 'AB', '1AB'],
        answer: 0,
        explain: 'RLE splits AB into two maximal runs, A and B, each of length one, and each run becomes its pair: 1A and 1B, joining to 1A1B — 2 characters grown to 4, the honesty casualty of the method. The option 2A1B miscounts the first run: there is one A, not two. The option AB is the input unchanged — no encoding happened at all, and the question asks for the RLE form. The option 1AB is malformed: a count must ride before each symbol, and the pair structure 1A-then-B is not a legal RLE reading. Hence 1A1B, the doubling that teaches when NOT to use RLE.',
      },
      {
        q: 'The CD stereo rate of 1,411,200 bit/s divided by a 128 kbit/s MP3 stream gives —',
        options: ['4.41', '11.025', '1.41', '141.12'],
        answer: 1,
        explain: 'Divide the two rates exactly: $1{,}411{,}200 \\div 128{,}000 = 11.025$ — the MP3 stream is 11.025 times lighter, a saving of about 90.9 per cent. The option 4.41 is the ratio at the premium 320 kbit/s setting ($1{,}411{,}200 \\div 320{,}000$), a classic mix-up of dials. The option 1.41 comes from squinting at the digits of 1,411,200 and reading a mantissa as a ratio. The option 141.12 misplaces the decimal by two places, off by a factor of 100. Hence 11.025, exactly — no rounding anywhere.',
      },
      {
        q: 'Under 4:2:0 chroma subsampling, one 2 × 2 macroblock stores —',
        options: ['6 samples', '12 samples', '8 samples', '4 samples'],
        answer: 0,
        explain: 'A 2 × 2 macroblock holds four pixels, and 4:2:0 keeps all four luma (brightness) samples Y but only one averaged Cb and one averaged Cr: $4 + 1 + 1 = 6$ samples. The option 12 is full RGB — four pixels times three channels — the bill BEFORE subsampling, which the ratio halves. The option 8 would be a halving applied to the whole frame rather than to colour alone, misreading the scheme. The option 4 is luma only, as if colour had been discarded outright rather than downsampled. Hence 6: the colour census halves because the eye reads colour bluntly.',
      },
    ] },

    { kind: 'heading', text: 'Practice Sets' },
    { kind: 'para', text: 'The sets climb four rungs. L1 begins at the witnesses themselves — encodings you can check in one line. L2 builds small Huffman trees and walks LZW on fresh strings. L3 trains the skills this lesson is for: costing a code, exposing an ambiguity, weighing a stream. L4 trains the examination idiom — and every L4 item is exam-style, an original item in the examination idiom, never a real past-paper question. Work each chain with a pencil; where a question carries a figure, the figure is the arithmetic drawn.' },
    { kind: 'exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'Encode MMMOOOOOOT by run-length encoding, state the output length, and give the compression ratio to two decimal places.',
            solution: [
              'Split the string into maximal runs: MMM, OOOOOO, T — three runs.',
              'Turn each run into its pair: 3M, 6O, 1T.',
              'Join the pairs: 3M6O1T — six characters where ten stood.',
              'Now, form the ratio: $10 \div 6 = 1.67$ (a saving of 40 per cent of the original).',
              'So MMMOOOOOOT becomes 3M6O1T, shrinking 10 characters to 6. (The figure draws both rows.)',
            ],
            answer: 'MMMOOOOOOT becomes 3M6O1T: 10 characters to 6, ratio 1.67.',
            figures: [
              { caption: 'RLE before and after: the ten cells M M M O O O O O O T collapse into the three pairs 3M, 6O, 1T — six characters for ten, a ratio of 1.67.', svg: cf35RleStripSvg() },
            ],
          },
          {
            q: 'Encode XXYYYZZZZZ by RLE, then encode a run of twelve P’s. Give both output lengths and both ratios.',
            solution: [
              'Split XXYYYZZZZZ into maximal runs: XX, YYY, ZZZZZ.',
              'Turn each run into its pair: 2X, 3Y, 5Z, joining to 2X3Y5Z — six characters for ten, ratio $10 \div 6 \approx 1.67$.',
              'Now, take twelve P’s: one maximal run of length twelve, so the pair is 12P — three characters.',
              'Form the second ratio: $12 \div 3 = 4$ exactly.',
              'Hence 2X3Y5Z (ratio 1.67) and 12P (ratio 4) — the longer the run, the fatter the win.',
            ],
            answer: 'XXYYYZZZZZ becomes 2X3Y5Z (10 to 6); twelve P’s become 12P (12 to 3, ratio 4).',
          },
          {
            q: 'Predict — before encoding — whether RLE shrinks AABBCC and ABCD; then encode both and check your prediction.',
            solution: [
              'Look at the runs first: AABBCC has three runs of length two each; ABCD has four runs of length one each.',
              'Predict: every pair costs two characters, so runs of length two break even and singletons double.',
              'Encode AABBCC: 2A, 2B, 2C join to 2A2B2C — six characters for six, ratio exactly 1.',
              'Encode ABCD: 1A, 1B, 1C, 1D join to 1A1B1C1D — eight characters for four, a doubling.',
              'Hence the prediction holds: AABBCC breaks even and ABCD doubles — RLE without long runs is a losing bet.',
            ],
            answer: 'AABBCC gives 2A2B2C (6 to 6, no gain); ABCD gives 1A1B1C1D (4 to 8, doubled).',
          },
          {
            q: 'The naive count-then-symbol RLE is asked to encode the bit string 11110000. Show what goes wrong on the way back.',
            solution: [
              'Take the string 11110000: two runs, 1111 and 0000.',
              'Encode: 41114040? No — each pair is count then symbol, so 1111 becomes 41 and 0000 becomes 40, joining to 4140.',
              'Now, attempt the decode of 4140: the decoder gathers digits 4, 1, 4, 0 and finds no symbol after any of them.',
              'Check: the decoder wanted a letter after the count, but the alphabet here is digits — counts and symbols share one alphabet, so the reading is ambiguous and the round trip fails.',
              'Hence 11110000 encodes to 4140, which will not decode back: the naive code is only safe over alphabets with no digits.',
            ],
            answer: '11110000 becomes 4140, and the naive decoder cannot rebuild it — digits as symbols break the code.',
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Build the Huffman code for the alphabet {A:5, B:3, C:1}: give the merge ladder, every codeword, the cost, and the saving against the fixed code.',
            solution: [
              'List the weights: 5, 3, 1 — nine symbols in total.',
              'Marry the two lightest: 1 and 3 make a node of weight 4; then 4 and 5 make the root of weight 9 — the ladder reads 1+3 to 4, 4+5 to 9.',
              'Now, read the codewords: A wears 0 at depth 1; B wears 10 and C wears 11, both at depth 2.',
              'Cost the code: $5 \times 1 + 3 \times 2 + 1 \times 2 = 13$ bits, against the fixed $9 \times 2 = 18$ bits.',
              'So the saving is 5 bits: $5 \div 18 \approx 27.78$ per cent.',
              'Hence the code is A = 0, B = 10, C = 11, costing 13 of 18 bits. (The figure draws the tree.)',
            ],
            answer: 'Ladder 1+3 to 4, then 4+5 to 9; A = 0, B = 10, C = 11; cost 13 bits against 18 — 27.78 per cent saved.',
            figures: [
              { caption: 'The Huffman tree for {A:5, B:3, C:1}: A sits at depth 1 wearing 0, while B and C sit at depth 2 wearing 10 and 11 — the cost is 5 + 6 + 2 = 13 bits.', svg: cf35HuffSmallSvg() },
            ],
          },
          {
            q: 'Build the Huffman code for {A:6, B:3, C:2, D:1}: state the ladder, the codewords, the cost, and the saving against the fixed 2-bit code.',
            solution: [
              'List the weights: 6, 3, 2, 1 — twelve symbols in total.',
              'Marry the two lightest: 1 and 2 make 3; then the two 3’s make 6; then 6 and 6 make the root 12 — the ladder reads 1+2 to 3, 3+3 to 6, 6+6 to 12.',
              'Now, read the codewords: A wears 0 at depth 1; B wears 10 at depth 2; C wears 110 and D wears 111 at depth 3.',
              'Cost the code: $6 \times 1 + 3 \times 2 + 2 \times 3 + 1 \times 3 = 21$ bits, against the fixed $12 \times 2 = 24$ bits.',
              'So the saving is 3 bits: $3 \div 24 = 12.5$ per cent.',
              'Hence the code is A = 0, B = 10, C = 110, D = 111, costing 21 of 24 bits.',
            ],
            answer: 'Ladder 1+2 to 3, 3+3 to 6, 6+6 to 12; A = 0, B = 10, C = 110, D = 111; cost 21 bits against 24 — 12.5 per cent saved.',
          },
          {
            q: 'Run LZW on the string AAAAAA, starting from a dictionary holding only A. List the codes emitted and every dictionary entry added.',
            solution: [
              'Take the first A: AA is not in the dictionary, so emit A and bank AA; resume.',
              'Read the next A: AA IS in the dictionary now, so extend; AAA is not, so emit AA and bank AAA.',
              'Read the tail: AAA is in the dictionary, the string ends, so emit AAA.',
              'Count: three codes — A, AA, AAA — for six characters, with the dictionary grown by AA and AAA.',
              'Hence AAAAAA rides out as A, AA, AAA: the run was captured as lengths 1, 2, 3 — exactly the doubling ladder a growing dictionary loves.',
            ],
            answer: 'LZW emits A, AA, AAA (three codes for six characters); the dictionary gains AA and AAA.',
          },
          {
            q: 'For each of ZIP, GIF and PNG, name the compression algorithm inside, the year of birth, and one honest note. (This is the census table, asked cold.)',
            solution: [
              'Take ZIP first: inside is DEFLATE, a braid of an LZ77-style repeat pass and a Huffman pass, from the PKWARE era of the early 1990s.',
              'Take GIF: born 1987 at CompuServe, credited to Bob Berry, using LZW over colour indices — lossless over a 256-colour palette.',
              'Take PNG: a W3C Recommendation of 1 October 1996, using DEFLATE — the patent-free lossless replacement for GIF.',
              'So the honest notes: ZIP braids two crafts; GIF’s palette limit is a dress choice, not compressor loss; PNG exists because LZW carried patent risk.',
              'Hence ZIP = DEFLATE, GIF = LZW (1987, CompuServe, Berry), PNG = DEFLATE (W3C, 1 October 1996).',
            ],
            answer: 'ZIP: DEFLATE (LZ77 + Huffman); GIF: LZW, CompuServe 1987, Bob Berry, 256 colours; PNG: DEFLATE, W3C Recommendation 1 October 1996.',
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'Build the Huffman code for the near-uniform alphabet {A:5, B:5, C:2, D:2}. Then set the cost against the fixed code and explain what the near-tie teaches.',
            solution: [
              'List the weights: 5, 5, 2, 2 — fourteen symbols in total, and notice how flat the row is.',
              'Marry the two lightest: 2 and 2 make 4; then 4 and 5 make 9; then 5 and 9 make the root 14 — the ladder reads 2+2 to 4, 4+5 to 9, 5+9 to 14.',
              'Now, read the codewords: B wears 1 at depth 1; A wears 00, C wears 010 and D wears 011 at depths 2 and 3.',
              'Cost the code: $5 \times 2 + 5 \times 1 + 2 \times 3 + 2 \times 3 = 27$ bits, against the fixed $14 \times 2 = 28$ bits.',
              'Compare with the floor: $H \approx 1.8631$ against a mean of $27 \div 14 \approx 1.9286$ — the code is honest but the meal is thin.',
              'Hence only one bit in twenty-eight was saved ($3.57$ per cent): when frequencies even out, the skew has nothing to sell — the entropy floor itself stands near the fixed cost.',
            ],
            answer: 'B = 1, A = 00, C = 010, D = 011; cost 27 bits against 28 — one bit (3.57 per cent) saved; a near-uniform alphabet starves Huffman.',
          },
          {
            q: 'The code {A: 0, B: 01, C: 1} is proposed for a three-symbol alphabet. Show that the single string 001 decodes two ways, and state the property whose violation caused it.',
            solution: [
              'Take the string 001 and attempt the first reading: 0 is A, the next 0 is A again, and 1 is C — so AAC.',
              'Try the second reading: 0 is A, then 01 is exactly B — so AB.',
              'Check the code table for the cause: A’s codeword 0 is the beginning of B’s codeword 01.',
              'So the code is not prefix-free — one codeword starts another, and the parser cannot know when a codeword has ended.',
              'Hence 001 reads as both AAC and AB, and the violated property is the prefix property: no codeword may begin another. (The figure draws both readings.)',
            ],
            answer: '001 decodes as AAC or as AB, because A = 0 is a prefix of B = 01 — the code is not prefix-free.',
            figures: [
              { caption: 'One bit string, two files: under the non-prefix code A = 0, B = 01, C = 1, the string 001 reads as A A C or as A B — the ambiguity the prefix property exists to forbid.', svg: cf35AmbiguitySvg() },
            ],
          },
          {
            q: 'Run LZW on XYZXYZXYZ starting from a dictionary of X, Y, Z. List the codes emitted in order and the dictionary entries added in order.',
            solution: [
              'Take the first X: XY is new, so emit X and bank XY; the next Y finds YZ new, so emit Y and bank YZ.',
              'Continue with Z: ZX is new, so emit Z and bank ZX.',
              'Now, the second X: XY is in the dictionary, extend to XYZ — new — so emit XY and bank XYZ.',
              'Then the Z: ZX is in the dictionary, extend to ZXY — new — so emit ZX and bank ZXY.',
              'Finish with the tail YZ: already banked, so it emits as one code, YZ, adding nothing.',
              'Hence six codes — X, Y, Z, XY, ZX, YZ — for nine characters, with the dictionary grown by XY, YZ, ZX, XYZ, ZXY in that order. (The figure tabulates the run.)',
            ],
            answer: 'LZW emits X, Y, Z, XY, ZX, YZ (six codes for nine characters); the dictionary gains XY, YZ, ZX, XYZ, ZXY.',
            figures: [
              { caption: 'The LZW trace on XYZXYZXYZ: six codes out (X, Y, Z, XY, ZX, YZ), five dictionary entries banked (XY, YZ, ZX, XYZ, ZXY) — nine characters compressed to six codes.', svg: cf35LzwDictSvg() },
            ],
          },
          {
            q: 'A 180-second song is encoded as an MP3 at 192 kbit/s. Find the MP3 file size in bytes, the CD bill for the same 180 seconds, and the compression ratio.',
            solution: [
              'Take the bitrate: 192,000 bits per second, riding for 180 seconds: $192{,}000 \times 180 = 34{,}560{,}000$ bits.',
              'Convert to bytes: $34{,}560{,}000 \div 8 = 4{,}320{,}000$ bytes.',
              'Now, bill the CD: the rate is $44{,}100 \times 16 \times 2 = 176{,}400$ bytes per second, so $176{,}400 \times 180 = 31{,}752{,}000$ bytes.',
              'Divide for the ratio: $31{,}752{,}000 \div 4{,}320{,}000 = 7.35$ — the same as $1{,}411{,}200 \div 192{,}000$, as it must be.',
              'Hence the MP3 bills 4,320,000 bytes against the CD’s 31,752,000 — 7.35 times smaller. (The figure draws both bars.)',
            ],
            answer: 'The MP3 is 4,320,000 B; the CD bill is 31,752,000 B; the ratio is 7.35.',
            figures: [
              { caption: 'The 180-second song twice: the CD bar bills 31,752,000 bytes, the 192 kbit/s MP3 bar 4,320,000 bytes — a ratio of 7.35, drawn from the true byte counts.', svg: cf35Ratio192Svg() },
            ],
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'Exam-style. Classify each of JPEG, PNG, MP3, ZIP and GIF as lossless or lossy, and state which of them you would never apply to a spreadsheet, with the reason.',
            solution: [
              'Classify the still-image pair first: JPEG is lossy (its quantisation zeroes coefficients forever); PNG is lossless (DEFLATE, a W3C Recommendation of 1 October 1996).',
              'Classify the audio: MP3 is lossy (perceptual coding, MPEG-1 Audio Layer III, ISO/IEC 11172-3:1993).',
              'Classify the archives: ZIP is lossless (DEFLATE again); GIF is lossless over its data (LZW, CompuServe 1987, Bob Berry).',
              'Now, the spreadsheet: it is text-shaped — numbers and formulas — so only lossless may touch it; JPEG and MP3 are the two never to apply.',
              'Hence lossy: JPEG, MP3; lossless: PNG, ZIP, GIF — and a spreadsheet tolerates no loss at all, because one altered digit is a wrong answer, silently.',
            ],
            answer: 'Lossy: JPEG and MP3. Lossless: PNG, ZIP and GIF. Never apply JPEG or MP3 to a spreadsheet — a spreadsheet is data, and data must return bit for bit.',
          },
          {
            q: 'Exam-style. A 3-minute (180-second) stereo track is stored once as an uncompressed CD-rate WAV and once as a 128 kbit/s MP3. Compute both sizes in bytes and the compression ratio.',
            solution: [
              'Take the CD rate: $44{,}100 \times 16 \times 2 = 1{,}411{,}200$ bits per second.',
              'Bill the WAV: $1{,}411{,}200 \times 180 = 254{,}016{,}000$ bits $= 31{,}752{,}000$ bytes.',
              'Now, bill the MP3: $128{,}000 \times 180 = 23{,}040{,}000$ bits $= 2{,}880{,}000$ bytes.',
              'Divide: $31{,}752{,}000 \div 2{,}880{,}000 = 11.025$ — the same ratio the per-second division $1{,}411{,}200 \div 128{,}000$ gives.',
              'Hence 31,752,000 bytes against 2,880,000 bytes, a ratio of exactly 11.025 — about a 90.9 per cent saving.',
            ],
            answer: 'WAV: 31,752,000 B; MP3: 2,880,000 B; the ratio is exactly 11.025 (a saving of about 90.9 per cent).',
          },
          {
            q: 'Design exercise (examination long-form in spirit). A run-length code packs each pair into one byte: 4 bits of count, 4 bits of symbol. (a) What is the longest run one pair can carry? (b) How many bytes do AABBCCCCCD and AAAAAAAAAA cost, against their ASCII bills? (c) How does the encoder handle a run of forty?',
            solution: [
              'Take the count field: 4 bits name $2^4 = 16$ values, and the count starts at 1, so the longest run per pair is 15.',
              'Cost AABBCCCCCD: four runs (AA, BB, CCCCC, D), so four pairs $\times$ 8 bits $= 32$ bits, against $10 \times 8 = 80$ bits of ASCII — a ratio of $80 \div 32 = 2.5$.',
              'Cost AAAAAAAAAA: one run, one pair, 8 bits against 80 — a ratio of 10, the design’s best case.',
              'Now, the run of forty: no pair can carry it, so split it as 15 + 15 + 10 — three pairs, three bytes.',
              'Hence the field caps runs at 15; the witness costs 4 bytes for 10 (ratio 2.5), the ten-A run 1 byte for 10 (ratio 10), and long runs are chopped into 15-sized pieces with a remainder pair.',
            ],
            answer: '(a) 15 per pair; (b) AABBCCCCCD costs 4 bytes against 10 (ratio 2.5), AAAAAAAAAA costs 1 byte against 10 (ratio 10); (c) a run of 40 splits as 15 + 15 + 10, three pairs.',
          },
        ],
      },
    ] },
  ],
}
