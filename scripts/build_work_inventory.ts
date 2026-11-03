#!/usr/bin/env bun
/**
 * build_work_inventory.ts — LockIn Library
 *
 * Generates docs/project/WORK_INVENTORY.json: the detailed machine-readable
 * record of everything written and worked on (owner directive 2026-11-03:
 * "maintain a log or json of everything you have written or worked on in
 * detail"). Re-run after every unit ship / platform change, then update
 * docs/project/DETAILED_LOG.md (the human-readable mirror) to match.
 *
 * Usage: cd /home/z/my-project && bun run scripts/build_work_inventory.ts
 */
import { foundationMathematics } from '../src/data/library/books/mathematics/foundation-mathematics/book'
import { countLessonWords } from '../src/data/library/types'
import type { Lesson } from '../src/data/library/types'

const ROOT = '/home/z/my-project'
const OUT = `${ROOT}/docs/project/WORK_INVENTORY.json`

function sh(cmd: string[]): string {
  const r = Bun.spawnSync(cmd, { cwd: ROOT })
  if (r.exitCode !== 0) throw new Error(`command failed: ${cmd.join(' ')}\n${r.stderr.toString()}`)
  return r.stdout.toString()
}

function parseSizeMB(s: string): number {
  if (!s) return 0
  const m = s.match(/([\d.]+)\s*(KB|MB|GB)/)
  if (!m) return 0
  const v = parseFloat(m[1])
  if (m[2] === 'KB') return v / 1024
  if (m[2] === 'GB') return v * 1024
  return v
}

/* ------------------------------------------------------------------ */
/* Git history (parsed oldest → newest)                                */
/* ------------------------------------------------------------------ */
interface CommitRec {
  sha: string; short: string; date: string; message: string
  files: { path: string; add: number; del: number }[]
}
const rawLog = sh(['git', 'log', '--numstat', '--format=@@|%H|%h|%ad|%s', '--date=format:%Y-%m-%d %H:%M'])
const commits: CommitRec[] = []
for (const line of rawLog.split('\n')) {
  if (!line) continue
  if (line.startsWith('@@|')) {
    const parts = line.split('|')
    commits.push({ sha: parts[1], short: parts[2], date: parts[3], message: parts.slice(4).join('|').trim(), files: [] })
  } else {
    const m = line.match(/^(\d+|-)\t(\d+|-)\t(.+)$/)
    if (m && commits.length) {
      commits[commits.length - 1].files.push({ path: m[3], add: m[1] === '-' ? 0 : +m[1], del: m[2] === '-' ? 0 : +m[2] })
    }
  }
}
commits.reverse()
const gitHistory = commits.map((c) => ({
  sha: c.sha,
  short: c.short,
  date: c.date,
  message: c.message,
  filesChanged: c.files.length,
  insertions: c.files.reduce((a, f) => a + f.add, 0),
  deletions: c.files.reduce((a, f) => a + f.del, 0),
  files: c.files,
}))

/* ------------------------------------------------------------------ */
/* Drive survey artifact (gitignored; summary gets committed here)     */
/* ------------------------------------------------------------------ */
const inv: any = await Bun.file(`${ROOT}/temporary-references/inventory.json`).json()
const rootItems: { name: string; size: string }[] = inv.rootItems ?? []
const driveFolders = rootItems.filter((i) => i.name.includes('[folder]')).map((i) => i.name.replace(' [folder]', ''))
const driveFiles = rootItems.filter((i) => !i.name.includes('[folder]'))
const driveTotalMB = driveFiles.reduce((a, i) => a + parseSizeMB(i.size), 0)

/* ------------------------------------------------------------------ */
/* Exam registry status                                                */
/* ------------------------------------------------------------------ */
let examRegistry: any = { status: 'file unreadable', entries: 0 }
try {
  const reg: any = await Bun.file(`${ROOT}/docs/project/EXAM_REGISTRY.json`).json()
  const entries = Array.isArray(reg) ? reg.length : Array.isArray(reg.exams) ? reg.exams.length : Object.keys(reg).length
  examRegistry = { status: 'skeleton created — entry shells only, none researched yet', entries }
} catch { /* keep default */ }

/* ------------------------------------------------------------------ */
/* Lesson-level statistics (ground truth = the chapter data itself)    */
/* ------------------------------------------------------------------ */
const authored: Record<string, { authoredOn: string; commit: string; unit: string }> = {
  'fm-numbers-digits-place-value': {
    authoredOn: '2026-11-02', commit: '1369d26',
    unit: 'platform base (lesson 1.1 authored with the platform as pipeline validation)',
  },
  'fm-comparing-ordering-numbers': { authoredOn: '2026-11-03', commit: 'a29d1b8', unit: 'unit 1' },
  'fm-rounding-and-estimating': { authoredOn: '2026-11-03', commit: 'a29d1b8', unit: 'unit 1' },
  'fm-addition-carrying': { authoredOn: '2026-11-03', commit: '64b938c', unit: 'unit 2 (lesson 2.1 of 5; chapter 2 in progress)' },
  'fm-subtraction-borrowing': { authoredOn: '2026-11-03', commit: '181f614', unit: 'unit 2 (lesson 2.2 of 5; chapter 2 in progress)' },
  'fm-multiplication-repeated-addition': { authoredOn: '2026-11-03', commit: '(hourly run 4 ship commit)', unit: 'unit 2 (lesson 2.3 of 5; chapter 2 in progress)' },
}

