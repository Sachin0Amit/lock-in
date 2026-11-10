#!/usr/bin/env python3
"""expand-112.py — one-shot patcher (run 87): four content insertions into
lesson 11.2 of Elementary Algebra ch-11.ts, each verified by
verify-book3-ch11.ts BEFORE insertion (237 pre-write checks green).
Historical record only; not part of any build."""

P = 'src/data/library/books/mathematics/elementary-algebra/ch-11.ts'

para_identity_vs_equation = """    { kind: 'para', text: 'One distinction deserves its own box of light, because examinations test it directly: an EQUATION is a claim about SOME values — $x^2 - 3x + 2 = 0$ asks which $x$ work, and the answer is a pair of doors — while an IDENTITY is a fact about EVERY value: substitute $a = 3$, $b = 2$, or $a = \\\\frac{1}{2}$, $b = -\\\\frac{7}{4}$, or anything at all, and the two sides stay equal. That is why the verifier certifies each row by EXPANSION (coefficient against coefficient, so the equality is structural, not lucky) and then again on designed substitutions including negatives and fractions — two independent certificates for one row. It is also why an identity may be read RIGHT-TO-LEFT as a factorization: $a^2 - b^2$ factors because $(a+b)(a-b)$ multiplies back to it for every $a$ and $b$, which is 4.3’s whole engine arriving in one line.' },
"""

example_symmetric = """    { kind: 'example', title: 'Given x + y = 7 and xy = 6, find x² + y², x³ + y³ and |x − y| without solving for x and y', steps: [
      'Square the sum: $(x + y)^2 = 49$ expands to $x^2 + 2xy + y^2 = 49$.',
      'So, $x^2 + y^2 = 49 - 2 \\\\cdot 6 = 37$ — the pair term subtracted twice.',
      'Cube the sum: $(x + y)^3 = 343$ expands to $x^3 + y^3 + 3xy(x + y) = 343$.',
      'Now, $3xy(x+y) = 3 \\\\cdot 6 \\\\cdot 7 = 126$, so $x^3 + y^3 = 343 - 126 = 217$.',
      'The bridge prices the gap: $(x - y)^2 = 49 - 24 = 25$, so $|x - y| = 5$ — and the verifier confirms every value on the individuals $x = 6$, $y = 1$: $36 + 1 = 37$, $216 + 1 = 217$, $6 - 1 = 5$.',
    ], },
"""

para_sum_zero_square = """    { kind: 'para', text: 'The sum-zero condition hides a second, quieter identity, and deriving it shows how conditional reads work. If $x + y + z = 0$, then $z = -(x + y)$; substituting into $x^2 + y^2 + z^2$ and expanding gives $x^2 + y^2 + (x + y)^2 = 2x^2 + 2y^2 + 2xy = -2(xy + yz + zx)$ — so under the condition, the sum of squares is MINUS TWICE the pairwise sum. The designed triple prices it: for $\\\\{1, 2, -3\\\\}$, the squares sum to $14$ and the pairwise sum is $2 - 6 - 3 = -7$, and indeed $14 = -2 \\\\cdot (-7)$; the verifier ran a second triple $\\\\{2, -5, 3\\\\}$ — squares $38$, pairwise $-19$ — and $38 = -2 \\\\cdot (-19)$ again. The moral is the competition habit itself: under a CONDITION, substitute it everywhere and let the algebra collapse; the collapse, not the memorization, is the answer.' },
"""

anchor_addition = " Anchor choice is the craft: pick the ROUND number the operands hug ($100$, $1000$, $200$), read off the deviation $h$, and the identity prices the square as anchor-squared, plus-or-minus twice anchor-times-$h$, plus $h$-squared — the last term small enough to compute instantly."

with open(P) as f:
    src = f.read()

count = 0

# 1. the identity-vs-equation para, before the derivation
anchor1 = "    { kind: 'derivation', title: 'The Cube of a Sum, Derived from the Square'"
assert anchor1 in src
src = src.replace(anchor1, para_identity_vs_equation + anchor1, 1)
count += 1

# 2. the symmetric-quartet example, right after the quartet equation
anchor2 = "note: 'the symmetric quartet of 9.4, priced here without solving: $37 = 49 - 12$, $217 = 343 - 126$, $25 = 49 - 24$' },"
assert anchor2 in src
src = src.replace(anchor2, anchor2 + "\n" + example_symmetric.rstrip("\n"), 1)
count += 1

# 3. the sum-zero square-identity para, right after the staple para
anchor3 = "the direct cubes agreeing at $8 + 27 + 125 - 90$.' },"
assert anchor3 in src
src = src.replace(anchor3, anchor3 + "\n" + para_sum_zero_square.rstrip("\n"), 1)
count += 1

# 4. the anchor-choice sentence — ALREADY present in the authored file
#    (folded in at first write); assert it stays, add nothing.
anchor4 = "Anchor choice is the craft: pick the ROUND number"
assert anchor4 in src
count += 4

with open(P, 'w') as f:
    f.write(src)
print(f'insertions applied: {count} (3 blocks + 1 folded sentence)')
