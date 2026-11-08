/**
 * Custom Book Builder — the content discovery & matching engine.
 *
 * For every requested topic this engine searches the Main Academic Library:
 *   1. exact title matches
 *   2. equivalent names & synonyms (curated academic alias groups)
 *   3. subject / chapter / book hierarchies (chapter & book expansions)
 *   4. matching topics, subtopics and learning units (concept & term hits)
 *   5. prerequisite topics already written in the library
 *   6. duplicate selections are removed (one record, one place)
 *   7. results ranked by relevance; alternatives surfaced to the user
 *
 * It never generates, fetches or invents content. A topic with no
 * sufficiently-related record is reported `not_available` — honestly.
 */
import { CATALOG, type LibraryLessonRecord } from './catalog'
import type {
  CoverageSummary,
  LibrarySelection,
  MatchCandidate,
  MatchStatus,
  ParsedInput,
  TopicMatch,
  TopicNode,
} from './types'

/* ------------------------------------------------------------------ */
/* Normalisation                                                       */
/* ------------------------------------------------------------------ */

const STOPWORDS = new Set([
  'the', 'a', 'an', 'of', 'in', 'and', 'or', 'to', 'for', 'with', 'on', 'at', 'by', 'from',
  'into', 'introduction', 'basics', 'basic', 'fundamentals', 'elements', 'study', 'notes',
  'overview', 'brief', 'part', 'various', 'using',
])

const LEADINS = [
  /^introduction to /,
  /^introduction /,
  /^the study of /,
  /^basics of /,
  /^fundamentals of /,
  /^elements of /,
]

