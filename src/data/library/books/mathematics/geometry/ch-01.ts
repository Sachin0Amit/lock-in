import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 1 "Points, Lines and Planes: the Axiomatic Idea"
 * (OPENED by the RUN 124 whole-chapter swarm and CLOSED COMPLETE by the
 * RUN 125 swarm, 2026-11-25: 1.1 + 1.2 delivered by geo101/geo102 at
 * 100/100 and 86/86 green; 1.3 'Axioms, Theorems and the Shape of a Proof'
 * and 1.4 'Incidence: how Points, Lines and Planes Interlock' delivered by
 * geo103/geo104 at 109/109 and 101/101 green — 10,047 and 9,688 words —
 * against the specs + ALL-GREEN pre-flight pin checker preserved in
 * docs/research/geo-ch01-wip/. Four lessons, one arc: the undefined words,
 * the five postulates, the shape of a proof, and the first counted
 * consequences. The chapter now powers ch.2 (angles, parallels, the
 * transversal census).)
 *
 * PROVENANCE: ground = the run-124 web-verified research pass (Euclid's
 * Elements Book I census via Joyce's clarku edition; Hilbert's
 * Grundlagen axiom listing; Playfair 1795; Saccheri 1733 / Lobachevsky
 * 1829 / Bolyai 1832 chronology; the Fano-plane census; de Bruijn–Erdős
 * 1948) — every URL banked in docs/project/SOURCE_LOG.md under the
 * geo-* keys. STUDY-NEVER-REPRODUCE absolute: every roster, witness,
 * figure, Illustration, quiz item and exercise below is OUR OWN,
 * engine-pinned in scripts/verify-book5-ch01.ts (which re-runs all four
 * verify-first harnesses against THIS file and closes with the
 * closed-chapter census).
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
    out.push(geo11Txt(p.x + 80, 60, p.title, 13.5, c101.ink, 'middle', '600'))
    out.push(geo11Txt(p.x + 80, 75, p.dim, 11.5, c101.tealInk, 'middle'))
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
  // panel 4: space as a box (front square + offset back square, shifted down clear of the dim label)
  out.push(`<rect x="615" y="101" width="75" height="65" fill="none" stroke="${c101.struct}" stroke-width="1.8"/>`)
  out.push(`<rect x="637" y="83" width="75" height="65" fill="none" stroke="${c101.faint}" stroke-width="1.4" stroke-dasharray="5 4"/>`)
  for (const [x1, y1, x2, y2] of [[615, 101, 637, 83], [690, 101, 712, 83], [690, 166, 712, 148], [615, 166, 637, 148]] as const) {
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
    geo11Txt(474, 132, 'point P', 12.5, c101.ink, 'start', '600'),
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
  slate: '#0f766e',
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
        geo12Line(766, 180, 795, 55, c102.red, 2),
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
        geo12Txt(598, 162, 'the meeting point', 11.5, c102.red, 'end', '600'),
        // angle marks
        `<path d="M 198 205 A 28 28 0 0 0 165.1 177.4" fill="none" stroke="${c102.amber}" stroke-width="2"/>`,
        geo12Txt(212, 188, 'α = 100°', 13, c102.amber, 'start', '700'),
        `<path d="M 184 121.6 A 30 30 0 0 1 159.6 145.9" fill="none" stroke="${c102.amber}" stroke-width="2"/>`,
        geo12Txt(196, 150, 'β = 70°', 13, c102.amber, 'start', '700'),
        `<path d="M 633 205 A 24 24 0 0 1 633.4 200.8" fill="none" stroke="${c102.red}" stroke-width="2"/>`,
        geo12Txt(644, 228, '10°', 12, c102.red, 'middle', '700'),
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

/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c103 = {
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
const f103 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo13 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo13Txt = (
  x: number, y: number, s: string,
  size = 13, color = c103.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f103}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo13Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c103.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo13Circ = (
  cx: number, cy: number, r: number, color = c103.ink, w = 2.5, fill = 'none',
): string =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${color}" stroke-width="${w}"/>`

const geo13Dot = (x: number, y: number, color = c103.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo13Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo13Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo13Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c103.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return (
    geo13Line(x1, y1, x2, y2, color, w) + geo13Head(x2, y2, a, color, 8)
  )
}

const geo13Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/* ================================================================== */
/* LESSON 1.3 — Axioms, Theorems and the Shape of a Proof              */
/* ================================================================== */
export const lessonGeo103: Lesson = {
  id: 'geo-axioms-theorems-and-the-shape-of-a-proof',
  number: '1.3',
  title: 'Axioms, Theorems and the Shape of a Proof',
  concepts: [
    'axiom',
    'theorem',
    'conditional statement',
    'contrapositive',
    'proof by contradiction',
    'counterexample',
    'model',
    'quantifier',
  ],
  objectives: [
    'Classify any statement as definition, axiom, conjecture, theorem, lemma or corollary, and say who vouches for it',
    'Build the truth table of a conditional and write its converse, inverse and contrapositive without mixing them up',
    'Explain vacuous truth and spot the single row (P true, Q false) that falsifies a conditional',
    'Recognise the four proof shapes — direct, contrapositive, contradiction, counterexample — and choose the right one for a given claim',
    'Read quantifier order correctly and test statements like “for every point there exists a line” on a concrete model',
    'Explain what a model is, and how a model proves consistency — or proves that a statement is independent of the axioms',
  ],
  prerequisites: ['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game'],
  sources: ['geo-euclid-elements', 'geo-hilbert-grundlagen'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'From rules to results' },
    {
      kind: 'para',
      text: 'Lesson 1.2 handed us the rulebook: five postulates that license constructions and assumptions, five common notions that govern equality, twenty-three definitions that fix the vocabulary. A game, however, is not its rules — a game is what happens when you PLAY. This lesson is about playing: about how the rulebook grinds out results, one licensed step at a time, until statements like “the base angles of an isosceles triangle are equal” stop being opinions and become inescapable. The engine of that grinding is the PROOF, and this lesson is a tour of what proofs are made of.',
    },
    {
      kind: 'para',
      text: 'The axiomatic method makes one promise, and it is a severe one: a statement is believed only when it is PROVED. Everything before the first proof is an agreement or a promise — vocabulary (definitions), permissions (postulates), counting rules (common notions). After the first proof, each new theorem becomes part of the machinery that the next proof may use. Mathematics is the only subject built this way from the ground up, and Euclid’s Elements is the oldest surviving book built this way end to end: Book I starts from its thirty-three opening statements and earns all forty-eight of its propositions. Nothing in between is “widely accepted” or “almost certain”; it is either proved, or it is not yet part of the theory.',
    },
    {
      kind: 'para',
      text: 'So what separates a proof from a vibe? Three things, and we shall meet each one properly in this lesson. First, a proof starts from statements whose status is explicit — assumed, defined, or already proved — and never from silent intuition. Second, a proof is a CHAIN: each link is a licensed move (a postulate, a common notion, an earlier proposition) applied to the previous links, so the whole chain is as trustworthy as its weakest licence. Third, a proof has a SHAPE: four great shapes — direct, contrapositive, contradiction and counterexample — cover almost every argument you will ever meet, and learning to name the shape of an argument is a genuine exam skill. Along the way we shall also need the grammar that conditionals are written in: the truth table, the converse trap, vacuous truth, and the order of the quantifiers “for all” and “there exists”.',
    },
    {
      kind: 'para',
      text: 'One honest warning before we start. This lesson contains almost no computation — you cannot “check” a proof by plugging in numbers the way you check a quadratic. What you can do is AUDIT: name the status of every statement used, name the licence behind every step, and name the shape of the whole. That is exactly the skill the exercises and the quiz train. By the end, the phrase “Q.E.D.” will mean something precise to you, and — more importantly — the difference between a theorem, a conjecture and a guess will be impossible to blur.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the statement family                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The statement family: who vouches for what' },
    {
      kind: 'para',
      text: 'Every sentence in a mathematical theory has a STATUS, and the status is the answer to one question: WHO VOUCHES FOR THIS? Not “is it true?” — truth is not a label you can read off a sentence; it is earned or assumed or still open. The family has six members, and learning to classify a statement into the right member is the first half of this lesson. Here is the whole family at a glance, each with our own worked example from the two lessons you have already read:',
    },
    {
      kind: 'table',
      caption: 'The six statement families — the status of every sentence in a theory',
      head: ['Family', 'Who vouches for it', 'Our example from Lessons 1.1–1.2'],
      rows: [
        ['Definition', 'an agreement — a naming, nothing to prove', '“A point is that which has no part” (Book I, Definition 1)'],
        ['Axiom / postulate', 'assumed — the price of admission', 'P2: a finite straight line may be extended continuously'],
        ['Conjecture', 'believed, unproved — an honest open label', 'Goldbach’s: every even number beyond 2 is a sum of two primes'],
        ['Theorem', 'proved — earned from the axioms', 'vertical angles are equal (Elements I.15)'],
        ['Lemma', 'proved — a stepping-stone on the way to a theorem', 'angles on one line sum to two right angles (I.13, feeding I.15)'],
        ['Corollary', 'proved — a one-step consequence of a theorem', 'two distinct lines meet in at most one point'],
      ],
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition, axiom, conjecture, theorem, lemma, corollary',
      text: 'A definition is a naming agreement: it introduces a word or phrase and assigns it meaning; it can never be “proved” or “disproved”, only useful or useless. An axiom (Euclid says postulate for the geometry-specific ones and common notion for the general ones) is a statement ASSUMED without proof — the foundation. A conjecture is a statement believed true on good evidence but not yet proved; until a proof arrives, it carries no authority. A theorem is a statement proved from the axioms. A lemma is a theorem whose job is to serve as a stepping stone toward a bigger result. A corollary is a statement that follows from a theorem already proved in one short step.',
    },
    {
      kind: 'para',
      text: 'Two of the six families deserve a second look because they are the two students most often blur. The AXIOM is not “a statement that seems obviously true” — it is a statement the theory has CHOSEN to assume, and the choice is a creative act. Euclid chose to assume P2 (extendability) rather than “a line has no last point”; the two are logically intertwined, as our contradiction proof below will show, but one of them is the licence and the other is a consequence. Choosing small, strong, independent axioms is the whole art of the foundations — Hilbert’s 1899 Grundlagen der Geometrie re-proved Euclid’s plane from a cleaner axiom list precisely to show the choice could be made better. The CONJECTURE, meanwhile, is mathematics at its most honest: a hypothesis with evidence but no proof. Goldbach’s conjecture has been verified numerically for enormous ranges of even numbers — and remains a conjecture, because a finite verification is not a proof. Numerical checks suggest; only a proof disposes.',
    },
    {
      kind: 'para',
      text: 'The three PROVED families differ only in their job, not in their authority. A lemma has exactly the same certainty as a theorem — it was proved the same way — but the author labels it a lemma to signal organisation: “this is scaffolding for the main result”. A corollary is likewise fully proved; its label advertises that it costs almost nothing once the parent theorem is in hand. Our corollary example is worth proving properly, because it is the first proof shape we shall own in this lesson: from “two distinct points lie on exactly one line”, it follows at once that two distinct lines meet in AT MOST one point — for if two distinct lines shared two points, those two points would lie on two distinct lines, contradicting the axiom. One step, done. That is the corollary shape.',
    },
    {
      kind: 'figure',
      caption: 'The statement-family map. Six families, six vouchers: definitions are agreed, axioms are assumed, conjectures are believed-but-open, and theorem, lemma and corollary are all proved — differing only in their job. The arrows on the right show how a proof promotes a statement: a proved conjecture becomes a theorem.',
      svg: geo13Svg(900, 272, 'The statement-family map: six labelled boxes in two rows with the voucher for each family, and promotion arrows from conjecture to theorem.', [
        geo13Txt(450, 22, 'WHO VOUCHES FOR IT?', 13, c103.ink, 'middle', '700'),
        // row 1
        geo13Rect(14, 40, 282, 88, c103.panel, c103.green),
        geo13Txt(155, 66, 'definition', 14, c103.ink, 'middle', '700'),
        geo13Txt(155, 88, 'an agreement', 12.5, c103.amber),
        geo13Txt(155, 110, 'naming only — nothing to prove', 11.5, c103.tealInk),
        geo13Rect(309, 40, 282, 88, c103.panel, c103.green),
        geo13Txt(450, 66, 'axiom / postulate', 14, c103.ink, 'middle', '700'),
        geo13Txt(450, 88, 'assumed', 12.5, c103.amber),
        geo13Txt(450, 110, 'the price of admission', 11.5, c103.tealInk),
        geo13Rect(604, 40, 282, 88, c103.panel2, c103.amber),
        geo13Txt(745, 66, 'conjecture', 14, c103.orange, 'middle', '700'),
        geo13Txt(745, 88, 'believed, unproved', 12.5, c103.amber),
        geo13Txt(745, 110, 'an honest open label', 11.5, c103.tealInk),
        // row 2
        geo13Rect(14, 170, 282, 88, c103.panel2, c103.green),
        geo13Txt(155, 196, 'theorem', 14, c103.ink, 'middle', '700'),
        geo13Txt(155, 218, 'proved', 12.5, c103.amber),
        geo13Txt(155, 240, 'earned from the axioms', 11.5, c103.tealInk),
        geo13Rect(309, 170, 282, 88, c103.panel2, c103.green),
        geo13Txt(450, 196, 'lemma', 14, c103.ink, 'middle', '700'),
        geo13Txt(450, 218, 'proved', 12.5, c103.amber),
        geo13Txt(450, 240, 'a stepping-stone theorem', 11.5, c103.tealInk),
        geo13Rect(604, 170, 282, 88, c103.panel2, c103.green),
        geo13Txt(745, 196, 'corollary', 14, c103.ink, 'middle', '700'),
        geo13Txt(745, 218, 'proved', 12.5, c103.amber),
        geo13Txt(745, 240, 'a one-step consequence', 11.5, c103.tealInk),
        // promotion arrow: conjecture -> theorem (runs in the widened row gap)
        geo13Arrow(745, 138, 165, 158, c103.orange, 2),
        geo13Txt(452, 180, 'proof promotes a conjecture to a theorem', 11, c103.orange),
      ]),
    },
    {
      kind: 'para',
      text: 'A useful habit, worth adopting today: whenever you read any mathematical sentence — in this book, in a paper, in an exam question — ask silently “who vouches for this?” before you ask whether it is true. The answer changes what you are allowed to DO with it. You may USE an axiom freely, USE a theorem freely once proved, USE a definition as the meaning of a word — but you may only USE a conjecture if you are willing to build your entire argument on sand. In proofs, provenance is everything.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the conditional heart                                       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The conditional heart of every theorem' },
    {
      kind: 'para',
      text: 'Nearly every theorem in mathematics wears the same grammatical costume: IF something holds, THEN something else follows. “IF two segments coincide exactly, THEN they are equal in length.” “IF two interior angles on one side of a transversal sum to less than two right angles, THEN the lines meet on that side.” The costume is called a CONDITIONAL statement, written $P \\Rightarrow Q$ and read “$P$ implies $Q$”. The part before the arrow, $P$, is the HYPOTHESIS — what we are allowed to assume. The part after the arrow, $Q$, is the CONCLUSION — what we are then entitled to claim. A theorem is exactly a conditional whose claim has been earned: the hypothesis is the raw material, the proof is the manufacturing process, and the conclusion is the product.',
    },
    {
      kind: 'para',
      text: 'The arrow has a precise meaning, and it is worth staring at for a moment because it is narrower than everyday speech. $P \\Rightarrow Q$ promises only one thing: it is IMPOSSIBLE for $P$ to hold while $Q$ fails. It says nothing about what happens when $P$ fails; it says nothing about whether $Q$ can hold for other reasons. In symbols the promise unpacks as the equivalence $P \\Rightarrow Q \\equiv \\neg P \\vee Q$ — “either $P$ fails, or $Q$ holds”. This is called the material conditional, and its full behaviour is captured by a table with just four rows: the two possible truth values of $P$ crossed with the two possible truth values of $Q$. Here is the complete table, all four forms of the conditional family at once (we shall meet the three relatives below):',
    },
    {
      kind: 'table',
      caption: 'The complete truth table — four rows, four statement forms (engine-swept: columns T F T T / T T F T / T T F T / T F T T)',
      head: ['$P$', '$Q$', '$P \\Rightarrow Q$', 'converse $Q \\Rightarrow P$', 'inverse $\\neg P \\Rightarrow \\neg Q$', 'contrapositive $\\neg Q \\Rightarrow \\neg P$'],
      rows: [
        ['T', 'T', 'T', 'T', 'T', 'T'],
        ['T', 'F', 'F', 'T', 'T', 'F'],
        ['F', 'T', 'T', 'F', 'F', 'T'],
        ['F', 'F', 'T', 'T', 'T', 'T'],
      ],
    },
    {
      kind: 'para',
      text: 'Three readings of the table, in increasing subtlety. First: $P \\Rightarrow Q$ is false in EXACTLY ONE row — the row where $P$ is true and $Q$ is false (T, F). That single row is the whole personality of the conditional: proving a conditional means ruling out that one row; refuting one means exhibiting a situation where $P$ holds and $Q$ fails. Second: in the last two rows $P$ is FALSE, and the conditional is TRUE in both — regardless of what $Q$ is doing. These are the VACUOUS rows, and they are the most misunderstood cells in all of mathematics; a full callout is devoted to them below. Third: compare the first column of verdicts with the last: the rows for $P \\Rightarrow Q$ and for $\\neg Q \\Rightarrow \\neg P$ are IDENTICAL — T F T T in both. That identity is the contrapositive equivalence, the single most useful move in the geometry proof arsenal, and Euclid uses it constantly.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution — vacuous truth is not a mistake, it is the definition',
      text: 'When $P$ is false, $P \\Rightarrow Q$ is true — for BOTH values of $Q$. The promise “$P$ holds only when $Q$ holds” is kept vacuously if $P$ never holds at all. Example: “every 90-degree angle in this figure is a right angle” is true even in a figure containing no 90-degree angles. Students resist this (“how can a false statement imply anything?”), but the definition is forced on us: we want “if $P$ then $Q$” to be equivalent to “$P$ never holds without $Q$”, and that reading is satisfied trivially when $P$ is empty. Remember: only the row (T, F) falsifies a conditional.',
    },
    {
      kind: 'para',
      text: 'Now the relatives — the three other conditionals you can build by flipping or negating. From $P \\Rightarrow Q$ we obtain the CONVERSE $Q \\Rightarrow P$ by swapping the parts, the INVERSE $\\neg P \\Rightarrow \\neg Q$ by negating both parts, and the CONTRAPOSITIVE $\\neg Q \\Rightarrow \\neg P$ by swapping AND negating. The engine sweeps all four rows for all four forms, and the result is a law worth memorising: the converse and the inverse are NOT equivalent to the original — each differs from it in the two rows where exactly one of $P$, $Q$ holds — while the contrapositive IS equivalent to the original, identical on all four rows. A worked instance makes it visceral: take $P$ = “the two segments coincide exactly” and $Q$ = “they are equal in length”. The original (CN4) is true. The converse says “equal in length implies coincidence” — FALSE: two unit segments drawn in different places are equal in length yet do not coincide (our engine’s counterexample instance, realising the row P false, Q true, where the original is vacuously true but the converse fails). The contrapositive says “unequal in length implies no coincidence” — TRUE, provable, and identical in force to CN4 itself.',
    },
    {
      kind: 'figure',
      caption: 'The conditional square. Original $P ⇒ Q$ and contrapositive $¬Q ⇒ ¬P$ (green, solid) are logically equivalent — identical on all four truth-table rows. Converse $Q ⇒ P$ and inverse $¬P ⇒ ¬Q$ (red, dashed) form the second equivalence class — each is the contrapositive of the other, but NEITHER is equivalent to the original. The two counterexample rows live where exactly one of P, Q is true.',
      svg: geo13Svg(900, 300, 'The conditional square: four boxes for the original, converse, inverse and contrapositive, with green equivalence arrows between original and contrapositive and between converse and inverse, and red dashed not-equivalent links across.', [
        geo13Txt(450, 24, 'ONE CONDITIONAL, THREE RELATIVES — TWO EQUIVALENCE CLASSES', 13, c103.ink, 'middle', '700'),
        // original (top-left, green)
        geo13Rect(24, 46, 380, 100, c103.panel, c103.green, 12),
        geo13Txt(214, 78, 'original: $P ⇒ Q$'.replace(/\$/g, ''), 14, c103.ink, 'middle', '700'),
        geo13Txt(214, 102, 'the theorem as proved', 12, c103.tealInk),
        geo13Txt(214, 126, 'rows: T F T T', 12, c103.amber),
        // converse (top-right, red dashed)
        geo13Rect(496, 46, 380, 100, c103.paper, c103.red, 12),
        geo13Txt(686, 78, 'converse: Q ⇒ P', 14, c103.red, 'middle', '700'),
        geo13Txt(686, 102, 'swap the parts', 12, c103.tealInk),
        geo13Txt(686, 126, 'rows: T T F T — differs', 12, c103.amber),
        // inverse (bottom-left, red dashed)
        geo13Rect(24, 178, 380, 100, c103.paper, c103.red, 12),
        geo13Txt(214, 210, 'inverse: ¬P ⇒ ¬Q', 14, c103.red, 'middle', '700'),
        geo13Txt(214, 234, 'negate both parts', 12, c103.tealInk),
        geo13Txt(214, 258, 'rows: T T F T — differs', 12, c103.amber),
        // contrapositive (bottom-right, green)
        geo13Rect(496, 178, 380, 100, c103.panel, c103.green, 12),
        geo13Txt(686, 210, 'contrapositive: ¬Q ⇒ ¬P', 14, c103.ink, 'middle', '700'),
        geo13Txt(686, 234, 'swap AND negate', 12, c103.tealInk),
        geo13Txt(686, 258, 'rows: T F T T — same', 12, c103.amber),
        // equivalence arrows (green, double-headed, confined to the central corridor)
        geo13Arrow(408, 104, 492, 218, c103.green, 2.5),
        geo13Arrow(492, 218, 408, 104, c103.green, 2.5),
        geo13Arrow(492, 104, 408, 218, c103.green, 2.5),
        geo13Arrow(408, 218, 492, 104, c103.green, 2.5),
        // not-equivalent dashed (red)
        geo13Line(410, 96, 492, 96, c103.red, 2, '6,6'),
        geo13Txt(451, 86, 'not equivalent', 11, c103.red, 'middle', '700'),
        geo13Line(410, 228, 492, 228, c103.red, 2, '6,6'),
        geo13Txt(451, 218, 'not equivalent', 11, c103.red, 'middle', '700'),
      ]),
    },
    {
      kind: 'para',
      text: 'Why is the contrapositive so central to geometry? Because the negation of a statement is often EASIER to hold than the statement itself. To prove “two lines that meet meet in exactly one point” head-on, you would have to survey every possible meeting and rule out double meetings — tedious. Its contrapositive, “if two lines share two distinct points, they are the same line”, is one move: two points determine a unique line (Hilbert’s incidence axiom I.1, previewed in 1.2 and proved in planar form in the next lesson), so two lines sharing two points were never distinct in the first place. Same truth value — four rows, identical verdicts — but wildly different difficulty. Recognising when to switch from a conditional to its contrapositive is the first great proof-finding skill.',
    },
    {
      kind: 'formula',
      name: 'Contrapositive equivalence',
      latex: 'P \\Rightarrow Q \\equiv \\neg Q \\Rightarrow \\neg P',
      note: 'the ONLY relative of a conditional equivalent to it — swap and negate; Euclid’s everyday move',
    },
    {
      kind: 'formula',
      name: 'Material conditional',
      latex: 'P \\Rightarrow Q \\equiv \\neg P \\vee Q',
      note: 'the promise “P never holds while Q fails”, read as “either P fails or Q holds”',
    },
    {
      kind: 'formula',
      name: 'Biconditional',
      latex: 'P \\Leftrightarrow Q \\equiv (P \\Rightarrow Q) \\wedge (Q \\Rightarrow P)',
      note: '“if and only if” — true in exactly the two rows where P and Q agree',
    },

    /* -------------------------------------------------------------- */
    /* 4. the four proof shapes                                       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The four proof shapes' },
    {
      kind: 'para',
      text: 'A proof is a chain of licensed moves, but chains have SHAPES — patterns of how the argument attacks the conditional $P \\Rightarrow Q$. Almost every proof you will ever meet belongs to one of four families. DIRECT proof: start from $P$ and walk forward until $Q$ appears. CONTRAPOSITIVE proof: instead of proving $P \\Rightarrow Q$, prove the equivalent $\\neg Q \\Rightarrow \\neg P$ — assume $Q$ fails and show $P$ must fail. PROOF BY CONTRADICTION (reductio ad absurdum): assume the full negation of what you want — $P$ holds while $Q$ fails, or simply $\\neg Q$ for a standalone claim — and derive an impossibility; the impossibility convicts the assumption. And COUNTEREXAMPLE: the one shape that DESTROYS a claim rather than earning it — to refute a universal statement (“for every object, such-and-such”), exhibit a single object where it fails. The first three prove; the fourth refutes. We now own one worked micro-proof in each shape, chosen from the rulebook you already carry.',
    },
    {
      kind: 'table',
      caption: 'The four proof shapes — what you assume, what you derive, what you conclude',
      head: ['Shape', 'Assume', 'Derive', 'Verdict it produces'],
      rows: [
        ['Direct', 'the hypothesis $P$', 'a chain of licensed steps ending at $Q$', '$P \\Rightarrow Q$ proved'],
        ['Contrapositive', 'the failure of the conclusion ($\\neg Q$)', 'the failure of the hypothesis ($\\neg P$)', '$P \\Rightarrow Q$ proved (same rows)'],
        ['Contradiction', 'the negation of the claim', 'an impossibility — a statement that cannot hold', 'the claim proved; the assumption convicted'],
        ['Counterexample', 'one witness object', 'the claim fails for that witness', 'the universal claim REFUTED'],
      ],
    },
    {
      kind: 'derivation',
      title: 'Shape 1 — direct proof: equals to the same thing are equal to each other',
      statement: 'Claim: if $AB = EF$ and $CD = EF$, then $AB = CD$. This is Common Notion 1 itself — but watch the SHAPE: hypothesis in, chain of one licensed step, conclusion out.',
      steps: [
        { label: 'Carry the hypothesis', formula: 'AB = EF', explanation: 'The first hypothesis hands us: segment $AB$ is equal to segment $EF$. Nothing more — this is exactly what may be assumed.' },
        { label: 'Carry the second given', formula: 'CD = EF', explanation: 'The second hypothesis: segment $CD$ is equal to the SAME segment $EF$. The phrase “the same” is doing all the work.' },
        { label: 'Apply CN1', formula: 'AB = CD', explanation: 'Common Notion 1 — things equal to the same thing are equal to one another — applies verbatim: both $AB$ and $CD$ are equal to $EF$, so they are equal to each other.' },
      ],
      result: '$AB = CD$ — proved in one licensed step: hypothesis, common notion, conclusion. The direct shape at its purest.',
    },
    {
      kind: 'derivation',
      title: 'Shape 2 — contrapositive proof: unequal segments cannot coincide',
      statement: 'CN4 says: if two segments coincide exactly, they are equal in length ($P$ = coincide, $Q$ = equal). We prove its contrapositive — if two segments are NOT equal in length, they CANNOT be made to coincide — which is logically the same claim, and provable in two moves.',
      steps: [
        { label: 'Assume the conclusion fails', formula: 'AB \\neq CD', explanation: 'Take segments with different lengths — say one of length $4$ and one of length $3$. We assume $Q$ fails: the segments are not equal in length.' },
        { label: 'Suppose, for argument, they DID coincide', explanation: 'If they could be placed one on the other exactly — point on point, end on end — then CN4 would entitle us to call them equal.' },
        { label: 'Contradiction with CN5', formula: '4 = 3', explanation: 'Equal things have nothing left over; but the length-$4$ segment has a part beyond the length-$3$ one, and “the whole is greater than the part” (CN5) forbids the whole from equalling its own part. The step would force $4 = 3$ — impossible.' },
        { label: 'Conclude', explanation: 'The supposition of coincidence is impossible, so unequal segments cannot coincide — exactly the contrapositive, hence exactly CN4. Engine witness: lengths $4 \\neq 3$ force distinct point-sets.' },
      ],
      result: 'Not equal in length $\\Rightarrow$ cannot coincide — the contrapositive proved, so CN4 stands with it.',
    },
    {
      kind: 'derivation',
      title: 'Shape 3 — proof by contradiction: a line has no last point',
      statement: 'Claim: on any straight line, there is no last point — no point $L$ such that every other point of the line lies on the $L$-side. Postulate 2 (extendability) is the engine.',
      steps: [
        { label: 'Assume the negation', explanation: 'Suppose, for contradiction, that a LAST point $L$ exists on the line: some point such that nothing on the line lies beyond it.' },
        { label: 'Invoke P2 at $L$', explanation: 'Postulate 2 licenses extending the finite line continuously — in particular, extending beyond $L$. So there is a point $M$ of the line lying beyond $L$.' },
        { label: 'The clash', explanation: '“$L$ is last” says NO point of the line lies beyond $L$. Postulate 2 just manufactured one that does. Both cannot hold.' },
        { label: 'Convict the assumption', explanation: 'The impossibility is not in P2 (it is an axiom — it cannot be wrong); it is in our supposition. The supposition dies: no last point exists.' },
      ],
      result: 'A line has no last point — for extendability (P2) and a last point are exact contrapositives of each other: if both held, one licensed step would contradict the assumption directly.',
    },
    {
      kind: 'derivation',
      title: 'Shape 4 — proof by counterexample: two points do not always fix one plane',
      statement: 'Claim under trial: “every two points determine exactly one plane”. This is a UNIVERSAL claim — it quantifies over all pairs of points — and universals die by a single witness.',
      steps: [
        { label: 'Build the witness in 3-D space', formula: '(0,0,0),\\ (1,0,0),\\ (0,1,0),\\ (0,0,1)', explanation: 'Take four points: the origin and one step along each coordinate axis. The first three all sit in the plane $z = 0$.' },
        { label: 'Check the universal against the witness', formula: 'z = 1 \\neq 0', explanation: 'Any plane through the first three points is the plane $z = 0$ — and the fourth point has $z = 1$: it is NOT in that plane. Choose the plane through the first, second and fourth points instead, and now the third escapes. No single plane contains all four.' },
        { label: 'Read the verdict', explanation: 'The pair (first point, fourth point) determines no UNIQUE plane after all — several planes pass through both. One witness, one refutation. The universal claim is false, and no amount of further checking of friendly pairs can revive it.' },
      ],
      result: 'Four non-coplanar points refute “every two points determine exactly one plane” — a counterexample is a complete proof OF A REFUTATION.',
    },
    {
      kind: 'para',
      text: 'Notice the deep asymmetry between the last shape and the other three. To PROVE a universal (“for every pair of points…”), you must somehow cover ALL cases — that is why universal proofs need abstract arguments rather than lists of examples. But to REFUTE a universal, one case is enough — a single rectangle that is not a square kills “all quadrilaterals are squares” as thoroughly as a hundred would. The same asymmetry runs the other way for existential claims (“there exists a…”): one witness PROVES an existential, and only a full argument can refute one. Keep the pairing handy: universal — many needed to prove, one to refute; existential — one to prove, many (all) needed to refute.',
    },
    {
      kind: 'figure',
      caption: 'The four proof shapes as flow collages. Direct: hypothesis, chain, conclusion. Contrapositive: assume the conclusion fails, derive the hypothesis fails — same truth, easier terrain. Contradiction: assume the negation, hit an impossibility, convict the assumption. Counterexample: a universal claim meets one failing witness and dies. The counterexample panel is tinted orange: it refutes rather than proves.',
      svg: geo13Svg(900, 250, 'Four proof-shape flow collages: direct from hypothesis through chain to conclusion; contrapositive from not-Q to not-P; contradiction from assumed negation to impossible to conclusion; counterexample from universal claim to one failing witness to refuted.', [
        geo13Txt(450, 22, 'FOUR SHAPES — HOW AN ARGUMENT ATTACKS A CLAIM', 13, c103.ink, 'middle', '700'),
        // panel 1: direct
        geo13Rect(14, 44, 208, 178, c103.panel, c103.green),
        geo13Txt(118, 68, 'direct', 14, c103.ink, 'middle', '700'),
        geo13Rect(32, 82, 172, 34, c103.paper, c103.green, 6),
        geo13Txt(118, 104, 'assume P', 12.5, c103.tealInk),
        geo13Arrow(118, 120, 118, 132, c103.amber, 2),
        geo13Rect(32, 136, 172, 34, c103.paper, c103.green, 6),
        geo13Txt(118, 158, 'licensed chain', 12.5, c103.tealInk),
        geo13Arrow(118, 174, 118, 186, c103.amber, 2),
        geo13Txt(118, 206, 'conclusion Q', 12.5, c103.orange, 'middle', '700'),
        // panel 2: contrapositive
        geo13Rect(234, 44, 208, 178, c103.panel, c103.green),
        geo13Txt(338, 68, 'contrapositive', 14, c103.ink, 'middle', '700'),
        geo13Rect(252, 82, 172, 34, c103.paper, c103.green, 6),
        geo13Txt(338, 104, 'assume ¬Q', 12.5, c103.tealInk),
        geo13Arrow(338, 120, 338, 132, c103.amber, 2),
        geo13Rect(252, 136, 172, 34, c103.paper, c103.green, 6),
        geo13Txt(338, 158, 'argue forward', 12.5, c103.tealInk),
        geo13Arrow(338, 174, 338, 186, c103.amber, 2),
        geo13Txt(338, 206, 'derive ¬P', 12.5, c103.orange, 'middle', '700'),
        // panel 3: contradiction
        geo13Rect(454, 44, 208, 178, c103.panel, c103.green),
        geo13Txt(558, 68, 'contradiction', 14, c103.ink, 'middle', '700'),
        geo13Rect(472, 82, 172, 34, c103.paper, c103.green, 6),
        geo13Txt(558, 104, 'assume negation', 12.5, c103.tealInk),
        geo13Arrow(558, 120, 558, 132, c103.amber, 2),
        geo13Rect(472, 136, 172, 34, c103.paper, c103.green, 6),
        geo13Txt(558, 158, 'hit impossibility', 12.5, c103.tealInk),
        geo13Arrow(558, 174, 558, 186, c103.amber, 2),
        geo13Txt(558, 206, 'claim stands', 12.5, c103.orange, 'middle', '700'),
        // panel 4: counterexample (refuting)
        geo13Rect(674, 44, 212, 178, c103.panel2, c103.orange),
        geo13Txt(780, 68, 'counterexample', 14, c103.orange, 'middle', '700'),
        geo13Rect(692, 82, 176, 34, c103.paper, c103.orange, 6),
        geo13Txt(780, 104, 'universal claim', 12.5, c103.tealInk),
        geo13Arrow(780, 120, 780, 132, c103.amber, 2),
        geo13Rect(692, 136, 176, 34, c103.paper, c103.orange, 6),
        geo13Txt(780, 158, 'one witness fails', 12.5, c103.tealInk),
        geo13Arrow(780, 174, 780, 186, c103.amber, 2),
        geo13Txt(780, 206, 'claim REFUTED', 12.5, c103.red, 'middle', '700'),
      ]),
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Historical note — the honest reductio that nearly found a geometry',
      text: 'Proof by contradiction has a special place in geometry’s history. In 1733 Girolamo Saccheri published Euclides ab omni naevo vindicatus (“Euclid freed of every flaw”) and tried to settle the fifth postulate by reductio: assume the parallel postulate FALSE and derive an absurdity. Working honestly, he derived consequence after consequence — none absurd, all strange and beautiful. Two scientists, Lobachevsky (1829) and Bólyai (1832), later recognised those “absurdities” as theorems of a new, consistent geometry. The proof shape was sound; the assumption turned out to be impossible to convict. Lesson 1.2 told the chronology; now you can name the shape Saccheri was using.',
    },

    /* -------------------------------------------------------------- */
    /* 5. quantifiers                                                 */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Quantifiers: the order of ∀ and ∃ matters' },
    {
      kind: 'para',
      text: 'Conditionals have a grammar of their own, but most mathematical statements have one more layer: QUANTIFIERS — the little words that say HOW MANY objects a claim is about. The two great quantifiers are the universal $\\forall$ (“for all”, “for every”) and the existential $\\exists$ (“there exists”, “for some”). A third, $\\exists!$, packages the most important pair in geometry: “there exists EXACTLY ONE” — existence and uniqueness in a single symbol. Hilbert’s planar incidence axiom I.1 — two distinct points lie on at least one line, and on at most one line — is precisely an $\\exists!$ statement: there exists exactly one line through any two distinct points. The two halves (existence, uniqueness) are proved separately in the next lesson; here we learn to READ such statements, because reading them wrong is one of the most common exam errors in logic.',
    },
    {
      kind: 'para',
      text: 'The reading hazard is ORDER. The two statements “for every point, there exists a line containing it” ($\\forall$ point $\\exists$ line) and “there exists a line, containing every point” ($\\exists$ line $\\forall$ point) use the same words in the same colours — only the order of the quantifiers differs — and they could not be more different. In the first, the LINE is allowed to depend on the point: each point gets its own line, freshly chosen. In the second, ONE line must serve every point simultaneously. The first is a weak demand; the second is wildly strong. Any sentence with two different quantifiers is read greedily from left to right: whichever quantifier comes FIRST owns the choice, and later choices may depend on it.',
    },
    {
      kind: 'equation',
      latex: '\\forall\\, p\\ \\exists\\, \\ell:\\ p \\text{ on } \\ell \\;\\;\\;\\text{versus}\\;\\;\\;\\exists\\, \\ell\\ \\forall\\, p:\\ p \\text{ on } \\ell',
      note: 'the two quantifier orders: every point on some line of its own, versus one line hosting all points',
    },
    {
      kind: 'para',
      text: 'The cleanest way to feel the difference is to TEST both statements on a small model we can hold entirely in our heads — the four-point plane. Its points are $A$, $B$, $C$, $D$; its lines are the six pair-lines $AB$, $AC$, $AD$, $BC$, $BD$, $CD$ — every pair of points determines its own two-point line, exactly as the two-point axiom demands. The engine sweeps the whole model: every point lies on some line (in fact on three lines each — TRUE, so the $\\forall \\exists$ statement holds); no single line contains all four points (each line holds exactly two — FALSE, so the $\\exists \\forall$ statement fails); some line contains two points (TRUE); no line contains three or more (FALSE). Twelve point-line incidences in total, six lines, three parallel classes — every number here is counted by the engine before the prose may print it.',
    },
    {
      kind: 'figure',
      caption: 'Quantifier order on the four-point plane. Left panel: for EVERY point there EXISTS a line containing it — true; each point A, B, C, D gets its own line (in fact three). Right panel: there EXISTS a line containing EVERY point — false; the candidate line AB catches only two of the four points, and C, D escape it. Same words, different order, opposite verdicts.',
      svg: geo13Svg(900, 270, 'Quantifier order: left panel shows each of the four points with its own small line through it, labelled for-every-point-there-exists-a-line, true; right panel shows one line AB with points A and B on it and C and D escaping, labelled there-exists-a-line-containing-every-point, false.', [
        geo13Txt(450, 22, 'SAME WORDS, DIFFERENT ORDER — OPPOSITE VERDICTS', 13, c103.ink, 'middle', '700'),
        // left panel
        geo13Rect(14, 42, 430, 196, c103.panel, c103.green),
        geo13Txt(229, 66, 'for every point ∃ a line', 13.5, c103.ink, 'middle', '700'),
        geo13Line(70, 130, 150, 130, c103.green, 2.5),
        geo13Dot(90, 130, c103.ink), geo13Dot(130, 130, c103.ink),
        geo13Txt(90, 122, 'A', 12, c103.ink), geo13Txt(130, 122, 'B', 12, c103.ink),
        geo13Line(220, 110, 300, 110, c103.teal, 2.5),
        geo13Dot(240, 110, c103.ink), geo13Dot(280, 110, c103.ink),
        geo13Txt(240, 102, 'C', 12, c103.ink), geo13Txt(280, 102, 'D', 12, c103.ink),
        geo13Line(340, 170, 420, 170, c103.amber, 2.5),
        geo13Dot(360, 170, c103.ink), geo13Dot(400, 170, c103.ink),
        geo13Txt(395, 190, 'AB', 11.5, c103.tealInk),
        geo13Txt(229, 224, 'TRUE — each point gets its own line', 12, c103.green, 'middle', '700'),
        // right panel
        geo13Rect(456, 42, 430, 196, c103.panel2, c103.red),
        geo13Txt(671, 66, '∃ one line containing every point', 13.5, c103.red, 'middle', '700'),
        geo13Line(540, 150, 800, 150, c103.green, 2.5),
        geo13Dot(600, 150, c103.ink), geo13Dot(740, 150, c103.ink),
        geo13Txt(600, 142, 'A', 12, c103.ink), geo13Txt(740, 142, 'B', 12, c103.ink),
        geo13Dot(670, 90, c103.ink), geo13Txt(670, 80, 'C escapes', 11.5, c103.red),
        geo13Dot(670, 192, c103.ink), geo13Txt(670, 208, 'D escapes', 11.5, c103.red),
        geo13Txt(671, 228, 'FALSE — one line catches only two', 12, c103.red, 'middle', '700'),
      ]),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why models are the honest way to test quantifier statements',
      text: 'A small finite model settles quantifier questions with total certainty because nothing is hidden: every point and every line is present and countable. The four-point plane proves the pair of readings genuinely differ — one holds in the model, the other fails. It also previews next lesson’s method: to show a statement is NOT a consequence of axioms, build a model where the axioms hold and the statement fails. Test on models first; argue in general second.',
    },

    /* -------------------------------------------------------------- */
    /* 6. models, consistency, independence                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Models, consistency and independence' },
    {
      kind: 'para',
      text: 'The four-point plane is our first specimen of a MODEL: a system of objects (its points) and relations (which points lie on which lines) in which the axioms all hold. A model does not have to look like the geometry you know — no rulers, no circles, no compass needed — it only has to OBEY the rulebook. When we say the four-point plane satisfies “two distinct points lie on exactly one line”, we mean it as a checked fact: the engine counted, every pair of points lies on exactly one of the six pair-lines, no exceptions. That checking is what makes models so powerful: in a finite model, an axiom is not assumed — it is verified.',
    },
    {
      kind: 'para',
      text: 'Models earn their keep twice over. First: a model proves that a set of axioms is CONSISTENT — capable of being true simultaneously. If you exhibit one system where every axiom of the list holds at once, no contradiction can be derived from the list alone, because whatever you derive holds in the model, and the model exists. This is the modern answer to “how do we know the axioms do not secretly clash?”: we do not inspect the axioms, we BUILD a world where they all live together. Hilbert’s Grundlagen did exactly this for geometry in 1899 — arithmetic was made to supply a model of the full axiom list, and doubts about Euclidean consistency were reduced to doubts about arithmetic. Second: a model proves that a statement is NOT a consequence of the axioms — the statement is INDEPENDENT of them. Build a model where every axiom holds but the statement fails, and you have shown that no proof from those axioms can ever reach that statement: proofs preserve truth, the model makes the axioms true and the statement false, so no proof exists.',
    },
    {
      kind: 'para',
      text: 'Our little plane demonstrates the independence trick in miniature. Take the axiom “two distinct points lie on exactly one line” and the candidate theorem “every line contains at least three points”. In the four-point plane the axiom holds (the engine checked all six pairs) while the candidate fails (every line holds exactly two). Therefore “every line has at least three points” is not provable from that axiom — the model is a complete certificate of its independence. Scale the idea up and you have the twentieth century’s most famous independence results: the parallel postulate is independent of the other postulates — models exist (Lobachevsky’s, Bólyai’s, and the models of Beltrami and others) in which the rest of the geometry holds and the parallel postulate fails. Lesson 1.2 narrated that two-thousand-year story; you now own the machinery that settled it. The fifth postulate could never be proved from the others because worlds exist where the others hold and it does not.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Model, consistency, independence — the three-pack',
      text: 'A MODEL is a system of objects and relations obeying a given axiom list. An axiom list is CONSISTENT if some model satisfies all its axioms at once. A statement is INDEPENDENT of an axiom list if some model satisfies the list but falsifies the statement — which certifies that no proof of the statement from the list exists. One construction, three philosophical prizes.',
    },
    {
      kind: 'para',
      text: 'The four-point plane is one of a family of tiny models you can hold in your hand, and the next lesson tours them properly: the four-point affine plane (four points, six two-point lines, three parallel classes) and the Fano plane (seven points, seven three-point lines, every pair of lines meeting — a world with no parallel lines at all). Playing with them now, even briefly, builds the muscle the whole subject runs on: when a claim about points and lines is in doubt, ask “what would the four-point plane say?” — it answers instantly, and its answers have certified every number printed in this lesson.',
    },

    /* -------------------------------------------------------------- */
    /* 7. the Euclidean anatomy                                       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The anatomy of a Euclidean proof' },
    {
      kind: 'para',
      text: 'Open the Elements to any proposition in Book I and you will find the same four-part skeleton underneath the words. There is the STATEMENT (in Greek, protasis): what is claimed, the conditional in full — Proposition I.1 claims that on a given finite straight line an equilateral triangle can be constructed. There is the CONSTRUCTION (kataskeue): the building phase, where straightedge and compass produce the objects the argument will use — I.1 draws two circles, one about each endpoint of the given segment with radius the segment. There is the ARGUMENT (apodeixis): the reasoning phase, where common notions, postulates and earlier propositions grind out the conclusion — I.1 argues that the two circle-radii are all equal to the same segment, so by CN1 the three sides are equal. And there is the CONCLUSION (sumperasma): the re-statement of what was claimed, now earned, sealed with the two letters every geometry student knows: Q.E.D.',
    },
    {
      kind: 'para',
      text: 'Q.E.D. abbreviates quod erat demonstrandum — “which was to be demonstrated”. It is not a flourish; it is a checkpoint. When Euclid writes it, he is asserting that the thing demonstrated is EXACTLY the thing stated at the top — no stronger, no weaker. A proof that demonstrates something slightly different from its protasis has failed, politely, and Q.E.D. is the contract line that says the loop closed. The construction/argument split is likewise a discipline: everything CREATED in the construction phase must be licensed by a postulate (P1, P2 or P3 — the straightedge and compass permissions), and everything CLAIMED in the argument phase must be licensed by a common notion or an earlier proposition. If you audit any Book I proof against this checklist — every construction step cited, every argument step cited — the audit passes. That is what makes the Elements the first fully executable program in history: a program whose every instruction has a licence line.',
    },
    {
      kind: 'para',
      text: 'The four-part anatomy also explains where our four proof SHAPES live inside a Euclidean proof. The statement fixes the conditional $P \\Rightarrow Q$. The construction and argument together carry the direct chain — or, in contrapositive-flavoured propositions, the chain that assumes $\\neg Q$ and derives $\\neg P$. The reductio shape appears whenever the argument opens with a supposition (“if possible, let…”), as Euclid does in Proposition I.6 (if two base angles are unequal, then the opposite sides are unequal — proved by assuming equal sides and convicting the supposition). And the counterexample shape never appears inside the Elements at all — for the good reason that Euclid was proving things, not refuting them; counterexamples live in the critical tradition, from Saccheri’s 1733 reductio to the non-Euclidean models that finally freed the fifth postulate.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner — where this lesson is tested',
      text: 'Three targets recur on real papers. (1) Contrapositive-vs-converse traps: given a conditional, write the converse, inverse and contrapositive and state which are logically equivalent — the answer is always “the contrapositive only”; papers catch students who answer “converse” (JEE logic items and university bridge-course papers both run this). (2) Vacuous truth: a conditional with a false hypothesis is TRUE — the row (T, F) is the only falsifier; expect a true/false item on exactly this. (3) Proof-shape identification: a short argument is given and you must name its shape — direct, contrapositive, contradiction or counterexample. The tell is the opening move: “assume the hypothesis” is direct; “assume the conclusion fails” is contrapositive; “suppose, for contradiction” is contradiction; “consider the case where it fails” exhibiting one object is a counterexample. Exam-style items below drill all three.',
    },

    /* -------------------------------------------------------------- */
    /* 8. illustrations                                               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Illustrations' },
    {
      kind: 'example',
      title: 'Classify each statement: definition, axiom, conjecture, theorem, lemma or corollary — (a) “a radius of a circle is a segment from the centre to the circle”; (b) “things which coincide with one another are equal to one another”; (c) “every even number beyond 2 is a sum of two primes”; (d) “the base angles of an isosceles triangle are equal”; (e) “angles on one straight line sum to two right angles”, used on the way to the vertical-angles theorem; (f) “two distinct lines meet in at most one point”, read off the two-point uniqueness axiom.',
      steps: [
        'Sol. For each item, ask the one diagnostic question: who vouches for it?',
        '(a) This introduces a NAME for an object (“radius”) — a naming agreement, nothing to prove. Hence a definition.',
        '(b) This asserts a truth about equality assumed without proof; it names no special geometric object beyond the segments it compares. This is CN4 — hence an axiom (common notion).',
        '(c) Believed, numerically checked, but not proved — hence a conjecture.',
        '(d) Proved from the axioms (Elements I.5, the famous pons asinorum) — hence a theorem.',
        '(e) Proved (I.13), and its stated job is to feed I.15 — hence a lemma: fully proved, but scaffolding.',
        '(f) Follows in one step from “two points determine a unique line” — hence a corollary.',
        'Hence (a) definition, (b) axiom, (c) conjecture, (d) theorem, (e) lemma, (f) corollary — six statements, six vouchers.',
      ],
    },
    {
      kind: 'example',
      title: 'Exam-style: for the conditional “if two distinct lines meet, then they meet in exactly one point”, write the converse, the inverse and the contrapositive, and state which of the three are logically equivalent to the original.',
      steps: [
        'Sol. Set $P$ = “two distinct lines meet” and $Q$ = “they meet in exactly one point”. The original is $P \\Rightarrow Q$.',
        'Now, the converse swaps the parts: $Q \\Rightarrow P$ — “if two distinct lines meet in exactly one point, then they meet”. (True here — but not equivalent to the original; equivalence is row-by-row over ALL situations, not a fact about one.)',
        'The inverse negates both parts: $\\neg P \\Rightarrow \\neg Q$ — “if two distinct lines do not meet, then they do not meet in exactly one point”.',
        'The contrapositive swaps AND negates: $\\neg Q \\Rightarrow \\neg P$ — “if two distinct lines do not meet in exactly one point, then they do not meet”.',
        'Check: the contrapositive has the same truth-table column as the original (T F T T in both) — equivalent. The converse and inverse share the column T T F T — equivalent to each other, and to nothing else.',
        'Hence the contrapositive alone is equivalent to the original; the converse and inverse are not — in this model the converse happens to hold, which is exactly why equivalence must be judged on the truth table, not on one example.',
      ],
    },
    {
      kind: 'example',
      title: 'Walk-through: on the four-point plane (points $A$, $B$, $C$, $D$; lines the six pair-lines), decide the truth value of (i) “for every point there exists a line containing it”, (ii) “there exists a line containing every point”, (iii) “there exists a line containing at least two points”.',
      steps: [
        'Sol. Enumerate the model: lines $AB$, $AC$, $AD$, $BC$, $BD$, $CD$ — six two-point lines, three through each point.',
        '(i) For each point in turn, find a line: $A$ lies on $AB$, $B$ on $AB$, $C$ on $AC$, $D$ on $AD$. Every point is covered — TRUE.',
        '(ii) Try each of the six lines as the candidate “universal host”: $AB$ holds $A$, $B$ but not $C$, $D$; likewise every pair-line misses two points. No line contains all four — FALSE.',
        '(iii) The line $AB$ contains two points, so the existential is witnessed — TRUE.',
        'Note the order reading: in (i) the line may depend on the point; in (ii) one line must serve all points at once.',
        'Hence (i) TRUE, (ii) FALSE, (iii) TRUE — the engine sweeps all 12 point-line incidences to certify these verdicts.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 9. terms + formula cards                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'conditional statement', def: 'A statement of the form $P \\Rightarrow Q$ (“if $P$, then $Q$”): it promises that $P$ never holds while $Q$ fails. $P$ is the hypothesis; $Q$ is the conclusion.' },
        { term: 'definition', def: 'A naming agreement that assigns meaning to a word; nothing to prove — only more or less useful. Example: “a point is that which has no part”.' },
        { term: 'axiom / postulate', def: 'A statement assumed without proof. Euclid’s postulates are geometry-specific permissions; his common notions are general truths about equality. The modern word is axiom.' },
        { term: 'conjecture', def: 'A statement believed true on strong evidence but not yet proved; carries no deductive authority until a proof converts it into a theorem.' },
        { term: 'theorem', def: 'A statement proved from the axioms by licensed steps — the only family whose members may be used freely in later proofs.' },
        { term: 'lemma', def: 'A proved statement whose stated job is to serve as a stepping stone toward a larger theorem; fully proved, but labelled as scaffolding.' },
        { term: 'corollary', def: 'A statement that follows from a theorem in one short step; fully proved, with the parent theorem doing the work.' },
        { term: 'converse', def: 'The conditional $Q \\Rightarrow P$ formed by swapping hypothesis and conclusion; NOT equivalent to the original.' },
        { term: 'inverse', def: 'The conditional $\\neg P \\Rightarrow \\neg Q$ formed by negating both parts; NOT equivalent to the original (but equivalent to the converse).' },
        { term: 'contrapositive', def: 'The conditional $\\neg Q \\Rightarrow \\neg P$ formed by swapping AND negating; logically EQUIVALENT to the original — the workhorse move of Euclidean proof.' },
        { term: 'vacuous truth', def: 'The automatic truth of $P \\Rightarrow Q$ in the rows where $P$ is false: a promise is kept trivially when its condition never arises.' },
        { term: 'counterexample', def: 'A single object that falsifies a universal claim; exhibiting one is a complete proof that the universal is false.' },
        { term: 'model', def: 'A system of objects and relations in which a given axiom list holds. A model certifies the list’s consistency — and, if it falsifies a further statement, certifies that statement’s independence.' },
        { term: 'quantifier', def: 'A symbol fixing HOW MANY objects a claim ranges over: $\\forall$ (for all), $\\exists$ (there exists), $\\exists!$ (there exists exactly one). Order matters: $\\forall \\exists$ and $\\exists \\forall$ say different things.' },
      ],
    },
    {
      kind: 'formula',
      name: 'Counterexample law (negation of a universal)',
      latex: '\\neg(\\forall x:\\ S(x)) \\equiv \\exists x:\\ \\neg S(x)',
      note: 'to refute “for every x, S(x)” it suffices to exhibit ONE x with S(x) false',
    },
    {
      kind: 'formula',
      name: 'Existence and uniqueness (Hilbert I.1, planar)',
      latex: 'P \\neq Q \\ \\Rightarrow\\ \\exists!\\ \\ell:\\ P \\text{ on } \\ell,\\ Q \\text{ on } \\ell',
      note: 'two distinct points lie on exactly one line — the ∃! packs existence and uniqueness into one symbol',
    },
    {
      kind: 'formula',
      name: 'The vacuous rows',
      latex: 'P = \\text{false} \\ \\Rightarrow\\ (P \\Rightarrow Q) = \\text{true}',
      note: 'for both values of Q; only the row (T, F) falsifies a conditional',
    },

    /* -------------------------------------------------------------- */
    /* 10. quiz                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'In the truth table of $P \\Rightarrow Q$, exactly one row makes the conditional FALSE. Which row, and what is the full truth column in the order (T,T), (T,F), (F,T), (F,F)?',
          options: [
            'False at (F, F); column F T T F',
            'False at (T, F); column T F T T — P is true and Q is false',
            'False at (F, T); column T T F T',
            'False at (T, T); column F F T T',
          ],
          answer: 1,
          explain: 'The conditional fails only when its hypothesis holds and its conclusion does not — the row (T, F), giving the column T F T T. Option (a) is wrong: (F, F) is a vacuous row — the promise “P never holds without Q” is kept because P does not hold, so the verdict there is TRUE, not false. Option (c) is wrong: (F, T) is the counterexample row for the CONVERSE, not for the original — the original is vacuously true there. Option (d) is wrong: (T, T) is the clearest true row of all — hypothesis and conclusion both hold.',
        },
        {
          q: 'The contrapositive of “if a figure is a square, then it is a rectangle” is —',
          options: [
            '“If a figure is a rectangle, then it is a square”',
            '“If a figure is not a square, then it is not a rectangle”',
            '“If a figure is not a rectangle, then it is not a square”',
            '“A figure is a square only if it is a rectangle”',
          ],
          answer: 2,
          explain: 'Swap AND negate: conclusion “is a rectangle” becomes the negated hypothesis “is not a rectangle”; hypothesis “is a square” becomes the negated conclusion “is not a square”. Option (a) is the CONVERSE — swapped but not negated. Option (b) is the INVERSE — negated but not swapped. Option (d) merely restates the original conditional (“square only if rectangle” is “square ⇒ rectangle”), which is neither converse, inverse nor contrapositive.',
        },
        {
          q: 'To refute the universal claim “every two points determine exactly one plane”, the correct single move is —',
          options: [
            'A proof by contradiction that assumes the claim',
            'A direct proof of the claim for collinear points',
            'Checking many pairs of points numerically',
            'A counterexample — four non-coplanar points',
          ],
          answer: 3,
          explain: 'A universal claim (“every two points…”) is refuted by ONE failing witness: the four points (0,0,0), (1,0,0), (0,1,0), (0,0,1) fit no single plane. Option (a) is the wrong shape: contradiction proves claims, it does not refute them — assuming the claim true cannot exhibit a failure. Option (b) proves a special case, which leaves the universal untouched (a claim true for collinear points can still fail elsewhere). Option (c) confuses evidence with proof: however many friendly pairs you check, one escaping pair decides the universal — finite checking is never a refutation or a proof of a universal over infinite ground.',
        },
        {
          q: 'On the four-point plane (points $A$, $B$, $C$, $D$; lines the six pair-lines), the statement “there exists a line containing every point” is —',
          options: [
            'True — postulate P1 provides a line through any two points',
            'True — vacuously, since no line needs to contain four points',
            'False — no line contains all four points',
            'Undecidable — the model is too small to decide it',
          ],
          answer: 2,
          explain: 'The model is finite and fully checkable: the six pair-lines each contain exactly two points, so no candidate line hosts all four points — the existential statement fails, verdict FALSE. Option (a) answers a different question: P1 gives lines through PAIRS of points, and the statement demands ONE line for ALL points. Option (b) misuses vacuous truth — vacuity belongs to false hypotheses in conditionals, not to existentials, which die when no witness exists. Option (d) is wrong because a finite model is the easiest place on earth to decide a quantified statement: enumerate the six lines and check each — the engine did exactly that.',
        },
        {
          q: 'The two vacuous rows of the truth table are the rows where —',
          options: [
            'Q is false',
            'P is false',
            'P and Q are both true',
            'the conditional itself is false',
          ],
          answer: 1,
          explain: 'Vacuity is a property of the HYPOTHESIS: when $P$ is false, the promise “$P$ never holds without $Q$” is kept trivially, for both values of $Q$ — rows (F, T) and (F, F). Option (a) picks the wrong part: $Q$ false appears in the false row (T, F) but also in the vacuous row (F, F) — it does not define vacuity. Option (c) is the row where the conditional is true for the most direct reason possible — both parts hold; nothing vacuous there. Option (d) contradicts the term itself: the vacuous rows are TRUE rows, and the conditional is false in exactly one row — (T, F) — which is not vacuous.',
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. graded exercises (15, L1–L6, full steps solutions)          */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — statements, truth and the shapes of proof',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Write out the full truth column of $P \\Rightarrow Q$ in the row order (T,T), (T,F), (F,T), (F,F), circle the single row where it is false, and say in one sentence why the remaining rows all read TRUE.',
              solution: [
                'Sol. Apply the promise reading: $P \\Rightarrow Q$ fails exactly when $P$ holds and $Q$ does not.',
                'Row (T,T): hypothesis and conclusion both hold — TRUE.',
                'Row (T,F): hypothesis holds, conclusion fails — the promise is broken — FALSE.',
                'Row (F,T): hypothesis fails — vacuously TRUE.',
                'Row (F,F): hypothesis fails — vacuously TRUE.',
                'Hence the column reads T F T T: false only at (T, F), true elsewhere because a broken promise needs a true hypothesis — and the two vacuous rows have none.',
              ],
              answer: 'Column T F T T — false only at row (T, F)',
            },
            {
              q: 'Write the converse of “if a figure is a square, then it is a rectangle”, and give one concrete witness that refutes the converse.',
              solution: [
                'Sol. Set $P$ = “the figure is a square”, $Q$ = “the figure is a rectangle”. The original is $P \\Rightarrow Q$.',
                'Now, the converse swaps the parts: $Q \\Rightarrow P$ — “if a figure is a rectangle, then it is a square”.',
                'Check the converse against a witness: take a rectangle of sides 2 and 3 — four right angles, adjacent sides unequal.',
                'So, the witness is a rectangle but not a square — the converse fails for it.',
                'Hence the converse is “if a figure is a rectangle, then it is a square”, refuted by any non-square rectangle — a 2 by 3 rectangle suffices.',
              ],
              answer: 'Converse: “if a figure is a rectangle, then it is a square” — refuted by a 2 by 3 rectangle',
            },
            {
              q: 'Classify Euclid’s Common Notion 1 — “things equal to the same thing are equal to one another” — as definition, axiom, conjecture, theorem, lemma or corollary, and justify the label in two sentences.',
              solution: [
                'Sol. Apply the diagnostic: who vouches for the statement?',
                'It is ASSUMED, not proved: Euclid places it among the five common notions, before the first proposition.',
                'It names no geometric object — no point, line, circle or angle — only equality of things; so it is a general truth, not a postulate.',
                'Hence CN1 is an axiom (a common notion): assumed without proof, because the proof machine needs it before it can manufacture anything.',
              ],
              answer: 'A common notion — an axiom of general equality, assumed before any proposition',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'For the conditional “if two distinct lines meet, then they meet in exactly one point”, write the inverse and the contrapositive, and state which of the two is equivalent to the original.',
              solution: [
                'Sol. Set $P$ = “two distinct lines meet” and $Q$ = “they meet in exactly one point”.',
                'The inverse negates both parts without swapping: $\\neg P \\Rightarrow \\neg Q$ — “if two distinct lines do not meet, then they do not meet in exactly one point”.',
                'The contrapositive swaps AND negates: $\\neg Q \\Rightarrow \\neg P$ — “if two distinct lines do not meet in exactly one point, then they do not meet”.',
                'Compare truth columns: the contrapositive shares the column of the original (identical in all four rows); the inverse shares the column of the converse, which differs from the original in the rows (T,F) and (F,T).',
                'Hence the contrapositive is equivalent to the original; the inverse is not.',
              ],
              answer: 'The contrapositive — “no unique meeting point ⇒ no meeting” — is equivalent to the original',
            },
            {
              q: 'Explain, using the truth table, why the statement “if the moon is made of green cheese, then $2 + 2 = 5$” is TRUE. Which row does it live in?',
              solution: [
                'Sol. Identify the parts: $P$ = “the moon is made of green cheese” (FALSE in every model we can check), $Q$ = “$2 + 2 = 5$” (also false).',
                'The row is (F, F): hypothesis false, conclusion false.',
                'The conditional promises only that $P$ never holds while $Q$ fails — and $P$ never holds at all, so the promise cannot be broken.',
                'That is exactly what a vacuous row is: the conditional is TRUE, not because the conclusion is true, but because the hypothesis never arises.',
                'Hence the statement is TRUE — a vacuous row (P is false); the moral is that only the row (T, F) can falsify a conditional.',
              ],
              answer: 'TRUE — a vacuous row (P false, Q false); only (T, F) falsifies a conditional',
              figures: [
                {
                  caption: 'The vacuous-row picture: rows (F, T) and (F, F) are TRUE because the hypothesis P never holds; the only FALSE cell is (T, F).',
                  svg: geo13Svg(420, 232, 'Truth table grid with four rows; the two rows with P false are highlighted amber and marked vacuous true; the row T F is marked red as the only false row.', [
                    geo13Txt(210, 26, 'THE FOUR ROWS — ONE FALSIFIER, TWO VACUOUS', 13, c103.ink, 'middle', '700'),
                    geo13Rect(74, 46, 80, 32, c103.panel, c103.green, 4),
                    geo13Rect(154, 46, 80, 32, c103.panel, c103.green, 4),
                    geo13Rect(234, 46, 110, 32, c103.panel, c103.green, 4),
                    geo13Txt(114, 68, 'P', 12.5, c103.ink, 'middle', '700'),
                    geo13Txt(194, 68, 'Q', 12.5, c103.ink, 'middle', '700'),
                    geo13Txt(289, 68, 'P ⇒ Q', 12.5, c103.ink, 'middle', '700'),
                    geo13Rect(74, 78, 80, 32, c103.paper, c103.green, 4),
                    geo13Rect(154, 78, 80, 32, c103.paper, c103.green, 4),
                    geo13Rect(234, 78, 110, 32, c103.paper, c103.green, 4),
                    geo13Txt(114, 100, 'T', 12.5, c103.tealInk), geo13Txt(194, 100, 'T', 12.5, c103.tealInk),
                    geo13Txt(289, 100, 'T', 12.5, c103.green, 'middle', '700'),
                    geo13Rect(74, 110, 80, 32, c103.paper, c103.red, 4),
                    geo13Rect(154, 110, 80, 32, c103.paper, c103.red, 4),
                    geo13Rect(234, 110, 110, 32, c103.paper, c103.red, 4),
                    geo13Txt(114, 132, 'T', 12.5, c103.tealInk), geo13Txt(194, 132, 'F', 12.5, c103.tealInk),
                    geo13Txt(289, 132, 'F', 12.5, c103.red, 'middle', '700'),
                    geo13Rect(74, 142, 80, 32, c103.panel2, c103.orange, 4),
                    geo13Rect(154, 142, 80, 32, c103.panel2, c103.orange, 4),
                    geo13Rect(234, 142, 110, 32, c103.panel2, c103.orange, 4),
                    geo13Txt(114, 164, 'F', 12.5, c103.tealInk), geo13Txt(194, 164, 'T', 12.5, c103.tealInk),
                    geo13Txt(289, 164, 'T', 12.5, c103.orange, 'middle', '700'),
                    geo13Rect(74, 174, 80, 32, c103.panel2, c103.orange, 4),
                    geo13Rect(154, 174, 80, 32, c103.panel2, c103.orange, 4),
                    geo13Rect(234, 174, 110, 32, c103.panel2, c103.orange, 4),
                    geo13Txt(114, 196, 'F', 12.5, c103.tealInk), geo13Txt(194, 196, 'F', 12.5, c103.tealInk),
                    geo13Txt(289, 196, 'T', 12.5, c103.orange, 'middle', '700'),
                    geo13Txt(360, 128, 'vacuous', 12, c103.orange, 'middle', '700'),
                    geo13Txt(360, 158, 'vacuous', 12, c103.orange, 'middle', '700'),
                    geo13Txt(44, 128, '(T,F)', 11.5, c103.red, 'end', '700'),
                  ]),
                },
              ],
            },
            {
              q: 'Rewrite in plain words the two statements “for every point there exists a line containing it” and “there exists a line containing every point”, and say which of them the four-point plane satisfies.',
              solution: [
                'Sol. Order first: in “for every point… there exists a line”, the ∀ comes first, so each point may pick its OWN line.',
                'Plain words (i): every single point lies on at least one line — the line may differ from point to point.',
                'Plain words (ii): one single line hosts the entire set of points simultaneously — no per-point choice allowed.',
                'Test on the four-point plane: every point lies on three of the six pair-lines — (i) holds; every pair-line misses two of the four points — (ii) fails.',
                'Hence (i) is TRUE and (ii) is FALSE in the model: the quantifier order, not the words, decides the verdict.',
              ],
              answer: '(i) TRUE in the four-point plane; (ii) FALSE — order ∀∃ holds, order ∃∀ fails',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'In the four-point plane (points $A$, $B$, $C$, $D$; lines the six pair-lines), count: the lines, the lines through any one point, and the point-line incidences. Verify the two-point uniqueness axiom for the pair $A$, $B$.',
              solution: [
                'Sol. Enumerate the lines: $AB$, $AC$, $AD$, $BC$, $BD$, $CD$ — one per pair, and there are $\\binom{4}{2} = 6$ pairs.',
                'Through the point $A$: the lines $AB$, $AC$, $AD$ — exactly 3; the same count holds at $B$, $C$, $D$ by symmetry.',
                'Incidences: 6 lines with 2 points each give $6 \\times 2 = 12$ point-line memberships.',
                'Uniqueness for $A$, $B$: the lines containing both must contain the pair {A, B}; only $AB$ does — exactly one line.',
                'Hence 6 lines, 3 through each point, 12 incidences — and the pair $A$, $B$ lies on exactly 1 line, as the axiom demands.',
              ],
              answer: '6 lines; 3 through each point; 12 incidences; the pair A, B lies on exactly 1 line',
              figures: [
                {
                  caption: 'The four-point plane: four points, six pair-lines (a complete four-point web); 3 lines through each point and no line holding more than 2 points.',
                  svg: geo13Svg(360, 262, 'The four-point plane: points A, B, C, D at the corners of a rectangle with all six connecting pair-lines drawn; labels note three lines through each point and no line containing all four points.', [
                    geo13Txt(180, 24, 'THE FOUR-POINT PLANE — 6 PAIR-LINES', 13, c103.ink, 'middle', '700'),
                    geo13Line(100, 90, 260, 90, c103.green, 2.2),
                    geo13Line(100, 210, 260, 210, c103.green, 2.2),
                    geo13Line(100, 90, 100, 210, c103.teal, 2.2),
                    geo13Line(260, 90, 260, 210, c103.teal, 2.2),
                    geo13Line(100, 90, 260, 210, c103.amber, 2.2),
                    geo13Line(100, 210, 260, 90, c103.amber, 2.2),
                    geo13Dot(100, 90, c103.ink, 4.5), geo13Dot(260, 90, c103.ink, 4.5),
                    geo13Dot(100, 210, c103.ink, 4.5), geo13Dot(260, 210, c103.ink, 4.5),
                    geo13Txt(100, 78, 'A', 12.5, c103.ink), geo13Txt(260, 78, 'B', 12.5, c103.ink),
                    geo13Txt(100, 228, 'C', 12.5, c103.ink), geo13Txt(260, 228, 'D', 12.5, c103.ink),
                    geo13Txt(180, 66, 'AB and CD', 11.5, c103.tealInk),
                    geo13Txt(180, 250, '3 lines through each point — none holds all 4', 12, c103.green, 'middle', '700'),
                  ]),
                },
              ],
            },
            {
              q: 'Refute the conditional “if a number is divisible by 6, then it is divisible by 12” and identify the truth-table row the refuting witness occupies.',
              solution: [
                'Sol. The claim is a conditional over numbers: $P$ = “divisible by 6”, $Q$ = “divisible by 12”.',
                'Hunt for a witness where $P$ holds and $Q$ fails — that is the only row that falsifies a conditional.',
                'Check 6 itself: $6 = 6 \\times 1$ so $P$ holds; $6 = 12 \\times 0.5$ is not an integer multiple, so $Q$ fails.',
                'The witness 6 occupies the row (T, F) — hypothesis true, conclusion false.',
                'Hence the conditional is false, refuted by the single witness 6 — and note its contrapositive fails at the same row, as it must.',
              ],
              answer: 'Refuted by 6 — divisible by 6, not by 12; the witness lives in row (T, F)',
            },
            {
              q: 'Which postulate forbids a straight line from having a last point? Name the proof shape that converts the postulate into the result, and sketch the three moves of the argument.',
              solution: [
                'Sol. The engine of the result is Postulate 2: any finite straight line may be extended continuously — no endpoint is a wall.',
                'Shape: proof by contradiction (reductio) — assume the negation of “no last point”, namely that a last point $L$ exists.',
                'Move one: suppose $L$ is last — nothing on the line lies beyond it.',
                'Move two: apply P2 at $L$: the line extends beyond $L$, manufacturing a point $M$ beyond it.',
                'Move three: the supposition and the postulate now clash — convict the supposition; there is no last point.',
                'Hence P2 forbids a last point, by contradiction — the two statements are exact contrapositives of each other.',
              ],
              answer: 'Postulate 2; proof by contradiction — assume a last point, extend beyond it, convict the assumption',
              figures: [
                {
                  caption: 'The no-last-point clash: if 9 were the last point, P2 extends the line beyond it anyway — the supposition cannot survive.',
                  svg: geo13Svg(520, 150, 'Number line with dots 0 to 9; the dot 9 is flagged as a would-be last point in red and an arrow extends beyond it labelled P2 extends, showing the contradiction.', [
                    geo13Line(30, 84, 490, 84, c103.green, 2.5),
                    geo13Dot(40, 84, c103.ink, 4), geo13Dot(85, 84, c103.ink, 4), geo13Dot(130, 84, c103.ink, 4),
                    geo13Dot(175, 84, c103.ink, 4), geo13Dot(220, 84, c103.ink, 4), geo13Dot(265, 84, c103.ink, 4),
                    geo13Dot(310, 84, c103.ink, 4), geo13Dot(355, 84, c103.ink, 4), geo13Dot(400, 84, c103.ink, 4),
                    geo13Dot(445, 84, c103.red, 5.5),
                    geo13Txt(40, 104, '0', 11.5, c103.tealInk), geo13Txt(130, 104, '2', 11.5, c103.tealInk),
                    geo13Txt(220, 104, '4', 11.5, c103.tealInk), geo13Txt(310, 104, '6', 11.5, c103.tealInk),
                    geo13Txt(400, 104, '8', 11.5, c103.tealInk), geo13Txt(445, 110, '9', 11.5, c103.red, 'middle', '700'),
                    geo13Txt(445, 60, 'last point?', 12, c103.red, 'middle', '700'),
                    geo13Arrow(452, 84, 498, 84, c103.orange, 2.5),
                    geo13Txt(420, 132, 'P2 extends beyond anyway', 12, c103.orange, 'middle', '700'),
                    geo13Txt(260, 40, 'a chain stalls — an unbounded line never does', 12, c103.tealInk, 'middle', '700'),
                  ]),
                },
              ],
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Prove the contrapositive of Common Notion 4 — “if two segments are not equal in length, they cannot coincide exactly” — using CN5 (the whole is greater than the part). Which proof shape is this, and why is it legitimate to call it a proof of CN4’s contrapositive rather than of CN4 itself?',
              solution: [
                'Sol. Target: $\\neg Q \\Rightarrow \\neg P$ where $P$ = “the segments coincide exactly”, $Q$ = “they are equal in length”.',
                'Assume $\\neg Q$: the segments have different lengths — take length 4 and length 3 as the witness.',
                'Suppose, for argument, they DID coincide when applied: point would lie on point, end on end.',
                'Then CN4 would entitle us to call them equal — but CN5 forbids the length-4 whole from equalling its length-3 part; the supposition is impossible.',
                'So $\\neg Q$ forces $\\neg P$: unequal in length, they cannot coincide — the contrapositive, proved.',
                'Hence this is a contrapositive proof: legitimate because $P \\Rightarrow Q$ and $\\neg Q \\Rightarrow \\neg P$ share one truth column (T F T T) — proving either is proving both; we proved the easier member of the equivalence class.',
              ],
              answer: 'Contrapositive proved — unequal segments (4 and 3) cannot coincide; same column as CN4, so CN4 stands with it',
            },
            {
              q: 'In how many rows of the truth table is the biconditional $P \\Leftrightarrow Q$ true? Name the rows and explain the connection to the two rows where $P$ and $Q$ “agree”.',
              solution: [
                'Sol. Unpack: $P \\Leftrightarrow Q$ means $(P \\Rightarrow Q)$ and $(Q \\Rightarrow P)$ hold simultaneously.',
                'Row (T,T): both one-way conditionals true — biconditional true.',
                'Row (T,F): $P \\Rightarrow Q$ false — biconditional false.',
                'Row (F,T): $Q \\Rightarrow P$ false — biconditional false.',
                'Row (F,F): both conditionals vacuously true — biconditional true.',
                'Hence exactly 2 rows make it true — (T, T) and (F, F) — precisely the rows where $P$ and $Q$ agree; the biconditional is the “same verdict” detector.',
              ],
              answer: 'Exactly 2 rows — (T, T) and (F, F), the rows where P and Q agree',
            },
            {
              q: 'Identify the proof shape of each argument: (i) “Assume the conclusion fails; we show the hypothesis fails too.” (ii) “Suppose, for contradiction, that a last point exists; P2 then extends beyond it — impossible.” (iii) “The claim holds for every pair of points; but the four points (0,0,0), (1,0,0), (0,1,0), (0,0,1) fit no single plane.” (iv) “From $AB = EF$ and $CD = EF$, CN1 gives $AB = CD$.”',
              solution: [
                'Sol. The tell is the opening move of each argument.',
                '(i) Opens by assuming the conclusion fails to derive the hypothesis fails — contrapositive.',
                '(ii) Opens by supposing the negation and convicting it on an impossibility — contradiction (reductio).',
                '(iii) Exhibits one failing witness against a universal — counterexample.',
                '(iv) Chains hypothesis directly to conclusion through a common notion — direct.',
                'Hence (i) contrapositive, (ii) contradiction, (iii) counterexample, (iv) direct — one line each, four shapes.',
              ],
              answer: '(i) contrapositive (ii) contradiction (iii) counterexample (iv) direct',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'The four-point plane satisfies “two distinct points lie on exactly one line” but falsifies “every line contains at least three points”. State precisely what this pair of facts proves, and name the principle it illustrates in the large (the one that settled the status of Euclid’s fifth postulate).',
              solution: [
                'Sol. Sort the three ingredients: an axiom (two-point uniqueness), a candidate theorem (every line has at least 3 points), and a model (the four-point plane).',
                'In the model the axiom holds — the engine checked all six point-pairs, each on exactly one pair-line.',
                'In the model the candidate fails — every pair-line holds exactly 2 points, so “at least 3” is false at all six lines.',
                'Now, any proof of the candidate FROM the axiom would carry the axiom’s truth to the candidate’s truth in every model; here the axiom is true and the candidate false.',
                'Hence the candidate is NOT a consequence of the axiom — it is independent of it; the model is a certificate of independence.',
                'This is exactly the principle that settled the fifth postulate: non-Euclidean models satisfy the other postulates and falsify P5, so P5 can never be proved from the others — at small scale here, at two-thousand-years-of-history scale there.',
              ],
              answer: '“Every line has at least 3 points” is independent of the two-point uniqueness axiom — the model pattern that settled the fifth postulate',
            },
            {
              q: 'Euclid’s Proposition I.1 (constructing an equilateral triangle on a given segment) exhibits the four-part anatomy of a Euclidean proof. Name the four parts, say what each contributes, and expand the abbreviation that closes the conclusion.',
              solution: [
                'Sol. Part one, the STATEMENT (protasis): the conditional claimed — on a given finite straight line, an equilateral triangle can be constructed.',
                'Part two, the CONSTRUCTION (kataskeue): the licensed building — P3 draws the two circles centred at the segment’s endpoints with radius the segment.',
                'Part three, the ARGUMENT (apodeixis): the reasoning — both radii equal the same segment, so CN1 makes all three sides equal.',
                'Part four, the CONCLUSION (sumperasma): the earned claim, restated exactly as promised.',
                'The closing abbreviation is Q.E.D. — quod erat demonstrandum, “which was to be demonstrated”: the checkpoint that what was proved is exactly what was stated.',
                'Hence statement, construction, argument, conclusion — with every construction step licensed by a postulate and every argument step by a common notion or earlier proposition.',
              ],
              answer: 'Statement, construction, argument, conclusion; Q.E.D. = quod erat demonstrandum',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'The de Bruijn–Erdős theorem (1948) states: any $n$ points, not all on one line, determine at least $n$ distinct lines. Verify the bound on the four-point plane ($n = 4$), explain why the model is NOT the extremal example, and exhibit (by description) the configuration that attains the bound exactly.',
              solution: [
                'Sol. Count in the model: $n = 4$ points, none three of which are collinear (every line holds 2 points), and the lines number 6.',
                'Compare: $6 \\geq 4$ — the bound holds with room to spare.',
                'Not extremal: the model has 6 lines where 4 would do — its generality (every pair its own line) is a luxury, not a minimum.',
                'Describe the extremal configuration for $n = 4$: put 3 of the points on one line and the 4th point off it. Lines: the big line through the three collinear points, plus one line joining the off point to each of the three — 1 plus 3 = 4 lines total.',
                'Check: $4 = n$, so the bound is attained exactly — the “n minus 1 collinear plus 1 off” configuration is the de Bruijn–Erdős extremal example.',
                'Hence the four-point plane verifies $6 \\geq 4$ with slack, and the near-pencil configuration attains the bound: at least $n$ lines, with equality achievable.',
              ],
              answer: '6 lines ≥ 4 (bound satisfied with slack); the 3-collinear-plus-1-off configuration attains exactly 4',
            },
          ],
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 12. closing                                                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'What you now own' },
    {
      kind: 'para',
      text: 'Three lessons in, the machinery is complete enough to state what the axiomatic method actually IS. Lesson 1.1 gave the cast (points, lines, planes — defined on undefined foundations). Lesson 1.2 gave the rules (five postulates, five common notions). This lesson gave the contract: statements have statuses (defined, assumed, conjectured, proved); conditionals have a grammar (truth table, vacuous rows, converse trap, contrapositive equivalence); proofs have shapes (direct, contrapositive, contradiction, counterexample); and models decide what can and cannot be proved (consistency and independence, certified by construction). Every one of those claims was engine-checked against the four-point plane — six lines, three through each point, twelve incidences — the smallest world in which the ideas live outside your head.',
    },
    {
      kind: 'para',
      text: 'The next lesson puts the machinery to work on the oldest theorems in the book: the three planar incidence axioms (two points on one line; a line has at least two points; three non-collinear points on one plane), the four-point plane and the Fano plane as worked models, and the de Bruijn–Erdős bound as the first real theorem those models can test. When you meet them, audit them the way this lesson taught: who vouches for each statement, which shape carries each proof, and what the smallest model says. That habit — provenance, shape, model — is the working mathematician’s three-question checklist, and from here on it applies to everything you read.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Note — the three-question audit, portable to any subject',
      text: 'Provenance: who vouches for this statement — definition, axiom, conjecture, theorem? Shape: which of the four proof forms carries the argument, and what does its opening move assume? Model: what does the smallest concrete instance say — does the four-point plane hold the statement, or break it? The same three questions audit a physics derivation, a competitive-exam solution and a contract clause. Euclid’s discipline scales.',
    },

  ],
}

