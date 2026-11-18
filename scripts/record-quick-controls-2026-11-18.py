#!/usr/bin/env python3
"""Bookkeeping for the floating-icon quick-controls directive run (2026-11-18,
latest owner chat directive). Appends the WORKLOG entry, extends the PROGRESS
focusHubDirective20261118 record, and updates RESUME_POINTER.nextAction."""
import json

# ---------------------------------------------------------------- WORKLOG --
WORKLOG_ENTRY = """
## 2026-11-18 — OWNER CHAT DIRECTIVE (not a numbered run, latest): THE FLOATING ICON'S QUICK CONTROLS — "the icone should show more feature like add more tie adjust time or play pause such"

**Pull-first honored:** anonymous ls-remote found remote main at 2831542 == the local origin/main tracking ref; local cleanly AHEAD by the three feature commits (Revision Progress tab, Focus Hub, the floating icon — the previous directive run ended pre-push) — no divergence, nothing to fetch; this run's commit rides the same next-PAT-bearing push.

**What the owner asked:** the floating icon should show more features — add more time, adjust time, play/pause, and such.

**The design:** the hover tooltip became an interactive CONTROL PANEL. A hover bridge (the 8 px gap is real pixels INSIDE the panel container) keeps it open from the icon onto the buttons; the panel takes pointer-events only while visible (pointer-events-none when hidden — it never blocks the page). The controls row: [Pause/Resume/Start] — the same pause/resume/start actions the hub's button writes (running pauses; a stored remainder resumes; idle starts a free focus block, with the notification-permission ask); three quick-adjust steps −1/+1/+5 min; and skip (the runtime's completePhase(false) — the next phase arms, and per the honesty rule a skipped bell never counts: the cadence stays n/longEvery). Idle rests the steps and skip honestly (nothing armed) but keeps Start live — and starting from the panel runs a fresh 25-min focus IN PLACE, page unmoved. Keyboard parity: the wrapper's focusin/focusout keep the panel open while focus moves through the buttons (a control inside the closed panel is not focusable — the panel opens first, exactly how Tab reaches the buttons for a real keyboard user).

**The honest quick-adjust arithmetic (VERIFY-FIRST — section H pinned BEFORE any UI, 114/0 GREEN):** `quickAdjust()` in floating-view.ts computes the wall-clock patch pure: running → endsAt += eff; paused/armed → remainingMs += eff. Two clamps make it honest: (1) a subtraction can never cut below "end now" (eff ≥ −left) — a running phase pulled to the present completes naturally on the next 250 ms tick and logs exactly the time truly focused; (2) a tailored phase never grows past 4 h (eff capped so planned ≤ 240 min). The new persisted `phasePlannedMs` carries the phase's tailored length so the ring, both 'of N min' labels (panel AND hub dial), and the session row's plannedSecs all read ONE number — and the honesty invariant planned − left = truly-focused time holds in every state (pinned: a +5 at 10-min-into-a-25-min phase keeps planned−left at exactly 600 000; the deep −26-min clamp also keeps exactly the 600 000). completePhase logs the tailored planned; a reset re-plans at the settings-derived length (a reset discards the tailoring, honestly). Legacy rows (no phasePlannedMs) degrade to the settings-derived length everywhere — backward compatible, pinned.

**Hub parity:** the Focus Hub dial reads the same phasePlannedMs (its 'of N min' line and ring now agree with the floating panel to the second), the hub's toggleRun shares the extracted ensureNotifyPermission helper, and the hub controls gained the same 'tailor this phase' cluster (−1/+1/+5) — one store, one arithmetic, two surfaces.

**Gates:** verify-focus-planner 114/0 (96 shipped + 18 new section-H pins); tsc 0 project-wide; eslint 0 errors (the 5 pre-existing warnings unchanged); routes 200; e2e-floating-pomodoro extended 39 → 71 checks, ALL GREEN: the panel opens with the controls present (toggle aria 'Pause the pomodoro'; three steps with the honest labels 'Subtract one minute from the phase' / 'Add one minute to the phase' / 'Add five minutes to the phase'; skip), +5 moves the end epoch ~300 s AND the tooltip to 'of 30 min' AND the minute-floored aria to 'Pomodoro: 6 minutes left in Focus', −1 shrinks the tailored length to 'of 29 min', pause stores the remainder (state 'paused', aria 'Pomodoro paused — …'), +1 while paused adjusts the stored remainder with the panel still open (the bridge holds), resume runs again, skip arms the short break with the cadence honestly UNmoved (2/4 — a skipped bell never counts; the first run's 3/4 expectation was the bug in the check itself, caught and corrected), no click ever navigates away from the lesson page, pointer-out closes the panel, keyboard focus opens the panel and moves INTO the controls, idle rests the steps/skip and keeps Start live, and mobile 390 + dark now also assert the OPEN panel (no horizontal overflow, fits the viewport, controls visible). Focus Hub regression e2e-focus-planner 40/40.

**VLM audits:** mobile panel-open PASS; dark panel-open PASS; the desktop panel's first audit FAILed on 'the word "tailors" broken across the wrap' — dismissed by two higher-fidelity re-audits (a 3× zoom transcription: 'the wrap falls cleanly between −/+ and tailors this phase., nothing clipped, TRANSCRIPTION OK'; the zoomed strict audit: 'a clean line break, not a mid-word break'). The remaining notes are inherent floating-overlay behavior (the open hover panel covers page content beneath it — by design, hover-scoped) and the intentional 8 px bridge gap between icon and panel.

**Bookkeeping:** WORKLOG (this entry) + RESUME_POINTER + PROGRESS focusHubDirective20261118 extended. Authoring cadence unchanged (run 111 still opens AA 4.1 AM-GM). Push deferred — no PAT in this payload; the four unpushed commits (Progress tab, Focus Hub, floating icon, quick controls) ride the next PAT-bearing push per the standing protocol, FIRST-SHIPPED-STANDS on any sibling divergence meanwhile.
"""

