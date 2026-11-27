import type { Lesson } from '../../../src/data/library/types'

const c13 = { ink: '#166534', mid: '#65a30d', teal: '#0d9488', tealInk: '#0f766e', amber: '#d97706', orange: '#ea580c', red: '#dc2626', green: '#16a34a', panel: '#fef3c7', panel2: '#ffedd5', sep: '#fcd34d', faint: '#5eead4', white: '#ffffff', paper: '#fffdf5' }
const f13 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

const wh1CSvg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${Array.isArray(body) ? body.join('') : body}</svg>`
const wh1CTxt = (x: number, y: number, s: string, size = 13, color = c13.ink, anchor = 'middle', weight = '600'): string =>
  `<text x="${x}" y="${y}" font-family="${f13}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
const wh1CLine = (x1: number, y1: number, x2: number, y2: number, color = c13.ink, w = 2.5, dash = ''): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
const wh1CBox = (x: number, y: number, w: number, h: number, fill: string, stroke: string, r = 8): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
const wh1CDot = (x: number, y: number, color = c13.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`
const wh1CArrow = (x1: number, y1: number, x2: number, y2: number, color = c13.amber, w = 2): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  const rad = (a * Math.PI) / 180
  const hx = x2 - 9 * Math.cos(rad), hy = y2 - 9 * Math.sin(rad)
  const v: [number, number] = [-Math.sin(rad), Math.cos(rad)]
  const p1 = `${hx + v[0] * 6},${hy + v[1] * 6}`
  const p2 = `${hx - v[0] * 6},${hy - v[1] * 6}`
  return `<line x1="${x1}" y1="${y1}" x2="${hx}" y2="${hy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${x2},${y2} ${p1} ${p2}" fill="${color}"/>`
}

/* wh1C figure functions                                               */

const wh1CF1 = (): string => {
  const b: string[] = []
  const y = 180, x0 = 60, x1 = 560
  b.push(wh1CLine(x0, y, x1, y, c13.ink, 2.6))
  const ticks: Array<[number, string]> = [[100, '\u2212200'], [190, '\u2212100'], [280, '\u22121'], [320, '1'], [410, '100'], [500, '200']]
  for (const [x, lab] of ticks) {
    b.push(wh1CLine(x, y - 8, x, y + 8, c13.ink, 2.2))
    b.push(wh1CTxt(x, y + 26, lab, 12.5, c13.ink))
  }
  b.push(wh1CTxt(280, y - 18, 'BCE', 12.5, c13.tealInk))
  b.push(wh1CTxt(320, y - 18, 'CE', 12.5, c13.tealInk))
  b.push(wh1CLine(300, y - 34, 300, y + 34, c13.amber, 2.2, '5 4'))
  b.push(`<circle cx="300" cy="98" r="44" fill="${c13.panel}" stroke="${c13.amber}" stroke-width="2.4"/>`)
  b.push(wh1CTxt(300, 90, 'no year 0', 13, c13.amber))
  b.push(wh1CTxt(300, 108, '1 BCE ->', 11.5, c13.amber))
  b.push(wh1CTxt(300, 124, '1 CE', 11.5, c13.amber))
  b.push(wh1CLine(300, 142, 300, y - 12, c13.amber, 2))
  b.push(wh1CArrow(436, 252, 500, 210, c13.tealInk))
  b.push(wh1CBox(392, 256, 200, 66, c13.paper, c13.tealInk))
  b.push(wh1CTxt(492, 280, 'spans across the line', 12, c13.tealInk))
  b.push(wh1CTxt(492, 300, 'use A + B \u2212 1', 13, c13.tealInk))
  b.push(wh1CTxt(310, 352, 'The era line is a doorway one year wide: 1 BCE is followed directly by 1 CE.', 12.5, c13.amber))
  return wh1CSvg(620, 372, 'BCE and CE number line with the no-year-zero magnifier on the era joint', b)
}

const wh1CF2 = (): string => {
  const b: string[] = []
  b.push(wh1CBox(40, 30, 240, 210, c13.paper, c13.ink))
  b.push(wh1CTxt(160, 56, 'October 1582', 13.5, c13.ink))
  for (let d = 1; d <= 31; d++) {
    const col = (d - 1) % 7, row = Math.floor((d - 1) / 7)
    const x = 66 + col * 30, yy = 76 + row * 26
    const gone = d >= 5 && d <= 14
    b.push(wh1CTxt(x, yy + 16, String(d), 11.5, gone ? c13.red : c13.ink))
  }
  b.push(wh1CLine(74, 88, 130, 156, c13.red, 2.2))
  b.push(wh1CTxt(160, 256, 'Thu 4 -> Fri 15', 12.5, c13.red))
  b.push(wh1CTxt(160, 274, '10 dates skipped', 12.5, c13.amber))
  b.push(wh1CBox(340, 30, 240, 210, c13.paper, c13.ink))
  b.push(wh1CTxt(460, 56, 'September 1752', 13.5, c13.ink))
  for (let d = 1; d <= 30; d++) {
    const col = (d - 1) % 7, row = Math.floor((d - 1) / 7)
    const x = 366 + col * 30, yy = 76 + row * 26
    const gone = d >= 3 && d <= 13
    b.push(wh1CTxt(x, yy + 16, String(d), 11.5, gone ? c13.red : c13.ink))
  }
  b.push(wh1CLine(374, 88, 400, 140, c13.red, 2.2))
  b.push(wh1CTxt(460, 256, 'Wed 2 -> Thu 14', 12.5, c13.red))
  b.push(wh1CTxt(460, 274, '11 dates skipped', 12.5, c13.amber))
  b.push(wh1CBox(150, 306, 320, 64, c13.panel, c13.amber))
  b.push(wh1CTxt(310, 330, 'why 11 and not 10?', 12.5, c13.amber))
  b.push(wh1CTxt(310, 350, '1700: a Julian leap, not a Gregorian one', 12, c13.amber))
  b.push(wh1CTxt(310, 400, 'Both jumps kept the weekday cycle unbroken \u2014 only the dates vanished.', 12.5, c13.amber))
  return wh1CSvg(620, 418, 'Reform-jump panel: October 1582 skips 10 dates, September 1752 skips 11', b)
}

const wh1CF3 = (): string => {
  const b: string[] = []
  const x0 = 50, x1 = 570, y = 120, yMin = 400, yMax = 1600
  const fx = (yr: number): number => x0 + ((yr - yMin) / (yMax - yMin)) * (x1 - x0)
  b.push(wh1CLine(x0, y, x1, y, c13.ink, 2.6))
  const bands: Array<[number, number, string, string]> = [[400, 476, 'Ancient', c13.teal], [476, 1453, 'Medieval', c13.amber], [1453, 1600, 'Modern', c13.green]]
  for (const [a, c2, nm, col] of bands) {
    b.push(wh1CBox(fx(a), 56, fx(c2) - fx(a), 42, col, c13.ink, 6))
    b.push(wh1CTxt((fx(a) + fx(c2)) / 2, 83, nm, 12.5, c13.white))
  }
  for (const [yr, lab] of [[476, '476'], [1453, '1453']] as Array<[number, string]>) {
    b.push(wh1CLine(fx(yr), 56, fx(yr), y + 10, c13.red, 2.2, '5 4'))
    b.push(wh1CTxt(fx(yr), y + 30, lab, 12.5, c13.red))
  }
  b.push(wh1CArrow(fx(476) + 4, 210, fx(1453) - 4, 210, c13.orange))
  b.push(wh1CTxt((fx(476) + fx(1453)) / 2, 200, 'medieval band = 977 years', 12.5, c13.orange))
  b.push(wh1CLine(fx(1200), 56, fx(1200), 40, c13.tealInk, 2.2))
  b.push(wh1CTxt(fx(1200), 30, 'AP baseline c. 1200', 12, c13.tealInk))
  b.push(wh1CTxt(310, 262, 'The boundaries are conventions: 476 (Romulus Augustulus deposed), 1453 (Constantinople falls) \u2014 chosen, not found.', 12.5, c13.amber))
  return wh1CSvg(620, 288, 'Periodisation convention timeline with ancient, medieval and modern bands and the 977-year medieval width', b)
}

const wh1CF4 = (): string => {
  const b: string[] = []
  const rows: Array<[string, string, string]> = [['CE', '2026', c13.ink], ['Saka', '1948', c13.teal], ['Vikrama Samvat', '2083', c13.amber], ['Hijri', '\u2248 1447', c13.orange]]
  rows.forEach(([era, val, col], i) => {
    const y = 48 + i * 54
    b.push(wh1CBox(70, y, 200, 42, c13.paper, col))
    b.push(wh1CTxt(170, y + 27, era, 13, col))
    b.push(wh1CBox(300, y, 160, 42, c13.panel, col))
    b.push(wh1CTxt(380, y + 27, val, 13.5, col))
    if (i < rows.length - 1) b.push(wh1CLine(170, y + 42, 170, y + 54, c13.ink, 1.6))
  })
  b.push(wh1CTxt(170, 286, 'one year, four labels', 12.5, c13.ink))
  b.push(wh1CTxt(490, 286, '2026 \u2212 78 = 1948', 12, c13.teal, 'middle'))
  b.push(wh1CTxt(490, 306, '2026 + 57 = 2083', 12, c13.amber))
  b.push(wh1CTxt(310, 344, 'Every era counts from its own epoch; conversion is arithmetic, not opinion.', 12.5, c13.amber))
  return wh1CSvg(620, 364, 'Era conversion chart for 2026: CE, Saka 1948, Vikrama Samvat 2083, Hijri about 1447', b)
}

const wh1CF5 = (): string => {
  const b: string[] = []
  const rows: Array<[string, string]> = [['1st', '1\u2013100'], ['2nd', '101\u2013200'], ['11th', '1001\u20131100'], ['20th', '1901\u20132000'], ['21st', '2001\u20132100'], ['3rd BCE', '300\u2013201']]
  rows.forEach(([nm, rng], i) => {
    const y = 44 + i * 40
    b.push(wh1CBox(150, y, 110, 32, c13.paper, c13.ink, 6))
    b.push(wh1CTxt(205, y + 21, nm, 12.5, c13.ink))
    b.push(wh1CBox(280, y, 160, 32, c13.panel, c13.amber, 6))
    b.push(wh1CTxt(360, y + 21, rng, 12.5, c13.amber))
    b.push(wh1CArrow(262, y + 16, 278, y + 16, c13.ink, 1.6))
  })
  b.push(wh1CTxt(500, 130, 'century N covers', 12, c13.tealInk))
  b.push(wh1CTxt(500, 150, 'the years', 12, c13.tealInk))
  b.push(wh1CTxt(500, 170, '(N\u22121)00 + 1', 12.5, c13.tealInk))
  b.push(wh1CTxt(500, 190, 'through N00', 12.5, c13.tealInk))
  b.push(wh1CTxt(310, 316, 'BCE centuries run BACKWARDS: the 3rd century BCE is 300\u2013201, not 201\u2013300.', 12.5, c13.amber))
  return wh1CSvg(620, 336, 'Century-numbering ladder from the 1st to the 21st century and the reversed 3rd century BCE', b)
}

const wh1CF6 = (): string => {
  const b: string[] = []
  const x0 = 70, x1 = 560, y = 150
  const yMin = -60, yMax = 2000
  const fx = (yr: number): number => x0 + ((yr - yMin) / (yMax - yMin)) * (x1 - x0)
  b.push(wh1CLine(x0, y, x1, y, c13.ink, 2.6))
  const marks: Array<[number, string, string]> = [[-45, 'Julian calendar', c13.teal], [1582, 'Gregorian reform', c13.amber], [1752, 'Britain adopts', c13.orange], [1923, 'Greece adopts', c13.green]]
  for (const [yr, lab, col] of marks) {
    b.push(wh1CLine(fx(yr), y - 8, fx(yr), y + 8, col, 2.4))
    b.push(wh1CDot(fx(yr), y, col, 6))
    b.push(wh1CTxt(fx(yr), y - 22, lab, 12, col))
    const lbl = yr < 0 ? `\u2212${Math.abs(yr)}` : String(yr)
    b.push(wh1CTxt(fx(yr), y + 28, lbl, 12, col))
  }
  b.push(wh1CArrow(fx(-45) + 6, y + 64, fx(1582) - 6, y + 64, c13.tealInk))
  b.push(wh1CTxt((fx(-45) + fx(1582)) / 2, y + 56, '1627 years', 12, c13.tealInk))
  b.push(wh1CArrow(fx(1582) + 4, y + 96, fx(1752) - 4, y + 96, c13.orange))
  b.push(wh1CTxt((fx(1582) + fx(1752)) / 2, y + 88, '170 years', 12, c13.orange))
  b.push(wh1CArrow(fx(1752) + 4, y + 64, fx(1923) - 4, y + 64, c13.green))
  b.push(wh1CTxt((fx(1752) + fx(1923)) / 2, y + 56, '171 years', 12, c13.green))
  b.push(wh1CTxt(310, 288, 'Reform spread across seventeen centuries \u2014 calendars change by decree, and decrees travel slowly.', 12.5, c13.amber))
  return wh1CSvg(620, 312, 'Calendar-reform timeline: Julian 45 BCE, Gregorian 1582, Britain 1752, Greece 1923', b)
}

export const lessonWh103: Lesson = {
  id: 'wh-time-periodisation-and-the-calendar',
  number: '1.3',
  title: 'Time, Periodisation and the Calendar',
  concepts: [
    'BCE and CE',
    'no year zero',
    'the Gregorian reform',
    'leap years',
    'Saka era',
    'Vikrama Samvat',
    'Hijri calendar',
    'periodisation',
  ],
  objectives: [
    'Explain why BCE/CE counting has no year zero and apply the span rule A + B \u2212 1 across the era line',
    'Place any year in its century and millennium, counting BCE centuries backwards correctly',
    'Recount the Julian and Gregorian reforms with their arithmetic: 365.2425 days, the 10-day jump of 1582, the 11-day jump of 1752',
    'Classify leap years by the Gregorian rule and compute leap censuses (25 in 1901\u20132000, 24 in 2001\u20132100)',
    'Convert a CE year to Saka, Vikrama Samvat and an approximate Hijri year',
    'Treat periodisation as convention: criticise Mill\u2019s 1817 triad and state the 476/1453 boundaries with their 977-year medieval band',
  ],
  prerequisites: ['wh-how-history-is-written', 'wh-sources-literary-and-archaeological'],
  sources: ['wh-web-calendars', 'wh-ncert-canon', 'wh-survey-ground'],
  blocks: [
    { kind: 'heading', text: 'Time as convention' },
    { kind: 'para', text: 'Nothing in this lesson is natural. That is its first and most important claim. The year 2026, the twenty-first century, the label \u201cmedieval\u201d, the fact that Ashoka\u2019s edicts are \u201cthird century BCE\u201d \u2014 every one of these is a human convention, adopted for human reasons, and reversible in principle by a different convention. The natural facts underneath are modest: the earth orbits the sun in about 365.2422 days; the moon rounds its phases in about 29.5 days; the earth spins. Everything else \u2014 where years begin, how they are numbered, which king\u2019s coronation they count from, how the past is sliced into named ages \u2014 was decided by people, and the decisions can be dated, named and criticised.' },
    { kind: 'para', text: 'The historian inherits these conventions rather than inventing them, and inherits them layered. An Indian inscription may date itself in the regnal year of a king, the Saka era, the Vikrama Samvat or the Hijri year; a Mughal farman may carry both the Hijri date and the corresponding Ilahi year; a modern edition of that farman will add the Gregorian equivalent in brackets. Reading any document therefore begins with a small piece of arithmetic \u2014 converting its date into something comparable \u2014 and this lesson makes that arithmetic explicit, checkable and quick.' },
    { kind: 'para', text: 'There is also a warning to issue early, because it will repeat at the end of the lesson in a larger form: conventions are tools, and tools wear out when they are mistaken for truths. The calendar you use shapes nothing about the past itself; the period labels you use shape a great deal about how you interpret it. Time-keeping is a solved problem; periodisation is a live argument. Keeping those two apart \u2014 the arithmetic of conversion on one side, the debate about division on the other \u2014 is what this lesson trains.' },
    { kind: 'para', text: 'The plan runs in four movements. First the counting of years \u2014 BCE and CE, and the famous quirk that there is no year zero. Second the calendar reforms that fixed the year\u2019s length, from Julius Caesar\u2019s 365.25 to Gregory XIII\u2019s 365.2425. Third India\u2019s own era systems \u2014 Saka, Vikrama Samvat, Hijri \u2014 with their conversion arithmetic. And finally periodisation itself: James Mill\u2019s flawed triad, the 476/1453 convention, and why this book begins its world survey at the year 1200.' },
    { kind: 'heading', text: 'Counting the years: BCE and CE' },
    { kind: 'callout', tone: 'definition', title: 'BC / BCE', text: 'BC (\u201cbefore Christ\u201d) and BCE (\u201cbefore the common era\u201d) label the years counting DOWN to the era boundary: 3 BCE comes after 4 BCE and immediately before 1 BCE. The two labels number exactly the same years; BCE is the confession-neutral phrasing now standard in scholarship.' },
    { kind: 'callout', tone: 'definition', title: 'AD / CE', text: 'AD (anno Domini, \u201cin the year of the Lord\u201d) and CE (\u201ccommon era\u201d) label the years counting UP from the era boundary: 1 CE, 2 CE, and so on. Again the labels number identical years. The counting starts at 1 \u2014 there is no year zero \u2014 because the system was built by a scholar who had no symbol for zero at all.' },
    { kind: 'para', text: 'The system\u2019s inventor was Dionysius Exiguus, a monk working in Rome, who devised the AD era in 525 CE for the least glamorous of purposes: an Easter table. Older tables counted years from the emperor Diocletian, and Dionysius refused to number the years of a Christian festival by a persecutor\u2019s reign. His alternative \u2014 counting from the incarnation \u2014 caught on slowly, then decisively through the Venerable Bede, whose Ecclesiastical History of the English People (731) used AD dating throughout and became one of medieval Europe\u2019s most-copied books. Note what Dionysius did NOT have: the digit zero, which reached Mediterranean arithmetic centuries later from India. So his count runs 1 BCE, then 1 CE, with nothing between \u2014 a numbering built without zero that has confused span arithmetic ever since.' },
    { kind: 'para', text: 'The confusion is worth one careful derivation, because every historical span in this book crosses the era line somewhere. The rule that emerges is short enough to memorise and strict enough to check: the span from A BCE to B CE is A + B \u2212 1. Figure 1 draws the trap itself \u2014 the joint where 1 BCE meets 1 CE with no zero between them \u2014 and the derivation below proves why the correction is exactly one.' },
    { kind: 'derivation', title: 'The span rule across the era line', statement: 'Find the number of years between a date in A BCE and a later date in B CE, given that the count runs 1 BCE, 1 CE with no year zero.', steps: [
      { label: 'Count down to 1 BCE', explanation: 'From year A BCE to year 1 BCE inclusive-of-start is A \u2212 1 steps: in a countdown, you pass years A, A\u22121, \u2026, 2, 1, and the steps between them number one fewer than the labels. Example: from 3 BCE to 1 BCE is 2 years, not 3.' },
      { label: 'Cross the joint', explanation: '1 BCE is followed immediately by 1 CE \u2014 the joint is one year wide. Crossing it adds exactly 1 year. There is no zeroth year to add a second step.' },
      { label: 'Count up in CE', explanation: 'From 1 CE to year B CE is B \u2212 1 steps by the ordinary fencepost count: from year 1 to year 14 is 13 years, not 14.' },
      { label: 'Assemble', explanation: 'Total span = (A \u2212 1) + 1 + (B \u2212 1) = A + B \u2212 1. The minus one is the price of the missing zero, and it appears once, not twice, because only one joint is crossed.' },
    ], result: 'The span from A BCE to B CE is A + B \u2212 1 \u2014 one less than naive addition, because the era line has no year zero.' },
    { kind: 'table', head: ['From', 'To', 'Span'], rows: [
      ['1 BCE', '1 CE', '1 (1 + 1 \u2212 1: the joint itself)'],
      ['Caesar assassinated, 44 BCE', 'Augustus dying, 14 CE', '57 (44 + 14 \u2212 1)'],
      ['Rosetta decree, 196 BCE', 'Stone found, 1799 CE', '1994 (196 + 1799 \u2212 1)'],
      ['Megasthenes in India, c. 302 BCE', 'Fa\u2011Hien arriving, 399 CE', '700 (302 + 399 \u2212 1)'],
      ['Romulus Augustulus deposed, 476 CE', 'This year, 2026 CE', '1550 (2026 \u2212 476, same era, no correction)'],
    ] },
    { kind: 'para', text: 'Read the table\u2019s last row against the rest, because it holds the rule\u2019s other half: when both dates sit on the same side of the line, ordinary subtraction works and no correction applies \u2014 from 476 CE to 2026 CE is just 1550. The correction belongs to the joint, not to history. Every quiz item and exercise below that crosses the line will use A + B \u2212 1, and every one that stays inside an era will not; keeping the two straight is the difference between a right answer and a confident wrong one.' },
    { kind: 'figure', caption: 'Figure 1. The era line as a number line. BCE years count down to the joint, CE years count up from it, and the magnifier shows the joint itself: 1 BCE is followed directly by 1 CE, with no year zero between. Spans crossing the line pay exactly one year of correction \u2014 the rule A + B \u2212 1.', svg: wh1CF1() },
    { kind: 'heading', text: 'Centuries and millennia' },
    { kind: 'para', text: 'The century is the workhorse unit of historical talk, and it is numbered by an off-by-one rule that trips even professionals. The Nth century CE covers the years (N\u22121)00 + 1 through N00: the 21st century is 2001 through 2100, the 20th was 1901\u20132000, and the millennial fireworks of 31 December 2000 celebrated the right night, one year later than the world\u2019s parties of 1999\u20132000. The same fencepost logic as the span rule drives it: a century is one hundred years, the first of them is year 1, so the hundredth of them is year 100.' },
    { kind: 'para', text: 'BCE centuries run backwards, which doubles the confusion. The 3rd century BCE is 300\u2013201 BCE, not 201\u2013300: it begins at the bigger number because BCE years count down. So Herodotus, born around 484 BCE, is a man of the 5th century BCE (500\u2013401), and the Indus civilisation\u2019s mature phase, around 2600\u20131900 BCE, sits in the 3rd millennium BCE (3000\u20132001). Whenever a BCE century is in play, write the band out \u2014 the discipline of writing it prevents the reversal error that no amount of confidence prevents.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) 2026 CE sits in the 21st century (2001\u20132100) and the 3rd millennium (2001\u20133000).',
      '(ii) Herodotus, c. 484 BCE, sits in the 5th century BCE (500\u2013401) \u2014 counting down.',
      '(iii) The 2nd millennium BCE is 2000\u20131001 BCE: the band\u2019s first year is its largest number.',
      '(iv) Ashoka\u2019s reign, c. 268\u2013232 BCE, spans the late 3rd century BCE \u2014 the same reversed band.',
    ] },
    { kind: 'figure', caption: 'Figure 2. The century-numbering ladder. Each century is a hundred-year band starting at (N\u22121)00 + 1: the 21st is 2001\u20132100. BCE bands run backwards \u2014 the 3rd century BCE is 300\u2013201 \u2014 which is why written-out bands beat mental arithmetic.', svg: wh1CF5() },
    { kind: 'heading', text: 'The calendar reforms' },
    { kind: 'para', text: 'A calendar is an attempt to make whole days fit a fractional year, and the fit is permanently imperfect: the tropical year \u2014 the cycle of seasons \u2014 runs about 365.2422 days. Rome\u2019s pre-Julian calendar drifted so badly that by Julius Caesar\u2019s time the civic spring festival was landing in winter. Caesar\u2019s fix, advised by the Alexandrian astronomer Sosigenes, came in two strokes: 46 BCE was stretched to 445 days \u2014 the annus confusionis, the \u201cyear of confusion\u201d \u2014 to realign the seasons at a stroke, and from 1 January 45 BCE the new Julian calendar ran 365 days with a leap day every fourth year: an average of exactly 365.25 days.' },
    { kind: 'para', text: 'The Julian year overshoots the tropical year by 365.25 \u2212 365.2422 = 0.0078 days per year \u2014 small, but a relay of small errors wins long races: one day of drift roughly every 1 / 0.0078 \u2248 128 years. By the sixteenth century the accumulated error mattered liturgically: the Church\u2019s spring equinox, fixed at the Council of Nicaea in 325 CE, had drifted about 1257 \u00d7 0.0078 \u2248 9.8 days, and Easter was separating from the seasons it was supposed to track. Pope Gregory XIII\u2019s reform, issued in the bull Inter gravissimas, corrected both the rule and the accumulated error at once.' },
    { kind: 'para', text: 'The correction was abrupt: in the reformed countries, Thursday 4 October 1582 was followed by Friday 15 October 1582 \u2014 ten dates simply never existed. The rule change was subtler: leap years are years divisible by 4, except century years (divisible by 100), unless they are divisible by 400. So 1600 and 2000 were leap years; 1700, 1800 and 1900 were not; 2100 will not be. The revised average year is 365 + 97/400 = 365.2425 days \u2014 within 0.0003 of the tropical year, drifting one full day only about every 3,300 years.' },
    { kind: 'derivation', title: 'The leap-year census', statement: 'Count the leap days the Gregorian rule places in 400 years, and derive the average year length the rule produces.', steps: [
      { label: 'The quarter-leaps', explanation: 'In 400 years the divisible-by-4 rule alone yields 100 candidate leap years \u2014 one for every fourth year.' },
      { label: 'The century exception', explanation: 'Of those candidates, the century years 100, 200, 300, \u2026, 400 are four in number; three of them (100, 200, 300) fail the divisible-by-400 test and lose their leap day. Only year 400 keeps it.' },
      { label: 'The census', explanation: 'Leap years per 400 = 100 \u2212 3 = 97. Check against the real bands: 1901\u20132000 contains 25 leap years (24 ordinary plus the quadricentennial 2000), and 2001\u20132100 contains 24 (2100 is not leap).' },
      { label: 'The average', explanation: 'Average year = 365 + 97/400 = 365.2425 days, against the tropical 365.2422 \u2014 the residual 0.0003 days per year is the best fit any simple integer rule achieves.' },
    ], result: '97 leap days per 400 years; the Gregorian average year is 365 + 97/400 = 365.2425 days.' },
    { kind: 'para', text: 'The reform\u2019s geography is its own lesson in how conventions actually spread: by decree, and slowly. Catholic states adopted the new calendar within a couple of years of 1582; Protestant and Orthodox states held out for generations. Britain held out longest among the major powers, and its belated adoption produced the second famous jump: the Calendar (New Style) Act of 1750 legislated that Wednesday 2 September 1752 be followed by Thursday 14 September 1752 \u2014 eleven dates skipped, not ten, because the extra 170 years since 1582 had added one more day of Julian drift (1700 was a Julian leap year but not a Gregorian one). Greece, the last European state to switch, held out until 1923.' },
    { kind: 'para', text: 'Britain\u2019s jump carried two further changes worth knowing. The Act also fixed 1 January as the start of the civil year \u2014 before 1752 the English year had begun on 25 March, Lady Day, so English documents dated \u201cJanuary 1751\u201d and \u201cJanuary 1752\u201d can belong to the same season a year apart by modern counting. And the eleven vanished dates entered folklore as the \u201ccalendar riots\u201d \u2014 the cry \u201cgive us our eleven days\u201d \u2014 of which historians find little firm evidence but lasting fame, partly through Hogarth\u2019s painting An Election Entertainment, which put the slogan on a banner. The legend\u2019s own career is a neat case study in how a vivid false memory outcompetes a dull documented truth.' },
    { kind: 'callout', tone: 'insight', title: 'The week that never broke', text: 'Across every one of these jumps \u2014 1582\u2019s ten days, 1752\u2019s eleven \u2014 the seven-day weekly cycle never broke. Thursday was followed by Friday even when fifteen dates had died between them. The week is older than either calendar and was carried through both untouched.' },
    { kind: 'figure', caption: 'Figure 3. The two reform jumps. October 1582 skips from Thursday the 4th to Friday the 15th (10 dates); September 1752 skips from Wednesday the 2nd to Thursday the 14th (11 dates \u2014 the extra day is 1700, a Julian leap year but not a Gregorian one). The weekday sequence marches through both jumps unbroken.', svg: wh1CF2() },
    { kind: 'para', text: 'The leap census of a real band is worth computing once by hand, because it exercises every clause of the rule. From 1901 to 2000: the divisible-by-4 years are 1904, 1908, \u2026, 2000 \u2014 that is (2000 \u2212 1904)/4 + 1 = 25 candidates. The century years in the band are 2000 alone, and 2000 divides by 400, so it keeps its leap day: the census is 25, of which 24 are ordinary leap years and one the quadricentennial. From 2001 to 2100: candidates 2004, \u2026, 2100 give (2100 \u2212 2004)/4 + 1 = 25, but 2100 is a century year not divisible by 400 \u2014 it loses its leap day, and the census falls to 24. The two bands differ by exactly the one century rule, which is the whole Gregorian correction made visible.' },
    { kind: 'heading', text: 'India\u2019s era systems' },
    { kind: 'para', text: 'India counted years by several eras simultaneously, and the modern reader of inscriptions meets all of them. The Saka era begins in 78 CE \u2014 its origin is debated (a Kushan victory year is one candidate), but its arithmetic is not: Saka = CE \u2212 78, so 2026 CE is Saka 1948. The Saka calendar in its reformed, solar form became the Indian national calendar by the calendar reform committee chaired by Meghnad Saha, adopted from 22 March 1957 \u2014 itself a date chosen to align with an era head. The Vikrama Samvat is older in legendary attribution and begins in 57 BCE: VS = CE + 57, so 2026 CE is VS 2083, and its new year falls around Diwali, giving Indian documents a season-offset as well as a number-offset.' },
    { kind: 'para', text: 'The Hijri era of the Islamic calendar counts lunar years from the Prophet\u2019s migration from Mecca to Medina in 622 CE. A lunar year of twelve lunar months runs about 354.367 days \u2014 some 11 days short of the solar year \u2014 so the Hijri year drifts through the seasons: 365 \u2212 354 \u2248 11 days per year, and about 32 solar years pass for every 33 lunar years (the totals 32 \u00d7 365.2422 = 11687.75 and 33 \u00d7 354.367 = 11694.11 sit within a week of each other). Converting 2026 CE gives (2026 \u2212 622) \u00d7 365.2422 / 354.367 \u2248 1447.6 \u2014 the year running in 2026 is Hijri 1447\u20131448, crossing 1448 during the summer. The conversion is approximate by nature: lunar and solar years do not share a rhythm, only a coincidence every third decade.' },
    { kind: 'example', title: 'Convert 2026 CE to Saka, Vikrama Samvat and Hijri', steps: [
      'Sol. Saka first: subtract the epoch, Saka = 2026 \u2212 78 = 1948.',
      'Now, Vikrama Samvat: add the epoch\u2019s distance, VS = 2026 + 57 = 2083 (with the Diwali new-year offset in mind for boundary months).',
      'Then, Hijri: count the solar years since 622 and convert to lunar ones \u2014 (2026 \u2212 622) \u00d7 365.2422 / 354.367 \u2248 1447.6.',
      'So the fractional Hijri year means 2026 CE straddles Hijri 1447\u20131448: mid-2026 sits deep inside 1448.',
      'Hence one Gregorian year, four labels: 2026 CE = Saka 1948 = VS 2083 = Hijri \u22481447\u20131448.',
    ] },
    { kind: 'figure', caption: 'Figure 4. The era-conversion chart for 2026: CE 2026, Saka 1948 (= 2026 \u2212 78), Vikrama Samvat 2083 (= 2026 + 57) and Hijri \u2248 1447\u20131448 (lunar years, drifting 11 days per solar year). Every era counts from its own chosen epoch; converting between them is fixed arithmetic, not interpretation.', svg: wh1CF4() },
    { kind: 'heading', text: 'Periodisation is a convention' },
    { kind: 'para', text: 'With the arithmetic of years secured, the lesson turns to its real argument: the division of the past into named periods. The most consequential example for Indian history is James Mill\u2019s The History of British India, published in 1817, which divided Indian history into Hindu, Muslim and British periods \u2014 named by the religion of the rulers. Mill never visited India; he worked from documents, in London, and his triad matched the colonial administrator\u2019s need for a past that made British rule the natural third act after two \u201cfailed\u201d systems. The division entered textbooks, examinations and the civil service\u2019s mental furniture, and its influence runs 2026 \u2212 1817 = 209 years and counting \u2014 longer than the British rule it served.' },
    { kind: 'para', text: 'The NCERT\u2019s class-8 textbook mounts the standard critique, and it is worth stating precisely: the trouble is not that Mill\u2019s periods have fuzzy edges \u2014 all periods do \u2014 but that the criterion is wrong. Religion of the ruler is not the clock of history: it hides the economy, the society, the lives of the ruled, and the fact that most of the subcontinent\u2019s people were ruled by kings of a different faith from their own for most of its history. A periodisation that sorts centuries by the rulers\u2019 church cannot see a famine, a trade route, a language shift or a peasant\u2019s day \u2014 which is to say, it cannot see most of the past it claims to divide.' },
    { kind: 'para', text: 'The European triad \u2014 ancient, medieval, modern \u2014 has its own convention to own. Its canonical boundary dates: antiquity ends in 476 CE, when the last western Roman emperor, Romulus Augustulus, was deposed by Odoacer; the medieval band then runs to 1453, the fall of Constantinople; everything after is modern. The medieval band is therefore 1453 \u2212 476 = 977 years wide \u2014 a longer span than from 1453 to today (573 years), a fact that surprises most people who use the word \u201cmedieval\u201d daily. Neither boundary is natural: the empire\u2019s eastern half ran on past 476 for a millennium, and 1453 mattered enormously in the Aegean and barely at all in the Americas or China. The dates are pegs we agree to hang eras on.' },
    { kind: 'para', text: 'Modern world-history courses handle this by choosing boundaries that match what the course actually studies. The AP World History course begins its main narrative around 1200 CE \u2014 a baseline chosen because the centuries after it carry the Mongol networks, the Indian Ocean trade system and the early global connections, not because 1200 saw any single event. This book follows the same logic in its own register: its second chapter is titled \u201cThe World Before 1200\u201d precisely to frame the baseline as a question \u2014 what did the world look like just before the networks closed? \u2014 rather than as a wall the past stops at. Periodisation done honestly is a lens choice, declared and defended, not a fact discovered.' },
    { kind: 'callout', tone: 'warn', title: 'Never present a period name as if nature made it', text: '\u201cAncient\u201d, \u201cmedieval\u201d, \u201cmodern\u201d, \u201crenaissance\u201d, \u201ccolonial\u201d, \u201cindependence-era\u201d: every one of these is a historian\u2019s choice with an argument behind it and a use in front of it. The discipline\u2019s rule is to name the convention, cite its boundary dates when they matter, and stay ready to swap the lens when the question changes. A period label that goes unexamined quietly decides what you are able to see \u2014 which is exactly what Mill\u2019s triad did to two centuries of Indian history.' },
    { kind: 'figure', caption: 'Figure 5. The periodisation convention on one axis: Ancient to 476 (Romulus Augustulus deposed), Medieval from 476 to 1453 (fall of Constantinople) \u2014 a 977-year band \u2014 and Modern after 1453, with the AP World c. 1200 baseline marked inside the medieval band for comparison. Every boundary on this line is a convention chosen by historians, not an event the past announced.', svg: wh1CF3() },
    { kind: 'callout', tone: 'exam', title: 'Where this is examined', text: 'UPSC prelims tests chronology arithmetic directly \u2014 era conversions (Saka, Vikrama, Hijri), century placement, and span computations that punish the no-year-zero error \u2014 and GS-I essay questions ask candidates to criticise periodisation schemes (Mill\u2019s 1817 triad is the standard prompt). UGC NET History expects the calendar reforms by date and arithmetic (45 BCE, 1582\u2019s ten days, 1752\u2019s eleven) and AP World\u2019s periodization skill asks students to justify period boundaries with arguments, not recite them.' },
    { kind: 'terms', items: [
      { term: 'BCE / CE', def: '\u201cBefore the common era\u201d and \u201ccommon era\u201d \u2014 the confession-neutral labels for the years counting down to and up from the era boundary.' },
      { term: 'No year zero', def: 'The count runs 1 BCE, 1 CE with nothing between \u2014 because Dionysius Exiguus built it in 525 CE without the digit zero. Hence the span rule A + B \u2212 1.' },
      { term: 'Century rule', def: 'The Nth century CE covers (N\u22121)00 + 1 through N00; BCE centuries run backwards (3rd century BCE = 300\u2013201).' },
      { term: 'Julian calendar', def: 'Caesar\u2019s reform, effective 1 January 45 BCE after the 445-day year of confusion: 365 days with a leap every fourth year, averaging 365.25 days.' },
      { term: 'Gregorian calendar', def: 'Gregory XIII\u2019s 1582 reform: the century exception to the leap rule, average 365 + 97/400 = 365.2425 days, and a one-time 10-date jump.' },
      { term: 'Leap year rule', def: 'Divisible by 4, except century years, unless divisible by 400: 1600 and 2000 leap; 1700, 1800, 1900, 2100 not.' },
      { term: 'Tropical year', def: 'The cycle of the seasons, about 365.2422 days \u2014 the quantity every calendar approximates.' },
      { term: 'Saka era', def: 'Indian era from 78 CE; Saka = CE \u2212 78, the basis of the Indian national calendar adopted in 1957.' },
      { term: 'Vikrama Samvat', def: 'Indian era from 57 BCE; VS = CE + 57, with the new year around Diwali.' },
      { term: 'Hijri calendar', def: 'Lunar era from 622 CE: years of about 354 days drifting 11 days per solar year \u2014 about 33 lunar years per 32 solar.' },
      { term: 'Periodisation', def: 'The division of the past into named periods \u2014 a convention to be declared and argued, never mistaken for a natural fact.' },
    ] },
    { kind: 'formula', name: 'The span rule', latex: 'A + B - 1', note: 'years from A BCE to B CE; there is no year zero' },
    { kind: 'formula', name: 'The Gregorian average year', latex: '365 + \\frac{97}{400} = 365.2425', note: '97 leap days per 400 years, against the tropical 365.2422' },
    { kind: 'formula', name: 'The Saka conversion', latex: 'Saka = CE - 78', note: '2026 \u2192 1948' },
    { kind: 'formula', name: 'The Vikrama conversion', latex: 'VS = CE + 57', note: '2026 \u2192 2083' },
    { kind: 'formula', name: 'The Hijri drift', latex: '365 - 354 = 11', note: 'days per year; 32 solar \u2248 33 lunar years' },
    { kind: 'quiz', title: 'Self-check quiz', items: [
      { q: 'Between the year 1 BCE and the year 1 CE there is \u2026', options: ['no year at all \u2014 there is no year zero', 'a year zero, lasting one year', 'a decade, the lost years', 'an intercalary month of 30 days'], answer: 0, explain: 'Dionysius Exiguus devised the count in 525 CE without a zero digit, so 1 BCE is followed immediately by 1 CE \u2014 which is why spans across the line cost one year: A + B \u2212 1. Options (b), (c) and (d) invent periods that no calendar of the tradition contains.' },
      { q: 'The Gregorian calendar\u2019s average year length is \u2026', options: ['365.25 days', '365 days exactly', '365.2425 days', '365.2422 days'], answer: 2, explain: 'The Gregorian rule drops 3 leap days per 400 years: 365 + 97/400 = 365.2425 days. Option (a) is the Julian average; option (d) is the tropical year being approximated \u2014 the residual 0.0003 is the point of the reform.' },
      { q: 'The year in which Britain skipped eleven calendar dates was \u2026', options: ['1582', '1750', '1600', '1752'], answer: 3, explain: 'The Calendar (New Style) Act made Wednesday 2 September 1752 be followed by Thursday 14 September \u2014 eleven dates, the ten of 1582 plus one extra drift day from 1700. Option (a) is Rome\u2019s ten-day jump; option (b) is the Act\u2019s year, not the jump\u2019s.' },
      { q: '2026 CE converts to which Saka year?', options: ['2083', '1948', '1447', '1868'], answer: 1, explain: 'Saka = CE \u2212 78, and 2026 \u2212 78 = 1948. Option (a) is the Vikrama Samvat answer (CE + 57); option (c) is the Hijri band; option (d) is a distractor near the 1857 revolt \u2014 a date with no era arithmetic here.' },
      { q: 'The division of history into ancient, medieval and modern is best described as \u2026', options: ['a convention \u2014 boundaries chosen by historians for stated reasons', 'a natural fact discovered by geologists', 'a division fixed by the Gregorian reform', 'a scheme inherited unchanged from Rome'], answer: 0, explain: 'Periodisation is a convention: 476 and 1453 are chosen pegs with arguments behind them, and Mill\u2019s 1817 Hindu\u2013Muslim\u2013British triad shows how a bad criterion can hide a century\u2019s worth of questions. The other options naturalise what historians deliberately built.' },
    ] },
    { kind: 'exercises', title: 'Exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Compute each span, watching the era line: (i) 1 BCE to 1 CE; (ii) Caesar\u2019s assassination 44 BCE to Augustus\u2019s death 14 CE; (iii) 476 CE to 2026 CE.', solution: [
          'Sol. (i) crosses the joint: 1 + 1 \u2212 1 = 1 year.',
          '(ii) crosses the line: 44 + 14 \u2212 1 = 57 years.',
          '(iii) stays inside CE: 2026 \u2212 476 = 1550 years, no correction.',
          'Hence: 1, 57 and 1550 \u2014 the correction applies only when the span crosses the joint.',
        ], answer: '(i) 1, (ii) 44 + 14 \u2212 1 = 57, (iii) 2026 \u2212 476 = 1550' },
        { q: 'Place each year in its century: (i) 2026 CE; (ii) Herodotus born c. 484 BCE; (iii) the mature Indus phase c. 2600 BCE.', solution: [
          'Sol. (i) CE centuries count up: 2001\u20132100 is the 21st, and 2026 sits inside it.',
          '(ii) BCE centuries count down: 500\u2013401 is the 5th century BCE, and 484 sits inside it.',
          '(iii) 2600 BCE sits in the 3rd millennium BCE (3000\u20132001), within the 27th century BCE (2700\u20132601).',
          'Hence: 21st century; 5th century BCE; 3rd millennium BCE.',
        ], answer: '(i) 21st century, (ii) 5th century BCE, (iii) 3rd millennium BCE', figures: [
          { caption: 'The century-numbering ladder for the solution: the Nth century runs (N\u22121)00 + 1 to N00 \u2014 so 2026 sits in the 21st band 2001\u20132100, and the 3rd century BCE runs backwards, 300\u2013201.', svg: wh1CF5() },
        ] },
        { q: 'State the Gregorian leap rule in one sentence and classify 2000, 1900 and 2100.', solution: [
          'Sol. The rule: divisible by 4, except century years, unless divisible by 400.',
          '2000: divisible by 400 \u2014 a leap year (the quadricentennial case).',
          '1900: century year not divisible by 400 \u2014 not a leap year.',
          '2100: century year not divisible by 400 \u2014 not a leap year.',
          'Hence 2000 leap; 1900 and 2100 not \u2014 the century exception in action twice.',
        ], answer: '2000 leap; 1900 not leap; 2100 not leap' },
      ] },
      { level: 'L2', questions: [
        { q: 'The Rosetta decree is 196 BCE and the stone was found in 1799 CE; Megasthenes reached India c. 302 BCE and Fa\u2011Hien in 399 CE. Compute both spans and say which rule each used.', solution: [
          'Sol. Rosetta: 196 + 1799 \u2212 1 = 1994 years \u2014 the span crosses the era line, so the no-year-zero correction applies.',
          'Travellers: 302 + 399 \u2212 1 = 700 years \u2014 same crossing, same correction.',
          'Both use A + B \u2212 1 because both cross the joint exactly once.',
          'Hence 1994 years in the ground, and 700 years between the two witnesses.',
        ], answer: '1994 = 196 + 1799 \u2212 1; 700 = 302 + 399 \u2212 1; both cross the era line' },
        { q: 'Count the leap years in 1901\u20132000 and in 2001\u20132100, showing where each count comes from.', solution: [
          'Sol. 1901\u20132000: the divisible-by-4 years run 1904 to 2000, that is (2000 \u2212 1904)/4 + 1 = 25 candidates.',
          'The only century year among them, 2000, divides by 400 \u2014 so it keeps its leap day: the census is 25.',
          '2001\u20132100: candidates 2004 to 2100 give (2100 \u2212 2004)/4 + 1 = 25, but 2100 fails the divisible-by-400 test.',
          'So the 2100 leap day is struck, and the census is 24.',
          'Hence 25 and 24 \u2014 the difference is exactly the century rule.',
        ], answer: '1901\u20132000: 25 leap years (incl. 2000); 2001\u20132100: 24 (2100 not leap)' },
        { q: 'Convert 2026 CE to the Saka and Vikrama Samvat years, and state roughly the Hijri year with the reason it is only rough.', solution: [
          'Sol. Saka: 2026 \u2212 78 = 1948.',
          'Vikrama Samvat: 2026 + 57 = 2083 (modulo the Diwali new-year offset at the band edges).',
          'Hijri: (2026 \u2212 622) \u00d7 365.2422 / 354.367 \u2248 1447.6 \u2014 so the year 1447 gives way to 1448 during 2026.',
          'The Hijri figure is rough because lunar years (about 354 days) drift 11 days per solar year \u2014 there is no fixed integer conversion.',
          'Hence: Saka 1948, VS 2083, Hijri \u22481447\u20131448.',
        ], answer: 'Saka 1948 = 2026 \u2212 78; VS 2083 = 2026 + 57; Hijri \u2248 1447.6 \u2192 1447\u20131448', figures: [
          { caption: 'The era-conversion chart for the solution: one year, 2026 CE, carrying four era labels \u2014 CE 2026, Saka 1948, VS 2083 and Hijri \u22481447 \u2014 each by its own epoch arithmetic.', svg: wh1CF4() },
        ] },
      ] },
      { level: 'L3', questions: [
        { q: 'The medieval band convention runs 476 to 1453. Compute its width in years, and compare it with the span from 1453 to 2026. Which is longer, and why does that surprise people?', solution: [
          'Sol. The medieval band: 1453 \u2212 476 = 977 years (both CE, plain subtraction).',
          'The modern span so far: 2026 \u2212 1453 = 573 years.',
          'So the medieval band is 977 \u2212 573 = 404 years LONGER than all of modernity to date.',
          'The surprise comes from usage: \u201cmedieval\u201d conjures a single static scene, so people underestimate how much change its 977 years must contain.',
          'Hence 977 vs 573 \u2014 the convention\u2019s own arithmetic argues against treating the middle ages as one moment.',
        ], answer: 'medieval = 977 years (1453 \u2212 476); modern so far = 573 (2026 \u2212 1453); medieval is 404 years longer' },
        { q: 'James Mill\u2019s History of British India appeared in 1817. Compute the years of its influence to 2026, and state the two standard criticisms of his Hindu\u2013Muslim\u2013British periodisation.', solution: [
          'Sol. The influence span: 2026 \u2212 1817 = 209 years (both CE, no correction).',
          'Criticism one \u2014 the criterion: religion of the rulers is not a clock of history; it hides economy, society and the ruled majority\u2019s experience.',
          'Criticism two \u2014 the authorship: Mill never visited India; the scheme was built from London documents to fit a colonial narrative in which British rule was the natural third act.',
          'So the triad organised textbooks for 209 years while being wrong at the level of its choosing principle.',
          'Hence: 209 years of influence, and a periodisation still cited as the textbook example of a bad criterion.',
        ], answer: '2026 \u2212 1817 = 209 years; criticised for the religion-of-rulers criterion and the unvisited-in-India colonial framing' },
        { q: 'Britain\u2019s 1752 jump skipped 11 dates while 1582\u2019s in Rome skipped 10. Reconstruct the arithmetic of the extra day.', solution: [
          'Sol. The Julian drift is 365.25 \u2212 365.2422 = 0.0078 days per year \u2014 one day roughly every 128 years.',
          'From Nicaea 325 to Gregory\u2019s 1582: 1257 years \u00d7 0.0078 \u2248 9.8 days, rounded to the 10 dates Rome skipped.',
          'Britain waited another 170 years: 1700 fell in between, and 1700 was a Julian leap year but NOT a Gregorian one \u2014 one extra day of divergence.',
          'So Britain\u2019s correction was the ten of 1582 plus the one of 1700: eleven dates.',
          'Hence 3 Sep 1752 \u2192 14 Sep 1752, with the weekday cycle never breaking.',
        ], answer: '10 (of 1582) + 1 (the 1700 Julian-not-Gregorian leap) = 11 dates', figures: [
          { caption: 'The calendar-reform timeline for the solution: Julian 45 BCE \u2192 Gregorian 1582 (1627 years) \u2192 Britain 1752 (170 years) \u2192 Greece 1923 (171 years) \u2014 the jumps sit at the first two arrows.', svg: wh1CF6() },
        ] },
      ] },
      { level: 'L4', questions: [
        { q: 'A pillar inscription is dated \u201cyear 21, in the month of Jyeshtha\u201d with no era named. List the questions you must answer before converting that date, and explain why each matters.', solution: [
          'Sol. First \u2014 whose year 21? A regnal year (the issuing king\u2019s reign), or an era year (Saka, Vikrama, Gupta)? The number alone cannot say.',
          'Second \u2014 if regnal, when did the reign begin, and did the year count start at coronation or at the new year after it? Both conventions existed.',
          'Third \u2014 if an era, which one, and is the month solar or lunar? A Jyeshtha of a lunar calendar does not match a Jyeshtha of a solar one.',
          'Fourth \u2014 is the document genuine, and is the date part of the original carving or a later addition? External criticism precedes calendar arithmetic.',
          'Only with those answers does the conversion become arithmetic; without them it is a guess wearing a date\u2019s clothing.',
        ], answer: 'identify regnal-vs-era, the epoch or reign start, the solar-vs-lunar month, and the date\u2019s genuineness \u2014 then convert' },
        { q: 'An English parish register notes a baptism on \u201c5 March 1751\u201d. A modern catalogue files it under 1751. Explain precisely what is ambiguous, and give the two possible modern years.', solution: [
          'Sol. Before the Calendar (New Style) Act took effect, the English civil year began on 25 March \u2014 Lady Day \u2014 not 1 January.',
          'So \u201c5 March 1751\u201d in old style counting belongs to the civil year 1751 that was still running toward 24 March.',
          'By modern (new style) counting, that 5 March sits in 1752 \u2014 the January\u2013March stretch of the old civil year 1751 is the later calendar year.',
          'Hence the ambiguity: old style 1751 = new style 1752 for dates between 1 January and 24 March.',
          'So the baptism was in March of 1752 by modern reckoning \u2014 catalogues that file it under 1751 reproduce the old-style error.',
        ], answer: 'old-style 5 March 1751 = new-style March 1752 (the year began 25 March before 1752)' },
        { q: 'A student writes: \u201cThe Indus civilisation is older than Egypt\u2019s pyramids because 2600 BCE is bigger than 2560 BCE.\u201d Diagnose the error and give the correct comparison.', solution: [
          'Sol. The error: BCE years count DOWN toward the era line \u2014 a larger BCE number is EARLIER, not later.',
          'So 2600 BCE is 40 years before 2560 BCE, and the Indus mature phase beginning c. 2600 BCE predates the Great Pyramid\u2019s completion c. 2560 BCE by about 40 years.',
          'The student read BCE numbers as if they were CE numbers \u2014 the reversal error that also flips BCE centuries.',
          'Hence the conclusion happens to survive here, but only by accident of the specific dates; the reasoning as stated is backwards.',
          'Correct rule: in BCE, bigger number = earlier; comparisons reverse.',
        ], answer: 'BCE counts down: 2600 BCE is 40 years earlier than 2560 BCE \u2014 the student\u2019s reasoning is reversed even where the conclusion survives' },
      ] },
      { level: 'L5', questions: [
        { q: 'The Hijri year drifts through the seasons. Show why 32 solar years \u2248 33 lunar years by computing both totals in days, and state the consequence for Ramadan\u2019s seasonal position over a lifetime.', solution: [
          'Sol. Solar side: 32 \u00d7 365.2422 = 11687.75 days.',
          'Lunar side: 33 \u00d7 354.367 = 11694.11 days.',
          'The two totals sit within about 6.4 days of each other \u2014 so 33 lunar years track 32 solar years to better than a week.',
          'Equivalently, the lunar year loses 365 \u2212 354 \u2248 11 days per solar year, and 32 \u00d7 11 \u2248 352 days \u2248 one lunar year: the drift closes its own loop.',
          'Consequence: Ramadan (and every Hijri month) sweeps backward through the solar year by ~11 days annually, cycling through all the seasons in about 32\u201333 years \u2014 within a single lifetime.',
        ], answer: '32 \u00d7 365.2422 = 11687.75 vs 33 \u00d7 354.367 = 11694.11 days \u2014 so lunar months cycle the seasons every ~32\u201333 years' },
        { q: 'Design a one-page \u201cdate discipline\u201d checklist for a reader of Indian primary sources, covering era identification, the no-year-zero rule, old-style new years, and periodisation language. Justify each item in one line.', solution: [
          'Sol. Item one \u2014 identify the era before trusting any date: regnal, Saka, Vikrama, Hijri and Gregorian years all circulate in Indian documents, and misidentifying the era displaces a date by decades or centuries.',
          'Item two \u2014 apply A + B \u2212 1 on every span crossing the era line: the missing year zero silently inflates BCE-to-CE spans by one.',
          'Item three \u2014 check the new-year convention before filing January\u2013March dates: English documents before 1752 (and some Indian reckonings) start the year elsewhere than 1 January.',
          'Item four \u2014 convert seasonal-lunar months against a table, not a formula: Hijri and lunar-solar months have no fixed solar equivalents.',
          'Item five \u2014 treat period labels as claims, not facts: \u201cmedieval\u201d, \u201ccolonial\u201d and Mill\u2019s triad each carry an argument to be checked before they organise your reading.',
        ], answer: 'identify the era; apply the span rule; check new-year conventions; tabulate lunar months; question period labels' },
      ] },
      { level: 'L6', questions: [
        { q: 'Write the strongest defence you can of keeping periodisation at all, given everything this lesson says against reifying period names \u2014 and then state the one discipline that makes the defence hold.', solution: [
          'Sol. The defence: without named periods, the past is an undifferentiated stream \u2014 no curriculum, no comparison, no syllabus, no argument about change. Periods are the historian\u2019s indexing system: they let questions find their evidence.',
          'They also carry real periodisation claims: calling 476\u20131453 one band asserts (contestably) that the post-Roman Mediterranean holds together analytically; naming an \u201cearly modern\u201d world asserts global connection before industrialisation. Those assertions organize research agendas.',
          'And they are efficient: a shared convention (even Mill\u2019s, even where wrong) gives scholars a common vocabulary whose errors are at least discoverable and correctable \u2014 a vocabulary beats a grunt.',
          'The discipline that holds the defence: declaration. State the boundary, the criterion and the reason it serves the question at hand \u2014 the moment a period is treated as discovered rather than chosen, it stops indexing evidence and starts hiding it.',
          'Hence periods are kept as tools under declaration \u2014 the AP c. 1200 baseline and this book\u2019s \u201cWorld Before 1200\u201d chapter are the method in action.',
        ], answer: 'periods index the past and carry defensible claims \u2014 kept as declared conventions with stated boundaries, never as discovered facts' },
      ] },
    ] },

    /* ---------------- closing the chapter ---------------- */
    { kind: 'para', text: 'Three lessons, one craft, and the chapter\u2019s arc is now complete. Lesson 1.1 named the discipline itself \u2014 history as method, not list \u2014 and armed it with the two criticisms and the corroboration rule. Lesson 1.2 walked the two registers of evidence, the literary and the archaeological, and showed each failing where the other succeeds: Megasthenes against the edicts, the sherd against the chronicle, the Rosetta registers locking three scripts into one key. And this lesson built the frame everything else in this book hangs on: years that count without a zero, centuries that run backwards before the era line, calendars reformed by decree across seventeen centuries, India\u2019s own eras with their exact conversions \u2014 and periodisation held up as what it is, a declared convention, so that Mill\u2019s 1817 triad stands in the record as a warning rather than a map. That is the historian\u2019s craft assembled: question, evidence, criticism, arithmetic, and honest labels. Chapter 2 now puts it to work on the world itself \u2014 the world before 1200, from the first farmers to the empires of the classical age, read through exactly these registers.' },
  ],
}
