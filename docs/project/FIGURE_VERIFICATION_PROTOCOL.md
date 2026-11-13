# FIGURE VERIFICATION PROTOCOL — strict visual cross-verification of every figure

> Owner directive (2026-11-11 chat): *"cross verify all svgs and graphs and images
> are accurate use vision model etc make sure all are correct and be very strict
> and if not possible use ai generated images or any other method which you would
> like to use use it and add this in docs so fututre corn job can know what to do
> in such cases"*.
>
> Owner directive (2026-11-13 chat), extending the dedicated job: *"make change
> in that vlm corn job of svg autdit add this also that is chacks lessonas add
> more svgs diagram or ai genrated images in solution of exercise question of
> prewritten lessons for better understandig , enrich the topics with more things
> like more topics , subtopics if any topic is missing or you think it can be
> included and make changes at last in dcs accordinly"* — codified as §10.
>
> This file is the standing protocol every LOCKIN authoring fire follows. It is
> referenced by `RESUME_POINTER.json` (standing rules) and `WORKLOG.md`; a fire
> that authors or edits any lesson MUST run §4 (the per-lesson pipeline), and
> every fire MUST clear §6's sweep quota until the queue is empty.

## 1. Scope — what counts as a figure

| Class | Where it lives | Count (2026-11-11) |
|---|---|---|
| Inline SVG diagrams (`kind: 'figure'` blocks, `svg:` string) | `src/data/library/books/**/ch-*.ts` | **221** (live queue 2026-11-11: FM 92 + ANS 47 + AL 74 + AA 8) |
| AI-generated book-cover art (raster `.webp`) | `public/covers/*.webp` | **28** |
| FX-02 "graph it" canvases (runtime-rendered from display equations) | `src/components/library/*graph*` | audited indirectly (e2e renders + no-error gate) |
| KaTeX typeset math | inline | **not** a figure (audited by KaTeX-error gates) |

## 2. The strict rubric — a figure PASSes only if ALL hold

1. **Geometry truthful** — every drawn count, length, position and shape must
   match the mathematics the prose claims (e.g. a "4 arrows" figure draws exactly
   4 arrows; bars' heights proportional to their values; plotted points at the
   right coordinates).
2. **Labels correct** — every `<text>` matches the lesson's terminology and
   numbers; no typo, no stale value, no label pointing at the wrong element.
3. **No clipping** — nothing escapes the `viewBox` (bottom lines and captions are
   the classic offenders; keep ≥ 8px margin).
4. **No overlap** — no TEXT/TEXT, TEXT/PATH, TEXT/LINE, TEXT/CIRCLE, TEXT/RECT
   collision; the DOM detector is the arbiter (§4 layer 1).
5. **Math rendered, not raw** — no raw `$…$` or LaTeX leaks inside SVG text;
   superscripts as real glyphs or `<tspan baseline-shift>`, never `^`.
6. **aria honest** — `aria-label` describes what the picture actually shows.
7. **Palette on house law** — vivid figure palette (amber `#fef3c7`/`#f59e0b`,
   orange `#ffedd5`, green `#16a34a`/`#166534`, teal `#0f766e`, red `#dc2626`
   only for failure witnesses), no blue/indigo.
8. **Dark mode survives** — the figure uses `currentColor`-friendly strokes/fills
   or explicit colors that stay legible on the dark paper.
9. **VLM visual verdict PASS** — the strict vision check (§4 layer 2) returns no
   material defect. "Cosmetic nitpick" still gets logged; two nits = fix.

## 3. The verdict record — append-only audit log

All findings land in `docs/project/FIGURE_AUDIT_LOG.md` (created on first use):
one line per figure per audit pass:
`YYYY-MM-DD | book/lessonId | figure #k (aria or caption head) | layer | VERDICT PASS/FIXED/FAIL-OPEN | notes`.
`FAIL-OPEN` means a defect found but not fixable this run — it MUST also be
recorded in `WORKLOG.md` so the next fire picks it up. A run never ends with an
unrecorded FAIL.

## 4. The per-lesson pipeline (run on every lesson authored or edited)

**Layer 1 — static + DOM gates (always, cheap):**
- The chapter verifier's figure audits: viewBox present, `aria-label` present,
  no `$`, pinned literal strings (needle checks) — pattern in
  `scripts/verify-book4-ch01.ts` sections H/I.
- `bash scripts/audit-svg-overlaps.sh <lessonId> …` — the DOM-geometry overlap +
  clip detector (`scripts/audit-svg-overlaps.page.js`); 0 issues required.
- E2E figure count matches the authored count; figures render (no zero-size).

