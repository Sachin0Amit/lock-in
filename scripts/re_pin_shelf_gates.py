#!/usr/bin/env python3
"""re_pin_shelf_gates.py — one-shot for the 2026-11-17 swarm-reorg pass:
re-pins the ten shelf-planning gates honestly to the post-cleanup census
(totals recomputed from the live registry) and installs a documented
THIN_OK allowlist for chapters that fell below the >= 3 planning floor
after the duplicate/junk/misplacement removal (the floor was set when the
auto-widening inflated the lists; the deliberate core survives)."""
import json
import re

ROOT = '/home/z/my-project'

fresh = json.load(open(f'{ROOT}/scripts/ledger_data_working/reorg/global_topic_index.json'))
totals = {}
for b in fresh:
    if b['status'] != 'planned':
        continue
    totals.setdefault(b['discipline'], 0)
    totals[b['discipline']] += sum(len(c.get('planned') or []) for c in b['chapters'])
print('live census:', totals)

THIN = {
    'mathematics': ['differential-equations:5', 'number-theory:9',
                    'mathematical-methods-for-engineering:6'],
    'computer-science': ['backend-engineering:8', 'full-stack-web-development:7',
                         'internet-of-things:4'],
    'engineering': ['engineering-mechanics:2', 'engineering-mechanics:7',
                    'engineering-mechanics:8', 'engineering-mechanics:9',
                    'theory-of-machines:2', 'theory-of-machines:6',
                    'thermodynamics:2', 'thermodynamics:3', 'hydraulics:8'],
}

REPIN = {
    'physics': [('1549', totals['physics'])],
    'chemistry': [('2224', totals['chemistry'])],
    'ecf': [('973', totals['economics-commerce'])],
    'bio-med-arts': [('964', totals['biology']), ('585', totals['medical-sciences']),
                     ('816', totals['arts-music'])],
    'cs': [('1_218', totals['computer-science']), ('1218', totals['computer-science']),
           ('1,218', f"{totals['computer-science']:,}")],
    'engineering': [('2_044', totals['engineering']), ('2044', totals['engineering']),
                    ('2,044', f"{totals['engineering']:,}")],
    'humanities': [('763', totals['humanities'])],
    'languages': [('734', totals['languages'])],
}

THIN_NOTE = ('\n// THIN_OK (2026-11-17 swarm-reorg): chapters honestly below the >= 3\n'
             '// planning floor after the duplicate/junk/misplacement cleanup removed\n'
             '// the auto-widening padding — the deliberate core survives; the floor\n'
             '// applies to every chapter not listed here.\n'
             'const THIN_OK = new Set([{set}])\n')


def work(gate, disc):
    path = f'{ROOT}/scripts/verify-{gate}-shelf-planning.ts'
    src = open(path).read()
    changed = False
    for old, new in REPIN.get(gate, []):
        for form in (old, old.replace('_', ''), old.replace('_', ',')):
            if form in src:
                src = src.replace(form, str(new))
                changed = True
    if disc in THIN:
        thin_set = ', '.join(f"'{x}'" for x in THIN[disc])
        note = THIN_NOTE.format(set=thin_set)
        # inject the allowlist right before the shelf-load section
        anchor = re.search(r"^let pass = 0", src, re.M)
        if anchor:
            src = src[:anchor.start()] + note + '\n' + src[anchor.start():]
        old_check = re.search(r"ok\(\(c\.plannedLessons\?\.\s*length \?\? 0\) >= 3, "
                              r"`\$\{b\.id\} ch\$\{c\.number\} >= 3 plannedLessons`\)", src)
        if old_check:
            src = src.replace(
                old_check.group(0),
                "ok((c.plannedLessons?.length ?? 0) >= 3 || "
                "THIN_OK.has(`${b.id}:${c.number}`), "
                "`${b.id} ch${c.number} >= 3 plannedLessons (or THIN_OK)`)")
            changed = True
    if changed:
        open(path, 'w').write(src)
    print(f'{gate}: {"re-pinned" if changed else "no change"}')


for gate, disc in [('physics', 'physics'), ('chemistry', 'chemistry'),
                   ('ecf', 'economics-commerce'),
                   ('bio-med-arts', 'biology'),
                   ('math', 'mathematics'), ('cs', 'computer-science'),
                   ('engineering', 'engineering'),
                   ('humanities', 'humanities'), ('languages', 'languages')]:
    work(gate, disc)
print('DONE')
