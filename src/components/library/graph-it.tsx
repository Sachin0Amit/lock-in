'use client'

/**
 * GraphIt — the FX-02 "Graph it" affordance (owner-approved 2026-11-11):
 * a small plot icon on every rendered display equation that can honestly
 * be graphed; clicking it opens an inline grapher with sliders for the
 * equation's constants. Works on any book's equations — equation blocks,
 * "Remember —" formula cards, derivation steps and the glossary formula
 * sheet all render through <Math display>, which mounts this beside the
 * typeset equation. Ungraphable equations simply never show the icon.
 */
import { LineChart, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { evalExpr, parseEquation, type PlotSpec } from './latex-plot'

/* Fixed paper palette — identical strategy to the book figure blocks:
   the grapher stays a light "printed worksheet" even in dark mode, so
   the canvas ink never has to track a theme. */
const PAPER = '#fffdf5'
const GRID = '#e7e5e4'
const AXIS = '#a8a29e'
const TICK = '#57534e'
const CURVE_COLORS = ['#0f766e', '#b45309']

interface View {
  x0: number
  x1: number
  y0: number
  y1: number
}

const DEFAULT_VIEW: View = { x0: -10, x1: 10, y0: -10, y1: 10 }

export function GraphIt({ tex }: { tex: string }) {
  const spec = useMemo(() => parseEquation(tex), [tex])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!spec) return null
  return (
    <>
      <button
        type="button"
        className="graphit-btn"
        aria-label="Graph this equation"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <LineChart className="h-3.5 w-3.5" aria-hidden />
      </button>
      {open && <GraphItPanel spec={spec} onClose={() => setOpen(false)} />}
    </>
  )
}

/* ---------------------------------------------------------------- */

