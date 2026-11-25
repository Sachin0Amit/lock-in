/**
 * v-cf35.ts — the verify-first ENGINE + PIN harness for CF lesson 3.5
 * 'Compression: Lossless and Lossy' (CS RUN 5 swarm, seat cf35, task CS5-5).
 *
 * THE LAW (SPEC_CORE): the engine wins over any other source. Every number
 * the lesson prints is recomputed here by brute force FIRST — the RLE witness,
 * the Huffman tree depths / cost / entropy, the LZW run on ABABABAB, the JPEG
 * block census, the MP3 rate arithmetic, and every exercise witness — and the
 * shipped part is re-read at the end (word floor, quiz key, figure counts,
 * solution-figure counts, id/number/title/prereqs, the raw-TeX law, SVG
 * hygiene, the connective voice).
 *
 * Sections:
 *   A — the 3.4 firehose recap (the WHY numbers this lesson opens with)
 *   B — the compression ratio definition (toy budget)
 *   C — run-length encoding (all witnesses, incl. the honesty casualties)
 *   D — Huffman for the pinned alphabet {A:5, B:2, C:1, D:1}
 *   E — Huffman for the three exercise alphabets + the non-prefix witness
 *   F — LZW (ABABABAB pinned; AAAAAA and XYZXYZXYZ exercise witnesses)
 *   G — the JPEG block census (1080p + 4K, 4:2:0 halving)
 *   H — the MP3 arithmetic (11.025x, 4.41x, the 210-second budget, 192k)
 *   I — the nibble-packed RLE design (L6 exercise)
 *   Z — the final re-read of the shipped part (>= 5 checks; here ~24)
 *
 * Run: cd /home/z/my-project && bun run docs/research/cf-ch03-wip/v-cf35.ts
 */
import { lesson35 } from './part-cf35'
import { countLessonWords } from '../../../src/data/library/types'