function lessonRecord(l: Lesson) {
  const blockCounts: Record<string, number> = {}
  const calloutTones: Record<string, number> = {}
  let quizItems = 0
  const exercisesByLevel: Record<string, number> = {}
  let exerciseQuestions = 0
  let terms = 0
  for (const b of l.blocks as any[]) {
    blockCounts[b.kind] = (blockCounts[b.kind] || 0) + 1
    switch (b.kind) {
      case 'callout':
        calloutTones[b.tone] = (calloutTones[b.tone] || 0) + 1
        break
      case 'quiz':
        quizItems += b.items.length
        break
      case 'exercises':
        for (const s of b.sets) {
          exercisesByLevel[s.level] = (exercisesByLevel[s.level] || 0) + s.questions.length
          exerciseQuestions += s.questions.length
        }
        break
      case 'terms':
        terms += b.items.length
        break
      default:
        break
    }
  }
  const words = countLessonWords(l)
  const meta = authored[l.id] ?? { authoredOn: 'unknown', commit: 'unknown', unit: 'unknown' }
  return {
    id: l.id,
    number: l.number,
    title: l.title,
    authoredOn: meta.authoredOn,
    authoredInCommit: meta.commit,
    unit: meta.unit,
    words,
    readMins: Math.max(1, Math.round(words / 200)),
    concepts: l.concepts,
    objectives: l.objectives ?? [],
    prerequisites: l.prerequisites ?? [],
    sources: l.sources ?? [],
    blockCounts,
    calloutTones,
    quizItems,
    exercisesByLevel,
    exerciseQuestions,
    termsDefined: terms,
  }
}

const chaptersWritten = foundationMathematics.chapters.filter((c) => c.status === 'complete')
const chaptersStarted = foundationMathematics.chapters.filter((c) => c.status !== 'planned')
const bookRecord = {
  id: foundationMathematics.id,
  title: foundationMathematics.title,
  subtitle: foundationMathematics.subtitle,
  discipline: foundationMathematics.discipline,
  level: foundationMathematics.level,
  description: foundationMathematics.description,
  status: foundationMathematics.status,
  chaptersPlanned: foundationMathematics.chapters.length,
  chaptersWritten: chaptersWritten.length,
  chapters: foundationMathematics.chapters.map((c) => {
    const lessons = c.lessons.map(lessonRecord)
    return {
      number: c.number,
      slug: c.slug,
      title: c.title,
      summary: c.summary,
      status: c.status,
      lessonsWritten: lessons.length,
      plannedLessons: c.plannedLessons ?? [],
      lessons,
      words: lessons.reduce((a, l) => a + l.words, 0),
    }
  }),
}

/* ------------------------------------------------------------------ */
/* Codebase statistics                                                 */
/* ------------------------------------------------------------------ */
const srcFiles = sh(['git', 'ls-files', 'src']).trim().split('\n').filter(Boolean)
const areaOf = (f: string): string => {
  if (f.startsWith('src/app/')) return 'src/app (routes, pages)'
  if (f.startsWith('src/components/library/')) return 'src/components/library (reader platform)'
  if (f.startsWith('src/components/ui/')) return 'src/components/ui (shadcn primitives)'
  if (f.startsWith('src/data/library/')) return 'src/data/library (content model + books)'
  if (f.startsWith('src/hooks/')) return 'src/hooks'
  if (f.startsWith('src/lib/')) return 'src/lib'
  return 'other'
}
const areaLines: Record<string, number> = {}
const libComponents: { file: string; lines: number }[] = []
let codebaseLines = 0
for (const f of srcFiles) {
  const n = (await Bun.file(`${ROOT}/${f}`).text()).split('\n').length
  codebaseLines += n
  const area = areaOf(f)
  areaLines[area] = (areaLines[area] || 0) + n
  if (f.startsWith('src/components/library/')) libComponents.push({ file: f.replace('src/components/library/', ''), lines: n })
}
libComponents.sort((a, b) => b.lines - a.lines)

