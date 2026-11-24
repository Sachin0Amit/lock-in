import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — chapter 9 "Exponentials and Logarithms"
 * (authored by the RUN 120 SWARM, 2026-11-24, the owner's v9.0 "use multiple
 * agents or swarm of agents" directive: two parallel authoring agents — one
 * per lesson — each with its verify-first engine section grown green BEFORE
 * its prose; the orchestrator assembled, gated and shipped this file).
 *
 * PROVENANCE: ground = the Drive `M1 Trigonometry :: 1. Logarithm and Its
 * Properties` module (citation key `cengage-m1-01`, Drive id
 * `1hPWvsTTo3qv3jC9ir2Kx8qU_RnJ79F7V`, 27 MB scanned, 44 PDF pages; the
 * exp/log band printed 1.1–1.10, vision-transcribed per the v9.0 step-2b
 * amendment) + Hall & Knight's Higher Algebra logarithms arc
 * (`hall-knight-higher-algebra`, the 35-chapter TOC banked run 66) + the
 * JEE Main unit list (`jee-main-2026-syllabus`) + the Cengage presentation
 * contract (`cengage-jee-style`). STUDY-NEVER-REPRODUCE absolute: every
 * roster, witness, figure, Illustration, quiz item and exercise below is OUR
 * OWN, engine-pinned in scripts/verify-book4-ch09.ts.
 */
// ------------------------------------------------------------------
// lesson 9.1 — authored by the run-120 swarm (the aa91 agent), integrated verbatim
// ------------------------------------------------------------------

/**
 * Advanced Algebra — lesson 9.1 "The Exponential Family: Every Real Index"
 * (authored by the run-120 swarm's aa91 agent; every number engine-pinned in
 * temporary-references/v-aa91.ts BEFORE this prose was written — the A-section
 * engines ran 203/203 green first; the P-section pins re-read this file).
 *
 * PROVENANCE: the Cengage presentation contract (cengage-jee-style), the
 * Cengage Algebra-I exponentials band (cengage-m1-01), Hall & Knight Higher
 * Algebra's exponential chapters (hall-knight-higher-algebra) and the JEE Main
 * unit list (jee-main-2026-syllabus). STUDY-NEVER-REPRODUCE: every witness,
 * figure, Illustration, quiz item and exercise here is the platform's own,
 * engine-pinned in v-aa91.ts.
 *
 * SPEC-VS-ENGINE CATCHES (the engine won each time, and this prose carries
 * the engine's numbers): 2^{1.4143} = 2.665304 (not 2.665195); the first race
 * crossing is 1.3735 (not 1.3733548772); the flip-inequality boundary is
 * −1 and 3 (not 1 ± √5); the counting crossing is 1.7648 (not 1.7638); the
 * (2x−3)·2^x = 1 crossing is 1.6584 (not 1.6557); 1.05^{14} = 1.979932 to 6dp.
 */

/* ==================================================================== */
/* Figure helpers — every coordinate computed from named constants       */
/* ==================================================================== */

/* ------------------------------------------------------------------ */
/* Body figure 1 — the squeeze ladder (two magnified rungs)            */
/* ------------------------------------------------------------------ */
function squeezeLadderSvg(): string {
  const W = 720
  const H = 420
  // rung geometry: both rails span the same pixel window [X0, X1]
  const X0 = 90
  const X1 = 650
  const RAILW = X1 - X0
  // rung 1: index window [1.41, 1.42], value window [2.657372, 2.675855]
  const I1_LO = 1.41
  const I1_HI = 1.42
  const V1_LO = 2.657372
  const V1_HI = 2.675855
  const i1Px = (x: number) => X0 + ((x - I1_LO) / (I1_HI - I1_LO)) * RAILW
  const v1Px = (v: number) => X0 + ((v - V1_LO) / (V1_HI - V1_LO)) * RAILW
  // rung 2: index window [1.4142, 1.4143], value window [2.665119, 2.665304]
  const I2_LO = 1.4142
  const I2_HI = 1.4143
  const V2_LO = 2.665119
  const V2_HI = 2.665304
  const i2Px = (x: number) => X0 + ((x - I2_LO) / (I2_HI - I2_LO)) * RAILW
  const v2Px = (v: number) => X0 + ((v - V2_LO) / (V2_HI - V2_LO)) * RAILW
  // vertical placement
  const T_Y = 24
  const R1LBL_Y = 54
  const R1IDX_Y = 84
  const R1TICK_Y = 100
  const R1VAL_Y = 154
  const R1VTICK_Y = 170
  const R1BRK_Y = 186
  const R1BRKLBL_Y = 200
  const R2LBL_Y = 226
  const R2IDX_Y = 264
  const R2TICK_Y = 280
  const R2VAL_Y = 334
  const R2VTICK_Y = 350
  const R2BRK_Y = 368
  const R2BRKLBL_Y = 384
  // the engine-pinned marks
  const SQ2 = Math.SQRT2 // 1.4142135623730951
  const TARGET = 2.665144142690 // 2^{sqrt 2}

  const rail = (y: number) =>
    `<line x1="${X0}" y1="${y}" x2="${X1}" y2="${y}" stroke="#16a34a" stroke-width="2.2"/>`
  const tick = (x: number, y: number) =>
    `<line x1="${x}" y1="${y - 6}" x2="${x}" y2="${y + 6}" stroke="#16a34a" stroke-width="2"/>`
  const bracket = (xL: number, xR: number, y: number) =>
    `<line x1="${xL}" y1="${y}" x2="${xR}" y2="${y}" stroke="#d97706" stroke-width="1.6"/>` +
    `<line x1="${xL}" y1="${y}" x2="${xL}" y2="${y - 8}" stroke="#d97706" stroke-width="1.6"/>` +
    `<line x1="${xR}" y1="${y}" x2="${xR}" y2="${y - 8}" stroke="#d97706" stroke-width="1.6"/>`

  // rung 1 pieces
  const zoomIdxL = i1Px(I2_LO)
  const zoomIdxR = i1Px(I2_HI)
  const zoomValL = v1Px(V2_LO)
  const zoomValR = v1Px(V2_HI)
  const targetR1 = v1Px(TARGET)

  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The squeeze ladder for two to the square root of two. Two magnified rungs are drawn. Rung one shows an index rail from 1.41 to 1.42 with an amber magnifier window around the sub-window 1.4142 to 1.4143, and a value rail beneath it from 2.657372 to 2.675855 carrying an amber window at the tight band and an orange target dot at 2.665144; a bracket underneath reads band width 0.018483. Rung two magnifies the window one hundred times: an index rail from 1.4142 to 1.4143 with the square root of two marked by a dot at 1.4142136 between the end ticks, and a value rail from 2.665119 to 2.665304 with the target dot at 2.6651441427 and a bracket reading band width 0.000185. Dashed teal trumpet lines join the tiny rung-one window to the full rung-two rail, and dashed amber connectors map each index tick to its value tick. The caption reads: each rung magnifies one hundred times, the brackets nest, and the pinned target is 2.6651441427.">
  <text x="${W / 2}" y="${T_Y}" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the squeeze ladder: two brackets pin 2^√2 — each rung magnifies ×100</text>
  <text x="${W / 2}" y="${R1LBL_Y}" font-size="11" font-weight="600" text-anchor="middle" fill="#0d9488">rung 1 · the wide bracket on the window [1.41, 1.42]</text>
  ${rail(R1IDX_Y)}
  ${tick(i1Px(I1_LO), R1IDX_Y)}
  ${tick(i1Px(I1_HI), R1IDX_Y)}
  <rect x="${(zoomIdxL - 3).toFixed(1)}" y="${R1IDX_Y - 8}" width="${(zoomIdxR - zoomIdxL + 6).toFixed(1)}" height="16" fill="#ffedd5" stroke="#d97706" stroke-width="1.4"/>
  <text x="${i1Px(I1_LO)}" y="${R1TICK_Y}" font-size="11" text-anchor="middle" fill="#166534">1.41</text>
  <text x="${i1Px(I1_HI)}" y="${R1TICK_Y}" font-size="11" text-anchor="middle" fill="#166534">1.42</text>
  <line x1="${i1Px(I1_LO)}" y1="108" x2="${i1Px(I1_LO)}" y2="148" stroke="#d97706" stroke-width="1.4" stroke-dasharray="4 3"/>
  <line x1="${i1Px(I1_HI)}" y1="108" x2="${i1Px(I1_HI)}" y2="148" stroke="#d97706" stroke-width="1.4" stroke-dasharray="4 3"/>
  ${rail(R1VAL_Y)}
  ${tick(v1Px(V1_LO), R1VAL_Y)}
  ${tick(v1Px(V1_HI), R1VAL_Y)}
  <rect x="${(zoomValL - 3).toFixed(1)}" y="${R1VAL_Y - 8}" width="${(zoomValR - zoomValL + 6).toFixed(1)}" height="16" fill="#ffedd5" stroke="#d97706" stroke-width="1.4"/>
  <circle cx="${targetR1.toFixed(1)}" cy="${R1VAL_Y}" r="4.5" fill="#fef3c7" stroke="#ea580c" stroke-width="2"/>
  <text x="${targetR1.toFixed(1)}" y="${R1VAL_Y - 13}" font-size="9.5" text-anchor="middle" fill="#ea580c">2.665144…</text>
  <text x="${v1Px(V1_LO)}" y="${R1VTICK_Y}" font-size="11" text-anchor="middle" fill="#65a30d">2.657372</text>
  <text x="${v1Px(V1_HI)}" y="${R1VTICK_Y}" font-size="11" text-anchor="middle" fill="#65a30d">2.675855</text>
  ${bracket(X0, X1, R1BRK_Y)}
  <text x="${W / 2}" y="${R1BRKLBL_Y}" font-size="10" text-anchor="middle" fill="#d97706">band width 0.018483</text>
  <line x1="${zoomIdxL.toFixed(1)}" y1="${R1IDX_Y + 8}" x2="${X0}" y2="${R2IDX_Y - 8}" stroke="#0f766e" stroke-width="1.4" stroke-dasharray="5 4"/>
  <line x1="${zoomIdxR.toFixed(1)}" y1="${R1IDX_Y + 8}" x2="${X1}" y2="${R2IDX_Y - 8}" stroke="#0f766e" stroke-width="1.4" stroke-dasharray="5 4"/>
  <text x="330" y="124" font-size="10" text-anchor="middle" fill="#0f766e">magnify ×100</text>
  <text x="${W / 2}" y="${R2LBL_Y}" font-size="11" font-weight="600" text-anchor="middle" fill="#0d9488">rung 2 · the magnified window [1.4142, 1.4143]</text>
  ${rail(R2IDX_Y)}
  ${tick(i2Px(I2_LO), R2IDX_Y)}
  ${tick(i2Px(I2_HI), R2IDX_Y)}
  <circle cx="${i2Px(SQ2).toFixed(1)}" cy="${R2IDX_Y}" r="4.5" fill="#fef3c7" stroke="#166534" stroke-width="2"/>
  <text x="${i2Px(SQ2).toFixed(1)}" y="${R2IDX_Y - 18}" font-size="10" text-anchor="middle" fill="#166534">√2 ≈ 1.4142136</text>
  <text x="${i2Px(I2_LO)}" y="${R2TICK_Y}" font-size="11" text-anchor="middle" fill="#166534">1.4142</text>
  <text x="${i2Px(I2_HI)}" y="${R2TICK_Y}" font-size="11" text-anchor="middle" fill="#166534">1.4143</text>
  <line x1="${i2Px(SQ2).toFixed(1)}" y1="${R2IDX_Y + 6}" x2="${v2Px(TARGET).toFixed(1)}" y2="${R2VAL_Y - 6}" stroke="#d97706" stroke-width="1.4" stroke-dasharray="4 3"/>
  ${rail(R2VAL_Y)}
  ${tick(v2Px(V2_LO), R2VAL_Y)}
  ${tick(v2Px(V2_HI), R2VAL_Y)}
  <circle cx="${v2Px(TARGET).toFixed(1)}" cy="${R2VAL_Y}" r="4.5" fill="#fef3c7" stroke="#ea580c" stroke-width="2"/>
  <text x="${v2Px(TARGET).toFixed(1)}" y="${R2VTICK_Y}" font-size="9.5" text-anchor="middle" fill="#ea580c">2.6651441427…</text>
  <text x="${v2Px(V2_LO)}" y="${R2VTICK_Y}" font-size="11" text-anchor="middle" fill="#65a30d">2.665119</text>
  <text x="${v2Px(V2_HI)}" y="${R2VTICK_Y}" font-size="11" text-anchor="middle" fill="#65a30d">2.665304</text>
  ${bracket(X0, X1, R2BRK_Y)}
  <text x="${W / 2}" y="${R2BRKLBL_Y}" font-size="10" text-anchor="middle" fill="#d97706">band width 0.000185</text>
</svg>`
  return s
}

/* ------------------------------------------------------------------ */
/* Body figure 2 — the family portrait (five bases through (0, 1))     */
/* ------------------------------------------------------------------ */
function familyPortraitSvg(): string {
  const W = 720
  const H = 500
  // plot window: x ∈ [−1, 1.2], y ∈ [−0.5, 3.0]
  // (the y-window is widened from the sheet's 2.5 so the engine-pinned sample
  // 8^{0.5} = 2.828 fits on screen — the engine value wins)
  const PL = 70
  const PR = 660
  const PT = 40
  const PB = 440
  const XMIN = -1
  const XMAX = 1.2
  const YMIN = -0.5
  const YMAX = 3.0
  const xPx = (x: number) => PL + ((x - XMIN) / (XMAX - XMIN)) * (PR - PL)
  const yPx = (y: number) => PB - ((y - YMIN) / (YMAX - YMIN)) * (PB - PT)

  const CURVES: [number, string, string][] = [
    [8, '#16a34a', 'y = 8^x'],
    [5, '#0d9488', 'y = 5^x'],
    [3, '#65a30d', 'y = 3^x'],
    [0.4, '#d97706', 'y = 0.4^x'],
    [0.2, '#ea580c', 'y = 0.2^x'],
  ]

  const pathFor = (b: number): string => {
    const exitX = Math.log(YMAX) / Math.log(b) // b^exitX = YMAX
    const sx = b > 1 ? XMIN : Math.max(XMIN, exitX)
    const ex = b > 1 ? Math.min(XMAX, exitX) : XMAX
    let d = ''
    const N = 110
    for (let i = 0; i <= N; i++) {
      const x = sx + ((ex - sx) * i) / N
      const y = Math.pow(b, x)
      d += `${i === 0 ? 'M' : 'L'}${xPx(x).toFixed(1)},${yPx(y).toFixed(1)} `
    }
    return d.trim()
  }

  // sample dots at x = ±0.5 with hand-audited label pockets (no overlaps)
  const SAMPLES: { b: number; x: number; label: string; dx: number; dy: number; anchor: string }[] = [
    { b: 8, x: 0.5, label: '2.828', dx: -9, dy: 3.5, anchor: 'end' },
    { b: 5, x: 0.5, label: '2.236', dx: 9, dy: 10.5, anchor: 'start' },
    { b: 3, x: 0.5, label: '1.732', dx: 15, dy: 3.5, anchor: 'start' },
    { b: 0.4, x: 0.5, label: '0.632', dx: 8, dy: -12, anchor: 'start' },
    { b: 0.2, x: 0.5, label: '0.447', dx: -9, dy: 3.5, anchor: 'end' },
    { b: 0.2, x: -0.5, label: '2.236', dx: 9, dy: 3.5, anchor: 'start' },
    { b: 0.4, x: -0.5, label: '1.581', dx: 9, dy: 3.5, anchor: 'start' },
    { b: 3, x: -0.5, label: '0.577', dx: -8, dy: -12, anchor: 'end' },
    { b: 8, x: -0.5, label: '0.354', dx: 8, dy: 13, anchor: 'start' },
  ]
  // NOTE: the tenth sample, 5^{-0.5} = 0.447, is drawn as a dot but carries no
  // on-figure value label — the pocket around (−0.5, 0.447) is crossed by three
  // curves; the caption names it as the mirror of the labelled 0.2^{0.5}.

  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The exponential family portrait: the five curves y equals 8 to the x, y equals 5 to the x and y equals 3 to the x rising, and y equals 0.4 to the x and y equals 0.2 to the x falling, all through the shared point (0, 1). The x-axis runs from −1 to 1.2 and the y-axis from −0.5 to 3. Sample dots at x = 0.5 carry the values 2.828, 2.236, 1.732, 0.632 and 0.447; the dots at x = −0.5 carry 2.236, 1.581, 0.577 and 0.354, plus the unlabelled mirror dot 0.447. A legend box names each curve. The caption teaches: a steeper base gives a steeper curve in both directions, and every legal base passes through the one shared point (0, 1).">
  <text x="${W / 2}" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the exponential family portrait: five bases, one shared point (0, 1)</text>`
  // faint grid
  for (const gx of [-0.5, 0.5, 1]) {
    s += `<line x1="${xPx(gx).toFixed(1)}" y1="${PT}" x2="${xPx(gx).toFixed(1)}" y2="${PB}" stroke="#5eead4" stroke-width="1.2"/>`
  }
  for (const gy of [0.5, 1, 1.5, 2, 2.5]) {
    s += `<line x1="${PL}" y1="${yPx(gy).toFixed(1)}" x2="${PR}" y2="${yPx(gy).toFixed(1)}" stroke="#5eead4" stroke-width="1.2"/>`
  }
  // axes
  s += `<line x1="${PL}" y1="${yPx(0).toFixed(1)}" x2="${PR}" y2="${yPx(0).toFixed(1)}" stroke="#16a34a" stroke-width="2.2"/>`
  s += `<line x1="${xPx(0).toFixed(1)}" y1="${PT}" x2="${xPx(0).toFixed(1)}" y2="${PB}" stroke="#16a34a" stroke-width="2.2"/>`
  // axis tick labels
  for (const tx of [-1, -0.5, 0.5, 1, 1.2]) {
    s += `<text x="${xPx(tx).toFixed(1)}" y="${yPx(0) + 15}" font-size="10" text-anchor="middle" fill="#166534">${tx}</text>`
  }
  for (const ty of [0.5, 1, 1.5, 2, 2.5]) {
    s += `<text x="${PL - 8}" y="${(yPx(ty) + 3.5).toFixed(1)}" font-size="10" text-anchor="end" fill="#166534">${ty}</text>`
  }
  s += `<text x="${xPx(0) + 6}" y="${PT + 8}" font-size="11" fill="#166534">y</text>`
  s += `<text x="${PR + 8}" y="${yPx(0) + 4}" font-size="11" text-anchor="middle" fill="#166534">x</text>`
  // curves
  for (const [b, color] of CURVES) {
    s += `<path d="${pathFor(b)}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>`
  }
  // sample dots + labels
  for (const smp of SAMPLES) {
    const px = xPx(smp.x)
    const py = yPx(Math.pow(smp.b, smp.x))
    s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.2" fill="#ffffff" stroke="${CURVES.find((c) => c[0] === smp.b)![1]}" stroke-width="1.6"/>`
    s += `<text x="${(px + smp.dx).toFixed(1)}" y="${(py + smp.dy).toFixed(1)}" font-size="9.5" text-anchor="${smp.anchor}" fill="${CURVES.find((c) => c[0] === smp.b)![1]}">${smp.label}</text>`
  }
  // the unlabelled mirror dot 5^{-0.5} = 0.447
  s += `<circle cx="${xPx(-0.5).toFixed(1)}" cy="${yPx(Math.pow(5, -0.5)).toFixed(1)}" r="3.2" fill="#ffffff" stroke="#0d9488" stroke-width="1.6"/>`
  // the shared point (0, 1) — label rides in the verified clear pocket left of the
  // y-axis, with a leader to the point (the five curves crowd the point itself)
  s += `<circle cx="${xPx(0).toFixed(1)}" cy="${yPx(1).toFixed(1)}" r="5" fill="#fef3c7" stroke="#166534" stroke-width="2.4"/>`
  s += `<line x1="146" y1="252" x2="330" y2="265" stroke="#d97706" stroke-width="1.2"/>`
  s += `<text x="110" y="250" font-size="10" fill="#166534">(0, 1)</text>`
  // legend (verified clear pocket)
  s += `<rect x="240" y="42" width="128" height="56" rx="4" fill="#fef3c7" stroke="#16a34a" stroke-width="1.4"/>`
  let ly = 52
  for (const [b, color, name] of CURVES) {
    s += `<line x1="246" y1="${ly}" x2="258" y2="${ly}" stroke="${color}" stroke-width="2.4"/>`
    s += `<text x="262" y="${ly + 3.5}" font-size="10" fill="#166534">${name}</text>`
    ly += 10
  }
  s += `</svg>`
  return s
}

/* ------------------------------------------------------------------ */
/* Body figure 3 — the race: y = 2^x against y = x^3 (two windows)      */
/* ------------------------------------------------------------------ */
function raceSvg(): string {
  const W = 720
  const H = 780
  // window 1 (the start): x ∈ [0, 2.6], y ∈ [0, 16]
  const A_PL = 70
  const A_PR = 660
  const A_PT = 60
  const A_PB = 380
  const axPx = (x: number) => A_PL + (x / 2.6) * (A_PR - A_PL)
  const ayPx = (y: number) => A_PB - (y / 16) * (A_PB - A_PT)
  // window 2 (the long run): x ∈ [8, 11], y ∈ [0, 2100]
  const B_PL = 70
  const B_PR = 660
  const B_PT = 440
  const B_PB = 740
  const bxPx = (x: number) => B_PL + ((x - 8) / 3) * (B_PR - B_PL)
  const byPx = (y: number) => B_PB - (y / 2100) * (B_PB - B_PT)
  // engine-pinned crossings
  const C1 = 1.3734671197
  const C2 = 9.9395351414

  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The race between y equals 2 to the x and y equals x cubed, drawn in two true-to-scale windows. Window one, x from 0 to 2.6 and y from 0 to 16: the green exponential 2 to the x starts above the amber cubic at x = 0 and x = 1, the cubic overtakes at the crossing dot x ≈ 1.3735, and the cubic is above through the integers 2 to 9. Window two, x from 8 to 11 and y from 0 to 2100: the cubic leads at x = 9 where 512 is below 729, the exponential retakes the lead at the second crossing dot x ≈ 9.9395, and at x = 10 the value 1024 beats 1000. The caption reads: the slow starter wins the long run.">
  <text x="${W / 2}" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the race: y = 2^x against y = x³ — the slow starter wins the long run</text>
  <text x="${W / 2}" y="46" font-size="11" font-weight="600" text-anchor="middle" fill="#0d9488">window 1 · the start — x from 0 to 2.6, y from 0 to 16</text>`
  // window 1 grid + axes
  for (const gx of [0.5, 1, 1.5, 2, 2.5]) {
    s += `<line x1="${axPx(gx).toFixed(1)}" y1="${A_PT}" x2="${axPx(gx).toFixed(1)}" y2="${A_PB}" stroke="#5eead4" stroke-width="1.2"/>`
  }
  for (const gy of [4, 8, 12]) {
    s += `<line x1="${A_PL}" y1="${ayPx(gy).toFixed(1)}" x2="${A_PR}" y2="${ayPx(gy).toFixed(1)}" stroke="#5eead4" stroke-width="1.2"/>`
  }
  s += `<line x1="${A_PL}" y1="${A_PB}" x2="${A_PR}" y2="${A_PB}" stroke="#16a34a" stroke-width="2.2"/>`
  s += `<line x1="${A_PL}" y1="${A_PT}" x2="${A_PL}" y2="${A_PB}" stroke="#16a34a" stroke-width="2.2"/>`
  for (const tx of [0.5, 1, 1.5, 2, 2.5]) {
    s += `<text x="${axPx(tx).toFixed(1)}" y="${A_PB + 16}" font-size="10" text-anchor="middle" fill="#166534">${tx}</text>`
  }
  for (const ty of [4, 8, 12]) {
    s += `<text x="${A_PL - 8}" y="${(ayPx(ty) + 3.5).toFixed(1)}" font-size="10" text-anchor="end" fill="#166534">${ty}</text>`
  }
  // window 1 curves
  {
    let d1 = ''
    let d2 = ''
    const N = 120
    for (let i = 0; i <= N; i++) {
      const x = (2.6 * i) / N
      d1 += `${i === 0 ? 'M' : 'L'}${axPx(x).toFixed(1)},${ayPx(Math.pow(2, x)).toFixed(1)} `
      const y3 = x * x * x
      if (y3 <= 16) d2 += `${d2 === '' ? 'M' : 'L'}${axPx(x).toFixed(1)},${ayPx(y3).toFixed(1)} `
    }
    s += `<path d="${d1.trim()}" fill="none" stroke="#16a34a" stroke-width="2.6" stroke-linecap="round"/>`
    s += `<path d="${d2.trim()}" fill="none" stroke="#d97706" stroke-width="2.6" stroke-linecap="round"/>`
  }
  s += `<text x="600" y="302" font-size="10.5" fill="#16a34a">y = 2^x</text>`
  s += `<text x="392" y="262" font-size="10.5" fill="#d97706">y = x³</text>
  <line x1="412" y1="268" x2="436" y2="298" stroke="#d97706" stroke-width="1.2"/>`
  // crossing 1 + witness dots
  s += `<circle cx="${axPx(C1).toFixed(1)}" cy="${ayPx(Math.pow(2, C1)).toFixed(1)}" r="4.5" fill="#fef3c7" stroke="#166534" stroke-width="2"/>`
  s += `<line x1="${(axPx(C1) + 6).toFixed(1)}" y1="${(ayPx(Math.pow(2, C1)) - 6).toFixed(1)}" x2="${(axPx(C1) + 34).toFixed(1)}" y2="${(ayPx(Math.pow(2, C1)) + 12).toFixed(1)}" stroke="#d97706" stroke-width="1.2"/>`
  s += `<text x="${axPx(C1) + 66}" y="${ayPx(Math.pow(2, C1)) + 17}" font-size="10" text-anchor="middle" fill="#166534">x ≈ 1.3735</text>`
  s += `<circle cx="${axPx(1).toFixed(1)}" cy="${ayPx(2).toFixed(1)}" r="3" fill="#16a34a"/>`
  s += `<circle cx="${axPx(1).toFixed(1)}" cy="${ayPx(1).toFixed(1)}" r="3" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>`
  s += `<circle cx="${axPx(2).toFixed(1)}" cy="${ayPx(4).toFixed(1)}" r="3" fill="#16a34a"/>`
  s += `<circle cx="${axPx(2).toFixed(1)}" cy="${ayPx(8).toFixed(1)}" r="3" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>`
  // window 2
  s += `<text x="${W / 2}" y="428" font-size="11" font-weight="600" text-anchor="middle" fill="#0d9488">window 2 · the long run — x from 8 to 11, y from 0 to 2100</text>`
  for (const gx of [9, 10]) {
    s += `<line x1="${bxPx(gx).toFixed(1)}" y1="${B_PT}" x2="${bxPx(gx).toFixed(1)}" y2="${B_PB}" stroke="#5eead4" stroke-width="1.2"/>`
  }
  for (const gy of [500, 1000, 1500, 2000]) {
    s += `<line x1="${B_PL}" y1="${byPx(gy).toFixed(1)}" x2="${B_PR}" y2="${byPx(gy).toFixed(1)}" stroke="#5eead4" stroke-width="1.2"/>`
  }
  s += `<line x1="${B_PL}" y1="${B_PB}" x2="${B_PR}" y2="${B_PB}" stroke="#16a34a" stroke-width="2.2"/>`
  s += `<line x1="${B_PL}" y1="${B_PT}" x2="${B_PL}" y2="${B_PB}" stroke="#16a34a" stroke-width="2.2"/>`
  for (const tx of [8, 9, 10, 11]) {
    s += `<text x="${bxPx(tx).toFixed(1)}" y="${B_PB + 16}" font-size="10" text-anchor="middle" fill="#166534">${tx}</text>`
  }
  for (const ty of [500, 1000, 1500, 2000]) {
    s += `<text x="${B_PL - 8}" y="${(byPx(ty) + 3.5).toFixed(1)}" font-size="10" text-anchor="end" fill="#166534">${ty}</text>`
  }
  {
    let d1 = ''
    let d2 = ''
    const N = 120
    for (let i = 0; i <= N; i++) {
      const x = 8 + (3 * i) / N
      d1 += `${i === 0 ? 'M' : 'L'}${bxPx(x).toFixed(1)},${byPx(Math.pow(2, x)).toFixed(1)} `
      d2 += `${i === 0 ? 'M' : 'L'}${bxPx(x).toFixed(1)},${byPx(x * x * x).toFixed(1)} `
    }
    s += `<path d="${d1.trim()}" fill="none" stroke="#16a34a" stroke-width="2.6" stroke-linecap="round"/>`
    s += `<path d="${d2.trim()}" fill="none" stroke="#d97706" stroke-width="2.6" stroke-linecap="round"/>`
  }
  s += `<text x="560" y="470" font-size="10.5" text-anchor="end" fill="#16a34a">y = 2^x</text>`
  s += `<text x="655" y="545" font-size="10.5" text-anchor="end" fill="#d97706">y = x³</text>`
  // crossing 2 + witness dots
  s += `<circle cx="${bxPx(C2).toFixed(1)}" cy="${byPx(Math.pow(2, C2)).toFixed(1)}" r="4.5" fill="#fef3c7" stroke="#166534" stroke-width="2"/>`
  s += `<line x1="${(bxPx(C2) + 8).toFixed(1)}" y1="${(byPx(Math.pow(2, C2)) + 5).toFixed(1)}" x2="${(bxPx(C2) + 14).toFixed(1)}" y2="${(byPx(Math.pow(2, C2)) + 13).toFixed(1)}" stroke="#d97706" stroke-width="1.2"/>`
  s += `<text x="${bxPx(C2) + 24}" y="${byPx(Math.pow(2, C2)) + 22}" font-size="10" fill="#166534">x ≈ 9.9395</text>`
  s += `<circle cx="${bxPx(9).toFixed(1)}" cy="${byPx(512).toFixed(1)}" r="3" fill="#16a34a"/>`
  s += `<circle cx="${bxPx(9).toFixed(1)}" cy="${byPx(729).toFixed(1)}" r="3" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>`
  s += `<circle cx="${bxPx(10).toFixed(1)}" cy="${byPx(1024).toFixed(1)}" r="3" fill="#16a34a"/>`
  s += `<circle cx="${bxPx(10).toFixed(1)}" cy="${byPx(1000).toFixed(1)}" r="3" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>`
  s += `</svg>`
  return s
}

/* ------------------------------------------------------------------ */
/* Example figure — counting 3x − 5 = 2^{−x} (the single crossing)     */
/* ------------------------------------------------------------------ */
function countingExampleSvg(): string {
  const W = 720
  const H = 240
  // window: x ∈ [1.5, 2.0], y ∈ [−0.6, 1.1]
  const PL = 60
  const PR = 680
  const PT = 20
  const PB = 220
  const XMIN = 1.5
  const XMAX = 2.0
  const YMIN = -0.6
  const YMAX = 1.1
  const xPx = (x: number) => PL + ((x - XMIN) / (XMAX - XMIN)) * (PR - PL)
  const yPx = (y: number) => PB - ((y - YMIN) / (YMAX - YMIN)) * (PB - PT)
  const CROSS_X = 1.7647586
  const CROSS_Y = 0.2942758

  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The single crossing of the equation 3x minus 5 equals 2 to the minus x. A green rising straight line y equals 3x minus 5 crosses a gently falling amber curve y equals 2 to the minus x exactly once, at the dot marked x ≈ 1.7648 with y ≈ 0.2943. Two amber dashed vertical bracket lines at x = 1.7 and x = 1.8 bracket the crossing, and the caption notes f(1.7) is negative while f(1.8) is positive, so bisection pins the root between them.">
  <text x="${W / 2}" y="14" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">one crossing: the rising line 3x − 5 meets the falling curve 2^(−x)</text>`
  // x-axis (y = 0)
  s += `<line x1="${PL}" y1="${yPx(0).toFixed(1)}" x2="${PR}" y2="${yPx(0).toFixed(1)}" stroke="#16a34a" stroke-width="2.2"/>`
  for (const tx of [1.5, 1.6, 1.7, 1.8, 1.9, 2.0]) {
    s += `<line x1="${xPx(tx).toFixed(1)}" y1="${yPx(0) - 5}" x2="${xPx(tx).toFixed(1)}" y2="${yPx(0) + 5}" stroke="#16a34a" stroke-width="1.6"/>`
    s += `<text x="${xPx(tx).toFixed(1)}" y="${yPx(0) + 21}" font-size="9.5" text-anchor="middle" fill="#166534">${tx.toFixed(1)}</text>`
  }
  // the bracket 1.7 / 1.8
  for (const bx of [1.7, 1.8]) {
    s += `<line x1="${xPx(bx).toFixed(1)}" y1="${yPx(0) - 4}" x2="${xPx(bx).toFixed(1)}" y2="70" stroke="#d97706" stroke-width="1.6" stroke-dasharray="5 4"/>`
  }
  s += `<text x="${xPx(1.7).toFixed(1)}" y="${yPx(0) + 37}" font-size="9.5" text-anchor="middle" fill="#d97706">f(1.7) &lt; 0</text>`
  s += `<text x="${xPx(1.8).toFixed(1)}" y="${yPx(0) + 37}" font-size="9.5" text-anchor="middle" fill="#d97706">f(1.8) &gt; 0</text>`
  // the curve 2^{−x}
  {
    let d = ''
    const N = 120
    for (let i = 0; i <= N; i++) {
      const x = XMIN + ((XMAX - XMIN) * i) / N
      d += `${i === 0 ? 'M' : 'L'}${xPx(x).toFixed(1)},${yPx(Math.pow(2, -x)).toFixed(1)} `
    }
    s += `<path d="${d.trim()}" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>`
  }
  // the line 3x − 5 (in-window from y = −0.5 at x = 1.5)
  s += `<line x1="${xPx(1.5).toFixed(1)}" y1="${yPx(-0.5).toFixed(1)}" x2="${xPx(2.0).toFixed(1)}" y2="${yPx(1.0).toFixed(1)}" stroke="#16a34a" stroke-width="2.4"/>`
  s += `<text x="60" y="190" font-size="10" fill="#16a34a">y = 3x − 5</text>`
  s += `<text x="560" y="103" font-size="10" fill="#d97706">y = 2^(−x)</text>`
  // the crossing dot + label
  s += `<circle cx="${xPx(CROSS_X).toFixed(1)}" cy="${yPx(CROSS_Y).toFixed(1)}" r="4" fill="#fef3c7" stroke="#166534" stroke-width="2"/>`
  s += `<line x1="${(xPx(CROSS_X) - 4).toFixed(1)}" y1="${(yPx(CROSS_Y) - 8).toFixed(1)}" x2="${(xPx(CROSS_X) - 9).toFixed(1)}" y2="${(yPx(CROSS_Y) - 22).toFixed(1)}" stroke="#d97706" stroke-width="1.2"/>`
  s += `<text x="${(xPx(CROSS_X) - 10).toFixed(1)}" y="${(yPx(CROSS_Y) - 26).toFixed(1)}" font-size="9.5" text-anchor="middle" fill="#166534">x ≈ 1.7648</text>`
  s += `</svg>`
  return s
}