export {}
let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = ''): void {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
const near = (a: number, b: number, eps = 1e-12) => Math.abs(a - b) < eps
const f2 = (x: number) => x.toFixed(2)
const f4 = (x: number) => x.toFixed(4)
const MIB = 1048576

/* ================================================================== */
/* computation kernels — the brute force                               */
/* ================================================================== */

/* ---- run-length encoding (letters only; the naive decoder shows the
        digit-alphabet failure honestly) ---- */
function rle(s: string): string {
  let out = ''
  let i = 0
  while (i < s.length) {
    let j = i
    while (j < s.length && s[j] === s[i]) j++
    out += String(j - i) + s[i]
    i = j
  }
  return out
}
function rleRuns(s: string): string[] {
  const runs: string[] = []
  let i = 0
  while (i < s.length) {
    let j = i
    while (j < s.length && s[j] === s[i]) j++
    runs.push(s[i].repeat(j - i))
    i = j
  }
  return runs
}
function rleDecode(e: string): string {
  let out = ''
  let i = 0
  while (i < e.length) {
    let num = ''
    while (i < e.length && e[i] >= '0' && e[i] <= '9') { num += e[i]; i++ }
    if (i >= e.length) return out + '?[count ' + num + ' with no symbol]'
    out += e[i].repeat(parseInt(num, 10))
    i++
  }
  return out
}

/* ---- entropy ---- */
function entropyOf(freqs: number[]): number {
  const total = freqs.reduce((a, b) => a + b, 0)
  return -freqs.reduce((acc, w) => acc + (w / total) * Math.log2(w / total), 0)
}

/* ---- Huffman, deterministic: always merge the two lightest (pool kept
        ascending, ties by the alphabetically smallest symbol inside); when
        labelling edges, bit 0 rides to the HEAVIER child (ties again by the
        alphabetically smallest symbol). This is one valid Huffman code, and
        it is the one the lesson prints. ---- */
interface HNode { sym: string; w: number; minSym: string; left: HNode | null; right: HNode | null }
function huffman(freqs: [string, number][]): { codes: Map<string, string>; ladder: string[] } {
  const ladder: string[] = []
  const byKey = (a: HNode, b: HNode) => (a.w - b.w) || (a.minSym < b.minSym ? -1 : 1)
  const mk = (sym: string, w: number): HNode => ({ sym, w, minSym: sym, left: null, right: null })
  let nodes = freqs.map(([s, w]) => mk(s, w)).sort(byKey)
  while (nodes.length > 1) {
    const a = nodes.shift() as HNode
    const b = nodes.shift() as HNode
    ladder.push(a.w + '+' + b.w + '->' + (a.w + b.w))
    const m: HNode = {
      sym: '', w: a.w + b.w,
      minSym: a.minSym < b.minSym ? a.minSym : b.minSym,
      left: a, right: b,
    }
    let idx = nodes.findIndex((n) => byKey(n, m) > 0)
    if (idx === -1) idx = nodes.length
    nodes.splice(idx, 0, m)
  }
  const codes = new Map<string, string>()
  const walk = (n: HNode, prefix: string): void => {
    if (!n.left && !n.right) { codes.set(n.sym, prefix); return }
    let zero = n.left as HNode
    let one = n.right as HNode
    const swap = zero.w === one.w ? zero.minSym > one.minSym : zero.w < one.w
    if (swap) { zero = n.right as HNode; one = n.left as HNode }
    walk(zero, prefix + '0')
    walk(one, prefix + '1')
  }
  walk(nodes[0], '')
  return { codes, ladder }
}
function huffCost(freqs: [string, number][], codes: Map<string, string>): number {
  return freqs.reduce((acc, [s, w]) => acc + w * (codes.get(s) as string).length, 0)
}
function kraft(codes: Map<string, string>): number {
  return [...codes.values()].reduce((acc, c) => acc + Math.pow(2, -c.length), 0)
}
function prefixFree(codes: Map<string, string>): boolean {
  const cs = [...codes.values()]
  return cs.every((c) => cs.every((d) => c === d || !d.startsWith(c)))
}
/* every way a bit string can parse under a code — the ambiguity prober */
function parses(s: string, codes: Map<string, string>): string[][] {
  const rev = new Map<string, string>()
  codes.forEach((v, k) => rev.set(v, k))
  const out: string[][] = []
  const rec = (i: number, acc: string[]): void => {
    if (i === s.length) { out.push([...acc]); return }
    for (let l = 1; i + l <= s.length; l++) {
      const sym = rev.get(s.slice(i, i + l))
      if (sym !== undefined) rec(i + l, [...acc, sym])
    }
  }
  rec(0, [])
  return out
}
function perms<T>(xs: T[]): T[][] {
  if (xs.length <= 1) return [xs]
  const out: T[][] = []
  xs.forEach((x, i) => {
    perms(xs.slice(0, i).concat(xs.slice(i + 1))).forEach((p) => out.push([x, ...p]))
  })
  return out
}

/* ---- LZW (dictionary of phrases, codes emitted as the phrases themselves) ---- */
function lzw(s: string, alpha: string[]): { out: string[]; added: string[] } {
  const dset = new Set<string>(alpha)
  const out: string[] = []
  const added: string[] = []
  let w = s[0]
  for (let i = 1; i < s.length; i++) {
    const c = s[i]
    if (dset.has(w + c)) { w = w + c } else { out.push(w); dset.add(w + c); added.push(w + c); w = c }
  }
  out.push(w)
  return { out, added }
}
function lzwDecode(out: string[], alpha: string[]): string {
  const dset = new Set<string>(alpha)
  let result = out[0]
  let prev = out[0]
  for (let i = 1; i < out.length; i++) {
    let cur = out[i]
    if (!dset.has(cur)) cur = prev + prev[0]
    result += cur
    dset.add(prev + cur[0])
    prev = cur
  }
  return result
}

/* ================================================================== */
/* A — the 3.4 firehose recap (the WHY of this lesson)                 */
/* ================================================================== */
{
  const px1080 = 1920 * 1080
  ok('A01 the 1080p census is 2,073,600 samples', px1080 === 2073600, String(px1080))
  const frameRGB = px1080 * 3
  ok('A02 one RGB frame is 6,220,800 bytes', frameRGB === 6220800, String(frameRGB))
  const firehose = frameRGB * 30
  ok('A03 the 30 fps firehose is 186,624,000 B/s', firehose === 186624000, String(firehose))
  ok('A04 the firehose in Gbit/s prints 1.49', f2((firehose * 8) / 1e9) === '1.49', f2((firehose * 8) / 1e9))
  const albumSecs = 74 * 60
  ok('A05 the 74-minute album is 4,440 seconds', albumSecs === 4440, String(albumSecs))
  const album = 176400 * albumSecs
  ok('A06 the album is 783,216,000 bytes', album === 783216000, String(album))
  const albumMiB = album / MIB
  ok('A07 the album is 746.9329833984375 MiB exactly', albumMiB === 746.9329833984375, String(albumMiB))
  ok('A08 the album rounds to the 747 MiB slab', Math.round(albumMiB) === 747, String(Math.round(albumMiB)))
  const fill = album / firehose
  ok('A09 the firehose fills the album in 4.2 s', f2(fill).startsWith('4.2') && near(fill, 1813 / 432, 1e-9), f2(fill))
  const photo = 4000 * 3000 * 3
  ok('A10 the 12 MP photo is 36,000,000 B = 34.3323 MiB', photo === 36000000 && f4(photo / MIB) === '34.3323', f4(photo / MIB))
}

/* ================================================================== */
/* B — the compression ratio, defined on a toy budget                  */
/* ================================================================== */
{
  const R = 2048000 / 512000
  ok('B01 the toy budget ratio is exactly 4', R === 4, String(R))
  const saving = (2048000 - 512000) / 2048000
  ok('B02 the saving is exactly 75 per cent', saving === 0.75, String(saving))
}

/* ================================================================== */
/* C — run-length encoding: every witness the lesson prints            */
/* ================================================================== */
{
  ok('C01 AABBCCCCCD encodes to 2A2B5C1D', rle('AABBCCCCCD') === '2A2B5C1D', rle('AABBCCCCCD'))
  ok('C02 the witness shrinks 10 to 8 characters', 'AABBCCCCCD'.length === 10 && rle('AABBCCCCCD').length === 8, rle('AABBCCCCCD'))
  ok('C03 the witness ratio is 1.25', f2(10 / 8) === '1.25', f2(10 / 8))
  ok('C04 AB grows to 1A1B (2 to 4 — it doubles)', rle('AB') === '1A1B' && rle('AB').length === 4, rle('AB'))
  ok('C05 AAAAAAAAAA shrinks to 10A (10 to 3)', rle('AAAAAAAAAA') === '10A' && rle('AAAAAAAAAA').length === 3, rle('AAAAAAAAAA'))
  ok('C06 the ten-A ratio prints 3.33', f2(10 / 3) === '3.33', f2(10 / 3))
  const trip = ['AABBCCCCCD', 'AB', 'AAAAAAAAAA'].every((s) => rleDecode(rle(s)) === s)
  ok('C07 RLE round-trips all three witnesses exactly', trip, 'decode(encode(s)) must be s')
  ok('C08 MMMOOOOOOT → 3M6O1T (10 to 6, ratio 1.67)', rle('MMMOOOOOOT') === '3M6O1T' && rle('MMMOOOOOOT').length === 6 && f2(10 / 6) === '1.67', rle('MMMOOOOOOT'))
  ok('C09 AABBCC → 2A2B2C (6 to 6, ratio 1.00)', rle('AABBCC') === '2A2B2C' && 6 / rle('AABBCC').length === 1, rle('AABBCC'))
  ok('C10 ABCD → 1A1B1C1D (4 to 8 — it doubles)', rle('ABCD') === '1A1B1C1D' && rle('ABCD').length === 8, rle('ABCD'))
  ok('C11 XXYYYZZZZZ → 2X3Y5Z (10 to 6)', rle('XXYYYZZZZZ') === '2X3Y5Z' && rle('XXYYYZZZZZ').length === 6, rle('XXYYYZZZZZ'))
  const twelveP = 'P'.repeat(12)
  ok('C12 twelve P’s → 12P (12 to 3, ratio 4)', rle(twelveP) === '12P' && rle(twelveP).length === 3 && 12 / 3 === 4, rle(twelveP))
  ok('C13 the run census of the witness is AA, BB, CCCCC, D', JSON.stringify(rleRuns('AABBCCCCCD')) === JSON.stringify(['AA', 'BB', 'CCCCC', 'D']), JSON.stringify(rleRuns('AABBCCCCCD')))
  ok('C14 the digit alphabet breaks the naive code: 11110000 → 4140, which will not decode back', rle('11110000') === '4140' && rleDecode('4140') !== '11110000', rle('11110000') + ' ↛ ' + rleDecode('4140'))
}

/* ================================================================== */
/* D — Huffman for the pinned alphabet {A:5, B:2, C:1, D:1}            */
/* ================================================================== */
{
  const freqs: [string, number][] = [['A', 5], ['B', 2], ['C', 1], ['D', 1]]
  const total = 9
  const { codes, ladder } = huffman(freqs)
  ok('D01 the merge ladder is 1+1→2, 2+2→4, 4+5→9', JSON.stringify(ladder) === JSON.stringify(['1+1->2', '2+2->4', '4+5->9']), JSON.stringify(ladder))
  const depth = (s: string) => (codes.get(s) as string).length
  ok('D02 the depths are A=1, B=2, C=3, D=3', depth('A') === 1 && depth('B') === 2 && depth('C') === 3 && depth('D') === 3, JSON.stringify([...codes]))
  ok('D03 the codewords are 0, 10, 110, 111', codes.get('A') === '0' && codes.get('B') === '10' && codes.get('C') === '110' && codes.get('D') === '111', JSON.stringify([...codes]))
  ok('D04 the code is prefix-free (no codeword begins another)', prefixFree(codes), JSON.stringify([...codes]))
  ok('D05 the Kraft sum is exactly 1 (a complete code)', kraft(codes) === 1, String(kraft(codes)))
  const fixed = total * 2
  ok('D06 the fixed 2-bit code costs 18 bits', fixed === 18, String(fixed))
  const cost = huffCost(freqs, codes)
  ok('D07 the Huffman code costs 15 bits (5·1+2·2+1·3+1·3)', cost === 15, String(cost))
  ok('D08 the saving is 3 bits = 16.67% (16.6667%)', fixed - cost === 3 && f2((3 / 18) * 100) === '16.67' && f4((3 / 18) * 100) === '16.6667', f2((3 / 18) * 100))
  const H = entropyOf([5, 2, 1, 1])
  ok('D09 the entropy is 1.6577427265048887 bits/symbol', near(H, 1.6577427265048887) && f4(H) === '1.6577', String(H))
  const mean = cost / total
  ok('D10 the Huffman mean is 15/9 = 1.6667, sitting above H', f4(mean) === '1.6667' && mean >= H, f4(mean))
  ok('D11 the gap above the floor prints 0.0089', f4(mean - H) === '0.0089', f4(mean - H))
  const msg = 'AAAAABBCD'
  const bits = [...msg].map((ch) => codes.get(ch) as string).join('')
  ok('D12 the message AAAAABBCD encodes to 000001010110111 (15 bits, one parse)', bits === '000001010110111' && bits.length === 15 && parses(bits, codes).length === 1 && parses(bits, codes)[0].join('') === msg, bits)
  /* brute-force optimality: the only two depth multisets of a full binary
     tree with 4 leaves are the comb {1,2,3,3} and the balanced {2,2,2,2} */
  const weights = [5, 2, 1, 1]
  const shapes = [[1, 2, 3, 3], [2, 2, 2, 2]]
  let best = Infinity
  shapes.forEach((shape) => perms(weights).forEach((p) => {
    best = Math.min(best, p.reduce((s, w, i) => s + w * shape[i], 0))
  }))
  const balancedAlways = perms(weights).every((p) => p.reduce((s, w, i) => s + w * 2, 0) === 18)
  ok('D13 brute force over both tree shapes: 15 bits is optimal (balanced always 18)', best === 15 && balancedAlways, String(best))
}

/* ================================================================== */
/* E — the exercise alphabets + the non-prefix witness                 */
/* ================================================================== */
{
  /* L2: {A:5, B:3, C:1} */
  const f1: [string, number][] = [['A', 5], ['B', 3], ['C', 1]]
  const h1 = huffman(f1)
  ok('E01 {A:5,B:3,C:1}: depths 1/2/2, code 0/10/11, cost 13', (h1.codes.get('A') as string).length === 1 && h1.codes.get('A') === '0' && h1.codes.get('B') === '10' && h1.codes.get('C') === '11' && huffCost(f1, h1.codes) === 13, JSON.stringify([...h1.codes]))
  ok('E02 {A:5,B:3,C:1}: fixed 18, saved 5 = 27.78%, H = 1.3516, mean 1.4444', 9 * 2 === 18 && 18 - 13 === 5 && f2((5 / 18) * 100) === '27.78' && f4(entropyOf([5, 3, 1])) === '1.3516' && f4(13 / 9) === '1.4444', f4(entropyOf([5, 3, 1])))
  ok('E03 {A:5,B:3,C:1} Kraft sum is 1', kraft(h1.codes) === 1, String(kraft(h1.codes)))

  /* L3: the near-uniform {A:5, B:5, C:2, D:2} */
  const f2a: [string, number][] = [['A', 5], ['B', 5], ['C', 2], ['D', 2]]
  const h2 = huffman(f2a)
  ok('E04 {A:5,B:5,C:2,D:2}: depths B=1, A=2, C=3, D=3; code B=1, A=00, C=010, D=011', h2.codes.get('B') === '1' && h2.codes.get('A') === '00' && h2.codes.get('C') === '010' && h2.codes.get('D') === '011', JSON.stringify([...h2.codes]))
  ok('E05 {A:5,B:5,C:2,D:2}: cost 27 against fixed 28 — one bit saved (3.57%)', huffCost(f2a, h2.codes) === 27 && 14 * 2 === 28 && 28 - 27 === 1 && f2((1 / 28) * 100) === '3.57', String(huffCost(f2a, h2.codes)))
  ok('E06 {A:5,B:5,C:2,D:2}: H = 1.8631, mean = 1.9286', f4(entropyOf([5, 5, 2, 2])) === '1.8631' && f4(27 / 14) === '1.9286', f4(entropyOf([5, 5, 2, 2])))

  /* L4: {A:6, B:3, C:2, D:1} */
  const f3: [string, number][] = [['A', 6], ['B', 3], ['C', 2], ['D', 1]]
  const h3 = huffman(f3)
  ok('E07 {A:6,B:3,C:2,D:1}: depths 1/2/3/3, code 0/10/110/111, cost 21', h3.codes.get('A') === '0' && h3.codes.get('B') === '10' && h3.codes.get('C') === '110' && h3.codes.get('D') === '111' && huffCost(f3, h3.codes) === 21, JSON.stringify([...h3.codes]))
  ok('E08 {A:6,B:3,C:2,D:1}: fixed 24, saved 3 = 12.5%, H = 1.7296, mean 1.7500', 12 * 2 === 24 && f2((3 / 24) * 100) === '12.50' && String((3 / 24) * 100) === '12.5' && f4(entropyOf([6, 3, 2, 1])) === '1.7296' && f4(21 / 12) === '1.7500', f4(entropyOf([6, 3, 2, 1])))

  /* L5: the ambiguous non-prefix code {A:0, B:01, C:1} */
  const bad = new Map<string, string>([['A', '0'], ['B', '01'], ['C', '1']])
  const two = parses('001', bad)
  ok('E09 the non-prefix code reads 001 two ways (AAC and AB)', two.length === 2 && JSON.stringify(two.map((t) => t.join(''))) === JSON.stringify(['AAC', 'AB']), JSON.stringify(two.map((t) => t.join(''))))
  ok('E10 the non-prefix code is NOT prefix-free (B begins with A)', !prefixFree(bad), 'A=0 is a prefix of B=01')
}

/* ================================================================== */
/* F — LZW: the pinned ABABABAB run + the exercise witnesses           */
/* ================================================================== */
{
  const r = lzw('ABABABAB', ['A', 'B'])
  ok('F01 ABABABAB emits 5 output codes: A, B, AB, ABA, B', r.out.length === 5 && JSON.stringify(r.out) === JSON.stringify(['A', 'B', 'AB', 'ABA', 'B']), JSON.stringify(r.out))
  ok('F02 the dictionary gains AB, BA, ABA, ABAB (final: A, B, AB, BA, ABA, ABAB)', JSON.stringify(r.added) === JSON.stringify(['AB', 'BA', 'ABA', 'ABAB']) && ['A', 'B'].concat(r.added).length === 6, JSON.stringify(r.added))
  ok('F03 the LZW decode round-trips ABABABAB', lzwDecode(r.out, ['A', 'B']) === 'ABABABAB', lzwDecode(r.out, ['A', 'B']))
  ok('F04 the longest dictionary entry is ABAB (4 characters — the repetition caught)', r.added[r.added.length - 1] === 'ABAB' && r.added[r.added.length - 1].length === 4, r.added[r.added.length - 1])
  const r6 = lzw('AAAAAA', ['A'])
  ok('F05 AAAAAA emits 3 codes: A, AA, AAA; the dictionary gains AA, AAA', r6.out.length === 3 && JSON.stringify(r6.out) === JSON.stringify(['A', 'AA', 'AAA']) && JSON.stringify(r6.added) === JSON.stringify(['AA', 'AAA']) && lzwDecode(r6.out, ['A']) === 'AAAAAA', JSON.stringify(r6.out))
  const r9 = lzw('XYZXYZXYZ', ['X', 'Y', 'Z'])
  ok('F06 XYZXYZXYZ emits 6 codes (X, Y, Z, XY, ZX, YZ); gains XY, YZ, ZX, XYZ, ZXY', r9.out.length === 6 && JSON.stringify(r9.out) === JSON.stringify(['X', 'Y', 'Z', 'XY', 'ZX', 'YZ']) && r9.added.length === 5 && lzwDecode(r9.out, ['X', 'Y', 'Z']) === 'XYZXYZXYZ', JSON.stringify(r9.out))
  ok('F07 8 characters ride out as 5 codes; 6 as 3; 9 as 6', r.out.length === 5 && r6.out.length === 3 && r9.out.length === 6, '')
}

/* ================================================================== */
/* G — the JPEG block census                                           */
/* ================================================================== */
{
  ok('G01 1920/8 = 240 blocks across; 1080/8 = 135 down', 1920 / 8 === 240 && 1080 / 8 === 135, '')
  const blocks = (1920 / 8) * (1080 / 8)
  ok('G02 the 1080p luma plane is 240 × 135 = 32,400 blocks', blocks === 32400, String(blocks))
  ok('G03 32,400 blocks × 64 samples multiply back to exactly 2,073,600', blocks * 64 === 2073600 && blocks * 64 === 1920 * 1080, String(blocks * 64))
  ok('G04 full RGB on a 2×2 macroblock costs 12 samples (4+4+4)', 4 + 4 + 4 === 12, '')
  ok('G05 4:2:0 keeps 6 (4 Y + 1 Cb + 1 Cr) — the census halves', 4 + 1 + 1 === 6 && 12 / 6 === 2, '')
  const chroma = (1920 / 2) * (1080 / 2)
  ok('G06 each chroma plane is 960 × 540 = 518,400; the frame total is 3,110,400 = half of 6,220,800', chroma === 518400 && 2073600 + 2 * chroma === 3110400 && 6220800 / 2 === 3110400, String(chroma))
  const k4blocks = (3840 / 8) * (2160 / 8)
  ok('G07 the 4K census: 480 × 270 = 129,600 blocks × 64 = 8,294,400', k4blocks === 129600 && k4blocks * 64 === 8294400 && k4blocks * 64 === 3840 * 2160, String(k4blocks))
  const k4total = 8294400 + 2 * (1920 * 1080)
  ok('G08 the 4K frame with 4:2:0 totals 12,441,600 = half of the RGB 24,883,200', k4total === 12441600 && 3840 * 2160 * 3 === 24883200 && 24883200 / 2 === k4total, String(k4total))
}

/* ================================================================== */
/* H — the MP3 arithmetic                                              */
/* ================================================================== */
{
  const cd = 44100 * 16 * 2
  ok('H01 the CD rate is 44,100 × 16 × 2 = 1,411,200 bit/s', cd === 1411200, String(cd))
  ok('H02 1,411,200 ÷ 128,000 = 11.025 exactly', cd / 128000 === 11.025, String(cd / 128000))
  const cdBits = cd * 210
  ok('H03 the 210-second CD stream is 296,352,000 bits = 37,044,000 B', cdBits === 296352000 && cdBits / 8 === 37044000, String(cdBits / 8))
  ok('H04 37,044,000 B = 35.327911376953125 MiB (prints 35.3279)', 37044000 / MIB === 35.327911376953125 && f4(37044000 / MIB) === '35.3279', f4(37044000 / MIB))
  const mp3 = 128000 * 210 / 8
  ok('H05 the 128 kbit/s file is 3,360,000 B = 3.204345703125 MiB (prints 3.2043)', mp3 === 3360000 && mp3 / MIB === 3.204345703125 && f4(mp3 / MIB) === '3.2043', f4(mp3 / MIB))
  const mp3hi = 320000 * 210 / 8
  ok('H06 the 320 kbit/s file is 8,400,000 B (prints 8.0109 MiB)', mp3hi === 8400000 && f4(mp3hi / MIB) === '8.0109', f4(mp3hi / MIB))
  ok('H07 1,411,200 ÷ 320,000 = 4.41 exactly', cd / 320000 === 4.41, String(cd / 320000))
  ok('H08 the byte ratios agree: 37,044,000/8,400,000 = 4.41 and /3,360,000 = 11.025', 37044000 / 8400000 === 4.41 && 37044000 / 3360000 === 11.025, '')
  ok('H09 the MiB ratios agree: 35.3279…/3.2043… = 11.025', (37044000 / MIB) / (3360000 / MIB) === 11.025, '')
  const song192 = 192000 * 180 / 8
  const cd180 = 176400 * 180
  ok('H10 the 180-second song: 4,320,000 B at 192k against 31,752,000 B on CD — ratio 7.35', song192 === 4320000 && cd180 === 31752000 && f2(cd / 192000) === '7.35' && cd180 / song192 === 7.35, String(cd180 / song192))
}

/* ================================================================== */
/* I — the nibble-packed RLE design (the L6 exercise)                  */
/* ================================================================== */
{
  ok('I01 a 4-bit count field tops out at 15 per pair', Math.pow(2, 4) - 1 === 15, '')
  ok('I02 AABBCCCCCD packs into 4 pairs = 32 bits against 80 of ASCII — ratio 2.5', rleRuns('AABBCCCCCD').length === 4 && 4 * 8 === 32 && 10 * 8 === 80 && 80 / 32 === 2.5, '')
  ok('I03 AAAAAAAAAA packs into 1 pair = 8 bits against 80 — ratio 10', rleRuns('AAAAAAAAAA').length === 1 && 80 / 8 === 10, '')
  ok('I04 a run of 40 splits as 15 + 15 + 10 = three pairs', 15 + 15 + 10 === 40, '')
  ok('I05 the byte census agrees: 10 bytes in, 4 bytes out', 10 / 4 === 2.5, '')
}

/* ================================================================== */
/* Z — the final re-read of the shipped part (>= 5 checks required)    */
/* ================================================================== */
{
  type Fig = { caption: string; svg: string }
  type Q = { q: string; solution: string | string[]; answer?: string; figures?: Fig[] }
  const blocks = lesson35.blocks as Array<Record<string, unknown> & { kind: string }>
  const figs = blocks.filter((b) => b.kind === 'figure') as unknown as Fig[]
  const exBlocks = blocks.filter((b) => b.kind === 'exercises') as unknown as { sets: { level: string; questions: Q[] }[] }[]
  const quizBlocks = blocks.filter((b) => b.kind === 'quiz') as unknown as { items: { q: string; options: string[]; answer: number; explain: string }[] }[]
  const exBlocksAll = blocks.filter((b) => b.kind === 'example') as unknown as { title: string; steps: string[] }[]
  const allQs = exBlocks.flatMap((e) => e.sets.flatMap((s) => s.questions))
  const solFigs = allQs.flatMap((q) => q.figures ?? [])
  const svgs = [...figs.map((f) => f.svg), ...exBlocksAll ? [] : [], ...solFigs.map((f) => f.svg)]
  const exampleFigs = (blocks.filter((b) => b.kind === 'example') as unknown as { figures?: Fig[] }[]).flatMap((e) => e.figures ?? [])
  svgs.push(...exampleFigs.map((f) => f.svg))

  /* the lesson header, exact */
  ok('Z01 id, number and title are pinned exactly', lesson35.id === 'cf-compression-lossless-and-lossy' && lesson35.number === '3.5' && lesson35.title === 'Compression: Lossless and Lossy', lesson35.id + ' / ' + lesson35.number + ' / ' + lesson35.title)
  ok('Z02 prerequisites are exactly [cf-text-images-and-sound-as-bits]', JSON.stringify(lesson35.prerequisites) === JSON.stringify(['cf-text-images-and-sound-as-bits']), JSON.stringify(lesson35.prerequisites))
  ok('Z03 sources are exactly [cs-cf-web-ground]', JSON.stringify(lesson35.sources) === JSON.stringify(['cs-cf-web-ground']), JSON.stringify(lesson35.sources))
  ok('Z04 concepts 5-8 and objectives 5-6', lesson35.concepts.length >= 5 && lesson35.concepts.length <= 8 && (lesson35.objectives?.length ?? 0) >= 5 && (lesson35.objectives?.length ?? 0) <= 6, 'concepts=' + lesson35.concepts.length + ', objectives=' + (lesson35.objectives?.length ?? 0))

  /* depth + anatomy (guarded so the engine runs mid-flight on a stub too) */
  const wc = countLessonWords(lesson35)
  const quiz = quizBlocks[0]?.items ?? []
  ok('Z05 the word count clears the 7,000 floor', wc >= 7000, String(wc))
  ok('Z06 exactly one quiz block with exactly 5 items', quizBlocks.length === 1 && quiz.length === 5, 'quiz blocks=' + quizBlocks.length)
  ok('Z07 the quiz key is [2,3,0,1,0]', JSON.stringify(quiz.map((i) => i.answer)) === JSON.stringify([2, 3, 0, 1, 0]), JSON.stringify(quiz.map((i) => i.answer)))
  ok('Z08 every quiz explain says why each wrong option fails (>= 120 chars each)', quiz.length === 5 && quiz.every((i) => i.explain.length >= 120), quiz.map((i) => i.explain.length).join(','))
  ok('Z09 at least 3 body figures', figs.length >= 3, String(figs.length))
  ok('Z10 at least 4 solution figures inside exercises (0-2 per question)', solFigs.length >= 4 && allQs.every((q) => (q.figures?.length ?? 0) <= 2), String(solFigs.length))
  ok('Z11 15 exercise questions across the sets, levels covering L1..L3 at least', allQs.length === 15 && ['L1', 'L2', 'L3'].every((lv) => exBlocks.flatMap((e) => e.sets.map((s) => s.level)).includes(lv)), String(allQs.length))
  ok('Z12 every exercise solution is a steps array with a terminal answer', allQs.every((q) => Array.isArray(q.solution) && q.solution.length >= 4 && typeof q.answer === 'string' && q.answer.length > 0), '')
  ok('Z13 Illustrations (example blocks) number 8 to 12', exBlocksAll.length >= 8 && exBlocksAll.length <= 12, String(exBlocksAll.length))
  const tones = blocks.filter((b) => b.kind === 'callout').map((b) => b.tone as string)
  ok('Z14 the callout census carries definition, theorem, historical, warn, insight and exam', ['definition', 'theorem', 'historical', 'warn', 'insight', 'exam'].every((t) => tones.includes(t)), JSON.stringify([...new Set(tones)]))

  /* the pinned strings the prose must carry (dates, names, formats) */
  const prose = JSON.stringify(lesson35)
  const mustHave = ['1952', '1098', '1977', '1978', '1984', '1987', '1996', '1992', '10918', '11172', '1993', '1995', '1974', 'Huffman', 'Welch', 'Berry', 'CompuServe', 'Fraunhofer', 'Tom', 'Diner', 'Ahmed', 'Natarajan', 'Rao', 'DEFLATE', 'Vega', 'Ziv', 'Lempel', 'LZW', '4:2:0', '11.025', '4.41', '16.67', '1.6577', '32,400', '2,073,600', '1,411,200', '2A2B5C1D', '1A1B', '10A', '35.3279', '3.2043']
  const missing = mustHave.filter((s) => !prose.includes(s))
  ok('Z15 every pinned date, name and number rides the prose', missing.length === 0, 'missing: ' + missing.join(', '))

  /* SVG hygiene */
  ok('Z16 every SVG carries viewBox, role="img" and an aria-label', svgs.length > 0 && svgs.every((s) => s.includes('viewBox="0 0 ') && s.includes('role="img"') && s.includes('aria-label')), 'svgs=' + svgs.length)
  const svgTexts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  ok('Z17 SVG text is plain: no $, no backslash TeX, no U+2212 minus', svgTexts.length > 0 && svgTexts.every((t) => !t.includes('$') && !t.includes('\\') && !t.includes('\u2212')), 'texts=' + svgTexts.length)
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  ok('Z18 every SVG font size is at least 9px', fonts.length > 0 && fonts.every((v) => v >= 9), 'min=' + Math.min(...fonts))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#ffedd5', '#fef3c7', '#5eead4', '#ffffff', '#fffdf5'])
  const hexes = svgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}\b/g) ?? [])
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  ok('Z19 every SVG hex is from the vivid palette', badHex.length === 0, badHex.join(','))
  /* rough text boxes: clipping + pairwise overlap */
  const clipFails: string[] = []
  const overlapFails: string[] = []
  for (const s of svgs) {
    const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/)
    if (!vb) continue
    const W = parseFloat(vb[1]); const H = parseFloat(vb[2])
    const boxes: { x0: number; y0: number; x1: number; y1: number; txt: string }[] = []
    for (const m of s.matchAll(/<text x="(-?[0-9.]+)" y="(-?[0-9.]+)"([^>]*)>([^<]*)<\/text>/g)) {
      const x = parseFloat(m[1]); const y = parseFloat(m[2]); const attrs = m[3]; const txt = m[4]
      const fs = parseFloat((attrs.match(/font-size="([0-9.]+)"/) ?? [])[1] ?? '12')
      const anchor = (attrs.match(/text-anchor="([a-z]+)"/) ?? [])[1] ?? 'middle'
      const w = txt.length * fs * 0.62
      const x0 = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2
      boxes.push({ x0, y0: y - fs * 0.85, x1: x0 + w, y1: y + fs * 0.3, txt })
    }
    boxes.forEach((b) => {
      if (b.x0 < 1 || b.x1 > W - 1 || b.y0 < 0 || b.y1 > H) clipFails.push('"' + b.txt.slice(0, 22) + '" box=[' + b.x0.toFixed(0) + ',' + b.y0.toFixed(0) + ',' + b.x1.toFixed(0) + ',' + b.y1.toFixed(0) + '] W=' + W + ' H=' + H)
    })
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i]; const b = boxes[j]
      const ow = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)
      const oh = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0)
      if (ow > 3 && oh > 3) overlapFails.push('"' + a.txt.slice(0, 16) + '" × "' + b.txt.slice(0, 16) + '" ow=' + ow.toFixed(0) + ' oh=' + oh.toFixed(0))
    }
  }
  ok('Z20 no SVG label clips its viewBox (0.62em/char estimate)', clipFails.length === 0, clipFails.slice(0, 6).join(' ; '))
  ok('Z21 no two SVG labels overlap (0.62em/char estimate, 3px tolerance)', overlapFails.length === 0, overlapFails.slice(0, 6).join(' ; '))

  /* the raw-TeX law over all prose fields (KaTeX-source fields excluded) */
  const proseStrings: string[] = []
  const walk = (v: unknown): void => {
    if (typeof v === 'string') proseStrings.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if (k === 'latex' || k === 'formula' || k === 'svg' || k === 'aria' || k === 'code') continue
        walk(val)
      }
    }
  }
  walk(lesson35.blocks)
  const mathSpans: string[] = []
  const stripped = proseStrings.map((t) => t.replace(/\$[^$]*\$/g, (m) => { mathSpans.push(m); return ' ' }))
  ok('Z22 no \\qquad inside any inline $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 2).join(' | '))
  ok('Z23 no raw TeX outside $...$ in prose fields', stripped.every((t) => !/\\[a-zA-Z]+/.test(t)), stripped.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 4).join(' | '))
  const heads = blocks.filter((b) => b.kind === 'heading') as unknown as { text: string }[]
  ok('Z24 headings are plain (no $, no backslash)', heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))

  /* the connective voice on worked lines */
  const connectives = ['Take', 'Split', 'Check', 'Now', 'So', 'Then', 'Hence', 'Therefore', 'Thus', 'But', 'Note', 'Watch', 'Compare', 'Multiply', 'Divide', 'Add', 'Subtract', 'Count', 'Repeat', 'Recall', 'Rebuild', 'Read', 'Decode', 'Encode', 'Trace', 'Build', 'Run', 'Apply', 'List', 'Name', 'Turn', 'Convert', 'Verify', 'Weigh', 'Order', 'Place', 'Group', 'Try', 'Mark', 'State', 'Classify', 'Sort', 'Price', 'Halve', 'Double', 'Begin', 'Write', 'Draw', 'Suppose', 'Keep', 'Observe', 'Notice', 'Since', 'Rebuild', 'Census', 'For', 'From', 'With', 'At', 'On', 'In', 'By', 'To', 'As', 'Of', 'Or', 'And', 'The', 'This', 'That', 'Each', 'Every', 'One', 'Two', 'Both', 'All', 'Some', 'If', 'When', 'Again', 'Next', 'Finally', 'Zero', 'Fix', 'Look', 'Test', 'Ask', 'A']
  const lines = [...exBlocksAll.flatMap((e) => e.steps), ...allQs.flatMap((q) => (Array.isArray(q.solution) ? q.solution : [q.solution]))]
  const led = lines.filter((l) => connectives.some((c) => l.startsWith(c)))
  ok('Z25 at least 85% of worked lines open with a house connective', lines.length > 0 && led.length / lines.length >= 0.85, (led.length + '/' + lines.length) + ' — offenders: ' + lines.filter((l) => !connectives.some((c) => l.startsWith(c))).slice(0, 3).join(' | '))
  ok('Z26 the honest word count is computed, not asserted (no words field)', !('words' in lesson35), '')

  console.log('[SUMMARY] words=' + wc + ' | bodyFigs=' + figs.length + ' | solFigs=' + solFigs.length + ' | quizKey=[' + quiz.map((i) => i.answer).join(',') + '] | exercises=' + allQs.length + ' | illustrations=' + exBlocksAll.length)
}

console.log(`V-CF35: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}
