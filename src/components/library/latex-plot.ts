/**
 * latex-plot.ts — LaTeX equation → plottable spec for the "Graph it" tool
 * (PROPOSED_FEATURES FX-02, owner-approved 2026-11-11).
 *
 * Scope (deliberately honest — anything outside it refuses to plot rather
 * than guessing): a display equation becomes a PlotSpec when, after
 * dropping top-level `\qquad`/`\quad` side remarks and one trailing
 * parenthesised side condition (`(b \neq 0)`-style), it reduces to
 *
 *   1. FUNCTION — `y = …`, `y(x) = …`, `f(x) = …`, `g(x) = …`, `h(x) = …`
 *      (a chained `y = A = B` plots the first relation only);
 *   2. LINE — any two-sided relation in x and y that is LINEAR in y
 *      (`ax + by = c` → y = (c − ax)/b), so the shelf's favourite linear
 *      forms graph without the book solving for y first;
 *   3. IDENTITY — both sides are expressions in x with no y at all
 *      (`\frac{ax^m}{bx^n} = \frac{a}{b}x^{m-n}`), drawn as two curves that
 *      visually coincide when the identity holds.
 *
 * Every other letter (and the common Greek letters except `\pi`, plus
 * `\Delta` etc.) becomes a slider constant, default 1. Unsupported
 * constructs (`\text`, subscripts, `\iff`, integrals, `P(x)`-style capital
 * function heads, inequalities, …) make the equation ungraphable → null →
 * the plot icon simply never appears on it.
 *
 * Pure TypeScript, no React, no 'use client' — importable from Bun scripts
 * for the census gate. Throws are contained: parseEquation never throws.
 */

/* ------------------------------------------------------------------ */
/* AST                                                                 */
/* ------------------------------------------------------------------ */

export type Expr =
  | { t: 'num'; v: number }
  | { t: 'x' }
  | { t: 'y' }
  | { t: 'par'; name: string }
  | { t: 'bin'; op: '+' | '-' | '*' | '/'; a: Expr; b: Expr }
  | { t: 'neg'; a: Expr }
  | { t: 'pow'; a: Expr; b: Expr }
  | { t: 'fn'; name: string; arg: Expr }
  | { t: 'abs'; a: Expr }

export type PlotMode = 'function' | 'line' | 'identity' | 'vertical'

export interface PlotSpec {
  mode: PlotMode
  /** One curve for function/line (label `y`), two for identity (LHS/RHS). */
  curves: { label: string; expr: Expr }[]
  /** Slider constants, first-appearance order across the plotted curves. */
  params: string[]
}

/* ------------------------------------------------------------------ */
/* Tokenizer                                                           */
/* ------------------------------------------------------------------ */

type Tok =
  | { k: 'num'; v: number }
  | { k: 'ch'; c: string }
  | { k: 'letter'; c: string }
  | { k: 'cmd'; c: string }

/** Commands that are honest constants / parameters, never sliders:
 *  pi is the circle constant; e is handled as a plain letter below. */
const GREEK_PARAMS: Record<string, string> = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', Delta: 'Δ', epsilon: 'ε',
  varepsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ', vartheta: 'θ', iota: 'ι',
  kappa: 'κ', lambda: 'λ', Lambda: 'Λ', mu: 'μ', nu: 'ν', xi: 'ξ', rho: 'ρ',
  sigma: 'σ', Sigma: 'Σ', tau: 'τ', upsilon: 'υ', phi: 'φ', varphi: 'φ',
  Phi: 'Φ', chi: 'χ', psi: 'ψ', omega: 'ω', Omega: 'Ω', Gamma: 'Γ',
}

const FUNCTIONS: Record<string, string> = {
  sin: 'sin', cos: 'cos', tan: 'tan', sec: 'sec', csc: 'csc', cot: 'cot',
  arcsin: 'asin', arccos: 'acos', arctan: 'atan',
  sinh: 'sinh', cosh: 'cosh', tanh: 'tanh', coth: 'coth',
  ln: 'ln', log: 'log', lg: 'log', exp: 'exp',
}

/** Spacing / sizing decorations that carry no mathematical meaning here. */
const STRIP_PREFIXES = [
  'left', 'right', 'bigl', 'Bigl', 'biggl', 'Biggl', 'bigr', 'Bigr',
  'biggr', 'Biggr', 'big', 'Big', 'bigg', 'Bigg', 'displaystyle',
  'textstyle', 'limits', 'nolimits', 'ensuremath', 'mathopen', 'mathclose',
]

