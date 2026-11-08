'use client'

/**
 * Revision & Mastery — the Knowledge Graph.
 *
 * An interactive, hand-rolled force-directed map of the whole Main
 * Academic Library: every lesson is a node (size = revision passes,
 * colour = mastery state, rose ring = overdue), edges are the library's
 * real structure — author-declared prerequisites, in-chapter reading
 * order, and concept bridges (lessons in different chapters sharing
 * concepts). The user's ledger paints the mastery overlay.
 *
 * No graph library: a deterministic seeded simulation (stable mental
 * map — the graph looks the same every visit), SVG rendering, pan/zoom,
 * filters, search, and a detail panel with direct marking actions.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  Loader2,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Share2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { formatDate, MasteryBar, STATE_LABELS, STATE_STYLES } from './mastery-bits'
import { useLedgerSync } from './use-ledger-sync'
import type { GraphEdge, GraphNode, GraphResponse } from '@/lib/revision/types'

const VIEW_W = 1000
const VIEW_H = 680
const PAD = 60

/* ------------------------------------------------------------------ */
/* Deterministic layout                                                */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Pt {
  x: number
  y: number
  vx: number
  vy: number
}

function computeLayout(nodes: GraphNode[], edges: GraphEdge[]): Map<string, { x: number; y: number }> {
  const rnd = mulberry32(20261108)
  const chapterOrder = new Map<string, number>()
  for (const n of nodes) {
    if (!chapterOrder.has(n.chapterKey)) chapterOrder.set(n.chapterKey, chapterOrder.size)
  }
  const numCh = Math.max(1, chapterOrder.size)
  const ringR = 140 + numCh * 16

  const pos = new Map<string, Pt>()
  for (const n of nodes) {
    const ci = chapterOrder.get(n.chapterKey)!
    const ang = (ci / numCh) * Math.PI * 2 + (rnd() - 0.5) * 0.3
    const r = ringR + (rnd() - 0.5) * 70
    pos.set(n.id, { x: Math.cos(ang) * r, y: Math.sin(ang) * r, vx: 0, vy: 0 })
  }

  const REPULSION = 5200
  const SPRING: Record<GraphEdge['kind'], { rest: number; k: number }> = {
    prereq: { rest: 150, k: 0.06 },
    sequence: { rest: 72, k: 0.012 },
    bridge: { rest: 235, k: 0.01 },
  }

  const ids = nodes.map((n) => n.id)
  for (let iter = 0; iter < 300; iter++) {
    /* chapter centroids (cohesion) */
    const centroid = new Map<string, { x: number; y: number; n: number }>()
    for (const n of nodes) {
      const p = pos.get(n.id)!
      let c = centroid.get(n.chapterKey)
      if (!c) {
        c = { x: 0, y: 0, n: 0 }
        centroid.set(n.chapterKey, c)
      }
      c.x += p.x
      c.y += p.y
      c.n++
    }

    /* pairwise repulsion */
    for (let i = 0; i < ids.length; i++) {
      const a = pos.get(ids[i])!
      for (let j = i + 1; j < ids.length; j++) {
        const b = pos.get(ids[j])!
        let dx = b.x - a.x
        let dy = b.y - a.y
        if (dx === 0 && dy === 0) {
          dx = 0.5
          dy = 0.5
        }
        const d2 = Math.max(120, dx * dx + dy * dy)
        const f = REPULSION / d2
        const inv = 1 / Math.sqrt(d2)
        a.vx -= dx * inv * f
        a.vy -= dy * inv * f
        b.vx += dx * inv * f
        b.vy += dy * inv * f
      }
    }

    /* springs on edges */
    for (const e of edges) {
      const a = pos.get(e.source)
      const b = pos.get(e.target)
      if (!a || !b) continue
      const s = SPRING[e.kind]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const d = Math.max(1, Math.hypot(dx, dy))
      const f = (d - s.rest) * s.k * e.weight
      const ux = (dx / d) * f
      const uy = (dy / d) * f
      a.vx += ux
      a.vy += uy
      b.vx -= ux
      b.vy -= uy
    }

    /* chapter cohesion + gentle gravity + integrate */
    const damping = 0.82 + 0.15 * (iter / 300)
    for (const n of nodes) {
      const p = pos.get(n.id)!
      const c = centroid.get(n.chapterKey)!
      p.vx += (c.x / c.n - p.x) * 0.02
      p.vy += (c.y / c.n - p.y) * 0.02
      p.vx -= p.x * 0.0012
      p.vy -= p.y * 0.0012
      const sp = Math.hypot(p.vx, p.vy)
      if (sp > 14) {
        p.vx = (p.vx / sp) * 14
        p.vy = (p.vy / sp) * 14
      }
      p.x += p.vx * damping
      p.y += p.vy * damping
    }
  }

  /* normalise into the viewBox */
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const p of pos.values()) {
    minX = Math.min(minX, p.x)
    minY = Math.min(minY, p.y)
    maxX = Math.max(maxX, p.x)
    maxY = Math.max(maxY, p.y)
  }
  const bw = Math.max(1, maxX - minX)
  const bh = Math.max(1, maxY - minY)
  const s = Math.min((VIEW_W - 2 * PAD) / bw, (VIEW_H - 2 * PAD) / bh)
  const out = new Map<string, { x: number; y: number }>()
  for (const [id, p] of pos) {
    out.set(id, {
      x: (p.x - minX) * s + PAD + ((VIEW_W - 2 * PAD) - bw * s) / 2,
      y: (p.y - minY) * s + PAD + ((VIEW_H - 2 * PAD) - bh * s) / 2,
    })
  }
  return out
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const NODE_FILL: Record<string, string> = {
  new: 'fill-slate-400 dark:fill-slate-600',
  learning: 'fill-amber-500',
  familiar: 'fill-teal-500',
  strong: 'fill-emerald-500',
  mastered: 'fill-emerald-600',
}