/* ------------------------------------------------------------------ */
/* Solution figure L2(b) — the nested bands on a value scale           */
/* ------------------------------------------------------------------ */
function nestedBandsSvg(): string {
  const W = 720
  const H = 240
  const L = 60
  const R = 660
  // rail 1: the parent band [2.657372, 2.675855]
  const V1_LO = 2.657372
  const V1_HI = 2.675855
  const v1Px = (v: number) => L + ((v - V1_LO) / (V1_HI - V1_LO)) * (R - L)
  // rail 2: the tight band [2.665119, 2.665304]
  const V2_LO = 2.665119
  const V2_HI = 2.665304
  const v2Px = (v: number) => L + ((v - V2_LO) / (V2_HI - V2_LO)) * (R - L)
  const TARGET = 2.665144142690

  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The nested bands pinning two to the square root of two. A parent value rail runs from 2.657372 to 2.675855 with an amber window around the tight band and an orange target dot at 2.665144. Dashed teal trumpet lines magnify that window into a second rail from 2.665119 to 2.665304, on which the target dot sits at 2.6651441427. A bracket underneath the second rail reads band width 0.000185. The caption reads: the bands nest, and the inner band already pins the target to six decimal places.">
  <text x="${W / 2}" y="22" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">two nested bands pin 2^√2</text>
  <text x="${W / 2}" y="50" font-size="10" text-anchor="middle" fill="#0d9488">the parent band [2.657372, 2.675855] — width 0.018483</text>
  <line x1="${L}" y1="68" x2="${R}" y2="68" stroke="#16a34a" stroke-width="2.2"/>
  <line x1="${L}" y1="62" x2="${L}" y2="74" stroke="#16a34a" stroke-width="2"/>
  <line x1="${R}" y1="62" x2="${R}" y2="74" stroke="#16a34a" stroke-width="2"/>
  <rect x="${(v1Px(V2_LO) - 3).toFixed(1)}" y="60" width="${(v1Px(V2_HI) - v1Px(V2_LO) + 6).toFixed(1)}" height="16" fill="#ffedd5" stroke="#d97706" stroke-width="1.4"/>
  <circle cx="${v1Px(TARGET).toFixed(1)}" cy="68" r="3.5" fill="#fef3c7" stroke="#ea580c" stroke-width="1.8"/>
  <text x="${L}" y="84" font-size="10" text-anchor="middle" fill="#65a30d">2.657372</text>
  <text x="${R}" y="84" font-size="10" text-anchor="middle" fill="#65a30d">2.675855</text>
  <line x1="${v1Px(V2_LO).toFixed(1)}" y1="76" x2="${L}" y2="158" stroke="#0f766e" stroke-width="1.4" stroke-dasharray="5 4"/>
  <line x1="${v1Px(V2_HI).toFixed(1)}" y1="76" x2="${R}" y2="158" stroke="#0f766e" stroke-width="1.4" stroke-dasharray="5 4"/>
  <text x="${W / 2}" y="118" font-size="10" text-anchor="middle" fill="#0f766e">magnify ×100</text>
  <line x1="${L}" y1="170" x2="${R}" y2="170" stroke="#16a34a" stroke-width="2.2"/>
  <line x1="${L}" y1="164" x2="${L}" y2="176" stroke="#16a34a" stroke-width="2"/>
  <line x1="${R}" y1="164" x2="${R}" y2="176" stroke="#16a34a" stroke-width="2"/>
  <circle cx="${v2Px(TARGET).toFixed(1)}" cy="170" r="4" fill="#fef3c7" stroke="#ea580c" stroke-width="2"/>
  <text x="${v2Px(TARGET).toFixed(1)}" y="156" font-size="9.5" text-anchor="middle" fill="#ea580c">2.6651441427…</text>
  <text x="${L}" y="222" font-size="10" text-anchor="middle" fill="#65a30d">2.665119</text>
  <text x="${R}" y="222" font-size="10" text-anchor="middle" fill="#65a30d">2.665304</text>
  <line x1="${L}" y1="188" x2="${R}" y2="188" stroke="#d97706" stroke-width="1.6"/>
  <line x1="${L}" y1="188" x2="${L}" y2="180" stroke="#d97706" stroke-width="1.6"/>
  <line x1="${R}" y1="188" x2="${R}" y2="180" stroke="#d97706" stroke-width="1.6"/>
  <text x="${W / 2}" y="204" font-size="10" text-anchor="middle" fill="#d97706">the tight band [2.665119, 2.665304] — width 0.000185</text>
</svg>`
  return s
}

/* ------------------------------------------------------------------ */
/* Solution figure L3(c) — the 1.12^n staircase against y = 2          */
/* ------------------------------------------------------------------ */
function staircaseSvg(): string {
  const W = 720
  const H = 240
  const PL = 70
  const PR = 650
  const NMAX = 9
  const nPx = (n: number) => PL + (n / NMAX) * (PR - PL)
  // y window [0.8, 2.6] mapped to [200, 30]
  const YLO = 0.8
  const YHI = 2.6
  const yPx = (y: number) => 200 - ((y - YLO) / (YHI - YLO)) * 170
  const DOUBLING_PY = yPx(2)
  const N_EXACT = 6.1162554 // ln 2 / ln 1.12, engine-bisected

  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The staircase of 1.12 to the n against the doubling line y equals 2. The orange dashed doubling line runs horizontally at y = 2. The green staircase of yearly growth factors 1.12 to the n climbs from 1 at n = 0, passing the labelled values 1.9738 at n = 6 and 2.2107 at n = 7, so it crosses the doubling line between years 6 and 7. An amber dashed vertical guide marks the exact doubling time n ≈ 6.1163 between those risers. The caption reads: doubling needs 6.1163 years, and the rule of 72 estimates 6.">
  <text x="${W / 2}" y="22" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the 1.12^n staircase against the doubling line y = 2</text>`
  // y gridlines at 1, 1.5, 2.5 (2 is the doubling line)
  for (const gy of [1, 1.5, 2.5]) {
    s += `<line x1="${PL}" y1="${yPx(gy).toFixed(1)}" x2="${PR}" y2="${yPx(gy).toFixed(1)}" stroke="#5eead4" stroke-width="1.2"/>`
  }
  for (const gy of [1, 1.5, 2, 2.5]) {
    s += `<text x="${PL - 8}" y="${(yPx(gy) + 3.5).toFixed(1)}" font-size="9.5" text-anchor="end" fill="#166534">${gy}</text>`
  }
  // n-axis
  s += `<line x1="${PL}" y1="200" x2="${PR}" y2="200" stroke="#16a34a" stroke-width="2.2"/>`
  for (let n = 0; n <= NMAX; n++) {
    s += `<text x="${nPx(n).toFixed(1)}" y="216" font-size="10" text-anchor="middle" fill="#166534">${n}</text>`
  }
  // the doubling line
  s += `<line x1="${PL}" y1="${DOUBLING_PY.toFixed(1)}" x2="${PR}" y2="${DOUBLING_PY.toFixed(1)}" stroke="#ea580c" stroke-width="2.2" stroke-dasharray="7 5"/>`
  s += `<text x="648" y="80" font-size="9.5" text-anchor="end" fill="#ea580c">y = 2 — doubling</text>`
  // the staircase: risers and treads from n = 0 to 8
  for (let n = 0; n <= 8; n++) {
    const v = Math.pow(1.12, n)
    if (n < 8) {
      const vn = Math.pow(1.12, n + 1)
      s += `<line x1="${nPx(n).toFixed(1)}" y1="${yPx(v).toFixed(1)}" x2="${nPx(n + 1).toFixed(1)}" y2="${yPx(v).toFixed(1)}" stroke="#16a34a" stroke-width="2.4"/>`
      s += `<line x1="${nPx(n + 1).toFixed(1)}" y1="${yPx(v).toFixed(1)}" x2="${nPx(n + 1).toFixed(1)}" y2="${yPx(vn).toFixed(1)}" stroke="#16a34a" stroke-width="2.4"/>`
    }
    s += `<circle cx="${nPx(n).toFixed(1)}" cy="${yPx(v).toFixed(1)}" r="3" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
  }
  // value labels at n = 6 and n = 7
  s += `<text x="${(nPx(6) - 9).toFixed(1)}" y="${(yPx(Math.pow(1.12, 6)) + 10.5).toFixed(1)}" font-size="9.5" text-anchor="end" fill="#166534">1.9738</text>`
  s += `<text x="${nPx(7).toFixed(1)}" y="${(yPx(Math.pow(1.12, 7)) - 11).toFixed(1)}" font-size="9.5" text-anchor="middle" fill="#166534">2.2107</text>`
  // the exact doubling-time guide
  s += `<line x1="${nPx(N_EXACT).toFixed(1)}" y1="${DOUBLING_PY.toFixed(1)}" x2="${nPx(N_EXACT).toFixed(1)}" y2="200" stroke="#d97706" stroke-width="1.6" stroke-dasharray="5 4"/>`
  s += `<text x="${nPx(N_EXACT).toFixed(1)}" y="78" font-size="9.5" text-anchor="middle" fill="#d97706">n ≈ 6.1163</text>`
  s += `</svg>`
  return s
}

/* ------------------------------------------------------------------ */
/* Solution figure L4(b) — the single crossing of 2x − 3 = 2^{−x}     */
/* ------------------------------------------------------------------ */
function crossingL4Svg(): string {
  const W = 720
  const H = 240
  // window: x ∈ [1.3, 1.9], y ∈ [−0.5, 0.8]
  const PL = 60
  const PR = 680
  const PT = 20
  const PB = 220
  const XMIN = 1.3
  const XMAX = 1.9
  const YMIN = -0.5
  const YMAX = 0.8
  const xPx = (x: number) => PL + ((x - XMIN) / (XMAX - XMIN)) * (PR - PL)
  const yPx = (y: number) => PB - ((y - YMIN) / (YMAX - YMIN)) * (PB - PT)
  const CROSS_X = 1.6583956
  const CROSS_Y = 0.3167912

  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The single crossing of the rewritten equation 2x minus 3 equals 2 to the minus x. A green rising straight line y equals 2x minus 3 crosses a gently falling amber curve y equals 2 to the minus x exactly once, at the dot marked x ≈ 1.6584. Two amber dashed vertical bracket lines at x = 1.6 and x = 1.7 bracket the crossing; the caption notes h(1.6) is negative while h(1.7) is positive, so bisection pins the unique root between them.">
  <text x="${W / 2}" y="14" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">one crossing: the rising line 2x − 3 meets the falling curve 2^(−x)</text>`
  s += `<line x1="${PL}" y1="${yPx(0).toFixed(1)}" x2="${PR}" y2="${yPx(0).toFixed(1)}" stroke="#16a34a" stroke-width="2.2"/>`
  for (const tx of [1.4, 1.5, 1.6, 1.7, 1.8]) {
    s += `<line x1="${xPx(tx).toFixed(1)}" y1="${yPx(0) - 5}" x2="${xPx(tx).toFixed(1)}" y2="${yPx(0) + 5}" stroke="#16a34a" stroke-width="1.6"/>`
    s += `<text x="${xPx(tx).toFixed(1)}" y="${yPx(0) + 21}" font-size="9.5" text-anchor="middle" fill="#166534">${tx.toFixed(1)}</text>`
  }
  for (const bx of [1.6, 1.7]) {
    s += `<line x1="${xPx(bx).toFixed(1)}" y1="${yPx(0) - 4}" x2="${xPx(bx).toFixed(1)}" y2="60" stroke="#d97706" stroke-width="1.6" stroke-dasharray="5 4"/>`
  }
  s += `<text x="${xPx(1.6).toFixed(1)}" y="${yPx(0) + 37}" font-size="9.5" text-anchor="middle" fill="#d97706">h(1.6) &lt; 0</text>`
  s += `<text x="${xPx(1.7).toFixed(1)}" y="${yPx(0) + 37}" font-size="9.5" text-anchor="middle" fill="#d97706">h(1.7) &gt; 0</text>`
  {
    let d = ''
    const N = 120
    for (let i = 0; i <= N; i++) {
      const x = XMIN + ((XMAX - XMIN) * i) / N
      d += `${i === 0 ? 'M' : 'L'}${xPx(x).toFixed(1)},${yPx(Math.pow(2, -x)).toFixed(1)} `
    }
    s += `<path d="${d.trim()}" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linecap="round"/>`
  }
  s += `<line x1="${xPx(1.3).toFixed(1)}" y1="${yPx(-0.4).toFixed(1)}" x2="${xPx(1.9).toFixed(1)}" y2="${yPx(0.8).toFixed(1)}" stroke="#16a34a" stroke-width="2.4"/>`
  s += `<text x="160" y="196" font-size="10" fill="#16a34a">y = 2x − 3</text>`
  s += `<text x="590" y="118" font-size="10" fill="#d97706">y = 2^(−x)</text>`
  s += `<circle cx="${xPx(CROSS_X).toFixed(1)}" cy="${yPx(CROSS_Y).toFixed(1)}" r="4" fill="#fef3c7" stroke="#166534" stroke-width="2"/>`
  s += `<line x1="${(xPx(CROSS_X) + 4).toFixed(1)}" y1="${(yPx(CROSS_Y) - 4).toFixed(1)}" x2="${(xPx(CROSS_X) + 12).toFixed(1)}" y2="${(yPx(CROSS_Y) - 20).toFixed(1)}" stroke="#d97706" stroke-width="1.2"/>`
  s += `<text x="${(xPx(CROSS_X) + 15).toFixed(1)}" y="${(yPx(CROSS_Y) - 24).toFixed(1)}" font-size="9.5" text-anchor="end" fill="#166534">x ≈ 1.6584</text>`
  s += `</svg>`
  return s
}

/* ==================================================================== */
/* Lesson 9.1                                                           */
/* ==================================================================== */

export const lesson91: Lesson = {
  id: 'aa-the-exponential-family-every-real-index',
  number: '9.1',
  title: 'The Exponential Family: Every Real Index',
  concepts: [
    'the exponential function',
    'real index by squeezing',
    'growth and decay families',
    'the horizontal asymptote',
    'percent growth and the rule of 72',
    'exponential versus polynomial races',
    'same-base equations',
    'the decay flip',
  ],
  objectives: [
    'Define the exponential function $f(x) = a^x$ for every real index $x$ — the rational rungs through roots, the irrational rung through squeezing — and justify the base restrictions $a > 0$ with $a \\neq 1$ as closure stories.',
    'Prove the shape laws from the exponent laws: strict increase for $a > 1$, strict decrease for $0 < a < 1$, the shared point $(0, 1)$, the range $(0, \\infty)$ and the horizontal asymptote $y = 0$.',
    'Read the family qualitatively: the mirror $(1/2)^x = 2^{-x}$, the percent reading $a = 1 + r$ and its decay mirror, and the steeper-base principle in both directions.',
    'Price compound growth: evaluate $A(n) = P(1 + r)^n$, bracket doubling times between integer powers, and treat the rule of 72 as an estimate checked against the engine.',
    'Solve same-base equations and inequalities — including the decay-base flip and the $|\\text{base}|^{\\text{exponent}} = 1$ case split with the $0^0$ guard.',
    'Count the solutions of mixed equations such as $3x - 5 = 2^{-x}$ by the monotonicity discipline (a rising line against a falling curve) plus bracket bisection.',
  ],
  prerequisites: ['al-powers-and-the-laws-of-exponents', 'al-zero-and-negative-exponents-another-repair', 'ans-how-irrationals-behave'],
  sources: ['cengage-m1-01', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Elementary Algebra banked the exponent laws twice over. Its lesson 2.1, Powers and the Laws of Exponents, built $a^m \\cdot a^n = a^{m+n}$ and the companion laws by counting copies, for positive whole indices; its lesson 2.2, Zero and Negative Exponents: Another Repair, extended the family to $0$ and negative indices by the permanence principle — the laws were kept, and the notation was repaired to make them keepable. That is the whole banked fortune: a family $a^x$ defined for every INTEGER $x$, with laws that never fail. One wall of that bank has never been touched: the index $x$ has always been a whole number, or a repaired version of one.' },
    { kind: 'para', text: 'The ladder has a last rung, and the previous shelf already proved it is unreachable by counting. The unit How Irrationals Behave proved that $\\sqrt{2}$ is irrational and then showed how irrationals are handled at all: by squeezing them between rational bounds — $1.41 < \\sqrt{2} < 1.42$, and tighter whenever wanted. So the symbol $2^{\\sqrt{2}}$ is a question the banked laws cannot even STATE: there is no count of copies to perform, no repair to inherit, no integer anywhere. If the exponent family is to cover every real index — as science, finance and every growth model demand — the rung must be built from outside the integer world.' },
    { kind: 'para', text: 'This lesson builds it. First the rational rungs are collected into one permanent definition; then the irrational rung is built by squeezing, honestly, with the exact status of every claim declared; then the whole family $f(x) = a^x$ is studied as a machine — its shape, its growth pricing, and its first craft. No lesson of this book starts at the definition, and this one will not either: the squeeze comes first, because the definition is nothing but the squeeze with a name attached.' },

    { kind: 'heading', text: 'From Integer Indices to Every Real Index' },
    { kind: 'para', text: 'The rational rungs were climbed before this book, and the climb is recalled in one paragraph, not re-taught. For a positive base $a$ and a fraction $p/q$ in lowest terms, the symbol $a^{p/q}$ is defined to be the $q$-th root of $a$ raised to the $p$-th power — the root language that the unit on irrationals built when it squeezed $\\sqrt{2}$ between rational squares. The permanence principle of Elementary Algebra 2.2 is the standing charter: every extension of the family must KEEP the laws, and the rational extension does — the product, quotient and power laws survive every rational index, which is why the rung is considered banked rather than new.' },
    { kind: 'equation', latex: 'a^{p/q} = \\left(\\sqrt[q]{a}\\right)^{p}, \\qquad a > 0 \\tag{1}', note: 'the rational rung: the $q$-th root raised to the $p$-th power — the root language of the irrationals unit, kept permanent by the laws of Elementary Algebra 2.1 and 2.2.' },
    { kind: 'para', text: 'Now the honest gap. Between the rationals sit the irrationals, and $\\sqrt{2}$ is the smallest witness of the species. The squeeze idea from the previous shelf is the only tool available: since $2^x$ is increasing in $x$, any rational bracket around $\\sqrt{2}$ should drag a bracket around $2^{\\sqrt{2}}$, and tightening the input bracket should tighten the output bracket. That sentence is the entire content of this rung — everything else is discipline and computation.' },
    { kind: 'derivation', title: 'The squeeze pins the irrational index', statement: 'If $1.41 < \\sqrt{2} < 1.42$, then $2^{1.41} < 2^{\\sqrt{2}} < 2^{1.42}$; tightening the rational bracket tightens the value bracket, and the nested brackets pin one single value, which is DEFINED to be $2^{\\sqrt{2}}$.', steps: [
      { label: 'Rational rungs are banked', formula: 'r \\mapsto 2^r \\text{ strictly increasing on the rationals } (r)', explanation: 'for rational $r$ the comparison law is banked from the root and power laws on positives: a growth base to a larger rational index gives a larger value. This is inheritance, not a new proof — the rungs below were climbed on the previous shelf.' },
      { label: 'Carry the bracket across', formula: '1.41 < \\sqrt{2} < 1.42 \\;\\Longrightarrow\\; 2^{1.41} < 2^{\\sqrt{2}} < 2^{1.42}', explanation: 'monotonicity transfers an inequality on indices to the same inequality on values. Read carefully, this move is not a theorem ABOUT $2^{\\sqrt{2}}$ — it is the move that GIVES the symbol its meaning: the middle entry is declared to be whatever the bracket pins.' },
      { label: 'Compute the ends of the wide band', formula: '2^{1.41} = 2.657372, \\qquad 2^{1.42} = 2.675855', explanation: 'engine-computed to six decimals. The irrational power is now boxed in a band of width $2.675855 - 2.657372 = 0.018483$ — not yet a value, but a cage.' },
      { label: 'Tighten the rational bracket', formula: '1.4142 < \\sqrt{2} < 1.4143 \\;\\Longrightarrow\\; 2.665119 < 2^{\\sqrt{2}} < 2.665304', explanation: 'the better rational bracket (from $\\sqrt{2} \\approx 1.4142136$) narrows the band to width $0.000185$ — one hundredth of the first band, from one hundredth of the index slack. The cage is closing exactly in step with the input.' },
      { label: 'Declare the pinned value', formula: '2^{\\sqrt{2}} := 2.6651441427\\ldots', explanation: 'the band $[2.665119, 2.665304]$ traps the target; one more rung, $1.41421 < \\sqrt{2} < 1.41422$, gives the band $[2.665138, 2.665156]$ of width $0.000018$. Every rung narrows the cage, the cages nest, and the value they converge on is given the name $2^{\\sqrt{2}}$. To four decimals: $2.6651$.' },
    ], result: 'the nested brackets pin $2^{\\sqrt{2}} = 2.6651441427\\ldots$ — defined by squeezing, honest to four decimals as $2.6651$, and refinable to any accuracy by one more rational rung' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the honest status of the squeeze definition', text: 'The sentence "$a^x$ for irrational $x$ is the value the squeeze pins" is a DEFINITION, not a theorem. Two deeper facts stand behind it and are NOT proved here: first, that the nested bands actually converge on something (completeness of the reals — the promise that bounded nested intervals pin exactly one number — which is the doorstep of chapter 10 of this book); second, that the exponent LAWS survive the irrational rung. This book’s discipline is honest verification: the laws are checked numerically on irrational witnesses by the engine, exactly as the product law is checked below, and the full proofs belong to the completeness chapter. Until then, squeeze first, verify numerically, and say so.' },
    { kind: 'callout', tone: 'historical', title: 'Euler, Dedekind, and a definition two centuries apart', text: 'Euler’s Introductio in analysin infinitorum (1748) already treated $a^z$ for variable $z$ by leaning on logarithms — the inverse machine this chapter builds next — and left the irrational case to that inversion. The squeeze definition used here, pinning $a^x$ between rational bounds, is the reverse order of business, and the license for it is much younger than Euler: Dedekind’s 1872 cut construction is what ultimately guarantees that bounded nested intervals close on exactly one real number. The definition this lesson uses by honesty is, in other words, two centuries younger than the notation it defines — a gap worth knowing exists.' },
    { kind: 'para', text: 'One numerical witness before the formal definition, because it shows the laws surviving the new rung. Take the two irrational indices $\\sqrt{2}$ and $2 - \\sqrt{2}$ — their sum is exactly $2$. The product law, banked for integer and rational indices, predicts that the two irrational powers multiply to $2^2$:' },
    { kind: 'equation', latex: '2^{\\sqrt{2}} \\cdot\\; 2^{2 - \\sqrt{2}} = 2^{\\sqrt{2}\\; +\\; 2 - \\sqrt{2}} = 2^{2} = 4 \\tag{2}', note: 'the law witness: two irrational indices with an integer sum — the engine computes $2^{\\sqrt{2}} \\approx 2.6651$ and $2^{2-\\sqrt{2}} \\approx 1.5009$, and their product to four decimals is $4.0000$, exactly as the banked law demands. The squeeze definition does not break the family; it feeds it.' },
    { kind: 'callout', tone: 'definition', title: 'The exponential function', text: 'An **exponential function** is said to be a function of the form $f(x) = a^{x}$ if the base $a$ is a fixed real number satisfying $a > 0$ and $a \\neq 1$; the index $x$ is allowed to be EVERY real number — rational indices through roots, irrational indices through the squeeze just built. Thus, $f(x) = 2^{x}$, $g(x) = (4/7)^{x}$ and $h(x) = 0.4^{x}$ are all exponential functions, while $y = x^{3}$ is not (its base varies and its exponent is fixed — the exact reverse arrangement, a polynomial).' },
    { kind: 'equation', latex: 'f(x) = a^{x}, \\qquad a > 0, \\; a \\neq 1, \\qquad x \\in \\mathbb{R} \\tag{3}', note: 'the family charter: constant positive base (never $1$), every real index, range to be earned in the next section.' },
    { kind: 'para', text: 'For example, the family admits three very different members, and one impostor:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $f(x) = 2^{x}$ is the exponential function with base $2$ — a growth member, doubling whenever the index rises by $1$;',
      '(ii) $g(x) = (4/7)^{x}$ is the exponential function with base $4/7$ — a perfectly legal DECAY member, since $0 < 4/7 < 1$;',
      '(iii) $h(x) = x^{3}$ is NOT a member — the base varies with $x$ while the exponent is frozen: that arrangement is a polynomial, and polynomials and exponentials will race later in this lesson.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — why the base restrictions are closure stories, not etiquette', text: 'Each restriction exists because violating it breaks the machine. If $a = 1$, then $1^{x} = 1$ for every $x$ — a dead constant, and worse, a machine that is NOT one-one, which would block the inverse lesson that chapter 9 cashes next. If $a = 0$, the symbol $0^{x}$ is fine for positive $x$ but $0^{x}$ with $x \\leq 0$ asks for division by zero or the undefined $0^{0}$. If $a < 0$, the family leaves the real numbers at once: $(-4)^{1/2}$ is not real, so already the rational rung $x = 1/2$ is impossible. Keep the stories straight: $a > 0$ protects the real closure, $a \\neq 1$ protects the machine from being constant.' },
    { kind: 'terms', items: [
      { term: 'Exponential function', def: 'a function $f(x) = a^{x}$ with a fixed base $a > 0$, $a \\neq 1$, defined for every real index $x$ — the family this lesson builds and studies.' },
      { term: 'Base', def: 'the constant positive number $a \\neq 1$ being raised to the varying power; $a > 1$ gives a growth member, $0 < a < 1$ a decay member.' },
      { term: 'Real index', def: 'the exponent $x$, now allowed to be any real number — rational indices through roots, irrational indices through the squeeze definition.' },
      { term: 'Horizontal asymptote', def: 'a line a graph approaches without ever touching; every $y = a^{x}$ has the line $y = 0$ as its horizontal asymptote — approached as $x$ runs to $-\\infty$ (growth) or to $+\\infty$ (decay).' },
      { term: 'Growth family', def: 'the members with base $a > 1$: strictly increasing, through $(0, 1)$, range $(0, \\infty)$.' },
      { term: 'Decay family', def: 'the members with base $0 < a < 1$: strictly decreasing, through $(0, 1)$, range $(0, \\infty)$ — the mirror family, since $(1/2)^{x} = 2^{-x}$.' },
      { term: 'Squeeze definition', def: 'the definition of $a^{x}$ for irrational $x$: the unique value pinned by the nested brackets $a^{r}$ with rational $r$ approaching $x$ from both sides.' },
      { term: 'Same-base discipline', def: 'when one equation holds two powers of the SAME base, convert both sides to that base and equate the exponents — licensed by the strict monotonicity proved in the next section.' },
    ] },
    { kind: 'figure', caption: 'The squeeze ladder for $2^{\\sqrt{2}}$. Rung 1 draws the index rail from $1.41$ to $1.42$ with the sub-window $[1.4142, 1.4143]$ boxed in amber, and beneath it the value rail from $2.657372$ to $2.675855$ carrying the same boxed window and the orange target dot $2.665144\\ldots$ — the bracket underneath reads width $0.018483$. Rung 2 magnifies the tiny window $\\times 100$: the index rail now runs $1.4142$ to $1.4143$ with the dot $\\sqrt{2} \\approx 1.4142136$ sitting between the end ticks, and the value rail runs $2.665119$ to $2.665304$ with the target dot $2.6651441427\\ldots$ and the bracket width $0.000185$. The two rungs are the squeeze in one picture: each magnification is honest (both rails on each rung are true-to-scale), the brackets nest, and the dot that never escapes is the defined value of $2^{\\sqrt{2}}$.', svg: squeezeLadderSvg() },
    { kind: 'para', text: 'From the above discussion, it follows that the irrational rung is not a mystery but a construction: $a^{x}$ for irrational $x$ is the value that nested rational brackets pin, the laws are inherited rather than re-proved, and the whole family is now in place for every real index. What remains is to STUDY the machine — its shape, its pricing, its craft — and that is the work of the rest of this lesson.' },

    { kind: 'heading', text: 'The Shape Family: One Shared Point, Two Behaviours' },
    { kind: 'para', text: 'Every family study begins with a witness table, and the natural witness is the smallest growth base, $2$. Sampling $y = 2^{x}$ across a spread of indices — including one long-range probe — gives the table below; every entry is engine-verified to the last digit shown.' },
    { kind: 'table', head: ['x', '−3', '−2', '−1', '0', '1', '2', '3', '10'], rows: [
      ['y = 2^x', '0.125', '0.25', '0.5', '1', '2', '4', '8', '1024'],
    ], caption: 'The witness table for $y = 2^{x}$: negative indices deliver fractions (the repaired family of Elementary Algebra 2.2), zero delivers $1$, and each step up in the index DOUBLES the value — the last column is the long-range probe discussed below.' },
    { kind: 'para', text: 'Three readings, in increasing order of consequence. First, the values rise with the index, without exception — one instance of the monotonicity this section is about to prove as a law. Second, the row passes through $(0, 1)$ because $a^{0} = 1$ — that is Elementary Algebra 2.2’s repair, cited, not re-proved: the zero exponent was DEFINED so the laws would keep, and the shared point of the whole family is where that repair shows on a graph. Third, the long-range probe: $2^{10} = 1024$, while $10^{3} = 1000$ — the familiar "kilo" of computing sits $24$ over the metric kilo, an overshoot of $2.4\\%$. That tiny gap is the seed of the race this lesson runs later: a factor-$2$ machine and a factor-$10$ machine disagree slightly at $10$, and the disagreement compounds.' },
    { kind: 'callout', tone: 'theorem', title: 'The shape laws of the exponential family', text: 'Let $a > 0$ with $a \\neq 1$. Then the graph of $y = a^{x}$: (i) passes through $(0, 1)$; (ii) is strictly increasing on $\\mathbb{R}$ if $a > 1$ (the growth family), and strictly decreasing on $\\mathbb{R}$ if $0 < a < 1$ (the decay family); (iii) has range $(0, \\infty)$ — positive values only, arbitrarily large and arbitrarily close to $0$; and (iv) has the line $y = 0$ as a horizontal asymptote, approached in the direction the index runs NEGATIVE for growth bases and POSITIVE for decay bases — approached, never touched.' },
    { kind: 'derivation', title: 'The shape laws from the exponent laws', statement: 'For a growth base $a > 1$ the function $y = a^{x}$ is strictly increasing on $\\mathbb{R}$; for a decay base $0 < a < 1$ it is strictly decreasing; and in both cases the values are positive with $a^{x} \\neq 0$ for every $x$.', steps: [
      { label: 'Split the difference', formula: 'a^{x_2} = a^{x_1} \\cdot a^{x_2 - x_1}', explanation: 'the product law, banked for integer and rational indices and CARRIED to the irrational rung by the squeeze: the engine verifies it numerically on witnesses such as $2^{\\sqrt{2}} \\cdot 2^{2 - \\sqrt{2}} = 4.0000$. Write the larger-index value as the smaller-index value times one more factor.' },
      { label: 'A positive gap buys a factor above 1', formula: 't > 0, \\; a > 1 \\;\\Longrightarrow\\; a^{t} > 1', explanation: 'for rational $t = p/q$ this is the banked comparison law on roots and powers: $a^{1/q} > 1^{1/q} = 1$, and $p$ copies keep it above $1$. For irrational $t$ the squeeze carries it: bracket $t$ between positive rationals, and the $a$-brackets sit above $1$ because their rational endpoints do.' },
      { label: 'Conclude growth', formula: 'x_2 > x_1 \\;\\Longrightarrow\\; a^{x_2} = a^{x_1} \\cdot a^{x_2 - x_1} > a^{x_1} \\cdot 1 = a^{x_1}', explanation: 'the gap $x_2 - x_1$ is positive, so the extra factor exceeds $1$, so the larger index gives the strictly larger value: strictly increasing on $\\mathbb{R}$, law (ii) first half.' },
      { label: 'The decay mirror', formula: '0 < a < 1: \\quad a^{x} = (1/b)^{x} = b^{-x} \\quad (b = 1/a > 1)', explanation: 'write the decay base as the reciprocal of a growth base; the mirror identity $(1/b)^{x} = b^{-x}$ is a power-law carry, engine-verified on sweeps. Since $b^{x}$ is strictly increasing, $b^{-x}$ is strictly DECREASING — a larger index flips the sign of the exponent and shrinks the value. Law (ii) second half.' },
      { label: 'Positivity, never zero, and the asymptote', formula: 'a^{x} = \\left(a^{x/2}\\right)^{2} \\geq 0, \\qquad a^{x} \\cdot a^{-x} = a^{0} = 1', explanation: 'every value is a square, hence non-negative; and it cannot be $0$, for then $a^{x} \\cdot a^{-x}$ would be $0$, contradicting $a^{0} = 1$. So the range lives in $(0, \\infty)$ — law (iii). For the asymptote, running the growth index negative divides by ever larger powers: the engine witnesses $2^{-40} < 10^{-12}$ yet positive — approached, never touched. Law (iv).' },
    ], result: 'the shape laws hold: growth bases rise, decay bases fall, all pass $(0, 1)$, all live in $(0, \\infty)$, and all approach $y = 0$ without touching it' },
    { kind: 'para', text: 'The mirror read deserves its own table, because it converts the decay family from a new object into a familiar one. Base $1/2$ is the reciprocal of base $2$, so $(1/2)^{x} = 2^{-x}$: the decay witness table is the growth witness table with the index signs flipped —' },
    { kind: 'table', head: ['x', '−3', '−2', '−1', '0', '1', '2', '3'], rows: [
      ['y = (1/2)^x', '8', '4', '2', '1', '0.5', '0.25', '0.125'],
      ['y = 2^x', '0.125', '0.25', '0.5', '1', '2', '4', '8'],
    ], caption: 'The mirror table: $y = (1/2)^{x}$ reads the values of $y = 2^{x}$ right-to-left — the decay curve is the growth curve reflected in the $y$-axis, which is exactly what the identity $(1/2)^{x} = 2^{-x}$ says.' },
    { kind: 'figure', caption: 'The family portrait: five bases on one set of axes, $x$ from $-1$ to $1.2$ and $y$ from $-0.5$ to $3.0$. The growth members $y = 8^{x}$ (green), $y = 5^{x}$ (teal) and $y = 3^{x}$ (olive) rise through the window; the decay members $y = 0.4^{x}$ (amber) and $y = 0.2^{x}$ (orange) fall. All five pass through the one shared point $(0, 1)$, marked with the ringed dot. The sample dots at $x = \\pm 0.5$ carry the engine-pinned values: on the right, $2.828$, $2.236$, $1.732$ for the growth bases and $0.632$, $0.447$ for the decay bases; on the left, $2.236$, $1.581$ for the decay bases and $0.577$, $0.354$ for the growth bases, plus the unlabelled mirror dot $0.447 = 5^{-0.5}$. The caption’s teaching: a STEEPER BASE gives a STEEPER CURVE in BOTH directions — base $8$ climbs fastest on the right and collapses fastest on the left, base $0.2$ falls fastest on the right and climbs fastest on the left — and every legal base, growth or decay, passes through the one shared point.', svg: familyPortraitSvg() },
    { kind: 'para', text: 'Reading the portrait honestly: the three growth curves leave $(0, 1)$ at different steepnesses — $8^{x}$ steepest, then $5^{x}$, then $3^{x}$ — and the two decay curves fall in the same order of steepness, $0.2^{x}$ fastest. That is the steeper-base principle: the exponent laws give $(a^{k})^{x} = a^{kx}$, so a base that is a POWER of another is a horizontally SCALED copy of it — $8^{x} = 2^{3x}$ is the base-$2$ curve squeezed to one third of the width, hence three times steeper in both directions. One shared point, two behaviours, steepness inherited from the base: the whole qualitative theory of the family is on this single figure.' },
    { kind: 'para', text: 'One more reading, the one that pays rent in every applied field. A growth base can always be written $a = 1 + r$ with $r > 0$, and then each unit step of the index multiplies the value by exactly $(1 + r)$ — growth at a constant PERCENT $100r$ per period. The decay mirror writes $a = 1/(1 + r)$, dividing by $(1 + r)$ each period. These two cards carry the translation between "base" language and "percent" language:' },
    { kind: 'formula', name: 'The percent reading of a growth base', latex: 'a = 1 + r \\;\\Longleftrightarrow\\; a^{n} = \\text{value after } n \\text{ periods at } 100r\\% \\text{ per period}', note: 'base $1.1$ IS "ten percent per period": each period multiplies by $1 + 0.10$. The next section prices this.' },
    { kind: 'formula', name: 'The percent reading of a decay base', latex: 'a = \\frac{1}{1 + r} \\;\\Longleftrightarrow\\; a^{n} = \\text{value after } n \\text{ periods of losing } \\tfrac{r}{1+r} \\text{ each}', note: 'the decay mirror: base $0.4$ divides by $2.5$ each period — the same percent read, run backwards.' },

    { kind: 'heading', text: 'Growth Stories, Priced' },
    { kind: 'figure', caption: 'The race: $y = 2^{x}$ (green) against $y = x^{3}$ (amber), drawn in two true-to-scale windows. Window 1 ($x$ from $0$ to $2.6$, $y$ from $0$ to $16$): the exponential starts ABOVE the cubic — at $x = 0$ it holds $1$ against $0$, at $x = 1$ it holds $2$ against $1$ — then the cubic overtakes at the first crossing, marked with the dot at $x \\approx 1.3735$, and leads through the whole window. Window 2 ($x$ from $8$ to $11$, $y$ from $0$ to $2100$): the cubic still leads at $x = 9$, where $512 < 729$ (both witness pairs dotted), but the exponential retakes the lead at the second crossing, the dot at $x \\approx 9.9395$, and at $x = 10$ the values read $1024 > 1000$. The caption’s moral is the section’s moral: the slow starter wins the long run — after the last crossing the exponential never looks back, and the engine verifies $2^{x} > x^{3}$ at every integer from $10$ to $60$ with the ratio $2^{x}/x^{3}$ growing throughout.', svg: raceSvg() },
    { kind: 'para', text: 'The race deserves a careful read, because "exponentials beat polynomials" is a slogan until the crossings are pinned. At $x = 0$ and $x = 1$ the exponential is above ($1 > 0$, then $2 > 1$). The first crossing — engine-bisected at $x \\approx 1.3735$ — hands the lead to the cubic, which keeps it through every integer from $2$ to $9$; the near miss is at $9$, where $512 < 729$. The second crossing, at $x \\approx 9.9395$, hands the lead back for good: at $10$ the exponential leads $1024 > 1000$, and from there the gap only widens — the engine sweeps every integer to $60$ without finding a third crossing, and the ratio $2^{x}/x^{3}$ grows from $10$ onward. An exponential with base above $1$ is a slow starter and a permanent winner; a polynomial is a fast starter and a eventual loser. That asymmetry is the fingerprint of the family.' },
    { kind: 'example', title: 'Compound growth: ₹1,000 at 10% per year, re-invested', steps: [
      'Set the machine up: with the interest re-invested each year, the balance multiplies by $1.1$ annually, so $A(n) = 1000 \\cdot 1.1^{n}$ — the percent reading of the base, $a = 1 + r$ with $r = 0.10$.',
      'Compute the ten-year value: $A(10) = 1000 \\cdot 1.1^{10} = 1000 \\times 2.5937424601 = 2593.74$ rupees — the engine carries all ten decimals, the answer needs two.',
      'Bracket the doubling time: $1.1^{7} = 1.948717 < 2 < 2.143589 = 1.1^{8}$, so the money doubles between years $7$ and $8$ — a bracket, exactly like the $\\sqrt{2}$ brackets.',
      'Pin the exact doubling time by bisection: the engine bisects $1.1^{n} = 2$ on $[7, 8]$ and returns $n = 7.2725408973$ years. The logarithm — the machine that would name this number in one line — arrives in the NEXT lesson; for now the engine computes it by squeezing, precisely as $2^{\\sqrt{2}}$ was pinned.',
      'Check the banker’s shortcut: the rule of 72 estimates the doubling time as $72/10 = 7.2$ years — within $1\\%$ of the truth (an error of $0.9975\\%$), a good estimate but an estimate.',
      'Hence ₹1,000 grows to ₹2,593.74 in ten years and doubles every $\\approx 7.27$ years — the exponential family, priced in rupees.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The rule of 72 — an estimate, with the engine as truth', text: 'The rule of 72 (doubling time is roughly 72 divided by the percent rate) is a banker’s mental shortcut, not a law. At $10\\%$ it gives $7.2$ against the true $7.2725408973$ — a $0.9975\\%$ error, excellent. At $12\\%$ it gives $6$ against the true $6.1163$ — a $1.9\\%$ error, still serviceable. But the error GROWS as the rate moves away from the $8$-ish region where the rule was tuned, and no engineering decision should rest on it: the engine’s bisection of $(1 + r)^{n} = 2$ is the truth, the rule is the rough map of it.' },
    { kind: 'example', title: 'The paper fold: 50 folds, three-quarters of the way to the Sun', steps: [
      'Set the machine up: a typical sheet is $0.1$ mm thick, and each ideal fold DOUBLES the layers, so after $n$ folds there are $2^{n}$ layers of $0.1$ mm — base $2$, index $n$, no percent dressing.',
      'Compute the layer count: $2^{50} = 1125899906842624$ — over a thousand trillion layers from fifty folds.',
      'Convert to distance: $2^{50} \\times 0.1$ mm $= 112589990684.2624$ mm, that is $1.1259 \\times 10^{11}$ metres.',
      'Audit against the Earth–Sun distance: one astronomical unit is $1.496 \\times 10^{11}$ m, so the fold stack reaches $1.1259/1.496 = 0.7526$ of it — about $75\\%$ of the way to the Sun. The honesty clause: this assumes perfectly ideal folds, doubling the thickness every time with no paper wasted — physically absurd, arithmetically exact.',
      'Audit against the Moon: the Moon’s $384,400$ km $= 3.844 \\times 10^{8}$ m needs $2^{n} \\geq 3.844 \\times 10^{12}$ tenths-of-millimetres. The engine: $2^{41} = 2.199 \\times 10^{12} < 3.844 \\times 10^{12} < 4.398 \\times 10^{12} = 2^{42}$.',
      'Hence the Moon is reached at $42$ folds, and the Sun’s distance is $75\\%$-crossed at $50$ — the exponential family, priced in astronomical units.',
    ] },
    { kind: 'para', text: 'Both stories price the same theorem: constant percent growth is not "fast", it is COMPOUNDED fast — the growth feeds the growth. Ten percent for ten years is not ten tens of percent; it is a multiplication by $2.5937424601$, because each year’s interest earned its own interest. That is the entire difference between the additive world of polynomials and the multiplicative world of this family, and it is why the race above was never close after the second crossing.' },

    { kind: 'heading', text: 'The First Same-Base Craft' },
    { kind: 'para', text: 'The family now earns its first algebraic craft. When ONE equation holds TWO powers of the SAME base, the monotonicity just proved lets the exponents be equated directly — and only then. The discipline is strict, because it is exactly the licence a later lesson (9.4) will industrialise into logarithmic solving: here, the honest cases and nothing beyond them.' },
    { kind: 'derivation', title: 'The same-base licence', statement: 'If $a > 0$ with $a \\neq 1$ and $a^{u} = a^{v}$, then $u = v$ — equal powers of one base force equal exponents.', steps: [
      { label: 'Suppose the exponents differ', formula: 'u \\neq v, \\text{ say } u > v', explanation: 'for contradiction: let the two exponents be unequal, the larger one first.' },
      { label: 'Apply the shape law', formula: 'u > v, \\; a > 1 \\;\\Longrightarrow\\; a^{u} > a^{v}', explanation: 'the strictly increasing case just proved; for $0 < a < 1$ the strict decrease gives $a^{u} < a^{v}$ — either way the two values are unequal.' },
      { label: 'Contradiction and conclusion', formula: 'a^{u} \\neq a^{v}', explanation: 'strict monotonicity — increase or decay, never constancy, because $a \\neq 1$ — makes unequal exponents produce unequal values. So equal values force equal exponents.' },
    ], result: 'the same-base licence: $a^{u} = a^{v} \\Rightarrow u = v$ for every legal base $a$' },
    { kind: 'example', title: 'Solve $8^{x+1} = 4^{2-x}$', steps: [
      'Set the craft up: the two bases $8$ and $4$ are POWERS of the common base $2$ — so convert both sides to base $2$: $8^{x+1} = 2^{3(x+1)}$ and $4^{2-x} = 2^{2(2-x)}$.',
      'Apply the licence: $2^{3(x+1)} = 2^{2(2-x)}$ is one equation holding two powers of the same base, so $3(x+1) = 2(2-x)$.',
      'Solve the linear collapse: $3x + 3 = 4 - 2x$, hence $5x = 1$.',
      'Check by evaluation: both sides equal $2^{3.6} \\approx 12.1257$ — the engine confirms $8^{1.2} = 4^{1.8} = 12.1257325\\ldots$ to seven decimals.',
      'Hence $x = 1/5$.',
    ] },
    { kind: 'example', title: 'Solve $3^{x+1} + 3^{x-1} = 270$', steps: [
      'Set the craft up: two DIFFERENT powers of the same base $3$ sit on the left — factor out the common $3^{x}$: $3^{x+1} + 3^{x-1} = 3^{x}(3 + 1/3) = 3^{x} \\cdot 10/3$.',
      'Collapse the equation: $3^{x} \\cdot 10/3 = 270$, hence $3^{x} = 81$.',
      'Read the integer power: $81 = 3^{4}$, so $x = 4$.',
      'Check by evaluation: $3^{5} + 3^{3} = 243 + 27 = 270$ — exact.',
      'Hence $x = 4$.',
    ] },
    { kind: 'example', title: 'Solve $\\left(1/2\\right)^{x^{2}-2x} < 1/8$', steps: [
      'Set the craft up: both sides are powers of the same base $1/2$ — write $1/8 = (1/2)^{3}$ and the inequality reads $(1/2)^{x^{2}-2x} < (1/2)^{3}$.',
      'Apply the shape law, WITH the flip: the base $1/2$ lies in the decay family, so the function is strictly DECREASING — the inequality between values REVERSES between exponents: $x^{2} - 2x > 3$.',
      'Solve the quadratic: $x^{2} - 2x - 3 > 0$, that is $(x - 3)(x + 1) > 0$ — the boundary points are $x = 3$ and $x = -1$, where equality $(1/2)^{3} = 1/8$ holds exactly.',
      'Read the solution region: the product of two linear factors is positive outside the roots, so $x < -1$ or $x > 3$ — witnesses: at $x = 0$ the left side is $1 > 1/8$ (outside, correctly excluded); at $x = 4$ it is $(1/2)^{8} = 1/256 < 1/8$ (inside).',
      'Hence the solution set is $x < -1$ or $x > 3$.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the flip is the number one trap of this family', text: 'When the base sits between $0$ and $1$, an inequality between POWERS flips exactly as it would under division by a negative number: $(1/2)^{f(x)} < (1/2)^{g(x)}$ means $f(x) > g(x)$, NOT $f(x) < g(x)$. The flip follows the FAMILY (decay versus growth), never the sign of anything in the exponent. Note the trap’s cleanest form: with base $1/2$ above, the boundary is $x = -1$ and $x = 3$ — the roots of $x^{2} - 2x - 3 = 0$, not of any other quadratic.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — how this chapter’s first craft is examined', text: 'Exam-style items on this material come in three honest shapes, all represented in the exercise sets below: (i) the pure conversion $8^{x+1} = 4^{2-x}$, testing whether both sides get rewritten in a COMMON base before exponents are equated; (ii) the mixed-power collapse $3^{x+1} + 3^{x-1} = 270$, testing the factor-out move; and (iii) the trap shape, an inequality on a decay base or an absolute-value base equal to $1$, testing the flip and the case split. Nothing here is quoted from a real paper — every item is the platform’s own, engine-pinned in v-aa91.ts before the prose was written.' },
    { kind: 'example', title: 'Solve $|x-2|^{2x^{2}-9x+9} = 1$', steps: [
      'Set the case split up: a power equals $1$ in exactly two honest ways — the base is $1$, or the exponent is $0$ with a nonzero base. (The tempting third way, base $0$ with exponent $0$, is REFUSED — see the caution below.)',
      'Case (i), base $1$: $|x - 2| = 1$ gives $x = 3$ or $x = 1$.',
      'Case (ii), exponent $0$ with base $\\neq 0$: $2x^{2} - 9x + 9 = 0$ has discriminant $81 - 72 = 9$, so $x = (9 \\pm 3)/4$, that is $x = 3$ or $x = 3/2$.',
      'Take the union and audit each member: $\\{1,\\; 3/2,\\; 3\\}$. Checks: at $x = 1$, $|-1|^{2} = 1^{2} = 1$; at $x = 3/2$, $|-1/2|^{0} = 0.5^{0} = 1$; at $x = 3$, $|1|^{0} = 1^{0} = 1$ — and $x = 3$ earns membership TWICE (both cases), which is legal but must be counted once.',
      'Refuse the forbidden candidate: at $x = 2$ the base is $|2-2| = 0$ while the exponent is $2(4) - 18 + 9 = -1$, and $0^{-1}$ is division by zero — undefined, excluded. The engine sweeps $[-2, 5]$ at $0.001$ resolution and confirms exactly the three solutions.',
      'Hence the solution set is $\\{1,\\; 3/2,\\; 3\\}$.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the zero-to-the-zero guard', text: 'The case split "base $= 1$ OR exponent $= 0$" silently assumes the expression is DEFINED at the candidate. A base of $0$ with exponent $0$ is the undefined $0^{0}$, and a base of $0$ with a negative exponent is division by zero — both are refused by the base $\\neq 0$ guard before any equation is solved. In the illustration just worked, $x = 2$ would have made the base $0$ with exponent $-1$; in the exercise L4(a) below, $x = 3$ makes the base $0$ with exponent $0$ — excluded, loudly.' },
    { kind: 'example', title: 'Count the solutions of $3x - 5 = 2^{-x}$', steps: [
      'Set the count up: define $f(x) = 3x - 5 - 2^{-x}$; solutions of the equation are zeros of $f$, and the question is HOW MANY exist.',
      'Bound the count by monotonicity discipline: the line $3x - 5$ RISES (slope $3$), while the curve $2^{-x} = (1/2)^{x}$ FALLS (decay family). A rising line and a falling curve can meet at most once — a second meeting would force the rising line to come back down.',
      'Prove existence by a bracket: $f(1.7) = -0.208 < 0$ and $f(1.8) = 0.113 > 0$ — the continuous difference changes sign between $1.7$ and $1.8$, so one crossing lives there.',
      'Pin it by bisection: the engine halves the bracket repeatedly and returns $x \\approx 1.7648$, where both sides equal $3(1.7648) - 5 = 0.2943$ — the crossing dot in the figure below.',
      'Hence the equation has EXACTLY ONE solution, $x \\approx 1.7648$ — at most one by the monotonicity discipline, at least one by the bracket, and the figure shows the single crossing.',
    ], figures: [
      { caption: 'The single crossing of $3x - 5 = 2^{-x}$: the rising line and the falling curve meet once, at $x \\approx 1.7648$ where both sides hold $0.2943$; the dashed brackets at $1.7$ and $1.8$ carry the sign change $f(1.7) < 0 < f(1.8)$ that bisection homes in on.', svg: countingExampleSvg() },
    ] },

    { kind: 'heading', text: 'The Chapter’s Doorstep' },
    { kind: 'para', text: 'Stand back and look at what the machine now has. For every legal base, $f(x) = a^{x}$ is defined on ALL of $\\mathbb{R}$, is STRICTLY monotonic (rising for $a > 1$, falling for $0 < a < 1$), and has range exactly $(0, \\infty)$ — every positive value is taken, and no other value ever is. Strict monotonicity means the machine is one-one: distinct inputs never collide, so every output in the range has exactly one input that produced it. That is precisely the situation the chapter 1 theory of inverse machines waits for — a one-one function with a known range, which can therefore be run BACKWARDS on that range.' },
    { kind: 'para', text: 'This lesson has built and studied the forward machine; the next lesson cashes the cheque and names the inverse. Running $a^{x}$ backwards — asking "which index gives this value" — is the operation mankind has needed for four centuries: undoing the compound-growth pricing above, naming the $7.2725408973$-year doubling time in one stroke, converting the squeeze brackets into a function. Its name is the logarithm, and everything this lesson proved — monotonicity, range, the shared point $(0, 1)$, the asymptote $y = 0$ — returns immediately as the shape of THAT graph. The doorstep is laid; the door is next.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) from the above discussion, the exponential function $f(x) = a^{x}$ ($a > 0$, $a \\neq 1$) is defined for every real index — rational rungs through roots, the irrational rung $2^{\\sqrt{2}} = 2.6651441427\\ldots$ through the squeeze;',
      '(ii) the shape laws hold for every legal base: strictly increasing for $a > 1$, strictly decreasing for $0 < a < 1$, through $(0, 1)$, range $(0, \\infty)$, asymptote $y = 0$ approached but never touched;',
      '(iii) the family’s pricing is compounding: $1.1^{10} = 2.5937424601$ (₹1,000 becomes ₹2,593.74), the doubling time is pinned by bisection at $7.2725408973$ years, and the rule of 72 is its $1\\%$-accurate map;',
      '(iv) the same-base craft is licensed by monotonicity — $a^{u} = a^{v} \\Rightarrow u = v$ — with the decay flip and the $|\\text{base}|^{\\text{exponent}} = 1$ case split as its honest first cases;',
      '(v) the machine is one-one with range $(0, \\infty)$: ready for the inverse that the next lesson names.',
    ] },
    { kind: 'formula', name: 'The exponential function (the definition)', latex: 'f(x) = a^{x}, \\qquad a > 0, \\; a \\neq 1, \\qquad x \\in \\mathbb{R}', note: 'the family charter: constant positive base never equal to $1$, every real index — irrational indices by the squeeze definition.' },
    { kind: 'formula', name: 'The shape laws', latex: 'a > 1: \\; a^{x} \\nearrow \\text{ on } \\mathbb{R}; \\qquad 0 < a < 1: \\; a^{x} \\searrow \\text{ on } \\mathbb{R}; \\qquad \\text{range } (0, \\infty)', note: 'growth bases rise, decay bases fall, all through $(0, 1)$, all approaching $y = 0$ without touching — proved from the exponent laws.' },
    { kind: 'formula', name: 'The squeeze bracket form', latex: 'r < x < s \\; (r, s \\text{ rational}), \\; a > 1 \\;\\Longrightarrow\\; a^{r} < a^{x} < a^{s}', note: 'the definition of the irrational rung in one line: $1.41 < \\sqrt{2} < 1.42$ gives $2.657372 < 2^{\\sqrt{2}} < 2.675855$; $1.4142 < \\sqrt{2} < 1.4143$ gives $2.665119 < 2^{\\sqrt{2}} < 2.665304$.' },
    { kind: 'formula', name: 'The same-base discipline', latex: 'a^{u} = a^{v} \\;\\Longrightarrow\\; u = v \\qquad (a > 0, \\; a \\neq 1)', note: 'equal powers of one base force equal exponents — the licence behind $8^{x+1} = 4^{2-x} \\Rightarrow 3(x+1) = 2(2-x)$, and behind the decay FLIP for inequalities.' },

    { kind: 'quiz', title: 'Check yourself: the exponential family', items: [
      { q: 'The exponential function $f(x) = a^{x}$ is defined for', options: ['any real base $a$', 'bases with $a > 0$ and $a \\neq 1$', 'bases with $a > 1$ only', 'bases with $a \\neq 0$ only'], answer: 1, explain: 'Option 1 is the family charter: positive base, never $1$, every real index — the two restrictions are closure stories, not taste. Option 0 admits negative bases, and a negative base already leaves the reals at the rational index $1/2$: $(-4)^{1/2}$ is not a real number, so the family would break on its own domain. Option 2 forgets the decay family entirely — $g(x) = (4/7)^{x}$ is a fully legal member with $0 < 4/7 < 1$. Option 3 admits $a = 1$ (the dead constant machine, not one-one, which would break the inverse lesson) and also admits the negative bases that option 0 already refuted.' },
      { q: 'Every graph of $y = a^{x}$ with $a > 0$, $a \\neq 1$ passes through', options: ['$(1, 0)$', '$(0, 1)$', '$(1, 1)$', '$(0, 0)$'], answer: 1, explain: 'Option 1 is the shared point: $a^{0} = 1$ for every legal base — the zero-exponent repair of Elementary Algebra 2.2, showing on the graph as the one point all five curves of the family portrait share. Option 0 is the home of the LOGARITHM, the next lesson’s machine — nothing about $a^{x}$ vanishes at $x = 1$; the value there is $a$, not $0$. Option 2 confuses base with exponent: at $x = 1$ the value is the base $a$ itself, which equals $1$ only for the forbidden dead base. Option 3 is the polynomial’s home — $x^{3}$ passes through the origin, but an exponential is never $0$ anywhere, since $a^{x} \\cdot a^{-x} = a^{0} = 1$ forbids it.' },
      { q: 'For $0 < a < 1$, the function $y = a^{x}$ is', options: ['strictly increasing', 'strictly decreasing with range $(0, \\infty)$', 'constant', 'undefined for negative $x$'], answer: 1, explain: 'Option 1 is the shape law for the decay family: write $a = 1/b$ with $b > 1$, so $a^{x} = b^{-x}$, a strictly DECREASING mirror of the growth curve — and its values stay positive, so the range is $(0, \\infty)$, approached at $0$ but never touched. Option 0 describes the GROWTH family ($a > 1$) — this question’s base is below $1$. Option 2 is the excluded dead base $a = 1$, which the definition refuses precisely because it would make every machine constant and not one-one. Option 3 is exactly backwards: negative indices are fully defined for a decay base and give LARGE values — $(1/2)^{-3} = 8$ — the mirror table shows the decay values growing as the index runs negative.' },
      { q: 'Since $1.41 < \\sqrt{2} < 1.42$ and $2^{x}$ is increasing, $2^{\\sqrt{2}}$ lies between', options: ['$2.41$ and $2.42$', '$2.657372$ and $2.675855$', '$2$ and $4$', '$1.41$ and $1.42$'], answer: 1, explain: 'Option 1 is the engine-computed image of the index bracket: $2^{1.41} = 2.657372$ and $2^{1.42} = 2.675855$, and monotonicity pins $2^{\\sqrt{2}} = 2.6651441427\\ldots$ between them — the squeeze definition at work. Option 0 pastes the index digits onto the wrong side of the decimal point: $2.41$ has nothing to do with $2^{1.41}$, whose actual value begins $2.65\\ldots$. Option 2 is the crude first-order bracket — true but far too wide: $2 < 2^{\\sqrt{2}} < 4$ follows from $1 < \\sqrt{2} < 2$, and squeezing is exactly the discipline of refusing such loose cages. Option 3 is the bracket on the INDEX, not on the VALUE — the whole point of the squeeze is that the value bracket is the IMAGE of the index bracket under the increasing map $x \\mapsto 2^{x}$.' },
      { q: 'The smallest integer $x \\geq 2$ at which $2^{x}$ permanently overtakes $x^{3}$ is', options: ['$3$', '$6$', '$10$', '$20$'], answer: 2, explain: 'Option 2 is the overtake: at $x = 10$, $2^{10} = 1024 > 1000 = 10^{3}$, and the engine verifies $2^{x} > x^{3}$ at every integer from $10$ onward (swept to $60$, with the ratio $2^{x}/x^{3}$ growing throughout) — after the last crossing at $x \\approx 9.9395$ the exponential never looks back. Option 0 is deep inside the cubic’s reign: at $x = 3$, $2^{3} = 8 < 27 = 3^{3}$, and the exponential stays BELOW through every integer from $2$ to $9$. Option 1 likewise: at $x = 6$, $64 < 216$ — the cubic leads by more than a factor of three. Option 3 is true but not smallest: $2^{20} = 1048576$ dwarfs $20^{3} = 8000$, but the permanent overtake happened ten integers earlier; the question asks for the first rung of the permanent reign.' },
    ] },

    { kind: 'exercises', title: 'Exercises 9.1', sets: [
      { level: 'L1', questions: [
        { q: 'Evaluate $3^{x}$ at $x = -2, -1, 0, 2$, giving exact fractions.', solution: [
          'Read the repaired family: for negative indices, $3^{-n} = 1/3^{n}$ — the Elementary Algebra 2.2 repair, now a rung of the real-index ladder.',
          'So, $3^{-2} = 1/3^{2} = 1/9$ and $3^{-1} = 1/3$.',
          'Now, the zero rung: $3^{0} = 1$ — the shared point of the whole family.',
          'And the positive rung: $3^{2} = 9$.',
          'Hence the values are $1/9,\\; 1/3,\\; 1,\\; 9$ — the decay-mirror read: the row is the base-$3$ family run backwards below $0$.',
        ], answer: '$3^{-2} = 1/9$, $3^{-1} = 1/3$, $3^{0} = 1$, $3^{2} = 9$' },
        { q: 'Classify each of $x^{5}$, $5^{x}$ and $(1/3)^{x}$ as polynomial, exponential growth or exponential decay, and state which of them share a point.', solution: [
          'Read the arrangement of each symbol: $x^{5}$ has a VARIABLE base and a frozen exponent — a polynomial. $5^{x}$ has base $5 > 1$ with variable exponent — a growth member of the exponential family. $(1/3)^{x}$ has base $1/3 \\in (0, 1)$ — a decay member.',
          'Now, the shared points: both exponentials pass through $(0, 1)$ because $a^{0} = 1$ — the one shared point of the whole family.',
          'Check the polynomial: $x^{5}$ passes through $(0, 0)$, not $(0, 1)$ — the arrangement, not the degree, decides the point.',
          'Hence: $x^{5}$ is a polynomial; $5^{x}$ is exponential growth; $(1/3)^{x}$ is exponential decay; the two exponentials share $(0, 1)$, the polynomial shares nothing with them.',
        ], answer: '$x^{5}$ polynomial; $5^{x}$ exponential growth; $(1/3)^{x}$ exponential decay — the two exponentials share $(0, 1)$' },
        { q: 'State the domain and range of $f(x) = (4/7)^{x}$, and its monotonicity.', solution: [
          'Read the base: $0 < 4/7 < 1$, so $f$ is a decay member of the family.',
          'So, the domain is every real number — the family charter grants every real index, rational and irrational alike.',
          'Now, the range: the shape laws give $(0, \\infty)$ — positive only, arbitrarily close to $0$ as $x$ grows, arbitrarily large as $x$ runs negative.',
          'Hence: domain $\\mathbb{R}$, range $(0, \\infty)$, strictly decreasing on all of $\\mathbb{R}$ — the decay mirror $(4/7)^{x} = (7/4)^{-x}$.',
        ], answer: 'domain $\\mathbb{R}$; range $(0, \\infty)$; strictly decreasing on $\\mathbb{R}$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Solve $9^{x+2} = 27^{x}$.', solution: [
          'Set the craft up: both bases are powers of $3$ — $9 = 3^{2}$ and $27 = 3^{3}$.',
          'So, convert both sides to base $3$: $9^{x+2} = 3^{2(x+2)} = 3^{2x+4}$ and $27^{x} = 3^{3x}$.',
          'Now, apply the same-base licence: $3^{2x+4} = 3^{3x}$ gives $2x + 4 = 3x$.',
          'Hence $x = 4$.',
          'Check by evaluation: $9^{6} = 531441$ and $27^{4} = 531441$ — both are $3^{12}$, engine-verified exactly.',
        ], answer: '$x = 4$ (both sides equal $531441 = 3^{12}$)' },
        { q: 'Given $1.4142 < \\sqrt{2} < 1.4143$, bound $2^{\\sqrt{2}}$ between two six-decimal numbers, and state the width of your band.', solution: [
          'Set the squeeze up: $2^{x}$ is strictly increasing (the shape law), so the index bracket transfers to a value bracket.',
          'So, compute the ends: $2^{1.4142} = 2.665119$ and $2^{1.4143} = 2.665304$ — engine-computed to six decimals.',
          'Now, close the bracket: $2.665119 < 2^{\\sqrt{2}} < 2.665304$, a band of width $2.665304 - 2.665119 = 0.000185$.',
          'Hence $2^{\\sqrt{2}}$ is pinned inside $[2.665119,\\, 2.665304]$, width $0.000185$ — one hundredth of the width of the parent band $[2.657372, 2.675855]$ from the $1.41$-bracket, exactly as the index slack shrank by a hundredth.',
          'Check the target: the engine’s value $2^{\\sqrt{2}} = 2.6651441427\\ldots$ sits inside the band, as the figure below shows.',
        ], answer: '$2.665119 < 2^{\\sqrt{2}} < 2.665304$, band width $0.000185$', figures: [
          { caption: 'The nested bands on a value scale: the parent band $[2.657372, 2.675855]$ of width $0.018483$ carries a magnified second rail $[2.665119, 2.665304]$ of width $0.000185$, with the target dot $2.6651441427\\ldots$ sitting inside the tight band — the squeeze of this solution, drawn.', svg: nestedBandsSvg() },
        ] },
        { q: 'Complete the table of $y = (1/2)^{x}$ at $x = -3, -2, -1, 0, 1, 2, 3$, and read its relation to the table of $y = 2^{x}$.', solution: [
          'Fill the row: $(1/2)^{-3} = 8$, $(1/2)^{-2} = 4$, $(1/2)^{-1} = 2$, $(1/2)^{0} = 1$, $(1/2)^{1} = 0.5$, $(1/2)^{2} = 0.25$, $(1/2)^{3} = 0.125$.',
          'So, compare with the $2^{x}$ row $0.125, 0.25, 0.5, 1, 2, 4, 8$: the decay row is the growth row READ RIGHT-TO-LEFT.',
          'Now, name the identity behind the mirror: $(1/2)^{x} = 2^{-x}$ — the reciprocal base flips the exponent’s sign.',
          'Hence the two graphs are reflections of each other in the $y$-axis, sharing exactly the point $(0, 1)$ — the mirror read of the shape section.',
        ], answer: '$8, 4, 2, 1, 0.5, 0.25, 0.125$ — the $2^{x}$ table reversed; $(1/2)^{x} = 2^{-x}$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $2^{x+2} + 2^{x+1} = 48$.', solution: [
          'Set the craft up: factor out the common $2^{x}$: $2^{x+2} + 2^{x+1} = 2^{x}(4 + 2) = 6 \\cdot 2^{x}$.',
          'So, collapse: $6 \\cdot 2^{x} = 48$ gives $2^{x} = 8$.',
          'Now, read the integer power: $8 = 2^{3}$, so $x = 3$.',
          'Check by evaluation: $2^{5} + 2^{4} = 32 + 16 = 48$ — exact.',
          'Hence $x = 3$.',
        ], answer: '$x = 3$ (check: $32 + 16 = 48$)' },
        { q: 'Solve $\\left(1/3\\right)^{x^{2}-2x} < 1/9$.', solution: [
          'Set the craft up: both sides are powers of the base $1/3$ — write $1/9 = (1/3)^{2}$, so $(1/3)^{x^{2}-2x} < (1/3)^{2}$.',
          'Apply the flip: the base $1/3$ sits in the decay family, so the inequality REVERSES between exponents: $x^{2} - 2x > 2$.',
          'So, solve the quadratic: $x^{2} - 2x - 2 > 0$; the boundary is $x = 1 \\pm \\sqrt{3}$, that is $x \\approx -0.7320508$ and $x \\approx 2.7320508$, where equality $(1/3)^{2} = 1/9$ holds exactly.',
          'Now, read the region: the quadratic opens upward, so the inequality holds OUTSIDE the roots: $x < 1 - \\sqrt{3}$ or $x > 1 + \\sqrt{3}$.',
          'Check witnesses: at $x = 0$ the left side is $1 > 1/9$ (correctly excluded); at $x = 3$ it is $(1/3)^{3} = 1/27 < 1/9$ (inside). Hence $x < 1 - \\sqrt{3}$ or $x > 1 + \\sqrt{3}$.',
        ], answer: '$x < 1 - \\sqrt{3}$ or $x > 1 + \\sqrt{3}$ (approximately $x < -0.7320508$ or $x > 2.7320508$)' },
        { q: '₹500 is invested at $12\\%$ per year, re-invested. Find the value after $5$ years, the exact doubling time, and the rule-of-72 estimate for it.', solution: [
          'Set the machine up: $A(n) = 500 \\cdot 1.12^{n}$ — the percent reading of the base, $a = 1 + r$ with $r = 0.12$.',
          'Compute the five-year value: $1.12^{5} = 1.7623416832$ (engine, ten decimals), so $A(5) = 500 \\times 1.7623416832 = 881.17$ rupees.',
          'Now, bracket the doubling: $1.12^{6} = 1.9738 < 2 < 2.2107 = 1.12^{7}$ — the staircase crosses the doubling line between years $6$ and $7$.',
          'Pin the exact time by bisection: the engine bisects $1.12^{n} = 2$ on $[6, 7]$ and returns $n = 6.1163$ years (engine value $6.1162554$); the log language that names this number is the next lesson’s.',
          'Check the rule of 72: $72/12 = 6$ years — about $1.9\\%$ below the truth, a serviceable estimate whose error is honestly larger than the $10\\%$ case’s $0.9975\\%$.',
          'Hence ₹881.17 after five years, doubling every $\\approx 6.1163$ years, with the rule of 72 guessing $6$ — the figure below shows the staircase against the doubling line.',
        ], answer: '$A(5) = 881.17$ rupees; exact doubling time $\\approx 6.1163$ years; rule of 72 gives $6$', figures: [
          { caption: 'The $1.12^{n}$ staircase against the doubling line $y = 2$: the values $1.9738$ at $n = 6$ and $2.2107$ at $n = 7$ straddle the line, and the dashed guide marks the exact crossing $n \\approx 6.1163$ — the bisection target between the two risers.', svg: staircaseSvg() },
        ] },
      ] },
      { level: 'L4', questions: [
        { q: 'Solve $|x-3|^{x^{2}-8x+15} = 1$, taking care to audit every candidate.', solution: [
          'Set the case split up: a power equals $1$ only if the base is $1$, or the exponent is $0$ with a nonzero base — every candidate must also keep the expression DEFINED.',
          'Case (i), base $1$: $|x - 3| = 1$ gives $x = 2$ or $x = 4$.',
          'Case (ii), exponent $0$: $x^{2} - 8x + 15 = 0$ has discriminant $64 - 60 = 4$, so $x = (8 \\pm 2)/2$, that is $x = 5$ or $x = 3$ — but $x = 3$ makes the base $|0| = 0$ with exponent $0$, the refused $0^{0}$: EXCLUDED by the guard.',
          'Now, audit the survivors $\\{2, 4, 5\\}$: at $x = 2$, $|-1|^{3} = 1^{3} = 1$; at $x = 4$, $|1|^{-1} = 1^{-1} = 1$ (base-$1$ case, not the exponent case); at $x = 5$, $|2|^{0} = 2^{0} = 1$. The engine sweeps $[-1, 7]$ and confirms exactly these three.',
          'Hence the solution set is $\\{2,\\; 4,\\; 5\\}$, with $x = 3$ refused by the $0^{0}$ guard.',
        ], answer: '$\\{2, 4, 5\\}$ — $x = 3$ is excluded by the $0^{0}$ guard' },
        { q: 'Count the solutions of $(2x - 3) \\cdot 2^{x} = 1$.', solution: [
          'Set the count up: with $2^{x} > 0$ always, divide through to the honest form $2x - 3 = 2^{-x}$, and define $h(x) = 2x - 3 - 2^{-x}$.',
          'Bound the count: the line $2x - 3$ RISES (slope $2$), the curve $2^{-x} = (1/2)^{x}$ FALLS (decay family) — a rising line and a falling curve meet at most once.',
          'Now, prove existence by a bracket: $h(1.6) = -0.130 < 0 < 0.092 = h(1.7)$ — the sign changes between $1.6$ and $1.7$.',
          'Pin it by bisection: the engine returns $x \\approx 1.6584$, where both sides hold $2x - 3 = 0.3168$ — and the original form checks out: $(2x - 3) \\cdot 2^{x} = 1.0000$ to four decimals.',
          'Hence the equation has EXACTLY ONE solution, $x \\approx 1.6584$ — at most one by monotonicity, at least one by the bracket, as the figure shows.',
        ], answer: 'exactly one solution, $x \\approx 1.6584$', figures: [
          { caption: 'The single crossing of $2x - 3 = 2^{-x}$: the rising line meets the falling curve once, at $x \\approx 1.6584$, with the bisection bracket $h(1.6) < 0 < h(1.7)$ marked by the dashed verticals.', svg: crossingL4Svg() },
        ] },
        { q: 'How many folds of an ideal $0.1$ mm sheet reach the Moon’s distance of $384,400$ km?', solution: [
          'Set the machine up: after $n$ folds the stack is $2^{n}$ layers of $0.1$ mm, so the thickness in metres is $2^{n} \\times 10^{-4}$.',
          'So, write the requirement: the Moon’s $384,400$ km $= 3.844 \\times 10^{8}$ m demands $2^{n} \\times 10^{-4} \\geq 3.844 \\times 10^{8}$, that is $2^{n} \\geq 3.844 \\times 10^{12}$.',
          'Now, audit the neighbouring powers: $2^{41} = 2.199 \\times 10^{12} < 3.844 \\times 10^{12} < 4.398 \\times 10^{12} = 2^{42}$ — engine-computed.',
          'Hence $41$ folds fall short and $42$ folds overshoot: the answer is $42$ folds.',
          'Check the honesty clause: as in the lesson’s Sun audit, the count assumes perfectly ideal folds doubling the thickness every time — physically absurd, arithmetically exact.',
        ], answer: '$42$ folds ($2^{41} = 2.199 \\times 10^{12} < 3.844 \\times 10^{12} < 4.398 \\times 10^{12} = 2^{42}$)' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove that $2.657372 < 2^{\\sqrt{2}} < 2.675855$, given $1.41 < \\sqrt{2} < 1.42$.', solution: [
          'Set the proof up: it is a squeeze proof — the monotonicity of $2^{x}$ transfers an index bracket to a value bracket.',
          'Take the given bracket: $1.41 < \\sqrt{2} < 1.42$, with both ends rational, so $2^{1.41}$ and $2^{1.42}$ are values on the rational rungs — defined, computable.',
          'So, apply the shape law: for the growth base $2$, the function $x \\mapsto 2^{x}$ is strictly increasing on all of $\\mathbb{R}$, so $1.41 < \\sqrt{2} < 1.42$ implies $2^{1.41} < 2^{\\sqrt{2}} < 2^{1.42}$.',
          'Now, compute the ends: $2^{1.41} = 2.657372$ and $2^{1.42} = 2.675855$, engine-pinned to six decimals.',
          'Hence $2.657372 < 2^{\\sqrt{2}} < 2.675855$ — proved by monotonicity discipline, and refinable by tightening the index bracket, exactly as the squeeze ladder figure shows.',
        ], answer: 'proved: monotonicity of $2^{x}$ carries $1.41 < \\sqrt{2} < 1.42$ to $2.657372 < 2^{\\sqrt{2}} < 2.675855$' },
        { q: 'A quantity grows by $5\\%$ each period. Show that it more than doubles every $15$ periods, but not every $14$.', solution: [
          'Set the machine up: growth at $5\\%$ per period is the percent reading $a = 1.05$, so after $n$ periods the quantity has multiplied by $1.05^{n}$.',
          'So, test $14$ periods: $1.05^{14} = 1.979932 < 2$ — after $14$ periods the quantity is NOT yet double (engine value $1.9799316$ to seven decimals).',
          'Now, test $15$ periods: $1.05^{15} = 2.078928 > 2$ — after $15$ periods it IS more than double (engine value $2.0789282$).',
          'So, the bracket reads $1.05^{14} < 2 < 1.05^{15}$: doubling takes strictly between $14$ and $15$ periods.',
          'Hence over any $15$ consecutive periods the factor is the same $1.05^{15} > 2$ (constant percent growth is translation-invariant in $n$), so the quantity more than doubles every $15$ periods — and, since $1.05^{14} < 2$, not every $14$.',
        ], answer: '$1.05^{14} = 1.979932 < 2 < 2.078928 = 1.05^{15}$ — more than doubles every $15$ periods, not every $14$' },
        { q: 'A medicine’s concentration starts at $64$ units and halves every $6$ hours: $C(t) = 64 \\cdot (1/2)^{t/6}$. Find when it falls below $1$ unit.', solution: [
          'Set the machine up: rewrite in one base — $64 \\cdot (1/2)^{t/6} = 2^{6} \\cdot 2^{-t/6} = 2^{6 - t/6}$.',
          'So, the threshold question becomes $2^{6 - t/6} < 1 = 2^{0}$.',
          'Now, apply the same-base licence to the inequality — the base $2$ is a GROWTH base, so the inequality does NOT flip: $6 - t/6 < 0$.',
          'Solve: $6 < t/6$, hence $t > 36$ hours.',
          'Check the boundary: at $t = 36$, $C = 2^{0} = 1$ exactly — the threshold hour, not yet below; at $t = 37$, $C = 2^{-1/6} = 0.8909 < 1$ — below, as claimed.',
          'Hence the concentration falls below $1$ unit exactly when $t > 36$ hours.',
        ], answer: 'below $1$ unit exactly when $t > 36$ hours ($C(36) = 1$ exactly; $C(37) = 0.8909$)' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove that the squeeze definition of $2^{\\sqrt{2}}$ is well-posed: any two candidates for the pinned value differ by less than $0.0001$. (The completeness promise that guarantees a unique target may be stated, not proved.)', solution: [
          'Set the well-posedness question up: a "candidate" is any number that lies in EVERY rational bracket’s value band — the definition is honest only if all such candidates agree to the claimed accuracy.',
          'Take the engine-pinned bands: the $1.41$-bracket gives $[2.657372, 2.675855]$ (width $0.018483$); the $1.4142$-bracket gives $[2.665119, 2.665304]$ (width $0.000185$). They NEST: the second lies wholly inside the first.',
          'Now, tighten once more: the rung $1.41421 < \\sqrt{2} < 1.41422$ gives the band $[2.665138, 2.665156]$, of width $0.000018$ — engine-computed, and nested inside the second.',
          'So, any two candidates both lie in the innermost band $[2.665138, 2.665156]$ of width $0.000018 < 0.0001$, hence differ by at most $0.000018 < 0.0001$ — the claimed accuracy holds, and every further rung only shrinks it.',
          'Hence the definition is well-posed to $0.0001$: candidates cannot disagree beyond that. The deeper fact — that the nested bands converge on exactly ONE number, so there is a unique target at all — is the completeness of the reals, the promise How Irrationals Behave leaned on and chapter 10 cashes: STATED here, not proved, as the lesson’s honesty note requires.',
        ], answer: 'well-posed: the nested bands $[2.657372, 2.675855] \\supset [2.665119, 2.665304] \\supset [2.665138, 2.665156]$ have innermost width $0.000018 < 0.0001$, so any two candidates differ by $< 0.0001$; uniqueness of the target is the completeness promise (stated, not proved)' },
        { q: 'Verify the product law on irrational witnesses: compute $2^{\\sqrt{2}} \\cdot 2^{2-\\sqrt{2}}$ numerically and confirm it equals $4$ to four decimal places, naming exactly what the law predicts.', solution: [
          'Set the audit up: the witnesses are the irrational indices $x = \\sqrt{2}$ and $y = 2 - \\sqrt{2}$, whose sum is exactly $2$ — an integer, where the law is banked beyond doubt.',
          'So, compute each factor: the engine gives $2^{\\sqrt{2}} = 2.6651$ (to four decimals; full value $2.6651441427\\ldots$) and $2^{2-\\sqrt{2}} = 1.5009$.',
          'Now, multiply: $2.6651 \\times 1.5009$ — the engine returns the product as $4.0000$ to four decimal places.',
          'So, name the law’s prediction: $2^{\\sqrt{2}} \\cdot 2^{2-\\sqrt{2}} = 2^{\\sqrt{2} + 2 - \\sqrt{2}} = 2^{2} = 4$ — the product law, extended to the irrational rung, collapses the irrationality exactly.',
          'Hence the audit passes: the squeeze-defined powers keep the banked law, numerically to the four decimals claimed — which is precisely the honesty standard this book applies until the completeness chapter proves the laws outright.',
        ], answer: 'the product is $4.0000$ to four decimals, exactly as $2^{\\sqrt{2}} \\cdot 2^{2-\\sqrt{2}} = 2^{2} = 4$ predicts — the law survives the irrational rung' },
      ] },
    ] },
  ],
}


// ------------------------------------------------------------------
// lesson 9.2 — authored by the run-120 swarm (the aa92 agent), integrated verbatim
// ------------------------------------------------------------------

/**
 * Advanced Algebra — lesson 9.2 "Logarithms: the Inverse Machine"
 * (authored by agent aa92 of the RUN 120 two-agent swarm, owner directive
 * "launch multiple authoring agents"; engine-first discipline: every number
 * below was recomputed and pinned by temporary-references/v-aa92.ts BEFORE
 * this prose was written — the C-sections of that verifier are the source of
 * every decimal quoted here).
 *
 * PROVENANCE: the Cengage-style presentation contract (`cengage-jee-style`),
 * the Drive M1 module 01 scanned pages banked in temporary-references
 * (`cengage-m1-01`), Hall & Knight Higher Algebra (`hall-knight-higher-algebra`,
 * the logarithm arc of the 35-chapter TOC banked run 66) and the JEE Main unit
 * list (`jee-main-2026-syllabus`). STUDY-NEVER-REPRODUCE absolute: every
 * roster, witness, figure, Illustration, quiz item and exercise is OUR OWN.
 */

// ----------------------------------------------------------------- figures
// The palette law (house contract): structure/axes #16a34a, primary labels
// #166534, mid values #65a30d, teal captions #0d9488 / #0f766e, connectors
// and ticks #d97706, accents and arrows #ea580c, tints #fef3c7 / #ffedd5,
// separators #fcd34d, faint grids #5eead4, white-on-fill #ffffff. No other
// hex appears. Every svg carries role="img" and a full aria-label; every
// coordinate is computed from the named constants inside the helper.

function mirrorFigure92Svg(): string {
  // THE MIRROR — y = 2^x (amber) against y = log_2 x (green), reflected in
  // the line y = x (teal). Equal scales on both axes (U px per unit) so the
  // reflection is drawn as a TRUE mirror; all marked points are computed
  // from the window constants; both asymptote annotations included.
  const U = 46 // px per math unit — identical on both axes (the mirror's honesty)
  const OX = 260 // pixel x of math x = 0
  const OY = 448 // pixel y of math y = 0
  const XM = -4 // math window [XM, 8] on BOTH axes
  const px = (x: number) => OX + x * U
  const py = (y: number) => OY - y * U
  const f = (n: number) => n.toFixed(1)

  // faint lattice of unit dots
  let grid = ''
  for (let gx = -3; gx <= 7; gx += 1) {
    for (let gy = -3; gy <= 7; gy += 1) {
      if (gx === 0 && gy === 0) continue
      grid += `<circle cx="${px(gx)}" cy="${py(gy)}" r="1.2" fill="#5eead4"/>`
    }
  }

  // sample both curves point-by-point from the functions themselves
  const expPts: [number, number][] = []
  for (let x = XM; x <= 3.0001; x += 0.05) expPts.push([px(x), py(Math.pow(2, x))])
  const logPts: [number, number][] = []
  for (let y = -3.95; y <= 3.0001; y += 0.05) logPts.push([px(Math.pow(2, y)), py(y)])
  const pathOf = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${f(p[0])} ${f(p[1])}`).join(' ')

  // a dashed reflection arrow with heads at BOTH ends
  const reflArrow = (x1: number, y1: number, x2: number, y2: number): string => {
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.hypot(dx, dy)
    const ux = dx / len
    const uy = dy / len
    const h = 9
    const head = (hx: number, hy: number, vx: number, vy: number) => {
      const bx = hx - vx * h
      const by = hy - vy * h
      const ox = -vy * h * 0.45
      const oy = vx * h * 0.45
      return `<polygon points="${hx},${hy} ${bx + ox},${by + oy} ${bx - ox},${by - oy}" fill="#ea580c"/>`
    }
    return (
      `<line x1="${x1 + ux * 11}" y1="${y1 + uy * 11}" x2="${x2 - ux * 11}" y2="${y2 - uy * 11}" stroke="#ea580c" stroke-width="2" stroke-dasharray="6 4"/>` +
      head(x1, y1, -ux, -uy) +
      head(x2, y2, ux, uy)
    )
  }

  const tickX = (k: number) =>
    `<line x1="${px(k)}" y1="${py(0) - 5}" x2="${px(k)}" y2="${py(0) + 5}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${px(k)}" y="${py(0) + 18}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${k < 0 ? '−' + Math.abs(k) : k}</text>`
  const tickY = (k: number) =>
    `<line x1="${px(0) - 5}" y1="${py(k)}" x2="${px(0) + 5}" y2="${py(k)}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${px(0) - 12}" y="${py(k) + 4}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">${k < 0 ? '−' + Math.abs(k) : k}</text>`

  const expDot = (x: number, y: number) =>
    `<circle cx="${px(x)}" cy="${py(y)}" r="6" fill="#d97706" stroke="#166534" stroke-width="1.4"/>`
  const logDot = (x: number, y: number) =>
    `<circle cx="${px(x)}" cy="${py(y)}" r="6" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>`
  const lbl = (x: number, y: number, t: string, anchor: string, color: string) =>
    `<text x="${x}" y="${y}" font-size="10" font-weight="700" fill="${color}" text-anchor="${anchor}">${t}</text>`

  return `<svg viewBox="0 0 720 668" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The mirror at base two. The exponential curve y equals 2 to the x, drawn amber, rises through the points (0, 1), (1, 2), (2, 4) and (3, 8), and hugs the x-axis toward the left, passing through (minus 1, 0.5) and (minus 2, 0.25). The logarithm curve y equals log base 2 of x, drawn green, climbs through (1, 0), (2, 1), (4, 2) and (8, 3), and plunges toward the vertical asymptote x equals 0, passing through (0.5, minus 1) and (0.25, minus 2). The diagonal line y equals x, drawn teal, is the mirror: dashed orange reflection arrows join (0, 1) to (1, 0) and (2, 4) to (4, 2), each bisected by the mirror line. The exponential's horizontal asymptote y equals 0 and the logarithm's vertical asymptote x equals 0 are both marked with dashed orange segments and labels: one is the reflection of the other. The footer states that the reflection swaps every coordinate pair, and swaps the two asymptotes along with them.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the mirror: y = log₂ x is y = 2ˣ reflected in the line y = x</text>
  ${grid}
  <line x1="${px(XM)}" y1="${py(0)}" x2="${px(8)}" y2="${py(0)}" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${px(8)} ${py(0)} l -12 -5 v 10 z" fill="#16a34a"/>
  <text x="${px(8) + 16}" y="${py(0) - 6}" font-size="11" font-weight="700" fill="#166534">x</text>
  <line x1="${px(0)}" y1="${py(XM)}" x2="${px(0)}" y2="${py(8)}" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${px(0)} ${py(8)} l -5 12 h 10 z" fill="#16a34a"/>
  <text x="${px(0) + 14}" y="${py(8) + 22}" font-size="11" font-weight="700" fill="#166534">y</text>
  ${[-1, 0, 1, 2, 4, 8].map(tickX).join('')}
  ${[-2, -1, 1, 2, 4, 8].map(tickY).join('')}
  <path d="${pathOf(expPts)}" fill="none" stroke="#d97706" stroke-width="3"/>
  <path d="${pathOf(logPts)}" fill="none" stroke="#16a34a" stroke-width="3"/>
  <line x1="${px(XM)}" y1="${py(XM)}" x2="${px(8)}" y2="${py(8)}" stroke="#0d9488" stroke-width="3.4"/>
  <text x="636" y="98" font-size="11" font-weight="700" fill="#0f766e">y = x</text>
  <text x="108" y="414" font-size="11.5" font-weight="700" fill="#d97706">y = 2ˣ</text>
  <text x="452" y="326" font-size="11.5" font-weight="700" fill="#166534">y = log₂ x</text>
  ${reflArrow(px(0), py(1), px(1), py(0))}
  ${reflArrow(px(2), py(4), px(4), py(2))}
  ${expDot(0, 1)}${expDot(1, 2)}${expDot(2, 4)}${expDot(3, 8)}${expDot(-1, 0.5)}${expDot(-2, 0.25)}
  ${logDot(1, 0)}${logDot(2, 1)}${logDot(4, 2)}${logDot(8, 3)}${logDot(0.5, -1)}${logDot(0.25, -2)}
  ${lbl(px(0) - 42, py(1) - 10, '(0, 1)', 'middle', '#166534')}
  ${lbl(px(1) + 16, py(2) - 7, '(1, 2)', 'start', '#166534')}
  ${lbl(px(2) + 10, py(4) - 6, '(2, 4)', 'start', '#166534')}
  ${lbl(px(3) + 10, py(8) - 4, '(3, 8)', 'start', '#166534')}
  ${lbl(px(-2), py(0.25) + 27, '(−2, ¼)', 'middle', '#166534')}
  ${lbl(px(2) + 10, py(1) + 6, '(2, 1)', 'start', '#166534')}
  ${lbl(px(4) + 10, py(2) + 20, '(4, 2)', 'start', '#166534')}
  ${lbl(px(8) - 8, py(3) - 10, '(8, 3)', 'end', '#166534')}
  ${lbl(px(0.25) + 12, py(-2) + 5, '(¼, −2)', 'start', '#166534')}
  <line x1="470" y1="${py(0)}" x2="620" y2="${py(0)}" stroke="#ea580c" stroke-width="1.6" stroke-dasharray="7 5"/>
  <text x="545" y="${py(0) + 44}" font-size="10.5" font-weight="700" fill="#ea580c" text-anchor="middle">y = 0 — the exp's horizontal asymptote</text>
  <line x1="${px(0)}" y1="${py(0) + 12}" x2="${px(0)}" y2="620" stroke="#ea580c" stroke-width="1.6" stroke-dasharray="7 5"/>
  <text x="${px(0) + 32}" y="604" font-size="10.5" font-weight="700" fill="#ea580c">x = 0 — the log's vertical asymptote</text>
  <line x1="80" y1="636" x2="640" y2="636" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="654" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">the reflection swaps every coordinate pair — and the asymptotes with them: y = 0 ↔ x = 0</text>
</svg>`
}

function baseFamily92Svg(): string {
  // THE BASE FAMILY — five logarithm curves (bases 2, 4, 10, 0.5, 0.25), all
  // through the shared point (1, 0), all with the vertical asymptote x = 0.
  // The dashed marker at x = 8 carries the engine-pinned values 3, 1.5,
  // 0.9031, −3, −1.5, computed here from the curves themselves.
  const PX0 = 70 // pixel x of math x = 0 (the shared vertical asymptote)
  const PX1 = 640 // pixel x of math x = 9.5
  const U = (PX1 - PX0) / 9.5
  const PY0 = 390 // pixel y of math y = −3.5
  const V = 350 / 7 // px per unit of y, window [−3.5, 3.5]
  const py = (y: number) => PY0 - (y + 3.5) * V
  const px = (x: number) => PX0 + x * U
  const f = (n: number) => n.toFixed(1)
  const logB = (b: number, x: number) => Math.log(x) / Math.log(b)

  const family = [
    { b: 2, color: '#16a34a', w: 3, dash: '', label: 'y = log₂ x' },
    { b: 4, color: '#65a30d', w: 2.4, dash: '', label: 'y = log₄ x' },
    { b: 10, color: '#0d9488', w: 2.4, dash: '', label: 'y = log₁₀ x' },
    { b: 0.5, color: '#d97706', w: 2.6, dash: '', label: 'y = log½ x' },
    { b: 0.25, color: '#ea580c', w: 2.4, dash: '8 5', label: 'y = log¼ x' },
  ]
  let curves = ''
  for (const c of family) {
    // sample each curve where it stays inside the y-window [-3.45, 3.45]
    const xLo = Math.min(Math.pow(c.b, -3.45), Math.pow(c.b, 3.45))
    const xHi = Math.min(9.5, Math.max(Math.pow(c.b, -3.45), Math.pow(c.b, 3.45)))
    const pts: [number, number][] = []
    for (let k = 0; k <= 200; k += 1) {
      const x = xLo + (k / 200) * (xHi - xLo)
      pts.push([px(x), py(Math.max(-3.45, Math.min(3.45, logB(c.b, x))))])
    }
    curves += `<path d="${pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${f(p[0])} ${f(p[1])}`).join(' ')}" fill="none" stroke="${c.color}" stroke-width="${c.w}"${c.dash ? ` stroke-dasharray="${c.dash}"` : ''}/>`
  }

  const tickX = (k: number) =>
    `<line x1="${px(k)}" y1="${py(0) - 5}" x2="${px(k)}" y2="${py(0) + 5}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${px(k)}" y="${py(0) + 16}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${k}</text>`
  const tickY = (k: number) =>
    `<line x1="${PX0 - 5}" y1="${py(k)}" x2="${PX0 + 5}" y2="${py(k)}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${PX0 - 8}" y="${py(k) + 4}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">${k < 0 ? '−' + Math.abs(k) : k}</text>`

  // the value dots and labels on the x = 8 marker (engine-pinned values);
  // labels sit just below-right of each dot in the empty gaps, except −3,
  // which sits above-right (the log_{1/2} curve itself continues below)
  const vals = [
    { b: 2, t: '3', dy: 25 },
    { b: 4, t: '1.5', dy: 12 },
    { b: 10, t: '0.9031', dy: 20 },
    { b: 0.25, t: '−1.5', dy: 23 },
    { b: 0.5, t: '−3', dy: -13 },
  ]
  const valMarks = vals
    .map((v) => {
      const y = logB(v.b, 8)
      const color = v.b === 2 ? '#16a34a' : v.b === 4 ? '#65a30d' : v.b === 10 ? '#0d9488' : v.b === 0.25 ? '#ea580c' : '#d97706'
      return `<circle cx="${px(8)}" cy="${py(y)}" r="5.5" fill="${color}" stroke="#166534" stroke-width="1.4"/>` +
        `<text x="${px(8) + 16}" y="${py(y) + v.dy}" font-size="10" font-weight="800" fill="#166534">${v.t}</text>`
    })
    .join('')

  return `<svg viewBox="0 0 720 444" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The base family of logarithm curves. Five curves share the vertical asymptote x equals 0 and all pass through the common point (1, 0): the steep green curve y equals log base 2 of x, the lime curve y equals log base 4 of x, the teal curve y equals log base 10 of x, the amber falling curve y equals log base one half of x, and the dashed orange falling curve y equals log base one quarter of x. A dashed amber marker line at x equals 8 crosses the five curves, and five labelled dots read off the engine-pinned values there: log base 2 of 8 equals 3, log base 4 of 8 equals 1.5, log base 10 of 8 equals 0.9031, log base one quarter of 8 equals minus 1.5, and log base one half of 8 equals minus 3. A legend box lists the five bases with colour swatches. The footer notes that the bigger base climbs less at the same argument, and that a base below one flips the sign.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the base family: five logarithm curves, one shared point (1, 0)</text>
  <line x1="${PX0}" y1="40" x2="${PX0}" y2="390" stroke="#16a34a" stroke-width="2.6"/>
  <line x1="${PX0}" y1="${py(0)}" x2="${PX1}" y2="${py(0)}" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${PX1} ${py(0)} l -12 -5 v 10 z" fill="#16a34a"/>
  ${[1, 2, 4, 8].map(tickX).join('')}
  ${[3, 1, -1, -3].map(tickY).join('')}
  ${curves}
  <circle cx="${px(1)}" cy="${py(0)}" r="6" fill="#166534"/>
  <text x="432" y="316" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">all five pass through (1, 0)</text>
  <line x1="${px(8)}" y1="40" x2="${px(8)}" y2="390" stroke="#d97706" stroke-width="1.8" stroke-dasharray="8 5"/>
  <text x="${px(8)}" y="34" font-size="10.5" font-weight="800" fill="#d97706" text-anchor="middle">x = 8</text>
  ${valMarks}
  <rect x="102" y="44" width="132" height="88" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="1.5"/>
  ${family
    .map((c, i) => {
      const ry = 56 + i * 17
      return `<line x1="110" y1="${ry - 3}" x2="142" y2="${ry - 3}" stroke="${c.color}" stroke-width="${c.w}"${c.dash ? ` stroke-dasharray="${c.dash}"` : ''}/>` +
        `<text x="150" y="${ry}" font-size="10.5" font-weight="700" fill="#166534">${c.label}</text>`
    })
    .join('')}
  <text x="118" y="378" font-size="10.5" font-weight="700" fill="#0f766e">x = 0 — the vertical asymptote of every member</text>
  <line x1="80" y1="398" x2="640" y2="398" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="412" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">at x = 8 the family reads 3, 1.5, 0.9031, −3, −1.5</text>
  <text x="360" y="428" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">the bigger base climbs less at the same argument; a base below 1 flips the sign</text>
</svg>`
}