/* ================================================================== */
/* GEO 1.4 — Incidence: how Points, Lines and Planes Interlock          */
/* Every number printed in this lesson is recomputed and pinned by     */
/* temporary-references/v-geo104.ts (engine wins over any other source).*/
/* Figure helpers: all geometry is computed from the named constants   */
/* below; SVG text stays PLAIN (no TeX, no $; minus would be U+2212).  */
/* ================================================================== */

/* palette (vivid set; never blue/indigo) */
const c104 = {
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
  mist: '#a8a29e', // de-emphasised strokes
  white: '#ffffff',
  paper: '#fffdf5',
}
const f104 = 'ui-sans-serif, system-ui, sans-serif'

function geo14Txt(x: number, y: number, s: string, size: number, color: string, anchor = 'middle', weight = '400'): string {
  return `<text x="${x}" y="${y}" font-family="${f104}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
}
function geo14Box(x: number, y: number, w: number, h: number, fill: string, stroke: string, sw = 1.6): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`
}
function geo14Dot(x: number, y: number, r: number, fill: string): string {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${c104.white}" stroke-width="1.3"/>`
}
function geo14Seg(x1: number, y1: number, x2: number, y2: number, color: string, sw = 2, dash = ''): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}
type P14 = { x: number; y: number }
function geo14Mid(p: P14, q: P14): P14 {
  return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 }
}
/** circumcentre of three points (used for the Fano circle) */
function geo14Circumcentre(p: P14, q: P14, r: P14): P14 {
  const d = 2 * (p.x * (q.y - r.y) + q.x * (r.y - p.y) + r.x * (p.y - q.y))
  const ux = ((p.x * p.x + p.y * p.y) * (q.y - r.y) + (q.x * q.x + q.y * q.y) * (r.y - p.y) + (r.x * r.x + r.y * r.y) * (p.y - q.y)) / d
  const uy = ((p.x * p.x + p.y * p.y) * (r.x - q.x) + (q.x * q.x + q.y * q.y) * (p.x - r.x) + (r.x * r.x + r.y * r.y) * (q.x - p.x)) / d
  return { x: ux, y: uy }
}

