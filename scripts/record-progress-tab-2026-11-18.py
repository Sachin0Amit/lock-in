#!/usr/bin/env python3
"""record-progress-tab-2026-11-18.py — bookkeeping for the owner chat
directive shipped 2026-11-18 (the Revision Hub Progress tab + study progress
engine): the WORKLOG entry at the top, the RESUME_POINTER directive key, and
the PROGRESS.json directive record — run 111's authoring cadence untouched."""
import json

ROOT = '/home/z/my-project'

# ---- WORKLOG.md entry at the very top (newest-first file) ----
entry = (
    '## 2026-11-18 — OWNER CHAT DIRECTIVE (not a numbered run): THE REVISION HUB '
    'PROGRESS TAB + THE STUDY PROGRESS ENGINE — "analysis of what topic I have '
    'studied, which book I have completed, how many questions I have understood… '
    'an engine should analyse which topic I have studied least or revised least, '
    'tell me to revise it again, practice few questions on it"\n\n'
    '**The pull-first amendment honored first:** anonymous ls-remote found remote '
    'main at db55192 (the sibling audit-bot\'s ans-linear-diophantine fire) vs '
    'local 168655a — an anonymous HTTPS fetch (the repo reads anonymously; SSH '
    'origin untouched) proved local strictly BEHIND with a clean tree, so '
    'FIRST-SHIPPED-STANDS held with a simple hard reset to db55192, zero '
    'divergence, zero strays.\n\n'
    '**What the owner got — a fourth tab "Progress" in the Revision Hub (the '
    'second tab position, Overview stays the landing):**\n\n'
    '- **Your study progress** (the hero): topics studied (chapters + sections), '
    'books completed / in progress / started, **questions understood — '
    'X/Y with accuracy %** — an honest quiz census, chapters covered, words '
    'studied with first-read minutes, total revision passes with the per-topic '
    'average.\n'
    '- **What the engine recommends:** priority-ranked, explainable verdicts — '
    'R1 never-revised (studied once, N days ago) · R2 least-revised stale · R3 '
    'weak mastery (< 40) → "revise, then answer a few questions on it" · R4 quiz '
    'accuracy < 60% on a chapter → "practice a few questions" · R5 unfinished '
    'chapters (k of n sections) · R6 stalled books (14+ days quiet) → continue '
    'at the next chapter · R7 the next untouched chapter of an active book. '
    'Every verdict links to its topic AND, when practice applies, deep-links '
    '`/practice?book=` which now opens the Adaptive Drill tab pre-scoped to '
    'that book (max 12 recs, max 2 per book so the engine stays varied).\n'
    '- **Your studied topics — the stored list:** every chapter/section mark '
    'with its **revision count (revised N×)**, last touched, next-due badge, '
    'mastery bar, and one-click Revise / Open / Undo — clicking the topic goes '
    'straight to it, exactly the owner\'s "from here I should click the topic '
    'and go on the topic which I want to revise".\n'
    '- **Progress by book:** completion status badges (Completed / In progress '
    '/ Started / Untouched — a book with lesson marks but no covered chapter is '
    'honestly "started", never "untouched"), chapter + section coverage bars, '
    'per-book quiz score, avg mastery, passes, continue-at-chapter-N links, '
    'with All / Studied / Completed / Untouched filters and a show-all '
    'expansion.\n'
    '- **Mark topics as studied — the in-hub picker:** the library tree '
    'served from `/api/library/tree` (book select → chapter rows with '
    'QuickMark + per-section marks; planned chapters labelled honestly with '
    'their planned-section count, never silently markable). This is the '
    'owner\'s "I mark them, then it stores list down here in the progress" — '
    'the same ONE study ledger every surface writes.\n'
    '- **How the engine analyses you:** the standing explainer (book '
    'completion rules, the quiz census, the recommendation priority order).\n\n'
    '**The data plumbing that made "questions understood" honest:** '
    '`StudyEvent.quizScore/quizTotal` (nullable, additive `prisma db push`) — '
    'reader quizzes (`logQuiz`) and practice-drill submits now carry the RAW '
    'score/total; legacy rows without raw counts are estimated from their '
    'quality ratio against the lesson\'s real quiz-question census and shown '
    'separately ("N older quizzes are estimated from their ratings"). The mark '
    'contract validates 0 ≤ score ≤ total ≤ 500 and rejects score/total on '
    'non-quiz actions (E2E-pinned 400s). The catalog record gained '
    '`quizQuestions` per lesson (147 written lessons × exactly 5 questions = '
    '735 offered — pinned).\n\n'
    '**VERIFY-FIRST honored:** `scripts/verify-revision-progress.ts` written '
    'and run GREEN **before** any UI — 81/0 pins: the book-status thresholds '
    '(incl. the bug it caught: 0-chapter books classified "started" — fixed to '
    'lessons-aware "untouched"/"started"), quizEventParts exact-vs-legacy '
    'arithmetic, coverage dedup (chapter words/readMins subsume their lessons; '
    'orphan lessons add their own), per-book rows, and all seven recommendation '
    'rules with priorities, order and the per-book quota — three real engine '
    'defects and three test-arithmetic slips caught pre-UI.\n\n'
    '**Gates:** tsc 0 project-wide; eslint 0 on every changed file (the two '
    'set-state-in-effect hits resolved by the house `useSearchParams` + '
    'page-level Suspense pattern); `lib:pack` + `lib:check` PASS (the DB '
    'repacked v2 — the sibling\'s +567-word enrichment had left it stale; '
    '739,099 words now on both sides); routes 200 (home / revision / book / '
    'practice + the two APIs); **E2E `e2e-revision-progress.sh` 39/39 GREEN** '
    '(mark-from-picker → stored list with revised 1× → Revise button → 2× → '
    'backdated weak-mastery → engine revise rec with Log revision + Practice '
    'link → exact 4/5 + legacy 1/5 quiz census shows 5/10 · 50% accuracy → '
    'score>total and non-quiz score rejected 400 → deep link opens the drill '
    'tab pre-selected → 390px zero overflow → dark renders → zero console '
    'errors); **the standing `e2e-revision-hub.sh` regression 50/50 GREEN** '
    '(one pre-existing flake honestly fixed: its bare `indexOf(\'sync\')` '
    'assertion matched the word "async" inside dev-mode RSC flight-payload '
    'serialization — tightened to the phrases the hint actually uses); VLM '
    'audit of light/dark/mobile screenshots PASS (tiles aligned, nothing '
    'clipped, dark contrast legible, 390px wraps cleanly — the TabsList gained '
    'the house flex-wrap pattern for the now-four tabs).\n\n'
    '**Files:** `prisma/schema.prisma` (+2 nullable columns), '
    '`src/lib/revision/progress-engine.ts` (the pure engine — deterministic, '
    'no randomness, thresholds exported and tested), '
    '`src/lib/revision/progress-service.ts`, '
    '`src/app/api/revision/progress/route.ts`, '
    '`src/components/revision/progress-tab.tsx`, the hub/practice wiring '
    '(revision-hub.tsx four tabs, drill-tab + practice-hub deep link, '
    '/practice Suspense), the catalog `quizQuestions` field, the mark-plumbing '
    '(types/ledger-service/use-ledger-sync/practice-service), '
    '`scripts/verify-revision-progress.ts` + `scripts/e2e-revision-progress.sh` '
    '(both whitelisted), `scripts/record-progress-tab-2026-11-18.py` (this '
    'bookkeeping).\n\n'
    '**Authoring cadence UNCHANGED — run 111 opens AA ch. 4 lesson 4.1 '
    '(AM-GM) exactly as the run-110 pointer set it.** Push DEFERRED per the '
    'standing protocol (no PAT in this turn\'s payload; the anonymous '
    'ls-remote is the authority on the remote tip).\n\n'
    '---\n\n'
)

