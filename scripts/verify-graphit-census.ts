/**
 * verify-graphit-census.ts — offline gate for FX-02 "Graph it"
 * (owner-approved 2026-11-11). Two layers, zero server needed:
 *
 *   A. parser unit asserts — the LaTeX subset is graded against equations
 *      lifted verbatim from the shelf, plus canonical future-book forms
 *      (trig identities, log base, Greek parameters) and a REFUSAL list:
 *      differentials, subscripts, matrices, capital function heads P(x),
 *      \text/\iff/\deg statements must all yield null, never a wrong plot;
 *   B. a full-shelf census — every display equation, formula card and
 *      derivation-step latex across all 28 books is parsed and counted by
 *      mode, with named examples for eyeballing.
 *
 * Run: bun scripts/verify-graphit-census.ts
 */
import { allBooks } from '../src/data/library/index'
import { evalExpr, parseEquation } from '../src/components/library/latex-plot'

let failures = 0

function ok(cond: boolean, label: string) {
  if (!cond) {
    failures++
    console.log('FAIL ' + label)
  }
}

function near(a: number, b: number, eps = 1e-9) {
  return Math.abs(a - b) <= eps
}

function yAt(tex: string, x: number, params: Record<string, number> = {}): number {
  const spec = parseEquation(tex)
  if (!spec) return NaN
  return evalExpr(spec.curves[0].expr, x, params)
}

/* ---------------- A. unit asserts ---------------- */

// 1. the shelf's chained quadratic (chained segments plot the head relation)
const QUAD = 'y = ax^2 + bx + c \\;=\\; a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{\\Delta}{4a}, \\qquad \\Delta = b^2 - 4ac'
{
  const s = parseEquation(QUAD)
  ok(s !== null, 'quad parses')
  if (s) {
    ok(s.mode === 'function', 'quad mode function')
    ok(JSON.stringify(s.params.sort()) === '["a","b","c"]', 'quad params a,b,c — got ' + JSON.stringify(s.params))
    ok(near(yAt(QUAD, 3, { a: 1, b: -2, c: 1 }), 4), 'quad y(3)=4')
  }
}

// 2. the monomial quotient identity (FormulaBlock, trailing side-clause)
const MONO = '\\frac{a x^m}{b x^n} = \\frac{a}{b}\\, x^{m-n} \\qquad (x \\neq 0)'
{
  const s = parseEquation(MONO)
  ok(s !== null && s.mode === 'identity', 'mono identity')
  if (s) {
    ok(s.curves.length === 2, 'mono two curves')
    ok(s.params.sort().join(',') === 'a,b,m,n'.split(',').sort().join(','), 'mono params a,b,m,n')
    const p = { a: 2, b: 5, m: 3, n: 1 }
    ok(near(evalExpr(s.curves[0].expr, 2, p), evalExpr(s.curves[1].expr, 2, p)), 'mono sides equal at x=2')
  }
}

// 3. the two-variable linear forms (no y-head; solved implicitly)
{
  ok(near(yAt('\\frac{x}{2} + \\frac{y}{3} = 8, \\quad \\frac{x}{6} - \\frac{y}{6} = 1', 0), 24), 'x/2+y/3=8 → y(0)=24')
  ok(near(yAt('\\frac{x}{2} + \\frac{y}{3} = 8, \\quad \\frac{x}{6} - \\frac{y}{6} = 1', 8), 12), '…y(8)=12')
  ok(near(yAt('x + y = 10, \\qquad x - y = 2', 3), 7), 'x+y=10 → y(3)=7')
  ok(near(yAt('a\\,x + b\\,y = c, \\qquad (a, b) \\neq (0, 0)', 2, { a: 1, b: 2, c: 6 }), 2), 'ax+by=c solved')
  ok(near(yAt('0.5x + 0.25y = 10, \\quad 0.75x - 0.25y = 5', 8), 24), '0.5x+0.25y=10 → y(8)=24')
  ok(near(yAt('y = mx + c', 2, { m: 3, c: 1 }), 7), 'y=mx+c')
  ok(near(yAt('y = c', 100, { c: 4 }), 4), 'y=c horizontal')
}