function eLadder92Svg(): string {
  // THE e-LADDER — the bars of (1 + 1/m)^m at m = 1, 10, 100, 1000, 10^6,
  // computed here from the formula, climbing toward the dashed e-line at
  // e = 2.718281828… with the band 2.7–2.8 shaded.
  const AXIS_X = 100
  const BASE_Y = 300 // pixel y of value 0
  const PV = 80 // px per unit of value (window [0, 3])
  const py = (v: number) => BASE_Y - v * PV
  const f = (n: number) => n.toFixed(1)
  const ladder = [1, 10, 100, 1000, 1e6]
  const val = (m: number) => Math.pow(1 + 1 / m, m)
  const centers = [160, 280, 400, 520, 640]
  const barW = 60
  const E = Math.exp(1)

  let bars = ''
  ladder.forEach((m, i) => {
    const v = val(m)
    const cx = centers[i]
    bars += `<rect x="${cx - barW / 2}" y="${f(py(v))}" width="${barW}" height="${f(BASE_Y - py(v))}" rx="3" fill="#ffedd5" stroke="#16a34a" stroke-width="1.6"/>`
    bars += `<text x="${cx}" y="${f(py(v) + 17)}" font-size="10" font-weight="800" fill="#166534" text-anchor="middle">${v.toFixed(6)}</text>`
    bars += `<text x="${cx}" y="316" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">m = ${m === 1e6 ? '10⁶' : m}</text>`
  })

  const tick = (v: number, ly: number) =>
    `<line x1="${AXIS_X - 6}" y1="${py(v)}" x2="${AXIS_X}" y2="${py(v)}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${AXIS_X - 10}" y="${ly}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">${v === 2.7 ? '2.7' : v === 2.8 ? '2.8' : v}</text>`

  return `<svg viewBox="0 0 720 356" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The e-ladder. A vertical value axis runs from 0 to 3, and five amber bars show one plus one over m, all raised to the m, at m equals 1, 10, 100, 1000 and one million, with heights 2.000000, 2.593742, 2.704814, 2.716924 and 2.718280 — each bar labelled with its six-decimal value. A shaded band between the gridlines 2.7 and 2.8 contains the three tallest bar tops, and a dashed orange e-line at e equals 2.718281828 runs just above the last bar, which already meets it to the pixel. The footer notes the climb of the ladder and that the last bar is visually indistinguishable from the limit.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the e-ladder: (1 + 1/m)^m climbs toward e = 2.718281828…</text>
  <rect x="${AXIS_X}" y="${f(py(2.8))}" width="590" height="${f(py(2.7) - py(2.8))}" fill="#fef3c7"/>
  <line x1="${AXIS_X}" y1="${f(py(2.7))}" x2="690" y2="${f(py(2.7))}" stroke="#d97706" stroke-width="1.4" stroke-dasharray="6 4"/>
  <line x1="${AXIS_X}" y1="${f(py(2.8))}" x2="690" y2="${f(py(2.8))}" stroke="#d97706" stroke-width="1.4" stroke-dasharray="6 4"/>
  <text x="300" y="62" font-size="10.5" font-weight="700" fill="#d97706" text-anchor="middle">the band 2.7 &lt; e &lt; 2.8</text>
  ${bars}
  <line x1="${AXIS_X}" y1="${BASE_Y}" x2="${AXIS_X}" y2="60" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${AXIS_X} 60 l -5 12 h 10 z" fill="#16a34a"/>
  ${[0, 1, 2].map((v) => tick(v, py(v) + 4)).join('')}
  ${tick(3, py(3) - 2)}${tick(2.8, py(2.8) - 2)}${tick(2.7, py(2.7) + 4)}
  <line x1="${AXIS_X}" y1="${f(py(E))}" x2="690" y2="${f(py(E))}" stroke="#ea580c" stroke-width="2" stroke-dasharray="9 6"/>
  <text x="700" y="76" font-size="10.5" font-weight="800" fill="#166534" text-anchor="end">e = 2.718281828…</text>
  <line x1="${AXIS_X}" y1="${BASE_Y}" x2="690" y2="${BASE_Y}" stroke="#16a34a" stroke-width="2"/>
  <line x1="90" y1="328" x2="690" y2="328" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="342" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">the climb 2 → 2.593742 → 2.704814 → 2.716924 → 2.718280 — the last bar meets the e-line to the pixel</text>
</svg>`
}