function GraphItPanel({ spec, onClose }: { spec: PlotSpec; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [view, setView] = useState<View>(() => fitY(spec, DEFAULT_VIEW))
  const [params, setParams] = useState<Record<string, number>>(() =>
    Object.fromEntries(spec.params.map((p) => [p, 1])),
  )
  const dragRef = useRef<{ px: number; py: number; v: View } | null>(null)

  const draw = useCallback(() => {
    const cv = canvasRef.current
    if (!cv) return
    const dpr = window.devicePixelRatio || 1
    const W = cv.clientWidth
    const H = cv.clientHeight
    if (W === 0 || H === 0) return
    if (cv.width !== Math.round(W * dpr)) {
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
    }
    const ctx = cv.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = PAPER
    ctx.fillRect(0, 0, W, H)

    const { x0, x1, y0, y1 } = view
    const sx = (x: number) => ((x - x0) / (x1 - x0)) * W
    const sy = (yv: number) => H - ((yv - y0) / (y1 - y0)) * H

    // grid + ticks
    const xstep = niceStep(x1 - x0)
    const ystep = niceStep(y1 - y0)
    ctx.lineWidth = 1
    ctx.strokeStyle = GRID
    ctx.beginPath()
    for (let x = Math.ceil(x0 / xstep) * xstep; x <= x1 + 1e-9; x += xstep) {
      const px = Math.round(sx(x)) + 0.5
      ctx.moveTo(px, 0)
      ctx.lineTo(px, H)
    }
    for (let yv = Math.ceil(y0 / ystep) * ystep; yv <= y1 + 1e-9; yv += ystep) {
      const py = Math.round(sy(yv)) + 0.5
      ctx.moveTo(0, py)
      ctx.lineTo(W, py)
    }
    ctx.stroke()

    // axes
    ctx.strokeStyle = AXIS
    ctx.lineWidth = 1.5
    ctx.beginPath()
    if (y0 <= 0 && y1 >= 0) {
      ctx.moveTo(0, Math.round(sy(0)) + 0.5)
      ctx.lineTo(W, Math.round(sy(0)) + 0.5)
    }
    if (x0 <= 0 && x1 >= 0) {
      ctx.moveTo(Math.round(sx(0)) + 0.5, 0)
      ctx.lineTo(Math.round(sx(0)) + 0.5, H)
    }
    ctx.stroke()

    // tick labels
    ctx.fillStyle = TICK
    ctx.font = '10px ui-sans-serif, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    const labelY = Math.min(Math.max(sy(0) + 3, 2), H - 13)
    for (let x = Math.ceil(x0 / xstep) * xstep; x <= x1 + 1e-9; x += xstep) {
      if (Math.abs(x) < xstep / 4) continue
      ctx.fillText(fmtTick(x, xstep), sx(x), labelY)
    }
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    const labelX = Math.min(Math.max(sx(0) + 4, 2), W - 34)
    for (let yv = Math.ceil(y0 / ystep) * ystep; yv <= y1 + 1e-9; yv += ystep) {
      if (Math.abs(yv) < ystep / 4) continue
      ctx.fillText(fmtTick(yv, ystep), labelX, sy(yv))
    }

    // curves — sampled every ~2 css px, polyline broken at non-finite
    // points and at asymptote-scale jumps so poles read as poles
    if (spec.mode === 'vertical') {
      // solved forms `x = <x-free expr>`: one vertical line whose position
      // the sliders steer; nothing to sample along x
      const k = evalExpr(spec.curves[0].expr, 0, params)
      if (Number.isFinite(k) && k >= x0 && k <= x1) {
        ctx.strokeStyle = CURVE_COLORS[0]
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(Math.round(sx(k)) + 0.5, 0)
        ctx.lineTo(Math.round(sx(k)) + 0.5, H)
        ctx.stroke()
      }
    }
    spec.curves.forEach((c, ci) => {
      ctx.strokeStyle = CURVE_COLORS[ci % CURVE_COLORS.length]
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.beginPath()
      let penUp = true
      let prevSy: number | null = null
      const steps = Math.max(160, Math.round(W / 2))
      for (let i = 0; i <= steps; i++) {
        const x = x0 + ((x1 - x0) * i) / steps
        const yv = evalExpr(c.expr, x, params)
        if (!Number.isFinite(yv)) {
          penUp = true
          prevSy = null
          continue
        }
        const py = sy(yv)
        if (py < -2 * H || py > 3 * H) {
          penUp = true
          prevSy = null
          continue
        }
        if (prevSy !== null && Math.abs(py - prevSy) > 2 * H) penUp = true
        if (penUp) {
          ctx.moveTo(sx(x), py)
          penUp = false
        } else {
          ctx.lineTo(sx(x), py)
        }
        prevSy = py
      }
      ctx.stroke()
    })
  }, [spec, view, params])

  useEffect(() => {
    draw()
  }, [draw])

  // keep crisp through container resizes
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => draw())
    ro.observe(cv)
    return () => ro.disconnect()
  }, [draw])

  const zoom = (factor: number) => {
    setView((v) => {
      const cx = (v.x0 + v.x1) / 2
      const cy = (v.y0 + v.y1) / 2
      const hw = ((v.x1 - v.x0) / 2) * factor
      const hh = ((v.y1 - v.y0) / 2) * factor
      return { x0: cx - hw, x1: cx + hw, y0: cy - hh, y1: cy + hh }
    })
  }

  const reset = () => {
    setParams(Object.fromEntries(spec.params.map((p) => [p, 1])))
    setView(fitY(spec, DEFAULT_VIEW))
  }

  return (
    <div className="graphit-panel" role="group" aria-label="Inline grapher">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#57534e]">
          Grapher
        </span>
        {spec.mode === 'identity' ? (
          spec.curves.map((c, i) => (
            <span key={c.label} className="graphit-chip">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: CURVE_COLORS[i % CURVE_COLORS.length] }}
                aria-hidden
              />
              {c.label}
            </span>
          ))
        ) : (
          <span className="graphit-chip">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: CURVE_COLORS[0] }}
              aria-hidden
            />
            {spec.mode === 'vertical' ? 'x' : 'y'}
          </span>
        )}
        <span className="ml-auto flex items-center gap-1">
          <button type="button" className="graphit-ctl" aria-label="Zoom out" onClick={() => zoom(4 / 3)}>
            <ZoomOut className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button type="button" className="graphit-ctl" aria-label="Zoom in" onClick={() => zoom(0.75)}>
            <ZoomIn className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button type="button" className="graphit-ctl" aria-label="Reset view and constants" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button type="button" className="graphit-ctl" aria-label="Close grapher" onClick={onClose}>
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </span>
      </div>

      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive plot of the equation — drag to pan"
        onPointerDown={(e) => {
          const cv = e.currentTarget
          dragRef.current = { px: e.clientX, py: e.clientY, v: view }
          cv.setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          const d = dragRef.current
          if (!d) return
          const cv = e.currentTarget
          const W = cv.clientWidth || 1
          const H = cv.clientHeight || 1
          const dx = ((d.px - e.clientX) / W) * (d.v.x1 - d.v.x0)
          const dy = ((d.py - e.clientY) / H) * (d.v.y1 - d.v.y0)
          dragRef.current = { px: e.clientX, py: e.clientY, v: d.v }
          setView({ x0: d.v.x0 + dx, x1: d.v.x1 + dx, y0: d.v.y0 + dy, y1: d.v.y1 + dy })
        }}
        onPointerUp={(e) => {
          dragRef.current = null
          e.currentTarget.releasePointerCapture?.(e.pointerId)
        }}
        onPointerCancel={() => {
          dragRef.current = null
        }}
      />

      {spec.params.length > 0 && (
        <div className="mt-2.5 grid gap-x-5 gap-y-1.5 sm:grid-cols-2">
          {spec.params.map((p) => (
            <label key={p} className="flex items-center gap-2 text-[12px] text-[#1c1917]">
              <span className="w-4 shrink-0 text-center font-semibold">{p}</span>
              <input
                type="range"
                className="graphit-slider h-1.5 flex-1"
                min={-5}
                max={5}
                step={0.05}
                value={params[p] ?? 1}
                aria-label={`Constant ${p}`}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setParams((old) => ({ ...old, [p]: v }))
                }}
              />
              <span className="w-10 shrink-0 text-right font-mono text-[11px] text-[#57534e]">
                {fmtNum(params[p] ?? 1)}
              </span>
            </label>
          ))}
        </div>
      )}

      <p className="mt-2 text-[11px] leading-4 text-[#78716c]">
        {spec.params.length > 0
          ? 'Drag the plot to pan · sliders steer the equation’s constants · defaults restore at reset'
          : 'Drag the plot to pan · zoom and reset at the top right'}
      </p>
    </div>
  )
}

