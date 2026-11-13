#!/usr/bin/env python3
"""fix-escape-eaten-latex.py — mechanical repair of the escape-eaten LaTeX
class found by audit-escape-eaten-latex.py: single-backslash LaTeX commands
inside JS string literals render corrupted math (\\times -> TAB+'imes',
\\sqrt -> 'sqrt', \\ge -> 'ge', ...). Fix: double the backslash ONLY where
single (never touch healthy \\\\times or intentional \\uXXXX escapes).
Run audit-escape-eaten-latex.py afterwards — it must report 0 hits."""
import glob, re

CMD = (
    'times|cdot|div|pm|mp|circ|bullet|star|wedge|vee|neg|land|lor|forall|exists|infty|partial|nabla|'
    'angle|triangle|perp|parallel|mid|ni|gets|to|mapsto|iff|implies|equiv|approx|neq|ne|leq|le|geq|ge|ll|gg|sim|simeq|cong|propto|'
    'odot|otimes|oplus|ominus|sqrt|frac|dfrac|tfrac|cfrac|binom|text|mathrm|mathit|mathbb|mathcal|mathbf|boldsymbol|operatorname|'
    'left|right|langle|rangle|lceil|rceil|lfloor|rfloor|begin|end|hline|quad|qquad|hspace|displaystyle|limits|over|under|'
    'overline|underline|widehat|widetilde|vec|hat|bar|dot|ddot|tilde|sum|prod|int|iint|oint|lim|sup|inf|max|min|log|ln|exp|'
    'sin|cos|tan|cot|sec|csc|arcsin|arccos|arctan|sinh|cosh|tanh|alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|iota|kappa|'
    'lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|varphi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Phi|Psi|Omega|'
    'ell|Re|Im|aleph|hbar|varnothing|emptyset|vdots|iddots|ddots|cdots|ldots|dots|doteq|prec|succ|preceq|succeq|nmid|nparallel|'
    'notin|notni|subset|supset|subseteq|supseteq|subsetneq|supsetneq|in|cap|cup|setminus'
)
PAT = re.compile(r'(?<!\\)\\(' + CMD + r')(?![a-zA-Z])')

files = sorted(glob.glob('src/data/library/books/**/*.ts', recursive=True))
total = 0
for f in files:
    src = open(f, encoding='utf-8').read()
    new, n = PAT.subn(lambda m: '\\\\' + m.group(1), src)
    if n:
        open(f, 'w', encoding='utf-8').write(new)
        lines = [i + 1 for i, ln in enumerate(new.split('\n')) if PAT.search(ln)]
        print(f'{f}: {n} replacements')
        total += n
print(f'--- total {total} backslashes doubled ---')