/* ------------------------------------------------------------------ */
/* Narrative data (facts from WORKLOG.md / PROGRESS.json)              */
/* ------------------------------------------------------------------ */
const milestones = [
  { date: '2026-11-02 14:15', commit: '526add7', title: 'Repository initialised', detail: 'Sandbox scaffold: .env, .gitignore, download/README.' },
  { date: '2026-11-02 15:09', commit: '8a37a0b', title: 'Stack scaffolded', detail: 'Next.js 16 App Router + TypeScript + Tailwind 4 + shadcn/ui (62 UI primitives) + Prisma schema + ESLint; bun package management.' },
  { date: '2026-11-02 15:31', commit: '1369d26', title: 'Platform base (v1), project memory, lesson 1.1', detail: 'Content model with 14 block types + honest word counter (types.ts); 11-discipline taxonomy; reader UI (library home, book page, lesson reader with KaTeX, interactive quiz, bookmark/complete, font scale, dark mode, progress persistence); Foundation Mathematics full 11-chapter TOC; lesson 1.1 authored (~2.8k words); docs/project memory system (MASTER_PLAN, BOOK_FORMAT, PROGRESS, RESUME_POINTER, EXAM_REGISTRY, SOURCE_LOG, SUBJECT_BACKLOG, WORKLOG).' },
  { date: '2026-11-02 16:13', commit: '8f1e37c', title: 'Platform v2: routed architecture + advanced study features', detail: 'SSG routes (/, /book/[bookId], /book/[bookId]/lesson/[lessonId], /revise, /glossary, custom 404) with shareable deep links + JSON-LD; command palette (Ctrl/Cmd+K) with token-aware full-text search over books/lessons/glossary; reader: scrollspy On-this-page, reading-progress bar, keyboard shortcuts (←/→, B, C), prerequisites chips, sources footer; quiz best-score persistence + retake; flashcard revision mode (3D flip, know/again, per-term memory); A–Z glossary + auto formula sheet; content model v2 (prerequisites, sources, formula + algorithm blocks).' },
  { date: '2026-11-02 16:22', commit: '74d0f93', title: 'Owner directives: unit cadence, streak off, push guide', detail: 'Authoring cadence changed to ONE UNIT (chapter) OF ONE SUBJECT AT A TIME (MASTER_PLAN §2 rewritten, §6 gates per unit, BOOK_FORMAT cadence section); daily streak removed from the website (header flame badge, Your-desk streak pill + stat, computeStreak/dayKey helpers deleted; desk stat replaced by Terms mastered); README gained "Pushing to GitHub" (fine-grained PAT guide). Pushed to origin/main with the owner PAT.' },
  { date: '2026-11-02 16:32', commit: '59b1ff9', title: 'Memory: PAT push workflow recorded', detail: 'RESUME_POINTER/WORKLOG record that pushes use a fresh owner-supplied fine-grained PAT (revoked after push) or an owner-side git push.' },
  { date: '2026-11-02 16:52', commit: 'b4f461c', title: 'Website v3: arrangement & visual overhaul', detail: 'Home: two-column hero with living book-shelf visual (real + ghost spines), contextual primary CTA (Start reading / Continue / Next), inline stat strip, compact Your desk, roadmap chips for not-yet-live shelves. Book page: breadcrumb, contextual primary button, TOC per-chapter counters, "Next up" highlight, quiz best-score chips. Reader breadcrumb Library/book/chapter; two-column footer. Shared bits.tsx (DISCIPLINE_ICONS + StatusBadge); paper-dots + spine-label CSS; dev-tools indicator disabled. VLM visual review: home 9/10, book 9/10, reader 8/10 (desktop + mobile + dark mode).' },
  { date: '2026-11-03 01:08', commit: 'a29d1b8', title: 'UNIT 1 SHIPPED: Foundation Mathematics chapter 1 complete', detail: 'Lessons 1.2 (Comparing and Ordering Numbers — domination-bound derivation, place-value comparison figure, digit-rotation mod-9 fingerprint, L1–L6 exercises) and 1.3 (Rounding and Estimating — midpoint figure, rounding algorithm block, error-bound derivation, banker\'s rounding / IEEE 754 insight, L1–L6 exercises) authored (~6,900 words). 66 arithmetic checks recomputed by script BEFORE writing; verify-unit-1.ts ALL CHECKS PASS. Google Drive collection surveyed (89 root items + MATHS/CHEMISTRY/PHYSICS/_DPPs subfolders → temporary-references/inventory.json); Khattar QA 4e downloaded for the unit, chapter 1 studied, working copy deleted after verification. Platform fixes shipped with the unit: mobile 390px horizontal overflow (grid-cols-1 base on three responsive grids) + concept-badge wrapping. E2E: KaTeX 154 (1.2) / 114 (1.3) nodes, figures + algorithm + 11-column table render, quiz scored 5/5, 16-term flashcard deck, glossary + formula cards, no console errors.' },
  { date: '2026-11-03 (hourly run 1)', commit: '647f44c', title: 'Owner preference protocol recorded', detail: 'Drive link persisted in project memory (owner never resends it); GitHub PATs never stored (paste-when-pushing or owner pushes). WORKLOG/RESUME_POINTER/PROGRESS updated.' },
  { date: '2026-11-03 (hourly run 2)', commit: '(recycle recovery)', title: 'Sandbox recycle recovery', detail: 'Platform re-bootstrapped the workspace: fresh scaffold git repo (no remote, full project as untracked files), dev server dead, gitignored artifacts wiped. Recovery: anonymous fetch from the public GitHub repo restored the full 9-commit history; git reset --mixed origin/main + remote/upstream reconfigured; recycle filemode noise silenced (core.filemode=false — content byte-identical, 0 insertions/deletions); resurrected obsolete v1 app-shell.tsx removed; bun install (830 packages); dev server restarted, all routes 200. Drive survey rebuilt from embeddedfolderview via curl (89 entries confirmed, Khattar file id recovered). tsconfig excludes sandbox-only dirs (skills, mini-services); @types/bun added for tracked scripts.' },
  { date: '2026-11-03 (hourly run 2)', commit: '64b938c', title: 'UNIT 2 OPENED: lesson 2.1 Addition and the Art of Carrying', detail: 'Chapter 2 (The Four Operations) started per the unit cadence: lesson 2.1 authored (~3,950 words): counting-on, number-line figure with commutativity drawn as geometry, four-law property table, column-addition algorithm block, worked 4,589+2,764 with carry seat-map figure, carry-bound derivation (9+9+1=19 induction), sum-bound equation + formula card, 999+1 seat-creation example, four carrying-traps callout, mod-9 checksum section with verified fingerprint example + blindness analysis (transpositions, ±9 slips), compensation technique, Gauss pairing historical callout, exam callout, 5 quiz items, L1–L6 exercises. 51 arithmetic checks verified by scripts/verify-unit-2.ts BEFORE writing. Khattar QA 4e re-downloaded from Drive for the unit (working copies deleted after verification); NCERT class 6 ch. 2 topics web-checked. Chapter 2 registered in book.ts (in-progress; lessons 2.2–2.5 planned).' },
  { date: '2026-11-03 (hourly run 3)', commit: '181f614', title: 'LESSON 2.2 Subtraction and Borrowing + SVG figure-label rule', detail: 'Lesson 2.2 authored (~4,611 words, 37 blocks): inverse definition + three faces; 6 terms; number-line figure with 3−7 off-the-edge panel; four-laws-retried table (DEAD/DEAD/DEAD/HALF); decomposition algorithm; worked 4,589−2,764 with borrow seat-map figure (one borrow undoing 2.1\u2019s three carries); borrow-bound derivation; seat-exchange equation; 1,000−1 zero-ripple dissolve; traps callout; inverse-check + digit-sum formula cards; compensation 4,312−2,998; shopkeeper counting-up; equal-additions historical callout; exam callout; 5 quiz; L1–L6 ending in nines-complement L6 (end-around carry). 63 new checks → 114 total, ALL PASS before writing. DEFECT FOUND & FIXED: lesson 2.1\u2019s figure labels rendered literal $4+3$/$3+4$ (SVG injected raw — KaTeX never runs inside); plain-label rule + dollarInSvg=0 E2E assertion added. Run also pushed pending 64b938c and the new commit with the owner\u2019s session PAT (one-time HTTPS URLs, token never stored).' },
  { date: '2026-11-03 (hourly run 4)', commit: '(hourly run 4 ship commit)', title: 'LESSON 2.3 Multiplication as Repeated Addition — and Beyond', detail: 'Lesson 2.3 authored (~4,028 words, 36 blocks): equal-groups opening; 6 terms; number-line figure (4×6 four equal jumps vs 6×4 six — both land on 24); laws-retried table (closure/commutative/associative/identity-1/distributive, verified instances incl. 12×(5+4) = 108); zero property derived from distributivity; partial-product algorithm block; worked 247×36 = 1,482 + 7,410 = 8,892 with partial-products seat-map figure (shift + tinted 0); carry-bound derivation ≤ 8 (attained by 999×9 = 8,991); product digit-bound derivation (k+m−1 ≤ digits ≤ k+m); mod-9 fingerprint for products with the 2,223 shift-mistake blind-spot honesty; speed techniques (×9/×11, 198×7, 24×25 = 600); Russian-peasant binary callout (kept rows sum 8,892); 5 quiz; L1–L6 ending in the binary-proof L6. 50 new checks → 164 total, ALL PASS before writing. Pipeline fixes: 31 double-escaped apostrophes caught by tsc and corrected; malformed dev-generated validator.ts removed + regenerated. Committed locally, NOT pushed (cron rule: no push without a fresh owner PAT).' },
  { date: '2026-11-03 (hourly run 5)', commit: '8e5b681 (+ memory fecd9c4)', title: 'LESSON 2.4 Division, Remainders and Why Zero Never Divides + second-recycle recovery + PUSH PROTOCOL v2', detail: 'Second sandbox recycle recovered (local .git rolled back to 647f44c; anonymous fetch + reset --mixed origin/main restored remote HEAD 7d2cac6 byte-identically; casualties were two untracked working files — verify-unit-2.ts recreated AND committed this time with .gitignore !exceptions for scripts; Drive survey rebuilt via new scripts/rebuild_drive_survey.ts; @types/bun reinstalled). Lesson 2.4 authored (4,693 words, 41 blocks): sharing vs grouping readings; number-line figure (24÷6 backward jumps vs 25÷6 landing on remainder 1); laws-retried table with ÷0 bricked shut; two-case ÷0 derivation (undefined vs indeterminate); long-division algorithm + worked 8,892÷36 = 247 r 0 with seat-map figure (un-building 2.3\'s product); remainder-bound r < b derivation; quotient digit-bound; fingerprint S(a) ≡ S(q)·S(b)+r with dropped-remainder tooth; speed routes ÷5/÷4/÷8 + digit-sum screens; obelus+Euclid callout; 5 quiz; L1–L6 ending in the closed-door L6. 105 new checks → 269 total, ALL PASS. Owner directive 2026-11-03 (push protocol v2): PAT embedded in hourly cron job 498279 — automated pushes authorized after gates; pending lesson-2.3 commit f9d22d5 and this ship pushed (remote HEAD verified = local HEAD via ls-remote; tracking ref re-synced) — FIRST fully automated push.' },
  { date: '2026-11-03 (hourly run 6)', commit: '(hourly run 6 ship commit)', title: 'UNIT 2 COMPLETE: lesson 2.5 Order of Operations and the Language of Expressions', detail: 'Lesson 2.5 authored (4,166 words, ~32 blocks) — the unit-2 finale that completes chapter 2: two-clerks opening (8 + 2 × 5 read as 50 vs 18); 7 terms (expression, value, equation, precedence, bracket, vinculum, BODMAS); expression-tree figure (treaty tree = 18 vs bracketed tree = 50); treaty definition callout + ladder equation (bar → ( ) → { } → [ ] → of → ×/÷ L→R → +/− L→R); compression-argument derivation (why × precedes +, natural vs agreed clauses insight callout with Lennes 1917 / Cajori honesty); bracket-ladder para with vinculum mini-example (bar(3+4)×2 = 14 vs 3+4×2 = 11); full BODMAS algorithm block; worked ladder 120 − [2 × (14 − 2 × 5) + {18 ÷ 3 of 2}] = 109 with ÷-first slip audit (100, a 9-error); the-of-operator para (exam convention ranks "of"; 18 ÷ 3 of 2 = 3, not 12); mnemonic-traps warn callout (8 ÷ 4 × 2 = 4 not 1; 25 − 8 + 7 = 24 not 10); four-wrong-roads table; expressions-vs-equations section; estimation-gate section + worked example (7,218 ÷ 9 + 98 × 63: estimate 6,800, exact 6,976, fingerprint crosses the ranks); historical callout (PEMDAS/BIDMAS/BEDMAS/BODMAS; Lennes 1917 AMM; Cajori 1920s; viral implicit-multiplication debates); exam callout; 5 quiz (5/5 E2E); L1–L6 exercises ending in the treaty-maker\'s problem (associativity ⇒ + and × alone are bracket-independent — exhaustive 0..9 checks — mixed expressions are not ⇒ convention unavoidable); BODMAS formula card; chapter-2 finale closing para. 60 new checks → 165 in the post-recycle script (324 unit-cumulative), ALL PASS pre-writing. Unit-2 completion review run: BOOK_FORMAT checklist + exam-coverage audit + chapter totals recompute (ch. 2 = 21,450 words; book = 8 lessons, 31,159 words, 47 terms). Khattar ch. 4 re-downloaded for BODMAS study, working copy deleted after verification.' },
]