function rootCount92Svg(): string {
  // THE UNIQUE CROSSING (lesson Illustration) — the rising log curve
  // y = log_2(x + 3) against the falling line y = 8 − x, crossing at the
  // computed point (5, 3); both curves sampled from their formulas.
  const PX0 = 80 // pixel x of math x = −1
  const PX1 = 640 // pixel x of math x = 9
  const U = (PX1 - PX0) / 10
  const py0 = 204 // pixel y of math y = −1
  const V = 174 / 6 // px per unit of y, window [−1, 5]
  const px = (x: number) => PX0 + (x + 1) * U
  const py = (y: number) => py0 - (y + 1) * V
  const f = (n: number) => n.toFixed(1)
  const log2 = (x: number) => Math.log(x) / Math.log(2)

  const logPts: [number, number][] = []
  for (let x = -1; x <= 9.0001; x += 0.05) logPts.push([px(x), py(log2(x + 3))])
  const linePts: [number, number][] = []
  for (let x = 3; x <= 9.0001; x += 0.05) linePts.push([px(x), py(8 - x)])
  const pathOf = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${f(p[0])} ${f(p[1])}`).join(' ')

  const tickX = (k: number) =>
    `<line x1="${px(k)}" y1="${py(0) - 5}" x2="${px(k)}" y2="${py(0) + 5}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${px(k)}" y="${py(0) + 17}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${k}</text>`
  const tickY = (k: number) =>
    `<line x1="${px(0) - 5}" y1="${py(k)}" x2="${px(0) + 5}" y2="${py(k)}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${px(0) - 8}" y="${py(k) + 4}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">${k}</text>`

  return `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Counting solutions of log base 2 of x plus 3 equals 8 minus x. The green logarithm curve y equals log base 2 of x plus 3 rises gently from the left, and the amber line y equals 8 minus x falls steeply from the top left; they cross exactly once, at the point (5, 3), marked with an orange dot labelled (5, 3), the solution. Axis ticks at x equals 0, 2, 4, 8 and y equals 1, 2, 3, 4. The footer states that both sides equal 3 at x equals 5, and that the strictly increasing auxiliary function h meets zero once, so x equals 5 is the unique solution.">
  <text x="360" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">counting solutions: log₂(x + 3) = 8 − x has exactly one root</text>
  <line x1="${px(-1)}" y1="${py(0)}" x2="${px(9)}" y2="${py(0)}" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${px(9)} ${py(0)} l -12 -5 v 10 z" fill="#16a34a"/>
  <line x1="${px(0)}" y1="${py(-1)}" x2="${px(0)}" y2="${py(5)}" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${px(0)} ${py(5)} l -5 12 h 10 z" fill="#16a34a"/>
  ${[0, 2, 4, 8].map(tickX).join('')}
  ${[1, 2, 3, 4].map(tickY).join('')}
  <path d="${pathOf(logPts)}" fill="none" stroke="#16a34a" stroke-width="2.8"/>
  <path d="${pathOf(linePts)}" fill="none" stroke="#d97706" stroke-width="2.8"/>
  <circle cx="${px(5)}" cy="${py(3)}" r="6.5" fill="#ea580c" stroke="#166534" stroke-width="1.4"/>
  <text x="${px(5) + 8}" y="${py(3) - 23}" font-size="11" font-weight="800" fill="#ea580c">(5, 3) — the solution</text>
  <text x="${px(4) - 116}" y="${py(4) - 9}" font-size="10.5" font-weight="700" fill="#d97706">y = 8 − x</text>
  <text x="240" y="138" font-size="10.5" font-weight="700" fill="#166534">y = log₂(x + 3)</text>
  <text x="150" y="166" font-size="10" font-weight="700" fill="#0f766e">h(x) = log₂(x + 3) + x − 8 rises strictly — at most one root</text>
  <line x1="80" y1="212" x2="640" y2="212" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="228" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">at x = 5 both sides equal 3 — and the rising h meets zero once, so x = 5 is THE solution</text>
</svg>`
}

