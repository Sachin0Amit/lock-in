#!/usr/bin/env python3
"""fix-ch06-escapes.py — run-96 one-off: mechanically double single-backslash
LaTeX commands inside ch-06.ts string literals (the escape-eaten class: a
single \\t becomes TAB, single \\s drops the backslash). Doubles already
healthy (\\tfrac) are protected by the (?<!\\\\) lookbehind; escaped
apostrophes (\\') are untouched — the command alternation never matches a
quote. Re-verify with scripts/audit-escape-eaten-latex.py (0 hits)."""
import re

PATH = 'src/data/library/books/mathematics/elementary-algebra/ch-06.ts'
src = open(PATH, encoding='utf-8').read()

# single-backslash LaTeX command tokens to double (letters >=2 or punctuation escapes)
pat = re.compile(r'(?<!\\)\\([a-zA-Z]{2,}|[,;!])')
def repl(m):
    return '\\\\' + m.group(1)

fixed, n = pat.subn(repl, src)
open(PATH, 'w', encoding='utf-8').write(fixed)
print(f'doubled {n} single-backslash LaTeX tokens in {PATH}')
