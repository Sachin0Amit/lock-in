import type { Chapter, Lesson } from '../../../types'

/**
 * World History — chapter 1 "The Historian's Craft"
 * (OPENED by HSS RUN 1, 2026-11-27 — the humanities & social sciences lane's
 * first fire on the whole-chapter cadence, v9.2 protocol).
 *
 * The seats: 1.1 'How History Is Written' (57/57 seat-green — authored by the
 * amendment-5 SOLO RELAUNCH after the swarm wall died twice empty; staged
 * writes banked every section); 1.2 'Sources: Literary and Archaeological'
 * and 1.3 'Time, Periodisation and the Calendar' ride the next fire (the
 * 2-hour cap closed before their seats could start honestly — the deferral
 * is recorded in WORKLOG). The planned census is the HONEST 3-lesson shape:
 * the four planning-pass artifact lines ('Acknowledgements (duplicate)',
 * "Chapter XIII. The Sources of Plato's Opinions", 'Part I. The Fathers',
 * 'Part II. The Schoolmen') are TOC leaks from other books, trimmed per the
 * pointer's reconcile step (b).
 *
 * PROVENANCE: ground = the run's reference-scan-first pass (v9.2 amendment 9):
 * the banked HUMANITIES_TOC_SURVEY.md book records (Strayer & Nelson, Arjun
 * Dev, Norman Lowe, AP World), the NCERT open-canon registers (class 6/8/12
 * history chapters), and the live web ground (Herodotus, Sima Qian, Ibn
 * Khaldun, James Mill, Ashoka's edicts, the Rosetta Stone, radiocarbon, the
 * Gregorian reform) — every URL and page in docs/project/SOURCE_LOG.md under
 * the HSS RUN 1 block. Every ARITHMETIC fact is brute-force pinned in
 * docs/research/wh-ch01-wip/pin_check_wh101.py (69/69 ALL GREEN after the
 * engine caught 9 draft errors) and re-pinned by scripts/verify-wh-ch01.ts
 * against THIS file. STUDY-NEVER-REPRODUCE absolute: every roster, figure,
 * Illustration, quiz item and exercise below is OUR OWN.
 */
/* ================================================================== */
/* lesson 1.1 — from docs/research/wh-ch01-wip/part-wh101.ts            */
/* ==================================================================
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c11 = {
  ink: '#166534', // primary text — rich green ink
  mid: '#65a30d', // mid text — bright lime
  teal: '#0d9488', // captions, light strokes, secondary structure
  tealInk: '#0f766e', // teal ink text
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#16a34a', // structure strokes — boxes, axes, node circles
  panel: '#fef3c7', // amber tinted fill
  panel2: '#ffedd5', // orange tinted fill
  sep: '#fcd34d', // light separators
  faint: '#5eead4', // faint dots, unpicked borders, grids
  white: '#ffffff',
  paper: '#fffdf5',
}
const f11 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* wh1A SVG helpers (plain text only — no $, minus is U+2212)          */
/* ------------------------------------------------------------------ */
const wh1ASvg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${Array.isArray(body) ? body.join('') : body}</svg>`
const wh1ATxt = (x: number, y: number, s: string, size = 13, color = c11.ink, anchor = 'middle', weight = '600'): string =>
  `<text x="${x}" y="${y}" font-family="${f11}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