function solfigBandL3b92Svg(): string {
  // SOLUTION FIGURE on L3(b) — the log_10 curve with the horizontal band
  // 1/2–2/3 and the vertical marker at x = 4; the two wall-crossings at
  // 10^{1/2} = 3.1623 and 10^{2/3} = 4.6416 are computed here.
  const PX0 = 70 // pixel x of math x = 0
  const U = 560 / 12
  const py0 = 206 // pixel y of math y = −0.2
  const V = 172 / 1.4 // px per unit of y, window [−0.2, 1.2]
  const px = (x: number) => PX0 + x * U
  const py = (y: number) => py0 - (y + 0.2) * V
  const f = (n: number) => n.toFixed(1)
  const lg = (x: number) => Math.log(x) / Math.log(10)

  const pts: [number, number][] = []
  for (let x = 0.63; x <= 12.0001; x += 0.03) pts.push([px(x), py(Math.max(-0.2, lg(x)))])

  const tickX = (k: number) =>
    `<line x1="${px(k)}" y1="${py(0) - 5}" x2="${px(k)}" y2="${py(0) + 5}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${px(k)}" y="${py(0) + 16}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${k}</text>`

  return `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The honest squeeze on log base 10 of 4. The green curve y equals log base 10 of x crosses the shaded horizontal band between y equals one half and y equals two thirds; the band's dashed edges are labelled. The curve enters the band at the dot x equals 3.1623 — the square root of ten — and leaves it at the dot x equals 4.6416, which is ten to the power two thirds. A dashed orange vertical marker at x equals 4 meets the curve at the labelled dot log base 10 of 4 equals 0.60206, inside the band. Axis ticks at x equals 1, 2, 4, 10 and y equals one half, two thirds and 1. The footer states that x equals 4 sits between the two wall-crossings, so the logarithm lies inside the band.">
  <text x="360" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the honest squeeze: 1/2 &lt; log₁₀ 4 &lt; 2/3</text>
  <rect x="${PX0}" y="${f(py(2 / 3))}" width="560" height="${f(py(0.5) - py(2 / 3))}" fill="#fef3c7"/>
  <line x1="${PX0}" y1="${f(py(0.5))}" x2="630" y2="${f(py(0.5))}" stroke="#d97706" stroke-width="1.4" stroke-dasharray="6 4"/>
  <line x1="${PX0}" y1="${f(py(2 / 3))}" x2="630" y2="${f(py(2 / 3))}" stroke="#d97706" stroke-width="1.4" stroke-dasharray="6 4"/>
  <line x1="${PX0}" y1="${py(-0.2)}" x2="${PX0}" y2="34" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${PX0} 34 l -5 12 h 10 z" fill="#16a34a"/>
  <line x1="${PX0}" y1="${py(0)}" x2="630" y2="${py(0)}" stroke="#16a34a" stroke-width="2"/>
  <path d="M 630 ${py(0)} l -12 -5 v 10 z" fill="#16a34a"/>
  ${[1, 2, 4, 10].map(tickX).join('')}
  <line x1="${PX0 - 5}" y1="${f(py(0.5))}" x2="${PX0}" y2="${f(py(0.5))}" stroke="#0f766e" stroke-width="1.6"/>
  <text x="${PX0 - 8}" y="${f(py(0.5) + 4)}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">y = 1/2</text>
  <line x1="${PX0 - 5}" y1="${f(py(2 / 3))}" x2="${PX0}" y2="${f(py(2 / 3))}" stroke="#0f766e" stroke-width="1.6"/>
  <text x="${PX0 - 8}" y="${f(py(2 / 3) + 4)}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">y = 2/3</text>
  <line x1="${PX0 - 5}" y1="${f(py(1))}" x2="${PX0}" y2="${f(py(1))}" stroke="#0f766e" stroke-width="1.6"/>
  <text x="${PX0 - 8}" y="${f(py(1) + 4)}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">1</text>
  <path d="${pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${f(p[0])} ${f(p[1])}`).join(' ')}" fill="none" stroke="#16a34a" stroke-width="2.8"/>
  <circle cx="${px(Math.sqrt(10))}" cy="${f(py(0.5))}" r="5.5" fill="#d97706" stroke="#166534" stroke-width="1.4"/>
  <text x="${px(Math.sqrt(10))}" y="${f(py(0.5) - 10)}" font-size="10" font-weight="800" fill="#166534" text-anchor="middle">3.1623</text>
  <circle cx="${px(Math.pow(10, 2 / 3))}" cy="${f(py(2 / 3))}" r="5.5" fill="#d97706" stroke="#166534" stroke-width="1.4"/>
  <text x="${px(Math.pow(10, 2 / 3)) - 3}" y="${f(py(2 / 3) - 12)}" font-size="10" font-weight="800" fill="#166534" text-anchor="middle">4.6416</text>
  <line x1="${px(4)}" y1="34" x2="${px(4)}" y2="${py(-0.2)}" stroke="#ea580c" stroke-width="1.6" stroke-dasharray="7 5"/>
  <circle cx="${px(4)}" cy="${f(py(lg(4)))}" r="6" fill="#ea580c" stroke="#166534" stroke-width="1.4"/>
  <line x1="${px(4) + 2}" y1="${f(py(lg(4)) + 4)}" x2="268" y2="158" stroke="#ea580c" stroke-width="1.4" stroke-dasharray="4 3"/>
  <text x="270" y="162" font-size="10" font-weight="800" fill="#166534">log₁₀ 4 = 0.60206 — inside the band</text>
  <text x="545" y="68" font-size="10.5" font-weight="700" fill="#166534">y = log₁₀ x</text>
  <line x1="80" y1="216" x2="640" y2="216" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="230" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">the curve enters the band at x = 3.1623 and leaves at x = 4.6416; x = 4 sits between — so log₁₀ 4 lies inside</text>
