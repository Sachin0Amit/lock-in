#!/usr/bin/env python3
"""record-run88-push.py — record the run-88 push verification in
RESUME_POINTER.json lastPush + the WORKLOG push-verification entry."""
import json

ROOT = '/home/z/my-project'
SHA = '20f6b69b0d1e597ed65595236045dbfb72cb5170'
SHORT = '20f6b69'

# ---- RESUME_POINTER.json lastPush ----
with open(f'{ROOT}/docs/project/RESUME_POINTER.json') as f:
    ptr = json.load(f)

ptr['lastPush'] = {
    'run': 88,
    'date': '2026-11-10',
    'shipCommit': SHORT,
    'pushed': True,
    'remoteMainVerified': True,
    'method': (
        'one-time HTTPS URL (SSH unavailable in the sandbox); the PAT WAS present in this '
        "run's payload — the push carried ALL unpushed commits on main: run 87's deferred "
        'aa2dadd (the 11.1 + 11.2 lesson work) and 3a5aafb (the run-87 ship record) plus '
        "run 88's ship 20f6b69 (the 11.3 + unit-11 review + BOOK CLOSE); remote moved "
        'aaf09bf -> 20f6b69; ls-remote through the same one-time URL verified remote main = '
        'local HEAD; origin kept as the SSH remote; the anonymous tracking-ref resync '
        'remains sandbox-blocked'
    ),
    'sha': SHA,
}

with open(f'{ROOT}/docs/project/RESUME_POINTER.json', 'w') as f:
    json.dump(ptr, f, indent=1, ensure_ascii=False)
    f.write('\n')
print('RESUME_POINTER.json lastPush recorded (run 88, 20f6b69, verified)')

# ---- WORKLOG push-verification entry ----
entry = (
    '## 2026-11-10 — RUN 88: push verification recorded — remote main = local HEAD 20f6b69 '
    '(ls-remote via one-time URL: HEAD = 20f6b69b0d1e597ed65595236045dbfb72cb5170; the PAT was '
    "present in this run's payload, so the push carried ALL unpushed commits on main — run 87's "
    'deferred aa2dadd (11.1 + 11.2) and 3a5aafb (the run-87 ship record) plus run 88\'s ship '
    '20f6b69 (11.3 + the unit-11 review + THE BOOK CLOSE); remote moved aaf09bf -> 20f6b69; '
    'origin kept as the SSH remote; the anonymous tracking-ref resync remains sandbox-blocked — '
    'the one-time-URL ls-remote is the authoritative check, as in runs 80–87)\n\n---\n\n'
)

with open(f'{ROOT}/docs/project/WORKLOG.md') as f:
    wl = f.read()

marker = '## 2026-11-10 — RUN 88 (day window of job 516929'
idx = wl.find(marker)
assert idx > 0, 'run-88 entry not found'
wl = wl[:idx] + entry + wl[idx:]

with open(f'{ROOT}/docs/project/WORKLOG.md', 'w') as f:
    f.write(wl)
print('WORKLOG.md push-verification entry inserted above the run-88 entry')