/* ---------------------------------------------------------------- */

function niceStep(span: number): number {
  const raw = span / 10
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  for (const m of [1, 2, 5, 10]) {
    if (mag * m >= raw) return mag * m
  }
  return mag * 10
}

function fmtTick(v: number, step: number): string {
  const decimals = step >= 1 ? 0 : step >= 0.1 ? 1 : 2
  let s = v.toFixed(decimals)
  if (s === '-0') s = '0'
  return s
}

function fmtNum(v: number): string {
  const s = (Math.round(v * 100) / 100).toString()
  return s
}

/** Choose a readable y-window from the curve(s) at default constants —
 *  percentile-clipped so a single pole does not flatten the whole plot.
 *  Runs only at mount/reset, never on slider input. */
function fitY(spec: PlotSpec, base: View): View {
  if (spec.mode === 'vertical') return base // constant x-position, default window is right
  const defaults = Object.fromEntries(spec.params.map((p) => [p, 1]))
  const ys: number[] = []
  for (let i = 0; i <= 400; i++) {
    const x = base.x0 + ((base.x1 - base.x0) * i) / 400
    for (const c of spec.curves) {
      const yv = evalExpr(c.expr, x, defaults)
      if (Number.isFinite(yv)) ys.push(yv)
    }
  }
  if (ys.length === 0) return base
  ys.sort((a, b) => a - b)
  const lo = ys[Math.floor(ys.length * 0.05)]
  const hi = ys[Math.min(ys.length - 1, Math.floor(ys.length * 0.95))]
  let y0 = lo
  let y1 = hi
  if (y1 - y0 < 2) {
    const mid = (y0 + y1) / 2
    y0 = mid - 1
    y1 = mid + 1
  }
  const pad = (y1 - y0) * 0.12
  y0 -= pad
  y1 += pad
  const span = y1 - y0
  if (span > 2000) {
    const mid = (y0 + y1) / 2
    y0 = mid - 1000
    y1 = mid + 1000
  }
  return { ...base, y0, y1 }
}
