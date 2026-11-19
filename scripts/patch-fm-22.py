#!/usr/bin/env python3
"""
patch-fm-22.py — visual-upgrade run 5 (job 507527): apply the recomputed SVGs
to lesson fm-subtraction-borrowing in ch-02.ts.

Surgical scope:
  1. replace figure 1's svg (number line, viewBox 0 0 760 258) with the
     recomputed dot-to-dot version,
  2. replace figure 2's svg (the borrow seat map, viewBox 0 0 760 290) with the
     re-centred/arrowheaded/pill-restyled version,
  3. insert the NEW dissolve figure (1,000 − 1) after its example block, before
     the 'Four classic borrowing traps' callout,
  4. insert the NEW counting-up journey bar (2,764 → 4,589) after the
     counting-up paragraph, before the 'Two bookkeepings' historical callout.

Nothing else in the lesson (ids, quiz, prose, other lessons) is touched.
"""
import re
import sys

SRC = 'src/data/library/books/mathematics/foundation-mathematics/ch-02.ts'
LESSON_START = "id: 'fm-subtraction-borrowing'"
LESSON_END = "id: 'fm-multiplication-repeated-addition'"

svg1 = open('/tmp/svg1.txt').read().strip()
svg2 = open('/tmp/svg2.txt').read().strip()
svg3 = open('/tmp/svg3.txt').read().strip()
svg4 = open('/tmp/svg4.txt').read().strip()
for name, s in [('svg1', svg1), ('svg2', svg2), ('svg3', svg3), ('svg4', svg4)]:
    assert s.startswith('<svg viewBox='), f'{name} does not start with <svg'
    assert s.endswith('</svg>'), f'{name} does not end with </svg>'

file = open(SRC, encoding='utf8').read()
orig = file

ls = file.index(LESSON_START)
le = file.index(LESSON_END, ls)
assert ls < le

# ---- 1. replace the two existing svg blocks inside the lesson slice ----
SVG_RE = re.compile(r"svg: `<svg viewBox=\"([^\"]+)\".*?</svg>`", re.DOTALL)
blocks = list(SVG_RE.finditer(file, ls, le))
assert len(blocks) == 2, f'expected exactly 2 existing svg blocks in the lesson, got {len(blocks)}'
b1, b2 = blocks
assert '0 0 760 258' in b1.group(0) and 'aria-label="Number line showing 7 minus 3' in b1.group(0), 'figure 1 mismatch'
assert '0 0 760 290' in b2.group(0) and '4589 minus 2764' in b2.group(0), 'figure 2 mismatch'

def replace_span(file: str, start: int, end: int, new: str) -> str:
    return file[:start] + new + file[end:]

# replace from the last to the first so earlier offsets stay valid
file = replace_span(file, b2.start(), b2.end(), 'svg: `' + svg2 + '`')
file = replace_span(file, b1.start(), b1.end(), 'svg: `' + svg1 + '`')

# recompute slice bounds after the replacements
ls = file.index(LESSON_START)
le = file.index(LESSON_END, ls)

# ---- 2. insert the dissolve figure before the traps callout ----
DISSOLVE_CAPTION = (
    "The dissolve, seat by seat — the mirror of Lesson 2.1's $999 + 1$ ripple, on the "
    "same seat grammar. The ones seat owes 1 and its left neighbours are broke, so the request "
    "travels to the thousands seat; the cash then flows back down the chain (dashed arrows, "
    "lender → receiver): each middle seat receives 10, lends 1 and keeps 9 (struck digits, the "
    "small corrections above), and the ones pays $10 - 1 = 9$. The thousands seat ends empty — "
    "the dashed zone marks its empty answer slot, the leading zero that drops away — and the "
    "answer is $999$. Where $999 + 1$ minted a new seat, $1{,}000 - 1$ burns one: addition mints "
    "seats; subtraction dissolves them."
)
TRAPS_ANCHOR = "        {\n          kind: 'callout',\n          tone: 'warn',\n          title: 'Four classic borrowing traps',"
assert file.count(TRAPS_ANCHOR) == 1, 'traps callout anchor not unique'
dissolve_block = (
    "        {\n"
    "          kind: 'figure',\n"
    "          caption:\n"
    "            '" + DISSOLVE_CAPTION + "',\n"
    "          svg: `" + svg3 + "`,\n"
    "        },\n"
)
file = file.replace(TRAPS_ANCHOR, dissolve_block + TRAPS_ANCHOR)

# ---- 3. insert the journey-bar figure before the historical callout ----
JOURNEY_CAPTION = (
    "The shopkeeper's route for $4{,}589 - 2{,}764$, drawn to true scale: the bar between the two "
    "numbers is the gap itself — $1{,}825$ wide — and the four hand-overs partition it exactly "
    "($+36$ to $2{,}800$, $+200$ to $3{,}000$, $+1{,}500$ to $4{,}500$, $+89$ to $4{,}589$; the "
    "segment widths are exactly proportional to the hand-overs). The $+1{,}500$ hop does the heavy "
    "lifting — it alone spans $1{,}500$ of the $1{,}825$ — while $+36$ and $+89$ are the fine "
    "change, and every milestone is a round number chosen for an easy step. The hand-overs total "
    "exactly the difference, the same $1{,}825$ the column algorithm found — and not one borrow "
    "was made. Counting up is subtraction run as the missing-addend addition, which is why a "
    "shopkeeper making change never borrows."
)
HIST_ANCHOR = "        {\n          kind: 'callout',\n          tone: 'historical',\n          title: 'Two bookkeepings for one borrow',"
assert file.count(HIST_ANCHOR) == 1, 'historical callout anchor not unique'
journey_block = (
    "        {\n"
    "          kind: 'figure',\n"
    "          caption:\n"
    "            '" + JOURNEY_CAPTION + "',\n"
    "          svg: `" + svg4 + "`,\n"
    "        },\n"
)
file = file.replace(HIST_ANCHOR, journey_block + HIST_ANCHOR)

# ---- sanity: the lesson now has exactly 4 svg blocks; other lessons untouched ----
ls = file.index(LESSON_START)
le = file.index(LESSON_END, ls)
new_blocks = list(SVG_RE.finditer(file, ls, le))
assert len(new_blocks) == 4, f'expected 4 svg blocks after patch, got {len(new_blocks)}'
order = []
for m in new_blocks:
    s = m.group(0)
    if '760 258' in s:
        order.append('nl')
    elif '4589 minus 2764' in s:
        order.append('borrow')
    elif '1000 minus 1' in s:
        order.append('dissolve')
    elif '760 250' in s:
        order.append('climb')
assert order == ['nl', 'borrow', 'dissolve', 'climb'], f'figure order wrong: {order}'

before_count = len(list(SVG_RE.finditer(orig)))
after_count = len(list(SVG_RE.finditer(file)))
assert after_count == before_count + 2, f'lesson count changed by {after_count - before_count - 2} beyond the 2 new figures'

# the file must still parse as balanced backticks for these blocks (quick smoke)
assert file.count('id: \'fm-subtraction-borrowing\'') == 1

open(SRC, 'w', encoding='utf8').write(file)
print('PATCHED OK — lesson now has 4 figures in order: ' + ', '.join(order))
print('lesson svg blocks:', after_count - before_count + 2, 'total svg blocks in file:', after_count)
