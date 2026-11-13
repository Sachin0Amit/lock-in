#!/usr/bin/env python3
"""audit-escape-eaten-latex.py — find LaTeX commands written with a single
backslash inside JS/TS string literals of the book data files. In JS string
context a single \\t becomes a TAB (\\times -> 'imes'), and unrecognized
escapes (\\s, \\p, \\c, \\m, \\d, \\l, \\o, \\b as \\binom...) drop the
backslash entirely -> KaTeX silently renders the letters, no error.
Healthy convention in this repo: double backslash (\\\\times).
"""
import glob, re, sys

LATEX = re.compile(r'^\\[a-zA-Z]+$')
# commands we treat as LaTeX-intent (lower/upper word-ish)
CMD = re.compile(r'^\\(times|cdot|div|pm|mp|circ|bullet|star|wedge|vee|neg|land|lor|forall|exists|infty|partial|nabla|angle|triangle|perp|parallel|mid|ni|gets|to|mapsto|iff|implies|equiv|approx|neq|ne|leq|le|geq|ge|ll|gg|sim|simeq|cong|propto|pm|odot|otimes|oplus|ominus|sqrt|frac|dfrac|tfrac|cfrac|binom|text|mathrm|mathit|mathbb|mathcal|mathbf|boldsymbol|operatorname|left|right|langle|rangle|lceil|rceil|lfloor|rfloor|begin|end|hline|quad|qquad|hspace|displaystyle|limits|over|under|overline|underline|widehat|widetilde|vec|hat|bar|dot|ddot|tilde|sum|prod|int|iint|oint|lim|sup|inf|max|min|log|ln|exp|sin|cos|tan|cot|sec|csc|arcsin|arccos|arctan|sinh|cosh|tanh|alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|varphi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Phi|Psi|Omega|ell|Re|Im|aleph|hbar|ell|varnothing|emptyset|forall|vdots|iddots|ddots|cdots|ldots|dots|semicolon|colon|doteq|lessapprox|prec|succ|preceq|succeq|nmid|nparallel|notin|notni|subset|supset|subseteq|supseteq|subsetneq|supsetneq|in|cap|cup|setminus|times)$')

hits = []
for f in sorted(glob.glob('src/data/library/books/**/*.ts', recursive=True)):
    src = open(f, encoding='utf-8').read()
    lines = src.split('\n')
    # find single-backslash command tokens not preceded by another backslash
    for m in re.finditer(r'(?<!\\)\\([a-zA-Z]{2,})', src):
        cmd = m.group(1)
        if cmd == 'u' or cmd == 'x':
            continue
        # unicode escapes: \uXXXX — skip (4 hex follow)
        if cmd == 'u':
            continue
        if cmd[0] == 'u' and False:
            pass
        if CMD.match('\\' + cmd):
            # line number
            ln = src.count('\n', 0, m.start()) + 1
            line = lines[ln - 1]
            # skip if this is actually a double-backslash we misread? impossible given lookbehind
            hits.append((f, ln, cmd, line.strip()[:110]))

# de-dup per (file,line,cmd)
seen = set()
for f, ln, cmd, line in hits:
    k = (f, ln, cmd)
    if k in seen:
        continue
    seen.add(k)
    print(f'{f}:{ln}: \\{cmd}  | {line}')
print(f'--- {len(seen)} unique single-backslash LaTeX hits ---')
