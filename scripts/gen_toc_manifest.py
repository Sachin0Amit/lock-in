#!/usr/bin/env python3
"""gen_toc_manifest.py — build the download manifest for the full
mathematics-shelf TOC survey (owner directive 2026-11-10: download the
Drive math books one by one, extract every TOC).

Reads the machine-listings captured this run (temporary-references/*.json)
and emits temporary-references/manifest.tsv: key <tab> drive-file-id.
Distinct-TOC policy: the five MATHS module chapter PDFs (42) + the classic
poles that carry distinct coverage (Loney trig, Thomas late-transcendental
calculus, Stewart early-transcendental calculus, Kreyszig engineering math,
Rudin real analysis, Rosen discrete, Strang/Axler/Lay linear algebra,
Khattar aptitude, the Elementary-Algebra text for identification).
The remaining Drive calculus/linear-algebra editions (Anton, Larson x2,
Stewart 8e + solutions, Schaum, Strang LAA 4e, Hall & Knight x2) are
same-arc editions already recorded with ids in the survey inventory.
"""
import json
import os

BASE = "/home/z/my-project/temporary-references"
entries = []  # (key, id, label)

MODULES = {
    "m1": "M1 Trigonometry",
    "m2": "M2 Algebra",
    "m3": "M3 Coordinate Goemetry",
    "m4": "M4 Calculus",
    "m5": "M5 3D Geometry",
}
for mod, label in MODULES.items():
    with open(f"{BASE}/{mod}-listing.json") as f:
        data = json.load(f)
    for item in data["items"]:
        name = item["name"].replace(".pdf", "").strip()
        # key: module + zero-padded index, e.g. m2-03
        idx = name.split(".")[0].strip()
        try:
            idx = f"{int(idx):02d}"
        except ValueError:
            idx = idx.zfill(2)
        key = f"{mod}-{idx}"
        entries.append((key, item["id"], f"{label} :: {name}"))

ROOT_PICKS = [
    ("root-loney-trigonometry", "15kAmmhJyUwhJ69JjK1UvrrTliC1bM1R-", "Trigonometry-Loney.pdf (classic)"),
    ("root-thomas-calculus-14e", "1qXv8ncUgfOeCuu7b90fRhTPPhn1A5MXJ", "Thomas-Calculus-14th-Edition.pdf (late-transcendental pole)"),
    ("root-stewart-et-metric", "11yoxqMcnVd-vzYmYell_9xl32tvEYmaZ", "calculus-early-transcendentals-international-metric-edition.pdf (early-transcendental pole)"),
    ("root-kreyszig-eng-math", "1qc-ZpcbOVaEGciwOItdtOLM26vD68MzV", "advanced-engineering-mathematics.pdf"),
    ("root-rudin-pma-3e", "1nRWalBPsIlcyQe99EFsuvUUAMdCN1YCM", "Principles-of-Mathematical-Analysis-Rudin-3rd.pdf"),
    ("root-rosen-discrete-8e", "1z2Wleas8Pjha1YWOskgo3GB7X-vVYUhq", "RosenDiscreteMath8Ed.pdf"),
    ("root-strang-intro-la-5e", "1jlyeOlJjdjWZJIwHniAxChf4YV7ybP7i", "Introduction-to-Linear-Algebra-Gilbert-Strang-5th.pdf"),
    ("root-axler-ladr-4e", "12MEhSOQCcHgOoWDAyIMj2V8HUaAi_t3-", "dokumen.pub_linear-algebra-done-right-4th (Axler)"),
    ("root-lay-laa-5e", "1GwxD5B1XwENJiG5_4LHUTJQlu68ejxFE", "Linear-Algebra-and-Its-Applications-Lay-5th.pdf"),
    ("root-khattar-qa", "12YnlSYX16Hl-Oze9Io7bBN0hZ_2qRcbi", "Quantitative-Aptitude-Competitive-Examinations-Khattar.pdf"),
    ("root-elementary-algebra-text", "13p83Jss_D7bSgAXh1juKHKI69oKpBxWL", "Elementary-Algebra_text.pdf (identify)"),
]
entries.extend(ROOT_PICKS)

os.makedirs(f"{BASE}/tocs", exist_ok=True)
os.makedirs(f"{BASE}/pdfs", exist_ok=True)
with open(f"{BASE}/manifest.tsv", "w") as f:
    for key, fid, label in entries:
        f.write(f"{key}\t{fid}\t{label}\n")
print(f"manifest: {len(entries)} entries")
for key, fid, label in entries:
    print(f"  {key}  {label}")
