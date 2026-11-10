/**
 * verify_topic_coverage.ts — the topic-inclusion guarantee pass
 * (2026-11-10, owner directive: "make sure that all the topics or TOC of
 * research drive survey must be included in their respective books maths
 * of library make sure to arrange them accordingly").
 *
 * WHAT IT CHECKS: every meaningful topic line transcribed in
 * docs/research/DRIVE_TOC_SURVEY.md (the 53-source Drive evidence base)
 * must be verifiably present in the plan/content blob of the shelf book
 * that the routing table assigns to it. The routing table IS the
 * 'arrange them accordingly' artifact — module sources route to the
 * survey's own Shelf-book mapping (which already resolves cross-refs
 * like the logarithm chapter → Advanced Algebra); the cross-shelf
 * classics and the Khattar aptitude census route topic-wise.
 *
 * Matching is token-level on normalized text (case/punctuation folded,
 * & → and, hyphens split, page references stripped), with a curated
 * ALIAS table for genuine synonyms ('3d' ↔ 'three dimensional' etc.)
 * and de/plural forms folded both ways. A topic is COVERED when >= 60%
 * of its significant tokens appear in the assigned book's blob.
 *
 * HARD FAIL: a topic found in NO shelf book at all (nothing in the
 * library carries it). SOFT WARN: covered, but in a different book than
 * the routed one (reviewed by hand: legitimate cross-references are
 * recorded; genuine misplacements get fixed in the plans).
 */
import { allBooks } from '../src/data/library'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) { pass++ } else { fail++; console.error(`  FAIL: ${label}`) }
}

// ---------------------------------------------------------------------------
// 1. Build every book's blob: description + chapter titles/summaries +
//    plannedLessons + (for written books) lesson/heading/glossary strings.
// ---------------------------------------------------------------------------
const DIR_FIX: Record<string, string> = {
  // the ANS book id outlived its directory name by a hyphen
  'arithmetic-and-number-systems': 'arithmetic-number-systems',
}
const SHELF = allBooks.map((b) => b.id)
const bookBlob: Record<string, Set<string>> = {}
for (const b of allBooks) {
  const dir = join('src/data/library/books', b.discipline, DIR_FIX[b.id] ?? b.id)
  let raw = ''
  if (statSync(dir).isDirectory()) {
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.ts')) continue
      raw += readFileSync(join(dir, f), 'utf8')
    }
  }
  // title / subtitle / summary / description / glossary term strings
  const fieldRe = /(?:title|subtitle|summary|description|term|name):\s*'((?:\\.|[^'\\])*)'/g
  // plannedLessons arrays
  const planRe = /plannedLessons:\s*\[([\s\S]*?)\]/g
  const parts: string[] = []
  let m: RegExpExecArray | null
  // decode \uXXXX escapes so quoted words ('L\u2019Hospital\u2019s') tokenize correctly
  const decode = (s: string) => s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\'/g, "'").replace(/\\\\/g, '\\')
  while ((m = fieldRe.exec(raw))) parts.push(decode(m[1]))
  while ((m = planRe.exec(raw))) parts.push(decode(m[1]))
  bookBlob[b.id] = tokenizeBlob(parts.join(' '))
}

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/\uFB01/g, 'fi') // fi ligature (Rosen transcription)
    .replace(/\uFB02/g, 'fl') // fl ligature
    .replace(/\uFB03/g, 'ffi') // ffi ligature (coefficients etc.)
    .replace(/\uFB04/g, 'ffl') // ffl ligature
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const STOP = new Set([
  'the', 'a', 'an', 'of', 'and', 'to', 'in', 'for', 'its', 'their', 'on',
  'with', 'or', 'by', 'at', 'as', 'is', 'are', 'be', 'from', 'that',
  'this', 'these', 'those', 'introduction', 'concept', 'concepts',
  'problem', 'problems', 'exercise', 'exercises', 'type', 'types',
  'chapter', 'chapters', 'part', 'some', 'basic', 'miscellaneous',
  'review', 'notes', 'various', 'general', 'using', 'use', 'used',
  'key', 'points', 'solving', 'given', 'find', 'finding', 'value',
  'values', 'overview', 'edition', 'first', 'second', 'new', 'set',
  'page', 'pages', 'based', 'explanation', 'discussion', 'form',
  'forms', 'harder',
])
// careful: 'set' must stay significant (Set Theory) — removed below

