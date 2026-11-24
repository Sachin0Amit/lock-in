# LOCKIN RUN PROTOCOL v9.0 — SWARM EDITION

**Status:** standing protocol for the ONE and ONLY hourly authoring job (fires every hour at :50 IST; the gateway honors at most ~3 executions/day; MISSED FIRES are expected and normal — state lives in the pointer files).
**Effective:** 2026-11-21, owner chat directive. **Lineage:** supersedes the v8.1 protocol text embedded in retired cron job 530330 (which superseded v7 529480, v6 8-slots 528979-528986, v5b). The v8.1 serialization backbone — step-0 pull-first, pointer files as truth, FIRST-SHIPPED-STANDS, time budget, gates, run-end PAT push — is KEPT unchanged; v9.0 amends the authoring model.
**v9.0 amendments (owner directive 2026-11-21, verbatim intents):**
1. *"use multiple agents or swarm of agents and write the lessons"* — every fire authors the two lessons via a multi-agent swarm (supersedes the v8.1 strictly-sequential/never-parallel rule WITHIN a fire).
2. *"if required, add images, hand-drawn images or any type of images in the solutions also or SVGs in the solution of the exercises also, if you think it is needed for better understanding"* — figures are now required INSIDE exercise solutions whenever they aid understanding.
3. *"you can use the book's theory also if needed … scan the pages of the books or downloads from the internet for help and use vision model to extract image, graph or anything or practice question"* — book-theory use with VISION extraction is sanctioned and codified (step 2b).
4. *"at the task is finished at last it pushes the things to my GitHub repo"* — the run-end push is re-confirmed (standing since 2026-11-03).

The PAT (repo-scoped, contents:write; validated 2026-11-11, re-confirmed 2026-11-21) is embedded ONLY in the cron job payload — it is NEVER written to this file, any repo file, config, log or commit.

---

## PRECEDENCE RULE

The pointer files (`docs/project/RESUME_POINTER.json`, `PROGRESS.json`, `WORKLOG.md`) win on **WHAT** to write next (units, lessons, pins, banks). THIS protocol wins on **HOW** the run executes (swarm authoring, solution figures, book-theory vision extraction, push protocol). Where an older pointer `nextAction` says "STRICTLY SEQUENTIALLY", treat it as v8.1 legacy text superseded by this protocol; when step (6) updates RESUME_POINTER.json, refresh the nextAction wording so it no longer carries the legacy sequencing instruction (write e.g. "as a swarm per docs/project/RUN_PROTOCOL.md").

## STEP 0 — PULL FROM GITHUB FIRST, BEFORE ANYTHING ELSE

Owner directive 2026-11-14, verbatim: *"in the authoring corn job add first step as pull from github for any changes made by other agents"*. One-time-URL pushes never update `origin/main`, so the tracking ref is ALWAYS stale — the REMOTE serializes.