with open('docs/project/WORKLOG.md', 'a') as f:
    f.write(WORKLOG_ENTRY)

# --------------------------------------------------------------- PROGRESS --
with open('docs/project/PROGRESS.json') as f:
    raw = f.read()

OLD_TAIL = ("notes bus to the hub, off-hub toast 8s, single-flight pinned); "
            "e2e-floating-pomodoro 39/39; verify-focus-planner 96/0")
NEW_TAIL = ("notes bus to the hub, off-hub toast 8s, single-flight pinned); "
            "e2e-floating-pomodoro 39/39; verify-focus-planner 96/0 ; THE FLOATING "
            "ICON QUICK CONTROLS (2026-11-18 directive, latest): the hover panel "
            "became an interactive control board — play/pause/resume/start, "
            "-1/+1/+5 min quick-adjust over the persisted phasePlannedMs tailored "
            "length (two honest clamps pinned in verifier section H: a subtraction "
            "never cuts below end-now, cap 4 h, planned-left = true focus time in "
            "every state), skip (honest: a skipped bell never counts), a hover "
            "bridge so the panel stays open from the icon onto the buttons, "
            "keyboard focus moves through the controls; hub dial + 'tailor this "
            "phase' cluster parity; e2e-floating-pomodoro 71/71; "
            "verify-focus-planner 114/0")
assert raw.count(OLD_TAIL) == 1, f"shipped tail not found once ({raw.count(OLD_TAIL)})"
raw = raw.replace(OLD_TAIL, NEW_TAIL)

OLD_GATES = ("gates\": \"verify-focus-planner 69/0; tsc 0; eslint 0; routes 200; "
             "e2e-focus-planner 40/40;")
NEW_GATES = ("gates\": \"verify-focus-planner 114/0 (18 section-H quick-adjust "
             "pins added BEFORE the UI); tsc 0; eslint 0 (5 pre-existing "
             "warnings); routes 200; e2e-floating-pomodoro 71/71 (39 + the "
             "quick-controls, idle, keyboard-into-controls, mobile/dark "
             "open-panel checks); e2e-focus-planner 40/40;")
assert raw.count(OLD_GATES) == 1, f"gates not found once ({raw.count(OLD_GATES)})"
raw = raw.replace(OLD_GATES, NEW_GATES)

json.loads(raw)  # still valid JSON
with open('docs/project/PROGRESS.json', 'w') as f:
    f.write(raw)

# ---------------------------------------------------------- RESUME POINTER --
with open('docs/project/RESUME_POINTER.json') as f:
    p = json.load(f)

OLD_HEAD = (" FEATURE-EXTRA SHIPPED (owner chat directive 2026-11-18, latest): "
            "the FLOATING POMODORO ICON")
NEW_HEAD = (" FEATURE-EXTRA SHIPPED (owner chat directive 2026-11-18, latest): "
             "THE FLOATING ICON'S QUICK CONTROLS — the hover panel is now an "
             "interactive control board (play/pause/resume/start; -1/+1/+5 min "
             "quick-adjust over the persisted phasePlannedMs tailored length, "
             "two honest clamps — never below end-now, cap 4 h, planned-left = "
             "true focus time — pinned in verifier section H BEFORE any UI; "
             "skip, honest: a skipped bell never counts; hover bridge + "
             "keyboard-into-controls); hub dial + tailor-cluster parity; "
             "verify-focus-planner 114/0 + e2e-floating-pomodoro 71/71 + "
             "e2e-focus-planner 40/40 GREEN; VLM mobile/dark PASS, the desktop "
             "'broken wrap' FAIL dismissed by two zoomed re-audits "
             "(TRANSCRIPTION OK). PREVIOUS FEATURE-EXTRA SHIPPED (owner chat "
             "directive 2026-11-18, later): the FLOATING POMODORO ICON")
na = p['nextAction']
assert na.startswith(OLD_HEAD), "nextAction head drifted"
p['nextAction'] = NEW_HEAD + na[len(OLD_HEAD):]
# the four unpushed commits note rides the old text; make the count honest:
p['nextAction'] = p['nextAction'].replace(
    "The earlier unpushed commit 035745d (Revision Hub Progress tab) plus this ship both ride the next PAT-bearing push",
    "The four unpushed commits (Progress tab, Focus Hub, floating icon, quick controls) all ride the next PAT-bearing push")
p['updated'] = '2026-11-18'

with open('docs/project/RESUME_POINTER.json', 'w') as f:
    json.dump(p, f, indent=1, ensure_ascii=True)
    f.write('\n')

print("WORKLOG appended; PROGRESS extended; RESUME_POINTER updated.")