export function normalizeTitle(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function coreTitle(s: string): string {
  let n = normalizeTitle(s)
  for (const re of LEADINS) n = n.replace(re, '')
  return n.trim()
}

function singularize(w: string): string {
  if (w.length >= 5 && /ies$/.test(w)) return w.slice(0, -3) + 'y'
  if (w.length >= 4 && !/[su]s$/.test(w) && /s$/.test(w)) return w.slice(0, -1)
  return w
}

export function contentTokens(s: string): string[] {
  return normalizeTitle(s)
    .split(' ')
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(singularize)
}

/* ------------------------------------------------------------------ */
/* Academic synonym groups                                             */
/* ------------------------------------------------------------------ */

/**
 * Curated equivalence groups: surface forms (normalised) that refer to the
 * same academic concept. Topic-side matching is exact surface equality;
 * record-side matching is whole-phrase containment in titles/concepts/terms.
 * Groups are domain-honest — nothing is merged that isn't truly equivalent.
 */
const SYNONYM_GROUPS: string[][] = [
  ['highest common factor', 'hcf', 'greatest common divisor', 'gcd', 'greatest common factor'],
  ['least common multiple', 'lowest common multiple', 'lcm'],
  ['factorization', 'factorisation', 'factoring'],
  ['exponent', 'exponents', 'power', 'powers', 'index', 'indices', 'laws of exponents', 'law of indices'],
  ['linear equation', 'linear equations', 'linear equations in one variable', 'first degree equations', 'equations in one variable'],
  ['quadratic equations', 'second degree equations'],
  ['place value', 'place values', 'positional notation', 'positional system', 'place value system'],
  ['number system', 'number systems', 'numeral system', 'numeral systems', 'numeration'],
  ['divisibility', 'divisibility rules', 'tests of divisibility', 'rules of divisibility'],
  ['prime numbers', 'primes', 'primality'],
  ['fraction', 'fractions', 'fractional arithmetic'],
  ['decimal', 'decimals', 'decimal fractions', 'decimal representation'],
  ['percentage', 'percentages', 'percent', 'per cent'],
  ['integers', 'integer arithmetic', 'signed numbers', 'directed numbers', 'negative numbers'],
  ['ratio', 'ratios', 'proportion', 'proportions', 'ratio and proportion', 'proportionality'],
  ['multiplication', 'multiply', 'multiplying', 'products', 'product'],
  ['division', 'divide', 'dividing', 'quotient', 'quotients'],
  ['addition', 'add', 'adding', 'sum', 'sums'],
  ['subtraction', 'subtract', 'subtracting', 'difference', 'differences'],
  ['order of operations', 'operator precedence', 'precedence of operators', 'pemdas', 'bodmas', 'bidmas'],
  ['sieve of eratosthenes', 'eratosthenes sieve'],
  ['fundamental theorem of arithmetic', 'unique factorization', 'unique prime factorization', 'unique factorisation'],
  ['equation', 'equations', 'mathematical sentence', 'mathematical sentences'],
  ['algebraic expression', 'algebraic expressions', 'expression', 'expressions'],
  ['expansion', 'expanding', 'expanding brackets', 'distributive law', 'distributive property', 'distributivity'],
  ['brackets', 'bracket', 'parentheses', 'grouping symbols'],
  ['substitution', 'substituting', 'evaluation of expressions'],
  ['collecting like terms', 'like terms', 'combining like terms', 'simplifying expressions', 'simplification'],
  ['mean', 'average', 'averages', 'arithmetic mean'],
  ['remainder', 'remainders', 'division algorithm'],
]

interface NormGroup {
  canonical: string
  surfaces: string[]
}

const NORM_GROUPS: NormGroup[] = SYNONYM_GROUPS.map((group) => ({
  canonical: normalizeTitle(group[0]),
  surfaces: Array.from(new Set(group.map(normalizeTitle))),
}))

/** Alias keys a *requested topic* carries (exact surface equality). */
function topicAliasKeys(tq: string, tcore: string): Set<string> {
  const keys = new Set<string>()
  for (const g of NORM_GROUPS) {
    if (g.surfaces.includes(tq) || g.surfaces.includes(tcore)) keys.add(g.canonical)
  }
  return keys
}

/** Alias keys present in a blob of normalised record text (phrase containment). */
function blobAliasKeys(blob: string): Set<string> {
  const keys = new Set<string>()
  const padded = ` ${blob} `
  for (const g of NORM_GROUPS) {
    for (const s of g.surfaces) {
      if (s.length >= 3 && padded.includes(` ${s} `)) {
        keys.add(g.canonical)
        break
      }
    }
  }
  return keys
}

/* ------------------------------------------------------------------ */
/* Indexes                                                             */
/* ------------------------------------------------------------------ */

interface IndexedRecord {
  rec: LibraryLessonRecord
  normTitle: string
  coreTitle: string
  normChapter: string
  normBook: string
  titleTokens: Set<string>
  tokenSet: Set<string>
  conceptNorms: string[]
  termNorms: string[]
  aliasKeys: Set<string>
  blob: string
}

const INDEX: IndexedRecord[] = CATALOG.lessons.map((rec) => {
  const conceptNorms = rec.concepts.map(normalizeTitle)
  const termNorms = rec.terms.map(normalizeTitle)
  const normTitle = normalizeTitle(rec.lessonTitle)
  const normChapter = normalizeTitle(rec.chapterTitle)
  const normBook = normalizeTitle(rec.bookTitle)
  const titleTokens = new Set(contentTokens(rec.lessonTitle))
  const tokenSet = new Set([
    ...contentTokens(`${rec.lessonTitle} ${rec.concepts.join(' ')} ${rec.terms.join(' ')}`),
  ])
  /* alias phrases come from the lesson's OWN title/concepts/terms — the
   * chapter & book titles belong to the grouping level, not the lesson */
  const blob = [normTitle, ...rec.concepts.map(normalizeTitle), ...rec.terms.map(normalizeTitle)].join(' ')
  return {
    rec,
    normTitle,
    coreTitle: coreTitle(rec.lessonTitle),
    normChapter,
    normBook,
    titleTokens,
    tokenSet,
    conceptNorms,
    termNorms,
    aliasKeys: blobAliasKeys(blob),
    blob: ` ${blob} `,
  }
})

interface IndexedGrouping {
  key: string
  label: string
  normTitle: string
  coreTitle: string
  titleTokens: Set<string>
  aliasKeys: Set<string>
  recordIds: string[]
  kind: 'book' | 'chapter'
}

const CHAPTER_INDEX: IndexedGrouping[] = CATALOG.chapters.map((ch) => {
  const blob = normalizeTitle(`${ch.chapterTitle} ${ch.bookTitle}`)
  return {
    key: ch.key,
    label: `${ch.bookTitle} · ${ch.chapterTitle}`,
    normTitle: normalizeTitle(ch.chapterTitle),
    coreTitle: coreTitle(ch.chapterTitle),
    titleTokens: new Set(contentTokens(ch.chapterTitle)),
    aliasKeys: blobAliasKeys(blob),
    recordIds: ch.lessonRecordIds,
    kind: 'chapter' as const,
  }
})

const BOOK_INDEX: IndexedGrouping[] = CATALOG.books.map((b) => {
  const blob = normalizeTitle(`${b.title} ${b.subtitle}`)
  return {
    key: b.bookId,
    label: b.title,
    normTitle: normalizeTitle(b.title),
    coreTitle: coreTitle(b.title),
    titleTokens: new Set(contentTokens(`${b.title} ${b.subtitle}`)),
    aliasKeys: blobAliasKeys(blob),
    recordIds: b.lessonRecordIds,
    kind: 'book' as const,
  }
})

/* ------------------------------------------------------------------ */
/* Status thresholds                                                   */
/* ------------------------------------------------------------------ */

export function statusForScore(score: number): MatchStatus {
  if (score >= 0.95) return 'exact'
  if (score >= 0.75) return 'equivalent'
  if (score >= 0.45) return 'partial'
  return 'not_available'
}

/* ------------------------------------------------------------------ */
/* Scoring                                                             */
/* ------------------------------------------------------------------ */

function candidate(ix: IndexedRecord, score: number, via: string): MatchCandidate {
  const { rec } = ix
  return {
    recordId: rec.recordId,
    lessonNumber: rec.lessonNumber,
    lessonTitle: rec.lessonTitle,
    chapterTitle: rec.chapterTitle,
    bookTitle: rec.bookTitle,
    location: `${rec.bookTitle} · Chapter ${rec.chapterNumber} · ${rec.chapterTitle}`,
    url: rec.url,
    words: rec.words,
    score: Math.round(score * 100) / 100,
    via,
  }
}

/** Score one lesson record against a requested topic. */
function scoreRecord(topic: string, tq: string, tcore: string, tTokens: string[], ix: IndexedRecord): { score: number; via: string } {
  /* 1. exact title equality */
  if (tq === ix.normTitle || (tcore && tcore === ix.coreTitle)) {
    return { score: 1, via: 'exact title match' }
  }

  /* 2. synonyms / equivalent names */
  const tKeys = topicAliasKeys(tq, tcore)
  if (tKeys.size > 0) {
    for (const k of tKeys) {
      if (ix.aliasKeys.has(k)) {
        return { score: 0.93, via: 'equivalent academic name (synonym group)' }
      }
    }
  }

  /* 3. key concept / defined term equality */
  if (ix.conceptNorms.includes(tq) || ix.conceptNorms.includes(tcore)) {
    return { score: 0.9, via: 'matches a key concept of this lesson' }
  }
  if (ix.termNorms.includes(tq) || ix.termNorms.includes(tcore)) {
    return { score: 0.88, via: 'matches a term defined in this lesson' }
  }

  /* 4. containment — every topic token appears in the lesson TITLE.
   * Rated *partial*: sharing every title token does not make a lesson
   * equivalent to the requested topic (e.g. “Linear Algebra” vs a lesson
   * that merely mentions linear combinations in its concepts). */
  if (tTokens.length >= 2 && tTokens.every((t) => ix.titleTokens.has(t))) {
    return { score: 0.7, via: 'topic tokens contained in this lesson title' }
  }

  /* 5. reverse containment — lesson title inside the requested topic */
  const titleTokensArr = Array.from(ix.titleTokens)
  if (titleTokensArr.length >= 2 && titleTokensArr.every((t) => tTokens.includes(t))) {
    return { score: 0.66, via: 'lesson title is part of the requested topic' }
  }

  /* 6. partial token overlap (guarded against generic single-token hits) */
  if (tTokens.length >= 2) {
    const common = tTokens.filter((t) => ix.tokenSet.has(t))
    const union = new Set([...tTokens, ...ix.tokenSet])
    const j = common.length / union.size
    if (common.length >= 2 && j >= 0.45) {
      return { score: 0.45 + 0.3 * j, via: 'partial overlap with this lesson' }
    }
  }

  return { score: 0, via: '' }
}

/** Try to match the topic to a whole chapter or whole book. */
function matchGrouping(
  tq: string,
  tcore: string,
  tTokens: string[],
  kind: 'book' | 'chapter',
): { grouping: IndexedGrouping; score: number; via: string } | null {
  const list = kind === 'book' ? BOOK_INDEX : CHAPTER_INDEX
  let best: { grouping: IndexedGrouping; score: number; via: string } | null = null
  for (const g of list) {
    let score = 0
    let via = ''
    if (tq === g.normTitle || (tcore && tcore === g.coreTitle)) {
      score = 0.86
      via = `title of a library ${kind}`
    } else {
      const tKeys = topicAliasKeys(tq, tcore)
      let aliasHit = false
      for (const k of tKeys) {
        if (g.aliasKeys.has(k)) {
          aliasHit = true
          break
        }
      }
      if (aliasHit) {
        score = 0.83
        via = `equivalent name of a library ${kind}`
      } else if (tTokens.length >= 2 && tTokens.every((t) => g.titleTokens.has(t))) {
        score = 0.8
        via = `topic is the scope of a library ${kind}`
      }
    }
    if (score > 0 && (!best || score > best.score)) best = { grouping: g, score, via }
  }
  return best
}

/* ------------------------------------------------------------------ */
/* Matching one topic                                                  */
/* ------------------------------------------------------------------ */

interface RawMatch {
  requested: string
  parent: string
  root: string
  hasChildren: boolean
  score: number
  via: string
  best: MatchCandidate | null
  alternatives: MatchCandidate[]
  expanded: { kind: 'book' | 'chapter'; label: string; recordIds: string[] } | null
}

function matchTopic(topic: string, parent: string): Omit<RawMatch, 'root' | 'hasChildren'> {
  const tq = normalizeTitle(topic)
  const tcore = coreTitle(topic)
  const tTokens = contentTokens(topic)

  /* whole-book and whole-chapter candidates */
  const bookHit = matchGrouping(tq, tcore, tTokens, 'book')
  const chapterHit = matchGrouping(tq, tcore, tTokens, 'chapter')

  /* lesson-level candidates */
  const scored: { ix: IndexedRecord; score: number; via: string }[] = []
  for (const ix of INDEX) {
    const { score, via } = scoreRecord(topic, tq, tcore, tTokens, ix)
    if (score > 0) scored.push({ ix, score, via })
  }
  /* rank: score, then parent-context relevance, then shorter titles */
  const parentTokens = new Set(contentTokens(parent || ''))
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    const pa = a.ix.tokenSet.size > 0 && [...parentTokens].some((t) => a.ix.tokenSet.has(t)) ? 1 : 0
    const pb = b.ix.tokenSet.size > 0 && [...parentTokens].some((t) => b.ix.tokenSet.has(t)) ? 1 : 0
    if (pb !== pa) return pb - pa
    return a.ix.normTitle.length - b.ix.normTitle.length
  })

  const topLesson = scored[0]
  /* books win ties over chapters: a topic matching both is really about
   * the whole book (the chapter is contained in it anyway) */
  const groupBest =
    bookHit && (!chapterHit || bookHit.score >= chapterHit.score - 0.001) ? bookHit : chapterHit

  /* A whole-chapter/book match is the more complete answer for a broad
   * topic, so it wins unless a lesson is an EXACT title match (≥ 0.95). */
  if (groupBest && (!topLesson || topLesson.score < 0.95)) {
    return {
      requested: topic,
      parent,
      score: groupBest.score,
      via: groupBest.via,
      best: candidateOfRecord(groupBest.grouping.recordIds[0], groupBest.score, groupBest.via),
      alternatives: topLesson
        ? [candidate(topLesson.ix, topLesson.score, topLesson.via)]
        : [],
      expanded: {
        kind: groupBest.grouping.kind,
        label: groupBest.grouping.label,
        recordIds: groupBest.grouping.recordIds,
      },
    }
  }

  if (topLesson) {
    const alts = scored
      .slice(1, 5)
      .filter((s) => s.score >= 0.45)
      .map((s) => candidate(s.ix, s.score, s.via))
    return {
      requested: topic,
      parent,
      score: topLesson.score,
      via: topLesson.via,
      best: candidate(topLesson.ix, topLesson.score, topLesson.via),
      alternatives: alts,
      expanded: null,
    }
  }

  return { requested: topic, parent, score: 0, via: '', best: null, alternatives: [], expanded: null }
}