function nodeRadius(n: GraphNode): number {
  return 4.5 + Math.min(7, (n.passes ?? 0) * 0.8)
}

interface Props {
  graph: GraphResponse | null
  loading: boolean
  onChanged: () => void
}

export function KnowledgeGraph({ graph, loading, onChanged }: Props) {
  const { mark } = useLedgerSync()
  const [bookFilter, setBookFilter] = useState<string>('all')
  const [stateFilter, setStateFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [showPrereq, setShowPrereq] = useState(true)
  const [showSequence, setShowSequence] = useState(true)
  const [showBridge, setShowBridge] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const layout = useMemo(() => {
    if (!graph) return null
    return computeLayout(graph.nodes, graph.edges)
  }, [graph])

  /* pan & zoom */
  const svgRef = useRef<SVGSVGElement | null>(null)
  const viewRef = useRef({ k: 1, tx: 0, ty: 0 })
  const [view, setView] = useState({ k: 1, tx: 0, ty: 0 })
  const dragRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null)

  const applyView = (v: { k: number; tx: number; ty: number }) => {
    viewRef.current = v
    setView(v)
  }

  const zoomAt = (factor: number, cx: number, cy: number) => {
    const v = viewRef.current
    const k = Math.min(6, Math.max(0.5, v.k * factor))
    applyView({
      k,
      tx: cx - ((cx - v.tx) * k) / v.k,
      ty: cy - ((cy - v.ty) * k) / v.k,
    })
  }

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = svg.getBoundingClientRect()
      const scaleFit = rect.width / VIEW_W
      const cx = (e.clientX - rect.left) / scaleFit
      const cy = (e.clientY - rect.top) / scaleFit
      zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, cx, cy)
    }
    svg.addEventListener('wheel', onWheel, { passive: false })
    return () => svg.removeEventListener('wheel', onWheel)
  }, [])

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = { x: e.clientX, y: e.clientY, tx: viewRef.current.tx, ty: viewRef.current.ty }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = dragRef.current
    if (!d) return
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const scaleFit = rect.width / VIEW_W
    applyView({
      k: viewRef.current.k,
      tx: d.tx + (e.clientX - d.x) / scaleFit,
      ty: d.ty + (e.clientY - d.y) / scaleFit,
    })
  }
  const onPointerUp = () => {
    dragRef.current = null
  }

  /* ---------------------------------------------------------------- */

  const bookById = useMemo(
    () => new Map((graph?.books ?? []).map((b) => [b.bookId, b])),
    [graph],
  )
  const nodeById = useMemo(() => new Map((graph?.nodes ?? []).map((n) => [n.id, n])), [graph])

  const searchTerms = useMemo(
    () => search.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [search],
  )
  const matchesSearch = (n: GraphNode) =>
    searchTerms.length === 0 ||
    searchTerms.every(
      (t) =>
        n.title.toLowerCase().includes(t) ||
        n.number.toLowerCase().includes(t) ||
        n.chapterTitle.toLowerCase().includes(t) ||
        n.concepts.some((c) => c.toLowerCase().includes(t)),
    )

  const dueNow = (n: GraphNode) => !!n.dueAt && new Date(n.dueAt).getTime() <= Date.now()
  const passesState = (n: GraphNode) => (n.state ?? 'new')

  const visibleNodes = useMemo(() => {
    if (!graph) return []
    return graph.nodes.filter((n) => {
      if (bookFilter !== 'all' && n.bookId !== bookFilter) return false
      if (stateFilter !== 'all') {
        if (stateFilter === 'due') {
          if (!dueNow(n)) return false
        } else if (passesState(n) !== stateFilter) return false
      }
      if (searchTerms.length > 0 && !matchesSearch(n)) return false
      return true
    })
  }, [graph, bookFilter, stateFilter, searchTerms])
  const visibleSet = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes])

  const visibleEdges = useMemo(() => {
    if (!graph) return []
    return graph.edges.filter((e) => {
      if (e.kind === 'prereq' && !showPrereq) return false
      if (e.kind === 'sequence' && !showSequence) return false
      if (e.kind === 'bridge' && !showBridge) return false
      return visibleSet.has(e.source) && visibleSet.has(e.target)
    })
  }, [graph, showPrereq, showSequence, showBridge, visibleSet])

  /* chapter hulls for visible nodes */
  const hulls = useMemo(() => {
    if (!graph || !layout) return []
    const byChapter = new Map<string, GraphNode[]>()
    for (const n of visibleNodes) {
      let arr = byChapter.get(n.chapterKey)
      if (!arr) {
        arr = []
        byChapter.set(n.chapterKey, arr)
      }
      arr.push(n)
    }
    const out: { key: string; cx: number; cy: number; r: number; label: string; color: string }[] = []
    for (const [key, members] of byChapter) {
      if (members.length < 2) continue
      let cx = 0
      let cy = 0
      for (const m of members) {
        const p = layout.get(m.id)!
        cx += p.x
        cy += p.y
      }
      cx /= members.length
      cy /= members.length
      let r = 0
      for (const m of members) {
        const p = layout.get(m.id)!
        r = Math.max(r, Math.hypot(p.x - cx, p.y - cy))
      }
      const book = bookById.get(members[0].bookId)
      out.push({
        key,
        cx,
        cy,
        r: r + 22,
        label: `Ch ${members[0].chapterNumber} · ${members[0].chapterTitle}`,
        color: book?.accent[0] ?? '#888',
      })
    }
    return out
  }, [visibleNodes, layout, graph, bookById])

  const selectedNode = selected ? (nodeById.get(selected) ?? null) : null
  const focus = hovered ?? selected
  const focusEdges = new Set(
    visibleEdges.flatMap((e) => (e.source === focus || e.target === focus ? [e.source, e.target] : [])),
  )

  const handleMark = async (node: GraphNode, action: 'study' | 'revise') => {
    setBusyId(node.id)
    const results = await mark(
      { scope: 'lesson', refId: node.id },
      action,
      action === 'revise' ? { quality: 4, kind: 'revision' } : { kind: 'lesson-complete' },
    )
    setBusyId(null)
    const r = results?.[0]
    if (r?.ok) {
      toast.success(action === 'study' ? 'Marked as studied' : `Revision logged — pass ${r.entry?.passes}`)
      onChanged()
    }
  }

  if (loading || (!graph && !layout)) {
    return (
      <div className="flex h-72 items-center justify-center rounded-xl border bg-card/60">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-hidden />
        <span className="ml-2 text-sm text-muted-foreground">Laying out the knowledge graph…</span>
      </div>
    )
  }
  if (!graph || !layout) {
    return (
      <div className="rounded-xl border bg-card/60 p-8 text-center text-sm text-muted-foreground">
        The knowledge graph could not be loaded. Reload the tab to try again.
      </div>
    )
  }

  const selPrereqs = (selectedNode?.prereqIds ?? [])
    .map((id) => nodeById.get(id))
    .filter((n): n is GraphNode => !!n)
  const dependents = graph.nodes.filter((n) => n.prereqIds.includes(selectedNode?.id ?? '__'))

  return (
    <div className="space-y-4">
      {/* toolbar */}
      <div className="flex flex-wrap items-end gap-3 rounded-xl border bg-card/60 p-3">
        <div className="min-w-40 flex-1">
          <Label htmlFor="kg-search" className="text-xs text-muted-foreground">Search</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              id="kg-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Lesson, concept, chapter…"
              className="h-9 pl-8"
            />
          </div>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Book</Label>
          <Select value={bookFilter} onValueChange={setBookFilter}>
            <SelectTrigger className="h-9 w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All books</SelectItem>
              {graph.books.map((b) => (
                <SelectItem key={b.bookId} value={b.bookId}>
                  {b.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Mastery</Label>
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="h-9 w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All states</SelectItem>
              <SelectItem value="due">Due for revision</SelectItem>
              <SelectItem value="new">{STATE_LABELS.new}</SelectItem>
              <SelectItem value="learning">{STATE_LABELS.learning}</SelectItem>
              <SelectItem value="familiar">{STATE_LABELS.familiar}</SelectItem>
              <SelectItem value="strong">{STATE_LABELS.strong}</SelectItem>
              <SelectItem value="mastered">{STATE_LABELS.mastered}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4 pb-1">
          <span className="flex items-center gap-1.5 text-xs">
            <Switch id="kg-prereq" checked={showPrereq} onCheckedChange={setShowPrereq} />
            <Label htmlFor="kg-prereq">Prerequisites</Label>
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Switch id="kg-seq" checked={showSequence} onCheckedChange={setShowSequence} />
            <Label htmlFor="kg-seq">Order</Label>
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Switch id="kg-bridge" checked={showBridge} onCheckedChange={setShowBridge} />
            <Label htmlFor="kg-bridge">Bridges</Label>
          </span>
        </div>
        <div className="flex items-center gap-1 pb-1">
          <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Zoom in" onClick={() => zoomAt(1.25, VIEW_W / 2, VIEW_H / 2)}>
            <Plus className="h-4 w-4" aria-hidden />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Zoom out" onClick={() => zoomAt(1 / 1.25, VIEW_W / 2, VIEW_H / 2)}>
            <Minus className="h-4 w-4" aria-hidden />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Reset view" onClick={() => applyView({ k: 1, tx: 0, ty: 0 })}>
            <Maximize2 className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* the graph */}
        <div className="overflow-hidden rounded-xl border bg-card/60">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="block h-auto w-full cursor-grab touch-none active:cursor-grabbing"
            role="img"
            aria-label="Knowledge graph of library lessons, prerequisites and concept bridges"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <defs>
              <marker id="kg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1 L 9 5 L 0 9 z" className="fill-foreground/60" />
              </marker>
            </defs>
            <g transform={`translate(${view.tx},${view.ty}) scale(${view.k})`}>
              {/* chapter hulls */}
              {hulls.map((h) => (
                <g key={h.key}>
                  <circle cx={h.cx} cy={h.cy} r={h.r} fill={h.color} fillOpacity={0.07} stroke={h.color} strokeOpacity={0.3} strokeDasharray="4 6" strokeWidth={1} />
                  <text
                    x={h.cx}
                    y={h.cy - h.r + 13}
                    textAnchor="middle"
                    className="fill-foreground/70 text-[10px] font-semibold uppercase tracking-wide"
                    style={{ paintOrder: 'stroke', stroke: 'var(--background)', strokeWidth: 3 }}
                  >
                    {h.label}
                  </text>
                </g>
              ))}

              {/* edges */}
              {visibleEdges.map((e, i) => {
                const a = layout.get(e.source)
                const b = layout.get(e.target)
                if (!a || !b) return null
                const isFocus = focus != null && (e.source === focus || e.target === focus)
                const dimmed = focus != null && !isFocus
                if (e.kind === 'prereq') {
                  return (
                    <line
                      key={`p${i}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      className={isFocus ? 'stroke-foreground/80' : 'stroke-foreground/35'}
                      strokeWidth={isFocus ? 1.8 : 1.1}
                      markerEnd="url(#kg-arrow)"
                      opacity={dimmed ? 0.12 : 1}
                    />
                  )
                }
                if (e.kind === 'sequence') {
                  return (
                    <line
                      key={`s${i}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      className="stroke-muted-foreground/50"
                      strokeWidth={0.8}
                      strokeDasharray="2 4"
                      opacity={dimmed ? 0.08 : 0.7}
                    />
                  )
                }
                return (
                  <line
                    key={`b${i}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className="stroke-amber-500/60"
                    strokeWidth={Math.max(0.8, e.weight * 2.2)}
                    strokeDasharray="7 5"
                    opacity={dimmed ? 0.08 : 0.8}
                  />
                )
              })}

              {/* nodes */}
              {visibleNodes.map((n) => {
                const p = layout.get(n.id)
                if (!p) return null
                const r = nodeRadius(n)
                const st = passesState(n)
                const isSel = selected === n.id
                const isHover = hovered === n.id
                const isFocusEdge = focusEdges.has(n.id)
                const dimmed = focus != null && !isFocusEdge && n.id !== focus
                const overdue = dueNow(n)
                const showLabel =
                  isSel || isHover || (searchTerms.length > 0 && matchesSearch(n)) || view.k >= 2.2
                return (
                  <g
                    key={n.id}
                    transform={`translate(${p.x},${p.y})`}
                    opacity={dimmed ? 0.25 : 1}
                    className="cursor-pointer"
                    onPointerEnter={() => setHovered(n.id)}
                    onPointerLeave={() => setHovered(null)}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelected(n.id === selected ? null : n.id)
                    }}
                  >
                    <circle r={r + 9} fill="transparent" aria-hidden />
                    {overdue && (
                      <circle
                        r={r + 3.5}
                        fill="none"
                        className="stroke-rose-500"
                        strokeWidth={1.8}
                        strokeDasharray="3 2.5"
                      />
                    )}
                    <circle
                      r={r}
                      className={`${NODE_FILL[st] ?? NODE_FILL.new} ${isSel || isHover ? 'stroke-primary' : 'stroke-background'}`}
                      strokeWidth={isSel || isHover ? 2.4 : 1.2}
                    />
                    {busyId === n.id && (
                      <circle r={r + 6} fill="none" className="stroke-primary/60 animate-pulse" strokeWidth={1.5} />
                    )}
                    {showLabel && (
                      <text
                        y={r + 12}
                        textAnchor="middle"
                        className="fill-foreground/85 text-[10px] font-medium"
                        style={{ paintOrder: 'stroke', stroke: 'var(--background)', strokeWidth: 3 }}
                      >
                        {n.number} {n.title.length > 26 ? `${n.title.slice(0, 25)}…` : n.title}
                      </text>
                    )}
                  </g>
                )
              })}
            </g>
          </svg>
          {/* legend */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t px-3 py-2 text-[11px] text-muted-foreground">
            {(['new', 'learning', 'familiar', 'strong', 'mastered'] as const).map((s) => (
              <span key={s} className="inline-flex items-center gap-1">
                <span className={`h-2.5 w-2.5 rounded-full ${STATE_STYLES[s].dot}`} aria-hidden />
                {STATE_LABELS[s]}
              </span>
            ))}
            <span className="inline-flex items-center gap-1">
              <svg width="18" height="6" aria-hidden>
                <line x1="0" y1="3" x2="18" y2="3" className="stroke-foreground/50" strokeWidth="1.4" />
              </svg>
              prerequisite
            </span>
            <span className="inline-flex items-center gap-1">
              <svg width="18" height="6" aria-hidden>
                <line x1="0" y1="3" x2="18" y2="3" className="stroke-muted-foreground/60" strokeWidth="1.2" strokeDasharray="2 3" />
              </svg>
              order
            </span>
            <span className="inline-flex items-center gap-1">
              <svg width="18" height="6" aria-hidden>
                <line x1="0" y1="3" x2="18" y2="3" className="stroke-amber-500/70" strokeWidth="1.6" strokeDasharray="6 4" />
              </svg>
              concept bridge
            </span>
            <span className="inline-flex items-center gap-1">
              <svg width="12" height="12" aria-hidden>
                <circle cx="6" cy="6" r="4" fill="none" className="stroke-rose-500" strokeWidth="1.6" strokeDasharray="3 2" />
              </svg>
              overdue
            </span>
            <span>node size = revision passes · drag to pan · scroll to zoom</span>
          </div>
        </div>

        {/* detail panel */}
        <aside className="order-first xl:order-last">
          {selectedNode ? (
            <div className="space-y-4 rounded-xl border bg-card p-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {selectedNode.bookTitle} · Chapter {selectedNode.chapterNumber}
                </p>
                <h3 className="mt-1 font-reading text-lg font-bold leading-snug">
                  {selectedNode.number} {selectedNode.title}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{selectedNode.chapterTitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={STATE_STYLES[passesState(selectedNode)].chip}>
                  {STATE_LABELS[passesState(selectedNode)]}
                </Badge>
                {selectedNode.studied ? (
                  <>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                      <RotateCcw className="h-3 w-3" aria-hidden /> {selectedNode.passes}×
                    </span>
                    {selectedNode.dueAt && (
                      <span className={`text-xs font-medium tabular-nums ${dueNow(selectedNode) ? 'text-rose-600 dark:text-rose-400' : 'text-muted-foreground'}`}>
                        due {formatDate(selectedNode.dueAt)}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">not in your ledger yet</span>
                )}
              </div>

              {selectedNode.studied && (
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Mastery</span>
                    <span className="tabular-nums">{selectedNode.mastery}/100</span>
                  </div>
                  <MasteryBar mastery={selectedNode.mastery ?? 0} state={passesState(selectedNode)} />
                </div>
              )}

              {selectedNode.concepts.length > 0 && (
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-muted-foreground">Concepts</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedNode.concepts.map((c) => (
                      <Badge key={c} variant="secondary" className="h-auto whitespace-normal text-[10px] font-normal leading-relaxed">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selPrereqs.length > 0 && (
                <div>
                  <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                    <Share2 className="h-3 w-3" aria-hidden /> Builds on
                  </p>
                  <ul className="space-y-1">
                    {selPrereqs.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => setSelected(p.id)}
                          className="text-left text-xs text-muted-foreground hover:text-foreground hover:underline"
                        >
                          {p.number} {p.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dependents.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">Unlocks</p>
                  <ul className="max-h-28 space-y-1 overflow-y-auto pr-1">
                    {dependents.slice(0, 8).map((d) => (
                      <li key={d.id}>
                        <button
                          type="button"
                          onClick={() => setSelected(d.id)}
                          className="text-left text-xs text-muted-foreground hover:text-foreground hover:underline"
                        >
                          {d.number} {d.title}
                        </button>
                      </li>
                    ))}
                    {dependents.length > 8 && (
                      <li className="text-xs text-muted-foreground">+{dependents.length - 8} more</li>
                    )}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 border-t pt-3">
                <Button asChild size="sm" className="gap-1.5">
                  <Link href={selectedNode.url}>
                    <BookOpen className="h-3.5 w-3.5" aria-hidden /> Open lesson
                  </Link>
                </Button>
                {selectedNode.studied ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    onClick={() => void handleMark(selectedNode, 'revise')}
                    disabled={busyId === selectedNode.id}
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Revise now
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    onClick={() => void handleMark(selectedNode, 'study')}
                    disabled={busyId === selectedNode.id}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Mark studied
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => setSelected(null)}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed bg-card/40 p-4 text-sm leading-6 text-muted-foreground">
              <p className="font-semibold text-foreground/80">Explore your knowledge map</p>
              <p className="mt-1.5">
                Every lesson is a node. Solid arrows are author-declared prerequisites — the true
                dependency structure of the library. Dashed amber links are concept bridges between
                chapters. Size shows revision passes; the rose ring marks overdue items.
              </p>
              <p className="mt-1.5">Click any node for details, prerequisite chains and one-click marking.</p>
              <p className="mt-3 text-xs tabular-nums text-muted-foreground/80">
                {graph.stats.nodes} lessons · {graph.stats.prereqEdges} prerequisite links ·{' '}
                {graph.stats.bridgeEdges} concept bridges
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
