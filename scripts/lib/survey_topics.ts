/**
 * survey_topics.ts — shared machinery for the survey-derived audits.
 *
 * Extracted verbatim from scripts/verify_topic_coverage.ts (the green
 * topic-inclusion gate, 2026-11-10) so the lesson-level gate
 * scripts/verify_toc_as_lessons.ts audits EXACTLY the same topic ledger
 * (same parsing, same routing, same token matching) against the shelf's
 * LESSON TITLES instead of the whole book blob.
 *
 * Exports: loadSurvey() → topics[] where each topic carries
 * { topic, book, chapter, source } — book = the routed shelf book id.
 */
import { readFileSync } from 'fs'

// ---------------------------------------------------------------------------
// token machinery (identical to verify_topic_coverage.ts)
// ---------------------------------------------------------------------------
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

const ALIAS: Record<string, string[]> = {
  '3d': ['three', 'dimensional', 'space', 'spatial'],
  '2d': ['two', 'dimensional', 'plane'],
  matrices: ['matrix'],
  multiplication: ['product'],
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

export function tokenizeBlob(text: string): Set<string> {
  const toks = norm(text).split(/\s+/).filter((t) => t.length >= 3)
  const out = new Set<string>(toks)
  for (const t of toks) for (const f of forms(t)) out.add(f)
  return out
}

export function sigTokens(topic: string): string[] {
  return norm(topic)
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOP.has(t) && !/^\d+$/.test(t))
}

export function coverCount(topic: string, blob: Set<string>): { hit: number; total: number } {
  const toks = sigTokens(topic)
  let hit = 0
  for (const t of toks) {
    const cands = [t, ...(ALIAS[t] ?? [])]
    if (cands.some((c) => blob.has(c) || forms(c).some((f) => blob.has(f)))) hit++
  }
  return { hit, total: toks.length }
}

export function coveredIn(topic: string, blob: Set<string>): boolean {
  const { hit, total } = coverCount(topic, blob)
  return total === 0 ? true : hit / total >= 0.6 && (total < 3 ? hit >= 1 : hit >= 2)
}

// ---------------------------------------------------------------------------
// survey parsing (identical to verify_topic_coverage.ts)
// ---------------------------------------------------------------------------
export type SurveySource = { id: string; shelfBook: string; text: string }

const survey = readFileSync('docs/research/DRIVE_TOC_SURVEY.md', 'utf8')

export const sources: SurveySource[] = []
for (const sec of survey.split(/^## /m).slice(1)) {
  const block = sec.match(/```text\n([\s\S]*?)```/)
  const idm = sec.match(/^([a-z0-9-]+)/)
  if (!block || !idm) continue
  const shelf = sec.match(/Shelf book: `([a-z-]+)`/)
  sources.push({ id: idm[1], shelfBook: shelf?.[1] ?? '', text: block[1] })
}

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
  // publisher furniture, not topics
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
  // added on the lesson-level pass (2026-11-11): transcription furniture
  /\[cover\/title page\]/i,
  /^Note:/i,
  /^\(Pages \d+/i,
  /^Pseudocode\b/i,
  /\s+A-\s*$/,
  /^symbol index/i,
]

function stripPage(s: string): string {
  return s
    .replace(/[\s.\u00b7\u2014\u2013:]+\(\?\?\d+(\.\d+)*\)?$/g, '') // no-op guard
    .replace(/[\s.\u00b7]*\.{2,}\s*\d+(\.\d+)?([\u2013\u2014-]\d+(\.\d+)*)?\s*$/, '')
    .replace(/\s*[\u2014\u2013:]+\s*\d+(\.\d+)*([\u2013\u2014-]\d+(\.\d+)*)?\s*$/, '')
    .replace(/\s+\d+\.\d+\s*[\u2013\u2014-]\s*\d+\.\d+\s*$/, '')
    .replace(/\s+\d+\.\d+\s*$/, '')
    .replace(/\s+vi\s*$/i, '')
    .replace(/\s+xix\s*$/i, '')
    .trim()
}

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
  s = s.replace(/^[.\u2014\u2013:\s]+/, '').trim()
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
  // wrapped-remainder fragments surfaced by the lesson-level pass
  'under different conditions',
  'obtained by algebraic operations on two',
  'continuity of function differently defined for',
  'intersect at two points',
  'intersect at more than two points',
  'without getting inverse function',
])