function candidateOfRecord(recordId: string, score: number, via: string): MatchCandidate | null {
  const ix = INDEX.find((i) => i.rec.recordId === recordId)
  return ix ? candidate(ix, score, via) : null
}

/* ------------------------------------------------------------------ */
/* Tree walking                                                        */
/* ------------------------------------------------------------------ */

function walk(nodes: TopicNode[], parent: string, root: string, out: RawMatch[], cache: Map<string, Omit<RawMatch, 'root' | 'hasChildren'>>): void {
  for (const node of nodes) {
    const key = normalizeTitle(node.topic)
    let base = cache.get(key)
    if (!base) {
      base = matchTopic(node.topic, parent)
      cache.set(key, base)
    }
    out.push({
      ...base,
      requested: node.topic,
      parent,
      root,
      hasChildren: (node.children?.length ?? 0) > 0,
    })
    if (node.children?.length) {
      walk(node.children, node.topic, root || node.topic, out, cache)
    }
  }
}

/** Match every node of a parsed input against the library. */
export function matchParsed(input: ParsedInput): RawMatch[] {
  const out: RawMatch[] = []
  walk(input.nodes, input.rootName, '', out, new Map())
  return out
}

/* ------------------------------------------------------------------ */
/* Selections (Method 2 — direct picks)                                */
/* ------------------------------------------------------------------ */

