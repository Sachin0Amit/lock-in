import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 9: Numeration Through History
 *
 * LESSONS WRITTEN: 9.1 Tallies, Groupings and Additive Systems (run 62)
 *                  9.2 Place Value Before Its Time: Babylon and Mesoamerica (run 62)
 *                  9.3 The Indian Decimal Revolution and Zero (planned, run 63)
 * References for this unit: OpenStax Contemporary Mathematics §4.2 (the
 * early-numeration map — cited, never reproduced) + Knuth TAOCP v2 §4.1
 * (the positional charter, carried from ch. 3) — see
 * docs/project/SOURCE_LOG.md. New web-checked citation keys (run 62):
 * egyptian-hieroglyphic-numerals, ishango-bone, roman-numerals (9.1);
 * babylonian-sexagesimal-numerals, ybc-7289, plimpton-322,
 * maya-numerals-long-count (9.2). All arithmetic pre-verified by
 * scripts/verify-book2-ch09.ts (sections A–N + K/L, 218 checks, ALL GREEN
 * before writing; fourteen pre-writing defects caught — the doubling-pick
 * row filter, the author's own hand-typed Roman lengths (999,999 takes
 * 1,005 M-repeats, not the guessed 11), 7,259 = ⟨2,0,59⟩ not ⟨2,5,59⟩,
 * the YBC error sign, the regular-number counts 34/15, and more — the
 * script, not memory, is the source of truth). Exposition original.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (9.1): the compression ladder — the same count 3,027 named */
/* three ways. Rows at y = 70 (strokes), 155 (hieroglyphs), 240        */
/* (digits); right-margin counters at x = 575. The 12-glyph run:       */
/*   3 lotus (26px) + 2 coil (26px) + 2 heel (24px) + 7 strokes (10px) */
/* with 10px gaps and 14px group gaps — ends at x = 478 < 560          */
/* (verify-book2-ch09.ts section M).                                   */
/* ------------------------------------------------------------------ */
const CL_ROW_Y = [70, 155, 240]

/** one stylized hieroglyph at (x, y): stroke | heel-bone | coil | lotus */
function hieroglyph(kind: 'stroke' | 'heel' | 'coil' | 'lotus', x: number, y: number): string {
  if (kind === 'stroke') {
    return `<line x1="${x}" y1="${y - 13}" x2="${x}" y2="${y + 13}" stroke="#1f5c4d" stroke-width="2" stroke-linecap="round"/>`
  }
  if (kind === 'heel') {
    return `<path d="M ${x - 11} ${y + 9} L ${x - 11} ${y + 2} A 11 11 0 0 1 ${x + 11} ${y + 2} L ${x + 11} ${y + 9}" fill="none" stroke="#1f5c4d" stroke-width="2" stroke-linecap="round"/>`
  }
  if (kind === 'coil') {
    return `<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="#1f5c4d" stroke-width="2"/><circle cx="${x}" cy="${y}" r="3.5" fill="none" stroke="#1f5c4d" stroke-width="1.5"/>`
  }
  // lotus: stem + three petals
  return (
    `<line x1="${x}" y1="${y + 13}" x2="${x}" y2="${y - 2}" stroke="#1f5c4d" stroke-width="2"/>` +
    `<path d="M ${x - 9} ${y + 4} Q ${x - 7} ${y - 12} ${x} ${y - 2} Q ${x + 7} ${y - 12} ${x + 9} ${y + 4}" fill="none" stroke="#1f5c4d" stroke-width="2" stroke-linecap="round"/>`
  )
}

function compressionLadderSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The same count of 3,027 named three ways: 3,027 strokes, a 12-symbol hieroglyph string, and 4 decimal digits">'
  )
  parts.push('<rect x="0" y="0" width="720" height="300" fill="transparent"/>')
  // row 1 — pure strokes: 40 drawn + ellipsis
  const y1 = CL_ROW_Y[0]
  for (let i = 0; i < 40; i++) {
    parts.push(hieroglyph('stroke', 48 + i * 6, y1))
  }
  parts.push(`<text x="296" y="${y1 + 5}" font-size="15" fill="#1f5c4d">…</text>`)
  parts.push(`<text x="48" y="${y1 - 22}" font-size="12" fill="#6b7a72">one stroke per animal — 3,027 of them</text>`)
  parts.push(`<text x="575" y="${y1 + 5}" font-size="14" font-weight="600" fill="#9a6b2f">3,027 strokes</text>`)
  // row 2 — hieroglyphs: 3 lotus + 2 coil + 2 heel + 7 strokes
  const y2 = CL_ROW_Y[1]
  let x = 48
  const run = (kind: 'stroke' | 'heel' | 'coil' | 'lotus', n: number, w: number, label: string) => {
    for (let i = 0; i < n; i++) {
      parts.push(hieroglyph(kind, x, y2))
      x += w + 10
    }
    parts.push(`<text x="${x - (n * (w + 10) - 10) / 2}" y="${y2 + 32}" font-size="11" fill="#6b7a72" text-anchor="middle">${label}</text>`)
    x += 14
  }
  run('lotus', 3, 26, '3 × 1000')
  run('coil', 2, 26, '2 × 100')
  run('heel', 2, 24, '2 × 10')
  run('stroke', 7, 10, '7 × 1')
  parts.push(`<text x="48" y="${y2 - 22}" font-size="12" fill="#6b7a72">hieroglyphs — a symbol per scale, repeated per digit</text>`)
  parts.push(`<text x="575" y="${y2 + 5}" font-size="14" font-weight="600" fill="#9a6b2f">12 symbols</text>`)
  // row 3 — decimal digits in boxes
  const y3 = CL_ROW_Y[2]
  const digits = ['3', '0', '2', '7']
  const places = ['1000', '100', '10', '1']
  digits.forEach((d, i) => {
    const bx = 48 + i * 42
    parts.push(`<rect x="${bx}" y="${y3 - 15}" width="30" height="30" rx="4" fill="none" stroke="#1f5c4d" stroke-width="1.5"/>`)
    parts.push(`<text x="${bx + 15}" y="${y3 + 6}" font-size="16" fill="#123f35" text-anchor="middle" font-weight="600">${d}</text>`)
    parts.push(`<text x="${bx + 15}" y="${y3 + 32}" font-size="11" fill="#6b7a72" text-anchor="middle">${places[i]}</text>`)
  })
  parts.push(`<text x="48" y="${y3 - 26}" font-size="12" fill="#6b7a72">decimal digits — the scale is carried by position</text>`)
  parts.push(`<text x="575" y="${y3 + 5}" font-size="14" font-weight="600" fill="#9a6b2f">4 digits</text>`)
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (9.1): the doubling engine for 23 × 19. Five rows          */
/* (k = 0..4, y = 48..240) with the tick value, the doubled value and  */
/* a pick box; the picked rows are ticks 1, 2, 16 (k = 0, 1, 4) whose  */
/* values 23 + 46 + 368 = 437; the sum line sits at y = 288            */
/* (verify-book2-ch09.ts section M).                                   */
/* ------------------------------------------------------------------ */
const DE_ROWS = [
  { k: 0, y: 48 },
  { k: 1, y: 96 },
  { k: 2, y: 144 },
  { k: 3, y: 192 },
  { k: 4, y: 240 },
]
const DE_PICKED = [0, 1, 4]

function doublingEngineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The doubling engine for 23 times 19: five doubled rows, the pick of ticks 1, 2 and 16, summing to 437">'
  )
  parts.push('<rect x="0" y="0" width="720" height="320" fill="transparent"/>')
  parts.push('<text x="70" y="26" font-size="12" fill="#6b7a72">tick</text>')
  parts.push('<text x="150" y="26" font-size="12" fill="#6b7a72">23 doubled</text>')
  parts.push('<text x="360" y="26" font-size="12" fill="#6b7a72">in the pick for 19?</text>')
  for (const r of DE_ROWS) {
    const tick = Math.pow(2, r.k)
    const val = 23 * tick
    const picked = DE_PICKED.includes(r.k)
    parts.push(
      `<text x="86" y="${r.y + 5}" font-size="14" fill="#123f35" text-anchor="end" font-weight="600">${tick}</text>`
    )
    parts.push(`<line x1="104" y1="${r.y - 12}" x2="104" y2="${r.y + 12}" stroke="#b9c6bd" stroke-width="1.5"/>`)
    parts.push(
      `<text x="150" y="${r.y + 5}" font-size="14" fill="${picked ? '#123f35' : '#6b7a72'}">2${r.k > 0 ? '^' + r.k : ''} · 23 = ${val}</text>`
    )
    parts.push(
      `<rect x="360" y="${r.y - 10}" width="20" height="20" rx="3" fill="${picked ? '#9a6b2f' : 'none'}" stroke="${picked ? '#9a6b2f' : '#b9c6bd'}" stroke-width="1.5"/>`
    )
    if (picked) {
      parts.push(
        `<path d="M 364 ${r.y} L 369 ${r.y + 6} L 377 ${r.y - 6}" fill="none" stroke="#fdf8ef" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`
      )
    }
  }
  parts.push('<line x1="60" y1="266" x2="560" y2="266" stroke="#b9c6bd" stroke-width="1"/>')
  parts.push(
    `<text x="150" y="292" font-size="15" fill="#123f35" font-weight="600">23 + 46 + 368 = 437 = 23 × 19</text>`
  )
  parts.push(
    `<text x="560" y="292" font-size="12" fill="#6b7a72" text-anchor="end">ticks 1 + 2 + 16 = 19</text>`
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 1 (9.2): two place ladders — Babylonian rungs at x = 150,    */
/* y = 300 − 60·log10(v) for v ∈ {1, 60, 3,600}; Mayan rungs at        */
/* x = 470, y = 300 − 45·log10(v) for v ∈ {1, 20, 360, 7,200,          */
/* 144,000}; the 20→360 step highlighted as the calendar's 18-kink     */
/* (verify-book2-ch09.ts section M).                                   */
/* ------------------------------------------------------------------ */
const ladderY = (v: number, scale: number) => 300 - scale * Math.log10(v)
const BAB_RUNGS = [1, 60, 3600]
const MAY_RUNGS = [1, 20, 360, 7200, 144000]
const fmtNum = (v: number) => v.toLocaleString('en-US')

function placeLaddersSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two place ladders: the Babylonian ladder steps by sixty, the Mayan Long Count ladder takes a kink at eighteen times twenty equals 360">'
  )
  parts.push('<text x="150" y="24" font-size="13" fill="#123f35" text-anchor="middle" font-weight="600">Babylon — base 60</text>')
  parts.push('<text x="470" y="24" font-size="13" fill="#123f35" text-anchor="middle" font-weight="600">Maya — Long Count</text>')
  // Babylonian rungs
  for (const v of BAB_RUNGS) {
    const y = ladderY(v, 60)
    parts.push(`<line x1="110" y1="${y.toFixed(1)}" x2="190" y2="${y.toFixed(1)}" stroke="#1f5c4d" stroke-width="2.5"/>`)
    parts.push(`<text x="198" y="${(y + 4).toFixed(1)}" font-size="12.5" fill="#123f35">${fmtNum(v)}</text>`)
  }
  for (let i = 0; i < BAB_RUNGS.length - 1; i++) {
    const yTop = ladderY(BAB_RUNGS[i + 1], 60)
    const yBot = ladderY(BAB_RUNGS[i], 60)
    parts.push(`<line x1="150" y1="${yBot.toFixed(1)}" x2="150" y2="${yTop.toFixed(1)}" stroke="#1f5c4d" stroke-width="1.5"/>`)
    parts.push(`<text x="136" y="${((yTop + yBot) / 2 + 4).toFixed(1)}" font-size="11.5" fill="#6b7a72" text-anchor="end">×60</text>`)
  }
  // Mayan rungs — the 20→360 kink highlighted
  for (const v of MAY_RUNGS) {
    const y = ladderY(v, 45)
    const isKinkTop = v === 360
    parts.push(
      `<line x1="430" y1="${y.toFixed(1)}" x2="510" y2="${y.toFixed(1)}" stroke="${isKinkTop ? '#9a6b2f' : '#1f5c4d'}" stroke-width="${isKinkTop ? 3 : 2.5}"/>`
    )
    parts.push(
      `<text x="518" y="${(y + 4).toFixed(1)}" font-size="12.5" fill="${isKinkTop ? '#9a6b2f' : '#123f35'}" font-weight="${isKinkTop ? '700' : '400'}">${fmtNum(v)}${v === 1 ? ' day' : v === 360 ? ' (tun)' : ''}</text>`
    )
  }
  for (let i = 0; i < MAY_RUNGS.length - 1; i++) {
    const yTop = ladderY(MAY_RUNGS[i + 1], 45)
    const yBot = ladderY(MAY_RUNGS[i], 45)
    const kink = MAY_RUNGS[i + 1] === 360
    parts.push(
      `<line x1="470" y1="${yBot.toFixed(1)}" x2="470" y2="${yTop.toFixed(1)}" stroke="${kink ? '#9a6b2f' : '#1f5c4d'}" stroke-width="${kink ? 2 : 1.5}"/>`
    )
    parts.push(
      `<text x="640" y="${((yTop + yBot) / 2 + 4).toFixed(1)}" font-size="11.5" fill="${kink ? '#9a6b2f' : '#6b7a72'}" text-anchor="end" font-weight="${kink ? '700' : '400'}">×${MAY_RUNGS[i + 1] / MAY_RUNGS[i]}${kink ? ' — the calendar kink' : ''}</text>`
    )
  }
  parts.push(
    `<text x="470" y="326" font-size="11.5" fill="#6b7a72" text-anchor="middle">rung heights on a log scale; the kink = log₁₀ 18 ≈ 1.255</text>`
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (9.2): the YBC 7289 reconstruction — square side 220 px    */
/* (corners (160,50)…(380,270), centre (270,160)), both diagonals,     */
/* the side label 30 at y = 292 and the decimal-comparison row at      */
/* y = 306 (verify-book2-ch09.ts section M).                           */
/* ------------------------------------------------------------------ */
function ybcSquareSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A stylized reconstruction of tablet YBC 7289: a square of side 30, its diagonal 42;25,35, and the diagonal ratio 1;24,51,10, the sexagesimal value of the square root of two">'
  )
  const sq = `<rect x="160" y="50" width="220" height="220" fill="none" stroke="#1f5c4d" stroke-width="2"/>`
  parts.push(sq)
  parts.push('<line x1="160" y1="50" x2="380" y2="270" stroke="#1f5c4d" stroke-width="1.5"/>')
  parts.push('<line x1="380" y1="50" x2="160" y2="270" stroke="#1f5c4d" stroke-width="1.5"/>')
  // the ratio label along the main diagonal, offset perpendicular
  parts.push(
    `<text x="270" y="146" font-size="13" fill="#9a6b2f" font-weight="600" text-anchor="middle" transform="rotate(45 270 160)">1;24,51,10</text>`
  )
  // the side label
  parts.push('<text x="270" y="292" font-size="13" fill="#123f35" text-anchor="middle" font-weight="600">side 30 — diagonal 42;25,35</text>')
  // the decimal comparison row
  parts.push(
    '<text x="270" y="310" font-size="11.5" fill="#6b7a72" text-anchor="middle">1;24,51,10 = 1.41421296…  ·  √2 = 1.41421356…  ·  one part in ≈2.36 million</text>'
  )
  // right annotation column
  parts.push('<text x="480" y="120" font-size="12.5" fill="#123f35">the side: 30</text>')
  parts.push('<text x="480" y="144" font-size="12.5" fill="#123f35">the diagonal: 42;25,35</text>')
  parts.push('<text x="480" y="168" font-size="12.5" fill="#9a6b2f">the ratio: 1;24,51,10</text>')
  parts.push('<text x="480" y="196" font-size="11.5" fill="#6b7a72">a scale-free value — the same</text>')
  parts.push('<text x="480" y="213" font-size="11.5" fill="#6b7a72">string names the diagonal of</text>')
  parts.push('<text x="480" y="230" font-size="11.5" fill="#6b7a72">any square whatever</text>')
  parts.push('</svg>')
  return parts.join('')
}

