import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — chapter 8 "The Theory of Equations"
 * (authored WHOLE-UNIT by the RUN 119 SWARM, 2026-11-21, owner directive
 * "launch multiple authoring agents": seven parallel authoring agents —
 * one per lesson plus the unit review — each with its verify-first engine
 * section grown green BEFORE its prose (the v-08*.ts part verifiers);
 * the orchestrator assembled, gated and shipped this file).
 *
 * PROVENANCE: ground = the Drive `M2 Algebra :: 02. Theory of Equations`
 * module (citation key `cengage-m2-02`, Drive id `1b4ZfmNHpNaN3LBbJWDx0tp9fINUUM1m6`,
 * 57 MB scanned, 83 PDF pages; the definitions/key-points band printed
 * 2.1–2.8 and the symmetric-functions/higher-degree-Viète band printed
 * 2.17–2.27, vision-transcribed per the v9.0 step-2b amendment) + the
 * Hall & Knight Higher Algebra theory-of-equations arc
 * (`hall-knight-higher-algebra`, the 35-chapter TOC banked run 66) + the
 * JEE Main unit list (`jee-main-2026-syllabus`) + the Cengage presentation
 * contract (`cengage-jee-style`). STUDY-NEVER-REPRODUCE absolute: every
 * roster, witness, figure, Illustration, quiz item and exercise is OUR
 * OWN, engine-pinned in scripts/verify-book4-ch08.ts.
 */
// ------------------------------------------------------------------
// lesson 8.1 — authored by the run-119 swarm (the 081 agent), integrated verbatim
// ------------------------------------------------------------------

function censusDiagram81Svg(): string {
  // the root census at degrees 3/4/5: one row per pinned polynomial — real
  // roots as green filled dots, non-real roots as orange ringed dots with each
  // conjugate pair arc-joined; the census column and the parity column make
  // 'real count ≡ degree (mod 2)' explicit on every row.
  const rows: { name: string; degree: number; dots: { label: string; real: boolean }[]; pairs: [number, number][]; census: string; parity: string }[] = [
    { name: 'x³−x²+x−1', degree: 3, dots: [{ label: '1', real: true }, { label: 'i', real: false }, { label: '−i', real: false }], pairs: [[1, 2]], census: '1 real + 2 non-real = 3', parity: '1 ≡ 3: both odd' },
    { name: 'x⁴−1', degree: 4, dots: [{ label: '1', real: true }, { label: '−1', real: true }, { label: 'i', real: false }, { label: '−i', real: false }], pairs: [[2, 3]], census: '2 real + 2 non-real = 4', parity: '2 ≡ 4: both even' },
    { name: 'x⁴+3x²+2', degree: 4, dots: [{ label: 'i', real: false }, { label: '−i', real: false }, { label: 'i√2', real: false }, { label: '−i√2', real: false }], pairs: [[0, 1], [2, 3]], census: '0 real + 4 non-real = 4', parity: '0 ≡ 4: both even' },
    { name: 'x⁵+x+1', degree: 5, dots: [{ label: '−0.75', real: true }, { label: 'z', real: false }, { label: 'z̄', real: false }, { label: 'w', real: false }, { label: 'w̄', real: false }], pairs: [[1, 2], [3, 4]], census: '1 real + 4 non-real = 5', parity: '1 ≡ 5: both odd' },
    { name: 'x³−6x²+11x−6', degree: 3, dots: [{ label: '1', real: true }, { label: '2', real: true }, { label: '3', real: true }], pairs: [], census: '3 real + 0 non-real = 3', parity: '3 ≡ 3: both odd' },
  ]
  let body = ''
  const rowY = [86, 148, 210, 272, 334]
  rows.forEach((row, ri) => {
    const y = rowY[ri]
    body += `<text x="24" y="${y - 2}" font-size="12" font-weight="700" fill="#166534">${row.name}</text>`
    body += `<text x="24" y="${y + 13}" font-size="9.5" font-weight="700" fill="#65a30d">degree ${row.degree}</text>`
    const dx = 196 + ri * 6
    row.dots.forEach((d, di) => {
      const x = dx + di * 46
      if (d.real) {
        body += `<circle cx="${x}" cy="${y}" r="13" fill="#16a34a" stroke="#166534" stroke-width="1.4"/><text x="${x}" y="${y + 4}" font-size="${d.label.length > 3 ? 8 : 10.5}" font-weight="800" fill="#ffffff" text-anchor="middle">${d.label}</text>`
      } else {
        body += `<circle cx="${x}" cy="${y}" r="13" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/><text x="${x}" y="${y + 4}" font-size="${d.label.length > 3 ? 8 : 10.5}" font-weight="800" fill="#ea580c" text-anchor="middle">${d.label}</text>`
      }
    })
    row.pairs.forEach(([a, b]) => {
      const xa = dx + a * 46
      const xb = dx + b * 46
      const mid = (xa + xb) / 2
      body += `<path d="M ${xa} ${y - 15} Q ${mid} ${y - 36} ${xb} ${y - 15}" fill="none" stroke="#d97706" stroke-width="1.7" stroke-dasharray="4 3"/>`
    })
    body += `<text x="424" y="${y + 4}" font-size="11" font-weight="700" fill="#65a30d">${row.census}</text>`
    body += `<rect x="566" y="${y - 12}" width="138" height="24" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/><text x="635" y="${y + 4}" font-size="10" font-weight="800" fill="#166534" text-anchor="middle">${row.parity} ✓</text>`
  })
  return `<svg viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The root census at degrees three, four and five: five rows, one per polynomial. Real roots are green filled dots and non-real roots are orange ringed dots, each conjugate pair joined by a dashed arc. Row one, x cubed minus x squared plus x minus one, degree three: one real root 1 and the pair i and minus i — one real plus two non-real equals three, and the parity badge reads one congruent three mod two, both odd. Row two, x to the fourth minus one: the real roots 1 and minus one plus the pair i and minus i — two real plus two non-real equals four, both even. Row three, x to the fourth plus three x squared plus two: the two pairs plus and minus i and plus and minus i root two — zero real plus four non-real equals four, both even. Row four, x to the fifth plus x plus one, degree five: the single real root approximately minus point seven five plus two unnamed conjugate pairs z, z bar and w, w bar — one real plus four non-real equals five, both odd. Row five, x cubed minus six x squared plus eleven x minus six: the real roots 1, 2, 3 — three real, three total, both odd. The footer states that non-real roots ride in conjugate pairs, so the real count always carries the degree's parity, odd degree forces at least one real root, and even degree may miss the real line entirely.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the root census: how many real, how many non-real, how many in all</text>
  <text x="96" y="52" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">equation</text>
  <text x="300" y="52" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the root roster — arcs join conjugate pairs</text>
  <text x="486" y="52" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the census</text>
  <text x="635" y="52" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">parity: real ≡ degree</text>
  ${body}
  <line x1="24" y1="368" x2="696" y2="368" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="394" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">the parity link: non-real roots ride in conjugate pairs — so the real count (with multiplicity) always carries the degree’s parity</text>
  <text x="360" y="416" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">odd degree ⇒ at least one real root; even degree may miss the real line entirely (row three: 0 real)</text>
  <text x="360" y="440" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">x⁵+x+1: the single real root ≈ −0.7549, engine-located by bisection; its four non-real roots form two conjugate pairs z, z̄ and w, w̄</text>
</svg>`
}

function conjugateMirror81Svg(): string {
  // the complex plane with the real axis drawn as the teal mirror; the root
  // set {1, i, −i} of x³−x²+x−1 (green) and the pair 2±i of x²−4x+5 (amber)
  // reflected across it — the real root 1 sits ON the mirror, self-conjugate.
  const OX = 270
  const OY = 180
  const U = 88
  let grid = ''
  for (let gx = -1; gx <= 4; gx++) for (let gy = -1; gy <= 1; gy++) {
    if (gx === 0 && gy === 0) continue
    grid += `<circle cx="${OX + gx * U}" cy="${OY - gy * U}" r="1.6" fill="#5eead4"/>`
  }
  const tick = (k: number) => `<line x1="${OX + k * U}" y1="${OY - 5}" x2="${OX + k * U}" y2="${OY + 5}" stroke="#0f766e" stroke-width="1.6"/><text x="${OX + k * U}" y="${OY + 20}" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">${k < 0 ? '−' + Math.abs(k) : k}</text>`
  return `<svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The conjugate mirror in the complex plane. The real axis is drawn as a thick teal mirror line, the imaginary axis as a green vertical line, with a faint teal lattice grid. The polynomial x cubed minus x squared plus x minus one owns the green root set 1, i and minus i: i sits one unit up and its mirror minus i one unit down, joined by a dashed green reflection line through the real axis, while the root 1 sits ON the mirror itself, labelled self-conjugate — a real number is its own conjugate. The quadratic x squared minus four x plus five owns the amber pair 2 plus i and 2 minus i, likewise mirrored across the real axis and joined by a dashed amber line. Orange reflection arcs sweep each non-real root onto its mirror image. The caption states that non-real roots of a real-coefficient equation arrive as mirror pairs z and z bar, while real roots sit on the mirror and are their own conjugates.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the conjugate mirror: non-real roots reflect across the real axis</text>
  ${grid}
  <line x1="${OX}" y1="54" x2="${OX}" y2="306" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${OX} 54 l -5 10 h 10 z" fill="#16a34a"/>
  <text x="${OX + 12}" y="52" font-size="11" font-weight="700" fill="#166534">Im</text>
  <line x1="140" y1="${OY}" x2="664" y2="${OY}" stroke="#0d9488" stroke-width="3.4"/>
  <path d="M 664 ${OY} l -10 -5 v 10 z" fill="#0d9488"/>
  <text x="640" y="${OY - 10}" font-size="11" font-weight="700" fill="#0f766e">Re</text>
  <text x="560" y="${OY + 44}" font-size="10.5" font-weight="800" fill="#0f766e" text-anchor="middle">the real axis — the conjugate mirror</text>
  ${[-1, 3, 4].map(tick).join('')}
  ${[0, 2].map((k) => `<line x1="${OX + k * U}" y1="${OY - 5}" x2="${OX + k * U}" y2="${OY + 5}" stroke="#0f766e" stroke-width="1.6"/>`).join('')}
  <line x1="${OX}" y1="${OY - U + 7}" x2="${OX}" y2="${OY + U - 7}" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="5 4"/>
  <circle cx="${OX}" cy="${OY - U}" r="7" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>
  <text x="${OX + 12}" y="${OY - U - 4}" font-size="12" font-weight="800" fill="#166534">i</text>
  <circle cx="${OX}" cy="${OY + U}" r="7" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>
  <text x="${OX + 12}" y="${OY + U + 12}" font-size="12" font-weight="800" fill="#166534">−i</text>
  <path d="M ${OX - 10} ${OY - U + 8} Q ${OX - 34} ${OY} ${OX - 10} ${OY + U - 8}" fill="none" stroke="#ea580c" stroke-width="1.9"/>
  <circle cx="${OX + U}" cy="${OY}" r="7" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>
  <text x="${OX + U}" y="${OY - 14}" font-size="12" font-weight="800" fill="#166534" text-anchor="middle">1</text>
  <text x="${OX + U}" y="${OY + 62}" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle">on the mirror: self-conjugate</text>
  <text x="258" y="70" font-size="11.5" font-weight="800" fill="#166534" text-anchor="end">x³−x²+x−1 owns {1, i, −i}</text>
  <line x1="${OX + 2 * U}" y1="${OY - U + 7}" x2="${OX + 2 * U}" y2="${OY + U - 7}" stroke="#d97706" stroke-width="1.8" stroke-dasharray="5 4"/>
  <circle cx="${OX + 2 * U}" cy="${OY - U}" r="7" fill="#d97706" stroke="#166534" stroke-width="1.4"/>
  <text x="${OX + 2 * U + 12}" y="${OY - U - 4}" font-size="12" font-weight="800" fill="#d97706">2+i</text>
  <circle cx="${OX + 2 * U}" cy="${OY + U}" r="7" fill="#d97706" stroke="#166534" stroke-width="1.4"/>
  <text x="${OX + 2 * U + 12}" y="${OY + U + 12}" font-size="12" font-weight="800" fill="#d97706">2−i</text>
  <path d="M ${OX + 2 * U - 10} ${OY - U + 8} Q ${OX + 2 * U - 34} ${OY} ${OX + 2 * U - 10} ${OY + U - 8}" fill="none" stroke="#ea580c" stroke-width="1.9"/>
  <text x="556" y="70" font-size="11.5" font-weight="800" fill="#d97706" text-anchor="middle">x²−4x+5 owns the pair 2 ± i</text>
  <text x="360" y="336" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">non-real roots of a real-coefficient equation arrive as mirror pairs z and z̄; real roots sit ON the mirror — their own conjugates</text>
</svg>`
}

function multiplicityLadder81Svg(): string {
  // the multiplicity ladder: (x−1)²(x−2)³ on a number line 0..3 — a stack of
  // two circles at the root 1, a stack of three at the root 2, the bracket
  // reading the census 2 + 3 = 5 = degree.
  const lineY = 190
  const stack = (x: number, n: number) => {
    let s = ''
    for (let k = 0; k < n; k++) {
      s += `<circle cx="${x}" cy="${lineY - 18 - k * 24}" r="11" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>`
    }
    return s
  }
  return `<svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The multiplicity ladder for the polynomial x minus one squared, times x minus two cubed. A number line runs from 0 to 3 with ticks at 0, 1, 2 and 3. Above the tick 1 stands a stack of two amber circles labelled times two; above the tick 2 stands a stack of three amber circles labelled times three. A dashed amber bracket joins the two stacks with the sum label two plus three equals five equals degree. The caption reads: the census counts the root 1 twice and the root 2 three times, giving the five-root multiset 1, 1, 2, 2, 2 — the degree is spent by the multiplicities.">
  <text x="320" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the multiplicity ladder: (x−1)²(x−2)³ owns five roots</text>
  <text x="280" y="48" font-size="12.5" font-weight="800" fill="#ea580c" text-anchor="middle">2 + 3 = 5 = degree</text>
  <line x1="220" y1="58" x2="340" y2="58" stroke="#d97706" stroke-width="1.7"/>
  <line x1="220" y1="58" x2="220" y2="134" stroke="#d97706" stroke-width="1.7"/>
  <line x1="340" y1="58" x2="340" y2="110" stroke="#d97706" stroke-width="1.7"/>
  ${stack(220, 2)}
  ${stack(340, 3)}
  <text x="246" y="156" font-size="12.5" font-weight="800" fill="#166534">×2</text>
  <text x="366" y="146" font-size="12.5" font-weight="800" fill="#166534">×3</text>
  <line x1="60" y1="${lineY}" x2="580" y2="${lineY}" stroke="#0d9488" stroke-width="2.6"/>
  <path d="M 580 ${lineY} l -10 -5 v 10 z" fill="#0d9488"/>
  ${[0, 1, 2, 3].map((k) => `<line x1="${100 + k * 120}" y1="${lineY - 6}" x2="${100 + k * 120}" y2="${lineY + 6}" stroke="#0f766e" stroke-width="1.8"/><text x="${100 + k * 120}" y="${lineY + 24}" font-size="11.5" font-weight="700" fill="#0f766e" text-anchor="middle">${k}</text>`).join('')}
  <text x="220" y="${lineY + 46}" font-size="10.5" font-weight="700" fill="#65a30d" text-anchor="middle">the root 1: twice</text>
  <text x="340" y="${lineY + 46}" font-size="10.5" font-weight="700" fill="#65a30d" text-anchor="middle">the root 2: three times</text>
  <text x="320" y="274" font-size="12" font-weight="800" fill="#65a30d" text-anchor="middle">the census: 2 + 3 = 5 — the root multiset {1, 1, 2, 2, 2}</text>
  <text x="320" y="302" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">degree = multiplicity sum: the factor (x−1)² donates two copies of the root 1, the factor (x−2)³ three copies of the root 2</text>
</svg>`
}

function singleCrossing81Svg(): string {
  // the strictly increasing curve y = x³+x+1 drawn from the polynomial itself:
  // the path is generated point-by-point inside this helper, so the geometry
  // cannot lie. The sign-change bracket f(−1) = −1 < 0 < 1 = f(0) is marked,
  // and the single crossing is pinned at ≈ −0.68 (bisection: −0.6823).
  const PX0 = 70
  const PX1 = 600
  const PY0 = 330
  const PY1 = 50
  const XA = -2
  const XB = 1.5
  const YA = -6
  const YB = 6
  const px = (x: number) => PX0 + ((x - XA) / (XB - XA)) * (PX1 - PX0)
  const py = (y: number) => PY0 - ((y - YA) / (YB - YA)) * (PY0 - PY1)
  const f = (x: number) => x * x * x + x + 1
  let path = ''
  for (let i = 0; i <= 116; i++) {
    const x = XA + (i / 116) * (XB - XA)
    const yRaw = f(x)
    const y = Math.max(YA, Math.min(YB, yRaw))
    path += `${i === 0 ? 'M' : 'L'} ${px(x).toFixed(1)} ${py(y).toFixed(1)} `
  }
  const crossX = px(-0.6823)
  return `<svg viewBox="0 0 640 390" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The curve y equals x cubed plus x plus one, plotted from the polynomial itself on axes running from x equals minus two to one point five and y equals minus six to six. The curve climbs strictly — x cubed and x each increase with x, so their sum plus one takes each real value exactly once — and it crosses the x-axis exactly one time, at approximately minus point six eight, marked by an orange dot with the label minus point six eight two three on the axis row. Two amber dots mark the sign-change bracket: the point at x equals minus one has y equal to minus one, below the axis, and the point at x equals zero has y equal to one, above it, so the crossing is trapped between minus one and zero and the bisection engine pins it at minus point six eight two three.">
  <text x="320" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the single crossing of y = x³+x+1 — strictly increasing, so it crosses once</text>
  <line x1="${PX0}" y1="${py(0)}" x2="${PX1}" y2="${py(0)}" stroke="#0d9488" stroke-width="2.5"/>
  <path d="M ${PX1} ${py(0)} l -10 -5 v 10 z" fill="#0d9488"/>
  <text x="${PX1 - 14}" y="${py(0) - 10}" font-size="11" font-weight="700" fill="#0f766e">x</text>
  <line x1="${px(0)}" y1="${PY1}" x2="${px(0)}" y2="${PY0}" stroke="#16a34a" stroke-width="2"/>
  <path d="M ${px(0)} ${PY1} l -5 10 h 10 z" fill="#16a34a"/>
  <text x="${px(0) + 10}" y="${PY1 + 10}" font-size="11" font-weight="700" fill="#166534">y</text>
  ${[-2, -1, 0, 1].map((k) => `<text x="${px(k)}" y="${py(0) + 18}" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">${k < 0 ? '−' + Math.abs(k) : k}</text>`).join('')}
  <text x="400" y="84" font-size="12" font-weight="800" fill="#166534">y = x³+x+1</text>
  <path d="${path}" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <circle cx="${px(-1)}" cy="${py(-1)}" r="5.5" fill="#d97706" stroke="#166534" stroke-width="1.3"/>
  <text x="238" y="235" font-size="10.5" font-weight="800" fill="#d97706">f(−1) = −1 &lt; 0</text>
  <circle cx="${px(0)}" cy="${py(1)}" r="5.5" fill="#d97706" stroke="#166534" stroke-width="1.3"/>
  <text x="${px(0) + 12}" y="${py(1) - 8}" font-size="10.5" font-weight="800" fill="#d97706">f(0) = 1 &gt; 0</text>
  <circle cx="${crossX}" cy="${py(0)}" r="6.5" fill="#ea580c" stroke="#166534" stroke-width="1.5"/>
  <text x="276" y="${py(0) + 18}" font-size="11" font-weight="800" fill="#ea580c" text-anchor="start">≈ −0.6823</text>
  <text x="320" y="378" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">x³ + x climbs at every step, so the curve meets the axis exactly once — the odd-degree corollary guarantees the crossing, monotonicity makes it unique</text>
</svg>`
}

function rootHunt81Svg(): string {
  // the root hunt for x³−7x+6: the engine-sampled values at every integer
  // from −4 to 3 (−30, 0, 12, 12, 6, 0, 0, 12) on a sign line — negative red,
  // positive green, roots orange — with the three sign flips marking the
  // roots −3, 1, 2.
  const ks = [-4, -3, -2, -1, 0, 1, 2, 3]
  const vals = ks.map((k) => k * k * k - 7 * k + 6)
  const pxk = (k: number) => 90 + (k + 4) * 82
  const rootAt = new Set([-3, 1, 2])
  let ticks = ''
  ks.forEach((k, i) => {
    const x = pxk(k)
    const col = vals[i] < 0 ? '#dc2626' : vals[i] > 0 ? '#166534' : '#ea580c'
    ticks += `<line x1="${x}" y1="144" x2="${x}" y2="156" stroke="#0f766e" stroke-width="1.8"/><text x="${x}" y="172" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">${k < 0 ? '−' + Math.abs(k) : k}</text>`
    ticks += `<text x="${x}" y="100" font-size="11.5" font-weight="800" fill="${col}" text-anchor="middle">${vals[i] === -30 ? '−30' : vals[i]}</text>`
    if (rootAt.has(k)) {
      ticks += `<circle cx="${x}" cy="150" r="7.5" fill="#ea580c" stroke="#166534" stroke-width="1.6"/><circle cx="${x}" cy="150" r="12.5" fill="none" stroke="#ea580c" stroke-width="1.6"/>`
      ticks += `<text x="${x}" y="198" font-size="10.5" font-weight="800" fill="#ea580c" text-anchor="middle">root ${k < 0 ? '−' + Math.abs(k) : k}</text>`
    } else {
      ticks += `<circle cx="${x}" cy="150" r="4" fill="#166534"/>`
    }
  })
  return `<svg viewBox="0 0 720 286" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The root hunt for x cubed minus seven x plus six on a number line from minus four to three. Above each integer tick the engine printed the sampled value: minus thirty at minus four, zero at minus three, twelve at minus two, twelve at minus one, six at zero, zero at one, zero at two, and twelve at three — negative values in red, positive in green, zeros in orange. Sign bands above the line show minus to the left of minus three, plus between minus three and one, minus between one and two, plus after two. The three roots minus three, one and two are orange dots ringed on the line. The caption: the sign flips at minus three, at one and at two — three flips, three crossings, the full degree-three census.">
  <text x="360" y="38" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the root hunt: sign changes of x³ − 7x + 6 pin the roots −3, 1 and 2</text>
  <text x="360" y="62" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the engine sampled f at every integer from −4 to 3 — three sign flips mark the three roots</text>
  <rect x="90" y="126" width="${pxk(-3) - 90}" height="8" fill="#dc2626" fill-opacity="0.6" rx="3"/>
  <rect x="${pxk(-3)}" y="126" width="${pxk(1) - pxk(-3)}" height="8" fill="#16a34a" fill-opacity="0.6" rx="3"/>
  <rect x="${pxk(1)}" y="126" width="${pxk(2) - pxk(1)}" height="8" fill="#dc2626" fill-opacity="0.6" rx="3"/>
  <rect x="${pxk(2)}" y="126" width="${pxk(3) - pxk(2)}" height="8" fill="#16a34a" fill-opacity="0.6" rx="3"/>
  <text x="${(90 + pxk(-3)) / 2}" y="120" font-size="13" font-weight="800" fill="#dc2626" text-anchor="middle">−</text>
  <text x="${(pxk(-3) + pxk(1)) / 2}" y="120" font-size="13" font-weight="800" fill="#16a34a" text-anchor="middle">+</text>
  <text x="${(pxk(1) + pxk(2)) / 2}" y="120" font-size="13" font-weight="800" fill="#dc2626" text-anchor="middle">−</text>
  <text x="${(pxk(2) + pxk(3)) / 2}" y="120" font-size="13" font-weight="800" fill="#16a34a" text-anchor="middle">+</text>
  <line x1="60" y1="150" x2="664" y2="150" stroke="#0d9488" stroke-width="2.6"/>
  <path d="M 664 150 l -10 -5 v 10 z" fill="#0d9488"/>
  ${ticks}
  <text x="360" y="232" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">sign flips: − → + at −3, + → − at 1, − → + at 2 — every flip is a crossing, and the three crossings ARE the roots</text>
  <text x="360" y="258" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the census closes: 3 real roots {−3, 1, 2}, 0 non-real — the degree-3 budget fully spent</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 8.1                                                           */
/* ------------------------------------------------------------------ */

const lesson81: Lesson = {
  id: 'aa-how-many-roots-degree-n-n-roots',
  number: '8.1',
  title: 'How Many Roots: Degree n, n Roots',
  concepts: [
    'real and complex polynomials',
    'roots and the solution set',
    'the fundamental theorem of algebra: n roots counted with multiplicity',
    'multiplicity as the root census',
    'the factor theorem as the census tool',
    'the conjugate-pair law for real coefficients',
    'the odd-degree corollary: at least one real root',
    'root counts over the reals vs over the complex numbers',
  ],
  objectives: [
    'State and use the fundamental theorem of algebra — a degree-n polynomial equation has exactly n roots over the complex numbers, counted with multiplicity — with the honesty note that this platform states the theorem and does not prove it.',
    'Distinguish the real-root census from the complex census: over ℝ a degree-n equation owns at most n roots and their count is parity-forced by the conjugate-pair law; over ℂ it owns exactly n.',
    'Derive the conjugate-pair law from chapter 3’s conjugate algebra — P(z̄) equals the conjugate of P(z) for real coefficients — and use it to rebuild whole equations from a single given non-real root.',
    'Count multiplicity: read (x−1)²(x−2)³ as the five-root multiset {1, 1, 2, 2, 2} and check the census 2 + 3 = 5 = degree.',
    'Use the factor theorem as the census tool — hunt integer candidates, split off linear factors, and finish the census over ℂ, as in solving x³ − 7x + 6 = 0 by the root hunt {1, 2, −3}.',
    'Form polynomial equations from prescribed root multisets — all-real rosters, conjugate pairs, and mixed sets such as {2, 3, −6} or {i, −i, 2, −1} — verifying each by expansion and evaluation at every prescribed root.',
    'Prove the odd-degree corollary and the parity law, and locate guaranteed real roots numerically by sign-change bisection — x³+x+1 at ≈ −0.6823, x⁵+x+1 at ≈ −0.7549.',
  ],
  prerequisites: ['aa-negative-discriminants-the-doors-turn-complex', 'aa-conjugate-and-modulus', 'aa-symmetric-reads-and-common-roots'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Every quadratic chapter of this book ended with the same quiet promise: $ax^2 + bx + c = 0$ owns two roots. Chapter 2 read them through Viète’s relations without solving, fenced them with sign diagrams, and certified the repeated root through the discriminant; chapter 3 then showed the doors turning complex — when $D = b^2 - 4ac < 0$, the two doors are the conjugate pair $\\frac{-b \\pm i\\sqrt{|D|}}{2a}$ — and proved that real coefficients can never leave a non-real door single. Two roots for degree 2: checked, proved, used a hundred times. But the promise raises a question none of that work could even state properly. How many roots does a degree-THREE equation have? A degree-$n$ one? The quadratic formula answered a question about degree 2 only, and chapter 3 counted to two and stopped. This lesson finally asks the counting question at full scale — the census question — and its answer is the single most structural fact in the entire theory of equations: a degree-$n$ polynomial equation has exactly $n$ roots over the complex numbers, counted with multiplicity.' },
    { kind: 'para', text: 'The statement deserves a moment of respect before it is used, because it is FALSE in the naive reading. Over the real numbers it fails at once: $x^4 + 3x^2 + 2 = 0$ owns no real root at all (its left side is at least $2$ for every real $x$), yet it owns four roots over $\\mathbb{C}$. Over the rationals it fails even for quadratics — $x^2 - 2 = 0$ has no rational door. The census depends on the DOMAIN, and the theorem’s honest home ground is the complex numbers, the arena chapter 3 built precisely so that closure failures would stop. Over $\\mathbb{C}$, and only over $\\mathbb{C}$, the count is exact, always, for every degree: $n$.' },
    { kind: 'para', text: 'Chapter 3 closed its doors lesson with a promissory note: the degree-$n$ count was stated there as a scope note and explicitly deferred to this chapter, where the degree count and the conjugate-pair law for real coefficients would return at full scale. This lesson cashes that note. The route: first the working objects — polynomials, roots, solution sets — defined carefully, because "how many roots" is meaningless until "root" is exact. Then the fundamental theorem itself, stated with this book’s standing honesty (stated, not proved) and immediately converted into a census tool on explicit witnesses. Then the conjugate-pair law for real coefficients, DERIVED in four moves from chapter 3’s conjugate algebra, and its two corollaries — the parity law and the odd-degree theorem. Finally the census in practice: factor-theorem root hunts, equations formed from prescribed root multisets, and the two-column discipline that keeps the real count and the complex count from bleeding into each other.' },

    { kind: 'heading', text: 'The Objects: Polynomials, Roots, Solution Sets' },
    { kind: 'para', text: 'A counting question is only as sharp as the objects it counts, so the definitions come first and come formally. Two families of polynomials will circulate through this chapter, and the difference between them is exactly the difference between the two censuses.' },
    { kind: 'callout', tone: 'definition', title: 'Real polynomial', text: 'Let $a_0, a_1, a_2, \\ldots, a_n$ be real numbers with $a_n \\neq 0$ and let $x$ be a real variable. Then $f(x) = a_0 + a_1x + a_2x^2 + \\cdots + a_nx^n$ is called a real polynomial of the real variable $x$, with real coefficients. Thus, every polynomial met in chapters 1 and 2 was a real polynomial, and $f(x) = x^3 - x^2 + x - 1$ is one now.' },
    { kind: 'para', text: 'Thus, the coefficients decide membership: $f$ is a real polynomial exactly when $\\bar{a_k} = a_k$ for every $k$ — a fact this lesson will exploit the moment the conjugate-pair law arrives. For example, the three-roster run:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $2x^3 - 7x^2 + x + 5$ is a real polynomial of degree $3$ — every coefficient real, the leading coefficient $2$ nonzero;',
      '(ii) $(3 - 2i)x^2 - ix + 5$ is a polynomial of degree $2$ but NOT a real polynomial — three of its coefficients are non-real;',
      '(iii) $x^5 + x + 1$ is a real polynomial of degree $5$ in which the powers $x^4, x^3, x^2$ simply carry coefficient $0$ — missing powers are zeros, never absences.',
    ] },
    { kind: 'callout', tone: 'definition', title: 'Complex polynomial', text: 'If $a_0, a_1, a_2, \\ldots, a_n$ are complex numbers — some possibly non-real — and $x$ is a varying complex number, then $f(x) = a_0 + a_1x + a_2x^2 + \\cdots + a_nx^n$ is called a complex polynomial, or a polynomial with complex coefficients. Thus, every real polynomial is automatically a complex polynomial, but $(1+i)x^2 - ix + 5$ is a complex polynomial that is not a real one.' },
    { kind: 'para', text: 'Thus, "complex polynomial" is the larger family: the real polynomials sit inside it as the members whose coefficients are self-conjugate. The distinction is not pedantry — it is the exact boundary of the conjugate-pair law, which will hold for the real family and visibly FAIL for the larger one (a complex-coefficient polynomial can own the single non-real root $i$ all by itself). Both families share one degree convention, the census’s budget:' },
    { kind: 'equation', latex: 'f(x) = a_0 + a_1x + a_2x^2 + \\cdots + a_nx^n, \\qquad a_n \\neq 0 \\quad (\\deg f = n) \\tag{1}', note: 'the general form of a polynomial of degree $n$: the leading coefficient $a_n$ is nonzero, and a power that does not appear carries coefficient $0$ — degree 2 is quadratic, degree 3 cubic, degree 4 bi-quadratic.' },
    { kind: 'para', text: 'With the objects fixed, the equation and its roots are one definition each. Setting $f(x) = 0$ turns the polynomial into a polynomial equation; the values of $x$ that satisfy it are its roots; and the full collection of roots, in a chosen domain, is the solution set — the thing "solving" means producing.' },
    { kind: 'callout', tone: 'definition', title: 'Roots and the solution set', text: 'A number $\\alpha$ — real or complex — is a ROOT of the equation $f(x) = 0$ when $f(\\alpha) = 0$; the SOLUTION SET of the equation, in a given domain, is the set of all its roots in that domain. Thus, $x = 1$ is a root of $x^3 - 6x^2 + 11x - 6 = 0$ because $1 - 6 + 11 - 6 = 0$, and the solution set of that equation is $\\{1, 2, 3\\}$ — over $\\mathbb{R}$ and over $\\mathbb{C}$ alike, because all three roots are real.' },
    { kind: 'equation', latex: 'x^3 - 6x^2 + 11x - 6 = 0 \\iff x \\in \\{1,\\; 2,\\; 3\\} \\tag{2}', note: 'the solution-set statement for the running cubic witness: three real roots — and once the fundamental theorem arrives, the guarantee that no fourth root hides anywhere over $\\mathbb{C}$.' },
    { kind: 'para', text: 'One phrase in the definition carries all the weight: IN A GIVEN DOMAIN. The solution set is measured against a chosen arena, and the arena changes the answer. The equation $(x-2)(x^2+9) = 0$ has solution set $\\{2\\}$ over the real numbers — the factor $x^2 + 9$ never vanishes there — and $\\{2, 3i, -3i\\}$ over the complex ones. Same equation, two honest censuses, different totals. The whole architecture of this lesson is the discipline of keeping those two censuses separate: how many roots over $\\mathbb{R}$ (a parity-forced number between $0$ and $n$) versus how many over $\\mathbb{C}$ (exactly $n$, always).' },
    { kind: 'example', title: 'Verify that $\\{1, 2, 3\\}$ is the complete solution set of $x^3 - 6x^2 + 11x - 6 = 0$, and state the census', steps: [
      'Check each candidate directly: $f(1) = 1 - 6 + 11 - 6 = 0$, $f(2) = 8 - 24 + 22 - 6 = 0$ and $f(3) = 27 - 54 + 33 - 6 = 0$ — all three are roots.',
      'Now, split the factors off: three roots give $x^3 - 6x^2 + 11x - 6 = (x-1)(x-2)(x-3)$, and multiplying the right side out returns exactly $x^3 - 6x^2 + 11x - 6$ — the engine-verified certificate.',
      'So, the census: degree $3$, three distinct real roots, hence $3$ real $+ 0$ non-real $= 3$ total — the degree budget fully spent on the real line.',
      'Hence the solution set is $\\{1, 2, 3\\}$ complete — over $\\mathbb{R}$ and over $\\mathbb{C}$ identically, since nothing non-real is needed and (by the theorem ahead) no fourth root can exist.',
    ] },
    { kind: 'terms', items: [
      { term: 'Real polynomial', def: 'a polynomial $f(x) = a_0 + a_1x + \\cdots + a_nx^n$ all of whose coefficients $a_0, \\ldots, a_n$ are real numbers, with the variable ranging over the reals.' },
      { term: 'Complex polynomial', def: 'a polynomial whose coefficients may be complex numbers, with the variable ranging over the complex numbers — the arena in which the full root census lives.' },
      { term: 'Degree of a polynomial', def: 'the highest power of $x$ carrying a nonzero coefficient: $f$ has degree $n$ when $a_n \\neq 0$.' },
      { term: 'Root of an equation', def: 'a number $\\alpha$, real or complex, at which the polynomial vanishes: $f(\\alpha) = 0$.' },
      { term: 'Solution set', def: 'the set of ALL roots of an equation in the chosen domain — solving the equation means producing this set completely.' },
      { term: 'Multiplicity of a root', def: 'the number of times the factor $(x - \\alpha)$ appears in the complete factorisation; the census counts the root exactly that many times.' },
      { term: 'Root census (with multiplicity)', def: 'the count of roots listed with repeats — a degree-$n$ equation owns exactly $n$ of them over the complex numbers.' },
      { term: 'Conjugate pair', def: 'a pair of non-real roots $z, \\bar{z}$ of a real-coefficient equation — the mirror image of a non-real root is a root too.' },
      { term: 'Fundamental theorem of algebra', def: 'the census law: a degree-$n$ polynomial equation has exactly $n$ roots over the complex numbers, counted with multiplicity.' },
      { term: 'Double root', def: 'a root of multiplicity $2$, as at $x = 1$ in $x^3 - 3x + 2 = (x-1)^2(x+2)$ — the census lists it twice.' },
    ] },
    { kind: 'para', text: 'The vocabulary is banked. Now the counting question itself, asked with the objects precise: for a polynomial of degree $n$ — real or complex coefficients — how many roots does $f(x) = 0$ truly have?' },

    { kind: 'heading', text: 'The Fundamental Theorem of Algebra' },
    { kind: 'para', text: 'The evidence first, because the pattern is visible in the smallest cases and the theorem names it. A linear equation $ax + b = 0$ owns one root, $-b/a$. A quadratic owns two over $\\mathbb{C}$ — chapter 3 built those doors by hand, real or complex, repeated or paired. A cubic? The witness $x^3 - 6x^2 + 11x - 6 = 0$ owns three. Another cubic, $x^3 - x^2 + x - 1 = 0$, owns one real root and two non-real ones — still three. The pattern says the count never leaves the degree: $n$ roots for degree $n$. The theorem that guarantees the pattern for EVERY degree is the fundamental theorem of algebra, and this book states it in its counting form.' },
    { kind: 'callout', tone: 'theorem', title: 'The fundamental theorem of algebra (the census form)', text: 'A polynomial equation of degree $n$ — with real or with non-real coefficients — has exactly $n$ roots over the complex numbers, counted with multiplicity. Equivalently, every degree-$n$ polynomial splits completely over $\\mathbb{C}$ into $n$ linear factors, repeats counted repeatedly: $f(x) = a\\,(x-\\alpha_1)(x-\\alpha_2)\\cdots(x-\\alpha_n)$. Thus, $x^3 - x^2 + x - 1 = 0$ owns exactly three roots over $\\mathbb{C}$, and they are $1$, $i$ and $-i$: nothing else can appear, and nothing is missing.' },
    { kind: 'equation', latex: 'x^3 - x^2 + x - 1 = (x-1)(x^2 + 1) = (x-1)(x-i)(x+i) \\tag{3}', note: 'the census certificate for the running witness: three linear factors over $\\mathbb{C}$ — one real root, one conjugate pair, three in all, the degree fully spent.' },
    { kind: 'callout', tone: 'insight', title: 'Stated, not proved — the platform’s discipline', text: 'This book uses the fundamental theorem of algebra and does not prove it. The proof is genuinely deep: every known route — complex analysis, topology, or a long algebraic climb — needs machinery this platform has not built, and a fake "proof" would be worse than an honest statement. Chapter 3 made the same call at degree 2 and DELIVERED that case by construction, because the quadratic door formula is elementary; the general statement is now received as a census tool. The discipline that keeps this honest: every number this lesson extracts from the theorem is re-verified by the engine on explicit witnesses — every factorisation is multiplied out, every root is substituted back, every count is checked against the degree — so the theorem is used as stated, never as understood.' },
    { kind: 'callout', tone: 'historical', title: 'The theorem’s long proof story', text: 'The statement is older than its proof by decades. d’Alembert offered an argument in 1746 and Euler another in 1749; both had gaps, and Lagrange’s critiques of the 1770s exposed them precisely. Gauss’s 1799 doctoral dissertation gave the first argument recognised as essentially complete — though even it leaned on an unproved assumption about how two curves cross (a Jordan-curve-style fact only justified a century later), and Gauss returned to the theorem with three more proofs, in 1816 and again in 1849. The name "fundamental theorem of algebra" is itself a historical overshoot: the theorem is not a theorem of algebra alone, which is exactly why it was hard to prove by algebra alone. This lesson joins that tradition honestly — the census is stated, used, and engine-verified on witnesses.' },
    { kind: 'para', text: 'The phrase COUNTED WITH MULTIPLICITY is the theorem’s fine print, and it deserves its own paragraph because it is where most census errors live. A root $\\alpha$ has MULTIPLICITY $m$ when the factor $(x - \\alpha)$ appears exactly $m$ times in the complete factorisation — and the census counts $\\alpha$ exactly $m$ times, once per copy. The cleanest witness:' },
    { kind: 'equation', latex: '(x-1)^2 (x-2)^3 = 0 \\;\\Longrightarrow\\; \\text{roots } \\{1, 1, 2, 2, 2\\}, \\qquad 2 + 3 = 5 \\tag{4}', note: 'the multiplicity census: the degree is spent by the multiplicities — two copies at the root $1$, three at the root $2$, five in all.' },
    { kind: 'example', title: 'Run the complete census of $x^3 - x^2 + x - 1 = 0$: every root, its nature, and the total', steps: [
      'Split by grouping: $x^3 - x^2 + x - 1 = x^2(x - 1) + 1\\cdot(x - 1) = (x-1)(x^2 + 1)$ — the engine multiplies the right side back to the left exactly.',
      'So, the real factor first: $x - 1 = 0$ gives the root $x = 1$ — the one real root.',
      'Now, the quadratic factor: $x^2 + 1 = 0$ gives $x^2 = -1$, that is $x = i$ and $x = -i$ — two non-real roots, one conjugate pair.',
      'Check the census: $1$ real $+\\; 2$ non-real $= 3$ total $=$ degree $3$ — the fundamental theorem’s count, met exactly, with nothing missing and nothing extra.',
      'Hence the solution set over $\\mathbb{C}$ is $\\{1, i, -i\\}$, and the solution set over $\\mathbb{R}$ is $\\{1\\}$ — the two censuses of one equation, both honest.',
    ] },
    { kind: 'example', title: 'Count the roots of $(x-1)^2(x-2)^3 = 0$ with multiplicity, and state its degree', steps: [
      'Read the distinct roots: the equation vanishes only at $x = 1$ and $x = 2$ — two distinct numbers.',
      'Now, the multiplicities: the factor $(x-1)$ appears twice (root $1$ has multiplicity $2$) and the factor $(x-2)$ three times (root $2$ has multiplicity $3$).',
      'So, the census lists each root once per copy: $\\{1, 1, 2, 2, 2\\}$ — five roots with multiplicity.',
      'Check against the degree: expanding $(x-1)^2(x-2)^3$ gives a degree-$5$ polynomial, and $2 + 3 = 5$ — the multiplicity sum IS the degree, always.',
      'Hence the answer: five roots counted with multiplicity ($1$ twice, $2$ three times), degree $5$ — but only TWO distinct roots: "how many roots" means "how many counting multiplicity" the moment the census is invoked.',
    ] },
    { kind: 'figure', caption: 'The multiplicity ladder for $(x-1)^2(x-2)^3$. The number line carries a stack of two circles at the root $1$ (labelled $\\times 2$) and a stack of three at the root $2$ (labelled $\\times 3$); the bracket over both stacks reads the census $2 + 3 = 5 = \\text{degree}$. The lesson’s counting law in one picture: each repeat of a factor counts the root again, so the degree is spent by the multiplicities — the multiset $\\{1, 1, 2, 2, 2\\}$ — even though only two distinct numbers appear.', svg: multiplicityLadder81Svg() },
    { kind: 'para', text: 'The ladder generalises without effort: if the distinct roots are $\\beta_1, \\ldots, \\beta_k$ with multiplicities $m_1, \\ldots, m_k$, the complete factorisation is $f(x) = a\\,(x-\\beta_1)^{m_1}\\cdots(x-\\beta_k)^{m_k}$ and the census reads $m_1 + m_2 + \\cdots + m_k = n$. The full roster of this lesson’s witnesses, counted exactly that way, settles into one table — and the table is the picture of the whole theory:' },
    { kind: 'table', head: ['Equation', 'Degree', 'Real roots', 'Non-real roots', 'Total over ℂ', 'Parity'], rows: [
      ['$x^3 - 6x^2 + 11x - 6 = 0$', '3', '3', '0', '3', '$3 \\equiv 3$'],
      ['$x^3 - 7x + 6 = 0$', '3', '3', '0', '3', '$3 \\equiv 3$'],
      ['$x^3 - x^2 + x - 1 = 0$', '3', '1', '2', '3', '$1 \\equiv 3$'],
      ['$x^3 + x + 1 = 0$', '3', '1', '2', '3', '$1 \\equiv 3$'],
      ['$x^4 - 1 = 0$', '4', '2', '2', '4', '$2 \\equiv 4$'],
      ['$x^4 + 3x^2 + 2 = 0$', '4', '0', '4', '4', '$0 \\equiv 4$'],
      ['$x^5 + x + 1 = 0$', '5', '1', '4', '5', '$1 \\equiv 5$'],
      ['$(x-1)^2(x-2)^3 = 0$', '5', '5 (with multiplicity)', '0', '5', '$5 \\equiv 5$'],
    ], caption: 'The census table — every row engine-verified: each factorisation multiplied out, each root substituted back, each count checked against the degree. The parity column is the law this lesson derives in the next section: the real-root count (with multiplicity) always carries the degree’s parity, because the non-real roots ride in conjugate pairs. Read the last column as “real count and degree are both odd” or “both even” — never once mixed.' },
    { kind: 'figure', caption: 'The root census at degrees 3, 4 and 5. Each row is one pinned polynomial: real roots are green filled dots, non-real roots are orange ringed dots with every conjugate pair joined by a dashed arc, the census column adds real $+$ non-real $=$ total, and the parity badge compares the real count with the degree. Row 1, $x^3 - x^2 + x - 1$: the real root $1$ plus the pair $\\pm i$ — $1 + 2 = 3$, both odd. Row 2, $x^4 - 1$: $\\pm 1$ plus $\\pm i$ — $2 + 2 = 4$, both even. Row 3, $x^4 + 3x^2 + 2$: the two pairs $\\pm i$ and $\\pm i\\sqrt{2}$ — $0 + 4 = 4$, both even: a quartic that misses the real line entirely. Row 4, $x^5 + x + 1$: one real root $\\approx -0.75$ plus two unnamed pairs — $1 + 4 = 5$, both odd. Row 5, $x^3 - 6x^2 + 11x - 6$: three real roots — $3 + 0 = 3$. The parity link highlighted in every badge is the conjugate-pair law’s arithmetic shadow.', svg: censusDiagram81Svg() },
    { kind: 'example', title: 'The quartic census of $x^4 - 1 = 0$: how many real roots, how many non-real, how many in all?', steps: [
      'Split the difference of squares: $x^4 - 1 = (x^2 - 1)(x^2 + 1) = (x-1)(x+1)(x^2+1)$ — two real linear factors and one irreducible real quadratic.',
      'So, the real census: $x^2 = 1$ gives $x = 1$ and $x = -1$ — two real roots.',
      'Now, the complex census: $x^2 = -1$ gives $x = i$ and $x = -i$ — two non-real roots, one conjugate pair.',
      'Check the total: $2 + 2 = 4 = \\deg(x^4 - 1)$ — the fundamental theorem’s count met exactly.',
      'Hence the census: $2$ real, $2$ non-real, $4$ in all — the parity column of the table witnessed by the cleanest quartic there is.',
    ] },
    { kind: 'example', title: 'Find all roots of $x^4 + 3x^2 + 2 = 0$ over the complex numbers, and state the real-root count', steps: [
      'Read the shape: a quadratic in $x^2$ — factor it as $(x^2 + 1)(x^2 + 2)$, which the engine multiplies back exactly.',
      'So, the real-root count is ZERO before any solving: for real $x$ every term $x^4$, $3x^2$, $2$ is non-negative, so the left side is at least $2$ and never vanishes.',
      'Now, the complex census: $x^2 = -1$ gives $x = i$ and $-i$; $x^2 = -2$ gives $x = i\\sqrt{2}$ and $-i\\sqrt{2}$ — two conjugate pairs, four non-real roots.',
      'Check the total: $0 + 4 = 4 = \\deg(x^4 + 3x^2 + 2)$ — the census closes.',
      'Hence the quartic owns $0$ real roots and $4$ non-real roots $\\{\\pm i, \\pm i\\sqrt{2}\\}$ — the even-degree case at its extreme: an equation whose entire root roster lives off the real line, impossible for any odd degree.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The half of the theorem that IS elementary', text: 'Over any domain whatsoever, a nonzero polynomial of degree $n$ has AT MOST $n$ roots — and this half needs no fundamental theorem. If $\\alpha_1, \\ldots, \\alpha_k$ are distinct roots, the factor theorem (chapter 2) splits off one linear factor per root, so $(x-\\alpha_1)\\cdots(x-\\alpha_k)$ divides $f$, forcing $k \\leq n$ by degree alone. What is genuinely deep is the converse — that over $\\mathbb{C}$ the count reaches exactly $n$, no fewer. Keep the halves separate: the ceiling is free, the floor is the fundamental theorem, and the gap between floor and ceiling is where parity lives.' },
    { kind: 'para', text: 'The table’s rightmost column has now earned its derivation. Why should the real count always match the degree’s parity? The answer is one theorem about the non-real roots of real polynomials, and it is the direct cashing of chapter 3’s conjugate algebra.' },

    { kind: 'heading', text: 'The Conjugate-Pair Law for Real Coefficients' },
    { kind: 'para', text: 'Chapter 3 built the conjugate’s algebra carefully: conjugation respects sums and products, it is its own inverse, and real numbers are exactly the self-conjugate ones. Lesson 3.3 spent that algebra on the quadratic — real coefficients force the $D < 0$ doors into mirror pairs. The same three laws now climb to every degree at once, and the climb is four moves.' },
    { kind: 'derivation', title: 'Theorem: the conjugate-pair law for real coefficients', statement: 'If P(x) is a polynomial with real coefficients, then P of z-bar equals the conjugate of P(z) for every complex z; hence every non-real root of P(x) = 0 comes with its conjugate: P(α) = 0 forces P of α-bar to be 0 as well.', steps: [
      { label: 'Conjugation respects sums and products', formula: '\\overline{u + v} = \\bar{u} + \\bar{v}, \\qquad \\overline{uv} = \\bar{u}\\,\\bar{v}', explanation: 'chapter 3’s conjugate algebra: the mirror of a sum is the sum of the mirrors, and the mirror of a product is the product of the mirrors — both verified there coordinate by coordinate on $a + bi$.' },
      { label: 'Powers conjugate termwise', formula: '\\overline{z^k} = \\bar{z}^k \\quad (k = 0, 1, 2, \\ldots)', explanation: 'induction on $k$ from the product rule: it is true at $k = 0$ (both sides $1$) and at $k = 1$, and each step up multiplies both sides by one more $\\bar{z}$.' },
      { label: 'Real coefficients pass through', formula: 'P(\\bar{z}) = \\sum_{k=0}^{n} a_k\\,\\bar{z}^k = \\sum_{k=0}^{n} \\overline{a_k\\,z^k} = \\overline{P(z)}', explanation: 'assemble the polynomial from its terms: each $a_k$ is real, so $\\overline{a_k z^k} = \\bar{a_k}\\,\\bar{z}^k = a_k\\,\\bar{z}^k$, and the sum rule carries the bar over the whole assembly — the coefficients being real is USED exactly here, and nowhere else.' },
      { label: 'A root’s mirror is a root', formula: 'P(\\alpha) = 0 \\;\\Rightarrow\\; \\overline{P(\\alpha)} = 0 \\;\\Rightarrow\\; P(\\bar{\\alpha}) = 0', explanation: 'the only number whose conjugate is $0$ is $0$ itself, so conjugating a true equation preserves it — and step 3 turns the conjugate of $P(\\alpha)$ into $P$ evaluated at $\\bar{\\alpha}$. A non-real root therefore cannot travel alone: its mirror rides with it.' },
      { label: 'The witness at z = i', formula: 'P(x) = x^3 - x^2 + x - 1:\\; P(i) = i^3 - i^2 + i - 1 = -i + 1 + i - 1 = 0', explanation: 'one substitution certifies $i$ as a root; the law then hands over $P(-i) = 0$ without any further arithmetic — and the engine checks it: $(-i)^3 - (-i)^2 + (-i) - 1 = i + 1 - i - 1 = 0$. The negative witness runs the other way: for the complex-coefficient $P(x) = x + i$ at $z = i$, $P(\\bar{z}) = 0$ but $\\overline{P(z)} = -2i$ — the law fails exactly when the coefficients stop being real.' },
    ], result: 'for real coefficients: $P(\\bar{z}) = \\overline{P(z)}$, so non-real roots ride in conjugate pairs $z, \\bar{z}$ — never singly' },
    { kind: 'figure', caption: 'The conjugate mirror. The real axis of the complex plane is drawn as the thick teal mirror; the root set $\\{1, i, -i\\}$ of $x^3 - x^2 + x - 1$ sits in green with the pair $i, -i$ joined by a dashed reflection line through the axis, and the real root $1$ sits ON the mirror itself — a real number is its own conjugate. The pair $2 \\pm i$ (the full root set of the real quadratic $x^2 - 4x + 5$) sits in amber, mirrored the same way. Reflection across the real axis is the geometry of the law just derived: real coefficients, mirror-symmetric root roster.', svg: conjugateMirror81Svg() },
    { kind: 'para', text: 'The law converts immediately into a construction tool, because a conjugate pair prices a REAL quadratic. Sum and product of the pair are conjugation-invariant: $z + \\bar{z} = 2\\,\\mathrm{Re}(z)$ and $z\\bar{z} = |z|^2$ are real, so' },
    { kind: 'equation', latex: '(x - z)(x - \\bar{z}) = x^2 - (z + \\bar{z})x + z\\bar{z} = x^2 - 2\\,\\mathrm{Re}(z)\\,x + |z|^2 \\tag{5}', note: 'a conjugate pair manufactures a real quadratic — the coefficients are the pair’s real sum and real product. For the pair $2 \\pm i$: sum $4$, product $|2+i|^2 = 5$, giving $x^2 - 4x + 5$.' },
    { kind: 'callout', tone: 'theorem', title: 'The conjugate-pair law (full degree)', text: 'Let $f$ be a polynomial of degree $n \\geq 2$ with real coefficients. Its non-real roots occur in conjugate pairs: if $z$ is a root, so is $\\bar{z}$, and $z \\neq \\bar{z}$. Consequently a real polynomial can NEVER own exactly one non-real root, nor any odd number of non-real roots — the non-real count is even, always. Equivalently: whenever a non-real root $z$ appears, the real quadratic $x^2 - 2\\,\\mathrm{Re}(z)\\,x + |z|^2$ divides $f$. Thus, a real cubic owns either three real roots or one real root plus one pair; a real quartic owns four real, two real plus one pair, or two pairs — and no other option exists.' },
    { kind: 'example', title: 'Form the real quadratic equation whose roots are $2 + i$ and $2 - i$, and verify that its coefficients are real', steps: [
      'Read the pair: the roots are conjugates, so the coefficients will come out real — the law guarantees it before any arithmetic.',
      'Take the sum and the product: $(2+i) + (2-i) = 4$ and $(2+i)(2-i) = |2+i|^2 = 2^2 + 1^2 = 5$ — both real, as promised.',
      'So, the monic reconstruction: $x^2 - Sx + P = x^2 - 4x + 5$.',
      'Check by direct multiplication: $(x - (2+i))(x - (2-i)) = (x-2)^2 - i^2 = x^2 - 4x + 4 + 1 = x^2 - 4x + 5$ — the engine confirms the coefficient comparison.',
      'Hence the equation is $x^2 - 4x + 5 = 0$: a real quadratic whose two doors are the non-real pair $2 \\pm i$ — the $D = 16 - 20 < 0$ case, as chapter 3’s door formula also computes.',
    ] },
    { kind: 'example', title: 'A real quartic with leading coefficient 1 has the roots $2i$, $1$ and $-1$. Find it completely', steps: [
      'Invoke the law first: the root $2i$ is non-real and the coefficients are real, so $-2i$ must be a root too — the quartic’s roster is $\\{2i, -2i, 1, -1\\}$ before anything is multiplied.',
      'So, build the pair’s factor: $(x - 2i)(x + 2i) = x^2 - (2i)^2 = x^2 + 4$ — the guaranteed real quadratic carrying the pair.',
      'Now, the real roots: $(x - 1)(x + 1) = x^2 - 1$.',
      'Assemble: the quartic is $(x^2 + 4)(x^2 - 1) = x^4 + 3x^2 - 4$, with leading coefficient $1$ and four roots — degree fully spent.',
      'Hence $f(x) = x^4 + 3x^2 - 4$ — engine-checked by evaluation at all four roots: the substitution returns $0$ at each of $2i, -2i, 1, -1$ (for instance $f(2i) = 16 + 3(-4) - 4 = 0$), every coefficient is real as the pairing guaranteed, and the census reads $2$ real $+ 2$ non-real $= 4$.',
    ] },
    { kind: 'para', text: 'Now the arithmetic shadow. Count the census by type: $r$ real roots (with multiplicity) and non-real roots organised into $p$ conjugate pairs — the pair count is forced, since the law mates every non-real root with exactly one distinct partner. The degree budget splits accordingly:' },
    { kind: 'equation', latex: 'r + 2p = n \\tag{6}', note: 'the parity equation: $r$ = real roots counted with multiplicity, $p$ = conjugate pairs; the non-real roots contribute $2$ each, so the real count $r$ carries the degree’s parity — $r \\equiv n \\pmod 2$.' },
    { kind: 'derivation', title: 'Corollary: the odd-degree theorem', statement: 'Every polynomial of odd degree with real coefficients has at least one real root.', steps: [
      { label: 'Count by type', formula: 'n = r + 2p', explanation: 'the census partition: each of the $n$ roots (with multiplicity) is either real — $r$ of them — or non-real; the non-real ones sit in conjugate pairs, $p$ pairs contributing $2p$ roots.' },
      { label: 'Parity passes to r', formula: 'r = n - 2p \\equiv n \\pmod 2', explanation: 'subtracting the even number $2p$ cannot change parity: the real count and the degree are both odd or both even. This is the parity law, and it needs nothing but the conjugate-pair law.' },
      { label: 'Odd degree forces r odd', formula: 'n \\text{ odd} \\Rightarrow r \\text{ odd} \\Rightarrow r \\geq 1', explanation: 'an odd number cannot be zero, so at least one root is real — existence guaranteed, no value promised. The even-degree case gets no such promise: $x^4 + 3x^2 + 2$ owns none at all.' },
      { label: 'The witnesses', formula: 'x^3 + x + 1 \\;(r = 1), \\qquad x^5 + x + 1 \\;(r = 1)', explanation: 'both odd-degree real polynomials, both owning exactly one real root with the rest in pairs — the census rows $1 + 2 = 3$ and $1 + 4 = 5$ of the table.' },
    ], result: 'odd degree with real coefficients $\\Rightarrow$ at least one real root: $r \\equiv n \\pmod 2$, so $r$ cannot vanish when $n$ is odd' },
    { kind: 'para', text: 'The corollary guarantees existence, not location — and the distance between those two is worth crossing once, explicitly, because it is this chapter’s first taste of numerical work. Take $x^3 + x + 1 = 0$. Existence is free: degree 3, real coefficients, so at least one real root. Location: the monotonicity argument nails the COUNT — if $a < b$ then $a^3 < b^3$ and $a < b$, so $a^3 + a < b^3 + b$; the map $x \\mapsto x^3 + x$ is strictly increasing, hence $x^3 + x + 1$ takes the value $0$ exactly once. One real root, therefore exactly two non-real ones (the census $1 + 2 = 3$). Where is it? A sign change brackets it: $f(-1) = -1 < 0$ and $f(0) = 1 > 0$, so the root lives in $(-1, 0)$; halving the interval repeatedly — bisection, the engine’s own tool — pins it at $x \\approx -0.6823$. The quintic $x^5 + x + 1 = 0$ repeats the story one degree up: $x^5 + x$ is strictly increasing (same argument), $f(-1) = -1 < 0 < 1 = f(0)$, and bisection locates the single real root at $x \\approx -0.7549$ — the census row $1 + 4 = 5$.' },
    { kind: 'callout', tone: 'insight', title: 'Existence versus location', text: 'The odd-degree theorem says THAT a root exists; a sign change narrows WHERE; bisection names it to any accuracy asked. The two engine-pinned values of this lesson — $-0.6823$ for the cubic $x^3 + x + 1$ and $-0.7549$ for the quintic $x^5 + x + 1$ — are numerical facts, a different species from the algebraic facts around them: they are located, not solved for, and the lesson labels them with the approximation sign to keep the species visible. What the algebra DID prove, exactly: each of those equations owns exactly one real root, so each owns exactly one conjugate pair besides.' },

    { kind: 'heading', text: 'The Census in Practice' },
    { kind: 'para', text: 'Three practical engines turn the census from a theorem into a working tool, and all three ride the factor theorem of chapter 2 — restated in census language: $f(\\alpha) = 0$ if and only if $(x - \\alpha)$ divides $f(x)$ exactly. Each confirmed root splits off a linear factor, the degree drops by (at least) one, and the census closes when the remaining factor is linear or a real quadratic whose pair the door formula reads.' },
    { kind: 'example', title: 'Solve $x^3 - 7x + 6 = 0$ by the factor-theorem root hunt, and state the full census', steps: [
      'List the candidates: integer coefficients with constant term $6$ — any integer root must divide $6$, so the hunt tries $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.',
      'Check the cheap ones: $f(1) = 1 - 7 + 6 = 0$ — a root; split it off: $x^3 - 7x + 6 = (x-1)(x^2 + x - 6)$.',
      'Now, finish the quadratic: $x^2 + x - 6 = (x + 3)(x - 2)$, so the complete factorisation is $(x-1)(x-2)(x+3)$.',
      'Check the remaining candidates confirm nothing else: the engine sweep over $\\{\\pm1, \\pm2, \\pm3, \\pm6\\}$ finds exactly $\\{1, 2, -3\\}$ — the census is closed, not merely sampled.',
      'Hence the solution set is $\\{1, 2, -3\\}$ — three real roots, zero non-real, $3 = \\deg$: the degree fully spent on the real line, and the sign-line hunt that pinned it is drawn in the exercises.',
    ] },
    { kind: 'para', text: 'The second engine runs the factor theorem backwards: EQUATION FORMING. A prescribed root multiset rebuilds a monic polynomial completely — multiply the factors $(x - \\alpha)$ together, one per root copy — and the conjugate-pair law supplies the discipline whenever a non-real root is prescribed: its mirror must be prescribed too, or the coefficients will not come out real.' },
    { kind: 'example', title: 'Form the cubic equation with roots $2$, $3$ and $-6$, and verify it at every prescribed root', steps: [
      'Assemble the monic form: $(x - 2)(x - 3)(x + 6)$.',
      'Multiply the first two: $(x-2)(x-3) = x^2 - 5x + 6$.',
      'Now, finish: $(x^2 - 5x + 6)(x + 6) = x^3 + 6x^2 - 5x^2 - 30x + 6x + 36 = x^3 + x^2 - 24x + 36$.',
      'Check by evaluation: the engine substitutes $2, 3$ and $-6$ — each returns $0$.',
      'Hence the equation is $x^3 + x^2 - 24x + 36 = 0$ — three real roots, census $3 + 0 = 3 = \\deg$.',
    ] },
    { kind: 'example', title: 'Form the monic quartic equation with real coefficients whose roots are $i$, $-i$, $2$ and $-1$', steps: [
      'Read the roster for parity: the non-real roots $i$ and $-i$ already arrive as a pair — the prescription is realisable, since conjugates are both present.',
      'So, build the pair’s factor: $(x - i)(x + i) = x^2 + 1$.',
      'Now, the real factors: $(x - 2)(x + 1) = x^2 - x - 2$.',
      'Multiply: $(x^2 + 1)(x^2 - x - 2) = x^4 - x^3 - x^2 - x - 2$.',
      'Check by evaluation: the engine substitutes $i$, $-i$, $2$ and $-1$ — each returns $0$, and every coefficient of the product is real, as the pairing guaranteed.',
      'Hence the equation is $x^4 - x^3 - x^2 - x - 2 = 0$ — census $2$ real $+ 2$ non-real $= 4 = \\deg$.',
    ] },
    { kind: 'para', text: 'The third engine is the two-column discipline itself — reading any equation’s census over both domains without confusing them. Over $\\mathbb{R}$: at most $n$ roots (the elementary half), the count parity-forced by the conjugate-pair law, and every value $r \\equiv n \\pmod 2$ between $0$ (even degree only) and $n$ is genuinely achievable. Over $\\mathbb{C}$: exactly $n$, always, no exceptions, no parity to check. When an examination asks "the number of real roots of $x^5 + x + 1 = 0$", the answer is $1$ — by monotonicity — while "the number of roots" unqualified over $\\mathbb{C}$ is $5$. The two-column habit: ask WHICH COLUMN, then count.' },
    { kind: 'callout', tone: 'warn', title: 'The three classic census traps', text: 'Trap one — "exactly $n$ REAL roots": the fundamental theorem counts over $\\mathbb{C}$; over $\\mathbb{R}$ the count is at most $n$, and $x^4 + 3x^2 + 2 = 0$ owns none. Trap two — forgetting multiplicity: $(x-1)^2(x-2)^3 = 0$ has TWO distinct roots but FIVE counting multiplicity; "how many roots" in census language means five, and the degree census $2 + 3 = 5$ is the check. Trap three — non-real roots occurring singly: impossible for real coefficients — a real cubic owning $2$ real roots must own a third real root, because the non-real seat comes only as a pair; state the domain, state the parity, and the trap dissolves.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The census is a standing JEE Main / state-board motif — root-count items ("the number of real roots of $x^3 + x + 1 = 0$" — the monotonicity read; "the number of roots of $(x-2)(x^2+9) = 0$ over the complex numbers" — the domain read), one-root-given items ("$2 + i$ is a root of the real quadratic; find the equation" — the conjugate-pair rebuild, Illustration 6’s shape), equation-forming items (roots $2, 3, -6$: multiply and match, the L3 set below), and the odd-degree guarantee ("show $x^5 + x + 1 = 0$ has a real root" — one sign change, corollary invoked). The discipline that separates the marks from the misses: name the DOMAIN before counting, and run the parity check before answering anything about real roots. The items in this lesson are exam-style designs of ours, labelled honestly — never lifted from any paper.' },
    { kind: 'para', text: 'The chapter can now climb. Lesson 8.2 sharpens the real-root census into Descartes’ rule of signs — counting sign changes to bound the positive roots, with the even-deficit honesty this lesson’s parity has already prepared. Lesson 8.3 generalises Viète to cubics and quartics; lesson 8.4 solves the cubic and quartic themselves (Cardan and Ferrari, with the casus irreducibilis honesty); lesson 8.5 transforms equations root by root; lesson 8.6 reads the reciprocal family. All of it stands on today’s census: $n$ roots over $\\mathbb{C}$, counted with multiplicity, real coefficients pairing the non-real seats — the polynomial’s deepest arithmetic, now a working tool.' },

    { kind: 'quiz', title: 'Check yourself: the root census', items: [
      { q: 'A degree-5 polynomial equation with real coefficients has', options: ['at most 5 real roots, always', 'exactly 5 real roots', 'exactly 5 roots over the complex numbers, counted with multiplicity', 'an even number of real roots'], answer: 2, explain: 'Option 2 is the fundamental theorem of algebra in its census form: five roots over $\\mathbb{C}$, multiplicity included — the guaranteed exact count. Option 0 is only a ceiling: "at most 5" is true but is a bound, not a census — it never says how many there ARE, and the exact total the question asks for lives over $\\mathbb{C}$. Option 1 is flatly wrong: $x^5 + x + 1 = 0$ owns exactly one real root, $x^5 + x$ being strictly increasing; the real count is parity-forced ($1, 3$ or $5$), never fixed at $5$. Option 3 inverts the parity: $r \\equiv 5 \\pmod 2$ makes the real count ODD whenever it is nonzero — "an even number of real roots" is impossible for a real quintic unless the count is $0$, which parity forbids.' },
      { q: 'The non-real roots of a polynomial with REAL coefficients occur', options: ['singly', 'in conjugate pairs', 'in triples', 'never'], answer: 1, explain: 'Option 1 is the conjugate-pair law, derived in this lesson from $P(\\bar{z}) = \\overline{P(z)}$: a non-real root’s mirror is a root too, so the non-real seats always fill in pairs $z, \\bar{z}$. Option 0 is impossible for real coefficients — $P(i) = 0$ forces $P(-i) = 0$ (the running witness $x^3 - x^2 + x - 1$ shows both); a single non-real root can only ride with COMPLEX coefficients, as the negative witness $x + i$ at $i$ shows. Option 2 contradicts conjugation being an involution — pairs, not triples: the mirror of the mirror is the original. Option 3 (‘never’) is refuted by any $D < 0$ quadratic: $x^2 + 1 = 0$ owns exactly the two non-real roots $\\pm i$.' },
      { q: 'The equation $x^3 - x^2 + x - 1 = 0$ has', options: ['one root', 'two roots', 'three roots: 1, i and −i', 'infinitely many roots'], answer: 2, explain: 'Option 2 is the census: $x^3 - x^2 + x - 1 = (x-1)(x^2+1) = (x-1)(x-i)(x+i)$ — degree 3, so exactly three roots over $\\mathbb{C}$, namely $1$, $i$ and $-i$: one real root and one conjugate pair. Option 0 counts only the REAL root — that is the solution set over $\\mathbb{R}$, not the full census over $\\mathbb{C}$ that a root-count question asks for. Option 1 has no honest reading: there are three distinct roots, all simple, so even the distinct count is not two — forgetting the conjugate pair is the usual source of this miss. Option 3 violates the degree ceiling: a nonzero degree-$n$ polynomial vanishes at no more than $n$ points over any domain, so infinitely many roots would force every coefficient to be $0$.' },
      { q: 'Every polynomial of ODD degree with real coefficients has', options: ['at least one real root', 'exactly one real root', 'no real root', 'all roots real'], answer: 0, explain: 'Option 0 is the odd-degree corollary: $r + 2p = n$ with $n$ odd forces the real count $r$ odd, hence at least $1$. Option 1 overstates it — $x^3 - 6x^2 + 11x - 6 = 0$ owns three real roots; monotonicity was an extra hypothesis of the $x^3 + x + 1$ witness, not a law. Option 2 is impossible by the parity equation — an odd degree cannot spend its whole budget on conjugate pairs. Option 3 fails on the very next cubic: $x^3 - x^2 + x - 1 = 0$ owns one real root and the pair $\\pm i$.' },
      { q: 'The polynomial $(x-1)^2(x-2)^3$ has degree', options: ['3', '4', '5', '6'], answer: 2, explain: 'Option 2 is the multiplicity census: the two factors carry degrees $2$ and $3$, and $2 + 3 = 5$ — the degree is the multiplicity sum, the root multiset being $\\{1, 1, 2, 2, 2\\}$. Option 0’s $3$ is the multiplicity of the root $2$ alone (the exponent on the second factor) — one factor’s exponent is not the degree. Option 1’s $4$ matches no census of this polynomial: the distinct-root count is $2$, the multiplicity count is $5$. Option 3’s $6$ multiplies the multiplicities ($2 \\times 3$) — the classic slip: multiplicities ADD to the degree, they never multiply.' },
    ] },
    { kind: 'exercises', title: 'Exercises 8.1', sets: [
      { level: 'L1', questions: [
        { q: 'State the number of roots of $(x-4)^2(x+5) = 0$ over the complex numbers, counted with multiplicity, and list the roots with their multiplicities.', solution: [
          'Read the factorisation: the degree is $2 + 1 = 3$, so the census over $\\mathbb{C}$ counts three roots.',
          'So, the root $4$ carries multiplicity $2$ (the factor $(x-4)$ appears twice) and the root $-5$ carries multiplicity $1$.',
          'Hence the census: three roots — $4$ counted twice, $-5$ once — the multiset $\\{4, 4, -5\\}$ with $2 + 1 = 3 = \\deg$.',
          'Check: both roots are real, so the real census and the complex census coincide here — $3$ real $+ 0$ non-real $= 3$ total.',
        ], answer: '3 roots with multiplicity: $x = 4$ (twice) and $x = -5$ (once) — the multiset {4, 4, −5}' },
        { q: 'Write down the solution set of $(x-2)(x^2+9) = 0$ over the complex numbers, and state the real / non-real census.', solution: [
          'Split the factors: $x - 2 = 0$ gives the real root $2$.',
          'So, the quadratic factor: $x^2 + 9 = 0$ gives $x^2 = -9$, that is $x = 3i$ and $x = -3i$ — a conjugate pair, necessarily: the coefficients are real.',
          'Hence the solution set over $\\mathbb{C}$ is $\\{2, 3i, -3i\\}$.',
          'Check the census: $1$ real $+ 2$ non-real $= 3 = \\deg$ — and over $\\mathbb{R}$ alone the solution set would be just $\\{2\\}$: two honest censuses, two different totals.',
        ], answer: '{2, 3i, −3i} — 1 real root and the conjugate pair ±3i, 3 total' },
      ] },
      { level: 'L2', questions: [
        { q: 'Solve $x^3 - x^2 + x - 1 = 0$ completely over the complex numbers, and state the real / non-real census.', solution: [
          'Split by grouping: $x^3 - x^2 + x - 1 = x^2(x-1) + (x-1) = (x-1)(x^2 + 1)$.',
          'So, the linear factor: $x = 1$ — the single real root.',
          'Now, the quadratic: $x^2 + 1 = 0$ gives $x = \\pm i$ — one conjugate pair.',
          'Hence the solution set is $\\{1, i, -i\\}$, and the census reads $1$ real $+ 2$ non-real $= 3 = \\deg$.',
          'Check both doors of the pair by substitution: $P(i) = i^3 - i^2 + i - 1 = -i + 1 + i - 1 = 0$ and $P(-i) = 0$ — engine-verified.',
        ], answer: '{1, i, −i} — one real root plus the conjugate pair ±i' },
        { q: 'How many real roots does $x^4 + 3x^2 + 2 = 0$ have? Solve the equation completely over $\\mathbb{C}$ and close the census.', solution: [
          'Factor the quadratic-in-disguise: $x^4 + 3x^2 + 2 = (x^2 + 1)(x^2 + 2)$.',
          'So, the real-root count is $0$ before any solving: for real $x$, each of $x^4, 3x^2, 2$ is non-negative, so the left side is at least $2$ and never vanishes.',
          'Now, the complex census: $x^2 = -1$ gives $\\pm i$, and $x^2 = -2$ gives $\\pm i\\sqrt{2}$ — two conjugate pairs, four non-real roots.',
          'Hence the equation owns $0$ real roots and the four non-real roots $\\{\\pm i, \\pm i\\sqrt{2}\\}$ — the census $0 + 4 = 4 = \\deg$, the even-degree case at its extreme.',
        ], answer: '0 real roots; over ℂ the four roots ±i and ±i√2 — 0 real + 4 non-real = 4' },
      ] },
      { level: 'L3', questions: [
        { q: 'Show that $x^3 + x + 1 = 0$ has exactly one real root (locate it to four decimals) and two non-real roots.', solution: [
          'Take the monotonicity first: if $a < b$ then $a^3 < b^3$ and $a < b$, so $a^3 + a < b^3 + b$ — the map $x \\mapsto x^3 + x$ is strictly increasing over $\\mathbb{R}$.',
          'So, the equation $x^3 + x + 1 = 0$ takes the value $0$ at most once: AT MOST one real root.',
          'Now, existence and location: $f(-1) = -1 < 0$ and $f(0) = 1 > 0$, so one real root lies in $(-1, 0)$ — the odd-degree corollary cashed as a sign change.',
          'Hence exactly one real root, and bisection pins it: the engine halves $(-1, 0)$ repeatedly and locates $x \\approx -0.6823$.',
          'So, the census closes by the fundamental theorem: $1$ real $+ 2$ non-real $= 3 = \\deg$ — the two non-real roots form one conjugate pair, the only option parity allows.',
        ], answer: 'exactly one real root ≈ −0.6823, plus one conjugate pair of non-real roots (1 + 2 = 3)', figures: [
          { caption: 'The single crossing: the strictly increasing curve $y = x^3 + x + 1$ meets the x-axis exactly once — the sign-change bracket $f(-1) = -1 < 0 < 1 = f(0)$ is marked in amber, and the crossing is pinned by bisection at $x \\approx -0.6823$ (orange).', svg: singleCrossing81Svg() },
        ] },
        { q: 'Form the cubic equation with roots $2$, $3$ and $-6$, and verify it at every prescribed root.', solution: [
          'Assemble the monic form: $(x - 2)(x - 3)(x + 6)$.',
          'Multiply the first pair: $(x-2)(x-3) = x^2 - 5x + 6$.',
          'Now, finish: $(x^2 - 5x + 6)(x + 6) = x^3 + x^2 - 24x + 36$.',
          'Check by evaluation: substituting $x = 2$, $x = 3$ and $x = -6$ each returns $0$ — the engine certificate.',
          'Hence the required equation is $x^3 + x^2 - 24x + 36 = 0$ — three real roots, $3 + 0 = 3 = \\deg$.',
        ], answer: 'x³ + x² − 24x + 36 = 0' },
        { q: 'Form a quartic equation with real coefficients and leading coefficient 1 that has the roots $2i$, $3$ and $-3$.', solution: [
          'Invoke the conjugate-pair law first: the coefficients are real and $2i$ is non-real, so $-2i$ is a root too — the roster is $\\{2i, -2i, 3, -3\\}$.',
          'So, the pair’s factor: $(x - 2i)(x + 2i) = x^2 + 4$.',
          'Now, the real pair: $(x - 3)(x + 3) = x^2 - 9$.',
          'Assemble the monic quartic: $(x^2 + 4)(x^2 - 9) = x^4 - 5x^2 - 36$.',
          'Check by evaluation: the engine substitutes $2i$, $-2i$, $3$ and $-3$ — each returns $0$, and every coefficient is real, as the pairing guaranteed.',
          'Hence the equation is $x^4 - 5x^2 - 36 = 0$ — census $2$ real $+ 2$ non-real $= 4 = \\deg$.',
        ], answer: 'x⁴ − 5x² − 36 = 0' },
      ] },
      { level: 'L4', questions: [
        { q: 'Solve $x^3 - 7x + 6 = 0$ by the factor-theorem root hunt, and state the census.', solution: [
          'List the candidates: integer coefficients, constant term $6$ — any integer root divides $6$, so try $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.',
          'Check: $f(1) = 1 - 7 + 6 = 0$ — split off $(x - 1)$, leaving $x^2 + x - 6$.',
          'So, the quadratic factors: $x^2 + x - 6 = (x+3)(x-2)$, and the complete factorisation is $(x-1)(x-2)(x+3)$.',
          'Now, sweep the remaining candidates: the engine finds exactly $\\{1, 2, -3\\}$ among the divisors of $6$ — nothing else vanishes.',
          'Hence the solution set is $\\{1, 2, -3\\}$ — $3$ real $+ 0$ non-real $= 3 = \\deg$, the sign-line hunt drawn below.',
        ], answer: '{1, 2, −3} — three real roots, the degree fully spent', figures: [
          { caption: 'The root hunt on a sign line: $x^3 - 7x + 6$ sampled at each integer from $-4$ to $3$ — the values $-30, 0, 12, 12, 6, 0, 0, 12$ flip sign exactly at $-3$, $1$ and $2$, the three roots of the degree-3 census.', svg: rootHunt81Svg() },
        ] },
        { q: 'Solve $x^3 - 5x^2 + 8x - 4 = 0$ completely, counting multiplicity.', solution: [
          'Hunt the integer candidates (divisors of $4$): $f(1) = 1 - 5 + 8 - 4 = 0$ — split off $(x-1)$, leaving $x^2 - 4x + 4$.',
          'So, the quadratic is a perfect square: $x^2 - 4x + 4 = (x-2)^2$ — the root $2$ carries multiplicity $2$.',
          'Now, verify the multiplicity the honest way: dividing $x^3 - 5x^2 + 8x - 4$ by $(x-2)$ twice is exact (the engine runs both synthetic divisions), confirming the double root.',
          'Hence the census: the solution set is $\\{1, 2, 2\\}$ — $1 + 2 = 3 = \\deg$; TWO distinct roots, THREE counting multiplicity.',
          'Check the parity: all three seats real, so the real census and the complex census coincide.',
        ], answer: '{1, 2, 2} — the root 2 is double; two distinct roots, three with multiplicity' },
        { q: 'Run the full census of $x^4 - 1 = 0$: how many real roots, how many non-real roots, how many in all?', solution: [
          'Factor the difference of squares twice: $x^4 - 1 = (x^2 - 1)(x^2 + 1) = (x-1)(x+1)(x^2+1)$.',
          'So, the real factors: $x^2 = 1$ gives $x = 1$ and $x = -1$ — two real roots.',
          'Now, the quadratic factor: $x^2 = -1$ gives $x = i$ and $x = -i$ — two non-real roots, one conjugate pair.',
          'Hence the census: $2$ real $+ 2$ non-real $= 4$ total $= \\deg$ — every seat of the degree budget accounted for, parity $2 \\equiv 4$ both even.',
          'Check the reading over each domain: over $\\mathbb{R}$ the solution set is $\\{1, -1\\}$; over $\\mathbb{C}$ it is $\\{1, -1, i, -i\\}$ — the two-column discipline on the cleanest quartic there is.',
        ], answer: '2 real roots (±1), 2 non-real (±i), 4 in total — 2 + 2 = 4 = degree' },
      ] },
      { level: 'L5', questions: [
        { q: 'Show that $x^5 + x + 1 = 0$ has a real root, and locate it to four decimals; then state the full census.', solution: [
          'Take the corollary first: degree $5$ is odd and the coefficients are real, so $r + 2p = 5$ with $r$ odd — at least one real root exists.',
          'Now, locate it by a sign change: $f(-1) = -1 < 0$ and $f(0) = 1 > 0$, so a real root lies in $(-1, 0)$.',
          'So, bisection pins it: the engine halves $(-1, 0)$ repeatedly and locates $x \\approx -0.7549$.',
          'And the count is exactly one: if $a < b$ then $a^5 < b^5$ and $a < b$, so $x^5 + x$ is strictly increasing — the value $-1$ is taken exactly once.',
          'Hence the census: $1$ real $+ 4$ non-real $= 5 = \\deg$ — the four non-real roots ride as two conjugate pairs, the only split parity allows.',
        ], answer: 'a real root exists by the odd-degree corollary (f(−1) = −1 < 0 < 1 = f(0)); located at x ≈ −0.7549; census 1 real + 4 non-real = 5' },
        { q: 'Prove the conjugate-pair law from $P(\\bar{z}) = \\overline{P(z)}$: if $P$ has real coefficients and $P(\\alpha) = 0$ for a complex $\\alpha$, then $P(\\bar{\\alpha}) = 0$. Verify the law on the witness $P(x) = x^3 - x^2 + x - 1$ at $\\alpha = i$.', solution: [
          'Take chapter 3’s algebra as the engine: conjugation respects sums and products ($\\overline{u+v} = \\bar u + \\bar v$, $\\overline{uv} = \\bar u\\,\\bar v$), and by induction $\\overline{z^k} = \\bar z^k$ for every $k \\geq 0$.',
          'So, for real coefficients $a_k$ (self-conjugate: $\\overline{a_k} = a_k$): $P(\\bar{z}) = \\sum a_k \\bar{z}^k = \\sum \\overline{a_k z^k} = \\overline{\\sum a_k z^k} = \\overline{P(z)}$ — the identity holds for EVERY $z$, roots and non-roots alike.',
          'Now, specialise to a root: $P(\\alpha) = 0$ gives $\\overline{P(\\alpha)} = \\overline{0} = 0$, and the identity turns the left side into $P(\\bar{\\alpha})$ — so $P(\\bar{\\alpha}) = 0$: the mirror of a root is a root.',
          'Check the witness: $P(i) = i^3 - i^2 + i - 1 = -i + 1 + i - 1 = 0$, so $i$ is a root; the law hands over $P(-i) = 0$ with no further arithmetic — and the engine verifies it directly: $P(-i) = (-i)^3 - (-i)^2 + (-i) - 1 = i + 1 - i - 1 = 0$.',
          'Hence the law: real coefficients force non-real roots to travel in pairs $\\alpha, \\bar{\\alpha}$ — and the necessity of the hypothesis is witnessed by $P(x) = x + i$, which owns the single non-real root $i$ all by itself.',
        ], answer: 'proved — P(ᾱ) = conj(P(α)) = 0, so the mirror of a root is a root; witness P(i) = 0 forces P(−i) = 0, both engine-checked' },
        { q: 'If $f(x) = x^4 + ax^3 + bx^2 + cx + d$ has real coefficients and $f(2i) = 0$, write down the guaranteed quadratic factor. Given also $f(3) = 0$ and $f(-3) = 0$, with leading coefficient 1, find $f$ completely.', solution: [
          'Invoke the law: the coefficients are real and $2i$ is non-real, so $-2i$ is a root too — the guaranteed factor is $(x - 2i)(x + 2i) = x^2 + 4$.',
          'So, the real roots: $f(3) = 0$ and $f(-3) = 0$ give the factor $(x-3)(x+3) = x^2 - 9$.',
          'Now, assemble: degree $4$, leading coefficient $1$, and four roots already prescribed — the roster $\\{2i, -2i, 3, -3\\}$ spends the whole budget, so $f(x) = (x^2+4)(x^2-9) = x^4 - 5x^2 - 36$.',
          'Check by evaluation: the engine substitutes $2i$, $-2i$, $3$ and $-3$ — each returns $0$; note $f(2i) = 16 + 20 - 36 = 0$ directly.',
          'Hence $f(x) = x^4 - 5x^2 - 36$ — census $2$ real $+ 2$ non-real $= 4 = \\deg$, every coefficient real as the pairing guaranteed.',
        ], answer: 'the guaranteed factor is x² + 4; f(x) = x⁴ − 5x² − 36' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove: a degree-$n$ polynomial with real coefficients that already owns $n - 2$ real roots (counted with multiplicity) has its remaining two roots either both real or a conjugate pair.', solution: [
          'Set up the census: $n$ roots in all (the fundamental theorem), $n - 2$ of them real — two seats remain.',
          'Suppose one of the two remaining roots $\\alpha$ is non-real: the conjugate-pair law forces $\\bar{\\alpha}$ to be a root as well.',
          'Now, $\\bar{\\alpha} \\neq \\alpha$ (non-real), and $\\bar{\\alpha}$ is non-real too — so it cannot sit among the $n - 2$ real roots; with only two seats free, the pair $\\{\\alpha, \\bar{\\alpha}\\}$ IS the remainder.',
          'Hence the dichotomy: either no remaining root is non-real — both are real — or one is, and the two remaining roots are exactly the conjugate pair $\\alpha, \\bar{\\alpha}$: a mixed finish (one real, one non-real) is impossible.',
          'Check both branches on witnesses: $(x-1)(x-2)(x-3)(x^2+1)$ — three real roots, the remainder the pair $\\pm i$; and $(x-1)(x-2)(x-3)(x-4)(x+5)$ — the remainder $\\{4, -5\\}$ both real. The impossible configuration is witnessed negatively: $(x-1)(x-2)(x-3)(x-i)(x+5)$ does not even have real coefficients — one non-real root cannot ride alone.',
        ], answer: 'proved — the remaining two are both real or exactly the conjugate pair α, ᾱ; a mixed finish is impossible' },
        { q: 'Prove: the depressed cubic $x^3 + px + q = 0$ has a repeated root if and only if $4p^3 + 27q^2 = 0$. Witness the condition on $x^3 - 3x + 2 = 0$ (double root $1$) and check the census $\\{1, 1, -2\\}$.', solution: [
          'Take the forward direction: a repeated root $r$ means $x^3 + px + q = (x - r)^2 (x - s)$ for the third root $s$.',
          'Now, compare coefficients: the $x^2$ term vanishes, so $s + 2r = 0$, that is $s = -2r$; then the $x$ term gives $p = 2rs + r^2 = -4r^2 + r^2 = -3r^2$, and the constant term gives $q = -r^2 s = 2r^3$.',
          'So, the condition computes itself: $4p^3 + 27q^2 = 4(-3r^2)^3 + 27(2r^3)^2 = -108r^6 + 108r^6 = 0$ — a repeated root forces the vanishing.',
          'Now, the converse: if $4p^3 + 27q^2 = 0$, then either $p = q = 0$ (so $x^3 = 0$: the triple root $0$, repeated) or $p < 0$; in the latter case $q^2 = -\\tfrac{4p^3}{27}$ gives $|q| = 2\\left(\\tfrac{-p}{3}\\right)^{3/2}$, so with $r$ chosen of the same sign as $q$ and $r^2 = \\tfrac{-p}{3}$, we get $p = -3r^2$ and $q = 2r^3$ — hence $x^3 + px + q = x^3 - 3r^2x + 2r^3 = (x - r)^2 (x + 2r)$: the root $r$ is repeated.',
          'Check the witness: $p = -3$, $q = 2$ — $4(-27) + 27(4) = 0$ ✓, and $x^3 - 3x + 2 = (x-1)^2(x+2)$, engine-multiplied; the census is $\\{1, 1, -2\\}$: $f(1) = 0$ (twice by multiplicity) and $f(-2) = -8 + 6 + 2 = 0$, with $2 + 1 = 3 = \\deg$.',
          'And the negative witnesses hold the line: $4(-7)^3 + 27(6)^2 = -400 \\neq 0$ (the roots of $x^3 - 7x + 6$ are distinct) and $4(1)^3 + 27(1)^2 = 31 \\neq 0$ (so is $x^3 + x + 1$ root-distinct) — the engine also sweeps the whole family: every $(p, q) = (-3r^2, 2r^3)$ satisfies the condition and factors as $(x-r)^2(x+2r)$.',
        ], answer: 'proved — repeated root ⇔ 4p³ + 27q² = 0; witness x³ − 3x + 2 = (x−1)²(x+2), the census {1, 1, −2}' },
      ] },
    ] },
    { kind: 'formula', name: 'The fundamental theorem of algebra (census form)', latex: '\\text{degree } n \\;\\Rightarrow\\; \\text{exactly } n \\text{ roots over } \\mathbb{C}, \\text{ counted with multiplicity}', note: 'stated, not proved — the platform’s discipline; every use engine-verified on witnesses.' },
    { kind: 'formula', name: 'The complete factorisation', latex: 'f(x) = a\\,(x - \\alpha_1)(x - \\alpha_2)\\cdots(x - \\alpha_n)', note: 'the census certificate: $n$ linear factors over $\\mathbb{C}$, repeats counted repeatedly — $x^3 - x^2 + x - 1 = (x-1)(x-i)(x+i)$.' },
    { kind: 'formula', name: 'The multiplicity census', latex: '\\deg f = m_1 + m_2 + \\cdots + m_k', note: 'the degree is the multiplicity sum: $(x-1)^2(x-2)^3$ owns the multiset $\\{1,1,2,2,2\\}$, $2 + 3 = 5$.' },
    { kind: 'formula', name: 'The conjugate-pair law', latex: '\\text{real coefficients}: \\quad P(\\bar{z}) = \\overline{P(z)} \\;\\Rightarrow\\; P(\\alpha) = 0 \\Rightarrow P(\\bar{\\alpha}) = 0', note: 'non-real roots ride in mirror pairs — a real polynomial never owns exactly one non-real root.' },
    { kind: 'formula', name: 'The pair factor', latex: '(x - z)(x - \\bar{z}) = x^2 - 2\\,\\mathrm{Re}(z)\\,x + |z|^2', note: 'a conjugate pair manufactures a real quadratic: the pair $2 \\pm i$ gives $x^2 - 4x + 5$; the root $2i$ gives $x^2 + 4$.' },
    { kind: 'formula', name: 'The parity law', latex: 'r + 2p = n \\;\\Rightarrow\\; r \\equiv n \\pmod 2', note: '$r$ = real roots with multiplicity, $p$ = conjugate pairs: the real count always carries the degree’s parity.' },
    { kind: 'formula', name: 'The odd-degree corollary', latex: 'n \\text{ odd} \\;\\Rightarrow\\; r \\geq 1', note: 'every real-coefficient odd-degree equation owns at least one real root — existence guaranteed; location by sign-change bisection ($-0.6823$ for $x^3+x+1$, $-0.7549$ for $x^5+x+1$).' },
    { kind: 'formula', name: 'The real-root bounds', latex: '0 \\leq r \\leq n, \\qquad r \\equiv n \\!\\pmod 2 \\quad (\\text{real coefficients})', note: 'over $\\mathbb{R}$ the count is at most $n$ (elementary) and parity-forced; over $\\mathbb{C}$ it is exactly $n$ (deep) — the two-column discipline.' },
    { kind: 'formula', name: 'The factor-theorem census', latex: 'f(\\alpha) = 0 \\iff (x - \\alpha) \\mid f(x)', note: 'each confirmed root splits off a linear factor and drops the degree: the root hunt tries the divisors of the constant term — $x^3 - 7x + 6$ resolves as $(x-1)(x-2)(x+3)$.' },
    { kind: 'formula', name: 'The repeated-root condition (depressed cubic)', latex: 'x^3 + px + q \\text{ has a repeated root} \\iff 4p^3 + 27q^2 = 0', note: 'the double root obeys $p = -3r^2$, $q = 2r^3$: witness $x^3 - 3x + 2 = (x-1)^2(x+2)$, roots $\\{1, 1, -2\\}$.' },
  ],
}


// ------------------------------------------------------------------
// lesson 8.2 — authored by the run-119 swarm (the 082 agent), integrated verbatim
// ------------------------------------------------------------------

function arrow82(x1: number, y1: number, x2: number, y2: number, color = '#d97706'): string {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  const h = 9
  const bx = x2 - h * Math.cos(ang), by = y2 - h * Math.sin(ang)
  const px = 4.5 * -Math.sin(ang), py = 4.5 * Math.cos(ang)
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.8"/>` +
    `<polygon points="${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}" fill="${color}"/>`
}

function figureASignStrip82(): string {
  // Figure A — the sign strip of x^3 - 7x + 6: coefficient chips, the
  // skipped zero, the two flips, the census box (engine-pinned: V = 2)
  const chips: { x: number; v: string; skip: boolean }[] = [
    { x: 140, v: '1', skip: false },
    { x: 260, v: '0', skip: true },
    { x: 380, v: '-7', skip: false },
    { x: 500, v: '6', skip: false },
  ]
  const seats = ['x³ seat', 'x² — skipped', 'x seat', 'constant']
  let s = ''
  chips.forEach((ch, i) => {
    s += `<rect x="${ch.x}" y="52" width="96" height="36" rx="6" fill="#fef3c7" stroke="${ch.skip ? '#5eead4' : '#16a34a'}" stroke-width="1.6"${ch.skip ? ' stroke-dasharray="4 3"' : ''}/>`
    s += `<text x="${ch.x + 48}" y="76" font-size="15" font-weight="700" text-anchor="middle" fill="#166534">${ch.v}</text>`
    s += `<text x="${ch.x + 48}" y="102" font-size="9.5" text-anchor="middle" fill="${ch.skip ? '#0d9488' : '#65a30d'}">${seats[i]}</text>`
  })
  const signChips: { x: number; v: string }[] = [
    { x: 156, v: '+' },
    { x: 396, v: '−' },
    { x: 516, v: '+' },
  ]
  signChips.forEach((sc) => {
    const neg = sc.v === '−'
    s += `<rect x="${sc.x}" y="124" width="64" height="30" rx="15" fill="${neg ? '#ffedd5' : '#fef3c7'}" stroke="${neg ? '#ea580c' : '#16a34a'}" stroke-width="1.6"/>`
    s += `<text x="${sc.x + 32}" y="144" font-size="15" font-weight="700" text-anchor="middle" fill="${neg ? '#ea580c' : '#166534'}">${sc.v}</text>`
  })
  s += arrow82(222, 139, 392, 139, '#ea580c')
  s += arrow82(462, 139, 512, 139, '#ea580c')
  return `<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The sign strip of x cubed minus 7x plus 6: four coefficient chips 1, 0, minus 7, 6 in descending powers, the zero of the x-squared seat skipped, the sign row plus, minus, plus with two flip arrows marked, and the census box: V equals 2, so the positive roots number 2 or 0. Only sign changes count, never the sizes of the coefficients.">
  <text x="350" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the sign strip: x³ - 7x + 6 read from its coefficient signs</text>
  ${s}
  <text x="307" y="128" font-size="11" font-weight="700" text-anchor="middle" fill="#ea580c">flip 1</text>
  <text x="487" y="128" font-size="11" font-weight="700" text-anchor="middle" fill="#ea580c">flip 2</text>
  <rect x="140" y="176" width="456" height="68" rx="8" fill="#ffedd5" stroke="#0d9488" stroke-width="1.6"/>
  <text x="368" y="200" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">V = 2 — two flips</text>
  <text x="368" y="222" font-size="11.5" text-anchor="middle" fill="#166534">positive roots: 2 or 0 (the deficit V - p is even)</text>
  <text x="350" y="288" font-size="11" text-anchor="middle" fill="#0d9488">the zero coefficient of x² is skipped: only sign CHANGES count — never the sizes</text>
</svg>`
}

function figureBMirror82(): string {
  // Figure B — the mirror: f(x) and f(-x) sign strips side by side
  // (engine-pinned: V(f) = 2, V(f(-x)) = 1, census (2, 1, 0))
  const strip = (yTop: number, vals: { v: string }[], flips: number[]): string => {
    let t = ''
    vals.forEach((sc, i) => {
      const x = 250 + i * 110
      const neg = sc.v === '−'
      t += `<rect x="${x}" y="${yTop}" width="64" height="30" rx="15" fill="${neg ? '#ffedd5' : '#fef3c7'}" stroke="${neg ? '#ea580c' : '#16a34a'}" stroke-width="1.6"/>`
      t += `<text x="${x + 32}" y="${yTop + 20}" font-size="15" font-weight="700" text-anchor="middle" fill="${neg ? '#ea580c' : '#166534'}">${sc.v}</text>`
    })
    const yMid = yTop + 15
    flips.forEach((i) => {
      t += arrow82(250 + i * 110 + 66, yMid, 250 + (i + 1) * 110 - 2, yMid, '#ea580c')
      t += `<text x="${250 + i * 110 + 87}" y="${yTop - 6}" font-size="10" font-weight="700" text-anchor="middle" fill="#ea580c">flip</text>`
    })
    return t
  }
  const row1 = strip(72, [{ v: '+' }, { v: '−' }, { v: '+' }], [0, 1])
  const row2 = strip(210, [{ v: '−' }, { v: '+' }, { v: '+' }], [0])
  return `<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The mirror read on x cubed minus 7x plus 6: the strip of f of x with signs plus, minus, plus and two flips, V equals 2, and under the mirror rule the strip of f of minus x, which is minus x cubed plus 7x plus 6, with signs minus, plus, plus and one flip, V equals 1. The mirror prices the negative roots at exactly one; the actual roots 1, 2 and minus 3 confirm the census of 2 positive, 1 negative, 0 non-real.">
  <text x="350" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the mirror read: f(x) and f(-x) side by side at x³ - 7x + 6</text>
  <text x="24" y="58" font-size="12.5" font-weight="700" fill="#166534">f(x) = x³ - 7x + 6</text>
  ${row1}
  <text x="350" y="124" font-size="11.5" text-anchor="middle" fill="#166534">V(f) = 2 — the positive roots number 2 or 0</text>
  <line x1="40" y1="142" x2="660" y2="142" stroke="#fcd34d" stroke-width="1.6" stroke-dasharray="7 5"/>
  <text x="350" y="160" font-size="11" text-anchor="middle" fill="#0d9488">the mirror step: replace x by -x (never negate the polynomial)</text>
  <text x="24" y="196" font-size="12.5" font-weight="700" fill="#166534">f(-x) = -x³ + 7x + 6</text>
  ${row2}
  <text x="350" y="262" font-size="11.5" text-anchor="middle" fill="#166534">V(f(-x)) = 1 — the negative roots number exactly 1</text>
  <rect x="130" y="286" width="440" height="52" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>
  <text x="350" y="308" font-size="12" font-weight="700" text-anchor="middle" fill="#166534">the actual roots: 1, 2, -3</text>
  <text x="350" y="330" font-size="11" text-anchor="middle" fill="#166534">census (2 positive, 1 negative, 0 non-real) — deficits 0 and 0</text>
</svg>`
}

function figureCCensusMap82(): string {
  // Figure C — the census decision diagram: three reads -> the census
  // table -> the worked row (x^3 - 7x + 6: (2,1,0) / (0,1,2))
  const box = (x: number, lines: { t: string; bold?: boolean; color?: string }[]): string => {
    let t = `<rect x="${x}" y="44" width="210" height="66" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>`
    lines.forEach((l, i) => {
      t += `<text x="${x + 105}" y="${66 + i * 17}" font-size="${l.bold ? 11 : 10.5}" font-weight="${l.bold ? '700' : '400'}" text-anchor="middle" fill="${l.color ?? '#166534'}">${l.t}</text>`
    })
    return t
  }
  return `<svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The census craft as a decision diagram: three input boxes — read one, lesson 8.1, degree n gives n roots in total with the non-real in conjugate pairs; read two, V of f, the positive roots are one of V, V minus 2, V minus 4 and so on; read three, V of f of minus x, the negative roots from its own stepped list. Arrows run into the census table box: every row p, q, c with p from read two, q from read three, and p plus q plus 2c equals n — parity polices every row. The worked row is x cubed minus 7x plus 6: the possible censuses (2, 1, 0) and (0, 1, 2), and the actual roots 1, 2, minus 3 pick (2, 1, 0). The rule prices the census without solving: it never counts exactly, and it never locates.">
  <text x="350" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the census craft: three reads, one table</text>
  ${box(20, [{ t: 'read 1 (lesson 8.1):', bold: true }, { t: 'degree n: n roots in total,', color: '#65a30d' }, { t: 'non-real in conjugate pairs', color: '#65a30d' }])}
  ${box(250, [{ t: 'read 2: V(f)', bold: true }, { t: 'positive roots: one of', color: '#65a30d' }, { t: 'V, V-2, V-4, ...', color: '#65a30d' }])}
  ${box(480, [{ t: 'read 3: V(f(-x))', bold: true }, { t: 'negative roots: one of', color: '#65a30d' }, { t: 'its own stepped list', color: '#65a30d' }])}
  ${arrow82(125, 110, 268, 136)}
  ${arrow82(355, 110, 350, 136)}
  ${arrow82(585, 110, 432, 136)}
  <rect x="130" y="140" width="440" height="86" rx="8" fill="#ffedd5" stroke="#0d9488" stroke-width="1.6"/>
  <text x="350" y="162" font-size="12.5" font-weight="700" text-anchor="middle" fill="#166534">THE CENSUS TABLE</text>
  <text x="350" y="182" font-size="10.5" text-anchor="middle" fill="#166534">every row (p, q, c) with p from read 2,</text>
  <text x="350" y="198" font-size="10.5" text-anchor="middle" fill="#166534">q from read 3, and p + q + 2c = n —</text>
  <text x="350" y="214" font-size="10.5" text-anchor="middle" fill="#166534">parity polices every row</text>
  ${arrow82(350, 228, 350, 250)}
  <rect x="130" y="252" width="440" height="92" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>
  <text x="350" y="274" font-size="12" font-weight="700" text-anchor="middle" fill="#166534">worked row: x³ - 7x + 6</text>
  <text x="350" y="294" font-size="10.5" text-anchor="middle" fill="#166534">V(f) = 2 and V(f(-x)) = 1</text>
  <text x="350" y="312" font-size="10.5" text-anchor="middle" fill="#166534">possible censuses: (2, 1, 0) and (0, 1, 2)</text>
  <text x="350" y="332" font-size="11" font-weight="700" text-anchor="middle" fill="#ea580c">the actual roots 1, 2, -3 pick (2, 1, 0)</text>
  <text x="350" y="420" font-size="10.5" text-anchor="middle" fill="#0d9488">the rule prices the census without solving: it never counts exactly, and it never locates</text>
</svg>`
}

function solfigStripL2_1_82(): string {
  // Solution figure (v9.0) on L2-1 — the sign strip + census ladder of
  // x^3 - 7x + 6 (engine-pinned: V = 2, q = 1, censuses (2,1,0)/(0,1,2))
  const chips = [
    { x: 90, v: '1', skip: false },
    { x: 190, v: '0', skip: true },
    { x: 290, v: '-7', skip: false },
    { x: 390, v: '6', skip: false },
  ]
  const seats = ['x³', 'x² - skipped', 'x', 'const']
  let s = ''
  chips.forEach((ch, i) => {
    s += `<rect x="${ch.x}" y="44" width="84" height="32" rx="5" fill="#fef3c7" stroke="${ch.skip ? '#5eead4' : '#16a34a'}" stroke-width="1.5"${ch.skip ? ' stroke-dasharray="4 3"' : ''}/>`
    s += `<text x="${ch.x + 42}" y="64" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">${ch.v}</text>`
    s += `<text x="${ch.x + 42}" y="90" font-size="9" text-anchor="middle" fill="${ch.skip ? '#0d9488' : '#65a30d'}">${seats[i]}</text>`
  })
  const signs = [
    { x: 106, v: '+' },
    { x: 306, v: '−' },
    { x: 406, v: '+' },
  ]
  signs.forEach((sc) => {
    const neg = sc.v === '−'
    s += `<rect x="${sc.x}" y="104" width="52" height="26" rx="13" fill="${neg ? '#ffedd5' : '#fef3c7'}" stroke="${neg ? '#ea580c' : '#16a34a'}" stroke-width="1.5"/>`
    s += `<text x="${sc.x + 26}" y="122" font-size="13" font-weight="700" text-anchor="middle" fill="${neg ? '#ea580c' : '#166534'}">${sc.v}</text>`
  })
  s += arrow82(160, 117, 302, 117, '#ea580c')
  s += arrow82(360, 117, 402, 117, '#ea580c')
  return `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The sign strip and census ladder of x cubed minus 7x plus 6: coefficient chips 1, 0, minus 7, 6 with the zero skipped; the sign row plus, minus, plus with two flips, V equals 2; the census ladder below — the positive roots number 2 or 0, forking into the censuses (2, 1, 0), the actual roots 1, 2, minus 3, and (0, 1, 2), ruled out because f of 1 equals 0. The factorisation (x minus 1)(x minus 2)(x plus 3) picks p equals 2.">
  <text x="320" y="22" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">the sign strip and census ladder of x³ - 7x + 6</text>
  ${s}
  <text x="231" y="106" font-size="10" font-weight="700" text-anchor="middle" fill="#ea580c">flip 1</text>
  <text x="381" y="106" font-size="10" font-weight="700" text-anchor="middle" fill="#ea580c">flip 2</text>
  <text x="560" y="121" font-size="14" font-weight="700" text-anchor="middle" fill="#ea580c">V = 2</text>
  <text x="320" y="164" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">V = 2: the positive roots number 2 or 0</text>
  ${arrow82(320, 170, 320, 186, '#d97706')}
  <rect x="90" y="190" width="460" height="30" rx="6" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>
  <text x="320" y="209" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">census (2, 1, 0) — the actual roots 1, 2, -3</text>
  <rect x="90" y="228" width="460" height="30" rx="6" fill="#ffedd5" stroke="#5eead4" stroke-width="1.4" stroke-dasharray="5 4"/>
  <text x="320" y="247" font-size="11" text-anchor="middle" fill="#166534">census (0, 1, 2) — ruled out: f(1) = 0</text>
  <text x="320" y="278" font-size="10.5" text-anchor="middle" fill="#0d9488">the census ladder: V = 2 allows p = 2 or p = 0; the factorisation (x-1)(x-2)(x+3) picks p = 2</text>
</svg>`
}

function solfigMultL4_1_82(): string {
  // Solution figure (v9.0) on L4-1 — the multiplicity ladder of
  // x^3 - 3x + 2 (engine-pinned: V = 2, double root 1, census (2,1,0))
  const chips = [
    { x: 90, v: '1', skip: false },
    { x: 190, v: '0', skip: true },
    { x: 290, v: '-3', skip: false },
    { x: 390, v: '2', skip: false },
  ]
  const seats = ['x³', 'x² - skipped', 'x', 'const']
  let s = ''
  chips.forEach((ch, i) => {
    s += `<rect x="${ch.x}" y="44" width="84" height="32" rx="5" fill="#fef3c7" stroke="${ch.skip ? '#5eead4' : '#16a34a'}" stroke-width="1.5"${ch.skip ? ' stroke-dasharray="4 3"' : ''}/>`
    s += `<text x="${ch.x + 42}" y="64" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">${ch.v}</text>`
    s += `<text x="${ch.x + 42}" y="90" font-size="9" text-anchor="middle" fill="${ch.skip ? '#0d9488' : '#65a30d'}">${seats[i]}</text>`
  })
  const signs = [
    { x: 106, v: '+' },
    { x: 306, v: '−' },
    { x: 406, v: '+' },
  ]
  signs.forEach((sc) => {
    const neg = sc.v === '−'
    s += `<rect x="${sc.x}" y="104" width="52" height="26" rx="13" fill="${neg ? '#ffedd5' : '#fef3c7'}" stroke="${neg ? '#ea580c' : '#16a34a'}" stroke-width="1.5"/>`
    s += `<text x="${sc.x + 26}" y="122" font-size="13" font-weight="700" text-anchor="middle" fill="${neg ? '#ea580c' : '#166534'}">${sc.v}</text>`
  })
  s += arrow82(160, 117, 302, 117, '#ea580c')
  s += arrow82(360, 117, 402, 117, '#ea580c')
  return `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The multiplicity ladder of x cubed minus 3x plus 2: coefficient chips 1, 0, minus 3, 2 with the zero skipped; the sign row plus, minus, plus with two flips, V equals 2, so the positive roots number 2 or 0. The factorisation (x minus 1) squared times (x plus 2) makes the root 1 a DOUBLE root that fills two positive seats: census (2, 1, 0), deficits 0 and 0. The trap box: counting DISTINCT roots gives p equals 1, a false odd deficit — the rule counts root seats with multiplicity.">
  <text x="320" y="22" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">the multiplicity ladder of x³ - 3x + 2</text>
  ${s}
  <text x="231" y="106" font-size="10" font-weight="700" text-anchor="middle" fill="#ea580c">flip 1</text>
  <text x="381" y="106" font-size="10" font-weight="700" text-anchor="middle" fill="#ea580c">flip 2</text>
  <text x="560" y="121" font-size="14" font-weight="700" text-anchor="middle" fill="#ea580c">V = 2</text>
  <text x="320" y="158" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">factorised: (x - 1)²(x + 2) — the root 1 is DOUBLE</text>
  <rect x="90" y="174" width="460" height="44" rx="6" fill="#ffedd5" stroke="#0d9488" stroke-width="1.6"/>
  <text x="320" y="192" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">census (2, 1, 0) — deficits 0 and 0</text>
  <text x="320" y="210" font-size="10.5" text-anchor="middle" fill="#166534">the double root 1 fills two positive seats</text>
  <rect x="90" y="228" width="460" height="30" rx="6" fill="#fef3c7" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="5 4"/>
  <text x="320" y="247" font-size="10.5" text-anchor="middle" fill="#dc2626">the trap: counting DISTINCT roots gives p = 1 — a false odd deficit</text>
  <text x="320" y="280" font-size="10.5" text-anchor="middle" fill="#0d9488">the rule counts multiplicity: census rows count root SEATS, not distinct roots</text>
</svg>`
}

const lesson82: Lesson = {
  id: 'aa-descartes-rule-of-signs',
  number: '8.2',
  title: 'Descartes’ Rule of Signs',
  concepts: [
    'sign variations of a polynomial',
    'Descartes’ rule of signs: the positive-root bound',
    'the even deficit',
    'negative roots via f(−x)',
    'root-type censuses combining rule + conjugate parity',
    'the quadratic case proved completely',
    'censuses when the actual roots are known',
    'the rule as a bound, never a count',
  ],
  objectives: [
    'State Descartes’ rule of signs precisely — the number of positive real roots (multiplicity counted) never exceeds the sign variations V(f) and differs from it by an even number — and run it on polynomials written in descending powers, zero coefficients skipped.',
    'Convert the negative-root question into a positive-root question by the mirror substitution x → −x: read V(f(−x)) and its own stepped census, never confusing the mirror with the negation −f(x).',
    'Combine the rule with lesson 8.1’s conjugate-pair parity and degree count to pin the complete possible root-type censuses (p, q, c) of a real polynomial — the census table craft.',
    'Prove the quadratic case of the rule completely — the three-case table V = 0, 1, 2, with the discriminant deciding the V = 2 fork.',
    'Construct polynomials with designed root-type censuses from chosen root multisets, and verify the rule on the products — the engineering direction of the census craft.',
    'State exactly what the rule promises (a bound plus a parity) and what it never does (count exactly, or locate a single root) — including where the missing possibilities go when the roots are known.',
  ],
  prerequisites: ['aa-how-many-roots-degree-n-n-roots', 'aa-quadratic-inequalities-and-the-sign-diagram'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Lesson 8.1 asked the counting question and answered it with the fundamental theorem: a degree-$n$ equation has exactly $n$ roots over the complex numbers, multiplicity counted, and for real coefficients the non-real seats come in conjugate pairs. That is a census of HOW MANY. This lesson asks the question one level down, and it is the question every solver asks before doing any work: before solving anything, WHAT KIND of roots must this equation have — how many positive, how many negative, how many non-real? The theory of equations has a spectacular partial answer, and it costs almost nothing to compute: write the polynomial in descending powers, read the signs of its coefficients, and count the changes.' },
    { kind: 'para', text: 'The lens is René Descartes’, and it is genuinely a 17th-century instrument. The rule appeared in La Géométrie, the 1637 geometry appendix to the Discours de la méthode, as part of the equation-solving craft of its third book. The idea still lands like a trick the first time: $x^3 - 7x + 6$ has coefficient signs $+, -, +$ — two changes — and from those two flips alone, without solving, without graphing, without one arithmetic operation beyond reading signs, we learn that its positive roots number two or zero, exactly. Lesson 8.1’s counting theorem says there are three roots in total; the sign strip already prices what KIND they can be. A census before the solve — that is the whole idea.' },
    { kind: 'para', text: 'The honesty comes first, because this rule is the most mis-quoted theorem in elementary algebra. It promises a bound and a parity — nothing else. The number of positive roots never exceeds the variation count, and it falls short of it by an EVEN number; it does not say which of the allowed counts actually holds, and it says nothing at all about where the roots sit on the line. This lesson runs the rule at full speed anyway, because a bound plus a parity, crossed with lesson 8.1’s degree census, pins the possible root-type censuses of a polynomial tighter than most students expect. The route: the sign variations and the rule; the mirror read for negative roots; the census craft with the conjugate parity; the quadratic case proved completely; and finally the parity chain — why the deficit is even.' },

    { kind: 'heading', text: 'Sign Variations and the Rule' },
    { kind: 'para', text: 'The input of the rule is a single integer read off the polynomial’s face. Write $f(x)$ in descending powers of $x$ — the discipline matters, because a polynomial shuffled into any other order hides its signs — and read the signs of the coefficients from the leading term down to the constant. Zero coefficients are skipped: a zero owns no sign, and the census counts CHANGES between consecutive nonzero coefficients only. The count of those changes is the sign variations $V(f)$.' },
    { kind: 'callout', tone: 'definition', title: 'Sign variations', text: 'The sign variations $V(f)$ of a real polynomial $f(x)$, written in descending powers of $x$, is the number of sign changes between consecutive NONZERO coefficients of $f$. Thus, a zero coefficient is skipped — it owns no sign. Only changes count, never the sizes of the coefficients: $V(f)$ is a property of the sign pattern alone, and two polynomials sharing a sign pattern share a variation count whatever their magnitudes.' },
    { kind: 'terms', items: [
      { term: 'sign variations', def: 'the count $V(f)$ of sign changes between consecutive nonzero coefficients of $f(x)$ written in descending powers — zero coefficients skipped; the single input of Descartes’ rule.' },
      { term: 'the deficit', def: 'the even gap $V(f) - p$ between the variation count and the number $p$ of positive roots (multiplicity counted); the rule forces it non-negative and even, and promises nothing more about it.' },
      { term: 'the mirror read', def: 'counting the negative roots of $f(x) = 0$ as the positive roots of $f(-x)$: the substitution $x \\to -x$ reflects the root set through $0$ — never the negation $-f(x)$.' },
      { term: 'root-type census', def: 'the triple (positive, negative, non-real) of root counts of a real polynomial; the non-real seats come in conjugate pairs (lesson 8.1), and $p + q + 2c = n$ closes the degree.' },
    ] },
    { kind: 'para', text: 'For example, four sign reads:' },
    { kind: 'list', marker: 'roman', items: [
      '$x^3 - 6x^2 + 11x - 6$: the signs read $+, -, +, -$, so $V(f) = 3$ — the cubic maximum, all four seats occupied and strictly alternating;',
      '$x^3 - 7x + 6$: the coefficients $1, 0, -7, 6$ carry signs $+, -, +$ once the zero of the $x^2$ seat is skipped, so $V(f) = 2$;',
      '$x^4 + x^3 + x^2 + x + 1$: all signs $+$, so $V(f) = 0$ — no positive roots possible at all;',
      'and its mirror $f(-x) = x^4 - x^3 + x^2 - x + 1$: the signs read $+, -, +, -, +$, so $V(f(-x)) = 4$ — four, two or zero negative roots.',
    ] },
    { kind: 'para', text: 'Two observations before the theorem. First, the maximum possible value of $V(f)$ for a degree-$n$ polynomial is $n$: at most $n + 1$ nonzero coefficients means at most $n$ gaps between them, so a cubic never shows more than 3 variations and a quartic never more than 4. Second, the read is order-dependent — the descending order IS the rule’s address; the polynomial $x + 1 + x^2$ is not "two variations" because it is not written in the order the rule reads. The theorem itself:' },
    { kind: 'callout', tone: 'theorem', title: 'Descartes’ rule of signs (1637)', text: 'The number of POSITIVE real roots of $f(x) = 0$ — counted with multiplicity — never exceeds the number $V(f)$ of sign variations of $f(x)$ written in descending powers, and differs from it by an even number. Thus $p \\leq V(f)$ and $V(f) - p$ is even. Replacing $x$ by $-x$: the number of NEGATIVE real roots never exceeds $V(f(-x))$ and differs from it by an even number. The rule is a bound plus a parity — it never counts exactly and it never locates.' },
    { kind: 'equation', latex: 'p \\leq V(f), \\qquad V(f) - p \\ \\text{even} \\tag{1}', note: '$p$ = the number of positive real roots, counted with multiplicity; $V(f)$ = the sign variations. The rule promises a bound plus a parity — never an exact count.' },
    { kind: 'callout', tone: 'insight', title: 'What the rule promises — and what it never does', text: 'Promised: a bound ($p \\leq V(f)$) and a parity ($V(f) - p$ even) — together they form the stepped census below. Never promised: an exact count — except when the parity squeezes the list to one row, as at $V = 1$ — and never a location. And the deficit is slack, not a census of anything: in $x^3 - x^2 + x - 1$ the deficit $2$ happens to BE the conjugate pair $\\pm i$; but $x^4 - 1$ has deficit $0$ while carrying two non-real roots. The non-real count comes from the degree census of lesson 8.1, never from the deficit — and the fact that the deficit is even is what keeps the two straight.' },
    { kind: 'para', text: 'Read the census the rule actually delivers. If $V(f) = 3$, the positive roots number $p$ with $p \\leq 3$ and $3 - p$ even — so $p \\in \\{3, 1\\}$: three, or one, and NOTHING in between. The gap between the bound and the truth is the deficit, and the even-deficit law turns the bound into a stepped list:' },
    { kind: 'equation', latex: 'p \\in \\{V,\\ V-2,\\ V-4,\\ \\ldots\\} \\ \\text{down to 1 or 0} \\tag{2}', note: 'walk down from $V$ in steps of two — the census set. A cubic with $V(f) = 2$ carries $p \\in \\{2, 0\\}$; one with $V(f) = 3$ carries $p \\in \\{3, 1\\}$.' },
    { kind: 'formula', name: 'Descartes’ rule of signs', latex: 'p \\leq V(f), \\qquad V(f) - p \\ \\text{even}', note: '$p$ = positive real roots counted with multiplicity; $V(f)$ = sign variations in descending powers, zeros skipped. A bound plus a parity — never a count, never a location.' },
    { kind: 'formula', name: 'The stepped census (the deficit law)', latex: 'p \\in \\{V,\\ V-2,\\ V-4,\\ \\ldots\\}', note: 'walk down from $V$ in steps of two, stopping at 1 or 0 — the even-deficit law read as a list.' },
    { kind: 'callout', tone: 'historical', title: 'Descartes, 1637', text: 'René Descartes printed the rule in La Géométrie, the geometry appendix to his Discours de la méthode of 1637 — Book III, among the equation-solving tools of the closing pages. The lens is pure Descartes: read the coefficients’ signs, and the census of the roots prices itself before any root is computed. The attribution is the tradition’s — the original statement carried the bound, and the even-deficit refinement settled into its modern form with the later algebraists who sharpened the sign craft. This book’s standing honesty applies: the arithmetic belongs to the whole tradition, and what the sections below prove is the theorem itself, whoever first wrote it down.' },
    { kind: 'para', text: 'One discipline before the examples: the rule counts positive roots WITH multiplicity — the census reads root seats, not distinct roots. A double positive root fills two seats of the census, a triple fills three. This is not pedantry: it is the difference between the rule holding and appearing to fail, and Illustration 3 stages exactly that trap. The examples themselves run the full craft — count, census, mirror, confirm.' },
    { kind: 'example', title: 'Count the sign variations of $x^3 - 6x^2 + 11x - 6$, read its Descartes census, and confirm it against the factorisation $(x-1)(x-2)(x-3)$.', steps: [
      'Write the coefficients in descending powers: $1, -6, 11, -6$ — all seats occupied, no zeros to skip.',
      'So, the signs read $+, -, +, -$: the walk changes at every one of the three gaps.',
      'Hence $V(f) = 3$ — the cubic maximum — and the census reads $p \\in \\{3, 1\\}$: three or one positive roots, nothing in between.',
      'Now, the mirror: $f(-x) = -x^3 - 6x^2 - 11x - 6$, signs $-, -, -, -$, so $V(f(-x)) = 0$ — no negative roots at all.',
      'Check against the factorisation: the roots are $1, 2, 3$ — three positive, none negative, none non-real: $p = 3$, deficit $0$, and the census row $(3, 0, 0)$ is the first of the two rows the rule allowed.',
    ] },
    { kind: 'example', title: 'The deficit, live: run the census of $x^3 - x^2 + x - 1$ and account for every missing possibility.', steps: [
      'The coefficients $1, -1, 1, -1$ read $+, -, +, -$: $V(f) = 3$, so $p \\in \\{3, 1\\}$.',
      'Now, the mirror: $f(-x) = -x^3 - x^2 - x - 1$, all signs $-$, so $V(f(-x)) = 0$ — no negative roots.',
      'So, the census fork: $(3, 0, 0)$ or $(1, 0, 2)$ — the degree census $p + q + 2c = 3$ leaves exactly these two rows.',
      'Check: $f(1) = 1 - 1 + 1 - 1 = 0$, so $(x - 1)$ divides; dividing, $f(x) = (x-1)(x^2 + 1)$, and $x^2 + 1$ owns no real root.',
      'Hence the roots are $1, i, -i$: $p = 1$, deficit $3 - 1 = 2$ — and the missing possibilities are exactly the conjugate pair $\\pm i$. In THIS witness the deficit IS the non-real pair; the insight box above warns that the coincidence is not a law ($x^4 - 1$ has deficit 0 with two non-real roots).',
    ] },
    { kind: 'figure', caption: 'The sign strip of x³ − 7x + 6: the coefficient chips 1, 0, −7, 6 in descending powers, the zero of the x² seat skipped, the two flips arrowed (V = 2), and the census box — the positive roots number 2 or 0. Nothing about the sizes of the coefficients entered the count: the strip is the polynomial’s face.', svg: figureASignStrip82() },
    { kind: 'para', text: 'The figure is the whole method in one drawing. The strip is the polynomial’s face: coefficient chips in descending order, the zero chip marked skipped, the two flips arrowed. The census box is the rule’s entire promise for this strip: two flips allow two positive roots or none. What the figure cannot tell you — what NO sign read can — is which row holds: that takes the factorisation $(x-1)(x-2)(x+3)$, a graph, or a sign change located on an interval. The rule prices the census without solving; the solving, when it comes, picks the row.' },
    { kind: 'example', title: 'Multiplicity discipline: run the census of $x^3 - 3x + 2 = (x-1)^2(x+2)$ and expose the distinct-root trap.', steps: [
      'The coefficients $1, 0, -3, 2$ skip the zero $x^2$ seat: signs $+, -, +$, so $V(f) = 2$ and $p \\in \\{2, 0\\}$.',
      'Now, the mirror: $f(-x) = -x^3 + 3x + 2$, signs $-, +, +$: $V(f(-x)) = 1$ — exactly one negative root, forced.',
      'So, the census fork narrows: with $q = 1$ forced, the rows are $(2, 1, 0)$ or $(0, 1, 2)$.',
      'Check: $f(1) = 1 - 3 + 2 = 0$, and dividing, $f(x) = (x-1)^2(x+2)$ — the root multiset $1, 1, -2$.',
      'Hence $p = 2$: the DOUBLE root 1 fills two seats — census $(2, 1, 0)$, deficits $0$ and $0$. Count the distinct roots instead ($p = 1$) and the "deficit" $2 - 1 = 1$ looks odd — the classic trap: the rule counts multiplicity, always.',
    ] },

    { kind: 'heading', text: 'Negative Roots — the Mirror Read' },
    { kind: 'para', text: 'The rule as stated prices POSITIVE roots. The negative roots of $f$ are the positive roots of a related polynomial, and the relation is the mirror. If $r$ is a root of $f$, then $-r$ is a root of $f(-x)$: substitute and watch $f(-(-r)) = f(r) = 0$. The root set of $f(-x)$ is exactly the negative of the root set of $f$ — multiplicities and all — so the negative roots of $f$ (the seats $r < 0$) are precisely the positive roots of $f(-x)$, and the rule applies verbatim to the mirror polynomial.' },
    { kind: 'equation', latex: 'f(x) = \\sum_{j=0}^{n} a_j x^j \\quad \\Rightarrow \\quad f(-x) = \\sum_{j=0}^{n} (-1)^{j} a_j x^j \\tag{3}', note: 'the mirror substitution, done term by term: every ODD power of $x$ flips the sign of its coefficient, every EVEN power keeps it — the root set reflects through $0$.' },
    { kind: 'formula', name: 'The negative mirror', latex: 'q \\leq V(f(-x)), \\qquad V(f(-x)) - q \\ \\text{even}', note: 'negative roots of $f$ = positive roots of $f(-x)$: substitute $x \\to -x$ — never negate the polynomial.' },
    { kind: 'para', text: 'The mirror substitution is honest algebra, term by term — but it is also THE trap of the whole lesson: negating the POLYNOMIAL instead of the variable. $-f(x)$ has every coefficient sign flipped and exactly the same roots as $f$ ($-f(x) = 0$ precisely where $f(x) = 0$), so its variation count is a brand-new number about the SAME equation — informative about nothing. The mirror read needs $f(-x)$, never $-f(x)$; the warn box below stages all four traps together.' },
    { kind: 'example', title: 'The mirror read: count the negative roots of $x^3 - 7x + 6$ without solving, then confirm against the factorisation.', steps: [
      'The positive read: coefficients $1, 0, -7, 6$ skip the zero; signs $+, -, +$, so $V(f) = 2$ and $p \\in \\{2, 0\\}$.',
      'Now, the mirror substitution $x \\to -x$: $f(-x) = (-x)^3 - 7(-x) + 6 = -x^3 + 7x + 6$ — signs $-, +, +$.',
      'So, $V(f(-x)) = 1$, and the parity squeezes the list: the negative roots number exactly one ($q = 1$, deficit $0$ — the stepped list from 1 is just $\\{1\\}$).',
      'Hence the census fork: $(2, 1, 0)$ or $(0, 1, 2)$ — the mirror has already forced the negative seat.',
      'Check: $f(1) = 0$ and $f(2) = 0$; dividing, $f(x) = (x-1)(x-2)(x+3)$ — roots $1, 2, -3$: the row $(2, 1, 0)$, with the negative root $-3$ exactly where the mirror read put it.',
    ] },
    { kind: 'figure', caption: 'The mirror read on x³ − 7x + 6: above, the strip of f(x) with signs +, −, + (V = 2, two flips); under the mirror rule, the strip of f(−x) = −x³ + 7x + 6 with signs −, +, + (V = 1, one flip). The mirror prices the negative roots at exactly one; the actual roots 1, 2, −3 confirm the census (2, 1, 0).', svg: figureBMirror82() },
    { kind: 'para', text: 'The figure shows why the mirror is cheap: forming $f(-x)$ is one pass over the coefficients, and the negative census is then the SAME rule on the new strip. Note the structural side-effect visible in the two rows: the flips do not correspond one-to-one between the strips — the polynomial and its mirror are different sign patterns, and their variation counts are two independent integers (the parity of their SUM is pinned by the mirror-sum law of the next section). The mirror is at its most powerful on the odd-degree witnesses, where lesson 8.1’s corollary meets the sign read:' },
    { kind: 'example', title: 'The odd-degree census: what does the rule alone say about the roots of $x^3 + x + 1$?', steps: [
      'The positive read: coefficients $1, 0, 1, 1$, signs $+, +, +$ — $V(f) = 0$, so NO positive roots, exactly: the stepped list from 0 is just $\\{0\\}$.',
      'Now, the mirror: $f(-x) = -x^3 - x + 1$, signs $-, -, +$ — $V(f(-x)) = 1$, so exactly one negative root.',
      'So, the degree census: $3 = 0 + 1 + 2c$ forces $c = 1$ — one conjugate pair. The census $(0, 1, 2)$ is FORCED, without solving anything.',
      'Check against lesson 8.1: an odd-degree real polynomial has at least one real root — the census says that real root is the negative one; 8.1’s bisection witness located it near $-0.6823$, and the remaining two seats are the conjugate pair.',
      'Hence the census is complete from signs alone: $(0, 1, 2)$ — the rule at its cleanest, where the parity squeezes both lists to single rows and nothing was ever solved.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The four traps of the sign read', text: 'Trap one — reading $V$ as a count: "$V = 2$ means two positive roots" is exactly what the rule never says; it means two or zero, and only extra knowledge (a factorisation, a graph, a located sign change) picks the row. Trap two — forgetting multiplicity: the rule counts positive roots with multiplicity, so $x^3 - 3x + 2 = (x-1)^2(x+2)$ has $p = 2$ (the root 1 fills two seats), deficit 0 — count the DISTINCT roots instead and you read a false odd deficit of 1 and blame the theorem. Trap three — reading f(−x) as −f(x): the mirror SUBSTITUTES $x \\to -x$; negating the polynomial flips every coefficient sign and keeps every root, so its variation count is a new number about the SAME equation — worthless. Trap four — trusting the rule to locate: "the signs say there is a root near…" — no; the rule prices counts only, never positions. Location is chapter 2’s sign-diagram craft and lesson 2.4’s interval doors.' },

    { kind: 'heading', text: 'Censuses — the Rule and the Conjugate Parity Together' },
    { kind: 'para', text: 'Now the craft. Lesson 8.1 banked the degree census: $n$ roots in total, multiplicity counted, non-real seats in conjugate pairs — so the number of REAL roots has the parity of the degree $n$. The rule contributes the two stepped lists: $p \\in \\{V(f), V(f) - 2, \\ldots\\}$ for the positive seats, and the mirror’s own list for the negative seats. The census table is the intersection of the three reads, and it is the standard JEE-family question shape: given nothing but the equation, list the possible root-type censuses.' },
    { kind: 'equation', latex: 'p + q + 2c = n \\tag{4}', note: 'the degree census of lesson 8.1: $n$ roots in total, the non-real seats in $c$ conjugate pairs — intersect it with the two stepped lists and the census table falls out.' },
    { kind: 'formula', name: 'The census recipe', latex: 'p + q + 2c = n', note: 'the degree census of lesson 8.1: $n$ roots total, non-real seats in conjugate pairs $c$ — intersect with the two stepped lists to pin the possible root-type censuses.' },
    { kind: 'algorithm', title: 'The census recipe', lines: [
      { code: 'write f(x) in descending powers; list the coefficient signs; skip zeros', note: 'the discipline: zeros own no sign — skipped, never counted' },
      { code: 'count the changes: V(f) — the positive census is {V, V-2, V-4, ...}', note: 'walk down in steps of 2: the even-deficit law' },
      { code: 'substitute x -> -x to form f(-x); count V(f(-x)) — the negative census', note: 'the mirror read — substitution, never negation' },
      { code: 'write n = p + q + 2c (lesson 8.1: degree n, conjugate pairs)', note: 'the degree census polices the parity of p + q' },
      { code: 'intersect: keep every (p, q, c) with p, q in their lists and p + q + 2c = n', note: 'the census table — parity kills impossible rows before any root is sought' },
      { code: 'if the roots are known, read the actual census and check both deficits are even', note: 'the verification mode — the rule prices a design, the design pays' },
    ], note: 'the recipe prices a census without solving — the rule never counts exactly and never locates a single root.' },
    { kind: 'para', text: 'Every census row must satisfy all three reads at once, and the parity police is ruthless. A cubic with $V(f) = 2$ and $V(f(-x)) = 1$ admits exactly the rows $(2, 1, 0)$ and $(0, 1, 2)$: $q = 1$ is forced by the mirror’s parity squeeze, $p \\in \\{2, 0\\}$ by the stepped list, and $p + q + 2c = 3$ closes the degree. There is a second, sharper parity at work too — the mirror-sum law: for a polynomial with nonzero constant, $V(f) + V(f(-x))$ has the parity of the degree $n$ (apply the first/last sign relation of the last section to BOTH strips: the leading sign of $f(-x)$ is the leading sign of $f$ times $(-1)^n$, while the constant is shared). So the pair of variation counts is itself constrained: a cubic can never carry the sign-pair $(V(f), V(f(-x))) = (2, 0)$ or $(1, 1)$ — the exhaustive sign-pattern engine of the run-119 verifier confirms the six realizable pairs $\\{(0,1), (0,3), (1,0), (1,2), (2,1), (3,0)\\}$ and no others. Parity kills impossible sign configurations before a single root is sought.' },
    { kind: 'table', caption: 'The witness ledger — every census row the rule allows, and the actual row the roots pick. The deficits (V − p and V(f(−x)) − q) are even in every cell; every polynomial was built from its known root multiset and brute-forced by the run-119 engine before this prose was written.', head: ['Polynomial', 'V(f)', 'V(f(−x))', 'The census the rule allows', 'Actual census'], rows: [
      ['$x^3 - 6x^2 + 11x - 6$', '3', '0', '$p \\in \\{3, 1\\}$, $q = 0$: rows (3,0,0) or (1,0,2)', '(3, 0, 0)'],
      ['$x^3 - 7x + 6$', '2', '1', '$p \\in \\{2, 0\\}$, $q = 1$: rows (2,1,0) or (0,1,2)', '(2, 1, 0)'],
      ['$x^3 - 3x + 2$', '2', '1', '$p \\in \\{2, 0\\}$, $q = 1$: rows (2,1,0) or (0,1,2)', '(2, 1, 0) — the double root'],
      ['$x^3 - x^2 + x - 1$', '3', '0', '$p \\in \\{3, 1\\}$, $q = 0$: rows (3,0,0) or (1,0,2)', '(1, 0, 2)'],
      ['$x^3 + x + 1$', '0', '1', '$p = 0$, $q = 1$: row (0,1,2) forced', '(0, 1, 2)'],
      ['$x^4 - 3x^3 + 3x^2 - 3x + 2$', '4', '0', '$p \\in \\{4, 2, 0\\}$, $q = 0$: rows (4,0,0), (2,0,2), (0,0,4)', '(2, 0, 2)'],
      ['$x^4 + x^3 + x^2 + x + 1$', '0', '4', '$p = 0$, $q \\in \\{4, 2, 0\\}$: rows (0,4,0), (0,2,2), (0,0,4)', '(0, 0, 4)'],
    ] },
    { kind: 'para', text: 'Reading the census off a given polynomial is one direction of the craft; the theory of equations also runs the other — DESIGN. Choose a root multiset, build the polynomial literally, and the census of the design must satisfy the rule: the deficit must come out even, and the mirror must bound the negative seats honestly. The design direction is the deeper practice — it is how exam questions are built in the first place, and it is how you audit your own factorisations. Two designs, one at each degree:' },
    { kind: 'example', title: 'Design mode: build a quintic with census $(2, 1, 2)$ from a chosen root multiset, and verify the rule on the product.', steps: [
      'Choose the multiset: two positive roots $1, 2$; one negative root $-1$; one conjugate pair from $x^2 + 1$ — five seats in all.',
      'So, the product: $f(x) = (x-1)(x-2)(x+1)(x^2+1)$; expand literally: $(x-1)(x-2) = x^2 - 3x + 2$; times $(x+1)$: $x^3 - 2x^2 - x + 2$; times $(x^2+1)$: $x^5 - 2x^4 - x + 2$.',
      'Now, the positive read of the product: signs $+, -, -, +$ — $V(f) = 2$, so the rule allows $p \\in \\{2, 0\\}$, and the design has $p = 2$: deficit $0$.',
      'And the mirror: $f(-x) = -x^5 - 2x^4 + x + 2$, signs $-, -, +, +$ — $V(f(-x)) = 1$: exactly one negative root, the designed $-1$, deficit $0$.',
      'Hence the census closes: $(2, 1, 2)$ with $2 + 1 + 2 = 5$, every read of the rule verified on the design — and the regrouping $(x-1)(x+1)(x^2+1)(x-2) = (x^4 - 1)(x - 2)$ displays the design at a glance.',
    ] },
    { kind: 'para', text: 'And the ledger’s most elegant row — the quartic that closes off the fifth roots of unity. This witness shows the rule at its loosest and its most honest at once: the mirror read allows four, two or zero negative roots, and the answer is zero — a deficit of four, still even, still legal. Chapter 3’s De Moivre reading supplies the actual roots:' },
    { kind: 'example', title: 'The fifth-roots quartic: run the census of $x^4 + x^3 + x^2 + x + 1$ and solve it by chapter 3’s De Moivre reading.', steps: [
      'The positive read: all signs $+$ — $V(f) = 0$: no positive roots, exactly.',
      'Now, the mirror: $f(-x) = x^4 - x^3 + x^2 - x + 1$, signs $+, -, +, -, +$ — $V(f(-x)) = 4$, so the negative roots number $q \\in \\{4, 2, 0\\}$.',
      'So, the census rows: $(0, 4, 0)$, $(0, 2, 2)$ or $(0, 0, 4)$ — the signs alone cannot close this one; the quartic keeps its secret.',
      'Now, solve: multiply by $(x - 1)$ — the difference-of-fifth-powers identity gives $(x-1)f(x) = x^5 - 1$, so the quartic’s roots are the fifth roots of unity with $1$ itself excluded: $x = e^{2\\pi i k/5}$, $k = 1, 2, 3, 4$.',
      'So, De Moivre (chapter 3): the four roots are $0.3090 \\pm 0.9511 i$ and $-0.8090 \\pm 0.5878 i$ — two conjugate pairs, and not one real root among them.',
      'Hence the census $(0, 0, 4)$: deficits $0$ and $4$, BOTH even — the mirror’s bound never promised which row held, and the answer was the last one. The sum-of-squares identity below certifies it independently: the quartic is strictly positive on the whole real line.',
    ] },
    { kind: 'equation', latex: '(x - 1)(x^4 + x^3 + x^2 + x + 1) = x^5 - 1 \\tag{5}', note: 'the fifth-roots quartic in one line: its roots are the fifth roots of unity except $1$ itself — $x = e^{2\\pi i k/5}$, $k = 1, 2, 3, 4$, chapter 3’s De Moivre reading cashed.' },
    { kind: 'equation', latex: 'x^4 + x^3 + x^2 + x + 1 = \\left(x^2 + \\tfrac{x}{2}\\right)^2 + \\tfrac{3}{4}\\left(x + \\tfrac{2}{3}\\right)^2 + \\tfrac{2}{3} \\ > \\ 0 \\tag{6}', note: 'a sum-of-squares certificate: every real $x$ gives a strictly positive value, so the quartic has no real root at all — the census $(0, 0, 4)$ confirmed without a single root computed.' },
    { kind: 'figure', caption: 'The census craft as a diagram: three reads — the degree census of lesson 8.1, the positive stepped list V(f), the negative stepped list V(f(−x)) — intersect in the census table, with parity policing every row. The worked row is x³ − 7x + 6: rows (2, 1, 0) and (0, 1, 2) survive the intersection; the actual roots 1, 2, −3 pick the first.', svg: figureCCensusMap82() },
    { kind: 'para', text: 'The decision diagram is the census table’s workflow: three reads in, one intersection, every surviving row a legal census. What the diagram encodes — and what examinations test — is that the census is a LIST of possibilities, never a prediction: the worked row ends in an actual census only because the roots happened to be known. The section’s close rides the exam callout, and the two sections below add the PROOF layer: the quadratic case completely, and the parity chain for the even deficit.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Census items are staples of the JEE Main polynomial family and of state-board equation chapters. The question shapes, in frequency order: "the number of positive roots of $x^3 - 6x^2 + 11x - 6$ can be" (the stepped census — Illustration 1); "the negative roots of $x^3 - 7x + 6$" (the mirror read — Illustration 4); "the equation $x^4 + x^3 + x^2 + x + 1$ has how many real roots" (the fifth-roots quartic — Illustration 8 and exercise L4-3); and the design family "form a quartic whose roots are all positive; what must its coefficients do?" (exercise L5-2). All items in this lesson are exam-style in the house manner — none is quoted from an official paper. The marks separator: $V$ counts CHANGES, the deficit is even, negative roots ride $f(-x)$, and the rule never counts exactly.' },

    { kind: 'heading', text: 'The Quadratic Case, Proved Completely' },
    { kind: 'para', text: 'The rule is a hard theorem in general — the bound rides the classical induction cited in the next section — but at degree 2 the whole census is provable from scratch, with nothing but the discriminant and the root reads that chapter 1 banked (sum $-b/a$, product $c/a$). The quadratic case deserves the full derivation: it is the one degree where every fork of the rule can be closed by hand, it is examinable in its own right, and it shows exactly where the deficit 2 lives — inside the discriminant.' },
    { kind: 'derivation', title: 'The quadratic case of the rule, proved completely', statement: 'For f(x) = ax² + bx + c with real coefficients and a ≠ 0, the census of positive roots is decided completely by V(f) together with the discriminant Δ = b² − 4ac: every case proved from scratch.', steps: [
      { label: 'Case V = 1: a and c opposite', formula: 'ac < 0, \\quad \\Delta = b^2 - 4ac > 0', explanation: 'Exactly one sign change among $(a, b, c)$ forces $a$ and $c$ to opposite signs — every one of the four patterns $(+,+,-)$, $(+,-,-)$, $(-,+,+)$, $(-,-,+)$ has $ac < 0$. Then $\\Delta = b^2 - 4ac > 0$ strictly, because $-4ac > 0$ while $b^2 \\geq 0$: two distinct real roots. Their product is $c/a < 0$ — opposite signs — so EXACTLY one of them is positive: $p = 1 = V(f)$, deficit $0$. The rule’s promise is exact here, with no fork at all.' },
      { label: 'Case V = 0: all three same sign', formula: 'ab > 0, \\quad ac > 0', explanation: 'All three coefficients share one sign, so $ab > 0$ and $ac > 0$. If $\\Delta < 0$, the roots are a conjugate pair — no real seats, $p = 0$. If $\\Delta \\geq 0$, the roots are real with product $c/a > 0$ (same sign as each other) and sum $-b/a$; since $ab > 0$, the sum $-b/a$ is NEGATIVE — both roots negative. Either way $p = 0 = V(f)$, deficit $0$: the parity squeezes the stepped list $\\{0\\}$, and again there is no fork.' },
      { label: 'Case V = 2: a, c same sign, b opposite', formula: 'ac > 0, \\quad ab < 0, \\quad \\Delta = b^2 - 4ac \\gtrless 0', explanation: 'The patterns $(+,-,+)$ and $(-,+,-)$: $ac > 0$ and $ab < 0$, so the root sum $-b/a > 0$ and the product $c/a > 0$ — real roots here would be same-signed and POSITIVE. If $\\Delta > 0$: two distinct real roots, both positive — $p = 2 = V(f)$, deficit $0$. If $\\Delta = 0$: the double root $-b/(2a) > 0$ fills two seats — $p = 2$ again, deficit $0$. If $\\Delta < 0$: a conjugate pair, no real roots — $p = 0$, deficit $2$. So $V = 2$ promises $\\{2, 0\\}$, and the DISCRIMINANT — not the signs — picks the row.' },
      { label: 'Collect the case table', formula: 'V = 0 \\Rightarrow p = 0; \\quad V = 1 \\Rightarrow p = 1; \\quad V = 2 \\Rightarrow p \\in \\{2, 0\\}', explanation: 'Every case: $p \\leq V$ with the deficits $\\{0, 0, 2\\}$ — even always. The quadratic case is the whole rule at degree 2, proved from scratch; the fork at $V = 2$ is exactly where the bound shows its slack, and the three witnesses of the Illustration below realise all three outcomes of the SAME sign pattern.' },
    ], result: 'At degree 2 the rule is complete: $V = 1$ forces exactly one positive root, $V = 0$ forces none, and $V = 2$ gives two (both positive, $\\Delta \\geq 0$, the double root counting twice) or none (a conjugate pair, $\\Delta < 0$) — the deficit is even in every case.' },
    { kind: 'table', caption: 'The quadratic case, complete: the signs give the bound and the parity; the discriminant decides the V = 2 fork. The deficits are 0, 0 and 2 — even in every row, exactly as the rule promises.', head: ['V', 'The signs of (a, b, c)', 'The verdict', 'Positive roots p'], rows: [
      ['0', 'all three same sign', 'no positive roots — the real roots (if any) are both negative, else a conjugate pair', 'exactly 0'],
      ['1', 'a, c opposite signs', '$\\Delta > 0$ always: two distinct real roots of opposite signs', 'exactly 1'],
      ['2', 'a, c same sign, b opposite', '$\\Delta \\geq 0$: both roots positive (a double root counts twice); $\\Delta < 0$: a conjugate pair', '2 or 0'],
    ] },
    { kind: 'formula', name: 'The quadratic case table', latex: 'V=0 \\Rightarrow p=0; \\quad V=1 \\Rightarrow p=1; \\quad V=2 \\Rightarrow p \\in \\{2,0\\}', note: 'at degree 2 the rule is complete: the discriminant decides the $V = 2$ fork — $\\Delta \\geq 0$ gives both roots positive (a double root counts twice), $\\Delta < 0$ gives a conjugate pair.' },
    { kind: 'example', title: 'The three quadratic censuses: read the positive-root census of $x^2 - 3x + 2$, $x^2 - 2x + 1$ and $x^2 - x + 1$.', steps: [
      'First, $x^2 - 3x + 2$: signs $+, -, +$ — $V = 2$, and $\\Delta = 9 - 8 = 1 > 0$: two distinct real roots, and by the case table both positive — indeed $1$ and $2$: $p = 2$, deficit $0$.',
      'Second, $x^2 - 2x + 1$: the same signs $+, -, +$ — $V = 2$ again, but $\\Delta = 4 - 4 = 0$: the double root $1$ fills both seats — $p = 2$ with multiplicity, deficit $0$.',
      'Third, $x^2 - x + 1$: the same signs a third time — $V = 2$, but $\\Delta = 1 - 4 = -3 < 0$: a conjugate pair, no real roots at all — $p = 0$, deficit $2$.',
      'Hence one sign pattern $+, -, +$ carries all three censuses $p = 2, 2, 0$: the SIGNS bound and parity, the DISCRIMINANT decides the fork — the whole quadratic case table witnessed three ways by one pattern, with $x^2 - x + 1$ the standing counterexample to reading $V = 2$ as a count.',
    ] },

    { kind: 'heading', text: 'Why the Deficit is Even' },
    { kind: 'para', text: 'The even-deficit law is the rule’s second half, and it is a theorem of pure sign bookkeeping — no roots are located, nothing is solved. The proof is a four-step chain tracking one relation: the FIRST sign of the coefficient sequence (the leading coefficient) against the LAST sign (the constant term), through multiplications by positive-root factors. Two of the steps are bookkeeping identities; the third is chapter 2’s sign-diagram discipline returning; the fourth divides out the positive roots and concludes.' },
    { kind: 'equation', latex: '\\operatorname{sign}(a_0) = (-1)^{V(f)}\\, \\operatorname{sign}(a_n) \\tag{7}', note: 'the first/last sign relation: a sign sequence with $V$ flips ends on the opposite sign exactly when $V$ is odd — $a_n$ the leading coefficient (first sign), $a_0$ the constant (last sign).' },
    { kind: 'formula', name: 'The first/last sign relation', latex: '\\operatorname{sign}(a_0) = (-1)^{V(f)}\\,\\operatorname{sign}(a_n)', note: 'a sign sequence with $V$ flips ends on the opposite sign exactly when $V$ is odd — the bookkeeping identity behind the parity chain.' },
    { kind: 'formula', name: 'The no-positive-root lemma', latex: 'k = 0 \\ \\Rightarrow\\ \\operatorname{sign}(a_0) = \\operatorname{sign}(a_n)', note: 'opposite-signed ends force a crossing on $(0, \\infty)$ by chapter 2’s sign diagram — so a polynomial with no positive root has same-signed ends, and hence (by the first/last relation) an EVEN variation count.' },
    { kind: 'para', text: 'The no-positive-root lemma is where the prerequisite craft returns: if the ends of $f$ had opposite signs, then $f(0) = a_0$ and the polynomial’s behaviour as $x \\to +\\infty$ (governed by the leading sign) sit on opposite sides of zero, and the sign-diagram discipline of lesson 2.3 forces a crossing — a positive root. Contrapositive: no positive roots, same-signed ends. One caveat the discipline needs: the argument reads the constant term, so first strip any factor $x^m$ — the root $0$ is neither positive nor negative and owns no sign. The chain itself:' },
    { kind: 'derivation', title: 'The even-deficit law, proved — the parity chain', statement: 'If f has k positive roots (multiplicity counted), then V(f) − k is even: the four-step parity chain.', steps: [
      { label: 'The first/last sign relation', formula: '\\operatorname{sign}(a_0) = (-1)^{V(f)}\\,\\operatorname{sign}(a_n)', explanation: 'Read the coefficient signs in descending order: each variation flips the sign once, so after $V(f)$ flips the last sign (the constant $a_0$) is the first sign (the leading $a_n$) times $(-1)^{V(f)}$. This is a bookkeeping identity about sign sequences — no roots involved — and the engine sweeps it over every sign sequence up to length ten.' },
      { label: 'Multiplying by (x − r), r > 0, flips the relation', formula: 'g = f\\,(x - r): \\quad \\operatorname{lead}(g) = a_n, \\ \\operatorname{const}(g) = -r\\,a_0', explanation: 'In the product $f(x)(x - r) = x\\,f(x) - r\\,f(x)$, the $x\\,f$ part donates the new leading coefficient $a_n$ (the $-r f$ part is one degree lower), and the $-r f$ part alone donates the new constant $-r\\,a_0$. With $r > 0$: the first sign KEEPS, the last sign FLIPS — so the product’s first/last relation is the opposite of $f$’s, and by step one, $V(g) \\equiv V(f) + 1 \\pmod{2}$: each positive-root factor flips the variation parity.' },
      { label: 'A polynomial with no positive root has same-signed ends', formula: 'k = 0 \\ \\Rightarrow\\ \\operatorname{sign}(a_0) = \\operatorname{sign}(a_n) \\ \\Rightarrow\\ V\\ \\text{even}', explanation: 'If the ends had opposite signs, $f(0) = a_0$ and the leading-sign behaviour at $+\\infty$ would sit on opposite sides of zero, and chapter 2’s sign-diagram discipline forces a crossing on $(0, \\infty)$ — a positive root, contradicting $k = 0$. Same ends, so $(-1)^{V} = +1$ by step one: $V$ even. (Strip any factor $x^m$ first: the root 0 is neither positive nor negative.)' },
      { label: 'Divide out the k positive roots', formula: 'f = g\\,(x - r_1)\\cdots(x - r_k) \\ \\Rightarrow\\ V(f) \\equiv V(g) + k \\equiv k \\pmod 2', explanation: 'Let $g$ carry everything except the $k$ positive roots — the negative, zero and non-real seats: no positive roots, so $V(g)$ is even by step three. Step two applied $k$ times flips the parity $k$ times: $V(f) \\equiv k \\pmod{2}$. The deficit $V(f) - k$ is even — always, for every real polynomial.' },
    ], result: 'The deficit $V(f) - k$ is even for every real polynomial — a bound plus a parity, and the parity is a theorem of pure sign bookkeeping.' },
    { kind: 'equation', latex: 'V(f) \\equiv V(g) + k \\equiv k \\pmod{2} \\tag{8}', note: 'the parity chain’s conclusion: dividing out the $k$ positive roots leaves $V(f) - k$ even — the deficit is even.' },
    { kind: 'formula', name: 'The parity link', latex: 'V(f) \\equiv V(g) + k \\equiv k \\pmod 2', note: 'dividing out the $k$ positive roots ($r > 0$) flips the variation parity once per root — the deficit is even; the same chain gives the mirror-sum law $V(f) + V(f(-x)) \\equiv n$.' },
    { kind: 'para', text: 'The chain proves the PARITY completely. The BOUND ($k \\leq V(f)$) is the classical induction’s half: multiplying by $(x - r)$, $r > 0$, provably never decreases the variation count and strictly increases it — the leading sign keeps, the constant flips, and a between-the-seats case analysis carries every old sign change into the product. The run-119 engine swept that lemma on all 209 products of the witness family — $V(g(x-r)) \\geq V(g) + 1$ in every case (engine check C54) — and the full case analysis is the classical proof this book cites rather than reproduces at full fiddle. Divide out the $k$ positive roots and the bound rides the same chain upward: $V(f) \\geq k$, with the parity already proved even. The two halves assemble into the rule exactly as the theorem callout states it.' },
    { kind: 'example', title: 'The parity chain, live: walk g = (x+1)(x²+1) through two positive-root factors and watch V track k.', steps: [
      'Start with $g(x) = (x+1)(x^2+1) = x^3 + x^2 + x + 1$: no positive roots, and the signs $+, +, +, +$ give $V(g) = 0$ — even, exactly as the no-positive-root lemma demands.',
      'Now, multiply by $(x - 1)$: $g(x)(x-1) = x^4 - 1$ — the signs $+, -$ give $V = 1$, the parity flipped once, and the product owns one positive root ($1$, deficit $0$).',
      'And multiply again, by $(x - 2)$: $(x^4 - 1)(x - 2) = x^5 - 2x^4 - x + 2$ — the signs $+, -, -, +$ give $V = 2$, the parity flipped a second time.',
      'So, the census of the quintic: $V(f) = 2$ allows $p \\in \\{2, 0\\}$; the actual roots are $1, 2, -1, i, -i$ — $p = 2$, deficit $0$, and the mirror read $V(f(-x)) = 1$ prices the single negative root exactly.',
      'Hence the chain in one picture: $V = 0 \\to 1 \\to 2$ tracked the positive-root count $0 \\to 1 \\to 2$ step for step — the parity flip per positive root, witnessed on literal products.',
    ] },
    { kind: 'para', text: 'The lesson closes where it opened. Lesson 8.1 counted the roots — $n$ of them, multiplicity counted, conjugate pairs for real coefficients; this lesson read their TYPES off the coefficient signs alone, Descartes’ 17th-century lens, still the cheapest census in algebra: a bound plus a parity, crossed with the degree census into the census table, proved completely at degree 2 and proved in its parity at every degree. The theory of equations now owns three reads of an equation before any root is computed — the count, the census, and (next lesson) the coefficients as symmetric functions of the roots: Viète’s staircase, 8.3. The self-check, then the graded set:' },

    { kind: 'quiz', title: 'Check yourself: Descartes’ rule of signs', items: [
      { q: 'The number of sign variations in $x^3 - 6x^2 + 11x - 6$ is', options: ['1', '2', '3', '0'], answer: 2, explain: 'Option 2 is the count: the coefficient sequence $1, -6, 11, -6$ has signs $+, -, +, -$, and the walk changes sign at every one of the three gaps — $V(f) = 3$. Option 0 counts only the first change: the walk must cross all three gaps, and each crossing is a variation. Option 1 is the count for a strip like $x^3 - 7x + 6$, whose zero seat removes one flip — the classic half-count. Option 3 is the all-same-sign count, the signature of $x^3 + x + 1$, not of this strictly alternating strip.' },
      { q: 'By Descartes’ rule ALONE, the number of positive roots of $x^3 - 6x^2 + 11x - 6$ is', options: ['3 or 1', 'exactly 3', '2 or 0', '3, 2 or 1'], answer: 0, explain: 'Option 0 is the rule’s honest promise: $V(f) = 3$ bounds the positive roots by $p \\leq 3$ with $3 - p$ even — so $p \\in \\{3, 1\\}$, three or one, nothing else. Option 1 over-claims: the rule never counts exactly; only the extra knowledge that this cubic factors as $(x-1)(x-2)(x-3)$ pins $p = 3$ — and it happens to be 3, but the RULE alone says "3 or 1". Option 2 is the census for $V = 2$: the stepped list keeps the PARITY of $V$, so it cannot hold here. Option 3 forgets the even-deficit law: the count cannot drop by 1, only by 2 — 2 is impossible.' },
      { q: 'For $f(x) = x^3 - x^2 + x - 1$ the variations are 3 but the positive roots number only 1. The missing possibilities', options: ['are negative roots', 'are complex conjugate pairs (an even number)', 'were miscounted', 'do not exist — the rule is wrong'], answer: 1, explain: 'Option 1 is the honest bookkeeping: the deficit $3 - 1 = 2$ is even, and in THIS cubic the missing two seats are exactly the conjugate pair $\\pm i$ from the factor $x^2 + 1$. Option 0 is impossible: $V(f(-x)) = 0$ here, so the cubic has NO negative roots — negative seats would be pinned by the mirror read, not by the positive deficit. Option 2 is the reflex of students who forget multiplicity or zero-skipping — the count 3 is right, and the deficit 2 is legal. Option 3 blames the theorem: the rule never promised exactly 3 — it promised "3 or 1", and 1 is inside the promise.' },
      { q: 'To count NEGATIVE roots of $f(x) = 0$ by the rule, one counts variations in', options: ['$-f(x)$', '$f(-x)$', '$f(x)$ with coefficients reversed', '$|f(x)|$'], answer: 1, explain: 'Option 1 is the mirror read: substituting $x \\to -x$ turns the negative roots of $f$ into the positive roots of $f(-x)$ — the root set of $f(-x)$ is exactly the negative of the root set of $f$. Option 0 is THE trap: negating the polynomial flips every coefficient sign but changes nothing about the roots ($-f(x) = 0$ exactly where $f(x) = 0$), so its variation count is a new number about the SAME equation. Option 2 describes the reciprocal-root transformation — lesson 8.5’s craft, not the mirror. Option 3 is not a polynomial read at all: absolute values carry no coefficient signs to count.' },
      { q: 'A degree-4 real polynomial has variations 4 and its $f(-x)$ has variations 0. Its positive roots (with multiplicity) number', options: ['exactly 4', '4, 2 or 0', '2', 'any number up to 4'], answer: 1, explain: 'Option 1 is the census: $V(f) = 4$ promises $p \\in \\{4, 2, 0\\}$ — down from 4 in steps of 2 — and the mirror read $V(f(-x)) = 0$ adds a forced equality: NO negative roots at all. Option 0 over-claims: the quartic $x^4 - 3x^3 + 3x^2 - 3x + 2$ carries exactly this signature and has only $p = 2$ — the deficit 2 is legal and realised. Option 2 is A possibility, never a forced one: the rule bounds, it does not count. Option 3 forgets the even-deficit law: 3 and 1 are impossible counts whatever the polynomial does — the census only steps by 2.' },
    ] },

    { kind: 'exercises', title: 'Exercises 8.2', sets: [
      { level: 'L1', questions: [
        { q: 'Count the sign variations of $2x^3 - 5x^2 + 7x - 1$.', solution: [
          'Write the coefficient sequence in descending powers: $2, -5, 7, -1$ — all four seats occupied, no zeros to skip.',
          'So, the signs read $+, -, +, -$.',
          'Now, walk the row: $+ \\to -$ is the first variation, $- \\to +$ the second, $+ \\to -$ the third.',
          'Hence $V(f) = 3$ — the cubic maximum, a strictly alternating strip.',
        ], answer: '$V(f) = 3$ — the cubic maximum, a strictly alternating strip' },
        { q: 'For $f(x) = x^3 - 7x + 6$, write $f(-x)$ and count its variations.', solution: [
          'The mirror substitution, term by term: $f(-x) = (-x)^3 - 7(-x) + 6 = -x^3 + 7x + 6$ — the odd power flips its seat, the even powers and the constant keep theirs.',
          'So, the coefficient signs read $-, +, +$.',
          'Now, walk the row: exactly one change, $- \\to +$.',
          'Hence $V(f(-x)) = 1$ — and by the mirror read, $f$ has exactly one negative root (deficit 0, the stepped list from 1 being just $\\{1\\}$).',
        ], answer: '$f(-x) = -x^3 + 7x + 6$, with $V(f(-x)) = 1$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Run the complete Descartes census of $x^3 - 7x + 6$: the possible AND the actual positive, negative and non-real root counts.', solution: [
          'The positive read: the coefficients $1, 0, -7, 6$ skip the zero of the $x^2$ seat; the signs read $+, -, +$, so $V(f) = 2$.',
          'So, the positive roots number $p \\in \\{2, 0\\}$ — two, or none: the even-deficit law forbids everything between.',
          'Now, the mirror: $f(-x) = -x^3 + 7x + 6$ with signs $-, +, +$, so $V(f(-x)) = 1$ — the negative roots number exactly $q = 1$.',
          'So, the degree census $p + q + 2c = 3$ leaves exactly two rows: $(2, 1, 0)$ and $(0, 1, 2)$.',
          'Check against the actual roots: $f(1) = 0$, $f(2) = 0$ and $f(-3) = 0$, so $f(x) = (x-1)(x-2)(x+3)$ — roots $1, 2, -3$: the census $(2, 1, 0)$, with deficits $0$ and $0$. The sign strip and the census ladder are drawn below.',
        ], answer: 'positive $p \\in \\{2, 0\\}$ (actual 2); negative $q = 1$ (actual 1); non-real 0 — census $(2, 1, 0)$', figures: [
          { caption: 'The sign strip and census ladder of x³ − 7x + 6: the coefficient chips with the zero skipped, the two flips (V = 2), and the census ladder forking p ∈ {2, 0} into the rows (2, 1, 0) and (0, 1, 2) — the actual roots 1, 2, −3 pick the first.', svg: solfigStripL2_1_82() },
        ] },
        { q: 'Factor $x^4 - 3x^3 + 3x^2 - 3x + 2$ and run its complete census.', solution: [
          'Test the small rational roots: $f(1) = 1 - 3 + 3 - 3 + 2 = 0$, so $(x - 1)$ divides; $f(2) = 16 - 24 + 12 - 6 + 2 = 0$, so $(x - 2)$ divides too.',
          'So, divide out both: $x^4 - 3x^3 + 3x^2 - 3x + 2 = (x-1)(x-2)(x^2 + 1)$.',
          'Now, the positive read of the original: signs $+, -, +, -, +$ give $V(f) = 4$, so $p \\in \\{4, 2, 0\\}$.',
          'And the mirror: $f(-x) = x^4 + 3x^3 + 3x^2 + 3x + 2$, all signs $+$, $V(f(-x)) = 0$ — no negative roots at all.',
          'Hence the census: the actual roots $1, 2, i, -i$ give $(2, 0, 2)$ — deficits $4 - 2 = 2$ and $0$, both even, and the degree closes: $2 + 0 + 2 = 4$.',
        ], answer: '$(x-1)(x-2)(x^2+1)$; census: positive $\\in \\{4, 2, 0\\}$ (actual 2), negative 0, non-real 2' },
      ] },
      { level: 'L3', questions: [
        { q: 'Run the complete census of $x^3 + x + 1$ — possible and actual.', solution: [
          'The positive read: coefficients $1, 0, 1, 1$, signs $+, +, +$ — $V(f) = 0$, so NO positive roots, exactly (the stepped list from 0 is $\\{0\\}$).',
          'So, the mirror: $f(-x) = -x^3 - x + 1$, signs $-, -, +$ — $V(f(-x)) = 1$, so exactly one negative root.',
          'Now, the degree census: $3 = 0 + 1 + 2c$ forces $c = 1$ — one conjugate pair: the census $(0, 1, 2)$, completely forced by the signs.',
          'Check against 8.1’s odd-degree corollary: the cubic must own at least one real root, and the census says it is the negative one; 8.1’s bisection witness placed it near $-0.6823$.',
          'Hence the census $(0, 1, 2)$ with deficits $0$ and $0$ — the two stepped lists both squeezed to single rows, and nothing was solved.',
        ], answer: 'census $(0, 1, 2)$: 0 positive, 1 negative (near $-0.6823$), 2 non-real' },
        { q: 'Run the complete census of $x^3 - x^2 + x - 1$ — possible and actual.', solution: [
          'The positive read: the signs $+, -, +, -$ give $V(f) = 3$, so $p \\in \\{3, 1\\}$.',
          'So, the mirror: $f(-x) = -x^3 - x^2 - x - 1$, all signs $-$, $V(f(-x)) = 0$ — no negative roots.',
          'Now, the degree census: with $q = 0$ and $p + 2c = 3$, the rows are $(3, 0, 0)$ or $(1, 0, 2)$.',
          'Check against the actual roots: $f(1) = 0$ and $f(x) = (x-1)(x^2 + 1)$ — roots $1, i, -i$ — the census $(1, 0, 2)$.',
          'Hence the deficits: $3 - 1 = 2$ at the positive read — exactly the conjugate pair $\\pm i$ — and $0$ at the mirror; both even, both legal.',
        ], answer: 'positive $\\in \\{3, 1\\}$ (actual 1), negative 0, non-real 2 — census $(1, 0, 2)$' },
        { q: 'Run the census of $x^4 - 3x^3 + 3x^2 - 3x + 2$ AND solve it completely.', solution: [
          'The census first: signs $+, -, +, -, +$ give $V(f) = 4$, so $p \\in \\{4, 2, 0\\}$; the mirror $f(-x) = x^4 + 3x^3 + 3x^2 + 3x + 2$ has all signs $+$, $V(f(-x)) = 0$, so $q = 0$ — the rows are $(4, 0, 0)$, $(2, 0, 2)$, $(0, 0, 4)$.',
          'Now, solve: $f(1) = 0$ and $f(2) = 0$, so $(x - 1)$ and $(x - 2)$ divide; carrying the division through, $f(x) = (x-1)(x-2)(x^2 + 1)$.',
          'So, the quadratic factor: $x^2 + 1 = 0$ gives $x = \\pm i$.',
          'Hence the roots are $1, 2, i, -i$ — the census $(2, 0, 2)$: exactly two positive, none negative, one conjugate pair.',
          'Check: the deficits $4 - 2 = 2$ and $0$ are even; the degree closes as $2 + 0 + 2 = 4$; and the middle row of the three the rule allowed is the one the roots picked.',
        ], answer: 'roots $\\{1, 2, i, -i\\}$; census $(2, 0, 2)$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Run the census of $x^3 - 3x + 2$ AND solve it completely, counting multiplicity.', solution: [
          'The positive read: the coefficients $1, 0, -3, 2$ skip the zero; signs $+, -, +$ give $V(f) = 2$, so $p \\in \\{2, 0\\}$.',
          'So, the mirror: $f(-x) = -x^3 + 3x + 2$, signs $-, +, +$ — $V(f(-x)) = 1$: exactly one negative root, forced.',
          'Now, solve: $f(1) = 1 - 3 + 2 = 0$, so $(x - 1)$ divides and $f(x) = (x-1)(x^2 + x - 2) = (x-1)(x-1)(x+2) = (x-1)^2 (x+2)$.',
          'So, the multiplicity discipline: the double root $1$ counts TWICE — positive roots with multiplicity: $2$ (the seat 1, filled twice); negative: $1$ (the root $-2$); non-real: $0$.',
          'Hence the census $(2, 1, 0)$ with deficits $2 - 2 = 0$ and $1 - 1 = 0$ — and the warning stands: counting the DISTINCT roots would read $p = 1$ and a false odd "deficit" of 1. The multiplicity ladder is drawn below.',
        ], answer: 'roots $1$ (double) and $-2$; census $(2, 1, 0)$ — the double root counts twice', figures: [
          { caption: 'The multiplicity ladder of x³ − 3x + 2: V = 2 allows p ∈ {2, 0}; the factorisation (x − 1)²(x + 2) makes the root 1 a DOUBLE root filling two positive seats — census (2, 1, 0), and the trap box marks the false odd deficit a distinct-root count would read.', svg: solfigMultL4_1_82() },
        ] },
        { q: 'Design a quartic with integer coefficients having exactly two positive roots, no negative roots and one conjugate pair; then verify the rule on your design.', solution: [
          'Design from the root multiset: take the positive roots $1, 2$, no negative seat, and the conjugate pair from $x^2 + 2$ (roots $\\pm i\\sqrt{2}$): $f(x) = (x-1)(x-2)(x^2 + 2)$.',
          'Expand literally: $(x-1)(x-2) = x^2 - 3x + 2$; times $x^2 + 2$: $x^4 - 3x^3 + 4x^2 - 6x + 4$.',
          'Now, verify the rule: the signs $+, -, +, -, +$ give $V(f) = 4 \\geq 2$ with deficit $4 - 2 = 2$ — even, legal.',
          'And the mirror: $f(-x) = x^4 + 3x^3 + 4x^2 + 6x + 4$, all signs $+$, $V(f(-x)) = 0$ — no negative roots, exactly as designed.',
          'Hence the census closes: $(2, 0, 2)$ with $2 + 0 + 2 = 4$ — the design pays the rule’s price exactly; the bound was slack (4 allowed, 2 realised), and the parity held.',
        ], answer: 'e.g. $(x-1)(x-2)(x^2+2) = x^4 - 3x^3 + 4x^2 - 6x + 4$: $V = 4$, deficit 2, mirror 0 — census $(2, 0, 2)$' },
        { q: 'Run the census of the fifth-roots quartic $x^4 + x^3 + x^2 + x + 1$ and solve it by chapter 3’s De Moivre reading.', solution: [
          'The positive read: all signs $+$ — $V(f) = 0$: no positive roots, exactly.',
          'So, the mirror: $f(-x) = x^4 - x^3 + x^2 - x + 1$, signs $+, -, +, -, +$ — $V(f(-x)) = 4$, so the negative roots number $q \\in \\{4, 2, 0\\}$.',
          'Now, solve: multiply by $(x - 1)$ — the difference of fifth powers, $(x-1)f(x) = x^5 - 1$ — so the quartic’s roots are the fifth roots of unity except $1$ itself: $x = e^{2\\pi i k/5}$, $k = 1, 2, 3, 4$.',
          'So, De Moivre (chapter 3): the four roots are $0.3090 \\pm 0.9511 i$ and $-0.8090 \\pm 0.5878 i$ — two conjugate pairs, no real root among them.',
          'Hence the census $(0, 0, 4)$: deficits $0$ and $4$, BOTH even — and the sum-of-squares certificate $f = (x^2 + \\tfrac{x}{2})^2 + \\tfrac{3}{4}(x + \\tfrac{2}{3})^2 + \\tfrac{2}{3} > 0$ confirms no real root at all, without computing one.',
        ], answer: 'census $(0, 0, 4)$ — the four non-real fifth roots of unity $e^{2\\pi i k/5}$, $k = 1, 2, 3, 4$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Construct a cubic with integer coefficients whose variation count is 2 but which has NO positive root; verify the rule on your construction.', solution: [
          'Design: no positive seat means every real root is negative or non-real. Take the negative root $-3$ and the conjugate pair $x^2 - x + 1$ (roots $\\tfrac{1}{2} \\pm \\tfrac{\\sqrt{3}}{2} i$, non-real since its discriminant is $-3$): $f(x) = (x^2 - x + 1)(x + 3)$.',
          'Expand literally: $x^3 + 3x^2 - x^2 - 3x + x + 3 = x^3 + 2x^2 - 2x + 3$.',
          'Now, verify the rule: the signs $+, +, -, +$ give $V(f) = 2$, so the rule allows $p \\in \\{2, 0\\}$ — and the design has $p = 0$: deficit $2$, even, legal.',
          'And the mirror: $f(-x) = -x^3 + 2x^2 + 2x + 3$, signs $-, +, +, +$ — $V(f(-x)) = 1$: exactly one negative root, the designed $-3$.',
          'Hence the census $(0, 1, 2)$ closes the degree: $0 + 1 + 2 = 3$; the rule never promised WHICH of $\\{2, 0\\}$ would hold — the design chose $0$, and the bound’s slack of 2 stayed slack.',
        ], answer: 'e.g. $(x^2 - x + 1)(x + 3) = x^3 + 2x^2 - 2x + 3$: $V = 2$, $p = 0$, deficit 2 — census $(0, 1, 2)$' },
        { q: 'The quartic $x^4 - ax^3 + bx^2 - cx + d$ (real $a, b, c, d$) has all four roots positive. What does the rule force about $a, b, c, d$?', solution: [
          'Count first: four positive roots, multiplicity counted, means $p = 4$.',
          'So, the rule bounds both sides: $p \\leq V(f) \\leq 4$ — a degree-4 polynomial has five coefficients and at most four variations — so $V(f) = 4$ exactly, and the deficit is $0$: the count is forced to be exact.',
          'Now, read the written form $x^4 - ax^3 + bx^2 - cx + d$: five sign seats in descending order, and $V = 4$ forces the signs to alternate $+, -, +, -, +$ strictly.',
          'So, seat by seat: $-a$ must be genuinely negative, so $a > 0$; $b$ genuinely positive, so $b > 0$; $-c$ genuinely negative, so $c > 0$; and $d > 0$ — any zero or wrong-signed coefficient would drop a variation and break the forced census.',
          'Check on a witness: the roots $1, 2, 3, 4$ give $(x-1)(x-2)(x-3)(x-4) = x^4 - 10x^3 + 35x^2 - 50x + 24$ — $a = 10$, $b = 35$, $c = 50$, $d = 24$, all positive, $V = 4$, deficit $0$, exactly as forced (and the second witness $\\{1, 2, 3, 5\\}$ behaves identically).',
        ], answer: '$V(f) = 4$ exactly (deficit 0): the written signs alternate $+, -, +, -, +$, forcing $a > 0$, $b > 0$, $c > 0$, $d > 0$' },
        { q: 'A real quartic has $V(f) = 1$ and $V(f(-x)) = 1$. Determine the complete possible root-type censuses, and realise one.', solution: [
          'The positive read: $p \\leq 1$ with $1 - p$ even — the stepped list from 1 is just $\\{1\\}$: $p = 1$ exactly.',
          'So, the mirror read: by the same squeeze, $q = 1$ exactly.',
          'Now, the degree census: $4 = 1 + 1 + 2c$ forces $c = 1$ — one conjugate pair.',
          'Hence the census is FORCED: $(1, 1, 2)$ — one positive, one negative, two non-real; no other distribution survives the three reads, because $V = 1$ leaves the stepped lists no room below.',
          'Realise it: $x^4 + x^2 - 2 = (x^2 - 1)(x^2 + 2) = (x-1)(x+1)(x^2+2)$ — an EVEN polynomial, so $f(-x) = f(x)$ and both variation counts are the same $1$; the roots are $1, -1, \\pm i\\sqrt{2}$, the census $(1, 1, 2)$ exactly as forced.',
        ], answer: 'exactly one positive, one negative and one conjugate pair — census $(1, 1, 2)$, forced; realised by $x^4 + x^2 - 2$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the even-deficit law: if $f$ has $k$ positive roots (multiplicity counted), then $V(f) - k$ is even — the four-step parity chain.', solution: [
          'Step one, the first/last sign relation: reading the coefficient signs in descending order, each variation flips the sign once, so after $V(f)$ flips the constant’s sign is the leading coefficient’s sign times $(-1)^{V(f)}$ — a bookkeeping identity about the sign sequence, no roots involved.',
          'Step two, the $(x - r)$ flip: in $f(x)(x - r) = x f(x) - r f(x)$ with $r > 0$, the $x f$ part donates the new leading coefficient (sign keeps) and the $-r f$ part donates the new constant $-r a_0$ (sign flips) — so the product’s first/last relation is the opposite of $f$’s, and $V$ changes parity.',
          'Step three, the no-positive-root lemma: if $f$ had opposite-signed ends, then $f(0) = a_0$ and the leading-sign behaviour at $+\\infty$ would sit on opposite sides of zero, forcing a crossing on $(0, \\infty)$ by chapter 2’s sign diagram — a positive root. So $k = 0$ implies same-signed ends, which by step one means $V$ even.',
          'Step four, divide out: write $f = g (x - r_1) \\cdots (x - r_k)$ with $g$ carrying the negative, zero and non-real seats — no positive roots, so $V(g)$ is even by step three; step two applied $k$ times flips the parity $k$ times.',
          'Hence $V(f) \\equiv V(g) + k \\equiv k \\pmod{2}$: the deficit $V(f) - k$ is even for every real polynomial — with the constant-term caveat: strip any factor $x^m$ first, since the root $0$ is neither positive nor negative.',
        ], answer: '$V(f) \\equiv k \\pmod{2}$ — the deficit $V(f) - k$ is even, by the first/last relation, the $(x - r)$ parity flip, the no-positive-root lemma, and the division' },
        { q: 'Prove the quadratic case of the rule completely — the three-case table for $ax^2 + bx + c$, $a \\neq 0$.', solution: [
          'Case $V = 1$: exactly one sign change among $(a, b, c)$ forces $a$ and $c$ to opposite signs, $ac < 0$. Then $\\Delta = b^2 - 4ac > 0$ strictly (as $-4ac > 0$), so the roots are real and distinct; their product $c/a < 0$ makes them opposite-signed — exactly one positive root: $p = 1 = V$, deficit $0$.',
          'Case $V = 0$: all three coefficients share one sign, so $ac > 0$ and $ab > 0$. If $\\Delta < 0$ the roots are a conjugate pair — $p = 0$. If $\\Delta \\geq 0$ the roots are real with product $c/a > 0$ (same-signed) and sum $-b/a < 0$ — both negative. Either way $p = 0 = V$, deficit $0$.',
          'Case $V = 2$: $a$ and $c$ share one sign and $b$ carries the opposite ($ac > 0$, $ab < 0$), so real roots would have product $c/a > 0$ and sum $-b/a > 0$ — both positive. If $\\Delta > 0$: two distinct positive roots, $p = 2 = V$. If $\\Delta = 0$: the double root $-b/(2a) > 0$ fills two seats, $p = 2$ again. If $\\Delta < 0$: a conjugate pair, $p = 0$, deficit $2$.',
          'Collect: $V = 0 \\Rightarrow p = 0$; $V = 1 \\Rightarrow p = 1$; $V = 2 \\Rightarrow p \\in \\{2, 0\\}$ — the deficit lands in $\\{0, 0, 2\\}$, even in every case.',
          'Hence at degree 2 the rule is complete from scratch, and the fork lives entirely inside the discriminant: the three witnesses $x^2 - 3x + 2$, $x^2 - 2x + 1$ and $x^2 - x + 1$ (all $V = 2$) realise the three outcomes $p = 2, 2, 0$ respectively — with $x^2 - x + 1$ ($\\Delta = -3$) the standing counterexample to reading $V = 2$ as a count.',
        ], answer: 'the three-case table: $V = 0 \\Rightarrow p = 0$; $V = 1 \\Rightarrow p = 1$; $V = 2 \\Rightarrow p \\in \\{2, 0\\}$ with $\\Delta \\geq 0$ giving both roots positive and $\\Delta < 0$ a conjugate pair' },
      ] },
    ] },
  ],
}


// ------------------------------------------------------------------
// lesson 8.3 — authored by the run-119 swarm (the 083 agent), integrated verbatim
// ------------------------------------------------------------------

function vieteStaircase83Svg(): string {
  // Figure A — the Viète staircase: the three root chips α, β, γ at the
  // top; the expanded monic cubic (x−α)(x−β)(x−γ) as four rung bands —
  // the power each rung sits on, the σ it equals, and the Viète read
  // from ax³+bx²+cx+d on the right; the alternating signs flagged red.
  const W = 720
  const H = 470
  const chipY = 104
  const chips = [
    { x: 250, label: 'α' },
    { x: 360, label: 'β' },
    { x: 470, label: 'γ' },
  ]
  const bands = [
    { y: 180, pow: 'x³', sig: '+ 1', mid: 'the leading rung — monic', read: 'a ≠ 0', fill: '#ffedd5' },
    { y: 232, pow: 'x²', sig: '− σ₁', mid: 'σ₁ = α + β + γ', read: 'σ₁ = −b/a', fill: '#fef3c7' },
    { y: 284, pow: 'x¹', sig: '+ σ₂', mid: 'σ₂ = αβ + βγ + γα', read: 'σ₂ = +c/a', fill: '#fef3c7' },
    { y: 336, pow: 'x⁰', sig: '− σ₃', mid: 'σ₃ = αβγ', read: 'σ₃ = −d/a', fill: '#fef3c7' },
  ]
  let out = ''
  for (const ch of chips) {
    out += `<circle cx="${ch.x}" cy="${chipY}" r="17" fill="#16a34a" stroke="#166534" stroke-width="1.6"/>` +
      `<text x="${ch.x}" y="${chipY + 4.5}" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">${ch.label}</text>`
  }
  bands.forEach((b) => {
    out += `<rect x="96" y="${b.y}" width="528" height="40" rx="6" fill="${b.fill}" stroke="#16a34a" stroke-width="1.6"/>` +
      `<text x="112" y="${b.y + 25}" font-size="11.5" font-weight="700" fill="#166534" text-anchor="start">${b.pow}</text>` +
      `<text x="150" y="${b.y + 25}" font-size="11.5" font-weight="700" fill="#ea580c" text-anchor="start">${b.sig}</text>` +
      `<text x="360" y="${b.y + 25}" font-size="10.5" font-weight="700" fill="#65a30d" text-anchor="middle">${b.mid}</text>` +
      `<text x="612" y="${b.y + 25}" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="end">${b.read}</text>`
  })
  const signs = ['+', '−', '+', '−']
  bands.forEach((b, i) => {
    out += `<circle cx="72" cy="${b.y + 20}" r="11" fill="${i % 2 === 0 ? '#16a34a' : '#dc2626'}" stroke="#fffdf5" stroke-width="1.5"/>` +
      `<text x="72" y="${b.y + 24}" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">${signs[i]}</text>`
  })
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Viete staircase for the cubic: three green root chips alpha, beta and gamma at the top, and below them four rung bands for the expanded monic cubic x cubed minus sigma-one x squared plus sigma-two x minus sigma-three. Rung one: the coefficient of x cubed is plus one, the monic leading rung. Rung two: the coefficient of x squared is minus sigma-one where sigma-one is alpha plus beta plus gamma, the Viete read minus b over a. Rung three: the coefficient of x is plus sigma-two where sigma-two is alpha beta plus beta gamma plus gamma alpha, the read plus c over a. Rung four: the constant is minus sigma-three where sigma-three is alpha beta gamma, the read minus d over a. Red and green sign chips on the left alternate plus, minus, plus, minus — the alternating sign law. A caption notes the chapter 2 case n equals 2 reads x squared minus S x plus P.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the Viète staircase: expanding (x − α)(x − β)(x − γ)</text>
  <text x="360" y="58" font-size="12" font-weight="700" text-anchor="middle" fill="#65a30d">(x − α)(x − β)(x − γ) = x³ − σ₁x² + σ₂x − σ₃</text>
  ${out}
  ${chips.map((ch) => `<line x1="${ch.x}" y1="122" x2="${ch.x}" y2="167" stroke="#d97706" stroke-width="1.8" stroke-dasharray="5 4"/>` + `<path d="M ${ch.x - 5} 165 l 5 9 l 5 -9 z" fill="#d97706"/>`).join('')}
  <text x="360" y="400" font-size="11" font-weight="700" text-anchor="middle" fill="#dc2626">the signs alternate: (−1)ᵏ — rung 2 flips, rung 3 flips back, rung 4 flips again</text>
  <text x="360" y="428" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">ch.2 cross-reference: at n = 2 the same expansion is x² − (α + β)x + αβ — lesson 2.3's S and P</text>
  <text x="360" y="452" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0d9488">choose the roots k at a time: one at a time for σ₁, two at a time for σ₂, all three for σ₃</text>
</svg>`
}

function complexReads83Svg(): string {
  // Figure B — the reads without solving: the cubic x³−4x²+6x−4 on the
  // complex plane — one real root at 2 and the conjugate pair 1±i, the
  // pair joined by a dashed mirror line; the σ census panel (σ₁ = 4,
  // σ₂ = 6, σ₃ = 4) and the power-sum read p₂ = 4 on the right.
  const W = 720
  const H = 350
  const ox = 190
  const oy = 175
  const unit = 56
  const dot = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="7.5" fill="#16a34a" stroke="#fffdf5" stroke-width="1.8"/>`
  const r2 = { x: ox + 2 * unit, y: oy }
  const rP = { x: ox + unit, y: oy - unit }
  const rM = { x: ox + unit, y: oy + unit }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The reads without solving, on the complex plane: the cubic x cubed minus 4 x squared plus 6 x minus 4 has one real root at 2 on the real axis and a conjugate pair at 1 plus i and 1 minus i, joined by a dashed amber mirror line. The real axis runs horizontally with ticks at 1 and 2; the imaginary axis runs vertically. A right-hand census panel lists sigma-one equals 4, sigma-two equals 6, sigma-three equals 4 and the power sum p two equals sigma-one squared minus two sigma-two equals 4. The caption: one real root, one conjugate pair, and every read priced without solving.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the reads without solving: x³ − 4x² + 6x − 4 = 0</text>
  <line x1="40" y1="${oy}" x2="438" y2="${oy}" stroke="#0d9488" stroke-width="2.4"/>
  <path d="M 438 ${oy} l -12 -6 v 12 z" fill="#0d9488"/>
  <line x1="${ox}" y1="34" x2="${ox}" y2="316" stroke="#0d9488" stroke-width="2.4"/>
  <path d="M ${ox} 34 l -6 12 h 12 z" fill="#0d9488"/>
  <text x="426" y="196" font-size="11" font-weight="700" fill="#0f766e" text-anchor="end">Re</text>
  <text x="206" y="44" font-size="11" font-weight="700" fill="#0f766e">Im</text>
  <line x1="${ox + unit}" y1="163" x2="${ox + unit}" y2="187" stroke="#d97706" stroke-width="1.8"/>
  <line x1="${r2.x}" y1="163" x2="${r2.x}" y2="187" stroke="#d97706" stroke-width="1.8"/>
  <text x="${ox + unit}" y="204" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">1</text>
  <text x="${r2.x}" y="204" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">2</text>
  <line x1="${rP.x}" y1="${rP.y}" x2="${rM.x}" y2="${rM.y}" stroke="#d97706" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="246" y="99" font-size="10" font-weight="700" fill="#d97706" text-anchor="middle">conjugate pair</text>
  ${dot(rP.x, rP.y)}
  ${dot(rM.x, rM.y)}
  ${dot(r2.x, r2.y)}
  <text x="${rP.x + 16}" y="${rP.y - 6}" font-size="11" font-weight="700" fill="#166534">1 + i</text>
  <text x="${rM.x + 16}" y="${rM.y + 16}" font-size="11" font-weight="700" fill="#166534">1 − i</text>
  <text x="${r2.x}" y="${r2.y - 16}" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">2</text>
  <rect x="470" y="84" width="212" height="186" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>
  <text x="576" y="106" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">the σ census</text>
  <text x="482" y="132" font-size="10.5" font-weight="700" fill="#65a30d">σ₁ = α + β + γ</text>
  <text x="670" y="132" font-size="11.5" font-weight="700" fill="#ea580c" text-anchor="end">4</text>
  <text x="482" y="158" font-size="10.5" font-weight="700" fill="#65a30d">σ₂ = αβ + βγ + γα</text>
  <text x="670" y="158" font-size="11.5" font-weight="700" fill="#ea580c" text-anchor="end">6</text>
  <text x="482" y="184" font-size="10.5" font-weight="700" fill="#65a30d">σ₃ = αβγ</text>
  <text x="670" y="184" font-size="11.5" font-weight="700" fill="#ea580c" text-anchor="end">4</text>
  <text x="482" y="210" font-size="10.5" font-weight="700" fill="#65a30d">p₂ = σ₁² − 2σ₂</text>
  <text x="670" y="210" font-size="11.5" font-weight="700" fill="#ea580c" text-anchor="end">4</text>
  <text x="482" y="246" font-size="10" font-weight="700" fill="#0f766e">one real root + a conjugate pair</text>
  <text x="360" y="332" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">the roots are not nice — and every symmetric read is still priced from the coefficients alone</text>
</svg>`
}

function gpRoots83Svg(): string {
  // Figure C — the G.P. root picture: the roots 1, 2, 4 as chips on a
  // number line, amber ratio arcs ×2 between neighbours, and the census
  // panel (σ₁ = 7, σ₂ = 14 = σ₁ × the middle root, σ₃ = 8) feeding the
  // formed cubic x³ − 7x² + 14x − 8.
  const W = 720
  const H = 316
  const lineY = 150
  const xOf = (v: number) => 120 + v * 100
  const chips = [1, 2, 4]
  let out = ''
  for (const v of chips) {
    out += `<circle cx="${xOf(v)}" cy="${lineY}" r="12" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>` +
      `<text x="${xOf(v)}" y="${lineY + 4}" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">${v}</text>`
  }
  for (let v = 0; v <= 5; v++) {
    // tick marks only where no root chip sits (the chips mark 1, 2, 4)
    if (v !== 3 && v !== 5 && v !== 0) continue
    out += `<line x1="${xOf(v)}" y1="${lineY - 7}" x2="${xOf(v)}" y2="${lineY + 7}" stroke="#d97706" stroke-width="2"/>`
  }
  for (let v = 0; v <= 5; v++) {
    out += `<text x="${xOf(v)}" y="${lineY + 28}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${v}</text>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The geometric-progression root picture: on a number line from 0 to 5, three green root chips at 1, 2 and 4, each neighbour joined above by an amber arc labelled times 2 — the common ratio. The census panel below lists sigma-one equals 1 plus 2 plus 4 equals 7, sigma-three equals 1 times 2 times 4 equals 8, and sigma-two equals 2 plus 4 plus 8 equals 14, which equals sigma-one times the middle root 2 — the G.P. structure law. The formed cubic is x cubed minus 7 x squared plus 14 x minus 8.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">roots in geometric progression: {1, 2, 4} — the σ census</text>
  <line x1="60" y1="${lineY}" x2="652" y2="${lineY}" stroke="#0d9488" stroke-width="2.4"/>
  <path d="M 652 ${lineY} l -12 -6 v 12 z" fill="#0d9488"/>
  <path d="M 60 ${lineY} l 12 -6 v 12 z" fill="#0d9488"/>
  ${out}
  <path d="M ${xOf(1) + 10} 136 Q ${xOf(1.5)} 96 ${xOf(2) - 10} 136" fill="none" stroke="#ea580c" stroke-width="2.2"/>
  <path d="M ${xOf(2) - 14} 138 l 12 -6 l -4 10 z" fill="#ea580c"/>
  <text x="${xOf(1.5)}" y="98" font-size="11" font-weight="700" fill="#ea580c" text-anchor="middle">× 2</text>
  <path d="M ${xOf(2) + 10} 136 Q ${xOf(3)} 76 ${xOf(4) - 10} 136" fill="none" stroke="#ea580c" stroke-width="2.2"/>
  <path d="M ${xOf(4) - 14} 138 l 12 -6 l -4 10 z" fill="#ea580c"/>
  <text x="${xOf(3)}" y="78" font-size="11" font-weight="700" fill="#ea580c" text-anchor="middle">× 2</text>
  <rect x="100" y="196" width="520" height="88" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>
  <text x="360" y="220" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">σ₁ = 1 + 2 + 4 = 7 &#160;&#160; σ₃ = 1 · 2 · 4 = 8</text>
  <text x="360" y="244" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">σ₂ = 2 + 4 + 8 = 14 = σ₁ × (the middle root 2)</text>
  <text x="360" y="268" font-size="12" font-weight="700" text-anchor="middle" fill="#ea580c">formed cubic: x³ − 7x² + 14x − 8</text>
  <text x="360" y="302" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0d9488">the G.P. structure law: σ₂ = σ₁ · (middle root) — engine-swept on four progressions</text>
</svg>`
}

function sigmaChips83Svg(): string {
  // SOLUTION figure (v9.0) for exercise L2-2 — the σ ladder of the root
  // multiset {1,2,3,4}: four root chips, the four rungs with their term
  // counts, then the Newton reads p₂ = 30 and p₃ = 100.
  const W = 640
  const H = 348
  const chips = [
    { x: 190, label: '1' },
    { x: 275, label: '2' },
    { x: 360, label: '3' },
    { x: 445, label: '4' },
  ]
  let out = ''
  for (const ch of chips) {
    out += `<circle cx="${ch.x}" cy="64" r="13" fill="#16a34a" stroke="#166534" stroke-width="1.4"/>` +
      `<text x="${ch.x}" y="68.5" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">${ch.label}</text>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The sigma ladder of the root multiset 1, 2, 3, 4: four green root chips in a row, bracketed below by an amber rule, then four rung lines — sigma-one is 1 plus 2 plus 3 plus 4 equals 10; sigma-two is the six pairwise products 2, 3, 4, 6, 8 and 12 summing to 35; sigma-three is the four triple products 6, 8, 12 and 24 summing to 50; sigma-four is the product 24. The Newton reads follow: p two equals sigma-one squared minus two sigma-two equals 100 minus 70 equals 30, and p three equals sigma-one cubed minus three sigma-one sigma-two plus three sigma-three equals 1000 minus 1050 plus 150 equals 100.">
  <text x="320" y="24" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the σ ladder of {1, 2, 3, 4} — and the Newton reads</text>
  ${out}
  <line x1="176" y1="86" x2="459" y2="86" stroke="#d97706" stroke-width="2"/>
  <text x="320" y="112" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">four chips — the rungs choose them 1, 2, 3 and 4 at a time</text>
  <text x="60" y="144" font-size="11" font-weight="700" fill="#166534">σ₁ = 1 + 2 + 3 + 4</text>
  <text x="580" y="144" font-size="12" font-weight="700" fill="#ea580c" text-anchor="end">10</text>
  <text x="60" y="174" font-size="11" font-weight="700" fill="#166534">σ₂ = 2 + 3 + 4 + 6 + 8 + 12 (six pairs)</text>
  <text x="580" y="174" font-size="12" font-weight="700" fill="#ea580c" text-anchor="end">35</text>
  <text x="60" y="204" font-size="11" font-weight="700" fill="#166534">σ₃ = 6 + 8 + 12 + 24 (four triples)</text>
  <text x="580" y="204" font-size="12" font-weight="700" fill="#ea580c" text-anchor="end">50</text>
  <text x="60" y="234" font-size="11" font-weight="700" fill="#166534">σ₄ = 1 · 2 · 3 · 4</text>
  <text x="580" y="234" font-size="12" font-weight="700" fill="#ea580c" text-anchor="end">24</text>
  <line x1="60" y1="250" x2="580" y2="250" stroke="#fcd34d" stroke-width="2"/>
  <text x="60" y="278" font-size="11" font-weight="700" fill="#166534">p₂ = σ₁² − 2σ₂ = 100 − 70</text>
  <text x="580" y="278" font-size="12" font-weight="700" fill="#ea580c" text-anchor="end">30</text>
  <text x="60" y="308" font-size="11" font-weight="700" fill="#166534">p₃ = σ₁³ − 3σ₁σ₂ + 3σ₃ = 1000 − 1050 + 150</text>
  <text x="580" y="308" font-size="12" font-weight="700" fill="#ea580c" text-anchor="end">100</text>
  <text x="320" y="336" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0d9488">four chips, four rungs — the reads price the power sums without solving anything</text>
</svg>`
}

function shiftedRoots83Svg(): string {
  // SOLUTION figure (v9.0) for exercise L4-2 — the shifted-root picture:
  // the chips {1,2,3,4} below the number line, arrows +1 up to the
  // shifted chips {2,3,4,5} above it; the reciprocal-sum read through the
  // new staircase σ₃(Q)/σ₄(Q) = 154/120 = 77/60 in the band below.
  const W = 640
  const H = 300
  const lineY = 170
  const xOf = (v: number) => 110 + v * 98
  let out = ''
  for (let v = 0; v <= 5; v++) {
    // tick numerals below the line; the tick LINES are drawn only where no
    // chip sits (the green chips below mark 1..4, the amber chips above)
    out += `<text x="${xOf(v)}" y="${lineY + 22}" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">${v}</text>`
    if (v === 0 || v === 5) {
      out += `<line x1="${xOf(v)}" y1="${lineY - 6}" x2="${xOf(v)}" y2="${lineY + 6}" stroke="#d97706" stroke-width="2"/>`
    }
  }
  const arrows: [number, number][] = [[1, 2], [2, 3], [3, 4], [4, 5]]
  for (const [a, b] of arrows) {
    // each arrow leaves the green chip's top-right edge and lands just
    // below the shifted amber chip — never through a chip label
    out += `<line x1="${xOf(a) + 8}" y1="206" x2="${xOf(b) - 10}" y2="158" stroke="#ea580c" stroke-width="2.2"/>` +
      `<path d="M ${xOf(b) - 10} 158 l -12 4 l 8 8 z" fill="#ea580c"/>`
  }
  for (let v = 1; v <= 4; v++) {
    out += `<circle cx="${xOf(v)}" cy="212" r="9.5" fill="#16a34a" stroke="#166534" stroke-width="1.3"/>` +
      `<text x="${xOf(v)}" y="215.5" font-size="8.5" font-weight="700" fill="#ffffff" text-anchor="middle">${v}</text>` +
      `<circle cx="${xOf(v + 1)}" cy="146" r="9.5" fill="#ea580c" stroke="#166534" stroke-width="1.3"/>` +
      `<text x="${xOf(v + 1)}" y="149.5" font-size="8.5" font-weight="700" fill="#ffffff" text-anchor="middle">${v + 1}</text>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The shifted-root picture: a number line from 0 to 5 with the original root chips 1, 2, 3 and 4 below the line in green, each joined by an orange arrow up and to the right to the shifted chips 2, 3, 4 and 5 above the line in orange — every root of P moves to itself plus one. The band below states the reciprocal read: the sum of 1 over the quantity 1 plus r equals sigma-three of Q over sigma-four of Q, which is 154 over 120, which is 77 over 60, where Q is the shifted polynomial.">
  <text x="320" y="24" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the shifted polynomial Q(y) = P(y − 1): every root slides right by 1</text>
  <line x1="70" y1="${lineY}" x2="612" y2="${lineY}" stroke="#0d9488" stroke-width="2.4"/>
  <path d="M 612 ${lineY} l -12 -6 v 12 z" fill="#0d9488"/>
  ${out}
  <text x="64" y="150" font-size="10" font-weight="700" fill="#ea580c">Q: roots + 1</text>
  <text x="64" y="216" font-size="10" font-weight="700" fill="#166534">P: roots</text>
  <rect x="90" y="232" width="460" height="42" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>
  <text x="320" y="258" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">Σ 1/(1 + r) = σ₃(Q)/σ₄(Q) = 154/120 = 77/60</text>
  <text x="320" y="288" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0d9488">shift the roots, read the reciprocal sum off the new staircase — the 8.5 transformation cashed early</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 8.3                                                           */
/* ------------------------------------------------------------------ */

const lesson83: Lesson = {
  id: 'aa-cubics-and-quartics-the-symmetric-functions',
  number: '8.3',
  title: 'Cubics and Quartics: the Symmetric Functions',
  concepts: [
    'Viète’s staircase for the cubic',
    'Viète’s staircase for the quartic',
    'the general degree-n pattern (alternating signs)',
    'power sums by Newton’s identities',
    'reciprocal and pairwise reads',
    'forming equations from prescribed roots',
    'reads when the roots are not nice',
    'the factor-theorem cubic solve with the Viète audit',
  ],
  objectives: [
    'State and use the cubic staircase — $\\sigma_1 = -b/a$, $\\sigma_2 = c/a$, $\\sigma_3 = -d/a$ — and the quartic staircase, deriving both from the literal expansion of $(x - \\alpha)(x - \\beta)(x - \\gamma)$ and its four-factor extension.',
    'State the general degree-n law $\\sigma_k = (-1)^k a_k/a_0$ with the product rule $r_1 r_2 \\cdots r_n = (-1)^n a_n/a_0$, and place chapter 2’s quadratic reads as the $n = 2$ case of the same staircase.',
    'Express the power sums $\\Sigma r^2$ and $\\Sigma r^3$ through the $\\sigma$ rungs — $p_2 = \\sigma_1^2 - 2\\sigma_2$ and $p_3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3$ by Newton’s identities, the cubic case derived in full by the identity route — and price them on cubics and quartics without solving anything.',
    'Price the reciprocal and pairwise reads — $\\Sigma 1/r = \\sigma_2/\\sigma_3$, $\\Sigma_{i<j} r_i^2 r_j^2 = \\sigma_2^2 - 2\\sigma_1\\sigma_3$, and the shifted read $\\Sigma 1/(1+r)$ through a transformed polynomial — on both nice and not-nice root multisets, complex roots included.',
    'Form monic cubics and quartics from prescribed root multisets — including complex conjugate pairs and structured (geometric-progression, squared) multisets — using the $\\sigma$ census as the audit rather than long multiplication.',
    'Solve cubics by the factor theorem (rational-root hunt, divide, solve the quadratic quotient) and audit every claimed factorisation by Viète’s staircase: three sums, no division, every sign checked.',
    'Recognise the depressed cubic $x^3 + px + q$ reads ($\\sigma_1 = 0$, $\\sigma_2 = p$, $\\sigma_3 = -q$) and chapter 3’s roots of unity as banked ground the staircase re-prices.',
  ],
  prerequisites: ['aa-symmetric-reads-and-common-roots', 'aa-how-many-roots-degree-n-n-roots'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Chapter 2 ended its quadratic arc with a pricing discipline: the two reads $\\alpha + \\beta = -b/a$ and $\\alpha\\beta = c/a$ name the roots’ sum and product straight off the coefficients, and any SYMMETRIC expression in the roots — $\\alpha^2 + \\beta^2$, $\\alpha^3 + \\beta^3$, $\\alpha/\\beta + \\beta/\\alpha$, even $|\\alpha - \\beta|$ — collapses to arithmetic on that sum and product, with the roots themselves never solved for. That was the $n = 2$ staircase, and it carried an entire lesson (2.3) of reads, reconstructions and common-root censuses. The question this chapter must now answer is the obvious one: what survives at degree three and four?' },
    { kind: 'para', text: 'Everything survives — and grows rungs. Lesson 8.1 counted the roots honestly: a degree-$n$ equation with real or complex coefficients has exactly $n$ roots over the complex numbers, counted with multiplicity, and the factor theorem therefore factors the polynomial completely, $a_0x^n + a_1x^{n-1} + \\cdots + a_n = a_0(x - r_1)(x - r_2)\\cdots(x - r_n)$. Once the complete factorisation exists, the coefficients can be read off it by expanding — and the expansion hands over not two symmetric quantities but a whole STAIRCASE of them: the sum of the roots, the sum of pairwise products, the sum of triple products, and so on down to the single full product, with signs alternating rung by rung. This staircase is Viète’s theorem at degree three and four, and it is the engine room of this lesson.' },
    { kind: 'para', text: 'The craft turns genuinely hard — and genuinely useful — when the roots are NOT nice. A cubic such as $x^3 - 4x^2 + 6x - 4$ owns one real root and a conjugate pair $1 \\pm i$; a quartic such as $x^4 + x^2 + 1$ owns no real root at all, its four roots being the primitive sixth roots of unity from chapter 3. Nobody wants to solve those by hand. But the symmetric reads never needed the roots in the first place: the power sums $\\Sigma r^2$ and $\\Sigma r^3$ price through the rungs by Newton’s identities, the reciprocal sum $\\Sigma 1/r$ is a quotient of two rungs, and even $\\Sigma 1/(1 + r)$ yields to a one-line transformation of the polynomial. This lesson builds that machinery: the staircases for the cubic and the quartic, the general alternating-sign law, Newton’s power-sum identities, the reciprocal and pairwise reads, the forming of equations from prescribed roots — complex roots included — and the factor-theorem cubic solve, with Viète’s staircase standing behind every factorisation as a three-sum audit.' },

    { kind: 'heading', text: 'The Staircase for Cubics' },
    { kind: 'para', text: 'Let $\\alpha, \\beta, \\gamma$ be the roots of the cubic $ax^3 + bx^2 + cx + d = 0$ with $a \\neq 0$. By 8.1’s counting theorem the three roots exist over $\\mathbb{C}$ — with multiplicity — and the factor theorem licenses the complete factorisation $ax^3 + bx^2 + cx + d = a(x - \\alpha)(x - \\beta)(x - \\gamma)$. The three named symmetric functions of the roots are the rungs of the staircase:' },
    { kind: 'equation', latex: '\\sigma_1 = \\alpha + \\beta + \\gamma, \\qquad \\sigma_2 = \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha, \\qquad \\sigma_3 = \\alpha\\beta\\gamma', note: 'choose the roots one at a time for $\\sigma_1$, two at a time for $\\sigma_2$ (three terms), all three at once for $\\sigma_3$ — the rungs of the staircase, $\\binom{3}{k}$ terms strong.' },
    { kind: 'para', text: 'The derivation is one honest expansion — the same expand-and-compare move that produced chapter 2’s two reads, run one factor deeper. It is worth doing slowly once, because every higher staircase is built the same way.' },
    { kind: 'derivation', title: 'The cubic staircase, from the expansion', statement: 'Expand $a(x - \\alpha)(x - \\beta)(x - \\gamma)$ and compare coefficients with $ax^3 + bx^2 + cx + d$ to price every rung.', steps: [
      { label: 'Pair the first two factors', formula: '(x - \\alpha)(x - \\beta) = x^2 - (\\alpha + \\beta)x + \\alpha\\beta', explanation: 'This is chapter 2’s quadratic expansion in polynomial clothing — lesson 2.3’s two reads, $S = \\alpha + \\beta$ and $P = \\alpha\\beta$, arriving as the coefficients of a polynomial rather than as standalone formulas.' },
      { label: 'Multiply by the third factor', formula: '\\left[x^2 - (\\alpha + \\beta)x + \\alpha\\beta\\right](x - \\gamma) = x^3 - (\\alpha + \\beta + \\gamma)x^2 + (\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha)x - \\alpha\\beta\\gamma', explanation: 'Distribute term by term and collect: the $x^2$ seat gathers the three roots taken ONE at a time; the $x$ seat gathers the three PAIRWISE products; the constant seat is the TRIPLE product, its sign flipped by the three minus factors.' },
      { label: 'Compare coefficients against the left side', formula: 'b = -a\\sigma_1, \\qquad c = a\\sigma_2, \\qquad d = -a\\sigma_3', explanation: 'Matching the $x^2$ seat gives $b = -a\\sigma_1$, the $x$ seat gives $c = a\\sigma_2$, and the constant seat gives $d = -a\\sigma_3$ — divide each by the leading coefficient $a$ and the staircase stands.' },
    ], result: '$\\sigma_1 = \\alpha+\\beta+\\gamma = -\\tfrac{b}{a}$, \\qquad $\\sigma_2 = \\alpha\\beta+\\beta\\gamma+\\gamma\\alpha = \\tfrac{c}{a}$, \\qquad $\\sigma_3 = \\alpha\\beta\\gamma = -\\tfrac{d}{a}$' },
    { kind: 'callout', tone: 'theorem', title: 'Viète’s staircase for the cubic', text: 'If $\\alpha, \\beta, \\gamma$ are the roots of $ax^3 + bx^2 + cx + d = 0$ with $a \\neq 0$, then the roots are said to satisfy Viète’s relations: $\\alpha + \\beta + \\gamma = -\\dfrac{b}{a}$, $\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\dfrac{c}{a}$ and $\\alpha\\beta\\gamma = -\\dfrac{d}{a}$. Thus, the three elementary symmetric functions of the roots read straight off the coefficients — with signs $-, +, -$ down the staircase. The converse also holds: a monic cubic with prescribed rungs $\\sigma_1, \\sigma_2, \\sigma_3$ is $x^3 - \\sigma_1x^2 + \\sigma_2x - \\sigma_3$, whose roots are exactly the prescribed multiset counted with multiplicity.' },
    { kind: 'figure', caption: 'The Viète staircase: the three root chips $\\alpha, \\beta, \\gamma$ and the four rungs of the expanded monic cubic $(x-\\alpha)(x-\\beta)(x-\\gamma)$ — the power each rung sits on, the $\\sigma$ it equals, and the Viète read from $ax^3 + bx^2 + cx + d$ on the right, with the alternating signs flagged.', svg: vieteStaircase83Svg() },
    { kind: 'para', text: 'For example, the census runs both directions on a small witness:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the roots $\\{1, 2, 3\\}$ have $\\sigma_1 = 6$, $\\sigma_2 = 2 + 6 + 3 = 11$ and $\\sigma_3 = 6$, so the staircase reassembles them into the cubic $x^3 - 6x^2 + 11x - 6$;',
      '(ii) reading forward on that cubic, $\\sigma_1 = -\\tfrac{-6}{1} = 6$, $\\sigma_2 = \\tfrac{11}{1} = 11$ and $\\sigma_3 = -\\tfrac{-6}{1} = 6$ — the same three numbers, priced without touching a root;',
      '(iii) and the chapter 2 comparison: at $n = 2$ the same expansion reads $x^2 - (\\alpha + \\beta)x + \\alpha\\beta$, which is lesson 2.3’s $S$ and $P$ — the two-rung staircase this whole machinery generalises.',
    ] },
    { kind: 'example', title: 'Take the σ census of the cubic $x^3 - 6x^2 + 11x - 6$, whose roots are known to be $1, 2, 3$', steps: [
      'The staircase read: $\\sigma_1 = -\\tfrac{b}{a} = -\\tfrac{-6}{1} = 6$, $\\sigma_2 = \\tfrac{c}{a} = 11$ and $\\sigma_3 = -\\tfrac{d}{a} = -\\tfrac{-6}{1} = 6$.',
      'Now, audit the claimed root multiset $\\{1, 2, 3\\}$ against the rungs: $\\sigma_1 = 1 + 2 + 3 = 6$ ✓, $\\sigma_2 = 1 \\cdot 2 + 2 \\cdot 3 + 3 \\cdot 1 = 2 + 6 + 3 = 11$ ✓ and $\\sigma_3 = 1 \\cdot 2 \\cdot 3 = 6$ ✓.',
      'So, the multiset is certified — and the cubic must factor as $(x - 1)(x - 2)(x - 3)$, because a monic cubic is determined by its rungs.',
      'Hence $x^3 - 6x^2 + 11x - 6 = (x - 1)(x - 2)(x - 3)$, with the staircase certifying the factorisation without the division ever running.',
    ] },
    { kind: 'para', text: 'The staircase also prices the DEPRESSED cubic — the form with no $x^2$ seat that Cardan’s method (lesson 8.4) starts from. For $x^3 + px + q = 0$ the reads collapse to three one-liners: $\\sigma_1 = 0$ (the $x^2$ seat is empty), $\\sigma_2 = p$ and $\\sigma_3 = -q$. For instance $x^3 + 4x - 1$ carries $\\sigma_1 = 0$, $\\sigma_2 = 4$, $\\sigma_3 = 1$ — and the exercise set will use exactly these reads to price a pair-sum trick on it.' },
    { kind: 'formula', name: 'Viète’s staircase for the cubic', latex: 'a x^3 + b x^2 + c x + d = 0:\\quad \\alpha+\\beta+\\gamma = -\\tfrac{b}{a}, \\quad \\alpha\\beta+\\beta\\gamma+\\gamma\\alpha = \\tfrac{c}{a}, \\quad \\alpha\\beta\\gamma = -\\tfrac{d}{a}', note: 'signs alternate $-, +, -$ down the staircase — the $(-1)^k$ law in miniature.' },
    { kind: 'formula', name: 'The depressed cubic’s Viète', latex: 'x^3 + px + q = 0: \\quad \\sigma_1 = 0, \\quad \\sigma_2 = p, \\quad \\sigma_3 = -q', note: 'the $x^2$-free cubic — the form lesson 8.4’s Cardan engine starts from.' },
    { kind: 'example', title: 'Form the monic cubic whose roots are $2, 1 + i, 1 - i$', steps: [
      'Conjugate pairing first, by 8.1’s law for real coefficients: a cubic with real coefficients that owns the root $1 + i$ must also own $1 - i$ — so together with the real root $2$ the multiset is exactly $\\{2, 1 + i, 1 - i\\}$, three roots counted with multiplicity.',
      'The rungs: $\\sigma_1 = 2 + (1 + i) + (1 - i) = 4$; $\\sigma_2 = 2(1 + i) + 2(1 - i) + (1 + i)(1 - i) = 4 + 2 = 6$, where the pair’s product used chapter 3’s conjugate arithmetic $(1 + i)(1 - i) = |1 + i|^2 = 2$; and $\\sigma_3 = 2 \\cdot (1 + i)(1 - i) = 2 \\cdot 2 = 4$.',
      'So, the reconstruction law: the monic cubic is $x^3 - \\sigma_1x^2 + \\sigma_2x - \\sigma_3$, namely $x^3 - 4x^2 + 6x - 4$.',
      'Hence the cubic is $x^3 - 4x^2 + 6x - 4$ — one real root at $2$ and the conjugate pair $1 \\pm i$, assembled with the roots never being solved for as a set.',
    ] },

    { kind: 'heading', text: 'The Staircase for Quartics — and the General Pattern' },
    { kind: 'para', text: 'One more factor, one more rung. Let $\\alpha, \\beta, \\gamma, \\delta$ be the roots of $ax^4 + bx^3 + cx^2 + dx + e = 0$ with $a \\neq 0$. The complete factorisation $a(x - \\alpha)(x - \\beta)(x - \\gamma)(x - \\delta)$ expands by the cubic result times one more linear factor — the quartic staircase. The full expansion is exercise L6-2’s job (with a verification on $\\{1, 2, 3, 4\\}$); the pattern it produces is worth reading now, because it IS the general law:' },
    { kind: 'equation', latex: 'x^4 - \\sigma_1 x^3 + \\sigma_2 x^2 - \\sigma_3 x + \\sigma_4, \\qquad \\sigma_k = (-1)^k \\frac{a_k}{a_0}', note: 'where $\\sigma_4 = \\alpha\\beta\\gamma\\delta$; the quartic’s four rungs read $\\sigma_1 = -b/a$, $\\sigma_2 = c/a$, $\\sigma_3 = -d/a$, $\\sigma_4 = e/a$ — signs $-, +, -, +$.' },
    { kind: 'para', text: 'The single move that appends a rung: multiplying the cubic staircase polynomial by $(x - \\delta)$ turns $x^3 - \\sigma_1x^2 + \\sigma_2x - \\sigma_3$ into $x^4 - (\\sigma_1 + \\delta)x^3 + \\cdots$ — the old $\\sigma_1$ rung absorbs the new root, a new bottom rung $\\alpha\\beta\\gamma\\delta$ appears with a flipped sign, and every interior rung gains the terms involving $\\delta$. Counting terms as you go is the exam-room’s own check: the quartic’s $\\sigma_2$ has $\\binom{4}{2} = 6$ terms, $\\sigma_3$ has $\\binom{4}{3} = 4$ terms, and the rung $\\sigma_k$ of a degree-$n$ staircase always has $\\binom{n}{k}$.' },
    { kind: 'terms', items: [
      { term: 'elementary symmetric function σₖ', def: 'the sum of all products of the $n$ roots taken $k$ at a time: $\\sigma_k = \\sum r_{i_1} \\cdots r_{i_k}$ over the $\\binom{n}{k}$ choices — the $k$-th rung of the staircase.' },
      { term: 'Viète’s staircase', def: 'the full set of coefficient reads $\\sigma_k = (-1)^k a_k / a_0$ for a degree-$n$ equation — the sum, the pairwise sum, the triple sum, …, the product, signs alternating.' },
      { term: 'power sum pₖ', def: 'the symmetric function $p_k = r_1^k + r_2^k + \\cdots + r_n^k$ — priced through the $\\sigma$ rungs by Newton’s identities rather than by solving.' },
      { term: 'Newton’s identities', def: 'the conversion family between power sums and rungs: $p_2 = \\sigma_1^2 - 2\\sigma_2$, $p_3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3$, and for the quartic $p_4 = \\sigma_1p_3 - \\sigma_2p_2 + \\sigma_3p_1 - 4\\sigma_4$.' },
      { term: 'reciprocal sum', def: 'the symmetric read $\\sum 1/r_i = \\sigma_2/\\sigma_3$ for the cubic (and $\\sigma_3/\\sigma_4$ for the quartic) — priceable whenever the product rung is nonzero.' },
      { term: 'pairwise read', def: 'any symmetric demand built from pairs, e.g. $\\sum_{i<j} r_i^2 r_j^2 = \\sigma_2^2 - 2\\sigma_1\\sigma_3$ — which is exactly the $\\sigma_2$ of the squared roots.' },
      { term: 'root multiset', def: 'the $n$ roots counted WITH multiplicity (8.1’s census) — the staircase reads a multiset: the cubic with roots $2, 2, -3$ has rungs $\\sigma_1 = 1$, $\\sigma_2 = -8$, $\\sigma_3 = -12$, the repeated root contributing twice.' },
      { term: 'monic polynomial', def: 'leading coefficient $1$ — the reconstruction convention: prescribed roots form the MONIC answer $x^n - \\sigma_1 x^{n-1} + \\cdots$ unless a leading coefficient is demanded.' },
      { term: 'depressed cubic', def: 'the $x^2$-free form $x^3 + px + q$ — reads $\\sigma_1 = 0$, $\\sigma_2 = p$, $\\sigma_3 = -q$; the base form of lesson 8.4’s Cardan engine.' },
      { term: 'the Viète audit', def: 'certifying a claimed factorisation by pricing the rungs from the claimed roots and comparing with the coefficients — three sums for a cubic, no division, every sign checked.' },
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The general degree-n staircase', text: 'If $r_1, \\ldots, r_n$ are the roots of $a_0x^n + a_1x^{n-1} + \\cdots + a_n = 0$ with $a_0 \\neq 0$, then the sum of the products of the roots taken $k$ at a time is given by $\\sigma_k = (-1)^k\\,\\dfrac{a_k}{a_0}$ for $k = 1, \\ldots, n$. In particular the product of all the roots is $r_1r_2\\cdots r_n = (-1)^n\\,\\dfrac{a_n}{a_0}$, and the sum is $r_1 + \\cdots + r_n = -\\dfrac{a_1}{a_0}$. Thus, one alternating-sign law prices every rung of every staircase — the quadratic of chapter 2 ($k = 1, 2$), the cubic ($k = 1, 2, 3$) and the quartic ($k = 1, 2, 3, 4$) are its first three floors.' },
    { kind: 'para', text: 'The alternating signs deserve one slow look, because they are where examination marks are lost fastest. The rung $\\sigma_k$ is the sum of $k$-at-a-time products — always a POSITIVE-minded sum — but the COEFFICIENT it lands on carries $(-1)^k$: odd rungs sit on negative coefficients ($\\sigma_1$ lands on $-b/a$, $\\sigma_3$ on $-d/a$), even rungs on positive ones ($\\sigma_2$ on $c/a$, $\\sigma_4$ on $e/a$). The engine behind the flips is nothing deeper than the count of minus factors: expanding $(x - r_1)\\cdots(x - r_n)$, a term using $k$ of the $-r_i$ factors inherits exactly $k$ minus signs.' },
    { kind: 'equation', latex: 'a_0x^n + a_1x^{n-1} + \\cdots + a_n = 0 \\quad \\Longrightarrow \\quad \\sum_{i_1 < \\cdots < i_k} r_{i_1} \\cdots r_{i_k} = (-1)^k \\dfrac{a_k}{a_0}, \\qquad r_1r_2\\cdots r_n = (-1)^n \\dfrac{a_n}{a_0}', note: 'the full staircase in one line — the $k$-th rung is the sum of $k$-at-a-time products with sign $(-1)^k$; the bottom rung (the product of all $n$ roots) is the constant term with $n$ minus signs collected.' },
    { kind: 'table', caption: 'The staircase across degrees — one law, four floors (the chapter 2 cross-reference included)', head: ['Degree', 'the monic staircase', 'the rung reads (monic case)', 'cross-reference'], rows: [
      ['$n = 2$', '$x^2 - \\sigma_1x + \\sigma_2$', '$\\sigma_1 = -\\tfrac{b}{a}$, $\\sigma_2 = \\tfrac{c}{a}$', 'lesson 2.3 — $S$ and $P$, the two-rung case'],
      ['$n = 3$', '$x^3 - \\sigma_1x^2 + \\sigma_2x - \\sigma_3$', '$\\sigma_3 = -\\tfrac{d}{a}$', 'this lesson — the three-rung case'],
      ['$n = 4$', '$x^4 - \\sigma_1x^3 + \\sigma_2x^2 - \\sigma_3x + \\sigma_4$', '$\\sigma_3 = -\\tfrac{d}{a}$, $\\sigma_4 = \\tfrac{e}{a}$', 'this lesson — four rungs, $1 + 6 + 4 + 1$ terms'],
      ['$n$ general', '$x^n - \\sigma_1x^{n-1} + \\cdots + (-1)^k\\sigma_k x^{n-k} + \\cdots + (-1)^n\\sigma_n$', '$\\sigma_k = (-1)^k\\tfrac{a_k}{a_0}$, product $(-1)^n\\tfrac{a_n}{a_0}$', 'the formula card — every floor at once'],
    ] },
    { kind: 'example', title: 'Take the σ census of the quartic with roots $1, 2, 3, 4$, and price its power sums $p_2$ and $p_3$', steps: [
      'The four rungs, term by term: $\\sigma_1 = 1 + 2 + 3 + 4 = 10$; $\\sigma_2$ is the six pairwise products $2 + 3 + 4 + 6 + 8 + 12 = 35$; $\\sigma_3$ is the four triples $6 + 8 + 12 + 24 = 50$; $\\sigma_4 = 1 \\cdot 2 \\cdot 3 \\cdot 4 = 24$.',
      'So, the quartic assembles by the alternating-sign reconstruction: $x^4 - 10x^3 + 35x^2 - 50x + 24$ — rung by rung, signs $-, +, -, +$.',
      'Now, the power sums by Newton: $p_2 = \\sigma_1^2 - 2\\sigma_2 = 100 - 70 = 30$ and $p_3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3 = 1000 - 1050 + 150 = 100$ — the same Newton laws price the quartic, because $p_2$ and $p_3$ consult only the first three rungs.',
      'Check directly: $1 + 4 + 9 + 16 = 30$ ✓ and $1 + 8 + 27 + 64 = 100$ ✓.',
      'Hence $p_2 = 30$ and $p_3 = 100$ — priced through the staircase before a single root was cubed.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Viète, 1591 — the first symbolic algebra', text: 'François Viète (1540–1603), lawyer to the French court and codebreaker in the wars with Spain, published his Isagoge in artem analyticem in 1591: the first book to use LETTERS systematically for known quantities as well as unknowns — the birth of symbolic algebra, without which no staircase could even be written down. The root-coefficient relations that now carry his name were, for him, a tool of his “analytic art” of solving equations. Newton’s identities followed some seventy years later, and the symmetric-function viewpoint eventually grew into modern Galois theory — a door this book only names. This lesson’s title keeps the credit honest: the staircase is Viète’s, the power-sum engine is Newton’s, and the presentation is Cengage’s.' },

    { kind: 'heading', text: 'Power Sums and Reads — Newton’s Identities' },
    { kind: 'para', text: 'Chapter 2’s most-used reads were the power sums of two roots: $\\alpha^2 + \\beta^2 = S^2 - 2P$ and $\\alpha^3 + \\beta^3 = S^3 - 3PS$. At degree three the same demands appear with three roots, and the staircase prices them identically — by Newton’s identities. The $p_2$ law is a one-line consequence of squaring the first rung:' },
    { kind: 'equation', latex: '\\sigma_1^2 = (\\alpha + \\beta + \\gamma)^2 = \\underbrace{(\\alpha^2 + \\beta^2 + \\gamma^2)}_{p_2} + 2\\underbrace{(\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha)}_{\\sigma_2} \\;\\Longrightarrow\\; p_2 = \\sigma_1^2 - 2\\sigma_2', note: 'the same derivation as chapter 2’s $S^2 - 2P$, one root deeper — and it holds verbatim for the quartic and every higher degree, because the square of a sum never knows how many terms it has.' },
    { kind: 'para', text: 'The $p_3$ law is the one worth deriving in full, because its route — a classical algebraic identity rather than a brute expansion — is exactly the move the examination room rewards, and exercise L6-1 asks for it again with a repeated-root verification. The identity is the three-cube factorisation:' },
    { kind: 'derivation', title: 'Newton’s p₃ for the cubic — the identity route', statement: 'For the three roots $\\alpha, \\beta, \\gamma$ of any cubic, derive $p_3 = \\alpha^3 + \\beta^3 + \\gamma^3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3$ from the identity $\\alpha^3 + \\beta^3 + \\gamma^3 - 3\\alpha\\beta\\gamma = (\\alpha + \\beta + \\gamma)(\\alpha^2 + \\beta^2 + \\gamma^2 - \\alpha\\beta - \\beta\\gamma - \\gamma\\alpha)$.', steps: [
      { label: 'Translate the second bracket', formula: '\\alpha^2 + \\beta^2 + \\gamma^2 - \\alpha\\beta - \\beta\\gamma - \\gamma\\alpha = p_2 - \\sigma_2', explanation: 'The bracket is the power sum $p_2$ minus the second rung $\\sigma_2$ — the staircase’s own rungs are already sitting inside the identity, which is why the route is so cheap.' },
      { label: 'Rewrite the identity in rung language', formula: 'p_3 - 3\\sigma_3 = \\sigma_1\\,(p_2 - \\sigma_2)', explanation: 'The left side is $p_3 - 3\\sigma_3$ (the product rung with a factor 3), and the first factor on the right is exactly $\\sigma_1$ — this is the memorisation-friendly form, and it is itself a full identity worth recalling cold.' },
      { label: 'Substitute the p₂ law', formula: 'p_2 - \\sigma_2 = (\\sigma_1^2 - 2\\sigma_2) - \\sigma_2 = \\sigma_1^2 - 3\\sigma_2', explanation: 'Since $p_2 = \\sigma_1^2 - 2\\sigma_2$ was just priced, the bracket collapses to a difference of rungs.' },
      { label: 'Expand and collect', formula: 'p_3 = \\sigma_1(\\sigma_1^2 - 3\\sigma_2) + 3\\sigma_3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3', explanation: 'One distribution and the third power sum is a rung expression — no root was ever named, solved or squared.' },
    ], result: '$p_3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3$, \\qquad equivalently $p_3 - 3\\sigma_3 = \\sigma_1\\,(p_2 - \\sigma_2)$' },
    { kind: 'para', text: 'Two instantiations pin the law. On the multiset $\\{1, 2, 3\\}$: $p_2 = 36 - 22 = 14$ (direct: $1 + 4 + 9$ ✓) and $p_3 = 216 - 198 + 18 = 36$ (direct: $1 + 8 + 27$ ✓). On $\\{1, 2, 3, 4\\}$ the SAME formulas price the quartic: $p_2 = 30$, $p_3 = 100$, both audited above. And on the not-nice multiset behind $x^3 - 2x^2 - 5x + 6$ — roots $1, 3, -2$ — the rungs are $\\sigma_1 = 2$, $\\sigma_2 = -5$, $\\sigma_3 = -6$, so $p_2 = 4 + 10 = 14$ and $p_3 = 8 + 30 - 18 = 20$, agreeing with the direct sums $1 + 9 + 4$ and $1 + 27 - 8$. The family continues upward (for the quartic, Newton adds $p_4 = \\sigma_1p_3 - \\sigma_2p_2 + \\sigma_3p_1 - 4\\sigma_4$, which prices $1 + 16 + 81 + 256 = 354$ on $\\{1, 2, 3, 4\\}$ as $1000 - 1050 + 500 - 96 = 354$) — but $p_2$ and $p_3$ are the examination workhorses.' },
    { kind: 'formula', name: 'Newton’s p₂ (any degree)', latex: 'p_2 = r_1^2 + r_2^2 + \\cdots + r_n^2 = \\sigma_1^2 - 2\\sigma_2', note: 'square the first rung, subtract twice the second — degree-blind, so it prices cubics and quartics alike.' },
    { kind: 'formula', name: 'Newton’s p₃ (any degree)', latex: 'p_3 = r_1^3 + \\cdots + r_n^3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3', note: 'equivalently $p_3 - 3\\sigma_3 = \\sigma_1(p_2 - \\sigma_2)$; the quartic’s $p_4$ needs the extra rung: $\\sigma_1p_3 - \\sigma_2p_2 + \\sigma_3p_1 - 4\\sigma_4$.' },
    { kind: 'example', title: 'Price $\\sum r_i^2$, $\\sum r_i^3$ and $\\sum 1/r_i$ for the cubic $x^3 - 2x^2 - 5x + 6 = 0$ without solving it', steps: [
      'The staircase first: $\\sigma_1 = -\\tfrac{-2}{1} = 2$, $\\sigma_2 = \\tfrac{-5}{1} = -5$ and $\\sigma_3 = -\\tfrac{6}{1} = -6$.',
      'Now, the power sums: $p_2 = \\sigma_1^2 - 2\\sigma_2 = 4 + 10 = 14$ and $p_3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3 = 8 + 30 - 18 = 20$.',
      'The reciprocal read: $\\sum 1/r_i = \\tfrac{\\sigma_2}{\\sigma_3} = \\tfrac{-5}{-6} = \\tfrac{5}{6}$ — put the three reciprocals over the common denominator $\\alpha\\beta\\gamma$ and the numerator collapses to $\\sigma_2$ by symmetry.',
      'So, for the record, the roots happen to be $1, 3, -2$ (a factor-theorem solve, next section) — and the direct checks agree: $1 + 9 + 4 = 14$ ✓, $1 + 27 - 8 = 20$ ✓ and $1 + \\tfrac{1}{3} - \\tfrac{1}{2} = \\tfrac{5}{6}$ ✓.',
      'Hence all three reads were priced before the first root was ever named — lesson 2.3’s no-solve discipline, promoted to degree three.',
    ] },
    { kind: 'para', text: 'The reciprocal read generalises as a one-line law: since $\\tfrac{1}{\\alpha} + \\tfrac{1}{\\beta} + \\tfrac{1}{\\gamma} = \\tfrac{\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha}{\\alpha\\beta\\gamma}$, the sum of reciprocals of a cubic’s roots is $\\sigma_2/\\sigma_3$ — and the quartic analogue is $\\sigma_3/\\sigma_4$. On the witness multiset $\\{1, 2, 3\\}$ the read prices $1 + \\tfrac{1}{2} + \\tfrac{1}{3} = \\tfrac{11}{6}$, and on the roots $1, 3, -2$ of $x^3 - 2x^2 - 5x + 6$ it prices $\\tfrac{5}{6}$ — both audited inside Illustration 4. The law fails only when the product rung vanishes (a root at zero puts a reciprocal out of reach — the domain honesty chapter 2 taught at $S$-$P$ depth). A prettier cousin is the PAIRWISE-SQUARES read, the exact tool the squares-of-roots transformation will need: squaring $\\sigma_2$ counts each $r_i^2r_j^2$ once and each $r_i^2r_jr_k$-type cross twice, so' },
    { kind: 'equation', latex: '\\sum_{i<j} r_i^2 r_j^2 = \\sigma_2^2 - 2\\sigma_1\\sigma_3', note: 'witness: on $\\{1, 2, 3\\}$ the left side is $4 + 36 + 9 = 49$ and the rungs give $\\sigma_2^2 - 2\\sigma_1\\sigma_3 = 121 - 72 = 49$ — the read is literally the $\\sigma_2$ of the squared multiset $\\{1, 4, 9\\}$.' },
    { kind: 'formula', name: 'The reciprocal sum read', latex: '\\sum_{i=1}^{n} \\frac{1}{r_i} = \\frac{\\sigma_{n-1}}{\\sigma_n}', note: 'cubic: $\\sigma_2/\\sigma_3$; quartic: $\\sigma_3/\\sigma_4$ — priceable only when the product rung $\\sigma_n \\neq 0$.' },
    { kind: 'formula', name: 'The pairwise-squares read', latex: '\\sum_{i<j} r_i^2 r_j^2 = \\sigma_2^2 - 2\\sigma_1\\sigma_3', note: 'the second rung of the squared-root polynomial — the engine behind the squares-of-roots transformation below.' },
    { kind: 'para', text: 'Now the honest exhibit of this lesson’s promise — the reads when the roots are NOT nice. The quartic $x^4 + x^2 + 1$ has no real root at all: its discriminant story is chapter 3’s, not chapter 2’s. Planting a middle term and factoring the difference of squares gives $x^4 + x^2 + 1 = (x^2 + 1)^2 - x^2 = (x^2 + x + 1)(x^2 - x + 1)$, so its four roots are the two conjugate pairs $\\tfrac{-1 \\pm i\\sqrt{3}}{2}$ and $\\tfrac{1 \\pm i\\sqrt{3}}{2}$ — the primitive SIXTH roots of unity, chapter 3’s De Moivre ground. Nobody should have to hold those four points in hand to price the quartic’s reads; the staircase does it in one line:' },
    { kind: 'figure', caption: 'The reads without solving: the cubic $x^3 - 4x^2 + 6x - 4$ on the complex plane — one real root at $2$, the conjugate pair $1 \\pm i$ joined by the mirror line, and the σ census panel ($\\sigma_1 = 4$, $\\sigma_2 = 6$, $\\sigma_3 = 4$) with the power-sum read $p_2 = \\sigma_1^2 - 2\\sigma_2 = 4$.', svg: complexReads83Svg() },
    { kind: 'example', title: 'The quartic $x^4 + x^2 + 1$: factor it, name its four roots, and verify $\\sum r_i^2 = -2$', steps: [
      'Take the planted-middle-term route: $x^4 + x^2 + 1 = (x^2 + 1)^2 - x^2$ — a difference of squares.',
      'So, $x^4 + x^2 + 1 = (x^2 + x + 1)(x^2 - x + 1)$ — two quadratics, each with negative discriminant: the quartic has no real root at all.',
      'Now, the roots: $x^2 + x + 1 = 0$ gives $\\tfrac{-1 \\pm i\\sqrt{3}}{2}$ and $x^2 - x + 1 = 0$ gives $\\tfrac{1 \\pm i\\sqrt{3}}{2}$ — the four primitive sixth roots of unity $\\pm\\tfrac{1}{2} \\pm \\tfrac{\\sqrt{3}}{2}i$, each satisfying $r^6 = 1$ and no smaller power (chapter 3’s De Moivre lesson).',
      'The staircase census: $\\sigma_1 = 0$ (the $x^3$ seat is empty) and $\\sigma_2 = 1$ (the $x^2$ seat), so $p_2 = \\sigma_1^2 - 2\\sigma_2 = 0 - 2 = -2$.',
      'Check against the roots themselves: squaring the four roots gives $\\omega, \\omega^2$ twice over, so the four squares sum to $2(\\omega + \\omega^2) = 2(-1) = -2$ ✓.',
      'Hence a NEGATIVE sum of squares of four nonzero roots — impossible for real roots, routine for the complex ones, and priced either way without solving anything.',
    ] },
    { kind: 'para', text: 'One more read family completes the kit, and it cashes a promise lesson 8.5 will keep at full depth — the SHIFT. To price $\\sum 1/(1 + r_i)$ for a polynomial $P$ with roots $r_i$, build the shifted polynomial $Q(y) = P(y - 1)$: its roots are exactly $r_i + 1$, so the demanded sum is the reciprocal read OF THE SHIFTED STAIRCASE:' },
    { kind: 'equation', latex: '\\sum_i \\frac{1}{1 + r_i} = \\sum_i \\frac{1}{\\text{(roots of } Q)} = \\frac{\\sigma_3(Q)}{\\sigma_4(Q)}', note: 'the shift-and-read pattern — the same symmetric read, run on the transformed staircase; the quartic case shown, the cubic analogous with $\\sigma_2(Q)/\\sigma_3(Q)$.' },
    { kind: 'example', title: 'Evaluate $\\sum 1/(1 + r_i)$ for the root multiset $\\{1, 2, 3, 4\\}$ by the shifted-polynomial route', steps: [
      'Start from the assembled quartic $P(x) = x^4 - 10x^3 + 35x^2 - 50x + 24$ (roots $\\{1, 2, 3, 4\\}$).',
      'Shift: $Q(y) = P(y - 1)$ has roots $r_i + 1$, namely $\\{2, 3, 4, 5\\}$ — the transformation lesson 8.5 builds in general, cashed here for one read.',
      'Compute the shift by substitution: $Q(y) = (y-1)^4 - 10(y-1)^3 + 35(y-1)^2 - 50(y-1) + 24 = y^4 - 14y^3 + 71y^2 - 154y + 120$.',
      'Now, the reciprocal read on the new staircase: $\\sigma_3(Q) = 154$ and $\\sigma_4(Q) = 120$, so $\\sum 1/(1 + r_i) = \\tfrac{154}{120} = \\tfrac{77}{60}$.',
      'Check directly: $\\tfrac{1}{2} + \\tfrac{1}{3} + \\tfrac{1}{4} + \\tfrac{1}{5} = \\tfrac{30 + 20 + 15 + 12}{60} = \\tfrac{77}{60}$ ✓.',
      'Hence the shifted read and the direct sum agree — and no root of the original was ever inverted.',
    ] },

    { kind: 'heading', text: 'Forming and Solving' },
    { kind: 'para', text: 'FORMING an equation from a prescribed root multiset is the staircase run backwards: price the rungs from the multiset, then write the monic polynomial by the alternating-sign reconstruction law $x^n - \\sigma_1x^{n-1} + \\sigma_2x^{n-2} - \\cdots + (-1)^n\\sigma_n$. The multiplication of factors is never the method — it is the AUDIT. For example:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the multiset $\\{2, 3, 4\\}$ prices to $\\sigma_1 = 9$, $\\sigma_2 = 26$, $\\sigma_3 = 24$ — so the cubic is $x^3 - 9x^2 + 26x - 24$, with the long product $(x-2)(x-3)(x-4)$ as the check;',
      '(ii) the multiset $\\{1, \\omega, \\omega^2\\}$ (the cube roots of unity, chapter 3) prices to $\\sigma_1 = 0$, $\\sigma_2 = 0$, $\\sigma_3 = 1$ — so the cubic is simply $x^3 - 1$;',
      '(iii) the geometric progression $\\{1, 2, 4\\}$ prices to $\\sigma_1 = 7$, $\\sigma_2 = 14$, $\\sigma_3 = 8$ — so the cubic is $x^3 - 7x^2 + 14x - 8$, and the G.P. structure shows up as the law $\\sigma_2 = \\sigma_1 \\cdot (\\text{middle root}) = 7 \\cdot 2$.',
    ] },
    { kind: 'para', text: 'That last law is worth a second look, because structured multisets are an examination staple: for roots in geometric progression $a, ar, ar^2$, the rungs obey $\\sigma_2 = a^2r + a^2r^2 + a^2r^3 = a^2r(1 + r + r^2) = \\sigma_1 \\cdot (ar)$ — the second rung is ALWAYS the first rung times the middle root, whatever the ratio. (For an arithmetic progression the analogous law is $\\sigma_2 = \\tfrac{\\sigma_1^2}{3} - d^2$ with common difference $d$ — the same census discipline.) The formed cubic $x^3 - 7x^2 + 14x - 8$ carries its G.P. structure visibly: $14 = 7 \\times 2$.' },
    { kind: 'figure', caption: 'The G.P. root picture: the roots $1, 2, 4$ as chips on the number line with the amber ratio arcs $\\times 2$, the census panel $\\sigma_1 = 7$, $\\sigma_2 = 14 = \\sigma_1 \\times$ (the middle root), $\\sigma_3 = 8$, and the formed cubic $x^3 - 7x^2 + 14x - 8$.', svg: gpRoots83Svg() },
    { kind: 'para', text: 'The SQUARED-ROOTS transformation is the pairwise-squares read cashed as a forming tool. Given $x^3 - 6x^2 + 11x - 6$ with roots $\\{1, 2, 3\\}$, the cubic whose roots are the SQUARES $\\{1, 4, 9\\}$ prices its rungs directly from the old reads: the new $\\sigma_1$ is the old $p_2 = 14$; the new $\\sigma_2$ is the pairwise-squares read $\\sigma_2^2 - 2\\sigma_1\\sigma_3 = 121 - 72 = 49$; the new $\\sigma_3$ is $\\sigma_3^2 = 36$. So the answer assembles without ever squaring a root: $x^3 - 14x^2 + 49x - 36$. Lesson 8.5 generalises the craft (shift, scale, invert, and combine); here it is one rung-read away.' },
    { kind: 'para', text: 'SOLVING a cubic — when the roots are wanted as numbers — is the factor-theorem craft 8.1 and 8.2 built the census on: hunt a rational root among the candidates (factors of the constant over factors of the leading coefficient), divide out $(x - r)$, solve the quadratic quotient. What the staircase ADDS is the audit: after any factorisation, price the rungs from the claimed roots and compare with the coefficients — three sums, no division, every sign checked. A wrong factorisation cannot survive it.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the candidate list for $x^3 - 7x + 6$ is $\\pm 1, \\pm 2, \\pm 3, \\pm 6$; both $1$ and $2$ vanish the polynomial, and the division leaves $(x - 1)(x - 2)(x + 3)$;',
      '(ii) the audit on the claimed roots $\\{1, 2, -3\\}$: $\\sigma_1 = 0$ against $-b/a = 0$ ✓, $\\sigma_2 = -7$ against $c/a = -7$ ✓, $\\sigma_3 = -6$ against $-d/a = -6$ ✓ — certified;',
      '(iii) the census (8.1 + 8.2): three real roots, all rational, sign pattern $+\\; -\\; +$ with two variations — Descartes’ rule and the staircase telling the same story.',
    ] },
    { kind: 'example', title: 'Solve $x^3 - 7x + 6 = 0$ by the factor theorem and audit the roots by Viète', steps: [
      'Hunt the rational roots: candidates $\\pm 1, \\pm 2, \\pm 3, \\pm 6$ (factors of the constant $6$ over factors of the leading $1$).',
      'Test $x = 1$: $1 - 7 + 6 = 0$ ✓. Test $x = 2$: $8 - 14 + 6 = 0$ ✓.',
      'So, dividing out $(x - 1)(x - 2)$ leaves the quotient $x + 3$, and $x^3 - 7x + 6 = (x - 1)(x - 2)(x + 3)$ — claimed roots $1, 2, -3$.',
      'The Viète audit: $\\sigma_1 = 1 + 2 - 3 = 0 = -\\tfrac{b}{a}$ ✓; $\\sigma_2 = 1 \\cdot 2 + 2 \\cdot (-3) + (-3) \\cdot 1 = 2 - 6 - 3 = -7 = \\tfrac{c}{a}$ ✓; $\\sigma_3 = -6 = -\\tfrac{d}{a}$ ✓.',
      'Hence the solve is certified: the roots of $x^3 - 7x + 6 = 0$ are $1, 2, -3$ — three sums caught every sign before any mark was banked.',
    ] },
    { kind: 'para', text: 'The audit also catches the classic repeated-root cases, where a factorisation hides a multiplicity. For $x^3 - x^2 - 8x + 12$, testing $x = 2$ gives $8 - 4 - 16 + 12 = 0$ ✓, and dividing twice by $(x - 2)$ leaves $x + 3$: so $x^3 - x^2 - 8x + 12 = (x - 2)^2(x + 3)$, the root multiset $\\{2, 2, -3\\}$ — and the rungs check: $\\sigma_1 = 1$, $\\sigma_2 = 2 \\cdot 2 + 2(-3) + 2(-3) = -8$, $\\sigma_3 = -12$ (so the reads give $p_2 = 1 + 16 = 17$ and $\\sum 1/r = \\tfrac{-8}{-12} = \\tfrac{2}{3}$). For $x^3 - 3x^2 + 4x - 2$, testing $x = 1$ works and the quotient $x^2 - 2x + 2$ is irreducible over the reals: the multiset is $\\{1, 1 + i, 1 - i\\}$ with rungs $\\sigma_1 = 3$, $\\sigma_2 = 4$, $\\sigma_3 = 2$ — one real root and a conjugate pair, exactly the 8.1 census for an odd-degree real polynomial. Both solves ride the exercise set with their audits.' },
    { kind: 'callout', tone: 'warn', title: 'Caution: the three classic losses', text: 'First, the SIGNS: the staircase alternates — $\\sigma_3 = -d/a$, not $+d/a$, and for the quartic $\\sigma_4 = +e/a$ while $\\sigma_3 = -d/a$; rung $k$ carries $(-1)^k$, and half of all lost marks live in these flips. Second, NEVER assume the roots are real: $x^3 - 4x^2 + 6x - 4$ owns one real root and a conjugate pair, $x^4 + x^2 + 1$ owns none at all — yet the reads $\\Sigma r^2 = 4$ and $\\Sigma r^2 = -2$ price exactly over $\\mathbb{C}$, and a negative sum of squares is your signal that complex roots are present, not that the algebra failed. Third, FORM with $(x - r)$, never $(x + r)$: the root of $(x + 2)$ is $-2$ — forming with $(x + r)$ silently replaces the multiset $\\{r\\}$ by $\\{-r\\}$ and flips every odd rung. Audit the formed polynomial’s rungs against the prescribed multiset before writing it down.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Symmetric-read items are unit-2 staples of the JEE (Main) algebra block — the root-coefficient band of the quadratic-equations unit extends directly into these higher-degree reads, and the 2026 syllabus carries them under the theory of equations heading. The shapes, in frequency order: direct staircase reads on a given cubic or quartic ($\\sigma_1$, $\\sigma_2$, $\\sigma_3$ — including the $x^3 - 6x^2 + 11x - 6$ family with its sign traps); power-sum evaluations $\\Sigma r^2$, $\\Sigma r^3$ by Newton’s identities, on nice and on not-nice root sets; form-the-equation items from prescribed or structured multisets (complex pairs, geometric progressions, squared roots); reciprocal reads $\\Sigma 1/r = \\sigma_2/\\sigma_3$ and the shifted $\\Sigma 1/(1 + r)$; and the depressed-cubic pair-sum trick $\\Sigma(\\alpha + \\beta)^{-1}$, which is a disguised $-\\sigma_2/\\sigma_3$. All of these are exam-style in this book’s exercises — the discipline the examiner pays for is the Viète audit: three sums that make sign slips impossible.' },
    { kind: 'para', text: 'From the above discussion, it follows that the whole craft stands on four load-bearing habits: read the rungs with the $(-1)^k$ law attached; price every power or reciprocal demand through the rungs rather than the roots; form by the reconstruction law and audit by the census; and when the roots are not nice, trust the reads — they never needed the roots anyway. The quiz and the exercise ladder below cash each habit in turn.' },

    { kind: 'quiz', title: 'Check yourself: cubics and quartics, the symmetric functions', items: [
      { q: 'The roots of $x^3 - 6x^2 + 11x - 6 = 0$ have $\\sigma_1 = \\alpha + \\beta + \\gamma$ equal to', options: ['$6$', '$-6$', '$11$', '$1$'], answer: 0, explain: 'Option 0 is the first rung: $\\sigma_1 = -\\tfrac{b}{a} = -\\tfrac{-6}{1} = 6$ — the rung is read from the $x^2$ seat with its minus. Option 1 drops the leading minus: $-b/a$ is not $b/a$, and with $b = -6$ the sign flip matters. Option 2 reads the wrong rung: $11$ is $\\sigma_2 = \\tfrac{c}{a}$, the pairwise-products seat. Option 3 names $1$, which is the smallest ROOT, not any coefficient read — the staircase prices sums, not members.' },
      { q: 'For the same cubic, $\\sigma_2$ ($\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha$) is', options: ['$6$', '$11$', '$-11$', '$36$'], answer: 1, explain: 'Option 1 is the second rung: $\\sigma_2 = \\tfrac{c}{a} = 11$ — the even rungs sit on POSITIVE coefficient reads. Option 0 confuses the rungs: $6$ is $\\sigma_1$ (and, on this witness, also $\\sigma_3$ — the palindromic accident of the roots $1, 2, 3$). Option 2 imports a minus the law does not carry: $\\sigma_2$ is an even rung, $+c/a$, never $-c/a$. Option 3 squares the wrong rung: $36$ is $\\sigma_1^2$, which is the first move of the $p_2$ computation, not $\\sigma_2$ itself.' },
      { q: '$x^3 - 4x^2 + 6x - 4 = 0$ has roots $2, 1 \\pm i$. Then $\\sum r_i^2$ is', options: ['$4$', '$16$', '$12$', '$-4$'], answer: 0, explain: 'Option 0 is Newton’s read: $p_2 = \\sigma_1^2 - 2\\sigma_2 = 16 - 12 = 4$ — and the conjugate pair’s squares $(1 \\pm i)^2 = \\pm 2i$ cancel their imaginary parts against each other, so the sum is real without the roots being real. Option 1 stops at $\\sigma_1^2 = 16$, forgetting the $-2\\sigma_2$ correction. Option 2 is $2\\sigma_2$, the subtracted piece on its own. Option 3 invents a negative: $\\sum r^2 = -2$ belongs to the QUARTIC $x^4 + x^2 + 1$ of this lesson, whose four complex roots square to a negative sum — the cubic here has one real root and its $p_2$ is positive.' },
      { q: 'For the root multiset $\\{1, 2, 3, 4\\}$, the third rung $\\sigma_3$ (the sum of triple products) is', options: ['$50$', '$-50$', '$35$', '$24$'], answer: 0, explain: 'Option 0 is the quartic’s third rung: $\\sigma_3 = 1 \\cdot 2 \\cdot 3 + 1 \\cdot 2 \\cdot 4 + 1 \\cdot 3 \\cdot 4 + 2 \\cdot 3 \\cdot 4 = 6 + 8 + 12 + 24 = 50$, read off the assembled quartic as $-\\tfrac{d}{a} = -\\tfrac{-50}{1} = 50$. Option 1 mishandles the odd-rung sign: $-50$ is the $x$ COEFFICIENT of $x^4 - 10x^3 + 35x^2 - 50x + 24$, while the rung itself carries $(-1)^3 \\cdot (-50) = 50$. Option 2 reads the second rung: $35$ is $\\sigma_2$, the six pairwise products. Option 3 reads the bottom rung: $24$ is $\\sigma_4$, the full product.' },
      { q: 'If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 + px + q = 0$, then $\\alpha\\beta\\gamma$ equals', options: ['$q$', '$-q$', '$p$', '$-p$'], answer: 1, explain: 'Option 1 is the depressed cubic’s third rung: with the polynomial $x^3 + 0 \\cdot x^2 + px + q$, the staircase reads $\\sigma_3 = -\\tfrac{d}{a} = -q$ — the odd rung keeps its minus even when the $x^2$ seat is empty. Option 0 drops that minus: $q$ is the constant term, which equals $-\\sigma_3$, not $\\sigma_3$. Option 2 names $\\sigma_2$: $p$ is the pairwise-products rung $\\tfrac{c}{a}$. Option 3 is nothing in the staircase: $-p$ would be the second rung of $x^3 - px + q$, a different cubic.' },
    ] },

    { kind: 'exercises', title: 'Exercises 8.3', sets: [
      { level: 'L1', questions: [
        { q: 'Form the monic cubic whose roots are $2, 3, 4$.', solution: [
          'Price the rungs from the multiset: $\\sigma_1 = 2 + 3 + 4 = 9$, $\\sigma_2 = 2 \\cdot 3 + 3 \\cdot 4 + 4 \\cdot 2 = 6 + 12 + 8 = 26$ and $\\sigma_3 = 2 \\cdot 3 \\cdot 4 = 24$.',
          'So, the reconstruction law with alternating signs: $x^3 - \\sigma_1x^2 + \\sigma_2x - \\sigma_3$.',
          'Hence the cubic is $x^3 - 9x^2 + 26x - 24$, audited by the long product $(x - 2)(x - 3)(x - 4)$ agreeing coefficient by coefficient.',
        ], answer: '$x^3 - 9x^2 + 26x - 24 = 0$' },
        { q: 'Solve $x^3 - 2x^2 - 5x + 6 = 0$ by the factor theorem and audit by Viète.', solution: [
          'Hunt the rational roots: candidates $\\pm 1, \\pm 2, \\pm 3, \\pm 6$. Test $x = 1$: $1 - 2 - 5 + 6 = 0$ ✓.',
          'Now, divide out $(x - 1)$: the quotient is $x^2 - x - 6 = (x - 3)(x + 2)$.',
          'So, the claimed multiset is $\\{1, 3, -2\\}$; the Viète audit prices the rungs: $\\sigma_1 = 1 + 3 - 2 = 2 = -\\tfrac{b}{a}$ ✓, $\\sigma_2 = 3 - 6 - 2 = -5 = \\tfrac{c}{a}$ ✓, $\\sigma_3 = -6 = -\\tfrac{d}{a}$ ✓.',
          'Hence the roots are $1, 3, -2$ — certified by three sums, with the reads $p_2 = 14$, $p_3 = 20$, $\\sum 1/r = \\tfrac{5}{6}$ priced back in the lesson body.',
        ], answer: 'roots $1, 3, -2$ (σ₁ = 2, σ₂ = −5, σ₃ = −6 audited)' },
      ] },
      { level: 'L2', questions: [
        { q: 'The cubic $x^3 - 4x^2 + 6x - 4 = 0$ has roots $2, 1 \\pm i$. Evaluate $\\sum r_i^2$ without solving anything.', solution: [
          'The rungs: $\\sigma_1 = -\\tfrac{-4}{1} = 4$ and $\\sigma_2 = \\tfrac{6}{1} = 6$.',
          'Now, Newton’s law: $p_2 = \\sigma_1^2 - 2\\sigma_2 = 16 - 12 = 4$.',
          'Check the conjugate arithmetic directly: $(1 + i)^2 + (1 - i)^2 = 2i - 2i = 0$, so $p_2 = 2^2 + 0 = 4$ ✓ — the pair’s imaginary parts cancel, and the read is real even though two roots are not.',
          'Hence $\\sum r_i^2 = 4$, priced entirely from the coefficients.',
        ], answer: '$\\sum r_i^2 = 4$' },
        { q: 'For the root multiset $\\{1, 2, 3, 4\\}$, compute the power sums $p_2$ and $p_3$ through the σ rungs, and verify both directly.', solution: [
          'The four rungs: $\\sigma_1 = 10$, $\\sigma_2 = 2 + 3 + 4 + 6 + 8 + 12 = 35$, $\\sigma_3 = 6 + 8 + 12 + 24 = 50$ and $\\sigma_4 = 24$ — the ladder figure draws the census.',
          'Now, the Newton reads: $p_2 = \\sigma_1^2 - 2\\sigma_2 = 100 - 70 = 30$ and $p_3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3 = 1000 - 1050 + 150 = 100$.',
          'So, $p_2 = 30$ and $p_3 = 100$ — the same laws price the quartic because $p_2$ and $p_3$ consult only the first three rungs.',
          'Verify directly: $1 + 4 + 9 + 16 = 30$ ✓ and $1 + 8 + 27 + 64 = 100$ ✓.',
        ], answer: '$p_2 = 30$ and $p_3 = 100$', figures: [
          { caption: 'The σ ladder of the multiset {1, 2, 3, 4}: the four chips, the four rungs (10, 35, 50, 24) with their term counts, and the Newton reads p₂ = 100 − 70 = 30, p₃ = 1000 − 1050 + 150 = 100.', svg: sigmaChips83Svg() },
        ] },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $x^3 - 3x^2 + 4x - 2 = 0$ and take the root census (how many real, how many non-real).', solution: [
          'Hunt: candidates $\\pm 1, \\pm 2$. Test $x = 1$: $1 - 3 + 4 - 2 = 0$ ✓.',
          'Now, divide out $(x - 1)$: the quotient is $x^2 - 2x + 2$, whose discriminant is $(-2)^2 - 4 \\cdot 1 \\cdot 2 = -4 < 0$ — irreducible over the reals.',
          'So, $x^3 - 3x^2 + 4x - 2 = (x - 1)(x^2 - 2x + 2)$ and the roots are $1$ and $\\tfrac{2 \\pm \\sqrt{-4}}{2} = 1 \\pm i$.',
          'The Viète audit: $\\sigma_1 = 1 + (1 + i) + (1 - i) = 3 = -\\tfrac{b}{a}$ ✓, $\\sigma_2 = 1(1 + i) + 1(1 - i) + (1 + i)(1 - i) = 2 + 2 = 4$ ✓, $\\sigma_3 = 1 \\cdot 2 = 2 = -\\tfrac{d}{a}$ ✓.',
          'Hence the census: ONE real root and one conjugate pair — exactly 8.1’s law for a real odd-degree polynomial, and the three roots are accounted for with multiplicity.',
        ], answer: 'roots $1, 1 \\pm i$ — one real, one conjugate pair (σ census 3, 4, 2)' },
        { q: 'Solve $x^3 - x^2 - 8x + 12 = 0$, then read $\\sum r_i^2$ and $\\sum 1/r_i$ from the coefficients.', solution: [
          'Hunt: candidates $\\pm 1, \\pm 2, \\pm 3, \\pm 4, \\pm 6, \\pm 12$. Test $x = 2$: $8 - 4 - 16 + 12 = 0$ ✓.',
          'Now, divide out $(x - 2)$: the quotient is $x^2 + x - 6 = (x - 2)(x + 3)$ — so $x^3 - x^2 - 8x + 12 = (x - 2)^2(x + 3)$ and the multiset is $\\{2, 2, -3\\}$, the root $2$ with multiplicity two.',
          'The audit: $\\sigma_1 = 2 + 2 - 3 = 1$ ✓, $\\sigma_2 = 4 - 6 - 6 = -8$ ✓, $\\sigma_3 = 2 \\cdot 2 \\cdot (-3) = -12$ ✓ — the repeated root contributes twice, exactly as the multiset demands.',
          'Now, the reads: $p_2 = \\sigma_1^2 - 2\\sigma_2 = 1 + 16 = 17$ and $\\sum 1/r_i = \\tfrac{\\sigma_2}{\\sigma_3} = \\tfrac{-8}{-12} = \\tfrac{2}{3}$.',
          'Check directly: $4 + 4 + 9 = 17$ ✓ and $\\tfrac{1}{2} + \\tfrac{1}{2} - \\tfrac{1}{3} = \\tfrac{2}{3}$ ✓ — the repeated root’s reciprocal counted twice.',
          'Hence the roots are $2, 2, -3$ with the reads priced from the coefficients alone.',
        ], answer: 'roots $2, 2, -3$; $\\sum r_i^2 = 17$, $\\sum 1/r_i = \\tfrac{2}{3}$' },
        { q: 'Form the monic cubic whose roots are $1, \\omega, \\omega^2$, where $\\omega$ is a primitive cube root of unity, and take the σ census.', solution: [
          'Chapter 3’s ground: $1 + \\omega + \\omega^2 = 0$ and $\\omega^3 = 1$, with $\\omega = \\tfrac{-1 + i\\sqrt{3}}{2}$.',
          'The rungs: $\\sigma_1 = 1 + \\omega + \\omega^2 = 0$; $\\sigma_2 = \\omega + \\omega^2 + \\omega^3 = \\omega + \\omega^2 + 1 = 0$ (the same identity in cyclic clothing); $\\sigma_3 = \\omega^3 = 1$.',
          'So, the reconstruction law: $x^3 - 0 \\cdot x^2 + 0 \\cdot x - 1$.',
          'Hence the cubic is $x^3 - 1 = 0$ — and the audit by factoring, $x^3 - 1 = (x - 1)(x^2 + x + 1)$, confirms the three roots $1, \\omega, \\omega^2$ with the empty rungs explaining why the polynomial is so short.',
        ], answer: '$x^3 - 1 = 0$ (σ₁ = σ₂ = 0, σ₃ = 1)' },
      ] },
      { level: 'L4', questions: [
        { q: 'Form the monic cubic whose roots are in geometric progression $1, 2, 4$, and verify the G.P. structure law $\\sigma_2 = \\sigma_1 \\cdot$ (the middle root).', solution: [
          'The rungs: $\\sigma_1 = 1 + 2 + 4 = 7$, $\\sigma_2 = 1 \\cdot 2 + 2 \\cdot 4 + 4 \\cdot 1 = 2 + 8 + 4 = 14$ and $\\sigma_3 = 1 \\cdot 2 \\cdot 4 = 8$.',
          'So, the cubic is $x^3 - 7x^2 + 14x - 8$, and the structure law checks on the spot: $\\sigma_2 = 14 = 7 \\cdot 2 = \\sigma_1 \\cdot$ (the middle root).',
          'Now, the general G.P. law: for roots $a, ar, ar^2$, $\\sigma_2 = a^2r + a^2r^2 + a^2r^3 = a^2r(1 + r + r^2)$ while $\\sigma_1 \\cdot (ar) = a(1 + r + r^2) \\cdot ar = a^2r(1 + r + r^2)$ — identical, whatever the ratio and whatever the first term.',
          'Hence $x^3 - 7x^2 + 14x - 8$, with the G.P. structure reading straight off the rungs — an instant check for any formed cubic whose roots are known to be in progression.',
        ], answer: '$x^3 - 7x^2 + 14x - 8 = 0$; $\\sigma_2 = \\sigma_1 \\cdot 2 = 14$' },
        { q: 'For the root multiset $\\{1, 2, 3, 4\\}$ evaluate $\\sum 1/(1 + r_i)$ by the shifted-polynomial route.', solution: [
          'Start from the assembled quartic $P(x) = x^4 - 10x^3 + 35x^2 - 50x + 24$ with roots $\\{1, 2, 3, 4\\}$.',
          'Build the shifted polynomial $Q(y) = P(y - 1)$: substituting and expanding, $Q(y) = y^4 - 14y^3 + 71y^2 - 154y + 120$, with roots $r_i + 1$, namely $\\{2, 3, 4, 5\\}$ — the transformation lesson 8.5 cashes in general.',
          'Now, the reciprocal read transfers: $\\sum 1/(1 + r_i) = \\sum 1/(\\text{roots of } Q) = \\tfrac{\\sigma_3(Q)}{\\sigma_4(Q)}$.',
          'The new rungs: $\\sigma_3(Q) = 2 \\cdot 3 \\cdot 4 + 3 \\cdot 4 \\cdot 5 + 4 \\cdot 5 \\cdot 2 + 5 \\cdot 2 \\cdot 3 = 24 + 60 + 40 + 30 = 154$ and $\\sigma_4(Q) = 2 \\cdot 3 \\cdot 4 \\cdot 5 = 120$.',
          'So, $\\sum 1/(1 + r_i) = \\tfrac{154}{120} = \\tfrac{77}{60}$ — matching the direct sum $\\tfrac{1}{2} + \\tfrac{1}{3} + \\tfrac{1}{4} + \\tfrac{1}{5} = \\tfrac{30 + 20 + 15 + 12}{60} = \\tfrac{77}{60}$ ✓.',
        ], answer: '$\\tfrac{77}{60}$', figures: [
          { caption: 'The shifted-root picture: the chips {1, 2, 3, 4} slide right by 1 to {2, 3, 4, 5} under Q(y) = P(y − 1), and the reciprocal sum reads off the new staircase as σ₃(Q)/σ₄(Q) = 154/120 = 77/60.', svg: shiftedRoots83Svg() },
        ] },
        { q: 'Form the monic cubic whose roots are the SQUARES of the roots of $x^3 - 6x^2 + 11x - 6 = 0$.', solution: [
          'The old rungs: $\\sigma_1 = 6$, $\\sigma_2 = 11$, $\\sigma_3 = 6$ (roots $\\{1, 2, 3\\}$).',
          'Price the NEW rungs by the reads, never by squaring a root: the new $\\sigma_1$ is the old power sum $p_2 = \\sigma_1^2 - 2\\sigma_2 = 36 - 22 = 14$; the new $\\sigma_2$ is the pairwise-squares read $\\sigma_2^2 - 2\\sigma_1\\sigma_3 = 121 - 72 = 49$; the new $\\sigma_3$ is $\\sigma_3^2 = 36$.',
          'So, the formed cubic is $x^3 - 14x^2 + 49x - 36$.',
          'Hence, auditing by the literal expansion: $(x - 1)(x - 4)(x - 9) = x^3 - 14x^2 + 49x - 36$ ✓ — the squares $\\{1, 4, 9\\}$ price to rungs $14, 49, 36$, exactly as the reads promised.',
        ], answer: '$x^3 - 14x^2 + 49x - 36 = 0$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Derive Newton’s $p_2$ and $p_3$ identities for a cubic, and verify both on $x^3 - 2x^2 - 5x + 6 = 0$.', solution: [
          'For $p_2$: square the first rung, $\\sigma_1^2 = (\\alpha + \\beta + \\gamma)^2 = (\\alpha^2 + \\beta^2 + \\gamma^2) + 2(\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha)$, and solve for the bracket: $p_2 = \\sigma_1^2 - 2\\sigma_2$.',
          'For $p_3$: start from the three-cube identity $\\alpha^3 + \\beta^3 + \\gamma^3 - 3\\alpha\\beta\\gamma = (\\alpha + \\beta + \\gamma)(\\alpha^2 + \\beta^2 + \\gamma^2 - \\alpha\\beta - \\beta\\gamma - \\gamma\\alpha)$; the second bracket is $p_2 - \\sigma_2$, so $p_3 - 3\\sigma_3 = \\sigma_1(p_2 - \\sigma_2)$.',
          'Now, substitute $p_2 = \\sigma_1^2 - 2\\sigma_2$: $p_3 - 3\\sigma_3 = \\sigma_1(\\sigma_1^2 - 3\\sigma_2)$, hence $p_3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3$.',
          'The verification cubic: $\\sigma_1 = 2$, $\\sigma_2 = -5$, $\\sigma_3 = -6$, so $p_2 = 4 + 10 = 14$ and $p_3 = 8 + 30 - 18 = 20$.',
          'So, direct from the roots $1, 3, -2$: $1 + 9 + 4 = 14$ ✓ and $1 + 27 - 8 = 20$ ✓ — both identities hold with the roots never solved for in the pricing step.',
        ], answer: 'derived; verified: $p_2 = 14$, $p_3 = 20$ on $x^3 - 2x^2 - 5x + 6$' },
        { q: 'If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 + 4x - 1 = 0$, evaluate $\\sum (\\alpha + \\beta)^{-1}$.', solution: [
          'The depressed cubic reads: $\\sigma_1 = 0$, $\\sigma_2 = 4$ and $\\sigma_3 = -q = 1$.',
          'Now, the pair-sum trick: because $\\sigma_1 = 0$, each pair sum collapses — $\\alpha + \\beta = -\\gamma$, $\\beta + \\gamma = -\\alpha$, $\\gamma + \\alpha = -\\beta$.',
          'So, $\\sum (\\alpha + \\beta)^{-1} = -\\left(\\tfrac{1}{\\alpha} + \\tfrac{1}{\\beta} + \\tfrac{1}{\\gamma}\\right) = -\\tfrac{\\sigma_2}{\\sigma_3}$ — the reciprocal read with one minus.',
          'Hence $\\sum (\\alpha + \\beta)^{-1} = -\\tfrac{4}{1} = -4$ — priced from two rungs, the cubic’s actual roots (one real, one conjugate pair) never consulted.',
        ], answer: '$-4$' },
        { q: 'Factor $x^4 + x^2 + 1$, state its four roots, and verify $\\sum r_i^2 = -2$.', solution: [
          'Plant the middle term: $x^4 + x^2 + 1 = (x^2 + 1)^2 - x^2$ — a difference of squares.',
          'So, $x^4 + x^2 + 1 = (x^2 + x + 1)(x^2 - x + 1)$, both factors with negative discriminant.',
          'Now, the roots: $\\tfrac{-1 \\pm i\\sqrt{3}}{2}$ from the first factor and $\\tfrac{1 \\pm i\\sqrt{3}}{2}$ from the second — together the four primitive sixth roots of unity $\\pm\\tfrac{1}{2} \\pm \\tfrac{\\sqrt{3}}{2}i$, chapter 3’s De Moivre ground (each satisfies $r^6 = 1$ and no smaller power).',
          'The staircase census: $\\sigma_1 = 0$ (no $x^3$ seat) and $\\sigma_2 = 1$ (the $x^2$ seat), so $p_2 = \\sigma_1^2 - 2\\sigma_2 = -2$.',
          'Verify on the roots: squaring the four roots gives $\\omega, \\omega^2$ twice over, so the four squares sum to $2(\\omega + \\omega^2) = 2(-1) = -2$ ✓ — a negative sum of squares, the complex-root signature.',
        ], answer: '$(x^2 + x + 1)(x^2 - x + 1)$; roots the primitive sixth roots of unity; $\\sum r_i^2 = -2$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove $p_3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3$ by the identity route, and verify it on $x^3 - x^2 - 8x + 12 = 0$.', solution: [
          'State the identity: for any three numbers, $\\alpha^3 + \\beta^3 + \\gamma^3 - 3\\alpha\\beta\\gamma = (\\alpha + \\beta + \\gamma)(\\alpha^2 + \\beta^2 + \\gamma^2 - \\alpha\\beta - \\beta\\gamma - \\gamma\\alpha)$ — provable by expanding the right side and cancelling.',
          'Translate: the right side’s second bracket is $p_2 - \\sigma_2$ and its first factor is $\\sigma_1$, while the left side is $p_3 - 3\\sigma_3$; so $p_3 - 3\\sigma_3 = \\sigma_1(p_2 - \\sigma_2)$.',
          'Now, insert $p_2 = \\sigma_1^2 - 2\\sigma_2$: $p_3 - 3\\sigma_3 = \\sigma_1(\\sigma_1^2 - 3\\sigma_2)$, hence $p_3 = \\sigma_1^3 - 3\\sigma_1\\sigma_2 + 3\\sigma_3$.',
          'The verification cubic has roots $\\{2, 2, -3\\}$ with rungs $\\sigma_1 = 1$, $\\sigma_2 = -8$, $\\sigma_3 = -12$: the identity route prices $p_3 = 1 - 3(1)(-8) + 3(-12) = 1 + 24 - 36 = -11$.',
          'So, direct from the multiset: $8 + 8 - 27 = -11$ ✓ — the repeated root contributing twice, and the identity never caring.',
        ], answer: 'proved; on $x^3 - x^2 - 8x + 12$, $\\sum r_i^3 = -11$ ($8 + 8 - 27$)' },
        { q: 'Prove the quartic staircase by expanding $(x - \\alpha)(x - \\beta)(x - \\gamma)(x - \\delta)$, and verify it on the multiset $\\{1, 2, 3, 4\\}$.', solution: [
          'Start from the cubic staircase already proved: $(x - \\alpha)(x - \\beta)(x - \\gamma) = x^3 - \\sigma_1^{(3)}x^2 + \\sigma_2^{(3)}x - \\sigma_3^{(3)}$ where the rungs are over the triple $\\alpha, \\beta, \\gamma$.',
          'Multiply by $(x - \\delta)$: $x^4 - (\\sigma_1^{(3)} + \\delta)x^3 + (\\sigma_2^{(3)} + \\delta\\sigma_1^{(3)})x^2 - (\\sigma_3^{(3)} + \\delta\\sigma_2^{(3)})x + \\delta\\sigma_3^{(3)}$ — distribute and collect seat by seat.',
          'Now, name the collected rungs: $\\sigma_1 = \\sigma_1^{(3)} + \\delta = \\alpha + \\beta + \\gamma + \\delta$; $\\sigma_2 = \\sigma_2^{(3)} + \\delta\\sigma_1^{(3)} = \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha + \\delta(\\alpha + \\beta + \\gamma)$ — the six pairwise products; $\\sigma_3 = \\sigma_3^{(3)} + \\delta\\sigma_2^{(3)}$ — the four triple products; $\\sigma_4 = \\delta\\sigma_3^{(3)} = \\alpha\\beta\\gamma\\delta$.',
          'Compare with $ax^4 + bx^3 + cx^2 + dx + e = a$ times the expansion: $\\sigma_1 = -\\tfrac{b}{a}$, $\\sigma_2 = \\tfrac{c}{a}$, $\\sigma_3 = -\\tfrac{d}{a}$, $\\sigma_4 = \\tfrac{e}{a}$ — signs $-, +, -, +$, the $(-1)^k$ law at its fourth floor.',
          'Verify on $\\{1, 2, 3, 4\\}$: $\\sigma_1 = 10$, $\\sigma_2 = 35$, $\\sigma_3 = 50$, $\\sigma_4 = 24$ price the expansion $x^4 - 10x^3 + 35x^2 - 50x + 24$ — and the literal product $(x - 1)(x - 2)(x - 3)(x - 4)$ agrees coefficient by coefficient ✓.',
        ], answer: 'proved; verified: $\\sigma_1 = 10, \\sigma_2 = 35, \\sigma_3 = 50, \\sigma_4 = 24$ on {1, 2, 3, 4}' },
      ] },
    ] },

    { kind: 'formula', name: 'The general σₖ law', latex: 'a_0x^n + a_1x^{n-1} + \\cdots + a_n = 0: \\quad \\sigma_k = (-1)^k\\,\\frac{a_k}{a_0}, \\qquad r_1r_2\\cdots r_n = (-1)^n\\,\\frac{a_n}{a_0}', note: 'every floor of the staircase at once — the coefficient of $x^{n-k}$ is $(-1)^k\\sigma_k a_0$; the quadratic of chapter 2 is the $n = 2$ case.' },
    { kind: 'formula', name: 'Viète’s staircase for the quartic', latex: 'ax^4 + bx^3 + cx^2 + dx + e = 0: \\quad \\sigma_1 = -\\tfrac{b}{a}, \\; \\sigma_2 = \\tfrac{c}{a}, \\; \\sigma_3 = -\\tfrac{d}{a}, \\; \\sigma_4 = \\tfrac{e}{a}', note: 'four rungs — $1, 6, 4, 1$ terms strong; signs $-, +, -, +$.' },
    { kind: 'formula', name: 'The monic reconstruction (forming)', latex: '\\text{roots } \\{r_1, \\ldots, r_n\\} \\;\\longrightarrow\\; x^n - \\sigma_1x^{n-1} + \\sigma_2x^{n-2} - \\cdots + (-1)^n\\sigma_n', note: 'form the equation by pricing the rungs and alternating the signs — the long product is the audit, never the method.' },
  ],
}


// ------------------------------------------------------------------
// lesson 8.4 — authored by the run-119 swarm (the 084 agent), integrated verbatim
// ------------------------------------------------------------------

function threeCases84Svg(): string {
  // Figure A — the three Δ cases as three actually-sampled cubic curves:
  // panel 1 x³+3x+1 (Δ<0, one real root at −0.32), panel 2 x³−3x+2
  // (Δ=0, the double root 1 touching, the simple root −2 crossing),
  // panel 3 x³−7x+6 (Δ>0, three crossings −3, 1, 2). Every polyline is
  // generated by evaluating the polynomial at 48 sample points — the
  // geometry IS the mathematics.
  const panels = [
    {
      title: 'Delta < 0: ONE real root',
      sub: 'x³ + 3x + 1',
      delta: 'Delta = −135 < 0',
      f: (x: number) => x * x * x + 3 * x + 1,
      x0: -1.7, x1: 1.3, y0: -9.6, y1: 7.6,
      roots: [{ x: -0.3222, label: 'root −0.32', double: false }],
      note: 'monotone — one crossing',
    },
    {
      title: 'Delta = 0: a REPEATED root',
      sub: 'x³ − 3x + 2',
      delta: 'Delta = 0',
      f: (x: number) => x * x * x - 3 * x + 2,
      x0: -2.7, x1: 1.9, y0: -10, y1: 6,
      roots: [
        { x: -2, label: 'root −2', double: false },
        { x: 1, label: 'double root 1', double: true },
      ],
      note: 'the local minimum sits ON the axis',
    },
    {
      title: 'Delta > 0: THREE real roots',
      sub: 'x³ − 7x + 6',
      delta: 'Delta = 400 > 0',
      f: (x: number) => x * x * x - 7 * x + 6,
      x0: -3.5, x1: 2.7, y0: -11, y1: 14,
      roots: [
        { x: -3, label: 'root −3', double: false },
        { x: 1, label: 'root 1', double: false },
        { x: 2, label: 'root 2', double: false },
      ],
      note: 'hump and dip — three crossings',
    },
  ]
  const W = 720
  const H = 318
  const panelW = 226
  const gap = 11
  const plotTop = 68
  const plotBot = 234
  let body = ''
  panels.forEach((p, i) => {
    const left = 12 + i * (panelW + gap)
    const cx = left + panelW / 2
    const px = (x: number) => left + ((x - p.x0) / (p.x1 - p.x0)) * panelW
    const py = (y: number) => plotBot - ((y - p.y0) / (p.y1 - p.y0)) * (plotBot - plotTop)
    // frame + axis
    body += `<rect x="${left}" y="${plotTop - 12}" width="${panelW}" height="${plotBot - plotTop + 24}" rx="7" fill="#fffdf5" stroke="#16a34a" stroke-width="1.4"/>`
    body += `<line x1="${left + 6}" y1="${py(0)}" x2="${left + panelW - 6}" y2="${py(0)}" stroke="#0d9488" stroke-width="1.6"/>`
    // integer ticks
    for (let t = Math.ceil(p.x0); t <= Math.floor(p.x1); t++) {
      if (Math.abs(t) < 1e-9) continue
      body += `<line x1="${px(t)}" y1="${py(0) - 4}" x2="${px(t)}" y2="${py(0) + 4}" stroke="#0d9488" stroke-width="1.1"/>`
      body += `<text x="${px(t)}" y="${py(0) + 15}" font-size="8.5" fill="#65a30d" text-anchor="middle">${t}</text>`
    }
    // the sampled curve — the x-domain is inset 8% per side so the curve's
    // endpoints sit visibly INSIDE the frame (no edge-truncation reads)
    const N = 48
    const inset = (p.x1 - p.x0) * 0.08
    let pts = ''
    for (let k = 0; k <= N; k++) {
      const x = p.x0 + inset + ((p.x1 - p.x0 - 2 * inset) * k) / N
      pts += `${px(x).toFixed(1)},${py(p.f(x)).toFixed(1)} `
    }
    body += `<polyline points="${pts.trim()}" fill="none" stroke="#d97706" stroke-width="2.4"/>`
    // roots
    p.roots.forEach((rt) => {
      const rx = px(rt.x)
      if (rt.double) {
        body += `<circle cx="${rx}" cy="${py(0)}" r="7.5" fill="none" stroke="#ea580c" stroke-width="2.4"/>`
        body += `<circle cx="${rx}" cy="${py(0)}" r="3" fill="#ea580c"/>`
      } else {
        body += `<circle cx="${rx}" cy="${py(0)}" r="4.6" fill="#ea580c" stroke="#166534" stroke-width="1.2"/>`
      }
    })
    // labels
    body += `<text x="${cx}" y="${plotTop - 32}" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">${p.title}</text>`
    body += `<text x="${cx}" y="${plotTop - 19}" font-size="10" font-weight="700" fill="#65a30d" text-anchor="middle">${p.sub}</text>`
    body += `<text x="${cx}" y="${plotBot + 22}" font-size="11" font-weight="800" fill="#0f766e" text-anchor="middle">${p.delta}</text>`
    body += `<text x="${cx}" y="${plotBot + 38}" font-size="9.5" fill="#0d9488" text-anchor="middle">${p.note}</text>`
    const rl = p.roots.map((rt) => rt.label).join(' · ')
    body += `<text x="${cx}" y="${plotBot + 53}" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">${rl}</text>`
  })
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three panels showing the three discriminant cases of the depressed cubic as actual sampled curves. Panel one, the cubic x cubed plus three x plus one with Delta equals minus 135 less than zero: a monotone curve crossing the horizontal axis once at the root minus 0.32. Panel two, x cubed minus three x plus two with Delta equal to zero: the curve touches the axis at the double root 1 and crosses at the simple root minus 2, the local minimum sitting exactly on the axis. Panel three, x cubed minus seven x plus 6 with Delta equals 400 greater than zero: a hump above and a dip below the axis, crossing at the three roots minus 3, 1 and 2. Every curve is generated by evaluating its polynomial at forty-eight sample points.">
  <text x="${W / 2}" y="16" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the three faces of x³ + px + q — the sign of Delta = −4p³ − 27q² sorts them</text>
  ${body}
</svg>`
}

function ferrariWalk84Svg(): string {
  // Figure B — the Ferrari walk on the exhibit x⁴−25x²+60x−36: six
  // stations top to bottom — the depressed quartic, the resolvent cubic
  // in M = m², the rational root M = 9, the k/n pair, the two-quadratic
  // split, the four roots. Green stations carry the algebra, amber
  // stations carry the arithmetic that pins it.
  const W = 720
  const boxes = [
    { y: 44, h: 52, fill: '#fef3c7', stroke: '#16a34a', lines: ['the depressed quartic: x⁴ − 25x² + 60x − 36 = 0', 'p = −25, q = 60, r = −36 (no cube term: already depressed)'] },
    { y: 124, h: 52, fill: '#fef3c7', stroke: '#16a34a', lines: ['Ferrari’s resolvent cubic in M = m²:', 'M³ − 50M² + 769M − 3600 = 0'] },
    { y: 204, h: 52, fill: '#ffedd5', stroke: '#d97706', lines: ['hunt a rational root: M = 9 works —', '729 − 4050 + 6921 − 3600 = 0, so m = 3'] },
    { y: 284, h: 52, fill: '#ffedd5', stroke: '#d97706', lines: ['k − n = q/m = 20 and k + n = p + m² = −16,', 'so k = 2, n = −18 (check: nk = −36 = r)'] },
    { y: 364, h: 52, fill: '#fef3c7', stroke: '#16a34a', lines: ['the split into two quadratics:', '(x² + 3x − 18)(x² − 3x + 2) = 0'] },
    { y: 444, h: 52, fill: '#ffedd5', stroke: '#d97706', lines: ['x² + 3x − 18 = 0 gives −6 and 3;', 'x² − 3x + 2 = 0 gives 1 and 2'] },
  ]
  let body = ''
  boxes.forEach((b) => {
    body += `<rect x="90" y="${b.y}" width="540" height="${b.h}" rx="8" fill="${b.fill}" stroke="${b.stroke}" stroke-width="1.8"/>`
    b.lines.forEach((ln, j) => {
      body += `<text x="360" y="${b.y + b.h / 2 - (b.lines.length - 1) * 10 + j * 20 + 4}" font-size="${j === 0 ? '11.5' : '11.5'}" font-weight="${j === 0 ? '800' : '700'}" fill="#166534" text-anchor="middle">${ln}</text>`
    })
  })
  for (let i = 0; i < boxes.length - 1; i++) {
    const y0 = boxes[i].y + boxes[i].h
    const y1 = boxes[i + 1].y
    body += `<line x1="360" y1="${y0 + 2}" x2="360" y2="${y1 - 4}" stroke="#16a34a" stroke-width="2.2"/>`
    body += `<path d="M 360 ${y1 - 4} L 355.4 ${y1 - 12} L 364.6 ${y1 - 12} Z" fill="#16a34a"/>`
  }
  return `<svg viewBox="0 0 ${W} 516" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A vertical flow diagram of Ferrari's method on the quartic x to the fourth minus 25 x squared plus 60 x minus 36. Six stations connected by green arrows. Station one: the depressed quartic with p equals minus 25, q equals 60, r equals minus 36. Station two: the resolvent cubic in M equals m squared, M cubed minus 50 M squared plus 769 M minus 3600 equals zero. Station three: the rational root M equals 9, since 729 minus 4050 plus 6921 minus 3600 equals zero, giving m equals 3. Station four: k minus n equals q over m equals 20 and k plus n equals p plus m squared equals minus 16, so k equals 2 and n equals minus 18, with the check n times k equals minus 36 equals r. Station five: the split into the two quadratics x squared plus 3 x minus 18 and x squared minus 3 x plus 2. Station six: the roots minus 6 and 3 from the first quadratic, 1 and 2 from the second.">
  <text x="360" y="18" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the Ferrari walk on x⁴ − 25x² + 60x − 36 — depress to resolvent to split to roots</text>
  ${body}
</svg>`
}

function bombelli84Svg(): string {
  // Figure C — the Bombelli miracle on the complex plane: the conjugate
  // pair u = 2+i, v = 2−i (green), their cubes u³ = 2+11i, v³ = 2−11i
  // (orange) reached by the two cubing arrows, and the sum x = 4 (ringed
  // orange) on the real axis. Equal scale on both axes.
  const OX = 150, OY = 250, U = 20 // origin pixel + unit scale
  const px = (re: number) => OX + re * U
  const py = (im: number) => OY - im * U
  let body = ''
  // axes
  body += `<line x1="${px(-0.6)}" y1="${OY}" x2="${px(5.9)}" y2="${OY}" stroke="#0d9488" stroke-width="1.8"/>`
  body += `<line x1="${OX}" y1="${py(12)}" x2="${OX}" y2="${py(-12)}" stroke="#0d9488" stroke-width="1.8"/>`
  for (const t of [1, 2, 3, 4, 5]) {
    body += `<line x1="${px(t)}" y1="${OY - 4}" x2="${px(t)}" y2="${OY + 4}" stroke="#0d9488" stroke-width="1.2"/>`
    body += `<text x="${px(t)}" y="${OY + 16}" font-size="9.5" fill="#65a30d" text-anchor="middle">${t}</text>`
  }
  for (const t of [5, 10, -5, -10]) {
    body += `<line x1="${OX - 4}" y1="${py(t)}" x2="${OX + 4}" y2="${py(t)}" stroke="#0d9488" stroke-width="1.2"/>`
    body += `<text x="${OX - 9}" y="${py(t) + 3.5}" font-size="9.5" fill="#65a30d" text-anchor="end">${String(t).replace('-', '−')}</text>`
  }
  // the cubing arrows u -> u³ and v -> v³
  body += `<line x1="${px(2)}" y1="${py(1)}" x2="${px(2)}" y2="${py(11)}" stroke="#ea580c" stroke-width="2.4"/>`
  body += `<path d="M ${px(2)} ${py(11)} L ${px(2) - 5} ${py(11) + 9} L ${px(2) + 5} ${py(11) + 9} Z" fill="#ea580c"/>`
  body += `<line x1="${px(2)}" y1="${py(-1)}" x2="${px(2)}" y2="${py(-11)}" stroke="#ea580c" stroke-width="2.4"/>`
  body += `<path d="M ${px(2)} ${py(-11)} L ${px(2) - 5} ${py(-11) - 9} L ${px(2) + 5} ${py(-11) - 9} Z" fill="#ea580c"/>`
  // points
  body += `<circle cx="${px(2)}" cy="${py(1)}" r="5" fill="#16a34a" stroke="#166534" stroke-width="1.2"/>`
  body += `<circle cx="${px(2)}" cy="${py(-1)}" r="5" fill="#16a34a" stroke="#166534" stroke-width="1.2"/>`
  body += `<circle cx="${px(2)}" cy="${py(11)}" r="5.6" fill="#ea580c" stroke="#166534" stroke-width="1.2"/>`
  body += `<circle cx="${px(2)}" cy="${py(-11)}" r="5.6" fill="#ea580c" stroke="#166534" stroke-width="1.2"/>`
  // the sum x = 4 on the real axis, ringed
  body += `<circle cx="${px(4)}" cy="${OY}" r="8.5" fill="none" stroke="#ea580c" stroke-width="2.6"/>`
  body += `<circle cx="${px(4)}" cy="${OY}" r="3.4" fill="#ea580c"/>`
  // dashed conjugate bracket u,v -> sum
  body += `<line x1="${px(2)}" y1="${py(1)}" x2="${px(4) - 10}" y2="${OY - 6}" stroke="#5eead4" stroke-width="1.4" stroke-dasharray="4 4"/>`
  body += `<line x1="${px(2)}" y1="${py(-1)}" x2="${px(4) - 10}" y2="${OY + 6}" stroke="#5eead4" stroke-width="1.4" stroke-dasharray="4 4"/>`
  // labels near points
  body += `<text x="${px(2) + 10}" y="${py(1) - 7}" font-size="11" font-weight="800" fill="#166534">u = 2 + i</text>`
  body += `<text x="${px(2) + 10}" y="${py(-1) + 14}" font-size="11" font-weight="800" fill="#166534">v = 2 − i</text>`
  body += `<text x="${px(2) + 10}" y="${py(11) + 4}" font-size="11" font-weight="800" fill="#ea580c">u³ = 2 + 11i</text>`
  body += `<text x="${px(2) + 10}" y="${py(-11) + 4}" font-size="11" font-weight="800" fill="#ea580c">v³ = 2 − 11i</text>`
  body += `<text x="${px(4) + 14}" y="${OY - 18}" font-size="11.5" font-weight="800" fill="#ea580c">x = u + v = 4</text>`
  // annotations (right column) — every line kept under the 720 wall
  body += `<text x="404" y="64" font-size="11.5" font-weight="800" fill="#166534">the miracle, checked by expansion:</text>`
  body += `<text x="404" y="84" font-size="11" font-weight="700" fill="#65a30d">(2 + i)³ = 8 + 12i + 6i² + i³</text>`
  body += `<text x="404" y="103" font-size="11" font-weight="700" fill="#65a30d">= 2 + 11i  exactly</text>`
  body += `<text x="404" y="130" font-size="11" font-weight="700" fill="#65a30d">so Cardan demands u³ = 2 + 11i — and</text>`
  body += `<text x="404" y="149" font-size="11" font-weight="700" fill="#65a30d">Bombelli simply NAMES its cube root:</text>`
  body += `<text x="404" y="168" font-size="11" font-weight="700" fill="#65a30d">u = 2 + i, v = 2 − i</text>`
  body += `<text x="404" y="196" font-size="11" font-weight="700" fill="#0f766e">moduli (De Moivre, ch. 3):</text>`
  body += `<text x="404" y="215" font-size="11" font-weight="700" fill="#0f766e">|2 + i| = sqrt(5), and (sqrt(5))³ =</text>`
  body += `<text x="404" y="234" font-size="11" font-weight="700" fill="#0f766e">5·sqrt(5) = |2 + 11i| — cubes multiply</text>`
  body += `<text x="404" y="253" font-size="11" font-weight="700" fill="#0f766e">moduli and triple the argument</text>`
  body += `<text x="404" y="281" font-size="11.5" font-weight="800" fill="#166534">the conjugate sum lands on the axis:</text>`
  body += `<text x="404" y="301" font-size="11" font-weight="700" fill="#65a30d">u + v = (2 + i) + (2 − i) = 4 — the</text>`
  body += `<text x="404" y="320" font-size="11" font-weight="700" fill="#65a30d">real root of x³ − 15x − 4 = 0</text>`
  body += `<text x="404" y="339" font-size="11" font-weight="700" fill="#65a30d">(its Delta = 13068 > 0: the casus)</text>`
  body += `<text x="404" y="366" font-size="11" font-weight="700" fill="#0f766e">the other roots: −2 ± sqrt(3), from the</text>`
  body += `<text x="404" y="385" font-size="11" font-weight="700" fill="#0f766e">leftover quadratic x² + 4x + 1 = 0</text>`
  body += `<text x="404" y="413" font-size="11.5" font-weight="800" fill="#166534">Complex numbers entered algebra as</text>`
  body += `<text x="404" y="432" font-size="11.5" font-weight="800" fill="#166534">the price of REAL answers — 1572.</text>`
  return `<svg viewBox="0 0 720 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Bombelli miracle on the complex plane at equal scale. The green points u equals 2 plus i and v equals 2 minus i sit one unit above and below the real axis at real part 2; two orange arrows cube them straight up and straight down to the orange points u cubed equals 2 plus 11 i and v cubed equals 2 minus 11 i. The check by expansion: 2 plus i cubed equals 8 plus 12 i plus 6 i squared plus i cubed equals 2 plus 11 i exactly. The conjugate pair sums to the ringed orange point x equals 4 on the real axis, the real root of x cubed minus 15 x minus 4. Annotations note the De Moivre modulus check: the modulus of 2 plus i is sqrt 5, and sqrt 5 cubed is 5 times sqrt 5, the modulus of 2 plus 11 i; and that the other two roots are minus 2 plus or minus sqrt 3.">
  <text x="360" y="18" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">Bombelli’s 1572 miracle on x³ − 15x − 4: cube roots of complex numbers, real answers</text>
  <text x="${OX + 8}" y="490" font-size="9.5" font-weight="700" fill="#0d9488">imaginary axis</text>
  <text x="${px(-0.6) + 6}" y="${OY - 10}" font-size="10" font-weight="700" fill="#0d9488" text-anchor="start">real axis</text>
  ${body}
</svg>`
}

function casusPlane84Svg(): string {
  // SOLUTION figure (L4-1) — the casus on the complex plane for
  // x³−7x+6: the two triples of cube roots of −3 ± (10/√27)i as three
  // conjugate pairs (u-triple green above/below, v-triple amber), and the
  // three legal pairings (uv = 7/3 real) summing onto the real axis at
  // 2, −3, 1. Exact coordinates: u0 = 1 + (2/√3)i, u1 = −3/2 + (1/(2√3))i,
  // u2 = 1/2 − (5/(2√3))i (drawn to scale).
  const OX = 470, OY = 250, U = 60
  const px = (re: number) => OX + re * U
  const py = (im: number) => OY - im * U
  const s3 = Math.sqrt(3)
  const u0: [number, number] = [1, 2 / s3]
  const u1: [number, number] = [-1.5, 1 / (2 * s3)]
  const u2: [number, number] = [0.5, -5 / (2 * s3)]
  const sums: [number, number, number][] = [
    [2, 0, 2],
    [-3, 0, -3],
    [1, 0, 1],
  ]
  let body = ''
  // axes
  body += `<line x1="${px(-3.6)}" y1="${OY}" x2="${px(2.9)}" y2="${OY}" stroke="#0d9488" stroke-width="1.8"/>`
  body += `<line x1="${OX}" y1="${py(2.1)}" x2="${OX}" y2="${py(-2.1)}" stroke="#0d9488" stroke-width="1.8"/>`
  for (const t of [-3, -2, -1, 1, 2]) {
    body += `<line x1="${px(t)}" y1="${OY - 4}" x2="${px(t)}" y2="${OY + 4}" stroke="#0d9488" stroke-width="1.2"/>`
    body += `<text x="${px(t)}" y="${OY + 16}" font-size="9.5" fill="#65a30d" text-anchor="middle">${String(t).replace('-', '−')}</text>`
  }
  // the three conjugate pairs + their sums
  const pairs: { u: [number, number]; sum: number; labels: [string, string] }[] = [
    { u: u0, sum: 2, labels: ['u₀ = 1 + 1.155i', 'v₀ = 1 − 1.155i'] },
    { u: u1, sum: -3, labels: ['u₁ = −1.5 + 0.289i', 'v₁ = −1.5 − 0.289i'] },
    { u: u2, sum: 1, labels: ['u₂ = 0.5 − 1.443i', 'v₂ = 0.5 + 1.443i'] },
  ]
  pairs.forEach(({ u, sum, labels }) => {
    const v: [number, number] = [u[0], -u[1]]
    // dashed pairing lines to the sum
    body += `<line x1="${px(u[0])}" y1="${py(u[1])}" x2="${px(sum) - 8}" y2="${OY - 7}" stroke="#5eead4" stroke-width="1.4" stroke-dasharray="4 4"/>`
    body += `<line x1="${px(v[0])}" y1="${py(v[1])}" x2="${px(sum) - 8}" y2="${OY + 7}" stroke="#5eead4" stroke-width="1.4" stroke-dasharray="4 4"/>`
    // points
    body += `<circle cx="${px(u[0])}" cy="${py(u[1])}" r="5.2" fill="#16a34a" stroke="#166534" stroke-width="1.2"/>`
    body += `<circle cx="${px(v[0])}" cy="${py(v[1])}" r="5.2" fill="#d97706" stroke="#166534" stroke-width="1.2"/>`
    // labels
    const above = u[1] >= 0
    body += `<text x="${px(u[0]) + 9}" y="${py(u[1]) + (above ? -7 : 13)}" font-size="10.5" font-weight="800" fill="#166534">${labels[0]}</text>`
    body += `<text x="${px(v[0]) + 9}" y="${py(v[1]) + (above ? 15 : -7)}" font-size="10.5" font-weight="800" fill="#65a30d">${labels[1]}</text>`
    // the sum, ringed on the real axis
    body += `<circle cx="${px(sum)}" cy="${OY}" r="8" fill="none" stroke="#ea580c" stroke-width="2.6"/>`
    body += `<circle cx="${px(sum)}" cy="${OY}" r="3.2" fill="#ea580c"/>`
  })
  body += `<text x="${px(2) + 12}" y="${OY - 12}" font-size="11" font-weight="800" fill="#ea580c">u₀ + v₀ = 2</text>`
  body += `<text x="${px(-3) - 10}" y="${OY - 12}" font-size="11" font-weight="800" fill="#ea580c" text-anchor="end">u₁ + v₁ = −3</text>`
  body += `<text x="${px(1) + 11}" y="${OY + 36}" font-size="11" font-weight="800" fill="#ea580c">u₂ + v₂ = 1</text>`
  // left annotation column
  body += `<text x="14" y="70" font-size="11.5" font-weight="800" fill="#166534">the casus, drawn:</text>`
  body += `<text x="14" y="92" font-size="10.5" font-weight="700" fill="#65a30d">u³ = −3 + (10/sqrt(27))i — the green</text>`
  body += `<text x="14" y="110" font-size="10.5" font-weight="700" fill="#65a30d">triple is its three cube roots (the</text>`
  body += `<text x="14" y="128" font-size="10.5" font-weight="700" fill="#65a30d">v-triple, amber, is the conjugate:</text>`
  body += `<text x="14" y="146" font-size="10.5" font-weight="700" fill="#65a30d">cube roots of −3 − (10/sqrt(27))i)</text>`
  body += `<text x="14" y="174" font-size="10.5" font-weight="700" fill="#0f766e">pairing law: 3uv = −p = 7, so only</text>`
  body += `<text x="14" y="192" font-size="10.5" font-weight="700" fill="#0f766e">uv = 7/3 REAL is legal — the conjugate</text>`
  body += `<text x="14" y="210" font-size="10.5" font-weight="700" fill="#0f766e">pairing u·v̄ = |u|² = 7/3 survives;</text>`
  body += `<text x="14" y="228" font-size="10.5" font-weight="700" fill="#0f766e">every sum x = u + v lands on the</text>`
  body += `<text x="14" y="246" font-size="10.5" font-weight="700" fill="#0f766e">real axis — three REAL roots</text>`
  body += `<text x="14" y="276" font-size="10.5" font-weight="700" fill="#166534">exact (engine-pinned):</text>`
  body += `<text x="14" y="296" font-size="10.5" font-weight="700" fill="#65a30d">u₀ = 1 + (2/sqrt(3))i,</text>`
  body += `<text x="14" y="314" font-size="10.5" font-weight="700" fill="#65a30d">u₁ = −3/2 + (1/(2·sqrt(3)))i,</text>`
  body += `<text x="14" y="332" font-size="10.5" font-weight="700" fill="#65a30d">u₂ = 1/2 − (5/(2·sqrt(3)))i</text>`
  body += `<text x="14" y="356" font-size="10.5" font-weight="700" fill="#0f766e">the green triple is closed under omega:</text>`
  body += `<text x="14" y="374" font-size="10.5" font-weight="700" fill="#0f766e">u₁ = omega·u₀ and u₂ = omega²·u₀ —</text>`
  body += `<text x="14" y="392" font-size="10.5" font-weight="700" fill="#0f766e">chapter 3’s De Moivre arithmetic cashed</text>`
  return `<svg viewBox="0 0 720 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The casus irreducibilis for the cubic x cubed minus 7 x plus 6 drawn on the complex plane at equal scale. The green triple of points are the three cube roots of minus 3 plus the quantity 10 over the square root of 27 times i, at coordinates 1 plus 1.155 i, minus 1.5 plus 0.289 i, and 0.5 minus 1.443 i; the amber triple is the conjugate, the cube roots of minus 3 minus the same imaginary part. The pairing law 3 u v equals minus p equals 7 admits only the conjugate pairings with u v equal to 7 over 3 real, and each pairing is drawn with dashed teal lines summing onto a ringed orange point on the real axis: the three sums land at 2, at minus 3, and at 1 — the three real roots. The exact forms are annotated: u zero equals 1 plus 2 over the square root of 3 times i, u one equals minus three halves plus 1 over twice the square root of 3 times i, u two equals one half minus 5 over twice the square root of 3 times i; the green triple is closed under multiplication by omega, chapter 3's cube root of unity.">
  <text x="360" y="18" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">x³ − 7x + 6: the three omega-combination sums land on the real axis at 2, −3, 1</text>
  ${body}
</svg>`
}

function cardanLine84Svg(): string {
  // SOLUTION figure (L2-1) — the Cardan walk on x³+3x+1: the two roots of
  // the quadratic t²+t−1 = 0 (u³ = 0.6180, v³ = −1.6180 — the golden-ratio
  // family) on a number line, dropping into the cube-root machine, and the
  // audited sum x = −0.3222.
  const W = 720
  let body = ''
  // the number line
  const nlY = 78
  const map = (v: number) => 70 + ((v + 2.1) / 3.4) * 580
  body += `<line x1="64" y1="${nlY}" x2="668" y2="${nlY}" stroke="#0d9488" stroke-width="1.8"/>`
  for (const t of [-2, -1, 0, 1]) {
    body += `<line x1="${map(t)}" y1="${nlY - 5}" x2="${map(t)}" y2="${nlY + 5}" stroke="#0d9488" stroke-width="1.3"/>`
    body += `<text x="${map(t)}" y="${nlY + 19}" font-size="10" fill="#65a30d" text-anchor="middle">${String(t).replace('-', '−')}</text>`
  }
  body += `<circle cx="${map(0.6180)}" cy="${nlY}" r="5.4" fill="#16a34a" stroke="#166534" stroke-width="1.2"/>`
  body += `<circle cx="${map(-1.6180)}" cy="${nlY}" r="5.4" fill="#d97706" stroke="#166534" stroke-width="1.2"/>`
  body += `<text x="${map(0.6180)}" y="${nlY - 40}" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">u³ = (−1 + sqrt(5))/2 = 0.6180</text>`
  body += `<text x="${map(-1.6180)}" y="${nlY - 40}" font-size="11" font-weight="800" fill="#65a30d" text-anchor="middle">v³ = (−1 − sqrt(5))/2 = −1.6180</text>`
  body += `<text x="${map(0.6180)}" y="${nlY - 26}" font-size="10.5" fill="#0d9488" text-anchor="middle">root of t² + t − 1 = 0</text>`
  body += `<text x="${map(-1.6180)}" y="${nlY - 26}" font-size="10.5" fill="#0d9488" text-anchor="middle">root of t² + t − 1 = 0</text>`
  // arrows down into the cube-root machine boxes
  body += `<line x1="${map(0.6180)}" y1="${nlY + 8}" x2="500" y2="148" stroke="#16a34a" stroke-width="2"/>`
  body += `<path d="M 500 148 L 495.6 139.5 L 504.4 139.5 Z" fill="#16a34a"/>`
  body += `<line x1="${map(-1.6180)}" y1="${nlY + 8}" x2="220" y2="148" stroke="#d97706" stroke-width="2"/>`
  body += `<path d="M 220 148 L 215.6 139.5 L 224.4 139.5 Z" fill="#d97706"/>`
  body += `<rect x="330" y="152" width="240" height="52" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
  body += `<text x="450" y="173" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">the cube-root machine</text>`
  body += `<text x="450" y="192" font-size="11" font-weight="700" fill="#65a30d" text-anchor="middle">u = cbrt(0.6180) = 0.8518</text>`
  body += `<rect x="100" y="152" width="240" height="52" rx="8" fill="#ffedd5" stroke="#d97706" stroke-width="1.8"/>`
  body += `<text x="220" y="173" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">the cube-root machine</text>`
  body += `<text x="220" y="192" font-size="11" font-weight="700" fill="#65a30d" text-anchor="middle">v = cbrt(−1.6180) = −1.1739</text>`
  // the audited sum
  body += `<line x1="450" y1="204" x2="410" y2="248" stroke="#16a34a" stroke-width="2"/>`
  body += `<path d="M 410 248 L 406.5 239 L 413.5 240 Z" fill="#16a34a"/>`
  body += `<line x1="220" y1="204" x2="260" y2="248" stroke="#d97706" stroke-width="2"/>`
  body += `<path d="M 260 248 L 256.5 240 L 263.5 239 Z" fill="#d97706"/>`
  body += `<rect x="150" y="252" width="420" height="80" rx="8" fill="#fef3c7" stroke="#ea580c" stroke-width="2"/>`
  body += `<text x="360" y="276" font-size="12.5" font-weight="800" fill="#ea580c" text-anchor="middle">x = u + v = 0.8518 − 1.1739 = −0.3222</text>`
  body += `<text x="360" y="298" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">audit: f(−0.3222) = (−0.3222)³ + 3(−0.3222) + 1 ≈ −0.00005</text>`
  body += `<text x="360" y="318" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the engine’s bisection pins the same root to four decimal places</text>`
  return `<svg viewBox="0 0 ${W} 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Cardan walk for the cubic x cubed plus 3 x plus 1 as a vertical flow. A number line carries the two roots of the quadratic t squared plus t minus 1: u cubed equals the quantity minus 1 plus the square root of 5 over 2, which is 0.6180, and v cubed equals minus 1.6180, the golden-ratio family. Arrows drop each into a cube-root machine box: the cube root of 0.6180 is 0.8518, and the cube root of minus 1.6180 is minus 1.1739. A final orange box takes the sum: x equals u plus v equals 0.8518 minus 1.1739 equals minus 0.3222, with the numeric audit that f of minus 0.3222 is approximately minus 0.00005, and the note that the engine's bisection pins the same root to four decimal places.">
  <text x="360" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">x³ + 3x + 1: the quadratic’s roots, the cube-root machine, the audited sum</text>
  ${body}
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 8.4                                                          */
/* ------------------------------------------------------------------ */

const lesson84: Lesson = {
  id: 'aa-cardan-and-ferrari-the-cubic-and-quartic-solved',
  number: '8.4',
  title: 'Cardan and Ferrari: the Cubic and Quartic, Solved',
  concepts: [
    'the depressed cubic x = t − a/3',
    'Cardan’s substitution x = u + v with 3uv = −p',
    'the discriminant Δ = −4p³ − 27q²',
    'the three cases: Δ < 0, Δ = 0, Δ > 0',
    'the casus irreducibilis honesty',
    'Ferrari’s resolvent cubic',
    'the Sophie Germain special case',
    'numeric verification as the trust engine',
  ],
  objectives: [
    'Depress any cubic $x^3 + ax^2 + bx + c$ by the substitution $x = t - \\tfrac{a}{3}$ — proving once and for all why the $t^2$ term dies — and read the depressed coefficients $p = b - \\tfrac{a^2}{3}$, $q = \\tfrac{2a^3}{27} - \\tfrac{ab}{3} + c$.',
    'Run Cardan’s substitution $x = u + v$ with $3uv = -p$ and derive the $u^3/v^3$ quadratic $t^2 + qt - \\tfrac{p^3}{27} = 0$ — the collapse that turns a cubic into a quadratic plus two cube roots.',
    'Classify the depressed cubic by the discriminant $\\Delta = -4p^3 - 27q^2$ and solve each case: $\\Delta < 0$ one real root with real cube roots; $\\Delta = 0$ a repeated root with the $\\tfrac{3q}{p}$, $-\\tfrac{3q}{2p}$ shortcut; $\\Delta > 0$ three real roots.',
    'Explain the casus irreducibilis honestly: when $\\Delta > 0$ all three roots are real, yet Cardan’s formula routes through COMPLEX cube roots — chapter 3’s De Moivre arithmetic cashed in full, with the Wantzel honesty that no real-radical route exists.',
    'Run Ferrari’s resolvent on a depressed quartic $y^4 + py^2 + qy + r$: derive the resolvent cubic $M^3 + 2pM^2 + (p^2 - 4r)M - q^2 = 0$, split the quartic into two quadratics, and handle the Sophie Germain and biquadratic special cases.',
    'Verify every solution numerically — substitute each claimed root back into its equation, compare against a bisection root, check the symmetric-function reads — because a formula is a claim, not a proof.',
    'Carry the depressed-cubic speed tools (the depression, the Δ classification, the numeric audit) into examination work even where the full Cardan machinery is not asked for.',
  ],
  prerequisites: ['aa-cubics-and-quartics-the-symmetric-functions', 'aa-de-moivre-roots-of-unity-and-the-complex-loci'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'The quadratic formula ended a story that had taken the ancient world thousands of years to tell: completing the square, in one guise or another, was in the hands of the Babylonian scribes, and every school pupil now carries $x = \\tfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ as a possession. The cubic was a different kind of wall. Special cases fell here and there across the centuries — but the general solution in radicals, the thing the quadratic formula is, eluded the Greek geometers, eluded the whole magnificent algebra tradition of the Islamic world, and was still standing when the Italian Renaissance began. When it finally fell — in Bologna in the years around 1515, sharpened in a public duel in 1535, published in a book in 1545 — it was the first great victory of modern symbolic algebra over a problem the ancients had left open. It is also, honestly, one of the least flattering stories in the history of mathematics: a story of secrets, oaths and betrayal, told in the callout below exactly as the record supports it.' },
    { kind: 'para', text: 'This lesson solves the cubic and the quartic — the two climbs the quadratic did not prepare you for. The cubic needs two moves: first DEPRESS it, killing the $x^2$ term by a shift $x = t - \\tfrac{a}{3}$ whose cancellation is forced by design; then SPLIT it, writing $x = u + v$ with the side-condition $3uv = -p$, which collapses the whole cubic into a quadratic whose two roots are $u^3$ and $v^3$. The quartic then needs only the cubic we will just have solved: Ferrari’s idea splits $y^4 + py^2 + qy + r$ into two quadratics whose glue is a number $m$ found by solving — exactly — a cubic, the RESOLVENT. Two derivations of real machinery, one honest surprise buried in the discriminant, and one habit enforced on every exhibit: never trust a formula blind; the numeric audit is the trust engine.' },
    { kind: 'para', text: 'The chapter has earned this moment. Lesson 8.1 counted the roots (degree $n$, $n$ roots over the complex numbers) and derived the conjugate-pair law; lesson 8.2 counted them by sign; lesson 8.3 read them through Viète’s symmetric functions and solved the NICE cubics and quartics by the factor theorem plus intelligent guessing. What the chapter has not yet delivered is the general machine — the solution that works even when no root is guessable, when the polynomial is as stubborn as $x^3 + 3x + 1$ with its unguessable root near $-0.32$. That machine is this lesson. Two prerequisites ride with us the whole way: the Viète reads of 8.3 (every audit below checks the sum and product of the roots it finds), and chapter 3’s De Moivre arithmetic — cube roots of complex numbers are about to stop being an exotic skill and become the only road to some very real answers.' },
    { kind: 'callout', tone: 'historical', title: 'The cubic, the oath, and the Ars Magna', text: 'Scipione del Ferro, professor at Bologna, solved the depressed cubic around 1515 — and told almost no one: in the era of mathematical duels, a secret method was a weapon. In 1535 Antonio Maria Fior, armed with del Ferro’s papers, challenged Niccolò Tartaglia to a contest of cubics; Tartaglia solved every problem put to him, having found the method himself under pressure. In 1539 Tartaglia revealed his method to Gerolamo Cardano — in cryptic verse, under an oath of secrecy. Cardano and his brilliant student Ludovico Ferrari then did what open science does: they extended it (the general cubic via depression, and Ferrari’s own solution of the QUARTIC by 1540). When Cardano later learned of del Ferro’s prior, unpublished work, he judged the oath void and published the whole apparatus in the Ars Magna (1545), crediting del Ferro and Tartaglia for the cubic and Ferrari for the quartic. Tartaglia felt betrayed; the resulting quarrel — fought in printed challenge letters — ended badly for him against Ferrari in Milan in 1548. This book’s standing honesty: the mathematics is the property of the whole tradition, and the human record here is genuinely tangled; the platform reports it without laundering it.' },

    { kind: 'heading', text: 'Depressing the Cubic' },
    { kind: 'para', text: 'The quadratic formula is fed by completing the square — killing the linear term so that a pure square stares back. The cubic analogue kills the SQUARE term, and the move is a shift of origin. Take the general cubic $x^3 + ax^2 + bx + c$ and put $x = t - \\tfrac{a}{3}$: the new variable $t$ measures $x$ from the point one-third of the coefficient away. Why exactly a third? Because the cube of a shifted quantity $t - h$ manufactures a $t^2$ term with coefficient $-3h$, and choosing $h = \\tfrac{a}{3}$ makes that manufactured term exactly cancel the one being carried in. Watch the cancellation happen in the open — it is the whole content of the first derivation.' },
    { kind: 'derivation', title: 'Theorem: the substitution x = t − a/3 kills the t² term', statement: 'Under the substitution x = t − a/3, every cubic x³ + ax² + bx + c becomes the depressed cubic t³ + pt + q with p = b − a²/3 and q = 2a³/27 − ab/3 + c — the t² coefficient is exactly zero.', steps: [
      { label: 'Substitute', formula: '\\left(t - \\tfrac{a}{3}\\right)^3 + a\\left(t - \\tfrac{a}{3}\\right)^2 + b\\left(t - \\tfrac{a}{3}\\right) + c', explanation: 'Replace every $x$ in the cubic by $t - \\tfrac{a}{3}$ and refuse to collect anything yet. The two terms that will decide the fate of $t^2$ are the cube and the $a$-times-square, so expand those two completely.' },
      { label: 'Expand the cube and the square', formula: '\\left(t^3 - a t^2 + \\tfrac{a^2}{3} t - \\tfrac{a^3}{27}\\right) + \\left(a t^2 - \\tfrac{2a^2}{3} t + \\tfrac{a^3}{9}\\right) + bt - \\tfrac{ab}{3} + c', explanation: 'The cube contributes a $t^2$ coefficient of $-a$; the $a$-times-square contributes $+a$; they arrive with opposite signs because $(t - \\tfrac{a}{3})^2$ carries $-\\tfrac{2a}{3}t$ inside, and $a \\cdot (-\\tfrac{2a}{3}) = -\\tfrac{2a^2}{3}$ combines with the cube\'s $+\\tfrac{a^2}{3}$ — the pair was tuned to cancel.' },
      { label: 'Watch the t² terms cancel', formula: '-a + a = 0', explanation: 'The coefficient of $t^2$ is $-a + a = 0$, exactly, for every $a$ — not approximately, not for special $a$: the choice $h = \\tfrac{a}{3}$ was made so that $-3h = -a$ cancels the incoming $+a$. The engine below sweeps $a$ over six values with the composition done in exact integer arithmetic scaled by 27: the $t^2$ slot reads 0 every time.' },
      { label: 'Collect the survivors', formula: 't^3 + \\left(b - \\tfrac{a^2}{3}\\right) t + \\left(\\tfrac{2a^3}{27} - \\tfrac{ab}{3} + c\\right)', explanation: 'What survives is a pure cube, one power of $t$, and a constant — the DEPRESSED cubic $t^3 + pt + q$. The names: $p = b - \\tfrac{a^2}{3}$ and $q = \\tfrac{2a^3}{27} - \\tfrac{ab}{3} + c$.' },
      { label: 'Witness, literally', formula: 'x^3 - 6x^2 + 11x - 6 \\xrightarrow{\\,x = t+2\\,} t^3 - t', explanation: 'Here $a = -6$, so $x = t - \\tfrac{a}{3} = t + 2$; the composition $(t+2)^3 - 6(t+2)^2 + 11(t+2) - 6$ expands to $t^3 - t + 0$ with the $t^2$ slot dead. Two further witnesses the engine pins: $x^3 - 9x^2 + 26x - 24$ (roots $2, 3, 4$) depresses by $x = t + 3$ to $t^3 - t$, and $x^3 + 6x^2 + 11x + 6$ (roots $-1, -2, -3$) depresses by $x = t - 2$ to the very same $t^3 - t$.' },
    ], result: '$x = t - \\tfrac{a}{3}$ turns $x^3 + ax^2 + bx + c$ into $t^3 + pt + q$ — with $p = b - \\tfrac{a^2}{3}$ and $q = \\tfrac{2a^3}{27} - \\tfrac{ab}{3} + c$, the $t^2$ term cancelled by design' },
    { kind: 'equation', latex: 'x^3 + ax^2 + bx + c \\;\\xrightarrow{\\,x = t - \\tfrac{a}{3}\\,}\\; t^3 + pt + q, \\qquad p = b - \\tfrac{a^2}{3}, \\;\\; q = \\tfrac{2a^3}{27} - \\tfrac{ab}{3} + c \\tag{1}', note: 'the depression: one line, three coefficients, no $t^2$ — every cubic is a shifted $t^3 + pt + q$.' },
    { kind: 'example', title: 'Depress the cubic $x^3 - 6x^2 + 11x - 6$ by the substitution $x = t + 2$, and read off all three roots.', steps: [
      'Read the coefficient: $a = -6$, so the substitution is $x = t - \\tfrac{a}{3} = t + 2$.',
      'Now, substitute and expand in the open: $(t+2)^3 - 6(t+2)^2 + 11(t+2) - 6 = t^3 + 6t^2 + 12t + 8 - 6t^2 - 24t - 24 + 11t + 22 - 6$.',
      'So, the $t^2$ terms cancel exactly ($6 - 6 = 0$), the $t$ terms combine as $12 - 24 + 11 = -1$, and the constants as $8 - 24 + 22 - 6 = 0$: the depressed cubic is $t^3 - t$.',
      'Hence solve $t^3 - t = 0 = t(t-1)(t+1)$: the $t$-roots are $-1, 0, 1$, so $x = t + 2$ runs over $1, 2, 3$.',
      'Check the audit: $1 + 2 + 3 = 6$ (the $x^2$ coefficient with reversed sign, Viète from lesson 8.3), $1 \\cdot 2 + 2 \\cdot 3 + 3 \\cdot 1 = 11$, and each of $1, 2, 3$ satisfies the original literally.',
    ], },
    { kind: 'para', text: 'Notice what the three witnesses have in common — it is not a coincidence, and it is the first insight worth banking. Each of $\\{1,2,3\\}$, $\\{2,3,4\\}$, $\\{-1,-2,-3\\}$ is an ARITHMETIC PROGRESSION, and every arithmetic progression of roots has sum $3 \\times$ (middle term) — which forces the depressed sum $\\sigma_1 = 0$ with the roots centered at their average. That is why all three depress to the same $t^3 - t$ with its roots $\\{-1, 0, 1\\}$: the depression centers the roots at their mean, lesson 8.5 will name this the shifted-roots transformation, and the family $t^3 - t$ is the canonical shape of every equally-spaced triple. The table records the three engine-pinned witnesses side by side.' },
    { kind: 'table', caption: 'Three depression witnesses, engine-pinned by exact integer composition before any prose was written: each cubic has roots in arithmetic progression, so each depresses to the same centered form $t^3 - t$ with $t$-roots $\\{-1, 0, 1\\}$.', head: ['Cubic', 'Substitution', 'Depressed form', 'Roots', 't-roots'], rows: [
      ['$x^3 - 6x^2 + 11x - 6$', '$x = t + 2$', '$t^3 - t$', '$1, 2, 3$', '$-1, 0, 1$'],
      ['$x^3 - 9x^2 + 26x - 24$', '$x = t + 3$', '$t^3 - t$', '$2, 3, 4$', '$-1, 0, 1$'],
      ['$x^3 + 6x^2 + 11x + 6$', '$x = t - 2$', '$t^3 - t$', '$-1, -2, -3$', '$-1, 0, 1$'],
    ] },
    { kind: 'callout', tone: 'insight', title: 'The depression is Viète in disguise', text: 'Substituting $x = t - \\tfrac{a}{3}$ means $t = x + \\tfrac{a}{3}$: every root is shifted UP by $\\tfrac{a}{3}$, so the new sum of roots is $\\sigma_1 + a = (-a) + a = 0$ — Viète\'s $\\sigma_1 = -a$ from lesson 8.3 is exactly the statement that the depression centers the roots on their average. This is why the depressed cubic is the natural form for symmetric reads: with $\\sigma_1 = 0$, the two surviving coefficients read directly as $p = \\sigma_2$ and $q = -\\sigma_3$, and every audit of this lesson reduces to checking a two-number symmetric function.' },
    { kind: 'para', text: 'From here on, the cubic is $x^3 + px + q$ — depressed, two-parameter, no $x^2$. Cardan\'s target. And with the quartic in view at the end of the lesson, note the same trick scales: a quartic $x^4 + ax^3 + \\cdots$ depresses by $x = t - \\tfrac{a}{4}$, killing ITS cube term; the Ferrari exhibit below is already depressed, so the quartic depression rides past as one sentence rather than a section.' },

    { kind: 'heading', text: 'Cardan’s Substitution' },
    { kind: 'para', text: 'The depressed cubic still looks hopeless: $t^3$ and $t$ and a constant, with no square to complete. Cardan\'s move — the one the whole Renaissance quarrel was fought over — is a split: write the single unknown as the SUM of two unknowns, $x = u + v$. It looks like trading one unknown for two, a loss. The gain is the binomial expansion: $(u+v)^3 = u^3 + v^3 + 3uv(u + v)$, and that final $3uv(u+v)$ is $3uv \\cdot x$ — the CUBE of the split reappears as a multiple of the split itself. That is a lever: it means the cubic of $u + v$ can be reorganized so that $x = u+v$ satisfies a cubic whose $x$-coefficient WE choose, by choosing $uv$.' },
    { kind: 'derivation', title: 'Theorem: Cardan’s collapse — the cubic becomes a quadratic in u³ and v³', statement: 'Write x = u + v with the side-condition 3uv = −p. Then x³ + px + q = 0 collapses to u³ + v³ = −q together with u³ · v³ = −p³/27, so u³ and v³ are the two roots of the quadratic t² + qt − p³/27 = 0.', steps: [
      { label: 'Split the unknown', formula: 'x = u + v', explanation: 'One unknown becomes two — and the freedom is real: for any number $s$ with $u \\ne 0$, the pair $(u, v)$ can be re-tuned to $(su, \\tfrac{v}{s})$ without changing the sum. The split is not a guess; it is a lever with a free parameter, and the side-condition will spend it.' },
      { label: 'Cube the split', formula: '(u + v)^3 = u^3 + v^3 + 3uv(u + v)', explanation: 'The binomial cube: three terms, and the last one is $3uv \\cdot (u+v) = 3uv \\cdot x$ — the cube of the split contains a copy of the split itself, scaled by $3uv$. No other power has this self-reference; it is why the method exists.' },
      { label: 'Match against the cubic', formula: 'x^3 - 3uv\\, x - (u^3 + v^3) = 0 \\;\\leftrightarrow\\; x^3 + px + q = 0', explanation: 'Move everything to one side: $x^3 - 3uv\\,x - (u^3+v^3) = 0$. Matching coefficients against $x^3 + px + q$ forces the side-condition $-3uv = p$, i.e. $3uv = -p$, and $-(u^3 + v^3) = q$, i.e. $u^3 + v^3 = -q$. The free parameter of the split is now spent — and exactly enough of it.' },
      { label: 'Read the sum and the product of u³ and v³', formula: 'u^3 + v^3 = -q, \\qquad u^3 v^3 = (uv)^3 = \\left(-\\tfrac{p}{3}\\right)^3 = -\\tfrac{p^3}{27}', explanation: 'The product needs no new information: cube the side-condition. Two numbers with a known sum and a known product are the two roots of a quadratic — lesson 8.3\'s Viète staircase run backwards, at degree two.' },
      { label: 'Assemble the quadratic', formula: 't^2 - (u^3 + v^3)\\,t + u^3 v^3 = 0 \\;\\Longrightarrow\\; t^2 + q\\,t - \\tfrac{p^3}{27} = 0', explanation: 'The quadratic with roots $u^3$ and $v^3$: $t^2 - (\\text{sum})t + \\text{product}$, and the sum is $-q$, the product is $-\\tfrac{p^3}{27}$. The cubic is now SOLVED IN PRINCIPLE: solve this quadratic, take cube roots, add them.' },
    ], result: 'with $3uv = -p$, the cubic $x^3 + px + q$ collapses into the quadratic $t^2 + qt - \\tfrac{p^3}{27} = 0$ whose roots are $u^3$ and $v^3$; then $x = u + v$' },
    { kind: 'equation', latex: 'u^3, \\; v^3 \\;\\text{ are the roots of}\\; t^2 + q\\,t - \\tfrac{p^3}{27} = 0 \\tag{2}', note: 'the Cardan quadratic: a degree-three problem reduced to degree two plus two cube roots — the engine sweeps the collapse numerically on six (u, v) pairs before any prose claims it.' },
    { kind: 'equation', latex: 'x = \\sqrt[3]{-\\tfrac{q}{2} + \\sqrt{\\tfrac{q^2}{4} + \\tfrac{p^3}{27}}} \\;+\\; \\sqrt[3]{-\\tfrac{q}{2} - \\sqrt{\\tfrac{q^2}{4} + \\tfrac{p^3}{27}}} \\tag{3}', note: 'Cardan’s formula: solve the quadratic (2) by the quadratic formula and take real cube roots — the celebrated line the Ars Magna printed in 1545.' },
    { kind: 'para', text: 'Before running it, look hard at the quantity under the inner square root, $\\tfrac{q^2}{4} + \\tfrac{p^3}{27}$, because it is the crystal the whole classification grows from. Multiply it by 108: $108 \\cdot \\left(\\tfrac{q^2}{4} + \\tfrac{p^3}{27}\\right) = 27q^2 + 4p^3$. So the under-root quantity is EXACTLY $-\\tfrac{\\Delta}{108}$ for the number $\\Delta = -4p^3 - 27q^2$ — and the sign of $\\Delta$ decides whether Cardan\'s inner square root is real or imaginary. That number $\\Delta$ is the DISCRIMINANT of the depressed cubic, and the next section gives it the full treatment: its sign sorts every depressed cubic into one of three cases, exactly as $b^2 - 4ac$ sorted the quadratics of chapter 1 — but with one case hiding a surprise the quadratics never showed us.' },
    { kind: 'terms', items: [
      { term: 'Depressed cubic', def: 'the form $x^3 + px + q$ with no $x^2$ term — the form EVERY cubic takes under $x = t - \\tfrac{a}{3}$; two coefficients carry all the information.' },
      { term: 'Cardan’s substitution', def: 'the split $x = u + v$ with the side-condition $3uv = -p$, which collapses $x^3 + px + q = 0$ into $u^3 + v^3 = -q$.' },
      { term: 'The Cardan quadratic', def: 'the quadratic $t^2 + qt - \\tfrac{p^3}{27} = 0$ whose two roots are $u^3$ and $v^3$ — the cubic\'s problem reduced to degree two plus cube roots.' },
      { term: 'Discriminant of the depressed cubic', def: '$\\Delta = -4p^3 - 27q^2$ — equal to the squared product of root differences $(\\alpha-\\beta)^2(\\beta-\\gamma)^2(\\gamma-\\alpha)^2$; its sign sorts the three cases.' },
      { term: 'Casus irreducibilis', def: 'the $\\Delta > 0$ case: all three roots real and distinct, yet Cardan\'s formula reaches them only through complex cube roots — the irreducible case.' },
      { term: 'Ferrari’s resolvent cubic', def: 'the auxiliary cubic $M^3 + 2pM^2 + (p^2 - 4r)M - q^2 = 0$ in $M = m^2$ whose solution splits the depressed quartic into two quadratics.' },
      { term: 'Sophie Germain identity', def: '$a^4 + 4b^4 = (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2)$ — the $q = 0$ quartic that still factors over the reals; the classic witness is $x^4 + 4$.' },
      { term: 'Biquadratic quartic', def: 'a quartic with no odd powers at all, $x^4 + px^2 + r$ — a quadratic in $z = x^2$, solved without any resolvent.' },
      { term: 'Numeric audit', def: 'the habit of substituting a claimed root back into its equation — the residual should vanish to rounding scale; a formula is a claim, not a proof.' },
    ] },

    { kind: 'heading', text: 'The Discriminant and the Three Cases' },
    { kind: 'para', text: 'Chapter 1 sorted quadratics by $b^2 - 4ac$: positive meant two real roots, zero a repeated one, negative a conjugate pair. The depressed cubic gets the same treatment from $\\Delta = -4p^3 - 27q^2$, and the sorting is honestly DERIVED rather than announced — in the exercises (L5-3) the identity $\\Delta = (\\alpha-\\beta)^2(\\beta-\\gamma)^2(\\gamma-\\alpha)^2$ is proved and the sign analysis run, so that the case table below is a theorem, not folklore. The engine has already pinned every row on live witnesses; the figure draws the three faces as actual sampled curves so the geometry of each case is visible at a glance.' },
    { kind: 'callout', tone: 'theorem', title: 'The discriminant and the three cases', text: 'For the depressed cubic $x^3 + px + q$ with roots $\\alpha, \\beta, \\gamma$: $\\Delta = -4p^3 - 27q^2 = (\\alpha - \\beta)^2 (\\beta - \\gamma)^2 (\\gamma - \\alpha)^2$. Hence: $\\Delta > 0$ — three distinct real roots (the casus irreducibilis); $\\Delta = 0$ — all roots real with one repeated; $\\Delta < 0$ — one real root and one conjugate pair. The quantity under Cardan\'s inner square root is exactly $-\\tfrac{\\Delta}{108}$, so the sign of $\\Delta$ is simultaneously the fate of the formula and the census of the roots.' },
    { kind: 'equation', latex: '\\Delta = -4p^3 - 27q^2 = (\\alpha - \\beta)^2 (\\beta - \\gamma)^2 (\\gamma - \\alpha)^2 \\tag{4}', note: 'the discriminant of the depressed cubic — the squared product of the three root differences; engine-swept on ten root triples with exact integer arithmetic.' },
    { kind: 'figure', caption: 'The three faces of the depressed cubic, drawn from the actual polynomials. Left: $x^3 + 3x + 1$ with $\\Delta = -135 < 0$ — the curve is monotone ($3x^2 + 3 > 0$ always), so it crosses the real axis exactly once. Middle: $x^3 - 3x + 2$ with $\\Delta = 0$ — the local minimum sits exactly ON the axis at the double root $1$ while the simple root $-2$ crosses. Right: $x^3 - 7x + 6$ with $\\Delta = 400 > 0$ — the hump clears the axis and the dip undercuts it, forcing three crossings at $-3, 1, 2$. Every curve is generated by evaluating its polynomial at 48 sample points: the geometry IS the mathematics.', svg: threeCases84Svg() },
    { kind: 'table', caption: 'The three-case roster with the engine-pinned witnesses the lesson walks end to end. Note the honest coupling: the fate of the formula (real vs complex cube roots) and the census of the roots (how many real) are the SAME information, read from the one number Δ.', head: ['Case', 'Roots', 'Cardan’s route', 'Witness (Δ)'], rows: [
      ['$\\Delta < 0$', 'one real + a conjugate pair', '$u^3, v^3$ real — real cube roots', '$x^3 + 3x + 1$ ($\\Delta = -135$); $x^3 + 6x + 2$ ($\\Delta = -972$)'],
      ['$\\Delta = 0$', 'all real, one repeated', '$u^3 = v^3 = -\\tfrac{q}{2}$', '$x^3 - 3x + 2$ ($\\Delta = 0$); $x^3 - 12x + 16$ ($\\Delta = 0$)'],
      ['$\\Delta > 0$', 'three distinct real', '$u^3, v^3$ complex — the casus irreducibilis', '$x^3 - 7x + 6$ ($\\Delta = 400$); $x^3 - 15x - 4$ ($\\Delta = 13068$)'],
    ] },
    { kind: 'para', text: 'From the above discussion, it follows that the whole of cubic solving is a three-way switch on one number:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) compute $\\Delta = -4p^3 - 27q^2$ first — BEFORE any square root is taken — and let the sign choose the route;',
      '(ii) $\\Delta < 0$: Cardan\'s formula runs on real cube roots and delivers the one real root directly;',
      '(iii) $\\Delta = 0$: skip the formula — the shortcut roots $\\tfrac{3q}{p}$ and $-\\tfrac{3q}{2p}$ (double) are two lines of arithmetic;',
      '(iv) $\\Delta > 0$: brace honestly — the roots are all real, but the formula\'s route passes through complex numbers (the casus irreducibilis section).',
    ] },
    { kind: 'para', text: 'Each case now gets its full worked witness. The $\\Delta = 0$ case first — where the cubic not only classifies but hands over a shortcut worth proving once (the derivation below, the exercise L5-1 later).' },
    { kind: 'example', title: 'Solve $x^3 - 3x + 2 = 0$ by Cardan’s method, and read the repeated root.', steps: [
      'The cubic is already depressed: $p = -3$, $q = 2$; and $\\Delta = -4(-3)^3 - 27(2)^2 = 108 - 108 = 0$ — the repeated-root case.',
      'Now, the Cardan quadratic: $t^2 + 2t - \\tfrac{(-3)^3}{27} = t^2 + 2t + 1 = 0$, i.e. $(t+1)^2 = 0$ — a DOUBLE root of the quadratic, the $\\Delta = 0$ signature.',
      'So, $u^3 = v^3 = -1$, hence $u = v = -1$ (real cube roots) and $x = u + v = -2$.',
      'And the third root: Viète — the roots sum to zero ($\\sigma_1 = 0$), so $-2 + r + r = 0$ gives the double root $r = 1$.',
      'Hence $x^3 - 3x + 2 = (x - 1)^2 (x + 2)$ with roots $1, 1, -2$ — the Cardan sum $u + v$ delivered the SIMPLE root $-2$, and the double root sits at $-\\tfrac{u+v}{2} = 1$.',
      'Check against the shortcut: $\\tfrac{3q}{p} = \\tfrac{6}{-3} = -2$ and $-\\tfrac{3q}{2p} = \\tfrac{-6}{-6} = 1$ — both agree.',
    ], },
    { kind: 'derivation', title: 'Theorem: the Δ = 0 shortcut — the roots are 3q/p and −3q/2p (double)', statement: 'When Δ = −4p³ − 27q² = 0 with p ≠ 0, the depressed cubic x³ + px + q has the simple root 3q/p and the double root −3q/2p; equivalently it equals (x − r)²(x + 2r) with p = −3r², q = 2r³.', steps: [
      { label: 'Assume the double root', formula: '(x - r)^2 (x + 2r) = x^3 - 3r^2 x + 2r^3', explanation: 'A repeated root $r$ with the depressed sum-to-zero forces the third root to $-2r$: $r + r + s = 0$ (Viète, $\\sigma_1 = 0$). Expand $(x-r)^2(x+2r)$ — the engine confirms the expansion term by term — and read off the coefficients.' },
      { label: 'Read off p and q', formula: 'p = -3r^2, \\qquad q = 2r^3', explanation: 'Matching $x^3 - 3r^2 x + 2r^3$ against $x^3 + px + q$ — the repeated-root cubics are exactly this two-parameter family, and $r \\ne 0$ gives $p \\ne 0$.' },
      { label: 'Verify Δ dies', formula: '4p^3 + 27q^2 = 4(-27r^6) + 27(4r^6) = 0', explanation: 'So $\\Delta = -(4p^3 + 27q^2) = 0$ on the whole family — and conversely, the exercises prove $\\Delta = (\\alpha-\\beta)^2(\\beta-\\gamma)^2(\\gamma-\\alpha)^2$, so $\\Delta = 0$ forces two roots to coincide: the family IS the case. The engine sweeps $r = 1$ to $5$: the identity holds with $\\Delta$ literally zero every time.' },
      { label: 'Invert for the roots', formula: '\\tfrac{3q}{p} = \\tfrac{6r^3}{-3r^2} = -2r, \\qquad -\\tfrac{3q}{2p} = \\tfrac{-6r^3}{-6r^2} = r', explanation: 'Simple algebra from $p = -3r^2$, $q = 2r^3$: $\\tfrac{3q}{p}$ reads off the simple root $-2r$ and $-\\tfrac{3q}{2p}$ the double root $r$ — no cube roots anywhere. Check on the witnesses: $p = -3, q = 2$ gives $-2$ and $1$; $p = -12, q = 16$ gives $-4$ and $2$.' },
    ], result: 'at $\\Delta = 0$ the roots are $\\tfrac{3q}{p}$ (simple) and $-\\tfrac{3q}{2p}$ (double) — e.g. $x^3 - 3x + 2$ gives $-2$ and $1$, $x^3 - 12x + 16$ gives $-4$ and $2$' },
    { kind: 'para', text: 'The second $\\Delta = 0$ witness rides the shortcut with zero ceremony, and it is worth doing at examination speed: $x^3 - 12x + 16$ has $\\Delta = -4(-12)^3 - 27(16)^2 = 6912 - 6912 = 0$, so the roots are $\\tfrac{3q}{p} = \\tfrac{48}{-12} = -4$ (simple) and $-\\tfrac{3q}{2p} = \\tfrac{-48}{-24} = 2$ (double) — that is, $(x-2)^2(x+4)$, and the audit multiplies it out to confirm the original cubic exactly. Exercise L3-1 asks you to run this yourself. Now the case with no repeated root and one real root — where Cardan\'s formula runs at full speed and the numeric audit earns its keep.' },
    { kind: 'example', title: 'Solve $x^3 + 3x + 1 = 0$ by Cardan’s formula, and audit the answer numerically.', steps: [
      'Depressed already: $p = 3$, $q = 1$; and $\\Delta = -4(3)^3 - 27(1)^2 = -108 - 27 = -135 < 0$ — one real root, and real cube roots await.',
      'Now, the Cardan quadratic: $t^2 + t - \\tfrac{27}{27} = t^2 + t - 1 = 0$ — and its roots are the golden-ratio family $\\tfrac{-1 \\pm \\sqrt{5}}{2}$.',
      'So, $u^3 = \\tfrac{-1 + \\sqrt{5}}{2} \\approx 0.6180$ and $v^3 = \\tfrac{-1 - \\sqrt{5}}{2} \\approx -1.6180$ — both real, so real cube roots exist.',
      'Now, the cube roots: $u = \\sqrt[3]{0.6180} \\approx 0.8518$ and $v = \\sqrt[3]{-1.6180} \\approx -1.1739$ (both to 4 decimal places).',
      'Hence $x = u + v = 0.8518 - 1.1739 = -0.3222$ — and the AUDIT: $(-0.3222)^3 + 3(-0.3222) + 1 \\approx -0.00005$, a residual at the rounding scale itself; the engine\'s bisection independently pins the root at $-0.3222$ to four decimal places, and the two methods agree to every printed digit.',
      'Check the second audit: $3uv = 3 \\sqrt[3]{u^3 v^3} = 3\\sqrt[3]{-1} = -3 = -p$ — the side-condition holds, so the split is legal.',
    ], },
    { kind: 'example', title: 'Solve $x^3 + 6x + 2 = 0$ by Cardan’s formula.', steps: [
      'Depressed already: $p = 6$, $q = 2$; and $\\Delta = -4(6)^3 - 27(2)^2 = -864 - 108 = -972 < 0$ — one real root again.',
      'Now, the Cardan quadratic: $t^2 + 2t - \\tfrac{216}{27} = t^2 + 2t - 8 = 0$, which factors as $(t - 2)(t + 4) = 0$ — so $u^3 = 2$ and $v^3 = -4$, both REAL and both nice.',
      'So, $x = \\sqrt[3]{2} + \\sqrt[3]{-4} = \\sqrt[3]{2} - \\sqrt[3]{4} \\approx 1.2599 - 1.5874 = -0.3275$.',
      'Check the audit: $3uv = 3\\sqrt[3]{2 \\times (-4)} = 3\\sqrt[3]{-8} = -6 = -p$ — legal split; and the engine\'s bisection root is $-0.32748\\ldots$, matching the formula to every printed digit. The audit residual: $(-0.3275)^3 + 6(-0.3275) + 2 \\approx -0.00013$.',
      'Hence the one real root is $\\sqrt[3]{2} - \\sqrt[3]{4} \\approx -0.3275$ — an irrational no inspection could ever have guessed, delivered by a formula and certified by a machine.',
    ], },

    { kind: 'heading', text: 'The Casus Irreducibilis — the Honest Heart' },
    { kind: 'para', text: 'Now the case the Renaissance could not stomach, and the reason this lesson exists in its present shape. Take $x^3 - 7x + 6$: its roots are visibly $1, 2, -3$ (the factor theorem of lesson 8.3 finds them in seconds), all real, all distinct — and $\\Delta = -4(-7)^3 - 27(6)^2 = 1372 - 972 = 400 > 0$, consistent with three distinct real roots. Run Cardan anyway: the quadratic (2) reads $t^2 + 6t + \\tfrac{343}{27} = 0$, whose own discriminant is $36 - \\tfrac{1372}{27} = -\\tfrac{400}{27}$ — NEGATIVE. The Cardan quadratic has complex roots:' },
    { kind: 'equation', latex: 'u^3, v^3 = -3 \\pm \\tfrac{10}{\\sqrt{27}}\\, i \\approx -3 \\pm 1.9245\\, i, \\qquad \\tfrac{q^2}{4} + \\tfrac{p^3}{27} = -\\tfrac{100}{27} \\tag{5}', note: 'the under-root quantity is negative exactly because $\\Delta > 0$ — the bridge $\\tfrac{q^2}{4} + \\tfrac{p^3}{27} = -\\tfrac{\\Delta}{108}$ pins it: three real roots on one side, complex intermediates on the other.' },
    { kind: 'para', text: 'So the formula demands the cube roots of COMPLEX numbers — to produce three REAL roots. To the sixteenth century this looked like a defect: the Ars Magna called it the casus irreducibilis, the irreducible case, and for decades practitioners simply routed around it (by guessing roots, exactly as the factor theorem does today). The honest modern statement is far more startling than a defect: the complex route is not an inconvenience, it is a THEOREM. In the $\\Delta > 0$ case, no expression for the real roots built from real radicals exists at all — proved by Wantzel in 1843 — so any formula whatsoever in real radicals would fail here. The complex numbers are not in the way; they are the only road. The walk below runs that road end to end, and chapter 3 pays its first big bill: De Moivre\'s theorem on cube roots.' },
    { kind: 'example', title: 'Solve $x^3 - 7x + 6 = 0$ by Cardan’s formula — the full casus irreducibilis walk.', steps: [
      'Depressed already: $p = -7$, $q = 6$; $\\Delta = 1372 - 972 = 400 > 0$ — three distinct real roots, the casus.',
      'Now, the Cardan quadratic $t^2 + 6t + \\tfrac{343}{27} = 0$ gives $u^3, v^3 = -3 \\pm \\tfrac{10}{\\sqrt{27}} i \\approx -3 \\pm 1.9245 i$ — complex, exactly as the bridge $-\\tfrac{\\Delta}{108}$ under the root predicts.',
      'Now, De Moivre on $u^3 = -3 + \\tfrac{10}{\\sqrt{27}} i$: its modulus is $|u^3| = \\sqrt{9 + \\tfrac{100}{27}} = \\sqrt{\\tfrac{343}{27}} \\approx 3.5642$, and its argument $\\theta$ sits in the second quadrant ($\\cos\\theta = \\tfrac{-3}{3.5642} \\approx -0.8418$, $\\theta \\approx 147.3^\\circ$). The three cube roots of $u^3$ live at angles $\\tfrac{\\theta}{3}, \\tfrac{\\theta + 2\\pi}{3}, \\tfrac{\\theta + 4\\pi}{3}$ with common modulus $\\sqrt[3]{\\sqrt{343/27}} \\approx 1.5275$ — the $\\omega$-combinations of chapter 3.',
      'The pairing law: the side-condition $3uv = -p = 7$ survives as $uv = \\tfrac{7}{3}$ REAL — so only the pairings $u \\cdot \\bar{u} = |u|^2 = \\tfrac{7}{3}$ are legal, i.e. each $u$ pairs with its own conjugate. Hence the three roots are $x_k = u_k + \\bar{u}_k = 2\\,\\mathrm{Re}(u_k)$.',
      'So, evaluate the three combinations: $x_k = 2 \\sqrt[3]{\\tfrac{343}{27}^{1/2}} \\cos \\tfrac{\\theta + 2\\pi k}{3}$ lands on $2, -3, 1$ — the engine\'s polar + De Moivre arithmetic pins each value to within $10^{-9}$.',
      'Hence the roots are $1, 2, -3$ — all real, reached through complex cube roots. Audit: $1 - 7 + 6 = 0$, $8 - 14 + 6 = 0$, $-27 + 21 + 6 = 0$, and $(x - 1)(x - 2)(x + 3)$ multiplies out to the original cubic exactly.',
      'And the algebraic reveal the engine pins: $u_0 = 1 + \\tfrac{2}{\\sqrt{3}} i$ exactly — $(1 + \\tfrac{2}{\\sqrt{3}} i)^3 = -3 + \\tfrac{10}{\\sqrt{27}} i$ — with its $\\omega$-relatives $u_1 = -\\tfrac{3}{2} + \\tfrac{1}{2\\sqrt{3}} i$ and $u_2 = \\tfrac{1}{2} - \\tfrac{5}{2\\sqrt{3}} i$; the three sums $2\\,\\mathrm{Re}(u_k)$ are exactly $2, -3, 1$.',
    ], },
    { kind: 'para', text: 'Look at what the reveal says: the complex number $-3 + \\tfrac{10}{\\sqrt{27}} i$ has EXACTLY the cube root $1 + \\tfrac{2}{\\sqrt{3}} i$ — a tidy Gaussian-style point whose real part is a whole number. The polar route found it numerically to $10^{-9}$; the algebraic audit then recognized it exactly. That two-stage habit — compute to high precision, then recognize — is the trust engine in its strongest form, and the Bombelli story below is its sixteenth-century birth.' },
    { kind: 'callout', tone: 'historical', title: 'Bombelli’s wild thought, 1572', text: 'Rafael Bombelli of Bologna, in his Algebra (1572), met Cardan\'s formula on $x^3 - 15x - 4 = 0$: it demands $u^3, v^3 = 2 \\pm 11i$, and the cube root of $2 + 11i$ was, by the arithmetic of his day, an impossible object. Bombelli computed anyway — treating $\\sqrt{-1}$ as a quantity with consistent algebra rules — and found $(2 + i)^3 = 2 + 11i$ exactly, so $u = 2 + i$, $v = 2 - i$, and $x = (2+i) + (2-i) = 4$: a perfectly real answer, delivered only through impossible numbers. "It was a wild thought," his account runs in substance — and complex numbers entered algebra as the price of real answers. The engine pins every number: $\\Delta = 13068 > 0$ (the casus), $x = 4$ is a root, and the remaining roots are $-2 \\pm \\sqrt{3}$.' },
    { kind: 'figure', caption: 'The Bombelli miracle at equal scale on the complex plane. The conjugate pair $u = 2+i$, $v = 2-i$ (green) sits one unit off the real axis; the two orange arrows CUBE them, landing on $u^3 = 2+11i$ and $v^3 = 2-11i$ — and the expansion check $(2+i)^3 = 8 + 12i + 6i^2 + i^3 = 2 + 11i$ is exact. De Moivre\'s law is visible as geometry: cubing triples the argument and cubes the modulus ($\\sqrt{5} \\mapsto 5\\sqrt{5}$). The dashed pairing lines carry the conjugate sum onto the real axis at the ringed point $x = 4$ — the real root of $x^3 - 15x - 4$, whose other roots $-2 \\pm \\sqrt{3}$ come from the leftover quadratic $x^2 + 4x + 1$.', svg: bombelli84Svg() },
    { kind: 'para', text: 'The casus honesty closes with the De Moivre cross-reference that chapter 3 promised would one day be cashed. Lesson 3.5 built the cube roots of unity $1, \\omega, \\omega^2$ and the polar arithmetic of $n$-th roots; here they stopped being vocabulary and became the ONLY route to $x^3 - 7x + 6$\'s three real roots through a formula. The three legal pairings are the $\\omega$-combinations $u_0, \\omega u_0, \\omega^2 u_0$ against their conjugates — the figure in exercise L4-1\'s solution draws all six cube-root points and the three sums landing on $2, -3, 1$. One more honesty before the quartic: the casus is not rare. Any cubic with three real roots — the friendliest-looking case, the one the factor theorem solves by luck when the roots are integers — is exactly the case where the general formula must go complex. The formula and the friendly case are on opposite sides.' },

    { kind: 'heading', text: 'Ferrari’s Resolvent' },
    { kind: 'para', text: 'With the cubic solved, the quartic fell within a year or two — and to Cardano\'s own student. Ludovico Ferrari\'s idea: the depressed quartic $y^4 + py^2 + qy + r$ (no cube term — the $x = t - \\tfrac{a}{4}$ depression kills it, exactly as the cubic\'s shift killed the square term) is to be split into TWO QUADRATICS whose $y^2$-parts are conjugate to each other: $(y^2 + my + n)(y^2 - my + k)$. Multiply the split out and the quartic reappears with three matching conditions — and eliminating the split\'s spare unknowns squeezes out a CUBIC in $M = m^2$: the resolvent. The quartic\'s solution is bought with the cubic\'s solution, which is why this section could not exist before the last three.' },
    { kind: 'derivation', title: 'Theorem: Ferrari’s resolvent — the quartic splits via a cubic in M = m²', statement: 'For the depressed quartic y⁴ + py² + qy + r, seek (y² + my + n)(y² − my + k). Matching gives n + k − m² = p, m(k − n) = q, nk = r; with M = m², the multiplier M is pinned by the resolvent cubic M³ + 2pM² + (p² − 4r)M − q² = 0.', steps: [
      { label: 'Split into conjugate quadratics', formula: '(y^2 + my + n)(y^2 - my + k)', explanation: 'Two quadratics, deliberately mismatched: the $y^2$ coefficients are both $1$ (to rebuild $y^4$) and the $y$ coefficients are $m$ and $-m$ — conjugate, so the cube term they would manufacture cancels in advance. Three unknowns $m, n, k$ stand against the quartic\'s three coefficients $p, q, r$.' },
      { label: 'Multiply out and match', formula: 'y^4 + (n + k - m^2)\\,y^2 + m(k - n)\\,y + nk', explanation: 'The expansion has no $y^3$ term (the conjugate choice killed it) and three surviving coefficients; matching against $y^4 + py^2 + qy + r$ gives the system $n + k - m^2 = p$, $m(k - n) = q$, $nk = r$ — three equations, three unknowns.' },
      { label: 'Isolate n and k', formula: 'k - n = \\tfrac{q}{m}, \\qquad k + n = p + m^2', explanation: 'Solve the first two equations for the sum and difference of $k$ and $n$: then $k = \\tfrac{(p + m^2) + q/m}{2}$ and $n = \\tfrac{(p + m^2) - q/m}{2}$ — everything now hangs on the single unknown $m$.' },
      { label: 'Force the last condition', formula: 'nk = \\tfrac{(p + m^2)^2 - \\tfrac{q^2}{m^2}}{4} = r', explanation: 'The product of the two expressions must equal $r$ — the one equation $m$ must satisfy. Multiply through by $4m^2$ to clear the denominator.' },
      { label: 'The resolvent cubic', formula: 'M^3 + 2p\\,M^2 + (p^2 - 4r)\\,M - q^2 = 0, \\qquad M = m^2', explanation: 'With $M = m^2$: $m^2(p + m^2)^2 - q^2 = 4rm^2$ becomes $M(p + M)^2 - 4rM - q^2 = 0$, which expands to the resolvent — a CUBIC in $M$, solvable by the machinery of this very lesson. The engine sweeps every $(m, n, k)$ triple: the resolvent holds exactly, and the split multiplies back to the quartic term by term.' },
    ], result: 'the quartic splits once $M = m^2$ solves $M^3 + 2pM^2 + (p^2 - 4r)M - q^2 = 0$; then $k + n = p + M$ and $k - n = \\tfrac{q}{m}$ pin the two quadratics' },
    { kind: 'equation', latex: 'M^3 + 2p\\,M^2 + (p^2 - 4r)\\,M - q^2 = 0 \\tag{6}', note: 'Ferrari’s resolvent cubic in $M = m^2$ — the quartic problem converted into a cubic problem, which the first half of the lesson already owns.' },
    { kind: 'para', text: 'The exhibit — chosen engine-first so every station of the walk is an integer — is $x^4 - 25x^2 + 60x - 36$, already depressed with $p = -25$, $q = 60$, $r = -36$. It deserves its status as one of the chapter\'s showcases: the resolvent turns out to have a RATIONAL root, so the entire quartic dismantles with nothing but integer arithmetic, and the four roots it hides are $-6, 3, 1, 2$ — the reader can watch a general method outperform the factor-theorem guessing that found nothing here at sight.' },
    { kind: 'example', title: 'Solve $x^4 - 25x^2 + 60x - 36 = 0$ by Ferrari’s method.', steps: [
      'Depress: nothing to do — no cube term, so $p = -25$, $q = 60$, $r = -36$ directly.',
      'Now, assemble the resolvent: $M^3 + 2pM^2 + (p^2 - 4r)M - q^2 = M^3 - 50M^2 + (625 + 144)M - 3600 = M^3 - 50M^2 + 769M - 3600$.',
      'Hunt the rational root: $M = 9$ gives $729 - 4050 + 6921 - 3600 = 0$ — a root, so $m^2 = 9$ and $m = 3$.',
      'So, the two halves: $k - n = \\tfrac{q}{m} = \\tfrac{60}{3} = 20$ and $k + n = p + m^2 = -25 + 9 = -16$ — solve the pair: $k = 2$, $n = -18$.',
      'Check the last condition before trusting it: $nk = (-18)(2) = -36 = r$ — exact.',
      'Hence the split: $(x^2 + 3x - 18)(x^2 - 3x + 2) = 0$, i.e. $(x + 6)(x - 3)(x - 1)(x - 2) = 0$, so the roots are $-6, 3, 1, 2$.',
      'Check the audit: each root satisfies the quartic literally (for instance $(-6)^4 - 25(-6)^2 + 60(-6) - 36 = 1296 - 900 - 360 - 36 = 0$), and the two quadratics multiply back to the original polynomial term by term.',
    ], },
    { kind: 'figure', caption: 'The Ferrari walk on the exhibit, station by station. Green stations carry the algebra (the depressed quartic, the resolvent, the split); amber stations carry the arithmetic that pins it (the rational root $M = 9$ verified by substitution, the $k, n$ pair solved and cross-checked by $nk = -36 = r$). The walk ends in two ordinary quadratics — the quartic never solved anything; it CONVERTED itself into solvable pieces, which is the entire strategy of the theory of equations.', svg: ferrariWalk84Svg() },
    { kind: 'para', text: 'Two special cases close the quartic, and both live in the $q = 0$ corner — quartics with no linear term. The first is the SOPHIE GERMAIN identity, a factorization classic: $a^4 + 4b^4$ looks irreducible over the reals (as $x^4 + 4$ does), yet splits into two real quadratics. The engine-first reason it works is the Ferrari route itself: at $q = 0$ the resolvent degenerates to $M(M^2 + 2pM + p^2 - 4r) = 0$, and a usable root is usually sitting in the degenerate factor. The second is the BIQUADRATIC — no linear term AND palindromic-symmetric structure in $x^2$: the substitution $z = x^2$ dissolves it into a plain quadratic with no resolvent at all. The illustration runs both, and the contrast between them is the teaching point.' },
    { kind: 'example', title: 'Solve $x^4 + 4 = 0$ (the Sophie Germain case) and $x^4 - 5x^2 + 4 = 0$ (the biquadratic case), and contrast the two routes.', steps: [
      'First $x^4 + 4$: depressed with $p = 0$, $q = 0$, $r = 4$ — and the resolvent degenerates: $M^3 - 16M = M(M - 4)(M + 4) = 0$.',
      'So, take the usable root $M = 4$ (note: $M = 4$ satisfies the resolvent; $M = 16$ does not — $16^3 - 16 \\cdot 16 = 3840 \\ne 0$), giving $m = 2$.',
      'Now, the halves: $k - n = \\tfrac{q}{m} = 0$ and $k + n = p + m^2 = 4$, so $k = n = 2$ — and the check $nk = 4 = r$ is exact.',
      'Hence the split: $x^4 + 4 = (x^2 + 2x + 2)(x^2 - 2x + 2)$ — the Sophie Germain identity at $a = x, b = 1$ — and the quadratic formula reads the roots: $1 \\pm i$ and $-1 \\pm i$, audited by direct substitution in the complex arithmetic.',
      'And the one-line direct route: $x^4 + 4 = (x^2 + 2)^2 - (2x)^2$ — complete the square, then a difference of squares; the same two quadratics fall out with no resolvent invoked.',
      'Now, $x^4 - 5x^2 + 4$: the biquadratic — set $z = x^2$, so $z^2 - 5z + 4 = (z - 1)(z - 4) = 0$ and $z \\in \\{1, 4\\}$, hence $x = \\pm 1, \\pm 2$ — all four roots real, no resolvent needed.',
      'Hence the contrast: both quartics have $q = 0$, but the $z = x^2$ route meets real $z$-roots only in the biquadratic; when the $z$-quadratic has no real roots (here $z^2 + 4$), the Sophie Germain split still finds two REAL quadratics — carrying complex roots.',
    ], },
    { kind: 'equation', latex: 'a^4 + 4b^4 = \\left(a^2 - 2ab + 2b^2\\right)\\left(a^2 + 2ab + 2b^2\\right) \\tag{7}', note: 'the Sophie Germain identity — at $a = x, b = 1$ it is the $x^4 + 4$ split; engine-swept on six $(a, b)$ pairs before the prose claimed it.' },
    { kind: 'para', text: 'The chapter\'s historical heart closes here, and the shape of the closing is the shape of the whole theory: the cubic was converted to a quadratic (Cardan), the quartic converted to a cubic (Ferrari), and every conversion was paid for by an audit — the numeric check that the claimed roots actually satisfy the equation. That habit is the platform\'s standing promise and this lesson\'s eighth concept: numeric verification as the trust engine. The formula hands you a CLAIM; the substitution hands you a CERTIFICATE; and the engine\'s bisection stands behind both as the independent witness. Quintic solvers, five centuries later, would meet a wall where this road ends — but that is chapter 10\'s story, named honestly at the doorstep.' },
    { kind: 'callout', tone: 'warn', title: 'Four traps the Cardan–Ferrari machinery sets', text: 'Trap one — forgetting to depress: Cardan\'s formula is for the DEPRESSED cubic only; applied to $x^3 + ax^2 + bx + c$ directly it is simply wrong — run $x = t - \\tfrac{a}{3}$ first, always. Trap two — trusting the formula blind: a sign slip in the quadratic or the cube roots survives silently unless you substitute back; the audit ($f(-0.3222) \\approx -0.00005$ above) is the only thing that catches arithmetic at the rounding scale. Trap three — declaring "no real roots" from complex $u^3, v^3$: the casus irreducibilis has THREE real roots, the complex intermediates are the ROUTE, not the verdict — check $\\Delta$ before you conclude anything. Trap four — sign errors in $\\Delta$: the formula is $\\Delta = -4p^3 - 27q^2$, with BOTH minus signs; computing $4p^3$ or dropping the 27 flips the case and sends you to the wrong route entirely.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The honest syllabus mapping: JEE Main does not ask for Cardan\'s formula — the quadratic chapter carries that paper\'s equation weight — but the machinery AROUND the cubic is genuine examination currency. The depression $x = t - \\tfrac{a}{3}$ is a speed tool whenever a cubic\'s symmetric reads are wanted (it centers the roots, making $\\sigma_1 = 0$ and the Viète reads two-number reads — Illustration 1 and the insight box); the discriminant-case classification appears in state-board and classic-algebra papers exactly as the three-case table states it; the transformation habit is lesson 8.5\'s own territory and this lesson\'s depression is its first instance; and the numeric audit is the discipline that separates the marks from the misses on every ugly-root problem. JEE (Advanced)-style items that hand over a cubic with unguessable roots (an $x^3 + 3x + 1$ shape) are answered by exactly the trust discipline this lesson installs: depress, classify by $\\Delta$, solve the Cardan quadratic, cube-root, then AUDIT — never leave an un-audited formula on the page. Sophie Germain factorizations ($x^4 + 4$ shapes) and biquadratic solves ($\\pm$-root families) are standard board fare; Ferrari\'s full resolvent is university-classical territory, kept here because the platform owes its readers the whole machine, honestly labelled.' },
    { kind: 'quiz', title: 'Check yourself: Cardan and Ferrari', items: [
      { q: 'The first move of Cardan’s method on $x^3 + ax^2 + bx + c = 0$ is', options: ['factor by grouping', 'the substitution $x = t - \\tfrac{a}{3}$ to depress the cubic', 'taking cube roots of both sides', 'completing the cube'], answer: 1, explain: 'Option 1 is the method\'s fixed opening: the substitution kills the $t^2$ term ($-a + a = 0$ in the expansion), and only the depressed cubic $t^3 + pt + q$ feeds the $u + v$ machinery. Option 0 is the factor-theorem route of lesson 8.3 — the NICE-root method, not the general one; it simply fails on $x^3 + 3x + 1$. Option 2 has nothing to take the cube root OF — the cubic is not a pure cube until the split manufactures one. Option 3 is not a thing for cubics: there is no third-power analogue of completing the square that finishes the job; the depression only REMOVES the square term, it does not solve.' },
      { q: 'For the depressed cubic $x^3 + px + q$, the discriminant $-4p^3 - 27q^2 = 0$ signals', options: ['one real root', 'no real root', 'a repeated root', 'three equal roots'], answer: 2, explain: 'Option 2 is the case: $\\Delta = 0$ means the squared product of root differences $(\\alpha-\\beta)^2(\\beta-\\gamma)^2(\\gamma-\\alpha)^2$ vanishes — two roots coincide — and all roots are real, as on $x^3 - 3x + 2 = (x-1)^2(x+2)$. Option 0 is the $\\Delta < 0$ case ($x^3 + 3x + 1$, $\\Delta = -135$). Option 1 never happens for an odd-degree real polynomial — the sign-change argument of lesson 8.1 forces at least one real root. Option 3 would need ALL differences zero — a triple root $x^3 = 0$ shape with $p = q = 0$, strictly stronger than $\\Delta = 0$.' },
      { q: '$x^3 - 7x + 6$ has $\\Delta = 400 > 0$. Its roots are', options: ['all real and distinct: $1, 2, -3$', 'one real and a conjugate pair', 'a triple root', 'not expressible'], answer: 0, explain: 'Option 0: $\\Delta > 0$ is the three-distinct-real-roots case, and the witness factorizes as $(x-1)(x-2)(x+3)$ — roots $1, 2, -3$, audited by substitution. Option 1 is the $\\Delta < 0$ case — exactly backwards. Option 2 would be an $x^3$-only shape; the witness has three different roots. Option 3 is doubly wrong: the roots are integers, and in any case $\\Delta > 0$ roots ARE expressible — through the complex cube roots of $-3 \\pm \\tfrac{10}{\\sqrt{27}} i$, the casus route the lesson walks in full.' },
      { q: 'The casus irreducibilis is the case where', options: ['the formula fails', 'all three roots are real but the Cardan formula routes through complex cube roots', 'p = 0', 'q = 0'], answer: 1, explain: 'Option 1 is the honest statement: $\\Delta > 0$, three real roots, and the Cardan quadratic has negative discriminant, so $u^3, v^3$ are complex and the route to the real answers runs through complex cube roots — as on $x^3 - 7x + 6$ and Bombelli\'s $x^3 - 15x - 4$. Option 0 is precisely what the casus is NOT: the formula succeeds, through complex intermediates — and Wantzel proved no real-radical route exists at all. Option 2 and Option 3 are parameter degeneracies, not the casus; $q = 0$ cubics like $x^3 - 7x$ factor at sight.' },
      { q: 'Ferrari’s method on a depressed quartic $y^4 + py^2 + qy + r$ seeks', options: ['a factorization $(y^2 + my + n)(y^2 - my + k)$ via a resolvent cubic', 'the substitution $y = t + \\tfrac{p}{4}$', 'Descartes’ rule', 'two cube roots'], answer: 0, explain: 'Option 0 is the method: the conjugate-quadratic split, with $M = m^2$ pinned by the resolvent $M^3 + 2pM^2 + (p^2 - 4r)M - q^2 = 0$ — a cubic, solved by the lesson\'s first half, then two ordinary quadratics. Option 1 is a corruption of the DEPRESSION move — which uses $-\\tfrac{a}{4}$ on the QUARTIC\'s cube coefficient, and is needed only when the quartic is not already depressed. Option 2 counts roots by sign — lesson 8.2\'s census tool, no solving power here. Option 4 is Cardan\'s cubic machinery, not Ferrari\'s: the quartic route runs through a resolvent CUBIC, not a pair of cube roots.' },
    ] },
    { kind: 'exercises', title: 'Exercises 8.4', sets: [
      { level: 'L1', questions: [
        { q: 'Depress the cubic $x^3 - 6x^2 + 11x - 6$ by the substitution $x = t + 2$, and read off all three roots of the original.', solution: [
          'Read the coefficient: $a = -6$, so the depression is $x = t - \\tfrac{a}{3} = t + 2$.',
          'Now, substitute and expand: $(t+2)^3 - 6(t+2)^2 + 11(t+2) - 6 = t^3 + 6t^2 + 12t + 8 - 6t^2 - 24t - 24 + 11t + 22 - 6$.',
          'So, the $t^2$ terms cancel ($6 - 6 = 0$), the $t$ terms give $12 - 24 + 11 = -1$, the constants give $8 - 24 + 22 - 6 = 0$: the depressed cubic is $t^3 - t$.',
          'Hence $t^3 - t = t(t-1)(t+1) = 0$ gives $t \\in \\{-1, 0, 1\\}$, so $x = t + 2$ runs over $\\{1, 2, 3\\}$.',
          'Check the audit: $1 + 2 + 3 = 6$ (Viète: $\\sigma_1 = -a$) and each of $1, 2, 3$ satisfies the original cubic literally.',
        ], answer: 'the depressed form is $t^3 - t$; the roots are $1, 2, 3$' },
        { q: 'Compute the discriminant of $x^3 - 3x + 2$ and state what it signals about the roots.', solution: [
          'Read the parameters: the cubic is depressed with $p = -3$, $q = 2$.',
          'So, $\\Delta = -4p^3 - 27q^2 = -4(-27) - 27(4) = 108 - 108 = 0$.',
          'Hence $\\Delta = 0$ signals a REPEATED root — all roots real with two of them coinciding; in fact $x^3 - 3x + 2 = (x - 1)^2(x + 2)$, roots $1, 1, -2$.',
          'Check against the shortcut: $\\tfrac{3q}{p} = -2$ (the simple root) and $-\\tfrac{3q}{2p} = 1$ (the double root) — both are roots, and the double root also kills the derivative $3x^2 - 3$ at $x = 1$.',
        ], answer: '$\\Delta = 0$ — a repeated root: $x^3 - 3x + 2 = (x-1)^2(x+2)$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Solve $x^3 + 3x + 1 = 0$ by Cardan’s formula, and audit the answer numerically.', solution: [
          'Depress: already depressed — $p = 3$, $q = 1$; and $\\Delta = -4(27) - 27 = -135 < 0$, so ONE real root with real cube roots on the route.',
          'Now, the Cardan quadratic: $t^2 + t - \\tfrac{p^3}{27} = t^2 + t - 1 = 0$, so $u^3, v^3 = \\tfrac{-1 \\pm \\sqrt{5}}{2}$ — the golden-ratio family, both REAL.',
          'So, the cube roots: $u = \\sqrt[3]{\\tfrac{-1 + \\sqrt{5}}{2}} \\approx 0.8518$ and $v = \\sqrt[3]{\\tfrac{-1 - \\sqrt{5}}{2}} \\approx -1.1739$.',
          'Hence $x = u + v \\approx 0.8518 - 1.1739 = -0.3222$.',
          'Check the audit: $(-0.3222)^3 + 3(-0.3222) + 1 \\approx -0.00005$ — a residual at the rounding scale; the engine\'s independent bisection pins the same root $-0.3222$ to four decimal places, and $3uv = 3\\sqrt[3]{-1} = -3 = -p$ certifies the split. The figure below draws the whole walk.',
        ], answer: '$x = \\sqrt[3]{\\tfrac{-1 + \\sqrt{5}}{2}} + \\sqrt[3]{\\tfrac{-1 - \\sqrt{5}}{2}} \\approx -0.3222$, audited', figures: [
          { caption: 'The Cardan walk on $x^3 + 3x + 1$: the two roots of $t^2 + t - 1 = 0$ on the number line ($u^3 = 0.6180$, $v^3 = -1.6180$), the cube-root machine producing $0.8518$ and $-1.1739$, and the audited sum $x = -0.3222$ with its residual.', svg: cardanLine84Svg() },
        ] },
        { q: 'Write down Ferrari’s resolvent cubic for $x^4 - 25x^2 + 60x - 36 = 0$ and verify that $M = 9$ is a root.', solution: [
          'Read the quartic: already depressed with $p = -25$, $q = 60$, $r = -36$.',
          'Now, assemble the resolvent: $M^3 + 2pM^2 + (p^2 - 4r)M - q^2$, i.e. $M^3 - 50M^2 + (625 + 144)M - 3600 = M^3 - 50M^2 + 769M - 3600$.',
          'So, test $M = 9$: $9^3 - 50 \\cdot 9^2 + 769 \\cdot 9 - 3600 = 729 - 4050 + 6921 - 3600 = 0$ — verified by direct substitution.',
          'Hence $m^2 = 9$ gives $m = 3$, and the resolvent\'s job is done — the quartic now splits into two ordinary quadratics (the full walk is exercise L4-2).',
        ], answer: 'the resolvent is $M^3 - 50M^2 + 769M - 3600$, and $M = 9$ is a root' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $x^3 - 12x + 16 = 0$ by the $\\Delta = 0$ shortcut.', solution: [
          'Read the parameters: $p = -12$, $q = 16$; and $\\Delta = -4(-12)^3 - 27(16)^2 = 6912 - 6912 = 0$ — the repeated-root case.',
          'So, the shortcut: the simple root is $\\tfrac{3q}{p} = \\tfrac{48}{-12} = -4$, and the double root is $-\\tfrac{3q}{2p} = \\tfrac{-48}{-24} = 2$.',
          'Hence the roots are $2, 2, -4$ — i.e. $x^3 - 12x + 16 = (x - 2)^2 (x + 4)$.',
          'Check the audit: multiply $(x-2)^2(x+4)$ out — $x^3 + 4x^2 - 4x^2 - 16x + 4x + 16 = x^3 - 12x + 16$ — exact; and the double root kills the derivative $3x^2 - 12$ at $x = 2$.',
        ], answer: 'roots $2, 2, -4$, i.e. $(x-2)^2(x+4)$' },
        { q: 'Solve $x^3 + 6x + 2 = 0$ by Cardan’s formula, and audit the answer.', solution: [
          'Depress: already depressed — $p = 6$, $q = 2$; and $\\Delta = -4(216) - 27(4) = -972 < 0$, so one real root.',
          'Now, the Cardan quadratic: $t^2 + 2t - \\tfrac{216}{27} = t^2 + 2t - 8 = (t - 2)(t + 4)$, so $u^3 = 2$ and $v^3 = -4$.',
          'So, $x = \\sqrt[3]{2} + \\sqrt[3]{-4} = \\sqrt[3]{2} - \\sqrt[3]{4} \\approx 1.2599 - 1.5874 = -0.3275$.',
          'Hence the single real root is $\\sqrt[3]{2} - \\sqrt[3]{4} \\approx -0.3275$.',
          'Check the audit: $3uv = 3\\sqrt[3]{-8} = -6 = -p$ certifies the split, and the engine\'s bisection gives $-0.32748\\ldots$ — the formula and the machine agree to every printed digit (residual $\\approx -0.00013$ at the 4-dp value).',
        ], answer: '$x = \\sqrt[3]{2} - \\sqrt[3]{4} \\approx -0.3275$' },
        { q: 'Factor $x^4 + 4$ into two real quadratics (the Sophie Germain identity) and solve.', solution: [
          'Split by Sophie Germain with $a = x$, $b = 1$: $x^4 + 4 = (x^2 - 2x + 2)(x^2 + 2x + 2)$.',
          'Check by expansion: $(x^2 - 2x + 2)(x^2 + 2x + 2) = x^4 + 2x^3 + 2x^2 - 2x^3 - 4x^2 - 4x + 2x^2 + 4x + 4 = x^4 + 0x^3 + 0x^2 + 0x + 4$ — exact.',
          'So, solve each quadratic: $x^2 - 2x + 2 = 0$ gives $x = 1 \\pm i$, and $x^2 + 2x + 2 = 0$ gives $x = -1 \\pm i$.',
          'Hence the four roots are $1 + i, 1 - i, -1 + i, -1 - i$ — a conjugate-symmetric quartet, sum zero (as the missing $x^3$ term demands) and product $4$.',
          'Check the audit: substitute $x = 1 + i$ into $x^2 - 2x + 2$: $(1+i)^2 - 2(1+i) + 2 = 2i - 2 - 2i + 2 = 0$ — certified in the complex arithmetic.',
        ], answer: '$x^4 + 4 = (x^2 - 2x + 2)(x^2 + 2x + 2)$; the roots are $1 \\pm i, -1 \\pm i$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Run the full casus irreducibilis walk on $x^3 - 7x + 6 = 0$: form the Cardan quadratic, take the complex $u^3, v^3$, apply the $\\omega$-combinations with the pairing law, and land all three roots.', solution: [
          'Depress: already depressed — $p = -7$, $q = 6$; and $\\Delta = -4(-343) - 27(36) = 1372 - 972 = 400 > 0$ — three distinct real roots: the casus.',
          'Now, the Cardan quadratic: $t^2 + 6t + \\tfrac{343}{27} = 0$, whose discriminant is $36 - \\tfrac{1372}{27} = -\\tfrac{400}{27} < 0$ — so $u^3, v^3 = -3 \\pm \\tfrac{10}{\\sqrt{27}} i \\approx -3 \\pm 1.9245 i$, complex.',
          'So, the pairing law: $3uv = -p = 7$ means $uv = \\tfrac{7}{3}$ REAL — only the conjugate pairings survive, $u \\bar u = |u|^2 = \\tfrac{7}{3}$, so each root is $x_k = u_k + \\bar{u}_k = 2\\,\\mathrm{Re}(u_k)$.',
          'Now, the cube roots by De Moivre: $|u^3| = \\sqrt{\\tfrac{343}{27}}$, argument $\\theta \\approx 147.3^\\circ$; the three cube roots stand at angles $\\tfrac{\\theta + 2\\pi k}{3}$, and the three sums $2\\sqrt[3]{\\sqrt{343/27}}\\cos\\tfrac{\\theta + 2\\pi k}{3}$ land on $2, -3, 1$ (the engine pins each to $10^{-9}$).',
          'Hence the roots are $1, 2, -3$ — audited by substitution: $1 - 7 + 6 = 0$, $8 - 14 + 6 = 0$, $-27 + 21 + 6 = 0$.',
          'And the exact reveal the engine pins: $u_0 = 1 + \\tfrac{2}{\\sqrt{3}} i$ (since $(1 + \\tfrac{2}{\\sqrt{3}} i)^3 = -3 + \\tfrac{10}{\\sqrt{27}} i$), with $\\omega$-relatives $u_1 = -\\tfrac{3}{2} + \\tfrac{1}{2\\sqrt{3}} i$ and $u_2 = \\tfrac{1}{2} - \\tfrac{5}{2\\sqrt{3}} i$; the three sums $2\\,\\mathrm{Re}(u_k)$ are exactly $2, -3, 1$. The figure below draws the six cube-root points and the three pairings.',
        ], answer: 'the roots are $1, 2, -3$ — three real roots reached through the complex cube roots of $-3 \\pm \\tfrac{10}{\\sqrt{27}} i$', figures: [
          { caption: 'The casus drawn: the three cube roots of $-3 + \\tfrac{10}{\\sqrt{27}} i$ (green) and their conjugates (amber) on the complex plane at equal scale; the pairing law $uv = \\tfrac{7}{3}$ real admits only the conjugate pairings, whose three sums land on the real axis at $2$, $-3$, $1$ — the three real roots of $x^3 - 7x + 6$.', svg: casusPlane84Svg() },
        ] },
        { q: 'Run the full Ferrari walk on $x^4 - 25x^2 + 60x - 36 = 0$: assemble the resolvent, find the rational root, split into two quadratics, and solve completely.', solution: [
          'Depress: no cube term — $p = -25$, $q = 60$, $r = -36$ directly.',
          'Now, the resolvent: $M^3 + 2pM^2 + (p^2 - 4r)M - q^2 = M^3 - 50M^2 + 769M - 3600$.',
          'So, hunt the rational root: $M = 9$ gives $729 - 4050 + 6921 - 3600 = 0$, hence $m = 3$.',
          'Now, the halves: $k - n = \\tfrac{q}{m} = 20$ and $k + n = p + m^2 = -16$; solving, $k = 2$, $n = -18$, with the check $nk = -36 = r$ exact.',
          'Hence the split: $(x^2 + 3x - 18)(x^2 - 3x + 2) = 0$ — and expanding the product reproduces $x^4 - 25x^2 + 60x - 36$ term by term.',
          'So, solve the two quadratics: $x^2 + 3x - 18 = (x + 6)(x - 3)$ gives $-6, 3$; $x^2 - 3x + 2 = (x - 1)(x - 2)$ gives $1, 2$.',
          'Check the audit: each of $-6, 3, 1, 2$ satisfies the quartic literally (e.g. $3^4 - 25 \\cdot 9 + 180 - 36 = 81 - 225 + 180 - 36 = 0$), and the four roots multiply to $-36 = r$ with sum $0$ — the Viète read of the depressed quartic.',
        ], answer: 'the split is $(x^2 + 3x - 18)(x^2 - 3x + 2)$; the roots are $-6, 3, 1, 2$' },
        { q: 'Solve $x^4 - 5x^2 + 4 = 0$ (the biquadratic case) and verify every root.', solution: [
          'Recognize the shape: no odd powers at all — set $z = x^2$.',
          'So, the $z$-quadratic: $z^2 - 5z + 4 = (z - 1)(z - 4) = 0$, so $z \\in \\{1, 4\\}$.',
          'Hence $x^2 = 1$ gives $x = \\pm 1$ and $x^2 = 4$ gives $x = \\pm 2$: the roots are $1, -1, 2, -2$.',
          'Check the audit: each root satisfies the quartic literally ($1 - 5 + 4 = 0$, $16 - 20 + 4 = 0$), and the factorization $x^4 - 5x^2 + 4 = (x^2 - 1)(x^2 - 4)$ multiplies back exactly.',
          'So, the biquadratic needed no resolvent: the $z = x^2$ route dissolves it into one ordinary quadratic — the friendliest corner of the quartic world.',
        ], answer: 'the roots are $\\pm 1, \\pm 2$, via $(x^2 - 1)(x^2 - 4)$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove the $\\Delta = 0$ shortcut: if $x^3 + px + q = 0$ has $\\Delta = -4p^3 - 27q^2 = 0$ (with $p \\ne 0$), its roots are $\\tfrac{3q}{p}$ and $-\\tfrac{3q}{2p}$ (double). Verify on both witnesses $x^3 - 3x + 2$ and $x^3 - 12x + 16$.', solution: [
          'Assume the double root: a repeated root $r$ with the depressed sum-to-zero forces the third root to $-2r$ (Viète: $r + r + s = 0$).',
          'So, expand $(x - r)^2(x + 2r) = x^3 - 3r^2 x + 2r^3$, and match: $p = -3r^2$, $q = 2r^3$ — the repeated-root family.',
          'Now, verify $\\Delta$ dies: $4p^3 + 27q^2 = 4(-27r^6) + 27(4r^6) = 0$, so $\\Delta = 0$ on the whole family; conversely $\\Delta = (\\alpha - \\beta)^2(\\beta - \\gamma)^2(\\gamma - \\alpha)^2$ vanishes only when two roots coincide — so the family IS the case (and $r \\ne 0$ keeps $p \\ne 0$).',
          'So, invert for the roots: $\\tfrac{3q}{p} = \\tfrac{6r^3}{-3r^2} = -2r$ is the simple root, and $-\\tfrac{3q}{2p} = \\tfrac{-6r^3}{-6r^2} = r$ is the double root.',
          'Hence the shortcut is proved — no cube roots anywhere in the $\\Delta = 0$ corner.',
          'Check on witness one, $x^3 - 3x + 2$ ($p = -3, q = 2$): $\\tfrac{3q}{p} = -2$ and $-\\tfrac{3q}{2p} = 1$, i.e. $(x-1)^2(x+2)$ — both are roots, and the double root $1$ kills the derivative $3x^2 - 3$.',
          'And witness two, $x^3 - 12x + 16$ ($p = -12, q = 16$): $\\tfrac{3q}{p} = -4$ and $-\\tfrac{3q}{2p} = 2$, i.e. $(x-2)^2(x+4)$ — again both roots, the double root killing $3x^2 - 12$ at $2$.',
        ], answer: 'proved: at $\\Delta = 0$ the roots are $\\tfrac{3q}{p}$ (simple) and $-\\tfrac{3q}{2p}$ (double); witnesses $-2, 1$ and $-4, 2$ respectively' },
        { q: 'Prove that the depression substitution $x = t - \\tfrac{a}{3}$ always kills the $t^2$ term of $x^3 + ax^2 + bx + c$: expand $(t - \\tfrac{a}{3})^3 + a(t - \\tfrac{a}{3})^2 + b(t - \\tfrac{a}{3}) + c$ and watch the $a/3$ coefficient cancellation. Then verify on two witnesses.', solution: [
          'Expand the cube: $(t - \\tfrac{a}{3})^3 = t^3 - a t^2 + \\tfrac{a^2}{3} t - \\tfrac{a^3}{27}$ — the manufactured $t^2$ coefficient is $-a = -3 \\cdot \\tfrac{a}{3}$.',
          'Now, expand the square term: $a(t - \\tfrac{a}{3})^2 = a t^2 - \\tfrac{2a^2}{3} t + \\tfrac{a^3}{9}$ — the carried $t^2$ coefficient is $+a$.',
          'So, the $t^2$ coefficient of the whole expression is $-a + a = 0$, for every $a$: the shift $\\tfrac{a}{3}$ was chosen precisely so that the cube\'s manufactured $-3h = -a$ cancels the incoming $+a$ — the cancellation is forced by design, not by luck.',
          'Now, collect the survivors: $t^3 + (b - \\tfrac{a^2}{3}) t + (\\tfrac{2a^3}{27} - \\tfrac{ab}{3} + c)$ — the $t$ terms $\\tfrac{a^2}{3} - \\tfrac{2a^2}{3} + b$ and the constants $-\\tfrac{a^3}{27} + \\tfrac{a^3}{9} - \\tfrac{ab}{3} + c$.',
          'Hence every cubic is a shifted $t^3 + pt + q$ — the engine sweeps the composition over six values of $a$ in exact integer arithmetic scaled by 27, and the $t^2$ slot reads 0 every time.',
          'Check witness one, $x^3 - 6x^2 + 11x - 6$ with $x = t + 2$: the expansion collapses to $t^3 - t$ with the $t^2$ slot dead (Illustration 1).',
          'And witness two, $x^3 - 9x^2 + 26x - 24$ (roots $2, 3, 4$) with $x = t + 3$: $(t+3)^3 - 9(t+3)^2 + 26(t+3) - 24 = t^3 + 9t^2 + 27t + 27 - 9t^2 - 54t - 81 + 26t + 78 - 24 = t^3 - t$ — the $9 - 9$ cancellation in the open.',
        ], answer: 'proved — the $t^2$ coefficient is $-a + a = 0$ by the choice of $\\tfrac{a}{3}$; both witnesses depress to $t^3 - t$' },
        { q: 'The casus census: prove that for the depressed cubic, $\\Delta = -4p^3 - 27q^2$ equals the squared product of differences $(\\alpha - \\beta)^2(\\beta - \\gamma)^2(\\gamma - \\alpha)^2$, and deduce that $\\Delta > 0 \\iff$ three distinct real roots. Verify the identity on $x^3 - 7x + 6$ and $x^3 - 3x + 2$.', solution: [
          'Set up the reads: for the depressed cubic the roots satisfy $\\sigma_1 = \\alpha + \\beta + \\gamma = 0$, $\\sigma_2 = \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = p$ and $\\sigma_3 = \\alpha\\beta\\gamma = -q$ (lesson 8.3\'s Viète).',
          'So, eliminate one root: $\\gamma = -\\alpha - \\beta$, hence $p = \\sigma_2 = \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = -(\\alpha^2 + \\alpha\\beta + \\beta^2)$ and $q = -\\sigma_3 = \\alpha\\beta\\gamma = \\alpha\\beta(\\alpha + \\beta)$. In these two coordinates the differences read $\\beta - \\gamma = \\alpha + 2\\beta$ and $\\gamma - \\alpha = -(2\\alpha + \\beta)$.',
          'Now, expand both sides of the identity $(\\alpha - \\beta)^2(\\alpha + 2\\beta)^2(2\\alpha + \\beta)^2 = 4(\\alpha^2 + \\alpha\\beta + \\beta^2)^3 - 27\\alpha^2\\beta^2(\\alpha + \\beta)^2$: every coefficient matches (the engine\'s exact bivariate expansion, degree six) — and the right side is exactly $-4p^3 - 27q^2$. Hence $\\Delta = (\\alpha - \\beta)^2(\\beta - \\gamma)^2(\\gamma - \\alpha)^2$.',
          'Deduce the census: if all three roots are real and distinct, every factor is a positive square — $\\Delta > 0$. If not all are real, the conjugate-pair law (lesson 8.1) leaves one real root $r$ and a pair $z, \\bar z$: then $(z - \\bar z)^2 = -4(\\mathrm{Im}\\, z)^2 < 0$ while $(\\bar z - r)^2(r - z)^2 = |z - r|^4 > 0$, so $\\Delta < 0$. And $\\Delta = 0$ exactly when two roots coincide. Hence $\\Delta > 0 \\iff$ three distinct real roots.',
          'Check on $x^3 - 7x + 6$ (roots $1, 2, -3$): $(1 - 2)^2(2 + 3)^2(-3 - 1)^2 = 1 \\cdot 25 \\cdot 16 = 400 = \\Delta$ — the identity live.',
          'And on $x^3 - 3x + 2$ (roots $1, 1, -2$): $(1 - 1)^2(\\ldots) = 0 = \\Delta$ — the repeated root kills the product, exactly as the census predicts.',
        ], answer: 'proved: $\\Delta = (\\alpha-\\beta)^2(\\beta-\\gamma)^2(\\gamma-\\alpha)^2 = -4p^3 - 27q^2$, so $\\Delta > 0 \\iff$ three distinct real roots; witnesses 400 and 0' },
      ] },
      { level: 'L6', questions: [
        { q: 'Derive Cardan’s collapse completely: starting from the split $x = u + v$ on the depressed cubic $x^3 + px + q = 0$, impose $3uv = -p$ and derive the quadratic $t^2 + qt - \\tfrac{p^3}{27} = 0$ whose roots are $u^3$ and $v^3$; verify the collapse numerically on the pair $u = \\sqrt[3]{2}, v = -\\sqrt[3]{4}$.', solution: [
          'Split: write $x = u + v$ — one unknown becomes two, and the binomial cube gives the lever: $(u + v)^3 = u^3 + v^3 + 3uv(u + v)$, whose last term is $3uv \\cdot x$.',
          'So, rewrite: $x^3 - 3uv\\,x - (u^3 + v^3) = 0$ — a cubic in $x$ whose $x$-coefficient and constant are OURS to choose through $u$ and $v$.',
          'Now, match against $x^3 + px + q$: $-3uv = p$ (the side-condition $3uv = -p$) and $-(u^3 + v^3) = q$ (i.e. $u^3 + v^3 = -q$) — the split\'s freedom is spent exactly on the two coefficients.',
          'So, the product comes free: $u^3 v^3 = (uv)^3 = (-\\tfrac{p}{3})^3 = -\\tfrac{p^3}{27}$ — cube the side-condition, no new information needed.',
          'Hence $u^3$ and $v^3$ have known sum $-q$ and known product $-\\tfrac{p^3}{27}$, so they are the two roots of $t^2 - (-q)t + (-\\tfrac{p^3}{27}) = t^2 + qt - \\tfrac{p^3}{27} = 0$ — the cubic reduced to a quadratic plus two cube roots, which is the whole method.',
          'Check on $u = \\sqrt[3]{2}, v = -\\sqrt[3]{4}$: then $u^3 = 2$, $v^3 = -4$, so $3uv = 3\\sqrt[3]{-8} = -6 = -p$ and $u^3 + v^3 = -2 = -q$ — the pair $(p, q) = (6, 2)$, the cubic $x^3 + 6x + 2$ of Illustration 4.',
          'Now, the quadratic for that pair: $t^2 + qt - \\tfrac{p^3}{27} = t^2 + 2t - \\tfrac{216}{27} = t^2 + 2t - 8 = (t - 2)(t + 4)$, whose roots are exactly $2$ and $-4$ — the two $u^3, v^3$ the walk started from — and $x = u + v \\approx -0.3275$ is the root of the cubic: the collapse verified end to end.',
        ], answer: 'derived: $3uv = -p$ and $u^3 + v^3 = -q$ force $u^3, v^3$ to be the roots of $t^2 + qt - \\tfrac{p^3}{27} = 0$; verified on $u^3, v^3 = 2, -4$' },
        { q: 'Derive Ferrari’s resolvent completely: seek $(y^2 + my + n)(y^2 - my + k)$ for the depressed quartic $y^4 + py^2 + qy + r$, match coefficients, eliminate $k$ and $n$, and show $M = m^2$ satisfies $M^3 + 2pM^2 + (p^2 - 4r)M - q^2 = 0$. Then verify on the exhibit $x^4 - 25x^2 + 60x - 36$.', solution: [
          'Split: seek $(y^2 + my + n)(y^2 - my + k)$ — conjugate $y$-coefficients so the $y^3$ term dies in advance, matching the quartic\'s depression.',
          'Now, multiply out: $y^4 + (n + k - m^2)y^2 + m(k - n)y + nk$ — three surviving coefficients against the quartic\'s three.',
          'So, match: $n + k - m^2 = p$, $m(k - n) = q$, $nk = r$ — three equations in $m, n, k$.',
          'Now, isolate: $k - n = \\tfrac{q}{m}$ and $k + n = p + m^2$, so $k, n$ are both expressed through the single unknown $m$: $k = \\tfrac{(p + m^2) + \\tfrac{q}{m}}{2}$, $n = \\tfrac{(p + m^2) - \\tfrac{q}{m}}{2}$.',
          'So, force the product condition: $nk = \\tfrac{(p + m^2)^2 - \\tfrac{q^2}{m^2}}{4} = r$; multiply by $4m^2$ and substitute $M = m^2$: $M(p + M)^2 - q^2 = 4rM$, i.e. $M^3 + 2pM^2 + (p^2 - 4r)M - q^2 = 0$ — the RESOLVENT CUBIC.',
          'Hence the quartic is solved by the cubic: find any usable root $M$ of the resolvent, set $m = \\sqrt{M}$, read off $k$ and $n$, and solve the two quadratics. The engine sweeps the identity on every $(m, n, k)$ triple in a grid: exact, every time.',
          'Check on the exhibit $x^4 - 25x^2 + 60x - 36$ ($p = -25, q = 60, r = -36$): the resolvent is $M^3 - 50M^2 + 769M - 3600$, and $M = 9$ satisfies it ($729 - 4050 + 6921 - 3600 = 0$) — then $m = 3$, $k - n = 20$, $k + n = -16$, so $k = 2$, $n = -18$, and the split $(x^2 + 3x - 18)(x^2 - 3x + 2)$ multiplies back to the exhibit exactly.',
        ], answer: 'derived: the matching gives $k+n = p+M$, $k-n = \\tfrac{q}{m}$, $nk = r$, and $M = m^2$ satisfies $M^3 + 2pM^2 + (p^2-4r)M - q^2 = 0$; verified with $M = 9$ on the exhibit' },
      ] },
    ] },
    { kind: 'formula', name: 'The depression', latex: 'x^3 + ax^2 + bx + c \\;\\xrightarrow{\\,x = t - \\tfrac{a}{3}\\,}\\; t^3 + pt + q, \\quad p = b - \\tfrac{a^2}{3},\\; q = \\tfrac{2a^3}{27} - \\tfrac{ab}{3} + c', note: 'the first move of the whole method: the $t^2$ coefficient is $-a + a = 0$ by design. Every cubic is a shifted $t^3 + pt + q$.' },
    { kind: 'formula', name: 'The Cardan quadratic (u³ and v³)', latex: 't^2 + q\\,t - \\tfrac{p^3}{27} = 0 \\quad (u^3 + v^3 = -q, \\;\\; u^3 v^3 = -\\tfrac{p^3}{27})', note: 'the split $x = u + v$ with $3uv = -p$ collapses the cubic into this quadratic; then $x = u + v$ from its two cube roots.' },
    { kind: 'formula', name: 'Cardan’s formula', latex: 'x = \\sqrt[3]{-\\tfrac{q}{2} + \\sqrt{\\tfrac{q^2}{4} + \\tfrac{p^3}{27}}} + \\sqrt[3]{-\\tfrac{q}{2} - \\sqrt{\\tfrac{q^2}{4} + \\tfrac{p^3}{27}}}', note: 'the Ars Magna line of 1545 — the inner square root carries $-\\tfrac{\\Delta}{108}$, so the sign of $\\Delta$ decides its reality.' },
    { kind: 'formula', name: 'The discriminant of the depressed cubic', latex: '\\Delta = -4p^3 - 27q^2 = (\\alpha - \\beta)^2 (\\beta - \\gamma)^2 (\\gamma - \\alpha)^2', note: 'both minus signs load-bearing; equal to the squared product of root differences — engine-swept on ten root triples.' },
    { kind: 'formula', name: 'The three cases', latex: '\\Delta > 0: \\text{ three distinct real} \\;\\;\\mid\\;\\; \\Delta = 0: \\text{ all real, one repeated} \\;\\;\\mid\\;\\; \\Delta < 0: \\text{ one real + conjugate pair}', note: 'the census theorem: compute $\\Delta$ FIRST, then choose the route — witnesses $400$, $0$, $-135$, $-972$, $13068$.' },
    { kind: 'formula', name: 'The Δ = 0 shortcut', latex: '\\text{roots } \\tfrac{3q}{p} \\text{ (simple)} \\quad \\text{and} \\quad -\\tfrac{3q}{2p} \\text{ (double)}', note: 'proved from $(x - r)^2(x + 2r)$ with $p = -3r^2$, $q = 2r^3$ — no cube roots in this corner: witnesses $(-2, 1)$ and $(-4, 2)$.' },
    { kind: 'formula', name: 'The casus route (De Moivre cashed)', latex: 'x_k = 2\\,\\sqrt[3]{r}\\,\\cos\\!\\left(\\tfrac{\\theta + 2\\pi k}{3}\\right), \\quad k = 0, 1, 2', note: 'where $u^3 = r e^{i\\theta}$: the three legal $\\omega$-combination pairings ($uv = -\\tfrac{p}{3}$ real) land on the real axis — on $x^3 - 7x + 6$ they land exactly on $2, -3, 1$.' },
    { kind: 'formula', name: 'Ferrari’s resolvent cubic', latex: 'M^3 + 2p\\,M^2 + (p^2 - 4r)\\,M - q^2 = 0, \\qquad M = m^2', note: 'the quartic split $(y^2 + my + n)(y^2 - my + k)$ hangs on one number, found by solving a CUBIC — the exhibit\'s resolvent $M^3 - 50M^2 + 769M - 3600$ has the rational root $M = 9$.' },
    { kind: 'formula', name: 'The Sophie Germain identity', latex: 'a^4 + 4b^4 = (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2)', note: 'the $q = 0$ quartic that still factors over the reals: $x^4 + 4$ at $a = x$, $b = 1$, roots $1 \\pm i, -1 \\pm i$.' },
    { kind: 'formula', name: 'The biquadratic route', latex: 'x^4 + px^2 + r \\;\\xrightarrow{\\,z = x^2\\,}\\; z^2 + pz + r = 0', note: 'the no-odd-powers corner dissolves without any resolvent — $x^4 - 5x^2 + 4 = (x^2 - 1)(x^2 - 4)$, roots $\\pm 1, \\pm 2$.' },
  ],
}


// ------------------------------------------------------------------
// lesson 8.5 — authored by the run-119 swarm (the 085 agent), integrated verbatim
// ------------------------------------------------------------------

function threeMovesSvg85(): string {
  // one root set {1,2,3}, three destinies: shift +2, scale x3, invert 1/r.
  // lanes: two parallel number lines (sources above, destinies below);
  // arrows may cross each other (path/path), never text.
  const chip = (cx: number, cy: number, fill: string, txt: string, fs = 10) =>
    `<circle cx="${cx}" cy="${cy}" r="10" fill="${fill}"/><text x="${cx}" y="${cy + 3.5}" font-size="${fs}" font-weight="800" fill="#ffffff" text-anchor="middle">${txt}</text>`
  const arrow = (x1: number, y1: number, x2: number, y2: number, col: string) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const L = Math.hypot(dx, dy)
    const ux = dx / L
    const uy = dy / L
    const bx = x2 - 9 * ux
    const by = y2 - 9 * uy
    const px = -uy
    const py = ux
    return `<line x1="${x1}" y1="${y1}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${col}" stroke-width="2.2"/><path d="M ${x2.toFixed(1)} ${y2.toFixed(1)} L ${(bx + 4.5 * px).toFixed(1)} ${(by + 4.5 * py).toFixed(1)} L ${(bx - 4.5 * px).toFixed(1)} ${(by - 4.5 * py).toFixed(1)} Z" fill="${col}"/>`
  }
  const lane = (yTop: number, spanMax: number, srcs: [number, string][], tgts: [number, string][], col: string, label: string, ticks: [number, string][]) => {
    const X = (v: number) => 70 + (v / spanMax) * 580
    let s = `<text x="72" y="${yTop - 24}" font-size="12.5" font-weight="800" fill="${col}">${label}</text>`
    s += `<line x1="70" y1="${yTop}" x2="650" y2="${yTop}" stroke="#0d9488" stroke-width="2"/>`
    for (const [v, t] of ticks) s += `<line x1="${X(v).toFixed(1)}" y1="${yTop - 5}" x2="${X(v).toFixed(1)}" y2="${yTop + 5}" stroke="#0d9488" stroke-width="1.5"/><text x="${X(v).toFixed(1)}" y="${yTop - 11}" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">${t}</text>`
    for (const [v, t] of srcs) s += chip(X(v), yTop, '#16a34a', t)
    s += `<line x1="70" y1="${yTop + 52}" x2="650" y2="${yTop + 52}" stroke="#5eead4" stroke-width="2"/>`
    for (const [v, t] of tgts) s += chip(X(v), yTop + 52, col, t, t.length > 2 ? 8.5 : 10)
    for (let i = 0; i < srcs.length; i++) {
      const [sv] = srcs[i]
      const [tv] = tgts[i]
      s += arrow(X(sv) + (sv < tv ? 0 : sv === tv ? 0 : 0), yTop + 12, X(tv), yTop + 40, col)
    }
    return s
  }
  return `<svg viewBox="0 0 720 396" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three number-line lanes showing the root set 1, 2, 3 under the three transformations. Lane one: shifting each root by 2 lands the chips on 3, 4, 5. Lane two: scaling each root by 3 lands the chips on 3, 6, 9. Lane three: inverting each root lands the chips on 1, one half and one third — the three laws of the lesson in one picture.">
  <text x="360" y="26" font-size="13.5" font-weight="800" text-anchor="middle" fill="currentColor">the three moves: one root set {1, 2, 3}, three destinies</text>
  ${lane(92, 10, [[1, '1'], [2, '2'], [3, '3']], [[3, '3'], [4, '4'], [5, '5']], '#d97706', 'move 1 - SHIFT each root by +2', [[0, '0'], [2, '2'], [4, '4'], [6, '6'], [8, '8'], [10, '10']])}
  ${lane(196, 10, [[1, '1'], [2, '2'], [3, '3']], [[3, '3'], [6, '6'], [9, '9']], '#0d9488', 'move 2 - SCALE each root by 3', [[0, '0'], [2, '2'], [4, '4'], [6, '6'], [8, '8'], [10, '10']])}
  ${lane(300, 3.3, [[1, '1'], [2, '2'], [3, '3']], [[1, '1'], [0.5, '1/2'], [1 / 3, '1/3']], '#ea580c', 'move 3 - INVERT each root r to 1/r', [[0, '0'], [1, '1'], [2, '2'], [3, '3']])}
  <text x="360" y="384" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">the three laws: increase by h -> P(x-h) = 0; scale by k -> k^n P(x/k) = 0; invert -> x^n P(1/x) = 0</text>
</svg>`
}

function diminishedCubicSvg85(): string {
  // the whole curve slides left by 2: P(x) roots {1,2,3} -> P(x+2) roots {-1,0,1};
  // the x^2 term dies (the 8.4 depression). Curve points computed from the polynomials.
  const XP = (v: number) => 60 + (v + 2.6) * 81.08
  const YP = (w: number) => 40 + (12 - w) * 12.5
  const P = (x: number) => x ** 3 - 6 * x ** 2 + 11 * x - 6
  const Q = (x: number) => x ** 3 - x
  const pts = (f: (x: number) => number, x0: number, x1: number) => {
    const out: string[] = []
    for (let i = 0; i <= 90; i++) {
      const x = x0 + ((x1 - x0) * i) / 90
      out.push(`${XP(x).toFixed(1)},${YP(f(x)).toFixed(1)}`)
    }
    return out.join(' ')
  }
  const chip = (cx: number, cy: number, fill: string, txt: string) =>
    `<circle cx="${cx.toFixed(1)}" cy="${cy}" r="8.5" fill="${fill}"/><text x="${cx.toFixed(1)}" y="${cy + 3.2}" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">${txt}</text>`
  const arrow = (x1: number, y1: number, x2: number, y2: number, col: string) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const L = Math.hypot(dx, dy)
    const bx = x2 - (9 * dx) / L
    const by = y2 - (9 * dy) / L
    return `<line x1="${x1}" y1="${y1}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${col}" stroke-width="2.2"/><path d="M ${x2} ${y2} L ${(bx - (4.5 * dy) / L).toFixed(1)} ${(by + (4.5 * dx) / L).toFixed(1)} L ${(bx + (4.5 * dy) / L).toFixed(1)} ${(by - (4.5 * dx) / L).toFixed(1)} Z" fill="${col}"/>`
  }
  const g1 = XP(1)
  const g2 = XP(2)
  const g3 = XP(3)
  const tm1 = XP(-1)
  const tm0 = XP(0)
  return `<svg viewBox="0 0 720 352" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two cubic curves on one set of axes. The green curve y = x cubed minus 6 x squared plus 11 x minus 6 crosses the axis at 1, 2 and 3. The teal curve y = x cubed minus x, the same cubic with its roots diminished by 2, crosses at minus 1, 0 and 1: the whole curve has slid left by 2, and the x squared term has vanished — the Cardan depression of lesson 8.4 seen as a transformation.">
  <text x="360" y="26" font-size="13" font-weight="800" text-anchor="middle" fill="currentColor">the diminished cubic: the whole curve slides left by 2</text>
  <line x1="60" y1="190" x2="660" y2="190" stroke="#16a34a" stroke-width="1.8"/>
  <line x1="271" y1="40" x2="271" y2="290" stroke="#16a34a" stroke-width="1.8"/>
  <polyline points="${pts(P, 0.4, 4.4)}" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <polyline points="${pts(Q, -2.05, 2.2)}" fill="none" stroke="#0d9488" stroke-width="2.6"/>
  <text x="62" y="70" font-size="10.5" font-weight="700" fill="#0d9488">y = x³-x: the depressed cousin</text>
  <text x="655" y="38" font-size="10.5" font-weight="700" fill="#166534" text-anchor="end">y = x³-6x²+11x-6</text>
  ${chip(g1, 170, '#16a34a', '1')}${chip(g2, 170, '#16a34a', '2')}${chip(g3, 170, '#16a34a', '3')}
  ${chip(tm1, 206, '#0d9488', '-1')}${chip(tm0, 206, '#0d9488', '0')}${chip(g1, 206, '#0d9488', '1')}
  ${arrow(g1 - 8, 240, tm1 + 10, 240, '#d97706')}
  ${arrow(g2 - 8, 252, tm0 + 10, 252, '#d97706')}
  ${arrow(g3 - 8, 264, g1 + 10, 264, '#d97706')}
  <text x="360" y="292" font-size="10.5" font-weight="700" text-anchor="middle" fill="#d97706">each root slides LEFT by 2: 1 to -1, 2 to 0, 3 to 1</text>
  <text x="360" y="316" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">the x² term dies in the slide: x³-6x²+11x-6 diminished by 2 is x³-x</text>
  <text x="360" y="338" font-size="10.5" text-anchor="middle" fill="#0d9488">the 8.4 Cardan depression, seen at last as what it always was — a transformation</text>
</svg>`
}

function lossExtraneousMirrorSvg85(): string {
  // two mini-panes: the cancellation losing the root 1; the squaring gaining the impostor -1.
  const chip = (cx: number, cy: number, fill: string, txt: string, hollow = false) =>
    hollow
      ? `<circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="4 3"/><text x="${cx}" y="${cy + 3.4}" font-size="8.5" font-weight="800" fill="#dc2626" text-anchor="middle">${txt}</text>`
      : `<circle cx="${cx}" cy="${cy}" r="9" fill="${fill}"/><text x="${cx}" y="${cy + 3.4}" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">${txt}</text>`
  const miniLine = (cx: number, cy: number, halfW: number) =>
    `<line x1="${cx - halfW}" y1="${cy}" x2="${cx + halfW}" y2="${cy}" stroke="#0d9488" stroke-width="2"/>`
  const LX = (v: number) => 186 + v * 44
  const RX = (v: number) => 534 + v * 44
  return `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two side-by-side panels. Left panel, the loss side: cancelling the common factor x minus 1 from x squared times x minus 1 equals 6 times x minus 1 leaves x squared equals 6, whose roots miss the true root 1 — the solution set shrank. Right panel, the gain side: squaring the square root of x plus 2 equals x gives x squared minus x minus 2 equals zero with roots 2 and minus 1, but minus 1 fails the original equation — the solution set grew by an impostor. Cancellation only removes roots; squaring only adds them.">
  <text x="360" y="24" font-size="13.5" font-weight="800" text-anchor="middle" fill="currentColor">the honesty mirror: cancelling DROPS a root; squaring INVENTS one</text>
  <rect x="18" y="40" width="336" height="316" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>
  <text x="186" y="62" font-size="12" font-weight="800" text-anchor="middle" fill="#166534">the loss side: x²(x-1) = 6(x-1)</text>
  <text x="186" y="92" font-size="12" font-weight="700" text-anchor="middle" fill="#166534">x²(x-1) = 6(x-1)</text>
  <ellipse cx="222" cy="88" rx="27" ry="14" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 4"/>
  <line x1="249" y1="82" x2="272" y2="74" stroke="#dc2626" stroke-width="1.8"/>
  <text x="276" y="76" font-size="10" font-weight="800" fill="#dc2626">cancelled</text>
  <text x="186" y="120" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">the honest solve: (x-1)(x²-6) = 0</text>
  ${miniLine(186, 165, 138)}
  <text x="186" y="150" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">the true solution set {1, ±√6}</text>
  ${chip(LX(-Math.sqrt(6)), 165, '#16a34a', '-√6')}${chip(LX(1), 165, '#16a34a', '1')}${chip(LX(Math.sqrt(6)), 165, '#16a34a', '√6')}
  ${miniLine(186, 225, 138)}
  <text x="186" y="210" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">after cancelling: x² = 6</text>
  ${chip(LX(-Math.sqrt(6)), 225, '#16a34a', '-√6')}${chip(LX(1), 225, '#16a34a', '1', true)}${chip(LX(Math.sqrt(6)), 225, '#16a34a', '√6')}
  <line x1="246" y1="252" x2="236" y2="234" stroke="#dc2626" stroke-width="1.8"/>
  <text x="186" y="292" font-size="10.5" font-weight="700" text-anchor="middle" fill="#dc2626">the cancelled read loses the root 1 — a HOLE where a root was</text>
  <text x="186" y="314" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">S(cancelled) sits inside S(original)</text>
  <rect x="366" y="40" width="336" height="316" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="1.6"/>
  <text x="534" y="62" font-size="12" font-weight="800" text-anchor="middle" fill="#166534">the gain side: √(x+2) = x</text>
  <text x="534" y="84" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">original: √(x+2) = x</text>
  <text x="534" y="106" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">squared: x²-x-2 = 0, roots {2, -1}</text>
  ${miniLine(534, 165, 138)}
  <text x="534" y="150" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">the squared equation's candidates {2, -1}</text>
  ${chip(RX(-1), 165, '#dc2626', '-1')}${chip(RX(2), 165, '#16a34a', '2')}
  <text x="534" y="204" font-size="10" font-weight="800" text-anchor="middle" fill="#dc2626">the impostor -1: √1 = 1, not -1</text>
  <text x="534" y="224" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">the survivor 2: √4 = 2 — holds</text>
  <text x="534" y="262" font-size="12.5" font-weight="800" text-anchor="middle" fill="#166534">solution set {2}</text>
  <text x="534" y="292" font-size="10.5" font-weight="800" text-anchor="middle" fill="#dc2626">the squared read gains the root -1 — an IMPOSTOR in the set</text>
  <text x="534" y="314" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">S(original) sits inside S(squared)</text>
  <text x="360" y="372" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">cancellation is a one-way door DOWN; squaring is a one-way door UP — the audit column restores equivalence</text>
</svg>`
}

function shiftSolutionSvg85(): string {
  // L2-1's solution figure: chips {1,2,3} slide right by 2 onto {3,4,5};
  // P and P(x-2) sketched beneath (curve points computed from the polynomials).
  const XP = (v: number) => 60 + (v + 0.5) * 85.3
  const YP = (w: number) => 140 + (9 - w) * 11.67
  const P = (x: number) => x ** 3 - 6 * x ** 2 + 11 * x - 6
  const S = (x: number) => (x - 2) ** 3 - 6 * (x - 2) ** 2 + 11 * (x - 2) - 6
  const pts = (f: (x: number) => number, x0: number, x1: number) => {
    const out: string[] = []
    for (let i = 0; i <= 80; i++) {
      const x = x0 + ((x1 - x0) * i) / 80
      out.push(`${XP(x).toFixed(1)},${YP(f(x)).toFixed(1)}`)
    }
    return out.join(' ')
  }
  const chip = (cx: number, cy: number, fill: string, txt: string) =>
    `<circle cx="${cx.toFixed(1)}" cy="${cy}" r="9.5" fill="${fill}"/><text x="${cx.toFixed(1)}" y="${cy + 3.5}" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">${txt}</text>`
  const arrow = (x1: number, y1: number, x2: number, y2: number, col: string) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const L = Math.hypot(dx, dy)
    const bx = x2 - (9 * dx) / L
    const by = y2 - (9 * dy) / L
    return `<line x1="${x1}" y1="${y1}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${col}" stroke-width="2.2"/><path d="M ${x2} ${y2} L ${(bx - (4.5 * dy) / L).toFixed(1)} ${(by + (4.5 * dx) / L).toFixed(1)} L ${(bx + (4.5 * dy) / L).toFixed(1)} ${(by - (4.5 * dx) / L).toFixed(1)} Z" fill="${col}"/>`
  }
  return `<svg viewBox="0 0 700 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line with chips at 1, 2 and 3, and arrows carrying each chip right by 2 onto new chips at 3, 4 and 5. Below, the cubic P and its shifted cousin P of x minus 2 are sketched: the second curve is the first translated right by 2, crossing the axis at 3, 4 and 5 — the roots increased by 2.">
  <text x="350" y="24" font-size="12.5" font-weight="800" text-anchor="middle" fill="currentColor">the shift by +2: chips 1, 2, 3 ride right onto 3, 4, 5</text>
  <line x1="60" y1="58" x2="640" y2="58" stroke="#0d9488" stroke-width="2"/>
  ${[0, 1, 2, 3, 4, 5, 6].map((v) => `<line x1="${XP(v).toFixed(1)}" y1="53" x2="${XP(v).toFixed(1)}" y2="63" stroke="#0d9488" stroke-width="1.5"/><text x="${XP(v).toFixed(1)}" y="44" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">${v}</text>`).join('')}
  ${chip(XP(1), 58, '#16a34a', '1')}${chip(XP(2), 58, '#16a34a', '2')}${chip(XP(3), 58, '#16a34a', '3')}
  <text x="72" y="88" font-size="11" font-weight="800" fill="#d97706">each root +2</text>
  <line x1="60" y1="108" x2="640" y2="108" stroke="#5eead4" stroke-width="2"/>
  ${chip(XP(3), 108, '#d97706', '3')}${chip(XP(4), 108, '#d97706', '4')}${chip(XP(5), 108, '#d97706', '5')}
  ${arrow(XP(1), 70, XP(3), 96, '#d97706')}
  ${arrow(XP(2), 70, XP(4), 96, '#d97706')}
  ${arrow(XP(3), 70, XP(5), 96, '#d97706')}
  <line x1="60" y1="245" x2="640" y2="245" stroke="#16a34a" stroke-width="1.8"/>
  <polyline points="${pts(P, 0.55, 4.15)}" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <polyline points="${pts(S, 2.55, 6.15)}" fill="none" stroke="#0d9488" stroke-width="2.6"/>
  <text x="470" y="158" font-size="10" font-weight="700" fill="#166534">y = P(x)</text>
  <text x="635" y="132" font-size="10" font-weight="700" fill="#0d9488" text-anchor="end">y = P(x-2)</text>
  ${chip(XP(1), 234, '#16a34a', '1')}${chip(XP(2), 234, '#16a34a', '2')}${chip(XP(3), 234, '#16a34a', '3')}
  ${chip(XP(3), 256, '#0d9488', '3')}${chip(XP(4), 256, '#0d9488', '4')}${chip(XP(5), 256, '#0d9488', '5')}
  <text x="350" y="300" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">roots 1, 2, 3 slide right by 2 onto 3, 4, 5 — P(x-2) = x³-12x²+47x-60</text>
</svg>`
}

function extraneousAuditSolutionSvg85(): string {
  // L4-2's solution figure: the audit picture. The squared equation's parabola
  // x^2-x-2 crosses the axis at -1 and 2; the true crossing of sqrt(x+2) with
  // the line y=x sits at (2,2); -1 is flagged red as the impostor.
  const XP = (v: number) => 60 + (v + 2.8) * 93.55
  const YP = (w: number) => 56 + (3.4 - w) * 36.67
  const SQ = (x: number) => Math.sqrt(Math.max(0, x + 2))
  const PARA = (x: number) => x * x - x - 2
  const pts = (f: (x: number) => number, x0: number, x1: number) => {
    const out: string[] = []
    for (let i = 0; i <= 90; i++) {
      const x = x0 + ((x1 - x0) * i) / 90
      out.push(`${XP(x).toFixed(1)},${YP(f(x)).toFixed(1)}`)
    }
    return out.join(' ')
  }
  const t2 = XP(2)
  const tm1 = XP(-1)
  const y0 = YP(0)
  return `<svg viewBox="0 0 700 348" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The extraneous-root audit drawn as a graph. The teal square-root curve y equals the square root of x plus 2 meets the amber line y equals x at the single point 2 comma 2 — the true root, ringed in green. The green parabola y equals x squared minus x minus 2, which is the squared equation, crosses the x-axis at minus 1 and 2: the minus 1 crossing is flagged red as an impostor, because at x equals minus 1 the square root gives 1, not minus 1. The solution set is 2 alone.">
  <text x="350" y="24" font-size="12.5" font-weight="800" text-anchor="middle" fill="currentColor">the audit: one true root, one impostor</text>
  <line x1="60" y1="${y0.toFixed(1)}" x2="640" y2="${y0.toFixed(1)}" stroke="#16a34a" stroke-width="1.8"/>
  <line x1="${XP(0).toFixed(1)}" y1="56" x2="${XP(0).toFixed(1)}" y2="276" stroke="#16a34a" stroke-width="1.8"/>
  <polyline points="${pts(SQ, -2, 3.2)}" fill="none" stroke="#0d9488" stroke-width="2.6"/>
  <polyline points="${pts((x) => x, -2.2, 2.9)}" fill="none" stroke="#d97706" stroke-width="2.4"/>
  <polyline points="${pts(PARA, -1.75, 2.75)}" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <text x="95" y="108" font-size="9.5" font-weight="700" fill="#0d9488">y = √(x+2)</text>
  <text x="446" y="102" font-size="9.5" font-weight="700" fill="#d97706">y = x</text>
  <text x="560" y="62" font-size="9.5" font-weight="700" fill="#166534">y = x²-x-2</text>
  <circle cx="${t2.toFixed(1)}" cy="${YP(2).toFixed(1)}" r="11" fill="none" stroke="#16a34a" stroke-width="3"/>
  <text x="526" y="132" font-size="9.5" font-weight="800" fill="#166534">true root (2, 2)</text>
  <circle cx="${tm1.toFixed(1)}" cy="${y0.toFixed(1)}" r="8" fill="#dc2626"/>
  <text x="${tm1.toFixed(1)}" y="${(y0 + 3.4).toFixed(1)}" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">-1</text>
  <text x="${tm1.toFixed(1)}" y="86" font-size="10" font-weight="800" fill="#dc2626" text-anchor="middle">the impostor -1</text>
  <line x1="${tm1.toFixed(1)}" y1="94" x2="${tm1.toFixed(1)}" y2="168" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4 3"/>
  <circle cx="${tm1.toFixed(1)}" cy="${YP(1).toFixed(1)}" r="3.5" fill="#dc2626"/>
  <text x="256" y="152" font-size="9" font-weight="800" fill="#dc2626">√1 = 1</text>
  <circle cx="${t2.toFixed(1)}" cy="${y0.toFixed(1)}" r="8" fill="#d97706"/>
  <text x="${t2.toFixed(1)}" y="${(y0 + 3.4).toFixed(1)}" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">2</text>
  <text x="575" y="196" font-size="9.5" font-weight="700" fill="#166534">2 holds: √4 = 2</text>
  <text x="350" y="310" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">the audit column: candidates {2, -1}; the original equation keeps only 2</text>
  <text x="350" y="334" font-size="12" font-weight="800" text-anchor="middle" fill="#166534">solution set {2}</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 8.5                                                          */
/* ------------------------------------------------------------------ */

const lesson85: Lesson = {
  id: 'aa-transformation-of-equations',
  number: '8.5',
  title: 'Transformation of Equations',
  concepts: [
    'roots increased: P(x − h) and the shift law',
    'roots multiplied: the scaling law',
    'roots inverted: xⁿP(1/x) and the inversion law',
    'the diminished-roots craft',
    'transformed reads: squares and shifts of prescribed roots',
    'loss of root by cancellation',
    'extraneous roots by domain expansion',
    'the equivalence discipline',
  ],
  objectives: [
    'Form, on sight, the equation whose roots are the roots of $P(x) = 0$ each increased or decreased by $h$ — the shift law $P(x-h) = 0$ derived, sign-checked, and run on the chapter witness $x^3-6x^2+11x-6$.',
    'Form the equation whose roots are the old roots multiplied by $k$ or inverted to $1/r_i$ — the scaling law $k^nP(x/k) = 0$ and the inversion law $x^nP(1/x) = 0$, both derived and verified on engine-pinned witnesses.',
    'Use the diminished-roots craft to turn hard cubics transparent — shifting the roots by $a/3$ — the increase by $a/3$, a decrease exactly when $a < 0$ — kills the $x^2$ term, which is exactly Cardan\'s depression of lesson 8.4: one engine in two costumes.',
    'Read transformed equations off prescribed roots — squares of roots, shifts of roots, and the general shift-coefficient law for $x^3+ax^2+bx+c$ — without expanding anything but the law itself.',
    'Audit every solve for LOST roots: recognise the cancellation of a common factor as a one-way door that drops the factor\'s roots, and carry those roots forward instead.',
    'Audit every solve for EXTRANEOUS roots: recognise squaring and domain expansion as the opposite one-way door, and test every candidate in the original equation before declaring it a root.',
    'State the equivalence discipline: a transformation is safe exactly when it is reversible in both directions — and know which of the standard moves are not reversible.',
  ],
  prerequisites: ['aa-cardan-and-ferrari-the-cubic-and-quartic-solved', 'aa-cubics-and-quartics-the-symmetric-functions'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    // ------------------------------------------------------------------
    { kind: 'para', text: 'An equation, once solved, feels finished — a fact on the table, nothing left to do. But to the classical algebraist the equation itself was an OBJECT: something you could pick up and MOVE. If $P(x) = 0$ has the roots $r_1, r_2, r_3$, then there is a cousin equation whose roots are those same three numbers shifted two steps to the right, another whose roots are three times as large, another whose roots are their reciprocals — and each cousin can be written down without solving anything, by pure substitution. This is the transformation craft, the heart of the old theory of equations: the question "form the equation whose roots are…" — the move Hall & Knight built a whole chapter of their Higher Algebra around, and the move this chapter has been quietly rehearsing since lesson 8.1.' },
    { kind: 'para', text: 'One of those moves already happened in this book, wearing a costume. Lesson 8.4 opened Cardan\'s solution of the cubic with the depression: substitute $x = t - a/3$ in $x^3+ax^2+bx+c$ and the $t^2$ term vanishes. Look at that substitution with this lesson\'s eyes: $P(t - a/3) = 0$ is an equation whose roots are the OLD roots each increased by $a/3$, and the size of the increase was chosen precisely so that the new $t^2$ coefficient dies. The depression was never a trick; it was the shift law. What Cardan wore as a substitution, this lesson states as a transformation — and once stated, the same engine shifts, scales and inverts root sets at will, turning equations we cannot factor into equations we can.' },
    { kind: 'para', text: 'But moving an equation can break it, and the honesty this book owes its readers names the two failure modes before the craft gets fast. Divide both sides of an equation by a common factor and you may silently DELETE a root — loss of root, the trap that turns a three-root cubic into a two-root equation nobody asked for. Square both sides to clear a radical and you may silently INVENT a root — the extraneous root, an impostor that satisfies the squared equation and fails the original. Both guards ride this lesson as its second half: every transformation is a contract, and the fine print says which direction the solution set is allowed to move. The craft first, then the guards — and by the end, the two halves are one discipline.' },

    // ------------------------------------------------------------------
    { kind: 'heading', text: 'Roots Increased — the Shift Law' },
    { kind: 'para', text: 'Start with the cleanest question the craft asks. Given $P(x) = 0$ with roots $r_1, \\ldots, r_n$, what is the equation whose roots are those roots each increased by a constant $h$? The definition first, formally — the classical language says increased and diminished, and this book keeps those words because the examination hall uses them.' },
    { kind: 'callout', tone: 'definition', title: 'Increasing and diminishing the roots', text: 'The roots of an equation are said to be INCREASED by $h$ when every root $r$ is replaced by $r + h$, and DIMINISHED (or decreased) by $h$ when every root $r$ is replaced by $r - h$. Thus, the equation with roots increased by $h$ is $P(x-h) = 0$, and the equation with roots diminished by $h$ is $P(x+h) = 0$ — the sign inside the substitution is the OPPOSITE of the sign of the move.' },
    { kind: 'terms', items: [
      { term: 'transformation of an equation', def: 'the act of passing from a given equation $P(x) = 0$ to another equation whose roots are prescribed functions of the original roots — shifted, scaled, inverted, squared, or otherwise named.' },
      { term: 'increased roots', def: 'the root set $\\{r_1, \\ldots, r_n\\}$ replaced by $\\{r_1+h, \\ldots, r_n+h\\}$; the transformed equation is $P(x-h) = 0$.' },
      { term: 'diminished roots', def: 'the root set replaced by $\\{r_1-h, \\ldots, r_n-h\\}$; the transformed equation is $P(x+h) = 0$. Cardan\'s depression of lesson 8.4 is the increase by $a/3$ (for a cubic with $x^2$-coefficient $a$) — for the chapter witness $a = -6$ that increase reads as the decrease by 2.' },
      { term: 'equivalent equations', def: 'two equations with exactly the same solution set — every solution of either solving the other; the only transformations that never need an audit.' },
    ] },
    { kind: 'para', text: 'The law itself deserves its proof — it is one line of factor theorem, but it is the engine every later move runs on.' },
    { kind: 'derivation', title: 'Theorem: the shift law — P(x-h) = 0 has the roots r_i + h', statement: 'If $P(x) = 0$ is a polynomial equation of degree $n$ with the root list $r_1, \\ldots, r_n$, then for any constant $h$ the transformed equation $P(x-h) = 0$ has exactly the root list $r_1+h, \\ldots, r_n+h$ — the roots increased by $h$. Read at $-h$, the same law gives: $P(x+h) = 0$ has the roots $r_i - h$, the roots diminished by $h$.', steps: [
      { label: 'Write one root as a factor', formula: 'P(x) = (x - r)\\,Q(x)', explanation: 'the factor theorem of chapter 2 — a root $r$ of $P$ splits off the factor $(x-r)$, with $Q$ of degree one less.' },
      { label: 'Substitute x = X - h', formula: 'P(X - h) = (X - h - r)\\,Q(X - h)', explanation: 'rename the new equation\'s variable $X$; the substitution $x = X - h$ is forced by wanting the NEW equation\'s value at $X$ to be the OLD equation\'s value at $X - h$.' },
      { label: 'Spot the new root', formula: 'X = r + h \\implies X - h - r = 0', explanation: 'at $X = r + h$ the first factor vanishes, so $P(X-h) = 0$ — the increased root solves the transformed equation, whatever $Q$ does.' },
      { label: 'Count degrees, conclude', formula: '\\deg P(x-h) = \\deg P = n', explanation: 'the substitution cannot change the degree, so the transformed equation has exactly $n$ roots (the fundamental theorem of lesson 8.1), and the $n$ increased candidates already fill all $n$ seats: nothing else is a root.' },
    ], result: '$P(x-h) = 0$ has exactly the roots $r_i + h$ — the increase law; and $P(x+h) = 0$ has exactly the roots $r_i - h$ — the diminish law. One substitution, both readings.' },
    { kind: 'equation', latex: 'P(x-h) = 0 \\quad \\text{has roots} \\quad r_1+h,\\ \\ldots,\\ r_n+h \\tag{1}', note: 'increase by $h$ reads $P(x-h)$; decrease by $h$ reads $P(x+h)$ — the sign INSIDE is the opposite of the sign of the move. The mirror trap is pinned in the Caution box at the end of this lesson.' },
    { kind: 'para', text: 'Now run the law on the chapter\'s standing witness, $P(x) = x^3-6x^2+11x-6$ with roots $\\{1, 2, 3\\}$ — every transformation in this lesson will return to it, so its three destinies can be compared side by side. Increase the roots by 2: the law demands $P(x-2)$, and the honest way to compute it is expansion, not memory:' },
    { kind: 'equation', latex: 'P(x-2) = (x-2)^3 - 6(x-2)^2 + 11(x-2) - 6 = x^3 - 12x^2 + 47x - 60 \\tag{2}', note: 'roots $\\{3, 4, 5\\}$ — the engine verifies this cousin by expansion AND by evaluation: zero at 3, at 4 and at 5, with no other integer root anywhere in sight. The constant $-60$ is $P(-2)$, the remainder read of chapter 2, cashed by substitution.' },
    { kind: 'example', title: 'Form the equation whose roots are the roots of $x^3-6x^2+11x-6 = 0$ each increased by 2, and verify the new root list.', steps: [
      'Setup: the shift law says the increased-by-2 equation is $P(x-2) = 0$, with $P(x) = x^3-6x^2+11x-6$.',
      'Now, expand honestly: $(x-2)^3 - 6(x-2)^2 + 11(x-2) - 6 = (x^3-6x^2+12x-8) - (6x^2-24x+24) + (11x-22) - 6$.',
      'So, collecting: $x^3 - 12x^2 + 47x - 60 = 0$.',
      'Check: $3^3 - 12(9) + 47(3) - 60 = 27 - 108 + 141 - 60 = 0$, and the same zero lands at $x = 4$ and $x = 5$ — the roots $\\{1,2,3\\}$ plus 2, exactly as the law promised.',
      'Hence the transformed equation is $x^3-12x^2+47x-60 = 0$ with roots $\\{3, 4, 5\\}$.',
    ], },
    { kind: 'para', text: 'Run the same law with $h = -2$ — diminishing by 2 — and something remarkable happens to the witness: $P(x+2) = x^3 - x$, with roots $\\{-1, 0, 1\\}$. The $x^2$ term has DIED. That is no accident, and it is the deepest cross-reference in this chapter: increasing a cubic\'s roots by exactly $a/3$ (where $a$ is its $x^2$-coefficient — an increase that is a decrease whenever $a < 0$) always kills the quadratic term, which is precisely how lesson 8.4 manufactured the depressed cubic $t^3 + pt + q$ before feeding it to Cardan. For the witness, $a = -6$, so $a/3 = -2$: the increase by $a/3$ IS the diminish law at $h = 2$, and the depressed coefficients land $p = b - a^2/3 = -1$, $q = c - ab/3 + 2a^3/27 = 0$ — the engine pins both, and $t^3 - t$ is exactly $P(x+2)$.' },
    { kind: 'equation', latex: 'P(x+2) = (x+2)^3 - 6(x+2)^2 + 11(x+2) - 6 = x^3 - x \\tag{3}', note: 'roots $\\{-1, 0, 1\\}$ — the witness diminished by 2; the $x^2$ term is gone, which is the 8.4 depression of the same cubic ($p = -1$, $q = 0$).' },
    { kind: 'callout', tone: 'insight', title: 'The depression IS the shift law — one engine in two costumes', text: 'Lesson 8.4 introduced $x = t - a/3$ as a move that "happens to" kill the $t^2$ term. There was no luck in it: $P(t - a/3)$ is the equation whose roots are the old roots INCREASED by $a/3$, and the increase is tuned so that the new $t^2$-coefficient, which is $a + 3(-a/3) = 0$, vanishes identically. When $a = -6$ the "increase by $a/3$" is the decrease by 2 that turned $x^3-6x^2+11x-6$ into $x^3-x$. Cardan wore the shift law as a substitution; Hall & Knight state it as a transformation; it is one engine in two costumes — and knowing that, you can depress ANY cubic on sight.' },
    { kind: 'figure', caption: 'The diminished cubic as a sliding curve. The green curve $y = x^3-6x^2+11x-6$ crosses the axis at 1, 2, 3; the teal curve $y = x^3-x$ — the same cubic with roots diminished by 2 — crosses at $-1$, 0, 1. The whole curve has slid LEFT by 2 (each amber arrow carries one root), and the slide killed the $x^2$ term: the Cardan depression of lesson 8.4, finally seen as what it always was, a transformation.', svg: diminishedCubicSvg85() },
    { kind: 'para', text: 'The diminished-roots craft is more than a curiosity — it is a solving strategy. When a cubic resists factoring, DIMINISH its roots by a small integer and factor the transparent cousin instead, then shift the recovered roots back. The pinned witness for the craft: $x^3-4x^2+x+6$ has the roots $\\{3, -1, 2\\}$ (engine-verified); diminish by 2 and the cousin is $P(x+2) = x^3+2x^2-3x = x(x-1)(x+3)$, whose roots $\\{0, 1, -3\\}$ fall out by inspection — add 2 back and the original\'s roots $\\{2, 3, -1\\}$ stand recovered without Cardan ever being summoned. The next Illustration runs the craft cold, on a cubic whose roots nobody announces in advance.' },
    { kind: 'example', title: 'Diminish the roots of $x^3-4x^2-x+4 = 0$ by 1, solve the transformed equation by inspection, and recover the original roots.', steps: [
      'Setup: diminishing by 1 asks for $P(x+1) = 0$ — the decrease law with $h = 1$.',
      'Now, expand: $(x+1)^3 - 4(x+1)^2 - (x+1) + 4 = (x^3+3x^2+3x+1) - (4x^2+8x+4) - x - 1 + 4$.',
      'So, the cousin is $x^3 - x^2 - 6x = 0$.',
      'Factor by inspection: $x(x^2-x-6) = x(x+2)(x-3) = 0$, so the new roots are $\\{0, -2, 3\\}$.',
      'Hence shift back UP by 1: the original roots are $\\{1, -1, 4\\}$ — and the engine checks each: $1 - 4 - 1 + 4 = 0$, $-1 - 4 + 1 + 4 = 0$, $64 - 64 - 4 + 4 = 0$. A cubic solved by moving it.',
    ], },
    { kind: 'para', text: 'Notice what the craft bought: the original cubic $x^3-4x^2-x+4$ factors only if you SPOT the grouping $x^2(x-4) - (x-4)$ — but one shift needs no spotting at all: it turned the cubic into a polynomial with a zero constant term — the most factorable shape there is. The rational-root hunt of chapter 2 would find the same roots eventually; the shift finds them structurally, and the structure is reusable. This is the diminished-roots craft as the classical books taught it: transform, solve the transparent cousin, transform back.' },

    // ------------------------------------------------------------------
    { kind: 'heading', text: 'Roots Scaled and Inverted' },
    { kind: 'para', text: 'Shift the roots and the curve slides. Now stretch them. If the roots of $P(x) = 0$ are to be multiplied by a constant $k$ — every root $r_i$ replaced by $kr_i$ — the substitution works out to $x \\mapsto x/k$, and the law reads:' },
    { kind: 'equation', latex: 'k^n\\,P\\!\\left(\\frac{x}{k}\\right) = 0 \\quad \\text{has roots} \\quad kr_1,\\ \\ldots,\\ kr_n \\tag{4}', note: 'the prefactor $k^n$ (with $n$ the degree) clears the denominators $k^i$ that $P(x/k)$ carries, keeping the transformed equation a genuine polynomial — monic whenever $P$ is monic, since the leading term becomes $k^n \\cdot (x/k)^n = x^n$.' },
    { kind: 'para', text: 'Why the prefactor is forced: $P(x/k)$ alone is a polynomial in $x/k$, a rational expression in $x$ — write it out and the $i$-th coefficient acquires a $k^i$ underneath. Multiplying through by $k^n$ clears every denominator at once and hands back an equation of the SAME degree with integer-friendly coefficients. On the witness with $k = 3$: $27\\,P(x/3) = x^3 - 18x^2 + 99x - 162$, whose roots are exactly $\\{3, 6, 9\\}$ — the engine confirms the expansion and evaluates all three. Negative $k$ works identically (it flips signs: the roots of $x^2-3x+2$, scaled by $-2$, become $\\{-2, -4\\}$, and the law hands back $x^2+6x+8$).' },
    { kind: 'example', title: 'Form the equation whose roots are three times the roots of $x^3-6x^2+11x-6 = 0$.', steps: [
      'Setup: scaling by $k = 3$ on a degree-3 equation — the law wants $3^3\\,P(x/3) = 27\\,P(x/3) = 0$.',
      'Now, substitute: $27\\left(\\tfrac{x^3}{27} - 6\\tfrac{x^2}{9} + 11\\tfrac{x}{3} - 6\\right) = x^3 - 18x^2 + 99x - 162$.',
      'So, the scaled equation is $x^3 - 18x^2 + 99x - 162 = 0$.',
      'Check: $27 - 162 + 297 - 162 = 0$ at $x = 3$; the engine confirms 6 and 9 as well — the roots $\\{1, 2, 3\\}$ stretched to $\\{3, 6, 9\\}$, and $(x-3)(x-6)(x-9)$ expands to exactly this cousin.',
      'Hence $x^3-18x^2+99x-162 = 0$, roots $\\{3, 6, 9\\}$.',
    ], },
    { kind: 'para', text: 'The third move is the subtlest: send every root to its RECIPROCAL, $r_i \\mapsto 1/r_i$. Lesson 8.3 already met these numbers from the symmetric side — the sum of reciprocals $\\sum 1/r_i = \\sigma_2/\\sigma_3$ was a one-line Viète read — and the transformation side is just as clean: substitute $x \\mapsto 1/x$ and clear denominators.' },
    { kind: 'derivation', title: 'Theorem: the inversion law — x^n P(1/x) = 0 has the roots 1/r_i', statement: 'If $P(x) = 0$ is a degree-$n$ equation with nonzero roots $r_1, \\ldots, r_n$, then $x^nP(1/x) = 0$ has exactly the roots $1/r_1, \\ldots, 1/r_n$ — the reciprocals of the original roots.', steps: [
      { label: 'Factor the polynomial', formula: 'P(x) = a\\,(x - r_1)(x - r_2)\\cdots(x - r_n)', explanation: 'the root list writes $P$ as a product of linear factors, $a$ the leading coefficient — the fundamental theorem\'s census of lesson 8.1 in factory form.' },
      { label: 'Substitute x -> 1/x', formula: 'P(1/x) = a\\prod_i\\left(\\frac{1}{x} - r_i\\right)', explanation: 'each factor becomes a difference of two fractions with denominator $x$.' },
      { label: 'Clear the denominators', formula: 'x^n P(1/x) = a\\prod_i (1 - r_i x)', explanation: 'multiplying by $x^n$ pulls one factor $x$ out of each of the $n$ brackets — the expression becomes a genuine polynomial of degree $n$ in $x$.' },
      { label: 'Read the roots', formula: 'x = \\tfrac{1}{r_i} \\implies (1 - r_i x) = 0', explanation: 'each bracket vanishes exactly at the reciprocal of its root, and the $n$ brackets fill all $n$ degree-seats — no other root exists.' },
    ], result: '$x^nP(1/x) = 0$ has exactly the roots $1/r_i$ — and as a bonus, the coefficient string of $P$ simply runs BACKWARDS: read $1 - 6x + 11x^2 - 6x^3$ off $x^3-6x^2+11x-6$ by reversal.' },
    { kind: 'equation', latex: 'x^3 P\\!\\left(\\tfrac{1}{x}\\right) = 1 - 6x + 11x^2 - 6x^3 \\tag{5}', note: 'the reciprocals $\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$ of the witness cubic\'s roots — the coefficient string reversed; their sum is $\\sigma_2/\\sigma_3 = 11/6$, lesson 8.3\'s read cashed from the transformation side.' },
    { kind: 'example', title: 'Form the equation whose roots are the reciprocals of the roots of $x^3-7x+6 = 0$.', steps: [
      'Setup: the roots of the base are $\\{1, 2, -3\\}$ (engine-verified — lesson 8.2\'s Descartes witness), so the reciprocals will be $\\{1, \\tfrac{1}{2}, -\\tfrac{1}{3}\\}$.',
      'Now, the law: $x^3P(1/x) = x^3\\left(\\tfrac{1}{x^3} - \\tfrac{7}{x} + 6\\right) = 1 - 7x^2 + 6x^3$.',
      'So, the reciprocal equation is $6x^3 - 7x^2 + 1 = 0$ (multiplying by $-1$ to make it monic-ready, or keep $1-7x^2+6x^3 = 0$ as it stands).',
      'Check: $1 - 7(\\tfrac{1}{4}) + 6(\\tfrac{1}{8}) = 1 - \\tfrac{7}{4} + \\tfrac{3}{4} = 0$ at $x = \\tfrac{1}{2}$; the engine clears 1 and $-\\tfrac{1}{3}$ too.',
      'Hence $1-7x^2+6x^3 = 0$, roots $\\{1, \\tfrac{1}{2}, -\\tfrac{1}{3}\\}$ — the coefficient string $6, -7, 0, 1$ reversed.',
    ], },
    { kind: 'para', text: 'Two honesty notes travel with the inversion law. First, a root at zero kills it: if some $r_i = 0$ then $1/r_i$ does not exist, and indeed the reversed coefficient string drops the leading term and loses a degree — the inversion law is stated for root lists with no zero. Second, the move has a fixed point worth staring at: an equation invariant under root inversion — its coefficient string palindromic — maps to ITSELF under this transformation, and such reciprocal equations are exactly lesson 8.6\'s subject, where the inversion law becomes a solving engine (the palindromic structure collapses to a quadratic in $x + 1/x$). This lesson builds the move; the next cashes it.' },
    { kind: 'figure', caption: 'The three moves on one root set. The same three green chips $\\{1, 2, 3\\}$ (top lane of each band) meet their three destinies: shifted by $+2$ they land on $\\{3, 4, 5\\}$ (amber lane — the shift law); scaled by $3$ they land on $\\{3, 6, 9\\}$ (teal lane — the scaling law); inverted they fold toward $\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$ (orange lane — the inversion law, with 1 its own reciprocal). Three substitutions, one root set, three new equations — the whole first half of this lesson in one picture.', svg: threeMovesSvg85() },
    { kind: 'para', text: 'Read the figure once more with the laws\' eyes. The shift lane keeps the chips evenly spaced (add 2 to everything: gaps preserved). The scaling lane STRETCHES the gaps (times 3: the gap 1 grows to 3). The inversion lane COMPRESSES everything toward the interval between 0 and 1, with the chip at 1 standing still — reciprocation pulls large numbers toward zero and leaves 1 fixed. Those three geometric behaviours are the algebra\'s fingerprints: an arithmetic move preserves differences, a multiplicative move scales them, and the reciprocal move inverts the ordering\'s spacing — which is why reciprocal equations (the fixed points of the third move) have such a different personality from shifted ones.' },

    // ------------------------------------------------------------------
    { kind: 'heading', text: 'Transformed Reads' },
    { kind: 'para', text: 'The examination hall rarely announces "use the shift law". It asks for the equation whose roots are the SQUARES of the old roots, or the roots each one greater, or twice the roots — prescribed functions of a known root list. Two engines answer such reads. Engine one: transform the polynomial directly (substitute, expand, done). Engine two — usually faster and never wrong: transform the SYMMETRIC FUNCTIONS, lesson 8.3\'s staircase, and rebuild the new equation from its Viète data. The squares read shows both engines at once.' },
    { kind: 'para', text: 'Take $x^2-3x+2 = 0$ with roots $\\{1, 2\\}$, and ask for the equation whose roots are the SQUARES $\\{1, 4\\}$. Engine two runs in three lines: the new sum is $\\alpha^2+\\beta^2 = \\sigma_1^2 - 2\\sigma_2 = 3^2 - 2(2) = 5$ (chapter 7\'s algebra, or lesson 8.3\'s power-sum read), the new product is $\\alpha^2\\beta^2 = \\sigma_2^2 = 4$, so the new quadratic is $x^2 - 5x + 4$ — and indeed $1$ and $4$ are its roots, the engine confirming both evaluations. Engine one agrees: substitute $x \\mapsto \\sqrt{x}$... no — for squares the direct route is factorisation, $(x-\\alpha^2)(x-\\beta^2)$, which is exactly what the Viète rebuild wrote.' },
    { kind: 'equation', latex: '\\alpha^2 + \\beta^2 = \\sigma_1^2 - 2\\sigma_2, \\qquad \\alpha^2\\beta^2 = \\sigma_2^2 \\tag{6}', note: 'the squares read through the symmetric functions — new sum and new product of the squared roots; the sibling reads for cubes ride lesson 8.3\'s Newton staircase.' },
    { kind: 'example', title: 'The roots of $x^2-3x+2 = 0$ are 1 and 2. Form the equation whose roots are the squares of these roots.', steps: [
      'Setup: the new roots are prescribed as $\\{1^2, 2^2\\} = \\{1, 4\\}$ — but compute them through the symmetric functions, not by luck of nice bases.',
      'Now, the new sum: $\\alpha^2+\\beta^2 = \\sigma_1^2 - 2\\sigma_2$ with $\\sigma_1 = 3$, $\\sigma_2 = 2$, giving $9 - 4 = 5$.',
      'So, the new product: $\\alpha^2\\beta^2 = \\sigma_2^2 = 4$.',
      'Hence the equation is $x^2 - 5x + 4 = 0$ — check: $1 - 5 + 4 = 0$ and $16 - 20 + 4 = 0$, the roots 1 and 4 standing exactly.',
    ], },
    { kind: 'para', text: 'For SHIFTS of prescribed roots there is a third engine, the slickest of the three: a coefficient law that reads the increase-by-1 cousin off a cubic\'s coefficients with no substitution at all. Expand $(x-1)^3 + a(x-1)^2 + b(x-1) + c$ once, honestly, term by term — the engine has done it symbolically and swept it on ten $(a,b,c)$ triples — and the pattern is pinned:' },
    { kind: 'equation', latex: 'P(x-1) = x^3 + (a-3)x^2 + (b-2a+3)x + (a-b+c-1) \\tag{7}', note: 'for $P(x) = x^3+ax^2+bx+c$: the roots increased by 1, read straight off the coefficient list. On the witness ($a = -6$, $b = 11$, $c = -6$): $x^3-9x^2+26x-24$, roots $\\{2, 3, 4\\}$ — engine-verified by expansion and by evaluation at all three. A first draft of this cousin printed the constant as $-18$; the expansion kills that slip and pins $-24 = a-b+c-1$.' },
    { kind: 'example', title: 'Use the shift-coefficient law to write down $P(x-1)$ for $P(x) = x^3+x^2-4x-4$, and name the new roots.', steps: [
      'Setup: $a = 1$, $b = -4$, $c = -4$ — the law builds $P(x-1)$ coefficient by coefficient with no substitution.',
      'Now, the reads: $a - 3 = -2$ (new $x^2$-coefficient); $b - 2a + 3 = -4 - 2 + 3 = -3$ (new $x$-coefficient); $a - b + c - 1 = 1 + 4 - 4 - 1 = 0$ (new constant).',
      'So, $P(x-1) = x^3 - 2x^2 - 3x$.',
      'Check: the base roots are $\\{-1, 2, -2\\}$ (engine-verified: $(x+1)(x^2-4)$), so the increased roots are $\\{0, 3, -1\\}$ — and $x^3-2x^2-3x = x(x-3)(x+1)$ lands all three.',
      'Hence $P(x-1) = x^3-2x^2-3x = 0$, roots $\\{0, 3, -1\\}$ — three coefficient reads, zero expansions.',
    ], },
    { kind: 'table', caption: 'The four transformation laws at a glance — all run on the chapter witness $x^3-6x^2+11x-6$ (roots $\\{1, 2, 3\\}$)', head: ['The move', 'The law (degree $n$)', 'On the witness', 'The new roots'], rows: [
      ['increase by 2', '$P(x-2) = 0$', '$x^3-12x^2+47x-60$', '$\\{3, 4, 5\\}$'],
      ['decrease by 2 (diminish)', '$P(x+2) = 0$', '$x^3-x$ (the 8.4 depression)', '$\\{-1, 0, 1\\}$'],
      ['scale by 3', '$3^3 P(x/3) = 0$', '$x^3-18x^2+99x-162$', '$\\{3, 6, 9\\}$'],
      ['invert (reciprocals)', '$x^3P(1/x) = 0$', '$1-6x+11x^2-6x^3$', '$\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$'],
    ] },
    { kind: 'para', text: 'The table is the revision card for the first half of the lesson, and its discipline is worth naming: every entry in the third column was produced by the SAME two moves — substitute, then clear denominators — and every entry in the fourth column was checked by direct evaluation, not by trusting the law. That habit (expand, then evaluate at every claimed root) is exactly what the verification engine of this book does to every number in this lesson before it reaches the page; it is also the habit that catches the $-18$-versus-$-24$ slip in the coefficient law\'s constant. Transformation items are one-mark questions ONLY when the audit travels with them.' },

    // ------------------------------------------------------------------
    { kind: 'heading', text: 'The Honesty Guards: Loss and Extraneous Roots' },
    { kind: 'para', text: 'So far every transformation was reversible and every solution set travelled intact. This half of the lesson is about the moves that are NOT reversible — the two standard sins of the solving habit — and the direction each one sins in. The module\'s key-points band names them as the two ways a solve can go wrong: LOSS OF ROOT, when a legal-looking cancellation deletes a genuine solution, and EXTRANEOUS ROOTS, when a domain-expanding move (squaring chief among them) invents a candidate that never solved the original. They are mirror failures: one shrinks the solution set, one inflates it, and both do so SILENTLY unless a guard is run. The guards are cheap; the losses are expensive. Both derivations below are our own, engine-checked witness by witness.' },
    { kind: 'derivation', title: 'Loss of Root: cancelling a common factor drops its roots (the derivation annex)', statement: 'If an equation $E(x) = F(x)$ has both sides carrying a common polynomial factor $G(x)$ — say $E = G \\cdot E\'$ and $F = G \\cdot F\'$ — then cancelling $G$ produces the equation $E\'(x) = F\'(x)$ whose solution set is contained in the original\'s, the difference living inside the roots of $G$: every root of $G$ that solved the original and does not solve the cancelled equation is silently LOST, and no root is ever gained. Cancellation is a one-way door DOWN.', steps: [
      { label: 'Factor both sides', formula: 'G(x)\\,E\'(x) = G(x)\\,F\'(x)', explanation: 'the common factor $G$ stands on both sides — the setup every mid-solve cancellation creates.' },
      { label: 'Bring everything to one side', formula: 'G(x)\\bigl(E\'(x) - F\'(x)\\bigr) = 0', explanation: 'the original equation says the PRODUCT is zero.' },
      { label: 'Read the original solution set', formula: 'S_{\\text{orig}} = \\{x : G(x) = 0\\} \\cup \\{x : E\'(x) = F\'(x)\\}', explanation: 'a product is zero exactly when some factor is — the zero-product law of chapter 2, working on the left-hand bracket.' },
      { label: 'Cancel', formula: 'E\'(x) = F\'(x), \\qquad S_{\\text{cancelled}} = \\{x : E\' = F\'\\}', explanation: 'dividing both sides by $G$ keeps the second bracket\'s solutions — and ONLY those.' },
      { label: 'Subtract the sets', formula: 'S_{\\text{orig}} \\setminus S_{\\text{cancelled}} \\subseteq \\{\\text{roots of } G\\}', explanation: 'whatever the cancelled equation loses must have come from the first bracket — the roots of the murdered factor. Nothing new can appear: every solution of $E\' = F\'$ solves the original by step 2.' },
    ], result: 'Cancelling the common factor $G$ from both sides DELETES the roots of $G$ from the solution set (unless they independently solve $E\' = F\'$) — $S_{\\text{cancelled}} \\subseteq S_{\\text{orig}}$, cancellation only REMOVES. The guard: harvest the roots of $G$ and carry them forward.' },
    { kind: 'para', text: 'The pinned witness, smallest first. The equation $x^3 - x = 0$ has the full root set $\\{0, 1, -1\\}$ — the engine evaluates all three. Divide both sides by $x$ (the fluent move when "$x$ is in every term") and the equation becomes $x^2 - 1 = 0$ with roots $\\{1, -1\\}$: the root 0 has VANISHED, exactly as the annex proves — 0 is the root of the cancelled factor $x$. Nobody "made an error"; the algebra was legal; the solution set simply shrank. The craft\'s version of the same trap, our own witness:' },
    { kind: 'equation', latex: 'x^2(x-1) = 6(x-1) \\;\\Longleftrightarrow\\; (x-1)(x^2 - 6) = 0, \\qquad \\text{roots} \\;\\{1, \\pm\\sqrt{6}\\} \\tag{8}', note: 'the honest solve brings everything to one side and factors: the root 1 stands with the two radicals. Cancel the common $(x-1)$ first instead, and the equation reads $x^2 = 6$ — roots $\\{\\pm\\sqrt{6}\\}$ only: the root 1 is LOST (it is the cancelled factor\'s root). The engine evaluates $x = 1$ in both sides of the ORIGINAL ($1^2 \\cdot 0 = 6 \\cdot 0$) before and after the audit.' },
    { kind: 'para', text: 'The mirror failure runs the other way. Squaring both sides of an equation is a domain-EXPANDING move: it is legal forward ($A = B$ forces $A^2 = B^2$) but not backward ($A^2 = B^2$ only forces $A = \\pm B$), so every solution of the original survives into the squared equation — and extra candidates, the ones with $A = -B$, ride along uninvited. The pinned witness is ours: solve $\\sqrt{x+2} = x$. Squaring gives $x + 2 = x^2$, that is $x^2 - x - 2 = 0$, roots $\\{2, -1\\}$. Now the AUDIT — the non-negotiable last column of every squared solve — tests each candidate in the ORIGINAL equation: at $x = 2$, $\\sqrt{4} = 2$ holds; at $x = -1$, $\\sqrt{1} = 1 \\neq -1$ FAILS (the left side is a principal square root, never negative). So $-1$ is extraneous — an impostor wearing the squared equation\'s root badge — and the solution set is $\\{2\\}$ alone. The engine checks the signature too: at the impostor, $A = \\sqrt{x+2} = 1 = -(x) = -B$ — the $A = -B$ pattern is exactly where squaring adds candidates.' },
    { kind: 'equation', latex: '\\sqrt{x+2} = x \\;\\xrightarrow{\\;\\text{square}\\;}\\; x^2 - x - 2 = 0, \\qquad \\{2, -1\\} \\;\\xrightarrow{\\;\\text{audit}\\;}\\; \\{2\\} \\tag{9}', note: 'the squared equation adds the candidate $-1$, where the two sides of the ORIGINAL are negatives of each other ($\\sqrt{1} = 1 = -(-1)$) — the $A = -B$ signature of every extraneous root born of squaring. The domain read agrees: the original needs $x \\geq 0$ (a principal square root cannot equal a negative number), and squaring widened that to all reals.' },
    { kind: 'derivation', title: 'Theorem: the direction discipline — cancellation only removes, squaring only adds', statement: 'For the two standard non-reversible moves: (i) every solution of the cancelled equation $E\' = F\'$ solves the original $GE\' = GF\'$, so cancellation can only REMOVE solutions; (ii) every solution of the original $A = B$ solves the squared equation $A^2 = B^2$, so squaring can only ADD solutions. The two inclusions point in OPPOSITE directions, and neither is reversible.', steps: [
      { label: 'Cancellation, forward', formula: 'E\'(x) = F\'(x) \\implies G(x)E\'(x) = G(x)F\'(x)', explanation: 'multiply a true equality by anything and it stays true — so every solution of the cancelled equation survives cancellation\'s reverse.' },
      { label: 'Cancellation, the loss', formula: 'G(r) = 0,\\ E\'(r) \\neq F\'(r) \\implies r \\in S_{\\text{orig}},\\ r \\notin S_{\\text{cancelled}}', explanation: 'a root of $G$ solves the original (the product $G \\cdot (E\'-F\')$ vanishes at $r$ regardless of the second bracket) but fails the cancelled equation — the deleted root.' },
      { label: 'Squaring, forward', formula: 'A = B \\implies A^2 - B^2 = (A-B)(A+B) = 0', explanation: 'factor the difference of squares: at a solution of the original the first bracket is zero, so the squared equation holds there too.' },
      { label: 'Squaring, the gain', formula: 'A^2 = B^2 \\iff A = \\pm B', explanation: 'the squared equation\'s solution set splits into $\\{A = B\\}$ and $\\{A = -B\\}$ — the original\'s set plus the sign-flipped branch, which is precisely where impostors are born.' },
      { label: 'Stack the inclusions', formula: 'S_{\\text{cancelled}} \\;\\subseteq\\; S_{\\text{original}} \\;\\subseteq\\; S_{\\text{squared}}', explanation: 'the census of the two directions: cancellation\'s set sits inside the original\'s, the original\'s sits inside the squared\'s — two one-way doors pointing opposite ways.' },
    ], result: 'Cancellation only REMOVES roots; squaring only ADDS them. The audit column — test every candidate in the original equation, harvest every cancelled factor\'s roots — is what restores the equivalence both moves silently spent.' },
    { kind: 'figure', caption: 'The honesty mirror. LEFT (the loss side): cancelling the common $(x-1)$ from $x^2(x-1) = 6(x-1)$ leaves $x^2 = 6$ — the true solution set $\\{1, \\pm\\sqrt{6}\\}$ shrinks to $\\{\\pm\\sqrt{6}\\}$ and the root 1 becomes a HOLE (red dashed). RIGHT (the gain side): squaring $\\sqrt{x+2} = x$ gives $x^2-x-2 = 0$ with candidates $\\{2, -1\\}$ — but $-1$ is an IMPOSTOR (red) that fails the original audit, and only the survivor 2 stands. Cancellation is a one-way door DOWN, squaring a one-way door UP; the audit column restores equivalence.', svg: lossExtraneousMirrorSvg85() },
    { kind: 'para', text: 'The mirror picture earns its two panes: the left set has a hole where a root was, the right set has an impostor standing where no root should be — the same diagram-shape, opposite defect. And the discipline that closes both is the AUDIT COLUMN, the habit of laying a solve out in two ledger-columns: the moves column (what was done to the equation) and the candidates column (what the current equation claims), with every non-reversible move flagged the moment it is made — cancellation flags "harvest the factor\'s roots", squaring flags "test every candidate in the original". A solve with a filled audit column cannot lose a root it did not choose to lose, and cannot ship an impostor it did not catch.' },
    { kind: 'callout', tone: 'warn', title: 'The three direction traps', text: '(i) CANCELLING MID-SOLVE: from $x^2(x-1) = 6(x-1)$, the fluent step "divide by $(x-1)$" silently deletes the root 1 — write $(x-1)(x^2-6) = 0$ and harvest instead. (ii) FORGETTING THE AUDIT COLUMN AFTER SQUARING: $\\sqrt{x+2} = x$ squares into $x^2-x-2 = 0$ whose roots $\\{2, -1\\}$ LOOK finished — $-1$ fails the original ($\\sqrt{1} = 1 \\neq -1$) and must be struck. (iii) THE $h$ SIGN FLIP: roots increased by $h$ read $P(x-h)$ — the sign INSIDE is opposite to the move, so $P(x+h)$ DECREASES the roots; on the witness, $P(x-2)$ has roots $\\{3,4,5\\}$ while $P(x+2)$ has $\\{-1,0,1\\}$. Every trap is one-way: know the direction, run the audit.' },
    { kind: 'para', text: 'One more piece of vocabulary completes the discipline. Two equations are EQUIVALENT when their solution sets are equal — every solution of either solving the other, both directions. The reversible moves preserve equivalence: adding or subtracting the same expression, multiplying by a nonzero constant, substituting an invertible function (the shift, scale and invert moves of this lesson\'s first half, run on root lists with no zeros for the inversion). The non-reversible ones spend it: cancellation (one-way down), squaring (one-way up), multiplying both sides by an expression that can vanish (a hidden cancellation — the same door down). The professional habit is to KNOW which column each move belongs to, the way a book-keeper knows debits from credits: equivalence preserved needs no audit; equivalence spent demands one. That is the whole theory of solving honestly, in one sentence.' },

    // ------------------------------------------------------------------
    { kind: 'para', text: 'The chapter\'s craft storey is now stocked: equations move — shift, scale, invert — and every move carries its audit. What remains is the fixed point of the third move. An equation whose coefficient string reads the same forwards and backwards is INVARIANT under root inversion; its roots pair off as reciprocals, and the inversion law\'s machinery — which this lesson built as a transformation — becomes a SOLVING engine for exactly that family. Lesson 8.6 opens it: the reciprocal equations, the palindromic structure, and the $t = x + 1/x$ reduction that turns them into quadratics. Before that, the self-check and the graded set — with the loss and extraneous audits running through the ladder like a thread.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Transformation items are JEE unit-2 staples (the "quadratic equations and theory-of-equations" unit in the banked syllabus listing) and board-exam regulars; the loss/extraneous audits ride the same unit\'s solving questions. The shapes, in frequency order: "form the equation whose roots are…" one-liners — increase/decrease (Illustration 1, exercises L1-1, L3-1), scaling (L4-3), reciprocals (Illustration 4, L1-2); the squares read off prescribed roots (L2-2 — symmetric functions, lesson 8.3 cashed); the shift-coefficient law read (Illustration 6 — a Cengage-style coefficient hunt); the diminished-roots craft on a resistant cubic (L5-1); and the audit items — a cancellation planted mid-solve (L3-3) or a radical equation (L4-2, the √(x+2) = x shape) — where the marks live in the audit column, not the algebra. All items in this lesson\'s exercise set are exam-style (our own), not past-paper questions.' },
    { kind: 'quiz', title: 'Check yourself: transformation of equations', items: [
      { q: 'The equation whose roots are the roots of $P(x) = 0$ each INCREASED by $h$ is', options: ['$P(x+h) = 0$', '$P(x-h) = 0$', '$P(x)+h = 0$', '$hP(x) = 0$'], answer: 1, explain: 'Option 1 is the shift law: $P(x-h) = 0$ has exactly the roots $r_i + h$ — substituting $x \\mapsto x-h$ means the new equation\'s value at $x$ is the old one\'s value at $x-h$, so an increased root lands where the new equation reads zero. Option 0 is the DECREASE law — the mirror trap, exactly the sign flip the Caution box pins: $P(x+h)$ has the roots $r_i - h$. Option 2 adds $h$ to the polynomial\'s VALUE, not to its roots — it shifts the graph vertically, changing roots in no predictable root-list way. Option 3 multiplies the equation by a constant, which changes nothing at all (an equivalent equation). On the witness: increase by 2 gives $x^3-12x^2+47x-60$ with roots $\\{3, 4, 5\\}$.' },
      { q: 'The equation whose roots are the RECIPROCALS of the roots of the degree-$n$ equation $P(x) = 0$ is', options: ['$x^nP(1/x) = 0$', '$P(1/x) = 0$', '$xP(x) = 0$', '$P(x)/x^n = 0$'], answer: 0, explain: 'Option 0 is the inversion law: substituting $x \\mapsto 1/x$ and clearing the $n$ denominators with $x^n$ gives a degree-$n$ equation whose roots are exactly $1/r_i$ — on the witness, $1-6x+11x^2-6x^3$ with roots $\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$. Option 1 forgets the clear-denominators step: $P(1/x) = 0$ is a rational equation, not the polynomial the law promises — and multiplying it out by hand just rebuilds option 0. Option 2 is a one-factor version with no meaning at general $n$ — the degree-$n$ structure needs all $n$ denominator clears. Option 3 DIVIDES by $x^n$: that direction loses degree (a cousin of the loss-of-root door) instead of inverting the roots.' },
      { q: 'Cancelling the common factor $(x-2)$ from both sides of $x^2(x-2) = 3(x-2)$', options: ['loses the root 2', 'gains a root', 'is safe', 'loses the root 0'], answer: 0, explain: 'Option 0 is the loss-of-root law: the honest solve reads $(x-2)(x^2-3) = 0$ with roots $\\{2, \\pm\\sqrt{3}\\}$, and the cancelled equation $x^2 = 3$ carries only $\\{\\pm\\sqrt{3}\\}$ — the root 2 is exactly the cancelled factor\'s root, silently deleted (cancellation only removes). Option 1 confuses the doors: GAINING roots is squaring\'s failure mode, not cancellation\'s — no new candidate can appear when both sides are divided by the same thing. Option 2 is the fluent habit\'s defence — "it appears on both sides" — but appearing on both sides is precisely what makes it the murdered factor; the annex derivation pins why. Option 3 names a root the equation never had: 0 solves neither side of the original ($0 \\neq 6$), so there is nothing there to lose.' },
      { q: 'The roots of $x^3-6x^2+11x-6 = 0$ are 1, 2, 3. The roots of the equation with each root DECREASED by 1 are', options: ['{0, 1, 2}', '{2, 3, 4}', '{1, 2, 3}', '{-1, 0, 1}'], answer: 0, explain: 'Option 0 is the decrease applied literally: $\\{1, 2, 3\\}$ minus 1 is $\\{0, 1, 2\\}$ — and the engine pins the transformed equation $P(x+1) = x^3-3x^2+2x = x(x-1)(x-2)$, exactly those roots. Option 1 is the INCREASE by 1 (the sign flip — those are the roots of $P(x-1) = x^3-9x^2+26x-24$). Option 2 is no transformation at all. Option 3 is the decrease by 2 — the 8.4 depression read $\\{-1, 0, 1\\}$ of $x^3-x$, one step too far. The sign discipline: decrease reads $P(x+h)$, the sign inside OPPOSITE to the move.' },
      { q: 'Squaring both sides of $\\sqrt{x} = x - 2$', options: ['may lose roots', 'may introduce extraneous roots', 'is an equivalence', 'always gains two roots'], answer: 1, explain: 'Option 1 is the direction theorem: squaring is a one-way door UP — every solution of the original survives ($A = B$ forces $A^2 = B^2$), and candidates with $A = -B$ ride along, so the squared equation may introduce EXTRANEOUS roots that must be audited against the original. Option 0 names the opposite door: loss is CANCELLATION\'s failure mode — squaring cannot delete a root (every original solution solves the squared equation). Option 2 is precisely the false belief the audit column exists to kill: $A^2 = B^2$ is equivalent to $A = \\pm B$, not to $A = B$. Option 3 overstates: the gain is AT MOST the $A = -B$ branch — sometimes empty, sometimes one root, never promised two.' },
    ] },
    { kind: 'exercises', title: 'Exercises 8.5', sets: [
      { level: 'L1', questions: [
        { q: 'Form the equation whose roots are each 3 more than the roots of $x^2-5x+6 = 0$.', solution: [
          'Setup: the base equation factors as $(x-2)(x-3)$ — roots $\\{2, 3\\}$.',
          'Now, an increase by $h = 3$ reads $P(x-3) = 0$ by the shift law.',
          'So, expand: $(x-3)^2 - 5(x-3) + 6 = x^2 - 6x + 9 - 5x + 15 + 6 = x^2 - 11x + 30$.',
          'Hence $x^2-11x+30 = 0$ — roots $\\{5, 6\\}$, exactly the base roots shifted right by 3 (engine-checked by evaluation at both).',
        ], answer: '$x^2-11x+30 = 0$ (roots 5, 6)' },
        { q: 'Form the equation whose roots are the reciprocals of the roots of $x^3-6x^2+11x-6 = 0$.', solution: [
          'Setup: a degree-3 equation — the inversion law asks for $x^3P(1/x) = 0$.',
          'Now, substitute: $x^3\\left(\\tfrac{1}{x^3} - \\tfrac{6}{x^2} + \\tfrac{11}{x} - 6\\right) = 1 - 6x + 11x^2 - 6x^3$.',
          'So, the reciprocal equation is $1-6x+11x^2-6x^3 = 0$ — the coefficient string reversed (equivalently $6x^3-11x^2+6x-1 = 0$ after multiplying by $-1$).',
          'Hence the roots are $\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$ — the reciprocals of $\\{1, 2, 3\\}$, their sum $\\tfrac{11}{6} = \\sigma_2/\\sigma_3$ the 8.3 read.',
        ], answer: '$1-6x+11x^2-6x^3 = 0$ (roots $1, \\tfrac{1}{2}, \\tfrac{1}{3}$)' },
      ] },
      { level: 'L2', questions: [
        { q: 'Diminish the roots of $x^3-6x^2+11x-6 = 0$ by 2, and name the transformed equation.', solution: [
          'Setup: diminishing by 2 is the decrease law — $P(x+2) = 0$.',
          'Now, expand honestly: $(x+2)^3 - 6(x+2)^2 + 11(x+2) - 6 = (x^3+6x^2+12x+8) - (6x^2+24x+24) + (11x+22) - 6$.',
          'So, collecting: $x^3 - x = 0$ — the $x^2$ term has died.',
          'Hence the diminished equation is $x^3-x = 0$ with roots $\\{-1, 0, 1\\}$ — the chapter witness\'s 8.4 depression ($a = -6$: the increase by $a/3$ is the decrease by 2), drawn in the figure below: every root slides left by 2, and the whole curve rides with them.',
        ], answer: '$x^3-x = 0$ (roots $-1, 0, 1$)', figures: [
          { caption: 'The shift by 2 made visible: the chips 1, 2, 3 ride right onto 3, 4, 5 in the top band (the increase-by-2 read $P(x-2) = x^3-12x^2+47x-60$); the same craft at $h = -2$ slides the root set LEFT onto $\\{-1, 0, 1\\}$, giving the diminished cousin $x^3-x$ — the direction the exercise asks for, the mirror of the drawn one.', svg: shiftSolutionSvg85() },
        ] },
        { q: 'The roots of $x^2-3x+2 = 0$ are 1 and 2. Form the equation whose roots are the squares of these roots.', solution: [
          'Setup: the prescribed roots are $\\{1^2, 2^2\\} = \\{1, 4\\}$ — but compute them through the symmetric functions so the method survives non-nice bases.',
          'Now, the new sum: $\\alpha^2+\\beta^2 = \\sigma_1^2 - 2\\sigma_2 = 9 - 4 = 5$.',
          'So, the new product: $\\alpha^2\\beta^2 = \\sigma_2^2 = 4$.',
          'Hence $x^2 - 5x + 4 = 0$ — roots $\\{1, 4\\}$, verified by evaluation: $1 - 5 + 4 = 0$ and $16 - 20 + 4 = 0$.',
        ], answer: '$x^2-5x+4 = 0$ (roots 1, 4)' },
      ] },
      { level: 'L3', questions: [
        { q: 'The roots of $x^3-2x^2-5x+6 = 0$ are $1, 3, -2$. Form the equation whose roots are these roots each decreased by 1.', solution: [
          'Setup: decreasing by 1 is the diminish law — $P(x+1) = 0$.',
          'Now, expand: $(x+1)^3 - 2(x+1)^2 - 5(x+1) + 6 = (x^3+3x^2+3x+1) - (2x^2+4x+2) - (5x+5) + 6$.',
          'So, collecting: $x^3 + x^2 - 6x = 0$.',
          'Check: the prescribed new roots are $\\{0, 2, -3\\}$ — and $x^3+x^2-6x = x(x-2)(x+3)$ lands all three (engine-verified).',
          'Hence $x^3+x^2-6x = 0$, roots $\\{0, 2, -3\\}$.',
        ], answer: '$x^3+x^2-6x = 0$ (roots $0, 2, -3$)' },
        { q: 'Solve $x^4-5x^2+4 = 0$, and note the ± structure of its roots — the additive cousin of the reciprocal pairing that lesson 8.6 studies.', solution: [
          'Setup: the equation is even in $x$ — only even powers — so substitute $y = x^2$ and solve the quadratic in $y$.',
          'Now, $y^2 - 5y + 4 = (y-1)(y-4) = 0$, so $y \\in \\{1, 4\\}$.',
          'So, $x^2 = 1$ gives $x = \\pm 1$, and $x^2 = 4$ gives $x = \\pm 2$ — all four verified by evaluation.',
          'Hence the solution set is $\\{\\pm 1, \\pm 2\\}$ — and the STRUCTURE: if $x$ is a root then $-x$ is a root (the equation is invariant under $x \\mapsto -x$), exactly as a reciprocal equation\'s roots pair under $x \\mapsto 1/x$; note too that $\\pm 1$ are their own reciprocals — the overlap point of the two pairings, and the bridge ahead to lesson 8.6.',
        ], answer: '$\\{\\pm 1, \\pm 2\\}$' },
        { q: 'Solve $x^2(x-1) = 6(x-1)$ twice — once by cancelling the common factor, once honestly — and audit the difference.', solution: [
          'The fluent route (the trap): cancel $(x-1)$ from both sides, leaving $x^2 = 6$.',
          'Now, that equation has roots $\\{\\pm\\sqrt{6}\\}$ — and the audit column flags the move: the cancelled factor\'s root 1 is MISSING.',
          'The honest route: bring everything to one side — $x^2(x-1) - 6(x-1) = 0$, so $(x-1)(x^2 - 6) = 0$.',
          'So, the roots are $\\{1, \\pm\\sqrt{6}\\}$, with $x = 1$ verified in the ORIGINAL: $1^2 \\cdot 0 = 6 \\cdot 0$.',
          'Hence the honest solution set is $\\{1, \\pm\\sqrt{6}\\}$; the cancelled route loses the root 1 — the loss-of-root door DOWN, exactly as the direction theorem pins.',
        ], answer: 'honest: $\\{1, \\pm\\sqrt{6}\\}$; cancelled: $\\{\\pm\\sqrt{6}\\}$ — the root 1 is lost' },
      ] },
      { level: 'L4', questions: [
        { q: 'The roots of $x^3-7x+6 = 0$ are $1, 2, -3$. Form the equation whose roots are these roots each increased by 1.', solution: [
          'Setup: increasing by 1 reads $P(x-1) = 0$ — the sign inside opposite to the move.',
          'Now, expand: $(x-1)^3 - 7(x-1) + 6 = (x^3-3x^2+3x-1) - 7x + 7 + 6$.',
          'So, collecting: $x^3 - 3x^2 - 4x + 12$.',
          'Check: the prescribed new roots are $\\{2, 3, -2\\}$ — and $x^3-3x^2-4x+12 = (x-2)(x-3)(x+2)$ (engine-verified by expansion and evaluation).',
          'Hence $x^3-3x^2-4x+12 = 0$, roots $\\{2, 3, -2\\}$.',
        ], answer: '$x^3-3x^2-4x+12 = 0$ (roots $2, 3, -2$)' },
        { q: 'Solve $\\sqrt{x+2} = x$, running the full audit column.', solution: [
          'Setup: the domain discipline first — the left side is a principal square root (never negative), so the equation needs $x \\geq 0$ before any move.',
          'Now, square both sides (a one-way door UP — every candidate must be audited): $x + 2 = x^2$, that is $x^2 - x - 2 = 0$.',
          'So, factor: $(x-2)(x+1) = 0$, candidates $\\{2, -1\\}$.',
          'Audit: at $x = 2$, $\\sqrt{4} = 2$ — holds; at $x = -1$, $\\sqrt{1} = 1 \\neq -1$ — FAILS (and $-1$ also violates the $x \\geq 0$ domain read), the $A = -B$ signature of a squaring-born impostor.',
          'Hence the solution set is $\\{2\\}$ — the impostor struck by the audit column, as the figure shows.',
        ], answer: '$\\{2\\}$ (the candidate $-1$ is extraneous)', figures: [
          { caption: 'The audit drawn: the teal curve $\\sqrt{x+2}$ meets the amber line $y = x$ once, at the ringed true root $(2, 2)$; the squared equation\'s parabola $x^2-x-2$ crosses the axis at BOTH $-1$ and $2$ — and the red-flagged $-1$ is the impostor ($\\sqrt{1} = 1$, one unit above where the line sits at $-1$).', svg: extraneousAuditSolutionSvg85() },
        ] },
        { q: 'Form the equation whose roots are TWICE the roots of $x^3-6x^2+11x-6 = 0$.', solution: [
          'Setup: scaling by $k = 2$ on a degree-3 equation — the law asks for $2^3P(x/2) = 8P(x/2) = 0$.',
          'Now, substitute: $8\\left(\\tfrac{x^3}{8} - 6\\tfrac{x^2}{4} + 11\\tfrac{x}{2} - 6\\right) = x^3 - 12x^2 + 44x - 48$.',
          'So, the scaled equation is $x^3 - 12x^2 + 44x - 48 = 0$.',
          'Check: the doubled roots are $\\{2, 4, 6\\}$ — and $(x-2)(x-4)(x-6)$ expands to exactly this cousin (engine-verified).',
          'Hence $x^3-12x^2+44x-48 = 0$, roots $\\{2, 4, 6\\}$.',
        ], answer: '$x^3-12x^2+44x-48 = 0$ (roots $2, 4, 6$)' },
      ] },
      { level: 'L5', questions: [
        { q: 'Solve $x^3-4x^2+x+6 = 0$ by the diminished-roots craft: diminish the roots by 2, solve the transparent cousin by inspection, and shift back.', solution: [
          'Setup: diminishing by 2 asks for $P(x+2) = 0$ — and the craft\'s bet is that the cousin factors by inspection.',
          'Now, expand: $(x+2)^3 - 4(x+2)^2 + (x+2) + 6 = (x^3+6x^2+12x+8) - (4x^2+16x+16) + x + 8$.',
          'So, the cousin is $x^3 + 2x^2 - 3x = 0$ — a zero constant term, the most factorable shape there is.',
          'Factor by inspection: $x(x^2+2x-3) = x(x-1)(x+3) = 0$, so the cousin\'s roots are $\\{0, 1, -3\\}$.',
          'Hence shift BACK up by 2: the original roots are $\\{2, 3, -1\\}$ — engine-verified in the original cubic ($8-16+2+6 = 0$, $27-36+3+6 = 0$, $-1-4-1+6 = 0$). A cubic solved by moving it, Cardan never summoned.',
        ], answer: '$\\{2, 3, -1\\}$ via the cousin $x^3+2x^2-3x = 0$ (roots $0, 1, -3$)' },
        { q: 'Prove the inversion law — $x^nP(1/x) = 0$ has exactly the roots $1/r_i$ — and verify it on $P(x) = x^3-6x^2+11x-6$.', solution: [
          'Setup: write the degree-$n$ polynomial in factored form, $P(x) = a(x-r_1)(x-r_2)\\cdots(x-r_n)$ — the fundamental theorem\'s census of lesson 8.1.',
          'Now, substitute $x \\mapsto 1/x$: $P(1/x) = a\\prod_i(\\tfrac{1}{x} - r_i)$, each bracket a difference of fractions.',
          'So, clear denominators: $x^nP(1/x) = a\\prod_i(1 - r_ix)$ — multiplying by $x^n$ pulls one $x$ from each of the $n$ brackets, leaving a genuine degree-$n$ polynomial.',
          'Read the roots: $x = 1/r_i$ makes the $i$-th bracket $(1 - r_i x)$ vanish, and the $n$ brackets fill all $n$ degree-seats — so $\\{1/r_1, \\ldots, 1/r_n\\}$ is the COMPLETE root list.',
          'Hence on the witness: $x^3P(1/x) = 1-6x+11x^2-6x^3$, and the engine evaluates all three reciprocals $\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$ — with their sum $\\tfrac{11}{6}$ matching the $\\sigma_2/\\sigma_3$ read of lesson 8.3.',
        ], answer: 'proved — the reversed-coefficient law; witness roots $\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$' },
        { q: 'Derive the general shift-coefficient law for $P(x) = x^3+ax^2+bx+c$ — the exact form of $P(x-1)$ — and verify it on $x^3-6x^2+11x-6$.', solution: [
          'Setup: the roots increased by 1 read $P(x-1)$, so expand $(x-1)^3 + a(x-1)^2 + b(x-1) + c$ term by term.',
          'Now, the pieces: $(x-1)^3 = x^3-3x^2+3x-1$; $a(x-1)^2 = a(x^2-2x+1)$; $b(x-1) = bx - b$; and the constant $c$.',
          'So, collect by powers — $x^3$: 1; $x^2$: $a - 3$; $x$: $3 - 2a + b$; constant: $-1 + a - b + c$.',
          'Hence $P(x-1) = x^3 + (a-3)x^2 + (b-2a+3)x + (a-b+c-1)$ — the shift-coefficient law; the engine verifies it symbolically and sweeps it on ten $(a,b,c)$ triples.',
          'Now, on the witness ($a = -6$, $b = 11$, $c = -6$): the reads give $a-3 = -9$, $b-2a+3 = 11+12+3 = 26$, $a-b+c-1 = -6-11-6-1 = -24$ — so $P(x-1) = x^3-9x^2+26x-24$ (note the honest constant: $-24$, not a tempting $-18$), roots $\\{2, 3, 4\\}$ — engine-verified by expansion and evaluation.',
        ], answer: '$P(x-1) = x^3+(a-3)x^2+(b-2a+3)x+(a-b+c-1)$; witness: $x^3-9x^2+26x-24$ (roots $2, 3, 4$)' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the shift law — $P(x-h) = 0$ has exactly the roots $r_i + h$ — and run the doubled audit (both directions) on the witnesses $P(x-2)$ and $P(x+2)$ of $x^3-6x^2+11x-6$.', solution: [
          'Setup: one root first — the factor theorem writes $P(x) = (x-r)Q(x)$ for a root $r$ of $P$.',
          'Now, substitute $x = X - h$: $P(X-h) = (X - h - r)Q(X-h)$, and at $X = r + h$ the first factor is zero — every increased root solves the transformed equation.',
          'So, count seats: $\\deg P(x-h) = \\deg P = n$, so the transformed equation has exactly $n$ roots, and the $n$ increased candidates already fill them — nothing else is a root. Read at $-h$: $P(x+h) = 0$ has the roots $r_i - h$.',
          'Audit, direction one (no impostors): the engine evaluates $P(x-2) = x^3-12x^2+47x-60$ at every integer from $-8$ to $10$ — zeros EXACTLY at $\\{3, 4, 5\\}$, no other integer root: the transformed list is complete, nothing gained.',
          'Audit, direction two (nothing lost): $P(x+2) = x^3-x$ zeroes exactly at $\\{-1, 0, 1\\}$ over the same sweep — and each is $r_i - 2$ for a base root: 1 maps to $-1$, 2 to 0, 3 to 1. Both inclusions of the equivalence hold, the audit column empty.',
          'Hence the shift law proved, with both directions audited on the engine-pinned witnesses — the same two-step discipline (expand, then evaluate at every claimed root) this lesson\'s verifier runs on every number it prints.',
        ], answer: 'proved — $P(x-h)$ has exactly the roots $r_i+h$; witnesses audited $\\{3,4,5\\}$ and $\\{-1,0,1\\}$' },
        { q: 'Prove the direction theorem — cancellation can only remove roots and squaring can only add them (the domain discipline) — with both pinned witnesses.', solution: [
          'Setup, cancellation: an equation $E = F$ with common factor $G$, both sides $E = GE\'$, $F = GF\'$.',
          'Now, the original says $G(E\'-F\') = 0$ — a product — so its solution set is $\\{G = 0\\} \\cup \\{E\' = F\'\\}$ by the zero-product law.',
          'So, the cancelled equation $E\' = F\'$ keeps only the second bracket: $S_{\\text{cancelled}} \\subseteq S_{\\text{orig}}$, the lost roots inside $\\{G = 0\\}$ — cancellation only removes. Witness: $x^2(x-1) = 6(x-1)$ has $\\{1, \\pm\\sqrt{6}\\}$; the cancelled $x^2 = 6$ has $\\{\\pm\\sqrt{6}\\}$ — the root 1 (the factor\'s root) is the deleted one, and the engine confirms NO new candidate appears.',
          'Setup, squaring: an equation $A = B$ becomes $A^2 = B^2 = (A-B)(A+B)$ — so $S_{\\text{squared}} = \\{A = B\\} \\cup \\{A = -B\\} \\supseteq S_{\\text{orig}}$: every original solution survives, the sign-flipped branch rides along — squaring only adds.',
          'Now, the witness: $\\sqrt{x+2} = x$ squares to $x^2-x-2 = 0$ with candidates $\\{2, -1\\}$; at $x = 2$ both sides agree ($2 = 2$), at $x = -1$ the $A = -B$ branch holds ($\\sqrt{1} = 1 = -(-1)$) while the original fails — the added impostor, audited out to the solution set $\\{2\\}$.',
          'Hence the census stands: $S_{\\text{cancelled}} \\subseteq S_{\\text{orig}} \\subseteq S_{\\text{squared}}$ — two one-way doors pointing opposite ways, both engine-pinned, and the audit column the only instrument that restores the equivalence either door spends.',
        ], answer: 'proved — $S_{\\text{cancelled}} \\subseteq S_{\\text{orig}} \\subseteq S_{\\text{squared}}$; witnesses $\\{1, \\pm\\sqrt{6}\\} \\to \\{\\pm\\sqrt{6}\\}$ and $\\{2\\} \\to \\{2, -1\\}$' },
      ] },
    ] },
    { kind: 'formula', name: 'The increase law (roots r → r + h)', latex: 'P(x - h) = 0 \\quad \\text{has roots} \\quad r_i + h', note: 'the equation whose roots are each increased by $h$; the sign inside is OPPOSITE to the move. Witness: $x^3-6x^2+11x-6$ at $h=2$ gives $x^3-12x^2+47x-60$ (roots 3, 4, 5).' },
    { kind: 'formula', name: 'The decrease law (roots r → r − h)', latex: 'P(x + h) = 0 \\quad \\text{has roots} \\quad r_i - h', note: 'diminishing the roots by $h$; Cardan\'s depression of 8.4 is the INCREASE law at $h = a/3$ — for the witness $a = -6$ it reads as this decrease by 2. Witness: $h=2$ gives $x^3-x$ (roots $-1$, 0, 1).' },
    { kind: 'formula', name: 'The scaling law (roots r → kr)', latex: 'k^n P(x/k) = 0 \\quad \\text{has roots} \\quad kr_i', note: 'the prefactor $k^n$ clears the $k^i$ denominators and preserves degree (monic stays monic). Witness: $k=3$ gives $x^3-18x^2+99x-162$ (roots 3, 6, 9).' },
    { kind: 'formula', name: 'The inversion law (roots r → 1/r)', latex: 'x^n P(1/x) = 0 \\quad \\text{has roots} \\quad 1/r_i', note: 'the coefficient string reversed — no root may be 0. Witness: $1-6x+11x^2-6x^3$ (roots $1$, $\\tfrac{1}{2}$, $\\tfrac{1}{3}$); the fixed points of this move are lesson 8.6\'s reciprocal equations.' },
    { kind: 'formula', name: 'The squares read (two roots α, β)', latex: 'x^2 - (\\sigma_1^2 - 2\\sigma_2)\\,x + \\sigma_2^2 = 0', note: 'new sum $\\alpha^2+\\beta^2 = \\sigma_1^2-2\\sigma_2$, new product $(\\alpha\\beta)^2 = \\sigma_2^2$ — the symmetric route (8.3). Witness: $x^2-3x+2$ gives $x^2-5x+4$ (roots 1, 4).' },
    { kind: 'formula', name: 'The shift-coefficient law (cubic)', latex: 'P(x-1) = x^3 + (a-3)x^2 + (b-2a+3)x + (a-b+c-1)', note: 'for $P = x^3+ax^2+bx+c$, roots increased by 1, read off the coefficient list — the engine-verified symbolic expansion. On the witness: $x^3-9x^2+26x-24$ (roots 2, 3, 4).' },
    { kind: 'formula', name: 'The loss-of-root guard (cancellation)', latex: 'G\\,(E\' - F\') = 0 \\;\\Longrightarrow\\; S = \\{G = 0\\} \\cup \\{E\' = F\'\\}', note: 'before cancelling a common factor $G$ from both sides, harvest its roots — they solve the original. Cancellation only removes: $S_{\\text{cancelled}} \\subseteq S_{\\text{orig}}$.' },
    { kind: 'formula', name: 'The extraneous guard (squaring)', latex: 'A = B \\implies A^2 = B^2, \\qquad A^2 = B^2 \\iff A = \\pm B', note: 'after squaring (or any domain-expanding move), audit every candidate in the ORIGINAL equation — the impostors sit on the $A = -B$ branch. Squaring only adds: $S_{\\text{orig}} \\subseteq S_{\\text{squared}}$.' },
    { kind: 'formula', name: 'The equivalence discipline', latex: 'S_1 = S_2 \\;\\text{(both directions)} \\iff \\text{equivalent equations}', note: 'a transformation is safe exactly when reversible — add/subtract, nonzero scaling, invertible substitution keep it; cancellation and squaring spend it (one-way doors), so run the audit column.' },
  ],
}


// ------------------------------------------------------------------
// lesson 8.6 — authored by the run-119 swarm (the 086 agent), integrated verbatim
// ------------------------------------------------------------------

function palindromeMirror86Svg(): string {
  // the coefficient strip 1, 7, 14, 7, 1 as chips mirrored about the middle
  // chip, the two pairing brackets (a4 = a0, a3 = a1), then the divide-by-x^2
  // box producing the t-row for THE witness x^4+7x^3+14x^2+7x+1.
  const chips: { v: string; p: string; fill: string; stroke: string }[] = [
    { v: '1', p: 'x⁴', fill: '#ffedd5', stroke: '#ea580c' },
    { v: '7', p: 'x³', fill: '#fef3c7', stroke: '#d97706' },
    { v: '14', p: 'x²', fill: '#5eead4', stroke: '#0d9488' },
    { v: '7', p: 'x', fill: '#fef3c7', stroke: '#d97706' },
    { v: '1', p: '1', fill: '#ffedd5', stroke: '#ea580c' },
  ]
  const W = 720
  const cw = 88
  const gap = 32
  const x0 = (W - (5 * cw + 4 * gap)) / 2
  let s = ''
  chips.forEach((ch, i) => {
    const x = x0 + i * (cw + gap)
    s += `<rect x="${x}" y="44" width="${cw}" height="52" rx="8" fill="${ch.fill}" stroke="${ch.stroke}" stroke-width="2.2"/>`
    s += `<text x="${x + cw / 2}" y="78" font-size="21" font-weight="800" fill="#166534" text-anchor="middle">${ch.v}</text>`
    s += `<text x="${x + cw / 2}" y="112" font-size="11.5" font-weight="700" fill="#65a30d" text-anchor="middle">${ch.p}</text>`
  })
  const c1 = x0 + cw / 2
  const c2 = x0 + (cw + gap) + cw / 2
  const c4 = x0 + 3 * (cw + gap) + cw / 2
  const c5 = x0 + 4 * (cw + gap) + cw / 2
  return `<svg viewBox="0 0 ${W} 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The palindromic coefficient strip 1, 7, 14, 7, 1 as five labelled chips for the powers x to the fourth down to the constant. The strip reads the same left to right and right to left. A bracket under the inner chips 7 and 7 marks a3 equals a1; a wider bracket under the outer chips 1 and 1 marks a4 equals a0. Below, a panel shows the method: divide by x squared to get x squared plus 1 over x squared, plus 7 times x plus 1 over x, plus 14 equals 0; then substitute t equals x plus 1 over x, with x squared plus 1 over x squared equal to t squared minus 2, collapsing everything to the quadratic t squared plus 7 t plus 12 equals 0.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the palindrome mirror: the row 1, 7, 14, 7, 1 reads the same both ways</text>
  ${s}
  <path d="M ${c2} 126 L ${c2} 132 L ${c4} 132 L ${c4} 126" fill="none" stroke="#d97706" stroke-width="2.2"/>
  <text x="360" y="150" font-size="11.5" font-weight="700" fill="#d97706" text-anchor="middle">a3 = a1 — the inner pair</text>
  <path d="M ${c1} 162 L ${c1} 168 L ${c5} 168 L ${c5} 162" fill="none" stroke="#ea580c" stroke-width="2.4"/>
  <text x="360" y="188" font-size="11.5" font-weight="700" fill="#ea580c" text-anchor="middle">a4 = a0 — the outer pair</text>
  <rect x="80" y="206" width="560" height="70" rx="10" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>
  <text x="360" y="234" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">divide by x²:  (x² + 1/x²) + 7(x + 1/x) + 14 = 0</text>
  <text x="360" y="260" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">t = x + 1/x,  x² + 1/x² = t² - 2   gives   t² + 7t + 12 = 0</text>
  <text x="360" y="304" font-size="11.5" font-weight="700" fill="#0d9488" text-anchor="middle">degree 4 in x becomes degree 2 in t — the palindrome halves the work</text>
</svg>`
}

function reciprocalPairs86Svg(): string {
  // the four real roots of THE witness on one number line, arcs (below the
  // line, one per pair) joining each reciprocal pair, each labelled with its
  // product 1. values engine-pinned: -3.7321, -2.6180, -0.3820, -0.2679.
  const W = 720
  const y = 170
  const map = (v: number) => 70 + (v + 4.2) * (580 / 4.5)
  const xA1 = map(-3.7321)
  const xA2 = map(-0.2679)
  const xB1 = map(-2.6180)
  const xB2 = map(-0.3820)
  const line = `<line x1="70" y1="${y}" x2="650" y2="${y}" stroke="#0d9488" stroke-width="2.4"/>`
  let ticks = ''
  for (const t of [-4, -3, -2, -1, 0]) {
    const x = map(t)
    ticks += `<line x1="${x}" y1="${y - 6}" x2="${x}" y2="${y + 6}" stroke="#0d9488" stroke-width="2"/><text x="${x}" y="${y + 24}" font-size="11.5" font-weight="700" fill="#65a30d" text-anchor="middle">${t}</text>`
  }
  let dotS = ''
  for (const d of [xA1, xB1, xB2, xA2]) {
    dotS += `<circle cx="${d}" cy="${y}" r="6.5" fill="${d === xA1 || d === xA2 ? '#ea580c' : '#d97706'}" stroke="#166534" stroke-width="1.6"/>`
  }
  const arcA = `<path d="M ${xA1} 202 Q 353 290 ${xA2} 202" fill="none" stroke="#ea580c" stroke-width="2.4"/>`
  const arcB = `<path d="M ${xB1} 202 Q 419 222 ${xB2} 202" fill="none" stroke="#d97706" stroke-width="2.4"/>`
  let links = ''
  for (const d of [xA1, xB1, xB2, xA2]) {
    links += `<line x1="${d}" y1="178" x2="${d}" y2="200" stroke="${d === xA1 || d === xA2 ? '#ea580c' : '#d97706'}" stroke-width="1.6" stroke-dasharray="3 3"/>`
  }
  return `<svg viewBox="0 0 ${W} 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The number line from minus four to zero carrying the four real roots of x to the fourth plus 7 x cubed plus 14 x squared plus 7 x plus 1: minus 3.7321, minus 2.6180, minus 0.3820 and minus 0.2679. Dashed connectors drop from each dot to the arcs below, where an orange arc joins the outer pair minus 3.7321 and minus 0.2679, and an amber arc joins the inner pair minus 2.6180 and minus 0.3820. Two legend chips state the products: the outer pair multiplies to exactly 1, and so does the inner pair — the roots come in reciprocal pairs, and the product of all four is 1, matching the constant term over the leading coefficient.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the four real roots of the witness: two reciprocal pairs</text>
  ${line}
  ${ticks}
  ${dotS}
  <text x="${xA1}" y="158" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">-3.732</text>
  <text x="${xB1}" y="158" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">-2.618</text>
  <text x="${xB2 - 16}" y="144" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">-0.382</text>
  <text x="${xA2 + 22}" y="148" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">-0.268</text>
  ${links}
  ${arcB}
  ${arcA}
  <rect x="42" y="256" width="300" height="30" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.8"/>
  <text x="192" y="275" font-size="11.5" font-weight="700" fill="#166534" text-anchor="middle">outer pair: (-3.7321) x (-0.2679) = 1</text>
  <rect x="378" y="256" width="300" height="30" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
  <text x="528" y="275" font-size="11.5" font-weight="700" fill="#166534" text-anchor="middle">inner pair: (-2.6180) x (-0.3820) = 1</text>
</svg>`
}

function tLadder86Svg(): string {
  // the staircase at pinned t = 3: the four rung values 3, 7, 18, 47 as bars
  // of proportional height (scale 4.6 px per unit, gridlines every 10), each
  // labelled with its ladder identity.
  const W = 560
  const base = 280
  const scale = 4.6
  const cols = [
    { cx: 90, v: 3, fill: '#16a34a', l1: 't', l2: '= x + 1/x' },
    { cx: 220, v: 7, fill: '#65a30d', l1: 'x² + 1/x²', l2: '= t² - 2' },
    { cx: 350, v: 18, fill: '#d97706', l1: 'x³ + 1/x³', l2: '= t³ - 3t' },
    { cx: 480, v: 47, fill: '#ea580c', l1: 'x⁴ + 1/x⁴', l2: '= t⁴ - 4t² + 2' },
  ]
  let grid = ''
  for (const g of [10, 20, 30, 40]) {
    const gy = base - g * scale
    grid += `<line x1="56" y1="${gy}" x2="522" y2="${gy}" stroke="#5eead4" stroke-width="1.2" stroke-dasharray="4 4"/><text x="48" y="${gy + 3.5}" font-size="9.5" font-weight="700" fill="#65a30d" text-anchor="end">${g}</text>`
  }
  grid += `<line x1="56" y1="${base}" x2="522" y2="${base}" stroke="#0d9488" stroke-width="2.4"/>`
  let s = ''
  for (const col of cols) {
    const h = col.v * scale
    s += `<rect x="${col.cx - 36}" y="${base - h}" width="72" height="${h}" rx="6" fill="${col.fill}" fill-opacity="0.92" stroke="#166534" stroke-width="1.6"/>`
    s += `<text x="${col.cx}" y="${base - h - 10}" font-size="14" font-weight="800" fill="#166534" text-anchor="middle">${col.v}</text>`
    s += `<text x="${col.cx}" y="${base + 22}" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">${col.l1}</text>`
    s += `<text x="${col.cx}" y="${base + 38}" font-size="11" font-weight="700" fill="#65a30d" text-anchor="middle">${col.l2}</text>`
  }
  return `<svg viewBox="0 0 ${W} 356" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The t-ladder drawn as a staircase of four bars at the pinned value t equals 3: t itself is 3, x squared plus 1 over x squared equals t squared minus 2 which is 7, x cubed plus 1 over x cubed equals t cubed minus 3 t which is 18, and x to the fourth plus 1 over x to the fourth equals t to the fourth minus 4 t squared plus 2 which is 47. Bar heights are drawn proportional to these values on a common scale with dashed gridlines every 10 units.">
  <text x="280" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the t-ladder at t = 3: each rung climbs</text>
  ${grid}
  ${s}
  <text x="280" y="${base + 64}" font-size="11.5" font-weight="700" fill="#0d9488" text-anchor="middle">every x-power pair is a polynomial in t — the ladder the sextic and the reads ride</text>
</svg>`
}

function mirrorStrip86Svg(): string {
  // the L2-1 solution figure: the strip 1, 7, 14, 7, 1, the divide-by-x^2
  // move, the t-quadratic and its factorization, the two return quadratics
  // with their root values and the pair products.
  const W = 700
  let chips = ''
  const vals = ['1', '7', '14', '7', '1']
  const cw = 56
  const gap = 14
  const x0 = 60
  vals.forEach((v, i) => {
    const x = x0 + i * (cw + gap)
    chips += `<rect x="${x}" y="46" width="${cw}" height="36" rx="7" fill="${i === 2 ? '#5eead4' : i % 2 === 0 ? '#ffedd5' : '#fef3c7'}" stroke="${i === 2 ? '#0d9488' : i % 2 === 0 ? '#ea580c' : '#d97706'}" stroke-width="2"/><text x="${x + cw / 2}" y="70" font-size="16" font-weight="800" fill="#166534" text-anchor="middle">${v}</text>`
  })
  const chipEnd = x0 + 5 * cw + 4 * gap
  return `<svg viewBox="0 0 ${W} 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The solution walk for x to the fourth plus 7 x cubed plus 14 x squared plus 7 x plus 1: the palindromic strip of chips 1, 7, 14, 7, 1, an arrow labelled divide by x squared, the quadratic t squared plus 7 t plus 12 equals 0 factored as t plus 3 times t plus 4 with t equal to minus 3 or minus 4, then two boxes: t equals minus 3 gives x squared plus 3 x plus 1 with roots minus 0.382 and minus 2.618 whose product is 1; t equals minus 4 gives x squared plus 4 x plus 1 with roots minus 0.268 and minus 3.732 whose product is 1. Four roots in two reciprocal pairs.">
  <text x="350" y="24" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">from the mirror row to the two reciprocal pairs</text>
  ${chips}
  <line x1="${chipEnd + 10}" y1="64" x2="${chipEnd + 60}" y2="64" stroke="#ea580c" stroke-width="2.4"/><path d="M ${chipEnd + 60} 64 l -9 -5 v 10 z" fill="#ea580c"/>
  <text x="${chipEnd + 118}" y="68" font-size="11.5" font-weight="700" fill="#ea580c">divide by x²</text>
  <rect x="40" y="102" width="620" height="46" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>
  <text x="350" y="124" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">t² + 7t + 12 = 0 = (t + 3)(t + 4)</text>
  <text x="350" y="141" font-size="11" font-weight="700" fill="#65a30d" text-anchor="middle">t = -3  or  t = -4</text>
  <rect x="40" y="168" width="300" height="52" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.8"/>
  <text x="190" y="188" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">t = -3:  x² + 3x + 1 = 0</text>
  <text x="190" y="206" font-size="11" font-weight="700" fill="#65a30d" text-anchor="middle">roots -0.382, -2.618 — product 1</text>
  <rect x="360" y="168" width="300" height="52" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
  <text x="510" y="188" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">t = -4:  x² + 4x + 1 = 0</text>
  <text x="510" y="206" font-size="11" font-weight="700" fill="#65a30d" text-anchor="middle">roots -0.268, -3.732 — product 1</text>
  <text x="350" y="240" font-size="11.5" font-weight="700" fill="#0d9488" text-anchor="middle">each t returns two roots x with r times 1/r = 1 — four roots, two pairs</text>
</svg>`
}

function tripleCollapse86Svg(): string {
  // the L4-3 solution figure: the sextic's cubic in t collapsing to (t-2)^3,
  // the triple t = 2, the return quadratic, and the six-fold verdict x = 1.
  const W = 660
  const arrow = (x1: number, y1: number, x2: number, y2: number) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ea580c" stroke-width="2.2"/><path d="M ${x2} ${y2} l -9 -5 v 10 z" fill="#ea580c"/>`
  return `<svg viewBox="0 0 ${W} 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The triple collapse of the sextic walk: the cubic in t, t cubed minus 6 t squared plus 12 t minus 8 equals 0, factored as t minus 2 cubed, so t equals 2 is a triple root; t equals 2 means x plus 1 over x equals 2, which returns the quadratic x squared minus 2 x plus 1, factored as x minus 1 squared, so x equals 1 — counted with multiplicity the original degree six gives x equals 1 six times, matching the sextic being x minus 1 to the sixth.">
  <text x="330" y="24" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the triple collapse: t³ - 6t² + 12t - 8 = (t - 2)³</text>
  <rect x="30" y="46" width="280" height="44" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>
  <text x="170" y="73" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">t³ - 6t² + 12t - 8 = 0</text>
  <line x1="316" y1="68" x2="346" y2="68" stroke="#ea580c" stroke-width="2.2"/><path d="M 346 68 l -9 -5 v 10 z" fill="#ea580c"/>
  <rect x="352" y="46" width="278" height="44" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
  <text x="491" y="73" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">(t - 2)³ = 0</text>
  ${arrow(330, 96, 330, 116)}
  <rect x="180" y="122" width="300" height="40" rx="8" fill="#fef3c7" stroke="#65a30d" stroke-width="2"/>
  <text x="330" y="147" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">t = 2, three times — the triple root</text>
  ${arrow(330, 166, 330, 186)}
  <rect x="150" y="192" width="360" height="40" rx="8" fill="#ffedd5" stroke="#d97706" stroke-width="2"/>
  <text x="330" y="211" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">x + 1/x = 2  gives  x² - 2x + 1 = (x - 1)²</text>
  <text x="330" y="250" font-size="12" font-weight="800" fill="#dc2626" text-anchor="middle">x = 1, six-fold — the sextic is (x - 1)⁶</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 8.6                                                           */
/* ------------------------------------------------------------------ */

const lesson86: Lesson = {
  id: 'aa-reciprocal-equations',
  number: '8.6',
  title: 'Reciprocal Equations',
  concepts: [
    'palindromic (reciprocal) coefficients',
    'the substitution t = x + 1/x',
    'the t-ladder: x² + 1/x² = t² − 2 and beyond',
    'even degree: the quadratic-in-t reduction',
    'odd degree: the guaranteed root',
    'anti-palindromic equations',
    'roots in reciprocal pairs',
    'the GP-root and roots-of-unity cross-refs',
  ],
  objectives: [
    'Recognise palindromic (reciprocal) and anti-palindromic coefficient structure on sight — read the row backwards and forwards — and say immediately which guaranteed root an odd degree carries.',
    'Execute the t-reduction for even degrees: divide by the middle power, pair the mirrored terms, substitute $t = x + \\tfrac{1}{x}$, and collapse a degree-$2n$ equation to degree $n$ — the quartic to a quadratic in $t$, the sextic to a cubic in $t$.',
    'Handle odd degrees by the guaranteed-root laws: prove that every odd palindromic equation has $x = -1$ as a root and every odd anti-palindromic equation has $x = 1$, then reduce and finish.',
    'Use the t-ladder fluently: $x^2 + \\tfrac{1}{x^2} = t^2 - 2$, $x^3 + \\tfrac{1}{x^3} = t^3 - 3t$, $x^4 + \\tfrac{1}{x^4} = t^4 - 4t^2 + 2$ — and generate further rungs by the recurrence $L_n = tL_{n-1} - L_{n-2}$.',
    'Prove the reciprocal-pair law — the roots of a palindromic equation come in pairs $r, \\tfrac{1}{r}$ — and read the total product $\\sigma_n = 1$ as 8.3\'s Viète certificate of it.',
    'Connect the structure to its neighbours: the roots of unity of chapter 3 (the quintic $x^5 + x^4 + x^3 + x^2 + x + 1 = 0$ is the sixth roots of unity except $1$; $x^4 + 1 = 0$ runs the eighth roots), and the GP-root cubics of lesson 8.3 ($\\sigma_2^3 = \\sigma_1^3 \\sigma_3$).',
    'Apply the return trip honestly: solve $x^2 - tx + 1 = 0$ for EACH root $t$, never forgetting that one $t$ buys two $x$\'s, and use the reality gate $|t| \\geq 2$ to census real against non-real roots before computing anything.',
  ],
  prerequisites: ['aa-transformation-of-equations', 'aa-cubics-and-quartics-the-symmetric-functions'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Read the equation $x^4 + 7x^3 + 14x^2 + 7x + 1 = 0$ once forwards, then once backwards — not the equation, the COEFFICIENT ROW. Forwards: $1, 7, 14, 7, 1$. Backwards: $1, 7, 14, 7, 1$. The same row. The coefficient list is a palindrome, exactly like the word that reads the same in both directions, and an equation with this symmetry is called a **reciprocal equation** — the classic name — or a **palindromic equation**. The name "reciprocal" announces the payoff before any algebra happens: chapter 8 has spent five lessons teaching how to interrogate a polynomial through its roots, and this lesson meets the class of equations whose roots are bound together in pairs $r, \\tfrac{1}{r}$ — reciprocals of one another. The symmetry is not decoration; it is a machine, and the machine has one stunning output: it HALVES the degree.' },
    { kind: 'para', text: 'Halving the degree is this chapter\'s most economical trick. A degree-four equation normally demands Ferrari\'s resolvent machinery of lesson 8.4 — an honest but heavy climb. A degree-six equation is, in general, out of reach of elementary algebra altogether. Yet a palindromic quartic falls to ONE quadratic, and a palindromic sextic to ONE cubic, by a two-move ritual: divide by the middle power of $x$, then pair each term with its mirror image across the middle. The pairing manufactures the combination $x + \\tfrac{1}{x}$ everywhere at once, and the substitution $t = x + \\tfrac{1}{x}$ — the single substitution this whole lesson runs on — collapses degree $2n$ into degree $n$. The odd degrees are even kinder: they carry a guaranteed root ($x = -1$ palindromic, $x = 1$ anti-palindromic) that peels off before any substitution begins, which is why an odd palindromic quintic never needs the general theory of the quintic — the one that does not exist.' },
    { kind: 'para', text: 'Two earlier chapters are load-bearing here, and both were banked for exactly this moment. Lesson 8.5\'s transformation craft included the INVERSION of roots: the equation with roots $\\tfrac{1}{r_i}$ is read off $x^n P\\!\\left(\\tfrac{1}{x}\\right)$, whose coefficient row is the original row reversed — so a palindromic equation is precisely one that equals its own inverted transform. That is the deep reason the substitution works, and the derivation below leans on it. Lesson 8.3\'s Viète staircase supplies the reads at the far end: the product of all the roots, the sum, and the pairwise products of a quartic in reciprocal pairs become one-line statements, and the GP-root condition $\\sigma_2^3 = \\sigma_1^3\\sigma_3$ returns as the cubic face of the same structure. Chapter 3\'s roots of unity wait at the exit: the prettiest reciprocal equation in the elementary canon — $x^5 + x^4 + x^3 + x^2 + x + 1 = 0$ — will resolve into exactly the sixth roots of unity except $1$, by pure palindrome mechanics. This is the chapter\'s closer: everything the theory of equations has built, cashed on one symmetry.' },
    { kind: 'figure', caption: 'The palindrome mirror. The coefficient row of $x^4 + 7x^3 + 14x^2 + 7x + 1$ drawn as five chips over their powers: $1, 7, 14, 7, 1$ — read left-to-right or right-to-left, the same row. The brackets mark the mirror pairs ($a_4 = a_0$, the outer pair; $a_3 = a_1$, the inner pair; the middle coefficient $a_2$ pairs with itself). Below, the whole method in one panel: dividing by the middle power $x^2$ leaves $\\left(x^2 + \\tfrac{1}{x^2}\\right) + 7\\left(x + \\tfrac{1}{x}\\right) + 14 = 0$, and the substitution $t = x + \\tfrac{1}{x}$ with $x^2 + \\tfrac{1}{x^2} = t^2 - 2$ collapses the quartic to the quadratic $t^2 + 7t + 12 = 0$ — degree four becomes degree two.', svg: palindromeMirror86Svg() },

    { kind: 'callout', tone: 'definition', title: 'Reciprocal (palindromic) equations', text: 'A polynomial equation $a_0x^n + a_1x^{n-1} + \\cdots + a_{n-1}x + a_n = 0$ is **palindromic** (a reciprocal equation) when the coefficient row reads the same in both directions: $a_k = a_{n-k}$ for every $k$. It is **anti-palindromic** when the row reads as its own negation: $a_k = -a_{n-k}$ for every $k$ (which forces the middle coefficient of an even degree to be $0$). Both families are taken with $a_0 \\neq 0$, so $a_n = \\pm a_0 \\neq 0$ and $x = 0$ is never a root — the division moves below are always legal.' },
    { kind: 'para', text: 'Thus, in symbols, the palindromic law is $a_k = a_{n-k}$ for $k = 0, 1, \\ldots, n$ — one condition, but it ties every coefficient to its mirror partner and leaves nothing free except the first half of the row. For example:' },
    { kind: 'list', marker: 'roman', items: [
      '**(i) the quartic:** $x^4 + ax^3 + bx^2 + ax + 1 = 0$ — the row $1, a, b, a, 1$, three free parameters;',
      '**(ii) the cubic:** $x^3 + ax^2 + ax + 1 = 0$ — the row $1, a, a, 1$, two free parameters and a guaranteed root riding the odd degree;',
      '**(iii) the sextic:** $x^6 + ax^5 + bx^4 + cx^3 + bx^2 + ax + 1 = 0$ — the row $1, a, b, c, b, a, 1$, four free parameters; the binomial row $(x - 1)^6$ is the special seat $a = -6, b = 15, c = -20$;',
      '**(iv) the anti-quartet:** $x^3 + ax^2 - ax - 1 = 0$ — the row $1, a, -a, -1$, the anti-palindromic mirror with its own guaranteed root $x = 1$.',
    ] },
    { kind: 'terms', items: [
      { term: 'Reciprocal (palindromic) equation', def: 'an equation whose coefficient row reads the same in both directions — $a_k = a_{n-k}$; equivalently, the equation left unchanged by lesson 8.5\'s inversion transform $x^n P(1/x)$.' },
      { term: 'Anti-palindromic equation', def: 'an equation whose coefficient row is its own negation — $a_k = -a_{n-k}$; the middle coefficient of an even degree is forced to $0$, and the whole equation changes sign under the inversion transform.' },
      { term: 'The substitution', def: 'the change of variable $t = x + \\tfrac{1}{x}$ — the combination the palindromic pairing manufactures; every mirrored power pair $x^k + \\tfrac{1}{x^k}$ becomes a polynomial in $t$.' },
      { term: 'The t-ladder', def: 'the identities $x^2 + \\tfrac{1}{x^2} = t^2 - 2$, $x^3 + \\tfrac{1}{x^3} = t^3 - 3t$, $x^4 + \\tfrac{1}{x^4} = t^4 - 4t^2 + 2$ — and the recurrence $L_n = tL_{n-1} - L_{n-2}$ that generates every higher rung.' },
      { term: 'The return quadratic', def: 'the recovery step $x^2 - tx + 1 = 0$ — each root $t$ of the reduced equation buys exactly two roots $x$ of the original (a double root when $t = \\pm 2$).' },
      { term: 'Reciprocal pair', def: 'two roots $r$ and $\\tfrac{1}{r}$ with product exactly $1$; the palindromic law forces the whole root list into such pairs, plus the self-paired roots $\\pm 1$.' },
      { term: 'The guaranteed root', def: 'the free root every odd degree carries before any substitution: $x = -1$ for palindromic rows, $x = 1$ for anti-palindromic rows.' },
      { term: 'The middle power', def: 'the division point of the reduction — divide by $x^{n/2}$ for even degree $n$ (by $x^2$ for the quartic, $x^3$ for the sextic) so the mirrored terms stand at equal distances from the middle.' },
    ] },

    { kind: 'heading', text: 'The Palindromic Structure and the Substitution' },
    { kind: 'para', text: 'Before dividing anything by anything, one piece of bookkeeping must be said out loud, because it is the legal foundation of every move this lesson makes: **$x = 0$ is never a root of a reciprocal equation.** A palindromic row has $a_n = a_0 \\neq 0$ (an anti-palindromic row has $a_n = -a_0 \\neq 0$) — the constant term is nonzero — so plugging in $x = 0$ returns $a_n \\neq 0$, never zero. Dividing the equation by $x$ or $x^2$ or $x^3$ therefore LOSES no root, and every transformation below is an honest equivalence, not the loss-of-root hazard lesson 8.5\'s annex warned about. That caution — "never divide by something that might be zero" — is discharged once, here, in one sentence, and then the dividing can begin.' },
    { kind: 'para', text: 'Now the two-move ritual on the palindromic quartic $x^4 + ax^3 + bx^2 + ax + 1 = 0$. **Move one: divide by the middle power.** The middle power of a quartic is $x^2$, and the division yields $x^2 + ax + b + \\tfrac{a}{x} + \\tfrac{1}{x^2} = 0$. **Move two: pair the mirrors.** The term $x^2$ pairs with $\\tfrac{1}{x^2}$; the term $ax$ pairs with $\\tfrac{a}{x}$; and the regrouped equation is' },
    { kind: 'equation', latex: '\\left(x^2 + \\tfrac{1}{x^2}\\right) + a\\left(x + \\tfrac{1}{x}\\right) + b = 0 \\tag{1}', note: 'the palindromic quartic after division by the middle power $x^2$ — every power of $x$ appears only through the two combinations $x^2 + \\tfrac{1}{x^2}$ and $x + \\tfrac{1}{x}$.' },
    { kind: 'derivation', title: 'Theorem: the even palindromic quartic collapses to a quadratic in t', statement: 'The palindromic quartic $x^4 + ax^3 + bx^2 + ax + 1 = 0$ is equivalent, after division by $x^2$ and the substitution $t = x + \\tfrac{1}{x}$, to the quadratic $t^2 + at + (b - 2) = 0$; each of its two roots $t$ returns exactly two roots $x$ of the quartic through $x^2 - tx + 1 = 0$.', steps: [
      { label: 'Divide by the middle power', formula: 'x^2 + ax + b + \\tfrac{a}{x} + \\tfrac{1}{x^2} = 0', explanation: 'Legal because $x = 0$ is never a root (the constant term is $1$); now the mirrored terms sit at equal distances from the middle.' },
      { label: 'Pair the mirrors', formula: '\\left(x^2 + \\tfrac{1}{x^2}\\right) + a\\left(x + \\tfrac{1}{x}\\right) + b = 0', explanation: 'The palindromic law $a_4 = a_0$, $a_3 = a_1$ is what makes the SAME coefficient sit on both mirrors — the pairing is the symmetry, cashed.' },
      { label: 'Substitute t = x + 1/x and square it', formula: 't^2 = \\left(x + \\tfrac{1}{x}\\right)^2 = x^2 + 2 + \\tfrac{1}{x^2} \\;\\Longrightarrow\\; x^2 + \\tfrac{1}{x^2} = t^2 - 2', explanation: 'The first rung of the t-ladder, derived on the spot: the cross term $2$ moves across, and the mirrored pair becomes a polynomial in $t$.' },
      { label: 'The collapse', formula: '(t^2 - 2) + at + b = 0 \\quad\\Longleftrightarrow\\quad t^2 + at + (b - 2) = 0', explanation: 'Degree four in $x$ has become degree two in $t$ — the $-2$ is the ladder rung\'s cross term arriving as the constant shift.' },
      { label: 'The return trip', formula: 'x^2 - tx + 1 = 0', explanation: 'Each root $t$ of the quadratic returns two roots $x$ by solving this recovery quadratic — whose own constant term $1$ forces the two $x$\'s to multiply to exactly $1$: the reciprocal pair, visible in the algebra before any root is computed.' },
    ], result: '$x^4 + ax^3 + bx^2 + ax + 1 = 0 \\Longleftrightarrow t^2 + at + (b - 2) = 0$ with $t = x + \\tfrac{1}{x}$ — then $x^2 - tx + 1 = 0$ per root $t$: a quartic bought for the price of two quadratics.' },
    { kind: 'equation', latex: 't^2 + at + (b - 2) = 0, \\qquad x^2 - tx + 1 = 0 \\tag{2}', note: 'the reduced equation and the return quadratic — the whole method for every palindromic quartic; the discriminant of the return quadratic is $t^2 - 4$, so its two roots are real exactly when $|t| \\geq 2$.' },
    { kind: 'callout', tone: 'insight', title: 'The palindrome is 8.5\'s inversion law wearing symmetry', text: 'Why does the substitution work at all? Run lesson 8.5\'s inversion transform on a palindromic equation: the equation with inverted roots is read off $x^nP\\!\\left(\\tfrac{1}{x}\\right) = a_0 + a_1x + \\cdots + a_nx^n$ — the original coefficient row REVERSED. A palindromic row is its own reversal, so the equation is literally unchanged by inverting every root: root list in, inverted root list out, same equation. An equation invariant under a transformation that acts freely on its roots must carry the roots in orbits — and the orbits of inversion are exactly the pairs $\\{r, \\tfrac{1}{r}\\}$ (with $\\pm 1$ as the self-paired fixed points). The reciprocal-pair structure is not a lucky observation; it is the palindromic law seen through 8.5\'s transformation glasses, and the substitution $t = x + \\tfrac{1}{x}$ is nothing but the invariant of that action — the quantity unchanged when $x$ is swapped with $\\tfrac{1}{x}$. Halving the degree is halving the orbits. The classic treatments — Hall & Knight\'s among them — taught the reduction as a memorised ritual; the transformation view explains WHY the ritual cannot fail.' },
    { kind: 'callout', tone: 'warn', title: 'Three traps on the palindromic road', text: '**Trap 1 — solving for $t$ and forgetting to return.** The reduced equation\'s roots are values of $t = x + \\tfrac{1}{x}$, NOT of $x$. The answer to "solve $x^4 + 7x^3 + 14x^2 + 7x + 1 = 0$" is not "$t = -3, -4$" — each $t$ still owes you the quadratic $x^2 - tx + 1 = 0$. A quartic has FOUR roots, and two values of $t$ pay for all four only through the return trip. **Trap 2 — dividing by $x^2$ silently.** The division is legal ONLY because $x = 0$ is never a root of a reciprocal equation (nonzero constant term). State it once, as this lesson does, and the move is honest; skip the statement on an examination and the solution has a hole an examiner will find. **Trap 3 — trusting the palindrome test halfway.** A row like $1, 7, 14, 8, 1$ is NOT palindromic (the mirror of $7$ is $1$, not $8$), and running the ritual on it produces garbage dressed as algebra. Check the FULL row both ways before dividing anything.' },

    { kind: 'heading', text: 'Even Degrees — the Reduction' },
    { kind: 'para', text: 'The reduction is best met on a witness chosen so that every number is an integer and every step shows its face: $x^4 + 7x^3 + 14x^2 + 7x + 1 = 0$ — the row $1, 7, 14, 7, 1$ of the mirror figure. The engine has verified every claim below by literal expansion and by evaluating the quartic at all four roots; watch how little work the symmetry leaves.' },
    { kind: 'example', title: 'Solve the reciprocal equation $x^4 + 7x^3 + 14x^2 + 7x + 1 = 0$ completely, exhibiting the reciprocal pairs.', steps: [
      'Check the row: $1, 7, 14, 7, 1$ reads the same both ways — palindromic, constant term $1$, so $x = 0$ is not a root and the division is legal.',
      'Divide by the middle power $x^2$: $x^2 + 7x + 14 + \\tfrac{7}{x} + \\tfrac{1}{x^2} = 0$, i.e. $\\left(x^2 + \\tfrac{1}{x^2}\\right) + 7\\left(x + \\tfrac{1}{x}\\right) + 14 = 0$.',
      'So, substitute $t = x + \\tfrac{1}{x}$ with $x^2 + \\tfrac{1}{x^2} = t^2 - 2$: the equation becomes $t^2 - 2 + 7t + 14 = 0$, i.e. $t^2 + 7t + 12 = 0$.',
      'Now, factor: $t^2 + 7t + 12 = (t + 3)(t + 4) = 0$ — the discriminant $49 - 48 = 1$ was a perfect square, so the $t$-roots are the integers $t = -3$ and $t = -4$.',
      'Return to $x$ through $x^2 - tx + 1 = 0$, once per $t$: $t = -3$ gives $x^2 + 3x + 1 = 0$, so $x = \\tfrac{-3 \\pm \\sqrt{5}}{2}$; $t = -4$ gives $x^2 + 4x + 1 = 0$, so $x = -2 \\pm \\sqrt{3}$.',
      'Hence the four roots are $\\tfrac{-3 \\pm \\sqrt{5}}{2}$ and $-2 \\pm \\sqrt{3}$ — two reciprocal pairs, since $\\left(\\tfrac{-3 + \\sqrt{5}}{2}\\right)\\left(\\tfrac{-3 - \\sqrt{5}}{2}\\right) = \\tfrac{9 - 5}{4} = 1$ and $(-2 + \\sqrt{3})(-2 - \\sqrt{3}) = 4 - 3 = 1$: all four real, the whole quartic bought for one factorisation.',
    ] },
    { kind: 'para', text: 'Pause on what the symmetry actually paid for, because the account is astonishing. A general quartic needs Ferrari\'s resolvent cubic — lesson 8.4 spent a full section building it — and even then the arithmetic is heavy. Here the palindromic law pre-paid the resolvent\'s entire bill: the quartic\'s four roots came from ONE quadratic ($t^2 + 7t + 12$) plus two recovery quadratics, and every factorisation that appeared had integer coefficients and a perfect-square discriminant. And Viète reads the answer\'s structure at a glance, the 8.3 staircase cashed: the product of all four roots is $\\sigma_4 = \\tfrac{1}{1} = 1$ (the constant over the leading coefficient — one times one, the two reciprocal pairs multiplying in), and the sum is $\\sigma_1 = -7$, exactly as the row announces: $\\tfrac{-3 + \\sqrt5}{2} + \\tfrac{-3 - \\sqrt5}{2} + (-2 + \\sqrt3) + (-2 - \\sqrt3) = -3 - 4 = -7$. The figure below draws where those four roots actually live — all four in $(-4, 0)$, hugging the origin in two mirrored pairs.' },
    { kind: 'figure', caption: 'The reciprocal pairs on the number line. The four real roots of $x^4 + 7x^3 + 14x^2 + 7x + 1 = 0$ — $-3.732$, $-2.618$, $-0.382$, $-0.268$ — with an arc joining each pair whose product is exactly $1$: the outer pair $(-3.732)(-0.268) = 1$ and the inner pair $(-2.618)(-0.382) = 1$. Note the geometry the algebra forces: one member of each pair sits inside $(-1, 0)$ and its reciprocal partner sits outside $(-\\infty, -1)$, mirror images across $-1$ on a multiplicative scale — which is exactly what "reciprocal" means on a number line.', svg: reciprocalPairs86Svg() },
    { kind: 'para', text: 'The figure raises the structural question the whole lesson secretly runs on, and it deserves a proof rather than a pattern: WHY do the roots obligingly pair up like this? The answer is the derivation the substitution was born from — run 8.5\'s inversion transform and the pairing falls out as an orbit statement.' },
    { kind: 'derivation', title: 'The reciprocal-pair law: roots come in pairs r and 1 over r', statement: 'If $P(x) = 0$ is a palindromic (or anti-palindromic) equation with nonzero constant term, and $r$ is a root, then $\\tfrac{1}{r}$ is a root too — the root list is a union of reciprocal pairs $\\{r, \\tfrac{1}{r}\\}$, with $\\pm 1$ as the only self-paired possibilities. In particular the product of all roots of an even-degree palindromic equation is $1$.', steps: [
      { label: 'Run the inversion transform', formula: 'Q(x) = x^nP\\!\\left(\\tfrac{1}{x}\\right) = a_0x^n + a_1x^{n-1} + \\cdots + a_n', explanation: 'Lesson 8.5\'s inversion: $Q$ is the equation whose roots are the reciprocals of $P$\'s — its coefficient row is $P$\'s row reversed.' },
      { label: 'The palindromic law collapses it', formula: 'a_k = a_{n-k} \\;\\Longrightarrow\\; Q = \\pm P \\;(\\text{palindromic } +, \\text{ anti } -)', explanation: 'A palindromic row equals its own reversal, so $Q = P$ exactly; an anti-palindromic row equals its own negated reversal, so $Q = -P$ — which has the same roots either way.' },
      { label: 'Evaluate at a reciprocal', formula: 'Q\\!\\left(\\tfrac{1}{r}\\right) = \\tfrac{1}{r^n}\\,P(r) = 0', explanation: 'If $P(r) = 0$ with $r \\neq 0$ (the constant term is nonzero, so no root is zero), then $Q$ vanishes at $\\tfrac{1}{r}$ — and since $Q = \\pm P$, so does $P$: $\\tfrac{1}{r}$ is a root of the ORIGINAL equation.' },
      { label: 'Read the orbits', formula: '\\{r\\} \\mapsto \\left\\{r, \\tfrac{1}{r}\\right\\}, \\qquad \\pm1 \\mapsto \\{\\pm 1\\}', explanation: 'Inversion acts on the root list with orbits of size one or two: the pairs $\\{r, \\tfrac{1}{r}\\}$ and the fixed points $\\pm 1$ (the only numbers equal to their own reciprocals) — the pairing the number line drew.' },
      { label: 'The Viète certificate', formula: '\\prod \\text{roots} = (-1)^n\\tfrac{a_n}{a_0} = 1 \\quad (\\text{even } n, \\text{ palindromic})', explanation: '8.3\'s read closes the loop: with $a_n = a_0$ and $n$ even, the total product is exactly $1$ — which is just the pair law multiplied out over $\\tfrac{n}{2}$ pairs. $\\blacksquare$' },
    ], result: 'Roots come in reciprocal pairs $\\{r, \\tfrac{1}{r}\\}$ — the palindromic law seen through 8.5\'s inversion glasses; the even-degree total product $\\sigma_n = 1$ is the Viète certificate of it.' },
    { kind: 'para', text: 'The next witness mixes its census — and introduces the question every examiner actually asks: how many of the roots are real? Here the structure gives a complete answer BEFORE any root is computed, through the return quadratic\'s discriminant: $x^2 - tx + 1 = 0$ has discriminant $t^2 - 4$, so its two roots are real when $|t| \\geq 2$ and a non-real conjugate pair when $|t| < 2$. Call it the **reality gate**: each $t$-root of the reduced equation walks through the gate either as two real roots or as one conjugate pair, and the census of the whole equation is read off the $t$-roots alone.' },
    { kind: 'example', title: 'Solve $x^4 - 3x^3 + 4x^2 - 3x + 1 = 0$ and give the real/non-real census of its roots.', steps: [
      'Check the row: $1, -3, 4, -3, 1$ — palindromic (the mirrors $1 = 1$ and $-3 = -3$ match), so the ritual applies.',
      'Divide by $x^2$ and pair: $\\left(x^2 + \\tfrac{1}{x^2}\\right) - 3\\left(x + \\tfrac{1}{x}\\right) + 4 = 0$.',
      'So, substitute $t$: $t^2 - 2 - 3t + 4 = 0$, i.e. $t^2 - 3t + 2 = 0$ — discriminant $9 - 8 = 1$, so $t = \\tfrac{3 \\pm 1}{2}$, i.e. $t = 2$ and $t = 1$.',
      'Now, the reality gate: $|2| \\geq 2$ (a real pair) but $|1| < 2$ (a non-real conjugate pair) — the census is settled before the return trip: two real roots and two non-real.',
      'Return: $t = 2$ gives $x^2 - 2x + 1 = (x - 1)^2 = 0$, the DOUBLE root $x = 1$; $t = 1$ gives $x^2 - x + 1 = 0$, so $x = \\tfrac{1 \\pm i\\sqrt{3}}{2}$.',
      'Hence the roots are $1$ (twice) and $\\tfrac{1 \\pm i\\sqrt{3}}{2}$ — census: $2$ real (one value, double) $+ 2$ non-real; and the non-real pair are the primitive SIXTH roots of unity ($z^6 = 1$, $z^3 = -1$), chapter 3\'s De Moivre circle waiting inside the algebra.',
    ] },
    { kind: 'para', text: 'Two sights in that solution deserve a second look. First, the double root: $t = 2$ sits exactly ON the reality gate, where the return quadratic\'s discriminant $t^2 - 4$ vanishes and its two roots merge — and indeed $x + \\tfrac{1}{x} = 2$ forces $x = 1$ twice, the self-paired reciprocal (the only positive number equal to its own reciprocal). Second, the census arithmetic is completely determined by the two $t$-values: a quartic whose reduced quadratic has both roots with $|t| \\geq 2$ carries four real roots (the first witness), one on the gate carries a double real pair, one inside carries a non-real pair — the whole real/non-real question of a palindromic quartic is a question about TWO numbers. The table gathers the chapter\'s quartic exhibits through this one gate.' },
    { kind: 'table', head: ['reciprocal quartic', 'reduced in $t$', '$t$-roots', 'gate verdict', 'census'], rows: [
      ['$x^4 + 7x^3 + 14x^2 + 7x + 1$', '$t^2 + 7t + 12$', '$-3,\\ -4$', 'both $|t| \\geq 2$', '4 real'],
      ['$x^4 - 3x^3 + 4x^2 - 3x + 1$', '$t^2 - 3t + 2$', '$2,\\ 1$', 'one on the gate', '2 real (double $1$) + 2 non-real'],
      ['$x^4 + 5x^3 + 6x^2 + 5x + 1$', '$t^2 + 5t + 4$', '$-4,\\ -1$', 'one outside, one inside', '2 real + 2 non-real'],
      ['$x^4 + x^2 + 1$ (the quintic\'s tail)', '$t^2 - 1$', '$1,\\ -1$', 'both inside', '4 non-real'],
      ['$x^4 + 1$', '$t^2 - 2$', '$\\sqrt{2},\\ -\\sqrt{2}$', 'both inside', '4 non-real'],
    ], caption: 'Every palindromic quartic of this chapter read through the reality gate $|t| \\geq 2$ — the census of a degree-four equation decided by two numbers. (The engine verified each row\'s factorisation, roots and census brute-force; the last two rows are run in full below and in the exercise set.)' },
    { kind: 'para', text: 'The third quartic of the table is left as a worked exercise (L4-1) with its census — the $t$-roots $-4$ and $-1$ already announce "two real, two non-real" through the gate — and the general statement deserves its own line before the odd degrees arrive: EVERY palindromic equation of even degree $2n$ reduces, by division through the middle power $x^n$ and the substitution $t = x + \\tfrac{1}{x}$, to an equation of degree $n$ in $t$.' },
    { kind: 'equation', latex: 'a_0\\left(x^{2n} + 1\\right) + a_1\\left(x^{2n-1} + x\\right) + \\cdots + a_{n-1}\\left(x^{n+1} + x^{n-1}\\right) + a_nx^n = 0 \\tag{3}', note: 'the even-degree palindromic equation, regrouped into mirror pairs — after division by $x^n$, every bracket holds a symmetric combination $x^k + \\tfrac{1}{x^k}$ that the t-ladder turns into a polynomial in $t$ of degree $k$: the degree halves, always.' },
    { kind: 'para', text: 'The proof of the general statement is exercise L6-2, and it is genuinely instructive to write out: pairing the terms as in equation (3) exhibits the mirror brackets $x^k + \\tfrac{1}{x^k}$, and the t-ladder below supplies the polynomial identity that turns each bracket of weight $k$ into a polynomial in $t$ of degree exactly $k$ — so the highest bracket $x^n + \\tfrac{1}{x^n}$ contributes $t^n$ and nothing can cancel it. The reduced equation is honestly degree $n$, each of whose roots returns two $x$\'s: $2n$ roots in $n$ reciprocal pairs, the fundamental theorem\'s full count, delivered at half price.' },
    { kind: 'formula', name: 'The palindromic law', latex: 'a_k = a_{n-k} \\quad (k = 0, 1, \\ldots, n)', note: 'the row reads the same both ways; equivalently the equation is fixed by 8.5\'s inversion transform $x^nP(1/x)$ — which is why its roots come in reciprocal pairs.' },
    { kind: 'formula', name: 'The t-substitution and the return trip', latex: 't = x + \\tfrac{1}{x}; \\qquad x^2 - tx + 1 = 0 \\;\\text{per root } t', note: 'the substitution every palindromic reduction runs on; the return quadratic\'s discriminant $t^2 - 4$ is the reality gate — real pair iff $|t| \\geq 2$, merging at $t = \\pm 2$.' },
    { kind: 'formula', name: 'The quartic reduction', latex: 'x^4 + ax^3 + bx^2 + ax + 1 = 0 \\;\\Longrightarrow\\; t^2 + at + (b - 2) = 0', note: 'witness $a = 7, b = 14$: $t^2 + 7t + 12 = (t+3)(t+4)$, roots $\\tfrac{-3 \\pm \\sqrt5}{2}$ and $-2 \\pm \\sqrt3$ — two reciprocal pairs, four real roots.' },
    { kind: 'formula', name: 'The reciprocal-pair law', latex: 'r \\text{ root} \\Longrightarrow \\tfrac{1}{r}\\text{ root}; \\qquad \\prod_{\\text{all } 2n \\text{ roots}} = 1', note: 'from $x^nP(1/x) = P(x)$; the total product $\\sigma_{2n} = \\tfrac{a_0}{a_0} = 1$ is 8.3\'s Viète read of it — $n$ pairs each multiplying to $1$.' },

    { kind: 'heading', text: 'Odd Degrees — the Guaranteed Root' },
    { kind: 'para', text: 'An odd-degree palindromic row has no middle power to divide through — the powers cannot pair up symmetrically, because one power of $x$ is left stranded when the mirrors try to meet. But the same asymmetry that breaks the ritual HANDS the equation a free root instead: every odd-degree palindromic equation has $x = -1$ as a root, and every odd-degree anti-palindromic equation has $x = 1$ — guaranteed roots, provable in one line each, before any substitution is attempted. The proofs are the derivation below; the intuition is pairing again. In an odd palindromic $x^{2m+1} + \\cdots + 1$, group the terms in mirror pairs $a_k(x^{2m+1-k} + x^k)$ — every bracket is divisible by $(x + 1)$, because $x^p + x^q$ with $p, q$ of opposite parity vanishes at $x = -1$ (odd powers flip sign, even powers do not). Every bracket carries the factor; the product carries it; done.' },
    { kind: 'derivation', title: 'Theorem: the guaranteed root of every odd palindromic and anti-palindromic equation', statement: 'Every palindromic equation of odd degree has $x = -1$ as a root; every anti-palindromic equation of odd degree has $x = 1$ as a root. In particular the palindromic cubic factors as $x^3 + ax^2 + ax + 1 = (x + 1)\\left(x^2 + (a - 1)x + 1\\right)$ and the anti-palindromic cubic as $x^3 + ax^2 - ax - 1 = (x - 1)\\left(x^2 + (a + 1)x + 1\\right)$.', steps: [
      { label: 'Evaluate the palindromic row at x = -1', formula: 'P(-1) = \\sum_{k=0}^{n} a_k\\,(-1)^{n-k} = 0', explanation: 'In an odd palindromic row, $a_k = a_{n-k}$ with $n$ odd means mirror partners sit on powers of OPPOSITE parity, so at $x = -1$ each pair contributes $a_k\\left((-1)^{n-k} + (-1)^k\\right) = a_k \\cdot 0$ — every pair cancels, and $P(-1) = 0$.' },
      { label: 'Evaluate the anti-palindromic row at x = 1', formula: 'P(1) = \\sum a_k = 0', explanation: 'Here $a_k = -a_{n-k}$, so each mirror pair contributes $a_k + a_{n-k} = 0$ to the value at $x = 1$ — the whole sum is zero, and $x = 1$ is a root.' },
      { label: 'Factor the palindromic cubic', formula: 'x^3 + ax^2 + ax + 1 = (x + 1)\\left(x^2 + (a - 1)x + 1\\right)', explanation: 'Divide by the known root: the quotient\'s coefficients recombine as $a - 1$ — expand to check: $(x+1)(x^2 + (a-1)x + 1) = x^3 + ax^2 + ax + 1$ exactly.' },
      { label: 'Factor the anti-palindromic cubic', formula: 'x^3 + ax^2 - ax - 1 = (x - 1)\\left(x^2 + (a + 1)x + 1\\right)', explanation: 'Same division by the guaranteed root $x = 1$; the quotient carries $a + 1$, and the expansion checks: $(x-1)(x^2 + (a+1)x + 1) = x^3 + ax^2 - ax - 1$ exactly.' },
      { label: 'The general odd degree', formula: 'x^{2m+1} + \\cdots + 1 = (x + 1)\\times(\\text{an even-degree palindromic polynomial})', explanation: 'After the guaranteed root is divided off, what REMAINS is palindromic of even degree — the odd case reduces to the even case, and the t-ritual takes over from there. $\\blacksquare$' },
    ], result: 'Odd palindromic $\\Rightarrow x = -1$; odd anti-palindromic $\\Rightarrow x = 1$ — and the remaining factor is even-degree palindromic, so the substitution finishes the job.' },
    { kind: 'formula', name: 'The odd-palindromic factor', latex: 'x^3 + ax^2 + ax + 1 = (x + 1)\\left(x^2 + (a - 1)x + 1\\right)', note: 'the guaranteed root $x = -1$; witness $a = 5$: $x^3 + 5x^2 + 5x + 1 = (x+1)(x^2 + 4x + 1)$, roots $-1, -2 \\pm \\sqrt3$.' },
    { kind: 'formula', name: 'The anti-palindromic factor', latex: 'x^3 + ax^2 - ax - 1 = (x - 1)\\left(x^2 + (a + 1)x + 1\\right)', note: 'the guaranteed root $x = 1$; witness $a = 6$: $x^3 + 6x^2 - 6x - 1 = (x-1)(x^2 + 7x + 1)$, roots $1, \\tfrac{-7 \\pm 3\\sqrt5}{2}$ — again a reciprocal pair.' },
    { kind: 'example', title: 'Solve the palindromic cubic $x^3 + 5x^2 + 5x + 1 = 0$.', steps: [
      'The row $1, 5, 5, 1$ is palindromic of ODD degree — so $x = -1$ is guaranteed: $(-1)^3 + 5(-1)^2 + 5(-1) + 1 = -1 + 5 - 5 + 1 = 0$.',
      'So, divide it off: $x^3 + 5x^2 + 5x + 1 = (x + 1)\\left(x^2 + 4x + 1\\right)$ — the factor law with $a = 5$, checked by expansion.',
      'Now, the quotient is even-degree palindromic: divide by $x$ and substitute $t = x + \\tfrac{1}{x}$ — or simply run the quadratic formula: $x^2 + 4x + 1 = 0$ gives $x = -2 \\pm \\sqrt{3}$.',
      'Hence the three roots are $-1$ and $-2 \\pm \\sqrt{3}$ — the last two a reciprocal pair with product $4 - 3 = 1$, and the product of all three is $-1$, matching Viète\'s $\\sigma_3 = -\\tfrac{1}{1} = -1$: the read confirms the census.',
    ] },
    { kind: 'example', title: 'Solve the anti-palindromic cubic $x^3 + 6x^2 - 6x - 1 = 0$.', steps: [
      'The row $1, 6, -6, -1$ satisfies $a_k = -a_{n-k}$ ($1 = -(-1)$, $6 = -(-6)$) — anti-palindromic of odd degree, so $x = 1$ is guaranteed: $1 + 6 - 6 - 1 = 0$.',
      'So, divide it off: $x^3 + 6x^2 - 6x - 1 = (x - 1)\\left(x^2 + 7x + 1\\right)$ — the anti factor law with $a = 6$, checked by expansion.',
      'Now, the quadratic formula on the quotient: $x^2 + 7x + 1 = 0$ gives $x = \\tfrac{-7 \\pm \\sqrt{45}}{2} = \\tfrac{-7 \\pm 3\\sqrt{5}}{2} \\approx -0.146$ and $-6.854$.',
      'Hence the three roots are $1,\\ \\tfrac{-7 \\pm 3\\sqrt{5}}{2}$ — and the two surds multiply to $\\tfrac{49 - 45}{4} = 1$: a reciprocal pair again, as the constant term $1$ of the quotient demanded. Anti-palindromic or palindromic, the ROOTS still pair reciprocally — the inversion orbits are indifferent to the overall sign of the row.',
    ] },
    { kind: 'para', text: 'One honest footnote closes the odd-degree story: the anti-palindromic family is the palindromic family\'s SIBLING, not its synonym. Under lesson 8.5\'s inversion transform, a palindromic equation satisfies $x^nP\\!\\left(\\tfrac{1}{x}\\right) = +P(x)$ and an anti-palindromic one satisfies $x^nP\\!\\left(\\tfrac{1}{x}\\right) = -P(x)$ — the same invariance, up to an overall sign. That sign is powerless against the ROOT pairing: evaluating either identity at $x = \\tfrac{1}{r}$ (with $P(r) = 0$ and $r \\neq 0$) gives $0 = \\pm P\\!\\left(\\tfrac{1}{r}\\right)$, so anti-palindromic equations carry reciprocal pairs exactly as palindromic ones do — the illustration above witnessed it, its surd pair multiplying to $1$. But the sign DOES steer the guaranteed roots: the $+$ row pins odd degrees at $x = -1$, the $-$ row at $x = 1$, and the even-degree anti case carries BOTH $\\pm 1$ at once — $x^2 - 1$ divides out, and indeed every even anti-palindromic equation of degree $2n$ factors as $(x^2 - 1)$ times a palindromic equation of degree $2n - 2$ (the middle coefficient is forced to $0$, since $a_k = -a_k$ admits only $0$ there). The witness: $x^4 + 2x^3 - 2x - 1 = (x^2 - 1)(x + 1)^2 = (x - 1)(x + 1)^3$, both guaranteed roots on display with $x = -1$ tripled. The engine section verified all of this brute-force; the odd cases remain the workhorse shapes, and exercise L5-1 proves both laws with fresh witnesses.' },
    { kind: 'list', marker: 'roman', items: [
      '**(i) odd palindromic:** guaranteed $x = -1$, quotient $x^2 + (a-1)x + 1$ — the remaining pair reciprocally bound;',
      '**(ii) odd anti-palindromic:** guaranteed $x = 1$, quotient $x^2 + (a+1)x + 1$ — the pair bound all the same;',
      '**(iii) even anti-palindromic:** BOTH $\\pm 1$ guaranteed, $x^2 - 1$ divides out, middle coefficient forced to $0$.',
    ] },

    { kind: 'heading', text: 'The t-Ladder and the Sextic' },
    { kind: 'para', text: 'The reduction of a quartic needed only the first rung of a longer ladder — the identity turning $x^2 + \\tfrac{1}{x^2}$ into $t^2 - 2$. Higher even degrees need the higher rungs, and the ladder deserves to be built once, carefully, because it also powers the pure-read questions examiners love ("given $x + \\tfrac{1}{x} = 3$, find $x^4 + \\tfrac{1}{x^4}$") — the same ladder, asked to stand alone.' },
    { kind: 'derivation', title: 'The t-ladder: every mirrored power pair is a polynomial in t', statement: 'For $t = x + \\tfrac{1}{x}$: $x^2 + \\tfrac{1}{x^2} = t^2 - 2$, then $x^3 + \\tfrac{1}{x^3} = t^3 - 3t$ and $x^4 + \\tfrac{1}{x^4} = t^4 - 4t^2 + 2$ — and every higher rung follows from the recurrence $L_n = tL_{n-1} - L_{n-2}$.', steps: [
      { label: 'Square the substitution', formula: 't^2 = \\left(x + \\tfrac{1}{x}\\right)^2 = x^2 + 2 + \\tfrac{1}{x^2}', explanation: 'Move the cross term across: $x^2 + \\tfrac{1}{x^2} = t^2 - 2$ — rung two, the engine of every quartic reduction.' },
      { label: 'Multiply rung two by the substitution', formula: '(t^2 - 2) \\cdot t = \\left(x^2 + \\tfrac{1}{x^2}\\right)\\left(x + \\tfrac{1}{x}\\right) = x^3 + x + \\tfrac{1}{x} + \\tfrac{1}{x^3}', explanation: 'The cross terms are exactly the substitution again: $x^3 + \\tfrac{1}{x^3} = t^3 - 2t - t = t^3 - 3t$ — rung three.' },
      { label: 'Square rung two', formula: '\\left(x^2 + \\tfrac{1}{x^2}\\right)^2 = x^4 + 2 + \\tfrac{1}{x^4} = (t^2 - 2)^2', explanation: 'So $x^4 + \\tfrac{1}{x^4} = t^4 - 4t^2 + 4 - 2 = t^4 - 4t^2 + 2$ — rung four, the sextic\'s workhorse below.' },
      { label: 'The recurrence', formula: 'L_n = t\\,L_{n-1} - L_{n-2}, \\qquad L_0 = 2,\\ L_1 = t', explanation: 'Because $\\left(x^{n-1} + \\tfrac{1}{x^{n-1}}\\right)\\left(x + \\tfrac{1}{x}\\right) = L_n + L_{n-2}$ — multiply and regroup; the recurrence is the induction engine, and $L_5 = t^5 - 5t^3 + 5t$ rides it next.' },
    ], result: 'The ladder $L_2 = t^2 - 2$, $L_3 = t^3 - 3t$, $L_4 = t^4 - 4t^2 + 2$ — every rung a polynomial in $t$ of the same degree, generated forever by $L_n = tL_{n-1} - L_{n-2}$.' },
    { kind: 'equation', latex: 'x^2 + \\tfrac{1}{x^2} = t^2 - 2, \\qquad x^3 + \\tfrac{1}{x^3} = t^3 - 3t, \\qquad x^4 + \\tfrac{1}{x^4} = t^4 - 4t^2 + 2 \\tag{4}', note: 'the t-ladder\'s first three rungs — every one engine-verified numerically at eight values of $x$, and the recurrence $L_n = tL_{n-1} - L_{n-2}$ (with $L_5 = t^5 - 5t^3 + 5t$) extends it without limit.' },
    { kind: 'formula', name: 'The t-ladder (with its recurrence)', latex: 'L_2 = t^2 - 2,\\; L_3 = t^3 - 3t,\\; L_4 = t^4 - 4t^2 + 2; \\qquad L_n = tL_{n-1} - L_{n-2}', note: 'at the pinned $t = 3$: the rungs read $7, 18, 47$ — and at $t = 4$, rung two reads $14$; the recurrence generates $L_5 = t^5 - 5t^3 + 5t$ and beyond.' },
    { kind: 'example', title: 'Given $x + \\tfrac{1}{x} = 3$, evaluate $x^2 + \\tfrac{1}{x^2}$, $x^3 + \\tfrac{1}{x^3}$ and $x^4 + \\tfrac{1}{x^4}$.', steps: [
      'No equation is being solved — the ladder stands alone: with $t = x + \\tfrac{1}{x} = 3$, each mirrored power pair is a polynomial in $t$.',
      'Rung two: $x^2 + \\tfrac{1}{x^2} = t^2 - 2 = 9 - 2 = 7$.',
      'So, rung three: $x^3 + \\tfrac{1}{x^3} = t^3 - 3t = 27 - 9 = 18$.',
      'Now, rung four: $x^4 + \\tfrac{1}{x^4} = t^4 - 4t^2 + 2 = 81 - 36 + 2 = 47$.',
      'Hence $7,\\ 18,\\ 47$ — and a consistency check closes the loop: $x$ itself would solve $x^2 - 3x + 1 = 0$ (the return quadratic at $t = 3$), whose roots $\\tfrac{3 \\pm \\sqrt{5}}{2}$ multiply to $1$; the engine evaluates $x^2 + \\tfrac{1}{x^2}$ at $\\tfrac{3 + \\sqrt{5}}{2}$ and lands on exactly $7$.',
    ] },
    { kind: 'figure', caption: 'The t-ladder as a staircase at the pinned value $t = 3$: the substitution itself ($3$), rung two ($7 = t^2 - 2$), rung three ($18 = t^3 - 3t$), rung four ($47 = t^4 - 4t^2 + 2$) — bar heights drawn proportional to the values, a dashed thread through the climb. Each rung is a polynomial in $t$ of the same degree as the power pair it replaces; this is the ladder the sextic reduction and the read-questions ride.', svg: tLadder86Svg() },
    { kind: 'para', text: 'Now the ladder\'s heavyweight application — the palindromic SEXTIC, where a degree-six equation (normally beyond every elementary method) collapses to a cubic. And the witness is not contrived: it is the binomial row itself. Expand $(x - 1)^6$ and the coefficients come out $1, -6, 15, -20, 15, -6, 1$ — palindromic, because chapter 7\'s Pascal symmetry $\\binom{6}{k} = \\binom{6}{6-k}$ pairs every coefficient with its equal. The binomial rows are ALL palindromic at even degree, which makes $(x-1)^6$ the honest test of the machinery: the equation $x^6 - 6x^5 + 15x^4 - 20x^3 + 15x^2 - 6x + 1 = 0$ must, by pure palindrome mechanics, resolve to $x = 1$ six-fold. Watching it happen through the $t$-route is the best one-page demonstration the theory of equations offers that structure does the work.' },
    { kind: 'equation', latex: 'x^6 - 6x^5 + 15x^4 - 20x^3 + 15x^2 - 6x + 1 = 0 \\;\\xrightarrow{\\div x^3}\\; \\left(x^3 + \\tfrac{1}{x^3}\\right) - 6\\left(x^2 + \\tfrac{1}{x^2}\\right) + 15\\left(x + \\tfrac{1}{x}\\right) - 20 = 0 \\tag{5}', note: 'the sextic divided by its middle power $x^3$ — three mirror brackets plus the stranded middle term $-20$; the ladder now replaces each bracket.' },
    { kind: 'example', title: 'Solve $x^6 - 6x^5 + 15x^4 - 20x^3 + 15x^2 - 6x + 1 = 0$ by the reciprocal route, showing every step.', steps: [
      'The row $1, -6, 15, -20, 15, -6, 1$ is palindromic — Pascal\'s symmetry $\\binom{6}{k} = \\binom{6}{6-k}$ built it that way — so the even-degree ritual applies with middle power $x^3$.',
      'Divide by $x^3$ and pair the mirrors: $\\left(x^3 + \\tfrac{1}{x^3}\\right) - 6\\left(x^2 + \\tfrac{1}{x^2}\\right) + 15\\left(x + \\tfrac{1}{x}\\right) - 20 = 0$.',
      'So, climb the ladder rung by rung: $x^3 + \\tfrac{1}{x^3} = t^3 - 3t$ and $x^2 + \\tfrac{1}{x^2} = t^2 - 2$, giving $(t^3 - 3t) - 6(t^2 - 2) + 15t - 20 = 0$.',
      'Now, collect: $t^3 - 6t^2 + (-3 + 15 + 12)t + (12 - 20) = t^3 - 6t^2 + 12t - 8 = 0$ — a cubic in $t$, degree six halved to degree three.',
      'Factor the cubic: $t^3 - 6t^2 + 12t - 8 = (t - 2)^3 = 0$ — the binomial row again, at one degree lower: $t = 2$ is a TRIPLE root.',
      'Return per root: $t = 2$ (three times) gives $x^2 - 2x + 1 = (x - 1)^2 = 0$ (three times), so $x = 1$ with total multiplicity $2 \\times 3 = 6$.',
      'Hence $x = 1$, six-fold — exactly the six-fold root $(x-1)^6$ announced at the outset: the palindrome route recovered the binomial expansion\'s own answer without ever expanding it. The engine verified the whole walk: the division identity, the ladder substitution $t^3 - 6t^2 + 12t - 8$, the triple root, and the vanishing of the sextic\'s first five derivatives at $x = 1$ (with the sixth equal to $6! = 720$, certifying multiplicity exactly six).',
    ] },
    { kind: 'formula', name: 'The sextic reduction (the binomial-row exhibit)', latex: 'x^6 + ax^5 + bx^4 + cx^3 + bx^2 + ax + 1 = 0 \\;\\xrightarrow{\\div x^3}\\; \\text{a cubic in } t', note: 'witness $(x-1)^6$: the cubic $t^3 - 6t^2 + 12t - 8 = (t-2)^3$ — triple $t = 2$, return quadratic $(x-1)^2$, verdict $x = 1$ six-fold.' },
    { kind: 'para', text: 'The roots of unity were already knocking. The witness\'s triple $t = 2$ sat ON the reality gate — and every non-real census row of the quartic table happened when $t$ landed strictly inside $(-2, 2)$, where the return quadratic\'s roots $\\tfrac{t \\pm i\\sqrt{4 - t^2}}{2}$ have modulus $1$: complex roots ON the unit circle. That is no accident of these witnesses — it is the arithmetic fact behind the cross-references this lesson exists to cash, and the classic exhibits below close them all.' },
    { kind: 'example', title: 'Solve $x^5 + x^4 + x^3 + x^2 + x + 1 = 0$ by the odd-degree route, and identify the five roots as roots of unity.', steps: [
      'The row $1, 1, 1, 1, 1, 1$ is palindromic of ODD degree — guaranteed root $x = -1$: $-1 + 1 - 1 + 1 - 1 + 1 = 0$.',
      'So, divide it off: $x^5 + x^4 + x^3 + x^2 + x + 1 = (x + 1)(x^4 + x^2 + 1)$ — checked by expansion: the six terms reappear exactly.',
      'Now, the quartic tail is palindromic EVEN: divide by $x^2$ and pair — $\\left(x^2 + \\tfrac{1}{x^2}\\right) + 1 = 0$, so $t^2 - 2 + 1 = t^2 - 1 = 0$ and $t = \\pm 1$.',
      'Return: $t = -1$ gives $x^2 + x + 1 = 0$, roots $\\tfrac{-1 \\pm i\\sqrt{3}}{2}$; $t = 1$ gives $x^2 - x + 1 = 0$, roots $\\tfrac{1 \\pm i\\sqrt{3}}{2}$.',
      'Hence the five roots: $-1,\\ \\tfrac{-1 \\pm i\\sqrt{3}}{2},\\ \\tfrac{1 \\pm i\\sqrt{3}}{2}$ — and chapter 3\'s De Moivre circle names them: powering each root gives $z^6 = 1$ with $z \\neq 1$, so the five are EXACTLY the sixth roots of unity other than $1$, the equation being $\\tfrac{x^6 - 1}{x - 1} = 0$ all along. The engine verified every step: the factorisation chain $(x+1)(x^2 + x + 1)(x^2 - x + 1)$, each root by complex evaluation, and each root\'s sixth power equal to $1$.',
    ] },
    { kind: 'equation', latex: 'x^5 + x^4 + x^3 + x^2 + x + 1 = (x + 1)\\left(x^2 + x + 1\\right)\\left(x^2 - x + 1\\right) = \\frac{x^6 - 1}{x - 1} \\tag{6}', note: 'the quintic of the unit circle: guaranteed root $-1$, then two palindromic quadratics whose $t$-values $\\mp 1$ sit inside the reality gate — four non-real roots of modulus $1$, the primitive cube and sixth roots of unity.' },
    { kind: 'para', text: 'One more classic must be shown, because it is the purest possible reciprocal equation and the standard examination shape: $x^4 + 1 = 0$ — the empty palindrome, every middle coefficient zero. Divide by $x^2$: $x^2 + \\tfrac{1}{x^2} = 0$, so $t^2 - 2 = 0$ and $t = \\pm\\sqrt{2}$ — both strictly inside the reality gate, so four non-real roots are guaranteed before any arithmetic. The return quadratics $x^2 \\mp \\sqrt{2}x + 1 = 0$ deliver $x = \\tfrac{\\pm\\sqrt{2} \\pm i\\sqrt{2}}{2} = \\tfrac{\\pm 1 \\pm i}{\\sqrt{2}}$ — and each of these four satisfies $z^8 = 1$ (engine-verified by powering: $\\left(\\tfrac{1 + i}{\\sqrt{2}}\\right)^4 = -1$ exactly), with modulus $1$: the primitive EIGHTH roots of unity, the vertices of chapter 3\'s regular octagon at the odd eighth-turns. The full solve rides exercise L5-3; the census is $0$ real $+\\ 4$ non-real, both rows of the table now discharged.' },
    { kind: 'formula', name: 'The roots-of-unity cross-refs', latex: 'x^5 + \\cdots + x + 1 = \\frac{x^6 - 1}{x - 1}; \\qquad x^4 + 1 = \\frac{x^8 - 1}{x^4 - 1}\\text{\'s odd part}', note: 'the quintic carries the sixth roots of unity except $1$ ($t$-values $\\pm 1$); $x^4 + 1 = 0$ carries the primitive eighth roots ($t = \\pm\\sqrt{2}$) — every non-real reciprocal root has modulus $1$, which is exactly what $|t| < 2$ forces.' },
    { kind: 'para', text: 'And the cubic face of the reciprocal structure closes the cross-reference set. Lesson 8.3 met the cubic whose roots are in GEOMETRIC progression — the witness $x^3 - 7x^2 + 14x - 8 = 0$ with roots $1, 2, 4$ — and asked when a cubic\'s roots can be in GP at all. The reciprocal view answers: the three roots $\\beta r^{-1}, \\beta, \\beta r$ pair into a structure whose Viète reads collapse onto one condition. Writing $\\sigma_1, \\sigma_2, \\sigma_3$ for the elementary symmetric sums, the GP-root law is $\\sigma_2^3 = \\sigma_1^3\\sigma_3$ — on the witness, $\\sigma_1 = 7, \\sigma_2 = 14, \\sigma_3 = 8$, and both sides equal $2744 = 14^3 = 7^3 \\cdot 8$. The middle root\'s square equals the product of the outer two ($2^2 = 1 \\cdot 4$), which is the GP condition stated multiplicatively — the same reciprocal arithmetic, one orbit short: the cubic in GP is a two-parameter mirror family the way the palindromic quartic is, and exercise L5-2 proves the law in both directions.' },
    { kind: 'equation', latex: '\\sigma_2^3 = \\sigma_1^3\\,\\sigma_3 \\quad\\Longleftrightarrow\\quad \\text{roots in GP (non-degenerate cubic)} \\tag{7}', note: 'the GP-root condition of 8.3 read through reciprocal glasses: with roots $\\beta/r, \\beta, \\beta r$, both sides equal $\\beta^6(r + 1 + \\tfrac{1}{r})^3$ — the mirror sum $(r + 1 + \\tfrac{1}{r})$ that also drives the palindromic substitution. Witness $\\{1, 2, 4\\}$: $14^3 = 7^3 \\cdot 8 = 2744$.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Reciprocal equations are a fixture of JEE-style papers precisely because they look frightening and dissolve in four lines. The shapes, in frequency order: the palindromic quartic solved by the $t$-reduction with the census asked alongside ("solve and state the number of real roots" — answer the reality gate BEFORE solving: $|t| \\geq 2$ per pair); the ladder read question ("given $x + \\tfrac{1}{x} = k$, find $x^3 + \\tfrac{1}{x^3}$ or $x^4 + \\tfrac{1}{x^4}$" — pure ladder, no equation); the odd palindromic cubic or quintic ("solve $x^3 + 2x^2 + 2x + 1 = 0$" — spot the row, take the free root, finish); the anti-palindromic variant, rarer but instant when spotted ($x = 1$ free); and the roots-of-unity identification ("the roots of $x^5 + x^4 + x^3 + x^2 + x + 1 = 0$ are..." — the sixth roots of unity except $1$). Every item in this lesson\'s exercise set is exam-style — written for this book, not lifted from any paper; the methods, not the questions, are the syllabus\'s property.' },
    { kind: 'formula', name: 'The reality gate (the census law)', latex: 'x^2 - tx + 1 = 0: \\; \\Delta = t^2 - 4 \\;\\Longrightarrow\\; \\text{real pair iff } |t| \\geq 2', note: 'the census of a palindromic quartic is read off its two $t$-values alone: both outside — 4 real; one on the gate — a double root; any inside — a conjugate pair on the unit circle.' },
    { kind: 'formula', name: 'The GP-root cross-ref (from 8.3)', latex: '\\sigma_2^3 = \\sigma_1^3\\sigma_3 \\;\\Longleftrightarrow\\; \\text{roots } \\{\\tfrac{\\beta}{r}, \\beta, \\beta r\\}', note: 'in coefficients: $ac^3 = b^3d$ for $ax^3 + bx^2 + cx + d$ — witness $x^3 - 7x^2 + 14x - 8$: $1 \\cdot 14^3 = (-7)^3(-8) = 2744$; the middle root squared equals the outer product ($2^2 = 1 \\cdot 4$).' },

    { kind: 'quiz', title: 'Check yourself: reciprocal equations', items: [
      { q: 'The reciprocal equation $x^4 + 5x^3 + 6x^2 + 5x + 1 = 0$ reduces, after dividing by $x^2$, to a quadratic in', options: ['$t = x - \\tfrac{1}{x}$', '$t = x + \\tfrac{1}{x}$', '$t = x^2$', '$t = \\tfrac{1}{x}$'], answer: 1, explain: 'Option 1 is the substitution the mirror structure demands: after dividing by the middle power $x^2$, the palindromic row pairs every $x^k$ with $x^{4-k}$, and the two combinations that survive are exactly $x^2 + \\tfrac{1}{x^2}$ and $x + \\tfrac{1}{x}$ — so the reduced equation reads $t^2 + 5t + 4 = 0$ in $t = x + \\tfrac{1}{x}$. Option 0\'s $t = x - \\tfrac{1}{x}$ is the ANTI-palindromic substitution — it pairs mirrored terms with opposite signs, useless here since this row\'s mirrors are equal. Option 2\'s $t = x^2$ pairs nothing: the terms $x^3$ and $x$ would still be stranded. Option 3\'s $t = \\tfrac{1}{x}$ alone cannot combine $x$ with $\\tfrac{1}{x}$ — half the pairing is lost.' },
      { q: 'For $t = x + \\tfrac{1}{x}$, the value of $x^2 + \\tfrac{1}{x^2}$ is', options: ['$t^2$', '$t^2 - 2$', '$t^2 + 2$', '$2t$'], answer: 1, explain: 'Option 1 is rung two of the t-ladder: $t^2 = \\left(x + \\tfrac{1}{x}\\right)^2 = x^2 + 2 + \\tfrac{1}{x^2}$, so $x^2 + \\tfrac{1}{x^2} = t^2 - 2$ — the cross term $2$ must move across, and it is exactly this $-2$ that becomes the constant shift of every quartic reduction. Option 0 forgets the cross term entirely — the single most common sign-free error of the whole lesson. Option 2 adds the cross term instead of subtracting — the ladder would then disagree with direct evaluation at, say, $x = 2$ ($t = 2.5$: $4.25 \\neq 8.25$). Option 3\'s $2t$ is linear in $t$ — squaring a binomial can never produce anything linear.' },
      { q: 'The odd-degree palindromic equation $x^3 + 2x^2 + 2x + 1 = 0$ must have the root', options: ['$0$', '$1$', '$-1$', '$i$'], answer: 2, explain: 'Option 2 is the guaranteed-root law: in an odd palindromic row, mirror partners sit on powers of opposite parity, so at $x = -1$ each pair contributes $a_k\\left((-1)^{n-k} + (-1)^k\\right) = 0$ — indeed $(-1)^3 + 2(-1)^2 + 2(-1) + 1 = -1 + 2 - 2 + 1 = 0$, and the cubic factors as $(x + 1)(x^2 + x + 1)$. Option 0: $x = 0$ gives the constant term $1 \\neq 0$ — a reciprocal equation never has the root $0$ (that is what makes the division legal). Option 1: $x = 1$ gives $1 + 2 + 2 + 1 = 6 \\neq 0$ — $x = 1$ is the ANTI-palindromic guaranteed root, the wrong family. Option 3: $P(i) = i^3 + 2i^2 + 2i + 1 = -i - 2 + 2i + 1 = i - 1 \\neq 0$, and plugging a single non-real root into a real-coefficient cubic without its conjugate would violate 8.1\'s conjugate-pair law anyway.' },
      { q: 'The roots of $x^4 + 7x^3 + 14x^2 + 7x + 1 = 0$ are', options: ['two reciprocal pairs: $\\tfrac{-3 \\pm \\sqrt{5}}{2}$ and $-2 \\pm \\sqrt{3}$', 'four real roots in arithmetic progression', '$1, 1, 7, 7$', 'not real'], answer: 0, explain: 'Option 0 is the engine-verified verdict: the reduction gives $t^2 + 7t + 12 = (t + 3)(t + 4)$, so $t = -3$ returns $x^2 + 3x + 1 = 0$ (roots $\\tfrac{-3 \\pm \\sqrt{5}}{2}$) and $t = -4$ returns $x^2 + 4x + 1 = 0$ (roots $-2 \\pm \\sqrt{3}$); each pair multiplies to $1$ exactly. Option 1\'s A.P. claim fails on the numbers: the four roots are $\\approx -3.732, -2.618, -0.382, -0.268$ — the gaps $1.11, 2.24, 0.11$ are wildly unequal. Option 2: $1$ is not a root ($P(1) = 30$), and neither root value $7$ appears — the row\'s coefficients are not its roots. Option 3: both $t$-values satisfy $|t| \\geq 2$, so the reality gate guarantees four REAL roots — and the explicit surds above confirm them.' },
      { q: '$x^3 + \\tfrac{1}{x^3}$ in terms of $t = x + \\tfrac{1}{x}$ is', options: ['$t^3$', '$t^3 - 3t$', '$t^3 + 3t$', '$3t$'], answer: 1, explain: 'Option 1 is rung three of the ladder: multiplying rung two by the substitution gives $\\left(x^2 + \\tfrac{1}{x^2}\\right)\\left(x + \\tfrac{1}{x}\\right) = x^3 + x + \\tfrac{1}{x} + \\tfrac{1}{x^3} = (t^2 - 2)t$, and the stranded middle $x + \\tfrac{1}{x} = t$ moves across: $x^3 + \\tfrac{1}{x^3} = t^3 - 3t$. Option 0 forgets the $-3t$ — the middle cross terms that the cube of a binomial always leaves behind ($(a+b)^3 = a^3 + b^3 + 3ab(a + b)$ is the same law wearing different clothes). Option 2 has the sign backwards: direct evaluation at $x = 2$ ($t = 2.5$) gives $8.125$, and $t^3 + 3t = 22.125$ — badly wrong, while $t^3 - 3t = 8.125$ exactly. Option 3 is linear — no cube of a binomial is linear in $t$.' },
    ] },

    { kind: 'exercises', title: 'Exercises 8.6', sets: [
      { level: 'L1', questions: [
        { q: 'Verify that $x = -1$ is a root of $x^3 + 2x^2 + 2x + 1 = 0$, factor the cubic completely, and state all three roots. (exam-style)', solution: [
          'The row $1, 2, 2, 1$ is palindromic of odd degree — so the guaranteed-root law applies before any computation.',
          'Verify directly: $(-1)^3 + 2(-1)^2 + 2(-1) + 1 = -1 + 2 - 2 + 1 = 0$.',
          'So, divide the root off: $x^3 + 2x^2 + 2x + 1 = (x + 1)(x^2 + x + 1)$ — the factor law with $a = 2$, checked by expansion.',
          'Now, the quadratic formula on the quotient: $x^2 + x + 1 = 0$ gives $x = \\tfrac{-1 \\pm i\\sqrt{3}}{2}$ — the primitive cube roots of unity (each satisfies $z^3 = 1$).',
          'Hence the roots are $-1,\\ \\tfrac{-1 \\pm i\\sqrt{3}}{2}$ — one guaranteed root plus one reciprocal pair on the unit circle.',
        ], answer: '$-1$ and $\\tfrac{-1 \\pm i\\sqrt{3}}{2}$ — the non-real pair are the primitive cube roots of unity' },
        { q: 'Given $t = x + \\tfrac{1}{x} = 4$ (so $x$ solves $x^2 - 4x + 1 = 0$), find $x^2 + \\tfrac{1}{x^2}$ without solving for $x$.', solution: [
          'No equation solving is needed — this is a pure ladder read, rung two.',
          'Rung two of the t-ladder: $x^2 + \\tfrac{1}{x^2} = t^2 - 2$.',
          'So, substitute $t = 4$: $x^2 + \\tfrac{1}{x^2} = 16 - 2 = 14$.',
          'Hence $14$ — and as a consistency check, the roots of $x^2 - 4x + 1 = 0$ are $2 \\pm \\sqrt{3}$, whose product is $1$ and whose squares-plus-reciprocal-squares the engine evaluates to exactly $14$.',
        ], answer: '$14$ — rung two: $t^2 - 2 = 16 - 2$, no solving required' },
      ] },
      { level: 'L2', questions: [
        { q: 'Solve the reciprocal equation $x^4 + 7x^3 + 14x^2 + 7x + 1 = 0$ completely, exhibiting the two reciprocal pairs. (exam-style)', solution: [
          'The row $1, 7, 14, 7, 1$ is palindromic with constant term $1$ — $x = 0$ is not a root, so dividing by the middle power $x^2$ is legal.',
          'Divide and pair: $\\left(x^2 + \\tfrac{1}{x^2}\\right) + 7\\left(x + \\tfrac{1}{x}\\right) + 14 = 0$.',
          'So, substitute $t = x + \\tfrac{1}{x}$ with $x^2 + \\tfrac{1}{x^2} = t^2 - 2$: $t^2 + 7t + 12 = 0$.',
          'Now, factor: $(t + 3)(t + 4) = 0$, so $t = -3$ or $t = -4$.',
          'Return per root: $t = -3$ gives $x^2 + 3x + 1 = 0$, i.e. $x = \\tfrac{-3 \\pm \\sqrt{5}}{2}$; $t = -4$ gives $x^2 + 4x + 1 = 0$, i.e. $x = -2 \\pm \\sqrt{3}$.',
          'Hence two reciprocal pairs: $\\tfrac{-3 \\pm \\sqrt{5}}{2}$ (product $\\tfrac{9-5}{4} = 1$) and $-2 \\pm \\sqrt{3}$ (product $4 - 3 = 1$) — four real roots, since both $t$-values clear the reality gate $|t| \\geq 2$.',
        ], answer: '$x = \\tfrac{-3 \\pm \\sqrt{5}}{2}$ and $x = -2 \\pm \\sqrt{3}$ — two reciprocal pairs, all four roots real', figures: [
          { caption: 'The full walk of the solve: the mirror strip $1, 7, 14, 7, 1$, the divide-by-$x^2$ move, the $t$-quadratic $t^2 + 7t + 12 = (t+3)(t+4)$, and the two return quadratics with their root values and pair products — every number engine-verified.', svg: mirrorStrip86Svg() },
        ] },
        { q: 'Solve the palindromic cubic $x^3 + 5x^2 + 5x + 1 = 0$. (exam-style)', solution: [
          'The row $1, 5, 5, 1$ is palindromic of odd degree — the guaranteed root $x = -1$ falls out before any substitution: $-1 + 5 - 5 + 1 = 0$.',
          'So, divide it off by the factor law: $x^3 + 5x^2 + 5x + 1 = (x + 1)(x^2 + 4x + 1)$ — expansion check: $x^3 + 4x^2 + x + x^2 + 4x + 1$.',
          'Now, the quadratic formula on the quotient: $x^2 + 4x + 1 = 0$ gives $x = \\tfrac{-4 \\pm \\sqrt{16 - 4}}{2} = -2 \\pm \\sqrt{3}$.',
          'Hence the roots are $-1,\\ -2 \\pm \\sqrt{3}$ — the surd pair a reciprocal pair (product $4 - 3 = 1$), and the product of all three is $-1$, matching Viète\'s $\\sigma_3 = -\\tfrac{1}{1} = -1$.',
        ], answer: '$x = -1$ and $x = -2 \\pm \\sqrt{3}$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $x^4 - 3x^3 + 4x^2 - 3x + 1 = 0$ and give the real/non-real census of its roots.', solution: [
          'The row $1, -3, 4, -3, 1$ is palindromic — divide by $x^2$ and pair: $\\left(x^2 + \\tfrac{1}{x^2}\\right) - 3\\left(x + \\tfrac{1}{x}\\right) + 4 = 0$.',
          'So, substitute $t$: $t^2 - 3t + 2 = 0$, i.e. $(t - 1)(t - 2) = 0$ — so $t = 1$ or $t = 2$.',
          'Now, the reality gate BEFORE the return trip: $t = 2$ clears the gate ($|2| \\geq 2$, a real pair) while $t = 1$ sits inside ($|1| < 2$, a conjugate pair) — the census is already settled: 2 real + 2 non-real.',
          'Return: $t = 2$ gives $x^2 - 2x + 1 = (x - 1)^2 = 0$ — the double root $x = 1$; $t = 1$ gives $x^2 - x + 1 = 0$ — the roots $\\tfrac{1 \\pm i\\sqrt{3}}{2}$.',
          'Hence the root set is $\\{1, 1, \\tfrac{1 \\pm i\\sqrt{3}}{2}\\}$ — census $2$ real (a double $1$) $+\\ 2$ non-real (the primitive sixth roots of unity: $z^6 = 1$, $z^3 = -1$), and the engine confirms each root by complex evaluation.',
        ], answer: '$\\{1\\text{ (double)}, \\tfrac{1 \\pm i\\sqrt{3}}{2}\\}$ — census: 2 real (one value, twice) + 2 non-real' },
        { q: 'Solve $x^5 + x^4 + x^3 + x^2 + x + 1 = 0$ by the odd-degree route and identify the five roots as roots of unity. (exam-style)', solution: [
          'The row of six $1$\'s is palindromic of odd degree — guaranteed root $x = -1$: $-1 + 1 - 1 + 1 - 1 + 1 = 0$.',
          'So, divide it off: $x^5 + x^4 + x^3 + x^2 + x + 1 = (x + 1)(x^4 + x^2 + 1)$ — expansion check: the six terms reappear exactly.',
          'Now, the quartic tail is even-degree palindromic: divide by $x^2$ — $\\left(x^2 + \\tfrac{1}{x^2}\\right) + 1 = 0$, so $t^2 - 2 + 1 = 0$, i.e. $t^2 = 1$ and $t = \\pm 1$.',
          'Return: $t = -1$ gives $x^2 + x + 1 = 0$ (roots $\\tfrac{-1 \\pm i\\sqrt{3}}{2}$, the primitive cube roots); $t = 1$ gives $x^2 - x + 1 = 0$ (roots $\\tfrac{1 \\pm i\\sqrt{3}}{2}$, the primitive sixth roots).',
          'Hence the five roots: $-1,\\ \\tfrac{-1 \\pm i\\sqrt{3}}{2},\\ \\tfrac{1 \\pm i\\sqrt{3}}{2}$ — and each powers to $z^6 = 1$ with $z \\neq 1$, so these are EXACTLY the sixth roots of unity other than $1$: the equation was $\\tfrac{x^6 - 1}{x - 1} = 0$ all along, and the census is $1$ real $+\\ 4$ non-real (all on the unit circle).',
        ], answer: '$-1, \\tfrac{-1 \\pm i\\sqrt{3}}{2}, \\tfrac{1 \\pm i\\sqrt{3}}{2}$ — exactly the 6th roots of unity except $1$ (1 real + 4 non-real)' },
        { q: 'Given $t = x + \\tfrac{1}{x} = 3$, evaluate $x^3 + \\tfrac{1}{x^3}$ and $x^4 + \\tfrac{1}{x^4}$. (exam-style)', solution: [
          'Pure ladder reads — no equation to solve; the mirrored power pairs are polynomials in $t$.',
          'Rung three: $x^3 + \\tfrac{1}{x^3} = t^3 - 3t = 27 - 9 = 18$.',
          'So, rung four: $x^4 + \\tfrac{1}{x^4} = t^4 - 4t^2 + 2 = 81 - 36 + 2 = 47$.',
          'Hence $18$ and $47$ — and the engine\'s consistency check: $x$ solves $x^2 - 3x + 1 = 0$ (roots $\\tfrac{3 \\pm \\sqrt{5}}{2}$, product $1$), and evaluating the two power pairs at $\\tfrac{3 + \\sqrt{5}}{2}$ lands on exactly $18$ and $47$.',
        ], answer: '$x^3 + \\tfrac{1}{x^3} = 18$ and $x^4 + \\tfrac{1}{x^4} = 47$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Solve $x^4 + 5x^3 + 6x^2 + 5x + 1 = 0$ and give the real/non-real census of its roots. (exam-style)', solution: [
          'The row $1, 5, 6, 5, 1$ is palindromic — divide by $x^2$ and pair: $\\left(x^2 + \\tfrac{1}{x^2}\\right) + 5\\left(x + \\tfrac{1}{x}\\right) + 6 = 0$.',
          'So, substitute $t$: $t^2 + 5t + 4 = 0$ — discriminant $25 - 16 = 9$, so $t = \\tfrac{-5 \\pm 3}{2}$, i.e. $t = -1$ and $t = -4$.',
          'Now, the reality gate: $t = -4$ clears it (a real pair) while $t = -1$ sits inside (a conjugate pair) — the census is 2 real + 2 non-real before any return trip.',
          'Return: $t = -4$ gives $x^2 + 4x + 1 = 0$, roots $-2 \\pm \\sqrt{3}$ (product $1$); $t = -1$ gives $x^2 + x + 1 = 0$, roots $\\tfrac{-1 \\pm i\\sqrt{3}}{2}$ — the primitive cube roots of unity (product $1$, modulus $1$).',
          'Hence $\\{ -2 \\pm \\sqrt{3},\\ \\tfrac{-1 \\pm i\\sqrt{3}}{2}\\}$ — census: $2$ real $+\\ 2$ non-real, the engine verifying every root by evaluation and every pair product equal to $1$.',
        ], answer: '$-2 \\pm \\sqrt{3}$ (real) and $\\tfrac{-1 \\pm i\\sqrt{3}}{2}$ (non-real) — census 2 real + 2 non-real' },
        { q: 'Prove that the roots of a palindromic polynomial equation (with nonzero constant term) come in reciprocal pairs: if $r$ is a root then $\\tfrac{1}{r}$ is a root too. Then verify the pair law on the witness $x^4 + 7x^3 + 14x^2 + 7x + 1 = 0$.', solution: [
          'Set up the inversion transform of lesson 8.5: $Q(x) = x^nP\\!\\left(\\tfrac{1}{x}\\right) = a_0x^n + a_1x^{n-1} + \\cdots + a_{n-1}x + a_n$ — the equation whose roots are the reciprocals of $P$\'s (the reversed row).',
          'The palindromic law $a_k = a_{n-k}$ says precisely that this reversed row EQUALS the original row — so $Q = P$ as polynomials.',
          'Now, let $r$ be a root of $P(x) = 0$ with $r \\neq 0$ (the constant term is nonzero): evaluate $Q$ at $\\tfrac{1}{r}$ — $Q\\!\\left(\\tfrac{1}{r}\\right) = \\tfrac{1}{r^n}\\,P(r) = 0$, because $P(r) = 0$.',
          'So, since $Q = P$, also $P\\!\\left(\\tfrac{1}{r}\\right) = 0$ — the reciprocal $\\tfrac{1}{r}$ is a root of the ORIGINAL equation, which is the pair law. The orbits of the inversion are the pairs $\\{r, \\tfrac{1}{r}\\}$, with $\\pm 1$ self-paired.',
          'Verify on the witness: its four roots are $\\tfrac{-3 + \\sqrt{5}}{2}, \\tfrac{-3 - \\sqrt{5}}{2}, -2 + \\sqrt{3}, -2 - \\sqrt{3}$, and the pair products are $\\tfrac{(-3)^2 - 5}{4} = 1$ and $(-2)^2 - 3 = 1$ — two reciprocal pairs, as the law demands; the engine evaluates $P$ at each $\\tfrac{1}{r}$ and lands on $0$ every time.',
          'Hence the pair law proved from 8.5\'s inversion transform, and the total product $\\sigma_4 = \\tfrac{a_0}{a_0} = 1$ — 8.3\'s Viète read — is simply the pair law multiplied out.',
        ], answer: 'proved via $x^nP(1/x) = P(x)$: each root $r$ brings $\\tfrac{1}{r}$; witness: the two pairs each multiply to $1$' },
        { q: 'The sextic walk: solve $x^6 - 6x^5 + 15x^4 - 20x^3 + 15x^2 - 6x + 1 = 0$ by the reciprocal route, showing every step from division to verdict. (exam-style)', solution: [
          'The row $1, -6, 15, -20, 15, -6, 1$ is palindromic (Pascal\'s symmetry built it), even degree — divide by the middle power $x^3$: $\\left(x^3 + \\tfrac{1}{x^3}\\right) - 6\\left(x^2 + \\tfrac{1}{x^2}\\right) + 15\\left(x + \\tfrac{1}{x}\\right) - 20 = 0$.',
          'So, climb the ladder: $x^3 + \\tfrac{1}{x^3} = t^3 - 3t$ and $x^2 + \\tfrac{1}{x^2} = t^2 - 2$, giving $(t^3 - 3t) - 6(t^2 - 2) + 15t - 20 = 0$.',
          'Now, collect: $t^3 - 6t^2 + (-3 + 15)t + (12 - 20) = t^3 - 6t^2 + 12t - 8 = 0$ — degree six has become degree three.',
          'Factor the cubic: $t^3 - 6t^2 + 12t - 8 = (t - 2)^3 = 0$ — the binomial row one degree down — so $t = 2$ is a TRIPLE root.',
          'Return: $t = 2$ (three times) means $x + \\tfrac{1}{x} = 2$, i.e. $x^2 - 2x + 1 = (x - 1)^2 = 0$ — so each of the three $t$-seats returns the double root $x = 1$.',
          'Hence $x = 1$ with multiplicity $6$ — the sextic is $(x - 1)^6$, exactly what the binomial row announced; the engine certifies the multiplicity by evaluating the sextic\'s first five derivatives at $x = 1$ (all zero) and the sixth ($720 = 6!$, nonzero).',
        ], answer: '$x = 1$, six-fold — the sextic is $(x-1)^6$, recovered without expanding it', figures: [
          { caption: 'The triple collapse: the cubic in $t$, $t^3 - 6t^2 + 12t - 8 = (t-2)^3$, has the triple root $t = 2$; each of the three seats returns $(x-1)^2$, and the verdict is $x = 1$ six-fold.', svg: tripleCollapse86Svg() },
        ] },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove BOTH guaranteed-root laws: every odd-degree palindromic equation has $x = -1$ as a root, and every odd-degree anti-palindromic equation has $x = 1$ as a root. Then verify each law on a fresh witness: $x^3 + 5x^2 + 5x + 1 = 0$ and $x^3 + 6x^2 - 6x - 1 = 0$.', solution: [
          'Palindromic law, odd degree $n = 2m + 1$: group the row into mirror pairs $a_k\\left(x^{n-k} + x^k\\right)$ for $k = 0, \\ldots, m$ — the palindromic law puts the SAME coefficient on both seats of every bracket.',
          'So, evaluate at $x = -1$: the powers $n - k$ and $k$ have opposite parity (their difference $n - 2k$ is odd), so $(-1)^{n-k} + (-1)^k = 0$ — every bracket vanishes, and $P(-1) = 0$.',
          'Now, the anti-palindromic law: here $a_k = -a_{n-k}$, so evaluate at $x = 1$ instead — each mirror pair contributes $a_k + a_{n-k} = 0$ to $P(1)$, so $P(1) = 0$.',
          'Verify witness one: $x^3 + 5x^2 + 5x + 1$ at $-1$ gives $-1 + 5 - 5 + 1 = 0$ — the free root, then $(x + 1)(x^2 + 4x + 1)$ and the full root set $-1, -2 \\pm \\sqrt{3}$.',
          'Verify witness two: $x^3 + 6x^2 - 6x - 1$ at $1$ gives $1 + 6 - 6 - 1 = 0$ — the free root, then $(x - 1)(x^2 + 7x + 1)$ and the full root set $1, \\tfrac{-7 \\pm 3\\sqrt{5}}{2}$.',
          'Hence both laws proved by pairing (opposite-parity mirrors flip signs at $-1$; anti-mirrors cancel at $1$) — and both witnesses\' remaining quadratic carries constant term $1$, so the leftover roots form a reciprocal pair in each case: the guaranteed root is the ODD member the pairing cannot absorb.',
        ], answer: 'both laws proved; witnesses: $-1 \\in \\{-1, -2 \\pm \\sqrt3\\}$ and $1 \\in \\{1, \\tfrac{-7 \\pm 3\\sqrt5}{2}\\}$' },
        { q: 'The GP-root family: prove that the roots of a non-degenerate cubic are in geometric progression if and only if $\\sigma_2^3 = \\sigma_1^3\\sigma_3$, and verify the law on the witness $\\{1, 2, 4\\} \\to x^3 - 7x^2 + 14x - 8 = 0$ (lesson 8.3\'s exhibit).', solution: [
          'Forward direction: let the roots be $\\{\\tfrac{\\beta}{r}, \\beta, \\beta r\\}$ with $\\beta, r \\neq 0$ — a GP with middle term $\\beta$ and ratio $r$.',
          'Compute the symmetric sums: $\\sigma_1 = \\beta\\left(\\tfrac{1}{r} + 1 + r\\right)$, $\\sigma_2 = \\beta^2\\left(\\tfrac{1}{r} + 1 + r\\right)$, $\\sigma_3 = \\beta^3$ — the SAME mirror sum $S = r + 1 + \\tfrac{1}{r}$ riding $\\sigma_1$ and $\\sigma_2$.',
          'So, cube and multiply: $\\sigma_2^3 = \\beta^6S^3$ and $\\sigma_1^3\\sigma_3 = \\beta^3S^3 \\cdot \\beta^3 = \\beta^6S^3$ — the two sides are equal, which is the law\'s forward half.',
          'Now, the converse (real roots, $\\sigma_1\\sigma_3 \\neq 0$): let $\\beta = \\sqrt[3]{\\sigma_3}$ — a real cube root — and write the three roots as $\\beta x, \\beta y, \\beta z$; then $xyz = \\tfrac{\\sigma_3}{\\beta^3} = 1$, $\\sigma_1 = \\beta(x + y + z)$ and $\\sigma_2 = \\beta^2(xy + yz + zx)$, so the condition $\\sigma_2^3 = \\sigma_1^3\\sigma_3$ becomes $\\beta^6(xy + yz + zx)^3 = \\beta^6(x + y + z)^3$ — and for real bracket values the cube function is injective, so $xy + yz + zx = x + y + z$.',
          'So, the pairing identity: $(x - 1)(y - 1)(z - 1) = xyz - (xy + yz + zx) + (x + y + z) - 1 = 1 - q + s - 1 = 0$ with $q = xy + yz + zx$ and $s = x + y + z$ — one of $x, y, z$ equals $1$, say $x = 1$, and then $yz = xyz = 1$ forces $z = \\tfrac{1}{y}$: the roots are $\\{\\beta, \\beta y, \\tfrac{\\beta}{y}\\}$ — a geometric progression.',
          'Hence the iff for real-rooted non-degenerate cubics (complex-rooted triples need the conjugate caveats, and $\\sigma_3 = 0$ means a zero root — no GP of nonzero terms).',
          'Verify on the witness: roots $\\{1, 2, 4\\}$ give $\\sigma_1 = 7, \\sigma_2 = 2 + 4 + 8 = 14, \\sigma_3 = 8$; both sides of the law read $14^3 = 2744$ and $7^3 \\cdot 8 = 2744$ — equal, and the middle root\'s square equals the outer product: $2^2 = 1 \\cdot 4$; in coefficients the law is $ac^3 = b^3d$, here $1 \\cdot 14^3 = (-7)^3(-8) = 2744$ ✓.',
        ], answer: 'proved both directions; witness: $\\sigma_2^3 = 14^3 = 2744 = 7^3 \\cdot 8 = \\sigma_1^3\\sigma_3$ (and $2^2 = 1 \\cdot 4$)' },
        { q: 'Solve $x^4 + 1 = 0$ by the reciprocal route ($t = \\pm\\sqrt{2}$), and give the roots-of-unity census of its four roots. (exam-style)', solution: [
          'The row $1, 0, 0, 0, 1$ is palindromic (all mirror pairs match, trivially) — divide by $x^2$: $x^2 + \\tfrac{1}{x^2} = 0$.',
          'So, substitute $t$: $t^2 - 2 = 0$, giving $t = \\pm\\sqrt{2}$ — both strictly inside the reality gate $|t| < 2$, so the census (0 real + 4 non-real) is known BEFORE the return trip.',
          'Return: $t = \\sqrt{2}$ gives $x^2 - \\sqrt{2}x + 1 = 0$, roots $\\tfrac{\\sqrt{2} \\pm i\\sqrt{2}}{2} = \\tfrac{1 \\pm i}{\\sqrt{2}}$; $t = -\\sqrt{2}$ gives $x^2 + \\sqrt{2}x + 1 = 0$, roots $\\tfrac{-1 \\pm i}{\\sqrt{2}}$.',
          'So, the four roots are $\\tfrac{\\pm 1 \\pm i}{\\sqrt{2}}$ — each of modulus $\\tfrac{\\sqrt{2}}{\\sqrt{2}} = 1$: all four ON the unit circle, paired reciprocally (each pair multiplies to $1$, engine-verified).',
          'Hence the census: $0$ real $+\\ 4$ non-real, and the roots are the primitive EIGHTH roots of unity — powering confirms $\\left(\\tfrac{1 + i}{\\sqrt{2}}\\right)^4 = -1$ exactly, so $z^8 = 1$ with $z^4 \\neq 1$: chapter 3\'s regular octagon vertices at the odd eighth-turns, delivered by pure palindrome mechanics.',
        ], answer: '$x = \\tfrac{\\pm 1 \\pm i}{\\sqrt{2}}$ — the primitive 8th roots of unity; census 0 real + 4 non-real' },
      ] },
      { level: 'L6', questions: [
        { q: 'Derive the t-ladder rungs $x^3 + \\tfrac{1}{x^3} = t^3 - 3t$ and $x^4 + \\tfrac{1}{x^4} = t^4 - 4t^2 + 2$ from $t = x + \\tfrac{1}{x}$, prove the recurrence $L_n = tL_{n-1} - L_{n-2}$, and verify all three rungs numerically at $x = 2$ and $x = 3$.', solution: [
          'Rung three, by multiplication: $\\left(x^2 + \\tfrac{1}{x^2}\\right)\\left(x + \\tfrac{1}{x}\\right) = x^3 + x + \\tfrac{1}{x} + \\tfrac{1}{x^3} = L_3 + L_1$ — the cross terms are the substitution itself, so $(t^2 - 2)t = L_3 + t$, giving $L_3 = t^3 - 3t$.',
          'Rung four, by squaring rung two: $\\left(x^2 + \\tfrac{1}{x^2}\\right)^2 = x^4 + 2 + \\tfrac{1}{x^4} = (t^2 - 2)^2$, so $L_4 = t^4 - 4t^2 + 4 - 2 = t^4 - 4t^2 + 2$.',
          'The recurrence, in general: $L_nL_1 = \\left(x^n + \\tfrac{1}{x^n}\\right)\\left(x + \\tfrac{1}{x}\\right) = L_{n+1} + L_{n-1}$ — multiplying power pairs regroups into the two neighbouring rungs — so $L_{n+1} = tL_n - L_{n-1}$ for every $n \\geq 1$, with $L_0 = 2$ and $L_1 = t$: one line, and the whole ladder is generated forever ($L_5 = t(t^4 - 4t^2 + 2) - (t^3 - 3t) = t^5 - 5t^3 + 5t$).',
          'Verify at $x = 2$: $t = 2.5$; rung three: $8 + \\tfrac{1}{8} = 8.125$ against $t^3 - 3t = 15.625 - 7.5 = 8.125$ ✓; rung four: $16 + \\tfrac{1}{16} = 16.0625$ against $t^4 - 4t^2 + 2 = 39.0625 - 25 + 2 = 16.0625$ ✓.',
          'So, at $x = 3$: $t = \\tfrac{10}{3}$; rung three: $27 + \\tfrac{1}{27} = \\tfrac{730}{27}$ against $t^3 - 3t = \\tfrac{1000}{27} - 10 = \\tfrac{730}{27}$ ✓; rung four: $81 + \\tfrac{1}{81} = \\tfrac{6562}{81}$ against $t^4 - 4t^2 + 2 = \\tfrac{10000}{81} - \\tfrac{400}{9} + 2 = \\tfrac{6562}{81}$ ✓.',
          'Hence the ladder proved two ways (multiplication and squaring) plus its generating recurrence — the engine swept every rung at eight values of $x$ and the recurrence at rungs four and five.',
        ], answer: 'rungs proved ($L_3 = t^3 - 3t$, $L_4 = t^4 - 4t^2 + 2$) + the recurrence $L_{n+1} = tL_n - L_{n-1}$; verified at $x = 2$ ($8.125, 16.0625$) and $x = 3$ ($\\tfrac{730}{27}, \\tfrac{6562}{81}$)' },
        { q: 'Prove the general even-palindrome theorem: every palindromic equation of even degree $2n$ (nonzero constant term) reduces, after division by $x^n$ and the substitution $t = x + \\tfrac{1}{x}$, to an equation of degree exactly $n$ in $t$ — and each root $t$ of the reduced equation returns exactly two roots $x$ of the original.', solution: [
          'Write the equation in mirror brackets: $a_0\\left(x^{2n} + 1\\right) + a_1\\left(x^{2n-1} + x\\right) + \\cdots + a_{n-1}\\left(x^{n+1} + x^{n-1}\\right) + a_nx^n = 0$ — legal regrouping, the palindromic law putting one coefficient per bracket.',
          'Divide by $x^n$ (legal: the constant term $a_{2n} = a_0 \\neq 0$, so $x = 0$ is never a root): the equation becomes $a_0L_n + a_1L_{n-1} + \\cdots + a_{n-1}L_1 + a_n = 0$, where $L_k = x^k + \\tfrac{1}{x^k}$ — the middle term $a_nx^n$ has become the constant $a_n$.',
          'Now, the ladder inducts: claim $L_k$ is a polynomial in $t$ of degree EXACTLY $k$ with leading coefficient $1$. Base: $L_0 = 2$, $L_1 = t$. Step: $L_{k+1} = tL_k - L_{k-1}$ (proved as in the previous exercise) — if $L_k$ has degree $k$ with leading coefficient $1$ and $L_{k-1}$ degree $k - 1$, then $tL_k$ has degree $k + 1$ with leading coefficient $1$ and nothing in $L_{k-1}$ can cancel the $t^{k+1}$ seat: the claim propagates.',
          'So, substituting turns the divided equation into a polynomial equation in $t$: the top rung $L_n$ has degree exactly $n$ with leading coefficient $a_0 \\neq 0$, and every lower rung has degree below $n$, so the reduced equation is genuinely degree $n$ in $t$.',
          'The return trip: $t = x + \\tfrac{1}{x}$ means $x^2 - tx + 1 = 0$ — a quadratic with discriminant $t^2 - 4$, so each root $t$ returns exactly two roots $x$ (merged into one double root precisely at $t = \\pm 2$); the $n$ roots of the reduced equation (counted with multiplicity, by 8.1\'s fundamental count) therefore return $2n$ roots of the original — the full degree, nothing lost, nothing gained.',
          'Hence degree $2n$ halves to degree $n$ always — the quartic ($n = 2$) to a quadratic, the sextic ($n = 3$) to a cubic, and the engine\'s swept checks (the division identity, the ladder, the return products) witness every layer of the proof numerically.',
        ], answer: 'proved: pairing + division + the ladder recurrence give a degree-$n$ equation in $t$; the return quadratic $x^2 - tx + 1$ per root $t$ restores all $2n$ roots' },
      ] },
    ] },
  ],
}


// ------------------------------------------------------------------
// lesson 8.R — authored by the run-119 swarm (the 08R agent), integrated verbatim
// ------------------------------------------------------------------

function decisionMap8RSvg(): string {
  // six question chips (left) route one-to-one to the six engine boxes
  // (right); the ground bar - the factor theorem + the fundamental
  // theorem - runs underneath; arrows drawn as amber curves.
  const questions = [
    { y: 88, q: 'how many roots?', sub: 'count them, multiplicity in' },
    { y: 148, q: 'what kind are they?', sub: 'real or non-real, how many positive' },
    { y: 208, q: 'what do the coefficients know?', sub: 'the symmetric functions' },
    { y: 268, q: 'solve it exactly?', sub: 'the cubic and the quartic, solved' },
    { y: 328, q: 'move the roots?', sub: 'shift, scale, invert' },
    { y: 388, q: 'spot the symmetry?', sub: 'palindromic coefficients' },
  ]
    .map(
      (c) =>
        `<rect x="28" y="${c.y - 26}" width="252" height="50" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="154" y="${c.y - 6}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">${c.q}</text><text x="154" y="${c.y + 13}" font-size="9.5" text-anchor="middle" fill="#0f766e">${c.sub}</text>`
    )
    .join('')
  const engines = [
    { y: 88, e: 'the census - 8.1', sub: 'n roots over C, multiplicity in' },
    { y: 148, e: 'Descartes lens - 8.2', sub: 'variations bound, even deficit' },
    { y: 208, e: 'the staircase - 8.3', sub: 'sigma 1, sigma 2, sigma 3' },
    { y: 268, e: 'Cardan-Ferrari - 8.4', sub: 'Delta, the resolvent, the split' },
    { y: 328, e: 'the craft - 8.5', sub: 'roots plus h, times k, inverted' },
    { y: 388, e: 'the palindrome - 8.6', sub: 't = x + 1/x, two x per t' },
  ]
    .map(
      (c) =>
        `<rect x="404" y="${c.y - 26}" width="252" height="50" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="530" y="${c.y - 6}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">${c.e}</text><text x="530" y="${c.y + 13}" font-size="9.5" text-anchor="middle" fill="#0f766e">${c.sub}</text>`
    )
    .join('')
  const arrows = [
    { d: 'M280,88 Q342,88 404,88', y: 88 },
    { d: 'M280,148 Q342,148 404,148', y: 148 },
    { d: 'M280,208 Q342,208 404,208', y: 208 },
    { d: 'M280,268 Q342,268 404,268', y: 268 },
    { d: 'M280,328 Q342,328 404,328', y: 328 },
    { d: 'M280,388 Q342,388 404,388', y: 388 },
  ]
    .map((a) => `<path d="${a.d}" fill="none" stroke="#d97706" stroke-width="1.8"/><path d="M404,${a.y} l-9,-5 v10 z" fill="#ea580c"/>`)
    .join('')
  return `<svg viewBox="0 0 760 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The decision map of the chapter: six questions asked in order, each routing to the engine that owns it. How many roots routes to the census of lesson 8.1 - n roots over the complex numbers, multiplicity counted. What kind are they routes to Descartes lens of lesson 8.2 - variations bound the positive roots with an even deficit. What do the coefficients know routes to the staircase of lesson 8.3 - the symmetric functions sigma one, sigma two, sigma three. Solve it exactly routes to Cardan and Ferrari of lesson 8.4 - Delta, the resolvent, the split. Move the roots routes to the craft of lesson 8.5 - roots plus h, times k, inverted. Spot the symmetry routes to the palindrome of lesson 8.6 - the substitution t equals x plus one over x, two x per t. A ground bar underneath reads: the factor theorem of chapter 2 plus the fundamental theorem - every engine stands on them.">
  <text x="380" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the decision map: which question, which engine</text>
  <text x="154" y="50" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">ask, in order</text>
  <text x="530" y="50" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">the engine that owns the answer</text>
  ${questions}
  ${engines}
  ${arrows}
  <rect x="28" y="444" width="628" height="44" rx="7" fill="#ffedd5" stroke="#0d9488" stroke-width="2.2"/>
  <text x="342" y="462" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">the ground: the factor theorem (chapter 2) + the fundamental theorem</text>
  <text x="342" y="478" font-size="9.5" text-anchor="middle" fill="#0f766e">every engine stands on them - name the question first, reach for the engine second</text>
</svg>`
}

function promiseCashings8RSvg(): string {
  // the promise-cashings of the chapter: five lanes above the six lesson
  // boxes, each lane running from the lesson that made an early promise
  // (the chip with the amber arrow's tail) to the lesson that cashed it
  // (the arrow's head). The fourth lane runs right-to-left: the shift law
  // of 8.5 cashes BACKWARD into 8.4's depression - one engine, two
  // costumes.
  const chip = (x: number, y: number, w: number, bold: string, sub: string) =>
    `<rect x="${x}" y="${y}" width="${w}" height="40" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="${x + w / 2}" y="${y + 17}" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">${bold}</text><text x="${x + w / 2}" y="${y + 32}" font-size="9.5" text-anchor="middle" fill="#0f766e">${sub}</text>`
  const arrowR = (x1: number, x2: number, y: number) =>
    `<line x1="${x1}" y1="${y}" x2="${x2 - 9}" y2="${y}" stroke="#d97706" stroke-width="1.8"/><path d="M${x2},${y} l-9,-5 v10 z" fill="#ea580c"/>`
  const arrowL = (x1: number, x2: number, y: number) =>
    `<line x1="${x1}" y1="${y}" x2="${x2 + 9}" y2="${y}" stroke="#d97706" stroke-width="1.8"/><path d="M${x2},${y} l9,-5 v10 z" fill="#ea580c"/>`
  const lanes =
    chip(22, 58, 190, 'conjugate pairs', 'promised in 8.1') + arrowR(212, 520, 78) + chip(520, 58, 200, 'real/non-real censuses', 'cashed in 8.2') +
    chip(60, 102, 190, 'multiplicity', 'promised in 8.1') + arrowR(250, 500, 122) + chip(500, 102, 210, 'the staircase', 'cashed in 8.3') +
    chip(140, 146, 190, 'the symmetric reads', 'promised in 8.3') + arrowR(330, 500, 166) + chip(500, 146, 210, 'the Cardan audits', 'cashed in 8.4') +
    chip(150, 190, 200, 'the depression', 'cashed in 8.4') + arrowL(560, 360, 210) + chip(560, 190, 200, 'the shift law', 'promised in 8.5') +
    chip(180, 234, 200, 'the inversion law', 'promised in 8.5') + arrowR(380, 520, 254) + chip(520, 234, 210, 'the palindromic symmetry', 'cashed in 8.6')
  const lessons = [
    ['8.1', 'the census', 'n roots'],
    ['8.2', 'the lens', 'variations'],
    ['8.3', 'the staircase', 'symmetric'],
    ['8.4', 'the solve', 'Cardan'],
    ['8.5', 'the craft', 'transform'],
    ['8.6', 'the symmetry', 'palindrome'],
  ]
    .map(
      (l, i) =>
        `<rect x="${31 + i * 120}" y="292" width="108" height="60" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="${85 + i * 120}" y="312" font-size="11.5" font-weight="800" text-anchor="middle" fill="#166534">${l[0]}</text><text x="${85 + i * 120}" y="328" font-size="9" text-anchor="middle" fill="#0f766e">${l[1]}</text><text x="${85 + i * 120}" y="342" font-size="9" text-anchor="middle" fill="#0f766e">${l[2]}</text>`
    )
    .join('')
  return `<svg viewBox="0 0 780 415" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The promise-cashings of the chapter: five lanes, each running from the lesson that made an early promise to the lesson that cashed it. The conjugate pairs of 8.1 are cashed by 8.2 as the real and non-real censuses. The multiplicity of 8.1 is cashed by 8.3 as the Viete staircase, degree as the sigma-counted root total. The symmetric reads of 8.3 are cashed by 8.4 as the Cardan audits, the sigma-verified solutions. The shift law of 8.5 is cashed backward by 8.4 as the depression - one engine, two costumes, the fourth lane running right to left. The inversion law of 8.5 is cashed by 8.6 as the palindromic symmetry. The six lesson boxes sit in teaching order beneath: 8.1 the census, 8.2 the lens, 8.3 the staircase, 8.4 the solve, 8.5 the craft, 8.6 the symmetry. A sixth cashing - the parity of 8.2 - is paid by this review's own census bench.">
  <text x="390" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the promise-cashings: what 8.1-8.5 promised, the later storeys paid</text>
  <text x="390" y="42" font-size="10" text-anchor="middle" fill="#0f766e">each lane runs from the lesson that made the promise to the lesson that cashed it</text>
  ${lanes}
  ${lessons}
  <text x="390" y="372" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">the six storeys of the chapter, in teaching order - one lane runs backward on purpose</text>
  <text x="390" y="388" font-size="9.5" text-anchor="middle" fill="#0f766e">the shift law of 8.5 cashes the depression of 8.4 - one engine, two costumes</text>
</svg>`
}

function ferrariWalk8RSvg(): string {
  // the L5-2 solution figure: the Ferrari walk on x^4 - 25x^2 + 60x - 36 -
  // four stations down the page: the already-depressed quartic, the
  // resolvent with its rational root M = 9 (m = 3), the split into the two
  // quadratics, and the four roots. Superscripts by dy-shifted tspans
  // (ASCII-safe text); amber arrows between the stations.
  const sup = (n: string) => `<tspan dy="-5" font-size="8.5" font-weight="700">${n}</tspan><tspan dy="5" font-size="10.5"> </tspan>`
  return `<svg viewBox="0 0 720 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Ferrari walk on the quartic x to the fourth minus 25 x squared plus 60 x minus 36: four stations. Station one, the already-depressed quartic - no cube term to remove. Station two, the resolvent M cubed minus 50 M squared plus 769 M minus 3600 equals zero, whose rational root M equals 9 gives m equals 3. Station three, the split into the two quadratics x squared plus 3 x minus 18 and x squared minus 3 x plus 2, whose product re-expands to the quartic. Station four, the four roots 1, 2, 3 and minus 6, all verified by substitution.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the Ferrari walk: four stations, four roots</text>
  <rect x="70" y="44" width="580" height="44" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>
  <text x="360" y="63" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">station 1 - the quartic, already depressed (no x<tspan dy="-5" font-size="8.5">3</tspan><tspan dy="5"> </tspan>term)</text>
  <text x="360" y="80" font-size="10.5" text-anchor="middle" fill="#65a30d">x${sup('4')} - 25x${sup('2')} + 60x - 36 = 0</text>
  <path d="M360,88 L360,106" stroke="#d97706" stroke-width="1.8"/><path d="M360,112 l-5,-9 h10 z" fill="#ea580c"/>
  <rect x="70" y="116" width="580" height="44" rx="7" fill="#ffedd5" stroke="#16a34a" stroke-width="2.2"/>
  <text x="360" y="135" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">station 2 - the resolvent, rational root M = 9, so m = 3</text>
  <text x="360" y="152" font-size="10.5" text-anchor="middle" fill="#65a30d">M${sup('3')} - 50M${sup('2')} + 769M - 3600 = 0 at M = 9: 729 - 4050 + 6921 - 3600 = 0</text>
  <path d="M360,160 L360,178" stroke="#d97706" stroke-width="1.8"/><path d="M360,184 l-5,-9 h10 z" fill="#ea580c"/>
  <rect x="70" y="188" width="580" height="44" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>
  <text x="360" y="207" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">station 3 - the split: two quadratics, product = the quartic</text>
  <text x="360" y="224" font-size="10.5" text-anchor="middle" fill="#65a30d">(x${sup('2')} + 3x - 18)(x${sup('2')} - 3x + 2) re-expands to x${sup('4')} - 25x${sup('2')} + 60x - 36</text>
  <path d="M360,232 L360,250" stroke="#d97706" stroke-width="1.8"/><path d="M360,256 l-5,-9 h10 z" fill="#ea580c"/>
  <rect x="70" y="260" width="580" height="44" rx="7" fill="#ffedd5" stroke="#16a34a" stroke-width="2.2"/>
  <text x="360" y="279" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">station 4 - the four roots, each verified by substitution</text>
  <text x="360" y="296" font-size="10.5" font-weight="700" text-anchor="middle" fill="#ea580c">roots {1, 2, 3, -6} - x${sup('2')} + 3x - 18 gives 3 and -6; x${sup('2')} - 3x + 2 gives 1 and 2</text>
</svg>`
}

const lesson8R: Lesson = {
  id: 'aa-theory-of-equations-unit-8-review',
  number: '8.R',
  title: 'Unit 8 Completion Review',
  concepts: [
    'the arc: the census, the lens, the staircase, the solve, the craft, the symmetry',
    'the decision map: which question, which engine',
    'the master law table: one row per engine with its validity seat and witness',
    'the witnesses, re-audited: one verified number per lesson',
    'the traps the hall sets',
    'the mixed bench: items that price several engines at once',
    'the handoffs: chapter 9 exponentials and logarithms, the synthesis chapter, the calculus doorstep',
  ],
  objectives: [
    'hold the whole chapter in one hand — the wiring of its six engines (the census, the lens, the staircase, the solve, the craft, the symmetry), the promises made early and cashed late (8.1’s conjugate pairs cashed by 8.2’s censuses; 8.1’s multiplicity cashed by 8.3’s staircase; 8.3’s symmetric reads cashed by 8.4’s Cardan audits; 8.5’s shift law cashed backward by 8.4’s depression; 8.5’s inversion law cashed by 8.6’s palindrome; 8.2’s parity cashed by this review’s own census bench), and where each master law row lives.',
    'run the decision map at examination speed — how many roots (the census), what kind (the lens), what do the coefficients know (the staircase), solve it exactly (Cardan–Ferrari), move the roots (the craft), spot the symmetry (the palindrome) — and reach for the engine the answer points at.',
    'recall the consolidated laws without re-deriving them — each law, its validity seat and its trap — and rebuild any of them from its lesson’s engine when memory fails.',
    'solve mixed items that price several engines in one exhibit, and diagnose every miss back to its home lesson by the shape it wore.',
    'state the chapter’s honest boundaries — what was stated and not proved, which counts run over $\\mathbb{C}$ only, where the casus sends you — and the handoffs: chapter 9 "Exponentials and Logarithms", chapter 10 "The Synthesis and the Doorstep", and the calculus doorstep named, never taught here.',
  ],
  prerequisites: [
    'aa-how-many-roots-degree-n-n-roots',
    'aa-descartes-rule-of-signs',
    'aa-cubics-and-quartics-the-symmetric-functions',
    'aa-cardan-and-ferrari-the-cubic-and-quartic-solved',
    'aa-transformation-of-equations',
    'aa-reciprocal-equations',
  ],
  sources: [
    'cengage-m2-02',
    'cengage-jee-style',
    'hall-knight-higher-algebra',
    'jee-main-2026-syllabus',
    'openstax-college-algebra',
  ],
  blocks: [
    { kind: 'para', text: 'Chapter 2 banked the factor theorem and taught the quadratic its discriminant; chapter 3 built the complex field in which every quadratic closes; chapter 7 priced the coefficients of $(a+b)^{n}$ as counts. This chapter spent six lessons turning those inheritances into the polynomial’s deepest algebra — the theory of equations, Hall & Knight’s heartland, entered honestly. Lesson 8.1, "How Many Roots: Degree n, n Roots", asked the counting question first: the fundamental theorem STATED (never pretended proved), multiplicity arithmetic, and the conjugate-pair law derived from chapter 3’s algebra. Lesson 8.2, "Descartes’ Rule of Signs", gave the counting question a lens: variations bound the positive roots with an even deficit, $f(-x)$ prices the negative side, and the conjugate parity turns the bound into a census. Lesson 8.3, "Cubics and Quartics: the Symmetric Functions", read the roots backwards through the coefficients — the Viète staircase, Newton’s power sums, the reciprocal and pairwise reads, the craft of forming an equation from its roots. Lesson 8.4, "Cardan and Ferrari: the Cubic and Quartic, Solved", solved what the staircase only priced: the depression, Cardan’s $u+v$ machine with its three $\\Delta$ cases and the casus irreducibilis honesty, Ferrari’s resolvent, Sophie Germain’s identity. Lesson 8.5, "Transformation of Equations", taught the craft of moving roots without finding them — shift, scale, invert — with the loss-of-root and extraneous-root guards bolted on. Lesson 8.6, "Reciprocal Equations", closed the arc on symmetry: the palindromic structure reduced by $t = x + 1/x$ to quadratics in disguise. The room is now walked.' },
    { kind: 'para', text: 'A review in this book does two things and refuses a third. It RE-MAPS the chapter — the arc from the census to the palindrome, the promises made early and cashed late (8.1’s conjugate pairs, derived at the first storey, cashed by 8.2 as the real/non-real censuses; 8.1’s multiplicity arithmetic, cashed by 8.3 as the Viète staircase, where degree IS the $\\sigma$-counted root total; 8.3’s symmetric reads, cashed by 8.4 as Cardan’s audits, every solved cubic re-verified through its $\\sigma$’s; 8.5’s shift law, cashed backward by 8.4’s depression — one engine, two costumes; 8.5’s inversion law, cashed by 8.6 as the palindromic structure; and 8.2’s even parity, cashed by this review’s own census bench) — together with the one master law table that reunites the chapter’s six engines with their validity seats and witnesses, and the decision map that routes any question to its engine. And it runs a MIXED bench: the witnesses below deliberately price several engines in one exhibit, and the fifteen-question bench prices several storeys per item, because that is exactly how an examination prices a chapter — one machine arrives, and every reading the chapter owns is asked of it in turn. What the review refuses: re-proving what the lessons already proved. Every derivation below is one line of recall with a pointer to its lesson; nothing is re-derived that 8.1 through 8.6 established once. The engines re-ran every number on this page — and reconciled them against the chapter’s pinned witnesses — before a word of this prose was fixed.' },
    { kind: 'para', text: 'The map first, then the promise lanes, then the tables, then the witnesses, then the laws, then the traps, then the mixed bench. Read the decision diagram once before the exercises and once after: the second reading should look shorter.' },

    { kind: 'heading', text: 'The Arc: Six Engines, One Polynomial' },
    { kind: 'para', text: 'Storey one (8.1, "How Many Roots: Degree n, n Roots") asked the counting question before any formula was allowed near it. The definitions came first — a real polynomial and a complex polynomial as the chapter’s two glossary folds, then a root and a solution set — and then the fundamental theorem of algebra was STATED with the honesty this platform owes its readers: a degree-$n$ equation has exactly $n$ roots over $\\mathbb{C}$ counted with multiplicity, and this book never once pretends to prove it (the proof waits behind analysis this shelf has not built). The factor theorem rode in as the census tool — banked by chapter 2, cross-referenced and never re-taught — and the multiplicity arithmetic made the count honest: $(x-1)^{2}(x-2)^{3}$ is degree $5$ and carries exactly five roots with multiplicity, the root $1$ twice and the root $2$ three times. The conjugate-pair law was then DERIVED from chapter 3’s algebra rather than asserted — for real coefficients $P(\\bar{z}) = \\overline{P(z)}$, so every non-real root arrives with its twin — and the odd-degree corollary fell out at once: a real polynomial of odd degree has at least one real root. The witnesses: $x^{3}-x^{2}+x-1 = (x-1)(x^{2}+1)$ with exactly the three roots $\\{1, i, -i\\}$; $x^{5}+x+1$ changing sign between $-1$ and $0$; $x^{3}+x+1$ with exactly one real root, $\\approx -0.6823$.' },
    { kind: 'para', text: 'Storey two (8.2, "Descartes’ Rule of Signs") gave the census a lens that works without solving anything. The variations $V$ of the sign sequence bound the number of positive roots from above, and the DEFICIT — the difference $V$ minus the true count — is always even, conjugate parity doing the bookkeeping; the same rule run on $f(-x)$ prices the negative side; and the quadratic case was proved outright, the higher cases stated with their honesty. The censuses that follow are where 8.1’s conjugate pairs got cashed: a real cubic can have three real roots, or one real and one conjugate pair — never two non-real without the third, never a lone imaginary. The witnesses: $x^{3}-6x^{2}+11x-6$ with $V = 3$ and exactly three positive roots $\\{1,2,3\\}$, the full account; $x^{3}-7x+6$ with $V = 2$, two positive roots $\\{1,2\\}$ and (via $f(-x) = -x^{3}+7x+6$, $V = 1$) exactly one negative root $-3$; $x^{3}-x^{2}+x-1$ with $V = 3$ but only ONE positive root, the deficit $2$ paid exactly by the $\\pm i$ pair; and the cyclotomic quartic $x^{4}+x^{3}+x^{2}+x+1$ with $V = 0$ and zero real roots, all four being the 5th roots of unity.' },
    { kind: 'para', text: 'Storey three (8.3, "Cubics and Quartics: the Symmetric Functions") read the roots through the coefficients — the Viète staircase generalising chapter 2’s quadratic pair to the cubic and the quartic: $\\sigma_{k} = (-1)^{k}a_{k}/a_{0}$, the elementary symmetric functions ARE the coefficients, and the degree is the $\\sigma$-counted root total, which is 8.1’s multiplicity arithmetic cashed at full strength. Newton’s identities priced the power sums without solving anything — $p_{2} = \\sigma_{1}^{2} - 2\\sigma_{2}$, $p_{3} = \\sigma_{1}^{3} - 3\\sigma_{1}\\sigma_{2} + 3\\sigma_{3}$ — and the reciprocal and pairwise reads extended the shelf: $\\sum 1/r = \\sigma_{2}/\\sigma_{3}$, the pair products, the cubic-from-roots craft. The witnesses: the multiset $\\{1,2,3\\}$ building $x^{3}-6x^{2}+11x-6$ with $\\sigma = (6, 11, 6)$; $\\{1,2,3,4\\}$ building $x^{4}-10x^{3}+35x^{2}-50x+24$; the power sums $p_{2} = 14$ and $p_{3} = 36$ on $\\{1,2,3\\}$; the reciprocal read $\\sum 1/r = 11/6$; and the not-nice cubic $x^{3}-4x^{2}+6x-4 = (x-2)\\left((x-1)^{2}+1\\right)$ with roots $2, 1 \\pm i$ — where the symmetric reads still work: $\\sum r^{2} = 4$ by Newton, no radical ever written.' },
    { kind: 'para', text: 'Storey four (8.4, "Cardan and Ferrari: the Cubic and Quartic, Solved") solved what the staircase only priced. The depression first — substitute $x = t - a/3$ and the quadratic term vanishes — which is the shift law of 8.5 wearing its first costume; then Cardan’s $u+v$ machine with $3uv = -p$ and the discriminant $\\Delta = -4p^{3}-27q^{2}$ sorting the three cases: $\\Delta > 0$ three distinct real roots (the CASUS IRREDUCIBILIS — the formula routes through complex cube roots even though every root is real, chapter 3’s De Moivre cashed, not bypassed); $\\Delta = 0$ repeated roots, all real; $\\Delta < 0$ one real root and a conjugate pair. Ferrari’s resolvent then split the depressed quartic into two quadratics, and the Sophie Germain identity $x^{4}+4 = (x^{2}-2x+2)(x^{2}+2x+2)$ showed the special case the resolvent exists to generalise. The witnesses: the depression of $x^{3}-6x^{2}+11x-6$ to $t^{3}-t$; $x^{3}-3x+2$ with $\\Delta = 0$ and roots $\\{1, 1, -2\\}$; $x^{3}-7x+6$ with $\\Delta = 400$, the casus, $u^{3}, v^{3} = -3 \\pm \\tfrac{10}{\\sqrt{27}}i$ and the three $\\omega$-combinations landing $1, 2, -3$; $x^{3}+3x+1$ with $\\Delta = -135$ and the real root $x = \\sqrt[3]{\\tfrac{-1+\\sqrt{5}}{2}} + \\sqrt[3]{\\tfrac{-1-\\sqrt{5}}{2}} \\approx -0.3222$; Ferrari on $x^{4}-25x^{2}+60x-36$, where the resolvent $M^{3}-50M^{2}+769M-3600 = 0$ has the rational root $M = 9$, so $m = 3$, and the split $\\left(x^{2}+3x-18\\right)\\left(x^{2}-3x+2\\right)$ hands over the roots $\\{-6, 3, 1, 2\\}$; and the Bombelli 1572 note — $x^{3}-15x-4$ solved by $x = \\sqrt[3]{2+11i} + \\sqrt[3]{2-11i} = (2+i)+(2-i) = 4$, complex arithmetic producing an honest integer.' },
    { kind: 'para', text: 'Storey five (8.5, "Transformation of Equations") taught the craft of moving roots without finding them: the SHIFT law — $P(x-h)$ has the roots $r+h$, the substitution and the roots moving in opposite directions; the SCALING law — $k^{n}P(x/k)$ has the roots $kr$; the INVERSION law — $x^{n}P(1/x)$ has the roots $1/r$. The diminished-roots craft turned hard cubics transparent — decrease the roots of $x^{3}-6x^{2}+11x-6$ by $2$ and the symmetric functions become trivial — and the two guards were bolted on as derivation annexes: dividing both sides by a common factor DROPS its roots, and squaring an equation GAINS candidates the original never held. The witnesses: the roots of $\\{1,2,3\\}$ increased by $2$ giving $x^{3}-12x^{2}+47x-60$ with roots $\\{3,4,5\\}$; decreased by $2$ giving $x^{3}-x$ with roots $\\{-1, 0, 1\\}$ — the Cardan depression cross-referenced, one engine in two costumes; scaled by $3$ giving $x^{3}-18x^{2}+99x-162$ with roots $\\{3,6,9\\}$; inverted giving $1-6x+11x^{2}-6x^{3}$ with roots $\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$; the loss witness $x^{3}-x = 0$ divided by $x$ losing the root $0$; and the extraneous witness $\\sqrt{x+2} = x$ gaining the candidate $-1$, which fails the check $\\sqrt{1} = -1$.' },
    { kind: 'para', text: 'Storey six (8.6, "Reciprocal Equations") closed the arc on symmetry. A palindromic equation reads the same coefficient-forward and coefficient-backward, and the structure pays twice: divide by $x^{2}$, pair the terms $x^{k} + x^{-k}$, and the whole equation becomes a polynomial in $t = x + 1/x$ — the t-LADDER $x^{2}+\\tfrac{1}{x^{2}} = t^{2}-2$, $x^{3}+\\tfrac{1}{x^{3}} = t^{3}-3t$, $x^{4}+\\tfrac{1}{x^{4}} = t^{4}-4t^{2}+2$ doing the rewrites — which is 8.5’s inversion law cashed as symmetry. Even degree collapses to a quadratic in $t$; odd degree carries a guaranteed root ($x = -1$ for the palindromic, $x = 1$ for the anti-palindromic), the factor torn off before the ladder runs. The witnesses: $x^{4}+7x^{3}+14x^{2}+7x+1 = (x^{2}+3x+1)(x^{2}+4x+1)$, the $t$-route $t^{2}+7t+12 = (t+3)(t+4)$ returning the two reciprocal pairs $\\tfrac{-3 \\pm \\sqrt{5}}{2}$ and $-2 \\pm \\sqrt{3}$; $x^{4}-3x^{3}+4x^{2}-3x+1 = (x-1)^{2}(x^{2}-x+1)$ with roots $\\{1, 1, \\tfrac{1 \\pm i\\sqrt{3}}{2}\\}$, the complex pair being the primitive 6th roots of unity; the cubic identity $x^{3}+ax^{2}+ax+1 = (x+1)\\left(x^{2}+(a-1)x+1\\right)$; the sextic $(x-1)^{6}$ walk; and $x^{5}+x^{4}+x^{3}+x^{2}+x+1$ — the 6th roots of unity except $1$, with the guaranteed root $x = -1$ on display for the odd-degree palindrome.' },
    { kind: 'para', text: 'And under all six storeys, one ground: the FACTOR THEOREM of chapter 2 and the FUNDAMENTAL THEOREM stated at 8.1 — every engine in the chapter stands on them. The census counts roots by turning them into factors; the lens reads coefficients without solving; the staircase is the factorisation read backwards; Cardan and Ferrari verify their solutions through it; the craft moves factors without splitting them; the palindrome pairs factors that mirror. Beside that ground stand the earlier chapters this one kept citing without re-teaching: chapter 3’s complex field owns the conjugate-pair law and the $\\omega$-combinations of the casus; chapter 2’s quadratic machinery owns the two quadratics the Ferrari split and the $t$-quadratics of the palindrome; chapter 7’s coefficient algebra is the binomial’s smallest case of the symmetric functions this chapter generalised. One polynomial, six engines, and a ground of two banked theorems: that is the whole chapter in one line, and the figure below draws its promise-cashings.' },
    { kind: 'figure', caption: 'The promise-cashings of the chapter: five lanes, each running from the lesson that made an early promise to the lesson that cashed it. 8.1’s conjugate pairs — cashed by 8.2 as the real/non-real censuses. 8.1’s multiplicity — cashed by 8.3 as the Viète staircase, degree as the $\\sigma$-counted root total. 8.3’s symmetric reads — cashed by 8.4 as the Cardan audits, the $\\sigma$-verified solutions. 8.5’s shift law — cashed backward by 8.4’s depression, one engine in two costumes (the fourth lane runs right to left on purpose). 8.5’s inversion law — cashed by 8.6 as the palindromic symmetry. The six storeys sit in teaching order beneath the lanes; a sixth cashing — 8.2’s even parity — is paid by this review’s own census bench, not by a lesson.', svg: promiseCashings8RSvg() },
    { kind: 'callout', tone: 'definition', title: 'The six engines of the equation room', text: 'The chapter’s architecture, stated once as a definition. An ENGINE of this chapter is one machine that prices a family of questions about a polynomial equation: (i) the CENSUS engine — the fundamental theorem stated, multiplicity counted, the conjugate-pair law, the odd-degree corollary (8.1); (ii) the LENS engine — Descartes’ variations with their even deficit, $f(-x)$, the conjugate-parity censuses (8.2); (iii) the STAIRCASE engine — the Viète symmetric functions, Newton’s power sums, the reciprocal and pairwise reads, forming equations (8.3); (iv) the SOLVE engine — the depression, Cardan’s three $\\Delta$ cases with the casus honesty, Ferrari’s resolvent, Sophie Germain (8.4); (v) the CRAFT engine — the shift, scaling and inversion laws, the diminished-roots craft, the loss and extraneous guards (8.5); (vi) the SYMMETRY engine — the palindromic structure, the $t$-substitution with its ladder, the even/odd degree fork (8.6). Thus every question this chapter answers is two questions in disguise: which question is this, and which engine owns it.' },

    { kind: 'heading', text: 'The Master Tables Reunited' },
    { kind: 'para', text: 'Strip the chapter of its prose and two tables remain — the two the examinations actually price. The first is the master law table: one row per engine, the statement in one line, the validity seat (where the row holds, and where it stops holding), and the verified witness that pins it — every witness re-run against its home lesson by the review’s engines before this prose was written, not a memory transcribed. The second is compact on purpose: the chapter’s three HONESTY GUARDS, the places where this book says what it is NOT claiming — the stated-not-proved status of the fundamental theorem, the casus irreducibilis, and the two root guards. Above both sits the decision map — the figure below — whose six questions route any item of the bench to its engine: how many roots, what kind are they, what do the coefficients know, solve it exactly, move the roots, spot the symmetry.' },
    { kind: 'table', caption: 'The law family in one census — one row per engine of the chapter: the statement, its validity seat, and the verified witness that pins it. Every row cross-checked against its home lesson by the review’s engines before this prose was written.', head: ['Engine (lesson)', 'The statement, one line', 'The validity seat', 'A verified witness'], rows: [
      ['the census (8.1)', 'a degree-$n$ equation has exactly $n$ roots over $\\mathbb{C}$, multiplicity counted', 'over $\\mathbb{C}$ — over $\\mathbb{R}$ the count may fall, and only by conjugate pairs', '$x^{3}-x^{2}+x-1 = (x-1)(x^{2}+1)$: exactly $\\{1, i, -i\\}$; $(x-1)^{2}(x-2)^{3}$: five roots with multiplicity'],
      ['the lens (8.2)', 'the variations $V$ bound the positive roots; the deficit $V - \\#\\text{positive}$ is even; $f(-x)$ prices the negative side', 'a bound, never a count; real coefficients; parity from the conjugate law', '$x^{3}-6x^{2}+11x-6$: $V = 3$, three positive $\\{1,2,3\\}$; $x^{3}-x^{2}+x-1$: $V = 3$, one positive, deficit $2$ (the $\\pm i$ pair)'],
      ['the staircase (8.3)', '$\\sigma_{k} = (-1)^{k}a_{k}/a_{0}$ — the roots’ elementary symmetric functions ARE the coefficients; Newton prices the power sums', 'monic, or normalised by $a_{0}$; $\\sigma$-counted roots (multiplicity in, the 8.1 cashing)', '$\\{1,2,3\\} \\to x^{3}-6x^{2}+11x-6$ with $\\sigma = (6, 11, 6)$; $p_{2} = 14$, $p_{3} = 36$; $\\sum 1/r = 11/6$'],
      ['the solve (8.4)', 'depress $x = t - a/3$; Cardan $x = u+v$ with $3uv = -p$; $\\Delta = -4p^{3}-27q^{2}$ sorts the three cases; Ferrari’s resolvent splits the quartic', '$\\Delta$’s three cases; the casus routes through $\\mathbb{C}$ even when all roots are real', '$x^{3}-7x+6$: $\\Delta = 400$, the casus, roots $1, 2, -3$; $x^{3}+3x+1$: $\\Delta = -135$, $x \\approx -0.3222$; Ferrari’s $M = 9$ on $x^{4}-25x^{2}+60x-36$'],
      ['the craft (8.5)', '$P(x-h)$ has the roots $r+h$; $k^{n}P(x/k)$ the roots $kr$; $x^{n}P(1/x)$ the roots $1/r$', 'any shift, scale or invert — but the substitution moves OPPOSITE to the roots; the guards ride every move', 'increased by $2$: $x^{3}-12x^{2}+47x-60$, roots $\\{3,4,5\\}$; inverted: $1-6x+11x^{2}-6x^{3}$, roots $\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$'],
      ['the symmetry (8.6)', 'palindromic $\\Rightarrow$ divide by $x^{2}$, pair the terms, read $t = x + 1/x$; even degree $\\to$ a quadratic in $t$; odd degree $\\to$ a guaranteed root', 'the palindrome must be exact; each $t$ returns TWO $x$ values ($x^{2} - tx + 1 = 0$)', '$x^{4}+7x^{3}+14x^{2}+7x+1$: $t^{2}+7t+12$, four roots in two reciprocal pairs, $\\tfrac{-3 \\pm \\sqrt{5}}{2}$ and $-2 \\pm \\sqrt{3}$'],
    ] },
    { kind: 'table', caption: 'The three honesty guards — compact on purpose: the places where the chapter says exactly what it is NOT claiming. Each guard is a lesson’s discipline, and each is cross-checkable against that lesson’s own honesty box.', head: ['The guard', 'What is honestly NOT claimed', 'The pinned witness'], rows: [
      ['the fundamental theorem (8.1)', 'STATED, never proved in this book — the counting law is used as a banked fact; the proof waits behind analysis this shelf has not built', 'the census still runs: $x^{3}+x+1$ has exactly one real root $\\approx -0.6823$, the other two being the conjugate pair'],
      ['the casus irreducibilis (8.4)', 'three real roots with the formula routed through complex cube roots — a real answer need not have a real-looking formula; the "complex $\\Delta$ = no real roots" misread is FALSE', '$x^{3}-7x+6$: $\\Delta = 400 > 0$, three real roots, $u^{3}, v^{3} = -3 \\pm \\tfrac{10}{\\sqrt{27}}i$'],
      ['the two root guards (8.5)', 'dividing by a common factor DROPS its roots; squaring GAINS candidates the original never held — the audit before the answer, both annexes', 'the loss witness $x^{3}-x = 0$ divided by $x$ losing the root $0$; the extraneous witness $\\sqrt{x+2} = x$ gaining $-1$'],
    ] },
    { kind: 'figure', caption: 'The decision map of the chapter: six questions asked in order, each routing to the engine that owns it. How many roots — the census of 8.1, $n$ roots over $\\mathbb{C}$ with multiplicity in. What kind are they — Descartes’ lens of 8.2, variations bounding the positive roots with an even deficit. What do the coefficients know — the staircase of 8.3, the symmetric functions $\\sigma_{1}, \\sigma_{2}, \\sigma_{3}$. Solve it exactly — Cardan and Ferrari of 8.4, the discriminant, the resolvent, the split. Move the roots — the craft of 8.5, roots shifted, scaled, inverted. Spot the symmetry — the palindrome of 8.6, the substitution $t = x + 1/x$ with two $x$ per $t$. Under all six engines runs the ground bar: the factor theorem of chapter 2 plus the fundamental theorem — every engine stands on them. Name the question first; reach for the engine second.', svg: decisionMap8RSvg() },
    { kind: 'callout', tone: 'theorem', title: 'The one discipline behind the tables', text: 'Every row of both tables is the same move in a different dress: NAME THE QUESTION, THEN SIT THE LAW IN ITS VALIDITY SEAT. The census counts over $\\mathbb{C}$ — pull it to $\\mathbb{R}$ and the count may fall, but only by whole conjugate pairs. The lens bounds — it never counts, and its deficit is paid in pairs. The staircase reads coefficients — but $\\sigma$-counted roots, multiplicity in, or the degree itself will not balance. The solve sorts by $\\Delta$ — three cases, one of which wears complex clothes over real roots. The craft moves roots — with the substitution running opposite to the roots, and the two guards riding along. The symmetry halves the degree — but every $t$ must be returned to its two $x$ values. Proved once in its lesson, recalled in one line here — the refusal discipline working for you as a map.' },
    { kind: 'callout', tone: 'insight', title: 'Which table answers which question', text: 'The working rule the chapter earned, stated once for the room: under examination pressure read the DECISION MAP first — run its six questions in order (how many, what kind, what do the coefficients know, solve it, move it, spot the symmetry) — then pull the master law row for the statement, the validity seat and the trap, then run. The map is the diagnosis instrument too: a missed item names its engine by the shape it wore, which is why the bench below is graded by MIXED shapes, not by lesson — the hall does not label its items by lesson either.' },

    { kind: 'heading', text: 'The Witnesses, Re-Audited' },
    { kind: 'para', text: 'Twenty exhibits carried the chapter’s weight — at least three from every storey — and a review earns its keep by re-auditing them TOGETHER: each line below is one verified number, re-computed by the engines and reconciled against the master plan’s pinned witnesses before a word of this prose was fixed, and each now prices more than the storey that introduced it. Read the roster once as a census of the chapter’s honesty: every law on the master table carries at least one of these numbers on its back.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $x^{3}-x^{2}+x-1 = (x-1)(x^{2}+1)$, exactly the three roots $\\{1, i, -i\\}$ — 8.1’s census witness, the whole fundamental theorem in one factorisation;',
      '(ii) $(x-1)^{2}(x-2)^{3}$: degree $5$, exactly five roots with multiplicity ($1$ twice, $2$ three times) — 8.1’s multiplicity arithmetic;',
      '(iii) $x^{5}+x+1$ changes sign between $-1$ and $0$; $x^{3}+x+1$ has exactly one real root $\\approx -0.6823$ — 8.1’s odd-degree corollary and its honest count;',
      '(iv) $x^{3}-6x^{2}+11x-6$: $V = 3$, three positive roots $\\{1,2,3\\}$, deficit $0$ — 8.2’s full-account witness;',
      '(v) $x^{3}-7x+6$: $V = 2$, positive $\\{1,2\\}$; $f(-x) = -x^{3}+7x+6$ has $V = 1$ and the one negative root $-3$ — 8.2’s both-sides census;',
      '(vi) $x^{3}-x^{2}+x-1$: $V = 3$ but only ONE positive root, the deficit $2$ paid by the $\\pm i$ pair — 8.2’s even-deficit witness;',
      '(vii) $x^{4}+x^{3}+x^{2}+x+1$: $V = 0$ and zero real roots — the four roots are the 5th roots of unity $e^{2\\pi ik/5}$, $k = 1, \\ldots, 4$ — 8.2’s parity witness;',
      '(viii) $\\{1,2,3\\} \\to x^{3}-6x^{2}+11x-6$ with $\\sigma = (6, 11, 6)$ — 8.3’s cubic staircase;',
      '(ix) $\\{1,2,3,4\\} \\to x^{4}-10x^{3}+35x^{2}-50x+24$ — 8.3’s quartic staircase, $\\sigma_{3} = 50$ the triple-product sum;',
      '(x) $p_{2} = 14$, $p_{3} = 36$ on $\\{1,2,3\\}$, and $\\sum 1/r = 11/6 = \\sigma_{2}/\\sigma_{3}$ — 8.3’s Newton and reciprocal reads;',
      '(xi) $x^{3}-4x^{2}+6x-4 = (x-2)\\left((x-1)^{2}+1\\right)$: roots $2, 1 \\pm i$, and $\\sum r^{2} = 4$ with no radical written — 8.3’s not-nice cubic;',
      '(xii) $x^{3}-6x^{2}+11x-6$ depressed by $x = t+2$ to $t^{3}-t$, roots $\\{-1,0,1\\}$ — 8.4’s depression, 8.5’s shift law in costume;',
      '(xiii) $x^{3}-3x+2$: $\\Delta = 0$, roots $\\{1, 1, -2\\}$ — 8.4’s repeated case;',
      '(xiv) $x^{3}-7x+6$: $\\Delta = 400$, the casus, $u^{3}, v^{3} = -3 \\pm \\tfrac{10}{\\sqrt{27}}i$, the three $\\omega$-combinations landing $1, 2, -3$ — 8.4’s honesty witness;',
      '(xv) $x^{3}+3x+1$: $\\Delta = -135$, $x = \\sqrt[3]{\\tfrac{-1+\\sqrt{5}}{2}} + \\sqrt[3]{\\tfrac{-1-\\sqrt{5}}{2}} \\approx -0.3222$ — 8.4’s one-real-root case;',
      '(xvi) Ferrari on $x^{4}-25x^{2}+60x-36$: resolvent root $M = 9$, $m = 3$, split $\\left(x^{2}+3x-18\\right)\\left(x^{2}-3x+2\\right)$, roots $\\{-6, 3, 1, 2\\}$ — 8.4’s quartic solve;',
      '(xvii) $x^{4}+4 = (x^{2}-2x+2)(x^{2}+2x+2)$ — 8.4’s Sophie Germain identity; and Bombelli’s $x^{3}-15x-4 = 0$ solved by $x = 4$ through $\\sqrt[3]{2+11i} + \\sqrt[3]{2-11i}$ — the 1572 note;',
      '(xviii) roots of $x^{3}-6x^{2}+11x-6$ increased by $2$: $x^{3}-12x^{2}+47x-60$, roots $\\{3,4,5\\}$; decreased by $2$: $x^{3}-x$; scaled by $3$: $x^{3}-18x^{2}+99x-162$; inverted: $1-6x+11x^{2}-6x^{3}$ — 8.5’s three laws on one roster;',
      '(xix) the guards: $x^{3}-x = 0$ divided by $x$ loses the root $0$, and $\\sqrt{x+2} = x$ gains the candidate $-1$ — 8.5’s two annexes;',
      '(xx) $x^{4}+7x^{3}+14x^{2}+7x+1 = (x^{2}+3x+1)(x^{2}+4x+1)$: the $t$-route $t^{2}+7t+12$ returns $\\tfrac{-3 \\pm \\sqrt{5}}{2}$ and $-2 \\pm \\sqrt{3}$; $x^{4}-3x^{3}+4x^{2}-3x+1 = (x-1)^{2}(x^{2}-x+1)$ with the primitive 6th pair $\\tfrac{1 \\pm i\\sqrt{3}}{2}$; and $x^{5}+x^{4}+x^{3}+x^{2}+x+1$ — the 6th roots of unity except $1$ — 8.6’s palindrome census.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'How the witnesses interlock', text: 'The twenty exhibits are not twenty problems — they are the chapter wearing twenty costumes. Witnesses (i), (vi) and (vii) are the same conjugate law censused three ways; (ii) and (viii) are the same multiplicity arithmetic, once counted and once read through $\\sigma$; (x) and (xv) are the same power-sum discipline pricing a nice roster and an ugly root; (xii) and (xviii) are the SAME shift — the depression of 8.4 and the diminished roots of 8.5, one engine in two costumes; (xiv) and (xvii) are the chapter’s two honesty notes about complex numbers producing real answers; (xvi) and (xx) are the two quadratic collapses, Ferrari’s resolvent and the palindromic $t$, both handing the quartic to chapter 2’s machinery; (xix) is the audit the whole room runs before any answer is banked. The hall’s mixed items run exactly this game: hand you one machine and bill you for several storeys at once — and the diagnosis runs the same direction, a miss on a mixed item naming its home lesson by its shape.' },

    { kind: 'heading', text: 'The Laws Worth Recalling' },
    { kind: 'para', text: 'The chapter deposited its formula shelf lesson by lesson — the census and the conjugate law in 8.1, the lens in 8.2, the staircases and Newton in 8.3, the $\\Delta$ cases and the resolvent in 8.4, the three transformation laws and the guards in 8.5, the $t$-ladder in 8.6 — and the reader’s formula-sheet page aggregates them automatically. Nine of them are load-bearing: the consolidated laws the next chapters will actually reach for, each re-verified against its lesson by the review’s engines before this page was written. The laws in display, then the cards, then the one-line recall derivation, then the vocabulary:' },
    { kind: 'equation', latex: '\\text{degree } n \\text{ has exactly } n \\text{ roots over } \\mathbb{C} \\text{ (multiplicity in)}; \\qquad P(\\bar{z}) = \\overline{P(z)} \\;\\text{for real coefficients} \\tag{1}', note: 'the fundamental theorem (stated, never proved here) beside the conjugate-pair law (derived from chapter 3’s algebra in 8.1) — together they force the non-real count even and every odd-degree real polynomial onto at least one real root.' },
    { kind: 'equation', latex: 'x^{3} - \\sigma_{1}x^{2} + \\sigma_{2}x - \\sigma_{3}; \\qquad x^{4} - \\sigma_{1}x^{3} + \\sigma_{2}x^{2} - \\sigma_{3}x + \\sigma_{4}; \\qquad p_{2} = \\sigma_{1}^{2} - 2\\sigma_{2}, \\; p_{3} = \\sigma_{1}^{3} - 3\\sigma_{1}\\sigma_{2} + 3\\sigma_{3} \\tag{2}', note: 'the Viète staircases with Newton’s first two power sums — the coefficients ARE the roots’ symmetric functions, the 8.1 multiplicity cashing that makes degree the $\\sigma$-counted root total.' },
    { kind: 'equation', latex: 't^{3} + pt + q = 0: \\quad x = u + v, \\; 3uv = -p; \\qquad \\Delta = -4p^{3} - 27q^{2} \\tag{3}', note: 'Cardan’s machine on the depressed cubic — $u^{3}, v^{3} = -\\tfrac{q}{2} \\pm \\sqrt{\\tfrac{q^{2}}{4} + \\tfrac{p^{3}}{27}}$ — with $\\Delta$ sorting the three cases: $400$ (three real, the casus), $0$ (repeated), $-135$ (one real).' },
    { kind: 'equation', latex: 'P(x-h): \\; \\text{roots } r + h; \\qquad k^{n}P(x/k): \\; \\text{roots } kr; \\qquad x^{n}P(1/x): \\; \\text{roots } 1/r \\tag{4}', note: 'the three transformation laws of 8.5 — the substitution moves OPPOSITE to the roots; the witnesses $x^{3}-12x^{2}+47x-60$ ($\\{3,4,5\\}$), $x^{3}-18x^{2}+99x-162$ ($\\{3,6,9\\}$), $1-6x+11x^{2}-6x^{3}$ ($\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$).' },
    { kind: 'equation', latex: 't = x + \\tfrac{1}{x}: \\; x^{2} + \\tfrac{1}{x^{2}} = t^{2} - 2, \\quad x^{3} + \\tfrac{1}{x^{3}} = t^{3} - 3t, \\quad x^{4} + \\tfrac{1}{x^{4}} = t^{4} - 4t^{2} + 2 \\tag{5}', note: 'the $t$-ladder of 8.6 — the palindromic structure halved to a quadratic in $t$ at even degree, with the guaranteed root torn off first at odd degree; every $t$ returns TWO $x$ through $x^{2} - tx + 1 = 0$.' },
    { kind: 'formula', name: 'The fundamental theorem (stated)', latex: 'a_{0}x^{n} + a_{1}x^{n-1} + \\cdots + a_{n} = 0 \\; (a_{0} \\neq 0) \\;\\text{ has exactly } n \\text{ roots over } \\mathbb{C} \\text{, multiplicity in}', note: 'stated, never proved in this book — the honesty note of 8.1; the census witness $x^{3}-x^{2}+x-1$ carrying exactly $\\{1, i, -i\\}$, and $(x-1)^{2}(x-2)^{3}$ carrying five roots with multiplicity.' },
    { kind: 'formula', name: 'The conjugate-pair law', latex: 'P(\\bar{z}) = \\overline{P(z)}; \\qquad \\text{non-real roots come in pairs } z, \\bar{z}; \\qquad \\text{odd degree} \\Rightarrow \\text{at least one real root}', note: 'derived from chapter 3’s algebra in 8.1; the non-real count is always even — Q1’s answer — and the odd-degree corollary is what $x^{5}+x+1$’s sign change cashes.' },
    { kind: 'formula', name: 'Descartes’ rule and the deficit', latex: 'V \\geq \\#\\text{positive roots}, \\quad V - \\#\\text{positive even}; \\qquad V(f(-x)) \\;\\text{ prices the negative side}', note: 'a BOUND, never a count (8.2); $x^{3}-6x^{2}+11x-6$: $V = 3$ with three positive, deficit $0$; $x^{3}-x^{2}+x-1$: $V = 3$, one positive, deficit $2$ — the $\\pm i$ pair.' },
    { kind: 'formula', name: 'The cubic Viète staircase', latex: 'x^{3} + a_{1}x^{2} + a_{2}x + a_{3} = 0: \\quad \\sigma_{1} = -a_{1}, \\; \\sigma_{2} = a_{2}, \\; \\sigma_{3} = -a_{3}; \\qquad \\sigma_{k} = \\tfrac{(-1)^{k}a_{k}}{a_{0}}', note: 'sum, pair-sum, product (8.3); $\\{1,2,3\\} \\to \\sigma = (6, 11, 6)$; the reciprocal read $\\sum 1/r = \\sigma_{2}/\\sigma_{3} = 11/6$ rides the same shelf.' },
    { kind: 'formula', name: 'The quartic Viète staircase', latex: 'x^{4} + a_{1}x^{3} + a_{2}x^{2} + a_{3}x + a_{4} = 0: \\; \\sigma_{1} = -a_{1}, \\; \\sigma_{2} = a_{2}, \\; \\sigma_{3} = -a_{3}, \\; \\sigma_{4} = a_{4}', note: 'the four symmetric functions (8.3); $\\{1,2,3,4\\} \\to x^{4}-10x^{3}+35x^{2}-50x+24$ with $\\sigma_{3} = 50 = 6+8+12+24$, the triple-product sum.' },
    { kind: 'formula', name: 'Cardan’s discriminant and the three cases', latex: 't^{3} + pt + q = 0: \\quad \\Delta = -4p^{3} - 27q^{2}; \\quad \\Delta > 0 \\text{ three real (casus)}, \\; \\Delta = 0 \\text{ repeated}, \\; \\Delta < 0 \\text{ one real}', note: 'the sign convention runs OPPOSITE the quadratic instinct (8.4): witnesses $\\Delta = 400$ (three real, the casus), $\\Delta = 0$ on $x^{3}-3x+2$ ($\\{1,1,-2\\}$), $\\Delta = -135$ on $x^{3}+3x+1$ ($x \\approx -0.3222$).' },
    { kind: 'formula', name: 'Ferrari’s resolvent', latex: 'x^{4} + px^{2} + qx + r = 0: \\quad M^{3} + 2pM^{2} + (p^{2} - 4r)M - q^{2} = 0; \\quad m = \\sqrt{M}; \\; (x^{2} + mx + \\alpha)(x^{2} - mx + \\beta)', note: 'the depressed quartic split by the resolvent’s root (8.4); on $x^{4}-25x^{2}+60x-36$: $M = 9$, $m = 3$, the split $\\left(x^{2}+3x-18\\right)\\left(x^{2}-3x+2\\right)$, roots $\\{-6, 3, 1, 2\\}$.' },
    { kind: 'formula', name: 'The three transformation laws', latex: 'P(x-h): \\; \\text{roots } r + h; \\qquad k^{n}P\\left(\\tfrac{x}{k}\\right): \\; \\text{roots } kr; \\qquad x^{n}P\\left(\\tfrac{1}{x}\\right): \\; \\text{roots } \\tfrac{1}{r}', note: 'the craft of 8.5; the shift moves the substitution OPPOSITE the roots — increase by $2$ means $P(x-2)$; the guards: divide by a factor and you lose its roots, square and you gain candidates.' },
    { kind: 'formula', name: 'The t-substitution', latex: 't = x + \\tfrac{1}{x}; \\quad x^{2} + \\tfrac{1}{x^{2}} = t^{2} - 2; \\quad x^{3} + \\tfrac{1}{x^{3}} = t^{3} - 3t; \\quad x^{4} + \\tfrac{1}{x^{4}} = t^{4} - 4t^{2} + 2', note: 'the palindrome ladder (8.6); each $t$ returns two $x$ through $x^{2} - tx + 1 = 0$ — on $x^{4}+7x^{3}+14x^{2}+7x+1$: $t^{2}+7t+12$, the pairs $\\tfrac{-3 \\pm \\sqrt{5}}{2}$ and $-2 \\pm \\sqrt{3}$.' },
    { kind: 'derivation', title: 'The conjugate-pair law, recalled in one line', statement: 'For a polynomial with real coefficients, $P(\\bar{z}) = \\overline{P(z)}$ — recalled from 8.1 and chapter 3’s algebra; each step one line with its pointer, nothing re-derived.', steps: [
      { label: 'The evaluation', formula: 'P(\\bar{z}) = \\overline{P(z)}', explanation: 'each term $a_{k}\\bar{z}^{k}$ conjugates to $\\overline{a_{k}} \\cdot \\overline{z}^{k} = a_{k}\\bar{z}^{k}$ because the coefficients are REAL — chapter 3’s conjugation arithmetic $(\\overline{zw} = \\bar{z}\\bar{w})$, swept numerically by the engines on three test points before this page was written.' },
      { label: 'The root read', formula: 'P(\\alpha) = 0 \\;\\Rightarrow\\; P(\\bar{\\alpha}) = \\overline{P(\\alpha)} = 0', explanation: 'so every non-real root arrives with its conjugate twin — 8.1’s derivation; the census witness $x^{3}-x^{2}+x-1$ carrying the pair $\\{i, -i\\}$ beside the lone real root $1$.' },
      { label: 'The census corollary', formula: '\\#\\text{non-real} \\text{ is even}; \\qquad \\deg \\text{ odd} \\Rightarrow \\text{at least one real root}', explanation: 'conjugate pairs consume seats two at a time, so the non-real count is even and the real count has the parity of the degree — 8.1’s corollary, 8.2’s parity engine, and the first quiz question’s answer, all one line of algebra.' },
    ], result: '$P(\\bar{z}) = \\overline{P(z)}$ — roots in conjugate pairs; $\\qquad$ the non-real count even; $\\qquad$ odd degree forces at least one real root' },
    { kind: 'terms', items: [
      { term: 'The decision map', def: 'the six questions asked in order — how many roots, what kind are they, what do the coefficients know, solve it exactly, move the roots, spot the symmetry — that route any equation question to the engine that owns it.' },
      { term: 'The validity seat', def: 'where a law holds and where it stops: the census counts over $\\mathbb{C}$ only; the lens bounds but never counts; the $\\sigma$’s demand multiplicity-in root counts; $\\Delta$’s three cases carry the casus; each $t$ returns two $x$.' },
      { term: 'The casus irreducibilis', def: 'the $\\Delta > 0$ case of the depressed cubic: three real roots whose Cardan formula routes through complex cube roots — a real answer need not have a real-looking formula, chapter 3’s De Moivre cashed honestly.' },
      { term: 'The diminished-roots craft', def: '8.5’s shift law at work — form the equation whose roots are $r - h$ by substituting $x + h$ for $x$, turning hard cubics transparent (the depression of 8.4 is the same craft in costume).' },
      { term: 'The t-ladder', def: 'the rewrites $x^{2} + \\tfrac{1}{x^{2}} = t^{2}-2$, $x^{3} + \\tfrac{1}{x^{3}} = t^{3}-3t$, $x^{4} + \\tfrac{1}{x^{4}} = t^{4}-4t^{2}+2$ — the palindromic engine of 8.6, with each $t$ returning two $x$ values.' },
      { term: 'The conjugate-pair census', def: 'counting a real polynomial’s roots as real and non-real with the pair law’s parity — the non-real count even, the real count carrying the degree’s parity; the cashing of 8.2 that this review’s own bench prices.' },
      { term: 'The mixed bench', def: 'the review’s discipline of pricing several engines in one exhibit — the way an examination actually prices a chapter: one machine arrives, and every reading the chapter owns is asked of it in turn.' },
      { term: 'The promise-cashing', def: 'the chapter’s wiring discipline: machinery built early and used late — conjugate pairs to the censuses, multiplicity to the staircase, symmetric reads to the Cardan audits, the shift law to the depression, the inversion law to the palindrome.' },
    ] },

    { kind: 'heading', text: 'The Traps the Hall Sets' },
    { kind: 'para', text: 'The chapter’s own caution shelf, compressed to the seven traps the examination hall actually sets — each is one lesson’s discipline pointed at one wrong instinct, each is cross-checkable against that lesson’s own caution box, and every witness number below was re-run by the review’s engines before this page was written:' },
    { kind: 'list', items: [
      'The stated-not-proved honesty (8.1): the fundamental theorem is stated, not proved, and this book says so in the open — any "proof" offered at this shelf’s depth would smuggle in analysis the book has not built. The honest move under examination pressure is the same one 8.1 made: USE the count, label it as stated, and let the census witnesses ($\\{1, i, -i\\}$) carry the arithmetic.',
      'The "exactly $n$ REAL roots" misread (8.1/8.2): the theorem counts over $\\mathbb{C}$ — a real cubic has three real roots OR one real and one conjugate pair, never three-real-minus-a-bit; the count $\\#\\text{real} = n - \\#\\text{non-real}$ falls only by twos. $x^{3}-x^{2}+x-1$ has ONE real root, and that is the full and honest account.',
      'The casus misread (8.4): "$\\Delta$ positive, so the roots are complex" — FALSE, and backwards: $\\Delta = 400 > 0$ on $x^{3}-7x+6$ is exactly the case of THREE real roots, the formula routed through $-3 \\pm \\tfrac{10}{\\sqrt{27}}i$. The sign convention runs opposite the quadratic instinct; say the three cases aloud before touching the formula.',
      'Cancelling mid-solve (8.5): dividing $x^{3}-x = 0$ by $x$ loses the root $0$ — divide by a common factor and you drop its roots from the solution set; factor it out ($x(x^{2}-1)$) and every root survives. And the mirror trap: squaring $\\sqrt{x+2} = x$ gains the candidate $-1$, which fails the original — the audit runs BEFORE the answer is banked.',
      'The $t$-return (8.6): each value of $t$ is TWO values of $x$ — $t = -3$ returns the pair $\\tfrac{-3 \\pm \\sqrt{5}}{2}$ through $x^{2}+3x+1 = 0$, not one root; a quartic in palindromic dress has FOUR roots in two reciprocal pairs, and forgetting the return halves the answer.',
      'The transformation direction flip (8.5): $P(x-h)$ has the roots $r + h$ — the substitution and the roots move in OPPOSITE directions; "increase the roots by $2$" means substitute $x - 2$, and the depression’s $x = t+2$ moves the roots DOWN by $2$. Write one witness seat ($P(\\text{new})$ at $r+h$) before trusting the sign.',
      'Multiplicity forgotten (8.1/8.3): degree is the $\\sigma$-counted root total — $(x-1)^{2}(x-2)^{3}$ is a degree-$5$ equation with five roots, not two; a "three roots" answer to a cubic with a repeated factor has counted the seats, not the roots. The staircase demands multiplicity in, or the $\\sigma$’s will not balance the degree.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The one warning that carries forward', text: 'A root count without its field named is a guess — and this chapter’s engines are now load-bearing for the rest of the book. Chapter 9 "Exponentials and Logarithms" inherits the transformation discipline directly: every exponent equation that hides a quadratic will be read as a polynomial equation in a new variable, and the loss/extraneous guards of 8.5 are the exact discipline its log equations will need (the domain audit IS the extraneous audit). The synthesis chapter prices the whole shelf at competition speed; the calculus doorstep will ask for the polynomial’s rate story with multiplicity in hand. Carry the decision map’s six questions into all three — they are the one habit every later chapter prices, and the one the hall never stops testing.' },

    { kind: 'heading', text: 'The Chapter Closes' },
    { kind: 'para', text: 'And so the chapter closes. Chapter 2 handed this book the factor theorem and the quadratic’s discriminant; chapter 3 handed it the complex field; the book returned the theory of equations: six engines that count, type, read, solve, move and pair a polynomial’s roots — the census, the lens, the staircase, the solve, the craft and the symmetry, every law seated in its validity condition, every solve re-verified through its $\\sigma$’s, every transformation audited for loss and gain. What began as "how many roots does a degree-$n$ equation have" ends as a decision made in seconds: how many — the census; what kind — the lens; what do the coefficients know — the staircase; solve it exactly — Cardan and Ferrari; move the roots — the craft; spot the symmetry — the palindrome; and underneath all six, the factor theorem and the fundamental theorem holding the ground. The honest map of what was named but deferred: chapter 9 "Exponentials and Logarithms" — the next unit, named here as planned — takes the transformation craft into non-polynomial territory and inherits the extraneous-root audit wholesale; chapter 10 "The Synthesis and the Doorstep" — the book’s closing synthesis, named as planned — gathers this chapter’s engines into the competition craft across all the families; and the calculus doorstep (the polynomial’s rate story — named, never taught here) will want the multiplicity arithmetic this chapter banked. All named, none cashed early.' },
    { kind: 'para', text: 'Use the review honestly and it will diagnose you. Attempt the mixed bench WITHOUT looking back at the lessons; every miss names its home lesson by its shape — a miscounted root census or a forgotten multiplicity sends you to 8.1, a violated deficit or a mishandled $f(-x)$ to 8.2, an unbalanced $\\sigma$ or a missed Newton read to 8.3, a misread $\\Delta$ case or an unresolved resolvent to 8.4, a direction flip or a lost root to 8.5, a forgotten $t$-return or a missed palindrome to 8.6. The five quiz questions price five engines — one conjugate census, one variations count, one staircase read, one $\\Delta$ case, one palindrome route; the bench takes the rest. Score them honestly, revisit exactly what the misses name, and the room is yours — and when chapter 9 hides a quadratic inside an exponent, you will recognise the shape: you priced it.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the honest coverage audit', text: 'The audit, stated once for the whole chapter: the banked JEE (Main) 2026 mathematics unit list carries NO standalone "theory of equations" unit — the honest reading is that this chapter’s topics ride the neighbourhood of unit 2 (complex numbers and quadratic equations, with its roots-coefficients band) and the binomial unit’s coefficient algebra; the full classical machinery — Cardan and Ferrari’s solves, Descartes’ complete rule with the even-deficit census, the transformation craft, the reciprocal equations — is classic-canonical Hall & Knight territory, the tradition the Cengage modules themselves descend from, and the harder papers price it exactly there: as the machinery behind the roots-coefficients and cubic-identity items the syllabus DOES carry. The school canon nearest this unit is NCERT class 11’s "Complex Numbers and Quadratic Equations" chapter — the fundamental theorem’s statement, the conjugate pairs and the quadratic’s root-coefficient reads are its home ground, and this chapter walked past it into the classic depth honestly. The registers the six lessons drilled, re-priced by this bench: 8.1 root-census and multiplicity items, 8.2 variation counts and real/non-real censuses, 8.3 $\\sigma$-reads and form-the-equation items, 8.4 $\\Delta$-case and solve-completely items (the Ferrari walk priced at L5), 8.5 transformation items with the two guards, 8.6 palindromic reduces. The items in this review are exam-style — our own constructions on those registers, honestly labelled; no past-paper text is reproduced, and every number above was generated and verified by this book’s own engines before a word of the prose was fixed.' },
    { kind: 'callout', tone: 'insight', title: 'What this chapter actually built', text: 'One sentence: the chapter took two banked theorems (the factor theorem, the stated fundamental theorem) and built the polynomial’s ROOT ALGEBRA on top of them — counting the roots, typing them, reading them through the coefficients, solving for them exactly, moving them without finding them, and pairing them through symmetry. Every count runs over $\\mathbb{C}$ and drops to $\\mathbb{R}$ only by conjugate pairs; every read is a symmetric function; every solve is a depression plus one machine (Cardan’s pair or Ferrari’s resolvent), each re-verified through the $\\sigma$’s it depressed; every transformation is one substitution law with two guards; every palindrome is the inversion law meeting the $t$-ladder. The six cashes — the censuses, the staircase, the Cardan audits, the depression, the palindrome, this bench — re-used each other’s machinery without re-proving it, which is what makes this a chapter rather than six lessons. A reader who can run the decision map’s six questions at examination speed owns the whole shelf at once — and hands the next chapter its ground.' },

    { kind: 'quiz', title: 'Check yourself — the chapter in five questions', items: [
      { q: 'The number of non-real roots of a polynomial with real coefficients is always', options: ['even', 'odd', 'a multiple of 3', 'zero'], answer: 0, explain: 'The conjugate-pair law of 8.1: $P(\\bar{z}) = \\overline{P(z)}$, so every non-real root arrives with its twin and the seats are consumed two at a time (option A) — the parity that 8.2’s censuses and this review’s bench ride. Option B fails on the very first witness: $x^{3}-x^{2}+x-1$ has TWO non-real roots ($\\pm i$), an even number, as every real-coefficient exhibit in the chapter confirms. Option C invents a constraint no law gives — $x^{4}+x^{3}+x^{2}+x+1$ has four non-real roots, not a multiple of three. Option D is the cubic-only accident read as a law: a real cubic can carry a non-real pair ($\\pm i$ above), so "zero" is one possible value, never an always.' },
      { q: 'For $x^{3} - 6x^{2} + 11x - 6 = 0$, the variations of signs and the positive roots are', options: ['3 variations, 3 positive', '2 variations, 3 positive', '3 variations, 2 positive', '1 variation, 1 positive'], answer: 0, explain: 'The sign sequence $+, -, +, -$ changes at every seat: $V = 3$, and the roots are exactly $\\{1, 2, 3\\}$ — three positive roots, the deficit $0$ (option A), 8.2’s full-account witness. Option B breaks the bound itself: three positive roots can never coexist with only two variations, the rule’s ceiling. Option C is the deficit trap run backwards — the deficit must be EVEN, so $3 - 2 = 1$ is impossible; a deficit of 2 would pair with ONE positive root, as $x^{3}-x^{2}+x-1$ shows. Option D is the $x^{3}-7x+6$ exhibit pasted onto the wrong polynomial — two variations, two positive roots, one negative.' },
      { q: 'The roots of the cubic with root multiset $\\{1, 2, 3\\}$ have $\\sigma_{2}$ equal to', options: ['$6$', '$11$', '$5$', '$36$'], answer: 1, explain: 'The pair-sum: $\\sigma_{2} = 1\\cdot2 + 1\\cdot3 + 2\\cdot3 = 2 + 3 + 6 = 11$ (option B), the coefficient of $x$ in $x^{3}-6x^{2}+11x-6$ — the staircase of 8.3. Option A’s $6$ is $\\sigma_{1}$, the root SUM — the coefficient of $x^{2}$ with its sign flipped; the classic seat swap. Option C’s $5$ is $\\sigma_{2}$ of the wrong multiset — $\\{1,2,3,4\\}$ has $\\sigma_{2} = 35$, and no small roster gives 5; it is the pair-count instinct (three pairs) confused with the pair-SUM. Option D’s $36$ is $p_{3}$, the Newton power sum $1^{3}+2^{3}+3^{3}$ — the staircase’s neighbour law read as the staircase.' },
      { q: 'Cardan’s $\\Delta$ for $x^{3} - 3x + 2$ equals', options: ['$0$', '$108$', '$-108$', '$400$'], answer: 0, explain: 'The depressed cubic $t^{3} + pt + q$ with $p = -3$, $q = 2$: $\\Delta = -4(-3)^{3} - 27(2)^{2} = 108 - 108 = 0$ (option A) — the repeated-root case, and indeed $x^{3}-3x+2 = (x-1)^{2}(x+2)$ with roots $\\{1, 1, -2\\}$. Option B’s $108$ is the $-4p^{3}$ term alone, the $-27q^{2}$ correction forgotten. Option C’s $-108$ is the sign of that single term flipped — and the $\\Delta = 0$ boundary would need both terms to cancel exactly, which is the whole point of the witness. Option D’s $400$ is the CASUS witness $x^{3}-7x+6$ ($p = -7$, $q = 6$) pasted onto the wrong pair — the classic case-confusion the trap shelf prices.' },
      { q: 'The equation $x^{4}+7x^{3}+14x^{2}+7x+1 = 0$ is solved by', options: ['the substitution $t = x + 1/x$ after dividing by $x^{2}$', 'the shift $x = t - 7/4$', 'factoring out $(x+1)$', 'Descartes’ rule'], answer: 0, explain: 'The coefficients read $1, 7, 14, 7, 1$ — palindromic — so dividing by $x^{2}$ and pairing gives $\\left(x^{2} + \\tfrac{1}{x^{2}}\\right) + 7\\left(x + \\tfrac{1}{x}\\right) + 14 = (t^{2}-2) + 7t + 14 = t^{2}+7t+12$, a quadratic in $t = x + 1/x$ (option A) — 8.6’s engine, returning the pairs $\\tfrac{-3 \\pm \\sqrt{5}}{2}$ and $-2 \\pm \\sqrt{3}$. Option B’s shift is the quartic DEPRESSION move — right idea for the $x^{3}$-term, but this quartic needs no depressing: it needs its symmetry recognised, and the shift destroys the palindrome instead of using it. Option C’s $(x+1)$ factor belongs to the ODD-degree palindrome ($x = -1$ is guaranteed only there); substituting $x = -1$ here gives $1 - 7 + 14 - 7 + 1 = 2 \\neq 0$. Option D’s rule would bound the positive roots (indeed $V = 2$), but a bound never SOLVED anything.' },
    ] },

    { kind: 'exercises', title: 'Exercises 8.R — the mixed bench', sets: [
      { level: 'L1', questions: [
        { q: '(i) State the number of roots of $(x-2)^{2}(x+3)^{3} = 0$ counted with multiplicity. (ii) Name the law that guarantees the count, and state the count WITHOUT multiplicity. (iii) Say which two roots the equation actually has.', solution: [
          'The degree first: $(x-2)^{2}$ carries degree $2$ and $(x+3)^{3}$ degree $3$, so the equation is degree $2 + 3 = 5$.',
          'So, by the fundamental theorem (stated in 8.1, multiplicity in): exactly $5$ roots over $\\mathbb{C}$ — the root $2$ counted twice and the root $-3$ counted three times, $2 + 3 = 5$.',
          'Now, without multiplicity: the DISTINCT roots are just $2$ and $-3$, a count of $2$.',
          'Hence five roots with multiplicity (the fundamental theorem’s count), $2$ distinct — and the two roots are $2$ and $-3$, the multiplicity arithmetic of 8.1 cashed at the bench’s first seat.',
        ], answer: '5 roots with multiplicity (2 and −3, counted 2 + 3 times); 2 distinct; the fundamental theorem, stated' },
        { q: 'For $x^{3} - 7x + 6$: (i) write the sign sequence and count the variations; (ii) state what Descartes’ rule permits for positive roots; (iii) name the actual positive roots, and price the negative side with $f(-x)$.', solution: [
          'The sequence of coefficients $+, -, +$ (the zero $x^{2}$-seat skipped): sign changes at both steps, so $V = 2$.',
          'So, Descartes permits $2$ or $0$ positive roots — the count must fall short of $V$ by an EVEN deficit.',
          'Now, the census: $x^{3}-7x+6 = (x-1)(x-2)(x+3)$, so the positive roots are exactly $\\{1, 2\\}$ — the deficit $0$.',
          'The negative side: $f(-x) = -x^{3}+7x+6$ reads $-, +, +$: $V = 1$, so exactly one negative root — and indeed $-3$.',
          'Hence $V = 2$, permitting $2$ or $0$; the truth is two positive $\\{1,2\\}$ and one negative $-3$ — 8.2’s both-sides witness re-run at bench speed.',
        ], answer: 'V = 2 (permits 2 or 0 positive); actual positive roots {1, 2}; f(−x) has V = 1 and the negative root −3' },
      ] },
      { level: 'L2', questions: [
        { q: 'For the root multiset $\\{1, 2, 3\\}$: (i) compute $\\sigma_{1}$, $\\sigma_{2}$, $\\sigma_{3}$; (ii) form the cubic; (iii) reconcile it with the 8.2 exhibit that shares it.', solution: [
          'Setup: $\\sigma_{1} = 1+2+3 = 6$; $\\sigma_{2} = 1\\cdot2 + 1\\cdot3 + 2\\cdot3 = 11$; $\\sigma_{3} = 1\\cdot2\\cdot3 = 6$.',
          'So, the staircase: $x^{3} - \\sigma_{1}x^{2} + \\sigma_{2}x - \\sigma_{3} = x^{3} - 6x^{2} + 11x - 6$.',
          'Check: the engines re-expanded $(x-1)(x-2)(x-3)$ and matched it exactly — the 8.3 staircase verified from its roots.',
          'Now, the reconciliation: this is the SAME polynomial as 8.2’s variations witness ($V = 3$, three positive roots) and 8.4’s depression witness — one machine, three costumes.',
          'Hence $\\sigma = (6, 11, 6)$ and the cubic $x^{3}-6x^{2}+11x-6$ — the chapter’s most-carried witness, priced by its symmetric functions.',
        ], answer: 'σ = (6, 11, 6); the cubic is x³ − 6x² + 11x − 6 — the shared witness of 8.2, 8.3 and 8.4' },
        { q: 'Depress $x^{3} - 6x^{2} + 11x - 6 = 0$ by the shift $x = t + 2$: (i) expand the transformed equation; (ii) verify its roots are the original roots decreased by $2$; (iii) name the two lessons that share this move.', solution: [
          'Setup: the shift law of 8.5 — substituting $x = t+2$ gives $Q(t) = P(t+2)$, whose roots are the original roots MINUS $2$.',
          'So, expand: $(t+2)^{3} - 6(t+2)^{2} + 11(t+2) - 6 = t^{3} + 6t^{2} + 12t + 8 - 6t^{2} - 24t - 24 + 11t + 22 - 6$.',
          'Now, collect: the $t^{2}$ terms cancel ($6 - 6$), the $t$ terms give $12 - 24 + 11 = -1$, and the constant $8 - 24 + 22 - 6 = 0$ — so $Q(t) = t^{3} - t$.',
          'Check: $t^{3} - t = t(t-1)(t+1)$ has roots $\\{-1, 0, 1\\}$, which are $\\{1, 2, 3\\} - 2$ — exactly the decreased roots.',
          'Hence the depressed form is $t^{3} - t$, roots $\\{-1, 0, 1\\}$ — Cardan’s depression (8.4) and the diminished-roots craft (8.5): one engine, two costumes.',
        ], answer: 't³ − t = 0, roots {−1, 0, 1} = original roots decreased by 2 — the 8.4 depression and the 8.5 craft share the move' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $x^{3} - 3x + 2 = 0$ completely: (i) compute $\\Delta$ and name the case; (ii) find all three roots (with multiplicity); (iii) reconcile the case with the root structure.', solution: [
          'Setup: the cubic is already depressed ($p = -3$, $q = 2$), so $\\Delta = -4p^{3} - 27q^{2} = -4(-27) - 27(4) = 108 - 108 = 0$.',
          'So, the case: $\\Delta = 0$ — repeated roots, all of them real.',
          'Now, the roots: testing small integers, $x = 1$ gives $1 - 3 + 2 = 0$ — a root; dividing, $x^{3}-3x+2 = (x-1)(x^{2}+x-2) = (x-1)(x-1)(x+2)$.',
          'Hence the roots are $\\{1, 1, -2\\}$ — the root $1$ twice, $-2$ once, three roots with multiplicity, exactly as the census demands.',
          'The reconciliation: $\\Delta = 0$ is the REPEATED case, and the root structure shows the repetition — Cardan’s $u = v$ collapse, the 8.4 witness cashed.',
        ], answer: 'Δ = 0 (the repeated case); roots {1, 1, −2} = (x−1)²(x+2)' },
        { q: 'How many real roots has $x^{4} + x^{3} + x^{2} + x + 1 = 0$? Name the four roots and the two censuses that guarantee the answer.', solution: [
          'The lens first: all coefficients positive, so $V = 0$ — no positive roots; $f(-x) = x^{4} - x^{3} + x^{2} - x + 1$ has $V = 4$, permitting $4$, $2$ or $0$ negative roots.',
          'So, the structure: multiply by $(x-1)$ and the telescoping gives $(x-1)(x^{4}+x^{3}+x^{2}+x+1) = x^{5} - 1$ — the equation is the 5th roots of unity with $1$ removed.',
          'Now, the census: the four roots are $e^{2\\pi ik/5}$ for $k = 1, 2, 3, 4$ — the conjugate pairs $e^{\\pm 2\\pi i/5}$ and $e^{\\pm 4\\pi i/5}$, every one of them non-real.',
          'Hence $0$ real roots — the four roots are the four non-real 5th roots of unity, and the conjugate-pair census (non-real roots in pairs: $4 = 2 + 2$) reconciles the lens’s $0$-or-$2$-or-$4$ with the truth: none.',
        ], answer: '0 real roots; the four roots are the non-real 5th roots of unity e^{2πik/5}, k = 1..4 (two conjugate pairs)' },
        { q: 'Form the equation whose roots are those of $x^{3} - 6x^{2} + 11x - 6 = 0$ each decreased by $1$: (i) write the shift and expand; (ii) factor the result; (iii) verify by the staircase as well as by the shift.', solution: [
          'Setup: decreasing the roots by $1$ means substituting $x + 1$ for $x$ — $Q(x) = P(x+1)$, the substitution running opposite to the roots.',
          'So, expand: $(x+1)^{3} - 6(x+1)^{2} + 11(x+1) - 6 = x^{3} + 3x^{2} + 3x + 1 - 6x^{2} - 12x - 6 + 11x + 11 - 6$.',
          'Now, collect: $x^{3} - 3x^{2} + 2x + 0$ — and the factor theorem reads it at once: $x(x-1)(x-2)$.',
          'Check by the staircase: the new roots are $\\{0, 1, 2\\}$, so $\\sigma = (3, 2, 0)$ and the equation is $x^{3} - 3x^{2} + 2x$ — matching the expansion exactly.',
          'Hence $x^{3} - 3x^{2} + 2x = 0$, that is $x(x-1)(x-2) = 0$ — the diminished-roots craft of 8.5, verified by both of its engines.',
        ], answer: 'x³ − 3x² + 2x = 0, i.e. x(x−1)(x−2) = 0, roots {0, 1, 2} = original roots decreased by 1' },
      ] },
      { level: 'L4', questions: [
        { q: 'For $x^{3} - 12x + 16 = 0$: (i) compute $\\Delta$ and name the case; (ii) solve completely, multiplicity in; (iii) reconcile the case with the root structure.', solution: [
          'Setup: the cubic is depressed with $p = -12$, $q = 16$, so $\\Delta = -4(-12)^{3} - 27(16)^{2} = 6912 - 6912 = 0$.',
          'So, the case: $\\Delta = 0$ — repeated roots, all real, the same case as the 8.4 witness $x^{3}-3x+2$.',
          'Now, the roots: testing, $x = 2$ gives $8 - 24 + 16 = 0$; dividing, $x^{3}-12x+16 = (x-2)(x^{2}+2x-8) = (x-2)(x-2)(x+4)$.',
          'Hence the roots are $\\{2, 2, -4\\}$ — $2$ twice, $-4$ once, the census balanced at $3$.',
          'The reconciliation: $\\Delta = 0$ forces the repeated structure, and the factorisation shows it — one more witness that the three $\\Delta$ cases are read from the roots, not guessed at them.',
        ], answer: 'Δ = 0 (the repeated case); roots {2, 2, −4} = (x−2)²(x+4)' },
        { q: 'For the root multiset $\\{1, 2, 3, 4\\}$: (i) write the four $\\sigma$’s; (ii) form the quartic; (iii) price $\\sigma_{3}$ as a sum of triple products and say what $\\sigma_{4}$ is.', solution: [
          'Setup: $\\sigma_{1} = 1+2+3+4 = 10$; $\\sigma_{2}$ pairs: $2+3+4+6+8+12 = 35$; $\\sigma_{3}$ triples; $\\sigma_{4} = 24$.',
          'So, the triple sum: $\\sigma_{3} = 1\\cdot2\\cdot3 + 1\\cdot2\\cdot4 + 1\\cdot3\\cdot4 + 2\\cdot3\\cdot4 = 6 + 8 + 12 + 24 = 50$.',
          'Now, the staircase: $x^{4} - \\sigma_{1}x^{3} + \\sigma_{2}x^{2} - \\sigma_{3}x + \\sigma_{4} = x^{4} - 10x^{3} + 35x^{2} - 50x + 24$.',
          'Check: the engines re-expanded $(x-1)(x-2)(x-3)(x-4)$ and matched every coefficient — the 8.3 quartic witness.',
          'Hence the quartic $x^{4}-10x^{3}+35x^{2}-50x+24$, with $\\sigma_{3} = 50$ the triple-product sum and $\\sigma_{4} = 24$ the product of all four roots.',
        ], answer: 'σ = (10, 35, 50, 24); x⁴ − 10x³ + 35x² − 50x + 24; σ₃ = 6 + 8 + 12 + 24 = 50; σ₄ = 24' },
        { q: 'The loss-of-root audit: (i) solve $x^{3} - x = 0$ honestly; (ii) divide both sides by $x$ and solve the result; (iii) state which root the division loses, and the guard that prevents it.', solution: [
          'Setup: $x^{3} - x = x(x-1)(x+1)$, so the honest solution set is $\\{0, 1, -1\\}$ — three roots, the census exact.',
          'So, the divided equation: $x^{2} - 1 = 0$ gives $\\{1, -1\\}$ — two roots only.',
          'Now, the audit: the division by $x$ removed the factor $x$, and with it the root $0$ — the solution set shrank by exactly that root.',
          'Hence the division loses the root $0$ (the sets $\\{0,1,-1\\}$ and $\\{1,-1\\}$ differ by it), and the guard of 8.5: NEVER divide by a common factor mid-solve — factor it out and read the factors, so every root survives the algebra.',
        ], answer: 'honest roots {0, 1, −1}; after ÷x only {1, −1} — the root 0 is lost; the guard: factor, never divide' },
      ] },
      { level: 'L5', questions: [
        { q: 'For $x^{3} - 2x^{2} - 5x + 6 = 0$, with roots $\\{1, 3, -2\\}$: (i) write the $\\sigma$’s from the coefficients; (ii) compute $p_{2}$ and $p_{3}$ directly; (iii) verify both by Newton’s identities.', solution: [
          'Setup: from the coefficients, $\\sigma_{1} = 2$, $\\sigma_{2} = -5$, $\\sigma_{3} = -6$ — and the roots $\\{1, 3, -2\\}$ check: sum $2$, pair-sum $3 - 2 - 6 = -5$, product $-6$.',
          'So, directly: $p_{2} = 1^{2} + 3^{2} + (-2)^{2} = 1 + 9 + 4 = 14$; $p_{3} = 1 + 27 - 8 = 20$.',
          'Now, Newton: $p_{2} = \\sigma_{1}^{2} - 2\\sigma_{2} = 4 + 10 = 14$; $p_{3} = \\sigma_{1}^{3} - 3\\sigma_{1}\\sigma_{2} + 3\\sigma_{3} = 8 + 30 - 18 = 20$.',
          'Check: both identities land on the direct values — the engine swept twenty random triples and reconciled the same way.',
          'Hence $p_{2} = 14$ and $p_{3} = 20$ — the staircase’s neighbour law, Newton’s identities, priced on a roster with a negative root in it.',
        ], answer: 'σ = (2, −5, −6); p₂ = 14, p₃ = 20 (direct AND by Newton: 4+10, 8+30−18)' },
        { q: 'Solve $x^{4} - 25x^{2} + 60x - 36 = 0$ by Ferrari’s method: (i) form the resolvent and find its rational root; (ii) split the quartic; (iii) read the four roots and verify one by substitution.', solution: [
          'Setup: the quartic is already depressed — $p = -25$, $q = 60$, $r = -36$, no $x^{3}$ term to remove.',
          'So, the resolvent: $M^{3} + 2pM^{2} + (p^{2}-4r)M - q^{2} = M^{3} - 50M^{2} + 769M - 3600 = 0$ — try the rational root $M = 9$: $729 - 4050 + 6921 - 3600 = 0$.',
          'Now, the split: $m = \\sqrt{M} = 3$, and the quartic factors as $\\left(x^{2} + 3x - 18\\right)\\left(x^{2} - 3x + 2\\right)$ — re-expand to check: $x^{4} - 25x^{2} + 60x - 36$, exact.',
          'The roots: $x^{2}+3x-18 = 0$ gives $\\tfrac{-3 \\pm \\sqrt{81}}{2} = 3, -6$; $x^{2}-3x+2 = 0$ gives $1, 2$.',
          'Verify: $x = -6$: $1296 - 900 - 360 - 36 = 0$ — every root passes substitution.',
          'Hence the resolvent root $M = 9$ ($m = 3$) and the four roots $\\{1, 2, 3, -6\\}$ — the Ferrari walk drawn in the figure below.',
        ], answer: 'resolvent root M = 9 (m = 3); the split (x²+3x−18)(x²−3x+2); roots {1, 2, 3, −6}', figures: [
          { caption: 'The Ferrari walk on $x^{4}-25x^{2}+60x-36$: the already-depressed quartic feeds the resolvent $M^{3}-50M^{2}+769M-3600 = 0$, whose rational root $M = 9$ (so $m = 3$) splits the quartic into the two quadratics $(x^{2}+3x-18)(x^{2}-3x+2)$, whose roots read $\\{1, 2, 3, -6\\}$ — one machine, four stations, four verdicts.', svg: ferrariWalk8RSvg() },
        ] },
        { q: 'Solve $x^{4} - 3x^{3} + 4x^{2} - 3x + 1 = 0$: (i) verify the palindromic structure; (ii) run the $t$-route; (iii) read all four roots and name the engine that guarantees two of them.', solution: [
          'Setup: the coefficients read $1, -3, 4, -3, 1$ — palindromic (forward = backward), so 8.6’s engine owns the question.',
          'So, divide by $x^{2}$ and pair: $\\left(x^{2} + \\tfrac{1}{x^{2}}\\right) - 3\\left(x + \\tfrac{1}{x}\\right) + 4 = (t^{2} - 2) - 3t + 4 = t^{2} - 3t + 2$.',
          'Now, the quadratic in $t$: $t^{2}-3t+2 = (t-1)(t-2)$, so $t \\in \\{1, 2\\}$.',
          'The return: $t = 1$ gives $x^{2} - x + 1 = 0$, roots $\\tfrac{1 \\pm i\\sqrt{3}}{2}$; $t = 2$ gives $x^{2} - 2x + 1 = 0$, the root $1$ twice.',
          'Hence the roots are $\\{1, 1, \\tfrac{1 \\pm i\\sqrt{3}}{2}\\}$ — the complex pair being the primitive 6th roots of unity, and the double root $1$ coming from the discriminant-zero $t$-quadratic: both $t$-returns honoured.',
        ], answer: 'palindromic; t² − 3t + 2 = (t−1)(t−2); roots {1, 1, (1 ± i√3)/2} — the pair are primitive 6th roots of unity' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove: the non-real roots of a real cubic are either none or exactly one conjugate pair — the census, from the conjugate law and degree parity. Price the theorem on both witnesses.', solution: [
          'The law: for real coefficients, $P(\\bar{z}) = \\overline{P(z)}$ — so if $\\alpha$ is a root, so is $\\bar{\\alpha}$; non-real roots are consumed in conjugate pairs (8.1’s derivation, recalled in one line).',
          'So, the seat count: a cubic has exactly $3$ roots over $\\mathbb{C}$ with multiplicity; pairing consumes $2$ seats at a time, so the non-real count is even and at most $3$ — it is $0$ or $2$.',
          'Now, the census fork: $0$ non-real roots means all three roots real (none); $2$ non-real means one conjugate pair plus ONE real root — the third seat, which the odd-degree corollary guarantees is there.',
          'The witnesses: $x^{3}-3x+2 = (x-1)^{2}(x+2)$ — none, three real seats; and $x^{3}-x^{2}+x-1 = (x-1)(x^{2}+1)$ — exactly one conjugate pair $\\{i, -i\\}$ plus the real root $1$.',
          'Hence the non-real roots of a real cubic are none or exactly one conjugate pair — the conjugate law plus degree parity, two lines and no computation, which is what makes it a census rather than a solve.',
        ], answer: 'proved: non-real seats pair off (P(z̄) = P(z)-bar) and 3 = even + remainder, so 0 or 2 non-real; witnesses (x−1)²(x+2) and (x−1)(x²+1)' },
        { q: 'Prove the inversion and shift transformation laws together (both directions), with the $\\{1, 2, 3\\}$ witnesses: (i) the shift law $P(x-h)$ has roots $r+h$, forward and backward; (ii) the inversion law $x^{n}P(1/x)$ has roots $1/r$; (iii) audit both against the pinned exhibits.', solution: [
          'The shift, forward: if $r$ is a root of $P$, then $P\\left((r+h) - h\\right) = P(r) = 0$ — so $r+h$ is a root of $Q(x) = P(x-h)$; the substitution moves one way, the roots the other.',
          'So, the shift, backward: $Q(x) = P(x-h)$ has degree $n$, so its $n$ $\\sigma$-counted roots are exhausted by the $n$ values $r+h$ — the map is a bijection on the root multiset. Witness: increase the roots of $x^{3}-6x^{2}+11x-6$ by $2$: substitute $x - 2$ and the expansion reads $x^{3}-12x^{2}+47x-60$ with roots $\\{3, 4, 5\\}$; decrease by $2$: substitute $x + 2$, giving $x^{3} - x$ with roots $\\{-1, 0, 1\\}$.',
          'The inversion: $Q(x) = x^{n}P(1/x)$ has $Q(x_{0}) = x_{0}^{n}P(1/x_{0})$, which vanishes exactly when $P(1/x_{0}) = 0$ (for $x_{0} \\neq 0$) — so the roots of $Q$ are the reciprocals $1/r$ of the non-zero roots of $P$; a zero root of $P$ becomes a degree drop in $Q$, which is why the guard exists.',
          'Now, the audit: the inversion witness — $x^{3}P(1/x) = 1 - 6x + 11x^{2} - 6x^{3}$ with roots $\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$, every value $1/r$ for $r \\in \\{1,2,3\\}$, and the engines verified each by substitution.',
          'Hence both laws proved, both directions, with the witnesses $x^{3}-12x^{2}+47x-60$ ($\\{3,4,5\\}$), $x^{3}-x$ ($\\{-1,0,1\\}$) and $1-6x+11x^{2}-6x^{3}$ ($\\{1, \\tfrac{1}{2}, \\tfrac{1}{3}\\}$) — the transformation craft of 8.5, stated once and audited twice.',
        ], answer: 'proved: P(x−h) roots r+h (bijection on the multiset); xⁿP(1/x) roots 1/r (zero roots drop degree); witnesses 47x−60, x³−x and the inverted cubic' },
      ] },
    ] },
  ],
}


export const chapter08: Chapter = {
  number: 8,
  slug: 'theory-of-equations',
  title: 'The Theory of Equations',
  summary:
    'The polynomial’s deepest algebra — Hall & Knight’s heartland, entered honestly. How many roots a degree-n equation truly has: n over the complex numbers (the fundamental theorem stated, not proved — with the honesty the platform owes its readers), multiplicities counted, and the conjugate-pair law for real coefficients derived from chapter 3’s algebra rather than asserted. Viète generalizes: the symmetric functions of a cubic’s and a quartic’s roots, the sum–sum-of-products–product staircase, and what symmetric reads survive when the roots are not nice. The chapter closes with the transformation craft: build the equation whose roots are the old roots shifted, scaled or inverted — the classic technique that turns hard cubics into transparent ones and reciprocal equations into quadratics in disguise.',
  status: 'complete',
  lessons: [lesson81, lesson82, lesson83, lesson84, lesson85, lesson86, lesson8R],
  plannedLessons: [],
}