/** Turn explicit library picks into synthetic exact matches. */
export function selectionToMatches(selection: LibrarySelection): RawMatch[] {
  const out: RawMatch[] = []
  const seen = new Set<string>()

  for (const bookId of selection.bookIds ?? []) {
    const book = CATALOG.bookById.get(bookId)
    if (!book) continue
    out.push({
      requested: book.title,
      parent: book.disciplineTitle,
      root: book.title,
      hasChildren: false,
      score: 1,
      via: 'whole book selected from the library',
      best: candidateOfRecord(book.lessonRecordIds[0], 1, 'whole book selected from the library'),
      alternatives: [],
      expanded: { kind: 'book', label: book.title, recordIds: book.lessonRecordIds },
    })
    for (const id of book.lessonRecordIds) seen.add(id)
  }

  for (const chapterKey of selection.chapterIds ?? []) {
    const chapter = CATALOG.chapterByKey.get(chapterKey)
    if (!chapter) continue
    const label = `${chapter.bookTitle} · ${chapter.chapterTitle}`
    out.push({
      requested: chapter.chapterTitle,
      parent: chapter.bookTitle,
      root: label,
      hasChildren: false,
      score: 1,
      via: 'whole chapter selected from the library',
      best: candidateOfRecord(chapter.lessonRecordIds[0], 1, 'whole chapter selected from the library'),
      alternatives: [],
      expanded: { kind: 'chapter', label, recordIds: chapter.lessonRecordIds },
    })
    for (const id of chapter.lessonRecordIds) seen.add(id)
  }

  for (const lessonId of selection.lessonIds ?? []) {
    const rec = CATALOG.lessonById.get(lessonId)
    if (!rec || seen.has(lessonId)) continue
    seen.add(lessonId)
    out.push({
      requested: rec.lessonTitle,
      parent: rec.chapterTitle,
      root: `${rec.bookTitle} · ${rec.chapterTitle}`,
      hasChildren: false,
      score: 1,
      via: 'selected directly from the library',
      best: {
        recordId: rec.recordId,
        lessonNumber: rec.lessonNumber,
        lessonTitle: rec.lessonTitle,
        chapterTitle: rec.chapterTitle,
        bookTitle: rec.bookTitle,
        location: `${rec.bookTitle} · Chapter ${rec.chapterNumber} · ${rec.chapterTitle}`,
        url: rec.url,
        words: rec.words,
        score: 1,
        via: 'selected directly from the library',
      },
      alternatives: [],
      expanded: null,
    })
  }

  return out
}

