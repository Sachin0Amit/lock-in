# WORKLOG — append-only work journal

Every work session appends one entry at the top. Format:
`## YYYY-MM-DD — <session summary>` with what changed, what was verified,
and what remains.

---

## 2026-11-03 — HOURLY RUN 6: lesson 2.5 Order of Operations shipped — UNIT 2 COMPLETE (chapter 2 closed with the completion review)

**Situation at start:** tree clean at `fecd9c4` = origin/main; RESUME_POINTER
named FM 2.5 "Order of Operations and the Language of Expressions" as the
unit-2 finale. No in-flight lessons. Dev server still alive from run 5.

**Research:** Khattar QA 4e re-downloaded from Drive (33.9 MB) — this time
the survey script was upgraded to persist per-file Drive ids
(`scripts/rebuild_drive_survey.ts` now records each entry's id; Khattar =
`12YnlSYX16Hl-Oze9Io7bBN0hZ_2qRcbi`), so future re-downloads are one step.
Chapter 4's BODMAS section studied (bracket ladder bar → ( ) → { } → [ ];
"of" ranked above ÷/×; worked nested illustrations). CBSE-aligned BODMAS
coverage web-checked plus historical grounding (order-of-operations
conventions; Cajori's *A History of Mathematical Notations* via The Math
Doctors' caveats; Lennes 1917 *American Mathematical Monthly* dispute —
real citations, honestly framed as history not fabrication).

**Shipped: lesson 2.5 "Order of Operations and the Language of
Expressions"** (ch-02.ts, 4,166 words): two-clerks opening (8 + 2 × 5 read
as 50 vs 18, a gap of 32); 7 terms (expression, value, equation,
precedence, bracket, vinculum, BODMAS); expression-tree figure (treaty
tree = 18 vs bracketed tree = 50, root operations tinted — plain labels,
dollarInSvg=0); treaty definition callout + ladder equation (bar → ( ) →
{ } → [ ] → of → ×/÷ L→R → +/− L→R); compression-argument derivation (why
× precedes +) with the natural-vs-agreed insight callout (Lennes 1917,
Cajori honesty); bracket ladder + vinculum mini-example (bar(3+4) × 2 = 14
vs 3 + 4 × 2 = 11); full BODMAS algorithm block; worked ladder 120 −
[2 × (14 − 2 × 5) + {18 ÷ 3 of 2}] = 109 with the ÷-first slip audit
(lands on 100 — a nine-error); "of"-operator para (exam convention ranks
it; 18 ÷ 3 of 2 = 3, not 12); mnemonic-traps warn callout (8 ÷ 4 × 2 = 4
not 1; 25 − 8 + 7 = 24 not 10); four-wrong-roads table; expressions vs
equations; estimation gate (7,218 ÷ 9 + 98 × 63: estimate 6,800, exact
6,976, fingerprint crosses the ranks); historical callout (PEMDAS/BIDMAS/
BEDMAS/BODMAS lineages, viral implicit-multiplication debates); exam
callout; 5 quiz (5/5 E2E); L1–L6 exercises ending in the treaty-maker's
problem L6 (associativity ⇒ + and × alone bracket-independent — exhaustive
0..9 checks; mixed expressions not ⇒ a convention is unavoidable); BODMAS
formula card; chapter-finale closing para.

**Verification:** 60 new checks in `scripts/verify-unit-2.ts` BEFORE
writing (165 in the post-recycle script; 324 unit-cumulative), ALL PASS —
including the L-section's exhaustive associativity loops and every
worked-example/quiz/exercise number. Pipeline fix: two literal-narrowing
TS2367s in the new checks fixed with a compare-before-narrow pattern;
`rebuild_drive_survey.ts` marked as module (`export {}`) — tsc is now
FULLY clean repo-wide including scripts/ (previously the recorded gate
was "tsc clean (src/)"). Gates: lint clean; tsc clean; routes 200 (new
lesson served without a dev restart); browser E2E — KaTeX 113 nodes, all
6 section headings, 4-row table, quiz 5/5 "perfect" with the intended
correct options clicked live, flashcards 40 → 47, glossary lists
BODMAS/Vinculum/Precedence/Equation + formula sheet lists the BODMAS
card, expression-tree figure screenshot-verified, mobile 390px exact-fit
(scrollW=390), zero console/page errors.

**Unit-2 completion review** (RESUME_POINTER directive for the chapter
finale): BOOK_FORMAT verification checklist — all seven boxes pass (math
pre-verified by script; figure labels match prose; quiz indices verified
live; exercise solutions complete + verified; lesson id globally unique;
lint + render clean; logs updated). Exam-coverage audit — every lesson
2.1–2.5 carries an exam callout; topics mapped to bank/SSC/Railway
simplification staples + CUET/NTSE vocabulary items; no real past-paper
questions reproduced. Chapter totals recomputed by
`build_work_inventory.ts`: chapter 2 = 21,450 words across 5 lessons
(3,952 + 4,611 + 4,028 + 4,693 + 4,166); book = 8 lessons, 31,159 words,
47 terms, 40 quiz items, 65 exercise questions; chapters complete 2 of
11. Working copies deleted (Khattar PDF + text dump); only the gitignored
survey remains.

**Push (protocol v2):** after the ship commit landed, one push of all
unpushed commits on main — `fecd9c4..52cc8c4 HEAD -> main` — one-time
HTTPS URL in a single git command, token never written anywhere, URL
anonymized in output; remote verified via one-time-URL ls-remote:
remote HEAD = local HEAD = `52cc8c471cb80040db5d1f776a64b90ca8ed91f8`;
tracking ref re-synced (anonymous fetch). Third successful automated
push; first fully-automated unit CLOSURE (ship + push + verify in one
run).