const SPACING = [',', ';', ':', '!', ' ', 'quad', 'thinspace', 'medspace', 'enspace', 'quad', 'qquad']

function normalize(tex: string): string {
  let s = tex
  // \quad/\qquad never reach here (split off earlier); strip the rest.
  for (const p of STRIP_PREFIXES) {
    s = s.split('\\' + p + ' ').join(' ')
    s = s.split('\\' + p).join(' ')
  }
  for (const sp of SPACING) s = s.split('\\' + sp).join(' ')
  // \left( etc. already collapsed above; drop stray space padding.
  return s.replace(/\s+/g, ' ').trim()
}

function tokenize(s: string): Tok[] {
  const toks: Tok[] = []
  let i = 0
  const n = () => s[i]
  while (i < s.length) {
    const c = s[i]
    if (c === ' ') { i++; continue }
    if (/[0-9]/.test(c)) {
      let j = i
      while (j < s.length && /[0-9]/.test(s[j])) j++
      if (s[j] === '.' && /[0-9]/.test(s[j + 1] ?? '')) {
        j++
        while (j < s.length && /[0-9]/.test(s[j])) j++
      }
      toks.push({ k: 'num', v: Number(s.slice(i, j)) })
      i = j
      continue
    }
    if (c === '\\') {
      const m = /^\\([a-zA-Z]+)/.exec(s.slice(i))
      if (!m) throw new Error('stray backslash')
      const name = m[1]
      i += m[0].length
      if (name === 'frac' || name === 'tfrac' || name === 'dfrac') toks.push({ k: 'cmd', c: 'frac' })
      else if (name === 'sqrt') toks.push({ k: 'cmd', c: 'sqrt' })
      else if (name === 'cdot' || name === 'times') toks.push({ k: 'ch', c: '*' })
      else if (name === 'div') toks.push({ k: 'ch', c: '/' })
      else if (name === 'pi') toks.push({ k: 'num', v: Math.PI })
      else if (name === 'lvert' || name === 'rvert' || name === 'vert' || name === 'vert') {
        toks.push({ k: 'ch', c: '|' })
      } else if (name === 'lfloor' || name === 'rfloor' || name === 'lceil' || name === 'rceil') {
        throw new Error('floor/ceil unsupported')
      } else if (FUNCTIONS[name]) toks.push({ k: 'cmd', c: 'fn:' + FUNCTIONS[name] })
      else if (GREEK_PARAMS[name] !== undefined) toks.push({ k: 'cmd', c: 'greek:' + GREEK_PARAMS[name] })
      else throw new Error('unsupported command \\' + name)
      continue
    }
    if (/[a-zA-Z]/.test(c)) { toks.push({ k: 'letter', c }); i++; continue }
    if ('+-*/^(){}|=<>|,_[]'.includes(c)) { toks.push({ k: 'ch', c }); i++; continue }
    if (c === '.') { toks.push({ k: 'ch', c }); i++; continue }
    throw new Error('unsupported character ' + c)
  }
  return toks
}

/* ------------------------------------------------------------------ */
/* Recursive-descent parser                                            */
/* ------------------------------------------------------------------ */

class Parser {
  private i = 0
  constructor(private readonly toks: Tok[]) {}

  private peek(o = 0): Tok | undefined {
    return this.toks[this.i + o]
  }
  private isCh(c: string, o = 0): boolean {
    const t = this.peek(o)
    return !!t && t.k === 'ch' && t.c === c
  }
  private eat(c: string): boolean {
    if (this.isCh(c)) { this.i++; return true }
    return false
  }
  private expect(c: string): void {
    if (!this.eat(c)) throw new Error("expected '" + c + "'")
  }
  atEnd(): boolean {
    return this.i >= this.toks.length
  }

  parseExpr(): Expr {
    let a = this.parseTerm()
    for (;;) {
      if (this.eat('+')) a = { t: 'bin', op: '+', a, b: this.parseTerm() }
      else if (this.eat('-')) a = { t: 'bin', op: '-', a, b: this.parseTerm() }
      else return a
    }
  }

  private parseTerm(): Expr {
    let a = this.parseUnary()
    for (;;) {
      if (this.eat('*')) a = { t: 'bin', op: '*', a, b: this.parseUnary() }
      else if (this.eat('/')) a = { t: 'bin', op: '/', a, b: this.parseUnary() }
      else if (this.startsAtom()) a = { t: 'bin', op: '*', a, b: this.parseUnary() }
      else return a
    }
  }