**Layer 2 — rendered VLM audit (always for new/changed figures):**
```bash
# 1. screenshot the lesson (light, then dark)
agent-browser open http://localhost:3000/book/<bookId>/lesson/<lessonId>
agent-browser wait --load networkidle
agent-browser screenshot /tmp/fig/light.png full
# 2. crop each figure region (bbox from the page's figure offsets; crop generously)
python3 -c "from PIL import Image; im=Image.open('/tmp/fig/light.png'); im.crop((x1,y1,x2,y2)).save('/tmp/fig/fig1.png')"
# 3. strict vision check
z-ai vision -p "You are a STRICT mathematical-figure auditor. Check EVERY detail of this figure: (a) are all labels spelled correctly and placed on the right elements, (b) is any text clipped, overlapping, or escaping the frame, (c) does the drawn geometry match the stated counts/coordinates/relationships, (d) is any mathematical value wrong, (e) does the arrow/line furniture attach to the right nodes. List every defect with its location, then give verdict PASS or FAIL." -i /tmp/fig/fig1.png
```
Dark mode: same crop, verify legibility (fills/strokes visible on dark paper).

**Layer 3 — the fix ladder (on any FAIL), in priority order:**
1. **Fix inside the SVG** (preferred — keeps figures crisp, tiny diff):
   widen `viewBox`, split caption lines, move `<text>`, recompute drawn
   coordinates, shorten labels. Re-run layer 1 + 2 until PASS.
2. **Regenerate from a generator script** when hand-editing coordinates is
   error-prone (the `gen-43-figures.py` pattern: exact-geometry generation from
   the pinned numbers).
3. **AI-generated image fallback** — ONLY when an SVG cannot faithfully carry
   the content (rich texture, 3-D realism, photographic scene; NOT for graphs,
   arrow diagrams, number lines, charts — those stay SVG):
   - generate **text-free** (AI lettering garbles; overlay labels as SVG text on
     top of the raster afterwards): `z-ai image -p "<scene>, no text, no letters, flat vector textbook style" -o public/figures/<id>.png`
   - vision-verify the raster with the same strict rubric (regenerate ≤ 2 times);
   - overlay labels via an SVG `<image>` + `<text>` wrapper in the figure block;
   - record provenance in `SOURCE_LOG.md` (tool, prompt date, verification
     verdict) — generated art is OUR asset, never scraped.
4. **FAIL-OPEN** (cannot fix this run): record in `FIGURE_AUDIT_LOG.md` +
   `WORKLOG.md`; the next fire's sweep MUST take it first (§6).

## 5. Cover-art audit (the raster class)

Covers were vision-verified at generation time (28/28, 2026-11-11). Re-check on
touch: covers must stay text-free (if generation bakes garbled letters →
regenerate), aspect-fit their card slots (no stretching), and match the book's
accent. Home/book-page E2E (`e2e-covers-highlights.sh`) guards rendering.

## 6. The shelf sweep — every fire clears a quota

Full-library strict audit proceeds as a rotating sweep so the whole shelf is
covered without a dedicated mega-run:
- Maintain `docs/project/FIGURE_AUDIT_QUEUE.json`:
  `{ "updated": "…", "cursor": n, "items": [ { "lessonId", "bookId", "figures": k, "status": "pending|done" } ] }`
  built by walking `kind: 'figure'` blocks per lesson — **BUILT 2026-11-11** by
  the owner-directed figure-audit turn: `scripts/build_figure_audit_queue.ts`
  (re-run any time — it PRESERVES existing statuses, so new lessons join as
  pending without ever wiping progress; pre-written books ordered first).
  Current queue: **125 lessons / 221 figures**, 5 done, cursor at FM.
- **Every fire: audit ALL figures of the lessons it touches (§4) + at least 4
  queue items** (next pending, oldest cursor first; mark `done` with date +
  verdict in `FIGURE_AUDIT_LOG.md`; advance the cursor).
- An item that yields fixes goes through the §3 ladder immediately (same run).
- The sweep is DONE when every item is `done`; then the queue file records the
  completion date and future fires only run §4 on touched lessons.

## 7. Coordination with the visual-upgrade sibling job

- The sibling job signals activity with `docs/project/.figure_upgrade_lock`
  (fresh = < 45 min old) and may leave figure fixes uncommitted.
- NEVER revert or "clean up" the sibling's uncommitted figure edits; NEVER
  `git add -A` (it would sweep them into the wrong commit) — add your chapter
  files explicitly. If the lock is stale (> 45 min), delete the lock file.
- Both jobs write to the same `FIGURE_AUDIT_LOG.md` — append, never rewrite.

## 8. Why this protocol exists (the run record)

Two clipping defects in ANS 8.5's figures and several label shifts across FM/AL
were caught ONLY by the strict VLM pass after the DOM gate reported 0 issues —
geometry gates catch collisions, vision catches *wrongness*. The ladder's
"fix in SVG first" rule kept every repair a 2-line coordinate edit; no figure
has yet needed the AI-image fallback (§3.3 stands ready for texture-class
figures). The 2026-11-11 audit turn's record: ANS 8.5 hero 9/10, both figures
PASS after two clipping catches fixed; AA 1.1/1.2 all four figures PASS.

## 9. The dedicated figure-audit job (owner directive 2026-11-11; recreated 2026-11-13)