**Next:** unit 3 opens — chapter 3 "Factors, Multiples and Primes"
(5 planned lessons), starting with 3.1 "Divisibility and Its Tests";
research via Khattar (number-theory chapters) + NCERT class 6 ch. 3
"Playing with Numbers" web fallback. Standing reminder: the
gitignore `/scripts/*` trap — new scripts need `!/scripts/<name>` lines.

---

## 2026-11-03 — HOURLY RUN 5: lesson 2.4 Division, Remainders and Why Zero Never Divides shipped + second recycle recovered

**Situation at start:** a second sandbox recycle since run 4. Local `.git`
had rolled back to the pre-unit-2 snapshot (HEAD `647f44c`, reflog ending
there) while the working files survived — the classic partial-restore
pattern. GitHub's real HEAD was `7d2cac6` (all four unit-2 commits present
on the remote). Recovery per the recorded protocol: anonymous fetch from
the public repo + `git reset --mixed origin/main` + `core.filemode false`.
Tracked tree came back byte-identical (status clean after reset — zero
content loss). Casualties were both untracked working files: run-2's
`scripts/verify-unit-2.ts` (never committed — lesson for the future) and
the gitignored Drive survey. Both rebuilt: the verify script recreated
with the full lesson-2.4 check battery (and committed this time), the
survey re-pulled via the new `scripts/rebuild_drive_survey.ts`
(embeddedfolderview → 89 entries, 4 folders, Khattar id intact — matches
the original survey; script added to the recycle kit). One stray file:
a resurrected v1 `app-shell.tsx` (imported nowhere) — deleted.
`@types/bun` restored (`bun add -d @types/bun`); the recycle had dropped
it and `tsc` flagged `Bun` in `build_work_inventory.ts`.

