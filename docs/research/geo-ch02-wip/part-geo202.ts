import type { Lesson } from '../../../src/data/library/types'

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c22 = {
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
const f22 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo22 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo22Txt = (
  x: number, y: number, s: string,
  size = 13, color = c22.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f22}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo22Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c22.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo22Circ = (
  cx: number, cy: number, r: number, color = c22.ink, w = 2.5, fill = 'none',
): string =>
  `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${fill}" stroke="${color}" stroke-width="${w}"/>`

const geo22Dot = (x: number, y: number, color = c22.ink, r = 4): string =>
  `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}"/>`

const geo22Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo22Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo22Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c22.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return (
    geo22Line(x1, y1, x2, y2, color, w) + geo22Head(x2, y2, a, color, 8)
  )
}

const geo22Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/* screen-coords angle helpers (y grows downward, as in SVG) */
const geo22R = (d: number): number => (d * Math.PI) / 180
const geo22Pt = (x: number, y: number, angDeg: number, r: number): [number, number] => [
  x + r * Math.cos(geo22R(angDeg)),
  y + r * Math.sin(geo22R(angDeg)),
]

/** filled wedge from angle a1 to a2 (degrees, screen coords, increasing) */
const geo22Wedge = (
  cx: number, cy: number, r: number, a1: number, a2: number, fill: string,
): string => {
  let hi = a2
  while (hi <= a1) hi += 360
  const [x1, y1] = geo22Pt(cx, cy, a1, r)
  const [x2, y2] = geo22Pt(cx, cy, a2, r)
  const large = hi - a1 > 180 ? 1 : 0
  return `<path d="M ${cx.toFixed(1)} ${cy.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${fill}" stroke="none"/>`
}

/** stroked arc from angle a1 to a2 (degrees, screen coords) */
const geo22Arc = (
  cx: number, cy: number, r: number, a1: number, a2: number,
  color = c22.amber, w = 2,
): string => {
  let hi = a2
  while (hi <= a1) hi += 360
  const [x1, y1] = geo22Pt(cx, cy, a1, r)
  const [x2, y2] = geo22Pt(cx, cy, a2, r)
  const large = hi - a1 > 180 ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}"/>`
}

/** right-angle mark: two short strokes at a corner on horizontal/vertical lines */
const geo22RA = (x: number, y: number, dir: 'up' | 'down', s = 7): string => {
  const yy = dir === 'up' ? y - s : y + s
  return geo22Line(x - s, y, x - s, yy, c22.amber, 1.6) + geo22Line(x - s, yy, x, yy, c22.amber, 1.6)
}

/* ================================================================== */
/* LESSON 2.2 — Parallel Lines and the Fifth Postulate                 */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* back-half namespace (seat 127-b): palette c22b + geo22b helpers    */
/* ------------------------------------------------------------------ */
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

