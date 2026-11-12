#!/usr/bin/env python3
"""lesson-view-sheet.py — build a 3-band montage of a tall full-page lesson
screenshot so one vision call can audit the whole lesson view.
Usage: lesson-view-sheet.py out.png fullpage.png
"""
import sys
from PIL import Image

out, path = sys.argv[1], sys.argv[2]
im = Image.open(path).convert("RGB")
W = 448  # per-band width
sc = W / im.width
im2 = im.resize((W, int(im.height * sc)), Image.LANCZOS)
H = im2.height
bands = 3
seg = (H + bands - 1) // bands
GAP = 14
sheet = Image.new("RGB", (W * bands + GAP * (bands - 1), seg), (255, 255, 255))
for i in range(bands):
    band = im2.crop((0, i * seg, W, min((i + 1) * seg, H)))
    sheet.paste(band, (i * (W + GAP), 0))
sheet.save(out)
print(out, sheet.size)