/* (F1) the four-point affine plane: a drawn parallelogram, the six lines
   colour-coded by parallel class {AB,CD}, {AC,BD}, {AD,BC} */
function geo14FourPointSvg(): string {
  const W = 780, H = 400
  const A: P14 = { x: 170, y: 100 }, B: P14 = { x: 570, y: 100 }, Cc: P14 = { x: 640, y: 300 }, D: P14 = { x: 240, y: 300 }
  const ext = (p: P14, q: P14, t = 0.16) => ({
    x1: p.x + (p.x - q.x) * t, y1: p.y + (p.y - q.y) * t,
    x2: q.x + (q.x - p.x) * t, y2: q.y + (q.y - p.y) * t,
  })
  const eAB = ext(A, B), eCD = ext(Cc, D), eAC = ext(A, Cc), eBD = ext(B, D), eAD = ext(A, D), eBC = ext(B, Cc)
  const cross = geo14Mid(A, Cc) // parallelogram centre = diagonal crossing of the drawing
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The four-point affine plane drawn as a parallelogram: four points A, B, C, D with the six lines through pairs, colour-coded by parallel class. Class A B with C D in green, class A C with B D in orange, class A D with B C in teal. The diagonals cross at a point of the drawing that is not a point of the model.">`,
    geo14Txt(390, 34, 'the four-point affine plane: 4 points, 6 lines, 3 parallel classes', 12.5, c104.ink, 'middle', '600'),
    // class {AB, CD} — green
    geo14Seg(eAB.x1, eAB.y1, eAB.x2, eAB.y2, c104.struct, 3),
    geo14Seg(eCD.x1, eCD.y1, eCD.x2, eCD.y2, c104.struct, 3),
    // class {AD, BC} — teal
    geo14Seg(eAD.x1, eAD.y1, eAD.x2, eAD.y2, c104.teal, 3),
    geo14Seg(eBC.x1, eBC.y1, eBC.x2, eBC.y2, c104.teal, 3),
    // class {AC, BD} — orange (the diagonals)
    geo14Seg(eAC.x1, eAC.y1, eAC.x2, eAC.y2, c104.accent, 3),
    geo14Seg(eBD.x1, eBD.y1, eBD.x2, eBD.y2, c104.accent, 3),
    // the crossing of the drawing: open dashed circle, NOT a model point
    `<circle cx="${cross.x}" cy="${cross.y}" r="6" fill="none" stroke="${c104.mist}" stroke-width="1.5" stroke-dasharray="3 2"/>`,
    geo14Txt(cross.x, 252, 'not a model point', 10, c104.tealInk),
    // line-name labels
    geo14Txt(370, 86, 'AB', 11, c104.ink, 'middle', '600'),
    geo14Txt(440, 326, 'CD', 11, c104.ink, 'middle', '600'),
    geo14Txt(180, 200, 'AD', 11, c104.ink, 'end', '600'),
    geo14Txt(632, 200, 'BC', 11, c104.ink, 'start', '600'),
    geo14Txt(302, 154, 'AC', 11, c104.ink, 'end', '600'),
    geo14Txt(486, 154, 'BD', 11, c104.ink, 'start', '600'),
    // the points
    geo14Dot(A.x, A.y, 7, c104.ink), geo14Dot(B.x, B.y, 7, c104.ink), geo14Dot(Cc.x, Cc.y, 7, c104.ink), geo14Dot(D.x, D.y, 7, c104.ink),
    geo14Txt(190, 84, 'A', 13, c104.ink, 'middle', '700'),
    geo14Txt(592, 86, 'B', 13, c104.ink, 'middle', '700'),
    geo14Txt(660, 320, 'C', 13, c104.ink, 'middle', '700'),
    geo14Txt(222, 320, 'D', 13, c104.ink, 'middle', '700'),
    // legend
    geo14Seg(80, 356, 106, 356, c104.struct, 4),
    geo14Txt(114, 360, 'class {AB, CD} - top and bottom', 10.5, c104.ink, 'start'),
    geo14Seg(330, 356, 356, 356, c104.accent, 4),
    geo14Txt(364, 360, 'class {AC, BD} - the diagonals', 10.5, c104.ink, 'start'),
    geo14Seg(560, 356, 586, 356, c104.teal, 4),
    geo14Txt(594, 360, 'class {AD, BC} - slanted sides', 10.5, c104.ink, 'start'),
    geo14Txt(390, 388, 'the diagonals cross at a point of the drawing that is not a point of the model', 10, c104.tealInk),
    `</svg>`,
  ].join('')
}