const wh1ALine = (x1: number, y1: number, x2: number, y2: number, color = c11.ink, w = 2.5, dash = ''): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
const wh1ABox = (x: number, y: number, w: number, h: number, fill: string, stroke: string, r = 8): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
const wh1ADot = (x: number, y: number, color = c11.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`
const wh1AArrow = (x1: number, y1: number, x2: number, y2: number, color = c11.amber, w = 2): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  const rad = (a * Math.PI) / 180
  const hx = x2 - 9 * Math.cos(rad), hy = y2 - 9 * Math.sin(rad)
  const v: [number, number] = [-Math.sin(rad), Math.cos(rad)]
  const p1 = `${hx + v[0] * 6},${hy + v[1] * 6}`
  const p2 = `${hx - v[0] * 6},${hy - v[1] * 6}`
  return `<line x1="${x1}" y1="${y1}" x2="${hx}" y2="${hy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${x2},${y2} ${p1} ${p2}" fill="${color}"/>`
}

/* ------------------------------------------------------------------ */
/* wh1A figure functions                                               */
/* ------------------------------------------------------------------ */
const wh1AF1 = (): string => {
  const cx = 310, cy = 225, rx = 175, ry = 130
  const nodes = [
    { label: 'Question', x: cx, y: cy - ry },
    { label: 'Source hunt', x: cx + rx * 0.87, y: cy - ry * 0.5 },
    { label: 'Criticism', x: cx + rx * 0.87, y: cy + ry * 0.5 },
    { label: 'Synthesis', x: cx, y: cy + ry },
    { label: 'Narrative', x: cx - rx * 0.87, y: cy + ry * 0.5 },
    { label: 'New questions', x: cx - rx * 0.87, y: cy - ry * 0.5 },
  ]
  const parts: string[] = []
  nodes.forEach((n, i) => {
    const next = nodes[(i + 1) % nodes.length]
    const mx = (n.x + next.x) / 2, my = (n.y + next.y) / 2
    const dx = next.x - n.x, dy = next.y - n.y
    const len = Math.hypot(dx, dy)
    const ox = n.x + (dx / len) * 62, oy = n.y + (dy / len) * 24
    const tx = next.x - (dx / len) * 66, ty = next.y - (dy / len) * 30
    parts.push(wh1AArrow(ox, oy, tx, ty, c11.amber, 2))
  })
  nodes.forEach((n, i) => {
    parts.push(wh1ABox(n.x - 58, n.y - 17, 116, 34, i === 0 ? c11.panel : c11.paper, c11.green, 7))
    parts.push(wh1ATxt(n.x, n.y + 5, n.label, 13, c11.ink))
  })
  parts.push(wh1ATxt(cx, cy - 6, 'THE HISTORIAN\u2019S CRAFT', 13.5, c11.orange, 'middle', '700'))
  parts.push(wh1ATxt(cx, cy + 16, 'a cycle, not a line', 12, c11.tealInk))
  return wh1ASvg(620, 450, 'The historian\u2019s craft as a cycle of six moves: question, source hunt, criticism, synthesis, narrative, new questions', parts)
}

const wh1AF2 = (): string => {
  const parts: string[] = []
  parts.push(wh1ABox(200, 40, 220, 52, c11.panel2, c11.orange, 9))
  parts.push(wh1ATxt(310, 62, 'THE EVENT', 13.5, c11.orange, 'middle', '700'))
  parts.push(wh1ATxt(310, 80, '(the past, as it happened)', 11.5, c11.tealInk))
  parts.push(wh1AArrow(310, 96, 310, 150, c11.amber, 2.2))
  parts.push(wh1ATxt(452, 128, 'time arrow', 11.5, c11.amber, 'start'))
  parts.push(wh1ABox(155, 152, 310, 74, c11.panel, c11.green, 9))
  parts.push(wh1ATxt(310, 178, 'PRIMARY SOURCE', 13, c11.ink, 'middle', '700'))
  parts.push(wh1ATxt(310, 200, 'made by the period itself:', 11.5, c11.tealInk))
  parts.push(wh1ATxt(310, 216, 'edict, coin, sherd, eyewitness letter', 11.5, c11.tealInk))
  parts.push(wh1AArrow(310, 230, 310, 286, c11.amber, 2.2))
  parts.push(wh1ABox(175, 288, 270, 74, c11.paper, c11.teal, 9))
  parts.push(wh1ATxt(310, 314, 'SECONDARY SOURCE', 13, c11.tealInk, 'middle', '700'))
  parts.push(wh1ATxt(310, 336, 'built later FROM the primaries:', 11.5, c11.tealInk))
  parts.push(wh1ATxt(310, 352, 'monograph, survey, textbook chapter', 11.5, c11.tealInk))
  parts.push(wh1ALine(60, 40, 60, 362, c11.mid, 2, '6 5'))
  parts.push(wh1ATxt(60, 24, 'later', 11.5, c11.mid))
  return wh1ASvg(620, 400, 'The source ladder: an event leaves primary sources made by the period itself, and later historians build secondary sources from them', parts)
}

const wh1AF3 = (): string => {
  const parts: string[] = []
  parts.push(wh1ABox(50, 34, 250, 300, c11.panel, c11.green, 10))
  parts.push(wh1ABox(320, 34, 250, 300, c11.panel2, c11.orange, 10))
  parts.push(wh1ATxt(175, 64, 'EXTERNAL CRITICISM', 13.5, c11.ink, 'middle', '700'))
  parts.push(wh1ATxt(175, 84, 'is the evidence GENUINE?', 12, c11.tealInk))
  const extQs = ['material: paper, stone, metal', 'script and language of the age', 'anachronisms in names, facts', 'provenance: who found it, when']
  extQs.forEach((q, i) => {
    parts.push(wh1ADot(72, 124 + i * 44, c11.green, 4.5))
    parts.push(wh1ATxt(84, 129 + i * 44, q, 12, c11.ink, 'start', '500'))
  })
  parts.push(wh1ATxt(445, 64, 'INTERNAL CRITICISM', 13.5, c11.orange, 'middle', '700'))
  parts.push(wh1ATxt(445, 84, 'is the testimony CREDIBLE?', 12, c11.tealInk))
  const intQs = ['bias: who wrote, for whom?', 'context: what did they know?', 'plausibility against other data', 'corroboration across sources']
  intQs.forEach((q, i) => {
    parts.push(wh1ADot(342, 124 + i * 44, c11.orange, 4.5))
    parts.push(wh1ATxt(354, 129 + i * 44, q, 12, c11.ink, 'start', '500'))
  })
  parts.push(wh1ATxt(310, 372, 'a document must pass BOTH panels before it counts', 12.5, c11.tealInk))
  return wh1ASvg(620, 400, 'The two criticisms side by side: external criticism asks whether the evidence is genuine, internal criticism asks whether the testimony is credible', parts)
}

const wh1AF4 = (): string => {
  const parts: string[] = []
  const X0 = 80, X1 = 560
  const yMid = 210
  const yearX = (y: number): number => X0 + ((y + 500) / 2500) * (X1 - X0)
  parts.push(wh1ALine(X0, yMid, X1, yMid, c11.green, 2.6))
  for (const y of [-500, 0, 500, 1000, 1500, 2000]) {
    const x = yearX(y)
    parts.push(wh1ALine(x, yMid - 6, x, yMid + 6, c11.green, 1.6))
    const tick = y === 0 ? '1 BCE | 1 CE' : y < 0 ? '\u2212' + String(-y) + ' BCE' : String(y) + ' CE'
    parts.push(wh1ATxt(x, yMid + 26, tick, 11.5, c11.tealInk))
  }
  const bars: Array<{ name: string; y0: number; y1: number; row: number; col: string; short?: boolean }> = [
    { name: 'Herodotus', y0: -484, y1: -425, row: 0, col: c11.orange },
    { name: 'Thucydides', y0: -460, y1: -400, row: 1, col: c11.orange },
    { name: 'Sima Qian', y0: -145, y1: -86, row: 2, col: c11.amber },
    { name: 'Ibn Khaldun', y0: 1332, y1: 1406, row: 3, col: c11.teal },
    { name: 'Ranke', y0: 1795, y1: 1886, row: 0, col: c11.teal, short: true },
    { name: 'Bloch', y0: 1886, y1: 1944, row: 1, col: c11.teal, short: true },
    { name: 'Carr', y0: 1892, y1: 1982, row: 2, col: c11.teal, short: true },
  ]
  bars.forEach((b) => {
    const y = 92 + b.row * 38
    const x0 = yearX(b.y0), x1 = yearX(b.y1)
    parts.push(wh1ALine(x0, y, Math.max(x1, x0 + 3), y, b.col, 5, ''))
    parts.push(wh1ADot(x0, y, b.col, 3.5))
    parts.push(wh1ADot(Math.max(x1, x0 + 3), y, b.col, 3.5))
    const y0a = Math.abs(b.y0), y1a = Math.abs(b.y1)
    const long = b.name + ' ' + (b.y0 < 0 ? '\u2212' + y0a + ' BCE' : y0a) + ' to ' + (b.y1 < 0 ? '\u2212' + y1a + ' BCE' : y1a)
    const lbl = b.short ? b.name : long
    const useEnd = b.short === true && x0 > 460
    const lx = useEnd ? Math.min(x1, 556) : x0
    parts.push(wh1ATxt(lx, y - 8, lbl, 11.5, c11.ink, useEnd ? 'end' : 'start', '500'))
  })
  const gx0 = yearX(-425), gx1 = yearX(-145)
  parts.push(wh1ALine(gx0, yMid - 44, gx1, yMid - 44, c11.red, 1.8, '4 4'))
  parts.push(wh1ATxt((gx0 + gx1) / 2, yMid - 52, '569 years (no year zero)', 11.5, c11.red, 'middle', '600'))
  parts.push(wh1ALine(yearX(-484), 348, yearX(1377), 348, c11.mid, 1.8, '4 4'))
  parts.push(wh1ATxt((yearX(-484) + yearX(1377)) / 2, 366, 'Herodotus to the Muqaddimah: 484 + 1377 \u2212 1 = 1860 years', 11.5, c11.tealInk, 'middle', '600'))
  return wh1ASvg(640, 400, 'The historiographical lineage on one scaled time axis from 500 BCE to 2000 CE, with the 569-year gap between Herodotus and Sima Qian and the 1860-year reach to Ibn Khaldun', parts)
}

const wh1AF5 = (): string => {
  const parts: string[] = []
  const segs = [
    { n: 12, label: 'annals', col: c11.green },
    { n: 10, label: 'tables', col: c11.teal },
    { n: 8, label: 'treatises', col: c11.amber },
    { n: 30, label: 'houses', col: c11.orange },
    { n: 70, label: 'biographies', col: c11.mid },
  ]
  const total = segs.reduce((m, s) => m + s.n, 0)
  const X0 = 70, W = 500, y = 120, H = 56
  let acc = 0
  segs.forEach((s) => {
    const w = (s.n / total) * W
    parts.push(`<rect x="${(X0 + acc).toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="${H}" fill="${s.col}" fill-opacity="0.85" stroke="${c11.paper}" stroke-width="1.6"/>`)
    if (w > 44) parts.push(wh1ATxt(X0 + acc + w / 2, y + 33, `${s.n}`, 13.5, c11.white, 'middle', '700'))
    parts.push(wh1ATxt(X0 + acc + w / 2, y + H + 22, `${s.label} (${s.n})`, 11.5, c11.ink))
    acc += w
  })
  parts.push(wh1ATxt(X0 + W / 2, 60, 'The Shiji census: 12 + 10 + 8 + 30 + 70 = 130 chapters', 13, c11.ink, 'middle', '700'))
  parts.push(wh1ATxt(X0 + W / 2, 246, 'completed c. 94 BCE by Sima Qian \u2014 the model of every later official history', 11.5, c11.tealInk))
  return wh1ASvg(640, 280, 'The Shiji census as a stacked bar: 12 annals, 10 tables, 8 treatises, 30 hereditary houses and 70 biographies make 130 chapters', parts)
}