export const chapter09: Chapter = {
  number: 9,
  slug: 'numeration-through-history',
  title: 'Numeration Through History',
  summary:
    'Five systems, one winner: tally and grouping, the additive symbols of Egypt and Rome (and why they resist arithmetic), the place-value systems that arrived too early — Babylonian base sixty and the Mayan base twenty with their missing-zero costs — and the Indian decimal revolution that made zero a number and carried the world’s arithmetic.',
  status: 'in-progress',
  lessons: [
    {
      id: 'ans-tallies-groupings-and-additive-systems',
      number: '9.1',
      title: 'Tallies, Groupings and Additive Systems',
      prerequisites: ['fm-collecting-and-tallying-data', 'ans-representation-theorem-unique-name', 'ans-converting-between-bases'],
      sources: ['openstax-contemporary-math', 'egyptian-hieroglyphic-numerals', 'ishango-bone', 'roman-numerals'],
      concepts: [
        'Tally marks',
        'One-to-one principle',
        'Five-bar gate',
        'Additive system',
        'Hieroglyphic numerals',
        'Doubling method',
        'Subtractive rule',
        'Digit sum',
      ],
      objectives: [
        'state the one-to-one principle and its bundle-arithmetic repair N = b·⌊N/b⌋ + (N mod b)',
        'encode and read numbers in the Egyptian hieroglyphic and Roman additive systems',
        'prove that the symbol count of an additive numeral is the digit sum, bounded by 9d',
        'run the doubling method for multiplication and prove why the picked rows always sum to the product',
        'argue precisely where additive systems fail against positional naming — and where they do not',
      ],
      blocks: [
        { kind: 'para', text: 'A number lives twice: once in the mind, once in the world. The count of a flock must survive the night, the tally of a harvest must survive the accountant, and neither survives by memory alone. The oldest solution is the most direct one imaginable — carve one mark per thing counted, and let the marks do the remembering. That idea, pushed a little, gives grouping; pushed further, it gives the great additive systems of Egypt and Rome; and its slow failure under arithmetic is what forced the invention this book has been circling since chapter 3 — the positional name. Foundation Mathematics met the tally once already, as a tool for collecting data (lesson fm-collecting-and-tallying-data used the five-bar gate to count survey answers). Here the tally is not a survey tool but the first chapter of a history: the systems people built to *write* numbers, and the exact price each of them paid.' },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The Ishango bone — a tally mind, twenty millennia back',
          text: 'A ten-centimetre baboon fibula with a quartz point affixed to one end, excavated in 1950 at Ishango near Lake Edward (Democratic Republic of the Congo) and dated to roughly 20,000 years ago — a dating that has itself shifted with the volcanically disturbed carbon record of the region. The bone carries 168 notches arranged in three columns, counted by the excavator Jean de Heinzelin as 11, 13, 17, 19 down the left column; 3, 6, 4, 8, 10, 5, 5, 7 down the centre; and 11, 19, 21, 9 down the right — column sums 60, 48 and 60. The left column holds exactly the primes between 10 and 20, and the centre column pairs each of 3, 4 and 5 + 5 with its double. Whether that pattern is early number theory, a lunar calendar, or coincidence is genuinely disputed — one honest objection notes that primes were not *named* until the Greek mathematicians, millennia later. What is not disputed: the marks are deliberate, grouped and ordered. Whatever the carver intended, the artifact is a tally mind at work.',
        },
        { kind: 'heading', text: 'The Tally: One Stroke, One Thing' },
        { kind: 'para', text: 'The principle underneath every tally is **one-to-one correspondence**: pair each counted thing with exactly one mark, and stop when the things run out. Nothing in the scheme requires knowing what "thirty" means — the correspondence itself *is* the number. To check that two flocks are the same size, you do not count either of them; you walk the two stroke-rows side by side and see whether any mark lacks a partner. Comparison, matching and transfer all work this way, which is why the scheme served shepherds, debt-keepers and census-takers for tens of thousands of years.' },
        { kind: 'para', text: 'But read a long tally back and the weakness appears at once. A count of 87 is 87 strokes; a count of 3,027 is 3,027 of them, and nobody can *see* 3,027 in a scratch-mark forest. The first repair is **grouping**: mark off the strokes in fixed bunches. Shepherds close every fourth stroke with a fifth laid across it — the **five-bar gate** — and read the count as *gates and leftovers*. In symbols, a bundle size $b$ splits any count $N$ as' },
        { kind: 'equation', latex: 'N = b\\left\\lfloor \\frac{N}{b} \\right\\rfloor + (N \\bmod b)', note: 'the complete bundle count plus the remainder — read back as bundles × b + singles' },
        { kind: 'para', text: 'so 34 reads as 6 gates and 4 singles ($6 \\times 5 + 4 = 34$), and 87 marked in tens reads as 8 bundles and 7 singles — 15 marks where 87 stood before. The equation looks trivial; it is not. It is the first appearance of the two quantities that will become a quotient and a remainder in chapter 2\'s division algorithm, and the bundle size $b$ is the ancestor of every base this book has converted in chapter 3. Grouping is where base is born.' },
        {
          kind: 'example',
          title: 'Tally 34 shepherds’ marks and 87 census strokes; read each back',
          steps: [
            'Split 34 at the gate size 5: $\\lfloor 34/5 \\rfloor = 6$ complete gates, remainder $34 - 30 = 4$.',
            'So the tally shows 6 five-bar gates and 4 loose strokes.',
            'Read back: $6 \\times 5 + 4 = 34$. The split and its inverse agree.',
            'Now 87 at bundle size 10: $\\lfloor 87/10 \\rfloor = 8$ bundles, remainder 7.',
            'Read back: $8 \\times 10 + 7 = 87$ — 15 marks replacing 87.',
            'Hence grouping compresses a tally by roughly the bundle size, and the leftover discipline is exact.',
          ],
        },
        { kind: 'heading', text: 'Grouping: The First Compression' },
        { kind: 'para', text: 'One round of bundling helps, but the deep move is to *iterate* it — to declare that when the bundle marks themselves pile up, they too get bundled, at the next scale. Ten strokes make a bundle; ten bundles make a super-bundle; and so on upward. A system that does this once per scale with a **new symbol for each scale** is an *additive system*, and the two most famous ones carried the ancient and classical worlds: the Egyptian hieroglyphs and the Roman numerals.' },
        { kind: 'para', text: 'Notice what recursive grouping has already produced. The number of super-bundles, bundles and singles needed to express $N$ is exactly what we would later call the *digits* of $N$ — the count at each scale is the decimal digit of that place. The additive system does not lack digits; it lacks the final compression. It prints every digit **in full**, as that many copies of the scale\'s symbol, instead of printing one digit character and letting its *position* carry the scale. That sentence is the whole story of this chapter, and the next figure makes it visible.' },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The additive system is the digit string, printed in full',
          text: 'Group a count recursively at ten and the digit counts appear at every scale: the number of lotuses, coils, heel-bones and strokes IS the digit string 3-0-2-7 of 3,027. Egyptian writing merely refuses the last step — printing each digit as repeated marks instead of one character scaled by position. Everything additive systems do well traces to being digits-without-position; everything they do badly traces to the same source.',
        },
        { kind: 'heading', text: 'The Additive Family: Egypt and Rome' },
        { kind: 'para', text: 'Egyptian record-keeping from about 3000 BCE used seven hieroglyph classes, one per power of ten up to a million. Any number below 10,000,000 is written by repeating each class as many times as its digit — the order of the symbols is irrelevant, since the value is a plain sum. The full ladder:' },
        {
          kind: 'table',
          caption: 'The Egyptian hieroglyph ladder — seven symbol classes, one per scale',
          head: ['Value', 'Glyph (stylized)', 'Name', 'A count of 3,027 uses'],
          rows: [
            ['1', 'a single stroke |', 'stroke', '7 strokes'],
            ['10', 'cattle hobble ∩', 'heel bone', '2 heel bones'],
            ['100', 'coil of rope', 'coil', '0 coils'],
            ['1,000', 'lotus flower', 'lotus', '3 lotuses'],
            ['10,000', 'pointed finger', 'finger', '—'],
            ['100,000', 'tadpole', 'tadpole', '—'],
            ['1,000,000', 'god with raised arms', 'Heh', '—'],
          ],
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Additive system',
          text: 'A numeration system is said to be **additive** if each symbol carries a fixed value $s_1, s_2, \\dots$ independent of where it stands, and the written string names the sum of its symbols\' values. Thus, $N = \\sum_i a_i s_i$ where $a_i$ is the number of copies of the symbol worth $s_i$ — and no $a_i$ ever exceeds the grouping size (ten for the systems above), because $a_i = 10$ copies would trade up into one copy of the next symbol. Order plays no role: any rearrangement of a hieroglyphic string names the same number.',
        },
        { kind: 'para', text: 'Rome refined the same idea with seven letters — I, V, X, L, C, D, M for 1, 5, 10, 50, 100, 500, 1,000 — a *five–ten* pattern that halves the symbol count at each scale by giving the midpoint its own mark. In its oldest inscriptions Roman writing is purely additive: IIII for 4, VIIII for 9, and the additive habit survives on clock dials to this day, where IIII still outnumbers IV. Later practice added the **subtractive rule**: a smaller symbol before the next larger is *taken away*, giving the six legal pairs IV, IX, XL, XC, CD, CM. Be clear about what this rule is and is not. It is *local*: the order of two neighbours changes the value by one smaller symbol, never by a scale factor. IV is 4 and VI is 6, but that is a two-symbol transaction — nothing like position, which re-prices a digit by a power of the base depending on where it sits.' },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The subtractive rule is not place value',
          text: 'It is tempting to read IV as "positional because order matters". It is not. Position multiplies a digit by a power of the base (chapter 3\'s representation theorem); the Roman rule only permits one smaller symbol to borrow from its immediate neighbour, and only in the six sanctioned pairs. VL for 45 is illegal; XLV is the form. The rule is a compression patch on an additive system, not a place-value seed — and the contrast with lesson 9.2, where order really does price every digit, is the point of meeting it here.',
        },
        { kind: 'para', text: 'The subtractive rule makes Roman strings shorter but does not lift the system\'s ceiling. The largest year numeral in standard use is 3,999 — MMMCMXCIX — because beyond it the rule simply repeats M: a classical Roman writer who needed 999,999 would have penned over a thousand marks (999 M\'s followed by CMXCIX), which is why the *vinculum*, an overline multiplying the covered symbols by 1,000, was pressed into service. A new device for a new scale — the additive inventory growing again, exactly as the Egyptian seven-class ladder grows. And the most famous Roman year of all: 1888, written MDCCCLXXXVIII, thirteen symbols long, the longest year numeral in ordinary use — a good string to read slowly once, additive class by additive class.' },
        {
          kind: 'derivation',
          title: 'The symbol count of an additive numeral',
          statement:
            'In a base-ten additive system (one symbol class per power of ten), the number of symbols needed to write N is the digit sum of N; hence a d-digit number takes at most 9d symbols, with equality exactly when every digit is 9.',
          steps: [
            {
              label: 'Count per scale',
              formula: 'a_i = \\text{the digit of } N \\text{ at scale } 10^i',
              explanation:
                'Recursive grouping at ten means the number of copies of the scale-$10^i$ symbol equals the digit of $N$ in that place — the trade-up rule stops every $a_i$ at 9. So the total symbol count is the sum of the digits.',
            },
            {
              label: 'Bound and equality',
              formula: '\\sum_i a_i \\le 9d, \\quad \\text{equality} \\iff a_i = 9 \\ \\forall i',
              explanation:
                'Each of the $d$ digits contributes at most 9 copies, so the count is at most $9d$, and equality forces every digit to be 9 — the numbers $9, 99, 999, \\dots$ are the per-length worst cases. A script sweep of all $N$ from 1 to 999,999 confirms count = digit sum and the bound with equality only at those anchors.',
            },
            {
              label: 'The raggedness',
              formula: 's(999) = 27 > s(1000) = 1',
              explanation:
                'The count is *not* monotone: 999 prints 27 symbols and 1,000 prints one. Nothing about "bigger number, longer name" holds inside a scale — the cost jumps at the trade-up and collapses after it. Positional naming, by contrast, steps from 3 digits to 4 exactly once per power of ten.',
            },
          ],
          result:
            'An additive numeral costs exactly the digit sum of N — at most 9d symbols for a d-digit number (54 for 999,999), equality at 9…9, and a ragged, scale-jumping cost profile that positional naming never shows.',
        },
        {
          kind: 'example',
          title: 'Write 3,027 in hieroglyphs, and read MDCCCLXXXVIIII back',
          steps: [
            'Digits of 3,027: $3$ thousands, $0$ hundreds, $2$ tens, $7$ units.',
            'So the string is 3 lotuses, 0 coils, 2 heel bones, 7 strokes — $3+0+2+7 = 12$ symbols in all.',
            'Check by the derivation: the symbol count of an additive numeral is the digit sum, $3+0+2+7 = 12$. ✓',
            'Reading the Roman string additively: $M=1000$, $DCCC = 500+300$, $LXXX = 50+30$, $VIIII = 9$.',
            'Total: $1000 + 800 + 80 + 9 = 1{,}889$.',
            'Hence 3,027 prints as a 12-symbol hieroglyph string, and MDCCCLXXXVIIII names 1,889 — the year 1889 in the older additive habit.',
          ],
        },
        { kind: 'heading', text: 'Addition Is Easy — Multiplication Is Not' },
        { kind: 'para', text: 'Now put the notation to work, because a numeration system is not just a naming scheme — it is what the accountant\'s whole arithmetic has to run on. **Addition turns out to be nearly free.** To add two hieroglyphic strings, collect like symbols into one pile per class: the strokes of both numbers in one pile, the heel bones in another, and so on. If a pile holds ten or more, trade ten copies up for one of the next scale. Watch 3,579 + 2,894 run: strokes $9 + 4 = 13$, keep 3, trade 1 heel; heel bones $7 + 9 + 1 = 17$, keep 7, trade 1 coil; coils $5 + 8 + 1 = 14$, keep 4, trade 1 lotus; lotuses $3 + 2 + 1 = 6$. The result reads 6,473 — and the decimal check agrees, $3{,}579 + 2{,}894 = 6{,}473$. When no pile overflows, as in $1{,}234 + 4{,}321 = 5{,}555$, nothing needs trading at all.' },
        { kind: 'para', text: 'That trading is *carrying* — the same bookkeeping a positional column-addition performs, done on piles instead of columns. The additive system carries too; this is worth saying loudly, because "additive" is often imagined as helpless. It is not. Addition and subtraction are native to the notation.' },
        { kind: 'para', text: '**Multiplication is where the notation stalls.** Positional multiplication runs on a finite table — the $10 \\times 10$ digit products — because position lets each digit-product land in the right column automatically. On an unordered additive string there is no column to land in, and no useful table either: "heel bone × heel bone" has no answer inside the notation, since the product\'s scales must be re-collected from scratch every time. The scribes\' workaround, attested across the Egyptian papyri, is the **doubling method**: to compute $n \\times m$, write the successive doublings $n, 2n, 4n, 8n, \\dots$, tick the rows whose tick-values ($1, 2, 4, 8, \\dots$) sum to $m$, and add the ticked rows.' },
        {
          kind: 'derivation',
          title: 'Why the doubling method always computes the product',
          statement:
            'For any naturals n and m with 1 ≤ m, the doubling method returns exactly n·m: the ticked rows are precisely the 1-bits of m (its binary expansion), so the ticked sum is Σ n·2^k over those k, which equals n·m by distributivity.',
          steps: [
            {
              label: 'The pick is a binary expansion',
              formula: 'm = \\sum_{k \\in S} 2^k, \\quad S = \\{k : \\text{bit } k \\text{ of } m \\text{ is } 1\\}',
              explanation:
                'Every natural number is a sum of distinct powers of two — the existence half of chapter 3\'s representation theorem run in base two. Ticking the rows whose ticks sum to $m$ therefore always succeeds, and the ticked set is unique because the binary expansion is.',
            },
            {
              label: 'Factor the sum',
              formula: '\\sum_{k \\in S} n \\cdot 2^k = n \\sum_{k \\in S} 2^k = n \\cdot m',
              explanation:
                'Distributivity pulls the $n$ out of the ticked sum, and the remaining sum is $m$ by the previous step. The method never needs a multiplication table — only doubling (adding a number to itself) and one final addition.',
            },
            {
              label: 'The cost',
              formula: '\\lfloor \\log_2 m \\rfloor + 1 \\text{ rows}',
              explanation:
                'The largest power of two not exceeding $m$ is $2^{\\lfloor \\log_2 m \\rfloor}$, so that many doublings (plus the opening row) suffice — 5 rows for $m = 19$, 6 for $m = 34$. The cost grows logarithmically in the multiplier, which is why the method survived on paper and, much later, inside the multiply hardware of early computers.',
            },
          ],
          result:
            'The doubling method computes n·m for every m, using at most ⌊log₂ m⌋ + 1 doubled rows and one addition — the binary expansion of the multiplier is the pick, and distributivity is the proof.',
        },
        {
          kind: 'example',
          title: 'Compute 23 × 19 by doubling, and check the row count',
          steps: [
            'Rows: $1 \\cdot 23 = 23$, $2 \\cdot 23 = 46$, $4 \\cdot 23 = 92$, $8 \\cdot 23 = 184$, $16 \\cdot 23 = 368$.',
            'Ticks for 19: $19 = 16 + 2 + 1$, so tick rows 1, 2 and 16.',
            'Add the ticked rows: $23 + 46 + 368 = 437$.',
            'Decimal check: $23 \\times 19 = 437$. ✓',
            'Row count: $\\lfloor \\log_2 19 \\rfloor + 1 = 4 + 1 = 5$ — exactly the rows written, no waste.',
            'Hence the answer is 437, reached with doublings and one addition only.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The doubling engine for 23 × 19. Each row doubles the last; the ticked rows are the 1-bits of 19 (ticks 1 + 2 + 16), and their values 23 + 46 + 368 sum to 437. The pick is the multiplier’s binary expansion — no multiplication table is ever consulted.',
          svg: doublingEngineSvg(),
        },
        { kind: 'para', text: 'Roman arithmetic ran the same way with the same limits: XII × XII is twelve additions and a re-collection, landing on CXLIV — workable for the small numbers of an inscription, hopeless for the bookkeeping of an empire\'s grain. And division fares worst of all: the Egyptian scribe divides by re-running doubling on the *divisor* until the pieces can be assembled into the dividend, so even a modest quotient is a small multiplication problem in disguise. The pattern is inescapable: **addition native, multiplication borrowed, division worse** — and every one of the borrowed methods works by sneaking position (or its cousin, the power-of-two ladder) back into a notation that refuses to carry it.' },
        { kind: 'heading', text: 'The Efficiency Verdict' },
        { kind: 'para', text: 'Cost the systems directly: how many marks does each need to name the same numbers? The hieroglyph count is the digit sum; the Roman count (subtractive form) is stingier per digit but hits its classical ceiling at 3,999; the decimal name is the digit count itself. The table reads like a verdict.' },
        {
          kind: 'table',
          caption: 'Symbols needed to name the same number (Roman beyond 3,999 shown as the M-repetition it becomes)',
          head: ['N', 'Hieroglyphs', 'Roman (subtractive)', 'Decimal digits'],
          rows: [
            ['4', '4', '2 (IV)', '1'],
            ['9', '9', '2 (IX)', '1'],
            ['49', '13', '4 (XLIX)', '2'],
            ['99', '18', '4 (XCIX)', '2'],
            ['499', '22', '6 (CDXCIX)', '3'],
            ['999', '27', '6 (CMXCIX)', '3'],
            ['1,999', '28', '7 (MCMXCIX)', '4'],
            ['3,999', '30', '9 (MMMCMXCIX)', '4'],
          ],
        },
        { kind: 'para', text: 'Read the last column against the others. The decimal name grows one digit per power of ten, smoothly and forever. The additive names grow by digit sum — 999 costs 27 hieroglyphs and 1,000 costs one — and they carry a second, quieter cost that no cleverness removes: **the inventory**. Every new scale wants a new symbol class. Seven hieroglyph classes cover up to 999,999; the next scale needs an eighth; the Romans needed a vinculum. The positional system reuses the same ten digits at every scale and never asks for a new mark — the scale is not written at all, it is implied by where the digit stands.' },
        { kind: 'para', text: 'The deepest cost is the one the table cannot show. Because an additive string has no columns, no finite table of digit products can ever power its multiplication — the doubling method works around this, but a workaround that needs a fresh sweep of doublings for every product is not an algorithm you build a computational civilisation on. What arithmetic wanted was a notation in which the scale of a symbol is *read off* its position, so that a memorised $b \\times b$ table plus carrying does everything. That is exactly the machinery chapter 3 proved unique, and the next lesson meets the two civilisations that had it — place value itself — three thousand years before they could use it safely.' },
        {
          kind: 'figure',
          caption:
            'The same count of 3,027 named three ways: 3,027 one-to-one strokes; a 12-symbol hieroglyph string (3 lotuses, 0 coils, 2 heel bones, 7 strokes — glyphs stylized); and 4 decimal digits. Grouping compresses; recursion compresses again; position collapses the whole string into digits whose scales are carried by place. (Counts verified: 3+0+2+7 = 12; digit sum bound 9d.)',
          svg: compressionLadderSvg(),
        },
        {
          kind: 'example',
          title: 'Find the smallest number whose hieroglyph form needs at least 20 symbols',
          steps: [
            'Two-digit numbers cap at $9 + 9 = 18$ symbols (the number 99), so the answer has three digits.',
            'To keep the number small, keep the hundreds digit small and push the sum into the tail: $1 + 9 + 9 = 19$ for 199 — one short.',
            'Next hundreds digit: $2 + 9 + 9 = 20$ for 299.',
            'No number below 299 reaches 20: two-digit numbers cap at 18, and among three-digit numbers 199, 289, 189… all stop at 19 or less (a full sweep confirms 299 is first).',
            'Hence 299 — printing as 2 lotuses, 9 heel bones, 9 strokes — is the smallest 20-symbol hieroglyph number.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'What position actually buys',
          text: 'Three things, each invisible until an additive system shows its lack. A fixed inventory — ten digits reused at every scale, versus Egypt\'s seven classes and Rome\'s vinculum. A direct reading — the name 493 prices each digit by position instantly, versus summing a hieroglyph pile. And the algorithms — a finite $b \\times b$ digit-product table plus carrying, versus a fresh doubling sweep per product. The Indian decimal revolution (lesson 9.3) completed all three by making the zero digit honest; Babylon and the Maya, met next, held position itself for centuries without it.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Tally stick', def: 'A durable object bearing one carved mark per counted thing — the oldest surviving number notation, attested from the Palaeolithic onward.' },
            { term: 'One-to-one principle', def: 'The rule that counting pairs each counted object with exactly one mark; the correspondence itself carries the number, before any symbol has a value.' },
            { term: 'Five-bar gate', def: 'The tally convention of closing four vertical strokes with a fifth laid across them, bundling a count into gates and leftovers.' },
            { term: 'Additive system', def: 'A numeration system in which each symbol has a fixed value independent of position and the string names the sum of its symbols — Egyptian hieroglyphs and classical Roman numerals are the canonical cases.' },
            { term: 'Hieroglyphic numerals', def: 'Egypt\'s additive system: seven glyph classes for 1, 10, 100, …, 1,000,000, each repeated as many times as its digit, in any order.' },
            { term: 'Doubling method', def: 'Multiplication by successive doubling of one factor and addition of the rows picked by the other factor’s binary expansion — the scribes’ table-free workaround for product.' },
            { term: 'Subtractive rule', def: 'The Roman convention that a smaller symbol before the next larger is subtracted (IV, IX, XL, XC, CD, CM) — a local two-symbol compression, not a place-value mechanism.' },
            { term: 'Digit sum', def: 'The sum of an integer’s decimal digits; in a base-ten additive system it is exactly the symbol count of the numeral, and it equals 9d precisely for 9…9 (d digits).' },
          ],
        },
        {
          kind: 'quiz',
          title: 'Check yourself',
          items: [
            {
              q: 'In an additive system, what decides the value of a written number?',
              options: [
                'Which symbols happen to sit next to which',
                'The sum of the symbol values, whatever the order',
                'The position of each symbol in the string',
                'The largest symbol that appears',
              ],
              answer: 1,
              explain:
                'Additive is defined by order-free summation: each symbol carries a fixed value and the string names their sum. Option 0 describes the Roman subtractive rule’s narrow two-symbol cases, option 2 is the *positional* definition (chapter 3), and option 3 has no role in any system — a single tadpole does not price a string.',
            },
            {
              q: '3,027 written in hieroglyphs (3 lotuses, 0 coils, 2 heel bones, 7 strokes) uses how many symbols?',
              options: ['4', '9', '12', '11'],
              answer: 2,
              explain:
                'The symbol count of an additive numeral is the digit sum: 3 + 0 + 2 + 7 = 12. Option 0 counts digit *characters*, option 1 is the digit sum of 2,043 (a different number), and option 11 miscounts by dropping the zero place — which still contributes nothing to the sum but must not be overcounted either.',
            },
            {
              q: 'The doubling method computes 23 × 19 by ticking the rows 23, 46 and 368. Which fact licenses that particular pick?',
              options: [
                'Every number is a sum of distinct powers of two — here 19 = 16 + 2 + 1',
                '19 is prime, so the pick must use three rows',
                '23 is divisible by the tick values',
                'Doubling preserves oddness',
              ],
              answer: 0,
              explain:
                'The pick is the multiplier’s binary expansion, unique for every natural number (chapter 3’s representation theorem in base two); distributivity then makes the ticked sum the product. Option 1 confuses primality with binary expansion, option 2 is false (23 is odd, the ticks are powers of two), and option 3 confuses doubling with divisibility — doubling nothing to do with the multiplier’s factors.',
            },
            {
              q: 'In Roman numerals IV = 4 and VI = 6. What kind of rule is at work?',
              options: [
                'Place value with base five',
                'A local subtractive rule between adjacent symbols, not place value',
                'An additive rule with order ignored',
                'A rounding convention for inscription space',
              ],
              answer: 1,
              explain:
                'Only the six sanctioned pairs (IV, IX, XL, XC, CD, CM) subtract, and only between immediate neighbours — a two-symbol transaction, never a scale factor. Option 0 is wrong because no base and no powers appear (VL is illegal for 45), option 3 is the additive reading that the rule overrides, and option 2 contradicts the order-sensitivity the pair displays.',
            },
            {
              q: 'As numbers reach new scales, what must an additive system keep acquiring that a positional system never does?',
              options: [
                'More strokes per bundle',
                'New symbol classes — a fresh mark per scale (or a vinculum patch)',
                'More digits per number',
                'Larger grouping sizes',
              ],
              answer: 1,
              explain:
                'Seven hieroglyph classes top out at 999,999; the next scale demands an eighth, and Rome reached for the ×1,000 overline — the inventory grows forever. A positional system reuses its ten digits at every scale, the scale carried by position. Option 0 is fixed by the bundle rule (never more than 9), option 2 describes positional names, and option 3 would break the trade-up discipline that defines the systems.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Tally 34 objects with five-bar gates and read the tally back.',
                  solution: [
                    'Split at the gate size: $\\lfloor 34/5 \\rfloor = 6$ complete gates.',
                    'Remainder: $34 - 6 \\times 5 = 4$ loose strokes.',
                    'Read back: $6 \\times 5 + 4 = 34$. ✓',
                  ],
                  answer: '6 five-bar gates and 4 single strokes',
                },
                {
                  q: 'Write 2,043 in hieroglyphs and state the symbol count.',
                  solution: [
                    'Digits: $2$ thousands, $0$ hundreds, $4$ tens, $3$ units.',
                    'String: 2 lotuses, 0 coils, 4 heel bones, 3 strokes.',
                    'Count by the digit-sum rule: $2 + 0 + 4 + 3 = 9$.',
                  ],
                  answer: '2 lotuses + 4 heel bones + 3 strokes — 9 symbols',
                },
                {
                  q: 'Read XLVII, then write 47 in Roman numerals.',
                  solution: [
                    'Reading: $XL = 40$ (the sanctioned pair), $VII = 7$.',
                    'Total: $40 + 7 = 47$.',
                    'Writing: 47 = XLVII — the same string, the reading and writing agreeing.',
                  ],
                  answer: 'XLVII = 47',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Add 1,234 + 4,321 hieroglyph-style by collecting symbols, and say why no trade-ups occur.',
                  solution: [
                    'Collect: strokes $4 + 1 = 5$, heels $3 + 2 = 5$, coils $2 + 3 = 5$, lotuses $1 + 4 = 5$.',
                    'Every pile holds fewer than 10, so no pile trades up — no carries.',
                    'Read the piles: 5 lotuses, 5 coils, 5 heels, 5 strokes.',
                    'Decimal check: $1{,}234 + 4{,}321 = 5{,}555$. ✓',
                  ],
                  answer: '5,555 — collected with no trade-ups',
                },
                {
                  q: 'How many hieroglyphs does 999,999 need, and how many digits does its decimal name have? Compare.',
                  solution: [
                    'Digit sum: $9 \\times 6 = 54$, and the additive count is the digit sum — 54 symbols.',
                    'Decimal name: 6 digits.',
                    'Ratio: 9 marks per digit at the worst case, exactly the 9d bound in action.',
                    'Note the raggedness next door: 1,000,000 prints as a single Heh.',
                  ],
                  answer: '54 hieroglyphs against 6 digits — the worst-case ratio 9',
                },
                {
                  q: 'Read MDCCCLXXXVIIII additively (no subtractive pairs appear).',
                  solution: [
                    'Class by class: $M = 1000$; $DCCC = 500 + 300$; $LXXX = 50 + 30$; $VIIII = 9$.',
                    'Sum: $1000 + 800 + 80 + 9 = 1{,}889$.',
                    'This is the older additive habit — the same year the subtractive age would print MDCCCLXXXIX.',
                  ],
                  answer: '1,889',
                },
                {
                  q: 'Tally 87 census marks in tens-bundles. How many marks does the bundled form use, and what is the compression ratio?',
                  solution: [
                    'Split at 10: $\\lfloor 87/10 \\rfloor = 8$ bundles, remainder 7.',
                    'Bundled form: 8 ten-marks and 7 strokes = $8 + 7 = 15$ marks.',
                    'Compression: $87/15 = 5.8$.',
                    'Check: $8 \\times 10 + 7 = 87$. ✓',
                  ],
                  answer: '15 marks, a 5.8× compression',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Compute 34 × 25 by the doubling method, writing every row.',
                  solution: [
                    'Rows: $25, 50, 100, 200, 400, 800$ — six rows, since $\\lfloor \\log_2 34 \\rfloor + 1 = 6$.',
                    'Ticks for 34: $34 = 32 + 2$, so tick rows 2 and 32.',
                    'Add the ticked rows: $50 + 800 = 850$.',
                    'Check: $34 \\times 25 = 850$. ✓',
                  ],
                  answer: '850, from six doubled rows',
                },
                {
                  q: 'Add XXVII + XLII the Roman way — collect, regroup, finish.',
                  solution: [
                    'Collect additively: $XXVII$ contributes $XX$ and $VII$; $XLII$ is $XL + II$, which collects as $XXXX$ and $II$.',
                    'Combined: $XXXXX$ and $VIIII$ (five X’s, nine I’s).',
                    'Regroup: $XXXXX \\to L$; $VIIII \\to IX$.',
                    'Result: $LXIX$. Check: $27 + 42 = 69 = LXIX$. ✓',
                  ],
                  answer: 'LXIX (69)',
                },
                {
                  q: 'Compute XII × XII by repeated addition and write the answer in Roman numerals.',
                  solution: [
                    'Add XII twelve times: $12 \\times 12 = 144$ (or double: 12, 24, 48, 96, then $96 + 48 = 144$).',
                    'Convert 144: $C = 100$, $XL = 40$, $IV = 4$.',
                    'So 144 = CXLIV — the additive work ends in a subtractive dress.',
                  ],
                  answer: 'CXLIV (144)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'What is the largest number of hieroglyphs any five-digit number can need? And what is the smallest number needing at least 20 symbols?',
                  solution: [
                    'Worst case: every digit 9, giving $9 \\times 5 = 45$ symbols — the number 99,999.',
                    'Two-digit numbers cap at $9 + 9 = 18$, so a 20-symbol number needs three digits.',
                    'Minimise the value: hundreds digit 1 with tail 99 gives $1+9+9 = 19$ — short by one.',
                    'Hundreds digit 2: $2 + 9 + 9 = 20$ at the number 299.',
                    'A full sweep confirms nothing below 299 reaches 20 symbols.',
                  ],
                  answer: '45 (at 99,999); the smallest ≥ 20-symbol number is 299',
                },
                {
                  q: 'A hieroglyph string shows 3 lotuses, 4 heel bones and 8 strokes. What number is it, and how many symbols does it use? Verify the digit-sum rule on your answer.',
                  solution: [
                    'Value: $3 \\times 1000 + 4 \\times 10 + 8 = 3{,}048$.',
                    'Symbols: $3 + 4 + 8 = 15$.',
                    'Digit-sum check: the digits of 3,048 are 3, 0, 4, 8, summing to 15. ✓',
                    'The zero hundreds place contributes no symbols — and no digit to the sum either.',
                  ],
                  answer: '3,048, using 15 symbols',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove: the doubling method computes n·m for every natural m, using at most ⌊log₂ m⌋ + 1 doubled rows — and that the pick is unique.',
                  solution: [
                    'Existence of the pick: every natural m is a sum of distinct powers of two (the base-two half of the representation theorem), so ticks summing to m always exist.',
                    'Uniqueness: binary expansions are unique (chapter 3), so no other tick set sums to m.',
                    'The product: the ticked rows are $n \\cdot 2^k$ for $k$ in the 1-bit set $S$ of $m$; by distributivity $\\sum_{k \\in S} n 2^k = n \\sum_{k \\in S} 2^k = n m$.',
                    'Row count: the largest power needed is $2^{\\lfloor \\log_2 m \\rfloor}$, so the method writes rows $k = 0, 1, \\dots, \\lfloor \\log_2 m \\rfloor$ — that is $\\lfloor \\log_2 m \\rfloor + 1$ rows, after which the pick is complete.',
                    'Hence the method is correct, its pick unique, and its cost logarithmic in the multiplier — no multiplication table required at any step.',
                  ],
                  answer: 'The pick is m’s unique binary expansion; distributivity gives n·m in ⌊log₂ m⌋ + 1 rows',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'The Ishango bone’s left column holds 11, 13, 17, 19 — the primes between 10 and 20 — and its centre column pairs 3–6, 4–8 and 5+5–10. Argue both sides: does this evidence number theory twenty millennia early, or something else? What can a tally certify, and what can it never certify?',
                  solution: [
                    'For the reading: the four counts are exactly the primes in (10, 20), their sum 60 matches the column’s total, and the centre column’s doubling pairs look deliberate — patterns this clean feel designed.',
                    'Against it: the objection of Rudman and others — primes were not *named* or studied until Greek mathematics, so crediting Palaeolithic carvers with prime recognition projects modern categories backward; Marshack’s lunar-calendar reading is criticised on archaeological grounds, and the counts could arise from lunar or ceremonial bookkeeping without any arithmetic intent.',
                    'The honest core: the marks are real (168 notches, columns summing 60, 48, 60) and grouped with intent; the *meaning* is not recoverable from the artifact alone.',
                    'What a tally certifies: correspondence and magnitude-order — one-to-one matching, more-or-less, and grouped repeats.',
                    'What it cannot certify: that the maker had a *concept* of prime, of doubling as an operation, or of number as detached from things. A notation is evidence of notation; only the surrounding culture can make it evidence of theory.',
                  ],
                  answer:
                    'Both readings respect the counts; a tally certifies correspondence and grouping, never the concepts a later age reads into them — the dispute is over meaning, not marks',
                },
              ],
            },
          ],
        },
        { kind: 'formula', name: 'Bundle split of a tally', latex: 'N = b\\left\\lfloor \\frac{N}{b} \\right\\rfloor + (N \\bmod b)', note: 'complete gates plus leftovers — the division algorithm’s shape in carving' },
        { kind: 'formula', name: 'Additive symbol count', latex: 's(N) = \\sum_i (\\text{digit}_i(N)) \\le 9d', note: 'equality exactly at 9…9 (d digits); 999,999 → 54' },
        { kind: 'formula', name: 'Doubling rows', latex: 'n \\cdot m = \\sum_{k \\in S} n\\,2^k, \\quad S = \\text{1-bits of } m', note: 'the pick is the multiplier’s binary expansion; distributivity finishes it' },
        { kind: 'formula', name: 'Rows the doubling method needs', latex: '\\lfloor \\log_2 m \\rfloor + 1', note: '5 rows for m = 19; 6 rows for m = 34' },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Roman-numeral reading and writing appears across bank, SSC and railway aptitude sets — year numerals (copytitles, film dates, clock faces), the six subtractive pairs, and the additive-vs-subtractive contrast are the tested facts. Counting-symbol questions ("how many symbols to write 999 in an additive system") and additive-vs-positional comparisons appear in number-system chapters as short marks — the digit-sum bound $s(N) \\le 9d$ answers them in one line. The digit sum itself returns with force in chapter 5’s casting out nines (lesson ans-why-the-divisibility-tests-work), and the doubling method is the same binary expansion that chapter 3 used for base conversion (lesson ans-converting-between-bases). All items here are exam-style illustrations, none reproduced from a past paper.',
        },
        { kind: 'para', text: 'The additive systems named numbers the way a pile of stones names them — honestly, order-free, and at full length. Their failure was never addition and never magnitude; it was the multiplication table that could not exist on an unordered string. The next lesson crosses to the two civilisations that solved *that* problem millennia before zero was a number — and shows precisely what their half-finished positional systems still could not do.' },
      ],
    },
    {
      id: 'ans-place-value-before-its-time-babylon-and-mesoamerica',
      number: '9.2',
      title: 'Place Value Before Its Time: Babylon and Mesoamerica',
      prerequisites: ['ans-tallies-groupings-and-additive-systems', 'ans-representation-theorem-unique-name', 'ans-arithmetic-in-other-bases'],
      sources: ['openstax-contemporary-math', 'babylonian-sexagesimal-numerals', 'ybc-7289', 'plimpton-322', 'maya-numerals-long-count', 'knuth-taocp-v2'],
      concepts: [
        'Sexagesimal',
        'Place value',
        'Placeholder',
        'YBC 7289',
        'Plimpton 322',
        'Vigesimal',
        'Long Count',
        'Regular number',
      ],
      objectives: [
        'encode and decode numbers in the Babylonian two-wedge base-sixty notation',
        'prove that the readings of a zeroless positional string form a geometric family V·60^j, and say exactly what a placeholder does and does not repair',
        'explain why sixty was chosen — the regular numbers whose reciprocals terminate — and verify the YBC 7289 diagonal to one part in two million',
        'convert between Mayan dot-bar-shell numerals and decimal in both the pure vigesimal and the calendar (Long Count) readings',
        'compare the four historical systems against the decimal standard and name precisely what the Indian revolution completed',
      ],
      blocks: [
        { kind: 'para', text: 'The additive systems of lesson 9.1 paid for every scale with a new symbol and paid for every product with a doubling sweep. Two civilisations saw further — and, remarkably, they saw it independently, on opposite sides of the world. The Babylonian scribes writing on clay from about 2050 BCE, and the Maya carving stone monuments half a world away, both hit on the idea that powers this book proved in chapter 3: let a symbol\'s **position** carry its scale, and two or three marks suffice for every number there is. Each system ran the same beautiful engine with the same terrible flaw — neither had a zero that behaved like a digit. This lesson rides both systems to the edge of their power, quantifies precisely what the missing zero costs (it is a theorem, not a vibe), and leaves the Indian completion — zero as a number — for the chapter\'s final lesson.' },
        { kind: 'heading', text: 'Babylon: Two Wedges and Sixty' },
        { kind: 'para', text: 'A Babylonian scribe wrote by pressing a reed stylus into wet clay. The notation that emerged uses exactly **two wedge forms**: a thin vertical wedge worth 1, pressed up to nine times side by side, and a corner wedge worth 10, pressed up to five times — so any value from 0 to 59 can be built inside one "digit group" as tens-then-units. Numbers beyond 59 then repeat these groups at higher positions, each step worth sixty times the last. That is the whole apparatus: two marks, and place value in base sixty — the **sexagesimal** system. Our hours, minutes and seconds are its direct fossil.' },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Place value (base sixty)',
          text: 'A numeration system is said to be **positional in base $b$** if a string of digit groups $a_1, a_2, \\dots, a_k$ (each $0 \\le a_i \\le b-1$) names the number $N = a_1 b^{k-1} + a_2 b^{k-2} + \\cdots + a_k$. Thus, the Babylonian string $\\langle 1, 13, 46\\rangle_{60}$ names $1 \\cdot 60^2 + 13 \\cdot 60 + 46 = 4{,}426$. The chapter 3 representation theorem guarantees this name exists and is unique — *provided every place is filled, including the empty ones, and the scale is anchored*. Those two provisos are where Babylon lived dangerously.',
        },
        {
          kind: 'table',
          caption: 'Babylonian base-sixty exhibits — the digit groups, and the numbers they name (each group = tens as corner wedges + units as vertical wedges)',
          head: ['Decimal', 'Sexagesimal string', 'As a sum of place values'],
          rows: [
            ['25', '⟨25⟩', 'one group: 2 corner wedges + 5 verticals'],
            ['80', '⟨1,20⟩', '1·60 + 20'],
            ['3,661', '⟨1,1,1⟩', '1·3,600 + 1·60 + 1'],
            ['4,426', '⟨1,13,46⟩', '1·3,600 + 13·60 + 46'],
            ['3,607', '⟨1,0,7⟩', '1·3,600 + 0·60 + 7 — the middle place is EMPTY'],
            ['7,200', '⟨2,0,0⟩', '2·3,600 — two trailing empties'],
            ['7,233', '⟨2,0,33⟩', '2·3,600 + 0·60 + 33'],
          ],
        },
        {
          kind: 'derivation',
          title: 'Every number under 60^k has exactly one sexagesimal name',
          statement:
            'For every natural N < 60^k there is exactly one digit string a_1 … a_k with 0 ≤ a_i ≤ 59 and N = a_1·60^{k-1} + … + a_k — and the repeated-division algorithm finds it.',
          steps: [
            {
              label: 'Existence by division',
              formula: 'N = 60 q + a_k, \\quad 0 \\le a_k \\le 59',
              explanation:
                'The division algorithm (chapter 2) splits $N$ into quotient $q$ and remainder $a_k = N \\bmod 60$. The remainder is a legal digit; the quotient is smaller by a factor of sixty. Repeat on $q$: the remainders read backwards are the digits.',
            },
            {
              label: 'Uniqueness',
              formula: 'a_1 60^{k-1} + \\cdots + a_k = a_1^{\\prime} 60^{k-1} + \\cdots \\implies \\sum (a_i - a_i^{\\prime}) 60^{k-i} = 0',
              explanation:
                'If two strings named the same number, their digit-wise difference would give a sum of multiples of distinct powers of 60 equal to zero, with every coefficient strictly between −59 and 59. The largest-power term dominates in absolute value unless its coefficient is zero — so every coefficient is zero and the strings agree. This is chapter 3\'s uniqueness proof with sixty in place of ten.',
            },
            {
              label: 'The exhibit',
              formula: '4{,}426 = 60 \\cdot 73 + 46; \\quad 73 = 60 \\cdot 1 + 13',
              explanation:
                'Divide 4,426 by 60: quotient 73, remainder 46. Divide 73: quotient 1, remainder 13. Divide 1: quotient 0, remainder 1. Remainders read backwards: ⟨1, 13, 46⟩ — the string in the table above.',
            },
          ],
          result:
            'Base-sixty naming is unique and computable by repeated division by 60 — exactly the machinery of chapter 3, three millennia early, with the one caveat that the scribes themselves left places blank instead of writing a zero digit.',
        },
        { kind: 'heading', text: 'The Missing Zero, Quantified' },
        { kind: 'para', text: 'Inside a digit group, zero was simply nothing to press — a group like ⟨20⟩ could mean one wedge-pattern, and beyond that the trouble starts. Between places, the scribe wrote a **gap**: ⟨1,0,7⟩ for 3,607 was two groups separated by visible space on the clay. Trailing empty places could not be written at all — 7,200 = ⟨2,0,0⟩ has no honest Babylonian spelling that shows where the string ends. And crucially, nothing anchored *which* place the rightmost group occupied: the same two groups «1 20» could sit at any height of the ladder. For a few centuries around 300 BCE a placeholder mark (two slanted wedges) appears inside strings, fixing internal gaps — but it is never used trailing, and it never asserts a scale. What does that cost, exactly? It is worth a theorem.' },
        {
          kind: 'derivation',
          title: 'The ambiguity theorem: a zeroless string names a geometric family',
          statement:
            'Fix a two-group Babylonian string «a b» with 1 ≤ a, b ≤ 59 (a < 60, b < 60). Its readings are exactly the values {V·60^j : j ∈ ℤ} where V = 60a + b is the unit-anchored reading. Consequently any two readings of the same string differ by a factor of 60 raised to an integer power.',
          steps: [
            {
              label: 'Sliding one place multiplies by sixty',
              formula: 'a \\cdot 60^{m+1} + b \\cdot 60^{m} = 60\\,(a \\cdot 60^{m} + b \\cdot 60^{m-1})',
              explanation:
                'A reading is fixed by choosing which place $m$ the rightmost group $b$ occupies; the left group then sits at $m+1$. Shifting the whole string up one rung multiplies every term by 60 — so from any one reading, all the others are its multiplications and divisions by 60.',
            },
            {
              label: 'The family is exactly the orbit',
              formula: '\\mathrm{readings}(\\langle a\\,b\\rangle) = \\{ (60a + b) \\cdot 60^j : j \\in \\mathbb{Z} \\}',
              explanation:
                'Downward: the unit-anchored reading $V = 60a + b$ divided by 60 puts $b$ in the sixtieths place — a legitimate fractional reading, because Babylonian notation handled fractions by the same places (their $\\langle 1\\,20\\rangle$ for $4/3$ is the ancestor of our minutes). Upward and downward forever, with no zero and no anchor to stop it.',
            },
            {
              label: 'Two readings differ by a power of sixty',
              formula: 'V \\cdot 60^{j_1} = (V \\cdot 60^{j_2}) \\cdot 60^{j_1 - j_2}',
              explanation:
                'Ratio of any two readings: $60^{j_1 - j_2}$ — so the readings are never arbitrary; they form one geometric sequence. For «1 20» the family is $\\{80 \\cdot 60^j\\}$: …, $1/45$, $4/3$, $80$, $4{,}800$, $288{,}000$, …; for «2 30» it is $\\{150 \\cdot 60^j\\}$: $1/24$, $5/2$, $150$, $9{,}000$, $540{,}000$, …',
            },
          ],
          result:
            'A zeroless string names not a number but a geometric family {V·60^j : j ∈ ℤ} — the value is determined only up to a factor of 60^j. A true zero digit plus a fixed scale collapses the family to a single point; that collapse is what the Indian revolution (lesson 9.3) achieved.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'What the placeholder did — and did not — repair',
          text: 'The late Seleucid placeholder (two slanted wedges, from about 300 BCE) fixed INTERNAL gaps: ⟨1,0,7⟩ could be written unambiguously as three groups with the mark in the middle. It never trailed a string, so ⟨2,0,0⟩ stayed unwritable, and it asserted no absolute scale — «1 20» with a placeholder inside a longer string still slid up and down the ladder freely. Scribes managed because their work lived in context: a reciprocal table, a fixed problem, a known magnitude. The notation itself never said.',
        },
        { kind: 'heading', text: 'The Tables That Made Sixty Work' },
        { kind: 'para', text: 'Why sixty at all? Because division — the operation the additive systems fared worst at — becomes *table lookup* in base sixty. A fraction $1/n$ has a terminating sexagesimal expansion exactly when $n$ divides a power of sixty, that is, when $n$ is a **regular number**: $n = 2^a 3^b 5^c$. Of the first hundred integers, 34 are regular to sixty — against only 15 whose reciprocals terminate in base ten. Sixty has twelve divisors (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60) where ten has four. The scribes exploited this with the *igi-gub-ba*, the standard reciprocal table: to divide by $n$, look up $1/n$ and multiply. And with place value established, the schools built the multiplication tables, the squares and cubes, and the root extractions that the additive world could never table.' },
        {
          kind: 'example',
          title: 'Check 0;2,30 against 1/24 — a regular-number division',
          steps: [
            'Termination test: $24 = 2^3 \\cdot 3$ — a regular number (only primes 2, 3, 5), so $1/24$ terminates in base sixty.',
            'Sexagesimal: $0;2,30 = 2/60 + 30/3600 = 1/30 + 1/120 = (4 + 1)/120 = 1/24$. ✓',
            'The reciprocal table of 24 would list 0;2,30 directly — division by 24 becomes multiplication by it.',
            'Hence the igi-gub-ba engine: 34 of the first 100 denominators terminate in sixty, against 15 in ten.',
          ],
        },
        { kind: 'para', text: 'The crown of the tablet tradition is a small round clay tablet in Yale\'s collection, catalogued as **YBC 7289** (c. 1800–1600 BCE). It shows a square with both diagonals, the side marked 30, the diagonal marked 42;25,35, and along the diagonal the ratio 1;24,51,10 — the sexagesimal expansion of $\\sqrt{2}$. Verify its accuracy honestly:' },
        {
          kind: 'example',
          title: 'Verify the YBC 7289 diagonal: 30 × 1;24,51,10 = 42;25,35, exactly',
          steps: [
            'As one fraction: $1;24,51,10 = 1 + 24/60 + 51/3600 + 10/216{,}000 = 305{,}470/216{,}000$.',
            'Multiply by the side: $30 \\times 305{,}470/216{,}000 = 9{,}164{,}100/216{,}000 = 30{,}547/720$.',
            'The tablet\'s diagonal: $42;25,35 = (42 \\cdot 3600 + 25 \\cdot 60 + 35)/3600 = 152{,}735/3{,}600 = 30{,}547/720$ — the same rational. ✓',
            'Accuracy: $1;24,51,10 = 1.41421296296\\ldots$ against $\\sqrt{2} = 1.41421356237\\ldots$ — an error of about $5.99 \\times 10^{-7}$, one part in roughly 2.36 million.',
            'Hence a scribe four thousand years ago carried $\\sqrt{2}$ to five correct decimal places inside a notation that could not write a trailing zero.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'A stylized reconstruction of YBC 7289 (c. 1800–1600 BCE, Yale collection): the square’s side 30, its diagonal 42;25,35, and the scale-free ratio 1;24,51,10 printed along the diagonal. The ratio is √2 to five decimal places — 1.41421296… against the true 1.41421356…, one part in about 2.36 million.',
          svg: ybcSquareSvg(),
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Plimpton 322 — fifteen rows of triples, and a debate',
          text: 'Another Old Babylonian tablet (from Larsa, c. 1800 BCE) tabulates, in fifteen rows, pairs of a short side and a diagonal of right triangles — integer triples like (119, 120, 169), in descending order of the ratio involved, with a broken first column whose heading most plausibly records a "taking-away of 1" from a squared diagonal. What the tablet was FOR is genuinely disputed: the long-standing reading is a scribal school exercise — a teacher\'s list of well-behaved triples for problem-setting (Eleanor Robson\'s reconstruction is the leading account) — while a 2017 proposal recast it as history\'s first trigonometric table, a claim most historians of Babylonian mathematics reject for lack of any trigonometry in the extant corpus. The numbers are beyond dispute; the intent is not. Even so: a table of exact integer triples is exactly what a reciprocal-table, place-value culture could produce — and did, a millennium before Pythagoras gave the theorem his name.',
        },
        { kind: 'heading', text: 'Mesoamerica: Dots, Bars and the Shell' },
        { kind: 'para', text: 'Half a world away and millennia later, the Maya of Mesoamerica built the second great pre-modern positional system — with a *visible zero*. Their numerals are stunningly compact: a **dot** is 1, a **bar** is 5, and a **shell** glyph is 0; digits 0 through 19 are built as bars topped with dots (13 is two bars and three dots; 19 is three bars and four dots, the largest legal digit). Numbers were written vertically, the places stacked bottom to top, each worth twenty times the one below — a **vigesimal** (base-twenty) system in pure form: place values $1, 20, 400, 8{,}000, \\ldots$' },
        { kind: 'para', text: 'Pure-vigesimal conversion is the chapter 3 machinery at base twenty. Read top-down: ⟨13,7⟩ is $13 \\cdot 20 + 7 = 267$; ⟨8,0,16⟩ is $8 \\cdot 400 + 0 \\cdot 20 + 16 = 3{,}216$ — note the shell doing honest internal-zero work, exactly the gap Babylon could not write. A four-place example: ⟨12,3,9,1⟩ is $12 \\cdot 8{,}000 + 3 \\cdot 400 + 9 \\cdot 20 + 1 = 97{,}381$. Every number named this way is unambiguous — the shell fixes empty places, and the string\'s bottom place is anchored by context.' },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The Maya zero: a complete placeholder — and a subtle short of a number',
          text: 'The shell glyph is among the earliest zero SYMBOLS in regular use anywhere: it fills empty places inside positional strings, the exact job Babylon\'s notation fumbled for most of its history. But a placeholder inside a calendar count is not yet the zero of arithmetic — a number in its own right, addable, subtractable, the additive identity that $a + 0 = a$ for every $a$. Whether any pre-Columbian scribe computed WITH zero as a value is a subtlety the sources do not settle. The full completion — zero as a digit AND a number, inside a single unambiguous system — is the Indian revolution, and it is lesson 9.3\'s subject.',
        },
        { kind: 'heading', text: 'The Long Count and the 18-Kink' },
        { kind: 'para', text: 'Where the Maya actually deployed all this was the calendar — and the calendar bent the base. The **Long Count**, their linear day count from a creation-era base date, uses places named (bottom to top) *kin* (1 day), *uinal* (20 kin), *tun* (18 uinal = 360 days), *katun* (20 tun = 7,200 days) and *baktun* (20 katun = 144,000 days). That third step is the fingerprint: $18 \\times 20 = 360$, not $20 \\times 20 = 400$ — chosen so the tun approximates the 365-day year. The system is "mostly" vigesimal with one deliberate kink, and the kink is worth watching in the arithmetic, because it makes the same digit string name two different numbers depending on which ladder you read it on.' },
        {
          kind: 'derivation',
          title: 'Reading and writing Long Count dates',
          statement:
            'A Long Count date b.k.t.u.g names the day count D = 144,000·b + 7,200·k + 360·t + 20·u + g; conversely, D determines its digits by dividing by 20 four times, with one division by 18 at the uinal step.',
          steps: [
            {
              label: 'The forward sum',
              formula: 'D = 144{,}000\\,b + 7{,}200\\,k + 360\\,t + 20\\,u + g',
              explanation:
                'Read top-down against the ladder $1, 20, 360, 7{,}200, 144{,}000$. The exhibit: $9.9.16.0.0$ gives $9 \\cdot 144{,}000 + 9 \\cdot 7{,}200 + 16 \\cdot 360 = 1{,}366{,}560$ days — about 3,742 years.',
            },
            {
              label: 'The kink’s price, quantified',
              formula: '1{,}518{,}400 - 1{,}366{,}560 = 151{,}840 = 9 \\cdot 16{,}000 + 9 \\cdot 800 + 16 \\cdot 40',
              explanation:
                'Read the same string $9.9.16.0.0$ on the PURE vigesimal ladder ($20^4, 20^3, 20^2$) and it names $1{,}518{,}400$. The gap decomposes exactly along the kinked places: $9 \\cdot (160{,}000 - 144{,}000) + 9 \\cdot (8{,}000 - 7{,}200) + 16 \\cdot (400 - 360)$. One string, two honest values — the calendar\'s 18 is a real deviation, not a rounding.',
            },
            {
              label: 'The inverse algorithm',
              formula: 'g = D \\bmod 20;\\ \\ u = (D/20) \\bmod 18;\\ \\ t = (D/360) \\bmod 20;\\ \\ k = (D/7200) \\bmod 20;\\ \\ b = D/144{,}000',
              explanation:
                'Strip days by 20, then ONE place by 18, then continue by 20. On $D = 1{,}366{,}560$: $g = 0$; $68{,}328 \\bmod 18 = 0$ (so $u = 0$); $3{,}796 \\bmod 20 = 16$ (tun); then katun 9 and baktun 9 — recovering $9.9.16.0.0$ exactly.',
            },
          ],
          result:
            'Long Count dates convert by one calendar-weighted sum forward and a mod-20 / mod-18 division chain backward — a positional system with a single engineered irregularity, verified end-to-end on 9.9.16.0.0 = 1,366,560 days.',
        },
        { kind: 'para', text: 'The same double-reading haunts ordinary numbers once the kink enters: ⟨8,0,16⟩ read on the calendar ladder (top place = tun = 360) is $8 \\cdot 360 + 16 = 2{,}896$; read purely it is $3{,}216$ — a gap of exactly $8 \\cdot (400 - 360) = 320$. And the full count rounds at 13 baktun: $13 \\cdot 144{,}000 = 1{,}872{,}000$ days, the length of the classical Long Count era, whose base date the most-cited (GMT) correlation places in August 3114 BCE — the "creation" reading $13.0.0.0.0$ the monuments reset from.' },
        {
          kind: 'figure',
          caption:
            'Two ladders of place. Babylonian base sixty steps uniformly (×60 per rung — rung heights drawn on a log scale). The Mayan Long Count climbs ×20, then takes the calendar’s kink at ×18 (360, highlighted), then ×20 forever. The kink is the price of making the third rung approximate the 365-day year — and it makes the same digit string name two different numbers.',
          svg: placeLaddersSvg(),
        },
        { kind: 'heading', text: 'The Honest Verdict: Almost Position' },
        { kind: 'para', text: 'Set the four systems beside the decimal standard and the shape of the whole chapter appears. The additive pair (Egypt, Rome) print every digit in full and invent a new symbol class per scale. Babylon owns position and the tables but cannot pin its scale — its strings name geometric families. The Maya own position, a visible zero glyph, and the calendar, but bent the base at the third rung and left the zero\'s standing as a number unsettled. What remains — the fixed ten-digit inventory, the unambiguous name, zero everywhere a place can be empty — is precisely the Indian completion, next lesson.' },
        {
          kind: 'table',
          caption: 'Five systems, one verdict — the comparison this chapter has earned',
          head: ['System', 'Symbol inventory', 'Place value', 'Zero', 'The cost'],
          rows: [
            ['Hieroglyphs', '7 classes, repeated per digit', 'none', 'none', 'digit-sum printing; a new class per scale'],
            ['Roman', '7 letters + 6 subtractive pairs', 'none (local rule only)', 'none', 'ceiling 3,999; M-repeats; no product table'],
            ['Babylonian', '2 wedge forms', 'yes — base 60', 'late placeholder, internal only', 'scale floats: values up to a factor 60^j'],
            ['Mayan', 'dot, bar, shell', 'yes — base 20 with an 18-kink', 'shell placeholder, from the start', 'the kink splits readings; zero’s number-status unsettled'],
            ['Decimal (ch. 3)', '10 digits, reused forever', 'yes — base 10', 'a digit and a number', 'none — the completion 9.3 tells'],
          ],
        },
        { kind: 'para', text: 'The legacies are all around us. Babylon\'s sixty survives in every clock face and every degree of latitude — minutes and seconds are sexagesimal fossils, still doing reciprocal-friendly division after four millennia. The Maya Long Count still converts monument dates; its zero glyph stands among the earliest in human use. And the race they both nearly won — a complete positional system — was run to its end in India, by making zero a number like any other. That final step, and the decimal revolution it completed, is where this chapter goes next.' },
        {
          kind: 'terms',
          items: [
            { term: 'Sexagesimal', def: 'The Babylonian base-sixty positional system, written with two wedge forms (1 and 10) in digit groups of up to 59; the ancestor of minutes, seconds and degrees.' },
            { term: 'Place value', def: 'The principle that a digit\'s contribution is its value times a power of the base fixed by its position — the machinery chapter 3 proved unique and this lesson finds twice, independently, in the ancient world.' },
            { term: 'Placeholder', def: 'A mark (Babylon’s late slanted wedges, Maya’s shell) occupying an empty internal place so the other digits keep their positions — without asserting an absolute scale or trailing coverage.' },
            { term: 'YBC 7289', def: 'The Old Babylonian tablet (c. 1800–1600 BCE) showing a square of side 30, diagonal 42;25,35, and the diagonal ratio 1;24,51,10 — √2 accurate to about one part in two million.' },
            { term: 'Plimpton 322', def: 'The Larsa tablet (c. 1800 BCE) listing fifteen short-side/diagonal integer pairs; its purpose is debated, with the scribal-exercise reading leading and the 2017 "trig table" proposal rejected by most historians of the corpus.' },
            { term: 'Vigesimal', def: 'Base-twenty naming; the Maya counted in it with dots (1), bars (5) and a shell (0), places stacked vertically.' },
            { term: 'Long Count', def: 'The Maya linear day count with ladder 1, 20, 360 (the 18 × 20 kink), 7,200, 144,000 — kin, uinal, tun, katun, baktun — read from a creation base 13.0.0.0.0 (August 3114 BCE in the most-cited correlation).' },
            { term: 'Regular number', def: 'A number of the form 2^a·3^b·5^c; precisely the denominators whose reciprocals terminate in base sixty — 34 of the first 100, against 15 in base ten.' },
          ],
        },
        {
          kind: 'quiz',
          title: 'Check yourself',
          items: [
            {
              q: 'The entire Babylonian numeral system is written with how many wedge forms?',
              options: ['Ten — one per unit', 'Two — worth 1 and 10', 'Fifty-nine — one per digit value', 'Sixty — one per place'],
              answer: 1,
              explain:
                'A thin vertical wedge (1, pressed up to nine times) and a corner wedge (10, up to five times) build every digit group 0–59; place value does the rest. Options 0 and 2 confuse digit groups with the digit values they encode, and option 3 confuses places with marks — the whole point of position is that the marks never multiply.',
            },
            {
              q: 'Read the Babylonian string ⟨1, 13, 46⟩ in base sixty.',
              options: ['159', '786', '1,134', '4,426'],
              answer: 3,
              explain:
                'Value = 1·3,600 + 13·60 + 46 = 3,600 + 780 + 46 = 4,426. Option 0 concatenates the digits, option 1 misreads the leading 1 as 13×60+6 territory, and option 2 drops the 3,600 place — each is a different way of ignoring a position, which is exactly the skill the string is testing.',
            },
            {
              q: 'The string «1 20» with no zero and no fixed scale can read as 80, 4/3, 4,800, 1/45, 288,000 … What family do all its readings form?',
              options: [
                'Multiples of 20',
                'The powers of 60 themselves',
                'One value times every power of 60 — the geometric family {80·60^j : j ∈ ℤ}',
                'Exactly two readings, one integer and one fractional',
              ],
              answer: 2,
              explain:
                'The ambiguity theorem: sliding the whole string one rung multiplies the reading by 60, so the readings are exactly 80 × 60^j — 1/45, 4/3, 80, 4,800, 288,000, … Option 0 spots the wrong factor, option 1 mistakes the multipliers for the values, and option 3 forgets the ladder runs forever in both directions.',
            },
            {
              q: 'In the Mayan Long Count the third place is 360, not 400. Why?',
              options: [
                'Scribes could not count past 19',
                'The tun = 18 × 20 = 360 days approximates the calendar year',
                'The shell zero forced the change',
                'Borrowed from Babylonian base sixty',
              ],
              answer: 1,
              explain:
                'The Long Count serves a calendar: 18 × 20 = 360 makes the tun a year-like unit, at the cost of a deliberate kink in the ladder (and a two-reading ambiguity the pure ladder does not have). Option 0 is wrong — digits reach 19 by design — option 2 confuses the placeholder with the ladder, and option 3 is pure invention; the two systems never met.',
            },
            {
              q: 'What did the Indian decimal revolution complete that Babylon and the Maya each fell short of?',
              options: [
                'Bigger numbers than either could write',
                'A true zero digit — usable trailing, anchoring the scale, and functioning as a number',
                'Multiplication tables',
                'A base smaller than ten',
              ],
              answer: 1,
              explain:
                'Babylon had position but only an internal placeholder — scale floated and trailing zeros were unwritable; the Maya had a placeholder glyph inside a kinked calendar ladder and an unsettled zero-as-number. The completion was zero everywhere a place can be empty, as a digit AND the additive identity. Option 0 is backwards (both systems handled enormous values), option 3 is a base change not a completion, and the tables of option 2 were already Babylon’s specialty.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Encode 25 as a single Babylonian digit group.',
                  solution: [
                    'Tens: $\\lfloor 25/10 \\rfloor = 2$ corner wedges.',
                    'Units: $25 - 20 = 5$ vertical wedges.',
                    'Check: $10 \\times 2 + 5 = 25$. ✓',
                  ],
                  answer: '2 corner wedges + 5 vertical wedges',
                },
                {
                  q: 'Write 13 in Mayan dot-bar numerals.',
                  solution: [
                    'Bars: $\\lfloor 13/5 \\rfloor = 2$, worth 10.',
                    'Dots: $13 - 10 = 3$, stacked above the bars.',
                    'Check: $5 \\times 2 + 3 = 13$. ✓',
                  ],
                  answer: '2 bars + 3 dots',
                },
                {
                  q: 'Read the Babylonian string ⟨3, 16⟩.',
                  solution: [
                    'Value: $3 \\cdot 60 + 16 = 180 + 16$.',
                    'So the string names 196.',
                    'Note the group encoding: 3 = 3 verticals (tens digit 0 needs no corner wedge), 16 = 1 corner + 6 verticals.',
                  ],
                  answer: '196',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Convert 5,182 to a Babylonian sexagesimal string.',
                  solution: [
                    'Divide by 60: $5{,}182 = 60 \\cdot 86 + 22$, remainder 22.',
                    'Divide 86: $86 = 60 \\cdot 1 + 26$, remainder 26.',
                    'Divide 1: quotient 0, remainder 1.',
                    'Read remainders backwards: ⟨1, 26, 22⟩.',
                    'Check: $3{,}600 + 26 \\cdot 60 + 22 = 3{,}600 + 1{,}560 + 22 = 5{,}182$. ✓',
                  ],
                  answer: '⟨1, 26, 22⟩',
                },
                {
                  q: 'The Mayan string ⟨8, 0, 16⟩ (top to bottom) has two honest readings. Find both and the exact gap.',
                  solution: [
                    'Calendar ladder (top = tun = 360): $8 \\cdot 360 + 0 \\cdot 20 + 16 = 2{,}896$.',
                    'Pure vigesimal ladder (top = 400): $8 \\cdot 400 + 0 \\cdot 20 + 16 = 3{,}216$.',
                    'Gap: $3{,}216 - 2{,}896 = 320$.',
                    'Decompose: $8 \\cdot (400 - 360) = 320$ — the kink’s exact price at this string.',
                  ],
                  answer: '2,896 (calendar) vs 3,216 (pure) — a gap of 320',
                },
                {
                  q: 'Convert 7,233 to sexagesimal and explain what the scribe’s clay would show where you write the middle 0.',
                  solution: [
                    'Divide: $7{,}233 = 60 \\cdot 120 + 33$; then $120 = 60 \\cdot 2 + 0$.',
                    'Digits: ⟨2, 0, 33⟩ — check: $7{,}200 + 0 + 33 = 7{,}233$. ✓',
                    'The middle place is EMPTY: the scribe leaves a visible gap between the two groups (or, after c. 300 BCE, presses the two-slanted-wedge placeholder).',
                    'Without something in that gap, ⟨2, 33⟩ would read 2·60 + 33 = 153 — the whole string collapses.',
                  ],
                  answer: '⟨2, 0, 33⟩ — an internal gap where the zero should stand',
                },
                {
                  q: 'Convert 4,876 to sexagesimal; then read ⟨2, 0, 59⟩ back to decimal.',
                  solution: [
                    'Divide 4,876 by 60: quotient 81, remainder 16. Divide 81: quotient 1, remainder 21.',
                    'Digits: ⟨1, 21, 16⟩ — check: $3{,}600 + 1{,}260 + 16 = 4{,}876$. ✓',
                    'Reading ⟨2, 0, 59⟩: $2 \\cdot 3{,}600 + 0 \\cdot 60 + 59 = 7{,}259$.',
                    'Both directions stumble on the same hazard: the internal empty place.',
                  ],
                  answer: '4,876 = ⟨1, 21, 16⟩; ⟨2, 0, 59⟩ = 7,259',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Find five readings of the zeroless string «2 30» across the ladder, and name the family.',
                  solution: [
                    'Unit-anchored: $V = 2 \\cdot 60 + 30 = 150$.',
                    'By the ambiguity theorem the family is $\\{150 \\cdot 60^j : j \\in \\mathbb{Z}\\}$.',
                    'Down the ladder: $150/60 = 5/2 = 2.5$; $150/3600 = 1/24 \\approx 0.0416$.',
                    'Up the ladder: $150 \\cdot 60 = 9{,}000$; $150 \\cdot 3600 = 540{,}000$.',
                    'Five readings: $1/24$, $5/2$, $150$, $9{,}000$, $540{,}000$ — one geometric family in ratio sixty.',
                  ],
                  answer: '{150·60^j}: 1/24, 5/2, 150, 9,000, 540,000',
                },
                {
                  q: 'Convert the Long Count date 10.2.3.12.7 to days, then run the inverse algorithm to recover it.',
                  solution: [
                    'Forward: $10 \\cdot 144{,}000 + 2 \\cdot 7{,}200 + 3 \\cdot 360 + 12 \\cdot 20 + 7 = 1{,}455{,}727$ days.',
                    'Inverse: $g = 1{,}455{,}727 \\bmod 20 = 7$.',
                    'uinal: $\\lfloor D/20 \\rfloor = 72{,}786$; $72{,}786 \\bmod 18 = 12$ (since $18 \\cdot 4{,}043 = 72{,}774$).',
                    'tun: $\\lfloor 72{,}786/18 \\rfloor = 4{,}043$; $4{,}043 \\bmod 20 = 3$. katun: $\\lfloor 4{,}043/20 \\rfloor = 202$; $202 \\bmod 20 = 2$. baktun: $\\lfloor 202/20 \\rfloor = 10$.',
                    'Recovered: 10.2.3.12.7. ✓ — the mod-18 step at the uinal place is the whole trick.',
                  ],
                  answer: '1,455,727 days; the inverse returns 10.2.3.12.7',
                },
                {
                  q: 'How many of the integers 1..20 have terminating reciprocals in base sixty? List them, and compare with base ten.',
                  solution: [
                    'Terminating in sixty ⟺ regular: $n = 2^a 3^b 5^c$.',
                    'The list: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20 — fourteen values (7, 11, 13, 14, 17, 19 carry primes beyond 5).',
                    'Base ten needs $n = 2^a 5^c$: only 1, 2, 4, 5, 8, 10, 16, 20 — eight values.',
                    'Fourteen against eight below twenty, 34 against 15 below hundred: sixty’s reciprocal richness is the division engine.',
                  ],
                  answer: '14 regulars ≤ 20 in base sixty vs 8 in base ten',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Exam-style: convert 4,876 to base sixty and 7,259 from base sixty — one of the two hides an internal zero. (Cross-check lesson 3.2’s base-conversion algorithm.)',
                  solution: [
                    'Repeated division (lesson ans-converting-between-bases’ algorithm, base 60): $4{,}876 = 60 \\cdot 81 + 16$; $81 = 60 \\cdot 1 + 21$.',
                    'Digits high-to-low: ⟨1, 21, 16⟩.',
                    'Reverse direction: ⟨2, 0, 59⟩ = $2 \\cdot 3{,}600 + 0 \\cdot 60 + 59 = 7{,}259$.',
                    'The hazard: the middle digit 0 is load-bearing — drop it and ⟨2, 59⟩ reads 159.',
                    'Hence the exam habit: always test base-conversion answers by recomputing the place-value sum.',
                  ],
                  answer: '4,876 = ⟨1, 21, 16⟩; ⟨2, 0, 59⟩ = 7,259',
                },
                {
                  q: 'Exam-style: verify 30 × 1;24,51,10 = 42;25,35 exactly, and state the accuracy of the ratio against √2.',
                  solution: [
                    'As fractions: $1;24,51,10 = 305{,}470/216{,}000$; times 30 gives $9{,}164{,}100/216{,}000$.',
                    'Reduce: $= 30{,}547/720$.',
                    'The claimed diagonal: $42;25,35 = 152{,}735/3{,}600 = 30{,}547/720$. Identical. ✓',
                    'Decimal check: $30{,}547/720 = 42.426388\\ldots$ — and $30\\sqrt{2} = 42.426406\\ldots$, matching to five places.',
                    'Accuracy of the ratio: error $\\approx 5.99 \\times 10^{-7}$ absolute, $\\approx 4.24 \\times 10^{-7}$ relative — about one part in 2.36 million.',
                  ],
                  answer: 'Exact as fractions; the ratio is accurate to about one part in 2.36 million',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove the Long Count inverse algorithm — that dividing by 20, then by 18 at the uinal step, then by 20 thrice more, recovers the digits of any day count D < 2,880,000 — and run it on 1,366,560.',
                  solution: [
                    'Write $D = 144{,}000b + 7{,}200k + 360t + 20u + g$ with $0 \\le g, u, t, k \\le 19$ and $1 \\le b \\le 13$.',
                    'Then $g = D \\bmod 20$ because every other term is a multiple of 20.',
                    'Put $D_1 = \\lfloor D/20 \\rfloor = 7{,}200b + 360k + 18t + u$ (each ladder value drops one rung). Then $u = D_1 \\bmod 18$: the first three terms are multiples of 18 ($7{,}200 = 18 \\cdot 400$, $360 = 18 \\cdot 20$, $18t$), while $u < 18$ is the naked remainder.',
                    'Continue: $D_2 = \\lfloor D_1/18 \\rfloor = 400b + 20k + t$, so $t = D_2 \\bmod 20$; then $D_3 = \\lfloor D_2/20 \\rfloor = 20b + k$ gives $k = D_3 \\bmod 20$ and $b = \\lfloor D_3/20 \\rfloor$ — each remainder isolated because every higher place is a multiple of the modulus.',
                    'Run on 1,366,560: $g = 0$; $D_1 = 68{,}328$, $u = 68{,}328 \\bmod 18 = 0$; $D_2 = 3{,}796$, $t = 16$; katun 9, baktun 9 → 9.9.16.0.0. ✓',
                  ],
                  answer: 'The mixed-radix inverse is forced by which higher places each modulus divides; 1,366,560 → 9.9.16.0.0',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Theorem (the ambiguity theorem, full statement): the readings of any two-group zeroless string «a b» form exactly the set {V·60^j : j ∈ ℤ} with V = 60a + b; hence any two readings differ by a factor 60^k for some integer k. Prove it, and explain precisely how a true zero digit plus a fixed scale restores uniqueness.',
                  solution: [
                    'Parameterise readings: a reading is fixed by the place $m \\in \\mathbb{Z}$ of the rightmost group, giving $a \\cdot 60^{m+1} + b \\cdot 60^m = (60a + b) \\cdot 60^m = V \\cdot 60^m$.',
                    'So every reading lies in $\\{V \\cdot 60^j\\}$; conversely every $j \\in \\mathbb{Z}$ occurs by taking $m = j$ — the set is exactly the geometric family.',
                    'Ratio of two readings: $V \\cdot 60^{j_1} / (V \\cdot 60^{j_2}) = 60^{j_1 - j_2}$ — always a power of sixty, proving the second claim.',
                    'Why zero repairs it: a written 0 occupies empty places, so a string of length $k$ has its rightmost group FORCED to the units place and every internal gap explicit — the reading map becomes single-valued.',
                    'Why the scale anchor matters: trailing zeros still leave «b0» able to mean $b \\cdot 60$ or $b \\cdot 3600$ unless the system agrees that a string ENDS at its last written digit — the decimal convention that makes the name unique (chapter 3’s representation theorem, now with no asterisks).',
                    'Hence the completion is two-part — a zero digit AND an end-of-string convention — and that two-part whole is what Babylon never wrote and India did.',
                  ],
                  answer:
                    'Readings = {V·60^j : j ∈ ℤ}; any two differ by 60^k; uniqueness returns when zero fills every empty place and the string’s end anchors the units place',
                },
              ],
            },
          ],
        },
        { kind: 'formula', name: 'Sexagesimal value', latex: '\\langle a_1, \\ldots, a_k \\rangle_{60} = \\sum_{i=1}^{k} a_i \\cdot 60^{k-i}', note: '⟨1,13,46⟩₆₀ = 4,426; digits by repeated division by 60' },
        { kind: 'formula', name: 'The ambiguity family', latex: '\\mathrm{readings}(\\langle a\\,b\\rangle) = \\{(60a+b) \\cdot 60^j : j \\in \\mathbb{Z}\\}', note: '«1 20» → 80·60^j: …, 1/45, 4/3, 80, 4,800, …' },
        { kind: 'formula', name: 'Mayan Long Count value', latex: '144{,}000\\,b + 7{,}200\\,k + 360\\,t + 20\\,u + g', note: 'the 18 × 20 kink at the tun; 9.9.16.0.0 = 1,366,560 days' },
        { kind: 'formula', name: 'Regular numbers (base 60)', latex: 'n = 2^a 3^b 5^c \\iff 1/n \\text{ terminates in base } 60', note: '34 of n ≤ 100 vs 15 in base ten — why sixty divides' },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'The base-sixty legacy is a permanent exam staple: degrees–minutes–seconds conversions (1° = 60′, 1′ = 60″), clock-angle and time problems, and "convert to hours/minutes/seconds" items all run on the sexagesimal fossil — the same place-value arithmetic as lesson 3.3’s base conversions (ans-arithmetic-in-other-bases), just with 60 in the radix seat. Aptitude number-system sets occasionally dress Babylonian/Mayan conversions as novelty base-conversion questions — the ambiguity theorem is the reason a well-set item always anchors the scale. The regular-number idea returns as "which fractions terminate" in decimal-versus-fraction items (FM 5.2 banked the base-ten case). All items here are exam-style; none reproduce a past paper.',
        },
        { kind: 'para', text: 'Two systems, one engine, one shared flaw — quantified. Babylon floated on a ladder it could not anchor; the Maya anchored theirs but bent it for the calendar and left zero half-promoted. What neither had was a zero that behaves like every other digit, everywhere, in a base nobody had to bend. The next lesson closes the chapter with the civilisation that wrote it — and with the number that made every other number easy to name.' },
      ],
    },
  ],
  plannedLessons: ['The Indian Decimal Revolution and Zero'],
}