- **(a)** Anonymous, no token: `git -C /home/z/my-project ls-remote https://github.com/Sachin0Amit/lock-in.git refs/heads/main`.
- **(b)** remote sha == local HEAD → synced → go to (0b).
- **(c)** sha differs → fetch with the step-(7) one-time PAT URL discipline (PAT only inside that single command's URL): `git -C /home/z/my-project fetch "https://Sachin0Amit:THE_PAT@github.com/Sachin0Amit/lock-in.git" main:refs/remotes/origin/main` (substitute THE_PAT literally from the cron payload). Then reconcile local HEAD vs `refs/remotes/origin/main` (`git merge-base --is-ancestor`):
  - **(i) local BEHIND** (remote descends from local HEAD) → copy dirty tracked files to `/tmp/strays-backup` first (untracked files survive resets), `git -C /home/z/my-project reset --hard refs/remotes/origin/main`, re-derive still-needed strays on the fetched state.
  - **(ii) remote BEHIND** (fetched sha is an ancestor of local HEAD) → nothing to pull; unpushed commits push at step (7).
  - **(iii) DIVERGED** (a sibling shipped parallel work) → **FIRST-SHIPPED-STANDS**: the remote line is the truth; back up strays, `git -C /home/z/my-project reset --hard refs/remotes/origin/main` (never force-push; never revert the sibling's files; redundant commits discarded, novel work re-derived on top, reflog is the safety net), restore strays.
  - In (i)/(iii): record the pull/reset in WORKLOG.md (no token) and RE-READ the pointer files from the FETCHED state — plan THIS run only from the post-pull files, never stale memory.

## STEP 0b — TREE CHECK

`git -C /home/z/my-project status --porcelain`: if dirty with a half-finished lesson, FINISH it first (counts toward the quota); if dirty with junk, check the WORKLOG.md tail before acting.

## STEP 1 — STATE

Read `docs/project/RESUME_POINTER.json`, `PROGRESS.json` and `WORKLOG.md` FIRST — they define the current unit, next lessons and standing rules; also read `docs/project/TOC_LESSON_GUIDE.md` + `TOC_FOLD_LEDGER.json` (hosted folds are obligations) and `BOOK_FORMAT.md`. Read THIS file every fire.

## STEP 2 — RESEARCH (book theory sanctioned; vision extraction)

- **(a)** Consult the chapter's master plan in `docs/research/` (if one exists) and the already-downloaded material in `temporary-references/`.
- **(b)** If the needed pages are not yet transcribed: try `pdftotext` first (when a text layer exists); for scans render with `pdftoppm` (~100 DPI JPEG) and transcribe via the vision model (z-ai vision CLI, 4–6 pages/call), or download the unit reference from the Drive (ids in `docs/research/DRIVE_TOC_SURVEY.md` + `scripts/download_drive_file.sh`).
- **(b2) VISION EXTRACTION (v9.0):** when figures, graphs, geometric constructions, worked-example structures or practice-question archetypes from the book would improve the lesson or its exercises, scan the book's pages (render with pdftoppm) or download pages from the internet, run the vision model over the page images (z-ai vision CLI, 4–6 pages/call) and EXTRACT them — figure structure (axes, curves, labelled points, construction lines), graph properties, worked-example patterns and practice-question archetypes — then re-create anything worth using as OUR OWN original content in the site's design system. Never paste raw book scans into the repo. Study-never-reproduce stays absolute: references inform and verify concepts; every roster, number, figure and exercise we ship is OUR OWN; never reproduce protected expression.
- **(c)** Supplement with internet research (WebSearch/WebFetch: official syllabi, NCERT, canonical arcs — the sanctioned fallback).
- **(d)** Log every source URL/page in `SOURCE_LOG.md` (download ledger; delete working copies only at UNIT completion).

## STEP 3 — VERIFY-FIRST

BEFORE any prose, grow the chapter's verifier (one per book, e.g. `scripts/verify-book4-ch07.ts` — append a section per lesson pair) and pin EVERY number that will be written (rosters, witness pairs, counts, range folds, quiz keys, exercise answers — brute-force the small cases); run it green first.

## STEP 3b — SWARM SPEC

After research + verifier pinning, write a fully self-contained SPEC per swarm task (lesson outline with pinned numbers, source extracts, figure plan including any planned solution figures, BOOK_FORMAT excerpt, exact output file path) — the spec is all a subagent ever sees.

## STEP 4 — AUTHOR THE CHAPTER AS A SWARM (v9.0, whole-chapter amendment 2026-11-24)

Launch multiple authoring agents in one message, ONE DISTINCT deliverable per agent — **every remaining unwritten lesson of the pointer's current chapter as a separate authoring subagent (one agent per lesson), PLUS one agent for the unit review, so the chapter is closed COMPLETE in the single run** (verifier-section writing may also be delegated) — **NEVER two writers on the same file or the same lesson**. Subagents do NOT see this protocol, the repo or each other: give each its self-contained spec prompt and require the returned file paths + a content summary. YOU are the orchestrator: re-read every returned file, reconcile against the verifier, fix integration seams, and own quality end-to-end. **Never start a NEW chapter in the same run** — if the pointer's chapter is already closed, a fire that arrives with no in-flight chapter performs the pointer's bookkeeping and defers to the next named chapter. Across fires the serialization is unchanged: pull-first, pointer files, FIRST-SHIPPED-STANDS on any sibling collision.

*Lineage:* the 2026-11-21 v9.0 amendment authored lessons A and B (two per fire); the owner directive 2026-11-24 — *"continue and make the scheduled task such that it writes one complete chapter of a book by launching multiple agents not just 2 lessons"* — raised the cadence to the whole chapter per fire (the run-119 whole-unit precedent, made standing). The maths cron job was recreated to carry this wording (job 540785 → 545445, same :50 IST schedule, priority 10).

## STEP 5 — GATES (per lesson; orchestrator runs them all after integration)

`bun run lint`; `tsc --noEmit`; the chapter verifier green; dev server routes 200 (restart `setsid nohup bun run dev > dev.log 2>&1 &` if recycled; check dev.log); browser E2E on the new lesson (KaTeX renders, quiz 5/5 on intended keys, solutions expand, figures render, no console errors, no overflow at 390px AND 1280px, dark mode; write a `.page.js` per lesson on the `scripts/e2e-*.sh` pattern); VLM screenshots (lesson + figures, light + dark).

## STEP 5b — SOLUTION FIGURES (v9.0)

Wherever a diagram genuinely aids understanding, include figures INSIDE THE SOLUTIONS of the exercises as well as the lesson body — any type: precise computed SVG (preferred), hand-drawn-style figures, or clean generated images. The accuracy bar is `docs/project/FIGURE_VERIFICATION_PROTOCOL.md`: recompute every geometric value with code BEFORE drawing; true-to-scale geometry; design-system strokes/colors/fonts; accessible (aria-label or title/desc); dark-mode safe; no text overlap or clipping at 390px AND 1280px. Generated raster images must contain NO mathematical text, labels or formulas (image models garble text) — all precise labels, captions and numbers live in SVG/HTML/KaTeX beside the image, and each generated image is verified visually before shipping. Every solution figure carries an accurate caption and is referenced by the surrounding solution text; never decoration-only.

## STEP 6 — SHIP & LOG (once per run)

Update `WORKLOG.md`, `PROGRESS.json`, `RESUME_POINTER.json` (nextAction → the next chapter's whole-chapter swarm, wording refreshed per the PRECEDENCE RULE), `SOURCE_LOG.md`, regenerate `WORK_INVENTORY.json` (`bun run scripts/build_work_inventory.ts`; Drive survey rebuild first if `temporary-references/inventory.json` is missing) and update `DETAILED_LOG.md`.

## STEP 7 — COMMIT, THEN PUSH AT RUN END (owner directives 2026-11-03 + 2026-11-21)

Commit locally with a clear message, THEN PUSH — automated pushes are authorized and REQUIRED at every run end. Use the PAT embedded ONCE in the cron job payload (never in any file/config/log/message, never echoed or printed; no verbose/trace git flags; origin stays SSH):

- **(a)** Use it ONLY inside the one-time HTTPS URL of a single git command (step-(7) push or step-(0) fetch): `git -C /home/z/my-project push "https://Sachin0Amit:THE_PAT@github.com/Sachin0Amit/lock-in.git" HEAD:main` (substitute THE_PAT literally).
- **(b)** Push ALL unpushed local commits on main, not only this run's.
- **(c)** NEVER write the PAT to any file, .env, git config, remote URL, script, log, commit or message.
- **(d)** On push failure retry once, record in WORKLOG.md WITHOUT the token and end the run — never let push problems degrade the lesson work.
- **(e)** After a successful push verify with ls-remote (one-time URL form) and note the synced HEAD sha in WORKLOG.md.

## TIME BUDGET

The gateway caps a run at ~2 hours — if fewer than ~35 minutes remain, do NOT start the NEXT lesson: finish, fully gate, log and ship the completed lessons, note the deferral in WORKLOG.md, and END with the tree clean and no lesson in flight. (The whole-chapter amendment 2026-11-24 keeps this law: a chapter that cannot honestly close inside the cap ships its completed lessons and the remainder rides the next fire — never thinned, never half-gated.)

## SIBLING JOBS

The visual-upgrade/figure-audit jobs may be disabled; if the lock `docs/project/.figure_upgrade_lock` is fresh (<45 min) or its figure changes sit uncommitted, wait up to 10 min then proceed; if stale, delete the lock, never revert its files, and `git add` your chapter files explicitly, never `git add -A`. As of 2026-11-21 all sibling jobs are disabled by API — the authoring job is the only live job and owns the run-end push.

## THE TWO AUTHORING LANES (owner directive 2026-11-21: "every thing same but do authoring for computer science book create a corn job keep the old one and create new one just for cs")

There are now TWO scheduled authoring jobs, one per shelf lane, both governed by THIS protocol (the HOW) and each by its own pointer (the WHAT):

- **the maths job** (the original hourly job, firing at :50 IST) — its WHAT lives in `docs/project/RESUME_POINTER.json`; it owns the Mathematics-shelf books it has been authoring (currently Advanced Algebra).
- **the cs job** (created by the owner directive, firing at :20 IST) — its WHAT lives in `docs/project/CS_AUTHORING_POINTER.json`; it authors the Computer Science shelf (44 planned books, registry order, `computer-fundamentals` first).

Rules both lanes share, verbatim from this protocol: swarm authoring with the whole-chapter cadence (ONE COMPLETE chapter per fire — every remaining lesson + the unit review, one agent per lesson; the 2026-11-24 owner directive), verify-first engines before prose, solution figures inside exercises, book-theory vision extraction, step-0 pull-first, FIRST-SHIPPED-STANDS on any collision, the time budget, and the run-end PAT push. The shared ledgers (WORKLOG/PROGRESS/SOURCE_LOG/DETAILED_LOG/WORK_INVENTORY) are APPENDED by both lanes — never forked. A lane never touches the other lane's in-flight lesson files; the pointer files decide which lane a fire serves (the payload's lane label decides when both somehow fire together).

## STANDING RULES

No streak/gamification; original content only; lesson ids stable forever; one unit of one subject at a time; completeness > speed, accuracy > volume, never fabricate (label exam-style items honestly); if blocked (sandbox reset, server down): retry once, log in WORKLOG.md, stop — the next fire resumes.

## CURRENT STATE SNAPSHOT (2026-11-24, whole-chapter cadence adopted)

The pointer files are the live truth — READ RESUME_POINTER.json FIRST. Repo synced at `e0040ef` after run 120 (AA ch.9 opened: 9.1 + 9.2 shipped by the two-agent swarm; the maths cron job recreated as 545445 carrying the whole-chapter cadence). NEXT per the standing pointer: run 121 closes AA ch.9 'Exponentials and Logarithms' WHOLE — 9.3 'The Laws of Logarithms and the Change of Base' (TWO hosted folds) + 9.4 'Logarithmic and Exponential Equations' + 9.5 'Exponential and Logarithmic Series' (ground: H&K Higher Algebra ch. XVII, Drive id `180ekbSviR32yYFZxH1kialElz_8yEzfD`, text layer) + 9.6 'Logarithm Tables: Characteristic, Mantissa and Antilogarithm' (the antilog fold) + the 9.R unit review — five agents, one per lesson, chapter closed COMPLETE. Treat older arithmetic as history.