const wh1AF6 = (): string => {
  const parts: string[] = []
  parts.push(wh1ABox(40, 40, 240, 180, c11.panel2, c11.red, 10))
  parts.push(wh1ATxt(160, 70, 'ONE SOURCE', 13, c11.red, 'middle', '700'))
  parts.push(wh1ADot(160, 130, c11.red, 6))
  parts.push(wh1ATxt(160, 160, 'a claim hangs on', 12, c11.ink))
  parts.push(wh1ATxt(160, 180, 'one writer\u2019s word', 12, c11.ink))
  parts.push(wh1ATxt(160, 204, 'error risk: full', 11.5, c11.red))
  parts.push(wh1AArrow(300, 130, 350, 130, c11.amber, 2.2))
  parts.push(wh1ABox(368, 40, 230, 180, c11.panel, c11.green, 10))
  parts.push(wh1ATxt(483, 70, 'THREE, INDEPENDENT', 13, c11.ink, 'middle', '700'))
  parts.push(wh1ADot(433, 120, c11.green, 6))
  parts.push(wh1ADot(483, 120, c11.green, 6))
  parts.push(wh1ADot(533, 120, c11.green, 6))
  parts.push(wh1ALine(433, 128, 483, 152, c11.teal, 1.8))
  parts.push(wh1ALine(483, 128, 533, 152, c11.teal, 1.8))
  parts.push(wh1ALine(433, 128, 533, 152, c11.teal, 1.8))
  parts.push(wh1ADot(483, 156, c11.orange, 5))
  parts.push(wh1ATxt(483, 186, 'agreement multiplies', 12, c11.ink))
  parts.push(wh1ATxt(483, 204, 'confidence', 12, c11.ink))
  parts.push(wh1ATxt(310, 260, 'corroboration: independent sources converging', 12.5, c11.tealInk, 'middle', '600'))
  parts.push(wh1ATxt(310, 286, 'dependent copies count as one origin, one error', 12, c11.amber))
  return wh1ASvg(620, 320, 'The corroboration diagram: one source against three independent sources converging on the same claim', parts)
}