</svg>`
}

function solfigCrossL4a92Svg(): string {
  // SOLUTION FIGURE on L4(a) — the falling line y = 4 − x against the rising
  // log curve y = log_2(x + 7), crossing exactly once at the computed (1, 3).
  const PX0 = 80 // pixel x of math x = −3
  const U = 560 / 11
  const py0 = 200 // pixel y of math y = −0.5
  const V = 170 / 5 // px per unit of y, window [−0.5, 4.5]
  const px = (x: number) => PX0 + (x + 3) * U
  const py = (y: number) => py0 - (y + 0.5) * V
  const f = (n: number) => n.toFixed(1)
  const log2 = (x: number) => Math.log(x) / Math.log(2)

  const logPts: [number, number][] = []
  for (let x = -3; x <= 8.0001; x += 0.05) logPts.push([px(x), py(log2(x + 7))])
  const linePts: [number, number][] = []
  for (let y = 4.5; y >= -0.5; y -= 0.05) linePts.push([px(4 - y), py(y)])
  const pathOf = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${f(p[0])} ${f(p[1])}`).join(' ')

  const tickX = (k: number) =>
    `<line x1="${px(k)}" y1="${py(0) - 5}" x2="${px(k)}" y2="${py(0) + 5}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${px(k)}" y="${py(0) + 17}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${k}</text>`
  const tickY = (k: number) =>
    `<line x1="${px(0) - 5}" y1="${py(k)}" x2="${px(0) + 5}" y2="${py(k)}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${px(0) - 8}" y="${py(k) + 4}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">${k}</text>`

  return `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The unique crossing of log base 2 of x plus 7 equals 4 minus x. The green curve y equals log base 2 of x plus 7 rises from the left, and the amber line y equals 4 minus x falls from the top left; they cross exactly once at the point (1, 3), marked with an orange dot labelled (1, 3). Axis ticks at x equals 0, 2, 4, 8 and y equals 1, 2, 3, 4. The footer states that both sides equal 3 at x equals 1, and that the strictly increasing auxiliary function has no second zero, so there is no other crossing.">
  <text x="360" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the unique crossing of log₂(x + 7) = 4 − x</text>
  <line x1="${px(-3)}" y1="${py(0)}" x2="${px(8)}" y2="${py(0)}" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${px(8)} ${py(0)} l -12 -5 v 10 z" fill="#16a34a"/>
  <line x1="${px(0)}" y1="${py(-0.5)}" x2="${px(0)}" y2="${py(4.5)}" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${px(0)} ${py(4.5)} l -5 12 h 10 z" fill="#16a34a"/>
  ${[0, 2, 4, 8].map(tickX).join('')}
  ${[1, 2, 3, 4].map(tickY).join('')}
  <path d="${pathOf(logPts)}" fill="none" stroke="#16a34a" stroke-width="2.8"/>
  <path d="${pathOf(linePts)}" fill="none" stroke="#d97706" stroke-width="2.8"/>
  <circle cx="${px(1)}" cy="${py(3)}" r="6.5" fill="#ea580c" stroke="#166534" stroke-width="1.4"/>
  <text x="${px(1) + 10}" y="${py(3) - 23}" font-size="11" font-weight="800" fill="#ea580c">(1, 3)</text>
  <text x="${px(0) + 18}" y="${py(4) - 6}" font-size="10.5" font-weight="700" fill="#d97706">y = 4 − x</text>
  <text x="470" y="100" font-size="10.5" font-weight="700" fill="#166534">y = log₂(x + 7)</text>
  <text x="418" y="38" font-size="10" font-weight="700" fill="#0f766e">the rising log meets the falling line once</text>
  <line x1="80" y1="212" x2="640" y2="212" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="228" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">both sides equal 3 at x = 1; h(x) = log₂(x + 7) + x − 4 is strictly increasing, so no other crossing exists</text>
</svg>`
}

