import type { Chapter, Lesson } from '../../../types'

/**
 * World History — chapter 1 "The Historian's Craft" — COMPLETE (3 of 3).
 *
 * OPENED by HSS RUN 1 (2026-11-27) with lesson 1.1; CLOSED COMPLETE by
 * HSS RUN 2 (2026-11-27) with lessons 1.2 and 1.3.
 *
 * The seats: 1.1 'How History Is Written' (57/57 seat-green — run 1's
 * amendment-5 solo relaunch after the swarm wall died twice empty);
 * 1.2 'Sources: Literary and Archaeological' (55/55) and 1.3 'Time,
 * Periodisation and the Calendar' (61/61) — run 2's solo relaunch after
 * the swarm wall answered twice more with context-deadline-exceeded and
 * zero bytes banked (8 consecutive dead subagent responses across the
 * two runs; the precedent stands). The chapter's planned census is the
 * HONEST 3-lesson shape: the four planning-pass artifact lines
 * ('Acknowledgements (duplicate)', "Chapter XIII. The Sources of Plato's
 * Opinions", 'Part I. The Fathers', 'Part II. The Schoolmen') were TOC
 * leaks from other books, trimmed per the pointer's reconcile step (b).
 *
 * PROVENANCE: ground = the run's reference-scan-first pass (v9.2
 * amendment 9): the banked HUMANITIES_TOC_SURVEY.md book records
 * (Strayer & Nelson, Arjun Dev, Norman Lowe, AP World), the NCERT
 * open-canon registers (class 6/8/12 history chapters), and the live web
 * ground (Herodotus, Sima Qian, Ibn Khaldun, James Mill, Ashoka's
 * edicts, the Rosetta Stone, radiocarbon, the Gregorian reform) — every
 * URL and page in docs/project/SOURCE_LOG.md under the HSS RUN 1 block.
 * Every ARITHMETIC fact is brute-force pinned in
 * docs/research/wh-ch01-wip/pin_check_wh101.py (69/69 ALL GREEN) and
 * re-pinned by scripts/verify-wh-ch01.ts against THIS file.
 * STUDY-NEVER-REPRODUCE absolute: every roster, figure, Illustration,
 * quiz item and exercise below is OUR OWN.
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

/* ================================================================== */
/* lesson 1.2 — from docs/research/wh-ch01-wip/part-wh102.ts            */
/* ================================================================== */
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

/* ================================================================== */
/* lesson 1.3 — from docs/research/wh-ch01-wip/part-wh103.ts            */
/* ================================================================== */
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

export const chapter1: Chapter = {
  number: 1,
  slug: 'the-historian-s-craft',
  title: 'The Historian\u2019s Craft',
  summary:
    'How history is actually written: primary against secondary sources, the literary against the archaeological register, external and internal criticism of a document, the archaeologist\u2019s sherd against the court chronicle; periodisation as a CONVENTION (the ancient/medieval/modern triad interrogated, not assumed) and the BC/BCE-CE dating census; and the map of this book\u2019s arc stated honestly \u2014 why world history is taught as one story and what that choice costs.',
  status: 'complete',
  lessons: [lessonWh101, lessonWh102, lessonWh103],
  plannedLessons: [],
}
