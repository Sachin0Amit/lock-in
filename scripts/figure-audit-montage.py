#!/usr/bin/env python3
"""figure-audit-montage.py — tile several cropped figures into one tall
contact sheet so one vision call audits multiple figures at once (quota-
friendly). Each tile keeps its own header strip. Usage:
  python3 scripts/figure-audit-montage.py out.png in1.png in2.png ...
"""
import sys
from PIL import Image, ImageDraw

def main():
    out = sys.argv[1]
    ins = sys.argv[2:]
    tiles = []
    TARGET_W = 900  # scale each crop to this width
    for p in ins:
        im = Image.open(p).convert("RGB")
        h = int(im.height * TARGET_W / im.width)
        tiles.append(im.resize((TARGET_W, h), Image.LANCZOS))
    HEAD = 34
    GAP = 18
    total_h = sum(t.height + HEAD for t in tiles) + GAP * (len(tiles) - 1)
    sheet = Image.new("RGB", (TARGET_W, total_h), (255, 255, 255))
    d = ImageDraw.Draw(sheet)
    y = 0
    for i, t in enumerate(tiles, 1):
        d.rectangle([0, y, TARGET_W, y + HEAD - 6], fill=(230, 230, 230))
        d.text((10, y + 8), f"FIGURE {i} of {len(tiles)}", fill=(0, 0, 0))
        y += HEAD
        sheet.paste(t, (0, y))
        y += t.height + GAP
    sheet.save(out)
    print(out, sheet.size)

if __name__ == "__main__":
    main()