function solfigCubicL4b92Svg(): string {
  // SOLUTION FIGURE on L4(b) — the cubic y = x³ against the falling log
  // y = log_{1/2} x, crossing exactly once; the crossing is located here by
  // bisection (the same computation the engine pins at x ≈ 0.7481).
  const PX0 = 70 // pixel x of math x = 0
  const U = 580 / 1.8
  const py0 = 204 // pixel y of math y = −0.8
  const V = 170 / 2.4 // px per unit of y, window [−0.8, 1.6]
  const px = (x: number) => PX0 + x * U
  const py = (y: number) => py0 - (y + 0.8) * V
  const f = (n: number) => n.toFixed(1)
  const logHalf = (x: number) => -Math.log(x) / Math.log(2)

  // bisection on g(x) = x^3 + log_2 x = x^3 − log_{1/2} x, inside the helper
  let a = 0.5
  let b = 1
  for (let i = 0; i < 60; i += 1) {
    const mid = (a + b) / 2
    if (mid ** 3 + Math.log(mid) / Math.log(2) < 0) a = mid
    else b = mid
  }
  const r = (a + b) / 2

  const cubPts: [number, number][] = []
  for (let x = 0.55; x <= 1.1451; x += 0.005) cubPts.push([px(x), py(x ** 3)])
  const logPts: [number, number][] = []
  for (let x = 0.33; x <= 1.7401; x += 0.005) logPts.push([px(x), py(Math.max(-0.8, logHalf(x)))])
  const pathOf = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${f(p[0])} ${f(p[1])}`).join(' ')

  const tickY = (k: number) =>
    `<line x1="${PX0 - 5}" y1="${py(k)}" x2="${PX0 + 5}" y2="${py(k)}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${PX0 - 8}" y="${py(k) + 4}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">${k}</text>`

  return `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Counting the solutions of x cubed equals log base one half of x. The amber cubic y equals x cubed rises from near the origin, and the green falling logarithm curve y equals log base one half of x descends from the top left; they cross exactly once, near x equals 0.75, at the orange dot labelled with the bisection-pinned coordinates (0.7481, 0.4187), joined by a dashed leader line. The y-axis is drawn at x equals 0 with ticks at 1, 0.5 and minus 0.5. The footer states that for x above 1 the logarithm is negative while the cubic is positive, so no crossing happens there, and that on the interval from 0 to 1 one curve rises while the other falls: exactly one crossing.">
  <text x="360" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">x³ = log½ x: exactly one crossing</text>
  <line x1="${PX0}" y1="${py(-0.8)}" x2="${PX0}" y2="34" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${PX0} 34 l -5 12 h 10 z" fill="#16a34a"/>
  <line x1="${PX0}" y1="${py(0)}" x2="650" y2="${py(0)}" stroke="#16a34a" stroke-width="2"/>
  <path d="M 650 ${py(0)} l -12 -5 v 10 z" fill="#16a34a"/>
  ${[1, 0.5, -0.5].map(tickY).join('')}
  <path d="${pathOf(logPts)}" fill="none" stroke="#16a34a" stroke-width="2.8"/>
  <path d="${pathOf(cubPts)}" fill="none" stroke="#d97706" stroke-width="2.8"/>
  <circle cx="${px(r)}" cy="${py(r ** 3)}" r="6.5" fill="#ea580c" stroke="#166534" stroke-width="1.4"/>
  <line x1="466" y1="70" x2="${px(r) + 7}" y2="${py(r ** 3) - 5}" stroke="#ea580c" stroke-width="1.4" stroke-dasharray="4 3"/>
  <text x="470" y="66" font-size="10.5" font-weight="800" fill="#ea580c">(${r.toFixed(4)}, ${(r ** 3).toFixed(4)})</text>
  <text x="444" y="44" font-size="10.5" font-weight="700" fill="#d97706">y = x³</text>
  <text x="232" y="98" font-size="10.5" font-weight="700" fill="#166534" text-anchor="end">y = log½ x</text>
  <line x1="80" y1="216" x2="640" y2="216" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="230" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">x &gt; 1: the log negative, x³ positive — no crossing; on (0, 1) one falls as the other rises: exactly one</text>
</svg>`
}

// ---------------------------------------------------------------- the lesson

export const lesson92: Lesson = {
  id: 'aa-logarithms-the-inverse-machine',
  number: '9.2',
  title: 'Logarithms: the Inverse Machine',
  concepts: [
    'the logarithm: the exponent read backwards',
    'the definition pair log_a y = x iff a^x = y',
    'the two inverse identities',
    'the mirror law and the vertical asymptote x = 0',
    'the base-symmetry law log_{1/a} x = −log_a x',
    'the sign law: ordering and squeezing without tables',
    'irrational logarithms by unique factorisation',
    'natural logarithms: ln x = log_e x and the number e',
  ],
  objectives: [
    'Define the logarithm by the pair $\\log_a y = x \\iff a^x = y$ and read values off at sight — including fractional and negative exponents, as in $\\log_4 8 = \\tfrac{3}{2}$ and $\\log_{2\\sqrt{2}} 128 = \\tfrac{14}{3}$.',
    'Derive and use both inverse identities $a^{\\log_a y} = y$ and $\\log_a(a^x) = x$ — collapsing towers such as $\\log_2\\log_2\\log_2\\log_2 65536$ without any table.',
    'Graph $y = \\log_a x$ as the reflection of $y = a^x$ in the line $y = x$: derive the mirror law, the vertical asymptote $x = 0$, the domain $(0, \\infty)$, the shared point $(1, 0)$ and the behaviour by base — including the honest decaying family for $0 < a < 1$.',
    'Read logarithms without tables: order them by base, sign them by the sign law, squeeze them between fractions by monotonicity, and prove irrationality by unique factorisation.',
    'Count solutions of mixed equations such as $\\log_2(x+3) = 8 - x$ by monotonicity arguments that prove uniqueness, not just existence.',
    'State the natural logarithm $\\ln x = \\log_e x$ with $e \\approx 2.718281828$, its common twin $\\log x = \\log_{10} x$, and evaluate the doorstep constants $\\ln 2 \\approx 0.6931$, $\\ln 7 \\approx 1.9459$ and $\\ln 10 \\approx 2.3026$.',
  ],
  prerequisites: [
    'aa-the-exponential-family-every-real-index',
    'aa-inverse-functions-the-machine-undone',
    'ans-fundamental-theorem-of-arithmetic',
  ],
  sources: [
    'cengage-m1-01',
    'cengage-jee-style',
    'hall-knight-higher-algebra',
    'jee-main-2026-syllabus',
  ],
  blocks: [
    // ============================================================ opening
    { kind: 'para', text: 'Chapter 1 spent its fourth lesson on machines and their undos. A machine there was a rule turning inputs into outputs; a strictly monotone machine was one whose outputs never repeat — one-one — and such a machine can always be undone: there exists a second machine $f^{-1}$ that takes each output back to the input that produced it. The undo was proved to satisfy the two cancellation identities $f^{-1}(f(x)) = x$ and $f(f^{-1}(y)) = y$, and its graph was proved to be the original graph reflected in the line $y = x$, with the domain and range trading places. What chapter 1 did not supply was a stock of interesting machines to undo: the theory was built and then left waiting for tenants.' },
    { kind: 'para', text: 'Lesson 9.1 moved the tenants in. For every legal base $a > 0$ with $a \\neq 1$, the rule $x \\mapsto a^x$ — the exponential machine — is strictly monotone over all of $\\mathbb{R}$: increasing when $a > 1$, decreasing when $0 < a < 1$. Being monotone it is one-one, so its undo exists; and its range is exactly the open half-line $(0, \\infty)$ — no exponential ever touches zero or turns negative, whatever the exponent does. So the undo is guaranteed in advance: it accepts positive numbers, and it hands back the exponents that built them. Its domain is $(0, \\infty)$; its range is all of $\\mathbb{R}$; chapter 1 promised both, and this lesson collects.' },
    { kind: 'para', text: 'This lesson cashes the cheque. The undo of the exponential machine has served mathematics for four centuries under the name LOGARITHM, and the plan is the platform\'s usual one. First the definition, read straight off the definition pair; then the two inverse identities that the undo must satisfy, derived rather than announced; then the mirror law for the two graphs, with the vertical asymptote it forces; and then the reading crafts — how to order logarithms, how to read their signs, how to squeeze one between fractions, and how to prove one irrational without opening a decimal table. A fold near the end names the two bases that earn permanent names, $e$ and $10$, and the natural logarithm $\\ln x$ that the sciences run on. No lesson of this book starts at the definition: this one starts at the question the definition answers.' },

    // ================================================ the definition
    { kind: 'heading', text: 'The Definition: Reading Off the Exponent' },
    { kind: 'para', text: 'The exponential machine $f(x) = a^x$ takes an exponent and builds a number. The natural question to ask next runs the machine backwards: given a number $y$ — a positive one, since positives are all the machine ever builds — WHICH exponent does the base $a$ need in order to construct $y$? For $y = 8$ and base $2$ the answer is $3$, because $2^3 = 8$; for $y = 8$ and base $4$ the answer is $\\tfrac{3}{2}$, because $4^{3/2} = 8$. The answer depends on the base, so it is a function of two things at once: the number $y$ being examined, and the base $a$ doing the building. Naming that answer is the whole content of the definition — and, unusually for so famous a word, one sentence finishes the job.' },
    { kind: 'callout', tone: 'definition', title: 'Logarithm to a Base', text: 'Let $a$ be a real number with $a > 0$ and $a \\neq 1$ (a legal base), and let $y > 0$. A real number $x$ is said to be the LOGARITHM of $y$ to the base $a$, written $x = \\log_a y$, if $a^x = y$. Thus the logarithm base $a$ of $y$ is the EXPONENT that builds $y$ out of $a$ — the answer to the backward question. The word names the exponent, never the power: $\\log_a y$ is a number of the same kind as $x$, not of the same kind as $y$.' },
    { kind: 'equation', latex: '\\log_a y = x \\iff a^x = y \\tag{1}', note: 'the definition pair: the two statements carry exactly the same information, for $a > 0$, $a \\neq 1$ and $y > 0$. Every property of the logarithm in this book is derived by reading one of these two arrows — nothing else is ever needed.' },
    { kind: 'equation', latex: 'a^{\\log_a y} = y \\iff \\log_a a^x = x \\tag{2}', note: 'the pair of inverse identities — the machine and its undo annihilating each other in both orders. They are stated now for orientation and derived below in two moves from the definition pair.' },
    { kind: 'para', text: 'For example, the definition pair converts each of the following questions — "which exponent?" — into a single arithmetic check:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $\\log_{10} 1000 = 3$, because $10^3 = 1000$ — three factors of ten build a thousand.',
      '(ii) $\\log_2 64 = 6$, because $2^6 = 64$ — the exponent is read straight off the factorisation.',
      '(iii) $\\log_3 \\tfrac{1}{9} = -2$, because $3^{-2} = \\tfrac{1}{9}$ — a negative exponent divides, so the logarithm of a proper fraction (at a base above one) is negative.',
      '(iv) $\\log_4 8 = \\tfrac{3}{2}$, because $4^{3/2} = (2^2)^{3/2} = 2^3 = 8$ — the fractional index of lesson 9.1, cashed at sight.',
      '(v) $\\log_{2\\sqrt{2}} 128 = \\tfrac{14}{3}$, because $2\\sqrt{2} = 2^{3/2}$ and $\\left(2^{3/2}\\right)^{14/3} = 2^7 = 128$ — an engineered base hiding a fractional exponent, exposed by rewriting both base and argument as powers of $2$.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The domain discipline', text: '$\\log_a y$ exists only for $y > 0$ — never at $y = 0$ and never for negative $y$. The reason is 9.1\'s range law: $a^x > 0$ for every real exponent $x$, so no other kind of number is ever built, and no exponent can be read off for it. $\\log_2(-8)$ is a refusal — no real $x$ has $2^x = -8$; $\\log_2 0$ is a refusal too, since $2^x$ decays toward $0$ as $x \\to -\\infty$ but never reaches it. Writing either of these on an examination paper costs the whole question, not half of it.' },
    { kind: 'para', text: 'Two anchors fall out of the definition immediately, and they deserve reflex status because every later computation leans on them. Put $y = 1$: the exponent that builds $1$ out of any legal base is $0$, since $a^0 = 1$. Put $y = a$: the exponent that builds the base out of itself is $1$, since $a^1 = a$. Both hold for every legal base alike — base above one or below one, rational or irrational, $e$ included:' },
    { kind: 'equation', latex: '\\log_a 1 = 0 \\quad \\text{and} \\quad \\log_a a = 1 \\tag{3}', note: 'the two anchors: every logarithm curve therefore passes through $(1, 0)$, whatever its base — the shared point that the base-family figure below makes visible.' },
    { kind: 'para', text: 'In the language of chapter 1, the definition simply names the undo of the exponential machine. The machine and its undo stand side by side, domains and ranges traded exactly as promised:' },
    { kind: 'equation', latex: 'f(x) = a^x: \\;\\; f: \\mathbb{R} \\to (0, \\infty) \\qquad\\quad f^{-1}(y) = \\log_a y: \\;\\; f^{-1}: (0, \\infty) \\to \\mathbb{R} \\tag{4}', note: 'the machine eats real exponents and builds positive numbers; the undo eats positive numbers and hands back real exponents. The arrow directions swap, and so do the two sets.' },
    { kind: 'table', caption: 'The two machines contrasted. The undo column is the machine column read backwards — the same monotonicity, the same one-one-ness, the anchor point and the asymptote reflected. Lesson 9.1 established every entry of the left column; the right column follows from the inverse-machine theory of lesson 1.4 together with the definition pair.', head: ['property', 'the machine $y = a^x$', 'its undo $y = \\log_a x$'], rows: [
      ['domain', 'all of $\\mathbb{R}$', '$(0, \\infty)$ — positives only'],
      ['range', '$(0, \\infty)$ — positives only', 'all of $\\mathbb{R}$'],
      ['anchor point', 'passes through $(0, 1)$', 'passes through $(1, 0)$'],
      ['one-one?', 'yes — strictly monotone (lesson 9.1)', 'yes — the undo of a one-one machine'],
      ['for $a > 1$', 'strictly increasing', 'strictly increasing'],
      ['for $0 < a < 1$', 'strictly decreasing', 'strictly decreasing'],
      ['asymptote', 'horizontal: $y = 0$', 'vertical: $x = 0$'],
    ] },
    { kind: 'derivation', title: 'The two inverse identities', statement: 'For every legal base $a > 0$ with $a \\neq 1$: $\\log_a(a^x) = x$ for every real $x$, and $a^{\\log_a y} = y$ for every $y > 0$. Each identity is two moves away from the definition pair.', steps: [
      { label: 'Every positive y is reached', formula: 'y > 0 \\;\\Rightarrow\\; \\text{some real } x \\text{ has } a^x = y', explanation: 'lesson 9.1\'s range law: the range of $x \\mapsto a^x$ is exactly $(0, \\infty)$, so no positive number is missed — the undo has nothing to refuse.' },
      { label: 'Read the definition on that x', formula: '\\log_a y = x', explanation: 'the definition pair turns the true statement $a^x = y$ into the equally true statement $\\log_a y = x$ — the exponent that builds $y$ is exactly the $x$ we started from.' },
      { label: 'Substitute back', formula: 'a^{\\log_a y} = a^x = y', explanation: 'replace the inner $y$ by the $a^x$ that built it, then collapse: the machine runs forward on the exponent its undo hands it, and rebuilds the original number. This is the second identity.' },
      { label: 'Run it the other way', formula: 'y = a^x \\;\\Rightarrow\\; \\log_a(a^x) = x', explanation: 'now start from any real $x$ and put $y = a^x$, which is positive by the range law; the definition reads $\\log_a y = x$, and substituting $a^x$ for $y$ leaves the first identity. The two moves are the same two moves, travelled in opposite directions.' },
    ], result: '$a^{\\log_a y} = y$ for all $y > 0$, and $\\log_a(a^x) = x$ for all real $x$ — the machine and its undo annihilate each other in both orders' },
    { kind: 'example', title: 'Evaluate $3^{\\log_3 8}$, $7^{2\\log_7 3}$, $10^{-3\\log 2}$, $2^{4\\log_2 5}$, and the nested read $\\log_2\\log_2\\log_2\\log_2 65536$', steps: [
      'Read the shape first: each outer tower $b^{\\log_b t}$ collapses to $t$ by the second inverse identity, so $3^{\\log_3 8} = 8$ at sight — the machine runs forward on the exponent its undo hands it.',
      'Now, $7^{2\\log_7 3}$: the exponent is $2\\log_7 3$, and the clean move is to collapse first and square after — $7^{2\\log_7 3} = \\left(7^{\\log_7 3}\\right)^2 = 3^2 = 9$ — never "multiply the log into the base" blindly: one identity kills one undo, and the square is then ordinary arithmetic.',
      'Same move at base ten: $10^{-3\\log 2} = \\left(10^{\\log 2}\\right)^{-3} = 2^{-3} = \\tfrac{1}{8}$, where $\\log 2$ is the common (base-ten) logarithm meeting the same identity its base-mates meet.',
      'And at base two: $2^{4\\log_2 5} = \\left(2^{\\log_2 5}\\right)^4 = 5^4 = 625$.',
      'Now, the nested read works from the inside out, one identity per layer: $\\log_2 65536 = 16$ (since $2^{16} = 65536$), then $\\log_2 16 = 4$, then $\\log_2 4 = 2$, then $\\log_2 2 = 1$ — the chain $65536 \\to 16 \\to 4 \\to 2 \\to 1$, each arrow one inverse identity, ending at the anchor $\\log_a a = 1$.',
      'Hence $3^{\\log_3 8} = 8$, $7^{2\\log_7 3} = 9$, $10^{-3\\log 2} = \\tfrac{1}{8}$, $2^{4\\log_2 5} = 625$, and $\\log_2\\log_2\\log_2\\log_2 65536 = 1$ — five collapses, each a one-line move, no table opened anywhere.',
    ] },
    { kind: 'terms', items: [
      { term: 'Logarithm to the base a', def: 'the exponent $x$ with $a^x = y$ — defined only for $y > 0$ and legal bases $a > 0$, $a \\neq 1$; the definition pair $\\log_a y = x \\iff a^x = y$ carries the whole content.' },
      { term: 'Inverse machine', def: 'chapter 1\'s undo of a one-one machine $f$: the rule $f^{-1}$ with $f^{-1}(f(x)) = x$ and $f(f^{-1}(y)) = y$ — the logarithm is the inverse machine of the exponential.' },
      { term: 'Domain swap', def: 'the undo trades domain with range: $f: \\mathbb{R} \\to (0, \\infty)$ becomes $\\log_a: (0, \\infty) \\to \\mathbb{R}$ — positives in, exponents out.' },
      { term: 'Natural logarithm', def: 'the logarithm to the base $e = 2.718281828\\ldots$, written $\\ln x = \\log_e x$ and defined for $x > 0$ — the fold section below builds it.' },
      { term: 'Common logarithm', def: 'the logarithm to the base $10$, written $\\log x = \\log_{10} x$ — the decadic logarithm of the tables\' world.' },
      { term: 'Mirror law', def: 'the graph of $y = \\log_a x$ is the graph of $y = a^x$ reflected in the line $y = x$: $(p, q)$ on one curve exactly when $(q, p)$ on the other.' },
      { term: 'Vertical asymptote', def: 'the line $x = 0$: the logarithm curve plunges as $x \\to 0^+$ and never meets the axis — the mirror image of the exponential\'s horizontal asymptote $y = 0$.' },
      { term: 'Sign law', def: 'for $a > 1$: $\\log_a x > 0 \\iff x > 1$; for $0 < a < 1$: $\\log_a x > 0 \\iff 0 < x < 1$ — positivity is a statement about where the argument sits relative to $1$.' },
      { term: 'Nested logarithm', def: 'a logarithm whose argument is itself a logarithm\'s value, read from the inside out — as in $\\log_2\\log_2\\log_2\\log_2 65536 = 1$.' },
    ] },
    { kind: 'para', text: 'The pattern of this section deserves one closing remark before the geometry arrives. A logarithm question never asks for a new computation — it asks for an exponent you already own, read backwards. Every value in the roman list above came from an exponent fact already banked in lesson 9.1; the new word merely gives the backward question a name and a notation. That is why the definition is one sentence long, and why everything else in the lesson is a derivation: the subject genuinely has nothing else in its foundations.' },

    // ================================================ the mirror law
    { kind: 'heading', text: 'The Mirror Law: Graphing the Inverse' },
    { kind: 'para', text: 'Chapter 1 proved a picture fact about undos: the graph of $f^{-1}$ is the graph of $f$ reflected in the line $y = x$. The proof was coordinate bookkeeping — $(p, q)$ lies on the graph of $f$ exactly when $q = f(p)$, which is exactly when $p = f^{-1}(q)$, which is exactly when $(q, p)$ lies on the graph of $f^{-1}$ — and swapping the coordinates of every point of the plane is reflection in the diagonal. For the exponential pair the bookkeeping can now be written in one line of the new notation, and the consequences are worth collecting carefully, because they fix the shape of the logarithm curve once and for all.' },
    { kind: 'derivation', title: 'The mirror law', statement: 'For every legal base $a > 0$ with $a \\neq 1$: the point $(p, q)$ lies on the graph of $y = a^x$ if and only if the point $(q, p)$ lies on the graph of $y = \\log_a x$. Hence the logarithm curve is the exponential curve reflected in the line $y = x$.', steps: [
      { label: 'Membership on the exponential', formula: '(p, q) \\in y = a^x \\iff q = a^p', explanation: 'a point lies on the exponential graph exactly when its second coordinate is the machine\'s output at its first coordinate.' },
      { label: 'Apply the definition pair', formula: 'q = a^p \\iff p = \\log_a q', explanation: 'the definition of the logarithm, read in the direction exponent-to-value: the statement "$a$ to the $p$ builds $q$" and the statement "the logarithm of $q$ is $p$" are one statement.' },
      { label: 'Membership on the logarithm curve', formula: 'p = \\log_a q \\iff (q, p) \\in y = \\log_a x', explanation: 'the first coordinate of a logarithm-curve point is the argument, the second is the logarithm — so the pair $(q, p)$ sits on $y = \\log_a x$ exactly when $\\log_a q = p$. Chaining the three biconditionals gives the claim.' },
      { label: 'The three consequences', formula: '(0, 1) \\leftrightarrow (1, 0), \\qquad y = 0 \\leftrightarrow x = 0, \\qquad \\mathbb{R} \\leftrightarrow (0, \\infty)', explanation: 'the reflection swaps the exponential\'s anchor $(0, 1)$ with the logarithm\'s anchor $(1, 0)$ (the two anchors of equation (3)); it carries the horizontal asymptote $y = 0$ of the exponential to the VERTICAL asymptote $x = 0$ of the logarithm; and it swaps the whole domain $\\mathbb{R}$ with the whole range-turned-domain $(0, \\infty)$.' },
    ], result: '$(p, q) \\in y = a^x \\iff (q, p) \\in y = \\log_a x$: the log curve is the exponential curve reflected in $y = x$ — with anchors swapped, asymptotes swapped, and domain swapped for range' },
    { kind: 'figure', caption: 'The mirror at base 2, drawn to true scale (equal units on both axes). The exponential $y = 2^x$ (amber) passes through $(0, 1)$, $(1, 2)$, $(2, 4)$, $(3, 8)$ and hugs the $x$-axis on the left through $(-1, 0.5)$ and $(-2, 0.25)$; the logarithm $y = \\log_2 x$ (green) passes through the swapped points $(1, 0)$, $(2, 1)$, $(4, 2)$, $(8, 3)$ and plunges toward the vertical asymptote through $(0.5, -1)$ and $(0.25, -2)$. The line $y = x$ (teal) is the mirror: the dashed orange reflection arrows join $(0, 1) \\leftrightarrow (1, 0)$ and $(2, 4) \\leftrightarrow (4, 2)$, and each is bisected by the mirror line — reflection segments are always bisected by the mirror. The exponential\'s horizontal asymptote $y = 0$ and the logarithm\'s vertical asymptote $x = 0$ are marked with dashed segments: one is the mirror image of the other, which is the derivation\'s third consequence made visible.', svg: mirrorFigure92Svg() },
    { kind: 'para', text: 'The base controls the tilt, and the family picture is worth one long look. For a base above one, both curves climb — the exponential faster than any power, the logarithm slower than any positive power, which is exactly what the samples $(2, 4)$, $(4, 2)$ and $(3, 8)$, $(8, 3)$ already show. For a base below one, both curves fall — and the logarithm curve falls too, a fact that surprises every fresh class and is worth its own caution below. All members of the family, whatever the base, share the vertical asymptote $x = 0$ and the anchor $(1, 0)$; what moves with the base is only how steeply the curve leaves that anchor.' },
    { kind: 'figure', caption: 'The base family. Five logarithm curves — the risers $y = \\log_2 x$ (green, steepest), $y = \\log_4 x$, $y = \\log_{10} x$ (teal), and the fallers $y = \\log_{0.5} x$ (amber) and $y = \\log_{0.25} x$ (dashed orange) — all pass through the shared anchor $(1, 0)$ and all share the vertical asymptote $x = 0$. At the dashed marker $x = 8$ the engine pins the five values $3$, $1.5$, $0.9031$, $-3$ and $-1.5$: the bigger base climbs less at the same argument (to build the same $8$, base $4$ needs only exponent $1.5$ while base $2$ needs $3$), and a base below one flips the sign outright — the base-symmetry law derived next. The risers and fallers pair off: $\\log_{0.5} x = -\\log_2 x$ and $\\log_{0.25} x = -\\log_4 x$ are visible as mirror twins across the $x$-axis.', svg: baseFamily92Svg() },
    { kind: 'derivation', title: 'The base-symmetry law', statement: 'For every legal base $a > 0$ with $a \\neq 1$ and every $x > 0$: the logarithm to the base $1/a$ is the negative of the logarithm to the base $a$ — the base-flip is exactly a sign-flip.', steps: [
      { label: 'Name the exponent', formula: 't = \\log_{1/a} x \\iff \\left(\\tfrac{1}{a}\\right)^t = x', explanation: 'write what is wanted in definition-pair form: some exponent $t$ builds $x$ out of the flipped base $1/a$.' },
      { label: 'Apply the exponent law it mirrors', formula: '\\left(\\tfrac{1}{a}\\right)^t = a^{-t}', explanation: 'lesson 9.1\'s negative-index law — a factor of $1/a$ is a factor of $a^{-1}$, so $t$ of them make $a^{-t}$. This single exponent law is the entire engine of the proof.' },
      { label: 'Read at the base a', formula: 'a^{-t} = x \\iff -t = \\log_a x', explanation: 'the definition pair again, at the unflipped base: the exponent that builds $x$ out of $a$ is $-t$.' },
      { label: 'Conclude and witness', formula: '\\log_{1/a} x = t = -\\log_a x; \\qquad \\log_{0.5} 8 = -3 = -\\log_2 8, \\;\\; \\log_{1/3} 81 = -4 = -\\log_3 81', explanation: 'combining steps 1 and 3 gives the law; the two witnesses are checked directly by hand — $0.5^{-3} = 2^3 = 8$ and $(1/3)^{-4} = 3^4 = 81$ — and by the engine to $10^{-12}$.' },
    ], result: '$\\log_{1/a} x = -\\log_a x$ for every $x > 0$ — flipping the base across $1$ flips the sign of the logarithm, and nothing else' },
    { kind: 'formula', name: 'The base-symmetry law', latex: '\\log_{1/a} x = -\\log_a x \\quad (x > 0)', note: 'mirrors the exponent law $(1/a)^t = a^{-t}$; witness pair: $\\log_{0.5} 8 = -3 = -\\log_2 8$ and $\\log_{1/3} 81 = -4 = -\\log_3 81$.' },
    { kind: 'callout', tone: 'warn', title: 'The decay-case honesty', text: 'For $0 < a < 1$ the LOGARITHM CURVE FALLS — it is the mirror of a falling exponential, and nothing else. A student who has absorbed only "logs rise" will read $\\log_{0.5} 8$ as positive and lose the mark: the value is $-3$. The base-symmetry law is the one-line repair: flip the base across $1$, flip the sign of the answer, then reason at a base above one where intuition behaves.' },
    { kind: 'para', text: 'One more reading of the family picture pays immediately. Between the two risers $\\log_2$ and $\\log_{10}$ the whole visible order at $x = 8$ is $3 > 0.9031 > -3$: the base-$2$ curve sits above the base-$10$ curve, which sits above the base-$0.5$ curve, everywhere to the right of the anchor. That ordering is not an accident of the drawn window — it is a theorem-level fact about the whole family, and the next section proves it, together with the sign discipline that fixes which side of zero every member sits on.' },

    // ================================================ reading the family
    { kind: 'heading', text: 'Reading the Family: Order, Sign and Size' },
    { kind: 'para', text: 'A table of logarithms — the tool this lesson deliberately never opens — answers numerical questions by lookup. The professional habit is the reverse: answer structural questions by reasoning, using the definition pair and nothing else. Three crafts matter, in increasing order of subtlety: ORDER (which of two logarithms is larger), SIGN (which side of zero a logarithm sits on), and SIZE (how to trap a logarithm between two fractions when an exact value is not available — or does not exist, because the logarithm is irrational). Each craft is a corollary of monotonicity, and each is engine-pinned on live witnesses below.' },
    { kind: 'example', title: 'Arrange $\\log_2 5$, $\\log_3 5$, $\\log_7 5$ and $\\log_{0.5} 5$ in decreasing order', steps: [
      'Set up: the argument is $5$ in all four entries — only the base moves, so the question is which base needs the biggest exponent to build the same $5$.',
      'Now, the bases above one: $5 = 2^{2.3219} = 3^{1.4650} = 7^{0.8271}$ (engine, 4 dp) — the SMALLER base needs the BIGGER exponent to reach the same height, exactly as the base-family figure showed at $x = 8$ (base $2$ needed $3$, base $4$ only $1.5$).',
      'So, among the three risers the order runs $\\log_2 5 = 2.3219 > \\log_3 5 = 1.4650 > \\log_7 5 = 0.8271$, each value pinned to four decimals by the engine.',
      'Now, the base below one: the base-symmetry law reads $\\log_{0.5} 5 = -\\log_2 5 = -2.3219$ — the sign-flipped twin of the first entry, guaranteed the smallest of the four before any decimal is written (the sign law below proves it: base below one, argument above one, so negative).',
      'Hence $\\log_2 5 = 2.3219 > \\log_3 5 = 1.4650 > \\log_7 5 = 0.8271 > \\log_{0.5} 5 = -2.3219$ — the full order decided by structure, with the decimals only decorating the conclusion.',
    ] },
    { kind: 'table', caption: 'The ordering illustration, tabulated: each row pairs the engine-pinned value with the structural reason that fixed its place before any decimal was consulted. The reasoning column is the transferable skill — it works for any argument above one and any set of legal bases.', head: ['entry', 'value (engine, 4 dp)', 'the structural reason'], rows: [
      ['$\\log_2 5$', '$2.3219$', 'smallest base above one, so the biggest exponent is needed to build $5$'],
      ['$\\log_3 5$', '$1.4650$', 'middle base above one, middle exponent'],
      ['$\\log_7 5$', '$0.8271$', 'largest base above one, smallest positive exponent'],
      ['$\\log_{0.5} 5$', '$-2.3219$', 'base below one with argument above one — negative by the sign law; equals $-\\log_2 5$ by base-symmetry'],
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The sign law', text: 'For a base $a > 1$: $\\log_a x > 0$ if and only if $x > 1$; for a base $0 < a < 1$: $\\log_a x > 0$ if and only if $0 < x < 1$. Equivalently: at a base above one, the logarithm is positive exactly on the far side of $1$; at a base below one, exactly on the near side. Positivity of a logarithm is never a mystery — it is a statement about where the argument sits relative to $1$, read through the direction in which that base\'s exponential moves.' },
    { kind: 'derivation', title: 'The sign law, proved from monotonicity', statement: 'For every legal base $a$ and every $x > 0$: $\\log_a x > 0 \\iff x > 1$ when $a > 1$, and $\\log_a x > 0 \\iff 0 < x < 1$ when $0 < a < 1$.', steps: [
      { label: 'Unfold the logarithm', formula: 's = \\log_a x \\iff x = a^s', explanation: 'the definition pair restated: the sign question about $\\log_a x$ is a comparison question about $a^s$ versus the anchor value $a^0 = 1$.' },
      { label: 'Case a > 1: compare with a^0', formula: 'a > 1: \\quad s > 0 \\iff a^s > a^0 = 1', explanation: 'lesson 9.1\'s monotonicity law: at a base above one the exponential is strictly increasing, so a bigger exponent gives a bigger value — positivity of the exponent is exactly the statement $x = a^s > 1$.' },
      { label: 'Case 0 < a < 1: the flipped comparison', formula: '0 < a < 1: \\quad s > 0 \\iff a^s < a^0 = 1', explanation: 'the same monotonicity law, decreasing branch: at a base below one the exponential FALLS as the exponent grows, so a positive exponent lands the value strictly below $1$ — and $x = a^s$ below $1$ forces $s$ positive.' },
      { label: 'Collect both rows', formula: 'a > 1: \\; \\log_a x > 0 \\iff x > 1; \\qquad 0 < a < 1: \\; \\log_a x > 0 \\iff 0 < x < 1', explanation: 'the two cases assemble into the theorem as stated — four quadrants in all, of which the next Illustration samples one value from each.' },
    ], result: 'the sign law: at a base above one, positive logarithm means argument past $1$; at a base below one, positive logarithm means argument between $0$ and $1$' },
    { kind: 'example', title: 'Read the sign of $\\log_2 7$, $\\log_{0.2} 3$, $\\log_{1/3} \\tfrac{1}{5}$ and $\\log_4 \\tfrac{1}{3}$ — the four quadrants of the sign law', steps: [
      'Set up: four (base, argument) combinations, one per quadrant of the law — no tables, no decimals needed for the signs themselves.',
      'Now, $\\log_2 7$: base above one, argument $7 > 1$ — the first quadrant — so positive; indeed $\\log_2 7 = 2.8074$ (engine, 4 dp), comfortably above zero.',
      'So, $\\log_{0.2} 3$: base below one, argument $3 > 1$ — the second quadrant — so negative; the engine gives $-0.6826$.',
      'Now, $\\log_{1/3} \\tfrac{1}{5}$: base below one, argument $\\tfrac{1}{5} \\in (0, 1)$ — the third quadrant — so positive; the engine gives $+1.4650$, which is no accident but the base-symmetry echo $\\log_{1/3} \\tfrac{1}{5} = \\log_3 5$ (flip the base, flip the argument, and the two flips cancel).',
      'And $\\log_4 \\tfrac{1}{3}$: base above one, argument $\\tfrac{1}{3} \\in (0, 1)$ — the fourth quadrant — so negative; the engine gives $-0.7925$.',
      'Hence the signs are $+, -, +, -$ respectively — each read off the definition and the monotonicity of the base\'s exponential, with the engine-pinned values $2.8074, -0.6826, 1.4650, -0.7925$ as decoration, never as the reasoning.',
    ] },
    { kind: 'example', title: 'Prove that $\\tfrac{2}{5} < \\log_{10} 3 < \\tfrac{1}{2}$ — the honest squeeze', steps: [
      'Set up the squeeze: a logarithm between two fractions is proved by bounding the ARGUMENT between the corresponding powers of the base — the exponential\'s monotonicity does the rest, and no decimal table is touched.',
      'Now, the left wall: $3^5 = 243 > 100 = 10^2$ — two integer computations. Raising both sides to the power $\\tfrac{1}{5}$ (order-preserving for positive numbers) gives $3 > (10^2)^{1/5} = 10^{2/5}$, using lesson 9.1\'s exponent law $(b^u)^v = b^{uv}$.',
      'So, apply the increasing map $t \\mapsto \\log_{10} t$ to both sides: $\\log_{10} 3 > \\log_{10}\\left(10^{2/5}\\right) = \\tfrac{2}{5}$ — the wall\'s exponent read off by the first inverse identity, $\\log_a(a^u) = u$, not by any logarithm table.',
      'Now, the right wall: $3^2 = 9 < 10 = 10^1$, so square roots give $3 < 10^{1/2}$, and the same monotone read yields $\\log_{10} 3 < \\tfrac{1}{2}$.',
      'Check the honest decimal: the engine pins $\\log_{10} 3 = 0.477121$, which indeed sits strictly between $0.4$ and $0.5$ — the squeeze is not merely plausible but tight to six places.',
      'Hence $\\tfrac{2}{5} < \\log_{10} 3 < \\tfrac{1}{2}$, from four integers ($243$, $100$, $9$, $10$), one exponent law and monotonicity twice — the mirror discipline of this whole chapter, cashed on a live value.',
    ] },
    { kind: 'example', title: 'Prove that $\\log_2 7$ is irrational', steps: [
      'First, $\\log_2 7 > 0$ (base above one, argument above one — the sign law), so if it were rational it would be a positive fraction $\\tfrac{p}{q}$ in lowest terms with $p, q$ positive whole numbers.',
      'Now, suppose $\\log_2 7 = \\tfrac{p}{q}$. The definition pair turns this into $2^{p/q} = 7$, and raising both sides to the power $q$ (legal for positive numbers) gives $2^p = 7^q$ — an equation between whole numbers.',
      'So, count prime factors: the left side is built entirely from the prime $2$; the right side is built entirely from the prime $7$ — two different single-prime multisets. By unique factorisation — the arithmetic shelf\'s fundamental theorem, banked as a prerequisite of this very lesson — the equality is impossible: no product of twos can equal a product of sevens.',
      'Hence no fraction pins $\\log_2 7$: it is irrational. $\\;\\blacksquare$',
      'Check the engine side: a sweep over $1 \\leq p \\leq 12$ and $1 \\leq q \\leq 8$ finds no coincidence $2^p = 7^q$, exactly as the factorisation argument predicts — and the same argument proves $\\log_3 10$ irrational in the exercises (left side built from $3$, right side owning the primes $2$ and $5$).',
    ] },
    { kind: 'example', title: 'Solve $\\log_2(x + 3) = 8 - x$, and prove the solution is unique', steps: [
      'Set up: a logarithm equal to a line — no formula solves it in closed form, so the craft is to exhibit a root and then prove no other exists. The domain forces $x > -3$.',
      'Now, hunt integer candidates where $x + 3$ is a power of $2$: $x = 5$ gives $x + 3 = 8$, the left side reads $\\log_2 8 = 3$, and the right side reads $8 - 5 = 3$ — both sides agree, so $x = 5$ is a solution.',
      'So, prove uniqueness: rewrite the equation as $h(x) = \\log_2(x + 3) + x - 8 = 0$. On the domain $x > -3$ the term $\\log_2(x+3)$ is strictly increasing (base $2 > 1$, and larger inputs need larger exponents) and the term $x$ is strictly increasing — so $h$ is strictly increasing and takes the value $0$ at most once.',
      'Check the engine side: a numerical sweep confirms $h\' > 0$ throughout (forward differences, all positive) and bisection located the root at exactly $x = 5$ to nine decimal places — the uniqueness argument and the arithmetic agree.',
      'Hence $x = 5$ is THE solution — existence by the trial, uniqueness by monotonicity, and the figure shows the falling line meeting the rising log curve exactly once, at $(5, 3)$. This exhibit-certificate-monotonicity pattern is the standing method for every mixed logarithmic equation this book meets.',
    ], figures: [
      { caption: 'The falling line $y = 8 - x$ against the rising log curve $y = \\log_2(x + 3)$, both sampled from their formulas: they cross exactly once, at the computed point $(5, 3)$ — the unique solution, with both sides reading $3$ at $x = 5$.', svg: rootCount92Svg() },
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The reading crafts are standing JEE Main / state-board motifs: sign-and-order items ("arrange $\\log_2 5 > \\log_3 5 > \\log_7 5 > \\log_{0.5} 5$" — the ordering Illustration\'s shape), squeeze items ("prove $\\tfrac{2}{5} < \\log_{10} 3 < \\tfrac{1}{2}$" — integer walls plus monotonicity), irrationality items ("$\\log_2 7$ is irrational" — unique factorisation), and unique-solution items ("the equation $\\log_2(x+3) = 8 - x$ has exactly one root" — the exhibit-certificate-monotonicity chain). The discipline that separates marks from misses: state the domain before evaluating, and argue from the definition pair — never from remembered sign charts. The items in this lesson are exam-style designs of ours, labelled honestly — never lifted from any paper.' },
    { kind: 'para', text: 'Three crafts are now banked, and one number is still missing from the story: the base that the sciences actually use. Every argument so far ran at a general base $a$, which is the right order of business — but two specific bases earn their own names, their own symbols and eventually their own tables, and the fold that follows gives them their formal definitions while the machinery of the lesson is still warm.' },

    // ================================================ the fold: natural logarithms
    { kind: 'heading', text: 'Natural Logarithms' },
    { kind: 'para', text: 'Two bases stand out of the family, and the first of them arrives as a number before it arrives as a base. Consider the expression $\\left(1 + \\tfrac{1}{m}\\right)^m$ for larger and larger whole numbers $m$: each value is an ordinary exponential computation, but the sequence of values closes in on a specific real number, the limit' },
    { kind: 'equation', latex: 'e = \\lim_{m \\to \\infty} \\left(1 + \\tfrac{1}{m}\\right)^m = 2.718281828\\ldots \\tag{5}', note: 'the number $e$ — the limit of the compounding expression. The six rungs of the ladder are tabulated below, each an engine-checked exponential computation; the limit itself is stated here and banked, with the convergence story kept for chapter 10.' },
    { kind: 'table', caption: 'The e-ladder: five engine-pinned rungs of $\\left(1 + \\tfrac{1}{m}\\right)^m$, each a plain exponential computation, climbing toward $e$. The last rung already agrees with $e$ to four decimal places — the convergence made visible in the third figure below.', head: ['$m$', '$\\left(1 + \\tfrac{1}{m}\\right)^m$', 'reads as'], rows: [
      ['$1$', '$2.000000$', 'the starter: $2$'],
      ['$10$', '$2.593742$', '$1.1$ to the tenth'],
      ['$100$', '$2.704814$', '$1.01$ to the hundredth — already past $2.7$'],
      ['$1000$', '$2.716924$', 'three decimal places of $e$'],
      ['$10^6$', '$2.718280$', 'five decimal places of $e$'],
      ['limit', '$e = 2.718281828\\ldots$', 'the number itself, engine-pinned to 9 dp'],
    ] },
    { kind: 'callout', tone: 'insight', title: 'Banked, not yet derived — the honesty note', text: 'This lesson uses the number $e$ and does not prove that the ladder converges to it. The full story — why $\\left(1 + \\tfrac{1}{m}\\right)^m$ closes in on anything at all, and why the limit sits where it does — needs the limit machinery of chapter 10, and a fake proof now would be worse than an honest statement. What IS verified here, by the engine: every rung in the table, the strict climb $2 < 2.593742 < 2.704814 < 2.716924 < 2.718280 < e$, and the band $2.7 < e < 2.8$ — the rung $(1.01)^{100} = 2.704814$ is already above $2.7$ and every later rung is above it, while $e = 2.718281828\\ldots$ (and the $m = 10^4$ rung $(1.0001)^{10000} = 2.718146$) sits far below the $2.8$ ceiling. The number is banked here as a base; the convergence is proven at chapter 10\'s doorstep.' },
    { kind: 'figure', caption: 'The e-ladder as a bar chart: five bars of height $\\left(1 + \\tfrac{1}{m}\\right)^m$ at $m = 1, 10, 100, 1000, 10^6$ — $2.000000$, $2.593742$, $2.704814$, $2.716924$, $2.718280$ — climbing toward the dashed orange $e$-line at $e = 2.718281828\\ldots$, with the shaded band $2.7$–$2.8$ behind the three tallest bar tops. The last bar already meets the $e$-line to the pixel: at this scale the $m = 10^6$ rung and the limit are visually one, which is exactly the engine\'s finding that they differ only in the fifth decimal. The band is the engine-pinned enclosure $2.7 < e < 2.8$ of the honesty note.', svg: eLadder92Svg() },
    { kind: 'callout', tone: 'definition', title: 'The natural logarithm (and its common twin)', text: 'For $x > 0$, the NATURAL logarithm of $x$, written $\\ln x$ (equivalently $\\log_e x$), is said to be the logarithm of $x$ to the base $e = 2.718281828\\ldots$: $\\ln x = \\log_e x$, the exponent to which the number $e$ must be raised to build $x$. Its twin, the COMMON (decadic) logarithm, is the base-ten logarithm $\\log x = \\log_{10} x$ — the logarithm of the tables\' world, where a shift of one unit in the value corresponds to a factor of ten in the argument. Both obey every rule of this lesson unchanged: the base is a dial, and the machine discipline never varies with it.' },
    { kind: 'equation', latex: '\\ln e = 1, \\qquad \\ln 1 = 0, \\qquad e^{\\ln x} = x \\;\\; (x > 0), \\qquad \\ln(e^t) = t \\;\\; (t \\in \\mathbb{R}) \\tag{6}', note: 'the two anchors and the two inverse identities, run at the natural base — the whole apparatus of equations (2) and (3) with $a = e$, and the computations the sciences use daily.' },
    { kind: 'example', title: 'Work the natural base: evaluate (i) $\\ln(e^3)$ and $e^{\\ln 7}$; (ii) solve $e^t = 10$; (iii) bank the doorstep constants $\\ln 2$ and $\\ln 7$', steps: [
      '(i) The inverse identities at base $e$: $\\ln(e^3) = 3$ (a logarithm of a power of its own base reads the exponent straight off — the first identity) and $e^{\\ln 7} = 7$ (the machine runs forward on the exponent its undo hands it — the second identity).',
      '(ii) Now, solve $e^t = 10$: the definition pair at base $e$ reads the equation as $t = \\ln 10$ — and the engine pins $\\ln 10 = 2.302585$, so $t = \\ln 10 \\approx 2.3026$. Running the machine forward on the six-decimal value returns $10$ to within $10^{-5}$: the collapse is not an approximation story but an identity story.',
      '(iii) The doorstep constants: $\\ln 2 = 0.693147 \\approx 0.6931$ and $\\ln 7 = 1.945910 \\approx 1.9459$ (engine, 6 dp) — two numbers worth banking permanently, the first because halving and doubling is the commonest operation in applied work, the second as a spread of the natural scale.',
      'Check the anchors on the way: $\\ln 1 = 0$ and $\\ln e = 1$ hold by equation (6), and the common twin gives $\\log 100 = 2$ at base ten — the pair of named bases behaving identically.',
      'Hence $\\ln(e^3) = 3$, $e^{\\ln 7} = 7$, $t = \\ln 10 \\approx 2.3026$, $\\ln 2 \\approx 0.6931$ and $\\ln 7 \\approx 1.9459$ — five values, each one line of identity or one engine-pinned decimal.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why "natural"?', text: 'The name is a promissory note, honoured in chapter 10. The slope story of the logarithm — how fast $\\log_a x$ rises per unit of $x$ — turns out to be cleanest at the base $e$: at any other base a stubborn constant clogs the formula, and at base $e$ it vanishes. That is why $\\ln x$, of all the family, is the one the sciences compute with, and why the number $e$ earned its permanent seat. This lesson states the fact and does not prove it — the proof needs the derivative, which is chapter 10\'s doorway; named here, proven there.' },
    { kind: 'callout', tone: 'historical', title: 'Four centuries of the backward question', text: 'John Napier published the first logarithm tables in 1614 — decades before the exponential function had a clear mathematical identity, the tables being built by motion and ratio rather than as the inverse of any known machine. Henry Briggs, in conversation with Napier, moved the base to $10$ and produced the decadic tables (1624) that made $\\log x$ the working instrument of astronomy and navigation; natural logarithms arrived with Nicholas Mercator\'s 1668 treatise, which computed $\\ln(1 + x)$ by an infinite series. The letter $e$ for the limit of equation (5) is Euler\'s, from the 1720s. The definition-first presentation of this lesson — logarithm as the undo of the exponential — is thus the youngest way of seeing the oldest tool in the book: the inverse-machine reading belongs to the function theory of the nineteenth century.' },
    { kind: 'para', text: 'The fold closes with a sentence that the next lesson will turn into a program: at base $e$, at base $10$, at base $2$ or $7$ or $2\\sqrt{2}$, the definition pair is the same sentence and the identities are the same collapses. Every craft of this lesson — reading off exponents, collapsing towers, mirroring graphs, ordering, signing, squeezing — is base-blind, and the two named bases are conveniences of notation, not exceptions to any rule.' },

    // ================================================ the chapter's doorstep
    { kind: 'heading', text: "The Chapter's Doorstep" },
    { kind: 'para', text: 'The machine pair of chapter 9 is now complete: the exponential takes exponents to values, the logarithm takes values back to exponents, and the two annihilate each other in both orders. What is deliberately missing is the ALGEBRA of the pair — how a logarithm of a product splits, how a logarithm of a power pulls its exponent down front, how to change bases mid-computation. Those are the laws of the logarithm, and they are the next lesson\'s work: the product law, the quotient law, the power law and the change-of-base formula, each DERIVED from the exponent law it mirrors — multiplication of powers adding exponents becomes addition of logarithms — and never memorized as independent facts. That discipline is the chapter\'s signature, and this lesson has kept it throughout: every identity here was two moves from the definition pair.' },
    { kind: 'para', text: 'From the above discussion, it follows that:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the logarithm $\\log_a y$ is the exponent that builds $y$ out of $a$, defined by the pair $\\log_a y = x \\iff a^x = y$ for legal bases $a > 0$, $a \\neq 1$ and arguments $y > 0$ only;',
      '(ii) the two inverse identities hold — $a^{\\log_a y} = y$ for every $y > 0$ and $\\log_a(a^x) = x$ for every real $x$ — each two moves from the definition pair;',
      '(iii) the anchors $\\log_a 1 = 0$ and $\\log_a a = 1$ hold for every legal base, so every logarithm curve passes through $(1, 0)$;',
      '(iv) the graph of $y = \\log_a x$ is the graph of $y = a^x$ reflected in the line $y = x$ — the mirror law — with the horizontal asymptote $y = 0$ becoming the vertical asymptote $x = 0$ and the domain $\\mathbb{R}$ becoming $(0, \\infty)$;',
      '(v) the base-symmetry law $\\log_{1/a} x = -\\log_a x$ mirrors the exponent law $(1/a)^t = a^{-t}$, so a base below one gives a falling curve and sign-flipped values;',
      '(vi) the sign law fixes positivity: at a base above one, $\\log_a x > 0$ exactly past $x = 1$; at a base below one, exactly between $0$ and $1$;',
      '(vii) logarithms can be squeezed between fractions by integer walls and monotonicity ($\\tfrac{2}{5} < \\log_{10} 3 < \\tfrac{1}{2}$ with $\\log_{10} 3 = 0.477121$), and proved irrational by unique factorisation ($\\log_2 7$);',
      '(viii) the natural logarithm $\\ln x = \\log_e x$ with $e = \\lim_{m \\to \\infty}\\left(1 + \\tfrac{1}{m}\\right)^m = 2.718281828\\ldots$ and the common logarithm $\\log x = \\log_{10} x$ are the two named bases, obeying every rule above unchanged.',
    ] },
    { kind: 'formula', name: 'The definition pair', latex: '\\log_a y = x \\iff a^x = y \\quad (a > 0,\\; a \\neq 1,\\; y > 0)', note: 'the whole foundation in one line: the logarithm is the exponent read backwards — every property in this lesson is derived from one of the two arrows.' },
    { kind: 'formula', name: 'The two inverse identities', latex: 'a^{\\log_a y} = y \\;(y > 0), \\qquad \\log_a(a^x) = x \\;(x \\in \\mathbb{R})', note: 'the machine and its undo annihilate each other in both orders — witness the nested collapse $\\log_2\\log_2\\log_2\\log_2 65536 = 1$.' },
    { kind: 'formula', name: 'The base-symmetry law', latex: '\\log_{1/a} x = -\\log_a x \\quad (x > 0)', note: 'a base below one flips the sign: $\\log_{0.5} 8 = -3 = -\\log_2 8$; the falling curves of the family figure.' },
    { kind: 'formula', name: 'The sign law', latex: 'a > 1: \\;\\log_a x > 0 \\iff x > 1; \\qquad 0 < a < 1: \\;\\log_a x > 0 \\iff 0 < x < 1', note: 'positivity is a location statement about the argument relative to $1$ — read through the direction the base\'s exponential moves.' },
    { kind: 'formula', name: 'The natural and common logarithms', latex: '\\ln x = \\log_e x, \\;\\; e = \\lim_{m \\to \\infty}\\left(1 + \\tfrac{1}{m}\\right)^m \\approx 2.718281828; \\qquad \\log x = \\log_{10} x', note: 'the two named bases — $\\ln e = 1$, $\\ln 1 = 0$, $e^{\\ln x} = x$, $\\ln(e^t) = t$; the doorstep constants $\\ln 2 \\approx 0.6931$, $\\ln 7 \\approx 1.9459$, $\\ln 10 \\approx 2.3026$.' },

    // ================================================ quiz
    { kind: 'quiz', title: 'Check yourself: the inverse machine', items: [
      { q: 'The logarithm $\\log_a y$ is defined, as a real number, for', options: ['every real $y$', '$y > 0$ only', '$y \\geq 0$', '$y \\neq 0$'], answer: 1, explain: 'Option 1 is 9.1\'s range law run backwards: $a^x > 0$ for every real exponent, so the machine never builds a negative number and no exponent can be read off for one — $\\log_2(-8)$ is a refusal, not a number. Option 0 admits every real $y$ and fails at the first negative argument. Option 2 patches nothing: at $y = 0$ the machine still refuses, since $a^x$ decays toward $0$ (at a base below one) but never reaches it — $\\log_a 0$ is a refusal too. Option 3 patches the single hole at $0$ while leaving all the negatives standing: the honest domain is the open half-line $(0, \\infty)$, punctured nowhere.' },
      { q: '$\\log_4 8$ equals', options: ['2', '3/2', '4', '1/2'], answer: 1, explain: 'Option 1 reads the definition pair: $4^{3/2} = (\\sqrt{4})^3 = 2^3 = 8$, so the exponent that builds $8$ out of $4$ is $\\tfrac{3}{2}$ — the fractional index of lesson 9.1 cashed at sight. Option 0 would need $4^2 = 8$, but $4^2 = 16$ — twice the target. Option 2 would need $4^4 = 8$, but $4^4 = 256$ — vastly past it. Option 3 confuses the exponent with the square root: $4^{1/2} = 2$ builds $2$, not the required $8$.' },
      { q: 'The graph of $y = \\log_a x$ is the reflection of the graph of $y = a^x$ in', options: ['the $x$-axis', 'the $y$-axis', 'the line $y = x$', 'the origin'], answer: 2, explain: 'Option 2 is the mirror law of this lesson, derived by chaining three biconditionals: $(p, q)$ on $y = a^x$ exactly when $q = a^p$, exactly when $p = \\log_a q$, exactly when $(q, p)$ on $y = \\log_a x$ — and swapping coordinates is reflection in the diagonal, chapter 1\'s inverse-graph law cashed. Option 0 would produce $y = -a^x$, a curve below the axis that is not even a logarithm shape. Option 1 would produce $y = a^{-x}$, still exponential in type with domain all of $\\mathbb{R}$ — no domain swap happens. Option 3 (both reflections at once) gives $y = -a^{-x}$, again exponential in type; only the diagonal reflection trades the domain $\\mathbb{R}$ for $(0, \\infty)$, which is what an undo must do.' },
      { q: 'For $0 < a < 1$, $\\log_a x$ is positive exactly when', options: ['$x > 1$', '$0 < x < 1$', 'every $x > 0$', 'never'], answer: 1, explain: 'Option 1 is the second row of the sign law, proved from monotonicity: at a base below one the exponential FALLS as the exponent grows, so a positive exponent lands strictly below $a^0 = 1$ — hence $\\log_a x > 0$ exactly for $0 < x < 1$, with $\\log_{0.5} 0.25 = 2 > 0$ as the anchor witness. Option 0 inverts the law: for $x > 1$ a below-one base reads negative, as $\\log_{0.5} 4 = -2$ shows. Option 2 is refuted by that same value — positivity is conditional, not universal. Option 3 forgets the decaying family entirely: $\\log_{0.5} 0.25 = +2$ is positive, so "never" dies at the first fractional argument.' },
      { q: '$\\ln(e^2) + \\log_{10} 100$ equals', options: ['4', '$e^2 + 100$', '2', '$2e$'], answer: 0, explain: 'Option 0 collapses each term by an inverse identity: $\\ln(e^2) = 2$ (a logarithm of a power of its own base reads the exponent off) and $\\log_{10} 100 = 2$ (likewise, since $10^2 = 100$), and $2 + 2 = 4$. Option 1 mistakes the logarithm for its argument — the expression asks for logarithms OF $e^2$ and OF $100$, not for the numbers $e^2 + 100$ themselves; that is the classic evaluate-the-argument slip. Option 2 counts only one term: both collapses give $2$, and the question adds them. Option 3 multiplies where the question adds and invents a factor of $e$ that no step produces — $e$ never survives contact with its own logarithm.' },
    ] },

    // ================================================ exercises
    { kind: 'exercises', title: 'Exercises 9.2', sets: [
      { level: 'L1', questions: [
        { q: 'Evaluate: (i) $\\log_{10} 10000$; (ii) $\\log_2 \\tfrac{1}{32}$; (iii) $\\log_9 27$.', solution: [
          'Read each by the definition pair $\\log_a y = x \\iff a^x = y$: hunt the exponent that builds the argument out of the base, no tables.',
          '(i) $10^4 = 10000$, so $\\log_{10} 10000 = 4$.',
          '(ii) $2^{-5} = \\tfrac{1}{32}$ (a negative exponent divides — lesson 9.1), so $\\log_2 \\tfrac{1}{32} = -5$.',
          '(iii) Now, $\\log_9 27$: write both as powers of $3$ — $9 = 3^2$ and $27 = 3^3$ — so the question becomes $3^{2x} = 3^3$, giving $2x = 3$ and $x = \\tfrac{3}{2}$; indeed $9^{3/2} = (3^2)^{3/2} = 3^3 = 27$.',
          'Hence (i) $4$, (ii) $-5$, (iii) $\\tfrac{3}{2}$ — three reads, three exponents, one definition.',
        ], answer: '(i) 4, (ii) −5, (iii) 3/2' },
        { q: 'State the domain of $f(x) = \\log_3(5 - x)$, and give one point inside it and one refusal.', solution: [
          'The discipline: the logarithm\'s argument must be strictly positive, so the condition is $5 - x > 0$.',
          'So, solve the inequality: $x < 5$.',
          'Now, a witness and a refusal: $x = 4.9$ gives the argument $0.1 > 0$ — legal; $x = 5.1$ gives a negative argument — refused, since $3^t > 0$ always; and $x = 5$ itself gives the argument $0$ — equally refused, since $3^t$ never takes the value $0$.',
          'Hence the domain is the open half-line $x < 5$, i.e. $(-\\infty, 5)$.',
        ], answer: 'x < 5 (the open half-line to the left of 5)' },
        { q: 'State the domain of $g(x) = \\log_2(x^2 - 1)$, and say why it is not a single interval.', solution: [
          'The argument $x^2 - 1$ must be strictly positive.',
          'So, solve $x^2 > 1$: $|x| > 1$, that is $x < -1$ or $x > 1$.',
          'Now, witnesses: $x = 2$ and $x = -2$ both give the argument $3 > 0$ — legal on both rays; $x = 0$ gives $-1$ — refused; $x = \\pm 0.5$ gives $-\\tfrac{3}{4}$ — refused.',
          'Hence the domain is $(-\\infty, -1) \\cup (1, \\infty)$ — two rays, not one interval, because the quadratic argument dips below zero in a band around the origin while recovering on both sides.',
        ], answer: '|x| > 1: x < −1 or x > 1 (two rays)' },
      ] },
      { level: 'L2', questions: [
        { q: 'Evaluate: (i) $5^{\\log_5 9}$; (ii) $2^{3\\log_2 4}$; (iii) $10^{2\\log 3}$.', solution: [
          'Read the shape: each is a tower with the outer exponent a multiple of a logarithm of the same base — collapse the undo first, then do ordinary arithmetic.',
          '(i) The second inverse identity kills the outer undo at sight: $5^{\\log_5 9} = 9$.',
          '(ii) Now, group before collapsing: $2^{3\\log_2 4} = \\left(2^{\\log_2 4}\\right)^3 = 4^3 = 64$; equally, $\\log_2 4 = 2$ and $2^{3 \\cdot 2} = 2^6 = 64$ — two routes, one value.',
          '(iii) Same move at base ten: $10^{2\\log 3} = \\left(10^{\\log 3}\\right)^2 = 3^2 = 9$.',
          'Hence (i) $9$, (ii) $64$, (iii) $9$.',
        ], answer: '(i) 9, (ii) 64, (iii) 9' },
        { q: 'The point $(2, 4)$ lies on $y = 2^x$. Show that $(4, 2)$ lies on $y = \\log_2 x$, then produce one more witness pair of your own and check both directions.', solution: [
          'Read the membership: $(2, 4)$ on $y = 2^x$ means $2^2 = 4$ — true.',
          'So, apply the mirror law: swap the coordinates; $(4, 2)$ lies on $y = \\log_2 x$ exactly when $\\log_2 4 = 2$ — true by the definition pair, since $2^2 = 4$.',
          'Now, a fresh pair: $(3, 8)$ — on the exponential since $2^3 = 8$ — mirrors to $(8, 3)$, on the logarithm since $\\log_2 8 = 3$; the engine verifies both directions to $10^{-12}$.',
          'Hence the mirror law is a statement, not a picture: every point and its swap belong together, one on each curve — and any pair the reader manufactures behaves the same way.',
        ], answer: '(4, 2) verified since log₂ 4 = 2; own pair (3, 8) ↔ (8, 3), both directions engine-checked' },
        { q: 'Evaluate $\\log_{1/4} 8$ by the base-symmetry law, and confirm directly from the definition.', solution: [
          'The law: $\\log_{1/a} x = -\\log_a x$, here $\\log_{1/4} 8 = -\\log_4 8$.',
          'So, evaluate the base-4 read: $\\log_4 8 = \\tfrac{3}{2}$ (for $4^{3/2} = 8$), hence $\\log_{1/4} 8 = -\\tfrac{3}{2}$.',
          'Now, confirm from the definition pair: $\\left(\\tfrac{1}{4}\\right)^{-3/2} = 4^{3/2} = 8$ — the exponent $-\\tfrac{3}{2}$ indeed builds $8$ out of $\\tfrac{1}{4}$, so the sign-flip is not an approximation but an identity.',
          'Hence $\\log_{1/4} 8 = -\\tfrac{3}{2}$, the sign-flipped twin of the base-4 value.',
        ], answer: '−3/2' },
      ] },
      { level: 'L3', questions: [
        { q: 'Arrange $\\log_3 10$, $\\log_{10} 3$ and $\\log_{0.5} 10$ in decreasing order (values to 4 dp), giving the structural reason before any decimal.', solution: [
          'Read the brackets first, no tables: $10 > 3 = 3^1$, so $\\log_3 10 > 1$; $1 < 3 < 10 = 10^1$, so $0 < \\log_{10} 3 < 1$; and the base $0.5 < 1$ with argument $10 > 1$ forces $\\log_{0.5} 10 < 0$ by the sign law.',
          'So, the order is forced before any decimal is written: $\\log_3 10 > \\log_{10} 3 > \\log_{0.5} 10$ — one entry above $1$, one between $0$ and $1$, one negative.',
          'Now, the decimals (engine, 4 dp): $\\log_3 10 = 2.0959$, $\\log_{10} 3 = 0.4771$ and $\\log_{0.5} 10 = -3.3219$ — the last also equals $-\\log_2 10$ by the base-symmetry law, which is why it is the mirror-depth of the tallest entry.',
          'Hence $\\log_3 10 = 2.0959 > \\log_{10} 3 = 0.4771 > \\log_{0.5} 10 = -3.3219$.',
        ], answer: 'log₃ 10 = 2.0959 > log₁₀ 3 = 0.4771 > log_{0.5} 10 = −3.3219' },
        { q: 'Prove that $\\tfrac{1}{2} < \\log_{10} 4 < \\tfrac{2}{3}$.', solution: [
          'Set up the squeeze as in the lesson\'s Illustration: bound the argument between powers of the base, then let the increasing map $t \\mapsto \\log_{10} t$ carry the bounds across.',
          'Now, the left wall: $10^{1/2} = \\sqrt{10} = 3.1623 < 4$ (engine, 4 dp), so applying the increasing logarithm gives $\\log_{10} 4 > \\tfrac{1}{2}$ — the wall\'s exponent read off by the inverse identity $\\log_{10}(10^{1/2}) = \\tfrac{1}{2}$.',
          'So, the right wall: $4^3 = 64 < 100 = 10^2$, so (cube roots, order-preserving) $4 < 10^{2/3}$, and the same monotone read gives $\\log_{10} 4 < \\tfrac{2}{3}$.',
          'Now, the honest decimal: the engine pins $\\log_{10} 4 = 0.60206$, sitting strictly between $0.5$ and $0.667\\ldots$ — and the figure shows the curve crossing the band precisely between the two wall arguments $3.1623$ and $4.6416$.',
          'Hence $\\tfrac{1}{2} < \\log_{10} 4 < \\tfrac{2}{3}$ — four integers, one identity, monotonicity twice; no table touched.',
        ], answer: '1/2 < log₁₀ 4 = 0.60206 < 2/3', figures: [
          { caption: 'The squeeze of $\\log_{10} 4$: the curve $y = \\log_{10} x$ crosses the shaded band between $y = 1/2$ and $y = 2/3$ between the wall arguments $x = 3.1623 = \\sqrt{10}$ and $x = 4.6416 = 10^{2/3}$; the marker at $x = 4$ meets the curve at $0.60206$, inside the band.', svg: solfigBandL3b92Svg() },
        ] },
        { q: 'Prove that $\\log_3 10$ is irrational.', solution: [
          'First, $\\log_3 10 > 1 > 0$ (the argument $10$ exceeds the base $3$), so if it were rational it would be a positive fraction $\\tfrac{p}{q}$ in lowest terms.',
          'Now, suppose $\\log_3 10 = \\tfrac{p}{q}$. The definition pair turns this into $3^{p/q} = 10$, and raising to the power $q$ gives $3^p = 10^q$ — an equation between whole numbers.',
          'So, count prime factors: the left side is built from the single prime $3$; the right side $10^q = 2^q 5^q$ owns the two primes $2$ and $5$ — by unique factorisation (the arithmetic shelf\'s theorem) the equality is impossible, since the two sides do not even share a prime.',
          'Hence no fraction pins $\\log_3 10$: it is irrational. The engine confirms no coincidence $3^p = 10^q$ for any small pair $(p, q)$ — exactly as the factorisation argument demands.',
        ], answer: 'log₃ 10 is irrational (3^p = 10^q contradicts unique factorisation: primes 3 vs 2·5)' },
      ] },
      { level: 'L4', questions: [
        { q: 'Solve $\\log_2(x + 7) = 4 - x$, proving the solution unique.', solution: [
          'Set up: the domain forces $x > -7$; hunt integer candidates where $x + 7$ is a power of $2$, since those the logarithm reads at sight.',
          'Now, $x = 1$: the left side reads $\\log_2 8 = 3$ and the right side reads $4 - 1 = 3$ — both sides agree, so $x = 1$ is a solution.',
          'So, prove uniqueness: put $h(x) = \\log_2(x + 7) + x - 4$; on $x > -7$ the term $\\log_2(x + 7)$ is strictly increasing (base $2 > 1$) and $x$ is strictly increasing, so $h$ is strictly increasing and meets $0$ at most once.',
          'Now, the engine certificate: forward-difference sweeps confirm $h\' > 0$ throughout, and bisection locates the root at exactly $x = 1$ — the figure shows the falling line crossing the rising log curve once, at $(1, 3)$.',
          'Hence $x = 1$ is THE solution — existence by the trial, uniqueness by monotonicity.',
        ], answer: 'x = 1 (the unique solution)', figures: [
          { caption: 'The falling line $y = 4 - x$ against the rising curve $y = \\log_2(x + 7)$, crossing exactly once at the computed point $(1, 3)$ — both sides read $3$ at $x = 1$, and the strictly increasing $h$ forbids a second crossing.', svg: solfigCrossL4a92Svg() },
        ] },
        { q: 'Count the solutions of $x^3 = \\log_{1/2} x$.', solution: [
          'Split the domain: for $x > 1$ the left side $x^3$ is positive while $\\log_{1/2} x$ is negative (base below one, argument above one — the sign law), so no solution can live there.',
          'Now, on $0 < x < 1$ both sides are positive: the cubic $x^3$ rises from $0$ toward $1$, while $\\log_{1/2} x$ falls from $+\\infty$ toward $0$ — one rising, one falling, so at most one crossing.',
          'So, exhibit the crossing: at $x = \\tfrac{1}{2}$ the left side reads $\\tfrac{1}{8}$ while the right side reads $\\log_{1/2} \\tfrac{1}{2} = 1$ — left below right; at $x = 1$ the left reads $1$, the right reads $0$ — left above right; the difference changes sign on $(\\tfrac{1}{2}, 1)$, so a crossing exists.',
          'Now, the engine pin: bisection locates it at $x \\approx 0.7481$ (where $x^3 = 0.4187$), and a sign sweep over $(0.001, 1000)$ confirms exactly one crossing overall — no other hiding anywhere.',
          'Hence the equation has exactly one solution, $x \\approx 0.7481$ — counted by structure, located by bisection, and the figure shows the single crossing.',
        ], answer: 'exactly one solution, x ≈ 0.7481', figures: [
          { caption: 'The cubic $y = x^3$ rising against the falling $y = \\log_{1/2} x$, crossing exactly once near $x = 0.75$; the crossing is pinned by the bisection inside the figure at $(0.7481, 0.4187)$.', svg: solfigCubicL4b92Svg() },
        ] },
        { q: 'For which $x$ is $\\log_{x-2} 16$ a legal statement? Evaluate it at $x = 4$.', solution: [
          'The base discipline: a logarithm\'s base must be positive and different from $1$ — here $x - 2 > 0$ and $x - 2 \\neq 1$.',
          'So, the two conditions give $x > 2$ together with $x \\neq 3$.',
          'Now, evaluate at $x = 4$: the base is $2$, and $\\log_2 16 = 4$ since $2^4 = 16$.',
          'Check the refusals: $x = 3$ makes the base $1$ — refused, for $1^t = 1$ always and no exponent could ever be read off; $x = 2$ makes the base $0$ — refused; and $x = 1$ makes it negative — refused; meanwhile $x = 2.5$ (base $0.5$) is legal, with $\\log_{0.5} 16 = -4$ by base-symmetry.',
          'Hence legal exactly for $x > 2$ with $x \\neq 3$; at $x = 4$ the value is $4$.',
        ], answer: 'legal for x > 2 with x ≠ 3; at x = 4 the value is log₂ 16 = 4' },
      ] },
      { level: 'L5', questions: [
        { q: 'Complete the table of $\\left(1 + \\tfrac{1}{m}\\right)^m$ at $m = 1, 10, 100, 1000, 10^6$ (6 dp), and prove the band $2.7 < e < 2.8$.', solution: [
          'Compute the ladder (engine, 6 dp): $m = 1$ gives $2.000000$; $m = 10$ gives $2.593742$; $m = 100$ gives $2.704814$; $m = 1000$ gives $2.716924$; $m = 10^6$ gives $2.718280$.',
          'Now, the lower wall: the ladder climbs — each engine-checked rung exceeds the last — and $(1.01)^{100} = 2.704814$ is already above $2.7$; since $e$ is the limit the rungs approach, $e$ sits above every rung, in particular above $2.704814 > 2.7$. So $e > 2.7$.',
          'So, the upper wall: the engine banks $e = 2.718281828\\ldots$ (9 dp), which is below $2.8$; and the $m = 10^4$ rung $(1.0001)^{10000} = 2.718146$ shows the ladder\'s last visible rungs hugging $e$ from below, nowhere near the $2.8$ ceiling. (The honest note stands: WHY the ladder converges to this number is chapter 10\'s doorstep — here the enclosure is banked numerically and stated as such.)',
          'Hence the table reads $2.000000, 2.593742, 2.704814, 2.716924, 2.718280$, and the band $2.7 < e < 2.8$ holds — the same band the lesson\'s e-ladder figure shades.',
        ], answer: '2.000000, 2.593742, 2.704814, 2.716924, 2.718280; and 2.7 < e < 2.8' },
        { q: 'Solve $e^{2t} = e^{t+1}$.', solution: [
          'The same-base discipline of lesson 9.1: the exponential at base $e$ is one-one, so $e^u = e^v$ forces $u = v$ — the undo reads the exponent off uniquely.',
          'So, equate the exponents: $2t = t + 1$, that is $t = 1$.',
          'Now, check: $e^{2 \\cdot 1} = e^2 = e^{1 + 1}$ — both sides the same number exactly; and uniqueness is the one-one property already used, so no second solution can exist.',
          'Hence $t = 1$, the unique solution.',
        ], answer: 't = 1' },
        { q: 'Evaluate $e^{\\ln 5} - e^{\\ln 2}$ and $\\dfrac{\\ln(e^4)}{2}$.', solution: [
          'Collapse each term by the inverse identities at base $e$: $e^{\\ln 5} = 5$ and $e^{\\ln 2} = 2$.',
          'So, subtract: $5 - 2 = 3$.',
          'Now, the second read: $\\ln(e^4) = 4$ (a logarithm of a power of its own base reads the exponent off), so $\\dfrac{\\ln(e^4)}{2} = \\dfrac{4}{2} = 2$.',
          'Hence the values are $3$ and $2$ — both collapses one-liners at the natural base, no decimals needed at all.',
        ], answer: '3 and 2' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the mirror law — $(p, q)$ lies on $y = a^x$ if and only if $(q, p)$ lies on $y = \\log_a x$ — and derive from it BOTH asymptote laws and the domain swap. Price the proof on the witness pair $(2, 4)$ and $(4, 2)$ at base $a = 2$.', solution: [
          'Forward direction: if $(p, q)$ lies on $y = a^x$ then $q = a^p$; the definition pair turns this into $p = \\log_a q$; and $p = \\log_a q$ says precisely that $(q, p)$ lies on $y = \\log_a x$.',
          'Backward direction: run the chain backwards — $(q, p)$ on $y = \\log_a x$ means $p = \\log_a q$, that is $q = a^p$, that is $(p, q)$ on $y = a^x$. The two memberships are one statement in two costumes, which is the "if and only if".',
          'So, the asymptote laws: the exponential has horizontal asymptote $y = 0$ — lesson 9.1\'s law $a^x \\to 0$ as $x \\to -\\infty$, never reaching $0$. Reflection in $y = x$ carries the horizontal line $y = 0$ to the vertical line $x = 0$, so the log curve has vertical asymptote $x = 0$: as $x \\to 0^+$ the logarithm plunges without bound and never meets the axis; the companion fact (exponential unbounded above $\\Rightarrow$ logarithm unbounded above) is the same sentence read in the other direction.',
          'Now, the domain swap: the exponential\'s domain is all of $\\mathbb{R}$; reflection swaps the coordinates of every point, so the log curve\'s horizontal reach is the exponential\'s vertical reach — its range $(0, \\infty)$ — giving domain $(0, \\infty)$ for the logarithm, chapter 1\'s promise cashed.',
          'The witness: $(2, 4)$ has $4 = 2^2$ — on $y = 2^x$; its swap $(4, 2)$ has $2 = \\log_2 4$ — on $y = \\log_2 x$; the engine checks both directions to $10^{-12}$, and the lesson\'s mirror figure draws the pair joined by a reflection segment bisected by the diagonal.',
        ], answer: 'proved: (p, q) ↔ (q, p); asymptotes y = 0 ↔ x = 0; domains ℝ ↔ (0, ∞) — witness (2, 4)/(4, 2) at base 2' },
        { q: 'Prove that $\\log_{1/a} x = -\\log_a x$ for every $x > 0$, from the exponent law $\\left(\\tfrac{1}{a}\\right)^t = a^{-t}$; then verify on $\\log_{0.5} 8$ and $\\log_{1/3} 81$.', solution: [
          'Name the exponent: put $t = \\log_{1/a} x$, which by the definition pair says $\\left(\\tfrac{1}{a}\\right)^t = x$.',
          'Now, apply the exponent law it mirrors: $\\left(\\tfrac{1}{a}\\right)^t = a^{-t}$ (lesson 9.1\'s negative-index law), so $a^{-t} = x$.',
          'So, read at base $a$: the definition pair gives $-t = \\log_a x$; combining with step 1, $\\log_{1/a} x = t = -\\log_a x$ — the base-flip is exactly a sign-flip, for every $x > 0$.',
          'Now, verify: $\\log_{0.5} 8 = -3$ (for $0.5^{-3} = 2^3 = 8$) and $-\\log_2 8 = -3$ — agree; $\\log_{1/3} 81 = -4$ (for $(\\tfrac{1}{3})^{-4} = 3^4 = 81$) and $-\\log_3 81 = -4$ — agree; the engine confirms both to $10^{-12}$.',
          'Hence $\\log_{1/a} x = -\\log_a x$ on all of $(0, \\infty)$, both witnesses exact — and the falling curves of the base-family figure are this law made visible.',
        ], answer: 'proved from (1/a)^t = a^{−t}; witnesses log_{0.5} 8 = −3 = −log₂ 8 and log_{1/3} 81 = −4 = −log₃ 81' },
      ] },
    ] },
  ],
}


export const chapter09: Chapter = {
  number: 9,
  slug: 'exponentials-and-logarithms',
  title: 'Exponentials and Logarithms',
  summary:
    'The first great non-polynomial family inside algebra. The exponent laws AL banked on integer and rational indices are extended to every real index — the exponential function aˣ as a machine with a constant percent climb, its shape family, and the growth stories it prices. The logarithm is then defined once and for all as the inverse machine — chapter 1’s theory cashing its first big cheque: domain and range swap, log_a(aˣ) = x, and every log law DERIVED from the exponent law it mirrors instead of memorized. Change of base, the common and natural logarithms, and the chapter closes on equations: same-base discipline, exponent equations that hide quadratics, log equations with their domain discipline enforced (extraneous roots caught, not mourned), and the growth and decay problems that make the family famous.',
  status: 'in-progress',
  lessons: [lesson91, lesson92],
  plannedLessons: [
    'The Laws of Logarithms and the Change of Base',
    'Logarithmic and Exponential Equations',
    'Exponential and Logarithmic Series',
    'Logarithm Tables: Characteristic, Mantissa and Antilogarithm',
  ],
}
