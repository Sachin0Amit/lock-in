import { chapter02 } from '../src/data/library/books/computer-science/computer-fundamentals/ch-02'
import { chapter01 } from '../src/data/library/books/computer-science/computer-fundamentals/ch-01'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import * as fs from 'fs'
import * as path from 'path'

export {}

/**
 * verify-cs-book2-ch02.ts — the chapter verifier for Computer
 * Fundamentals (the CS shelf's book #1), chapter 2 "Interacting with
 * Your Computer" (CS RUN 3, the cs job's third honored fire, 2026-11-23).
 * VERIFY-FIRST per the standing protocol: each lesson's ENGINE section
 * (A/C) was grown and run green BEFORE that lesson's prose was declared
 * done — by the authoring agent itself (v-cf21.ts 52/52 + v-cf22.ts
 * 58/58 + v-cf23.ts 70/70 + v-cf2R.ts 75/75, the part verifiers in
 * temporary-references/), then re-run here against the assembled
 * chapter; the PIN sections (B/D/F/H) re-read the shipped chapter file
 * and assert the prose carries exactly the engine-pinned numbers.
 * Section Z is the CLOSED-chapter census (CS RUN 4, 2026-11-24, closed
 * the chapter whole: 2.1 + 2.2 + 2.3 + the 2.R review shipped;
 * plannedLessons []) AND carries the ch-01 summary repair pin (the
 * copy-paste defect CS RUN 3 found and fixed in the shipped chapter 1:
 * its summary had carried chapter 2's text since CS RUN 1).
 *
 *   (A) 2.1 engines — 'Input Devices: the Human Handshake' (the cf21 agent)
 *   (B) 2.1 pins
 *   (C) 2.2 engines — 'Output Devices: Screens, Printers and Sound' (the cf22 agent)
 *   (D) 2.2 pins
 *   (E) 2.3 engines — 'Interacting Well: the First Usability Instincts' (the cf23 agent, CS RUN 4)
 *   (F) 2.3 pins (the orchestrator)
 *   (G) 2.R engines — 'Unit 2 Completion Review' (the cf2R agent, CS RUN 4)
 *   (H) 2.R pins (the orchestrator)
 *   (Z) the closed-chapter census + the ch-01 summary-repair pin
 *
 * Study-never-reproduce honored: the web-checked canonical arcs informed
 * METHOD SHAPES only; every family, witness, figure and exercise below
 * is OUR OWN, recomputed here by brute force.
 */

// ------------------------------------------------------------------
// the shared harness (the ch-01 verifier's)
// ------------------------------------------------------------------

interface SectionCheck {
  name: string
  ok: boolean
  detail?: string
}

function check(name: string, ok: boolean, detail?: string): SectionCheck {
  return ok ? { name, ok: true } : { name, ok: false, detail }
}

function tally(section: string, checks: SectionCheck[]) {
  const fail = checks.filter((c) => !c.ok).map((c) => `${c.name}${c.detail ? ' — ' + c.detail : ''}`)
  return { section, ok: checks.length - fail.length, total: checks.length, fail }
}

function collectStrings(L: Lesson): { raw: string; full: string } {
  const rawParts: string[] = []
  const walk = (v: unknown) => {
    if (typeof v === 'string') rawParts.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v).forEach(walk)
  }
  L.blocks.forEach((b) => walk(b))
  return { raw: rawParts.join('\n'), full: JSON.stringify(L) }
}

// ---- A (2.1 engines) — from v-cf21.ts, the cf21 agent's, verbatim ----

function sectionA(): SectionCheck[] {
  const c: SectionCheck[] = []

  // powers of two, built by a loop — never a hardcoded table
  const pow2: number[] = [1]
  for (let k = 1; k <= 24; k++) pow2[k] = pow2[k - 1] * 2

  // A1 — the QWERTY letter census (rows 10 / 9 / 7, sum 26)
  const qwertyRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']
  const rowCount = qwertyRows.map((r) => r.length)
  const rowSum = rowCount.reduce((a, b) => a + b, 0)
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const rowsAsAlphabet = qwertyRows.join('').split('').sort().join('')
  c.push(check('A1 top row QWERTYUIOP carries 10 letters', rowCount[0] === 10, `got ${rowCount[0]}`))
  c.push(check('A1 middle row ASDFGHJKL carries 9 letters', rowCount[1] === 9, `got ${rowCount[1]}`))
  c.push(check('A1 bottom row ZXCVBNM carries 7 letters', rowCount[2] === 7, `got ${rowCount[2]}`))
  c.push(check('A1 the three rows sum to 26 letters', rowSum === 26, `got ${rowSum}`))
  c.push(check('A1 the three rows are the alphabet exactly once', rowsAsAlphabet === alphabet))

  // A2 — home keys A S D F + J K L ; = 8
  const homeLeft = 'ASDF'
  const homeRight = 'JKL;'
  const homeTotal = homeLeft.length + homeRight.length
  c.push(check('A2 home keys A S D F + J K L ; total 8', homeTotal === 8, `got ${homeTotal}`))
  c.push(check('A2 the home row splits 4 + 4 between the hands', homeLeft.length === 4 && homeRight.length === 4))

  // A3 — typing rate: 60 WPM x 5 = 300 chars/min = 5 chars/s
  const wpm = 60
  const charsPerWord = 5
  const charsPerMin = wpm * charsPerWord
  const charsPerSec = charsPerMin / 60
  c.push(check('A3 60 WPM x 5 characters per word = 300 characters per minute', charsPerMin === 300, `got ${charsPerMin}`))
  c.push(check('A3 300 characters per minute = 5 characters per second', charsPerSec === 5, `got ${charsPerSec}`))
  c.push(check('A3 round trip: 5 per second x 60 = 300 per minute', charsPerSec * 60 === charsPerMin))

  // A4 — mouse 800 CPI x 2 inches = 1600 counts
  const cpi = 800
  const mouseInches = 2
  const mouseCounts = cpi * mouseInches
  c.push(check('A4 800 CPI x 2 inches = 1600 counts', mouseCounts === 1600, `got ${mouseCounts}`))
  c.push(check('A4 1600 counts at 800 CPI implies 2 inches of travel', mouseCounts / cpi === mouseInches))

  // A5 / A6 — the scanner DPI census of a US Letter page
  const letterW = 8.5
  const letterH = 11
  const dpi300 = 300
  const dpi600 = 600
  const w300 = letterW * dpi300
  const h300 = letterH * dpi300
  const px300 = w300 * h300
  const w600 = letterW * dpi600
  const h600 = letterH * dpi600
  const px600 = w600 * h600
  c.push(check('A5 8.5 x 300 = 2550 pixels wide', w300 === 2550, `got ${w300}`))
  c.push(check('A5 11 x 300 = 3300 pixels tall', h300 === 3300, `got ${h300}`))
  c.push(check('A5 2550 x 3300 = 8,415,000 pixels', px300 === 8415000, `got ${px300}`))
  c.push(check('A6 8.5 x 600 = 5100 pixels wide', w600 === 5100, `got ${w600}`))
  c.push(check('A6 11 x 600 = 6600 pixels tall', h600 === 6600, `got ${h600}`))
  c.push(check('A6 5100 x 6600 = 33,660,000 pixels', px600 === 33660000, `got ${px600}`))
  c.push(check('A6 the 600-DPI census is exactly 4 x the 300-DPI census', px600 / px300 === 4, `got ${px600 / px300}`))
  c.push(check('A6 cross-check: 8,415,000 x 4 = 33,660,000', px300 * 4 === px600))

  // A7 — 2^8 = 256 per channel; 2^24 = 16,777,216 colours
  c.push(check('A7 2^8 = 256 levels per colour channel', pow2[8] === 256, `got ${pow2[8]}`))
  c.push(check('A7 2^24 = 16,777,216 distinguishable colours', pow2[24] === 16777216, `got ${pow2[24]}`))
  c.push(check('A7 three channels: 256 x 256 x 256 = 16,777,216', pow2[8] * pow2[8] * pow2[8] === pow2[24]))

  // A8 / A9 — the camera resolution census (720p and 1080p)
  const hdFrames = [
    { name: '720p', w: 1280, h: 720, px: 921600 },
    { name: '1080p', w: 1920, h: 1080, px: 2073600 },
  ]
  for (const f of hdFrames) {
    c.push(check(`A8/A9 ${f.name}: ${f.w} x ${f.h} = ${f.px} pixels`, f.w * f.h === f.px, `got ${f.w * f.h}`))
    c.push(check(`A8/A9 ${f.name}: the frame grid is exactly 16:9`, f.w * 9 === f.h * 16))
  }

  // A10 — stereo CD quality: 44,100 x 2 = 88,200 samples per second
  const sampleRate = 44100
  const channels = 2
  const stereoSamples = sampleRate * channels
  c.push(check('A10 44,100 samples/s per channel x 2 channels = 88,200 samples/s', stereoSamples === 88200, `got ${stereoSamples}`))
  c.push(check('A10 88,200 total means 44,100 per channel', stereoSamples / channels === sampleRate))

  // A11 — the DPI doubling ladder 150 -> 300 -> 600
  const dpiLadder = [150, 300, 600]
  const ladderW = dpiLadder.map((d) => letterW * d)
  const ladderPx = dpiLadder.map((d) => (letterW * d) * (letterH * d))
  let ladderLinearOk = true
  let ladderAreaOk = true
  for (let k = 1; k < dpiLadder.length; k++) {
    if (ladderW[k] / ladderW[k - 1] !== 2) ladderLinearOk = false
    if (ladderPx[k] / ladderPx[k - 1] !== 4) ladderAreaOk = false
  }
  c.push(check('A11 150 to 300 to 600 DPI: each step doubles the linear pixel count', ladderLinearOk))
  c.push(check('A11 150 to 300 to 600 DPI: each step quadruples the area pixel count', ladderAreaOk))
  c.push(check('A11 the ladder lands on the pinned 300-DPI census', ladderPx[1] === px300 && ladderW[1] === w300))
  c.push(check('A11 the ladder lands on the pinned 600-DPI census', ladderPx[2] === px600 && ladderW[2] === w600))
  c.push(check('A11 the 150-DPI rung is a quarter of the 300-DPI census', ladderPx[1] / ladderPx[0] === 4))

  // A12 — a 1-inch square: 90,000 px at 300 DPI, 360,000 at 600 DPI
  const sq300 = dpi300 * dpi300
  const sq600 = dpi600 * dpi600
  c.push(check('A12 a 1-inch square at 300 DPI = 90,000 pixels', sq300 === 90000, `got ${sq300}`))
  c.push(check('A12 a 1-inch square at 600 DPI = 360,000 pixels', sq600 === 360000, `got ${sq600}`))
  c.push(check('A12 the square census also quadruples: 360,000 / 90,000 = 4', sq600 / sq300 === 4))

  // A13 — webcam VGA 640 x 480 = 307,200 px
  const vgaW = 640
  const vgaH = 480
  const vgaPx = vgaW * vgaH
  c.push(check('A13 640 x 480 (VGA) = 307,200 pixels', vgaPx === 307200, `got ${vgaPx}`))
  c.push(check('A13 720p holds exactly 3 VGA censuses: 921,600 / 307,200 = 3', hdFrames[0].px / vgaPx === 3))

  // A14 — the dated witnesses (facts, pinned as literal strings)
  const witnesses = [
    'October 1867', '1878', '9 December 1968', '1967', '1970',
    '1969', '2009', '1991', '22 August 2001', 'August 16, 1994',
  ]
  const witnessChecks: [string, string][] = [
    ['QWERTY patent application filed', 'October 1867'],
    ['Remington No. 2, the first Shift-key typewriter', '1878'],
    ['first public demonstration of the mouse', '9 December 1968'],
    ['mouse patent applied for', '1967'],
    ['mouse patent received', '1970'],
    ['CCD invented at Bell Labs', '1969'],
    ['Nobel Prize in Physics shared for the CCD', '2009'],
    ['Trojan Room coffee pot webcam online', '1991'],
    ['Trojan Room coffee pot webcam switched off', '22 August 2001'],
    ['IBM Simon released', 'August 16, 1994'],
  ]
  for (const [label, date] of witnessChecks) {
    c.push(check(`A14 witness pinned: ${label} — ${date}`, witnesses.includes(date)))
  }

  // A15 — 16-bit audio depth: 2^16 = 65,536 = 256 x the 8-bit 256
  const depth16 = pow2[16]
  const depth8 = pow2[8]
  c.push(check('A15 2^16 = 65,536 levels in a 16-bit sample', depth16 === 65536, `got ${depth16}`))
  c.push(check('A15 2^8 = 256 levels in an 8-bit sample', depth8 === 256, `got ${depth8}`))
  c.push(check('A15 65,536 / 256 = 256: 16-bit depth is 256 x the 8-bit census', depth16 / depth8 === 256))

  return c
}

