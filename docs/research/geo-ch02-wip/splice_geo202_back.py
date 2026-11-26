#!/usr/bin/env python3
"""splice_geo202_back.py — RUN 127 orchestrator splice.

Merges the back half (part-geo202-back.ts: quiz + exercises + coda, with its
c22b/geo22b namespace) into part-geo202.ts above the END-OF-BLOCKS marker,
so the engine v-geo202.ts audits the COMPLETE lesson. Idempotent-ish: refuses
to run twice (checks for an existing quiz block in part-geo202.ts).

Run: cd /home/z/my-project && python3 docs/research/geo-ch02-wip/splice_geo202_back.py
"""
import re
import sys

WIP = "/home/z/my-project/docs/research/geo-ch02-wip"
PART = f"{WIP}/part-geo202.ts"
BACK = f"{WIP}/part-geo202-back.ts"

part = open(PART, encoding="utf-8").read()
back = open(BACK, encoding="utf-8").read()

if "kind: 'quiz'" in part:
    sys.exit("part-geo202.ts already carries a quiz block — splice already done")

# --- extract the helper region from the back file (between `export {}` and the blocks export)
m = re.search(r"^export \{\}\n(.*?)^export const geo202BackBlocks", back, flags=re.S | re.M)
assert m, "back helper region not found"
helpers = m.group(1).strip("\n")

# --- extract the array items (between `= [` and the final `]`)
m = re.search(r"^export const geo202BackBlocks: Lesson\['blocks'\] = \[\n(.*)\n\]\s*$", back, flags=re.S | re.M)
assert m, "back blocks array not found"
items = m.group(1).rstrip()

# --- insert helpers before the lesson export in part-geo202.ts
anchor = "export const lessonGeo202: Lesson = {"
assert anchor in part, "lesson export anchor not found"
part = part.replace(
    anchor,
    "/* ------------------------------------------------------------------ */\n"
    "/* back-half namespace (seat 127-b): palette c22b + geo22b helpers    */\n"
    "/* ------------------------------------------------------------------ */\n"
    + helpers + "\n\n" + anchor,
    1,
)

# --- insert the back blocks above the END-OF-BLOCKS marker
marker = "    /* === END OF BLOCKS"
assert marker in part, "END OF BLOCKS marker not found"
part = part.replace(
    marker,
    "\n"
    "    /* ==== back half (seat 127-b): quiz + exercises + coda — spliced ==== */\n"
    + items + "\n\n"
    + marker,
    1,
)

open(PART, "w", encoding="utf-8").write(part)
print(f"spliced: helpers ({len(helpers.splitlines())} lines) + blocks ({len(items.splitlines())} lines)")
print("part-geo202.ts now", len(part.splitlines()), "lines")
