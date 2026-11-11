'use client'

/**
 * Highlighter layer — the interactive half of the reader's multi-colour
 * highlighter (owner directive 2026-11-11).
 *
 * Owner-visible behaviour:
 *  - select text anywhere in the reading pane → a floating palette offers
 *    six highlighter colours; a click paints the selection
 *  - click an existing highlight → recolour it, attach/edit a private note,
 *    copy the quote, or erase it
 *  - the footer "Highlights" panel lists every highlight of the lesson with
 *    jump-to, note editing, delete, copy-all and clear-all
 *  - everything persists on the device (localStorage), like bookmarks
 *
 * Painting itself lives in highlight-dom.ts; state in highlight-store.ts.
 * The layer also repaints on DOM mutations (quiz answers, collapsible
 * solutions opening/closing) — marks inside content that is currently
 * unmounted simply re-appear next time it opens.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Check,
  Copy,
  Highlighter,
  LocateFixed,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  HIGHLIGHT_COLORS,
  lessonHighlights,
  useHighlightStore,
  type Highlight,
} from './highlight-store'
import {
  flashMark,
  paintAll,
  selectionAnchor,
  selectionMarkId,
  type SelAnchor,
} from './highlight-dom'

/* ------------------------------------------------------------------ */
/* Swatch                                                              */
/* ------------------------------------------------------------------ */

