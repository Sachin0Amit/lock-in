#!/usr/bin/env python3
"""fix-ch06-example-answers.py — run-96 one-off: the Example block type takes
no `answer` field (the final Hence-line carries it — the run-87 authoring
catch) and Formula cards use `latex:` not `math:`. Strips the 8-space-indent
example-level `], answer: '...' },` lines of the 6.4 lesson only (exercise
questions keep theirs at 12-space indent) and renames the formula math
fields. Then the Hence folds are done by hand-edits."""
import re

PATH = 'src/data/library/books/mathematics/elementary-algebra/ch-06.ts'
src = open(PATH, encoding='utf-8').read()

# 1) strip example-level answer fields (8-space indent, inside the 6.4 lesson)
pat_ans = re.compile(r"^        \], answer: '[^']*' \},$", re.M)
src, n1 = pat_ans.subn("        ], },", src)

# 2) formula cards: math: -> latex:
src, n2 = re.subn(r"(\{ kind: 'formula', name: '[^']*', )math: ", r"\1latex: ", src)

open(PATH, 'w', encoding='utf-8').write(src)
print(f'stripped {n1} example answer fields; renamed {n2} formula math->latex')