A dedicated cron job fires 2×/day (06:40 + 13:40 IST, between the authoring
job's fires) and owns the §6 sweep. Created 2026-11-11 as job 524541
("figure-audit run: strict VLM verification of the pre-written books'
SVGs"); **recreated 2026-11-13 as job 527779** ("figure-audit + enrichment
run v2") under the owner's §10 directive — audit core kept, two enrichment
passes added. Per fire:

- take the next ~4–6 PENDING queue items (was 8–12 in the audit-only era;
  the §10 enrichment passes make each item heavier — FAIL-OPEN items go FIRST;
  never start a lesson you cannot finish, gate and ship inside the ~2 h window);
- run the full §4 pipeline (layer 1 DOM gate + layer 2 VLM) on every figure
  of those lessons, light + dark for the first lesson of the run;
- apply the §3 ladder on any FAIL — including the AI-image fallback §3.3
  and any other sound replacement method the auditor judges better;
- re-audit after every fix; a run never ends with an unrecorded FAIL;
- update the queue (`bun run scripts/build_figure_audit_queue.ts` —
  progress-preserving) + append `FIGURE_AUDIT_LOG.md` + one WORKLOG entry,
  plus the §10.3 census-doc sync whenever lesson content changed;
- commit LOCALLY ONLY. This job NEVER pushes and never handles credentials
  or tokens of any kind — the authoring job (523435) pushes at run-end and
  the dedicated push job (05:35/13:35/21:35 IST) pushes ALL unpushed local
  commits 3×/day, so its commits reach GitHub automatically within hours.
  It never edits RESUME_POINTER.json (the authoring job owns the plan) and
  never authors WHOLE lessons or chapters — figures, §10 solution visual
  aids and subsection-level enrichment only;
- when the queue is empty: regression mode — re-audit figures touched in
  the last 7 days (`git log --since` --name-only) + the 3 oldest done items,
  plus one cheap enrichment scan of the oldest lessons, then a quick
  idle-pass close.

## 10. The enrichment passes (owner directive 2026-11-13)

The dedicated job (§9, job 527779) runs THREE passes per queued lesson, in
this order. Pass A is the §4 strict audit, unchanged. Two new passes:

### 10.1 Pass B — solution visual aids (exercise-question solutions)

After auditing a lesson's figures, read EVERY exercise question's worked
solution (and every Illustration `Sol.` chain). Where a diagram genuinely
aids understanding of THAT solution — a geometry construction, a graph
read, a number-line walk, a Venn/table/process diagram, an arrow flow, a
comparison panel — ADD a figure inline in that solution block:

- **SVG first** (the default): house palette §2.7, every drawn value computed
  from the solution's OWN numbers before drawing, `viewBox` with ≥8px
  margin, `aria-label`, dark-mode legibility §2.8; then re-run layer 1
  (overlap) + layer 2 (VLM strict) on the new figure.
- **AI-generated image only for texture/scene-class content** (§3.3 law,
  unchanged): text-free generation, SVG `<text>` label overlay, ≤2
  regenerations, provenance in `SOURCE_LOG.md`. Graphs, diagrams, number
  lines and charts stay SVG — always.
- **Discipline**: 0–2 figures per exercise, only where they teach — never
  decoration. The caption states what THIS diagram shows for THIS solution.
  Never change the solution's reasoning, steps or answers — the figure
  embeds with one short accurate caption line. Quiz keys and exercise
  answers stay untouched unless a REAL arithmetic error is proven (then
  fix, re-pin the verifier, log as an accuracy catch). Study-never-reproduce:
  every exhibit is OURS.

### 10.2 Pass C — topic/subtopic enrichment

Check the lesson's coverage against (i) its own headings/title — every named
promise taught + worked, and for graphable function families SHOWN with a
figure + worked example (rule A2 of `scripts/audit-content-completeness.ts`);
(ii) that standing gate on the touched book — 0 errors required; (iii) the
chapter's canonical arc (NCERT / Hall-&-Knight / Khattar-class canon;
internet research sanctioned; study-never-reproduce).

A missing or thin subtopic — method variant, special case, classic worked
pattern, formula family, exam angle — is AUTHORED as a new subsection inside
the fitting existing lesson, per `BOOK_FORMAT.md` at house depth
(definition + "Thus," + "For example," runs, an Illustration with a `Sol.`
chain, an L1–L6 ladder WITH full worked solutions if questions are added,
figures where the family rule demands, formula cards, exam callout where
apt). The owner's bar: "sufficiently detailed", not padded. VERIFY-FIRST
house rule applies: pin every new number in the chapter verifier BEFORE
writing the prose.

A WHOLE lesson or chapter that is missing is NOT authored here — register
the gap in `docs/research/PREWRITTEN_BOOKS_AUDIT.md`'s gap section + a
WORKLOG note; the authoring job queues it via `RESUME_POINTER.json`.
That division of labour stands.

### 10.3 Doc sync after enrichment (owner: "make changes at last in dcs accordingly")

Whenever lesson content changed, the fire syncs the census docs before
committing: `bun run scripts/build_work_inventory.ts` (WORK_INVENTORY.json),
`PROGRESS.json` library counts + `updated` date (recomputed counts ONLY —
phase/plan/status fields belong to the authoring job), a `DETAILED_LOG.md`
line, and `SOURCE_LOG.md` provenance for any AI-generated image.
`RESUME_POINTER.json` is NEVER touched by this job.
