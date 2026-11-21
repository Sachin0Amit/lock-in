# CS Authoring Runbook — v9.0 SWARM (Computer Science shelf)

> **Read this entire file before doing anything.** You are an autonomous
> CS authoring swarm bot that runs on a schedule. You do not see any prior
> conversation. Everything you need is in this file, the files it points to,
> and the PAT embedded in the cron payload that fired you.
>
> **Owner directive (2026-11-21, verbatim intent):** *"every thing same but
> do authoring for computer science book create a corn job"* — this runbook
> is the CS-focused twin of the mathematics authoring job, following the
> same v9.0 SWARM protocol at `docs/project/RUN_PROTOCOL.md` but authoring
> the Computer Science shelf instead of whatever `RESUME_POINTER.json` says.

## Your job, in one sentence

Pull the latest `lock-in` repo, pick the next PLANNED-but-unwritten CS lesson
in the rotation, author it as a multi-agent swarm (one distinct deliverable
per agent, you are the orchestrator who integrates/gates/ships), update the
project docs, commit explicitly, and push using the PAT embedded in the cron
payload via a one-time HTTPS URL.

You are a **CS authoring job** cooperating with a **mathematics authoring job**
(that reads `RESUME_POINTER.json`) and a **figure-audit job** (that enriches
existing lessons). Always pull first, always push last, never `git add -A`,
never touch the mathematics job's pointer files.

---

## The PAT (embedded in the cron payload, NEVER in this file)

The GitHub PAT is embedded ONCE in the cron job payload that fired you. It
is `PAT=<value>` on a dedicated line. You use it ONLY inside the one-time
HTTPS URL of a single git fetch or push command:

```
git -C /home/z/my-project/lock-in fetch "https://Sachin0Amit:THE_PAT@github.com/Sachin0Amit/lock-in.git" main:refs/remotes/origin/main
git -C /home/z/my-project/lock-in push  "https://Sachin0Amit:THE_PAT@github.com/Sachin0Amit/lock-in.git" HEAD:main
```

Substitute `THE_PAT` literally from the `PAT=` line in the cron payload.
**NEVER** write the PAT to any file, .env, git config, remote URL, script,
log, commit or message. **NEVER** echo or print it. No verbose/trace git
flags. Origin stays SSH. On push failure retry once, log WITHOUT the token,
end the run. After success verify with `ls-remote` (one-time URL form) and
note the synced HEAD sha in `WORKLOG.md`.

---

## STEP 0 — Pull from GitHub first (PAT embedded in cron payload)

One-time-URL pushes never update `origin/main`, so the tracking ref is ALWAYS
stale — the REMOTE serializes.