// ---- B (2.1 pins) — the orchestrator's, against the shipped lesson ----

function sectionB(L: Lesson | undefined): SectionCheck[] {
  const c: SectionCheck[] = []
  if (!L) { c.push(check('B0 lesson 2.1 present', false, 'lesson missing')); return c }
  const { raw, full } = collectStrings(L)
  const either = (s: string) => raw.includes(s) || full.includes(JSON.stringify(s).slice(1, -1))
  const has = (s: string) => raw.includes(s) || full.includes(s)

  // identity
  c.push(check('B1 id pinned', L.id === 'cf-input-devices-the-human-handshake', L.id))
  c.push(check('B2 number 2.1', L.number === '2.1'))
  c.push(check('B3 title pinned', L.title === 'Input Devices: the Human Handshake'))
  c.push(check('B4 sources carry cs-cf-web-ground', (L.sources ?? []).includes('cs-cf-web-ground')))
  c.push(check('B5 prerequisites exact (1.1 + 1.2)', JSON.stringify(L.prerequisites) === JSON.stringify(['cf-the-basic-structure-and-operation-of-the-computer', 'cf-a-census-of-hardware-desktops-to-embedded-chips']), JSON.stringify(L.prerequisites)))

  // the engine-pinned numbers in prose (KaTeX {,} or plain forms both honoured)
  c.push(check('B6 the 300-DPI census: 8,415,000 present', either('8,415,000') || either('8{,}415{,}000')))
  c.push(check('B7 the 600-DPI census: 33,660,000 present', either('33,660,000') || either('33{,}660{,}000')))
  c.push(check('B8 the 1080p census: 2,073,600 present', either('2,073,600') || either('2{,}073{,}600')))
  c.push(check('B9 the 720p census: 921,600 present', either('921,600') || either('921{,}600')))
  c.push(check('B10 stereo samples: 88,200 present', either('88,200') || either('88{,}200')))
  c.push(check('B11 mouse counts: 1600 present', either('1600') || either('1,600')))
  c.push(check('B12 65,536 (16-bit levels) present', either('65,536') || either('65{,}536')))
  c.push(check('B13 16,777,216 (2^24 colours) present', either('16,777,216') || either('16{,}777{,}216')))
  c.push(check('B14 the typing rate: 300 characters per minute present', has('300 characters')))
  c.push(check('B15 the QWERTY census 10/9/7 = 26 present', has('26') && (has('10') && has('9') && has('7'))))

  // the dated witnesses in prose
  for (const [label, date] of [
    ['Sholes patent application', 'October 1867'],
    ['Remington No. 2', '1878'],
    ['the Mother of All Demos', '9 December 1968'],
    ['mouse patent', '3,541,541'],
    ['IBM Simon', 'August 16, 1994'],
    ['the coffee pot switched off', '22 August 2001'],
  ] as [string, string][]) {
    c.push(check(`B16-21 witness in prose: ${label} (${date})`, has(date), `missing ${date}`))
  }
  c.push(check('B22 the demo named (Mother of All Demos)', has('Mother of All Demos')))
  c.push(check('B23 the protagonists named: Engelbart + Sholes + Boyle + Simon', has('Engelbart') && has('Sholes') && has('Boyle') && has('Simon')))

  // structure
  const kinds = L.blocks.map((b) => b.kind)
  c.push(check('B24 >= 10 headings', kinds.filter((k) => k === 'heading').length >= 10, `got ${kinds.filter((k) => k === 'heading').length}`))
  c.push(check('B25 >= 25 paras', kinds.filter((k) => k === 'para').length >= 25, `got ${kinds.filter((k) => k === 'para').length}`))
  c.push(check('B26 >= 8 Illustrations (example blocks)', kinds.filter((k) => k === 'example').length >= 8, `got ${kinds.filter((k) => k === 'example').length}`))
  c.push(check('B27 >= 6 definition callouts', L.blocks.filter((b) => b.kind === 'callout' && (b as { tone?: string }).tone === 'definition').length >= 6))
  c.push(check('B28 >= 4 terms blocks', kinds.filter((k) => k === 'terms').length >= 4, `got ${kinds.filter((k) => k === 'terms').length}`))
  c.push(check('B29 >= 2 tables', kinds.filter((k) => k === 'table').length >= 2, `got ${kinds.filter((k) => k === 'table').length}`))
  c.push(check('B30 the DPI x4 derivation present', kinds.includes('derivation')))
  c.push(check('B31 the keypress algorithm present', kinds.includes('algorithm')))
  c.push(check('B32 >= 4 formula cards', kinds.filter((k) => k === 'formula').length >= 4, `got ${kinds.filter((k) => k === 'formula').length}`))
  c.push(check('B33 the exam corner present', L.blocks.some((b) => b.kind === 'callout' && (b as { tone?: string }).tone === 'exam')))
  c.push(check('B34 the Cengage summary line present', /From the above discussion/.test(raw)))
  const romanLists = L.blocks.filter((b) => b.kind === 'list' && (b as { marker?: string }).marker === 'roman') as { items: string[] }[]
  c.push(check('B35 >= 1 roman take-aways run with >= 6 items', romanLists.length >= 1 && romanLists.some((l) => l.items.length >= 6)))

  // quiz
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] } | undefined
  c.push(check('B36 quiz present with exactly 5 items', !!quiz && quiz.items.length === 5, `got ${quiz?.items.length}`))
  if (quiz) {
    c.push(check('B37 quiz key pinned [2,0,1,1,3]', JSON.stringify(quiz.items.map((i) => i.answer)) === '[2,0,1,1,3]', JSON.stringify(quiz.items.map((i) => i.answer))))
    c.push(check('B38 every quiz item has 4 options + an explanation', quiz.items.every((i) => i.options.length === 4 && i.explain.length > 40)))
  }

  // exercises
  const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: { level: string; questions: { solution?: string | string[]; figures?: unknown[] }[] }[] } | undefined
  c.push(check('B39 exercises block present', !!ex))
  if (ex) {
    const counts = ex.sets.map((s) => s.questions.length)
    c.push(check('B40 exercise counts 2/2/3/3/3/2 (15 total)', JSON.stringify(counts) === '[2,2,3,3,3,2]' && counts.reduce((a, b) => a + b, 0) === 15, JSON.stringify(counts)))
    const allQ = ex.sets.flatMap((s) => s.questions)
    c.push(check('B41 every solution is a steps array (the Cengage chain)', allQ.every((q) => Array.isArray(q.solution))))
    c.push(check('B42 >= 4 solution figures inside exercises (v9.0)', allQ.filter((q) => (q.figures ?? []).length > 0).length >= 4, `got ${allQ.filter((q) => (q.figures ?? []).length > 0).length}`))
    c.push(check('B43 exam-style labelling present', /exam-style/.test(raw)))
  }

  // figures + SVG hygiene
  const figBlocks = L.blocks.filter((b) => b.kind === 'figure') as { svg: string }[]
  c.push(check('B44 >= 3 body figures', figBlocks.length >= 3, `got ${figBlocks.length}`))
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const everySvg = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions).flatMap((q) => (q.figures ?? []).map((f) => (f as { svg: string }).svg)) : [])]
  c.push(check('B45 no retired muted hexes in any SVG (16 banned)', everySvg.length >= 7 && everySvg.every((s) => !retired.some((hex) => s.includes(hex))), `${everySvg.length} svgs checked`))
  c.push(check('B46 every SVG has aria-label + viewBox, no raw $ in SVG text', everySvg.every((s) => s.includes('aria-label') && s.includes('viewBox') && !s.includes('$')), 'house SVG law'))
  c.push(check('B47 the palette stays vivid: no blue/indigo hexes in any SVG', everySvg.every((s) => !/#2563eb|#3b82f6|#1d4ed8|#4f46e5|#6366f1/i.test(s)), 'no blue'))
  c.push(check('B48 text sizes stay legible: no font-size below 9px', everySvg.every((s) => !/font-size="[0-8](\.\d+)?"/.test(s)), 'the 9px floor'))
  c.push(check('B49 strokes stay visible: no stroke-width below 1.2px', everySvg.every((s) => !/stroke-width="(0|1|1\.[0-1][0-9]*)"/.test(s)), 'the 1.2px floor'))

  // cross-references + honesty
  c.push(check('B50 forward references: 2.2 by title + 2.3 by title + Human-Computer Interaction', has('Output Devices: Screens, Printers and Sound') && has('Interacting Well: the First Usability Instincts') && has('Human-Computer Interaction')))
  c.push(check('B51 honesty language present (typically/ballpark/honest)', /typically|ballpark|honest/i.test(raw)))
  const words = countLessonWords(L)
  c.push(check('B52 honest depth >= 6,000 words', words >= 6000, `got ${words}`))
  return c
}

// ---- C (2.2 engines) — from v-cf22.ts, the cf22 agent's, verbatim ----

function sectionC(): SectionCheck[] {
  const c: SectionCheck[] = []

  function powByLoop(base: number, exp: number): number {
    let r = 1
    for (let i = 0; i < exp; i++) r *= base
    return r
  }

  const W = 1920              // 1080p width in pixels
  const H = 1080              // 1080p height in pixels
  const CW = 1366             // the honest cousin's width
  const CHH = 768             // the honest cousin's height
  const DIAG = Math.sqrt(W ** 2 + H ** 2)   // diagonal pixel count (Pythagoras)
  const SAMPLES = 44100       // CD samples per second
  const BITS = 16             // bits per CD sample
  const CHAN = 2              // stereo channels
  const BR = SAMPLES * BITS * CHAN          // the CD bitrate in bits/s

  // C1 — the 1080p pixel census
  c.push(check('C1 1080p census 1920x1080 = 2,073,600 px', W * H === 2073600, `got ${W * H}`))
  c.push(check('C1 census formatted 2,073,600', (W * H).toLocaleString('en-US') === '2,073,600'))
  c.push(check('C1 census sits just above two million', W * H > 2000000 && W * H < 2100000))

  // C2 — 16:9 is EXACT for 1080p
  c.push(check('C2 1920x9 = 17,280', W * 9 === 17280, `got ${W * 9}`))
  c.push(check('C2 1080x16 = 17,280', H * 16 === 17280, `got ${H * 16}`))
  c.push(check('C2 16:9 exact for 1080p (both sides agree)', W * 9 === H * 16))

  // C3 — the honest cousin 1366x768
  const IDEAL = (CHH * 16) / 9
  c.push(check('C3 cousin census 1366x768 = 1,049,088 px', CW * CHH === 1049088, `got ${CW * CHH}`))
  c.push(check('C3 cousin census formatted 1,049,088', (CW * CHH).toLocaleString('en-US') === '1,049,088'))
  c.push(check('C3 ideal 16:9 width for height 768 is 1365.33...', Math.abs(IDEAL - 1365.33) < 0.01, `got ${IDEAL.toFixed(2)}`))
  c.push(check('C3 1366 is that ideal rounded UP', Math.ceil(IDEAL) === CW))

  // C4 — frame budgets at 30 / 60 / 144 Hz
  c.push(check('C4 60 Hz frame budget 16.67 ms', (1000 / 60).toFixed(2) === '16.67'))
  c.push(check('C4 144 Hz frame budget 6.94 ms', (1000 / 144).toFixed(2) === '6.94'))
  c.push(check('C4 30 Hz frame budget 33.3 ms', (1000 / 30).toFixed(1) === '33.3'))
  c.push(check('C4 budgets tighten as the refresh rate rises', 1000 / 144 < 1000 / 60 && 1000 / 60 < 1000 / 30))

  // C5 — the 24-inch 1080p monitor's PPI
  c.push(check('C5 diagonal pixel count ~= 2202.9', Math.abs(DIAG - 2202.9) < 0.05, `got ${DIAG.toFixed(1)}`))
  c.push(check('C5 diagonal printed as 2202.9', DIAG.toFixed(1) === '2202.9'))
  c.push(check('C5 24-inch PPI ~= 91.79', Math.abs(DIAG / 24 - 91.79) < 0.01, `got ${(DIAG / 24).toFixed(2)}`))
  c.push(check('C5 "about 92 PPI" (honest rounding)', Math.round(DIAG / 24) === 92))

  // C6 — the 5.5-inch phone's PPI (same census, smaller cabinet)
  c.push(check('C6 5.5-inch PPI ~= 400.5', Math.abs(DIAG / 5.5 - 400.5) < 0.05, `got ${(DIAG / 5.5).toFixed(1)}`))
  c.push(check('C6 "about 400 PPI" (honest flooring)', Math.floor(DIAG / 5.5) === 400))

  // C7 — the dots-per-square-inch law
  c.push(check('C7 300 dpi = 90,000 dots per square inch', 300 * 300 === 90000))
  c.push(check('C7 600 dpi = 360,000 dots per square inch', 600 * 600 === 360000))
  c.push(check('C7 the ratio is exactly 4', (600 * 600) / (300 * 300) === 4))
  c.push(check('C7 600 dpi is the doubled 300 dpi', 600 === 2 * 300))

  // C8 — the 4x6-inch photo at 300 dpi
  c.push(check('C8 photo short side 4x300 = 1200 dots', 4 * 300 === 1200))
  c.push(check('C8 photo long side 6x300 = 1800 dots', 6 * 300 === 1800))
  c.push(check('C8 photo area 4x6 = 24 square inches', 4 * 6 === 24))
  c.push(check('C8 photo census 1200x1800 = 2,160,000 dots', 1200 * 1800 === 2160000))
  c.push(check('C8 two routes agree (24 sq in x 90,000)', 4 * 6 * 300 * 300 === 1200 * 1800))

  // C9 — US Letter 8.5x11 at 300 dpi (printer twin of 2.1's scanner)
  c.push(check('C9 letter width 8.5x300 = 2550 dots', 8.5 * 300 === 2550))
  c.push(check('C9 letter height 11x300 = 3300 dots', 11 * 300 === 3300))
  c.push(check('C9 letter census 2550x3300 = 8,415,000 dots per colour layer', 2550 * 3300 === 8415000))

  // C10 — print speed in pages per minute
  c.push(check('C10 20 ppm = 3 s per page', 60 / 20 === 3))
  c.push(check('C10 30 ppm = 2 s per page', 60 / 30 === 2))
  c.push(check('C10 faster ppm means a shorter page budget', 60 / 30 < 60 / 20))

  // C11 — the CD bitrate
  c.push(check('C11 CD bitrate 44,100x16x2 = 1,411,200 bits/s', BR === 1411200, `got ${BR}`))
  c.push(check('C11 in kbps = 1411.2', Math.abs(BR / 1000 - 1411.2) < 1e-9, `got ${BR / 1000}`))
  c.push(check('C11 kbps printed as 1411.2', (BR / 1000).toFixed(1) === '1411.2'))
  c.push(check('C11 above one million bits per second', BR > 1000000 && BR < 2000000))

  // C12 — the Nyquist ceiling
  c.push(check('C12 Nyquist ceiling 44,100/2 = 22,050 Hz', SAMPLES / 2 === 22050))
  c.push(check('C12 the ceiling sits above ~20,000 Hz of human hearing', SAMPLES / 2 > 20000))

  // C13 — bit depth levels
  c.push(check('C13 16-bit depth = 65,536 levels', powByLoop(2, 16) === 65536))
  c.push(check('C13 8-bit depth = 256 levels', powByLoop(2, 8) === 256))
  c.push(check('C13 the ratio is exactly 256', powByLoop(2, 16) / powByLoop(2, 8) === 256))

  // C14 — the 74-minute CD stereo payload
  const SECONDS = 74 * 60
  const PAYLOAD = (SAMPLES * BITS * CHAN * 74 * 60) / 8
  c.push(check('C14 74 minutes = 4440 seconds', SECONDS === 4440))
  c.push(check('C14 payload = 783,216,000 bytes', PAYLOAD === 783216000, `got ${PAYLOAD}`))
  c.push(check('C14 payload ~= 747 MiB', Math.round(PAYLOAD / powByLoop(2, 20)) === 747, `got ${Math.round(PAYLOAD / powByLoop(2, 20))}`))
  c.push(check('C14 roughly three-quarters of a billion bytes', PAYLOAD > 750000000 && PAYLOAD < 800000000))

  // C15 — the 24-bit colour census (the pixel's own arithmetic)
  c.push(check('C15 2^24 = 16,777,216 colours', powByLoop(2, 24) === 16777216))
  c.push(check('C15 census formatted 16,777,216', powByLoop(2, 24).toLocaleString('en-US') === '16,777,216'))

  // C16 — the dated witnesses (facts, pinned as literal strings)
  const CHAIN = ['1969', '1972', '1976', '1977', '1984', '1985']  // the laser-printer chain, in order
  const REDBOOK = '1980'
  const TOUCH = '2007'
  c.push(check('C16 laser idea at Xerox 1969 (Starkweather)', CHAIN[0] === '1969'))
  c.push(check('C16 EARS at Xerox PARC 1972', CHAIN[1] === '1972'))
  c.push(check('C16 IBM 3800 first commercial implementation 1976', CHAIN[2] === '1976'))
  c.push(check('C16 Xerox 9700 brought to market 1977', CHAIN[3] === '1977'))
  c.push(check('C16 HP LaserJet 1984 — first for the mass market', CHAIN[4] === '1984'))
  c.push(check('C16 Apple LaserWriter 1985 — carrying PostScript', CHAIN[5] === '1985'))
  c.push(check('C16 the chain is chronological (computed)', CHAIN.every((y, i) => i === 0 || parseInt(CHAIN[i - 1], 10) < parseInt(y, 10))))
  c.push(check('C16 Red Book 1980 + capacitive multi-touch era 2007 pinned', [REDBOOK, TOUCH].join(',') === '1980,2007'))

  return c
}

// ---- D (2.2 pins) — the orchestrator's, against the shipped lesson ----

function sectionD(L: Lesson | undefined): SectionCheck[] {
  const c: SectionCheck[] = []
  if (!L) { c.push(check('D0 lesson 2.2 present', false, 'lesson missing')); return c }
  const { raw, full } = collectStrings(L)
  const either = (s: string) => raw.includes(s) || full.includes(JSON.stringify(s).slice(1, -1))
  const has = (s: string) => raw.includes(s) || full.includes(s)

  // identity
  c.push(check('D1 id pinned', L.id === 'cf-output-devices-screens-printers-and-sound', L.id))
  c.push(check('D2 number 2.2', L.number === '2.2'))
  c.push(check('D3 title pinned', L.title === 'Output Devices: Screens, Printers and Sound'))
  c.push(check('D4 sources carry cs-cf-web-ground', (L.sources ?? []).includes('cs-cf-web-ground')))
  c.push(check('D5 prerequisites exact (1.1 + 2.1)', JSON.stringify(L.prerequisites) === JSON.stringify(['cf-the-basic-structure-and-operation-of-the-computer', 'cf-input-devices-the-human-handshake']), JSON.stringify(L.prerequisites)))

  // the engine-pinned numbers in prose
  c.push(check('D6 the 1080p census: 2,073,600 present', either('2,073,600') || either('2{,}073{,}600')))
  c.push(check('D7 the 16:9 check: 17,280 present', either('17,280') || either('17{,}280')))
  c.push(check('D8 the honest cousin: 1,049,088 + 1365.33 present', (either('1,049,088') || either('1{,}049{,}088')) && (has('1365.33') || has('1365⅓') || has('1365.3'))))
  c.push(check('D9 the diagonal census: 2202.9 present', has('2202.9')))
  c.push(check('D10 the 24-inch PPI: 91.79 or about 92 PPI present', has('91.79') || has('92 PPI') || has('about 92')))
  c.push(check('D11 the 5.5-inch PPI: 400.5 or about 400 PPI present', has('400.5') || has('400 PPI') || has('about 400')))
  c.push(check('D12 dots per square inch: 90,000 + 360,000 present', either('90,000') && either('360,000')))
  c.push(check('D13 the 4x6 photo census: 2,160,000 present', either('2,160,000') || either('2{,}160{,}000')))
  c.push(check('D14 the letter census: 8,415,000 present', either('8,415,000') || either('8{,}415{,}000')))
  c.push(check('D15 the CD bitrate: 1,411,200 + 1411.2 present', (either('1,411,200') || either('1{,}411{,}200')) && has('1411.2')))
  c.push(check('D16 the Nyquist ceiling: 22,050 present', either('22,050') || either('22{,}050')))
  c.push(check('D17 the 74-minute payload: 783,216,000 + 747 present', (either('783,216,000') || either('783{,}216{,}000')) && has('747')))
  c.push(check('D18 the depth census: 65,536 + 16,777,216 present', (either('65,536') || either('65{,}536')) && (either('16,777,216') || either('16{,}777{,}216'))))
  c.push(check('D19 the frame budgets: 16.7 + 6.9 ms present', has('16.7') && has('6.9')))

  // the dated witnesses in prose
  for (const [label, date] of [
    ['the laser idea at Xerox', '1969'],
    ['EARS at PARC', '1972'],
    ['the IBM 3800', '1976'],
    ['the Xerox 9700', '1977'],
    ['the HP LaserJet', '1984'],
    ['the Apple LaserWriter', '1985'],
    ['the Red Book', '1980'],
  ] as [string, string][]) {
    c.push(check(`D20-26 witness in prose: ${label} (${date})`, has(date), `missing ${date}`))
  }
  c.push(check('D27 the protagonists named: Starkweather + PostScript', has('Starkweather') && has('PostScript')))
  c.push(check('D28 the laser six-beat chain present (charge/write/develop/transfer/fuse/clean)', has('charge') && has('develop') && has('transfer') && has('fuse') && has('clean')))

  // structure
  const kinds = L.blocks.map((b) => b.kind)
  c.push(check('D29 >= 10 headings', kinds.filter((k) => k === 'heading').length >= 10, `got ${kinds.filter((k) => k === 'heading').length}`))
  c.push(check('D30 >= 25 paras', kinds.filter((k) => k === 'para').length >= 25, `got ${kinds.filter((k) => k === 'para').length}`))
  c.push(check('D31 >= 8 Illustrations (example blocks)', kinds.filter((k) => k === 'example').length >= 8, `got ${kinds.filter((k) => k === 'example').length}`))
  c.push(check('D32 >= 6 definition callouts', L.blocks.filter((b) => b.kind === 'callout' && (b as { tone?: string }).tone === 'definition').length >= 6))
  c.push(check('D33 >= 4 terms blocks', kinds.filter((k) => k === 'terms').length >= 4, `got ${kinds.filter((k) => k === 'terms').length}`))
  c.push(check('D34 >= 2 tables', kinds.filter((k) => k === 'table').length >= 2, `got ${kinds.filter((k) => k === 'table').length}`))
  c.push(check('D35 the PPI derivation present', kinds.includes('derivation')))
  c.push(check('D36 the laser six-beat algorithm present', kinds.includes('algorithm')))
  c.push(check('D37 >= 4 formula cards', kinds.filter((k) => k === 'formula').length >= 4, `got ${kinds.filter((k) => k === 'formula').length}`))
  c.push(check('D38 the exam corner present', L.blocks.some((b) => b.kind === 'callout' && (b as { tone?: string }).tone === 'exam')))
  c.push(check('D39 the Cengage summary line present', /From the above discussion/.test(raw)))
  const romanLists = L.blocks.filter((b) => b.kind === 'list' && (b as { marker?: string }).marker === 'roman') as { items: string[] }[]
  c.push(check('D40 >= 1 roman take-aways run with >= 6 items', romanLists.length >= 1 && romanLists.some((l) => l.items.length >= 6)))

  // quiz
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] } | undefined
  c.push(check('D41 quiz present with exactly 5 items', !!quiz && quiz.items.length === 5, `got ${quiz?.items.length}`))
  if (quiz) {
    c.push(check('D42 quiz key pinned [1,2,0,1,3]', JSON.stringify(quiz.items.map((i) => i.answer)) === '[1,2,0,1,3]', JSON.stringify(quiz.items.map((i) => i.answer))))
    c.push(check('D43 every quiz item has 4 options + an explanation', quiz.items.every((i) => i.options.length === 4 && i.explain.length > 40)))
  }

  // exercises
  const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: { level: string; questions: { solution?: string | string[]; figures?: unknown[] }[] }[] } | undefined
  c.push(check('D44 exercises block present', !!ex))
  if (ex) {
    const counts = ex.sets.map((s) => s.questions.length)
    c.push(check('D45 exercise counts 2/2/3/3/3/2 (15 total)', JSON.stringify(counts) === '[2,2,3,3,3,2]' && counts.reduce((a, b) => a + b, 0) === 15, JSON.stringify(counts)))
    const allQ = ex.sets.flatMap((s) => s.questions)
    c.push(check('D46 every solution is a steps array (the Cengage chain)', allQ.every((q) => Array.isArray(q.solution))))
    c.push(check('D47 >= 3 solution figures inside exercises (v9.0)', allQ.filter((q) => (q.figures ?? []).length > 0).length >= 3, `got ${allQ.filter((q) => (q.figures ?? []).length > 0).length}`))
    c.push(check('D48 exam-style labelling present', /exam-style/.test(raw)))
  }

  // figures + SVG hygiene
  const figBlocks = L.blocks.filter((b) => b.kind === 'figure') as { svg: string }[]
  c.push(check('D49 >= 3 body figures', figBlocks.length >= 3, `got ${figBlocks.length}`))
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const everySvg = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions).flatMap((q) => (q.figures ?? []).map((f) => (f as { svg: string }).svg)) : [])]
  c.push(check('D50 no retired muted hexes in any SVG (16 banned)', everySvg.length >= 7 && everySvg.every((s) => !retired.some((hex) => s.includes(hex))), `${everySvg.length} svgs checked`))
  c.push(check('D51 every SVG has aria-label + viewBox, no raw $ in SVG text', everySvg.every((s) => s.includes('aria-label') && s.includes('viewBox') && !s.includes('$')), 'house SVG law'))
  c.push(check('D52 the palette stays vivid: no blue/indigo hexes in any SVG', everySvg.every((s) => !/#2563eb|#3b82f6|#1d4ed8|#4f46e5|#6366f1/i.test(s)), 'no blue'))
  c.push(check('D53 text sizes stay legible: no font-size below 9px', everySvg.every((s) => !/font-size="[0-8](\.\d+)?"/.test(s)), 'the 9px floor'))
  c.push(check('D54 strokes stay visible: no stroke-width below 1.2px', everySvg.every((s) => !/stroke-width="(0|1|1\.[0-1][0-9]*)"/.test(s)), 'the 1.2px floor'))

  // cross-references + honesty
  c.push(check('D55 back/forward references: 2.1 by title + 2.3 by title + Human-Computer Interaction + Computer Graphics', has('Input Devices: the Human Handshake') && has('Interacting Well: the First Usability Instincts') && has('Human-Computer Interaction') && has('Computer Graphics')))
  c.push(check('D56 honesty language present (typically/ballpark/honest)', /typically|ballpark|honest/i.test(raw)))
  const words = countLessonWords(L)
  c.push(check('D57 honest depth >= 6,000 words', words >= 6000, `got ${words}`))
  return c
}

// ------------------------------------------------------------------
// (E) 2.3 engines — lifted verbatim from temporary-references/v-cf23.ts
// (the cf23 agent; run green 70/70 BEFORE the prose was declared done)
// ------------------------------------------------------------------
export function sectionE(): SectionCheck[] {
  const c: SectionCheck[] = []
  const l2 = (x: number) => Math.log2(x)
  const near = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) < eps
  const days = (y2: number, m2: number, d2: number, y1: number, m1: number, d1: number) =>
    (Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000

  // ------------------------------------------------------------------
  // Fitts's law — the pinned targets (Fitts 1954 form ID = log2(2D/W);
  // Shannon form log2(D/W + 1))
  // ------------------------------------------------------------------
  c.push(check('E1 Fitts 1954 form W=20 mm D=200 mm: log2(20) = 4.3219281 bits', near(l2(2 * 200 / 20), 4.3219281)))
  c.push(check('E2 Shannon form W=20 mm D=200 mm: log2(11) = 3.4594316 bits', near(l2(200 / 20 + 1), 3.4594316)))
  c.push(check('E3 Fitts 1954 form W=10 mm D=400 mm: log2(80) = 6.3219281 bits', near(l2(2 * 400 / 10), 6.3219281)))
  c.push(check('E4 Shannon form W=10 mm D=400 mm: log2(41) = 5.3575520 bits', near(l2(400 / 10 + 1), 5.3575520)))
  c.push(check('E5 doubled width at D=200: log2(40) = 5.3219281 bits', near(l2(2 * 200 / 10), 5.3219281)))
  c.push(check('E6 halved distance at W=20: log2(10) = 3.3219281 bits', near(l2(2 * 100 / 20), 3.3219281)))
  c.push(check('E7 one-bit law (algebra): log2(40) - log2(20) = 1 exactly', Math.abs(l2(40) - l2(20) - 1) < 1e-9))
  c.push(check('E8 one-bit law (algebra): log2(20) - log2(10) = 1 exactly', Math.abs(l2(20) - l2(10) - 1) < 1e-9))
  c.push(check('E9 one-bit law W 10->20 at D=200: 5.3219281 - 4.3219281 = 1', near(5.3219281 - 4.3219281, 1)))
  c.push(check('E10 one-bit law D 200->100 at W=20: 4.3219281 - 3.3219281 = 1', near(4.3219281 - 3.3219281, 1)))
  c.push(check('E11 phone icon before W=6 mm D=240 mm: log2(80) = 6.3219281 bits', near(l2(2 * 240 / 6), 6.3219281)))
  c.push(check('E12 phone icon after W=12 mm D=120 mm: log2(20) = 4.3219281 bits', near(l2(2 * 120 / 12), 4.3219281)))
  c.push(check('E13 phone icon redesign saves exactly 2 bits: 6.3219281 - 4.3219281 = 2', near(6.3219281 - 4.3219281, 2)))
  c.push(check('E14 redesigned target equals the classic W=20 D=200 target (both log2(20))', near(l2(2 * 120 / 12), l2(2 * 200 / 20), 1e-12)))
  c.push(check('E15 narrow-far minus wide-near: 6.3219281 - 4.3219281 = 2 bits', near(6.3219281 - 4.3219281, 2)))
  c.push(check('E16 ordering: Shannon prices below the 1954 form at both targets', 3.4594316 < 4.3219281 && 5.3575520 < 6.3219281))

  // ------------------------------------------------------------------
  // the price ladder (Star 8010, Lisa, Macintosh 128K)
  // ------------------------------------------------------------------
  const STAR = 16595
  const LISA = 9995
  const MAC = 2495
  c.push(check('E17 the ladder falls strictly: 16,595 > 9,995 > 2,495 dollars', STAR === 16595 && LISA === 9995 && MAC === 2495 && STAR > LISA && LISA > MAC))
  c.push(check('E18 Mac as a fraction of Star: 2495/16595 = 0.1503465', near(MAC / STAR, 0.1503465)))
  c.push(check('E19 Mac as a percentage of Star: 15.03 per cent', near((100 * MAC) / STAR, 15.03, 0.005)))
  c.push(check('E20 Star/Mac ratio: 16595/2495 = 6.6513026 (6.65x)', near(STAR / MAC, 6.6513026)))
  c.push(check('E21 Star/Mac ratio rounds to 6.65x', near(Math.round((STAR / MAC) * 100) / 100, 6.65)))
  c.push(check('E22 Lisa/Mac ratio: 9995/2495 = 4.0060120 (4.01x)', near(LISA / MAC, 4.0060120)))
  c.push(check('E23 Lisa->Mac price drop: 7500/9995 = 0.7503752 (75.04 per cent)', near((LISA - MAC) / LISA, 0.7503752)))
  c.push(check('E24 Star->Lisa price drop: 6600/16595 = 0.3977104 (39.77 per cent)', near((STAR - LISA) / STAR, 0.3977104)))

  // ------------------------------------------------------------------
  // the cascade spans
  // ------------------------------------------------------------------
  c.push(check('E25 Alto (1973) -> Star (1981): 8 years', 1981 - 1973 === 8))
  c.push(check('E26 Bush (1945) -> Macintosh (1984): 39 years', 1984 - 1945 === 39))
  c.push(check('E27 Sketchpad (1963) -> the demo (1968): 5 years', 1968 - 1963 === 5))
  c.push(check('E28 Star (1981) -> Windows 1.0 (1985): 4 years', 1985 - 1981 === 4))
  c.push(check('E29 the demo (1968) -> Alto (1973): 5 years', 1973 - 1968 === 5))
  c.push(check('E30 Lisa (1983-01-19) -> Macintosh (1984-01-24): 370 days', days(1984, 1, 24, 1983, 1, 19) === 370))
  c.push(check('E31 the 1984 commercial (1984-01-22) -> Macintosh intro (1984-01-24): 2 days', days(1984, 1, 24, 1984, 1, 22) === 2))
  c.push(check('E32 Alto bitmap 606 x 808 = 489,648 px', 606 * 808 === 489648))

  // ------------------------------------------------------------------
  // the WCAG chain
  // ------------------------------------------------------------------
  c.push(check('E33 WCAG 1.0 (1999) -> 2.0 (2008): 9 years', 2008 - 1999 === 9))
  c.push(check('E34 WCAG 2.0 (2008) -> 2.1 (2018): 10 years', 2018 - 2008 === 10))
  c.push(check('E35 WCAG 2.1 (2018) -> 2.2 (2023): 5 years', 2023 - 2018 === 5))
  c.push(check('E36 WCAG 1.0 (1999) -> 2.2 (2023): 24 years', 2023 - 1999 === 24))
  c.push(check('E37 the gaps sum to the span: 9 + 10 + 5 = 24', 9 + 10 + 5 === 24))
  c.push(check('E38 the chain ascends: 1.0 < 2.0 < 2.1 < 2.2 by date string', '1999-05-05' < '2008-12-11' && '2008-12-11' < '2018-06-05' && '2018-06-05' < '2023-10-05'))

  // ------------------------------------------------------------------
  // the 20-20-20 rule and the human pace
  // ------------------------------------------------------------------
  c.push(check('E39 an 8-hour day: 480 minutes / 20 = 24 breaks', (8 * 60) / 20 === 24))
  c.push(check('E40 24 breaks x 20 seconds = 480 seconds', 24 * 20 === 480))
  c.push(check('E41 480 seconds / 60 = 8 minutes of far focus', 480 / 60 === 8))
  c.push(check('E42 20 feet is about 6 metres (20 x 0.3048 = 6.096 m)', Math.abs(20 * 0.3048 - 6) < 0.1))
  c.push(check('E43 typing: 40 WPM x 5 characters = 200 characters per minute', 40 * 5 === 200))

  // ------------------------------------------------------------------
  // the pinned dates, held as string constants
  // ------------------------------------------------------------------
  const D_MEMEX = '1945-07' // Bush's Memex, The Atlantic Monthly, July 1945
  const D_SKETCHPAD = '1963' // Sutherland's Sketchpad, the TX-2 light pen
  const D_DEMO = '1968-12-09' // Engelbart's demonstration
  const D_ALTO = '1973-03-01' // first Xerox Alto machines
  const D_STAR = '1981-04-27' // Xerox Star 8010
  const D_LISA = '1983-01-19' // Apple Lisa unveiled
  const D_MAC = '1984-01-24' // Macintosh 128K
  const D_COMMERCIAL = '1984-01-22' // the '1984' commercial, Super Bowl XVIII
  const D_WINDOWS = '1985-11-20' // Windows 1.0
  const D_FITTS = '1954' // Fitts's paper, Journal of Experimental Psychology
  const D_DOET = '1988' // The Design of Everyday Things
  const D_APPLE = '1993' // Don Norman joins Apple
  const D_HEURISTICS = '1994' // Nielsen's ten usability heuristics
  const D_MOLICH = '1990' // the Molich-Nielsen heuristic-evaluation work
  const D_WCAG10 = '1999-05-05'
  const D_WCAG20 = '2008-12-11'
  const D_WCAG21 = '2018-06-05'
  const D_WCAG22 = '2023-10-05'
  c.push(check('E44 Memex pinned: The Atlantic Monthly, July 1945', D_MEMEX === '1945-07'))
  c.push(check('E45 Sketchpad pinned: 1963', D_SKETCHPAD === '1963'))
  c.push(check('E46 the demo pinned: 9 December 1968', D_DEMO === '1968-12-09'))
  c.push(check('E47 the Alto pinned: 1 March 1973', D_ALTO === '1973-03-01'))
  c.push(check('E48 the Star 8010 pinned: 27 April 1981', D_STAR === '1981-04-27'))
  c.push(check('E49 the Lisa pinned: unveiled 19 January 1983', D_LISA === '1983-01-19'))
  c.push(check('E50 the Macintosh 128K pinned: 24 January 1984', D_MAC === '1984-01-24'))
  c.push(check('E51 the 1984 commercial pinned: Super Bowl XVIII, 22 January 1984', D_COMMERCIAL === '1984-01-22'))
  c.push(check('E52 Windows 1.0 pinned: 20 November 1985', D_WINDOWS === '1985-11-20'))
  c.push(check('E53 Fitts 1954 pinned: the Journal of Experimental Psychology paper', D_FITTS === '1954'))
  c.push(check('E54 The Design of Everyday Things pinned: 1988', D_DOET === '1988'))
  c.push(check('E55 Norman joins Apple pinned: 1993, User Experience Architect', D_APPLE === '1993'))
  c.push(check('E56 Nielsen ten heuristics pinned: published 1994', D_HEURISTICS === '1994'))
  c.push(check('E57 Molich-Nielsen pinned: 1990', D_MOLICH === '1990'))
  c.push(check('E58 WCAG 1.0 pinned: 5 May 1999', D_WCAG10 === '1999-05-05'))
  c.push(check('E59 WCAG 2.0 pinned: 11 December 2008', D_WCAG20 === '2008-12-11'))
  c.push(check('E60 WCAG 2.1 pinned: 5 June 2018', D_WCAG21 === '2018-06-05'))
  c.push(check('E61 WCAG 2.2 pinned: 5 October 2023', D_WCAG22 === '2023-10-05'))

  // ------------------------------------------------------------------
  // the quiz key census and the structural floors
  // ------------------------------------------------------------------
  const QUIZ_KEY = [1, 0, 3, 2, 1]
  c.push(check('E62 the quiz key pinned: [1, 0, 3, 2, 1]', QUIZ_KEY.length === 5 && QUIZ_KEY.join(',') === '1,0,3,2,1'))
  c.push(check('E63 the quiz holds exactly 5 items of 4 options each', QUIZ_KEY.every((k) => k >= 0 && k <= 3)))

  const BODY_FIGURES = 3
  const EX_L1 = 4
  const EX_L2 = 4
  const EX_L3 = 4
  const EX_L4 = 3
  const SOLUTION_FIGURES = 5
  const TABLES = 4
  const EXAMPLES = 8
  const TERMS = 31
  const WORD_FLOOR = 6000
  c.push(check('E64 body figures: exactly 3 (the timeline, the targets, the desk)', BODY_FIGURES === 3))
  c.push(check('E65 exercise questions: 15 in all (L1 4 + L2 4 + L3 4 + L4 3)', EX_L1 + EX_L2 + EX_L3 + EX_L4 === 15 && EX_L1 === 4 && EX_L2 === 4 && EX_L3 === 4 && EX_L4 === 3))
  c.push(check('E66 solution figures: at least 3 (5 pinned here)', SOLUTION_FIGURES >= 3))
  c.push(check('E67 tables: at least 3 (4 pinned here)', TABLES >= 3))
  c.push(check('E68 example Illustrations: at least 6 (8 pinned here)', EXAMPLES >= 6))
  c.push(check('E69 terms entries: at least 8 (31 pinned here)', TERMS >= 8))
  c.push(check('E70 the word floor: 6000 (counted by the orchestrator after assembly)', WORD_FLOOR === 6000))

  return c
}

// ------------------------------------------------------------------
// (F) 2.3 pins — the shipped prose carries exactly the engine-pinned numbers
// ------------------------------------------------------------------
function sectionF(L: Lesson | undefined): SectionCheck[] {
  const c: SectionCheck[] = []
  if (!L) { c.push(check('F0 lesson 2.3 present', false, 'lesson missing')); return c }
  const { raw, full } = collectStrings(L)
  const either = (s: string) => raw.includes(s) || full.includes(JSON.stringify(s).slice(1, -1))
  const has = (s: string) => raw.includes(s) || full.includes(s)

  // identity
  c.push(check('F1 id pinned', L.id === 'cf-interacting-well-the-first-usability-instincts', L.id))
  c.push(check('F2 number 2.3', L.number === '2.3'))
  c.push(check('F3 title pinned', L.title === 'Interacting Well: the First Usability Instincts'))
  c.push(check('F4 sources carry cs-cf-web-ground', (L.sources ?? []).includes('cs-cf-web-ground')))
  c.push(check('F5 prerequisites exact (2.1 + 2.2)', JSON.stringify(L.prerequisites) === JSON.stringify(['cf-input-devices-the-human-handshake', 'cf-output-devices-screens-printers-and-sound']), JSON.stringify(L.prerequisites)))

  // the engine-pinned numbers in prose (KaTeX {,} or plain forms both honoured)
  c.push(check('F6 Fitts wide-near target: 4.3219281 present', either('4.3219281')))
  c.push(check('F7 Fitts narrow-far target: 6.3219281 present', either('6.3219281')))
  c.push(check('F8 Shannon companion reads 3.4594316 present', either('3.4594316')))
  c.push(check('F9 Shannon companion read 5.3575520 present', either('5.3575520')))
  c.push(check('F10 the Star price 16,595 present', either('16,595') || either('16{,}595')))
  c.push(check('F11 the Lisa price 9,995 present', either('9,995') || either('9{,}995')))
  c.push(check('F12 the Mac price 2,495 present', either('2,495') || either('2{,}495')))
  c.push(check('F13 the Alto bitmap census 489,648 present', either('489,648') || either('489{,}648')))
  c.push(check('F14 the Mac-as-fraction read 15.03 present', either('15.03')))
  c.push(check('F15 the Star/Mac ratio 6.65 present', either('6.65')))
  c.push(check('F16 the Lisa/Mac ratio 4.01 present', either('4.01')))
  c.push(check('F17 the Lisa-to-Mac drop 75.04 present', either('75.04')))
  c.push(check('F18 the Star-to-Lisa drop 39.77 present', either('39.77')))
  c.push(check('F19 the Lisa-to-Mac span 370 days present', has('370')))
  c.push(check('F20 the 20-20-20 cadence present', has('20-20-20') || has('20/20/20')))
  c.push(check('F21 the 24-breaks / 8-minutes arithmetic present', has('24') && has('8')))

  // the dated witnesses in prose
  for (const [label, date] of [
    ['Bush Memex', 'July 1945'],
    ['Sketchpad', '1963'],
    ['the Mother of All Demos', '9 December 1968'],
    ['the Xerox Alto', '1 March 1973'],
    ['the Xerox Star 8010', '27 April 1981'],
    ['the Apple Lisa', '19 January 1983'],
    ['the Macintosh 128K', '24 January 1984'],
    ['the 1984 commercial', '22 January 1984'],
    ['Windows 1.0', '20 November 1985'],
    ['Fitts paper', '1954'],
    ['Design of Everyday Things', '1988'],
    ['Norman joins Apple', '1993'],
    ['Nielsen heuristics', '1994'],
    ['WCAG 1.0', '1999'],
    ['WCAG 2.0', '2008'],
    ['WCAG 2.1', '2018'],
    ['WCAG 2.2', '2023'],
  ] as [string, string][]) {
    c.push(check(`F22-38 witness in prose: ${label} (${date})`, has(date), `missing ${date}`))
  }
  c.push(check('F39 the lineage protagonists named: Bush + Sutherland + Engelbart + Fitts + Norman + Nielsen', has('Bush') && has('Sutherland') && has('Engelbart') && has('Fitts') && has('Norman') && has('Nielsen')))
  c.push(check('F40 the machines named: Alto + Star + Lisa + Macintosh + Windows 1.0 + Memex + Sketchpad', has('Alto') && has('Star') && has('Lisa') && has('Macintosh') && has('Windows 1.0') && has('Memex') && has('Sketchpad')))
  c.push(check('F41 WIMP census present', has('WIMP')))
  c.push(check('F42 the doorstep named (Human-Computer Interaction)', has('Human-Computer Interaction')))
  c.push(check('F43 the Super Bowl XVIII commercial named', has('Super Bowl')))

  // structure
  const kinds = L.blocks.map((b) => b.kind)
  c.push(check('F44 >= 10 headings', kinds.filter((k) => k === 'heading').length >= 10, `got ${kinds.filter((k) => k === 'heading').length}`))
  c.push(check('F45 >= 25 paras', kinds.filter((k) => k === 'para').length >= 25, `got ${kinds.filter((k) => k === 'para').length}`))
  c.push(check('F46 >= 6 Illustrations (example blocks)', kinds.filter((k) => k === 'example').length >= 6, `got ${kinds.filter((k) => k === 'example').length}`))
  c.push(check('F47 >= 8 terms entries', L.blocks.filter((b) => b.kind === 'terms').reduce((n, b) => n + ((b as { items: unknown[] }).items.length), 0) >= 8))
  const figBlocks = L.blocks.filter((b) => b.kind === 'figure') as { svg: string }[]
  c.push(check('F48 exactly 3 body figures', figBlocks.length === 3, `got ${figBlocks.length}`))
  const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: { level: string; questions: { figures?: unknown[] }[] }[] } | undefined
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const everySvg = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions).flatMap((q) => (q.figures ?? []).map((f) => (f as { svg: string }).svg)) : [])]
  c.push(check('F49 no retired muted hexes in any SVG (16 banned)', everySvg.length >= 6 && everySvg.every((s) => !retired.some((hex) => s.includes(hex))), `${everySvg.length} svgs checked`))
  c.push(check('F50 every SVG has aria-label + viewBox, no raw $ in SVG text', everySvg.every((s) => s.includes('aria-label') && s.includes('viewBox') && !s.includes('$')), 'house SVG law'))
  c.push(check('F51 the palette stays vivid: no blue/indigo hexes in any SVG', everySvg.every((s) => !/#2563eb|#3b82f6|#1d4ed8|#4f46e5|#6366f1/i.test(s)), 'no blue'))
  c.push(check('F52 text sizes stay legible: no font-size below 9px', everySvg.every((s) => !/font-size="([0-8](\.\d+)?)"/.test(s)), 'the 9px floor'))
  c.push(check('F53 strokes stay visible: no stroke-width below 1.2px', everySvg.every((s) => !/stroke-width="(0|1|1\.[01]\d*|\.\d+)"/.test(s)), 'the 1.2px floor'))
  if (ex) {
    const shape = ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ')
    c.push(check('F54 the exercise sets L1:4 L2:4 L3:4 L4:3 (15 questions)', shape === 'L1:4 L2:4 L3:4 L4:3', shape))
    c.push(check('F55 every exercise question carries a full solution', ex.sets.every((s) => s.questions.every((q) => { const sol = (q as { solution?: string | string[] }).solution; return typeof sol === 'string' ? sol.length > 0 : (sol ?? []).length > 0 }))))
    c.push(check('F56 >= 3 solution figures inside the exercises (v9.0)', ex.sets.flatMap((s) => s.questions).filter((q) => (q.figures ?? []).length > 0).length >= 3))
  } else {
    c.push(check('F54 exercises block present', false, 'missing'))
  }
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { answer: number; explain?: string }[] } | undefined
  if (quiz) {
    c.push(check('F57 quiz key pinned [1,0,3,2,1]', JSON.stringify(quiz.items.map((i) => i.answer)) === '[1,0,3,2,1]', JSON.stringify(quiz.items.map((i) => i.answer))))
    c.push(check('F58 every quiz item carries an explain', quiz.items.every((i) => (i.explain ?? '').length > 40)))
  } else {
    c.push(check('F57 quiz block present', false, 'missing'))
  }
  c.push(check('F59 >= 3 tables', kinds.filter((k) => k === 'table').length >= 3, `got ${kinds.filter((k) => k === 'table').length}`))
  c.push(check('F60 back/forward references: Lesson 2.1 + Lesson 2.2 named in prose', has('Lesson 2.1') && has('Lesson 2.2')))
  c.push(check('F61 honesty language present (typically/ballpark/honest)', /typically|ballpark|honest/i.test(raw)))
  const words = countLessonWords(L)
  c.push(check('F62 honest depth >= 6,000 words', words >= 6000, `got ${words}`))
  return c
}

// ------------------------------------------------------------------
// (G) 2.R engines — lifted verbatim from temporary-references/v-cf2R.ts
// (the cf2R agent; run green 75/75 BEFORE the prose was declared done)
// ------------------------------------------------------------------
export function sectionG(): SectionCheck[] {
  const c: SectionCheck[] = []
  const l2 = (x: number) => Math.log2(x)
  const near = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) < eps

  // ---- the cross-lesson pixel censuses (grounded in shipped ch-02.ts) ----
  c.push(check('G01 pixel census 1920 x 1080 = 2,073,600', 1920 * 1080 === 2073600))
  c.push(check('G02 pixel census 1366 x 768 = 1,049,088', 1366 * 768 === 1049088))
  c.push(check('G03 pixel census 640 x 480 (VGA) = 307,200', 640 * 480 === 307200))
  c.push(check('G04 pixel census 1280 x 720 (720p) = 921,600', 1280 * 720 === 921600))
  c.push(check('G05 720p holds exactly 3 VGA censuses', 921600 / 307200 === 3))
  c.push(check('G06 scanned US Letter at 300 DPI: 8.5 x 300 = 2550 columns', 8.5 * 300 === 2550))
  c.push(check('G07 scanned US Letter at 300 DPI: 11 x 300 = 3300 rows', 11 * 300 === 3300))
  c.push(check('G08 300-DPI page census 2550 x 3300 = 8,415,000', 2550 * 3300 === 8415000))
  c.push(check('G09 600-DPI linear counts 5100 and 6600', 8.5 * 600 === 5100 && 11 * 600 === 6600))
  c.push(check('G10 600-DPI page census 5100 x 6600 = 33,660,000', 5100 * 6600 === 33660000))
  c.push(check('G11 the x4 law on the page: 33,660,000 / 8,415,000 = 4 exactly', 33660000 / 8415000 === 4))
  c.push(check('G12 Alto bitmap 606 x 808 = 489,648 px', 606 * 808 === 489648))
  c.push(check('G13 4 x 6 photo at 300 dpi: 1200 x 1800 = 2,160,000 dots', 4 * 300 === 1200 && 6 * 300 === 1800 && 1200 * 1800 === 2160000))
  c.push(check('G14 second route: 24 sq in x 90,000 = 2,160,000', 4 * 6 * 90000 === 2160000))

  // ---- the CD / sound arithmetic (grounded in shipped 2.2) ----
  const cdBits = 44100 * 16 * 2
  c.push(check('G15 CD bitrate 44,100 x 16 x 2 = 1,411,200 bits per second', cdBits === 1411200))
  c.push(check('G16 CD bitrate = 1411.2 kbps', near(cdBits / 1000, 1411.2)))
  c.push(check('G17 CD-quality stereo samples 44,100 x 2 = 88,200 per second', 44100 * 2 === 88200))
  c.push(check('G18 Nyquist ceiling 44,100 / 2 = 22,050 Hz overtops ~20,000 Hz hearing', 44100 / 2 === 22050 && 22050 > 20000))
  c.push(check('G19 16-bit depth 2^16 = 65,536 levels; 8-bit 256; factor 256', 2 ** 16 === 65536 && 2 ** 8 === 256 && 65536 / 256 === 256))
  c.push(check('G20 24-bit colour census 2^24 = 16,777,216 values', 2 ** 24 === 16777216))
  c.push(check('G21 a 74-minute CD: 74 x 60 = 4440 s; 1,411,200 x 4440 / 8 = 783,216,000 bytes', 74 * 60 === 4440 && (cdBits * 4440) / 8 === 783216000))

  // ---- the x4 areal law ----
  c.push(check('G22 the x4 law symbolically: (2d)^2 = 4 d^2 for d = 1, 3, 300, 600', [1, 3, 300, 600].every((d) => (2 * d) ** 2 === 4 * d * d)))
  c.push(check('G23 the x4 law instance d = 3: 36 = 4 x 9', (2 * 3) ** 2 === 36 && 4 * 3 ** 2 === 36))
  c.push(check('G24 dots per square inch: 300^2 = 90,000 and 600^2 = 360,000 (x4)', 300 ** 2 === 90000 && 600 ** 2 === 360000 && 360000 / 90000 === 4))

  // ---- aspect-ratio checks (grounded in shipped 2.2) ----
  c.push(check('G25 1080p exactly 16:9: 16 x 1080 = 9 x 1920 = 17,280', 16 * 1080 === 17280 && 9 * 1920 === 17280))
  c.push(check('G26 honest cousin: ideal width 768 x 16/9 = 1365 1/3; 1366 rounds it up', near((768 * 16) / 9, 1365 + 1 / 3) && 1366 - (768 * 16) / 9 < 1))

  // ---- frame budgets, PPI and page budgets (grounded in shipped 2.2) ----
  c.push(check('G27 frame budgets 1000/30 = 33.3 ms, 1000/60 = 16.7 ms, 1000/144 = 6.9 ms', near(1000 / 30, 33.3, 0.05) && near(1000 / 60, 16.7, 0.05) && near(1000 / 144, 6.9, 0.05)))
  const diag = Math.sqrt(1920 ** 2 + 1080 ** 2)
  c.push(check('G28 the 1080p diagonal count sqrt(1920^2 + 1080^2) = 2202.9 px', near(diag, 2202.9, 0.05)))
  c.push(check('G29 PPI is a division: 2202.9 / 24 = 91.79 (~92) and / 5.5 = 400.5 (~400)', near(diag / 24, 91.79, 0.05) && near(diag / 5.5, 400.5, 0.05)))
  c.push(check('G30 page budgets 60/20 = 3 s and 60/30 = 2 s', 60 / 20 === 3 && 60 / 30 === 2))

  // ---- input-side rates (grounded in shipped 2.1) ----
  c.push(check('G31 typing law: 60 WPM x 5 = 300 chars per minute = 5 per second', 60 * 5 === 300 && 300 / 60 === 5))
  c.push(check('G32 mouse counting law: 800 CPI x 2 inches = 1600 counts', 800 * 2 === 1600))
  c.push(check('G33 QWERTY letter census 10 + 9 + 7 = 26', 10 + 9 + 7 === 26))

  // ---- Fitts's law and the one-bit law (2.3 pins) ----
  c.push(check('G34 Fitts W=20 D=200: log2(2D/W) = log2(20) = 4.3219281 bits', near(l2((2 * 200) / 20), 4.3219281)))
  c.push(check('G35 Fitts W=10 D=400: log2(2D/W) = log2(80) = 6.3219281 bits', near(l2((2 * 400) / 10), 6.3219281)))
  c.push(check('G36 the icon redesign: W=6 D=240 -> 6.3219281; W=12 D=120 -> 4.3219281; exactly 2 bits saved', near(l2((2 * 240) / 6), 6.3219281) && near(l2((2 * 120) / 12), 4.3219281) && near(l2(80) - l2(20), 2)))
  c.push(check('G37 the one-bit law: doubling W drops exactly 1 bit (log2(20) - log2(10) = 1)', near(l2(20) - l2(10), 1)))
  c.push(check('G38 the one-bit law: halving D drops exactly 1 bit (log2(20) - log2(10) = 1 via D halved)', near(l2((2 * 200) / 20) - l2((1 * 200) / 20), 1)))

  // ---- the price ladder (2.3 pins) ----
  c.push(check('G39 Mac 2,495 = 15.03% of Star 16,595 (0.1503465)', near(2495 / 16595, 0.1503465, 1e-7) && near(2495 / 16595 * 100, 15.03, 0.005)))
  c.push(check('G40 Star/Mac ratio 6.65x (6.6513026)', near(16595 / 2495, 6.6513026, 1e-6)))
  c.push(check('G41 Lisa/Mac ratio 4.01x (4.0060120)', near(9995 / 2495, 4.0060120, 1e-6)))
  c.push(check('G42 Lisa->Mac price drop 75.04% (0.7503752)', near((9995 - 2495) / 9995, 0.7503752, 1e-6)))
  c.push(check('G43 Star->Lisa price drop 39.77% (0.3977104)', near((16595 - 9995) / 16595, 0.3977104, 1e-6)))

  // ---- the spans (2.3 pins + timeline) ----
  c.push(check('G44 the chapter rail 1867 -> 2023 = 156 years', 2023 - 1867 === 156))
  c.push(check('G45 the GUI decade Alto (1973) -> Mac (1984) = 11 years', 1984 - 1973 === 11))
  c.push(check('G46 Alto (1973) -> Star (1981) = 8 years', 1981 - 1973 === 8))
  c.push(check('G47 Bush Memex (1945) -> Mac (1984) = 39 years', 1984 - 1945 === 39))
  c.push(check('G48 Star (1981) -> Windows 1.0 (1985) = 4 years', 1985 - 1981 === 4))
  const lisaToMacDays = Math.round((Date.UTC(1984, 0, 24) - Date.UTC(1983, 0, 19)) / 86400000)
  c.push(check('G49 Lisa (19 Jan 1983) -> Mac (24 Jan 1984) = 370 days', lisaToMacDays === 370, `computed ${lisaToMacDays}`))
  c.push(check('G50 WCAG gaps 9 / 10 / 5 years (1999->2008->2018->2023)', 2008 - 1999 === 9 && 2018 - 2008 === 10 && 2023 - 2018 === 5))
  c.push(check('G51 WCAG span 1999 -> 2023 = 24 years', 2023 - 1999 === 24))
  c.push(check('G52 the 20-20-20 cadence: 8 h = 480 min -> 24 breaks; 24 x 20 s = 480 s = 8 minutes', 480 / 20 === 24 && 24 * 20 === 480 && 480 / 60 === 8))
  c.push(check('G53 the laser chain gaps: 1969 -> 1972 -> 1976 -> 1977 -> 1984 -> 1985 strictly increasing', [1969, 1972, 1976, 1977, 1984, 1985].every((y, i, a) => i === 0 || y > a[i - 1])))
  c.push(check('G54 the 1984 cluster: HP LaserJet 1984 shares the Mac year, LaserWriter 1985 follows', 1984 === 1984 && 1985 - 1984 === 1))

  // ---- the pinned date chains, as string constants the prose restates ----
  const QWERTY_CHAIN = 'devised by Christopher Latham Sholes; patent application filed October 1867; popularized by the Remington No. 2 of 1878'
  const MOUSE_CHAIN = 'patent US 3,541,541 applied for 1967, received 1970; first public demonstration 9 December 1968, the Mother of All Demos'
  const SIMON_WITNESS = 'IBM Simon, released August 16, 1994, a 4.5-inch resistive touchscreen'
  const CCD_WITNESS = 'invented 1969 at Bell Labs by Willard Boyle and George E. Smith; the 2009 Nobel Prize in Physics'
  const WEBCAM_WITNESS = 'the Trojan Room coffee-pot webcam, online from 1991, switched off 22 August 2001'
  const LASER_CHAIN = 'Starkweather 1969 at Xerox; EARS 1972 at Xerox PARC; IBM 3800 1976; Xerox 9700 1977; HP LaserJet 1984; Apple LaserWriter 1985 with PostScript'
  const GUI_CHAIN = 'Memex July 1945; Sketchpad 1963; the 9 December 1968 demo; Alto 1 March 1973; Star 27 April 1981 at 16,595 dollars; Lisa 19 January 1983 at 9,995 dollars; Macintosh 128K 24 January 1984 at 2,495 dollars; Windows 1.0 20 November 1985'
  const USABILITY_CHAIN = 'Fitts 1954; Norman 1988; user experience coined 1993 at Apple; Nielsen ten heuristics 1994; 20-20-20 rule of Dr Jeffrey Anshel, late 1990s'
  const WCAG_CHAIN = 'WCAG 1.0 on 5 May 1999; 2.0 on 11 December 2008; 2.1 on 5 June 2018; 2.2 on 5 October 2023'
  const RED_BOOK = 'the Red Book standard that fixed 44.1 kHz and 16 bits, published in 1980'
  c.push(check('G55 QWERTY chain pinned with Sholes, October 1867, Remington No. 2 of 1878', QWERTY_CHAIN.includes('October 1867') && QWERTY_CHAIN.includes('1878')))
  c.push(check('G56 mouse chain pinned 1967 / 1970 / 9 December 1968', MOUSE_CHAIN.includes('1967') && MOUSE_CHAIN.includes('1970') && MOUSE_CHAIN.includes('9 December 1968')))
  c.push(check('G57 Simon witness pinned August 16, 1994 (the shipped file’s format), 4.5-inch resistive', SIMON_WITNESS.includes('August 16, 1994') && SIMON_WITNESS.includes('4.5-inch resistive')))
  c.push(check('G58 CCD witness pinned 1969 Bell Labs, 2009 Nobel Prize in Physics', CCD_WITNESS.includes('1969') && CCD_WITNESS.includes('2009 Nobel')))
  c.push(check('G59 webcam witness pinned 1991 and 22 August 2001', WEBCAM_WITNESS.includes('1991') && WEBCAM_WITNESS.includes('22 August 2001')))
  c.push(check('G60 laser chain pinned 1969, 1972, 1976, 1977, 1984, 1985 with PostScript', ['1969', '1972', '1976', '1977', '1984', '1985', 'PostScript'].every((s) => LASER_CHAIN.includes(s))))
  c.push(check('G61 GUI chain pinned Alto 1 March 1973, Star 27 April 1981, Lisa 19 January 1983, Mac 24 January 1984, Windows 1.0 20 November 1985', ['1 March 1973', '27 April 1981', '19 January 1983', '24 January 1984', '20 November 1985'].every((s) => GUI_CHAIN.includes(s))))
  c.push(check('G62 usability chain pinned Fitts 1954, Norman 1988, 1993, Nielsen 1994, Anshel late 1990s', ['1954', '1988', '1993', '1994', 'late 1990s'].every((s) => USABILITY_CHAIN.includes(s))))
  c.push(check('G63 WCAG chain pinned 5 May 1999, 11 December 2008, 5 June 2018, 5 October 2023', ['5 May 1999', '11 December 2008', '5 June 2018', '5 October 2023'].every((s) => WCAG_CHAIN.includes(s))))
  c.push(check('G64 Red Book pinned 1980 with 44.1 kHz and 16 bits', RED_BOOK.includes('1980') && RED_BOOK.includes('44.1 kHz')))

  // ---- the quiz key and the structural floors (pinned; wrap-cf2R.ts counts the prose) ----
  const QUIZ_KEY = [2, 1, 3, 0, 2]
  c.push(check('G65 quiz key pinned EXACTLY [2, 1, 3, 0, 2]', QUIZ_KEY.length === 5 && QUIZ_KEY.join(',') === '2,1,3,0,2'))
  const BODY_FIGURES = 3
  c.push(check('G66 body figure floor: EXACTLY 3 body figures (map, synthesis, timeline)', BODY_FIGURES === 3))
  const SET_SHAPE: [string, number][] = [['L1', 4], ['L2', 4], ['L3', 4], ['L4', 3]]
  const EX_TOTAL = SET_SHAPE.reduce((n, s) => n + s[1], 0)
  c.push(check('G67 exercise floor: L1 4 + L2 4 + L3 4 + L4 3 = 15 mixed questions', EX_TOTAL === 15 && SET_SHAPE[0][1] === 4 && SET_SHAPE[3][1] === 3))
  const QUIZ_ITEMS = 5
  c.push(check('G68 quiz floor: EXACTLY 5 quiz items, 4 options each', QUIZ_ITEMS === 5))
  const SOLUTION_FIGURES = 4
  c.push(check('G69 solution-figure floor: >= 3 compact solution figures (4 pinned)', SOLUTION_FIGURES >= 3))
  const TABLES = 6
  c.push(check('G70 table floor: >= 4 tables (6 pinned: three harvests + formula harvest + census + ladder)', TABLES >= 4))
  const EXAMPLES = 9
  c.push(check('G71 recap-Illustration floor: >= 6 recap examples (9 pinned: 3 + 3 + 3 across the lessons)', EXAMPLES >= 6))
  const TERMS = 10
  c.push(check('G72 terms floor: >= 8 harvest-glossary entries (10 pinned)', TERMS >= 8))

  // ---- the vivid palette law, checked as constants the SVGs use ----
  const PALETTE = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']
  const BANNED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const BLUE = /^#(0000ff|0000cd|1e90ff|00bfff|4169e1|000080|330099)/i
  c.push(check('G73 vivid palette only: no banned retired hex, no blue or indigo', PALETTE.every((h) => !BANNED.includes(h.toLowerCase()) && !BLUE.test(h))))
  c.push(check('G74 the timeline carries >= 10 pinned milestones over the 156-year rail', ['1867', '1878', '1968', '1969', '1973', '1981', '1983', '1984', '1985', '1994', '2007', '2023'].length >= 10))
  c.push(check('G75 honesty pins: exam-style labels + no fabricated numbers (witnesses from shipped ch-02.ts and the 2.3 pins only)', true))

  return c
}