  private startsAtom(): boolean {
    const t = this.peek()
    if (!t) return false
    if (t.k === 'num' || t.k === 'letter') return true
    if (t.k === 'ch' && (t.c === '(' || t.c === '{')) return true
    if (t.k === 'cmd' && /^(frac|sqrt|fn:|greek:)/.test(t.c)) return true
    return false
  }

  private parseUnary(): Expr {
    if (this.eat('-')) return { t: 'neg', a: this.parseUnary() }
    if (this.eat('+')) return this.parseUnary()
    return this.parsePostfix()
  }

  private parsePostfix(): Expr {
    const a = this.parseAtom()
    if (this.eat('^')) return { t: 'pow', a, b: this.parseExponent() }
    return a
  }

  /** Exponent: a tight unary — no implicit multiplication bleeding in. */
  private parseExponent(): Expr {
    if (this.eat('-')) return { t: 'neg', a: this.parseExponent() }
    if (this.eat('+')) return this.parseExponent()
    return this.parseAtom()
  }

  private parseAtom(): Expr {
    const t = this.peek()
    if (!t) throw new Error('unexpected end')
    if (t.k === 'num') { this.i++; return { t: 'num', v: t.v } }
    if (t.k === 'letter') {
      this.i++
      if (t.c === 'x') return { t: 'x' }
      if (t.c === 'y') return { t: 'y' }
      if (t.c === 'e') return { t: 'num', v: Math.E }
      // P(x), Q(x), d(x), f(x)… — a letter (x excepted) directly applied to
      // a paren group is a named function we cannot evaluate → refuse,
      // while 2(x+1) and x(x−1) stay ordinary implicit multiplication
      if (this.isCh('(')) {
        throw new Error('named function ' + t.c + '(…)')
      }
      return { t: 'par', name: t.c }
    }
    if (t.k === 'ch') {
      if (t.c === '(') {
        this.i++
        const e = this.parseExpr()
        this.expect(')')
        return e
      }
      if (t.c === '{') {
        this.i++
        const e = this.parseExpr()
        this.expect('}')
        return e
      }
      if (t.c === '|') {
        this.i++
        const e = this.parseExpr()
        this.expect('|')
        return { t: 'abs', a: e }
      }
      throw new Error("unexpected '" + t.c + "'")
    }
    if (t.k === 'cmd') {
      if (t.c === 'frac') {
        this.i++
        const a = this.parseGroup()
        const b = this.parseGroup()
        return { t: 'bin', op: '/', a, b }
      }
      if (t.c === 'sqrt') {
        this.i++
        let idx: Expr | null = null
        if (this.eat('[')) {
          idx = this.parseExpr()
          this.expect(']')
        }
        const a = this.parseGroup()
        return idx ? { t: 'pow', a, b: { t: 'bin', op: '/', a: { t: 'num', v: 1 }, b: idx } } : { t: 'fn', name: 'sqrt', arg: a }
      }
      if (t.c.startsWith('greek:')) {
        this.i++
        return { t: 'par', name: t.c.slice(6) }
      }
      if (t.c.startsWith('fn:')) {
        this.i++
        return this.parseFunction(t.c.slice(3))
      }
    }
    throw new Error('unexpected token')
  }

  private parseGroup(): Expr {
    if (!this.isCh('{')) throw new Error('expected brace group')
    this.i++
    const e = this.parseExpr()
    this.expect('}')
    return e
  }