/* (F2) the Fano plane: triangle ABC, midpoints D (on BC), E (on AC), F (on AB),
   centre G; six segments (3 sides + 3 medians) plus the circle through D, E, F */
function geo14FanoSvg(): string {
  const W = 780, H = 430
  const A: P14 = { x: 360, y: 52 }, B: P14 = { x: 118, y: 362 }, Cc: P14 = { x: 602, y: 362 }
  const F = geo14Mid(A, B) // midpoint of AB
  const D = geo14Mid(B, Cc) // midpoint of BC
  const E = geo14Mid(A, Cc) // midpoint of AC
  const G = { x: (A.x + B.x + Cc.x) / 3, y: (A.y + B.y + Cc.y) / 3 } // centroid: on all three medians
  const circ = geo14Circumcentre(D, E, F)
  const r = Math.hypot(D.x - circ.x, D.y - circ.y)
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The Fano plane: a triangle with vertices A, B, C; D, E, F the midpoints of the sides; G the centre. Three sides, three medians and one circle through D, E, F give seven lines; every line carries three of the seven points.">`,
    geo14Txt(390, 26, 'the Fano plane: 7 points, 7 lines, 3 points on every line, 3 lines through every point', 12, c104.ink, 'middle', '600'),
    // sides (green): ABF, BCD, ACE
    geo14Seg(A.x, A.y, B.x, B.y, c104.struct, 2.6),
    geo14Seg(B.x, B.y, Cc.x, Cc.y, c104.struct, 2.6),
    geo14Seg(A.x, A.y, Cc.x, Cc.y, c104.struct, 2.6),
    // medians (orange): ADG, BEG, CFG
    geo14Seg(A.x, A.y, D.x, D.y, c104.accent, 2.6),
    geo14Seg(B.x, B.y, E.x, E.y, c104.accent, 2.6),
    geo14Seg(Cc.x, Cc.y, F.x, F.y, c104.accent, 2.6),
    // the circle (teal): DEF
    `<circle cx="${circ.x.toFixed(1)}" cy="${circ.y.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="${c104.teal}" stroke-width="2.6"/>`,
    // line-name labels
    geo14Txt(186, 168, 'ABF', 10, c104.struct, 'end', '600'),
    geo14Txt(452, 350, 'BCD', 10, c104.struct, 'middle', '600'),
    geo14Txt(534, 168, 'ACE', 10, c104.struct, 'start', '600'),
    geo14Txt(372, 140, 'ADG', 10, c104.accent, 'start', '600'),
    geo14Txt(252, 320, 'BEG', 10, c104.accent, 'end', '600'),
    geo14Txt(470, 316, 'CFG', 10, c104.accent, 'start', '600'),
    geo14Txt(486, 294, 'circle DEF', 10, c104.teal, 'start', '600'),
    // the seven points
    geo14Dot(A.x, A.y, 7, c104.ink), geo14Dot(B.x, B.y, 7, c104.ink), geo14Dot(Cc.x, Cc.y, 7, c104.ink),
    geo14Dot(D.x, D.y, 6.5, c104.accent), geo14Dot(E.x, E.y, 6.5, c104.accent), geo14Dot(F.x, F.y, 6.5, c104.accent),
    geo14Dot(G.x, G.y, 6.5, c104.warn),
    geo14Txt(360, 40, 'A', 13, c104.ink, 'middle', '700'),
    geo14Txt(100, 380, 'B', 13, c104.ink, 'middle', '700'),
    geo14Txt(620, 380, 'C', 13, c104.ink, 'middle', '700'),
    geo14Txt(376, 384, 'D', 12, c104.accent, 'start', '700'),
    geo14Txt(494, 204, 'E', 12, c104.accent, 'start', '700'),
    geo14Txt(226, 204, 'F', 12, c104.accent, 'end', '700'),
    geo14Txt(374, 264, 'G', 12, c104.warn, 'start', '700'),
    // legend
    geo14Seg(120, 414, 146, 414, c104.struct, 4),
    geo14Txt(154, 418, 'sides: ABF, BCD, ACE', 10.5, c104.ink, 'start'),
    geo14Seg(340, 414, 366, 414, c104.accent, 4),
    geo14Txt(374, 418, 'medians: ADG, BEG, CFG', 10.5, c104.ink, 'start'),
    geo14Seg(580, 414, 606, 414, c104.teal, 4),
    geo14Txt(614, 418, 'circle: DEF', 10.5, c104.ink, 'start'),
    `</svg>`,
  ].join('')
}

