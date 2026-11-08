/**
 * Custom Book Builder — table-of-contents generation & validation.
 *
 * Builds the proposed custom TOC from match results:
 *  - a requested top-level topic that matched a whole book/chapter becomes
 *    custom chapter(s) holding the expanded library records;
 *  - leaf matches are grouped under their requested top-level topic;
 *  - every record appears at most once in the book (no duplicate content);
 *  - reordering happens later in the editor — the Main Library hierarchy is
 *    never modified, only referenced.
 */
import { CATALOG, getLessonRecord } from './catalog'
import { computeCoverage, selectedRecordIds, toTopicMatches, type RawMatch } from './matcher'
import type { CoverageSummary, TocChapterDraft, TocItemDraft, TopicMatch } from './types'

/** Group expanded record ids by their library chapter, in library order. */
function groupByLibraryChapter(recordIds: string[]): Map<string, string[]> {
  const groups = new Map<string, string[]>()
  for (const id of recordIds) {
    const rec = getLessonRecord(id)
    if (!rec) continue
    const key = `${rec.bookId}:${rec.chapterNumber}`
    const arr = groups.get(key) ?? []
    arr.push(id)
    groups.set(key, arr)
  }
  return groups
}

/**
 * Assemble the proposed TOC from raw matches (call before the prerequisite
 * pass — the shape only depends on selections/expansions).
 */
export function buildTocProposal(raw: RawMatch[]): TocChapterDraft[] {
  const chapters: TocChapterDraft[] = []
  const seen = new Set<string>()

  const findOrCreate = (title: string): TocChapterDraft => {
    let ch = chapters.find((c) => c.title === title)
    if (!ch) {
      ch = { title, items: [] }
      chapters.push(ch)
    }
    return ch
  }

  const addItem = (ch: TocChapterDraft, item: TocItemDraft): void => {
    if (seen.has(item.recordId)) return
    seen.add(item.recordId)
    ch.items.push(item)
  }

  for (const m of raw) {
    if (m.score <= 0) continue

    if (m.expanded) {
      if (m.hasChildren) {
        /* a requested group that itself matched a book/chapter: one custom
         * chapter under the requested name, holding every expanded record */
        const ch = findOrCreate(m.root || m.requested)
        for (const id of m.expanded.recordIds) {
          addItem(ch, {
            recordId: id,
            requestedTopic: m.requested,
            via: `${m.expanded.kind} match · ${m.expanded.label}`,
            confidence: m.score,
          })
        }
      } else {
        /* a leaf request that maps onto whole chapters: mirror the library's
         * own chapter structure (titled Book · Chapter) */
        for (const [chapterKey, ids] of groupByLibraryChapter(m.expanded.recordIds)) {
          const chRec = CATALOG.chapterByKey.get(chapterKey)
          const title = chRec ? `${chRec.bookTitle} · ${chRec.chapterTitle}` : m.expanded.label
          const ch = findOrCreate(title)
          for (const id of ids) {
            addItem(ch, {
              recordId: id,
              requestedTopic: m.requested,
              via: `${m.expanded.kind} match · ${m.expanded.label}`,
              confidence: m.score,
            })
          }
        }
      }
      continue
    }

    if (m.best) {
      const ch = findOrCreate(m.root || m.parent || m.requested)
      addItem(ch, {
        recordId: m.best.recordId,
        requestedTopic: m.requested,
        via: m.via,
        confidence: m.score,
      })
    }
  }

  return chapters.filter((c) => c.items.length > 0)
}

/** Full pipeline output for a set of raw matches (with prerequisites). */
export interface AssembledMatch {
  matches: TopicMatch[]
  toc: TocChapterDraft[]
  coverage: CoverageSummary
  totalWords: number
  totalLessons: number
}

export function assemble(raw: RawMatch[]): AssembledMatch {
  const matches: TopicMatch[] = toTopicMatches(raw)
  const toc = buildTocProposal(raw)
  const ids = selectedRecordIds(raw)
  let totalWords = 0
  for (const id of ids) {
    const rec = getLessonRecord(id)
    if (rec) totalWords += rec.words
  }

  return {
    matches,
    toc,
    coverage: computeCoverage(matches),
    totalWords,
    totalLessons: ids.size,
  }
}

/* ------------------------------------------------------------------ */
/* Validation (server-side, on save/publish)                           */
/* ------------------------------------------------------------------ */

export interface TocValidationResult {
  ok: boolean
  errors: string[]
  /** cleaned structure: deduped, empty chapters dropped, positions normalised */
  toc: TocChapterDraft[]
}