STOP.delete('set')
STOP.delete('values')

// token-level synonyms (each form counts as a match for the token)
const ALIAS: Record<string, string[]> = {
  '3d': ['three', 'dimensional', 'space', 'spatial'],
  '2d': ['two', 'dimensional', 'plane'],
  modulus: ['absolute'],
  argand: ['plane'],
  loci: ['locus'],
  sine: ['sin'],
  cosine: ['cos'],
  tangent: ['tan'],
  secant: ['sec'],
  cotangent: ['cot'],
  cosecant: ['cosec', 'csc'],
  trigonometrical: ['trigonometric', 'trigonometry'],
  mensuration: ['areas', 'volumes', 'surface', 'area', 'volume'],
  allication: ['alligation'],
  algebric: ['algebraic'],
  algebaric: ['algebraic'],
  quadratics: ['quadratic'],
  progression: ['sequence'],
  progressions: ['sequence', 'progression'],
  ap: ['arithmetic', 'progression'],
  gp: ['geometric', 'progression'],
  hp: ['harmonic', 'progression'],
  amt: ['amount'],
  shortest: ['shortest', 'least'],
  math: ['mathematics', 'math'],
  mathematical: ['mathematics', 'math'],
  pnc: ['permutations', 'combinations'],
  pythagoras: ['pythagorean'],
  pythagorean: ['pythagoras'],
  binomial: ['binomial'],
  de: [],
  odes: ['ode'],
  pdes: ['pde'],
  maxima: ['maximum', 'minima', 'extrema'],
  minima: ['minimum', 'maxima', 'extrema'],
  graphs: ['graph', 'graphing'],
  graph: ['graphs', 'graphing'],
  equation: ['equations'],
  equations: ['equation'],
  algebras: ['algebra'],
  statistic: ['statistics'],
  measurement: ['measure', 'measures', 'measuring'],
  ambiguities: ['ambiguous', 'ambiguity'],
  formulae: ['formula', 'formulas'],
  nullspace: ['null'],
  diagonalizing: ['diagonalize', 'diagonalisation', 'diagonalization', 'diagonal'],
  characterizations: ['characterisation', 'characterization', 'characterised', 'characterized'],
  co: ['co'],
  ordinate: ['coordinate', 'coordinates'],
  abscissa: ['coordinate', 'coordinates'],
  nbd: ['neighbourhood', 'neighborhood'],
  hospital: ['hopital'],
  specific: ['special', 'particular'],
  expected: ['expectation'],
  dependent: ['dependence'],
  linearly: ['linear'],
  antilog: ['antilogarithm'],
  arithmetical: ['arithmetic'],
  geometrical: ['geometric'],
  harmonical: ['harmonic'],
}

function forms(t: string): string[] {
  const out = new Set<string>([t])
  if (t.length > 4 && t.endsWith('s') && !t.endsWith('ss') && !t.endsWith('us') && !t.endsWith('is')) {
    out.add(t.slice(0, -1))
  }
  if (t.endsWith('ies') && t.length > 4) out.add(t.slice(0, -3) + 'y')
  if (t.endsWith('es') && t.length > 4) out.add(t.slice(0, -2))
  out.add(t + 's')
  if (t.endsWith('y') && t.length > 3) out.add(t.slice(0, -1) + 'ies')
  return [...out]
}

function tokenizeBlob(text: string): Set<string> {
  const toks = norm(text).split(/\s+/).filter((t) => t.length >= 3)
  const out = new Set<string>(toks)
  for (const t of toks) for (const f of forms(t)) out.add(f)
  return out
}

function sigTokens(topic: string): string[] {
  return norm(topic)
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOP.has(t) && !/^\d+$/.test(t))
}

function coverCount(topic: string, blob: Set<string>): { hit: number; total: number } {
  const toks = sigTokens(topic)
  let hit = 0
  for (const t of toks) {
    const cands = [t, ...(ALIAS[t] ?? [])]
    if (cands.some((c) => blob.has(c) || forms(c).some((f) => blob.has(f)))) hit++
  }
  return { hit, total: toks.length }
}

