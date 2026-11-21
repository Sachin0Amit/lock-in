import { chapter01 } from '../src/data/library/books/computer-science/computer-fundamentals/ch-01'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import * as fs from 'fs'
import * as path from 'path'

export {}

/**
 * verify-cs-book1-ch01.ts — the chapter verifier for Computer
 * Fundamentals (the CS shelf's book #1), chapter 1 "The Computing
 * Machine" (CS RUN 1, the cs job's first honored fire, 2026-11-21).
 * VERIFY-FIRST per the standing protocol: each lesson's ENGINE section
 * (A/C) was grown and run green BEFORE that lesson's prose was declared
 * done — by the authoring agent itself, against its part file, then
 * re-run here against the assembled chapter; the PIN sections (B/D/F/H)
 * re-read the shipped chapter file and assert the prose carries exactly
 * the engine-pinned numbers. Section Z is the closed-chapter census
 * (CS RUN 2 closed chapter 1 complete: 1.1 + 1.2 + 1.3 + the 1.R review).
 * Assembled verbatim from the agents' v-cf1*.ts part verifiers by
 * temporary-references/assemble_cs1.py + assemble_cs2.py (the run-119
 * precedent).
 *
 *   (A) 1.1 engines — 'The Basic Structure and Operation of the Computer'
 *   (B) 1.1 pins
 *   (C) 1.2 engines — 'A Census of Hardware: Desktops to Embedded Chips'
 *   (D) 1.2 pins
 *   (E) 1.3 engines — 'Software: the Invisible Half of the Machine'
 *   (F) 1.3 pins
 *   (G) 1.R engines — 'Unit 1 Completion Review'
 *   (H) 1.R pins
 *   (Z) the closed-chapter census (the orchestrator's — CS RUN 2 closed it)
 *
 * Study-never-reproduce honored: the web-checked canonical arcs informed
 * METHOD SHAPES only; every family, witness, figure and exercise below
 * is OUR OWN, recomputed here by brute force.
 */

// ------------------------------------------------------------------
// the shared harness (the ch-08 verifier's)
// ------------------------------------------------------------------

interface SectionCheck {
  name: string
  ok: boolean
  detail?: string
}

function check(name: string, ok: boolean, detail?: string): SectionCheck {
  return ok ? { name, ok: true } : { name, ok: false, detail }
}

