import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — chapter 10 "The Synthesis and the Doorstep"
 * (OPENED by the RUN 122 WHOLE-CHAPTER SWARM, which the platform's
 * subagent-deadline wall cut short with the chapter NOT closed — its landed
 * work PRESERVED in docs/research/aa-ch10-wip/ — and CLOSED COMPLETE by the
 * RUN 123 RESUMPTION SWARM, per the owner's 2026-11-25 directive "finish
 * advanced algebra book first": 10.3 and 10.4 were delivered whole by run
 * 122 (203/203 and 213/213 green); run 123 restored the preservation,
 * re-ran the 117/117 pre-flight pin checker, FINISHED 10.1 (the exercises
 * block, the quiz-key fix, the qquad strip — 119/119 green, 6,020 words),
 * AUTHORED 10.2 whole from its spec (78 engine + 33 pin = 111/111 green,
 * 6,108 words) and COMPLETED the 10.R review prose + pin section
 * (235 engine + 32 pin = 267/267 green, 5,062 words); the orchestrator
 * assembled, gated and shipped the closed chapter AND the closed book).
 *
 * PROVENANCE: ground = the sanctioned internet fallback web-ground
 * (`cengage-jee-style` presentation contract, `jee-main-2026-syllabus`
 * arc) + Hall & Knight's *Higher Algebra* (`hall-knight-higher-algebra`,
 * banked run 66) for the competition-craft and functional-equation depth
 * stretches. STUDY-NEVER-REPRODUCE absolute: every roster, witness,
 * figure, Illustration, quiz item and exercise below is OUR OWN,
 * engine-pinned in scripts/verify-book4-ch10.ts (which re-runs all five
 * verify-first harnesses against THIS file and closes with the
 * closed-chapter + closed-BOOK census).
 */
// ------------------------------------------------------------------
// lesson 10.1 — run 122 (preserved) + run 123 (finished): the
// exercises block, the quiz-key fix and the qquad strip landed here
// ------------------------------------------------------------------
/* ================================================================== */
/* AA 10.1 — Competition Algebra: the Advanced Craft                   */
/* Every number printed in this lesson is recomputed and pinned by     */
/* temporary-references/v-aa101.ts (engine wins over any other source).*/
/* Figure helpers: all geometry is computed from the named constants   */
/* below; SVG text stays PLAIN (no TeX, no $, U+2212 for minus).       */
/* ================================================================== */

/* palette (vivid set; never blue/indigo) */
const c101 = {
  struct: '#16a34a', // structure strokes/axes/boxes
  ink: '#166534', // primary text
  mid: '#65a30d', // mid text/formulas
  teal: '#0d9488', // teal strokes
  tealInk: '#0f766e', // teal ink
  conn: '#d97706', // connectors/ticks
  accent: '#ea580c', // accent/arrows/highlights
  warn: '#dc2626', // warning
  panelA: '#ffedd5', // tinted panel
  panelB: '#fef3c7', // tinted panel
  faint: '#5eead4', // faint grids/dots
  white: '#ffffff',
}
const f101 = 'ui-sans-serif, system-ui, sans-serif'

function in101Txt(x: number, y: number, s: string, size: number, color: string, anchor = 'middle', weight = '400'): string {
  return `<text x="${x}" y="${y}" font-family="${f101}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
}
function in101ArrowDef(): string {
  return `<defs><marker id="aa101Arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c101.conn}"/></marker></defs>`
}

/* (a) the substitution map: the t-machine collapsing the quartic into two families */
function in101SubMapSvg(): string {
  const W = 780, H = 272, M = 16
  const L = { x: M, y: 70, w: 198, h: 128 }
  const Md = { x: 254, y: 70, w: 188, h: 128 }
  const rw = 288
  const R1 = { x: W - M - rw, y: 46, w: rw, h: 62 }
  const R2 = { x: W - M - rw, y: 160, w: rw, h: 62 }
  const midY = L.y + L.h / 2
  const box = (b: { x: number; y: number; w: number; h: number }, fill: string, stroke: string) =>
    `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`
  const arr = (x1: number, y1: number, x2: number, y2: number) =>
    `<path d="M ${x1} ${y1} L ${x2} ${y2}" stroke="${c101.conn}" stroke-width="1.7" marker-end="url(#aa101Arrow)" fill="none"/>`
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Substitution map: the t machine collapses the quartic into two quadratic families, giving four roots.">`,
    in101ArrowDef(),
    box(L, c101.panelA, c101.struct),
    box(Md, c101.panelB, c101.teal),
    box(R1, '#fffdf5', c101.accent),
    box(R2, '#fffdf5', c101.accent),
    in101Txt(L.x + L.w / 2, L.y + 26, 'the quartic in x', 12.5, c101.mid),
    in101Txt(L.x + L.w / 2, L.y + 58, '(x² − 5x + 5)²', 14.5, c101.ink, 'middle', '600'),
    in101Txt(L.x + L.w / 2, L.y + 82, '− 7(x² − 5x + 5) + 12 = 0', 14, c101.ink, 'middle', '600'),
    in101Txt(L.x + L.w / 2, L.y + 112, 'one equation, degree 4', 11.5, c101.mid),
    in101Txt(Md.x + Md.w / 2, Md.y + 24, 'the t-machine', 12.5, c101.mid),
    in101Txt(Md.x + Md.w / 2, Md.y + 50, 't = x² − 5x + 5', 13.5, c101.tealInk, 'middle', '600'),
    in101Txt(Md.x + Md.w / 2, Md.y + 74, 't² − 7t + 12 = 0', 14, c101.ink, 'middle', '600'),
    in101Txt(Md.x + Md.w / 2, Md.y + 96, '(t − 3)(t − 4) = 0', 13.5, c101.ink),
    in101Txt(Md.x + Md.w / 2, Md.y + 118, 't = 3  or  t = 4', 13, c101.accent, 'middle', '600'),
    in101Txt(R1.x + 14, R1.y + 26, 't = 3 → x² − 5x + 2 = 0', 13.5, c101.ink, 'start', '600'),
    in101Txt(R1.x + 14, R1.y + 50, 'x = (5 ± √17)/2', 14, c101.accent, 'start', '600'),
    in101Txt(R2.x + 14, R2.y + 26, 't = 4 → x² − 5x + 1 = 0', 13.5, c101.ink, 'start', '600'),
    in101Txt(R2.x + 14, R2.y + 50, 'x = (5 ± √21)/2', 14, c101.accent, 'start', '600'),
    arr(L.x + L.w + 4, midY, Md.x - 4, midY),
    in101Txt((L.x + L.w + Md.x) / 2, midY - 9, 'substitute t', 11.5, c101.mid),
    arr(Md.x + Md.w + 4, R1.y + R1.h / 2, R1.x - 4, R1.y + R1.h / 2),
    arr(Md.x + Md.w + 4, R2.y + R2.h / 2, R2.x - 4, R2.y + R2.h / 2),
    in101Txt((Md.x + Md.w + R1.x) / 2, R1.y + R1.h / 2 - 9, 'back-solve', 11.5, c101.mid),
    in101Txt(W / 2, H - 10, 'four roots, two families', 12, c101.mid),
    `</svg>`,
  ].join('')
}

/* (b) the x + 1/x ladder: each rung born from the two below it */
function in101LadderSvg(): string {
  const W = 640, H = 288
  const rungs = [3, 7, 18, 47, 123]
  const scale = 300 / 123
  const x0 = 150, barH = 24, top = 52, dy = 46
  const y = (i: number) => top + i * dy
  const w = (v: number) => 46 + v * scale
  const nodeX = 484
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The ladder of symmetric sums: each rung s(k+1) is born from the two rungs below it by the recurrence.">`,
    in101ArrowDef(),
    in101Txt(20, 28, 'x + 1/x = 3', 13.5, c101.mid, 'start', '600'),
    in101Txt(nodeX + 60, 28, 's(k+1) = 3·s(k) − s(k−1)', 12.5, c101.conn, 'middle', '600'),
  ]
  rungs.forEach((v, i) => {
    out.push(`<rect x="${x0}" y="${y(i)}" width="${(w(v)).toFixed(1)}" height="${barH}" rx="5" fill="${c101.teal}" stroke="${c101.tealInk}" stroke-width="1.2"/>`)
    out.push(in101Txt(x0 - 12, y(i) + 17, `s${i + 1} = ${v}`, 14, c101.ink, 'end', '600'))
    out.push(in101Txt(x0 + w(v) + 12, y(i) + 17, `${v}`, 13, c101.tealInk, 'start'))
  })
  for (let k = 1; k <= 3; k++) {
    const srcA = { x: x0 + w(rungs[k - 1]) + 6, y: y(k - 1) + barH / 2 }
    const srcB = { x: x0 + w(rungs[k]) + 6, y: y(k) + barH / 2 }
    const tgt = { x: x0 - 8, y: y(k + 1) + barH / 2 }
    out.push(`<path d="M ${srcA.x.toFixed(1)} ${srcA.y} H ${nodeX} V ${tgt.y}" stroke="${c101.conn}" stroke-width="1.4" fill="none"/>`)
    out.push(`<path d="M ${srcB.x.toFixed(1)} ${srcB.y} H ${nodeX}" stroke="${c101.conn}" stroke-width="1.4" fill="none"/>`)
    out.push(`<circle cx="${nodeX}" cy="${tgt.y}" r="3.2" fill="${c101.accent}"/>`)
    out.push(`<path d="M ${nodeX} ${tgt.y} H ${tgt.x}" stroke="${c101.conn}" stroke-width="1.4" marker-end="url(#aa101Arrow)" fill="none"/>`)
  }
  out.push(in101Txt(W / 2, H - 10, 'two rungs below are all a new rung ever needs', 12, c101.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (c) the AM–GM boundary: x(6−x) under its 9-ceiling with the equality point */
function in101AmgmSvg(): string {
  const W = 640, H = 304
  const ox = 66, oy = 254
  const xmax = 6.4, ymax = 10.4
  const pxPerX = (640 - ox - 26) / xmax
  const pyPerY = (oy - 44) / ymax
  const X = (x: number) => ox + x * pxPerX
  const Y = (y: number) => oy - y * pyPerY
  let pts = ''
  for (let x = 0; x <= 6.001; x += 0.05) pts += `${X(x).toFixed(1)},${Y(x * (6 - x)).toFixed(1)} `
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The parabola y = x(6 − x) sits under the dashed ceiling y = 9 and touches it only at the equality point x = 3.">`,
    `<rect x="${X(0)}" y="${Y(9)}" width="${(X(6) - X(0)).toFixed(1)}" height="${(oy - Y(9)).toFixed(1)}" fill="${c101.panelB}" opacity="0.55"/>`,
  ]
  for (let gx = 1; gx <= 6; gx++) out.push(`<line x1="${X(gx).toFixed(1)}" y1="${Y(9.9).toFixed(1)}" x2="${X(gx).toFixed(1)}" y2="${oy}" stroke="${c101.faint}" stroke-width="1" opacity="0.4"/>`)
  for (const gy of [3, 6, 9]) out.push(`<line x1="${X(0)}" y1="${Y(gy).toFixed(1)}" x2="${X(6).toFixed(1)}" y2="${Y(gy).toFixed(1)}" stroke="${c101.faint}" stroke-width="1" opacity="0.4"/>`)
  out.push(`<line x1="${ox - 10}" y1="${oy}" x2="${X(6) + 14}" y2="${oy}" stroke="${c101.struct}" stroke-width="1.6"/>`)
  out.push(`<line x1="${ox}" y1="${oy}" x2="${ox}" y2="${Y(ymax) - 6}" stroke="${c101.struct}" stroke-width="1.6"/>`)
  for (let t = 0; t <= 6; t++) {
    out.push(`<line x1="${X(t).toFixed(1)}" y1="${oy}" x2="${X(t).toFixed(1)}" y2="${oy + 5}" stroke="${c101.conn}" stroke-width="1.3"/>`)
    out.push(in101Txt(X(t), oy + 20, `${t}`, 11.5, c101.mid))
  }
  for (const ty of [3, 6, 9]) {
    out.push(`<line x1="${ox - 5}" y1="${Y(ty).toFixed(1)}" x2="${ox}" y2="${Y(ty).toFixed(1)}" stroke="${c101.conn}" stroke-width="1.3"/>`)
    out.push(in101Txt(ox - 12, Y(ty) + 4, `${ty}`, 11.5, c101.mid, 'end'))
  }
  out.push(`<polyline points="${pts.trim()}" fill="none" stroke="${c101.accent}" stroke-width="2.4"/>`)
  out.push(`<line x1="${X(0)}" y1="${Y(9).toFixed(1)}" x2="${X(6).toFixed(1)}" y2="${Y(9).toFixed(1)}" stroke="${c101.teal}" stroke-width="1.8" stroke-dasharray="7 5"/>`)
  out.push(`<circle cx="${X(3).toFixed(1)}" cy="${Y(9).toFixed(1)}" r="5.5" fill="${c101.accent}" stroke="${c101.white}" stroke-width="1.4"/>`)
  out.push(in101Txt(X(5.05), Y(5.05) - 12, 'y = x(6 − x)', 13.5, c101.accent, 'start', '600'))
  out.push(in101Txt(X(0.35), Y(9) - 9, 'ceiling y = 9', 12.5, c101.tealInk, 'start'))
  out.push(in101Txt(X(3) - 12, Y(9) + 22, 'equality at x = 3, y = 9', 12.5, c101.ink, 'end', '600'))
  out.push(in101Txt(X(6) + 14, oy + 4, 'x', 13, c101.ink))
  out.push(in101Txt(ox - 14, Y(9.6), 'y', 13, c101.ink))
  out.push(in101Txt(W / 2, H - 8, 'the ceiling is touched once — and only once', 12, c101.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (d) the log-ordering chain as a decreasing staircase */
function in101LogStairSvg(): string {
  const W = 640, H = 272
  const vals = [1.5849625, 1.2618595, 1.1609640, 1.1132828, 1.0860331]
  const show = ['1.5850', '1.2619', '1.1610', '1.1133', '1.0860']
  const names = ['log2 3', 'log3 4', 'log4 5', 'log5 6', 'log6 7']
  const base = 212, bw = 76, gap = 22, x0 = 60, hScale = 116
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="A decreasing staircase of logarithms: log base n of n plus one falls strictly from 1.5850 down to 1.0860.">`,
    in101Txt(60, 28, 'add 1 to base and argument — the value still falls', 12.5, c101.mid, 'start', '600'),
  ]
  const tops: string[] = []
  vals.forEach((v, i) => {
    const x = x0 + i * (bw + gap)
    const h = v * hScale
    const yTop = base - h
    out.push(`<rect x="${x}" y="${yTop.toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="6" fill="${c101.teal}" stroke="${c101.tealInk}" stroke-width="1.2"/>`)
    out.push(in101Txt(x + bw / 2, yTop - 8, show[i], 12.5, c101.ink, 'middle', '600'))
    out.push(in101Txt(x + bw / 2, base + 20, names[i], 12.5, c101.mid))
    tops.push(`${(x + bw / 2).toFixed(1)},${yTop.toFixed(1)}`)
    out.push(`<circle cx="${(x + bw / 2).toFixed(1)}" cy="${yTop.toFixed(1)}" r="3" fill="${c101.accent}"/>`)
  })
  out.push(`<polyline points="${tops.join(' ')}" fill="none" stroke="${c101.accent}" stroke-width="1.8" stroke-dasharray="6 4"/>`)
  out.push(`<line x1="${x0 - 14}" y1="${base}" x2="${x0 + 5 * bw + 4 * gap + 14}" y2="${base}" stroke="${c101.struct}" stroke-width="1.6"/>`)
  out.push(in101Txt(W / 2, H - 10, 'strictly decreasing: 1.5850 → 1.2619 → 1.1610 → 1.1133 → 1.0860', 12, c101.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* solution figure S1: the four roots of exercise 1 on one number line */
function in101Ex1Svg(): string {
  const W = 640, H = 152, y0 = 86
  const xa = 44, xb = 596, lo = -0.25, hi = 3.45
  const px = (x: number) => xa + ((x - lo) / (hi - lo)) * (xb - xa)
  const rootsT3 = [0, 3], rootsT2 = [(3 - Math.sqrt(5)) / 2, (3 + Math.sqrt(5)) / 2]
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Number line: the t equals 3 branch gives roots 0 and 3, the t equals 2 branch gives the surd pair near 0.382 and 2.618.">`,
    in101Txt(44, 26, '● t = 3 branch → x = 0, 3', 12.5, c101.accent, 'start', '600'),
    in101Txt(44, 46, '● t = 2 branch → x = (3 ± √5)/2', 12.5, c101.tealInk, 'start', '600'),
    `<line x1="${xa}" y1="${y0}" x2="${xb + 10}" y2="${y0}" stroke="${c101.struct}" stroke-width="1.6"/>`,
    `<path d="M ${xb + 10} ${y0} l -8 -4 l 0 8 z" fill="${c101.struct}"/>`,
  ]
  for (const t of [0, 1, 2, 3]) {
    out.push(`<line x1="${px(t).toFixed(1)}" y1="${y0}" x2="${px(t).toFixed(1)}" y2="${y0 + 6}" stroke="${c101.conn}" stroke-width="1.3"/>`)
    out.push(in101Txt(px(t), y0 + 22, `${t}`, 11.5, c101.mid))
  }
  for (const r of rootsT3) out.push(`<circle cx="${px(r).toFixed(1)}" cy="${y0}" r="5.5" fill="${c101.accent}" stroke="${c101.white}" stroke-width="1.3"/>`)
  for (const r of rootsT2) {
    out.push(`<circle cx="${px(r).toFixed(1)}" cy="${y0}" r="5.5" fill="${c101.teal}" stroke="${c101.white}" stroke-width="1.3"/>`)
    out.push(`<line x1="${px(r).toFixed(1)}" y1="${y0 + 6}" x2="${px(r).toFixed(1)}" y2="${y0 + 30}" stroke="${c101.teal}" stroke-width="1.2"/>`)
  }
  out.push(in101Txt(px(rootsT2[0]) + 6, y0 + 44, '(3 − √5)/2 ≈ 0.382', 11.5, c101.tealInk, 'start', '600'))
  out.push(in101Txt(px(rootsT2[1]) + 6, y0 + 44, '(3 + √5)/2 ≈ 2.618', 11.5, c101.tealInk, 'start', '600'))
  out.push(`</svg>`)
  return out.join('')
}

/* solution figure S2: the ladder at seed 5 (exercise 8) */
function in101Ex8Svg(): string {
  const W = 640, H = 288
  const rungs = [5, 23, 110, 527, 2525]
  const x0 = 150, barH = 24, top = 52, dy = 46, nodeX = 484
  const w = (v: number) => 60 + 260 * (Math.log10(v) / Math.log10(2525))
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ladder at seed 5: rungs 5, 23, 110, 527, 2525, each born from the two below by multiplying by five and subtracting the rung two below.">`,
    in101ArrowDef(),
    in101Txt(20, 28, 'x + 1/x = 5', 13.5, c101.mid, 'start', '600'),
    in101Txt(nodeX + 64, 28, 's(k+1) = 5·s(k) − s(k−1)', 12.5, c101.conn, 'middle', '600'),
  ]
  rungs.forEach((v, i) => {
    out.push(`<rect x="${x0}" y="${top + i * dy}" width="${w(v).toFixed(1)}" height="${barH}" rx="5" fill="${c101.teal}" stroke="${c101.tealInk}" stroke-width="1.2"/>`)
    out.push(in101Txt(x0 - 12, top + i * dy + 17, `s${i + 1} = ${v}`, 14, c101.ink, 'end', '600'))
    out.push(in101Txt(x0 + w(v) + 12, top + i * dy + 17, `${v}`, 13, c101.tealInk, 'start'))
  })
  for (let k = 1; k <= 3; k++) {
    const tgtY = top + (k + 1) * dy + barH / 2
    out.push(`<path d="M ${(x0 + w(rungs[k - 1]) + 6).toFixed(1)} ${top + (k - 1) * dy + barH / 2} H ${nodeX} V ${tgtY}" stroke="${c101.conn}" stroke-width="1.4" fill="none"/>`)
    out.push(`<path d="M ${(x0 + w(rungs[k]) + 6).toFixed(1)} ${top + k * dy + barH / 2} H ${nodeX}" stroke="${c101.conn}" stroke-width="1.4" fill="none"/>`)
    out.push(`<circle cx="${nodeX}" cy="${tgtY}" r="3.2" fill="${c101.accent}"/>`)
    out.push(`<path d="M ${nodeX} ${tgtY} H ${x0 - 8}" stroke="${c101.conn}" stroke-width="1.4" marker-end="url(#aa101Arrow)" fill="none"/>`)
  }
  out.push(in101Txt(W / 2, H - 10, 'bar length on a log scale — the rung still doubles the read', 12, c101.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* solution figure S3: the log duel 5^40 vs 4^50 (exercise 13) */
function in101Ex13Svg(): string {
  const W = 640, H = 288, base = 222
  const bars = [
    { x: 190, w: 108, v: 64.3775165, top: '64.3775', lab: 'ln(5^40) = 40 ln 5', col: c101.conn },
    { x: 372, w: 108, v: 69.3147181, top: '69.3147', lab: 'ln(4^50) = 50 ln 4', col: c101.teal },
  ]
  const hScale = 1.92
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Two bars comparing 40 ln 5 against 50 ln 4: the taller bar for 50 ln 4 certifies that 4^50 beats 5^40.">`,
    in101Txt(320, 30, 'the taller log wins the duel', 13, c101.mid, 'middle', '600'),
  ]
  for (const b of bars) {
    const h = b.v * hScale
    out.push(`<rect x="${b.x}" y="${(base - h).toFixed(1)}" width="${b.w}" height="${h.toFixed(1)}" rx="6" fill="${b.col}" stroke="${c101.tealInk}" stroke-width="1.2"/>`)
    out.push(in101Txt(b.x + b.w / 2, base - h - 9, b.top, 13, c101.ink, 'middle', '600'))
    out.push(in101Txt(b.x + b.w / 2, base + 22, b.lab, 12.5, c101.mid))
  }
  out.push(`<line x1="${bars[0].x + bars[0].w}" y1="${(base - bars[0].v * hScale).toFixed(1)}" x2="${bars[1].x}" y2="${(base - bars[1].v * hScale).toFixed(1)}" stroke="${c101.accent}" stroke-width="1.6" stroke-dasharray="5 4"/>`)
  out.push(`<line x1="150" y1="${base}" x2="530" y2="${base}" stroke="${c101.struct}" stroke-width="1.6"/>`)
  out.push(in101Txt(320, H - 34, 'integer check: (4^5)^10 = 1024^10 beats (5^4)^10 = 625^10', 12.5, c101.tealInk, 'middle', '600'))
  out.push(in101Txt(320, H - 12, 'same tenth-power read, no logarithm needed at all', 12, c101.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* solution figure S4: the mixed-craft chain (exercise 16) */
function in101Ex16Svg(): string {
  const W = 640, H = 196
  const boxes = [
    { x: 22, w: 182, y: 52, h: 106, fill: c101.panelA, stroke: c101.struct, head: 'family one — AM–GM', lines: ['x + 9/x ≥ 2√9 = 6', 'witness x = 3', 'so m = 6'] },
    { x: 230, w: 182, y: 52, h: 106, fill: c101.panelB, stroke: c101.teal, head: 'family two — Vieta', lines: ['t² − 6t + 9 = (t − 3)²', 'sum 6, product 9', 'double root 3'] },
    { x: 438, w: 182, y: 52, h: 106, fill: '#fffdf5', stroke: c101.accent, head: 'family three — census', lines: ['(t + 3)⁴ coefficients', '1, 12, 54, 108, 81', 'sum 256, peak 108'] },
  ]
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The mixed craft chain: AM-GM prices m equals 6, Vieta certifies the double root 3, and the census of (t plus 3) to the fourth reads sum 256 and peak 108.">`,
    in101ArrowDef(),
    in101Txt(W / 2, 28, 'one problem, three families, the number 3 everywhere', 13, c101.tealInk, 'middle', '600'),
  ]
  boxes.forEach((b) => {
    out.push(`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="9" fill="${b.fill}" stroke="${b.stroke}" stroke-width="1.6"/>`)
    out.push(in101Txt(b.x + b.w / 2, b.y + 22, b.head, 12.5, c101.mid, 'middle', '600'))
    b.lines.forEach((ln, i) => out.push(in101Txt(b.x + b.w / 2, b.y + 48 + i * 20, ln, 12.5, c101.ink)))
  })
  out.push(`<path d="M 204 105 L 228 105" stroke="${c101.conn}" stroke-width="1.7" marker-end="url(#aa101Arrow)" fill="none"/>`)
  out.push(`<path d="M 412 105 L 436 105" stroke="${c101.conn}" stroke-width="1.7" marker-end="url(#aa101Arrow)" fill="none"/>`)
  out.push(in101Txt(W / 2, H - 10, 'the census constant 81 = 3⁴ echoes the double root 3', 12, c101.mid))
  out.push(`</svg>`)
  return out.join('')
}

export const lesson101: Lesson = {
  id: 'aa-competition-algebra-the-advanced-craft',
  number: '10.1',
  title: 'Competition Algebra: the Advanced Craft',
  concepts: [
    'nested substitution',
    'the ladder recurrence',
    'the symmetric read',
    'AM–GM under constraints',
    'the telescoping split',
    'the general term',
    'the digit-count read',
  ],
  objectives: [
    'Run nested quadratic substitutions beyond the single $t$-swap, down to four roots in two families.',
    'Read symmetric functions of the roots by Vieta without ever solving for the roots.',
    'Price AM–GM maxima and minima under constraints and always name the equality witness.',
    'Telescope reciprocal series and factorial-shifted sums into closed forms.',
    'Hunt binomial terms — specific coefficients, greatest terms, independent terms — and read digit counts and log duels off monotonicity.',
  ],
  prerequisites: [
    'al-competition-algebra-identities-and-substitutions',
    'aa-symmetric-reads-and-common-roots',
    'aa-the-arithmetic-geometric-mean-inequality',
    'aa-special-series-and-the-method-of-differences',
    'aa-binomial-coefficients-at-work',
    'aa-the-laws-of-logarithms-and-the-change-of-base',
  ],
  sources: ['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'cengage-m1-01'],
  blocks: [
    { kind: 'para', text: 'Lesson AL 11.2 — \`al-competition-algebra-identities-and-substitutions\` — banked five craft moves on the identity bank: the $t$-substitution, the $x + \\frac{1}{x}$ ladder, the symmetric read, the AM–GM bound, and the telescoping split, with binomial counting and logarithm speed reads riding along. Nothing in this lesson replaces that bank. What chapter 10 does is re-weld those same five moves onto the five machine families this book has built: the quadratic machines of chapter 2, the AM–GM inequality machinery of chapter 4, the series engines of chapter 5, the binomial coefficient atlas of chapter 7, and the logarithm laws of chapter 9.' },
    { kind: 'para', text: 'The sequel\'s question is deliberately narrow: what do the *same* moves do on the *new* machines? Not new moves — deeper moves. The single $t$-swap becomes a nested substitution feeding two quadratic families. The ladder climbs further rungs than AL 11.2 ever asked for. The symmetric read stops at two roots and starts pricing third and fourth powers through Newton\'s identities. AM–GM stops being a standalone bound and starts carrying a discipline about the boundary — a maximum claim without an equality witness is not a solution. And the telescoping split meets series that AL 11.2\'s difference method could not price.' },
    { kind: 'para', text: 'A craft lesson is depth over novelty. Every Illustration below is our own, every number in it is engine-verified to at least six decimal places, and every exercise is a fresh witness — the constants are not recycled from earlier lessons. Where a banked lesson already proved the underlying tool (the AM–GM inequality in \`aa-the-arithmetic-geometric-mean-inequality\`, the method of differences in \`aa-special-series-and-the-method-of-differences\`, the change-of-base law in \`aa-the-laws-of-logarithms-and-the-change-of-base\`), we cite it by id and move on.' },
    { kind: 'callout', tone: 'insight', title: 'Note — how to read a craft lesson', text: 'Work each Illustration with pen and paper before reading its steps; the steps are the Cengage presentation chain — one move per line, led by a natural connective. The engine pins every printed number: if your hand disagrees with a decimal here, redo the arithmetic, because the decimals have been recomputed by brute force.' },

    /* ---------------- Section 1: the substitution game at depth ---------------- */
    { kind: 'heading', text: 'The Substitution Game at Depth' },
    { kind: 'para', text: 'AL 11.2 played the substitution game at one level: a polynomial in $x$ was recognised as a polynomial in $t = x^2 - 5x + 5$ (or a cousin), the $t$-equation was solved, and each $t$-value was pushed back through one quadratic. The advanced game runs the same machine but respects its full output: one quartic equation can and should deliver **four** roots arranged in **two** families, and the craft is to report them as families rather than as a loose list. Half the errors in exam scripts come from stopping at two roots and never back-substituting the second $t$-value.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — nested substitution', text: 'A substitution is said to be *nested* if the new variable $t$ is itself a non-linear function of the old variable $x$, so that solving in $t$ requires a further solve in $x$. Formally: an equation $F(x) = 0$ is solved by nested substitution when $F(x) = G\\big(h(x)\\big)$ with $\\deg h \\ge 2$, and the solution set is $\\bigcup_{t_0 \\in Z(G)} \\{ x : h(x) = t_0 \\}$, where $Z(G)$ is the root set of $G$. Thus, $F(x) = 0$ splits into as many quadratic families as $G$ has real roots, and the family count multiplies the degree: a quartic through a quadratic $h$ carries up to four roots.' },
    { kind: 'para', text: 'For example,' },
    { kind: 'list', marker: 'roman', items: [
      'if $G(t) = t^2 - 7t + 12$ and $h(x) = x^2 - 5x + 5$, then $Z(G) = \\{3, 4\\}$ and the quartic $F(x) = 0$ splits into $x^2 - 5x + 2 = 0$ and $x^2 - 5x + 1 = 0$;',
      'if the inner quadratic $h$ itself arises from a square, the nesting can go three deep — an equation in $\\big(x + \\frac{1}{x}\\big)^2 + \\big(x + \\frac{1}{x}\\big)$ is a two-stage nest with the ladder of this section at its heart;',
      'if $G$ has a repeated root, the two families merge — $t = 3$ twice still means one family $h(x) = 3$, and the quartic has at most two distinct roots.',
    ] },
    { kind: 'example', title: 'Illustration 1 — Solve $(x^2 - 5x + 5)^2 - 7(x^2 - 5x + 5) + 12 = 0$.', steps: [
      'Split: put $t = x^2 - 5x + 5$; the equation reads $t^2 - 7t + 12 = 0$, a quadratic in $t$ with coefficient discipline intact.',
      'Factor: $t^2 - 7t + 12 = (t - 3)(t - 4)$, so $t = 3$ or $t = 4$ — the discriminant is $49 - 48 = 1$, a perfect square, and the machine will not leak complex roots at this stage.',
      'Take $t = 3$: back-substitute into $x^2 - 5x + 5 = 3$, i.e. $x^2 - 5x + 2 = 0$, whose discriminant is $25 - 8 = 17$; hence $x = \\frac{5 \\pm \\sqrt{17}}{2}$.',
      'Take $t = 4$: the family is $x^2 - 5x + 1 = 0$ with discriminant $25 - 4 = 21$; hence $x = \\frac{5 \\pm \\sqrt{21}}{2}$.',
      'Check: numerically the four roots are $4.5615528$, $0.4384472$, $4.7912878$, $0.2087122$ (engine-pinned to seven places), and each one substituted back into the original equation gives a residual below $10^{-6}$.',
      'Now, the Vieta cross-check: the expanded quartic is $x^4 - 10x^3 + 28x^2 - 15x + 2$, so the roots must sum to $10$ and multiply to $2$; indeed $4.5615528 + 0.4384472 + 4.7912878 + 0.2087122 = 10$ and the product is $2$ — the cross-family read certifies the family split.',
      'Hence $x \\in \\left\\{ \\frac{5 + \\sqrt{17}}{2},\\ \\frac{5 - \\sqrt{17}}{2},\\ \\frac{5 + \\sqrt{21}}{2},\\ \\frac{5 - \\sqrt{21}}{2} \\right\\}$, four roots in two families.',
    ] },
    { kind: 'figure', caption: 'Figure 1 — the substitution map: the t-machine collapses the quartic into two quadratic families, each contributing two roots.', svg: in101SubMapSvg() },
    { kind: 'para', text: 'The Vieta cross-check in Illustration 1 deserves its own sentence of craft. The family split produces four numbers; the expanded quartic produces two clean certificates (sum $10$, product $2$) that those four numbers are the *complete* root set. Whenever an exam-style question says "solve", the sum-and-product read is the cheapest possible audit: it costs two additions and one multiplication, and it catches the classic failure of dropping the second $t$-branch — a two-root answer sums to the wrong total immediately.' },
    { kind: 'para', text: 'The same machine drives the ladder. If $x + \\frac{1}{x} = 3$, then squaring gives $x^2 + \\frac{1}{x^2} = 7$, and there is a recurrence that climbs the whole staircase without ever solving for $x$:' },
    { kind: 'equation', latex: 'x^{k+1} + \\frac{1}{x^{k+1}} = \\left( x + \\frac{1}{x} \\right) \\left( x^k + \\frac{1}{x^k} \\right) - \\left( x^{k-1} + \\frac{1}{x^{k-1}} \\right) \\tag{1}' },
    { kind: 'para', text: 'The law behind equation (1): pair $x^{k+1} = x \\cdot x^k$ with $x^{-(k+1)} = x^{-1} \\cdot x^{-k}$ to build $(x + \\frac{1}{x})(x^k + \\frac{1}{x^k})$, then correct the cross terms $x^{k-1} + x^{-(k-1)}$, which appear once each and must be subtracted. With $s_0 = 2$ and $s_1 = 3$ the engine sweep runs: $s_2 = 7$, $s_3 = 18$, $s_4 = 47$, $s_5 = 123$, and then keeps going exactly as the recurrence promises: $s_6 = 322$, $s_7 = 843$, $s_8 = 2207$, $s_9 = 5778$.' },
    { kind: 'example', title: 'Illustration 2 — Climb the ladder $x + \\frac{1}{x} = 3$ from $s_2$ to $s_9$ and verify it numerically.', steps: [
      'Split: the seed read gives $s_0 = 2$ (every $x$ and its reciprocal cancel) and $s_1 = 3$ (given).',
      'Take $k = 1$: $s_2 = 3 \\cdot 3 - 2 = 7$ — and squaring $x + \\frac{1}{x} = 3$ gives $9 - 2 = 7$, the first independent confirmation.',
      'Take $k = 2$: $s_3 = 3 \\cdot 7 - 3 = 18$; Newton\'s read agrees: $s_3 = 3^3 - 3 \\cdot 3 = 27 - 9 = 18$. So,',
      'Take $k = 3$ and $k = 4$: $s_4 = 3 \\cdot 18 - 7 = 47$ and $s_5 = 3 \\cdot 47 - 18 = 123$, the rungs AL 11.2 stopped at.',
      'Now, keep climbing: $s_6 = 3 \\cdot 123 - 47 = 322$, $s_7 = 3 \\cdot 322 - 123 = 843$, $s_8 = 3 \\cdot 843 - 322 = 2207$, $s_9 = 3 \\cdot 2207 - 843 = 5778$ — the engine recomputes every one by brute recurrence and by direct powers.',
      'Check: the ladder\'s two roots are $\\frac{3 + \\sqrt{5}}{2} = 2.6180340$ and $\\frac{3 - \\sqrt{5}}{2} = 0.3819660$, reciprocals of each other; $x^k + x^{-k}$ evaluated at both agrees with $s_k$ for every $k$ from $0$ to $9$ to within $10^{-6}$.',
      'Hence the ladder is a genuine engine: nine rungs from two seeds and one multiplication-subtraction law, with $s_9 = 5778$ the highest rung this lesson needs.',
    ] },
    { kind: 'figure', caption: 'Figure 2 — the ladder at seed 3: each rung is born from the two rungs below it, so two seeds plus one law reach any height.', svg: in101LadderSvg() },
    { kind: 'callout', tone: 'insight', title: 'Note — why the recurrence is trustworthy', text: 'Equation (1) is an identity in $x$, so it holds for *both* roots of $x^2 - 3x + 1 = 0$ simultaneously. That is why the ladder never needs to know which root you are carrying: $s_k = x^k + x^{-k}$ is symmetric, and the two roots of the seed quadratic share the same ladder. The engine checks the sweep numerically at both roots and finds the same nine integers.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the classic wrong recurrence', text: 'A persistent exam slip writes $s_{k+1} = s_k^2 - 2$ for every step. That law is true only for **even** climbs: $s_2 = s_1^2 - 2$ and $s_4 = s_2^2 - 2$ are correct, but $s_3 = s_2^2 - 2 = 47$ is false — the true value is $18$. Squaring skips a rung; the ladder law $s_{k+1} = 3 s_k - s_{k-1}$ never does.' },

    /* ---------------- Section 2: symmetric reads via the roots ---------------- */
    { kind: 'heading', text: 'Symmetric Reads via the Roots' },
    { kind: 'para', text: 'The symmetric read is the craft of pricing $\\alpha^3 + \\beta^3$, $\\alpha^4 + \\beta^4$, $\\frac{1}{\\alpha} + \\frac{1}{\\beta}$ — anything symmetric in the roots — from the coefficients alone. Chapter 2\'s quadratic machine and the banked lesson \`aa-symmetric-reads-and-common-roots\` established the two-run ladder $\\alpha + \\beta$ and $\\alpha\\beta$; the advanced craft runs it to higher powers and adds the cubic staple with three roots. The rule of the game: never solve for the roots. Every read below is computed from two numbers, and the roots appear only at the end, numerically, as an audit.' },
    { kind: 'equation', latex: '\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta, \\quad \\alpha^3 + \\beta^3 = (\\alpha + \\beta)^3 - 3\\alpha\\beta(\\alpha + \\beta) \\tag{2}' },
    { kind: 'equation', latex: '\\alpha^4 + \\beta^4 = \\left( \\alpha^2 + \\beta^2 \\right)^2 - 2(\\alpha\\beta)^2, \\quad \\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta} \\tag{3}' },
    { kind: 'example', title: 'Illustration 3 — For $\\alpha, \\beta$ the roots of $x^2 - 7x + 11 = 0$, price $\\alpha^2+\\beta^2$, $\\alpha^3+\\beta^3$, $\\alpha^4+\\beta^4$, $(\\alpha-\\beta)^2$, and $\\frac{1}{\\alpha}+\\frac{1}{\\beta}$ without solving.', steps: [
      'Split: Vieta reads the coefficients directly — $\\alpha + \\beta = 7$ and $\\alpha\\beta = 11$; the discriminant is $49 - 44 = 5$, positive, so both roots are real and distinct.',
      'Take the square: $\\alpha^2 + \\beta^2 = 7^2 - 2 \\cdot 11 = 49 - 22 = 27$.',
      'Now, the cube: $\\alpha^3 + \\beta^3 = 7^3 - 3 \\cdot 11 \\cdot 7 = 343 - 231 = 112$ — the correction term $3\\alpha\\beta(\\alpha+\\beta)$ is the whole game.',
      'And the fourth power: $\\alpha^4 + \\beta^4 = 27^2 - 2 \\cdot 11^2 = 729 - 242 = 487$, climbing on the square rung rather than restarting.',
      'But the difference is not symmetric in sign: $(\\alpha - \\beta)^2 = (\\alpha+\\beta)^2 - 4\\alpha\\beta = 49 - 44 = 5$, so $|\\alpha - \\beta| = \\sqrt{5}$.',
      'So, reciprocals fold into the same two seeds: $\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{7}{11}$.',
      'Check: numerically $\\alpha = 4.6180340$ and $\\beta = 2.3819660$ (engine-pinned; these are $\\frac{7 \\pm \\sqrt{5}}{2}$). Direct computation gives $\\alpha^2+\\beta^2 = 27.0000000$, $\\alpha^3+\\beta^3 = 112.0000000$, $\\alpha^4+\\beta^4 = 487.0000000$ — every read certified.',
      'Hence all five reads price out as $27$, $112$, $487$, $5$, and $\\frac{7}{11}$, from the two seeds $\\alpha+\\beta = 7$, $\\alpha\\beta = 11$ alone.',
    ] },
    { kind: 'para', text: 'Notice what the numeric audit does and does not do. It does not *produce* the answers — the Vieta reads did that in four lines of integer arithmetic. It certifies them: $4.6180340 + 2.3819660 = 7$ exactly, $4.6180340 \\cdot 2.3819660 = 11$ to nine places, and each higher read lands on its integer. In an exam script the audit is optional; in a craft lesson it is the habit that separates a lucky answer from a verified one.' },
    { kind: 'para', text: 'The cubic staple extends the read to three roots. Chapter 8.3\'s identity — named there and used here — is:' },
    { kind: 'equation', latex: '\\alpha^3 + \\beta^3 + \\gamma^3 - 3\\alpha\\beta\\gamma = (\\alpha + \\beta + \\gamma)\\left( \\alpha^2 + \\beta^2 + \\gamma^2 - \\alpha\\beta - \\beta\\gamma - \\gamma\\alpha \\right) \\tag{4}' },
    { kind: 'para', text: 'One verified instance: the roots of $x^3 - 6x^2 + 11x - 6 = 0$ are $1, 2, 3$ (the integer-root scan finds all three). The left side of (4) reads $1 + 8 + 27 - 3 \\cdot 6 = 18$; the right side reads $(1+2+3)(1 + 4 + 9 - 2 - 6 - 3) = 6 \\cdot 3 = 18$. Both sides agree at $18$, and the identity is available whenever a symmetric cubic in three roots needs pricing — in particular when $\\alpha + \\beta + \\gamma = 0$, where the staple collapses to the memorable $\\alpha^3 + \\beta^3 + \\gamma^3 = 3\\alpha\\beta\\gamma$.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — symmetric in what?', text: 'A read is only available if the expression is symmetric — unchanged by swapping roots. $(\\alpha - \\beta)^2$ is symmetric (the sign square hides the order), but $(\\alpha - \\beta)^3$ is not: swapping $\\alpha, \\beta$ negates it, and no coefficient read can price it. Check symmetry before spending Vieta on anything.' },

    /* ---------------- Section 3: AM–GM maxima under constraints ---------------- */
    { kind: 'heading', text: 'AM–GM Maxima Under Constraints' },
    { kind: 'para', text: 'The banked lesson `aa-the-arithmetic-geometric-mean-inequality` proved the two-term engine: for $a, b \\ge 0$, $\\frac{a+b}{2} \\ge \\sqrt{ab}$, with equality exactly when $a = b$. The advanced craft cashes it under **constraints** — sums held fixed, products forced constant — and adds the discipline AL 11.2 only hinted at: a bound is not an answer until the equality witness is named and found inside the constraint set. Three cashed reads follow, each with its witness, then the boundary law.' },
    { kind: 'equation', latex: '9x + \\frac{4}{x} \\;\\ge\\; 2\\sqrt{9x \\cdot \\frac{4}{x}} = 2\\sqrt{36} = 12 \\tag{5}' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the equality witness', text: 'A point $x_0$ is said to be the *equality witness* of an AM–GM bound if the compared terms become equal exactly at $x_0$, so the bound is attained there. Formally: for terms $u(x), v(x) \\ge 0$ the claim $u(x) + v(x) \\ge 2\\sqrt{u(x)v(x)}$ prices a true minimum only if $u(x) = v(x)$ has a solution inside the constraint set, and that solution is $x_0$. Thus, the witness is the certificate: name it, or the bound prices nothing.' },
    { kind: 'example', title: 'Illustration 4 — Find the minimum of $x + \\frac{4}{x}$ for $x > 0$ and the point where it is attained.', steps: [
      'Split: the terms are $x$ and $\\frac{4}{x}$, both positive on the constraint set $x > 0$; their product is the constant $4$.',
      'Take the bound: $x + \\frac{4}{x} \\ge 2\\sqrt{4} = 4$, independent of $x$ — the whole difficulty is whether it can be touched.',
      'Now, hunt the witness: equality needs $x = \\frac{4}{x}$, that is $x = 2$, which does lie in the constraint set $x > 0$.',
      'Check: $2 + \\frac{4}{2} = 4$ exactly; the engine\'s fine grid over $(0, 10]$ tops out below $4.000001$ only near $x = 2.0000$, so no smaller value hides anywhere.',
      'Hence the minimum is $4$, attained at the equality witness $x = 2$.',
    ] },
    { kind: 'example', title: 'Illustration 5 — Find the minimum of $9x + \\frac{4}{x}$ for $x > 0$.', steps: [
      'Split: the terms are $9x$ and $\\frac{4}{x}$ — a *weighted* split, since the coefficients differ; their product $9x \\cdot \\frac{4}{x} = 36$ is still constant.',
      'Take the bound: $9x + \\frac{4}{x} \\ge 2\\sqrt{36} = 12$ (equation (5) displays the chain).',
      'Now, hunt the witness: equality needs $9x = \\frac{4}{x}$, so $x^2 = \\frac{4}{9}$ and $x = \\frac{2}{3}$ — inside the constraint set.',
      'Check: $9 \\cdot \\frac{2}{3} + \\frac{4}{2/3} = 6 + 6 = 12$ exactly; the engine grid confirms the floor at $12.000000$ near $x = 0.6667$.',
      'Hence the minimum is $12$ at $x = \\frac{2}{3}$ — the weights move the witness but never move the bound.',
    ] },
    { kind: 'para', text: 'The same engine prices maxima the moment the sum is pinned. If $x + y = 6$ with $x, y \\ge 0$, then the product law reads:' },
    { kind: 'equation', latex: 'xy \\;\\le\\; \\left( \\frac{x + y}{2} \\right)^2 = 9, \\quad x(6-x) \\le 9 \\tag{6}' },
    { kind: 'example', title: 'Illustration 6 — Find the maximum of $x(6-x)$ and certify it on the boundary.', steps: [
      'Split: the sum is pinned — $x + (6 - x) = 6$ — so the product law of equation (6) applies verbatim.',
      'Take the bound: $x(6-x) \\le 9$ for every real $x$, with the ceiling priced by $\\left(\\frac{6}{2}\\right)^2$.',
      'Now, hunt the witness: equality needs $x = 6 - x$, so $x = 3$, and $3 \\cdot 3 = 9$ is attained.',
      'But note the shape of the claim: the parabola touches the ceiling at exactly one point (Figure 3) — near $x = 2.9$ the product is $8.99$, near $x = 3.1$ it is $8.99$; the ceiling binds only at the witness.',
      'Hence the maximum is $9$ at $x = 3$, and the engine grid over $[0, 6]$ confirms $9.000000$ is touched once.',
    ] },
    { kind: 'figure', caption: 'Figure 3 — the AM–GM boundary: x(6−x) under its 9-ceiling, touched once at the equality witness x = 3.', svg: in101AmgmSvg() },
    { kind: 'example', title: 'Illustration 7 — Find the maximum of $xyz$ subject to $x + y + z = 12$ with $x, y, z > 0$.', steps: [
      'Split: three terms, one pinned sum — the three-term AM–GM read applies: $\\frac{x+y+z}{3} \\ge \\sqrt[3]{xyz}$.',
      'Take the bound: $xyz \\le 4^3 = 64$, since $\\frac{12}{3} = 4$ is forced by the constraint.',
      'Now, hunt the witness: equality needs $x = y = z$, and the sum forces $x = y = z = 4$.',
      'Check: $4 \\cdot 4 \\cdot 4 = 64$ exactly; the engine\'s grid over the whole simplex ($x, y \\ge 0$, $z = 12 - x - y$) peaks at $64.00$ near $(4, 4, 4)$ and nowhere else.',
      'Hence the maximum is $64$ at $(4, 4, 4)$ — the symmetric witness the symmetric constraint demanded.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the boundary discipline', text: 'The AM–GM bound binds ONLY at equality. A max/min claim must name the equality witness; a constraint that never reaches equality prices no maximum. Watch what happens when the witness is exiled: over $x \\ge 3$, the minimum of $x + \\frac{4}{x}$ is **not** $4$ — the witness $x = 2$ lies outside the constraint, and the true minimum is the boundary value $3 + \\frac{4}{3} = \\frac{13}{3} = 4.3333333$. Always ask two questions: does the witness exist, and does it live inside the constraint?' },

    /* ---------------- Section 4: series sums priced by difference and telescoping ---------------- */
    { kind: 'heading', text: 'Series Sums Priced by Difference and Telescoping' },
    { kind: 'para', text: 'Chapter 5\'s engines — the method of differences (banked in `aa-special-series-and-the-method-of-differences`) and the telescoping split — were built on clean families: $k^2$, $\\frac{1}{k(k+1)}$, $\\frac{k}{2^k}$. The advanced craft prices the next tier: reciprocal products with a **gap** ($\\frac{1}{k(k+2)}$, where the cancellation skips a rung), factorial-shifted sums ($\\sum k \\cdot k!$), and the AGP tail that prices the infinite value of $\\sum \\frac{k}{2^k}$. The craft is the same: find the split that cancels, keep the boundary terms, and audit the closed form against brute addition.' },
    { kind: 'derivation', title: 'Telescoping the reciprocal product with a gap', statement: 'Show that $\\frac{1}{k(k+2)}$ splits into a difference of reciprocals two steps apart, and price the partial sum $S_n$ and its limit.', steps: [
      { label: 'Split', formula: '\\frac{1}{k(k+2)} = \\frac{1}{2}\\left( \\frac{1}{k} - \\frac{1}{k+2} \\right)', explanation: 'Recombine the right side: the bracket equals $\\frac{(k+2) - k}{k(k+2)} = \\frac{2}{k(k+2)}$, and the outer $\\frac{1}{2}$ restores exactly $\\frac{1}{k(k+2)}$.' },
      { label: 'Shift', formula: '\\sum_{k=1}^{n} \\left( \\frac{1}{k} - \\frac{1}{k+2} \\right) = 1 + \\frac{1}{2} - \\frac{1}{n+1} - \\frac{1}{n+2}', explanation: 'Two-step telescoping: each reciprocal cancels one two rungs down the staircase, so only the top two rungs and the two unmatched bottom rungs survive.' },
      { label: 'Scale', formula: '\\sum_{k=1}^{n} \\frac{1}{k(k+2)} = \\frac{1}{2}\\left( \\frac{3}{2} - \\frac{1}{n+1} - \\frac{1}{n+2} \\right)', explanation: 'Multiplying by the outer half prices the whole sum; the engine confirms this closed form against brute addition for every $n$ from 1 to 12.' },
    ], result: 'Hence $S_n = \\frac{1}{2}\\left(\\frac{3}{2} - \\frac{1}{n+1} - \\frac{1}{n+2}\\right)$, and as $n$ grows the two tail fractions fade, so $S_n \\to \\frac{3}{4}$.' },
    { kind: 'example', title: 'Illustration 8 — Audit $\\sum_{k=1}^{n} \\frac{1}{k(k+2)}$ at $n = 5, 10, 1000$ and price the limit.', steps: [
      'Split: the closed form of the derivation gives $S_n = \\frac{1}{2}\\left(\\frac{3}{2} - \\frac{1}{n+1} - \\frac{1}{n+2}\\right)$.',
      'Take $n = 5$: $S_5 = \\frac{1}{2}\\left(\\frac{3}{2} - \\frac{1}{6} - \\frac{1}{7}\\right) = 0.5952381$ (engine-pinned, and brute addition agrees).',
      'Now, $n = 10$: $S_{10} = \\frac{1}{2}\\left(\\frac{3}{2} - \\frac{1}{11} - \\frac{1}{12}\\right) = 0.6628788$ — brute addition confirms it again.',
      'And the far tail: $S_{1000} = \\frac{1}{2}\\left(\\frac{3}{2} - \\frac{1}{1001} - \\frac{1}{1002}\\right) = 0.7490015$, missing $\\frac{3}{4}$ by about $\\frac{1}{1000}$ — the tail fades like $\\frac{1}{n}$.',
      'Hence the partials climb $0.5952381 \\to 0.6628788 \\to 0.7490015 \\to \\frac{3}{4}$, exactly as the closed form promises.',
    ] },
    { kind: 'para', text: 'The factorial family telescopes by a different shift. Because $k \\cdot k! = (k+1)! - k!$ (check: $(k+1)! = (k+1)\\cdot k!$, and subtracting $k!$ leaves $k \\cdot k!$), the sum collapses pairwise:' },
    { kind: 'equation', latex: '\\sum_{k=1}^{n} k \\cdot k! = (2! - 1!) + (3! - 2!) + \\cdots + ((n+1)! - n!) = (n+1)! - 1 \\tag{7}' },
    { kind: 'example', title: 'Illustration 9 — Price $\\sum_{k=1}^{n} k \\cdot k!$ at $n = 5$ and $n = 7$ and confirm the closed form.', steps: [
      'Split: equation (7) reduces the whole sum to one factorial minus one.',
      'Take $n = 5$: the closed form gives $6! - 1 = 719$; brute addition $1 + 4 + 18 + 96 + 600 + 4320 = 719$ agrees rung by rung.',
      'Now, $n = 7$: the closed form gives $8! - 1 = 40319$, and the engine\'s brute sum lands on $40319$ exactly — the partial $S_5 = 719$ was no accident.',
      'Check: the engine verifies $\\sum k \\cdot k! = (n+1)! - 1$ for every $n$ from 1 to 8, integer-perfect each time.',
      'Hence any factorial-weighted sum prices to $(n+1)! - 1$ — one line, no cases.',
    ] },
    { kind: 'para', text: 'The last family is the AGP tail: $\\frac{k}{2^k}$ mixes an arithmetic ladder with a geometric decay. Chapter 5.2\'s shift-and-cancel prices it in closed form:' },
    { kind: 'equation', latex: '\\sum_{k=1}^{n} \\frac{k}{2^k} = 2 - \\frac{n+2}{2^n} \\;\\to\\; 2 \\tag{8}' },
    { kind: 'example', title: 'Illustration 10 — Confirm $\\sum_{k=1}^{n} \\frac{k}{2^k} = 2 - \\frac{n+2}{2^n}$ at $n = 6, 10$ and read the infinite value.', steps: [
      'Split: the closed form of equation (8) predicts every partial sum from one formula.',
      'Take $n = 6$: $2 - \\frac{8}{64} = 1.875$, and brute addition $\\frac{1}{2} + \\frac{2}{4} + \\frac{3}{8} + \\frac{4}{16} + \\frac{5}{32} + \\frac{6}{64} = 1.875$ agrees.',
      'Now, $n = 10$: $2 - \\frac{12}{1024} = 1.98828125$ — the tail $\\frac{n+2}{2^n}$ has already fallen below $0.012$.',
      'And the infinite value: as $n$ grows, the subtracted tail vanishes exponentially, so the sum tends to $2$ — the engine confirms agreement to $10^{-12}$ by $n = 50$.',
      'Hence the partials run $1.875 \\to 1.98828125 \\to 2$, and the infinite value is exactly $2$.',
    ] },

    /* ---------------- Section 5: binomial term hunts ---------------- */
    { kind: 'heading', text: 'Binomial Term Hunts' },
    { kind: 'para', text: 'Chapter 7\'s atlas (banked in `aa-binomial-coefficients-at-work`) lists the identities; the advanced craft runs **hunts** with them: locating one coefficient, certifying the greatest one, and taking a census of the whole row without writing the row out. The census is the deepest of the three reads — it prices sum and alternating sum from two substitutions ($x = 1$ and $x = -1$) and the middle-turning law from symmetry alone.' },
    { kind: 'example', title: 'Illustration 11 — For $(1+x)^{12}$, report the coefficient of $x^5$, the greatest coefficient, the sum of all coefficients, and the alternating sum.', steps: [
      'Split: the coefficient of $x^5$ is $\\binom{12}{5} = 792$ (the engine computes row 12 by the multiplicative rule and cross-checks against the factorial route).',
      'Take the middle turn: with $n = 12$ even, the greatest coefficient is the single middle one, $\\binom{12}{6} = 924$ — a row scan confirms no coefficient exceeds it.',
      'Now, the census: setting $x = 1$ gives $\\sum \\binom{12}{k} = 2^{12} = 4096$; setting $x = -1$ gives $\\sum (-1)^k \\binom{12}{k} = (1-1)^{12} = 0$.',
      'Check: the engine adds row 12 to $4096$ and alternates it to $0$, integer-perfect.',
      'Hence the four reads are $792$, $924$, $4096$, and $0$ — no expansion ever written out.',
    ] },
    { kind: 'equation', latex: 'T_{k+1} = \\binom{n}{k} a^{\\,n-k} b^{\\,k} \\tag{9}' },
    { kind: 'derivation', title: 'The general term of a two-part binomial', statement: 'Set up the general term of $\\left(2x - \\frac{1}{x}\\right)^{10}$ and locate the constant term and the $x^4$ coefficient.', steps: [
      { label: 'Setup', formula: 'T_{k+1} = \\binom{10}{k} (2x)^{10-k} \\left(-\\frac{1}{x}\\right)^k', explanation: 'Each factor contributes either the $2x$ part or the $-\\frac{1}{x}$ part; choosing $k$ of the latter leaves $10 - k$ of the former.' },
      { label: 'Collect', formula: 'T_{k+1} = \\binom{10}{k} 2^{10-k} (-1)^k x^{10-2k}', explanation: 'The net power of $x$ falls by 2 for every $-\\frac{1}{x}$ chosen, so the exponent tracks $10 - 2k$.' },
      { label: 'Hunt', explanation: 'The constant term needs $10 - 2k = 0$, so $k = 5$; the $x^4$ coefficient needs $10 - 2k = 4$, so $k = 3$.' },
      { label: 'Price', formula: '\\binom{10}{5}\\, 2^5\\,(-1)^5 = -8064', explanation: 'And at $k = 3$: $\\binom{10}{3}\\, 2^7\\,(-1)^3 = -15360$. Both are engine-verified against a full polynomial convolution of the tenth power.' },
    ], result: 'Hence the independent term is $-8064$ and the $x^4$ coefficient is $-15360$ — the exponent read $10 - 2k$ located both in one move.' },
    { kind: 'example', title: 'Illustration 12 — For $\\left(2x - \\frac{1}{x}\\right)^{10}$, find the independent term and the coefficient of $x^4$.', steps: [
      'Split: the general term from the derivation is $T_{k+1} = \\binom{10}{k} 2^{10-k} (-1)^k x^{10-2k}$.',
      'Take the constant term: $10 - 2k = 0$ forces $k = 5$, giving $\\binom{10}{5} \\cdot 2^5 \\cdot (-1)^5 = 252 \\cdot 32 \\cdot (-1) = -8064$.',
      'Now, the $x^4$ hunt: $10 - 2k = 4$ forces $k = 3$, giving $\\binom{10}{3} \\cdot 2^7 \\cdot (-1)^3 = 120 \\cdot 128 \\cdot (-1) = -15360$.',
      'Check: the engine multiplies $(2x - \\frac{1}{x})$ by itself ten times by convolution and reads $-8064$ at exponent $0$ and $-15360$ at exponent $4$ — both certified.',
      'Hence the independent term is $-8064$ and the $x^4$ coefficient is $-15360$, signs included.',
    ] },

    /* ---------------- Section 6: log speed reads ---------------- */
    { kind: 'heading', text: 'Log Speed Reads' },
    { kind: 'para', text: 'The banked lesson `aa-the-laws-of-logarithms-and-the-change-of-base` supplies the laws; chapter 9\'s digit-count law supplies the payoff. The advanced craft reads **orderings** off them: a chain of five logarithms whose values fall strictly, a digit count priced to seven places, and a duel between two powers settled twice over — once by logarithms, once by pure base-pairing.' },
    { kind: 'equation', latex: '\\log_n (n+1) = 1 + \\frac{\\ln\\left(1 + \\frac{1}{n}\\right)}{\\ln n} \\tag{10}' },
    { kind: 'example', title: 'Illustration 13 — Show $\\log_2 3 > \\log_3 4 > \\log_4 5 > \\log_5 6 > \\log_6 7$ and explain why the chain must fall.', steps: [
      'Split: change of base puts all five on one footing — $\\log_2 3 = \\frac{\\ln 3}{\\ln 2}$ and so on; the engine pins each to seven places.',
      'Take the values: $1.5849625$, $1.2618595$, $1.1609640$, $1.1132828$, $1.0860331$ — strictly decreasing (Table 1 and Figure 4).',
      'Now, the why: equation (10) rewrites each term as $1$ plus a fraction; the increment $\\ln(1 + \\frac{1}{n})$ shrinks like $\\frac{1}{n}$ while the denominator $\\ln n$ climbs, so each new term is $1$ plus a smaller fraction — the chain must fall.',
      'And the mirror: change of base also gives $\\log_{n+1} n = \\frac{1}{\\log_n(n+1)}$; the reciprocals climb toward $1$ from below, confirming the same monotonicity from the other side.',
      'Check: the engine verifies the decomposition of equation (10) at $n = 2$ through $6$ to within $10^{-12}$, and that the increment itself falls at every step.',
      'Hence the chain $\\log_2 3 > \\log_3 4 > \\log_4 5 > \\log_5 6 > \\log_6 7$ holds, each term $1$ plus a shrinking fraction.',
    ] },
    { kind: 'table', caption: 'Table 1 — the decreasing chain, engine-pinned at seven places.', head: ['Read', 'Value (7 dp)', 'Decomposition read'], rows: [
      ['$\\log_2 3$', '1.5849625', '$1 + \\ln(1.5)/\\ln 2$'],
      ['$\\log_3 4$', '1.2618595', '$1 + \\ln(4/3)/\\ln 3$'],
      ['$\\log_4 5$', '1.1609640', '$1 + \\ln(5/4)/\\ln 4$'],
      ['$\\log_5 6$', '1.1132828', '$1 + \\ln(6/5)/\\ln 5$'],
      ['$\\log_6 7$', '1.0860331', '$1 + \\ln(7/6)/\\ln 6$'],
    ] },
    { kind: 'figure', caption: 'Figure 4 — the log-ordering chain as a decreasing staircase: add 1 to base and argument, and the value still falls.', svg: in101LogStairSvg() },
    { kind: 'equation', latex: '25\\,\\log_{10} 8 = 22.5772497 \\tag{11}' },
    { kind: 'example', title: 'Illustration 14 — Count the digits of $8^{25}$ by the digit-count law, then confirm exactly.', steps: [
      'Split: the digit-count law says $\\text{digits}(N) = \\lfloor \\log_{10} N \\rfloor + 1$ — the banked 9.6 law, cashed here.',
      'Take the logarithm: $\\log_{10} 8 = 3\\log_{10} 2 = 3 \\times 0.3010300 = 0.9030900$, so equation (11) gives $25\\,\\log_{10} 8 = 22.5772497$ (engine-pinned).',
      'Now, apply the law: $\\lfloor 22.5772497 \\rfloor + 1 = 22 + 1 = 23$ digits.',
      'Check: the exact integer read — $8^{25} = 2^{75} = 37778931862957161709568$ — has 23 characters, engine-confirmed by BigInt string length.',
      'Hence $8^{25}$ has $23$ digits, priced by a floor and certified by an exact 23-digit integer.',
    ] },
    { kind: 'example', title: 'Illustration 15 — Settle the duel $2^{300}$ versus $3^{200}$ twice: by logarithms and by base-pairing.', steps: [
      'Split: logarithms compare the two magnitudes directly — $\\ln(2^{300}) = 300\\,\\ln 2$ and $\\ln(3^{200}) = 200\\,\\ln 3$.',
      'Take the values: $300\\,\\ln 2 = 207.9441542$ and $200\\,\\ln 3 = 219.7224577$ (engine-pinned to seven places).',
      'Now, conclude: since $207.9441542 < 219.7224577$, the duel goes to $3^{200}$.',
      'But there is a cleaner read: $2^{300} = (2^3)^{100} = 8^{100}$ and $3^{200} = (3^2)^{100} = 9^{100}$; since $8 < 9$, the same winner follows with no logarithm at all.',
      'Check: exact BigInt comparison confirms $3^{200} > 2^{300}$ — a 96-digit number beating a 91-digit one.',
      'Hence $3^{200}$ wins twice over: by the log duel and by the base-pairing read.',
    ] },

    /* ---------------- Section 7: the mixed craft + exam corner ---------------- */
    { kind: 'heading', text: 'The Mixed Craft — One Problem, Three Families' },
    { kind: 'para', text: 'The exam does not label its families. A single question can hide an AM–GM bound, a Vieta certification, and a binomial count in three consecutive sentences, and the craft is to *route* each sentence to its machine without losing the thread. The closing Illustration chains three families through one shared number, and the exam corner maps the whole lesson onto the JEE Main arc.' },
    { kind: 'example', title: 'Illustration 16 — Price the minimum $m$ of $x + \\frac{4}{x}$ for $x > 0$; read $\\alpha^3 + \\beta^3$ for the roots of $t^2 - mt + 4 = 0$; then census $(t+2)^4$.', steps: [
      'Split: AM–GM prices the bound — $x + \\frac{4}{x} \\ge 4$ with equality at $x = 2$, so $m = 4$ and the witness is named (family one).',
      'Take: with $m = 4$ the quadratic is $t^2 - 4t + 4 = (t - 2)^2$; Vieta certifies sum $4$, product $4$, and the factorization reveals a double root $2$ (family two).',
      'Now, the symmetric read: $\\alpha^3 + \\beta^3 = m^3 - 3 \\cdot 4 \\cdot m = 64 - 48 = 16$; directly, $2 \\cdot 2^3 = 16$ — the double root agrees.',
      'And the census: the coefficients of $(t+2)^4$ are $1, 8, 24, 32, 16$ (engine-convolved), summing to $81 = 3^4$, peaking at $24$ by the middle-turning law, with alternating sum $(1-2)^4 = 1$ (family three).',
      'But the census closes the loop: the constant coefficient $16$ is exactly $\\alpha^3 + \\beta^3 = 16$ — the same double root $2$, priced from the counting side.',
      'Hence one problem, three families, one echo: $m = 4$, $\\alpha^3 + \\beta^3 = 16$, and the census $\\{81, 24, 1\\}$.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where the craft lands in JEE Main (exam-style)', text: 'Exam-style items across the arc, honestly labelled: nested substitutions appear as Single Correct asks for the number of real roots (four, when both $t$-branches are honored); weighted AM–GM minima appear as Numerical Value asks (price $9x + \\frac{4}{x}$); binomial term hunts appear as Multiple Correct asks (independent-term signs, middle-turning coefficients, census identities); and the digit-count law and log duels are one-line Numerical Value staples. Nothing here claims a real paper — these are the typologies the syllabus arc rewards, written as exam-style drills.' },

    /* ---------------- vocabulary ---------------- */
    { kind: 'terms', items: [
      { term: 'nested substitution', def: 'A substitution $t = h(x)$ with $\\deg h \\ge 2$; the equation in $t$ splits into one quadratic family per $t$-root, and every family must be back-solved.' },
      { term: 'the ladder recurrence', def: 'The climb $s_{k+1} = \\left(x + \\frac{1}{x}\\right) s_k - s_{k-1}$ from $s_0 = 2$; it prices $x^k + x^{-k}$ for every $k$ without ever solving for $x$.' },
      { term: 'the symmetric read', def: 'Pricing a symmetric expression in the roots from Vieta\'s two seeds $\\alpha + \\beta$ and $\\alpha\\beta$ alone; available only when the expression is genuinely symmetric.' },
      { term: 'the constraint boundary', def: 'The edge of the constraint set where an extremum can hide; AM–GM binds only at equality, so every claim must check whether the witness lies inside the constraint.' },
      { term: 'the telescoping split', def: 'Writing $\\frac{1}{k(k+2)} = \\frac{1}{2}\\left(\\frac{1}{k} - \\frac{1}{k+2}\\right)$ so consecutive partial sums cancel, leaving only the boundary terms.' },
      { term: 'the general term', def: 'The read $T_{k+1} = \\binom{n}{k} a^{n-k} b^k$ of the $(k+1)$-th term of $(a+b)^n$; the powers of $x$ inside it locate any wanted coefficient.' },
      { term: 'the digit-count read', def: 'The law $\\text{digits}(N) = \\lfloor \\log_{10} N \\rfloor + 1$; since $25\\,\\log_{10} 8 = 22.5772497$, the number $8^{25}$ has $23$ digits.' },
      { term: 'the equality witness', def: 'The point where the compared AM–GM terms coincide and the bound is attained; a max/min claim without its witness prices nothing.' },
    ] },

    /* ---------------- formula cards ---------------- */
    { kind: 'formula', name: 'The ladder recurrence', latex: 's_{k+1} = \\left( x + \\frac{1}{x} \\right) s_k - s_{k-1}', note: 'with $s_0 = 2$, $s_1 = x + \\frac{1}{x}$; at seed 3 it climbs $7, 18, 47, 123, 322, 843, 2207, 5778$.' },
    { kind: 'formula', name: 'The product-under-fixed-sum law', latex: 'xy \\le \\left( \\frac{x+y}{2} \\right)^2', note: 'equality exactly at $x = y$; for $x + y = 6$ the ceiling is $9$, touched once.' },
    { kind: 'formula', name: 'The telescoping split', latex: '\\frac{1}{k(k+2)} = \\frac{1}{2}\\left( \\frac{1}{k} - \\frac{1}{k+2} \\right)', note: 'two-step cancellation; $S_n = \\frac{1}{2}\\left(\\frac{3}{2} - \\frac{1}{n+1} - \\frac{1}{n+2}\\right) \\to \\frac{3}{4}$.' },
    { kind: 'formula', name: 'The general term', latex: 'T_{k+1} = \\binom{n}{k} a^{\\,n-k} b^{\\,k}', note: 'for $\\left(2x - \\frac{1}{x}\\right)^{10}$ the exponent read is $10 - 2k$; constant term at $k = 5$.' },
    { kind: 'formula', name: 'The digit-count law', latex: '\\text{digits}(N) = \\lfloor \\log_{10} N \\rfloor + 1', note: '$25\\,\\log_{10} 8 = 22.5772497$ forces $23$ digits for $8^{25}$.' },
    { kind: 'formula', name: 'The log-ordering read', latex: '\\log_n(n+1) = 1 + \\frac{\\ln\\left(1 + \\frac{1}{n}\\right)}{\\ln n}', note: 'the fraction shrinks while the denominator climbs, so the chain falls strictly.' },

    /* ---------------- quiz ---------------- */
    { kind: 'quiz', items: [
      { q: 'If $x + \\frac{1}{x} = 3$, what is $x^3 + \\frac{1}{x^3}$?', options: ['$21$', '$27$', '$18$', '$15$'], answer: 2,
        explain: 'The correct option is $18$: the ladder gives $s_3 = 3 \\cdot 7 - 3 = 18$, and Newton\'s read agrees, $27 - 9 = 18$. Option $21$ runs the ladder as $3 \\cdot 7$ but forgets to subtract $s_1 = 3$. Option $27$ is $3^3$ with the correction term $3\\left(x + \\frac{1}{x}\\right)$ dropped entirely. Option $15$ is an arithmetic slip: it subtracts $12$ (as if the correction were $4 \\times 3$) instead of $9$.' },
      { q: '$\\alpha, \\beta$ are the roots of $x^2 - 7x + 11 = 0$. Then $\\alpha^3 + \\beta^3$ equals:', options: ['$112$', '$231$', '$487$', '$343$'], answer: 0,
        explain: 'The correct option is $112$: $7^3 - 3 \\cdot 11 \\cdot 7 = 343 - 231 = 112$. Option $231$ is the correction term $3\\alpha\\beta(\\alpha+\\beta)$ alone — computed but never subtracted. Option $487$ is the fourth-power read $\\alpha^4 + \\beta^4$: the wrong rung of the ladder. Option $343$ is $7^3$ with the correction term dropped.' },
      { q: 'For $x > 0$, the minimum of $9x + \\frac{4}{x}$ is:', options: ['$6$', '$12$', 'No minimum exists for $x > 0$', '$13$'], answer: 1,
        explain: 'The correct option is $12$: $2\\sqrt{9x \\cdot \\frac{4}{x}} = 2\\sqrt{36} = 12$, attained at $9x = \\frac{4}{x}$, i.e. $x = \\frac{2}{3}$. Option $6$ stops at $\\sqrt{36}$ and forgets the outer factor $2$. Option $13$ is a plain arithmetic slip ($\\sqrt{36} = 6$, doubled is $12$, not $13$). Option \'No minimum\' is false: the AM–GM bound is genuine and attained, so a minimum exists.' },
      { q: 'The independent (constant) term of $\\left(2x - \\frac{1}{x}\\right)^{10}$ is:', options: ['$8064$', '$-792$', '$-252$', '$-8064$'], answer: 3,
        explain: 'The correct option is $-8064$: the independent term needs $10 - 2k = 0$, so $k = 5$, giving $\\binom{10}{5} \\cdot 2^5 \\cdot (-1)^5 = 252 \\cdot 32 \\cdot (-1)$. Option $8064$ drops the sign $(-1)^5$. Option $-792$ borrows $\\binom{12}{5}$ from the wrong row of Pascal (that is the $(1+x)^{12}$ census, not this binomial). Option $-252$ keeps $\\binom{10}{5}$ but forgets the factor $2^5 = 32$.' },
      { q: 'The number of digits of $8^{25}$ is:', options: ['$22$', '$23$', '$24$', '$21$'], answer: 1,
        explain: 'The correct option is $23$: $25\\,\\log_{10} 8 = 22.5772497$ and the law is $\\lfloor 22.5772497 \\rfloor + 1 = 23$. Option $22$ reads the floor and forgets the $+1$. Option $24$ rounds the characteristic up (ceiling) instead of flooring it. Option $21$ misprices the logarithm itself, using roughly $0.83$ for $\\log_{10} 8$ instead of the true $0.9030900$.' },
    ] },

    /* ---------------- exercises ---------------- */
    { kind: 'exercises', title: 'The drill bench — Single Correct, Multiple Correct and Numerical Value drills, fresh witnesses from L1 to L6 (JEE arc, exam-style)', sets: [
      { level: 'L1', questions: [
        { q: 'Solve $(x^2 - 3x + 3)^2 - 5(x^2 - 3x + 3) + 6 = 0$ completely, and report how many real roots it has.', solution: [
          'Split: set $t = x^2 - 3x + 3$, so the equation becomes $t^2 - 5t + 6 = 0$.',
          'Factor: $(t - 2)(t - 3) = 0$, so $t = 2$ or $t = 3$ — two quadratic families.',
          'Now, the $t = 2$ family: $x^2 - 3x + 1 = 0$ has discriminant $9 - 4 = 5$, so $x = \\frac{3 \\pm \\sqrt{5}}{2}$.',
          'And the $t = 3$ family: $x^2 - 3x = 0$ factors as $x(x - 3) = 0$, so $x = 0$ or $x = 3$.',
          'Hence $x \\in \\{0,\\ 3,\\ \\frac{3 \\pm \\sqrt{5}}{2}\\}$ — four real roots, each engine-checked to $10^{-6}$.',
        ], answer: '$x \\in \\{0,\\ 3,\\ \\frac{3 + \\sqrt{5}}{2},\\ \\frac{3 - \\sqrt{5}}{2}\\}$ — four real roots', figures: [{ caption: 'The two families on one line: the t = 3 branch lands the integer roots 0 and 3, the t = 2 branch lands the surd pair near 0.382 and 2.618.', svg: in101Ex1Svg() }] },
        { q: 'If $x + \\frac{1}{x} = 4$, price $s_2 = x^2 + \\frac{1}{x^2}$ and $s_3 = x^3 + \\frac{1}{x^3}$ by two independent routes.', solution: [
          'Split: the seed is $s_1 = 4$ with $s_0 = 2$, and the ladder law reads $s_{k+1} = 4 s_k - s_{k-1}$.',
          'So, $s_2 = 4^2 - 2 = 14$ — the squaring route — and the ladder agrees: $s_2 = 4 \\cdot 4 - 2 = 14$.',
          'Now, $s_3$: Newton\'s read gives $4^3 - 3 \\cdot 4 = 64 - 12 = 52$, and the ladder gives $4 \\cdot 14 - 4 = 52$.',
          'Hence $s_2 = 14$ and $s_3 = 52$ — two routes, one answer, and no root ever solved.',
        ], answer: '$s_2 = 14$ and $s_3 = 52$' },
        { q: 'For $x > 0$, find the minimum of $x + \\frac{9}{x}$ and name the equality witness.', solution: [
          'Split: AM–GM prices the bound — $x + \\frac{9}{x} \\ge 2\\sqrt{x \\cdot \\frac{9}{x}} = 2 \\cdot 3 = 6$.',
          'Check the witness: equality needs $x = \\frac{9}{x}$, so $x^2 = 9$ and $x = 3$, which lives inside the constraint $x > 0$.',
          'Hence the minimum is $6$, attained at the witness $x = 3$ — the bound is certified, not merely claimed.',
        ], answer: 'minimum $6$ at $x = 3$' },
      ] },
      { level: 'L2', questions: [
        { q: '$\\alpha, \\beta$ are the roots of $x^2 - 9x + 19 = 0$. Price $\\alpha^2 + \\beta^2$ and $\\alpha^3 + \\beta^3$ without solving for the roots.', solution: [
          'Take: Vieta seeds the read — $\\alpha + \\beta = 9$ and $\\alpha\\beta = 19$.',
          'So, the square: $\\alpha^2 + \\beta^2 = 9^2 - 2 \\cdot 19 = 81 - 38 = 43$.',
          'Now, the cube: $\\alpha^3 + \\beta^3 = 9^3 - 3 \\cdot 19 \\cdot 9 = 729 - 513 = 216$.',
          'Hence $\\alpha^2 + \\beta^2 = 43$ and $\\alpha^3 + \\beta^3 = 216$ — priced entirely from the two seeds.',
        ], answer: '$\\alpha^2 + \\beta^2 = 43$ and $\\alpha^3 + \\beta^3 = 216$' },
        { q: 'Find the maximum of $x(8 - x)$ and certify it by naming the equality witness.', solution: [
          'Split: the product under a fixed sum obeys $xy \\le \\left( \\frac{x+y}{2} \\right)^2$; here $y = 8 - x$ keeps $x + y = 8$ fixed.',
          'So, $x(8-x) \\le \\left( \\frac{8}{2} \\right)^2 = 16$.',
          'Check the witness: equality needs $x = y = 8 - x$, so $x = 4$ — unique and inside the domain.',
          'Hence the maximum is $16$, certified by the witness $x = 4$; the parabola touches its ceiling exactly once.',
        ], answer: 'maximum $16$ at $x = 4$' },
        { q: 'Split $\\frac{1}{k(k+3)}$ into a difference of reciprocals, price the partial sum $S_n$, and read the limit as $n \\to \\infty$.', solution: [
          'Split: $\\frac{1}{k(k+3)} = \\frac{1}{3}\\left( \\frac{1}{k} - \\frac{1}{k+3} \\right)$ — a three-step gap.',
          'Now, sum from $k = 1$ to $n$: the interior cancels in a three-step cascade, leaving three survivors per end, so $S_n = \\frac{1}{3}\\left( 1 + \\frac{1}{2} + \\frac{1}{3} - \\frac{1}{n+1} - \\frac{1}{n+2} - \\frac{1}{n+3} \\right)$.',
          'So, the tail dies: as $n \\to \\infty$ the last three terms vanish, and $S_n \\to \\frac{1}{3} \\cdot \\frac{11}{6} = \\frac{11}{18}$.',
          'Hence $S_n = \\frac{1}{3}\\left( \\frac{11}{6} - \\frac{1}{n+1} - \\frac{1}{n+2} - \\frac{1}{n+3} \\right)$, tending to $\\frac{11}{18} \\approx 0.6111111$ — the gap-three split leaves three survivors per end.',
        ], answer: '$S_n = \\frac{1}{3}\\left( \\frac{11}{6} - \\frac{1}{n+1} - \\frac{1}{n+2} - \\frac{1}{n+3} \\right)$, tending to $\\frac{11}{18} \\approx 0.6111111$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $(x^2 - 7x + 11)^2 - 3(x^2 - 7x + 11) + 2 = 0$ completely.', solution: [
          'Split: set $t = x^2 - 7x + 11$, so $t^2 - 3t + 2 = 0$ factors as $(t - 1)(t - 2) = 0$.',
          'Now, the $t = 1$ family: $x^2 - 7x + 10 = 0$ factors as $(x - 2)(x - 5) = 0$, so $x = 2$ or $x = 5$.',
          'And the $t = 2$ family: $x^2 - 7x + 9 = 0$ has discriminant $49 - 36 = 13$, so $x = \\frac{7 \\pm \\sqrt{13}}{2}$.',
          'Hence $x \\in \\{2,\\ 5,\\ \\frac{7 \\pm \\sqrt{13}}{2}\\}$ — four real roots, residuals below $10^{-6}$.',
        ], answer: '$x \\in \\{2,\\ 5,\\ \\frac{7 + \\sqrt{13}}{2},\\ \\frac{7 - \\sqrt{13}}{2}\\}$' },
        { q: 'Climb the ladder $x + \\frac{1}{x} = 5$ from $s_2$ to $s_5$, cross-checking $s_3$ by Newton and $s_4$ by squaring.', solution: [
          'Split: the seed is $s_1 = 5$ with $s_0 = 2$, and the ladder law reads $s_{k+1} = 5 s_k - s_{k-1}$.',
          'So, $s_2 = 5^2 - 2 = 23$, and then $s_3 = 5 \\cdot 23 - 5 = 110$.',
          'Check: Newton reads $s_3 = 5^3 - 3 \\cdot 5 = 125 - 15 = 110$ — the two routes agree.',
          'Now, $s_4 = 5 \\cdot 110 - 23 = 527$, and squaring confirms it: $s_4 = s_2^2 - 2 = 529 - 2 = 527$.',
          'And $s_5 = 5 \\cdot 527 - 110 = 2525$, with Newton\'s expansion $3125 - 625 + 25 = 2525$ agreeing again.',
          'Hence the rungs read $s_2 = 23$, $s_3 = 110$, $s_4 = 527$, $s_5 = 2525$ — ladder, Newton, and squaring all agree on every rung.',
        ], answer: '$s_2 = 23$, $s_3 = 110$, $s_4 = 527$, $s_5 = 2525$', figures: [{ caption: 'The seed-5 ladder: rungs 5, 23, 110, 527, 2525 on log-scaled bars, each rung born from the two rungs below it.', svg: in101Ex8Svg() }] },
        { q: 'Find the coefficient of $x^5$ in the expansion of $(2 + x)^8$.', solution: [
          'Split: the general term reads $T_{k+1} = \\binom{8}{k} 2^{\\,8-k} x^{\\,k}$, so the power $x^5$ demands $k = 5$.',
          'Take: $\\binom{8}{5} = 56$ and $2^{8-5} = 2^3 = 8$.',
          'Hence the coefficient of $x^5$ is $\\binom{8}{5} \\cdot 2^3 = 56 \\cdot 8 = 448$.',
        ], answer: '$448$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find the independent (constant) term of $\\left( 3x - \\frac{2}{x} \\right)^{8}$.', solution: [
          'Split: the general term reads $T_{k+1} = \\binom{8}{k} (3x)^{8-k} \\left( -\\frac{2}{x} \\right)^{k}$, carrying the power $x^{8-2k}$.',
          'Now, the constant term needs $8 - 2k = 0$, so $k = 4$ — and the sign is positive because $(-2)^4 = +16$.',
          'Take: $T_5 = \\binom{8}{4} \\cdot 3^4 \\cdot 2^4 = 70 \\cdot 81 \\cdot 16$.',
          'Hence the independent term is $70 \\cdot 81 \\cdot 16 = 90720$.',
        ], answer: '$90720$' },
        { q: 'For $(1+x)^{15}$, report the greatest coefficient and where it sits, the sum of the odd-index coefficients, and the full coefficient sum.', solution: [
          'Split: row 15 of Pascal runs $\\binom{15}{0}, \\ldots, \\binom{15}{15}$, and with $n$ odd the row peaks at twin middles.',
          'Take: $\\binom{15}{7} = \\binom{15}{8} = 6435$ — the greatest coefficient, shared by the twin middles $k = 7$ and $k = 8$.',
          'Now, the odd-index sum: the alternating read $(1-1)^{15} = 0$ forces the even-index and odd-index sums to be equal, so each is $\\frac{2^{15}}{2} = 2^{14} = 16384$.',
          'And the full sum: put $x = 1$, and the census reads $2^{15} = 32768$.',
          'Hence the greatest coefficient is $6435$ (twin middles at $k = 7, 8$), the odd-index sum is $2^{14} = 16384$, and the full sum is $2^{15} = 32768$.',
        ], answer: 'greatest coefficient $6435$ at $k = 7$ and $k = 8$; odd-index sum $16384$; full sum $32768$' },
        { q: 'Count the digits of $7^{15}$ by the digit-count law, then confirm the count exactly.', solution: [
          'Split: the law reads $\\text{digits}(N) = \\lfloor \\log_{10} N \\rfloor + 1$, and $\\log_{10} 7^{15} = 15 \\log_{10} 7$.',
          'Take: $15 \\log_{10} 7 = 15 \\times 0.8450980 = 12.6764706$.',
          'So, $\\lfloor 12.6764706 \\rfloor + 1 = 12 + 1 = 13$ digits.',
          'Hence $7^{15}$ has $\\lfloor 12.6764706 \\rfloor + 1 = 13$ digits — and $7^{15} = 4747561509943$ confirms the count exactly.',
        ], answer: '$13$ digits' },
      ] },
      { level: 'L5', questions: [
        { q: 'Settle the duel $4^{50}$ versus $5^{40}$ twice: once by logarithms, once by base-pairing to a common exponent.', solution: [
          'Split: compare logarithms — $\\ln 4^{50} = 50 \\ln 4 = 69.3147181$ against $\\ln 5^{40} = 40 \\ln 5 = 64.3775165$.',
          'So, $69.3147181 > 64.3775165$: the logarithm of $4^{50}$ is the taller bar, so $4^{50} > 5^{40}$.',
          'Now, the clean read: both exponents share the factor $10$, so $4^{50} = (4^5)^{10} = 1024^{10}$ and $5^{40} = (5^4)^{10} = 625^{10}$.',
          'And $1024 > 625$ settles the same duel without any logarithm at all.',
          'Hence $4^{50} > 5^{40}$ — by logs $69.3147181 > 64.3775165$, and by pairing $1024^{10} > 625^{10}$.',
        ], answer: '$4^{50} > 5^{40}$', figures: [{ caption: 'The log duel as two bars: 50 ln 4 = 69.3147 stands above 40 ln 5 = 64.3775, and the integer check (4^5)^10 = 1024^10 beats (5^4)^10 = 625^10 needs no logarithm.', svg: in101Ex13Svg() }] },
        { q: 'Split $\\frac{1}{k(k+1)(k+2)}$ into a difference of two-part reciprocals, price $S_5$, and read the limit of $S_n$ as $n \\to \\infty$.', solution: [
          'Split: $\\frac{1}{k(k+1)(k+2)} = \\frac{1}{2}\\left( \\frac{1}{k(k+1)} - \\frac{1}{(k+1)(k+2)} \\right)$ — a two-step gap between two-part reciprocals.',
          'Now, sum from $k = 1$ to $n$: the interior cancels in pairs, leaving $S_n = \\frac{1}{2}\\left( \\frac{1}{2} - \\frac{1}{(n+1)(n+2)} \\right) = \\frac{1}{4} - \\frac{1}{2(n+1)(n+2)}$.',
          'Take $n = 5$: $S_5 = \\frac{1}{4} - \\frac{1}{2 \\cdot 6 \\cdot 7} = \\frac{1}{4} - \\frac{1}{84} = \\frac{20}{84} = \\frac{5}{21}$.',
          'So, as $n \\to \\infty$ the survivor $\\frac{1}{(n+1)(n+2)}$ dies quadratically, and $S_n \\to \\frac{1}{4}$.',
          'Hence $S_5 = \\frac{5}{21} = 0.2380952$ and the limit is $\\frac{1}{4}$ — a two-part split with a two-step gap.',
        ], answer: '$S_5 = \\frac{5}{21} \\approx 0.2380952$; the limit is $\\frac{1}{4}$' },
      ] },
      { level: 'L6', questions: [
        { q: 'One equation, three reads. (a) Solve $(x^2 - 4x + 2)^2 - 4(x^2 - 4x + 2) + 3 = 0$ completely. (b) For the roots $a, b$ of its $t = 1$ branch, price $a^3 + b^3$. (c) Count the digits of $2^{50}$.', solution: [
          'Split (a): set $t = x^2 - 4x + 2$, so $t^2 - 4t + 3 = (t - 1)(t - 3) = 0$ — two families.',
          'Now, $t = 1$: $x^2 - 4x + 1 = 0$ gives $x = 2 \\pm \\sqrt{3}$; and $t = 3$: $x^2 - 4x - 1 = 0$ gives $x = 2 \\pm \\sqrt{5}$.',
          'Take (b): the $t = 1$ branch has $a + b = 4$ and $ab = 1$, so $a^3 + b^3 = 4^3 - 3 \\cdot 1 \\cdot 4 = 64 - 12 = 52$.',
          'Now (c): $\\log_{10} 2^{50} = 50 \\log_{10} 2 = 15.0514998$, so $\\lfloor 15.0514998 \\rfloor + 1 = 16$ digits.',
          'Hence the roots are $2 \\pm \\sqrt{3}$ and $2 \\pm \\sqrt{5}$, the $t = 1$ branch prices $a^3 + b^3 = 52$, and $2^{50}$ carries $16$ digits — three families, one question.',
        ], answer: 'roots $2 \\pm \\sqrt{3}$ and $2 \\pm \\sqrt{5}$; $a^3 + b^3 = 52$; $2^{50}$ has $16$ digits' },
        { q: 'The mixed craft. (a) Price the minimum $m$ of $x + \\frac{9}{x}$ for $x > 0$. (b) For the roots $\\alpha, \\beta$ of $t^2 - mt + 9 = 0$, price $\\alpha^4 + \\beta^4$. (c) Census $(t + 3)^4$: report its coefficient list, sum, alternating sum, and peak coefficient.', solution: [
          'Split (a): AM–GM prices $x + \\frac{9}{x} \\ge 2\\sqrt{9} = 6$ with equality at $x = 3$, so $m = 6$ — the witness is named (family one).',
          'Take (b): $t^2 - 6t + 9 = (t - 3)^2$, a double root with sum $6$ and product $9$. Then $\\alpha^2 + \\beta^2 = 36 - 18 = 18$, so $\\alpha^4 + \\beta^4 = 18^2 - 2 \\cdot 81 = 162$; directly, $2 \\cdot 3^4 = 162$ agrees (family two).',
          'Now (c): the engine-convolved coefficients of $(t + 3)^4$ are $1, 12, 54, 108, 81$ (family three).',
          'Check the census: the sum is $1 + 12 + 54 + 108 + 81 = 256 = 4^4$, the alternating sum is $(1 - 3)^4 = 16$, and the peak is $108$ by the middle-turning law.',
          'Hence $m = 6$, $\\alpha^4 + \\beta^4 = 162$, and the census of $(t+3)^4$ reads coefficients $1, 12, 54, 108, 81$ with sum $256$, alternating $16$, peak $108$ — one chain, three families.',
        ], answer: '$m = 6$; $\\alpha^4 + \\beta^4 = 162$; census: coefficients $1, 12, 54, 108, 81$, sum $256$, alternating $16$, peak $108$', figures: [{ caption: 'The mixed-craft chain: AM-GM prices m = 6 with witness x = 3, Vieta certifies the double root 3 of (t − 3)², and the census of (t + 3)⁴ reads sum 256 and peak 108.', svg: in101Ex16Svg() }] },
      ] },
    ] },
  ],
}

// ------------------------------------------------------------------
// lesson 10.2 — run 123 (authored whole from the run-122 spec)
// ------------------------------------------------------------------
/* ================================================================== */
/* AA 10.2 — Functional Equations: Building Functions from Rules       */
/* Every number printed in this lesson is recomputed and pinned by     */
/* temporary-references/v-aa102.ts (engine wins over any other source).*/
/* Figure helpers: all geometry is computed from the named constants   */
/* below; SVG text stays PLAIN (no TeX, no $, U+2212 for minus).       */
/* ================================================================== */

/* palette (vivid set; never blue/indigo) */
const c102 = {
  struct: '#16a34a', // structure strokes/axes/boxes
  ink: '#166534', // primary text
  mid: '#65a30d', // mid text/formulas
  teal: '#0d9488', // teal strokes
  tealInk: '#0f766e', // teal ink
  conn: '#d97706', // connectors/ticks
  accent: '#ea580c', // accent/arrows/highlights
  warn: '#dc2626', // warning
  panelA: '#ffedd5', // tinted panel
  panelB: '#fef3c7', // tinted panel
  faint: '#5eead4', // faint grids/dots
  white: '#ffffff',
}
const f102 = 'ui-sans-serif, system-ui, sans-serif'

function fn102Txt(x: number, y: number, s: string, size: number, color: string, anchor = 'middle', weight = '400'): string {
  return `<text x="${x}" y="${y}" font-family="${f102}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
}
function fn102ArrowDef(): string {
  return `<defs><marker id="fn102Arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c102.conn}"/></marker></defs>`
}

/* (F1) the value ladder at seed 3: every rung = previous + the seed */
function fn102LadderSvg(): string {
  const W = 640, H = 296
  const rungs = [0, 3, 6, 9, 12, 15] // f(0)..f(5) for seed 3
  const x0 = 150, barH = 26, top = 58, dy = 38
  const w = (v: number) => 52 + v * 15
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The value ladder at seed 3: rungs f of 0 through f of 5 take values 0, 3, 6, 9, 12, 15, each rung being the previous rung plus the seed 3.">`,
    fn102ArrowDef(),
    fn102Txt(20, 30, 'the rule: f(x+y) = f(x) + f(y)', 13.5, c102.mid, 'start', '600'),
    fn102Txt(20, 50, 'one seed f(1) = 3 prices every rung', 12.5, c102.mid, 'start'),
  ]
  rungs.forEach((v, i) => {
    const col = i === 1 ? c102.accent : c102.teal
    out.push(`<rect x="${x0}" y="${top + i * dy}" width="${w(v).toFixed(1)}" height="${barH}" rx="5" fill="${col}" stroke="${c102.tealInk}" stroke-width="1.2"/>`)
    out.push(fn102Txt(x0 - 12, top + i * dy + 18, `f(${i})`, 13.5, c102.ink, 'end', '600'))
    out.push(fn102Txt(x0 + w(v) + 12, top + i * dy + 18, `${v}`, 13, c102.tealInk, 'start', i === 1 ? '600' : '400'))
  })
  for (let i = 1; i < rungs.length; i++) {
    const y = top + i * dy + barH / 2
    out.push(`<path d="M ${x0 + w(rungs[i]) + 34} ${y} H ${x0 + w(rungs[i]) + 58}" stroke="${c102.conn}" stroke-width="1.4" marker-end="url(#fn102Arrow)" fill="none" opacity="0.85"/>`)
  }
  out.push(fn102Txt(x0 + w(15) + 24, top + 2 * dy + 18, '+ f(1) = 3, every step', 12, c102.conn, 'start', '600'))
  out.push(fn102Txt(W / 2, H - 32, 'f(2026) = 3 · 2026 = 6078', 13, c102.accent, 'middle', '600'))
  out.push(fn102Txt(W / 2, H - 12, 'the rung spacing never changes — that is the whole ladder', 12, c102.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (F2) the order-4 orbit: x → (x−1)/(x+1) → −1/x → (1+x)/(1−x) → x */
function fn102CycleSvg(): string {
  const W = 640, H = 330
  const cx = W / 2, cy = 158, R = 96
  const st = [
    { a: -90, lab: 'x', wit: '2' },
    { a: 0, lab: 'f(x) = (x−1)/(x+1)', wit: '1/3' },
    { a: 90, lab: 'f²(x) = −1/x', wit: '−1/2' },
    { a: 180, lab: 'f³(x) = (1+x)/(1−x)', wit: '−3' },
  ]
  const pos = (a: number) => ({ x: cx + R * Math.cos((a * Math.PI) / 180), y: cy + R * Math.sin((a * Math.PI) / 180) })
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The order-four machine as a cycle: x goes to (x minus 1) over (x plus 1), then to minus 1 over x, then to (1 plus x) over (1 minus x), then back to x; the witness 2 orbits 2, 1/3, −1/2, −3, 2.">`,
    fn102ArrowDef(),
    fn102Txt(cx, 26, 'the order-4 machine: four stations, one loop', 13.5, c102.tealInk, 'middle', '600'),
  ]
  // arrows around the cycle (clockwise)
  for (let i = 0; i < 4; i++) {
    const a1 = st[i].a + 34, a2 = st[(i + 1) % 4].a - 34
    const p1 = pos(a1), p2 = pos(a2)
    out.push(`<path d="M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${R} ${R} 0 0 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}" stroke="${c102.conn}" stroke-width="1.8" fill="none" marker-end="url(#fn102Arrow)"/>`)
  }
  st.forEach((s) => {
    const p = pos(s.a)
    const bw = 168, bh = 44
    out.push(`<rect x="${(p.x - bw / 2).toFixed(1)}" y="${(p.y - bh / 2).toFixed(1)}" width="${bw}" height="${bh}" rx="9" fill="${c102.panelB}" stroke="${c102.teal}" stroke-width="1.6"/>`)
    out.push(fn102Txt(p.x, p.y - 4, s.lab, 12.5, c102.ink, 'middle', '600'))
    out.push(fn102Txt(p.x, p.y + 14, `witness: ${s.wit}`, 11.5, c102.accent, 'middle', '600'))
  })
  out.push(fn102Txt(cx, cy + 4, 'f⁴ = identity', 14, c102.tealInk, 'middle', '700'))
  out.push(fn102Txt(cx, H - 30, '2026 ≡ 2 (mod 4), so f^2026 = f²: the remote iterate is −1/x', 12.5, c102.mid))
  out.push(fn102Txt(cx, H - 10, 'a Möbius machine nobody planted — the rule grew it', 12, c102.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (F3) the monotone squeeze: nested bands closing on 2√2 */
function fn102SqueezeSvg(): string {
  const W = 640, H = 270
  const c = 2 * Math.sqrt(2) // 2.8284271...
  const xOf = (v: number) => 90 + (v - 2.81) * (460 - 90) / (2.85 - 2.81)
  const bands = [
    { lo: 2.82, hi: 2.84, y: 70, lab: 'brackets 1.41 < √2 < 1.42' },
    { lo: 2.8284, hi: 2.8286, y: 140, lab: 'brackets 1.4142 < √2 < 1.4143' },
  ]
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Nested squeeze bands on f of the square root of 2: the wide band 2.82 to 2.84 and the narrow band 2.8284 to 2.8286 both close on the single survivor 2.8284271.">`,
    fn102ArrowDef(),
    fn102Txt(W / 2, 26, 'monotone brackets become bands on f(√2)', 13.5, c102.tealInk, 'middle', '600'),
  ]
  bands.forEach((b) => {
    out.push(`<rect x="${xOf(b.lo).toFixed(1)}" y="${b.y}" width="${(xOf(b.hi) - xOf(b.lo)).toFixed(1)}" height="34" rx="6" fill="${c102.panelA}" stroke="${c102.accent}" stroke-width="1.4"/>`)
    out.push(fn102Txt(xOf(b.lo) - 8, b.y + 22, `${b.lo.toFixed(4)}`, 11.5, c102.ink, 'end', '600'))
    out.push(fn102Txt(xOf(b.hi) + 8, b.y + 22, `${b.hi.toFixed(4)}`, 11.5, c102.ink, 'start', '600'))
    out.push(fn102Txt(W / 2, b.y - 8, b.lab, 11.5, c102.mid))
  })
  out.push(`<path d="M ${xOf(2.8284) + 20} 104 L ${xOf(c)} 136" stroke="${c102.conn}" stroke-width="1.4" fill="none" marker-end="url(#fn102Arrow)"/>`)
  out.push(`<circle cx="${xOf(c).toFixed(1)}" cy="196" r="5.5" fill="${c102.accent}" stroke="${c102.white}" stroke-width="1.4"/>`)
  out.push(`<line x1="${xOf(c).toFixed(1)}" y1="174" x2="${xOf(c).toFixed(1)}" y2="218" stroke="${c102.teal}" stroke-width="1.6" stroke-dasharray="5 4"/>`)
  out.push(fn102Txt(xOf(c) + 12, 200, 'f(√2) = 2√2 = 2.8284271', 13, c102.tealInk, 'start', '600'))
  out.push(fn102Txt(W / 2, H - 10, 'every band is ten times tighter — the survivor is unique', 12, c102.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (S1) exercise ladder at seed 5 */
function fn102ExLadderSvg(): string {
  const W = 640, H = 300
  const rungs = [5, 10, 15, 20, 25, 30, 35] // f(1)..f(7) for seed 5
  const x0 = 150, barH = 24, top = 52, dy = 32
  const w = (v: number) => 46 + v * 8.4
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The seed-5 ladder: rungs f of 1 through f of 7 take values 5, 10, 15, 20, 25, 30, 35, with f of 7 highlighted at 35.">`,
    fn102ArrowDef(),
    fn102Txt(20, 28, 'f(1) = 5', 13.5, c102.mid, 'start', '600'),
    fn102Txt(470, 28, 'f(n+1) = f(n) + 5', 12.5, c102.conn, 'middle', '600'),
  ]
  rungs.forEach((v, i) => {
    const col = i === 6 ? c102.accent : c102.teal
    out.push(`<rect x="${x0}" y="${top + i * dy}" width="${w(v).toFixed(1)}" height="${barH}" rx="5" fill="${col}" stroke="${c102.tealInk}" stroke-width="1.2"/>`)
    out.push(fn102Txt(x0 - 12, top + i * dy + 17, `f(${i + 1})`, 13, c102.ink, 'end', '600'))
    out.push(fn102Txt(x0 + w(v) + 12, top + i * dy + 17, `${v}`, 12.5, c102.tealInk, 'start', i === 6 ? '600' : '400'))
  })
  out.push(`<rect x="440" y="210" width="180" height="72" rx="9" fill="${c102.panelB}" stroke="${c102.teal}" stroke-width="1.4"/>`)
  out.push(fn102Txt(530, 234, 'the same laws price', 11.5, c102.mid))
  out.push(fn102Txt(530, 252, 'f(1/3) = 5/3  and  f(−4) = −20', 12.5, c102.ink, 'middle', '600'))
  out.push(fn102Txt(530, 270, 'rational + negative rungs', 11.5, c102.mid))
  out.push(fn102Txt(W / 2, H - 10, 'seven natural rungs, one seed — the ladder never asks for a formula', 12, c102.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (S2) the order-3 cycle of 1/(1−x) */
function fn102Ex3CycleSvg(): string {
  const W = 640, H = 250
  const cx = W / 2, R = 88, cy = 128
  const st = [
    { a: -90, v: '2' },
    { a: 150, v: '−1' },
    { a: 30, v: '1/2' },
  ]
  const pos = (a: number) => ({ x: cx + R * Math.cos((a * Math.PI) / 180), y: cy + R * Math.sin((a * Math.PI) / 180) })
  const edge = [
    { from: 0, to: 1, lab: 'f' },
    { from: 1, to: 2, lab: 'f²' },
    { from: 2, to: 0, lab: 'f³ = id' },
  ]
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The order-3 machine 1 over (1 minus x): the witness 2 orbits 2 to −1 to 1/2 and back to 2 in three steps.">`,
    fn102ArrowDef(),
    fn102Txt(cx, 22, 'the order-3 machine: f(x) = 1/(1−x)', 13.5, c102.tealInk, 'middle', '600'),
  ]
  edge.forEach((e) => {
    const p1 = pos(st[e.from].a + 38), p2 = pos(st[e.to].a - 38)
    const ccw = 1
    out.push(`<path d="M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${R} ${R} 0 0 ${ccw} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}" stroke="${c102.conn}" stroke-width="1.8" fill="none" marker-end="url(#fn102Arrow)"/>`)
    const mid = pos((st[e.from].a + st[e.to].a) / 2 + (st[e.to].a < st[e.from].a ? 180 : 0))
    out.push(fn102Txt(mid.x, mid.y + 4, e.lab, 12.5, c102.conn, 'middle', '600'))
  })
  st.forEach((s) => {
    const p = pos(s.a)
    out.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="26" fill="${c102.panelB}" stroke="${c102.teal}" stroke-width="1.6"/>`)
    out.push(fn102Txt(p.x, p.y + 5, s.v, 15, c102.ink, 'middle', '600'))
  })
  out.push(fn102Txt(cx, cy + 5, '3 steps', 12.5, c102.tealInk, 'middle', '600'))
  out.push(fn102Txt(cx, H - 10, 'the witness 2 returns home — every non-excluded witness does', 12, c102.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (S3) the exercise squeeze bracket */
function fn102ExSqueezeSvg(): string {
  const W = 640, H = 220
  const c = 2 * Math.sqrt(2)
  const xOf = (v: number) => 110 + (v - 2.826) * (460 - 110) / (2.832 - 2.826)
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The exercise bracket: 1.414 below square root 2 below 1.415 traps f of root 2 between 2.828 and 2.830, closing on 2.8284271.">`,
    fn102Txt(W / 2, 26, 'the bracket 1.414 < √2 < 1.415', 13.5, c102.tealInk, 'middle', '600'),
    `<rect x="${xOf(2.828).toFixed(1)}" y="58" width="${(xOf(2.830) - xOf(2.828)).toFixed(1)}" height="36" rx="6" fill="${c102.panelA}" stroke="${c102.accent}" stroke-width="1.4"/>`,
    fn102Txt(xOf(2.828) - 8, 81, '2.828', 12, c102.ink, 'end', '600'),
    fn102Txt(xOf(2.830) + 8, 81, '2.830', 12, c102.ink, 'start', '600'),
    `<line x1="90" y1="130" x2="560" y2="130" stroke="${c102.struct}" stroke-width="1.6"/>`,
    `<path d="M 560 130 l -8 -4 l 0 8 z" fill="${c102.struct}"/>`,
    `<circle cx="${xOf(c).toFixed(1)}" cy="130" r="5.5" fill="${c102.accent}" stroke="${c102.white}" stroke-width="1.4"/>`,
    fn102Txt(xOf(c), 162, '2.8284271', 13, c102.tealInk, 'middle', '600'),
    fn102Txt(xOf(c), 180, '= 2√2, the unique survivor', 12, c102.mid),
    fn102Txt(W / 2, H - 10, 'monotonicity carried the bracket; the ladder priced its ends', 12, c102.mid),
  ]
  out.push(`</svg>`)
  return out.join('')
}

/* (S4) the Gauss staircase of the xy-rule */
function fn102ExGaussSvg(): string {
  const W = 640, H = 280
  const vals = [1, 3, 6, 10, 15, 21] // T1..T6
  const base = 226, x0 = 70, bw = 52, gap = 26
  const h = (v: number) => 14 + v * 7.2
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The Gauss staircase: the xy rule climbs the triangular numbers 1, 3, 6, 10, 15, 21, and the same law reaches f of 100 equals 5050.">`,
    fn102Txt(W / 2, 26, 'the xy-rule climbs the triangular numbers', 13.5, c102.tealInk, 'middle', '600'),
    `<line x1="46" y1="${base}" x2="560" y2="${base}" stroke="${c102.struct}" stroke-width="1.6"/>`,
  ]
  vals.forEach((v, i) => {
    const x = x0 + i * (bw + gap)
    out.push(`<rect x="${x}" y="${(base - h(v)).toFixed(1)}" width="${bw}" height="${h(v).toFixed(1)}" rx="5" fill="${i === 5 ? c102.accent : c102.teal}" stroke="${c102.tealInk}" stroke-width="1.2"/>`)
    out.push(fn102Txt(x + bw / 2, base - h(v) - 8, `${v}`, 12.5, c102.tealInk, 'middle', '600'))
    out.push(fn102Txt(x + bw / 2, base + 20, `f(${i + 1})`, 12, c102.ink, 'middle', '600'))
  })
  out.push(`<rect x="452" y="52" width="164" height="66" rx="9" fill="${c102.panelB}" stroke="${c102.teal}" stroke-width="1.4"/>`)
  out.push(fn102Txt(534, 76, 'the same law, far out:', 11.5, c102.mid))
  out.push(fn102Txt(534, 98, 'f(100) = 5050', 14, c102.ink, 'middle', '600'))
  out.push(fn102Txt(W / 2, H - 10, 'each stair adds one more than the last — f(n+1) = f(n) + n + 1', 12, c102.mid))
  out.push(`</svg>`)
  return out.join('')
}

export const lesson102: Lesson = {
  id: 'aa-functional-equations-building-functions-from-rules',
  number: '10.2',
  title: 'Functional Equations: Building Functions from Rules',
  concepts: [
    'the functional equation',
    'the value ladder',
    'the constant cleanup',
    'the product rule',
    'the involution',
    'the orbit cycle',
    'the solution census',
  ],
  objectives: [
    'Read a functional equation as a rule the machine must obey at every admissible input pair, and solve for the machine itself.',
    'Climb the value ladder from one seed to naturals, negatives, and rationals — no continuity assumed.',
    'Clean a shifted rule by absorbing its constant, and regenerate polynomial solutions from cross-term rules.',
    'Census the product families with computed refutations for the impostor machines.',
    'Sweep iteration cycles of involutions and Mobius machines, and price remote iterates by cycle length.',
  ],
  prerequisites: [
    'aa-composition-machines-in-series',
    'aa-inverse-functions-the-machine-undone',
    'aa-mathematical-induction-the-domino-principle',
    'aa-logarithms-the-inverse-machine',
  ],
  sources: ['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra'],
  blocks: [
    { kind: 'para', text: 'Every lesson so far handed you a machine and asked what it *does*: here is $f(x) = 2^x$, here is $\\log_2 x$, now differentiate their behavior, sum their series, invert their flow. A functional equation reverses the traffic. It hands you the *doing* — a rule about how values combine — and asks for the machine. The rule $f(x+y) = f(x) + f(y)$ never mentions a formula; it legislates. Your task is to find every machine that obeys the legislation, on the domain stated.' },
    { kind: 'para', text: 'This is the rule-first turn, and it is the oldest game in the book of analysis. The machines this course built — the composition series of \`aa-composition-machines-in-series\`, the undoing of \`aa-inverse-functions-the-machine-undone\` — were all *given* by formulas. The competition arc asks the harder question: which formulas could have produced this behavior? The answer is usually a family, and the craft is a census: find all solutions, not one.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — functional equation', text: 'A *functional equation* on a domain $D$ is a condition tying the values of a function $f$ at combined inputs — sums, products, or iterates — that must hold for every admissible pair in $D$. A *solution* is any machine $f$ satisfying the condition at every such pair. Thus, $f(x+y) = f(x) + f(y)$ is a law about all pairs $(x, y)$, and $f(x) = 3x$ is one of its solutions on the reals.' },
    { kind: 'para', text: 'For example, three rules you have already met as *laws*, now read as legislation:' },
    { kind: 'list', marker: 'roman', items: [
      '$f(x+y) = f(x) \\cdot f(y)$ — the exponent law $a^{x+y} = a^x a^y$ of chapter 9, read backward;',
      '$f(xy) = f(x) + f(y)$ — the logarithm product law of \`aa-the-laws-of-logarithms-and-the-change-of-base\`, read backward;',
      '$f(x+y) = f(x) + f(y)$ — the linearity of straight-line machines, now on trial.',
    ] },
    { kind: 'para', text: 'The lesson runs five craft moves: the value ladder (additive rules), the constant cleanup (shifted rules), the polynomial try (cross-term rules), the product census, and the cycle sweep (iterated rules). Each move is a banked law worn backwards — that is the synthesis this chapter exists to perform.' },
    { kind: 'para', text: 'One discipline governs everything: the *census*. A single machine that obeys a rule proves nothing about the rule — the zero machine obeys half the rules in this lesson. A solution is complete only when the whole family is named, the domain is stated, and every impostor machine carries its computed refutation. When you finish a functional-equation problem, the sentence worth writing is not "$f(x) = 3x$ satisfies the rule" but "the solutions are exactly the machines of shape such-and-such, on the domain so-and-so" — and this lesson practices that sentence five times over.' },
    { kind: 'callout', tone: 'historical', title: 'History — Cauchy and the first census', text: 'The additive equation is the oldest functional equation in analysis. Augustin-Louis Cauchy, in his 1821 analysis course, settled its continuous case: additive plus continuous forces $f(x) = cx$. The wild non-continuous solutions had to wait for the late nineteenth century, when Hamel built them with the axiom of choice. The lesson you are reading walks the safe half of that history — the half the examination syllabus rewards.' },

    /* ---------------- the value ladder ---------------- */
    { kind: 'heading', text: 'The Value Ladder — the Master Craft' },
    { kind: 'para', text: 'Take the additive rule on the reals with one seed: $f(x+y) = f(x) + f(y)$ and $f(1) = 3$. No formula is given, and none is needed — the rule itself is a ladder-building machine. Climb it rung by rung and a single seed prices an infinite shelf of values.' },
    { kind: 'para', text: 'Notice what the seed buys. The rule is one sentence, the seed is one number, and together they decide $f$ on a set no formula could enumerate — every rational, negative and positive, proper and improper. In the other direction the ladder is a *test*: a machine that claims additivity must survive the rungs, and most fail fast — the square machine dies at $(1,2)$, where $9 \ne 5$, before any cleverness is spent. This two-way power, generate and refute, is why the additive rule is the master craft: every other rule in this lesson is either a translation of it, a multiplicative cousin of it, or an iteration past it.' },
    { kind: 'derivation', title: 'Climbing the additive ladder from one seed', statement: 'Let $f$ satisfy $f(x+y) = f(x) + f(y)$ on the reals with $f(1) = 3$. Derive $f(0)$, the natural rungs, the negative rungs, and the rational rungs.', steps: [
      { label: 'The zero rung', formula: 'f(0) = f(0) + f(0)', explanation: 'Set $x = y = 0$: the value $f(0)$ equals its own double, and the only number that does is $0$. So $f(0) = 0$ — forced, never assumed.' },
      { label: 'The natural rungs', formula: 'f(n+1) = f(n) + f(1)', explanation: 'Set $y = 1$: each natural is the previous rung plus the seed. This is a recurrence, and the domino principle of \`aa-mathematical-induction-the-domino-principle\` runs it from $f(0) = 0$ to $f(n) = 3n$ for every natural $n$.' },
      { label: 'The negative rungs', formula: 'f(x) + f(-x) = f(0) = 0', explanation: 'Set $y = -x$: the pair sums to zero, so $f(-x) = -f(x)$. Oddness is forced by the rule — no symmetry assumption was ever made.' },
      { label: 'The rational rungs', formula: 'q \\cdot f\\!\\left( \\frac{p}{q} \\right) = f(p)', explanation: 'Add $p/q$ to itself $q$ times; the rule collapses the stack to $f(p)$, so $f(p/q) = f(p)/q = 3p/q$. The rationals fall to bookkeeping.' },
    ], result: 'Thus, $f(n) = 3n$ on the naturals, $f(-x) = -f(x)$ everywhere, and $f(p/q) = 3p/q$ on the rationals — one seed priced an entire number system, with $f(2026) = 6078$, $f(1/2) = 3/2$, and $f(-7) = -21$ as witnesses.' },
    { kind: 'example', title: 'Illustration 1 — An additive $f$ has $f(1) = 3$. Price $f(2026)$, $f(1/2)$, and $f(-7)$.', steps: [
      'Split: the ladder law gives $f(n) = 3n$ on the naturals, so $f(2026) = 3 \\cdot 2026 = 6078$.',
      'Take the rational rung: $2 \\cdot f(1/2) = f(1) = 3$, so $f(1/2) = 3/2$.',
      'Take the negative rung: $f(-7) = -f(7) = -21$, oddness being forced.',
      'Hence $f(2026) = 6078$, $f(1/2) = 3/2$, and $f(-7) = -21$ — one seed, three rungs, no continuity anywhere.',
    ] },
    { kind: 'figure', caption: 'Figure 1 — the value ladder at seed 3: every rung is the previous rung plus the seed f(1) = 3, so one value prices them all.', svg: fn102LadderSvg() },
    { kind: 'para', text: 'A word on notation, because the cycles ahead make it matter. The symbol $f^2(x)$ is ambiguous in the wild: for trigonometric machines it means $(f(x))^2$, but for iteration rules it means $f(f(x))$ — the machine fed its own output. This lesson uses the iteration meaning exclusively and writes squares as $f(x)^2$ when it needs them. The ambiguity is not pedantry: the involution condition $f(f(x)) = x$ and the square condition $f(x)^2 = x$ describe entirely different machines, and a misread turns a four-cycle into a two-cycle — an error the engine sweeps would catch instantly, but the examination hall will not.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the honest scope of the ladder', text: 'The ladder above reaches every *rational* input using only the rule and the seed — no continuity, no monotonicity, no graph. On the *full* real line the ladder alone cannot cross to irrational inputs, and without a regularity assumption (monotonicity, boundedness on an interval, or continuity) genuinely wild non-linear solutions of the additive rule exist. Name the assumption, or stay on the rationals: that is the honest scope, and the doorstep the next chapter crosses.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the ladder stops at the rationals', text: 'It is tempting to write "$f(x) = 3x$ for all real $x$" straight from the seed. The ladder licenses that conclusion on $\\mathbb{Q}$ only. For irrationals you must add a regularity hypothesis — the next section shows monotonicity doing the job — or the claim overshoots what the rule proves.' },
    { kind: 'para', text: 'Read the ladder once more, slowly, because its economy is the whole point. One seed value $f(1) = 3$ — a single number — priced $f(2026)$, $f(1/2)$, and $f(-7)$, and would equally price $f(10^{100})$ or $f(-1/999)$. Nothing about a *formula* was ever needed: the rule itself is a value-generating machine, and the seed is its only fuel. Competition items exploit exactly this economy — they hand you one value and ask for another that looks unreachable, and the ladder is the route. The engine behind this lesson swept the domino to $n = 50$ and the rational rungs at six fresh fractions before a word of prose was written.' },

    /* ---------------- monotone + additive ---------------- */
    { kind: 'heading', text: 'Monotone and Additive Forces Linearity' },
    { kind: 'para', text: 'The honest scope of the ladder leaves a gap exactly one number system wide: the irrationals. The gap closes with one extra hypothesis. If the additive machine is also *increasing*, then rational brackets — the same device that built every real index in \`aa-the-exponential-family-every-real-index\` — squeeze the irrational values into place. This is the squeeze re-welded onto functions.' },
    { kind: 'derivation', title: 'The two-sided ladder', statement: 'Let $f$ be additive and increasing with $f(1) = 2$. Show that $f(x) = 2x$ for every real $x$, trapping $f(\\sqrt2)$ on the way.', steps: [
      { label: 'The rational brackets', formula: '1.41 < \\sqrt{2} < 1.42', explanation: 'Every real sits between rationals, and an increasing $f$ carries the bracket through: $f(1.41) < f(\\sqrt2) < f(1.42)$.' },
      { label: 'The carried band', formula: '2 \\cdot 1.41 < f(\\sqrt{2}) < 2 \\cdot 1.42', explanation: 'The rational rungs price the ends: $f(1.41) = 2.82$ and $f(1.42) = 2.84$, so $f(\\sqrt2)$ is trapped in a band of width $0.02$.' },
      { label: 'The nesting', formula: 'p_n < x < q_n, \\quad p_n, q_n \\to x', explanation: 'Tighter brackets nest: $1.4142 < \\sqrt2 < 1.4143$ traps $f(\\sqrt2)$ between $2.8284$ and $2.8286$, and each new decimal of $\\sqrt2$ divides the band by ten.' },
      { label: 'The closure', formula: 'f(x) = 2x', explanation: 'Band widths shrink to zero, so exactly one number survives every band. The same nesting works at any real $x$, so the increasing additive machine is linear on the whole line.' },
    ], result: 'Thus, $f(\\sqrt2) = 2\\sqrt2 \\approx 2.8284271$, and in general an additive increasing $f$ with $f(1) = c$ obeys $f(x) = cx$ on all of $\\mathbb{R}$ — monotonicity is a license the ladder cashes.' },
    { kind: 'example', title: 'Illustration 2 — An additive increasing $f$ has $f(1) = 2$. Trap $f(\\sqrt2)$ in the band from $1.41 < \\sqrt2 < 1.42$, then close it.', steps: [
      'Split: monotonicity carries brackets — $1.41 < \\sqrt2 < 1.42$ gives $f(1.41) < f(\\sqrt2) < f(1.42)$.',
      'Take: the rational rungs price the ends — $2.82 < f(\\sqrt2) < 2.84$.',
      'Now, nest: $1.4142 < \\sqrt2 < 1.4143$ gives $2.8284 < f(\\sqrt2) < 2.8286$, ten times tighter.',
      'So, every band shrinks to zero width, and the unique survivor is $2\\sqrt2$.',
      'Hence $f(\\sqrt2) = 2\\sqrt2 \\approx 2.8284271$ — the squeeze, re-welded onto a function nobody wrote down.',
    ] },
    { kind: 'figure', caption: 'Figure 2 — the monotone squeeze: rational brackets on √2 become bands on f(√2) that nest to zero width, leaving the single survivor 2√2 = 2.8284271.', svg: fn102SqueezeSvg() },
    { kind: 'para', text: 'Monotonicity is not the only key that opens the irrational gate — it is merely the cheapest. The regularity menu: an additive $f$ that is *bounded* on any single interval is linear; an additive $f$ that is *continuous* at even one point is linear; an additive $f$ that is *increasing* is linear, as the derivation showed. Each hypothesis, however weak it looks, is enough to collapse the wild solutions. What no hypothesis can replace is the honesty: state which one you are using, because the bare rule alone never crosses from $\\mathbb{Q}$ to $\\mathbb{R}$. The examination arc asks for monotone squeezes because the brackets are computable — you can *show* the bands shrinking, as Figure 2 does, rather than invoke a theorem from the shadows.' },

    /* ---------------- the shifted ladder ---------------- */
    { kind: 'heading', text: 'The Shifted Ladder — the Constant Cleanup' },
    { kind: 'para', text: 'Rules rarely arrive additive in their birthday clothes. The commonest disguise is a trailing constant: $f(x+y) = f(x) + f(y) + 1$. The craft move is janitorial — absorb the constant into a new machine $g(x) = f(x) + 1$, watch the rule collapse to plain additivity, run the ladder, and translate back. One substitution converts an unfamiliar rule into the master craft.' },
    { kind: 'example', title: 'Illustration 3 — Solve $f(x+y) = f(x) + f(y) + 1$ with $f(1) = 3$ on the rationals, and price $f(5)$.', steps: [
      'Split: absorb the constant — set $g(x) = f(x) + 1$, and the rule becomes $g(x+y) = g(x) + g(y)$ with $g(1) = 4$.',
      'Take: the additive ladder prices $g(x) = 4x$ on the rationals, so translating back gives $f(x) = 4x - 1$.',
      'Check: at the seed $f(1) = 3$; and the rule both ways at $(2,5)$ — $f(7) = 27$ while $f(2) + f(5) + 1 = 7 + 19 + 1 = 27$; the engine confirms the same agreement at $(0,7)$, $(1,1)$, and $(3.5, 2.5)$.',
      'Hence $f(x) = 4x - 1$ on $\\mathbb{Q}$ and $f(5) = 19$ — absorb, re-ladder, translate back.',
    ] },
    { kind: 'para', text: 'The cleanup also runs in reverse — and the reverse read is where examiners hide the trap. Given a machine like $f(x) = 4x - 1$, you can *discover* its rule: compute $f(x+y) = 4(x+y) - 1$ and $f(x) + f(y) + 1 = (4x - 1) + (4y - 1) + 1 = 4(x+y) - 1$, and the two agree — so this machine witnesses the shifted rule. Discovery and verification are the same computation read in opposite directions, which is why shifted-rule questions convert so reliably into cleanup questions: the exam cannot ask one without smuggling in the other.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the class rule', text: 'A shifted additive rule is a translation of a plain one. The cleanup $g = f + c$ works because the constant appears *symmetrically*: it contributes $2c$ to the right side and can be folded into the left by one substitution. Whenever a rule differs from a banked shape by a constant, try the absorption before anything cleverer.' },
    { kind: 'para', text: 'Recognition is half the craft. A shifted rule announces itself by dimension-reading: if every term in the equation is a value of $f$ except one lonely constant, the cleanup will work; if the stray term involves the *inputs* — like the $xy$ of the next section — no translation can absorb it, because no constant added to $f$ can cancel a term that changes with $x$ and $y$. Train the reflex: read the rule, classify the stray term, and only then choose the move. The engine tested the cleanup at four witness pairs including the half-integer pair $(3.5, 2.5)$, because rules that hold only on integers are the classic trap — a genuine solution must survive fractional inputs too.' },

    /* ---------------- the quadratic regeneration ---------------- */
    { kind: 'heading', text: 'The Quadratic Regeneration Rule' },
    { kind: 'para', text: 'Raise the stakes: let the rule carry a cross-term. The law $f(x+y) = f(x) + f(y) + xy$ mixes the *inputs* into the value — no constant cleanup can absorb that. What survives is stranger and better: the triangular numbers of \`aa-sigma-notation-and-the-classical-power-sums\`, regenerating as function values.' },
    { kind: 'example', title: 'Illustration 4 — The rule $f(x+y) = f(x) + f(y) + xy$ with $f(1) = 1$ regenerates the Gauss sum. Price $f(6)$ and $f(100)$.', steps: [
      'Split: set $y = 1$ — the domino reads $f(n+1) = f(n) + f(1) + n = f(n) + n + 1$, climbing from $f(1) = 1$.',
      'Take: $f(2) = 3$, $f(3) = 6$, $f(4) = 10$ — the triangular numbers, so the closed form is $f(n) = n(n+1)/2$.',
      'Check: the rule at $(2,3)$ — $f(5) = 15$ while $f(2) + f(3) + 2 \\cdot 3 = 3 + 6 + 6 = 15$; at $(5,7)$ — $f(12) = 78 = 15 + 28 + 35$; and $f(0) = 0$ is forced by $x = y = 0$.',
      'Hence $f(6) = 21$ and $f(100) = 5050$ — the Gauss sum reborn as a rung of a function ladder.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note — why the cross-term regenerates a square', text: 'The rule says the *increase* of $f$ over an interval of length $1$ is the input plus one — precisely the growth law of $x(x+1)/2$. A quadratic is what a linear cross-term accumulates. Chapter 5 met this as the power sums; here the same numbers arrive as the *only* rational solution shape the rule permits.' },
    { kind: 'para', text: 'There is a second, slicker route to the same closed form — the diagonal read. Set $y = x$: the rule becomes $f(2x) = 2f(x) + x^2$, a scaling law. Set $y = -x$ instead: $f(0) = f(x) + f(-x) - x^2$, which prices the even part of $f$ as $x^2/2$ plus the odd part. Splitting the machine into even and odd pieces — the decomposition of `aa-even-and-odd-functions-and-extensions` — shows the odd piece must itself be additive, so the census on the rationals reads: an additive machine plus $x^2/2$ in the even slot. The seed $f(1) = 1$ then elects $f(x) = x(x+1)/2$ from that family. Two routes, one answer — and the agreement is itself a check.' },

    /* ---------------- the product family ---------------- */
    { kind: 'heading', text: 'The Product Family — Chapter Nine Read as Rules' },
    { kind: 'para', text: 'Replace the plus on the left by a product rule on the right and chapter 9 walks in. The law $f(x+y) = f(x) \\cdot f(y)$ is the exponent law $a^{x+y} = a^x a^y$ read backward: instead of *using* the law, the rule *demands* it, and the exponential family is the census answer.' },
    { kind: 'derivation', title: 'The product ladder from its zero rung', statement: 'Let $f$ satisfy $f(x+y) = f(x) \\cdot f(y)$ with $f(0) \\ne 0$ and $f(1) = 3$. Derive $f(0)$, the natural rungs, and the negative rungs.', steps: [
      { label: 'The zero rung', formula: 'f(0) = f(0)^{2}', explanation: 'Set $x = y = 0$: the value multiplies itself, so $f(0)$ is $0$ or $1$ — and the standing assumption $f(0) \\ne 0$ elects $f(0) = 1$.' },
      { label: 'The natural rungs', formula: 'f(n) = f(1)^{\\,n}', explanation: 'Set $y = 1$ repeatedly: every step multiplies by the seed, so the naturals climb geometrically — $f(4) = 3^4 = 81$.' },
      { label: 'The negative rungs', formula: 'f(1) \\cdot f(-1) = f(0) = 1', explanation: 'Set $y = -x$: the product must return $1$, so $f(-1) = 1/3$ and $f(-2) = 1/9$ — reciprocals, forced.' },
      { label: 'The family read', formula: 'f(x) = 3^{x}', explanation: 'On the rationals the ladder leaves no other choice, and the machine $x \\mapsto 3^x$ obeys the rule by the exponent law of \`aa-the-exponential-family-every-real-index\`.' },
    ], result: 'Thus, $f(0) = 1$, $f(4) = 81$, and $f(-1) = 1/3$: the product ladder prices the exponential family — a banked law worn backwards is a machine rebuilt from its own shadow.' },
    { kind: 'para', text: 'Why does the census carry the standing assumption $f(0) \\ne 0$ at all? Because without it, the zero machine crashes the party: $f \\equiv 0$ satisfies $f(x+y) = f(x) f(y)$ at every pair, trivially and uselessly. The assumption exiles it, and then the zero rung elects $f(0) = 1$. This is the census discipline in miniature — a family of solutions is only honest after its degenerate members are either named and excluded or named and included, never silently ignored. The same hygiene explains the classic exam phrasing \\"the non-zero solutions of the product rule are exactly the exponentials\\" — the qualifier is doing real mathematical work.' },
    { kind: 'example', title: 'Illustration 5 — A machine obeys $f(x+y) = f(x) \\cdot f(y)$ with $f(0) \\ne 0$ and $f(1) = 3$. Price $f(0)$, $f(4)$, and $f(-2)$.', steps: [
      'Split: the zero rung forces $f(0) = f(0)^2$, and the nonzero assumption elects $f(0) = 1$.',
      'Take: the ladder multiplies — $f(4) = 3^4 = 81$ — and the negative rungs reciprocate — $f(-2) = 1/9$.',
      'Check: $f(1) \\cdot f(-1) = 3 \\cdot 1/3 = 1 = f(0)$, the rule closing on itself.',
      'Hence $f(0) = 1$, $f(4) = 81$, and $f(-2) = 1/9$ — the exponential family, built by rule alone.',
    ] },
    { kind: 'example', title: 'Illustration 6 — Under the same product rule with $f(1) = 3$, price $f(1/2)$ and name the branch.', steps: [
      'Split: $f(1/2)^2 = f(1/2 + 1/2) = f(1) = 3$, so $f(1/2)$ is a square root of $3$.',
      'Take: the equation offers $\\pm\\sqrt3$, and the rule alone does not choose — the positive branch is the standard election.',
      'Check: $1.7320508^2 = 3.0000000$ to seven places, the engine confirms.',
      'Hence $f(1/2) = \\sqrt3 \\approx 1.7320508$ — honest to the branch: the value is licensed only after the election is named.',
    ] },
    { kind: 'para', text: 'Two sibling rules complete the family census. Over *products*, the power machines legislate $f(xy) = f(x) \\cdot f(y)$ — witness $(2 \\cdot 3)^4 = 1296 = 2^4 \\cdot 3^4$ — while the logarithm machines legislate $f(xy) = f(x) + f(y)$, the product law of \`aa-the-laws-of-logarithms-and-the-change-of-base\` read backward. One input operation, two output operations, two families: the census is the point.' },
    { kind: 'example', title: 'Illustration 7 — Verify $f(xy) = f(x) \\cdot f(y)$ for $f(x) = x^4$ and $f(xy) = f(x) + f(y)$ for $f = \\log_2$, both at the pair $(2, 3)$.', steps: [
      'Split: powers over products — $(2 \\cdot 3)^4 = 6^4 = 1296$ and $2^4 \\cdot 3^4 = 16 \\cdot 81 = 1296$.',
      'Take: logarithms over products — $\\log_2 6 = 2.5849625$ and $\\log_2 2 + \\log_2 3 = 1 + 1.5849625 = 2.5849625$.',
      'So, both rules hold on their home machines, each verified at a fresh pair.',
      'Hence $(2 \\cdot 3)^4 = 1296 = 2^4 \\cdot 3^4$ and $\\log_2 6 = 2.5849625 = 1 + 1.5849625$ — two banked families, two rules, both engine-checked.',
    ] },
    { kind: 'table', caption: 'Table 1 — the machine-rule census: which banked machines obey which rules, every NO carrying its computed refutation.', head: ['Machine', 'f(x+y) = f(x)+f(y)', 'f(x+y) = f(x)·f(y)', 'f(xy) = f(x)·f(y)', 'f(xy) = f(x)+f(y)'], rows: [
      ['$f(x) = x^2$', 'NO — $(1+2)^2 = 9 \\ne 1 + 4 = 5$', 'NO — $(1+2)^2 = 9 \\ne 1 \\cdot 4 = 4$', 'YES — $(2 \\cdot 3)^2 = 36 = 4 \\cdot 9$', 'NO — $36 \\ne 4 + 9 = 13$'],
      ['$f(x) = 2^x$', 'NO — $2^3 = 8 \\ne 2 + 4 = 6$', 'YES — $2^3 = 2 \\cdot 4 = 8$', 'NO — $2^6 = 64 \\ne 4 \\cdot 8 = 32$', 'NO — $64 \\ne 4 + 8 = 12$'],
      ['$f(x) = 3^x$', 'NO — $3^5 = 243 \\ne 9 + 27 = 36$', 'YES — $3^5 = 243 = 9 \\cdot 27$', 'NO — $3^6 = 729 \\ne 9 \\cdot 27 = 243$', 'NO — $729 \\ne 9 + 27 = 36$'],
      ['$f(x) = \\log_2 x$', 'NO — $\\log_2 3 = 1.5849625 \\ne 0 + 1$', 'NO — $1.5849625 \\ne 0 \\cdot 1$', 'NO — $\\log_2 6 = 2.5849625 \\ne 1 \\cdot 1.5849625$', 'YES — $\\log_2 6 = 1 + 1.5849625$'],
      ['$f(x) = x^n$ ($n \\ge 2$)', 'NO — same witness as $x^2$', 'NO', 'YES — $(2 \\cdot 3)^4 = 1296 = 16 \\cdot 81$', 'NO'],
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the everything-is-linear trap', text: 'Students pattern-match a new rule to the nearest banked law without checking. The census above is the antidote: $x^2$ fails additivity at $(1,2)$ — $9 \\ne 5$ — and $2^x$ fails it at $(1,2)$ — $8 \\ne 6$. Worse, coincidences happen: $f(x) = x + 1$ *passes* the product rule at $(2,3)$ because both sides read $7$, and fails only at $(2,4)$, where $9 \\ne 8$. One witness never proves a rule; one computed refutation always kills it.' },
    { kind: 'para', text: 'The census table rewards a second reading. Notice that the YES cells cluster along a hidden pattern: machines built from one operation — pure exponentials, pure logarithms, pure powers — obey exactly the rule that converts that operation, while machines that mix operations obey nothing. The pattern is the *homomorphism* idea, a structure-preserving map, and the table is its first census. Full abstraction waits for a later shelf; the craft here is reading the table fast enough to settle a Multiple Correct item in under a minute, one computed witness per option.' },

    /* ---------------- iterations and involutions ---------------- */
    { kind: 'heading', text: 'Iterations and Involutions — Chapter One Cashed' },
    { kind: 'para', text: 'The last rule family says nothing about sums or products: it legislates the machine\'s *own orbit*. Composition — the series wiring of \`aa-composition-machines-in-series\` — feeds a machine its own output, and the simplest legislation is $f(f(x)) = x$: the machine that undoes itself in one pass.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — involution', text: 'A machine $f$ is said to be an *involution* if $f(f(x)) = x$ for every $x$ in its domain — the machine composed with itself is the identity. Thus, $f$ is its own inverse, and every application flips the input to a partner that flips it back.' },
    { kind: 'para', text: 'For example, three involutions already sitting in your bank:' },
    { kind: 'list', marker: 'roman', items: [
      'the reflection $f(x) = c - x$ — every mirror read about the vertical axis $x = c/2$;',
      'the reciprocal $f(x) = 1/x$ — undoing itself on both sides of zero;',
      'the coordinate swap $(x, y) \mapsto (y, x)$ — the transposition that chapter 1 used to define symmetry itself.',
    ] },
    { kind: 'example', title: 'Illustration 8 — Verify that $f(x) = 7 - x$ and $f(x) = 1/x$ ($x \\ne 0$) are involutions, pricing $f(f(3))$ and $f(f(2))$ respectively.', steps: [
      'Split: the reflection — $f(3) = 4$ and $f(4) = 7 - 4 = 3$, so $f(f(3)) = 3$; symbolically $7 - (7 - x) = x$.',
      'Take: the reciprocal — $f(2) = 1/2$ and $f(1/2) = 2$, so $f(f(2)) = 2$; symbolically $1/(1/x) = x$.',
      'So, each machine undoes itself in one pass — order 2.',
      'Hence $f(f(3)) = 3$ for $7 - x$ and $f(f(2)) = 2$ for $1/x$ — two involutions, both witnessed.',
    ] },
    { kind: 'para', text: 'Longer orders exist, and the classic is a Mobius machine — a ratio of linear polynomials. Its orbit closes not at two steps but at four, and the derivation is pure algebra.' },
    { kind: 'derivation', title: 'The square of the order-four machine', statement: 'For $f(x) = \\frac{x-1}{x+1}$ (with $x \\ne -1$), compute $f^2(x)$ and identify the cycle.', steps: [
      { label: 'The inside read', formula: 'f(x) = \\frac{x-1}{x+1}', explanation: 'Feed the machine its own output: the second pass runs on $\\frac{x-1}{x+1}$, which never equals the excluded value $-1$.' },
      { label: 'The substitution', formula: 'f^{2}(x) = \\frac{\\frac{x-1}{x+1} - 1}{\\frac{x-1}{x+1} + 1}', explanation: 'Replace $x$ by $\\frac{x-1}{x+1}$ in the formula — bookkeeping, not insight.' },
      { label: 'The cleanup', formula: 'f^{2}(x) = \\frac{\\frac{-2}{x+1}}{\\frac{2x}{x+1}}', explanation: 'The numerator folds to $\\frac{-2}{x+1}$ and the denominator to $\\frac{2x}{x+1}$ — the $x+1$ denominators are common.' },
      { label: 'The collapse', formula: 'f^{2}(x) = -\\frac{1}{x}', explanation: 'The common factor cancels, leaving $-1/x$ — a machine nobody planted, grown by the rule.' },
    ], result: 'Thus, $f^2(x) = -\\frac{1}{x}$; feeding once more gives $f^3(x) = \\frac{1+x}{1-x}$, and once more returns $f^4(x) = x$ — a four-cycle, so $f^{2026} = f^2$ because $2026 \\equiv 2 \\pmod 4$.' },
    { kind: 'example', title: 'Illustration 9 — For $f(x) = \\frac{x-1}{x+1}$, price $f(2)$, $f^2(2)$, $f^3(2)$, $f^4(2)$, and then $f^{2026}(2)$.', steps: [
      'Split: $f(2) = \\frac{2-1}{2+1} = 1/3$.',
      'Take: $f^2(2) = f(1/3) = \\frac{1/3 - 1}{1/3 + 1} = \\frac{-2/3}{4/3} = -1/2$.',
      'Now: $f^3(2) = f(-1/2) = \\frac{-1/2 - 1}{-1/2 + 1} = \\frac{-3/2}{1/2} = -3$.',
      'And: $f^4(2) = f(-3) = \\frac{-4}{-2} = 2$ — the return; the engine sweeps the same four-cycle on $3.5$, $-0.5$, $7$, and $0.25$.',
      'Hence $f(2) = 1/3$, $f^2(2) = -1/2$, $f^3(2) = -3$, $f^4(2) = 2$ — and since $2026 \\equiv 2 \\pmod 4$, $f^{2026}(2) = -1/2$.',
    ] },
    { kind: 'para', text: 'Order two, order four — what about order three? The machine $f(x) = \\frac{1}{1-x}$ closes its loop in three steps, and the check is a three-line computation that the engine swept on four witnesses before it entered this prose. The *order* of a machine is the length of the shortest loop its orbits close; involutions are order 2, the Mobius machine above is order 4, and the one below is order 3. Orders higher than 4 exist but require stranger machines; the examination arc lives at orders 2, 3, and 4, and the craft is always the same — compute the first few iterates, spot the return, reduce the remote exponent modulo the cycle length.' },
    { kind: 'example', title: 'Illustration 10 — For $f(x) = \\frac{1}{1-x}$ (where defined), compute $f(2)$, $f^2(2)$, $f^3(2)$ and conclude the order.', steps: [
      'Split: $f(2) = \\frac{1}{1-2} = -1$ — the first station.',
      'Take: $f^2(2) = f(-1) = \\frac{1}{1-(-1)} = \\frac{1}{2}$ — the second.',
      'Now: $f^3(2) = f(1/2) = \\frac{1}{1-1/2} = 2$ — the return, on the third step exactly.',
      'Hence $f(2) = -1$, $f^2(2) = 1/2$, $f^3(2) = 2$ — an order-3 machine, swept by the engine on $5$, $0.5$, and $-3$ as well.',
    ] },
    { kind: 'figure', caption: 'Figure 3 — the order-4 machine as a cycle of four stations; the witness 2 orbits 2 → 1/3 → −1/2 → −3 → 2, and every remote iterate reduces by 2026 ≡ 2 (mod 4).', svg: fn102CycleSvg() },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where the rules land in JEE Main (exam-style)', text: 'Exam-style items across this arc, honestly labelled: additive ladders appear as Numerical Value asks (price $f(2026)$ from a seed); product rules appear as Single Correct asks about $f(0)$ or negative rungs; the census appears as Multiple Correct asks — which machines obey which rule — where every NO option hides a computable refutation; and iteration cycles appear as Numerical Value asks on remote iterates like $f^{2027}(7)$, settled by cycle length. Nothing here claims a real paper — these are the typologies the syllabus arc rewards.' },

    /* ---------------- the craft summary ---------------- */
    { kind: 'heading', text: 'The Craft Summary — the Routing Table' },
    { kind: 'para', text: 'Five rule-shapes, five moves. Read the shape, route the craft:' },
    { kind: 'list', items: [
      'Additive shape $f(x+y) = f(x) + f(y)$ — climb the value ladder: seed, naturals, negatives, rationals.',
      'Shifted shape $f(x+y) = f(x) + f(y) + c$ — clean the constant with $g = f + c$, re-ladder, translate back.',
      'Cross-term shape $f(x+y) = f(x) + f(y) + xy$ — run the domino and try the polynomial $x(x+1)/2$ shape.',
      'Product shapes $f(x+y) = f(x) f(y)$ or $f(xy) = f(x) \\pm f(y)$ — census the exponentials, the powers, and the logarithms, refutations computed.',
      'Iteration shape $f(f(x)) = \\dots$ — sweep the orbit, find the cycle length, reduce remote iterates mod it.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note — every rule is a banked law worn backwards', text: 'The exponent law, the log product law, the domino principle, the inverse machine — each rule in this lesson is a law you already owned, turned around and asked to produce its own subject. That is what synthesis means at the doorstep: nothing new is needed, only the courage to read old laws as constraints.' },
    { kind: 'para', text: 'And the routing table is the hinge of the chapter. The next lesson maps the whole book onto one page — the census of ten chapters, the wiring of who feeds whom, the formula shelf gathered in one place — and audits the map with cross-chapter chains in which a substitution from 10.1, a rule from here, and a squeeze from the doorstep all appear in a single question. The rule-first turn is also a mindset turn: from here to the end of the syllabus, when a problem hands you a behavior and asks for a machine, the first move is settled — read the shape, route the craft, and let a banked law do the work it was always meant to do.' },

    /* ---------------- vocabulary ---------------- */
    { kind: 'terms', items: [
      { term: 'functional equation', def: 'A condition on a function tying its values at combined inputs — sums, products, or iterates — holding for every admissible pair; solving means finding the machines that obey.' },
      { term: 'solution family', def: 'The complete set of machines satisfying a rule on its domain; a census answer names the family, not one member.' },
      { term: 'the value ladder', def: 'The climb from one seed $f(1)$ to all naturals by $f(n+1) = f(n) + f(1)$, then to negatives by oddness and rationals by $q \\cdot f(p/q) = f(p)$.' },
      { term: 'the constant cleanup', def: 'Absorbing a trailing constant via $g = f + c$ so a shifted additive rule collapses to a plain one; re-ladder, then translate back.' },
      { term: 'the product rule', def: 'A rule multiplying or adding outputs over combined inputs — the exponent law, the power law, and the log law read backward as legislation.' },
      { term: 'the involution', def: 'A machine with $f(f(x)) = x$ — its own inverse; reflections $c - x$ and the reciprocal $1/x$ are the canonical witnesses.' },
      { term: 'the orbit', def: 'The sequence $x, f(x), f^2(x), \\ldots$ of iterated values; for cyclic machines the orbit is a closed loop and remote iterates reduce mod the cycle length.' },
      { term: 'the census', def: 'The discipline of testing which banked machines obey a new rule, every NO carrying a computed refutation and every YES a verified witness.' },
    ] },

    /* ---------------- formula cards ---------------- */
    { kind: 'formula', name: 'The additive ladder', latex: 'f(n) = n \\cdot f(1)', note: 'on the naturals by the domino; rationals by $q \\cdot f(p/q) = f(p)$; negatives by oddness.' },
    { kind: 'formula', name: 'The constant cleanup', latex: 'g(x) = f(x) + c', note: 'a shifted additive rule becomes plain additive; solve, then translate back with $f = g - c$.' },
    { kind: 'formula', name: 'The product ladder', latex: 'f(n) = f(1)^{\\,n}', note: 'with $f(0) = 1$ forced; negative rungs reciprocate, $f(-1) = 1/f(1)$.' },
    { kind: 'formula', name: 'The quadratic regeneration', latex: 'f(x) = \\frac{x(x+1)}{2}', note: 'the rule $f(x+y) = f(x) + f(y) + xy$ at seed $1$; $f(100) = 5050$, the Gauss sum.' },
    { kind: 'formula', name: 'The order-four cycle', latex: 'x \\;\\mapsto\\; \\frac{x-1}{x+1} \\;\\mapsto\\; -\\frac{1}{x} \\;\\mapsto\\; \\frac{1+x}{1-x} \\;\\mapsto\\; x', note: 'the Mobius machine closes in four; remote iterates reduce mod 4.' },
    { kind: 'formula', name: 'The monotone-linear squeeze', latex: 'p_n < x < q_n \\;\\Rightarrow\\; c\\,p_n < f(x) < c\\,q_n', note: 'additive plus monotone pins $f(x) = cx$ on all of $\\mathbb{R}$.' },

    /* ---------------- quiz ---------------- */
    { kind: 'quiz', items: [
      { q: 'An additive $f$ has $f(1) = 3$. Then $f(2026)$ equals:', options: ['$4052$', '$6078$', '$6081$', '$6077$'], answer: 1,
        explain: 'The correct option is $6078$: the ladder gives $f(n) = 3n$, and $3 \\cdot 2026 = 6078$. Option $4052$ climbs with the wrong seed, $2 \\cdot 2026$. Option $6081$ is $3 \\cdot 2027$, an off-by-one on the input. Option $6077$ subtracts $1$ as if a shifted rule were in play — it is not.' },
      { q: 'A machine obeys $f(x+y) = f(x) f(y)$ with $f(0) \\ne 0$. Then $f(0)$ equals:', options: ['$0$', '$3$', '$1$', 'Any value — the rule does not constrain $f(0)$'], answer: 2,
        explain: 'The correct option is $1$: setting $x = y = 0$ gives $f(0) = f(0)^2$, so $f(0)$ is $0$ or $1$, and the assumption $f(0) \\ne 0$ elects $1$. Option $0$ is the excluded root. Option $3$ confuses $f(0)$ with the seed $f(1)$. The last option is false — the equation forces the choice.' },
      { q: 'A rule reads $f(x+y) = f(x) + f(y) + 1$ with $f(1) = 3$. Then $f(5)$ equals:', options: ['$19$', '$15$', '$20$', '$16$'], answer: 0,
        explain: 'The correct option is $19$: clean up with $g = f + 1$, so $g$ is additive with $g(1) = 4$; then $g(5) = 20$ and $f(5) = 19$. Option $15$ runs $3 \\cdot 5$, forgetting the shift entirely. Option $20$ reports $g(5)$ and forgets to translate back. Option $16$ is an arithmetic slip on the cleanup.' },
      { q: 'For $f(x) = \\frac{x-1}{x+1}$ with $x \\ne -1$, the value $f(f(2))$ is:', options: ['$2$', '$-1/2$', '$1/2$', '$3$'], answer: 1,
        explain: 'The correct option is $-1/2$: $f(2) = 1/3$, and $f(1/3) = \\frac{-2/3}{4/3} = -1/2$ — the second station of the four-cycle. Option $2$ claims the machine is an involution; it is order 4, not 2. Option $1/2$ drops the sign of the numerator fold. Option $3$ misplaces the collapse $\\frac{-2}{2}$.' },
      { q: 'Which machine obeys $f(xy) = f(x) + f(y)$ on the positive reals?', options: ['$2^x$', '$x^2$', '$\\log_2 x$', '$x + 1$'], answer: 2,
        explain: 'The correct option is $\\log_2 x$: the log product law gives $\\log_2(xy) = \\log_2 x + \\log_2 y$. Option $2^x$ fails — $2^6 = 64 \\ne 4 + 8 = 12$ at $(2,3)$. Option $x^2$ fails — $36 \\ne 4 + 9 = 13$. Option $x + 1$ fails — at $(2,4)$, $9 \\ne 8$; its pass at $(2,3)$ is a coincidence.' },
    ] },

    /* ---------------- exercises ---------------- */
    { kind: 'exercises', title: 'The drill bench — Single Correct, Multiple Correct and Numerical Value drills, fresh witnesses from L1 to L6 (JEE arc, exam-style)', sets: [
      { level: 'L1', questions: [
        { q: 'An additive $f$ has $f(1) = 5$. Price $f(7)$, $f(1/3)$, and $f(-4)$.', solution: [
          'Split: the ladder law gives $f(n) = 5n$ on the naturals, so $f(7) = 35$.',
          'Take the rational rung: $3 \\cdot f(1/3) = f(1) = 5$, so $f(1/3) = 5/3$.',
          'And the negative rung: $f(-4) = -f(4) = -20$, oddness being forced.',
          'Check: the rule at $(2,5)$ — $f(7) = 35$ while $f(2) + f(5) = 10 + 25 = 35$ ✓.',
          'Hence $f(7) = 35$, $f(1/3) = 5/3$, and $f(-4) = -20$ — three rungs, one seed, one refutation-proof rule.',
        ], answer: '$f(7) = 35$, $f(1/3) = 5/3$, $f(-4) = -20$', figures: [{ caption: 'The seed-5 ladder: seven natural rungs climb to f(7) = 35, while the same laws price the rational rung f(1/3) = 5/3 and the negative rung f(−4) = −20.', svg: fn102ExLadderSvg() }] },
        { q: 'A machine obeys $f(x+y) = f(x) f(y)$ with $f(0) \\ne 0$ and $f(1) = 2$. Price $f(0)$, $f(10)$, and $f(-1)$.', solution: [
          'Split: the zero rung forces $f(0) = f(0)^2$, and the nonzero assumption elects $f(0) = 1$.',
          'Take: the ladder multiplies by the seed — $f(10) = 2^{10} = 1024$.',
          'And: the negative rung reciprocates — $f(1) f(-1) = f(0) = 1$, so $f(-1) = 1/2$.',
          'Hence $f(0) = 1$, $f(10) = 2^{10} = 1024$, and $f(-1) = 1/2$ — the product ladder at seed 2.',
        ], answer: '$f(0) = 1$, $f(10) = 1024$, $f(-1) = 1/2$' },
        { q: 'Show that $f(x) = 7 - x$ is an involution, and verify it at $x = 3$.', solution: [
          'Split: compose the machine with itself — $f(f(x)) = 7 - (7 - x) = x$ for every input.',
          'Take: at $x = 3$, $f(3) = 4$ and $f(4) = 3$, so $f(f(3)) = 3$.',
          'Hence $f(f(x)) = x$ — an involution, witnessed at $3$ (and the engine sweeps $-2$, $10.5$, $0$ too).',
        ], answer: 'yes — $f(f(x)) = x$, e.g. $f(f(3)) = 3$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Solve $f(x+y) = f(x) + f(y) + 2$ with $f(1) = 4$ on the rationals, and price $f(5)$.', solution: [
          'Split: absorb the constant — set $g(x) = f(x) + 2$, so $g(x+y) = g(x) + g(y)$ with $g(1) = 6$.',
          'Take: the additive ladder prices $g(x) = 6x$ on $\\mathbb{Q}$, so $f(x) = 6x - 2$.',
          'Check: at $(3,4)$ — $f(7) = 40$ while $f(3) + f(4) + 2 = 16 + 22 + 2 = 40$; and at the seed $f(1) = 4$ ✓.',
          'Hence $f(x) = 6x - 2$ on $\\mathbb{Q}$ and $f(5) = 28$ — absorb, re-ladder, translate back.',
        ], answer: '$f(x) = 6x - 2$ on ℚ, and $f(5) = 28$' },
        { q: 'A machine obeys $f(xy) = f(x) f(y)$ on the positives with $f(2) = 16$. Name the power machine and price $f(3)$.', solution: [
          'Split: the power family $f(x) = x^n$ obeys the rule — $(xy)^n = x^n y^n$ — so the seed should read $f(2) = 2^n$.',
          'Take: $16 = 2^4$, so $n = 4$ and the machine is $f(x) = x^4$.',
          'Check: $f(2) f(3) = 16 \\cdot 81 = 1296$ and $f(6) = 6^4 = 1296$ ✓.',
          'Hence $f(x) = x^4$ and $f(3) = 81$ — the multiplicative family at exponent 4.',
        ], answer: '$f(x) = x^4$, and $f(3) = 81$' },
        { q: 'Census: does $f(x) = 3^x$ obey $f(x+y) = f(x) f(y)$? Does it obey $f(x+y) = f(x) + f(y)$? Compute your witnesses.', solution: [
          'Split: the product read at $(2,3)$ — $3^{2+3} = 243$ and $3^2 \\cdot 3^3 = 9 \\cdot 27 = 243$ ✓.',
          'Take: the sum read at the same pair — $9 + 27 = 36$, and $243 \\ne 36$.',
          'So, the machine is multiplicative over sums but not additive over them.',
          'Hence yes to the product read ($3^5 = 243 = 9 \\cdot 27$) and no to the sum read ($243 \\ne 36$) — one machine, one rule, one refutation.',
        ], answer: 'yes to the product read ($243 = 9 \\cdot 27$); no to the sum read ($243 \\ne 36$)' },
      ] },
      { level: 'L3', questions: [
        { q: 'An additive $f$ has $f(1) = 3$. Price $f(7/5)$, $f(-9/4)$, and $f(12/6)$.', solution: [
          'Split: the rational rung $q \\cdot f(p/q) = f(p) = 3p$ prices any fraction.',
          'Take: $5 \\cdot f(7/5) = 21$, so $f(7/5) = 21/5 = 4.2$; and $4 \\cdot f(-9/4) = -27$, so $f(-9/4) = -27/4 = -6.75$.',
          'Now: $12/6$ reduces to $2$ before the ladder runs — $f(12/6) = f(2) = 6$.',
          'Hence $f(7/5) = 4.2$, $f(-9/4) = -6.75$, and $f(12/6) = 6$ — reduce first, ladder second.',
        ], answer: '$4.2$, $-6.75$, and $6$' },
        { q: 'The rule $f(x+y) = f(x) + f(y) + xy$ with $f(1) = 1$ runs its domino. Price $f(2)$, $f(3)$, and $f(10)$.', solution: [
          'Split: set $y = 1$ — the domino reads $f(n+1) = f(n) + 1 + n$, climbing from $f(1) = 1$.',
          'Take: $f(2) = 1 + 1 + 1 = 3$; then $f(3) = 3 + 1 + 2 = 6$; then $f(4) = 6 + 1 + 3 = 10$ — the triangular numbers.',
          'So: the closed form is $f(n) = n(n+1)/2$, and the engine confirms it to $n = 100$.',
          'Hence $f(2) = 3$, $f(3) = 6$, and $f(10) = 55$ — the staircase of triangular numbers.',
        ], answer: '$f(2) = 3$, $f(3) = 6$, $f(10) = 55$' },
        { q: 'For $f(x) = 1/(1-x)$ (where defined), compute $f(2)$, $f^2(2)$, $f^3(2)$, and conclude the order of the machine.', solution: [
          'Split: $f(2) = 1/(1-2) = -1$.',
          'Take: $f^2(2) = f(-1) = 1/(1+1) = 1/2$.',
          'Now: $f^3(2) = f(1/2) = 1/(1-1/2) = 2$ — the return; the engine sweeps $5$, $0.5$, and $-3$ through the same three-step loop.',
          'Hence $f(2) = -1$, $f^2(2) = 1/2$, $f^3(2) = 2$ — the machine closes an order-3 cycle.',
        ], answer: '$f(2) = -1$, $f^2(2) = 1/2$, $f^3(2) = 2$ — order 3', figures: [{ caption: 'The order-3 machine 1/(1−x): the witness 2 orbits 2 → −1 → 1/2 → 2, closing the loop in three steps.', svg: fn102Ex3CycleSvg() }] },
      ] },
      { level: 'L4', questions: [
        { q: 'A machine obeys $f(x+y) = f(x) f(y)$ with $f(0) \\ne 0$ and $f(1) = 3$. Price $f(-2)$ and $f(1/2)$, naming any branch you elect.', solution: [
          'Split: the negative rungs reciprocate — $f(1) f(-1) = 1$ and $f(2) f(-2) = 1$, so $f(-2) = 1/3^2 = 1/9$.',
          'Take: the half rung satisfies $f(1/2)^2 = f(1) = 3$, so $f(1/2) = \\pm\\sqrt3$.',
          'Now: the rule alone does not choose — the positive branch is the standard election, $f(1/2) = \\sqrt3$.',
          'Hence $f(-2) = 1/9$ and $f(1/2) = \\sqrt3 \\approx 1.7320508$ — the branch named, the value honest.',
        ], answer: '$f(-2) = 1/9$, $f(1/2) = \\sqrt{3} \\approx 1.7320508$ (positive branch)' },
        { q: 'Show that $f(x) = \\frac{x+1}{x-1}$ (with $x \\ne 1$) is an involution, and verify it at $2$, $5$, and $0.5$.', solution: [
          'Split: compose — $f(f(x)) = \\frac{\\frac{x+1}{x-1} + 1}{\\frac{x+1}{x-1} - 1} = \\frac{\\frac{2x}{x-1}}{\\frac{2}{x-1}} = x$.',
          'Take: $f(2) = 3$ and $f(3) = 2$; $f(5) = 1.5$ and $f(1.5) = 5$; $f(0.5) = -3$ and $f(-3) = 0.5$.',
          'So: every round trip returns home — the algebra and the three witnesses agree.',
          'Hence $f^2(x) = x$ — an involution; e.g. $f(2) = 3$ and $f(3) = 2$.',
        ], answer: '$f^2(x) = x$ — an involution; e.g. $f(2) = 3$ and $f(3) = 2$' },
        { q: 'Under the rule $f(x+y) = f(x) + f(y) + xy$ with $f(1) = 1$, price $f(0)$ and $f(100)$, and verify the closed form obeys the rule at $(2,3)$.', solution: [
          'Split: $x = y = 0$ forces $f(0) = f(0) + f(0) + 0$, so $f(0) = 0$.',
          'Take: the domino of Illustration 4 gives the closed form $f(n) = n(n+1)/2$, so $f(100) = 100 \\cdot 101/2 = 5050$.',
          'Check: at $(2,3)$ — $f(5) = 15$ while $f(2) + f(3) + 2 \\cdot 3 = 3 + 6 + 6 = 15$ ✓.',
          'Hence $f(0) = 0$, $f(100) = 5050$, and the rule check at $(2,3)$ reads $15 = 3 + 6 + 6$ — the Gauss sum, certified twice.',
        ], answer: '$f(0) = 0$, $f(100) = 5050$; the rule check at (2,3): $15 = 3 + 6 + 6$' },
      ] },
      { level: 'L5', questions: [
        { q: 'An additive increasing $f$ has $f(1) = 2$. Trap $f(\\sqrt2)$ using the bracket $1.414 < \\sqrt2 < 1.415$, and conclude its exact value.', solution: [
          'Split: monotonicity carries the bracket — $f(1.414) < f(\\sqrt2) < f(1.415)$.',
          'Take: the rational rungs price the ends — $2 \\cdot 1.414 = 2.828$ and $2 \\cdot 1.415 = 2.830$.',
          'Now: nest the brackets and the bands shrink to zero width; the unique survivor of every band is $2\\sqrt2$.',
          'Hence $2.828 < f(\\sqrt2) < 2.830$ and $f(\\sqrt2) = 2\\sqrt2 \\approx 2.8284271$ — the squeeze, closed.',
        ], answer: '$f(\\sqrt{2}) = 2\\sqrt{2} \\approx 2.8284271$', figures: [{ caption: 'The exercise bracket: 1.414 < √2 < 1.415 traps f(√2) between 2.828 and 2.830, and the unique survivor of every nested band is 2√2 = 2.8284271.', svg: fn102ExSqueezeSvg() }] },
        { q: 'The order-4 machine is $f(x) = \\frac{x-1}{x+1}$. Price $f^{2027}(7)$.', solution: [
          'Split: the cycle has length 4, so reduce the exponent — $2027 = 4 \\cdot 506 + 3$, i.e. $2027 \\equiv 3 \\pmod 4$.',
          'Take: station three of the cycle is $f^3(x) = \\frac{1+x}{1-x}$.',
          'Now: $f^3(7) = \\frac{1+7}{1-7} = \\frac{8}{-6} = -\\frac{4}{3}$.',
          'Hence $f^{2027}(7) = f^3(7) = -4/3 \\approx -1.3333333$ — a remote iterate priced by cycle length alone.',
        ], answer: '$f^{2027}(7) = -4/3 \\approx -1.3333333$' },
      ] },
      { level: 'L6', questions: [
        { q: 'The double rule. A machine on the rationals obeys BOTH $f(x+y) = f(x) + f(y)$ and $f(xy) = f(x) f(y)$, with $f(1) = 1$. Show the pair forces $f(x) = x$ on $\\mathbb{Q}$, and price $f(2026)$ and $f(-3/5)$.', solution: [
          'Split: the additive ladder alone gives $f(q) = c q$ with $c = f(1) = 1$ — linearity with slope 1.',
          'Take: the product rule then demands $f(xy) = f(x) f(y)$; substituting the linear shape gives $c\\,xy = c^2 xy$, so $c = c^2$ and $c \\in \\{0, 1\\}$.',
          'Now: $c = 0$ is the zero machine, excluded by $f(1) = 1$; so $c = 1$ and $f(x) = x$ — the two ladders agree on one machine.',
          'Check: $f(2026) = 2026$ and $f(-3/5) = -3/5$, both direct reads now.',
          'Hence $f(x) = x$ on $\\mathbb{Q}$, with $f(2026) = 2026$ and $f(-3/5) = -0.6$ — the double rule elects the identity.',
        ], answer: '$f(x) = x$ on ℚ; $f(2026) = 2026$, $f(-3/5) = -0.6$' },
        { q: 'The Gauss chain. Under $f(x+y) = f(x) + f(y) + xy$ with $f(1) = 1$: (a) price $f(0)$; (b) run the domino to the closed form; (c) price $f(50)$ and $f(100)$; (d) verify the closed form obeys the rule at $(5,7)$.', solution: [
          'Split (a): $x = y = 0$ forces $f(0) = 0$.',
          'Take (b): the domino $f(n+1) = f(n) + n + 1$ climbs the triangular numbers, so $f(n) = n(n+1)/2$.',
          'Now (c): $f(50) = 50 \\cdot 51/2 = 1275$ and $f(100) = 100 \\cdot 101/2 = 5050$.',
          'And (d): $f(12) = 78$ while $f(5) + f(7) + 5 \\cdot 7 = 15 + 28 + 35 = 78$ ✓.',
          'Hence $f(0) = 0$, the closed form is $f(n) = n(n+1)/2$, $f(50) = 1275$, $f(100) = 5050$ — the Gauss staircase, certified at every step.',
        ], answer: '$f(0) = 0$; $f(n) = n(n+1)/2$; $f(50) = 1275$, $f(100) = 5050$', figures: [{ caption: 'The Gauss staircase: the xy-rule climbs the triangular numbers 1, 3, 6, 10, 15, 21, …, and the same law reaches f(100) = 5050.', svg: fn102ExGaussSvg() }] },
      ] },
    ] },
  ],
}

// ------------------------------------------------------------------
// lesson 10.3 — run 122 (delivered whole, integrated verbatim)
// ------------------------------------------------------------------
/**
 * part-aa103.ts — Advanced Algebra, lesson 10.3 "The Book in One Page: Synthesis"
 * (agent aa103, run-122 swarm). Companion engine: v-aa103.ts (verify-first).
 *
 * SPEC-VS-ENGINE CATCH (recorded per spec §0/§8): the spec printed
 * log10 C(50,25) = 14.1017; the engine's full-precision value 14.101783514802…
 * rounds to 14.1018 at 4 dp. THE ENGINE WINS — the prose below prints 14.1018
 * and the binomial-digit Illustration says so. Every other printed number was
 * recomputed by the engine and matched the spec exactly.
 *
 * Figure law: prefix syn103; VIVID palette only; viewBox with >= 8px margins;
 * role="img" + aria-label; strokes >= 1.2px; SVG text PLAIN (no $, no TeX).
 */


/* ------------------------------------------------------------------ */
/* Figure helpers — every coordinate computed from named constants     */
/* ------------------------------------------------------------------ */

const SYN = {
  structure: '#16a34a',
  primary: '#166534',
  mid: '#65a30d',
  teal: '#0d9488',
  conn: '#d97706',
  accent: '#ea580c',
  tealInk: '#0f766e',
  warn: '#dc2626',
  panelA: '#fef3c7',
  panelB: '#ffedd5',
  sep: '#fcd34d',
  faint: '#5eead4',
  white: '#ffffff',
} as const

function syn103Poly(pts: Array<[number, number]>): string {
  return pts.map((p, i) => (i === 0 ? 'M ' : 'L ') + p[0].toFixed(2) + ' ' + p[1].toFixed(2)).join(' ')
}

/* (a) body figure — the book's wiring diagram: ten stations on one rail */
function syn103Wiring(): string {
  const W = 920
  const H = 208
  const railY = 116
  const x0 = 62
  const x1 = 858
  const n = 10
  const step = (x1 - x0) / (n - 1)
  const st: string[][] = [
    ['1', 'Functions', 'machine grammar', 'witness: 49 vs 19'],
    ['2', 'Quadratic', 'the vertex', 'witness: max 11 @ x = 3'],
    ['3', 'Complex', 'closure repaired', 'witness: (1+i)^8 = 16'],
    ['4', 'Inequalities', 'bounds as tools', 'witness: min 12 @ x = 2/3'],
    ['5', 'Series', 'sums priced', 'witness: sum k/2^k = 2'],
    ['6', 'Counting', 'exact counts', 'witness: C(10,3) = 120'],
    ['7', 'Induction +', 'Binomial', 'witness: row 12 = 4096'],
    ['8', 'Equations', 'deep algebra', 'witness: a^3+b^3 = 112'],
    ['9', 'Exp · Log', 'inverse family', 'witness: 31 digits'],
    ['10', 'Synthesis', 'the map + limit', 'witness: this page'],
  ]
  const hand = ['tools', 'closure', 'bounds', 'pricing', 'precision', 'proof', 'expansion', 'deepening', 'the map']
  let s = '<svg role="img" aria-label="The wiring of the book: ten chapter stations on one rail, each handing a tool to the next, with each station witness printed beneath" viewBox="0 0 920 208" xmlns="http://www.w3.org/2000/svg">'
  s += '<defs><marker id="awWire" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="' + SYN.conn + '"/></marker></defs>'
  s += '<text x="460" y="18" text-anchor="middle" font-size="12.5" font-weight="bold" fill="' + SYN.accent + '">THE WIRING — one rail, ten stations, every handoff a tool the next chapter assumes</text>'
  s += '<line x1="' + (x0 - 20) + '" y1="' + railY + '" x2="' + (x1 + 14) + '" y2="' + railY + '" stroke="' + SYN.conn + '" stroke-width="2.4" marker-end="url(#awWire)"/>'
  for (let i = 0; i < n; i++) {
    const x = x0 + i * step
    if (i < n - 1) {
      const hx = x0 + (i + 0.5) * step
      s += '<text x="' + hx.toFixed(1) + '" y="' + (railY - 26) + '" text-anchor="middle" font-size="10.5" font-weight="bold" fill="' + SYN.conn + '">' + hand[i] + '</text>'
    }
    s += '<circle cx="' + x.toFixed(1) + '" cy="' + railY + '" r="15" fill="' + SYN.structure + '" stroke="' + SYN.primary + '" stroke-width="1.6"/>'
    s += '<text x="' + x.toFixed(1) + '" y="' + (railY + 4.5) + '" text-anchor="middle" font-size="11.5" font-weight="bold" fill="' + SYN.white + '">' + st[i][0] + '</text>'
    s += '<text x="' + x.toFixed(1) + '" y="' + (railY + 36) + '" text-anchor="middle" font-size="11" font-weight="bold" fill="' + SYN.primary + '">' + st[i][1] + '</text>'
    s += '<text x="' + x.toFixed(1) + '" y="' + (railY + 50) + '" text-anchor="middle" font-size="9.5" fill="' + SYN.mid + '">' + st[i][2] + '</text>'
    s += '<text x="' + x.toFixed(1) + '" y="' + (railY + 64) + '" text-anchor="middle" font-size="9" fill="' + SYN.tealInk + '">' + st[i][3] + '</text>'
  }
  s += '</svg>'
  return s
}

/* (b) body figure — the honesty ledger: promise | owning door */
function syn103Ledger(): string {
  const W = 920
  const H = 336
  const rows: string[][] = [
    ['9.1 — the nested-bracket convergence proof for the sum of k/2^k', 'Calculus'],
    ['9.5 — e as a limit: the 2.7182818 series was used, its limit unproved', 'Calculus'],
    ['9.6 — the fast-series remainder: how close S_n sits to e was bounded', 'Calculus'],
    ['the squeezes of ch. 5 assumed the completeness of the reals', 'Real Analysis'],
    ['the instantaneous rate — 10.4 walks to the wall and names it', 'Calculus · 10.4'],
    ['the ε–δ machinery — the honest language of limits, never opened', 'Calculus'],
  ]
  let s = '<svg role="img" aria-label="The honesty ledger as a two-column diagram: six deferred promises on the left, each joined by an arrow to the door that owns it on the right" viewBox="0 0 920 336" xmlns="http://www.w3.org/2000/svg">'
  s += '<defs><marker id="awLedger" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="' + SYN.conn + '"/></marker></defs>'
  s += '<text x="460" y="18" text-anchor="middle" font-size="12.5" font-weight="bold" fill="' + SYN.accent + '">THE HONESTY LEDGER — every deferred proof has an address</text>'
  s += '<text x="40" y="46" font-size="12" font-weight="bold" fill="' + SYN.primary + '">THE PROMISE — used, never proved</text>'
  s += '<text x="560" y="46" font-size="12" font-weight="bold" fill="' + SYN.tealInk + '">THE DOOR THAT OWNS IT</text>'
  for (let i = 0; i < rows.length; i++) {
    const y = 66 + i * 44
    s += '<line x1="500" y1="' + (y + 19) + '" x2="552" y2="' + (y + 19) + '" stroke="' + SYN.conn + '" stroke-width="1.8" marker-end="url(#awLedger)"/>'
    s += '<rect x="40" y="' + y + '" width="460" height="38" rx="6" fill="' + SYN.panelA + '" stroke="' + SYN.sep + '" stroke-width="1.4"/>'
    s += '<text x="52" y="' + (y + 17) + '" font-size="10.8" fill="' + SYN.primary + '">' + rows[i][0] + '</text>'
    s += '<text x="52" y="' + (y + 31) + '" font-size="9.2" fill="' + SYN.mid + '">used in this book · proved nowhere in it</text>'
    s += '<rect x="560" y="' + y + '" width="320" height="38" rx="6" fill="' + SYN.panelB + '" stroke="' + SYN.sep + '" stroke-width="1.4"/>'
    s += '<text x="572" y="' + (y + 24) + '" font-size="13.5" font-weight="bold" fill="' + SYN.tealInk + '">' + rows[i][1] + '</text>'
  }
  s += '</svg>'
  return s
}

/* (c) body figure — one question, three registers (the max-chain as stations) */
function syn103Chain(): string {
  const W = 920
  const H = 302
  const cx0 = 460
  const cy0 = 158
  const r = 52
  let s = '<svg role="img" aria-label="The max-chain: one central question x(6-x) connected to three register boxes, AM-GM, discriminant and completed square, each certifying the same maximum 9 at x = 3" viewBox="0 0 920 302" xmlns="http://www.w3.org/2000/svg">'
  s += '<text x="460" y="22" text-anchor="middle" font-size="12.5" font-weight="bold" fill="' + SYN.accent + '">ONE QUESTION · THREE REGISTERS · max x(6−x) = 9 at x = 3</text>'
  // connectors first (behind)
  s += '<line x1="' + (cx0 - 44) + '" y1="' + (cy0 - 30) + '" x2="352" y2="96" stroke="' + SYN.conn + '" stroke-width="1.8"/>'
  s += '<line x1="' + (cx0 - 44) + '" y1="' + (cy0 + 30) + '" x2="352" y2="240" stroke="' + SYN.conn + '" stroke-width="1.8"/>'
  s += '<line x1="' + (cx0 + r) + '" y1="' + cy0 + '" x2="568" y2="' + cy0 + '" stroke="' + SYN.conn + '" stroke-width="1.8"/>'
  // central node
  s += '<circle cx="' + cx0 + '" cy="' + cy0 + '" r="' + r + '" fill="' + SYN.structure + '" stroke="' + SYN.primary + '" stroke-width="2"/>'
  s += '<text x="' + cx0 + '" y="' + (cy0 - 2) + '" text-anchor="middle" font-size="15" font-weight="bold" fill="' + SYN.white + '">x(6−x)</text>'
  s += '<text x="' + cx0 + '" y="' + (cy0 + 16) + '" text-anchor="middle" font-size="10" fill="' + SYN.white + '">maximise it</text>'
  // register boxes
  const box = (x: number, y: number, head: string, l2: string, l3: string) => {
    let b = '<rect x="' + x + '" y="' + y + '" width="304" height="76" rx="8" fill="' + SYN.panelA + '" stroke="' + SYN.sep + '" stroke-width="1.5"/>'
    b += '<text x="' + (x + 14) + '" y="' + (y + 20) + '" font-size="10.5" font-weight="bold" fill="' + SYN.mid + '">' + head + '</text>'
    b += '<text x="' + (x + 14) + '" y="' + (y + 42) + '" font-size="12" font-weight="bold" fill="' + SYN.primary + '">' + l2 + '</text>'
    b += '<text x="' + (x + 14) + '" y="' + (y + 62) + '" font-size="10" fill="' + SYN.tealInk + '">' + l3 + '</text>'
    return b
  }
  s += box(48, 58, 'REGISTER 1 · AM–GM (ch. 4)', 'x(6−x) ≤ ((x + (6−x))/2)² = 3² = 9', 'equality when the two parts agree: x = 3')
  s += box(48, 202, 'REGISTER 2 · DISCRIMINANT (ch. 2)', 'x² − 6x + 9: D = 36 − 36 = 0, double root', 'the single root x = 3 is where the top lives')
  s += box(568, 120, 'REGISTER 3 · THE SQUARE (ch. 4)', 'x(6−x) = 9 − (x−3)² ≤ 9', 'equality exactly when (x−3)² = 0, i.e. x = 3')
  s += '</svg>'
  return s
}

/* solution figure — the pen optimisation parabola A = -2(x-5)^2 + 50 */
function syn103Pen(): string {
  const W = 460
  const H = 300
  const X = (u: number) => 40 + (u + 1) * (380 / 12)
  const Y = (v: number) => 268 - (v + 8) * (230 / 63)
  const pts: Array<[number, number]> = []
  for (let u = -0.5; u <= 10.5001; u += 0.25) pts.push([X(u), Y(-2 * (u - 5) * (u - 5) + 50)])
  let s = '<svg role="img" aria-label="The pen area parabola A equals minus two times x minus five squared plus fifty, with maximum 50 at x = 5, symmetry probes at 48, and degenerate roots at 0 and 10" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">'
  s += '<rect x="8" y="8" width="444" height="284" fill="' + SYN.white + '"/>'
  s += '<line x1="' + X(-1) + '" y1="' + Y(0) + '" x2="' + X(11) + '" y2="' + Y(0) + '" stroke="' + SYN.mid + '" stroke-width="1.4"/>'
  s += '<line x1="' + X(0) + '" y1="' + Y(-8) + '" x2="' + X(0) + '" y2="' + Y(55) + '" stroke="' + SYN.mid + '" stroke-width="1.4"/>'
  s += '<text x="' + (X(11) - 4) + '" y="' + (Y(0) + 16) + '" font-size="11" fill="' + SYN.primary + '">x</text>'
  s += '<text x="' + (X(0) - 14) + '" y="' + (Y(55) + 12) + '" font-size="11" fill="' + SYN.primary + '">A</text>'
  s += '<path d="' + syn103Poly(pts) + '" fill="none" stroke="' + SYN.structure + '" stroke-width="2.2"/>'
  s += '<line x1="' + X(5) + '" y1="' + Y(50) + '" x2="' + X(5) + '" y2="' + Y(0) + '" stroke="' + SYN.conn + '" stroke-width="1.3" stroke-dasharray="5 4"/>'
  s += '<circle cx="' + X(5) + '" cy="' + Y(50) + '" r="4" fill="' + SYN.accent + '"/>'
  s += '<text x="' + (X(5) + 8) + '" y="' + (Y(50) - 6) + '" font-size="11" font-weight="bold" fill="' + SYN.accent + '">max 50 at x = 5</text>'
  s += '<circle cx="' + X(4) + '" cy="' + Y(48) + '" r="3.2" fill="' + SYN.teal + '"/>'
  s += '<circle cx="' + X(6) + '" cy="' + Y(48) + '" r="3.2" fill="' + SYN.teal + '"/>'
  s += '<text x="' + (X(6) + 8) + '" y="' + (Y(48) + 14) + '" font-size="10" fill="' + SYN.tealInk + '">A(4) = A(6) = 48</text>'
  s += '<circle cx="' + X(0) + '" cy="' + Y(0) + '" r="3.2" fill="' + SYN.warn + '"/>'
  s += '<circle cx="' + X(10) + '" cy="' + Y(0) + '" r="3.2" fill="' + SYN.warn + '"/>'
  s += '<text x="' + (X(10) - 10) + '" y="' + (Y(0) + 16) + '" font-size="10" fill="' + SYN.warn + '">x = 10 (degenerate)</text>'
  s += '<text x="' + (X(0) + 6) + '" y="' + (Y(0) + 16) + '" font-size="10" fill="' + SYN.warn + '">x = 0</text>'
  s += '<text x="' + (X(5) + 6) + '" y="' + (Y(0) - 8) + '" font-size="10" fill="' + SYN.conn + '">axis x = 5</text>'
  s += '</svg>'
  return s
}

/* solution figure — the complex plane for z = 1 + i√3 */
function syn103Complex(): string {
  const W = 480
  const H = 300
  const ox = 248
  const oy = 152
  const u = 21
  const zx = ox + u
  const zy = oy - Math.sqrt(3) * u
  const arcR = 26
  const ax = ox + arcR * Math.cos(Math.PI / 3)
  const ay = oy - arcR * Math.sin(Math.PI / 3)
  const lx = ox + 36 * Math.cos(Math.PI / 6)
  const ly = oy - 36 * Math.sin(Math.PI / 6)
  let s = '<svg role="img" aria-label="The complex plane showing z = 1 + i root 3 at modulus 2 and angle sixty degrees, its modulus arrow, the angle arc pi over 3, and z cubed = minus 8 on the negative real axis" viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg">'
  s += '<defs><marker id="awCx" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="' + SYN.accent + '"/></marker></defs>'
  s += '<line x1="' + (ox - 9.4 * u) + '" y1="' + oy + '" x2="' + (ox + 10.4 * u) + '" y2="' + oy + '" stroke="' + SYN.mid + '" stroke-width="1.4"/>'
  s += '<line x1="' + ox + '" y1="' + (oy + 6.4 * u) + '" x2="' + ox + '" y2="' + (oy - 6.4 * u) + '" stroke="' + SYN.mid + '" stroke-width="1.4"/>'
  s += '<circle cx="' + ox + '" cy="' + oy + '" r="' + 2 * u + '" fill="none" stroke="' + SYN.faint + '" stroke-width="1.4" stroke-dasharray="4 4"/>'
  s += '<line x1="' + ox + '" y1="' + oy + '" x2="' + zx + '" y2="' + zy + '" stroke="' + SYN.accent + '" stroke-width="2.2" marker-end="url(#awCx)"/>'
  s += '<path d="M ' + (ox + arcR) + ' ' + oy + ' A ' + arcR + ' ' + arcR + ' 0 0 0 ' + ax.toFixed(1) + ' ' + ay.toFixed(1) + '" fill="none" stroke="' + SYN.teal + '" stroke-width="1.8"/>'
  s += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" font-size="11.5" font-weight="bold" fill="' + SYN.tealInk + '">π/3</text>'
  s += '<text x="' + (ox + 14) + '" y="' + (oy + 22) + '" font-size="11" font-weight="bold" fill="' + SYN.accent + '">|z| = 2</text>'
  s += '<circle cx="' + zx + '" cy="' + zy + '" r="4.2" fill="' + SYN.structure + '"/>'
  s += '<text x="' + (zx + 8) + '" y="' + (zy - 8) + '" font-size="11.5" font-weight="bold" fill="' + SYN.primary + '">z = 1 + i√3</text>'
  s += '<circle cx="' + (ox - 8 * u) + '" cy="' + oy + '" r="4.2" fill="' + SYN.teal + '"/>'
  s += '<text x="' + (ox - 8 * u - 8) + '" y="' + (oy + 22) + '" font-size="11.5" font-weight="bold" fill="' + SYN.tealInk + '">z³ = −8</text>'
  s += '<text x="' + (ox - 14) + '" y="' + (oy + 16) + '" font-size="10.5" fill="' + SYN.mid + '">O</text>'
  s += '<text x="' + (ox + 2 * u - 6) + '" y="' + (zy - 10) + '" font-size="9.5" fill="' + SYN.faint + '">circle |z| = 2</text>'
  s += '</svg>'
  return s
}

/* solution figure — the fence chain: area parabola with the band x in [8, 12] */
function syn103Fence(): string {
  const W = 460
  const H = 300
  const X = (xv: number) => 44 + xv * (376 / 20)
  const Y = (a: number) => 264 - a * (216 / 105)
  const pts: Array<[number, number]> = []
  for (let xv = 0; xv <= 20.001; xv += 0.5) pts.push([X(xv), Y(xv * (20 - xv))])
  let s = '<svg role="img" aria-label="The fence area parabola x times 20 minus x with maximum 100 at x = 10 and the shaded band from x = 8 to 12 where the area is at least 96" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">'
  s += '<rect x="8" y="8" width="444" height="284" fill="' + SYN.white + '"/>'
  s += '<rect x="' + X(8).toFixed(1) + '" y="' + Y(96).toFixed(1) + '" width="' + (X(12) - X(8)).toFixed(1) + '" height="' + (Y(0) - Y(96)).toFixed(1) + '" fill="' + SYN.panelA + '" opacity="0.6"/>'
  s += '<line x1="' + X(0) + '" y1="' + Y(0) + '" x2="' + X(20) + '" y2="' + Y(0) + '" stroke="' + SYN.mid + '" stroke-width="1.4"/>'
  s += '<line x1="' + X(0) + '" y1="' + Y(105) + '" x2="' + X(0) + '" y2="' + Y(0) + '" stroke="' + SYN.mid + '" stroke-width="1.4"/>'
  s += '<path d="' + syn103Poly(pts) + '" fill="none" stroke="' + SYN.structure + '" stroke-width="2.2"/>'
  s += '<circle cx="' + X(10) + '" cy="' + Y(100) + '" r="4" fill="' + SYN.accent + '"/>'
  s += '<text x="' + (X(10) + 8) + '" y="' + (Y(100) - 4) + '" font-size="11" font-weight="bold" fill="' + SYN.accent + '">square: max 100 at x = 10</text>'
  s += '<text x="' + X(10) + '" y="' + (Y(96) - 6) + '" text-anchor="middle" font-size="10.5" font-weight="bold" fill="' + SYN.tealInk + '">area ≥ 96</text>'
  s += '<text x="' + (X(12) + 6) + '" y="' + (Y(96) + 18) + '" font-size="10" fill="' + SYN.primary + '">3 rectangles:</text>'
  s += '<text x="' + (X(12) + 6) + '" y="' + (Y(96) + 32) + '" font-size="10" font-weight="bold" fill="' + SYN.primary + '">96 · 99 · 100</text>'
  s += '<text x="' + (X(12) + 6) + '" y="' + (Y(96) + 46) + '" font-size="10" fill="' + SYN.tealInk + '">their sum 295</text>'
  for (const t of [0, 5, 10, 15, 20]) {
    s += '<line x1="' + X(t) + '" y1="' + Y(0) + '" x2="' + X(t) + '" y2="' + (Y(0) + 5) + '" stroke="' + SYN.mid + '" stroke-width="1.2"/>'
    s += '<text x="' + X(t) + '" y="' + (Y(0) + 18) + '" text-anchor="middle" font-size="10" fill="' + SYN.mid + '">' + t + '</text>'
  }
  s += '<text x="' + (X(20) + 2) + '" y="' + (Y(0) - 8) + '" font-size="11" fill="' + SYN.primary + '">x</text>'
  s += '<text x="' + (X(0) - 16) + '" y="' + (Y(105) + 12) + '" font-size="11" fill="' + SYN.primary + '">A</text>'
  s += '</svg>'
  return s
}

/* solution figure — the digit-count stations for the L6 chain */
function syn103Digits(): string {
  const W = 460
  const H = 226
  const bw = 128
  const bh = 96
  const y0 = 58
  const xs = [24, 166, 308]
  const data: string[][] = [
    ['C(16, 8)', '12870', '5 digits'],
    ['2^16', '65536', '5 digits'],
    ['(1+i)^16', '256', '3 digits'],
  ]
  let s = '<svg role="img" aria-label="Three digit-count stations: C of 16 and 8 equals 12870 with 5 digits, 2 to the 16 equals 65536 with 5 digits, and 1 plus i to the 16 equals 256 with 3 digits" viewBox="0 0 460 226" xmlns="http://www.w3.org/2000/svg">'
  s += '<defs><marker id="awDig" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="' + SYN.conn + '"/></marker></defs>'
  s += '<text x="230" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="' + SYN.accent + '">THE DIGIT-COUNT LAW — digits(N) = floor(log10 N) + 1</text>'
  for (let i = 0; i < 3; i++) {
    s += '<rect x="' + xs[i] + '" y="' + y0 + '" width="' + bw + '" height="' + bh + '" rx="8" fill="' + (i === 1 ? SYN.panelB : SYN.panelA) + '" stroke="' + SYN.sep + '" stroke-width="1.5"/>'
    s += '<text x="' + (xs[i] + bw / 2) + '" y="' + (y0 + 26) + '" text-anchor="middle" font-size="12" font-weight="bold" fill="' + SYN.primary + '">' + data[i][0] + '</text>'
    s += '<text x="' + (xs[i] + bw / 2) + '" y="' + (y0 + 52) + '" text-anchor="middle" font-size="14" font-weight="bold" fill="' + SYN.accent + '">' + data[i][1] + '</text>'
    s += '<text x="' + (xs[i] + bw / 2) + '" y="' + (y0 + 76) + '" text-anchor="middle" font-size="11.5" fill="' + SYN.tealInk + '">' + data[i][2] + '</text>'
    if (i < 2) {
      s += '<line x1="' + (xs[i] + bw + 4) + '" y1="' + (y0 + bh / 2) + '" x2="' + (xs[i + 1] - 4) + '" y2="' + (y0 + bh / 2) + '" stroke="' + SYN.conn + '" stroke-width="1.8" marker-end="url(#awDig)"/>'
    }
  }
  s += '<text x="230" y="192" text-anchor="middle" font-size="10.5" fill="' + SYN.mid + '">log10 C(16,8) = 4.1096 · log10 2^16 = 4.8165 · 256 &lt; 1000</text>'
  s += '<text x="230" y="210" text-anchor="middle" font-size="10.5" fill="' + SYN.tealInk + '">one chain, three registers, every digit count confirmed exactly</text>'
  s += '</svg>'
  return s
}

/* ==================================================================== */
/* THE LESSON                                                           */
/* ==================================================================== */

export const lesson103: Lesson = {
  id: 'aa-the-book-in-one-page-synthesis',
  number: '10.3',
  title: 'The Book in One Page: Synthesis',
  concepts: [
    'the census of ten chapters and their witnesses',
    'the wiring — which chapter feeds which',
    'the formula shelf, gathered in one place',
    'the honesty ledger of deferred proofs',
    'cross-chapter chains as the audit bench',
    'the forward doors and backward anchors',
  ],
  objectives: [
    'Read the ten-row census table and connect every witness to the chapter that owns it',
    'Reconstruct the wiring: why each chapter could not have been written before its predecessor',
    'Use the formula shelf as a one-page retrieval tool across all ten chapter families',
    'State honestly what the book used but never proved, and name the door that owns each debt',
    'Solve cross-chapter chain problems that visit three or more registers in one calculation',
  ],
  prerequisites: [
    'aa-exponentials-and-logarithms-unit-9-review',
    'aa-unit-review-functions-as-objects',
    'al-the-function-idea-the-doorstep',
  ],
  sources: ['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra'],
  blocks: [
    /* ---------------- opening motivation ---------------- */
    { kind: 'para', text: "Nine chapters were walked one machine at a time. Each chapter built one object, certified it with worked structure, and banked it. This page now holds the whole book in one hand: one table that lists what each chapter built, one shelf that gathers the formulas worth recalling cold, one ledger that admits what was used but never proved, and one bench where single calculations cross chapter lines. Nothing here re-teaches — every banked lesson is cited by name, never repeated. The census consolidates; it does not replace." },
    { kind: 'para', text: "The method of this page is the method of the whole book: nothing is remembered that can be recomputed. Every witness printed below was recomputed by brute force before this prose was fixed — the composite machines were actually composed, the vertex was actually scanned on a grid, the complex powers were actually multiplied out, the counts were actually enumerated, the logarithms were actually taken. The census table is therefore not a list of claims; it is a list of computations, each one re-runnable in the companion engine." },
    { kind: 'callout', tone: 'insight', title: 'What "one page" honestly means', text: "One table (the census), one shelf (the formulas), one ledger (the debts), one bench (the chains). A map is not the territory, and this page is not the book — but a map read twice is shorter the second time. The first pass collects the objects; the second pass collects the wiring: who feeds whom, who owes whom, and which door each debt is payable at. That wiring, not the wording, is what you carry out of this page." },
    /* ---------------- the book in one table ---------------- */
    { kind: 'heading', text: 'The book in one table' },
    { kind: 'para', text: "Ten chapters, ten objects, ten witnesses. The middle column names what each chapter BUILT — the object you should be able to pick up and use. The right column prints each object's WITNESS: one computation, recomputed by the engine before this prose was fixed, small enough to check by hand where hand-checking is honest." },
    { kind: 'table', caption: 'The census — ten chapters, ten objects, ten engine-recomputed witnesses', head: ['Chapter', 'The object it built', 'The witness (recomputed)'], rows: [
      ['1 · Functions as Objects', 'the machine grammar — functions as objects you can compose, invert and classify', '$g(f(3)) = 49$ vs $f(g(3)) = 19$ on $f = 2x+1$, $g = x^2$'],
      ['2 · The Quadratic at Depth', 'the vertex — completing the square as a reading tool, the discriminant as a root census', 'max of $-2x^2+12x-7$ is $11$ at $x = 3$ (vertex form $-2(x-3)^2+11$)'],
      ['3 · Complex Numbers', 'the closure repair — arithmetic on the plane, every quadratic solvable', '$(1+i)^8 = 16$'],
      ['4 · Inequalities', 'the classical engine — AM–GM, Cauchy–Schwarz, the square-read', 'min $9x + 4/x = 12$ at $x = 2/3$'],
      ['5 · Sequences and Series', 'the climbs and tails — AP, GP, telescoping, the first honest limit', '$\\sum_{k=1}^{\\infty} k/2^k = 2$, with $S_{10} = 1.98828125$'],
      ['6 · Counting', 'the exact counts — permutations, combinations, distribution censuses', '$C(10,3) = 120$ and $10P3 = 720$'],
      ['7 · Induction + Binomial', 'the proof engine and the binomial expansion', '$\\sum_{k=0}^{12} C(12,k) = 4096$; $\\sum_{k=1}^{100} k = 5050$'],
      ['8 · Theory of Equations', 'the deep polynomial algebra — Vieta, symmetric functions, transformations', '$\\alpha^3 + \\beta^3 = 112$ on $x^2 - 7x + 11$'],
      ['9 · Exponentials and Logarithms', 'the inverse family — the definition pair, the log laws, the digit-count law', '$(\\log_3 4)(\\log_4 5)\\cdots(\\log_8 9) = 2$; $e = 2.7182818$; $2^{100}$ has 31 digits'],
      ['10 · Synthesis + the Doorstep', 'the map and the limit — this page, and the wall the next book walks to', 'the book itself — every row above recomputed, not remembered'],
    ] },
    { kind: 'para', text: "Read the third column as the honest sentence of this lesson: a synthesis earns trust by recomputation, not recollection. Two witnesses even disagree with each other's order — $g(f(3)) = 49$ while $f(g(3)) = 19$ on the same two machines $f = 2x+1$ and $g = x^2$ — and that asymmetry is chapter 1's whole point in one breath: composition is a real operation with a direction. The series witness is equally candid: the engine printed $S_{10} = 1.98828125$ exactly (a dyadic rational), confirmed the closed form $S_n = 2 - (n+2)/2^n$ at seven sizes, and only then let the prose say the sum is 2." },
    { kind: 'equation', latex: '\\text{witness} \\; = \\; \\text{one computation, recomputed — not remembered}', note: 'The discipline of the third column, stated once for the whole table.' },
    { kind: 'para', text: "A witness is small on purpose. A big number impresses nobody who cannot check it; a small one — 49 against 19, 120 against 720, 5050 — can be re-run by hand in a minute and by the engine in a millisecond. That is the whole trick of a trustworthy synthesis: keep every certifying computation small enough to redo, and redo it. When this page was drafted, one printed decimal (a logarithm below) came from a truncated source; the engine caught it and the prose was corrected before it was ever fixed. Small witnesses, honestly recomputed, are the reason you may believe the big ones." },
    /* ---------------- the wiring ---------------- */
    { kind: 'heading', text: 'The wiring' },
    { kind: 'para', text: "The chapters are not a list; they are a chain. Each object was buildable only because the previous object existed to build with. Walk the chain once, slowly — this is the dependency structure the figure below compresses:" },
    { kind: 'list', marker: 'roman', items: [
      "Chapter 1 — Functions as Objects: built the machine grammar. Functions became objects that can be composed, inverted and classified; every later chapter inherits its raw material from here.",
      "Chapter 2 — The Quadratic at Depth: took the simplest non-linear machine and made it a working object — completing the square, the vertex, the discriminant as a census of roots.",
      "Chapter 3 — Complex Numbers: repaired closure. The quadratic's honest failure at $D < 0$ demanded new numbers, and the plane's arithmetic made every quadratic — indeed every polynomial — solvable.",
      "Chapter 4 — Inequalities: turned bounds into tools. AM–GM, Cauchy–Schwarz and the square-read became engines for minima and maxima, not merely comparisons.",
      "Chapter 5 — Sequences and Series: priced the infinite. AP and GP sums, telescoping splits, and the first honest limit — partial sums climbing under a ceiling they never reach.",
      "Chapter 6 — Counting: made quantities exact. Permutations, combinations and distribution censuses turned how-many questions into arithmetic.",
      "Chapter 7 — Induction + Binomial: built the proof engine and its first great expansion; the domino schema and Pascal's triangle feed each other.",
      "Chapter 8 — Theory of Equations: went deep into polynomial algebra — Vieta's pair, symmetric functions, and transformations that move roots without solving.",
      "Chapter 9 — Exponentials and Logarithms: completed the inverse family — the definition pair, the log-law family, and the digit-count law that turns sizes into logs.",
      "Chapter 10 — Synthesis + the Doorstep: drew this map and walked to the wall of instantaneous rate, where the next book's door stands.",
    ] },
    { kind: 'para', text: "The chain rests on ground that was banked, not re-laid — the no-duplication contract of the whole series. Foundation Mathematics banked the number sense this book computes with; the ANS book banked the proof discipline that induction later formalised; and AL, the first algebra course, built the doorstep: its function doorstep is lesson al-the-function-idea-the-doorstep, and its craft lesson on identities and substitutions is lesson al-competition-algebra-identities-and-substitutions. Every chapter of this book cited that ground rather than repeating it: when chapter 1 classified machines, the definition of a function itself was AL's; when chapter 7 proved by induction, the idea of a verified instance was ANS's. This page keeps the same contract — the table above cites, it does not re-teach." },
    { kind: 'figure', caption: 'The wiring of the book: ten stations on one rail; the label on each handoff names the tool the next chapter assumes, and each station carries its own witness from the census table.', svg: syn103Wiring() },
    { kind: 'callout', tone: 'warn', title: 'The rail is the main line, not the only path', text: "Do not read the wiring as a strictly linear ladder. Later chapters lean on earlier ones constantly and in both directions: chapter 4's AM–GM certifies chapter 2's vertex, chapter 6's counts price chapter 7's row sums, and chapter 9's logarithms size chapter 7's binomial coefficients. The rail says what had to exist FIRST, not what may never touch again. The audit bench below is precisely where the chapters touch — read the rail for dependencies, and the bench for reunions." },
    /* ---------------- the formula family gathered ---------------- */
    { kind: 'heading', text: 'The formula family gathered' },
    { kind: 'para', text: "One shelf, one card per chapter family, plus the synthesis's own tools at the end. A shelf is a retrieval instrument, not a substitute for understanding: each card names the formula, prints it symbolically, and pins it to a witness from the census table so that recall is anchored to a recomputation. Read the shelf top to bottom and you re-walk the wiring in miniature." },
    { kind: 'formula', name: 'Composition and inverse — the machine pair', latex: '(f \\circ g)(x) = f(g(x)); \\quad f\\left(f^{-1}(y)\\right) = y', note: 'Order is load-bearing: on $f = 2x+1$, $g = x^2$, $g(f(3)) = 49$ but $f(g(3)) = 19$. The inverse is the undo machine — $ax+b$ undoes to $(y-b)/a$.' },
    { kind: 'formula', name: 'Vertex form and the discriminant read', latex: 'ax^2 + bx + c = a(x - h)^2 + k, \\quad h = -\\frac{b}{2a}, \\quad D = b^2 - 4ac', note: '$k$ is the extreme value at $x = h$ (witness: max $11$ at $x=3$); $D>0$, $D=0$, $D<0$ is the root census — two, double, conjugates.' },
    { kind: 'formula', name: 'The modulus–argument pair (with de Moivre)', latex: '|z| = \\sqrt{x^2 + y^2}, \\quad z = |z|(\\cos\\theta + i\\sin\\theta), \\quad z^n = |z|^n(\\cos n\\theta + i\\sin n\\theta)', note: 'de Moivre rides on the pair: $(1+i)^8 = (\\sqrt{2})^8$ at angle $8 \\cdot \\pi/4 = 2\\pi$, so the reassembly is $16$.' },
    { kind: 'formula', name: 'AM–GM · Cauchy–Schwarz · the triangle inequality', latex: 'a + b \\ge 2\\sqrt{ab}; \\quad (a^2+b^2)(c^2+d^2) \\ge (ac+bd)^2; \\quad |z_1 + z_2| \\le |z_1| + |z_2|', note: 'Bounds as tools, each with an equality witness: $a = b$; $(a,b)$ proportional to $(c,d)$; same direction. Witness: min $9x + 4/x = 12$ at $x = 2/3$.' },
    { kind: 'formula', name: 'AP and GP sums, and the infinite tail', latex: 'S_n = \\frac{n}{2}\\left(2a + (n-1)d\\right); \\quad S_n = a\\,\\frac{r^n - 1}{r - 1}; \\quad a + ar + ar^2 + \\cdots = \\frac{a}{1-r} \\; (|r| < 1)', note: 'Climbs priced exactly; the tail $a/(1-r)$ is the book\'s first honest limit — used throughout, its proof deferred to Calculus (see the ledger).' },
    { kind: 'formula', name: 'The choose identities', latex: 'C(n,k) = C(n, n-k); \\quad \\sum_{k=0}^{n} C(n,k) = 2^n; \\quad C(n,k) = C(n-1, k-1) + C(n-1, k)', note: 'Symmetry, the row sum, Pascal. Witness: row 12 sums to $4096 = 2^{12}$ with middle coefficient $924$.' },
    { kind: 'formula', name: 'The induction schema', latex: 'S(1) \\; \\text{and} \\; \\left( S(n) \\Rightarrow S(n+1) \\right) \\; \\Rightarrow \\; S(n) \\; \\text{for all} \\; n \\ge 1', note: 'Base case plus domino step. Priced at $n = 100$: $\\sum k = 5050 = 50 \\cdot 101$, with domino difference $S_{100} - S_{99} = 100$.' },
    { kind: 'formula', name: 'Vieta pair', latex: '\\alpha + \\beta = s, \\quad \\alpha\\beta = p \\; \\text{for} \\; x^2 - sx + p = 0', note: 'Symmetric functions need no roots: $\\alpha^3 + \\beta^3 = s^3 - 3ps = 343 - 231 = 112$ on $x^2 - 7x + 11$.' },
    { kind: 'formula', name: 'The definition pair, the log-law family, the digit-count law', latex: 'b^x \\; \\text{and} \\; \\log_b x \\; \\text{invert}; \\quad \\log_b(xy) = \\log_b x + \\log_b y; \\quad \\text{digits}(N) = \\lfloor \\log_{10} N \\rfloor + 1', note: 'The inverse family. Log chain: $(\\log_3 4)\\cdots(\\log_8 9) = \\log_3 9 = 2$; $e = 2.7182818$; $2^{100}$ has 31 digits.' },
    { kind: 'formula', name: 'Secant-slope ladder — 10.4 owns this one', latex: '\\text{slope of secant} = \\frac{f(x+h) - f(x)}{h}', note: 'The chapter\'s one NEW card, forward-referenced honestly: the average-rate ladder that the next lesson collapses into the instantaneous rate.' },
    /* ---------------- the honesty ledger ---------------- */
    { kind: 'heading', text: 'What was only opened: the honesty ledger' },
    { kind: 'callout', tone: 'definition', title: 'The deferred ledger', text: "A synthesis that hides what it did not prove is not honest — this ledger is the lesson's spine. The book USED the convergence proofs of 9.1's nested brackets: the bound $S_n = 2 - (n+2)/2^n$ was verified at seven sizes, never derived. It USED e's 9.5 series to compute $e = 2.7182818$ without proving the limit exists. It USED the fast-series remainder of 9.6 as a bound, not a derivation. Its squeezes ASSUMED the completeness of the reals. And the ε–δ machinery — the honest language of limits — was never opened at all. Each debt has an address: the deferred convergence proofs, the limit defining e, the remainder bound and the ε–δ machinery are owed to Calculus; the completeness of the reals is owed to Real Analysis, Calculus's own doorstep; the instantaneous rate is the wall that 10.4 itself walks to and names." },
    { kind: 'table', caption: 'The ledger in rows — the promise, and the door that owns it', head: ['The promise (used, never proved here)', 'The door that owns it'], rows: [
      ['the convergence proofs: 9.1\'s nested brackets behind $\\sum k/2^k = 2$', 'Calculus'],
      ['e as a limit: the $2.7182818$ series was computed, its limit unproved', 'Calculus'],
      ['the fast-series remainder: how close $S_n$ sits to $e$ was bounded', 'Calculus'],
      ['the completeness of the reals, assumed by every squeeze', 'Real Analysis'],
      ['the instantaneous rate, named as a wall in 10.4', 'Calculus · 10.4'],
      ['the ε–δ machinery, the honest language of limits', 'Calculus'],
    ] },
    { kind: 'figure', caption: 'The honesty ledger as a diagram: six deferred promises on the left, each arrowed to the door that owns it. Four doors say Calculus — the next book — and one says Real Analysis.', svg: syn103Ledger() },
    { kind: 'para', text: "None of this is a defect to be hidden. A first course that refused to use a limit until it had proved the completeness of the reals would never reach the GP tail, never price $e$, never count the digits of $2^{100}$. The honest structure is: use the tool, verify every instance you print, and record exactly which proofs were consumed and where they live. That is what the ledger does — and it is why the ledger, not the census table, is this lesson's spine." },
    /* ---------------- cross-references ---------------- */
    { kind: 'heading', text: 'The cross-references made good' },
    { kind: 'para', text: "The forward doors: four rooms this book deliberately did not enter, each waiting for an object this book finished. One verified fact per door — every fact recomputed in its own chapter:" },
    { kind: 'list', marker: 'roman', items: [
      "Coordinate Geometry — graphs reunited. The parabola $y = ax^2 + bx + c$ IS chapter 2's vertex object set into a coordinate plane: the vertex $(h, k)$ becomes a geometric point, the axis $x = h$ a geometric line, and the witness — max of $-2x^2+12x-7$ at $(3, 11)$ — becomes a location on graph paper.",
      "Trigonometry — the next machine family. The periodic machines that chapter 1's period census was waiting for live here, and de Moivre's circle arithmetic is the bridgehead: $(1+i)^8$ landed at angle $2\\pi$ with modulus $16$, which is trigonometry already wearing algebra's clothes.",
      "Calculus — the rates and the limits. The secant-slope ladder on the shelf's last card, the honest limits of chapter 5, and every debt on the ledger converge on this door; it is the next book, and 10.4 is its doorstep.",
      "Probability — the counts cashed as measure. Chapter 6's exact counts become the denominators of chance: $C(10,3) = 120$ is already a probability space waiting for its outcomes to be weighed, and $\\sum C(12,k) = 4096$ is the total mass of row 12.",
    ] },
    { kind: 'para', text: "A reading order for the doors, since a map should also say where to walk first. Coordinate Geometry can be entered almost immediately — chapter 2's vertex object is already coordinate-ready. Trigonometry asks for de Moivre, so it waits for chapter 3. Probability waits for chapter 6's exact counts. Calculus waits for everything: it is the door the whole ledger points at, and 10.4 is its threshold. If you take one walking plan from this page, take that one — it is the wiring, projected forward." },
    { kind: 'para', text: "The backward anchors are just as real. Foundation Mathematics banked the number sense this book computes with; the ANS book banked the proof discipline that induction formalised; and AL built the first algebra course — its identities-and-substitutions craft lesson (al-competition-algebra-identities-and-substitutions) is where completing the square was first rehearsed, and its function doorstep (al-the-function-idea-the-doorstep) is where function-as-machine was first said. Chapter 1 of this book began at that doorstep; it did not rebuild it. A reader who finds this page readable has already cashed those anchors." },
    /* ---------------- the audit bench ---------------- */
    { kind: 'heading', text: 'The audit bench: cross-chapter chains' },
    { kind: 'para', text: "A synthesis earns its keep on the bench. Each Illustration below is a single calculation that cannot be filed in one chapter — it visits three or more registers and finds the same truth at each. All four were verified end to end by the engine, every printed digit included." },
    { kind: 'figure', caption: "The first chain as a diagram: one question — maximise x(6 − x) — and the three registers it visits, each certifying the same maximum 9 at x = 3. The bench's remaining chains follow the same shape.", svg: syn103Chain() },
    { kind: 'derivation', title: 'The witness audit, done once slowly: alpha cubed plus beta cubed', statement: "Chapter 8's witness on $x^2 - 7x + 11$ is $\\alpha^3 + \\beta^3 = 112$. One derivation, no roots solved, to show why the census trusts it:", steps: [
      { label: 'Read Vieta', formula: '\\alpha + \\beta = 7, \\quad \\alpha\\beta = 11', explanation: 'The sum and product come from the coefficients directly — the roots themselves (irrational, near 4.618 and 2.382) never need to be named.' },
      { label: 'Cube the sum', formula: '(\\alpha + \\beta)^3 = \\alpha^3 + \\beta^3 + 3\\alpha\\beta(\\alpha + \\beta)', explanation: 'The binomial cube, applied to the root pair; the mixed term is exactly $3ps$.' },
      { label: 'Rearrange', formula: '\\alpha^3 + \\beta^3 = s^3 - 3ps', explanation: 'The symmetric function is expressible through $s$ and $p$ alone — the deep fact of chapter 8.' },
      { label: 'Substitute', formula: '7^3 - 3 \\cdot 11 \\cdot 7 = 343 - 231 = 112', explanation: 'Pure arithmetic, no approximation at any step.' },
    ], result: "$\\alpha^3 + \\beta^3 = 112$ — and the engine agreed by the other route too: it solved the quadratic, cubed each root numerically, and landed on 112 to six decimals. Two routes, one number: that is what makes a witness trustworthy." },
    { kind: 'example', title: 'Illustration 1 · One fact, three registers: maximise x(6 − x)', steps: [
      'Split: by AM–GM on the parts $x$ and $6-x$, whose sum is $6$: $x(6-x) \\le (6/2)^2 = 9$, equality when $x = 6 - x$, that is, $x = 3$.',
      'Now, certify by the discriminant: the top is where $x^2 - 6x + 9 = 0$ touches down, and $D = 36 - 36 = 0$ — a double root at $x = 3$, exactly one candidate.',
      'So, read the same fact in chapter 4\'s register: $x(6-x) = 9 - (x-3)^2 \\le 9$, with equality exactly when $(x-3)^2 = 0$.',
      'Hence all three registers agree — maximum 9 at $x = 3$ — and the grid scan confirms it: max $9.000$ at $x = 3.000$.',
    ] },
    { kind: 'example', title: 'Illustration 2 · The binomial-digit chain: how many digits has C(50, 25)?', steps: [
      'Split: the 9.6 law turns size into logs — digits of $N$ = floor of $\\log_{10} N$, plus 1 — so the question is one logarithm.',
      'Now, compute: $\\log_{10} C(50,25) = 14.1018$ to four decimals (the engine\'s full-precision value; the draft\'s 14.1017 was a truncation), which sits between 14 and 15.',
      'So, the count: floor of 14.1018 is 14, giving 15 digits — and the exact value confirms it: $C(50,25) = 126410606437752$.',
      'Hence a chapter 7 object — row 50 of Pascal, whose entries sum to $2^{50}$ — priced by a chapter 9 law: 15 digits, law and BigInt agreeing.',
    ] },
    { kind: 'example', title: 'Illustration 3 · The induction–Gauss chain: 5050 three ways', steps: [
      'Split: the pairing census — the 100 terms form 50 pairs, each summing 101, so the total is $50 \\cdot 101 = 5050$.',
      'Now, the domino: the induction schema of 7.1 proves $\\sum k = n(n+1)/2$, and its step priced at the top is $S_{100} - S_{99} = 100$ — the last tile falls.',
      'So, the closed form regenerates the same number: $n(n+1)/2$ at $n = 100$ is $100 \\cdot 101 / 2 = 5050$ — the same 5050 the 10.2 rule regenerates.',
      'Hence one number, three chapters: the pairing (arithmetic), the domino (induction), and the closed form (the formula) — the engine checked all three, plus a plain loop, and they agreed.',
    ] },
    { kind: 'example', title: 'Illustration 4 · The complex–Vieta chain: omega cubed equals 1', steps: [
      'Split: $x^2 + x + 1 = 0$ has $D = 1 - 4 = -3 < 0$ — chapter 2\'s honest failure, repaired by chapter 3\'s numbers: the roots are $\\omega = (-1 + i\\sqrt{3})/2$ and its conjugate $\\omega^2$.',
      'Now, multiply: $\\omega^2$ comes out as $(-1 - i\\sqrt{3})/2$, so $\\omega + \\omega^2 = -1$ and $\\omega \\cdot \\omega^2 = 1$ — Vieta\'s pair holding perfectly on complex roots.',
      'So, cube it: three copies of the angle $2\\pi/3$ make $2\\pi$, and de Moivre reassembles the point $(1, 0)$ — $\\omega^3 = 1$ exactly, modulus 1 throughout.',
      'Hence the Fundamental Theorem\'s promise — every quadratic solvable — is not merely existential: the roots are working objects you can multiply, and they carry Vieta\'s bookkeeping with them.',
    ] },
    /* ---------------- the synthesis's own tools ---------------- */
    { kind: 'heading', text: "The synthesis's own tools" },
    { kind: 'para', text: "Three cards belong to this lesson itself. They are the patterns the census table kept repeating — the habits that made every witness checkable. Keep them next to the shelf." },
    { kind: 'formula', name: 'The witness discipline', latex: '\\text{witness} \\; = \\; \\text{one computation, recomputed — not remembered}', note: 'Every third-column value in the census table was re-derived by brute force in this lesson\'s engine before the prose was fixed; where a printed decimal came from a truncation, the engine\'s rounding replaced it.' },
    { kind: 'formula', name: 'The telescoping product (the log chain)', latex: '\\prod_{k=3}^{8} \\log_k(k+1) = \\frac{\\ln 9}{\\ln 3} = \\log_3 9 = 2', note: 'Products of logs telescope exactly like sums of differences — the same split as chapter 5, multiplicative. Verified to $10^{-9}$.' },
    { kind: 'formula', name: 'The three-register certificate', latex: 'x(A - x) \\le \\frac{A^2}{4} \\; \\text{three ways: AM–GM, } D = 0, \\; \\frac{A^2}{4} - x(A-x) = \\left(x - \\frac{A}{2}\\right)^2 \\ge 0', note: 'One fact certified in three registers — the audit bench\'s pattern, stated for any total $A$. Register agreement is the strongest cheap certificate a first course can print.' },
    /* ---------------- vocabulary ---------------- */
    { kind: 'terms', items: [
      { term: 'the census', def: "This lesson's ten-row table: every chapter of the book, the object it built, and one engine-recomputed witness for that object. The census consolidates; it never re-teaches." },
      { term: 'the wiring', def: 'The dependency chain across the ten chapters: which object feeds which, and why each chapter could not have been written before its predecessor.' },
      { term: 'the formula shelf', def: "The gathered cards of the book's chapter families — one card per family, each formula pinned to a witness — plus this lesson's own synthesis tools." },
      { term: 'the honesty ledger', def: "The record of what the book used but never proved — the deferred convergence proofs, e's limit, the fast-series remainder, the ε–δ machinery — and the door that owns each debt, mostly Calculus." },
      { term: 'the cross-chapter chain', def: "A single calculation that visits several chapters' registers — AM–GM, the discriminant, the digit-count law — and finds the same truth at each stop." },
      { term: 'the forward door', def: 'A later course or chapter that owns material this book deliberately deferred: Coordinate Geometry, Trigonometry, Calculus, Probability.' },
      { term: 'the backward anchor', def: "A banked earlier lesson cited rather than repeated — FM's number sense, ANS's proof discipline, AL's function doorstep and craft lesson." },
      { term: 'the witness', def: 'One small computation, recomputed by brute force, that certifies a chapter\'s object — the discipline that makes this synthesis trustworthy.' },
    ] },
    /* ---------------- quiz ---------------- */
    { kind: 'para', text: "Five questions, one on each major arc of the page: the object chapter 1 built, the witness of chapter 8, the row-sum identity of chapter 7, the ownership of the digit-count law, and the honesty ledger itself. Each explanation says not only which option is right but why the other three fail — on a synthesis page, the failures are part of the map too." },
    { kind: 'quiz', title: 'Quiz — five questions on the map', items: [
      { q: 'Which statement best states the object that Chapter 1 built?', options: [
        'a machine on inputs — equivalently, a set of ordered pairs in which no input is sent to two outputs',
        'only a polynomial rule in one variable',
        'only its graph drawn on a coordinate plane',
        'an equation whose solutions are to be found',
      ], answer: 0, explain: 'Chapter 1 built functions as objects — machines composable and invertible, equivalently sets of ordered pairs. Option 1 collapses machines to one family (polynomials); option 2 mistakes a representation (the graph) for the object; option 3 confuses a function with an equation to solve — an equation asks a question, a machine answers inputs.' },
      { q: 'On $x^2 - 7x + 11 = 0$ with roots $\\alpha, \\beta$, the witness $\\alpha^3 + \\beta^3$ equals:', options: ['343', '231', '112', '90'], answer: 2, explain: 'By Vieta, $s = 7$ and $p = 11$, so $\\alpha^3 + \\beta^3 = s^3 - 3ps = 343 - 231 = 112$. Option 343 is $s^3$ alone — the $-3ps$ term was dropped; option 231 is the $3ps$ term alone; option 90 is the mis-substitution $343 - 3 \\cdot 11 \\cdot 7$ with $3ps$ halved — none survives recomputation.' },
      { q: 'The sum of the whole of row 12 of Pascal, $\\sum_{k=0}^{12} C(12,k)$, equals:', options: ['924', '4096', '8192', '2048'], answer: 1, explain: 'The row-sum identity gives $2^{12} = 4096$, engine-verified entry by entry. Option 924 is the single middle coefficient $C(12,6)$; option 8192 is $2^{13}$ — one row too far; option 2048 is $2^{11}$ — one row short. The identity, not the middle entry, answers the question.' },
      { q: 'Which chapter owns the digit-count law — digits of $N$ = floor of $\\log_{10} N$, plus 1?', options: [
        'Chapter 9 — Exponentials and Logarithms',
        'Chapter 6 — Counting',
        'Chapter 7 — Induction and the Binomial',
        'Chapter 4 — Inequalities',
      ], answer: 0, explain: 'The digit-count law is a logarithm law: it converts size into $\\log_{10} N$ and reads the floor, so it belongs to the inverse family of Chapter 9. Counting (option 1) supplies objects like $C(50,25)$ for the law to price, induction (option 2) proves identities, and inequalities (option 3) bounds sums — none of them owns logs.' },
      { q: 'What does the honesty ledger defer, and to where?', options: [
        'nothing was deferred — the book proved everything it used',
        'the counting laws, deferred to Probability',
        'the quadratic formula, deferred to Coordinate Geometry',
        'the convergence proofs and the ε–δ machinery, deferred to Calculus',
      ], answer: 3, explain: 'The ledger defers the convergence proofs (9.1\'s nested brackets, e\'s limit, the fast-series remainder) and the ε–δ machinery — all payable at Calculus\'s door. Option 0 is exactly the dishonesty the ledger exists to prevent; options 1 and 2 name things the book actually proved or banked — the counting laws were derived in Chapter 6, the quadratic formula in Chapter 2.' },
    ] },
    /* ---------------- exercises ---------------- */
    { kind: 'exercises', title: 'The mixed bench — one fresh question per chapter family, L1 to L6', sets: [
      { level: 'L1', questions: [
        { q: 'Let $f(x) = 3x - 2$ and $g(x) = x^2 + 1$. Compute $g(f(2))$ and $f(g(2))$, find $f^{-1}$ in the form $(y + 2)/3$ scaled correctly, and check that $f^{-1}(f(2)) = 2$.', solution: [
          'Split: inside machine first — $f(2) = 3 \\cdot 2 - 2 = 4$.',
          'Now, $g(f(2)) = g(4) = 4^2 + 1 = 17$.',
          'So, the other order: $g(2) = 2^2 + 1 = 5$, hence $f(g(2)) = 3 \\cdot 5 - 2 = 13$.',
          'Now, the undo machine: $f^{-1}(y) = (y + 2)/3$, and $(f(2) + 2)/3 = (4 + 2)/3 = 2$ ✓.',
          'Hence $g(f(2)) = 17$, $f(g(2)) = 13$, $f^{-1}(y) = (y+2)/3$ — the order census replicated at fresh constants.',
        ], answer: '$g(f(2)) = 17$, $f(g(2)) = 13$, $f^{-1}(y) = (y + 2)/3$' },
        { q: 'Complete the square on $2x^2 - 8x + 3$: write it in the vertex form 2(x − 2)² − 5, state the axis of symmetry, and solve $2x^2 - 8x + 3 = 0$ exactly.', solution: [
          'Split: $2x^2 - 8x + 3 = 2(x^2 - 4x) + 3$.',
          'Now, inside the bracket: $x^2 - 4x = (x - 2)^2 - 4$, so the whole is $2(x-2)^2 - 8 + 3 = 2(x-2)^2 - 5$.',
          'So, the vertex sits at $x = 2$ with value $-5$: the minimum −5 at x = 2, and the axis is $x = 2$.',
          'Now, the roots: $2(x-2)^2 = 5$ gives $(x - 2)^2 = 5/2$, so $x = 2 \\pm \\sqrt{5/2} = 2 \\pm \\frac{\\sqrt{10}}{2}$.',
          'Hence vertex form $2(x-2)^2 - 5$, minimum $-5$ at $x = 2$, roots $2 \\pm \\frac{\\sqrt{10}}{2} \\approx 0.4189$ and $3.5811$ — the grid scan agrees.',
        ], answer: 'Vertex form 2(x − 2)² − 5; the minimum −5 at x = 2; roots $x = 2 \\pm \\frac{\\sqrt{10}}{2}$' },
        { q: 'From a class of 9 students a three-member committee is to be chosen. Why does order not matter here, and how many committees are possible? Give the count as a choose value and as a factorial ratio.', solution: [
          'Split: a committee is a set — swapping two members yields the same committee, so this is a selection, not an arrangement.',
          'Now, count: the ways to choose 3 from 9 form $C(9,3)$, and $\\frac{9 \\cdot 8 \\cdot 7}{3!} = \\frac{504}{6} = 84$.',
          'So, the factorial read: $\\frac{9!}{6! \\, 3!} = \\frac{362880}{4320} = 84$ — the same number by the other route.',
          'Hence 84 committees, since C(9, 3) = 84 — order ignored, exactly as the census\'s counting row demands.',
        ], answer: '84 committees — C(9, 3) = 84' },
      ] },
      { level: 'L2', questions: [
        { q: 'A pen is built against a straight wall with exactly 20 m of fencing: two equal sides of length $x$ and one parallel side of length $y$, so $2x + y = 20$. Write the area $A = x(20 - 2x)$, complete the square, and maximise the pen; verify the constraint at the winner and name the degenerate roots.', solution: [
          'Split: substitute the constraint $y = 20 - 2x$ into the area: $A(x) = x(20 - 2x) = -2x^2 + 20x$.',
          'Now, complete the square: $A(x) = -2(x^2 - 10x) = -2(x - 5)^2 + 50$ — vertex form with $a = -2 < 0$, so the vertex is a maximum.',
          'So, the winner: maximum area 50 at $x = 5$, where $y = 20 - 2 \\cdot 5 = 10$; the constraint checks: $2 \\cdot 5 + 10 = 20$ ✓.',
          'Now, the symmetry probes: $A(4) = 48$ and $A(6) = 48$ — equal values either side of the axis $x = 5$, as the vertex form guarantees.',
          'Hence the pen is maximal at 5 m by 10 m, area 50 m², with degenerate pens of area 0 at $x = 0$ and $x = 10$.',
        ], answer: 'Maximum area 50 at $x = 5$ (then $y = 10$); vertex form $-2(x-5)^2 + 50$; degenerate at $x = 0, 10$', figures: [{ caption: 'The pen area A = −2(x − 5)² + 50: maximum 50 at x = 5, symmetry probes A(4) = A(6) = 48, degenerate roots x = 0 and x = 10.', svg: syn103Pen() }] },
        { q: 'Solve $4^{x+1} = 8^{x-1}$ by writing both sides as powers of 2, and check the solution in both original machines.', solution: [
          'Split: $4 = 2^2$ and $8 = 2^3$, so $4^{x+1} = 2^{2x+2}$ and $8^{x-1} = 2^{3x-3}$.',
          'Now, equal powers of 2 have equal exponents: $2x + 2 = 3x - 3$.',
          'So, the linear engine gives $x = 5$.',
          'Now, check: $4^6 = 4096$ and $8^4 = 4096$ — the two sides agree exactly, as the engine verified.',
          'Hence $x = 5$ with both sides 4096 — the definition pair and the power law $(b^m)^n = b^{mn}$ doing the work.',
        ], answer: '$x = 5$ (both sides equal 4096)' },
        { q: 'An arithmetic progression has third term 11 and seventh term 23. Find the common difference and the first term, then compute $S_{10}$ two ways.', solution: [
          'Split: $a_3 = a_1 + 2d = 11$ and $a_7 = a_1 + 6d = 23$.',
          'Now, subtract: $4d = 12$, so $d = 3$, and back-substitute: $a_1 = 11 - 2 \\cdot 3 = 5$.',
          'So, the sum formula: $S_{10} = \\frac{10}{2}(2 \\cdot 5 + 9 \\cdot 3) = 5 \\cdot 37 = 185$.',
          'Now, the loop check: adding $5 + 8 + 11 + \\cdots + 32$ term by term also gives 185, engine-confirmed.',
          'Hence $d = 3$, $a_1 = 5$, $S_{10} = 185$ — the AP engine priced at fresh constants.',
        ], answer: '$d = 3$, $a_1 = 5$, $S_{10} = 185$' },
      ] },
      { level: 'L3', questions: [
        { q: 'For z = 1 + i√3, find the modulus and the argument, confirm the argument is π/3, and compute $z^3$ two ways — direct multiplication and de Moivre.', solution: [
          'Split: $|z| = \\sqrt{1^2 + (\\sqrt{3})^2} = \\sqrt{4} = 2$.',
          'Now, the argument: $\\tan\\theta = \\sqrt{3}$ with both parts positive, so $\\theta = \\pi/3$ — first quadrant, confirmed.',
          'So, direct multiplication: $z^2 = (1 + i\\sqrt{3})^2 = -2 + 2i\\sqrt{3}$, then $z^3 = (-2 + 2i\\sqrt{3})(1 + i\\sqrt{3}) = -8 + 0i$.',
          'Now, de Moivre: $z^3 = 2^3(\\cos \\pi + i\\sin \\pi) = 8(-1) = -8$ — the two routes agree to a digit.',
          'Hence $|z| = 2$, $\\arg z = \\pi/3$, $z^3 = -8$ — modulus, argument and de Moivre in one computation.',
        ], answer: '$|z| = 2$, $\\arg z = \\pi/3$, $z^3 = -8$', figures: [{ caption: 'z = 1 + i√3 on the complex plane: modulus arrow of length 2, angle arc π/3, dashed circle |z| = 2, and z³ = −8 on the negative real axis.', svg: syn103Complex() }] },
        { q: 'Sum the telescoping series $\\sum_{k=1}^{20} \\frac{1}{k(k+2)}$ using the split $\\frac{1}{k(k+2)} = \\frac{1}{2}\\left(\\frac{1}{k} - \\frac{1}{k+2}\\right)$, then find the limit of the $n$-term sum as $n \\to \\infty$.', solution: [
          'Split: verify the split at a probe — $k = 1$: $\\frac{1}{1 \\cdot 3} = \\frac{1}{2}(1 - \\frac{1}{3})$ ✓ (the engine checked five sizes).',
          'Now, sum with cancellations: $S_{20} = \\frac{1}{2}\\left(1 + \\frac{1}{2} - \\frac{1}{21} - \\frac{1}{22}\\right)$ — only the first two and last two survive.',
          'So, $S_{20} = \\frac{1}{2}\\left(\\frac{3}{2} - \\frac{43}{462}\\right) = \\frac{1}{2} \\cdot \\frac{650}{462} = \\frac{325}{462} \\approx 0.7034632$.',
          'Now, the limit: the surviving tail $\\frac{1}{2}(\\frac{1}{n+1} + \\frac{1}{n+2})$ dies as $n$ grows, so the sum climbs to $\\frac{1}{2} \\cdot \\frac{3}{2} = \\frac{3}{4}$.',
          'Hence $S_{20} = 325/462$ with limit $3/4$ — the climb verified under its ceiling, exactly as in chapter 5.',
        ], answer: '$S_{20} = \\frac{325}{462} \\approx 0.7035$; the limit is $\\frac{3}{4}$' },
        { q: 'Minimise $4x + \\frac{25}{x}$ for $x > 0$ by AM–GM, stating the bound, the equality witness, and why the minimum cannot be beaten.', solution: [
          'Split: both parts are positive, so AM–GM applies: $4x + \\frac{25}{x} \\ge 2\\sqrt{4x \\cdot \\frac{25}{x}} = 2\\sqrt{100} = 20$.',
          'Now, the priced product: $4x \\cdot \\frac{25}{x} = 100$ at every $x > 0$ — the engine probed five values and the product never moved.',
          'So, the equality witness: $4x = \\frac{25}{x}$ gives $x^2 = \\frac{25}{4}$, so $x = 5/2$, where the sum is exactly 20.',
          'Now, the grid: the scan\'s minimum reads 20.000 at 2.5000 — the bound is attained, not merely approached.',
          'Hence the minimum is 20 at $x = 5/2$ — the census\'s inequality row replayed at fresh constants.',
        ], answer: 'Minimum 20 at $x = 5/2$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Use Cauchy–Schwarz to maximise $3x + 4y$ subject to $x^2 + y^2 = 25$, and give the equality witness and the maximising angle.', solution: [
          'Split: Cauchy–Schwarz in two terms: $(3^2 + 4^2)(x^2 + y^2) \\ge (3x + 4y)^2$.',
          'Now, on the circle $x^2 + y^2 = 25$: $25 \\cdot 25 \\ge (3x + 4y)^2$, so $3x + 4y \\le 25$.',
          'So, equality holds when $(x, y)$ is proportional to $(3, 4)$; on the circle that forces $(x, y) = (3, 4)$, and indeed $9 + 16 = 25$.',
          'Now, the scan: sweeping the angle, the maximum sits at $\\arctan(4/3) \\approx 0.9273$ radians — the direction of the vector $(3, 4)$.',
          'Hence the maximum of $3x + 4y$ is 25 at $(x, y) = (3, 4)$ — bound, witness and scan agreeing.',
        ], answer: 'Maximum 25 at $(x, y) = (3, 4)$, at angle $\\arctan(4/3) \\approx 0.9273$' },
        { q: 'Prove by induction that $\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}$, then price the formula at $n = 12$ and verify the domino step $S_{12} - S_{11} = 144$.', solution: [
          'Split: base case — $n = 1$: the left side is 1 and the right side is $\\frac{1 \\cdot 2 \\cdot 3}{6} = 1$ ✓.',
          'Now, the domino: assume the formula for $n$; then $S_{n+1} = S_n + (n+1)^2 = (n+1)\\left(\\frac{n(2n+1)}{6} + (n+1)\\right) = \\frac{(n+1)(n+2)(2n+3)}{6}$ ✓.',
          'So, the schema fires: base plus domino gives the closed form for every $n \\ge 1$.',
          'Now, price it at $n = 12$: $\\frac{12 \\cdot 13 \\cdot 25}{6} = 650$, and the loop addition $1 + 4 + \\cdots + 144$ also gives 650.',
          'Hence the domino step is honest — $S_{12} - S_{11} = 650 - 506 = 144 = 12^2$ — and the induction stands priced.',
        ], answer: '$\\sum_{k=1}^{12} k^2 = 650$; the domino step is $S_{12} - S_{11} = 144$' },
        { q: 'Distribute 10 identical candies among 4 children. Using stars and bars, count the distributions in which every child gets at least one candy, and also the unrestricted count; reconcile both with a brute-force enumeration.', solution: [
          'Split: at least one each — pre-place one candy per child, leaving 6 free candies: the count is $C(6 + 3, 3) = C(9, 3)$.',
          'Now, compute: $C(9,3) = 84$.',
          'So, unrestricted: 10 stars and 3 bars — $C(13, 3) = 286$.',
          'Now, the enumeration: the engine looped all quadruples $a + b + c + d = 10$ and counted 84 with every part at least 1 and 286 unrestricted — both laws confirmed by brute force.',
          'Hence 84 constrained distributions and 286 unrestricted — the stars-and-bars engine priced twice.',
        ], answer: '84 with every child at least one; 286 unrestricted' },
      ] },
      { level: 'L5', questions: [
        { q: 'The roots of $x^2 - 6x + 8$ are 2 and 4. Find the equation whose roots are the roots shifted by +3 — a transformation of equations — by substituting $x = y - 3$, and check the new roots directly.', solution: [
          'Split: shift the variable first — $x = y - 3$ turns the equation into $(y - 3)^2 - 6(y - 3) + 8 = 0$.',
          'Now, expand: $y^2 - 6y + 9 - 6y + 18 + 8 = y^2 - 12y + 35$.',
          'So, Vieta on the new equation: sum 12, product 35 — and the shifted roots are $2 + 3 = 5$ and $4 + 3 = 7$, with $5 + 7 = 12$ and $5 \\cdot 7 = 35$ ✓.',
          'Now, the direct check: $25 - 60 + 35 = 0$ and $49 - 84 + 35 = 0$ — both new roots vanish in the new equation.',
          'Hence the transformation of equations gives $y^2 - 12y + 35 = 0$ with roots 5 and 7 — roots moved without being solved.',
        ], answer: '$y^2 - 12y + 35 = 0$, roots 5 and 7 (the originals shifted by +3)' },
        { q: 'Use the digit-count law to find how many digits the binomial coefficient $\\binom{20}{10}$ has, and confirm with the exact value; state the logarithm to four decimals.', solution: [
          'Split: the 9.6 law — digits of $N$ equals the floor of $\\log_{10} N$ plus 1.',
          'Now, compute the logarithm: $\\log_{10} C(20,10) = 5.2666$ to four decimals, which lies between 5 and 6.',
          'So, the count: floor 5, plus 1 — 6 digits.',
          'Now, confirm exactly: $C(20,10) = 184756$ — six digits, BigInt and law agreeing.',
          'Hence $\\binom{20}{10} = 184756$ has 6 digits with $\\log_{10} = 5.2666$ — the digit-count law cashed on a fresh binomial object.',
        ], answer: '$\\binom{20}{10} = 184756$: 6 digits, $\\log_{10} C(20,10) = 5.2666$' },
      ] },
      { level: 'L6', questions: [
        { q: 'A fence of 20 m encloses a rectangle with sides $x$ and $20 - x$. (a) Certify the maximum area in three registers — AM–GM, the vertex, and the completed square. (b) List the 10 distinct integer rectangles (taking $x \\le 20 - x$) and their areas. (c) Find which rectangles have area at least 96, their count and the sum of their areas, using the quadratic band $(x - 8)(x - 12) \\le 0$.', solution: [
          'Split, register 1: AM–GM on $x$ and $20 - x$, whose sum is 20 — $x(20 - x) \\le (20/2)^2 = 100$, equality at $x = 10$: the square.',
          'Now, register 2: $x^2 - 20x + 100$ has $D = 400 - 400 = 0$ — a double root at $x = 10$; the vertex census agrees.',
          'So, register 3: $x(20 - x) = 100 - (x - 10)^2 \\le 100$, equality iff $(x - 10)^2 = 0$; the grid scan reads max 100.000 at 10.000.',
          'Now, the census: with $x \\le 20 - x$ the 10 integer rectangles carry areas 19, 36, 51, 64, 75, 84, 91, 96, 99, 100.',
          'So, the cut: area at least 96 solves to $(x - 8)(x - 12) \\le 0$, the band $8 \\le x \\le 12$, which meets the convention $x \\le 20 - x$ in exactly $x = 8, 9, 10$ — three rectangles (96 · 99 · 100) summing 295.',
          'Hence maximum area 100 at the square, and exactly three qualifying rectangles with total 295 — one chain through inequalities, quadratics and counting.',
        ], answer: 'Max 100 at $x = 10$; area ≥ 96 for exactly 3 rectangles (96, 99, 100), their sum 295', figures: [{ caption: 'The fence area x(20 − x): maximum 100 at x = 10, with the shaded band 8 ≤ x ≤ 12 where the area is at least 96 — three integer rectangles qualify.', svg: syn103Fence() }] },
        { q: 'One chain, three registers. (a) Compute $C(16, 8)$ and its digit count via the digit-count law. (b) Show that the sum of row 16 of Pascal is $2^{16}$, and count its digits via $\\log_{10} 2^{16}$. (c) Compute $(1 + i)^{16}$ by de Moivre and count its digits. Where does each digit count land?', solution: [
          'Split, register 1: the middle coefficient of row 16 is $C(16, 8) = 12870$, and $\\log_{10} 12870 = 4.1096$, so floor 4 plus 1 — 5 digits.',
          'Now, register 2: the row identity gives $\\sum_{k=0}^{16} C(16,k) = 2^{16} = 65536$ (engine-summed with BigInt), and $\\log_{10} 2^{16} = 16 \\cdot 0.30103 = 4.8165$ — again 5 digits.',
          'So, register 3: de Moivre — $(1 + i)^{16} = (\\sqrt{2})^{16}$ at angle $16 \\cdot \\pi/4 = 4\\pi$, so the value is $2^8 = 256$: 3 digits.',
          'Now, the checks: the engine squared its implemented $(1+i)^8 = 16$ to get 256 ✓, and matched every digit count against the exact strings.',
          'Hence the digit census lands 5, 5, 3 — a counting row, a logarithm law and a complex power priced in one chain.',
        ], answer: 'Digit counts 5, 5, 3 — $C(16,8) = 12870$, $2^{16} = 65536$, $(1+i)^{16} = 256$', figures: [{ caption: 'The digit-count stations of the L6 chain: C(16,8) = 12870 and 2 to the 16 = 65536 both carry 5 digits; (1+i) to the 16 = 256 carries 3.', svg: syn103Digits() }] },
      ] },
    ] },
    { kind: 'para', text: "The bench was built by one rule: fresh constants everywhere. No question above reuses a census-table witness as its answer — the machines are $3x-2$ and $x^2+1$ (not $2x+1$ and $x^2$), the pen total is 20 (not 6), the induction is priced at 12 (not 100), the digit chain runs on row 16 and row 20 (not row 50). Every terminal answer was recomputed by the engine before the question was allowed into the set, and every solution line is one move, led by its connective. That is the census discipline, extended to the bench." },
    /* ---------------- closing ---------------- */
    { kind: 'callout', tone: 'warn', title: 'A witness is not a proof', text: "The census certifies; it does not derive. Reading 112 in the witness column does not substitute for the identity $\\alpha^3 + \\beta^3 = s^3 - 3ps$, and a grid scan does not substitute for AM–GM. The bench recomputes to keep the book honest — the derivations, banked in their chapters, are what make the witnesses believable. Exam-style questions will ask for the derivation; the census only asks that you know where it lives." },
    { kind: 'para', text: "Read this page twice. The first pass collects the objects — ten machines, from the function grammar to the inverse family. The second pass collects the wiring: who feeds whom, who owes whom, and at which door each debt is payable. After the second pass the map is shorter: ten objects, one shelf, four deferred debts, four forward doors, three backward anchors, one bench. The doorstep ahead — the instantaneous rate, the secant-slope ladder collapsed — is where the next book begins, and this page is the last hand that passes you to it." },
  ],
}

// ------------------------------------------------------------------
// lesson 10.4 — run 122 (delivered whole, integrated verbatim)
// ------------------------------------------------------------------
/**
 * part-aa104.ts — Advanced Algebra lesson 10.4 "The Doorstep: Limits and the
 * Changing Output" (run-122 whole-chapter swarm, agent aa104).
 *
 * Every number printed in this prose was recomputed by brute force in the
 * engine section of temporary-references/v-aa104.ts (122 green checks) BEFORE
 * this file was written. Where the spec and the engine disagreed, the engine
 * won and this prose carries the engine's value (S10 = 5.8618940; the two
 * distinct epsilon reads on the 0.9-tail: term read n = 22 / 66, tail read
 * n = 43 / 87; the sqrt quotient presented as a HALF-wall via the conjugate).
 *
 * HONESTY LAW: the derivative is NAMED here as the limit of the secant slopes
 * and PRICED numerically; nothing that belongs to calculus's machinery is
 * proved. Every such claim is a promise with the door named.
 */


/* ------------------------------------------------------------------ */
/* Figure helpers — prefix dr104. SVG computed from named constants;   */
/* strokes ≥ 1.2px; role="img" + aria-label; labels match the prose.   */
/* ------------------------------------------------------------------ */

const dr104SecantLadder = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" role="img" aria-label="Secant ladder on y = x squared pivoting at P(1.5, 2.25): secant slopes 4, 3.5 and 3.25 close in on the tangent slope 3">
  <rect x="0" y="0" width="600" height="500" fill="#ffffff"/>
  <line x1="50" y1="480" x2="580" y2="480" stroke="#166534" stroke-width="1.4"/>
  <line x1="60" y1="490" x2="60" y2="25" stroke="#166534" stroke-width="1.4"/>
  <line x1="187.5" y1="480" x2="187.5" y2="486" stroke="#166534" stroke-width="1.2"/>
  <line x1="315" y1="480" x2="315" y2="486" stroke="#166534" stroke-width="1.2"/>
  <line x1="442.5" y1="480" x2="442.5" y2="486" stroke="#166534" stroke-width="1.2"/>
  <line x1="54" y1="408" x2="60" y2="408" stroke="#166534" stroke-width="1.2"/>
  <line x1="54" y1="336" x2="60" y2="336" stroke="#166534" stroke-width="1.2"/>
  <line x1="54" y1="264" x2="60" y2="264" stroke="#166534" stroke-width="1.2"/>
  <line x1="54" y1="192" x2="60" y2="192" stroke="#166534" stroke-width="1.2"/>
  <line x1="54" y1="120" x2="60" y2="120" stroke="#166534" stroke-width="1.2"/>
  <line x1="54" y1="48" x2="60" y2="48" stroke="#166534" stroke-width="1.2"/>
  <text x="178" y="497" font-size="12" fill="#166534">1</text>
  <text x="306" y="497" font-size="12" fill="#166534">2</text>
  <text x="433" y="497" font-size="12" fill="#166534">3</text>
  <text x="561" y="497" font-size="12" fill="#166534">4</text>
  <text x="40" y="412" font-size="12" fill="#166534">2</text>
  <text x="40" y="340" font-size="12" fill="#166534">4</text>
  <text x="40" y="268" font-size="12" fill="#166534">6</text>
  <text x="40" y="196" font-size="12" fill="#166534">8</text>
  <text x="35" y="124" font-size="12" fill="#166534">10</text>
  <text x="35" y="52" font-size="12" fill="#166534">12</text>
  <text x="46" y="496" font-size="12" fill="#166534">0</text>
  <path d="M 123.75 471 L 187.5 444 L 251.25 399 L 315 336 L 378.75 255 L 442.5 156 L 506.25 39" fill="none" stroke="#16a34a" stroke-width="2.4"/>
  <text x="430" y="55" font-size="13" fill="#16a34a">y = x²</text>
  <line x1="251.25" y1="399" x2="410.63" y2="219" stroke="#d97706" stroke-width="1.8"/>
  <text x="392" y="238" font-size="11.5" fill="#d97706">h = 1 · slope 4</text>
  <line x1="251.25" y1="399" x2="346.88" y2="304.5" stroke="#ea580c" stroke-width="1.8"/>
  <text x="347" y="322" font-size="11.5" fill="#ea580c">h = 0.5 · slope 3.5</text>
  <line x1="251.25" y1="399" x2="308.63" y2="346.35" stroke="#dc2626" stroke-width="1.6"/>
  <text x="311" y="368" font-size="11.5" fill="#dc2626">h = 0.25 · slope 3.25</text>
  <line x1="155.63" y1="480" x2="391.5" y2="280.2" stroke="#0d9488" stroke-width="1.8" stroke-dasharray="7 4"/>
  <text x="163" y="330" font-size="11.5" fill="#0d9488">tangent · slope 3 = 2·1.5</text>
  <circle cx="251.25" cy="399" r="4.5" fill="#0f766e"/>
  <text x="222" y="424" font-size="12" fill="#0f766e">P(1.5, 2.25)</text>
  <text x="472" y="300" font-size="12" fill="#65a30d">slopes:</text>
  <text x="472" y="318" font-size="12" fill="#65a30d">4 → 3.5 → 3.25 → 3</text>
</svg>`

const dr104LadderBars = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" role="img" aria-label="Bar ladder of (2 to the h minus 1) over h for h = 0.1, 0.01, 0.001, 0.0001 closing in on ln 2 = 0.6931472">
  <rect x="0" y="0" width="600" height="360" fill="#ffffff"/>
  <text x="300" y="26" font-size="14" text-anchor="middle" fill="#166534">(2^h − 1)/h closes on ln 2 = 0.6931472</text>
  <line x1="50" y1="300" x2="560" y2="300" stroke="#166534" stroke-width="1.4"/>
  <line x1="60" y1="308" x2="60" y2="40" stroke="#166534" stroke-width="1.4"/>
  <rect x="90" y="73.6" width="70" height="226.4" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.6"/>
  <rect x="210" y="206.7" width="70" height="93.3" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.6"/>
  <rect x="330" y="219.7" width="70" height="80.3" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.6"/>
  <rect x="450" y="221" width="70" height="79" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.6"/>
  <line x1="60" y1="221.1" x2="560" y2="221.1" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="66" y="212" font-size="11" fill="#dc2626">ln 2 = 0.6931472</text>
  <text x="125" y="66" font-size="11.5" text-anchor="middle" fill="#166534">0.7177346</text>
  <text x="245" y="199" font-size="11.5" text-anchor="middle" fill="#166534">0.6955550</text>
  <text x="365" y="212" font-size="11.5" text-anchor="middle" fill="#166534">0.6933875</text>
  <text x="485" y="213.5" font-size="11.5" text-anchor="middle" fill="#166534">0.6931712</text>
  <text x="125" y="318" font-size="12" text-anchor="middle" fill="#166534">h = 0.1</text>
  <text x="245" y="318" font-size="12" text-anchor="middle" fill="#166534">h = 0.01</text>
  <text x="365" y="318" font-size="12" text-anchor="middle" fill="#166534">h = 0.001</text>
  <text x="485" y="318" font-size="12" text-anchor="middle" fill="#166534">h = 0.0001</text>
  <text x="300" y="344" font-size="12" text-anchor="middle" fill="#65a30d">each step of h shrinks the gap by a factor near 10</text>
</svg>`

const dr104JumpChart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-label="Step chart: GIF jumps 1 at each integer while signum jumps 2 at 0">
  <rect x="0" y="0" width="600" height="300" fill="#ffffff"/>
  <text x="175" y="34" font-size="13.5" text-anchor="middle" fill="#166534">GIF: jump 1 at each integer</text>
  <line x1="60" y1="221.4" x2="146.25" y2="221.4" stroke="#16a34a" stroke-width="2"/>
  <line x1="146.25" y1="173.8" x2="203.75" y2="173.8" stroke="#16a34a" stroke-width="2"/>
  <line x1="203.75" y1="126.2" x2="261.25" y2="126.2" stroke="#16a34a" stroke-width="2"/>
  <line x1="261.25" y1="78.6" x2="290" y2="78.6" stroke="#16a34a" stroke-width="2"/>
  <line x1="146.25" y1="221.4" x2="146.25" y2="173.8" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
  <line x1="203.75" y1="173.8" x2="203.75" y2="126.2" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
  <line x1="261.25" y1="126.2" x2="261.25" y2="78.6" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
  <circle cx="146.25" cy="221.4" r="3.5" fill="#ffffff" stroke="#0f766e" stroke-width="1.5"/>
  <circle cx="146.25" cy="173.8" r="3.5" fill="#0f766e"/>
  <circle cx="203.75" cy="173.8" r="3.5" fill="#ffffff" stroke="#0f766e" stroke-width="1.5"/>
  <circle cx="203.75" cy="126.2" r="3.5" fill="#0f766e"/>
  <circle cx="261.25" cy="126.2" r="3.5" fill="#ffffff" stroke="#0f766e" stroke-width="1.5"/>
  <circle cx="261.25" cy="78.6" r="3.5" fill="#0f766e"/>
  <text x="152" y="206" font-size="10.5" fill="#dc2626">jump 1</text>
  <text x="209" y="158" font-size="10.5" fill="#dc2626">jump 1</text>
  <text x="267" y="111" font-size="10.5" fill="#dc2626">jump 1</text>
  <text x="146" y="268" font-size="11.5" text-anchor="middle" fill="#166534">1</text>
  <text x="204" y="268" font-size="11.5" text-anchor="middle" fill="#166534">2</text>
  <text x="261" y="268" font-size="11.5" text-anchor="middle" fill="#166534">3</text>
  <text x="80" y="214" font-size="11" fill="#65a30d">GIF = 0</text>
  <text x="220" y="167" font-size="11" fill="#65a30d">GIF = 1</text>
  <text x="270" y="120" font-size="11" fill="#65a30d">GIF = 2</text>
  <text x="445" y="34" font-size="13.5" text-anchor="middle" fill="#166534">signum: jump 2 at 0</text>
  <line x1="330" y1="150" x2="560" y2="150" stroke="#fcd34d" stroke-width="1.4" stroke-dasharray="5 4"/>
  <line x1="330" y1="221.4" x2="443" y2="221.4" stroke="#16a34a" stroke-width="2"/>
  <line x1="447" y1="78.6" x2="560" y2="78.6" stroke="#16a34a" stroke-width="2"/>
  <line x1="445" y1="221.4" x2="445" y2="78.6" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4 3"/>
  <circle cx="445" cy="221.4" r="3.5" fill="#ffffff" stroke="#0f766e" stroke-width="1.5"/>
  <circle cx="445" cy="78.6" r="3.5" fill="#ffffff" stroke="#0f766e" stroke-width="1.5"/>
  <text x="451" y="145" font-size="10.5" fill="#dc2626">jump 2</text>
  <text x="350" y="214" font-size="11" fill="#65a30d">signum = −1</text>
  <text x="480" y="71" font-size="11" fill="#65a30d">signum = +1</text>
  <text x="445" y="164" font-size="11" text-anchor="middle" fill="#166534">signum(0) = 0</text>
  <text x="445" y="268" font-size="11.5" text-anchor="middle" fill="#166534">0</text>
</svg>`

const dr104TailBars = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" role="img" aria-label="Bar chart of partial sums S_n for n = 10, 20, 30, 40, 43, 50 climbing into the band 9 plus or minus 0.1, first inside at n = 43">
  <rect x="0" y="0" width="600" height="340" fill="#ffffff"/>
  <text x="300" y="26" font-size="14" text-anchor="middle" fill="#166534">Sₙ = 9(1 − 0.9ⁿ) enters the band 9 ± 0.1 first at n = 43</text>
  <line x1="50" y1="300" x2="560" y2="300" stroke="#166534" stroke-width="1.4"/>
  <line x1="60" y1="308" x2="60" y2="45" stroke="#166534" stroke-width="1.4"/>
  <rect x="82" y="248.7" width="46" height="51.3" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.5"/>
  <rect x="172" y="127" width="46" height="173" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.5"/>
  <rect x="262" y="84.6" width="46" height="215.4" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.5"/>
  <rect x="352" y="69.9" width="46" height="230.1" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.5"/>
  <rect x="419" y="67.7" width="46" height="232.3" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
  <rect x="486" y="64.7" width="46" height="235.3" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.5"/>
  <line x1="60" y1="67.85" x2="560" y2="67.85" stroke="#d97706" stroke-width="1.3" stroke-dasharray="5 4"/>
  <line x1="60" y1="55.95" x2="560" y2="55.95" stroke="#d97706" stroke-width="1.3" stroke-dasharray="5 4"/>
  <line x1="60" y1="61.9" x2="560" y2="61.9" stroke="#0f766e" stroke-width="1.6"/>
  <text x="8" y="58" font-size="9.5" fill="#d97706">9.1</text>
  <text x="8" y="64" font-size="9.5" fill="#0f766e">9</text>
  <text x="8" y="70" font-size="9.5" fill="#d97706">8.9</text>
  <text x="105" y="241" font-size="10.5" text-anchor="middle" fill="#166534">5.8618940</text>
  <text x="195" y="119" font-size="10.5" text-anchor="middle" fill="#166534">7.9058101</text>
  <text x="285" y="77" font-size="10.5" text-anchor="middle" fill="#166534">8.6184796</text>
  <text x="375" y="62" font-size="10.5" text-anchor="middle" fill="#166534">8.8669721</text>
  <text x="442" y="60" font-size="10.5" text-anchor="middle" fill="#ea580c">8.9030226</text>
  <text x="509" y="57" font-size="10.5" text-anchor="middle" fill="#166534">8.9536160</text>
  <text x="105" y="316" font-size="11.5" text-anchor="middle" fill="#166534">n = 10</text>
  <text x="195" y="316" font-size="11.5" text-anchor="middle" fill="#166534">n = 20</text>
  <text x="285" y="316" font-size="11.5" text-anchor="middle" fill="#166534">n = 30</text>
  <text x="375" y="316" font-size="11.5" text-anchor="middle" fill="#166534">n = 40</text>
  <text x="442" y="316" font-size="11.5" text-anchor="middle" fill="#ea580c">n = 43</text>
  <text x="509" y="316" font-size="11.5" text-anchor="middle" fill="#166534">n = 50</text>
  <text x="300" y="332" font-size="11.5" text-anchor="middle" fill="#65a30d">the tail 9·0.9ⁿ shrinks by the factor 0.9 at every step</text>
</svg>`

/* Solution-figure helpers (compact, used inside worked solutions). */

const dr104SqrtLadderSol = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 300" role="img" aria-label="Bar ladder of (square root of 4 plus h minus 2) over h closing in on 0.25">
  <rect x="0" y="0" width="460" height="300" fill="#ffffff"/>
  <text x="230" y="26" font-size="13.5" text-anchor="middle" fill="#166534">the √x ladder closes on 1/4 = 0.25</text>
  <line x1="50" y1="260" x2="430" y2="260" stroke="#166534" stroke-width="1.4"/>
  <rect x="80" y="221.9" width="64" height="38.1" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.4"/>
  <rect x="200" y="106.3" width="64" height="153.7" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.4"/>
  <rect x="320" y="94.6" width="64" height="165.4" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.4"/>
  <line x1="60" y1="93.3" x2="430" y2="93.3" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="6 4"/>
  <text x="352" y="82" font-size="11" fill="#dc2626">1/4 = 0.25</text>
  <text x="112" y="214" font-size="11" text-anchor="middle" fill="#166534">0.2484567</text>
  <text x="232" y="98" font-size="11" text-anchor="middle" fill="#166534">0.2498439</text>
  <text x="352" y="87" font-size="11" text-anchor="middle" fill="#166534">0.2499844</text>
  <text x="112" y="278" font-size="11.5" text-anchor="middle" fill="#166534">h = 0.1</text>
  <text x="232" y="278" font-size="11.5" text-anchor="middle" fill="#166534">h = 0.01</text>
  <text x="352" y="278" font-size="11.5" text-anchor="middle" fill="#166534">h = 0.001</text>
</svg>`

const dr104JumpSol = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 280" role="img" aria-label="GIF step chart showing jumps of 1 at x = 1 and at x = 2">
  <rect x="0" y="0" width="460" height="280" fill="#ffffff"/>
  <text x="230" y="26" font-size="13.5" text-anchor="middle" fill="#166534">GIF jumps 1 at 1 and at 2</text>
  <line x1="50" y1="240" x2="430" y2="240" stroke="#fcd34d" stroke-width="1.3" stroke-dasharray="5 4"/>
  <line x1="60" y1="205.5" x2="150" y2="205.5" stroke="#16a34a" stroke-width="2"/>
  <line x1="150" y1="136.5" x2="330" y2="136.5" stroke="#16a34a" stroke-width="2"/>
  <line x1="330" y1="67.5" x2="420" y2="67.5" stroke="#16a34a" stroke-width="2"/>
  <line x1="150" y1="205.5" x2="150" y2="136.5" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
  <line x1="330" y1="136.5" x2="330" y2="67.5" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
  <circle cx="150" cy="205.5" r="3.5" fill="#ffffff" stroke="#0f766e" stroke-width="1.5"/>
  <circle cx="150" cy="136.5" r="3.5" fill="#0f766e"/>
  <circle cx="330" cy="136.5" r="3.5" fill="#ffffff" stroke="#0f766e" stroke-width="1.5"/>
  <circle cx="330" cy="67.5" r="3.5" fill="#0f766e"/>
  <text x="156" y="182" font-size="11" fill="#dc2626">jump 1</text>
  <text x="336" y="112" font-size="11" fill="#dc2626">jump 1</text>
  <text x="150" y="258" font-size="11.5" text-anchor="middle" fill="#166534">1</text>
  <text x="330" y="258" font-size="11.5" text-anchor="middle" fill="#166534">2</text>
</svg>`

const dr104ExpLadderSol = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 290" role="img" aria-label="Bar ladder of secant slopes of 2 to the x at x = 3 descending toward 8 ln 2 = 5.5451774">
  <rect x="0" y="0" width="480" height="290" fill="#ffffff"/>
  <text x="240" y="26" font-size="13.5" text-anchor="middle" fill="#166534">the 2^x ladder at x = 3 descends on 8·ln 2</text>
  <line x1="50" y1="240" x2="460" y2="240" stroke="#166534" stroke-width="1.4"/>
  <rect x="70" y="57.3" width="60" height="182.7" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.4"/>
  <rect x="180" y="217.9" width="60" height="22.1" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.4"/>
  <rect x="290" y="233.6" width="60" height="6.4" fill="#5eead4" fill-opacity="0.55" stroke="#0d9488" stroke-width="1.4"/>
  <rect x="400" y="235.1" width="60" height="4.9" fill="#ffedd5" stroke="#ea580c" stroke-width="1.6"/>
  <line x1="55" y1="235.3" x2="455" y2="235.3" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="6 4"/>
  <text x="55" y="230" font-size="10.5" fill="#dc2626">8 ln 2 = 5.5451774</text>
  <text x="100" y="50" font-size="10.5" text-anchor="middle" fill="#166534">5.7418770</text>
  <text x="210" y="210" font-size="10.5" text-anchor="middle" fill="#166534">5.5644400</text>
  <text x="320" y="226" font-size="10.5" text-anchor="middle" fill="#166534">5.5470997</text>
  <text x="430" y="252" font-size="10.5" text-anchor="middle" fill="#ea580c">5.5453696</text>
  <text x="100" y="258" font-size="11" text-anchor="middle" fill="#166534">h = 0.1</text>
  <text x="210" y="258" font-size="11" text-anchor="middle" fill="#166534">h = 0.01</text>
  <text x="320" y="258" font-size="11" text-anchor="middle" fill="#166534">h = 0.001</text>
  <text x="430" y="268" font-size="11" text-anchor="middle" fill="#ea580c">h = 0.0001</text>
</svg>`

/* ------------------------------------------------------------------ */
/* The lesson                                                          */
/* ------------------------------------------------------------------ */

export const lesson104: Lesson = {
  id: 'aa-the-doorstep-limits-and-the-changing-output',
  number: '10.4',
  title: 'The Doorstep: Limits and the Changing Output',
  concepts: [
    'the limit of the secant slopes',
    'the difference quotient and the secant ladder',
    'the ε–N promise for the infinite tail',
    'the derivative as a named machine',
    'the natural base e and the slope-1 ladder',
    'continuity named as a promise and the jump witnesses',
    'the four doors of the handoff',
  ],
  objectives: [
    'state the ε–N form of the convergence promise and price it on the 0.9-tail',
    'compute secant slopes of x², 1/x, 2^x and log₂ x at pinned points for a chain of h values',
    'carry the quotient algebra of x² and 1/x to its exact exit and say precisely where it fails for 2^x',
    'name the derivative as the limit of secant slopes and read the four-family derivative table with its honest status marks',
    'separate the line rate (one number) from the curve rate (a new function) across the AL 10.2 seam',
    'witness continuity and its failure through the signum and GIF jumps',
  ],
  prerequisites: [
    'aa-geometric-progressions-and-the-infinite-tail',
    'aa-exponential-and-logarithmic-series',
    'aa-function-zoo-modulus-signum-gif-elementary-catalog',
    'al-slope-the-steepness-theorem',
  ],
  sources: ['cengage-jee-style', 'jee-main-2026-syllabus', 'openstax-college-algebra', 'hall-knight-higher-algebra'],
  blocks: [
    /* ---------- opening: three promises, one machine ---------- */
    { kind: 'para', text: 'This book has made three great promises and kept every one of them the same way. Lesson 5.2 promised a SUM for the infinite tail $0.9 + 0.9^2 + 0.9^3 + \\dots$ and delivered it by banding the partial sums. Lesson 9.1 promised a place on the number line for $\\sqrt{2}$ and delivered it by squeezing the rationals from both sides. Lesson 9.5 promised a value for $e$ and delivered it by pricing $2.7182818$ against a closing band. Three different topics, one identical move: build witnesses, watch the gap shrink, and promise that it closes.' },
    { kind: 'para', text: 'The move worked every time, but it was always a PROMISE — we priced the band and named the landing value, and we deferred the machine that makes the closure certain. This, the last new idea of the book, is where the deferral ends. The machine is called THE LIMIT, and on this doorstep we do two things with it: we name it honestly on a sum we already own, and then we cash it on the question the book has been circling since AL 10.2 — what is the rate of change of a CURVE? At the far side of the lesson stand four doors. Walking through them is the next book\'s job; building the key was ours.' },
    { kind: 'callout', tone: 'insight', title: 'What "deferred" meant', text: 'A deferral in this book was never a refusal. Each time we priced a value numerically (the sum 9, the rung 1.4142135, the base 2.7182818) we were doing honest mathematics with an unnamed tool. Naming the tool is the last lesson\'s work — and it explains why the pricing tables of 5.2, 9.1 and 9.5 all had the same shape.' },

    /* ---------- 1. the infinite tail met again ---------- */
    { kind: 'heading', text: 'The Infinite Tail, Met Again' },
    { kind: 'para', text: 'Take the old witness apart once more, now with the doorstep vocabulary. The partial sums of $\\sum 0.9^k$ (the rungs $k = 1, 2, 3, \\dots$) are $S_n = 9(1 - 0.9^n)$ — the same closed form Lesson 5.2 derived, and the engine re-sums it rung by rung to certify every value below. The tail — what is still owed after $n$ terms — is $9 - S_n = 9 \\cdot 0.9^n$.' },
    { kind: 'table', caption: 'Partial sums of Σ0.9^k and the remaining tail, recomputed rung by rung', head: ['n', 'Sₙ = 9(1 − 0.9ⁿ)', 'tail 9 − Sₙ'], rows: [
      ['10', '5.8618940', '3.1381060'],
      ['20', '7.9058101', '1.0941899'],
      ['30', '8.6184796', '0.3815204'],
      ['40', '8.8669721', '0.1330279'],
      ['43', '8.9030226', '0.0969774'],
      ['50', '8.9536160', '0.0463840'],
    ] },
    { kind: 'para', text: 'Read the table twice. First read: the partials climb — $S_{10} = 5.8618940$, then $7.9058101$, $8.6184796$, $8.8669721$, $8.9536160$ — and they climb TOWARD something, without ever passing it. Second read: the tail $9 \\cdot 0.9^n$ is itself a geometric sequence with ratio $0.9$, so each step of $n$ multiplies the remaining debt by $0.9$: the tail after 30 terms is $0.3815204$, after 40 terms $0.1330279$, after 50 terms $0.0463840$. The gap does not merely shrink; it shrinks by a FIXED FACTOR, and that is why the closure promise can be priced.' },
    { kind: 'figure', caption: 'Figure 1 — the partial sums climb into the band 9 ± 0.1; the orange bar (n = 43) is the first witness inside the band', svg: dr104TailBars },
    { kind: 'callout', tone: 'definition', title: 'The promise, in its definition-shaped form (ε–N)', text: 'To say "$S_n$ converges to 9" means: FOR EVERY tolerance $\\varepsilon > 0$ THERE IS a rank $N$ such that $|S_n - 9| < \\varepsilon$ for every $n \\ge N$. The tolerance is chosen first — any positive number, however small — and the promise is that some rank $N$ answers it. On this tail the answer is explicit: since $|S_n - 9| = 9 \\cdot 0.9^n$, the rank for $\\varepsilon = 0.1$ is $N = 43$ (the engine checks $9 \\cdot 0.9^{42} = 0.1077526 \\ge 0.1$ and $9 \\cdot 0.9^{43} = 0.0969774 < 0.1$), and the rank for $\\varepsilon = 0.001$ is $N = 87$.' },
    { kind: 'para', text: 'Two honest warnings about the pricing above. First, there is a second, smaller read of the same tail: asking for the single RUNG $0.9^n$ to fall below the tolerance (rather than the whole tail $9 \\cdot 0.9^n$). That term read answers $n = 22$ for $\\varepsilon = 0.1$, because $0.9^{21} = 0.1094190$ is still above $0.1$ while $0.9^{22} = 0.0984771$ is below; and $n = 66$ for $\\varepsilon = 0.001$, because $0.9^{65} = 0.0010611$ sits above while $0.9^{66} = 0.0009550$ sits below. The factor of 9 in the tail is exactly what pushes the tail read from 22 up to 43 and from 66 up to 87. Both reads are correct for their own questions; keep them apart. Second, and more important: what we did NOT do is prove that every tolerance gets answered. We priced the two tolerances we named, and the pattern ($9 \\cdot 0.9^n$ below $\\varepsilon$) makes the general answer visible — but the general machinery that turns a visible pattern into a theorem is the next book\'s. Here the promise is stated, witnessed and priced, never proved.' },

    /* ---------- 2. the changing output, measured discretely ---------- */
    { kind: 'heading', text: 'The Changing Output, Measured Discretely' },
    { kind: 'para', text: 'AL 10.2 priced the rate of change for one class of objects: LINES. There the steepness theorem told us the whole story — a line\'s steepness is one number $m = (y_2 - y_1)/(x_2 - x_1)$, computed from any two points, the same at every place on the line. A curve refuses this. The parabola $y = x^2$ is gentle near $x = 0$ and steep near $x = 10$; no single number can be its "steepness". The honest discrete read is to measure the rate over an INTERVAL of width $h$ and let $h$ shrink.' },
    { kind: 'para', text: 'For $f$ and a point $x$, choose a step $h$ and measure how much the output moves per unit of input:' },
    { kind: 'equation', latex: '\\frac{f(x+h) - f(x)}{h} \\tag{1}', note: 'the secant slope, also called the difference quotient — a rise over a run of width h' },
    { kind: 'para', text: 'This number is the slope of the SECANT LINE: the straight line joining $(x, f(x))$ to $(x+h, f(x+h))$ on the curve. For a line, Expression (1) returns the same $m$ for every pair of points. For a curve it depends on BOTH $x$ (where we stand) and $h$ (how far we lean). The programme of this lesson is to hold $x$ fixed and push $h$ down through a ladder of values — $1$, $0.1$, $0.01$, $0.001$, \\dots — and watch whether the secant slopes settle.' },
    { kind: 'figure', caption: 'Figure 2 — the secant ladder on y = x² pivoting at P(1.5, 2.25): slopes 4, 3.5, 3.25 pivot into the tangent slope 3 as h shrinks', svg: dr104SecantLadder },
    { kind: 'table', caption: 'The secant ladder of f(x) = x² at the fixed point x = 1.5, computed exactly', head: ['h', 'secant joins', 'slope (f(1.5+h) − f(1.5))/h'], rows: [
      ['1', '(1.5, 2.25) to (2.5, 6.25)', '4'],
      ['0.5', '(1.5, 2.25) to (2, 4)', '3.5'],
      ['0.25', '(1.5, 2.25) to (1.75, 3.0625)', '3.25'],
      ['0.1', '(1.5, 2.25) to (1.6, 2.56)', '3.1'],
      ['0.01', '(1.5, 2.25) to (1.51, 2.2801)', '3.01'],
    ] },
    { kind: 'para', text: 'The slopes $4, 3.5, 3.25, 3.1, 3.01$ close in on $3$ — and Figure 2 shows the same thing geometrically, the three secants pivoting about $P$ into the dashed TANGENT LINE, the rung at which the two points of the secant have merged. The tangent at $P$ has slope $3$ and passes through $(1.5, 2.25)$, so its equation is $y = 3x - 2.25$ (check: $3 \\cdot 1.5 - 2.25 = 2.25$); the $h = 1$ secant through $P$ and $(2.5, 6.25)$ is $y = 4x - 3.75$. The tangent is named here as the $h \\to 0$ ENDPOINT of the ladder — the line the secants are settling onto — and that naming is a promise priced by the table, not a construction proved.' },
    { kind: 'example', title: 'Illustration 1 — the ladder and its landing value at x = 1.5', steps: ['Take f(x) = x² at the fixed point x = 1.5 and let the secant join (1.5, 2.25) to (1.5 + h, (1.5 + h)²).', 'Now, h = 1 gives the slope ((2.5)² − (1.5)²)/1 = (6.25 − 2.25)/1 = 4, and h = 0.5 gives (4 − 2.25)/0.5 = 3.5.', 'So, h = 0.25 gives ((1.75)² − 2.25)/0.25 = (3.0625 − 2.25)/0.25 = 3.25, and h = 0.1 gives 3.1.', 'Hence the ladder 4, 3.5, 3.25, 3.1, 3.01 is closing on 3, and the tangent line the ladder names is y = 3x − 2.25 with slope 3 = 2 · 1.5.'] },

    /* ---------- family 1: x² — algebra wins ---------- */
    { kind: 'heading', text: 'Four Families on the Rack: Where the Algebra Exits' },
    { kind: 'para', text: 'Fix $x = 3$ and push the ladder of $h$ under $f(x) = x^2$. Every value below is computed directly from $(3+h)^2$:' },
    { kind: 'table', caption: 'Secant slopes of f(x) = x² at x = 3: the ladder 7, 6.1, 6.01, 6.001', head: ['h', 'f(3+h) − f(3)', 'secant slope'], rows: [
      ['1', '3', '7'],
      ['0.1', '0.61', '6.1'],
      ['0.01', '0.0601', '6.01'],
      ['0.001', '0.006001', '6.001'],
    ] },
    { kind: 'para', text: 'The ladder $7, 6.1, 6.01, 6.001$ is closing on $6$. But this family offers something the next three will not: the quotient itself can be SIMPLIFIED by school algebra before any push happens. The expansion $(x+h)^2 = x^2 + 2xh + h^2$ — the binomial cash of Chapters 2 and 7 — makes the numerator collapse.' },
    { kind: 'derivation', title: 'The quotient algebra of f(x) = x²', statement: 'Simplify the difference quotient of $f(x) = x^2$ exactly, for every $x$ and every admissible $h \\ne 0$.', steps: [
      { label: 'Expand the square', formula: '(x+h)^2 - x^2 = x^2 + 2xh + h^2 - x^2', explanation: 'The binomial expansion of Chapter 2 is an identity, valid for all x and h; the engine re-checks it numerically at (3, 0.1), (1.5, 0.25) and (2.7, 0.01) with zero error.' },
      { label: 'Cancel', formula: '(x+h)^2 - x^2 = 2xh + h^2', explanation: 'The pure x² part cancels; what survives is the mixed term and the h² corner.' },
      { label: 'Divide by h', formula: '\\frac{2xh + h^2}{h} = 2x + h', explanation: 'Legal because h ≠ 0 on the ladder — every rung of the quotient (1) is computed at a nonzero step, so the division is school algebra, not a limit.' },
      { label: 'Push h → 0', formula: '2x + h \\;\\longrightarrow\\; 2x', explanation: 'The surviving h dies in the push. This is the only step that is not algebra — it is the named machine, applied for the first time.' },
    ], result: 'For every $x$, the secant slopes of $x^2$ equal $2x + h$ exactly, and the push $h \\to 0$ names the landing value $2x$. At $x = 3$ the algebra reads $2(3) + h = 6 + h$: rung for rung it reproduces the table ($7$, $6.1$, $6.01$, $6.001$) and names the landing value $6$.' },
    { kind: 'para', text: 'The same algebra closes the continuity band quoted later: $f(x+h) - f(x) = 2xh + h^2 = h(2x + h)$, an EXACT identity, so at $x = 3$ with $h = 0.01$ the output moves by $0.01 \\cdot 6.01 = 0.0601$ — no inequality, no estimate, an equality the engine certifies to twelve decimals.' },

    /* ---------- family 2: 1/x — algebra wins again ---------- */
    { kind: 'heading', text: 'The Reciprocal: the Common-Denominator Exit' },
    { kind: 'para', text: 'Now rack up $f(x) = 1/x$ at the fixed point $x = 2$ (the family is defined only off $0$, and every ladder below stands on positive ground). The direct quotients are ugly decimals, but they are honest:' },
    { kind: 'table', caption: 'Secant slopes of f(x) = 1/x at x = 2: the ladder closes on −0.25 from above', head: ['h', 'secant slope (f(2+h) − f(2))/h'], rows: [
      ['0.1', '−0.2380952'],
      ['0.01', '−0.2487562'],
      ['0.001', '−0.2498751'],
    ] },
    { kind: 'para', text: 'The slopes $-0.2380952, -0.2487562, -0.2498751$ close on $-0.25$: the reciprocal FALLS as $x$ grows, so its rate is negative, and the shrinkage slows as $x$ grows. Once again the algebra finds an exit — not a binomial this time, but the common-denominator move of Chapter 3.' },
    { kind: 'derivation', title: 'The quotient algebra of f(x) = 1/x', statement: 'Simplify the difference quotient of $f(x) = 1/x$ exactly, for $x \\ne 0$ and $h \\ne 0$ with $x + h \\ne 0$.', steps: [
      { label: 'Common denominator', formula: '\\frac{1}{x+h} - \\frac{1}{x} = \\frac{x - (x+h)}{x(x+h)}', explanation: 'The identity of the additive inverse over the product — checked by the engine at (2, 0.01) and (2, 0.001) to twelve decimals.' },
      { label: 'Collapse the numerator', formula: '\\frac{x - (x+h)}{x(x+h)} = \\frac{-h}{x(x+h)}', explanation: 'The x cancels against x; the −h is the whole output change, which is why the reciprocal changes so gently.' },
      { label: 'Divide by h', formula: '\\frac{1}{h} \\cdot \\frac{-h}{x(x+h)} = \\frac{-1}{x(x+h)}', explanation: 'The h cancels exactly — again pure algebra, no limit taken.' },
      { label: 'Push h → 0', formula: '\\frac{-1}{x(x+h)} \\;\\longrightarrow\\; \\frac{-1}{x^2}', explanation: 'The push drives the factor x + h to x. At x = 2 the landing value is −1/4 = −0.25, exactly where the ladder points.' },
    ], result: 'For every admissible $x$, the secant slopes of $1/x$ equal $\\frac{-1}{x(x+h)}$ exactly, and the push names the landing value $\\frac{-1}{x^2}$. At $x = 2$: the landing value is $-0.25$, and the ladder $-0.2380952, -0.2487562, -0.2498751$ closes on it from above.' },

    /* ---------- family 3: 2^x — the wall ---------- */
    { kind: 'heading', text: 'The Exponential: Where the Wall Stands' },
    { kind: 'para', text: 'Third family: $f(x) = 2^x$ at the fixed point $x = 1$. Compute the ladder directly — $(2 + 0.1)^1$ is a number, $2^{1.1}$ is a number, and the engine prices every rung:' },
    { kind: 'table', caption: 'Secant slopes of f(x) = 2^x at x = 1: the ladder descends on 1.3862944 from above', head: ['h', 'secant slope (f(1+h) − f(1))/h'], rows: [
      ['0.1', '1.4354693'],
      ['0.01', '1.3911100'],
      ['0.001', '1.3867749'],
    ] },
    { kind: 'para', text: 'The ladder $1.4354693 > 1.3911100 > 1.3867749$ descends and closes on $1.3862944$ — which is $2 \\ln 2$, twice the value $\\ln 2 = 0.6931472$ priced by the fast series of Lesson 9.5. The target is thus PRICED, not derived here. And now the honest obstruction: try to repeat the trick of the last two families. The numerator is $2^{x+h} - 2^x = 2^x(2^h - 1)$. No binomial theorem expands $2^h$ — the exponential puts its variable in the POSSESSIVE position, upstairs, where Chapter 7\'s algebra has no grip. The quotient $2^x (2^h - 1)/h$ simplifies no further at school level: the factor $(2^h - 1)/h$ is stuck.' },
    { kind: 'callout', tone: 'warn', title: 'The wall, stated precisely', text: 'The difference quotient of $a^x$ reduces to $a^x \\cdot (a^h - 1)/h$, and NO algebraic identity collapses $(a^h - 1)/h$ — that is the wall. What this lesson does is name the landing value ($2\\ln 2$ at $x = 1$ for $a = 2$, with $\\ln 2 = 0.6931472$ priced by 9.5\'s series) and certify that the numeric ladder closes on it. The ALGEBRAIC machinery that evaluates such limits is calculus\'s, and it lives behind the Calculus door.' },
    { kind: 'para', text: 'The wall has a most informative special rung: stand at $x = 0$, where $a^x = 1$ and the quotient collapses to $(a^h - 1)/h$ — the base itself, no $x$ anywhere. For $a = 2$ the ladder is:' },
    { kind: 'table', caption: 'The base ladder (2^h − 1)/h: closing on ln 2 = 0.6931472', head: ['h', '(2^h − 1)/h'], rows: [
      ['0.1', '0.7177346'],
      ['0.01', '0.6955550'],
      ['0.001', '0.6933875'],
      ['0.0001', '0.6931712'],
    ] },
    { kind: 'figure', caption: 'Figure 3 — the base ladder (2^h − 1)/h closes on ln 2 = 0.6931472; each halving of h shrinks the gap roughly tenfold', svg: dr104LadderBars },
    { kind: 'para', text: 'This ladder prices a fact we shall use in a moment: $(2^h - 1)/h \\to \\ln 2$. Note what the wall means for exam honesty: when an examination item asks for the slope of $2^x$ at a point, the expected work is to READ the named rule and price it numerically — exactly what we do here — because the quotient cannot be simplified by hand.' },

    /* ---------- the natural base revealed ---------- */
    { kind: 'heading', text: 'The Natural Base Revealed' },
    { kind: 'para', text: 'Run the same base ladder for the other famous base — Lesson 9.5\'s priced constant $e = 2.7182818$:' },
    { kind: 'table', caption: 'The base ladder (e^h − 1)/h: closing on 1', head: ['h', '(e^h − 1)/h'], rows: [
      ['0.1', '1.0517092'],
      ['0.01', '1.0050167'],
      ['0.001', '1.0005002'],
      ['0.0001', '1.0000500'],
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why e is "natural" — the slope-1 answer', text: 'The ladder $(e^h - 1)/h$ closes on exactly 1: at $x = 0$ the graph of $e^x$ climbs at slope 1 — for every other base the landing value is $\\ln a$, different from 1. Lesson 9.2 promised that the fold between $2^x$ and its inverse would open a door at the end of the book; THIS is that door. The base $e$ is the one whose exponential is its own simplest description: the secant slope of $e^x$ at $0$ needs no scale factor at all. That is the honest, numeric meaning of "natural".' },

    /* ---------- family 4: log2 — the wall again ---------- */
    { kind: 'heading', text: 'The Logarithm: the Exponential\'s Upside Down' },
    { kind: 'para', text: 'Fourth family: $f(x) = \\log_2 x$ at the fixed point $x = 1$. The quotient is $\\log_2(1+h)/h$ — once again a variable trapped inside a function with no algebraic grip, the wall of the last family seen from the other side (the logarithm IS the upside down of the exponential):' },
    { kind: 'table', caption: 'Secant slopes of f(x) = log₂ x at x = 1: the ladder climbs on 1/ln 2 = 1.4426950 from below', head: ['h', 'secant slope (f(1+h) − f(1))/h'], rows: [
      ['0.1', '1.3750352'],
      ['0.01', '1.4355293'],
      ['0.001', '1.4419742'],
    ] },
    { kind: 'para', text: 'The ladder $1.3750352 < 1.4355293 < 1.4419742$ climbs and closes on $1/\\ln 2 = 1.4426950$ — the exponential\'s landing value INVERTED, exactly as the upside-down shape suggests: the slope of the log at $1$ is the reciprocal of the slope of the exponential at $1$. The target is priced by 9.5\'s series ($\\ln 2 = 0.6931472$) and the numerics certify the approach; the algebraic evaluation is behind the wall with the exponential\'s.' },

    /* ---------- 3. the derivative, named ---------- */
    { kind: 'heading', text: 'The Derivative, Named' },
    { kind: 'para', text: 'Four families, one shared machine. For $x^2$ and $1/x$ the quotient algebra found an exact exit and the push finished the job. For $2^x$ and $\\log_2 x$ the wall blocked the algebra, and the numeric ladder did all the certifying. In every case the OBJECT being computed was the same: the landing value of the secant slopes as $h \\to 0$. That object deserves its name.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the derivative', text: 'The DERIVATIVE of $f$ at $x$ is the LIMIT of the secant slopes as the step $h$ shrinks to $0$: in symbols, $f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$. It is a NEW MACHINE built on the limit: the numerator $f(x+h) - f(x)$ measures the output change over a run of width $h$, the division converts it to a rate, and the limit names the value the rates approach. In this lesson the derivative is named and PRICED NUMERICALLY — ladder by ladder — and proved nowhere: the machinery that evaluates limits in general is calculus\'s and is not built here.' },
    { kind: 'equation', latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} \\tag{2}", note: 'the machine of this doorstep — read it as "the landing value of the secant slopes"' },
    { kind: 'table', caption: 'The four-family derivative table, with honest status marks', head: ['function', 'derivative at x', 'status of this row'], rows: [
      ['$x^2$', '$2x$', 'algebra-derived (the binomial quotient, this lesson)'],
      ['$\\frac{1}{x}$', '$-\\frac{1}{x^2}$', 'algebra-derived (the common-denominator quotient, this lesson)'],
      ['$a^x$', '$a^x \\ln a$', 'named + numerically priced (the wall; targets priced by 9.5)'],
      ['$\\log_a x$', '$\\frac{1}{x \\ln a}$', 'named + numerically priced (the wall; targets priced by 9.5)'],
    ] },
    { kind: 'para', text: 'Read the status column before the values. Two rows are ALGEBRA-DERIVED: for $x^2$ and $1/x$ this lesson carried the quotient to an exact exit, so the landing values $2x$ and $-1/x^2$ rest on identity plus one named push. Two rows are NAMED + NUMERICALLY PRICED: for $a^x$ and $\\log_a x$ the wall blocks any school-level exit, so the rows are targets that the ladders close on — $2^x$ at $x = 1$ toward $2\\ln 2 = 1.3862944$; $\\log_2 x$ at $x = 1$ toward $1/\\ln 2 = 1.4426950$; and at fresh points the same pattern holds, for instance $2^x$ at $x = 3$ toward $8 \\ln 2 = 5.5451774$ and $\\log_{10} x$ at $x = 100$ toward $1/(100 \\ln 10) = 0.0043429$. Nothing here was proved; everything here was either derived (two rows) or priced (two rows).' },
    { kind: 'callout', tone: 'warn', title: 'A rung is not the landing value', text: 'The most common misread of this lesson: quoting a secant slope at one convenient h as if it were the derivative. The rung at $h = 0.1$ for $x^2$ at $x = 3$ is $6.1$; the landing value is $6$. They agree to one decimal and differ in the digit that matters. An answer to a rate question must say which it is giving — a rung (a measured secant slope at a named h) or the named landing value (the derivative).' },
    { kind: 'callout', tone: 'exam', title: 'Exam-style reading of this table', text: 'Examination items on this material stay inside the honesty boundary drawn here: they ask either for a difference quotient at a NAMED h (pure algebra — the $x^2$ and $1/x$ rows suffice) or for the numeric comparison of a ladder rung against the named value (read the table, price one rung). Items demanding an unaided evaluation of $\\lim_{h \\to 0}(2^h - 1)/h$ belong to the next book, not to this syllabus point.' },

    /* ---------- 4. lines vs curves: the AL 10.2 seam ---------- */
    { kind: 'heading', text: 'Slope for Lines vs Slope for Curves: the AL 10.2 Seam' },
    { kind: 'para', text: 'The seam between AL 10.2 and this lesson is the widest idea-gap in the book, so walk it slowly. For a LINE, the steepness theorem (cited, not re-proved) says the rate is ONE number: compute $(y_2 - y_1)/(x_2 - x_1)$ from any two points and you own the steepness at every point at once. For a CURVE the computation (1) returns a value that depends on where you stand: the rate at $x = 3$ for $x^2$ is $6$, at $x = 1.5$ it is $3$, at $x = 10$ it is $20$. The curve\'s rate is not a number — it is a NEW FUNCTION of $x$.' },
    { kind: 'table', caption: 'The seam, question by question', head: ['question', 'line (AL 10.2)', 'curve (this lesson)'], rows: [
      ['what is the rate?', 'one number, the steepness m', 'a new function f′ of x'],
      ['which machine?', 'the steepness theorem (cited)', 'the limit of secant slopes (named)'],
      ['what does a computation give?', 'the same value at every point', 'a rung at one h, one x'],
      ['the geometric endpoint', 'the line itself', 'the tangent line at each x'],
    ] },
    { kind: 'para', text: 'This is why the derivative table reads $x^2 \\mapsto 2x$ and not "$x^2$ has slope 6": the number 6 is the landing value AT $x = 3$. The function $2x$ is the rate FUNCTION — feed it any $x$ and it returns the slope of the tangent there. The parabola of Chapter 2 was a formula to be factored and completed; seen through the new machine it is a geometric object whose steepness changes by the rule $2x$, and Coordinate Geometry (door two, below) is the subject that finishes that picture.' },

    /* ---------- 5. continuity named as a promise ---------- */
    { kind: 'heading', text: 'Continuity, Named as a Promise' },
    { kind: 'para', text: 'The machine named above needs one property of the underlying function, and the function zoo of Chapter 1 already contains both its owners and its violators. The informal read: a function is CONTINUOUS at $x$ when a small change of input moves the output only a little — no jumps, no tearing. For the tame families this is visible from the algebra: $f(x+h) - f(x) = h(2x + h)$ for $x^2$ dies with $h$.' },
    { kind: 'para', text: 'The violators are old friends. The signum function jumps at $0$: the engine checks $\\mathrm{signum}(0.001) - \\mathrm{signum}(-0.001) = 2$ — an input change of $0.002$, an output change of $2$ — while away from $0$ the same-sized change moves nothing ($\\mathrm{signum}(1.001) - \\mathrm{signum}(0.999) = 0$). The GIF (floor) jumps $1$ at EVERY integer: $\\mathrm{gif}(1.0001) - \\mathrm{gif}(0.9999) = 1$ and $\\mathrm{gif}(2.001) - \\mathrm{gif}(1.999) = 1$, yet at a non-integer like $2.5$ the same move gives $0$. A jump of any size kills the derivative machine: at the jump there is no landing value, because the secant slopes refuse to settle — from the left they herd toward one number, from the right toward another, and the gap between those two is the jump itself.' },
    { kind: 'figure', caption: 'Figure 4 — the jump witnesses: GIF steps up 1 at each integer; signum jumps 2 at 0. The smooth families move their outputs continuously', svg: dr104JumpChart },
    { kind: 'callout', tone: 'theorem', title: 'The continuity promise (stated honestly, witnessed, not proved)', text: 'The derivative\'s $h \\to 0$ push is meaningful where the function is CONTINUOUS — where $f(x + h)$ lands on $f(x)$ as $h$ shrinks. For the smooth families the band is computable: $|f(x+h) - f(x)| = h(2|x| + h)$ for $x^2$, EXACTLY, so at $x = 3$ with $h = 0.01$ the output moves $0.0601$, and with $h = 0.001$ it moves $0.006001$. The general machine behind such bands — the ε–δ read of continuity, the dual of the ε–N promise of the tail — belongs to calculus. Here the promise is named, witnessed on the jumps of the zoo, and priced on the band of the parabola; it is proved nowhere.' },

    /* ---------- 6. the handoff ---------- */
    { kind: 'heading', text: 'The Handoff — the Four Neighbouring Doors' },
    { kind: 'para', text: 'The book closes by handing its banked assets to the neighbours. Each door takes a specific account with it — not a vague "you are ready", but named lessons whose results are load-bearing on the other side:' },
    { kind: 'list', ordered: true, marker: 'roman', items: [
      'The Calculus door takes the machine itself: the limit named here on the tail and the derivative table priced here become the definitions the next book proves with. This book\'s promises — 5.2\'s sum, 9.1\'s rung, 9.5\'s base, and the ε–N form they share — are cashed there, starting with the ε–δ machinery and the evaluation of the walled limits $(a^h - 1)/h$.',
      'The Coordinate Geometry door takes the parabola re-seen: Chapter 2\'s formula $y = x^2$, through the derivative $2x$ of this lesson, becomes a geometric object with tangent lines at every point — and the conic sections of that door attach foci and directrices to it.',
      'The Trigonometry door takes the periodic gap: Chapter 1\'s period census catalogued cyclic behaviour but owned no periodic functions; that door builds sine and cosine as the machine family the census was waiting for, with their own quotient algebras to derive.',
      'The Probability door takes the counting cash: Chapter 6\'s permutations, combinations and the binomial counts become the MEASURE of events — the same binomial whose expansion cracked the $x^2$ quotient in this lesson reappears as the arithmetic of chance.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'The first time through the door', text: 'The machine named in this lesson has a famous birth. In the 17th century, Isaac Newton in England and Gottfried Wilhelm Leibniz on the continent independently built the calculus — the same limit machinery this book deferred, each publishing in his own notation, each convinced the other had taken his ideas; the priority dispute between their followers ran for generations and is a standing lesson in how jealous new machines make their makers. What matters here is the shape of their common achievement: both understood that secant slopes pushed to a limit answer the ancient questions of tangents and of changing quantities at once, and both priced their machines on the same kinds of ladders this lesson printed. The doorway the limit opened is the one this book ends at.' },

    /* ---------- Illustrations 2-4 ---------- */
    { kind: 'example', title: 'Illustration 2 — pricing an ε–N rank on a fresh tail', steps: ['Question: for the tail of Σ 0.8^k, whose sum is 0.8/(1 − 0.8) = 5, find the first rank n with the remaining tail below ε = 0.05.', 'Now, the tail is 5 · 0.8^n, and the engine prices the boundary: 5 · 0.8^20 = 0.0576461, which is still above 0.05.', 'So, n = 20 fails, while the next rung gives 5 · 0.8^21 = 0.0461169 < 0.05.', 'Hence the first witness rank is n = 21 — and past it every later rank is smaller still, since the tail multiplies by 0.8 at every step.'] },
    { kind: 'example', title: 'Illustration 3 — reading the jumps off the zoo', steps: ['Question: name the jump sizes of signum and GIF at their break points, with witnesses.', 'Now, signum at 0: signum(0.001) − signum(−0.001) = 1 − (−1) = 2, so the jump is 2; away from 0 the same move gives signum(1.001) − signum(0.999) = 0.', 'So, GIF at each integer: gif(1.0001) − gif(0.9999) = 1 and gif(2.001) − gif(1.999) = 1, so the jump is 1 everywhere on the integers; at a non-integer such as 2.5 the move gives 0.', 'Hence the derivative machine is welcome on the smooth intervals of both functions and is barred exactly at 0 for signum (jump 2) and at each integer for GIF (jump 1).'] },
    { kind: 'example', title: 'Illustration 4 — the half-wall: √x priced through the conjugate', steps: ['Question: price the secant slopes of f(x) = √x at x = 4 for h = 0.1, 0.01, 0.001 and name the landing value.', 'Now, (√(4+h) − 2)/h is not binomial-expanded, but the conjugate move rationalises it exactly: √(4+h) − 2 = h/(√(4+h) + 2), so the quotient equals 1/(√(4+h) + 2) — an identity the engine certifies at all three h.', 'So, h = 0.1 gives 1/(√4.1 + 2) = 0.2484567, h = 0.01 gives 0.2498439, and h = 0.001 gives 0.2499844.', 'Hence the ladder closes on 1/(√4 + 2) = 1/4 = 0.25, which is plain arithmetic at h = 0 — the naive wall is a half-wall: the algebra exits and the push only has to read the answer.'] },

    /* ---------- vocabulary ---------- */
    { kind: 'terms', items: [
      { term: 'the limit', def: 'the machine this book deferred: the value the witnesses of a process settle onto as the step shrinks — of partial sums as n grows, of secant slopes as h shrinks. Named here; evaluated in general by calculus.' },
      { term: 'the tolerance ε', def: 'the positive number chosen first in a convergence promise; the promise answers it with a rank N. Priced on the 0.9-tail: ε = 0.1 needs N = 43 (tail read) and ε = 0.001 needs N = 87.' },
      { term: 'the secant slope', def: 'the difference quotient (f(x+h) − f(x))/h: the measured rate of change over an interval of width h — the slope of the chord joining two curve points.' },
      { term: 'the difference quotient', def: 'the same object under its algebraic name; for x² it collapses exactly to 2x + h, for 1/x to −1/(x(x+h)), for the exponential and log it hits the wall.' },
      { term: 'the derivative', def: 'the limit of the secant slopes as h → 0 — the curve\'s rate function. Two of the four rows here are algebra-derived, two are named and numerically priced.' },
      { term: 'the tangent line', def: 'the endpoint of the secant ladder: the line through (x, f(x)) with slope f′(x), named as the h → 0 settling of the secants and priced by the tables, never constructed.' },
      { term: 'continuity', def: 'the promise that small input changes move the output a little — the licence the derivative machine needs; stated with its ε–δ machinery named as calculus\'s.' },
      { term: 'the jump', def: 'the discontinuity witness: an input change of vanishing size with a nonzero output change — 2 at 0 for signum, 1 at each integer for GIF.' },
    ] },

    /* ---------- formula cards ---------- */
    { kind: 'formula', name: 'the difference quotient (secant slope)', latex: '\\frac{f(x+h) - f(x)}{h}', note: 'one rung of the ladder; the rate over an interval of width h — Equation (1)' },
    { kind: 'formula', name: 'the quotient algebra of x² (exact exit)', latex: '\\frac{(x+h)^2 - x^2}{h} = 2x + h \\;\\longrightarrow\\; 2x', note: 'algebra-derived: the binomial cash of Chapters 2 and 7' },
    { kind: 'formula', name: 'the quotient algebra of 1/x (exact exit)', latex: '\\frac{1}{h}\\left(\\frac{1}{x+h} - \\frac{1}{x}\\right) = \\frac{-1}{x(x+h)} \\;\\longrightarrow\\; \\frac{-1}{x^2}', note: 'algebra-derived: the common-denominator move' },
    { kind: 'formula', name: 'the derivative table (four families, honest status)', latex: "(x^2)' = 2x, \\quad \\left(\\frac{1}{x}\\right)' = \\frac{-1}{x^2}, \\quad (a^x)' = a^x \\ln a, \\quad (\\log_a x)' = \\frac{1}{x \\ln a}", note: 'first two rows algebra-derived; last two rows named + numerically priced (the wall)' },
    { kind: 'formula', name: 'the ε–N promise for the 0.9-tail', latex: '|S_n - 9| = 9 \\cdot 0.9^n < \\varepsilon \\;\\text{ for all } n \\ge N', note: 'ε = 0.1 answered by N = 43; ε = 0.001 by N = 87 (term read: 22 and 66)' },
    { kind: 'formula', name: 'the continuity band of x² (exact)', latex: '|(x+h)^2 - x^2| = h(2|x| + h)', note: 'at x = 3, h = 0.01: the output moves 0.0601, exactly' },

    /* ---------- quiz ---------- */
    { kind: 'quiz', title: 'Checkpoint — five questions on the doorstep', items: [
      { q: 'The secant slope of $f(x) = x^2$ at $x = 3$ with step $h = 0.1$ is:', options: ['6', '6.01', '6.1', '7'], answer: 2, explain: 'The quotient gives ((3.1)² − 9)/0.1 = (9.61 − 9)/0.1 = 6.1 — option 2. Option 0 (6) is the landing value, the h → 0 endpoint, not the rung at h = 0.1; option 1 (6.01) is the rung at h = 0.01; option 3 (7) is the rung at h = 1. Each rung belongs to its own h.' },
      { q: 'Before any limit is taken, the difference quotient of $f(x) = x^2$ simplifies exactly to:', options: ['2x', '2x + h', 'x² + h', '2x − h'], answer: 1, explain: '(x+h)² − x² = 2xh + h², and division by h gives 2x + h — option 1. Option 0 (2x) is the landing value AFTER the push h → 0, not the quotient; option 2 forgets the x² cancellation; option 3 has the wrong sign pattern for the cross term. The h survives in the quotient and dies only in the push.' },
      { q: 'The base $a$ for which $(a^h - 1)/h \\to 1$ as $h \\to 0$ is:', options: ['e', '2', '10', '1'], answer: 0, explain: 'The ladder (e^h − 1)/h closes on 1 (1.0517092 at h = 0.1, 1.0050167 at h = 0.01, ...) — option 0. For a = 2 the same ladder closes on ln 2 = 0.6931472, for a = 10 on ln 10 = 2.3025851, and a = 1 gives the constant quotient 0 = (1^h − 1)/h, never 1. Only e makes the base ladder land exactly at 1.' },
      { q: 'Which of these machines has a jump at $x = 0$?', options: ['x²', '2^x', 'signum', 'log₂ x on the positive reals'], answer: 2, explain: 'signum(0.001) − signum(−0.001) = 2: a jump of 2 at 0 — option 2. The parabola x² moves 0.0601 under the same input change (continuous, banded exactly by h(2|x| + h)); 2^x moves by about 0.00139 (continuous, though its slope hits the wall); log₂ x is not even defined at 0, and on the positive reals it moves continuously with no break.' },
      { q: 'For $\\sum 0.9^k$, the smallest $n$ for which the RUNG $0.9^n$ falls below $0.1$ is:', options: ['21', '22', '30', '10'], answer: 1, explain: '0.9^21 = 0.1094190 is still above 0.1 while 0.9^22 = 0.0984771 is below — option 1. Option 0 stops one rung early; option 2 confuses the term read with looser bounds; option 3 is far too small (0.9^10 = 0.3486784). Note this is the TERM read; the tail read (9 · 0.9^n < 0.1) answers n = 43 — the factor 9 pushes the rank up.' },
    ] },

    /* ---------- exercises ---------- */
    { kind: 'exercises', title: 'Exercises — the doorstep worked by hand', sets: [
      { level: 'L1', questions: [
        { q: 'Compute the secant slope of $f(x) = x^2$ at $x = 2$ with step $h = 0.1$, and check it against the quotient algebra $2x + h$.', solution: ['Take the quotient directly: ((2.1)² − 4)/0.1 = (4.41 − 4)/0.1 = 0.41/0.1 = 4.1.', 'Now, the algebra of the lesson says the quotient of x² equals 2x + h exactly, and here 2(2) + 0.1 = 4.1.', 'Hence the rung is 4.1 and the algebra certifies it.', 'Note the landing value 2x = 4 is one push away, but the rung at h = 0.1 is honestly 4.1.'], answer: '4.1' },
        { q: 'Compute the secant slope of $f(x) = x^2$ at $x = 1$ with step $h = 0.5$.', solution: ['Take ((1.5)² − 1)/0.5 = (2.25 − 1)/0.5 = 1.25/0.5 = 2.5.', 'Now, the quotient algebra reads 2x + h = 2(1) + 0.5 = 2.5, agreeing with the direct computation.', 'Hence the secant joining (1, 1) to (1.5, 2.25) has slope 2.5; the ladder continues 2.1 at h = 0.1 and lands on 2.'], answer: '2.5' },
        { q: 'Use the exact quotient $2x + h$ of $f(x) = x^2$ to price the secant slope at $x = 2.7$ with $h = 0.01$, and state which digit separates the rung from the landing value.', solution: ['Now, the exact quotient is 2x + h, so at x = 2.7 with h = 0.01 the rung is 2(2.7) + 0.01 = 5.4 + 0.01 = 5.41.', 'So, the landing value after the push is 2(2.7) = 5.4.', 'Hence the rung is 5.41 and the landing value is 5.4 — the separating digit is the surviving hundredths 0.01, which dies only in the push.'], answer: 'rung 5.41; landing value 5.4' },
      ] },
      { level: 'L2', questions: [
        { q: 'Price the secant slope of $f(x) = 1/x$ at $x = 3$ with $h = 0.1$, both directly and through the exact identity $-1/(x(x+h))$, and name the landing value.', solution: ['Take the direct quotient: (1/3.1 − 1/3)/0.1 = (0.3225806 − 0.3333333)/0.1 = −0.0107527/0.1 = −0.1075269.', 'Now, the exact identity gives −1/(3 · 3.1) = −1/9.3 = −0.1075269 — the same value, as the engine certifies to twelve decimals.', 'So, the push h → 0 drives the identity to −1/x², which at x = 3 is −1/9.', 'Hence the rung is −0.1075269 and the landing value is −1/9 ≈ −0.1111111, the ladder closing on it from above.'], answer: '−0.1075269 at h = 0.1; landing value −1/9 ≈ −0.1111111' },
        { q: 'Carry the cube: show $(x+h)^3 - x^3 = 3x^2h + 3xh^2 + h^3$, simplify the difference quotient of $f(x) = x^3$, and price it at $x = 2$, $h = 0.1$.', solution: ['Take the binomial expansion of Chapter 7: (x + h)³ = x³ + 3x²h + 3xh² + h³, so subtracting x³ leaves 3x²h + 3xh² + h³ — an identity the engine checks at (1, 0.1) and (2, 0.01) exactly.', 'Now, dividing by h the quotient collapses to 3x² + 3xh + h².', 'So, at x = 2 with h = 0.1: 3(4) + 3(2)(0.1) + 0.01 = 12 + 0.6 + 0.01 = 12.61, and the direct read (2.1³ − 8)/0.1 = (9.261 − 8)/0.1 = 12.61 agrees.', 'Hence the rung is 12.61 and the push names the landing value 3x² = 12 at x = 2.'], answer: 'quotient 3x² + 3xh + h²; rung 12.61; landing value 12' },
        { q: 'For $\\sum 0.5^k$ (sum 1), find the smallest $n$ for which the tail $1 \\cdot 0.5^n$ falls below $\\varepsilon = 0.01$.', solution: ['Now, the tail is 1 · 0.5^n, and the engine prices the boundary: 0.5⁶ = 0.0156250 is still above 0.01.', 'So, the next rung 0.5⁷ = 0.0078125 < 0.01 answers the tolerance.', 'Hence the first witness rank is n = 7, and every later rank is smaller still since the tail multiplies by 0.5 at each step.'], answer: 'n = 7' },
      ] },
      { level: 'L3', questions: [
        { q: 'Price the secant slopes of $f(x) = \\sqrt{x}$ at $x = 4$ for $h = 0.1, 0.01, 0.001$, rationalise the quotient by the conjugate, and name the landing value.', figures: [{ caption: 'the √x ladder at x = 4 closes on 1/4 = 0.25 — a half-wall: the conjugate exits, the push reads the answer', svg: dr104SqrtLadderSol }], solution: ['Take the quotient (√(4+h) − 2)/h: at h = 0.1 it prices 0.2484567, at h = 0.01 it prices 0.2498439, at h = 0.001 it prices 0.2499844.', 'Now, the naive binomial expansion of √(4+h) does not exist at school level — but the conjugate move does: √(4+h) − 2 = h/(√(4+h) + 2), so the quotient equals 1/(√(4+h) + 2), an identity the engine certifies at all three h.', 'So, the push h → 0 turns the conjugate form into 1/(√4 + 2) = 1/4 by plain arithmetic.', 'Hence the landing value is 1/4 = 0.25 and the ladder 0.2484567, 0.2498439, 0.2499844 closes on it from below — the wall here is a half-wall.'], answer: '0.2484567, 0.2498439, 0.2499844; landing value 1/4 = 0.25' },
        { q: 'Verify the exact continuity band of $x^2$ at $x = 2$: compute $f(2.01) - f(2)$ and check it against $h(2|x| + h)$ at $h = 0.01$.', solution: ['Take the direct output change: f(2.01) − f(2) = (2.01)² − 4 = 4.0401 − 4 = 0.0401.', 'Now, the exact identity says the change equals h(2x + h) = 0.01 · (4 + 0.01) = 0.01 · 4.01 = 0.0401.', 'So, the band is met with equality — no estimate was needed, because the algebra is exact.', 'Hence the output moves 0.0401 for an input move of 0.01, and shrinking h to 0.001 shrinks the move to 0.004001: continuity priced.'], answer: '0.0401 = h(2|x| + h) exactly' },
        { q: 'Witness the jumps of GIF at the integers 1 and 2, the absence of a jump at 2.5, and state where the derivative machine is barred.', figures: [{ caption: 'GIF steps: jump 1 at x = 1 and at x = 2; no move at the non-integer 2.5', svg: dr104JumpSol }], solution: ['Take the engine witnesses: gif(1.0001) − gif(0.9999) = 1 and gif(2.001) − gif(1.999) = 1 — an input change of about 0.002 moves the output a whole 1.', 'Now, at the non-integer 2.5 the same-sized move gives gif(2.501) − gif(2.499) = 2 − 2 = 0.', 'So, the jump of GIF is 1 at every integer and 0 everywhere else; the step chart shows the two jumps at 1 and 2.', 'Hence the secant slopes refuse to settle exactly at the integers (left rates herd to the lower value, right rates to the upper), and the derivative machine is barred there — while on every open interval between integers GIF is constant and the machine reads 0.'], answer: 'jump 1 at each integer (witnesses 1 and 2); 0 at 2.5; the machine is barred at the integers' },
      ] },
      { level: 'L4', questions: [
        { q: 'Price the secant slopes of $f(x) = 2^x$ at $x = 3$ for $h = 0.1, 0.01, 0.001, 0.0001$ and check the ladder against the named landing value $8 \\ln 2$.', figures: [{ caption: 'the 2^x ladder at x = 3 descends toward the named landing value 8 ln 2 = 5.5451774 from above', svg: dr104ExpLadderSol }], solution: ['Take the ladder: at h = 0.1 the quotient prices 5.7418770, at h = 0.01 it prices 5.5644400, at h = 0.001 it prices 5.5470997, at h = 0.0001 it prices 5.5453696.', 'Now, the named rule (a^x)′ = a^x ln a prices the landing value at x = 3 as 8 ln 2 = 5.5451774.', 'So, the ladder descends 5.7418770 > 5.5644400 > 5.5470997 > 5.5453696 > 5.5451774 — every rung above the target, the gap dying by roughly a factor of 10 per shrink of h.', 'Hence the numerics certify the named row: the derivative of 2^x at x = 3 is priced 5.5451774, a numerically-priced row of the table (the wall blocks any algebraic exit).'], answer: 'ladder 5.7418770, 5.5644400, 5.5470997, 5.5453696; named landing value 8 ln 2 = 5.5451774' },
        { q: 'Price the secant slopes of $f(x) = \\log_{10} x$ at $x = 100$ for $h = 0.1$ and $h = 0.01$, and check them against the named landing value $1/(100 \\ln 10)$.', solution: ['Take the ladder: at h = 0.1 the quotient prices 0.0043408, at h = 0.01 it prices 0.0043427.', 'Now, the named rule (log_a x)′ = 1/(x ln a) prices the landing value at x = 100 as 1/(100 ln 10), and ln 10 = 2.3025851, so the target is 1/230.25851 = 0.0043429.', 'So, the ladder climbs 0.0043408 < 0.0043427 < 0.0043429 — from below, the gap already below 0.0000002 at the second rung.', 'Hence the numerics certify the named row at a fresh point: the derivative of log₁₀ x at x = 100 is priced 0.0043429.'], answer: 'rungs 0.0043408, 0.0043427; named landing value 1/(100 ln 10) = 0.0043429' },
        { q: 'The tail of $\\sum 0.99^k$ (sum 100): find the smallest $n$ for which the tail $100 \\cdot 0.99^n$ falls below $\\varepsilon = 1$.', solution: ['Now, the engine prices the boundary: 100 · 0.99^458 = 1.0021186 is still above 1.', 'So, the next rung 100 · 0.99^459 = 0.9920974 < 1 answers the tolerance.', 'Hence the first witness rank is n = 459 — the slow ratio 0.99 makes the promise patient, and the same tolerance at ε = 0.01 needs n = 917.'], answer: 'n = 459' },
      ] },
      { level: 'L5', questions: [
        { q: 'Run the two base ladders side by side at $h = 0.1$ and $h = 0.01$ — $(e^h - 1)/h$ and $(2^h - 1)/h$ — and explain, with the numbers, why $e$ is called the natural base.', solution: ['Take the two ladders: at h = 0.1 the e-ladder prices 1.0517092 while the 2-ladder prices 0.7177346; at h = 0.01 the e-ladder prices 1.0050167 while the 2-ladder prices 0.6955550.', 'Now, the landing values: the e-ladder closes on 1 exactly, the 2-ladder on ln 2 = 0.6931472 — priced by 9.5\'s series, not derived here.', 'So, at x = 0 the exponential e^x climbs at slope 1 with no scale factor, while 2^x climbs at slope ln 2 and needs the correction factor in every row of its derivative rule (a^x)′ = a^x ln a.', 'Hence e is natural in the honest, numeric sense: it is the one base whose secant ladder at 0 lands on exactly 1, the ladder 1.0517092, 1.0050167, 1.0005002, 1.0000500 closing on it.'], answer: 'the e-ladder lands on 1; the 2-ladder on ln 2 = 0.6931472 — e is the base of slope 1' },
        { q: 'Price the secant slopes of $f(x) = \\log_2 x$ at $x = 8$ for $h = 0.1, 0.01, 0.001$ and certify the named landing value $1/(8 \\ln 2)$.', solution: ['Take the ladder: at h = 0.1 the quotient prices 0.1792191, at h = 0.01 it prices 0.1802243, at h = 0.001 it prices 0.1803256.', 'Now, the named rule prices the landing value at x = 8 as 1/(8 ln 2), and 8 ln 2 = 8 × 0.6931472 = 5.5451774, so the target is 1/5.5451774 = 0.1803369.', 'So, the ladder climbs 0.1792191 < 0.1802243 < 0.1803256 < 0.1803369 — from below, mirroring the exponential ladder which descends on the reciprocal landing value 5.5451774.', 'Hence the upside-down pairing is certified numerically at a fresh point: the log\'s landing value at 8 is the exponential\'s landing value at 3, inverted.'], answer: 'ladder 0.1792191, 0.1802243, 0.1803256; named landing value 1/(8 ln 2) = 0.1803369' },
      ] },
      { level: 'L6', questions: [
        { q: 'The honest chain at $a = 3$: price the ladder $(3^h - 1)/h$ at $h = 0.1, 0.01, 0.001$, name the landing value, and connect it to the fast series of Lesson 9.5 that prices it.', solution: ['Take the ladder: at h = 0.1 the quotient prices 1.1612317, at h = 0.01 it prices 1.1046692, at h = 0.001 it prices 1.0992160.', 'Now, the ladder descends toward the named landing value ln 3 — the base ladder (a^h − 1)/h always closes on ln a, the wall case of the exponential row.', 'So, price ln 3 the way Lesson 9.5 did, by the fast series at x = 0.5: five terms give 1.0984995, and nine terms give 1.0986120 — within 2.6 × 10⁻⁷ of the priced value.', 'Hence the chain is honest end to end: the ladder 1.1612317, 1.1046692, 1.0992160 closes on ln 3 = 1.0986123, a value PRICED by 9.5\'s series and not derived by algebra — the wall, met honestly and handed to the Calculus door.'], answer: 'ladder 1.1612317, 1.1046692, 1.0992160; landing value ln 3 = 1.0986123, priced by the 9.5 series (9 terms within 2.6 × 10⁻⁷)' },
        { q: 'The two reads, kept distinct: for the 0.9-tail with $\\varepsilon = 0.1$, find the term-read rank (first $n$ with $0.9^n < 0.1$) and the tail-read rank (first $n$ with $|S_n - 9| < 0.1$), and explain the factor between them.', solution: ['Take the term read: 0.9²¹ = 0.1094190 is still above 0.1 and 0.9²² = 0.0984771 is below, so the term-read rank is n = 22.', 'Now, the tail read asks for 9 · 0.9^n < 0.1: the engine prices 9 · 0.9^42 = 0.1077526, still above, and 9 · 0.9^43 = 0.0969774, below — so the tail-read rank is n = 43.', 'So, the two honest answers differ by the factor 9 sitting in front of the rung: asking the whole remaining debt (9 · 0.9^n) to fit the tolerance takes 21 further steps of patience beyond asking one rung.', 'Hence both ranks are correct for their own questions — 22 for the rung, 43 for the tail — and the definition-shaped promise (ε–N on |Sₙ − 9|) is the tail read: the rank N = 43 answers ε = 0.1, and N = 87 answers ε = 0.001.'], answer: 'term read n = 22; tail read n = 43 (and N = 87 for ε = 0.001)' },
      ] },
    ] },
  ],
}

// ------------------------------------------------------------------
// lesson 10.R — run 122 (engines) + run 123 (prose + pins)
// ------------------------------------------------------------------
/* ================================================================== */
/* AA 10.R — Unit 10 Completion Review (the book's LAST page)          */
/* Every number printed in this review is recomputed and pinned by     */
/* temporary-references/v-aa10R.ts (ENGINE 235/235 green before the    */
/* prose; the engine wins over any other source).                     */
/* Figure helpers: computed geometry from the named constants below;   */
/* SVG text stays PLAIN (no TeX, no $, U+2212 for minus).             */
/* ================================================================== */

/* palette (vivid set; never blue/indigo) */
const c10R = {
  struct: '#16a34a', // structure strokes/axes/boxes
  ink: '#166534', // primary text
  mid: '#65a30d', // mid text/formulas
  teal: '#0d9488', // teal strokes
  tealInk: '#0f766e', // teal ink
  conn: '#d97706', // connectors/ticks
  accent: '#ea580c', // accent/arrows/highlights
  warn: '#dc2626', // warning
  panelA: '#ffedd5', // tinted panel
  panelB: '#fef3c7', // tinted panel
  faint: '#5eead4', // faint grids/dots
  white: '#ffffff',
}
const f10R = 'ui-sans-serif, system-ui, sans-serif'

function rv10RTxt(x: number, y: number, s: string, size: number, color: string, anchor = 'middle', weight = '400'): string {
  return `<text x="${x}" y="${y}" font-family="${f10R}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
}
function rv10RArrowDef(): string {
  return `<defs><marker id="rv10RArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c10R.conn}"/></marker></defs>`
}

/* (F1) the chapter's four-station rail with cross-rails */
function rv10RRailSvg(): string {
  const W = 640, H = 250
  const st = [
    { x: 100, lab: '10.1', sub: 'the craft' },
    { x: 260, lab: '10.2', sub: 'the rules' },
    { x: 420, lab: '10.3', sub: 'the map' },
    { x: 560, lab: '10.4', sub: 'the limit' },
  ]
  const y = 118
  const cross = [
    { from: 0, to: 3, peak: 46, lab: 'the audit chains run across all four stations' },
  ]
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The chapter rail: four stations 10.1 the craft, 10.2 the rules, 10.3 the map, 10.4 the limit, with audit chains arcing across them.">`,
    rv10RArrowDef(),
    rv10RTxt(W / 2, 26, 'the chapter in one rail — and its cross-rails', 13.5, c10R.tealInk, 'middle', '600'),
  ]
  st.forEach((s, i) => {
    out.push(`<circle cx="${s.x}" cy="${y}" r="30" fill="${c10R.panelB}" stroke="${c10R.teal}" stroke-width="1.8"/>`)
    out.push(rv10RTxt(s.x, y - 1, s.lab, 14, c10R.ink, 'middle', '700'))
    out.push(rv10RTxt(s.x, y + 16, s.sub, 10.5, c10R.mid))
    if (i < st.length - 1) out.push(`<path d="M ${st[i].x + 34} ${y} L ${st[i + 1].x - 34} ${y}" stroke="${c10R.conn}" stroke-width="1.8" marker-end="url(#rv10RArrow)" fill="none"/>`)
  })
  for (const cr of cross) {
    const x1 = st[cr.from].x, x2 = st[cr.to].x
    out.push(`<path d="M ${x1} ${y - 32} Q ${(x1 + x2) / 2} ${cr.peak} ${x2} ${y - 32}" stroke="${c10R.accent}" stroke-width="1.6" stroke-dasharray="6 4" fill="none"/>`)
    out.push(rv10RTxt((x1 + x2) / 2, cr.peak + 16, cr.lab, 12, c10R.accent, 'middle', '600'))
  }
  out.push(rv10RTxt(W / 2, y + 64, 'craft feeds rules, rules feed the map, the map opens the limit — and the chains audit every feed', 12, c10R.mid))
  out.push(rv10RTxt(W / 2, H - 10, 'a review walks this rail twice: once for the objects, once for the wiring', 12, c10R.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (F2) the order-4 cycle as the review's own orbit diagram */
function rv10RCycleSvg(): string {
  const W = 640, H = 320
  const cx = W / 2, cy = 152, R = 92
  const st = [
    { a: -90, lab: 'x', wit: '2' },
    { a: 0, lab: 'f(x) = (x−1)/(x+1)', wit: '1/3' },
    { a: 90, lab: 'f²(x) = −1/x', wit: '−1/2' },
    { a: 180, lab: 'f³(x) = (1+x)/(1−x)', wit: '−3' },
  ]
  const pos = (a: number) => ({ x: cx + R * Math.cos((a * Math.PI) / 180), y: cy + R * Math.sin((a * Math.PI) / 180) })
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The order-four machine redrawn for the review: stations x, (x minus 1) over (x plus 1), minus 1 over x, (1 plus x) over (1 minus x), with the witness 2 orbiting 2, 1/3, −1/2, −3, 2.">`,
    rv10RArrowDef(),
    rv10RTxt(cx, 24, 'the order-4 machine — the review redraws it from memory', 13, c10R.tealInk, 'middle', '600'),
  ]
  for (let i = 0; i < 4; i++) {
    const a1 = st[i].a + 36, a2 = st[(i + 1) % 4].a - 36
    const p1 = pos(a1), p2 = pos(a2)
    out.push(`<path d="M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${R} ${R} 0 0 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}" stroke="${c10R.conn}" stroke-width="1.8" fill="none" marker-end="url(#rv10RArrow)"/>`)
  }
  st.forEach((s) => {
    const p = pos(s.a)
    const bw = 172, bh = 44
    out.push(`<rect x="${(p.x - bw / 2).toFixed(1)}" y="${(p.y - bh / 2).toFixed(1)}" width="${bw}" height="${bh}" rx="9" fill="${c10R.panelA}" stroke="${c10R.teal}" stroke-width="1.6"/>`)
    out.push(rv10RTxt(p.x, p.y - 3, s.lab, 12.5, c10R.ink, 'middle', '600'))
    out.push(rv10RTxt(p.x, p.y + 15, `witness ${s.wit}`, 11.5, c10R.accent, 'middle', '600'))
  })
  out.push(rv10RTxt(cx, cy + 4, 'f⁴ = identity', 13.5, c10R.tealInk, 'middle', '700'))
  out.push(rv10RTxt(cx, H - 30, '2026 ≡ 2 (mod 4): the remote iterate f^2026(x) is just −1/x', 12.5, c10R.mid))
  out.push(rv10RTxt(cx, H - 10, 'redrawn, not recalled — the review\'s own layout, the same four stations', 12, c10R.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (F3) the book's door chart */
function rv10RDoorsSvg(): string {
  const W = 640, H = 260
  const doors = [
    { x: 92, lab: 'Calculus', sub: 'limits + rates' },
    { x: 244, lab: 'Coordinate', sub: 'Geometry' },
    { x: 396, lab: 'Trigonometry', sub: 'the periodic family' },
    { x: 548, lab: 'Probability', sub: 'counts as measure' },
  ]
  const y = 96, dw = 128, dh = 84
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The book's four doors: Calculus with limits and rates, Coordinate Geometry with graphs reunited, Trigonometry with the periodic family, Probability with counts as measure.">`,
    rv10RArrowDef(),
    rv10RTxt(W / 2, 26, 'the handoff: four doors, one student, the whole shelf on the back', 13.5, c10R.tealInk, 'middle', '600'),
  ]
  doors.forEach((d) => {
    out.push(`<rect x="${d.x - dw / 2}" y="${y}" width="${dw}" height="${dh}" rx="10" fill="${c10R.panelB}" stroke="${c10R.struct}" stroke-width="1.8"/>`)
    out.push(`<path d="M ${d.x - 22} ${y + dh} A 22 22 0 0 1 ${d.x + 22} ${y + dh}" fill="${c10R.panelA}" stroke="${c10R.accent}" stroke-width="1.6"/>`)
    out.push(`<circle cx="${d.x}" cy="${y + dh - 8}" r="3.4" fill="${c10R.accent}"/>`)
    out.push(rv10RTxt(d.x, y + 30, d.lab, 13.5, c10R.ink, 'middle', '700'))
    out.push(rv10RTxt(d.x, y + 50, d.sub, 11.5, c10R.mid))
  })
  out.push(rv10RTxt(W / 2, y + dh + 34, 'what the book PROVED walks with you; what it OPENED waits behind each door', 12.5, c10R.mid))
  out.push(rv10RTxt(W / 2, H - 10, 'sixty-seven written lessons, ten chapters, one arc — the census sentence of the coda', 12, c10R.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (S1) the seed-5 ladder for the review bench */
function rv10RLadderSvg(): string {
  const W = 640, H = 300
  const rungs = [5, 23, 110, 527, 2525, 12098] // s1..s6 at seed 5
  const x0 = 150, barH = 24, top = 52, dy = 38
  const w = (v: number) => 56 + 250 * (Math.log10(v) / Math.log10(12098))
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The seed-5 ladder for the review bench: rungs 5, 23, 110, 527, 2525, 12098 on log-scaled bars, with the sixth rung highlighted.">`,
    rv10RArrowDef(),
    rv10RTxt(20, 28, 'x + 1/x = 5', 13.5, c10R.mid, 'start', '600'),
    rv10RTxt(480, 28, 's(k+1) = 5·s(k) − s(k−1)', 12.5, c10R.conn, 'middle', '600'),
  ]
  rungs.forEach((v, i) => {
    const col = i === 5 ? c10R.accent : c10R.teal
    out.push(`<rect x="${x0}" y="${top + i * dy}" width="${w(v).toFixed(1)}" height="${barH}" rx="5" fill="${col}" stroke="${c10R.tealInk}" stroke-width="1.2"/>`)
    out.push(rv10RTxt(x0 - 12, top + i * dy + 17, `s${i + 1}`, 13, c10R.ink, 'end', '600'))
    out.push(rv10RTxt(x0 + w(v) + 12, top + i * dy + 17, `${v}`, 12.5, c10R.tealInk, 'start', i === 5 ? '600' : '400'))
  })
  out.push(`<rect x="446" y="216" width="176" height="66" rx="9" fill="${c10R.panelB}" stroke="${c10R.teal}" stroke-width="1.4"/>`)
  out.push(rv10RTxt(534, 240, 'the same law, further out:', 11.5, c10R.mid))
  out.push(rv10RTxt(534, 262, 's8 = 277727', 13.5, c10R.ink, 'middle', '600'))
  out.push(rv10RTxt(W / 2, H - 10, 'log-scaled bars — the rungs explode, the law never changes', 12, c10R.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (S2) the order-3 orbit of 3 */
function rv10R3CycleSvg(): string {
  const W = 640, H = 250
  const cx = W / 2, R = 88, cy = 126
  const st = [
    { a: -90, v: '3' },
    { a: 150, v: '−1/2' },
    { a: 30, v: '2/3' },
  ]
  const pos = (a: number) => ({ x: cx + R * Math.cos((a * Math.PI) / 180), y: cy + R * Math.sin((a * Math.PI) / 180) })
  const edge = [
    { from: 0, to: 1, lab: 'f' },
    { from: 1, to: 2, lab: 'f²' },
    { from: 2, to: 0, lab: 'f³ = id' },
  ]
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The order-3 machine 1 over (1 minus x) at the fresh witness 3: the orbit 3 to −1/2 to 2/3 and back to 3.">`,
    rv10RArrowDef(),
    rv10RTxt(cx, 22, 'the order-3 machine: f(x) = 1/(1−x), witnessed at 3', 13, c10R.tealInk, 'middle', '600'),
  ]
  edge.forEach((e) => {
    const p1 = pos(st[e.from].a + 38), p2 = pos(st[e.to].a - 38)
    out.push(`<path d="M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${R} ${R} 0 0 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}" stroke="${c10R.conn}" stroke-width="1.8" fill="none" marker-end="url(#rv10RArrow)"/>`)
    const mid = pos((st[e.from].a + st[e.to].a) / 2 + (st[e.to].a < st[e.from].a ? 180 : 0))
    out.push(rv10RTxt(mid.x, mid.y + 4, e.lab, 12.5, c10R.conn, 'middle', '600'))
  })
  st.forEach((s) => {
    const p = pos(s.a)
    out.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="27" fill="${c10R.panelA}" stroke="${c10R.teal}" stroke-width="1.6"/>`)
    out.push(rv10RTxt(p.x, p.y + 5, s.v, 14.5, c10R.ink, 'middle', '600'))
  })
  out.push(rv10RTxt(cx, cy + 5, '3 steps', 12.5, c10R.tealInk, 'middle', '600'))
  out.push(rv10RTxt(cx, H - 10, '2027 ≡ 2 (mod 3), so f^2027(3) = f²(3) = 2/3', 12, c10R.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (S3) the (3^h − 1)/h staircase closing on ln 3 */
function rv10RHStairSvg(): string {
  const W = 640, H = 270
  const rungs = [
    { h: 0.1, v: 1.1612317 },
    { h: 0.01, v: 1.1046692 },
    { h: 0.001, v: 1.0992160 },
    { h: 0.0001, v: 1.0986726 },
  ]
  const ln3 = Math.log(3)
  const x0 = 96, yTop = 54, yBase = 214
  const vMin = 1.09, vMax = 1.18
  const yOf = (v: number) => yBase - ((v - vMin) / (vMax - vMin)) * (yBase - yTop)
  const xOf = (i: number) => x0 + 58 + i * 118
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The staircase of (3 to the h minus 1) over h at h = 0.1, 0.01, 0.001, 0.0001, with values 1.1612317, 1.1046692, 1.0992160, 1.0986726 descending toward ln 3 = 1.0986123.">`,
    rv10RArrowDef(),
    rv10RTxt(W / 2, 26, 'the (3^h − 1)/h staircase closes on ln 3', 13.5, c10R.tealInk, 'middle', '600'),
    `<line x1="${x0}" y1="${yBase}" x2="600" y2="${yBase}" stroke="${c10R.struct}" stroke-width="1.6"/>`,
    `<line x1="${x0}" y1="${yBase}" x2="${x0}" y2="${yTop - 12}" stroke="${c10R.struct}" stroke-width="1.6"/>`,
    `<line x1="${x0}" y1="${yOf(ln3).toFixed(1)}" x2="600" y2="${yOf(ln3).toFixed(1)}" stroke="${c10R.teal}" stroke-width="1.8" stroke-dasharray="7 5"/>`,
    rv10RTxt(x0 + 8, yOf(ln3) - 8, 'ln 3 = 1.0986123', 12.5, c10R.tealInk, 'start', '600'),
  ]
  rungs.forEach((r, i) => {
    const x = xOf(i)
    out.push(`<circle cx="${x}" cy="${yOf(r.v).toFixed(1)}" r="5.5" fill="${c10R.accent}" stroke="${c10R.white}" stroke-width="1.3"/>`)
    out.push(rv10RTxt(x, yOf(r.v) - 12, `${r.v.toFixed(7)}`, 11.5, c10R.ink, 'middle', '600'))
    out.push(rv10RTxt(x, yBase + 20, `h = ${r.h}`, 11.5, c10R.mid))
    if (i < rungs.length - 1) out.push(`<path d="M ${x + 10} ${yOf(r.v).toFixed(1)} L ${xOf(i + 1) - 10} ${yOf(rungs[i + 1].v).toFixed(1)}" stroke="${c10R.conn}" stroke-width="1.3" stroke-dasharray="4 3" fill="none"/>`)
  })
  out.push(rv10RTxt(W / 2, H - 10, 'every rung above the line, every step closer — the staircase never crosses', 12, c10R.mid))
  out.push(`</svg>`)
  return out.join('')
}

/* (S4) the seed-6 bridge: a^n + b^n on the roots of x² − 6x + 1 */
function rv10RBridgeSvg(): string {
  const W = 640, H = 280
  const rungs = [6, 34, 198, 1154, 6726] // a+b, a²+b², ..., a⁵+b⁵
  const x0 = 150, barH = 26, top = 56, dy = 40
  const w = (v: number) => 52 + 250 * (Math.log10(v) / Math.log10(6726))
  let out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The seed-6 bridge: for the roots of x squared minus 6x plus 1, the sums a to the n plus b to the n climb 6, 34, 198, 1154, 6726 on log-scaled bars.">`,
    rv10RArrowDef(),
    rv10RTxt(20, 30, 'roots of x² − 6x + 1: a + b = 6, ab = 1', 13, c10R.mid, 'start', '600'),
    rv10RTxt(476, 30, 's(k+1) = 6·s(k) − s(k−1)', 12.5, c10R.conn, 'middle', '600'),
  ]
  rungs.forEach((v, i) => {
    const col = i === 4 ? c10R.accent : c10R.teal
    out.push(`<rect x="${x0}" y="${top + i * dy}" width="${w(v).toFixed(1)}" height="${barH}" rx="5" fill="${col}" stroke="${c10R.tealInk}" stroke-width="1.2"/>`)
    out.push(rv10RTxt(x0 - 12, top + i * dy + 18, `s${i}`, 13, c10R.ink, 'end', '600'))
    out.push(rv10RTxt(x0 + w(v) + 12, top + i * dy + 18, `${v}`, 12.5, c10R.tealInk, 'start', i === 4 ? '600' : '400'))
  })
  out.push(`<rect x="446" y="226" width="176" height="44" rx="9" fill="${c10R.panelB}" stroke="${c10R.teal}" stroke-width="1.4"/>`)
  out.push(rv10RTxt(534, 244, 'the same ladder, further out:', 11, c10R.mid))
  out.push(rv10RTxt(534, 262, 's8 = 1331714 — 7 digits', 12.5, c10R.ink, 'middle', '600'))
  out.push(rv10RTxt(W / 2, H - 10, 'Vieta seeds the ladder; the ladder prices every power sum; the digit law counts the far rungs', 12, c10R.mid))
  out.push(`</svg>`)
  return out.join('')
}

export const lesson10R: Lesson = {
  id: 'aa-the-synthesis-and-the-doorstep-unit-10-review',
  number: '10.R',
  title: 'Unit 10 Completion Review',
  concepts: [
    'the chapter census — craft, rules, map, limit',
    'the audit chain across lesson boundaries',
    'the formula shelf gathered',
    'the mixed bench of fresh witnesses',
    'the book handoff — four doors',
    'the honest boundaries — proved versus opened',
  ],
  objectives: [
    'Consolidate the four lessons of the closing chapter in one table and one rail.',
    'Re-derive each essential in a single move, with its owner lesson cited.',
    'Run cross-lesson audit chains in which one number carries several chapters.',
    'Work a mixed bench of seventeen fresh witnesses from L1 to L6.',
    'Read the book handoff: the four doors, the honest boundaries, the census sentence.',
  ],
  prerequisites: [
    'aa-competition-algebra-the-advanced-craft',
    'aa-functional-equations-building-functions-from-rules',
    'aa-the-book-in-one-page-synthesis',
    'aa-the-doorstep-limits-and-the-changing-output',
  ],
  sources: ['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra'],
  blocks: [
    { kind: 'para', text: 'The closing chapter walked four stations: the *craft* of 10.1 — five competition moves re-welded onto the book\'s machine families; the *rules* of 10.2 — functions rebuilt from legislation instead of formula; the *map* of 10.3 — the whole book on one page, its wiring and its debts; and the *limit* of 10.4 — the doorstep where outputs change and the calculus begins. This review is the chapter\'s own last station, and the book\'s last page.' },
    { kind: 'para', text: 'A review does two things and refuses one. It *consolidates*: gathers the formula shelf, re-derives each essential in one move, and re-runs the census. It *audits*: chains witnesses across lesson boundaries, so that one number must satisfy several chapters at once. It refuses to *re-teach* — every derivation below is a single move with its owner cited by id, because the teaching already happened and the point of a review is to prove you can walk the shelf without being carried.' },
    { kind: 'para', text: 'The order of business: the chapter table first, the formula shelf second, the one-move derivations third, the audit bench fourth, the mixed bench fifth, and the coda last — because this coda is also the book\'s farewell, and it has one more handoff to read.' },
    { kind: 'para', text: 'The chapter earned its name — *the synthesis and the doorstep* — twice over. The synthesis is real: 10.1 needed every machine family the book built, 10.2 needed its laws read backward, 10.3 needed the whole shelf on one page, and 10.4 needed the honesty to stop at the edge of the calculus and say so. And the doorstep is real: the last lesson named limits, built secant tables, and seeded a derivative table without ever pretending to own the theory. A review held at such a place has one advantage no earlier review had: everything behind it is finished, so every chain it runs can cross any boundary it likes — the audit bench below crosses all of them.' },

    /* ---------------- the chapter in one table ---------------- */
    { kind: 'heading', text: 'The Chapter in One Table' },
    { kind: 'table', caption: 'Table 1 — the closing chapter at a glance: what each lesson built, and the engine-recomputed witness this review re-runs (every value below was brute-forced again before this prose was fixed).', head: ['Lesson', 'The object it built', 'The engine-recomputed witness'], rows: [
      ['10.1 The Advanced Craft', 'five competition moves on the book\'s machine families — nested substitutions, deep ladders, symmetric reads, AM–GM boundaries, term hunts', 'the nested substitution\'s four roots $\\frac{5 \\pm \\sqrt{17}}{2}, \\frac{5 \\pm \\sqrt{21}}{2}$ with root sum $10$ and root product $2$; the ladder $7, 18, 47, 123$ at seed $3$'],
      ['10.2 Functional Equations', 'the rule-first turn — machines rebuilt from legislation: value ladders, constant cleanups, product censuses, iteration cycles', 'the order-4 machine $f(x) = \\frac{x-1}{x+1}$ with $f^2(x) = -\\frac{1}{x}$, $f^4 = \\mathrm{id}$, so $f^{2026}(x) = -\\frac{1}{x}$; the Gauss regeneration $f(100) = 5050$'],
      ['10.3 The Book in One Page', 'the honest map — ten chapters, their wiring, their formula shelf, and the ledger of deferred proofs', 'the digit chain of $C(50,25) = 126410606437752$: fifteen digits, $\\log_{10}$ reading $14.1018$ at four places; the telescoping log chain $\\log_3 4 \\cdot \\log_4 5 \\cdots \\log_8 9 = 2$'],
      ['10.4 The Doorstep', 'the limit named — secant tables, the $\\varepsilon$–$N$ promise, the derivative table seeded', 'the $\\frac{2^h - 1}{h}$ ladder closing on $\\ln 2 = 0.6931472$; the $x^2$ quotient algebra $\\frac{(x+h)^2 - x^2}{h} = 2x + h \\to 2x$'],
    ] },
    { kind: 'figure', caption: 'Figure 1 — the chapter rail: craft feeds rules, rules feed the map, the map opens the limit; the audit chains arc across all four stations.', svg: rv10RRailSvg() },
    { kind: 'para', text: 'Read the table twice, the way 10.3 taught: once for the objects, once for the wiring. The objects are the four lessons and their witnesses; the wiring is the direction of the arrows — craft feeds rules, because 10.1\'s machines become 10.2\'s rule-subjects; rules feed the map, because 10.3\'s one page is mostly a census of the first nine chapters plus these two; and the map opens the limit, because 10.4\'s doorstep is placed exactly where the map says the book ends. The cross-rails matter as much as the rail: the audit chains arcing over the stations are where the examination lives, and the bench below walks them one by one.' },

    /* ---------------- the formula shelf gathered ---------------- */
    { kind: 'heading', text: 'The Formula Shelf, Gathered' },
    { kind: 'para', text: 'Ten cards close the shelf — the craft\'s four tools, the rules\' four families, the doorstep\'s two machines. Each card names its home; nothing new is claimed, only collected. The collection is worth a minute of thought: these ten formulas are the ones the mixed bench will actually use, chosen because the chapter\'s chains route through them. A card you cannot state from memory is a chain you cannot run under examination timing — so treat this shelf as a self-test, not a reference. Read each card, cover it, restate it aloud, and only then move on; the bench at the bottom of the page will tell you whether the restatement was honest.' },
    { kind: 'formula', name: 'The ladder recurrence (10.1)', latex: 's_{k+1} = \\left( x + \\frac{1}{x} \\right) s_k - s_{k-1}', note: 'with $s_0 = 2$; at seed 3 it climbs $7, 18, 47, 123, 322, 843, 2207, 5778$.' },
    { kind: 'formula', name: 'The product-under-fixed-sum bound (10.1)', latex: 'xy \\le \\left( \\frac{x+y}{2} \\right)^{2}', note: 'AM–GM\'s two-term face; equality exactly at $x = y$ — the witness must be named.' },
    { kind: 'formula', name: 'The telescoping split (10.1)', latex: '\\frac{1}{k(k+2)} = \\frac{1}{2}\\left( \\frac{1}{k} - \\frac{1}{k+2} \\right)', note: 'two-step cancellation; the partials climb $0.5952381 \\to 0.6628788 \\to \\frac{3}{4}$.' },
    { kind: 'formula', name: 'The general term (10.1)', latex: 'T_{k+1} = \\binom{n}{k} a^{\\,n-k} b^{\\,k}', note: 'the exponent read locates any coefficient; the census rows follow.' },
    { kind: 'formula', name: 'The additive ladder (10.2)', latex: 'f(n) = n \\cdot f(1)', note: 'seed to naturals by the domino, rationals by $q \\cdot f(p/q) = f(p)$, negatives by oddness.' },
    { kind: 'formula', name: 'The product ladder (10.2)', latex: 'f(n) = f(1)^{\\,n}', note: 'with $f(0) = 1$ forced; negative rungs reciprocate.' },
    { kind: 'formula', name: 'The quadratic regeneration (10.2)', latex: 'f(x) = \\frac{x(x+1)}{2}', note: 'the $xy$-rule at seed $1$; $f(100) = 5050$, the Gauss sum reborn.' },
    { kind: 'formula', name: 'The order-4 cycle (10.2)', latex: 'x \\;\\mapsto\\; \\frac{x-1}{x+1} \\;\\mapsto\\; -\\frac{1}{x} \\;\\mapsto\\; \\frac{1+x}{1-x} \\;\\mapsto\\; x', note: 'remote iterates reduce modulo 4: $f^{2026} = f^2$.' },
    { kind: 'formula', name: 'The difference quotient (10.4)', latex: '\\frac{f(x+h) - f(x)}{h}', note: 'the secant slope; for $x^2$ it collapses to $2x + h$, closing on $2x$.' },
    { kind: 'formula', name: 'The eps-N promise (10.4)', latex: 'n > N \\;\\Rightarrow\\; |a_n - L| < \\varepsilon', note: 'convergence as a guarantee with a searchable threshold — the door the calculus opens.' },

    /* ---------------- essentials re-derived in one move ---------------- */
    { kind: 'heading', text: 'The Essentials, One Move Each' },
    { kind: 'derivation', title: 'The nested substitution, recalled', statement: 'Recall the t-machine of \\`aa-competition-algebra-the-advanced-craft\\` in two moves: the swap, then the two quadratic solves.', steps: [
      { label: 'The swap', formula: 't = x^2 - 5x + 5', explanation: 'The quartic $(x^2-5x+5)^2 - 7(x^2-5x+5) + 12 = 0$ becomes $t^2 - 7t + 12 = 0$, so $t \\in \\{3, 4\\}$ — two families (owner: 10.1).' },
      { label: 'The solves', formula: 'x^2 - 5x + 2 = 0, \\quad x^2 - 5x + 1 = 0', explanation: 'Discriminants $17$ and $21$ give the four roots, sum $10$ and product $2$ by Vieta — the back-substitution engine-checked to $10^{-6}$.' },
    ], result: 'Thus, $x \\in \\left\\{ \\frac{5 \\pm \\sqrt{17}}{2}, \\frac{5 \\pm \\sqrt{21}}{2} \\right\\}$ — two moves, four roots, one machine.' },
    { kind: 'derivation', title: 'The value ladder, recalled', statement: 'Recall the additive ladder of \\`aa-functional-equations-building-functions-from-rules\\` in two moves: the domino step, then the rational extension (with \\`aa-mathematical-induction-the-domino-principle\\` cited).', steps: [
      { label: 'The domino', formula: 'f(n+1) = f(n) + f(1)', explanation: 'One seed prices every natural; the induction schema of chapter 7 certifies the climb (owners: 10.2, 7.1).' },
      { label: 'The rationals', formula: 'q \\cdot f(p/q) = f(p)', explanation: 'Stacking $q$ copies of $p/q$ collapses to $f(p)$, so $f(p/q) = f(p)/q$ — and oddness extends to negatives for free.' },
    ], result: 'Thus, $f(1) = 3$ prices $f(2026) = 6078$, $f(1/2) = 3/2$, and $f(-7) = -21$ — the review re-ran all three before printing them.' },
    { kind: 'derivation', title: 'The honesty ledger, recalled', statement: 'Recall the ledger of \\`aa-the-book-in-one-page-synthesis\\` in one sentence, doors included.', steps: [
      { label: 'The sentence', explanation: 'The book deferred exactly the proofs that belong to the calculus — the convergence proofs behind the log series, the $\\varepsilon$–$\\delta$ machinery behind the limit, the derivative\'s full theory — and every deferral is payable at the doorstep 10.4 opened or at the calculus door beyond it (owner: 10.3).' },
    ], result: 'Thus, the map is honest: what was proved is banked, what was opened is named, and no debt is hidden.' },
    { kind: 'derivation', title: 'The secant push, recalled', statement: 'Recall the quotient algebra of \\`aa-the-doorstep-limits-and-the-changing-output\\` (with \\`al-rates-of-change-the-secant-survey\\` cited) in one move.', steps: [
      { label: 'The collapse', formula: '\\frac{(x+h)^2 - x^2}{h} = 2x + h', explanation: 'The numerator factors as $h(2x + h)$, the $h$ cancels, and the slope reads $2x + h$ — which closes on $2x$ as $h \\to 0$ (owner: 10.4).' },
    ], result: 'Thus, the slope of $x^2$ at any $x$ is $2x$ — algebra first, limit second, and the engine\'s secant tables (at $x = 3$: $7, 6.1, 6.01 \\to 6$) witness the collapse.' },

    { kind: 'para', text: 'Four one-move recalls, four owners cited — that is the whole section, and its brevity is the point. If any of the four moves felt rusty, the owner lesson is one click away, and the review has done its job by sending you there. If all four felt familiar, the audit bench below will tell you whether the familiarity is real: chains do not forgive half-remembered tools, because a chain that drops one link prices nothing correctly. That is also why the derivations above refuse to show their work — the work lives in the owner lessons, and a review that re-teaches is a review that hides whether you still need the teaching.' },

    /* ---------------- the audit bench ---------------- */
    { kind: 'heading', text: 'The Audit Bench — Chains Across Lessons' },
    { kind: 'para', text: 'An audit chain makes one number carry several chapters. Each Illustration below crosses a lesson boundary explicitly, and every value was recomputed by the review\'s own engine — 235 checks, all green, before a word of this prose was fixed.' },
    { kind: 'para', text: 'Why chains, and not just mixed problems? Because a chain certifies *simultaneously*. A mixed bench question can be answered one tool at a time; a chain question fails unless every tool fires in the same solution — the exponential ladder and the digit law in one number, the cycle and the modulus in one iterate, the bound and the discriminant and Vieta on one quadratic. The examination papers love chains precisely because they cannot be pattern-matched; the review loves them because they are the cheapest honesty test a student can self-administer. Six chains follow, and the mixed bench then asks you to build five more of your own.' },
    { kind: 'example', title: 'Illustration 1 — Crosses 10.2 and 9.6: an exponential machine has $f(1) = 2$ under $f(x+y) = f(x) f(y)$. Price $f(100)$ exactly, then count its digits.', steps: [
      'Crosses 10.2 and 9.6: the product ladder prices the value; the digit-count law counts it.',
      'Split: the product ladder gives $f(n) = 2^n$, so $f(100) = 2^{100}$.',
      'Take: the engine writes it out in full — $2^{100} = 1267650600228229401496703205376$.',
      'Now, the count: $100 \\log_{10} 2 = 30.1029996$, and $\\lfloor 30.1029996 \\rfloor + 1 = 31$ digits.',
      'Hence $f(100) = 1267650600228229401496703205376$ — a thirty-one-digit number, one rule and one law.',
    ] },
    { kind: 'example', title: 'Illustration 2 — Crosses 10.2 and 10.1: for the order-4 machine $f(x) = \\frac{x-1}{x+1}$, price $f^{2026}(x)$ and witness it at $x = 2$.', steps: [
      'Crosses 10.2 and 10.1: the cycle is 10.2\'s machine; the modular read is 10.1\'s arithmetic.',
      'Split: the cycle has length 4 — $f^2(x) = -\\frac{1}{x}$, $f^3(x) = \\frac{1+x}{1-x}$, $f^4 = \\mathrm{id}$.',
      'Take: $2026 = 4 \\cdot 506 + 2$, so $2026 \\equiv 2 \\pmod 4$ and $f^{2026} = f^2$.',
      'Check: at $x = 2$ the orbit reads $2 \\to 1/3 \\to -1/2 \\to -3 \\to 2$, and $f^2(2) = -1/2$.',
      'Hence $f^{2026}(x) = -\\frac{1}{x}$, witnessed by $f^{2026}(2) = -\\frac{1}{2}$ — a remote iterate priced by cycle length.',
    ] },
    { kind: 'example', title: 'Illustration 3 — Crosses 10.2, 7.1 and 6.x: the rule $f(x+y) = f(x) + f(y) + xy$ with $f(1) = 1$ regenerates the Gauss sum. Price $f(100)$ and certify it twice.', steps: [
      'Crosses 10.2, 7.1 and 6.x: the rule is 10.2\'s; the induction is 7.1\'s; the triangular census is chapter 6\'s counting shelf.',
      'Split: the domino reads $f(n+1) = f(n) + n + 1$, climbing $1, 3, 6, 10, \\ldots$ — the triangular numbers.',
      'Take: the closed form is $f(n) = n(n+1)/2$, so $f(100) = 100 \\cdot 101/2 = 5050$.',
      'Check: the rule at $(2,3)$ — $f(5) = 15 = 3 + 6 + 6$; at $(5,7)$ — $f(12) = 78 = 15 + 28 + 35$.',
      'Hence $f(100) = 5050$ — one number carrying a rule, a domino, and a census.',
    ] },
    { kind: 'example', title: 'Illustration 4 — Crosses 10.1, ch.2 and ch.8: maximize $x(6-x)$, certify the maximum by the discriminant, and confirm the root sum by Vieta.', steps: [
      'Crosses 10.1, ch.2 and ch.8: the bound is 10.1\'s AM–GM; the double root is chapter 2\'s discriminant read; the sum is chapter 8\'s Vieta register.',
      'Split: the product under fixed sum obeys $x(6-x) \\le \\left( \\frac{6}{2} \\right)^2 = 9$, equality at $x = 3$.',
      'Take: the certification — $x^2 - 6x + 9 = (x-3)^2$ has discriminant $36 - 36 = 0$, a double root at exactly the witness.',
      'Check: Vieta confirms the sum of roots $6$ and the product $9$ — the boundary, the disc, and the registers agree.',
      'Hence the maximum is $9$ at $x = 3$, certified three ways — bound, discriminant, Vieta.',
    ] },
    { kind: 'example', title: 'Illustration 5 — Crosses 10.1 and 9.6: count the digits of $C(50,25)$.', steps: [
      'Crosses 10.1 and 9.6: the binomial hunt is 10.1\'s; the digit law is 9.6\'s.',
      'Split: the engine computes $C(50,25) = 126410606437752$ exactly.',
      'Take: $\\log_{10} C(50,25) = 14.1017835$ at seven places — the review\'s engine pins the fourth-place read as $14.1018$, and records that the chapter map\'s $14.1017$ was a truncation (the engine wins).',
      'So, $\\lfloor 14.1018 \\rfloor + 1 = 15$ digits.',
      'Hence $C(50,25) = 126410606437752$ carries fifteen digits — the hunt and the law in one number.',
    ] },
    { kind: 'example', title: 'Illustration 6 — Crosses 10.4 and 9.5: the staircase $\\frac{3^h - 1}{h}$ closes on a value the log series already prices.', steps: [
      'Crosses 10.4 and 9.5: the staircase is 10.4\'s doorstep; the closing value is 9.5\'s series read.',
      'Split: the engine table reads $1.1612317 \\to 1.1046692 \\to 1.0992160 \\to 1.0986726$ as $h$ runs $0.1 \\to 0.0001$.',
      'Take: the rungs decrease and every rung sits above $\\ln 3 = 1.0986123$ — the staircase never crosses its target.',
      'So, the closing value is $\\ln 3$, which the exponential series of chapter 9 prices as $1.0986123$.',
      'Hence $\\frac{3^h - 1}{h} \\to \\ln 3 = 1.0986123$ — the doorstep and the series shaking hands.',
    ] },
    { kind: 'figure', caption: 'Figure 2 — the order-4 machine redrawn as the review\'s own orbit diagram: stations x, (x−1)/(x+1), −1/x, (1+x)/(1−x), with the witness 2 completing the loop.', svg: rv10RCycleSvg() },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the review as exam rehearsal (exam-style)', text: 'Exam-style items across the whole arc, honestly labelled: the mixed bench below mirrors the JEE Main typologies — Single Correct asks on census rows and cycle machines, Numerical Value asks on ladder rungs, digit counts, and remote iterates, and Multiple Correct asks where every wrong option hides a computed refutation. A review run under exam timing (about forty minutes for seventeen questions) is the last rehearsal this book can give; the real paper is yours to schedule.' },

    /* ---------------- the mixed bench ---------------- */
    { kind: 'heading', text: 'The Mixed Bench — Seventeen Fresh Witnesses' },
    { kind: 'para', text: 'The bench runs seventeen fresh witnesses — none of them the lessons\' own numbers, every one recomputed by the engine before it was written down. Five of the seventeen cross lesson boundaries explicitly and say so in their first line, the way the audit bench taught; the rest stay inside one register but demand it fully. Run it once under timing, once without, and compare: the gap between the two runs is your rehearsal gap, and it shrinks exactly as the shelf above becomes memory.' },
    { kind: 'para', text: 'One habit the bench rehearses that no single lesson could: switching registers without warning. Question three is a digit count; question four is a substitution; question five is a Vieta read — and the examination will shuffle them the same way. The skill of *register switching* — noticing which family a question belongs to before touching the algebra — is the one skill only a mixed bench can train, which is why every unit review in this book ends with one. The solutions are full Cengage chains, every move led by a connective and every answer certified, because a review bench is also a final demonstration of what a complete solution looks like.' },
    { kind: 'exercises', title: 'The mixed bench — Single Correct, Multiple Correct and Numerical Value drills, all witnesses fresh, L1 to L6 (JEE arc, exam-style)', sets: [
      { level: 'L1', questions: [
        { q: 'Climb the ladder $x + \\frac{1}{x} = 5$ to its sixth and eighth rungs: price $s_6$ and $s_8$.', solution: [
          'Split: the ladder law reads $s_{k+1} = 5 s_k - s_{k-1}$ from $s_0 = 2$, $s_1 = 5$.',
          'Take: the rungs climb $23, 110, 527, 2525, 12098, 57965, 277727$ — the engine swept the same law to $s_9 = 1330670$.',
          'Check: squaring agrees at the even rungs — $s_6 = s_3^2 - 2 = 12100 - 2 = 12098$ ✓.',
          'Hence $s_6 = 12098$ and $s_8 = 277727$ — two rungs priced by one recurrence.',
        ], answer: '$s_6 = 12098$ and $s_8 = 277727$', figures: [{ caption: 'The seed-5 ladder on log-scaled bars: rungs 5, 23, 110, 527, 2525, 12098, with the sixth rung highlighted and the eighth at 277727.', svg: rv10RLadderSvg() }] },
        { q: 'An additive $f$ has $f(1) = 5$. Price $f(9)$, $f(1/5)$, and $f(-2)$.', solution: [
          'Split: the additive ladder gives $f(n) = 5n$ on the naturals, so $f(9) = 45$.',
          'Take: the rational rung — $5 \\cdot f(1/5) = f(1) = 5$, so $f(1/5) = 1$; and oddness — $f(-2) = -10$.',
          'Hence $f(9) = 45$, $f(1/5) = 1$, and $f(-2) = -10$ — one seed, three registers.',
        ], answer: '$f(9) = 45$, $f(1/5) = 1$, $f(-2) = -10$' },
        { q: 'Count the digits of $5^{20}$, first by the floor law, then exactly.', solution: [
          'Split: the law reads $\\text{digits}(N) = \\lfloor \\log_{10} N \\rfloor + 1$, and $20 \\log_{10} 5 = 13.9794$.',
          'Take: $\\lfloor 13.9794 \\rfloor + 1 = 14$ digits.',
          'So, the engine writes it out: $5^{20} = 95367431640625$ — fourteen digits exactly.',
          'Hence $5^{20}$ has $14$ digits, law and ledger agreeing.',
        ], answer: '$14$ digits' },
      ] },
      { level: 'L2', questions: [
        { q: 'Solve $(x^2 - 3x + 3)^2 - 5(x^2 - 3x + 3) + 6 = 0$ completely, and report the root sum and product.', solution: [
          'Split: set $t = x^2 - 3x + 3$, so $t^2 - 5t + 6 = (t-2)(t-3) = 0$ — two families.',
          'Take: $t = 2$ gives $x^2 - 3x + 1 = 0$ with discriminant $5$, so $x = \\frac{3 \\pm \\sqrt{5}}{2}$; $t = 3$ gives $x^2 - 3x = 0$, so $x = 0$ or $3$.',
          'Check: the engine back-substitutes all four roots to $10^{-9}$, and the sum reads off directly — $0 + 3 + 0.3819660 + 2.6180340 = 6$ ✓.',
          'Hence $x \\in \\{0,\\ 3,\\ \\frac{3 \\pm \\sqrt{5}}{2}\\}$, with root sum $6$ and root product $0$.',
        ], answer: '$x \\in \\{0, 3, \\frac{3+\\sqrt5}{2}, \\frac{3-\\sqrt5}{2}\\}$; sum $6$, product $0$' },
        { q: 'For the roots $u, v$ of $x^2 - 9x + 19 = 0$, price $\\frac{1}{u} + \\frac{1}{v}$ and $(u-v)^2$ without solving.', solution: [
          'Split: Vieta seeds the read — $u + v = 9$ and $uv = 19$.',
          'Take: the reciprocal sum is $\\frac{u+v}{uv} = \\frac{9}{19} = 0.4736842$; and $(u-v)^2 = 81 - 76 = 5$.',
          'Check: the engine\'s numerics $u = 5.618034$, $v = 3.381966$ confirm both reads.',
          'Hence $\\frac{1}{u} + \\frac{1}{v} = \\frac{9}{19} \\approx 0.4736842$ and $(u-v)^2 = 5$ — two reads, two seeds.',
        ], answer: '$\\frac{1}{u}+\\frac{1}{v} = \\frac{9}{19} \\approx 0.4736842$; $(u-v)^2 = 5$' },
        { q: 'Census, two rows. (a) Does $f(x) = x^2 + 1$ obey the additive rule at $(2,3)$? the product rule? (b) Find the constant $c$ such that $f(x) = 5x + 3$ obeys $f(x+y) = f(x) + f(y) + c$.', solution: [
          'Split (a): compute both sides — additive: $f(5) = 26$ but $f(2) + f(3) = 14$; product: $26$ but $50$ — NO twice, refutations in hand.',
          'Take (b): $5(x+y) + 3 = (5x+3) + (5y+3) + c$ forces $c = -3$ — a shifted rule, absorbed.',
          'Hence $x^2 + 1$ obeys neither rule (26 vs 14, and 26 vs 50), and $5x + 3$ obeys the shifted rule with $c = -3$.',
        ], answer: '(a) NO to both — $26 \\ne 14$ and $26 \\ne 50$; (b) $c = -3$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Audit the telescoping family $\\sum \\frac{1}{k(k+3)}$: price $S_4$ and $S_6$, and read the limit.', solution: [
          'Split: the three-step gap splits as $\\frac{1}{k(k+3)} = \\frac{1}{3}\\left( \\frac{1}{k} - \\frac{1}{k+3} \\right)$.',
          'Take: $S_4 = 0.4412698$ and $S_6 = 0.4847884$ — three survivors per end, engine-checked: $S_6 = \\frac{1}{3}\\left(1 + \\frac{1}{2} + \\frac{1}{3} - \\frac{1}{7} - \\frac{1}{8} - \\frac{1}{9}\\right)$ exactly.',
          'So: the limit is $\\frac{1}{3}\\left(1 + \\frac{1}{2} + \\frac{1}{3}\\right) = \\frac{11}{18} = 0.6111111$.',
          'Hence $S_4 = 0.4412698$, $S_6 = 0.4847884$, and the family tends to $\\frac{11}{18} \\approx 0.6111111$.',
        ], answer: '$S_4 = 0.4412698$, $S_6 = 0.4847884$; the limit is $\\frac{11}{18} \\approx 0.6111111$' },
        { q: 'Crosses 10.2: for $f(x) = \\frac{1}{1-x}$ (where defined), compute the orbit of $3$, identify $f^2(x)$ in closed form, and price $f^{2027}(3)$.', solution: [
          'Crosses 10.2: the cycle sweep is the rule lesson\'s craft.',
          'Split: $f(3) = \\frac{1}{1-3} = -\\frac{1}{2}$, then $f^2(3) = f(-1/2) = \\frac{1}{3/2} = \\frac{2}{3}$, then $f^3(3) = f(2/3) = \\frac{1}{1/3} = 3$ — the return.',
          'Take: in closed form $f^2(x) = \\frac{x-1}{x}$, engine-checked at $x = 2$ and $x = 5$.',
          'Now: $2027 \\equiv 2 \\pmod 3$, so $f^{2027}(3) = f^2(3)$.',
          'Hence the orbit of $3$ is $3 \\to -\\frac{1}{2} \\to \\frac{2}{3} \\to 3$, with $f^2(x) = \\frac{x-1}{x}$ and $f^{2027}(3) = \\frac{2}{3}$.',
        ], answer: 'orbit $3 \\to -1/2 \\to 2/3 \\to 3$; $f^2(x) = \\frac{x-1}{x}$; $f^{2027}(3) = 2/3$', figures: [{ caption: 'The order-3 machine 1/(1−x) at the fresh witness 3: the orbit 3 → −1/2 → 2/3 → 3, and the remote iterate reduces mod 3.', svg: rv10R3CycleSvg() }] },
        { q: 'Crosses 10.4: build the secant table of $\\frac{1}{x}$ at $x = 3$ for $h = 1, 0.1, 0.01, 0.001$, and name the limit.', solution: [
          'Crosses 10.4: the secant push is the doorstep lesson\'s machine.',
          'Split: the quotient reads $\\frac{1/(3+h) - 1/3}{h} = \\frac{-1}{3(3+h)}$ — already a closed form.',
          'Take: the rungs are $-\\frac{1}{12} = -0.0833333$, $-0.1075269$, $-0.1107420$, $-0.1110741$ — descending toward $-\\frac{1}{9}$.',
          'So: the limit is $-\\frac{1}{9} = -0.1111111$, the closed form\'s value at $h = 0$.',
          'Hence the table runs $-\\frac{1}{12}, -0.1075269, -0.1107420, -0.1110741$ and closes on $-\\frac{1}{9}$.',
        ], answer: 'table $-1/12, -0.1075269, -0.1107420, -0.1110741$; the limit is $-1/9$' },
      ] },
      { level: 'L4', questions: [
        { q: 'For $x > 0$, find the minimum of $4x + \\frac{9}{x}$ and name the equality witness; certify it with the associated quadratic\'s discriminant.', solution: [
          'Split: AM–GM prices the bound — $4x + \\frac{9}{x} \\ge 2\\sqrt{36} = 12$, equality at $4x = \\frac{9}{x}$, i.e. $x = \\frac{3}{2}$.',
          'Take: the grid agrees (engine minimum $12$ at $x = 1.5$), and the witness prices both terms to $6$: $4 \\cdot \\frac{3}{2} = 6$ and $\\frac{9}{3/2} = 6$.',
          'Check: the boundary quadratic $4x^2 - 12x + 9 = (2x-3)^2$ has discriminant $144 - 144 = 0$ — a double root at exactly the witness.',
          'Hence the minimum is $12$ at $x = \\frac{3}{2}$, bound, grid, and discriminant agreeing.',
        ], answer: 'minimum $12$ at $x = 3/2$' },
        { q: 'Crosses 10.2 and 9.6: a product-rule machine has $f(1) = 6$ (with $f(0) \\ne 0$). Price $f(20)$ exactly and count its digits; then price $f(1/2)$, naming the branch.', solution: [
          'Crosses 10.2 and 9.6: the product ladder prices the value; the digit law counts it.',
          'Split: the ladder gives $f(n) = 6^n$, and $20 \\log_{10} 6 = 15.5630$ promises sixteen digits.',
          'Take: the engine writes it out — $f(20) = 6^{20} = 3656158440062976$, and counting confirms $\\lfloor 15.5630 \\rfloor + 1 = 16$ digits.',
          'Now: the half rung — $f(1/2)^2 = 6$, so $f(1/2) = \\sqrt{6} = 2.4494897$ on the positive branch.',
          'Hence $f(20) = 3656158440062976$ with $16$ digits, and $f(1/2) = \\sqrt{6} \\approx 2.4494897$.',
        ], answer: '$f(20) = 3656158440062976$ ($16$ digits); $f(1/2) = \\sqrt{6} \\approx 2.4494897$' },
        { q: 'Crosses 10.4 and 5.2: for the tail $\\sum_{k=1}^{n} \\frac{1}{3^k}$, find the first $n$ with $\\frac{1}{2} - S_n < 0.0001$, and exhibit the miss one step earlier.', solution: [
          'Crosses 10.4 and 5.2: the geometric tail is chapter 5\'s; the threshold search is the doorstep\'s.',
          'Split: the tail tends to $\\frac{1/3}{1 - 1/3} = \\frac{1}{2}$, and the engine searches rung by rung.',
          'Take: $S_8 = 0.4999238$, so $\\frac{1}{2} - S_8 = 0.0000762 < 0.0001$ — the bar is met at $n = 8$.',
          'Check: one step earlier, $\\frac{1}{2} - S_7 = 0.0002282 \\ge 0.0001$ — the miss is exhibited.',
          'Hence the first $n$ is $8$, with $S_8 = 0.4999238$ inside the bar and $S_7$ outside it, missing by $0.0002282$.',
        ], answer: 'first $n = 8$ ($S_8 = 0.4999238$; $S_7$ misses with $0.0002282$)' },
      ] },
      { level: 'L5', questions: [
        { q: 'Crosses 10.4 and 5.2: for the tail $\\sum_{k=1}^{n} \\frac{k}{2^k}$, find the first $n$ with $2 - S_n < 0.001$, exhibit the miss one step earlier, and name the closed form.', solution: [
          'Crosses 10.4 and 5.2: the AGP tail is chapter 5\'s series; the $\\varepsilon$-search is the doorstep\'s promise.',
          'Split: the closed form reads $S_n = 2 - \\frac{n+2}{2^n}$, so the gap is exactly $\\frac{n+2}{2^n}$.',
          'Take: the gap at $n = 14$ is $\\frac{16}{2^{14}} = 0.0009766 < 0.001$ — the bar is met; at $n = 13$ it is $0.0018311 \\ge 0.001$ — the miss.',
          'Check: the engine\'s rungs agree, $S_{14} = 1.9990234$.',
          'Hence the first $n$ is $14$, with $S_{14} = 1.9990234$ inside the bar, $S_{13}$ outside it by $0.0018311$, and the closed form $2 - \\frac{n+2}{2^n}$ explaining both.',
        ], answer: 'first $n = 14$ ($S_{14} = 1.9990234$; $S_{13}$ misses with $0.0018311$); closed form $2 - \\frac{n+2}{2^n}$' },
        { q: 'Crosses 10.4 and 9.5: tabulate $\\frac{3^h - 1}{h}$ at $h = 0.1, 0.01, 0.001, 0.0001$; name the limit; and state which chapter-9 series prices it.', solution: [
          'Crosses 10.4 and 9.5: the staircase is the doorstep\'s; the closing value is the log series\'.',
          'Split: the engine table reads $1.1612317, 1.1046692, 1.0992160, 1.0986726$ — decreasing, every rung above the target.',
          'Take: the limit is $\\ln 3 = 1.0986123$, priced by the exponential series of chapter 9.',
          'Hence the table $1.1612317, 1.1046692, 1.0992160, 1.0986726$ closes on $\\ln 3 = 1.0986123$ — the staircase from 10.4 and the series from 9.5 meeting at one number.',
        ], answer: '$1.1612317, 1.1046692, 1.0992160, 1.0986726 \\to \\ln 3 = 1.0986123$', figures: [{ caption: 'The (3^h − 1)/h staircase: rungs 1.1612317, 1.1046692, 1.0992160, 1.0986726 descend toward the dashed line ln 3 = 1.0986123 without ever crossing it.', svg: rv10RHStairSvg() }] },
        { q: 'Solve $(x^2 - 4x + 1)^2 - 6(x^2 - 4x + 1) + 8 = 0$ completely, and report the root sum and product.', solution: [
          'Split: set $t = x^2 - 4x + 1$, so $t^2 - 6t + 8 = (t-2)(t-4) = 0$ — two families.',
          'Take: $t = 2$ gives $x^2 - 4x - 1 = 0$ with discriminant $20$, so $x = 2 \\pm \\sqrt{5}$; $t = 4$ gives $x^2 - 4x - 3 = 0$ with discriminant $28$, so $x = 2 \\pm \\sqrt{7}$.',
          'Check: the engine back-substitutes all four roots to $10^{-9}$.',
          'Hence $x \\in \\{2 \\pm \\sqrt{5},\\ 2 \\pm \\sqrt{7}\\}$, with root sum $8$ and root product $3$.',
        ], answer: '$x \\in \\{2 \\pm \\sqrt{5}, 2 \\pm \\sqrt{7}\\}$; sum $8$, product $3$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Crosses 10.1, ch.2 and 9.6: for the roots $a, b$ of $x^2 - 6x + 1 = 0$, price $a^3 + b^3$ and $a^5 + b^5$ by the ladder, and count the digits of $a^8 + b^8$.', solution: [
          'Crosses 10.1, ch.2 and 9.6: the ladder is 10.1\'s; the root pair is chapter 2\'s quadratic; the digit law is 9.6\'s.',
          'Split: Vieta seeds the ladder — $a + b = 6$ and $ab = 1$ — so $s_{k+1} = 6 s_k - s_{k-1}$ from $s_0 = 2$, $s_1 = 6$.',
          'Take: the rungs climb $34, 198, 1154, 6726$ — so $a^3 + b^3 = s_3 = 198$ and $a^5 + b^5 = s_5 = 6726$.',
          'Now: two more rungs give $s_8 = 1331714$, and $\\log_{10} s_8 = 6.1244$, so $\\lfloor 6.1244 \\rfloor + 1 = 7$ digits.',
          'Check: the engine\'s direct numerics $a = 5.8284271$, $b = 0.1715729$ confirm every rung.',
          'Hence $a^3 + b^3 = 198$, $a^5 + b^5 = 6726$, and $a^8 + b^8 = 1331714$ carries $7$ digits — three chapters in one ladder.',
        ], answer: '$a^3+b^3 = 198$, $a^5+b^5 = 6726$; $a^8+b^8 = 1331714$ ($7$ digits)', figures: [{ caption: 'The seed-6 bridge: for the roots of x² − 6x + 1, the power sums aⁿ + bⁿ climb 6, 34, 198, 1154, 6726 on log-scaled bars, with the eighth rung at 1331714.', svg: rv10RBridgeSvg() }] },
        { q: 'Crosses 10.1, ch.2 and ch.8: maximize $x(8-x)$, certify the witness by the discriminant, and read the root sum and product of the boundary quadratic by Vieta.', solution: [
          'Crosses 10.1, ch.2 and ch.8: the bound is 10.1\'s AM–GM; the double root is chapter 2\'s disc; the reads are chapter 8\'s registers.',
          'Split: the product under fixed sum obeys $x(8-x) \\le \\left( \\frac{8}{2} \\right)^2 = 16$, equality at $x = 4$ — the named witness.',
          'Take: the boundary quadratic $x^2 - 8x + 16 = (x-4)^2$ has discriminant $64 - 64 = 0$ — a double root at exactly the witness, and the engine grid peaks at $16$ on $x = 4$.',
          'Check: Vieta reads the root sum $8$ and the product $16$ — the maximum itself.',
          'Hence the maximum is $16$ at $x = 4$, the discriminant $64 - 64 = 0$ certifies the double root, and Vieta reads sum $8$, product $16$.',
        ], answer: 'maximum $16$ at $x = 4$; discriminant $0$; Vieta sum $8$, product $16$' },
      ] },
    ] },

    /* ---------------- the closing coda ---------------- */
    { kind: 'heading', text: 'The Coda — the Book\'s Last Page' },
    { kind: 'para', text: 'This book opened with a set of pairs and a machine zoo; it closes at a doorstep. Between those two ends it built ten chapters, and the handoff it owes you is four doors wide. Through the **Calculus** door walks everything this chapter staged: the limits 10.4 named, the rates the derivative will formalize, the $\\varepsilon$–$N$ promise made searchable. Through the **Coordinate Geometry** door walks the function zoo itself — every graph this book drew, awaiting reunion with the curves the analytic geometry will trace. Through the **Trigonometry** door walks the periodic family, which chapter 1\'s census catalogued and never re-visited — the biggest debt on the shelf. Through the **Probability** door walks the counting house of chapter 6, its permutations and combinations waiting to be cashed as measure.' },
    { kind: 'para', text: 'A word on how to use this page, since it is the last one. Read the table first — it is the chapter in five minutes. Then run the bench under timing — forty minutes for seventeen questions, one pass, no notes. Then, and only then, read the coda: it is written for a student who has just finished working, not one who is skipping to the end. The book has kept that order everywhere — bench first, doors second — because that is the order the examination itself will impose on you, and a review is the last rehearsal of habits, not just of content.' },
    { kind: 'para', text: 'The boundaries are restated once more, honestly. What this book **proved**: the AM–GM inequality and its witnesses; the induction schema as a domino run over any seed; the binomial theorem at positive index with its census rows; the logarithm laws with the change of base; the Vieta machinery from quadratics to the power-sum ladder. What it **opened**: the convergence proofs behind the series of chapter 9; the $\\varepsilon$–$\\delta$ machinery behind every limit of chapter 10; the derivative\'s full theory — linearity, chain rule, monotonicity — which the doorstep only seeded. A proof banked is a tool; a door opened is a promise. This book ends rich in both.' },
    { kind: 'para', text: 'Two bookends deserve one last look. The book opened with relations as sets of pairs — a function was a rule with a domain before it was ever a formula — and it closes with the derivative, which is that same idea sharpened: a machine whose input is a machine. Everything between was the long education of the object in the middle: the function, met as a pair-set, trained as a machine, censused as a family, and finally handed to the calculus as a *variable quantity*. If you keep one mental image from ten chapters, keep that one — the whole book is the biography of a single idea.' },
    { kind: 'para', text: 'And the census sentence, one last time: **sixty-seven** written lessons across ten chapters — sixty-two banked before this chapter began, and these five closing it — one arc from the set-of-pairs view to the doorstep of the calculus. End the book the way every review in it has ended: with the bench run and the doors named. One thread deserves its own sentence too: from the set-of-pairs view of chapter 1 to the doorstep of chapter 10, it never broke — every tool was banked before it was used, every debt was named before it was deferred, and every review ended the way this one ends. The bench is run. The doors are named. Go through whichever one your examination — and your curiosity — opens first.' },
    { kind: 'para', text: 'The reading order out of this book is the reading order of the shelf itself. If the examination calendar is near, walk the doors in exam order: Calculus first, because it carries the heaviest syllabus weight; then Coordinate Geometry, where the function zoo you own becomes the curve library you will need; then Trigonometry, the periodic family chapter 1 catalogued and owed; then Probability, where the counting house of chapter 6 finally meets measure. If the calendar is far, walk them in debt order — Trigonometry first, because that door has been closed the longest. Either order is honest; the only dishonest plan is no order at all.' },
    { kind: 'figure', caption: 'Figure 3 — the handoff: four doors (Calculus, Coordinate Geometry, Trigonometry, Probability), each carrying what this book proved and what it opened.', svg: rv10RDoorsSvg() },

    /* ---------------- vocabulary ---------------- */
    { kind: 'terms', items: [
      { term: 'the craft register', def: 'The five competition moves of 10.1 — substitution, ladder, symmetric read, AM–GM boundary, term hunt — recalled by id, never re-taught.' },
      { term: 'the rule register', def: 'The functional-equation families of 10.2: additive ladders, shifted cleanups, quadratic regenerations, product censuses, iteration cycles.' },
      { term: 'the map register', def: 'The one-page census of 10.3: ten chapters, their wiring, their formula shelf, and the ledger of deferred proofs.' },
      { term: 'the limit register', def: 'The doorstep machines of 10.4: secant tables, the $\\varepsilon$–$N$ promise, the seeded derivative table.' },
      { term: 'the audit chain', def: 'A witness that carries several chapters at once — one number satisfying a rule, an induction, and a digit law together.' },
      { term: 'the mixed bench', def: 'The review\'s exercise set: fresh witnesses crossing every lesson boundary, run under exam timing as the last rehearsal.' },
      { term: 'the handoff', def: 'The book\'s farewell reading: four doors (Calculus, Coordinate Geometry, Trigonometry, Probability), each carrying proved tools and opened promises.' },
      { term: 'the census', def: 'The honesty discipline that closes the book: count what exists, name what is deferred, and never let a family claim more members than it has.' },
    ] },

    /* ---------------- quiz ---------------- */
    { kind: 'quiz', items: [
      { q: 'If $x + \\frac{1}{x} = 3$, then $s_4 = x^4 + \\frac{1}{x^4}$ equals:', options: ['$45$', '$47$', '$108$', '$322$'], answer: 1,
        explain: 'The correct option is $47$: the ladder reads $s_4 = 3 s_3 - s_2 = 3 \\cdot 18 - 7 = 47$, and squaring agrees, $s_2^2 - 2 = 49 - 2 = 47$. Option $45$ is an arithmetic slip on $54 - 7$. Option $108$ doubles $s_3$ instead of applying the recurrence. Option $322$ is $s_6$, two rungs too high.' },
      { q: 'An additive $f$ has $f(1) = 3$. Then $f(7)$ equals:', options: ['$21$', '$18$', '$24$', '$10$'], answer: 0,
        explain: 'The correct option is $21$: the ladder gives $f(n) = 3n$, and $3 \\cdot 7 = 21$. Option $18$ is $s_3$ of the $x + 1/x$ ladder — the wrong ladder entirely. Option $24$ prices $f(8)$. Option $10$ adds the seed to the input instead of scaling.' },
      { q: 'Which machine satisfies $f^4 = \\mathrm{id}$ (and no smaller positive power)?', options: ['$f(x) = x^2$', '$f(x) = 2^x$', '$f(x) = \\frac{x-1}{x+1}$', '$f(x) = x + 1$'], answer: 2,
        explain: 'The correct option is the Möbius machine: its cycle reads $x \\to \\frac{x-1}{x+1} \\to -\\frac{1}{x} \\to \\frac{1+x}{1-x} \\to x$ — order exactly 4. Option $x^2$ has no finite return (iterates explode). Option $2^x$ likewise never returns. Option $x + 1$ marches forever without looping.' },
      { q: 'The secant slope of $x^2$ at $x = 3$ with $h = 0.01$ is:', options: ['$6$', '$6.01$', '$6.1$', '$9$'], answer: 1,
        explain: 'The correct option is $6.01$: the quotient reads $\\frac{(3.01)^2 - 9}{0.01} = \\frac{0.0601}{0.01} = 6.01$, and the algebra $2x + h$ agrees. Option $6$ is the limit, reached only as $h \\to 0$. Option $6.1$ is the $h = 0.1$ rung. Option $9$ is the value $f(3)$, not a slope.' },
      { q: 'The number of digits of $2^{100}$ is:', options: ['$30$', '$32$', '$31$', '$100$'], answer: 2,
        explain: 'The correct option is $31$: $100 \\log_{10} 2 = 30.1029996$, and the law gives $\\lfloor 30.1029996 \\rfloor + 1 = 31$ — the engine\'s full decimal confirms it. Option $30$ takes the floor and forgets the $+1$. Option $32$ rounds up instead of flooring. Option $100$ confuses the exponent with the digit count.' },
    ] },
  ],
}


export const chapter10: Chapter = {
  number: 10,
  slug: 'the-synthesis-and-the-doorstep',
  title: 'The Synthesis and the Doorstep',
  summary:
    'The closing synthesis, in the house manner. First the competition craft across all the new families — the substitution game on quadratics and symmetric reads, AM–GM maxima under constraints, series sums priced by difference and telescoping, binomial term hunts, log speed reads — the advanced sequel to AL 11.2. Then functional equations: functions built by rule instead of formula — additive value ladders climbed from one seed to every rational, constant cleanups, the quadratic regeneration of the Gauss sum, the product-rule census of the exponential and logarithm families, and the iteration cycles of involutions and Möbius machines. Then the book in one page: the honest map of what was built and what was only opened, the cross-references made good, the formula family gathered. And then the doorstep itself: the infinite tail’s limit met again, the changing output measured discretely along the new families, continuity named as a promise — the handoff to Calculus, with Coordinate Geometry (graphs reunited) and Trigonometry (the next family) named as the neighbouring doors. The unit review closes the book: one table, four one-move re-derivations, six cross-lesson audit chains, a seventeen-witness mixed bench, and the coda that reads the four-door handoff and the sixty-seven-lesson census sentence.',
  status: 'complete',
  lessons: [lesson101, lesson102, lesson103, lesson104, lesson10R],
  plannedLessons: [],
}
