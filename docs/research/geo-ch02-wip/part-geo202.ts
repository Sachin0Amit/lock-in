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

    /* === END OF BLOCKS — sections are appended above this line === */
  ],
}
