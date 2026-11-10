#!/usr/bin/env python3
"""fix_plan_counts.py — rewrite each planned book.ts header's
'N chapters / M planned lessons' to the TRUE computed counts (the
verify-math-shelf-planning census is authoritative; headers written
by hand drifted on 19 books). Also fixes the same counts in
SUBJECT_BACKLOG.md's planning-pass list.
"""
import re

TRUE = {
    'geometry': (11, 38),
    'coordinate-geometry': (13, 44),
    'trigonometry': (8, 30),
    'differential-calculus': (9, 36),
    'integral-calculus': (6, 20),
    'multivariable-calculus': (6, 19),
    'differential-equations': (6, 22),
    'linear-algebra': (8, 28),
    'discrete-mathematics': (9, 29),
    'number-theory': (10, 31),
    'set-theory': (8, 27),
    'mathematical-logic': (7, 23),
    'combinatorics': (6, 20),
    'probability-theory': (7, 22),
    'statistics': (8, 30),
    'real-analysis': (9, 34),
    'complex-analysis': (7, 23),
    'abstract-algebra': (8, 26),
    'topology': (8, 26),
    'numerical-analysis': (7, 24),
    'mathematical-methods-for-engineering': (8, 28),
    'optimization-and-operations-research': (8, 27),
    'advanced-mathematical-foundations': (7, 23),
}

BASE = '/home/z/my-project/src/data/library/books/mathematics'
changed = []
for slug, (nch, nles) in TRUE.items():
    path = f'{BASE}/{slug}/book.ts'
    src = open(path).read()
    # TRUE comes from the module-import census (verify-math-shelf-planning)
    new = re.sub(
        r"[—\-] (\d+) chapters \/\n \* (\d+) planned lessons",
        lambda m: f"{m.group(0)[0]} {nch} chapters /\n * {nles} planned lessons",
        src,
        count=1,
    )
    if new != src:
        open(path, 'w').write(new)
        changed.append(f'{slug}: -> {nch} ch / {nles} lessons')

# SUBJECT_BACKLOG list numbers
sb_path = '/home/z/my-project/docs/project/SUBJECT_BACKLOG.md'
sb = open(sb_path).read()
num_map = {
    'Geometry': (11, 38), 'Coordinate Geometry': (13, 44), 'Trigonometry': (8, 30),
    'Differential Calculus': (9, 36), 'Integral Calculus': (6, 20),
    'Multivariable Calculus': (6, 19), 'Differential Equations': (6, 22),
    'Linear Algebra': (8, 28), 'Discrete Mathematics': (9, 29),
    'Number Theory': (10, 31), 'Set Theory': (8, 27),
    'Mathematical Logic': (7, 23), 'Combinatorics': (6, 20),
    'Probability Theory': (7, 22), 'Statistics': (8, 30),
    'Real Analysis': (9, 34), 'Complex Analysis': (7, 23),
    'Abstract Algebra': (8, 26), 'Topology': (8, 26),
    'Numerical Analysis': (7, 24), 'Mathematical Methods for Engineering': (8, 28),
    'Optimization and Operations Research': (8, 27),
    'Advanced Mathematical Foundations': (7, 23),
}
for title, (nch, nles) in num_map.items():
    sb = re.sub(
        rf"(\d+\.) {re.escape(title)} \(\d+ ch \/ \d+ lessons",
        rf"\1 {title} ({nch} ch / {nles} lessons",
        sb,
    )
open(sb_path, 'w').write(sb)
print('book.ts headers fixed:', len(changed))
for c in changed:
    print(' ', c)
print('SUBJECT_BACKLOG counts synced')