/* (F3) the C(n,2) growth bars for n = 3..10, plus the general-position
   vs all-collinear contrast at n = 5 */
function geo14GrowthSvg(): string {
  const W = 780, H = 400
  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Left: a bar chart of the line count for n points in general position, growing as C of n choose 2 from 3 lines at n equals 3 to 45 lines at n equals 10. Right: the two extremes at five points - ten lines when no three are collinear, one line when all five are collinear.">`,
    geo14Txt(215, 34, 'general position: n points give C(n,2) lines', 12, c104.ink, 'middle', '600'),
    geo14Txt(215, 52, 'C(n,2) = n(n-1)/2, the pair count', 10.5, c104.tealInk, 'middle'),
  ]
  const base = 330, scale = 250 / 45, x0 = 40, bw = 36, pitch = 44
  for (let n = 3; n <= 10; n++) {
    const v = (n * (n - 1)) / 2
    const h = v * scale
    const x = x0 + (n - 3) * pitch
    const col = n === 6 ? c104.accent : c104.struct
    out.push(`<rect x="${x}" y="${(base - h).toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="3" fill="${col}" opacity="0.88"/>`)
    out.push(geo14Txt(x + bw / 2, base - h - 7, String(v), 10, c104.ink, 'middle', '600'))
    out.push(geo14Txt(x + bw / 2, base + 16, `n=${n}`, 10, c104.tealInk, 'middle'))
  }
  out.push(geo14Seg(30, base, 400, base, c104.ink, 1.8))
  out.push(geo14Txt(215, 362, 'each bar adds n-1 new lines to the previous bar', 10, c104.tealInk, 'middle'))
  // right panel: the two extremes at n = 5
  const gen: P14[] = [0, 1, 2, 3, 4].map((k) => ({ x: 500 + k * 26, y: 205 - k * k * 7 }))
  for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) out.push(geo14Seg(gen[i].x, gen[i].y, gen[j].x, gen[j].y, c104.teal, 1))
  for (const p of gen) out.push(geo14Dot(p.x, p.y, 4.5, c104.accent))
  out.push(geo14Txt(552, 234, '5 points, no three collinear: 10 lines', 10.5, c104.ink, 'middle', '600'))
  out.push(geo14Seg(488, 300, 616, 300, c104.struct, 3))
  for (let k = 0; k < 5; k++) out.push(geo14Dot(500 + k * 26, 300, 4.5, c104.accent))
  out.push(geo14Txt(552, 330, '5 collinear points: 1 line', 10.5, c104.ink, 'middle', '600'))
  out.push(geo14Txt(552, 52, 'the two extremes at n = 5', 11, c104.ink, 'middle', '600'))
  out.push(geo14Txt(390, 388, 'the same five points: 10 lines in general position, 1 line when all collinear', 10.5, c104.tealInk, 'middle'))
  out.push(`</svg>`)
  return out.join('')
}

/* (F4) the non-models: three panels, each breaking exactly one axiom */
function geo14NonModelSvg(): string {
  const W = 780, H = 310
  const panel = (x0: number, title: string, sub: string) => [
    geo14Box(x0, 46, 240, 220, c104.white, c104.struct, 1.6),
    geo14Txt(x0 + 120, 36, title, 12, c104.warn, 'middle', '700'),
    geo14Txt(x0 + 218, 72, 'X', 13, c104.warn, 'middle', '700'),
    geo14Txt(x0 + 120, 250, sub, 9.5, c104.tealInk, 'middle'),
  ]
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Three non-models. Panel one breaks axiom I point one: two different lines pass through the same two points P and Q. Panel two breaks axiom I point two: a line whose point-set is exactly one point R. Panel three breaks axiom I point three: a two-point world with no third point at all.">`,
    ...panel(20, 'I.1 broken', 'two different lines through the same two points'),
    geo14Seg(80, 180, 210, 110, c104.struct, 2.2),
    `<path d="M 80 180 Q 145 232 210 110" fill="none" stroke="${c104.accent}" stroke-width="2.2"/>`,
    geo14Dot(80, 180, 6, c104.warn), geo14Dot(210, 110, 6, c104.warn),
    geo14Txt(66, 194, 'P', 12, c104.ink, 'middle', '700'),
    geo14Txt(224, 102, 'Q', 12, c104.ink, 'middle', '700'),
    ...panel(270, 'I.2 broken', 'a line whose point-set is exactly one point'),
    geo14Seg(300, 160, 470, 160, c104.struct, 2.2),
    geo14Dot(385, 160, 6, c104.warn),
    geo14Txt(385, 184, 'R', 12, c104.ink, 'middle', '700'),
    ...panel(520, 'I.3 broken', 'a two-point world: no three points exist at all'),
    geo14Dot(585, 140, 6, c104.warn), geo14Dot(665, 200, 6, c104.warn),
    geo14Txt(572, 132, 'S', 12, c104.ink, 'middle', '700'),
    geo14Txt(678, 212, 'T', 12, c104.ink, 'middle', '700'),
    geo14Txt(390, 296, 'each panel violates exactly one planar incidence axiom - the axioms are separate targets', 11, c104.tealInk, 'middle'),
    `</svg>`,
  ].join('')
}

/* (Illustration 1 figure) the same six points before and after:
   15 lines in general position; 13 lines once one triple is collinear */
function geo14Example1Svg(): string {
  const W = 780, H = 330
  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Two configurations of six points. Left: no three collinear, so fifteen thin lines connect every pair. Right: points P1, P2, P3 collinear on one bold line with P4, P5, P6 off it, giving thirteen distinct lines.">`,
    geo14Txt(390, 30, 'the same six points, before and after', 12.5, c104.ink, 'middle', '600'),
  ]
  // left: 6 points on a parabola (no three collinear), all 15 pairs drawn
  const gen: P14[] = [0, 1, 2, 3, 4, 5].map((k) => ({ x: 60 + k * 52, y: 250 - k * k * 7.2 }))
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) out.push(geo14Seg(gen[i].x, gen[i].y, gen[j].x, gen[j].y, c104.teal, 1))
  for (const p of gen) out.push(geo14Dot(p.x, p.y, 4.5, c104.accent))
  out.push(geo14Txt(190, 300, 'no three collinear: 15 lines', 11, c104.ink, 'middle', '600'))
  // right: the engine's recount config (one collinear triple)
  const s = 85, ox = 460, oy = 260
  const pts: P14[] = [
    { x: ox, y: oy }, { x: ox + s, y: oy }, { x: ox + 2 * s, y: oy },
    { x: ox, y: oy - s }, { x: ox + s, y: oy - 2 * s }, { x: ox + 3 * s, y: oy - s },
  ]
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
    if (i <= 2 && j <= 2) continue // the triple's pairs all ride the one bold line
    out.push(geo14Seg(pts[i].x, pts[i].y, pts[j].x, pts[j].y, c104.teal, 1))
  }
  out.push(geo14Seg(ox - 24, oy, ox + 2 * s + 24, oy, c104.struct, 3.2))
  for (let k = 0; k < 6; k++) out.push(geo14Dot(pts[k].x, pts[k].y, 4.5, c104.accent))
  const lbl = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6']
  const off: Array<[number, number, string]> = [[-12, 18, 'end'], [0, 18, 'middle'], [12, 18, 'start'], [-12, -8, 'end'], [0, -12, 'middle'], [12, -8, 'start']]
  for (let k = 0; k < 6; k++) out.push(geo14Txt(pts[k].x + off[k][0], pts[k].y + off[k][1], lbl[k], 9.5, c104.ink, off[k][2], '600'))
  out.push(geo14Txt(585, 300, 'one collinear triple (P1, P2, P3): 13 lines', 11, c104.ink, 'middle', '600'))
  out.push(geo14Txt(390, 322, 'making three points collinear removes net 2 lines: 15 - 3 + 1 = 13', 10, c104.tealInk, 'middle'))
  out.push(`</svg>`)
  return out.join('')
}

/* (solution figure) the recount configuration drawn alone: the 13 lines */
function geo14RecountSvg(): string {
  const W = 780, H = 340
  const s = 110, ox = 120, oy = 300
  const pts: P14[] = [
    { x: ox, y: oy }, { x: ox + s, y: oy }, { x: ox + 2 * s, y: oy },
    { x: ox, y: oy - s }, { x: ox + s, y: oy - 2 * s }, { x: ox + 3 * s, y: oy - s },
  ]
  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The recount configuration: six points P1 to P6 with P1, P2, P3 collinear on one bold line and twelve further thin lines to and among P4, P5, P6 - thirteen distinct lines in all. A side panel tallies 15 pairs minus 3 merged pairs plus 1 collinear line equals 13.">`,
    geo14Txt(240, 30, '6 points, one collinear triple: 13 distinct lines', 12, c104.ink, 'middle', '600'),
  ]
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
    if (i <= 2 && j <= 2) continue
    out.push(geo14Seg(pts[i].x, pts[i].y, pts[j].x, pts[j].y, c104.teal, 1.1))
  }
  out.push(geo14Seg(ox - 26, oy, ox + 2 * s + 26, oy, c104.struct, 3.4))
  const lbl = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6']
  const off: Array<[number, number, string]> = [[-12, 20, 'end'], [0, 20, 'middle'], [12, 20, 'start'], [-12, -8, 'end'], [0, -12, 'middle'], [12, -8, 'start']]
  for (let k = 0; k < 6; k++) {
    out.push(geo14Dot(pts[k].x, pts[k].y, 5.5, c104.accent))
    out.push(geo14Txt(pts[k].x + off[k][0], pts[k].y + off[k][1], lbl[k], 10, c104.ink, off[k][2], '600'))
  }
  out.push(geo14Txt(ox + s, oy + 44, 'the collinear line (absorbs the 3 pairs P1P2, P1P3, P2P3)', 9.5, c104.struct, 'middle', '600'))
  // the arithmetic panel
  out.push(geo14Box(500, 56, 258, 212, c104.panelB, c104.conn, 1.6))
  out.push(geo14Txt(629, 84, 'the recount, as arithmetic', 11.5, c104.ink, 'middle', '600'))
  out.push(geo14Txt(629, 116, '15 pairs among 6 points', 11, c104.ink))
  out.push(geo14Txt(629, 144, 'minus 3 pairs merged into one line', 11, c104.ink))
  out.push(geo14Txt(629, 172, 'plus that 1 collinear line', 11, c104.ink))
  out.push(geo14Txt(629, 216, '15 - 3 + 1 = 13', 16, c104.warn, 'middle', '700'))
  out.push(geo14Txt(240, 326, 'every one of the other 12 pairs still gives its own line', 10, c104.tealInk, 'middle'))
  out.push(`</svg>`)
  return out.join('')
}

/* (solution figure) the Fano census checklist */
function geo14FanoCheckSvg(): string {
  const W = 780, H = 240
  const rows: Array<[string, string]> = [
    ['points', '7'],
    ['lines', '7'],
    ['points on every line', '3'],
    ['lines through every point', '3'],
    ['total incidences (7 lines x 3 points)', '21'],
    ['parallel (disjoint) line pairs', '0'],
  ]
  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The Fano census checked item by item: 7 points, 7 lines, 3 points on every line, 3 lines through every point, 21 total incidences, and 0 parallel line pairs - each row marked OK.">`,
    geo14Txt(390, 30, 'the Fano census, checked item by item', 12.5, c104.ink, 'middle', '600'),
  ]
  rows.forEach((r, i) => {
    const y = 62 + i * 27
    out.push(geo14Seg(110, y + 8, 670, y + 8, c104.faint, 0.8))
    out.push(geo14Txt(110, y, r[0], 11, c104.ink, 'start'))
    out.push(geo14Txt(560, y, r[1], 11, c104.tealInk, 'middle', '700'))
    out.push(geo14Txt(636, y, 'OK', 11, c104.struct, 'middle', '700'))
  })
  out.push(geo14Txt(390, 232, 'every two points on exactly one line; every two lines meet in exactly one point', 10.5, c104.tealInk, 'middle'))
  out.push(`</svg>`)
  return out.join('')
}

