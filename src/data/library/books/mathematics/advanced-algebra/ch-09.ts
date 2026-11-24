import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — chapter 9 "Exponentials and Logarithms"
 * (OPENED by the RUN 120 TWO-AGENT SWARM and CLOSED COMPLETE by the RUN 121
 * WHOLE-CHAPTER SWARM — the first fire under the owner's 2026-11-24
 * whole-chapter cadence directive: "continue and make the scheduled task
 * such that it writes one complete chapter of a book by launching multiple
 * agents not just 2 lessons". Run 120 shipped 9.1 + 9.2; run 121 authored
 * 9.3 + 9.4 + 9.5 + 9.6 + the 9.R unit review with FIVE parallel agents
 * (one per lesson), each with its verify-first engine section grown green
 * BEFORE its prose; the orchestrator assembled, gated and shipped the
 * closed chapter).
 *
 * PROVENANCE: ground = the Drive `M1 Trigonometry :: 1. Logarithm and Its
 * Properties` module (citation key `cengage-m1-01`, Drive id
 * `1hPWvsTTo3qv3jC9ir2Kx8qU_RnJ79F7V`, 27 MB scanned, 44 PDF pages; the
 * exp/log band printed 1.1–1.26 vision-transcribed across runs 120-121
 * into temporary-references/m1-01-A..F.txt) + Hall & Knight's Higher
 * Algebra ch. XVI (Logarithms) + ch. XVII (Exponential and Logarithmic
 * Series + the Construction of Tables) (Drive id
 * `180ekbSviR32yYFZxH1kialElz_8yEzfD`, 31 MB, text layer + vision
 * transcription hk-ch17-A/B.txt) + the JEE Main unit list
 * (`jee-main-2026-syllabus`) + the Cengage presentation contract
 * (`cengage-jee-style`). STUDY-NEVER-REPRODUCE absolute: every roster,
 * witness, figure, Illustration, quiz item and exercise below is OUR
 * OWN, engine-pinned in scripts/verify-book4-ch09.ts.
 */
// ------------------------------------------------------------------
// lesson 9.1 — run 120 (the two-agent swarm), integrated verbatim
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
// lesson 9.2 — run 120 (the two-agent swarm), integrated verbatim
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


// ------------------------------------------------------------------
// lesson 9.3 — run 121 (the whole-chapter swarm), integrated verbatim
// ------------------------------------------------------------------

/**
 * Advanced Algebra — lesson 9.3 "The Laws of Logarithms and the Change of Base"
 * (authored by agent aa93 of the RUN 121 whole-chapter swarm, owner directive
 * "launch multiple authoring agents"; engine-first discipline: every number
 * below was recomputed and pinned by temporary-references/v-aa93.ts BEFORE
 * this prose was written — the C-sections of that verifier are the source of
 * every decimal quoted here, and the Q-sections pin this file itself).
 *
 * PROVENANCE: the Cengage-style presentation contract (`cengage-jee-style`),
 * the Drive M1 module 01 scanned pages banked in temporary-references
 * (`cengage-m1-01`, the fundamental-laws band printed 1.6–1.10), Hall &
 * Knight Higher Algebra (`hall-knight-higher-algebra`, the logarithm arc of
 * the 35-chapter TOC banked run 66) and the JEE Main unit list
 * (`jee-main-2026-syllabus`). STUDY-NEVER-REPRODUCE absolute: every roster,
 * witness, figure, Illustration, quiz item and exercise is OUR OWN.
 */

// ----------------------------------------------------------------- figures
// The palette law (house contract): structure/axes #16a34a, primary labels
// #166534, mid values #65a30d, teal captions #0d9488 / #0f766e, connectors
// and ticks #d97706, accents and arrows #ea580c, tints #fef3c7 / #ffedd5,
// separators #fcd34d, faint grids #5eead4, white-on-fill #ffffff. No other
// hex appears. Every svg carries role="img" and a full aria-label; every
// coordinate is computed from the named constants inside the helper.

function telescopingChain93Svg(): string {
  // THE TELESCOPING CHAIN — the six factors (log_3 4)…(log_8 9) as boxes,
  // each expanded underneath into the fraction log(k+1)/log k at one common
  // base; the five interior labels log 4…log 8 cancel pairwise (dashed amber
  // arcs + strike marks), the survivors log 9 / log 3 are highlighted, and
  // the whole chain reads log_3 9 = 2 (engine-exact).
  const N = 6 // number of factors in the chain
  const MARGIN = 15
  const BOX_W = 90
  const GAP = 30 // the gap that holds each × sign
  const BOX_TOP = 44
  const BOX_H = 56
  const NUM_Y = 152 // fraction numerator baseline
  const BAR_Y = 162 // fraction bar
  const DEN_Y = 180 // fraction denominator baseline
  const SUB = '₀₁₂₃₄₅₆₇₈₉'
  const digit = (d: number) => SUB[d]
  const centers: number[] = []
  for (let i = 0; i < N; i += 1) centers.push(MARGIN + i * (BOX_W + GAP) + BOX_W / 2)

  let boxes = ''
  for (let i = 0; i < N; i += 1) {
    const k = 3 + i
    const cx = centers[i]
    boxes += `<rect x="${cx - BOX_W / 2}" y="${BOX_TOP}" width="${BOX_W}" height="${BOX_H}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>`
    boxes += `<text x="${cx}" y="${BOX_TOP + 34}" font-size="14" font-weight="700" fill="#166534" text-anchor="middle">log${digit(k)} ${k + 1}</text>`
  }
  let crossSigns = ''
  for (let i = 0; i < N - 1; i += 1) {
    const mx = MARGIN + i * (BOX_W + GAP) + BOX_W + GAP / 2
    crossSigns += `<text x="${mx}" y="${BOX_TOP + BOX_H / 2 + 6}" font-size="16" font-weight="800" fill="#d97706" text-anchor="middle">×</text>`
  }
  // survivor highlight plates, painted before the fraction texts they back
  const hiDen = `<rect x="${centers[0] - 32}" y="166" width="64" height="24" rx="5" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>`
  const hiNum = `<rect x="${centers[N - 1] - 32}" y="136" width="64" height="24" rx="5" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>`
  let fractions = ''
  for (let i = 0; i < N; i += 1) {
    const cx = centers[i]
    const k = 3 + i
    const numHot = i === N - 1
    const denHot = i === 0
    fractions += `<text x="${cx}" y="${NUM_Y}" font-size="10.5" font-weight="${numHot ? '800' : '700'}" fill="${numHot ? '#ea580c' : '#166534'}" text-anchor="middle">log ${k + 1}</text>`
    fractions += `<line x1="${cx - 28}" y1="${BAR_Y}" x2="${cx + 28}" y2="${BAR_Y}" stroke="#166534" stroke-width="1.4"/>`
    fractions += `<text x="${cx}" y="${DEN_Y}" font-size="10.5" font-weight="${denHot ? '800' : '700'}" fill="${denHot ? '#ea580c' : '#166534'}" text-anchor="middle">log ${k}</text>`
  }
  // the five cancel arcs: numerator of box i joins the denominator of box i+1
  let arcs = ''
  for (let i = 0; i < N - 1; i += 1) {
    const x1 = centers[i] + 18
    const x2 = centers[i + 1] - 18
    const mid = (centers[i] + centers[i + 1]) / 2
    arcs += `<path d="M ${x1} 142 Q ${mid} 152 ${x2} 180" fill="none" stroke="#d97706" stroke-width="1.8" stroke-dasharray="5 4"/>`
  }
  // strike marks through every cancelled label (numerators of boxes 0…4,
  // denominators of boxes 1…5 — the survivors are never struck)
  let strikes = ''
  for (let i = 0; i < N - 1; i += 1) {
    strikes += `<line x1="${centers[i] - 20}" y1="145" x2="${centers[i] + 20}" y2="151" stroke="#ea580c" stroke-width="2"/>`
  }
  for (let i = 1; i < N; i += 1) {
    strikes += `<line x1="${centers[i] - 20}" y1="172" x2="${centers[i] + 20}" y2="179" stroke="#ea580c" stroke-width="2"/>`
  }

  return `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The telescoping chain. Six boxes in a row read log base 3 of 4, times log base 4 of 5, times log base 5 of 6, times log base 6 of 7, times log base 7 of 8, times log base 8 of 9. Under each box the factor is expanded as a fraction at one common base: log 4 over log 3, log 5 over log 4, log 6 over log 5, log 7 over log 6, log 8 over log 7, log 9 over log 8. Five dashed amber arcs join each numerator to the denominator of the next factor, and every interior label log 4 through log 8 carries a strike mark: each cancels once upstairs and once downstairs. The two survivors are highlighted in orange — log 9 above and log 3 below — so the chain equals log 9 over log 3, which is log base 3 of 9, which is 2.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the telescoping chain: (log₃ 4)(log₄ 5)(log₅ 6)(log₆ 7)(log₇ 8)(log₈ 9) = log₃ 9 = 2</text>
  ${boxes}
  ${crossSigns}
  ${hiNum}
  ${hiDen}
  ${fractions}
  ${strikes}
  ${arcs}
  <rect x="150" y="210" width="420" height="30" rx="6" fill="#fef3c7" stroke="#16a34a" stroke-width="1.2"/>
  <text x="360" y="230" font-size="12" text-anchor="middle" fill="#166534">the survivors: <tspan fill="#ea580c" font-weight="800">log 9 / log 3</tspan> = <tspan fill="#ea580c" font-weight="800">log₃ 9 = 2</tspan></text>
  <line x1="80" y1="256" x2="640" y2="256" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="272" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">each factor is written as log(next) / log(base) at one common base — every interior log cancels once up, once down</text>
  <text x="360" y="288" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">the six-factor chain telescopes to log₃ 9 = 2 — the engine pins the product equal to 2 exactly</text>
</svg>`
}

function reciprocalFlip93Svg(): string {
  // THE RECIPROCAL FLIP — two number lines: above, the values x = log_3 5
  // and y = log_17 25 (x sits right of y); below, their reciprocals 1/x and
  // 1/y (now 1/x sits LEFT of 1/y). The two crossing arrows draw the order
  // flip. Every dot position is computed from the engine-pinned values.
  const X0 = 90
  const X1 = 660
  const TOP = 84 // the values line
  const BOT = 206 // the reciprocals line
  const logB = (b: number, v: number) => Math.log(v) / Math.log(b)
  const xVal = logB(3, 5) // 1.4649735…
  const yVal = logB(17, 25) // 1.1361219…
  const rxVal = 1 / xVal // 0.6826062… = log_5 3
  const ryVal = 1 / yVal // 0.8801872… = log_25 17
  // the top line covers [1.0, 1.6]; the bottom line covers [0.6, 1.0]
  const pxTop = (v: number) => X0 + ((v - 1) / 0.6) * (X1 - X0)
  const pxBot = (v: number) => X0 + ((v - 0.6) / 0.4) * (X1 - X0)
  const xTop = pxTop(xVal)
  const yTop = pxTop(yVal)
  const rxBot = pxBot(rxVal)
  const ryBot = pxBot(ryVal)
  const f = (n: number) => n.toFixed(1)

  const head = (x2: number, y2: number, ux: number, uy: number) => {
    const bx = x2 - ux * 10
    const by = y2 - uy * 10
    const ox = -uy * 4.5
    const oy = ux * 4.5
    return `<polygon points="${f(x2)},${f(y2)} ${f(bx + ox)},${f(by + oy)} ${f(bx - ox)},${f(by - oy)}" fill="#ea580c"/>`
  }
  const arrow = (x1: number, y1: number, x2: number, y2: number, cx: number, cy: number) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.hypot(dx, dy)
    const ux = dx / len
    const uy = dy / len
    return (
      `<path d="M ${f(x1)} ${f(y1)} Q ${f(cx)} ${f(cy)} ${f(x2 - ux * 12)} ${f(y2 - uy * 12)}" fill="none" stroke="#ea580c" stroke-width="2" stroke-dasharray="6 4"/>` +
      head(x2, y2, ux, uy)
    )
  }

  const tickTop = (v: number) =>
    `<line x1="${f(pxTop(v))}" y1="${TOP - 5}" x2="${f(pxTop(v))}" y2="${TOP + 5}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${f(pxTop(v))}" y="${TOP - 8}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${v.toFixed(1)}</text>`
  const tickBot = (v: number) =>
    `<line x1="${f(pxBot(v))}" y1="${BOT - 5}" x2="${f(pxBot(v))}" y2="${BOT + 5}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${f(pxBot(v))}" y="${BOT + 20}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${v.toFixed(1)}</text>`

  return `<svg viewBox="0 0 720 314" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The reciprocal flip. A top number line carries the values: x equals log base 3 of 5, a green dot at 1.4650, and y equals log base 17 of 25, an amber dot at 1.1361, with x to the right of y, so x is greater than y. A bottom number line carries the reciprocals: 1 over x equals log base 5 of 3 at 0.6826, now on the left, and 1 over y equals log base 25 of 17 at 0.8802, now on the right. Two dashed orange arrows cross in the middle: each value maps to its own reciprocal, and the crossing draws the order reversal. The footer states that the reciprocal map reverses the order of positive numbers, so the larger value has the smaller reciprocal: engine values 1.4649735 and 1.1361219 with reciprocals 0.6826062 and 0.8801872.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the reciprocal flip: comparing values (above) vs comparing reciprocals (below)</text>
  <text x="20" y="62" font-size="9.5" font-weight="700" fill="#0f766e">the values:</text>
  <line x1="${X0}" y1="${TOP}" x2="${X1}" y2="${TOP}" stroke="#16a34a" stroke-width="2"/>
  ${[1, 1.2, 1.4, 1.6].map(tickTop).join('')}
  <text x="${f(yTop)}" y="56" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">y = log₁₇ 25 = 1.1361</text>
  <text x="${f(xTop)}" y="56" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">x = log₃ 5 = 1.4650</text>
  <text x="688" y="58" font-size="11" font-weight="800" fill="#166534" text-anchor="end">x &gt; y</text>
  <circle cx="${f(yTop)}" cy="${TOP}" r="6" fill="#d97706" stroke="#166534" stroke-width="1.4"/>
  <circle cx="${f(xTop)}" cy="${TOP}" r="6" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>
  ${arrow(xTop, TOP + 12, rxBot, BOT - 10, 350, 148)}
  ${arrow(yTop, TOP + 12, ryBot, BOT - 10, 350, 148)}
  <text x="360" y="122" font-size="9.5" font-weight="800" fill="#ea580c" text-anchor="middle">the flip</text>
  <text x="20" y="190" font-size="9.5" font-weight="700" fill="#0f766e">the reciprocals:</text>
  <line x1="${X0}" y1="${BOT}" x2="${X1}" y2="${BOT}" stroke="#16a34a" stroke-width="2"/>
  ${[0.6, 0.7, 0.8, 0.9, 1].map(tickBot).join('')}
  <circle cx="${f(rxBot)}" cy="${BOT}" r="6" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>
  <circle cx="${f(ryBot)}" cy="${BOT}" r="6" fill="#d97706" stroke="#166534" stroke-width="1.4"/>
  <text x="${f(rxBot)}" y="250" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">1/x = log₅ 3 = 0.6826</text>
  <text x="${f(ryBot)}" y="250" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">1/y = log₂₅ 17 = 0.8802</text>
  <text x="688" y="252" font-size="11" font-weight="800" fill="#166534" text-anchor="end">1/x &lt; 1/y</text>
  <line x1="80" y1="268" x2="640" y2="268" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="286" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">the reciprocal map t → 1/t reverses the order of positives: 1/y = 0.8801872 &gt; 1/x = 0.6826062, so x &gt; y</text>
  <text x="360" y="302" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">engine values: x = 1.4649735 &gt; y = 1.1361219 — the flip drawn above is the whole argument</text>
</svg>`
}

function baseDial93Svg(): string {
  // THE BASE DIAL — the argument pinned at 64 while the base turns through
  // 2, 4, 16 and 0.25 (that is, 2^b for b = 1, 2, 4, −2): the four bars
  // stand (or hang) at the computed heights 6, 3, 1.5, −3, so the dial
  // reads log_(2^b) 64 = 6/b. Heights computed from the logarithms here.
  const AXIS_X = 96
  const BASE_Y = 236 // pixel y of value 0
  const PV = 27 // px per unit of value
  const py = (v: number) => BASE_Y - v * PV
  const f = (n: number) => n.toFixed(1)
  const logB = (b: number, v: number) => Math.log(v) / Math.log(b)
  const ARG = 64
  const cols = [
    { cx: 190, base: 2, label: 'base 2', power: '= 2¹', dial: 'b = 1' },
    { cx: 330, base: 4, label: 'base 4', power: '= 2²', dial: 'b = 2' },
    { cx: 470, base: 16, label: 'base 16', power: '= 2⁴', dial: 'b = 4' },
    { cx: 610, base: 0.25, label: 'base 0.25', power: '= 2⁻²', dial: 'b = −2' },
  ]
  const BAR_W = 84
  const fmtV = (v: number) => (v < 0 ? '−' + Math.abs(v) : String(v))

  let bars = ''
  for (const c of cols) {
    const v = logB(c.base, ARG)
    if (v >= 0) {
      bars += `<rect x="${c.cx - BAR_W / 2}" y="${f(py(v))}" width="${BAR_W}" height="${f(v * PV)}" rx="3" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>`
      bars += `<text x="${c.cx}" y="${f(py(v) - 8)}" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">${fmtV(v)}</text>`
      bars += `<text x="${c.cx}" y="${f(py(v) + 18)}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">${c.dial}</text>`
    } else {
      bars += `<rect x="${c.cx - BAR_W / 2}" y="${BASE_Y}" width="${BAR_W}" height="${f(-v * PV)}" rx="3" fill="#ffedd5" stroke="#16a34a" stroke-width="1.6"/>`
      bars += `<text x="${c.cx}" y="${f(BASE_Y - v * PV + 16)}" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">${fmtV(v)}</text>`
      bars += `<text x="${c.cx}" y="${f(BASE_Y + 64)}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">${c.dial}</text>`
    }
    bars += `<text x="${c.cx}" y="258" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">${c.label}</text>`
    bars += `<text x="${c.cx}" y="272" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="middle">${c.power}</text>`
  }
  const tick = (v: number, txt: string) =>
    `<line x1="${AXIS_X - 6}" y1="${f(py(v))}" x2="${AXIS_X}" y2="${f(py(v))}" stroke="#0f766e" stroke-width="1.6"/>` +
    `<text x="${AXIS_X - 10}" y="${f(py(v) + 4)}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="end">${txt}</text>`

  return `<svg viewBox="0 0 720 402" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The base dial. A vertical value axis runs from minus 3 to 6 with a horizontal zero line. Four bars show the logarithm of the fixed argument 64 at four bases: at base 2 the bar stands at 6; at base 4, which is 2 squared, at 3; at base 16, which is 2 to the fourth, at 1.5; and at base 0.25, which is 2 to the minus two, the bar hangs below the zero line at minus 3. Each bar carries its dial label b equals 1, 2, 4 or minus 2, and the axis is ticked at 6, 3, 1.5, 0 and minus 3. The footer states that the argument never moves while the base exponent dial divides the logarithm: the logarithm of 64 at base 2 to the b equals 6 over b, the base law in one picture.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the base dial: log_(2^b) 64 = 6/b — the argument stays put, the dial turns</text>
  <text x="688" y="44" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="end">log_(2^b) 64 = 6/b</text>
  <line x1="${AXIS_X}" y1="344" x2="${AXIS_X}" y2="60" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${AXIS_X} 60 l -5 12 h 10 z" fill="#16a34a"/>
  <line x1="${AXIS_X}" y1="${BASE_Y}" x2="684" y2="${BASE_Y}" stroke="#16a34a" stroke-width="2"/>
  <path d="M 684 ${BASE_Y} l -12 -5 v 10 z" fill="#16a34a"/>
  ${tick(6, '6')}${tick(3, '3')}${tick(1.5, '1.5')}${tick(0, '0')}${tick(-3, '−3')}
  ${bars}
  <line x1="80" y1="356" x2="640" y2="356" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="372" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">the argument 64 never moves — turning the base's exponent dial b = 1, 2, 4, −2 reads 6, 3, 1.5, −3</text>
  <text x="360" y="388" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">the base law log_(a^b) m = (1/b) log_a m: squaring the base halves the log; a below-one base flips its sign</text>
</svg>`
}

function identityMachine93Svg(): string {
  // SOLUTION FIGURE on L3(a) — the identity machine: log_5 3 rewrites by
  // the reciprocal law as 1/log_3 5; log_3 25 rewrites by the power law as
  // 2 log_3 5; the reciprocal pair annihilates and the product reads 2.
  const A = { x: 36, w: 110 }
  const B = { x: 240, w: 110 }
  const C = { x: 452, w: 160 }
  const D = { x: 636, w: 64 }
  const TOP = 74
  const H = 44
  const MID = TOP + H / 2
  const chip = (x: number, w: number, text: string, size: number, fill: string, stroke: string, weight: string) =>
    `<rect x="${x}" y="${TOP}" width="${w}" height="${H}" rx="7" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>` +
    `<text x="${x + w / 2}" y="${MID + 5}" font-size="${size}" font-weight="${weight}" fill="#166534" text-anchor="middle">${text}</text>`
  const arrow = (x1: number, x2: number) => {
    const ux = 1
    const bx = x2 - 12
    return (
      `<line x1="${x1}" y1="${MID}" x2="${bx}" y2="${MID}" stroke="#ea580c" stroke-width="2"/>` +
      `<polygon points="${x2},${MID} ${bx},${MID - 5} ${bx},${MID + 5}" fill="#ea580c"/>`
    )
  }

  return `<svg viewBox="0 0 720 202" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The identity machine for log base 5 of 3 times log base 3 of 25. Three amber chips and a result chip form a pipeline: the first chip reads log base 5 of 3; an arrow labelled reciprocal law rewrites it as 1 over log base 3 of 5; an arrow labelled power law, 25 equals 5 squared, rewrites the second factor as 2 log base 3 of 5; the third chip multiplies the two rewritten factors; and the result chip reads 2. The caption line states that the reciprocal pair annihilates, so the product is 2 times 1.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the identity machine: log₅ 3 × log₃ 25 = 2</text>
  ${chip(A.x, A.w, 'log₅ 3', 12.5, '#fef3c7', '#16a34a', '700')}
  ${arrow(A.x + A.w, B.x)}
  <text x="${(A.x + A.w + B.x) / 2}" y="86" font-size="9.5" font-weight="800" fill="#ea580c" text-anchor="middle">reciprocal law</text>
  <text x="${(A.x + A.w + B.x) / 2}" y="110" font-size="9" font-weight="700" fill="#65a30d" text-anchor="middle">log₅ 3 = 1/log₃ 5</text>
  ${chip(B.x, B.w, '1/log₃ 5', 12.5, '#fef3c7', '#16a34a', '700')}
  ${arrow(B.x + B.w, C.x)}
  <text x="${(B.x + B.w + C.x) / 2}" y="86" font-size="9.5" font-weight="800" fill="#ea580c" text-anchor="middle">power law: 25 = 5²</text>
  <text x="${(B.x + B.w + C.x) / 2}" y="110" font-size="9" font-weight="700" fill="#65a30d" text-anchor="middle">log₃ 25 = 2 log₃ 5</text>
  ${chip(C.x, C.w, '(1/log₃ 5) · (2 log₃ 5)', 10.5, '#fef3c7', '#16a34a', '700')}
  ${arrow(C.x + C.w, D.x)}
  <text x="${(C.x + C.w + D.x) / 2}" y="64" font-size="9" font-weight="700" fill="#0f766e" text-anchor="middle">collapse</text>
  <rect x="${D.x}" y="${TOP}" width="${D.w}" height="${H}" rx="7" fill="#ffedd5" stroke="#ea580c" stroke-width="1.8"/>
  <text x="${D.x + D.w / 2}" y="${MID + 6}" font-size="16" font-weight="800" fill="#ea580c" text-anchor="middle">2</text>
  <text x="360" y="148" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">the reciprocal pair annihilates: (1/log₃ 5) × (log₃ 5) = 1 — the product is 2 × 1 = 2</text>
  <line x1="80" y1="168" x2="640" y2="168" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="186" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle">log₅ 3 · log₃ 5 = 1 — the base-dual pair; the power law supplies the factor 2</text>
</svg>`
}

function cycleLaw93Svg(): string {
  // SOLUTION FIGURE on L4(a) — the three-arrow cycle at the witness
  // (a, b, c) = (2, 3, 5): each edge carries its factor in both forms
  // (log_a b and log b / log a), and the centred product cancels to 1.
  const NA = { x: 210, y: 90 }
  const NB = { x: 510, y: 90 }
  const NC = { x: 360, y: 176 }
  const R = 26
  const f = (n: number) => n.toFixed(1)
  const node = (p: { x: number; y: number }, label: string) =>
    `<circle cx="${p.x}" cy="${p.y}" r="${R}" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>` +
    `<text x="${p.x}" y="${p.y + 6}" font-size="15" font-weight="800" fill="#166534" text-anchor="middle">${label}</text>`
  const arrow = (x1: number, y1: number, x2: number, y2: number, cx: number, cy: number) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.hypot(dx, dy)
    const ux = dx / len
    const uy = dy / len
    const bx = x2 - ux * 10
    const by = y2 - uy * 10
    const ox = -uy * 4.5
    const oy = ux * 4.5
    return (
      `<path d="M ${f(x1)} ${f(y1)} Q ${f(cx)} ${f(cy)} ${f(x2 - ux * 12)} ${f(y2 - uy * 12)}" fill="none" stroke="#d97706" stroke-width="2.2"/>` +
      `<polygon points="${f(x2)},${f(y2)} ${f(bx + ox)},${f(by + oy)} ${f(bx - ox)},${f(by - oy)}" fill="#d97706"/>`
    )
  }

  return `<svg viewBox="0 0 720 236" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The three-arrow cycle. Three round nodes labelled 2, 3 and 5 form a triangle, with amber arrows along the edges: from 2 to 3, labelled log base 2 of 3 equals log 3 over log 2; from 3 to 5, labelled log base 3 of 5 equals log 5 over log 3; and from 5 back to 2, labelled log base 5 of 2 equals log 2 over log 5. In the centre the product of the three ratios is written out and equals 1: every log appears once upstairs and once downstairs, so the cycle always closes at 1.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the three-arrow cycle: log_a b · log_b c · log_c a = 1</text>
  ${arrow(NA.x + 30, NA.y - 14, NB.x - 30, NB.y - 14, 360, 52)}
  <text x="360" y="46" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">log₂ 3 = log 3 / log 2</text>
  ${arrow(NB.x - 18, NB.y + 22, NC.x + 34, NC.y - 18, 484, 154)}
  <text x="500" y="140" font-size="10" font-weight="700" fill="#166534" text-anchor="start">log₃ 5 = log 5 / log 3</text>
  ${arrow(NC.x - 34, NC.y - 18, NA.x + 18, NA.y + 22, 236, 154)}
  <text x="220" y="140" font-size="10" font-weight="700" fill="#166534" text-anchor="end">log₅ 2 = log 2 / log 5</text>
  ${node(NA, '2')}${node(NB, '3')}${node(NC, '5')}
  <text x="360" y="112" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">the product:</text>
  <text x="360" y="126" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">(log 3 / log 2)(log 5 / log 3)(log 2 / log 5)</text>
  <text x="360" y="140" font-size="12" font-weight="800" fill="#ea580c" text-anchor="middle">= 1</text>
  <line x1="80" y1="208" x2="640" y2="208" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="224" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle">every log appears once upstairs and once downstairs — the three-arrow cycle always closes at 1</text>
</svg>`
}

function orderingFlip93Svg(): string {
  // SOLUTION FIGURE on L3(b) — the ordering flip: four columns, one per
  // base 2, 3, 5, 7; the upper chips carry the values log_b 10 (falling as
  // the base grows), the lower chips their reciprocals log_10 b (rising),
  // joined by reciprocal arrows — the order reverses.
  const COLS = [112.5, 277.5, 442.5, 607.5]
  const W = 150
  const TOP_CHIP = { y: 50, h: 38 }
  const BOT_CHIP = { y: 118, h: 38 }
  const values = ['log₂ 10 = 3.3219', 'log₃ 10 = 2.0959', 'log₅ 10 = 1.4307', 'log₇ 10 = 1.1833']
  const recips = ['log₁₀ 2 = 0.3010', 'log₁₀ 3 = 0.4771', 'log₁₀ 5 = 0.6990', 'log₁₀ 7 = 0.8451']
  const bases = ['base 2', 'base 3', 'base 5', 'base 7']

  let body = ''
  COLS.forEach((cx, i) => {
    body += `<text x="${cx}" y="42" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${bases[i]}</text>`
    body += `<rect x="${cx - W / 2}" y="${TOP_CHIP.y}" width="${W}" height="${TOP_CHIP.h}" rx="6" fill="#fef3c7" stroke="#16a34a" stroke-width="1.5"/>`
    body += `<text x="${cx}" y="73" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">${values[i]}</text>`
    body += `<line x1="${cx}" y1="92" x2="${cx}" y2="104" stroke="#ea580c" stroke-width="1.8"/>`
    body += `<polygon points="${cx},114 ${cx - 5},104 ${cx + 5},104" fill="#ea580c"/>`
    body += `<text x="${cx + 16}" y="106" font-size="9" font-weight="800" fill="#ea580c" text-anchor="middle">1/x</text>`
    body += `<rect x="${cx - W / 2}" y="${BOT_CHIP.y}" width="${W}" height="${BOT_CHIP.h}" rx="6" fill="#ffedd5" stroke="#16a34a" stroke-width="1.5"/>`
    body += `<text x="${cx}" y="141" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">${recips[i]}</text>`
  })

  return `<svg viewBox="0 0 720 216" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The ordering flip. Four columns, one per base 2, 3, 5 and 7, each holding the value log base b of 10 in an upper chip and its reciprocal log base 10 of b in a lower chip, joined by an orange arrow labelled 1 over x. The upper chips read 3.3219, 2.0959, 1.4307 and 1.1833 — falling as the base grows; the lower chips read 0.3010, 0.4771, 0.6990 and 0.8451 — rising. The footer states that falling values have rising reciprocals, so the order of the originals is reversed: log base 2 of 10 is the largest and log base 7 of 10 the smallest.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the ordering flip: values fall as the base grows — reciprocals rise</text>
  ${body}
  <text x="360" y="176" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">the reciprocals increase: 0.3010 &lt; 0.4771 &lt; 0.6990 &lt; 0.8451</text>
  <line x1="80" y1="190" x2="640" y2="190" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="205" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle">falling values, rising reciprocals — the order reverses: log₂ 10 &gt; log₃ 10 &gt; log₅ 10 &gt; log₇ 10</text>
</svg>`
}

// ---------------------------------------------------------------- the lesson

export const lesson93: Lesson = {
  id: 'aa-the-laws-of-logarithms-and-the-change-of-base',
  number: '9.3',
  title: 'The Laws of Logarithms and the Change of Base',
  concepts: [
    'the three cardinal laws, derived from the exponent laws they mirror',
    'the base law log_(a^b) m = (1/b) log_a m and its combined form',
    'the change-of-base law log_a m = log_b m / log_b a',
    'the reciprocal law log_a m = 1/log_m a and the order flip',
    'the telescoping chain of consecutive-base logarithms',
    'comparing logarithms by the reciprocal route',
    'the cross-base identity and the cycle law',
    'the mirror-table discipline: every log law cashed from an exponent law',
  ],
  objectives: [
    'Derive the three cardinal laws — product, quotient, power — from the exponent laws they mirror, and cash them at sight on witnesses such as $\\log_{10} 2 + \\log_{10} 5 = 1$, $\\log_2 48 - \\log_2 3 = 4$ and $\\log_3(\\sqrt{11} + \\sqrt{2}) + \\log_3(\\sqrt{11} - \\sqrt{2}) = 2$.',
    'Turn the base dial with the base law $\\log_{a^b} m = \\tfrac{1}{b}\\log_a m$ and its combined form $\\log_{a^b} m^c = \\tfrac{c}{b}\\log_a m$ — including the classics $\\log_{2\\sqrt{3}} 1728 = 6$, $\\log_{2\\sqrt{2}} 128 = \\tfrac{14}{3}$ and the sign case $\\log_{0.25} 32 = -\\tfrac{5}{2}$.',
    'Change bases at will with $\\log_a m = \\tfrac{\\log_b m}{\\log_b a}$ (any base serves), derive the reciprocal law $\\log_a m = \\tfrac{1}{\\log_m a}$ as its corollary, and prove the cross-base identity $a^{\\log_b c} = c^{\\log_b a}$ by taking $\\log_b$ of both sides.',
    'Collapse telescoping chains such as $\\log_3 4 \\cdot \\log_4 5 \\cdots \\log_8 9 = 2$ by writing every factor as a ratio of logs, and prove the general product $\\prod_{k=2}^{n} \\log_k(k+1) = \\log_2(n+1)$.',
    'Compare logarithms by the reciprocal route — $\\log_3 5$ against $\\log_{17} 25$, $\\log_7 11$ against $\\log_{11} 17$ — and sum prime-reciprocal chains to $\\log_n 210 = 1/\\log_{210} n$.',
  ],
  prerequisites: [
    'aa-logarithms-the-inverse-machine',
    'aa-the-exponential-family-every-real-index',
    'al-powers-and-the-laws-of-exponents',
  ],
  sources: ['cengage-m1-01', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    // ================================================================ opening
    { kind: 'para', text: 'Lesson 9.2 built the machine and its undo: for every legal base $a > 0$ with $a \\neq 1$, the logarithm $\\log_a x$ is the exponent that builds $x$ out of $a$, and the two inverse identities $a^{\\log_a x} = x$ and $\\log_a(a^t) = t$ collapse towers at sight. But every value computed there was READ directly off the definition — a base-two table in the head. $\\log_2 8 = 3$ because $2^3 = 8$; $\\log_4 8 = \\tfrac{3}{2}$ because $4^{3/2} = 8$. The moment the argument stops being a clean power of the base, the definition has nothing more to say: no mental table contains $\\log_2 48$, and no visible exponent of $2$ builds $5$. Real work needs LAWS — rules that turn hard logarithms into easy ones, and then back.' },
    { kind: 'para', text: 'The need is already visible in arithmetic. A product such as $48 = 16 \\cdot 3$ is easy at base $2$ in one half and hard in the other, and the definition pair handles only whole powers. But $\\log_2 16$ IS easy — it is $4$ — and if the logarithm of a product could be assembled from the logarithms of its factors, then $\\log_2 48$ would fall to two easy reads. Whether that is legal is exactly the kind of question this chapter refuses to answer by memorisation: every logarithm law is DERIVED from the exponent law it mirrors, never announced as an independent fact. The exponent laws were proved in lesson 9.1 — $a^x a^y = a^{x+y}$, $a^x/a^y = a^{x-y}$, $(a^x)^b = a^{xb}$ — and each of them, read through the definition pair of lesson 9.2, becomes a logarithm law in this lesson. That discipline is the chapter\'s signature, and the mirror table below gathers it into one picture.' },
    { kind: 'para', text: 'The plan, in order: the three cardinal laws (product, quotient, power), each derived in three moves from the exponent law it mirrors; a named fold that formally gathers the logarithm and its property family; the base law, which moves the exponent of the BASE; the change-of-base law with its corollary the reciprocal law, which let any base borrow from any other; and the telescoping chains and comparison crafts that show the laws earning their keep. Throughout, the standing honesty of the platform: no number below is quoted that the verify-first engine has not recomputed — every decimal, every fraction and every cancellation in this lesson is engine-pinned, and the exercises close the loop on the same witnesses.' },

    // ==================================================== the cardinal laws
    { kind: 'heading', text: 'The Three Cardinal Laws, Derived' },
    { kind: 'para', text: 'Three exponent laws from lesson 9.1 do all the work of this section. Multiplication of powers ADDS exponents: $a^x \\cdot a^y = a^{x+y}$. Division SUBTRACTS them: $a^x/a^y = a^{x-y}$. Raising a power to a further exponent MULTIPLIES them: $(a^x)^b = a^{xb}$, for every real $b$. Each law was proved in 9.1 from the definition of the exponential family, and each will now be read through the definition pair $\\log_a y = x \\iff a^x = y$ to produce a logarithm law of the same shape. The three derivations below are deliberately identical in structure — name the exponents, apply the exponent law, read the result off — because that is the entire method: a logarithm question is an exponent question wearing different clothes.' },
    { kind: 'derivation', title: 'The product law', statement: 'For every legal base $a > 0$ with $a \\neq 1$ and all $m, n > 0$: the logarithm of a product splits into a sum — $\\log_a(mn) = \\log_a m + \\log_a n$. The law mirrors $a^x \\cdot a^y = a^{x+y}$.', steps: [
      { label: 'Name the exponents', formula: 'm = a^{\\log_a m}, \\qquad n = a^{\\log_a n}', explanation: 'The first inverse identity of lesson 9.2: every positive number is a power of every legal base, and its logarithm names that exponent. Write both $m$ and $n$ as powers of the SAME base $a$ — this is the move that makes the exponents visible.' },
      { label: 'Multiply', formula: 'mn = a^{\\log_a m} \\cdot a^{\\log_a n} = a^{\\log_a m + \\log_a n}', explanation: 'The exponent law $a^x a^y = a^{x+y}$ (lesson 9.1) adds the exponents when the powers multiply. The product $mn$ is therefore ITSELF a power of $a$ — with exponent $\\log_a m + \\log_a n$.' },
      { label: 'Read the exponent off', formula: '\\log_a(mn) = \\log_a m + \\log_a n', explanation: 'The definition pair: two powers of the same base are equal exactly when their exponents are equal, because the exponential machine is one-one. The exponent that builds $mn$ out of $a$ is the sum, and that exponent is precisely what $\\log_a(mn)$ MEANS.' },
    ], result: 'For every legal base $a$ and all $m, n > 0$: $\\log_a(mn) = \\log_a m + \\log_a n$ — the addition of exponents became the addition of logarithms.' },
    { kind: 'para', text: 'One detail deserves the caution lamp before the law is used in anger. The derivation NEEDS $m, n > 0$ — not as politeness but as existence: $\\log_a m$ does not exist otherwise (lesson 9.2\'s domain discipline — $a^x > 0$ always, so no exponent builds a negative number). The law splits PRODUCTS, never sums: $\\log_a(m + n)$ has no simplification in general, and the first quiz item below is built on exactly that distinction. And the law extends by induction to any finite product of positive factors, $\\log_a(x_1 x_2 \\cdots x_k) = \\log_a x_1 + \\cdots + \\log_a x_k$ — the two-factor law applied $k - 1$ times, which is how the four-prime reciprocal sum later in the lesson fuses in one line.' },
    { kind: 'derivation', title: 'The quotient law', statement: 'For every legal base $a$ and all $m, n > 0$: the logarithm of a quotient splits into a difference — $\\log_a\\!\\left(\\tfrac{m}{n}\\right) = \\log_a m - \\log_a n$, mirroring $a^x/a^y = a^{x-y}$.', steps: [
      { label: 'Name the exponents', formula: 'm = a^{\\log_a m}, \\qquad n = a^{\\log_a n}', explanation: 'The same opening move as the product law: write both numbers as powers of the common base $a$, so the exponents the law will combine become visible.' },
      { label: 'Divide', formula: '\\frac{m}{n} = \\frac{a^{\\log_a m}}{a^{\\log_a n}} = a^{\\log_a m - \\log_a n}', explanation: 'The exponent law $a^x/a^y = a^{x-y}$ (lesson 9.1) subtracts the exponents when the powers divide. The quotient is a power of $a$ with exponent $\\log_a m - \\log_a n$.' },
      { label: 'Read the exponent off', formula: '\\log_a\\!\\left(\\tfrac{m}{n}\\right) = \\log_a m - \\log_a n', explanation: 'The definition pair again: the exponent that builds $m/n$ out of $a$ is the difference of the two exponents, and that is exactly what the logarithm of the quotient names.' },
    ], result: 'For every legal base $a$ and all $m, n > 0$: $\\log_a\\!\\left(\\tfrac{m}{n}\\right) = \\log_a m - \\log_a n$ — subtraction of exponents became subtraction of logarithms.' },
    { kind: 'derivation', title: 'The power law', statement: 'For every legal base $a$, every $m > 0$ and every REAL exponent $b$: the logarithm pulls the exponent down in front — $\\log_a(m^b) = b\\,\\log_a m$, mirroring $(a^x)^b = a^{xb}$.', steps: [
      { label: 'Name the exponent', formula: 'm = a^{\\log_a m}', explanation: 'Write the base of the power as a power of $a$ — the same opening move, now with only one number to unwrap.' },
      { label: 'Raise to the power b', formula: 'm^b = \\left(a^{\\log_a m}\\right)^b = a^{b\\,\\log_a m}', explanation: 'The exponent law $(a^x)^b = a^{xb}$ of lesson 9.1 — proved there for every REAL $b$, which is exactly why this logarithm law holds for every real $b$ too: fractional, negative or irrational alike.' },
      { label: 'Read the exponent off', formula: '\\log_a(m^b) = b\\,\\log_a m', explanation: 'The definition pair: the exponent that builds $m^b$ out of $a$ is $b\\,\\log_a m$. The exponent of the argument has moved from upstairs to a factor downstairs in front.' },
    ], result: 'For every legal base $a$, every $m > 0$ and every real $b$: $\\log_a(m^b) = b\\,\\log_a m$ — the exponent came down in front.' },
    { kind: 'para', text: 'Three derivations, one method, three laws. The power law earns the most in practice because $b$ is ANY real number: $\\log_2 9 = 2\\log_2 3$ (with $b = 2$, and the engine pins $\\log_2 9 = 3.1699250 = 2 \\times 1.5849625$), $\\log_{10}\\sqrt{5} = \\tfrac{1}{2}\\log 5$ (with $b = \\tfrac{1}{2}$), $\\log_3 \\tfrac{1}{7} = -\\log_3 7$ (with $b = -1$: a negative exponent upstairs becomes a minus downstairs). The family of real exponents built in lesson 9.1 is what makes the law this wide, and the verify-first engine sweeps it below on 128 witnesses, with $b$ running over $-2.5, -1, 0.5, 1, 1.5, 2, 3$ and $\\pi$ alike — not one witness fails.' },
    { kind: 'callout', tone: 'theorem', title: 'The three cardinal laws', text: 'For every legal base $a > 0$ with $a \\neq 1$: (i) the PRODUCT law $\\log_a(mn) = \\log_a m + \\log_a n$ for all $m, n > 0$; (ii) the QUOTIENT law $\\log_a\\!\\left(\\tfrac{m}{n}\\right) = \\log_a m - \\log_a n$ for all $m, n > 0$; (iii) the POWER law $\\log_a(m^b) = b\\,\\log_a m$ for every $m > 0$ and every real $b$. Each is proved above in three moves from the exponent law it mirrors; none is an independent fact, and none should ever be memorised apart from its derivation.' },
    { kind: 'equation', latex: '\\log_a(mn) = \\log_a m + \\log_a n \\qquad\\quad \\log_a\\!\\left(\\tfrac{m}{n}\\right) = \\log_a m - \\log_a n \\qquad\\quad \\log_a(m^b) = b\\,\\log_a m \\tag{1}', note: 'the three cardinal laws, gathered. Conditions: $a > 0$ with $a \\neq 1$ throughout; $m, n > 0$; $b$ any real number. The mirrors, row by row: $a^x a^y = a^{x+y}$, $a^x/a^y = a^{x-y}$, $(a^x)^b = a^{xb}$.' },
    { kind: 'para', text: 'The mirror table gathers the discipline itself — the exponent law on the left, the logarithm law it yields on the right — because that two-column picture is the chapter\'s standing method, not a decoration. Whenever a logarithm identity is needed and momentarily forgotten, the repair is never "look it up": write the numbers as powers of a common base, apply the exponent law, and read the exponent off. The table is that method with its three most-used outputs tabulated, and every later law in this lesson (base, change of base, reciprocal) will be shown cashing one of these rows or the definition pair directly.' },
    { kind: 'table', caption: 'The mirror table: the chapter\'s discipline in one picture — each logarithm law is the exponent law beside it, read through the definition pair of lesson 9.2. Row by row: multiplication of powers adds exponents, which becomes addition of logarithms; division subtracts them; a further exponent multiplies them and comes down in front. The engine sweeps all three laws on 36, 36 and 128 witnesses respectively.', head: ['the law', 'the exponent law it mirrors', 'the logarithm law it yields'], rows: [
      ['product law', '$a^x \\cdot a^y = a^{x+y}$', '$\\log_a(mn) = \\log_a m + \\log_a n$'],
      ['quotient law', '$a^x / a^y = a^{x-y}$', '$\\log_a\\!\\left(\\tfrac{m}{n}\\right) = \\log_a m - \\log_a n$'],
      ['power law', '$(a^x)^b = a^{xb}$, $b$ real', '$\\log_a(m^b) = b\\,\\log_a m$'],
    ] },
    { kind: 'para', text: 'The laws are now derived, and the moment has come to gather them formally. The fold that follows names the subject of the whole chapter — the logarithm and its properties — and does two jobs at once: it restates the definition of lesson 9.2 in its formal place, and it files the three cardinal laws together with the anchors they stand on as the property family that every later computation draws from. A worked example cashes the family immediately, twice, on the two classic witnesses.' },

    // ================================================ FOLD 1: the named fold
    { kind: 'heading', text: 'Logarithm and Its Properties' },
    { kind: 'para', text: 'This subsection is the formal gathering of the chapter\'s subject: one definition, one family of properties, and the discipline that connects them. Nothing here is new — every item has been derived above or banked in lesson 9.2 — and that is precisely the point of the fold: to hold the collection in one place, in the form a reader can quote and a revision can sweep. Read the definition once again slowly, because every property below is a two-move consequence of it.' },
    { kind: 'callout', tone: 'definition', title: 'Logarithm and its properties', text: 'For a legal base $a > 0$ with $a \\neq 1$ and an argument $x > 0$, the LOGARITHM $\\log_a x$ is said to be the exponent with $a^{\\log_a x} = x$ — the exponent that builds $x$ out of $a$. Its property family, each member derived from the exponent law it mirrors: the anchors $\\log_a 1 = 0$ and $\\log_a a = 1$; the product law $\\log_a(mn) = \\log_a m + \\log_a n$ for $m, n > 0$; the quotient law $\\log_a\\!\\left(\\tfrac{m}{n}\\right) = \\log_a m - \\log_a n$; and the power law $\\log_a(m^b) = b\\,\\log_a m$ for every real $b$. In one sentence: the logarithm converts multiplication into addition, division into subtraction, and exponentiation into multiplication.' },
    { kind: 'para', text: 'For example, the property family converts each of the following into a single arithmetic check — one member per line, every value engine-pinned:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $\\log_2 32 + \\log_2 8 = \\log_2(32 \\cdot 8) = \\log_2 256 = 8$, because $256 = 2^8$ — the product law fusing two easy reads into one.',
      '(ii) $\\log_{10} 4 + \\log_{10} 25 = \\log_{10}(4 \\cdot 25) = \\log_{10} 100 = 2$, because $100 = 10^2$ — the same law at the common base (an L1 exercise below returns to it).',
      '(iii) $\\log_3 9 - \\log_3 27 = \\log_3\\!\\left(\\tfrac{9}{27}\\right) = \\log_3 \\tfrac{1}{3} = -1$, because $3^{-1} = \\tfrac{1}{3}$ — the quotient law, with a negative landing.',
      '(iv) $\\log_2(8^5) = 5\\,\\log_2 8 = 5 \\cdot 3 = 15$ — the power law with a whole $b$, the exponent coming down in front.',
    ] },
    { kind: 'example', title: 'Evaluate $\\log_{10} 2 + \\log_{10} 5$ and $\\log_3(\\sqrt{11} + \\sqrt{2}) + \\log_3(\\sqrt{11} - \\sqrt{2})$ — the product law cashed twice', steps: [
      'Setup: each expression is a SUM of two logarithms at the same base — exactly the shape the product law fuses, once the arguments are checked positive. They are: $2, 5 > 0$ outright, and $\\sqrt{11} \\pm \\sqrt{2} > 0$ because $\\sqrt{11} > \\sqrt{2}$.',
      'First, fuse and multiply: $\\log_{10} 2 + \\log_{10} 5 = \\log_{10}(2 \\cdot 5) = \\log_{10} 10$.',
      'Read off: $10 = 10^1$, so $\\log_{10} 10 = 1$ — the anchor $\\log_a a = 1$ at the common base. Engine: the value is exactly $1$.',
      'Second, fuse: $\\log_3(\\sqrt{11} + \\sqrt{2}) + \\log_3(\\sqrt{11} - \\sqrt{2}) = \\log_3\\!\\left((\\sqrt{11} + \\sqrt{2})(\\sqrt{11} - \\sqrt{2})\\right)$ — the product law again, on a pair that looks nothing like clean powers.',
      'Now, the difference of squares: $(\\sqrt{11} + \\sqrt{2})(\\sqrt{11} - \\sqrt{2}) = 11 - 2 = 9$, so the sum is $\\log_3 9$; and $9 = 3^2$ gives $\\log_3 9 = 2$. Engine: exactly $2$.',
      'Hence $\\log_{10} 2 + \\log_{10} 5 = 1$ and $\\log_3(\\sqrt{11} + \\sqrt{2}) + \\log_3(\\sqrt{11} - \\sqrt{2}) = 2$ — the product law cashed twice, and no table touched in either cashing.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Behind the mirror', text: 'The three laws are the exponent laws seen from behind the mirror. The reflection of lesson 9.2 swapped the roles of exponent and value; the laws of this lesson are what the exponent laws look like once that swap has been made. Addition of exponents — a fact about multiplying POWERS — becomes addition of logarithms, a fact about multiplying NUMBERS. Every identity in this chapter is one reflection of an identity of chapter 9.1, and the mirror table is that sentence drawn as a table.' },
    { kind: 'example', title: 'Evaluate $\\log_2 48 - \\log_2 3$, and read $\\log_6 216$', steps: [
      'Setup: $48$ is not a power of $2$, so no direct definition read exists — but the expression is a DIFFERENCE of same-base logarithms, which is exactly the quotient law\'s shape.',
      'Fuse: $\\log_2 48 - \\log_2 3 = \\log_2\\!\\left(\\tfrac{48}{3}\\right) = \\log_2 16$ — the division happens INSIDE the argument.',
      'Read off: $16 = 2^4$, so the value is $4$. Engine: $\\log_2 48 - \\log_2 3 = 4$ exactly, with $48/3 = 16 = 2^4$ verified as integers.',
      'Now, the second read: $216 = 6^3$, so the power law gives $\\log_6 216 = \\log_6(6^3) = 3\\,\\log_6 6 = 3 \\cdot 1 = 3$ — the anchor $\\log_a a = 1$ doing the last step\'s work.',
      'Hence $\\log_2 48 - \\log_2 3 = 4$ and $\\log_6 216 = 3$: the quotient law turned an unreadable logarithm into a clean power, and the power law plus an anchor read the other at sight.',
    ] },
    { kind: 'para', text: 'A closing remark on the fold\'s scope. The definition, the anchors and the three cardinal laws are the ENTIRE foundation of logarithm arithmetic at a fixed base; every computation in the rest of this lesson is some chain of them. What the fold deliberately does not yet contain is any law that CHANGES the base — the base law, the change-of-base law and the reciprocal law all wait for their own derivations below, and the terms block that follows files them in the order they arrive, so that the reader can tell at a glance which laws are fixed-base and which are currency exchanges.' },
    { kind: 'terms', items: [
      { term: 'product law', def: 'the logarithm of a product splits: $\\log_a(mn) = \\log_a m + \\log_a n$ for $m, n > 0$; mirrors $a^x a^y = a^{x+y}$. Witness: $\\log_{10} 2 + \\log_{10} 5 = \\log_{10} 10 = 1$.' },
      { term: 'quotient law', def: 'the logarithm of a quotient splits: $\\log_a\\!\\left(\\tfrac{m}{n}\\right) = \\log_a m - \\log_a n$; mirrors $a^x/a^y = a^{x-y}$. Witness: $\\log_2 48 - \\log_2 3 = \\log_2 16 = 4$.' },
      { term: 'power law', def: 'the exponent comes down in front: $\\log_a(m^b) = b\\,\\log_a m$ for every real $b$; mirrors $(a^x)^b = a^{xb}$. Witness: $\\log_6 216 = \\log_6 6^3 = 3$.' },
      { term: 'base law', def: 'turning the exponent of the BASE divides the log: $\\log_{a^b} m = \\tfrac{1}{b}\\log_a m$ (combined form $\\log_{a^b} m^c = \\tfrac{c}{b}\\log_a m$); mirrors $(a^b)^t = a^{bt}$. Witness: $\\log_{2\\sqrt{3}} 1728 = 6$.' },
      { term: 'change of base', def: 'any base serves: $\\log_a m = \\tfrac{\\log_b m}{\\log_b a}$ — every logarithm is a ratio of two logarithms at any fixed legal base. Witness: $\\log_2 5 = \\log 5/\\log 2 = 2.321928095$.' },
      { term: 'reciprocal law', def: 'flipping base and argument flips the value: $\\log_a m = \\tfrac{1}{\\log_m a}$, equivalently $\\log_a m \\cdot \\log_m a = 1$. Witness: $\\log_6 16 \\times \\log_{16} 6 = 1$.' },
      { term: 'telescoping chain', def: 'a product $\\log_{k_1} k_2 \\cdot \\log_{k_2} k_3 \\cdots \\log_{k_{n-1}} k_n$ written as ratios of logs at one base: every interior log cancels once upstairs and once down, leaving $\\log_{k_1} k_n$.' },
      { term: 'mirror table discipline', def: 'the chapter\'s method: every logarithm law is DERIVED from the exponent law it mirrors — never memorised as an independent fact. The repair for a forgotten law is always "write as powers, apply the exponent law, read off".' },
    ] },
    { kind: 'para', text: 'One habit before the base laws arrive. When a sum or difference of logarithms appears, ALWAYS check the base of every term before fusing: the product and quotient laws need the SAME base throughout, and a sum like $\\log_2 3 + \\log_3 5$ — two different bases — is not a candidate for either law. Mixed-base expressions are exactly what the change-of-base law below exists to repair, and the distinction is worth a caution there; the exercises also return to it, because it is the single most common source of lost marks in this band.' },

    // ======================================================== the base laws
    { kind: 'heading', text: 'The Base Laws' },
    { kind: 'para', text: 'The three cardinal laws move the exponent of the ARGUMENT. A second law moves the exponent of the BASE: what happens to $\\log_a m$ when the base $a$ is itself replaced by a power $a^b$? The question is not idle — the classic examination witnesses $\\log_{2\\sqrt{2}} 128$, $\\log_{2\\sqrt{3}} 1728$ and $\\log_{0.25} 32$ are all base-law questions in disguise, and every one of them is a clean fraction or whole number once the law is in hand. The derivation is one move shorter than the cardinal three, because only one exponent ever needs naming.' },
    { kind: 'derivation', title: 'The base law', statement: 'For $a > 0$ with $a \\neq 1$, any $b \\neq 0$ and $m > 0$: the logarithm at the base $a^b$ is a fixed multiple of the logarithm at the base $a$ — $\\log_{a^b} m = \\tfrac{1}{b}\\log_a m$. The law mirrors $(a^b)^t = a^{bt}$.', steps: [
      { label: 'Name the exponent', formula: 't = \\log_{a^b} m \\;\\text{ says}\\; (a^b)^t = m', explanation: 'The definition pair at the base $a^b$ — a legal base, since $a^b > 0$ always and $a^b \\neq 1$ exactly when $b \\neq 0$. Write the unknown exponent $t$ that the logarithm names.' },
      { label: 'Apply the exponent law', formula: '(a^b)^t = a^{bt}, \\;\\text{ so }\\; m = a^{bt}', explanation: 'The power-of-a-power law $(a^b)^t = a^{bt}$ of lesson 9.1 — the same law that produced the cardinal power law, now applied to the BASE side of the fraction. The argument $m$ has been written as a power of $a$, with exponent $bt$.' },
      { label: 'Read at base a', formula: '\\log_a m = bt \\;\\Longrightarrow\\; t = \\tfrac{1}{b}\\log_a m', explanation: 'The definition pair at base $a$: the exponent that builds $m$ out of $a$ is $bt$. Solve for $t$ — legal because $b \\neq 0$ — and the unknown logarithm is a fixed multiple of a logarithm at the friendlier base $a$.' },
      { label: 'Combine with the power law', formula: '\\log_{a^b}\\!\\left(m^c\\right) = \\tfrac{c}{b}\\,\\log_a m', explanation: 'Apply the base law and then the power law (or in one move: $m^c = a^{c\\,\\log_a m}$ and $a^{bt} = m^c$ forces $bt = c\\,\\log_a m$). The exponent of the argument and the exponent of the base combine as the single ratio $c/b$. Classic witness: $\\log_{9} 27 = \\tfrac{3}{2}$ is $c/b$ with $a = 3$, $b = 2$, $c = 3$.' },
    ], result: 'For every legal base $a$, every $b \\neq 0$ and every $m > 0$: $\\log_{a^b} m = \\tfrac{1}{b}\\log_a m$, and combined with the power law $\\log_{a^b}(m^c) = \\tfrac{c}{b}\\log_a m$ — the base\'s exponent dial divides the logarithm.' },
    { kind: 'equation', latex: '\\log_{a^b} m = \\frac{1}{b}\\,\\log_a m \\qquad\\qquad \\log_{a^b}\\!\\left(m^c\\right) = \\frac{c}{b}\\,\\log_a m \\tag{2}', note: 'the base law and its combined form — conditions $a > 0$, $a \\neq 1$, $b \\neq 0$, $m > 0$, $c$ any real. Squaring the base halves the logarithm; cubing it takes a third. The engine sweeps the law on 54 witnesses before it is used below.' },
    { kind: 'example', title: 'Evaluate $\\log_{2\\sqrt{3}} 1728$ — the classic three-move read', steps: [
      'Setup: neither the base $2\\sqrt{3}$ nor the argument $1728$ is a recognizable power of anything at sight — the professional route is to write BOTH as products of primes.',
      'The base: $2\\sqrt{3} = 2 \\cdot 3^{1/2}$ — the primes $2$ and $3$ with exponents $1$ and $\\tfrac{1}{2}$.',
      'The argument: $1728 = 2^6 \\cdot 3^3$ (for $64 \\cdot 27 = 1728$ — the factorisation an examination candidate checks by multiplying back: $64 \\cdot 27 = 1728$ exactly).',
      'Match exponents: raise the base to a whole power and compare — $(2\\sqrt{3})^6 = 2^6 \\cdot \\left(3^{1/2}\\right)^6 = 2^6 \\cdot 3^3 = 64 \\cdot 27 = 1728$. The engine confirms $(2\\sqrt{3})^6 = 1728$ by the integer route $2^6 3^3$ and by the floating route, both to full precision.',
      'Hence the exponent that builds $1728$ out of $2\\sqrt{3}$ is $6$: $\\log_{2\\sqrt{3}} 1728 = 6$ — the classic, cashed in four moves and two prime factorisations.',
    ] },
    { kind: 'example', title: 'Read $\\log_{16} 64$, $\\log_8 16$, $\\log_9 27$ and $\\log_{0.25} 32$', steps: [
      'Setup: in each of the four, base and argument are powers of one common prime — write both with their exponents and let the combined base law $\\log_{a^b}(m^c) = \\tfrac{c}{b}$ fix the answer as a ratio of exponents.',
      '$\\log_{16} 64$: $16 = 2^4$ and $64 = 2^6$, so $\\tfrac{c}{b} = \\tfrac{6}{4} = \\tfrac{3}{2}$ — and indeed $16^{3/2} = 64$.',
      '$\\log_8 16$: $8 = 2^3$ and $16 = 2^4$, so $\\tfrac{4}{3}$ — and indeed $8^{4/3} = 16$.',
      '$\\log_9 27$: $9 = 3^2$ and $27 = 3^3$, so $\\tfrac{3}{2}$ — and indeed $9^{3/2} = 27$.',
      'Now, the sign case: $\\log_{0.25} 32$: $0.25 = 2^{-2}$ and $32 = 2^5$, so $\\tfrac{c}{b} = \\tfrac{5}{-2} = -\\tfrac{5}{2}$ — a base below one with an argument above one reads NEGATIVE, exactly as the sign law of lesson 9.2 demands. Engine: $-2.5$ exactly.',
      'Hence the four reads are $\\tfrac{3}{2}$, $\\tfrac{4}{3}$, $\\tfrac{3}{2}$ and $-\\tfrac{5}{2}$ — four ratios of exponents, one law, no exceptions.',
    ] },
    { kind: 'figure', caption: 'The base dial. The argument is pinned at $64$ while the base turns: at base $2$ the logarithm stands at $6$; at base $4 = 2^2$ at $3$; at base $16 = 2^4$ at $1.5$; and at base $0.25 = 2^{-2}$ the bar hangs BELOW the zero line at $-3$. Each bar carries its dial label $b = 1, 2, 4, -2$: the base law reads $\\log_{2^b} 64 = \\tfrac{6}{b}$, so the logarithm of a fixed argument is inversely proportional to the exponent of its base — squaring the base halves the log, and a below-one base flips its sign outright. All four bar heights are computed inside the figure from the logarithms themselves; the engine pins $6, 3, 1.5, -3$ exactly.', svg: baseDial93Svg() },
    { kind: 'para', text: 'The dial picture makes one more structural point worth saying aloud. The four readings $6, 3, 1.5, -3$ are the SAME reading, taken at four different dials — the argument never moved. Run the logic in reverse and it becomes a method: whenever a logarithm is wanted at an awkward base, re-express the BASE as a power of a friendlier one and dial down to the friendly reading. That is exactly what both illustrations above did — $16 = 2^4$ and $0.25 = 2^{-2}$ are dials down to base $2$; $2\\sqrt{3} = 2\\cdot 3^{1/2}$ matched its dial against the argument\'s prime exponents — and it is the bridge to the fully general change-of-base law of the next section, which dials all the way down to ANY base at all.' },
    { kind: 'callout', tone: 'warn', title: 'Two sign-flips, never confuse them', text: 'The base-symmetry law $\\log_{1/a} m = -\\log_a m$ (banked in lesson 9.2) is the base law at $b = -1$: flipping the base across $1$ flips the SIGN of the logarithm. The RECIPROCAL law $\\log_a m = 1/\\log_m a$ (derived next section) flips the base and the ARGUMENT — an entirely different machine. $\\log_{0.25} 32 = -\\tfrac{5}{2}$ is the first (a sign-flip, base $0.25 = 2^{-2}$); $\\log_2 32 \\cdot \\log_{32} 2 = 5 \\cdot \\tfrac{1}{5} = 1$ is the second (a reciprocal pair). Mixing the two is a standing examination error: the sign-flip lives in the base\'s exponent, the reciprocal-flip in the base itself.' },
    { kind: 'para', text: 'The decay-case honesty deserves its own sentence, because it returns throughout the exercises. At a base below one, the base law\'s $b$ is negative whenever the base is written as a power of a number above one — so the sign flip arrives automatically, by construction, with no extra rule to remember. The reader who writes $0.25 = 2^{-2}$ BEFORE evaluating is safe by arithmetic; the reader who "remembers a sign convention" is one slip away from quoting $+\\tfrac{5}{2}$ for $\\log_{0.25} 32$ and losing the whole question. The platform\'s discipline is the same in prose as in figures: write the primes, compute the ratio, let the sign fall out.' },

    // ==================================================== the change of base
    { kind: 'heading', text: 'The Change of Base' },
    { kind: 'para', text: 'Everything so far keeps one base throughout a computation. But the working world is multi-base: a printed table of common logarithms speaks only base ten, a scientist\'s routine speaks base $e$, and a competition problem may hand over $\\log_2 5$ and expect a value. The change-of-base law is the currency exchange of the subject — any logarithm, at any base, is convertible into a ratio of two logarithms at any OTHER base — and its corollary, the reciprocal law, turns out to be one of the most productive comparison instruments in the whole chapter. Both are derived below, the cross-base identity joins them, and the fold of examples that closes the section is built entirely on the reciprocal route.' },
    { kind: 'derivation', title: 'The change-of-base law', statement: 'For $m > 0$ and legal bases $a, b$ (each positive, each different from $1$): $\\log_a m = \\tfrac{\\log_b m}{\\log_b a}$ — any base serves.', steps: [
      { label: 'Name the exponent', formula: 'p = \\log_a m \\;\\text{ says}\\; a^p = m', explanation: 'The definition pair at base $a$: write the wanted logarithm as the exponent $p$ that builds $m$ out of $a$.' },
      { label: 'Take log_b of both sides', formula: '\\log_b\\!\\left(a^p\\right) = \\log_b m', explanation: 'The step this derivation exists to exhibit: apply a logarithm at a THIRD base to both sides of an equality between positive numbers. Both sides are positive ($a^p = m > 0$), so the operation is legal; and a function is a machine — equal inputs give equal outputs.' },
      { label: 'Power law on the left', formula: 'p \\cdot \\log_b a = \\log_b m', explanation: 'The power law of this lesson, run at base $b$: the exponent $p$ comes down in front. The equation has become LINEAR in the unknown $p$ — which is the entire trick.' },
      { label: 'Divide', formula: 'p = \\frac{\\log_b m}{\\log_b a}, \\quad\\text{that is,}\\quad \\log_a m = \\frac{\\log_b m}{\\log_b a}', explanation: 'The division is legal because $\\log_b a \\neq 0$ (a legal base $b$ with $a \\neq 1$). The wanted logarithm at base $a$ is a RATIO of two logarithms at the base $b$ — chosen freely by the solver.' },
      { label: 'Corollary — the reciprocal law', formula: '\\log_a m = \\frac{\\log_m m}{\\log_m a} = \\frac{1}{\\log_m a}', explanation: 'Set $b = m$ (legal whenever $m > 0$ with $m \\neq 1$): the numerator becomes the anchor $\\log_m m = 1$, and the law collapses. Multiplying across gives $\\log_a m \\cdot \\log_m a = 1$ — a base-dual pair always annihilates.' },
    ], result: 'For $m > 0$ and legal $a, b$: $\\log_a m = \\tfrac{\\log_b m}{\\log_b a}$, and in particular (setting $b = m$, with $m \\neq 1$): $\\log_a m = \\tfrac{1}{\\log_m a}$, equivalently $\\log_a m \\cdot \\log_m a = 1$.' },
    { kind: 'equation', latex: '\\log_a m = \\frac{\\log_b m}{\\log_b a} \\tag{3}', note: 'the change-of-base law: every logarithm is a ratio of two logarithms at any fixed legal base $b$. Any base serves — the engine checks the law on 36 witness triples and finds $\\log_2 5$ identical whether computed at base $10$, at base $e$ or at base $3$, to $10^{-12}$.' },
    { kind: 'equation', latex: '\\log_a m = \\frac{1}{\\log_m a} \\qquad \\text{equivalently} \\qquad \\log_a m \\cdot \\log_m a = 1 \\tag{4}', note: 'the reciprocal law — equation (3) at $b = m$: flipping the base and the argument flips the value. Witness pair: $\\log_2 8 = 3$ and $\\log_8 2 = \\tfrac{1}{3}$, product $1$; the fold of examples below is built on this flip.' },
    { kind: 'para', text: 'The reciprocal law reads aloud as a sentence worth saying twice: the logarithm of $m$ at base $a$ is the reciprocal of the logarithm of $a$ at base $m$. It converts every "upside-down" logarithm — $1/\\log_2 n$, $1/\\log_3 n$, and so on — into an ordinary one by trading the base and the argument, and the example fold below is built entirely on that trade. It also explains a family favourite at once: $\\log_a b \\cdot \\log_b c \\cdot \\log_c a = 1$, the CYCLE law — a three-fold product in which every numerator and denominator cancels (it is proved as an L4 exercise below, with the three-arrow figure, and the engine pins it at $1$ to $10^{-12}$ on the witnesses $(2, 3, 5)$ and $(3, 5, 7)$).' },
    { kind: 'derivation', title: 'The cross-base identity', statement: 'For positive $a, c$ (each different from $1$) and legal base $b$: $a^{\\log_b c} = c^{\\log_b a}$ — inside a power, the base and the exponent may trade places.', steps: [
      { label: 'Take log_b of the left side', formula: '\\log_b\\!\\left(a^{\\log_b c}\\right) = \\log_b c \\cdot \\log_b a', explanation: 'Apply the power law at base $b$ to the left-hand candidate: the exponent $\\log_b c$ comes down in front, multiplying the logarithm of the base $a$.' },
      { label: 'Take log_b of the right side', formula: '\\log_b\\!\\left(c^{\\log_b a}\\right) = \\log_b a \\cdot \\log_b c', explanation: 'The same move on the right-hand candidate: the exponent $\\log_b a$ comes down in front. Multiplication commutes, so the two results are the SAME number.' },
      { label: 'One-one machine', formula: '\\log_b u = \\log_b v \\;\\Longrightarrow\\; u = v', explanation: 'The logarithm at the legal base $b$ is a one-one machine — it is the undo of a monotone exponential (lesson 9.2), so equal outputs certify equal inputs. Both sides of the claimed identity have the same $\\log_b$, hence the same value.' },
    ], result: 'For $a, c > 0$ (each $\\neq 1$) and legal $b$: $a^{\\log_b c} = c^{\\log_b a}$. Engine witness at $(a, b, c) = (2, 3, 5)$: both sides equal $2.7606$ to four decimals, difference below $10^{-15}$; a second witness $(7, 2, 11)$ agrees to $10^{-9}$.' },
    { kind: 'example', title: 'Compute $\\log_2 5$ — the common-logarithm route', steps: [
      'Setup: $5$ is not a power of $2$, so no definition read exists; the change-of-base law converts the question into common logarithms — the currency the printed tables speak.',
      'Change base to ten: $\\log_2 5 = \\tfrac{\\log 5}{\\log 2}$ — one application of equation (3) with $a = 2$, $b = 10$, $m = 5$.',
      'Now, the engine value: $\\log 5/\\log 2 = 2.321928094887362\\ldots$, so $\\log_2 5 = 2.321928095$ to nine decimal places — the engine\'s pinned token is $2.32192809$.',
      'Any base serves: the same value comes from $\\ln 5/\\ln 2$, from $\\log_3 5/\\log_3 2$, from $\\log_7 5/\\log_7 2$ — the engine confirms all routes agree to $10^{-12}$. The choice of $b$ is convenience, never content.',
      'Hence $\\log_2 5 = 2.321928095$ — and the check $2^{\\log_2 5} = 5$ closes the loop through the first inverse identity of lesson 9.2.',
    ] },
    { kind: 'para', text: 'This is the one place in the chapter where a decimal table genuinely earns its keep, and it is worth being honest about what the route does and does not give. The law does NOT make $\\log_2 5$ rational or tidy — the value is irrational, by the unique-factorisation argument of lesson 9.2 (no integers $p, q$ satisfy $2^p = 5^q$) — it only converts the question into the currency in which tables and machines speak. What the platform\'s discipline adds on top: the decimal above is not from a table but recomputed by the verify-first engine, to the twelfth decimal, before this sentence was written; every other decimal in the lesson carries the same guarantee.' },
    { kind: 'callout', tone: 'historical', title: 'The currency of bases', text: 'When Henry Briggs rebuilt Napier\'s tables at base ten (Arithmetica Logarithmica, 1624), a logarithm became something a working astronom could look up in one column and use in the next — and the practice of converting between bases is as old as the tables themselves. Natural (base-$e$) logarithms arrived with Nicholas Mercator\'s series of 1668 and became the standard of the calculus; decadic logarithms ran navigation and astronomy; and every conversion between the two was, and is, an application of the ratio $\\log_a m = \\log_b m/\\log_b a$. The formula is the permanent algebraic form of a craft the tables\' world performed daily by hand — and the slide rule, two scales slid against each other, was the same ratio worn as brass.' },
    { kind: 'example', title: 'The chain telescoping showcase: evaluate $(\\log_3 4)(\\log_4 5)(\\log_5 6)(\\log_6 7)(\\log_7 8)(\\log_8 9)$', steps: [
      'Setup: six factors at six different bases — no single-base law applies directly. The route: write EVERY factor as a ratio of logarithms at one common base (any base serves; base ten is customary).',
      'Expand: the chain is $\\tfrac{\\log 4}{\\log 3} \\cdot \\tfrac{\\log 5}{\\log 4} \\cdot \\tfrac{\\log 6}{\\log 5} \\cdot \\tfrac{\\log 7}{\\log 6} \\cdot \\tfrac{\\log 8}{\\log 7} \\cdot \\tfrac{\\log 9}{\\log 8}$ — six fractions, one currency.',
      'Cancel pairwise: each interior $\\log 4, \\log 5, \\log 6, \\log 7, \\log 8$ appears exactly once upstairs and exactly once downstairs — five cancellations, drawn one by one in the figure below.',
      'Now, the survivors: the numerator $\\log 9$ of the last factor and the denominator $\\log 3$ of the first remain standing, so the product is $\\tfrac{\\log 9}{\\log 3} = \\log_3 9$.',
      'Read off: $9 = 3^2$, so $\\log_3 9 = 2$. Engine: the six-factor product equals $2$ exactly, to $10^{-12}$.',
      'Hence the chain telescopes to $2$ — every interior base and argument vanished, and only the first base and the last argument survived to tell the tale.',
    ] },
    { kind: 'figure', caption: 'The telescoping chain. The six factors $(\\log_3 4)(\\log_4 5)(\\log_5 6)(\\log_6 7)(\\log_7 8)(\\log_8 9)$ sit in boxes, each expanded underneath as the fraction $\\log(k+1)/\\log k$ at one common base. The five interior labels $\\log 4, \\log 5, \\log 6, \\log 7, \\log 8$ each carry a strike mark and a dashed amber arc joining it to its twin: each appears once upstairs and once downstairs, so each cancels. The two survivors — $\\log 9$ upstairs and $\\log 3$ downstairs — are highlighted in orange, and the chain collapses to $\\log 9/\\log 3 = \\log_3 9 = 2$, the engine\'s exact value.', svg: telescopingChain93Svg() },
    { kind: 'para', text: 'The telescoping structure deserves its general statement, because examination chains are always instances of it. In a product $\\log_{k_1} k_2 \\cdot \\log_{k_2} k_3 \\cdots \\log_{k_{n-1}} k_n$, write each factor as $\\log k_{i+1}/\\log k_i$ at any fixed base: every interior $\\log k_i$ cancels against its neighbour, and the product collapses to $\\log_{k_1} k_n$ — first base, last argument, everything between gone. The L6 exercise below proves it in general and the engine verifies it for every $n$ from $2$ to $20$; the four-factor chain $(\\log_2 3)(\\log_3 4)(\\log_4 5)(\\log_5 6) = \\log_2 6$ is the same collapse one step shorter, engine-pinned at $2.5849625$, and the three-factor $\\log_4 5 \\cdot \\log_5 6 \\cdot \\log_6 7 = \\log_4 7$ shorter again at $1.4036775$.' },

    // ============================== FOLD 2: the reciprocal-law family
    { kind: 'para', text: 'The reciprocal law is more than a pretty identity: it is a COMPARISON INSTRUMENT, and the fold of examples that follows — the fold the syllabus calls the reciprocal of a logarithm — runs the same engine every time. The engine has two strokes: flip one or both logarithms by the reciprocal law, so that the flipped pair is easy to compare (same argument, or same base after one more flip); then flip the conclusion back, remembering that reciprocals reverse the order of positive numbers. Two illustrations and a companion pair follow, all engine-pinned to seven decimals where decimals appear at all.' },
    { kind: 'example', title: 'Which is greater: $\\log_3 5$ or $\\log_{17} 25$ — decided by the reciprocal route', steps: [
      'Setup: name them $x = \\log_3 5$ and $y = \\log_{17} 25$; both are positive (bases and arguments above $1$). The bases differ and the arguments differ, so no direct comparison exists — run the reciprocal route instead.',
      'Flip both by the reciprocal law: $\\tfrac{1}{x} = \\log_5 3$ and $\\tfrac{1}{y} = \\log_{25} 17$ — each upside-down value is an ordinary logarithm with base and argument traded.',
      'Now, put both on one dial: $\\tfrac{1}{x} = \\log_5 3 = \\log_5\\!\\left(\\sqrt{9}\\right) = \\tfrac{1}{2}\\log_5 9$ (power law, $9 = 3^2$), while $\\tfrac{1}{y} = \\log_{25} 17 = \\tfrac{1}{2}\\log_5 17$ (base law, $25 = 5^2$). Both reciprocals are now half-logarithms at the SAME base $5$.',
      'Compare at base 5: $\\log_5 17 > \\log_5 9$ (the base $5 > 1$ is increasing and $17 > 9$), so $\\tfrac{1}{y} > \\tfrac{1}{x}$ — with engine values $1.7603744 > 1.3652124$, that is $0.8801872 > 0.6826062$ after the halving.',
      'Flip back: $x, y > 0$ and reciprocals reverse the order of positives, so $\\tfrac{1}{y} > \\tfrac{1}{x}$ forces $x > y$ — the conclusion runs BACKWARDS through the flip.',
      'Hence $\\log_3 5 > \\log_{17} 25$: the engine values $x = 1.4649735$ and $y = 1.1361219$ confirm the verdict, and the figure below draws the flip that produced it.',
    ] },
    { kind: 'figure', caption: 'The reciprocal flip. Above, the number line of values: $x = \\log_3 5 = 1.4650$ (green dot) sits to the RIGHT of $y = \\log_{17} 25 = 1.1361$ (amber dot) — $x > y$. Below, the number line of reciprocals, on its own scale: $1/x = \\log_5 3 = 0.6826$ now sits LEFT of $1/y = \\log_{25} 17 = 0.8802$ — $1/x < 1/y$. The two dashed orange arrows, one per value to its own reciprocal, cross in the middle: that crossing IS the order reversal, and it is the whole content of the reciprocal route. All four dot positions are computed inside the figure from the engine-pinned values $1.4649735$, $1.1361219$, $0.6826062$, $0.8801872$.', svg: reciprocalFlip93Svg() },
    { kind: 'para', text: 'The figure makes the general principle visible: the map $t \\mapsto 1/t$ is strictly decreasing on the positive half-line, so any comparison between positive numbers can be run on their reciprocals with the conclusion reversed. The craft is at its best exactly when the reciprocals are EASY — same argument, or same base after one flip — while the originals are unreadable. That is the pattern to hunt for in an examination: here the reciprocals $\\log_5 3$ and $\\log_{25} 17$ both collapsed to half-logarithms at base $5$, where the increasing family compares them at sight; the L4 exercise below repeats the pattern on $\\log_7 11$ versus $\\log_{11} 17$, where the engine\'s pinned decimals do the same work.' },
    { kind: 'example', title: 'Sum $\\tfrac{1}{\\log_2 n} + \\tfrac{1}{\\log_3 n} + \\tfrac{1}{\\log_5 n} + \\tfrac{1}{\\log_7 n}$ for $n > 1$ — the reciprocal route over four primes', steps: [
      'Setup: every term is the RECIPROCAL of a logarithm of the same number $n$, at a different prime base each time — exactly the shape the reciprocal law exists to flip.',
      'Flip each term: $\\tfrac{1}{\\log_2 n} = \\log_n 2$, $\\tfrac{1}{\\log_3 n} = \\log_n 3$, $\\tfrac{1}{\\log_5 n} = \\log_n 5$ and $\\tfrac{1}{\\log_7 n} = \\log_n 7$ — four upside-down logarithms become four ordinary logarithms, all at the common base $n$.',
      'Fuse by the product law: the sum is $\\log_n 2 + \\log_n 3 + \\log_n 5 + \\log_n 7 = \\log_n(2 \\cdot 3 \\cdot 5 \\cdot 7)$ — the finite-product extension of the product law doing one step\'s work.',
      'Multiply out: $2 \\cdot 3 \\cdot 5 \\cdot 7 = 210$ — the product of the first four primes, engine-exact — so the sum is $\\log_n 210$.',
      'Hence $\\tfrac{1}{\\log_2 n} + \\tfrac{1}{\\log_3 n} + \\tfrac{1}{\\log_5 n} + \\tfrac{1}{\\log_7 n} = \\log_n 210 = \\tfrac{1}{\\log_{210} n}$ — one last flip by the reciprocal law, if the upside-down form is wanted. Engine: verified at $n = 5$, $n = 10$ and $n = e$ to $10^{-9}$.',
    ] },
    { kind: 'para', text: 'The shape generalises without effort: for any list of bases $b_1, \\ldots, b_k$ (each positive, each $\\neq 1$, each $\\neq n$), the same two moves give $\\sum_i 1/\\log_{b_i} n = \\log_n(b_1 b_2 \\cdots b_k)$. The L5 exercise runs it on the primes $2, 3, 7$ — one prime lighter, landing at $1/\\log_{42} n$ — and the L3 exercise cashes the smallest instance of the family, $\\log_5 3 \\times \\log_3 25 = 2$, with its own solution figure. In every one of them the reciprocal law does the flipping and the product law merely fuses what the flip produced; the engine verifies each landing value before the prose quotes it.' },
    { kind: 'example', title: 'The base-dual pair: evaluate $\\log_6 16 \\times \\log_{16} 6$ by the reciprocal law', steps: [
      'Setup: the two factors are base-duals — each is the other with the base and the argument traded — which is precisely the pair the reciprocal law governs.',
      'Flip: $\\log_6 16 = \\tfrac{1}{\\log_{16} 6}$ by the reciprocal law (equation (4) with $a = 6$, $m = 16$).',
      'Multiply: the product is $\\tfrac{1}{\\log_{16} 6} \\cdot \\log_{16} 6 = 1$ — the pair annihilates itself.',
      'Hence $\\log_6 16 \\times \\log_{16} 6 = 1$ — the engine pins it exactly, and the same one-line argument gives $\\log_a m \\times \\log_m a = 1$ for every legal dual pair, which is equation (4) restated as a product.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The law-band of this lesson is the highest-frequency toolkit in JEE Main / state-board logarithm items: telescoping products ("evaluate $\\log_3 4 \\cdot \\log_4 5 \\cdots$" — write every factor as a ratio of logs and cancel), reciprocal comparisons ("which is greater" — flip both, compare the easy flips, reverse the conclusion), prime-reciprocal sums ("$1/\\log_2 n + 1/\\log_3 n + \\cdots$" — flip, fuse, multiply out the primes) and base-law reads ("$\\log_{2\\sqrt{3}} 1728$" — primes on both sides, match exponents). The marks are lost in the details: fusing sums across DIFFERENT bases, forgetting the $m > 0$ domain, or quoting $\\log_a(m+n) = \\log_a m + \\log_a n$ — a law that does not exist. The items in this lesson are exam-style designs of ours, labelled honestly — never lifted from any paper.' },

    // ====================================================== the doorstep
    { kind: 'heading', text: "The Chapter's Doorstep" },
    { kind: 'para', text: 'The chapter now owns its algebra. Lesson 9.1 built the exponential family over every real index; lesson 9.2 built its undo and the two inverse identities; this lesson built the LAWS of the undo — three cardinal laws, the base law, the change-of-base law and the reciprocal corollary — each derived, never memorised. What remains is the reason the laws exist: EQUATIONS. A statement such as $2^x = 5$ was beyond the definition pair; with the change-of-base law it reads $x = \\log_2 5 = 2.321928095$, and the whole family of exponential and logarithmic equations falls to the laws banked here. That is lesson 9.4\'s work — solving exponent equations by taking logarithms of both sides, solving logarithmic equations by fusing laws, and the domain discipline that keeps extraneous roots out of the final answer — and this lesson ends at its doorstep with the toolkit complete.' },
    { kind: 'para', text: 'From the above discussion, it follows that:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the product law $\\log_a(mn) = \\log_a m + \\log_a n$ for $m, n > 0$ — mirroring $a^x a^y = a^{x+y}$; witness $\\log_{10} 2 + \\log_{10} 5 = 1$.',
      '(ii) the quotient law $\\log_a\\!\\left(\\tfrac{m}{n}\\right) = \\log_a m - \\log_a n$ — mirroring $a^x/a^y = a^{x-y}$; witness $\\log_2 48 - \\log_2 3 = 4$.',
      '(iii) the power law $\\log_a(m^b) = b\\,\\log_a m$ for every real $b$ — mirroring $(a^x)^b = a^{xb}$; witness $\\log_6 216 = 3$.',
      '(iv) the base law $\\log_{a^b} m = \\tfrac{1}{b}\\log_a m$, combined form $\\log_{a^b}(m^c) = \\tfrac{c}{b}\\log_a m$ — mirroring $(a^b)^t = a^{bt}$; the sign case $b = -1$ is the base-symmetry law of lesson 9.2, and $\\log_{2\\sqrt{3}} 1728 = 6$ is the classic witness.',
      '(v) the change-of-base law $\\log_a m = \\tfrac{\\log_b m}{\\log_b a}$ — any base serves; witness $\\log_2 5 = \\log 5/\\log 2 = 2.321928095$.',
      '(vi) the reciprocal law $\\log_a m = \\tfrac{1}{\\log_m a}$, so $\\log_a m \\cdot \\log_m a = 1$ — reciprocals reverse the order of positive logarithm values, the comparison instrument; witness $\\log_6 16 \\times \\log_{16} 6 = 1$.',
      '(vii) the cross-base identity $a^{\\log_b c} = c^{\\log_b a}$, with the cycle law $\\log_a b \\cdot \\log_b c \\cdot \\log_c a = 1$ as its three-fold companion.',
      '(viii) the telescoping collapse $\\log_{k_1} k_2 \\cdots \\log_{k_{n-1}} k_n = \\log_{k_1} k_n$ — first base, last argument, everything between cancels; witness the six-factor chain equalling $2$.',
    ] },
    { kind: 'formula', name: 'The product law', latex: '\\log_a(mn) = \\log_a m + \\log_a n \\quad (m, n > 0)', note: 'mirrors $a^x a^y = a^{x+y}$; witness: $\\log_{10} 2 + \\log_{10} 5 = \\log_{10} 10 = 1$.' },
    { kind: 'formula', name: 'The quotient law', latex: '\\log_a\\!\\left(\\tfrac{m}{n}\\right) = \\log_a m - \\log_a n \\quad (m, n > 0)', note: 'mirrors $a^x/a^y = a^{x-y}$; witness: $\\log_2 48 - \\log_2 3 = \\log_2 16 = 4$.' },
    { kind: 'formula', name: 'The power law', latex: '\\log_a(m^b) = b\\,\\log_a m \\quad (m > 0,\\; b \\in \\mathbb{R})', note: 'mirrors $(a^x)^b = a^{xb}$ for every real $b$ — the widest of the three cardinal laws.' },
    { kind: 'formula', name: 'The base law', latex: '\\log_{a^b} m = \\tfrac{1}{b}\\,\\log_a m \\qquad \\log_{a^b}\\!\\left(m^c\\right) = \\tfrac{c}{b}\\,\\log_a m', note: 'mirrors $(a^b)^t = a^{bt}$; witness: $\\log_{2\\sqrt{3}} 1728 = 6$, for $(2\\sqrt{3})^6 = 2^6 3^3 = 1728$.' },
    { kind: 'formula', name: 'The change-of-base law', latex: '\\log_a m = \\frac{\\log_b m}{\\log_b a}', note: 'any base serves; witness: $\\log_2 5 = \\log 5/\\log 2 = 2.321928095$.' },
    { kind: 'formula', name: 'The reciprocal law', latex: '\\log_a m = \\frac{1}{\\log_m a} \\quad (a, m > 0,\\; a, m \\neq 1)', note: 'the change-of-base law at $b = m$; witness: $\\log_6 16 \\times \\log_{16} 6 = 1$.' },

    // ================================================================ the quiz
    { kind: 'quiz', title: 'Check yourself: the laws of logarithms and the change of base', items: [
      { q: '$\\log_a(mn)$ equals', options: ['$\\log_a m \\cdot \\log_a n$', '$\\log_a m + \\log_a n$', '$\\log_a(m + n)$', '$\\log_{a+a} m$'], answer: 1, explain: 'Option 1 is the product law, derived above from $a^x a^y = a^{x+y}$: a multiplication INSIDE the argument becomes an addition OUTSIDE — witness $\\log_2 2 + \\log_2 3 = \\log_2 6$. Option 0 multiplies the two logarithms instead of adding them: at $a = 2$, $m = 2$, $n = 3$ it would give $1 \\cdot 1.5850 = 1.5850$, but $\\log_2 6 = 2.5850$ — products of logarithms are not logarithms of products. Option 2 splits a SUM, which no law does: $\\log_a(m + n)$ has no simplification in general ($\\log_2 5 \\neq \\log_2 2 + \\log_2 3$), and the law is about products precisely because exponents add under multiplication. Option 3 invents a new base $a + a = 2a$: the logarithm does not care that the argument happens to factor — $\\log_4 6 \\neq \\log_2 6$ — so the expression is not even equal in disguise.' },
      { q: '$\\log_{a^2} m$ equals', options: ['$2\\log_a m$', '$\\tfrac{1}{2}\\log_a m$', '$\\log_{2a} m$', '$(\\log_a m)^2$'], answer: 1, explain: 'Option 1 is the base law at $b = 2$: $\\log_{a^2} m = \\tfrac{1}{2}\\log_a m$ — squaring the base HALVES the logarithm; witness $\\log_9 27 = \\tfrac{3}{2} = \\tfrac{1}{2} \\cdot 3 = \\tfrac{1}{2}\\log_3 27$. Option 0 doubles instead of halving — that is the law for the base $\\sqrt{a}$ ($\\log_{\\sqrt{a}} m = 2\\log_a m$), and at the witness it would read $\\log_3 27 = 3$, which is the $\\log_9$ value doubled, not halved. Option 2 confuses squaring the base with doubling it: $\\log_{2a} m$ is a genuinely different, unsimplifiable logarithm — at $a = 3$, $m = 27$ it reads $\\log_6 27 = 1.8394$, nowhere near the wanted $1.5$. Option 3 squares the VALUE: $(\\log_3 27)^2 = 9$, four times the wanted $1.5$ — the base law moves the base\'s exponent into a DIVISOR, never into an exponent on the answer.' },
      { q: '$\\log_3 4 \\cdot \\log_4 5 \\cdot \\log_5 6 \\cdot \\log_6 7$ equals', options: ['$\\log_3 7$', '$\\log_7 3$', '$1$', '$\\log_3 7 + \\log_7 3$'], answer: 0, explain: 'Option 0 is the telescoping collapse: write each factor as a ratio of logs at any common base — $\\tfrac{\\log 4}{\\log 3} \\cdot \\tfrac{\\log 5}{\\log 4} \\cdot \\tfrac{\\log 6}{\\log 5} \\cdot \\tfrac{\\log 7}{\\log 6}$ — and every interior $\\log 4, \\log 5, \\log 6$ cancels once upstairs and once downstairs, leaving $\\tfrac{\\log 7}{\\log 3} = \\log_3 7$ (engine: $1.7712$ at four decimals). Option 1 is the answer upside down: $\\log_7 3 = 0.5646$ is its reciprocal — the survivors were $\\log 7$ over $\\log 3$, not $\\log 3$ over $\\log 7$. Option 2 would need the chain to RETURN to its starting base, as the two-factor $\\log_3 4 \\cdot \\log_4 3 = 1$ does; this chain climbs $3 \\to 4 \\to 5 \\to 6 \\to 7$ and ends away from home, so the product is $1.7712$, not $1$. Option 3 adds the answer to its own reciprocal: $1.7712 + 0.5646 = 2.3358$, a sum which for any positive value and its reciprocal is at least $2$ — so it can never equal the answer itself.' },
      { q: 'By the reciprocal law, $\\tfrac{1}{\\log_2 n} + \\tfrac{1}{\\log_4 n}$ equals', options: ['$\\log_n 2 + \\log_n 4 = 3\\log_n 2 = \\log_n 8$', '$\\log_8 n$', '$\\log_n 4 - \\log_n 2$', '$\\tfrac{3}{\\log_8 n}$'], answer: 0, explain: 'Option 0 is the reciprocal route run end to end: flip each term ($\\tfrac{1}{\\log_2 n} = \\log_n 2$ and $\\tfrac{1}{\\log_4 n} = \\log_n 4$ — and $\\log_n 4 = 2\\log_n 2$ by the power law, since $4 = 2^2$), then fuse by the product law: $\\log_n 2 + \\log_n 4 = \\log_n(2 \\cdot 4) = \\log_n 8$, which is also $3\\log_n 2$ since $8 = 2^3$. Witness at $n = 10$: $0.3010 + 0.6021 = 0.9031 = \\log_{10} 8$. Option 1 is the whole answer flipped: $\\log_8 n = 1/\\log_n 8$ by the reciprocal law, so it equals the RECIPROCAL of the correct value — at $n = 10$ it reads $1.1073$, not $0.9031$. Option 2 subtracts where the route adds: $\\log_n 4 - \\log_n 2 = \\log_n 2$ by the quotient law — the logarithm of $2$, one third of the wanted $\\log_n 8$. Option 3 writes $\\tfrac{3}{\\log_8 n} = 3\\log_n 8$ — TRIPLE the correct value (at $n = 10$: $2.7093$), relocating the factor $3$ that belongs in $3\\log_n 2$ onto the whole sum.' },
      { q: '$\\log_{2\\sqrt{3}} 1728$ equals', options: ['4', '5', '6', '8'], answer: 2, explain: 'Option 2 is the classic three-move read. Write base and argument as products of primes: $2\\sqrt{3} = 2 \\cdot 3^{1/2}$ and $1728 = 2^6 \\cdot 3^3$ (check by multiplying back: $64 \\cdot 27 = 1728$). Then $(2\\sqrt{3})^6 = 2^6 \\cdot \\left(3^{1/2}\\right)^6 = 2^6 \\cdot 3^3 = 1728$, so the exponent that builds $1728$ out of $2\\sqrt{3}$ is $6$ — engine-exact, both by the integer route and the floating route. Option 0 matches only the $2$-exponent: $(2\\sqrt{3})^4 = 2^4 \\cdot 3^2 = 144$, a twelfth of the target. Option 1 is not even whole: $(2\\sqrt{3})^5 = 2^5 \\cdot 3^{5/2} \\approx 498.8$. Option 3 overshoots: $(2\\sqrt{3})^8 = 2^8 \\cdot 3^4 = 20736$, twelve times the target — the exponent $8$ belongs to the prime $2$ alone, not to the product base.' },
    ] },

    // ============================================================ exercises
    { kind: 'exercises', title: 'Exercises 9.3', sets: [
      { level: 'L1', questions: [
        { q: 'Evaluate $\\log_{10} 4 + \\log_{10} 25$.', solution: [
          'Fuse by the product law: the two terms share the base $10$, so $\\log_{10} 4 + \\log_{10} 25 = \\log_{10}(4 \\cdot 25)$.',
          'So, multiply inside: $4 \\cdot 25 = 100$.',
          'Now, read off: $100 = 10^2$, so $\\log_{10} 100 = 2$ — the engine confirms the value exactly, with $4 \\cdot 25 = 100$ as integers.',
          'Hence $\\log_{10} 4 + \\log_{10} 25 = 2$.',
        ], answer: '2' },
        { q: 'Evaluate $\\log_2 96 - \\log_2 3$.', solution: [
          'Fuse by the quotient law: same base $2$, so the difference is $\\log_2\\!\\left(\\tfrac{96}{3}\\right)$.',
          'So, divide inside: $96/3 = 32$.',
          'Now, read off: $32 = 2^5$, so $\\log_2 32 = 5$ — the engine verifies $\\log_2 96 - \\log_2 3 = 5$ exactly.',
          'Hence $\\log_2 96 - \\log_2 3 = 5$.',
        ], answer: '5' },
        { q: 'Evaluate $\\log_4 8$ by the base law, and check the read against the definition pair.', solution: [
          'The base law with $b = 2$: $4 = 2^2$, so $\\log_4 8 = \\tfrac{1}{2}\\log_2 8$.',
          'So, the inner read: $8 = 2^3$, hence $\\log_2 8 = 3$.',
          'Now, halve: $\\tfrac{1}{2} \\cdot 3 = \\tfrac{3}{2}$.',
          'Check against the definition pair: $4^{3/2} = (\\sqrt{4})^3 = 2^3 = 8$ — the exponent $\\tfrac{3}{2}$ indeed builds $8$ out of $4$.',
          'Hence $\\log_4 8 = \\tfrac{3}{2}$.',
        ], answer: '3/2' },
      ] },
      { level: 'L2', questions: [
        { q: 'Evaluate $\\log_{2\\sqrt{2}} 128$.', solution: [
          'Write base and argument as powers of the prime $2$: $2\\sqrt{2} = 2^{3/2}$ (for $\\sqrt{2} = 2^{1/2}$) and $128 = 2^7$.',
          'So, the combined base law: $\\log_{2^{3/2}}\\!\\left(2^7\\right) = \\tfrac{7}{3/2} = \\tfrac{14}{3}$ — the ratio of the exponents.',
          'Now, check: $\\left(2^{3/2}\\right)^{14/3} = 2^{(3/2)(14/3)} = 2^7 = 128$ — the definition pair confirms the read, and the engine pins $\\tfrac{14}{3}$ (with $2\\sqrt{2} = 2^{3/2}$ exact even in floating point).',
          'Hence $\\log_{2\\sqrt{2}} 128 = \\tfrac{14}{3}$.',
        ], answer: '14/3' },
        { q: 'Evaluate $\\log_{0.25} 32$.', solution: [
          'Write both as powers of $2$: $0.25 = \\tfrac{1}{4} = 2^{-2}$ and $32 = 2^5$.',
          'So, the combined base law: $\\log_{2^{-2}}\\!\\left(2^5\\right) = \\tfrac{5}{-2} = -\\tfrac{5}{2}$ — the negative exponent of the base lands as a minus, by construction rather than by convention.',
          'Now, cross-check by the base-symmetry route: $\\log_{0.25} 32 = -\\log_4 32 = -\\tfrac{5}{2}$ — the $b = -1$ case of the base law agrees with the general case, as it must.',
          'Check: $0.25^{-5/2} = 4^{5/2} = 2^5 = 32$ — the engine pins $-2.5$ exactly.',
          'Hence $\\log_{0.25} 32 = -\\tfrac{5}{2}$.',
        ], answer: '−5/2' },
        { q: 'Evaluate the chain $(\\log_2 3)(\\log_3 4)(\\log_4 5)(\\log_5 6)$.', solution: [
          'Write each factor as a ratio of logs at one common base (base ten): the chain is $\\tfrac{\\log 3}{\\log 2} \\cdot \\tfrac{\\log 4}{\\log 3} \\cdot \\tfrac{\\log 5}{\\log 4} \\cdot \\tfrac{\\log 6}{\\log 5}$.',
          'So, cancel pairwise: every interior $\\log 3, \\log 4, \\log 5$ appears once on top and once below — three cancellations.',
          'Now, the survivors: $\\tfrac{\\log 6}{\\log 2} = \\log_2 6$ — first base, last argument.',
          'Hence the chain equals $\\log_2 6$; the engine pins the value $2.5849625$ at seven decimals (and the collapse itself to $10^{-12}$).',
        ], answer: 'log₂ 6 (= 2.5849625)' },
      ] },
      { level: 'L3', questions: [
        { q: 'Evaluate $\\log_5 3 \\cdot \\log_3 25$ — the third member of the reciprocal family, by the reciprocal law and the power law.', solution: [
          'Split the second factor by the power law: $25 = 5^2$, so $\\log_3 25 = 2\\,\\log_3 5$.',
          'So, the product becomes $\\log_5 3 \\cdot 2\\,\\log_3 5 = 2\\,\\left(\\log_5 3 \\cdot \\log_3 5\\right)$.',
          'Now, the reciprocal law: $\\log_5 3 \\cdot \\log_3 5 = 1$ — a base-dual pair annihilates — so the product is $2 \\cdot 1$.',
          'Hence $\\log_5 3 \\cdot \\log_3 25 = 2$ — the engine confirms it exactly; the solution figure draws the two-law machine.',
        ], answer: '2', figures: [
          { caption: 'The identity machine for $\\log_5 3 \\times \\log_3 25$: the reciprocal law rewrites the first factor as $1/\\log_3 5$, the power law rewrites the second as $2\\log_3 5$, and the reciprocal pair annihilates — the product is $2 \\times 1 = 2$.', svg: identityMachine93Svg() },
        ] },
        { q: 'Arrange $\\log_2 10$, $\\log_3 10$, $\\log_5 10$ and $\\log_7 10$ in decreasing order, by the reciprocal route (values to 4 dp).', solution: [
          'Take reciprocals by the reciprocal law: $1/\\log_2 10 = \\log_{10} 2 = 0.3010$, $1/\\log_3 10 = \\log_{10} 3 = 0.4771$, $1/\\log_5 10 = \\log_{10} 5 = 0.6990$ (equally $1 - 0.3010$, from the anchor $\\log 2 + \\log 5 = \\log 10 = 1$) and $1/\\log_7 10 = \\log_{10} 7 = 0.8451$.',
          'So, order the reciprocals: they increase $0.3010 < 0.4771 < 0.6990 < 0.8451$ as the base climbs $2 \\to 3 \\to 5 \\to 7$.',
          'Now, flip back: all four values are positive, and reciprocals reverse the order of positives — so the originals decrease in the OPPOSITE order: $\\log_2 10 > \\log_3 10 > \\log_5 10 > \\log_7 10$.',
          'Hence the decreasing order is $\\log_2 10 = 3.3219 > \\log_3 10 = 2.0959 > \\log_5 10 = 1.4307 > \\log_7 10 = 1.1833$ (engine, 4 dp) — the bigger base climbs less at the same argument: the family picture of lesson 9.2 turned into arithmetic. The solution figure draws the flip column by column.',
        ], answer: 'log₂ 10 = 3.3219 > log₃ 10 = 2.0959 > log₅ 10 = 1.4307 > log₇ 10 = 1.1833', figures: [
          { caption: 'The ordering flip: four columns, one per base $2, 3, 5, 7$ — the upper chips carry the values $\\log_b 10$ (falling as the base grows), the lower chips their reciprocals $\\log_{10} b$ (rising), joined by reciprocal arrows; the order reverses.', svg: orderingFlip93Svg() },
        ] },
        { q: 'Evaluate $\\log_4 5 \\cdot \\log_5 6 \\cdot \\log_6 7$.', solution: [
          'Write each factor as a ratio of logs at one common base: $\\tfrac{\\log 5}{\\log 4} \\cdot \\tfrac{\\log 6}{\\log 5} \\cdot \\tfrac{\\log 7}{\\log 6}$.',
          'So, cancel the interior $\\log 5$ and $\\log 6$ — each appears once upstairs and once downstairs.',
          'Now, the survivors: $\\tfrac{\\log 7}{\\log 4} = \\log_4 7$.',
          'Hence the chain equals $\\log_4 7$; the engine pins the value $1.4036775$ at seven decimals.',
        ], answer: 'log₄ 7 (= 1.4036775)' },
      ] },
      { level: 'L4', questions: [
        { q: 'Prove the cycle law $\\log_a b \\cdot \\log_b c \\cdot \\log_c a = 1$ (legal bases, positive arguments, $a$, $b$, $c$ distinct), and verify it on $(a, b, c) = (2, 3, 5)$.', solution: [
          'Write each factor as a ratio of logs at one common base (any base serves): $\\log_a b = \\tfrac{\\log b}{\\log a}$, $\\log_b c = \\tfrac{\\log c}{\\log b}$, $\\log_c a = \\tfrac{\\log a}{\\log c}$.',
          'So, multiply: the product is $\\tfrac{\\log b}{\\log a} \\cdot \\tfrac{\\log c}{\\log b} \\cdot \\tfrac{\\log a}{\\log c}$ — a three-storey fraction.',
          'Now, cancel: $\\log a$, $\\log b$ and $\\log c$ each appear exactly once on top and exactly once below — everything cancels, whatever the common base chosen.',
          'So, the product is $1$: a three-arrow cycle always closes. Verify on $(2, 3, 5)$: $\\log_2 3 \\cdot \\log_3 5 \\cdot \\log_5 2 = 1.5849625 \\times 1.4649735 \\times 0.4306766 = 1$, engine-pinned to $10^{-12}$ (and equally on $(3, 5, 7)$).',
          'Hence $\\log_a b \\cdot \\log_b c \\cdot \\log_c a = 1$ — the cycle law; the solution figure draws the three arrows and the centred cancellation.',
        ], answer: '1 (proved; witness log₂ 3 · log₃ 5 · log₅ 2 = 1.5849625 × 1.4649735 × 0.4306766 = 1)', figures: [
          { caption: 'The three-arrow cycle at the witness $(a, b, c) = (2, 3, 5)$: each edge carries its factor in both forms ($\\log_a b$ and $\\log b/\\log a$), and the centred product cancels to $1$ — every log appears once upstairs and once downstairs.', svg: cycleLaw93Svg() },
        ] },
        { q: 'Evaluate $\\log_6 216 + \\log_{36} 216$.', solution: [
          'First term: $216 = 6^3$, so the power law gives $\\log_6 216 = \\log_6(6^3) = 3\\,\\log_6 6 = 3$.',
          'So, second term: $36 = 6^2$, so the base law gives $\\log_{36} 216 = \\tfrac{1}{2}\\log_6 216 = \\tfrac{3}{2}$ — the squared base halves the logarithm of the same argument.',
          'Now, add: $3 + \\tfrac{3}{2} = \\tfrac{9}{2}$.',
          'Hence $\\log_6 216 + \\log_{36} 216 = \\tfrac{9}{2}$ — the engine pins $3$ and $1.5$ exactly, and the sum $4.5$.',
        ], answer: '9/2' },
        { q: 'Which is greater, $\\log_7 11$ or $\\log_{11} 17$? Decide by the reciprocal route (values to 7 dp).', solution: [
          'Name them: $x = \\log_7 11$ and $y = \\log_{11} 17$; both positive (bases and arguments above $1$), so the reciprocal route is legal.',
          'So, take reciprocals: $\\tfrac{1}{x} = \\log_{11} 7 = 0.8115076$ and $\\tfrac{1}{y} = \\log_{17} 11 = 0.8463518$ (engine, 7 dp).',
          'Now, compare the flips: $\\tfrac{1}{y} > \\tfrac{1}{x}$; reciprocals reverse the order of positives, so $x > y$ — the conclusion runs backwards through the flip, exactly as in the lesson\'s illustration.',
          'Hence $\\log_7 11 > \\log_{11} 17$: engine values $x = 1.2322744 > y = 1.1815417$ (7 dp) confirm the verdict. Note the engine\'s authority here — a spec-level guess of $1.1818$ for $\\log_{11} 17$ was corrected to the computed $1.1815417$ before this solution was written.',
        ], answer: 'log₇ 11 = 1.2322744 > log₁₁ 17 = 1.1815417' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove the cross-base identity $a^{\\log_b c} = c^{\\log_b a}$ (positive $a$, $c$, each $\\neq 1$; legal $b$), and use it to compare $2^{\\log_3 5}$ with $5^{\\log_3 2}$.', solution: [
          'Take $\\log_b$ of the left candidate: $\\log_b\\!\\left(a^{\\log_b c}\\right) = \\log_b c \\cdot \\log_b a$ — the power law pulls the exponent $\\log_b c$ down in front.',
          'So, take $\\log_b$ of the right candidate: $\\log_b\\!\\left(c^{\\log_b a}\\right) = \\log_b a \\cdot \\log_b c$ — the same move, and multiplication commutes, so the two logarithms are equal.',
          'Now, conclude: the logarithm at the legal base $b$ is one-one, so equal logarithms certify equal numbers: $a^{\\log_b c} = c^{\\log_b a}$ — proved.',
          'Apply at $(a, b, c) = (2, 3, 5)$: $2^{\\log_3 5} = 5^{\\log_3 2}$ — the two expressions are EQUAL, not merely close; the engine pins both at $2.7606$ (4 dp) with difference below $10^{-15}$.',
          'Hence the identity holds, and the pair $2^{\\log_3 5}$ and $5^{\\log_3 2}$ are the same number — the base and the exponent trade places inside a power without changing its value.',
        ], answer: 'proved; 2^{log₃ 5} = 5^{log₃ 2} ≈ 2.7606 (difference below 10⁻¹⁵)' },
        { q: 'Prove $\\tfrac{1}{\\log_2 n} + \\tfrac{1}{\\log_3 n} + \\tfrac{1}{\\log_7 n} = \\tfrac{1}{\\log_{42} n}$ for $n > 1$, and verify at $n = 5$ (values to 7 dp).', solution: [
          'Flip each term by the reciprocal law: $\\tfrac{1}{\\log_2 n} = \\log_n 2$, and likewise $\\log_n 3$ and $\\log_n 7$ — three upside-down logarithms become three ordinary ones at the common base $n$.',
          'So, fuse by the product law: $\\log_n 2 + \\log_n 3 + \\log_n 7 = \\log_n(2 \\cdot 3 \\cdot 7) = \\log_n 42$.',
          'Now, flip back once: $\\log_n 42 = \\tfrac{1}{\\log_{42} n}$ — the reciprocal law again, base and argument traded.',
          'Verify at $n = 5$: the left side is $\\log_5 2 + \\log_5 3 + \\log_5 7$, whose displayed 7-decimal values $0.4306766 + 0.6826062 + 1.2090620$ sum to $2.3223448$, while $\\log_5 42 = 2.3223447$ — the engine confirms the identity itself to $10^{-9}$; the last-digit difference is pure display rounding, not a failure of the law. Equally verified at $n = 10$.',
          'Hence the identity — the lesson\'s four-prime chain with one prime removed, and the engine\'s $2 \\cdot 3 \\cdot 7 = 42$ behind the final flip.',
        ], answer: 'proved; both sides equal log_n 42 = 1/log₄₂ n (at n = 5: 2.3223447)' },
        { q: 'Given $\\log_{10} 2 = 0.3010$ and $\\log_{10} 3 = 0.4771$ (4 dp), compute $\\log_{10} 12$ and $\\log_{10} 45$ from these two constants alone; then compare with the exact engine values.', solution: [
          'Factor the first argument: $12 = 2^2 \\cdot 3$, so $\\log_{10} 12 = 2\\,\\log_{10} 2 + \\log_{10} 3 = 2(0.3010) + 0.4771 = 0.6020 + 0.4771$.',
          'So, add: $\\log_{10} 12 = 1.0791$ — the constant-built value; the exact engine value is $1.0791812$, so the built answer is within $0.0001$ of the truth.',
          'Now, the second: $45 = 3^2 \\cdot 5$, and $\\log_{10} 5 = \\log_{10}\\!\\left(\\tfrac{10}{2}\\right) = 1 - 0.3010 = 0.6990$ — the product law plus the anchor $\\log 2 + \\log 5 = \\log 10 = 1$ manufacturing a third constant from the other two.',
          'So, $\\log_{10} 45 = 2(0.4771) + 0.6990 = 0.9542 + 0.6990 = 1.6532$; the exact engine value is $1.6532125$ — again within $0.0001$.',
          'Hence $\\log_{10} 12 = 1.0791$ and $\\log_{10} 45 = 1.6532$ from two constants — the product law, the power law and one anchor identity did all the work, and the engine\'s exact values quantify the rounding honestly.',
        ], answer: 'log₁₀ 12 = 1.0791 (exact 1.0791812); log₁₀ 45 = 1.6532 (exact 1.6532125)' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the reciprocal law $\\log_a m = 1/\\log_m a$ from the change-of-base law, and interpret the flip on the number line: why does the map $t \\mapsto 1/t$ reverse the order of positive logarithm values?', solution: [
          'Start from the change-of-base law with target base $m$ (legal for $m > 0$, $m \\neq 1$): $\\log_a m = \\tfrac{\\log_m m}{\\log_m a}$.',
          'So, the numerator is the anchor $\\log_m m = 1$, giving $\\log_a m = \\tfrac{1}{\\log_m a}$ — the reciprocal law, one move from change of base, and multiplying across gives $\\log_a m \\cdot \\log_m a = 1$.',
          'Now, the geometric reading: on the positive half-line the map $t \\mapsto 1/t$ is strictly DECREASING — for $0 < t_1 < t_2$ one has $\\tfrac{1}{t_1} > \\tfrac{1}{t_2}$ (cross-multiply the true inequality $t_1 < t_2$ by the positive product $t_1 t_2$) — so the image order is the reverse of the source order.',
          'So, comparing logarithms by comparing their reciprocals is comparing them in reversed order: witness $\\log_2 5 = 2.3219281 > \\log_3 5 = 1.4649735$ flips to $1/2.3219281 = 0.4306766 < 1/1.4649735 = 0.6826062$; and the lesson\'s illustration $\\log_3 5 = 1.4649735 > \\log_{17} 25 = 1.1361219$ flips to $0.6826062 < 0.8801872$ — both engine-pinned.',
          'Hence the reciprocal law is proved from change of base, and its order-flip corollary — reciprocals reverse, so a reciprocal comparison runs the conclusion backwards — is the entire comparison craft of the fold.',
        ], answer: 'proved from log_a m = log_m m / log_m a with log_m m = 1; the map t → 1/t is strictly decreasing on positives (cross-multiplication), so reciprocal comparison reverses order' },
        { q: 'Prove the general telescoping product $\\prod_{k=2}^{n} \\log_k(k+1) = \\log_2(n+1)$, and verify at $n = 9$.', solution: [
          'Write each factor as a ratio of logs at one common base (any base serves): $\\log_k(k+1) = \\tfrac{\\log(k+1)}{\\log k}$.',
          'So, multiply: the product is $\\tfrac{\\log 3}{\\log 2} \\cdot \\tfrac{\\log 4}{\\log 3} \\cdots \\tfrac{\\log(n+1)}{\\log n}$ — a ladder of $n - 1$ fractions.',
          'Now, cancel: each interior $\\log k$ for $k = 3, \\ldots, n$ appears once downstairs (from factor $k$) and once upstairs (from factor $k - 1$) — everything between the ends cancels.',
          'So, the survivors: numerator $\\log(n+1)$ from the last factor, denominator $\\log 2$ from the first: the product is $\\tfrac{\\log(n+1)}{\\log 2} = \\log_2(n+1)$ — first base, last argument.',
          'Verify at $n = 9$: the product $\\log_2 3 \\cdot \\log_3 4 \\cdots \\log_9 10$ telescopes to $\\log_2 10 = 3.3219281$ (engine, 7 dp; and the formula swept green for every $n = 2, \\ldots, 20$).',
          'Hence $\\prod_{k=2}^{n} \\log_k(k+1) = \\log_2(n+1)$ — the telescoping collapse in general form, with the lesson\'s six-factor chain as the instance at $n = 8$ (there shifted one base up, ending at $\\log_3 9 = 2$).',
        ], answer: '∏_{k=2}^{n} log_k(k+1) = log₂(n+1); at n = 9 the value is log₂ 10 = 3.3219281' },
      ] },
    ] },
  ],
}


// ------------------------------------------------------------------
// lesson 9.4 — run 121 (the whole-chapter swarm), integrated verbatim
// ------------------------------------------------------------------

/**
 * Advanced Algebra — lesson 9.4 "Logarithmic and Exponential Equations"
 * (authored by agent aa94 of the RUN 121 whole-chapter swarm, owner directive
 * "launch multiple authoring agents"; engine-first discipline: every number
 * below was recomputed and pinned by temporary-references/v-aa94.ts BEFORE
 * this prose was written — the G-sections of that verifier are the source of
 * every decimal quoted here, and its three SPEC CATCHES are folded into the
 * prose at the places they belong).
 *
 * PROVENANCE: the Cengage M1/01 equations-and-inequalities band scanned in
 * temporary-references (`cengage-m1-01`, printed 1.11–1.26: the domain-
 * discipline note, the log-equation Illustrations, the standard log
 * inequalities and the exercise archetypes — studied, never reproduced),
 * the Cengage presentation contract (`cengage-jee-style`), Hall & Knight
 * Higher Algebra (`hall-knight-higher-algebra`) and the JEE Main unit list
 * (`jee-main-2026-syllabus`). STUDY-NEVER-REPRODUCE absolute: every equation,
 * witness, figure, Illustration, quiz item and exercise is OUR OWN.
 */

// ----------------------------------------------------------------- figures
// The palette law (house contract): structure/axes #16a34a, primary labels
// #166534, mid values #65a30d, teal captions #0d9488 / #0f766e, connectors
// and ticks #d97706, accents and arrows #ea580c, refusals #dc2626, tints
// #fef3c7 / #ffedd5, white-on-fill #ffffff. No other hex appears. Every svg
// carries role="img" and a full aria-label; every coordinate is computed
// from the named constants inside the helper, and every marked value is
// engine-pinned by v-aa94.ts.

/** arrowhead polygon at (x, y) pointing along (ux, uy), size h. */
function head94(x: number, y: number, ux: number, uy: number, h: number, fill: string): string {
  const bx = x - ux * h
  const by = y - uy * h
  const ox = -uy * h * 0.45
  const oy = ux * h * 0.45
  return `<polygon points="${x},${y} ${bx + ox},${by + oy} ${bx - ox},${by - oy}" fill="${fill}"/>`
}

// ---------------------------------------------------------------- body fig 1
function extraneousCourt94Svg(): string {
  // THE EXTRANEOUS-ROOT COURT — the number line of log₁₀(2 − x) = 2 log₁₀(x + 1)
  // with the domain band (−1, 2) tinted between its teal walls, and the two
  // quadratic candidates dropped on it: (−3 + √13)/2 ≈ 0.3028 kept (green dot),
  // (−3 − √13)/2 ≈ −3.3028 refused (orange cross). Engine-pinned: G05.
  const NL = 120 // pixel y of the number line
  const XM = -5 // math window [XM, XMAX]
  const XMAX = 3
  const PX0 = 50 // pixel x of math XM
  const UX = 77.5 // px per math unit
  const px = (x: number) => PX0 + (x - XM) * UX
  const R1 = (-3 - Math.sqrt(13)) / 2 // −3.3027756… the extraneous root
  const R2 = (-3 + Math.sqrt(13)) / 2 // 0.3027756… the survivor
  const f = (n: number) => n.toFixed(1)
  let ticks = ''
  for (let k = XM; k <= XMAX; k++) {
    ticks += `<line x1="${f(px(k))}" y1="${NL - 5}" x2="${f(px(k))}" y2="${NL + 5}" stroke="#0f766e" stroke-width="1.5"/>`
    ticks += `<text x="${f(px(k))}" y="${NL + 20}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${k < 0 ? '−' + Math.abs(k) : k}</text>`
  }
  return `<svg viewBox="0 0 720 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The extraneous-root court on a number line from minus five to three. The domain band from minus one to two of the equation log base ten of two minus x equals two log base ten of x plus one is shaded amber between two teal domain walls labelled x equals minus one and x equals two. Two candidates from the quadratic x squared plus three x minus one equals zero are dropped on the line: the root minus three point three zero is drawn as an orange cross and labelled refused because x plus one is negative, sitting outside the band to the left; the root zero point three zero is drawn as a green dot inside the band and labelled kept because both terms are defined. The footer states that both candidates satisfy the squared equation two minus x equals x plus one squared, while only the one inside the band satisfies the original.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the extraneous-root court: the domain band admits one root and refuses the other</text>
  <text x="360" y="46" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">candidates of x² + 3x − 1 = 0 dropped on the number line of log₁₀(2 − x) = 2 log₁₀(x + 1)</text>
  <rect x="${f(px(-1))}" y="88" width="${f(px(2) - px(-1))}" height="46" rx="8" fill="#fef3c7"/>
  <text x="${f((px(-1) + px(2)) / 2)}" y="74" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the domain band (−1, 2)</text>
  <text x="${f(px(-1))}" y="74" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">x = −1</text>
  <text x="${f(px(2))}" y="74" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">x = 2</text>
  <line x1="${f(px(-1))}" y1="84" x2="${f(px(-1))}" y2="152" stroke="#0d9488" stroke-width="3.5"/>
  <line x1="${f(px(2))}" y1="84" x2="${f(px(2))}" y2="152" stroke="#0d9488" stroke-width="3.5"/>
  <line x1="${f(px(XM))}" y1="${NL}" x2="${f(px(XMAX))}" y2="${NL}" stroke="#16a34a" stroke-width="2.2"/>
  ${head94(px(XMAX), NL, 1, 0, 11, '#16a34a')}
  ${ticks}
  <line x1="${f(px(R1) - 8)}" y1="${NL - 8}" x2="${f(px(R1) + 8)}" y2="${NL + 8}" stroke="#dc2626" stroke-width="3"/>
  <line x1="${f(px(R1) + 8)}" y1="${NL - 8}" x2="${f(px(R1) - 8)}" y2="${NL + 8}" stroke="#dc2626" stroke-width="3"/>
  <text x="${f(px(R1))}" y="${NL - 14}" font-size="10" font-weight="700" fill="#dc2626" text-anchor="middle">x₁ = (−3 − √13)/2 ≈ −3.30</text>
  <text x="${f(px(R1))}" y="${NL + 38}" font-size="9.5" font-weight="700" fill="#dc2626" text-anchor="middle">refused — x + 1 &lt; 0</text>
  <circle cx="${f(px(R2))}" cy="${NL}" r="6.5" fill="#16a34a" stroke="#166534" stroke-width="1.6"/>
  <text x="${f(px(R2))}" y="${NL - 14}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">x₂ = (−3 + √13)/2 ≈ 0.30</text>
  <text x="${f(px(R2))}" y="${NL + 38}" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">kept — both terms defined</text>
  <text x="360" y="186" font-size="9.5" font-weight="700" text-anchor="middle" fill="#0f766e">both candidates satisfy the squared equation 2 − x = (x + 1)²; only the one inside the band satisfies the original</text>
</svg>`
}

// ---------------------------------------------------------------- body fig 2
function crossing94Svg(): string {
  // THE CROSSING — y = log₂(x + 2) (green) against y = 4 − x (amber), equal
  // scales (80 px per unit on both axes), one crossing at (2, 2); the dashed
  // spans mark the gap h at x = 1 (negative) and x = 3 (positive); the
  // asymptote x = −2 dashed. Engine-pinned: G09/G27.
  const U = 80 // px per math unit, BOTH axes
  const OX = 232 // pixel x of math x = 0
  const OY = 460 // pixel y of math y = 0
  const px = (x: number) => OX + x * U
  const py = (y: number) => OY - y * U
  const f = (n: number) => n.toFixed(1)
  const logPts: [number, number][] = []
  for (let x = -1.5; x <= 5.5001; x += 0.05) logPts.push([px(x), py(Math.log2(x + 2))])
  const linePts: [number, number][] = []
  for (let x = -0.4; x <= 4.4001; x += 0.1) linePts.push([px(x), py(4 - x)])
  const pathOf = (pts: [number, number][]) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${f(p[0])} ${f(p[1])}`).join(' ')
  let ticksX = ''
  for (const k of [-1, 0, 1, 2, 3, 4, 5]) {
    ticksX += `<line x1="${f(px(k))}" y1="${py(0) - 5}" x2="${f(px(k))}" y2="${py(0) + 5}" stroke="#0f766e" stroke-width="1.6"/>`
    ticksX += `<text x="${f(px(k))}" y="${py(0) + 20}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${k}</text>`
  }
  let ticksY = ''
  for (const k of [1, 2, 3, 4]) {
    ticksY += `<line x1="${px(0) - 5}" y1="${f(py(k))}" x2="${px(0) + 5}" y2="${f(py(k))}" stroke="#0f766e" stroke-width="1.6"/>`
    ticksY += `<text x="${px(0) - 12}" y="${f(py(k) + 4)}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">${k}</text>`
  }
  const gap = (x: number, y1: number, y2: number) => {
    const lo = Math.min(y1, y2)
    const hi = Math.max(y1, y2)
    return `<line x1="${f(px(x))}" y1="${f(py(lo) + 6)}" x2="${f(px(x))}" y2="${f(py(hi) - 6)}" stroke="#ea580c" stroke-width="2" stroke-dasharray="5 4"/>`
  }
  return `<svg viewBox="0 0 720 580" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The crossing of the logarithmic curve y equals log base two of x plus two, drawn green and rising, with the falling line y equals four minus x, drawn amber, on equal scales. They cross exactly once at the point two comma two, marked with an orange dot and the label two comma two, the one root. Dashed orange spans at x equals one and x equals three connect the curve and the line, measuring the gap h: at x equals one the curve sits below the line with h of one approximately minus one point four two, and at x equals three the curve sits above with h of three approximately plus one point three two. The vertical asymptote x equals minus two is dashed at the left, and the axes are ticked at the integers.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the crossing: y = log₂(x + 2) against y = 4 − x — one root at (2, 2)</text>
  <text x="360" y="44" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">both sides read 2 at x = 2; the strictly increasing sum h(x) = log₂(x + 2) + x − 4 caps the count at one</text>
  <line x1="${f(px(-2))}" y1="${f(py(4.5))}" x2="${f(px(-2))}" y2="${f(py(-1))}" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="6 4"/>
  <text x="${f(px(-2))}" y="92" font-size="9.5" font-weight="700" fill="#ea580c" text-anchor="middle">x = −2 (asymptote)</text>
  <line x1="${f(px(-2.4))}" y1="${f(py(0))}" x2="${f(px(5.5))}" y2="${f(py(0))}" stroke="#16a34a" stroke-width="2"/>
  ${head94(px(5.5), py(0), 1, 0, 11, '#16a34a')}
  <text x="${f(px(5.5) + 8)}" y="${f(py(0) - 6)}" font-size="11" font-weight="700" fill="#166534">x</text>
  <line x1="${f(px(0))}" y1="${f(py(4.5))}" x2="${f(px(0))}" y2="${f(py(-1))}" stroke="#16a34a" stroke-width="2"/>
  ${head94(px(0), py(4.5), 0, -1, 11, '#16a34a')}
  <text x="${f(px(0) + 10)}" y="${f(py(4.5) + 14)}" font-size="11" font-weight="700" fill="#166534">y</text>
  ${ticksX}
  ${ticksY}
  <path d="${pathOf(linePts)}" fill="none" stroke="#d97706" stroke-width="3"/>
  <path d="${pathOf(logPts)}" fill="none" stroke="#16a34a" stroke-width="3"/>
  ${gap(1, 3, Math.log2(3))}
  ${gap(3, 1, Math.log2(5))}
  <circle cx="${f(px(1))}" cy="${f(py(3))}" r="4.5" fill="#d97706" stroke="#166534" stroke-width="1.3"/>
  <circle cx="${f(px(1))}" cy="${f(py(Math.log2(3)))}" r="4.5" fill="#16a34a" stroke="#166534" stroke-width="1.3"/>
  <circle cx="${f(px(3))}" cy="${f(py(Math.log2(5)))}" r="4.5" fill="#16a34a" stroke="#166534" stroke-width="1.3"/>
  <circle cx="${f(px(3))}" cy="${f(py(1))}" r="4.5" fill="#d97706" stroke="#166534" stroke-width="1.3"/>
  <text x="${f(px(1))}" y="${f(py(Math.log2(3)) + 22)}" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="middle">x = 1</text>
  <text x="${f(px(3) - 8)}" y="${f(py(1) + 20)}" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="end">x = 3</text>
  <circle cx="${f(px(2))}" cy="${f(py(2))}" r="7" fill="#ea580c" stroke="#166534" stroke-width="1.6"/>
  <text x="${f(px(2) + 12)}" y="${f(py(2) + 2)}" font-size="11" font-weight="700" fill="#166534">(2, 2) — the one root</text>
  <text x="540" y="90" font-size="9.5" font-weight="700" fill="#65a30d">gap at x = 1: h(1) ≈ −1.42 &lt; 0</text>
  <text x="540" y="106" font-size="9.5" font-weight="700" fill="#65a30d">gap at x = 3: h(3) ≈ +1.32 &gt; 0</text>
  <text x="${f(px(4.6) + 8)}" y="${f(py(Math.log2(6.6)) - 2)}" font-size="11" font-weight="700" fill="#166534">y = log₂(x + 2)</text>
  <text x="${f(px(4.45) + 8)}" y="${f(py(-0.45) - 4)}" font-size="11" font-weight="700" fill="#d97706">y = 4 − x</text>
  <text x="360" y="560" font-size="9.5" font-weight="700" text-anchor="middle" fill="#0f766e">the rising log meets the falling line exactly once; the dashed orange spans measure the gap h at x = 1 (negative) and x = 3 (positive)</text>
</svg>`
}

// ---------------------------------------------------------------- body fig 3
function wingsParabola94Svg(): string {
  // THE WINGS — the parabola y = 2x² − 5x − 3 against the line y = 2, the
  // argument-clears-2 crossings marked at (5 ± √65)/4 (orange) and the
  // argument's zeros at x = −0.5, 3 (teal, the rider walls). Sampled from the
  // functions; the tinted band is the y > 2 half-plane. Engine-pinned: G11.
  const UX = 120 // px per math unit on x
  const UY = 34 // px per math unit on y
  const OX = 216 // pixel x of math 0
  const OY = 285 // pixel y of math 0
  const XM = -1.3
  const XMAX = 3.8
  const px = (x: number) => OX + x * UX
  const py = (y: number) => OY - y * UY
  const f = (n: number) => n.toFixed(1)
  const W1 = (5 - Math.sqrt(65)) / 4 // −0.7655644… strict wall
  const W2 = (5 + Math.sqrt(65)) / 4 // 3.2655644… strict wall
  const pts: [number, number][] = []
  for (let x = XM; x <= XMAX + 0.0001; x += 0.04) pts.push([px(x), py(2 * x * x - 5 * x - 3)])
  const pathOf = (p: [number, number][]) => p.map((q, i) => `${i === 0 ? 'M' : 'L'} ${f(q[0])} ${f(q[1])}`).join(' ')
  let ticksX = ''
  for (const k of [-1, 0, 1, 2, 3]) {
    ticksX += `<line x1="${f(px(k))}" y1="${py(0) - 5}" x2="${f(px(k))}" y2="${py(0) + 5}" stroke="#0f766e" stroke-width="1.6"/>`
    ticksX += `<text x="${f(px(k))}" y="${py(0) + 29}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${k < 0 ? '−' + Math.abs(k) : k}</text>`
  }
  return `<svg viewBox="0 0 720 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The wings of the inequality log base two of two x squared minus five x minus three greater than one, drawn as the parabola y equals two x squared minus five x minus three against the horizontal line y equals two. The half-plane above the line y equals two is tinted amber. The parabola enters top left, descends through the orange dot at x approximately minus zero point seven six six on the line y equals two, crosses the x-axis at the teal dot at x equals minus zero point five, dips to its vertex at x equals one point two five, rises through the teal dot at x equals three, then through the orange dot at x approximately three point two six six on the line y equals two, and exits top right. The parabola lives in the tinted band only on the two wings beyond the orange dots, which are the answer; between an orange dot and a teal dot the argument is positive but below two.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the wings of log₂(2x² − 5x − 3) &gt; 1: the parabola against the line y = 2</text>
  <text x="360" y="44" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">the argument clears 2 exactly on the two wings beyond the orange dots; the teal dots are the argument's zeros</text>
  <rect x="${f(px(XM))}" y="${f(py(7))}" width="${f(px(XMAX) - px(XM))}" height="${f(py(2) - py(7))}" fill="#fef3c7"/>
  <line x1="${f(px(XM))}" y1="${f(py(2))}" x2="${f(px(XMAX))}" y2="${f(py(2))}" stroke="#d97706" stroke-width="2.4"/>
  <text x="${f(px(XM) + 6)}" y="${f(py(2) - 8)}" font-size="10.5" font-weight="700" fill="#d97706">y = 2</text>
  <line x1="${f(px(XM))}" y1="${f(py(0))}" x2="${f(px(XMAX))}" y2="${f(py(0))}" stroke="#16a34a" stroke-width="2"/>
  ${head94(px(XMAX), py(0), 1, 0, 11, '#16a34a')}
  <text x="${f(px(XMAX) + 8)}" y="${f(py(0) - 6)}" font-size="11" font-weight="700" fill="#166534">x</text>
  <line x1="${f(px(0))}" y1="${f(py(7))}" x2="${f(px(0))}" y2="${f(py(-7))}" stroke="#16a34a" stroke-width="2"/>
  ${head94(px(0), py(7), 0, -1, 11, '#16a34a')}
  <text x="${f(px(0) + 10)}" y="${f(py(7) + 16)}" font-size="11" font-weight="700" fill="#166534">y</text>
  ${ticksX}
  <text x="${f(px(0) - 8)}" y="${f(py(2) + 4)}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="end">2</text>
  <text x="${f(px(0) - 8)}" y="${f(py(0) + 4)}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="end">0</text>
  <text x="${f(px(0) - 8)}" y="${f(py(-6) + 4)}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="end">−6</text>
  <path d="${pathOf(pts)}" fill="none" stroke="#16a34a" stroke-width="3"/>
  <circle cx="${f(px(W1))}" cy="${f(py(2))}" r="6" fill="#ea580c" stroke="#166534" stroke-width="1.5"/>
  <circle cx="${f(px(W2))}" cy="${f(py(2))}" r="6" fill="#ea580c" stroke="#166534" stroke-width="1.5"/>
  <text x="${f(px(W1) + 10)}" y="${f(py(2) - 15)}" font-size="10" font-weight="700" fill="#ea580c">−0.766</text>
  <text x="${f(px(W2) - 10)}" y="${f(py(2) - 15)}" font-size="10" font-weight="700" fill="#ea580c" text-anchor="end">3.266</text>
  <circle cx="${f(px(-0.5))}" cy="${f(py(0))}" r="5.5" fill="#0d9488" stroke="#166534" stroke-width="1.5"/>
  <circle cx="${f(px(3))}" cy="${f(py(0))}" r="5.5" fill="#0d9488" stroke="#166534" stroke-width="1.5"/>
  <text x="360" y="535" font-size="9.5" font-weight="700" text-anchor="middle" fill="#0f766e">orange dots: argument 2 at x = (5 ± √65)/4 ≈ −0.766, 3.266 (the strict walls); teal dots: argument zero at x = −0.5 and 3 (the rider)</text>
</svg>`
}

// ---------------------------------------------------------------- body fig 4
function directionDuel94Svg(): string {
  // THE DUEL — the same inequality shape at a rising base (top panel:
  // log₂ x > 3 ⟺ x > 8, arrow right) and a falling base (bottom panel:
  // log½ x > 2 ⟺ 0 < x < ¼, arrow left into the band). The threshold walls
  // are aligned (pixel x = 354.4 vs 355) so the two panels read as one
  // mirrored picture. Engine-pinned: G14.
  const pxA = (x: number) => 60 + x * 36.8 // top panel: math x ∈ [0, 16]
  const pxB = (x: number) => 60 + x * 1180 // bottom panel: math x ∈ [0, 0.5]
  const f = (n: number) => n.toFixed(1)
  const YA = 100 // top panel line
  const YB = 190 // bottom panel line
  return `<svg viewBox="0 0 720 252" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The family decides the direction: two number-line panels. Top panel, base a equals two greater than one, the rising family: the inequality log base two of x greater than three is equivalent to x greater than two cubed, which is eight, and an orange arrow points right of the teal threshold wall at eight through the shaded band. Bottom panel, base a equals one half less than one, the falling family: the inequality log base one half of x greater than two is equivalent to zero less x less than one quarter, and an orange arrow points left inside the shaded band between the teal domain wall at zero and the teal threshold wall at zero point two five. The footer states that the exponent looks the same in both panels and only the base's family decides the direction.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the family decides the direction: the same inequality at a rising and a falling base</text>
  <text x="24" y="62" font-size="10.5" font-weight="700" fill="#0f766e">base a = 2 &gt; 1 — the rising family: log₂ x &gt; 3 ⟺ x &gt; 2³ = 8 — the direction KEEPS</text>
  <rect x="${f(pxA(8))}" y="84" width="${f(pxA(16) - pxA(8))}" height="32" fill="#fef3c7"/>
  <line x1="${f(pxA(0))}" y1="${YA}" x2="${f(pxA(16))}" y2="${YA}" stroke="#16a34a" stroke-width="2"/>
  ${head94(pxA(16), YA, 1, 0, 10, '#16a34a')}
  <line x1="${f(pxA(8))}" y1="84" x2="${f(pxA(8))}" y2="116" stroke="#0d9488" stroke-width="3.2"/>
  <line x1="${f(pxA(8) + 8)}" y1="${YA}" x2="${f(pxA(15.2))}" y2="${YA}" stroke="#ea580c" stroke-width="3"/>
  ${head94(pxA(15.2), YA, 1, 0, 10, '#ea580c')}
  <text x="${f(pxA(11.6))}" y="92" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">x &gt; 8</text>
  <text x="${f(pxA(0))}" y="${YA + 24}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">0</text>
  <text x="${f(pxA(8))}" y="${YA + 24}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">8</text>
  <text x="${f(pxA(16))}" y="${YA + 24}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">16</text>
  <text x="24" y="152" font-size="10.5" font-weight="700" fill="#0f766e">base a = ½ &lt; 1 — the falling family: log½ x &gt; 2 ⟺ 0 &lt; x &lt; (½)² = 0.25 — the direction REVERSES</text>
  <rect x="${f(pxB(0))}" y="174" width="${f(pxB(0.25) - pxB(0))}" height="32" fill="#fef3c7"/>
  <line x1="${f(pxB(0))}" y1="${YB}" x2="${f(pxB(0.5))}" y2="${YB}" stroke="#16a34a" stroke-width="2"/>
  ${head94(pxB(0.5), YB, 1, 0, 10, '#16a34a')}
  <line x1="${f(pxB(0))}" y1="174" x2="${f(pxB(0))}" y2="206" stroke="#0d9488" stroke-width="3.2"/>
  <line x1="${f(pxB(0.25))}" y1="174" x2="${f(pxB(0.25))}" y2="206" stroke="#0d9488" stroke-width="3.2"/>
  <line x1="${f(pxB(0.25) - 8)}" y1="${YB}" x2="${f(pxB(0.08))}" y2="${YB}" stroke="#ea580c" stroke-width="3"/>
  ${head94(pxB(0.08), YB, -1, 0, 10, '#ea580c')}
  <text x="${f(pxB(0.125))}" y="182" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">0 &lt; x &lt; 0.25</text>
  <text x="${f(pxB(0))}" y="${YB + 24}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">0</text>
  <text x="${f(pxB(0.25))}" y="${YB + 24}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">0.25</text>
  <text x="${f(pxB(0.5))}" y="${YB + 24}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">0.5</text>
  <text x="360" y="238" font-size="9.5" font-weight="700" text-anchor="middle" fill="#0f766e">the exponent looks the same in both panels; only the base's family decides — the number-one exam trap</text>
</svg>`
}

// ------------------------------------------------------------ solution figs
function solCourtL3a94Svg(): string {
  // L3(a) — the domain band (−2, 3) with the two candidates (−5 ± √21)/2:
  // −4.7913 refused outside, −0.2087 kept inside. Engine-pinned: G17.
  const NL = 118
  const XM = -6
  const XMAX = 4
  const PX0 = 50
  const UX = 65.5
  const px = (x: number) => PX0 + (x - XM) * UX
  const f = (n: number) => n.toFixed(1)
  const R1 = (-5 - Math.sqrt(21)) / 2
  const R2 = (-5 + Math.sqrt(21)) / 2
  let ticks = ''
  for (let k = XM; k <= XMAX; k++) {
    ticks += `<line x1="${f(px(k))}" y1="${NL - 5}" x2="${f(px(k))}" y2="${NL + 5}" stroke="#0f766e" stroke-width="1.4"/>`
    ticks += `<text x="${f(px(k))}" y="${NL + 20}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${k < 0 ? '−' + Math.abs(k) : k}</text>`
  }
  return `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The domain court for log base ten of three minus x equals two log base ten of x plus two. The number line runs from minus six to four; the domain band from minus two to three is shaded amber between teal walls labelled x equals minus two and x equals three. Two candidates from the quadratic x squared plus five x plus one equals zero are dropped: the root minus four point seven nine is an orange cross outside the band to the left, labelled refused because x plus two is negative; the root minus zero point two one is a green dot inside the band, labelled kept because both terms are defined.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the court for log₁₀(3 − x) = 2 log₁₀(x + 2): the band (−2, 3) keeps one root</text>
  <text x="360" y="40" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">both candidates solve 3 − x = (x + 2)²; only the one in the band solves the original</text>
  <rect x="${f(px(-2))}" y="96" width="${f(px(3) - px(-2))}" height="40" fill="#fef3c7"/>
  <text x="${f((px(-2) + px(3)) / 2)}" y="74" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">the domain band (−2, 3)</text>
  <text x="${f(px(-2))}" y="74" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">x = −2</text>
  <text x="${f(px(3))}" y="74" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">x = 3</text>
  <line x1="${f(px(-2))}" y1="84" x2="${f(px(-2))}" y2="148" stroke="#0d9488" stroke-width="3.2"/>
  <line x1="${f(px(3))}" y1="84" x2="${f(px(3))}" y2="148" stroke="#0d9488" stroke-width="3.2"/>
  <line x1="${f(px(XM))}" y1="${NL}" x2="${f(px(XMAX))}" y2="${NL}" stroke="#16a34a" stroke-width="2"/>
  ${head94(px(XMAX), NL, 1, 0, 10, '#16a34a')}
  ${ticks}
  <line x1="${f(px(R1) - 8)}" y1="${NL - 8}" x2="${f(px(R1) + 8)}" y2="${NL + 8}" stroke="#dc2626" stroke-width="3"/>
  <line x1="${f(px(R1) + 8)}" y1="${NL - 8}" x2="${f(px(R1) - 8)}" y2="${NL + 8}" stroke="#dc2626" stroke-width="3"/>
  <text x="${f(px(R1))}" y="${NL - 16}" font-size="9.5" font-weight="700" fill="#dc2626" text-anchor="middle">x = (−5 − √21)/2 ≈ −4.79</text>
  <text x="${f(px(R1))}" y="${NL + 38}" font-size="9" font-weight="700" fill="#dc2626" text-anchor="middle">refused — x + 2 &lt; 0</text>
  <circle cx="${f(px(R2))}" cy="${NL}" r="6" fill="#16a34a" stroke="#166534" stroke-width="1.5"/>
  <text x="${f(px(R2))}" y="${NL - 16}" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">x = (−5 + √21)/2 ≈ −0.21</text>
  <text x="${f(px(R2))}" y="${NL + 38}" font-size="9" font-weight="700" fill="#166534" text-anchor="middle">kept — both terms defined</text>
</svg>`
}

function solBandL4c94Svg(): string {
  // L4(c) — the answer band (1, 17) for log_{0.25}(x − 1) > −2: teal domain
  // wall at x = 1, orange strict wall at x = 17, the witness x = 5 inside and
  // x = 18 refused outside. Engine-pinned: G22.
  const NL = 118
  const XM = -2
  const XMAX = 19
  const PX0 = 48
  const UX = 31.5
  const px = (x: number) => PX0 + (x - XM) * UX
  const f = (n: number) => n.toFixed(1)
  let ticks = ''
  for (const k of [0, 5, 10, 15]) {
    ticks += `<line x1="${f(px(k))}" y1="${NL - 5}" x2="${f(px(k))}" y2="${NL + 5}" stroke="#0f766e" stroke-width="1.4"/>`
    ticks += `<text x="${f(px(k))}" y="${NL + 20}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${k}</text>`
  }
  return `<svg viewBox="0 0 720 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The answer band for log base zero point two five of x minus one greater than minus two. The number line runs from minus two to nineteen; the answer band from one to seventeen is shaded amber, walled by a teal domain wall at x equals one and an orange strict wall at x equals seventeen, with the label the answer band from one to seventeen above it. The witness point x equals five is marked inside the band with the note log base one quarter of four equals minus one which is greater than minus two; a point at x equals eighteen is an orange cross outside the band, labelled outside. The footer notes that x equals seventeen itself gives equality and is excluded by the strict sign.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the court for log₀.₂₅(x − 1) &gt; −2: the answer band (1, 17)</text>
  <text x="360" y="40" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">base 0.25 &lt; 1 flips the read to x − 1 &lt; (1/4)^(−2) = 16; the domain keeps x &gt; 1; 17 itself gives equality and is excluded</text>
  <rect x="${f(px(1))}" y="96" width="${f(px(17) - px(1))}" height="40" fill="#fef3c7"/>
  <text x="${f((px(1) + px(17)) / 2)}" y="88" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">the answer band (1, 17)</text>
  <line x1="${f(px(1))}" y1="84" x2="${f(px(1))}" y2="148" stroke="#0d9488" stroke-width="3.2"/>
  <line x1="${f(px(17))}" y1="84" x2="${f(px(17))}" y2="148" stroke="#ea580c" stroke-width="3.2"/>
  <line x1="${f(px(XM))}" y1="${NL}" x2="${f(px(XMAX))}" y2="${NL}" stroke="#16a34a" stroke-width="2"/>
  ${head94(px(XMAX), NL, 1, 0, 10, '#16a34a')}
  ${ticks}
  <text x="${f(px(5))}" y="106" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">x = 5: log₀.₂₅ 4 = −1 &gt; −2 ✓</text>
  <line x1="${f(px(18) - 7)}" y1="${NL - 7}" x2="${f(px(18) + 7)}" y2="${NL + 7}" stroke="#dc2626" stroke-width="3"/>
  <line x1="${f(px(18) + 7)}" y1="${NL - 7}" x2="${f(px(18) - 7)}" y2="${NL + 7}" stroke="#dc2626" stroke-width="3"/>
  <text x="${f(px(18) - 12)}" y="${NL + 38}" font-size="9" font-weight="700" fill="#dc2626" text-anchor="end">x = 18 — outside</text>
  <text x="${f(px(1))}" y="176" font-size="9" font-weight="700" fill="#0f766e" text-anchor="middle">1 (domain wall)</text>
  <text x="${f(px(17))}" y="176" font-size="9" font-weight="700" fill="#d97706" text-anchor="middle">17 (strict wall)</text>
</svg>`
}

function solCrossL5a94Svg(): string {
  // L5(a) — the single crossing of y = log₃(x + 5) with y = 5 − x, bisection-
  // pinned at x ≈ 3.0963 (both sides ≈ 1.9037). Engine-pinned: G23.
  const UX = 105
  const UY = 32
  const OX = 60
  const OY = 206
  const px = (x: number) => OX + x * UX
  const py = (y: number) => OY - y * UY
  const f = (n: number) => n.toFixed(1)
  const ROOT = 3.0963172 // engine bisection, 7 dp
  const logPts: [number, number][] = []
  for (let x = 0; x <= 5.2001; x += 0.05) logPts.push([px(x), py(Math.log(x + 5) / Math.log(3))])
  const linePts: [number, number][] = []
  for (let x = 0; x <= 5.0001; x += 0.1) linePts.push([px(x), py(5 - x)])
  const pathOf = (pts: [number, number][]) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${f(p[0])} ${f(p[1])}`).join(' ')
  let ticksX = ''
  for (const k of [0, 1, 2, 3, 4, 5]) {
    ticksX += `<line x1="${f(px(k))}" y1="${py(0) - 4}" x2="${f(px(k))}" y2="${py(0) + 4}" stroke="#0f766e" stroke-width="1.4"/>`
    ticksX += `<text x="${f(px(k))}" y="${py(0) + 16}" font-size="9" font-weight="700" fill="#0f766e" text-anchor="middle">${k}</text>`
  }
  let ticksY = ''
  for (const k of [1, 2, 3, 4, 5]) {
    ticksY += `<text x="${px(0) - 7}" y="${f(py(k) + 3)}" font-size="9" font-weight="700" fill="#0f766e" text-anchor="end">${k}</text>`
  }
  return `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The single crossing for log base three of x plus five equals five minus x. The green curve y equals log base three of x plus five rises gently from about one point four six five to about two point one one across the window, and the amber line y equals five minus x falls from five to zero. They cross exactly once, at the orange dot near x equals three point zero nine six three, where both sides read about one point nine zero. The caption notes that the strictly increasing sum h of x equals log base three of x plus five plus x minus five caps the count at one, and that no integer works.">
  <text x="360" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">one crossing: log₃(x + 5) = 5 − x — pinned by bisection at x ≈ 3.0963</text>
  <text x="360" y="36" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">the strictly increasing sum h(x) = log₃(x + 5) + x − 5 caps the count at one; no integer works (log₃ 9 = 2 ≠ 1)</text>
  <line x1="${f(px(0))}" y1="${f(py(5))}" x2="${f(px(0))}" y2="${f(py(0))}" stroke="#16a34a" stroke-width="2"/>
  <line x1="${f(px(0))}" y1="${f(py(0))}" x2="${f(px(5.6))}" y2="${f(py(0))}" stroke="#16a34a" stroke-width="2"/>
  ${head94(px(5.6), py(0), 1, 0, 10, '#16a34a')}
  ${ticksX}
  ${ticksY}
  <path d="${pathOf(linePts)}" fill="none" stroke="#d97706" stroke-width="3"/>
  <path d="${pathOf(logPts)}" fill="none" stroke="#16a34a" stroke-width="3"/>
  <circle cx="${f(px(ROOT))}" cy="${f(py(5 - ROOT))}" r="6" fill="#ea580c" stroke="#166534" stroke-width="1.5"/>
  <text x="${f(px(ROOT) + 10)}" y="${f(py(5 - ROOT) - 4)}" font-size="9.5" font-weight="700" fill="#166534">x ≈ 3.0963</text>
  <text x="612" y="134" font-size="9.5" font-weight="700" fill="#166534">y = log₃(x + 5)</text>
  <text x="${f(px(0.4) + 6)}" y="${f(py(4.6) - 2)}" font-size="9.5" font-weight="700" fill="#d97706">y = 5 − x</text>
</svg>`
}

function solWingsL5b94Svg(): string {
  // L5(b) — the wings court: orange strict walls at 1 ± √6 sit OUTSIDE the
  // teal rider walls at −1 and 3; the orange wings are the answer. The "−6"
  // reading on the rider labels is deliberate: between an orange and a teal
  // wall the argument is positive but below 2. Engine-pinned: G24.
  const NL = 130
  const XM = -3
  const XMAX = 5
  const PX0 = 56
  const UX = 80.5
  const px = (x: number) => PX0 + (x - XM) * UX
  const f = (n: number) => n.toFixed(1)
  const SW1 = 1 - Math.sqrt(6) // −1.4494897… strict wall
  const SW2 = 1 + Math.sqrt(6) // 3.4494897… strict wall
  let ticks = ''
  for (const k of [-2, 0, 2, 4]) {
    ticks += `<line x1="${f(px(k))}" y1="${NL - 5}" x2="${f(px(k))}" y2="${NL + 5}" stroke="#0f766e" stroke-width="1.4"/>`
    ticks += `<text x="${f(px(k))}" y="${NL + 22}" font-size="9" font-weight="700" fill="#0f766e" text-anchor="middle">${k < 0 ? '−' + Math.abs(k) : k}</text>`
  }
  return `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The wings court for log base two of x squared minus two x minus three greater than one. The number line runs from minus three to five. Two orange strict walls stand at one minus root six, about minus one point four four nine, and one plus root six, about three point four four nine; two taller teal rider walls stand at minus one and three, INSIDE the orange pair. Orange arrows run leftward from the left orange wall and rightward from the right orange wall, labelled x less than one minus root six and x greater than one plus root six — the answer wings. The footer states that between an orange and a teal wall the argument is positive but below two, defined yet not enough.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the wings of log₂(x² − 2x − 3) &gt; 1: strict walls outside the rider walls</text>
  <text x="360" y="40" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">the argument must clear 2 (orange walls at 1 ± √6) and stay positive (teal walls at −1, 3); the orange wings are the answer</text>
  <line x1="${f(px(XM))}" y1="${NL}" x2="${f(px(XMAX))}" y2="${NL}" stroke="#16a34a" stroke-width="2"/>
  ${head94(px(XMAX), NL, 1, 0, 10, '#16a34a')}
  ${ticks}
  <line x1="${f(px(-1))}" y1="88" x2="${f(px(-1))}" y2="172" stroke="#0d9488" stroke-width="3.2"/>
  <line x1="${f(px(3))}" y1="88" x2="${f(px(3))}" y2="172" stroke="#0d9488" stroke-width="3.2"/>
  <line x1="${f(px(SW1))}" y1="100" x2="${f(px(SW1))}" y2="160" stroke="#ea580c" stroke-width="3.2"/>
  <line x1="${f(px(SW2))}" y1="100" x2="${f(px(SW2))}" y2="160" stroke="#ea580c" stroke-width="3.2"/>
  <line x1="${f(px(SW1) - 6)}" y1="${NL}" x2="${f(px(XM) + 14)}" y2="${NL}" stroke="#ea580c" stroke-width="3"/>
  ${head94(px(XM) + 14, NL, -1, 0, 10, '#ea580c')}
  <line x1="${f(px(SW2) + 6)}" y1="${NL}" x2="${f(px(XMAX) - 15)}" y2="${NL}" stroke="#ea580c" stroke-width="3"/>
  ${head94(px(XMAX) - 15, NL, 1, 0, 10, '#ea580c')}
  <text x="${f((px(XM) + px(SW1)) / 2)}" y="108" font-size="10" font-weight="700" fill="#ea580c" text-anchor="middle">x &lt; 1 − √6</text>
  <text x="${f((px(SW2) + px(XMAX)) / 2)}" y="108" font-size="10" font-weight="700" fill="#ea580c" text-anchor="middle">x &gt; 1 + √6</text>
  <text x="${f(px(SW1))}" y="178" font-size="9" font-weight="700" fill="#d97706" text-anchor="middle">≈ −1.449</text>
  <text x="${f(px(SW2))}" y="178" font-size="9" font-weight="700" fill="#d97706" text-anchor="middle">≈ 3.449</text>
  <text x="${f(px(-1))}" y="196" font-size="9" font-weight="700" fill="#0f766e" text-anchor="middle">rider wall −1</text>
  <text x="${f(px(3))}" y="196" font-size="9" font-weight="700" fill="#0f766e" text-anchor="middle">rider wall 3</text>
  <text x="360" y="216" font-size="9" font-weight="700" text-anchor="middle" fill="#0f766e">between an orange and a teal wall the argument is positive but below 2 — defined, yet not enough</text>
</svg>`
}

// ------------------------------------------------------------------ the lesson
export const lesson94: Lesson = {
  id: 'aa-logarithmic-and-exponential-equations',
  number: '9.4',
  title: 'Logarithmic and Exponential Equations',
  concepts: [
    'same-base discipline',
    'hidden quadratic substitution',
    'extraneous roots and the domain court',
    'combine-then-exponentiate',
    'the monotonicity uniqueness argument',
    'logarithmic inequality direction law',
    'the flip law for bases below one',
  ],
  objectives: [
    'Solve exponential equations by the same-base law and the hidden-quadratic substitution',
    'Solve logarithmic equations by the five-move program: domain, combine, exponentiate, solve, check',
    'Catch and refuse extraneous roots honestly, naming every refusal',
    'Prove uniqueness by the monotonicity argument, with existence by exhibit or sign bracket',
    'Solve logarithmic inequalities by the family-decides direction law, carrying the domain rider',
  ],
  prerequisites: [
    'aa-the-laws-of-logarithms-and-the-change-of-base',
    'aa-quadratic-inequalities-and-the-sign-diagram',
    'aa-logarithms-the-inverse-machine',
  ],
  sources: [
    'cengage-m1-01',
    'cengage-jee-style',
    'hall-knight-higher-algebra',
    'jee-main-2026-syllabus',
  ],
  blocks: [
    // ================================================================ opening
    { kind: 'para', text: 'The machine family of this chapter is complete. Lesson 9.1 built the exponential $a^x$ with every real index and read its shape laws; lesson 9.2 turned the machine around and installed the logarithm as its inverse, with the mirror graph and the sign law; lesson 9.3 gave the pair its algebra — the product, quotient and power laws, and the change of base. What remains is the craft those machines were bought for: equations whose unknown lives in an exponent, as in $3^{2x} - 8\\cdot 3^x - 9 = 0$, or inside a logarithm, as in $\\log_2 4 + \\log_2(x + 7) - \\log_2(x - 1) = 4$. Nothing new is built in this lesson — the machines are only read backwards, and that is precisely why the reading has rules of its own.' },
    { kind: 'para', text: 'Two disciplines rule everything below, and both are short enough to state before any definition. SAME-BASE: when one equation holds two powers of the same base, equate the exponents; when it holds two logarithms of the same base, combine them into one and exponentiate. DOMAIN: a logarithmic equation is solved only where every term in it is defined, so every candidate the algebra produces is tried at the original equation\'s domain — extraneous roots are caught, not mourned. The two disciplines braid together: the same-base move is the engine, and the domain is the road the engine must stay on.' },
    { kind: 'para', text: 'The second discipline is chapter 8\'s oldest guard wearing algebra\'s other coat. There the dangerous moves were the ones that quietly LOSE roots — dividing by a factor that might be zero, taking a square root without a sign ledger — and the guard was to factor, never to divide blindly. Here the dangerous moves are the ones that quietly GAIN roots: combining two logarithms into one (the combined form is defined on a wider set than the two originals), running the power law backwards, exponentiating a squared-up equation. The court is the same; only the direction of the theft has flipped. Every number this lesson prints — every candidate, every refusal, every decimal — was recomputed by the engine before the prose was written, and the three places where the engine overruled the drafting sheet are flagged where they stand.' },

    // ============================================== the same-base craft, cashed
    { kind: 'heading', text: 'The Same-Base Craft, Cashed' },
    { kind: 'para', text: 'The recap costs one line each way. When one equation holds two powers of the same base, the one-one machine of lesson 9.1 says the exponents must agree; when it holds two logarithms of the same base, the mirror says the arguments must agree. Read as equations, with the base kept legal throughout:' },
    { kind: 'equation', latex: 'a^u = a^v \\iff u = v \\qquad (a > 0,\\ a \\neq 1,\\ u, v \\in \\mathbb{R}) \\tag{1}', note: 'the one-one machine cashed — the equation between the powers IS the equation between the exponents; 9.1\'s shape law run backwards.' },
    { kind: 'equation', latex: '\\log_a u = \\log_a v \\iff u = v \\qquad (u, v > 0) \\tag{2}', note: 'the mirror half — and the standing caution: the logarithms must be of the SAME base, and both arguments must already be in the domain for the line to apply at all.' },
    { kind: 'callout', tone: 'theorem', title: 'The same-base discipline (with the flip law)', text: 'For a legal base $a > 0$, $a \\neq 1$: $a^u = a^v \\iff u = v$, and $\\log_a u = \\log_a v \\iff u = v$ for $u, v > 0$. The inequality half follows the FAMILY of the base: $\\log_a x > \\log_a y \\iff x > y$ when $a > 1$, but $\\log_a x > \\log_a y \\iff 0 < x < y$ when $0 < a < 1$ — a rising machine preserves order, a falling one reverses it (9.1\'s shape laws, banked and reprised). Thus, $\\log_{1/2} u = -\\log_2 u$ — the flip law — so a base below one is a base above one with the sign flipped, and every same-base craft applies after that single translation.' },
    { kind: 'derivation', title: 'Theorem: the same-base law', statement: 'For $a > 0$ with $a \\neq 1$: $a^u = a^v$ forces $u = v$; and for $u, v > 0$: $\\log_a u = \\log_a v$ forces $u = v$ — the one-one discipline behind every "equate exponents" move, proved from the shape laws.', steps: [
      { label: 'The one-one machine', formula: 'x_1 \\neq x_2 \\Rightarrow a^{x_1} \\neq a^{x_2}', explanation: 'Lesson 9.1\'s shape law: at $a > 1$ the machine rises strictly, at $0 < a < 1$ it falls strictly — either way it never repeats a value. Distinct exponents build distinct powers.' },
      { label: 'Equal powers, equal exponents', formula: 'a^u = a^v \\Rightarrow u = v', explanation: 'This is the contrapositive of the previous line: if $u \\neq v$ the powers would differ, so equal powers force equal exponents. The converse — equal exponents give equal powers — is the machine\'s own law, so the biconditional holds.' },
      { label: 'The logarithm half', formula: '\\log_a u = \\log_a v \\Rightarrow u = v \\quad (u, v > 0)', explanation: 'The logarithm is the mirror of a one-one machine (9.2), and the inverse of a one-one map is one-one: if both logarithms equal $t$ then $u = a^t = v$. Again the converse is trivial, so the biconditional holds — on the domain $u, v > 0$ where the logarithms exist at all.' },
      { label: 'The inequality half', formula: 'a > 1:\\ \\log_a x > \\log_a y \\iff x > y; \\qquad 0 < a < 1:\\ \\log_a x > \\log_a y \\iff 0 < x < y', explanation: 'A strictly increasing map preserves order in both directions; a strictly decreasing one reverses it in both directions. The full direction law — with a constant on the right instead of a second logarithm — is derived in the inequalities section below; this much is needed already, because the flip law rides on it.' },
    ], result: '$a^u = a^v \\iff u = v$ and $\\log_a u = \\log_a v \\iff u = v$ — the same-base discipline, proved from one-one-ness; the flip law $\\log_{1/a} x = -\\log_a x$ translates every falling base into a rising one.' },
    { kind: 'para', text: 'Craft, then. Most equations are not born in same-base form — the work is PUTTING them there. Three routes do almost all of it: factor the exponential expression and substitute $t = a^x$ (the hidden quadratic); combine the logarithms with the 9.3 laws and exponentiate; or take logarithms of both sides when the unknown sits in both the base and the exponent. The Illustrations that follow run the three routes in turn, and each ends at the same place — candidates first, then the court.' },
    { kind: 'example', title: 'Solve $3^{2x} - 8\\cdot 3^x - 9 = 0$', steps: [
      'Set up: this is a quadratic wearing an exponential costume — the exponents $2x$ and $x$ are chained to one base. Put $t = 3^x$, so $t > 0$ by the range law of 9.1, and the equation becomes $t^2 - 8t - 9 = 0$.',
      'Now, factor: $(t - 9)(t + 1) = 0$, so $t = 9$ or $t = -1$ — two candidates out of one quadratic.',
      'So, run the court: $t = -1$ is dead on arrival, for $3^x > 0$ for every real $x$ — the machine never builds a negative number, so no exponent answers to $t = -1$. The surviving candidate reads $3^x = 9$.',
      'Check the engine side: $81 - 72 - 9 = 0$ exactly, so the substitution is honest; and $9 = 3^2$ reads the survivor at sight.',
      'Hence $3^x = 3^2$ gives $x = 2$ by the same-base law — ONE solution, with the refused root named rather than hidden: the quadratic had two roots and the equation has one.',
    ] },
    { kind: 'example', title: 'Solve $2^{2x} - 6\\cdot 2^x + 8 = 0$', steps: [
      'Set up: the same costume at base $2$. Put $t = 2^x$ with $t > 0$: the equation becomes $t^2 - 6t + 8 = 0$.',
      'Now, factor: $(t - 2)(t - 4) = 0$, so $t = 2$ or $t = 4$ — and this time BOTH candidates are positive, so the range court refuses nobody.',
      'So, exponentiate each survivor: $2^x = 2$ gives $x = 1$; $2^x = 4 = 2^2$ gives $x = 2$.',
      'Check the engine side: at $x = 1$ the left side reads $4 - 12 + 8 = 0$, at $x = 2$ it reads $16 - 24 + 8 = 0$ — both exact, and a fine sweep confirms that no third solution hides between them.',
      'Hence $x \\in \\{1, 2\\}$ — the court is not always a tragedy: sometimes every candidate survives it.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Say the refused root', text: 'A refused root is not a mistake to hide — it is part of the answer, and the honest solution writes it down. "$3^x = -1$ has no solution, because the range of $3^x$ is $(0, \\infty)$" is one complete sentence of mathematics, and the examiner reads it as understanding; a solution that silently drops $t = -1$ looks exactly like the solution of someone who never checked. The same discipline names the extraneous roots of the logarithmic equations below — caught, not mourned.' },
    { kind: 'para', text: 'The hidden quadratic deserves its name: it is the commonest examination shape in the exponential family, and it always arrives with the range court attached, because a quadratic in $t = a^x$ has two roots at most while $a^x > 0$ vetoes half of what it produces. The logarithmic family gets the same shape with the sign flipped — a quadratic in $t = \\log x$ — and its court is the DOMAIN instead of the range. The next section runs that court at full strength.' },

    // ======================================= logarithmic equations: combine, then check
    { kind: 'heading', text: 'Logarithmic Equations: Combine, Then Check' },
    { kind: 'para', text: 'A logarithmic equation is a stack of logarithms that must be collapsed to one before the machine can be run backwards. The program has five moves, and their ORDER is the discipline: read the domain FIRST, with every argument of every term required positive; combine the terms to one logarithm by the laws of 9.3; exponentiate — run the machine backwards; solve the resulting algebraic equation; and re-check every candidate against the domain as it stood BEFORE the combine. The first move is not decoration: the combine step both hides and widens the domain, and a solver who combines first has forgotten where the walls stand.' },
    { kind: 'equation', latex: '\\log_a u = c \\iff u = a^c \\qquad (u > 0) \\tag{3}', note: 'the combine-then-exponentiate move: once the 9.3 laws have left one logarithm equal to one constant, the definition pair turns the equation into algebra. The move is one-one, hence safe — but the candidates it hands back must still face the original domain.' },
    { kind: 'para', text: 'Notation, once: $\\log x$ without a base means $\\log_{10} x$, the common logarithm of lesson 9.2 — the base of the tables and of the decimals to come in 9.6. Where the base is doing structural work, it is written out in full, as $\\log_{1/2}$ or $\\log_4$ below. The convention saves ink, never care: a base written or omitted obeys every law of 9.3 unchanged.' },
    { kind: 'example', title: 'Solve $\\log_2 4 + \\log_2(x + 7) - \\log_2(x - 1) = 4$', steps: [
      'Set up — the domain first: $x + 7 > 0$ and $x - 1 > 0$ read $x > 1$ (the constant term $\\log_2 4 = 2$ needs nothing). The court is open on the half-line $x > 1$.',
      'Combine, by the product and quotient laws of 9.3: $\\log_2\\left(\\dfrac{4(x + 7)}{x - 1}\\right) = 4$.',
      'Exponentiate: $\\dfrac{4(x + 7)}{x - 1} = 2^4 = 16$.',
      'Solve: $4(x + 7) = 16(x - 1)$, so $4x + 28 = 16x - 16$, so $44 = 12x$, and $x = 11/3$.',
      'Check: $11/3 \\approx 3.6667 > 1$, so both arguments are positive — $x + 7 = 32/3$ and $x - 1 = 8/3$ — and the engine verifies $\\dfrac{4\\cdot(32/3)}{8/3} = 16$ exactly, so the original equation reads $4$ at $x = 11/3$.',
      'Hence $x = 11/3$ — the court waved the single candidate through, and nothing was manufactured.',
    ] },
    { kind: 'example', title: 'Solve $\\log_{10}(2 - x) = 2\\log_{10}(x + 1)$ — the extraneous-root showcase', steps: [
      'Set up — the domain FIRST: $2 - x > 0$ and $x + 1 > 0$ together read $-1 < x < 2$. Write the band down before anything is moved, because this equation is going to produce a root that fails it.',
      'Exponentiate: the right side is $2\\log_{10}(x + 1) = \\log_{10}\\left((x + 1)^2\\right)$ — the power law, legal because $x + 1 > 0$ on the band — so the equation reads $2 - x = (x + 1)^2$.',
      'The quadratic: $x^2 + 3x - 1 = 0$, so $x = \\dfrac{-3 \\pm \\sqrt{13}}{2}$ — two candidates, $\\approx 0.3028$ and $\\approx -3.3028$.',
      'The court: $\\dfrac{-3 - \\sqrt{13}}{2} = -3.3027756\\ldots$ fails the wall $x + 1 > 0$ — it would ask the logarithm of $-2.3028$ — so it is REFUSED, extraneous. $\\dfrac{-3 + \\sqrt{13}}{2} = 0.3027756\\ldots$ lies inside $(-1, 2)$ with both terms defined.',
      'Check the engine side: at the survivor the identity $2 - x = (x + 1)^2$ holds exactly ($1.6972244$ both ways), so the original equation reads equal sides; at the refused root the squared identity ALSO holds — the move manufactured the candidate — but the term $x + 1$ is negative there, and no logarithm of a negative number exists.',
      'Hence $x = \\dfrac{-3 + \\sqrt{13}}{2} \\approx 0.3028$ is the unique solution — one survivor, one extraneous root caught and named.',
    ] },
    { kind: 'figure', caption: 'The extraneous-root court for $\\log_{10}(2 - x) = 2\\log_{10}(x + 1)$: the domain band $-1 < x < 2$ tinted between its teal walls, with the two quadratic candidates dropped on the number line. The root $(−3 − \\sqrt{13})/2 \\approx -3.30$ lands outside the band — orange cross, refused because $x + 1 < 0$ — while $(−3 + \\sqrt{13})/2 \\approx 0.30$ lands inside — green dot, kept, both terms defined. Both candidates satisfy the squared equation $2 - x = (x + 1)^2$; only the survivor satisfies the original.', svg: extraneousCourt94Svg() },
    { kind: 'callout', tone: 'definition', title: 'Extraneous root', text: 'A number produced by a legal algebraic move applied to an equation is said to be an EXTRANEOUS ROOT of that equation when it fails to satisfy the original equation — most commonly because it falls outside the domain of one of the original terms. Thus, $-3.3027756\\ldots$ is an extraneous root of $\\log_{10}(2 - x) = 2\\log_{10}(x + 1)$: it solves the squared-up equation $2 - x = (x + 1)^2$ exactly, and it is refused all the same. Extraneous roots are a cost of the method, not an error in it — the check that catches them is the method\'s final move.' },
    { kind: 'equation', latex: 'S \\;=\\; C \\cap D \\;=\\; \\{\\, x \\in C : \\text{ every term of the ORIGINAL equation is defined at } x \\,\\} \\tag{4}', note: 'the court as a formula: $C$ is the candidate set the algebra produced, $D$ the domain of the original equation, $S$ the solution set. The answer is never "the candidates" — it is the candidates that survived.' },
    { kind: 'para', text: 'For example, each of these legal moves manufactures candidates that the original equation may refuse — the manufacture is routine, and so is the catch:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) squaring $\\sqrt{x + 7} = x + 1$ gives $x + 7 = (x + 1)^2$, i.e. $x^2 + x - 6 = 0$, i.e. the candidates $\\{2, -3\\}$: the candidate $-3$ is refused — $\\sqrt{4} = 2 \\neq -2$, and the radical\'s own side needs $x + 1 \\geq 0$ — which is chapter 8\'s coat of the same court;',
      '(ii) combining $\\log_{10}(x - 2) + \\log_{10}(x + 3) = 0$ into $\\log_{10}\\left((x - 2)(x + 3)\\right) = 0$ gives $(x - 2)(x + 3) = 1$, i.e. $x^2 + x - 7 = 0$, i.e. $\\approx 2.1926$ and $\\approx -3.1926$: the first survives (the engine reads $(x - 2)(x + 3) = 1$ exactly there), the second is refused — $x + 3 < 0$ — even though the COMBINED logarithm is defined there because the product is positive: the combined form hid the wall;',
      '(iii) and the court is not always a tragedy — in the second Illustration above, both candidates $\\{1, 2\\}$ survived it. Manufacture and survival are independent events, and only the check tells them apart.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'The check is as old as the algebra', text: 'The discipline this lesson calls the domain court has a pedigree older than its vocabulary. Al-Khwarizmi\'s ninth-century treatise — the book whose two title words, "restoration" and "balancing", gave algebra its name — solves its quadratic word problems by completing the square and then verifies each solution by substituting it back into the original problem, demonstration and check travelling together from the beginning. The named concept of an EXTRANEOUS root — a candidate born of a legal move and refused by the original equation — belongs to the school algebra of the nineteenth century, when equations came to be read as questions about FUNCTIONS with domains rather than as strings of symbols to be pushed. This lesson stands in that tradition: every candidate below is checked at the original equation, every check is engine-verified, and the vocabulary is honest about the refusals.' },
    { kind: 'callout', tone: 'insight', title: 'One court, two coats', text: 'Chapter 8 guarded the moves that LOSE roots — dividing by a possibly-zero factor, taking a wrong square root — and the guard was factoring and checking. This lesson guards the moves that GAIN them. It is the same court: in both chapters an algebraic move trades the original question for an easier one, and the trade is honest only if every answer to the easier question is checked back into the harder one. Loss and gain are the two directions of the same theft, and the check is the same in both directions.' },
    { kind: 'example', title: 'Solve $\\log_2(3x - 1) = \\log_{1/2}\\left(\\dfrac{4}{x}\\right)$', steps: [
      'Set up: the bases differ, so translate first — the flip law reads $\\log_{1/2} u = -\\log_2 u$. The domain: $3x - 1 > 0$ and $\\dfrac{4}{x} > 0$ together read $x > \\dfrac{1}{3}$.',
      'Flip and gather: $\\log_2(3x - 1) + \\log_2\\left(\\dfrac{4}{x}\\right) = 0$.',
      'Combine: $\\log_2\\left(\\dfrac{4(3x - 1)}{x}\\right) = 0$.',
      'Exponentiate: $\\dfrac{4(3x - 1)}{x} = 2^0 = 1$, so $12x - 4 = x$, giving $11x = 4$ and $x = 4/11$.',
      'Check: $4/11 \\approx 0.3636 > 1/3$, so the arguments read $3x - 1 = \\dfrac{1}{11} > 0$ and $\\dfrac{4}{x} = 11 > 0$; the engine verifies $\\dfrac{4(3x - 1)}{x} = 1$ exactly at $x = 4/11$, and both sides of the original agree to $10^{-12}$.',
      'Hence $x = \\dfrac{4}{11}$ — one candidate, one survivor, and the flip law did the translating.',
    ] },
    { kind: 'example', title: 'Solve $x^{\\log x} = 100x$ (with $x > 0$)', steps: [
      'Set up: the unknown sits in the base AND the exponent, so no same-base read is available — the logarithm is the only tool that pulls an exponent down from an arbitrary base. Take $\\log_{10}$ of both sides; the move is safe because the machine is one-one.',
      'The take: the left side reads $\\log\\left(x^{\\log x}\\right) = (\\log x)(\\log x)$ by the power law, and the right side reads $\\log(100x) = 2 + \\log x$.',
      'The quadratic in $t = \\log x$: $t^2 - t - 2 = 0$, i.e. $(t - 2)(t + 1) = 0$, so $t = 2$ or $t = -1$.',
      'Now, exponentiate back: $x = 10^2 = 100$ or $x = 10^{-1} = 0.1$ — both positive, so the domain court waves both through.',
      'Check the engine side: $100^{\\log 100} = 100^2 = 10000 = 100\\cdot 100$ and $0.1^{\\log 0.1} = 0.1^{-1} = 10 = 100\\cdot 0.1$ — both exact.',
      'Hence $x \\in \\{100,\\ 0.1\\}$ — the hidden quadratic forked, and BOTH branches survived: an exponent fork is richer than a range court, because every real $t$ answers to some positive $x$.',
    ] },
    { kind: 'equation', latex: 'a^{\\log_b c} = c^{\\log_b a} \\qquad (a, c > 0,\\ b > 0,\\ b \\neq 1) \\tag{5}', note: 'the exchange identity of 9.3 — take $\\log_b$ of both sides and the same product $\\log_b a \\cdot \\log_b c$ reads off either way; the one-one machine then equates the numbers themselves.' },
    { kind: 'example', title: 'Solve $9^{\\log_4 x} - 12x^{\\log_4 3} + 27 = 0$ — the cross-base hidden quadratic', steps: [
      'Set up: a cross-base monster — the unknown sits under logarithms at two different bases arrangements. The exchange identity (5) trades the first term\'s shape: $9^{\\log_4 x} = x^{\\log_4 9}$, and $\\log_4 9 = 2\\log_4 3$ because $9 = 3^2$ — so the first term is the SQUARE of the second term\'s shape: $9^{\\log_4 x} = \\left(x^{\\log_4 3}\\right)^2$.',
      'Put $y = x^{\\log_4 3}$, so $y > 0$: the equation becomes $y^2 - 12y + 27 = 0$.',
      'Factor: $(y - 3)(y - 9) = 0$, so $y = 3$ or $y = 9$.',
      'Now, solve $x^{\\log_4 3} = 3$: since $4^{\\log_4 3} = 3$ — the machine undoes itself — $x = 4$ is one answer. Solve $x^{\\log_4 3} = 9$: since $16 = 4^2$, one has $16^{\\log_4 3} = \\left(4^2\\right)^{\\log_4 3} = \\left(4^{\\log_4 3}\\right)^2 = 3^2 = 9$, so $x = 16$.',
      'Check the engine side: at $x = 4$ the left side reads $9 - 36 + 27 = 0$; at $x = 16$ it reads $81 - 108 + 27 = 0$ — both exact, the exchange identity itself is sweep-verified, and a sweep of $(0, 30]$ finds no third solution.',
      'Hence $x \\in \\{4, 16\\}$ — both candidates positive, both checking: the costume changed twice (exponential to quadratic to exponential), and the court never had a case.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why the moves manufacture candidates', text: 'Every law of 9.3 is an if-and-only-if WITH CONDITIONS ON ITS INPUTS. $\\log_a u + \\log_a v = \\log_a(uv)$ needs BOTH $u > 0$ and $v > 0$; the single logarithm $\\log_a(uv)$ needs only $uv > 0$ — a weaker demand that admits negative products. Run a law BACKWARDS — from the combined form to the split form, or from $\\log_a(u^2)$ to $2\\log_a u$ — and the input conditions quietly widen. That widening is the manufacturing plant of extraneous roots: a candidate legal for the wide form flows into the narrow original, where it dies. The discipline is the receipt: every move run backwards is followed by the check at the original domain, and no move is trusted without it.' },
    { kind: 'terms', items: [
      { term: 'same-base discipline', def: 'The rule that an equation holding two powers of one base — or two logarithms of one base — is solved by equating exponents or arguments: $a^u = a^v \\iff u = v$; the one-one machine cashed as a solving craft.' },
      { term: 'hidden quadratic', def: 'An exponential or logarithmic equation that becomes a quadratic after the substitution $t = a^x$ (with $t > 0$) or $t = \\log_a x$ — as $3^{2x} - 8\\cdot 3^x - 9 = 0$ becomes $t^2 - 8t - 9 = 0$ at $t = 3^x$.' },
      { term: 'extraneous root', def: 'A candidate produced by a legal algebraic move that fails the original equation — most often by landing outside the domain of one of its terms; caught by the domain check and refused, never mourned.' },
      { term: 'domain check', def: 'The final move of every logarithmic equation: each candidate is tested where every term of the ORIGINAL equation is defined — each logarithm\'s argument strictly positive.' },
      { term: 'refused root', def: 'A candidate the court rejects — "dead on arrival": $3^x = -1$ has no solution because the range of $3^x$ is $(0, \\infty)$; the honest solution names the refusal instead of hiding it.' },
      { term: 'exponentiation move', def: 'Running the machine backwards on a combined logarithmic equation: $\\log_a u = c$ becomes $u = a^c$. One-one, hence safe — but its candidates still face the original domain.' },
      { term: 'flip law', def: 'The base-symmetry law $\\log_{1/a} x = -\\log_a x$: a base below one flips the sign of every logarithm and the direction of every inequality — the standing translation between the two families.' },
    ] },
    { kind: 'table', caption: 'The court ledger of this lesson: every equation that manufactured candidates, what the move produced, and what the domain — or the range, in the exponential costume — refused. Every number in the table is engine-pinned, including both refusals, which the honest solution names rather than hides.', head: ['Equation', 'Candidates produced', 'The court verdict', 'Survivors'], rows: [
      ['$\\sqrt{x + 7} = x + 1$ (squaring — chapter 8\'s coat)', '$\\{2, -3\\}$ out of $x^2 + x - 6 = 0$', '$-3$ fails $x + 1 \\geq 0$ — refused', '$x = 2$'],
      ['$\\log_{10}(2 - x) = 2\\log_{10}(x + 1)$ (this lesson)', '$\\dfrac{-3 \\pm \\sqrt{13}}{2}$ out of $x^2 + 3x - 1 = 0$', '$\\dfrac{-3 - \\sqrt{13}}{2} \\approx -3.3028$ fails $x + 1 > 0$ — refused', '$\\dfrac{-3 + \\sqrt{13}}{2} \\approx 0.3028$'],
      ['$3^{2x} - 8\\cdot 3^x - 9 = 0$ (the range court)', '$t \\in \\{9, -1\\}$ out of $t^2 - 8t - 9 = 0$', '$t = -1$ fails $t > 0$ — dead on arrival', '$x = 2$ (from $t = 9$)'],
      ['$\\log_{10}(3 - x) = 2\\log_{10}(x + 2)$ (exercise L3)', '$\\dfrac{-5 \\pm \\sqrt{21}}{2}$ out of $x^2 + 5x + 1 = 0$', '$\\dfrac{-5 - \\sqrt{21}}{2} \\approx -4.7913$ fails $x + 2 > 0$ — refused', '$\\dfrac{-5 + \\sqrt{21}}{2} \\approx -0.2087$'],
    ] },

    // ================================================== uniqueness: monotonicity
    { kind: 'heading', text: 'Uniqueness: the Monotonicity Argument' },
    { kind: 'para', text: 'The combine-then-exponentiate program ends in algebra — quadratics, linears — and it is tempting to believe every equation of this chapter collapses that way. It does not. $\\log_2(x + 2) = 4 - x$ holds a logarithm against a LINE: no law of 9.3 combines them, no substitution matches them, and no closed form names the root. The craft for such equations is older than the logarithm itself: exhibit a root if one can be found, then prove the equation owns no other — a count argument, not a computation. The engine that powers the count is monotonicity.' },
    { kind: 'derivation', title: 'The monotonicity theorem: at most one root', statement: 'If $F$ is strictly monotone on an interval $I$ — increasing or decreasing — then $F(x) = c$ has at most one solution in $I$; and a sum of strictly increasing terms is strictly increasing, which turns the gathered form of a mixed equation into exactly such an $F$.', steps: [
      { label: 'One-one reads', formula: 'F(x_1) = F(x_2) \\Rightarrow x_1 = x_2', explanation: 'Strict monotonicity makes $F$ one-one: if $x_1 < x_2$ then $F(x_1) < F(x_2)$ in the increasing case (inequalities reversed, conclusion kept, in the decreasing case), so distinct inputs give distinct outputs.' },
      { label: 'The count cap', formula: 'F(x) = c \\text{ has at most one solution on } I', explanation: 'Two distinct solutions would force $F(x_1) = c = F(x_2)$, contradicting one-one. The cap is a ceiling, not a certificate: monotonicity NEVER proves a root exists — existence needs an exhibit, or a sign bracket together with continuity (chapter 2\'s craft).' },
      { label: 'The composition clause', formula: 'f \\text{ strictly monotone} \\Rightarrow x \\mapsto \\log_a(f(x)) \\text{ strictly monotone}', explanation: 'A composition of monotone maps is monotone — same direction or reversed, one-one either way. This is why $\\log_a(f(x)) = c$, which reads $f(x) = a^c$ by the inverse identity, has at most one solution whenever $f$ is strictly monotone: a one-one question asked of a one-one function.' },
      { label: 'The sum clause', formula: 'u(x_1) < u(x_2),\\ v(x_1) < v(x_2) \\Rightarrow u(x_1) + v(x_1) < u(x_2) + v(x_2)', explanation: 'Termwise inequalities add. So the gathered form $h(x) = \\log_a(f(x)) + x - k$ — the standing shape for "logarithm against line" — is strictly increasing whenever its logarithmic term is, and the cap applies to it.' },
    ], result: '$F$ strictly monotone $\\Rightarrow$ at most one root; existence by exhibit or sign bracket — the exhibit-certificate-monotonicity chain that closes every mixed equation this chapter meets.' },
    { kind: 'example', title: 'Solve $\\log_2(x + 2) = 4 - x$, and prove the solution is unique', steps: [
      'Set up: a logarithm against a line — no combine move applies. Hunt an integer candidate where $x + 2$ is a power of $2$: at $x = 2$ the left side reads $\\log_2 4 = 2$ and the right side reads $4 - 2 = 2$ — both sides read $2$, so $x = 2$ is a root. Existence, by exhibit.',
      'Now, gather everything on one side: $h(x) = \\log_2(x + 2) + x - 4 = 0$.',
      'The cap: $\\log_2(x + 2)$ is strictly increasing (base $2 > 1$, the argument rising — 9.1\'s shape law composed), and $x$ is strictly increasing with slope $1$; the sum of two strictly increasing terms is strictly increasing, so $h$ takes the value $0$ at most once.',
      'Check the engine side: a numerical sweep confirms that $h$\'s forward differences are positive throughout, and pins the honest bracket $h(1) = \\log_2 3 - 3 \\approx -1.4150 < 0$ and $h(3) = \\log_2 5 - 1 \\approx 1.3219 > 0$ — a sign change around the exhibited root (the drafting sheet\'s quick "$h(3) = 1$" was a rounded log; the engine\'s value stands, and the bracket survives either way).',
      'Hence $x = 2$ is THE solution — existence by exhibit, uniqueness by monotonicity, and the figure shows the single crossing that the argument licenses.',
    ] },
    { kind: 'figure', caption: 'The crossing: the rising curve $y = \\log_2(x + 2)$ (green) meets the falling line $y = 4 - x$ (amber) exactly once, at the computed point $(2, 2)$ (orange dot) — both sides read $2$. The dashed orange spans mark the gap $h$ at $x = 1$ (the curve below the line, $h(1) \\approx -1.42$) and at $x = 3$ (the curve above, $h(3) \\approx +1.32$) — the sign bracket that guarantees a root, with the vertical asymptote $x = -2$ dashed at the left. Equal scales on both axes.', svg: crossing94Svg() },
    { kind: 'para', text: 'Notice what the argument did NOT do: it never solved the equation — it counted. The same one-one discipline that equates exponents in the same-base law — the machine never repeats a value — here equates crossings of a graph: a strictly monotone curve meets a line at most once. One proof, two dialects: symbolic in the first section, graphic here.' },
    { kind: 'callout', tone: 'insight', title: 'One discipline, two dialects', text: 'The same-base law and the monotonicity argument are ONE theorem wearing two costumes: a one-one function takes every value at most once. In the same-base dialect the function is the exponential itself and the value is a power; in the monotonicity dialect the function is the gathered $h$ and the value is $0$. Learn the dialects as one discipline, and neither will feel like a separate rule to memorise.' },

    // ================================= logarithmic inequalities: the family decides
    { kind: 'heading', text: 'Logarithmic Inequalities: the Family Decides the Direction' },
    { kind: 'para', text: 'An inequality in logarithms is a comparison the family must translate, and the family\'s DIRECTION decides whether the translation keeps the order or reverses it. The standard laws are pinned in one theorem; the proof is four lines of shape-law work; and the traps live not in the flip but in the rider — the silent demand that every argument stay positive throughout. The duel figure under the theorem shows the whole law in one picture: the same exponent, two families, opposite arrows.' },
    { kind: 'callout', tone: 'theorem', title: 'The standard logarithmic inequality laws', text: 'For a legal base $a$ and real $c$: at $a > 1$ — the rising family — $\\log_a x > c \\iff x > a^c$ and $\\log_a f(x) > \\log_a g(x) \\iff f(x) > g(x) > 0$; at $0 < a < 1$ — the falling family — BOTH reads reverse: $\\log_a x > c \\iff 0 < x < a^c$ and $\\log_a f(x) > \\log_a g(x) \\iff 0 < g(x) < f(x)$. In every case, at every step, the DOMAIN RIDER rides along: each argument of each logarithm stays positive — before the move, after the move, and in the answer. Thus, $\\log_{1/2} x > 2$ reads $0 < x < (1/2)^2 = \\tfrac{1}{4}$: the falling machine translated "exceeds $2$" into "lands below $a^2$", with the domain supplying the left wall.' },
    { kind: 'figure', caption: 'The family decides the direction: the same inequality shape at a rising base (top panel: $\\log_2 x > 3 \\iff x > 2^3 = 8$ — the arrow points right, the direction keeps) and at a falling base (bottom panel: $\\log_{1/2} x > 2 \\iff 0 < x < (\\tfrac{1}{2})^2 = 0.25$ — the arrow points left into the band, the direction reverses). The threshold walls are drawn aligned so the panels read as one mirrored picture; the exponent looks the same in both, and only the base\'s family decides.', svg: directionDuel94Svg() },
    { kind: 'derivation', title: 'Theorem: the direction law, from the shape laws', statement: 'For $a > 1$: $\\log_a x > c \\iff x > a^c$; for $0 < a < 1$: $\\log_a x > c \\iff 0 < x < a^c$ — both families proved from the monotonicity of the machine, with the rider attached.', steps: [
      { label: 'The rising family', formula: 'a > 1: \\quad x > a^c \\iff \\log_a x > c', explanation: 'At a base above one the logarithm is strictly increasing (the mirror of a rising machine), and a strictly increasing map preserves order in BOTH directions: applied to $x > a^c$ it gives $\\log_a x > \\log_a(a^c) = c$; applied through the inverse machine to $\\log_a x > c$ it gives $x = a^{\\log_a x} > a^c$.' },
      { label: 'The falling family', formula: '0 < a < 1: \\quad \\log_a x > c \\iff 0 < x < a^c', explanation: 'At a base below one the machine FALLS, so exceeding $c$ in exponent lands BELOW $a^c$ in value — the order reverses. The flip law reaches the same verdict by another road: $\\log_a x = -\\log_{1/a} x$ with $1/a > 1$, so $\\log_a x > c \\iff \\log_{1/a} x < -c \\iff 0 < x < (1/a)^{-c} = a^c$. Two routes, one answer — and the domain supplies the left wall $0 < x$.' },
      { label: 'The two-log comparison', formula: '\\log_a f > \\log_a g \\iff f > g > 0 \\ (a > 1); \\qquad 0 < g < f \\ (0 < a < 1)', explanation: 'Put $c = \\log_a g$ in the rows above and collapse $a^{\\log_a g} = g$. At a rising base the comparison keeps its direction; at a falling base it reverses; and in BOTH rows the rider keeps BOTH arguments positive, because two logarithms were being compared in the first place.' },
      { label: 'The rider never sleeps', formula: 'f(x) > 0 \\text{ carried beside every flipped inequality}', explanation: 'When the argument is a function $f(x)$, the condition $f(x) > 0$ is NOT built into the flipped algebra: $\\log_{1/2}(f(x)) \\geq -1$ flips to $f(x) \\leq 2$ without one word about positivity, and the flipped band can straddle the argument\'s zeros. The rider is carried by hand — that is the trap of the cautionary twin in exercise L3(c).' },
    ], result: 'At $a > 1$ the direction keeps; at $0 < a < 1$ it reverses; the rider rides in every row — the family decides, and the exponent never does.' },
    { kind: 'table', caption: 'The direction law at a glance: the family of the BASE decides whether a logarithmic inequality keeps or reverses its direction — never the sign of any exponent or value in sight. The rider is the same in both rows: every argument positive, before and after every move.', head: ['The base\'s family', 'The read of $\\log_a x > c$', 'The read of $\\log_a f > \\log_a g$', 'The rider'], rows: [
      ['$a > 1$ — rising (e.g. $\\log_2 x > 3 \\iff x > 2^3 = 8$)', 'keeps the direction: $x > a^c$', 'keeps it: $f > g > 0$', '$f > 0$, always'],
      ['$0 < a < 1$ — falling (e.g. $\\log_{1/2} x > 2 \\iff 0 < x < (\\tfrac{1}{2})^2$)', 'reverses: $0 < x < a^c$', 'reverses: $0 < g < f$', '$f > 0$, always'],
    ] },
    { kind: 'example', title: 'Solve $\\log_{1/2}(x^2 - 8x + 17) \\geq -1$', steps: [
      'Set up: the base $\\tfrac{1}{2} < 1$ — the FALLING family, so the read REVERSES: $x^2 - 8x + 17 \\leq \\left(\\tfrac{1}{2}\\right)^{-1} = 2$. The rider first: $x^2 - 8x + 17 = (x - 4)^2 + 1 \\geq 1 > 0$ for every $x$, so the argument never vanishes and the court is free.',
      'The quadratic: $x^2 - 8x + 15 \\leq 0$, i.e. $(x - 3)(x - 5) \\leq 0$, so $3 \\leq x \\leq 5$.',
      'Check the endpoints: at $x = 3$ and $x = 5$ the argument reads exactly $2$ (the engine: $9 - 24 + 17 = 2$ and $25 - 40 + 17 = 2$) — equality is admitted by $\\geq$, so both ends are closed. At $x = 4$ the argument reads $1 \\leq 2$ ✓.',
      'Check the outside: $x = 2.9$ and $x = 5.1$ both read the argument $2.21 > 2$, so $\\log_{1/2}(2.21) < -1$ — outside the flipped band, outside the answer.',
      'Hence $x \\in [3, 5]$ — an interval, not a pair of roots: an inequality\'s answer is a band, and the flip bent it the right way.',
    ] },
    { kind: 'example', title: 'Solve $\\log_2(2x^2 - 5x - 3) > 1$', steps: [
      'Set up: the base $2 > 1$ — the RISING family keeps the direction: $2x^2 - 5x - 3 > 2^1 = 2$. And the rider rides: the argument must stay positive throughout the answer.',
      'The strict quadratic: $2x^2 - 5x - 5 > 0$; its roots are $\\dfrac{5 \\pm \\sqrt{65}}{4} \\approx -0.7656$ and $3.2656$ (the engine, 7 dp: $-0.7655644$ and $3.2655644$), and the parabola opens upward, so the strict answer is the two wings $x < \\dfrac{5 - \\sqrt{65}}{4}$ or $x > \\dfrac{5 + \\sqrt{65}}{4}$.',
      'The rider: $2x^2 - 5x - 3 = (2x + 1)(x - 3) > 0$ holds for $x < -\\tfrac{1}{2}$ or $x > 3$ — a WIDER pair of wings. The strict walls sit OUTSIDE the rider walls ($-0.7656 < -0.5$ and $3.2656 > 3$), so every point of the strict answer already clears the rider: nothing is cut.',
      'Check the gap witnesses: $x = -1$ reads the argument $4 > 2$ ✓ inside; $x = -0.6$ reads $0.72$ — defined, but below the threshold, so the inequality fails there: the zone between the strict wall and the rider wall is defined-yet-insufficient; $x = 0$ reads $-3$ — refused outright.',
      'Hence $x < \\dfrac{5 - \\sqrt{65}}{4}$ or $x > \\dfrac{5 + \\sqrt{65}}{4}$ — the strict wings, with the rider already banked inside them.',
    ] },
    { kind: 'figure', caption: 'The wings of $\\log_2(2x^2 - 5x - 3) > 1$: the parabola $y = 2x^2 - 5x - 3$ against the line $y = 2$, both sampled from their formulas, with the $y > 2$ half-plane tinted. The argument clears $2$ exactly on the wings beyond the orange dots at $x = (5 \\pm \\sqrt{65})/4 \\approx -0.766$ and $3.266$; the teal dots at $x = -0.5$ and $x = 3$ mark the argument\'s zeros — the rider\'s walls. Between an orange dot and a teal dot the logarithm is defined but reads below $1$: defined, yet not enough.', svg: wingsParabola94Svg() },
    { kind: 'example', title: 'Count the solutions of $\\log_2 x + \\log_4 x = 3$', steps: [
      'Set up: two logarithms of the same argument at different bases — unify first: $\\log_4 x = \\dfrac{\\log_2 x}{\\log_2 4} = \\dfrac{1}{2}\\log_2 x$, the change-of-base law of 9.3 (engine-swept below).',
      'So the equation reads $\\dfrac{3}{2}\\log_2 x = 3$, i.e. $\\log_2 x = 2$, i.e. $x = 2^2 = 4$.',
      'The count: the collapsed equation is LINEAR in $\\log_2 x$ — there is no hidden quadratic to fork, so there is exactly one candidate, and it survives the domain $x > 0$.',
      'Check the engine side: $\\log_2 4 + \\log_4 4 = 2 + 1 = 3$ exactly, and a sweep of $(0, 100]$ finds exactly one solution — the monotone sum rising through $3$ exactly once.',
      'Hence the equation has EXACTLY ONE solution, $x = 4$ — the counting craft in one breath: collapse, then read whether the collapsed shape can fork.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The number-one trap: the exponent is not the base', text: 'Facing $\\log_{1/2}(x^2 - 8x + 17) \\geq -1$, solvers flip the inequality "because the $-1$ is negative". No — the direction follows the BASE\'S family: $\\tfrac{1}{2} < 1$ reverses the read because the MACHINE falls, and the sign of the value on the right ($-1$, $2$, $0$) has nothing to do with it. The duel figure above shows the same exponent $2$ producing opposite directions at the two families. When in doubt, name the base\'s family first; everything else follows.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The equation-and-inequality band of this lesson is a standing JEE Main / state-board motif. The question shapes, in frequency order: hidden-quadratic items ("the number of real roots of $3^{2x} - 8\\cdot 3^x - 9 = 0$" — the first Illustration\'s shape); extraneous-root items ("a root of the squared equation that fails the original is…" — the definition above, with the refused root offered as a decoy); domain items ("the solution set of $\\log_{10}(2 - x) = 2\\log_{10}(x + 1)$" — the court, the fourth Illustration\'s shape); direction items ("solve $\\log_{1/2}(x^2 - 8x + 17) \\geq -1$" — the family decides, the ninth Illustration\'s shape); and counting items ("$\\log_2 x + \\log_4 x = 3$ has how many solutions?" — the eleventh Illustration\'s shape). The marks separator is the same in every shape: DOMAIN FIRST, candidates after, refusals named — and the direction read off the base\'s family, never off a sign in sight. The items in this lesson are exam-style designs of ours, labelled honestly — nothing is quoted from an official paper.' },

    // ================================================== the chapter's doorstep
    { kind: 'heading', text: "The Chapter's Doorstep" },
    { kind: 'para', text: 'The craft is banked. An equation whose unknown lives in an exponent is now a three-route problem — substitute, factor, or take logarithms; an equation whose unknown lives inside a logarithm is a five-move program — domain, combine, exponentiate, solve, check; and the mixed and inequality forms answer to the monotonicity cap and the family-decides flip. What remains of the chapter\'s family is its analytic heart: lesson 9.5 derives the logarithmic and exponential series — the infinite polynomials that turned $\\ln(1 + x)$ and $e^x$ into computable objects — and lesson 9.6 returns to the tables, with characteristic, mantissa, and the arithmetic the series made possible. The crafts of THIS lesson are the ones those lessons will use: every series coefficient is checked by an equation, and every table read is a logarithm evaluated at a domain-checked argument.' },
    { kind: 'para', text: 'From the above discussion, it follows that:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the same-base discipline — $a^u = a^v \\iff u = v$ and $\\log_a u = \\log_a v \\iff u = v$ — equates exponents or arguments whenever one base has been made common, and it is the one-one machine itself, proved from the shape laws;',
      '(ii) the hidden quadratic — $t = a^x$ with $t > 0$, or $t = \\log_a x$ — is the standing costume change of the family, arriving with the range court or the domain court attached: $t = -1$ is dead on arrival, and $S = C \\cap D$ is the whole ledger;',
      '(iii) the domain court refuses the candidates the moves manufacture: the extraneous root is caught and named, the refusal is written INTO the solution, and the receipt for every backwards law is the check at the original domain — extraneous roots are the price of a legal move, and the check is what makes the method honest;',
      '(iv) the monotonicity argument caps the count of any equation gathered into a strictly monotone one — existence by exhibit or by the sign bracket, uniqueness by the cap — and it is the same one-one discipline as the same-base law, in its graphic dialect;',
      '(v) the family-decides flip: a rising base keeps an inequality\'s direction, a falling base reverses it — the exponent\'s sign never enters the decision — and the rider $f(x) > 0$ rides with every read, the silent condition whose neglect breaks a careless answer into pieces.',
    ] },
    { kind: 'formula', name: 'The same-base law', latex: 'a^u = a^v \\iff u = v, \\qquad \\log_a u = \\log_a v \\iff u = v \\quad (u, v > 0)', note: 'the one-one machine cashed as a solving craft — equate exponents, equate arguments; witness the first Illustration\'s $3^x = 9 = 3^2$.' },
    { kind: 'formula', name: 'The combine-then-exponentiate move', latex: '\\log_a u = c \\iff u = a^c \\quad (u > 0)', note: 'combine to one logarithm by the laws of 9.3, then run the machine backwards — and re-check the domain: the move\'s receipt is the original equation.' },
    { kind: 'formula', name: 'The inequality direction law', latex: 'a > 1:\\ \\log_a x > c \\iff x > a^c; \\qquad 0 < a < 1:\\ \\log_a x > c \\iff 0 < x < a^c', note: 'the family of the base decides — rising keeps, falling reverses; the exponent\'s sign never enters the decision.' },
    { kind: 'formula', name: 'The hidden-quadratic substitution', latex: 't = a^x \\ \\text{with}\\ t > 0, \\qquad \\text{or} \\qquad t = \\log_a x', note: 'the costume change that turns $3^{2x} - 8\\cdot 3^x - 9 = 0$ into $t^2 - 8t - 9 = 0$; for the exponential form the refusal $t \\leq 0$ is built in.' },
    { kind: 'formula', name: 'The domain rider', latex: 'f(x) > 0 \\quad \\text{before and after every move}', note: 'every candidate is tried at the ORIGINAL equation\'s domain — the court that refuses $(−3 − \\sqrt{13})/2$ and caps every claimed solution set.' },

    // ================================================================ quiz
    { kind: 'quiz', title: 'Check yourself: logarithmic and exponential equations', items: [
      { q: 'Solving $\\log_2(x + 3) = 4$ gives', options: ['$x = 1$', '$x = 13$', '$x = 19$', '$x = 7$'], answer: 1, explain: 'Option 1 runs the machine backwards: $\\log_2(x + 3) = 4$ means $x + 3 = 2^4 = 16$, so $x = 13$ — and the check reads $\\log_2 16 = 4$ with the domain $x > -3$ satisfied. Option 0 forgets the $+3$: at $x = 1$ one has $x + 3 = 4$ and $\\log_2 4 = 2 \\neq 4$, so it solves a different equation ($\\log_2(x + 3) = 2$). Option 2 overshoots: at $x = 19$ one has $x + 3 = 22$ and $\\log_2 22 \\approx 4.4594 \\neq 4$, because $22$ is not a power of $2$. Option 3 lands on a round number for no reason: at $x = 7$ one has $x + 3 = 10$ and $\\log_2 10 \\approx 3.3219 \\neq 4$ — the answer is named by the exponent, not by the size of $x$.' },
      { q: 'A root produced by squaring or exponentiating that fails the original domain is', options: ['kept anyway', 'an extraneous root — refused', 'always the answer', 'impossible'], answer: 1, explain: 'Option 1 is the definition: the candidate satisfies the transformed equation but not the original — most often because a logarithm\'s argument turns negative — so it is an extraneous root and must be refused; the fourth Illustration refuses $(−3 − \\sqrt{13})/2 \\approx -3.3028$ exactly this way. Option 0 keeps a number at which the original equation is not even defined — the logarithm of a negative argument does not exist, so the claimed "solution" is a false statement. Option 2 confuses manufacture with survival: the move may produce one or several candidates, and the extraneous one is precisely the one the court rejects — never the answer. Option 3 says it cannot happen; it happens whenever a domain-widening move is run without its receipt — squaring a radical, combining logarithms, exponentiating — which is exactly why the domain check is the standing final move of the program.' },
      { q: '$3^{2x} - 8\\cdot 3^x - 9 = 0$ has how many real roots?', options: ['0', '1', '2', 'infinitely many'], answer: 1, explain: 'Option 1: put $t = 3^x$ with $t > 0$, and the equation reads $t^2 - 8t - 9 = (t - 9)(t + 1) = 0$, giving $t = 9$ or $t = -1$; the range law of 9.1 refuses $t = -1$ ($3^x > 0$ always), so $3^x = 9 = 3^2$ gives the single root $x = 2$ — the engine checks $81 - 72 - 9 = 0$ and a sweep finds exactly one solution. Option 0 is refuted by the exhibit: at $x = 2$ the left side reads $0$ exactly. Option 2 counts the QUADRATIC\'s roots instead of the equation\'s: the second root $t = -1$ is dead on arrival, and no real exponent answers to it. Option 3 forgets that after the substitution the equation is a quadratic with exactly two $t$-candidates of which at most one $x$ per surviving $t$ exists — a finite count, pinned by the engine sweep.' },
      { q: 'For $0 < a < 1$, the inequality $\\log_a x > 2$ means', options: ['$x > a^2$', '$0 < x < a^2$', '$x > 1/a^2$', '$x < 0$'], answer: 1, explain: 'Option 1 is the direction law at the falling family: the base $a < 1$ makes the machine DECREASE, so the comparison reverses when translated — $\\log_a x > 2 \\iff 0 < x < a^2$ (run the falling machine past the exponent $2$ and it lands BELOW $a^2$; the engine sweep at $a = \\tfrac{1}{2}$ pins $0 < x < \\tfrac{1}{4}$, since $\\log_{1/2}(\\tfrac{1}{8}) = 3 > 2$ while $\\log_{1/2}(\\tfrac{1}{2}) = 1 < 2$). Option 0 is the rising-family read at $a > 1$: at $a = \\tfrac{1}{2}$ it would claim $x > \\tfrac{1}{4}$, but $\\log_{1/2} 8 = -3 < 2$ refutes it. Option 2 flips the base instead of the comparison: at $a = \\tfrac{1}{2}$ one has $1/a^2 = 4$, and $\\log_{1/2} 5 \\approx -2.32 < 2$, so the claim $x > 4$ fails at its first witness. Option 3 leaves the domain entirely — logarithms are defined for $x > 0$ only, so "$x < 0$" is a refusal, not a solution set.' },
      { q: 'The equation $\\log_2(x + 2) = 4 - x$ has', options: ['no solution', 'exactly one solution, $x = 2$', 'exactly two solutions', 'infinitely many solutions'], answer: 1, explain: 'Option 1 is the exhibit-certificate chain: at $x = 2$ both sides read $2$ ($\\log_2 4 = 2$ and $4 - 2 = 2$), so a root exists; and $h(x) = \\log_2(x + 2) + x - 4$ is strictly increasing (a rising logarithmic term plus slope $1$), so at most one root exists — hence exactly one, $x = 2$. Option 0 is refuted by the exhibit itself, which is the first move of the craft. Option 2 would need the curves to cross twice, but a strictly increasing $h$ cannot return to $0$ after leaving it — the monotonicity cap forbids the second crossing, and the engine sweep of the domain finds exactly one root. Option 3 meets the same cap: infinitely many solutions would need $h = 0$ on an interval, impossible for a strictly increasing function whose forward differences are all positive.' },
    ] },

    // ============================================================ exercises
    { kind: 'exercises', title: 'Exercises 9.4', sets: [
      { level: 'L1', questions: [
        { q: 'Solve $\\log_3(x - 1) = 2$.', solution: [
          'Read the shape: one logarithm equal to a constant — run the machine backwards, no tables needed.',
          'So, exponentiate: $x - 1 = 3^2 = 9$, giving $x = 10$.',
          'Now, check the domain and the value: $x = 10 > 1$ keeps the argument positive ($x - 1 = 9 > 0$), and $\\log_3 9 = 2$ reads the equation back exactly.',
          'Hence $x = 10$.',
        ], answer: 'x = 10' },
        { q: 'Solve $2^x = 32$.', solution: [
          'Read the shape: one power of $2$ equal to a number that is itself a power of $2$ — the same-base law applies at sight.',
          'So, $32 = 2^5$, and $2^x = 2^5 \\iff x = 5$ by the one-one machine.',
          'Check: $2^5 = 32$ exactly (engine-pinned), and no domain rider applies to a pure exponential equation.',
          'Hence $x = 5$.',
        ], answer: 'x = 5' },
        { q: 'State the domain of $\\log_5(x + 2) + \\log_5(x - 6)$, with one legal witness and two refusals.', solution: [
          'Set up: the domain of a sum of logarithms is where EVERY argument is positive — the intersection of the walls, never the union.',
          'So, the walls: $x + 2 > 0$ gives $x > -2$, and $x - 6 > 0$ gives $x > 6$.',
          'Now, the binding constraint: $x > 6$ already implies $x > -2$, so the domain is the single half-line $x > 6$.',
          'Check with witnesses: $x = 7$ is legal (arguments $9$ and $1$); $x = 6$ is refused (the second argument is $0$ — the machine never outputs $0$); $x = 0$ is refused (the second argument is $-6$).',
          'Hence the domain is $x > 6$.',
        ], answer: 'x > 6 (witness 7; refusals 6 and 0)' },
      ] },
      { level: 'L2', questions: [
        { q: 'Solve $\\log_3(x + 6) - \\log_3(x - 2) = 2$.', solution: [
          'Set up — the domain first: $x + 6 > 0$ and $x - 2 > 0$, so $x > 2$; the court is open only there.',
          'Combine, by the quotient law of 9.3: $\\log_3\\left(\\dfrac{x + 6}{x - 2}\\right) = 2$.',
          'Exponentiate: $\\dfrac{x + 6}{x - 2} = 3^2 = 9$, so $x + 6 = 9x - 18$, giving $24 = 8x$ and $x = 3$.',
          'Check: $3 > 2$ ✓ — both arguments positive — and $\\dfrac{3 + 6}{3 - 2} = 9 = 3^2$ exactly, so the original equation reads $2$ at $x = 3$.',
          'Hence $x = 3$.',
        ], answer: 'x = 3' },
        { q: 'Solve $4^{x+1} = 8^{2-x}$.', solution: [
          'Set up: two powers of DIFFERENT bases — the craft of 9.1 is to write both at the common base $2$.',
          'So, $4^{x+1} = \\left(2^2\\right)^{x+1} = 2^{2x+2}$ and $8^{2-x} = \\left(2^3\\right)^{2-x} = 2^{6-3x}$.',
          'Now, the same-base law: $2x + 2 = 6 - 3x$, so $5x = 4$ and $x = \\tfrac{4}{5}$.',
          'Check: both sides equal $2^{3.6} = 12.1257325$ (the engine agrees to $10^{-9}$) — the collapse is exact, not approximate.',
          'Hence $x = \\tfrac{4}{5}$.',
        ], answer: 'x = 4/5' },
        { q: 'Solve $\\log_9 x + \\log_3 x = \\tfrac{5}{2}$.', solution: [
          'Set up: two logarithms of the same argument at different bases — unify by the change-of-base law of 9.3: $\\log_9 x = \\dfrac{\\log_3 x}{\\log_3 9} = \\dfrac{1}{2}\\log_3 x$.',
          'So, the equation reads $\\tfrac{3}{2}\\log_3 x = \\tfrac{5}{2}$, hence $\\log_3 x = \\tfrac{5}{3}$.',
          'Now, exponentiate: $x = 3^{5/3}$, which the engine pins as $6.2402515 \\approx 6.2403$.',
          'Check: $\\log_3(3^{5/3}) = \\tfrac{5}{3}$ and $\\log_9(3^{5/3}) = \\tfrac{5}{6}$; the sum is $\\tfrac{5}{3} + \\tfrac{5}{6} = \\tfrac{5}{2}$ exactly, and the domain $x > 0$ is clear.',
          'Hence $x = 3^{5/3} \\approx 6.2403$.',
        ], answer: 'x = 3^(5/3) ≈ 6.2403' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $\\log_{10}(3 - x) = 2\\log_{10}(x + 2)$, showing the domain court in full.', solution: [
          'Set up — the domain FIRST: $3 - x > 0$ and $x + 2 > 0$ together read $-2 < x < 3$; the court is open on that band only.',
          'Now, exponentiate (the power law on the right, legal since $x + 2 > 0$ on the band): $3 - x = (x + 2)^2$.',
          'The quadratic: $x^2 + 5x + 1 = 0$, so $x = \\dfrac{-5 \\pm \\sqrt{21}}{2}$ — two candidates, $\\approx -0.2087$ and $\\approx -4.7913$.',
          'The court: $\\dfrac{-5 - \\sqrt{21}}{2} \\approx -4.7913$ fails the wall $x + 2 > 0$ (it would ask the logarithm of $-2.7913$) — REFUSED, extraneous; $\\dfrac{-5 + \\sqrt{21}}{2} \\approx -0.2087$ sits inside $(-2, 3)$ with both arguments positive.',
          'Check: at the survivor the identity $3 - x = (x + 2)^2$ holds exactly (the engine verifies it to $10^{-12}$), so the original equation reads equal sides; at the refused root the squared identity ALSO holds — the move manufactured it — but the term $x + 2$ is negative there.',
          'Hence $x = \\dfrac{-5 + \\sqrt{21}}{2} \\approx -0.2087$ — one solution, one refusal named.',
        ], answer: 'x = (−5 + √21)/2 ≈ −0.2087', figures: [
          { caption: 'The domain band $(-2, 3)$ with both quadratic candidates dropped: $(−5 − \\sqrt{21})/2 \\approx -4.79$ falls outside and is refused; $(−5 + \\sqrt{21})/2 \\approx -0.21$ survives inside.', svg: solCourtL3a94Svg() },
        ] },
        { q: 'Solve $2^{2x} - 5\\cdot 2^x + 6 = 0$.', solution: [
          'Set up: the hidden quadratic — put $t = 2^x$ with $t > 0$: the equation becomes $t^2 - 5t + 6 = 0$.',
          'Factor: $(t - 2)(t - 3) = 0$, so $t = 2$ or $t = 3$ — both positive, so the range court refuses nobody.',
          'Now, solve each: $2^x = 2$ gives $x = 1$; $2^x = 3$ gives $x = \\log_2 3 \\approx 1.5849625$ — an honest irrational read, not a round number.',
          'Check the engine side: at $x = 1$ the left side reads $4 - 10 + 6 = 0$ exactly; at $x = \\log_2 3$ it reads $9 - 15 + 6 = 0$ (for $2^{2x} = 9$ and $2^x = 3$) — both exact, and the bisection sweep locates exactly these two roots.',
          'Hence $x \\in \\{1,\\ \\log_2 3\\}$ — two solutions, no refusals.',
        ], answer: 'x = 1 or x = log₂ 3 ≈ 1.5850' },
        { q: 'Solve $\\log_{1/2}(x^2 - 4x + 5) \\geq -1$.', solution: [
          'Set up: the base $\\tfrac{1}{2} < 1$ — the FALLING family, so the read REVERSES: $x^2 - 4x + 5 \\leq \\left(\\tfrac{1}{2}\\right)^{-1} = 2$. The rider: $x^2 - 4x + 5 = (x - 2)^2 + 1 > 0$ for every $x$ — the argument never vanishes, so the court is free.',
          'The quadratic: $x^2 - 4x + 3 \\leq 0$, i.e. $(x - 1)(x - 3) \\leq 0$, so $1 \\leq x \\leq 3$.',
          'Check: at $x = 1$ and $x = 3$ the argument reads exactly $2$ — equality is admitted by $\\geq$, so both ends are closed; at $x = 2$ it reads $1 \\leq 2$ ✓.',
          'Hence $x \\in [1, 3]$.',
          'A cautionary twin, engine-pinned: replace the argument by $x^2 - 4x + 3$ and the rider BITES — the flip would give $[2 - \\sqrt{3}, 2 + \\sqrt{3}] \\approx [0.2679, 3.7321]$, but the argument vanishes on $[1, 3]$, so the honest answer breaks into $[2 - \\sqrt{3}, 1) \\cup (3, 2 + \\sqrt{3}]$: two pieces, with $x = 2$ refused outright ($x^2 - 4x + 3 = -1 < 0$). The constant is the whole game.',
        ], answer: 'x ∈ [1, 3] (the twin x² − 4x + 3 would give [2 − √3, 1) ∪ (3, 2 + √3])' },
      ] },
      { level: 'L4', questions: [
        { q: 'Count the real solutions of $\\log_2(3x - 1) = \\log_{1/2}\\left(\\dfrac{4}{x}\\right)$, and name the solution.', solution: [
          'Set up — the domain first: $3x - 1 > 0$ and $\\dfrac{4}{x} > 0$ together read $x > \\dfrac{1}{3}$.',
          'Flip the right side by the base-symmetry law ($\\log_{1/2} u = -\\log_2 u$) and gather: $\\log_2(3x - 1) + \\log_2\\left(\\dfrac{4}{x}\\right) = 0$.',
          'Combine and exponentiate: $\\log_2\\left(\\dfrac{4(3x - 1)}{x}\\right) = 0$, so $\\dfrac{12x - 4}{x} = 1$, i.e. $12x - 4 = x$, giving $11x = 4$ and $x = \\dfrac{4}{11}$.',
          'Count: the collapsed equation is LINEAR — one candidate exists, and it survives the court ($\\dfrac{4}{11} \\approx 0.3636 > \\dfrac{1}{3}$, with $3x - 1 = \\dfrac{1}{11} > 0$); the engine confirms the two sides agree to $10^{-12}$, and the monotone difference caps the count at one.',
          'Hence exactly ONE real solution, $x = \\dfrac{4}{11}$.',
        ], answer: 'exactly one solution: x = 4/11' },
        { q: 'Solve $x^{\\log_4 x} = 64x^2$ (with $x > 0$).', solution: [
          'Set up: the unknown sits in the base AND the exponent — only a logarithm pulls it down. Take $\\log_4$ of both sides; the move is safe because the machine is one-one.',
          'The take: the left side reads $\\log_4\\left(x^{\\log_4 x}\\right) = (\\log_4 x)^2$ by the power law, and the right side reads $\\log_4(64x^2) = \\log_4 64 + 2\\log_4 x = 3 + 2\\log_4 x$.',
          'The quadratic in $t = \\log_4 x$: $t^2 - 2t - 3 = 0$, i.e. $(t - 3)(t + 1) = 0$, so $t = 3$ or $t = -1$.',
          'Now, exponentiate back: $x = 4^3 = 64$ or $x = 4^{-1} = \\tfrac{1}{4}$ — both positive, so the domain court waves both through.',
          'Check: $64^{\\log_4 64} = 64^3 = 262144 = 64\\cdot 64^2$ ✓ and $\\left(\\tfrac{1}{4}\\right)^{\\log_4(1/4)} = \\left(\\tfrac{1}{4}\\right)^{-1} = 4 = 64\\cdot\\tfrac{1}{16}$ ✓ — both exact (engine), and the bisection sweep finds exactly these two roots.',
          'Hence $x \\in \\left\\{64,\\ \\tfrac{1}{4}\\right\\}$.',
        ], answer: 'x = 64 or x = 1/4' },
        { q: 'Solve $\\log_{0.25}(x - 1) > -2$.', solution: [
          'Set up: the base $0.25 = \\tfrac{1}{4} < 1$ — the FALLING family, so the read REVERSES: $x - 1 < \\left(\\tfrac{1}{4}\\right)^{-2} = 16$. The rider: $x - 1 > 0$, i.e. $x > 1$.',
          'So, intersect the two: $1 < x < 17$ — a band, not a ray, because the flip bends the answer back toward the origin.',
          'Check: $x = 5$ is inside, and indeed $\\log_{1/4} 4 = -1 > -2$ ✓; $x = 17$ itself reads $\\log_{1/4} 16 = -2$ — equality, excluded by the strict $>$; $x = 18$ reads $\\log_{1/4} 17 < -2$ — outside ✓; $x = 1$ is refused (argument $0$), as is every $x \\leq 1$.',
          'Hence $x \\in (1, 17)$.',
        ], answer: '1 < x < 17', figures: [
          { caption: 'The answer band $(1, 17)$: the teal wall at $x = 1$ is the domain rider, the orange wall at $x = 17$ is the strict wall from the flipped read $x - 1 < 16$ — with the witness $x = 5$ inside and the point $x = 18$ refused outside.', svg: solBandL4c94Svg() },
        ] },
      ] },
      { level: 'L5', questions: [
        { q: 'Solve $\\log_3(x + 5) = 5 - x$: prove the solution is unique, then locate it numerically.', solution: [
          'Set up: a logarithm against a line — different families, no closed form coming. Gather $h(x) = \\log_3(x + 5) + x - 5$ on the domain $x > -5$; the logarithmic term is strictly increasing (base $3 > 1$, argument rising) and the $+x$ term has slope $1$, so $h$ is strictly increasing and the equation has at most one root.',
          'Now, the integer hunt fails honestly: $h(1) = \\log_3 6 - 4 \\approx 1.6309 - 4 = -2.3691 < 0$; and at $x = 4$ the left side reads $\\log_3 9 = 2$ while the right side reads $1$ — close, but no integer root exists.',
          'The bracket: $h(3) = \\log_3 8 - 2 \\approx -0.1072 < 0 < h(3.5) \\approx 0.4480$, so THE one root lies in $(3, 3.5)$ — existence by the chapter 2 sign-change craft ($h$ is continuous).',
          'The engine bisection (tolerance $10^{-11}$) pins $x \\approx 3.0963$ to four decimals — $3.0963172$ to seven — with both sides reading $y = 5 - x \\approx 1.9037$.',
          'Hence the equation has exactly one solution, located — not solved for — at $x \\approx 3.0963$: existence by the sign bracket, uniqueness by monotonicity, the value by bisection.',
        ], answer: 'exactly one solution, x ≈ 3.0963 (engine bisection, 4 dp)', figures: [
          { caption: 'The single crossing of $y = \\log_3(x + 5)$ (green) with $y = 5 - x$ (amber), both sampled from their formulas: the engine\'s bisection pins it at $x \\approx 3.0963$ (orange dot), with both sides reading $\\approx 1.9037$.', svg: solCrossL5a94Svg() },
        ] },
        { q: 'Solve $\\log_2(x^2 - 2x - 3) > 1$.', solution: [
          'Set up: the base $2 > 1$ — the RISING family keeps the direction: $x^2 - 2x - 3 > 2^1 = 2$. And the rider rides: the argument must stay positive throughout the answer.',
          'The strict quadratic: $x^2 - 2x - 5 > 0$; its roots are $1 \\pm \\sqrt{6}$ ($\\approx -1.4495$ and $\\approx 3.4495$, engine 7 dp: $-1.4494897$, $3.4494897$), and the parabola opens upward, so the strict answer is $x < 1 - \\sqrt{6}$ or $x > 1 + \\sqrt{6}$.',
          'The rider: $x^2 - 2x - 3 = (x + 1)(x - 3) > 0$ holds for $x < -1$ or $x > 3$ — a WIDER pair of wings. The strict walls sit OUTSIDE the rider walls ($-1.4495 < -1$ and $3.4495 > 3$), so every point of the strict answer already clears the rider: nothing is cut.',
          'Check the gap witnesses: $x = -1.2$ is defined (argument $0.84 > 0$) yet fails the strict read ($0.84 < 2$) — the zone between a strict wall and a rider wall, defined but not enough; $x = 0$ is refused outright (argument $-3$); $x = -2$ and $x = 4$ both read argument $5 > 2$ ✓.',
          'Hence $x < 1 - \\sqrt{6}$ or $x > 1 + \\sqrt{6}$ — the strict wings, rider already banked inside them.',
        ], answer: 'x < 1 − √6 ≈ −1.449 or x > 1 + √6 ≈ 3.449', figures: [
          { caption: 'The wings court: the orange strict walls at $1 \\pm \\sqrt{6}$ sit OUTSIDE the teal rider walls at $-1$ and $3$, so the orange wings are the answer — every point on them already keeps the argument positive.', svg: solWingsL5b94Svg() },
        ] },
        { q: 'Solve the system $\\log_2 x + \\log_4 x = 3$ with $y = 2x$ (for $x > 0$).', solution: [
          'Set up: unify the bases first — $\\log_4 x = \\dfrac{\\log_2 x}{\\log_2 4} = \\dfrac{1}{2}\\log_2 x$, the change-of-base law of 9.3.',
          'So, the first equation reads $\\dfrac{3}{2}\\log_2 x = 3$, giving $\\log_2 x = 2$ and $x = 2^2 = 4$.',
          'Now, the second equation: $y = 2x = 8$.',
          'Check: $\\log_2 4 + \\log_4 4 = 2 + 1 = 3$ exactly, the domain $x > 0$ is clear, and the count is one — the collapsed equation is linear in $\\log_2 x$, with nothing to fork.',
          'Hence $(x, y) = (4, 8)$.',
        ], answer: 'x = 4, y = 8' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the inequality direction law in both families from the shape laws of lesson 9.1, then price it on the pair $\\log_{1/2}(x^2 - 4x + 5) \\geq -1$ and $\\log_2(x^2 - 4x + 5) \\geq 1$: the same quadratic, opposite verdicts.', solution: [
          'Proof, the rising family ($a > 1$): the machine $x \\mapsto a^x$ is strictly increasing by 9.1\'s shape law, and so is its mirror $\\log_a$. A strictly increasing map preserves order in both directions, so $\\log_a x > c \\iff \\log_a x > \\log_a(a^c) \\iff x > a^c$ — each arrow is monotonicity, once in each direction.',
          'Proof, the falling family ($0 < a < 1$): the machine strictly DECREASES, so exceeding $c$ in exponent lands BELOW $a^c$ in value: $\\log_a x > c \\iff 0 < x < a^c$, with the domain supplying the left wall. The flip law reaches the same place: $\\log_a x = -\\log_{1/a} x$ with $1/a > 1$, so $\\log_a x > c \\iff \\log_{1/a} x < -c \\iff 0 < x < (1/a)^{-c} = a^c$ — one route, two derivations, one answer.',
          'Price it, the falling read: $\\log_{1/2}(x^2 - 4x + 5) \\geq -1$ reverses to $x^2 - 4x + 5 \\leq 2$, i.e. $(x - 1)(x - 3) \\leq 0$ (the rider is free: $(x - 2)^2 + 1 > 0$ always), so $x \\in [1, 3]$.',
          'Price it, the rising read of the SAME quadratic: $\\log_2(x^2 - 4x + 5) \\geq 1$ keeps the direction: $x^2 - 4x + 5 \\geq 2$, i.e. $(x - 2)^2 \\geq 1$, so $x \\leq 1$ or $x \\geq 3$.',
          'Hence the pair reads $[1, 3]$ against $x \\leq 1$ or $x \\geq 3$ — one quadratic, two families, opposite verdicts; the engine pins every witness: $x = 0$ is kept by base $2$ (argument $5 \\geq 2$) and refused by base $\\tfrac{1}{2}$ ($5 > 2$ flips it out), while $x = 2$ is refused by base $2$ (argument $1 < 2$) and kept by base $\\tfrac{1}{2}$ ($\\log_{1/2} 1 = 0 \\geq -1$).',
        ], answer: 'base ½: x ∈ [1, 3]; base 2: x ≤ 1 or x ≥ 3 — opposite verdicts from the same quadratic' },
        { q: 'Prove the monotonicity theorem — if $f$ is strictly monotone on an interval, then $\\log_a(f(x)) = c$ has at most one solution there — and use it to prove that $\\log_2(x + 2) = 4 - x$ has exactly one root.', solution: [
          'Proof: the equation $\\log_a(f(x)) = c$ reads $f(x) = a^c$ by the inverse identity (legal wherever $f(x) > 0$, which the equation itself forces). A strictly monotone $f$ is one-one — distinct inputs give distinct outputs — so $f(x) = a^c$ for at most ONE $x$ in the interval: at most one solution. The direction of the monotonicity is irrelevant to the count: increasing $f$ with $a > 1$, decreasing $f$ with $a < 1$ — either composition is monotone, and either caps it.',
          'Now, apply it: $\\log_2(x + 2) = 4 - x$ is not yet of that form — the right side is a moving target. Gather it: $h(x) = \\log_2(x + 2) + x - 4 = 0$.',
          'The cap: $\\log_2(x + 2)$ is strictly increasing (the argument rises, base $2 > 1$ — a composition of increasing maps) and $x$ is strictly increasing, so their sum $h$ is strictly increasing: at most one root.',
          'The existence bracket: $h(1) = \\log_2 3 - 3 \\approx -1.4150 < 0$ and $h(3) = \\log_2 5 - 1 \\approx 1.3219 > 0$ (the engine\'s honest values), and $h$ is continuous — a continuous function that changes sign owns a root in the bracket (chapter 2\'s craft).',
          'Hence exactly one root — and the exhibit names it: $h(2) = \\log_2 4 + 2 - 4 = 2 - 2 = 0$, so $x = 2$: existence by bracket and exhibit, uniqueness by monotonicity.',
        ], answer: 'exactly one root, x = 2 (bracket h(1) < 0 < h(3), cap by monotonicity, exhibit at x = 2)' },
      ] },
    ] },
  ],
}


// ------------------------------------------------------------------
// lesson 9.5 — run 121 (the whole-chapter swarm), integrated verbatim
// ------------------------------------------------------------------

/**
 * Advanced Algebra — lesson 9.5 “Exponential and Logarithmic Series”
 * (part-aa95.ts; authored by agent aa95 of the run-121 whole-chapter swarm).
 *
 * PROVENANCE: ground = the Hall & Knight Higher Algebra ch. XVII method
 * shapes (`hall-knight-higher-algebra`: the binomial route to e^x, the
 * log(1+x) series with its validity interval, the μ table-construction
 * formulas) + the Cengage presentation contract (`cengage-jee-style`) + the
 * JEE Main unit list (`jee-main-2026-syllabus`) + the m1-01 module
 * (`cengage-m1-01`). STUDY-NEVER-REPRODUCE absolute: every series witness,
 * partial, figure, Illustration, quiz item and exercise below is OUR OWN,
 * engine-pinned in temporary-references/v-aa95.ts (the engine sections green
 * before this prose was written, grown as the prose demanded more pins; the
 * pin section J re-runs after).
 *
 * THE HONESTY LAW OF THIS LESSON: the series are derived where banked tools
 * reach (e^x via the binomial theorem), stated with exact validity intervals
 * where the proof is calculus’s doorstep (log(1+x)), verified numerically on
 * engine witnesses throughout, and the convergence proofs are NAMED as
 * deferred to chapter 10 — the platform’s stated-not-proved discipline.
 */

// ---------------------------------------------------------------- SVG helpers

function arrow95(x1: number, y1: number, x2: number, y2: number, color: string): string {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const px = -uy
  const py = ux
  const a1x = x2 - ux * 11 + px * 5.5
  const a1y = y2 - uy * 11 + py * 5.5
  const a2x = x2 - ux * 11 - px * 5.5
  const a2y = y2 - uy * 11 - py * 5.5
  return `<line x1="${x1}" y1="${y1}" x2="${(x2 - ux * 10).toFixed(1)}" y2="${(y2 - uy * 10).toFixed(1)}" stroke="${color}" stroke-width="2.2"/><path d="M ${x2} ${y2} L ${a1x.toFixed(1)} ${a1y.toFixed(1)} L ${a2x.toFixed(1)} ${a2y.toFixed(1)} Z" fill="${color}"/>`
}

// Body figure 1 — the partials staircase: the bars of S4, S6, S9, S11 on an
// honest linear value axis (2.60..2.75) climbing to the dashed e-line, plus
// the gap ladder beneath (bar length proportional to minus log10 of the gap).
function partialsStaircase95Svg(): string {
  const E = 2.718281828459045
  const V_LO = 2.6
  const V_HI = 2.75
  const A_TOP = 90
  const A_BASE = 250
  const yA = (v: number): number => A_BASE - ((v - V_LO) / (V_HI - V_LO)) * (A_BASE - A_TOP)
  const yE = yA(E)
  const bars = [
    { n: 4, S: 2.6666667, gap: '0.0516152', gapNum: 0.0516152 },
    { n: 6, S: 2.7166667, gap: '0.0016152', gapNum: 0.0016152 },
    { n: 9, S: 2.7182788, gap: '3.06×10⁻⁶', gapNum: 3.0586e-6 },
    { n: 11, S: 2.7182818, gap: '2.73×10⁻⁸', gapNum: 2.7313e-8 },
  ]
  const centers = [118, 208, 298, 388]
  const BW = 56
  let panelA = ''
  for (const gv of [2.75, 2.7, 2.65, 2.6]) {
    panelA += `<line x1="60" y1="${yA(gv).toFixed(1)}" x2="560" y2="${yA(gv).toFixed(1)}" stroke="#5eead4" stroke-width="1.2"/><text x="54" y="${(yA(gv) + 4).toFixed(1)}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="end">${gv.toFixed(2)}</text>`
  }
  bars.forEach((b, i) => {
    const cx = centers[i]
    const top = yA(b.S)
    panelA += `<rect x="${cx - BW / 2}" y="${top.toFixed(1)}" width="${BW}" height="${(A_BASE - top).toFixed(1)}" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
    panelA += `<text x="${cx}" y="${(top + 14).toFixed(1)}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">${b.S.toFixed(7)}</text>`
    panelA += `<text x="${cx}" y="${A_BASE + 18}" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">${b.n} terms</text>`
  })
  panelA += `<line x1="60" y1="${yE.toFixed(1)}" x2="560" y2="${yE.toFixed(1)}" stroke="#ea580c" stroke-width="2.2" stroke-dasharray="7 5"/><text x="566" y="${(yE - 6).toFixed(1)}" font-size="10.5" font-weight="800" fill="#ea580c">e = 2.7182818</text>`
  panelA += `<text x="118" y="${(yA(2.6666667) - 10).toFixed(1)}" font-size="9.5" font-weight="700" fill="#d97706" text-anchor="middle">gap 0.0516152</text>`
  panelA += `<text x="208" y="${(yE - 16).toFixed(1)}" font-size="9.5" font-weight="700" fill="#d97706" text-anchor="middle">gap 0.0016152</text>`
  panelA += `<text x="298" y="${(yE - 28).toFixed(1)}" font-size="9.5" font-weight="700" fill="#d97706" text-anchor="middle">gap 3.06×10⁻⁶</text>`
  panelA += `<text x="388" y="${(yE - 42).toFixed(1)}" font-size="9.5" font-weight="700" fill="#d97706" text-anchor="middle">gap 2.73×10⁻⁸</text>`
  // the gap ladder: one bar per gap, width proportional to −log10(gap)
  const rows = [316, 344, 372, 400]
  const ORIGIN = 210
  const DECADE = 55
  let panelB = ''
  bars.forEach((b, i) => {
    const w = -Math.log10(b.gapNum) * DECADE
    panelB += `<rect x="${ORIGIN}" y="${rows[i] - 19}" width="${w.toFixed(1)}" height="19" rx="3" fill="#ffedd5" stroke="#ea580c" stroke-width="1.6"/>`
    panelB += `<text x="202" y="${rows[i] - 5}" font-size="10.5" font-weight="700" fill="#166534" text-anchor="end">e − S${b.n}</text>`
    panelB += `<text x="${(ORIGIN + w + 8).toFixed(1)}" y="${rows[i] - 5}" font-size="9.5" font-weight="700" fill="#65a30d">${b.gap}</text>`
  })
  for (let k = 1; k <= 7; k += 1) {
    const x = ORIGIN + k * DECADE
    panelB += `<line x1="${x}" y1="412" x2="${x}" y2="418" stroke="#0f766e" stroke-width="1.3"/><text x="${x}" y="430" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">10⁻${k}</text>`
  }
  return `<svg viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The partials staircase of the exponential series at x equals one, drawn in two panels. Panel one is a bar chart on an honest linear value axis running from 2.60 to 2.75 with gridlines at 2.60, 2.65, 2.70 and 2.75. Four amber bars carry the engine-pinned partial sums: the four-term partial 2.6666667, the six-term partial 2.7166667, the nine-term partial 2.7182788 and the eleven-term partial 2.7182818, each labelled inside with its value and beneath with its term count. A dashed orange line at e equals 2.7182818 runs across the panel; gap labels above the bars read gap 0.0516152, gap 0.0016152, gap 3.06 times ten to the minus six and gap 2.73 times ten to the minus eight — the last two gaps are invisible at this scale. Panel two is the gap ladder: one orange bar per gap with bar length proportional to minus the base-ten logarithm of the gap, labelled e minus S4 equals 0.0516152, e minus S6 equals 0.0016152, e minus S9 equals 3.06 times ten to the minus six, e minus S11 equals 2.73 times ten to the minus eight, with decade gridlines at ten to the minus one through ten to the minus seven. The caption notes that each gridline is one decade, so the eleven-term gap is a hundred-millionth of the four-term gap: the staircase is finished to the eye long before it is finished in fact.">
  <text x="310" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the partials staircase: e approached one term at a time</text>
  <text x="310" y="66" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">the value axis starts at 2.60 — the climb is visible; the last two gaps are not</text>
  ${panelA}
  <line x1="60" y1="286" x2="696" y2="286" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="310" y="300" font-size="11" font-weight="800" fill="#0f766e" text-anchor="middle">the gap ladder — bar length ∝ −log₁₀(gap): each gridline is one decade</text>
  ${panelB}
  <text x="310" y="458" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">S₁₁’s gap is a hundred-millionth of S₄’s — the staircase looks finished long before it is</text>
</svg>`
}

// Body figure 2 — the two speeds: the slow alternating harmonic (x = 1) and
// the fast quotient series (x = 1/3) on honest zoomed axes, both against the
// dashed ln 2 line.
function twoSpeeds95Svg(): string {
  const LN2 = 0.6931472
  // panel A: the slow lane, values 0.40..1.10 on y 254..74
  const A_Y = (v: number): number => 254 - ((v - 0.4) / 0.7) * 180
  const slowDots: { x: number; v: number; tag: string }[] = [
    { x: 110, v: 1, tag: 'S₁' },
    { x: 170, v: 0.5, tag: 'S₂' },
    { x: 230, v: 0.8333333, tag: 'S₃' },
    { x: 290, v: 0.5833333, tag: 'S₄' },
    { x: 370, v: 0.6456349, tag: '' },
    { x: 440, v: 0.6881722, tag: '' },
    { x: 510, v: 0.6926474, tag: '' },
  ]
  let panelA = ''
  for (const gv of [1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5]) {
    panelA += `<line x1="80" y1="${A_Y(gv).toFixed(1)}" x2="560" y2="${A_Y(gv).toFixed(1)}" stroke="#5eead4" stroke-width="1.1"/><text x="74" y="${(A_Y(gv) + 4).toFixed(1)}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="end">${gv.toFixed(1)}</text>`
  }
  panelA += `<polyline points="${slowDots.map((d) => `${d.x} ${A_Y(d.v).toFixed(1)}`).join(' ')}" fill="none" stroke="#d97706" stroke-width="1.3" stroke-dasharray="4 3"/>`
  for (const d of slowDots) {
    panelA += `<circle cx="${d.x}" cy="${A_Y(d.v).toFixed(1)}" r="5" fill="#16a34a" stroke="#166534" stroke-width="1.3"/>`
  }
  panelA += `<text x="110" y="${(A_Y(1) - 12).toFixed(1)}" font-size="9.5" font-weight="800" fill="#166534" text-anchor="middle">S₁ = 1</text>`
  panelA += `<text x="170" y="${(A_Y(0.5) + 17).toFixed(1)}" font-size="9.5" font-weight="800" fill="#166534" text-anchor="middle">S₂ = 0.5</text>`
  panelA += `<text x="230" y="${(A_Y(0.8333333) - 12).toFixed(1)}" font-size="9.5" font-weight="800" fill="#166534" text-anchor="middle">S₃ = 0.83</text>`
  panelA += `<text x="290" y="${(A_Y(0.5833333) + 17).toFixed(1)}" font-size="9.5" font-weight="800" fill="#166534" text-anchor="middle">S₄ = 0.58</text>`
  for (const d of [slowDots[4], slowDots[5], slowDots[6]]) {
    panelA += `<line x1="${d.x}" y1="${(A_Y(d.v) + 6).toFixed(1)}" x2="${d.x}" y2="262" stroke="#d97706" stroke-width="1.1" stroke-dasharray="3 3"/>`
  }
  panelA += `<text x="440" y="276" font-size="9.5" font-weight="800" fill="#166534" text-anchor="middle">S₁₀ = 0.6456349 · S₁₀₀ = 0.6881722 · S₁₀₀₀ = 0.6926474</text>`
  const yLn2A = A_Y(LN2)
  panelA += `<line x1="80" y1="${yLn2A.toFixed(1)}" x2="560" y2="${yLn2A.toFixed(1)}" stroke="#ea580c" stroke-width="2.2" stroke-dasharray="7 5"/><text x="566" y="${(yLn2A - 7).toFixed(1)}" font-size="10.5" font-weight="800" fill="#ea580c">ln 2 = 0.6931472</text>`
  // panel B: the fast lane, values 0.66..0.70 on y 456..336
  const B_Y = (v: number): number => 456 - ((v - 0.66) / 0.04) * 120
  const fastDots = [
    { x: 140, v: 0.6666667 },
    { x: 220, v: 0.6913580 },
    { x: 300, v: 0.6930041 },
    { x: 380, v: 0.6931348 },
    { x: 460, v: 0.6931460 },
  ]
  let panelB = ''
  for (const gv of [0.7, 0.69, 0.68, 0.67, 0.66]) {
    panelB += `<line x1="80" y1="${B_Y(gv).toFixed(1)}" x2="560" y2="${B_Y(gv).toFixed(1)}" stroke="#5eead4" stroke-width="1.1"/><text x="74" y="${(B_Y(gv) + 4).toFixed(1)}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="end">${gv.toFixed(2)}</text>`
  }
  const yLn2B = B_Y(LN2)
  panelB += `<line x1="80" y1="${yLn2B.toFixed(1)}" x2="560" y2="${yLn2B.toFixed(1)}" stroke="#ea580c" stroke-width="2.2" stroke-dasharray="7 5"/>`
  panelB += `<polyline points="${fastDots.map((d) => `${d.x} ${B_Y(d.v).toFixed(1)}`).join(' ')}" fill="none" stroke="#d97706" stroke-width="1.3"/>`
  for (const d of fastDots) {
    panelB += `<circle cx="${d.x}" cy="${B_Y(d.v).toFixed(1)}" r="5" fill="#16a34a" stroke="#166534" stroke-width="1.3"/>`
  }
  panelB += `<text x="140" y="471" font-size="9.5" font-weight="800" fill="#166534" text-anchor="middle">S₁ = 0.6666667</text>`
  panelB += `<text x="220" y="471" font-size="9.5" font-weight="800" fill="#166534" text-anchor="middle">S₂ = 0.6913580</text>`
  panelB += `<text x="300" y="471" font-size="9.5" font-weight="800" fill="#166534" text-anchor="middle">S₃ = 0.6930041</text>`
  panelB += `<text x="380" y="471" font-size="9.5" font-weight="800" fill="#166534" text-anchor="middle">S₄ = 0.6931348</text>`
  panelB += `<text x="460" y="471" font-size="9.5" font-weight="800" fill="#166534" text-anchor="middle">S₅ = 0.6931460</text>`
  panelB += `<text x="300" y="${(yLn2B + 22).toFixed(1)}" font-size="10" font-weight="700" fill="#d97706" text-anchor="middle">S₃, S₄, S₅ share this pixel — the run is finished to the eye</text>`
  panelB += `<text x="566" y="${(yLn2B - 8).toFixed(1)}" font-size="10.5" font-weight="800" fill="#ea580c">ln 2 = 0.6931472</text>`
  return `<svg viewBox="0 0 720 510" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The two speeds for computing ln 2 equals 0.6931472, in two panels. Top panel, the slow lane: the alternating harmonic series at x equals one, on a value axis from 0.5 to 1.1 with gridlines every 0.1. Green dots mark the engine-pinned partials S1 equals 1, S2 equals 0.5, S3 equals 0.83, S4 equals 0.58, joined by a dashed line, then S10 equals 0.6456349, S100 equals 0.6881722 and S1000 equals 0.6926474 labelled on a row beneath with leader lines. A dashed orange ln 2 line runs across at 0.6931472: after a thousand terms the dot still sits below the line, with error 0.0004998. Bottom panel, the fast lane: the quotient series at x equals one third, on a value axis from 0.66 to 0.70. Five green dots mark S1 equals 0.6666667, S2 equals 0.6913580, S3 equals 0.6930041, S4 equals 0.6931348 and S5 equals 0.6931460, with a note that S3, S4 and S5 share one pixel against the dashed ln 2 line. The footer states that five fast terms carry an error of 1.13 times ten to the minus six while a thousand slow terms carry 0.0004998.">
  <text x="320" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the two speeds: computing ln 2 = 0.6931472 by partial sums</text>
  <text x="320" y="54" font-size="11" font-weight="800" fill="#0f766e" text-anchor="middle">the slow lane — the alternating harmonic at x = 1: oscillation, then a crawl</text>
  ${panelA}
  <text x="320" y="294" font-size="10.5" font-weight="700" fill="#65a30d" text-anchor="middle">after 1 000 terms: error 0.0004998 — the sixth place takes on the order of a million terms</text>
  <text x="320" y="318" font-size="11" font-weight="800" fill="#0f766e" text-anchor="middle">the fast lane — the quotient series at x = 1/3: five terms land</text>
  ${panelB}
  <text x="320" y="498" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">five fast terms (error 1.13×10⁻⁶) beat a thousand slow terms (error 0.0004998) — the engine’s census</text>
</svg>`
}

// Body figure 3 — the construction bridge: the n = 9 route from log 2 to
// log 3, ending on the direct engine value (the round-trip certificate).
function constructionBridge95Svg(): string {
  const box = (x: number, y: number, w: number, h: number): string =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
  const boxText = (x: number, w: number, ys: number[], texts: string[], colors: string[], sizes: number[]): string => {
    let s = ''
    texts.forEach((t, i) => {
      s += `<text x="${x + w / 2}" y="${ys[i]}" font-size="${sizes[i]}" font-weight="700" fill="${colors[i]}" text-anchor="middle">${t}</text>`
    })
    return s
  }
  const r1y = 56
  const r1h = 64
  const r2y = 166
  const r2h = 66
  let s = ''
  s += box(24, r1y, 212, r1h)
  s += boxText(24, 212, [76, 94, 112], ['the all-plus series at n = 9', 'μ(1/9 + 1/(2·81) + 1/(3·729) + …)', 'sum 0.1177830 × μ = 0.0511525'], ['#166534', '#65a30d', '#65a30d'], [11, 9.5, 10])
  s += arrow95(240, r1y + r1h / 2, 258, r1y + r1h / 2, '#ea580c')
  s += box(262, r1y, 172, r1h)
  s += boxText(262, 172, [76, 94, 112], ['log 9 − log 8', '= 0.0511525', '9 = 3² and 8 = 2³'], ['#166534', '#166534', '#65a30d'], [11.5, 11.5, 10])
  s += arrow95(438, r1y + r1h / 2, 456, r1y + r1h / 2, '#ea580c')
  s += box(460, r1y, 236, r1h)
  s += boxText(460, 236, [76, 94, 112], ['the prime equation', '2 log 3 − 3 log 2 = 0.0511525', 'log 9 = 2 log 3, log 8 = 3 log 2'], ['#166534', '#65a30d', '#65a30d'], [11, 10, 9.5])
  // the elbow from box 3 down and left into box 4
  s += `<path d="M 578 ${r1y + r1h} v 26 H 130 v ${r2y - (r1y + r1h) - 26}" fill="none" stroke="#ea580c" stroke-width="2.2"/>`
  s += `<path d="M 130 ${r2y - 12} l -5.5 11 h 11 z" fill="#ea580c"/>`
  s += box(24, r2y, 212, r2h)
  s += boxText(24, 212, [186, 204, 222], ['2 log 3 = 3(0.3010300) + 0.0511525', '= 0.9030900 + 0.0511525', '= 0.9542425'], ['#166534', '#65a30d', '#166534'], [10, 10, 12])
  s += arrow95(240, r2y + r2h / 2, 258, r2y + r2h / 2, '#ea580c')
  s += box(262, r2y, 172, r2h)
  s += boxText(262, 172, [188, 208, 224], ['log 3 = 0.9542425 / 2', '= 0.4771213', 'the landing'], ['#166534', '#166534', '#0d9488'], [10.5, 14, 10])
  s += arrow95(438, r2y + r2h / 2, 456, r2y + r2h / 2, '#ea580c')
  s += box(460, r2y, 236, r2h)
  s += boxText(460, 236, [186, 204, 222], ['the direct engine value', 'log₁₀ 3 = 0.4771212547', '✓ the round-trip certificate'], ['#166534', '#65a30d', '#d97706'], [11, 10.5, 10.5])
  return `<svg viewBox="0 0 720 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The construction bridge for log ten of three. A flow diagram in two rows of amber boxes joined by orange arrows. Top row, left to right: the all-plus series at n equals nine, mu times the quantity one ninth plus one over two times eighty-one plus one over three times seven hundred twenty-nine and so on, whose sum 0.1177830 times mu is 0.0511525; then log nine minus log eight equals 0.0511525, noting nine is three squared and eight is two cubed; then the prime equation two log three minus three log two equals 0.0511525. An elbow arrow drops from the prime equation to the bottom row. Bottom row, left to right: two log three equals three times 0.3010300 plus 0.0511525, which is 0.9030900 plus 0.0511525 equals 0.9542425; then log three equals 0.9542425 divided by two, which is 0.4771213, the landing; then the direct engine value log ten of three equals 0.4771212547 with a check mark for the round-trip certificate. The footer states that two roads to log three — the series route and the direct computation — meet at 0.4771213 to seven places.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the construction bridge: log 3 built from log 2 by the n = 9 series</text>
  ${s}
  <text x="360" y="264" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">two roads to log 3 — the series route and the direct computation — meet at 0.4771213 to seven places</text>
  <text x="360" y="288" font-size="10" font-weight="700" fill="#65a30d" text-anchor="middle">every arrow is engine-verified: the sum equals ln(9/8) to ten places, and the landing matches the direct value</text>
  <text x="360" y="312" font-size="10" font-weight="700" fill="#d97706" text-anchor="middle">the trick: n = 9 chosen so that 9 and 8 factor over the primes 3 and 2 — the seeds the table already owns</text>
</svg>`
}

// Solution figure (L3c) — the mu bridge from ln 7 to log_10 7.
function muBridgeL3cSvg(): string {
  const b = (x: number, w: number): string => `<rect x="${x}" y="48" width="${w}" height="56" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
  return `<svg viewBox="0 0 720 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The modulus bridge for question L3 c: three boxes joined by arrows reading ln 7 equals 1.9459101, times mu equals 0.4342944819, giving log ten of 7 equals 0.8450980. The footer certifies 0.4342944819 times 1.9459101 equals 0.8450980 — the change of base as one multiplication.">
  <text x="360" y="22" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">the μ bridge: from the natural log to the common log</text>
  ${b(24, 184)}
  <text x="116" y="74" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">ln 7</text>
  <text x="116" y="94" font-size="10.5" font-weight="700" fill="#65a30d" text-anchor="middle">= 1.9459101</text>
  ${arrow95(214, 76, 246, 76, '#ea580c')}
  ${b(254, 198)}
  <text x="353" y="74" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">× μ</text>
  <text x="353" y="94" font-size="10.5" font-weight="700" fill="#65a30d" text-anchor="middle">μ = 0.4342944819</text>
  ${arrow95(458, 76, 490, 76, '#ea580c')}
  ${b(498, 198)}
  <text x="597" y="74" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">log₁₀ 7</text>
  <text x="597" y="94" font-size="10.5" font-weight="700" fill="#65a30d" text-anchor="middle">= 0.8450980</text>
  <text x="360" y="132" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">engine certificate: 0.4342944819 × 1.9459101 = 0.8450980 — the change of base as one multiplication</text>
</svg>`
}

// Solution figure (L4a) — the n = 11 construction route to log 11.
function route11L4aSvg(): string {
  const b = (x: number, y: number, w: number, h: number): string => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
  return `<svg viewBox="0 0 720 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The n equals eleven construction route for log ten of eleven. Top row: the formula log eleven minus log ten equals mu times the all-plus series one eleventh plus one over two times one twenty-one plus one over three times one three three one and so on, then the series sum 0.0953102 times mu equals 0.0413927. Bottom row: log eleven equals one plus 0.0413927 which is 1.0413927, and the direct engine value 1.0413927 with a check mark — the round-trip certificate.">
  <text x="360" y="22" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">the n = 11 construction route: log 11 from log 10</text>
  ${b(24, 44, 316, 60)}
  <text x="182" y="68" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">log 11 − log 10 = μ(1/11 + 1/(2·11²) + 1/(3·11³) + …)</text>
  <text x="182" y="90" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="middle">log 11 − log 10 = log(11/10) = log(1 + 1/10)</text>
  ${arrow95(348, 74, 376, 74, '#ea580c')}
  ${b(384, 44, 312, 60)}
  <text x="540" y="68" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">the all-plus sum = 0.0953102</text>
  <text x="540" y="90" font-size="10" font-weight="700" fill="#65a30d" text-anchor="middle">× μ = 0.0413927</text>
  ${b(24, 124, 316, 52)}
  <text x="182" y="146" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">log 11 = 1 + 0.0413927</text>
  <text x="182" y="166" font-size="12" font-weight="800" fill="#166534" text-anchor="middle">= 1.0413927</text>
  ${arrow95(348, 150, 376, 150, '#ea580c')}
  ${b(384, 124, 312, 52)}
  <text x="540" y="146" font-size="10.5" font-weight="700" fill="#65a30d" text-anchor="middle">direct engine value 1.0413927 ✓</text>
  <text x="540" y="166" font-size="10" font-weight="700" fill="#d97706" text-anchor="middle">the round-trip certificate lands</text>
</svg>`
}

// Solution figure (L4b) — the log ruler for the digits of 2^100.
function logRulerL4bSvg(): string {
  const RUL_Y = 96
  const X0 = 60
  const X1 = 660
  const MARK = X0 + (30.103 / 40) * (X1 - X0)
  let ticks = ''
  for (let k = 0; k <= 4; k += 1) {
    const x = X0 + k * 150
    ticks += `<line x1="${x}" y1="${RUL_Y - 7}" x2="${x}" y2="${RUL_Y + 7}" stroke="#0f766e" stroke-width="1.6"/><text x="${x}" y="${RUL_Y + 22}" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">${k * 10}</text>`
  }
  return `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The log ruler for the digit count of two to the hundredth power. A teal ruler line runs from 0 to 40 on the scale of n times log ten of two, with decade ticks at 0, 10, 20, 30 and 40. An orange marker sits at 30.1030, labelled one hundred times 0.3010300 equals 30.1030. A boxed law reads digits equals the floor of 30.1030 plus one, which is 31, noting the floor is 30 so the count is 31. The footer checks the engine value: two to the hundredth power is 1267650600228229401496703205376 — count the digits, thirty-one, with a check mark.">
  <text x="360" y="22" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">the log ruler: how many digits in 2¹⁰⁰?</text>
  <line x1="${X0}" y1="${RUL_Y}" x2="${X1}" y2="${RUL_Y}" stroke="#0d9488" stroke-width="2.6"/>
  ${ticks}
  <circle cx="${MARK.toFixed(1)}" cy="${RUL_Y}" r="6" fill="#ffedd5" stroke="#ea580c" stroke-width="2.4"/>
  <text x="${MARK.toFixed(1)}" y="${RUL_Y - 14}" font-size="10" font-weight="800" fill="#ea580c" text-anchor="middle">100 × 0.3010300 = 30.1030</text>
  <text x="360" y="${RUL_Y + 46}" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the decade ruler: n × log₁₀ 2 = 100 × 0.3010300 = 30.1030</text>
  <rect x="150" y="156" width="420" height="40" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>
  <text x="360" y="174" font-size="12" font-weight="800" fill="#166534" text-anchor="middle">digits = floor(30.1030) + 1 = 31</text>
  <text x="360" y="190" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="middle">the floor is 30 — the digit count is 31</text>
  <text x="360" y="212" font-size="10" font-weight="700" fill="#d97706" text-anchor="middle">engine check: 2¹⁰⁰ = 1267650600228229401496703205376 — count the digits: 31 ✓</text>
</svg>`
}

// Solution figure (L5c) — the two ladders at ln 2, side by side.
function twoLaddersL5cSvg(): string {
  const LN2 = 0.6931472
  // left panel: the slow lane, values 0.68..0.70 on y 190..90
  const L_Y = (v: number): number => 190 - ((v - 0.68) / 0.02) * 100
  // right panel: the fast lane, values 0.66..0.70 on y 190..90
  const R_Y = (v: number): number => 190 - ((v - 0.66) / 0.04) * 100
  const yLn2L = L_Y(LN2)
  const yLn2R = R_Y(LN2)
  let left = ''
  for (const gv of [0.7, 0.69, 0.68]) {
    left += `<line x1="90" y1="${L_Y(gv).toFixed(1)}" x2="340" y2="${L_Y(gv).toFixed(1)}" stroke="#5eead4" stroke-width="1.1"/><text x="84" y="${(L_Y(gv) + 4).toFixed(1)}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="end">${gv.toFixed(2)}</text>`
  }
  left += `<line x1="90" y1="${yLn2L.toFixed(1)}" x2="340" y2="${yLn2L.toFixed(1)}" stroke="#ea580c" stroke-width="2.2" stroke-dasharray="7 5"/>`
  const slow = [
    { x: 140, v: 0.6881722, lab: '0.6881722', lx: 152, ly: 153 },
    { x: 220, v: 0.6926474, lab: '0.6926474', lx: 232, ly: 130 },
    { x: 300, v: 0.6930222, lab: '0.6930222', lx: 300, ly: 148 },
  ]
  for (const d of slow) {
    left += `<circle cx="${d.x}" cy="${L_Y(d.v).toFixed(1)}" r="5" fill="#16a34a" stroke="#166534" stroke-width="1.3"/><text x="${d.x}" y="206" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${d.x === 140 ? '100' : d.x === 220 ? '1 000' : '4 000'} terms</text>`
    left += `<line x1="${d.x}" y1="${(L_Y(d.v) + 6).toFixed(1)}" x2="${d.x}" y2="196" stroke="#d97706" stroke-width="1" stroke-dasharray="2 2"/>`
    left += `<text x="${d.lx}" y="${d.ly}" font-size="9.5" font-weight="700" fill="#166534">${d.lab}</text>`
  }
  left += `<text x="338" y="${(yLn2L - 8).toFixed(1)}" font-size="9.5" font-weight="800" fill="#ea580c" text-anchor="end">ln 2 = 0.6931472</text>`
  let right = ''
  for (const gv of [0.7, 0.69, 0.68, 0.67, 0.66]) {
    right += `<line x1="400" y1="${R_Y(gv).toFixed(1)}" x2="670" y2="${R_Y(gv).toFixed(1)}" stroke="#5eead4" stroke-width="1.1"/><text x="394" y="${(R_Y(gv) + 4).toFixed(1)}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="end">${gv.toFixed(2)}</text>`
  }
  right += `<line x1="400" y1="${yLn2R.toFixed(1)}" x2="670" y2="${yLn2R.toFixed(1)}" stroke="#ea580c" stroke-width="2.2" stroke-dasharray="7 5"/>`
  const fast = [
    { x: 420, v: 0.6666667 },
    { x: 470, v: 0.6913580 },
    { x: 520, v: 0.6930041 },
    { x: 570, v: 0.6931348 },
    { x: 620, v: 0.6931460 },
  ]
  right += `<polyline points="${fast.map((d) => `${d.x} ${R_Y(d.v).toFixed(1)}`).join(' ')}" fill="none" stroke="#d97706" stroke-width="1.3"/>`
  for (const d of fast) {
    right += `<circle cx="${d.x}" cy="${R_Y(d.v).toFixed(1)}" r="5" fill="#16a34a" stroke="#166534" stroke-width="1.3"/>`
    right += `<text x="${d.x}" y="206" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${d.x === 420 ? '1' : d.x === 470 ? '2' : d.x === 520 ? '3' : d.x === 570 ? '4' : '5'} term${d.x === 420 ? '' : 's'}</text>`
  }
  right += `<text x="420" y="${(R_Y(0.6666667) + 18).toFixed(1)}" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">0.6666667</text>`
  right += `<text x="470" y="${(R_Y(0.6913580) - 12).toFixed(1)}" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">0.6913580</text>`
  right += `<text x="545" y="${(yLn2R + 20).toFixed(1)}" font-size="9.5" font-weight="700" fill="#d97706" text-anchor="middle">S₃, S₄, S₅: 0.6930041 · 0.6931348 · 0.6931460</text>`
  right += `<text x="545" y="${(yLn2R + 36).toFixed(1)}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">three dots share one pixel — the run is finished</text>`
  return `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The two ladders at ln 2, side by side. Left panel, the slow lane on a value axis from 0.68 to 0.70: green dots at 0.6881722 after one hundred terms, 0.6926474 after one thousand terms and 0.6930222 after four thousand terms, all still below the dashed orange ln 2 line at 0.6931472. Right panel, the fast lane on a value axis from 0.66 to 0.70: five green dots climbing 0.6666667, 0.6913580, then 0.6930041, 0.6931348 and 0.6931460 sharing one pixel just below the dashed ln 2 line. The footer reads: five fast terms carry an error of 1.13 times ten to the minus six while four thousand slow terms carry 0.0001250 — the fast lane wins by about one hundred ten times.">
  <text x="360" y="22" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">the two ladders at ln 2: accuracy versus terms</text>
  <text x="215" y="74" font-size="10.5" font-weight="800" fill="#0f766e" text-anchor="middle">the slow lane (x = 1)</text>
  ${left}
  <text x="535" y="74" font-size="10.5" font-weight="800" fill="#0f766e" text-anchor="middle">the fast lane (x = 1/3)</text>
  ${right}
  <text x="360" y="228" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">five fast terms: error 1.13×10⁻⁶ · four thousand slow terms: error 0.0001250 — the fast lane wins by ≈110×</text>
</svg>`
}

// ---------------------------------------------------------------- the lesson

export const lesson95: Lesson = {
  id: 'aa-exponential-and-logarithmic-series',
  number: '9.5',
  title: 'Exponential and Logarithmic Series',
  concepts: [
    'the exponential series for e to the x',
    'the exponential theorem for any base',
    'the logarithmic series and its validity interval',
    'the fast series for the log of a quotient',
    'the modulus mu and the common-log bridge',
    'table construction by consecutive differences',
  ],
  objectives: [
    'Derive the exponential series $e^x = 1 + x + x^2/2! + x^3/3! + \\cdots$ from the binomial theorem of chapter 7 and the ladder of 9.2 — with the termwise limit honestly stated, not proved (chapter 10 named).',
    'State the logarithmic series $\\log(1+x) = x - x^2/2 + x^3/3 - \\cdots$ with its exact validity interval $-1 < x \\le 1$, price its convergence numerically on engine witnesses, and refuse it honestly outside the interval.',
    'Derive the fast series $\\ln\\frac{1+x}{1-x} = 2(x + x^3/3 + x^5/5 + \\cdots)$ and use it to compute $\\ln 2$ to six-place accuracy in five terms.',
    'Use the modulus $\\mu = \\log_{10} e = 0.4342944819$ to bridge natural and common logarithms, and run the table-construction route that builds $\\log_{10} 3$ from $\\log_{10} 2$ via the $n = 9$ consecutive difference.',
    'Cash the series into digit-count questions — the 20 digits of $2^{64}$ and the 31 digits of $2^{100}$ — the census that 9.6’s world of tables asks at scale.',
  ],
  prerequisites: [
    'aa-the-binomial-theorem-any-index',
    'aa-the-exponential-family-every-real-index',
    'aa-geometric-progressions-and-the-infinite-tail',
  ],
  sources: [
    'hall-knight-higher-algebra',
    'cengage-jee-style',
    'jee-main-2026-syllabus',
    'cengage-m1-01',
  ],
  blocks: [
    // ------------------------------------------------------------- the opening
    { kind: 'para', text: 'Lesson 9.2 banked e as a number: the limit of the ladder $\\left(1 + \\tfrac{1}{n}\\right)^{n}$ as $n$ grows, $e = 2.718281828459045$, a value the engine reproduced rung by rung. That is only the number’s first life. The second life is the more important of the two: e is the SUM of the most important series in algebra, $1 + 1 + \\tfrac{1}{2!} + \\tfrac{1}{3!} + \\cdots$, and its shadow $e^{x} = 1 + x + \\tfrac{x^{2}}{2!} + \\tfrac{x^{3}}{3!} + \\cdots$ is the expansion this lesson derives. The two lives meet exactly — the partials of the series climb to the same $2.7182818$ that the ladder approaches — and that meeting is not a coincidence but the identity built below.' },
    { kind: 'para', text: 'The logarithm, meanwhile, has so far been READ rather than computed. Lessons 9.1 through 9.3 defined it, inverted the exponential family, and carried it between bases; but handed $\\ln 2$ or $\\log_{10} 3$ and asked for digits, nothing banked could answer except the patient arithmetic of a series. The discovery that the logarithm is computable by a series is what made logarithm tables possible before electronic anything: Napier’s 1614 logarithms, Briggs’s tables of 1617, and three centuries of navigation, astronomy and commerce all rest on the two expansions this lesson builds. The table construction itself is 9.6’s business; today supplies its engine.' },
    { kind: 'para', text: 'Two honesty notes govern everything below, and they are the platform’s standing discipline. First: the exponential series is DERIVED, from tools already banked — the binomial theorem of chapter 7 together with 9.2’s ladder — with exactly one move stated rather than proved (the termwise limit, named where it happens). The logarithmic series, by contrast, is STATED with its exact validity interval, because the moves that prove it — dividing the geometric series banked in chapter 5’s infinite tail and integrating term by term — are calculus’s doorstep. Second: the convergence of both series, the question of whether the partial sums truly close in, is priced numerically on engine witnesses throughout and DEFERRED to chapter 10 by name, exactly as chapter 8 deferred the fundamental theorem of algebra. Nothing below is smuggled: every number is either derived, stated-with-reason, or engine-verified.' },

    // =============================================================== section 1
    { kind: 'heading', text: 'The Exponential Series' },
    { kind: 'para', text: 'The plan is Hall & Knight’s classic route, and it is beautiful precisely because it uses nothing but banked machinery. Take the rung $\\left(1 + \\tfrac{1}{n}\\right)^{nx}$ of 9.2’s ladder, raised now to a general power $nx$; expand it by the binomial theorem; and watch what happens as $n$ grows. Each coefficient of the expansion is the TARGET coefficient with a small correction $\\tfrac{1}{n}, \\tfrac{2}{n}, \\ldots$ subtracted inside — and those corrections die as $n$ grows. On the left, the rung itself closes on $e^{x}$. The result is the series for $e^{x}$, and the derivation below runs it honestly, one move per step.' },
    { kind: 'derivation', title: 'e to the x, from the binomial theorem', statement: 'For every real $x$ and every integer $n > 1$, the binomial theorem (chapter 7, any index — applicable here since $\\left|\\tfrac{1}{n}\\right| < 1$) expands the ladder rung $\\left(1 + \\tfrac{1}{n}\\right)^{nx}$ into a series whose $r$-th coefficient is the target $\\tfrac{x^{r}}{r!}$ corrected by $\\tfrac{1}{n}$-sized terms; as $n \\to \\infty$ the corrections die, the rung closes on $e^{x}$, and the expansion closes on the exponential series.', steps: [
      { label: 'Expand by the binomial theorem', formula: '\\left(1 + \\tfrac{1}{n}\\right)^{nx} = 1 + nx\\cdot\\tfrac{1}{n} + \\frac{nx(nx-1)}{2!}\\cdot\\tfrac{1}{n^{2}} + \\frac{nx(nx-1)(nx-2)}{3!}\\cdot\\tfrac{1}{n^{3}} + \\cdots', explanation: 'Chapter 7’s theorem, applied to the base $1 + \\tfrac{1}{n}$ with the index $nx$: each term is the index, the index minus one, and so on, over a factorial, times successive powers of the added part $\\tfrac{1}{n}$. The engine certifies the arithmetic of this expansion at $n = 10$, $x = 0.5$ below.' },
      { label: 'Collect each coefficient', formula: '\\left(1 + \\tfrac{1}{n}\\right)^{nx} = 1 + x + \\frac{x\\left(x - \\tfrac{1}{n}\\right)}{2!} + \\frac{x\\left(x - \\tfrac{1}{n}\\right)\\left(x - \\tfrac{2}{n}\\right)}{3!} + \\cdots', explanation: 'The $n$’s cancel: the first term contributes $nx \\cdot \\tfrac{1}{n} = x$; the second collects to $\\tfrac{x(x - 1/n)}{2!}$; the general $r$-th term is $\\tfrac{x(x-\\frac{1}{n})(x-\\frac{2}{n})\\cdots(x-\\frac{r-1}{n})}{r!}$ — the target $\\tfrac{x^{r}}{r!}$ with the corrections $\\tfrac{k}{n}$ subtracted inside the brackets.' },
      { label: 'Let n grow without bound', formula: 'x\\left(x - \\tfrac{1}{n}\\right)\\cdots\\left(x - \\tfrac{r-1}{n}\\right) \\;\\longrightarrow\\; x^{r}', explanation: 'For every fixed $r$, each bracket $\\left(x - \\tfrac{k}{n}\\right)$ differs from $x$ by $\\tfrac{k}{n}$, and $\\tfrac{k}{n} \\to 0$ as $n \\to \\infty$: the corrections die, and the $r$-th coefficient tends to $\\tfrac{x^{r}}{r!}$ — visibly at $n = 10$ versus $n = 100$ in the engine’s table.' },
      { label: 'The left side is the ladder of 9.2', formula: '\\left(1 + \\tfrac{1}{n}\\right)^{nx} = \\left\\{\\left(1 + \\tfrac{1}{n}\\right)^{n}\\right\\}^{x} \\;\\longrightarrow\\; \\{e\\}^{x} = e^{x}', explanation: 'Lesson 9.2 banked $\\left(1 + \\tfrac{1}{n}\\right)^{n} \\to e$; raising the rung to the fixed power $x$ and letting $n$ grow gives $e^{x}$ — the ladder extended from $x = 1$ to every real $x$. The re-read $\\left(1 + \\tfrac{x}{n}\\right)^{n} \\to e^{x}$ is the same fact with the seats exchanged.' },
      { label: 'Match the two limits', formula: 'e^{x} = 1 + x + \\frac{x^{2}}{2!} + \\frac{x^{3}}{3!} + \\cdots + \\frac{x^{r}}{r!} + \\cdots', explanation: 'Both sides of the expansion tend to their limits; the right side tends term by term. THAT termwise passage is the one move this derivation states rather than proves — the honesty note directly below.' },
    ], result: 'For every real $x$: $e^{x} = 1 + x + \\tfrac{x^{2}}{2!} + \\tfrac{x^{3}}{3!} + \\cdots$, the general term being $\\tfrac{x^{r}}{r!}$ — derived from banked tools, with the termwise limit stated, not proved (chapter 10).' },
    { kind: 'callout', tone: 'insight', title: 'Stated, not proved — the termwise limit', text: 'The move that finishes the derivation is the passage $n \\to \\infty$ applied to both sides AT ONCE and TERM BY TERM: that a sum of infinitely many tending terms tends to the sum of the limits is a genuine theorem about interchanging a limit with an infinite sum, and this platform does not prove it here. Chapter 10 meets the ratio test on this very series and settles the convergence question where it belongs. Until then the discipline is the same one chapter 8 applied to the fundamental theorem of algebra: derive what banked tools reach, state the rest plainly, and verify everything on witnesses — the engine checks the series against $e^{x}$ at twenty values across $[-5, 5]$ to six places, at $x = 20$ to twelve significant places, and the coefficient corrections are checked dying at $n = 10$ versus $n = 100$.' },
    { kind: 'para', text: 'The $x = 1$ read deserves its own line, because it closes a circle opened in 9.2. Putting $x = 1$ in the series returns the number itself:' },
    { kind: 'equation', latex: 'e = 1 + 1 + \\frac{1}{2!} + \\frac{1}{3!} + \\frac{1}{4!} + \\cdots \\tag{1}', note: 'the ladder of 9.2 re-derived by series: the same $e = 2.7182818$ arriving by a different road — the engine runs the ladder $2.5937425, 2.7048138, 2.7169239, 2.7181459 \\to 2.7182818$ alongside the partials below.' },
    { kind: 'callout', tone: 'definition', title: 'Partial sums, convergence, divergence', text: 'For a series $u_{1} + u_{2} + u_{3} + \\cdots$, the PARTIAL SUM $S_{n}$ is the sum of its first $n$ terms, $S_{n} = u_{1} + u_{2} + \\cdots + u_{n}$. The series is said to CONVERGE to a number $S$ if the partial sums tend to $S$ as $n$ grows without bound; if they do not, the series is said to DIVERGE. Thus the exponential series at $x = 1$ converges to $e$ (its partials climb to $2.7182818$), while the harmonic series $1 + \\tfrac{1}{2} + \\tfrac{1}{3} + \\cdots$ diverges — its partials pass any bound; the proof of that divergence is chapter 10’s business, and this lesson only names it.' },
    { kind: 'para', text: 'For example, three reads of the partial-sum definition, each on an engine-pinned witness:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the exponential series at $x = 1$: $S_{4} = 2.6666667$ and $S_{11} = 2.7182818$ — converging, by the staircase in the figure below;',
      '(ii) the alternating harmonic $1 - \\tfrac{1}{2} + \\tfrac{1}{3} - \\cdots$ at $x = 1$: $S_{100} = 0.6881722$ and $S_{1000} = 0.6926474$ — converging too, but at a crawl (it is the log series at its endpoint);',
      '(iii) the log series pushed outside its interval at $x = 2$: partials $2,\\ 0,\\ 2.666667,\\ -1.333333,\\ 5.066667,\\ -5.6$ — diverging, with no value to tend to and the swings growing.',
    ] },
    { kind: 'table', caption: 'the partials of the exponential series at x = 1 — every value engine-pinned', head: ['partial sum', 'value', 'gap to e = 2.7182818'], rows: [
      ['$S_{4}$ (4 terms)', '$2.6666667$', '$0.0516152$'],
      ['$S_{6}$ (6 terms)', '$2.7166667$', '$0.0016152$'],
      ['$S_{9}$ (9 terms)', '$2.7182788$', '$3.06 \\times 10^{-6}$'],
      ['$S_{11}$ (11 terms)', '$2.7182818$', '$2.73 \\times 10^{-8}$'],
    ] },
    { kind: 'figure', caption: 'The partials staircase: the bars of S4, S6, S9 and S11 climb an honest linear axis toward the dashed e-line, with the gaps listed; beneath, the gap ladder shows each gap a decade smaller than the last.', svg: partialsStaircase95Svg() },
    { kind: 'para', text: 'Read the staircase honestly. On the linear panel the climb from $S_{4} = 2.6666667$ to $S_{6} = 2.7166667$ is visible, and after that the bars are visually indistinguishable — $S_{9}$ and $S_{11}$ differ from one another by less than a pixel, which is exactly why the gap ladder sits beneath: each of its bars is a decade shorter than the last, from $0.0516152$ down to $2.73 \\times 10^{-8}$. The staircase LOOKS finished at six terms; in fact it is finished to eight places at eleven terms. That distinction — looking done versus being done — is the entire subject of convergence, and the platform will not pretend to have proved it: the partials are engine-verified to close on e at every value of x tested, and the theorem that they must is chapter 10’s.' },
    { kind: 'para', text: 'One more reading before the general base. The general term of the series is $\\tfrac{x^{r}}{r!}$, and its shape explains the speed: the denominator $r!$ outruns the numerator $x^{r}$ for every fixed $x$, which is why the terms eventually collapse — the engine shows the terms of the $x = 1$ series collapsing — $\\tfrac{1}{3!} \\approx 0.1667$, $\\tfrac{1}{4!} \\approx 0.0417$, $\\tfrac{1}{5!} \\approx 0.0083$, each a further division by the next integer — and at $x = 0.1$ the third term is already $0.005$ and the fourth $0.0001667$. WHY the collapse forces the partial sums to close on a limit is the ratio test’s theorem, named for chapter 10; THAT the terms collapse is arithmetic, visible above.' },
    { kind: 'para', text: 'Now the general base. The series above computes $e^{x}$ — powers of e alone. But every legal base $a > 0$ is e raised to its own natural logarithm, so every exponential $a^{x}$ rides the same series with $x \\ln a$ in the seat.' },
    { kind: 'derivation', title: 'Every base rides the series', statement: 'For every base $a > 0$ and every real $x$: $a^{x} = e^{x \\ln a}$, hence $a^{x}$ owns the exponential series with $x \\ln a$ in place of $x$ — the exponential theorem.', steps: [
      { label: 'Take the logarithm of the base', formula: 'a = e^{\\ln a}', explanation: 'The inverse identity banked in 9.2/9.3: $e^{\\ln a} = a$ for every $a > 0$ — the exponential family and the natural logarithm undo one another.' },
      { label: 'Raise to the power x', formula: 'a^{x} = \\left(e^{\\ln a}\\right)^{x} = e^{\\,x \\ln a}', explanation: 'The power law of 9.2: a power of a power multiplies the exponents. The engine certifies the composite numerically — $3^{2} = e^{2\\ln 3}$ and $e^{2 \\ln 5} = 25$, exactly.' },
      { label: 'Substitute into the series', formula: 'a^{x} = 1 + x\\ln a + \\frac{(x \\ln a)^{2}}{2!} + \\frac{(x \\ln a)^{3}}{3!} + \\cdots', explanation: 'The series of this section with $x \\ln a$ in the seat: any base, any real exponent, one series. The engine confirms the series form at $a = 3$, $x = 2$: eighteen terms of $1 + 2\\ln 3 + \\cdots$ return $9$ to nine places.' },
    ], result: 'The exponential theorem: $a^{x} = 1 + x\\ln a + \\tfrac{(x\\ln a)^{2}}{2!} + \\tfrac{(x\\ln a)^{3}}{3!} + \\cdots$ for every base $a > 0$ — engine-certified at $3^{2} = e^{2\\ln 3}$ and $e^{2\\ln 5} = 25$.' },
    { kind: 'example', title: 'Compute $\\sqrt{e} = e^{0.5}$ from the series and state the accuracy six terms buy', steps: [
      'Setup: at $x = 0.5$ the series reads $1 + 0.5 + \\tfrac{0.25}{2} + \\tfrac{0.125}{6} + \\cdots$, so the partials are $S_{2} = 1.5$, $S_{4} = 1.6458333$ and $S_{6} = 1.6486979$ — each engine-pinned.',
      'Compare with the target: $\\sqrt{e} = 1.6487213$ to seven places, so the six-term partial sits $2.34 \\times 10^{-5}$ below it — a gap the engine prices exactly.',
      'So, the accuracy read: $S_{6} = 1.6486979$ already gives $\\sqrt{e}$ to four places, $1.6487$ — six terms of additions and divisions doing the work of a root extraction.',
      'Hence $\\sqrt{e} \\approx 1.6487$ from six terms of the series — no root algorithm invoked, the series as a computing engine.',
    ] },
    { kind: 'example', title: 'Compute $e^{0.1}$ and state how many terms pin seven places', steps: [
      'Setup: at $x = 0.1$ the series begins $1 + 0.1 + 0.005 + 0.0001667 + \\cdots$; the three-term partial is $S_{3} = 1.105$ exactly.',
      'Now, five terms: $S_{5} = 1.1051708$ — the engine reads $e^{0.1} = 1.1051709181$, so five terms differ from the target in the seventh place.',
      'So, six terms: $S_{6} = 1.1051709$ — matching $e^{0.1}$ to seven places; the count of terms that pins a place is an engine census, not a guess.',
      'Hence $e^{0.1} = 1.1051709$ to seven places, pinned by six terms — and the three-term partial $1.105$ already carries three places: the smaller $x$, the faster the run.',
    ] },
    { kind: 'terms', items: [
      { term: 'Exponential series', def: 'the series $1 + x + \\tfrac{x^{2}}{2!} + \\tfrac{x^{3}}{3!} + \\cdots$, equal to $e^{x}$ for every real $x$; at $x = 1$ it sums to $e$ itself.' },
      { term: 'Partial sum', def: 'the sum $S_{n}$ of the first $n$ terms of a series — the staircase this section drew for the exponential series at $x = 1$.' },
      { term: 'General term', def: 'the $r$-th term of the exponential series, $\\tfrac{x^{r}}{r!}$ — factorial denominators, which is where the speed comes from.' },
      { term: 'Modulus (forward reference)', def: 'the constant $\\mu = \\log_{10} e = 0.4342944819$ that bridges natural and common logarithms — the business of the third section below.' },
      { term: 'Convergence (named, deferred)', def: 'the property that partial sums close in on a limit; stated and used here, proved in chapter 10 — the honesty law of this lesson.' },
      { term: 'Termwise limit honesty', def: 'the stated-not-proved move of this section: passing $n \\to \\infty$ through an infinite sum term by term is a real theorem, owned by chapter 10.' },
    ] },

    // =============================================================== section 2
    { kind: 'heading', text: 'The Logarithmic Series' },
    { kind: 'para', text: 'The inverse direction asks the deeper question. The exponential series COMPUTES $e^{x}$ from $x$; the logarithm asks for $x$ GIVEN the value — and the discovery of the seventeenth century was that the logarithm has its own direct expansion, not a reflection of the exponential one. The series is short to state, honest about where it lives, and slow where the exponential series is fast; a three-line combination then repairs the speed, and that combination is the machine that actually built the tables.' },
    { kind: 'callout', tone: 'theorem', title: 'The logarithmic series (stated, with its validity interval)', text: 'For $-1 < x \\le 1$: $\\log(1 + x) = x - \\tfrac{x^{2}}{2} + \\tfrac{x^{3}}{3} - \\tfrac{x^{4}}{4} + \\cdots$, the natural (base-e) logarithm, the general term being $\\tfrac{(-1)^{r+1} x^{r}}{r}$. The platform presents the expansion as Hall & Knight present it: STATED with its exact interval, and verified on witnesses. The derivation the platform would run — dividing the geometric identity $\\tfrac{1}{1+t} = 1 - t + t^{2} - t^{3} + \\cdots$ (banked in chapter 5’s infinite tail for $|t| < 1$) and integrating term by term from $0$ to $x$ — uses exactly the two moves this platform does not yet own: the termwise integration of an infinite series and the interchange it smuggles. Those are calculus’s doorstep, chapter 10’s first floor. At $x = 1$ the series gives $\\ln 2 = 1 - \\tfrac{1}{2} + \\tfrac{1}{3} - \\tfrac{1}{4} + \\cdots$; at $x = -1$ the left side is $\\log 0$, a refusal, and the right side is the divergent harmonic series — the interval’s two ends behave differently, and the interval states exactly how.' },
    { kind: 'equation', latex: '\\log(1 + x) = x - \\frac{x^{2}}{2} + \\frac{x^{3}}{3} - \\frac{x^{4}}{4} + \\cdots, \\qquad -1 < x \\le 1 \\tag{2}', note: 'the logarithmic series with its validity interval: inside it the partials converge to the log (engine-swept at thirteen sample points), at the right endpoint they converge slowly, and outside it they represent nothing.' },
    { kind: 'callout', tone: 'insight', title: 'Stated, not proved — the integration doorstep', text: 'The honesty ledger for this series has two entries. Entry one: the proof route is the termwise integration of the banked geometric series — an interchange-of-limits move of exactly the family deferred at the exponential series, and chapter 10 builds it. Entry two: the convergence behaviour ON the interval — that the partials close in for $-1 < x \\le 1$ and fail to for $x \\le -1$ — is the ratio-and-alternating-series territory of the same chapter. What this lesson OWNS is arithmetic: the engine verifies the series at thirteen points across $[-0.9, 0.95]$ (400 terms within $10^{-3}$), at the endpoint $x = 1$ (4 000 terms within $1.3 \\times 10^{-4}$, closing like $\\tfrac{1}{n}$), and REFUSES it at $x = 2$ and $x = -2$, where the partials swing without limit. Stated, used, verified — never smuggled.' },
    { kind: 'para', text: 'The interval deserves a careful paragraph, because it is where examinations set their traps. INSIDE $(-1, 1)$ the series is well-behaved and the smaller $|x|$, the faster it settles — at $x = 0.02$ four terms already give $\\ln 1.02$ to seven places. AT the endpoint $x = 1$ the series still converges (to $\\ln 2 = 0.6931472$) but slowly, in the alternating fashion the figure below prices. AT $x = -1$ and BEYOND the interval, the series is not merely slow — it is false, and the warn box shows what false looks like numerically. The interval is part of the theorem, not decoration around it.' },
    { kind: 'callout', tone: 'warn', title: 'The interval is not decoration', text: 'At $x = 2$ the series for $\\log(1 + x)$ is nonsense. The terms themselves are $2, -2, 2.666667, -4, 6.4, -10.666667, \\ldots$ — each $\\pm\\tfrac{2^{r}}{r}$, whose magnitudes GROW (the engine checks $\\tfrac{2^{r}}{r}$ increasing for $r \\ge 3$). The partials swing through $2,\\ 0,\\ 2.666667,\\ -1.333333,\\ 5.066667,\\ -5.6$, and by the tenth partial the value is $-64.825397$ — nowhere near $\\ln 3 = 1.0986123$ and drifting farther with every term. Outside $-1 < x \\le 1$ the series simply does not represent the logarithm. The convergence statement that fences the interval belongs to chapter 10, but the fence itself is usable today: substitute inside it or do not substitute at all.' },
    { kind: 'para', text: 'Now the repair of the speed, and it is one of the prettiest three-line derivations in the subject. The slow series at $x$ and the slow series at $-x$ share their even-power terms with opposite signs on the odd ones; subtracting cancels the even powers and doubles the odd ones, and the difference of two logs is the log of a quotient. The result converges like the slow series never could, because its variable can be parked at $\\tfrac{1}{3}$ while its TARGET is still $2$.' },
    { kind: 'derivation', title: 'The fast series, from the two slow ones', statement: 'For $|x| < 1$, the logarithmic series at $x$ and at $-x$ combine into the fast series: $\\ln\\!\\tfrac{1+x}{1-x} = 2\\left(x + \\tfrac{x^{3}}{3} + \\tfrac{x^{5}}{5} + \\cdots\\right)$ — every term of the same sign as $x$, so the partials climb instead of oscillating.', steps: [
      { label: 'Write the series at minus x', formula: '\\log(1 - x) = -x - \\frac{x^{2}}{2} - \\frac{x^{3}}{3} - \\frac{x^{4}}{4} - \\cdots', explanation: 'Substitute $-x$ for $x$ in the stated series — valid for $-1 \\le x < 1$: the odd powers flip sign, the even powers keep theirs, so EVERY term of $\\log(1-x)$ carries the sign that makes the right side negative for $x > 0$.' },
      { label: 'Subtract term by term', formula: '\\log(1 + x) - \\log(1 - x) = 2\\left(x + \\frac{x^{3}}{3} + \\frac{x^{5}}{5} + \\cdots\\right)', explanation: 'Finite algebra on two stated series: the even-power terms cancel identically, the odd-power terms double. Nothing new is claimed — this is bookkeeping on statements already made.' },
      { label: 'The left side is one logarithm', formula: '\\log(1 + x) - \\log(1 - x) = \\log\\!\\frac{1+x}{1-x}', explanation: 'The quotient law of 9.3: a difference of logs is the log of the quotient. The engine verifies the combined identity at six values of $x$ to $10^{-9}$ (200 terms each).' },
      { label: 'Read the speed', formula: '\\frac{x^{3}/3}{x} = \\frac{x^{2}}{3}', explanation: 'Consecutive terms of the fast series shrink by the factor $x^{2}$: parked at $x = \\tfrac{1}{3}$ each term is a NINTH of the last — which is why five terms of the fast series do the work of a thousand of the slow one.' },
    ], result: 'The fast series: $\\ln\\!\\tfrac{1+x}{1-x} = 2\\left(x + \\tfrac{x^{3}}{3} + \\tfrac{x^{5}}{5} + \\cdots\\right)$ for $|x| < 1$ — the computing engine of the table route.' },
    { kind: 'para', text: 'The classic cashing: put $x = \\tfrac{1}{3}$. Then $\\tfrac{1+x}{1-x} = \\tfrac{4/3}{2/3} = 2$, so the fast series computes $\\ln 2$ — the logarithm the slow lane spends a thousand terms failing to reach — from a variable parked at a comfortable third. The partials below are all engine-pinned; note their monotone climb, no oscillation at all.' },
    { kind: 'table', caption: 'the fast lane to ln 2 at x = 1/3, and the slow lane it replaces — engine-pinned values', head: ['terms', 'fast series (x = 1/3)', 'slow series (x = 1), same count'], rows: [
      ['1', '$0.6666667$', '$1$'],
      ['2', '$0.6913580$', '$0.5$'],
      ['3', '$0.6930041$', '$0.8333333$'],
      ['4', '$0.6931348$', '$0.5833333$'],
      ['5', '$0.6931460$', '$0.7833333$'],
      ['—', 'error $1.13 \\times 10^{-6}$', 'still swinging'],
    ] },
    { kind: 'figure', caption: 'The two speeds: the slow alternating harmonic at x = 1 oscillates and crawls (a thousand terms still short of the dashed ln 2 line by 0.0004998), while the fast series at x = 1/3 lands five terms in — all values engine-pinned.', svg: twoSpeeds95Svg() },
    { kind: 'para', text: 'The comparison deserves honest numbers rather than adjectives. Five fast terms carry an error of $1.13 \\times 10^{-6}$ — about one unit in the sixth decimal place. A thousand slow terms carry an error of $0.0004998$: three decimal places, with the fourth still uncertain, and even four thousand slow terms reach only $0.6930222$ (error $0.0001250$). The alternating bound — the engine checks $|S_{n} - \\ln 2| < \\tfrac{1}{n+1}$ at $n = 10, 100, 1000, 4000$ — prices the slow lane exactly: to shrink the error to $1.13 \\times 10^{-6}$ it would need on the order of $882456$ terms. Five versus eight hundred eighty-two thousand: that ratio is the whole content of the phrase "the fast series", and it is why every table ever built used the quotient form.' },
    { kind: 'example', title: 'Compute $\\ln 1.5$ by the slow series at $x = 0.5$, and describe the oscillation', steps: [
      'Setup: $1.5 = 1 + 0.5$, so $\\ln 1.5$ is the stated series at $x = 0.5$: $0.5 - 0.125 + 0.0416667 - 0.015625 + \\cdots$.',
      'Now, the partials: $S_{4} = 0.4010417$, $S_{8} = 0.4053153$ and $S_{12} = 0.4054587$ — engine-pinned, against the target $\\ln 1.5 = 0.4054651$.',
      'So, the oscillation law: every even partial sits BELOW the target and every odd partial ABOVE it — the engine confirms this bracketing for all twelve partials computed ($S_{4} = 0.4010417 < \\ln 1.5 < S_{5} = 0.4072917$, and so on down the ladder).',
      'Hence $\\ln 1.5 = 0.4054651$, approached from both sides at a crawl — at $x = 0.5$ the slow lane needs twelve terms for three places; the honest way to compute it is the fast series at $x = \\tfrac{0.5}{2.5} = 0.2$, where the quotient is exactly $1.5$.',
    ] },
    { kind: 'example', title: 'Compute $\\ln 1.02$ and $\\log_{10} 1.02$: the small-x regime where the slow series shines', steps: [
      'Setup: $1.02 = 1 + 0.02$, so $\\ln 1.02$ is the series at $x = 0.02$: $0.02 - 0.0002 + 0.0000026667 - \\cdots$.',
      'Now, two terms: $0.02 - 0.0002 = 0.0198$ exactly — already $\\ln 1.02$ to three places, because the engine target is $\\ln 1.02 = 0.0198026$.',
      'So, four terms add $0.0000026667$ less the $4 \\times 10^{-8}$ correction and land $0.0198026$ — the full seven places: at this $x$ the series is not slow at all.',
      'Hence $\\log_{10} 1.02 = \\mu \\cdot \\ln 1.02 = 0.4342944819 \\times 0.0198026 = 0.0086002$ — the μ bridge of the next section, previewed on the smallest witness.',
    ] },
    { kind: 'terms', items: [
      { term: 'Logarithmic series', def: 'the expansion $\\log(1+x) = x - \\tfrac{x^{2}}{2} + \\tfrac{x^{3}}{3} - \\cdots$, stated with validity interval $-1 < x \\le 1$; the termwise-integration proof is chapter 10’s doorstep.' },
      { term: 'Validity interval', def: 'the range $-1 < x \\le 1$ inside which the series represents the logarithm: at $x = 1$ it gives $\\ln 2$ slowly; outside it the series represents nothing.' },
      { term: 'The fast series', def: 'the combination $\\ln\\!\\tfrac{1+x}{1-x} = 2\\left(x + \\tfrac{x^{3}}{3} + \\tfrac{x^{5}}{5} + \\cdots\\right)$ for $|x| < 1$ — the computing engine that actually built the tables.' },
      { term: 'Alternating series', def: 'a series whose signs alternate, like the log series at any positive $x$: its partials bracket the limit, even partials below, odd above (engine-verified at $x = 0.5$ for twelve partials).' },
    ] },

    // =============================================================== section 3
    { kind: 'heading', text: 'The Modulus and the Table Construction' },
    { kind: 'para', text: 'Two logarithm systems now coexist in the reader’s toolkit. The SERIES produces natural logarithms — base e, the system in which the mathematics is cleanest, the system the two derivations above speak natively. The TABLES the world wanted were common logarithms — base 10, the system in which multiplication by powers of ten shifts nothing. The bridge between them is a single constant, and that constant converts the entire engine of this lesson into a common-logarithm factory. Lesson 9.3 already derived the change of base; here it meets the series that computes the numbers being changed.' },
    { kind: 'callout', tone: 'definition', title: 'The modulus of the common system', text: 'The number $\\mu = \\log_{10} e = \\tfrac{1}{\\ln 10}$ is said to be the MODULUS of the common system; its engine value is $\\mu = 0.4342944819$. Thus $\\log_{10} x = \\mu \\cdot \\ln x$ for every $x > 0$: multiply a natural logarithm by $\\mu$ and the common logarithm is read off — the multiplication that converted every table ever computed from the series to the page.' },
    { kind: 'derivation', title: 'The modulus, from the change of base', statement: 'The bridge constant $\\mu$ is 9.3’s change-of-base law evaluated once, at the single number $e$: $\\log_{10} x = \\mu \\ln x$ with $\\mu = \\log_{10} e = 1/\\ln 10$.', steps: [
      { label: 'Change the base', formula: '\\log_{10} x = \\frac{\\ln x}{\\ln 10}', explanation: 'The change-of-base law of 9.3, with base 10 on the left and base e on the right: every common log is a natural log divided by $\\ln 10$.' },
      { label: 'Read the constant', formula: '\\mu = \\frac{1}{\\ln 10} = \\log_{10} e = 0.4342944819', explanation: 'The reciprocal of $\\ln 10$ is $\\log_{10} e$ — the same law at $x = e$. The engine pins both directions: $\\mu = 0.4342944819$ and $\\ln 10 = 1/\\mu = 2.3025851$, reciprocals to a unit in the sixteenth place.' },
      { label: 'Substitute', formula: '\\log_{10} x = \\mu \\, \\ln x', explanation: 'One line: the natural-log output of the series times $\\mu$ is the common-log entry of the table. The engine runs $\\mu \\cdot \\ln 2 = 0.3010300$, $\\mu \\cdot \\ln 3 = 0.4771213$ and $\\mu \\cdot \\ln 7 = 0.8450980$, each matching the direct common log to twelve places.' },
    ], result: 'The bridge: $\\log_{10} x = \\mu \\ln x$ with $\\mu = 0.4342944819$ and $\\ln 10 = 1/\\mu = 2.3025851$ — every constant engine-pinned.' },
    { kind: 'table', caption: 'the constants table — natural logs by series, common logs by μ, both engine-pinned', head: ['number', 'ln (natural, the series computes)', 'log₁₀ = μ · ln', 'direct engine value'], rows: [
      ['$2$', '$0.6931472$', '$0.3010300$', '$0.3010299957$'],
      ['$3$', '$1.0986123$', '$0.4771213$', '$0.4771212547$'],
      ['$7$', '$1.9459101$', '$0.8450980$', '$0.8450980400$'],
      ['$10$', '$2.3025851$', '$1$ exactly', '$1$'],
      ['$e$', '$1$ exactly', '$0.4342944819 = \\mu$', '$0.4342944819$'],
    ] },
    { kind: 'para', text: 'Now the construction problem itself — the reason this chapter exists as a chapter. A table of common logarithms wants $\\log_{10} n$ for every integer $n$; the series wants a small $x$ to converge quickly; and the two desires are reconciled by working with CONSECUTIVE DIFFERENCES. The log of $n + 1$ minus the log of $n$ is the log of $1 + \\tfrac{1}{n}$ — the log series at $x = \\tfrac{1}{n}$, a comfortably small $x$ for every $n \\ge 2$. Two formulas fall out, one per sign pattern, and either one prices a single step of the table.' },
    { kind: 'derivation', title: 'The consecutive-difference formulas', statement: 'For every integer $n > 1$, the log series at $x = \\tfrac{1}{n}$ and at $x = -\\tfrac{1}{n}$ prices the two consecutive differences of the table: $\\log(n+1) - \\log n$ (alternating signs) and $\\log n - \\log(n-1)$ (all plus).', steps: [
      { label: 'Split the difference', formula: '\\log(n+1) - \\log n = \\log\\!\\left(1 + \\tfrac{1}{n}\\right)', explanation: 'The quotient law of 9.3: a difference of logs is the log of the quotient $\\tfrac{n+1}{n} = 1 + \\tfrac{1}{n}$ — which is the log series at $x = \\tfrac{1}{n}$, inside the interval since $0 < \\tfrac{1}{n} \\le 1$.' },
      { label: 'Substitute x = 1/n', formula: '\\log(n+1) - \\log n = \\frac{1}{n} - \\frac{1}{2n^{2}} + \\frac{1}{3n^{3}} - \\cdots', explanation: 'The stated series at $x = \\tfrac{1}{n}$, written out: each term shrinks by a factor $\\tfrac{1}{n}$, so the tail dies geometrically — at $n = 9$ seven terms already pin the seven-place sum $0.1177830$ that the worked route below uses — and the engine checks the sums against $\\ln\\!\\tfrac{n+1}{n}$ to $10^{-10}$ at $n = 2, 5, 8, 10$.' },
      { label: 'Substitute x = −1/n and flip', formula: '\\log n - \\log(n-1) = \\frac{1}{n} + \\frac{1}{2n^{2}} + \\frac{1}{3n^{3}} + \\cdots', explanation: 'The same move at $x = -\\tfrac{1}{n}$ gives $\\log\\!\\tfrac{n}{n-1} = -\\tfrac{1}{n} - \\tfrac{1}{2n^{2}} - \\cdots$ for $\\log(1 - \\tfrac{1}{n})$; negating (the left side is $\\log n - \\log(n-1)$) makes every sign plus. The engine checks this sum against $\\ln n - \\ln(n-1)$ to $10^{-10}$ as well.' },
      { label: 'Multiply by mu', formula: '\\log_{10}(n+1) - \\log_{10} n = \\mu\\left(\\frac{1}{n} - \\frac{1}{2n^{2}} + \\frac{1}{3n^{3}} - \\cdots\\right)', explanation: 'The μ bridge converts either formula to common logs: multiply through by $\\mu = 0.4342944819$ — the form Hall & Knight printed and the form the worked route below runs.' },
    ], result: 'The two working formulas, common logs: $\\log_{10}(n+1) - \\log_{10} n = \\mu\\left(\\tfrac{1}{n} - \\tfrac{1}{2n^{2}} + \\tfrac{1}{3n^{3}} - \\cdots\\right)$ and $\\log_{10} n - \\log_{10}(n-1) = \\mu\\left(\\tfrac{1}{n} + \\tfrac{1}{2n^{2}} + \\tfrac{1}{3n^{3}} + \\cdots\\right)$.' },
    { kind: 'para', text: 'One strategy note before the worked route, and it is the craft of the whole table business. The formulas price DIFFERENCES between neighbours, so a table is built by walking from known logs to unknown ones — but not by walking $2, 3, 4, 5, \\ldots$ one step at a time. The craft is to choose $n$ so that the two neighbours $n$ and $n \\pm 1$ FACTOR over primes already banked: composites then come free from the laws of 9.3 ($\\log 6 = \\log 2 + \\log 3$), and each new prime is one well-chosen series away. Hall & Knight’s worked example computed $\\log 3$ from $\\log 2$ exactly this way; our route below uses the same METHOD SHAPE with our own numbers, engine-certified end to end.' },
    { kind: 'example', title: 'Build $\\log_{10} 3$ from $\\log_{10} 2 = 0.3010300$ by the $n = 9$ route, and certify the round trip', steps: [
      'Setup: choose $n = 9$ — the pair $9 = 3^{2}$ and $8 = 2^{3}$ straddles exactly the two primes in play, so $\\log 9 - \\log 8 = 2\\log 3 - 3\\log 2$ while also being the consecutive difference $\\log n - \\log(n-1)$ at $n = 9$.',
      'Now, the series: the all-plus formula at $n = 9$ gives $\\log 9 - \\log 8 = \\mu\\left(\\tfrac{1}{9} + \\tfrac{1}{2 \\cdot 81} + \\tfrac{1}{3 \\cdot 729} + \\cdots\\right)$; the series sum is $0.1177830$, and $\\times \\mu = 0.0511525$.',
      'So, the prime equation: $2\\log 3 - 3\\log 2 = 0.0511525$, hence $2\\log 3 = 3(0.3010300) + 0.0511525 = 0.9030900 + 0.0511525 = 0.9542425$.',
      'Hence $\\log_{10} 3 = 0.9542425/2 = 0.4771213$ — and the direct engine value is $\\log_{10} 3 = 0.4771212547$: the round-trip certificate lands to seven places, two roads to one number.',
      'Check: the engine certifies every link — the series sum equals $\\ln\\!\\tfrac{9}{8}$ to ten places, the bridge equals $\\log_{10}\\!\\tfrac{9}{8}$ exactly, and the landing matches the direct value; the certificate is the figure below.',
    ] },
    { kind: 'figure', caption: 'The construction bridge: the all-plus series at n = 9 prices log 9 − log 8, the prime equation turns it into 2 log 3 − 3 log 2, and the landing 0.4771213 meets the direct engine value — the round-trip certificate.', svg: constructionBridge95Svg() },
    { kind: 'para', text: 'Read the bridge as a chain of small, checkable moves rather than one clever leap: a series sum ($0.1177830$), a multiplication ($\\times\\mu = 0.0511525$), an integer equation ($2\\log 3 - 3\\log 2$), and a landing ($0.4771213$) that an independent computation confirms to seven places. THAT final cross-check — the round-trip certificate — is the working culture of table construction: no entry ever trusted because the formula produced it, every entry trusted because a second road reached the same digits. The engine plays the second road here; Briggs, working by hand in 1617, played it with a differently-constructed series.' },
    { kind: 'callout', tone: 'historical', title: 'Briggs, Napier, Mercator — the table century', text: 'Henry Briggs published the first table of common logarithms in 1617, the Arithmetica Logarithmica: the logarithms of the integers from 1 to about 1000, computed to fourteen places, by hand, by essentially the machinery of this section — consecutive differences priced by series, primes first, composites by the laws. John Napier’s logarithms of 1614, the Mirifici Logarithmorum Canonis Descriptio, came first but in a different shape: his logs ran geometrically against a sine-based scale, and it was the Napier–Briggs correspondence that reshaped them toward base 10. The logarithmic series itself arrived later — Nicholas Mercator’s 1668 logarithmotechnia (and Newton’s independent, more powerful route) — and it is the series form that made table-making routine rather than heroic. The platform’s dates are standard history; no new claims are made here, and the worked routes above are our own numbers, engine-verified.' },
    { kind: 'para', text: 'One more cashing before the doorstep — the digit census. The logarithm answers a question that seems to belong to arithmetic alone: how many digits does $2^{64}$ have? The series route answers it from $\\log_{10} 2$ alone, and the engine then certifies the answer by computing the integer outright.' },
    { kind: 'example', title: 'The digits of $2^{64}$ — the series cashing a census question', steps: [
      'Setup: $\\ln 2 = 0.6931472$ by the fast series (five terms, engine above), so $\\log_{10} 2 = \\mu \\cdot \\ln 2 = 0.4342944819 \\times 0.6931472 = 0.3010300$ — the seed of the whole census.',
      'Now, the count: $64 \\times 0.3010300 = 19.2659$ (four places), and the digit law of 9.3 reads the integer part: $2^{64}$ has $\\lfloor 19.2659\\rfloor + 1 = 20$ digits.',
      'So, the engine check: $2^{64} = 18446744073709551616$ — count the digits: twenty, the census confirmed by direct computation.',
      'Hence a twenty-digit integer characterised from five terms of a series and one multiplication — the shape of question 9.6’s table world asks at any scale (the L4 set runs $2^{100}$ with its 31 digits the same way).',
    ] },
    { kind: 'para', text: 'Where the honesty sits, one final time. Everything arithmetic in this section — the sums, the bridges, the landings, the digit counts — is engine-verified, most of it to nine or ten places. What is NOT yet owned is the theory of the series’ convergence: that the partial sums MUST close, how fast, and why the intervals fence as they do. That theory is chapter 10’s opening business — the ratio test arriving on exactly the two series this lesson has banked — and this platform prefers to say so plainly rather than gesture at a proof it has not built. The stated-not-proved ledger: the termwise limit (exponential series), the termwise integration (logarithmic series), the convergence theorems (both) — three entries, all named, all deferred to chapter 10, all bridged meanwhile by engine witnesses.' },

    // =============================================================== section 4
    { kind: 'heading', text: 'The Chapter’s Doorstep' },
    { kind: 'para', text: 'The chapter now holds a complete engine: a series that computes $e^{x}$ for any base and any exponent, a series that computes logarithms with a fast lane for the hard cases, a modulus that converts between the systems, and a construction route that turns consecutive differences into table entries — every piece used above on numbers the engine re-verified. Lesson 9.6 walks the construction at table scale: the strategy of seeds and primes, the checks that keep a long computation honest, and the arithmetic culture that three centuries of table-making built. What 9.6 will NOT build either is the convergence theory: that is chapter 10’s doorstep, and the ratio test will arrive standing on precisely the two series banked today — the exponential series whose factorial denominators collapse, and the log series whose interval fences the alternating boundary.' },
    { kind: 'para', text: 'From the above discussion, it follows that this lesson’s five instruments reduce to one line each, and they are the lines to carry forward:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the exponential series: $e^{x} = 1 + x + \\tfrac{x^{2}}{2!} + \\tfrac{x^{3}}{3!} + \\cdots$ for every real $x$, general term $\\tfrac{x^{r}}{r!}$ — derived from the binomial theorem, termwise limit stated (chapter 10);',
      '(ii) the logarithmic series: $\\log(1+x) = x - \\tfrac{x^{2}}{2} + \\tfrac{x^{3}}{3} - \\cdots$ on $-1 < x \\le 1$ exactly — stated with its interval, verified on witnesses;',
      '(iii) the fast series: $\\ln\\!\\tfrac{1+x}{1-x} = 2\\left(x + \\tfrac{x^{3}}{3} + \\tfrac{x^{5}}{5} + \\cdots\\right)$ for $|x| < 1$ — five terms to $\\ln 2 = 0.6931472$ against the slow lane’s million;',
      '(iv) the modulus: $\\mu = \\log_{10} e = 0.4342944819$ with $\\log_{10} x = \\mu \\ln x$ — the bridge every table crossed;',
      '(v) the construction route: consecutive differences priced by the series at $x = \\pm\\tfrac{1}{n}$, primes as seeds, composites free by the laws — $\\log_{10} 3 = 0.4771213$ from $\\log_{10} 2$ by the $n = 9$ certificate.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The series motifs are standing JEE Main / board material, and four shapes dominate. Interval traps: "the series for $\\log(1+x)$ is valid for …" — the answer is the exact interval $-1 < x \\le 1$, and the wrong options (all real $x$; $x \\ge 1$; $0 < x < 1$) are built to catch readers who treat the interval as decoration. General-term reads: the $r$-th term of $e^{x}$ is $\\tfrac{x^{r}}{r!}$ — factorial in the denominator, and the distractors swap or drop it. Substitution reads: the fast series at $x = \\tfrac{1}{3}$ computes $\\ln 2$ because $\\tfrac{1+1/3}{1-1/3} = 2$ — the arithmetic of the quotient is the whole question. Bridge items: $\\log_{10} x = \\mu \\ln x$ with $\\mu = 0.4342944819$, plus digit counts such as the 31 digits of $2^{100}$. The items in this lesson are exam-style designs of ours, labelled honestly — nothing is lifted from any real paper, and every number in them is engine-verified.' },
    { kind: 'para', text: 'Five formula cards close the lesson; the quiz and exercise set follow them. The exercises run the full engine: partials at several $x$, validity statements, the fast lane at two quotients, the $\\mu$ bridge, the $n = 11$ construction, the digit census at $2^{100}$, the slow-versus-fast theorem priced numerically, the round-trip certificate written out, and the binomial coefficients seen dying at $n = 10$ — the L6 set names the stated-not-proved move explicitly, because the examination culture and the honesty culture agree on this one: say what you have proved, and say what you have not.' },
    { kind: 'formula', name: 'The exponential series', latex: 'e^{x} = 1 + x + \\frac{x^{2}}{2!} + \\frac{x^{3}}{3!} + \\cdots + \\frac{x^{r}}{r!} + \\cdots', note: 'for every real $x$ — derived from the binomial theorem plus the 9.2 ladder; the termwise limit is stated, not proved (chapter 10). At $x = 1$ it returns $e = 2.718281828459045$.' },
    { kind: 'formula', name: 'The exponential theorem for any base', latex: 'a^{x} = e^{x\\,\\ln a} = 1 + x\\ln a + \\frac{(x\\ln a)^{2}}{2!} + \\frac{(x\\ln a)^{3}}{3!} + \\cdots', note: 'for every base $a > 0$: every exponential owns the series with $x\\ln a$ in the seat — engine-certified at $3^{2} = e^{2\\ln 3}$ and $e^{2\\ln 5} = 25$ exactly.' },
    { kind: 'formula', name: 'The logarithmic series', latex: '\\log(1 + x) = x - \\frac{x^{2}}{2} + \\frac{x^{3}}{3} - \\frac{x^{4}}{4} + \\cdots, \\qquad -1 < x \\le 1', note: 'the natural logarithm, stated with its exact validity interval: the termwise-integration proof is chapter 10’s doorstep; at $x = 1$ it is the alternating harmonic for $\\ln 2$.' },
    { kind: 'formula', name: 'The fast series', latex: '\\ln\\!\\frac{1+x}{1-x} = 2\\left(x + \\frac{x^{3}}{3} + \\frac{x^{5}}{5} + \\cdots\\right), \\qquad |x| < 1', note: 'the computing engine: at $x = \\tfrac{1}{3}$ the quotient is $2$, and five terms give $\\ln 2 = 0.6931472$ to within $1.13 \\times 10^{-6}$.' },
    { kind: 'formula', name: 'The modulus and the bridge', latex: '\\mu = \\log_{10} e = \\frac{1}{\\ln 10} = 0.4342944819, \\qquad \\log_{10} x = \\mu\\,\\ln x', note: 'the common-log bridge: multiply a natural log by $\\mu$; the engine pins $\\ln 10 = 2.3025851 = 1/\\mu$ as reciprocals, and the table-construction route runs on the consecutive differences that this bridge converts.' },

    // =============================================================== the quiz
    { kind: 'quiz', title: 'Check yourself: the two series and the bridge', items: [
      { q: 'The general term of the exponential series $e^{x} = 1 + x + \\tfrac{x^{2}}{2!} + \\tfrac{x^{3}}{3!} + \\cdots$ is', options: ['$\\tfrac{x^{r}}{r}$', '$\\tfrac{x^{r}}{r!}$', '$r\\,x^{r}$', '$x^{r} \\cdot r$'], answer: 1, explain: 'Option 1 is the exponential series’s term with the factorial FORGOTTEN — that pattern belongs to the logarithmic series ($\\tfrac{(-1)^{r+1}x^{r}}{r}$), and swapping the two is the classic slip. Option 2 is right: the $r$-th term is $\\tfrac{x^{r}}{r!}$, the factorial in the denominator being exactly where the series’ speed comes from. Option 3 puts the index upstairs as a coefficient and drops the factorial division entirely — the terms of $e^{x}$ would then grow like $r x^{r}$ and collapse never; the engine’s partials ($S_{9} = 2.7182788$) would be impossible. Option 4 multiplies by $r$ instead of dividing by $r!$ — same collapse failure, and it does not even match the second term ($\\tfrac{x^{2}}{2}$ versus $2x^{2}$).' },
      { q: 'At $x = 1$ the exponential series gives', options: ['$1$', '$e$', '$\\ln 2$', '$10$'], answer: 1, explain: 'Option 0 is only the FIRST term plus nothing — the series at $x = 1$ begins $1 + 1 + \\cdots$, so even the two-term partial is $2$. Option 1 is right: $e = 1 + 1 + \\tfrac{1}{2!} + \\tfrac{1}{3!} + \\cdots = 2.7182818$ — the ladder of 9.2 re-derived by series, the two lives of e meeting. Option 2 confuses the two series of this lesson: $\\ln 2$ is what the LOGARITHMIC series at its endpoint $x = 1$ produces (slowly, $0.6931472$); the exponential series at $x = 1$ produces e. Option 3 has no witness anywhere in the lesson — $10$ is the common-log base, not a value of either series at $x = 1$; the engine pins the partials climbing to $2.7182818$, nowhere near $10$.' },
      { q: 'The series $x - \\tfrac{x^{2}}{2} + \\tfrac{x^{3}}{3} - \\tfrac{x^{4}}{4} + \\cdots$ equals $\\log(1+x)$ for', options: ['all real $x$', '$-1 < x \\le 1$', '$0 < x < 1$ only', '$x \\ge 1$'], answer: 1, explain: 'Option 0 ignores the interval entirely — at $x = 2$ the partials swing through $2, 0, 2.666667, -1.333333, 5.066667, -5.6$ and the tenth partial reads $-64.825397$: the series represents nothing there, and "all real $x$" is precisely the trap. Option 1 is right: the exact validity interval is $-1 < x \\le 1$ — open at $-1$ (where the left side is $\\log 0$, a refusal, and the right side the divergent harmonic), closed at $1$ (where the alternating harmonic converges to $\\ln 2$). Option 2 chops off both the negative range, where the series works perfectly well (at $x = -0.5$ it computes $\\ln 0.5 = -0.6931472$), and the endpoint $x = 1$, which the interval explicitly includes. Option 3 includes $x = 1$ but everything larger too — but at $x = 2$ the engine refusal above kills it, and the left side $\\log(1+x)$ exists while the series does not converge to it.' },
      { q: 'The fast series $\\ln\\!\\tfrac{1+x}{1-x} = 2\\left(x + \\tfrac{x^{3}}{3} + \\tfrac{x^{5}}{5} + \\cdots\\right)$ at $x = \\tfrac{1}{3}$ computes', options: ['$\\ln 3$', '$\\ln 2$', '$\\ln 1.5$', '$e$'], answer: 1, explain: 'Option 0 forgets to evaluate the quotient: $\\tfrac{1 + 1/3}{1 - 1/3} = \\tfrac{4/3}{2/3} = 2$, not $3$ — the fraction’s value is the whole question, and $\\ln 3 = 1.0986123$ is the fast series’ value at $x = \\tfrac{1}{2}$ instead (there the quotient is exactly $3$). Option 1 is right: the quotient is exactly $2$, so the series computes $\\ln 2 = 0.6931472$, and five terms land $0.6931460$ — an error of $1.13 \\times 10^{-6}$. Option 2 mis-divides: $\\tfrac{1+1/3}{1-1/3}$ is not $1.5$; $\\ln 1.5$ belongs to the SLOW series at $x = 0.5$ (or the fast series at $x = 0.2$, where the quotient is $1.5$). Option 3 is not even a logarithm — $e$ is the exponential series’ value at $x = 1$, a different series and a different question altogether.' },
      { q: 'The modulus $\\mu = \\log_{10} e$ equals (to seven places)', options: ['$0.4342945$', '$2.7182818$', '$0.3010300$', '$0.6931472$'], answer: 0, explain: 'Option 0 is right: $\\mu = \\log_{10} e = \\tfrac{1}{\\ln 10} = 0.4342944819$, which rounds to $0.4342945$ at seven places — the multiplier that converts every natural log to a common log. Option 1 quotes e itself, $2.7182818$ — the number whose base-ten logarithm μ is, not the logarithm; the confusion is exactly why the change-of-base law is worth a derivation of its own. Option 2 quotes $\\log_{10} 2 = 0.3010300$ — one row of the constants table, the BRIDGE’s most famous output, but not the bridge constant itself. Option 3 quotes $\\ln 2 = 0.6931472$ — the natural side of the same table; multiplying IT by μ is what produces option 2’s number ($0.4342944819 \\times 0.6931472 = 0.3010300$), which is the cleanest way to see that option 0 is the constant doing all the work.' },
    ] },

    // =========================================================== the exercises
    { kind: 'exercises', title: 'Exercises 9.5', sets: [
      { level: 'L1', questions: [
        { q: 'Write down the first three terms of the exponential series for $e^{0.1}$, add them, and state what the partial already achieves against $e^{0.1} = 1.1051709$.', solution: [
          'Setup: at $x = 0.1$ the series reads $1 + 0.1 + \\tfrac{0.01}{2}$ for the first three terms — the constant, the linear, and the quadratic seat.',
          'So, add them: $1 + 0.1 + 0.005 = 1.105$ exactly.',
          'Now, the comparison: the engine target is $e^{0.1} = 1.1051709$, so the three-term partial already carries three decimal places.',
          'Hence three terms give $1.105$ — the small-$x$ regime of the exponential series is as fast as the log series’ small-$x$ regime; the engine pins the six-term partial at $1.1051709$, all seven places.',
        ], answer: 'the three-term partial is $1.105$, three places of $e^{0.1} = 1.1051709$' },
        { q: 'State the validity interval of the logarithmic series $\\log(1+x) = x - \\tfrac{x^{2}}{2} + \\tfrac{x^{3}}{3} - \\cdots$, and what the series gives at each end of the interval.', solution: [
          'Setup: the series is stated with interval $-1 < x \\le 1$ — open at the left end, closed at the right.',
          'So, at the right end $x = 1$: the series is the alternating harmonic $1 - \\tfrac{1}{2} + \\tfrac{1}{3} - \\cdots$, which converges to $\\ln 2 = 0.6931472$ — the engine’s slow-lane partials $S_{100} = 0.6881722$, $S_{1000} = 0.6926474$ creep exactly there.',
          'Now, at the left end $x = -1$: the left side would be $\\log 0$ — a refusal — and the right side becomes the harmonic series $1 + \\tfrac{1}{2} + \\tfrac{1}{3} + \\cdots$, which diverges (its partials pass any bound; the proof is chapter 10’s).',
          'Hence the interval is $-1 < x \\le 1$: closed where the alternating series converges, open where the harmonic diverges and the logarithm does not exist.',
        ], answer: '$-1 < x \\le 1$; at $x = 1$ it gives $\\ln 2$ slowly; at $x = -1$ both sides fail (the log of zero and the divergent harmonic)' },
        { q: 'Compute the second partial $S_{2}$ of the logarithmic series at $x = 0.5$, and compare it with $\\ln 1.5 = 0.4054651$.', solution: [
          'Setup: $\\log(1 + 0.5)$ is the series $0.5 - \\tfrac{0.25}{2} + \\tfrac{0.125}{3} - \\cdots$.',
          'So, the second partial: $S_{2} = 0.5 - 0.125 = 0.375$ exactly — the engine confirms the arithmetic.',
          'Now, the comparison: $\\ln 1.5 = 0.4054651$, so $S_{2}$ sits $0.0304651$ below the target — an early partial of a slow lane.',
          'Hence $S_{2} = 0.375$, and the honest note: at $x = 0.5$ the slow series needs twelve terms for three places ($S_{12} = 0.4054587$, engine-pinned), which is exactly the case the fast series at $x = 0.2$ repairs in the L5 set.',
        ], answer: '$S_{2} = 0.375$ (target $\\ln 1.5 = 0.4054651$; the early partial sits $0.0304651$ low)' },
      ] },
      { level: 'L2', questions: [
        { q: 'Run the exponential series at $x = -1$ (the alternating series for $1/e$): list the partials $S_{2}, S_{4}, S_{6}, S_{8}$ and the limit.', solution: [
          'Setup: at $x = -1$ the series reads $1 - 1 + \\tfrac{1}{2} - \\tfrac{1}{6} + \\tfrac{1}{24} - \\cdots$ — every sign alternating, the factorial denominators untouched.',
          'So, the partials: $S_{2} = 0$, $S_{4} = 0.3333333$, $S_{6} = 0.3666667$, $S_{8} = 0.3678571$ — engine-pinned at each count.',
          'Now, the bracketing: the even partials climb from below ($0, 0.3333333, 0.3666667, 0.3678571$) and the odd partials fall from above — the engine confirms the alternation through nine partials.',
          'Hence the limit is $e^{-1} = 0.3678794$ — the alternating series for $1/e$, converging fast because the factorial collapse outruns the alternation.',
        ], answer: '$S_{2} = 0,\\ S_{4} = 0.3333333,\\ S_{6} = 0.3666667,\\ S_{8} = 0.3678571$, climbing to $e^{-1} = 0.3678794$' },
        { q: 'Compute $\\ln 1.1$ by the logarithmic series with three terms, and state the error against the engine value.', solution: [
          'Setup: $1.1 = 1 + 0.1$, so $\\ln 1.1$ is the series at $x = 0.1$: $0.1 - \\tfrac{0.01}{2} + \\tfrac{0.001}{3} - \\cdots$.',
          'So, three terms: $0.1 - 0.005 + 0.0003333 = 0.0953333$.',
          'Now, the comparison: the engine value is $\\ln 1.1 = 0.0953102$, so the three-term partial carries an error of $2.3 \\times 10^{-5}$ — about two units in the fifth place.',
          'Hence $\\ln 1.1 = 0.0953102$, approached at moderate speed: three terms give four places at $x = 0.1$, where the same count at $x = 0.02$ gave seven (Illustration 4) — the speed is the variable’s size, exactly as the term ratio $\\tfrac{x^{2}}{3}$ predicts.',
        ], answer: 'the three-term partial is $0.0953333$ against $\\ln 1.1 = 0.0953102$ — error $2.3 \\times 10^{-5}$' },
        { q: 'Compute the second partial of the fast series at $x = \\tfrac{1}{3}$, and state what it already says about $\\ln 2$.', solution: [
          'Setup: the fast series at $x = \\tfrac{1}{3}$ reads $2\\left(\\tfrac{1}{3} + \\tfrac{1/27}{3} + \\cdots\\right)$, because the quotient $\\tfrac{1+1/3}{1-1/3} = 2$.',
          'So, two terms: $S_{2} = 2\\left(\\tfrac{1}{3} + \\tfrac{1}{81}\\right) = 2(0.3456790) = 0.6913580$ — engine-pinned.',
          'Now, the comparison: $\\ln 2 = 0.6931472$, so two terms already sit within $0.0017892$ — two decimal places from two terms.',
          'Hence $S_{2} = 0.6913580$: the fast lane reaches in two terms what the alternating harmonic cannot reach in four thousand (engine: $S_{4000} = 0.6930222$).',
        ], answer: '$S_{2} = 0.6913580$ — within $0.0017892$ of $\\ln 2 = 0.6931472$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Compute $\\ln 2$ by the fast series to five terms, and state the error against $\\ln 2 = 0.6931472$.', solution: [
          'Setup: at $x = \\tfrac{1}{3}$ the fast series is $2\\left(\\tfrac{1}{3} + \\tfrac{1}{3 \\cdot 3^{3}} + \\tfrac{1}{5 \\cdot 3^{5}} + \\tfrac{1}{7 \\cdot 3^{7}} + \\tfrac{1}{9 \\cdot 3^{9}}\\right)$ — five terms.',
          'Now, the partials: $S_{1} = 0.6666667$, $S_{2} = 0.6913580$, $S_{3} = 0.6930041$, $S_{4} = 0.6931348$, $S_{5} = 0.6931460$ — each engine-pinned, climbing monotonically.',
          'So, the error: $\\ln 2 - S_{5} = 0.6931472 - 0.6931460 = 1.13 \\times 10^{-6}$ — about one unit in the sixth decimal place.',
          'Hence five terms give $\\ln 2$ to within $1.13 \\times 10^{-6}$ — five places secure and the sixth off by a single unit; the engine’s certificate that the slow lane would need on the order of $882456$ terms for the same accuracy is the L5 comparison.',
        ], answer: '$S_{5} = 0.6931460$; error $1.13 \\times 10^{-6}$ (one unit in the sixth place) against $\\ln 2 = 0.6931472$' },
        { q: 'Cash the identity $a^{x} = e^{x \\ln a}$: verify $3^{4} = e^{4 \\ln 3}$ and $2^{10} = e^{10 \\ln 2}$, and write the series form of the second.', solution: [
          'Setup: the exponential theorem says every base rides the series — $3^{4} = e^{4\\ln 3}$ and $2^{10} = e^{10 \\ln 2}$ are its two cashings here.',
          'Now, the first: $e^{4 \\ln 3} = e^{4.3944492} = 81 = 3^{4}$ — the engine certifies the equality to $10^{-9}$.',
          'So, the second: $e^{10 \\ln 2} = e^{6.9314718} = 1024 = 2^{10}$ — likewise exact to $10^{-9}$.',
          'Hence both identities hold, and the series form of the second is $2^{10} = 1 + 10\\ln 2 + \\tfrac{(10 \\ln 2)^{2}}{2!} + \\tfrac{(10 \\ln 2)^{3}}{3!} + \\cdots$ — the exponential theorem with $x \\ln a = 6.9314718$ in the seat.',
        ], answer: 'both hold exactly: $3^{4} = e^{4\\ln 3} = 81$ and $2^{10} = e^{10\\ln 2} = 1024$; the series form rides $10\\ln 2 = 6.9314718$ in the seat' },
        { q: 'Run the $\\mu$ bridge: from $\\ln 7 = 1.9459101$, compute $\\log_{10} 7$, and certify it against the direct engine value.', solution: [
          'Setup: the bridge is $\\log_{10} x = \\mu \\ln x$ with $\\mu = 0.4342944819$ — one multiplication converts the natural log the series produced into the common log the tables carry.',
          'So, the multiplication: $\\log_{10} 7 = 0.4342944819 \\times 1.9459101 = 0.8450980$.',
          'Now, the certification: the direct engine value is $\\log_{10} 7 = 0.8450980400$ — the bridge lands to seven places, exactly as it did for $2$ and $3$ in the constants table.',
          'Hence $\\log_{10} 7 = 0.8450980$ — the bridge diagram below certifies the chain the way the construction bridge certified $\\log 3$.',
        ], answer: '$\\log_{10} 7 = \\mu \\cdot \\ln 7 = 0.4342944819 \\times 1.9459101 = 0.8450980$ (direct value $0.8450980400$)', figures: [{ caption: 'The μ bridge for this solution: ln 7 times μ lands log₁₀ 7 = 0.8450980, certified against the direct engine value.', svg: muBridgeL3cSvg() }] },
      ] },
      { level: 'L4', questions: [
        { q: 'Run the construction route for $\\log_{10} 11$ from $\\log_{10} 10 = 1$: use the all-plus series at $n = 11$, and certify the landing against the direct value.', solution: [
          'Setup: $\\log 11 - \\log 10 = \\log\\!\\tfrac{11}{10} = \\log\\left(1 + \\tfrac{1}{10}\\right)$, and the all-plus consecutive-difference formula at $n = 11$ prices it: $\\log 11 - \\log 10 = \\mu\\left(\\tfrac{1}{11} + \\tfrac{1}{2 \\cdot 11^{2}} + \\tfrac{1}{3 \\cdot 11^{3}} + \\cdots\\right)$.',
          'Now, the series sum: $\\tfrac{1}{11} + \\tfrac{1}{242} + \\tfrac{1}{3 \\cdot 1331} + \\cdots = 0.0953102$ — engine-pinned, and equal to $\\ln\\!\\tfrac{11}{10}$ to ten places.',
          'So, the bridge: $\\times \\mu = 0.4342944819 \\times 0.0953102 = 0.0413927$ — the common-log difference $\\log 11 - \\log 10$.',
          'Hence $\\log_{10} 11 = 1 + 0.0413927 = 1.0413927$, and the direct engine value is $1.0413926852$: the round-trip certificate lands to seven places — the diagram below certifies the chain.',
        ], answer: '$\\log_{10} 11 = 1.0413927$ (series sum $0.0953102$, bridge $0.0413927$; direct value $1.0413926852$ — seven-place match)', figures: [{ caption: 'The n = 11 construction route: the all-plus series prices log 11 − log 10 = 0.0413927, and the landing 1.0413927 meets the direct engine value.', svg: route11L4aSvg() }] },
        { q: 'The digit census at scale: how many digits does $2^{100}$ own? Compute it from $\\log_{10} 2 = 0.3010300$ and certify against the engine’s direct value.', solution: [
          'Setup: the digit law of 9.3 reads the integer part of the common log: a positive real $x$ with $\\log_{10} x = 30.1030$ (say) owns $\\lfloor 30.1030 \\rfloor + 1$ digits.',
          'So, the count: $100 \\times 0.3010300 = 30.1030$, hence $2^{100}$ owns $\\lfloor 30.1030 \\rfloor + 1 = 31$ digits.',
          'Now, the engine certification: $2^{100} = 1267650600228229401496703205376$ — count the digits: thirty-one, the census confirmed by direct computation.',
          'Hence $2^{100}$ owns 31 digits, characterised from one logarithm and one multiplication — the log ruler below certifies the reading, and the margin is comfortable: the fractional part $0.1030$ sits far from both ends.',
        ], answer: '31 digits: $100 \\times 0.3010300 = 30.1030$, floor plus one; the engine value $1267650600228229401496703205376$ counts 31 ✓', figures: [{ caption: 'The log ruler for this solution: 100 × log₁₀ 2 = 30.1030 sits between the decades 30 and 40, so the digit count is 31 — checked against the engine’s direct value.', svg: logRulerL4bSvg() }] },
        { q: 'Compute $S_{100}$ of the alternating harmonic, compare it with $\\ln 2 = 0.6931472$, and state the honest error.', solution: [
          'Setup: $S_{100} = 1 - \\tfrac{1}{2} + \\tfrac{1}{3} - \\cdots - \\tfrac{1}{100}$ — the log series at its endpoint, one hundred terms in.',
          'So, the value: the engine pins $S_{100} = 0.6881722$.',
          'Now, the error: $\\ln 2 - S_{100} = 0.6931472 - 0.6881722 = 0.0049750$ — nearly five units in the third place; the third decimal is still not secure.',
          'Hence the honest statement: a hundred terms leave the alternating harmonic $0.0049750$ short of $\\ln 2$; the engine’s bound $|S_{n} - \\ln 2| < \\tfrac{1}{n+1}$ prices the lane, and the fast series reached $1.13 \\times 10^{-6}$ in five terms — the two censuses are the L5 comparison.',
        ], answer: '$S_{100} = 0.6881722$; error $0.0049750$ against $\\ln 2 = 0.6931472$ — three places only' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove the symmetry identity $a^{\\log_{b} c} = c^{\\log_{b} a}$ (recap from 9.3), and cash the series with $e^{2\\ln 5}$.', solution: [
          'Setup: take natural logs of both sides of the claimed identity $a^{\\log_{b} c} = c^{\\log_{b} a}$.',
          'Now, the left: $\\ln\\left(a^{\\log_{b} c}\\right) = \\log_{b} c \\cdot \\ln a = \\tfrac{\\ln c}{\\ln b} \\cdot \\ln a$; the right: $\\ln\\left(c^{\\log_{b} a}\\right) = \\log_{b} a \\cdot \\ln c = \\tfrac{\\ln a}{\\ln b} \\cdot \\ln c$ — the same product $\\tfrac{\\ln a \\, \\ln c}{\\ln b}$ both times, so the originals are equal.',
          'So, the engine witness: $3^{\\log_{2} 5} = 5^{\\log_{2} 3}$, both equal to $e^{\\ln 3 \\ln 5 / \\ln 2}$ — certified to $10^{-9}$.',
          'Hence the identity holds, and the series cashing: $e^{2\\ln 5} = 25$ exactly (the engine pins it to $10^{-9}$) — the exponential theorem with base e reading its own logarithm.',
        ], answer: 'the identity holds ($\\ln$ of both sides equals $\\tfrac{\\ln a \\ln c}{\\ln b}$); engine witness $3^{\\log_2 5} = 5^{\\log_2 3}$; and $e^{2\\ln 5} = 25$ exactly' },
        { q: 'The fast series at $x = 0.6$ computes $\\ln 4$ (since $\\tfrac{1+0.6}{1-0.6} = 4$): run partials $S_{3}$ and $S_{4}$, and state the errors against $\\ln 4 = 1.3862944$.', solution: [
          'Setup: at $x = 0.6$ the fast series reads $2\\left(0.6 + \\tfrac{0.216}{3} + \\tfrac{0.07776}{5} + \\tfrac{0.0279936}{7} + \\cdots\\right)$, and the quotient check: $\\tfrac{1.6}{0.4} = 4$ — so the target is $\\ln 4$.',
          'So, the partials: $S_{3} = 2(0.6 + 0.072 + 0.015552) = 1.3751040$ and $S_{4} = 2(0.6915511) = 1.3831022$ — engine-pinned.',
          'Now, the errors: $\\ln 4 - S_{3} = 0.0111904$ and $\\ln 4 - S_{4} = 0.0031922$ — the fourth term bought nearly four decimal places.',
          'Hence the fast series computes $\\ln 4$ at $x = 0.6$ — four places by four terms; the honest note is that $\\ln 4 = 2\\ln 2$, so the $x = \\tfrac{1}{3}$ run plus one doubling reaches the same number with smaller terms.',
        ], answer: '$S_{3} = 1.3751040$ (error $0.0111904$), $S_{4} = 1.3831022$ (error $0.0031922$), against $\\ln 4 = 1.3862944$' },
        { q: 'The efficiency theorem, priced numerically: how many terms does each lane need to compute $\\ln 2$ to six-place accuracy, and what does the engine pin for each?', solution: [
          'Setup: six-place accuracy means an error below half a unit in the sixth place — order $10^{-6}$; the two lanes are the slow alternating harmonic at $x = 1$ and the fast series at $x = \\tfrac{1}{3}$.',
          'Now, the fast lane: five terms give $0.6931460$ with error $1.13 \\times 10^{-6}$ — the sixth place off by a single unit; call it six-place work.',
          'So, the slow lane: the alternating bound $|S_{n} - \\ln 2| < \\tfrac{1}{n+1}$ (engine-checked at four counts) says the error falls like $\\tfrac{1}{n}$: to reach $1.13 \\times 10^{-6}$ needs $n \\ge 882456$ terms — on the order of a million.',
          'Hence the census: five versus roughly $882456$ — the fast series wins by five orders of magnitude in the term count, which is exactly why the table route was built on the quotient form; the ladders diagram below shows both lanes honestly.',
        ], answer: 'fast lane: 5 terms ($0.6931460$, error $1.13 \\times 10^{-6}$); slow lane: on the order of $882456$ terms — five orders of magnitude apart', figures: [{ caption: 'The two ladders at ln 2: five fast terms land within 1.13×10⁻⁶ while four thousand slow terms still carry 0.0001250 — the efficiency theorem drawn honestly.', svg: twoLaddersL5cSvg() }] },
      ] },
      { level: 'L6', questions: [
        { q: 'The round-trip certificate in full: from $\\log_{10} 2 = 0.3010300$ and the $n = 9$ construction route, derive $\\log_{10} 3$ and verify it against the direct engine value to seven places — write the chain as a derivation.', solution: [
          'Setup: the chain runs series $\\to$ bridge $\\to$ prime equation $\\to$ landing, and every link is engine-verified; write it as four labelled moves.',
          'Move one, the series: $\\log 9 - \\log 8 = \\mu\\left(\\tfrac{1}{9} + \\tfrac{1}{2 \\cdot 9^{2}} + \\tfrac{1}{3 \\cdot 9^{3}} + \\cdots\\right)$ — the all-plus formula at $n = 9$; the sum is $0.1177830$ (engine: equal to $\\ln\\tfrac{9}{8}$ to ten places).',
          'Move two, the bridge: $\\times\\ \\mu$: $0.4342944819 \\times 0.1177830 = 0.0511525$ — the common-log difference $\\log_{10} 9 - \\log_{10} 8$ (engine: exact).',
          'Move three, the prime equation: $9 = 3^{2}$ and $8 = 2^{3}$, so $2\\log 3 - 3\\log 2 = 0.0511525$; hence $2\\log 3 = 3(0.3010300) + 0.0511525 = 0.9030900 + 0.0511525 = 0.9542425$.',
          'Move four, the landing: $\\log 3 = \\tfrac{0.9542425}{2} = 0.4771213$ — and the direct engine value is $\\log_{10} 3 = 0.4771212547$: the certificate lands to seven places, two roads to one number.',
          'Hence $\\log_{10} 3 = 0.4771213$, derived from $\\log_{10} 2$ by four checkable moves — the working culture of table construction, certified end to end by the engine.',
        ], answer: '$\\log_{10} 3 = 0.4771213$ by the certificate chain (series $0.1177830 \\to \\mu$-bridge $0.0511525 \\to 2\\log 3 = 0.9542425 \\to$ landing), matching the direct $0.4771212547$ to seven places' },
        { q: 'The termwise-limit honesty item: expand $\\left(1 + \\tfrac{1}{10}\\right)^{10x}$ by the binomial theorem to the first four coefficients, verify them against the correction forms $x\\left(x - \\tfrac{1}{10}\\right)$ etc., and state exactly what the $n \\to \\infty$ limit needs.', solution: [
          'Setup: at $n = 10$ the derivation’s expansion reads $\\left(1 + \\tfrac{1}{10}\\right)^{10x} = 1 + x + \\tfrac{x(x - 0.1)}{2!} + \\tfrac{x(x-0.1)(x-0.2)}{3!} + \\tfrac{x(x-0.1)(x-0.2)(x-0.3)}{4!} + \\cdots$.',
          'Now, verify the coefficients by the integral-index binomial: the $x^{2}$ coefficient is $\\tfrac{\\binom{10}{2}}{10^{2}} = 0.45 = \\tfrac{1 - 0.1}{2}$; the $x^{3}$ coefficient is $\\tfrac{\\binom{10}{3}}{10^{3}} = 0.12 = \\tfrac{(0.9)(0.8)}{6}$; the $x^{4}$ coefficient is $\\tfrac{\\binom{10}{4}}{10^{4}} = 0.021 = \\tfrac{(0.9)(0.8)(0.7)}{24}$ — all three engine-pinned.',
          'So, the numeric certificate of the expansion itself: at $x = 0.5$, $\\left(1.1\\right)^{5} = 1.61051$, and the truncated series $1 + 0.5 + 0.1 + 0.01 + 0.0005 + 0.00001 = 1.61051$ — matched to $10^{-6}$.',
          'Hence at $n = 10$ the corrections $\\tfrac{1}{10}, \\tfrac{2}{10}, \\tfrac{3}{10}$ are visible and dying (at $n = 100$ the engine reads the coefficients $0.495, 0.1617, 0.0392$ against the limits $0.5, 0.1666667, 0.0416667$) — and what the $n \\to \\infty$ limit NEEDS is the termwise passage through the infinite sum: the stated-not-proved move of this lesson, owned by chapter 10.',
        ], answer: 'the coefficients at $n = 10$ are $1, 1, 0.45, 0.12, 0.021$ — matching $\\tfrac{(1-0.1)(1-0.2)\\cdots}{r!}$ exactly; the limit to $e^{x}$ needs the termwise limit through the infinite sum: stated, not proved, chapter 10’s' },
      ] },
    ] },
  ],
}


// ------------------------------------------------------------------
// lesson 9.6 — run 121 (the whole-chapter swarm), integrated verbatim
// ------------------------------------------------------------------

/**
 * Advanced Algebra — lesson 9.6 "Logarithm Tables: Characteristic, Mantissa
 * and Antilogarithm" (authored by the run-121 whole-chapter swarm's aa96
 * agent; every number engine-pinned in temporary-references/v-aa96.ts BEFORE
 * this prose was written — the A-section engines ran 211/211 green first; the
 * P-section pins re-read this file after it existed).
 *
 * PROVENANCE: the Cengage presentation contract (cengage-jee-style), the
 * Cengage Algebra-I logarithm-tables band (cengage-m1-01 — the tables pages
 * printed 1.16–1.22: finding a logarithm, characteristic and mantissa,
 * negative characteristics, the mean-difference read, the five-step antilog
 * method, the digit-count and compound-interest applications), Hall &
 * Knight Higher Algebra's tables-construction chapter (hall-knight-higher-
 * algebra — the series route that BUILDS the rows) and the JEE Main unit
 * list (jee-main-2026-syllabus). STUDY-NEVER-REPRODUCE absolute: every table
 * value, witness, figure, Illustration, quiz item and exercise here is the
 * platform's own, engine-computed in v-aa96.ts — the lesson's table excerpt
 * is generated by the verifier's own rounding conventions, never pasted
 * from any printed book.
 *
 * SPEC-VS-ENGINE CATCHES (the engine won each time; this prose carries the
 * engine's numbers): log 2136 exact = 3.3296012 (not 3.3295653); log 25795 =
 * 4.4115 (not 4.4114 — our engine-built mean difference for row 25, digit 9
 * is 16, not the printed sources' 15); log 4.72 = 0.6739 four-figure (not
 * 0.6740 — so the product route runs 3.0035, not 3.0036); log 628 =
 * 2.7979596 (not 2.7979634); antilog(−2.5983) = 0.0025217 (not 0.0025203);
 * 10^0.3296 = 2.1359939 (not 2.1361); 213.6^(1/3) = 5.9776950 (not 5.9772 —
 * the sheet quoted 10^0.7765); the compound landing antilog 4.7990 = 62,950.6
 * (not 6.309 × 10^4 — the sheet's gap was ~0.2%, the engine's honest gap is
 * 0.006%); the doubling ladder 0.2967 < 0.3010 < 0.3178 (not 0.2962/0.3175);
 * 25 × 0.6990 = 17.475 (not 17.447).
 */

/* ==================================================================== */
/* Figure helpers — every coordinate computed from named constants       */
/* ==================================================================== */

/* ------------------------------------------------------------------ */
/* Body figure 1 — the two-part machine (the anatomy of log 4728)       */
/* ------------------------------------------------------------------ */
function twoPartMachineSvg(): string {
  const W = 720
  const H = 430
  // the number box (left), the two lookup boxes (middle), the recombine box (right)
  const NB = { x: 40, y: 120, w: 130, h: 72 }
  const MB = { x: 240, y: 56, w: 250, h: 84 } // the mantissa lookup
  const CB = { x: 240, y: 300, w: 250, h: 84 } // the characteristic lookup
  const RB = { x: 540, y: 178, w: 160, h: 74 } // the recombine box
  // pipe geometry: proper arrowheads (tip at the target, base behind it)
  const pipe = (x1: number, y1: number, x2: number, y2: number) => {
    const L = Math.hypot(x2 - x1, y2 - y1) || 1
    const ux = (x2 - x1) / L
    const uy = (y2 - y1) / L
    const bx = x2 - 11 * ux
    const by = y2 - 11 * uy
    const nx = -uy
    const ny = ux
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d97706" stroke-width="2.2"/>` +
      `<path d="M ${x2} ${y2} L ${(bx + 4 * nx).toFixed(1)} ${(by + 4 * ny).toFixed(1)} L ${(bx - 4 * nx).toFixed(1)} ${(by - 4 * ny).toFixed(1)} z" fill="#d97706"/>`
  }
  const pipeM = pipe(NB.x + NB.w, NB.y + 22, MB.x - 4, MB.y + MB.h / 2)
  const pipeC = pipe(NB.x + NB.w, NB.y + NB.h - 22, CB.x - 4, CB.y + CB.h / 2)
  const pipeMR = pipe(MB.x + MB.w, MB.y + MB.h / 2, RB.x - 4, RB.y + 18)
  const pipeCR = pipe(CB.x + CB.w, CB.y + CB.h / 2, RB.x - 4, RB.y + RB.h - 18)
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The two-part machine for the logarithm of 4728. A number box on the left carries 4728. An upper amber pipe carries the significant digits 4, 7, 2, 8 into the mantissa lookup box, which shows the value .6747 with the printed-table route row 47, column 2 giving 6739 plus the mean difference 7 equalling 6746. A lower amber pipe carries the decimal position into the characteristic lookup box, which shows the value 3 with the read four digits left of the point, so 4 minus 1 equals 3. Both outputs recombine in the right-hand box reading log 4728 equals 3.6747. The footer states the honest audit: the engine's direct value is 3.6746775, which rounds to 3.6747, while the printed-table route lands 3.6746 — one unit in the last place, the honest precision of a four-figure table.">
  <text x="${W / 2}" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the two-part machine: digits feed the mantissa, the point feeds the characteristic</text>
  ${pipeM}
  ${pipeC}
  ${pipeMR}
  ${pipeCR}
  <text x="${NB.x + NB.w / 2}" y="106" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">the number</text>
  <rect x="${NB.x}" y="${NB.y}" width="${NB.w}" height="${NB.h}" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>
  <text x="${NB.x + NB.w / 2}" y="${NB.y + 46}" font-size="24" font-weight="800" fill="#166534" text-anchor="middle">4728</text>
  <text x="${MB.x + MB.w / 2}" y="46" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">the digits 4·7·2·8 feed the mantissa lookup</text>
  <rect x="${MB.x}" y="${MB.y}" width="${MB.w}" height="${MB.h}" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="2.2"/>
  <text x="${MB.x + MB.w / 2}" y="${MB.y + 22}" font-size="10" font-weight="800" fill="#0d9488" text-anchor="middle">THE MANTISSA (from the table)</text>
  <text x="${MB.x + MB.w / 2}" y="${MB.y + 48}" font-size="21" font-weight="800" fill="#65a30d" text-anchor="middle">.6747</text>
  <text x="${MB.x + MB.w / 2}" y="${MB.y + 70}" font-size="9.5" font-weight="600" fill="#0f766e" text-anchor="middle">row 47 · column 2 → 6739 + 7 → 6746</text>
  <text x="${CB.x + CB.w / 2}" y="${CB.y - 10}" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">the decimal position feeds the characteristic</text>
  <rect x="${CB.x}" y="${CB.y}" width="${CB.w}" height="${CB.h}" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="2.2"/>
  <text x="${CB.x + CB.w / 2}" y="${CB.y + 24}" font-size="10" font-weight="800" fill="#0d9488" text-anchor="middle">THE CHARACTERISTIC (by inspection)</text>
  <text x="${CB.x + CB.w / 2}" y="${CB.y + 56}" font-size="21" font-weight="800" fill="#65a30d" text-anchor="middle">3</text>
  <text x="${CB.x + CB.w / 2}" y="${CB.y + 76}" font-size="9.5" font-weight="600" fill="#0f766e" text-anchor="middle">4 digits left of the point → 4 − 1 = 3</text>
  <rect x="${RB.x}" y="${RB.y}" width="${RB.w}" height="${RB.h}" rx="10" fill="#fef3c7" stroke="#ea580c" stroke-width="2.4"/>
  <text x="${RB.x + RB.w / 2}" y="${RB.y + 24}" font-size="10.5" font-weight="800" fill="#0d9488" text-anchor="middle">recombined</text>
  <text x="${RB.x + RB.w / 2}" y="${RB.y + 48}" font-size="18" font-weight="800" fill="#166534" text-anchor="middle">log 4728 = 3.6747</text>
  <text x="${RB.x + RB.w / 2}" y="${RB.y + 64}" font-size="9.5" font-weight="600" fill="#65a30d" text-anchor="middle">= 3 + 0.6747 (the engine: 3.6746775)</text>
  <line x1="24" y1="${H - 26}" x2="696" y2="${H - 26}" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="${W / 2}" y="${H - 8}" font-size="10" font-weight="600" fill="#0f766e" text-anchor="middle">the honest audit: the route 6739 + 7 lands .6746; the engine's value 3.6746775 rounds to .6747 — one unit</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* Body figure 2 — the antilog table's mirror (two machines, both ways) */
/* ------------------------------------------------------------------ */
function antilogMirrorSvg(): string {
  const W = 720
  const H = 430
  // the two machine boxes, facing each other across the identity mirror
  const LB = { x: 56, y: 150, w: 260, h: 110 } // the log table (flows DOWN)
  const AB = { x: 404, y: 150, w: 260, h: 110 } // the antilog table (flows UP)
  const MX = 360 // the mirror line x
  // chips: log input top-left, log output bottom-left, antilog input bottom-right, antilog output top-right
  const chipW = 84
  const chipH = 36
  const inL = { x: 144, y: 84 }
  const outL = { x: 144, y: 286 }
  const inR = { x: 492, y: 286 }
  const outR = { x: 492, y: 84 }
  const arrow = (x1: number, y1: number, x2: number, y2: number) => {
    const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#16a34a" stroke-width="2.2"/>` +
      `<path d="M ${x2} ${y2} l -7 -9 l 14 0 z" fill="#16a34a" transform="rotate(${ang - 90} ${x2} ${y2})"/>`
  }
  const handoffR = (x1: number, x2: number, y: number) =>
    `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#ea580c" stroke-width="2.2"/>` +
    `<path d="M ${x2} ${y} l -9 -6 v 12 z" fill="#ea580c"/>`
  const handoffL = (x1: number, x2: number, y: number) =>
    `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#ea580c" stroke-width="2.2"/>` +
    `<path d="M ${x2} ${y} l 9 -6 v 12 z" fill="#ea580c"/>`
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The antilog table's mirror. Two machines face each other. On the left the log table flows downward: the number 4728 enters at the top, the machine reads row 47 column 2 giving 6739 with mean difference plus 7, and the log 3.6747 leaves at the bottom. On the right the antilog table flows upward: the log 2.6747 enters at the bottom, the machine reads row .67 column 4 giving 4721 with the digit-7 completing the digits 4-7-2-8, and the number 472.8 leaves at the top. Between the machines stands the identity mirror on the line ten to the power of log n equals n, labelled one machine, both directions. An orange handoff arrow at the bottom carries the mantissa .6747 from the log output to the antilog input with the characteristic reset from 3 to 2; an orange return arrow at the top multiplies 472.8 by 10 to close the round trip back to 4728. The footer witnesses the same mirror on the .3296 family: log 2136 equals 3.3296 and antilog 3.3296 equals 2136; log 2.136 equals 0.3296 and antilog 0.3296 equals 2.136, with the engine values 10 to the 3.3296 equalling 2135.9939 and 10 to the 0.3296 equalling 2.1359939.">
  <text x="${W / 2}" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the antilog table's mirror: the same machine, run both ways</text>
  <text x="${(inL.x + chipW / 2)}" y="${inL.y - 6}" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle">the number</text>
  <rect x="${inL.x}" y="${inL.y}" width="${chipW}" height="${chipH}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>
  <text x="${inL.x + chipW / 2}" y="${inL.y + 24}" font-size="15" font-weight="800" fill="#166534" text-anchor="middle">4728</text>
  ${arrow(inL.x + chipW / 2, inL.y + chipH, inL.x + chipW / 2, LB.y - 4)}
  <rect x="${LB.x}" y="${LB.y}" width="${LB.w}" height="${LB.h}" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="2.4"/>
  <text x="${LB.x + LB.w / 2}" y="${LB.y + 26}" font-size="11" font-weight="800" fill="#0d9488" text-anchor="middle">THE LOG TABLE</text>
  <text x="${LB.x + LB.w / 2}" y="${LB.y + 50}" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">digits 4·7·2·8</text>
  <text x="${LB.x + LB.w / 2}" y="${LB.y + 70}" font-size="10" font-weight="600" fill="#65a30d" text-anchor="middle">row 47 · column 2 → 6739</text>
  <text x="${LB.x + LB.w / 2}" y="${LB.y + 90}" font-size="10" font-weight="600" fill="#65a30d" text-anchor="middle">mean difference +7 → mantissa .6747</text>
  ${arrow(inL.x + chipW / 2, LB.y + LB.h, inL.x + chipW / 2, outL.y - 4)}
  <rect x="${outL.x}" y="${outL.y}" width="${chipW}" height="${chipH}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>
  <text x="${outL.x + chipW / 2}" y="${outL.y + 24}" font-size="15" font-weight="800" fill="#166534" text-anchor="middle">3.6747</text>
  <line x1="${MX}" y1="140" x2="${MX}" y2="270" stroke="#0d9488" stroke-width="2.4" stroke-dasharray="6 5"/>
  <text x="${MX}" y="190" font-size="10" font-weight="800" fill="#0f766e" text-anchor="middle">the identity</text>
  <text x="${MX}" y="214" font-size="10.5" font-weight="800" fill="#0f766e" text-anchor="middle">10^(log n) = n</text>
  <text x="${MX}" y="248" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">both ways</text>
  <rect x="${AB.x}" y="${AB.y}" width="${AB.w}" height="${AB.h}" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="2.4"/>
  <text x="${AB.x + AB.w / 2}" y="${AB.y + 26}" font-size="11" font-weight="800" fill="#0d9488" text-anchor="middle">THE ANTILOG TABLE</text>
  <text x="${AB.x + AB.w / 2}" y="${AB.y + 50}" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">mantissa .6747</text>
  <text x="${AB.x + AB.w / 2}" y="${AB.y + 70}" font-size="10" font-weight="600" fill="#65a30d" text-anchor="middle">row .67 · column 4 → 4721</text>
  <text x="${AB.x + AB.w / 2}" y="${AB.y + 90}" font-size="10" font-weight="600" fill="#65a30d" text-anchor="middle">digit 7 completes 4·7·2·8</text>
  ${arrow(inR.x + chipW / 2, inR.y, inR.x + chipW / 2, AB.y + AB.h + 4)}
  <rect x="${inR.x}" y="${inR.y}" width="${chipW}" height="${chipH}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>
  <text x="${inR.x + chipW / 2}" y="${inR.y + 24}" font-size="15" font-weight="800" fill="#166534" text-anchor="middle">2.6747</text>
  ${arrow(outR.x + chipW / 2, AB.y - 4, outR.x + chipW / 2, outR.y + chipH)}
  <rect x="${outR.x}" y="${outR.y}" width="${chipW}" height="${chipH}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>
  <text x="${outR.x + chipW / 2}" y="${outR.y + 24}" font-size="15" font-weight="800" fill="#166534" text-anchor="middle">472.8</text>
  ${handoffR(outL.x + chipW, inR.x - 4, 304)}
  <text x="${W / 2}" y="278" font-size="9.5" font-weight="700" fill="#ea580c" text-anchor="middle">the mantissa .6747 feeds the antilog table — characteristic 3 → 2 → 472.8</text>
  ${handoffL(outR.x, inL.x + chipW + 4, 102)}
  <text x="${W / 2}" y="64" font-size="9.5" font-weight="700" fill="#ea580c" text-anchor="middle">472.8 × 10 = 4728 — the round trip closes: log 4728 ≈ 3.6747</text>
  <line x1="24" y1="344" x2="696" y2="344" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="${W / 2}" y="368" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the .3296 family rides the same mirror: log 2136 = 3.3296, antilog 3.3296 = 2136</text>
  <text x="${W / 2}" y="390" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">log 2.136 = 0.3296, antilog 0.3296 = 2.136 — the digits 2·1·3·6 never change</text>
  <text x="${W / 2}" y="${H - 8}" font-size="9.5" font-weight="600" fill="#0d9488" text-anchor="middle">engine: 10^3.3296 = 2135.9939 → 2136; 10^0.3296 = 2.1359939 → 2.136 (both four-figure landings)</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* Body figure 3 — the compound ladder (25000 × 1.08^t, t in 0..12)    */
/* ------------------------------------------------------------------ */
function compoundLadderSvg(): string {
  const W = 720
  const H = 400
  const PX0 = 90
  const PX1 = 660
  const PY0 = 336
  const PY1 = 56
  const T1 = 12
  const A0 = 20000
  const A1 = 66000
  const px = (t: number): number => PX0 + (t / T1) * (PX1 - PX0)
  const py = (A: number): number => PY0 - ((A - A0) / (A1 - A0)) * (PY0 - PY1)
  const amount = (t: number): number => 25000 * Math.pow(1.08, t)
  // the true curve, sampled point-by-point — the geometry cannot lie
  let path = ''
  const N = 96
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * T1
    path += `${i === 0 ? 'M' : 'L'} ${px(t).toFixed(1)} ${py(amount(t)).toFixed(1)} `
  }
  const startY = py(25000)
  const endY = py(25000 * Math.pow(1.08, 12))
  const landingY = py(62950)
  let grid = ''
  const gridSpec: [number, string][] = [[20000, '20,000'], [30000, '30,000'], [40000, '40,000'], [50000, '50,000'], [60000, '60,000']]
  for (const [A, lbl] of gridSpec) {
    grid += `<line x1="${PX0}" y1="${py(A).toFixed(1)}" x2="${PX1}" y2="${py(A).toFixed(1)}" stroke="#5eead4" stroke-width="1.2" stroke-dasharray="3 4"/>` +
      `<text x="${PX0 - 8}" y="${(py(A) + 3.5).toFixed(1)}" font-size="9.5" font-weight="600" fill="#0f766e" text-anchor="end">${lbl}</text>`
  }
  let ticks = ''
  for (let t = 0; t <= 12; t += 2) {
    ticks += `<line x1="${px(t).toFixed(1)}" y1="${PY0 - 6}" x2="${px(t).toFixed(1)}" y2="${PY0 + 6}" stroke="#0f766e" stroke-width="1.8"/>` +
      `<text x="${px(t).toFixed(1)}" y="${PY0 + 22}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${t}</text>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The compound ladder: twenty-five thousand rupees grows at eight percent per year for twelve years. The exact curve A equals 25000 times 1.08 to the power t is drawn true-to-scale, sampled point by point, climbing from twenty-five thousand at year zero to the exact landing sixty-two thousand nine hundred fifty-four point two five at year twelve, marked by an orange dot. A dashed amber level line at sixty-two thousand nine hundred fifty marks the four-figure table landing. The route annotation reads log A equals log 25000 plus 12 log 1.08 equals 4.3979 plus 0.4011 equals 4.7990, and antilog 4.7990 equals 6.295 times ten to the fourth equals sixty-two thousand nine hundred fifty. The footer states the honest gap: about four rupees in sixty-two thousand nine hundred fifty-four — six thousandths of one percent — thinner than the stroke of the curve itself.">
  <text x="${W / 2}" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the compound ladder: ₹25,000 at 8% per year — the table route against the exact curve</text>
  ${grid}
  <line x1="${PX0}" y1="${PY0}" x2="${PX1}" y2="${PY0}" stroke="#16a34a" stroke-width="2.2"/>
  <path d="M ${PX1} ${PY0} l -10 -5 v 10 z" fill="#16a34a"/>
  <text x="${(PX0 + PX1) / 2}" y="${PY0 + 42}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">years at 8% (t)</text>
  ${ticks}
  <text x="${PX0 - 44}" y="46" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">amount (₹)</text>
  <text x="94" y="82" font-size="10" font-weight="700" fill="#0f766e">the table route:</text>
  <text x="94" y="100" font-size="10" font-weight="700" fill="#0f766e">log A = log 25000 + 12 log 1.08</text>
  <text x="94" y="118" font-size="10" font-weight="700" fill="#0f766e">= 4.3979 + 0.4011 = 4.7990</text>
  <text x="94" y="136" font-size="10" font-weight="800" fill="#65a30d">antilog 4.7990 = 6.295 × 10⁴ = ₹62,950</text>
  <path d="${path}" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <circle cx="${px(0).toFixed(1)}" cy="${startY.toFixed(1)}" r="5.5" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>
  <text x="${px(0) + 12}" y="${startY - 8}" font-size="10.5" font-weight="800" fill="#166534">₹25,000</text>
  <line x1="${px(7.4).toFixed(1)}" y1="${landingY.toFixed(1)}" x2="${PX1}" y2="${landingY.toFixed(1)}" stroke="#d97706" stroke-width="1.6" stroke-dasharray="5 4"/>
  <text x="${px(7.4) - 6}" y="${landingY - 8}" font-size="9.5" font-weight="700" fill="#d97706" text-anchor="end">the four-figure landing ₹62,950</text>
  <circle cx="${px(12).toFixed(1)}" cy="${endY.toFixed(1)}" r="6.5" fill="#ea580c" stroke="#166534" stroke-width="1.5"/>
  <text x="${PX1 - 4}" y="${endY + 24}" font-size="10.5" font-weight="800" fill="#ea580c" text-anchor="end">the exact landing ₹62,954.25</text>
  <line x1="24" y1="${H - 30}" x2="696" y2="${H - 30}" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="${W / 2}" y="${H - 10}" font-size="9.5" font-weight="600" fill="#0f766e" text-anchor="middle">the honest gap: ₹4.25 in ₹62,954 — 0.006% — thinner than the curve's own stroke; the figure is the audit</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* Solution figure (L2 b) — the row-47 route strip                    */
/* ------------------------------------------------------------------ */
function row47RouteSvg(): string {
  const W = 720
  const H = 240
  const rowVals = [6721, 6730, 6739, 6749, 6758, 6767, 6776, 6785, 6794, 6803]
  const mdVals = [1, 2, 3, 4, 5, 6, 6, 7, 8]
  const cellW = 44
  const cellH = 32
  const rowY = 62
  const mdW = 40
  const mdY = 142
  const X0 = 64
  const landing = { x: 470, y: 48, w: 220, h: 62 }
  const engine = { x: 470, y: 150, w: 220, h: 62 }
  let rowCells = ''
  for (let c = 0; c <= 9; c++) {
    const x = X0 + c * cellW
    const hot = c === 2
    rowCells += `<rect x="${x}" y="${rowY}" width="${cellW}" height="${cellH}" fill="${hot ? '#ffedd5' : '#fef3c7'}" stroke="${hot ? '#ea580c' : '#16a34a'}" stroke-width="${hot ? 2.2 : 1.4}"/>` +
      `<text x="${x + cellW / 2}" y="${rowY + 21}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">${rowVals[c]}</text>` +
      `<text x="${x + cellW / 2}" y="${rowY - 6}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${c}</text>`
  }
  let mdCells = ''
  for (let d = 1; d <= 9; d++) {
    const x = X0 + (d - 1) * mdW
    const hot = d === 8
    mdCells += `<rect x="${x}" y="${mdY}" width="${mdW}" height="${cellH}" fill="${hot ? '#ffedd5' : '#fef3c7'}" stroke="${hot ? '#ea580c' : '#16a34a'}" stroke-width="${hot ? 2.2 : 1.4}"/>` +
      `<text x="${x + mdW / 2}" y="${mdY + 21}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">${mdVals[d - 1]}</text>` +
      `<text x="${x + mdW / 2}" y="${mdY - 6}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${d}</text>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The row-47 route for the logarithm of 4728 on the four-figure table strip. The top strip is row 47 across columns zero to nine with values 6721, 6730, 6739, 6749, 6758, 6767, 6776, 6785, 6794 and 6803, with the column-2 cell 6739 highlighted. The lower strip is the row-47 mean-difference columns for digits one to nine with values 1, 2, 3, 4, 5, 6, 6, 7 and 8, with the digit-8 cell value 7 highlighted. Amber arrows carry both reads into the route box reading 6739 plus 7 equals 6746, characteristic 3, so log 4728 is approximately 3.6746. The engine box reads 3.6746775 rounds to 3.6747 with the honest gap of one unit in the last place.">
  <text x="${W / 2}" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the row-47 route: 6739 + 7 = 6746 — one unit below the engine's 6747</text>
  <text x="${X0}" y="44" font-size="10" font-weight="700" fill="#0d9488">row 47 · columns 0–9 (the mantissas of 470–479)</text>
  ${rowCells}
  <text x="${X0}" y="124" font-size="10" font-weight="700" fill="#0d9488">row 47 · mean differences (digits 1–9)</text>
  ${mdCells}
  <line x1="246" y1="78" x2="${landing.x - 6}" y2="78" stroke="#d97706" stroke-width="1.8"/><path d="M ${landing.x - 4} 78 l -8 -5 v 10 z" fill="#d97706"/>
  <line x1="428" y1="158" x2="${landing.x - 6}" y2="158" stroke="#d97706" stroke-width="1.8"/><path d="M ${landing.x - 4} 158 l -8 -5 v 10 z" fill="#d97706"/>
  <rect x="${landing.x}" y="${landing.y}" width="${landing.w}" height="${landing.h}" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>
  <text x="${landing.x + landing.w / 2}" y="${landing.y + 18}" font-size="10" font-weight="800" fill="#0d9488" text-anchor="middle">THE ROUTE</text>
  <text x="${landing.x + landing.w / 2}" y="${landing.y + 38}" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">6739 + 7 = 6746</text>
  <text x="${landing.x + landing.w / 2}" y="${landing.y + 54}" font-size="9.5" font-weight="600" fill="#65a30d" text-anchor="middle">characteristic 3 → log 4728 ≈ 3.6746</text>
  <rect x="${engine.x}" y="${engine.y}" width="${engine.w}" height="${engine.h}" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
  <text x="${engine.x + engine.w / 2}" y="${engine.y + 18}" font-size="10" font-weight="800" fill="#ea580c" text-anchor="middle">THE ENGINE</text>
  <text x="${engine.x + engine.w / 2}" y="${engine.y + 38}" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">3.6746775 → 3.6747</text>
  <text x="${engine.x + engine.w / 2}" y="${engine.y + 54}" font-size="9.5" font-weight="600" fill="#d97706" text-anchor="middle">the honest gap: 1 unit in the last place</text>
  <text x="${W / 2}" y="${H - 8}" font-size="9.5" font-weight="600" fill="#0f766e" text-anchor="middle">rounded row entry + rounded mean difference → the last-place gap: the honest precision of four figures</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* Solution figure (L3 a) — the five-characteristic fan               */
/* ------------------------------------------------------------------ */
function charFanSvg(): string {
  const W = 720
  const H = 240
  const box = { x: 70, y: 96, w: 120, h: 48 }
  const chips: [string, number][] = [
    ['2136 — characteristic 3', 30],
    ['213.6 — characteristic 2', 72],
    ['2.136 — characteristic 0', 114],
    ['0.2136 — characteristic bar 1', 156],
    ['0.002136 — characteristic bar 3', 198],
  ]
  const chipX = 470
  const chipW = 214
  const chipH = 34
  let fan = ''
  for (const [label, y] of chips) {
    const cy = y + chipH / 2
    fan += `<line x1="${box.x + box.w + 6}" y1="${box.y + box.h / 2}" x2="${chipX - 8}" y2="${cy}" stroke="#d97706" stroke-width="1.8"/>` +
      `<path d="M ${chipX - 6} ${cy} l -8 -5 v 10 z" fill="#d97706"/>` +
      `<rect x="${chipX}" y="${y}" width="${chipW}" height="${chipH}" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>` +
      `<text x="${chipX + chipW / 2}" y="${y + 22}" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">${label}</text>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The five-characteristic family on one mantissa. A box on the left carries the mantissa .3296. Five amber arrows fan out to five chips on the right, one per characteristic: 2136 with characteristic 3, 213.6 with characteristic 2, 2.136 with characteristic 0, 0.2136 with characteristic bar 1, and 0.002136 with characteristic bar 3. The left annotation reads the digits 2, 1, 3, 6 never change — only the point moves. The engine note reads 10 to the 0.3296 equals 2.1359939, giving the four-figure digits 2136.">
  <text x="${W / 2}" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">one mantissa, five characteristics — the .3296 family</text>
  <text x="${box.x + box.w / 2}" y="86" font-size="10" font-weight="800" fill="#0d9488" text-anchor="middle">the mantissa</text>
  <rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="2.2"/>
  <text x="${box.x + box.w / 2}" y="${box.y + 31}" font-size="18" font-weight="800" fill="#166534" text-anchor="middle">.3296</text>
  ${fan}
  <text x="56" y="172" font-size="10" font-weight="700" fill="#65a30d">the digits 2·1·3·6</text>
  <text x="56" y="190" font-size="10" font-weight="700" fill="#65a30d">never change —</text>
  <text x="56" y="208" font-size="10" font-weight="700" fill="#65a30d">only the point moves</text>
  <text x="56" y="230" font-size="9.5" font-weight="600" fill="#0f766e">engine: 10^0.3296 = 2.1359939</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* Solution figure (L5 c) — the doubling ladder at 5% per period       */
/* ------------------------------------------------------------------ */
function doublingLadderSvg(): string {
  const W = 720
  const H = 240
  const railY = 120
  const RX0 = 110
  const RX1 = 620
  const V0 = 0.29
  const V1 = 0.33
  const vx = (v: number): number => RX0 + ((v - V0) / (V1 - V0)) * (RX1 - RX0)
  const x14 = vx(0.2967)
  const xLog2 = vx(0.3010)
  const x15 = vx(0.3178)
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The log ladder for five percent growth. A horizontal rail of logarithm values runs from 0.29 to 0.33. An amber window brackets the stretch from 14 log 1.05 equals 0.2967 to 15 log 1.05 equals 0.3178, and inside it sits the green target dot at log 2 equals 0.3010, the doubling threshold. Below the 0.2967 mark: 1.05 to the fourteenth equals 1.9799, less than 2. Below the 0.3178 mark: 1.05 to the fifteenth equals 2.0789, greater than 2. The conclusion line reads the threshold sits inside the window, so the fifteenth period is the first to pass double. The engine note reads 1.05 to the fourteenth equals 1.9799316 and 1.05 to the fifteenth equals 2.0789282.">
  <text x="${W / 2}" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the log ladder at 5% per period: 14 log 1.05 &lt; log 2 &lt; 15 log 1.05</text>
  <text x="620" y="60" font-size="9.5" font-weight="600" fill="#0d9488" text-anchor="end">engine: 1.05^14 = 1.9799316, 1.05^15 = 2.0789282</text>
  <rect x="${x14.toFixed(1)}" y="92" width="${(x15 - x14).toFixed(1)}" height="56" fill="#fef3c7" stroke="#d97706" stroke-width="1.6" rx="4"/>
  <text x="${((x14 + x15) / 2).toFixed(1)}" y="164" font-size="9.5" font-weight="700" fill="#d97706" text-anchor="middle">the bracket window (0.2967 → 0.3178)</text>
  <line x1="${RX0}" y1="${railY}" x2="${RX1}" y2="${railY}" stroke="#16a34a" stroke-width="2.4"/>
  <path d="M ${RX1} ${railY} l -10 -5 v 10 z" fill="#16a34a"/>
  <line x1="${x14.toFixed(1)}" y1="${railY - 7}" x2="${x14.toFixed(1)}" y2="${railY + 7}" stroke="#d97706" stroke-width="2"/>
  <circle cx="${x14.toFixed(1)}" cy="${railY}" r="5.5" fill="#d97706" stroke="#166534" stroke-width="1.3"/>
  <text x="${x14.toFixed(1)}" y="186" font-size="10" font-weight="800" fill="#d97706" text-anchor="middle">14 log 1.05 = 0.2967</text>
  <text x="${x14.toFixed(1)}" y="204" font-size="9.5" font-weight="600" fill="#65a30d" text-anchor="middle">1.05^14 = 1.9799 &lt; 2</text>
  <line x1="${x15.toFixed(1)}" y1="${railY - 7}" x2="${x15.toFixed(1)}" y2="${railY + 7}" stroke="#d97706" stroke-width="2"/>
  <circle cx="${x15.toFixed(1)}" cy="${railY}" r="5.5" fill="#d97706" stroke="#166534" stroke-width="1.3"/>
  <text x="${x15.toFixed(1)}" y="186" font-size="10" font-weight="800" fill="#d97706" text-anchor="middle">15 log 1.05 = 0.3178</text>
  <text x="${x15.toFixed(1)}" y="204" font-size="9.5" font-weight="600" fill="#65a30d" text-anchor="middle">1.05^15 = 2.0789 &gt; 2</text>
  <line x1="${xLog2.toFixed(1)}" y1="${railY - 8}" x2="${xLog2.toFixed(1)}" y2="${railY - 26}" stroke="#166534" stroke-width="1.6" stroke-dasharray="4 3"/>
  <circle cx="${xLog2.toFixed(1)}" cy="${railY}" r="6.5" fill="#16a34a" stroke="#166534" stroke-width="2"/>
  <text x="${xLog2.toFixed(1)}" y="86" font-size="10.5" font-weight="800" fill="#166534" text-anchor="middle">log 2 = 0.3010 — the doubling threshold</text>
  <text x="${W / 2}" y="228" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the threshold sits inside the window → the 15th period is the first to pass double</text>
</svg>`
}

/* ==================================================================== */
/* Lesson 9.6 — Logarithm Tables: Characteristic, Mantissa and          */
/*             Antilogarithm                                            */
/* ==================================================================== */

export const lesson96: Lesson = {
  id: 'aa-logarithm-tables-characteristic-mantissa-and-antilogarithm',
  number: '9.6',
  title: 'Logarithm Tables: Characteristic, Mantissa and Antilogarithm',
  concepts: [
    'standard form and the two-part logarithm',
    'the characteristic read by inspection',
    'the mantissa and its invariance',
    'the four-figure table and mean differences',
    'bar notation for negative characteristics',
    'the antilogarithm and the five-step antilog method',
    'the digits-count craft',
    'four-figure precision and its honest limits',
  ],
  objectives: [
    'Split any positive number as n = m × 10^p and read log n = p + log m: the integral part p — the characteristic — by inspection, the fractional part — the mantissa — from the significant digits.',
    'Apply both inspection rules: for n at least 1 the characteristic is one less than the digit count left of the decimal point; for n between 0 and 1 it is negative, with magnitude one more than the zero count after the point.',
    'Use bar notation correctly: log 0.023 = 2̄.36173 means −2 + 0.36173, never −2.36173 — and evaluate a bar-form logarithm as a single number.',
    'Look up a four-figure mantissa through the row of the first two digits, the column of the third, and the mean difference of the fourth — and audit the last-place gap against the engine.',
    'Run the five-step antilogarithm method, including the Step-I normalization of a negative decimal part (−2.5983 = 3̄.4017), to recover a number from its logarithm.',
    'Put the tables to work: multiplication, division, powers and roots, compound growth, and the digits-count craft (the number of digits in 2^64 read from 64 log 2).',
    'State the honest precision of a four-figure table: the route lands within about one unit of the correctly rounded value, and the gap is a design property, never a mistake.',
  ],
  prerequisites: [
    'aa-the-laws-of-logarithms-and-the-change-of-base',
    'aa-exponential-and-logarithmic-series',
    'fm-decimal-places-and-the-point',
  ],
  sources: [
    'cengage-m1-01',
    'cengage-jee-style',
    'hall-knight-higher-algebra',
    'jee-main-2026-syllabus',
  ],
  blocks: [
    { kind: 'para', text: 'Lesson 9.5 ended with a machine of a very unusual kind: a pair of series that could compute the logarithm of any number you can name, to as many decimal places as patience allows. That machine was built for one purpose — this lesson. A table of logarithms is nothing but that series, evaluated once, in advance, and written down; and once it is written down, the person who uses it needs no series at all, only the discipline of reading. So this lesson is the user\'s manual of the machine lesson 9.5 built: the four-figure common-log table on one side of the page, and its mirror image, the antilog table, on the other. Two tables, two directions, one identity.' },
    { kind: 'para', text: 'The architecture that makes a table possible at all is a single split. Every positive number $n$ can be written in the standard form $n = m \\times 10^{p}$ with $1 \\leq m < 10$ and $p$ an integer — slide the decimal point until exactly one nonzero digit stands to its left, and count the slides. Taking logs of that split gives $\\log n = p + \\log m$: an INTEGER plus a FRACTION. The integer $p$ is readable straight off the decimal point by inspection, in your head, with no table at all. The fraction $\\log m$ depends only on the digit string of $m$ — the significant digits — and that is the part the table stores. The work of the logarithm has been deliberately torn in two, and the two halves are handled by two entirely different skills.' },
    { kind: 'para', text: 'Those two skills are the whole lesson. The mantissa never changes when the decimal point moves — the numbers $25795$, $2579.5$, $25.795$ and $0.25795$ all consult the same row of the table — while the characteristic always does. The characteristic is the decimal point\'s business; the mantissa is the significant digits\' business; and no amount of one ever leaks into the other. This lesson builds the split formally (with the two inspection rules proved from the standard form), reads the four-figure table with its mean-difference columns, runs the mirror machine — the antilogarithm — through a five-step method that includes the one genuinely tricky case, a negative decimal part, and then puts the whole apparatus to work on the classic jobs: products, quotients, roots, compound growth and the counting of digits. Every table value printed below is computed by this platform\'s own engine, and every route is audited against that engine\'s direct value — including the honest one-unit wobble in the last place, which we will not hide, because a table used without its error budget is a table misused.' },

    { kind: 'heading', text: 'Standard Form and the Two-Part Log' },
    { kind: 'para', text: 'Begin with the split itself, done slowly once. Take $n = 4728$. Slide the decimal point three places left: $4728 = 4.728 \\times 10^{3}$. The mantissa part is $m = 4.728$, which lies in $[1, 10)$ as required; the power is $p = 3$. Take $n = 0.0004728$: slide the point four places right, $0.0004728 = 4.728 \\times 10^{-4}$, the same $m$ with $p = -4$. Take $n = 21.5 = 2.15 \\times 10^{1}$. In every case the product law of lesson 9.3 converts the split into a split of the logarithm: $\\log n = \\log m + p \\log 10 = p + \\log m$, using $\\log 10 = 1$ — the one value the table does not need to store, because it is the base\'s own definition.' },
    { kind: 'callout', tone: 'definition', title: 'Characteristic and mantissa', text: 'Let $n$ be a positive number written in the standard form $n = m \\times 10^{p}$ with $1 \\leq m < 10$ and $p$ an integer. The **characteristic** of $\\log_{10} n$ is said to be the integral part $p$ — positive, negative or zero — and the **mantissa** is the fractional part $\\log_{10} m$, a number in $[0, 1)$. Thus the common logarithm of every positive number splits as characteristic plus mantissa, and the two parts come from two different places: the characteristic from the position of the decimal point, the mantissa from the significant digits of $n$.' },
    { kind: 'equation', latex: '\\log_{10} n = \\underbrace{p}_{\\text{characteristic}} + \\underbrace{\\log_{10} m}_{\\text{mantissa}} \\tag{1}', note: 'for $n = m \\times 10^{p}$ with $1 \\leq m < 10$: the integer $p$ is read off the decimal point by inspection, the fraction $\\log m$ looked up from the digit string — $\\log 4728 = 3 + 0.6747$ (the engine\'s direct value $3.6746775$).' },
    { kind: 'para', text: 'For example, the split on three witnesses of very different sizes:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $\\log 4728 = \\log(4.728 \\times 10^{3}) = 3 + 0.6747 = 3.6747$ — characteristic $3$, mantissa $0.6747$;',
      '(ii) $\\log 628 = \\log(6.28 \\times 10^{2}) = 2 + 0.7980 = 2.7980$ — characteristic $2$, mantissa $0.7980$ (the engine: $2.7979596$);',
      '(iii) $\\log 0.023 = \\log(2.3 \\times 10^{-2}) = -2 + 0.3617 = \\bar{2}.36173$ — characteristic $-2$, mantissa $0.3617278$; the bar notation is explained just below.',
    ] },
    { kind: 'para', text: 'The characteristic deserves its own inspection rules, because it is the half of the split that never needs a table. Counting digits is all it takes. For a number at least $1$, count the digits to the left of the decimal point; the characteristic is one less than that count. For a number between $0$ and $1$, count the zeros between the point and the first nonzero digit; the characteristic is negative, and its magnitude is one more than that zero count. Both rules are theorems, not conventions — they follow from the standard form in two lines each — and the derivation below proves them together with the mantissa invariance that the whole table economy runs on.' },
    { kind: 'callout', tone: 'theorem', title: 'The two characteristic rules', text: 'For a positive number $n$: (i) if $n \\geq 1$, the characteristic of $\\log n$ equals the number of digits left of the decimal point, minus one; (ii) if $0 < n < 1$, the characteristic is negative, equal to minus (the number of zeros between the decimal point and the first nonzero digit, plus one). Thus $\\log 4728$ has characteristic $4 - 1 = 3$; $\\log 628$ has $3 - 1 = 2$; $\\log 6.28$ has $1 - 1 = 0$; $\\log 0.628$ has $-(0 + 1) = -1$; and $\\log 0.0004728$ has $-(3 + 1) = -4$. Every rule in this callout is engine-checked below against $\\lfloor \\log_{10} n \\rfloor$ on the full roster.' },
    { kind: 'table', caption: 'The characteristic roster — every row engine-checked three ways: the standard-form exponent, the digit rule and the zero rule all agree with floor(log n) (the v-aa96 engine). Note what is silent in this table: the digits themselves. The characteristic is the decimal point\'s business alone.', head: ['Number', 'Standard form', 'Characteristic', 'The inspection read'], rows: [
      ['$4728$', '$4.728 \\times 10^{3}$', '$3$', 'four digits left of the point: $4 - 1 = 3$'],
      ['$628$', '$6.28 \\times 10^{2}$', '$2$', 'three digits left of the point: $3 - 1 = 2$'],
      ['$6.28$', '$6.28 \\times 10^{0}$', '$0$', 'one digit left of the point: $1 - 1 = 0$'],
      ['$0.628$', '$6.28 \\times 10^{-1}$', '$-1$ (bar 1)', 'no zero after the point before the 6: $-(0 + 1) = -1$'],
      ['$0.0004728$', '$4.728 \\times 10^{-4}$', '$-4$ (bar 4)', 'three zeros after the point before the 4: $-(3 + 1) = -4$'],
      ['$21.5$', '$2.15 \\times 10^{1}$', '$1$', 'two digits left of the point: $2 - 1 = 1$'],
    ] },
    { kind: 'example', title: 'Write each member of the roster in standard form, read the characteristic both ways, and confirm the two rules agree on every row', steps: [
      'Set up the standard forms first: $4728 = 4.728 \\times 10^{3}$, $628 = 6.28 \\times 10^{2}$, $6.28 = 6.28 \\times 10^{0}$, $0.628 = 6.28 \\times 10^{-1}$, $0.0004728 = 4.728 \\times 10^{-4}$ and $21.5 = 2.15 \\times 10^{1}$ — one nonzero digit left of the point in every case, so each $m$ lies in $[1, 10)$ as the definition demands.',
      'So, read the characteristic off the exponent (the standard-form way): $3, 2, 0, -1, -4, 1$ respectively.',
      'Now, read it off the decimal point (the inspection way): $4728$ and $628$ and $6.28$ and $21.5$ sit at or above $1$, so the digit rule gives $4-1$, $3-1$, $1-1$ and $2-1$; $0.628$ and $0.0004728$ sit below $1$, so the zero rule gives $-(0+1)$ and $-(3+1)$.',
      'Check the two columns against each other: $3 = 3$, $2 = 2$, $0 = 0$, $-1 = -1$, $-4 = -4$, $1 = 1$ — the exponent read and the inspection read agree on all six rows, which is exactly what the theorem below proves must happen.',
      'Hence the roster is banked: characteristic by inspection, mantissa by table, and the engine\'s floor check $\\lfloor \\log_{10} n \\rfloor$ confirms every row ($\\log 4728 = 3.6746775$ down to $\\log 0.0004728 = -3.3253225$, characteristics $3$ to $-4$).',
    ] },
    { kind: 'derivation', title: 'Theorem: the two characteristic rules and the mantissa invariance', statement: 'For a positive number n written in the standard form n = m × 10^p with 1 ≤ m < 10: (i) if n ≥ 1 with k digits left of the decimal point, the characteristic of log n is k − 1; (ii) if 0 < n < 1 with z zeros between the point and the first nonzero digit, the characteristic is −(z + 1); and (iii) multiplying n by any power of ten moves the characteristic alone — the mantissa is a function of the significant digits only.', steps: [
      { label: 'The split', formula: 'n = m \\times 10^{p}, \\quad \\log_{10} n = \\log_{10} m + p', explanation: 'Every positive number admits this form: slide the decimal point until one nonzero digit stands left of it, and the count of slides is $p$. The product law of lesson 9.3 does the rest, with $\\log 10 = 1$.' },
      { label: 'The mantissa is boxed into a fraction', formula: '1 \\leq m < 10 \\;\\Rightarrow\\; 0 \\leq \\log_{10} m < 1', explanation: 'The base-10 logarithm is strictly increasing (its base exceeds 1), so the bounds on $m$ transport to bounds on $\\log m$: a number in $[0, 1)$. Hence $\\log n$ really is an integer plus a proper fraction — the integer is the characteristic, the fraction the mantissa, and no other split is possible.' },
      { label: 'Rule one: the digit count', formula: '10^{k-1} \\leq n < 10^{k} \\;\\Rightarrow\\; k-1 \\leq \\log_{10} n < k', explanation: 'A number with exactly $k$ digits left of the point is at least $10^{k-1}$ (the smallest $k$-digit number) and strictly less than $10^{k}$ (one past the largest). Logs (increasing) give $k - 1 \\leq \\log n < k$, and the only integer in that half-open interval is $k - 1$: the characteristic, one less than the digit count.' },
      { label: 'Rule two: the zero count', formula: '10^{-(z+1)} \\leq n < 10^{-z} \\Rightarrow -(z+1) \\leq \\log n < -z', explanation: 'If $z$ zeros stand between the point and the first nonzero digit $d$, then $n \\geq d \\times 10^{-(z+1)} \\geq 10^{-(z+1)}$ (as $d \\geq 1$) while $n < 10^{-z}$ (the first digit sits in the $(z+1)$-th place). The log lands in the half-open interval $[-(z+1), -z)$, whose only integer is $-(z+1)$: a negative characteristic with magnitude one more than the zero count — written with a bar.' },
      { label: 'The mantissa invariance', formula: '\\log_{10}(m \\times 10^{k}) = \\log_{10} m + k', explanation: 'Multiplying by $10^{k}$ adds the integer $k$ to the logarithm. Since the mantissa was the fractional part, and $\\log m$ already fills $[0, 1)$ completely, adding an integer cannot move the fractional part at all: $4728$, $47.28$ and $0.04728$ share one mantissa ($0.6746775$) and differ only in characteristics $3, 1, -2$.' },
    ], result: 'Hence the two-part reading is structural: the characteristic comes from the decimal point ($k - 1$ digits, or $\\bar{z+1}$ zeros), the mantissa from the digit string alone — $\\log 4728 = 3 + 0.6746775$, $\\log 47.28 = 1 + 0.6746775$, $\\log 0.04728 = -2 + 0.6746775 = \\bar{2}.6746775$ — one mantissa, three characteristics, all three engine-checked.' },
    { kind: 'para', text: 'The negative characteristic needs one notational guard, because a minus sign in the middle of a decimal is an invitation to disaster. When the characteristic is negative, it is written with a bar over the digit and the mantissa is left untouched: $\\log 0.023 = -2 + 0.3617278$ is written $\\bar{2}.36173$, the bar sitting over the $2$ alone. The bar is a paired notation — it pairs a negative integer with a positive fraction — and it never turns the whole expression into a single negative decimal.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the bar is a paired notation, never a minus sign', text: 'The symbol $\\bar{2}.36173$ means $-2 + 0.36173$, NOT $-2.36173$. The mantissa in a table is always positive, so a negative characteristic must ride with its own sign, above the line. Writing $\\bar{2}.36173 = -2.36173$ silently converts a positive mantissa into a negative one and changes the number completely: $-2 + 0.36173 = -1.63827$, while $-2.36173$ is a different number entirely. The engine pins the truth: $\\log 0.023 = -1.6382722$.' },
    { kind: 'equation', latex: '\\log 0.023 = \\bar{2}.36173 = -1.63827 \\tag{2}', note: 'the bar over the 2 alone: characteristic $-2$ by the zero rule (one zero after the point), mantissa $0.3617278$ from the digits 2·3 — the engine\'s direct value $-1.6382722$.' },
    { kind: 'callout', tone: 'insight', title: 'The mantissa never moves', text: 'Slide the decimal point anywhere: the mantissa stays. The numbers $25795$, $2579.5$, $257.95$, $25.795$, $2.5795$ and $0.25795$ all carry the digit string 2·5·7·9·5, so they all share one mantissa — $0.4115$ (the engine: $\\log 25795 = 4.4115355$). What changes from member to member is only the characteristic: $4, 3, 2, 1, 0, -1$. This is why a four-figure table can be small: it need only store one row per significant-digit prefix, not one per number. A billion numbers share each row.' },
    { kind: 'figure', caption: 'The two-part machine. The number 4728 feeds two different lookups: its digit string 4·7·2·8 runs along the upper pipe into the mantissa box (the table\'s row 47, column 2, plus the digit-8 mean difference — the printed route lands .6746, the engine\'s correctly rounded mantissa .6747), while its decimal position runs along the lower pipe into the characteristic box (four digits left of the point, so $4 - 1 = 3$). The two halves recombine on the right: $\\log 4728 = 3.6747$, the engine\'s own $3.6746775$. The machine is the lesson in one picture: digits to the mantissa, point to the characteristic, and the honest one-unit gap between the printed route and the engine stated at the foot.', svg: twoPartMachineSvg() },

    { kind: 'heading', text: 'The Four-Figure Table' },
    { kind: 'para', text: 'Now the table itself. A four-figure common-log table is organised by the split. Its rows are the first two significant digits ($10$ through $99$); its columns are the third digit ($0$ through $9$); and attached to each row stands a second bank of little columns — the mean differences — which price the fourth digit. The row-and-column entry is the four-figure mantissa of the three-digit prefix: the entry in row $21$, column $3$ is the mantissa of $213$; the entry in row $47$, column $2$ is the mantissa of $472$. The mean-difference columns then add the increment for the fourth digit, so that a four-digit number gets its four-figure mantissa from one row, one column and one small addition.' },
    { kind: 'para', text: 'One point of provenance, stated plainly: the excerpt below is this platform\'s OWN table, computed by the verifier\'s engine before this prose was written — the row entries are the rounded mantissas $\\operatorname{round}(10000 \\cdot \\log_{10}(\\text{prefix}))$ and each mean difference is the rounded increment $\\operatorname{round}\\!\\left(10000 \\cdot \\log_{10}(1 + \\tfrac{d}{100R})\\right)$ for row $R$, fourth digit $d$. Nothing is copied from any printed book; the historical printed tables (Briggs\'s fourteen-place Arithmetica logarithmica of 1624, filled out to $100{,}000$ by Vlacq in 1628, down to the pocket four-figure descendants) were built to serve exactly this read, and the engine rebuilds the small corner of one here.' },
    { kind: 'table', caption: 'The lesson\'s own four-figure excerpt — rows 21 and 47 in full, mean differences included, every value computed by the v-aa96 engine (rounded mantissas of the prefixes 210–219 and 470–479; rounded increments for the fourth digit). A full table runs the rows 10–99 exactly this way. Read a three-digit prefix straight off; read a four-digit number by adding the fourth digit\'s mean difference.', head: ['Row', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Mean differences 1–9'], rows: [
      ['21', '3222', '3243', '3263', '3284', '3304', '3324', '3345', '3365', '3385', '3404', '2 · 4 · 6 · 8 · 10 · 12 · 14 · 17 · 19'],
      ['47', '6721', '6730', '6739', '6749', '6758', '6767', '6776', '6785', '6794', '6803', '1 · 2 · 3 · 4 · 5 · 6 · 6 · 7 · 8'],
    ] },
    { kind: 'para', text: 'Read the anatomy off the excerpt once, slowly. Row $21$, column $3$ holds $3284$ — the four-figure mantissa of $\\log 213$ (the engine\'s exact $\\log 213 = 2.32838$, which rounds to $0.3284$). Move along the row and the entries climb by about $20$ per column: consecutive three-digit prefixes have nearly-equal logarithms, and those small climbs ARE the point — they are exactly what the mean-difference bank approximates. Row $47$, column $2$ holds $6739$ ($\\log 472 = 2.6739420$, rounding to $0.6739$). The mean-difference bank for row $21$ runs $2, 4, 6, 8, 10, 12, 14, 17, 19$: the fourth digit $6$ adds $12$, and the digit $8$ adds $17$. For row $47$ the columns climb only about $10$ per step, so the mean differences run $1$ through $8$: the fourth digit $8$ adds just $7$.' },
    { kind: 'example', title: 'Find log 4728 by the four-figure route, and audit the last place against the engine', steps: [
      'Set up the digits: the significant digits of $4728$ are $4, 7, 2, 8$ — row $47$, column $2$ for the first three.',
      'So, read the base: row $47$, column $2$ gives $6739$ — the mantissa of the prefix $472$ to four figures.',
      'Now, add the fourth digit: the digit $8$ consults the row-$47$ mean differences and adds $7$, giving $6739 + 7 = 6746$ — the mantissa $0.6746$.',
      'Place the characteristic: $4728$ has four digits left of the point, so the characteristic is $4 - 1 = 3$.',
      'Hence $\\log 4728 \\approx 3 + 0.6746 = 3.6746$.',
      'Audit: the engine\'s direct value is $\\log 4728 = 3.6746775$, which rounds to $3.6747$ — the route is one unit low in the last place. That gap is not a slip; it is the honest behaviour of a four-figure route (a rounded row entry plus a rounded mean difference), and the insight below prices it exactly.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The honest last-place gap', text: 'A four-figure route can land one unit off the correctly rounded mantissa, because it adds two rounded quantities: the row entry ($6739$, already rounded down from $6739.42$) and the mean difference ($7$, rounded from the exact increment). On $4728$ the route lands $6746$ against the correctly rounded $6747$ — one unit low. The v-aa96 engine swept ALL $9{,}000$ four-digit numbers with this table\'s conventions: the route lands within one unit of the correctly rounded mantissa for $8{,}921$ of them ($99.1\\%$), with the remaining $79$ off by at most three units. That is the honest small print of four-figure tables — the leading figures are trustworthy, the last figure carries a budget of about one unit, and any computation that needs better should carry more figures, not hope.' },
    { kind: 'example', title: 'Find log 2136 by the four-figure route, and read its whole family off the one mantissa', steps: [
      'Set up the digits: the significant digits of $2136$ are $2, 1, 3, 6$ — row $21$, column $3$ for the first three.',
      'So, read the base: row $21$, column $3$ gives $3284$; then the fourth digit $6$ adds the row-$21$ mean difference $12$, giving $3284 + 12 = 3296$ — the mantissa $0.3296$.',
      'Place the characteristic: four digits left of the point, so $4 - 1 = 3$.',
      'Hence $\\log 2136 \\approx 3.3296$.',
      'Audit: the engine\'s direct value is $\\log 2136 = 3.3296012$, which rounds to $3.3296$ — the route meets the correctly rounded value exactly: gap $0$, the clean case.',
      'And the family rides free: $\\log 2.136 = 0.3296$ (characteristic $0$), $\\log 0.2136 = \\bar{1}.3296$ (one zero after the point, so characteristic $-1$) and $\\log 0.002136 = \\bar{3}.3296$ (two zeros, characteristic $-3$). One mantissa, every characteristic — the invariance cashed.',
    ] },
    { kind: 'table', caption: 'One mantissa, seven characteristics — the whole family of the digit string 2136. The engine pins the common exact mantissa $0.3296012$ ($\\log 2136 = 3.3296012$), which rounds to $.3296$ in every row. The decimal point moves; the digits $2 \\cdot 1 \\cdot 3 \\cdot 6$ never do.', head: ['Number', 'Standard form', 'log (two-part form)', 'Characteristic', 'Mantissa'], rows: [
      ['$2136$', '$2.136 \\times 10^{3}$', '$3.3296$', '$3$', '$.3296$'],
      ['$213.6$', '$2.136 \\times 10^{2}$', '$2.3296$', '$2$', '$.3296$'],
      ['$21.36$', '$2.136 \\times 10^{1}$', '$1.3296$', '$1$', '$.3296$'],
      ['$2.136$', '$2.136 \\times 10^{0}$', '$0.3296$', '$0$', '$.3296$'],
      ['$0.2136$', '$2.136 \\times 10^{-1}$', '$\\bar{1}.3296$', '$-1$', '$.3296$'],
      ['$0.02136$', '$2.136 \\times 10^{-2}$', '$\\bar{2}.3296$', '$-2$', '$.3296$'],
      ['$0.002136$', '$2.136 \\times 10^{-3}$', '$\\bar{3}.3296$', '$-3$', '$.3296$'],
    ] },
    { kind: 'terms', items: [
      { term: 'Standard form', def: 'the writing $n = m \\times 10^{p}$ with $1 \\leq m < 10$ and $p$ an integer — one nonzero digit left of the decimal point; the split that tears $\\log n$ into characteristic plus mantissa.' },
      { term: 'Characteristic', def: 'the integral part $p$ of $\\log_{10} n$ in standard form — positive, negative or zero — readable off the decimal point by inspection: one less than the digit count for $n \\geq 1$, or $-(\\text{zeros} + 1)$ for $0 < n < 1$.' },
      { term: 'Mantissa', def: 'the fractional part $\\log_{10} m \\in [0, 1)$ of $\\log_{10} n$ — a function of the significant digits alone, looked up in the table, unchanged by any slide of the decimal point.' },
      { term: 'Bar notation', def: 'the paired writing of a negative characteristic: $\\bar{2}.36173$ means $-2 + 0.36173$ — the bar sits over the characteristic\'s digit alone, and the mantissa stays positive.' },
      { term: 'Significant digits', def: 'the digit string of $n$ read from its first nonzero digit — the input the mantissa depends on; $4728$, $47.28$ and $0.04728$ share it.' },
      { term: 'Mean difference', def: 'the small increment a four-figure table adds for the FOURTH significant digit: the rounded climb of the mantissa per unit of the last digit, printed as a side bank on each row.' },
      { term: 'Antilogarithm', def: 'the inverse of the table: the positive number $n$ with $\\log n = m$, written $\\operatorname{antilog} m = 10^{m}$ — digits recovered from the mantissa, the decimal point placed by the characteristic.' },
      { term: 'Four-figure precision', def: 'the honest error budget of a four-figure route: the printed values are rounded, so a completed lookup can land about one unit off the correctly rounded four-figure value — the engine sweeps it at $99.1\\%$ within one unit.' },
    ] },
    { kind: 'callout', tone: 'historical', title: 'From Briggs\'s fourteen places to the pocket strip', text: 'Napier published his logarithms in 1614; Henry Briggs, after correspondence with Napier, re-scaled the idea to powers of ten and brought out the Arithmetica logarithmica in 1624 carrying the logarithms of $1$ to $20{,}000$ and $90{,}000$ to $100{,}000$ to fourteen places — with the gap $20{,}000$ to $90{,}000$ completed by Adriaan Vlacq by 1628. Hall and Knight\'s Higher Algebra closes its own tables chapter by showing how rows are BUILT: from the very series of lesson 9.5, with the modulus $\\mu = 0.43429448$ converting natural to common logarithms, it derives $\\log 2 = 0.3010300$ and $\\log 3 = 0.4771213$ — the two values every table user memorises and every engine re-verifies. The four-figure strip on this page is the pocket-sized descendant of that construction, rebuilt by our own engine rather than transcribed from any of them.' },

    { kind: 'heading', text: 'The Antilogarithm' },
    { kind: 'para', text: 'The table built so far answers one question: given a number, find its logarithm. The mirror question is just as real: given a logarithm, find the number. Every equation solved by logs ends there — the unknown arrives as a logarithm and must leave as a number. The machine that runs this direction is the antilogarithm, and the table that serves it is the antilog table: the log table read backwards. Where the log table\'s rows are digit prefixes and its entries are mantissas, the antilog table\'s rows are mantissa prefixes and its entries are digit strings — the same two columns, swapped.' },
    { kind: 'callout', tone: 'definition', title: 'Antilogarithm', text: 'The **antilogarithm** of a number $m$ is said to be the positive number $n$ with $\\log_{10} n = m$; it is written $\\operatorname{antilog} m$, and it equals $10^{m}$ by the definition of the logarithm. Thus antilog is the inverse machine of the log table: it consumes a logarithm and returns the number that produced it.' },
    { kind: 'equation', latex: '\\operatorname{antilog} m = 10^{m}, \\qquad \\log_{10}(\\operatorname{antilog} m) = m \\tag{3}', note: 'the identity mirror: log and antilog undo each other — antilog 2 = 100, antilog 0.3010 = 2.0000 (the engine: $10^{0.3010300} = 2$).' },
    { kind: 'para', text: 'For example, three landings straight off the definition and the table:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $\\operatorname{antilog} 2 = 10^{2} = 100$ — an integer characteristic with zero mantissa is a pure power of ten;',
      '(ii) $\\operatorname{antilog} 0.3296 = 2.136$ — the mantissa $.3296$ returns the digits $2\\,1\\,3\\,6$ (the engine: $10^{0.3296} = 2.1359939$, which rounds to $2.136$), and the characteristic $0$ places one digit left of the point;',
      '(iii) $\\operatorname{antilog} \\bar{1}.3296 = 0.2136$ — the same digits, characteristic $\\bar{1}$: no digits left of the point and no zeros after it.',
    ] },
    { kind: 'para', text: 'The antilog table is read by a fixed five-step method, and the method earns its formality because one of the five steps is genuinely tricky: when the decimal part of the given logarithm is NEGATIVE — as it is for any bare negative number like $-2.5983$ — the mantissa must be normalised into $[0, 1)$ before the table can be opened at all. The method below is the house version of the classic five steps; every example that follows runs it in order, naming the steps.' },
    { kind: 'algorithm', title: 'The five-step antilog method', lines: [
      { code: 'Step I — normalize: if the decimal part is negative, add 1 to it and subtract 1 from the integral part', note: '$-2.5983 = -2 - 0.5983 = -3 + 0.4017 = \\bar{3}.4017$ — the mantissa must sit in [0, 1) before the table opens' },
      { code: 'Step II — open the antilog table at the row of the first two decimal digits of the mantissa', note: 'mantissa $.6747 \\to$ row $.67$' },
      { code: 'Step III — read the entry in the column of the third digit', note: 'column $4 \\to 4721$ (the engine: $10^{0.674} = 4.7206$, so the entry is the four digits of $4.721$)' },
      { code: 'Step IV — add the mean difference of the fourth digit', note: 'the digit $7$ adds its proportional part, completing the four significant digits $4\\,7\\,2\\,8$' },
      { code: 'Step V — place the decimal point by the characteristic', note: 'positive $p$: $p + 1$ digits left of the point; bar $n$: $n - 1$ zeros after the point, then the digits' },
    ], note: 'the mirror of the log-table route: the digits come from the mantissa, the point from the characteristic — exactly the two-part split run backwards.' },
    { kind: 'example', title: 'Find the antilog of 2.6747 by the five-step method — the mirror of log 4728', steps: [
      'Step I (normalize): the decimal part $0.6747$ is already positive, so nothing to do — the given logarithm is in table form, characteristic $2$ with mantissa $0.6747$.',
      'Steps II–III (the row and the column): open the antilog table at row $.67$ and read column $4$: the entry is $4721$ (the engine: $10^{0.674} = 4.7206$, whose four significant digits are $4721$).',
      'Step IV (the mean difference): the fourth digit $7$ adds its proportional part — the exact increment is $7.6$, between $7$ and $8$ on the strip — and the engine settles the last digit: $10^{0.6747} = 4.7282453$, so the four significant digits are $4\\,7\\,2\\,8$.',
      'Step V (the point): characteristic $2$ is positive, so $2 + 1 = 3$ digits stand left of the decimal point: $472.8$.',
      'Hence $\\operatorname{antilog} 2.6747 = 472.8$ (the engine: $472.8245$).',
      'The round trip closes: $\\log 4728 \\approx 3.6747$ ran forward through the log table, and $\\operatorname{antilog} 2.6747 = 472.8$ runs the same digits back — one machine, both directions, with $472.8 \\times 10 = 4728$ the bridge.',
    ] },
    { kind: 'example', title: 'Find the antilog of 0.3296, 1.3296, 3.3296, bar-1 point 3296 and bar-3 point 3296 — the five-characteristic family at one mantissa', steps: [
      'Steps I–IV (the digits, once for all five): the mantissa $0.3296$ opens the antilog table at row $.32$, column $9$, giving $2133$; the fourth digit $6$ adds the mean difference $3$ (the engine: $10^{0.3296} = 2.1359939$), so the significant digits are $2\\,1\\,3\\,6$ for every member of the family.',
      'Step V on $\\operatorname{antilog} 0.3296$: characteristic $0$ — one digit left of the point: $2.136$.',
      'Step V on $\\operatorname{antilog} 1.3296$ and $\\operatorname{antilog} 3.3296$: characteristics $1$ and $3$ — two and four digits left of the point: $21.36$ and $2136$ (the engine: $10^{1.3296} = 21.3599386$ and $10^{3.3296} = 2135.9938602$, both rounding onto the route\'s answers).',
      'Step V on $\\operatorname{antilog} \\bar{1}.3296$ and $\\operatorname{antilog} \\bar{3}.3296$: bar $1$ means no digits left of the point and $1 - 1 = 0$ zeros after it — $0.2136$; bar $3$ means $3 - 1 = 2$ zeros after the point — $0.002136$ (the engine: $10^{-0.6704} = 0.2135994$ and $10^{-2.6704} = 0.0021360$).',
      'Hence the family: $2.136$, $21.36$, $213.6$, $2136$, $0.2136$, $0.002136$ — one mantissa $0.3296$, five characteristics, the exact mirror of the log-side table above.',
    ] },
    { kind: 'example', title: 'Find the antilog of −2.5983 — the Step-I normalization case', steps: [
      'Step I (normalize): the decimal part $-0.5983$ is negative, so add $1$ to it and subtract $1$ from the integral part: $-2.5983 = -2 - 0.5983 = -3 + 0.4017 = \\bar{3}.4017$ — characteristic $\\bar{3}$, mantissa $0.4017$.',
      'Steps II–III (the row and the column): the antilog table at row $.40$, column $1$ gives $2518$ (the engine: $10^{0.401} = 2.5177$, four digits $2518$).',
      'Step IV (the mean difference): the fourth digit $7$ adds $4$ (the proportional part of the column increment), giving $2518 + 4 = 2522$ — the four significant digits (the engine: $10^{0.4017} = 2.5217382$, which rounds to $2.522$).',
      'Step V (the point): characteristic $\\bar{3}$ — that is $3 - 1 = 2$ zeros after the decimal point, then the digits: $0.002522$.',
      'Hence $\\operatorname{antilog}(-2.5983) = 0.002522$, and the engine\'s direct value $10^{-2.5983} = 0.0025217$ confirms the route to four figures.',
    ] },
    { kind: 'figure', caption: 'The antilog table\'s mirror. On the left the log table runs downward — the number $4728$ enters, the row-$47$ route serves the mantissa $.6747$, and the logarithm $3.6747$ leaves. On the right the antilog table runs upward, the mirror direction: the logarithm $2.6747$ enters from below, the row $.67$ column $4$ entry $4721$ plus the digit-$7$ completion returns the digits $4\\,7\\,2\\,8$, and the number $472.8$ leaves at the top. The identity $10^{\\log n} = n$ stands between the machines as the mirror itself; the orange handoffs close the round trip — the mantissa $.6747$ feeds the antilog table with the characteristic reset from $3$ to $2$, and $472.8 \\times 10 = 4728$ walks it home. The footer runs the same mirror on the $.3296$ family ($2136 \\leftrightarrow 3.3296$, $2.136 \\leftrightarrow 0.3296$), every landing engine-pinned.', svg: antilogMirrorSvg() },

    { kind: 'heading', text: 'The Tables at Work' },
    { kind: 'para', text: 'The tables were not built to convert numbers into logarithms for their own sake; they were built to make ARITHMETIC cheap. The product law $\\log(ab) = \\log a + \\log b$ turns a multiplication into an addition; the power law $\\log(a^{k}) = k \\log a$ turns an exponentiation into a multiplication; and the antilog table cashes the result back into a number. Four classic jobs follow — a product, a census of digits, a compound amount, and a root — each run honestly: the route stated, the engine\'s direct value stated, and the gap between them stated. That last clause is the discipline of this whole section, because the gap is exactly where four-figure tables live or die.' },
    { kind: 'example', title: 'Compute 4.72 × 213.6 by the log route, and audit the landing', steps: [
      'Set up: $\\log(4.72 \\times 213.6) = \\log 4.72 + \\log 213.6$ — the product law of lesson 9.3, cashed at the table.',
      'So, look up both: $\\log 4.72 = 0.6739$ (row $47$, column $2$ — the digits $4\\,7\\,2$, no fourth digit, so no mean difference; the engine: $0.6739420$) and $\\log 213.6 = 2.3296$ (the row-$21$ route of the family table; the engine: $2.3296012$).',
      'Add: $\\log(4.72 \\times 213.6) \\approx 0.6739 + 2.3296 = 3.0035$.',
      'Now, the antilog: $\\operatorname{antilog} 3.0035$ — row $.00$, column $3$ gives $1007$, the digit-$5$ mean difference adds $1$, digits $1008$ — characteristic $3$: four digits left of the point, $1008$ (the engine: $10^{3.0035} = 1008.0916$).',
      'Hence $4.72 \\times 213.6 \\approx 1008$ by the four-figure route.',
      'Audit: the engine\'s exact product is $1008.192$ — the route lands within $0.1$ of it, a gap of about $0.01\\%$: the product law cashed at four-figure precision, and both values agree on the four significant figures.',
    ] },
    { kind: 'example', title: 'How many digits does 2^64 have? Run the same craft on 3^40', steps: [
      'Set up: the digit count of $N$ is $\\lfloor \\log_{10} N \\rfloor + 1$ — lesson 9.5\'s bridge, now run through the tables. For $2^{64}$: $\\log 2^{64} = 64 \\log 2 = 64 \\times 0.3010300 = 19.2659197 \\approx 19.2659$.',
      'So, read the characteristic: $19$ — and the digit count is characteristic plus one: $19 + 1 = 20$ digits.',
      'Check against the integer itself: the engine expands $2^{64} = 18446744073709551616$ — exactly twenty digits, the floor law verified on the number.',
      'Now, the same craft on $3^{40}$: $40 \\log 3 = 40 \\times 0.4771213 = 19.0848502 \\approx 19.0849$ — characteristic $19$, so $20$ digits again.',
      'Check: the engine expands $3^{40} = 12157665459056928801$ — twenty digits. Two different powers, the same digit count, and the tables found it without ever computing the integers.',
    ] },
    { kind: 'example', title: 'Compound growth — find the amount on ₹25,000 at 8% per year for 12 years, by the tables', steps: [
      'Set up the model: $A = 25000 \\times (1.08)^{12}$, the compound-interest form of lesson 9.1 now priced through the tables.',
      'Take logs: $\\log A = \\log 25000 + 12 \\log 1.08 = 4.3979 + 12 \\times 0.0334238 = 4.3979 + 0.4011 = 4.7990$ — carrying one guard digit on $\\log 1.08$ (the four-figure read $0.0334$ would have its last-place error multiplied by $12$).',
      'Now, the antilog: $\\operatorname{antilog} 4.7990$ — row $.79$, column $9$ gives $6295$, mean difference of digit $0$ adds nothing, digits $6295$ — characteristic $4$: five digits left of the point, $6.295 \\times 10^{4} = 62{,}950$.',
      'Hence $A \\approx \\text{₹}62{,}950$ by the four-figure route.',
      'Audit: the engine\'s exact value is $25000 \\times 1.08^{12} = 62954.25$ — the route lands within $\\text{₹}4.3$, a gap of $0.006\\%$. Four figures were plenty for money at this scale, and the guard digit is what kept them plenty.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why the guard digit: multiplying a log multiplies its error', text: 'A four-figure table value carries an error of up to half a unit in the last place. Multiply that value by $12$ — as the compound route does — and the error is multiplied by $12$ too: half a unit becomes six. The tables\' standing practice, followed here, is to carry ONE guard digit through any multiplication or division of a table value ($\\log 1.08$ as $0.0334238$ rather than $0.0334$), so the final rounding happens once, at the end, instead of twelve times along the way. The same discipline appears in the cube-root exercise: DIVIDING a log divides its error, which is why $\\tfrac13 \\log 213.6$ is carried as $0.7765333$.' },
    { kind: 'figure', caption: 'The compound ladder. The exact curve $A(t) = 25000 \\times 1.08^{t}$ is drawn true-to-scale, sampled point by point, climbing over twelve years from ₹25,000 to the exact landing ₹62,954.25 (orange dot). The table route runs alongside it in the annotation: $\\log A = 4.3979 + 12 \\log 1.08 = 4.7990$, and $\\operatorname{antilog} 4.7990 = 6.295 \\times 10^{4} = \\text{₹}62{,}950$ (dashed amber level). The two landings are four rupees apart — $0.006\\%$, thinner than the curve\'s stroke — so the figure itself is the audit: at this scale the four-figure route sits ON the exact answer.', svg: compoundLadderSvg() },
    { kind: 'example', title: 'Find the cube root of 72.3 by the log route', steps: [
      'Set up: $\\log \\sqrt[3]{72.3} = \\tfrac{1}{3} \\log 72.3$ — the power law at $k = 1/3$.',
      'So, look up: $\\log 72.3 = 1.8591$ (the engine: $1.8591383$; the digits $7\\,2\\,3$ run row $72$, column $3$).',
      'Divide: $\\tfrac{1}{3} \\times 1.8591 = 0.6197$ exactly — a clean third, no guard digit needed.',
      'Now, the antilog: row $.61$, column $9$ gives $4159$; the digit-$7$ mean difference adds $7$; digits $4166$ — characteristic $0$: $4.166$ (the engine: $10^{0.6197} = 4.1658152$).',
      'Hence $\\sqrt[3]{72.3} \\approx 4.166$.',
      'Audit: the engine\'s direct value is $72.3^{1/3} = 4.1659377$ — the route and the truth agree at four figures ($4.166$), the route sitting $0.0001$ low at the fourth decimal: sub-unit honesty.',
    ] },
    { kind: 'table', caption: 'The honest-precision ledger — every route of this section against the engine, every gap stated. The last row is the compound route with its guard digit; the first row is the clean case. Read the gap column as the price of four figures: at most about one unit in the last place, shrinking to nothing when the roundings happen to cancel.', head: ['Computation', 'The four-figure route', 'The engine\'s exact value', 'The honest gap'], rows: [
      ['$\\log 2136$', 'row 21, col 3 + 12 → $3.3296$', '$3.3296012$ → $3.3296$', '$0$ — the clean case'],
      ['$\\log 4728$', 'row 47, col 2 + 7 → $3.6746$', '$3.6746775$ → $3.6747$', 'one unit in the last place'],
      ['$\\operatorname{antilog} 2.6747$', 'digits $4\\,7\\,2\\,8$, char 2 → $472.8$', '$472.8245$ → $472.8$', '$0.02$ in $472.8$'],
      ['$4.72 \\times 213.6$', '$3.0035$ → $1008$', '$1008.192$', '$0.1$ — about $0.01\\%$'],
      ['$\\sqrt[3]{72.3}$', '$0.6197$ → $4.166$', '$4.1659377$', '$0.0001$ — sub-unit'],
      ['₹25,000 at 8%, 12 yr', '$4.7990$ → ₹62,950', '$62954.2529$', '₹4.3 — $0.006\\%$'],
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — evaluating a bar-form logarithm: add the parts, never read the bar as a minus sign', text: 'To write a bar-form value as ONE number, combine the parts: $\\bar{2}.3617$ means $-2 + 0.3617 = -1.6383$ — the engine\'s $\\log 0.023 = -1.6382722$. The trap, standard in the table era and still set in examinations today, is to treat the bar as a minus sign between the parts: $-2.3617$ is a DIFFERENT number, $0.72$ away from the truth, and every computation downstream of it inherits the error. Add the integer and the fraction; the bar only tells you the integer\'s sign.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the table-era staples', text: 'Three staples of this lesson dominate the examination forms, and all three are crafts rather than formulas. First, the characteristic reads: "the characteristic of $\\log 0.004728$" (the zero rule — bar 3), "the mantissa shared by $\\log 2136$ and $\\log 0.02136$" (the invariance), and the bar-form evaluation trap above. Second, the digit-count craft: "the number of digits in $2^{64}$" ($64 \\log 2 = 19.2659$, so $20$), often dressed as $3^{40}$ or $5^{25}$ or a product of powers. Third, the compound-growth table route: "₹10,000 at $6\\%$ for $20$ years" (the $\\log A = 4 + 20 \\log 1.06$ shape). The items in this lesson\'s exercise sets are exam-style designs of ours, labelled honestly — nothing is quoted from a real paper, and every numerical claim is engine-pinned in v-aa96.ts.' },

    { kind: 'heading', text: 'The Chapter\'s Close' },
    { kind: 'para', text: 'The chapter is now a complete family of machines. Lesson 9.1 built the exponential and its inverse, the logarithm; lesson 9.2 shipped the graphs and the shape laws; lesson 9.3 proved the laws — the product, quotient and power rules that turn hard arithmetic into easy logarithm work; lesson 9.4 solved the logarithmic and exponential equations; lesson 9.5 built the series that compute logarithms from first principles; and THIS lesson shipped the user\'s manual of the whole enterprise — the tables that store the computed values, the two-part split that makes them small, and the antilog mirror that runs them backwards. The unit review (9.R) consolidates all of it; what follows here is the one-breath recap.' },
    { kind: 'para', text: 'From the above discussion, it follows that the chapter\'s work stands or falls on five portable lines:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the two-part split: $\\log n = \\text{characteristic} + \\text{mantissa}$, with the characteristic from the decimal point and the mantissa from the digits;',
      '(ii) the two inspection rules: digits-left minus one for $n \\geq 1$; zeros-after-the-point plus one, negated, for $0 < n < 1$;',
      '(iii) the mantissa invariance: $\\log(m \\times 10^{k}) = \\log m + k$ — the point moves the characteristic, never the mantissa;',
      '(iv) the five-step antilog method, with Step I normalising any negative decimal part ($-2.5983 = \\bar{3}.4017$);',
      '(v) the honest precision: a four-figure route lands within about one unit of the correctly rounded value — stated, audited, and never hidden.',
    ] },
    { kind: 'para', text: 'The tables of this lesson are, in one sense, a closed chapter of the discipline: electronic computation ended the daily use of printed logarithm tables within a generation of the second world war, and no engineer today multiplies by rows and columns. In another sense nothing has been retired at all. The split this lesson formalised — an integer part read off the magnitude and a fraction read off the significant digits — is exactly the floating-point representation inside every processor of that electronic era, mantissa and exponent wearing new names; and the honest error budget of a rounded lookup is exactly the numerical analysis of round-off. The slide rule in the pocket became the guard digit in the chip. What this lesson taught under the old names is what the new names still mean.' },
    { kind: 'formula', name: 'The two-part split of a common logarithm', latex: '\\log_{10} n = \\underbrace{p}_{\\text{characteristic}} + \\underbrace{f}_{\\text{mantissa}}', note: 'the characteristic $p$ is an integer read off the decimal point; the mantissa $f$ is looked up from the significant digits — $\\log 4728 = 3 + 0.6747$, engine value $3.6746775$.' },
    { kind: 'formula', name: 'The characteristic by inspection, numbers at least one', latex: 'n \\geq 1: \\text{characteristic} = \\text{digits} - 1', note: 'witnesses: $4728 \\to 3$; $628 \\to 2$; $6.28 \\to 0$ — engine-checked against $\\lfloor \\log n \\rfloor$.' },
    { kind: 'formula', name: 'The characteristic by inspection, numbers below one', latex: '0 < n < 1: \\text{characteristic} = -(\\text{zeros} + 1)', note: 'witnesses: $0.628 \\to \\bar{1}$; $0.0004728 \\to \\bar{4}$ — the bar rides the negative characteristic alone.' },
    { kind: 'formula', name: 'The mantissa invariance', latex: '\\log_{10}\\bigl(m \\times 10^{k}\\bigr) = \\log_{10} m + k', note: 'moving the decimal point changes ONLY the characteristic: $4728$, $47.28$ and $0.04728$ share the mantissa $0.6747$ — the reason a four-figure table stays small.' },
    { kind: 'formula', name: 'The antilogarithm', latex: '\\operatorname{antilog} m = 10^{m}, \\qquad \\log_{10}(\\operatorname{antilog} m) = m', note: 'the table run backwards: digits from the mantissa, the point from the characteristic — antilog $2.6747 = 472.8$ (engine $472.8245$), the mirror of $\\log 4728 \\approx 3.6747$.' },
    { kind: 'formula', name: 'The digits-count law', latex: '\\text{digits}(N) = \\bigl\\lfloor \\log_{10} N \\bigr\\rfloor + 1', note: 'the characteristic plus one: $2^{64} \\to 64 \\log 2 = 19.2659 \\to 20$ digits — checked against $18446744073709551616$ itself; $5^{25} \\to 17.4743 \\to 18$ digits, checked against $298023223876953125$.' },

    { kind: 'quiz', title: 'Check yourself: logarithm tables', items: [
      { q: 'The characteristic of $\\log 0.004728$ is', options: ['$3$', '$-2$', '$-3$', '$-4$'], answer: 2, explain: 'Option 2 is right: $0.004728 = 4.728 \\times 10^{-3}$, so the characteristic is $-3$, written bar 3 — and the zero rule agrees: two zeros sit between the point and the $4$, giving $-(2 + 1) = -3$ (the engine: $\\lfloor \\log 0.004728 \\rfloor = -3$). Option 0 forgets the sign: below $1$ the characteristic is NEGATIVE, and $3$ would be the read for a four-digit number like $4728$ itself. Option 1 miscounts the zeros: there are two of them ($0.00\\,4728$), not one; one zero would give bar 2, as at $0.04728$. Option 3 overcounts: three zeros after the point would mean $0.0004728$ (bar 4) — one zero more than this number carries.' },
      { q: 'The mantissas of $\\log 2136$, $\\log 2.136$ and $\\log 0.02136$ are', options: ['all different', 'all equal', 'equal for the first two only', 'zero'], answer: 1, explain: 'Option 1 is right: all three numbers carry the same significant digit string $2\\,1\\,3\\,6$, and the mantissa depends on the digits alone — $\\log(m \\times 10^{k}) = \\log m + k$ moves ONLY the characteristic (the engine: $\\log 2136 = 3.3296012$, $\\log 2.136 = 0.3296012$, $\\log 0.02136 = -1.6703988$, fractional part $0.3296$ in every case). Option 0 confuses the characteristic with the mantissa: the characteristics $3, 0, -2$ ARE all different — but they were not what was asked. Option 2 invents a cutoff: there is no rule that stops the sharing at the second member; $0.02136$ has the same digit string as the first two. Option 3 is impossible on principle: the mantissa is a number in $[0, 1)$, and it is zero only for an exact power of ten — which none of these three is.' },
      { q: 'antilog 2.3296 equals (four-figure)', options: ['$2.136$', '$21.36$', '$213.6$', '$2136$'], answer: 2, explain: 'Option 2 is right: the mantissa $0.3296$ returns the digits $2\\,1\\,3\\,6$ (the engine: $10^{0.3296} = 2.1359939$), and the characteristic $2$ places $2 + 1 = 3$ digits left of the point: $213.6$ — the exact mirror of $\\log 213.6 \\approx 2.3296$ (the engine: $10^{2.3296} = 213.5993860$). Option 0 uses characteristic $0$ — one digit left of the point — which is antilog $0.3296$. Option 1 uses characteristic $1$ — antilog $1.3296$. Option 3 uses characteristic $3$ — antilog $3.3296$; the point is the characteristic\'s business, and $2$ demands exactly three digits before it.' },
      { q: 'The number of digits in $2^{64}$ is', options: ['$19$', '$20$', '$21$', '$64$'], answer: 1, explain: 'Option 1 is right: $64 \\log 2 = 64 \\times 0.3010300 = 19.2659$, characteristic $19$, so the digit count is $19 + 1 = 20$ — and the engine confirms by expanding $2^{64} = 18446744073709551616$, exactly twenty digits. Option 0 stops at the characteristic itself: truncating $19.2659$ to $19$ gives the FLOOR, but every number with characteristic $19$ runs from $10^{19}$ up to $10^{20} - 1$ and therefore has twenty digits — the count is floor plus one. Option 2 overshoots: $2^{64} < 10^{20}$ (its log is $19.2659 < 20$), so twenty is the exact ceiling; twenty-one would need a log of $20$ or more. Option 3 reads the exponent as a digit count — the count of digits of $2^{64}$ has nothing to do with $64$ except through $64 \\log 2$; the law is floor of the log, plus one.' },
      { q: 'A four-figure table gives $\\log 4728 \\approx 3.6746$ while the correctly rounded four-figure value is $3.6747$. The gap of one unit in the last place is', options: ['a typo in the table', 'the honest last-place precision of four-figure tables', 'proof that tables are wrong', 'always exactly one'], answer: 1, explain: 'Option 1 is right: the route adds a rounded mean difference ($7$) to a rounded row entry ($6739$), so its landing $6746$ can sit one unit from the correctly rounded $6747$ — the honest statement of four-figure precision, and this lesson audits it openly ($2136$: gap $0$; $25795$: gap $0$; the full-domain sweep: $99.1\\%$ within one unit). Option 0 would make the gap a transcription slip — it is not: recompute with the engine and the same route lands $6746$ again; the gap is structural, confined to the last significant figure. Option 2 overreads a last-place wobble: the leading figures $3.674$ are exact, and the route value is within one part in ten thousand of the truth — that IS the table working as designed, not failing. Option 3 states a false law: the $2136$ and $25795$ audits land gap $0$ — the gap is AT MOST about one unit, sometimes zero, and never guaranteed to be exactly one.' },
    ] },

    { kind: 'exercises', title: 'Exercises 9.6', sets: [
      { level: 'L1', questions: [
        { q: 'State the characteristic of $\\log 1235.5$, $\\log 346.41$, $\\log 7.12345$ and $\\log 0.034239$, giving the inspection read you used in each case.', solution: [
          'Read the first two by the digit rule: $1235.5$ has four digits left of the point, so the characteristic is $4 - 1 = 3$; $346.41$ has three digits left, so $3 - 1 = 2$.',
          'So, $7.12345$ has one digit left of the point: $1 - 1 = 0$.',
          'Now, $0.034239$ sits below $1$: ONE zero stands between the point and the first nonzero digit $3$, so the characteristic is $-(1 + 1) = -2$, written $\\bar{2}$.',
          'Check against the standard form: $1235.5 = 1.2355 \\times 10^{3}$, $346.41 = 3.4641 \\times 10^{2}$, $7.12345 = 7.12345 \\times 10^{0}$, $0.034239 = 3.4239 \\times 10^{-2}$ — the exponents are the characteristics, all four agreeing.',
        ], answer: '$3$, $2$, $0$ and $-2$ (bar 2)' },
        { q: 'Write $\\log 628$ in two-part form — characteristic and mantissa — and audit it against the engine value.', solution: [
          'Place the characteristic first: $628$ has three digits left of the point, so the characteristic is $3 - 1 = 2$.',
          'So, the mantissa comes from the significant digits $6\\,2\\,8$: the four-figure table\'s row $62$, column $8$ gives $.7980$.',
          'Hence $\\log 628 = 2 + 0.7980 = 2.7980$.',
          'Check: the engine computes $\\log 628 = 2.7979596$ directly — the two-part form $2.7980$ is the correct four-figure rounding, and $\\log 6.28 = 0.7979596$ shows the same mantissa riding one characteristic down.',
        ], answer: '$\\log 628 = 2 + 0.7980 = 2.7980$ (engine: $2.7979596$)' },
        { q: 'Which of $4728$, $47.28$ and $0.04728$ share a mantissa, and what is that mantissa?', solution: [
          'Collect the significant digits: all three numbers carry the digit string $4\\,7\\,2\\,8$ — they differ only in where the decimal point stands.',
          'So, by the mantissa invariance ($\\log(m \\times 10^{k}) = \\log m + k$ moves only the characteristic), all three share ONE mantissa.',
          'Hence the mantissa is $0.6747$ — the engine\'s $\\log 4728 = 3.6746775$ has fractional part $0.6747$ to four figures.',
          'Check the characteristics differ as promised: $3$, $1$ and $-2$ (four digits left; two digits left; one zero after the point), with $\\log 0.04728 = -1.3253225 = \\bar{2}.6746775$ in bar form.',
        ], answer: 'all three share the mantissa $0.6747$ (characteristics $3$, $1$, $-2$)' },
      ] },
      { level: 'L2', questions: [
        { q: 'Find $\\log 2136$ by the row-21 route of the four-figure table, and audit the last place against the engine.', solution: [
          'Set up: the digits $2\\,1\\,3\\,6$ send you to row $21$, column $3$, which gives $3284$.',
          'So, the fourth digit $6$ adds the row-21 mean difference $12$: $3284 + 12 = 3296$ — the mantissa $0.3296$.',
          'Now, the characteristic: $2136$ has four digits left of the point, so $4 - 1 = 3$.',
          'Hence $\\log 2136 \\approx 3.3296$.',
          'Check: the engine\'s direct value is $3.3296012$, which rounds to $3.3296$ — the route meets the correctly rounded value exactly: gap $0$, the clean case.',
        ], answer: '$\\log 2136 \\approx 3.3296$ (engine $3.3296012$ — gap $0$)' },
        { q: 'Find $\\log 4728$ by the row-47 route, and state the honest gap in the last place.', solution: [
          'Set up: the digits $4\\,7\\,2\\,8$ send you to row $47$, column $2$, which gives $6739$.',
          'So, the fourth digit $8$ adds the row-47 mean difference $7$: $6739 + 7 = 6746$ — the mantissa $0.6746$.',
          'Now, the characteristic: four digits left of the point, so $3$.',
          'Hence $\\log 4728 \\approx 3.6746$.',
          'Check: the engine\'s direct value is $3.6746775$, which rounds to $3.6747$ — the route is one unit low in the last place, the honest behaviour of a four-figure route (rounded row entry plus rounded mean difference), not an error of method.',
        ], answer: '$\\log 4728 \\approx 3.6746$ by the table; the engine\'s four-figure value is $3.6747$ — a one-unit last-place gap', figures: [
          { caption: 'The row-47 route strip: columns $0$–$9$ with the column-2 entry $6739$ highlighted, the mean-difference bank with the digit-$8$ entry $7$ highlighted, both reads feeding the landing $6739 + 7 = 6746$ (characteristic $3$ → $3.6746$), and the engine box $3.6746775 \\to 3.6747$ pricing the honest one-unit gap.', svg: row47RouteSvg() },
        ] },
        { q: 'Write $\\log 0.023$ in bar form, and evaluate $\\bar{2}.36173$ as a single number.', solution: [
          'Characteristic first: $0.023$ has one zero between the point and the $2$, so the characteristic is $-(1 + 1) = -2$, written $\\bar{2}$.',
          'So, the mantissa comes from the digits $2\\,3$: the table gives $0.36173$ (the engine: $\\log 2.3 = 0.3617278$).',
          'Hence $\\log 0.023 = \\bar{2}.36173$, meaning $-2 + 0.36173$.',
          'Now, evaluate: $-2 + 0.36173 = -1.63827$ — the engine\'s direct value is $-1.6382722$, agreeing to five decimals.',
          'Check the trap: $\\bar{2}.36173$ is NOT $-2.36173$ (that would carry a negative mantissa); the bar sits on the characteristic alone, and the mantissa of $2300$ is the same $0.3617278$ the engine pins.',
        ], answer: '$\\log 0.023 = \\bar{2}.36173 = -2 + 0.36173 = -1.63827$ (engine $-1.6382722$)' },
      ] },
      { level: 'L3', questions: [
        { q: 'The five-characteristic drill: find antilog 3.3296 and antilog bar-1 point 3296, and state the whole family at the mantissa $0.3296$.', solution: [
          'Set up the digits from the mantissa: $0.3296$ opens the antilog table at row $.32$, column $9$, giving $2133$; the fourth digit $6$ adds the mean difference $3$; digits $2133 + 3 = 2136$ (the engine: $10^{0.3296} = 2.1359939$, whose four-figure digits are $2\\,1\\,3\\,6$).',
          'So, antilog $3.3296$: characteristic $3$ — four digits left of the point — gives $2136$.',
          'Now, antilog $\\bar{1}.3296$: characteristic $\\bar{1}$ — no digits left of the point and $1 - 1 = 0$ zeros after it — gives $0.2136$.',
          'Hence the family: $0.3296 \\to 2.136$; $1.3296 \\to 21.36$; $2.3296 \\to 213.6$; $3.3296 \\to 2136$; $\\bar{1}.3296 \\to 0.2136$; $\\bar{2}.3296 \\to 0.02136$; $\\bar{3}.3296 \\to 0.002136$ — one mantissa, every characteristic.',
          'Check: the engine gives $10^{3.3296} = 2135.9938602$ and $10^{-0.6704} = 0.2135994$ — both land on the route\'s answers at four figures.',
        ], answer: 'antilog $3.3296 = 2136$ and antilog $\\bar{1}.3296 = 0.2136$ — the family: $2.136$, $21.36$, $213.6$, $2136$, $0.2136$, $0.002136$', figures: [
          { caption: 'The five-characteristic fan: the mantissa box $0.3296$ with five amber arrows to the chips $2136$ (char $3$), $213.6$ (char $2$), $2.136$ (char $0$), $0.2136$ (char $\\bar{1}$) and $0.002136$ (char $\\bar{3}$) — the digits $2\\,1\\,3\\,6$ never change; only the point moves.', svg: charFanSvg() },
        ] },
        { q: 'How many digits does $5^{25}$ have? Confirm against the integer itself.', solution: [
          'Take logs: $\\log 5^{25} = 25 \\log 5 = 25 \\times 0.6989700 = 17.4742501 \\approx 17.4743$ (the four-figure read $25 \\times 0.6990 = 17.475$ lands the same characteristic).',
          'So, the characteristic is $17$, and the digit count is $17 + 1 = 18$.',
          'Hence $5^{25}$ has $18$ digits.',
          'Check against the integer: the engine expands $5^{25} = 298023223876953125$ — exactly eighteen digits, the floor law verified on the number itself.',
        ], answer: '18 digits ($5^{25} = 298023223876953125$; $25 \\log 5 = 17.4743 \\to 17 + 1$)' },
        { q: 'Compute $2.136 \\times 472.8$ by the log route, and audit against the exact product.', solution: [
          'Set up: $\\log 2.136 = 0.3296$ and $\\log 472.8 = 2.6747$ — the four-figure mantissas of the lesson\'s two witness families.',
          'So, add for the product: $\\log(2.136 \\times 472.8) \\approx 0.3296 + 2.6747 = 3.0043$.',
          'Now, the antilog: row $.00$, column $4$ gives $1009$; the digit-$3$ mean difference adds $1$; digits $1010$ — characteristic $3$: $1.010 \\times 10^{3} = 1010$.',
          'Hence $2.136 \\times 472.8 \\approx 1010$.',
          'Check: the engine\'s exact product is $1009.9008$ (and $10^{3.0043} = 1009.9503$) — the route lands within $0.05$ of the truth: one part in twenty thousand, the four-figure gap again.',
        ], answer: '$\\approx 1010$ by the four-figure route (exact product $1009.9008$)' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find antilog(−2.5983) by the five-step method, showing the Step-I normalization.', solution: [
          'Step I (normalize): the decimal part $-0.5983$ is negative — add $1$ to it and subtract $1$ from the integral part: $-2.5983 = -2 - 0.5983 = -3 + 0.4017 = \\bar{3}.4017$.',
          'So, Steps II–IV on the mantissa $0.4017$: the antilog table at row $.40$, column $1$ gives $2518$; the fourth digit $7$ adds the mean difference $4$; digits $2518 + 4 = 2522$ (the engine: $10^{0.4017} = 2.5217382$, four-figure digits $2522$).',
          'Now, Step V (the point): characteristic $\\bar{3}$ — that is $3 - 1 = 2$ zeros after the decimal point, then the digits: $0.002522$.',
          'Hence $\\operatorname{antilog}(-2.5983) = 0.002522$.',
          'Check: the engine\'s direct value is $10^{-2.5983} = 0.0025217$ — the route is the correct four-figure rounding of it.',
        ], answer: '$\\operatorname{antilog}(-2.5983) = 0.002522$ (engine: $0.0025217$)' },
        { q: 'Compute $4728 \\div 2136$ by the log route, and audit the last place.', solution: [
          'Set up the logs: $\\log 4728 \\approx 3.6747$ and $\\log 2136 \\approx 3.3296$ (the engine\'s correctly rounded four-figure values).',
          'So, subtract for the quotient: $\\log(4728 \\div 2136) \\approx 3.6747 - 3.3296 = 0.3451$.',
          'Now, the antilog: row $.34$, column $5$ gives $2213$; the digit-$1$ mean difference adds $1$; digits $2214$ — characteristic $0$: $2.214$ (the engine: $10^{0.3451} = 2.2136044$, which rounds to $2.214$).',
          'Hence $4728 \\div 2136 \\approx 2.214$ ($2.2136$ at four decimals by the route).',
          'Check: the engine\'s exact quotient is $4728/2136 = 2.2134831 \\approx 2.2135$ — the route overshoots by one unit in the last place: the same honest four-figure gap, met on the quotient side.',
        ], answer: '$4728 \\div 2136 \\approx 2.214$ by the route (exact $2.2134831 \\approx 2.2135$ — a one-unit last-place gap)' },
        { q: 'Use the digits-count law to find the number of digits in $2^{32}$ and in $3^{12} \\times 2^{8}$, and confirm both against the integers.', solution: [
          'Take logs of $2^{32}$: $32 \\log 2 = 32 \\times 0.3010300 = 9.6330$ (the engine: $9.6329599$) — characteristic $9$, so $9 + 1 = 10$ digits.',
          'So, take logs of $3^{12} \\times 2^{8}$: $\\log = 12 \\log 3 + 8 \\log 2 = 12 \\times 0.4771213 + 8 \\times 0.3010300 = 5.7255 + 2.4082 = 8.1337$ — characteristic $8$, so $8 + 1 = 9$ digits.',
          'Hence $2^{32}$ has $10$ digits and $3^{12} \\times 2^{8}$ has $9$ digits.',
          'Check: the engine expands $2^{32} = 4294967296$ (ten digits) and $3^{12} \\times 2^{8} = 531441 \\times 256 = 136048896$ (nine digits) — the floor law verified on both integers.',
        ], answer: '$2^{32}$ has 10 digits ($4294967296$); $3^{12} \\times 2^{8}$ has 9 digits ($136048896$)' },
      ] },
      { level: 'L5', questions: [
        { q: '₹10,000 is invested at 6% per year, compounded annually, for 20 years. Find the amount by the table route and state the honest gap.', solution: [
          'Set up the model: $A = 10000 \\times (1.06)^{20}$.',
          'So, take logs with the guard digit carried: $\\log A = \\log 10000 + 20 \\log 1.06 = 4 + 20 \\times 0.0253059 = 4 + 0.5061 = 4.5061$ — multiplying the bare four-figure $0.0253$ by $20$ would multiply its last-place error by $20$.',
          'Now, the antilog: row $.50$, column $6$ gives $3206$; the digit-$1$ mean difference adds $1$; digits $3207$ — characteristic $4$: $3.207 \\times 10^{4} = 32{,}070$.',
          'Hence $A \\approx \\text{₹}32{,}070$.',
          'Check: the engine\'s exact value is $10000 \\times 1.06^{20} = 32071.35$ — the route lands within ₹$1.4$, a gap of $0.004\\%$: four figures are plenty for money at this scale.',
        ], answer: '$A \\approx \\text{₹}32{,}070$ (engine: ₹$32{,}071.35$ — gap $0.004\\%$)' },
        { q: 'Find $\\sqrt[3]{213.6}$ by the log route, carrying the guard digit, and audit against the engine.', solution: [
          'Set up: $\\log \\sqrt[3]{213.6} = \\tfrac{1}{3} \\log 213.6 = \\tfrac{1}{3} \\times 2.3296 = 0.7765333$ — carried to seven places, because dividing a log divides its last-place error.',
          'So, the antilog of the four-figure read $0.7765$: row $.77$, column $6$ gives $5970$; the digit-$5$ mean difference adds $7$; digits $5977$ — characteristic $0$: $5.977$.',
          'Hence $\\sqrt[3]{213.6} \\approx 5.978$ (four figures), with the guard-digit route reading $10^{0.7765333} = 5.9777$.',
          'Check: the engine\'s direct value is $213.6^{1/3} = 5.9776950 \\approx 5.9777$ — the guard digit recovers it exactly, while the rounded-mantissa route ($10^{0.7765} = 5.9772$) would sit half a thousandth low: the guard digit is not decoration.',
        ], answer: '$\\sqrt[3]{213.6} \\approx 5.978$ (engine: $5.9777$)' },
        { q: 'A quantity grows by 5% per period. After how many periods does it first pass double its starting value? Decide by the log route.', solution: [
          'Set up the threshold: passing double means the growth factor $(1.05)^{n}$ first reaches $2$, so compare $n \\log 1.05$ against $\\log 2$.',
          'So, the constants: $\\log 1.05 = 0.0211893$ and $\\log 2 = 0.3010300 \\approx 0.3010$.',
          'Now, the ladder: $14 \\log 1.05 = 0.2967 < 0.3010$ — fourteen periods are not enough; $15 \\log 1.05 = 0.3178 > 0.3010$ — fifteen are more than enough.',
          'Hence the quantity first passes double during the 15th period.',
          'Check directly: the engine gives $1.05^{14} = 1.9799316 < 2 < 2.0789282 = 1.05^{15}$ — both landings confirmed, and the integer sweep finds $15$ as the smallest such $n$.',
        ], answer: '15 periods ($1.05^{14} = 1.9799 < 2 < 2.0789 = 1.05^{15}$)', figures: [
          { caption: 'The log ladder at $5\\%$: the rail of logarithm values with the amber bracket window from $14 \\log 1.05 = 0.2967$ to $15 \\log 1.05 = 0.3178$, and the green threshold dot $\\log 2 = 0.3010$ sitting inside it — so the fifteenth period is the first to pass double.', svg: doublingLadderSvg() },
        ] },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the two characteristic inspection rules and the mantissa invariance from the standard form, and price the proof on the family $4728$, $47.28$, $0.04728$.', solution: [
          'Set up the standard form: every positive $n$ can be written $n = m \\times 10^{p}$ with $1 \\leq m < 10$ and $p$ an integer — slide the point until one nonzero digit stands left of it: $4728 = 4.728 \\times 10^{3}$, $47.28 = 4.728 \\times 10^{1}$, $0.04728 = 4.728 \\times 10^{-2}$.',
          'So, take logs: $\\log n = \\log m + p \\log 10 = p + \\log m$, by the product law with $\\log 10 = 1$.',
          'Now, bound the mantissa: $1 \\leq m < 10$ and $\\log$ strictly increasing give $0 \\leq \\log m < 1$ — the fractional part of $\\log n$ is ALWAYS $\\log m$, a proper fraction: the mantissa.',
          'Rule (i): $n \\geq 1$ with $k$ digits left of the point satisfies $10^{k-1} \\leq n < 10^{k}$, so $k - 1 \\leq \\log n < k$ and the integer part is $k - 1$. Rule (ii): $0 < n < 1$ with $z$ zeros after the point satisfies $10^{-(z+1)} \\leq n < 10^{-z}$, so $-(z+1) \\leq \\log n < -z$ and the integer part is $-(z+1)$, written $\\overline{z+1}$.',
          'Mantissa invariance: $\\log(m \\times 10^{k}) = \\log m + k$ adds the integer $k$, which cannot move the fractional part — the mantissa depends on the digit string alone.',
          'Hence the price on the family: $\\log 4728 = 3 + 0.6746775$, $\\log 47.28 = 1 + 0.6746775$, $\\log 0.04728 = -2 + 0.6746775 = \\bar{2}.6746775$ — one mantissa, three characteristics, all three engine-checked.',
        ], answer: 'proved: characteristic $= k - 1$ ($k$ digits left of the point) or $-(z+1)$ ($z$ zeros after it); the mantissa is invariant under $\\times 10^{k}$ — priced on the family (all carry $+\\,0.6746775$)' },
        { q: 'The precision audit: for the roster $\\{2136, 4728, 25795\\}$ compute the four-figure table route and the engine\'s direct value, state each gap, and state the last-place law.', solution: [
          'Set up $2136$: the route is row $21$, column $3$ ($3284$) plus the digit-$6$ mean difference ($12$): $3284 + 12 = 3296 \\to 3.3296$; the engine\'s direct $3.3296012$ rounds to $3.3296$ — gap $0$, the clean case.',
          'So, $4728$: the route is row $47$, column $2$ ($6739$) plus the digit-$8$ mean difference ($7$): $6739 + 7 = 6746 \\to 3.6746$; the engine\'s direct $3.6746775$ rounds to $3.6747$ — gap one unit in the last place.',
          'Now, $25795$: the route is row $25$, column $7$ ($4099$) plus the digit-$9$ mean difference ($16$): $4099 + 16 = 4115 \\to 4.4115$; the engine\'s direct $4.4115355$ rounds to $4.4115$ — gap $0$.',
          'Hence the last-place law: a four-figure route — a rounded row entry plus a rounded mean difference — lands within about ONE unit of the correctly rounded mantissa: sometimes exact ($2136$, $25795$ here), sometimes one low ($4728$ here), never wrong in the leading figures.',
          'Check the law\'s reach: the engine\'s sweep of ALL $9{,}000$ four-digit numbers finds $8{,}921$ ($99.1\\%$) within one unit and the remaining $79$ off by at most three — the honest small print of the four-figure craft.',
        ], answer: '$2136$: $3.3296$ both routes (gap $0$); $4728$: route $3.6746$ vs direct $3.6747$ (gap one unit); $25795$: $4.4115$ both routes (gap $0$) — the last-place law: within about one unit, audited across the whole domain at $99.1\\%$' },
      ] },
    ] },
  ],
}


// ------------------------------------------------------------------
// lesson 9.R — run 121 (the whole-chapter swarm), integrated verbatim
// ------------------------------------------------------------------

/**
 * Advanced Algebra — lesson 9.R "Unit 9 Completion Review"
 * (authored by the run-121 whole-chapter swarm's aa9R agent; every number
 * engine-pinned in temporary-references/v-aa9R.ts BEFORE this prose was
 * written — the M-section engines ran 196/196 green first; the N-section
 * pins re-read this file).
 *
 * PROVENANCE: the Cengage presentation contract (cengage-jee-style), the
 * Cengage Algebra-I logarithms band (cengage-m1-01), Hall & Knight Higher
 * Algebra's logarithms arc (hall-knight-higher-algebra) and the JEE Main unit
 * list (jee-main-2026-syllabus). STUDY-NEVER-REPRODUCE: every witness,
 * figure, Illustration, quiz item and exercise here is the platform's own,
 * engine-pinned in v-aa9R.ts.
 *
 * SPEC-VS-ENGINE CATCHES (the engine won each time, and this prose carries
 * the engine's numbers):
 *   C1. the L5(c) root of log_3(x+5) = 5 − x is 3.0963 (the spec guessed
 *       "≈ 3.4?"); the engine's bracket bisection pins 3.0963172.
 *   C2. log_11 17 = 1.1815 (the spec said 1.1818); engine 1.1815417.
 *   C3. the four-place craft log 6 = 0.3010 + 0.4771 = 0.7781 is honest to
 *       one unit in the fourth place — the engine's true log 6 = 0.7781513
 *       rounds to 0.7782; the prose carries both, honestly.
 *   C4. the quiz Q4 distractors were re-cut (4.782, 0.4278) because the
 *       spec's 4.728 and 0.4728 ALSO carry the mantissa 0.6747 (the
 *       invariance law reads digit sequences) — the pinned key (47.28,
 *       index 2) is unchanged and now uniquely correct.
 *   C5. the fast-series miss is 0.0000011 (the spec's parenthetical differ-
 *       ence of the printed strings suggested 0.0000012); engine wins.
 */

/* ==================================================================== */
/* Figure helpers — every coordinate computed from named constants       */
/* ==================================================================== */

/* ------------------------------------------------------------------ */
/* Body figure 1 — the chapter in one chain (3⁴⁰ → 20 digits)           */
/* ------------------------------------------------------------------ */
function chapterChain9RSvg(): string {
  const W = 720
  const H = 460
  const T_Y = 26
  // stations: left column boxes, one per stop of the chain
  const BOX_X = 60
  const BOX_W = 220
  const BOX_CX = BOX_X + BOX_W / 2 // 170
  const ST_H = 52
  const stY = [48, 140, 232, 324]
  const stations = [
    { main: '3⁴⁰', sub: 'the question: how many digits?' },
    { main: '40 · log 3', sub: 'the power becomes a product' },
    { main: '19.0849', sub: '40 × 0.4771213 = 19.0849' },
    { main: '20 digits', sub: 'the chain’s verdict' },
  ]
  // arrows between the stations, each labelled with the lesson that owns the move
  const arrows = [
    { y0: 100, y1: 140, l1: '9.2 — the power law of logs', l2: 'log 3⁴⁰ = 40 · log 3' },
    { y0: 192, y1: 232, l1: '9.5 — the μ bridge supplies log 3', l2: 'log 3 = μ · ln 3 = 0.4342945 × 1.0986123 = 0.4771213' },
    { y0: 284, y1: 324, l1: '9.6 — the digit-count law', l2: 'digits = floor(19.0849) + 1 = 19 + 1 = 20' },
  ]
  const VER_X = 30
  const VER_W = 660
  const VER_Y = 396
  const VER_H = 48

  const st = stations
    .map(
      (s, i) =>
        `<rect x="${BOX_X}" y="${stY[i]}" width="${BOX_W}" height="${ST_H}" rx="7" fill="${i === 3 ? '#ffedd5' : '#fef3c7'}" stroke="#16a34a" stroke-width="2.2"/>` +
        `<text x="${BOX_CX}" y="${stY[i] + 23}" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">${s.main}</text>` +
        `<text x="${BOX_CX}" y="${stY[i] + 41}" font-size="9.5" text-anchor="middle" fill="#0f766e">${s.sub}</text>`
    )
    .join('')
  const ar = arrows
    .map(
      (a) =>
        `<line x1="${BOX_CX}" y1="${a.y0}" x2="${BOX_CX}" y2="${a.y1 - 10}" stroke="#d97706" stroke-width="1.8"/>` +
        `<path d="M${BOX_CX},${a.y1} l-5,-9 h10 z" fill="#ea580c"/>` +
        `<text x="${BOX_X + BOX_W + 22}" y="${(a.y0 + a.y1) / 2 - 5}" font-size="10" font-weight="700" text-anchor="start" fill="#d97706">${a.l1}</text>` +
        `<text x="${BOX_X + BOX_W + 22}" y="${(a.y0 + a.y1) / 2 + 11}" font-size="10" text-anchor="start" fill="#65a30d">${a.l2}</text>`
    )
    .join('')

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The chapter in one chain: counting the digits of 3 to the 40th power. Four stations run down the page joined by labelled arrows. Station one: the number 3 to the 40th, with the question how many digits. The first arrow is labelled 9.2, the power law of logarithms: log of 3 to the 40th equals 40 times log 3, and carries the equation to station two: 40 times log 3, the power becomes a product. The second arrow is labelled 9.5, the mu bridge supplies log 3: log 3 equals mu times ln 3 equals 0.4342945 times 1.0986123 equals 0.4771213, and carries the multiplication to station three: 19.0849, forty times 0.4771213. The third arrow is labelled 9.6, the digit-count law: digits equal floor of 19.0849 plus 1, which is 19 plus 1, and lands on station four: 20 digits, the chain's verdict. The verdict bar underneath reads: the audit, 3 to the 40th equals 12157665459056928801, engine-counted, 20 digits exactly; the logs of 9.2, the bridge of 9.5 and the law of 9.6, and the engine confirming all three.">
  <text x="${W / 2}" y="${T_Y}" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">the chapter in one chain: counting the digits of 3⁴⁰</text>
  ${st}
  ${ar}
  <rect x="${VER_X}" y="${VER_Y}" width="${VER_W}" height="${VER_H}" rx="7" fill="#ffedd5" stroke="#0d9488" stroke-width="2.2"/>
  <text x="${W / 2}" y="${VER_Y + 20}" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">the audit: 3⁴⁰ = 12157665459056928801 — engine-counted, 20 digits exactly</text>
  <text x="${W / 2}" y="${VER_Y + 38}" font-size="9.5" text-anchor="middle" fill="#0f766e">the logs (9.2), the bridge (9.5), the law (9.6) — and the engine confirming all three</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* Body figure 2 — the family portrait, reviewed (the subway line)     */
/* ------------------------------------------------------------------ */
function familyPortrait9RSvg(): string {
  const W = 720
  const H = 240
  const T_Y = 26
  const LINE_Y = 170
  const LINE_X0 = 40
  const LINE_X1 = 686
  // six stations along the line, in teaching order
  const stX = [190, 270, 350, 430, 510, 590]
  const stations = [
    { name: '9.1 · the family', sub: 'one-one machine · 2^√2 = 2.6651', below: true },
    { name: '9.2 · the inverse', sub: 'undo · log_(2√2) 128 = 14/3', below: false },
    { name: '9.3 · the laws', sub: 'laws · the chain = 2', below: true },
    { name: '9.4 · the equations', sub: 'craft · x = (−3+√13)/2', below: false },
    { name: '9.5 · the series', sub: 'compute · e = 2.7182818', below: true },
    { name: '9.6 · the tables', sub: 'apply · log 4728 = 3.6747', below: false },
  ]
  // the twin terminals: the two constants the chapter computed
  const TERM_LX = 55
  const TERM_RX = 665
  const NAME_Y_ABOVE = 112
  const SUB_Y_ABOVE = 127
  const NAME_Y_BELOW = 212
  const SUB_Y_BELOW = 227

  const st = stations
    .map(
      (s, i) =>
        `<circle cx="${stX[i]}" cy="${LINE_Y}" r="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>` +
        `<text x="${stX[i]}" y="${s.below ? NAME_Y_BELOW : NAME_Y_ABOVE}" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">${s.name}</text>` +
        `<text x="${stX[i]}" y="${s.below ? SUB_Y_BELOW : SUB_Y_ABOVE}" font-size="9" text-anchor="middle" fill="#0f766e">${s.sub}</text>`
    )
    .join('')

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The family portrait, reviewed: one subway line carrying six stations with two terminal constants. The line runs left to right through six station circles in teaching order: 9.1 the family, role one-one machine, witness 2 to the square root of 2 equals 2.6651; 9.2 the inverse, role undo, witness log base 2 root 2 of 128 equals 14 thirds; 9.3 the laws, role laws, witness the telescoping chain equals 2; 9.4 the equations, role craft, witness the court root minus 3 plus root 13 all over 2; 9.5 the series, role compute, witness e equals 2.7182818; 9.6 the tables, role apply, witness log 4728 equals 3.6747. The line's twin terminals are the two constants the chapter computed: ln 2 equals 0.6931472 at the left terminal, e equals 2.7182818 at the right terminal. The arrowhead beyond the right terminal points on: chapter 10 is the next stop.">
  <text x="${W / 2}" y="${T_Y}" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">the family portrait, reviewed: one line, six stations, two constants</text>
  <line x1="${LINE_X0}" y1="${LINE_Y}" x2="${LINE_X1}" y2="${LINE_Y}" stroke="#16a34a" stroke-width="3"/>
  <path d="M${LINE_X1 + 10},${LINE_Y} l-9,-4.5 v9 z" fill="#ea580c"/>
  ${st}
  <circle cx="${TERM_LX}" cy="${LINE_Y}" r="7" fill="#ffedd5" stroke="#0d9488" stroke-width="2.2"/>
  <circle cx="${TERM_RX}" cy="${LINE_Y}" r="7" fill="#ffedd5" stroke="#0d9488" stroke-width="2.2"/>
  <text x="${TERM_LX}" y="${NAME_Y_BELOW}" font-size="11" font-weight="700" text-anchor="middle" fill="#0f766e">ln 2 = 0.6931472</text>
  <text x="${TERM_LX}" y="${SUB_Y_BELOW}" font-size="9" text-anchor="middle" fill="#0f766e">9.5’s fast series</text>
  <text x="${TERM_RX}" y="${NAME_Y_BELOW}" font-size="11" font-weight="700" text-anchor="middle" fill="#0f766e">e = 2.7182818</text>
  <text x="${TERM_RX}" y="${SUB_Y_BELOW}" font-size="9" text-anchor="middle" fill="#0f766e">9.5’s partials</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* Solution figure L3(a) — the telescoping cancellation, three boxes   */
/* ------------------------------------------------------------------ */
function telescoping9RSvg(): string {
  const W = 720
  const H = 192
  const T_Y = 20
  const BOX_Y = 34
  const BOX_H = 52
  const boxes = [
    { x: 50, w: 150, base: '4', arg: '5', frac: '= ln 5 / ln 4' },
    { x: 245, w: 150, base: '5', arg: '6', frac: '= ln 6 / ln 5' },
    { x: 440, w: 150, base: '6', arg: '7', frac: '= ln 7 / ln 6' },
  ]
  const ARC_Y0 = 90
  const ARC_MID = 106
  const ARC_LBL_Y = 122
  const RES_Y = 134
  const RES_H = 48

  const bx = boxes
    .map(
      (b) =>
        `<rect x="${b.x}" y="${BOX_Y}" width="${b.w}" height="${BOX_H}" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>` +
        `<text x="${b.x + b.w / 2}" y="${BOX_Y + 24}" font-size="15" font-weight="700" text-anchor="middle" fill="#166534">log<tspan font-size="10" dy="4" fill="#65a30d">${b.base}</tspan><tspan dy="-4" font-size="15"> </tspan><tspan fill="#ea580c">${b.arg}</tspan></text>` +
        `<text x="${b.x + b.w / 2}" y="${BOX_Y + 43}" font-size="9.5" text-anchor="middle" fill="#0f766e">${b.frac}</text>`
    )
    .join('')
  const signs =
    `<text x="${(200 + 245) / 2}" y="${BOX_Y + 30}" font-size="16" font-weight="700" text-anchor="middle" fill="#d97706">×</text>` +
    `<text x="${(395 + 440) / 2}" y="${BOX_Y + 30}" font-size="16" font-weight="700" text-anchor="middle" fill="#d97706">×</text>`
  const arcs =
    `<path d="M200,${ARC_Y0} Q222.5,${ARC_MID} 245,${ARC_Y0}" fill="none" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>` +
    `<text x="222.5" y="${ARC_LBL_Y}" font-size="9" text-anchor="middle" fill="#d97706">the shared 5 cancels</text>` +
    `<path d="M395,${ARC_Y0} Q417.5,${ARC_MID} 440,${ARC_Y0}" fill="none" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>` +
    `<text x="417.5" y="${ARC_LBL_Y}" font-size="9" text-anchor="middle" fill="#d97706">the shared 6 cancels</text>`

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The telescoping cancellation for the product of log base 4 of 5, log base 5 of 6 and log base 6 of 7. Three boxes carry the three factors, each box showing the factor as a logarithm with its base in green and its argument in orange, and beneath it the change-of-base fraction: ln 5 over ln 4, ln 6 over ln 5, ln 7 over ln 6. Dashed amber arcs under the gaps read: the shared 5 cancels, the shared 6 cancels. The result strip reads: equals log base 4 of 7, the outer base 4 and the last argument 7 survive; the engine multiplies the three factors and lands on log base 4 of 7 equals 1.403677.">
  <text x="${W / 2}" y="${T_Y}" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">the telescoping cancellation: three boxes, one survivor</text>
  ${bx}
  ${signs}
  ${arcs}
  <rect x="60" y="${RES_Y}" width="600" height="${RES_H}" rx="7" fill="#ffedd5" stroke="#0d9488" stroke-width="2.2"/>
  <text x="${W / 2}" y="${RES_Y + 19}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">= log₄ 7 — the outer base 4 and the last argument 7 survive</text>
  <text x="${W / 2}" y="${RES_Y + 37}" font-size="10" text-anchor="middle" fill="#65a30d">the engine: (log₄ 5)(log₅ 6)(log₆ 7) = log₄ 7 = 1.403677</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* Solution figure L4(b) — the five-step method on bar 1.3296           */
/* ------------------------------------------------------------------ */
function antilogSteps9RSvg(): string {
  const W = 720
  const H = 204
  const T_Y = 20
  const ROW_X = 36
  const ROW_W = 648
  const ROW_H = 29
  const rowY = [32, 65, 98, 131, 164]
  const rows = [
    { tag: 'Step I', text: 'read the bar form: −1 + 0.3296 — the characteristic is −1 (bar 1), the mantissa 0.3296 stays positive' },
    { tag: 'Step II', text: 'the mantissa in the antilog table: row 32, column 9 reads 2133 — antilog 0.329 = 2.1330' },
    { tag: 'Step III', text: 'the mean difference of the fourth digit 6 adds 3: 2133 + 3 = 2136 — the significant digits are 2136' },
    { tag: 'Step IV', text: 'the characteristic places the point: bar 1 means ×10⁻¹ — 2.136 × 10⁻¹ = 0.2136' },
    { tag: 'Step V', text: 'the check closes the round trip: log 0.2136 = bar 1 with mantissa 0.3296 — engine-verified' },
  ]

  const rr = rows
    .map(
      (r, i) =>
        `<rect x="${ROW_X}" y="${rowY[i]}" width="${ROW_W}" height="${ROW_H}" rx="6" fill="${i === 4 ? '#ffedd5' : '#fef3c7'}" stroke="${i === 4 ? '#0d9488' : '#16a34a'}" stroke-width="2"/>` +
        `<text x="${ROW_X + 14}" y="${rowY[i] + 20}" font-size="10.5" text-anchor="start" fill="#166534"><tspan font-weight="700" fill="#d97706">${r.tag} · </tspan>${r.text}</text>`
    )
    .join('')

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The five-step method for the antilogarithm of bar 1.3296, the negative characteristic handled by the bar notation. Step one: read the bar form, minus 1 plus 0.3296, the characteristic is minus 1 (bar one), the mantissa 0.3296 stays positive. Step two: the mantissa in the antilog table, row 32 column 9 reads 2133, so antilog 0.329 equals 2.1330. Step three: the mean difference of the fourth digit 6 adds 3, giving 2133 plus 3 equals 2136, the significant digits are 2136. Step four: the characteristic places the point, bar one means times ten to the minus one, so 2.136 times ten to the minus one equals 0.2136. Step five, the check strip: the round trip closes, log 0.2136 is bar 1 with mantissa 0.3296, engine-verified.">
  <text x="${W / 2}" y="${T_Y}" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">the five-step method on a negative characteristic: antilog of bar 1.3296</text>
  ${rr}
</svg>`
}

/* ------------------------------------------------------------------ */
/* Solution figure L5(c) — the one crossing, bracket marked            */
/* ------------------------------------------------------------------ */
function uniquenessCross9RSvg(): string {
  const W = 720
  const H = 240
  const T_Y = 20
  // the plot window: x in [0, 5.5], y in [0, 5.5], true-to-scale mapping
  const AX = 80 // the y-axis
  const AY = 178 // the x-axis
  const PX1 = 640
  const PY0 = 34
  const XMAX = 5.5
  const YMAX = 5.5
  const px = (x: number) => AX + (x / XMAX) * (PX1 - AX)
  const py = (y: number) => AY - (y / YMAX) * (AY - PY0)
  const LN3 = Math.log(3)
  const curve = (x: number) => Math.log(x + 5) / LN3 // y = log_3(x + 5)
  // sample the curve in a loop, true-to-scale
  let path = ''
  for (let x = 0; x <= XMAX + 1e-9; x += 0.05) {
    const X = px(x)
    const Y = py(curve(x))
    path += `${path ? 'L' : 'M'}${X.toFixed(1)},${Y.toFixed(1)}`
  }
  // the crossing and the engine's bracket
  const RX = 3.0963
  const RY = 5 - RX // 1.9037
  const BR_A = 3.0
  const BR_B = 3.2

  const ticksX = [1, 2, 3, 4, 5]
    .map(
      (t) =>
        `<line x1="${px(t).toFixed(1)}" y1="${AY - 5}" x2="${px(t).toFixed(1)}" y2="${AY}" stroke="#16a34a" stroke-width="1.4"/>` +
        `<text x="${px(t).toFixed(1)}" y="${AY + 14}" font-size="9.5" text-anchor="middle" fill="#166534">${t}</text>`
    )
    .join('')
  const ticksY = [1, 2, 3, 4, 5]
    .map(
      (t) =>
        `<line x1="${AX}" y1="${py(t).toFixed(1)}" x2="${AX + 5}" y2="${py(t).toFixed(1)}" stroke="#16a34a" stroke-width="1.4"/>` +
        `<text x="${AX - 8}" y="${(py(t) + 3).toFixed(1)}" font-size="9.5" text-anchor="end" fill="#166534">${t}</text>`
    )
    .join('')

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The unique crossing of the rising curve y equals log base 3 of x plus 5 with the falling line y equals 5 minus x, drawn true-to-scale on the window x from 0 to 5.5 and y from 0 to 5.5. The teal curve rises from about 1.47 at x equals 0 to about 2.19 at x equals 5.5; the orange line falls from 5 at x equals 0 to 0 at x equals 5. They cross once, at the orange dot near x equals 3.0963, y about 1.9, labelled the one crossing x about 3.0963. A dashed amber guide drops from the dot to the x-axis, where the engine's bracket from 3.0 to 3.2 is marked under the axis with the label: one crossing inside it.">
  <text x="${W / 2}" y="${T_Y}" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">one crossing: the rising log against the falling line</text>
  <line x1="${AX}" y1="${AY}" x2="${PX1}" y2="${AY}" stroke="#16a34a" stroke-width="1.8"/>
  <line x1="${AX}" y1="${PY0}" x2="${AX}" y2="${AY}" stroke="#16a34a" stroke-width="1.8"/>
  ${ticksX}
  ${ticksY}
  <path d="${path}" fill="none" stroke="#0d9488" stroke-width="2.6"/>
  <line x1="${px(0).toFixed(1)}" y1="${py(5).toFixed(1)}" x2="${px(5).toFixed(1)}" y2="${py(0).toFixed(1)}" stroke="#ea580c" stroke-width="2.6"/>
  <text x="95" y="118" font-size="10" font-weight="700" text-anchor="start" fill="#0d9488">y = log₃(x + 5)</text>
  <text x="170" y="54" font-size="10" font-weight="700" text-anchor="start" fill="#ea580c">y = 5 − x</text>
  <line x1="${px(RX).toFixed(1)}" y1="${py(RY) + 7}" x2="${px(RX).toFixed(1)}" y2="${AY}" stroke="#d97706" stroke-width="1.2" stroke-dasharray="4 3"/>
  <circle cx="${px(RX).toFixed(1)}" cy="${py(RY).toFixed(1)}" r="5.5" fill="#ea580c" stroke="#ffffff" stroke-width="1.6"/>
  <text x="${px(RX) + 6}" y="${py(RY) - 20}" font-size="10.5" font-weight="700" text-anchor="start" fill="#166534">the one crossing: x ≈ 3.0963</text>
  <line x1="${px(BR_A).toFixed(1)}" y1="${AY + 36}" x2="${px(BR_B).toFixed(1)}" y2="${AY + 36}" stroke="#d97706" stroke-width="1.8"/>
  <line x1="${px(BR_A).toFixed(1)}" y1="${AY + 36}" x2="${px(BR_A).toFixed(1)}" y2="${AY + 28}" stroke="#d97706" stroke-width="1.8"/>
  <line x1="${px(BR_B).toFixed(1)}" y1="${AY + 36}" x2="${px(BR_B).toFixed(1)}" y2="${AY + 28}" stroke="#d97706" stroke-width="1.8"/>
  <text x="${px(RX).toFixed(1)}" y="${AY + 50}" font-size="9.5" text-anchor="middle" fill="#d97706">the engine’s bracket [3.0, 3.2] — one crossing inside</text>
</svg>`
}

/* ==================================================================== */
/* Lesson 9.R — Unit 9 Completion Review                                 */
/* ==================================================================== */

export const lesson9R: Lesson = {
  id: 'aa-exponentials-and-logarithms-unit-9-review',
  number: '9.R',
  title: 'Unit 9 Completion Review',
  concepts: [
    'the arc: the family, the inverse, the laws, the equations, the series, the tables',
    'the master table: one row per lesson with its engine-verified witness',
    'the formula family gathered: definition pair, law family, series, modulus, digit law',
    'the one-move re-derivations: squeeze, inverse pair, product law, domain rider, fast series, two-part split',
    'the audit bench: cross-lesson chains, logs to bridge to digit law in one calculation',
    'the mixed bench: fresh witnesses crossing every lesson boundary',
    'the doorstep: convergence proofs deferred, the calculus life ahead',
  ],
  objectives: [
    'Hold the whole unit in one hand — the wiring of its six lessons (the family, the inverse, the laws, the equations, the series, the tables), the master table with its engine-verified witnesses, and the formula family gathered from the definition pair to the digit-count law.',
    'Re-derive each essential in one move — the squeeze, the inverse pair, the product law, the domain rider, the fast series and the two-part split — citing the lesson that owns the full version, and rebuild any of them from its owner when memory fails.',
    'Run the cross-lesson chains: count the digits of a giant power by logs, the $\\mu$ bridge and the digit law together; solve mixed equations with the domain and monotonicity audits bolted on; and close the table craft’s antilog round trips.',
    'Solve the mixed bench — fresh witnesses crossing every lesson boundary, L1 through L6 — and diagnose every miss back to its home lesson by the shape it wore.',
    'State the unit’s honest boundaries — the convergence proofs deferred to chapter 10, the stated-not-proved status of the squeeze’s completeness — and the handoffs: chapter 10 "The Synthesis and the Doorstep" and the calculus doorstep beyond it, named, never taught here.',
  ],
  prerequisites: [
    'aa-the-exponential-family-every-real-index',
    'aa-logarithms-the-inverse-machine',
    'aa-the-laws-of-logarithms-and-the-change-of-base',
    'aa-logarithmic-and-exponential-equations',
    'aa-exponential-and-logarithmic-series',
    'aa-logarithm-tables-characteristic-mantissa-and-antilogarithm',
  ],
  sources: [
    'cengage-m1-01',
    'cengage-jee-style',
    'hall-knight-higher-algebra',
    'jee-main-2026-syllabus',
  ],
  blocks: [
    // ================================================================ opening
    { kind: 'para', text: 'Chapter 9 began with a machine whose climb is a constant percent — the family $a^{x}$, built for every real index by squeezing the irrational rung between rational brackets. Lesson 9.2 undid it: the logarithm, the exponent read backwards, with its definition pair and its two inverse identities. Lesson 9.3 gave the undo its algebra — the three laws, the base laws, the change of base and the reciprocal law. Lesson 9.4 turned the family loose on equations, bolting on the domain rider and the monotonicity certificate. Lesson 9.5 built the computing engine — the series for $e^{x}$ and $\\ln(1+x)$, the fast series, and the modulus $\\mu$ that converted natural values into common currency. Lesson 9.6 cashed the series as commerce: characteristic, mantissa, antilogarithm, and the digit-count law. Six lessons, one machine, and now the whole walk is done.' },
    { kind: 'para', text: 'A review in this book does two things and refuses a third. It CONSOLIDATES: the formula family in one place, the craft moves re-derived briefly with their owners named, and the witnesses re-audited in chains that cross lesson boundaries on purpose — because that is exactly how an examination prices a unit: one machine arrives, and every reading the unit owns is asked of it in turn. And it runs a MIXED bench: seventeen fresh questions through the six levels, every one a new witness, every one full-steps and engine-verified. What the review refuses is re-teaching: nothing here re-proves what 9.1 through 9.6 established once, and every derivation below is one move with a pointer to its owner. The engines of this review re-computed every number on this page — one hundred ninety-six checks, all green — before a word of the prose was fixed.' },
    { kind: 'para', text: 'The order of business is the order of consolidation: the chapter in one table first, then the essentials re-derived one move each, then the audit bench that walks the whole chapter in single calculations, then the mixed bench, and finally the doorstep — what this unit opened that the next one inherits. Read the table once before the bench and once after: the second reading should look shorter.' },

    // ================================================== one table
    { kind: 'heading', text: 'The Chapter in One Table' },
    { kind: 'para', text: 'Strip the unit of its prose and one table remains — the six lessons as rows, each with the object it built and the witness that pins it. Every witness below was recomputed by this review’s engines against the lesson’s own pinned value before this page was written; none is a memory transcribed. Read the rows in order and the arc of the chapter walks itself: a machine, its undo, the undo’s laws, the equations both spawn, the series that computed the constants, and the tables the series made buildable.' },
    { kind: 'table', caption: 'The unit in one table — six lessons, six objects, six engine-verified witnesses. Every number was recomputed by the review’s engines before this prose was written; the witnesses are the lessons’ own pinned exhibits, re-run here as a census.', head: ['Lesson', 'The object it built', 'The pinned witness'], rows: [
      ['9.1 · The Exponential Family', 'the machine $a^{x}$ defined for every real index — rational rungs through roots, the irrational rung by squeezing; growth and decay families, the asymptote $y = 0$, percent readings and same-base equations', '$2^{\\sqrt{2}} = 2.6651$ — $2.6651441$ to seven places, pinned by the squeeze $2.657372 < 2^{\\sqrt{2}} < 2.675855$'],
      ['9.2 · Logarithms: the Inverse Machine', 'the undo $\\log_{a}$ — the definition pair, the two inverse identities, the mirror law, the vertical asymptote $x = 0$, the sign law and the ordering crafts', '$\\log_{2\\sqrt{2}} 128 = \\tfrac{14}{3}$ — the engineered base $2\\sqrt{2} = 2^{3/2}$, the exponent read at sight'],
      ['9.3 · The Laws of Logarithms', 'the algebra of logs — the product, quotient and power laws, the base laws, the change of base, the reciprocal law, the telescoping craft', 'the telescoping chain $(\\log_{3} 4)(\\log_{4} 5)(\\log_{5} 6)(\\log_{6} 7)(\\log_{7} 8)(\\log_{8} 9) = 2$'],
      ['9.4 · Logarithmic and Exponential Equations', 'the equation craft — same-base equating, the hidden quadratic, the domain rider, the extraneous-root audit, the monotonicity uniqueness certificate', 'the extraneous-root court: $x = \\tfrac{-3+\\sqrt{13}}{2} = 0.3027756$ admitted, the mirror root refused by the rider'],
      ['9.5 · Exponential and Logarithmic Series', 'the computing engine — $e^{x}$, $\\ln(1+x)$, the fast series, the modulus $\\mu$, the constants $e$ and $\\ln 2$ themselves', '$e = 2.7182818$ — $2.718281828459045$ to fifteen places, the partials climbing $2.6666667 \\to 2.7182818$'],
      ['9.6 · Logarithm Tables', 'the table craft — characteristic rules, the mantissa invariance, the antilogarithm, the digit-count law', '$\\log 4728 = 3.6747$ — $3.6746775$ to seven places, the split $3 + 0.6747$ and the round trip $\\operatorname{antilog}(2.6747) = 472.82$'],
    ] },
    { kind: 'para', text: 'From the above discussion, it follows that the six witnesses are one story told six ways, and the story is worth reading aloud once:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $2^{\\sqrt{2}} = 2.6651$ is a DEFINITION by squeezing — the one witness on the table no arithmetic produces directly, and the reason the family covers every real index;',
      '(ii) $\\tfrac{14}{3}$ is the definition pair read backwards on an engineered base — the undo cashing the one-one machine 9.1 built;',
      '(iii) the chain $= 2$ is the change of base cashed six times in a row — no table touched anywhere in it, pure algebra;',
      '(iv) $0.3027756$ is a QUADRATIC root wearing logarithmic clothes, admitted by its domain rider while its mirror is refused — 9.4’s whole craft in one number;',
      '(v) $2.7182818$ is the series limit — the only witness built by convergence rather than by algebra, and the reason 9.6’s tables could be built at all;',
      '(vi) $3.6747$ is that series cashed into currency: $\\log 3 = \\mu \\ln 3 = 0.4771213$ by the bridge, then the two-part split and the digit law — the table’s own memory.',
    ] },
    { kind: 'callout', tone: 'definition', title: 'The six registers of the unit', text: 'The chapter’s architecture, stated once as a definition. A REGISTER of this unit is one machine that prices a family of questions about exponentials and logarithms: (i) the MACHINE register — $a^{x}$ for every real index, its shape, its races and its same-base equations (9.1); (ii) the UNDO register — the definition pair and the inverse identities (9.2); (iii) the LAW register — the algebra of logarithms, the change of base, the ordering crafts (9.3); (iv) the EQUATION register — the craft with its two audits, the domain rider and the monotonicity certificate (9.4); (v) the SERIES register — $e^{x}$, $\\ln(1+x)$, the fast series and the $\\mu$ bridge (9.5); (vi) the TABLE register — characteristic, mantissa, antilog and the digit-count law (9.6). Thus every question this unit answers is two questions in disguise: which register owns it, and which audit it demands.' },
    { kind: 'para', text: 'The formula family gathers next — the cards a reader must eventually recall cold, each with its home lesson and each re-verified against that lesson by the review’s engines. The displays first, then the cards, then the two-column index that routes a question to its fold:' },
    { kind: 'equation', latex: '\\log_a y = x \\iff a^x = y; \\qquad a^{\\log_a y} = y, \\;\\; \\log_a(a^x) = x \\tag{1}', note: 'the definition pair with the two inverse identities — 9.2’s whole foundation in one line, for $a > 0$, $a \\neq 1$, $y > 0$; every property of the logarithm in this book reads one of these arrows.' },
    { kind: 'equation', latex: '\\log_a(mn) = \\log_a m + \\log_a n; \\quad \\log_a\\tfrac{m}{n} = \\log_a m - \\log_a n; \\quad \\log_a(m^{p}) = p\\log_a m; \\quad \\log_b x = \\tfrac{\\log_a x}{\\log_a b} \\tag{2}', note: 'the law family of 9.3 — three laws plus the change of base; the reciprocal $\\log_a b \\cdot \\log_b a = 1$ and the mirror $\\log_{1/a} x = -\\log_a x$ ride the same shelf, and the telescoping chain is the change of base run six times.' },
    { kind: 'equation', latex: 'e^{x} = \\sum_{k} \\tfrac{x^{k}}{k!}; \\qquad \\ln\\tfrac{1+x}{1-x} = 2\\left(x + \\tfrac{x^{3}}{3} + \\tfrac{x^{5}}{5} + \\cdots\\right); \\qquad \\log_{10} x = \\mu \\ln x, \\;\\; \\mu = 0.4342945\\ldots \\tag{3}', note: 'the computing engine of 9.5 — the exponential series, the fast series at $x = \\tfrac{1}{3}$ (five terms pin $\\ln 2 = 0.6931460$), and the modulus $\\mu$ that bridges natural series values into common logarithms.' },
    { kind: 'formula', name: 'The definition pair', latex: '\\log_a y = x \\iff a^x = y \\quad (a > 0,\\; a \\neq 1,\\; y > 0)', note: 'the whole of 9.2 in one arrow — the logarithm names the exponent; witness $\\log_{2\\sqrt{2}} 128 = \\tfrac{14}{3}$, read at sight because $2\\sqrt{2} = 2^{3/2}$.' },
    { kind: 'formula', name: 'The inverse identities', latex: 'a^{\\log_a y} = y \\quad \\text{and} \\quad \\log_a(a^x) = x', note: 'machine and undo annihilating each other in both orders — derived in two moves from the definition pair in 9.2 and re-swept numerically by this review’s engines.' },
    { kind: 'formula', name: 'The three laws', latex: '\\log_a(mn) = \\log_a m + \\log_a n; \\qquad \\log_a\\tfrac{m}{n} = \\log_a m - \\log_a n; \\qquad \\log_a(m^{p}) = p\\log_a m', note: '9.3’s law family — each derived from the banked exponent laws by one substitution; the cleanest cash: $\\log 2 + \\log 5 = \\log 10 = 1$.' },
    { kind: 'formula', name: 'The base laws and the change of base', latex: '\\log_a 1 = 0, \\;\\; \\log_a a = 1, \\;\\; \\log_{1/a} x = -\\log_a x; \\qquad \\log_b x = \\tfrac{\\log_a x}{\\log_a b}; \\qquad \\log_a b = \\tfrac{1}{\\log_b a}', note: 'the anchors, the mirror law and the two conversion laws of 9.3 — the telescoping chain $(\\log_{3} 4)\\cdots(\\log_{8} 9) = 2$ is the change of base cancelling six deep.' },
    { kind: 'formula', name: 'The equation craft', latex: 'a^{f(x)} = a^{g(x)} \\Rightarrow f(x) = g(x); \\qquad \\log_a f(x) \\text{ demands } f(x) > 0; \\qquad \\text{rising against falling crosses at most once}', note: 'the three moves of 9.4 — same-base equating licensed by monotonicity, the domain rider as the extraneous-root audit, and the uniqueness certificate that needs no algebra at all.' },
    { kind: 'formula', name: 'The series pair', latex: 'e^{x} = 1 + x + \\tfrac{x^{2}}{2!} + \\tfrac{x^{3}}{3!} + \\cdots; \\qquad \\ln(1+x) = x - \\tfrac{x^{2}}{2} + \\tfrac{x^{3}}{3} - \\cdots \\; (|x| < 1)', note: '9.5’s two display series — at $x = 1$ the partials climb to $e = 2.7182818$ ($S_{11}$ within $2.7 \\times 10^{-8}$); the fast series exists because the plain logarithmic series crawls near $x = 1$.' },
    { kind: 'formula', name: 'The fast series', latex: '\\ln\\tfrac{1+x}{1-x} = 2\\left(x + \\tfrac{x^{3}}{3} + \\tfrac{x^{5}}{5} + \\tfrac{x^{7}}{7} + \\tfrac{x^{9}}{9} + \\cdots\\right), \\qquad x = \\tfrac{1}{3} \\Rightarrow \\ln 2', note: 'the accelerated series of 9.5 — five terms give $\\ln 2 = 0.6931460$ against the true $0.6931472$: five decimal places exact, the sixth off by one unit, a miss of $0.0000011$.' },
    { kind: 'formula', name: 'The modulus mu', latex: '\\mu = \\log_{10} e = 0.4342945\\ldots; \\qquad \\log_{10} x = \\mu \\ln x', note: 'the exchange rate between natural and common logarithms — the bridge the series crossed to build 9.6’s tables; witness $\\log 3 = \\mu \\cdot \\ln 3 = 0.4342945 \\times 1.0986123 = 0.4771213$.' },
    { kind: 'formula', name: 'The digit-count law', latex: '\\operatorname{digits}(N) = \\lfloor \\log_{10} N \\rfloor + 1 \\quad \\text{for every positive integer } N', note: '9.6’s headline theorem — priced on $3^{40}$ (twenty digits), $2^{50}$ (sixteen) and $2^{100}$ ($1267650600228229401496703205376$, thirty-one) by this review’s engines.' },
    { kind: 'table', caption: 'The formula family gathered as an index — six folds, one per lesson; the cards above carry the display forms, this table routes a question to its fold. Each fold is verified against its home lesson by the review’s engines.', head: ['The family fold', 'What it carries'], rows: [
      ['the machine itself (9.1)', '$f(x) = a^{x}$ with $a > 0$, $a \\neq 1$, every real index; strict monotonicity; the range $(0, \\infty)$; the asymptote $y = 0$; the percent reading $a = 1 + r$; the decay flip'],
      ['the definition pair (9.2)', '$\\log_a y = x \\iff a^x = y$; the inverse identities; the anchors $\\log_a 1 = 0$ and $\\log_a a = 1$; the domain discipline; the sign law'],
      ['the law family (9.3)', 'product, quotient, power; the base laws with the mirror; the change of base; the reciprocal; the telescoping and ordering crafts'],
      ['the equation craft (9.4)', 'same-base equating; the hidden quadratic by $t = a^{x}$; the domain rider $f(x) > 0$; the monotonicity uniqueness certificate'],
      ['the series (9.5)', '$e^{x}$ and its partials; $\\ln(1+x)$; the fast series; the modulus $\\mu = 0.4342945$; the constants $e$ and $\\ln 2$'],
      ['the table craft (9.6)', 'the characteristic rules with bar notation; the mantissa invariance; $\\operatorname{antilog} m = 10^{m}$; the digit-count law'],
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The digit-count law', text: 'For every positive integer $N$ (base ten): the number of digits of $N$ is $\\lfloor \\log_{10} N \\rfloor + 1$. PROOF IN ONE LINE: a $k+1$-digit integer satisfies $10^{k} \\leq N < 10^{k+1}$, and the monotonicity of the logarithm converts that seat bracket into $k \\leq \\log N < k+1$ — which is exactly the statement $\\lfloor \\log N \\rfloor = k$, so the count is $k + 1$. The law is priced at full strength in the L6 bench (on $2^{100}$, a thirty-one-digit integer the engine wrote out in full) and it powered this review’s own audit chain: $3^{40}$ has $40 \\times 0.4771213 = 19.0849$, so twenty digits. Stated as a theorem because it is the one result of the table craft the examination hall prices by name.' },
    { kind: 'callout', tone: 'insight', title: 'Which fold answers which question', text: 'The working rule the unit earned, stated once for the whole family: CONVERT before you compute. A question in powers of one base belongs to 9.1’s same-base discipline; a question asking "which exponent" belongs to 9.2’s definition pair; a question in sums and differences of logs belongs to 9.3’s laws; an equation mixing logs with non-logs belongs to 9.4’s monotonicity certificate with its domain audit; a value the tables cannot reach belongs to 9.5’s series; and a question about digits, characteristics or antilogs belongs to 9.6’s table craft. The mixed bench below deliberately crosses these wires — because that is exactly how an examination prices a unit.' },

    // ================================================== re-derivations
    { kind: 'heading', text: 'The Essentials, Re-Derived in One Move Each' },
    { kind: 'para', text: 'Six derivations carried the unit’s weight, and a review earns its keep by re-running each in a single move — not re-proving (the lessons did that once), but rebuilding the step the memory actually loses first: the move that gives the result its meaning. Each block below cites the lesson that owns the full version; if a derivation feels like magic after this pass, the pointer says where the rest of the ladder lives.' },
    { kind: 'derivation', title: 'The squeeze, recalled in two moves', statement: 'From $1.41 < \\sqrt{2} < 1.42$ to $2.657372 < 2^{\\sqrt{2}} < 2.675855$ — 9.1’s definition of the irrational rung, compressed to its two working moves (the full ladder, with its convergence honesty, is 9.1’s).', steps: [
      { label: 'Carry the bracket across', formula: '1.41 < \\sqrt{2} < 1.42 \\;\\Longrightarrow\\; 2^{1.41} < 2^{\\sqrt{2}} < 2^{1.42}', explanation: 'monotonicity of $2^{x}$ transfers an index bracket into a value bracket — and read carefully, this move is not a theorem ABOUT the middle entry: it is the move that GIVES the symbol its meaning.' },
      { label: 'Compute the ends', formula: '2^{1.41} = 2.657372, \\qquad 2^{1.42} = 2.675855', explanation: 'engine-computed to six decimals: the irrational power sits caged in a band of width $0.018483$, and one more rational rung ($1.4142 < \\sqrt{2} < 1.4143$) narrows the cage to $2.665119 < 2^{\\sqrt{2}} < 2.665304$ — the nested brackets pinning $2.6651441\\ldots$' },
    ], result: 'the bracket pins $2^{\\sqrt{2}} = 2.6651441\\ldots$ — $2.6651$ to four places — defined by squeezing; the full ladder and the completeness it quietly assumes are 9.1’s and chapter 10’s' },
    { kind: 'derivation', title: 'The inverse pair, recalled in two moves', statement: 'For every legal base $a$ and every $y > 0$: $a^{\\log_{a} y} = y$ — the machine and its undo annihilating each other (the full two-identity derivation is 9.2’s).', steps: [
      { label: 'Every positive y is reached', formula: 'y > 0 \\;\\Rightarrow\\; \\text{some real } x \\text{ has } a^{x} = y', explanation: 'the range law of 9.1 — the exponential builds exactly the positive half-line, so the undo has nothing to refuse.' },
      { label: 'Read the definition on that x', formula: 'a^{x} = y \\;\\Longleftrightarrow\\; \\log_{a} y = x \\;\\Longrightarrow\\; a^{\\log_{a} y} = y', explanation: 'the definition pair read forward: the exponent that builds $y$ is $x$, so re-building with that exponent returns $y$ — two moves, no machinery beyond the definition. The engine swept $2^{\\log_{2} y} = y$ on five witnesses and $\\log_{5}(5^{x}) = x$ across $[-3, 3]$ before this page was fixed.' },
    ], result: '$a^{\\log_{a} y} = y$ for every $y > 0$, with the twin $\\log_{a}(a^{x}) = x$ for every real $x$ — the pair 9.2 derived and this review re-ran numerically' },
    { kind: 'derivation', title: 'The product law, recalled in one move', statement: 'From the exponent law $a^{x} \\cdot a^{y} = a^{x+y}$ to $\\log_{a}(mn) = \\log_{a} m + \\log_{a} n$ — 9.3’s first derivation compressed to its single substitution (the full version, with the quotient and power laws, is 9.3’s).', steps: [
      { label: 'Substitute the logs', formula: 'a^{\\log_{a} m} \\cdot\\; a^{\\log_{a} n} = a^{\\log_{a} m + \\log_{a} n}', explanation: 'write $x = \\log_{a} m$ and $y = \\log_{a} n$, so $m = a^{x}$ and $n = a^{y}$; the banked exponent law collapses the left product into one power, and the definition pair converts it back: $\\log_{a}(mn) = x + y$.' },
    ], result: '$\\log_{a}(mn) = \\log_{a} m + \\log_{a} n$ — one substitution over the banked exponent law; its cleanest cash is $\\log 2 + \\log 5 = \\log 10 = 1$' },
    { kind: 'derivation', title: 'The domain rider, recalled as the mirror guard', statement: 'The equation craft of 9.4 bolts a rider onto every log equation — the arguments must stay POSITIVE — and the rider is chapter 8’s loss-of-roots guard seen in a mirror: division DROPPED roots there, the log domain REFUSES candidates here.', steps: [
      { label: 'The rider', formula: '\\log_{a}(f(x)) \\text{ defined} \\;\\Longrightarrow\\; f(x) > 0', explanation: 'the range law of 9.1: no exponential ever builds zero or a negative, so the undo refuses every non-positive argument — $\\log_{2}(-8)$ and $\\log_{2} 0$ are refusals, not values.' },
      { label: 'The audit', formula: '\\text{candidates} \\;\\to\\; \\text{the rider} \\;\\to\\; \\text{the survivors}', explanation: 'combining a log equation into an algebraic one GROWS candidates exactly as chapter 8’s squaring did; the rider audits them before the answer is banked. The review’s own court: behind $\\log_{2}(x+2) + \\log_{2}(x+1) = \\log_{2} 3$ sits $x^{2}+3x-1 = 0$, whose roots are $\\tfrac{-3 \\pm \\sqrt{13}}{2}$ — the mirror root $-3.3028$ dies at the rider ($x + 1 < 0$) while $0.3028$ survives it.' },
    ], result: 'the domain rider $f(x) > 0$ — chapter 8’s guard mirrored: gains candidates, audits before banking; witness $x = \\tfrac{-3+\\sqrt{13}}{2} = 0.3027756$ admitted, its mirror refused' },
    { kind: 'derivation', title: 'The fast series, recalled in two moves', statement: 'Five terms of the fast series at $x = \\tfrac{1}{3}$ pin $\\ln 2 = 0.6931460$ against the true $0.6931472$ — 9.5’s computing engine compressed (the full convergence story is 9.5’s, and chapter 10’s first stop).', steps: [
      { label: 'The fast series', formula: '\\ln\\tfrac{1+x}{1-x} = 2\\left(x + \\tfrac{x^{3}}{3} + \\tfrac{x^{5}}{5} + \\tfrac{x^{7}}{7} + \\tfrac{x^{9}}{9} + \\cdots\\right)', explanation: 'at $x = \\tfrac{1}{3}$ the ratio $\\tfrac{1+x}{1-x}$ is exactly $2$, so the series computes $\\ln 2$ directly — and it runs where the plain logarithmic series at $x = 1$ would crawl (9.5’s reason for building it).' },
      { label: 'The five terms', formula: '0.6666667 + 0.0246914 + 0.0016461 + 0.0001306 + 0.0000113 = 0.6931460', explanation: 'the terms are $\\tfrac{2}{3}, \\tfrac{2}{81}, \\tfrac{2}{1215}, \\tfrac{2}{15309}, \\tfrac{2}{177147}$ — each roughly a ninth of the last; the miss against the truth is $0.0000011$, five decimal places exact with the sixth off by a single unit.' },
    ], result: '$\\ln 2 = 0.6931460$ from five terms (truth $0.6931472$) — millionth-order accuracy, the accuracy that made logarithm tables buildable; the convergence proofs are deferred to chapter 10, honestly' },
    { kind: 'derivation', title: 'The two-part split, recalled in one move', statement: 'From $n = m \\times 10^{p}$ (the significant digits $m$ with $1 \\leq m < 10$) to $\\log n = $ characteristic $+$ mantissa — 9.6’s definition of the table’s two-part memory, in its single move.', steps: [
      { label: 'Split the log', formula: '\\log n = \\log m + \\log 10^{p} = \\log m + p', explanation: 'the product law of 9.3 does the splitting, and $1 \\leq m < 10$ forces $0 \\leq \\log m < 1$ (monotonicity between $\\log 1 = 0$ and $\\log 10 = 1$) — so the split is UNIQUE: the integer part $p$ is the characteristic, the fractional part $\\log m$ the mantissa.' },
    ], result: '$\\log n = p + \\log m$: the characteristic $p$ seats the number, the mantissa remembers its digits — on $4728 = 4.728 \\times 10^{3}$: $3 + 0.6747 = 3.6747$' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the two audits the hall prices hardest', text: 'The unit’s two recurring misses, one line each. The DOMAIN RIDER: every log argument must be positive — the court’s mirror root dies at $x + 1 < 0$, and writing $\\log_{2}(-8)$ on a paper costs the whole question, not half of it. The FLIP: an inequality between powers of a base in $(0, 1)$ reverses exactly as division by a negative number would — 9.1’s number-one trap, still live in any decay-shaped comparison the bench throws. One audit before every answer, one direction-check on every decay base: those two habits carry the unit’s marks.' },
    { kind: 'callout', tone: 'historical', title: 'Adams, and the constants computed to 260 places', text: 'Hall & Knight record a Victorian monument worth meeting at the unit’s door: in the Proceedings of the Royal Society of London (Vol. XXVII, p. 88), Professor J. C. Adams published $e$, $\\mu$, $\\ln 2$, $\\ln 3$ and $\\ln 5$ to MORE THAN 260 decimal places — the five constants this unit’s series compute, carried two hundred places past anything the tables ever needed, by the same kind of series arithmetic 9.5 built. The note keeps perspective: the fast series’ five-place miss of $0.0000011$ on $\\ln 2$ was a practical triumph in 1874 and a rounding accident today — the mathematics is unchanged, only the patience is cheaper now.' },
    { kind: 'terms', items: [
      { term: 'Consolidation', def: 'the review mode of this lesson: re-map the unit, re-derive each essential in one move citing its owner, re-audit the witnesses in cross-lesson chains, and drill a mixed bench — never re-teach, never re-prove what a lesson proved once.' },
      { term: 'The master table', def: 'the six-row census of the unit — one row per lesson: the object it built and its engine-verified pinned witness.' },
      { term: 'The definition pair', def: '$\\log_a y = x \\iff a^x = y$ for $a > 0$, $a \\neq 1$, $y > 0$ — the two arrows every property of the logarithm reads.' },
      { term: 'The law family', def: 'the product, quotient and power laws together with the base laws, the change of base $\\log_b x = \\tfrac{\\log_a x}{\\log_a b}$ and the reciprocal $\\log_a b \\cdot \\log_b a = 1$.' },
      { term: 'The domain rider', def: 'the audit bolted on every log equation: each argument must stay positive — the mirror of chapter 8’s loss-of-roots guard, refusing candidates the algebra grew.' },
      { term: 'The monotonicity certificate', def: 'the two-line uniqueness argument: a strictly rising side against a strictly falling side crosses at most once, so an exhibited root is the root.' },
      { term: 'The fast series', def: '$\\ln\\tfrac{1+x}{1-x} = 2\\left(x + \\tfrac{x^{3}}{3} + \\tfrac{x^{5}}{5} + \\cdots\\right)$ — the accelerated logarithmic series; at $x = \\tfrac{1}{3}$ it computes $\\ln 2$ to five decimal places in five terms.' },
      { term: 'The modulus', def: '$\\mu = \\log_{10} e = 0.4342945\\ldots$ — the exchange rate between natural and common logarithms: $\\log x = \\mu \\ln x$, the bridge the series crossed to build tables.' },
      { term: 'Characteristic and mantissa', def: 'the two-part memory of $\\log n = p + \\log m$ (with $n = m \\times 10^{p}$, $1 \\leq m < 10$): the characteristic $p$ seats the number, the mantissa remembers its significant digits — the same digits carry the same mantissa wherever they sit.' },
      { term: 'The digit-count law', def: 'a positive integer $N$ has $\\lfloor \\log_{10} N \\rfloor + 1$ digits — the table craft’s headline theorem, priced on $3^{40}$ (twenty digits) and $2^{100}$ (thirty-one).' },
      { term: 'The mixed bench', def: 'the review’s drill discipline: fresh witnesses that cross lesson boundaries on purpose, because that is how an examination prices a unit — one machine arrives, every reading is asked of it in turn.' },
    ] },

    // ================================================== audit bench
    { kind: 'heading', text: 'The Audit Bench' },
    { kind: 'para', text: 'The audit bench re-runs the unit’s witnesses TOGETHER — cross-lesson chains priced as chains, because that is the game the examination actually plays with a finished unit. Five Illustrations follow: the whole chapter in one calculation, the equation craft on its two showpieces, the laws in their telescoping and comparison costumes, the two constants side by side, and the table craft’s round trip. Every number in every step was re-computed by this review’s engines before the prose carrying it was fixed — the census is not a memory transcribed.' },
    { kind: 'example', title: 'How many digits has $3^{40}$? — one calculation that walks the whole chapter', steps: [
      'Set the chain up: the question never needs the integer itself — it needs only $\\log 3^{40}$, and the power law of logs (9.3’s law, cashing 9.2’s definition) converts the power into a product: $\\log 3^{40} = 40 \\cdot \\log 3$.',
      'So, the entry: 9.5’s $\\mu$ bridge supplies it — $\\log 3 = \\mu \\cdot \\ln 3 = 0.4342945 \\times 1.0986123 = 0.4771213$ — a series value converted into common currency, which is what the bridge existed for.',
      'Now, the product: $40 \\times 0.4771213 = 19.0849$ — the logarithm of a twenty-digit giant, held in four decimal places.',
      'So, the law: 9.6’s digit-count law reads the floor: $\\lfloor 19.0849 \\rfloor + 1 = 19 + 1 = 20$ — twenty digits, and not one multiplication of threes anywhere in the chain.',
      'Check, the audit: the engine multiplies out — $3^{40} = 12157665459056928801$ — and counts exactly twenty digits; the exact route $\\lfloor 40 \\log 3 \\rfloor + 1$ returns the same twenty.',
      'Hence twenty digits, by a chain that walked 9.2’s logs, 9.5’s bridge and 9.6’s law without ever writing the number — the chapter in one calculation, drawn in the figure below.',
    ] },
    { kind: 'figure', caption: 'The chapter in one chain: counting the digits of $3^{40}$. The question enters at the first station; the power law of logarithms (9.2’s definition cashed as 9.3’s law) converts the power to the product $40 \\cdot \\log 3$; the $\\mu$ bridge of 9.5 supplies the entry $\\log 3 = 0.4342945 \\times 1.0986123 = 0.4771213$; the product reads $19.0849$; the digit-count law of 9.6 takes the floor and adds one — twenty digits. The verdict bar is the audit itself: $3^{40} = 12157665459056928801$, engine-counted, twenty digits exactly. Four lessons, one number.', svg: chapterChain9RSvg() },
    { kind: 'para', text: 'That chain is the unit’s proudest property: the logarithm of a giant is small, and its floor counts digits. The bench prices the same chain three more times below — on $2^{50}$ at L4, on $2^{100}$ at L6 — each time with the engine’s exact multiplication standing behind the four-place arithmetic as the audit.' },
    { kind: 'example', title: 'The equation craft recap: solve $\\log_{2}(x+2) = 4 - x$, and solve $3^{2x} - 8\\cdot 3^{x} - 9 = 0$', steps: [
      'Set the first up: the equation mixes a rising logarithm with a falling line — no algebra isolates $x$, so the monotonicity discipline of 9.4 owns it.',
      'So, exhibit the root: at $x = 2$, $\\log_{2} 4 = 2$ and $4 - 2 = 2$ — both sides agree, and the engine’s bisection lands exactly there.',
      'Now, certify the uniqueness: the left side strictly increases (base $2 > 1$ and $x + 2$ rises) while the right side strictly decreases — a rising curve and a falling line cross at most once, and one crossing is exhibited: exactly one root, $x = 2$.',
      'Set the second up: substitute $t = 3^{x} > 0$, and the equation becomes the hidden quadratic $t^{2} - 8t - 9 = (t-9)(t+1) = 0$, so $t = 9$ or $t = -1$.',
      'Now, audit the candidates: $t = 9$ returns $x = \\log_{3} 9 = 2$ (check: $3^{4} - 8 \\cdot 3^{2} - 9 = 81 - 72 - 9 = 0$); $t = -1$ is REFUSED — $3^{x} > 0$ for every real $x$, so the negative root of the hidden quadratic is an impostor the exponential’s range law vetoes.',
      'Hence the first equation has the unique root $x = 2$ by monotonicity alone, and the second the single real root $x = 2$ with the refused candidate named — the two crafts of 9.4, one showcase each.',
    ] },
    { kind: 'example', title: 'The laws recap: the telescoping chain $(\\log_{3} 4)(\\log_{4} 5)(\\log_{5} 6)(\\log_{6} 7)(\\log_{7} 8)(\\log_{8} 9)$, and the comparison $\\log_{3} 5$ versus $\\log_{17} 25$', steps: [
      'Set the chain up: six factors, each base the previous argument — the telescoping shape 9.3 built the change of base for.',
      'So, convert every factor: $\\log_{b} c = \\tfrac{\\ln c}{\\ln b}$ turns the product into $\\tfrac{\\ln 4}{\\ln 3} \\cdot \\tfrac{\\ln 5}{\\ln 4} \\cdot \\tfrac{\\ln 6}{\\ln 5} \\cdot \\tfrac{\\ln 7}{\\ln 6} \\cdot \\tfrac{\\ln 8}{\\ln 7} \\cdot \\tfrac{\\ln 9}{\\ln 8}$ — the five interior logarithms cancel pairwise, leaving $\\tfrac{\\ln 9}{\\ln 3}$.',
      'Now, read the survivor: $\\tfrac{\\ln 9}{\\ln 3} = \\log_{3} 9 = 2$ — and the engine’s direct product of the six factors returns $2.0000000000$ to ten places.',
      'Set the comparison up: $\\log_{17} 25$ looks unapproachable, but $25 = 5^{2}$, so halving the base doubles the log — $\\log_{17} 25 = \\log_{\\sqrt{17}} 5$, with $\\sqrt{17} \\approx 4.1231$.',
      'Now, the base-order craft of 9.3: at the SAME argument $5 > 1$, the bigger base logs SMALLER — and $\\sqrt{17} > 3$ — so $\\log_{3} 5 > \\log_{\\sqrt{17}} 5 = \\log_{17} 25$; the engine prices them at $1.4649735$ against $1.1361219$.',
      'Hence the chain telescopes to $2$ and the comparison lands without any table — the two crafts of 9.3, cancellation and ordering, each audited by engine values.',
    ] },
    { kind: 'example', title: 'The series recap: the two constants side by side — $e$ by partials and $\\ln 2$ by the fast series', steps: [
      'Set the first up: $e = 1 + 1 + \\tfrac{1}{2!} + \\tfrac{1}{3!} + \\cdots$, and the partials climb — the first four terms give $2.6666667$, the first eleven give $2.7182818$.',
      'So, the gap: $e = 2.718281828459045\\ldots$ stands about $2.7 \\times 10^{-8}$ above the eleven-term partial — the tail the series has not yet paid, shrinking by a factorial at every term.',
      'Now, the second constant: the fast series at $x = \\tfrac{1}{3}$ — the terms $\\tfrac{2}{3}, \\tfrac{2}{81}, \\tfrac{2}{1215}, \\tfrac{2}{15309}, \\tfrac{2}{177147}$ sum to $0.6931460$ in five terms.',
      'Check, the honesty: the true $\\ln 2 = 0.6931472$ — the miss is $0.0000011$: five decimal places exact, the sixth off by one unit, a millionth-order error.',
      'Hence $e = 2.7182818$ and $\\ln 2 = 0.6931472$ — the two constants the unit computed, standing side by side as the family portrait’s twin terminals; the convergence proofs behind them are chapter 10’s first stop, and this review says so honestly.',
    ] },
    { kind: 'example', title: 'The tables recap: the two-part split on $4728$ and the antilog round trip', steps: [
      'Set the split up: $4728 = 4.728 \\times 10^{3}$ — significant digits $4728$, four integer seats, so the characteristic is $3$.',
      'So, the mantissa: $\\log 4.728 = 0.6746775$, so $\\log 4728 = 3.6746775 = 3 + 0.6747$ — the two-part memory of 9.6, the mantissa remembering digits, the characteristic seating the number.',
      'Now, the round trip: $\\operatorname{antilog}(2.6747)$ — the mantissa $0.6747$ reads the digits back (antilog $0.6747 = 4.7282$, so the digits are $4728$), and the characteristic $2$ places three of them left of the point.',
      'So, the answer: $\\operatorname{antilog}(2.6747) = 472.8$ — the engine’s exact value is $472.82$, the four-place craft honest to the last digit it carries, and $\\log 472.82$ returns $2.6747$ within a half-unit of the fourth place.',
      'Hence the split and the round trip close — the machine and its undo, cashed as table craft; the same mantissa rules this review’s L1 and L4 items ($0.0004728$ sits at bar $4$ with the SAME $0.6747$), and the invariance prices the quiz’s fourth question.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The monotonicity certificate', text: 'Strict monotonicity is the unit’s one load-bearing theorem, and it certifies in both directions. Rising against falling: a strictly rising side and a strictly falling side cross AT MOST ONCE, so an exhibited root is THE root — the certificate behind $\\log_{2}(x+2) = 4-x$ at $x = 2$ and behind the L5 bench item at $x \\approx 3.0963$. And one-one: a strictly monotone machine never repeats a value, so its undo exists — the certificate behind the logarithm itself, and behind every law that reads "the exponent that builds $y$" without ambiguity. Stated here as the unit’s theorem because every "unique solution" item in the hall is this certificate wearing a costume: prove the shape, exhibit the root, and the two-line argument is complete.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the bar is not a minus on the whole number', text: 'The bar notation $\\bar{4}.6747$ means $-4 + 0.6747 = -3.3253$, NOT $-4.6747$: the bar rides the characteristic alone so that the mantissa stays POSITIVE — the whole reason the notation exists. The trap prices itself twice in the bench below (the L1 characteristic item and the L4 antilog item), and misreading either costs the whole question, not half of it. The engines checked every bar-form value on this page before it was fixed.' },
    { kind: 'figure', caption: 'The family portrait, reviewed: one subway line, six stations, two constants. The stations run in teaching order — 9.1 the family (role: one-one machine, witness $2^{\\sqrt{2}} = 2.6651$), 9.2 the inverse (undo, $\\log_{2\\sqrt{2}} 128 = \\tfrac{14}{3}$), 9.3 the laws (the telescoping chain $= 2$), 9.4 the equations (craft, the court root $0.3027756$), 9.5 the series (compute, $e = 2.7182818$), 9.6 the tables (apply, $\\log 4728 = 3.6747$). The line’s twin terminals are the two constants the unit computed — $\\ln 2 = 0.6931472$ and $e = 2.7182818$ — and the arrowhead beyond the last terminal points on: chapter 10 is the next stop.', svg: familyPortrait9RSvg() },
    { kind: 'para', text: 'Read the portrait as the wiring diagram it is: every station stands on the one before it — the inverse exists because the machine is one-one, the laws are safe because the inverse is unambiguous, the equations are solvable because the laws can combine, the series exist because the family is continuous enough to converge (said honestly, with the proofs deferred), and the tables are buildable because the series compute. The two terminals are not stations but CONSTANTS: $\\ln 2 = 0.6931472$ and $e = 2.7182818$, the two numbers the unit’s engine produced that no algebra ever could.' },
    { kind: 'callout', tone: 'insight', title: 'How the witnesses interlock', text: 'The master table’s six witnesses are not six problems — they are the chapter wearing six costumes. The squeeze of $2^{\\sqrt{2}}$ (9.1) and the definition pair behind $\\tfrac{14}{3}$ (9.2) are the SAME monotonicity, once forward and once backward; the telescoping chain (9.3) is the change of base run along that pair six times; the extraneous-root court (9.4) is the range law of 9.1 auditing candidates the algebra grew; $e = 2.7182818$ (9.5) is the squeeze’s cousin, a limit where 9.1 had a bracket; and $\\log 4728 = 3.6747$ (9.6) is 9.5’s $\\mu$ bridge cashed into currency. The mixed bench prices exactly these interlocks — and a miss on a mixed item names its home lesson by the shape it wore.' },

    // ================================================== mixed bench
    { kind: 'heading', text: 'The Mixed Bench' },
    { kind: 'para', text: 'The mixed bench is the exam-shaped drill that closes the unit: seventeen fresh questions across the six levels, every one a NEW witness (nothing lifted from the lessons’ own sets), every one crossing at least one lesson boundary, every one with a full steps solution and an engine-verified answer. Three of them carry solution figures where the diagram genuinely earns its place — the telescoping cancellation, the five-step antilog method, and the uniqueness crossing. The diagnosis rule runs throughout: attempt the bench WITHOUT looking back, then let every miss name its home lesson by its shape — a misread domain sends you to 9.4, a broken telescoping to 9.3, a botched characteristic to 9.6, a slow series choice to 9.5, a base misread to 9.1 or 9.2.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the honest coverage audit', text: 'The banked JEE (Main) 2026 unit list prices logarithms inside its opening algebra toolkit and along the sequence-and-series and calculus bands rather than as a standalone unit — the honest reading is that this chapter’s topics ride those neighbourhoods, with the classic depth (Hall & Knight’s logarithm arc, the Cengage module’s own registers) priced exactly there, behind the functions, equations and series items the syllabus does carry. The registers the six lessons drilled, re-priced by this bench: 9.1 base-and-index conversions and decay flips; 9.2 definition-pair reads; 9.3 telescoping, change-of-base and comparison items; 9.4 same-base, hidden-quadratic and unique-root items with the domain audit; 9.5 series-speed choices and small-$x$ estimates; 9.6 characteristic, mantissa, antilog and digit-count items. The items below are exam-style — our own constructions on those registers, honestly labelled; nothing is quoted from a real paper, and every number was generated and verified by this review’s own engines before a word of the prose was fixed.' },
    { kind: 'exercises', title: 'Exercises 9.R — the mixed bench', sets: [
      { level: 'L1', questions: [
        { q: '(i) Evaluate $\\log_{4} 32$. (ii) Evaluate $\\log_{9} 243$. (iii) Name the craft that produced both answers without any table.', solution: [
          'Set up, the definition pair of 9.2: $\\log_{a} y$ asks which exponent builds $y$ out of $a$ — so write base and argument as powers of one primitive first.',
          'So, (i): $4 = 2^{2}$ and $32 = 2^{5}$, hence $\\log_{4} 32 = \\log_{2^{2}} 2^{5} = \\tfrac{5}{2}$ — and the check is exact: $4^{5/2} = 2^{5} = 32$.',
          'Now, (ii): $9 = 3^{2}$ and $243 = 3^{5}$, hence $\\log_{9} 243 = \\tfrac{5}{2}$ — again exact: $9^{5/2} = 3^{5} = 243$.',
          'Hence both equal $\\tfrac{5}{2}$, by the common-base craft — rewriting both sides as powers of one primitive before reading the exponent; the engine re-verified both to twelve places.',
        ], answer: 'log₄ 32 = 5/2 and log₉ 243 = 5/2 — the common-base craft (no tables anywhere)' },
        { q: 'State the domain of $f(x) = \\log_{2}(x^{2} - 16)$, and justify it in one sentence.', solution: [
          'Set up, the domain discipline of 9.2: the logarithm exists only where its argument is strictly positive.',
          'So, the rider: $x^{2} - 16 > 0$, that is $(x - 4)(x + 4) > 0$.',
          'Now, read the sign: the product is positive exactly where both factors share a sign — $x > 4$ or $x < -4$.',
          'Hence the domain is $|x| > 4$, the outside of the closed interval $[-4, 4]$ — the argument dies at $\\pm 4$ itself, where it reads zero; the engine checks the signs at $\\pm 3.9$, $\\pm 4$ and $\\pm 4.1$.',
        ], answer: 'the domain is |x| > 4, i.e. (−∞, −4) ∪ (4, ∞) — x² − 16 must stay strictly positive' },
        { q: 'Write down the characteristic and the mantissa of $\\log 0.0004728$.', solution: [
          'Set up, the two-part split of 9.6: $0.0004728 = 4.728 \\times 10^{-4}$ — significant digits $4728$, seated four places below the units seat.',
          'So, the mantissa depends only on the digits: $\\log 4.728 = 0.6747$ — the same mantissa this review audited on $4728$ itself (the invariance law at work).',
          'Now, the characteristic: four places below the units seat means characteristic $-4$, written $\\bar{4}$ (bar four).',
          'Hence $\\log 0.0004728 = \\bar{4}.6747$, that is $0.6747 - 4 = -3.3253$ — engine-checked to the last digit shown; the bar exists precisely to keep the mantissa positive while the characteristic carries the sign.',
        ], answer: 'characteristic bar 4 (−4), mantissa 0.6747; log 0.0004728 = 4̄.6747 = −3.3253' },
      ] },
      { level: 'L2', questions: [
        { q: 'Show that $\\log_{10} 2 + \\log_{10} 5 = 1$, and name the law that cashed it.', solution: [
          'Set up, the product law of 9.3: $\\log_{a}(mn) = \\log_{a} m + \\log_{a} n$.',
          'So, apply it: $\\log 2 + \\log 5 = \\log(2 \\times 5) = \\log 10 = 1$ — the definition pair at sight, since $10^{1} = 10$.',
          'Check: the engine confirms the sum to fifteen places; no table was touched.',
          'Hence the sum is exactly $1$ — the product law’s cleanest cash, because the two factors happen to rebuild the base itself; it is also the identity behind every $\\log 5 = 1 - \\log 2$ shortcut the unit used.',
        ], answer: 'log 2 + log 5 = log 10 = 1 — the product law of 9.3, cashed at sight' },
        { q: 'Solve $5^{x+1} = 25^{2-x}$.', solution: [
          'Set up, the same-base discipline of 9.1 and 9.4: convert both sides to one base, then equate the exponents.',
          'So, convert: $25 = 5^{2}$, so the right side reads $5^{2(2-x)} = 5^{4-2x}$.',
          'Now, equate exponents (licensed by strict monotonicity): $x + 1 = 4 - 2x$, so $3x = 3$.',
          'Check: at $x = 1$ both sides read $25$ — the engine’s substitution confirms it exactly.',
          'Hence $x = 1$ — a one-line craft the hall prices every year in exactly this costume.',
        ], answer: 'x = 1 (5^{x+1} = 5^{4−2x} ⟹ 3x = 3)' },
        { q: 'For $e^{x}$ at $x = 0.2$: (i) write the first three partial sums of the series; (ii) compare them with the engine value of $e^{0.2}$.', solution: [
          'Set up, the exponential series of 9.5: $e^{x} = 1 + x + \\tfrac{x^{2}}{2!} + \\tfrac{x^{3}}{3!} + \\cdots$.',
          'So, the partials at $x = 0.2$: one term gives $1$; two terms give $1 + 0.2 = 1.2$; three terms give $1.2 + 0.02 = 1.22$, since $\\tfrac{0.2^{2}}{2} = 0.02$.',
          'Now, the engine value: $e^{0.2} = 1.2214$ to four places — the third partial already holds the first two decimals and misses the third by $0.0014$.',
          'Hence the partials read $1,\\; 1.2,\\; 1.22$ against the truth $1.2214$: the series pays for itself fast exactly when $x$ is small — which is why the fast series of 9.5 ran at $x = \\tfrac{1}{3}$ and never at $x = 1$.',
        ], answer: 'partials 1, 1.2, 1.22; e^{0.2} = 1.2214 (engine) — the third partial holds two decimals' },
      ] },
      { level: 'L3', questions: [
        { q: 'Evaluate the chain $(\\log_{4} 5)(\\log_{5} 6)(\\log_{6} 7)$, and reconcile the answer with the change of base.', solution: [
          'Set up, the telescoping craft of 9.3: each factor converts by the change of base $\\log_{b} c = \\tfrac{\\ln c}{\\ln b}$, so the interior arguments cancel against the next bases.',
          'So, convert and cancel: the product is $\\tfrac{\\ln 5}{\\ln 4} \\cdot \\tfrac{\\ln 6}{\\ln 5} \\cdot \\tfrac{\\ln 7}{\\ln 6} = \\tfrac{\\ln 7}{\\ln 4}$ — the shared $5$ and the shared $6$ vanish; the figure below draws the cancellation.',
          'Now, read the survivor: $\\tfrac{\\ln 7}{\\ln 4} = \\log_{4} 7 = 1.403677$ to six places.',
          'Check: the engine multiplies the three factors directly and lands on the same value — the cancellation is exact algebra, never an approximation.',
          'Hence the chain equals $\\log_{4} 7 \\approx 1.403677$: the outer base $4$ and the last argument $7$ survive, the two interior numbers cancel — the six-factor version of this review’s audit bench reads $2$ the same way.',
        ], answer: '(log₄ 5)(log₅ 6)(log₆ 7) = log₄ 7 = 1.403677', figures: [
          { caption: 'The telescoping cancellation on $(\\log_{4} 5)(\\log_{5} 6)(\\log_{6} 7)$: the shared $5$ and shared $6$ cancel between the boxes, the outer base $4$ and last argument $7$ survive, and the product is $\\log_{4} 7 = 1.403677$.', svg: telescoping9RSvg() },
        ] },
        { q: 'Solve $\\log_{3}(x+6) - \\log_{3}(x-2) = 2$.', solution: [
          'Set up, the quotient law of 9.3: the left side combines to $\\log_{3} \\tfrac{x+6}{x-2}$.',
          'So, the definition pair converts: $\\tfrac{x+6}{x-2} = 3^{2} = 9$.',
          'Now, solve the linear form: $x + 6 = 9(x - 2)$, so $x + 6 = 9x - 18$, hence $8x = 24$ and $x = 3$.',
          'Check, the riders: at $x = 3$ both arguments are positive ($9 > 0$ and $1 > 0$), so the domain discipline of 9.4 passes — and the equation itself reads $\\log_{3} 9 - \\log_{3} 1 = 2 - 0 = 2$, exact.',
          'Hence $x = 3$ — the substitution check and the domain audit both close; no candidate was refused here, but the audit ran anyway, because that is the discipline.',
        ], answer: 'x = 3 (both riders pass: log₃ 9 − log₃ 1 = 2 − 0 = 2)' },
        { q: 'Given $\\log 2 = 0.3010$ and $\\log 3 = 0.4771$, compute $\\log 6$ — then reconcile the four-place arithmetic with the engine value.', solution: [
          'Set up, the product law with the given entries: $\\log 6 = \\log(2 \\times 3) = \\log 2 + \\log 3$.',
          'So, add the entries: $0.3010 + 0.4771 = 0.7781$ — the four-place craft answer.',
          'Now, the engine value: the true $\\log 6 = 0.7781513$, which rounds to $0.7782$ at four places — the carried truncation of the two entries ($0.30103$ cut to $0.3010$, $0.47712$ cut to $0.4771$) accounts for the half-unit gap.',
          'Hence the craft answer is $\\log 6 \\approx 0.7781$, honest to within one unit in the fourth place of the true $0.7781513$ — the exact honesty note 9.6 attached to four-place tables, priced here at the bench.',
        ], answer: 'log 6 = 0.3010 + 0.4771 = 0.7781 (four-place craft); true value 0.7781513, which rounds to 0.7782' },
      ] },
      { level: 'L4', questions: [
        { q: 'How many digits has $2^{50}$? Use the four-place entry $\\log 2 = 0.3010$, then audit against the engine.', solution: [
          'Set up, the digit-count law of 9.6: $\\operatorname{digits}(N) = \\lfloor \\log N \\rfloor + 1$.',
          'So, with the entry: $\\log 2^{50} = 50 \\times 0.3010 = 15.05$, so the digits are $\\lfloor 15.05 \\rfloor + 1 = 15 + 1 = 16$.',
          'Now, the audit: the engine multiplies out — $2^{50} = 1125899906842624$ — and counts exactly sixteen digits.',
          'Check the exact route too: $\\lfloor 50 \\log 2 \\rfloor + 1 = \\lfloor 15.0515 \\rfloor + 1 = 16$ — the four-place entry and the seven-place truth agree because the fractional part sits far from the floor boundary.',
          'Hence $2^{50}$ has $16$ digits — the law decided it in one multiplication, and the engine’s exact count stood behind it; the digit-count bench is the cheapest power the unit owns.',
        ], answer: '16 digits — 50 × 0.3010 = 15.05, floor + 1; engine: 2⁵⁰ = 1125899906842624, counted' },
        { q: 'Find $x$ if $\\log x = \\bar{1}.3296$ — the five-step method on the negative characteristic.', solution: [
          'Set up by reading the bar form: $\\bar{1}.3296 = -1 + 0.3296$ — characteristic $-1$ (bar one), mantissa $0.3296$ kept positive.',
          'So, the mantissa in the antilog table: row $32$, column $9$ reads $2133$ — that is $\\operatorname{antilog} 0.329 = 2.1330$.',
          'Now, the mean difference of the fourth digit $6$ adds $3$: $2133 + 3 = 2136$ — the significant digits of $x$ are $2136$.',
          'The characteristic places the point: bar one means $\\times 10^{-1}$, so $x = 2.136 \\times 10^{-1} = 0.2136$.',
          'Check, the round trip: $\\log 0.2136 = -1 + 0.3296 = \\bar{1}.3296$ — the mantissa returns $0.3296$ to four places, engine-verified; the five stations are drawn in the figure below.',
          'Hence $x = 0.2136$ — bar one, digits $2136$, point placed one seat right of the decimal: the five-step method with the negative characteristic handled by the bar.',
        ], answer: 'x = antilog 1̄.3296 = 0.2136 (digits 2136; bar 1 means ×10⁻¹)', figures: [
          { caption: 'The five-step method on $\\operatorname{antilog}\\ \\bar{1}.3296$: the bar form read, the mantissa tabled (row $32$, column $9$: $2133$), the mean difference added ($2133 + 3 = 2136$), the point placed by bar one, and the round-trip check closed.', svg: antilogSteps9RSvg() },
        ] },
        { q: 'Solve $2^{2x} - 6\\cdot 2^{x} + 8 = 0$.', solution: [
          'Set up, the hidden quadratic of 9.4: substitute $t = 2^{x} > 0$.',
          'So, the quadratic: $t^{2} - 6t + 8 = 0 = (t - 2)(t - 4)$, so $t = 2$ or $t = 4$.',
          'Now, return to $x$: $2^{x} = 2$ gives $x = 1$; $2^{x} = 4 = 2^{2}$ gives $x = 2$ — both $t$-roots are positive, so nothing is refused.',
          'Check: at $x = 1$, $4 - 12 + 8 = 0$; at $x = 2$, $16 - 24 + 8 = 0$ — and the engine sweep of $[0, 3]$ finds exactly two sign changes, so these are all the roots.',
          'Hence $x \\in \\{1, 2\\}$ — the mirror case of the audit bench’s $3^{2x} - 8\\cdot 3^{x} - 9 = 0$, where one candidate WAS refused: here both survive because both $t$-roots stay positive.',
        ], answer: 'x ∈ {1, 2} (t = 2 and t = 4, both positive — nothing refused)' },
      ] },
      { level: 'L5', questions: [
        { q: 'Which is larger: $\\log_{7} 11$ or $\\log_{11} 17$? Prove it by craft, then price it by engine.', solution: [
          'Set up by subtracting the common floor: both logs exceed $1$ (each argument beats its base), so $\\log_{7} 11 = 1 + \\log_{7} \\tfrac{11}{7}$ and $\\log_{11} 17 = 1 + \\log_{11} \\tfrac{17}{11}$ — compare the remainders.',
          'So, the first move (same base $7$, monotone): $\\tfrac{11}{7} > \\tfrac{17}{11}$ because $11 \\times 11 > 17 \\times 7$ (that is, $121 > 119$), and both fractions exceed $1$, hence $\\log_{7} \\tfrac{11}{7} > \\log_{7} \\tfrac{17}{11}$.',
          'Now, the second move (same argument $\\tfrac{17}{11} > 1$, base order): the smaller base $7$ logs BIGGER, so $\\log_{7} \\tfrac{17}{11} > \\log_{11} \\tfrac{17}{11}$.',
          'Chain them: $\\log_{7} \\tfrac{11}{7} > \\log_{11} \\tfrac{17}{11}$, and adding $1$ to each side returns $\\log_{7} 11 > \\log_{11} 17$.',
          'Check, the engine: $\\log_{7} 11 = 1.2323$ and $\\log_{11} 17 = 1.1815$ to four places — the craft’s verdict confirmed, with the gap $0.0408$ the size of the two monotonicity moves combined.',
          'Hence $\\log_{7} 11 > \\log_{11} 17$: two monotonicity moves and one integer comparison, no table touched — the engine only auditing, which is the review’s division of labour.',
        ], answer: 'log₇ 11 > log₁₁ 17 (1.2323 > 1.1815, engine) — proved by 121 > 119 plus two monotonicity moves' },
        { q: 'Estimate $\\ln 1.03$ by the first two terms of the logarithmic series, and state the error the engine finds.', solution: [
          'Set up, the logarithmic series of 9.5: $\\ln(1 + x) = x - \\tfrac{x^{2}}{2} + \\tfrac{x^{3}}{3} - \\cdots$, honest for $|x| < 1$ and fast exactly when $x$ is small.',
          'So, the two terms at $x = 0.03$: $0.03 - \\tfrac{0.03^{2}}{2} = 0.03 - 0.00045 = 0.02955$.',
          'Now, the engine: $\\ln 1.03 = 0.0295588$ to seven places — the two-term partial misses by $0.0000088$, under one unit in the fifth decimal.',
          'Hence $\\ln 1.03 \\approx 0.02955$: the small-$x$ regime is where the plain logarithmic series earns its keep — the fast series exists for the big arguments, and 9.5 said exactly that.',
        ], answer: 'ln 1.03 ≈ 0.03 − 0.00045 = 0.02955; engine 0.0295588 (error 8.8 × 10⁻⁶)' },
        { q: 'Show that $\\log_{3}(x+5) = 5 - x$ has exactly one root, and locate it to three places.', solution: [
          'Set up, the monotonicity certificate of 9.4: the left side $\\log_{3}(x+5)$ strictly INCREASES on its domain $x > -5$ (base $3 > 1$), while the right side $5 - x$ strictly DECREASES.',
          'So, at most one crossing: a rising curve and a falling line cross at most once — equivalently, the difference $f(x) = \\log_{3}(x+5) + x - 5$ is strictly increasing (both parts rise), so $f$ has at most one zero.',
          'Now, existence: $f(0) = \\log_{3} 5 - 5 \\approx 1.4650 - 5 < 0$ and $f(5) = \\log_{3} 10 \\approx 2.0959 > 0$ — a sign change on $(0, 5)$, so exactly one root lives there.',
          'So, bracket and bisect: $f(3) = \\log_{3} 8 - 2 \\approx -0.1072 < 0$ and $f(3.2) \\approx +0.1153 > 0$ — the engine’s bisection on $[3, 3.2]$ with tolerance $5 \\times 10^{-4}$ pins the root at $x \\approx 3.0963$; the crossing and the bracket are drawn below.',
          'Hence exactly one root, $x \\approx 3.0963$ — uniqueness by monotonicity (no algebra anywhere), location by bracketed bisection: the two-part craft every mixed equation of the unit demanded.',
        ], answer: 'exactly one root, x ≈ 3.0963 (engine bisection on [3, 3.2], tolerance 5 × 10⁻⁴; uniqueness by monotonicity)', figures: [
          { caption: 'The unique crossing of $\\log_{3}(x+5)$ (rising, teal) with $5 - x$ (falling, orange) at $x \\approx 3.0963$: the engine’s bracket $[3.0, 3.2]$ is marked under the axis, one crossing inside it.', svg: uniquenessCross9RSvg() },
        ] },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove: for every positive integer $N$, the number of digits of $N$ (base ten) is $\\lfloor \\log_{10} N \\rfloor + 1$. Then run the law on $2^{100}$.', solution: [
          'Set up from the characteristic rules of 9.6: a number with $k+1$ digits is exactly a number in $[10^{k}, 10^{k+1})$.',
          'So, suppose $N$ has $k+1$ digits with $k \\geq 0$: then $10^{k} \\leq N < 10^{k+1}$, and taking logarithms (monotone, so the inequalities survive) gives $k \\leq \\log N < k + 1$.',
          'Now, read the floor: that double inequality says precisely $\\lfloor \\log N \\rfloor = k$, so $\\lfloor \\log N \\rfloor + 1 = k + 1$ — the digit count, and the law is proved.',
          'Run it on $2^{100}$: $\\log 2^{100} = 100 \\times 0.3010300 = 30.10300$, so $\\lfloor 30.103 \\rfloor + 1 = 31$ digits.',
          'Check, the engine: $2^{100} = 1267650600228229401496703205376$ — a thirty-one-digit integer, counted exactly as the law claims; the engine also ran the law on $10^{k}$ for $k = 0, \\ldots, 5$ and it held at every seat.',
          'Hence $\\operatorname{digits}(N) = \\lfloor \\log_{10} N \\rfloor + 1$ for every positive integer $N$, and $2^{100}$ has $31$ digits — the theorem this review’s audit chain priced on $3^{40}$ and the bench prices again on the biggest power of two it owns.',
        ], answer: 'proved: 10^k ≤ N < 10^{k+1} ⟹ k ≤ log N < k+1 ⟹ floor(log N) = k; 2¹⁰⁰ = 1267650600228229401496703205376 — 31 digits' },
        { q: 'The capstone, in one paragraph: name the single property that every step of the chapter cashed, and price it on the two witnesses — the unique root of $\\log_{2}(x+2) = 4 - x$, and the digit count of $2^{64}$.', solution: [
          'Set up the claim: the property is STRICT MONOTONICITY — 9.1 proved $a^{x}$ strictly monotone (increasing for $a > 1$, decreasing for $0 < a < 1$), and everything the chapter built afterwards cashed that one fact.',
          'So, trace the cashings: monotone implies ONE-ONE, so the inverse exists — that is 9.2’s logarithm; one-one-ness makes the LAWS of 9.3 safe to derive, each law reading the definition pair on a unique exponent; the rising-versus-falling shape gives 9.4 its uniqueness certificate; the squeeze of 9.1 and every ordering of 9.3 ride the comparison law; and the series of 9.5 converge to values the tables of 9.6 then price — the tables work only because $a^{x}$ never repeats a value.',
          'Now, witness one: $\\log_{2}(x+2) = 4 - x$ — the left side rises (base $2 > 1$), the right side falls, so AT MOST one root; and $x = 2$ exhibits it ($\\log_{2} 4 = 2 = 4 - 2$), so exactly one — uniqueness is monotonicity wearing its equation costume.',
          'Now, witness two: the digits of $2^{64}$ — the digit law needs $\\log 2^{64} = 64 \\times 0.3010300 = 19.2659$, whose floor $19$ seats the leading digit in the $10^{19}$ place: $\\lfloor 19.2659 \\rfloor + 1 = 20$ digits, and the engine counts $2^{64} = 18446744073709551616$ — twenty digits exactly.',
          'Hence one property — strict monotonicity — priced twice: it certified the unique root $x = 2$ without solving anything, and it counted the digits of $2^{64}$ without writing the integer out. The whole chapter is one machine, and this is the machine’s single gear.',
        ], answer: 'strict monotonicity — it makes aˣ one-one (so the log exists), licenses the laws, certifies unique crossings (x = 2) and prices the digit law (2⁶⁴: 64 × 0.3010300 = 19.2659 → 20 digits)' },
      ] },
    ] },

    // ================================================== quiz
    { kind: 'quiz', title: 'Check yourself — the unit in five questions', items: [
      { q: 'The value of $\\log_{2\\sqrt{2}} 128$ is', options: ['$\\tfrac{14}{3}$', '$\\tfrac{7}{2}$', '$3$', '$\\tfrac{16}{3}$'], answer: 0, explain: 'The engineered base reads $2\\sqrt{2} = 2^{3/2}$, and $\\left(2^{3/2}\\right)^{14/3} = 2^{(3/2)\\cdot(14/3)} = 2^{7} = 128$, so the exponent asked for is $\\tfrac{14}{3}$ — Option A, the definition pair run at 9.2 speed and re-priced by this review’s audit bench. Option B’s $\\tfrac{7}{2}$ is the value of $\\log_{4} 128$ — the trap reads the base as $4$; in truth $(2\\sqrt{2})^{7/2} = 2^{5.25} \\approx 38.05$, nowhere near $128$. Option C’s $3$ forgets the base exceeds $3$: $(2\\sqrt{2})^{3} = 2^{4.5} \\approx 22.6$. Option D’s $\\tfrac{16}{3}$ overshoots by a full power of two — an exponent of $\\tfrac{16}{3}$ builds $2^{8} = 256$, not $128$.' },
      { q: 'The equation $3^{2x} - 8\\cdot 3^{x} - 9 = 0$ has', options: ['two real roots', 'exactly one real root', 'no real root', 'a root at $x = 0$'], answer: 1, explain: 'Substituting $t = 3^{x} > 0$ gives the hidden quadratic $t^{2} - 8t - 9 = (t - 9)(t + 1) = 0$, so $t = 9$ (hence $x = \\log_{3} 9 = 2$) or $t = -1$ — and $t = -1$ is REFUSED, because $3^{x} > 0$ for every real $x$: the exponential’s range law vetoes the candidate before it ever reaches $x$. So Option B is right, and it is the audit bench’s second Illustration in miniature. Option A counts the refused candidate as a root — the hidden quadratic has two $t$-roots, but only one survives the positivity audit. Option C is refuted by the working check $3^{4} - 8\\cdot 3^{2} - 9 = 81 - 72 - 9 = 0$ at $x = 2$. Option D fails at sight: $3^{0} - 8 - 9 = -16 \\neq 0$.' },
      { q: 'Five terms of the fast series at $x = \\tfrac{1}{3}$ pin $\\ln 2$ as $0.6931460$ against the true $0.6931472$ — a miss of $0.0000011$, of order one millionth. The accuracy achieved is', options: ['1 place', '3 places', '6 places', 'no places'], answer: 2, explain: 'The five-term partial and the truth agree through five decimal places with the sixth off by a single unit — the miss is $0.0000011$, of order $10^{-6}$ — so six-place, millionth-order accuracy is the honest claim among the four: Option C. Option A’s one place grotesquely understates the engine’s finding: even the first three places are exact ($0.693$ matches $0.693$). Option B’s three places is the same understatement one seat later: the fourth and fifth places are exact too ($0.69314$ matches $0.69314$). Option D’s "no places" is refuted by the floor comparison the engine ran literally — $\\lfloor 0.6931460 \\times 10^{5} \\rfloor = \\lfloor 0.6931472 \\times 10^{5} \\rfloor = 69314$ — five places agree exactly.' },
      { q: 'The mantissa of $\\log 4728$ equals the mantissa of $\\log$', options: ['$4.782$', '$0.4278$', '$47.28$', 'none of these'], answer: 2, explain: 'The invariance law of 9.6: the mantissa depends only on the SEQUENCE of significant digits, and $47.28$ carries exactly the digits $4, 7, 2, 8$ in order — so $\\log 47.28 = \\log 4728 - 2 = 1.6747$, the same mantissa $0.6747$ with only the characteristic changed (Option C), and the engine checks the subtraction to fifteen places. Option A’s $4.782$ TRANSPOSES the digits to $4, 7, 8, 2$: its mantissa is $0.6796$, not $0.6747$. Option B’s $0.4278$ scrambles them to $4, 2, 7, 8$: the mantissa of $\\log 0.4278$ is $0.6312$ (at bar one), not $0.6747$ — the invariance reads digit sequences, not digit multisets, and a rearrangement is a different number entirely. Option D fails because Option C works.' },
      { q: 'The number of digits in $2^{64}$ is', options: ['18', '19', '20', '21'], answer: 2, explain: 'The digit-count law: $64 \\times \\log 2 = 19.2659$, so $\\lfloor 19.2659 \\rfloor + 1 = 20$ — and the engine’s exact count on $2^{64} = 18446744073709551616$ returns twenty digits (Option C). Option B’s $19$ is the floor-without-the-plus-one trap: $\\lfloor 19.2659 \\rfloor = 19$ counts only the seats the number FILLS, not the leading digit that sits in the $10^{19}$ seat. Option A’s $18$ misreads the scientific form $1.8446 \\times 10^{19}$: the $10^{19}$ seat means the leading digit occupies the twentieth place from the right, so the count is $19 + 1$, not one less. Option D’s $21$ over-corrects by rounding $19.2659$ UP to $20$ before adding one — the floor is a floor, and the fractional part never rounds.' },
    ] },

    // ================================================== doorstep
    { kind: 'heading', text: 'The Doorstep' },
    { kind: 'para', text: 'What the chapter built, against what it opened. It built the family: a machine $a^{x}$ for every real index, its undo, the undo’s algebra, the equations both spawn, the series that computed $e$ and $\\ln 2$ (and $\\log 3 = 0.4771213$ through the $\\mu$ bridge), and the tables the series made buildable. What it OPENED — and said so in the open — is deeper: the convergence proofs. The nested brackets of 9.1, the limit that defines $e$, and the fast series’ millionth-order error in 9.5 were each used honestly and left unproved, because their proofs wait behind the completeness of the real numbers — chapter 10’s first stop, the door this unit stands on. The family’s calculus life begins there too: the exponential’s rate and the logarithm’s area are machines the next shelf owns, named here and never taught.' },
    { kind: 'para', text: 'The book’s own arc now runs to its last chapter: chapter 10, "The Synthesis and the Doorstep", gathers everything — the polynomial algebra of the middle chapters and the transcendental family of this one — into the competition craft, and the doorstep beyond it is where the calculus begins. Use this review as the diagnosis instrument it was built to be: run the mixed bench cold, score it honestly, and let each miss route you — the recap below is the routing table, one line per lesson with its witness.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) 9.1, the family: $a^{x}$ for every real index — squeeze the irrational rung ($2^{\\sqrt{2}} = 2.6651$); same-base equations; the flip on decay bases;',
      '(ii) 9.2, the inverse: the definition pair and the two identities ($\\log_{2\\sqrt{2}} 128 = \\tfrac{14}{3}$ at sight); the domain discipline; the sign law;',
      '(iii) 9.3, the laws: product, quotient, power; the change of base and the reciprocal; the telescoping chain $= 2$; the ordering crafts ($\\log_{3} 5 > \\log_{17} 25$, engine $1.4649735 > 1.1361219$);',
      '(iv) 9.4, the equations: same-base and hidden quadratics ($3^{2x} - 8\\cdot 3^{x} - 9 = 0$, root $x = 2$, one candidate refused); the domain rider ($x = 0.3027756$ admitted, mirror refused); the monotonicity certificate;',
      '(v) 9.5, the series: $e^{x}$ and its partials ($2.6666667 \\to 2.7182818$); the fast series at $\\tfrac{1}{3}$ ($0.6931460$ against the true $0.6931472$); the $\\mu$ bridge ($\\log 3 = 0.4771213$);',
      '(vi) 9.6, the tables: the two-part split ($\\log 4728 = 3 + 0.6747$); the mantissa invariance; the antilog round trips ($472.82$); the digit-count law ($\\lfloor \\log N \\rfloor + 1$ — twenty digits for $3^{40}$, thirty-one for $2^{100}$).',
    ] },
    { kind: 'para', text: 'The room is walked, the bench is run, and the engines went green before a word of it was fixed. Chapter 9 closes as chapter 8 did — not with a new machine but with the machines arranged: one table, six one-move re-derivations, five cross-lesson audits, seventeen bench items and five quiz questions, every number re-computed and every lesson boundary crossed on purpose. When chapter 10 asks for the convergence proofs these lessons deferred, you will know exactly which promises are outstanding — and when it asks the family for its rates, you already own the functions. The doorstep is the next stop on the line; this page was the handover.' },
  ],
}


export const chapter09: Chapter = {
  number: 9,
  slug: 'exponentials-and-logarithms',
  title: 'Exponentials and Logarithms',
  summary:
    'The first great non-polynomial family inside algebra. The exponent laws AL banked on integer and rational indices are extended to every real index — the exponential function aˣ as a machine with a constant percent climb, its shape family, and the growth stories it prices. The logarithm is then defined once and for all as the inverse machine — chapter 1’s theory cashing its first big cheque: domain and range swap, log_a(aˣ) = x, and every log law DERIVED from the exponent law it mirrors instead of memorized. Change of base, the common and natural logarithms, and the chapter closes on equations: same-base discipline, exponent equations that hide quadratics, log equations with their domain discipline enforced (extraneous roots caught, not mourned), and the growth and decay problems that make the family famous.',
  status: 'complete',
  lessons: [lesson91, lesson92, lesson93, lesson94, lesson95, lesson96, lesson9R],
  plannedLessons: [],
}
