import type { Lesson } from '../../../src/data/library/types'

const c12 = { ink: '#166534', mid: '#65a30d', teal: '#0d9488', tealInk: '#0f766e', amber: '#d97706', orange: '#ea580c', red: '#dc2626', green: '#16a34a', panel: '#fef3c7', panel2: '#ffedd5', sep: '#fcd34d', faint: '#5eead4', white: '#ffffff', paper: '#fffdf5' }
const f12 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

const wh1BSvg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${Array.isArray(body) ? body.join('') : body}</svg>`
const wh1BTxt = (x: number, y: number, s: string, size = 13, color = c12.ink, anchor = 'middle', weight = '600'): string =>
  `<text x="${x}" y="${y}" font-family="${f12}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
const wh1BLine = (x1: number, y1: number, x2: number, y2: number, color = c12.ink, w = 2.5, dash = ''): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
const wh1BBox = (x: number, y: number, w: number, h: number, fill: string, stroke: string, r = 8): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
const wh1BDot = (x: number, y: number, color = c12.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`
const wh1BArrow = (x1: number, y1: number, x2: number, y2: number, color = c12.amber, w = 2): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  const rad = (a * Math.PI) / 180
  const hx = x2 - 9 * Math.cos(rad), hy = y2 - 9 * Math.sin(rad)
  const v: [number, number] = [-Math.sin(rad), Math.cos(rad)]
  const p1 = `${hx + v[0] * 6},${hy + v[1] * 6}`
  const p2 = `${hx - v[0] * 6},${hy - v[1] * 6}`
  return `<line x1="${x1}" y1="${y1}" x2="${hx}" y2="${hy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${x2},${y2} ${p1} ${p2}" fill="${color}"/>`
}

/* wh1B figure functions                                               */

const wh1BF1 = (): string => {
  const b: string[] = []
  b.push(wh1BBox(225, 14, 190, 42, c12.panel, c12.ink))
  b.push(wh1BTxt(320, 41, 'History\u2019s evidence', 14.5, c12.ink))
  b.push(wh1BArrow(320, 58, 320, 84))
  b.push(wh1BArrow(150, 108, 118, 168))
  b.push(wh1BArrow(490, 108, 505, 152))
  b.push(wh1BBox(55, 106, 190, 42, c12.teal, c12.tealInk))
  b.push(wh1BTxt(150, 133, 'Literary register', 13.5, c12.white))
  b.push(wh1BBox(395, 106, 190, 42, c12.green, c12.ink))
  b.push(wh1BTxt(490, 133, 'Archaeological register', 13, c12.white))
  const lit = ['Religious literature', 'Secular literature', 'Foreign accounts']
  lit.forEach((s, i) => {
    const y = 172 + i * 52
    b.push(wh1BArrow(118, 172 + i * 52 - 4, 96, y + 2))
    b.push(wh1BBox(14, y, 168, 38, c12.paper, c12.tealInk))
    b.push(wh1BTxt(98, y + 25, s, 12.5, c12.tealInk))
  })
  const arc = ['Epigraphy (inscriptions)', 'Numismatics (coins)', 'Monuments', 'Material culture']
  arc.forEach((s, i) => {
    const y = 158 + i * 48
    b.push(wh1BArrow(505, 158 + i * 48 - 4, 478, y + 2))
    b.push(wh1BBox(392, y, 196, 36, c12.paper, c12.ink))
    b.push(wh1BTxt(490, y + 23, s, 12, c12.ink))
  })
  b.push(wh1BTxt(98, 356, 'what writing preserved', 12, c12.tealInk, 'middle', '700'))
  b.push(wh1BTxt(490, 356, 'what the earth preserved', 12, c12.ink, 'middle', '700'))
  b.push(wh1BTxt(320, 400, 'Both registers must be criticised before either counts as evidence.', 13, c12.amber))
  b.push(wh1BLine(40, 372, 600, 372, c12.sep, 1.6))
  return wh1BSvg(640, 428, 'Source taxonomy tree: literary and archaeological registers of historical evidence', b)
}

const wh1BF2 = (): string => {
  const b: string[] = []
  b.push(wh1BBox(60, 56, 430, 66, c12.panel, c12.amber))
  b.push(wh1BTxt(275, 84, 'Layer C \u2014 youngest', 13, c12.ink))
  b.push(wh1BTxt(275, 106, 'deposit of the latest occupation', 11.5, c12.amber))
  b.push(wh1BBox(60, 146, 430, 66, c12.panel2, c12.orange))
  b.push(wh1BTxt(275, 174, 'Layer B \u2014 middle', 13, c12.ink))
  b.push(wh1BTxt(275, 196, 'a painted sherd is sealed inside', 11.5, c12.orange))
  b.push(wh1BDot(200, 179, c12.red, 7))
  b.push(wh1BTxt(200, 163, 'sherd', 11.5, c12.red))
  b.push(wh1BBox(60, 236, 430, 66, c12.sep, c12.mid))
  b.push(wh1BTxt(275, 264, 'Layer A \u2014 oldest', 13, c12.ink))
  b.push(wh1BTxt(275, 286, 'the earliest deposit rests on the natural soil', 11.5, c12.mid))
  b.push(wh1BLine(60, 236, 60, 56, c12.ink, 2.4))
  b.push(wh1BArrow(60, 122, 60, 142))
  b.push(wh1BArrow(60, 212, 60, 232))
  b.push(wh1BTxt(46, 160, 'time', 12, c12.ink))
  b.push(wh1BTxt(46, 178, 'runs', 12, c12.ink))
  b.push(wh1BTxt(46, 196, 'down', 12, c12.ink))
  b.push(wh1BTxt(522, 160, 'law of', 12, c12.tealInk))
  b.push(wh1BTxt(522, 178, 'superposition:', 12, c12.tealInk))
  b.push(wh1BTxt(522, 196, 'older below,', 12, c12.tealInk))
  b.push(wh1BTxt(522, 214, 'younger above', 12, c12.tealInk))
  b.push(wh1BTxt(320, 344, 'An undisturbed trench reads as a calendar: each layer was laid after the one beneath it.', 12.5, c12.amber))
  return wh1BSvg(620, 368, 'Stratigraphy cross-section with three strata and the law of superposition', b)
}

const wh1BF3 = (): string => {
  const b: string[] = []
  const x0 = 78, x1 = 556, y0 = 316, yTop = 60
  const yrMax = 20000
  const fx = (yr: number): number => x0 + (yr / yrMax) * (x1 - x0)
  const fy = (frac: number): number => y0 - frac * (y0 - yTop)
  b.push(wh1BLine(x0, y0, x1 + 8, y0, c12.ink, 2.4))
  b.push(wh1BLine(x0, y0, x0, yTop - 14, c12.ink, 2.4))
  const pts: string[] = []
  for (let yr = 0; yr <= yrMax; yr += 400) {
    const frac = Math.pow(1 / 2, yr / 5730)
    pts.push(`${fx(yr).toFixed(1)},${fy(frac).toFixed(1)}`)
  }
  b.push(`<polyline points="${pts.join(' ')}" fill="none" stroke="${c12.teal}" stroke-width="3"/>`)
  const marks: Array<[number, string]> = [[0, '1'], [5730, '1/2'], [11460, '1/4'], [17190, '1/8']]
  for (const [yr, lab] of marks) {
    const frac = Math.pow(1 / 2, yr / 5730)
    b.push(wh1BDot(fx(yr), fy(frac), c12.tealInk, 5))
    b.push(wh1BTxt(fx(yr), fy(frac) - 14, lab, 12.5, c12.tealInk))
    b.push(wh1BTxt(fx(yr), y0 + 20, String(yr), 11.5, c12.ink))
    b.push(wh1BLine(fx(yr), y0, fx(yr), y0 + 6, c12.ink, 1.8))
  }
  b.push(wh1BTxt((x0 + x1) / 2, y0 + 44, 'years since death', 13, c12.ink))
  b.push(wh1BTxt(x0 - 34, (y0 + yTop) / 2, 'carbon\u201114 remaining', 12, c12.ink))
  b.push(wh1BArrow(476, fy(Math.pow(1 / 2, 16600 / 5730)), 548, 108))
  b.push(wh1BBox(452, 74, 156, 40, c12.panel, c12.amber))
  b.push(wh1BTxt(530, 90, 'at 50,000 years', 12, c12.amber))
  b.push(wh1BTxt(530, 106, '0.236% remains', 12.5, c12.amber))
  b.push(wh1BTxt(x0 + 8, yTop - 2, 'half\u2011life = 5730 years', 12, c12.tealInk))
  b.push(wh1BTxt(320, 376, 'Each 5730 years halves the count: 1, 1/2, 1/4, 1/8 \u2014 until the measurement edge near 50,000 years.', 12.5, c12.amber))
  return wh1BSvg(620, 396, 'Radiocarbon decay curve with computed half-life points and the 50000-year edge', b)
}

const wh1BF4 = (): string => {
  const b: string[] = []
  const x0 = 70, x1 = 580, y = 150
  const yMin = -350, yMax = 1100
  const fx = (yr: number): number => x0 + ((yr - yMin) / (yMax - yMin)) * (x1 - x0)
  b.push(wh1BLine(x0, y, x1, y, c12.ink, 2.6))
  for (const yr of [-300, 0, 400, 800]) {
    b.push(wh1BLine(fx(yr), y, fx(yr), y + 7, c12.ink, 1.8))
    b.push(wh1BTxt(fx(yr), y + 24, yr === 0 ? '0' : String(Math.abs(yr)), 11.5, c12.ink))
  }
  b.push(wh1BTxt(fx(0), y - 10, 'BCE  |  CE', 11.5, c12.ink))
  b.push(wh1BDot(fx(-302), y, c12.red, 6))
  b.push(wh1BTxt(fx(-302), y - 16, 'Megasthenes', 12, c12.red))
  b.push(wh1BTxt(fx(-302), y - 32, 'c. \u2212302', 11.5, c12.red))
  const bands: Array<[number, number, string]> = [[399, 414, 'Fa\u2011Hien'], [630, 645, 'Xuanzang'], [973, 1048, 'Al\u2011Biruni']]
  for (const [a, c2, nm] of bands) {
    b.push(wh1BBox(fx(a), y - 12, fx(c2) - fx(a), 24, c12.teal, c12.tealInk, 6))
    b.push(wh1BTxt((fx(a) + fx(c2)) / 2, y + 46, nm, 12, c12.tealInk))
    b.push(wh1BTxt((fx(a) + fx(c2)) / 2, y + 62, `${a}\u2013${c2}`, 11.5, c12.tealInk))
    b.push(wh1BLine((fx(a) + fx(c2)) / 2, y + 12, (fx(a) + fx(c2)) / 2, y + 34, c12.tealInk, 1.4))
  }
  b.push(wh1BArrow(fx(-302) + 6, y - 46, fx(399) - 6, y - 46, c12.amber))
  b.push(wh1BTxt((fx(-302) + fx(399)) / 2, y - 58, 'gap = 700 years', 12, c12.amber))
  b.push(wh1BArrow(fx(414) + 4, y - 84, fx(630) - 4, y - 84, c12.orange))
  b.push(wh1BTxt((fx(414) + fx(630)) / 2, y - 96, 'gap = 216 years', 12, c12.orange))
  b.push(wh1BTxt(320, 238, 'Four foreign witnesses across seven centuries of Indian history.', 12.5, c12.amber))
  return wh1BSvg(620, 262, 'Travellers timeline from Megasthenes to Al-Biruni with 700-year and 216-year gaps', b)
}

const wh1BF5 = (): string => {
  const b: string[] = []
  const rows: Array<[string, number, string]> = [['Hieroglyphic', 14, c12.amber], ['Demotic', 32, c12.teal], ['Greek', 54, c12.green]]
  const y0 = 60, bh = 44, max = 60
  rows.forEach(([nm, n, col], i) => {
    const y = y0 + i * (bh + 18)
    const w = (n / max) * 320
    b.push(wh1BTxt(96, y + 28, nm, 12.5, c12.ink, 'end'))
    b.push(wh1BBox(112, y, w, bh, col, c12.ink, 6))
    b.push(wh1BTxt(112 + w + 14, y + 28, String(n), 13, c12.ink))
  })
  b.push(wh1BTxt(112, y0 + 3 * (bh + 18) + 6, 'surviving lines of the same decree', 12, c12.ink, 'start'))
  b.push(wh1BBox(448, y0 + 8, 152, 76, c12.panel, c12.amber))
  b.push(wh1BTxt(524, y0 + 38, '14 + 32 + 54', 13.5, c12.amber))
  b.push(wh1BTxt(524, y0 + 62, '= 100 lines', 13.5, c12.amber))
  b.push(wh1BTxt(320, 252, 'The Rosetta Stone carries one Memphis decree in three scripts \u2014 the Greek unlocked the rest.', 12.5, c12.amber))
  return wh1BSvg(620, 276, 'Rosetta Stone three-register census: 14 hieroglyphic, 32 Demotic and 54 Greek lines', b)
}

const wh1BF6 = (): string => {
  const b: string[] = []
  b.push(wh1BBox(296, 96, 30, 210, c12.panel, c12.ink, 6))
  b.push(wh1BBox(288, 78, 46, 20, c12.panel2, c12.orange, 4))
  b.push(wh1BLine(292, 60, 330, 60, c12.orange, 3))
  b.push(wh1BArrow(326, 58, 344, 46, c12.orange))
  b.push(wh1BLine(266, 96, 266, 306, c12.ink, 1.6, '6 5'))
  b.push(wh1BTxt(252, 204, 'shaft', 12, c12.ink))
  b.push(wh1BTxt(252, 222, '12\u201315 m', 12.5, c12.ink))
  b.push(wh1BBox(380, 120, 188, 66, c12.paper, c12.tealInk))
  b.push(wh1BTxt(474, 146, 'monolithic polished', 12, c12.tealInk))
  b.push(wh1BTxt(474, 164, 'sandstone, up to 50 t', 12, c12.tealInk))
  b.push(wh1BArrow(378, 150, 330, 150, c12.tealInk))
  b.push(wh1BBox(96, 120, 170, 96, c12.panel, c12.ink))
  b.push(wh1BTxt(181, 146, '14 Major Rock', 12.5, c12.ink))
  b.push(wh1BTxt(181, 166, '7 Major Pillar', 12.5, c12.ink))
  b.push(wh1BTxt(181, 192, '14 + 7 = 21 edicts', 13, c12.amber))
  b.push(wh1BArrow(268, 168, 292, 168, c12.ink))
  b.push(wh1BTxt(320, 344, 'Ashoka\u2019s edicts: 30+ inscriptions carrying the voice of the reign itself.', 12.5, c12.amber))
  return wh1BSvg(620, 368, 'Ashokan pillar schematic with the 12 to 15 metre band and the 21-edict census', b)
}

export const lessonWh102: Lesson = {
  id: 'wh-sources-literary-and-archaeological',
  number: '1.2',
  title: 'Sources: Literary and Archaeological',
  concepts: [
    'literary sources',
    'archaeological sources',
    'epigraphy',
    'numismatics',
    'stratigraphy',
    'radiocarbon dating',
    'the three-age system',
    'foreign accounts',
  ],
  objectives: [
    'Distinguish the literary register from the archaeological register and say what each preserves that the other cannot',
    'Classify a given source as religious literature, secular literature, a foreign account, an inscription, a coin or material culture',
    'Recount the decipherment stories of Brahmi (Prinsep, 1836\u20131838) and Egyptian hieroglyphs (the Rosetta Stone, 1822)',
    'State the law of superposition and apply it to read an excavation trench',
    'Use the radiocarbon law N = N\u2080(1/2)^(t/5730) and name the practical edge near 50,000 years',
    'Compute the travellers\u2019 arithmetic: 700 years from Megasthenes to Fa\u2011Hien and 216 years from Fa\u2011Hien to Xuanzang',
  ],
  prerequisites: ['wh-how-history-is-written'],
  sources: ['wh-ncert-canon', 'wh-web-sources', 'wh-survey-ground'],
  blocks: [
    { kind: 'heading', text: 'Two great registers' },
    { kind: 'para', text: 'The last lesson ended with a question every historian carries into the archive: how do we know? This lesson is about the second half of that question \u2014 what there is to know from. Evidence reaches the historian through two great channels, and the discipline calls them the literary register and the archaeological register. The literary register is everything human beings wrote down and handed on: hymns, epics, chronicles, edicts copied by scribes, treatises, letters, the notes of travellers. The archaeological register is everything the earth kept without intending to: city walls buried under silt, coins hoarded and forgotten, potsherds pressed into the floors of abandoned houses, the bones of the people themselves.' },
    { kind: 'para', text: 'The two registers fail in opposite directions, which is exactly why the craft needs both. Writing preserves what writers cared about \u2014 the reign, the battle, the donation, the doctrine \u2014 and it preserves the voices of the literate few. The earth preserves what nobody chose: the ordinary pot, the child\u2019s toy, the grain that caught fire with the granary. A chronicle can tell you a king ruled for forty years; only a trench can tell you what his subjects ate. Conversely, a coin hoard can tell you trade flowed through a port, but only an inscription can tell you what the king wanted his subjects to hear in his own words.' },
    { kind: 'para', text: 'Neither register arrives clean. Literary sources were copied, excerpted, censored, forged and winnowed by centuries of transmission; the Rigveda reached writing only after a long history of oral transmission, and Megasthenes\u2019s Indica survives only in the quotations of later authors. Archaeological sources were disturbed \u2014 by later builders, by robbers, by ploughs, by the archaeologists\u2019 own predecessors with their picks and their guesses. So the first law of this lesson is the first law of the last one: every source, written or dug, passes through criticism before it counts as evidence.' },
    { kind: 'para', text: 'The lesson walks the two registers in turn. First the literary register with its three great shelves \u2014 religious literature, secular literature and the accounts of foreign visitors. Then the archaeological register with its disciplines \u2014 epigraphy for inscriptions, numismatics for coins, and the field methods that turn a mound into a sequence of dated layers. Then the dating sciences that anchor the buried things in time, from radiocarbon to tree rings to the humble seriation of pot styles. The numbers in this lesson are checkable, and the quiz and exercises will make you compute them.' },
    { kind: 'heading', text: 'The literary register' },
    { kind: 'callout', tone: 'definition', title: 'Literary sources', text: 'Literary sources are the written and transmitted texts of a society \u2014 religious and secular works, official chronicles, legal codes, letters, and the accounts of foreign visitors \u2014 studied for the evidence they carry about the events, institutions and ideas of their own or earlier periods. A literary source is not automatically reliable: it is a witness that must still pass external criticism (is it genuine?) and internal criticism (is it credible?) before its testimony weighs.' },
    { kind: 'para', text: 'Indian history is unusually rich in religious literature. The Vedic corpus was composed and transmitted orally for centuries before it was ever written down; the Rigveda alone counts 1028 hymns \u2014 1017 hymns in the ten books (mandalas) plus the 11 supplementary hymns called the valakhilya \u2014 and the count is exact because the tradition itself checked it, syllable by syllable, with mnemonic devices a modern archivist would envy. Buddhist, Jaina and later Hindu literatures each carry their own annals of councils, monasteries, donors and doctrinal disputes. The preacher\u2019s complaint \u2014 that these texts are about salvation, not society \u2014 is exactly why they are precious: a hymn names its patrons, a monastic chronicle names its kings, a legal code names its prices.' },
    { kind: 'para', text: 'Secular literature is the second shelf: the epics and their layers, the court epics, the drama, the story collections, the manuals of statecraft and love and medicine. Kautilya\u2019s Arthashastra prescribes the salaries of clerks and the wages of spies; Kalidasa\u2019s plays show the court\u2019s own picture of itself; the Kathasaritsagara preserves popular tales older than the books that carry them. Used with criticism, these texts are society testifying about itself \u2014 what it bought, feared, laughed at and obeyed. Used without criticism, they are quotation mines; the discipline is to date the layer, place the author and weigh the interest before quoting the line.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) Religious literature \u2014 hymns, commentaries, monastic chronicles: evidence for doctrine, patronage, institutions and the vocabulary of power.',
      '(ii) Secular literature \u2014 epics, drama, manuals, story collections: evidence for social practice, prices, offices and the culture\u2019s self-image.',
      '(iii) Foreign accounts \u2014 the reports of ambassadors, pilgrims and scholars from other lands: evidence from outside the society\u2019s own official story.',
    ] },
    { kind: 'para', text: 'The foreign accounts deserve their own shelf because their bias runs in a different direction. The court chronicler flatters the patron; the foreigner does not have a patron to flatter \u2014 but he does have a home audience whose curiosity he feeds, and he misunderstands what nobody explains to him. Megasthenes, ambassador of Seleucus I to the court of Chandragupta Maurya around 302 BCE, wrote an Indica full of sharp observation mixed with second-hand marvels; it survives only in fragments quoted by later Greek and Roman authors, so every Megasthenes \u201cquotation\u201d is really a quotation of a quotation \u2014 the fragments must be criticised before they are used.' },
    { kind: 'para', text: 'After Megasthenes the travellers come in a long, checkable line. The Chinese Buddhist pilgrim Fa\u2011Hien travelled through India from 399 to 414 CE \u2014 from Megasthenes around 302 BCE to Fa\u2011Hien in 399 CE is 700 years, because 302 + 399 \u2212 1 = 700 with no year zero. Xuanzang followed from 630 to 645, his own records a full geography of monasteries, kings and customs; from the end of Fa\u2011Hien\u2019s journey in 414 to the start of Xuanzang\u2019s in 630 is 216 years. Al\u2011Biruni, the Central Asian polymath of 973\u20131048, learned Sanskrit, measured his sources against each other and wrote the Kitab\u2011ul\u2011Hind in the early eleventh century \u2014 arguably the first systematic foreign study of Indian civilisation, and a model of the critic\u2019s discipline: he tells you which claims he could not verify.' },
    { kind: 'figure', caption: 'Figure 1. The source taxonomy. All historical evidence arrives through one of two registers \u2014 the literary (what writing preserved: religious, secular and foreign texts) and the archaeological (what the earth preserved: inscriptions, coins, monuments and material culture). A complete history needs both, because each register fails where the other succeeds.', svg: wh1BF1() },
    { kind: 'para', text: 'The taxonomy in Figure 1 is a map of absence as much as presence. Notice what each branch cannot do: the literary branch cannot testify about the illiterate majority except through the eyes of the literate; the archaeological branch cannot tell you what anyone said, thought or claimed, only what they made, used, lost and left. The historian\u2019s usual move is therefore triangulation \u2014 a claim in a chronicle, checked against an inscription, checked against a layer in a trench. When all three agree, the claim is as solid as historical knowledge gets; when they disagree, the disagreement itself is the finding.' },
    { kind: 'heading', text: 'The archaeological register' },
    { kind: 'callout', tone: 'definition', title: 'Epigraphy', text: 'Epigraphy is the study of inscriptions \u2014 texts carved, engraved or incised on durable surfaces such as stone, metal, rock faces and pillar shafts. Because inscriptions were made by the period itself, usually in public and at cost, they are primary sources of the first rank: they carry the issuer\u2019s own words, titles and claims, dated by internal eras, and they cannot be silently re-edited the way a copied manuscript can.' },
    { kind: 'callout', tone: 'definition', title: 'Numismatics', text: 'Numismatics is the study of coins \u2014 their metals, weights, dies, legends, iconography and find-spots. Coins are mass-produced primary sources: they name kings, carry dates and deities, show scripts in evolution, and their hoards map trade routes and monetary panics with a precision no chronicle matches.' },
    { kind: 'para', text: 'India\u2019s epigraphic treasure begins in force with Ashoka in the third century BCE: more than 30 inscriptions survive, of which the core is the set of 14 Major Rock Edicts plus 7 Major Pillar Edicts \u2014 14 + 7 = 21 major proclamations, carved across the subcontinent from Kandahar in the northwest to Kalinga in the east. The pillars themselves are engineering as much as text: monolithic shafts of polished sandstone, 12 to 15 metres tall and weighing up to 50 tonnes, quarried at Chunar and hauled hundreds of kilometres. The edicts speak in the first person \u2014 Devanampriya Piyadasi, \u201cbeloved of the gods, of pleasing appearance\u201d \u2014 and it took modern scholarship to prove that this royal style belonged to Ashoka.' },
    { kind: 'para', text: 'That proof is one of the great decipherment stories. The Brahmi script, in which most edicts were written, had fallen out of use and out of memory. James Prinsep, assay master at the Bengal mint, worked through short donative inscriptions and the edict texts from 1836 to 1838, publishing his reading in March 1838. The decisive cross-check came from George Turnour, who found in Sri Lankan Pali chronicles that the kings listed as Devanampriyas included Ashoka \u2014 tying the pillar style to the known emperor. The northwest edicts in Kharoshthi script, and a Greek\u2013Aramaic bilingual found at Kandahar, extended the same royal voice across the empire\u2019s linguistic frontiers. The identification chain \u2014 script deciphered, style matched, king named \u2014 is a worked example of corroboration from the last lesson, executed with chisels and coins instead of footnotes.' },
    { kind: 'para', text: 'The Rosetta Stone played the same role for Egypt, one register over. It records a Memphis decree of Ptolemy V issued on 27 March 196 BCE, and it was found in July 1799 by the French officer Pierre\u2011Fran\u00e7ois Bouchard during repairs to Fort Julien near Rashid (Rosetta) in the Nile delta. The stone carries the same decree in three scripts: 14 surviving lines of hieroglyphic, 32 lines of Demotic and 54 lines of Greek \u2014 14 + 32 + 54 = 100 lines in all. The Greek could still be read, so the decree\u2019s content was known; the puzzle was the alignment. Thomas Young made inroads on the Demotic and the cartouches; Jean\u2011Fran\u00e7ois Champollion announced the full decipherment of the hieroglyphs in 1822, twenty-three years after the find.' },
    { kind: 'para', text: 'The stone\u2019s afterlife is itself historical evidence. It passed to the British under the Capitulation of Alexandria and has been in the British Museum since 1802 \u2014 three years after its discovery. Count its time in the ground: from 196 BCE to 1799 CE is 1994 years, because 196 + 1799 \u2212 1 = 1994 with no year zero. A modern visitor leaning over the glass is looking at the single most productive misunderstanding in the history of writing: a bureaucratic decree, issued to be ordinary, preserved because it was recycled into a wall, and decisive because it was accidentally redundant \u2014 the same text three times, once in a script every scholar could read.' },
    { kind: 'example', title: 'How the Rosetta registers lock together', steps: [
      'Sol. The decree exists in three parallel registers: 14 hieroglyphic lines, 32 Demotic lines, 54 Greek lines \u2014 100 lines carrying one text.',
      'Now, read the Greek first: it is the known script, so it supplies the decree\u2019s content \u2014 honours voted for Ptolemy V by the priesthood of Memphis.',
      'So, match proper names inside cartouches: \u201cPtolemy\u201d in the Greek must sit opposite the same name ringed in the hieroglyphic register \u2014 the anchors for the unknown script.',
      'Then, work outward from the anchors: phonetic signs confirmed by Greek royal names, then native Egyptian words whose sounds the Coptic church still preserved.',
      'Hence one redundant stone unlocked three thousand years of Egyptian writing \u2014 corroboration made literal, in stone.',
    ] },
    { kind: 'table', head: ['Claim', 'Literary witness', 'Archaeological witness'], rows: [
      ['Ashoka ruled and repented after Kalinga', 'Sri Lankan Pali chronicles naming Devanampriya kings', 'The Major Rock and Pillar Edicts in the king\u2019s own voice'],
      ['Chandragupta Maurya kept a grand court', 'Megasthenes\u2019s Indica, surviving only in later quotations', 'Mauryan-period polished stone and the punch-marked coinage'],
      ['Samudragupta conquered widely', 'Harisena\u2019s eulogy on the Prayagraj Pillar (an inscription, used as text)', 'Gupta gold dinars naming and dating the same reign'],
      ['Ptolemy V was honoured at Memphis', 'The Greek register of the Rosetta decree', 'The stone itself \u2014 100 lines in three scripts, found 1799'],
    ] },
    { kind: 'figure', caption: 'Figure 2. The stratigraphy of an undisturbed trench. Time runs down: Layer A was laid first, Layer B sealed a sherd inside it, Layer C settled last. The law of superposition \u2014 older below, younger above \u2014 is the field archaeologist\u2019s first clock, and every disturbance that violates it is itself an event to be explained.', svg: wh1BF2() },
    { kind: 'para', text: 'The field side of the register begins with stratigraphy, drawn in Figure 2. An excavation trench is read as a stack of layers \u2014 strata \u2014 and the law of superposition states that in any undisturbed sequence, each layer is older than the layer above it. The law sounds obvious and is ruthless: it means a sherd sealed inside Layer B cannot be younger than Layer B, whatever its style suggests; it means a pit dug from Layer C down into Layer A is a later event cutting earlier layers; it means the archaeologist\u2019s first duty is to record exactly what sealed what, because the sequence of sealing IS the sequence of time.' },
    { kind: 'heading', text: 'The dating sciences' },
    { kind: 'derivation', title: 'The radiocarbon law', statement: 'Given that the carbon\u201114 in any once-living thing decays exponentially with a half-life of 5730 years, find the fraction remaining after t years and locate the practical measurement edge.', steps: [
      { label: 'Decay is exponential', explanation: 'Radioactive decay removes a fixed FRACTION of the surviving atoms per unit time, not a fixed number. The fraction left after t years is therefore a power: N = N\u2080 \u00d7 (1/2)^(t/5730), where N\u2080 is the count at death.' },
      { label: 'One half-life halves the count', explanation: 'At t = 5730 years exactly one power of one-half has elapsed: N = N\u2080/2. At t = 11460 = 2 \u00d7 5730, N = N\u2080/4; at t = 17190 = 3 \u00d7 5730, N = N\u2080/8. The ladder of fractions 1, 1/2, 1/4, 1/8 is the spine of the curve in Figure 3.' },
      { label: 'The measurement edge', explanation: 'After roughly 50,000 years the surviving fraction is (1/2)^(50000/5730) \u2248 0.00236 \u2014 about 0.236 percent \u2014 so few atoms remain that contamination and instrument noise swamp the signal. That is the practical edge of the method, not a cliff in physics.' },
    ], result: 'N = N\u2080(1/2)^(t/5730); the fractions 1, 1/2, 1/4, 1/8 fall at 5730, 11460 and 17190 years, and near 50,000 years only about 0.236 percent remains \u2014 the working edge of radiocarbon dating.' },
    { kind: 'figure', caption: 'Figure 3. The radiocarbon decay curve, computed point by point: the remaining fraction falls from 1 through 1/2, 1/4 and 1/8 at 5730, 11460 and 17190 years. The boxed edge mark at 50,000 years \u2014 0.236 percent remaining \u2014 is where measurement noise overtakes the signal and the method retires.', svg: wh1BF3() },
    { kind: 'para', text: 'The method behind Figure 3 was built by Willard Libby and his collaborators at the University of Chicago in the mid\u20111940s, on the insight that living things exchange carbon with the atmosphere and stop exchanging it at death; the date earned Libby the Nobel Prize in 1960. Radiocarbon dates a death, not an event: the beam tells you when the tree was cut, the grain when it grew, the bone when its owner stopped eating. The calibration problem \u2014 atmospheric carbon has not been constant \u2014 is handled against other clocks, chiefly tree rings.' },
    { kind: 'para', text: 'Dendrochronology counts the annual rings of long-lived trees and of timbers reused in old buildings, assembling master sequences thousands of years long; a ring\u2019s width pattern is a fingerprint that places the ring\u2019s year exactly, and a radiocarbon measurement on the same ring calibrates the curve. Thermoluminescence dates fired clay by measuring the energy stored since firing, and so covers what radiocarbon cannot: pottery itself, the most ordinary artifact of all. Behind all the laboratory clocks stands the older, humbler craft of typology \u2014 the seriation of styles: pot shapes, coin dies, grave goods change fashion generation by generation, and a layer whose styles sit midway between two dated layers sits midway in time too.' },
    { kind: 'para', text: 'The three-age system \u2014 Stone, then Bronze, then Iron \u2014 is typology raised to a civilisational scale. It was set out by C. J. Thomsen in Copenhagen in 1836, arranging the Danish national collection by the material of the cutting edges, and it worked because it was checked: the museum\u2019s closed finds kept turning up bronze with bronze and stone with stone, and the order held. Modern archaeology has complicated every stage of the scheme \u2014 ages overlap, regions leapfrog, \u201cstone age\u201d societies coexist with iron-using neighbours \u2014 but as a first sorting of the deep past it remains the most useful convention ever proposed, and it began as a museum label, not a theory.' },
    { kind: 'heading', text: 'Coins and inscriptions as witnesses' },
    { kind: 'para', text: 'Coins are the most literally circulating evidence a society leaves. India\u2019s earliest are the punch-marked coins of roughly the sixth century BCE \u2014 irregular silver pieces stamped with separate punches, found in hoards that map the trade of their day. Later coinage turns deliberately eloquent: the Kushan and Gupta gold issues carry the king\u2019s portrait, his titles, his chosen deities; the Gupta gold dinars name and date their issuers with a regularity that lets modern historians build a whole reign chronology from the mint. A coin names its king in his own chosen costume, at a known weight standard, in a script that can be palaeographically dated \u2014 and it was spent, so its find-spot is a datum about money\u2019s movement.' },
    { kind: 'para', text: 'Inscriptions and coins often testify about each other. The Prayagraj (Allahabad) Pillar inscription of Samudragupta \u2014 composed by his court poet Harisena, engraved on an Ashokan pillar shaft reused a millennium later \u2014 is the classic: a poet\u2019s praise poem that doubles as a political map of the Gupta empire\u2019s reach. Read with criticism it yields the conquest list of a reign; read against the coinage it corroborates the king\u2019s own self-presentation in gold. The pillar itself is the lesson\u2019s argument in one object: an Ashokan monument, re-carved by a Gupta court, standing in a Mughal fort \u2014 three periods, three registers, one stone.' },
    { kind: 'example', title: 'Date a coin layer by typology', steps: [
      'Sol. A trench\u2019s Layer B seals a hoard of 40 punch-marked coins; Layer C, above it, seals coins inscribed with a named king of the second century BCE.',
      'Now, apply the law of superposition: Layer B is older than Layer C, so the punch-marked hoard predates the named-king issue.',
      'So, bring in typology: the hoard\u2019s punches match the classic punch-marked series attributed to roughly the fourth\u2013second centuries BCE, and contain none of the later imitation series.',
      'Then, check the seals: nothing in Layer B is younger than the hoard, and the layer below (A) holds Northern Black Polished Ware of the same early band.',
      'Hence the hoard was buried within Layer B\u2019s span \u2014 superposition fixes the order, typology tightens the date, and the two clocks agree.',
    ] },
    { kind: 'example', title: 'The Prinsep identification chain', steps: [
      'Sol. The edicts speak as \u201cDevanampriya Piyadasi\u201d; the name Ashoka appears nowhere in the major edicts themselves.',
      'Now, decipher the script first: Prinsep\u2019s reading of Brahmi, tested on short donative inscriptions, was published in March 1838 after the 1836\u20131838 campaign.',
      'So, hunt the style in independent records: Turnour\u2019s Sri Lankan Pali chronicles list Devanampriya kings \u2014 and place Ashoka among them.',
      'Then, corroborate the match: the edicts\u2019 geography (Kalinga, the empire\u2019s roads, the missionary embassies) fits the Mauryan centre of gravity, and the dating brackets fit the third century BCE.',
      'Hence Devanampriya Piyadasi = Ashoka: two independent source lines converging on one identification \u2014 corroboration in origins, exactly as the last lesson defined it.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why the two registers need each other', text: 'Take any claim from either register and ask what would confirm it: the answer almost always crosses to the other side. A chronicle\u2019s king is confirmed by his coins; a coin\u2019s king is placed by his inscriptions; an inscription\u2019s date is checked against radiocarbon from the same layer; the radiocarbon curve itself is calibrated by tree rings cut for a dated text. The discipline\u2019s firmest facts are exactly the ones where the written and the buried agree \u2014 which is why this chapter keeps both channels open all the way down.' },
    { kind: 'callout', tone: 'exam', title: 'Where this is examined', text: 'UPSC GS-I and the history optionals set source questions every year: classify a source, weigh a foreign account, explain what epigraphy or numismatics adds that literature cannot. UGC NET History tests the decipherment stories (Prinsep 1836\u20131838, Champollion 1822), the archaeological dating methods (radiocarbon, dendrochronology, thermoluminescence, seriation) and the three-age system by name. The NCERT Themes register treats Ashoka\u2019s edicts and the travellers as anchor documents \u2014 expect to use them as evidence with explicit criticism, not as quotation mines.' },
    { kind: 'terms', items: [
      { term: 'Literary source', def: 'A written and transmitted text \u2014 religious, secular or foreign \u2014 studied as evidence after criticism.' },
      { term: 'Archaeological source', def: 'Material evidence recovered from the ground: inscriptions, coins, monuments, stratified artefacts.' },
      { term: 'Epigraphy', def: 'The study of inscriptions on durable surfaces; the discipline behind the reading of Ashoka\u2019s edicts.' },
      { term: 'Numismatics', def: 'The study of coins \u2014 metals, dies, legends, iconography and find-spots \u2014 as mass-produced primary evidence.' },
      { term: 'Stratigraphy', def: 'The reading of an excavation as a sequence of layers, each sealing the events beneath it.' },
      { term: 'Law of superposition', def: 'In an undisturbed sequence, each layer is older than the layer above it \u2014 the field archaeologist\u2019s first clock.' },
      { term: 'Typology and seriation', def: 'Dating by the ordered succession of styles; the method behind the three-age system.' },
      { term: 'Radiocarbon dating', def: 'Dating a once-living thing from its remaining carbon\u201114: N = N\u2080(1/2)^(t/5730).' },
      { term: 'Half-life', def: 'The time in which half of a radioactive isotope decays \u2014 5730 years for carbon\u201114.' },
      { term: 'Dendrochronology', def: 'Dating by annual tree-ring sequences; also the master calibration for radiocarbon.' },
      { term: 'Thermoluminescence', def: 'Dating fired clay by the energy stored since its last firing; covers pottery where radiocarbon cannot.' },
      { term: 'Three-age system', def: 'Thomsen\u2019s 1836 Copenhagen ordering of the deep past into Stone, Bronze and Iron ages.' },
    ] },
    { kind: 'formula', name: 'The radiocarbon law', latex: 'N = N_0\\,(1/2)^{t/5730}', note: 't in years since death; each 5730 years halves the surviving carbon\u201114' },
    { kind: 'formula', name: 'The half-life ladder', latex: '(1/2)^1 = 0.5,\\ (1/2)^2 = 0.25,\\ (1/2)^3 = 0.125', note: 'fractions remaining at 5730, 11460 and 17190 years' },
    { kind: 'formula', name: 'The travellers gap', latex: '302 + 399 - 1 = 700', note: 'Megasthenes c. 302 BCE to Fa\u2011Hien 399 CE; no year zero' },
    { kind: 'formula', name: 'The Rosetta register census', latex: '14 + 32 + 54 = 100', note: 'hieroglyphic + Demotic + Greek surviving lines of one decree' },
    { kind: 'quiz', title: 'Self-check quiz', items: [
      { q: 'In an undisturbed excavation, the layers lying below other layers are always \u2026', options: ['younger, because deposits sink over time', 'of unknown age until radiocarbon says otherwise', 'older \u2014 this is the law of superposition', 'from the same occupation, mixed by burrowing'], answer: 2, explain: 'The law of superposition states that in any undisturbed sequence each layer is older than the layer above it \u2014 the core clock of field archaeology. Option (a) reverses the law; option (b) confuses relative order (stratigraphy) with absolute dates (radiocarbon); option (d) describes a disturbance, which the law explicitly excludes.' },
      { q: 'The half-life of carbon\u201114 \u2014 the number every radiocarbon date rests on \u2014 is \u2026', options: ['5230 years', '6230 years', '573 years', '5730 years'], answer: 3, explain: 'Carbon\u201114 halves every 5730 years: fractions 1/2, 1/4 and 1/8 at 11460 and 17190 years follow, and the practical edge sits near 50,000 years at about 0.236 percent remaining. The other numbers are distractors \u2014 only 5730 is the measured half-life Libby\u2019s method uses.' },
      { q: 'The stone whose three parallel registers unlocked the decipherment of Egyptian hieroglyphs is \u2026', options: ['the Behistun inscription', 'the Rosetta Stone', 'the Ashokan pillar at Lauriya', 'the Hammurabi stele'], answer: 1, explain: 'The Rosetta Stone carries one Memphis decree of 196 BCE in hieroglyphic (14 lines), Demotic (32) and Greek (54) \u2014 the readable Greek anchored the decipherment completed in 1822. Behistun unlocked cuneiform (not hieroglyphs); Lauriya carries an Ashokan edict in Prakrit; Hammurabi\u2019s stele is law, not a bilingual key.' },
      { q: 'Brahmi \u2014 the script of most Ashokan edicts \u2014 was deciphered in 1836\u20131838 by \u2026', options: ['James Prinsep', 'George Turnour', 'William Jones', 'John Marshall'], answer: 0, explain: 'James Prinsep published his Brahmi reading in March 1838 after the 1836\u20131838 campaign on donative inscriptions and edicts. Turnour\u2019s role was the Pali chronicles that identified Devanampriya Piyadasi as Ashoka; Jones founded the Asiatic Society fifty years earlier; Marshall excavated the Indus cities seventy years later.' },
      { q: 'The study of coins \u2014 their metals, dies, legends and find-spots \u2014 is called \u2026', options: ['epigraphy', 'heraldry', 'numismatics', 'sigillography'], answer: 2, explain: 'Numismatics is the discipline that reads coins as mass-produced primary sources naming kings, dates and deities. Epigraphy studies inscriptions; heraldry reads armorial bearings; sigillography studies seals \u2014 related crafts, but the coin is the numismatist\u2019s document.' },
    ] },
    { kind: 'exercises', title: 'Exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Classify each of these as literary or archaeological, and as precisely as you can: (i) the Rigveda; (ii) a punch-marked silver coin; (iii) Fa\u2011Hien\u2019s travel record; (iv) the stratified floor of an excavated house.', solution: [
          'Sol. Apply the register test: was it transmitted as writing, or recovered from the ground?',
          '(i) The Rigveda is a religious literary source \u2014 orally transmitted for centuries, then written.',
          '(ii) The coin is archaeological/numismatic evidence \u2014 a mass-produced object recovered from finds.',
          '(iii) Fa\u2011Hien\u2019s record is a foreign literary account \u2014 transmitted as text.',
          '(iv) The excavated floor is archaeological/stratigraphic evidence \u2014 read as a sealed layer.',
          'Hence literary: (i) and (iii); archaeological: (ii) and (iv).',
        ], answer: '(i) literary\u2013religious, (ii) archaeological\u2013numismatic, (iii) literary\u2013foreign account, (iv) archaeological\u2013stratigraphic' },
        { q: 'Name the three shelves of the literary register as this lesson divides it, with one Indian example each.', solution: [
          'Sol. The lesson\u2019s taxonomy splits literary sources by who wrote and why.',
          'Religious literature \u2014 the Rigveda\u2019s 1028 hymns (1017 + 11 valakhilya) in 10 mandalas.',
          'Secular literature \u2014 Kalidasa\u2019s plays, or Kautilya\u2019s Arthashastra on salaries and spies.',
          'Foreign accounts \u2014 Megasthenes\u2019s Indica, or Al\u2011Biruni\u2019s Kitab\u2011ul\u2011Hind.',
          'Hence: religious, secular, foreign \u2014 each with its own characteristic bias to criticise.',
        ], answer: 'religious (Rigveda), secular (Arthashastra), foreign accounts (Indica)' },
        { q: 'State the law of superposition in one sentence, and say what a pit dug from a top layer into a bottom layer does to it.', solution: [
          'Sol. The law: in any undisturbed sequence, each layer is older than the layer above it.',
          'A pit is a cut \u2014 a later event that violates the simple stack by inserting younger material deep down.',
          'So the archaeologist records the cut separately: the pit\u2019s fill is younger than everything it cuts through.',
          'Hence the law is not broken but extended: disturbances are events, and the sequence of cuts is part of the sequence of time.',
        ], answer: 'older below, younger above; a pit is a later cut whose fill dates after everything it penetrates' },
      ] },
      { level: 'L2', questions: [
        { q: 'The Rigveda counts 1028 hymns: 1017 in the ten mandalas plus the valakhilya. How many valakhilya hymns are there, and why does the count survive at all?', solution: [
          'Sol. Subtract the main corpus from the total: 1028 \u2212 1017 = 11.',
          'Now, ask how an oral corpus keeps an exact count across centuries of transmission.',
          'The tradition maintained the text with syllable-counting and mnemonic checks \u2014 an internal audit system long before writing.',
          'So the number 1028 = 1017 + 11 is the tradition\u2019s own census, verified by its preservation discipline.',
          'Hence: 11 valakhilya hymns, preserved by an oral archiving technique precise enough to keep the count stable.',
        ], answer: '11 valakhilya hymns (1028 \u2212 1017 = 11), kept exact by oral mnemonic discipline' },
        { q: 'From Megasthenes at the Maurya court around 302 BCE to Fa\u2011Hien arriving in 399 CE \u2014 compute the span, remembering the era line.', solution: [
          'Sol. The span rule across the era line: A + B \u2212 1, because there is no year zero.',
          'Here A = 302 (BCE) and B = 399 (CE): 302 + 399 \u2212 1 = 700.',
          'Now check the edge: from 302 BCE to 1 BCE is 301 years; the joint 1 BCE \u2192 1 CE adds 1; then 398 more to 399 CE \u2014 301 + 1 + 398 = 700.',
          'So seven full centuries separate the ambassador from the pilgrim.',
          'Hence the gap is 700 years \u2014 the first two foreign witnesses stand almost a millennium apart.',
        ], answer: '302 + 399 \u2212 1 = 700 years', figures: [
          { caption: 'The travellers\u2019 timeline for the solution: Megasthenes c. \u2212302, then Fa\u2011Hien 399\u2013414, Xuanzang 630\u2013645 and Al\u2011Biruni 973\u20131048, with the 700-year and 216-year gaps marked on one axis.', svg: wh1BF4() },
        ] },
        { q: 'Fa\u2011Hien left in 399 and travelled until 414; Xuanzang arrived in 630. How many years separate the end of Fa\u2011Hien\u2019s journey from the start of Xuanzang\u2019s, and how long was each man\u2019s journey?', solution: [
          'Sol. Both dates are CE, so plain subtraction works: 630 \u2212 414 = 216.',
          'Now the journey lengths: Fa\u2011Hien 414 \u2212 399 = 15 years; Xuanzang 645 \u2212 630 = 15 years.',
          'So the two pilgrims each travelled 15 years, separated by a 216-year gap between them.',
          'Hence the sequence Megasthenes \u2192 Fa\u2011Hien \u2192 Xuanzang reads: 700 years, then 15, then 216, then 15.',
          'The pattern shows why the foreign tradition feels episodic: witnesses cluster, then vanish for centuries.',
        ], answer: 'gap = 630 \u2212 414 = 216 years; each journey = 15 years' },
      ] },
      { level: 'L3', questions: [
        { q: 'The Rosetta Stone was carved for a decree of 27 March 196 BCE and found in July 1799. Compute the years it spent in the ground, and the span from find to Champollion\u2019s announcement in 1822, and to the British Museum in 1802.', solution: [
          'Sol. Ground time crosses the era line: 196 + 1799 \u2212 1 = 1994 years.',
          'Now, find to decipherment: 1822 \u2212 1799 = 23 years of work by Young, Champollion and others.',
          'Then, find to museum: 1802 \u2212 1799 = 3 years under the Capitulation of Alexandria.',
          'So the stone spent 1994 years buried, was legible in one register from the start, and still took 23 years to yield the other two.',
          'Hence: 1994 years in the ground; 23 years from find to decipherment; 3 years from find to the British Museum.',
        ], answer: '1994 = 196 + 1799 \u2212 1 years in the ground; 23 years to decipherment; 3 years to the museum', figures: [
          { caption: 'The Rosetta three-register census for the solution: 14 hieroglyphic + 32 Demotic + 54 Greek = 100 surviving lines of the single Memphis decree.', svg: wh1BF5() },
        ] },
        { q: 'A sample of charcoal from a hearth retains exactly 1/8 of its original carbon\u201114. Using the half-life of 5730 years, how old is the hearth? What fraction would remain after another half-life?', solution: [
          'Sol. Count the halvings: 1/8 = (1/2)\u00b3 \u2014 three half-lives have elapsed.',
          'Now multiply: 3 \u00d7 5730 = 17190 years since the wood stopped exchanging carbon.',
          'Then, one more half-life halves 1/8 to 1/16 at 4 \u00d7 5730 = 22920 years.',
          'So the ladder reads 1, 1/2, 1/4, 1/8, 1/16 at 0, 5730, 11460, 17190, 22920 years.',
          'Hence the hearth is 17190 years old, and 1/16 would remain after another 5730 years.',
        ], answer: '17190 years old (3 \u00d7 5730); then 1/16' },
        { q: 'Ashoka\u2019s core edict corpus: how many proclamations are the 14 Major Rock Edicts plus the 7 Major Pillar Edicts, and what physical facts make the pillars themselves evidence of state capacity?', solution: [
          'Sol. The census: 14 + 7 = 21 major edicts, within a surviving body of 30+ inscriptions.',
          'Now the engineering: monolithic polished sandstone shafts 12\u201315 m tall, up to 50 tonnes each.',
          'So each pillar implies quarrying, transport over hundreds of kilometres, and fine polish \u2014 all state-organised.',
          'Then, the distribution: from Kandahar to Kalinga, implying a message network spanning the empire.',
          'Hence 21 edicts on engineering that only a coordinated empire could deliver \u2014 the medium argues the power.',
        ], answer: '14 + 7 = 21 major edicts; shafts 12\u201315 m, up to 50 t, monolithic polished sandstone', figures: [
          { caption: 'The Ashokan pillar schematic for the solution: the monolithic 12\u201315 m shaft, the up-to-50-tonne mass, and the 14 + 7 = 21 edict census in one drawing.', svg: wh1BF6() },
        ] },
      ] },
      { level: 'L4', questions: [
        { q: 'Explain, in the vocabulary of the last lesson, why Turnour\u2019s Pali chronicles and Prinsep\u2019s Brahmi readings count as INDEPENDENT lines of evidence for the identification Devanampriya Piyadasi = Ashoka.', solution: [
          'Sol. Independence is measured in origins: two sources with separate transmission chains.',
          'Prinsep\u2019s line runs through the inscriptions themselves \u2014 stone carved in the third century BCE, read directly in 1836\u20131838.',
          'Turnour\u2019s line runs through Sri Lankan Pali chronicles \u2014 a monastic literary tradition transmitted for centuries, listing Devanampriya kings including Ashoka.',
          'Neither depends on the other: the stones did not come from the chronicles, nor the chronicles from the stones.',
          'So their agreement multiplies confidence exactly as the corroboration rule demands \u2014 two origins, one identification.',
        ], answer: 'two independent origins \u2014 epigraphic (the edicts, read by Prinsep) and literary (the Pali chronicles, read by Turnour) \u2014 converging on one king' },
        { q: 'A \u201cnewly found\u201d land grant claims to be from a first-century-BCE king, but its script matches forms securely dated to the sixth century CE, and it names a village first attested in a Gupta inscription. Run the external-criticism protocol and give the verdict.', solution: [
          'Sol. External criticism audits genuineness: material, script and language, anachronisms, provenance.',
          'Script check: forms two and a half centuries too late \u2014 a palaeographic mismatch with the claimed period.',
          'Anachronism check: a village name first attested under the Guptas cannot appear in a first-century-BCE original.',
          'Two independent external checks fail; the grant fails genuineness regardless of its material and story of finding.',
          'Hence the verdict: not a first-century-BCE document \u2014 a later fabrication or copyist\u2019s modernisation, unusable as primary evidence for the claimed reign.',
        ], answer: 'fails external criticism on script and anachronism \u2014 a later fabrication or modernised copy, not primary evidence' },
        { q: 'Why does an oral tradition like the Vedic one not count as an \u201cinscription\u201d even though it is fixed text? Contrast what changes and what cannot change in transmission for each.', solution: [
          'Sol. An inscription is fixed at carving: the stone\u2019s text cannot be silently re-edited, only damaged.',
          'An oral fixed text can drift \u2014 each reciter is a new transmission event \u2014 so its stability is a discipline, not a medium property.',
          'The Vedic tradition met drift with mnemonic audits (syllable counts, fixed recitation patterns), achieving stability that rivals writing.',
          'But the historian still treats the two differently: the edict\u2019s wording is primary by medium; the hymn\u2019s wording is primary by verified technique.',
          'Hence both can carry exact content, but the burden of proof sits in different places \u2014 medium for one, method for the other.',
        ], answer: 'the inscription is fixed by medium; the oral text is fixed by audited technique \u2014 different proofs of stability' },
      ] },
      { level: 'L5', questions: [
        { q: 'Radiocarbon\u2019s edge: compute the percent of carbon\u201114 remaining at 50,000 years using N = N\u2080(1/2)^(t/5730), and explain why the method retires near this point rather than at some exact cutoff.', solution: [
          'Sol. Compute the power: 50000/5730 \u2248 8.726 half-lives.',
          'Now the fraction: (1/2)^8.726 \u2248 0.00236 \u2014 about 0.236 percent.',
          'So at the edge, roughly one carbon\u201114 atom survives per 424 originally present.',
          'Then, the reason the method fades rather than stops: counts that small sit inside instrument noise and contamination levels, so error bars swallow the date.',
          'Hence \u22480.236% remains at 50,000 years \u2014 a practical measurement edge, not a physical cliff.',
        ], answer: '(1/2)^(50000/5730) \u2248 0.00236, i.e. about 0.236 percent remaining \u2014 the practical edge where noise swamps signal' },
        { q: 'Design in outline a dating strategy for a single sealed burial: charcoal fragments, a bronze mirror, leather, and local pottery of a known style-series. Which clock applies to which object, and what order of operations do you follow?', solution: [
          'Sol. Assign each object its usable clock first: charcoal \u2192 radiocarbon; leather \u2192 radiocarbon (collagen-free but carbon-bearing, poorer preservation); bronze mirror \u2192 typology of the type-series; pottery \u2192 seriation against the established local sequence.',
          'Now the order: establish the stratigraphic seal (superposition) so everything inside is one event \u2014 one burial, one date.',
          'Then run the independent clocks and compare: radiocarbon on the charcoal anchors an absolute date; the pottery series gives a relative cross-check; the mirror\u2019s typology corroborates or flags intrusion.',
          'So agreement of the clocks dates the burial; disagreement flags disturbance or curation (an heirloom mirror buried late).',
          'Hence the strategy: seal first, date the charcoal absolutely, cross-check pottery and mirror by series, and treat any object that disagrees as evidence of biography rather than error.',
        ], answer: 'radiocarbon for charcoal and leather, seriation for the pottery, typology for the mirror \u2014 seal, date, cross-check, reconcile' },
      ] },
      { level: 'L6', questions: [
        { q: 'The Prayagraj Pillar carries an Ashokan edict and, a millennium later, Samudragupta\u2019s eulogy by Harisena \u2014 on the same shaft. Using this one object, write the method you would follow to extract two reigns\u2019 evidence from one stone without letting either contaminate the other.', solution: [
          'Sol. The shaft is a palimpsest: two inscriptions, two periods, one object \u2014 treat each text as its own sealed context.',
          'First, external criticism per text: script and palaeography date each engraving (Mauryan Brahmi third century BCE; Gupta Brahmi fourth century CE), and the physical order of the carvings confirms which was cut into virgin surface and which into prepared space.',
          'Second, internal criticism per text: the edict speaks as the Mauryan state to subjects; Harisena\u2019s poem speaks as the Gupta court to posterity \u2014 different genres, different biases, each weighed on its own terms.',
          'Third, triangulate outward: the edict against the rest of the 21-major-edict corpus; the eulogy against Gupta coin legends and other inscriptions naming the same officials.',
          'Hence one stone yields two independent primary witnesses \u2014 provided the criticism is run twice and the seam between them is never blurred.',
        ], answer: 'two texts, two external-internal criticism passes, two triangulations \u2014 one stone, two reigns, no contamination' },
      ] },
    ] },
  ],
}
