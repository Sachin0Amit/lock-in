import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 1 "Points, Lines and Planes: the Axiomatic Idea"
 * (OPENED by the RUN 124 whole-chapter swarm, 2026-11-25: lessons 1.1 and
 * 1.2 delivered whole by the authoring agents geo101 and geo102 —
 * engines 100/100 and 86/86 green BEFORE prose; 7,532 and 8,524 words;
 * the ~2-hour run cap arrived with 1.3 + 1.4 unauthored after three
 * agent rounds, so per the protocol's time-budget law the completed
 * lessons SHIP and the remainder RIDES THE NEXT FIRE — never thinned,
 * never half-gated. The specs, the pre-flight pin checker and the two
 * green v-harnesses are preserved in docs/research/geo-ch01-wip/ for
 * the run-125 resumption.)
 *
 * PROVENANCE: ground = the run-124 web-verified research pass (Euclid's
 * Elements Book I census via Joyce's clarku edition; Hilbert's
 * Grundlagen axiom listing; Playfair 1795; Saccheri 1733 / Lobachevsky
 * 1829 / Bolyai 1832 chronology; the Fano-plane census; de Bruijn–Erdős
 * 1948) — every URL banked in docs/project/SOURCE_LOG.md under the
 * geo-* keys. STUDY-NEVER-REPRODUCE absolute: every roster, witness,
 * figure, Illustration, quiz item and exercise below is OUR OWN,
 * engine-pinned in scripts/verify-book5-ch01.ts (which re-runs both
 * verify-first harnesses against THIS file and closes with the
 * in-progress chapter census).
 */
/* ================================================================== */
/* GEO 1.1 — The Undefined Words and the Defined Ones                  */
/* Every number printed in this lesson is recomputed and pinned by     */
/* temporary-references/v-geo101.ts (engine wins over any other source).*/
/* Figure helpers: all geometry is computed from the named constants   */
/* below; SVG text stays PLAIN (no TeX, no $; minus would be U+2212).  */
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
  paper: '#fffdf5',
}
const f101 = 'ui-sans-serif, system-ui, sans-serif'

function geo11Txt(x: number, y: number, s: string, size: number, color: string, anchor = 'middle', weight = '400'): string {
  return `<text x="${x}" y="${y}" font-family="${f101}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
}
function geo11ArrowDef(): string {
  return `<defs><marker id="geo11Arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${c101.conn}"/></marker></defs>`
}
function geo11Box(x: number, y: number, w: number, h: number, fill: string, stroke: string, sw = 1.6): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`
}
function geo11Dot(x: number, y: number, r: number, fill: string): string {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${c101.white}" stroke-width="1.3"/>`
}

/* (F1) the word tower: undefined base, defined words stacked above */
function geo11TowerSvg(): string {
  const W = 780, H = 360
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The word tower: the undefined base of point, line and plane with the first defined words stacked above, each tagged with the primitives it is built from.">`,
    geo11ArrowDef(),
    // the upward rail
    `<line x1="30" y1="330" x2="30" y2="92" stroke="${c101.conn}" stroke-width="1.8" marker-end="url(#geo11Arrow)"/>`,
    geo11Txt(44, 36, 'an arrow reads: defined from', 11.5, c101.mid, 'start'),
    geo11Txt(44, 54, 'the rail reads: built upward', 11.5, c101.mid, 'start'),
    // base tier — the undefined words
    geo11Box(80, 286, 150, 56, c101.teal, c101.tealInk, 1.8),
    geo11Txt(155, 312, 'point', 14, c101.white, 'middle', '600'),
    geo11Txt(155, 331, 'dimension 0', 11.5, c101.panelB, 'middle'),
    geo11Box(330, 286, 150, 56, c101.teal, c101.tealInk, 1.8),
    geo11Txt(405, 312, 'line', 14, c101.white, 'middle', '600'),
    geo11Txt(405, 331, 'dimension 1', 11.5, c101.panelB, 'middle'),
    geo11Box(580, 286, 150, 56, c101.teal, c101.tealInk, 1.8),
    geo11Txt(655, 312, 'plane', 14, c101.white, 'middle', '600'),
    geo11Txt(655, 331, 'dimension 2', 11.5, c101.panelB, 'middle'),
    geo11Txt(390, 356, 'the undefined base — assumed, never defined', 12.5, c101.ink, 'middle', '600'),
    // storey 2 — defined from one primitive each
    geo11Box(50, 186, 170, 54, c101.white, c101.struct, 1.6),
    geo11Txt(135, 208, 'segment', 13.5, c101.ink, 'middle', '600'),
    geo11Txt(135, 228, 'from point', 11.5, c101.tealInk, 'middle'),
    geo11Box(250, 186, 170, 54, c101.white, c101.struct, 1.6),
    geo11Txt(335, 208, 'ray', 13.5, c101.ink, 'middle', '600'),
    geo11Txt(335, 228, 'from point', 11.5, c101.tealInk, 'middle'),
    geo11Box(490, 186, 180, 54, c101.white, c101.struct, 1.6),
    geo11Txt(580, 208, 'collinear', 13.5, c101.ink, 'middle', '600'),
    geo11Txt(580, 228, 'from line', 11.5, c101.tealInk, 'middle'),
    // storey 3 — defined from two primitives
    geo11Box(150, 86, 190, 56, c101.panelA, c101.struct, 1.6),
    geo11Txt(245, 110, 'intersect', 13.5, c101.ink, 'middle', '600'),
    geo11Txt(245, 130, 'from point + line', 11.5, c101.tealInk, 'middle'),
    geo11Box(440, 86, 200, 56, c101.panelA, c101.struct, 1.6),
    geo11Txt(540, 110, 'parallel', 13.5, c101.ink, 'middle', '600'),
    geo11Txt(540, 130, 'from line + plane', 11.5, c101.tealInk, 'middle'),
    // defined-from arrows for storey 2
    `<line x1="135" y1="240" x2="140" y2="284" stroke="${c101.conn}" stroke-width="1.6" marker-end="url(#geo11Arrow)"/>`,
    geo11Txt(160, 262, 'defined from', 11.5, c101.conn, 'start'),
    `<line x1="335" y1="240" x2="162" y2="284" stroke="${c101.conn}" stroke-width="1.6" marker-end="url(#geo11Arrow)"/>`,
    `<line x1="580" y1="240" x2="422" y2="284" stroke="${c101.conn}" stroke-width="1.6" marker-end="url(#geo11Arrow)"/>`,
    `</svg>`,
  ].join('')
}

/* (F2) the dimensional ladder: four rungs 0,1,2,3 */
function geo11LadderSvg(): string {
  const W = 780, H = 250
  const panels = [
    { x: 30, title: 'point', dim: 'dimension 0', sub: 'a location, no parts', fill: c101.panelB },
    { x: 215, title: 'line', dim: 'dimension 1', sub: 'length, no breadth', fill: c101.white },
    { x: 400, title: 'plane', dim: 'dimension 2', sub: 'flat, two directions', fill: c101.panelA },
    { x: 585, title: 'space', dim: 'dimension 3', sub: 'the 3-D setting', fill: c101.white },
  ]
  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The dimensional ladder in four panels: point at dimension 0, line at dimension 1, plane at dimension 2 and space at dimension 3, each rung one independent direction higher.">`,
    geo11ArrowDef(),
  ]
  panels.forEach((p) => {
    out.push(geo11Box(p.x, 40, 160, 170, p.fill, c101.struct, 1.6))
    out.push(geo11Txt(p.x + 80, 62, p.title, 13.5, c101.ink, 'middle', '600'))
    out.push(geo11Txt(p.x + 80, 78, p.dim, 11.5, c101.tealInk, 'middle'))
    out.push(geo11Txt(p.x + 80, 200, p.sub, 11.5, c101.teal, 'middle'))
  })
  // panel 1: a single point
  out.push(geo11Dot(110, 135, 6.5, c101.accent))
  // panel 2: a line with three points on it
  out.push(`<line x1="240" y1="135" x2="345" y2="135" stroke="${c101.teal}" stroke-width="2.4"/>`)
  out.push(geo11Dot(262, 135, 4.5, c101.accent))
  out.push(geo11Dot(292, 135, 4.5, c101.accent))
  out.push(geo11Dot(322, 135, 4.5, c101.accent))
  // panel 3: a plane with a line and a point lying in it
  out.push(`<polygon points="428,95 542,95 556,165 412,165" fill="${c101.panelB}" opacity="0.6" stroke="${c101.struct}" stroke-width="1.6"/>`)
  out.push(`<line x1="438" y1="150" x2="538" y2="112" stroke="${c101.teal}" stroke-width="2.2"/>`)
  out.push(geo11Dot(488, 131, 5, c101.accent))
  // panel 4: space as a box (front square + offset back square)
  out.push(`<rect x="615" y="95" width="75" height="65" fill="none" stroke="${c101.struct}" stroke-width="1.8"/>`)
  out.push(`<rect x="637" y="77" width="75" height="65" fill="none" stroke="${c101.faint}" stroke-width="1.4" stroke-dasharray="5 4"/>`)
  for (const [x1, y1, x2, y2] of [[615, 95, 637, 77], [690, 95, 712, 77], [690, 160, 712, 142], [615, 160, 637, 142]] as const) {
    out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c101.struct}" stroke-width="1.4"/>`)
  }
  // next-rung arrows between panels
  for (const [a, b] of [[194, 211], [379, 396], [564, 581]] as const) {
    out.push(`<line x1="${a}" y1="125" x2="${b}" y2="125" stroke="${c101.conn}" stroke-width="1.8" marker-end="url(#geo11Arrow)"/>`)
  }
  out.push(geo11Txt(390, 238, 'the dimensional ladder: 0 → 1 → 2 → 3 — each rung adds one independent direction', 12, c101.mid, 'middle', '600'))
  out.push(`</svg>`)
  return out.join('')
}

/* (F3) the incidence picture: a point on a line, a line in a plane, one point off */
function geo11IncidenceSvg(): string {
  const W = 780, H = 300
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The incidence relation: point P lies on line l, line l lies in plane pi, and point Q sits in the plane but off the line.">`,
    geo11ArrowDef(),
    // the plane
    `<polygon points="170,70 620,70 720,230 270,230" fill="${c101.panelA}" opacity="0.55" stroke="${c101.struct}" stroke-width="1.8"/>`,
    geo11Txt(660, 58, 'plane π', 12.5, c101.ink, 'start', '600'),
    // the line, lying in the plane
    `<line x1="300" y1="190" x2="620" y2="120" stroke="${c101.teal}" stroke-width="2.6"/>`,
    geo11Txt(628, 112, 'line l', 13, c101.tealInk, 'start', '600'),
    // point P on the line; point Q off it
    geo11Dot(460, 155, 6.5, c101.accent),
    geo11Txt(470, 148, 'point P', 12.5, c101.ink, 'start', '600'),
    geo11Dot(500, 205, 6.5, c101.ink),
    geo11Txt(508, 212, 'point Q', 12.5, c101.ink, 'start', '600'),
    // annotations
    geo11Txt(330, 90, 'P lies on l', 12.5, c101.tealInk, 'start', '600'),
    `<line x1="372" y1="96" x2="452" y2="149" stroke="${c101.conn}" stroke-width="1.2"/>`,
    geo11Txt(560, 180, 'Q does not lie on l', 11.5, c101.warn, 'start'),
    `<line x1="556" y1="184" x2="510" y2="200" stroke="${c101.warn}" stroke-width="1.2"/>`,
    geo11Txt(120, 258, 'l lies in plane π', 11.5, c101.tealInk, 'start'),
    geo11Txt(390, 285, 'the incidence relation: lies on · contains · passes through · incident with', 12, c101.mid, 'middle', '600'),
    `</svg>`,
  ].join('')
}

/* (S1) exercise 1: the classification, sorted into its two bins */
function geo11BinsSvg(): string {
  const W = 640, H = 240
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The classification sorted: bin one holds the assumed words point and plane; bin two holds the built words segment, ray and collinear.">`,
    // left bin: assumed
    geo11Box(40, 50, 280, 150, c101.white, c101.struct, 1.6),
    `<rect x="40" y="50" width="280" height="32" rx="9" fill="${c101.struct}"/>`,
    geo11Txt(180, 71, 'assumed — undefined', 12.5, c101.white, 'middle', '600'),
    geo11Box(62, 100, 90, 32, c101.teal, c101.tealInk, 1.4),
    geo11Txt(107, 121, 'point', 12.5, c101.white, 'middle', '600'),
    geo11Box(170, 100, 90, 32, c101.teal, c101.tealInk, 1.4),
    geo11Txt(215, 121, 'plane', 12.5, c101.white, 'middle', '600'),
    geo11Txt(180, 180, '2 words', 12, c101.ink, 'middle', '600'),
    // right bin: built
    geo11Box(320, 50, 280, 150, c101.white, c101.teal, 1.6),
    `<rect x="320" y="50" width="280" height="32" rx="9" fill="${c101.teal}"/>`,
    geo11Txt(460, 71, 'built — defined', 12.5, c101.white, 'middle', '600'),
    geo11Box(340, 100, 105, 32, c101.white, c101.struct, 1.4),
    geo11Txt(392, 121, 'segment', 12.5, c101.ink, 'middle', '600'),
    geo11Box(340, 140, 60, 32, c101.white, c101.struct, 1.4),
    geo11Txt(370, 161, 'ray', 12.5, c101.ink, 'middle', '600'),
    geo11Box(410, 140, 110, 32, c101.white, c101.struct, 1.4),
    geo11Txt(465, 161, 'collinear', 12.5, c101.ink, 'middle', '600'),
    geo11Txt(460, 194, '3 words', 12, c101.ink, 'middle', '600'),
    geo11Txt(320, 226, 'no defined word was built from anything but the primitives', 11.5, c101.mid, 'middle'),
    `</svg>`,
  ].join('')
}

/* (S2) exercise 11: the circular trap against the grounded chain */
function geo11LoopSvg(): string {
  const W = 640, H = 260
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The circular trap: segment defined by its endpoints and the endpoints defined by the segment, a closed loop; below it the legal chain from segment down to point.">`,
    geo11ArrowDef(),
    // the trap loop
    geo11Box(90, 50, 150, 44, c101.white, c101.warn, 1.8),
    geo11Txt(165, 77, 'segment', 13, c101.ink, 'middle', '600'),
    geo11Box(340, 50, 170, 44, c101.white, c101.warn, 1.8),
    geo11Txt(425, 71, 'its endpoints', 13, c101.ink, 'middle', '600'),
    geo11Txt(425, 87, 'the ends of the segment', 11, c101.warn, 'middle'),
    `<line x1="240" y1="64" x2="338" y2="64" stroke="${c101.warn}" stroke-width="1.8" marker-end="url(#geo11Arrow)"/>`,
    `<line x1="338" y1="88" x2="242" y2="88" stroke="${c101.warn}" stroke-width="1.8" marker-end="url(#geo11Arrow)"/>`,
    geo11Txt(320, 130, 'circular — the chase loops and never lands', 12.5, c101.warn, 'middle', '600'),
    // the grounded chain
    geo11Box(90, 180, 150, 44, c101.white, c101.struct, 1.8),
    geo11Txt(165, 207, 'segment', 13, c101.ink, 'middle', '600'),
    geo11Box(340, 180, 120, 44, c101.teal, c101.tealInk, 1.8),
    geo11Txt(400, 207, 'point', 13, c101.white, 'middle', '600'),
    `<line x1="240" y1="202" x2="338" y2="202" stroke="${c101.struct}" stroke-width="1.8" marker-end="url(#geo11Arrow)"/>`,
    geo11Txt(320, 244, 'grounded — the chase lands on a primitive', 12.5, c101.struct, 'middle', '600'),
    `</svg>`,
  ].join('')
}