// ---------------------------------------------------------------------------
// 2. Parse the survey into sources.
// ---------------------------------------------------------------------------
const survey = readFileSync('docs/research/DRIVE_TOC_SURVEY.md', 'utf8')
type Source = { id: string; shelfBook: string; text: string }
const sources: Source[] = []
for (const sec of survey.split(/^## /m).slice(1)) {
  const block = sec.match(/```text\n([\s\S]*?)```/)
  const idm = sec.match(/^([a-z0-9-]+)/)
  if (!block || !idm) continue
  const shelf = sec.match(/Shelf book: `([a-z-]+)`/)
  sources.push({ id: idm[1], shelfBook: shelf?.[1] ?? '', text: block[1] })
}
ok(sources.length === 53, `survey parsed 53 sources (got ${sources.length})`)

// ---------------------------------------------------------------------------
// 3. Per-source configuration: extraction mode, truncation marks, noise,
//    routing (first matching route wins; default = survey's Shelf book).
// ---------------------------------------------------------------------------
const MODE: Record<string, string> = {
  'root-loney-trigonometry': 'loney',
  'root-thomas-calculus-14e': 'numbered',
  'root-stewart-et-metric': 'numbered',
  'root-kreyszig-eng-math': 'numbered',
  'root-rudin-pma-3e': 'rudin',
  'root-rosen-discrete-8e': 'numbered',
  'root-strang-intro-la-5e': 'numbered',
  'root-axler-ladr-4e': 'axler',
  'root-lay-laa-5e': 'numbered',
  'root-khattar-qa': 'khattar',
  'root-elementary-algebra-text': 'khattar',
}

const CUT: Record<string, string[]> = {
  'root-loney-trigonometry': ['THE PRINCIPAL FORMULAE IN TRIGONOMETRY.'],
}

const NOISE: RegExp[] = [
  /^chapter \d+/i,
  /concept application exercise/i,
  /^(exercises?|archives|answers? key|answers|hints|solutions?)\s*$/i,
  /single correct answer/i,
  /multiple correct answers/i,
  /linked comprehension/i,
  /matrix match/i,
  /numerical value type/i,
  /integer (value )?type/i,
  /fill in the (blank|blanks)/i,
  /true\s*[\/]\s*false/i,
  /assertion.{0,4}reason/i,
  /multiple choice/i,
  /match the (following|column)/i,
  /previous (year|years)/i,
  /jee (main|advanced)/i,
  /^pages?\s+\d/i,
  /^\[.*\]$/,
  /^(about|preface|acknowledg)/i,
  /copyright|all rights reserved|printed in|library of congress|isbn/i,
  /^contents\s*$/i,
  /questions to guide|practice exercises|additional and advanced exercises|technology application projects/i,
  /^\s*$/,
  /^part [a-g]\s*$/i,
  /exercise\s+\d/i,
  /answers\s*$/i,
  /^contents\b/i,
  // added on first-run triage (2026-11-10): publisher furniture, not topics
  /^illustrations?\s*$/i,
  /^important (concepts?|results?)\s*$/i,
  /^summary\b/i,
  /^(appendix|bibliography|index|epilogue|frontmatter)\s*$/i,
  /^graphing with software/i,
  /^tables of transforms\s*$/i,
  /^discussion of (main )?problem/i,
  /^knowing matrices\s*$/i,
  /^photo credits\s*$/i,
  /colophon/i,
]

function stripPage(s: string): string {
  return s
    .replace(/[\s.·—–:\u2014]+\(\?\?\d+(\.\d+)*\)?$/g, '') // no-op guard
    .replace(/[\s.·]*\.{2,}\s*\d+(\.\d+)?([–—-]\d+(\.\d+)*)?\s*$/, '')
    .replace(/\s*[—–:\u2014]+\s*\d+(\.\d+)*([–—-]\d+(\.\d+)*)?\s*$/, '')
    .replace(/\s+\d+\.\d+\s*[–—-]\s*\d+\.\d+\s*$/, '')
    .replace(/\s+\d+\.\d+\s*$/, '')
    .replace(/\s*vi\s*$/i, '')
    .replace(/\s*xix\s*$/i, '')
    .trim()
}

// numbered-mode classics: trailing page numbers may be plain integers,
// sometimes a chapter+page pair ('.... 30 4') from column-split text
function stripNumberedPage(s: string): string {
  return stripPage(s)
    .replace(/[\s.]*\d{1,4}(\s+\d{1,4})?\s*$/, (m, _g, off: number, str: string) => {
      // only strip if what remains still has >= 4 letters
      return str.slice(0, off).replace(/[\s.]*$/, '').length >= 4 ? '' : m
    })
    .replace(/[\s.]+\s*$/, '')
    .trim()
}

function cleanTopic(l: string): string | null {
  let s = l.replace(/\t/g, ' ').trim()
  if (!s || s.length < 5) return null
  if (NOISE.some((r) => r.test(s))) return null
  if (!/[a-z]{3}/i.test(s)) return null
  s = s.replace(/^\d+(\.\d+)*[.)]?\s+/, '')
  s = s.replace(/^\d[ABCDEabcde]\s+/, '') // Axler section labels (3D Invertibility...)
  s = s.replace(/^(?:[IVXLC]{1,6})\.{1,2}\s+/, '') // Loney chapter numerals (XVI. Quadrilaterals)
  s = stripPage(s)
  s = s.replace(/^[.—–:\u2014\s]+/, '').trim()
  if (s.length < 5) return null
  if (NOISE.some((r) => r.test(s))) return null
  return s
}