const verificationLog = [
  { unit: 'platform base (lesson 1.1)', date: '2026-11-02', gates: 'lint clean; tsc --noEmit clean (src/); agent-browser E2E: home/book/lesson render, 55 KaTeX nodes + 1 SVG, quiz feedback, solution expansion, completion persistence, search, dark mode, no overflow at 390px/1280px, no console errors. Accuracy pass fixed 4 issues (numeral paragraph, 10^11 kharab column, modular-arithmetic wording, digit-reversal formula verified by substitution).' },
  { unit: 'platform v2', date: '2026-11-02', gates: 'lint clean; all routes 200 (unknown ids 404); browser E2E: palette multi-word search + navigation, quiz answered-all → 5/5 + quizBest persisted + retake reset, keyboard C/B, flashcards flip/mark/mode switch, scrollspy, progress bar, Your desk, localStorage persistence; per-page fresh loads show zero hydration warnings; VLM screenshot review.' },
  { unit: 'streak removal + cadence docs', date: '2026-11-03', gates: 'lint clean; tsc clean (fixed pre-existing SearchHit union type error); E2E with seeded progress: desk stats [Lessons completed 1 · Words read 2,852 · Terms mastered 3 · Bookmarks 0], zero "streak" occurrences anywhere, 54 KaTeX nodes, no console errors, no hydration warnings.' },
  { unit: 'site v3', date: '2026-11-03', gates: 'lint + tsc clean; all routes 200; browser E2E: hero CTAs, 6 spine labels, stat strip, roadmap, footer links, breadcrumb, Next-up + 5/5 quiz chip + 1/1-done counter, 54 KaTeX nodes, C-keyboard toggle, Ctrl-K palette, flashcards; VLM visual review rounds: home 9/10 (desktop + mobile; imbalance, ghost-contrast, devtools overlap fixed), book 9/10, reader 8/10; dark-mode spine contrast fixed; zero console errors.' },
  { unit: 'unit 1 (Foundation Mathematics ch. 1)', date: '2026-11-03', gates: '66 arithmetic checks recomputed by script before writing (incl. half-up vs half-even error sums +5 vs 0); verify-unit-1.ts ALL CHECKS PASS (ids unique, quiz indices valid, solutions complete, prereqs resolve, sources resolve); lint clean; tsc clean; routes 200; browser E2E: KaTeX 154/114 nodes per lesson, figures + algorithm block + 11-col table render, quiz scored 5/5 "perfect" with feedback, 16-term flashcard deck, glossary lists new terms + formula cards, TOC shows ch. 1 complete with ch. 2 planned, Next-up works; mobile 390px exactly no overflow; no console errors.' },
  { unit: 'unit 2 (FM ch. 2, lesson 2.1)', date: '2026-11-03', gates: '51 arithmetic checks verified by scripts/verify-unit-2.ts BEFORE writing (ALL PASS — incl. digit-root convention fix: multiples of 9 root to 9, compared mod 9); lint clean; tsc clean repo-wide (tsconfig excludes sandbox dirs; @types/bun added); routes 200 (lesson 2.1 needed a dev-server restart to pick up new generateStaticParams); browser E2E: KaTeX 118 nodes, 14 headings, both figures + algorithm + formula cards + 6 terms render, quiz answered 5/5 "perfect" with feedback, flashcard deck grew 16 → 22 cards, glossary lists Addend/Carry/Commutative + Sum-bound formula card, mobile 390px exactly no overflow (scrollW=390); zero console errors.' },
  { unit: 'unit 2 (FM ch. 2, lesson 2.2)', date: '2026-11-03', gates: '63 new arithmetic checks (114 total) verified by scripts/verify-unit-2.ts BEFORE writing, ALL PASS; lint clean; tsc clean repo-wide (one literal-narrowing TS error in the verify script fixed); routes 200 (new lesson needed a dev-server restart); browser E2E: KaTeX 140 nodes, 8 headings, both figures geometry-verified via DOM (dashed negative stretch + dashed landing circle; 2 strike lines, correction digits 3/15, borrow chip, dashed lend arrow), algorithm + derivation + four-laws table + 6 terms + 2 formula cards render, quiz 5/5 "perfect", flashcard deck 22 → 28, glossary lists Minuend/Subtrahend/Nines complement, formula sheet lists both new cards, mobile 390px exactly (scrollW=390), dollarInSvg=0 on both ch-02 lessons, zero console errors.' },
  { unit: 'unit 2 (FM ch. 2, lesson 2.3)', date: '2026-11-03', gates: '50 new arithmetic checks (164 total) verified by scripts/verify-unit-2.ts BEFORE writing, ALL PASS; lint clean; tsc clean repo-wide (31 double-escaped apostrophes fixed after TS1005; 2 verify-script literal-narrowing TS2367s fixed; malformed dev-generated validator.ts removed + regenerated); routes 200 (dev restart); browser E2E: KaTeX 149 nodes, 8 headings, figures geometry-verified via DOM (10 equal-jump arcs + 10 hop labels + 4 landings; 17 digit texts + row labels + shift annotations), algorithm + 2 derivations + laws table + 6 terms + 2 formula cards render, quiz 5/5 "perfect", flashcard deck 28 → 34, glossary + formula sheet list new entries, mobile 390px exactly (scrollW=390), dollarInSvg=0, zero console errors.' },
  { unit: 'unit 2 (FM ch. 2, lesson 2.4)', date: '2026-11-03', gates: '105 new arithmetic checks (269 total) verified by the recreated+committed scripts/verify-unit-2.ts BEFORE writing, ALL PASS (exhaustive range loops for bounds); lint clean; tsc clean (after @types/bun restore); routes 200; browser E2E: KaTeX 148 nodes, figures DOM-verified (number-line backward jumps 23 labels; long-division tableau 32 labels, ÷ glyphs render), quiz 5/5 "perfect", flashcard deck 34 → 40, glossary + formula sheet list new entries, mobile 390px exactly (scrollW=390), dollarInSvg=0, zero console errors.' },
  { unit: 'unit 2 (FM ch. 2, lesson 2.5) + unit-2 completion review', date: '2026-11-03', gates: '60 new arithmetic checks verified by scripts/verify-unit-2.ts BEFORE writing (165 in the post-recycle script; 324 unit-cumulative), ALL PASS; lint clean; tsc FULLY clean repo-wide incl. scripts/ (verify-script literal-narrowing TS2367s fixed with compare-before-narrow pattern; rebuild_drive_survey.ts marked as module with export {}); routes 200 incl. the new lesson (no dev restart needed); browser E2E: KaTeX 113 nodes, all 6 section headings, 4-row table renders, quiz 5/5 "perfect" (clicked the intended correct options live), flashcard deck 40 → 47, glossary lists BODMAS/Vinculum/Precedence/Equation + formula sheet lists the BODMAS card, mobile 390px exactly (scrollW=390), dollarInSvg=0, zero console/page errors; expression-tree figure screenshot-verified (tinted root operations, correct values). BOOK_FORMAT checklist: all seven boxes pass (math pre-verified; figure labels in prose; quiz indices verified live; solutions complete; ids unique repo-wide; lint/render clean; logs updated). Exam-coverage audit: every lesson 2.1–2.5 carries an exam callout; order-of-operations items mapped to bank/SSC/Railway simplification staples + CUET/NTSE vocabulary items; no real past-paper questions reproduced (exam-style labelling rule).' },
]