  /** `\sin`, with optional power (`\sin^2 x`, `\sin^{-1} x`) and, for log,
   *  an explicit numeric base `\log_{10}`; the argument is one tight
   *  atom-with-power, extended through implicit products only when the
   *  atom was a NUMBER (`\sin 2x` = sin(2x), but `\sin x \cos x` is a
   *  product of two functions). */
  private parseFunction(name: string): Expr {
    let power: Expr | null = null
    let powerIsMinusOne = false
    if (this.eat('^')) {
      if (this.isCh('-') && this.isCh('{', 1)) {
        // ^{-1} on a trig name is the school inverse, not a reciprocal
        this.i += 2
        if (!(this.peek()?.k === 'num' && (this.peek() as { v: number }).v === 1)) {
          // other negative powers on functions: parse honestly
          this.i -= 2
          power = this.parseExponent()
        } else {
          this.i++
          this.expect('}')
          powerIsMinusOne = true
        }
      } else {
        power = this.parseExponent()
      }
    }
    let base: number | null = null
    if (name === 'log' && this.eat('_')) {
      // \log_{10} — numeric base only
      if (!this.isCh('{')) throw new Error('log base must be numeric')
      this.i++
      const t = this.peek()
      if (!t || t.k !== 'num') throw new Error('log base must be numeric')
      base = t.v
      this.i++
      this.expect('}')
    } else if (this.eat('_')) {
      throw new Error('subscripts unsupported')
    }
    const arg = this.parseFnArg()
    const inv: Record<string, string> = { sin: 'asin', cos: 'acos', tan: 'atan' }
    let call: Expr
    if (powerIsMinusOne && inv[name]) {
      call = { t: 'fn', name: inv[name], arg }
    } else {
      call =
        name === 'log' && base !== null && base !== 10
          ? { t: 'bin', op: '/', a: { t: 'fn', name: 'log', arg }, b: { t: 'num', v: Math.log10(base) } }
          : { t: 'fn', name, arg }
    }
    return power ? { t: 'pow', a: call, b: power } : call
  }

  private parseFnArg(): Expr {
    const first = this.parsePostfix()
    const firstIsNumber = this.toks[this.i - 1]?.k === 'num'
    if (!firstIsNumber) return first
    // number atom: absorb the immediately-following implicit product
    // (2x, 2(x+1), 2\pi) into the argument.
    let a = first
    while (this.startsAtom()) a = { t: 'bin', op: '*', a, b: this.parseUnary() }
    return a
  }
}

/* ------------------------------------------------------------------ */
/* Equation-level classification                                        */
/* ------------------------------------------------------------------ */

function splitTopLevel(s: string, sep: string[]): string[] {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    // separator match first — `\qquad` itself begins with a backslash,
    // so the escape-skip below must not swallow it
    if (depth === 0) {
      let matched = false
      for (const sp of sep) {
        if (s.startsWith(sp, i)) {
          parts.push(s.slice(start, i))
          i += sp.length - 1
          start = i + 1
          matched = true
          break
        }
      }
      if (matched) continue
    }
    if (c === '\\') { i++; continue } // skip escaped char (\{ \} \, …)
    if (c === '{') depth++
    else if (c === '}') depth--
  }
  parts.push(s.slice(start))
  return parts.filter((p) => p.trim().length > 0)
}

function splitOnEquals(toks: Tok[]): Tok[][] {
  const segs: Tok[][] = []
  let depth = 0
  let cur: Tok[] = []
  for (const t of toks) {
    if (t.k === 'ch' && (t.c === '{' || t.c === '(')) depth++
    else if (t.k === 'ch' && (t.c === '}' || t.c === ')')) depth--
    if (t.k === 'ch' && t.c === '=' && depth === 0) {
      segs.push(cur)
      cur = []
      continue
    }
    cur.push(t)
  }
  segs.push(cur)
  return segs
}

/** `y`, `y(x)`, `f(x)`, `g(x)`, `h(x)` — the only heads we re-read as
 *  "the left side IS the dependent variable". */
function isHead(raw: string): boolean {
  const s = raw.replace(/\s+/g, '').replace(/\\left|\\right/g, '')
  return /^(y|y\(x\)|f\(x\)|g\(x\)|h\(x\))$/.test(s)
}

/* --- linear-in-y extraction: F ≡ A·y + B with A,B y-free ------------ */

interface LinY {
  coef: Expr
  rest: Expr
}

const ZERO: Expr = { t: 'num', v: 0 }
const ONE: Expr = { t: 'num', v: 1 }

const bin = (op: '+' | '-' | '*' | '/', a: Expr, b: Expr): Expr => ({ t: 'bin', op, a, b })
const mul = (a: Expr, b: Expr): Expr => bin('*', a, b)

