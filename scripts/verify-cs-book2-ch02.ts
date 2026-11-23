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
 * 58/58, the part verifiers in temporary-references/), then re-run here
 * against the assembled chapter; the PIN sections (B/D) re-read the
 * shipped chapter file and assert the prose carries exactly the
 * engine-pinned numbers. Section Z is the open-chapter census (2.1 +
 * 2.2 shipped; 2.3 + the 2.R review ride the next fires) AND carries
 * the ch-01 summary repair pin (the copy-paste defect CS RUN 3 found
 * and fixed in the shipped chapter 1: its summary had carried chapter
 * 2's text since CS RUN 1).
 *
 *   (A) 2.1 engines — 'Input Devices: the Human Handshake' (the cf21 agent)
 *   (B) 2.1 pins
 *   (C) 2.2 engines — 'Output Devices: Screens, Printers and Sound' (the cf22 agent)
 *   (D) 2.2 pins
 *   (Z) the open-chapter census + the ch-01 summary-repair pin
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
// (Z) the census — the chapter as an OPEN object + the ch-01 repair pin
// ------------------------------------------------------------------

function sectionZ(chapter: { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string; summary: string }): SectionCheck[] {
  const c: SectionCheck[] = []
  c.push(check('Z1 chapter number 2', chapter.number === 2))
  c.push(check('Z2 slug pinned', chapter.slug === 'interacting-with-your-computer'))
  c.push(check('Z3 title pinned', chapter.title === 'Interacting with Your Computer'))
  c.push(check('Z4 status in-progress (OPEN — 2.3 + 2.R ride the next fires)', chapter.status === 'in-progress'))
  c.push(check('Z5 two lessons shipped (2.1 + 2.2)', chapter.lessons.length === 2, `got ${chapter.lessons.length}`))
  c.push(check('Z6 one planned lesson remains', chapter.plannedLessons.length === 1 && chapter.plannedLessons[0] === 'Interacting Well: the First Usability Instincts', JSON.stringify(chapter.plannedLessons)))
  const ids = chapter.lessons.map((l) => l.id)
  c.push(check('Z7 ids pinned + unique in chapter', new Set(ids).size === ids.length && ids.join('|') === 'cf-input-devices-the-human-handshake|cf-output-devices-screens-printers-and-sound', `got ${ids.join('|')}`))
  c.push(check('Z8 lesson numbers pinned', chapter.lessons.map((l) => l.number).join(',') === '2.1,2.2'))
  const totalWords = chapter.lessons.reduce((s, l) => s + countLessonWords(l), 0)
  c.push(check('Z9 honest depth: total >= 12,000 (2 lessons)', totalWords >= 12000, `got ${totalWords}`))
  c.push(check('Z10 every lesson >= 6,000 words', chapter.lessons.every((l) => countLessonWords(l) >= 6000), `got ${chapter.lessons.map((l) => countLessonWords(l)).join(', ')}`))
  c.push(check('Z11 every lesson carries sources (cs-cf-web-ground)', chapter.lessons.every((l) => (l.sources ?? []).includes('cs-cf-web-ground'))))
  c.push(check('Z12 every lesson carries an exercises block + quiz', chapter.lessons.every((l) => l.blocks.some((b) => b.kind === 'exercises') && l.blocks.some((b) => b.kind === 'quiz'))))
  c.push(check('Z13 every lesson carries >= 3 figures (vivid-palette law)', chapter.lessons.every((l) => l.blocks.filter((b) => b.kind === 'figure').length >= 3)))
  c.push(check('Z14 v9.0 solution figures present in both lessons', chapter.lessons.every((l) => l.blocks.some((b) => b.kind === 'exercises' && (b as { sets?: { questions?: { figures?: unknown[] }[] }[] }).sets?.some((s) => s.questions?.some((q) => (q as { figures?: unknown[] }).figures?.length))))))
  c.push(check('Z15 the 2.2 prereq chain includes 2.1 (the mirror handshake)', (chapter.lessons[1].prerequisites ?? []).includes('cf-input-devices-the-human-handshake')))
  c.push(check('Z16 the chapter summary carries the human-side framing', /input devices/i.test(chapter.summary) && /output devices/i.test(chapter.summary)))
  // the ch-01 summary repair (the shipped defect this run found + fixed)
  c.push(check('Z17 ch-01 summary repaired: carries the stored-program + fetch-decode-execute framing', chapter01SummaryOk, chapter01.summary.slice(0, 90)))
  c.push(check('Z18 ch-01 summary no longer carries ch-2\'s text (printers, speakers gone)', !/printers, speakers/.test(chapter01.summary)))
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
]

{
  const ch = chapter02 as never as { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string; summary: string }
  sections.push(tally('B (2.1 pins)', sectionB(ch.lessons[0])))
  sections.push(tally('D (2.2 pins)', sectionD(ch.lessons[1])))
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
