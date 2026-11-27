#!/usr/bin/env python3
"""fix_geo131b.py — apply the 5 ch.4 defects from FIX_QUEUE_131B.md at part
level AND mirror them into the generated twin ch-04.ts (no ch.4 assembler
exists on disk; the strings are identical in both). Visual-only label moves.
"""
import sys

ROOT = "/home/z/my-project"
P402 = f"{ROOT}/docs/research/geo-ch04-wip/part-geo402.ts"
P403 = f"{ROOT}/docs/research/geo-ch04-wip/part-geo403.ts"
P404 = f"{ROOT}/docs/research/geo-ch04-wip/part-geo404.ts"
CH04 = f"{ROOT}/src/data/library/books/mathematics/geometry/ch-04.ts"

# (file, old, new, label)
FIXES = [
    (P402,
     "geo42Txt(112, 342, 'AB = 14', 12.5, c42.tealInk, 'end')",
     "geo42Txt(92, 366, 'AB = 14', 12.5, c42.tealInk, 'end')",
     "131B-1a AB=14 off B"),
    (P402,
     "geo42Txt(534, 342, 'AC = 21', 12.5, c42.tealInk, 'start')",
     "geo42Txt(556, 366, 'AC = 21', 12.5, c42.tealInk, 'start')",
     "131B-1b AC=21 off C"),
    (P403,
     "parts.push(geo43Txt(320, 130, 'AA: right angle at the ground + the shared sun angle', 12, c43.tealInk))",
     "parts.push(geo43Txt(40, 44, 'AA: right angle at the ground', 12, c43.tealInk, 'start'))\n  parts.push(geo43Txt(40, 58, '+ the shared sun angle', 12, c43.tealInk, 'start'))",
     "131B-2 AA caption off tree+ray (two-line split, top-left)"),
    (P403,
     "geo43Txt(322, 352, 'c \\u2248 9.6328920', 11.5, c43.orange)",
     "geo43Txt(300, 368, 'c \\u2248 9.6328920', 11.5, c43.orange)",
     "131B-3 c~9.63 label off B2"),
    (P404,
     "geo44Txt(172, 254, '2 m', 11.5, c44.amber)",
     "geo44Txt(140, 268, '2 m', 11.5, c44.amber, 'end')",
     "131B-4 '2 m' off the sun ray"),
    (P404,
     "geo44Txt(470, 464, 'a (shorter leg)', 11.5, c44.ink, 'middle')",
     "geo44Txt(470, 486, 'a (shorter leg)', 11.5, c44.ink, 'middle')",
     "131B-5a axis title off the 80 tick"),
    (P404,
     "return geo44Svg(640, 470, aria, parts)",
     "return geo44Svg(640, 492, aria, parts)",
     "131B-5b census viewBox 470 -> 492"),
]

TWIN = {P402: CH04, P403: CH04, P404: CH04}

applied = 0
for path, old, new, label in FIXES:
    for f in (path, TWIN[path]):
        s = open(f, encoding="utf-8").read()
        n = s.count(old)
        if n == 0:
            print(f"SKIP (not found, maybe applied): {label} in {f.split('/')[-1]}")
            continue
        if n > 1:
            print(f"ABORT: {label} matched {n} times in {f}")
            sys.exit(1)
        open(f, "w", encoding="utf-8").write(s.replace(old, new))
        applied += 1
        print(f"ok  {label}  ->  {f.split('/')[-1]}")
print(f"applied {applied} edits")
