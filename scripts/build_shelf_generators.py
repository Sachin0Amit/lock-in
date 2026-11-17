#!/usr/bin/env python3
"""build_shelf_generators.py — rebuild the six lost shelf generators (recovery tool).

The 2026-11-16 planning passes authored each shelf's plan data inside python
generators (gen_<shelf>_shelf.py) whose emitters wrote the book.ts files.
Those generator sources lived under un-whitelisted scripts/ paths and were
destroyed by the same sandbox wipe that emptied the DB (the 2026-11-17
rebuild pass root-caused this and whitelisted the paths — the .gitignore
now carries the six names, but the files themselves were still missing).

The OUTPUT survived committed: every book.ts is git-tracked. The plan data
is therefore recoverable FROM book.ts, which is exactly how this tool
recovers it — each rebuilt generator embeds the CURRENT shipped book.ts
content per book (a snapshot), plus honest semantics:

  python3 scripts/gen_<shelf>_shelf.py            # verify: report drift, write nothing
  python3 scripts/gen_<shelf>_shelf.py --restore  # write only MISSING files (never clobbers)

Drift between the embedded snapshot and the live file is EXPECTED once
authoring begins on a shelf (status flips, lessons written, gap-fixes) —
verify mode reports it as information, not failure, and restore mode
NEVER overwrites a live file. Re-run THIS builder to re-embed the current
live state after a planning-level pass changes a shelf.

Idempotency proof at build time: right after the builder writes a
generator, its verify mode must report 0 drift / 0 missing (the snapshot
was taken from the very files it now mirrors).

Shelves: biology, medical-sciences, arts-music, chemistry, physics,
economics-commerce (the six whose authored generators were lost; the
engineering / humanities / languages generators survive).
"""
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOOKS_DIR = os.path.join(ROOT, "src", "data", "library", "books")
SCRIPTS = os.path.join(ROOT, "scripts")

# shelf directory -> generator file name (the .gitignore whitelist names)
SHELVES = [
    ("biology", "gen_biology_shelf.py"),
    ("medical-sciences", "gen_medical_shelf.py"),
    ("arts-music", "gen_arts_music_shelf.py"),
    ("chemistry", "gen_chemistry_shelf.py"),
    ("physics", "gen_physics_shelf.py"),
    ("economics-commerce", "gen_economics_finance_shelf.py"),
]


def shelf_census(files):
    """books / chapters / planned-lesson titles, counted from the file text."""
    nch = 0
    npl = 0
    for t in files.values():
        nch += t.count("    number: ")
        inside = False
        for line in t.splitlines():
            s = line.strip()
            if s.startswith("plannedLessons: ["):
                inside = True
                continue
            if inside:
                if s == "],":
                    inside = False
                elif s.startswith(("'", '"')):
                    npl += 1
    return len(files), nch, npl


def files_literal(files):
    """Emit FILES = {...} as readable multi-line python: one entry per line."""
    lines = ["{"]
    for bid in sorted(files):
        lines.append(f"  {bid!r}: {files[bid]!r},")
    lines.append("}")
    return "\n".join(lines)


def build(shelf, gen_name):
    shelf_dir = os.path.join(BOOKS_DIR, shelf)
    files = {}
    for bid in sorted(os.listdir(shelf_dir)):
        book_dir = os.path.join(shelf_dir, bid)
        book_file = os.path.join(book_dir, "book.ts")
        if os.path.isdir(book_dir) and os.path.isfile(book_file):
            with open(book_file, encoding="utf-8") as f:
                files[bid] = f.read()
    nb, nch, npl = shelf_census(files)

    head = f'''#!/usr/bin/env python3
"""gen_{gen_name[:-3]} — RECOVERY SNAPSHOT GENERATOR for the {shelf} shelf.

Rebuilt 2026-11-17 by scripts/build_shelf_generators.py: the original
authored-data generator (the 2026-11-16 planning pass) was lost in the
sandbox wipe before the .gitignore whitelist landed; its committed OUTPUT
(the book.ts plans) survived, so this tool re-embeds that shipped content
per book and keeps the shelf regenerable.

  python3 scripts/{gen_name}             # verify: report drift, write nothing
  python3 scripts/{gen_name} --restore   # write only MISSING files

Shelf snapshot (2026-11-17): {nb} books / {nch} chapters / {npl} planned
lessons. The snapshot is a RECOVERY POINT, not a live source of truth:
once authoring begins on this shelf the live book.ts files evolve past
the snapshot and verify mode reports the drift honestly. --restore never
overwrites an existing file; re-run build_shelf_generators.py after a
planning-level pass to re-embed the new state.
"""
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHELF_DIR = os.path.join(ROOT, "src", "data", "library", "books", "{shelf}")

# bookId -> the complete shipped book.ts content (snapshot 2026-11-17)
FILES = '''

    body = '''

def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "--verify"
    missing = drifted = restored = 0
    for bid in sorted(FILES):
        text = FILES[bid]
        path = os.path.join(SHELF_DIR, bid, "book.ts")
        if not os.path.exists(path):
            missing += 1
            print(f"  MISSING {bid}")
            if mode == "--restore":
                os.makedirs(os.path.dirname(path), exist_ok=True)
                with open(path, "w", encoding="utf-8") as f:
                    f.write(text)
                restored += 1
                print(f"  restored {bid}")
        else:
            with open(path, encoding="utf-8") as f:
                live = f.read()
            if live != text:
                drifted += 1
                print(f"  DRIFT   {bid} (live file differs from the snapshot — expected once authoring begins)")
    print(f"{os.path.basename(__file__)}: {len(FILES)} books — {missing} missing ({restored} restored), {drifted} drifted")
    if missing and mode != "--restore":
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
'''

    out = os.path.join(SCRIPTS, gen_name)
    with open(out, "w", encoding="utf-8") as f:
        f.write(head + files_literal(files) + body)
    kb = os.path.getsize(out) / 1024
    print(f"built {gen_name}: {nb} books / {nch} ch / {npl} planned — {kb:.0f} KB")
    return gen_name


def main():
    for shelf, gen_name in SHELVES:
        build(shelf, gen_name)
    print("all six generators rebuilt — run each one (no args) for the 0-drift idempotency proof")


if __name__ == "__main__":
    main()