with open(f'{ROOT}/docs/project/WORKLOG.md') as f:
    wl = f.read()

anchor = '## 2026-11-18 — RUN 110:'
assert wl.startswith(anchor), f'WORKLOG top entry changed — insert point drifted: {wl[:60]!r}'
wl = entry + wl

with open(f'{ROOT}/docs/project/WORKLOG.md', 'w') as f:
    f.write(wl)
print('WORKLOG.md entry inserted at the top (above the run-110 entry)')

# ---- RESUME_POINTER.json directive key ----
with open(f'{ROOT}/docs/project/RESUME_POINTER.json') as f:
    ptr = json.load(f)

ptr['progressTabExtras'] = {
    'directive': (
        'owner chat 2026-11-18: Revision Hub progress analysis — what topic '
        'studied, which book completed, how many questions understood; mark '
        'topics in the hub and see them stored with revision counts; click a '
        'topic to revise it; an engine that names the least-studied/least-revised '
        'topic and says revise it again, practice few questions on it'
    ),
    'change': (
        'the Progress tab (4 tabs now) + the pure progress engine + '
        '/api/revision/progress + StudyEvent.quizScore/quizTotal (raw quiz '
        'counts now ride the mark contract; legacy rows estimated honestly) + '
        'catalog quizQuestions + /practice?book= deep link'
    ),
    'verified': (
        'verify-revision-progress.ts 81/0 (VERIFY-FIRST, pre-UI); tsc 0; eslint 0; '
        'lib:pack v2 + lib:check PASS; e2e-revision-progress.sh 39/39; standing '
        'e2e-revision-hub.sh 50/50 (one pre-existing dev-mode assertion flake '
        "fixed — bare indexOf('sync') matched 'async' in RSC payload text); VLM "
        'light/dark/mobile PASS'
    ),
    'push': 'DEFERRED — no PAT in the owner chat payload (standing protocol)',
}
ptr['updated'] = '2026-11-18'

with open(f'{ROOT}/docs/project/RESUME_POINTER.json', 'w') as f:
    json.dump(ptr, f, indent=1, ensure_ascii=False)
    f.write('\n')
print('RESUME_POINTER.json progressTabExtras recorded (run 111 nextAction untouched)')

# ---- PROGRESS.json directive record ----
with open(f'{ROOT}/docs/project/PROGRESS.json') as f:
    prog = json.load(f)

prog['progressTabDirective20261118'] = {
    'directive': (
        'owner chat: Revision Hub — progress analysis of studied topics, '
        'completed books, questions understood; in-hub marking stored with '
        'revision counts; click-through to revise; recommendation engine'
    ),
    'shipped': (
        'Progress tab (hero census / engine recommendations / stored topic '
        'list / book standing with filters / in-hub marking picker), pure '
        'progress-engine.ts, GET /api/revision/progress, quizScore/quizTotal '
        'contract + catalog quizQuestions, /practice?book= deep link'
    ),
    'gates': (
        'verify-revision-progress 81/0 pre-UI; tsc/eslint clean; lib:pack v2 '
        'PASS; e2e-revision-progress 39/39; e2e-revision-hub regression 50/50; '
        'VLM light/dark/mobile PASS'
    ),
    'cadence': 'run 111 (AA 4.1 AM-GM) opens exactly as the run-110 pointer set it',
}
prog['updated'] = '2026-11-18'

with open(f'{ROOT}/docs/project/PROGRESS.json', 'w') as f:
    json.dump(prog, f, indent=1, ensure_ascii=False)
    f.write('\n')
print('PROGRESS.json progressTabDirective20261118 recorded')

print('bookkeeping complete — ship commit next')