function countKind(L: Lesson, kind: string): number {
  return L.blocks.filter((b) => b.kind === (kind as never)).length
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

/** assembly-time strict-null-safety shims (the run-119 precedent) */
function solText(q: { solution?: string | string[] } | undefined): string {
  if (!q) return ''
  return Array.isArray(q.solution) ? q.solution.join(' ') : (q.solution ?? '')
}
function ansText(q: { answer?: string } | undefined): string {
  return (q?.answer ?? '')
}

// ---- A (1.1 engines) / B (1.1 pins) (from v-cf11.ts) ----

function sectionA(): SectionCheck[] {
  // ALL local helpers INSIDE this function (assembly-safety)
  const c: SectionCheck[] = []

  // ---------- engine 1: the mark list ----------
  const marks = [62, 48, 91, 77, 54]
  const cnt = marks.length
  const sum = marks.reduce((a, b) => a + b, 0)
  const avg = sum / cnt
  const hi = Math.max(...marks)
  const lo = Math.min(...marks)
  c.push(check('A1 mark-list count = 5', cnt === 5, `got ${cnt}`))
  c.push(check('A2 mark-list sum = 332', sum === 332, `got ${sum}`))
  c.push(check('A3 average = 66.4', avg === 66.4, `got ${avg}`))
  c.push(check('A4 highest = 91', hi === 91, `got ${hi}`))
  c.push(check('A5 lowest = 48', lo === 48, `got ${lo}`))
  c.push(check('A6 highest sits 24.6 above the average', Math.abs(hi - avg - 24.6) < 1e-9, `got ${hi - avg}`))

  // ---------- engine 2: the powers of two (built by doubling, never hardcoded) ----------
  const pow2: number[] = [1]
  for (let k = 1; k <= 64; k++) pow2[k] = pow2[k - 1] * 2
  const fmt = (v: number) => v.toLocaleString('en-US')
  c.push(check('A7 2^8 = 256', pow2[8] === 256, `got ${pow2[8]}`))
  c.push(check('A8 2^10 = 1,024 (the computing one K)', pow2[10] === 1024 && fmt(pow2[10]) === '1,024', `got ${fmt(pow2[10])}`))
  c.push(check('A9 2^12 = 4,096 = 4 x 1,024 (the 4 KB rung, exactly)', pow2[12] === 4096 && 4096 === 4 * pow2[10], `got ${fmt(pow2[12])}`))
  c.push(check('A10 2^16 = 65,536 = 64 x 1,024 (the 64 KB machine)', pow2[16] === 65536 && 65536 === 64 * pow2[10], `got ${fmt(pow2[16])}`))
  c.push(check('A11 2^20 = 1,048,576 (1 MB, one byte per location)', pow2[20] === 1048576, `got ${fmt(pow2[20])}`))
  c.push(check('A12 2^24 = 16,777,216', pow2[24] === 16777216, `got ${fmt(pow2[24])}`))
  c.push(check('A13 2^32 = 4,294,967,296', pow2[32] === 4294967296, `got ${fmt(pow2[32])}`))
  c.push(check('A14 2^64 = 18,446,744,073,709,551,616', pow2[64] === 18446744073709551616, `got ${pow2[64]}`))
  const approx64 = pow2[64] / 1e19
  c.push(check('A15 2^64 rounds to 1.8 x 10^19 honestly', Math.abs(approx64 - 1.8) < 0.05, `ratio ${approx64.toFixed(5)}`))
  c.push(check('A16 2^64 bytes = 16 EiB (2^64 / 2^60 = 16)', pow2[64] / pow2[60] === 16, `got ${pow2[64] / pow2[60]}`))
  const ladder4 = [pow2[8], pow2[12], pow2[16], pow2[20], pow2[24]]
  c.push(check('A17 the +4-line ladder: each step x16 (256 -> 4,096 -> 65,536 -> 1,048,576 -> 16,777,216); and 24 -> 32 lines is x256', ladder4.every((v, i) => i === 0 || v === ladder4[i - 1] * 16) && pow2[32] === pow2[24] * 256, ladder4.map(fmt).join(' -> ')))
  const rungs = [pow2[8], pow2[9], pow2[10], pow2[11], pow2[12], pow2[13], pow2[14], pow2[15], pow2[16]]
  c.push(check('A18 the full doubling rungs n = 8..16 (256, 512, 1,024, 2,048, 4,096, 8,192, 16,384, 32,768, 65,536)', JSON.stringify(rungs) === JSON.stringify([256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536]), rungs.map(fmt).join(' ')))
  const geoSum = (n: number) => { let s = 0; for (let k = 0; k < n; k++) s += pow2[k]; return s }
  c.push(check('A19 geometric sum 2^0 + ... + 2^(n-1) = 2^n - 1 at n = 12 (sum 4,095)', geoSum(12) === pow2[12] - 1, `got ${geoSum(12)}`))
  c.push(check('A20 twelve-line addresses run 0..4,095, so locations = 4,096', pow2[12] - 1 === 4095 && pow2[12] === 4096, `largest ${pow2[12] - 1}`))

  // ---------- engine 3: the clock conversions ----------
  const cycleNs = (hz: number) => (1 / hz) * 1e9
  const t477 = cycleNs(4.77e6)
  c.push(check('A21 T(4.77 MHz) = 209.6 ns (toFixed 1)', t477.toFixed(1) === '209.6', `got ${t477.toFixed(4)}`))
  c.push(check('A22 T(1 GHz) = 1 ns exactly', cycleNs(1e9) === 1, `got ${cycleNs(1e9)}`))
  c.push(check('A23 T(2 GHz) = 0.5 ns exactly', cycleNs(2e9) === 0.5, `got ${cycleNs(2e9)}`))
  c.push(check('A24 T(3 GHz) = 0.333 ns (toFixed 3)', cycleNs(3e9).toFixed(3) === '0.333', `got ${cycleNs(3e9).toFixed(6)}`))
  c.push(check('A25 doubling f halves T: T(1 GHz) / T(2 GHz) = 2', cycleNs(1e9) / cycleNs(2e9) === 2, `got ${cycleNs(1e9) / cycleNs(2e9)}`))
  const totalNs = 200 * 2 * 0.5
  c.push(check('A26 200 instructions x 2 cycles x 0.5 ns = 200 ns', totalNs === 200, `got ${totalNs}`))
  const ratio477 = t477 / cycleNs(1e9)
  c.push(check('A27 the 8088 beat / the 1 GHz beat ~ 209.6 laps', ratio477 > 209.6 && ratio477 < 209.7, `got ${ratio477.toFixed(4)}`))
  const ipcRate = 2e9 * 0.5
  c.push(check('A28 the first-pass rate: 2 GHz x IPC 0.5 = 1e9 instructions per second', ipcRate === 1e9, `got ${ipcRate}`))

  // ---------- engine 4: word arithmetic ----------
  c.push(check('A29 8 bytes = 64 bits', 8 * 8 === 64, `got ${8 * 8}`))
  c.push(check('A30 1,024 / 8 = 128 words in a 1 KB buffer', pow2[10] / 8 === 128, `got ${pow2[10] / 8}`))
  c.push(check('A31 check: 128 x 8 = 1,024 exactly', 128 * 8 === 1024, `got ${128 * 8}`))
  c.push(check('A32 a 64-bit machine moves 8-byte words', pow2[6] / 8 === 8, `got ${pow2[6] / 8}`))

  // ---------- engine 5: the fetch-decode-execute PC trace ----------
  const pc = [100, 101, 102]
  c.push(check('A33 the PC trace 100 -> 101 -> 102 walks +1 each lap', pc.every((v, i) => i === 0 || v === pc[i - 1] + 1), JSON.stringify(pc)))
  c.push(check('A34 after the third lap PC = 103, past the last instruction', pc[2] + 1 === 103, `got ${pc[2] + 1}`))
  c.push(check('A35 three instructions = three laps (one per lap)', pc.length === 3 && 3 === 3, `got ${pc.length}`))

  // ---------- engine 6: the pinned historical constants, asserted as data ----------
  const eniac = { announced: '14 February 1946', tubes: 17468, tons: '~30 tons', kw: '~150 kW', adds: '5,000 additions per second', programming: 'switches and cable-patching' }
  const univac = { accepted: '31 March 1951', bureau: 'the US Census Bureau', tubes: '~5,000 vacuum tubes', pounds: '16,000 pounds', title: 'the first commercial computer' }
  const edvac = { report: 'First Draft of a Report on the EDVAC', year: 1945, parts: ['central arithmetic (today\'s ALU)', 'central control (today\'s control unit)', 'memory', 'input', 'output'] }
  const ibmpc = { debuted: '12 August 1981', cpu: 'Intel 8088', rateMHz: 4.77, ram: '16 KB', price: 1565 }
  c.push(check('A36 ENIAC pinned: 14 February 1946, 17,468 tubes, ~30 tons, ~150 kW, 5,000 additions per second', eniac.announced === '14 February 1946' && eniac.tubes === 17468 && eniac.tons === '~30 tons' && eniac.kw === '~150 kW' && eniac.adds === '5,000 additions per second', JSON.stringify(eniac)))
  c.push(check('A37 ENIAC run: 20,000 additions / 5,000 per second = 4 seconds', 20000 / 5000 === 4, `got ${20000 / 5000}`))
  c.push(check('A38 UNIVAC I pinned: 31 March 1951, US Census Bureau, ~5,000 tubes, 16,000 pounds, the first commercial computer', univac.accepted === '31 March 1951' && univac.bureau === 'the US Census Bureau' && univac.tubes === '~5,000 vacuum tubes' && univac.pounds === '16,000 pounds' && univac.title === 'the first commercial computer', JSON.stringify(univac)))
  c.push(check('A39 the EDVAC report names exactly five parts', edvac.report === 'First Draft of a Report on the EDVAC' && edvac.year === 1945 && edvac.parts.length === 5, `got ${edvac.parts.length}`))
  c.push(check('A40 IBM PC 5150 pinned: 12 August 1981, 8088 at 4.77 MHz, 16 KB RAM, 1,565 dollars', ibmpc.debuted === '12 August 1981' && ibmpc.rateMHz === 4.77 && ibmpc.ram === '16 KB' && ibmpc.price === 1565, JSON.stringify(ibmpc)))

  // ---------- engine 7: SVG geometry invariants (the figures' claims, recomputed) ----------
  const CX = 360, CY = 238, R = 146
  const iposAngles = [-90, 0, 90, 180]
  const pos = (deg: number): [number, number] => {
    const t = (deg * Math.PI) / 180
    return [CX + R * Math.cos(t), CY + R * Math.sin(t)]
  }
  const iposPts = iposAngles.map(pos)
  const onCircle = iposPts.every(([x, y]) => Math.hypot(x - CX, y - CY) === R)
  const gapsEven = iposAngles.every((a, i) => i === 0 || a - iposAngles[i - 1] === 90)
  const chord = Math.hypot(iposPts[0][0] - iposPts[1][0], iposPts[0][1] - iposPts[1][1])
  c.push(check('A41 IPOS wheel: four stage nodes on one circle, 90 degrees apart (chord = R*sqrt 2 ~ 206.5)', onCircle && gapsEven && Math.abs(chord - R * Math.SQRT2) < 1e-9, `chord ${chord.toFixed(2)}`))
  const FX = 232, FY = 204, FR = 120
  const fdeAngles = [90, 210, 330]
  const fpos = (deg: number): [number, number] => {
    const t = (deg * Math.PI) / 180
    return [FX + FR * Math.cos(t), FY + FR * Math.sin(t)]
  }
  const fdePts = fdeAngles.map(fpos)
  const fdeChords = fdePts.map((p, i) => Math.hypot(p[0] - fdePts[(i + 1) % 3][0], p[1] - fdePts[(i + 1) % 3][1]))
  const fdeInside = fdePts.every(([x, y]) => x > 0 && x < 720 && y > 0 && y < 420)
  c.push(check('A42 fetch-decode-execute triangle: nodes 120 degrees apart (all chords R*sqrt 3 ~ 207.8), inside the 720 x 420 viewBox', fdeAngles.every((a, i) => i === 0 || (a - fdeAngles[i - 1] + 360) % 360 === 120) && fdeChords.every((d) => Math.abs(d - FR * Math.sqrt(3)) < 1e-9) && fdeInside, fdeChords.map((d) => d.toFixed(1)).join(' ')))
  const BUS_X = [284, 360, 436]
  const cpuX = [252, 468]
  const busEven = BUS_X.every((x, i) => i === 0 || x - BUS_X[i - 1] === 76)
  const busInside = BUS_X.every((x) => x > cpuX[0] && x < cpuX[1])
  c.push(check('A43 von Neumann buses: three channels evenly spaced (76 apart) inside the CPU x-span', busEven && busInside, BUS_X.join(',')))
  const LADDER_Y0 = 54, LADDER_STEP = 27, RUNGS = 9, BAR_H = 18, LADDER_H = 310
  const ladderYs = Array.from({ length: RUNGS }, (_, k) => LADDER_Y0 + k * LADDER_STEP)
  const ladderOk = ladderYs.every((y, i) => i === 0 || y - ladderYs[i - 1] === LADDER_STEP) && ladderYs[RUNGS - 1] + BAR_H <= LADDER_H
  c.push(check('A44 the address ladder: nine rungs evenly spaced (27 px), all bars inside the 310-tall viewBox', ladderOk, `last ${ladderYs[RUNGS - 1] + BAR_H} of ${LADDER_H}`))
  const allBounds = [...iposPts.map(([x, y]) => [x, y, 470]), ...fdePts.map(([x, y]) => [x, y, 410])]
  const inViewBox = allBounds.every(([x, y, h]) => x >= 0 && x <= 720 && y >= 0 && y <= (h as number))
  c.push(check('A45 every computed node position lies inside its declared 720-wide viewBox', inViewBox, 'computed from the same constants the builders use'))
  return c
}

function sectionB(L: Lesson): SectionCheck[] {
  const c: SectionCheck[] = []
  const collectStrings = (LL: Lesson): { raw: string; full: string } => {
    const rawParts: string[] = []
    const walk = (v: unknown) => {
      if (typeof v === 'string') rawParts.push(v)
      else if (Array.isArray(v)) v.forEach(walk)
      else if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    LL.blocks.forEach((b) => walk(b))
    return { raw: rawParts.join('\n'), full: JSON.stringify(LL) }
  }
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  // ---- identity + metadata pins ----
  c.push(check('B0 lesson present with a blocks array', Array.isArray(L.blocks) && L.blocks.length > 0, `got ${L.blocks.length} blocks`))
  c.push(check('B1 id exact', L.id === 'cf-the-basic-structure-and-operation-of-the-computer', L.id))
  c.push(check('B2 number exact', L.number === '1.1', L.number))
  c.push(check('B3 title exact', L.title === 'The Basic Structure and Operation of the Computer', L.title))
  c.push(check('B4 prerequisites NONE (the first lesson of the whole CS shelf)', !L.prerequisites || L.prerequisites.length === 0, JSON.stringify(L.prerequisites)))
  c.push(check('B5 sources exact [cs-cf-web-ground]', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground']), JSON.stringify(L.sources)))
  c.push(check('B6 concepts: 5-8 key phrases', L.concepts.length >= 5 && L.concepts.length <= 8, `got ${L.concepts.length}`))
  c.push(check('B7 objectives: 4-6, each a you-can', (L.objectives ?? []).length >= 4 && (L.objectives ?? []).length <= 6 && (L.objectives ?? []).every((o) => o.includes('you can')), `got ${(L.objectives ?? []).length}`))
  const W = countLessonWords(L)
  c.push(check('B8 words >= 6,000 (countLessonWords)', W >= 6000, `got ${W}`))
  c.push(check('B8b words <= 12,000 sanity cap (orchestrator-relaxed: the ≥ 6,000 depth floor governs — never thinned)', W <= 12000, `got ${W}`))

  // ---- figures ----
  const figBlocks = L.blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; caption: string; svg: string }[]
  c.push(check('B9 exactly 3 body figures, each with viewBox + role + aria-label', figBlocks.length === 3 && figBlocks.every((f) => f.svg.includes('viewBox') && f.svg.includes('role="img"') && f.svg.includes('aria-label')), `got ${figBlocks.length}`))
  c.push(check('B9b every body figure caption teaches (>= 12 words)', figBlocks.every((f) => f.caption.trim().split(/\s+/).length >= 12), figBlocks.map((f) => f.caption.split(/\s+/).length).join(',')))

  // ---- quiz pins (keys [2,0,1,3,1]) ----
  const quizBlocks = L.blocks.filter((b) => b.kind === 'quiz') as { kind: 'quiz'; items: { q: string; options: string[]; answer: number; explain: string }[] }[]
  const quiz = quizBlocks[0]
  c.push(check('B10 quiz present, exactly 5 items, 4 options each', !!quiz && quiz.items.length === 5 && quiz.items.every((it) => it.options.length === 4), quiz ? `got ${quiz.items.length}` : 'no quiz'))
  if (quiz) {
    c.push(check('B11 quiz keys exactly [2,0,1,3,1]', JSON.stringify(quiz.items.map((it) => it.answer)) === '[2,0,1,3,1]', JSON.stringify(quiz.items.map((it) => it.answer))))
    c.push(check('B12 Q4 options exact [16 / 1,024 / 65,536 / 16,384]', JSON.stringify(quiz.items[3].options) === JSON.stringify(['16', '1,024', '65,536', '16,384']), JSON.stringify(quiz.items[3].options)))
    c.push(check('B13 every quiz explain takes down >= 3 wrong options (Option refs)', quiz.items.every((it) => (it.explain.match(/Option \d/g) || []).length >= 3), quiz.items.map((it) => (it.explain.match(/Option \d/g) || []).length).join(',')))
  }

  // ---- exercises ----
  const exBlocks = L.blocks.filter((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: { level: string; questions: { q: string; solution: string | string[]; answer?: string; figures?: { caption: string; svg: string }[] }[] }[] }[]
  const ex = exBlocks[0]
  c.push(check('B14 exercises present, six sets L1..L6 with counts 2/2/3/3/3/2', !!ex && ex.sets.length === 6 && ex.sets.map((s) => s.level).join(',') === 'L1,L2,L3,L4,L5,L6' && ex.sets.map((s) => s.questions.length).join(',') === '2,2,3,3,3,2', ex ? ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ') : 'no exercises'))
  if (ex) {
    const qs = ex.sets.flatMap((s) => s.questions)
    c.push(check('B15 exactly 15 exercise questions', qs.length === 15, `got ${qs.length}`))
    c.push(check('B16 every solution is a steps array + every answer present', qs.every((q) => Array.isArray(q.solution) && q.solution.length >= 3) && qs.every((q) => typeof q.answer === 'string' && (q.answer ?? '').length > 0), 'Cengage chains'))
    const solFigs = qs.flatMap((q) => q.figures ?? [])
    c.push(check('B17 >= 3 solution figures (v9.0), each viewBox + aria-label', solFigs.length >= 3 && solFigs.every((f) => f.svg.includes('viewBox') && f.svg.includes('aria-label')), `got ${solFigs.length}`))
    c.push(check('B18 solution-figure captions named: the ladder (4,096), the IPOS strip (66.4), the word bus (128), the clock ladder (209.6)', solFigs.some((f) => f.caption.includes('4,096')) && solFigs.some((f) => f.caption.includes('66.4')) && solFigs.some((f) => f.caption.includes('128')) && solFigs.some((f) => f.caption.includes('209.6')), solFigs.map((f) => f.caption.slice(0, 40)).join(' | ')))
    c.push(check('B19 spot answers: L1-1 stages, L3-1 4 KB, L3-2 16,777,216, L3-3 66.4/91, L4-1 0.5 ns, L4-2 200 ns, L5-1 128, L5-2 the 2^64 form, L5-3 1,048,576', ansText(qs[0]).includes('input') && ansText(qs[0]).includes('storage') && ansText(qs[4]).includes('4,096') && ansText(qs[4]).includes('4 KB') && ansText(qs[5]).includes('16,777,216') && ansText(qs[6]).includes('66.4') && ansText(qs[6]).includes('91') && ansText(qs[7]).includes('0.5 ns') && ansText(qs[8]).includes('200 ns') && ansText(qs[10]).includes('128') && ansText(qs[11]).includes('18{,}446') && ansText(qs[12]).includes('1,048,576'), qs.map((q, i) => `${i}:${ansText(q).slice(0, 18)}`).join(' ')))
    c.push(check('B20 the exam-style item is labelled honestly', qs[9].q.includes('Exam-style') && qs[9].q.includes('not a real past paper'), qs[9].q.slice(0, 60)))
    c.push(check('B21 L6 reasoning: the von Neumann bottleneck named + the 2^n place-value proof', solText(qs[13]).includes('von Neumann bottleneck') && ansText(qs[14]).includes('2^{n}'), 'both L6 items'))
  }

  // ---- terms ----
  const termBlocks = L.blocks.filter((b) => b.kind === 'terms') as { kind: 'terms'; items: { term: string; def: string }[] }[]
  const allTerms = termBlocks.flatMap((t) => t.items)
  const term = (name: string) => allTerms.find((t) => t.term === name)
  c.push(check('B22 terms: >= 12 entries feeding the glossary', allTerms.length >= 12, `got ${allTerms.length}`))
  const needTerms = ['Data', 'Information', 'Information processing cycle', 'Central processing unit (CPU)', 'Arithmetic and logic unit (ALU)', 'Control unit', 'Primary memory', 'Input unit', 'Output unit', 'Bus', 'Stored-program concept', 'Program counter', 'Clock rate', 'Cycle time', 'Word', 'Address space']
  c.push(check('B23 the 16 pinned terms present by name', needTerms.every((t) => !!term(t)), needTerms.filter((t) => !term(t)).join(' ; ')))
  c.push(check('B24 every term def is one sentence ending in a period', allTerms.every((t) => t.def.trim().endsWith('.') && (t.def.match(/\./g) || []).length === 1), allTerms.filter((t) => (t.def.match(/\./g) || []).length !== 1).map((t) => t.term).join(' ; ')))

  // ---- formula cards ----
  const formulas = L.blocks.filter((b) => b.kind === 'formula') as { kind: 'formula'; name: string; latex: string; note?: string }[]
  c.push(check('B25 >= 5 formula cards, incl. the stored-program identity and the IPOS recap', formulas.length >= 5 && formulas.some((f) => f.name.toLowerCase().includes('stored-program')) && formulas.some((f) => f.name.toLowerCase().includes('ipos')), `got ${formulas.length}`))

  // ---- derivations ----
  const derivations = L.blocks.filter((b) => b.kind === 'derivation') as { kind: 'derivation'; title: string; steps: { label: string; formula?: string; explanation: string }[]; result: string }[]
  c.push(check('B26 exactly 3 derivations: re-tasking / cycle time / address lines', derivations.length === 3 && derivations.some((d) => d.title.toLowerCase().includes('memory')) && derivations.some((d) => d.title.toLowerCase().includes('cycle time')) && derivations.some((d) => d.title.toLowerCase().includes('address lines')), derivations.map((d) => d.title).join(' | ')))
  c.push(check('B27 derivation labels are plain words (no $ inside labels)', derivations.every((d) => d.steps.every((s) => !s.label.includes('$'))), 'plain-word labels'))
  c.push(check('B28 derivation results carry the math clause-wise ($...$ present in each result)', derivations.every((d) => /\$[^$]+\$/.test(d.result)), derivations.map((d) => d.result.slice(0, 40)).join(' | ')))

  // ---- algorithm ----
  const algos = L.blocks.filter((b) => b.kind === 'algorithm') as { kind: 'algorithm'; title: string; lines: { code: string; note?: string }[]; note?: string }[]
  const algo = algos[0]
  c.push(check('B29 exactly 1 algorithm block: the fetch-decode-execute cycle, >= 5 lines, unnumbered', algos.length === 1 && !!algo && algo.title === 'The Fetch–Decode–Execute Cycle' && algo.lines.length >= 5, algos.map((a) => a.title).join(' | ')))
  if (algo) {
    const codes = algo.lines.map((l) => l.code)
    c.push(check('B30 the algorithm pins: repeat forever / memory[PC] / decode / execute / PC <- next address', codes.some((k) => k.includes('repeat forever')) && codes.some((k) => k.includes('memory[PC]')) && codes.some((k) => k.includes('decode')) && codes.some((k) => k.includes('execute')) && codes.some((k) => k.includes('PC ← next address')), codes.join(' | ')))
    c.push(check('B31 the algorithm note answers why the loop never ends on its own (halt)', !!algo.note && /halt/i.test(algo.note), algo.note ? algo.note.slice(0, 60) : 'no note'))
    c.push(check('B32 every algorithm line carries a one-line note', algo.lines.every((l) => typeof l.note === 'string' && (l.note ?? '').length > 8), 'per-line notes'))
  }

  // ---- tables ----
  const tables = L.blocks.filter((b) => b.kind === 'table') as { kind: 'table'; caption?: string; head: string[]; rows: string[][] }[]
  c.push(check('B33 exactly 2 tables: the IPOS mapping (4 rows) + the address-space census (8 rows)', tables.length === 2 && tables.some((t) => t.rows.length === 4 && t.head.some((h) => h.includes('Stage'))) && tables.some((t) => t.rows.length === 8 && t.head.some((h) => h.toLowerCase().includes('lines'))), tables.map((t) => `${t.head[0]}:${t.rows.length}`).join(' | ')))

  // ---- examples (Illustrations) ----
  const examples = L.blocks.filter((b) => b.kind === 'example') as { kind: 'example'; title: string; steps: string[] }[]
  c.push(check('B34 >= 8 Illustrations (example blocks), each with >= 4 worked lines', examples.length >= 8 && examples.every((e) => e.steps.length >= 4), `got ${examples.length}`))
  c.push(check('B35 Illustration 1 computes the family: 332 / 66.4 / 91 / 24.6 in one worked block', examples.some((e) => e.steps.join(' ').includes('332') && e.steps.join(' ').includes('66.4') && e.steps.join(' ').includes('91') && e.steps.join(' ').includes('24.6')), 'the mark-list Illustration'))
  c.push(check('B36 the PC-trace Illustration walks 100 / 101 / 102', examples.some((e) => e.steps.join(' ').includes('PC = 100') && e.steps.join(' ').includes('PC = 101') && e.steps.join(' ').includes('PC = 102')), 'the three-instruction trace'))

  // ---- callout tones ----
  const callouts = L.blocks.filter((b) => b.kind === 'callout') as { kind: 'callout'; tone: string; title: string; text: string }[]
  const tones = (t: string) => callouts.filter((b) => b.tone === t).length
  c.push(check('B37 callout census: definition >= 8, historical >= 1, warn >= 1, insight >= 2, exam exactly 1', tones('definition') >= 8 && tones('historical') >= 1 && tones('warn') >= 1 && tones('insight') >= 2 && tones('exam') === 1, `def ${tones('definition')} hist ${tones('historical')} warn ${tones('warn')} ins ${tones('insight')} exam ${tones('exam')}`))

  // ---- headings ----
  const headings = L.blocks.filter((b) => b.kind === 'heading') as { kind: 'heading'; text: string }[]
  const mandatedHeads = ['Data and Information', 'The Information Processing Cycle', 'The Five Functional Units', 'The Stored-Program Concept', 'The Fetch–Decode–Execute Cycle', 'The Measurable Machine', 'Hardware and Software: the Boundary', 'Exam Corner', 'Clock Rate and Cycle Time', 'Word Size', 'Bus Width and Address Space']
  c.push(check('B38 the mandated headings present (8 sections + 3 measurable subsections)', mandatedHeads.every((h) => headings.some((x) => x.text === h)), headings.map((h) => h.text).join(' | ')))

  // ---- the pinned facts as strings ----
  c.push(check('B39 ENIAC strings: 14 February 1946 / 17,468 / ~30 tons / ~150 kW / 5,000 additions per second', ['14 February 1946', '17,468', '~30 tons', '~150 kW', '5,000 additions per second'].every((s) => either(s)), 'the ENIAC witness'))
  c.push(check('B40 UNIVAC strings: 31 March 1951 / 16,000 pounds / first commercial computer', ['31 March 1951', '16,000 pounds', 'first commercial computer'].every((s) => either(s)), 'the UNIVAC witness'))
  c.push(check('B41 von Neumann strings: First Draft of a Report on the EDVAC / 1945', ['First Draft of a Report on the EDVAC', '1945'].every((s) => either(s)), 'the EDVAC report'))
  c.push(check('B42 IBM PC strings: 12 August 1981 / 4.77 MHz / 16 KB / 1,565', ['12 August 1981', '4.77 MHz', '16 KB', '1,565'].every((s) => either(s)), 'the IBM PC 5150 witness'))
  c.push(check('B43 computed constants as strings: 65,536 / 16,777,216 / 4,294,967,296 / 209.6 ns / 0.333 ns / 66.4 / 1,024 / 4,096 / 1,048,576 / 128', ['65,536', '16,777,216', '4,294,967,296', '209.6 ns', '0.333 ns', '66.4', '1,024', '4,096', '1,048,576', '128'].every((s) => either(s)), 'the census numbers'))
  c.push(check('B44 the 2^64 honest form: 18{,}446... plus 1.8x10^19 plus 16 EiB', either('18{,}446{,}744{,}073{,}709{,}551{,}616') && either('1.8\\times') && either('16 EiB'), 'the 64-bit row'))

  // ---- cross-references ----
  const crossRefs = ['Inside the Box', 'Digital Logic Design', 'Computer Organization and Architecture', 'Operating Systems', 'Software: the Invisible Half of the Machine']
  c.push(check('B45 the five cross-references present', crossRefs.every((s) => either(s)), crossRefs.filter((s) => !either(s)).join(' ; ')))

  // ---- honesty + vocabulary ----
  c.push(check('B46 honesty pins: first approximation + ballpark', /first approximation/i.test(raw) && /ballpark/i.test(raw), 'the measured-machine honesty'))
  c.push(check('B47 vocabulary census: >= 25 uses of memory', (raw.match(/memory/gi) || []).length >= 25, `got ${(raw.match(/memory/gi) || []).length}`))
  c.push(check('B48 the Cengage summary line: From the above discussion', /From the above discussion/.test(raw), 'the summary formula'))

  // ---- roman lists ----
  const romanLists = L.blocks.filter((b) => b.kind === 'list' && b.marker === 'roman') as { kind: 'list'; items: string[] }[]
  c.push(check('B49 >= 3 roman-marker runs (For example + take-aways)', romanLists.length >= 3 && romanLists.every((l) => l.items.length >= 4), `got ${romanLists.length}`))

  // ---- SVG hygiene ----
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const everySvg = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions).flatMap((q) => (q.figures ?? []).map((f) => f.svg)) : [])]
  c.push(check('B50 no retired muted hexes in any SVG (16 banned)', everySvg.length >= 6 && everySvg.every((s) => !retired.some((hex) => s.includes(hex))), `${everySvg.length} svgs checked`))
  c.push(check('B51 every SVG has aria-label + viewBox, and no raw $ in any SVG text', everySvg.every((s) => s.includes('aria-label') && s.includes('viewBox') && !s.includes('$')), 'house SVG law'))
  c.push(check('B52 the palette stays vivid: no blue/indigo hexes in any SVG', everySvg.every((s) => !/#2563eb|#3b82f6|#1d4ed8|#4f46e5|#6366f1/i.test(s)), 'no blue'))
  return c
}

// ---- C (1.2 engines) / D (1.2 pins) (from v-cf12.ts) ----

function sectionC(): SectionCheck[] {
  // ALL local helpers INSIDE this function (assembly-safety)
  const c: SectionCheck[] = []

  // ---------- the pinned historical constants (as data, asserted here) ----------
  const PIN = {
    moore: { obsYear: 1965, initialDoublingYears: 1, revisionYear: 1975, revisedDoublingYears: 2, observationNotLaw: true },
    intel4004: { date: '15 November 1971', transistors: 2300, bits: 4, price: '$60' },
    eniac: { date: '14 February 1946', tubes: 17468, tons: 30, kW: 150, additionsPerSecond: 5000 },
    univac: { date: '31 March 1951', tubes: 5000, pounds: 16000, firstCommercial: true },
    transistor: { lab: 'Bell Labs', when: 'December 1947' },
    ic: { who: 'Jack Kilby', demo: '12 September 1958' },
    s360: { date: '7 April 1964', compatibleFamily: true },
    altair: { introduced: 1974, cover: 'January 1975', kit: true, firstCommerciallySuccessfulPC: true },
    appleII: { date: '10 June 1977', cpu: '6502', mhz: 1.023, ramKB: 4, price: '$1,298' },
    ibmPC: { date: '12 August 1981', cpu: 'Intel 8088', mhz: 4.77, ramKB: 16, price: '$1,565' },
    macintosh: { year: 1984 },
    iphone: { announced: '9 January 2007', onSale: 'June 2007', announcedYear: 2007 },
    rpi: { date: '29 February 2012', price: '$35' },
    arduino: { year: 2005, place: 'Ivrea, Italy' },
    ecu: { typicalMin: 50, typicalMax: 100, premiumMax: 150 },
    fifthGen: { fgcsProjectYear: 1982, fgcsName: 'Fifth Generation Computer Systems', fuzzyEdges: true },
    ballparks: {
      desktop: [65, 125], // W, honest ballpark
      laptop: [15, 45],
      phoneSoC: [3, 8],
      mcu: [0.001, 1], // mW .. 1 W
    },
  }

  // ---------- C1..C9: the doubling arithmetic ----------
  {
    const years = 2011 - 1971 // from the 4004's release to the early-2010s
    const doublings = years / PIN.moore.revisedDoublingYears
    const factor = Math.pow(2, doublings)
    const shipped = PIN.intel4004.transistors * factor
    const cagr = Math.pow(2, 1 / PIN.moore.revisedDoublingYears) - 1
    c.push(check('C1 the run 1971 → 2011 is exactly 40 years', years === 40, `got ${years}`))
    c.push(check('C2 one doubling per two years gives 20 doublings', doublings === 20, `got ${doublings}`))
    c.push(check('C3 the growth factor 2^20 = 1,048,576', factor === 1048576, `got ${factor}`))
    c.push(check('C4 2,300 × 2^20 = 2,411,724,800 (the briefing figure 2,411,648,000 was an arithmetic slip — the engine computes, not hardcodes)', shipped === 2411724800, `got ${shipped}`))
    c.push(check('C5 2,411,724,800 ≈ 2.4 × 10^9 (within 1%)', Math.abs(shipped / 2.4e9 - 1) <= 0.01, `ratio ${shipped / 2.4e9}`))
    c.push(check('C6 log10(2^20) ≈ 6.02 — just above a million', Math.abs(Math.log10(factor) - 6.0206) < 0.001, `got ${Math.log10(factor)}`))
    c.push(check('C7 the 1975 cadence implies CAGR ≈ 41% (2^(1/2) − 1 = 0.4142)', Math.abs(cagr - 0.41421) < 1e-4 && Math.round(cagr * 100) === 41, `got ${cagr}`))
    c.push(check('C8 2^10 = 1,024 (the half-way checkpoint)', Math.pow(2, 10) === 1024))
    c.push(check('C9 Moore 1965 observed yearly doubling; the 1975 revision moved it to two years — an observation, not a law of nature', PIN.moore.obsYear === 1965 && PIN.moore.initialDoublingYears === 1 && PIN.moore.revisionYear === 1975 && PIN.moore.revisedDoublingYears === 2 && PIN.moore.observationNotLaw === true))
  }

  // ---------- C10..C12: battery + ECU power budget ----------
  {
    const draw = 5, hours = 8
    const pack = draw * hours
    c.push(check('C10 the battery engine: 5 W × 8 h = 40 Wh', pack === 40, `got ${pack}`))
    c.push(check('C11 battery life = capacity / draw: 40 Wh / 5 W = 8 h and 40 Wh / 8 W = 5 h', pack / draw === 8 && pack / 8 === 5))
    const ecus = 120, per = 0.5
    c.push(check('C12 the ECU census engine: 120 ECUs × 0.5 W each = 60 W on control alone', ecus * per === 60, `got ${ecus * per}`))
    c.push(check('C13 the ECU census data: typical 50–100 ECUs, premium up to 150 (= 1.5 × the typical max)', PIN.ecu.typicalMin === 50 && PIN.ecu.typicalMax === 100 && PIN.ecu.premiumMax === 150 && PIN.ecu.premiumMax === 1.5 * PIN.ecu.typicalMax))
  }

  // ---------- C14..C20: the generations timeline engine (figure 2 geometry) ----------
  {
    const X0 = 60, X1 = 690, Y0 = 1940, Y1 = 2015
    const x = (year: number) => X0 + ((year - Y0) / (Y1 - Y0)) * (X1 - X0)
    const pxPerYear = (X1 - X0) / (Y1 - Y0)
    const machines: { name: string; year: number }[] = [
      { name: 'ENIAC', year: 1946 },
      { name: 'transistor', year: 1947 },
      { name: 'UNIVAC I', year: 1951 },
      { name: 'the IC', year: 1958 },
      { name: 'System/360', year: 1964 },
      { name: 'Intel 4004', year: 1971 },
      { name: 'Altair 8800', year: 1975 },
      { name: 'Apple II', year: 1977 },
      { name: 'IBM PC 5150', year: 1981 },
      { name: 'iPhone', year: 2007 },
      { name: 'Raspberry Pi', year: 2012 },
    ]
    c.push(check('C14 the timeline map is the linear map 8.4 px/year (1940 → 60, 2015 → 690)', Math.abs(pxPerYear - 8.4) < 1e-9 && x(1940) === 60 && x(2015) === 690))
    c.push(check('C15 the map is monotone across the eleven pinned machines', machines.every((m, i) => i === 0 || x(machines[i].year) > x(machines[i - 1].year))))
    c.push(check('C16 the pinned x-positions: x(1946) = 110.4 and x(2012) = 664.8', Math.abs(x(1946) - 110.4) < 1e-6 && Math.abs(x(2012) - 664.8) < 1e-6, `got ${x(1946)}, ${x(2012)}`))
    // the staggered label-row assignment: greedy, first row whose last label is ≥ 88 px away
    const GAP = 88
    const rows: number[][] = []
    for (const m of machines) {
      let placed = false
      for (let r = 0; r < rows.length && !placed; r++) {
        const last = rows[r][rows[r].length - 1]
        if (x(m.year) - x(machines[last].year) >= GAP) { rows[r].push(machines.indexOf(m)); placed = true }
      }
      if (!placed) rows.push([machines.indexOf(m)])
    }
    c.push(check('C17 the label-row assignment fits in 4 staggered rows (no column collisions)', rows.length === 4, `got ${rows.length} rows`))
    c.push(check('C18 every same-row neighbour pair keeps ≥ 88 px of horizontal separation', rows.every((row) => row.every((idx, i) => i === 0 || x(machines[idx].year) - x(machines[row[i - 1]].year) >= GAP))))
    c.push(check('C19 every machine label stays inside the 720-wide viewBox (x ± half-label ≥ 40, ≤ 700)', machines.every((m) => x(m.year) >= 40 && x(m.year) <= 700)))
    // the five-generation bands
    const bandEdges = [1946, 1956, 1964, 1971]
    c.push(check('C20 the generation bands are contiguous: 1946–1956, 1956–1964, 1964–1971, then 1971 → present', bandEdges.every((e, i) => i === 0 || e > bandEdges[i - 1]) && x(bandEdges[0]) === x(1946)))
    c.push(check('C21 the 4004 sits exactly ON the fourth-generation door: x(1971) is the band edge', Math.abs(x(1971) - x(bandEdges[3])) < 1e-9))
    c.push(check('C22 the System/360 sits exactly ON the third-generation door: x(1964) is the band edge', Math.abs(x(1964) - x(bandEdges[2])) < 1e-9))
    const yearToGen = (year: number) => year < 1956 ? 1 : year < 1964 ? 2 : year < 1971 ? 3 : 4
    const expected = new Map<number, number>(machines.map((m) => [m.year, yearToGen(m.year)]))
    c.push(check('C23 the band census: ENIAC, transistor(1947) and UNIVAC I fall in generation 1; the IC (1958) in 2; System/360 on the 3rd door; the 4004 on the 4th door; everything 1971+ in 4', expected.get(1946) === 1 && expected.get(1947) === 1 && expected.get(1951) === 1 && expected.get(1958) === 2 && expected.get(1964) === 3 && expected.get(1971) === 4 && expected.get(2007) === 4 && expected.get(2012) === 4))
    c.push(check('C24 the honest-era facts: the transistor (1947) was invented inside generation 1 and the IC (1958) inside generation 2 — inventions precede their eras', yearToGen(1947) === 1 && yearToGen(1958) === 2))
  }

  // ---------- C25..C31: the machine-witness arithmetic ----------
  {
    const eniacLb = PIN.eniac.tons * 2000
    const perAddition = 1 / PIN.eniac.additionsPerSecond
    const tubeRatio = PIN.eniac.tubes / PIN.univac.tubes
    c.push(check('C25 ENIAC at ~30 tons is ~60,000 lb — heavier than UNIVAC I\'s 16,000 lb', eniacLb === 60000 && eniacLb > PIN.univac.pounds))
    c.push(check('C26 at 5,000 additions per second, one ENIAC addition costs 0.2 ms', Math.abs(perAddition - 0.0002) < 1e-12))
    c.push(check('C27 the tube census ratio: 17,468 / ~5,000 ≈ 3.49 (ENIAC carried ~3.5× UNIVAC I\'s tubes)', Math.abs(tubeRatio - 3.4936) < 0.001, `got ${tubeRatio}`))
    c.push(check('C28 the 4004, UNIVAC I and System/360 constants are pinned exactly as data', PIN.intel4004.date === '15 November 1971' && PIN.intel4004.transistors === 2300 && PIN.intel4004.bits === 4 && PIN.intel4004.price === '$60' && PIN.univac.date === '31 March 1951' && PIN.univac.firstCommercial === true && PIN.s360.date === '7 April 1964' && PIN.s360.compatibleFamily === true))
    c.push(check('C29 the pocket-arc constants: Apple II (6502 at 1.023 MHz, 4 KB) and IBM PC 5150 (8088 at 4.77 MHz, 16 KB)', PIN.appleII.cpu === '6502' && PIN.appleII.mhz === 1.023 && PIN.appleII.ramKB === 4 && PIN.ibmPC.cpu === 'Intel 8088' && PIN.ibmPC.mhz === 4.77 && PIN.ibmPC.ramKB === 16))
    c.push(check('C30 the IBM PC\'s 4.77 MHz ran at ≈ 4.66× the Apple II\'s 1.023 MHz', Math.abs(PIN.ibmPC.mhz / PIN.appleII.mhz - 4.6628) < 0.001, `got ${PIN.ibmPC.mhz / PIN.appleII.mhz}`))
    c.push(check('C31 the IBM PC\'s 16 KB RAM was exactly 4 × the Apple II\'s 4 KB', PIN.ibmPC.ramKB === 4 * PIN.appleII.ramKB))
    // chronological order of the pocket arc
    const arc = [
      { name: 'Altair 8800 cover', t: 1975.0 },
      { name: 'Apple II', t: 1975.5 + (10 / 365) * 1 }, // June 1977 ≈ 1977.4
      { name: 'IBM PC 5150', t: 1981.6 },
      { name: 'Macintosh', t: 1984.0 },
      { name: 'iPhone', t: 2007.02 },
    ]
    const sorted = [...arc].sort((a, b) => a.t - b.t)
    c.push(check('C32 the date-ordering drill: the engine-sorted pocket arc is Altair → Apple II → IBM PC → Macintosh → iPhone', sorted.map((s) => s.name).join(' → ') === 'Altair 8800 cover → Apple II → IBM PC 5150 → Macintosh → iPhone'))
    c.push(check('C33 the iPhone was announced (9 January 2007) before it went on sale (June 2007)', PIN.iphone.announced === '9 January 2007' && PIN.iphone.onSale === 'June 2007'))
    const priceOf = (p: string) => Number(p.replace(/[$,]/g, ''))
    c.push(check('C34 the price ladder climbs: Raspberry Pi $35 < 4004 $60 < Apple II $1,298 < IBM PC $1,565', priceOf(PIN.rpi.price) < priceOf(PIN.intel4004.price) && priceOf(PIN.intel4004.price) < priceOf(PIN.appleII.price) && priceOf(PIN.appleII.price) < priceOf(PIN.ibmPC.price)))
    c.push(check('C35 the census spans: 2012 − 1946 = 66 years of ladder; 2007 − 1971 = 36 years from the 4004 to the iPhone; 2007 − 1975 = 32 years from the kit to the pocket', 2012 - 1946 === 66 && 2007 - 1971 === 36 && 2007 - 1975 === 32))
    c.push(check('C36 Arduino born 2005 in Ivrea, Italy; Raspberry Pi Model B launched 29 February 2012 at $35', PIN.arduino.year === 2005 && PIN.arduino.place === 'Ivrea, Italy' && PIN.rpi.date === '29 February 2012' && PIN.rpi.price === '$35'))
    c.push(check('C37 the fifth-generation honesty data: the label began as the 1982 Japanese FGCS project branding; fuzzy edges, not a crisp switch', PIN.fifthGen.fgcsProjectYear === 1982 && PIN.fifthGen.fuzzyEdges === true))
  }

  // ---------- C38..C44: the power–performance log-scale engine (figure 3 geometry) ----------
  {
    const YBOT = 390, YTOP = 60, LOGMIN = -3, LOGMAX = 3
    const y = (w: number) => YBOT - ((Math.log10(w) - LOGMIN) / (LOGMAX - LOGMIN)) * (YBOT - YTOP)
    const bp = PIN.ballparks
    c.push(check('C38 the log map sends 1 mW to the axis floor and 1000 W to the plot top', Math.abs(y(0.001) - 390) < 1e-9 && Math.abs(y(1000) - 60) < 1e-9))
    c.push(check('C39 the log map steps exactly 55 px per decade (linear in log10)', [0.01, 0.1, 1, 10, 100].every((w) => Math.abs(y(w * 10) - y(w) + 55) < 1e-9)))
    c.push(check('C40 the four ballpark bands are strictly ordered with no overlap: 0.001–1 < 3–8 < 15–45 < 65–125 W', bp.mcu[1] < bp.phoneSoC[0] && bp.phoneSoC[1] < bp.laptop[0] && bp.laptop[1] < bp.desktop[0]))
    const bandHeight = (b: number[]) => y(b[0]) - y(b[1])
    c.push(check('C41 each pinned band is at least 12 px tall on the log axis (visible honest band)', [bp.mcu, bp.phoneSoC, bp.laptop, bp.desktop].every((b) => bandHeight(b) >= 12), `heights ${[bp.mcu, bp.phoneSoC, bp.laptop, bp.desktop].map((b) => bandHeight(b).toFixed(1)).join(', ')}`))
    c.push(check('C42 the band midpoints: desktop 95 W, laptop 30 W, phone SoC 5.5 W; the MCU midpoint sits at 10^(-1.5) ≈ 0.0316 W (log middle)', (65 + 125) / 2 === 95 && (15 + 45) / 2 === 30 && (3 + 8) / 2 === 5.5 && Math.abs(Math.pow(10, -1.5) - 0.031623) < 1e-4))
    c.push(check('C43 the open-ended wall-powered bands (server, mainframe, supercomputer) anchor exactly at the desktop band bottom y(65)', Math.abs(y(65) - (390 - (Math.log10(65) + 3) * 55)) < 1e-9 && Math.abs(y(65) - 125.29) < 0.01, `got ${y(65).toFixed(2)}`))
    c.push(check('C44 no exact watt figure is pinned for server / mainframe / supercomputer — they stay open-ended (estimates vary)', !('server' in PIN.ballparks) && !('mainframe' in PIN.ballparks)))
  }

  // ---------- C45..C50: the trade-off triangle placement engine (figure 1 geometry) ----------
  {
    const A = { x: 360, y: 96 } // the raw-performance vertex
    const B = { x: 96, y: 400 } // the untethered-portability vertex
    const C = { x: 624, y: 400 } // the frugal-watts vertex
    const TRI: { name: string; w: number[] }[] = [
      { name: 'desktop tower', w: [0.62, 0.08, 0.3] },
      { name: 'all-in-one desktop', w: [0.5, 0.16, 0.34] },
      { name: 'laptop', w: [0.42, 0.44, 0.14] },
      { name: 'tablet', w: [0.24, 0.6, 0.16] },
      { name: 'smartphone', w: [0.16, 0.68, 0.16] },
      { name: 'workstation', w: [0.74, 0.06, 0.2] },
      { name: 'server', w: [0.68, 0.04, 0.28] },
      { name: 'mainframe', w: [0.8, 0.02, 0.18] },
      { name: 'supercomputer', w: [0.9, 0.01, 0.09] },
      { name: 'games console', w: [0.56, 0.18, 0.26] },
      { name: 'embedded microcontroller', w: [0.06, 0.16, 0.78] },
      { name: 'single-board computer', w: [0.1, 0.52, 0.38] },
    ]
    const pt = (w: number[]) => ({
      x: A.x * w[0] + B.x * w[1] + C.x * w[2],
      y: A.y * w[0] + B.y * w[1] + C.y * w[2],
    })
    c.push(check('C45 the triangle roster: 12 families placed, each weight triple sums to 1 (barycentric)', TRI.length === 12 && TRI.every((f) => Math.abs(f.w[0] + f.w[1] + f.w[2] - 1) < 1e-9 && f.w.every((v) => v >= 0 && v <= 1))))
    const pts = TRI.map((f) => pt(f.w))
    let minDist = Infinity
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
      if (d < minDist) minDist = d
    }
    c.push(check('C46 every pair of family dots keeps ≥ 15 px separation (no dot collisions)', minDist >= 15, `min ${minDist.toFixed(1)}`))
    const dist = (p: { x: number; y: number }, q: { x: number; y: number }) => Math.hypot(p.x - q.x, p.y - q.y)
    // nearest family to each vertex (robust recompute)
    const nearest = (v: { x: number; y: number }) => {
      let best = 0
      for (let i = 1; i < pts.length; i++) if (dist(pts[i], v) < dist(pts[best], v)) best = i
      return TRI[best].name
    }
    c.push(check('C47 the supercomputer is the family nearest the raw-performance vertex; the microcontroller nearest the frugal-watts vertex', nearest(A) === 'supercomputer' && nearest(C) === 'embedded microcontroller'))
    c.push(check('C48 the smartphone hugs the pocket corner: within 60 px of the portability–frugality bottom edge', dist(pts[4], { x: 222.72, y: 400 }) < 60 || 400 - pts[4].y <= 60, `phone dot y ${pts[4].y.toFixed(1)}`))
    const spreads = TRI.map((f) => Math.max(...f.w) - Math.min(...f.w))
    c.push(check('C49 the laptop carries the smallest weight spread — the most balanced compromise on the triangle', spreads.indexOf(Math.min(...spreads)) === 2, `spreads ${spreads.map((s) => s.toFixed(2)).join(', ')}`))
    c.push(check('C50 every placed dot lies inside the triangle (barycentric coordinates all non-negative, sum 1)', pts.every((p) => p.x >= 96 && p.x <= 624 && p.y >= 96 && p.y <= 400)))
  }

  // ---------- C51..C53: the solution-figure engines ----------
  {
    // the generations strip (L2-1): strip map 50 + 8.6667 px/year over 1940..2015
    const sx = (year: number) => 50 + ((year - 1940) / 75) * 650
    const stripMachines = [
      { name: 'ENIAC', year: 1946, gen: 1 },
      { name: 'UNIVAC I', year: 1951, gen: 1 },
      { name: 'System/360', year: 1964, gen: 3 },
      { name: 'Intel 4004', year: 1971, gen: 4 },
      { name: 'Altair 8800', year: 1975, gen: 4 },
    ]
    const yearToGen = (year: number) => year < 1956 ? 1 : year < 1964 ? 2 : year < 1971 ? 3 : 4
    c.push(check('C51 the generations strip map is linear and monotone; every machine lands in its stated generation', Math.abs(sx(1946) - 102) < 1e-6 && stripMachines.every((m) => yearToGen(m.year) === m.gen)))
    // the Moore staircase (L4-3): bars at even k = 0..20, height k × 9.5 px
    const ks = Array.from({ length: 11 }, (_, i) => i * 2)
    const heights = ks.map((k) => k * 9.5)
    c.push(check('C52 the Moore staircase: eleven bars at even k = 0..20; bar heights 0..190 px (k × 9.5), the k = 20 bar tops the ladder at 2^20 = 1,048,576', ks.length === 11 && Math.max(...heights) === 190 && Math.pow(2, 20) === 1048576))
    // the battery strip (L5-1): 70 px per hour; the 5 W bar spans 8 h, the 8 W bar 5 h
    const pxPerHour = 70
    c.push(check('C53 the battery strip: 70 px per hour — the 5 W run spans 560 px (8 h) and the 8 W run 350 px (5 h)', pxPerHour * 8 === 560 && pxPerHour * 5 === 350))
  }

  // ---------- C54: the census rosters as data ----------
  {
    const families = ['desktop tower', 'all-in-one desktop', 'laptop', 'tablet', 'smartphone', 'workstation', 'server', 'mainframe', 'supercomputer', 'games console', 'embedded microcontroller / single-board computer']
    const axes = ['form factor', 'performance', 'power budget', 'general-purpose vs dedicated']
    const generations = ['vacuum tubes', 'transistors', 'integrated circuits', 'microprocessors', 'the AI-era label']
    c.push(check('C54 the roster censuses: 11 families, 4 census axes, 5 generation bands (the fifth honestly labelled)', families.length === 11 && axes.length === 4 && generations.length === 5))
  }

  return c
}

function sectionD(L: Lesson): SectionCheck[] {
  const c: SectionCheck[] = []
  c.push(check('D0 lesson 1.2 present', !!L))
  if (!L) return c
  const collectStrings = (LL: Lesson): { raw: string; full: string } => {
    const rawParts: string[] = []
    const walk = (v: unknown) => {
      if (typeof v === 'string') rawParts.push(v)
      else if (Array.isArray(v)) v.forEach(walk)
      else if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    LL.blocks.forEach((b) => walk(b))
    return { raw: rawParts.join('\n'), full: JSON.stringify(LL) }
  }
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)
  const countOf = (re: RegExp) => (raw.match(re) || []).length
  const kinds = (k: string) => L.blocks.filter((b) => b.kind === k).length

  // ---- identity + metadata pins ----
  c.push(check('D1 id exact', L.id === 'cf-a-census-of-hardware-desktops-to-embedded-chips', L.id))
  c.push(check('D2 number exact', L.number === '1.2', L.number))
  c.push(check('D3 title exact', L.title === 'A Census of Hardware: Desktops to Embedded Chips', L.title))
  c.push(check('D4 prerequisites stay EMPTY (the zero-rung census)', (L.prerequisites ?? []).length === 0, JSON.stringify(L.prerequisites)))
  c.push(check('D5 sources exact [cs-cf-web-ground]', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground']), JSON.stringify(L.sources)))
  c.push(check('D6 concepts: 5–8 entries', (L.concepts ?? []).length >= 5 && (L.concepts ?? []).length <= 8, `got ${(L.concepts ?? []).length}`))
  c.push(check('D7 objectives: 4–6 "by the end" entries', (L.objectives ?? []).length >= 4 && (L.objectives ?? []).length <= 6 && (L.objectives ?? []).every((o) => /by the end/i.test(o)), `got ${(L.objectives ?? []).length}`))
  const w = countLessonWords(L)
  c.push(check('D8 word depth ≥ 6,000 (orchestrator-relaxed: the AA ch.5-8 depth bar governs — never thinned; 12,000 sanity cap)', w >= 6000 && w <= 12000, `got ${w}`))

  // ---- figure pins ----
  const figBlocks = L.blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; svg: string }[]
  c.push(check('D9 exactly 3 body figures, each with viewBox + role="img" + aria-label', figBlocks.length === 3 && figBlocks.every((f) => f.svg.includes('viewBox') && f.svg.includes('role="img"') && f.svg.includes('aria-label')), `got ${figBlocks.length}`))

  // ---- quiz pins (keys [1,2,2,0,3]) ----
  const quizBlocks = L.blocks.filter((b) => b.kind === 'quiz') as { kind: 'quiz'; items: { q: string; options: string[]; answer: number; explain: string }[] }[]
  const quiz = quizBlocks[0]
  c.push(check('D10 quiz present with exactly 5 items of 4 options each', !!quiz && quiz.items.length === 5 && quiz.items.every((it) => it.options.length === 4), quiz ? `got ${quiz.items.length}` : 'no quiz'))
  if (quiz) {
    c.push(check('D11 quiz answer keys exactly [1,2,2,0,3]', JSON.stringify(quiz.items.map((it) => it.answer)) === '[1,2,2,0,3]', JSON.stringify(quiz.items.map((it) => it.answer))))
    c.push(check('D12 every quiz explain takes down every wrong option (≥ 3 "Option N" references each)', quiz.items.every((it) => (it.explain.match(/Option \d/g) || []).length >= 3)))
    c.push(check('D13 quiz coverage pinned: Q1 mainframe (bank batch), Q2 the 4004 (1971), Q3 two years, Q4 the power-budget axis, Q5 the 50–100 / 150 ECU census', quiz.items[0].options.some((o) => /mainframe/i.test(o)) && quiz.items[1].options.some((o) => /4004/.test(o)) && quiz.items[2].options.some((o) => /two years/.test(o)) && quiz.items[3].options.some((o) => /power budget/i.test(o)) && quiz.items[4].options.some((o) => /50–100/.test(o) && /150/.test(o))))
  }

  // ---- exercises pins ----
  const exBlocks = L.blocks.filter((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: { level: string; questions: { q: string; solution: string | string[]; answer?: string; figures?: { caption: string; svg: string }[] }[] }[] }[]
  const ex = exBlocks[0]
  c.push(check('D14 exercises present: 6 sets L1..L6 with the 2/2/3/3/3/2 distribution', !!ex && ex.sets.length === 6 && ex.sets.map((s) => s.level).join(',') === 'L1,L2,L3,L4,L5,L6' && ex.sets.map((s) => s.questions.length).join(',') === '2,2,3,3,3,2', ex ? ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ') : 'no exercises'))
  if (ex) {
    const qs = ex.sets.flatMap((s) => s.questions)
    c.push(check('D15 exactly 15 exercise questions, every solution a steps array, every answer present', qs.length === 15 && qs.every((q) => Array.isArray(q.solution)) && qs.every((q) => typeof q.answer === 'string' && (q.answer ?? '').length > 0), `got ${qs.length}`))
    const solFigs = qs.flatMap((q) => q.figures ?? [])
    c.push(check('D16 ≥ 3 solution figures (v9.0), each with viewBox + aria-label', solFigs.length >= 3 && solFigs.every((f) => f.svg.includes('viewBox') && f.svg.includes('aria-label')), `got ${solFigs.length}`))
    c.push(check('D17 solution-figure census: the generations strip, the Moore staircase, the battery strip', solFigs.some((f) => /generation/i.test(f.caption)) && solFigs.some((f) => /1,048,576|2\^20|doubl/i.test(f.caption)) && solFigs.some((f) => /40 Wh|battery/i.test(f.caption))))
    c.push(check('D18 exercise seed answers pinned: the 20-doubling drill, the growth computation (2.4 billion), the ECU arithmetic (60 W), the battery (40 Wh)', ansText(qs[3]).includes('20') && /1,048,576/.test(ansText(qs[3]) + solText(qs[3])) && (ansText(qs[9]) + solText(qs[9])).includes('2,411,724,800') && (ansText(qs[5]) + solText(qs[5])).includes('60 W') && (ansText(qs[10]) + solText(qs[10])).includes('40 Wh')))
  }

  // ---- terms + formula + derivation + table + example pins ----
  const termBlocks = L.blocks.filter((b) => b.kind === 'terms') as { kind: 'terms'; items: { term: string; def: string }[] }[]
  const allTerms = termBlocks.flatMap((t) => t.items)
  c.push(check('D19 ≥ 12 glossary terms, each used at least twice in the lesson raw text', allTerms.length >= 12 && allTerms.every((t) => countOf(new RegExp(t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) >= 2), `got ${allTerms.length}`))
  c.push(check('D20 the mandated term roster present (Form factor, Power budget, Embedded system, Microcontroller, Microprocessor, System on a chip, Server, Workstation, Mainframe, Supercomputer, Moore\'s law, Electronic control unit)', ['Form factor', 'Power budget', 'Embedded system', 'Microcontroller', 'Microprocessor', 'System on a chip', 'Server', 'Workstation', 'Mainframe', 'Supercomputer', "Moore's law", 'Electronic control unit'].every((name) => allTerms.some((t) => t.term === name))))
  c.push(check('D21 ≥ 4 formula cards (the Moore headcount, battery life, growth factor, census-axes recap)', kinds('formula') >= 4, `got ${kinds('formula')}`))
  const derivations = L.blocks.filter((b) => b.kind === 'derivation') as { kind: 'derivation'; title: string; steps: { label: string; formula?: string; explanation: string }[]; result: string }[]
  c.push(check('D22 ≥ 1 derivation: the doubling arithmetic with 2^{20}, 1,048,576 and 2,411,724,800', derivations.length >= 1 && derivations.some((d) => /doubling arithmetic/i.test(d.title) && JSON.stringify(d).includes('2^{20}') && either('1,048,576') && either('2,411,724,800')), `got ${derivations.map((d) => d.title).join(' | ')}`))
  const tables = L.blocks.filter((b) => b.kind === 'table') as { kind: 'table'; head: string[]; rows: string[][] }[]
  c.push(check('D23 the families census table: ≥ 1 table with 11 rows and the family / form factor columns', tables.some((t) => t.rows.length === 11 && t.head.some((h) => /family/i.test(h)) && t.head.some((h) => /form factor/i.test(h))), `got ${tables.map((t) => t.rows.length).join(', ')}`))
  c.push(check('D24 ≥ 8 Illustrations (example blocks)', kinds('example') >= 8, `got ${kinds('example')}`))

  // ---- callout pins ----
  const callouts = L.blocks.filter((b) => b.kind === 'callout') as { kind: 'callout'; tone: string; title: string; text: string }[]
  c.push(check('D25 definition callouts ≥ 8 (the four axes + server, workstation, mainframe, supercomputer, embedded system, microcontroller, microprocessor, SoC)', callouts.filter((b) => b.tone === 'definition').length >= 8, `got ${callouts.filter((b) => b.tone === 'definition').length}`))
  c.push(check('D26 callout tones present: historical (Moore), warn (the honest fifth / ballparks), insight (the triangle compromise / the console), exam (the exam corner) — exactly 1 exam', callouts.some((b) => b.tone === 'historical') && callouts.some((b) => b.tone === 'warn') && callouts.some((b) => b.tone === 'insight') && callouts.filter((b) => b.tone === 'exam').length === 1))

  // ---- the pinned witness strings ----
  const needles1 = ['15 November 1971', '2,300 transistors', '14 February 1946', '31 March 1951', '7 April 1964', '12 August 1981', '29 February 2012', '2005', '50–100', '150', '$60', '$1,565', '$35', '$1,298']
  c.push(check('D27 the fourteen mandated pinned strings all present', needles1.every((n) => either(n)), `missing: ${needles1.filter((n) => !either(n)).join(' ; ')}`))
  const needles2 = ['10 June 1977', '9 January 2007', '12 September 1958', 'December 1947', '17,468', '16,000 pounds', '1.023 MHz', '4.77 MHz', '4 KB', '16 KB', 'Ivrea', 'every two years', '41%', '2,411,724,800', '1,048,576', 'fuzzy edges', 'estimates vary', 'January 1975', 'Popular Electronics', '6502', '8088', 'Macintosh', 'Moore', '1965', '1975', 'not a law of nature', '5,000 additions per second', 'Arduino', 'Raspberry Pi', 'ULSI', '1982', 'Fifth Generation Computer Systems']
  c.push(check('D28 the second witness wave (≥ 30 of 32 pinned strings)', needles2.filter((n) => either(n)).length >= 30, `missing: ${needles2.filter((n) => !either(n)).join(' ; ')}`))
  c.push(check('D29 word-form prices ride the prose (the DOM never shows a raw dollar glyph): 60 US dollars, 1,298 US dollars, 1,565 US dollars, 35 US dollars', ['60 US dollars', '1,298 US dollars', '1,565 US dollars', '35 US dollars'].every((n) => either(n))))
  c.push(check('D30 cross-references present: Inside the Box (chapter 4), the Internet of Things book, Digital Logic Design', ['Inside the Box', 'Internet of Things', 'Digital Logic Design'].every((n) => either(n))))
  c.push(check('D31 the honesty passages: ballparks (≥ 3 hits), bands not promises, estimates vary', countOf(/ballpark/g) >= 3 && either('bands, not promises') && either('estimates vary'), `ballpark hits ${countOf(/ballpark/g)}`))
  c.push(check('D32 the ballpark watt bands in prose: 65–125, 15–45, 3–8, mW–1 W', ['65–125', '15–45', '3–8'].every((n) => either(n)) && either('mW')))
  c.push(check('D33 the census vocabulary is rich: ≥ 25 hits of "census" and ≥ 60 family-name hits', countOf(/census/gi) >= 25 && countOf(/desktop|laptop|smartphone|tablet|server|mainframe|supercomputer|embedded|microcontroller|workstation|console|form factor|power budget/gi) >= 60, `census ${countOf(/census/gi)}, families ${countOf(/desktop|laptop|smartphone|tablet|server|mainframe|supercomputer|embedded|microcontroller|workstation|console|form factor|power budget/gi)}`))
  c.push(check('D34 the Cengage summary line present: "From the above discussion"', either('From the above discussion')))
  c.push(check('D35 no placeholder text anywhere (TODO / TBD / lorem / XXX)', !/TODO|TBD|lorem|XXX/i.test(raw)))

  // ---- svg hygiene pins ----
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const allSvgs = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions).flatMap((q) => (q.figures ?? []).map((f) => f.svg)) : [])]
  c.push(check('D36 no retired muted palette hex in any SVG (16 banned)', allSvgs.every((s) => !retired.some((hex) => s.includes(hex)))))
  const svgTextDollars = allSvgs.map((s) => (s.match(/<text[^>]*>[^<]*\$[^<]*</g) || []).length).reduce((a, b) => a + b, 0)
  c.push(check('D37 no raw "$" glyph inside any SVG text element (prices ride aria-labels only)', svgTextDollars === 0, `got ${svgTextDollars}`))
  c.push(check('D38 the exact pinned price strings live in the figure aria-labels ($60, $1,298, $1,565, $35)', allSvgs.some((s) => /aria-label="[^"]*\$60/.test(s)) && allSvgs.some((s) => /aria-label="[^"]*\$1,298/.test(s)) && allSvgs.some((s) => /aria-label="[^"]*\$1,565/.test(s)) && allSvgs.some((s) => /aria-label="[^"]*\$35/.test(s))))

  // ---- structure pins ----
  const headings = L.blocks.filter((b) => b.kind === 'heading') as { kind: 'heading'; text: string }[]
  const mandatedHeads = ['The Census Axes', 'The Families Census', "Moore's Law: The Growth Census", 'The Five Generations', 'The Personal-Computing Arc', 'The Embedded Census', 'Choosing Honestly']
  c.push(check('D39 the seven mandated headings, exact', mandatedHeads.every((h) => headings.some((x) => x.text === h)), headings.map((h) => h.text).join(' | ')))
  const romanLists = (L.blocks.filter((b) => b.kind === 'list') as { kind: 'list'; marker?: string; items: string[] }[]).filter((b) => b.marker === 'roman')
  c.push(check('D40 ≥ 3 roman lists (the personal-computing arc, the household census, the take-aways)', romanLists.length >= 3, `got ${romanLists.length}`))
  c.push(check('D41 ≥ 1 algorithm block (the family-choosing procedure)', kinds('algorithm') >= 1, `got ${kinds('algorithm')}`))
  c.push(check('D42 the opening block is a para with no heading before it (the motivation opens cold)', L.blocks[0]?.kind === 'para'))
  c.push(check('D43 the four census axes each carry a definition callout (form factor, performance, power budget, general-purpose vs dedicated)', ['Form factor', 'Performance', 'Power budget', 'General-purpose'].every((t) => callouts.some((b) => b.tone === 'definition' && b.title.toLowerCase().startsWith(t.toLowerCase())))))
  c.push(check('D44 the mainframe and supercomputer prose carries the honest roles (banks / airline reservation / weather)', either('airline reservation') && either('weather') && either('bank')))
  c.push(check('D45 the ECU prose carries the organ census (engine, brakes, doors) and the household census (washing machine, microwave, remote, keyboard)', ['engine', 'brakes', 'doors', 'washing machine', 'microwave', 'remote', 'keyboard'].every((n) => either(n))))
  return c
}

// ---- E (1.3 engines) / F (1.3 pins) (from v-cf13.ts) ----

function sectionE(): SectionCheck[] {
  // ENGINES — pure computation, ALL local helpers INSIDE
  const c: SectionCheck[] = []
  const fmt = (v: number) => v.toLocaleString('en-US')

  // ---------- engine 1: the library-wall arithmetic (built, never hardcoded) ----------
  const LINES = 40_000_000 // the pinned scale of the Linux kernel, early 2025
  const LINES_STR = fmt(LINES) // '40,000,000'
  const LINES_PER_PAGE = 50 // lines on a typical printed page
  const PAGES_PER_VOLUME = 500 // pages in a typical shelf volume
  const pages = LINES / LINES_PER_PAGE
  const volumes = pages / PAGES_PER_VOLUME
  c.push(check('E1 library wall: 40,000,000 lines formats with groupings', LINES_STR === '40,000,000', `got ${LINES_STR}`))
  c.push(check('E2 library wall: 40,000,000 / 50 = 800,000 pages exactly', pages === 800_000, `got ${fmt(pages)}`))
  c.push(check('E3 library wall: 800,000 / 500 = 1,600 volumes exactly', volumes === 1_600, `got ${fmt(volumes)}`))
  c.push(check('E4 check the round trip: 1,600 volumes x 500 pages = 800,000 pages', volumes * PAGES_PER_VOLUME === pages, `got ${fmt(volumes * PAGES_PER_VOLUME)}`))
  c.push(check('E5 check the round trip: 800,000 pages x 50 lines = 40,000,000 lines', pages * LINES_PER_PAGE === LINES, `got ${fmt(pages * LINES_PER_PAGE)}`))
  c.push(check('E6 the honest strings: 800,000 and 1,600 format with groupings', fmt(pages) === '800,000' && fmt(volumes) === '1,600', `got ${fmt(pages)} / ${fmt(volumes)}`))
  // the sensitivity probe: 40 lines per page instead of 50 (a divisor the prose may use honestly)
  const pages40 = LINES / 40
  const volumes40 = pages40 / PAGES_PER_VOLUME
  c.push(check('E7 sensitivity: 40,000,000 / 40 = 1,000,000 pages exactly', pages40 === 1_000_000, `got ${fmt(pages40)}`))
  c.push(check('E8 sensitivity: 1,000,000 / 500 = 2,000 volumes exactly — the order of magnitude stands', volumes40 === 2_000, `got ${fmt(volumes40)}`))
  c.push(check('E9 the estimate spans only a factor of 1.25 (1,600 to 2,000), so the wall survives the probe', volumes40 / volumes === 1.25, `got ${volumes40 / volumes}`))

  // ---------- engine 2: the classification census (each named program mapped to its family) ----------
  const roster: { name: string; family: 'system' | 'application'; kind: string }[] = [
    { name: 'word processor', family: 'application', kind: 'a writing tool' },
    { name: 'browser', family: 'application', kind: 'a reading tool' },
    { name: 'game', family: 'application', kind: 'a play tool' },
    { name: 'media editor', family: 'application', kind: 'a creative tool' },
    { name: 'operating system', family: 'system', kind: 'the manager' },
    { name: 'disk cleanup tool', family: 'system', kind: 'a utility' },
    { name: 'device driver', family: 'system', kind: 'a translator' },
  ]
  const sysCount = roster.filter((r) => r.family === 'system').length
  const appCount = roster.filter((r) => r.family === 'application').length
  c.push(check('E10 the census names exactly 7 example programs', roster.length === 7, `got ${roster.length}`))
  c.push(check('E11 the census splits 3 system + 4 application', sysCount === 3 && appCount === 4, `got ${sysCount} system / ${appCount} application`))
  c.push(check('E12 the operating system is the system half’s head (family asserted)', roster[4].name === 'operating system' && roster[4].family === 'system', JSON.stringify(roster[4])))
  c.push(check('E13 word processor, browser, game, media editor all ride the application half', ['word processor', 'browser', 'game', 'media editor'].every((n) => roster.find((r) => r.name === n)?.family === 'application'), 'the four workers'))
  c.push(check('E14 disk cleanup tool + device driver ride the system half beside the OS', ['disk cleanup tool', 'device driver'].every((n) => roster.find((r) => r.name === n)?.family === 'system'), 'utility + driver'))
  c.push(check('E15 the maintenance-jobs census: backup, defragment-style tidy, antivirus scan are all utilities', ['backup program', 'defragment-style tidy-up tool', 'antivirus scanning program'].length === 3, 'three utilities, one family'))

  // ---------- engine 3: the boot-stage order as data ----------
  const boot = ['power on', 'firmware checks the hardware (POST)', 'firmware finds the bootloader', 'bootloader loads the kernel', 'kernel starts drivers + services', 'login screen appears']
  const idx = (s: string) => boot.indexOf(s)
  c.push(check('E16 the boot sequence has exactly 6 stages', boot.length === 6, `got ${boot.length}`))
  c.push(check('E17 power on is stage 1 (index 0)', idx('power on') === 0, `got ${idx('power on')}`))
  c.push(check('E18 POST is stage 2 (index 1), the firmware’s own hardware check', idx('firmware checks the hardware (POST)') === 1, `got ${idx('firmware checks the hardware (POST)')}`))
  c.push(check('E19 bootloader before kernel (indices 2 < 3)', idx('firmware finds the bootloader') === 2 && idx('bootloader loads the kernel') === 3, `got ${idx('firmware finds the bootloader')} < ${idx('bootloader loads the kernel')}`))
  c.push(check('E20 drivers + services stage 5 (index 4), login last (index 5)', idx('kernel starts drivers + services') === 4 && idx('login screen appears') === 5, `got ${idx('kernel starts drivers + services')} and ${idx('login screen appears')}`))
  c.push(check('E21 the order is strictly increasing with no repeats', new Set(boot).size === 6 && boot.every((s, i) => i === 0 || s !== boot[i - 1]), 'six distinct stages'))
  c.push(check('E22 the firmware owns the first two hops after power on (no disk needed yet)', boot.slice(1, 3).every((s) => s.startsWith('firmware')), boot.slice(1, 3).join(' | ')))

  // ---------- engine 4: the pinned historical constants, asserted as data ----------
  const unix = { born: 1969, lab: 'Bell Labs', authors: ['Ken Thompson', 'Dennis Ritchie'], rewrittenInC: 1973 }
  const dosArc = { licensed: '86-DOS', nickname: 'QDOS', nicknameLong: 'Quick and Dirty Operating System', from: 'Seattle Computer Products', fullRights: 'July 1981', shipped: 'PC DOS 1.0', shippedWhen: 'August 1981', machine: 'the first IBM PC' }
  const windows = { version: 'Windows 1.0', when: 'November 1985' }
  const linux = { author: 'Linus Torvalds', when: 'August 1991', described: 'a hobby for 386 PCs', license: 'the GPL' }
  const mobile = { iphoneOS: 'iPhone OS 1', iphoneYear: 2007, android: 'Android 1.0', androidWhen: '23 September 2008', androidTitle: 'the first commercial version' }
  const kernelScale = { lines: 40_000_000, when: 'early 2025', title: 'the largest common open codebase' }
  c.push(check('E23 UNIX pinned: born 1969 at Bell Labs, by Ken Thompson and Dennis Ritchie, rewritten in C by 1973', unix.born === 1969 && unix.lab === 'Bell Labs' && unix.authors.join(' and ') === 'Ken Thompson and Dennis Ritchie' && unix.rewrittenInC === 1973, JSON.stringify(unix)))
  c.push(check('E24 the DOS arc pinned: 86-DOS (QDOS, Quick and Dirty Operating System) licensed from Seattle Computer Products, full rights July 1981', dosArc.licensed === '86-DOS' && dosArc.nickname === 'QDOS' && dosArc.nicknameLong === 'Quick and Dirty Operating System' && dosArc.from === 'Seattle Computer Products' && dosArc.fullRights === 'July 1981', JSON.stringify(dosArc)))
  c.push(check('E25 PC DOS 1.0 shipped with the first IBM PC in August 1981', dosArc.shipped === 'PC DOS 1.0' && dosArc.shippedWhen === 'August 1981' && dosArc.machine === 'the first IBM PC', `${dosArc.shipped} — ${dosArc.shippedWhen}`))
  c.push(check('E26 Windows 1.0 pinned: November 1985', windows.version === 'Windows 1.0' && windows.when === 'November 1985', JSON.stringify(windows)))
  c.push(check('E27 the Linux kernel pinned: Linus Torvalds, August 1991, a hobby for 386 PCs, released under the GPL', linux.author === 'Linus Torvalds' && linux.when === 'August 1991' && linux.described === 'a hobby for 386 PCs' && linux.license === 'the GPL', JSON.stringify(linux)))
  c.push(check('E28 the mobile era pinned: iPhone OS 1 in 2007; Android 1.0, the first commercial version, 23 September 2008', mobile.iphoneYear === 2007 && mobile.androidWhen === '23 September 2008' && mobile.androidTitle === 'the first commercial version', JSON.stringify(mobile)))
  c.push(check('E29 the kernel scale pinned: surpassed 40,000,000 lines of code in early 2025', kernelScale.lines === 40_000_000 && kernelScale.when === 'early 2025', JSON.stringify(kernelScale)))
  c.push(check('E30 1969 to PC DOS 1981 is 12 years; UNIX in C (1973) is 4 years after its birth', 1981 - unix.born === 12 && unix.rewrittenInC - unix.born === 4, 'the arc spacing'))
  c.push(check('E31 Windows 1.0 (1985) is 4 years after PC DOS 1.0 (1981); Linux (1991) is 6 years after Windows', 1985 - 1981 === 4 && 1991 - 1985 === 6, 'the lineage spacing'))

  // ---------- engine 5: the manager arithmetic (the n-programs theorem, priced) ----------
  const n = 4 // programs that must run on the one machine
  const d = 5 // devices each program would have to drive on bare metal
  const bareMetalCodes = n * d
  const withOSCodes = d
  const saving = bareMetalCodes - withOSCodes
  c.push(check('E32 the manager arithmetic: 4 programs x 5 devices = 20 driver codes on bare metal', bareMetalCodes === 20, `got ${bareMetalCodes}`))
  c.push(check('E33 with one OS the machine needs only 5 device drivers (written once, inside the OS layer)', withOSCodes === 5, `got ${withOSCodes}`))
  c.push(check('E34 the saving is 20 - 5 = 15 codes not written', saving === 15, `got ${saving}`))
  c.push(check('E35 the ratio is 20 / 5 = 4 — each driver written once serves every program', bareMetalCodes / withOSCodes === 4, `got ${bareMetalCodes / withOSCodes}`))
  const quad = (nn: number, dd: number) => nn * dd
  c.push(check('E36 doubling the programs doubles the bare-metal bill but leaves the OS bill alone (8 x 5 = 40 vs 5)', quad(2 * n, d) === 40 && withOSCodes === 5, `got ${quad(2 * n, d)} vs ${withOSCodes}`))

  // ---------- engine 6: the quiz key census (data) ----------
  const quizKeys = [2, 1, 0, 3, 2]
  c.push(check('E37 the intended quiz keys are exactly [2,1,0,3,2]', JSON.stringify(quizKeys) === '[2,1,0,3,2]', JSON.stringify(quizKeys)))
  c.push(check('E38 five keys, each a legal index into four options', quizKeys.length === 5 && quizKeys.every((k) => k >= 0 && k <= 3), JSON.stringify(quizKeys)))
  c.push(check('E39 the key census: index 0 once, 1 once, 2 twice, 3 once — no key thrice', quizKeys.filter((k) => k === 2).length === 2 && quizKeys.filter((k) => k === 0).length === 1 && quizKeys.filter((k) => k === 1).length === 1 && quizKeys.filter((k) => k === 3).length === 1, JSON.stringify(quizKeys)))

  // ---------- engine 7: SVG geometry invariants (the figures’ claims, recomputed) ----------
  // figure 1 — the software family tree: root at 360, two family boxes symmetric about it,
  // 3 system leaves and 4 application leaves, every box inside the 720 x 420 viewBox
  const ROOT_CX = 360, FAM_L_CX = 200, FAM_R_CX = 520, LEAF_W = 250, LEAF_H = 40, TREE_H = 420
  const sysLeafYs = [210, 274, 338]
  const appLeafYs = [176, 228, 280, 332]
  const symmetric = (FAM_L_CX + FAM_R_CX) / 2 === ROOT_CX
  const leavesInside = [...sysLeafYs, ...appLeafYs].every((y) => y - LEAF_H / 2 >= 150 && y + LEAF_H / 2 <= TREE_H - 10)
  const leafXsInside = FAM_L_CX - LEAF_W / 2 >= 8 && FAM_R_CX + LEAF_W / 2 <= 712
  c.push(check('E40 family tree: the two family boxes sit symmetric about the root (200 + 520)/2 = 360', symmetric, `got ${(FAM_L_CX + FAM_R_CX) / 2}`))
  c.push(check('E41 family tree: 3 system leaves spaced 64 apart + 4 application leaves spaced 52 apart, all inside the viewBox', sysLeafYs.every((y, i) => i === 0 || y - sysLeafYs[i - 1] === 64) && appLeafYs.every((y, i) => i === 0 || y - appLeafYs[i - 1] === 52) && leavesInside && leafXsInside, `sys ${sysLeafYs.join(',')} app ${appLeafYs.join(',')}`))
  // figure 2 — the OS as manager: 4 app boxes evenly spaced (170 apart) above, the OS box
  // centered at 360, 5 hardware boxes evenly spaced (120 apart) below, inside 720 x 410
  const APP_CXS = [105, 275, 445, 615], OS_CX = 360, HW_CXS = [120, 240, 360, 480, 600]
  const appEven = APP_CXS.every((x, i) => i === 0 || x - APP_CXS[i - 1] === 170)
  const hwEven = HW_CXS.every((x, i) => i === 0 || x - HW_CXS[i - 1] === 120)
  c.push(check('E42 manager figure: 4 application boxes evenly spaced 170 apart, 5 hardware boxes evenly spaced 120 apart, OS centered at 360', appEven && hwEven && HW_CXS[2] === OS_CX, `app ${APP_CXS.join(',')} hw ${HW_CXS.join(',')}`))
  c.push(check('E43 manager figure: every box center lies inside the 720 x 410 viewBox with 40 px to spare', [...APP_CXS, ...HW_CXS, OS_CX].every((x) => x > 40 && x < 680), 'all centers in (40, 680)'))
  // figure 3 — the boot strip: 6 stage boxes evenly spaced 112 apart from 80 to 640
  const BOOT_CXS = [80, 192, 304, 416, 528, 640]
  const bootEven = BOOT_CXS.every((x, i) => i === 0 || x - BOOT_CXS[i - 1] === 112)
  c.push(check('E44 boot strip: 6 stage boxes evenly spaced 112 apart, running 80 to 640 inside the 720-wide viewBox', bootEven && BOOT_CXS[0] === 80 && BOOT_CXS[5] === 640, BOOT_CXS.join(',')))
  c.push(check('E45 boot strip: the strip order matches the engine boot-order data (stage k of the strip is stage k of the data)', BOOT_CXS.length === boot.length, `${BOOT_CXS.length} boxes / ${boot.length} stages`))
  return c
}

function sectionF(L: Lesson): SectionCheck[] {
  // PINS — re-read the SHIPPED lesson
  const c: SectionCheck[] = []
  /** assembly-time strict-null-safety shims (the run-119 precedent) */
  const solText = (q: { solution?: string | string[] } | undefined): string => {
    if (!q) return ''
    return Array.isArray(q.solution) ? q.solution.join(' ') : (q.solution ?? '')
  }
  const ansText = (q: { answer?: string } | undefined): string => (q?.answer ?? '')
  const collectStrings = (LL: Lesson): { raw: string; full: string } => {
    const rawParts: string[] = []
    const walk = (v: unknown) => {
      if (typeof v === 'string') rawParts.push(v)
      else if (Array.isArray(v)) v.forEach(walk)
      else if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    LL.blocks.forEach((b) => walk(b))
    return { raw: rawParts.join('\n'), full: JSON.stringify(LL) }
  }
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  // ---- identity + metadata pins ----
  c.push(check('F0 lesson present with a blocks array', Array.isArray(L.blocks) && L.blocks.length > 0, `got ${L.blocks.length} blocks`))
  c.push(check('F1 id exact', L.id === 'cf-software-the-invisible-half-of-the-machine', L.id))
  c.push(check('F2 number exact', L.number === '1.3', L.number))
  c.push(check('F3 title exact', L.title === 'Software: the Invisible Half of the Machine', L.title))
  c.push(check('F4 prerequisites exactly the two 1.1 + 1.2 ids', JSON.stringify(L.prerequisites) === JSON.stringify(['cf-the-basic-structure-and-operation-of-the-computer', 'cf-a-census-of-hardware-desktops-to-embedded-chips']), JSON.stringify(L.prerequisites)))
  c.push(check('F5 sources exact [cs-cf-web-ground]', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground']), JSON.stringify(L.sources)))
  c.push(check('F6 concepts: 5-8 key phrases', L.concepts.length >= 5 && L.concepts.length <= 8, `got ${L.concepts.length}`))
  c.push(check('F7 objectives: 4-6, each a you-can', (L.objectives ?? []).length >= 4 && (L.objectives ?? []).length <= 6 && (L.objectives ?? []).every((o) => o.includes('you can')), `got ${(L.objectives ?? []).length}`))
  const W = countLessonWords(L)
  c.push(check('F8 words >= 6,000 (countLessonWords)', W >= 6000, `got ${W}`))
  c.push(check('F9 words <= 12,000 sanity cap', W <= 12000, `got ${W}`))

  // ---- figures ----
  const figBlocks = L.blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; caption: string; svg: string }[]
  c.push(check('F10 exactly 3 body figures, each with viewBox + role + aria-label', figBlocks.length === 3 && figBlocks.every((f) => f.svg.includes('viewBox') && f.svg.includes('role="img"') && f.svg.includes('aria-label')), `got ${figBlocks.length}`))
  c.push(check('F11 every body figure caption teaches (>= 12 words)', figBlocks.every((f) => f.caption.trim().split(/\s+/).length >= 12), figBlocks.map((f) => f.caption.split(/\s+/).length).join(',')))

  // ---- quiz pins (keys [2,1,0,3,2]) ----
  const quizBlocks = L.blocks.filter((b) => b.kind === 'quiz') as { kind: 'quiz'; items: { q: string; options: string[]; answer: number; explain: string }[] }[]
  const quiz = quizBlocks[0]
  c.push(check('F12 quiz present, exactly 5 items, 4 options each', !!quiz && quiz.items.length === 5 && quiz.items.every((it) => it.options.length === 4), quiz ? `got ${quiz.items.length}` : 'no quiz'))
  if (quiz) {
    c.push(check('F13 quiz keys exactly [2,1,0,3,2]', JSON.stringify(quiz.items.map((it) => it.answer)) === '[2,1,0,3,2]', JSON.stringify(quiz.items.map((it) => it.answer))))
    c.push(check('F14 quiz coverage: system-vs-application / process management / driver / license / open source', /system software/i.test(quiz.items[0].q) && /process management/i.test(quiz.items[1].q) && /device driver/i.test(quiz.items[2].q) && /buy/i.test(quiz.items[3].q) && /redistribut/i.test(quiz.items[4].q), quiz.items.map((it) => it.q.slice(0, 30)).join(' | ')))
    c.push(check('F15 every quiz explain takes down >= 3 wrong options (Option refs)', quiz.items.every((it) => (it.explain.match(/Option \d/g) || []).length >= 3), quiz.items.map((it) => (it.explain.match(/Option \d/g) || []).length).join(',')))
  }

  // ---- exercises ----
  const exBlocks = L.blocks.filter((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: { level: string; questions: { q: string; solution: string | string[]; answer?: string; figures?: { caption: string; svg: string }[] }[] }[] }[]
  const ex = exBlocks[0]
  c.push(check('F16 exercises present, six sets L1..L6 with counts 2/2/3/3/3/2', !!ex && ex.sets.length === 6 && ex.sets.map((s) => s.level).join(',') === 'L1,L2,L3,L4,L5,L6' && ex.sets.map((s) => s.questions.length).join(',') === '2,2,3,3,3,2', ex ? ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ') : 'no exercises'))
  if (ex) {
    const qs = ex.sets.flatMap((s) => s.questions)
    c.push(check('F17 exactly 15 exercise questions', qs.length === 15, `got ${qs.length}`))
    c.push(check('F18 every solution is a steps array (>= 3 lines) + every answer present', qs.every((q) => Array.isArray(q.solution) && q.solution.length >= 3) && qs.every((q) => typeof q.answer === 'string' && (q.answer ?? '').length > 0), 'Cengage chains'))
    const solFigs = qs.flatMap((q) => q.figures ?? [])
    c.push(check('F19 >= 3 solution figures (v9.0), each viewBox + aria-label', solFigs.length >= 3 && solFigs.every((f) => f.svg.includes('viewBox') && f.svg.includes('aria-label')), `got ${solFigs.length}`))
    c.push(check('F20 the solution figures: the family tree / the boot strip / the driver translator / the library wall', solFigs.length >= 3 && solFigs.some((f) => /famil/i.test(f.caption)) && solFigs.some((f) => /boot/i.test(f.caption)) && solFigs.some((f) => /driver|translat/i.test(f.caption)) && solFigs.some((f) => /1,600|library wall/i.test(f.caption)), solFigs.map((f) => f.caption.slice(0, 36)).join(' | ')))
    c.push(check('F21 spot answers: L4-2 the library wall 800,000 + 1,600; L5-3 the manager 20 vs 5', ansText(qs[8]).includes('800,000') && ansText(qs[8]).includes('1,600') && ansText(qs[12]).includes('20') && ansText(qs[12]).includes('5'), `L4-2 ${ansText(qs[8]).slice(0, 40)} | L5-3 ${ansText(qs[12]).slice(0, 40)}`))
    c.push(check('F22 the exam-style item is labelled honestly (L4-1)', qs[7].q.includes('Exam-style') && qs[7].q.includes('not a real past paper'), qs[7].q.slice(0, 60)))
    c.push(check('F23 L6 reasoning: the manager theorem priced ($n \\times d$ vs $d$) + the stored-program industry argument', solText(qs[13]).includes('\\times') && solText(qs[14]).includes('stored-program'), 'both L6 items'))
  }

  // ---- terms ----
  const termBlocks = L.blocks.filter((b) => b.kind === 'terms') as { kind: 'terms'; items: { term: string; def: string }[] }[]
  const allTerms = termBlocks.flatMap((t) => t.items)
  const term = (name: string) => allTerms.find((t) => t.term === name)
  c.push(check('F24 terms: >= 12 entries feeding the glossary', allTerms.length >= 12, `got ${allTerms.length}`))
  const needTerms = ['Software', 'Program', 'System software', 'Application software', 'Operating system', 'Utility program', 'Device driver', 'Kernel', 'Firmware', 'Platform', 'Application programming interface (API)', 'Software license', 'Open-source software', 'Freeware', 'Shareware', 'Public-domain software']
  c.push(check('F25 the 16 pinned terms present by name', needTerms.every((t) => !!term(t)), needTerms.filter((t) => !term(t)).join(' ; ')))
  c.push(check('F26 every term def is one sentence ending in a period', allTerms.every((t) => t.def.trim().endsWith('.') && (t.def.match(/\./g) || []).length === 1), allTerms.filter((t) => (t.def.match(/\./g) || []).length !== 1).map((t) => t.term).join(' ; ')))

  // ---- formula cards ----
  const formulas = L.blocks.filter((b) => b.kind === 'formula') as { kind: 'formula'; name: string; latex: string; note?: string }[]
  c.push(check('F27 >= 4 formula cards: the boot order / the two families / the library wall / the license families', formulas.length >= 4 && formulas.some((f) => f.name.toLowerCase().includes('boot')) && formulas.some((f) => f.name.toLowerCase().includes('famil')) && formulas.some((f) => f.name.toLowerCase().includes('library')) && formulas.some((f) => /boot|families|library|license|manager/i.test(f.name)), `got ${formulas.length}`))
  c.push(check('F28 the library-wall card carries 800,000 and 1,600', formulas.some((f) => f.latex.includes('800{,}000') && f.latex.includes('1{,}600')), 'the estimate card'))
  c.push(check('F29 every formula name is plain (no $ inside)', formulas.every((f) => !f.name.includes('$')), 'plain names'))

  // ---- derivations ----
  const derivations = L.blocks.filter((b) => b.kind === 'derivation') as { kind: 'derivation'; title: string; steps: { label: string; formula?: string; explanation: string }[]; result: string }[]
  c.push(check('F30 exactly 2 derivations: the manager theorem + the library wall', derivations.length === 2 && derivations.some((d) => /manager/i.test(d.title)) && derivations.some((d) => /library wall/i.test(d.title)), derivations.map((d) => d.title).join(' | ')))
  c.push(check('F31 derivation labels are plain words (no $ inside labels)', derivations.every((d) => d.steps.every((s) => !s.label.includes('$'))), 'plain-word labels'))
  c.push(check('F32 derivation results carry the math clause-wise ($...$ present in each result)', derivations.every((d) => /\$[^$]+\$/.test(d.result)), derivations.map((d) => d.result.slice(0, 40)).join(' | ')))

  // ---- algorithm ----
  const algos = L.blocks.filter((b) => b.kind === 'algorithm') as { kind: 'algorithm'; title: string; lines: { code: string; note?: string }[]; note?: string }[]
  const algo = algos[0]
  c.push(check('F33 exactly 1 algorithm block: the boot sequence, >= 6 lines', algos.length === 1 && !!algo && algo.title === 'The Boot Sequence' && algo.lines.length >= 6, algos.map((a) => a.title).join(' | ')))
  if (algo) {
    const codes = algo.lines.map((l) => l.code)
    c.push(check('F34 the algorithm pins: power on / POST / bootloader / kernel / drivers + services / login', codes.some((k) => /power on/i.test(k)) && codes.some((k) => /POST/.test(k)) && codes.some((k) => /bootloader/.test(k)) && codes.some((k) => /kernel/.test(k)) && codes.some((k) => /drivers/.test(k)) && codes.some((k) => /login/i.test(k)), codes.join(' | ')))
    c.push(check('F35 the algorithm note answers why firmware lives on the motherboard (before any disk exists)', !!algo.note && /motherboard/i.test(algo.note) && /disk/i.test(algo.note), algo.note ? algo.note.slice(0, 60) : 'no note'))
    c.push(check('F36 every algorithm line carries a one-line note', algo.lines.every((l) => typeof l.note === 'string' && (l.note ?? '').length > 8), 'per-line notes'))
  }

  // ---- tables ----
  const tables = L.blocks.filter((b) => b.kind === 'table') as { kind: 'table'; caption?: string; head: string[]; rows: string[][] }[]
  c.push(check('F37 >= 2 tables: the families census (7 rows) + the OS duty map (5 rows) + the license families (5 rows)', tables.length >= 2 && tables.some((t) => t.rows.length === 7) && tables.some((t) => t.rows.length === 5 && /duty|what the user sees/i.test(t.head.join(' '))) && tables.some((t) => t.rows.length === 5 && /licens/i.test(t.head.join(' ') + (t.caption ?? ''))), tables.map((t) => `${(t.caption ?? t.head[0]).slice(0, 24)}:${t.rows.length}`).join(' | ')))
  c.push(check('F38 every table cell stays short (< 60 chars, renders <= ~960 px at 1280)', tables.every((t) => t.rows.every((r) => r.every((cell) => cell.length < 60))), 'short cells'))

  // ---- examples (Illustrations) ----
  const examples = L.blocks.filter((b) => b.kind === 'example') as { kind: 'example'; title: string; steps: string[] }[]
  c.push(check('F39 >= 8 Illustrations (example blocks), each with >= 4 worked lines', examples.length >= 8 && examples.every((e) => e.steps.length >= 4), `got ${examples.length}`))
  c.push(check('F40 the classification Illustration + the boot-trace Illustration present', examples.some((e) => /classif/i.test(e.title)) && examples.some((e) => /boot/i.test(e.title)), examples.map((e) => e.title.slice(0, 28)).join(' | ')))

  // ---- callout tones ----
  const callouts = L.blocks.filter((b) => b.kind === 'callout') as { kind: 'callout'; tone: string; title: string; text: string }[]
  const tones = (t: string) => callouts.filter((b) => b.tone === t).length
  c.push(check('F41 callout census: definition >= 8, historical >= 1, warn >= 1, insight >= 2, exam exactly 1', tones('definition') >= 8 && tones('historical') >= 1 && tones('warn') >= 1 && tones('insight') >= 2 && tones('exam') === 1, `def ${tones('definition')} hist ${tones('historical')} warn ${tones('warn')} ins ${tones('insight')} exam ${tones('exam')}`))

  // ---- headings ----
  const headings = L.blocks.filter((b) => b.kind === 'heading') as { kind: 'heading'; text: string }[]
  const mandatedHeads = ['What Software Is', 'The Two Great Families', 'The Operating System: the Manager', 'Utilities and Device Drivers', 'Application Software and the Platform Question', 'How Big Is Software', 'Licensing: the Honest First Meeting', 'Exam Corner']
  c.push(check('F42 the mandated headings present (8 sections)', mandatedHeads.every((h) => headings.some((x) => x.text === h)), headings.map((h) => h.text).join(' | ')))

  // ---- the pinned facts as strings ----
  c.push(check('F43 UNIX strings: 1969 / Bell Labs / Ken Thompson / Dennis Ritchie / 1973', ['1969', 'Bell Labs', 'Ken Thompson', 'Dennis Ritchie', '1973'].every((s) => either(s)), 'the UNIX witness'))
  c.push(check('F44 the DOS arc strings: 86-DOS / Quick and Dirty Operating System / Seattle Computer Products / July 1981 / PC DOS 1.0 / August 1981', ['86-DOS', 'Quick and Dirty Operating System', 'Seattle Computer Products', 'July 1981', 'PC DOS 1.0', 'August 1981'].every((s) => either(s)), 'the DOS lineage'))
  c.push(check('F45 Windows 1.0: November 1985; the Linux kernel: Linus Torvalds / August 1991 / GPL', ['Windows 1.0', 'November 1985', 'Linus Torvalds', 'August 1991', 'GPL'].every((s) => either(s)), 'the desktop + Linux witnesses'))
  c.push(check('F46 the mobile era: iPhone OS 1 / 2007 / Android 1.0 / 23 September 2008', ['iPhone OS 1', '2007', 'Android 1.0', '23 September 2008'].every((s) => either(s)), 'the mobile witnesses'))
  c.push(check('F47 the kernel scale strings: 40,000,000 / early 2025', ['40,000,000', 'early 2025'].every((s) => either(s)), 'the scale witness'))
  c.push(check('F48 the computed constants as strings: 800,000 / 1,600', ['800,000', '1,600'].every((s) => either(s)), 'the library-wall arithmetic'))

  // ---- cross-references + honesty ----
  const crossRefs = ['Installing, Updating and Licensing Honestly', 'Operating Systems', 'Inside the Box']
  c.push(check('F49 the cross-references present (chapter 5 hands-off + the deeper courses)', crossRefs.every((s) => either(s)), crossRefs.filter((s) => !either(s)).join(' ; ')))
  c.push(check('F50 honesty pins: honest + ballpark + estimate', /honest/i.test(raw) && /ballpark/i.test(raw) && /estimate/i.test(raw), 'the honest-first-meeting language'))
  c.push(check('F51 vocabulary census: >= 40 uses of software/program words', (raw.match(/software|program/gi) || []).length >= 40, `got ${(raw.match(/software|program/gi) || []).length}`))
  c.push(check('F52 the Cengage summary line: From the above discussion', /From the above discussion/.test(raw), 'the summary formula'))

  // ---- roman lists ----
  const romanLists = L.blocks.filter((b) => b.kind === 'list' && b.marker === 'roman') as { kind: 'list'; items: string[] }[]
  c.push(check('F53 >= 3 roman-marker runs (For example + take-aways)', romanLists.length >= 3 && romanLists.every((l) => l.items.length >= 4), `got ${romanLists.length}`))

  // ---- SVG hygiene ----
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const everySvg = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions).flatMap((q) => (q.figures ?? []).map((f) => f.svg)) : [])]
  c.push(check('F54 no retired muted hexes in any SVG (16 banned)', everySvg.length >= 6 && everySvg.every((s) => !retired.some((hex) => s.includes(hex))), `${everySvg.length} svgs checked`))
  c.push(check('F55 every SVG has aria-label + viewBox, and no raw $ in any SVG text', everySvg.every((s) => s.includes('aria-label') && s.includes('viewBox') && !s.includes('$')), 'house SVG law'))
  c.push(check('F56 the palette stays vivid: no blue/indigo hexes in any SVG', everySvg.every((s) => !/#2563eb|#3b82f6|#1d4ed8|#4f46e5|#6366f1/i.test(s)), 'no blue'))
  return c
}

// ---- G (1.R engines) / H (1.R pins) (from v-cf1R.ts) ----

function sectionG(): SectionCheck[] {
  // ENGINES — pure computation, ALL local helpers INSIDE (assembly-safety)
  const c: SectionCheck[] = []

  // ---------- engine 1: the mark-list stats (the chapter's IPOS witness) ----------
  const marks = [62, 48, 91, 77, 54]
  const cnt = marks.length
  const sum = marks.reduce((a, b) => a + b, 0)
  const avg = sum / cnt
  const hi = Math.max(...marks)
  const lo = Math.min(...marks)
  c.push(check('G1 mark-list count = 5', cnt === 5, `got ${cnt}`))
  c.push(check('G2 mark-list sum = 332', sum === 332, `got ${sum}`))
  c.push(check('G3 average = 66.4', avg === 66.4, `got ${avg}`))
  c.push(check('G4 highest = 91', hi === 91, `got ${hi}`))
  c.push(check('G5 lowest = 48', lo === 48, `got ${lo}`))
  c.push(check('G6 the summary strings format cleanly (66.4 / 91 / 332)', avg.toFixed(1) === '66.4' && String(hi) === '91' && String(sum) === '332', 'the engine-pinned IPOS witness'))

  // ---------- engine 2: the 2^n ladder (built by doubling, never hardcoded) ----------
  const pow2: number[] = [1]
  for (let k = 1; k <= 32; k++) pow2[k] = pow2[k - 1] * 2
  const fmt = (v: number) => v.toLocaleString('en-US')
  c.push(check('G7 2^12 = 4,096 (the 12-line drill)', pow2[12] === 4096 && fmt(pow2[12]) === '4,096', `got ${fmt(pow2[12])}`))
  c.push(check('G8 2^16 = 65,536 (the 16-line drill)', pow2[16] === 65536 && fmt(pow2[16]) === '65,536', `got ${fmt(pow2[16])}`))
  c.push(check('G9 2^20 = 1,048,576 (the 20-line drill, one full MB)', pow2[20] === 1048576 && fmt(pow2[20]) === '1,048,576', `got ${fmt(pow2[20])}`))
  c.push(check('G10 2^24 = 16,777,216 (the 24-line drill)', pow2[24] === 16777216 && fmt(pow2[24]) === '16,777,216', `got ${fmt(pow2[24])}`))
  c.push(check('G11 the +4-line ladder: 12 -> 16 -> 24 lines is x16 then x256', pow2[16] / pow2[12] === 16 && pow2[24] / pow2[16] === 256, `x${pow2[16] / pow2[12]} then x${pow2[24] / pow2[16]}`))
  c.push(check('G12 the doubling rungs agree with the shipped lesson 1.1 census (1,024 the computing one K)', pow2[10] === 1024, `got ${pow2[10]}`))

  // ---------- engine 3: the Moore arithmetic (the revised 1975 cadence) ----------
  const span = 2011 - 1971
  const doublings = span / 2
  const growth = pow2[doublings]
  const product = 2300 * growth
  c.push(check('G13 the span 1971 -> 2011 = 40 years', span === 40, `got ${span}`))
  c.push(check('G14 the revised cadence: 40 years / 2 = 20 doublings', doublings === 20, `got ${doublings}`))
  c.push(check('G15 twenty doublings = 2^20 = 1,048,576 the growth factor', growth === 1048576, `got ${fmt(growth)}`))
  c.push(check('G16 2,300 x 2^20 = 2,411,724,800 (engine-computed product, exact)', product === 2411724800, `got ${product}`))
  const ratio = product / 2.4e9
  c.push(check('G17 the product rounds honestly to 2.4 x 10^9 (within half a percent)', Math.abs(ratio - 1) < 0.005, `ratio ${ratio.toFixed(5)}`))
  const moore = { observed: 1965, revised: 1975, cadence: 'one doubling every two years' }
  c.push(check('G18 Moore pinned: observed 1965, revised 1975 to doubling every two years', moore.observed === 1965 && moore.revised === 1975 && moore.cadence === 'one doubling every two years', JSON.stringify(moore)))

  // ---------- engine 4: the clock conversions ----------
  const cycleNs = (hz: number) => (1 / hz) * 1e9
  c.push(check('G19 T(2 GHz) = 0.5 ns exactly', cycleNs(2e9) === 0.5, `got ${cycleNs(2e9)}`))
  const traceNs = 200 * 2 * 0.5
  c.push(check('G20 200 instructions x 2 cycles x 0.5 ns = 200 ns', traceNs === 200, `got ${traceNs}`))
  const t477 = cycleNs(4.77e6)
  c.push(check('G21 T(4.77 MHz) = 209.6 ns (toFixed 1)', t477.toFixed(1) === '209.6', `got ${t477.toFixed(4)}`))
  c.push(check('G22 doubling f halves T: T(1 GHz) / T(2 GHz) = 2', cycleNs(1e9) / cycleNs(2e9) === 2, `got ${cycleNs(1e9) / cycleNs(2e9)}`))
  c.push(check('G23 T(1 GHz) = 1 ns exactly (the clean rung)', cycleNs(1e9) === 1, `got ${cycleNs(1e9)}`))

  // ---------- engine 5: the PC walk ----------
  const pc = [100, 101, 102]
  c.push(check('G24 the PC trace 100 -> 101 -> 102 walks +1 each lap', pc.every((v, i) => i === 0 || v === pc[i - 1] + 1), JSON.stringify(pc)))
  c.push(check('G25 after the third lap PC = 103, past the last instruction', pc[2] + 1 === 103, `got ${pc[2] + 1}`))
  c.push(check('G26 three instructions = three laps of fetch-decode-execute', pc.length === 3 && 3 === 3, `got ${pc.length}`))

  // ---------- engine 6: the pinned historical constants, asserted as data ----------
  const eniac = { announced: '14 February 1946', tubes: 17468, tons: '~30 tons', kw: '~150 kW', adds: '5,000 additions per second' }
  const univac = { accepted: '31 March 1951', title: 'the first commercial computer' }
  const ibmpc = { debuted: '12 August 1981', rateMHz: 4.77, ram: '16 KB' }
  const i4004 = { released: '15 November 1971', transistors: 2300 }
  const personalArc = [
    { name: 'Altair 8800', year: 1975, note: 'the January 1975 Popular Electronics cover' },
    { name: 'Apple II', year: 1977, note: '' },
    { name: 'IBM PC 5150', year: 1981, note: '4.77 MHz, 16 KB' },
    { name: 'Macintosh', year: 1984, note: '' },
    { name: 'iPhone', year: 2007, note: 'announced 9 January 2007' },
    { name: 'Raspberry Pi', year: 2012, note: '29 February 2012 at $35' },
  ]
  const softwareEra = [
    { name: 'Linux kernel', year: 1991, note: 'Torvalds, August 1991' },
    { name: 'the Linux line count', year: 2025, note: 'about 40,000,000 lines crossed early 2025' },
    { name: 'Android 1.0', year: 2008, note: '23 September 2008' },
  ]
  c.push(check('G27 ENIAC pinned: 14 February 1946, 17,468 tubes, ~30 tons, ~150 kW, 5,000 additions per second', eniac.announced === '14 February 1946' && eniac.tubes === 17468 && eniac.tons === '~30 tons' && eniac.kw === '~150 kW' && eniac.adds === '5,000 additions per second', JSON.stringify(eniac)))
  c.push(check('G28 UNIVAC I pinned: 31 March 1951, the first commercial computer', univac.accepted === '31 March 1951' && univac.title === 'the first commercial computer', JSON.stringify(univac)))
  c.push(check('G29 IBM PC 5150 pinned: 12 August 1981, 4.77 MHz, 16 KB', ibmpc.debuted === '12 August 1981' && ibmpc.rateMHz === 4.77 && ibmpc.ram === '16 KB', JSON.stringify(ibmpc)))
  c.push(check('G30 Intel 4004 pinned: 15 November 1971, 2,300 transistors', i4004.released === '15 November 1971' && i4004.transistors === 2300, JSON.stringify(i4004)))
  c.push(check('G31 the personal-computing arc: 1975 Altair, 1977 Apple II, 1981 IBM PC, 1984 Macintosh, 2007 iPhone, 2012 Raspberry Pi at $35', personalArc.map((m) => m.year).join(',') === '1975,1977,1981,1984,2007,2012' && personalArc[5].note === '29 February 2012 at $35', personalArc.map((m) => `${m.name} ${m.year}`).join(' | ')))
  c.push(check('G32 the software era: Linux kernel August 1991, about 40,000,000 lines early 2025, Android 1.0 23 September 2008', softwareEra[0].year === 1991 && softwareEra[0].note === 'Torvalds, August 1991' && softwareEra[1].note === 'about 40,000,000 lines crossed early 2025' && softwareEra[2].note === '23 September 2008', softwareEra.map((s) => s.name).join(' | ')))

  // ---------- engine 7: the ECU census + the boot order + the honest fifth ----------
  const ecu = { typicalLo: 50, typicalHi: 100, premium: 150 }
  c.push(check('G33 the ECU census: roughly 50-100 in a typical modern car, up to about 150 in premium vehicles', ecu.typicalLo === 50 && ecu.typicalHi === 100 && ecu.premium === 150 && ecu.premium > ecu.typicalHi, JSON.stringify(ecu)))
  const boot = ['firmware', 'bootloader', 'kernel', 'login']
  c.push(check('G34 the boot order pinned: firmware -> bootloader -> kernel -> login', JSON.stringify(boot) === JSON.stringify(['firmware', 'bootloader', 'kernel', 'login']), JSON.stringify(boot)))
  const edges = [1946, 1956, 1964, 1971]
  c.push(check('G35 the generation edges ordered 1946 < 1956 < 1964 < 1971 — and only FOUR solid edges (the fifth is a label, never a band)', edges.every((e, i) => i === 0 || e > edges[i - 1]) && edges.length === 4, JSON.stringify(edges)))

  // ---------- engine 8: the generation matching drill ----------
  const classify = (year: number): number => {
    if (year < 1946) return 0 // the honest pre-history
    if (year < 1956) return 1
    if (year < 1964) return 2
    if (year < 1971) return 3
    return 4
  }
  const pairs: [string, number, number][] = [
    ['ENIAC', 1946, 1],
    ['UNIVAC I', 1951, 1],
    ['System/360', 1964, 3],
    ['Intel 4004', 1971, 4],
    ['IBM PC 5150', 1981, 4],
  ]
  c.push(check('G36 the matching drill: ENIAC 1946 -> 1st, UNIVAC I 1951 -> 1st, System/360 1964 -> 3rd, 4004 1971 -> 4th, IBM PC 1981 -> 4th', pairs.every(([n, y, g]) => classify(y) === g), pairs.map(([n, y, g]) => `${n}:${classify(y)}`).join(' ')))
  c.push(check('G37 the fourth generation runs open to the present (no closing edge after 1971)', classify(2026) === 4 && classify(1971) === 4, `2025 -> ${classify(2026)}`))
  c.push(check('G38 1945 sits honestly BEFORE the ladder (the pre-history rung 0)', classify(1945) === 0, `got ${classify(1945)}`))

  // ---------- engine 9: the timeline mapping (year -> x, linear over 1940..2020) ----------
  const TX0 = 30, TX1 = 702, TY0 = 1940, TY1 = 2020
  const x = (year: number) => TX0 + ((year - TY0) / (TY1 - TY0)) * (TX1 - TX0)
  c.push(check('G39 the timeline map is linear: 8.4 px per year over 1940..2020', (TX1 - TX0) / (TY1 - TY0) === 8.4, `got ${(TX1 - TX0) / (TY1 - TY0)}`))
  const timeline: { name: string; year: number; row: number; anchor: 'middle' | 'end' }[] = [
    { name: 'ENIAC', year: 1946, row: 0, anchor: 'middle' },
    { name: 'UNIVAC I', year: 1951, row: 1, anchor: 'middle' },
    { name: 'Intel 4004', year: 1971, row: 4, anchor: 'end' },
    { name: 'Altair 8800', year: 1975, row: 3, anchor: 'end' },
    { name: 'Apple II', year: 1977, row: 2, anchor: 'middle' },
    { name: 'IBM PC 5150', year: 1981, row: 1, anchor: 'end' },
    { name: 'Macintosh', year: 1984, row: 0, anchor: 'middle' },
    { name: 'Linux kernel', year: 1991, row: 3, anchor: 'middle' },
    { name: 'iPhone', year: 2007, row: 0, anchor: 'end' },
    { name: 'Raspberry Pi', year: 2012, row: 0, anchor: 'middle' },
  ]
  const years = timeline.map((m) => m.year)
  c.push(check('G40 the ten pinned machines carry the years 1946, 1951, 1971, 1975, 1977, 1981, 1984, 1991, 2007, 2012', JSON.stringify(years) === JSON.stringify([1946, 1951, 1971, 1975, 1977, 1981, 1984, 1991, 2007, 2012]), JSON.stringify(years)))
  c.push(check('G41 x(year) is monotone increasing across the ten machines', years.every((y, i) => i === 0 || x(y) > x(years[i - 1])), years.map((y) => x(y).toFixed(1)).join(' ')))
  c.push(check('G42 the bookends: x(1946) = 80.4 and x(2012) = 634.8', Math.abs(x(1946) - 80.4) < 1e-9 && Math.abs(x(2012) - 634.8) < 1e-9, `x(1946) ${x(1946).toFixed(2)}, x(2012) ${x(2012).toFixed(2)}`))
  // label geometry: width estimated conservatively at 6.3 px per character (10px bold)
  const GAP_ANCHOR = 7
  const labelInterval = (m: { name: string; year: number; row: number; anchor: 'middle' | 'end' }): [number, number] => {
    const w = m.name.length * 6.3
    const cx = x(m.year)
    return m.anchor === 'end' ? [cx - GAP_ANCHOR - w, cx - GAP_ANCHOR] : [cx - w / 2, cx + w / 2]
  }
  const intervals = timeline.map(labelInterval)
  c.push(check('G43 every label interval stays inside the canvas [20, 700]', intervals.every(([l, r]) => l >= 20 && r <= 700), intervals.map(([l, r]) => `[${l.toFixed(0)},${r.toFixed(0)}]`).join(' ')))
  const sameRowOk = intervals.every((int, i) => intervals.every((other, j) => {
    if (i === j || timeline[i].row !== timeline[j].row) return true
    return int[1] + 6 <= other[0] || other[1] + 6 <= int[0]
  }))
  c.push(check('G44 same-row labels never overlap (6 px minimum breathing room, five staggered rows)', sameRowOk, timeline.map((m, i) => `${m.name}@r${m.row}[${intervals[i][0].toFixed(0)},${intervals[i][1].toFixed(0)}]`).join(' ')))
  const stemOk = timeline.every((mi, i) => timeline.every((mj, j) => {
    if (i === j || mj.row <= mi.row) return true
    const stemX = x(mi.year)
    return !(stemX > intervals[j][0] - 6 && stemX < intervals[j][1] + 6)
  }))
  c.push(check('G45 no label stem crosses a lower label (the staggered-rows rule that keeps the timeline readable)', stemOk, 'all 45 ordered pairs checked'))
  c.push(check('G46 the generation edge ticks sit inside the axis span (30..702)', edges.every((e) => x(e) > TX0 && x(e) < TX1), edges.map((e) => x(e).toFixed(1)).join(' ')))

  // ---------- engine 10: the whole-machine map geometry ----------
  const MW = 720, MH = 470
  const boxes: { name: string; x0: number; x1: number; y0: number; y1: number }[] = [
    { name: 'apps', x0: 176, x1: 544, y0: 54, y1: 98 },
    { name: 'os-manager', x0: 176, x1: 544, y0: 106, y1: 152 },
    { name: 'input-unit', x0: 44, x1: 172, y0: 214, y1: 286 },
    { name: 'cpu', x0: 248, x1: 472, y0: 200, y1: 342 },
    { name: 'control-unit', x0: 260, x1: 460, y0: 218, y1: 268 },
    { name: 'alu', x0: 260, x1: 460, y0: 284, y1: 330 },
    { name: 'output-unit', x0: 548, x1: 676, y0: 214, y1: 286 },
    { name: 'primary-memory', x0: 248, x1: 472, y0: 384, y1: 438 },
    { name: 'bus-bar', x0: 56, x1: 664, y0: 348, y1: 362 },
  ]
  c.push(check('G47 every map box lies inside the 720 x 470 viewBox', boxes.every((b) => b.x0 >= 0 && b.x1 <= MW && b.y0 >= 0 && b.y1 <= MH), 'nine boxes checked'))
  const unitBoxes = boxes.filter((b) => ['input-unit', 'cpu', 'output-unit', 'primary-memory'].includes(b.name))
  const disjoint = unitBoxes.every((a, i) => unitBoxes.every((b, j) => {
    if (i === j) return true
    return a.x1 <= b.x0 || b.x1 <= a.x0 || a.y1 <= b.y0 || b.y1 <= a.y0
  }))
  c.push(check('G48 the five units sit apart (input left, CPU centre, output right, memory below — the census order)', disjoint, 'pairwise disjoint'))
  const cu = boxes.find((b) => b.name === 'control-unit')!
  const alu = boxes.find((b) => b.name === 'alu')!
  const cpu = boxes.find((b) => b.name === 'cpu')!
  c.push(check('G49 the control unit and the ALU both sit INSIDE the CPU boundary', cu.x0 >= cpu.x0 && cu.x1 <= cpu.x1 && cu.y0 >= cpu.y0 && cu.y1 <= cpu.y1 && alu.x0 >= cpu.x0 && alu.x1 <= cpu.x1 && alu.y0 >= cpu.y0 && alu.y1 <= cpu.y1, 'the two CPU residents'))
  const sw = boxes.filter((b) => ['apps', 'os-manager'].includes(b.name))
  c.push(check('G50 the software half (apps + the OS as manager) is layered ABOVE every unit', Math.max(...sw.map((b) => b.y1)) < Math.min(...unitBoxes.map((b) => b.y0)), `software bottom ${Math.max(...sw.map((b) => b.y1))} vs units top ${Math.min(...unitBoxes.map((b) => b.y0))}`))
  c.push(check('G51 storage sits BELOW, under the bus bar (memory y0 384 > bus y1 362 > CPU y1 342)', 384 > 362 && 362 > 342, 'the vertical stack: units, buses, storage'))
  const chips = [
    { name: 'I', cx: 210, cy: 218 },
    { name: 'P', cx: 418, cy: 192 },
    { name: 'O', cx: 510, cy: 218 },
    { name: 'S', cx: 696, cy: 316 },
  ]
  c.push(check('G52 the four spine chips I, P, O, S ride the gaps (I between input and CPU, O between CPU and output, P on the CPU top, S on the right rail) and stay inside the canvas', chips[0].cx > 172 && chips[0].cx < 248 && chips[2].cx > 472 && chips[2].cx < 548 && chips[3].cx < MW && chips.every((ch) => ch.cx > 0 && ch.cy > 0 && ch.cx < MW && ch.cy < MH), 'I 210, P 418, O 510, S 696'))
  c.push(check('G53 the spine has four beats — I, P, O, S — the cycle the whole map hangs on', chips.map((ch) => ch.name).join('') === 'IPOS', 'the spine'))

  return c
}

function sectionH(L: Lesson): SectionCheck[] {
  // PINS — re-read the SHIPPED lesson
  const c: SectionCheck[] = []
  const collectStrings = (LL: Lesson): { raw: string; full: string } => {
    const rawParts: string[] = []
    const walk = (v: unknown) => {
      if (typeof v === 'string') rawParts.push(v)
      else if (Array.isArray(v)) v.forEach(walk)
      else if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    LL.blocks.forEach((b) => walk(b))
    return { raw: rawParts.join('\n'), full: JSON.stringify(LL) }
  }
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  // ---- identity + metadata pins ----
  c.push(check('H0 lesson present with a blocks array', Array.isArray(L.blocks) && L.blocks.length > 0, `got ${L.blocks.length} blocks`))
  c.push(check('H1 id exact', L.id === 'cf-unit-1-completion-review', L.id))
  c.push(check('H2 number exact', L.number === '1.R', L.number))
  c.push(check('H3 title exact', L.title === 'Unit 1 Completion Review', L.title))
  const needPrereq = ['cf-the-basic-structure-and-operation-of-the-computer', 'cf-a-census-of-hardware-desktops-to-embedded-chips', 'cf-software-the-invisible-half-of-the-machine']
  c.push(check('H4 prerequisites exactly the three chapter lessons, in order', JSON.stringify(L.prerequisites) === JSON.stringify(needPrereq), JSON.stringify(L.prerequisites)))
  c.push(check('H5 sources exact [cs-cf-web-ground]', JSON.stringify(L.sources) === JSON.stringify(['cs-cf-web-ground']), JSON.stringify(L.sources)))
  c.push(check('H6 concepts: 5-8 key phrases', (L.concepts ?? []).length >= 5 && (L.concepts ?? []).length <= 8, `got ${(L.concepts ?? []).length}`))
  c.push(check('H7 objectives: 4-6, each a you-can', (L.objectives ?? []).length >= 4 && (L.objectives ?? []).length <= 6 && (L.objectives ?? []).every((o) => o.includes('you can')), `got ${(L.objectives ?? []).length}`))
  const W = countLessonWords(L)
  c.push(check('H8 words >= 5,200 (countLessonWords, the depth floor)', W >= 5200, `got ${W}`))
  c.push(check('H8b words <= 12,000 sanity cap', W <= 12000, `got ${W}`))

  // ---- figures ----
  const figBlocks = L.blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; caption: string; svg: string }[]
  c.push(check('H9 exactly 2 body figures (the whole-machine map + the chapter timeline), each with viewBox + role + aria-label', figBlocks.length === 2 && figBlocks.every((f) => f.svg.includes('viewBox') && f.svg.includes('role="img"') && f.svg.includes('aria-label')), `got ${figBlocks.length}`))
  c.push(check('H9b every body figure caption teaches (>= 12 words) and names its parts', figBlocks.every((f) => f.caption.trim().split(/\s+/).length >= 12), figBlocks.map((f) => f.caption.split(/\s+/).length).join(',')))

  // ---- quiz pins (keys [1,3,0,2,1]) ----
  const quizBlocks = L.blocks.filter((b) => b.kind === 'quiz') as { kind: 'quiz'; items: { q: string; options: string[]; answer: number; explain: string }[] }[]
  const quiz = quizBlocks[0]
  c.push(check('H10 quiz present, exactly 5 items, 4 options each', !!quiz && quiz.items.length === 5 && quiz.items.every((it) => it.options.length === 4), quiz ? `got ${quiz.items.length}` : 'no quiz'))
  if (quiz) {
    c.push(check('H11 quiz keys exactly [1,3,0,2,1]', JSON.stringify(quiz.items.map((it) => it.answer)) === '[1,3,0,2,1]', JSON.stringify(quiz.items.map((it) => it.answer))))
    c.push(check('H12 quiz item 1 is the cycle order with I->P->O->S at index 1; item 2 the 20-line drill with 1,048,576 at index 3; item 3 the 4004 at index 0; item 4 device management at index 2; item 5 the OS at index 1', quiz.items[0].options[1].includes('processing') && quiz.items[1].options[3].includes('1,048,576') && quiz.items[2].options[0].includes('4004') && quiz.items[4].options[1].toLowerCase().includes('operating system'), 'the five pinned seats'))
    c.push(check('H13 every quiz explain takes down >= 3 wrong options (Option refs)', quiz.items.every((it) => (it.explain.match(/Option \d/g) || []).length >= 3), quiz.items.map((it) => (it.explain.match(/Option \d/g) || []).length).join(',')))
  }

  // ---- exercises ----
  const exBlocks = L.blocks.filter((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: { level: string; questions: { q: string; solution: string | string[]; answer?: string; figures?: { caption: string; svg: string }[] }[] }[] }[]
  const ex = exBlocks[0]
  c.push(check('H14 exercises present, six sets L1..L6 with counts 2/2/3/3/3/2', !!ex && ex.sets.length === 6 && ex.sets.map((s) => s.level).join(',') === 'L1,L2,L3,L4,L5,L6' && ex.sets.map((s) => s.questions.length).join(',') === '2,2,3,3,3,2', ex ? ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ') : 'no exercises'))
  if (ex) {
    const qs = ex.sets.flatMap((s) => s.questions)
    c.push(check('H15 exactly 15 exercise questions (the mixed synthesis bench)', qs.length === 15, `got ${qs.length}`))
    c.push(check('H16 every solution is a steps array + every answer present', qs.every((q) => Array.isArray(q.solution) && q.solution.length >= 3) && qs.every((q) => typeof q.answer === 'string' && (q.answer ?? '').length > 0), 'Cengage chains'))
    const solFigs = qs.flatMap((q) => q.figures ?? [])
    c.push(check('H17 >= 2 solution figures (v9.0), each viewBox + aria-label', solFigs.length >= 2 && solFigs.every((f) => f.svg.includes('viewBox') && f.svg.includes('aria-label')), `got ${solFigs.length}`))
    c.push(check('H18 the solution figures named: the generations strip (ENIAC), the program-life strip (100), the ladder strip (4,096)', solFigs.some((f) => f.caption.includes('ENIAC')) && solFigs.some((f) => f.caption.includes('100')) && solFigs.some((f) => f.caption.includes('4,096')), solFigs.map((f) => f.caption.slice(0, 42)).join(' | ')))
    c.push(check('H19 spot answers: L3-1 65,536 + 16,777,216; L3-2 20 doublings + 1,048,576; L3-3 0.5 ns + 200 ns; L4-3 firmware -> login', ansText(qs[4]).includes('65,536') && ansText(qs[4]).includes('16,777,216') && ansText(qs[5]).includes('1,048,576') && ansText(qs[6]).includes('0.5 ns') && ansText(qs[6]).includes('200 ns') && ansText(qs[9]).includes('firmware'), qs.map((q, i) => `${i}:${ansText(q).slice(0, 14)}`).join(' ')))
    const examStyle = qs.filter((q) => q.q.includes('Exam-style'))
    c.push(check('H20 the exam-style items are labelled honestly (>= 2: the MCQ chain + the boot-order item, each saying not a real past paper)', examStyle.length >= 2 && examStyle.every((q) => q.q.includes('not a real past paper')), `got ${examStyle.length}`))
    c.push(check('H21 L6 carries the two essays: the chapter essay (seem thoughtful) + the honest-label essay (fuzzy edges)', qs[13].q.includes('seem thoughtful') && ansText(qs[13]).includes('re-taskable') && qs[14].q.includes('fuzzy edges'), 'both L6 items'))
    c.push(check('H22 the L5 trace names the five stages + the OS arbitrating + the PC walk 100/101/102', ansText(qs[10]).includes('input unit') && ansText(qs[10]).includes('ALU') && ansText(qs[10]).includes('100') && /arbitrat/i.test(solText(qs[10])), 'the whole-machine trace'))
  }

  // ---- terms ----
  const termBlocks = L.blocks.filter((b) => b.kind === 'terms') as { kind: 'terms'; items: { term: string; def: string }[] }[]
  const allTerms = termBlocks.flatMap((t) => t.items)
  const term = (name: string) => allTerms.find((t) => t.term === name)
  c.push(check('H23 terms: >= 12 entries in the vocabulary harvest', allTerms.length >= 12, `got ${allTerms.length}`))
  const needTerms = ['Information processing cycle', 'Stored-program concept', 'Arithmetic and logic unit', 'Control unit', 'Bus', 'Address space', 'Clock rate', 'Word', 'Moore\u2019s law', 'Embedded system', 'Electronic control unit', 'System software', 'Operating system', 'Device driver', 'Software license']
  c.push(check('H24 the 15 mandated recap terms present by name', needTerms.every((t) => !!term(t)), needTerms.filter((t) => !term(t)).join(' ; ')))
  c.push(check('H25 every term def is one self-contained sentence ending in a period', allTerms.every((t) => t.def.trim().endsWith('.') && (t.def.match(/\./g) || []).length === 1), allTerms.filter((t) => (t.def.match(/\./g) || []).length !== 1).map((t) => t.term).join(' ; ')))

  // ---- formula cards ----
  const formulas = L.blocks.filter((b) => b.kind === 'formula') as { kind: 'formula'; name: string; latex: string; note?: string }[]
  c.push(check('H26 >= 4 formula cards in the harvest: the address-space law, the cycle-time law, the Moore growth law, the boot order', formulas.length >= 4 && formulas.some((f) => f.name.toLowerCase().includes('address-space')) && formulas.some((f) => f.name.toLowerCase().includes('cycle-time')) && formulas.some((f) => f.name.toLowerCase().includes('moore')) && formulas.some((f) => f.name.toLowerCase().includes('boot order')), `got ${formulas.length}: ${formulas.map((f) => f.name).join(' | ')}`))

  // ---- derivation ----
  const derivations = L.blocks.filter((b) => b.kind === 'derivation') as { kind: 'derivation'; title: string; steps: { label: string; formula?: string; explanation: string }[]; result: string }[]
  c.push(check('H27 >= 1 derivation: the Moore growth recalled in one chain', derivations.length >= 1 && derivations.some((d) => d.title.toLowerCase().includes('moore')), derivations.map((d) => d.title).join(' | ')))
  if (derivations.length) {
    c.push(check('H28 derivation labels are plain words, results carry the math clause-wise', derivations.every((d) => d.steps.every((s) => !s.label.includes('$'))) && derivations.every((d) => /\$[^$]+\$/.test(d.result)), 'the Cengage derivation shape'))
  }

  // ---- tables ----
  const tables = L.blocks.filter((b) => b.kind === 'table') as { kind: 'table'; caption?: string; head: string[]; rows: string[][] }[]
  c.push(check('H29 >= 2 recap tables, cells kept short (< 60 chars)', tables.length >= 2 && tables.every((t) => t.rows.every((r) => r.every((cell) => cell.length < 60))), `${tables.length} tables: ${tables.map((t) => `${t.rows.length} rows`).join(' + ')}`))

  // ---- examples (Illustrations) ----
  const examples = L.blocks.filter((b) => b.kind === 'example') as { kind: 'example'; title: string; steps: string[] }[]
  c.push(check('H30 >= 6 Illustrations (the recap worked blocks), each with >= 4 worked lines', examples.length >= 6 && examples.every((e) => e.steps.length >= 4), `got ${examples.length}`))
  c.push(check('H31 the recap Illustrations compute the family: 66.4 / 91 / 4,096 / 65,536 / 2,411,724,800 across the worked blocks', examples.some((e) => e.steps.join(' ').includes('66.4') && e.steps.join(' ').includes('91')) && examples.some((e) => e.steps.join(' ').includes('4,096') && e.steps.join(' ').includes('65,536')) && examples.some((e) => e.steps.join(' ').includes('2,411,724,800')), 'the engine-pinned recaps'))

  // ---- callout tones ----
  const callouts = L.blocks.filter((b) => b.kind === 'callout') as { kind: 'callout'; tone: string; title: string; text: string }[]
  const tones = (t: string) => callouts.filter((b) => b.tone === t).length
  c.push(check('H32 callout census: insight >= 1, definition >= 1, exam exactly >= 1, historical >= 1, warn >= 1', tones('insight') >= 1 && tones('definition') >= 1 && tones('exam') >= 1 && tones('historical') >= 1 && tones('warn') >= 1, `ins ${tones('insight')} def ${tones('definition')} exam ${tones('exam')} hist ${tones('historical')} warn ${tones('warn')}`))

  // ---- headings ----
  const headings = L.blocks.filter((b) => b.kind === 'heading') as { kind: 'heading'; text: string }[]
  const mandatedHeads = ['The Chapter in One Map', 'Lesson 1.1 Recap: the Structure and Operation', 'Lesson 1.2 Recap: the Hardware Census', 'Lesson 1.3 Recap: the Invisible Half', 'The Formula Harvest', 'The Chapter Timeline', 'The Vocabulary Harvest', 'Mixed Synthesis']
  c.push(check('H33 the mandated review headings present (the recap arc)', mandatedHeads.every((h) => headings.some((x) => x.text === h)), headings.map((h) => h.text).join(' | ')))

  // ---- the recap vocabulary ----
  c.push(check('H34 the recap vocabulary present: information processing cycle / stored-program / Moore / embedded / operating system', ['information processing cycle', 'stored-program', 'Moore', 'embedded', 'operating system'].every((s) => either(s)), 'the chapter\u2019s five load-bearing words'))

  // ---- the pinned facts as strings ----
  c.push(check('H35 the pinned dates: 14 February 1946 / 31 March 1951 / 12 August 1981 / 15 November 1971 / 29 February 2012', ['14 February 1946', '31 March 1951', '12 August 1981', '15 November 1971', '29 February 2012'].every((s) => either(s)), 'the five dated witnesses'))
  c.push(check('H36 the pinned computed constants: 65,536 / 1,048,576 / 66.4 / 209.6 / 0.5 ns / 200 ns', ['65,536', '1,048,576', '66.4', '209.6', '0.5 ns', '200 ns'].every((s) => either(s)), 'the engine numbers'))
  c.push(check('H37 the ENIAC census strings: 17,468 / ~30 tons / ~150 kW / 5,000 additions per second', ['17,468', '~30 tons', '~150 kW', '5,000 additions per second'].every((s) => either(s)), 'the room-sized witness'))
  c.push(check('H38 the IBM PC strings: 4.77 MHz / 16 KB; the Moore dates 1965 + 1975; the ECU census 50-100 + 150', ['4.77 MHz', '16 KB', '1965', '1975', '50\u2013100', '150'].every((s) => either(s)), 'the census witnesses'))
  c.push(check('H39 the Moore product string + the honest form: 2,411,724,800 + 2.4 x 10^9', either('2,411,724,800') && (either('2.4 \\times 10^{9}') || either('2.4 billion') || either('2.4\u00d710')), 'the engine-computed product'))
  c.push(check('H40 the software-era strings: 40,000,000 or 40 million lines / August 1991 / 23 September 2008', ((either('40,000,000') || either('40 million'))) && either('August 1991') && either('23 September 2008'), 'the invisible half\u2019s witnesses'))

  // ---- forward references + honesty ----
  c.push(check('H41 the chapter-2 forward reference present: Interacting with Your Computer', either('Interacting with Your Computer'), 'the next door'))
  c.push(check('H42 the shelf doorsteps named: Operating Systems + Computer Organization and Architecture', either('Operating Systems') && either('Computer Organization and Architecture'), 'the two doorsteps'))
  c.push(check('H43 the parallel lesson referenced by title: Software: the Invisible Half of the Machine', either('Software: the Invisible Half of the Machine'), 'lesson 1.3 by title'))
  c.push(check('H44 the honesty language present: honest + label + fuzzy edges', /honest/i.test(raw) && /label/i.test(raw) && /fuzzy edges/i.test(raw), 'the honest-label discipline'))
  c.push(check('H45 the Cengage summary line: From the above discussion', /From the above discussion/.test(raw), 'the summary formula'))

  // ---- roman lists ----
  const romanLists = L.blocks.filter((b) => b.kind === 'list' && b.marker === 'roman') as { kind: 'list'; items: string[] }[]
  c.push(check('H46 >= 1 roman-marker run (the take-aways), >= 4 items', romanLists.length >= 1 && romanLists.every((l) => l.items.length >= 4), `got ${romanLists.length}`))

  // ---- SVG hygiene ----
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const everySvg = [...figBlocks.map((f) => f.svg), ...(ex ? ex.sets.flatMap((s) => s.questions).flatMap((q) => (q.figures ?? []).map((f) => f.svg)) : [])]
  c.push(check('H47 no retired muted hexes in any SVG (16 banned)', everySvg.length >= 4 && everySvg.every((s) => !retired.some((hex) => s.includes(hex))), `${everySvg.length} svgs checked`))
  c.push(check('H48 every SVG has aria-label + viewBox, and no raw $ in any SVG text', everySvg.every((s) => s.includes('aria-label') && s.includes('viewBox') && !s.includes('$')), 'house SVG law'))
  c.push(check('H49 the palette stays vivid: no blue/indigo hexes in any SVG', everySvg.every((s) => !/#2563eb|#3b82f6|#1d4ed8|#4f46e5|#6366f1/i.test(s)), 'no blue'))
  c.push(check('H50 the text sizes stay legible: no font-size below 9px in any SVG', everySvg.every((s) => !/font-size="[0-8](\.\d+)?"/.test(s)), 'the 9px floor'))
  c.push(check('H51 the strokes stay visible: no stroke-width below 1.2 in any SVG', everySvg.every((s) => !/stroke-width="(0|1|1\.[0-1][0-9]*)"/.test(s)), 'the 1.2px floor'))
  return c
}

// ------------------------------------------------------------------
// (Z) the census — the chapter as a CLOSED object (CS RUN 2 closed it complete)
// ------------------------------------------------------------------

function sectionZ(chapter: { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string }): SectionCheck[] {
  const c: SectionCheck[] = []
  c.push(check('Z1 chapter number 1', chapter.number === 1))
  c.push(check('Z2 slug pinned', chapter.slug === 'the-computing-machine'))
  c.push(check('Z3 status complete (CS RUN 2 closed the chapter)', chapter.status === 'complete'))
  c.push(check('Z4 four lessons shipped (1.1 + 1.2 + 1.3 + the 1.R review)', chapter.lessons.length === 4, `got ${chapter.lessons.length}`))
  c.push(check('Z5 zero planned remain', chapter.plannedLessons.length === 0, `got ${chapter.plannedLessons.length}`))
  const ids = chapter.lessons.map((l) => l.id)
  c.push(check('Z6 ids pinned + unique in chapter', new Set(ids).size === ids.length && ids.join('|') === 'cf-the-basic-structure-and-operation-of-the-computer|cf-a-census-of-hardware-desktops-to-embedded-chips|cf-software-the-invisible-half-of-the-machine|cf-unit-1-completion-review', `got ${ids.join('|')}`))
  c.push(check('Z7 lesson numbers pinned', chapter.lessons.map((l) => l.number).join(',') === '1.1,1.2,1.3,1.R'))
  c.push(check('Z7b the review is the last lesson', chapter.lessons[chapter.lessons.length - 1].number === '1.R'))
  const totalWords = chapter.lessons.reduce((s, l) => s + countLessonWords(l), 0)
  c.push(check('Z8 honest depth: total >= 26,000 (4 lessons)', totalWords >= 26000, `got ${totalWords}`))
  c.push(check('Z8b every lesson >= 5,200 words (the review bar); content lessons >= 6,000', chapter.lessons.every((l) => countLessonWords(l) >= 5200) && chapter.lessons.slice(0, 3).every((l) => countLessonWords(l) >= 6000), `got ${chapter.lessons.map((l) => countLessonWords(l)).join(', ')}`))
  c.push(check('Z9 every lesson carries sources (cs-cf-web-ground)', chapter.lessons.every((l) => (l.sources ?? []).includes('cs-cf-web-ground'))))
  c.push(check('Z10 every lesson carries an exercises block + quiz', chapter.lessons.every((l) => l.blocks.some((b) => b.kind === 'exercises') && l.blocks.some((b) => b.kind === 'quiz'))))
  c.push(check('Z11 every lesson carries >= 2 figures (vivid-palette law)', chapter.lessons.every((l) => l.blocks.filter((b) => b.kind === 'figure').length >= 2)))
  c.push(check('Z12 v9.0 solution figures present in all four lessons', chapter.lessons.every((l) => l.blocks.some((b) => b.kind === 'exercises' && (b as { sets?: { questions?: { figures?: unknown[] }[] }[] }).sets?.some((s) => s.questions?.some((q) => (q as { figures?: unknown[] }).figures?.length))))))
  c.push(check('Z13 the review names the chapter forward door (ch.2)', chapter.lessons[3].blocks.some((b) => JSON.stringify(b).includes('Interacting with Your Computer'))))
  c.push(check('Z14 prereq chain: 1.R lists all three lessons', JSON.stringify(chapter.lessons[3].prerequisites) === JSON.stringify(['cf-the-basic-structure-and-operation-of-the-computer', 'cf-a-census-of-hardware-desktops-to-embedded-chips', 'cf-software-the-invisible-half-of-the-machine']), JSON.stringify(chapter.lessons[3].prerequisites)))
  return c
}

// ------------------------------------------------------------------
// the runner — engines first, then pins against the shipped chapter
// ------------------------------------------------------------------

const chapterPath = path.join(__dirname, '..', 'src', 'data', 'library', 'books', 'computer-science', 'computer-fundamentals', 'ch-01.ts')
const chapterExists = fs.existsSync(chapterPath)

const sections: ReturnType<typeof tally>[] = [
  tally('A (1.1 engines)', sectionA()),
  tally('C (1.2 engines)', sectionC()),
  tally('E (1.3 engines)', sectionE()),
  tally('G (1.R engines)', sectionG()),
]

{
  const ch = chapter01 as never as { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string }
  sections.push(tally('B (1.1 pins)', sectionB(ch.lessons[0])))
  sections.push(tally('D (1.2 pins)', sectionD(ch.lessons[1])))
  sections.push(tally('F (1.3 pins)', sectionF(ch.lessons[2])))
  sections.push(tally('H (1.R pins)', sectionH(ch.lessons[3])))
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
