/**
 * Custom Book Builder — topic-list parser.
 *
 * Turns pasted topic lists (and OCR/PDF-extracted lines) into a structured
 * TopicNode hierarchy. Isomorphic: used by the client for live preview, by
 * the server for matching, and by the PDF extractor. Understands:
 *
 *   Subject: Operating Systems            → root/subject header
 *   Chapter 3 · Process Management        → chapter header
 *   Unit 2 — Memory Management            → chapter header
 *   1. Introduction to Operating Systems  → depth-1 topic
 *   1.1 Process States                    → depth-2 subtopic
 *   1.1.2 Ready state                     → depth-3 subtopic
 *   - bullets, • dots, i) roman, a) alpha → children
 *   indented lines                        → children
 *   "Operating Systems:"                  → header line
 */
import type { ParsedInput, TopicNode } from './types'

export interface CleanLine {
  text: string
  kind: 'header' | 'numbered' | 'bullet' | 'roman' | 'alpha' | 'plain'
  /** numeric depth for `numbered` (1, 2, 3…) */
  depth: number
  /** true when the line was an explicit “Subject: X” style prefix */
  subjectPrefix?: boolean
  /** header provenance — colon/subject/font headers may be promoted to root name; chapterish ones may not */
  flavor?: 'subject' | 'chapterish' | 'colon'
}

/** A classified source line entering the tree builder. */
export interface TreeLine {
  clean: CleanLine
  /** extra indent level (0 for pasted text; x-offset for PDFs) */
  indent: number
  /** force this line to act as a header (PDF font-size / OCR heuristics) */
  isHeading: boolean
}

const NOISE =
  /^(?:page\s*\d*|syllabus|course\s*(?:outline|structure)?|contents?|table\s+of\s+contents|appendix|references?|duration|marks|credits?|semester|week\s*\d*)$/i

const ROMAN = /^(?=[ivxlcdm]+$)(?=.{1,6}$)[ivxlcdm]+$/

/** Classify and clean one raw line; null for blank/noise lines. */
export function cleanTopicLine(raw: string): CleanLine | null {
  const expanded = raw.replace(/\t/g, '  ')
  let line = expanded.trim()
  if (!line) return null
  /* strip dot-leader page numbers ("........ 12") */
  line = line.replace(/\s*\.{2,}\s*\d{1,3}\s*$/, '')
  if (!line) return null

  /* explicit "Subject: X" / "Course: X" prefix */
  const subject = line.match(/^(?:subject|course|title|syllabus)\s*[:—-]\s*(.+)$/i)
  if (subject && subject[1].trim()) {
    return { text: cleanText(subject[1]), kind: 'header', depth: 0, subjectPrefix: true, flavor: 'subject' }
  }

  /* chapter-style headers */
  const chapterish = line.match(
    /^(?:unit|chapter|module|section|part|paper|topic|theme)\s+(\d{1,2}|[ivxlcdm]{1,5}|[A-H])\b\s*[:.)\-—]?\s*(.*)$/i,
  )
  if (chapterish) {
    const rest = cleanText(chapterish[2] ?? '')
    const word = line.match(/^[a-z]+/i)?.[0] ?? 'Chapter'
    const label = rest || `${word} ${chapterish[1]}`
    return { text: label, kind: 'header', depth: 0, flavor: 'chapterish' }
  }

  /* numeric list items, depth = number of dot-separated parts */
  const numbered = line.match(/^(\d{1,3}(?:\.\d{1,3})*)[.):]?\s+(.+)$/)
  if (numbered) {
    const depth = numbered[1].split('.').length
    const text = cleanText(numbered[2])
    if (text) return { text, kind: 'numbered', depth }
  }

  /* roman-numbered children "ii) Something" */
  const roman = line.match(/^([ivxlcdm]{1,6})[.)]\s+(.+)$/i)
  if (roman && ROMAN.test(roman[1].toLowerCase())) {
    const text = cleanText(roman[2])
    if (text) return { text, kind: 'roman', depth: 1 }
  }

  /* alpha children "a) Something" */
  const alpha = line.match(/^([a-h])[.)]\s+(.+)$/i)
  if (alpha) {
    const text = cleanText(alpha[2])
    if (text) return { text, kind: 'alpha', depth: 1 }
  }

  /* bullets */
  const bullet = line.match(/^[-•*·▪◦–—]\s+(.+)$/)
  if (bullet) {
    const text = cleanText(bullet[1])
    if (text) return { text, kind: 'bullet', depth: 1 }
  }

  /* short line ending in a colon → header ("Operating Systems:") */
  if (/^[^:]{1,70}:$/.test(line)) {
    return { text: cleanText(line.replace(/:$/, '')), kind: 'header', depth: 0, flavor: 'colon' }
  }

  const text = cleanText(line)
  if (!text || NOISE.test(text)) return null
  return { text, kind: 'plain', depth: 0 }
}