export const lessonWh101: Lesson = {
  id: 'wh-how-history-is-written',
  number: '1.1',
  title: 'How History Is Written',
  concepts: [
    'historiography',
    'primary source',
    'secondary source',
    'external criticism',
    'internal criticism',
    'corroboration',
    'historia',
    'the Annales school',
  ],
  objectives: [
    'State what historiography is and why history is a method rather than a list of facts',
    'Classify evidence as primary or secondary and justify the classification for a given artefact',
    'Apply external criticism (genuineness) and internal criticism (credibility) to a document',
    'Explain why a single source settles nothing and why corroboration requires INDEPENDENT sources',
    'Place Herodotus, Thucydides, Sima Qian, Ibn Khaldun, Ranke, Bloch and Carr on a time axis and name each one\u2019s methodological move',
    'Compute spans across the BCE/CE line with the no-year-zero rule (span = A + B \u2212 1)',
  ],
  sources: ['wh-survey-ground', 'wh-web-historians'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening                                                     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The craft, not the list' },
    {
      kind: 'para',
      text: 'Ask a stranger what history is and the answer is usually a list: dates, kings, battles, the things that happened. Ask a working historian and you will get something quite different \u2014 a set of questions, a discipline for answering them, and an honesty about how much the answers can be trusted. That discipline is what this chapter teaches. History is not the past; the past is gone. History is what we can honestly KNOW about the past, and the word that names the skill of getting there is historiography \u2014 literally the writing of history, but meaning far more: the whole craft of interrogating evidence, weighing testimony and building an account that survives examination.',
    },
    {
      kind: 'para',
      text: 'This book begins with the craft for a practical reason. Everything that follows \u2014 the farmers and cities of chapter 2, the empires and revolutions of the later chapters \u2014 rests on evidence that reached us through chains of survival and transcription nobody planned. If you do not know how those chains are audited, every later chapter is just another list. If you do, every chapter becomes a set of claims you can weigh. The historian\u2019s first question is never \u201cwhat happened?\u201d but \u201chow do we know?\u201d \u2014 and the answer to the second question is what separates history from legend.',
    },
    {
      kind: 'para',
      text: 'The craft is also older and more worldly than people expect. It was not invented in a modern university. A Greek inquirer in the fifth century BCE was already distinguishing what he had seen from what he had been told; a Chinese court official of the Han dynasty was already building a national history out of archives; a fourteenth-century scholar writing in North Africa was already demanding that reports be checked against the general conditions of their period. What the modern centuries added was rigor and scale: the archive, the seminar, the journal, the systematic criticism of sources. In this lesson we walk that whole line \u2014 the method itself, the two kinds of evidence, the two kinds of criticism, and the historians who built the craft.',
    },
    {
      kind: 'para',
      text: 'A note on how to read this lesson. You will meet several dates and spans, and we will compute several of them outright \u2014 because in history, as in every other discipline in this library, the arithmetic is checkable. The years run across the BCE/CE boundary with a quirk that catches everyone: there is no year zero. The span rule and its witnesses appear as worked derivations, and the quiz and exercises will make you compute spans yourself. By the end you should be able to say not only \u201cHerodotus lived in the fifth century BCE\u201d but \u201cfrom Herodotus\u2019s death around 425 BCE to Sima Qian\u2019s birth around 145 BCE is 569 years, because 425 + 145 \u2212 1 = 569.\u201d The engine behind every number in this lesson is the pin checker; the prose never wins against it.',
    },

    /* -------------------------------------------------------------- */
    /* 2. historiography                                              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Historiography: the inquiry defined' },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Historiography',
      text: 'Historiography is the writing of history AND the study of how history is written: the methods by which evidence is found, criticised and turned into an account, together with the way those methods have changed over time. The word descends from the Greek histor\u00eda \u2014 inquiry, investigation \u2014 the word Herodotus put in the opening line of his work: \u201cThis is the publication of the inquiry of Herodotus of Halicarnassus\u2026\u201d Thus, every history you read is itself evidence of a historiography: it shows you what its author counted as proof.',
    },
    {
      kind: 'para',
      text: 'The cycle of the craft has six moves, and Figure 1 draws them as a circle because the last move feeds the first. It begins with a question \u2014 not a topic, a QUESTION: why did this empire fall, who actually read this edict, whose voices are missing from this archive? The question sends the historian hunting for sources. The sources are then criticised \u2014 audited for genuineness and for credibility, the two moves of the next section. Only then comes synthesis: the surviving, credible evidence is assembled into an argument. The narrative is the writing itself \u2014 and because a written account raises questions its sources could not answer, the cycle turns: new questions, another hunt. Nobody \u201cfinishes\u201d history; the cycle is the point.',
    },
    { kind: 'figure', caption: 'Figure 1. The historian\u2019s craft as a cycle of six moves \u2014 question, source hunt, criticism, synthesis, narrative, new questions. The arrows run one way because every finished narrative generates the questions that reopen the hunt.', svg: wh1AF1() },
    {
      kind: 'para',
      text: 'Notice what the cycle does NOT contain. It does not contain \u201clook up what happened\u201d, because the past does not come pre-looked-up. It does not contain \u201cinclude everything\u201d, because the sources are not everything \u2014 they are what survived, and survival is biased (stone outlasts cloth; courts commission chronicles; the poor rarely write). The method\u2019s honesty lives in that admission: a history is an argument from PARTIAL evidence, and part of the craft is knowing how partial. E. H. Carr put the modern version of this in 1961: history is \u201can unending dialogue between the present and the past\u201d \u2014 the historian\u2019s questions are of this century, the evidence is of another, and the dialogue never closes.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        '(i) Question \u2014 sharpen a topic into something evidence could decide.',
        '(ii) Source hunt \u2014 find what the period itself left behind (the next section splits this register).',
        '(iii) Criticism \u2014 audit genuineness (external) and credibility (internal).',
        '(iv) Synthesis \u2014 assemble the audited evidence into an argument.',
        '(v) Narrative \u2014 write the account, citing as you go.',
        '(vi) New questions \u2014 the account\u2019s gaps reopen the cycle.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 3. primary against secondary                                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Primary against secondary' },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Primary source',
      text: 'A primary source is evidence produced by the period being studied \u2014 made by its participants, witnesses, institutions or materials at the time. An Ashokan edict carved in the 3rd century BCE is a primary source for Ashoka\u2019s reign; a coin struck in a Gupta mint is a primary source for Gupta rule; a soldier\u2019s letter is a primary source for his war. Thus, the test is not \u201cold\u201d or \u201cwritten\u201d but \u201cmade by the period itself\u201d.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Secondary source',
      text: 'A secondary source is an account produced LATER by someone who was not the witness, built from primary sources. A modern monograph on the Mauryas is secondary; so is a chronicle written two centuries after the events it reports, when its author relies on earlier accounts. Thus, the distance between a secondary source and its subject is exactly the distance its author must bridge with criticism.',
    },
    {
      kind: 'para',
      text: 'The two definitions pair with Figure 2\u2019s ladder. The event stands at the top; from it, the period itself drops PRIMARY traces \u2014 the edict, the coin, the sherd, the letter. Much later, a historian builds SECONDARY accounts from those traces. The ladder matters because each rung adds risk. A primary source is as close to the event as evidence gets, but it is a fragment: an edict praises its patron and never mentions his defeats. A secondary source can weigh many fragments together \u2014 that is its power \u2014 but it inherits every error of every fragment it used, plus whatever its own age adds. Neither rung is \u201cbetter\u201d; the craft is knowing what each can carry.',
    },
    { kind: 'figure', caption: 'Figure 2. The source ladder. An event leaves primary traces (made by the period itself); later writers build secondary accounts from those traces. Each rung down the ladder is one step further from the event and one layer deeper in inference.', svg: wh1AF2() },
    {
      kind: 'para',
      text: 'Classification is not always instant, and the exercises will make you argue some borderline cases. A newspaper printed during the events it describes is primary for those events. The same newspaper reprinted in a anthology a century later is still primary in content \u2014 but the anthology\u2019s introduction is secondary. A history book written in 1900 about the 1857 uprising is secondary; the same book\u2019s appendix of reproduced proclamations contains primary material. The table below works four canonical witnesses from this book\u2019s arc; the pattern generalises: ask WHO made it and WHEN, not what it looks like.',
    },
    {
      kind: 'table',
      head: ['Event', 'Primary witness', 'Secondary account'],
      rows: [
        ['The Greco-Persian Wars', 'Eyewitness letters, inscriptions, arrowheads dug from the battlefields', 'Herodotus\u2019s Histories (a near-contemporary inquiry) and every later survey'],
        ['Ashoka\u2019s reign', 'The Major Rock and Pillar Edicts, orders carved by his own administration', 'Any modern chapter on the Mauryan empire'],
        ['Chandragupta Maurya\u2019s court', 'Megasthenes\u2019s Indica \u2014 the ambassador\u2019s own report (surviving in fragments)', 'Reconstructions built from the fragments and from Indian treatises'],
        ['The uprising of 1857', 'Rebel proclamations, dispatches, contemporary prints', 'The historian\u2019s monograph written a century or more later'],
      ],
    },

    /* -------------------------------------------------------------- */
    /* 4. the two criticisms                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The two criticisms' },
    {
      kind: 'para',
      text: 'Suppose the hunt has produced a document: a copper-plate grant, a chronicle, a memoir. Before it counts as evidence it faces TWO audits, in order, and Figure 3 draws them as the two panels every document must pass. The first is external criticism: is the evidence GENUINE \u2014 is this artefact what it claims to be, from when and where it claims? The second is internal criticism: is the testimony CREDIBLE \u2014 granting that it is genuine, is what it says true, and for whom is it speaking? The order matters: a forgery never reaches the credibility question, because a fake tells you nothing about its period except the forger\u2019s.',
    },
    {
      kind: 'derivation',
      title: 'External criticism as a protocol',
      statement: 'Given an artefact claimed to be from period P, establish whether it is genuinely of P.',
      steps: [
        {
          label: 'Material check',
          explanation: 'Ask what the artefact is physically made of and whether that material, its manufacture and its wear fit period P. Paper of a type unknown in P, or metal worked by a process invented after P, fails at once.',
        },
        {
          label: 'Script and language check',
          explanation: 'Ask whether the script, spelling, grammar and formulae belong to P. A \u201cmedieval\u201d charter written in a script standardised later, or using vocabulary first recorded after P, fails.',
        },
        {
          label: 'Anachronism check',
          explanation: 'Ask whether the content mentions anything that did not exist in P \u2014 a person, an office, a technology, a place name. One true anachronism condemns the whole artefact: the gunpowder army in a manuscript that claims an earlier century.',
        },
        {
          label: 'Provenance check',
          explanation: 'Ask for the artefact\u2019s find-story: who found it, where, when, and who has held it since. An object with no provenance is unanchored, however fine it looks \u2014 provenance is what ties the object to the ground.',
        },
      ],
      result: 'An artefact is externally genuine only when material, script, content and provenance all agree with the claimed period; one loud disagreement is enough to reject it.',
    },
    {
      kind: 'para',
      text: 'Internal criticism then interrogates the testimony itself, and it begins from an uncomfortable truth: every source has a position. Court chronicles are commissioned by courts; temple inscriptions record donors; memoirs remember their authors fondly. None of this makes sources useless \u2014 it makes them SPEAKING, and the critic\u2019s job is to hear what the position does to the account. Ibn Khaldun, writing in the fourteenth century, built a whole methodology on this: reports must be checked against \u201cthe general conditions of the period\u201d, because unlikely stories circulate and each transcriber adds something. His word for the social force that moves accounts \u2014 asabiyyah, group solidarity \u2014 is a reminder that even honest witnesses see from somewhere.',
    },
    { kind: 'figure', caption: 'Figure 3. The two criticism panels. External criticism audits genuineness (material, script, anachronisms, provenance); internal criticism audits credibility (bias, context, plausibility, corroboration). A document must pass BOTH before it counts as evidence.', svg: wh1AF3() },
    {
      kind: 'para',
      text: 'The two panels answer different questions about the SAME artefact, and exam questions love the distinction because it is easy to blur. Checking whether a manuscript\u2019s paper was available in the claimed century is external. Asking whether the chronicler, a court employee, had reason to inflate his patron\u2019s victories is internal. Dating the ink chemically is external; noticing that the author reports things he cannot have seen as if he saw them is internal. The exercises at the end of this lesson drill exactly this sorting.',
    },

    /* -------------------------------------------------------------- */
    /* 5. bias and corroboration                                      */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Bias and corroboration' },
    {
      kind: 'para',
      text: 'If every source speaks from somewhere, how does an account ever become solid? The answer is the craft\u2019s central move: corroboration \u2014 and its secret ingredient is independence. Two witnesses agreeing is worth something only if they could not have copied each other. A court chronicle and the inscription that chronicle\u2019s author read are ONE voice in two costumes: one origin, one error, inherited whole. But a court chronicle, a merchant\u2019s letter and a foreign ambassador\u2019s report that all agree \u2014 three origins, three sets of eyes, three chances to err INDEPENDENTLY \u2014 make a claim difficult to dismiss. Figure 4 draws the contrast: one source holds a claim up alone; independent sources converge on it from different directions.',
    },
    {
      kind: 'derivation',
      title: 'Why one source settles nothing',
      statement: 'Show why agreement between sources strengthens a claim only when the sources are independent.',
      steps: [
        {
          label: 'Model a single source',
          explanation: 'A source carries the claim with some chance of error. One source is one roll of that chance: the claim is exactly as reliable as that one witness \u2014 which is to say, not settled.',
        },
        {
          label: 'Dependent sources collapse',
          explanation: 'If witness B copied witness A (a chronicle repeating an inscription, an encyclopedist repeating a chronicle), then B\u2019s agreement adds no new evidence: A\u2019s single error propagates to both. Two dependent voices are one voice.',
        },
        {
          label: 'Independent sources multiply',
          explanation: 'If B and C could NOT have copied A, agreement among them requires separate coincidences. The probability that all three err in the same direction is the product of three small chances \u2014 far smaller than any one.',
        },
        {
          label: 'Conclude the rule',
          explanation: 'Hence the working rule: corroborate with INDEPENDENT sources; count dependent copies as their original; and when independence is uncertain, treat the agreement as weak.',
        },
      ],
      result: 'Agreement strengthens a claim exactly to the degree the agreeing sources are independent; corroboration is counted in origins, not in documents.',
    },
    { kind: 'figure', caption: 'Figure 4. The corroboration diagram. A single source holds a claim up alone; three independent sources converging on the same claim make it hard to dismiss. Dependent copies (a chronicle repeating an inscription) count as ONE origin, not two.', svg: wh1AF6() },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Note \u2014 corroboration is counted in origins',
      text: 'When you read that \u201cseveral sources agree\u201d, the working historian\u2019s next question is always: how many ORIGINS? A quotation chain \u2014 inscription quoted by chronicle, chronicle copied by scribes, scribes printed by an editor \u2014 is one origin with many megaphones. The exam-standard answer and the honest one are the same: check the transmission before trusting the choir.',
    },

    /* -------------------------------------------------------------- */
    /* 6. the lineage                                                 */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The lineage: from Herodotus to Carr' },
    {
      kind: 'para',
      text: 'The craft has a history of its own, and it is worth knowing not as trivia but because each figure below added a move that is still in use. The founder, by the ancient world\u2019s own verdict, is Herodotus (c. 484 \u2013 c. 425 BCE) \u2014 Cicero later called him the Father of History, and the title stuck. His work, the Histories, is an account of the Greco-Persian Wars, but its METHOD is what matters here: he opens by calling it an histor\u00eda \u2014 an inquiry \u2014 and states his aim as keeping \u201cthe traces of human events from being erased by time\u201d. He reports what he saw, what he was told, and often distinguishes the two, sometimes giving several versions and leaving you to weigh them. That instinct \u2014 show your evidence, mark its distance \u2014 is the seed of everything else in this lesson.',
    },
    {
      kind: 'para',
      text: 'The next Greek move is harder-nosed. Thucydides (c. 460 \u2013 c. 400 BCE), an exiled Athenian general, wrote the History of the Peloponnesian War from the inside: he had commanded in it, and he treats eyewitness position (autopsy) as the first credential. He rejects borrowed tales, cross-examines informants, and complains openly about how hard truthful accuracy is. The two men were coeval \u2014 their working lives overlapped about 35 years (460 \u2212 425 = 35) \u2014 and the pairing is a permanent lesson: from the very beginning the craft carried BOTH registers, Herodotus\u2019s wide inquiry and Thucydides\u2019s narrow verified one, and neither ever fully replaced the other.',
    },
    {
      kind: 'para',
      text: 'China builds the institutional version. Sima Qian (c. 145 \u2013 c. 86 BCE), who inherited the taishi (grand historian) post at the Han court, completed around 94 BCE the Shiji \u2014 the Records of the Grand Historian \u2014 a work covering some two thousand years and organised into 130 chapters: 12 basic annals, 10 tables, 8 treatises, 30 accounts of hereditary houses and 70 ordered biographies (12 + 10 + 8 + 30 + 70 = 130). Its structure became the model for the official histories of every later dynasty. From Herodotus\u2019s death to Sima Qian\u2019s birth, notice, is 425 + 145 \u2212 1 = 569 years \u2014 two traditions whose foundations lie well over half a millennium apart, and which never met.',
    },
    {
      kind: 'para',
      text: 'The craft gains its sharpest pre-modern critic in Ibn Khaldun (1332 \u2013 1406), the North African scholar whose Introduction \u2014 the Muqaddimah, completed in 1377 after a period of seclusion with a Berber tribe at Qalat Ibn Salama \u2014 reads today like a manual of source criticism. His rules: reports are not to be accepted wholesale; the transmitters add and embellish; each report must be confronted with \u201cthe general conditions of the period\u201d; and the engine of political change is asabiyyah, the group solidarity whose rise and decay explains why dynasties behave in cycles. From Herodotus\u2019s world to the Muqaddimah is 484 + 1377 \u2212 1 = 1860 years \u2014 and the distance is worth feeling: the craft was reinvented independently, and the reinvention looks startlingly modern.',
    },
    {
      kind: 'para',
      text: 'The modern European turn professionalises the craft. Leopold von Ranke (1795 \u2013 1886 \u2014 a ninety-one-year life) demanded in the preface of his 1824 work to show \u201cwie es eigentlich gewesen\u201d \u2014 how it essentially, actually was \u2014 and built the method to match: archives over anecdotes, primary documents over inherited summaries, and the seminar as a training workshop. Marc Bloch (1886 \u2013 1944), co-founder with Lucien Febvre of the journal Annales in 1929, widened the craft\u2019s lens from events to structures \u2014 economies, landscapes, mentalities \u2014 and left, unfinished at his execution by the Gestapo in 1944, the little book this lesson\u2019s craft chapters echo, The Historian\u2019s Craft, published in 1949. E. H. Carr (1892 \u2013 1982) closed the arc in 1961 with What Is History? \u2014 a book of the Trevelyan Lectures \u2014 insisting that the historian and the facts act on each other in that \u201cunending dialogue\u201d. The lineage table gathers the census.',
    },
    { kind: 'figure', caption: 'Figure 5. The lineage on one time axis, 500 BCE to 2000 CE. The 569-year gap separates Herodotus\u2019s death from Sima Qian\u2019s birth; the 1860-year reach runs to Ibn Khaldun\u2019s Muqaddimah. The modern cluster (Ranke, Bloch, Carr) compresses into the last two centuries.', svg: wh1AF4() },
    {
      kind: 'table',
      head: ['Historian', 'Dates', 'Work', 'The move that stays'],
      rows: [
        ['Herodotus', 'c. 484 \u2013 c. 425 BCE', 'The Histories', 'Inquiry (historia); report and mark the evidence\u2019s distance'],
        ['Thucydides', 'c. 460 \u2013 c. 400 BCE', 'History of the Peloponnesian War', 'Eyewitness autopsy; cross-examine informants'],
        ['Sima Qian', 'c. 145 \u2013 c. 86 BCE', 'Shiji (130 chapters, c. 94 BCE)', 'The official-history model; archives and biography'],
        ['Ibn Khaldun', '1332 \u2013 1406', 'Muqaddimah (1377)', 'Test reports against the period\u2019s general conditions; asabiyyah'],
        ['Leopold von Ranke', '1795 \u2013 1886', 'the 1824 histories', 'Archival primaries; \u201cwie es eigentlich gewesen\u201d'],
        ['Marc Bloch', '1886 \u2013 1944', 'Annales (1929, with Febvre); The Historian\u2019s Craft (1949)', 'Structures over events; the comparative method'],
        ['E. H. Carr', '1892 \u2013 1982', 'What Is History? (1961)', 'History as an unending dialogue between present and past'],
      ],
    },

    /* -------------------------------------------------------------- */
    /* 7. illustrations                                               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Illustrations' },
    {
      kind: 'example',
      title: 'Date a manuscript by its anachronism',
      steps: [
        'Sol. A dealer offers a manuscript said to be a twelfth-century chronicle; on page nine it describes an army firing gunpowder rockets.',
        'Check the content first: gunpowder warfare is a dated technology, and its appearance fixes a floor for the manuscript\u2019s age.',
        'Now, run the external panel: material and script may look convincing, but the anachronism check has already failed \u2014 one true anachronism condemns the artefact.',
        'So, the manuscript is either misdated or fabricated; either way it is NOT a twelfth-century source for twelfth-century events.',
        'Hence the verdict: reject as external evidence; the credible content, if any, can be no older than the anachronistic technology\u2019s introduction.',
      ],
    },
    {
      kind: 'example',
      title: 'Cross-check Megasthenes with the fragments',
      steps: [
        'Sol. Megasthenes, ambassador of Seleucus I to Chandragupta Maurya around 302 BCE, wrote the Indica; the book itself is lost.',
        'Take, the surviving fragments: later Greek and Latin writers quote him, and those quotations are what we actually hold.',
        'Check, each fragment for internal criticism \u2014 what did an ambassador plausibly see, what did he report at second hand, what did his Greek expectations make him say?',
        'Or, set the fragments beside Indian treatises and archaeology of the Mauryan period and ask where they agree INDEPENDENTLY.',
        'Hence the working picture: the Indica is a genuine primary voice in broken transmission \u2014 usable, but every quotation inherits a transcriber, and corroboration does the weighting.',
      ],
    },
    {
      kind: 'example',
      title: 'Read a court chronicle for bias',
      steps: [
        'Sol. A dynastic chronicle, commissioned by the royal court, reports the king\u2019s victories in detail and his defeats in a line each.',
        'Ask, the internal panel\u2019s first question: who wrote this, for whom, and paid by whom? A commissioned history has a patron.',
        'So, read the asymmetry as DATA: the disproportion between victories and defeats is itself evidence of the chronicle\u2019s position, and sometimes of the pressures on the court.',
        'Check, external records against it \u2014 rival chronicles, foreign accounts, inscriptions \u2014 to weigh what the asymmetry hides.',
        'Hence the ruling: the chronicle is not discarded for bias; it is mined WITH its bias in hand, and corroboration decides what survives.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 8. exam corner                                                 */
    /* -------------------------------------------------------------- */
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner \u2014 where this is examined',
      text: 'UPSC General Studies I expects the world register read through events and their evidence, and its History optional carries historiography directly (the schools, the sources, the critics); UGC NET History paper codes 06 tests the same register; AP World History grades the historical-reasoning skill of sourcing and corroboration explicitly. The two-criticism sorting (external against internal), the primary/secondary classification and a span computation across the BCE/CE line are the three predictable question shapes from this lesson.',
    },

    /* -------------------------------------------------------------- */
    /* 9. terms + formulas                                            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Terms to keep' },
    {
      kind: 'terms',
      items: [
        { term: 'Historiography', def: 'The writing of history and the study of how it is written \u2014 the craft of evidence, criticism and account.' },
        { term: 'Historia', def: 'Greek for inquiry or investigation; the word Herodotus used for his work and the root of \u201chistory\u201d.' },
        { term: 'Primary source', def: 'Evidence made by the period itself \u2014 edict, coin, sherd, letter, inscription.' },
        { term: 'Secondary source', def: 'A later account built from primary sources; one step further from the event.' },
        { term: 'External criticism', def: 'The audit of genuineness: material, script, language, anachronisms, provenance.' },
        { term: 'Internal criticism', def: 'The audit of credibility: bias, context, plausibility, corroboration.' },
        { term: 'Corroboration', def: 'Independent sources agreeing on a claim; counted in origins, not documents.' },
        { term: 'Anachronism', def: 'A detail from a later time appearing in a supposedly earlier source \u2014 the forger\u2019s trap.' },
        { term: 'Provenance', def: 'The find-story and custody chain of an artefact; what anchors it to the ground.' },
        { term: 'Asabiyyah', def: 'Ibn Khaldun\u2019s term for group solidarity \u2014 the social force behind his cycle of dynasties.' },
      ],
    },
    { kind: 'heading', text: 'Formulas to keep' },
    { kind: 'formula', name: 'The span rule across the era line', latex: 'A + B - 1', note: 'years from A BCE to B CE \u2014 there is no year zero, so 1 BCE is followed directly by 1 CE' },
    { kind: 'formula', name: 'The Shiji census', latex: '12 + 10 + 8 + 30 + 70 = 130', note: 'the annals, tables, treatises, hereditary houses and biographies of Sima Qian\u2019s 130 chapters' },
    { kind: 'formula', name: 'The coeval window of the two Greeks', latex: '460 - 425 = 35', note: 'years of overlap between Thucydides\u2019s birth and Herodotus\u2019s death' },
    { kind: 'formula', name: 'Herodotus to the Muqaddimah', latex: '484 + 1377 - 1 = 1860', note: 'the span from Herodotus\u2019s birth to Ibn Khaldun\u2019s Muqaddimah (1377)' },
    { kind: 'formula', name: 'Ranke in numbers', latex: '1886 - 1795 = 91', note: 'the ninety-one-year life of the archival method\u2019s founder' },

    /* -------------------------------------------------------------- */
    /* 10. quiz                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'Which of these is a PRIMARY source for Ashoka\u2019s reign?',
          options: [
            'a modern university survey chapter on the Mauryan empire',
            'a primary source: the Major Rock Edicts, carved by Ashoka\u2019s own administration',
            'a textbook summary of Mauryan administration published in 2020',
            'a historical novel about Ashoka written in the 1990s',
          ],
          answer: 1,
          explain: 'The test is \u201cmade by the period itself\u201d: the edicts were carved by the reign\u2019s own administration in the 3rd century BCE, which makes them primary. Option (a) and option (c) are modern accounts built FROM the primaries \u2014 secondary by definition, whatever their quality. Option (d) is fiction written twenty-two centuries later, evidence of nothing except its own decade.',
        },
        {
          q: 'A manuscript\u2019s paper, script and ink are checked for compatibility with its claimed century. That check belongs to \u2014',
          options: [
            'external criticism, because it asks whether the artefact is genuine',
            'internal criticism, because it asks whether the text is credible',
            'corroboration, because it compares the manuscript with other witnesses',
            'periodisation, because it fixes the manuscript\u2019s century',
          ],
          answer: 0,
          explain: 'Material, script and ink are properties of the ARTEFACT, and the question they answer is genuineness \u2014 the external panel of Figure 3. Option (a) confuses the two panels: credibility (bias, plausibility) is internal criticism and begins only after genuineness is granted. Option (b) is the move of corroboration, which needs independent witnesses and is not an artefact audit. Option (d) names a chapter-1.3 concern, not this audit.',
        },
        {
          q: 'Who completed the Shiji \u2014 some 130 chapters of Records of the Grand Historian \u2014 around 94 BCE?',
          options: [
            'Herodotus of Halicarnassus, in his Histories',
            'Ibn Khaldun, in the Muqaddimah',
            'Sima Qian, inheritor of the taishi post at the Han court',
            'Thucydides, in his account of the Peloponnesian War',
          ],
          answer: 2,
          explain: 'The Shiji is Sima Qian\u2019s: c. 145 \u2013 c. 86 BCE, the court grand historian (taishi), 130 chapters = 12 annals + 10 tables + 8 treatises + 30 houses + 70 biographies, completed c. 94 BCE. Option (a) is the Greek founder whose Histories antedate it by over three centuries (425 + 145 \u2212 1 = 569 years between them). Option (c) is the fourteenth-century Muqaddimah\u2019s author \u2014 1377 CE. Option (d) wrote the Peloponnesian War, not a Chinese national history.',
        },
        {
          q: 'Two chronicles give the same account of a battle. Before treating the agreement as corroboration, the historian\u2019s first question must be \u2014',
          options: [
            'whether the chronicles are of similar length',
            'whether the battle was important enough to deserve two chronicles',
            'whether the chronicles were written in the same language',
            'whether the two accounts are independent \u2014 corroboration is counted in origins, so could one have copied the other?',
          ],
          answer: 3,
          explain: 'Corroboration is counted in origins: agreement strengthens a claim exactly to the degree the agreeing sources are independent. If chronicle B read chronicle A (or both read a common source), the agreement is one origin in two costumes and adds nothing. Option (a) is irrelevant \u2014 length measures nothing here. Option (c) mistakes importance for verification. Option (d) would matter for transmission chains, not for independence itself, and a shared language does not by itself defeat corroboration.',
        },
        {
          q: 'The journal Annales, founded in 1929 by Marc Bloch and Lucien Febvre, gave its name to a school known for \u2014',
          options: [
            'replacing archives with statistical models alone',
            'the Annales widening: history to structures \u2014 economies, landscapes, mentalities',
            'reconstructing only political events and great men',
            'denying that historical knowledge is possible',
          ],
          answer: 1,
          explain: 'The Annales school\u2019s signature is the widening of the historian\u2019s lens: long-running structures (economy, society, landscape, mentality) over single events and reigns. Option (b) describes exactly the register the Annales moved AWAY from. Option (a) is a caricature \u2014 the school quantified, but never abandoned the archive. Option (d) describes a radical scepticism the school never held; Bloch\u2019s posthumous The Historian\u2019s Craft (1949) is a confidence in the craft.',
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. exercises                                                  */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Classify each as primary or secondary for the events it touches: (i) an Ashokan Pillar Edict; (ii) a 2020 monograph on Mauryan administration; (iii) a soldier\u2019s letter written during his war; (iv) a TV documentary using that letter.',
              solution: [
                'Sol. Apply the one test: made by the period itself, or built later from such evidence?',
                '(i) The edict is carved by the reign\u2019s own administration \u2014 primary.',
                '(ii) The monograph is a modern account built from the primaries \u2014 secondary.',
                '(iii) The letter is written by a participant as the events run \u2014 primary.',
                '(iv) The documentary is a later construction using the letter \u2014 secondary.',
                'Hence primary: (i) and (iii); secondary: (ii) and (iv).',
              ],
              answer: '(i) primary, (ii) secondary, (iii) primary, (iv) secondary',
            },
            {
              q: 'Name the two criticisms, and say in one line each what question each asks.',
              solution: [
                'Sol. The two panels of Figure 3.',
                'External criticism asks: is the evidence GENUINE \u2014 material, script, anachronisms, provenance?',
                'Internal criticism asks: is the testimony CREDIBLE \u2014 bias, context, plausibility, corroboration?',
                'Hence external audits the artefact; internal audits the account.',
              ],
              answer: 'external criticism (genuineness of the artefact) and internal criticism (credibility of the testimony)',
            },
            {
              q: 'Compute with the span rule (no year zero): how many years run from Herodotus\u2019s death c. 425 BCE to Sima Qian\u2019s birth c. 145 BCE?',
              solution: [
                'Sol. Span rule across the era line: years from A BCE to B CE = A + B \u2212 1.',
                'Take, A = 425, B = 145: 425 + 145 \u2212 1 = 569.',
                'Hence 569 years \u2014 the gap that separates the Greek founder from the Chinese model.',
              ],
              answer: '569 years (425 + 145 \u2212 1 = 569)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'A chronicle of 1400 quotes verbatim an inscription of 1200, and a second chronicle of 1450 quotes the first chronicle. How many independent origins support the inscription\u2019s claim?',
              solution: [
                'Sol. Trace the transmission: inscription (1200) \u2192 chronicle 1 (1400) \u2192 chronicle 2 (1450).',
                'Each later text is a copy of the earlier one\u2019s testimony \u2014 dependent, not independent.',
                'So, the choir is one origin with many megaphones: corroboration counts origins, not documents.',
                'Hence exactly ONE independent origin \u2014 the inscription itself.',
              ],
              answer: '1 independent origin (the inscription; the chronicles are dependent copies)',
            },
            {
              q: 'Compute: from Herodotus\u2019s birth c. 484 BCE to Ibn Khaldun\u2019s Muqaddimah of 1377 \u2014 how many years?',
              solution: [
                'Sol. Span rule: 484 + 1377 \u2212 1.',
                'Take, 484 + 1377 = 1861; subtract the joint year\u2019s double count: 1861 \u2212 1 = 1860.',
                'Hence 1860 years from the Greek founder to the Muqaddimah\u2019s completion.',
              ],
              answer: '1860 years (484 + 1377 \u2212 1 = 1860)',
            },
            {
              q: 'Which move does each belong to \u2014 external or internal criticism? (i) chemical dating of the ink; (ii) noticing the author reports things he cannot have seen; (iii) checking a charter\u2019s formulae against the era\u2019s chancery style; (iv) asking who paid for the history to be written.',
              solution: [
                'Sol. Sort by the object of the question: the artefact, or the testimony?',
                '(i) Ink chemistry interrogates the physical artefact \u2014 external.',
                '(ii) Impossibility of what is REPORTED interrogates credibility \u2014 internal.',
                '(iii) Formulae and chancery style are artefact properties \u2014 external.',
                '(iv) Patronage interrogates the author\u2019s position and bias \u2014 internal.',
                'Hence external: (i) and (iii); internal: (ii) and (iv).',
              ],
              answer: '(i) external, (ii) internal, (iii) external, (iv) internal',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'The Shiji is organised into 130 chapters of five kinds. Verify the census from its components: 12 basic annals, 10 tables, 8 treatises, 30 hereditary houses, 70 ordered biographies.',
              solution: [
                'Sol. Add the five components: 12 + 10 = 22; 22 + 8 = 30; 30 + 30 = 60; 60 + 70 = 130.',
                'Check, the census against the reported total: 130 = 130 \u2014 the structure closes exactly.',
                'Hence the Shiji\u2019s census is 12 + 10 + 8 + 30 + 70 = 130 chapters, completed c. 94 BCE.',
              ],
              answer: '12 + 10 + 8 + 30 + 70 = 130 chapters',
              figures: [
                {
                  caption: 'The Shiji census drawn for the solution: 12 annals, 10 tables, 8 treatises, 30 hereditary houses and 70 ordered biographies stack to the 130 chapters completed c. 94 BCE.',
                  svg: wh1AF5(),
                },
              ],
            },
            {
              q: 'An \u201cearly medieval\u201d charter describes a naval battle using a compass type first attested two centuries later. The paper and script test as genuine for the claimed century. State the verdict and the audit step that drove it.',
              solution: [
                'Sol. The external panel\u2019s four checks: material, script, anachronism, provenance.',
                'Material and script passed; the content check \u2014 the anachronism check \u2014 fails on the compass.',
                'One true anachronism condemns the whole artefact, however clean the paper.',
                'Hence the verdict: reject as a source for the claimed century \u2014 the charter is misdated or interpolated; its compass passage postdates the compass type.',
              ],
              answer: 'reject (misdated or interpolated); driven by the anachronism check of external criticism',
            },
            {
              q: 'Why does a reprint of a 1857 rebel proclamation, published in a 1990 anthology, remain a primary source in content while the anthology\u2019s introduction is secondary?',
              solution: [
                'Sol. Classification follows the ORIGIN of each piece, not the book that carries it.',
                'The proclamation was authored by the rebels in 1857 \u2014 made by the period, wherever it is reprinted.',
                'The introduction was authored in 1990, interpreting that material \u2014 a later account from the primaries.',
                'Hence one book can carry both registers: the reproduction is primary in content; the apparatus around it is secondary.',
              ],
              answer: 'the proclamation is primary in content (1857 origin); the 1990 introduction is secondary',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'A coin hoard, a merchant\u2019s letter and a foreign ambassador\u2019s report all place a trade route through the same city. A court chronicle repeats the ambassador\u2019s report verbatim. Count the independent origins, and say what the hoard alone contributes that no text can.',
              solution: [
                'Sol. Count origins: coin hoard (material), merchant\u2019s letter (text), ambassador\u2019s report (text) \u2014 three independent voices.',
                'The chronicle repeats the ambassador \u2014 dependent, counts inside the ambassador\u2019s one origin.',
                'So, 3 independent origins support the route, not four.',
                'Now, the hoard\u2019s distinct contribution: it is material evidence \u2014 struck, buried and found coins need no transcriber, and their findspot is provenance no text possesses.',
                'Hence three independent origins; the hoard adds a mute, transmission-free witness.',
              ],
              answer: '3 independent origins (hoard, letter, ambassador; the chronicle is dependent); the hoard adds transmission-free material evidence',
            },
            {
              q: 'Compute the span from Ashoka\u2019s edicts (3rd century BCE, take 260 BCE) to the year 2026, and from the Rosetta decree (196 BCE) to Champollion\u2019s announcement of 1822 \u2014 and say which of the two gaps the Rosetta case divides into two parts.',
              solution: [
                'Sol. Span rule, first gap: 260 + 2026 \u2212 1 = 2285 years.',
                'Second gap, within-CE arithmetic: 1822 \u2212 196 BCE crosses the era line: 196 + 1822 \u2212 1 = 2017 years.',
                'Check, the sub-spans: 196 + 1799 \u2212 1 = 1994 years carved-to-found, then 1822 \u2212 1799 = 23 years found-to-read.',
                'So, 1994 + 23 = 2017 \u2014 the Rosetta gap divides into 1994 years in the ground and 23 years to the decipherment.',
                'Hence 2285 years for the edicts; 2017 years for the Rosetta case, split 1994 + 23.',
              ],
              answer: '2285 years (260 + 2026 \u2212 1); 2017 years (196 + 1822 \u2212 1), split as 1994 in the ground + 23 to decipherment',
              figures: [
                {
                  caption: 'The two spans drawn to one scale: Ashoka\u2019s edicts at 260 BCE reaching 2285 years to 2026, and the Rosetta decree\u2019s 2017 years split into 1994 years in the ground (196 BCE to the 1799 find) and 23 years to Champollion\u2019s 1822 announcement.',
                  svg: wh1AF7(),
                },
              ],
            },
            {
              q: 'A history of the 1857 uprising written in 1900 reproduces in its appendix three rebel proclamations of 1857, with the editor\u2019s footnotes. Separate the primary from the secondary material in that volume, and justify each ruling.',
              solution: [
                'Sol. Walk the volume piece by piece.',
                'The 1900 narrative interprets 1857 from later evidence \u2014 secondary.',
                'The reproduced proclamations were authored in 1857 \u2014 primary in content, regardless of the reprinting.',
                'The footnotes are 1900 editorial apparatus \u2014 secondary.',
                'So, the volume is a layered artefact: one register of 1857 voices inside a register of 1900 interpretation.',
                'Hence primary: the three proclamations as reproduced; secondary: the narrative and the footnotes.',
              ],
              answer: 'primary: the reproduced 1857 proclamations; secondary: the 1900 narrative and editorial footnotes',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'State the independence test for corroboration in one sentence, then apply it: an inscription of King A claims a victory; King A\u2019s own court chronicle records the same victory; a rival kingdom\u2019s chronicle, written independently, concedes a \u201csetback\u201d there. How many independent origins support the victory, and which is the strongest?',
              solution: [
                'Sol. The test: agreement counts only when the agreeing sources could not have copied each other.',
                'The inscription and the court chronicle share one origin \u2014 the king\u2019s own administration.',
                'The rival chronicle is a different polity, independent, and hostile \u2014 a witness against interest.',
                'So, 2 independent origins support the battle happening: the king\u2019s register and the rival\u2019s concession.',
                'Check, the strength: the rival\u2019s admission is the strongest \u2014 witnesses against interest pay a price for agreeing.',
                'Hence two independent origins; the rival chronicle\u2019s \u201csetback\u201d carries the most weight.',
              ],
              answer: '2 independent origins (the king\u2019s register counts as one; the rival chronicle is the second and the strongest \u2014 a witness against interest)',
            },
            {
              q: 'Ibn Khaldun\u2019s rule is to confront each report with \u201cthe general conditions of the period\u201d. A report claims a vizier assembled an army of a million men in a single season. Confront the report with conditions and state the internal-criticism verdict.',
              solution: [
                'Sol. The general conditions: medieval logistics \u2014 grain, transport, pay \u2014 set hard ceilings on army size and season.',
                'A million-man field army in one season exceeds every attested logistic figure for the period by an order of magnitude.',
                'So, the report fails plausibility against conditions \u2014 the number is rhetoric, inflation, or a scribal magnification.',
                'Hence the internal verdict: not credible as logistics; usable as evidence of the chronicler\u2019s rhetoric or the court\u2019s prestige economy \u2014 reclassify the datum, do not discard the source.',
              ],
              answer: 'not credible as logistics; reclassify as rhetoric/prestige claim \u2014 the report is reclassified, not discarded',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Build the full audit for a \u201clost\u201d chronicle that survives only as quotations inside three later works: (a) what does external criticism test, and on what object? (b) what does internal criticism test? (c) how many independent origins does the surviving text represent? (d) name the one circumstance under which the quotations would count as MORE than one origin.',
              solution: [
                'Sol. (a) External criticism tests the QUOTING manuscripts \u2014 their material, script and transmission \u2014 because the chronicle\u2019s own body is gone; the original cannot be audited directly.',
                '(b) Internal criticism tests the quoted text\u2019s credibility as transmitted: each quoter is an intermediary with motives and errors.',
                '(c) Origins: the chronicle itself is ONE origin, however many works quote it \u2014 dependent copies all.',
                '(d) The exception: quotations INDEPENDENTLY made from a lost common source (different quoter communities, different manuscripts of the chronicle, agreeing without contact) carry the force of that many independent manuscript traditions of the same text \u2014 still one authorial origin, but several independent TRANSMISSIONS.',
                'Hence: audit the quoters, criticise the transmission, count one authorial origin with as many independent transmissions as the quoting traditions.',
              ],
              answer: 'external audits the quoting manuscripts; internal audits the transmitted text; one authorial origin, more only in independent transmission traditions',
              figures: [
                {
                  caption: 'The corroboration structure of a lost work: one authorial origin carried by three quoting traditions \u2014 dependent copies count as one origin unless the quoting traditions are independent transmissions.',
                  svg: wh1AF6(),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

/* F7 \u2014 the two spans drawn to one scale (used by the L4 exercise) */
function wh1AF7(): string {
  const parts: string[] = []
  const yearX = (label: string, x: number): string => wh1ALine(x, 60, x, 300, c11.green, 1.6, '3 4') + wh1ATxt(x, 330, label, 11.5, c11.tealInk)
  parts.push(wh1ALine(60, 180, 580, 180, c11.mid, 2, ''))
  parts.push(yearX('196 BCE', 120))
  parts.push(yearX('1799', 470))
  parts.push(yearX('1822', 520))
  parts.push(yearX('260 BCE', 200))
  parts.push(yearX('2026', 560))
  parts.push(wh1ALine(200, 110, 560, 110, c11.orange, 4, ''))
  parts.push(wh1ATxt(380, 96, 'Ashoka\u2019s edicts \u2192 2026: 260 + 2026 \u2212 1 = 2285 years', 12, c11.orange, 'middle', '600'))
  parts.push(wh1ALine(120, 250, 520, 250, c11.teal, 4, ''))
  parts.push(wh1ALine(470, 250, 520, 250, c11.red, 4, ''))
  parts.push(wh1ATxt(295, 236, 'in the ground: 1994 years', 12, c11.teal, 'middle', '600'))
  parts.push(wh1ATxt(495, 222, '23 to read', 11.5, c11.red, 'middle', '600'))
  parts.push(wh1ATxt(320, 382, 'Rosetta total: 196 + 1822 \u2212 1 = 2017 = 1994 + 23', 12, c11.ink, 'middle', '600'))
  return wh1ASvg(640, 400, 'Two spans on one scale: Ashoka\u2019s edicts to 2026 (2285 years) and the Rosetta decree\u2019s 2017 years split into 1994 in the ground and 23 to decipherment', parts)
}

/* keep helpers referenced (they are used inside the figure functions) */
void wh1ADot

export const chapter1: Chapter = {
  number: 1,
  slug: 'the-historian-s-craft',
  title: 'The Historian\u2019s Craft',
  summary:
    'How history is actually written: primary against secondary sources, the literary against the archaeological register, external and internal criticism of a document, the archaeologist\u2019s sherd against the court chronicle; periodisation as a CONVENTION (the ancient/medieval/modern triad interrogated, not assumed) and the BC/BCE-CE dating census; and the map of this book\u2019s arc stated honestly \u2014 why world history is taught as one story and what that choice costs.',
  status: 'in-progress',
  lessons: [lessonWh101],
  plannedLessons: ['Sources: Literary and Archaeological', 'Time, Periodisation and the Calendar'],
}