/* (S3) exercise 14: the triangle model and its renaming */
function geo11RenameSvg(): string {
  const W = 640, H = 300
  const tri = (sx: number): Array<[number, number, number, number]> => {
    const a: [number, number] = [sx + 130, 80], b: [number, number] = [sx + 60, 220], c: [number, number] = [sx + 260, 220]
    return [[a[0], a[1], b[0], b[1]], [a[0], a[1], c[0], c[1]], [b[0], b[1], c[0], c[1]]]
  }
  const L = tri(0), R = tri(330)
  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The triangle model renamed: the same three points and three pair-lines, labelled a, b, c on the left and table, chair, beer mug on the right; the incidence census is unchanged.">`,
    geo11ArrowDef(),
  ]
  for (const [x1, y1, x2, y2] of L) out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c101.teal}" stroke-width="2.2"/>`)
  for (const [x1, y1, x2, y2] of R) out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c101.teal}" stroke-width="2.2"/>`)
  for (const [x, y] of [[130, 80], [60, 220], [260, 220]] as const) out.push(geo11Dot(x, y, 6, c101.accent))
  for (const [x, y] of [[460, 80], [390, 220], [590, 220]] as const) out.push(geo11Dot(x, y, 6, c101.accent))
  out.push(geo11Txt(130, 66, 'a', 13, c101.ink, 'middle', '600'))
  out.push(geo11Txt(48, 236, 'b', 13, c101.ink, 'middle', '600'))
  out.push(geo11Txt(272, 236, 'c', 13, c101.ink, 'middle', '600'))
  out.push(geo11Txt(460, 66, 'table', 12.5, c101.ink, 'middle', '600'))
  out.push(geo11Txt(378, 240, 'chair', 12.5, c101.ink, 'middle', '600'))
  out.push(geo11Txt(602, 240, 'beer mug', 12.5, c101.ink, 'middle', '600'))
  out.push(geo11Txt(88, 146, 'ab', 11.5, c101.tealInk, 'end'))
  out.push(geo11Txt(201, 146, 'ac', 11.5, c101.tealInk, 'start'))
  out.push(geo11Txt(160, 240, 'bc', 11.5, c101.tealInk, 'middle'))
  out.push(`<line x1="300" y1="150" x2="345" y2="150" stroke="${c101.conn}" stroke-width="1.8" marker-end="url(#geo11Arrow)"/>`)
  out.push(geo11Txt(322, 138, 'rename', 11.5, c101.conn, 'middle', '600'))
  out.push(geo11Txt(320, 280, '3 pair-lines · 6 incidences — unchanged by renaming', 12, c101.mid, 'middle', '600'))
  out.push(`</svg>`)
  return out.join('')
}

