#!/usr/bin/env python3
"""digest_cs_tocs.py — chapter-level TOC digest of the extracted Drive CS
sources (the CS shelf planning pass, 2026-11-15). Prints, per source, the
chapter/part-level lines (plus one-dot sections) so the survey doc can be
composed from a bounded, honest record. Full front-matter text stays on disk
in temporary-references/tocs/ for this run and is deleted at run end per the
storage law (the survey doc is the durable record; authoring-time runs
re-download per-unit)."""
import glob
import re

BASE = "/home/z/my-project/temporary-references/tocs"

KEY_LABEL = {
    "cs-01": "A Tour of C++ 2e (Stroustrup) → cpp",
    "cs-02": "Silberschatz Operating System Concepts 10e → os",
    "cs-03": "Aho/Lam/Sethi/Ullman Compilers (dragon) → cd",
    "cs-04": "Sedgewick & Wayne Algorithms 4e → alg",
    "cs-05": "C++ Primer 5e (Lippman) → cpp",
    "cs-06": "Kurose & Ross Computer Networking 8e → net",
    "cs-07": "Tanenbaum Computer Networks 5e → net",
    "cs-08": "Stallings Computer Organization & Architecture 11e → coa",
    "cs-09": "CS:APP 3e (Bryant & O'Hallaron) → coa",
    "cs-10": "Core Java 12e vols 1+2 (Horstmann) → jav",
    "cs-11": "Database System Concepts 7e (Silberschatz/Korth) → db",
    "cs-12": "Goodfellow Deep Learning → dl",
    "cs-13": "GoF Design Patterns → swe",
    "cs-14": "Mano Digital Logic and Computer Design → dld",
    "cs-17": "JavaScript: The Definitive Guide 7e → js",
    "cs-18": "Effective Java 3e (Bloch) → jav",
    "cs-19": "Grokking Algorithms (Bhargava) → alg",
    "cs-20": "Head-First Design Patterns 2e → oop",
    "cs-21": "How Linux Works 3e (Ward) → os",
    "cs-22": "CLRS Introduction to Algorithms 4e → alg",
    "cs-23": "Sipser Introduction to the Theory of Computation 3e → toc",
    "cs-23b": "Sipser 3e (TOC pages 7-12, vision batch 2) → toc",
    "cs-24": "Java Concurrency in Practice (Goetz) → jav",
    "cs-25": "Python Crash Course 2e (Matthes) → py",
    "cs-26": "Spring in Action 6e (Walls) → bed",
    "cs-27": "Skiena Algorithm Design Manual 3e → alg",
    "cs-28": "The Linux Programming Interface (Kerrisk) → os",
    "cs-29": "Thinking in Java 4e (Eckel) → jav",
}

pat_chapter = re.compile(r"^\s*(chapter\s+\d+|part\s+(one|two|three|four|five|six|[IVX]+)|"
                         r"appendix\s+[a-z]|[0-9]+\s+[A-Za-z].*|[IVXL]+\s+[A-Z].*)\s*[—.-]?\s*\d{1,4}\s*$", re.I)
pat_section = re.compile(r"^\s*\d+\.\d+\s+.*\d{1,4}\s*$")
pat_dotted = re.compile(r"^\s*\d+\.\d+(\.\d+)?\s+.*\d{1,4}\s*$")

for path in sorted(glob.glob(f"{BASE}/cs-*.txt")):
    key = path.rsplit("/", 1)[1][:-4]
    label = KEY_LABEL.get(key, "?")
    lines = open(path, encoding="utf-8", errors="replace").read().splitlines()
    # find contents region heuristically: everything, filtered
    out = []
    for ln in lines:
        s = ln.strip()
        if not s or s.startswith("---PAGE"):
            continue
        if len(s) > 90 or len(s) < 4:
            continue
        low = s.lower()
        if any(w in low for w in ("http", "www", "copyright", "preface", "publisher", "editor",
                                  "printed", "library of congress", "isbn", "john wiley",
                                  "cover art", "dedication")):
            continue
        if pat_chapter.match(s) or pat_section.match(s) or (pat_dotted.match(s) and s.count(".") <= 2):
            out.append(s)
    print(f"\n===== {key} :: {label} ({len(out)} lines) =====")
    for s in out[:64]:
        print(s)
    if len(out) > 64:
        print(f"... (+{len(out)-64} more section-level lines in {BASE}/{key}.txt)")
