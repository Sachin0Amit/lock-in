/**
 * Highlight painting — pure DOM half of the reader's highlighter.
 *
 * Anchoring model: every highlight is anchored to ONE rendered `data-hl`
 * host (a RichText string; see math.tsx) by character offsets in that host's
 * rendered text content (the same text space a DOM Range over the host
 * reports, so capture and paint agree even across KaTeX's internals).
 * Offsets can never shift because of quiz answers or collapsible solutions
 * elsewhere in the block — those live in different hosts.
 *
 * Painting is segment-based: all cut points (every start/end in the host)
 * split the text nodes once, then each resulting run is wrapped in a single
 * <mark data-hl-id> for its owning highlight — so overlapping highlights
 * never nest; the most recently created one wins the overlapped stretch.
 * Marks are inserted without ever removing or merging React-owned text
 * nodes (no normalize()), so React reconciliation stays safe.
 */

export interface SelAnchor {
  host: string
  start: number
  end: number
  /** the selection's plain text, kept verbatim for the store */
  text: string
}

function attrEscape(v: string): string {
  if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(v)
  return v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function hostOf(node: Node): HTMLElement | null {
  const el =
    node.nodeType === Node.TEXT_NODE ? node.parentElement : node instanceof Element ? node : null
  if (!el) return null
  const host = el.closest('[data-hl]')
  return host instanceof HTMLElement ? host : null
}

/** text length between the host's content start and (node, offset) */
function offsetFromHostStart(host: Element, node: Node, offset: number): number {
  const r = document.createRange()
  r.selectNodeContents(host)
  try {
    r.setEnd(node, offset)
  } catch {
    return -1
  }
  return r.toString().length
}

/** text length between (node, offset) and the host's content end */
function offsetFromHostEnd(host: Element, node: Node, offset: number): number {
  const r = document.createRange()
  r.selectNodeContents(host)
  try {
    r.setStart(node, offset)
  } catch {
    return -1
  }
  return r.toString().length
}

/**
 * Read the current selection as a highlight anchor, or null when the
 * selection is empty, outside `root`, or spans more than one host
 * (cross-host selections are refused — one highlight per host keeps
 * anchors stable forever).
 */
export function selectionAnchor(root: HTMLElement | null): SelAnchor | null {
  if (!root || typeof window.getSelection !== 'function') return null
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null
  const range = sel.getRangeAt(0)
  if (range.collapsed) return null
  const startHost = hostOf(range.startContainer)
  const endHost = hostOf(range.endContainer)
  if (!startHost || startHost !== endHost || !root.contains(startHost)) return null

  const total = (startHost.textContent ?? '').length
  const start = offsetFromHostStart(startHost, range.startContainer, range.startOffset)
  const tail = offsetFromHostEnd(startHost, range.endContainer, range.endOffset)
  const end = total - tail
  if (start < 0 || end < 0 || end <= start) return null
  const text = sel.toString()
  if (!text.trim()) return null
  return { host: startHost.dataset.hl ?? '', start, end, text }
}

/* ------------------------------------------------------------------ */
/* Painting                                                            */
/* ------------------------------------------------------------------ */

/** Remove every painted mark inside `root` (text nodes survive in place). */
export function unwrapMarks(root: HTMLElement): void {
  root.querySelectorAll('mark[data-hl-id]').forEach((mark) => {
    const parent = mark.parentNode
    if (!parent) return
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark)
    parent.removeChild(mark)
  })
}

interface HlLike {
  id: string
  host: string
  start: number
  end: number
  color: string
  createdAt: number
}

/** split the text node that strictly contains `cut` (character offset in the
 *  host's text space). Boundaries that already sit between nodes are free. */
function splitTextNodeAt(host: Element, cut: number): void {
  if (cut <= 0) return
  let cursor = 0
  const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode() as Text | null
  while (node) {
    const len = node.data.length
    if (cut > cursor && cut < cursor + len) {
      node.splitText(cut - cursor)
      return
    }
    if (cut === cursor + len) return
    cursor += len
    node = walker.nextNode() as Text | null
  }
}

/** Paint all highlights of one host: cut once, then wrap runs per owner. */
function paintHost(host: Element, list: HlLike[]): void {
  const total = (host.textContent ?? '').length
  if (!total || list.length === 0) return
  const clamp = (n: number) => Math.max(0, Math.min(total, n))
  /* oldest first, so a later highlight paints over an overlapping earlier
   * one — last decision wins, like a real highlighter over ink */
  const sorted = [...list].sort((a, b) => a.createdAt - b.createdAt)

  const cutSet = new Set<number>([0, total])
  for (const h of sorted) {
    cutSet.add(clamp(h.start))
    cutSet.add(clamp(h.end))
  }
  for (const cut of [...cutSet].sort((a, b) => a - b)) splitTextNodeAt(host, cut)

  /* walk the (now cut-aligned) text nodes, assign each to the newest
   * highlight fully containing it, and wrap consecutive same-owner nodes
   * into one mark */
  let cursor = 0
  let runNodes: Text[] = []
  let runOwner: HlLike | null = null
  const flush = () => {
    if (runNodes.length > 0 && runOwner) {
      const mark = document.createElement('mark')
      mark.dataset.hlId = runOwner.id
      mark.className = `hl-mark hl-${runOwner.color}`
      const parent = runNodes[0].parentNode
      if (!parent) {
        runNodes = []
        runOwner = null
        return
      }
      parent.insertBefore(mark, runNodes[0])
      for (const n of runNodes) mark.appendChild(n)
    }
    runNodes = []
    runOwner = null
  }
  const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode() as Text | null
  while (node) {
    const s = cursor
    const e = cursor + node.data.length
    cursor = e
    let owner: HlLike | null = null
    for (const h of sorted) {
      if (clamp(h.start) <= s && clamp(h.end) >= e) owner = h
    }
    if (owner && runOwner && owner.id !== runOwner.id) flush()
    if (owner) {
      runOwner = owner
      runNodes.push(node)
    } else {
      flush()
    }
    node = walker.nextNode() as Text | null
  }
  flush()
}

/** Paint every highlight in `root` (idempotent: unwraps old marks first). */
export function paintAll(root: HTMLElement | null, hls: HlLike[]): void {
  if (!root) return
  unwrapMarks(root)
  if (hls.length === 0) return
  const groups = new Map<string, HlLike[]>()
  for (const h of hls) {
    const arr = groups.get(h.host)
    if (arr) arr.push(h)
    else groups.set(h.host, [h])
  }
  for (const [hostKey, list] of groups) {
    const host = root.querySelector(`[data-hl="${attrEscape(hostKey)}"]`)
    if (host) paintHost(host, list)
  }
}

/** find the first painted mark of a highlight id */
export function findMark(root: HTMLElement | null, id: string): HTMLElement | null {
  if (!root) return null
  const mark = root.querySelector(`mark[data-hl-id="${attrEscape(id)}"]`)
  return mark instanceof HTMLElement ? mark : null
}

/** scroll a highlight into view and flash it (the panel's jump-to) */
export function flashMark(root: HTMLElement | null, id: string): boolean {
  const mark = findMark(root, id)
  if (!mark) return false
  mark.scrollIntoView({ behavior: 'smooth', block: 'center' })
  mark.classList.add('hl-flash')
  window.setTimeout(() => mark.classList.remove('hl-flash'), 2600)
  return true
}