// Khattar QA — the aptitude census, curated chapter ledger with routing
const KHATTAR: [string, string][] = [
  ['Numbers', 'arithmetic-and-number-systems'],
  ['H.C.F. and L.C.M. of Numbers', 'arithmetic-and-number-systems'],
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
  ['Binary Number System', 'arithmetic-and-number-systems'],
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
    [/differential equations|autonomous/i, 'differential-equations'],
    [/hyperbolic/i, 'mathematical-methods-for-engineering'],
    [/numerical integration/i, 'numerical-analysis'],
    [/natural logarithms|combining functions/i, 'advanced-algebra'],
    [/conic sections/i, 'coordinate-geometry'],
    [/related rates/i, 'differential-calculus'],
    [/sigma notation/i, 'integral-calculus'],
    [/integrals of vector functions|line integrals|vector fields|work, circulation|double and iterated integrals|multiple integrals|integration in vector|vectors? and|vector[- ]valued|vector calculus|parameterization|polar coordinates|3d|tangential|normal components|acceleration in polar|triple integrals|cylindrical|spherical/i, 'multivariable-calculus'],
    [/integral|integrat|techniques of integration|transcendental functions|antiderivative/i, 'integral-calculus'],
    [/limits|continuity|derivative|differentiation|applications of derivatives|tangent|rates of change|linearization|differentials/i, 'differential-calculus'],
  ],
  'root-stewart-et-metric': [
    [/differential equations|predator/i, 'differential-equations'],
    [/multiple integrals|vector calculus|vectors? and the geometry|vector functions|partial derivatives|motion in space|polar coordinates|double integrals|triple integrals|cylindrical|spherical|curl and divergence|divergence theorem|change of variables in multiple/i, 'multivariable-calculus'],
    [/hyperbolic/i, 'mathematical-methods-for-engineering'],
    [/testing series/i, 'real-analysis'],
    [/approximate integration/i, 'numerical-analysis'],
    [/four ways to represent/i, 'advanced-algebra'],
    [/average value|net change/i, 'integral-calculus'],
    [/related rates|rates of change|maximum and minimum values/i, 'differential-calculus'],
    [/conic sections/i, 'coordinate-geometry'],
    [/integral|integrat|techniques|transcendental/i, 'integral-calculus'],
    [/limits|derivative|applications of derivatives|continuity|tangent|velocity|graphing with calculus/i, 'differential-calculus'],
    [/functions|exponential|logarithmic|trigonometric function/i, 'advanced-algebra'],
  ],
  'root-kreyszig-eng-math': [
    [/matrix multiplication/i, 'linear-algebra'],
    [/complex matrices|hermitian/i, 'linear-algebra'],
    [/numerics?|numeric|numeric[s]?|splines|interpolation/i, 'numerical-analysis'],
    [/linear programming|optimization|graphs?,|shortest path|networks?|unconstrained|combinatorial optimization/i, 'optimization-and-operations-research'],
    [/laplace|fourier|sturm|dirac|potential|membrane|bessel|partial differential|wave equation|heat equation|separation of variables|series solutions|transforms/i, 'mathematical-methods-for-engineering'],
    [/forced oscillations/i, 'differential-equations'],
    [/uniform convergence/i, 'real-analysis'],
    [/singularit/i, 'complex-analysis'],
    [/complex|conformal|residue|analytic|laurent/i, 'complex-analysis'],
    [/predator|nonlinear systems|qualitative methods|critical points|stability|nonhomogeneous|homogeneous|ode|differential equation/i, 'differential-equations'],
    [/matrices|linear systems|eigenvalue|linear algebra|determinants|gauss/i, 'differential-equations'],
    [/vector and scalar functions|vector differential|vector integral|grad|div|curl/i, 'multivariable-calculus'],
    [/probability|statistics|data analysis|random/i, 'probability-theory'],
  ],
  'root-rudin-pma-3e': [
    [/basic topology|metric spaces|compact sets|connected sets|perfect sets/i, 'real-analysis'],
    [/lebesgue|measure/i, 'real-analysis'],
    [/complex/i, 'real-analysis'],
  ],
  'root-rosen-discrete-8e': [
    [/logic|propositional|predicates|proofs|rules of inference|quantifiers/i, 'mathematical-logic'],
    [/number theory|divisibility|primes|congruences|crypt|gcd/i, 'number-theory'],
    [/counting|pigeonhole|permutations|combinations|binomial|generating functions|recurrence|inclusion[- ]exclusion/i, 'combinatorics'],
    [/expected value|variance|probability|bayes|random/i, 'probability-theory'],
    [/graphs?|trees?|spanning|euler|hamilton|shortest path|coloring|planar/i, 'discrete-mathematics'],
    [/relations?|boolean algebras?|algebraic structures|lattices?|models? of computation|finite state|turing/i, 'discrete-mathematics'],
    [/induction|sequences|summation|matrices of relations|closure/i, 'discrete-mathematics'],
  ],
  'root-strang-intro-la-5e': [
    [/linear programming/i, 'optimization-and-operations-research'],
    [/numerical|iterative|precondition/i, 'numerical-analysis'],
    [/./, 'linear-algebra'],
  ],
  'root-axler-ladr-4e': [[/./, 'linear-algebra']],
  'root-lay-laa-5e': [
    [/constrained optimization|linear programming|matrix games|polytopes|hyperplanes|convex combinations|affine/i, 'optimization-and-operations-research'],
    [/iterative estimates|power method/i, 'numerical-analysis'],
    [/./, 'linear-algebra'],
  ],
  'root-loney-trigonometry': [[/./, 'trigonometry']],
  'root-elementary-algebra-text': [[/./, 'elementary-algebra']],
}

function extract(src: SurveySource): { topic: string; book: string; chapter: boolean }[] {
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
      keep = /^(Chapter \d+\s*[\u2014\u2013-]\s*.+|[A-Z][A-Za-z ,]{2,})\s*[\u2014\u2013-]\s*\d+\s*$/.test(rawLine.trim())
      chapter = /^Chapter \d+\s*[\u2014\u2013-]/.test(rawLine.trim())
    } else if (mode === 'axler') {
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
      const t = rawLine.trim().replace(/^Chapter \d+\s*[\u2014\u2013-]\s*/, '')
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
    if (!book) continue
    out.push({ topic, book, chapter })
  }
  return out
}

export type SurveyTopic = { topic: string; book: string; chapter: boolean; source: string }

export function loadSurvey(): SurveyTopic[] {
  const all: SurveyTopic[] = []
  for (const src of sources) {
    for (const t of extract(src)) all.push({ ...t, source: src.id })
  }
  return all
}
