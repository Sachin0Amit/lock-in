#!/usr/bin/env python3
"""Programmatic visual sanity check of the unified builder screenshots.

Checks: non-blank ink ratio, left/right column split on desktop, vertical
content flow, and mobile single-column flow. Complements the DOM-based
geometry assertions in the e2e suite.
"""
from PIL import Image
import sys

def analyze(path, expect_two_cols):
    im = Image.open(path).convert("L")
    w, h = im.size
    px = im.load()
    # ink ratio (pixels darker than 235)
    dark = 0
    for y in range(0, h, 4):
        for x in range(0, w, 4):
            if px[x, y] < 235:
                dark += 1
    total = (h // 4) * (w // 4)
    ink = dark / total

    # column ink profile: fraction of dark pixels per vertical band
    bands = 8
    profile = []
    for b in range(bands):
        x0, x1 = (w // bands) * b, (w // bands) * (b + 1)
        d = 0
        t = 0
        for y in range(0, h, 4):
            for x in range(x0, x1, 4):
                t += 1
                if px[x, y] < 235:
                    d += 1
        profile.append(round(d / max(1, t), 3))

    # horizontal row profile: any fully blank horizontal stripe > 45% height?
    blank_rows = 0
    for y in range(0, h, 2):
        row_dark = sum(1 for x in range(0, w, 8) if px[x, y] < 235)
        if row_dark == 0:
            blank_rows += 1
    blank_frac = blank_rows / (h // 2)

    name = path.split("/")[-1]
    print(f"{name}: {w}x{h} ink={ink:.3f} blank_rows={blank_frac:.2f}")
    print(f"  col profile: {profile}")
    ok = True
    if ink < 0.02:
        print("  ✗ page nearly blank")
        ok = False
    if blank_frac > 0.45 and ink < 0.05:
        print(f"  ✗ {blank_frac:.0%} of rows blank AND thin ink — layout hole")
        ok = False
    if expect_two_cols:
        # both the left desk (bands 0-4) and right rail (bands 5-7) must have ink
        if sum(profile[:5]) == 0 or sum(profile[5:]) < 0.02:
            print("  ✗ expected two content columns (desk + rail) — one side empty")
            ok = False
    else:
        # mobile: no ink in the outer 6px gutters (beyond the px-4 padding)
        edge = 6
        edge_ink = 0
        edge_total = 0
        for y in range(0, h, 2):
            for x in list(range(0, edge)) + list(range(w - edge, w)):
                edge_total += 1
                if px[x, y] < 200:
                    edge_ink += 1
        if edge_ink / max(1, edge_total) > 0.05:
            print(f"  ✗ ink in outer gutters ({edge_ink}/{edge_total}) — overflow tell")
            ok = False
    if ok:
        print("  ✓ visual sanity OK")
    return ok

results = [
    analyze("/tmp/e2e-cbb/desk-combined.png", expect_two_cols=True),
    analyze("/tmp/e2e-cbb/builder-mobile.png", expect_two_cols=False),
    analyze("/tmp/e2e-cbb/builder-dark.png", expect_two_cols=True),
    analyze("/tmp/e2e-cbb/review-desktop.png", expect_two_cols=False),
    analyze("/tmp/e2e-cbb/curate-desktop.png", expect_two_cols=True),
    analyze("/tmp/e2e-cbb/reader-desktop.png", expect_two_cols=True),
    analyze("/tmp/e2e-cbb/reader-mobile.png", expect_two_cols=False),
]
sys.exit(0 if all(results) else 1)