export const lessonGeo101: Lesson = {
  id: 'geo-the-undefined-words-and-the-defined-ones',
  number: '1.1',
  title: 'The Undefined Words and the Defined Ones',
  concepts: [
    'undefined terms',
    'point',
    'line',
    'plane',
    'incidence',
    'defined terms',
    'dimension',
  ],
  objectives: [
    'State which words the theory leaves undefined and explain why the choice is forced by logic, not laziness.',
    'Classify any candidate word as undefined, defined, a primitive relation, or not a term of the theory at all.',
    'Build the first defined words — segment, ray, collinear, intersect, parallel — spending only legal ingredients.',
    'Detect circular definitions by chasing "uses" links to a loop, and state the regress-or-loop dichotomy.',
    'Work fluently with the dimensional ladder $(0, 1, 2, 3)$ and the endpoint census $2, 1, 0$.',
  ],
  prerequisites: [],
  sources: ['geo-euclid-elements', 'geo-hilbert-grundlagen'],
  blocks: [
    /* ---------------- opening motivation: no definition first ---------------- */
    { kind: 'para', text: 'Ask a child what a point is and you will get an answer at once — "a dot", "a tiny mark", "the tip of a sharpened pencil". Ask the subject itself, and you get silence. Not the silence of ignorance: geometry knows perfectly well how to draw points, join them, slice them and reason with them. The silence is a decision. Every subject must start somewhere, and mathematics starts by choosing — openly, deliberately, and with its eyes open — what it will NOT define. Those chosen words are the undefined terms, and the choice is the most powerful move in the whole discipline: it is the moment the subject stops pretending that every word can be explained by a simpler one, and instead anchors everything on a small, permanent, assumed base.' },
    { kind: 'para', text: 'This lesson is the census of that choice. We watch Euclid attempt to define everything and see precisely why his chain had to fail; we meet the three words modern geometry leaves undefined — point, line and plane — and the primitive relations hiding beside them; we build the first defined words (segment, ray, collinear, intersect, parallel) strictly from the assumed ones; and we prove why any other arrangement either loops in circles or runs backward forever. Your FM 8 work already gave you these shapes as things to draw — the dot, the edge, the flat face of a solid; this book re-grounds them as things to assume, and the difference between drawing and assuming is the difference between a picture and a theory.' },
    { kind: 'para', text: 'A promise about honesty before we begin: every count printed in this lesson — endpoint counts, dimension numbers, the census of Euclid\'s Book I, Hilbert\'s primitives, every exercise witness — is recomputed by the verification engine that accompanies this chapter, and where prose and engine ever disagree, the engine wins and the prose is corrected. The numbers you are about to read have been brute-forced, not guessed.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the silence is the method', text: 'Undefined does not mean vague, mystical or unknowable. It means: adopted, named, counted, and then constrained by axioms, with no attempt made to say what the word "is". The child\'s question — what IS a point? — has no answer inside the theory, by design. What the theory answers instead is: what does a point DO? It lies on lines; it lies between other points; it is incident with the figures the axioms go on to build. Function replaces essence, and the geometry never stumbles for lack of a definition.' },

    /* ---------------- section: Euclid's attempt ---------------- */
    { kind: 'heading', text: 'Euclid\'s Attempt — a Chain That Must End' },
    { kind: 'para', text: 'Euclid of Alexandria, working around 300 BC, produced the Elements in 13 books — the most successful textbook in the history of the subject. Book I opens not with axioms but with an attempt to define everything: 23 definitions, then 5 postulates, then 5 common notions, and then 48 propositions proved from that base. The instinct is magnificent, and the trouble is instructive. Look closely at the opening definitions — in paraphrase, since we translate rather than quote — and at what each one leans on.' },
    { kind: 'table', caption: 'Table 1 — the opening definitions of Euclid\'s Book I, in paraphrase, and the word each leans on.', head: ['Definition', 'In paraphrase', 'The leaning phrase'], rows: [
      ['Def 1', 'a point is that which has no part', 'part'],
      ['Def 2', 'a line is breadthless length', 'breadth, length'],
      ['Def 4', 'a straight line lies evenly with the points on itself', 'lies evenly'],
      ['Def 7', 'a plane surface lies evenly with the straight lines on itself', 'lies evenly'],
      ['Def 23', 'parallel straight lines are lines in the same plane that never meet in either direction', 'none — built from line and plane'],
    ] },
    { kind: 'para', text: 'Read the leaning column again, slowly. Definition 1 tells us a point has no "part" — but what is a part? Definition 2 calls a line "breadthless length" — but what is breadth, and what is length? Definition 4 says a straight line lies "evenly" with its points — and evenly is doing all the work, entirely undefined. Definition 7 repeats the same move for surfaces. Every one of these definitions borrows words MORE PRIMITIVE than the word it was supposed to define; the chain descends, rung by rung, but never lands anywhere. Only the last row of the table — Definition 23, the parallel-lines definition — is a real definition in the modern sense: it spends only line and plane, the very words we now assume.' },
    { kind: 'para', text: 'And this is not sloppiness on Euclid\'s part — it is logic, and it admits no exception. A definition chain must either end at words that are NOT defined, or run backward forever, or close into a loop. There is no fourth possibility, and we shall prove this at the end of the lesson. Euclid\'s chain runs down through part, breadth, length and lies evenly — and at the bottom, silently and without announcement, sits exactly what every modern treatment makes explicit: point, line and plane, assumed. His opening definitions are best read not as definitions but as descriptions — ways of pointing at the assumed words, invaluable for intuition, carrying no logical weight whatsoever.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — a description is not a definition', text: '"Breadthless length" paints a picture; it does not define anything. A real definition must reduce a word to ingredients already in hand — undefined words, primitive relations, and previously defined words. When the ingredients are themselves undefined-sounding, you have a description wearing a definition\'s clothes. Examination scripts lose marks for quoting Euclid\'s openings as if they were definitions; quote them as history, and cite the primitives as the actual foundation.' },

    /* ---------------- section: the three undefined words + the hidden fourth ---------------- */
    { kind: 'heading', text: 'The Three Undefined Words — and the Hidden Fourth' },
    { kind: 'para', text: 'Modern geometry keeps exactly three undefined words: point, line and plane. "Undefined" here means adopted: named, counted — three of them — and then put to work without ever being defined. Everything else in the theory, every figure and every property, must be built from these three and from what the axioms say about them. The three are not chosen at random, either: they are the words every attempted definition eventually runs into, the words Euclid\'s own chain collapsed onto. The census is discovered by failure, not decreed by taste.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the undefined terms', text: 'A term is said to be *undefined* if it is adopted into the theory without definition, its behaviour fixed only by the axioms. The undefined terms of geometry are point, line and plane. Thus, the word "point" carries no definition — only incidence, betweenness and congruence statements involving points, lines and planes.' },
    { kind: 'para', text: 'But words are only half the census, and the other half is easy to miss because it hides inside verbs. Beside the three undefined words sit the primitive relations — the hidden fourth kind of ingredient. When we say a point lies on a line, or a line contains a point, or a line passes through a point, or a point and a line are incident with each other, we are using four names for one primitive relation. When we say that $B$ lies between $A$ and $C$, that is a second primitive relation — betweenness. And when we say two segments have the same size, that is the third — congruence. The axioms of this chapter speak only through the three words and these relations; nothing else is available to them, and nothing else needs to be.' },
    { kind: 'para', text: 'It was David Hilbert\'s Grundlagen der Geometrie of 1899 that made this census explicit and complete: three primitive words — point, line, plane — and three primitive relations — incidence, betweenness and congruence — carrying five axiom groups: 8 incidence axioms (I.1–I.8), 4 betweenness axioms (II.1–II.4), 6 congruence axioms (III.1–III.6), 1 parallel axiom (IV.1) and 2 continuity axioms (V.1–V.2). Even the axiom list itself was audited: in 1902, E. H. Moore proved one of Hilbert\'s original axioms redundant — a hint of how carefully this part of mathematics checks its own receipts. The full rulebook waits for the coming lessons of this chapter; what Lesson 1.1 claims is only the census: 3 words, 3 relations, 6 primitives in all, and nothing else assumed.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — tables, chairs and beer mugs', text: 'Hilbert\'s students preserved a remark of his on exactly this point (Otto Blumenthal\'s reminiscence is the standard source; we paraphrase rather than reproduce). Setting up a axiomatic system, Hilbert said, one must always be able to say "tables, chairs and beer mugs" instead of "points, lines and planes". The remark sounds like a joke and is the opposite of one: the WORDS carry no meaning; the AXIOMS carry everything. If tables and beer mugs satisfy the axioms, then for that system tables and beer mugs are the points — and every theorem transfers to them unchanged.' },
    { kind: 'para', text: 'Notice what the remark buys us. If the words are mere labels, then a geometry is not a study of dots and sheets at all — it is a study of structure: of whatever satisfies the axioms. Many different structures satisfy the same axioms, and later in this very lesson we shall rename the triangle\'s points as pieces of furniture and lose nothing at all. The undefined words are the price of that generality, and it is a bargain: by refusing to say what a point is, geometry became a language that can speak about networks, configurations and models no one had imagined when the words were chosen.' },

    /* ---------------- section: the defined ones ---------------- */
    { kind: 'heading', text: 'The Defined Ones — Building Upward from the Primitives' },
    { kind: 'para', text: 'With three words and three relations assumed, the defining begins — and the defining has a law. Everything built must be built from ingredients already in hand: the undefined words, the primitive relations, and words defined EARLIER. Not the word being defined itself; not a word defined later. This is the no-circularity law, and it is the whole craft of the section. We state it formally, then spend it five times.' },
    { kind: 'equation', latex: '\\text{a word is defined} \\;\\Longrightarrow\\; \\text{its ingredients} \\subseteq \\{\\text{primitives}\\} \\cup \\{\\text{earlier defined words}\\} \\tag{1}' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the no-circularity law', text: 'A word is said to be *defined* only if its definition uses nothing but undefined words, primitive relations, and words defined earlier. Thus, the allowed budget of any definition is $\\{\\text{undefined words}\\} \\cup \\{\\text{primitive relations}\\} \\cup \\{\\text{earlier defined words}\\}$ — never the word itself, and never a word that comes later in the build. Equation (1) is the whole law; every definition this book ever prints obeys it, and any candidate that violates it is rejected on sight.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — segment', text: 'A segment is said to be determined by two points $A$ and $B$ if it consists of $A$, of $B$, and of every point between them. Thus, $\\overline{AB} = \\{A\\} \\cup \\{B\\} \\cup \\{P : P \\text{ lies between } A \\text{ and } B\\}$. The two named points are the endpoints of the segment: exactly $2$ endpoints, no more and no fewer.' },
    { kind: 'para', text: 'The segment is the first defined word of the course, and notice exactly what it spends: the undefined word point, and the primitive relation betweenness — nothing else. The "territory between" is not a vague flourish: betweenness is a primitive relation with its own axiom group (Hilbert\'s group II), so "every point between $A$ and $B$" is a precise phrase, not a shrug. Of the segment\'s points, exactly two are endpoints — the two that named it — and everything else is interior. That count, $2$, is a pinned fact of this lesson, not a suggestion.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — ray', text: 'A ray is said to be determined by an origin $A$ and a second point $B$ if it consists of $A$, of $B$, of every point between them, and of every further point $P$ such that $B$ lies between $A$ and $P$. Thus, $\\overrightarrow{AB} = \\overline{AB} \\cup \\{P : B \\text{ lies between } A \\text{ and } P\\}$. The origin is the ray\'s only endpoint: $1$ endpoint, with none in the far direction.' },
    { kind: 'para', text: 'The ray spends the same ingredients as the segment — point, line for its direction, betweenness — and then does one thing more: it continues. Count its ends. The origin is named. The far direction runs on without end, so no second endpoint can be named anywhere: a census of exactly $1$ endpoint. Segment and ray are siblings — the ray is the segment continued past its second point — and the endpoint counts $2$ and $1$ are the classic way examiners tell them apart. A full line, by contrast, is not defined at all here: it is an undefined word, with $0$ endpoints, running on in both directions without ever being asked to justify itself.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — collinear and non-collinear', text: 'Points are said to be collinear if one line contains all of them; they are said to be non-collinear if no single line contains them all. Thus, points $P_1, P_2, \\ldots, P_k$ are collinear $\\Longleftrightarrow$ there is a line $\\ell$ with every $P_i$ lying on $\\ell$.' },
    { kind: 'para', text: 'Collinear spends the undefined word line and the incidence relation — nothing more: one line containing all the points in question. Three points are either collinear or non-collinear, and no drawing can decide the matter: only the incidence facts can, which is why the definition is written in containment language rather than in picture language.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — intersect', text: 'Two figures are said to intersect if some point lies on both of them and no other point does. Thus, figures $F_1$ and $F_2$ intersect $\\Longleftrightarrow$ there is exactly one point $P$ with $P$ lying on $F_1$ and on $F_2$; that point $P$ is the point of intersection.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — parallel lines', text: 'Two lines are said to be parallel if they lie in the same plane and do not meet in either direction. Thus, lines $\\ell \\parallel m \\Longleftrightarrow$ some plane contains both $\\ell$ and $m$, and no point lies on both. This is Euclid\'s Definition 23 of Book I, quoted in paraphrase — and it is a real definition: it spends only line and plane, the primitives.' },
    { kind: 'para', text: 'Watch the build order the definitions obey — it is the no-circularity law in action. For example,' },
    { kind: 'list', marker: 'roman', items: [
      'segment is built from point (and the betweenness relation) — one undefined word spent;',
      'ray is built from point and line (and betweenness) — the segment continued past its second point;',
      'collinear is built from line (and incidence) — containment raised to a property of several points;',
      'parallel is built from line and plane — the only word of this first storey that spends two primitives.',
    ] },
    { kind: 'figure', caption: 'Figure 1 — the word tower: the undefined base (point, line, plane) with the first defined words stacked above, each tagged with the primitives it is built from. Arrows read "defined from"; the rail reads "built upward".', svg: geo11TowerSvg() },
    { kind: 'para', text: 'The tower is more than a mnemonic. It encodes an order of dependence: nothing on the upper storeys can be stated without the base, and each storey can only use the storeys beneath it. When a later lesson defines the angle from two rays sharing an origin, it will be adding a third storey onto this one — legally, because rays are already in hand. When an examiner asks why a definition is acceptable, the answer is always the same sentence: every ingredient is either a primitive or a word defined earlier, and you can point to each one.' },

    /* ---------------- section: the dimensional ladder ---------------- */
    { kind: 'heading', text: 'The Dimensional Ladder' },
    { kind: 'para', text: 'The three undefined words climb a ladder of dimensions, and space completes it. A point occupies no directions at all — dimension $0$. A line, running along itself, has one independent direction — dimension $1$. A plane, flat with two independent directions, has dimension $2$. And space — not a fourth undefined word but the setting the axioms treat through their spatial clauses — has dimension $3$. The tuple $(0, 1, 2, 3)$ is the subject\'s address system, and every incidence statement of the coming lessons is a statement about who lives at which rung.' },
    { kind: 'figure', caption: 'Figure 2 — the dimensional ladder: point, line, plane and space at dimensions 0, 1, 2 and 3. Each rung adds exactly one independent direction.', svg: geo11LadderSvg() },
    { kind: 'para', text: 'Properties of the dimensional ladder:' },
    { kind: 'list', marker: 'disc', items: [
      'Each rung adds exactly one independent direction: $0 \\to 1 \\to 2 \\to 3$. Verified instance: a line needs only its along-direction; a plane needs the along-direction plus one cross-direction; space needs a third direction out of the flat.',
      'The rungs nest by incidence: points lie on lines, lines lie in planes, planes lie in space — and nothing lies in a point, because dimension $0$ has no directions to lie along.',
      'The ladder is the reason drawings mislead: paper is a dimension-$2$ object, so a drawn "point" has size and a drawn "line" has width. The picture is a metaphor for the mind, never the thing itself — the thing is the incidence structure.',
      'The ladder explains the hierarchy of meetings: a line and a plane can share exactly one point (dimension $1$ meeting dimension $2$), while two distinct planes in space, when they do meet, share a whole line — dimension $2$ meeting dimension $2$ drops the meeting down one rung.',
    ] },
    { kind: 'para', text: 'Keep the tuple handy: $(0, 1, 2, 3)$ for point, line, plane, space in that order. Exercise 3 drills it, and the engine pins it as $(0,1,2,3)$ — the same four numbers, in the same order, everywhere they appear in this book.' },

    /* ---------------- section: why not define them anyway ---------------- */
    { kind: 'heading', text: 'Why Not Define Them Anyway?' },
    { kind: 'para', text: 'Could we defy the silence and define point anyway? The attempt is worth making once, because its failure is a proof, not an inconvenience. Try it: "a point is that which has no part." Now define part. "A part is a piece of a thing." Define thing. Define piece. Each round defines one word but spends one more, and after $k$ rounds you still owe $k + 1$ definitions: the debt grows by one per round and never shrinks. Two exits exist, and only two. Exit one: stop somewhere — choose words to leave undefined, the primitives. Exit two: let the chain bite its own tail — definitions that borrow from each other in a circle, which define nothing. The choice of the undefined words is exit one, taken honestly and recorded in the census. The next derivation turns this story into a theorem.' },
    { kind: 'derivation', title: 'The regress-or-loop dichotomy', statement: 'Show that a finite system of words in which EVERY word is defined must contain a circular chain — so that any coherent system must leave some words undefined.', steps: [
      { label: 'Model', formula: 'w \\to u \\;\\Longleftrightarrow\\; \\text{the definition of } w \\text{ uses } u', explanation: 'A definition system is a directed graph: an arrow from each word to every word its definition uses. Primitives have no outgoing arrows; the hypothesis "every word is defined" says every word has at least one.' },
      { label: 'Chase', explanation: 'Start at any word $w_1$ and follow arrows: $w_1 \\to w_2 \\to w_3 \\to \\cdots$. Each step is legitimate, because under the hypothesis every word visited has an outgoing arrow to spend.' },
      { label: 'Pigeonhole', formula: 'n + 1 \\text{ visited positions, only } n \\text{ words available}', explanation: 'After $n$ steps the chase has visited $n + 1$ positions, but the system holds only $n$ words — so some word appears twice among them.' },
      { label: 'Conclude', explanation: 'A repeated word closes a cycle of definitions borrowing from one another; nothing inside the cycle is ever grounded on a primitive, so nothing in it is actually defined. The hypothesis defeats itself.' },
    ], result: 'Hence $\\text{every word defined} \\Rightarrow \\text{some cycle}$: a finite definition system either anchors on undefined words or loops in circles — and there is no third option.' },
    { kind: 'para', text: 'The engine does not take the pigeonhole step on faith: it enumerates ALL functional "uses" maps on systems of up to 6 words — 50069 maps in total — and verifies that every chase from every starting word repeats within $n$ steps, with the bound attained exactly by a pure 6-word cycle. The theorem is not an argument from fatigue; it is a combinatorial fact.' },
    { kind: 'para', text: 'The second reason for the silence cuts deeper, and it is the beer-mug reason. Suppose the undefined words DID carry pinned meanings — dots, sheets, edges. Then geometry would be about exactly those familiar things, and no more. By leaving the words free, the axioms describe a structure, and any structure satisfying the axioms counts as an instance. The next derivation makes this precise on the smallest honest model: the triangle, renamed as furniture.' },
    { kind: 'derivation', title: 'Renaming leaves the incidence census intact', statement: 'Show that any bijective renaming of the triangle model preserves every incidence count — so the labels are spent and the structure survives.', steps: [
      { label: 'Setup', formula: 'P = \\{a, b, c\\}, \\quad L = \\{ab, ac, bc\\}', explanation: 'The triangle model: three points, three pair-lines, every pair of points on exactly one line, six point-line incidences in all.' },
      { label: 'Rename', formula: 'f : P \\to P \\text{ bijective}', explanation: 'Let $f$ relabel the points — $a \\to$ table, $b \\to$ chair, $c \\to$ beer mug is one instance. A bijection keeps distinct labels distinct, so no two points collapse.' },
      { label: 'Translate', explanation: 'The line $ab$ maps to the line $f(a)f(b)$, still a two-point line; the statement "$P$ lies on $ab$" translates to "$f(P)$ lies on $f(a)f(b)$", which is true exactly when the original was true. Incidence statements survive word for word.' },
      { label: 'Count', formula: '3 \\text{ pairs} \\;\\Rightarrow\\; 3 \\text{ lines} \\;\\Rightarrow\\; 3 \\times 2 = 6 \\text{ incidences}', explanation: 'Every count re-reads identically after renaming: three pairs, three lines, uniqueness of the line through each pair, six incidences.' },
    ], result: 'Hence the census — $3$ pairs, $3$ lines, $6$ incidences — survives renaming untouched: the labels are spent, the structure stands.' },
    { kind: 'para', text: 'From the above discussion, it follows that:' },
    { kind: 'list', marker: 'roman', items: [
      'the undefined words are chosen, not discovered — a decision forced by the regress argument and recorded in the census;',
      'every definition spends only earned ingredients — the no-circularity law of equation (1);',
      'the meaning of the theory lives in its axioms, not its nouns — the beer-mug reading of the undefined words;',
      'renaming a model changes nothing that matters — the incidence census survives any bijection intact.',
    ] },

    /* ---------------- section: the census of words ---------------- */
    { kind: 'heading', text: 'The Census of Words' },
    { kind: 'para', text: 'The lesson\'s whole economy fits one table. Three entries are assumed; two relations are assumed (not words, but verbs); everything else is built — and each build names its ingredients, in obedience to equation (1). Read the Status column top to bottom and you are reading the tower of Figure 1 from its base upward.' },
    { kind: 'table', caption: 'Table 2 — the census of words: three assumed, two primitive relations, everything else built from them.', head: ['Entry', 'Status', 'Built from', 'Census note'], rows: [
      ['point', 'undefined', '—', 'dimension 0; census word 1'],
      ['line', 'undefined', '—', 'dimension 1; census word 2; 0 endpoints'],
      ['plane', 'undefined', '—', 'dimension 2; census word 3'],
      ['lies on / contains / passes through / incident with', 'primitive relation', '—', 'one relation, four printed names'],
      ['betweenness', 'primitive relation', '—', 'the hidden fourth kind of ingredient'],
      ['segment', 'defined', 'point', 'exactly 2 endpoints'],
      ['ray', 'defined', 'point', 'exactly 1 endpoint (the origin)'],
      ['collinear', 'defined', 'line', 'several points, one line'],
      ['intersect', 'defined', 'point, line', 'one shared point'],
      ['parallel', 'defined', 'line, plane', 'Euclid\'s Def 23; never meet in either direction'],
      ['space', 'the setting', '—', 'dimension 3; where planes sit'],
    ] },
    { kind: 'figure', caption: 'Figure 3 — the incidence relation in pictures: point P lies on line l, line l lies in plane π, and point Q sits in the plane but does not lie on l. Four names, one relation; incident or not, one verdict each.', svg: geo11IncidenceSvg() },
    { kind: 'example', title: 'Illustration 1 — Classify each candidate as undefined, defined, a primitive relation, or not a term of the theory: point, segment, breadthless, line, plane, betweenness.', steps: [
      'Sort: the candidates are point, segment, breadthless, line, plane, betweenness — six words, three possible verdicts and one refusal.',
      'point: undefined — census word 1, adopted without definition.',
      'line: undefined — census word 2; and plane: undefined — census word 3.',
      'segment: defined — two points plus the betweenness territory; built from point alone.',
      'betweenness: not a word at all but a primitive RELATION — the hidden fourth kind of ingredient, spending no definition and needing none.',
      'breadthless: no verdict available — it is a discarded descriptor from Euclid\'s Definition 2, a term of no modern axiomatic system, however evocative.',
      'Hence the bins read 3 undefined, 1 defined, 1 primitive relation, 1 not-a-term — a verdict for every candidate, and the not-a-term bin is a real bin: examiners plant words like "breadthless" precisely to catch readers who classify by vibes.',
    ] },

    /* ---------------- section: worked craft ---------------- */
    { kind: 'heading', text: 'Worked Craft — Building Definitions and Catching Loops' },
    { kind: 'para', text: 'Examination questions on this material come in two shapes. Classification asks which words are assumed and which are built — Illustration 1\'s shape. Construction asks you to build a definition legally, or to find the circular one planted in a candidate list. The second Illustration runs both shapes in one chain, and its verdict pattern is the one the exercises drill.' },
    { kind: 'example', title: 'Illustration 2 — (Exam-style) Build the definitions of segment and ray from the primitives, then detect the circular candidate planted in this list: (a) "two points and everything between them"; (b) "an origin point and one far direction"; (c) "the set of ends of a segment, together with the segment they bound".', steps: [
      'Build (a): two points $A, B$ plus every point between them — ingredients: the undefined word point and the primitive relation betweenness. Segment defined, legally.',
      'Build (b): an origin point plus one far direction along a line — ingredients: point, line, and the betweenness read that says which points lie beyond. Ray defined, legally.',
      'Now, audit (c): "the set of ends of a segment, together with the segment they bound" — it defines candidate (c) using BOTH the segment and the segment\'s own ends.',
      'Chase the loop: to know the ends you need the segment; to know the segment you need its ends. The chase from "segment" returns to "segment" at step 2 — a cycle of length 2.',
      'Verdict: (a) and (b) are legal builds from primitives; (c) is circular and is rejected on sight — a definition that borrows the word being defined, wearing a costume.',
      'Hence the planted circular definition is (c), the same 2-loop the engine pins for the exam-style exercise below: two arrows out of segment, both coming home.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this lands (exam-style)', text: 'School examinations — the NCERT class 9 chapter "Introduction to Euclid\'s Geometry" is the school canon this book modernises — ask the classification plainly: which words are undefined, how many endpoints a ray has, what the dimensional ladder reads. Olympiad logic and proof questions and university bridge courses ask the deeper shape: why the regress argument forces primitives, and how a renaming argument shows the words are labels. Nothing in this lesson claims a real paper; every item here and below is written as an exam-style drill in those two shapes, honestly labelled.' },

    /* ---------------- vocabulary ---------------- */
    { kind: 'terms', items: [
      { term: 'undefined terms', def: 'Words adopted without definition — point, line and plane. Not unknowable: chosen. The axioms speak only through them, and the choice is forced by the regress argument.' },
      { term: 'point', def: 'Undefined census word 1; dimension $0$. "That which has no part" is Euclid\'s description of it, not its definition.' },
      { term: 'line', def: 'Undefined census word 2; dimension $1$; $0$ endpoints. Breadthless length is the discarded description; the assumption is the thing.' },
      { term: 'plane', def: 'Undefined census word 3; dimension $2$. The flat setting in which lines lie and parallels are defined.' },
      { term: 'incidence', def: 'The primitive relation of lying-on: a point lies on a line, a line lies in a plane. Four printed names — lies on, contains, passes through, incident with — one relation.' },
      { term: 'betweenness', def: 'The primitive relation for "$B$ lies between $A$ and $C$" — the territory from which segments are built. Hilbert\'s axiom group II governs it.' },
      { term: 'segment', def: 'Defined from point: two points plus every point between them. Exactly $2$ endpoints; everything else interior.' },
      { term: 'ray', def: 'Defined from point and line: an origin plus one far direction. Exactly $1$ endpoint (the origin) and none in the far direction.' },
      { term: 'parallel', def: 'Defined from line and plane: two lines in the same plane that never meet in either direction — Euclid\'s Definition 23, the first storey word that spends two primitives.' },
      { term: 'the no-circularity law', def: 'A definition may spend only undefined words, primitive relations, and words defined earlier. Equation (1) of this lesson; every candidate violating it is rejected.' },
    ] },

    /* ---------------- formula cards ---------------- */
    { kind: 'formula', name: 'The dimensional ladder', latex: '\\dim(\\text{point}) = 0, \\quad \\dim(\\text{line}) = 1, \\quad \\dim(\\text{plane}) = 2, \\quad \\dim(\\text{space}) = 3', note: 'each rung adds one independent direction; the paper you draw on is permanently rung $2$.' },
    { kind: 'formula', name: 'The endpoint census', latex: '\\text{endpoints(segment)} = 2, \\quad \\text{endpoints(ray)} = 1, \\quad \\text{endpoints(line)} = 0', note: 'the classic examiner\'s triad; the ray\'s far direction names no second end.' },
    { kind: 'formula', name: 'The primitive census', latex: '\\text{undefined words} = 3, \\quad \\text{primitive relations} = 3, \\quad \\text{total primitives} = 6', note: 'point, line, plane — incidence, betweenness, congruence: nothing else assumed.' },
    { kind: 'formula', name: 'The no-circularity budget', latex: '\\text{allowed ingredients} = \\{\\text{primitives}\\} \\cup \\{\\text{earlier defined words}\\}', note: 'never the word itself; never a word defined later. Violations are 1-cycles or longer loops.' },

    /* ---------------- quiz ---------------- */
    { kind: 'quiz', title: 'Self-Check Quiz', items: [
      { q: 'Which list contains ONLY undefined terms?', options: ['point, line, plane', 'point, segment, plane', 'line, ray, plane', 'point, line, segment'], answer: 0,
        explain: 'The correct option is "point, line, plane": exactly the three words every axiomatic system adopts without definition. "point, segment, plane" fails because segment is defined from points. "line, ray, plane" fails because ray is defined from an origin point. "point, line, segment" fails for the same segment reason. Segment and ray are the first storey of defined words — they must never appear on the assumed list.' },
      { q: 'How many endpoints does a ray have?', options: ['$2$, one at each end', '$1$ — its origin', '$0$, like a line', 'infinitely many'], answer: 1,
        explain: 'The correct option is "$1$ — its origin": the definition names the origin and one far direction, so exactly one end exists. "$2$" describes a segment, whose two named points are both ends. "$0$" describes a full line, which runs on in both directions with no named end anywhere. "Infinitely many" confuses endpoints — named boundary points — with the unbounded collection of interior points the ray travels through.' },
      { q: 'Euclid\'s Definition 2 — "a line is breadthless length" — fails as a definition because:', options: ['it is factually false about lines', 'it defines only straight lines, not all lines', 'it leans on breadth and length — words more primitive than line', 'Euclid never wrote any such definition'], answer: 2,
        explain: 'The correct option is the leaning one: the phrase spends "breadth" and "length", which are more primitive than the word being defined, so using it starts an infinite regress. "Factually false" misreads the trouble as truth rather than logic — the trouble is that the ingredients are not in hand. "Only straight lines" is wrong because straightness arrives separately at Definition 4, so Definition 2 attempts all lines. "Euclid never wrote it" is false: it is Definition 2 of Book I, quoted here in paraphrase.' },
      { q: 'Hilbert\'s beer-mug remark (recalled by his student Otto Blumenthal) makes which point about point, line and plane?', options: ['geometry is best taught with physical objects on the desk', 'points, lines and planes literally are tables, chairs and beer mugs', 'undefined terms may not appear inside proofs', 'the words are replaceable labels; the axioms carry everything'], answer: 3,
        explain: 'The correct option is "the words are replaceable labels; the axioms carry everything": if tables, chairs and beer mugs satisfy the same axioms, they are points, lines and planes for that system — meaning lives in the rulebook, not the nouns. The teaching option misreads a formal remark as pedagogy. The literal option misses the "instead of": the remark says one must be ABLE to swap the words, not that the words are furniture. The third option is backwards — undefined terms appear in every proof; what is forbidden is defining them.' },
      { q: 'The no-circularity law says a definition may use:', options: ['only the three undefined words', 'only words defined later in the book', 'undefined words and words defined earlier', 'any words of the language at all'], answer: 2,
        explain: 'The correct option is "undefined words and words defined earlier": that is exactly the budget that keeps the build grounded while still allowing rich words — parallel spends line and plane, and a later lesson\'s midpoint will spend segment. "Only the three undefined words" is too strict: it would forbid ever using segment inside another definition. "Words defined later" is the forward-reference error: you cannot spend a word before it is earned. "Any words at all" reopens the circularity door — define segment by its own ends and nothing has been defined.' },
    ] },

    /* ---------------- exercises ---------------- */
    { kind: 'exercises', title: 'Exercises — The Undefined Words and the Defined Ones', sets: [
      { level: 'L1', questions: [
        {
          q: 'Classify each word of this list as undefined or defined, and name the primitive each defined word rides on: point, segment, plane, ray, collinear.',
          solution: [
            'Sort the five candidates against the lesson census: the undefined words are the ones adopted without definition.',
            'point: undefined — census word 1.',
            'plane: undefined — census word 3.',
            'segment: defined — built from point, plus the betweenness territory between two of them.',
            'ray: defined — built from point: an origin plus one far direction.',
            'collinear: defined — built from line: several points sharing one line.',
            'Hence the census reads $2$ undefined (point, plane) and $3$ defined (segment, ray, collinear) — and no defined word was built from anything but the primitives.',
          ],
          answer: '2 undefined (point, plane); 3 defined (segment, ray, collinear).',
          figures: [{ caption: 'Exercise 1, sorted: the two assumed words against the three built ones.', svg: geo11BinsSvg() }],
        },
        {
          q: 'How many endpoints has (i) a segment, (ii) a ray, (iii) a full line? Answer from the definitions, not from a drawing.',
          solution: [
            'Read each definition and count the named end points it forces.',
            '(i) Segment: two points plus everything between them — the two named points are the ends: $2$ endpoints.',
            '(ii) Ray: an origin plus one far direction — the origin is named, the far direction names no second point: $1$ endpoint.',
            '(iii) Line: an undefined word running on in both directions — no named end anywhere: $0$ endpoints.',
            'Check against the endpoint census $2, 1, 0$: the definition-free counts agree with the engine\'s pinned triad.',
            'Hence segment $2$, ray $1$, line $0$.',
          ],
          answer: 'segment 2; ray 1; line 0.',
        },
        {
          q: 'Give the dimension of point, line, plane and space as a tuple in the standard order, and say which rung of the ladder a drawing on paper itself sits at.',
          solution: [
            'Climb the ladder rung by rung, counting the independent directions each object needs.',
            'Point: no directions at all — dimension $0$.',
            'Line: one direction, along itself — dimension $1$.',
            'Plane: two independent directions — dimension $2$.',
            'Space: three independent directions — dimension $3$.',
            'The tuple is $(0, 1, 2, 3)$; and a drawing on paper is itself a plane object — dimension $2$ — a picture of the line, never the line.',
            'Hence $(0, 1, 2, 3)$, with the paper warning attached: the drawing is dimension $2$, the line is not.',
          ],
          answer: '(0, 1, 2, 3); a paper drawing sits at dimension 2.',
        },
      ] },
      { level: 'L2', questions: [
        {
          q: 'The lesson gives four names for one primitive relation. List them, use each once for the same fact (point $P$ on line $\\ell$), and state how many distinct relations the four names describe.',
          solution: [
            'The four printed names: lies on, contains, passes through, incident with.',
            '"$P$ lies on $\\ell$" — the point speaks first.',
            '"$\\ell$ contains $P$" — the line speaks first, the same fact reversed.',
            '"$\\ell$ passes through $P$" — the line in motion, the same fact again.',
            '"$P$ and $\\ell$ are incident with each other" — the symmetric, formal register of the same fact.',
            'Hence $4$ names, $1$ relation — four ways to say one incidence fact.',
          ],
          answer: '4 names; 1 relation.',
        },
        {
          q: 'Euclid\'s Book I opens with 23 definitions, 5 postulates and 5 common notions, then proves 48 propositions. Compute the number of prefatory items and the total item count of Book I, and state how many books the Elements has.',
          solution: [
            'Prefatory items = definitions + postulates + common notions = $23 + 5 + 5$.',
            'So, $23 + 5 + 5 = 33$ prefatory items.',
            'Total items = prefatory + propositions = $33 + 48 = 81$.',
            'The Elements runs $13$ books in all; Book I is the foundations opener of the thirteen.',
            'Hence $33$ prefatory items, $81$ items in Book I, $13$ books — all engine-census values.',
          ],
          answer: '33 prefatory; 81 total; 13 books.',
        },
        {
          q: 'For each of segment, ray and parallel (as defined in this lesson), list exactly which undefined words its definition spends, and give the three counts.',
          solution: [
            'Segment: "two points and everything between them" — the only undefined word spent is point: count $1$.',
            'Ray: "an origin point and one far direction" — the direction runs along a line, but the only undefined word named in the definition is point: count $1$.',
            'Parallel: "two lines in the same plane that never meet in either direction" — spends line and plane: count $2$.',
            'Check the no-circularity law: every listed ingredient is an undefined word — no definition borrows itself or a later word.',
            'Hence the counts run $1$, $1$, $2$ — and the heaviest build (parallel) still stands on primitives only.',
          ],
          answer: 'segment: point (1); ray: point (1); parallel: line and plane (2).',
        },
      ] },
      { level: 'L3', questions: [
        {
          q: 'Apply the no-circularity law to three candidate definitions of ray: (i) "the part of a line that starts at a point and runs in one direction from it"; (ii) "a segment continued forever past its far end"; (iii) "the points from the origin to nowhere". Which are legal, which illegal, and why does the build order matter for (ii)?',
          solution: [
            'Test each candidate against the allowed budget: undefined words, primitive relations, and words defined EARLIER.',
            '(i) spends line and point (both undefined) and the betweenness idea — all legal: verdict legal.',
            '(ii) spends segment, which is a defined word — legal ONLY if segment was defined earlier in the build; verdict legal-after-segment.',
            '(iii) spends "nowhere", which is neither undefined vocabulary nor any defined word — it is no term of the theory: verdict illegal.',
            'Hence exactly $1$ of the $3$ candidates is illegal, and (ii) shows the law is order-sensitive: defined words may be spent, but only after they are earned.',
          ],
          answer: '1 illegal of 3; (i) legal; (ii) legal only after segment; (iii) illegal.',
        },
        {
          q: 'A definition system says: A is defined from B, B from C, C from A. Chase the chain from A, exhibit the loop, and give its length; then contrast a system in which C is defined from point instead.',
          solution: [
            'Chase from A: the definition of A uses B.',
            'The definition of B uses c101.',
            'The definition of C uses A — the chase returns to its start.',
            'The trace reads A, B, C, A: position 3 repeats position 0.',
            'The loop has length $3$; no word in it ever lands on a primitive, so nothing in it is ever actually defined.',
            'Contrast: if C is defined from point instead, the chase runs A, B, C, point and stops on a primitive — grounded.',
            'Hence the first system is circular with cycle length $3$; the second is a legal build.',
          ],
          answer: 'cycle length 3; the contrast build is grounded.',
        },
        {
          q: 'Suppose you try to define every word, allowing each definition to introduce one new undefined-sounding word. After 4 rounds, how many words still owe definitions? Name the only two exits from the regress.',
          solution: [
            'Round $k$ defines one word but spends one new word, so after $k$ rounds the debt is $k + 1$.',
            'Round 1: owe $2$. Round 2: owe $3$. Round 3: owe $4$.',
            'Round 4: owe $5$.',
            'The debt never shrinks — it grows by one per round, forever: the infinite regress.',
            'Exit 1: stop the chain on chosen undefined words — the primitives — the honest exit this lesson takes.',
            'Exit 2: let the chain close into a circle — definitions borrowing from each other, defining nothing.',
            'Hence after 4 rounds you owe $5$, and the exits are: primitives, or a loop.',
          ],
          answer: '5 words still owe definitions; exits: primitives or a loop.',
        },
      ] },
      { level: 'L4', questions: [
        {
          q: 'Euclid\'s Definitions 1, 2, 4 and 7 (in paraphrase) each lean on a phrase more primitive than the word defined. Name the four leaning phrases and state how many distinct ones there are.',
          solution: [
            'Definition 1, "a point is that which has no part": leans on part.',
            'Definition 2, "a line is breadthless length": leans on breadth and on length.',
            'Definition 4, a straight line "lies evenly with the points on itself": leans on lies evenly.',
            'Definition 7, a plane surface "lies evenly with the straight lines on itself": leans on lies evenly again — the same phrase doing double duty.',
            'The distinct phrases: part, breadth, length, lies evenly.',
            'Hence 4 distinct leaning phrases — each one more primitive than the word it was meant to define.',
          ],
          answer: 'part, breadth, length, lies evenly — 4 distinct.',
        },
        {
          q: '(Exam-style) One of these candidate definitions of segment is circular. Find it and exhibit the loop. (i) "the set consisting of two points and everything between them"; (ii) "the part of a line cut off by two points"; (iii) "the join of two points"; (iv) "a finite line whose endpoints are the two ends of the segment".',
          solution: [
            'Audit each candidate for ingredients that point back at the word being defined.',
            '(i) spends two points and betweenness — clean.',
            '(ii) spends line and points — clean.',
            '(iii) spends two points — clean.',
            '(iv) says the segment has "endpoints … the two ends of the segment": the definition of segment spends the ENDS OF THE SEGMENT.',
            'The loop: segment defined by its endpoints, where the endpoints are the ends of the segment — the chase from segment returns at step 2, a cycle of length $2$.',
            'Hence (iv) is circular: a $2$-loop that defines a word with the word itself wearing a costume.',
          ],
          answer: '(iv) is circular (segment ↔ its endpoints, cycle length 2).',
          figures: [{ caption: 'Exercise 11: the planted definition loops on itself; the legal chain lands on point.', svg: geo11LoopSvg() }],
        },
        {
          q: 'Judge each claim true or false, with a dimension reason: (i) a line contains points but has no breadth; (ii) a plane is 3-dimensional; (iii) space is the 3-dimensional setting of geometry; (iv) a point has dimension 0.',
          solution: [
            '(i) True: a line is dimension $1$ — length without breadth — and it contains points of dimension $0$.',
            '(ii) False: a plane is dimension $2$ — two independent directions, not three; the claim swaps rung $2$ for rung $3$.',
            '(iii) True: space is dimension $3$, the setting that contains planes, lines and points.',
            '(iv) True: a point needs no directions — dimension $0$.',
            'The verdicts are T, F, T, T — and the single False is a ladder-slip, one rung too high.',
            'Hence T, F, T, T.',
          ],
          answer: 'T, F, T, T.',
        },
      ] },
      { level: 'L5', questions: [
        {
          q: 'State Hilbert\'s 1899 census of primitives — how many undefined words and how many primitive relations — name them all, and give the total.',
          solution: [
            'Hilbert\'s Grundlagen der Geometrie (1899) adopts three undefined words.',
            'The words: point, line, plane.',
            'And three primitive relations: incidence (the lies-on relation), betweenness, congruence.',
            'Total primitives: $3 + 3 = 6$.',
            'These six carry every axiom group and every theorem — nothing else is assumed anywhere in the Grundlagen.',
            'Hence $3$ words + $3$ relations = $6$ primitives.',
          ],
          answer: '3 words + 3 relations = 6 primitives.',
        },
        {
          q: 'Take the triangle as an incidence model: points {a, b, c}, lines {ab, ac, bc}. Verify that every two points lie on exactly one line, count the total point-line incidences, then rename a→table, b→chair, c→beer mug and state precisely what changed and what did not.',
          solution: [
            'List the pairs: (a, b), (a, c), (b, c) — three pairs, matching $3 \\choose 2 = 3$.',
            'Each pair lies on exactly one of the three lines: (a, b) on ab, (a, c) on ac, (b, c) on bc — uniqueness holds.',
            'Count incidences: each line carries 2 points, and $3 \\times 2 = 6$.',
            'Rename by the bijection a→table, b→chair, c→beer mug: the lines become table-chair, table-beer mug, chair-beer mug.',
            'The census re-reads: 3 pairs, 3 lines, each pair on exactly 1 line, $6$ incidences — every number survives.',
            'What changed: the labels. What did not: the structure — every incidence statement translates word for word.',
            'Hence 3 pairs on 3 lines, $6$ incidences — invariant under renaming: the words are labels, the structure is the subject.',
          ],
          answer: '3 pairs on 3 lines; 6 incidences; renaming changes labels only.',
          figures: [{ caption: 'Exercise 14: the triangle and its renaming — same structure, new labels.', svg: geo11RenameSvg() }],
        },
      ] },
      { level: 'L6', questions: [
        {
          q: 'Build the depth table of the lesson\'s definition system (point, line, plane, segment, ray, collinear, parallel, midpoint — where midpoint is defined from segment). Then prove the chase lemma: in any finite system where every word is defined, starting from any word and following "uses" links, a word must repeat within $n$ steps ($n$ = the number of words); conclude the regress-or-loop dichotomy.',
          solution: [
            'Depth of a primitive is $0$ — nothing beneath it; depth of a defined word is 1 plus the deepest word it spends.',
            'Table: point $0$, line $0$, plane $0$; segment $1$, ray $1$, collinear $1$, parallel $1$; midpoint $1 + 1 = 2$.',
            'Now the chase lemma: let the system have $n$ words, every one defined, and chase $w_1 \\to w_2 \\to w_3 \\to \\cdots$, each step following a "uses" link.',
            'Record the words visited: positions $0, 1, 2, \\ldots, n$ — that is $n + 1$ positions, drawn from only $n$ available words.',
            'By the pigeonhole principle, some word repeats within the first $n + 1$ positions — the first revisit happens by step $n$.',
            'A revisit closes a cycle of definitions borrowing from one another; nothing in the cycle is ever grounded, so "every word defined" is impossible for a finite system.',
            'The engine brute-forces ALL functional "uses" maps on systems of up to 6 words — 50069 maps — and every chase indeed repeats within $n$ steps, the bound attained exactly by a pure 6-cycle.',
            'Hence the depth table tops out at $2$, and the dichotomy holds: primitives or a loop.',
          ],
          answer: 'max depth 2; chase repeats within n steps; primitives or a loop.',
        },
      ] },
    ] },

    /* ---------------- closing ---------------- */
    { kind: 'para', text: 'The silence has now been organised: three undefined words, three primitive relations, a no-circularity law that turns them into every other figure of the course, and a proof that no other arrangement is possible. The tower of Figure 1 will grow all chapter — angles onto rays, midpoints onto segments, configurations onto all of these — and every new storey will pay the same tax: build only from what is already in hand. Lesson 1.2 takes the next step: Euclid\'s five postulates, the first rules of the game, where the undefined words finally start doing work they cannot shirk.' },
  ],
}

/* ------------------------------------------------------------------ */
/* vivid palette + font                                                */
/* ------------------------------------------------------------------ */
const c102 = {
  ink: '#166534',
  slate: '#65a30d',
  blue: '#16a34a',
  blueDeep: '#0f766e',
  teal: '#0D9488',
  purple: '#ea580c',
  red: '#DC2626',
  amber: '#D97706',
  amberVivid: '#d97706',
  green: '#16a34a',
  pink: '#dc2626',
  blueSoft: '#ffedd5',
  tealSoft: '#5eead4',
  purpleSoft: '#fef3c7',
  redSoft: '#ffedd5',
  amberSoft: '#FEF3C7',
  greenSoft: '#fef3c7',
  slateSoft: '#fcd34d',
  paper: '#fffdf5',
}
const f102 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo12 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo12Txt = (
  x: number, y: number, s: string,
  size = 13, color = c102.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f102}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo12Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c102.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo12Circ = (
  cx: number, cy: number, r: number, color = c102.ink, w = 2.5, fill = 'none',
): string =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${color}" stroke-width="${w}"/>`

const geo12Dot = (x: number, y: number, color = c102.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo12Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo12Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo12Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c102.slate, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return (
    geo12Line(x1, y1, x2, y2, color, w) + geo12Head(x2, y2, a, color, 8)
  )
}

const geo12Svg = (w: number, h: number, label: string, body: string): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`

/* ================================================================== */
/* LESSON 1.2 — Euclid’s Five Postulates: the Rules of the Game        */
/* ================================================================== */
export const lessonGeo102: Lesson = {
  id: 'geo-euclids-five-postulates-the-rules-of-the-game',
  number: '1.2',
  title: 'Euclid\u2019s Five Postulates: the Rules of the Game',
  concepts: [
    'postulate',
    'common notion',
    'straightedge',
    'compass',
    'parallel postulate',
    'two right angles',
    'construction licence',
    'extendable line',
  ],
  objectives: [
    'Distinguish Euclid’s three kinds of opening statement — definitions, postulates, common notions — and classify any given statement correctly',
    'State all five postulates in your own words and name the construction each one licenses',
    'Run the 180° shortfall arithmetic: given two interior angles on one side, decide whether the lines meet on that side and compute the shortfall',
    'Recount the Book I census (23 definitions, 5 postulates, 5 common notions, 48 propositions) and explain what the rules buy together',
    'Place Playfair 1795, Saccheri 1733, Lobachevsky 1829, Bólyai 1832 and Hilbert 1899 in the correct order and say what each contributed',
  ],
  prerequisites: ['geo-the-undefined-words-and-the-defined-ones'],
  sources: ['geo-euclid-elements', 'geo-playfair-1795', 'geo-non-euclid-chronology'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'From vocabulary to permission' },
    {
      kind: 'para',
      text: 'Lesson 1.1 left us with a well-dressed stage. Twenty-three definitions described the cast: point, line, straight line, surface, plane, angle, right angle, circle and its parts. Every one of those definitions is vocabulary — it tells us what a word will mean, and nothing more. But a definition cannot make anything happen. "A straight line is a line which lies evenly with the points on itself" does not hand you a line; it merely tells you what to call one once you have it. Geometry, as Euclid found it, still needed PERMISSION — statements that say what may be DONE without proof, and what may be ASSUMED without proof. Without such a licence list, the very first proof in the Elements would have nowhere to stand.',
    },
    {
      kind: 'para',
      text: 'Euclid’s move — the move that makes the Elements the template for every rigorous subject written since — was to keep the permission list ruthlessly short. In Book I he allows himself exactly five postulates: five statements about what may be constructed and assumed, specific to geometry. Beside them he places five common notions: five general truths about equality and comparison that are not special to geometry at all (they would serve arithmetic or measurement just as well). Everything else in Book I — all forty-eight propositions — must be earned from that base of twenty-three definitions, five postulates and five common notions. Nothing may be smuggled in: no diagrams that claim more than the text licenses, no "obviously" that is not licensed by the list.',
    },
    {
      kind: 'para',
      text: 'Why five? Because the game needs just enough to get started and no more. Two postulates license the straightedge (draw a line, extend a line), one licenses the compass (draw a circle), one calibrates the ruler (all right angles are equal), and one — the strangest and greatest of them — makes a promise about the far-away behaviour of two lines. Five permissions, five counting rules, twenty-three words: that is the entire starting equipment of deductive geometry. This lesson walks the five postulates one by one, watches them work together on Book I’s opening construction, and then follows the fifth postulate through its two-thousand-year trial — the longest-running open problem in the history of mathematics, resolved at last by proving that it could never be proved.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the two lists                                               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Two lists: postulates and common notions' },
    {
      kind: 'para',
      text: 'Euclid’s Book I opens with three lists, and the distinction between the second and third is a genuine exam skill. The postulates are geometry-specific permissions: each one either licenses a construction (something you may now DO with straightedge or compass) or asserts a geometric fact (something you may now ASSUME about points, lines, angles). The common notions are general truths about equality and magnitude: they mention no geometric objects at all — only "things", "equals", "wholes" and "parts" — and they would be at home in a book on arithmetic. When you are asked to classify a statement as postulate or common notion, ask the one diagnostic question: does the statement name or use a geometric object (point, line, circle, angle)? If yes, it is in postulate territory; if it speaks only of quantities being equal, added, subtracted or compared, it is a common notion.',
    },
    {
      kind: 'para',
      text: 'Here are the five common notions, paraphrased in our words (study the content, never the exact wording — our paraphrase follows the sense of the standard translations):',
    },
    {
      kind: 'list',
      items: [
        'CN1 (equals-to-the-same): things equal to the same thing are equal to one another. If segment $AB$ and segment $CD$ are both equal to the same segment $EF$, then $AB = CD$. This is the transitive property of equality, stated for magnitudes.',
        'CN2 (add-equals-to-equals): if equals are added to equals, the wholes are equal. If $AB = CD$ and equal segments $EF$ are appended to both, then $AC = BD$. Adding the same amount to equal amounts preserves equality.',
        'CN3 (subtract-equals-from-equals): if equals are subtracted from equals, the remainders are equal. The mirror of CN2: take the same amount away from equal amounts and what is left is still equal. (Euclid adds a caveat — the remainders are equal "with respect to the corresponding part" — which guards the case of unequal remainders.)',
        'CN4 (coinciding-implies-equal): things that coincide with one another are equal to one another. If one figure can be placed exactly on top of another — point on point, line on line — the figures are equal. This is the licence behind superposition arguments and behind "apply one figure to another" proofs.',
        'CN5 (whole-greater-than-part): the whole is greater than the part. A magnitude is strictly larger than any of its proper pieces. This is the notion that makes "larger" meaningful and, two thousand years later, makes the idea of a magnitude "greater than any assigned amount" coherent.',
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why the split into two lists matters',
      text: 'The postulates are where geometry lives: they are about points, lines, circles and angles, and each is a permission slip for a construction or an assumption. The common notions are pure logic of quantity: no point, no line, no circle appears in them. That is why the same five common notions could serve a book on numbers unchanged, while the five postulates are welded to the plane. In an answer, the fastest classifier is: geometric object named → postulate; only quantities compared → common notion.',
    },
    {
      kind: 'para',
      text: 'The two lists do not work alone. Together with the twenty-three definitions they form the entire foundation of Book I, and the shape of the foundation is worth memorising as a census:',
    },
    {
      kind: 'table',
      caption: 'The Book I census — the whole foundation, counted',
      head: ['Layer', 'Count', 'What the layer contributes'],
      rows: [
        ['Definitions', '23', 'vocabulary: what the words will mean (point, line, right angle, circle…)'],
        ['Postulates', '5', 'geometry-specific permissions: what may be constructed and assumed'],
        ['Common notions', '5', 'general truths about equality: the logic of adding, subtracting, coinciding, whole-and-part'],
        ['Propositions', '48', 'everything else in Book I — each proved from the layers above, none assumed'],
      ],
    },
    {
      kind: 'para',
      text: 'So the ledger of Book I reads $23 + 5 + 5 = 33$ opening statements feeding $48$ proved propositions — and those forty-eight are just Book One of thirteen. Keep this census handy: it is the cleanest one-line answer to "how much did Euclid assume, and how much did he earn?" — and it is exactly the sort of count an examiner loves to ask for.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the five postulates one by one                              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The five postulates, one by one' },
    {
      kind: 'para',
      text: 'We take the five postulates in order, in our own paraphrase (we study what they say, never a word-for-word reproduction; the standard translation was consulted only to check the sense). For each one, watch two things: what it licenses, and what the geometry would look like without it. The whole gallery at a glance:',
    },
    {
      kind: 'figure',
      caption: 'The five-postulate gallery. P1 joins any two points; P2 extends any finite line; P3 draws any circle; P4 makes every right angle equal; P5 forces lines to meet when the interior angles fall short of two right angles (180°).',
      svg: geo12Svg(900, 220, 'The five postulates as five mini-panels: a joined line, an extended line, a circle with its centre and radius, two equal right angles, and two lines meeting across a transversal.', [
        // P1 panel
        geo12Rect(6, 8, 168, 204, c102.paper, c102.blue),
        geo12Txt(90, 32, 'P1 · the joiner', 12.5, c102.blueDeep, 'middle', '700'),
        geo12Line(44, 118, 124, 118, c102.blue, 2.5),
        geo12Dot(38, 118, c102.ink), geo12Dot(130, 118, c102.ink),
        geo12Txt(36, 140, 'A', 12, c102.ink), geo12Txt(132, 140, 'B', 12, c102.ink),
        geo12Txt(90, 198, 'join any point to any point', 10.5, c102.slate, 'middle', '500'),
        // P2 panel
        geo12Rect(186, 8, 168, 204, c102.paper, c102.teal),
        geo12Txt(270, 32, 'P2 · the extender', 12.5, c102.teal, 'middle', '700'),
        geo12Line(216, 118, 286, 118, c102.teal, 2.5),
        geo12Line(286, 118, 322, 118, c102.teal, 2, '5,5'),
        geo12Head(326, 118, 0, c102.teal, 9),
        geo12Dot(216, 118, c102.ink), geo12Dot(286, 118, c102.ink),
        geo12Txt(216, 140, 'A', 12, c102.ink), geo12Txt(286, 140, 'B', 12, c102.ink),
        geo12Txt(312, 104, 'C', 12, c102.teal),
        geo12Txt(270, 198, 'extend continuously', 10.5, c102.slate, 'middle', '500'),
        // P3 panel
        geo12Rect(366, 8, 168, 204, c102.paper, c102.purple),
        geo12Txt(450, 32, 'P3 · the circler', 12.5, c102.purple, 'middle', '700'),
        geo12Circ(450, 118, 36, c102.purple, 2.5),
        geo12Dot(450, 118, c102.purple, 3.5),
        geo12Line(450, 118, 477.6, 94.9, c102.purple, 2),
        geo12Dot(477.6, 94.9, c102.ink, 3.5),
        geo12Txt(440, 132, 'A', 12, c102.ink), geo12Txt(486, 90, 'B', 12, c102.ink),
        geo12Txt(450, 198, 'any centre, any radius', 10.5, c102.slate, 'middle', '500'),
        // P4 panel
        geo12Rect(546, 8, 168, 204, c102.paper, c102.green),
        geo12Txt(630, 32, 'P4 · the uniform ruler', 12.5, c102.green, 'middle', '700'),
        geo12Line(586, 92, 616, 92, c102.green, 2.5),
        geo12Line(586, 92, 586, 122, c102.green, 2.5),
        geo12Line(586, 104, 598, 104, c102.green, 1.5),
        geo12Line(598, 104, 598, 92, c102.green, 1.5),
        geo12Line(666, 152, 636, 152, c102.amber, 2.5),
        geo12Line(666, 152, 666, 122, c102.amber, 2.5),
        geo12Line(666, 140, 654, 140, c102.amber, 1.5),
        geo12Line(654, 140, 666, 140, c102.amber, 1.5),
        geo12Txt(604, 116, '90°', 10.5, c102.green), geo12Txt(646, 132, '90°', 10.5, c102.amber),
        geo12Txt(630, 198, 'all right angles are equal', 10.5, c102.slate, 'middle', '500'),
        // P5 panel
        geo12Rect(726, 8, 168, 204, c102.paper, c102.red),
        geo12Txt(810, 32, 'P5 · the parallel clause', 12.5, c102.red, 'middle', '700'),
        geo12Line(746, 150, 876, 95, c102.blue, 2.5),
        geo12Line(746, 60, 876, 95, c102.teal, 2.5),
        geo12Line(766, 180, 801, 30, c102.red, 2),
        geo12Dot(876, 95, c102.red, 4.5),
        geo12Txt(872, 84, 'X', 12, c102.red, 'middle', '700'),
        geo12Txt(786, 138, 'α', 12, c102.red), geo12Txt(806, 66, 'β', 12, c102.red),
        geo12Txt(810, 198, 'α + β < 180°: they meet', 10.5, c102.slate, 'middle', '500'),
      ].join('')),
    },
    { kind: 'heading', text: 'P1 — the joiner' },
    {
      kind: 'para',
      text: 'Postulate 1 (our paraphrase): a straight line can be drawn joining any point to any other point. It is the license that makes the straightedge legal. Notice how much is packed into the little word "any": no restriction on how far apart the points are, no restriction on what already exists between them. Given two points $A$ and $B$ — anywhere, however far — the segment $AB$ exists on demand. This is what "buys lines": before any proposition can be proved, the geometer must be allowed to produce the very lines the proof talks about. Without P1, even the phrase "draw $AB$" in a proof would be unlicensed smuggling.',
    },
    { kind: 'heading', text: 'P2 — the extender' },
    {
      kind: 'para',
      text: 'Postulate 2 (our paraphrase): any finite straight line can be extended continuously in a straight line. P1 gave us segments; P2 says no segment is a prisoner of its endpoints — it can be prolonged, a little or a lot, always in the same straight direction. The deep point is easy to miss: P2 makes a line an OPERATION, not an object of fixed length. A "line" in Euclid’s plane is not a finished thing you inspect; it is something you can always act on further — extend it again, and again, as the argument requires. The line is extendable, indefinitely. That is precisely the power P5 will need later: "the two lines, extended far enough" is a legal move only because P2 already granted it.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'The P2 subtlety: extending is not re-drawing',
      text: 'P2 licenses extending a line you already have, in its own direction. It does NOT license drawing a second line through the same two points, nor bending the extension, nor choosing how the extended piece "should" look. A straight line through $A$ and $B$ is determined; you may prolong it, but you may never replace it. Examiners test exactly this: "extend $AB$ beyond $B$ to $C$" is P2; "draw another line through $A$ and $B$" would need to be a different (and here unlicensed) act.',
    },
    { kind: 'heading', text: 'P3 — the circler' },
    {
      kind: 'para',
      text: 'Postulate 3 (our paraphrase): a circle can be drawn with any centre and any radius. This is the compass license, and the two "any"s are the whole story: the centre may be any point whatever, and the radius may be any length whatever — in particular, the radius may be set to the distance between two existing points, which is how the compass "carries" a length from one place to another. Together, P1, P2 and P3 form the famous ruler-and-compass charter: the straightedge draws the unique line through two points and extends it; the compass draws the circle with a given centre through a given point (and hence, by CN4-style reasoning, marks off equal radii anywhere). Every classical construction — bisecting an angle, copying a segment, building an equilateral triangle, dropping a perpendicular — is nothing but a legal combination of these three permissions, executed step by step.',
    },
    {
      kind: 'list',
      items: [
        'Straightedge (licenced by P1 + P2): draws the unique straight line joining two given points, and prolongs any given segment. It cannot measure, cannot mark off lengths, has no graduations — it only makes straight lines exist.',
        'Compass (licenced by P3): draws the circle with any given centre and any given radius — in particular, through any given point. It can therefore carry a distance: set to $AB$ at centre $A$, it collects every point at distance $AB$ from $A$.',
        'Together: the charter. Constructions are finite chains of straightedge and compass moves, each move citing its postulate. If a step cannot be traced to P1, P2 or P3 (plus P4’s calibration where equality of angles is needed), the "construction" is not legal in Euclid’s game.',
      ],
    },
    { kind: 'heading', text: 'P4 — the uniform ruler' },
    {
      kind: 'para',
      text: 'Postulate 4 (our paraphrase): all right angles are equal to one another. Of the five postulates this is the quietest, and its greatness is easiest to overlook. P4 is a calibration: it says the right angle is an absolute measure of turning, the same at every place in the plane and in every figure. Pick up a right angle from one corner of a diagram and compare it with a right angle drawn miles away (on the same plane): they are equal — not by coincidence, but by postulate. This is what makes the phrase "two right angles" in P5 meaningful (every right angle is THE right angle, so two of them is a fixed amount of turning, $180°$), and what makes congruent-triangle arguments portable from place to place. P4 is the guarantee that the grid of the plane is uniform: geometry here is geometry there.',
    },
    { kind: 'heading', text: 'P5 — the parallel clause' },
    {
      kind: 'para',
      text: 'Postulate 5 (our paraphrase): if a straight line crossing two straight lines makes the interior angles on one side together less than two right angles, then the two straight lines, extended far enough, meet on that side. Everything about this statement announces that it is the odd one out. It is by far the longest. It is constructive-negative: it does not hand you a figure here and now, it forces a meeting somewhere far away. And it is about the unobservable: no drawing can show two lines meeting "far enough" — the claim is about the indefinite extension that only P2 made legal. Where P1–P4 license what you can do on the page in front of you, P5 legislates what happens out toward infinity. That is why, of the five, only this one was doubted — and why its two-thousand-year trial is a story worth a whole section below.',
    },
    {
      kind: 'para',
      text: 'The engine room of P5 is arithmetic about two right angles. One right angle is $90°$, so two right angles are $90° + 90° = 180°$ — that is the boundary. Suppose a transversal $r$ crosses lines $m$ and $n$, and the interior angles on one side of $r$ are $\\alpha$ and $\\beta$. If $\\alpha + \\beta = 180°$ exactly, the clause is silent: we are on the boundary, and (as chapter 2 will show) this is exactly the parallel case. If $\\alpha + \\beta < 180°$, the lines are legally committed to meet on that side. And the gap — the SHORTFALL $180° - (\\alpha + \\beta)$ — measures how hard they turn toward each other. Two pinned examples, which we will verify in the worked problems: $100° + 70° = 170°$, a shortfall of $180° - 170° = 10°$; and $50° + 60° = 110°$, a shortfall of $180° - 110° = 70°$. Both pairs meet on that side; the second pair converges far more sharply.',
    },
    {
      kind: 'figure',
      caption: 'The fifth-postulate configuration, drawn true to scale with α = 100° and β = 70°. The interior angles on the right of transversal r sum to 170° < 180°, so lines m and n, extended far enough, meet at X on that side — and the angle the lines make at X is exactly the shortfall, 10°.',
      svg: geo12Svg(880, 260, 'Transversal r crosses line m at A and line n at B. The interior angles on the right side are alpha 100 degrees at A and beta 70 degrees at B; the lines meet at X on the right, where they make a 10 degree angle equal to the shortfall.', [
        geo12Txt(440, 26, 'α + β = 170° < 180°:  shortfall = 180° − 170° = 10°', 14.5, c102.ink, 'middle', '700'),
        geo12Txt(440, 46, 'the angle the two lines make at their meeting point X is exactly the shortfall', 12, c102.slate, 'middle', '500'),
        geo12Line(30, 205, 850, 205, c102.blue, 2.5),
        geo12Txt(842, 194, 'm', 14, c102.blue, 'middle', '700'),
        geo12Line(36.2, 95.6, 775.2, 225.8, c102.teal, 2.5),
        geo12Txt(40, 88, 'n', 14, c102.teal, 'middle', '700'),
        geo12Line(176.9, 244.4, 149.2, 86.9, c102.red, 2.5),
        geo12Txt(153, 80, 'r', 14, c102.red, 'middle', '700'),
        geo12Dot(170, 205, c102.blue), geo12Txt(162, 226, 'A', 13, c102.ink, 'middle', '700'),
        geo12Dot(154.4, 116.4, c102.teal), geo12Txt(140, 112, 'B', 13, c102.ink, 'middle', '700'),
        geo12Dot(657, 205, c102.red, 5), geo12Txt(666, 192, 'X', 13.5, c102.red, 'middle', '700'),
        geo12Txt(602, 178, 'the meeting point', 11.5, c102.red, 'end', '600'),
        // angle marks
        `<path d="M 198 205 A 28 28 0 0 0 165.1 177.4" fill="none" stroke="${c102.amber}" stroke-width="2"/>`,
        geo12Txt(212, 188, 'α = 100°', 13, c102.amber, 'start', '700'),
        `<path d="M 184 121.6 A 30 30 0 0 1 159.6 145.9" fill="none" stroke="${c102.amber}" stroke-width="2"/>`,
        geo12Txt(196, 150, 'β = 70°', 13, c102.amber, 'start', '700'),
        `<path d="M 633 205 A 24 24 0 0 1 633.4 200.8" fill="none" stroke="${c102.red}" stroke-width="2"/>`,
        geo12Txt(618, 192, '10°', 12, c102.red, 'end', '700'),
      ].join('')),
    },
    {
      kind: 'derivation',
      title: 'The shortfall arithmetic, clause by clause',
      statement: 'A transversal crosses two lines; the interior angles on one side are $\u03b1$ and $\u03b2$. Compare $\u03b1 + \u03b2$ with two right angles and read off what P5 promises.',
      steps: [
        { label: 'Boundary', formula: '90° + 90° = 180°', explanation: 'Two right angles are the fixed amount of turning $180°$. This is the boundary case: $\u03b1 + \u03b2 = 180°$ leaves P5 silent — no meeting is forced, and chapter 2 will identify this side with the parallel case.' },
        { label: 'Take', formula: '\u03b1 = 100°, \u03b2 = 70°', explanation: 'First shortfall example. The sum is $100° + 70° = 170°$, which is less than $180°$.' },
        { label: 'So,', formula: '180° − 170° = 10°', explanation: 'The shortfall is ten degrees. P5 now speaks: both lines, extended far enough, meet on that side — and in the triangle cut off by the three lines, the angle at the meeting point is exactly the shortfall, $10°$.' },
        { label: 'Take', formula: '\u03b1 = 50°, \u03b2 = 60°', explanation: 'Second shortfall example. The sum is $50° + 60° = 110°$, far below the boundary.' },
        { label: 'So,', formula: '180° − 110° = 70°', explanation: 'The shortfall is seventy degrees — a much sharper convergence: the two lines turn toward each other strongly and meet sooner, making a $70°$ angle where they cross.' },
        { label: 'Check', formula: '(360° − (\u03b1 + \u03b2))', explanation: 'The interior angles on the OTHER side sum to $360° - (\u03b1 + \u03b2)$ (the four interior angles fit around the two crossing points). For $100° + 70°$: the other side has $360° - 170° = 190° > 180°$, so P5 promises nothing there — the meeting, if any, is only on the shortfall side.' },
      ],
      result: 'Shortfall $= 180° - (\u03b1 + \u03b2)$: positive shortfall means the lines meet on that side, and the meeting angle equals the shortfall; zero shortfall is the boundary; negative shortfall (sum above $180°$) puts the promise on the other side.',
    },

    /* -------------------------------------------------------------- */
    /* 4. what the rules buy together                                 */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'What the rules buy together' },
    {
      kind: 'para',
      text: 'Now watch the machine run. From the twenty-three definitions, the five postulates and the five common notions, Euclid proves forty-eight propositions in Book I — and Proposition 1 is a deliberately chosen showpiece: on a given finite straight line, construct an EQUILATERAL TRIANGLE. The proof is pure charter: draw $AB$ (P1); draw the circle centred at $A$ through $B$ and the circle centred at $B$ through $A$ (P3, twice); let them meet at $C$; join $AC$ and $BC$ (P1 again). Then $AC = AB$ (radii of one circle) and $BC = AB$ (radii of the other), so $AC = BC$ by CN1 — things equal to the same thing are equal to one another. Every single move cites its licence: P1, P3, P3, P1, CN1, CN1. That is the shape of the whole game: five permissions plus five counting rules, used over and over, building all forty-eight propositions — and in thirteen books, the entire Elements.',
    },
    {
      kind: 'figure',
      caption: 'The Book-I pyramid: 23 definitions, 5 postulates and 5 common notions form the base; the 48 proved propositions of Book I rest on them; and the 13 books of the Elements stand on Book I’s foundation.',
      svg: geo12Svg(700, 270, 'Pyramid diagram: at the base three boxes labelled 23 definitions, 5 postulates and 5 common notions; above them a box labelled Book I 48 propositions proved; at the top a box labelled the Elements 13 books.', [
        geo12Rect(240, 30, 220, 48, c102.purpleSoft, c102.purple),
        geo12Txt(350, 60, 'the Elements — 13 books', 14.5, c102.purple, 'middle', '700'),
        geo12Line(350, 78, 350, 118, c102.slate, 2),
        geo12Rect(150, 118, 400, 48, c102.blueSoft, c102.blue),
        geo12Txt(350, 148, 'Book I: 48 propositions proved', 14.5, c102.blueDeep, 'middle', '700'),
        geo12Txt(372, 104, 'each proved from the base', 11.5, c102.slate, 'start', '500'),
        geo12Line(350, 166, 132, 206, c102.slate, 2),
        geo12Line(350, 166, 350, 206, c102.slate, 2),
        geo12Line(350, 166, 568, 206, c102.slate, 2),
        geo12Rect(30, 206, 205, 48, c102.slateSoft, c102.slate),
        geo12Txt(132, 236, '23 definitions', 14, c102.ink, 'middle', '700'),
        geo12Rect(247, 206, 205, 48, c102.amberSoft, c102.amber),
        geo12Txt(350, 236, '5 postulates', 14, c102.amber, 'middle', '700'),
        geo12Rect(465, 206, 205, 48, c102.greenSoft, c102.green),
        geo12Txt(568, 236, '5 common notions', 14, c102.green, 'middle', '700'),
        geo12Txt(132, 266, 'words', 11.5, c102.slate, 'middle', '600'),
        geo12Txt(350, 266, 'permissions', 11.5, c102.amber, 'middle', '600'),
        geo12Txt(568, 266, 'general truths', 11.5, c102.green, 'middle', '600'),
      ].join('')),
    },
    {
      kind: 'para',
      text: 'Read the pyramid bottom-up and you have the entire method in one picture. The definitions fix the vocabulary. The postulates and common notions grant the starting moves. Everything above is earned: each proposition is proved from the base plus already-proven propositions, and nothing else. Euclid’s five postulates are therefore not a curiosity to memorise for their own sake — they are the constitution of a two-thousand-year-old kingdom of theorems, and every ruler-and-compass construction you will ever perform is a citizen of it. The next time you bisect an angle, you are running legislation older than most empires.',
    },

    /* -------------------------------------------------------------- */
    /* 5. the fifth postulate's two-thousand-year trial               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The fifth postulate’s two-thousand-year trial' },
    {
      kind: 'para',
      text: 'From the moment the Elements circulated, readers felt that P5 did not belong among the postulates. P1–P4 are short, immediate, and about figures you can draw in front of you; P5 is long, elaborate, and about a meeting that may lie beyond any drawing. The natural suspicion: P5 is not a rule at all but a THEOREM in disguise — something the other four postulates ought to be able to prove. If it could be proved from P1–P4, the permission list would shrink to four, and the geometry would be that much tighter. This hope launched what is fairly called the longest-running project in the history of mathematics: roughly twenty-three centuries of attempts to derive P5 from its four siblings.',
    },
    {
      kind: 'para',
      text: 'The doubters were not a handful of cranks. The Greek commentator Proclus, writing in the fifth century AD, records in his commentary on Book I that P5 "ought to be struck from the postulates altogether" — and Proclus is summarising a controversy already ancient in his day; the battle was old when Rome was young. Ancient and medieval geometers tried again and again: each attempt took some statement felt to be "obvious" (for instance, that parallel lines stay a constant distance apart, or that there exists a rectangle) and tried to prove P5 from it. The trap, invisible at first, is that every such "obvious" helper statement turned out to be LOGICALLY EQUIVALENT to P5 — assuming it was assuming the fifth postulate with a new face on it. Nothing was proved; P5 was merely re-dressed.',
    },
    {
      kind: 'para',
      text: 'The most honest attempt ever made is also the most instructive. In 1733 the Jesuit Girolamo Saccheri published Euclides ab omni naevo vindicatus ("Euclid freed of every flaw") with a genuinely modern strategy: a reductio. Assume the NEGATION of P5 (keeping P1–P4), derive contradiction after contradiction, and P5 will be vindicated by force. Saccheri worked through case after case — the acute-angle hypothesis, the obtuse-angle hypothesis — and pushed both to wild, strange consequences. But here is the twist that makes the book immortal: the "contradictions" he reached were merely STRANGE, not false. Deep in the file, the reductio had actually begun building a new geometry — one where P5 fails and nothing explodes. Saccheri could not see that he was holding the door to a different world; he had opened it and called it a refutation.',
    },
    {
      kind: 'para',
      text: 'The resolution required letting the strangeness stand. In 1829 Nikolai Ivanovich Lobachevsky, in Kazan, published in the Kazan Messenger the first publicly printed non-Euclidean geometry — a consistent system in which P5 fails (through a point there are TWO or more parallels to a given line) and in which theorems were proved honestly from P1–P4 plus the new, negated fifth. In 1832 János Bólyai published his version as the famous Appendix to his father’s book — the younger Bólyai wrote of creating "a strange new world from nothing." Two independent publications, one conclusion: a geometry without Euclid’s fifth is coherent. And that settles the ancient question in the only way it could be settled: P5 is INDEPENDENT of P1–P4. It cannot be proved from them, because there is a whole consistent universe where it is false while they hold. The two-thousand-year search for a proof had been a search for something that was never there.',
    },
    {
      kind: 'para',
      text: 'Two more dates complete the verified chronology. In 1795 — well before the non-Euclidean resolution — John Playfair published the reformulation that modern textbooks (including this one, from chapter 2 onward) actually quote: through a given point, not on a given line, AT MOST ONE parallel line can be drawn. Playfair’s form is beloved because it is short, symmetric, and easy to test, but it is a genuine equivalent of Euclid’s clause: assuming Playfair’s form you can prove Euclid’s, and vice versa — the equivalence itself is one of the celebrated equivalents catalogued for chapter 11. And in 1899 David Hilbert, in his Grundlagen der Geometrie, rebuilt the whole rulebook cleanly: modern axioms, modern logic, gaps closed. Hilbert’s system is the one in which "independence" becomes a theorem-provable fact rather than an acquired taste.',
    },
    {
      kind: 'table',
      caption: 'The verified chronology of the fifth postulate',
      head: ['Year', 'Figure', 'What happened — nothing folklore'],
      rows: [
        ['c. 300 BC', 'Euclid', 'the five postulates are fixed in Book I of the Elements'],
        ['5th century AD', 'Proclus', 'his commentary on Book I already records the doubters and the demand to strike P5 from the postulates'],
        ['1733', 'Saccheri', 'the honest reductio: assume P5 fails, hunt contradictions — and nearly build a non-Euclidean geometry without noticing'],
        ['1795', 'Playfair', 'the through-a-point-at-most-one-parallel form modern texts quote — an equivalent of Euclid’s clause'],
        ['1829', 'Lobachevsky', 'Kazan Messenger: the first published non-Euclidean geometry — P5 fails, the system stands'],
        ['1832', 'Bólyai', 'the Appendix: an independent non-Euclidean geometry, "a strange new world from nothing"'],
        ['1899', 'Hilbert', 'Grundlagen der Geometrie: the rules rebuilt cleanly; independence becomes precise mathematics'],
      ],
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'What "independent" buys — and costs',
      text: 'Independent means: P5 can be neither proved nor disproved from P1–P4 — there are consistent geometries (Lobachevsky 1829, Bólyai 1832) in which P1–P4 hold and P5 fails. The ancient ambition died, and the prize was greater than the ambition: geometry became a family of possible worlds, with Euclid’s plane one member among them. Chapter 2 adopts Playfair’s 1795 form for the parallel theory; chapter 11 owns the full catalogue of equivalents and opens the non-Euclidean door properly.',
    },
    {
      kind: 'para',
      text: 'Why does the trial matter to a student, beyond the story? Because it teaches the shape of a permission list. Euclid’s five are not "five obvious facts" — they are a CHOICE, the smallest set that works, and one member of the set is a genuine choice point: change only P5 and you get another consistent world. No other postulate enjoys that status. That is the deepest reason the fifth is examined separately, quoted in Playfair’s form, and asked about in the exam-style shapes below.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam callout — the two classic assessment shapes',
      text: 'This lesson is examined in exactly two shapes, and both are easy marks with the right reflexes. Shape 1 — CLASSIFY: given a statement, answer postulate / common notion / definition with a one-line reason (geometric object named and a construction licensed → postulate; only quantities compared → common notion; a word is being given meaning → definition; something being proved → none of these, it is a proposition). Shape 2 — NAME THE LICENCE: given a construction step ("join A to B", "extend AB beyond B to C", "draw the circle centred at A through B"), name the postulate that licenses it — P1, P2, P3 respectively; a step producing a right angle anywhere draws in P4 as the calibration guarantee. Drill both shapes in the Illustrations and the exercise set below.',
    },

    /* -------------------------------------------------------------- */
    /* 7. Illustrations (Cengage chains)                              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Illustrations' },
    {
      kind: 'example',
      title: 'Illustration 1 — classify five statements: postulate, common notion, or definition',
      steps: [
        'Classify each of the following as postulate, common notion, or definition, with a one-line reason.',
        '(a) "A circle is a plane figure bounded by one line, such that every point of the boundary is equally distant from a certain point inside." — This gives MEANING to the word "circle"; nothing is constructed, nothing compared. Classification: definition (it is vocabulary).',
        '(b) "A straight line may be drawn from any one point to any other point." — A geometric object (a straight line) is licensed into existence, and the licence names points. Classification: postulate — this is P1, the joiner.',
        '(c) "Things which are equal to the same thing are also equal to one another." — No point, line, circle or angle appears; only quantities and equality. Classification: common notion — CN1, equals-to-the-same.',
        '(d) "All right angles are equal to one another." — It names angles (geometric objects) and ASSUMES a universal fact rather than licensing a construction or defining a word. Classification: postulate — P4, the uniform ruler.',
        '(e) "The whole is greater than the part." — Pure comparison of magnitudes, no geometric object named. Classification: common notion — CN5, whole-greater-than-part.',
        'Check (Now, the reflex): geometric object named → postulate; only quantities compared → common notion; a word being given meaning → definition. All five classifications follow in one move each.',
      ],
      figures: [
        {
          caption: 'The classification flowchart: three tests, three answers — the reflex for any "classify this statement" exam item.',
          svg: geo12Svg(660, 210, 'Flowchart: from read the statement, three arrows lead to three boxes: names what a word means gives definition; states a permission to construct gives postulate; general truth about equal quantities gives common notion.', [
            geo12Rect(240, 14, 180, 34, c102.slateSoft, c102.slate),
            geo12Txt(330, 36, 'read the statement', 13, c102.ink, 'middle', '700'),
            geo12Arrow(292, 48, 130, 108, c102.slate),
            geo12Arrow(330, 48, 330, 108, c102.slate),
            geo12Arrow(368, 48, 530, 108, c102.slate),
            geo12Txt(180, 80, 'it defines a term', 11.5, c102.slate, 'middle', '600'),
            geo12Txt(330, 78, 'it licences a construction', 11.5, c102.slate, 'middle', '600'),
            geo12Txt(486, 80, 'it compares quantities', 11.5, c102.slate, 'middle', '600'),
            geo12Rect(20, 110, 196, 44, c102.purpleSoft, c102.purple),
            geo12Txt(118, 130, 'names what a word means', 11.5, c102.ink, 'middle', '600'),
            geo12Txt(118, 146, 'definition', 12.5, c102.purple, 'middle', '700'),
            geo12Rect(232, 110, 196, 44, c102.amberSoft, c102.amber),
            geo12Txt(330, 130, 'states a permission', 11.5, c102.ink, 'middle', '600'),
            geo12Txt(330, 146, 'postulate', 12.5, c102.amber, 'middle', '700'),
            geo12Rect(444, 110, 196, 44, c102.greenSoft, c102.green),
            geo12Txt(542, 130, 'equal quantities compared', 11.5, c102.ink, 'middle', '600'),
            geo12Txt(542, 146, 'common notion', 12.5, c102.green, 'middle', '700'),
            geo12Txt(330, 190, 'Book I opens with all three: 23 definitions, 5 postulates, 5 common notions', 11.5, c102.slate, 'middle', '500'),
          ].join('')),
        },
      ],
    },
    {
      kind: 'example',
      title: 'Illustration 2 — exam-shaped: name the postulate licensing each construction',
      steps: [
        'Question (exam-style): A construction uses the following four steps. For each step, name the postulate that licenses it, or explain how it is built from the charter.',
        'Step 1: "Join $A$ to $B$." — A straight line is drawn through two given points. Licence: P1, the joiner. One move, one citation.',
        'Step 2: "Extend $AB$ beyond $B$ to a point $C$." — An existing finite segment is prolonged in its own direction. Licence: P2, the extender. Note the subtlety: the step does not re-draw $AB$; it only prolongs it.',
        'Step 3: "Draw the circle centred at $A$ through $B$." — A circle with given centre and given radius. Licence: P3, the circler — centre $A$, radius $AB$.',
        'Step 4: "Drop the perpendicular from $C$ to $AB$." — No single postulate draws a perpendicular; this is Book I.12, a proved construction built from P1 + P2 + P3 (arcs on both sides of the line, joined to give the foot of the perpendicular). P4 enters as the guarantee that the right angle so produced is THE right angle — equal to every other right angle in the plane.',
        'Hence (the mark-scoring line): P1; P2; P3; and Book I.12 built from P1 + P2 + P3, certified by P4. Every construction step in any ruler-and-compass problem answers to this mapping.',
      ],
      figures: [
        {
          caption: 'The construction-licence arrows: four standard construction steps mapped to the postulates that make them legal.',
          svg: geo12Svg(660, 240, 'Four rows: join A to B maps to P1 the joiner; extend AB beyond B to C maps to P2 the extender; draw the circle centred at A through B maps to P3 the circler; drop the perpendicular maps to built from P1 plus P2 plus P3, certified by P4.', [
            geo12Rect(20, 14, 300, 38, c102.blueSoft, c102.blue),
            geo12Txt(170, 38, 'join A to B', 13, c102.ink, 'middle', '600'),
            geo12Arrow(320, 33, 456, 33, c102.slate),
            geo12Rect(456, 14, 186, 38, c102.paper, c102.blue),
            geo12Txt(549, 38, 'P1 · the joiner', 13, c102.blueDeep, 'middle', '700'),
            geo12Rect(20, 72, 300, 38, c102.tealSoft, c102.teal),
            geo12Txt(170, 96, 'extend AB beyond B to C', 13, c102.ink, 'middle', '600'),
            geo12Arrow(320, 91, 456, 91, c102.slate),
            geo12Rect(456, 72, 186, 38, c102.paper, c102.teal),
            geo12Txt(549, 96, 'P2 · the extender', 13, c102.teal, 'middle', '700'),
            geo12Rect(20, 130, 300, 38, c102.purpleSoft, c102.purple),
            geo12Txt(170, 154, 'draw the circle centred at A through B', 12.5, c102.ink, 'middle', '600'),
            geo12Arrow(320, 149, 456, 149, c102.slate),
            geo12Rect(456, 130, 186, 38, c102.paper, c102.purple),
            geo12Txt(549, 154, 'P3 · the circler', 13, c102.purple, 'middle', '700'),
            geo12Rect(20, 188, 300, 38, c102.redSoft, c102.red),
            geo12Txt(170, 212, 'drop the perpendicular from C to AB', 12.5, c102.ink, 'middle', '600'),
            geo12Arrow(320, 207, 456, 207, c102.slate),
            geo12Rect(456, 188, 186, 38, c102.paper, c102.red),
            geo12Txt(549, 203, 'built from P1 + P2 + P3', 11, c102.red, 'middle', '700'),
            geo12Txt(549, 218, '(Book I.12), certified by P4', 11, c102.red, 'middle', '700'),
            geo12Txt(330, 238, 'the licence mapping — four shapes worth memorising', 11.5, c102.slate, 'middle', '500'),
          ].join('')),
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 8. terms + formula cards                                       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The working vocabulary of the rulebook' },
    {
      kind: 'terms',
      items: [
        { term: 'postulate', def: 'a geometry-specific statement assumed without proof: it licenses a construction (P1, P2, P3) or asserts a geometric fact (P4, P5). Euclid’s Book I has exactly five.' },
        { term: 'common notion', def: 'a general truth about equality and magnitude assumed without proof, mentioning no geometric object: equals-to-the-same, add-equals, subtract-equals, coinciding-implies-equal, whole-greater-than-part.' },
        { term: 'straightedge', def: 'the unmarked tool licensed by P1 and P2: it draws the line joining two points and extends a finite line. It cannot measure or transfer lengths.' },
        { term: 'compass', def: 'the tool licensed by P3: it draws the circle with any centre and any radius, and so carries a distance from one place to another.' },
        { term: 'ruler-and-compass charter', def: 'the joint licence of P1 + P2 + P3: every classical construction is a finite chain of straightedge and compass moves, each citing its postulate.' },
        { term: 'extendable line', def: 'the view of a line produced by P2: a line is an operation that can always be continued, not an object of fixed length — "extend far enough" is legal because P2 said so.' },
        { term: 'two right angles', def: 'the fixed amount of turning 90° + 90° = 180°, meaningful as an absolute measure because P4 makes every right angle equal to every other.' },
        { term: 'shortfall', def: 'the quantity 180° − (α + β): how far the interior angles on one side of a transversal fall below two right angles. Positive shortfall forces a meeting on that side, and the meeting angle equals the shortfall.' },
        { term: 'parallel postulate', def: 'P5, the odd one out: the long, constructive-negative clause forcing two lines to meet on the side where the interior angles sum to less than 180°. Modern texts quote Playfair’s equivalent form.' },
        { term: 'independent', def: 'said of P5: it can be neither proved nor disproved from P1–P4, because consistent geometries exist (Lobachevsky 1829, Bólyai 1832) in which P1–P4 hold and P5 fails.' },
        { term: 'Playfair’s form', def: 'the 1795 equivalent: through a given point not on a given line, at most one parallel can be drawn. The form chapter 2 adopts; equivalent to Euclid’s clause.' },
        { term: 'reductio (Saccheri’s)', def: 'the 1733 strategy of assuming the negation of P5 and hunting contradictions — which produced strange-but-consistent results and effectively began non-Euclidean geometry.' },
      ],
    },
    { kind: 'heading', text: 'Formula cards — the four facts to recall cold' },
    {
      kind: 'formula',
      name: 'Two-right-angles boundary (P5’s trigger)',
      latex: '90\u00b0 + 90\u00b0 = 180\u00b0',
      note: 'Two right angles are the fixed turning 180°. The clause fires exactly when α + β < 180°; at α + β = 180° it is silent (the parallel case of chapter 2).',
    },
    {
      kind: 'formula',
      name: 'Shortfall identity',
      latex: '180\u00b0 - (\u03b1 + \u03b2)',
      note: 'The shortfall measures how far the interior angles fall below 180°. Positive shortfall ⟺ the lines meet on that side, and the angle at the meeting point X equals the shortfall.',
    },
    {
      kind: 'formula',
      name: 'Other-side complement',
      latex: '360\u00b0 - (\u03b1 + \u03b2)',
      note: 'The interior angles on the other side of the transversal sum to 360° − (α + β). Example: α = 95°, β = 80° gives 175° and 185° — the promise sits only on the shortfall side.',
    },
    {
      kind: 'formula',
      name: 'The Book I census',
      latex: '23 + 5 + 5 = 33',
      note: 'Twenty-three definitions, five postulates and five common notions are the 33 opening statements from which the 48 propositions of Book I — and the 13-book Elements — are earned.',
    },

    /* -------------------------------------------------------------- */
    /* 9. quiz                                                        */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Checkpoint quiz — 5 questions',
      items: [
        {
          q: 'A textbook statement reads: "things which are equal to the same thing are also equal to one another." To which of Euclid’s lists does it belong?',
          options: [
            'a definition — it gives meaning to the word "equal"',
            'a postulate — it licenses drawing a line',
            'a common notion — it is CN1, a general truth about equality',
            'a proposition — it is proved in Book I',
          ],
          answer: 2,
          explain: 'It belongs to the common notions (CN1, equals-to-the-same). Why the others fail: it is NOT a definition, because it does not give meaning to any word — equality is already understood, the statement is a fact ABOUT equal things. It is not a postulate, because no geometric object is named and no construction is licensed — no point, line, circle or angle appears. It is not a proposition, because Euclid assumes it without proof; nothing is earned here. The classifier: only quantities compared → common notion.',
        },
        {
          q: 'A proof contains the step "extend segment AB beyond B, continuously in the same straight direction, to a point c102." Which postulate licenses this step?',
          options: [
            'P1, the joiner',
            'P2, the extender',
            'P3, the circler',
            'P4, the uniform ruler',
          ],
          answer: 1,
          explain: 'P2, the extender: any finite straight line can be extended continuously in a straight line. Why the others fail: P1 licenses DRAWING the line AB from scratch, not prolonging one we already have; P3 licenses drawing circles, and no circle is involved; P4 says all right angles are equal, which calibrates measures but licenses no construction. Remember the P2 subtlety: extending is not re-drawing — the step keeps the line it was given.',
        },
        {
          q: 'A transversal crosses two lines. On one side, the interior angles are 80° and 60°. What does Euclid’s fifth postulate promise?',
          options: [
            'nothing — the clause is silent because the sum is exactly 180°',
            'the lines are parallel on that side',
            'the lines meet on the opposite side only',
            'the lines, extended far enough, meet on that side — the shortfall is 180° − 140° = 40°',
          ],
          answer: 3,
          explain: 'The sum is 80° + 60° = 140° < 180°, so P5 fires: the two lines, extended far enough, meet on that side, and the shortfall is 180° − 140° = 40° (which is also the angle they make at the meeting point). Why the others fail: the clause is silent only at exactly 90° + 90° = 180° — here we are 40° below the boundary, not on it. "Parallel on that side" is the boundary reading, not this one. The opposite side carries interior angles summing to 360° − 140° = 220° > 180°, so the promise sits on the shortfall side, not the opposite.',
        },
        {
          q: 'Which postulate guarantees that a right angle drawn in one corner of a diagram equals a right angle drawn anywhere else in the plane?',
          options: [
            'P4 — all right angles are equal to one another',
            'P1 — the joiner',
            'P2 — the extender',
            'P5 — the parallel clause',
          ],
          answer: 0,
          explain: 'P4 is the uniform ruler: all right angles are equal to one another, making the right angle an absolute measure everywhere in the plane. Why the others fail: P1 only licenses joining two points by a line; P2 only licenses extending lines; P5 is about lines meeting across a transversal. This calibration is also what makes "two right angles" in P5 a fixed amount (90° + 90° = 180°): without P4, "right angle" would vary from place to place and P5 would have no fixed trigger.',
        },
        {
          q: 'In the two-thousand-year trial of the fifth postulate, what was finally established by Lobachevsky (1829) and Bólyai (1832)?',
          options: [
            'that P5 can be proved from P1–P4 with clever enough constructions',
            'that P5 is independent of P1–P4: consistent geometries exist in which P5 fails',
            'that Saccheri’s 1733 reductio contained a logical error',
            'that Playfair’s 1795 form is not equivalent to Euclid’s clause',
          ],
          answer: 1,
          explain: 'They published consistent geometries (Lobachevsky in the Kazan Messenger, 1829; Bólyai in the Appendix, 1832) in which P1–P4 hold and P5 fails — so no proof of P5 from P1–P4 can exist, and the fifth is independent. Why the others fail: the whole point of 1829/1832 is that a proof of P5 was never found BECAUSE none exists — the opposite of option A. Saccheri’s 1733 reductio was logically honest; its "contradictions" were merely strange, which is precisely how it nearly built a non-Euclidean geometry — not an error, an incomplete reading. Playfair’s form IS equivalent to Euclid’s clause; chapter 2 adopts it.',
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 10. exercises                                                  */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — 15 questions, L1 to L6',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Classify this statement: "It is possible to draw one and only one circle with any centre and any radius." Is it a definition, a postulate, or a common notion?',
              solution: [
                'Ask the classifier question: does the statement name a geometric object and license a construction?',
                'Now, it names two geometric objects — a circle and its centre — and it licenses a construction: draw a circle with any centre and any radius.',
                'So, it is not vocabulary (no word is being given meaning) and it is not a comparison of quantities (no equals, wholes or parts).',
                'Hence, classification: a postulate — this is P3, the circler, the compass licence of the ruler-and-compass charter.',
              ],
              answer: 'a postulate — P3, the circler (the compass licence)',
            },
            {
              q: 'Segments $PQ$ and $RS$ are each equal to the same segment $MN$. What does Euclid let you conclude about $PQ$ and $RS$, and by which common notion?',
              solution: [
                'Both $PQ$ and $RS$ are equal to the same thing, namely $MN$.',
                'Take CN1, equals-to-the-same: things equal to the same thing are equal to one another.',
                'So, $PQ = RS$ follows in one step — no construction, no measurement, pure logic of quantity.',
                'Hence: $PQ = RS$, by CN1 (the transitive property of equality for magnitudes).',
              ],
              answer: 'PQ = RS, by CN1',
            },
            {
              q: 'A transversal crosses two lines. On one side of it, the interior angles are $100°$ and $70°$. Does Euclid’s fifth postulate force a meeting, and what is the shortfall?',
              solution: [
                'Split the check: the sum on that side is $100° + 70° = 170°$.',
                'Compare with the boundary of two right angles: $90° + 90° = 180°$, and $170° < 180°$.',
                'So, the clause of P5 fires: the two lines, extended far enough, meet on that side.',
                'Take the shortfall: $180° - 170° = 10°$.',
                'Hence: yes — they meet on that side, and the shortfall is $10°$ (which is also the angle the lines make at the meeting point).',
              ],
              answer: 'yes, meet on that side; shortfall = 10°',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Which postulate licenses the step "extend $AB$ beyond $B$ to a point $C$" — and why does the same postulate NOT license "draw a second straight line through $A$ and $B$"?',
              solution: [
                'Name the operation: an existing finite segment is being prolonged in its own direction.',
                'Take P2, the extender: any finite straight line can be extended continuously in a straight line. Licence: P2.',
                'Check the second operation: "a second straight line through $A$ and $B$" is not an extension — it replaces the existing line by another one.',
                'So, P2 extends what exists; it does not re-draw. The straight line through $A$ and $B$ is determined, and no postulate offers a second one.',
                'Hence: P2 licenses the extension; the second line is unlicensed — extending is not re-drawing.',
              ],
              answer: 'P2 licenses the extension; a second line through A and B is unlicensed',
            },
            {
              q: 'Segments $AB$ and $CD$ are equal, each of length $7$ units. Equal segments $EF$ of length $3$ units are appended to both: to $AB$ giving $AC$, and to $CD$ giving $BD$. Compute $AC$ and $BD$ and cite the common notion that guarantees $AC = BD$.',
              solution: [
                'Take the data: $AB = CD = 7$, and equal additions $EF = 3$ are made to both.',
                'Split the arithmetic: $AC = AB + EF = 7 + 3 = 10$, and $BD = CD + EF = 7 + 3 = 10$.',
                'So, $AC = 10$ and $BD = 10$ — the two wholes came out equal.',
                'Now, name the law: CN2, add-equals-to-equals — if equals are added to equals, the wholes are equal. The arithmetic instantiates it exactly.',
                'Hence: $AC = BD = 10$, guaranteed by CN2.',
              ],
              answer: 'AC = BD = 10, by CN2',
            },
            {
              q: 'Book I rests on $23 + 5 + 5 = 33$ opening statements. Using CN5 (the whole is greater than the part), state one clean comparison between the whole set of $48$ propositions and a proved subset of $12$ of them.',
              solution: [
                'Identify the whole and the part: the whole is the $48$ proved propositions of Book I; the subset of $12$ is a part of that whole.',
                'Take CN5: the whole is greater than the part — so $48 > 12$.',
                'So, the subset is strictly smaller: it cannot exhaust the book; $48 - 12 = 36$ propositions lie outside it.',
                'Hence: $48 > 12$ by CN5 (whole greater than part), with $36$ propositions remaining outside the subset.',
              ],
              answer: '48 > 12 by CN5; 36 propositions lie outside the subset',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'A construction proceeds: (i) join $A$ to $B$; (ii) extend $AB$ beyond $B$ to $C$; (iii) draw the circle centred at $A$ through $B$; (iv) construct a right angle at $A$ and state that it equals any other right angle. Name the postulate licensing each of (i)–(iv).',
              solution: [
                'Step (i): a straight line is drawn through two given points — this is P1, the joiner.',
                'Step (ii): an existing finite segment is prolonged continuously in its own direction — this is P2, the extender (extend, never re-draw).',
                'Step (iii): a circle with any centre ($A$) and any radius ($AB$) is drawn — this is P3, the circler.',
                'Step (iv): the claim that a right angle here equals a right angle anywhere is the calibration of the plane — this is P4, the uniform ruler: all right angles are equal to one another.',
                'Hence: (i) P1, (ii) P2, (iii) P3, (iv) P4 — the licence mapping every construction step answers to.',
              ],
              answer: '(i) P1, (ii) P2, (iii) P3, (iv) P4',
            },
            {
              q: 'Fill the shortfall table: for each pair of interior angles on one side of a transversal — $(90°, 90°)$, $(100°, 70°)$, $(50°, 60°)$, $(80°, 60°)$ — compute the sum $\u03b1 + \u03b2$, the shortfall $180° - (\u03b1 + \u03b2)$, and say what P5 promises.',
              solution: [
                'Boundary pair: $90° + 90° = 180°$, shortfall $180° - 180° = 0$ — exactly two right angles; the clause is silent, no meeting forced (the parallel case).',
                'Second pair: $100° + 70° = 170°$, shortfall $180° - 170° = 10°$ — the lines meet on that side, making a $10°$ angle.',
                'Third pair: $50° + 60° = 110°$, shortfall $180° - 110° = 70°$ — the lines meet on that side, converging sharply with a $70°$ meeting angle.',
                'Fourth pair: $80° + 60° = 140°$, shortfall $180° - 140° = 40°$ — the lines meet on that side, meeting angle $40°$.',
                'Hence: shortfalls $0$ (boundary), $10°$, $70°$, $40°$ respectively; P5 fires on every pair with positive shortfall.',
              ],
              answer: 'shortfalls 0 (boundary), 10°, 70°, 40° — P5 fires on the last three',
              figures: [
                {
                  caption: 'The shortfall at a glance: two bars against the 180° boundary — 170° is short by 10°, 110° is short by 70°.',
                  svg: geo12Svg(660, 190, 'Number-line bars: the 180 degree boundary line, a bar to 170 degrees labelled short by 10 degrees, and a bar to 110 degrees labelled short by 70 degrees.', [
                    geo12Line(40, 40, 620, 40, c102.ink, 2.5),
                    geo12Head(620, 40, 0, c102.ink, 8),
                    geo12Txt(640, 44, '180°', 13, c102.ink, 'middle', '700'),
                    geo12Txt(330, 60, '90° + 90° = 180°: exactly two right angles — the boundary, the clause is silent', 12, c102.slate, 'middle', '600'),
                    geo12Rect(40, 70, 547.8, 26, c102.redSoft, c102.red, 6),
                    geo12Line(587.8, 66, 587.8, 100, c102.amber, 2, '4,4'),
                    geo12Txt(313, 88, '100° + 70° = 170°', 12.5, c102.red, 'middle', '700'),
                    geo12Txt(604, 92, 'short 10°', 11, c102.amber, 'start', '700'),
                    geo12Txt(330, 118, 'shortfall 180° − 170° = 10° — they meet, meeting angle 10°', 12, c102.ink, 'middle', '600'),
                    geo12Rect(40, 130, 354.4, 26, c102.amberSoft, c102.amber, 6),
                    geo12Txt(217, 148, '50° + 60° = 110°', 12.5, c102.amber, 'middle', '700'),
                    geo12Txt(330, 178, 'shortfall 180° − 110° = 70° — they meet sooner, meeting angle 70°', 12, c102.ink, 'middle', '600'),
                  ].join('')),
                },
              ],
            },
            {
              q: 'A compass is set with centre $A = (2, 3)$ and radius $6$ (P3). Decide for each point whether it lies on the circle: $(2, 9)$, $(10, 3)$, $(5.6, 7.8)$. Justify each by the radius-equality check.',
              solution: [
                'Recall the P3 record: the circle is the set of points at distance exactly the radius ($6$) from the centre $(2, 3)$.',
                'Check $(2, 9)$: distance $= \u221a((2-2)^2 + (9-3)^2) = \u221a36 = 6$ — equal to the radius, so it lies on the circle.',
                'Check $(10, 3)$: distance $= \u221a((10-2)^2 + (3-3)^2) = \u221a64 = 8 \u2260 6$ — not on the circle (it lies outside, $2$ beyond the radius).',
                'Check $(5.6, 7.8)$: distance $= \u221a(3.6^2 + 4.8^2) = \u221a(12.96 + 23.04) = \u221a36 = 6$ — equal to the radius, so it lies on the circle.',
                'Hence: $(2, 9)$ and $(5.6, 7.8)$ lie on the circle; $(10, 3)$ does not.',
              ],
              answer: '(2, 9) on, (10, 3) off, (5.6, 7.8) on',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Essay (with structure): explain why P5 is called "constructive-negative" and "about the unobservable", contrasted with P1–P4. Give one concrete way the exam tests the contrast.',
              solution: [
                'Take the four siblings first: P1, P2, P3 license constructions you execute here and now (join, extend, circle), and P4 asserts the equality of right angles — figures you can exhibit on the page.',
                'Now, P5 instead points forward: it does not produce a figure; it forces a MEETING of two lines "extended far enough" — an event that may lie beyond any drawing you can make.',
                'So, "constructive-negative": from a shortfall $(\u03b1 + \u03b2 < 180°)$ it forces the two lines not to stay separate — the conclusion is a negative that generates a construction far away. And "about the unobservable": the meeting cannot be checked on paper, only legislated.',
                'Check the dependency: the "extended far enough" move is legal only because P2 makes lines extendable, and the "two right angles" trigger is fixed only because P4 calibrates them at $90° + 90° = 180°$.',
                'Exam shape: given the interior angles $95°$ and $80°$ on one side, compute $95° + 80° = 175°$, shortfall $180° - 175° = 5°$, and answer: meet on that side, meeting angle $5°$ — one line of arithmetic, one mark.',
                'Hence: P1–P4 are present-tense permissions and calibrations; P5 alone legislates the far-away — and the exam tests it with arithmetic like $95° + 80° = 175°$, shortfall $180° - 175° = 5°$, meeting angle $5°$.',
              ],
              answer: 'P5 forces a far-away meeting (95° + 80° = 175°, shortfall 5°, meet with angle 5°) — unlike the present-tense P1–P4',
            },
            {
              q: 'For $\u03b1 = 95°$ and $\u03b2 = 80°$ on one side of a transversal: compute both side-sums, the shortfall, and the angle the lines make where they meet. Which side carries P5’s promise?',
              solution: [
                'Split the four interior angles: they fill $360°$ around the two crossing points, so the other side sums to $360° - (\u03b1 + \u03b2)$.',
                'Take the given side: $95° + 80° = 175°$ — below the $180°$ boundary.',
                'So, shortfall $= 180° - 175° = 5°$: the promise fires on THIS side — the lines meet here, making a $5°$ angle.',
                'Check the other side: $360° - 175° = 185° > 180°$ — above the boundary, so P5 promises nothing there.',
                'Hence: given side $175°$, shortfall $5°$, meeting angle $5°$; other side $185°$, silent.',
              ],
              answer: '175° and shortfall 5° on the given side (meeting angle 5°); other side 185°, silent',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Chronology essay: order the five pinned dates — Saccheri, Playfair, Lobachevsky, Bólyai, Hilbert — and give one verified sentence on each contribution.',
              solution: [
                'Order the years first: $1733 < 1795 < 1829 < 1832 < 1899$.',
                'So, the order is Saccheri (1733), Playfair (1795), Lobachevsky (1829), Bólyai (1832), Hilbert (1899).',
                'Saccheri 1733: the honest reductio — assumed the failure of P5 and pushed the consequences, nearly building a non-Euclidean geometry without realising it.',
                'Playfair 1795: the through-a-point-at-most-one-parallel form — a genuine equivalent of Euclid’s clause, the form modern texts quote (chapter 2 adopts it).',
                'Lobachevsky 1829: the Kazan Messenger publication — the first published non-Euclidean geometry, where P5 fails and the system stands.',
                'Bólyai 1832: the Appendix — an independent discovery of non-Euclidean geometry, "a strange new world from nothing."',
                'Hilbert 1899: the Grundlagen — the rulebook rebuilt cleanly, making independence precise mathematics.',
                'Hence: 1733, 1795, 1829, 1832, 1899 — Saccheri, Playfair, Lobachevsky, Bólyai, Hilbert, in that order.',
              ],
              answer: '1733 Saccheri, 1795 Playfair, 1829 Lobachevsky, 1832 Bólyai, 1899 Hilbert',
            },
            {
              q: 'State Playfair’s form of the parallel postulate and explain in two moves why it deserves to be called an "equivalent" of Euclid’s clause rather than a replacement rule.',
              solution: [
                'State it: through a given point not on a given line, at most ONE parallel line can be drawn.',
                'Now, the equivalence claim has two directions: from Playfair’s form you can derive Euclid’s clause (the shortfall side forces the meeting, else there would be two parallels); from Euclid’s clause you can derive Playfair’s form.',
                'So, neither rule is stronger: each proves the other, while P1–P4 sit quietly underneath both — which is exactly what "equivalent" means.',
                'Check the history pin: Playfair published this form in 1795, before the independence question was settled (1829/1832) — the form is a re-dressing of P5, not a cure for it.',
                'Hence: Playfair’s form is P5 with a new face on it — equivalent, adoptable (chapter 2 adopts it), and equally unprovable from P1–P4.',
              ],
              answer: 'through a point not on a line, at most one parallel — equivalent in both directions to Euclid’s clause',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Research-level argument: what exactly was established in 1829/1832, and why does it close the two-thousand-year question in the direction it does? (Address: consistency, independence, and what Hilbert 1899 added.)',
              solution: [
                'Set the ancient target: to PROVE P5 from P1–P4 and shrink the permission list to four.',
                'Take the 1829/1832 result: Lobachevsky (Kazan Messenger) and Bólyai (the Appendix) each published a consistent geometry in which P1–P4 hold and P5 FAILS.',
                'Now, the logical squeeze: if P5 followed from P1–P4, it would have to hold in every system where P1–P4 hold. It demonstrably does not.',
                'So, P5 is independent of P1–P4 — neither provable nor disprovable from them — and the ancient project was aimed at a target that never existed.',
                'Check the resolution layer: the 1829/1832 systems were convincing but built on classical ideas of point, line and plane; Hilbert (1899, Grundlagen der Geometrie) rebuilt the rules cleanly with modern axioms and logic, making independence a precise, provable fact rather than a persuasive case.',
                'Hence: 1829/1832 established independence by example — consistent worlds where P5 fails; 1899 turned the example into rigorous mathematics. The two-thousand-year question closed not with a proof of P5 but with the discovery that no such proof was ever possible.',
              ],
              answer: 'independence: consistent geometries (1829, 1832) where P5 fails; Hilbert 1899 made it precise — no proof of P5 exists',
            },
            {
              q: 'The Book-I census question: with $23$ definitions, $5$ postulates and $5$ common notions feeding $48$ propositions, compute the number of opening statements, the number of permissions among them, and argue why keeping the permission list at five was the achievement.',
              solution: [
                'Count the opening statements: $23 + 5 + 5 = 33$.',
                'Split them by kind: $23$ are vocabulary (definitions), $5$ are geometry-specific permissions (postulates), $5$ are general truths about equality (common notions).',
                'Now, the permissions subset: $5$ of the $33$ — the whole $33$ is greater than this part $5$ (CN5), and it is the part that does the geometric work.',
                'So, the achievement question: could a geometer have done the same with more permissions? Of course — the discipline is the refusal. Every extra assumption would have hidden a theorem inside the "rules" and made the game easier but the knowledge cheaper.',
                'Check the extreme: the fifth shows even five was one too many in a sense — P5 could not be derived, but it could be REPLACED (Playfair 1795) or negated (1829/1832) to produce new worlds; the list is a choice, not a given.',
                'Hence: $33$ opening statements, $5$ permissions among them, $48$ propositions earned — and the five-permission discipline is the constitution that made the earning possible.',
              ],
              answer: '33 opening statements; 5 of them permissions; 48 propositions earned from the five-permission discipline',
            },
          ],
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. reading the rulebook like an examiner                      */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Reading the rulebook like an examiner' },
    {
      kind: 'para',
      text: 'Three confusions account for almost every lost mark on this material, so name them now. Confusion one: "postulate" versus "axiom". Older books (and some traditions) call the common notions "axioms" and reserve "postulates" for the geometric permissions; modern usage varies from book to book. In this course the rule is fixed: postulate = one of Euclid’s five geometric permissions; common notion = one of the five general truths. If an exam paper says "axiom", read it as whichever list the statement’s content demands — the classifier question (is a geometric object named?) settles it either way.',
    },
    {
      kind: 'para',
      text: 'Confusion two: "straightedge" versus "ruler". A ruler in the schoolroom sense is marked — it measures. Euclid’s straightedge is deliberately UNMARKED: it can draw the line through two points and extend a line, and that is all. Every length-transfer in classical geometry is done by the compass (P3), never by reading a scale. When a construction problem says "using ruler and compasses", the intended charter is exactly P1 + P2 + P3; a step like "measure the length of $AB$ with the ruler" is not a legal move in the ancient game — it must be replaced by a compass construction that produces the equal length.',
    },
    {
      kind: 'para',
      text: 'Confusion three: the direction of P5’s arithmetic. Students memorise "less than two right angles means meeting" but then mis-assign the side. The discipline is mechanical: compute $\u03b1 + \u03b2$ for ONE named side. If the sum is below $180°$, the meeting is on THAT side, and the shortfall $180° - (\u03b1 + \u03b2)$ is the angle at the meeting point. The other side automatically carries $360° - (\u03b1 + \u03b2)$, which is then above $180°$ — silent, no promise. Never say "the lines meet" without naming the side; the side is half the answer.',
    },
    {
      kind: 'para',
      text: 'One more study aid, the five-in-one-breath summary. P1: lines exist on demand (join any two points). P2: lines never run out (extend any finite line). P3: circles exist on demand (any centre, any radius). P4: the right angle is absolute (all right angles are equal). P5: shortfall forces meeting (interior angles under $180°$ on one side mean the lines meet on that side). Four of the five are about making things; the fifth is about what happens when you don’t stop extending. Say it that way in your head and the list will never come out shuffled.',
    },
    {
      kind: 'para',
      text: 'And a closing word about the game itself. The five postulates are the reason a geometry proof feels different from every other kind of school writing: every line in it is either licensed (a construction citing P1, P2 or P3), calibrated (a comparison citing P4), assumed (a postulate or common notion invoked by name), or earned (a proposition already proved). Nothing else is allowed in. That discipline — Euclid’s discipline — is the same one that still runs through every mathematical subject you will meet in this library: a short list of permissions, and everything else earned. Chapter 2 picks up the thread with Playfair’s 1795 form of the fifth postulate and builds the parallel theory on it; chapter 11 returns to the fifth one last time, with the full catalogue of its equivalents and the non-Euclidean door standing open. Until then, you own the rulebook: five postulates, five common notions, twenty-three words — and forty-eight propositions that were all, one way or another, paid for in full.',
    },
  ],
}


export const chapter1: Chapter = {
  number: 1,
  slug: 'points-lines-and-planes',
  title: 'Points, Lines and Planes: the Axiomatic Idea',
  summary:
    'Geometry restarts from zero — not from shapes but from RULES. The undefined words (point, line, plane), the definitions that ride on them, and Euclid\u2019s five postulates as the rules of the game. The reader meets the axiomatic method itself: a statement is believed only when proved, and everything before the first proof is either an agreement or a promise. Foundation Mathematics 8\u2019s shape vocabulary is recalled as the intuition this structure formalises.',
  status: 'in-progress',
  lessons: [lessonGeo101, lessonGeo102],
  plannedLessons: [
    'Axioms, Theorems and the Shape of a Proof',
    'Incidence: how Points, Lines and Planes Interlock',
  ],
}