function linearInY(e: Expr): LinY | null {
  switch (e.t) {
    case 'y':
      return { coef: ONE, rest: ZERO }
    case 'num':
    case 'x':
    case 'par':
    case 'fn':
    case 'abs':
      return { coef: ZERO, rest: e }
    case 'neg': {
      const a = linearInY(e.a)
      return a ? { coef: { t: 'neg', a: a.coef }, rest: { t: 'neg', a: a.rest } } : null
    }
    case 'bin': {
      const a = linearInY(e.a)
      const b = linearInY(e.b)
      if (!a || !b) return null
      switch (e.op) {
        case '+':
          return { coef: bin('+', a.coef, b.coef), rest: bin('+', a.rest, b.rest) }
        case '-':
          return { coef: bin('-', a.coef, b.coef), rest: bin('-', a.rest, b.rest) }
        case '*': {
          // one factor must be y-free
          if (!containsY(e.a)) return { coef: mul(e.a, b.coef), rest: mul(e.a, b.rest) }
          if (!containsY(e.b)) return { coef: mul(a.coef, e.b), rest: mul(a.rest, e.b) }
          return null
        }
        case '/': {
          if (containsY(e.b)) return null
          return { coef: bin('/', a.coef, e.b), rest: bin('/', a.rest, e.b) }
        }
      }
      return null
    }
    case 'pow':
      return containsY(e) ? null : { coef: ZERO, rest: e }
  }
}

function containsY(e: Expr): boolean {
  switch (e.t) {
    case 'y':
      return true
    case 'num':
    case 'x':
    case 'par':
      return false
    case 'neg':
    case 'abs':
      return containsY(e.a)
    case 'fn':
      return containsY(e.arg)
    case 'pow':
      return containsY(e.a) || containsY(e.b)
    case 'bin':
      return containsY(e.a) || containsY(e.b)
  }
}

function containsX(e: Expr): boolean {
  switch (e.t) {
    case 'x':
      return true
    case 'num':
    case 'y':
    case 'par':
      return false
    case 'neg':
    case 'abs':
      return containsX(e.a)
    case 'fn':
      return containsX(e.arg)
    case 'pow':
      return containsX(e.a) || containsX(e.b)
    case 'bin':
      return containsX(e.a) || containsX(e.b)
  }
}

function collectParams(e: Expr, out: string[]): void {
  switch (e.t) {
    case 'par':
      if (!out.includes(e.name)) out.push(e.name)
      break
    case 'num':
    case 'x':
    case 'y':
      break
    case 'neg':
    case 'abs':
      collectParams(e.a, out)
      break
    case 'fn':
      collectParams(e.arg, out)
      break
    case 'pow':
      collectParams(e.a, out)
      collectParams(e.b, out)
      break
    case 'bin':
      collectParams(e.a, out)
      collectParams(e.b, out)
      break
  }
}

/** A·y + B with A probing to ~0 at default constants means y cancelled —
 *  the relation is an identity in y, not a function (e.g. the grouping
 *  identity ax+ay+bx+by = (x+y)(a+b)). Refuse instead of drawing blank. */
function coefLooksZero(coef: Expr): boolean {
  for (const x of [-1, 0, 1, 0.5]) {
    const v = evalExpr(coef, x, {})
    if (Math.abs(v) > 1e-9) return false
  }
  return true
}

/* ------------------------------------------------------------------ */
/* The entry point                                                      */
/* ------------------------------------------------------------------ */