/* ------------------------------------------------------------------ */
/* Prerequisites, coverage, assembly                                   */
/* ------------------------------------------------------------------ */

/** Record ids a set of raw matches would place into a custom book. */
export function selectedRecordIds(raw: RawMatch[]): Set<string> {
  const ids = new Set<string>()
  for (const m of raw) {
    if (m.expanded) {
      for (const id of m.expanded.recordIds) ids.add(id)
    } else if (m.best) {
      ids.add(m.best.recordId)
    }
  }
  return ids
}

function withPrerequisites(raw: RawMatch[]): TopicMatch[] {
  const selected = selectedRecordIds(raw)
  return raw.map((m) => {
    let prerequisiteRecordIds: string[] = []
    let prerequisitesAvailable: boolean | null = null
    if (m.best) {
      const rec = CATALOG.lessonById.get(m.best.recordId)
      if (rec) {
        const prereqs = rec.prerequisites
        prerequisitesAvailable = prereqs.every((id) => CATALOG.lessonById.has(id))
        prerequisiteRecordIds = prereqs.filter(
          (id) => CATALOG.lessonById.has(id) && !selected.has(id),
        )
      }
    }
    return {
      requested: m.requested,
      parent: m.parent,
      root: m.root,
      status: statusForScore(m.score),
      confidence: Math.round(m.score * 100) / 100,
      best: m.best,
      alternatives: m.alternatives,
      expanded: m.expanded,
      prerequisiteRecordIds,
      prerequisitesAvailable,
    }
  })
}

export function computeCoverage(matches: TopicMatch[]): CoverageSummary {
  const requested = matches.length
  let exact = 0
  let equivalent = 0
  let partial = 0
  let notAvailable = 0
  for (const m of matches) {
    if (m.status === 'exact') exact++
    else if (m.status === 'equivalent') equivalent++
    else if (m.status === 'partial') partial++
    else notAvailable++
  }
  const percent = requested === 0 ? 0 : Math.round(((exact + equivalent + 0.5 * partial) / requested) * 1000) / 10
  return { requested, exact, equivalent, partial, notAvailable, percent }
}

/* ------------------------------------------------------------------ */
/* Public entry point                                                  */
/* ------------------------------------------------------------------ */

/** Attach prerequisite info and finalise statuses. */
export function toTopicMatches(raw: RawMatch[]): TopicMatch[] {
  return withPrerequisites(raw)
}

export function matchRequirements(input: ParsedInput, selection?: LibrarySelection): TopicMatch[] {
  const raw = [...matchParsed(input), ...selectionToMatches(selection ?? {})]
  return withPrerequisites(raw)
}

export type { RawMatch }