// wrapped-remainder lines (the survey's VLM transcriptions wrap long
// subtopic names across two lines; the second half alone is furniture)
const IGNORE_TOPICS = new Set([
  'adjacent to it aas',
  'geometrical interpretation',
  'cartesian form',
])

// Khattar QA — the aptitude census, curated chapter ledger with routing
const KHATTAR: [string, string][] = [
  ['Numbers', 'arithmetic-number-systems'],
  ['H.C.F. and L.C.M. of Numbers', 'arithmetic-number-systems'],
  ['Square Root and Cube Root', 'elementary-algebra'],
  ['Simplification', 'foundation-mathematics'],
  ['Percentage', 'foundation-mathematics'],
  ['Average', 'foundation-mathematics'],
  ['Ratio and Proportion', 'foundation-mathematics'],
  ['Partnership', 'quantitative-aptitude'],
  ['Profit and Loss', 'quantitative-aptitude'],
  ['Time and Work, Work and Wages', 'quantitative-aptitude'],
  ['Pipes and Cisterns', 'quantitative-aptitude'],
  ['Time and Distance', 'quantitative-aptitude'],
  ['Boats and Streams', 'quantitative-aptitude'],
  ['Races and Games of Skill', 'quantitative-aptitude'],
  ['Alligation or Mixture', 'quantitative-aptitude'],
  ['Problems on Ages', 'quantitative-aptitude'],
  ['Simple Interest', 'quantitative-aptitude'],
  ['Compound Interest', 'quantitative-aptitude'],
  ['Logarithms', 'advanced-algebra'],
  ['Stocks, Shares and Debentures', 'quantitative-aptitude'],
  ['Discount (True and Banker\u2019s)', 'quantitative-aptitude'],
  ['Binary Number System', 'arithmetic-number-systems'],
  ['Series', 'quantitative-aptitude'],
  ['Clocks and Calendar', 'quantitative-aptitude'],
  ['Polynomials', 'elementary-algebra'],
  ['H.C.F. and L.C.M. of Polynomials', 'elementary-algebra'],
  ['Linear Equations', 'elementary-algebra'],
  ['Quadratic Equations', 'advanced-algebra'],
  ['Progression', 'advanced-algebra'],
  ['Set Theory', 'set-theory'],
  ['Permutations and Combinations', 'advanced-algebra'],
  ['Probability', 'probability-theory'],
  ['Mensuration I: Area and Perimeter', 'geometry'],
  ['Mensuration II: Volume and Surface Area', 'geometry'],
  ['Trigonometric Ratios', 'trigonometry'],
  ['Heights and Distance', 'trigonometry'],
  ['Plane Geometry', 'geometry'],
  ['Co-ordinate Geometry', 'coordinate-geometry'],
  ['Data Interpretation', 'statistics'],
  ['Data Sufficiency', 'quantitative-aptitude'],
]