- **(a)** Anonymous, no token: `git -C /home/z/my-project ls-remote https://github.com/Sachin0Amit/lock-in.git refs/heads/main`.
- **(b)** remote sha == local HEAD → synced → go to STEP 1.
- **(c)** sha differs → fetch with the one-time PAT URL (substitute THE_PAT from the cron payload): `git -C /home/z/my-project/lock-in fetch "https://Sachin0Amit:THE_PAT@github.com/Sachin0Amit/lock-in.git" main:refs/remotes/origin/main`. Then reconcile:
  - **(i) local BEHIND** → back up dirty tracked files to `/tmp/strays-backup`, `git -C /home/z/my-project/lock-in reset --hard refs/remotes/origin/main`, re-derive strays.
  - **(ii) remote BEHIND** → nothing to pull; unpushed commits push at STEP 12.
  - **(iii) DIVERGED** (a sibling shipped parallel work) → **FIRST-SHIPPED-STANDS**: the remote line is truth; back up strays, `git reset --hard refs/remotes/origin/main` (never force-push; never revert sibling's files), restore strays.
  - In (i)/(iii): record the pull/reset in `WORKLOG.md` (no token) and RE-READ the pointer files from the fetched state.

## STEP 1 — Tree check

`git -C /home/z/my-project/lock-in status --porcelain`: if dirty with a
half-finished CS lesson, FINISH it first (counts toward the quota); if dirty
with junk, check `WORKLOG.md` tail before acting.

## STEP 2 — Read the v9.0 protocol + CS state

1. `cat docs/project/RUN_PROTOCOL.md` — the full v9.0 SWARM protocol (step-0
   pull-first, verify-first, swarm spec, swarm authoring, gates, solution
   figures, ship-and-log, commit+push, time budget, sibling-jobs) — and its
   THE TWO AUTHORING LANES section, which governs both lanes. Follow it
   for the HOW.
2. `cat docs/project/CS_AUTHORING_POINTER.json` — **the CS lane's WHAT-is-next
   pointer** (IN THE REPO, committed). The cron payload itself says: 'the CS
   lane's state lives in docs/project/CS_AUTHORING_POINTER.json - read it
   FIRST and follow it exactly; it supersedes this payload on WHAT is next;
   update it at every run end.' Read it first, follow it exactly, update it at
   every run end. (The earlier `.state/cs-authoring-state.json` outside the
   repo is RETIRED — superseded by the pointer, 2026-11-21 reconciliation.)

## STEP 3 — Pick the next CS lesson

**The POINTER decides WHAT is next** (`CS_AUTHORING_POINTER.json`'s
`nextAction`) — it may name one lesson, or a close-chapter pair (the last
lesson + the unit completion review in one run, per the standing cadence
used by the maths lane). Follow it exactly. Only when the pointer is silent
on a specific lesson does this fallback rotation apply:
Walk `shelfOrder` in order:
- For each `bookId`, read `src/data/library/books/computer-science/<bookId>/book.ts`.
- Flatten `chapters[].lessons[]` (written lessons have non-empty `blocks`).
- Find the first **PLANNED-but-unwritten** lesson (in `chapter.plannedLessons[]`
  but NOT yet in `chapter.lessons[]`) AFTER `lastAuthoredLessonId`.
- If `lastAuthoredLessonId` is null, start at `computer-fundamentals` ch.1
  lesson 1.

**Follow the pointer's cadence** (the pointer supersedes the older 'ONE
lesson per run' wording — the reconciliation note logged in WORKLOG 2026-11-21;
the time budget still governs: fewer than ~35 minutes left, no second lesson).
Never start a NEW chapter in the same run that closes another.

## STEP 4 — Research (book theory sanctioned; vision extraction)

- **(a)** Consult the chapter's master plan in `docs/research/` (if one exists
  for this CS book) and the already-downloaded material in `temporary-references/`.
- **(b)** If the needed pages are not yet transcribed: try `pdftotext` first;
  for scans render with `pdftoppm` (~100 DPI JPEG) and transcribe via the
  vision model (`z-ai vision` CLI, 4–6 pages/call), or download the unit
  reference from the Drive (ids in `docs/research/DRIVE_TOC_SURVEY.md` +
  `scripts/download_drive_file.sh`).
- **(b2) VISION EXTRACTION (v9.0):** when figures, graphs, worked-example
  structures or practice-question archetypes from the book would improve the
  lesson or its exercises, scan the book's pages, run the vision model over
  the page images, and EXTRACT them — then re-create anything worth using as
  OUR OWN original content. Never paste raw book scans. Study-never-reproduce.
- **(c)** Supplement with internet research (`WebSearch`/`WebFetch`: official
  syllabi, NCERT, canonical arcs).
- **(d)** Log every source URL/page in `docs/project/SOURCE_LOG.md`.

## STEP 5 — Verify-first

BEFORE any prose, grow the chapter's verifier (one per CS book, e.g.
`scripts/verify-cs-computer-fundamentals.ts` — append a section per lesson)
and pin EVERY number that will be written (rosters, witness pairs, counts,
quiz keys, exercise answers — brute-force the small cases). Run it green
first.

## STEP 6 — Swarm spec + author

Write a fully self-contained SPEC per swarm task (lesson outline with pinned
numbers, source extracts, figure plan, `BOOK_FORMAT` excerpt, exact output
file path). Launch multiple authoring agents in one message, ONE DISTINCT
deliverable each:
- Agent A: lesson body (para/heading/derivation/example/callout/terms)
- Agent B: exercises (L1–L6 ladder with full worked solutions) + solution figures
- Agent C: verifier section + quiz

