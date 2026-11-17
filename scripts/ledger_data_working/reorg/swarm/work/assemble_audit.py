#!/usr/bin/env python3
"""Assemble final verdict file + run coverage audit."""
import json

eng = json.load(open('engineering.json'))
plan = json.load(open('engineering-plan.json'))
MY = ['engineering-mechanics','strength-of-materials','theory-of-machines','machine-design','thermodynamics','fluid-mechanics','heat-transfer','manufacturing-processes','industrial-engineering','robotics-and-automation','cad-cam','materials-science','circuit-theory-and-network-analysis','electrical-machines','power-systems','control-systems']
MYSET = set(MY)
books = {b['id']: b for b in eng['books'] if b['id'] in MY}

misplaced = json.load(open('work/misplaced.json'))
auto_extra = json.load(open('work/auto_extra.json'))
dupes = json.load(open('work/dupes.json'))
autoReview, extra = auto_extra['autoReview'], auto_extra['extra']

verdict = {
 "agent": "engineering-a",
 "autoReview": autoReview,
 "misplaced": misplaced,
 "dupes": dupes,
 "thin": [],
 "order": [],
 "extra": extra,
 "notes": ("16 engineering books (a-set). All 165 misAdjudicate items adjudicated: 16 keep (authored lessons that genuinely fit — e.g. 'From Stress to Dimension', 'Angular Momentum and the Gyroscopic Glimpse', the four 'Doorsteps' sections, 'Tool Geometry by Two Systems', 'Six Sigma Named Honestly'), 149 remove (Drive-PDF TOC pollution: Art-of-Electronics/Irwin/Hughes runs, front/back matter, ESE syllabus dumps, electronics strays). Token scores were ignored per brief; routing decided by engineering knowledge + legend. 98 dup clusters touching my books adjudicated: 46 keep-both (genuinely different treatments: e.g. fluid-mechanics vs thermodynamics nozzles, machine-design vs strength-of-materials stress concentration, EM transformer vs induction-machine equivalent circuits), 19 consolidate to specialist winners (refrigeration->thermodynamics, turbomachinery/specific-speed->fluid-mechanics, digital twin->cad-cam, ADCs/filters->analog-electronics, flip-flops->digital-logic-design, lean-waste->industrial-engineering), 33 junk-only clusters with empty winner (all members removed individually). autoReview: 13 vetoes (wrong intra-book move-chapters and wrong dedups — e.g. Mohr's Circle for Plane Stress, Power-Angle and Parallel Operation, Conversions and Equivalent Circuits, Transformations by Matrices, Surface Tension and Capillarity) and 23 amends (score-driven moves of junk to absurd books converted to removes; salvage single-words converted to removes). 135 free-scan extras remove remaining unflagged pollution. thinChapters: none in my 16 books. Chapter order of all 16 books reviewed against standard syllabi (Hibbeler/Beer, Cengel, Incropera, Craig, Callister, Ogata, Chapman...) — no clearly-wrong pedagogical order found. Approved by default: all junk-certain removes, the multi-plate-capacitor move to electricity-and-magnetism ch4 Capacitors and Dielectrics, and the electrical-machines ch4 redistributions to ch5/6/7.")
}

json.dump(verdict, open('verdicts/engineering-a.json','w'), indent=1)
print("verdict written.")

# ---------------- COVERAGE AUDIT ----------------
# Simulate post-cleanup: which lines remain in my books after applying:
#  - autoActions that I did NOT veto (removes, moves out, move-chapters, salvages amended to remove)
#  - my misplaced removes/keeps
#  - my extra removes
removed = set()   # (book, chapter, title)
kept_veto = set()

for a in plan['autoActions']:
    if a['book'] not in MYSET: continue
    key = (a['book'], a['chapter'], a['title'])
    is_vetoed = any(v['book']==a['book'] and v['chapter']==a['chapter'] and v['title']==a['title'] and v['verdict']=='veto' for v in autoReview)
    if is_vetoed:
        kept_veto.add(key); continue
    if a['op'] in ('remove','move','salvage'):
        removed.add(key)
    # move-chapter keeps the line in the book (moved chapter) — nothing to remove

for m in misplaced:
    key = (m['book'], m['chapter'], m['title'])
    if m['action'] == 'remove': removed.add(key)
for e in extra:
    if e['action'] == 'remove': removed.add((e['book'], e['chapter'], e['title']))
for v in autoReview:
    if v['verdict'] == 'amend' and v['action'] == 'remove':
        removed.add((v['book'], v['chapter'], v['title']))

remaining = []
for bid in MY:
    for ch in books[bid]['chapters']:
        for i, t in enumerate(ch['planned']):
            if (bid, ch['number'], t) not in removed:
                remaining.append((bid, ch['number'], i, t))

print("remaining planned lines in my 16 books:", len(remaining))
# sanity: none of the remaining lines should be an obvious junk pattern
import re
susp = [r for r in remaining if re.search(r'\d{3,}|Contents|List of (Tables|Examples)|Preface to|Fig\. \d|ISBN|www\.|CAMBRIDGE|Cambridge University|Practical Perspective|Summary of important|Emitter [Ff]ollower|Karnaugh|optocoupler|MOSFET|BJT|Thévenin Equivalent', r[3])]
print("remaining suspicious lines:", len(susp))
for s in susp: print('   ', s[0], 'ch%s'%s[1], 'idx%s'%s[2], '::', s[3][:100])
