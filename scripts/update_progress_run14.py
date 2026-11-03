#!/usr/bin/env python3
"""update_progress_run14.py — record run 14 (Cengage book-style theory) in
PROGRESS.json + RESUME_POINTER.json. Idempotent per-run one-shot."""
import json

P = '/home/z/my-project/docs/project/PROGRESS.json'
R = '/home/z/my-project/docs/project/RESUME_POINTER.json'

# ---------------- PROGRESS.json ----------------
p = json.load(open(P))
p['updated'] = '2026-11-03'
p['phase'] = (
    "CENGAGE BOOK-STYLE THEORY LIVE (owner chat directive, run 14): reader reskinned print-style "
    "after studying the Drive MATHS M1–M5 Cengage JEE modules — ink-green ALL-CAPS section heads over rules, "
    "worked examples as ILLUSTRATION pills + sage problem bands + Sol. solutions, green exercise/quiz banner bars "
    "with hairline-separated print question rows, callouts as printed note boxes (Note/Caution/Definition/Theorem/"
    "Historical note/Exam corner), list marker 'roman' for (i)(ii)(iii) example runs, green chapter-opener lesson "
    "headers; applies to ALL 14 existing lessons via the renderer · BOOK_FORMAT house-style contract updated — "
    "new lessons authored in the Cengage voice · worked-solution steps format (run 13) · UNIT 4 OPEN: FM ch. 4 "
    "'Fractions' at 1/5 — lesson 4.1 shipped (run 12) · reader widened + permalink chip removed (run 12) · "
    "detailed-logging era maintained"
)
p['awaiting'] = (
    "FM lesson 4.2 'Equivalent Fractions and Simplification' next — AUTHORED IN THE CENGAGE VOICE per BOOK_FORMAT "
    "(formal definition sentences + symbolic 'Thus,' restatements, 'For example,' runs as roman-marker lists, "
    "illustration titles as crisp problem statements, worked-step solutions with boxed answers). Ties to honour from "
    "4.1: the cross-multiplication licence proof debt (a/b < c/d ⟺ ad < bc), the 3/4 = 12/16 equivalence teaser, and "
    "HCF simplification from ch. 3 — hourly cadence runs the cycle"
)
features = p['platform']['features']
# refresh the reader-exercises line and add the Cengage furniture line
new_feats = []
for f in features:
    if f.startswith('reader: scrollspy'):
        new_feats.append(f)
    else:
        new_feats.append(f)
new_feats.insert(
    0,
    'reader: Cengage print-style furniture (owner directive run 14) — ink-green caps section heads over rules, '
    'ILLUSTRATION pills + sage bands + Sol. steps, green exercise/quiz bars with hairline print question rows, '
    'note-box callouts, roman (i)(ii)(iii) lists, sage table headers, green chapter-opener lesson headers',
)
p['platform']['features'] = new_feats
p['platform']['verified'] = [
    (
        "cengage book-style theory (owner chat directive, run 14): style grounded by downloading + OCR/vision-studying "
        "Cengage M2/01 Set Theory & Real Number System from the Drive MATHS folder (35 pp; working copy deleted after "
        "verification); reader reskinned — E2E on 1.1/2.5/3.2/4.1: h2 computed uppercase + 2px green rule + ink-green, "
        "illustrations render as pill + sage band + Sol. + numbered steps (1/5, 2/11, 2/8, 2/8), note-box labels correct "
        "(Note/Caution/Definition/Theorem/Historical note/Exam corner), exercises + quiz bars solid green, hairline "
        "question rows, KaTeX 54/113/257/221 nodes, dollarInSvg = 0, quiz scored live + retake, solutions expand under "
        "Sol. pills, mobile 390px exact-fit (docScrollW = 390); SVG overlap audit 0 issues (1.1/3.2/4.1); lint + tsc "
        "clean; VLM visual fidelity 5.5 → 8.5/10 after exercise-row + green-header fixes; MATHS subfolder surveyed "
        "(5 modules, 42 chapter PDFs, ids persisted in gitignored temporary-references/maths-*.json)"
    ),
] + p['platform']['verified']

# library notes: mention the style queue for existing lessons
notes = p['library']['books'][0]['notes']
if 'Cengage' not in notes:
    p['library']['books'][0]['notes'] = (
        "STYLE: reader renders all lessons Cengage print-style (run 14); the 14 existing lessons' prose VOICE polish "
        "(formal definition sentences, Thus-lines, roman example runs — 1.1 first as exemplar) is queued for later "
        "runs; lessons from 4.2 on are authored natively in the voice. " + notes
    )
json.dump(p, open(P, 'w'), indent=1, ensure_ascii=False)
print('PROGRESS.json updated')