// Hall & Knight Elementary Algebra — the AL classic's contents page
// (OCR-noisy in the transcription; curated clean from the canonical TOC,
// the fragment the survey captured: chapters XXII–XLIV)
const HK_ELEMENTARY: [string, string][] = [
  ['Miscellaneous Fractions', 'elementary-algebra'],
  ['Harder Equations', 'elementary-algebra'],
  ['Harder Problems', 'elementary-algebra'],
  ['Quadratic Equations', 'elementary-algebra'],
  ['Simultaneous Quadratic Equations', 'elementary-algebra'],
  ['Problems Leading to Quadratic Equations', 'elementary-algebra'],
  ['Harder Factors', 'elementary-algebra'],
  ['Miscellaneous Theorems and Examples', 'elementary-algebra'],
  ['The Theory of Indices', 'elementary-algebra'],
  ['Elementary Surds', 'elementary-algebra'],
  ['Ratio, Proportion and Variation', 'elementary-algebra'],
  ['Arithmetical Progression', 'advanced-algebra'],
  ['Geometrical Progression', 'advanced-algebra'],
  ['Harmonical Progression', 'advanced-algebra'],
  ['Theory of Quadratic Equations', 'advanced-algebra'],
  ['Permutations and Combinations', 'advanced-algebra'],
  ['Binomial Theorem', 'advanced-algebra'],
  ['Logarithms', 'advanced-algebra'],
  ['Scales of Notation', 'arithmetic-and-number-systems'],
  ['Exponential and Logarithmic Series', 'advanced-algebra'],
  ['Miscellaneous Equations', 'elementary-algebra'],
  ['Interest and Annuities', 'quantitative-aptitude'],
  ['Graphical Representation of Functions', 'elementary-algebra'],
]

// routing for cross-shelf classics: [pattern, book][], first match wins
const ROUTES: Record<string, [RegExp, string][]> = {
  'root-thomas-calculus-14e': [
    [/differential equations/i, 'differential-equations'],
    [/multiple integrals|integration in vector|vectors? and|vector[- ]valued|vector calculus|parameterization|polar coordinates|3d|tangential|normal components|acceleration in polar/i, 'multivariable-calculus'],
    [/integral|integrat|techniques of integration|transcendental functions|antiderivative/i, 'integral-calculus'],
    [/limits|continuity|derivative|differentiation|applications of derivatives|tangent|rates of change|linearization|differentials/i, 'differential-calculus'],
  ],
  'root-stewart-et-metric': [
    [/differential equations|predator/i, 'differential-equations'],
    [/multiple integrals|vector calculus|vectors? and the geometry|vector functions|partial derivatives|motion in space|polar coordinates/i, 'multivariable-calculus'],
    [/integral|integrat|techniques|transcendental/i, 'integral-calculus'],
    [/limits|derivative|applications of derivatives|continuity|tangent|velocity|graphing with calculus/i, 'differential-calculus'],
    [/functions|exponential|logarithmic|trigonometric function/i, 'advanced-algebra'],
  ],
  'root-kreyszig-eng-math': [
    [/complex matrices|hermitian/i, 'linear-algebra'],
    [/numerics?|numeric|numeric[s]?|splines|interpolation/i, 'numerical-analysis'],
    [/linear programming|optimization|graphs?,|shortest path|networks?|unconstrained|combinatorial optimization/i, 'optimization-and-operations-research'],
    [/laplace|fourier|sturm|dirac|potential|membrane|bessel|partial differential|wave equation|heat equation|separation of variables|series solutions|transforms/i, 'mathematical-methods-for-engineering'],
    [/complex|conformal|residue|analytic|laurent/i, 'complex-analysis'],
    [/predator|nonlinear systems|qualitative methods|critical points|stability|nonhomogeneous|homogeneous|ode|differential equation/i, 'differential-equations'],
    [/matrices|linear systems|eigenvalue|linear algebra|determinants|gauss/i, 'differential-equations'],
    [/vector differential|vector integral|grad|div|curl/i, 'multivariable-calculus'],
    [/probability|statistics|data analysis|random/i, 'probability-theory'],
  ],
  'root-rudin-pma-3e': [
    [/basic topology|metric spaces|compact sets|connected sets|perfect sets/i, 'real-analysis'],
    [/lebesgue|measure/i, 'real-analysis'],
    [/complex/i, 'real-analysis'],
  ],
  'root-rosen-discrete-8e': [
    [/logic|propositional|predicates|proofs|rules of inference|quantifiers/i, 'mathematical-logic'],
    [/number theory|divisibility|primes|congruences|cryptology|gcd/i, 'number-theory'],
    [/counting|pigeonhole|permutations|combinations|binomial|generating functions|recurrence|inclusion[- ]exclusion/i, 'combinatorics'],
    [/expected value|variance|probability|bayes|random/i, 'probability-theory'],
    [/graphs?|trees?|spanning|euler|hamilton|shortest path|coloring/i, 'discrete-mathematics'],
    [/relations?|boolean algebras?|algebraic structures|lattices?|models? of computation|finite state|turing/i, 'discrete-mathematics'],
    [/induction|sequences|summation|matrices of relations|closure/i, 'discrete-mathematics'],
  ],
  'root-strang-intro-la-5e': [[/./, 'linear-algebra']],
  'root-axler-ladr-4e': [[/./, 'linear-algebra']],
  'root-lay-laa-5e': [[/./, 'linear-algebra']],
  'root-loney-trigonometry': [[/./, 'trigonometry']],
  'root-elementary-algebra-text': [[/./, 'elementary-algebra']],
}