**Shipped: lesson 2.4 "Division, Remainders and Why Zero Never Divides"**
(ch-02.ts, 4,693 words, 41 blocks): the herder's flock undone — sharing
(partitive) vs grouping (quotative) readings; 6 terms; number-line figure
(24÷6 four backward jumps land on 0 vs 25÷6 landing on 1, the remainder
stub); the division-algorithm treaty a = q·b + r (4,589 = 764×6+5 — 2.2's
minuend returns); laws-retried table (closure DEAD via 25÷4 = 6 r 1,
commutative DEAD 8÷4 ≠ 4÷8, associative DEAD (8÷4)÷2 ≠ 8÷(4÷2), identity
one-sided a÷1 = a, ÷0 bricked shut); two-case ÷0 derivation (7÷0: no
candidate survives — undefined; 0÷0: every candidate survives —
indeterminate; 0÷b = 0 legal); long-division algorithm block
(multiply–subtract–bring-down, left-to-right as the chapter's mirror
layout); worked 8,892 ÷ 36 = 247 r 0 with seat-map figure (brought-down
digits dashed-circled, quotient digits above their seats; seat-scaling
honesty: 72 under 88 is really 72 hundreds = 7,200) — the un-building of
2.3's product, full circle; remainder-bound derivation (0 ≤ r < b — third
in the guard family carry ≤ 1 / carry ≤ 8 / remainder < b) + ÷10ⁿ
corollary (remainder = last n digits: 4,589÷10 = 458 r 9, ÷100 = 45 r 89);
quotient digit-bound derivation (k−m ≤ digits ≤ k−m+1 — division shaves
where multiplication pooled; 1,000÷9 = 111 r 1 echoes 2.1's 999+1);
fingerprint read backwards S(a) ≡ S(q)×S(b) + r (new guard tooth: dropped
remainders caught, 8×6 = 48 → 3 ≠ 8; honest blind spot: transpositions
pass the fingerprint but the rebuild catches them, 746×6+5 = 4,481 ≠
4,589); speed routes ÷5 (double-then-÷10: 340→68), ÷4/÷8 (halving:
248÷4 = 62, 496÷8 = 62) + digit-sum screens (8,892÷9 = 988 exactly);
historical callout (obelus, Rahn 1659 + Euclid Book VII remainder loop);
exam callout; 5 quiz items (5/5 E2E); L1–L6 exercises ending in the
closed-door L6 (the check equation goes silent at b = 0).

**Verification:** 105 new pre-write checks (269 total) in
`scripts/verify-unit-2.ts` ALL PASS before writing — including exhaustive
loops: the check equation and remainder bound for ALL a ≤ 200 × b ≤ 12,
and the quotient digit bound for ALL 4-digit dividends × 1–2-digit
divisors. lint clean; tsc clean repo-wide; routes 200; browser E2E:
KaTeX 148 nodes, dollarInSvg=0, quiz 5/5 "perfect" (persisted), flashcards
34 → 40, glossary + formula sheet list the 3 new formula cards, figures
DOM-verified (23 + 32 labels, ÷ glyphs render), mobile 390px exact-fit
(scrollW = 390), zero console errors.

**Logs:** PROGRESS.json, SOURCE_LOG.md (no new downloads — web research
only), WORK_INVENTORY.json regenerated (7 lessons, 26,993 words, 40 terms,
35 quiz items, 57 exercise solutions), DETAILED_LOG.md updated.

**Git:** ship commit `8e5b681` pushed under **push protocol v2 — the first
fully automated push**: one-time HTTPS URL in a single git command, ALL
unpushed commits on main pushed, remote HEAD verified equal to local HEAD
(`8e5b681` — ls-remote via the one-time URL form), tracking ref
`refs/remotes/origin/main` re-synced to `8e5b681`. The token exists only
in the cron payload and chat context — never on disk. Pipeline note:
`.gitignore`'s `/scripts/*` rule (exception: build_work_inventory.ts only)
was what ate run-2's uncommitted verify script — exceptions added for
`verify-unit-2.ts` and `rebuild_drive_survey.ts` so they survive recycles.

---

## 2026-11-03 — Owner directive: PAT moved into the hourly cron job; automated pushes enabled

**Directive:** the owner pasted the fine-grained GitHub PAT in chat and asked
for it to be put into the scheduled task so commits get pushed automatically.

**Done:**
- Hourly cron job replaced: old job 498092 deleted, new job **498279**
  created (same name "LockIn Library — hourly unit run", same schedule —
  fixed_rate 3600 s, tz Asia/Kolkata, priority 5). The new payload embeds
  the PAT and its step (4) now reads "commit locally, THEN PUSH" with a
  strict push protocol: one-time HTTPS push URL inside a single git
  command, push ALL unpushed commits on main, never write/echo/commit the
  token, retry a failed push once then log it without the token, keep
  origin as the SSH remote, and verify remote HEAD after pushing.
- PAT validated before wiring: GitHub API 200 with push permission on
  Sachin0Amit/lock-in; ls-remote and push both work with the one-time URL
  form; no git credential helper configured (nothing persists to disk).
- Pending run-4 ship commit `f9d22d5` (lesson 2.3) **pushed and verified**
  (remote HEAD = local HEAD = f9d22d5); local origin/main tracking ref
  re-synced to match.
- Memory updated to PUSH PROTOCOL v2 so future runs don't refuse to push:
  RESUME_POINTER.json (nextAction note, notes §2, lastCompleted) and
  PROGRESS.json workflowRulesReminder. Historical entries below are left
  as-is (append-only journal).

**Security posture (unchanged on disk):** the token exists ONLY in the cron
job payload (platform-side scheduler storage) and the chat context — no
file, env, git config, remote URL, script, log or commit contains it. Risk
note for the owner: the token persists in the scheduler until the job is
deleted; revoking/rotating it on GitHub invalidates it instantly, after
which the fallback is the old paste-when-pushing protocol.

**Git:** commit `memory: push protocol v2 — PAT embedded in hourly cron job 498279, automated pushes authorized (owner directive)` — pushed with the session PAT (one-time URL).

## 2026-11-03 — HOURLY RUN 4: lesson 2.3 Multiplication as Repeated Addition — and Beyond shipped

**Lesson 2.3 (chapter 2 The Four Operations, lesson 3 of 5):**
- References: NCERT class 6 ch. 2 multiplication topics web-checked
  (repeated equal jumps on the number line; closure/commutative/
  associative restored, identity = 1, **distributive over addition**
  a×(b+c) = a×b + a×c — the canonical 12×(5+4) = 108 instance) — the
  unit's Khattar ch. 4 was already surveyed in run 2; no new downloads.
- Authored `ch-02.ts` lesson 2.3 (~4,028 words, 36 blocks): equal-groups
  opening + two-readings paragraph; 6 terms (factor, product, distributive,
  partial product, multiplicative identity, binary expansion); number-line
  figure with 4×6 as four equal jumps vs 6×4 as six (both land on 24 —
  commutativity as choreography); rectangle/times-table symmetry paragraph;
  laws-retried table (closure/commutative/associative/identity-1/
  **distributive**, verified instances incl. 12×(5+4) = 108); zero-property
  paragraph derived from distributivity (a×0 = a×0 + a×0 ⇒ 0);
  column-multiplication **algorithm block** (partial products, the shift);
  worked 247×36 = 1,482 + 7,410 = 8,892 with **partial-products seat-map
  figure** (shift annotation, tinted trailing 0); **partial-product
  carry-bound derivation** (9×9+8 = 89 fixed point ⇒ carries ≤ 8, attained
  by 999×9 = 8,991 — contrasted with addition's 1); **product digit-bound
  derivation** (k+m−1 ≤ digits ≤ k+m; 999×999 = 998,001, 100×100 = 10,000);
  partial-product identity equation; 2 formula cards (digit bound,
  mod-9 for multiplication); fingerprint section with the honest
  multiplication-specific blind spot (the 2,223 shift-mistake PASSES the
  fingerprint because it is a genuine product of 247 — guards must be
  multiplied); speed techniques (×9/×11 ten-routes, 198×7, 24×25 = 600);
  **Russian-peasant historical callout** (halves 123…1 × doubles 72…4,608,
  kept rows sum to 8,892 via binary 247 = 11110111₂); exam callout; 5 quiz
  items; L1–L6 exercises (8 questions) ending in the binary-proof L6;
  closing pointer to lesson 2.4 (division and why zero never divides).
- **164 arithmetic checks** (50 new for 2.3) in `scripts/verify-unit-2.ts`
  — ALL PASS *before* writing.

**Gates:** verify 164/164 · lint clean · tsc clean repo-wide (fixed 31
double-escaped apostrophes introduced by the authoring edit — caught by
tsc as TS1005 at ch-02.ts:880; fixed two literal-narrowing TS2367s in the
verify script; removed a malformed dev-generated `.next/dev/types/
validator.ts` and let the dev server regenerate it) · lesson route 404 →
dev-server restart → 200 · browser E2E: KaTeX 149 nodes, 8 headings, both
figures geometry-verified via DOM (10 equal-jump arcs, 10 hop labels,
4 landing circles; 17 digit texts, row labels "= 247 x 6"/"= 247 x 30,
shifted", "36 = 30 + 6" chip, "0 marks the shift" note), algorithm +
2 derivations + laws table + 6 terms + 2 formula cards render, quiz 5/5
"perfect", flashcard deck 28 → 34, glossary lists Factor / Partial product
/ Base-two expansion, formula sheet lists both new cards, mobile 390px
exact (scrollW=390), dollarInSvg=0, zero console errors.

**Logged:** PROGRESS / RESUME_POINTER / SOURCE_LOG updated;
WORK_INVENTORY.json regenerated (lesson 2.3 included); DETAILED_LOG.md
updated. Committed locally. **NOT pushed** — the cron payload's standing
rule is no-push without a fresh owner PAT; per protocol the owner pastes
a token in chat when they want the run's commits released (the run-3
session PAT was a paste-once exception, and per the never-store rule it
is not reused for autonomous runs).

---

## 2026-11-03 — HOURLY RUN 3: lesson 2.2 Subtraction and Borrowing shipped + SVG figure-label defect found & fixed

**Lesson 2.2 (chapter 2 The Four Operations, lesson 2 of 5):**
- References: NCERT class 6 ch. 2 subtraction topics web-checked (whole
  numbers not closed under subtraction; neither commutative nor
  associative; decomposition/regrouping) — the unit's Khattar ch. 4 was
  already surveyed in run 2 (BODMAS reserved for lesson 2.5); no new
  downloads, zero temporary-references footprint.
- Authored `ch-02.ts` lesson 2.2 "Subtraction and Borrowing" (~4,611
  words, 37 blocks): inverse-definition opening + three-faces paragraph;
  6-term block (minuend, subtrahend, difference, borrowing, counting-up,
  nines complement); number-line figure with the 3−7 off-the-edge panel
  (dashed negative stretch + dashed landing circle, Chapter 7 cross-ref);
  four-laws-retried table (DEAD/DEAD/DEAD/HALF, counterexample per row);
  column-subtraction **algorithm block** (decomposition method, zero
  ripple, leading-zero drop); worked 4,589−2,764 — one borrow undoing
  2.1's three carries — with **borrow seat-map figure** (struck digits,
  4→3 / 5→15 corrections, "1 thousand = 10 hundreds" chip, dashed lend
  arrow); **borrow-bound derivation** (d+10 ≥ 10 > 9 ≥ bottom; why two
  would be absurd); seat-exchange equation 1·10^(k+1) = 10·10^k;
  1,000−1 zero-ripple dissolve (mirror of 2.1's 999+1); four
  borrowing-traps warn callout (reflex 2,225 / no-reduce 2,825, both
  detonated by the inverse check); **inverse-check formula card** (total
  certification) + digit-sum subtraction card with honest blind spots;
  compensation 4,312−2,998; shopkeeper counting-up (36+200+1,500+89 =
  1,825); equal-additions-vs-decomposition historical callout; exam
  callout (complement habit 5,432+1 = 5,433); 5 quiz items; L1–L6
  exercises (8 questions) ending in the nines-complement L6 with
  end-around carry and negative-result interpretation; closing pointer
  to lesson 2.3.
- **114 arithmetic checks** (63 new for 2.2) in `scripts/verify-unit-2.ts`
  — ALL PASS *before* writing.

**Defect found & fixed (E2E hardening):** lesson 2.1's number-line figure
labels rendered literal `$4+3$` / `$3+4$` — figure SVGs are injected raw
(`dangerouslySetInnerHTML`), so KaTeX `$…$` never runs inside SVG text;
the page-wide KaTeX-node count had masked it. Fixed to plain "4 + 3" /
"3 + 4" labels; lesson 2.2's figures authored with plain labels from the
start; `dollarInSvg = 0` added to the E2E assertions (both ch-02 lessons
verified clean).

**Gates:** verify 114/114 · lint clean · tsc clean repo-wide (one
literal-narrowing TS error in the verify script itself fixed:
`2225 + 2764 !== 4589`) · lesson route 404 → dev-server restart → 200 ·
browser E2E: KaTeX 140 nodes, 8 headings, both figures geometry-verified
via DOM (dashed negative stretch, dashed landing circle; 2 strike lines,
correction digits 3/15, borrow chip, dashed lend arrow), algorithm +
derivation + four-laws table + 6 terms + 2 formula cards render, quiz
5/5 "perfect", flashcard deck 22 → 28, glossary lists Minuend /
Subtrahend / Nines complement, formula sheet lists both new cards,
mobile 390px exactly (scrollW = 390), zero console errors.

**Logged:** PROGRESS / RESUME_POINTER / SOURCE_LOG updated;
WORK_INVENTORY.json regenerated (lesson 2.2 included); DETAILED_LOG.md
updated. Committed locally, then pushed with the owner's session PAT
(pasted in chat this run — also used first to push the pending lesson
2.1 commit `64b938c`) over one-time HTTPS push URLs; token never written
to disk.

---

## 2026-11-03 — Owner preference recorded: Drive link permanent, PAT never stored

**Directive:** owner asked for the Google Drive link and the GitHub PAT to be
"remembered" so they never have to resend them.

**Resolved:**
- **Drive link — already permanent.** It lives in PROGRESS.json
  (research.sourceCollection.driveLink), SOURCE_LOG.md, WORK_INVENTORY.json
  (research.driveCollection.link) and temporary-references/inventory.json;
  every session reads these files first, so the owner never needs to resend
  it. Recorded explicitly in RESUME_POINTER notes + PROGRESS rules.
- **PAT — cannot and will not be stored** (security policy, README
  "Pushing to GitHub"): a live token written to any file in a pushed repo is
  a permanent leak risk, and the sandbox is not a secrets vault. Verified no
  PAT exists anywhere in the project (only the README's `github_pat_…`
  instructional placeholder). Standing protocol recorded instead: when a
  push is needed, the owner pastes a fresh token in chat (used on the
  command line, never written to disk — reusable within the session it was
  pasted in) or runs `git push origin main` themselves; commits accumulate
  locally meanwhile, so nothing is ever blocked.

**Verified:** `rg github_pat_` across the project → only the README
placeholder; Drive link present in 5 files; JSON files valid.

---

## 2026-11-03 — HOURLY RUN 2: sandbox recycle recovered + UNIT 2 opened (lesson 2.1 Addition and the Art of Carrying)

**Recycle recovery (before any content work):**
- Platform re-bootstrapped the workspace: fresh scaffold git repo (single
  "Initial commit", no remote), the whole project intact as untracked files,
  dev server dead, gitignored artifacts (temporary-references/) wiped.
- Recovery: anonymous `git fetch` from the public GitHub repo → full
  history restored via `git reset --mixed origin/main` + remote/upstream
  reconfigured; the recycle's +x filemode noise silenced with
  `core.filemode=false` (diffs were 0 insertions/deletions — content
  byte-identical); resurrected obsolete v1 `app-shell.tsx` deleted;
  `bun install` (830 packages); dev server restarted, all routes 200.
- Drive survey rebuilt from the embeddedfolderview HTML via curl — 89
  entries confirmed, Khattar file id recovered
  (`scripts/rebuild_drive_inventory.py`, sandbox-side).
- tsc scope hygiene: tsconfig now excludes sandbox-only `skills/` and
  `mini-services/`; `@types/bun` added so the tracked `scripts/`
  type-check — tsc clean repo-wide.

**Unit 2 — lesson 2.1 (chapter 2 The Four Operations, lesson 1 of 5):**
- References: Khattar QA 4e re-downloaded (33.9 MB), ch. 4 "Simplification"
  dumped and studied (BODMAS material noted for lesson 2.5); NCERT class 6
  ch. 2 "Whole Numbers" topic coverage web-checked (number line addition;
  closure, commutative, associative, identity). Working copies deleted
  after verification (SOURCE_LOG ledger row added; new citation key
  `ncert-math6-ch2`).
- Authored `ch-02.ts` lesson 2.1 "Addition and the Art of Carrying"
  (~3,950 words): counting-on opening + 6-term block; number-line figure
  with commutativity drawn as geometry; four-law property table; column
  addition **algorithm block**; worked 4,589+2,764 with carry seat-map
  figure; **carry-bound derivation** (9+9+1=19, induction on columns);
  sum-bound equation + formula card; 999+1 seat-creation example; four
  carrying-traps warn callout; **mod-9 checksum section** (verified
  fingerprint example + honest blind-spot analysis: transpositions and ±9
  slips pass); compensation technique; Gauss 5,050 historical callout; exam
  callout; 5 quiz items; L1–L6 exercises (8 questions, full solutions);
  closing pointer to lesson 2.2.
- **51 arithmetic checks** in `scripts/verify-unit-2.ts` — ALL PASS *before*
  writing (caught one convention bug pre-ship: digital roots of multiples
  of 9 are 9, compared mod 9, not 0).
- Chapter 2 registered in `book.ts` (in-progress; lessons 2.2–2.5 planned,
  carried by ch-02.ts).

**Gates:** lint clean · tsc clean repo-wide · routes 200 (lesson 2.1 needed
a dev-server restart to pick up new static params) · browser E2E: KaTeX 118
nodes, 14 headings, both figures + algorithm + formula cards + 6 terms
render, quiz answered 5/5 "perfect", flashcard deck 16 → 22 cards, glossary
+ formula sheet list new terms, mobile 390px exactly no overflow
(scrollW=390), zero console errors.

**Logged:** PROGRESS / RESUME_POINTER / SOURCE_LOG updated;
WORK_INVENTORY.json regenerated (lesson 2.1 included; `chaptersWritten` now
counts only complete chapters, `chaptersInProgress` added); DETAILED_LOG.md
updated. Committed locally — no push (PAT protocol: owner pastes a fresh
token when a push is wanted).

---

## 2026-11-03 — Detailed work-inventory logging system (owner directive) + PAT push

**Goal:** owner directive — "before this [using the new PAT], maintain a log
or json of everything you have written or worked on in detail" — delivered,
then the pending commits pushed.

**Built:**
- `docs/project/WORK_INVENTORY.json` — machine-readable record of
  everything: per-lesson content stats (words, block counts, quiz items,
  exercises by level L1–L6, terms, prerequisites, sources, authored
  commit), complete git history with per-file insertions/deletions, the
  full Drive survey (89 items + sizes + subfolders), citation keys, the
  per-unit download ledger, engineering milestones + verification log, and
  codebase stats. Generated by `scripts/build_work_inventory.ts` (bun)
  directly from the live chapter data — numbers are computed, never
  hand-typed. Totals reconcile with PROGRESS.json (9,709 words, 16 terms);
  chapter-1 totals corrected: **15 quiz items, 25 exercise solutions,
  3 figures, 3 formula cards** (previous notes had counted only unit-1
  additions).
- `docs/project/DETAILED_LOG.md` — human-readable narrative mirror:
  project identity, standing rules, timeline, per-lesson content detail,
  engineering milestones v0→v3, verification log, research ledger, git
  history, current state & next unit.
- Maintenance rule wired in: MASTER_PLAN §2 step 7 + §6 gate 6 now require
  regenerating the inventory and updating the detailed log at EVERY unit
  ship; PROGRESS workflowRulesReminder + RESUME_POINTER carry the same rule.
- `scripts/build_work_inventory.ts` is **tracked in the repo** (.gitignore
  now ignores `/scripts/*` with an exception for it) so the committed log
  stays regenerable from a fresh clone; other sandbox helpers stay ignored.

**Push:** `b4f461c` (site v3) + `a29d1b8` (unit 1) + this logging commit
pushed to origin/main using the owner's fresh fine-grained PAT over a
one-time HTTPS push URL (token never written to any file or remote config;
owner revokes it after, per README policy).

**Verified:** WORK_INVENTORY.json valid JSON (60.5 KB · 8 commits · 89
drive items · totals cross-checked against PROGRESS.json and WORKLOG).

---

## 2026-11-03 — UNIT 1 SHIPPED: Foundation Mathematics chapter 1 complete (lessons 1.2 + 1.3) + Drive survey + mobile-overflow fixes

**Goal:** first full unit of the unit-by-unit cadence (owner directive).
Owner supplied the Google Drive reference collection mid-session.

**Drive survey (MASTER_PLAN §2 steps 1–4):**
- Folder "books" (link-shared): 89 root items — Khattar QA 4e, calculus,
  linear algebra, physics, chemistry, CS, economics, language references —
  plus MATHS (M1–M5 JEE modules incl. Set Theory/Real Numbers), CHEMISTRY,
  PHYSICS, _DPPs subfolders. Machine listing → `temporary-references/
  inventory.json` (gitignored). Headless-browser extraction (virtualized
  grid scrolled to exhaustion; `usp=sharing` link works without login).
- Downloaded ONLY unit 1's reference: Khattar *Quantitative Aptitude for
  Competitive Examinations* 4e (32.4 MB, 1049 pp), ch. 1 "Numbers" dumped
  to text and studied; NCERT class 6 "Knowing Our Numbers" topic coverage
  cross-checked via web (sanctioned supplement). Working copies deleted
  after verification; ledger + citation keys in SOURCE_LOG.md.

**Content authored (ch-01.ts, ~6,900 new words):**
- **Lesson 1.2 Comparing and Ordering Numbers** — digit-count rule,
  seat-by-seat comparison, full *domination bound* derivation (geometric
  series → 10^j − 1 < 10^j), place-value comparison figure (4,589 vs
  4,598, deciding tens seat tinted), greatest/smallest construction,
  digit-rotation + mod-9 fingerprint, Roman-numeral historical callout,
  5 quiz items, L1–L6 exercises (L6: lexicographic total order + mod-9
  rearrangement proof), formula card.
- **Lesson 1.3 Rounding and Estimating** — midpoint figure (43/47 on the
  40–50 line), rounding **algorithm block** (first content usage), close-
  numbers subtraction trap (4,851−4,829), ceiling-vs-nearest (bus problem),
  error-bound derivation (k × ½·10^n, tight example 1,200→1,400), banker's
  rounding / IEEE 754 insight + error-by-digit table, 5 quiz items, L1–L6
  exercises, 2 formula cards.

**Verification (§6 gates):**
- 66 arithmetic checks recomputed by script BEFORE writing (incl. half-up
  vs half-even error sums: +5 vs 0 at digit level); verify-unit-1.ts:
  ALL CHECKS PASS (ids unique, quiz indices valid, solutions complete,
  prereqs resolve, sources resolve).
- lint clean · `tsc --noEmit` clean (src/) · routes 200.
- Browser E2E: KaTeX 154/114 nodes per lesson, figures + algorithm + 11-col
  table render, quiz scored 5/5 "perfect" with feedback, flashcards now a
  16-term deck, glossary lists all new terms + formula sheet cards, TOC
  shows ch. 1 (3 lessons) with planned ch. 2 intact, "Next up" works.
- No console errors on any page.

**Platform fixes found during E2E (shipped with the unit):**
- Mobile 390px horizontal overflow on all lesson pages (article forced to
  max-content width by implicit grid track): added base `grid-cols-1` to
  the three responsive grids (lesson reader, home hero, footer).
- Concept badges (`whitespace-nowrap`) overflowed with long concept
  phrases → now wrap (`whitespace-normal h-auto text-left leading-relaxed`).
- Re-tested: home/book/lessons all exactly 390px, desktop unchanged, quiz
  interaction still green. (Diagnosis note: `[minmax` in tool output
  renders as `inmax` — ANSI `[m` escape eaten by display; files were fine.)

**Project memory updated:** PROGRESS.json (unit 1 shipped, 9,709 words,
16 flashcard terms), RESUME_POINTER.json (next = chapter 2 The Four
Operations), SOURCE_LOG.md (Drive ledger + citation keys), book.ts notes,
ch-01.ts header. Local commit follows; push needs a fresh PAT or an
owner-run `git push origin main`.

---

## 2026-11-03 — Website v3: arrangement & visual overhaul

**Goal:** owner asked to change how things are arranged ("make arrangement
more good efficient and nice"). Full IA + visual pass over home, book and
chrome; reader breadcrumb aligned. No content changes.

**Home (rearranged):**
- Two-column hero: message + CTAs left, **living book-shelf visual** right
  (real cover spines for live books, ghost spines for planned shelves, one
  leaning; shelf bar + caption) on a subtle dotted-paper texture —
  visually tells "library growing one chapter at a time".
- Primary CTA is now contextual: "Start reading" (new reader) /
  "Continue — 1.1" (returning, from persisted lastLesson).
- Four stat boxes → one inline stat strip with hairline separators.
- "Your desk": lighter strip — 4 compact tiles + bookmark chips row +
  inline "Resume" link (big continue card removed; hero CTA covers it).
- Shelves: count badge ("1 live"), refined book cards (larger cover,
  StatusBadge shared component, meta strip, progress).
- "Full shelf plan" → "On the roadmap": only not-yet-live shelves, as
  compact chips (planned vs live no longer duplicated).

**Book page (rearranged):**
- Breadcrumb (Library / discipline / book) + chevron separators.
- Hero: cover + title/badges/description + compact meta strip + progress
  + actions; primary button contextual (Start chapter 1 / Next — 1.2 /
  Continue — 1.1).
- TOC: per-chapter counter chip ("1/1 done" / "5 planned"), **"Next up"**
  highlight on the first unwritten-not-completed lesson (tint + badge),
  quiz best-score chips (5/5 with award icon) on completed lessons,
  tighter rows.

**Reader:** breadcrumb now Library / book / chapter (chevrons, Library
links home). Footer (site chrome): two-column brand + quick links (home,
book, glossary, GitHub) + Ctrl-K hint; fine print contrast raised.

**Shared:** new `bits.tsx` (DISCIPLINE_ICONS + StatusBadge) — home and
book now share one source of visual truth. `paper-dots` + `spine-label`
CSS utilities. Next.js dev-tools indicator disabled (`devIndicators:
false`) — it was polluting mobile previews.

**Verified:** lint + tsc clean; all routes 200 (unknown 404); browser
E2E — hero CTAs, spine labels (6), stat strip, roadmap, footer links,
breadcrumb, "Next up" + 5/5 quiz chip + "1/1 done" counter, 54 KaTeX
nodes, C-keyboard toggle, Ctrl-K palette, flashcards; VLM visual review
rounds: home 9/10 (desktop+mobile; imbalance + ghost-contrast + devtools
overlap all fixed), book 9/10, reader 8/10 (both "cut-offs" were
viewport-fold artifacts), dark-mode spine contrast fixed; zero console
errors.

**Remaining:** awaiting Google Drive link → unit workflow (Foundation
Mathematics chapter 1, lessons 1.2+). Exam registry research. Push needs
owner (new PAT or manual).

**Git:** commit `site v3: arrangement & visual overhaul (hero shelf, contextual CTAs, TOC next-up/quiz scores, roadmap, footer)`.

---

## 2026-11-03 — Owner directives: unit-by-unit cadence, streak off, push access

**Directives received:** (1) content will be written **one unit of one
subject at a time** — docs changed to make the unit (chapter) the delivery
cadence; (2) the **daily streak came off the website**; (3) owner asked how
to supply a GitHub auth token — instructions added to README ("Pushing to
GitHub") and given in chat.

**Docs (unit-based workflow):**
- `MASTER_PLAN.md` §2 rewritten: "Authoring workflow — one unit of one
  subject at a time"; a unit = one chapter; research → write → verify →
  ship → log per unit; never batch-draft; storage law now "one unit at a
  time".
- §6 quality gates: run per unit, and again per book before completion.
- `BOOK_FORMAT.md`: new "Authoring cadence" section (unit = `ch-NN.ts`).
- `README.md`: status notes the cadence; new "Pushing to GitHub" section
  (fine-grained PAT: only this repo, Contents RW, 7-day expiry, revoke
  after push).
- `PROGRESS.json` + `RESUME_POINTER.json` updated (phase, rules, awaiting
  Drive link + optional PAT).

**Website (streak removal):**
- Header: flame streak badge removed; the lessons-completed badge now
  shows whenever > 0 (was previously streak-dependent).
- Home "Your desk": streak pill + "Learning streak" stat removed; fourth
  stat is now **Terms mastered** (flashcard know-count from the persisted
  store) — reads as a real study metric instead of gamification.
- `progress-store.ts`: `computeStreak`/`dayKey` helpers deleted (persisted
  shape unchanged — no migration needed).
- Policy recorded in memory: no streak/gamification features on the site.

**Verified:** lint clean; `tsc --noEmit` clean under `src/` (also fixed a
pre-existing `SearchHit` union type error — `snippet` now declared on the
book branch); browser E2E with seeded progress: home renders "Your desk"
with stats [Lessons completed 1 · Words read 2,852 · Terms mastered 3 ·
Bookmarks 0], zero occurrences of "streak" anywhere on the page, header
shows only the lessons-completed badge; lesson page renders fully (54
KaTeX nodes, quiz present, correct title); no console errors, no
hydration warnings, dev.log clean.

**Remaining:** awaiting Google Drive link → begin the unit workflow
(Foundation Mathematics, chapter 1 continuation: lessons 1.2+). Exam
registry research. Owner PAT → push local commits.

**Git:** commit `docs+ui: unit-by-unit authoring cadence, remove daily streak, push-access guide`. Pushed to `origin/main` using the owner's fine-grained PAT (README "Pushing to GitHub"); owner revokes the token afterwards — future pushes need a fresh token or an owner-side `git push`.

---

## 2026-11-02 — Platform v2: routed architecture + advanced study features

**Goal:** owner approved the book structure ("structure of book is ok") and asked
for improvements to it plus a more advanced website. Content authoring still
waits for the Google Drive link — no new lesson content written.

**Book structure improvements (additive, non-breaking):**
- `Lesson.prerequisites?: string[]` — rendered as completion-aware chips.
- `Lesson.sources?: string[]` — SOURCE_LOG.md citation keys, rendered at the
  lesson footer.
- New block `formula` (revision formula card → auto formula-sheet page).
- New block `algorithm` (numbered pseudocode for CS books / procedures).
- `countLessonWords` extended to both new blocks.

**Website v2:**
- Real URL routing (App Router, SSG via generateStaticParams, dynamicParams
  false): `/`, `/book/[bookId]`, `/book/[bookId]/lesson/[lessonId]`,
  `/book/[bookId]/revise`, `/book/[bookId]/glossary`, custom 404, per-page
  metadata + Book JSON-LD. Shareable deep links; browser back/forward work.
  Old client-state shell (app-shell.tsx) deleted.
- Command palette (Ctrl/Cmd+K, cmdk + Dialog): full-text search across books,
  lessons AND glossary terms with snippets; quick actions (continue reading,
  random lesson, theme toggle, home); recently-written group. cmdk's internal
  filter disabled (`shouldFilter={false}`) — `searchLibrary` does token-aware
  scoring instead (fixed multi-word queries being dropped).
- Reader upgrades: scrollspy "On this page" sidebar (IntersectionObserver,
  auto heading anchors), scroll-linked reading-progress bar, keyboard
  shortcuts (←/→ lessons, B bookmark, C complete), prerequisites block,
  sources footer, shareable-path hint.
- Quiz: score summary, persisted best score per lesson (zustand persist v2),
  retake button; scoring made batch-safe via functional setState + effect.
- Flashcards (`/revise`): auto-generated deck from every `terms` block; 3D flip
  (framer-motion + CSS backface), know/again self-marking persisted per term,
  shuffle, all/not-yet-known modes, keyboard (Space/1/2), session summary.
- Glossary (`/glossary`): A–Z jump bar + entries linking to lessons; formula
  sheet from `formula` blocks (empty-state until chapters use them).
- Home "Your desk" dashboard: continue reading card with book progress,
  streak (consecutive completion days), words read, bookmarks list.
- Progress store v2: quizBest, knownTerms (+reset per book), streak helper;
  persisted shape v2, backward compatible.

**Verified:** lint clean; all routes 200 (unknown ids 404); browser E2E —
palette multi-word search + navigation, quiz answered-all → "You scored 5/5" +
quizBest persisted + retake reset, keyboard c/b, flashcards flip/mark/mode
switch (2/5 known → "3 in deck" in todo mode), scrollspy present, progress
bar, Your desk + continue card, localStorage persistence; per-page fresh loads
show zero hydration warnings; VLM screenshot review of home/lesson/book/
revise/glossary pages (only dev-tools badge + viewport cutoff noted).

**Remaining:** awaiting Google Drive link → begin subject workflow
(Mathematics first). Exam registry research. Chapters 1.2–1.11 + books 2–27.

**Git:** commit `v2: routed platform, command palette, flashcards, glossary, reader upgrades, model v2`.

---

## 2026-11-02 — Platform base built and verified

**Goal:** prepare the base (files, structure, memory) so book authoring can
start the moment the owner supplies the Google Drive link.

**Built:**
- Content model `src/data/library/types.ts` — Book/Chapter/Lesson + 12 block
  types (para, heading, callout×6 tones, terms, equation, derivation,
  example, figure, table, list, quiz, exercises) + honest word counter.
- Disciplines taxonomy (11 shelves) `disciplines.ts`.
- First book: **Foundation Mathematics** — full 11-chapter TOC planned;
  Chapter 1 (Numbers and Place Value) with lesson 1.1
  "Numbers, Digits and Place Value" fully authored (~2.8k words: derivation
  of positional value, place-value chart, number-line SVG figure,
  international vs Indian numeration, 5-question quiz with why-wrong
  explanations, 9 exercises across L1/L2/L4 with worked solutions,
  exam-relevance callout). Accuracy pass fixed 4 issues (numeral paragraph,
  10^11 kharab column, modular-arithmetic wording, digit-reversal formula
  999(a−d)+90(b−c) — now verified by substitution).
- Reader UI: library home (hero/stats/shelves/book cards/plan grid),
  book page (cover/TOC/progress/continue-reading), lesson reader
  (typeset typography, KaTeX, interactive quiz, collapsible solutions,
  bookmark, mark-complete, font-size control, prev/next), header search
  (Cmd+K), dark mode, warm academic palette (no blue/indigo), sticky footer.
- Progress persistence (zustand persist → localStorage, keyed by
  forever-stable lesson ids).
- Memory system: docs/project/{MASTER_PLAN, BOOK_FORMAT, PROGRESS.json,
  RESUME_POINTER.json, EXAM_REGISTRY.json, SOURCE_LOG.md,
  SUBJECT_BACKLOG.md, WORKLOG.md} + README.md.

**Verified:** lint clean; tsc clean under src/; agent-browser E2E — home
render, book TOC, lesson render (55 KaTeX nodes, 1 SVG), quiz feedback,
solution expansion, completion persistence, search, dark mode, no overflow
at 390px/1280px, no console errors.

**Remaining:** awaiting Google Drive link → begin subject workflow
(Mathematics first). Exam registry research (44 skeleton entries, all
unresearched). Chapters 1.2–1.11 + books 2–27 of mathematics.

**Git:** commit `base: platform + content model + Foundation Mathematics ch1 §1.1 + memory docs`.