/* (solution figure) the three parallel classes, one panel each */
function geo14ClassesSvg(): string {
  const W = 780, H = 260
  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="The three parallel classes of the four-point plane, one panel each: class A B with C D drawn bold in green, class A C with B D bold in orange, class A D with B C bold in teal, with the remaining four lines faint in each panel.">`,
    geo14Txt(390, 26, 'the three parallel classes of the four-point plane, one panel each', 12, c104.ink, 'middle', '600'),
  ]
  const panels: Array<{ x0: number; title: string; cls: string; col: string }> = [
    { x0: 20, title: 'top and bottom', cls: '{AB, CD}', col: c104.struct },
    { x0: 270, title: 'the two diagonals', cls: '{AC, BD}', col: c104.accent },
    { x0: 520, title: 'the slanted sides', cls: '{AD, BC}', col: c104.teal },
  ]
  const which = (a: string, b: string, cls: string): string => {
    const pair = [a, b].slice().sort().join('')
    return pair === 'AB' || pair === 'CD' ? (cls === '{AB, CD}' ? 'hi' : 'lo')
      : pair === 'AC' || pair === 'BD' ? (cls === '{AC, BD}' ? 'hi' : 'lo')
        : (cls === '{AD, BC}' ? 'hi' : 'lo')
  }
  for (const p of panels) {
    out.push(geo14Box(p.x0, 40, 240, 172, c104.white, c104.struct, 1.6))
    out.push(geo14Txt(p.x0 + 120, 62, p.title, 10.5, c104.tealInk, 'middle'))
    const a: P14 = { x: p.x0 + 52, y: 84 }, b: P14 = { x: p.x0 + 162, y: 84 }, c: P14 = { x: p.x0 + 192, y: 172 }, d: P14 = { x: p.x0 + 82, y: 172 }
    const segs: Array<[P14, P14, string]> = [
      [a, b, 'AB'], [c, d, 'CD'], [a, c, 'AC'], [b, d, 'BD'], [a, d, 'AD'], [b, c, 'BC'],
    ]
    for (const [u, v, nm] of segs) {
      const hi = which(nm[0], nm[1], p.cls)
      out.push(geo14Seg(u.x, u.y, v.x, v.y, hi === 'hi' ? p.col : c104.mist, hi === 'hi' ? 3.4 : 1.2))
    }
    for (const [pt, nm] of [[a, 'A'], [b, 'B'], [c, 'C'], [d, 'D']] as Array<[P14, string]>) {
      out.push(geo14Dot(pt.x, pt.y, 5, c104.ink))
      out.push(geo14Txt(pt.x + (nm === 'A' ? -10 : nm === 'B' ? 10 : nm === 'C' ? 10 : -10), pt.y + (nm === 'A' || nm === 'B' ? -8 : 16), nm, 9.5, c104.ink, 'middle', '600'))
    }
    out.push(geo14Txt(p.x0 + 120, 228, `class ${p.cls}`, 11, p.col, 'middle', '700'))
  }
  out.push(geo14Txt(390, 250, 'each class is a pair of lines with no shared point; the three pairs partition the six lines', 10, c104.tealInk, 'middle'))
  out.push(`</svg>`)
  return out.join('')
}

export const lessonGeo104: Lesson = {
  id: 'geo-incidence-how-points-lines-and-planes-interlock',
  number: '1.4',
  title: 'Incidence: how Points, Lines and Planes Interlock',
  concepts: [
    'incidence axiom',
    'existence and uniqueness',
    'general position',
    'model',
    'Fano plane',
    'affine plane',
    'parallel classes',
  ],
  objectives: [
    'State Hilbert\'s three planar incidence axioms in your own words and separate the existence half of I.1 from its uniqueness half.',
    'Prove the first incidence theorems — T1, T2 by contradiction, and the counting theorem T3 — and apply T3 to count lines in any configuration.',
    'Recognise the boundary behaviours: all collinear, n-1 collinear plus one off, and the de Bruijn-Erdos lower bound of 1948.',
    'Verify a model against the axioms: the four-point affine plane, the Fano plane of 1892, and the non-models that break one axiom each.',
    'Count parallel classes and explain, via the Fano plane, why the parallel postulate is a separate assumption.',
  ],
  prerequisites: ['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game', 'geo-axioms-theorems-and-the-shape-of-a-proof'],
  sources: ['geo-hilbert-grundlagen', 'geo-fano-plane', 'geo-dbe-1948'],
  blocks: [
    /* ---------------- opening motivation ---------------- */
    { kind: 'para', text: 'Here is a suspicion you would be forgiven for holding: that the deep rules of geometry must be about distance and angle — about how long, how steep, how far apart. The present lesson exists to retire that suspicion in a single stroke. The thinnest axioms in the entire rulebook are the incidence axioms: they say only who lies on whom. Not how far. Not at what angle. They never mention size at all — they say only that this point lies on that line, that these two lines share that point. And yet, from rules that thin, geometry is already forced to DO things: to draw lines through pairs, to forbid crossings in twos, and — the surprise of the whole chapter — to COUNT. Incidence alone counts lines. By the end of this lesson you will be able to say exactly how many lines any set of points determines, and you will have proved it.' },
    { kind: 'para', text: 'The plan of the lesson is the plan of the chapter closing. First we read Hilbert\'s planar incidence axioms in our own words — three of them, pared down from his group of eight — and watch each one do exactly one job. Then we prove the first theorems: the uniqueness read (T1), the at-most-one-point lemma by contradiction (T2), the great counting theorem $\\binom{n}{2}$ (T3), and the boundary cases where the count collapses (T4). Then the machinery of Lesson 1.3 goes to work: we build models you can hold — the four-point affine plane, the seven-point Fano plane of 1892 — and non-models that fail the axioms in exactly one way each. The chapter\'s closing thought waits at the end of the Fano section, and it is worth the wait: the smallest honest geometry has no parallel lines at all, which is precisely why Euclid\'s fifth postulate had to be a separate assumption.' },
    { kind: 'para', text: 'A promise about honesty, made once and kept throughout: every number printed in this lesson — every entry of the $\\binom{n}{2}$ sweep, every census of the four-point plane and the Fano plane, the collinear recount, the boundary counts, every exercise witness — has been recomputed by brute force by the verification engine that accompanies this chapter, and where prose and engine ever disagree, the engine wins and the prose is corrected. The counts you are about to read have been computed from the actual coordinates, not estimated from a drawing. That discipline matters more in this lesson than in any before it, because this is the first lesson whose theorems are literally arithmetic.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the surprise is arithmetic', text: 'Most of school geometry measures; this part of it counts. The question "how many lines?" needs no ruler, no protractor, no notion of distance — only the question "which points lie on which lines?". That question is decided by the incidence axioms alone, and the answer arrives as a formula, $\\binom{n}{2} = \\frac{n(n-1)}{2}$, that a computer can verify for every configuration up to exhaustion. When a subject as visual as geometry starts producing exact integers, pay attention: you are watching axioms become arithmetic.' },
    /* ---------------- section: Hilbert's planar incidence axioms ---------------- */
    { kind: 'heading', text: 'Hilbert\'s Planar Incidence Axioms, In Our Words' },
    { kind: 'para', text: 'Lesson 1.1 adopted the undefined words — point, line, plane — and the primitive relations that ride beside them, chief among them incidence itself: a point lies on a line, a line contains a point, a line passes through a point, a point and a line are incident with each other. Four names, one relation, as the word tower of that lesson showed. Lesson 1.3 built the shapes a proof can take. Now the two strands meet: the axioms that constrain incidence, and the proof machinery to squeeze consequences out of them. The source is David Hilbert\'s Grundlagen der Geometrie of 1899, whose first axiom group — the incidence group, labelled I — is where every modern treatment of the subject begins.' },
    { kind: 'para', text: 'Hilbert\'s full incidence group runs to eight axioms, I.1 through I.8, and five of them are essentially spatial — they are what make planes behave like planes inside space. This chapter does plane geometry, so we keep the planar three and set the spatial five aside until Chapter 11, where space gets its own book of rules. Here are the three, in our own words. Read them slowly; each one is a single breath, and each does exactly one job.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the planar incidence axioms (our words; study, never reproduce)', text: 'I.1: through any two distinct points there is exactly one line. I.2: every line contains at least two points. I.3: there exist three points that are not all on one line — three non-collinear points. Thus the first axiom joins, the second fills, the third escapes flatness: no reading of these three mentions distance, angle, or size — only the lying-on relation.' },
    { kind: 'para', text: 'Look at what I.1 packs into one sentence: existence AND uniqueness, in a single breath. It promises that a line through two given points exists (you can always draw one), and it promises that only one exists (you can never draw a second, different one). Hilbert merged the two clauses deliberately, but for proving things it pays to pull them apart — which is exactly what our first theorem, T1, will do. The merged form is the axiom; the separated form is the working tool. Most "exactly one" statements in mathematics hide this same two-part structure, and examiners love to test whether you can see the halves.' },
    { kind: 'para', text: 'I.2 is the anti-emptiness rule: a line with a single point on it, or none, is not a line of this theory. And I.3 is the anti-degeneracy rule: the world must contain three points that refuse to share a line — otherwise everything collapses onto one line and there is no plane geometry to study, only a number line wearing a costume. Between them, the three axioms give the theory something to join with (I.1), something to join (I.2), and somewhere to spread out (I.3). The full eight, for reference and for honesty about what was deleted, sit in Table 1.' },
    { kind: 'table', caption: 'Table 1 — Hilbert\'s incidence group I.1 to I.8 in paraphrase, with the planar three marked and the spatial five flagged for Chapter 11.', head: ['Axiom', 'In our words (paraphrase — study, never reproduce)', 'Plane or space?'], rows: [
      ['I.1', 'Through two distinct points there is exactly one line.', 'planar — kept'],
      ['I.2', 'Every line contains at least two points.', 'planar — kept'],
      ['I.3', 'Three non-collinear points exist.', 'planar — kept'],
      ['I.4', 'Three non-collinear points lie on exactly one plane.', 'spatial — Chapter 11'],
      ['I.5', 'Every plane contains at least three non-collinear points.', 'spatial — Chapter 11'],
      ['I.6', 'If two points of a line lie in a plane, the whole line lies in that plane.', 'spatial — Chapter 11'],
      ['I.7', 'If two planes share one point, they share a second point too.', 'spatial — Chapter 11'],
      ['I.8', 'Four non-coplanar points exist.', 'spatial — Chapter 11'],
    ] },
    { kind: 'para', text: 'The deletion is worth doing once, consciously: strike out I.4 through I.8 — the five spatial clauses — and reword the remaining three to speak only of points and lines, never of planes, and what remains is plane geometry exactly. Nothing else is needed; nothing else is thrown away. This is a genuine feat of economy: the entire planar theory of incidence, the subject of this lesson, rests on three sentences totalling fewer than forty words. The next section makes them work.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the Grundlagen, and why the order matters', text: 'David Hilbert published the Grundlagen der Geometrie in 1899, and its axiom groups — incidence (I), betweenness (II), congruence (III), parallels (IV) and continuity (V) — set the template that Lesson 1.1 catalogued. The incidence group comes FIRST in his list, and the order is a claim: before you can measure anything, you must know what lies on what. Gino Fano, whose seven-point plane we build later in this lesson, had published the first finite geometries in 1892, seven years before Hilbert\'s book; and the counting theorem we prove as T3 would find its deepest echo in 1948, when N. G. de Bruijn and P. Erdős showed that even the thinnest incidence rules force line counts upward. The century\'s worth of results all grow from the same three sentences.' },
    /* ---------------- section: the first theorems ---------------- */
    { kind: 'heading', text: 'The First Theorems' },
    { kind: 'para', text: 'Three axioms, and already theorems press to be proved. We take them in the order the machinery of Lesson 1.3 makes natural: first a direct read that separates the halves of an axiom (T1), then a contradiction — the 1.3 shape in live action (T2), then the counting theorem that turns incidence into arithmetic (T3), and finally the boundary cases that fence the count in (T4). Each derivation is short, and each is a template you will reuse all book long.' },
    { kind: 'derivation', title: 'T1 — the uniqueness read: two distinct points lie on exactly one line', statement: 'From I.1 alone, show that two distinct points $A$ and $B$ lie on exactly one line — by separating the existence half from the uniqueness half and arguing each.', steps: [
      { label: 'Existence', formula: '\\text{there is a line } \\ell \\text{ with } A \\text{ and } B \\text{ on it}', explanation: 'I.1 promises at least one line through the two points, so the existence half is read straight off the axiom: a joining line exists.' },
      { label: 'Uniqueness setup', formula: '\\ell, m \\text{ both carrying } A \\text{ and } B', explanation: 'Now suppose a second line $m$ also carries both points. To prove uniqueness we must show this supposed second line is nothing new.' },
      { label: 'Apply I.1', formula: '\\ell = m', explanation: 'I.1 says the line through $A$ and $B$ is exactly one — so the line called $\\ell$ and the line called $m$ are one and the same line under two names.' },
      { label: 'Conclude', formula: '\\text{one line, and only one}', explanation: 'Both halves hold: a line exists, and no second one does. T1 is I.1 with the two clauses pulled apart and each argued — the shape of every uniqueness proof to come.' },
    ], result: 'Two distinct points lie on exactly one line: the existence half and the uniqueness half, each drawn from I.1 and each available separately when a proof needs only one of them.' },
    { kind: 'para', text: 'Keep the two halves in your pocket as separate tools. Some proofs need only existence ("a joining line can be drawn"); some need only uniqueness ("two points cannot sit on two different lines"); most need both, stated in the order that suits the argument. The merged axiom is the law; T1 is the toolkit.' },
    { kind: 'derivation', title: 'T2 — two distinct lines meet in at most one point (by contradiction)', statement: 'Show that two distinct lines have at most one common point, using T1 and the contradiction shape from Lesson 1.3.', steps: [
      { label: 'Suppose the opposite', formula: '\\ell \\neq m, \\;\\; \\{P, Q\\} \\subseteq \\ell \\cap m, \\;\\; P \\neq Q', explanation: 'Assume the negation of the claim: two distinct lines sharing TWO distinct common points $P$ and $Q$. If this leads to an impossibility, the assumption falls.' },
      { label: 'Both lines carry the pair', formula: 'P, Q \\in \\ell \\text{ and } P, Q \\in m', explanation: 'Each of the two lines now contains the same two distinct points — so both are candidates for "the" line through $P$ and $Q$.' },
      { label: 'T1 fires', formula: '\\ell = m', explanation: 'By T1, exactly one line carries $P$ and $Q$. Two candidates, one vacancy: the lines coincide.' },
      { label: 'Contradiction', formula: '\\ell = m \\;\\wedge\\; \\ell \\neq m', explanation: 'The assumption produced lines both equal and distinct — an impossibility. So the assumption is false: no two distinct lines share two points.' },
    ], result: 'Two distinct lines meet in at most one point: sharing two points would force the lines to be identical, contradicting their distinctness.' },
    { kind: 'para', text: 'Notice the engine of T2: it is T1 doing the killing, with the contradiction shape as the delivery mechanism. This pattern — suppose the opposite, run a uniqueness argument, hit an impossibility — recurs throughout geometry, and Lesson 1.3 drew its skeleton; here is the skeleton walking. The result deserves a card of its own, because it is the lemma underneath every crossing argument in the book: when you see two lines cross in a diagram, you may conclude the crossing point is their ONLY shared point, and you cite T2.' },
    { kind: 'formula', name: 'The at-most-one-point lemma (T2)', latex: '\\ell \\neq m \\;\\Longrightarrow\\; \\lvert \\ell \\cap m \\rvert \\leq 1', note: 'two distinct lines share at most one point; the crossing you see in a diagram is the whole of their meeting.' },
    { kind: 'derivation', title: 'T3 — the counting theorem: general position gives the pair count', statement: 'Show that $n$ points in general position — no three of them collinear — determine exactly $\\binom{n}{2} = \\frac{n(n-1)}{2}$ distinct lines.', steps: [
      { label: 'Every pair gives a line', formula: '\\{P_i, P_j\\} \\mapsto \\text{the line } P_iP_j', explanation: 'By T1, each of the pairs of points lies on exactly one line. So we have a rule that produces a line from every pair.' },
      { label: 'Distinct pairs, distinct lines', formula: 'P_iP_j = P_kP_l \\;\\Rightarrow\\; \\{i, j\\} = \\{k, l\\}', explanation: 'Suppose two different pairs gave the SAME line. That one line would then carry at least three of the points (share an index: three points; share none: four points — and any three of those four are collinear). Either way three collinear points exist, which general position forbids. So different pairs give different lines.' },
      { label: 'Count the pairs', formula: '\\binom{n}{2} = \\frac{n(n-1)}{2} = 1 + 2 + \\cdots + (n-1)', explanation: 'The number of 2-element subsets of an $n$-element set is the binomial coefficient — counted fresh in the exercises, and cross-checked two routes by the engine for every $n$ from 3 to 10.' },
      { label: 'Conclude', formula: '\\text{lines} = \\binom{n}{2}', explanation: 'Every pair contributes one new line, and every line through two of the points comes from a pair — the count is exact, not a bound. The ceiling is attained whenever no three points are collinear.' },
    ], result: '$n$ points in general position determine exactly $\\binom{n}{2} = \\frac{n(n-1)}{2}$ lines: incidence alone, and the answer is a formula.' },
    { kind: 'equation', latex: '\\binom{n}{2} = \\frac{n(n-1)}{2} = 1 + 2 + \\cdots + (n-1) \\tag{1}', note: 'the pair count in closed form and as the ladder sum — both routes engine-verified for every $n$ from 3 to 10.' },
    { kind: 'para', text: 'The census deserves a table of its own, because the numbers themselves carry a lesson: the count GROWS quadratically while $n$ grows linearly. Each new point you add contributes exactly $n - 1$ new lines — one to each point already present — so the totals climb a ladder: 3, then 6, then 10, then 15, 21, 28, 36, 45. The engine computed every entry three ways (brute-force pair sweep, the closed form, and the factorial formula) and all three routes agree, which is why the table may be printed.' },
    { kind: 'table', caption: 'Table 2 — the line census for $n$ points in general position, $n = 3$ to $10$: pairs counted as subsets, and as the running ladder sum.', head: ['Points $n$', 'Pairs = lines determined', 'The ladder sum'], rows: [
      ['$3$', '$3$', '$1 + 2 = 3$'],
      ['$4$', '$6$', '$1 + 2 + 3 = 6$'],
      ['$5$', '$10$', '$1 + 2 + 3 + 4 = 10$'],
      ['$6$', '$15$', '$1 + 2 + 3 + 4 + 5 = 15$'],
      ['$7$', '$21$', '$1 + 2 + 3 + 4 + 5 + 6 = 21$'],
      ['$8$', '$28$', '$1 + 2 + 3 + 4 + 5 + 6 + 7 = 28$'],
      ['$9$', '$36$', '$1 + 2 + \\cdots + 8 = 36$'],
      ['$10$', '$45$', '$1 + 2 + \\cdots + 9 = 45$'],
    ] },
    { kind: 'figure', caption: 'Figure 1 — the growth of the line count: bars for $n = 3$ to $10$ (the $n = 6$ bar highlighted — fifteen lines), and the two extremes at five points: ten lines in general position, one line when all five are collinear.', svg: geo14GrowthSvg() },
    { kind: 'para', text: 'The right-hand panels of Figure 1 hold the two extremes, and the distance between them is the whole drama of the second half of this lesson. Ten lines or one line — the SAME five points, differing only in arrangement. The formula $\\binom{n}{2}$ is the ceiling, reached only in general position; the floor is the subject of T4 and, beyond it, of the 1948 theorem of de Bruijn and Erdős. First, the definition that makes the ceiling precise.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — general position', text: 'A set of points is said to be in general position when no three of the points are collinear — no single line contains three of them. Thus, $n$ points in general position determine exactly $\\binom{n}{2}$ lines, the maximum possible; every collinear triple knocks the count below the ceiling.' },
    { kind: 'para', text: 'The engine does not take general position on faith: it builds a six-point witness on the parabola $y = x^2$ (a line meets a parabola in at most two points, so no three of the witnesses can be collinear), enumerates all twenty collinear triples among them, finds none, and counts exactly fifteen distinct lines — $\\binom{6}{2}$, as T3 demands. The five-point sub-configuration gives ten. The formula and the coordinates agree, and it is that agreement, not the diagram, that licenses the counts printed here.' },
    /* ---------------- section: the boundary cases ---------------- */
    { kind: 'derivation', title: 'T4 — the boundary cases: when the count collapses', statement: 'Count the lines determined (i) when all $n$ points are collinear, and (ii) when exactly $n - 1$ of them are collinear and one point lies off their common line.', steps: [
      { label: 'All collinear', formula: '\\text{lines} = 1', explanation: 'One line carries every point, and every pair of points lies on that same line — so the pair-sweep, which counted $\\binom{n}{2}$ pairs in general position, now sees every pair land on the SAME line. The count collapses to one.' },
      { label: 'Set up the near-miss', formula: 'P_1, \\ldots, P_{n-1} \\text{ on } \\ell, \\;\\; Q \\text{ off } \\ell', explanation: 'Now suppose only $n - 1$ points ride the line $\\ell$, with a single point $Q$ off it, and no other collinearity.' },
      { label: 'Count the near-miss', formula: '1 + (n - 1) = n', explanation: 'Any pair of points either has both members on $\\ell$ — giving the single line $\\ell$ — or has $Q$ as one member, giving the line $QP_i$ for one of the $n - 1$ points on $\\ell$. These $n - 1$ joining lines are all distinct (two of them sharing a second common point would put three points on one line). Total: $1 + (n - 1) = n$ lines.' },
      { label: 'Read the extremes together', formula: 'n \\;\\leq\\; \\text{lines} \\;\\leq\\; \\binom{n}{2}', explanation: 'The two boundary behaviours bracket every configuration: no arrangement of $n$ not-all-collinear points can fall below $n$ lines (the theorem below), and none can exceed the pair count (T3). The engine checks both fences on every configuration it builds.' },
    ], result: 'All $n$ collinear gives exactly $1$ line; $n - 1$ collinear plus one point off gives exactly $n$ lines — the two boundary behaviours between which every configuration lives.' },
    { kind: 'para', text: 'The second boundary case is the more surprising of the two, and it deserves a name of its own, because in 1948 it turned out to be the FLOOR of the whole subject. Say it aloud: take a hundred points on one line, add one point off it, and you get exactly one hundred and one lines — one for the crowd, one for each join. Not approximately; exactly. And no arrangement of a hundred not-all-collinear points can do worse.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — de Bruijn–Erdős (1948): the line-count floor', text: 'If $n$ points are given, not all of them collinear, then they determine at least $n$ distinct lines. The bound is attained: the configuration of $n - 1$ collinear points plus one point off their line determines exactly $n$ lines, as T4 counts. Attribution, honestly stated: N. G. de Bruijn and P. Erdős, "On a combinatorial problem", Indagationes Mathematicae 10, 1948 — the paper that showed even the thinnest incidence rules refuse to let a configuration be poor in lines.' },
    { kind: 'para', text: 'Sit with the shape of that statement for a moment, because it is a genuine surprise of the kind this lesson promised. General position is RICH — $\\binom{n}{2}$ lines, quadratic abundance. You would expect that by squashing points onto lines you could make the count as small as you liked. You cannot. Squash all but one point flat and you have still forced $n$ lines; spread them fully and you have forced $\\binom{n}{2}$. Every configuration in between lives on the interval between the de Bruijn–Erdős floor and the T3 ceiling. The engine tests the floor on every not-all-collinear configuration it builds — the four-point plane ($6 \\geq 4$), the Fano plane ($7 \\geq 7$, the bound attained), the recount configuration ($13 \\geq 6$) — and it holds everywhere.' },
    { kind: 'para', text: 'One more boundary behaviour completes the picture: the pencil. Place $n - 1$ points in general position and add one more point $O$ positioned so that no two of the joining lines $OP_i$ coincide — every line of the configuration then passes through $O$, which is why the family is called a pencil of lines. Through $O$ itself run exactly $n - 1$ lines; the total count is the $n - 1$ pencil lines plus the $\\binom{n-1}{2}$ lines among the outer points, and none of these coincide (an outer pair\'s line misses $O$ by construction). The engine builds the seven-point pencil ($6$ rays on a parabola-shaped arc plus the centre) and confirms: $6$ lines through the centre, $15$ among the rays, $21$ distinct lines in all.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the three classic miscounts', text: 'One: counting $n$ lines for $n$ collinear points — no; collinear points share ONE line, the whole content of the first boundary case. Two: subtracting the collinear triple\'s pairs but forgetting to add the collinear line back — the recount is $\\binom{6}{2} - 3 + 1 = 13$, not $12$. Three: quoting the de Bruijn–Erdős bound as "at most $n$" — the inequality runs the other way; the theorem is a FLOOR, and general position blows straight past it to $\\binom{n}{2}$. Every one of these three errors appears in real scripts every year.' },

    /* ---------------- section: models you can hold ---------------- */
    { kind: 'heading', text: 'Models You Can Hold' },
    { kind: 'para', text: 'Lesson 1.3 built the machinery: a model of an axiom list is any structure in which every axiom reads true, and proving something is NOT a model means exhibiting the one axiom it breaks. This section runs that machinery on the two smallest honest geometries in existence — one with four points, one with seven — and then, just as instructively, on structures that fail. The point of a small model is that NOTHING is hidden: you can check every axiom by hand, every census by counting on your fingers, and the engine can brute-force every claim to exhaustion.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — model (recalled from Lesson 1.3)', text: 'A model of a list of axioms is a structure — a population of objects called "points" together with certain sets of them called "lines" — in which every axiom of the list reads true. Thus a model of the planar incidence axioms needs: every pair of points on exactly one line (I.1), every line carrying at least two points (I.2), and some three points not on one line (I.3).' },
    { kind: 'para', text: 'The first model is the smallest one can build: four points, named $A$, $B$, $C$, $D$, and as lines the six pairs themselves — $AB$, $AC$, $AD$, $BC$, $BD$, $CD$. That is the entire structure: four objects, six two-element sets, nothing else. Check the axioms. I.1: any two points form one of the six pairs, and no other line contains both — every pair sits on exactly one line. I.2: every line is a pair, so every line has exactly two points — at least two, as demanded. I.3: the triples $A$, $B$, $C$ (or any three of the four) share no single line, since every line stops at two points. All three axioms hold. This is the four-point affine plane.' },
    { kind: 'figure', caption: 'Figure 2 — the four-point affine plane drawn as a parallelogram: the six lines colour-coded by parallel class — $\\{AB, CD\\}$ green (top and bottom), $\\{AC, BD\\}$ orange (the diagonals), $\\{AD, BC\\}$ teal (the slanted sides). The diagonals cross at a point of the drawing that is not a point of the model.', svg: geo14FourPointSvg() },
    { kind: 'para', text: 'The drawing demands one honest paragraph of its own, because it looks like a parallelogram and behaves like one only up to a point. The four dots ARE the whole model — its entire population of points is $A$, $B$, $C$, $D$. The six drawn strokes are the whole model\'s six lines. And the place where the two diagonals cross? That crossing is a point of the DRAWING — every pair of non-parallel strokes in ink crosses somewhere — but it is NOT a point of the model: it is none of $A$, $B$, $C$, $D$, so it lies on no line of the model at all. In the model, the diagonals $AC$ and $BD$ share no point: they are PARALLEL, in exactly the incidence sense of Lesson 1.1 — same plane, no shared point. The picture reminds; the structure decides. This is the word-tower discipline of Lesson 1.1, now with arithmetic attached.' },
    { kind: 'table', caption: 'Table 3 — the census of the four-point affine plane: six lines, their points, and their parallel-class partners.', head: ['Line', 'Points on it', 'Disjoint partner (same parallel class)'], rows: [
      ['$AB$', '$A, B$', '$CD$'],
      ['$AC$', '$A, C$', '$BD$'],
      ['$AD$', '$A, D$', '$BC$'],
      ['$BC$', '$B, C$', '$AD$'],
      ['$BD$', '$B, D$', '$AC$'],
      ['$CD$', '$C, D$', '$AB$'],
      ['census', '6 lines, 2 points on each', '3 classes, 2 lines each'],
    ] },
    { kind: 'para', text: 'Read the census off the table, one line at a time. Six lines — the count of pairs of four points, $\\binom{4}{2} = 6$, which is T3 at its smallest general-position case (four points, no three collinear — no three CAN be, every line stops at two). Two points on every line. Through each point run exactly three lines — through $A$ the lines $AB$, $AC$, $AD$; through $B$ the lines $AB$, $BC$, $BD$; and likewise for $C$ and $D$. Total incidences: six lines times two points each gives $12$ point-on-line facts. And the parallel structure: the six lines partition into three pairs of lines that share no point — $\\{AB, CD\\}$, $\\{AC, BD\\}$, $\\{AD, BC\\}$ — the three parallel classes. Every line has exactly one partner; every class has exactly two lines; the classes cover all six lines with nothing left over.' },
    { kind: 'para', text: 'That partition has a name worth using precisely: the parallel classes PARTITION the line-set, the way a wall of pigeonholes partitions letters. Parallelism here means disjointness — no shared point — and in this model each class is exactly a pair. (In the full Euclidean plane a parallel class is infinite: all the lines of one direction. The four-point plane is the same story with the numbers turned all the way down.) The word affine in "four-point affine plane" is the mathematician\'s flag that the parallel behaviour is Euclidean: parallels exist, one through each point in each direction. Contrast is coming — the Fano plane, where parallels do not exist at all.' },
    /* ---------------- illustrations: counting on real configurations ---------------- */
    { kind: 'heading', text: 'Worked Craft — Counting the Lines of a Drawn Configuration' },
    { kind: 'para', text: 'Examination questions on incidence come in three shapes, and this section drills all three. The first shape: given a drawn configuration, COUNT the lines it determines. The second: verify a claimed census of a small model, item by item. The third: read parallel classes off a drawing. We take them in that order, exactly as an examiner would set them, and every count printed below is one the engine has brute-forced from coordinates.' },
    { kind: 'example', title: 'Illustration 1 — Six points are drawn with no three collinear. Count the lines. Then three of the points are slid onto one common line (nothing else changes): recount.', steps: [
      'Before the slide, the configuration is in general position, so T3 applies wholesale: six points, no three collinear, give $\\binom{6}{2} = \\frac{6 \\cdot 5}{2} = 15$ lines. Every pair of points contributes one line, and no two pairs share it.',
      'Now slide $P_1$, $P_2$, $P_3$ onto one common line, leaving $P_4$, $P_5$, $P_6$ off it and no other three collinear — the configuration of Figure 3\'s right panel.',
      'Recount by adjustment, not from scratch: the fifteen pairs have not gone away, but the three pairs among the triple — $P_1P_2$, $P_1P_3$, $P_2P_3$ — no longer give three different lines; all three pairs now ride the ONE collinear line.',
      'So subtract the three absorbed pair-lines and add back the single collinear line: $15 - 3 + 1 = 13$.',
      'Check the arithmetic against the engine: it places the six points at the exact coordinates of the drawn configuration, sweeps all fifteen pairs, and counts the distinct lines by brute force — the answer is $13$, and every other pair still gives its own separate line.',
      'Hence the recount is $13$ lines: three fewer than the general-position count, because one line absorbed three pairs.',
    ] },
    { kind: 'figure', caption: 'Figure 3 — the recount, drawn: the same six points in general position (left, fifteen lines) and with $P_1$, $P_2$, $P_3$ collinear (right, thirteen lines — the bold line absorbs three pairs). The engine recomputes the right-hand count from the printed coordinates: 13.', svg: geo14Example1Svg() },
    { kind: 'para', text: 'The adjustment method deserves to be your default, because it is how examiners build every variant. Start from the general-position count $\\binom{n}{2}$, then account for each collinearity: a collinear triple costs $3 - 1 = 2$ lines net (three pair-lines merge into one). One triple among six points: $15 - 2 = 13$. One triple among five: $10 - 2 = 8$. One triple among seven: $21 - 2 = 19$. The engine has built and brute-forced each of these witnesses, and the adjustment arithmetic matches the brute force in every case — the two routes shown together in the exercises.' },
    { kind: 'example', title: 'Illustration 2 — Name the three parallel classes of the four-point plane from the drawing, and verify that they partition the six lines.', steps: [
      'Read the colour code of Figure 2: the six lines fall into three same-coloured pairs — the two horizontal strokes, the two diagonals, the two slanted sides.',
      'Name the classes as pairs of lines: $\\{AB, CD\\}$ (top and bottom), $\\{AC, BD\\}$ (the diagonals), $\\{AD, BC\\}$ (the slanted sides).',
      'Check disjointness pair by pair: $AB$ and $CD$ share no letter, so no shared point; likewise $AC$ with $BD$, and $AD$ with $BC$. Each class is genuinely a parallel pair in the incidence sense — same plane, no common point.',
      'Check the partition: the three classes list all six lines — $AB$, $CD$, $AC$, $BD$, $AD$, $BC$ — each exactly once, with nothing left over.',
      'Hence the parallel classes are exactly $\\{AB, CD\\}$, $\\{AC, BD\\}$ and $\\{AD, BC\\}$: three classes of two lines, partitioning the six.',
    ] },
    { kind: 'para', text: 'Two remarks on the second illustration. First, the check ran entirely on LETTERS — no drawing was needed once the line-list was in hand, which is the point of turning pictures into structure. Second, the diagonal class $\\{AC, BD\\}$ is the one the drawing misrepresents (their strokes cross in ink), and the letter-check is precisely what settles the truth: $AC$ and $BD$ share no letter, therefore no point, therefore they are parallel — whatever the ink does. When in doubt, count letters, not crossings.' },

    /* ---------------- section: the Fano plane ---------------- */
    { kind: 'heading', text: 'The Fano Plane — the Geometry with No Parallels' },
    { kind: 'para', text: 'The second model is the most famous small structure in all of geometry. Take seven points — name them $A$, $B$, $C$, $D$, $E$, $F$, $G$ — and seven lines, each carrying exactly three points, arranged so that every two points share exactly one line. The census is forced before we draw anything: seven lines times three points each gives twenty-one incidences; through each point must run exactly three lines (twenty-one incidences spread over seven points); and every two lines must meet in exactly one point — there is no room for anything else. The structure is the Fano plane, published by Gino Fano in 1892, and Figure 4 draws it the way it has been drawn for a century: a triangle, its three medians, and one circle.' },
    { kind: 'figure', caption: 'Figure 4 — the Fano plane: three sides ($ABF$, $BCD$, $ACE$), three medians ($ADG$, $BEG$, $CFG$) and the circle through $D$, $E$, $F$ — seven lines, three points on each, computed from the exact triangle coordinates.', svg: geo14FanoSvg() },
    { kind: 'table', caption: 'Table 4 — the seven lines of the Fano plane as drawn in Figure 4: each line is a triple of points.', head: ['Drawn as', 'The line (its three points)'], rows: [
      ['side $AB$', '$A, B, F$'],
      ['side $BC$', '$B, C, D$'],
      ['side $AC$', '$A, C, E$'],
      ['median from $A$', '$A, D, G$'],
      ['median from $B$', '$B, E, G$'],
      ['median from $C$', '$C, F, G$'],
      ['the circle', '$D, E, F$'],
    ] },
    { kind: 'para', text: 'Now verify the axioms against the table — this is the model-verification drill, and it is exactly what Illustration 3 will ask you to do unaided. I.1: take any two letters, say $A$ and $D$; scan the seven triples — $A$ and $D$ occur together in exactly one, the median $A, D, G$. The engine performs this scan for all twenty-one pairs of points and finds each pair in exactly one triple: uniqueness holds with zero slack. I.2: every line is a triple, so every line carries three points — at least two, as demanded. I.3: the three points $A$, $B$, $D$ occur together in no triple, so non-collinear points exist. All three axioms hold: the Fano plane is an honest model, seven points strong.' },
    { kind: 'para', text: 'And now the census, which is where the Fano plane stops behaving like a small Euclidean plane and starts behaving like nothing you have seen. Every line carries exactly $3$ points. Through every point run exactly $3$ lines — through $G$, the centre, run the three medians; through $A$ run the two sides and one median. Total incidences: $7 \\times 3 = 21$. Every two points share exactly one line (checked, all twenty-one pairs). And every two LINES meet in exactly one point — the engine sweeps all twenty-one pairs of lines and finds not one disjoint pair. Read that last sentence again. In the Fano plane there are NO parallel lines: every pair of lines crosses, always, in exactly one point.' },
    { kind: 'callout', tone: 'insight', title: 'Note — why the parallel postulate is a separate assumption', text: 'Compare the two small models. The four-point plane HAS parallels — three disjoint pairs, one per class. The Fano plane has NONE — every two lines meet. Both satisfy the very same three incidence axioms. So the existence of parallels CANNOT follow from incidence alone: no theorem about lying-on can force two lines to stay apart, because here is a perfectly honest incidence-world in which no lines stay apart. That is the deepest lesson of this chapter\'s closing lesson: Euclid\'s fifth postulate — through a point, exactly one parallel to a given line — is a genuinely SEPARATE assumption, not a consequence of the joining rules. Chapter 2, where parallels and transversals take centre stage, is built on exactly this separation.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — Fano 1892, and the smallest projective plane', text: 'Gino Fano published the first finite geometries in 1892, seven years before Hilbert\'s Grundlagen, while studying the axioms of projective geometry — the geometry in which no parallel lines exist because every two lines meet. His seven-point plane is the smallest honest projective plane, and it is doubly famous: as the smallest model of the incidence axioms with three points per line, and as the standard counterexample that keeps over-strong "obvious" claims honest. In the combinatorial literature the same seven triples appear under many labellings; ours lists them as $(A, D, G)$, $(B, E, G)$, $(C, F, G)$, $(A, B, F)$, $(A, C, E)$, $(B, C, D)$ and $(D, E, F)$, and the engine checks this labelling against the standard one point by point.' },
    { kind: 'para', text: 'The Fano plane also satisfies the de Bruijn–Erdős floor exactly: seven points, not all collinear, determining exactly seven lines — the bound $n$ attained with zero to spare. And it shows the floor can be attained AWAY from the boundary case of T4: the Fano configuration is not "six collinear points plus one off"; it is a perfectly symmetric seven-fold arrangement. When a bound is attained by two utterly different configurations, the theorem has teeth.' },
    /* ---------------- section: the non-models ---------------- */
    { kind: 'heading', text: 'The Non-Models — What Failing Looks Like' },
    { kind: 'para', text: 'A model is proved by checking every axiom; a NON-model is proved by exhibiting the single axiom it breaks — the failure-drill of Lesson 1.3, now with three separate ways to fail. The three panels of Figure 5 each break exactly one of the planar axioms, and each failure is worth seeing drawn, because each one corresponds to a real mistake that appears in real scripts.' },
    { kind: 'figure', caption: 'Figure 5 — three non-models: two different lines through the same two points (I.1 uniqueness broken); a line whose point-set is a single point (I.2 broken); a two-point world with no third point at all (I.3 broken).', svg: geo14NonModelSvg() },
    { kind: 'para', text: 'Panel one breaks I.1: the points $P$ and $Q$ lie on two different lines — the straight one and the curved one. In the abstract there is no contradiction in WRITING such a structure down (declare two lines, put $P$ and $Q$ on both); the structure simply fails the axiom, and every theorem that needs uniqueness fails with it — T1, T2 and T3 all collapse, because two points no longer fix a line. Panel two breaks I.2: the declared line $R$ contains exactly one point. The declaration is syntactically fine; it merely violates the axiom that every line carries at least two points, and with it the honest use of the word "line" this theory licenses. Panel three breaks I.3 the quietest way possible: a world with only two points in it has no three non-collinear points — not because three points are collinear, but because the third point does not exist. Failure by poverty is still failure.' },
    { kind: 'para', text: 'The moral of the three panels is the same moral as the beer-mug remark of Lesson 1.1, pointed in the opposite direction: the axioms do not describe what points and lines ARE — they constrain what the words are ALLOWED to mean. Break a constraint and the words stop meaning what the theorems need them to mean. This is why model-checking is not a formality: it is the laboratory where the meanings of the undefined words are tested, one axiom at a time.' },
    { kind: 'table', caption: 'Table 5 — the model census compared: the four-point affine plane, the Fano plane, and the Euclidean plane of the full theory.', head: ['Census question', 'Four-point plane', 'Fano plane', 'The Euclidean plane'], rows: [
      ['points', '$4$', '$7$', 'infinitely many'],
      ['lines', '$6$', '$7$', 'infinitely many'],
      ['points on every line', '$2$', '$3$', 'infinitely many'],
      ['lines through every point', '$3$', '$3$', 'infinitely many'],
      ['total incidences', '$12$', '$21$', 'infinite'],
      ['do parallel pairs exist?', 'yes — $3$ classes', 'no — none', 'yes — one parallel per point per direction'],
      ['not all collinear, so lines at least $n$', '$6 \\geq 4$', '$7 \\geq 7$, attained', 'holds, far from tight'],
    ] },
    { kind: 'para', text: 'Read the table column by column and the two small models tell complementary stories. The four-point plane is Euclidean in its parallel behaviour (classes exist, exactly one partner per line) and un-Euclidean in its poverty (two points per line, and a crossing of diagonals that the model itself does not see). The Fano plane is generous by small-model standards (three points per line, three lines per point, perfectly symmetric) and un-Euclidean in the most dramatic way available: no parallels at all. The Euclidean column is the destination; the two small models are the signposts, one showing which parts of the destination are already forced by incidence, the other showing which parts are not forced at all.' },
    { kind: 'example', title: 'Illustration 3 — (Exam-style) Verify the Fano census from the seven-line listing $(A, D, G)$, $(B, E, G)$, $(C, F, G)$, $(A, B, F)$, $(A, C, E)$, $(B, C, D)$, $(D, E, F)$: count points, lines, points per line, lines per point, total incidences, and parallel pairs.', steps: [
      'Count the points: the letters used are $A$, $B$, $C$, $D$, $E$, $F$, $G$ — seven distinct points.',
      'Count the lines: the listing has seven triples — so $7$ lines, each carrying exactly $3$ points (read any triple: three letters, no repeats).',
      'Count through each point: $A$ occurs in $A, D, G$; $A, B, F$; $A, C, E$ — three lines, and the same count of three holds for every letter (check $G$: the three medians; check $D$: side $B, C, D$, median $A, D, G$, circle $D, E, F$).',
      'Total the incidences: $7$ lines with $3$ points each gives $7 \\times 3 = 21$ point-on-line facts — and, cross-checked, $7$ points with $3$ lines each gives the same $21$.',
      'Sweep the line pairs for parallels: every two triples share exactly one letter (for instance the circle $D, E, F$ meets the median $A, D, G$ in $D$ alone), so no two lines are disjoint — zero parallel pairs.',
      'Hence the census verifies in full: $7$ points, $7$ lines, $3$ on each line, $3$ through each point, $21$ incidences, $0$ parallels — every number counted from the listing itself, none taken on trust.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this lands (exam-style)', text: 'School and examination papers draw on this lesson in three shapes, all drilled above. Shape one: line-counting from a figure — given a drawn configuration, count the lines it determines, with the collinear-recount ($15 - 3 + 1 = 13$) as the flagship item. Shape two: the at-most-one-point lemma — state T2 and use it to rule out two-intersection configurations, typically inside a larger proof. Shape three: model verification — given a small incidence structure, check I.1 to I.3 and the census item by item, as in Illustration 3. Olympiad-adjacent items add the de Bruijn–Erdős floor as a proof skeleton. Nothing here claims a real past paper; every item in this lesson and its exercises is an exam-style drill in those shapes, honestly labelled.' },

    /* ---------------- terms + formula cards ---------------- */
    { kind: 'terms', items: [
      { term: 'incidence axiom', def: 'An axiom that says only who lies on whom. Hilbert\'s group I runs to eight; the planar three are I.1 (through two distinct points, exactly one line), I.2 (every line carries at least two points) and I.3 (three non-collinear points exist). None mentions distance, angle or size.' },
      { term: 'existence and uniqueness', def: 'The two halves of every "exactly one" claim: existence promises at least one such object; uniqueness promises at most one. I.1 asserts both in one breath; T1 separates them so each half can be used alone.' },
      { term: 'general position', def: 'A set of points is in general position when no three of them are collinear — the condition under which the line count attains its ceiling $\\binom{n}{2}$, by T3.' },
      { term: 'model', def: 'A structure — a population of "points" with certain sets of them declared "lines" — in which every axiom of a given list reads true. The four-point plane and the Fano plane are models of the planar incidence axioms; the structures of Figure 5 are not.' },
      { term: 'Fano plane', def: 'The seven-point, seven-line structure published by Gino Fano in 1892: three points on every line, three lines through every point, every two points on exactly one line, every two lines meeting in exactly one point — twenty-one incidences and zero parallel pairs.' },
      { term: 'affine plane', def: 'An incidence structure whose parallel behaviour is Euclidean: lines fall into parallel classes of mutually disjoint lines. The four-point affine plane has $4$ points, $6$ lines, $2$ points per line, $3$ lines per point and $3$ parallel classes.' },
      { term: 'parallel classes', def: 'The partition of a model\'s lines into classes of mutually disjoint — parallel — lines. In the four-point plane the classes are $\\{AB, CD\\}$, $\\{AC, BD\\}$ and $\\{AD, BC\\}$: three classes of two lines, covering all six lines once each.' },
      { term: 'de Bruijn–Erdős theorem', def: 'N. G. de Bruijn and P. Erdős, Indagationes Mathematicae 10, 1948: $n$ points, not all collinear, determine at least $n$ lines. The boundary case of $n - 1$ collinear points plus one off their line attains the bound exactly — as does the Fano plane, differently.' },
    ] },
    { kind: 'formula', name: 'The line-count ceiling (T3)', latex: '\\binom{n}{2} = \\frac{n(n-1)}{2} = 1 + 2 + \\cdots + (n-1)', note: 'the exact number of lines determined by $n$ points in general position; the engine pins the sweep $3, 6, 10, 15, 21, 28, 36, 45$ for $n = 3$ to $10$.' },
    { kind: 'formula', name: 'The at-most-one-point lemma (T2)', latex: '\\ell \\neq m \\;\\Longrightarrow\\; \\lvert \\ell \\cap m \\rvert \\leq 1', note: 'two distinct lines share at most one point — the lemma underneath every crossing argument in the book.' },
    { kind: 'formula', name: 'The de Bruijn–Erdős floor (1948)', latex: '\\text{not all collinear} \\;\\Longrightarrow\\; \\text{lines} \\geq n', note: 'the line-count floor; attained by $n - 1$ collinear points plus one off their line, and — differently — by the Fano plane.' },
    { kind: 'formula', name: 'The Fano census (1892)', latex: '7 \\text{ points}, \\; 7 \\text{ lines}, \\; 3 \\text{ on each}, \\; 3 \\text{ through each}, \\; 21 \\text{ incidences}', note: 'and zero parallel pairs — the smallest honest world in which every two lines meet.' },
    { kind: 'formula', name: 'The boundary counts (T4)', latex: '\\text{all collinear} \\Rightarrow 1 \\text{ line}; \\quad n - 1 \\text{ collinear} + 1 \\text{ off} \\Rightarrow n \\text{ lines}', note: 'the collapse case and the floor-attaining case — between them, the whole interval every configuration lives in.' },
    /* ---------------- quiz ---------------- */
    { kind: 'quiz', title: 'Self-Check Quiz', items: [
      { q: 'Hilbert\'s incidence axiom I.1 says that through two distinct points there passes:', options: ['at least one line, and possibly more', 'exactly two lines', 'exactly one line', 'at most one line'], answer: 2,
        explain: 'The correct option is "exactly one line": I.1 merges existence (a line through the two points does exist) with uniqueness (no second, different one does) — and T1 separates the two halves for use one at a time. "At least one, possibly more" keeps existence but drops uniqueness; the whole force of I.1 is that the "possibly more" is forbidden. "Exactly two lines" overcounts: a second line through the same pair cannot exist. "At most one line" keeps uniqueness but drops existence: the joining line is promised, not merely permitted — the axiom asserts both halves in one breath.' },
      { q: 'Five points in general position determine how many lines?', options: ['$5$', '$10$', '$15$', '$25$'], answer: 1,
        explain: 'The correct option is "$10$": by T3 the count is the pair count, $\\binom{5}{2} = \\frac{5 \\cdot 4}{2} = 10$, and the engine pins it by brute force. "$5$" counts the points, not the pairs — the beginner\'s slip. "$15$" is the six-point count $\\binom{6}{2}$, one point too many. "$25$" multiplies $5 \\times 5$, confusing ordered pairs with 2-element subsets: a pair {i, j} is one pair, not two, so the division by two is exactly what the wrong option forgets.' },
      { q: 'In the four-point affine plane, the six lines split into parallel classes. How many classes are there, and what does each contain?', options: ['$1$ class holding all six lines', '$2$ classes of three lines', '$3$ classes of two lines each', '$6$ classes of one line each'], answer: 2,
        explain: 'The correct option is "$3$ classes of two lines each": the disjoint pairs are $\\{AB, CD\\}$, $\\{AC, BD\\}$ and $\\{AD, BC\\}$, and together they partition the six lines — checked on letters, no drawing needed. "$1$ class" fails because lines in one class must be mutually disjoint, and $AB$ meets $AC$ at $A$. "$2$ classes of three" is impossible: three mutually disjoint two-point lines would need six distinct points, and the model has only four. "$6$ classes of one" misunderstands the notion: a class collects lines parallel to each other, and a lone line has no partner to share a class with.' },
      { q: 'Six points are drawn with exactly one collinear triple (and no other three collinear). How many distinct lines do they determine?', options: ['$15$', '$14$', '$13$', '$12$'], answer: 2,
        explain: 'The correct option is "$13$": start from the general-position ceiling $\\binom{6}{2} = 15$, then let the triple merge its three pair-lines into one — $15 - 3 + 1 = 13$, which is also the engine\'s brute-forced count for the exact drawn coordinates. "$15$" ignores the merger entirely. "$14$" subtracts as if only two pairs had been absorbed. "$12$" subtracts the three pairs but forgets to add the single collinear line back — the classic slip flagged in the Caution box, and the reason the adjustment is written $-3 + 1$, not just $-3$.' },
      { q: 'The de Bruijn–Erdős theorem (1948) states that $n$ points, not all collinear, determine:', options: ['exactly $\\binom{n}{2}$ lines, always', 'at most $n$ lines', 'at least $n$ lines, and the bound is attainable', 'at least $n + 1$ lines'], answer: 3,
        explain: 'The correct option is "at least $n$ lines, and the bound is attainable": the theorem is a floor, reached exactly by $n - 1$ collinear points plus one off their line (T4), and reached differently by the Fano plane at $n = 7$. "Exactly $\\binom{n}{2}$" holds only in general position; arrangements with collinear triples fall below the ceiling. "At most $n$" reverses the inequality — general position at $n = 6$ gives $15$ lines, far above $6$. "At least $n + 1$" overshoots: the boundary configuration has exactly $n$ lines, not one more, so the strengthened claim is simply false.' },
    ] },

    /* ---------------- exercises ---------------- */
    { kind: 'exercises', title: 'Exercises — Incidence: how Points, Lines and Planes Interlock', sets: [
      { level: 'L1', questions: [
        {
          q: 'Four points $A$, $B$, $C$, $D$ are placed in general position. How many lines do they determine? Name the lines.',
          solution: [
            'Take the ceiling first: with no three collinear, T3 applies and the count is the pair count.',
            'Compute the pairs: $\\binom{4}{2} = \\frac{4 \\cdot 3}{2} = 6$.',
            'List them to check: $AB$, $AC$, $AD$, $BC$, $BD$, $CD$ — six pairs, and with no three collinear, six distinct lines.',
            'Hence the four points determine $6$ lines: $AB$, $AC$, $AD$, $BC$, $BD$ and $CD$.',
          ],
          answer: '$6$ lines: AB, AC, AD, BC, BD, CD.',
        },
        {
          q: '(i) How many pairs has a 3-element set? (ii) Three points in general position determine how many lines? (iii) And the same three points when collinear?',
          solution: [
            'Count the pairs directly: for elements $a$, $b$, $c$ the pairs are $ab$, $ac$ and $bc$.',
            'So the pair count is $3$ — and by T3, three points in general position give one line per pair: $3$ lines.',
            'Now, when the three are collinear, every pair rides the one common line, so the three pair-lines merge: just $1$ line.',
            'Hence $3$ pairs; $3$ lines in general position; $1$ line when collinear.',
          ],
          answer: '3 pairs; 3 lines in general position; 1 line when collinear.',
        },
      ] },
      { level: 'L2', questions: [
        {
          q: '(i) Seven points in general position determine how many lines? (ii) And eight points in general position?',
          solution: [
            'Apply T3 to each case: the count is $\\binom{n}{2}$ when no three are collinear.',
            'For $n = 7$: $\\binom{7}{2} = \\frac{7 \\cdot 6}{2} = 21$.',
            'For $n = 8$: $\\binom{8}{2} = \\frac{8 \\cdot 7}{2} = 28$.',
            'Check both against the engine census of Table 2: the same two numbers, tabulated and brute-forced.',
            'Hence $21$ lines for seven points and $28$ lines for eight.',
          ],
          answer: '21 lines; 28 lines.',
        },
        {
          q: 'Six points all lie on one line. (i) How many lines do they determine? (ii) Contrast with the same six points in general position.',
          solution: [
            'Take the boundary case of T4: with every point collinear, every pair rides the one common line.',
            'So the six points determine exactly $1$ line, however many pairs they make.',
            'Now, the contrast: in general position the same six points would give $\\binom{6}{2} = 15$ lines.',
            'Hence exactly $1$ line — against $15$ in general position: the same points, a fifteen-fold collapse.',
          ],
          answer: 'exactly 1 line, against 15 in general position.',
        },
        {
          q: 'Name the three parallel classes of the four-point affine plane, and verify that they partition the six lines.',
          solution: [
            'Take the line-list: $AB$, $AC$, $AD$, $BC$, $BD$, $CD$.',
            'Group by shared points: $AB$ shares no point with $CD$; $AC$ none with $BD$; $AD$ none with $BC$ — every other pairing shares a letter, hence a point.',
            'Check the partition: the three pairs $\\{AB, CD\\}$, $\\{AC, BD\\}$, $\\{AD, BC\\}$ list all six lines, each exactly once, with nothing left over.',
            'Hence the classes are $\\{AB, CD\\}$, $\\{AC, BD\\}$ and $\\{AD, BC\\}$: $3$ classes of $2$ lines each.',
          ],
          answer: '{AB, CD}, {AC, BD}, {AD, BC} - 3 classes of 2 lines.',
          figures: [{ caption: 'The three parallel classes, one panel each: bold strokes are the class, faint strokes the remaining four lines.', svg: geo14ClassesSvg() }],
        },
      ] },
      { level: 'L3', questions: [
        {
          q: 'Six points are drawn with exactly one collinear triple (and no other three collinear). How many distinct lines do they determine? Show the arithmetic.',
          solution: [
            'Start from the ceiling: six points in general position would give $\\binom{6}{2} = 15$ lines.',
            'Now, the triple: its three pairs — $P_1P_2$, $P_1P_3$, $P_2P_3$ — all ride the one collinear line, so three pair-lines merge into one.',
            'So subtract the $3$ absorbed pair-lines and add back the $1$ collinear line: $15 - 3 + 1 = 13$.',
            'Check against the engine: it places the six points at the exact drawn coordinates and brute-counts the distinct lines — $13$, with each of the other twelve pairs on its own line.',
            'Hence $13$ distinct lines: $15$ pairs, minus $3$ merged, plus $1$ collinear line.',
          ],
          answer: '13 lines (15 - 3 + 1).',
          figures: [{ caption: 'The recount configuration: the bold line absorbs three pairs; twelve further lines each serve exactly one pair.', svg: geo14RecountSvg() }],
        },
        {
          q: 'Five points include exactly one collinear triple, with no other three collinear. How many lines do they determine?',
          solution: [
            'Start from the ceiling: five points in general position would give $\\binom{5}{2} = 10$ lines.',
            'Now, the triple merges its three pairs into a single line: subtract $3$, add back $1$.',
            'So the count is $10 - 3 + 1 = 8$ — a collinear triple always costs a net $2$ lines.',
            'Hence $8$ lines.',
          ],
          answer: '8 lines.',
        },
        {
          q: 'Prove that two distinct lines meet in at most one point. Then answer: can two distinct lines share exactly two common points?',
          solution: [
            'Suppose the opposite: distinct lines $\\ell$ and $m$ sharing two distinct points $P$ and $Q$.',
            'Then both lines carry $P$ and $Q$, so by T1 — exactly one line through two distinct points — the lines coincide: $\\ell = m$.',
            'This contradicts the lines being distinct, so the assumption fails: no two distinct lines share two points.',
            'Hence two distinct lines meet in at most one point, and no, two distinct lines can never share exactly two common points.',
          ],
          answer: 'No - two distinct lines meet in at most one common point.',
        },
      ] },
      { level: 'L4', questions: [
        {
          q: 'Four points lie on one line, and a fifth point lies off it. How many distinct lines do the five points determine? List them.',
          solution: [
            'Take the boundary case of T4 with $n = 5$: four collinear points plus one off their common line $\\ell$.',
            'The collinear block contributes its single line $\\ell$, however many pairs it contains.',
            'Now, the off-point $Q$ joins each of the four on-line points: $QA$, $QB$, $QC$, $QD$ — four distinct lines, since two of them sharing a second point would force three collinear points involving $Q$.',
            'So the total is $1 + 4 = 5$: the lines $\\ell$, $QA$, $QB$, $QC$ and $QD$.',
            'Hence exactly $5$ lines — the de Bruijn–Erdős bound attained at $n = 5$.',
          ],
          answer: 'exactly 5 lines.',
        },
        {
          q: 'Five points lie on one line, and a sixth lies off it. How many lines do the six points determine? Generalise to $n - 1$ collinear points plus one off.',
          solution: [
            'Take the same boundary shape: five collinear points $P_1$ to $P_5$ on $\\ell$, and $Q$ off it.',
            'The block gives its one line $\\ell$; $Q$ joined to each of the five gives $5$ further distinct lines.',
            'So the total is $1 + 5 = 6$ lines, and the pattern generalises at once: $k$ collinear plus one off gives $k + 1$ lines.',
            'Hence exactly $6$ lines here; in general $n - 1$ collinear plus one off gives $n$ lines.',
          ],
          answer: 'exactly 6 lines; in general n - 1 collinear plus one off gives n lines.',
        },
        {
          q: '(Exam-style) From the seven-line listing $(A, D, G)$, $(B, E, G)$, $(C, F, G)$, $(A, B, F)$, $(A, C, E)$, $(B, C, D)$, $(D, E, F)$, verify the full Fano census: points, lines, points per line, lines per point, total incidences, and parallel pairs.',
          solution: [
            'Count the points: the letters used are $A$, $B$, $C$, $D$, $E$, $F$, $G$ — $7$ distinct points.',
            'Count the lines: $7$ triples, each of size $3$ — so $3$ points on every line.',
            'Count through each point: each letter occurs in exactly $3$ triples — check $A$ (median $A, D, G$, side $A, B, F$, side $A, C, E$) and $G$ (the three medians); the engine checks all seven.',
            'Total the incidences: $7$ lines with $3$ points each gives $7 \\times 3 = 21$, cross-checked as $7$ points times $3$ lines each — the same $21$.',
            'Sweep for parallels: every two triples share exactly one letter (the circle $D, E, F$ meets the median $A, D, G$ in $D$ alone), so no two lines are disjoint.',
            'Hence the census passes in full: $7$ points, $7$ lines, $3$ on each, $3$ through each, $21$ incidences, $0$ parallels.',
          ],
          answer: 'all checks pass: 7 points, 7 lines, 3 on each, 3 through each, 21 incidences, 0 parallels.',
          figures: [{ caption: 'The census as a checklist: six rows, each verified by counting letters in the listing.', svg: geo14FanoCheckSvg() }],
        },
      ] },
      { level: 'L5', questions: [
        {
          q: 'A point $O$ is joined to six outer points arranged so that the six joining lines are all distinct and no outer-pair line passes through $O$. How many lines pass through $O$, and how many distinct lines does the seven-point configuration determine in total?',
          solution: [
            'Take the pencil first: the joining lines $OP_1$ to $OP_6$ are distinct by hypothesis, so exactly $6$ lines pass through $O$.',
            'Now, the outer points: they are in general position, so they contribute $\\binom{6}{2} = 15$ lines among themselves.',
            'No pencil line coincides with an outer-pair line, because the outer-pair lines miss $O$ by hypothesis.',
            'So the total is $6 + 15 = 21$ distinct lines.',
            'Hence $6$ lines through $O$ and $21$ lines in all — the same total the engine pins on its seven-point pencil.',
          ],
          answer: '6 lines through O; 21 lines in all.',
        },
        {
          q: 'Seven points include exactly one collinear triple, with no other three collinear. How many lines do they determine?',
          solution: [
            'Start from the ceiling: seven points in general position would give $\\binom{7}{2} = 21$ lines.',
            'Now, the one collinear triple merges its three pairs into a single line: subtract $3$, add back $1$.',
            'So the count is $21 - 3 + 1 = 19$ — the net loss of $2$ that a collinear triple always costs.',
            'Hence $19$ lines.',
          ],
          answer: '19 lines.',
        },
      ] },
      { level: 'L6', questions: [
        {
          q: 'State the de Bruijn–Erdős theorem precisely, exhibit a configuration of $8$ points that attains the bound, and give the general-position count for comparison.',
          solution: [
            'State it: any $n$ points, not all collinear, determine at least $n$ distinct lines (N. G. de Bruijn and P. Erdős, Indagationes Mathematicae 10, 1948).',
            'Now, attain it at $n = 8$: place $7$ points on one line and the $8$th off it — by T4 the count is $1 + 7 = 8$ lines, the bound attained exactly.',
            'Contrast: the same $8$ points in general position would give $\\binom{8}{2} = 28$ lines, far above the floor.',
            'Hence at least $n$ lines always; $7$ collinear plus $1$ off attains $8 = 8$; general position gives $28$.',
          ],
          answer: 'at least n lines; the bound 8 is attained by 7 collinear plus 1 off; 28 in general position.',
        },
        {
          q: 'Show that the Fano plane contains no parallel lines, and explain why this contradicts nothing proved in this lesson — connect your answer to the status of the parallel postulate.',
          solution: [
            'Take the definition first: two lines are parallel when they share no point — disjoint lines in the same plane.',
            'Now, the Fano census: every two of the seven lines meet in exactly one point; the engine sweeps all twenty-one line-pairs and finds not one disjoint pair.',
            'So no pair of Fano lines is disjoint: parallel lines do not exist in the Fano plane.',
            'Check for contradiction: none — I.1 to I.3 never promise disjoint lines, and T2 caps meetings at one point without ever requiring zero.',
            'Hence every two Fano lines meet, so parallels do not exist there; and that is exactly why the parallel postulate must be assumed separately — incidence alone cannot force parallels into existence.',
          ],
          answer: 'No two Fano lines are parallel - every pair meets; incidence alone cannot force parallels, so the parallel postulate is a separate assumption.',
        },
      ] },
    ] },

    /* ---------------- closing the chapter ---------------- */
    { kind: 'para', text: 'Four lessons, one arc, and the arc is now complete. Lesson 1.1 chose the words the theory would never define — point, line, plane — and the relations that ride beside them. Lesson 1.2 set Euclid\'s five postulates on the table and showed what each one buys. Lesson 1.3 forged the shapes a proof may take — direct, contrapositive, contradictory — and the model method that tests what the words mean. And this lesson drew the first COUNTED consequences of the whole assembly: two points fix one line, two lines share at most one point, $n$ points in general position determine exactly $\\binom{n}{2}$ lines, no not-all-collinear configuration can fall below $n$ lines, and the smallest honest geometries — four points with three parallel classes, seven points with none — prove by existing that parallels are a separate assumption, not an incidence consequence. That is the foundation laid. Chapter 2 now builds on it: angles assembled from rays, parallels assumed one postulate at a time, and the transversal census — the systematic counting of every angle-pair a single crossing line creates — which is this lesson\'s arithmetic, grown up and put to work.' },
    /* APPEND-ANCHOR */
  ],
}


export const chapter1: Chapter = {
  number: 1,
  slug: 'points-lines-and-planes',
  title: 'Points, Lines and Planes: the Axiomatic Idea',
  summary:
    'Geometry restarts from zero — not from shapes but from RULES. The undefined words (point, line, plane), the definitions that ride on them, Euclid\u2019s five postulates as the rules of the game, the shape of a proof itself (direct, contrapositive, contradiction, counterexample — the conditional and its truth table), and incidence: the first theorems the rules buy, from the two-points-one-line axiom to the counted world of the four-point and Fano planes. The reader meets the axiomatic method end to end: a statement is believed only when proved, and everything before the first proof is either an agreement or a promise.',
  status: 'complete',
  lessons: [lessonGeo101, lessonGeo102, lessonGeo103, lessonGeo104],
  plannedLessons: [],
}