function cleanText(s: string): string {
  return s
    .replace(/^[\s"'“”‘’]+/, '')
    .replace(/[\s"'“”‘’]+$/, '')
    .replace(/^[-–—•·:;|]+/, '')
    .replace(/[:;|]+$/, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/* ------------------------------------------------------------------ */
/* Tree builder (shared by the text parser and the PDF extractor)      */
/* ------------------------------------------------------------------ */

/**
 * Build the topic hierarchy from classified lines. Headers become
 * top-level nodes; numbered/bulleted lines become their children (or
 * top-level nodes when no header precedes them). A single header wrapping
 * everything is promoted to the root name.
 */
export function buildTree(lines: TreeLine[]): ParsedInput {
  /* pre-pass: a short plain line immediately followed by list items acts as
   * a subject header ("Mathematics Essentials" + "1. …" lists) */
  const adjusted: TreeLine[] = lines.map((l, i) => {
    const next = lines[i + 1]
    if (
      l.clean.kind === 'plain' &&
      !l.isHeading &&
      l.clean.text.length <= 60 &&
      !/[.!?]$/.test(l.clean.text) &&
      next &&
      (next.clean.kind === 'numbered' || next.clean.kind === 'bullet' || next.clean.kind === 'roman' || next.clean.kind === 'alpha')
    ) {
      return { ...l, isHeading: true, clean: { ...l.clean, kind: 'header', flavor: 'colon' } }
    }
    return l
  })

  const roots: TopicNode[] = []
  /** provenance of each root-level header, aligned with `roots` pushes */
  const rootFlavors: string[] = []
  let rootName: string | null = null
  let sawSubjectPrefix = false
  /** true once a non-header line lands directly at root level */
  let plainRoots = false

  let chapter: TopicNode | null = null
  /** stack[d-1] = last node at numeric depth d */
  let stack: TopicNode[] = []
  let container: TopicNode[] = roots
  let lastNode: TopicNode | null = null

  for (const line of adjusted) {
    const c = line.clean
    if (!c.text) continue

    if (c.kind === 'header' || line.isHeading) {
      if (c.subjectPrefix) {
        /* subject-prefixed headers set the root name at the very start;
         * later ones act as plain section headers */
        if (!sawSubjectPrefix && roots.length === 0 && !chapter) {
          rootName = c.text
          sawSubjectPrefix = true
          continue
        }
      }
      const node: TopicNode = { topic: c.text, children: [] }
      roots.push(node)
      rootFlavors.push(c.flavor ?? 'font')
      chapter = node
      stack = []
      container = node.children ?? []
      lastNode = node
      continue
    }

    if (c.kind === 'numbered') {
      const node: TopicNode = { topic: c.text }
      if (c.depth <= 1) {
        const to = chapter ? (chapter.children ?? (chapter.children = [])) : roots
        to.push(node)
        if (!chapter) plainRoots = true
        lastNode = node
        stack = [node]
      } else {
        const ancestorIdx = Math.min(c.depth - 2, stack.length - 1)
        if (ancestorIdx >= 0 && stack[ancestorIdx]) {
          const parent = stack[ancestorIdx]
          const to = parent.children ?? (parent.children = [])
          to.push(node)
          lastNode = node
          stack = stack.slice(0, ancestorIdx + 1)
          stack.push(node)
        } else {
          const to = chapter ? (chapter.children ?? (chapter.children = [])) : roots
          to.push(node)
          if (!chapter) plainRoots = true
          lastNode = node
          stack = [node]
        }
      }
      continue
    }

    /* bullet / roman / alpha / plain */
    const node: TopicNode = { topic: c.text }
    const effectiveDepth = c.depth > 0 ? c.depth : line.indent > 0 ? 1 : 0
    if (effectiveDepth > 0 && lastNode) {
      const to = lastNode.children ?? (lastNode.children = [])
      to.push(node)
      lastNode = node
    } else if (effectiveDepth > 0 && chapter) {
      const to = chapter.children ?? (chapter.children = [])
      to.push(node)
      lastNode = node
    } else {
      container.push(node)
      if (container === roots) plainRoots = true
      lastNode = node
    }
  }

  /* prune empties */
  const prune = (nodes: TopicNode[]): TopicNode[] =>
    nodes
      .filter((x) => x.topic.length > 0)
      .map((x) => {
        const out: TopicNode = { topic: x.topic }
        if (x.children && x.children.length > 0) out.children = prune(x.children)
        return out
      })

  const nodes = prune(roots)

  /* a single colon/subject/font header wrapping everything → promote to the
   * root name. Explicit “Chapter N” headers stay as chapters. */
  const promotable =
    !plainRoots &&
    rootFlavors.length === 1 &&
    (rootFlavors[0] === 'colon' || rootFlavors[0] === 'subject' || rootFlavors[0] === 'font')
  if (!rootName && promotable && nodes.length === 1 && nodes[0].children && nodes[0].children.length > 0) {
    return { rootName: nodes[0].topic, nodes: prune(nodes[0].children) }
  }

  return { rootName: rootName ?? '', nodes }
}

/** Parse a pasted topic list into a structured hierarchy. */
export function parseTopicList(text: string): ParsedInput {
  const lines: TreeLine[] = []
  for (const raw of text.split(/\r?\n/)) {
    const clean = cleanTopicLine(raw)
    if (!clean) continue
    lines.push({ clean, indent: 0, isHeading: false })
  }
  return buildTree(lines)
}
