#!/usr/bin/env python3
"""Resolve the append-style log conflicts of the run-109 rebase (FIRST-SHIPPED-STANDS):
keep BOTH sides in chronological order — the local pass entry (Nov 16 morning)
before the sibling audit-fire entry (Nov 17 02:30 IST). Then register the union
merge driver for these two append-only logs so the remaining replayed commits
auto-resolve the same pattern."""
import re
import pathlib

ROOT = pathlib.Path('/home/z/my-project')

for rel in ['docs/project/WORKLOG.md', 'docs/project/DETAILED_LOG.md']:
    path = ROOT / rel
    text = path.read_text(encoding='utf-8')
    m = re.search(r'<<<<<<< HEAD\n(.*?)\n=======\n(.*?)\n>>>>>>> [^\n]*\n', text, re.S)
    if not m:
        print(f'{rel}: no conflict markers found (already resolved?)')
        continue
    ours, theirs = m.group(1), m.group(2)
    # theirs = the incoming local pass entry (2026-11-16); ours = the sibling audit
    # entry (2026-11-17 02:30 IST). Chronological order: theirs first, then ours.
    merged = theirs + '\n\n' + ours + '\n'
    text = text[:m.start()] + merged + text[m.end():]
    path.write_text(text, encoding='utf-8')
    print(f'{rel}: resolved, kept both ({len(theirs)} + {len(ours)} chars)')

# union merge driver for the append-only logs (idempotent if re-run)
attrs = ROOT / '.gitattributes'
line_ours = 'docs/project/WORKLOG.md merge=union\n'
line_theirs = 'docs/project/DETAILED_LOG.md merge=union\n'
existing = attrs.read_text(encoding='utf-8') if attrs.exists() else ''
out = existing
for line in (line_ours, line_theirs):
    if line not in out:
        out += line
if out != existing:
    attrs.write_text(out, encoding='utf-8')
    print('.gitattributes: union driver registered for the two logs')
else:
    print('.gitattributes: already registered')