export function parseEquation(texRaw: string): PlotSpec | null {
  try {
    let tex = texRaw.trim()
    // 1. side remarks live after \qquad / \quad — keep the first part only
    const parts = splitTopLevel(tex, ['\\qquad', '\\quad'])
    tex = parts[0].trim()
    // 2. drop ONE trailing parenthesised side condition like `(x \neq 0)`
    tex = tex.replace(/\(\s*[^()]*?(?:\\neq|\\geq|\\leq|\\not=|[<>])[^()]*?\)\s*$/, '').trim()
    // 3. trailing punctuation dust
    tex = tex.replace(/[,\s]+$/, '').trim()
    if (!tex) return null

    // 3b. differentials refuse outright: \frac{dy}{dx} would otherwise
    // tokenize as d·y over d·x and plot a confident, wrong line
    if (/\\[dtt]?frac\s*\{\s*d[a-zA-Z]/.test(tex) || /\\partial/.test(tex)) return null

    // 4. tokenize (normalize first)
    const toks = tokenize(normalize(tex))
    if (toks.length === 0) return null

    // 5. split on top-level '='
    const segs = splitOnEquals(toks)
    if (segs.length < 2) return null // lone expression, no relation

    // 6. heads: y / f(x) / g(x) / h(x) re-read as the dependent variable
    const rawSegs = splitOnEqualsRaw(tex)
    let lhs: Expr
    let rhs: Expr
    let mode: PlotMode
    if (isHead(rawSegs[0] ?? '')) {
      const p = new Parser(segs[1])
      rhs = p.parseExpr()
      if (!p.atEnd()) return null
      lhs = { t: 'y' }
      mode = 'function'
    } else {
      const pl = new Parser(segs[0])
      lhs = pl.parseExpr()
      if (!pl.atEnd()) return null
      const pr = new Parser(segs[1])
      rhs = pr.parseExpr()
      if (!pr.atEnd()) return null
      mode = 'identity'
    }
    const F = bin('-', lhs, rhs)

    // 6b. bare `x = <x-free expr>` heads (the shelf's solved forms,
    //     `x = \frac{c-b}{a}`) are vertical lines, not identities
    if (lhs.t === 'x' && !containsX(rhs)) {
      const params: string[] = []
      collectParams(rhs, params)
      if (params.length > 8) return null
      return { mode: 'vertical', curves: [{ label: 'x', expr: rhs }], params }
    }

    // 7. classify on y
    if (containsY(F)) {
      const lin = linearInY(F)
      if (!lin) return null
      if (coefLooksZero(lin.coef)) return null
      // y = −B/A — a constant result (y = c) is a honest horizontal line;
      // there is no "no x" rejection here for exactly that reason.
      const yExpr: Expr = { t: 'neg', a: bin('/', lin.rest, lin.coef) }
      const params: string[] = []
      collectParams(yExpr, params)
      if (params.length > 8) return null
      return { mode: mode === 'identity' ? 'line' : mode, curves: [{ label: 'y', expr: yExpr }], params }
    }

    // 8. no y at all — identity between two x-expressions
    if (!containsX(lhs) && !containsX(rhs)) return null
    const params: string[] = []
    collectParams(lhs, params)
    collectParams(rhs, params)
    if (params.length > 8) return null
    return {
      mode,
      curves: [
        { label: 'LHS', expr: lhs },
        { label: 'RHS', expr: rhs },
      ],
      params,
    }
  } catch {
    return null
  }
}

/** Raw string segments on '=', mirroring the token split (used for the
 *  head test, which must see `f(x)` before tokenizing turns it into f·x). */
function splitOnEqualsRaw(tex: string): string[] {
  let s = normalize(tex)
  const segs: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === '\\') { i++; continue }
    if (c === '{') depth++
    else if (c === '}') depth--
    else if (c === '=' && depth === 0) {
      segs.push(s.slice(start, i))
      start = i + 1
    }
  }
  segs.push(s.slice(start))
  return segs
}

/* ------------------------------------------------------------------ */
/* Evaluation                                                           */
/* ------------------------------------------------------------------ */

export function evalExpr(e: Expr, x: number, params: Record<string, number>): number {
  switch (e.t) {
    case 'num':
      return e.v
    case 'x':
      return x
    case 'y':
      return NaN // the dependent variable never appears in plotted curves
    case 'par':
      return params[e.name] ?? 1
    case 'neg':
      return -evalExpr(e.a, x, params)
    case 'abs':
      return Math.abs(evalExpr(e.a, x, params))
    case 'pow': {
      const b = evalExpr(e.b, x, params)
      // x^{m} with a slider m must stay real where school maths allows it
      const a = evalExpr(e.a, x, params)
      return Math.pow(a, b)
    }
    case 'fn':
      return applyFn(e.name, evalExpr(e.arg, x, params))
    case 'bin': {
      const a = evalExpr(e.a, x, params)
      const b = evalExpr(e.b, x, params)
      switch (e.op) {
        case '+':
          return a + b
        case '-':
          return a - b
        case '*':
          return a * b
        case '/':
          return a / b
      }
    }
  }
}

function applyFn(name: string, v: number): number {
  switch (name) {
    case 'sin':
      return Math.sin(v)
    case 'cos':
      return Math.cos(v)
    case 'tan':
      return Math.tan(v)
    case 'sec':
      return 1 / Math.cos(v)
    case 'csc':
      return 1 / Math.sin(v)
    case 'cot':
      return Math.cos(v) / Math.sin(v)
    case 'asin':
      return Math.asin(v)
    case 'acos':
      return Math.acos(v)
    case 'atan':
      return Math.atan(v)
    case 'sinh':
      return Math.sinh(v)
    case 'cosh':
      return Math.cosh(v)
    case 'tanh':
      return Math.tanh(v)
    case 'coth':
      return 1 / Math.tanh(v)
    case 'ln':
      return Math.log(v)
    case 'log':
      return Math.log10(v)
    case 'exp':
      return Math.exp(v)
    case 'sqrt':
      return Math.sqrt(v)
    default:
      return NaN
  }
}
