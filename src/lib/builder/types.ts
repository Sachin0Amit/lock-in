/**
 * Custom Book Builder — shared types (isomorphic: used by client and server).
 *
 * Core principle encoded in these types: a custom book is a *curation* of
 * canonical Main Academic Library records. The only durable link to academic
 * content is `recordId` — a lesson id from src/data/library, stable forever.
 */

/** A requested topic, possibly with nested subtopics. */
export interface TopicNode {
  topic: string
  children?: TopicNode[]
}

/** Structured requirements produced by parsing any creation input. */
export interface ParsedInput {
  /** overall name (subject / examination / document name), if any */
  rootName: string
  nodes: TopicNode[]
}

export type MatchStatus = 'exact' | 'equivalent' | 'partial' | 'not_available'

/** One candidate library record that could satisfy a requested topic. */
export interface MatchCandidate {
  recordId: string
  lessonNumber: string
  lessonTitle: string
  chapterTitle: string
  bookTitle: string
  /** "Foundation Mathematics · Chapter 1 · Numbers and Place Value" */
  location: string
  url: string
  words: number
  /** 0..1 relevance */
  score: number
  /** human-readable explanation of why this record matched */
  via: string
}

/** Result of matching one requested topic against the library. */
export interface TopicMatch {
  requested: string
  /** requested parent chapter/subject ("" at root level) */
  parent: string
  /** requested top-level group ("" when the request itself is top-level) */
  root: string
  status: MatchStatus
  /** 0..1 confidence of the chosen match */
  confidence: number
  best: MatchCandidate | null
  /** other plausible matches, score-ordered, for the review UI */
  alternatives: MatchCandidate[]
  /** set when the topic maps to a whole library chapter or book */
  expanded: { kind: 'book' | 'chapter'; label: string; recordIds: string[] } | null
  /** prerequisite lessons available in the library and not already selected */
  prerequisiteRecordIds: string[]
  /** whether every declared prerequisite of the matched lesson is written */
  prerequisitesAvailable: boolean | null
}

/** One curated entry of the custom table of contents. */
export interface TocItemDraft {
  recordId: string
  requestedTopic?: string
  via?: string
  confidence?: number
}

export interface TocChapterDraft {
  title: string
  items: TocItemDraft[]
}

export interface CoverageSummary {
  requested: number
  exact: number
  equivalent: number
  partial: number
  notAvailable: number
  /** (exact + equivalent + 0.5 × partial) / requested */
  percent: number
}

/** Full output of the discovery engine. */
export interface MatchOutput {
  rootName: string
  matches: TopicMatch[]
  toc: TocChapterDraft[]
  coverage: CoverageSummary
}

/** Method-2 input: explicit picks from the library tree. */
export interface LibrarySelection {
  bookIds?: string[]
  /** `${bookId}:${chapterNumber}` keys */
  chapterIds?: string[]
  lessonIds?: string[]
}

/** Input accepted by the /api/builder/match endpoint. */
export interface MatchRequestInput {
  method: 'exam' | 'subject' | 'topics' | 'pdf' | 'combination'
  /** exam name (method exam) */
  exam?: string
  /** raw pasted topic list (methods topics / combination) */
  topicText?: string
  /** parsed structure (methods pdf / combination — client may edit before matching) */
  parsed?: ParsedInput
  /** explicit library selections (methods subject / combination) */
  selection?: LibrarySelection
  /** combine with the structure of an existing custom book (method combination) */
  baseBookId?: string
}