export function ColorDot({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <span
      aria-hidden
      className={`hl-swatch hl-${color}`}
      style={{ width: size, height: size }}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Highlighter — selection palette + mark popover + paint loop           */
/* ------------------------------------------------------------------ */

interface ToolbarState {
  x: number
  y: number
  anchor: SelAnchor
  existingId: string | null
  below: boolean
}

interface PopoverState {
  id: string
  x: number
  y: number
  below: boolean
}

export function HighlighterLayer({
  lessonId,
  rootRef,
}: {
  lessonId: string
  rootRef: React.RefObject<HTMLElement | null>
}) {
  const add = useHighlightStore((s) => s.add)
  const remove = useHighlightStore((s) => s.remove)
  const setColor = useHighlightStore((s) => s.setColor)
  const hls = useHighlightStore((s) => lessonHighlights(s, lessonId))
  const list = useMemo(() => Object.values(hls), [hls])

  const [toolbar, setToolbar] = useState<ToolbarState | null>(null)
  const [popover, setPopover] = useState<PopoverState | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const paintingRef = useRef(false)

  /* paint whenever this lesson's highlights change (and on mount) */
  useEffect(() => {
    paintAll(rootRef.current, list)
  }, [list, lessonId, rootRef])

  /* repaint after DOM mutations inside the reading pane (quiz answers,
   * collapsible solutions, …) — our own painting is filtered out */
  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof MutationObserver !== 'function') return
    let timer: number | undefined
    const observer = new MutationObserver(() => {
      if (paintingRef.current) return
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const el = rootRef.current
        if (!el) return
        paintingRef.current = true
        paintAll(el, list)
        window.setTimeout(() => {
          paintingRef.current = false
        }, 50)
      }, 300)
    })
    observer.observe(root, { childList: true, subtree: true, characterData: true })
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [list, rootRef])

  /* selection toolbar — follows the live selection inside the pane */
  useEffect(() => {
    if (typeof document === 'undefined') return
    const onSelectionChange = () => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed) {
        setToolbar(null)
        return
      }
      const anchor = selectionAnchor(rootRef.current)
      if (!anchor) {
        setToolbar(null)
        return
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect()
      setToolbar({
        x: Math.min(Math.max(rect.left + rect.width / 2, 90), window.innerWidth - 90),
        y: rect.top,
        below: rect.top < 72,
        anchor,
        existingId: selectionMarkId(rootRef.current),
      })
    }
    document.addEventListener('selectionchange', onSelectionChange)
    return () => document.removeEventListener('selectionchange', onSelectionChange)
  }, [rootRef])

  /* clicking an existing highlight (without selecting) opens its popover */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const mark = target?.closest?.('mark[data-hl-id]')
      if (!(mark instanceof HTMLElement)) {
        setPopover(null)
        return
      }
      const sel = window.getSelection()
      if (sel && !sel.isCollapsed) return // user is selecting, not clicking
      const rect = mark.getBoundingClientRect()
      setPopover({
        id: mark.dataset.hlId ?? '',
        x: Math.min(Math.max(rect.left, 180), window.innerWidth - 180),
        y: rect.top,
        below: rect.top < 220,
      })
    }
    root.addEventListener('click', onClick)
    return () => root.removeEventListener('click', onClick)
  }, [rootRef, lessonId])

  /* close popover: outside pointerdown, Escape, scroll, resize */
  useEffect(() => {
    if (!popover) return
    const onPointerDown = (e: PointerEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setPopover(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPopover(null)
    }
    const onClose = () => setPopover(null)
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onClose, { passive: true, capture: true })
    window.addEventListener('resize', onClose)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onClose, { capture: true })
      window.removeEventListener('resize', onClose)
    }
  }, [popover])

  /* close the floating toolbar on scroll/resize (stale coordinates) */
  useEffect(() => {
    if (!toolbar) return
    const onClose = () => setToolbar(null)
    window.addEventListener('scroll', onClose, { passive: true, capture: true })
    window.addEventListener('resize', onClose)
    return () => {
      window.removeEventListener('scroll', onClose, { capture: true })
      window.removeEventListener('resize', onClose)
    }
  }, [toolbar])

  const applyColor = useCallback(
    (color: string) => {
      if (!toolbar) return
      add({
        lessonId,
        host: toolbar.anchor.host,
        start: toolbar.anchor.start,
        end: toolbar.anchor.end,
        text: toolbar.anchor.text,
        color: color as Highlight['color'],
      })
      const sel = window.getSelection()
      sel?.removeAllRanges()
      setToolbar(null)
    },
    [add, lessonId, toolbar],
  )

  const hl = popover ? hls[popover.id] : undefined

  return (
    <>
      {/* selection palette */}
      {toolbar && (
        <div
          className="hl-floating"
          style={{
            left: toolbar.x,
            top: toolbar.below ? toolbar.y + 14 : undefined,
            bottom: toolbar.below ? undefined : `calc(100vh - ${toolbar.y - 10}px)`,
            transform: 'translateX(-50%)',
          }}
          role="toolbar"
          aria-label="Highlighter colours"
          onMouseDown={(e) => e.preventDefault()}
        >
          {HIGHLIGHT_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              title={`${c.label} highlighter`}
              aria-label={`Highlight selection in ${c.label}`}
              className="hl-swatch-btn"
              onClick={() => applyColor(c.id)}
            >
              <span className={`hl-swatch hl-${c.id}`} />
            </button>
          ))}
        </div>
      )}

      {/* existing-highlight popover: recolour / note / copy / erase */}
      {popover && hl && (
        <div
          ref={popoverRef}
          className="hl-floating hl-popover"
          style={{
            left: popover.x,
            top: popover.below ? popover.y + 14 : undefined,
            bottom: popover.below ? undefined : `calc(100vh - ${popover.y - 10}px)`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Highlighter
            </p>
            <button
              type="button"
              onClick={() => setPopover(null)}
              className="rounded p-0.5 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
          <p className="mt-1.5 max-w-[280px] text-xs leading-5 text-foreground/85 line-clamp-2">
            &ldquo;{hl.text}&rdquo;
          </p>
          <div className="mt-2.5 flex items-center gap-1.5">
            {HIGHLIGHT_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                title={`${c.label} highlighter`}
                aria-label={`Recolour highlight in ${c.label}`}
                aria-pressed={hl.color === c.id}
                className="hl-swatch-btn"
                onClick={() => setColor(hl.id, c.id)}
              >
                <span className={`hl-swatch hl-${c.id}`} />
                {hl.color === c.id && (
                  <Check className="absolute h-3 w-3 text-foreground" aria-hidden />
                )}
              </button>
            ))}
          </div>
          <NoteEditor
            initial={hl.note}
            onSave={(note) => {
              useHighlightStore.getState().setNote(hl.id, note)
              setPopover(null)
            }}
          />
          <div className="mt-2 flex items-center gap-1.5 border-t pt-2">
            <button
              type="button"
              className="hl-chipbtn"
              onClick={() => void navigator.clipboard?.writeText(hl.text).catch(() => undefined)}
            >
              <Copy className="h-3.5 w-3.5" aria-hidden /> Copy quote
            </button>
            <button
              type="button"
              className="hl-chipbtn hl-danger"
              onClick={() => {
                remove(hl.id)
                setPopover(null)
              }}
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden /> Erase highlight
            </button>
          </div>
        </div>
      )}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Note editor (popover + panel rows share it)                         */
/* ------------------------------------------------------------------ */

function NoteEditor({
  initial,
  onSave,
  compact = false,
}: {
  initial?: string
  onSave: (note: string) => void
  compact?: boolean
}) {
  const [value, setValue] = useState(initial ?? '')
  const [open, setOpen] = useState(false)
  if (!open) {
    return (
      <button
        type="button"
        className={`hl-chipbtn ${compact ? 'mt-1' : 'mt-2'}`}
        onClick={() => setOpen(true)}
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden /> {initial ? 'Edit note' : 'Add note'}
      </button>
    )
  }
  return (
    <div className={`flex items-end gap-1.5 ${compact ? 'mt-1' : 'mt-2'}`}>
      <textarea
        autoFocus
        rows={2}
        value={value}
        placeholder="Your private note…"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false)
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            onSave(value)
            setOpen(false)
          }
        }}
        className="min-w-0 flex-1 rounded-md border bg-background px-2.5 py-1.5 text-xs leading-5 outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      <Button size="sm" className="h-7 px-2.5 text-xs" onClick={() => { onSave(value); setOpen(false) }}>
        Save
      </Button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Highlights panel — the lesson footer list                           */