/* ------------------------------------------------------------------ */
/* Totals                                                              */
/* ------------------------------------------------------------------ */
const allLessons = foundationMathematics.chapters.flatMap((c) => c.lessons)
const sumBlocks = (kind: string) => allLessons.reduce((a, l) => a + (((lessonRecord(l).blockCounts as any)[kind]) ?? 0), 0)
// cheaper: recount directly
const blockTotals: Record<string, number> = {}
for (const l of allLessons) for (const b of l.blocks as any[]) blockTotals[b.kind] = (blockTotals[b.kind] || 0) + 1
const totals = {
  disciplinesPlanned: 11,
  booksPlannedBacklog: 281,
  booksLive: 1,
  chaptersWritten: chaptersWritten.length,
  chaptersInProgress: chaptersStarted.filter((c) => c.status === 'in-progress').length,
  lessonsWritten: allLessons.length,
  wordsAuthored: allLessons.reduce((a, l) => a + countLessonWords(l), 0),
  termsDefined: allLessons.reduce((a, l) => a + (l.blocks as any[]).filter((b) => b.kind === 'terms').reduce((x, b) => x + b.items.length, 0), 0),
  quizItems: allLessons.reduce((a, l) => a + (l.blocks as any[]).filter((b) => b.kind === 'quiz').reduce((x, b) => x + b.items.length, 0), 0),
  exerciseQuestions: allLessons.reduce((a, l) => a + (l.blocks as any[]).filter((b) => b.kind === 'exercises').reduce((x, b) => x + b.sets.reduce((y, s) => y + s.questions.length, 0), 0), 0),
  blockTotals,
}