/**
 * Validate a client-supplied TOC against the live library: every record id
 * must exist, no duplicates, non-empty chapters. Rejects anything that
 * references non-existent content — custom books may only reference real
 * canonical records.
 */
export function validateToc(toc: unknown): TocValidationResult {
  const errors: string[] = []
  if (!Array.isArray(toc)) {
    return { ok: false, errors: ['TOC must be an array of chapters'], toc: [] }
  }
  const seen = new Set<string>()
  const cleaned: TocChapterDraft[] = []

  for (const rawChapter of toc) {
    if (!rawChapter || typeof rawChapter !== 'object') {
      errors.push('each chapter must be an object')
      continue
    }
    const ch = rawChapter as { title?: unknown; items?: unknown }
    const title = typeof ch.title === 'string' ? ch.title.trim() : ''
    if (!title) {
      errors.push('every chapter needs a title')
      continue
    }
    if (!Array.isArray(ch.items)) {
      errors.push(`chapter “${title}” needs an items array`)
      continue
    }
    const items: TocItemDraft[] = []
    for (const rawItem of ch.items) {
      if (!rawItem || typeof rawItem !== 'object') {
        errors.push(`chapter “${title}” has an invalid item`)
        continue
      }
      const it = rawItem as Record<string, unknown>
      if (typeof it.recordId !== 'string' || !getLessonRecord(it.recordId)) {
        errors.push(`chapter “${title}” references an unknown library record`)
        continue
      }
      if (seen.has(it.recordId)) {
        errors.push(`duplicate content: a lesson may appear only once per book (${it.recordId})`)
        continue
      }
      seen.add(it.recordId)
      items.push({
        recordId: it.recordId,
        requestedTopic: typeof it.requestedTopic === 'string' ? it.requestedTopic : undefined,
        via: typeof it.via === 'string' ? it.via : undefined,
        confidence: typeof it.confidence === 'number' ? it.confidence : undefined,
      })
    }
    if (items.length === 0) {
      errors.push(`chapter “${title}” has no content`)
      continue
    }
    cleaned.push({ title: title.slice(0, 200), items })
  }

  if (cleaned.length === 0) {
    errors.push('a custom book needs at least one chapter with library content')
  }

  return { ok: errors.length === 0, errors, toc: cleaned }
}

/** Validate coverage rows supplied by the client (honesty is enforced by the matcher; here we validate referential integrity). */
export function validateCoverage(
  rows: unknown,
): { ok: boolean; errors: string[]; rows: { requestedTopic: string; requestedParent: string; matchedLibraryRecordId: string | null; matchStatus: string; matchConfidence: number }[] } {
  const errors: string[] = []
  const cleaned: {
    requestedTopic: string
    requestedParent: string
    matchedLibraryRecordId: string | null
    matchStatus: string
    matchConfidence: number
  }[] = []
  if (!Array.isArray(rows)) {
    return { ok: false, errors: ['coverage must be an array'], rows: [] }
  }
  const validStatuses = new Set(['exact', 'equivalent', 'partial', 'not_available'])
  for (const row of rows) {
    if (!row || typeof row !== 'object') continue
    const r = row as Record<string, unknown>
    const requestedTopic = typeof r.requestedTopic === 'string' ? r.requestedTopic.trim() : ''
    if (!requestedTopic) continue
    const status = typeof r.matchStatus === 'string' ? r.matchStatus : ''
    if (!validStatuses.has(status)) {
      errors.push(`invalid match status for “${requestedTopic}”`)
      continue
    }
    let matched: string | null = null
    if (typeof r.matchedLibraryRecordId === 'string' && r.matchedLibraryRecordId) {
      if (!getLessonRecord(r.matchedLibraryRecordId)) {
        errors.push(`coverage row “${requestedTopic}” references an unknown record`)
        continue
      }
      matched = r.matchedLibraryRecordId
    }
    if (status !== 'not_available' && !matched) {
      errors.push(`coverage row “${requestedTopic}” claims a match without a library record`)
      continue
    }
    if (status === 'not_available' && matched) {
      errors.push(`coverage row “${requestedTopic}” is marked not_available but carries a record`)
      continue
    }
    cleaned.push({
      requestedTopic: requestedTopic.slice(0, 300),
      requestedParent: typeof r.requestedParent === 'string' ? r.requestedParent.slice(0, 300) : '',
      matchedLibraryRecordId: matched,
      matchStatus: status,
      matchConfidence: typeof r.matchConfidence === 'number' ? Math.min(1, Math.max(0, r.matchConfidence)) : 0,
    })
  }
  return { ok: errors.length === 0, errors, rows: cleaned }
}
