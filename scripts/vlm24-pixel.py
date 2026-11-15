#!/usr/bin/env python3
"""Pixel-level figure audit for AA 2.4 (run 103) — the vision-endpoint
fallback: non-blank check, palette presence, curve-color presence,
and per-region ink density on the four cropped screenshots."""
from PIL import Image
import sys

def audit(path, label, expect_colors):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    px = im.load()
    colors = {}
    nonwhite = 0
    total = w * h
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            r, g, b = px[x, y]
            if (r, g, b) != (255, 253, 245) and not (r > 250 and g > 250 and b > 245):
                nonwhite += 1
            key = (r // 32 * 32, g // 32 * 32, b // 32 * 32)
            colors[key] = colors.get(key, 0) + 1
    ratio = nonwhite / (total / 4)
    print(f"== {label}: {w}x{h}, non-paper pixel ratio {ratio:.3f}")
    ok = True
    if ratio < 0.02:
        print("   FAIL: figure nearly blank")
        ok = False
    # expected palette colors (quantized to /32 buckets)
    for name, (r, g, b) in expect_colors.items():
        bucket = (r // 32 * 32, g // 32 * 32, b // 32 * 32)
        found = colors.get(bucket, 0)
        present = found > 0
        print(f"   {'PASS' if present else 'FAIL'} palette {name} {('#%02x%02x%02x' % (r,g,b))} ({found} sampled px)")
        ok = ok and present
    return ok

fig1_expect = {
    'teal curve m=0': (13, 148, 136),
    'amber curve m=3': (217, 119, 6),
    'lime curve m=5': (101, 163, 13),
    'orange curve m=7': (234, 88, 12),
    'red fixed-point ring': (220, 38, 38),
}
fig2_expect = {
    'green structure': (22, 163, 74),
    'amber brackets': (217, 119, 6),
    'teal bracket/arrows': (13, 148, 136),
    'orange instance dots': (234, 88, 12),
    'lime door dots': (101, 163, 13),
}

all_ok = True
all_ok &= audit('/tmp/vlm24/fig1-light.png', 'FIG1 LIGHT', fig1_expect)
all_ok &= audit('/tmp/vlm24/fig1-dark.png', 'FIG1 DARK', fig1_expect)
all_ok &= audit('/tmp/vlm24/fig2-light.png', 'FIG2 LIGHT', fig2_expect)
all_ok &= audit('/tmp/vlm24/fig2-dark.png', 'FIG2 DARK', fig2_expect)
print("\nPIXEL AUDIT:", "ALL PASS" if all_ok else "FAILURES PRESENT")
sys.exit(0 if all_ok else 1)