/* ------------------------------------------------------------------ */
/* Assemble                                                            */
/* ------------------------------------------------------------------ */
const generatedIST = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' })
const inventory = {
  project: 'LockIn Library',
  repo: 'github.com/Sachin0Amit/lock-in (origin: git@github.com:Sachin0Amit/lock-in.git)',
  purpose:
    'Owner directive (2026-11-03): maintain a detailed log/JSON of everything written or worked on. This file is the machine-readable record; docs/project/DETAILED_LOG.md is the human-readable narrative mirror. UPDATE BOTH at every unit ship and every platform change (MASTER_PLAN §2 step 7). Session-by-session narrative lives in WORKLOG.md.',
  generated: `${generatedIST} (Asia/Kolkata)`,
  methodology: {
    wordCount: 'countLessonWords() from src/data/library/types.ts — every human-language string in every block (quiz explanations and exercise solutions included; inline $math$ fragments and KaTeX in equations/derivations excluded)',
    readingMinutes: 'words / 200, rounded up, minimum 1',
    lessonStats: 'computed live from the chapter data files — this file never hand-edits numbers',
  },
  standingRules: [
    'ONE UNIT (chapter) OF ONE SUBJECT AT A TIME (owner directive 2026-11-03): research → write → verify → ship → log, then the next unit; never batch-draft',
    'No daily-streak / gamified streak features on the website, ever (owner directive 2026-11-03 — removed; never reintroduce)',
    'Original content only — reference books inform and verify, never reproduce protected expression',
    'Download only the current unit\'s reference books into temporary-references/ (gitignored); delete working copies after the unit is verified; never touch Drive originals',
    'Accuracy over volume: no fabricated formulas, history, data, or exam questions; exam-style items labelled "exam-style"',
    'Maintain WORK_INVENTORY.json + DETAILED_LOG.md at every unit ship (this file\'s own directive, 2026-11-03)',
  ],
  content: {
    disciplinesPlanned: 11,
    backlogPlan: 'docs/project/SUBJECT_BACKLOG.md — 281 titles listed: Mathematics 27, Physics 20, Chemistry 15, Computer Science 49, Engineering 40 (+ more under investigation), Biology/Botany/Zoology 24, Medical Sciences 14+, Economics-Commerce 23, Humanities 21+, Languages 13, Arts-Music 35. Promotion rule: a backlog book becomes a real book only after its research phase (reference survey + syllabus audit).',
    booksLive: 1,
    books: [bookRecord],
  },
  engineering: {
    stack: 'Next.js 16 App Router (SSG) · TypeScript · Tailwind 4 · shadcn/ui · zustand (persist v2) · KaTeX · next-themes · framer-motion · cmdk · bun',
    routes: ['/', '/book/[bookId]', '/book/[bookId]/lesson/[lessonId]', '/book/[bookId]/revise', '/book/[bookId]/glossary', '404'],
    featureHighlights: [
      'v3 home: living book-shelf hero (real + ghost spines), contextual CTAs, inline stat strip, compact Your desk, roadmap chips',
      'v3 book page: breadcrumb, contextual primary button, TOC counters + Next-up highlight + quiz best-score chips',
      'command palette (Ctrl/Cmd+K): token-aware full-text search over books/lessons/glossary + actions',
      'reader: scrollspy, reading-progress bar, keyboard shortcuts, prerequisites, sources footer, KaTeX',
      'quiz with persisted best score + retake; flashcard revision (auto deck from terms blocks); A–Z glossary + formula sheet',
      'progress persistence (zustand persist → localStorage) — daily streak REMOVED (owner directive, never reintroduce)',
    ],
    codebase: {
      srcFilesTracked: srcFiles.length,
      totalLines: codebaseLines,
      byArea: areaLines,
      libraryComponents: libComponents,
    },
    milestones,
    verificationLog,
  },
  research: {
    driveCollection: {
      link: 'https://drive.google.com/drive/folders/1NI-VN0d6bUt_wciV6k0UCLN8qiqoCRO1',
      suppliedByOwner: '2026-11-03 (link-shared, works without login)',
      surveyed: inv.captured ?? '2026-11-03',
      rootFileCount: driveFiles.length,
      subfolders: driveFolders,
      approxTotalSizeMB: Math.round(driveTotalMB * 10) / 10,
      fullMachineListing: 'temporary-references/inventory.json (gitignored — survey metadata)',
      rootItems: rootItems.map((i) => ({ name: i.name, size: i.size })),
    },
    citationKeys: [
      { key: 'khattar-qa-4e', work: 'Dinesh Khattar, Quantitative Aptitude for Competitive Examinations, 4th ed., Pearson (2019), ISBN 9789353439552', usedFor: 'FM ch. 1 (unit 1): place-value/face-value definitions, Indian system naming, exam-style digit problems. FM ch. 2 (unit 2): exam-style rapid-arithmetic context; ch. 4 "Simplification" BODMAS material (bracket ladder bar → ( ) → { } → [ ], the "of" rank) used for lesson 2.5. Exposition original.' },
      { key: 'ncert-math6-ch1', work: 'NCERT Class 6 Mathematics, ch. 1 "Knowing Our Numbers" (public curriculum)', usedFor: 'FM ch. 1 (unit 1): canonical school-level topic coverage (comparing, ordering, greatest/smallest, estimation). Coverage cross-checked via web; exposition original.' },
      { key: 'ncert-math6-ch2', work: 'NCERT Class 6 Mathematics, ch. 2 "Whole Numbers" (public curriculum)', usedFor: 'FM ch. 2 (unit 2, lessons 2.1–2.5): canonical school-level treatment of the four operations on the number line and the properties of whole numbers under each (closure, commutativity, associativity, identity, distributivity and their failures; division algorithm a = q·b + r with 0 ≤ r < b; ÷0 undefined). Lesson 2.5\'s order-of-operations coverage additionally web-checked against CBSE-aligned BODMAS references (2026-11-03); exposition original.' },
    ],
    perUnitDownloadLedger: [
      { unit: 'unit 1 — FM ch. 1', downloaded: 'Khattar QA 4e PDF (32.4 MB, 1049 pp) + NCERT web outline', usedFor: 'lessons 1.2 + 1.3', workingCopiesDeleted: '2026-11-03, after unit verification' },
      { unit: 'unit 2 — FM ch. 2 (lesson 2.1)', downloaded: 'Khattar QA 4e PDF (33.9 MB, re-downloaded after sandbox recycle wiped working copies; Drive file id recovered via re-survey) + NCERT class 6 ch. 2 web outline', usedFor: 'lesson 2.1 (Addition and the Art of Carrying)', workingCopiesDeleted: '2026-11-03, after E2E verification' },
      { unit: 'unit 2 — FM ch. 2 (lessons 2.2–2.4)', downloaded: 'none — unit\'s Khattar ch. 4 already surveyed (BODMAS reserved for 2.5); NCERT class-6 subtraction/multiplication/division coverage web-checked (sanctioned fallback)', usedFor: 'lessons 2.2, 2.3, 2.4', workingCopiesDeleted: 'n/a (no downloads)' },
      { unit: 'unit 2 — FM ch. 2 (lesson 2.5)', downloaded: 'Khattar QA 4e PDF re-downloaded (33.9 MB; Drive file id 12YnlSYX16Hl-Oze9Io7bBN0hZ_2qRcbi now persisted in the upgraded survey) — ch. 4 BODMAS section studied; CBSE-aligned BODMAS web-check', usedFor: 'lesson 2.5 (Order of Operations and the Language of Expressions)', workingCopiesDeleted: '2026-11-03, after unit-2 verification' },
    ],
    examRegistry: { file: 'docs/project/EXAM_REGISTRY.json', target: '50+ examinations (≥10 Indian, ≥20 international)', ...examRegistry },
  },
  gitHistory,
  totals,
}