NEVER two writers on the same file. Subagents do NOT see this runbook, the
repo, or each other — give each its self-contained spec. YOU are the
orchestrator: re-read every returned file, reconcile against the verifier,
fix integration seams, own quality end-to-end.

Match the **Cengage voice** — read an existing written mathematics lesson
first (e.g. `src/data/library/books/mathematics/arithmetic-number-systems/ch-05.ts`)
for the house style: para blocks (3–5 sentences), terms, equation/derivation,
example (with figures), callout (insight/warn/historical/exam), quiz (5 items),
exercises (L1–L6 ladder with full worked solutions), formula cards.

## STEP 7 — Gates (per lesson; orchestrator runs them all after integration)

`bun run lint`; `npx tsc --noEmit`; the chapter verifier green; dev server
routes 200 (restart `setsid nohup bun run dev > dev.log 2>&1 &` if recycled);
browser E2E on the new lesson (KaTeX renders, quiz 5/5 on intended keys,
solutions expand, figures render, no console errors, no overflow at 390px AND
1280px, dark mode; write a `.page.js` per lesson); VLM screenshots (lesson +
figures, light + dark).

If deps are not installed (`node_modules` missing), do the sanity-check
fallback: re-read every file you edited, confirm imports resolve, braces
balance, every block matches a `kind` in `types.ts`.

## STEP 8 — Solution figures (v9.0)

Wherever a diagram genuinely aids understanding, include figures INSIDE THE
SOLUTIONS of the exercises as well as the lesson body. Compute every
geometric value with code BEFORE drawing; true-to-scale geometry; design-system
strokes/colors/fonts; accessible (aria-label or title/desc); dark-mode safe;
no text overlap or clipping at 390px AND 1280px. Generated raster images must
contain NO mathematical text — all precise labels live in SVG/KaTeX beside
the image. Follow `docs/project/FIGURE_VERIFICATION_PROTOCOL.md` strictly.

## STEP 9 — Ship & log

Ship & log per `RUN_PROTOCOL.md` STEP 6, and update
`docs/project/CS_AUTHORING_POINTER.json` (nextAction + lastCompleted) at
every run end. The ledgers WORKLOG/PROGRESS/SOURCE_LOG/DETAILED_LOG/WORK_INVENTORY
are SHARED between the two lanes — append CS-run entries, never fork them.

| File | What to log |
|---|---|
| `docs/project/WORKLOG.md` | One summary entry: `<date> CS RUN n — <bookId>/<chapter>/<lesson>: <title> authored by <n>-agent swarm` |
| `docs/project/DETAILED_LOG.md` | Detailed change list: every file touched, every block added |
| `docs/project/SOURCE_LOG.md` | Provenance for any book-theory/vision-extraction source |
| `docs/project/PROGRESS.json` | Shared: update phase + awaiting (append CS-run state) |
| `docs/project/CS_AUTHORING_POINTER.json` | The CS lane's own pointer — nextAction + lastCompleted |
| `docs/project/WORK_INVENTORY.json` | Regenerate via `bun run scripts/build_work_inventory.ts` |

**DO NOT touch** (the maths lane's own pointer; the enhancement job's pointer;
the shared fold ledger — consult it for hosted-fold obligations, never rewrite):
- `docs/project/RESUME_POINTER.json`
- `docs/project/TOC_FOLD_LEDGER.json`
- `docs/project/ENHANCEMENT_POINTER.json`

(PROGRESS.json and WORK_INVENTORY.json are SHARED ledgers per the cron payload
and RUN_PROTOCOL.md's THE TWO AUTHORING LANES section — append CS-run entries,
never fork them; the 2026-11-21 reconciliation note is logged in WORKLOG.md.)

## STEP 10 — Stage explicitly (NEVER `git add -A`)

Check `docs/project/.figure_upgrade_lock` — if fresh (<45 min), stage only
your chapter files; if stale, delete the lock. Then:

```bash
git -C /home/z/my-project/lock-in add \
  src/data/library/books/computer-science/<bookId>/ch-NN.ts \
  scripts/verify-cs-<bookId>.ts \
  src/data/library/types.ts \
  src/components/library/blocks.tsx \
  docs/project/WORKLOG.md \
  docs/project/DETAILED_LOG.md \
  docs/project/SOURCE_LOG.md \
  docs/project/CS_AUTHORING_RUNBOOK.md \
  public/figures/<any-new-image>.png
# (only the paths you actually touched)
```

## STEP 11 — Commit + push (PAT embedded in cron payload)

```bash
# (a) Commit locally
git -C /home/z/my-project/lock-in commit -m "cs-author: <bookId> ch.<N> L<N> — <title>" -m "<body>"

# (b) Fetch latest (in case a sibling pushed during this run)
git -C /home/z/my-project/lock-in fetch "https://Sachin0Amit:THE_PAT@github.com/Sachin0Amit/lock-in.git" main:refs/remotes/origin/main

# (c) Rebase if non-fast-forward
git -C /home/z/my-project/lock-in rebase refs/remotes/origin/main

# (d) Push ALL unpushed commits on main
git -C /home/z/my-project/lock-in push "https://Sachin0Amit:THE_PAT@github.com/Sachin0Amit/lock-in.git" HEAD:main

# (e) Verify with ls-remote
git -C /home/z/my-project ls-remote "https://Sachin0Amit:THE_PAT@github.com/Sachin0Amit/lock-in.git" refs/heads/main
```

Substitute `THE_PAT` literally from the `PAT=` line in the cron payload.
NEVER write the PAT to any file/config/log/message. NEVER echo or print it.
No verbose/trace git flags. On push failure retry once, record in `WORKLOG.md`
WITHOUT the token, end the run. After success, note the synced HEAD sha in
`WORKLOG.md`.

## STEP 12 — Report

End your run with:
- book/chapter/lesson authored (bookId / chapter / lesson id),
- swarm agents used + their distinct deliverables,
- gates passed (or deferred with reason),
- docs updated (which files),
- commit hash + synced HEAD sha,
- what the next fire should pick up (next planned CS lesson).

---

## Hard constraints (NON-NEGOTIABLE)

- **Never** print, log, commit, or echo the PAT. Use it ONLY inside the
  one-time HTTPS URL of a single git command.
- **Never** write the PAT to any file, .env, git config, remote URL, script,
  log, commit or message.
- **Never** edit `/home/z/my-project/scripts/` (the `lock-in-pull.sh` /
  `lock-in-push.sh` / `audit-svg-overlaps.sh` scripts are read-only).
- **Never** force-push. If rebase fails, stop and report.
- **Never** `git add -A` — stage your files explicitly.
- **Never** revert or "clean up" a sibling job's uncommitted edits.
- **Never** rename existing lesson/chapter ids — they are stable forever.
- **Never** invent sources, exam questions, historical claims, or past-paper
  status. Label exam-style items honestly.
- **Never** author a whole new book — only author chapters/lessons within the
  44 planned CS books.
- **Never** touch `RESUME_POINTER.json` (the maths lane's own pointer — the
  540785 job reads it) or `ENHANCEMENT_POINTER.json`/`TOC_FOLD_LEDGER.json`
  (the enhancement job's / the shared fold ledger — consult, never rewrite).
  The ledgers named above stay SHARED and appended.
- **Always** match the existing Cengage voice — read an existing written
  mathematics lesson first.
- **Always** compute SVG coordinates from constants, never hand-place.
- **Always** VLM-audit any figure you add or edit.
- **Always** log to the docs (append-only, never rewrite).
- **Always** pull before authoring and push after.
- **Always** pin every number in the verifier BEFORE writing prose (verify-first).
- **Always** use the swarm pattern: multiple agents, one distinct deliverable
  each, you are the orchestrator.

---

## Time budget

The gateway caps a run at ~2 hours — if fewer than ~35 minutes remain, do
NOT start a second lesson: finish, fully gate, log and ship the completed
lesson, note the deferral in `WORKLOG.md`, and END with the tree clean and
no lesson in flight.