// 4. future-book forms the same parser must already handle
{
  const s = parseEquation('\\sin^2 x + \\cos^2 x = 1')
  ok(s !== null && s.mode === 'identity', 'pythagorean identity')
  if (s) ok(near(evalExpr(s.curves[0].expr, 0.7, {}), 1), 'sin²+cos²=1 at 0.7')
  ok(near(yAt('y = \\sqrt{x}', 4), 2), 'sqrt(4)=2')
  ok(!Number.isFinite(yAt('y = \\sqrt{x}', -1)), 'sqrt(-1) refuses')
  ok(near(yAt('y = 2^{x}', 3), 8), '2^3=8')
  ok(near(yAt('y = \\left|x-2\\right|', 1), 1), 'abs')
  ok(near(yAt('y = \\sin 2x', Math.PI / 4), 1, 1e-12), 'sin 2x = sin(2x)')
  ok(near(yAt('y = a\\sin(bx + c)', Math.PI / 2, { a: 2, b: 1, c: 0 }), 2, 1e-12), 'a sin(bx+c)')
  ok(near(yAt('y = \\log_{10} x', 100), 2, 1e-12), 'log10(100)=2')
  ok(near(yAt('y = \\frac{\\sin x}{\\cos x}', 0), 0, 1e-12), 'tan as quotient')
  const g = parseEquation('y = a\\sin(\\omega x + \\phi)')
  ok(g !== null && g.params.join(',') === 'a,ω,φ', 'greek params — got ' + (g ? JSON.stringify(g.params) : 'null'))
  ok(near(yAt('y = \\sqrt[3]{x}', 8), 2), 'cube root')
  ok(near(yAt('f(x) = x^2 + 2x + 1', 3), 16), 'f(x) head')
  // solved forms `x = <x-free expr>` → vertical line mode
  const v = parseEquation('x = (c - b)/a \\quad \\text{for } a = 2..9')
  ok(v !== null && v.mode === 'vertical', 'solved form is vertical — got ' + (v ? v.mode : 'null'))
  if (v) {
    ok(v.params.sort().join(',') === 'a,b,c', 'solved form params a,b,c')
    ok(near(evalExpr(v.curves[0].expr, 0, { a: 2, b: 1, c: 9 }), 4), 'x=(c-b)/a → 4')
  }
  const vc = parseEquation('x = \\tfrac{a}{10^j}, \\qquad y = \\tfrac{b}{10^k}')
  ok(vc !== null && vc.mode === 'vertical' && vc.params.join(',') === 'a,j', 'decimal solved form vertical')
}

// 5. REFUSALS — anything here must be null, never a wrong plot
{
  const refusals = [
    'R(x) = \\frac{P(x)}{Q(x)}',
    'f(x) = d(x) \\cdot q(x) + r(x), \\qquad \\deg r < \\deg d',
    '\\frac{dy}{dx} = 2x',
    "y' = x",
    'a_1 + a_2 = 0',
    '\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}',
    'a^2 + b^2 = c^2',
    'ax + ay + bx + by = (x + y)(a + b)',
    'y = k \\text{ horizontal}',
    '\\frac{P(x)}{Q(x)} = 0 \\;\\iff\\; P(x) = 0',
    '\\int_0^1 x\\,dx = \\frac{1}{2}',
    'x = x_0 + \\tfrac{b}{d} t, \\qquad y = y_0 - \\tfrac{a}{d} t',
    'a \\equiv b \\pmod n',
    'x > 3',
    '(f \\circ g)(x) = f(g(x))',
    'x \\mapsto f(x)',
    '0.5x + 0.25y',
  ]
  for (const r of refusals) ok(parseEquation(r) === null, 'REFUSAL: ' + r.slice(0, 44))
}

/* ---------------- B. shelf census ---------------- */

interface Row {
  book: string
  lesson: string
  latex: string
  mode: string
  params: number
}

const rows: Row[] = []
let scanned = 0

for (const book of allBooks) {
  for (const chapter of book.chapters) {
    for (const lesson of chapter.lessons) {
      for (const b of lesson.blocks) {
        const latexes: string[] = []
        if (b.kind === 'equation') latexes.push(b.latex)
        else if (b.kind === 'formula') latexes.push(b.latex)
        else if (b.kind === 'derivation') {
          for (const st of b.steps) if (st.formula) latexes.push(st.formula)
        }
        for (const lt of latexes) {
          scanned++
          const spec = parseEquation(lt)
          if (spec) rows.push({ book: book.id, lesson: lesson.id, latex: lt, mode: spec.mode, params: spec.params.length })
        }
      }
    }
  }
}

const modes: Record<string, number> = {}
for (const r of rows) modes[r.mode] = (modes[r.mode] ?? 0) + 1

console.log('== graph-it census ==')
console.log('latex scanned: ' + scanned)
console.log('plottable: ' + rows.length + ' (' + scanned + ' → ' + (100 * rows.length / Math.max(1, scanned)).toFixed(1) + '%)')
console.log('modes: ' + JSON.stringify(modes))
console.log('with sliders: ' + rows.filter((r) => r.params > 0).length)
console.log('examples:')
for (const r of rows.slice(0, 14)) {
  console.log('  [' + r.mode + '] ' + r.book + '/' + r.lesson + ' :: ' + r.latex.slice(0, 64))
}

// floor: honest coverage on the three authored books; grows as lessons ship
ok(scanned > 400, 'census scanned the whole shelf (' + scanned + ')')
ok(rows.length >= 25, 'plottable floor 25 — got ' + rows.length)

if (failures === 0) console.log('CENSUS-PASS')
else {
  console.log('CENSUS-FAIL: ' + failures + ' failures')
  process.exit(1)
}