await Bun.write(OUT, JSON.stringify(inventory, null, 2) + '\n')

/* ------------------------------------------------------------------ */
/* Console summary for verification                                    */
/* ------------------------------------------------------------------ */
console.log('WORK_INVENTORY.json written:', OUT)
console.log('generated:', inventory.generated)
console.log('--- totals ---')
console.log(JSON.stringify(totals, null, 2))
console.log('--- per lesson ---')
for (const c of bookRecord.chapters) {
  for (const l of c.lessons) {
    console.log(`${l.number} ${l.title}: ${l.words} words · quiz ${l.quizItems} · exercises ${JSON.stringify(l.exercisesByLevel)} · terms ${l.termsDefined} · sources ${JSON.stringify(l.sources)}`)
  }
}
console.log('--- git commits (oldest→newest) ---')
for (const c of gitHistory) console.log(`${c.short} ${c.date} ${c.message} (+${c.insertions}/-${c.deletions}, ${c.filesChanged} files)`)
console.log('--- drive ---')
console.log(`root files: ${driveFiles.length}, subfolders: ${driveFolders.join(', ')}, approx ${Math.round(driveTotalMB)} MB`)
console.log('--- codebase ---')
console.log(`${srcFiles.length} tracked src files, ${codebaseLines} lines`)
console.log(JSON.stringify(areaLines, null, 2))
console.log('--- exam registry ---')
console.log(JSON.stringify(examRegistry))