# ---------------- RESUME_POINTER.json ----------------
r = json.load(open(R))
r['updated'] = '2026-11-03'
r['nextAction'] = (
    "NEXT LESSON: FM 4.2 'Equivalent Fractions and Simplification' — authored IN THE CENGAGE VOICE per the run-14 "
    "owner directive + BOOK_FORMAT house style (theory presentation of the Drive MATHS M1–M5 Cengage modules: formal "
    "definition sentences 'X is said to be … if …' + symbolic 'Thus,' restatement lines, 'For example,' runs as "
    "list marker 'roman' items (i)(ii)(iii), example blocks = ILLUSTRATIONS with crisp problem-statement titles + "
    "Sol. worked steps, properties as bullet lists, insight callouts as short Note boxes; the print LOOK is already "
    "automatic in the renderer — green caps heads, pills, bands, bars). "
    + r['nextAction']
)
r['run14Extras'] = (
    "Run 14 was an OWNER CHAT DIRECTIVE ('i want theory in such a way or style of book … my book to look like in "
    "cengage book you can download it from the google drive link'): (1) MATHS Drive subfolder surveyed — 5 module "
    "folders M1 Trigonometry / M2 Algebra / M3 Coordinate Geometry / M4 Calculus / M5 3D Geometry, 42 chapter PDFs, "
    "machine listings persisted at temporary-references/maths-*.json (gitignored; re-list via "
    "scripts/list_drive_folder.ts <id>); (2) Cengage M2/01 Set Theory & Real Number System downloaded "
    "(scripts/download_drive_file.sh, 24 MB) and style-studied (OCR + VLM on rendered pages) — signatures: ALL-CAPS "
    "green heads over rules, definitions in prose + Thus-lines, (i)(ii)(iii) example runs, ILLUSTRATION pills + sage "
    "bands + Sol., green exercise banner bars, sage table headers; NO content reproduced, working copy deleted after "
    "E2E; (3) reader reskinned platform-wide (globals.css book palette + .lesson-h2 Cengage heads + .roman-list; "
    "blocks.tsx ExampleBlock/DerivationBlock/FormulaBlock/AlgorithmBlock/QuizBlock/ExercisesBlock/SolutionBody/"
    "CalloutBlock + table striping + illustration auto-numbering; lesson-view.tsx green chapter-opener header; "
    "reading-progress.tsx green) — all 14 lessons restyled at once with zero content edits; (4) types.ts list block "
    "gained marker?: 'disc' | 'decimal' | 'roman'; (5) BOOK_FORMAT.md block table + 'Cengage theory presentation' "
    "house-style section, MASTER_PLAN §5 bullet, PROGRESS phase/features/verified, SOURCE_LOG style-reference entry, "
    "WORK_INVENTORY regenerated; (6) VOICE QUEUE: 4.2+ authored natively in the voice; existing 14 lessons queued for "
    "voice polish (1.1 first as the exemplar) — do them one lesson per run alongside or after unit-4 progression, "
    "never batch-draft. Gates: lint/tsc clean, routes 200, E2E green incl. mobile 390 exact-fit, SVG audit 0 issues, "
    "VLM fidelity 8.5/10."
)
r['lastCompleted'] = [
    "2026-11-03 (owner chat directive run 14): CENGAGE BOOK-STYLE THEORY shipped platform-wide: style grounded by "
    "studying Cengage M2/01 (Set Theory & Real Number System) from the Drive MATHS folder; reader reskinned "
    "(globals.css book-green/sage palette light+dark, .lesson-h2 ink-green caps over rule, .roman-list (i)(ii)(iii); "
    "blocks.tsx — examples → ILLUSTRATION n pills + sage bands + Sol. + numbered steps, callouts → note boxes with "
    "small-caps labels, quiz/exercises → solid green bars, exercise questions → hairline print rows with serif green "
    "Q-numbers, derivations/algorithms/formula cards/tables into the green family, list marker 'roman' added to "
    "types.ts; lesson-view.tsx chapter-opener header; reading-progress green). All 14 lessons restyled at once, zero "
    "content-file edits. Logs updated (BOOK_FORMAT house-style section + block table, MASTER_PLAN §5, PROGRESS, "
    "RESUME_POINTER, SOURCE_LOG, WORK_INVENTORY regen). Gates: lint+tsc clean; 6 routes 200; E2E on 1.1/2.5/3.2/4.1 "
    "(h2 computed uppercase/green/rule, illustrations 1–2 per lesson with Sol. pills, KaTeX 54/113/257/221, "
    "dollarInSvg=0, quiz scored live, solutions expand, 390px exact-fit); SVG audit 0 issues; VLM fidelity 8.5/10. "
    "Voice queue logged: 4.2+ authored natively in the Cengage voice; 1.1–4.1 voice polish queued."
] + r['lastCompleted']
json.dump(r, open(R, 'w'), indent=1, ensure_ascii=False)
print('RESUME_POINTER.json updated')
