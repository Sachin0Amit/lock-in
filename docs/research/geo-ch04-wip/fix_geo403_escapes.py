#!/usr/bin/env python3
r"""fix_geo403_escapes.py — RUN 130 in-run fix (the E2E gate's real catch).

part-geo403.ts was written with SINGLE-backslash TeX commands inside its JS
string literals ('\frac{..}', '\sqrt{..}', '\circ' ...). In JS, '\f' is the
FORM-FEED escape and '\s'/'\c'/'\t' etc. silently drop the backslash, so
KaTeX received 'rac{..}' / 'sqrt{..}' / 'circ' — 70 render errors on the
live lesson (the E2E probe caught it; the seat harness does not render).
The fix doubles every single backslash that precedes a TeX command token,
EXCEPT \uXXXX (legitimate JS unicode escapes for −, ′, °, etc.).

Run:  python3 docs/research/geo-ch04-wip/fix_geo403_escapes.py
"""
import re
import collections

PATH = "/home/z/my-project/docs/research/geo-ch04-wip/part-geo403.ts"
t = open(PATH, encoding="utf-8").read()

bad = collections.Counter(re.findall(r"(?<!\\)\\([a-zA-Z]+)", t))
bad.pop("u", None)  # \uXXXX stays
tokens = sorted(bad)
print("fixing tokens:", dict(bad))

for tok in tokens:
    # (?<!\\) the backslash is not itself escaped; (?![a-zA-Z]) the token is
    # not a prefix of a longer word; the LAMBDA replacement is immune to
    # re.sub's template escape-processing (a plain '\\\\' template would
    # emit ONE backslash and undo itself)
    t = re.sub(r"(?<!\\)\\" + tok + r"(?![a-zA-Z])", lambda m, tok=tok: "\\\\" + tok, t)

open(PATH, "w", encoding="utf-8").write(t)

left = collections.Counter(re.findall(r"(?<!\\)\\([a-zA-Z]+)", t))
left.pop("u", None)
print("remaining single-backslash tokens:", dict(left))
assert not left, "unfixed tokens remain"
print("fix_geo403_escapes: done")
