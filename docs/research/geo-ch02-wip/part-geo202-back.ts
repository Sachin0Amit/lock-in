import type { Lesson } from '../../../src/data/library/types'

export {}

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c22b = {
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
  faint: '#5eead4', // faint dots, unpicked borders
  white: '#ffffff',
  paper: '#fffdf5',
}
const f22b = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo22b SVG helpers (plain text only — no $, minus is U+2212)        */
/* Every coordinate, arc and label below is COMPUTED from the pinned   */
/* witnesses — nothing in any figure is eyeballed.                     */
/* ------------------------------------------------------------------ */
const geo22bR1 = (v: number): string => String(Math.round(v * 10) / 10)

const geo22bTxt = (
  x: number, y: number, s: string,
  size = 13, color = c22b.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${geo22bR1(x)}" y="${geo22bR1(y)}" font-family="${f22b}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo22bLine = (
  x1: number, y1: number, x2: number, y2: number,
  color = c22b.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${geo22bR1(x1)}" y1="${geo22bR1(y1)}" x2="${geo22bR1(x2)}" y2="${geo22bR1(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo22bCirc = (
  cx: number, cy: number, r: number, color = c22b.ink, w = 2.5, fill = 'none',
): string =>
  `<circle cx="${geo22bR1(cx)}" cy="${geo22bR1(cy)}" r="${geo22bR1(r)}" fill="${fill}" stroke="${color}" stroke-width="${w}"/>`

const geo22bDot = (x: number, y: number, color = c22b.ink, r = 4): string =>
  `<circle cx="${geo22bR1(x)}" cy="${geo22bR1(y)}" r="${geo22bR1(r)}" fill="${color}"/>`

const geo22bRect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo22bHead = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${geo22bR1(x)},${geo22bR1(y)} ${geo22bR1(p1[0])},${geo22bR1(p1[1])} ${geo22bR1(p2[0])},${geo22bR1(p2[1])}" fill="${color}"/>`
}

const geo22bArrow = (
  x1: number, y1: number, x2: number, y2: number, color = c22b.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo22bLine(x1, y1, x2, y2, color, w) + geo22bHead(x2, y2, a, color, 8)
}

const geo22bSvg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** stroked arc from screen angle a1 to a2 (degrees; y grows downward) */
const geo22bArc = (
  cx: number, cy: number, r: number, a1: number, a2: number,
  color = c22b.amber, w = 2,
): string => {
  let hi = a2
  while (hi <= a1) hi += 360
  const px = (a: number): [number, number] => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)]
  const [x1, y1] = px(a1)
  const [x2, y2] = px(hi)
  const large = hi - a1 > 180 ? 1 : 0
  return `<path d="M ${geo22bR1(x1)} ${geo22bR1(y1)} A ${geo22bR1(r)} ${geo22bR1(r)} 0 ${large} 1 ${geo22bR1(x2)} ${geo22bR1(y2)}" fill="none" stroke="${color}" stroke-width="${w}"/>`
}

/* ================================================================== */
/* BACK HALF of lesson 2.2 — quiz + exercises + coda                   */
/* (seat geo202-s2, run 127 salvage; the prose seat owns part-geo202)  */
/* ================================================================== */
export const geo202BackBlocks: Lesson['blocks'] = [
  /* -------------------------------------------------------------- */
  /* quiz — engine P02: keys [1,2,0,3,1], pinned tokens, audits      */
  /* -------------------------------------------------------------- */
  {
    kind: 'quiz',
    title: 'Self-check quiz',
    items: [
      {
        q: 'Euclid’s fifth postulate speaks when a transversal cuts two lines and the same-side interior angles on one side sum to $158^\circ$. What does the postulate guarantee?',
        options: [
          'The lines are parallel, because $158^\circ$ is closer to $180^\circ$ than to $90^\circ$',
          'The lines meet on THAT side of the transversal — the side carrying the $158^\circ$ sum',
          'The lines meet on the other side of the transversal, where the same-side sum is $360^\circ - 158^\circ = 202^\circ$',
          'Nothing can be concluded — the postulate only speaks when the sum is exactly $180^\circ$',
        ],
        answer: 1,
        explain:
          'The fifth postulate speaks exactly when a side dips under budget: if the same-side interior angles on one side of the transversal sum to less than two right angles, the two lines, produced indefinitely, meet on that side. Here $158^\circ < 180^\circ$, so the meeting is guaranteed on the side that carries the $158^\circ$ sum — option (b). Option (a) inverts the verdict: only the exact sum $180^\circ$ certifies parallel (that is I.28’s job), and "close to $180^\circ$" is not a licence geometry grants. Option (c) reads the postulate backwards — the meeting side is the one whose sum is UNDER $180^\circ$, while the other side’s $202^\circ = 360^\circ - 158^\circ$ is over budget and can never force a meeting. Option (d) shrinks the postulate’s range: the exactly-$180^\circ$ case is the special parallel case; the postulate’s whole job is to speak when a side is strictly less than $180^\circ$.',
      },
      {
        q: 'Playfair’s axiom (1795) says that through a point $P$ not on a line $\ell$ there is exactly one line parallel to $\ell$. Logically, what does "exactly one" unpack into?',
        options: [
          'Existence alone — at least one parallel through $P$ is guaranteed, and more may follow',
          'Uniqueness alone — the parallel through $P$, if there is one, is the only one',
          'Existence and uniqueness together — at least one parallel exists, and at most one exists',
          'A construction demand — the parallel must first be drawn with ruler and compass',
        ],
        answer: 2,
        explain:
          '"Exactly one" is the quantifier $\exists!$, and it splits into two independent claims: EXISTENCE (at least one parallel through $P$) and UNIQUENESS (at most one) — option (c) is the only one that demands both halves. Option (a) keeps existence and even invites extras; that is precisely the hyperbolic situation, where a whole fan of parallels passes through $P$, so "at least one" is strictly weaker than "exactly one". Option (b) keeps only uniqueness, quietly assuming a parallel is already there to be unique — on the sphere there are ZERO parallels through $P$ (any two great circles meet), and being unique about nothing is not "exactly one". Option (d) confuses truth with construction: the axiom asserts a count, not a drawing procedure — the double-perpendicular construction arrives later as the existence half’s certificate, not as part of the claim.',
      },
      {
        q: 'In the Euclidean plane — the geometry you have used all your life — how many lines through a point $P$ not on a line $\ell$ run parallel to $\ell$?',
        options: [
          'exactly one — the Euclidean entry of the parallel census',
          'none — every line through $P$ eventually meets $\ell$',
          'infinitely many — a whole fan of lines through $P$ avoids $\ell$',
          'two — one on each side of the perpendicular from $P$ to $\ell$',
        ],
        answer: 0,
        explain:
          'The Euclidean census line: through $P$ there is exactly ONE parallel to $\ell$ — option (a); this is Playfair’s axiom, and it is equivalent to Euclid’s fifth postulate, so it holds in precisely the geometry the Elements describe. Option (b) is the spherical count: on a sphere any two great circles meet (in a pair of antipodal points), so not even one parallel exists. Option (c) is the hyperbolic count: refuse the fifth postulate and a fan of non-meeting lines passes through $P$ — infinitely many. Option (d) is the subtle near-miss: a pair of "boundary" parallels through $P$ is a hyperbolic phenomenon (the two limiting parallels that bound the fan), and even there they do not exhaust the parallels; the Euclidean plane permits no second parallel of any kind, because uniqueness holds outright.',
      },
      {
        q: 'A transversal cuts two lines, and on the LEFT of the transversal the same-side interior angles measure $62^\circ$ and $105^\circ$. What is the honest verdict?',
        options: [
          'The lines are parallel — $62^\circ + 105^\circ = 167^\circ$ is close enough to $180^\circ$',
          'The lines meet on the RIGHT of the transversal — the side whose sum is $360^\circ - 167^\circ = 193^\circ$',
          'No verdict is possible — the fifth postulate applies only when the two angles are equal',
          'The lines meet on the LEFT — the sum $62^\circ + 105^\circ = 167^\circ$ is less than 180 degrees',
        ],
        answer: 3,
        explain:
          'Add the left-side pair: $62^\circ + 105^\circ = 167^\circ$, and $167^\circ < 180^\circ$, so the fifth postulate convicts the LEFT side — the lines must meet there — option (d). Option (a) invents a tolerance zone: geometry has no "close enough"; only the exact sum $180^\circ$ gives the parallel verdict (I.28). Option (b) picks the wrong side: the meeting happens on the side whose sum is UNDER $180^\circ$, while $360^\circ - 167^\circ = 193^\circ$ is over budget and can force nothing. Option (c) misstates the trigger: the postulate watches the SUM, not the equality of the two angles — $90^\circ$ and $90^\circ$ is merely one way of reaching $180^\circ$, and equality is neither required nor relevant.',
      },
      {
        q: 'Proclus (c. 450 CE) reviewed Euclid’s postulates and argued that the fifth "ought even to be struck out of the postulates altogether". What was the complaint?',
        options: [
          'The postulate is false — it contradicts the other four postulates',
          'The postulate is repugnant — it reads like a theorem and so ought to be proved, not assumed',
          'The postulate is redundant — Playfair’s simpler axiom had already replaced it',
          'The postulate is unprovable — Proclus held a correct proof that no derivation exists',
        ],
        answer: 1,
        explain:
          'Proclus judged the fifth postulate repugnant to the character of a postulate: it asserts what reads like a theorem — "it is a theorem involving many difficulties", he wrote — so it ought to be proved from the rest rather than assumed — option (b). Option (a) is far too strong: Proclus never doubted the postulate’s truth and used it freely; the complaint was about its ROLE in the rulebook, not its truth. Option (c) is anachronism by thirteen centuries: Playfair’s restatement came in 1795, and it does not retire the fifth — it is logically EQUIVALENT to it. Option (d) credits Proclus with a discovery made 1400 years later: the impossibility of proving the fifth from the other axioms was only established once Lobachevsky and Bolyai had built the consistent geometry that refuses it.',
      },
    ],
  },
  /* -------------------------------------------------------------- */
  /* exercises — engine P03/P08/P04b: 15 questions, L1..L6          */
  /* -------------------------------------------------------------- */
  {
    kind: 'exercises',
    title: 'Exercises — verdicts, walks and the census',
    sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'Lines $m$ and $n$ are cut by a transversal $t$. On one side of $t$ the two same-side interior angles measure $64^\circ$ and $116^\circ$. Give the verdict and name the licence.',
            solution: [
              'Sol. Add the same-side interior pair: $64^\circ + 116^\circ = 180^\circ$ exactly.',
              'Now, the side-sum law gives the other side too: $360^\circ - 180^\circ = 180^\circ$ — no side of the configuration dips under $180^\circ$.',
              'A same-side sum of exactly $180^\circ$ delivers the parallel verdict, and the licence is Euclid I.28 — proved WITHOUT the fifth postulate, which is why this is the cheap direction.',
              'Hence $m \\parallel n$: neither side ever falls under $180^\circ$, so no meeting is ever forced.',
            ],
            answer: 'Parallel — $64^\circ + 116^\circ = 180^\circ$ exactly (licence: Euclid I.28, no fifth postulate spent)',
          },
          {
            q: 'A transversal $t$ cuts line $n$ (above) and line $m$ (below). The same-side interior angles on the LEFT of $t$ measure $47^\circ$ and $121^\circ$. Give the verdict, compute the other side’s sum, and find the angle at which the lines close.',
            solution: [
              'Sol. Add the left-side pair: $47^\circ + 121^\circ = 168^\circ$.',
              'Compare: $168^\circ < 180^\circ$, so the fifth postulate convicts the LEFT — the lines meet on that side.',
              'The other side: $360^\circ - 168^\circ = 192^\circ$, over budget, unable to force anything.',
              'The closing angle: the transversal and the two lines frame a triangle whose apex angle is the deficit $180^\circ - 168^\circ = 12^\circ$ — the diagram beside this solution draws the conviction, apex arc marked at the meeting point $M$.',
              'Hence: meet on the left; the other side carries $192^\circ$; the lines close at $12^\circ$.',
            ],
            answer: 'Meet on the left — $47^\circ + 121^\circ = 168^\circ < 180^\circ$; the other side carries $192^\circ$ (closing angle $12^\circ$)',
            figures: [
              {
                caption:
                  'The conviction drawn to scale: lines $m$ and $n$ cut by the vertical transversal $t$, with the left-side interior angles $47^\circ$ at $A$ and $121^\circ$ at $B$; the tinted triangle closes at the meeting point $M$ on the left, where the apex angle is the deficit $180^\circ - 168^\circ = 12^\circ$, and the right side carries $360^\circ - 168^\circ = 192^\circ$.',
                svg: (() => {
                  const A: [number, number] = [620, 120] // intersection with n (upper line)
                  const B: [number, number] = [620, 200] // intersection with m (lower line); t is vertical
                  // ray A→M leaves the downward ray of t by 47° to the left; ray B→M leaves the upward ray by 121°
                  const angA = 90 + 47
                  const angB = 270 - 121
                  const ca = Math.cos((angA * Math.PI) / 180), sa = Math.sin((angA * Math.PI) / 180)
                  const cb = Math.cos((angB * Math.PI) / 180), sb = Math.sin((angB * Math.PI) / 180)
                  // solve A + s·(ca,sa) = B + u·(cb,sb) for the meeting point M
                  const u = (B[1] - A[1]) / ((cb * sa) / ca - sb)
                  const M: [number, number] = [B[0] + u * cb, B[1] + u * sb]
                  const LA = Math.hypot(M[0] - A[0], M[1] - A[1])
                  const LB = Math.hypot(M[0] - B[0], M[1] - B[1])
                  const parts: string[] = []
                  // tinted conviction triangle ABM
                  parts.push(`<polygon points="${geo22bR1(M[0])},${geo22bR1(M[1])} ${A[0]},${A[1]} ${B[0]},${B[1]}" fill="${c22b.panel}" stroke="none"/>`)
                  // line n through A and M, line m through B and M, both extended past the meeting
                  parts.push(geo22bLine(A[0] - 0.18 * LA * ca, A[1] - 0.18 * LA * sa, M[0] + 0.14 * LA * ca, M[1] + 0.14 * LA * sa, c22b.green, 3))
                  parts.push(geo22bLine(B[0] - 0.18 * LB * cb, B[1] - 0.18 * LB * sb, M[0] + 0.14 * LB * cb, M[1] + 0.14 * LB * sb, c22b.green, 3))
                  // the transversal t
                  parts.push(geo22bLine(620, 55, 620, 255, c22b.ink, 2.6))
                  // angle arcs: 47° at A, 121° at B, 12° at M
                  parts.push(geo22bArc(A[0], A[1], 34, 90, angA, c22b.amber, 2.2))
                  parts.push(geo22bArc(B[0], B[1], 34, angB, 270, c22b.teal, 2.2))
                  parts.push(geo22bArc(M[0], M[1], 26, angA + 180, angB + 180, c22b.red, 2))
                  // labels at computed bisectors
                  const bis = (cx: number, cy: number, a1: number, a2: number, r: number): [number, number] => {
                    const m = ((a1 + a2) / 2) * (Math.PI / 180)
                    return [cx + r * Math.cos(m), cy + r * Math.sin(m)]
                  }
                  const [x47, y47] = bis(A[0], A[1], 90, angA, 40)
                  const [x121, y121] = bis(B[0], B[1], angB, 270, 54)
                  const [x12, y12] = bis(M[0], M[1], angA + 180, angB + 180, 44)
                  parts.push(geo22bTxt(x47, y47, '47°', 12.5, c22b.amber))
                  parts.push(geo22bTxt(x121, y121, '121°', 12.5, c22b.tealInk))
                  parts.push(geo22bTxt(x12, y12, '12°', 12.5, c22b.red))
                  // vertices and the meeting point
                  parts.push(geo22bDot(A[0], A[1], c22b.ink, 4))
                  parts.push(geo22bDot(B[0], B[1], c22b.ink, 4))
                  parts.push(geo22bDot(M[0], M[1], c22b.red, 5))
                  parts.push(geo22bTxt(608, 106, 'A', 12, c22b.ink))
                  parts.push(geo22bTxt(606, 226, 'B', 12, c22b.ink))
                  parts.push(geo22bTxt(M[0] + 16, M[1] + 12, 'meet', 11.5, c22b.red, 'start'))
                  parts.push(geo22bTxt(620, 44, 't', 13, c22b.ink))
                  parts.push(geo22bTxt(670, 96, 'n', 13, c22b.ink))
                  parts.push(geo22bTxt(672, 190, 'm', 13, c22b.ink))
                  parts.push(geo22bTxt(686, 150, '360° − 168° = 192°', 11.5, c22b.teal))
                  parts.push(geo22bTxt(380, 418, 'left of t: 47° + 121° = 168° < 180° → meet on this side', 12.5, c22b.tealInk))
                  return geo22bSvg(760, 440, 'Two lines n and m cut by a vertical transversal t, with left-side interior angles 47 degrees at A and 121 degrees at B tinted as a triangle; the lines converge to the meeting point M on the left, where the closing angle is 12 degrees; the right side carries 192 degrees.', parts)
                })(),
              },
            ],
          },
          {
            q: 'Lines $r$ and $s$ are parallel, and a transversal cuts them both. One angle of a same-side interior pair measures $71^\circ$. Find its partner, and name the logical direction the licence runs.',
            solution: [
              'Sol. For parallels the same-side interior pair is supplementary: $71^\circ + x = 180^\circ$.',
              'The licence runs the "parallels force the sum" direction — read the fifth postulate through its contrapositive (no meeting on a side forces that side’s sum up to at least $180^\circ$), then let the $360^\circ$ side law pin both sides at exactly $180^\circ$. Euclid’s own route to the same fact is I.29, the first proposition that spends the postulate.',
              'Subtract: $x = 180^\circ - 71^\circ = 109^\circ$.',
              'Hence the partner angle is $109^\circ$.',
            ],
            answer: 'The partner angle is $109^\circ$ (supplementary — the parallel-to-sum direction, Euclid’s I.29)',
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'A transversal cuts two lines, and on one side of it the same-side interior angles measure $45^\circ$ and $73.25^\circ$. Give the verdict for that side, and compute what the other side carries.',
            solution: [
              'Sol. Add the pair: $45^\circ + 73.25^\circ = 118.25^\circ$.',
              'Compare: $118.25^\circ < 180^\circ$, so the fifth postulate convicts THIS side — the lines meet on it.',
              'The other side: $360^\circ - 118.25^\circ = 241.75^\circ$, comfortably over $180^\circ$ — no meeting can be forced from there.',
              'For the record, the meeting itself will be sharp: the deficit at the meeting point is $180^\circ - 118.25^\circ = 61.75^\circ$ (lesson 2.4 cashes this).',
              'Hence the lines meet on the side carrying $118.25^\circ$; the other side carries $241.75^\circ$.',
            ],
            answer: 'The lines meet on that side — $118.25^\circ < 180^\circ$; the other side carries $241.75^\circ$',
          },
          {
            q: 'Parallel lines are cut by a transversal, and the two same-side interior angles measure $(2x)^\circ$ and $(3x)^\circ$. Find $x$ and both angles.',
            solution: [
              'Sol. Parallels make the same-side pair supplementary, so $2x + 3x = 180^\circ$.',
              'Combine: $5x = 180^\circ$, so $x = 36^\circ$.',
              'Recover the angles: $2x = 72^\circ$ and $3x = 108^\circ$.',
              'Check the ledger: $72^\circ + 108^\circ = 180^\circ$ — the supplementary budget balances exactly.',
              'Hence $x = 36^\circ$, with angles $72^\circ$ and $108^\circ$.',
            ],
            answer: '$x = 36$; the angles are $72^\circ$ and $108^\circ$',
          },
          {
            q: 'You can measure only ONE side of a transversal configuration: its two same-side interior angles sum to $205^\circ$. Compute what the unseen side carries, and give the verdict.',
            solution: [
              'Sol. The side-sum law: the two same-side interior sums trade against each other through $360^\circ$ (two linear pairs along the transversal — exercise 9 proves it below).',
              'So the unseen side carries $360^\circ - 205^\circ = 155^\circ$.',
              'Compare with the budget: $155^\circ < 180^\circ$, so the fifth postulate convicts the UNSEEN side.',
              'Hence the lines meet on the side you could not measure directly — the $155^\circ$ side; the measured $205^\circ$ side is over budget and could never force the meeting.',
            ],
            answer: 'The unseen side carries $155^\circ$, and the lines meet on that side',
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'Through a point $P$ not on a line $\ell$, a construction builds a candidate parallel: drop the perpendicular $PQ$ from $P$ to $\ell$, then erect the line $n$ through $P$ perpendicular to $PQ$. Prove that $n \parallel \ell$, and say which half of Playfair’s $\exists!$ the construction establishes — and which half it cannot.',
            solution: [
              'Sol. By construction $PQ \perp \ell$ at $Q$ and $n \perp PQ$ at $P$: all four angles at the two feet are $90^\circ$.',
              'Now, read $PQ$ as a transversal cutting $n$ at $P$ and $\ell$ at $Q$. On one side of $PQ$ the same-side interior angles are $90^\circ + 90^\circ = 180^\circ$; on the other side, the same addition gives $180^\circ$ again.',
              'A same-side sum of exactly $180^\circ$ delivers the parallel verdict by Euclid I.28 — and I.28 is proved without the fifth postulate, so existence costs nothing.',
              'What the construction establishes is therefore the EXISTENCE half, $\exists$: at least one parallel through $P$, with a drawable certificate.',
              'It cannot establish UNIQUENESS: nothing here stops some other line through $P$ from also missing $\ell$ — ruling that out is the $\exists \leq 1$ half, and that is where the fifth postulate genuinely pays (exercise 8 runs the sweep).',
              'Hence $n \parallel \ell$ by the double perpendicular — the existence half only.',
            ],
            answer: '$n \parallel \ell$ by the double perpendicular ($90^\circ + 90^\circ = 180^\circ$ on both sides); the construction proves only the EXISTENCE half of Playfair’s $\exists!$',
          },
          {
            q: 'A point $P$ sits above a line $\ell$. Three candidate lines $a$, $b$, $c$ are drawn through $P$, and the perpendicular $PQ$ from $P$ to $\ell$ serves as the transversal: the same-side interior angles at $P$ and $Q$ (on one fixed side of $PQ$) sum to $155^\circ$ for $a$, $180^\circ$ for $b$ and $174^\circ$ for $c$. Give the verdict on each candidate — and say what the sweep proves about Playfair’s uniqueness half.',
            solution: [
              'Sol. The frame is shared: $PQ \perp \ell$, so at the foot $Q$ every same-side interior angle with $\ell$ is $90^\circ$; each candidate contributes its own angle at $P$.',
              'Candidate $a$: $65^\circ + 90^\circ = 155^\circ < 180^\circ$ — the fifth postulate convicts that side, so $a$ meets $\ell$.',
              'Candidate $b$: $90^\circ + 90^\circ = 180^\circ$ on both sides of $PQ$ — the double perpendicular, and I.28 returns the parallel verdict: $b \parallel \ell$.',
              'Candidate $c$: $84^\circ + 90^\circ = 174^\circ < 180^\circ$ — convicted again: $c$ meets $\ell$.',
              'So exactly one of the three survives, and the sweep says more: EVERY tilted line through $P$ leaves some side summing under $180^\circ$, so every tilt is convicted — this is the uniqueness half $\exists \leq 1$, and it is the fifth postulate that pays for it.',
              'Hence $b$ alone is parallel; $a$ and $c$ meet $\ell$.',
            ],
            answer: 'Only $b$ (the double perpendicular) is parallel; $a$ and $c$ meet $\ell$ — their sums $155^\circ$ and $174^\circ$ both fall under $180^\circ$',
          },
          {
            q: 'Prove the side-sum law this lesson has used throughout: when a transversal cuts two lines, the two same-side interior sums add to $360^\circ$. Then verify the law when the same-side interior angles on one side measure $65^\circ$ and $105^\circ$.',
            solution: [
              'Sol. Name the census positions (lesson 2.1): at the upper intersection the interior angles are $a_4$ (left of the transversal) and $a_3$ (right); at the lower intersection, $a_5$ (left) and $a_6$ (right).',
              'The transversal makes a linear pair at each intersection: $a_3 + a_4 = 180^\circ$ above and $a_5 + a_6 = 180^\circ$ below (2.1’s licence).',
              'Add the left-side sum and the right-side sum: $(a_4 + a_5) + (a_3 + a_6)$ — regrouped, that is $(a_3 + a_4) + (a_5 + a_6)$, plain commutativity of addition.',
              'Substitute the linear pairs: $180^\circ + 180^\circ = 360^\circ$ — the left sum and the right sum always trade against each other through $360^\circ$.',
              'Witness check: left $= 65^\circ + 105^\circ = 170^\circ$, so right $= 360^\circ - 170^\circ = 190^\circ$; the linear pairs read $a_3 = 115^\circ$ (with $115 + 65 = 180$) and $a_6 = 75^\circ$ (with $105 + 75 = 180$), and indeed $170 + 190 = 360$.',
              'Hence the side-sum law: same-side sum + other-side sum $= 360^\circ$, whatever the two lines go on to do.',
            ],
            answer: 'The two same-side sums add to $360^\circ$; witness: $170^\circ + 190^\circ = 360^\circ$',
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'Two lines are cut by a transversal, and on one side the same-side interior angles measure $(3x - 10)^\circ$ and $(2x + 25)^\circ$. The lines MEET on that side. Find the range of $x$ (exam-style: the inequality is the postulate itself).',
            solution: [
              'Sol. Write the sum: $(3x - 10) + (2x + 25) = 5x + 15$.',
              '"Meet on that side" is exactly the fifth postulate’s hypothesis: $5x + 15 < 180$.',
              'Solve: $5x < 165$, so $x < 33$.',
              'Both angles must also be genuine (positive): $3x - 10 > 0$ gives $x > \frac{10}{3}$, while $2x + 25$ is positive throughout the range.',
              'Check a witness inside: $x = 20$ gives $3(20) - 10 = 50^\circ$ and $2(20) + 25 = 65^\circ$, sum $115^\circ < 180^\circ$ — a genuine meeting side, as ordered.',
              'Hence $\frac{10}{3} < x < 33$.',
            ],
            answer: '$\frac{10}{3} < x < 33$ (witness: $x = 20$, angles $50^\circ$ and $65^\circ$, sum $115^\circ$)',
          },
          {
            q: 'In the Euclidean plane, $m \parallel n$. At one place the perpendicular segment from $m$ down to $n$ measures $8$ cm. (i) What does the same construction measure at every other place between the two lines? (ii) Which famous equivalence does that "equidistant character" belong to? (iii) And what happens to the gap in the hyperbolic plane instead?',
            solution: [
              'Sol. (i) Erect the perpendicular from any point of $m$ down to $n$: in the Euclidean plane every such segment between the two parallels has the SAME length — the strip is everywhere $8$ cm wide. This constant width is the equidistant character of Euclidean parallels.',
              '(ii) The character is not a free gift of the definition: "parallels are equidistant" is EQUIVALENT to the fifth postulate — assume it in place of Euclid’s sentence and the same geometry returns, census line and all.',
              '(iii) The hyperbolic plane refuses the bargain: take two non-meeting lines with an $8$ cm common perpendicular at the narrowest place, walk away from the foot in either direction, and the gap GROWS without bound — it never returns to $8$ cm.',
              'So the three answers hang together: constant gap, exactly-one parallel, and the fifth postulate are three formulations of one and the same assumption.',
              'Hence $8$ cm at every location; the equidistant character is equivalent to the fifth postulate; hyperbolically the gap grows without bound.',
            ],
            answer: 'Every perpendicular segment measures $8$ cm (equidistant character — equivalent to the fifth postulate); hyperbolically the gap grows without bound',
          },
        ],
      },
      {
        level: 'L5',
        questions: [
          {
            q: 'Put the fifth-postulate story in order and count the gaps: Proclus complains that the postulate ought to be struck out; Saccheri nearly discovers the other world; Playfair cleans the statement into "exactly one parallel"; Lobachevsky and Bolyai publish the new geometry. Give all five years, the four gaps, and the total span.',
            solution: [
              'Sol. The order is history’s own: Proclus $450$ → Saccheri $1733$ → Playfair $1795$ → Lobachevsky $1829$ → Bolyai $1832$ — the timeline beside this solution lays the five rungs out.',
              'Count the first gap: $1733 - 450 = 1283$ years — the long silence between the first recorded complaint and the near-discovery.',
              'Then the cascade: $1795 - 1733 = 62$; $1829 - 1795 = 34$; $1832 - 1829 = 3$.',
              'Total span: $1832 - 450 = 1382$ years, and the telescoping check agrees: $1283 + 62 + 34 + 3 = 1382$.',
              'Note the shape of the ladder: the shortest gap is the LAST one — once Lobachevsky had published, it took Bolyai only $3$ more years to arrive independently; the door, once open, was obvious.',
              'Hence the gaps are $1283$, $62$, $34$ and $3$ years across a $1382$-year story.',
            ],
            answer: 'Years $450, 1733, 1795, 1829, 1832$; gaps $1283, 62, 34, 3$ years; total span $1382$ years',
            figures: [
              {
                caption:
                  'The year ladder of the fifth postulate: Proclus 450, Saccheri 1733, Playfair 1795, Lobachevsky 1829 and Bolyai 1832, with the four gaps $1283$, $62$, $34$ and $3$ years marked by arrows below the rungs; the node spacing is narrative, not to scale, and the total span is $1832 - 450 = 1382$ years.',
                svg: (() => {
                  const parts: string[] = []
                  const y = 150
                  parts.push(geo22bLine(55, y, 715, y, c22b.green, 3))
                  const rungs: Array<[number, string, string]> = [
                    [90, 'Proclus', '450'],
                    [240, 'Saccheri', '1733'],
                    [410, 'Playfair', '1795'],
                    [560, 'Lobachevsky', '1829'],
                    [690, 'Bolyai', '1832'],
                  ]
                  for (const [x, name, yr] of rungs) {
                    parts.push(geo22bDot(x, y, c22b.ink, 5))
                    parts.push(geo22bTxt(x, y - 24, yr, 13.5, c22b.orange, 'middle', '700'))
                    parts.push(geo22bTxt(x, y - 50, name, 12.5, c22b.ink, 'middle', '700'))
                  }
                  const gaps: Array<[number, number, string]> = [
                    [90, 240, '1283 yr — the long silence'],
                    [240, 410, '62 yr'],
                    [410, 560, '34 yr'],
                    [560, 690, '3 yr'],
                  ]
                  for (const [a, b, label] of gaps) {
                    parts.push(geo22bArrow(a + 18, y + 38, b - 18, y + 38, c22b.amber, 2))
                    parts.push(geo22bTxt((a + b) / 2, y + 64, label, 12, c22b.tealInk))
                  }
                  parts.push(geo22bTxt(385, 262, 'total span: 1832 − 450 = 1382 years', 13, c22b.ink))
                  parts.push(geo22bTxt(385, 292, 'node spacing is narrative, not to scale', 11, c22b.teal))
                  return geo22bSvg(760, 310, 'A timeline with five rungs: Proclus 450, Saccheri 1733, Playfair 1795, Lobachevsky 1829 and Bolyai 1832, with the four gaps 1283, 62, 34 and 3 years marked by arrows below, and the total span 1382 years.', parts)
                })(),
              },
            ],
          },
          {
            q: 'A transversal cuts two PARALLEL lines, and the two same-side interior angles measure $(2x + 15)^\circ$ and $(3x - 5)^\circ$. Find $x$ and both angles — then explain which logical direction your licence runs, and why that direction, unlike its converse, genuinely spends the fifth postulate.',
            solution: [
              'Sol. The lines are GIVEN parallel, so the same-side interior pair must be supplementary — the "parallels force the sum" direction.',
              'Write the ledger: $(2x + 15) + (3x - 5) = 180$.',
              'Combine: $5x + 10 = 180$, so $5x = 170$ and $x = 34$.',
              'Recover the angles: $2(34) + 15 = 83^\circ$ and $3(34) - 5 = 97^\circ$; check the ledger: $83^\circ + 97^\circ = 180^\circ$.',
              'Now, the direction is the deep part. "Sum $180^\circ$ forces parallel" (exercise 1’s licence) is I.28 — provable WITHOUT the fifth postulate. The direction used here, "parallel forces sum $180^\circ$", is I.29 — the first proposition of the Elements that actually SPENDS the fifth postulate; lesson 2.3 watches Euclid do it.',
              'Hence $x = 34$, the angles are $83^\circ$ and $97^\circ$, and the licence is the fifth-costing direction, I.29.',
            ],
            answer: '$x = 34$; the angles are $83^\circ$ and $97^\circ$ (licence: the I.29 direction — the one that spends the fifth postulate)',
          },
        ],
      },
      {
        level: 'L6',
        questions: [
          {
            q: 'On a sphere, take two DISTINCT great circles — say two different meridians. Prove they must meet, count the meeting points exactly, and state the spherical entry of the parallel census. Why does the fifth postulate’s machinery never engage there?',
            solution: [
              'Sol. A great circle is the intersection of the sphere’s surface with a plane passing through the centre $O$.',
              'Two distinct great circles give two distinct planes through $O$ — and two distinct planes through a common point share a whole LINE through that point (chapter 1’s incidence facts).',
              'That line pierces the sphere in exactly two ANTIPODAL points, one at the end of each ray from $O$, and each piercing point lies on both great circles: the meeting count is exactly $2$, never $0$.',
              'So no two distinct great circles avoid each other, and through a point off a given great circle there are ZERO parallels: the census reads $0$.',
              'The honest footnote: the sphere bends more than one Euclidean rule (its lines close up, so the ordering postulates fail too — chapter 11 separates the debts); but as the census’s middle witness it does its job — it shows that "exactly one" was a choice, never a necessity.',
              'Hence: two distinct great circles meet in exactly $2$ antipodal points, and the spherical parallel count is $0$.',
            ],
            answer: 'Exactly $2$ antipodal meeting points; the spherical parallel count is $0$',
          },
          {
            q: 'State the parallel census — the number of parallels through a point $P$ off a line $\ell$ in the Euclidean, spherical and hyperbolic geometries — and decompose each count against the two halves of Playfair’s $\exists!$: which half fails where? (The trio of panels beside this solution draws all three worlds.)',
            solution: [
              'Sol. The census, banked in this lesson as chapter 11’s preview: EUCLIDEAN — exactly $1$; SPHERICAL — $0$; HYPERBOLIC — infinitely many.',
              'Decompose $\exists!$ into its halves: EXISTENCE (at least one parallel through $P$) and UNIQUENESS (at most one).',
              'Euclidean: existence holds — the double perpendicular of exercise 7 is the drawable certificate — and uniqueness holds — the tilt sweep of exercise 8 convicts every other candidate. Count: $1$.',
              'Spherical: existence FAILS — any two great circles meet in $2$ antipodal points (exercise 14), so not even one parallel can be found through $P$. Count: $0$.',
              'Hyperbolic: existence holds in abundance, but uniqueness FAILS — through $P$ a whole fan of lines never meets $\ell$, bounded by the two dashed limiting parallels in the right panel. Count: infinitely many.',
              'Hence the census $1 / 0 / \infty$, and the lesson’s moral: each half of $\exists!$ can be paid or refused, and each refusal builds an equally consistent world — which is exactly why the two-millennium proof hunt had to fail.',
            ],
            answer: 'Euclidean: exactly $1$; spherical: $0$; hyperbolic: infinitely many — existence fails on the sphere, uniqueness fails in the hyperbolic plane',
            figures: [
              {
                caption:
                  'The parallel census in three panels: EUCLIDEAN — the double perpendicular through $P$ (bold) is the unique parallel, and both dashed tilts meet $\ell$; SPHERICAL — two great circles share the poles, so they meet in exactly $2$ antipodal points and the parallel count is $0$; HYPERBOLIC — a whole fan of lines through $P$ avoids $\ell$, bounded by the two dashed limiting parallels, so the count is infinitely many.',
                svg: (() => {
                  const parts: string[] = []
                  // three census panels
                  parts.push(geo22bRect(10, 34, 230, 272, c22b.paper, c22b.green))
                  parts.push(geo22bRect(265, 34, 230, 272, c22b.paper, c22b.green))
                  parts.push(geo22bRect(520, 34, 230, 272, c22b.paper, c22b.green))
                  parts.push(geo22bTxt(125, 60, 'EUCLIDEAN', 13.5, c22b.ink, 'middle', '700'))
                  parts.push(geo22bTxt(380, 60, 'SPHERICAL', 13.5, c22b.ink, 'middle', '700'))
                  parts.push(geo22bTxt(635, 60, 'HYPERBOLIC', 13.5, c22b.ink, 'middle', '700'))
                  // panel 1: the unique parallel via the double perpendicular + two convicted tilts
                  parts.push(geo22bLine(30, 232, 220, 232, c22b.green, 3))
                  parts.push(geo22bLine(30, 128, 220, 128, c22b.tealInk, 3.2))
                  parts.push(geo22bLine(125, 128, 125, 232, c22b.amber, 1.8, '5,5'))
                  parts.push(geo22bLine(125, 128, 42, 232, c22b.red, 1.6, '4,4'))
                  parts.push(geo22bLine(125, 128, 208, 232, c22b.red, 1.6, '4,4'))
                  parts.push(geo22bDot(42, 232, c22b.red, 3.5))
                  parts.push(geo22bDot(208, 232, c22b.red, 3.5))
                  parts.push(geo22bDot(125, 128, c22b.ink, 4.5))
                  parts.push(geo22bDot(125, 232, c22b.ink, 3))
                  // right-angle marks at P and at the foot Q
                  parts.push(geo22bLine(125, 136, 133, 136, c22b.amber, 1.6))
                  parts.push(geo22bLine(133, 136, 133, 128, c22b.amber, 1.6))
                  parts.push(geo22bLine(125, 224, 133, 224, c22b.amber, 1.6))
                  parts.push(geo22bLine(133, 224, 133, 232, c22b.amber, 1.6))
                  parts.push(geo22bTxt(135, 124, 'P', 12.5, c22b.ink))
                  parts.push(geo22bTxt(226, 240, 'ℓ', 12.5, c22b.ink))
                  parts.push(geo22bTxt(125, 108, 'unique parallel', 11.5, c22b.tealInk))
                  parts.push(geo22bTxt(125, 258, 'tilts meet ℓ', 11, c22b.red))
                  // panel 2: two great circles through the poles — 2 antipodal meeting points
                  parts.push(geo22bCirc(380, 168, 78, c22b.green, 2.6))
                  parts.push(`<ellipse cx="380" cy="168" rx="26" ry="78" fill="none" stroke="${c22b.teal}" stroke-width="2.2"/>`)
                  parts.push(`<ellipse cx="380" cy="168" rx="58" ry="78" fill="none" stroke="${c22b.orange}" stroke-width="2.2"/>`)
                  parts.push(geo22bDot(380, 90, c22b.red, 4.5))
                  parts.push(geo22bDot(380, 246, c22b.red, 4.5))
                  parts.push(geo22bTxt(380, 78, '2 antipodal points', 11, c22b.red))
                  parts.push(geo22bTxt(380, 272, 'two great circles', 11, c22b.teal))
                  // panel 3: the fan of parallels between two dashed limiting parallels
                  parts.push(geo22bLine(540, 240, 730, 240, c22b.green, 3))
                  parts.push(`<path d="M 540 116 Q 590 124 635 128 Q 688 148 734 230" fill="none" stroke="${c22b.amber}" stroke-width="2" stroke-dasharray="6,5"/>`)
                  parts.push(`<path d="M 730 116 Q 680 124 635 128 Q 582 148 536 230" fill="none" stroke="${c22b.amber}" stroke-width="2" stroke-dasharray="6,5"/>`)
                  parts.push(`<path d="M 552 196 Q 594 126 635 128 Q 676 126 718 196" fill="none" stroke="${c22b.teal}" stroke-width="2.2"/>`)
                  parts.push(`<path d="M 566 172 Q 601 130 635 128 Q 669 130 704 172" fill="none" stroke="${c22b.tealInk}" stroke-width="2.2"/>`)
                  parts.push(`<path d="M 560 100 Q 597 132 635 128 Q 673 132 710 100" fill="none" stroke="${c22b.green}" stroke-width="2.2"/>`)
                  parts.push(geo22bDot(635, 128, c22b.ink, 4.5))
                  parts.push(geo22bTxt(645, 124, 'P', 12.5, c22b.ink))
                  parts.push(geo22bTxt(738, 244, 'ℓ', 12.5, c22b.ink))
                  parts.push(geo22bTxt(635, 88, 'fan of parallels', 11, c22b.tealInk))
                  // verdicts
                  parts.push(geo22bTxt(125, 292, 'exactly 1', 13.5, c22b.orange, 'middle', '700'))
                  parts.push(geo22bTxt(380, 292, '0', 13.5, c22b.orange, 'middle', '700'))
                  parts.push(geo22bTxt(635, 292, 'infinitely many', 13.5, c22b.orange, 'middle', '700'))
                  return geo22bSvg(760, 320, 'Three census panels: Euclidean, with one bold parallel through P above a line and two dashed tilts that meet it; spherical, with two great circles through the poles meeting at two antipodal points; hyperbolic, with a fan of parallels through P between two dashed limiting parallels above a line.', parts)
                })(),
              },
            ],
          },
        ],
      },
      /* === GEO22B-SETS-MORE === */
      ],
    },
  /* -------------------------------------------------------------- */
  /* coda — the "what you now own" wrap, pointing forward to 2.3    */
  /* -------------------------------------------------------------- */
  { kind: 'heading', text: 'What you now own' },
  {
    kind: 'para',
    text: 'This lesson set out to give the awkward postulate its own stage, and it leaves you holding the whole story. Parallel lines are defined by a promise no drawing can check — never meeting, all the way out to infinity — and the fifth postulate is the supply line that converts that promise into arithmetic: add the same-side interior angles, and any side summing under $180^\circ$ convicts the lines to a meeting on that very side, while the two sums always trade against each other through $360^\circ$. Proclus called the postulate repugnant in 450 CE; Saccheri nearly stumbled into the other world in 1733; Playfair compressed the claim to "exactly one parallel" in 1795; Lobachevsky and Bolyai walked through the door in 1829 and 1832. The census they forced on geometry — one parallel, zero, infinitely many — is now yours to read off any proposed world, together with the equidistant character that separates Euclidean strips of constant width from hyperbolic gaps that grow without bound.',
  },
  {
    kind: 'para',
    text: 'The next lesson cashes the first cheque. Lesson 2.3 follows Euclid to Book I, Proposition 29 — the exact place where, for the first time in the Elements, the fifth postulate is spent — and watches the transversal census fall out: alternate angles equal, corresponding angles equal, same-side interiors supplementary whenever parallels are cut. Everything there runs on what you built here, and the angle sum of the triangle (lesson 2.4) is the dividend after that. Keep the two faces of the postulate in view as you go: the quantifier $\exists!$ that Playfair made explicit, and the verdict arithmetic that Euclid hid inside his longest sentence. Two thousand years of geometers tried to make those faces go away; you now know precisely why they could not — and what worlds open the moment you refuse them.',
  },
]