export const lessonGeo202: Lesson = {
  id: 'geo-parallel-lines-and-the-fifth-postulate',
  number: '2.2',
  title: 'Parallel Lines and the Fifth Postulate',
  concepts: [
    'parallel lines',
    'parallel postulate',
    "Playfair's axiom",
    'transversal',
    'same-side interior angles',
    'equidistant lines',
    'non-Euclidean geometry',
  ],
  objectives: [
    'Define parallel lines precisely and explain why "never meeting" is a claim about the infinite that no drawing can settle',
    "Restate Euclid's fifth postulate in angle-arithmetic form and apply the meet-side verdict (sum under 180 degrees) with reasons",
    'Use the side-sum law — the two same-side interior sums add to 360 degrees — to convert any one-sided reading into the full verdict',
    "Unpack Playfair's 'exactly one' into its existence and uniqueness halves and say which half costs the fifth postulate",
    'Recount the historical ladder from Proclus to Bolyai with the pinned year gaps, and explain why the proof hunt had to fail',
    'State the parallel census across the Euclidean, spherical and hyperbolic geometries and explain the equidistance character of parallels',
  ],
  prerequisites: ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures'],
  sources: ['geo-euclid-elements', 'geo-hilbert-grundlagen', 'geo-ch02-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The postulate that would not behave' },
    {
      kind: 'para',
      text: 'Lesson 1.2 handed you Euclid’s five postulates and quietly flagged one of them: the fifth, we said, was the awkward one — the rule that reads like a theorem, makes a promise about lines so far apart that no drawing can check it, and sticks out of the tidy rulebook like a loose nail. This lesson gives that nail its own stage. Parallel lines are the subject, the fifth postulate is the engine, and the story that joins them — two thousand years of failed proofs crowned by a discovery that changed what the word "geometry" means — is the reason this chapter is arranged the way it is.',
    },
    {
      kind: 'para',
      text: 'Here is the plan of attack. First we define what parallel lines ARE, and immediately notice something unsettling: the definition makes a promise about the infinite — never meeting — and an infinite promise cannot be checked, only derived. Then we reread Euclid’s fifth postulate slowly, in our own words, and find that it is really a rule of ARITHMETIC with angles: add the two same-side interior angles a transversal creates, compare the sum with $180^\circ$, and the postulate tells you on which side the two lines are destined to meet. Then comes the history — Proclus complaining in 450 CE, Saccheri almost discovering another world in 1733, Playfair cleaning the statement up in 1795, and Lobachevsky and Bolyai walking through the door in 1829 and 1832. Finally we take the census the story produced — how many parallels pass through a point off a line: one, zero, or infinitely many — and ask what each answer does to the geometry built upon it.',
    },
    {
      kind: 'para',
      text: 'A word about tone before we begin. Nothing in this lesson is decorative. Every angle sum is computed — the verify-engine behind this book re-derives each number before it reaches the page — the year gaps are counted, and every claim about what the fifth postulate does is either derived in front of you or honestly flagged as a sketch. The lesson has one hero and one villain. The hero is the quantifier $\exists!$ — "exactly one" — which Playfair’s axiom puts to real work. The villain is the temptation to believe that a picture can settle an infinite question. Keep both in sight and the lesson reads as one long story, because that is exactly what it is.',
    },

    /* -------------------------------------------------------------- */
    /* 2. parallel defined                                            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Parallel defined: a promise about the infinite' },
    {
      kind: 'para',
      text: 'Two fences run along a road and look parallel. Are they? You can walk a hundred metres beside them and see no meeting; you cannot walk forever. Yet "parallel" is a claim about FOREVER. That is the first and most important structural fact about the definition we are about to give: it asserts something no finite inspection can ever verify — which is precisely why the theory will need a postulate to manage it. Hold that thought through the definition and the whole lesson falls into place.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Parallel lines (in a plane)',
      text: 'Two DISTINCT lines $m$ and $n$ lying in one plane are said to be PARALLEL if they have no point in common; we write $m \\parallel n$. The word "distinct" is part of the definition itself: a line never meets itself, but we do not count a line as parallel to itself — parallelism is a relation between two different objects, like "sister", not a property one object carries alone. Thus, to call $m \\parallel n$ is to assert three things at once: $m$ and $n$ are coplanar, $m \\neq n$, and no point lies on both.',
    },
    {
      kind: 'equation',
      latex: 'm \\parallel n \\iff \\bigl(m, n \\text{ coplanar}\\bigr) \\wedge \\bigl(m \\neq n\\bigr) \\wedge \\bigl(m \\cap n = \\varnothing\\bigr)',
      note: 'the symbolic restatement: coplanar, distinct, and empty of common points — all three clauses are part of the definition',
    },
    {
      kind: 'para',
      text: 'Three reading notes, each with teeth. First, COPLANAR is a genuine restriction, not decoration: in three dimensions there exist skew lines — lines that never meet yet are not parallel, because no single plane contains both; they belong to solid geometry, later in the book. Second, DISTINCT is in the definition for an honest reason: without it, every line would be "parallel to itself" (it certainly never meets itself in a second point), and the census questions we are about to ask would all become meaningless. We state this degeneracy openly instead of hiding it in a footnote. Third, the promise concerns the INFINITE EXTENSIONS of the lines: the pencil marks in a figure are not the lines they represent — chapter 1’s postulate 2 lets every finite line be extended continuously, and "never meet" is a claim about those extensions, not about the drawn window.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution — a drawing can never certify "parallel"',
      text: 'However straight the ruler and however careful the pencil, a drawing shows only a finite window of two lines. The lines of geometry extend without end in both directions (postulate 2), so the verdict "never meet" ranges over all of that infinite length. Two lines in a figure may look parallel and meet a kilometre further on; they may look slightly tilted and be exactly parallel. A picture can SUGGEST; only a derivation can SETTLE. The entire two-thousand-year story of the fifth postulate is the story of trying to settle "never" by proof instead of by inspection.',
    },
    {
      kind: 'para',
      text: 'The notation is a single symbol: $m \\parallel n$ reads "$m$ is parallel to $n$", and the relation is symmetric — if $m \\parallel n$ then $n \\parallel m$ — because "no common point" does not care which line is named first. The real issue is deeper than notation, and it deserves its own sentence: PARALLELISM IS THE FIRST PROPERTY IN THIS BOOK THAT CANNOT BE CHECKED, ONLY PROVED OR ASSUMED. Equality of segments can be checked with a compass; incidence can be checked by looking; even an angle can be measured against a protractor. "Never meets" cannot. That gap between checking and proving is exactly the gap the fifth postulate was invented to fill — and once you see the gap clearly, you can predict the whole history: geometers will try to prove the postulate from the others, fail for two millennia, and finally discover that the failure was necessary, because other worlds disobey it.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why this definition hides a postulate',
      text: 'Compare two definitions. "Perpendicular" says: meet, at $90^\circ$. You can check the meeting and measure the angle, so perpendicularity is decidable on the spot. "Parallel" says: never meet. No measurement reaches "never". A definition that outruns every possible experiment is not thereby wrong — but it silently demands that the theory supply a derivation route for the property it names. Euclid’s fifth postulate is exactly that supply line, and the lesson of history is that no cheaper supply line exists.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the fifth postulate restated                                 */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The fifth postulate, restated as angle arithmetic' },
    {
      kind: 'para',
      text: 'Here are Euclid’s own words, in the standard translation: "That, if a straight line falling on two straight lines makes the interior angles on the same side less than two right angles, the two straight lines, if produced indefinitely, meet on that side on which are the angles less than the two right angles." Read it twice, slowly — every clause is doing precise work. A "straight line falling on" two others is what this chapter calls a TRANSVERSAL. The "interior angles on the same side" are our same-side interior pair: at the upper crossing the angle below the transversal, at the lower crossing the angle above it, both on the same side. "Less than two right angles" is degree language wearing a toga — Euclid counted in right angles, we count in degrees, and two right angles is $180^\circ$. And the tail of the sentence, "if produced indefinitely", is the infinite promise from the last section wearing ITS formal clothes: the meeting, if the postulate delivers one, may happen beyond every drawable window.',
    },
    {
      kind: 'para',
      text: 'Stripped into our vocabulary, the postulate is a conditional with a built-in compass. IF a transversal cuts two lines and one side’s same-side interior angles sum to less than $180^\circ$, THEN the two lines meet on THAT side. The contrapositive costs nothing and is worth saying now: if two lines are parallel — never meeting — then NEITHER side can carry a sum under $180^\circ$. So a parallel pair must keep both side-sums at $180^\circ$ or above; and, as the next derivation shows, the two sums are locked together so tightly that "at or above" collapses to "exactly". Before we can state that law we need one piece of bookkeeping: the two same-side sums always add to $360^\circ$, whatever the lines are doing. That is pure 2.1 arithmetic — not a grain of the fifth postulate goes into it.',
    },
    {
      kind: 'derivation',
      title: 'The side-sum law: the two same-side interior sums add to 360',
      statement: 'A transversal $t$ cuts line $m$ (upper) at $P$ and line $n$ (lower) at $Q$. Under the chapter’s label convention, the interior angles at $P$ are $a_3$ (lower-right) and $a_4$ (lower-left); those at $Q$ are $a_5$ (upper-left) and $a_6$ (upper-right). The LEFT same-side interior sum is $a_4 + a_5$; the RIGHT one is $a_3 + a_6$. Claim: $(a_4 + a_5) + (a_3 + a_6) = 360^\\circ$ always.',
      steps: [
        { label: 'Linear pair along m at P', formula: 'a_3 + a_4 = 180^\\circ', explanation: 'At the crossing $P$, the angles $a_3$ and $a_4$ are adjacent and their outer rays lie along the line $m$ — a linear pair. Lesson 2.1 proved that every linear pair sums to $180^\\circ$, and that theorem asked nothing about parallels: it is angle arithmetic at a single point, licensed by the first four postulates alone.' },
        { label: 'Linear pair along n at Q', formula: 'a_5 + a_6 = 180^\\circ', explanation: 'The same licence at the second crossing: $a_5$ and $a_6$ are adjacent at $Q$ with outer rays along $n$, so they too sum to $180^\\circ$.' },
        { label: 'Regroup the four interior angles', formula: '(a_4 + a_5) + (a_3 + a_6) = (a_3 + a_4) + (a_5 + a_6)', explanation: 'Four numbers can be grouped by SIDE of the transversal — left pair $a_4 + a_5$, right pair $a_3 + a_6$ — or by CROSSING — $a_3 + a_4$ at $P$, $a_5 + a_6$ at $Q$. Addition does not care which grouping we choose; both groupings total the same four angles.' },
        { label: 'Substitute the two linear pairs', formula: '180^\\circ + 180^\\circ = 360^\\circ', explanation: 'The crossing-grouping is two linear pairs, so the total is $360^\\circ$. Therefore the side-grouping totals $360^\\circ$ as well — and this holds for EVERY pair of lines and EVERY transversal, meeting or not, tilted or not.' },
      ],
      result: '$(a_4 + a_5) + (a_3 + a_6) = 360^\\circ$ — the left and right same-side interior sums are locked together: read either one and the other is forced to $360^\\circ$ minus it. Engine sweeps at the pinned values: $170 + 190 = 360$, $118.25 + 241.75 = 360$, $90 + 270 = 360$.',
    },
    {
      kind: 'para',
      text: 'The 360 law turns the fifth postulate into a two-sided thermometer. Sweep one line slowly and watch the left sum move; the right sum is dragged to $360^\circ$ minus whatever the left shows. Take three readings from that sweep, each engine-checked. Left sum $170^\circ$: the right is forced to $190^\circ$, the left has fallen short, and the postulate sentences the lines to meet on the LEFT. Left sum $118.25^\circ$: the right is $241.75^\circ$, and again the meeting is on the left — only more steeply, because the shortfall is fatter. Left sum $90^\circ$: the right is $270^\circ$, and even this extreme case obeys the same one rule: meet on the side whose sum fell below $180^\circ$. And when the left sum lands exactly on $180^\circ$, the 360 law forces the right to $180^\circ$ as well — no other value is available — and that configuration, both sums exactly $180^\circ$, is the PARALLEL case: no meeting on either side, ever. The boundary between "must meet left" and "must meet right" is precisely the parallel configuration at 180.',
    },
    {
      kind: 'figure',
      caption: 'The fifth postulate as a picture. Lines m (upper) and n (lower) are cut by the transversal t at P and Q. On the LEFT of t the same-side interior angles are shaded: a4 = 65° and a5 = 105°, summing to 170° — under 180°, so the fifth postulate sends the lines to their meeting point M on that side, where they cross at the deficit angle 180° − 170° = 10°. On the right, a3 = 115° and a6 = 75° sum to 190° — over 180°, so that side is certified meeting-free. The two sums are locked at 360° by the linear-pair law just derived.',
      svg: geo22Svg(900, 340, 'Two non-parallel lines m and n cut by a transversal t; the left same-side interior angles a4 equals 65 degrees and a5 equals 105 degrees are shaded and sum to 170 degrees; the lines meet at M on the left at an angle of 10 degrees; the right side angles a3 equals 115 and a6 equals 75 sum to 190 degrees.', [
        geo22Txt(450, 22, 'THE FIFTH POSTULATE AS ARITHMETIC: LEFT 170, RIGHT 190', 13, c22.ink, 'middle', '700'),
        geo22Line(12, 177.5, 880, 55.5, c22.ink, 3),
        geo22Line(12, 165.6, 880, 196, c22.ink, 3),
        geo22Line(485.4, 330, 575.8, 34, c22.teal, 3),
        geo22Wedge(555.3, 101.2, 46, 107, 172, c22.panel),
        geo22Wedge(530.1, 183.7, 44, 182, 287, c22.panel),
        geo22Arc(555.3, 101.2, 26, 352, 107, c22.amber, 1.8),
        geo22Arc(530.1, 183.7, 26, 287, 362, c22.amber, 1.8),
        geo22Dot(80, 168, c22.orange, 5),
        geo22Dot(555.3, 101.2, c22.ink, 3.5),
        geo22Dot(530.1, 183.7, c22.ink, 3.5),
        geo22Arrow(310, 196, 104, 177, c22.orange, 2),
        geo22Txt(858, 46, 'm', 13, c22.ink),
        geo22Txt(858, 214, 'n', 13, c22.ink),
        geo22Txt(592, 46, 't', 13, c22.tealInk),
        geo22Txt(572, 90, 'P', 12, c22.ink),
        geo22Txt(514, 202, 'Q', 12, c22.ink),
        geo22Txt(66, 192, 'M', 12, c22.orange),
        geo22Txt(230, 214, 'they meet at M — the angle there is 10°', 11.5, c22.orange),
        geo22Txt(505, 128, 'a4 = 65°', 12, c22.ink),
        geo22Txt(470, 156, 'a5 = 105°', 12, c22.ink),
        geo22Txt(598, 134, 'a3 = 115°', 12, c22.tealInk),
        geo22Txt(575, 153, 'a6 = 75°', 12, c22.tealInk),
        geo22Txt(370, 148, 'a4 + a5 = 170°', 12.5, c22.ink, 'middle', '700'),
        geo22Txt(370, 168, 'meet THIS side', 12, c22.orange, 'middle', '700'),
        geo22Txt(700, 148, 'a3 + a6 = 190°', 12.5, c22.ink, 'middle', '700'),
        geo22Txt(700, 168, 'no meeting this side', 12, c22.tealInk, 'middle', '600'),
      ]),
    },
    {
      kind: 'para',
      text: 'Every number printed on that figure is a witness, re-derived by the lesson’s engine before the page was allowed to show it. On the left of $t$: $a_4 = 65^\circ$ and $a_5 = 105^\circ$, sum $170^\circ$ — the shaded side, the side under $180^\circ$, the side where $M$ lives. On the right: $a_3 = 115^\circ$ and $a_6 = 75^\circ$, sum $190^\circ$ — over $180^\circ$, hence meeting-free. Notice what the arithmetic never needed: nobody located $M$, nobody extended a drawing, nobody measured the distance to the meeting. Two angle readings, one addition, one comparison against $180^\circ$ — and the infinite destiny of both lines is settled in both directions. Notice also the small number hiding at $M$: the deficit $180^\circ - 170^\circ = 10^\circ$ turns out to be EXACTLY the angle at which the two lines cross at their meeting point. Why a triangle’s angles should consense that way is the angle-sum theorem, which belongs to lesson 2.4; we plant the seed here, watch it in the figure, and cash it two lessons from now.',
    },
    {
      kind: 'formula',
      name: 'Same-side interior sums add to 360',
      latex: '(a_4 + a_5) + (a_3 + a_6) = 360^\\circ',
      note: 'two linear pairs, one per crossing — the left and right same-side sums are locked together, and the licence is pure 2.1 arithmetic (fifth-free)',
    },
    {
      kind: 'formula',
      name: 'Meet-side verdict (the fifth postulate in arithmetic)',
      latex: 'a_4 + a_5 < 180^\\circ \\;\\Rightarrow\\; m \\text{ and } n \\text{ meet on that side}',
      note: 'the whole content of the fifth postulate in one line; a sum of exactly 180 on both sides (forced mutually by the 360 law) is the parallel case',
    },
    {
      kind: 'formula',
      name: 'Deficit law (preview of 2.4)',
      latex: '\\text{meeting angle} = 180^\\circ - (\\text{same-side sum on the meeting side})',
      note: 'the shortfall below 180 becomes the angle at the crossing point M — the figure witness 180 − 170 = 10; proved with the triangle angle sum in 2.4',
    },
    {
      kind: 'example',
      title: 'Two lines are cut by a transversal $t$. The same-side interior angles on the left of $t$ measure $84^\\circ$ and $79.5^\\circ$. Find the left sum, the right sum, and the verdict on where the lines meet — naming the licence behind every step.',
      steps: [
        'Sol. Add the left pair: $84^\\circ + 79.5^\\circ = 163.5^\\circ$. This is plain arithmetic; no postulate is spent in the adding.',
        'Now, the side-sum law proved above: left sum and right sum are locked at $360^\\circ$, so the right-side sum is $360^\\circ - 163.5^\\circ = 196.5^\\circ$ — over $180^\\circ$, on the nose.',
        'So, the left sum $163.5^\\circ$ is under $180^\\circ$, and the fifth postulate applies verbatim: produced indefinitely, the two lines MEET on the left of $t$ — the side that carried the smaller sum.',
        'Check the contrast case: had the left sum been exactly $180^\\circ$, the right would read $360^\\circ - 180^\\circ = 180^\\circ$ as well — both sides exactly $180^\\circ$ is the parallel signature, and no meeting happens anywhere.',
        'Hence left sum $163.5^\\circ$, right sum $196.5^\\circ$, verdict: the lines meet on the LEFT of $t$, by the fifth postulate at the comparison $163.5^\\circ < 180^\\circ$.',
      ],
    },
    {
      kind: 'para',
      text: 'One more reading before the history, because it explains the next two thousand years. The fifth postulate is an IF-THEN about a SUM: it never mentions parallel lines, never mentions distance, never mentions squares or rectangles. Its two ingredients are angle arithmetic — which lesson 2.1 owns completely — and the infinite meeting — which nothing before the fifth can settle. That mixed parentage made it look like a theorem wearing a postulate’s badge, and generation after generation of geometers believed that enough cleverness could pry it loose from the first four postulates. The story of that belief, and of its magnificent failure, is the next section.',
    },

    /* -------------------------------------------------------------- */
    /* 4. the historical unease                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The historical unease: a postulate on trial' },
    {
      kind: 'para',
      text: 'The complaint against the fifth postulate is older than most nations, and its first surviving voice belongs to Proclus, the Greek philosopher who around 450 CE wrote a commentary on the first book of the Elements — the same commentary that preserves so much of what we know about Greek geometry and its critics. Proclus had watched the postulate carefully, and his verdict on it is one of the most quoted sentences in the history of mathematics. He argued that it "ought even to be struck out of the Postulates altogether; for it is a theorem involving many difficulties" — an accusation, not a mood: in his view a statement that reads like a theorem SHOULD be a theorem, and a rulebook that assumes what it could prove has failed its own standard of cleanliness.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Historical note — Proclus, the first recorded objection (c. 450 CE)',
      text: 'Proclus of Alexandria, in his Commentary on the First Book of Euclid’s Elements, on the fifth postulate: it "ought even to be struck out of the Postulates altogether; for it is a theorem involving many difficulties." His reasoning was structural, not aesthetic. He observed that the CONVERSE of the postulate — lines that meet on a side must have that side’s sum under two right angles — is provable from the rest of the Elements (it follows from the exterior-angle inequality, which Euclid proves without the fifth). A statement whose converse is a theorem, Proclus reasoned, ought itself to be a theorem; the fact that Euclid assumed it anyway could only mean the proof had not yet been found. He was wrong about the conclusion and perfectly right about the difficulty — and the hunt he effectively began ran for nearly fourteen centuries.',
    },
    {
      kind: 'para',
      text: 'Proclus did not merely complain; he tried to fix the book. Like Ptolemy before him, he offered a proof of the fifth postulate — and his attempt is worth pausing over, because of WHERE it breaks. To settle that two lines must meet, Proclus leaned on the idea that parallel lines keep a constant distance between them: somewhere in the argument, quietly, he used the assumption that the gap between the lines never widens or narrows. Flag that move — we will return to it in the section on distance, and it is the most seductive trap in the entire subject: the equidistance property is NOT a self-evident truth about lines; it is, as the nineteenth century finally proved, exactly as strong as the fifth postulate itself. Proclus assumed the postulate’s equivalent to prove the postulate. Every attempted proof for the next fourteen hundred years failed the same way: each one smuggled in a new assumption, checked honestly, turned out to be the fifth postulate in disguise.',
    },
    {
      kind: 'para',
      text: 'Now count the years, because the arithmetic of the story is part of the story — every gap below is engine-checked. From Proclus around 450 to Saccheri’s Euclides ab omni naevo vindicatus in 1733 is 1283 years: more than a millennium of attempted proofs, each quietly circular, across the Greek, Islamic, and European mathematical worlds. Saccheri is the hinge of the tale, and lesson 1.2 has already banked his paradox: to vindicate Euclid, he assumed the fifth postulate FALSE and set out to derive a contradiction — and derived, instead, consequence after consequence of a strange but perfectly coherent geometry. Honest to his method and unwilling to accept what he had found, he pronounced the new results repugnant to the nature of the straight line and declared Euclid vindicated. He had walked up to the door of a new world, knocked, and reported that nobody was home. From Saccheri 1733 to Playfair’s cleaner statement in 1795 is 62 years. From Playfair to Lobachevsky’s publication in 1829 is 34 years. And from Lobachevsky to Bolyai in 1832 is just 3 — the shortest gap on the ladder, and the one that tells you the discovery was ripe: two young men, working separately and unknowingly, walked through the same door within three years of each other.',
    },
    {
      kind: 'para',
      text: 'Lobachevsky (1829) and Bolyai (1832) did what two millennia of hunters had declared impossible: they built a geometry in which the first four postulates hold and the fifth fails — through a point off a line, MORE than one parallel passes, infinitely many in fact — and it does not collapse into contradiction. Bolyai’s father, himself a veteran of the same hunt, had begged him to leave the parallels alone; the son answered that he had created a new and different world out of nothing. Gauss, the prince of mathematicians, had reached the same conclusion privately years earlier and published nothing. The full story of that new world — its triangles, its angle sums, its census of parallels — belongs to chapter 11, and this lesson deliberately stops at the door. What belongs to US is the logical autopsy: why had the hunt been doomed from the start?',
    },
    {
      kind: 'para',
      text: 'Lesson 1.3 gave you the tool for the autopsy: models and independence. To prove the fifth postulate from the first four, you would need an argument that works in EVERY model of the first four. But a model exists — the hyperbolic plane — in which the first four postulates (properly formulated, as Hilbert taught us to do) all hold and the fifth fails; and the sphere, with great circles as its lines, breaks the fifth in the other direction, with NO parallels at all. A statement that fails in a model of the other axioms is independent of them: no proof exists, not because geometers were lazy for 1283 years, but because the statement is simply not a consequence. The two-millennium hunt failed NECESSARILY. Proclus’s instinct — that the converse being a theorem is suspicious — was fine as instinct; the error was believing that the converse of a theorem must also be a theorem. The conditional family from 1.3 says otherwise: a conditional and its converse are different statements, and only the contrapositive comes free.',
    },

    /* -------------------------------------------------------------- */
    /* 5. Playfair's axiom                                             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Playfair’s axiom: exactly one parallel' },
    {
      kind: 'para',
      text: 'Euclid’s fifth postulate says its business through a transversal and an angle sum — machinery that takes a paragraph to set up before the sentence can even be stated. In 1795 the Scottish mathematician John Playfair popularised a restatement so clean that most modern textbooks (including the exam boards this chapter serves) use it IN PLACE of the original. It needs no transversal, no angles, no sums: just a point, a line, and a counting word.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Playfair’s axiom (1795)',
      text: 'Through a point $P$ not on a line $\\ell$ there is EXACTLY ONE line parallel to $\\ell$. Symbolically, with the counting quantifier of lesson 1.3: $\\exists!\\ m$ through $P$ with $m \\parallel \\ell$. The "exactly one" is a double claim — existence ($\\exists$: at least one such line) AND uniqueness ($\\exists!$’s sharp half: at most one) — and the two halves will turn out to have very different prices.',
    },
    {
      kind: 'para',
      text: 'Unpack the quantifier the way lesson 1.3 taught you, because the whole nineteenth century hides inside it. EXISTENCE asks: does the parallel exist at all? Uniqueness asks: could there be a second one? The two questions are independent — a world can pass one and fail the other, and the two great non-Euclidean geometries split exactly along this seam: on the sphere, through $P$ there are ZERO parallels (existence fails); on the hyperbolic plane, through $P$ there are INFINITELY many (uniqueness fails). Only Euclid’s plane — the flat plane of this chapter, the one the fifth postulate governs — passes both halves at once. When we prove the equivalence with the fifth postulate below, watch which half costs what: you will find that existence is cheap, and uniqueness is where the entire two-millennium drama lives.',
    },
    {
      kind: 'derivation',
      title: 'Equivalence, direction one: the fifth postulate implies Playfair’s axiom',
      statement: 'Assume the fifth postulate in the angle-arithmetic form of this lesson. Let $P$ be a point not on a line $\\ell$. We prove Playfair’s axiom for $P$ and $\\ell$: exactly one line through $P$ is parallel to $\\ell$. Each licence is named where it is used; the two construction licences and the 180-test are flagged as forward references to the lessons that prove them.',
      steps: [
        { label: 'Drop the perpendicular to l', formula: 'PF \\perp \\ell,\\ F \\text{ on } \\ell', explanation: 'Construct the perpendicular from $P$ to $\\ell$, meeting it at the foot $F$. This is Euclid’s Proposition I.12, a construction of the Elements — we take it on licence here. It involves no parallel machinery whatsoever.' },
        { label: 'Erect the double perpendicular', formula: 'm \\text{ through } P \\text{ with } m \\perp PF', explanation: 'At the point $P$ on the line $PF$, erect the perpendicular $m$ (Euclid I.11 — again a construction licence, again parallel-free). The figure is now a doorway: $PF$ is a transversal cutting $m$ at $P$ and $\\ell$ at $F$.' },
        { label: 'Existence — both side-sums sit at 180', formula: '90^\\circ + 90^\\circ = 180^\\circ \\text{ on each side}', explanation: 'Because $m \\perp PF$ and $PF \\perp \\ell$, the same-side interior sums along the transversal $PF$ read $90^\\circ + 90^\\circ = 180^\\circ$ on BOTH sides. A pair of lines whose side-sums both sit at $180^\\circ$ cannot meet on either side: a meeting would form a triangle violating the exterior-angle inequality (Euclid I.16 — lesson 2.4’s theorem, honestly flagged as a forward licence). Hence $m \\parallel \\ell$: existence is proved, and notice — the fifth postulate has NOT been used.' },
        { label: 'Any rival line through P is a tilt', formula: '\\theta = \\angle(m, k) > 0', explanation: 'Let $k$ be any line through $P$ other than $m$. Since $k \\neq m$, it makes with $m$ some nonzero angle $\\theta$ (with $0 < \\theta \\leq 90^\\circ$), and it tilts toward exactly one side of the transversal $PF$.' },
        { label: 'The tilt drains a side-sum', formula: '180^\\circ - \\theta < 180^\\circ', explanation: 'On the side toward which $k$ tilts, the same-side interior sum along $PF$ drops from $180^\\circ$ to exactly $180^\\circ - \\theta$: the angle at $P$ on that side shrinks by $\\theta$ while the angle at $F$ is untouched. This is angle arithmetic at a single crossing — 2.1 work, no postulate spent.' },
        { label: 'The fifth postulate convicts the tilt', formula: 'k \\text{ meets } \\ell \\text{ on that side}', explanation: 'That side-sum now reads under $180^\\circ$, which is precisely the hypothesis of the fifth postulate. Conclusion: $k$, produced indefinitely, meets $\\ell$ on that side — so $k$ is NOT parallel to $\\ell$. Here, and only here, the fifth postulate was spent.' },
        { label: 'Assemble exactly-one', formula: '\\exists\\, m \\parallel \\ell \\;\\wedge\\; \\forall\\, k \\neq m:\\ k \\text{ meets } \\ell', explanation: 'A parallel through $P$ exists (the double perpendicular, step 3), and every rival meets $\\ell$ (steps 4 through 6). Existence and at-most-one together are the $\\exists!$ of lesson 1.3 — the quantifier doing exactly the job it was designed for.' },
      ],
      result: 'The fifth postulate implies Playfair’s axiom. The audit trail is the real content: EXISTENCE cost no fifth at all — the double perpendicular and the 180-test are fifth-free — while UNIQUENESS was purchased with one single spending of the postulate, which then convicts every tilt through the same sentence.',
    },
    {
      kind: 'para',
      text: 'A sketch of the converse — flagged honestly as a sketch, because two of its licences are theorems of lesson 2.3 and one belongs to 2.4, and a proof that borrows unproved licences is not yet a proof. Suppose Playfair’s axiom holds and let a transversal cut two lines with the left same-side sum under $180^\\circ$; we want the meeting on the left. Through the upper crossing point $P$, construct the line that brings the left sum to exactly $180^\\circ$ (angle-copying at $P$ — a construction licence). That line is parallel to the lower line by the 180-test (the forward licence again), so by Playfair it is the ONLY parallel through $P$ — and the original upper line, differing from it, cannot also be parallel: it meets the lower line somewhere. The side remains to be pinned: a meeting on the right would force a triangle violating the exterior-angle inequality (2.4’s licence), and the right sum is over $180^\\circ$ — so the meeting is on the left, and the fifth postulate is recovered. Chapter 11 assembles the full equivalence with every licence proved; what this sketch establishes today is the SHAPE of the argument — Playfair and Euclid are two costumes for one and the same fact.',
    },
    {
      kind: 'figure',
      caption: 'Playfair’s axiom as a picture. The given line ℓ runs along the bottom; P sits above it. The bold green line m is the unique parallel through P — the double-perpendicular construction, with PF ⊥ ℓ at the foot F and PF ⊥ m at P, so both same-side interior sums along the transversal PF read 90° + 90° = 180°. Every red line through P is a tilt: each drains one side-sum below 180°, and the fifth postulate convicts it — the orange dots on ℓ are its verdicts, the meeting points. The greyed dashed line is the hyperbolic tease: it tilts, and Euclid’s fifth says it must therefore meet ℓ far beyond the window — but on the hyperbolic plane of chapter 11, tilted lines through P can miss ℓ forever.',
      svg: geo22Svg(900, 320, 'Playfair axiom picture: a horizontal line l at the bottom, point P above it, a bold green parallel m through P, a perpendicular PF with right-angle marks, four red tilted lines through P each meeting l at an orange dot, and one greyed dashed line through P that exits the window without meeting l.', [
        geo22Txt(450, 24, 'PLAYFAIR’S AXIOM: EXACTLY ONE PARALLEL THROUGH P', 13, c22.ink, 'middle', '700'),
        geo22Line(30, 260, 870, 260, c22.ink, 3),
        geo22Line(30, 80, 870, 80, c22.green, 4.5),
        geo22Line(450, 80, 450, 260, c22.amber, 2),
        geo22RA(450, 80, 'down'),
        geo22RA(450, 260, 'up'),
        geo22Line(450, 80, 661.8, 260, c22.red, 2),
        geo22Line(450, 80, 238.2, 260, c22.red, 2),
        geo22Line(450, 80, 750, 260, c22.red, 2),
        geo22Line(450, 80, 150, 260, c22.red, 2),
        geo22Line(450, 80, 870, 172.4, c22.teal, 2, '7,7'),
        geo22Dot(661.8, 260, c22.orange, 4),
        geo22Dot(238.2, 260, c22.orange, 4),
        geo22Dot(750, 260, c22.orange, 4),
        geo22Dot(150, 260, c22.orange, 4),
        geo22Dot(450, 80, c22.ink, 4.5),
        geo22Dot(450, 260, c22.ink, 3.5),
        geo22Txt(436, 68, 'P', 12.5, c22.ink),
        geo22Txt(436, 250, 'F', 12, c22.ink),
        geo22Txt(52, 282, 'ℓ', 13, c22.ink),
        geo22Txt(196, 66, 'the unique parallel m', 12, c22.green, 'middle', '700'),
        geo22Txt(450, 162, 'PF ⊥ ℓ and PF ⊥ m', 11.5, c22.amber),
        geo22Txt(450, 180, 'sums 90° + 90° = 180°', 11.5, c22.amber),
        geo22Txt(740, 48, 'the hyperbolic tease: on the hyperbolic', 11.5, c22.tealInk),
        geo22Txt(740, 66, 'plane, tilted lines can miss ℓ forever', 11.5, c22.tealInk),
        geo22Arrow(716, 78, 608, 112, c22.teal, 1.6),
        geo22Txt(450, 288, 'each tilt leaves a side sum under 180° — the fifth postulate convicts every tilted line', 11.5, c22.orange),
      ]),
    },
    {
      kind: 'para',
      text: 'Read the figure the way the proof ran, top to bottom. The perpendicular $PF$ is the transversal; the bold line $m$ is the double perpendicular, and its two right-angle marks ARE the existence proof — both side-sums sit at $90^\\circ + 90^\\circ = 180^\\circ$, and no meeting is possible on either side. The four red lines are four attempts at a second parallel, with tilts of various sizes; the orange dots on $\\ell$ are the fifth postulate’s verdicts — every single tilt meets $\\ell$, exactly as step 6 of the derivation promised. Notice that the conviction does not care how SMALL the tilt is: a tilt of one degree drains the sum to $179^\\circ$, still under, still convicted — the fifth postulate is a cliff with no shallow end. And the greyed dashed line? In this figure it tilts and therefore, in Euclid’s world, it too must meet $\\ell$ — far beyond the right edge of the window, at a distance no drawing could show. But label it honestly: on the hyperbolic plane, that same line would NEVER meet $\\ell$. The figure is drawing one world and whispering about another.',
    },
    {
      kind: 'formula',
      name: 'Playfair’s axiom (the exactly-one form)',
      latex: 'P \\notin \\ell\\ \\Rightarrow\\ \\exists!\\ m:\\ P \\in m \\wedge m \\parallel \\ell',
      note: 'existence is fifth-free (the double perpendicular); uniqueness is exactly what the fifth postulate buys — every tilt is convicted',
    },
    {
      kind: 'example',
      title: 'Through a point $P$ off a line $\\ell$, three candidate lines are drawn. Along a fixed transversal through $P$, their left same-side interior sums read $155^\\circ$, $180^\\circ$ and $174^\\circ$. Decide, with reasons, which of the three are parallel to $\\ell$ — the Playfair uniqueness walk.',
      steps: [
        'Sol. Test each candidate against the 180 standard, one at a time, beginning with the 180 line: its left sum is exactly $180^\\circ$, so its right sum is $360^\\circ - 180^\\circ = 180^\\circ$ as well — both sides sit exactly at $180^\\circ$, the parallel signature (the 180-test, Euclid I.28, proved in lesson 2.3). It is a parallel.',
        'Now, the 155 line: its left sum is $155^\\circ < 180^\\circ$, and the fifth postulate convicts it without appeal — produced indefinitely, it meets $\\ell$ on the left side. Not a parallel.',
        'And the 174 line: the same crime with a smaller deficit — $174^\\circ < 180^\\circ$, so it too meets $\\ell$ on the left, only at a shallower angle and much farther along. Not a parallel.',
        'So, exactly one of the three survives — the 180 line. And this is no accident of the chosen numbers: EVERY line through $P$ other than the 180 line is a tilt through some angle $\\theta$, and every tilt drains one side-sum to $180^\\circ - \\theta < 180^\\circ$, where the fifth postulate is waiting for it.',
        'Hence the parallel through $P$ is unique — the 180-sum line, and no other. The elimination walk IS Playfair’s uniqueness half, run on three candidates instead of on all lines at once.',
      ],
    },
    {
      kind: 'para',
      text: 'Pause on what the example just did, because it is the shape of every uniqueness argument in mathematics. We did not examine "all lines through $P$" one by one — there are infinitely many, and infinitudes do not surrender to lists. Instead we proved a universal sentence with one stroke: EVERY rival is a tilt, and every tilt is convicted by the same postulate. Uniqueness proofs are almost always like this — find the property that every possible rival must have, then show that property is fatal. Lesson 1.3 called this the strategy behind $\\exists!$; today you have watched it decide a question about the infinite with a single comparison at $180^\\circ$.',
    },

    /* -------------------------------------------------------------- */
    /* 6. the parallel census                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The parallel census: one, zero, or infinitely many' },
    {
      kind: 'para',
      text: 'Playfair’s axiom, read as a counting statement, asks a census question: through a point $P$ off a line $\\ell$, HOW MANY lines are parallel to $\\ell$? The Euclidean answer is pinned into this chapter’s axioms: exactly one. But the QUESTION itself is portable — it makes sense in any geometry that has points, lines and incidence — and the answer turns out to be the single most diagnostic number a geometry owns. The census has no middle floors: the count is either $1$, or $0$, or infinitely many (once a second parallel exists, the geometry supplies a whole fan — a fact chapter 11 proves with machinery we do not yet own). Here is the full census, honestly labelled as a preview: the counts are pinned today, the constructions and models that justify them belong to chapter 11.',
    },
    {
      kind: 'table',
      caption: 'The parallel census across the three geometries — a chapter 11 preview: the counts and verdicts are pinned here, the models that certify them come later',
      head: ['Geometry', 'Parallels through P off ℓ', 'What becomes of meeting', 'The Playfair verdict'],
      rows: [
        ['Euclidean — the plane of this chapter', 'exactly $1$: the double perpendicular', 'every tilted line meets $\\ell$, on the side whose same-side sum fell under $180^\\circ$', 'BOTH halves hold — existence and uniqueness; the fifth postulate is TRUE here'],
        ['Spherical — the sphere, lines = great circles', '$0$: none at all', 'any two distinct great circles meet in exactly $2$ antipodal points', 'EXISTENCE fails — there is not even one parallel to be found'],
        ['Hyperbolic — the plane of chapter 11', 'infinitely many: a whole fan through $P$', 'a fan of lines through $P$ misses $\\ell$ forever; a side-sum can sit under $180^\\circ$ with no meeting anywhere', 'UNIQUENESS fails — the fifth postulate is FALSE here'],
      ],
    },
    {
      kind: 'para',
      text: 'The spherical row deserves its own paragraph, because you carry the evidence in your travel history. The "lines" of the sphere are its GREAT CIRCLES — the circles cut on the sphere by planes through its center, like the equator and like every meridian. Great circles are the straightest things the sphere offers: walk along one and you never turn. And any two DISTINCT great circles meet in exactly two points, which are antipodal — a pair of diametrically opposite points. The meridians make this vivid: every meridian crosses every other meridian at BOTH poles. So on the sphere, through a point $P$ off a great circle $\\ell$, there is no parallel at all — every candidate meets $\\ell$ twice. Hence the airplane aside you have probably noticed without naming: long-haul routes arc toward the poles on the seat-back map because the aircraft follows a great circle, and two such routes that look almost parallel on that flat map are in fact doomed to cross — not once, but twice, at antipodal points. The flat map flatters lines into looking parallel; the sphere does not cooperate.',
    },
    {
      kind: 'para',
      text: 'The hyperbolic row is the door Saccheri knocked on and refused to open. On the hyperbolic plane, through a point $P$ off a line $\\ell$ there passes not just one parallel but an entire FAN of them: all the lines through $P$ that stay within two boundary rays miss $\\ell$ forever, and there are infinitely many of them. The fifth postulate fails there in the most concrete way possible: a transversal can cut two lines with a same-side interior sum under $180^\\circ$ — the sum can be as small as the figure on this page shows — and the lines STILL never meet. Every sentence of this lesson’s arithmetic remains true; what breaks is the postulate’s promise to convert a small sum into a meeting. We name the door, we do not walk through it: the constructions, the models, and the crowning fact — that hyperbolic geometry is as consistent as Euclidean — are chapter 11’s story.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why the census is the logical autopsy',
      text: 'Lesson 1.3 taught you that a statement is INDEPENDENT of an axiom list when some model satisfies the list but falsifies the statement — and that such a statement can never be proved from the list. The census table is exactly that argument in miniature. The Euclidean plane satisfies the fifth; the hyperbolic plane satisfies the rest while falsifying it; therefore the fifth is not a consequence of the rest, and the 1283-year proof hunt was doomed in principle, not in effort. One honesty note the table itself demands: the sphere is the intuition-pump for this argument, not yet a rigorous model — great circles close up (straining the extension postulate) and antipodal pairs sit on many "lines" (straining uniqueness of the joining line). Cleaning the axioms so that the counter-models stand on legally solid ground is precisely Hilbert’s programme and chapter 11’s opening move.',
    },

    /* -------------------------------------------------------------- */
    /* 7. distance between parallels                                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The distance between parallels: the equidistant character' },
    {
      kind: 'para',
      text: 'Ask a stranger what "parallel" means and they will draw railway tracks: two lines that stay the same distance apart forever. That picture is not wrong in Euclid’s plane — but as a DEFINITION it is a trap, and the trap’s history is Proclus’s history. Let us set the vocabulary carefully. The DISTANCE between two lines at a point of one of them is the length of the SHORTEST segment joining that point to the other line — and the shortest join, when it exists, is always the perpendicular one: a slanted connector and the perpendicular from its foot form a right triangle in which the slanted side plays the hypotenuse, and the hypotenuse is the longest side (lesson 1.5 banked this; 2.4 will re-derive it in angle language). A segment perpendicular to BOTH lines is called a COMMON PERPENDICULAR of the pair.',
    },
    {
      kind: 'para',
      text: 'In the Euclidean plane, the common perpendiculars between two parallels are all EQUAL — that is the equidistant character: the strip between the parallels has constant width, and you may measure it anywhere. Figure F3 draws the strip. The full proof that the four connectors in the left panel are equal uses the equality of alternate interior angles — Euclid I.29, famous in this chapter as the very first proposition in which Euclid SPENDS the fifth postulate — and that machinery is lesson 2.3’s centrepiece; we flag the licence forward, as always. What belongs to today is the honest bookkeeping in the other direction, and it is the point this section exists to make: the equidistant character is not a bonus property of parallels that comes free with the fifth postulate — it is EQUIVALENT to the fifth postulate. Assume every parallel pair is equidistant, and the fifth postulate follows; assume the fifth, and equidistance follows. Neither can be had without the other. That is why Proclus’s attempted proof — which quietly leaned on constant distance — was circular: it assumed the postulate’s exact equal to prove the postulate.',
    },
    {
      kind: 'figure',
      caption: 'Distance between parallels — the Euclidean strip and the counter-picture. LEFT: between the parallels m and n, four common perpendiculars are drawn, each with right-angle marks at both ends and the same tick: every one has the same length d, so the strip has constant width — the equidistant character, itself equivalent to the fifth postulate. RIGHT: the counter-picture on a circle — the latitude chords sit at equal-looking gaps of 30 above and below the equator, but they are NOT straight lines of the sphere (only great circles are), and the family dies at the poles: equal-looking gaps that do not continue.',
      svg: geo22Svg(900, 330, 'Left panel: two horizontal parallels m and n with four equal perpendicular connectors labeled d, each marked with right angles and the same tick. Right panel: a circle with a horizontal equator diameter and two dashed latitude chords at equal gaps above and below, labeled equal gaps, with a note that latitude chords are not straight lines of the sphere.', [
        geo22Txt(450, 22, 'DISTANCE BETWEEN PARALLELS — THE EUCLIDEAN STRIP AND THE COUNTER-PICTURE', 13, c22.ink, 'middle', '700'),
        geo22Rect(20, 44, 416, 240, c22.panel, c22.green),
        geo22Line(40, 100, 416, 100, c22.green, 3),
        geo22Line(40, 228, 416, 228, c22.green, 3),
        geo22Txt(408, 92, 'm', 12, c22.ink),
        geo22Txt(408, 244, 'n', 12, c22.ink),
        geo22Txt(228, 66, 'the Euclidean strip', 12.5, c22.ink, 'middle', '700'),
        geo22Line(100, 100, 100, 228, c22.amber, 2),
        geo22Line(190, 100, 190, 228, c22.amber, 2),
        geo22Line(280, 100, 280, 228, c22.amber, 2),
        geo22Line(360, 100, 360, 228, c22.amber, 2),
        geo22RA(100, 100, 'down'),
        geo22RA(190, 100, 'down'),
        geo22RA(280, 100, 'down'),
        geo22RA(360, 100, 'down'),
        geo22RA(100, 228, 'up'),
        geo22RA(190, 228, 'up'),
        geo22RA(280, 228, 'up'),
        geo22RA(360, 228, 'up'),
        geo22Line(93, 172, 107, 158, c22.ink, 1.8),
        geo22Line(183, 172, 197, 158, c22.ink, 1.8),
        geo22Line(273, 172, 287, 158, c22.ink, 1.8),
        geo22Line(353, 172, 367, 158, c22.ink, 1.8),
        geo22Txt(84, 168, 'd', 12.5, c22.tealInk, 'middle', '700'),
        geo22Txt(344, 168, 'd', 12.5, c22.tealInk, 'middle', '700'),
        geo22Txt(228, 272, 'all four perpendiculars have the same length d', 12, c22.ink),
        geo22Rect(464, 44, 416, 240, c22.panel2, c22.orange),
        geo22Txt(672, 66, 'the sphere’s latitudes', 12.5, c22.ink, 'middle', '700'),
        geo22Circ(672, 164, 82, c22.ink, 3),
        geo22Line(590, 164, 754, 164, c22.green, 3),
        geo22Line(595.7, 134, 748.3, 134, c22.amber, 2.2, '6,6'),
        geo22Line(595.7, 194, 748.3, 194, c22.amber, 2.2, '6,6'),
        geo22Line(620, 134, 620, 164, c22.teal, 2),
        geo22Line(620, 164, 620, 194, c22.teal, 2),
        geo22Txt(672, 156, 'equator', 11.5, c22.green),
        geo22Txt(548, 128, 'equal gaps', 11.5, c22.tealInk),
        geo22Arrow(586, 130, 606, 142, c22.teal, 1.6),
        geo22Txt(672, 74, 'N', 12, c22.ink),
        geo22Txt(672, 258, 'equal-looking gaps — but latitude chords', 11.5, c22.orange),
        geo22Txt(672, 274, 'are NOT straight lines of the sphere', 11.5, c22.orange),
      ]),
    },
    {
      kind: 'para',
      text: 'Read the two panels against each other — the comparison IS the lesson. The left strip continues forever with every connector equal; that tireless continuation is precisely what the fifth postulate pays for, and in the Euclidean plane it never fails. The right panel shows the nearest thing a sphere can offer: step $30$ units off the equator in each direction and you find the latitude chords, sitting at equal-looking gaps — but the picture quietly cheats twice. First, those chords are NOT lines of the sphere: a genuine spherical line is a great circle, and the latitudes are small circles — their planes miss the center — so the "strip" is not made of straight things at all. Second, the family does not continue: walk far enough along the sphere and the latitudes pinch out at the poles. Equal-looking gaps that do not continue — that is the honest caption. And the hyperbolic plane breaks the picture more sharply still: there, lines that never meet are simply NOT equidistant. Two hyperbolic parallels have a single common perpendicular — the unique shortest crossing — and as you walk away from it in either direction, the perpendicular segments between the lines grow LONGER. The gap does not hold and does not shrink: it grows, without bound, forever. A railway that widens as it runs — chapter 11 will draw it; today we only point at the door it comes through.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution — "parallel means equidistant" is a Euclidean privilege',
      text: 'The constant-width picture of parallels is TRUE in Euclid’s plane and FALSE as a general fact about "lines that never meet". Two warnings follow. First, never use equidistance to PROVE the fifth postulate or Playfair’s axiom: the equidistant character is equivalent to the postulate, so such a proof is circular — this is exactly the flaw that sank Proclus, Ptolemy, and a millennium of successors. Second, when a question says "parallel", do not silently read "equidistant": on the hyperbolic plane, parallels exist in abundance and NOT ONE of them keeps a constant distance from its partner. In this book’s convention, parallel means only: coplanar, distinct, and never meeting — everything else must be earned by a licence.',
    },

    /* -------------------------------------------------------------- */
    /* 8. exam callout + terms                                         */
    /* -------------------------------------------------------------- */
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner — which form, which quantifier, which side',
      text: 'TRAP ONE, the costume test. The postulate’s content arrives in (at least) three costumes: Euclid’s transversal form (same-side sum under two right angles forces the meeting), Playfair’s point form (exactly one parallel through an outside point), and the distance form (parallels are equidistant). When a question states one form and asks you to USE another, say which form you are invoking and in which direction — a bare "by the parallel postulate" earns half marks at best. TRAP TWO, the quantifier. "Exactly one" is TWO claims: existence AND uniqueness — and exam distractors love to swap in "at least one" (true on the hyperbolic plane), "at most one" (true even where nothing exists — zero counts as at most one, which is the spherical case), and plain "one" in a context where the geometry is not specified. Before answering a counting question about parallels, ask: WHICH GEOMETRY is the question set in? TRAP THREE, the side verdict. Given a same-side interior sum, the mark is earned in three moves: compare with $180^\\circ$, NAME the side, and give the verdict — a sum of $190^\\circ$ does NOT mean "they meet on that side"; it means the OTHER side is under $180^\\circ$ (by the 360 law) and the meeting, if the lines are not parallel, is there. A sum of exactly $180^\\circ$ means the parallel case on BOTH sides at once — the 360 law leaves no other option. TRAP FOUR, the circular proof. If a proof of the postulate’s consequence quietly uses equidistance of parallels, or "the perpendicular distance stays constant", strike it: that licence is equivalent to the postulate itself. Examiners have been setting that trap since Proclus walked into it in 450 CE.',
    },
    {
      kind: 'para',
      text: 'Gather the licences you now carry, because the next lesson will use every one of them at speed. The definition of parallel — coplanar, distinct, never meeting — and its notation $m \\parallel n$. The side-sum law $(a_4 + a_5) + (a_3 + a_6) = 360^\\circ$, licensed by two linear pairs. The meet-side verdict: the fifth postulate’s arithmetic heart, comparing a same-side sum with $180^\\circ$ and naming the side. Playfair’s $\\exists!$, with the existence half fifth-free and the uniqueness half costing exactly one spending of the postulate. The census — one, zero, infinitely many — and the year ladder that took the question from Proclus to Bolyai: 450 to 1733 to 1795 to 1829 to 1832. And the equidistant character, trusted as a picture, used as a theorem only with its fifth-postulate receipt attached. Lesson 2.3 opens Euclid’s ledger at Proposition I.29 — the exact line in the Elements where the fifth postulate is finally spent — and turns the angle census of a transversal into machinery.',
    },
    {
      kind: 'terms',
      items: [
        { term: 'parallel lines', def: 'Two DISTINCT lines in one plane with no point in common; written $m \\parallel n$. The definition asserts coplanarity, distinctness, and empty intersection — and its "never meeting" is a claim about the infinite extensions, checkable by no drawing.' },
        { term: 'transversal', def: 'A line that cuts two (or more) lines at distinct points, creating the eight-angle census that chapter 2 works with: four angles at each crossing, paired as interior/exterior and left/right.' },
        { term: 'same-side interior angles', def: 'The two angles BETWEEN the cut lines that lie on the SAME side of the transversal — at the upper crossing the lower angle, at the lower crossing the upper angle. Their sum, compared with $180^\\circ$, drives the fifth postulate’s verdict.' },
        { term: 'fifth postulate (parallel postulate)', def: 'Euclid’s assumption: if a transversal makes the same-side interior angles on one side sum to less than $180^\\circ$, the two lines — produced indefinitely — meet on that side. Equivalent to Playfair’s axiom and to the equidistant character of parallels.' },
        { term: 'Playfair’s axiom', def: 'Through a point $P$ not on a line $\\ell$ there is exactly one line parallel to $\\ell$ (1795). The "exactly one" packs existence (fifth-free, via the double perpendicular) and uniqueness (purchased by the fifth postulate’s tilt conviction).' },
        { term: 'existence and uniqueness halves', def: 'The decomposition of $\\exists!$ into "at least one" and "at most one". The sphere fails the first half (no parallels); the hyperbolic plane fails the second (infinitely many); Euclid’s plane alone passes both.' },
        { term: 'deficit', def: 'The shortfall $180^\\circ$ minus a same-side interior sum on the meeting side. In the figure witnesses it is $10^\\circ$; lesson 2.4 proves it equals the angle at which the two lines cross at their meeting point.' },
        { term: 'common perpendicular', def: 'A segment perpendicular to each of two lines, joining them. Between Euclidean parallels every common perpendicular has the same length; on the hyperbolic plane the common perpendicular between two non-meeting lines is unique and all others are longer.' },
        { term: 'equidistant lines', def: 'Two lines such that every perpendicular segment joining them has the same length. In Euclidean geometry this is exactly the parallel character; as an ASSUMPTION it is equivalent to the fifth postulate — the trap Proclus fell into.' },
        { term: 'great circle', def: 'The intersection of a sphere with a plane through its center: the sphere’s "straight lines". Any two distinct great circles meet in exactly two antipodal points, so the spherical parallel count is zero.' },
        { term: 'hyperbolic geometry', def: 'The geometry in which, through a point off a line, infinitely many parallels pass. It satisfies the fifth-free machinery of this lesson while breaking the fifth postulate’s meeting promise; its full development is chapter 11.' },
      ],
    },


    /* ==== back half (seat 127-b): quiz + exercises + coda — spliced ==== */
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

    /* === END OF BLOCKS — sections are appended above this line === */
  ],
}