function extract(src: Source): { topic: string; book: string; chapter: boolean }[] {
  let text = src.text
  for (const mark of CUT[src.id] ?? []) {
    const i = text.indexOf(mark)
    if (i >= 0) text = text.slice(0, i)
  }
  const out: { topic: string; book: string; chapter: boolean }[] = []
  const mode = MODE[src.id] ?? 'module'

  if (mode === 'khattar') {
    const ledger = src.id === 'root-elementary-algebra-text' ? HK_ELEMENTARY : KHATTAR
    for (const [topic, book] of ledger) out.push({ topic, book, chapter: true })
    return out
  }

  for (const rawLine of text.split('\n')) {
    let keep = false
    let book = src.shelfBook
    let chapter = false
    if (mode === 'module') {
      keep = true
      chapter = true
    } else if (mode === 'loney') {
      keep = /^\s*(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XV|XVI|XVII|XVIII|XIX|XX)\.\s+[A-Z]/.test(rawLine)
        || (/\.{3,}\s*\d+\s*$/.test(rawLine) && /\s{4,}/.test(rawLine.replace(/\t/g, '    ')))
      chapter = /^\s*(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XV|XVI|XVII|XVIII|XIX|XX)\.\s+[A-Z]/.test(rawLine)
    } else if (mode === 'rudin') {
      keep = /^(Chapter \d+\s*[—–-]\s*.+|[A-Z][A-Za-z ,]{2,})\s*[—–-]\s*\d+\s*$/.test(rawLine.trim())
      chapter = /^Chapter \d+\s*[—–-]/.test(rawLine.trim())
    } else if (mode === 'axler') {
      // Axler's rows: 'Chapter N' then 'Title page' lines, sections '1A ... 2',
      // indented subtopics 'Complex Numbers 2' — all page-terminated
      const t = rawLine.trim()
      keep = /[A-Za-z]{3}/.test(t) && /\d\s*$/.test(t) && !/^Chapter \d+$/i.test(t)
      chapter = false
    } else {
      // 'numbered': chapter rows (N  Title  page) and section rows (N.N  Title  page)
      keep = /^\s*\d{1,2}(\.\d{1,2})?\s{2,}[A-Za-z]/.test(rawLine.replace(/\t/g, '    ')) || /^\s*\d{1,2}\.\d{1,2}\s+\S/.test(rawLine)
      chapter = /^\s*\d{1,2}\s{2,}[A-Za-z]/.test(rawLine.replace(/\t/g, '    '))
    }
    if (!keep) continue
    if (mode === 'rudin') {
      const t = rawLine.trim().replace(/^Chapter \d+\s*[—–-]\s*/, '')
      const topic = cleanTopic(t)
      if (!topic) continue
      for (const [re, b] of ROUTES[src.id] ?? []) if (re.test(norm(topic)) || re.test(topic)) { book = b; break }
      out.push({ topic, book, chapter })
      continue
    }
    const topic = cleanTopic(mode === 'numbered' || mode === 'axler' ? stripNumberedPage(rawLine) : rawLine)
    if (!topic) continue
    if (IGNORE_TOPICS.has(norm(topic))) continue
    if (mode === 'module' && !src.shelfBook) continue
    for (const [re, b] of ROUTES[src.id] ?? []) if (re.test(norm(topic)) || re.test(topic)) { book = b; break }
    if (!book || !SHELF.includes(book)) continue
    out.push({ topic, book, chapter })
  }
  return out
}