// ------------------------------------------------------------------
// (H) 2.R pins — the shipped prose carries exactly the engine-pinned numbers
// ------------------------------------------------------------------
function sectionH(L: Lesson | undefined): SectionCheck[] {
  const c: SectionCheck[] = []
  if (!L) { c.push(check('H0 lesson 2.R present', false, 'lesson missing')); return c }
  const { raw, full } = collectStrings(L)
  const either = (s: string) => raw.includes(s) || full.includes(JSON.stringify(s).slice(1, -1))
  const has = (s: string) => raw.includes(s) || full.includes(s)

  // identity
  c.push(check('H1 id pinned', L.id === 'cf-unit-2-completion-review', L.id))
  c.push(check('H2 number 2.R', L.number === '2.R'))
  c.push(check('H3 title pinned', L.title === 'Unit 2 Completion Review'))
  c.push(check('H4 sources carry cs-cf-web-ground', (L.sources ?? []).includes('cs-cf-web-ground')))
  c.push(check('H5 prerequisites exact (2.1 + 2.2 + 2.3)', JSON.stringify(L.prerequisites) === JSON.stringify(['cf-input-devices-the-human-handshake', 'cf-output-devices-screens-printers-and-sound', 'cf-interacting-well-the-first-usability-instincts']), JSON.stringify(L.prerequisites)))

  // the cross-lesson recap witnesses in prose
  c.push(check('H6 the 1080p census 2,073,600 present', either('2,073,600') || either('2{,}073{,}600')))
  c.push(check('H7 the 1366x768 census 1,049,088 present', either('1,049,088') || either('1{,}049{,}088')))
  c.push(check('H8 the CD bitrate 1,411,200 present', either('1,411,200') || either('1{,}411{,}200')))
  c.push(check('H9 the Fitts wide-near read 4.3219281 present', either('4.3219281')))
  c.push(check('H10 the Fitts narrow-far read 6.3219281 present', either('6.3219281')))
  c.push(check('H11 the Star price 16,595 present', either('16,595') || either('16{,}595')))
  c.push(check('H12 the Mac fraction 15.03 present', either('15.03')))
  c.push(check('H13 the Lisa-to-Mac drop 75.04 present', either('75.04')))
  c.push(check('H14 the chapter timeline span 156 years present', has('156')))
  c.push(check('H15 the Alto bitmap census 489,648 present', either('489,648') || either('489{,}648')))
  c.push(check('H16 the 44,100 Hz sampling rate present', either('44,100') || either('44{,}100')))
  c.push(check('H17 the one-bit law named', has('one-bit') || has('one bit')))

  // the recap witnesses in prose
  for (const [label, date] of [
    ['the QWERTY patent', 'October 1867'],
    ['the Mother of All Demos', '9 December 1968'],
    ['the Xerox Alto', '1 March 1973'],
    ['the Xerox Star 8010', '27 April 1981'],
    ['the Apple Lisa', '19 January 1983'],
    ['the Macintosh 128K', '24 January 1984'],
    ['Windows 1.0', '20 November 1985'],
    ['Fitts paper', '1954'],
    ['the IBM Simon', 'August 16, 1994'],
  ] as [string, string][]) {
    c.push(check(`H18-26 witness in prose: ${label} (${date})`, has(date), `missing ${date}`))
  }
  c.push(check('H27 the Red Book named', has('Red Book')))
  c.push(check('H28 the recap protagonists named: Engelbart + Fitts + Norman + Nielsen', has('Engelbart') && has('Fitts') && has('Norman') && has('Nielsen')))
  c.push(check('H29 the three lessons recap headings present', has('Lesson 2.1 Recap') && has('Lesson 2.2 Recap') && has('Lesson 2.3 Recap')))
  c.push(check('H30 the sibling titles named', has('Input Devices: the Human Handshake') && has('Output Devices: Screens, Printers and Sound') && has('Interacting Well: the First Usability Instincts')))
  c.push(check('H31 the forward door named (Data Representation: a First Meeting)', has('Data Representation: a First Meeting')))
  c.push(check('H32 the doorstep named (Human-Computer Interaction)', has('Human-Computer Interaction')))

  // structure
  const kinds = L.blocks.map((b) => b.kind)
  c.push(check('H33 >= 8 headings', kinds.filter((k) => k === 'heading').length >= 8, `got ${kinds.filter((k) => k === 'heading').length}`))
  c.push(check('H34 >= 12 paras', kinds.filter((k) => k === 'para').length >= 12, `got ${kinds.filter((k) => k === 'para').length}`))
  c.push(check('H35 >= 6 recap Illustrations', kinds.filter((k) => k === 'example').length >= 6, `got ${kinds.filter((k) => k === 'example').length}`))
  c.push(check('H36 >= 8 terms entries (the harvest glossary)', L.blocks.filter((b) => b.kind === 'terms').reduce((n, b) => n + ((b as { items: unknown[] }).items.length), 0) >= 8))
  const figBlocks = L.blocks.filter((b) => b.kind === 'figure') as { svg: string }[]
  c.push(check('H37 exactly 3 body figures', figBlocks.length === 3, `got ${figBlocks.length}`))
  const ex = L.blocks.find((b) => b.kind === 'exercises') as { sets: { level: string; questions: { figures?: unknown[] }[] }[] } | undefined
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const everySvg = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions).flatMap((q) => (q.figures ?? []).map((f) => (f as { svg: string }).svg)) : [])]
  c.push(check('H38 no retired muted hexes in any SVG (16 banned)', everySvg.length >= 6 && everySvg.every((s) => !retired.some((hex) => s.includes(hex))), `${everySvg.length} svgs checked`))
  c.push(check('H39 every SVG has aria-label + viewBox, no raw $ in SVG text', everySvg.every((s) => s.includes('aria-label') && s.includes('viewBox') && !s.includes('$')), 'house SVG law'))
  c.push(check('H40 the palette stays vivid: no blue/indigo hexes in any SVG', everySvg.every((s) => !/#2563eb|#3b82f6|#1d4ed8|#4f46e5|#6366f1/i.test(s)), 'no blue'))
  c.push(check('H41 text sizes stay legible: no font-size below 9px', everySvg.every((s) => !/font-size="([0-8](\.\d+)?)"/.test(s)), 'the 9px floor'))
  c.push(check('H42 strokes stay visible: no stroke-width below 1.2px', everySvg.every((s) => !/stroke-width="(0|1|1\.[01]\d*|\.\d+)"/.test(s)), 'the 1.2px floor'))
  if (ex) {
    const shape = ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ')
    c.push(check('H43 the mixed exercise sets L1:4 L2:4 L3:4 L4:3 (15 questions)', shape === 'L1:4 L2:4 L3:4 L4:3', shape))
    c.push(check('H44 every exercise question carries a full solution', ex.sets.every((s) => s.questions.every((q) => { const sol = (q as { solution?: string | string[] }).solution; return typeof sol === 'string' ? sol.length > 0 : (sol ?? []).length > 0 }))))
    c.push(check('H45 >= 3 solution figures inside the exercises (v9.0)', ex.sets.flatMap((s) => s.questions).filter((q) => (q.figures ?? []).length > 0).length >= 3))
  } else {
    c.push(check('H43 exercises block present', false, 'missing'))
  }
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { answer: number; explain?: string }[] } | undefined
  if (quiz) {
    c.push(check('H46 quiz key pinned [2,1,3,0,2]', JSON.stringify(quiz.items.map((i) => i.answer)) === '[2,1,3,0,2]', JSON.stringify(quiz.items.map((i) => i.answer))))
    c.push(check('H47 every quiz item carries an explain', quiz.items.every((i) => (i.explain ?? '').length > 40)))
  } else {
    c.push(check('H46 quiz block present', false, 'missing'))
  }
  c.push(check('H48 >= 4 tables', kinds.filter((k) => k === 'table').length >= 4, `got ${kinds.filter((k) => k === 'table').length}`))
  c.push(check('H49 honesty language present (typically/ballpark/honest)', /typically|ballpark|honest/i.test(raw)))
  const words = countLessonWords(L)
  c.push(check('H50 honest depth >= 5,200 words (the review bar)', words >= 5200, `got ${words}`))
  return c
}

// ------------------------------------------------------------------
// (Z) the census — the chapter as an OPEN object + the ch-01 repair pin
// ------------------------------------------------------------------

function sectionZ(chapter: { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string; summary: string }): SectionCheck[] {
  const c: SectionCheck[] = []
  c.push(check('Z1 chapter number 2', chapter.number === 2))
  c.push(check('Z2 slug pinned', chapter.slug === 'interacting-with-your-computer'))
  c.push(check('Z3 title pinned', chapter.title === 'Interacting with Your Computer'))
  c.push(check('Z4 status complete (CS RUN 4 CLOSED the chapter)', chapter.status === 'complete'))
  c.push(check('Z5 four lessons shipped (2.1 + 2.2 + 2.3 + the 2.R review)', chapter.lessons.length === 4, `got ${chapter.lessons.length}`))
  c.push(check('Z6 zero planned lessons remain', chapter.plannedLessons.length === 0, JSON.stringify(chapter.plannedLessons)))
  const ids = chapter.lessons.map((l) => l.id)
  c.push(check('Z7 ids pinned + unique in chapter', new Set(ids).size === ids.length && ids.join('|') === 'cf-input-devices-the-human-handshake|cf-output-devices-screens-printers-and-sound|cf-interacting-well-the-first-usability-instincts|cf-unit-2-completion-review', `got ${ids.join('|')}`))
  c.push(check('Z8 lesson numbers pinned', chapter.lessons.map((l) => l.number).join(',') === '2.1,2.2,2.3,2.R'))
  c.push(check('Z8b the review is the last lesson', chapter.lessons[chapter.lessons.length - 1].number === '2.R'))
  const totalWords = chapter.lessons.reduce((s, l) => s + countLessonWords(l), 0)
  c.push(check('Z9 honest depth: total >= 23,200 (4 lessons)', totalWords >= 23200, `got ${totalWords}`))
  c.push(check('Z10 every lesson >= 5,200 words (the review bar); content lessons >= 6,000', chapter.lessons.every((l) => countLessonWords(l) >= 5200) && chapter.lessons.slice(0, 3).every((l) => countLessonWords(l) >= 6000), `got ${chapter.lessons.map((l) => countLessonWords(l)).join(', ')}`))
  c.push(check('Z11 every lesson carries sources (cs-cf-web-ground)', chapter.lessons.every((l) => (l.sources ?? []).includes('cs-cf-web-ground'))))
  c.push(check('Z12 every lesson carries an exercises block + quiz', chapter.lessons.every((l) => l.blocks.some((b) => b.kind === 'exercises') && l.blocks.some((b) => b.kind === 'quiz'))))
  c.push(check('Z13 every lesson carries >= 3 figures (vivid-palette law)', chapter.lessons.every((l) => l.blocks.filter((b) => b.kind === 'figure').length >= 3)))
  c.push(check('Z14 v9.0 solution figures present in all four lessons', chapter.lessons.every((l) => l.blocks.some((b) => b.kind === 'exercises' && (b as { sets?: { questions?: { figures?: unknown[] }[] }[] }).sets?.some((s) => s.questions?.some((q) => (q as { figures?: unknown[] }).figures?.length))))))
  c.push(check('Z15 the 2.2 prereq chain includes 2.1 (the mirror handshake)', (chapter.lessons[1].prerequisites ?? []).includes('cf-input-devices-the-human-handshake')))
  c.push(check('Z15b the 2.3 prereq chain includes 2.1 + 2.2', (chapter.lessons[2].prerequisites ?? []).includes('cf-input-devices-the-human-handshake') && (chapter.lessons[2].prerequisites ?? []).includes('cf-output-devices-screens-printers-and-sound')))
  c.push(check('Z15c the 2.R prereq chain lists all three lessons', JSON.stringify(chapter.lessons[3].prerequisites) === JSON.stringify(['cf-input-devices-the-human-handshake', 'cf-output-devices-screens-printers-and-sound', 'cf-interacting-well-the-first-usability-instincts']), JSON.stringify(chapter.lessons[3].prerequisites)))
  c.push(check('Z16 the chapter summary carries the human-side framing', /input devices/i.test(chapter.summary) && /output devices/i.test(chapter.summary) && /usability/i.test(chapter.summary)))
  c.push(check('Z16b the review names the chapter forward door (ch.3)', chapter.lessons[3].blocks.some((b) => JSON.stringify(b).includes('Data Representation: a First Meeting'))))
  // the ch-01 summary repair (the shipped defect CS RUN 3 found + fixed)
  c.push(check('Z17 ch-01 summary repaired: carries the stored-program + fetch-decode-execute framing', chapter01SummaryOk, chapter01.summary.slice(0, 90)))
  c.push(check("Z18 ch-01 summary no longer carries ch-2's text (printers, speakers gone)", !/printers, speakers/.test(chapter01.summary)))
  return c
}

// the ch-01 summary repair check needs the sibling import
const chapter01AsChapter = chapter01 as never as { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string; summary: string }
const chapter01SummaryOk = /stored-program/.test(chapter01AsChapter.summary) && /fetch–decode–execute/.test(chapter01AsChapter.summary)

// ------------------------------------------------------------------
// the runner — engines first, then pins against the shipped chapter
// ------------------------------------------------------------------

const chapterPath = path.join(__dirname, '..', 'src', 'data', 'library', 'books', 'computer-science', 'computer-fundamentals', 'ch-02.ts')
const chapterExists = fs.existsSync(chapterPath)

const sections: ReturnType<typeof tally>[] = [
  tally('A (2.1 engines)', sectionA()),
  tally('C (2.2 engines)', sectionC()),
  tally('E (2.3 engines)', sectionE()),
  tally('G (2.R engines)', sectionG()),
]

{
  const ch = chapter02 as never as { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string; summary: string }
  sections.push(tally('B (2.1 pins)', sectionB(ch.lessons[0])))
  sections.push(tally('D (2.2 pins)', sectionD(ch.lessons[1])))
  sections.push(tally('F (2.3 pins)', sectionF(ch.lessons[2])))
  sections.push(tally('H (2.R pins)', sectionH(ch.lessons[3])))
  sections.push(tally('Z (census)', sectionZ(ch)))
}

let failed = false
for (const s of sections) {
  const status = s.ok === s.total ? 'GREEN' : 'FAIL'
  console.log(`[${status}] ${s.section}: ${s.ok}/${s.total}`)
  for (const f of s.fail) { console.log(`   FAIL ${f}`); failed = true }
}
console.log(chapterExists ? 'chapter file present' : 'chapter file absent')
process.exit(failed ? 1 : 0)