/* ------------------------------------------------------------------ */

const hostOrder = (h: Highlight): [number, string, number] => {
  const m = /^(\d+)/.exec(h.host)
  return [m ? Number(m[1]) : 9999, h.host, h.start]
}

export function HighlightsPanel({
  lessonId,
  rootRef,
}: {
  lessonId: string
  rootRef: React.RefObject<HTMLElement | null>
}) {
  const hls = useHighlightStore((s) => lessonHighlights(s, lessonId))
  const list = useMemo(() => Object.values(hls), [hls])
  const remove = useHighlightStore((s) => s.remove)
  const setNote = useHighlightStore((s) => s.setNote)
  const clearLesson = useHighlightStore((s) => s.clearLesson)
  const [confirmClear, setConfirmClear] = useState(false)
  const [copied, setCopied] = useState(false)
  const [rowFlash, setRowFlash] = useState<string | null>(null)

  useEffect(() => {
    if (!confirmClear) return
    const t = window.setTimeout(() => setConfirmClear(false), 3200)
    return () => window.clearTimeout(t)
  }, [confirmClear])

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(t)
  }, [copied])

  const sorted = useMemo(() => [...list].sort((a, b) => {
    const [ai, ah, as] = hostOrder(a)
    const [bi, bh, bs] = hostOrder(b)
    return ai - bi || ah.localeCompare(bh) || as - bs
  }), [list])

  const copyAll = async () => {
    if (!sorted.length) return
    const text = sorted
      .map((h) => `${h.text}${h.note ? `\n    note: ${h.note}` : ''}`)
      .join('\n\n')
    await navigator.clipboard?.writeText(text).catch(() => undefined)
    setCopied(true)
  }

  const jump = (id: string) => {
    const ok = flashMark(rootRef.current, id)
    if (!ok) setRowFlash(id) // mark inside collapsed content — flash the row
    window.setTimeout(() => setRowFlash(null), 2600)
  }

  if (list.length === 0) {
    return (
      <p className="flex items-center gap-2 rounded-lg border border-dashed px-4 py-2.5 text-xs text-muted-foreground">
        <Highlighter className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Select any text while reading and a highlighter palette appears — six colours, private
        notes, all saved on this device.
      </p>
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <Collapsible defaultOpen={false}>
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5">
          <CollapsibleTrigger className="group flex items-center gap-2 text-sm font-semibold">
            <Highlighter className="h-4 w-4 text-primary" aria-hidden />
            Highlights
            <Badge variant="secondary" className="font-normal tabular-nums">
              {list.length}
            </Badge>
            <span className="text-[11px] font-medium text-muted-foreground transition-transform group-data-[state=open]:rotate-180">
              ▾
            </span>
          </CollapsibleTrigger>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" className="hl-chipbtn" onClick={() => void copyAll()}>
              <Copy className="h-3.5 w-3.5" aria-hidden /> {copied ? 'Copied!' : 'Copy all'}
            </button>
            {confirmClear ? (
              <button
                type="button"
                className="hl-chipbtn hl-danger"
                onClick={() => {
                  clearLesson(lessonId)
                  setConfirmClear(false)
                }}
              >
                Click again to erase all
              </button>
            ) : (
              <button
                type="button"
                className="hl-chipbtn"
                onClick={() => setConfirmClear(true)}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden /> Clear all
              </button>
            )}
          </div>
        </div>
        <CollapsibleContent>
          <ul className="divide-y divide-border/70 border-t px-4 py-2">
            {sorted.map((h) => (
              <li
                key={h.id}
                className={`flex items-start gap-3 py-2.5 transition-colors ${
                  rowFlash === h.id ? 'rounded-md bg-primary/15' : ''
                }`}
              >
                <button
                  type="button"
                  aria-label="Jump to this highlight"
                  title="Jump to this highlight"
                  className="mt-0.5 shrink-0 rounded p-1 transition-colors hover:bg-accent"
                  onClick={() => jump(h.id)}
                >
                  <ColorDot color={h.color} />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-5 text-foreground/85 line-clamp-2">{h.text}</p>
                  {h.note && (
                    <p className="mt-0.5 text-xs italic leading-5 text-muted-foreground">
                      {h.note}
                    </p>
                  )}
                  <div className="mt-1 flex items-center gap-1.5">
                    <button
                      type="button"
                      className="hl-chipbtn"
                      onClick={() => jump(h.id)}
                      title="Jump to this highlight"
                    >
                      <LocateFixed className="h-3.5 w-3.5" aria-hidden /> Jump
                    </button>
                    <button
                      type="button"
                      className="hl-chipbtn"
                      onClick={() => remove(h.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden /> Erase
                    </button>
                    <span className="ml-auto">
                      <NoteEditor
                        compact
                        initial={h.note}
                        onSave={(note) => setNote(h.id, note)}
                      />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
