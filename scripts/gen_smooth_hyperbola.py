#!/usr/bin/env python3
"""Generate the smooth hyperbola path for FM 6.4 figure 1 (xy = 240 panel).

Curve in pixel space: (x-420) * (320-y) = 28800  (x = 420 + 40t, y = 320 - 720/t)
Samples: 41 uniform-t values on [8/3, 7] merged with the exact dot t-values 3,4,5,6.
Outputs: the SVG path d string, and the JS literal array for verify-unit-6.ts AJ11.
"""
T0, T1 = 8 / 3, 7.0
N = 40  # intervals -> 41 uniform samples

ts = [T0 + (T1 - T0) * k / N for k in range(N + 1)]
SPECIALS = (3.0, 4.0, 5.0, 6.0)  # exact dot abscissae
for extra in SPECIALS:
    if not any(abs(t - extra) < 1e-9 for t in ts):
        ts.append(extra)
# drop uniform samples crowded within 0.12 t of a special abscissa (keeps spacing even)
ts = [t for t in ts if not any(abs(t - s) < 0.12 and abs(t - s) > 1e-9 for s in SPECIALS)] or ts
ts = sorted(set(round(t, 9) for t in ts))
# re-add specials if the drop removed them
for extra in SPECIALS:
    if not any(abs(t - extra) < 1e-9 for t in ts):
        ts.append(extra)
ts.sort()

pts = []
for t in ts:
    x = round(420 + 40 * t, 1)
    y = round(320 - 720 / t, 1)
    if pts and pts[-1] == (x, y):
        continue
    pts.append((x, y))

d = 'M ' + ' L '.join(f'{x:g} {y:g}' for x, y in pts)
print('--- SVG path element ---')
print(f'<path d="{d}" />')
print()
print('--- JS literal array for AJ11 ---')
js = '[' + ','.join(f'[{x:g},{y:g}]' for x, y in pts) + ']'
print(js)
print()
print(f'vertices: {len(pts)}  endpoints: {pts[0]} {pts[-1]}')
print('dots present:', all(p in pts for p in [(540, 80), (580, 140), (620, 176), (660, 200)]))

# max segment turn angle (kink check)
import math
angles = []
for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
    angles.append(math.atan2(y2 - y1, x2 - x1))
turns = [abs(math.degrees(a2 - a1)) for a1, a2 in zip(angles, angles[1:])]
print(f'max segment turn: {max(turns):.2f} deg (target <= 2.5)')