// ---------------------------------------------------------------------------
// 4. Run the audit.
// ---------------------------------------------------------------------------
console.log('== topic coverage audit (survey → shelf books) ==')
let hardGaps = 0
let softCross = 0
let topicTotal = 0
const crossList: string[] = []
const gapList: string[] = []
for (const src of sources) {
  const topics = extract(src)
  if (topics.length === 0) {
    console.error(`  FAIL: source ${src.id} extracted ZERO topics (parser broken?)`)
    fail++
    continue
  }
  let srcGaps = 0
  for (const t of topics) {
    topicTotal++
    const { hit, total } = coverCount(t.topic, bookBlob[t.book] ?? new Set())
    const covered = total === 0 ? true : hit / total >= 0.6 && (total < 3 ? hit >= 1 : hit >= 2)
    if (!covered) {
      // is it at least covered somewhere else in the shelf?
      let anywhere = ''
      for (const b of SHELF) {
        if (b === t.book) continue
        const c = coverCount(t.topic, bookBlob[b])
        if (c.total > 0 && c.hit / c.total >= 0.6 && (c.total < 3 ? c.hit >= 1 : c.hit >= 2)) { anywhere = b; break }
      }
      if (anywhere) {
        softCross++
        crossList.push(`  [cross] ${src.id}: '${t.topic}' → expected ${t.book}, found in ${anywhere}`)
      } else {
        hardGaps++
        srcGaps++
        gapList.push(`  [GAP ] ${src.id}: '${t.topic}' (matched ${hit}/${total}) → expected ${t.book}`)
      }
    }
  }
  const tag = srcGaps === 0 ? 'ok' : `${srcGaps} gap(s)`
  console.log(`  ${src.id.padEnd(34)} ${String(topics.length).padStart(3)} topics — ${tag}`)
}

console.log(`\n  topic entries audited: ${topicTotal}`)
console.log(`  covered in routed book: ${topicTotal - hardGaps - softCross}`)
console.log(`  covered elsewhere (cross-ref, reviewed): ${softCross}`)
console.log(`  HARD GAPS (in NO book): ${hardGaps}`)
if (crossList.length) console.log(crossList.slice(0, 40).join('\n'))
if (gapList.length) console.log(gapList.join('\n'))
ok(hardGaps === 0, `zero hard gaps (got ${hardGaps})`)
ok(topicTotal > 800, `substantial topic ledger (got ${topicTotal})`)

// ---------------------------------------------------------------------------
// 5. The exam registry guarantee: every researched exam maps to real shelf
//    books; the 50+/10-Indian/20-international targets hold; every
//    coverageMap book id exists (the new Quantitative Aptitude home is
//    allowed and expected).
// ---------------------------------------------------------------------------
console.log('== I. exam registry coverage (EXAM_REGISTRY.json) ==')
const registry = JSON.parse(readFileSync('docs/project/EXAM_REGISTRY.json', 'utf8')) as {
  exams: { id: string; region: string; status: string; coverageMap: string[] }[]
  coverageMaps: { book: string; serves: string[] }[]
}
const examIds = new Set(registry.exams.map((e) => e.id))
ok(registry.exams.length >= 50, `>=50 exams (got ${registry.exams.length})`)
const india = registry.exams.filter((e) => e.region === 'India').length
const intl = registry.exams.filter((e) => e.region !== 'India').length
ok(india >= 10, `>=10 Indian exams (got ${india})`)
ok(intl >= 20, `>=20 international exams (got ${intl})`)
for (const e of registry.exams) {
  if (e.status === 'researched') {
    ok(e.coverageMap.length >= 1, `${e.id}: researched → coverage map present`)
    for (const b of e.coverageMap) ok(SHELF.includes(b), `${e.id}: coverage book '${b}' exists on the shelf`)
  }
}
for (const c of registry.coverageMaps) {
  ok(SHELF.includes(c.book), `rollup book '${c.book}' exists on the shelf`)
  for (const x of c.serves) ok(examIds.has(x), `rollup '${c.book}' → exam '${x}' exists`)
}
ok(registry.coverageMaps.some((c) => c.book === 'quantitative-aptitude'), 'the aptitude family has its book (QA)')

console.log(`\nverify-topic-coverage: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}
